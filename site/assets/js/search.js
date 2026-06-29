// search.js — 위키 전체 검색 모달 (Pagefind 백엔드).
//
//   - 헤더 [data-search-trigger] 클릭 · Cmd/Ctrl+K · '/' 로 모달을 연다, Esc 로 닫는다.
//   - Pagefind 번들(빌드 후 dist/pagefind/pagefind.js)을 동적 import 하여 검색.
//   - 결과는 ↑/↓ 로 이동, Enter/클릭으로 해당 페이지로 이동.
//   - base path 보정: Pagefind url 은 사이트 루트 기준(/cat/stem/)이라 배포 시 BASE 접두.
//
// Pagefind 인덱스는 빌드 파이프라인(npm run preview / build:deploy / Actions)에서만 생성된다.
// 인덱스가 없으면(예: 단독 `npm run build`) graceful 하게 안내 메시지를 띄운다.

(function () {
  'use strict';

  var trigger = document.querySelector('[data-search-trigger]');
  var pfUrl = trigger && trigger.getAttribute('data-pagefind');
  // pfUrl = '<BASE>/pagefind/pagefind.js' → BASE 추출(없으면 '').
  var base = pfUrl ? pfUrl.replace(/\/pagefind\/pagefind\.js.*$/, '') : '';

  var modal, input, resultsEl, statusEl;
  var pagefind = null;
  var loadPromise = null;
  var debounceTimer = null;
  var results = [];
  var sel = -1;
  var opened = false;

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function fixUrl(u) {
    if (!u) return u;
    if (base && u.indexOf(base) !== 0) u = base + u;
    return u;
  }

  function buildModal() {
    modal = document.createElement('div');
    modal.className = 'search-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', '위키 검색');
    modal.hidden = true;
    modal.innerHTML =
      '<div class="search-backdrop" data-search-close></div>' +
      '<div class="search-panel">' +
      '<div class="search-inputwrap">' +
      '<span class="search-ico" aria-hidden="true">⌕</span>' +
      '<input type="search" class="search-input" placeholder="위키 전체 검색…" aria-label="검색어" autocomplete="off" autocapitalize="off" spellcheck="false">' +
      '<kbd class="search-esc">esc</kbd>' +
      '</div>' +
      '<div class="search-status" aria-live="polite"></div>' +
      '<ul class="search-results" role="listbox" aria-label="검색 결과"></ul>' +
      '</div>';
    document.body.appendChild(modal);
    input = modal.querySelector('.search-input');
    resultsEl = modal.querySelector('.search-results');
    statusEl = modal.querySelector('.search-status');
    input.addEventListener('input', onInput);
    input.addEventListener('keydown', onKey);
    modal.addEventListener('mousedown', function (e) {
      if (e.target.hasAttribute('data-search-close')) close();
    });
  }

  function loadPagefind() {
    if (loadPromise) return loadPromise;
    if (!pfUrl) {
      loadPromise = Promise.reject(new Error('no-index'));
      return loadPromise;
    }
    loadPromise = import(pfUrl).then(function (mod) {
      pagefind = mod;
      if (pagefind.init) pagefind.init();
      return pagefind;
    });
    return loadPromise;
  }

  function setStatus(t) {
    if (statusEl) statusEl.textContent = t;
  }

  function open() {
    if (!modal) buildModal();
    if (opened) return;
    opened = true;
    modal.hidden = false;
    document.body.classList.add('search-open');
    input.value = '';
    resultsEl.innerHTML = '';
    results = [];
    sel = -1;
    setStatus('');
    setTimeout(function () {
      input.focus();
    }, 0);
    // 인덱스를 미리 데운다(첫 타이핑 지연 감소). 실패는 검색 시점에 안내.
    loadPagefind().catch(function () {
      setStatus('검색 인덱스가 아직 없습니다 — 배포된 사이트(또는 npm run preview)에서 동작합니다.');
    });
  }

  function close() {
    if (!opened) return;
    opened = false;
    modal.hidden = true;
    document.body.classList.remove('search-open');
    if (trigger) trigger.focus();
  }

  function onInput() {
    clearTimeout(debounceTimer);
    var q = input.value.trim();
    if (!q) {
      resultsEl.innerHTML = '';
      results = [];
      sel = -1;
      setStatus('');
      return;
    }
    debounceTimer = setTimeout(function () {
      run(q);
    }, 160);
  }

  function run(q) {
    loadPagefind()
      .then(function (pf) {
        setStatus('검색 중…');
        return pf.search(q);
      })
      .then(function (search) {
        if (!search) return null;
        return Promise.all(
          search.results.slice(0, 8).map(function (r) {
            return r.data();
          })
        );
      })
      .then(function (data) {
        if (data) render(data, q);
      })
      .catch(function () {
        setStatus('검색 인덱스가 아직 없습니다 — 배포된 사이트(또는 npm run preview)에서 동작합니다.');
      });
  }

  function render(data, q) {
    results = data;
    sel = data.length ? 0 : -1;
    if (!data.length) {
      resultsEl.innerHTML = '';
      setStatus('“' + q + '”에 대한 결과 없음');
      return;
    }
    setStatus(data.length + '개 결과');
    resultsEl.innerHTML = data
      .map(function (d, i) {
        var title = (d.meta && d.meta.title) || d.url;
        // excerpt 는 Pagefind 가 <mark> 하이라이트를 포함해 돌려준다(신뢰 가능한 HTML).
        return (
          '<li role="option" class="search-result' +
          (i === 0 ? ' is-sel' : '') +
          '" data-i="' +
          i +
          '">' +
          '<span class="sr-title">' +
          escapeHtml(title) +
          '</span>' +
          '<span class="sr-excerpt">' +
          (d.excerpt || '') +
          '</span>' +
          '</li>'
        );
      })
      .join('');
    Array.prototype.forEach.call(resultsEl.children, function (li, i) {
      li.addEventListener('click', function () {
        go(i);
      });
      li.addEventListener('mousemove', function () {
        select(i);
      });
    });
  }

  function select(i) {
    var items = resultsEl.children;
    if (!items.length) return;
    if (items[sel]) items[sel].classList.remove('is-sel');
    sel = i;
    if (items[sel]) {
      items[sel].classList.add('is-sel');
      items[sel].scrollIntoView({ block: 'nearest' });
    }
  }

  function go(i) {
    if (results[i]) window.location.href = fixUrl(results[i].url);
  }

  function onKey(e) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (sel < results.length - 1) select(sel + 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (sel > 0) select(sel - 1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (sel >= 0) go(sel);
    }
  }

  document.addEventListener('keydown', function (e) {
    if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
      e.preventDefault();
      opened ? close() : open();
    } else if (e.key === 'Escape' && opened) {
      e.preventDefault();
      close();
    } else if (
      e.key === '/' &&
      !opened &&
      !/^(INPUT|TEXTAREA|SELECT)$/.test((e.target && e.target.tagName) || '') &&
      !(e.target && e.target.isContentEditable)
    ) {
      e.preventDefault();
      open();
    }
  });

  if (trigger) {
    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      open();
    });
  }
})();
