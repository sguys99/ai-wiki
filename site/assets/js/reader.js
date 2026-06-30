// reader.js — 위키(절) 페이지 읽기 보조.
//   (1) 상단 진행바: 문서 스크롤 비율을 .reading-bar > i 폭으로 표시.
//   (2) TOC scrollspy: 현재 화면에 보이는 h2/h3에 해당하는 TOC 링크를 .is-active 로 표시.
//
// rAF로 스크롤 핸들러를 코얼레싱한다. prefers-reduced-motion 와 무관(레이아웃 보조라 항상 동작).
// 모바일에서 TOC rail은 CSS로 숨겨지므로 scrollspy는 사실상 데스크톱 전용 — 링크가 없으면 무동작.

(function () {
  'use strict';

  var bar = document.querySelector('.reading-bar > i');
  var article = document.querySelector('.wiki-article');
  if (!article) return;

  // TOC 링크 ↔ 헤딩 매핑
  var links = Array.prototype.slice.call(document.querySelectorAll('.wiki-toc a[href^="#"]'));
  var headings = Array.prototype.slice.call(article.querySelectorAll('h2[id], h3[id]'));
  var linkById = {};
  links.forEach(function (a) {
    var id = decodeURIComponent(a.getAttribute('href').slice(1));
    linkById[id] = a;
  });

  var activeId = null;
  function setActive(id) {
    if (id === activeId) return;
    if (activeId && linkById[activeId]) linkById[activeId].classList.remove('is-active');
    activeId = id;
    if (id && linkById[id]) linkById[id].classList.add('is-active');
  }

  function update() {
    // (1) 진행바
    if (bar) {
      var doc = document.documentElement;
      var scrollable = doc.scrollHeight - window.innerHeight;
      var ratio = scrollable > 0 ? doc.scrollTop / scrollable : 0;
      if (ratio < 0) ratio = 0;
      else if (ratio > 1) ratio = 1;
      bar.style.transform = 'scaleX(' + ratio + ')';
    }

    // (2) scrollspy — 헤더 아래(약 120px) 라인을 막 지난 마지막 헤딩을 현재 절로 본다.
    if (headings.length) {
      var line = 120;
      var currentId = headings[0].id;
      for (var i = 0; i < headings.length; i++) {
        if (headings[i].getBoundingClientRect().top <= line) currentId = headings[i].id;
        else break;
      }
      setActive(currentId);
    }
  }

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      update();
      ticking = false;
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update();
})();

// ── 관련 페이지 그래프: 즉시 툴팁 + 목록 행 강조 ──────────────────────────────
//
// native <title>의 ~1s 지연을 없애려고 커스텀 툴팁을 노드 위에 즉시 띄운다.
// 노드 <a data-neigh data-title> ↔ 목록 <li data-neigh> 를 인덱스로 매칭.
(function () {
  'use strict';
  var sec = document.querySelector('.related');
  var svg = sec && sec.querySelector('.neigh');
  if (!svg) return;

  var anchors = Array.prototype.slice.call(svg.querySelectorAll('.neigh-nodes a[data-neigh]'));
  if (!anchors.length) return;

  var tip = document.createElement('div');
  tip.className = 'neigh-tip';
  tip.setAttribute('aria-hidden', 'true');
  sec.appendChild(tip);

  var activeLi = null;

  function show(a) {
    var circle = a.querySelector('circle');
    if (!circle) return;
    tip.textContent = a.getAttribute('data-title') || a.getAttribute('aria-label') || '';

    var box = sec.getBoundingClientRect();
    var c = circle.getBoundingClientRect();
    var left = c.left - box.left + c.width / 2; // 노드 중심 x
    var top = c.top - box.top - 8; // 노드 상단 위로 약간

    // 컨테이너 좌우 밖으로 잘리지 않게 clamp (translateX(-50%) 기준 ≈ 절반 폭 여백)
    var pad = Math.min(tip.offsetWidth, 288) / 2 + 8;
    if (left < pad) left = pad;
    if (left > box.width - pad) left = box.width - pad;

    tip.style.left = left + 'px';
    tip.style.top = top + 'px';
    tip.classList.add('is-visible');

    var li = sec.querySelector('.related-list li[data-neigh="' + a.getAttribute('data-neigh') + '"]');
    if (li) {
      li.classList.add('is-active');
      activeLi = li;
    }
  }

  function hide() {
    tip.classList.remove('is-visible');
    if (activeLi) {
      activeLi.classList.remove('is-active');
      activeLi = null;
    }
  }

  anchors.forEach(function (a) {
    a.addEventListener('mouseenter', function () {
      show(a);
    });
    a.addEventListener('focus', function () {
      show(a);
    });
    a.addEventListener('mouseleave', hide);
    a.addEventListener('blur', hide);
  });
})();
