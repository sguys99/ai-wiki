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
