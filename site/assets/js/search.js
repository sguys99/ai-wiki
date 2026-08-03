// search.js — 위키 전체 검색 모달 (Pagefind 백엔드).
//
//   - 헤더 [data-search-trigger] 클릭 · Cmd/Ctrl+K · '/' 로 모달을 연다, Esc 로 닫는다.
//   - Pagefind 번들(빌드 후 dist/pagefind/pagefind.js)을 동적 import 하여 검색.
//   - 결과는 ↑/↓ 로 이동, Enter/클릭으로 해당 페이지로 이동.
//   - base path 보정: Pagefind url 은 사이트 루트 기준(/cat/stem/)이라 배포 시 BASE 접두.
//
//   - 결과 위 카테고리 패싯: 위키 아티클의 data-pagefind-filter="category:…" 를 Pagefind 가
//     필터로 색인한다. pagefind.filters() 로 값 목록을 받아 칩을 만들고, 선택 시
//     search(q, { filters: { category: [값] } }) 로 결과를 좁힌다.
//
// Pagefind 인덱스는 빌드 파이프라인(npm run preview / build:deploy / Actions)에서만 생성된다.
// 인덱스가 없으면(예: 단독 `npm run build`) graceful 하게 안내 메시지를 띄운다.

(function () {
  'use strict';

  var trigger = document.querySelector('[data-search-trigger]');
  var pfUrl = trigger && trigger.getAttribute('data-pagefind');
  // pfUrl = '<BASE>/pagefind/pagefind.js' → BASE 추출(없으면 '').
  var base = pfUrl ? pfUrl.replace(/\/pagefind\/pagefind\.js.*$/, '') : '';

  var FACET_KEY = 'category';

  var modal, input, resultsEl, statusEl, facetsEl;
  var pagefind = null;
  var loadPromise = null;
  var debounceTimer = null;
  var results = [];
  var sel = -1;
  var opened = false;
  var facetValues = null; // [{ value, count }] — 인덱스 전체 기준(1회 로드)
  var activeFacet = null; // 선택된 카테고리 값. null 이면 '전체'

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
      '<div class="search-facets" role="group" aria-label="카테고리 필터" hidden></div>' +
      '<div class="search-status" aria-live="polite"></div>' +
      '<ul class="search-results" role="listbox" aria-label="검색 결과"></ul>' +
      '</div>';
    document.body.appendChild(modal);
    input = modal.querySelector('.search-input');
    resultsEl = modal.querySelector('.search-results');
    statusEl = modal.querySelector('.search-status');
    facetsEl = modal.querySelector('.search-facets');
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

  // ── 카테고리 패싯 ──────────────────────────────────────────────────────────
  //
  // pagefind.filters() → { category: { 'Agents': 49, … } }. 인덱스 전체 기준 값 목록이라
  // 한 번만 읽고, 칩 옆 숫자는 검색할 때마다 응답의 totalFilters 로 갱신한다.
  function loadFacets() {
    if (facetValues) return Promise.resolve(facetValues);
    return loadPagefind()
      .then(function (pf) {
        return pf.filters();
      })
      .then(function (all) {
        var map = (all && all[FACET_KEY]) || {};
        facetValues = Object.keys(map)
          .map(function (v) {
            return { value: v, count: map[v] };
          })
          .sort(function (a, b) {
            return b.count - a.count || a.value.localeCompare(b.value, 'ko');
          });
        renderFacets(null);
        return facetValues;
      })
      .catch(function () {
        return null;
      });
  }

  // counts: 이번 검색 응답 기준 카테고리별 결과 수. null 이면 인덱스 전체 수.
  function renderFacets(counts) {
    if (!facetsEl || !facetValues || !facetValues.length) return;
    var html = chipHtml(null, '전체', null);
    facetValues.forEach(function (f) {
      var n = counts ? counts[f.value] || 0 : f.count;
      html += chipHtml(f.value, f.value, n);
    });
    facetsEl.innerHTML = html;
    facetsEl.hidden = false;
    Array.prototype.forEach.call(facetsEl.children, function (btn) {
      btn.addEventListener('click', function () {
        var v = btn.getAttribute('data-facet');
        activeFacet = v === '' ? null : v;
        renderFacets(counts);
        rerun();
      });
    });
  }

  function chipHtml(value, label, n) {
    var on = (value || null) === activeFacet;
    var zero = n === 0 && !on;
    return (
      '<button type="button" class="facet-chip' +
      (on ? ' is-active' : '') +
      '" data-facet="' +
      escapeHtml(value || '') +
      '" aria-pressed="' +
      String(on) +
      '"' +
      (zero ? ' disabled' : '') +
      '>' +
      escapeHtml(label) +
      (n === null || n === undefined ? '' : '<span class="facet-n">' + n + '</span>') +
      '</button>'
    );
  }

  function searchOptions() {
    var opts = {};
    if (activeFacet) {
      opts.filters = {};
      opts.filters[FACET_KEY] = [activeFacet];
    }
    return opts;
  }

  // 패싯 토글 후 재검색. 검색어가 비어 있으면 Pagefind 의 filter-only 모드(term=null)로
  // 해당 카테고리 페이지를 그냥 나열한다. 전체 + 빈 검색어면 결과를 비운다.
  function rerun() {
    var q = input.value.trim();
    if (!q && !activeFacet) {
      resultsEl.innerHTML = '';
      results = [];
      sel = -1;
      renderFacets(null);
      setStatus('');
      return;
    }
    run(q);
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
    activeFacet = null;
    if (facetValues) renderFacets(null);
    setStatus('');
    setTimeout(function () {
      input.focus();
    }, 0);
    // 인덱스를 미리 데운다(첫 타이핑 지연 감소). 실패는 검색 시점에 안내.
    loadPagefind()
      .then(function () {
        return loadFacets();
      })
      .catch(function () {
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
    if (!q && !activeFacet) {
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

  // q 가 빈 문자열이고 패싯만 걸린 경우 term=null → Pagefind filter-only 모드.
  function run(q) {
    var term = q || null;
    loadPagefind()
      .then(function (pf) {
        setStatus('검색 중…');
        return pf.search(term, searchOptions());
      })
      .then(function (search) {
        if (!search) return null;
        // totalFilters: 이 필터 키를 적용하지 않았을 때의 값별 결과 수 → 패싯 칩 숫자.
        // 검색어 없이 필터만 건 filter-only 응답은 totalFilters 가 전부 0으로 와서
        // 그대로 쓰면 다른 카테고리 칩이 전부 비활성이 된다. 이때는 인덱스 전체 수로 둔다.
        renderFacets(
          term ? (search.totalFilters && search.totalFilters[FACET_KEY]) || null : null
        );
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
      setStatus(q ? '“' + q + '”에 대한 결과 없음' : '결과 없음');
      return;
    }
    setStatus(data.length + '개 결과' + (activeFacet ? ' · ' + activeFacet : ''));
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
