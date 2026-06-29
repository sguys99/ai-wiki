// nav.js — 모바일 내비게이션(전 페이지 공통).
//
//   (1) 햄버거(☰) → #site-menu 시트 토글. aria-expanded 동기화.
//       닫힘 트리거: 다시 클릭 · Esc · 시트 밖 클릭 · 메뉴 링크 클릭 · 데스크톱 폭으로 리사이즈.
//   (2) 모바일 접이식 목차(<details.wiki-toc-m>): 내부 링크 클릭 시 자동 접기(앵커 이동 후 정리).
//
// 데스크톱에서는 햄버거/모바일 목차가 CSS로 숨겨져 사실상 비활성(요소가 없으면 무동작).

(function () {
  'use strict';

  // ── (1) 햄버거 메뉴 ─────────────────────────────────────────────────────────
  var toggle = document.querySelector('[data-nav-toggle]');
  var menu = document.getElementById('site-menu');

  if (toggle && menu) {
    var setOpen = function (open) {
      menu.hidden = !open;
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
      document.body.classList.toggle('nav-open', open);
    };

    var isOpen = function () {
      return toggle.getAttribute('aria-expanded') === 'true';
    };

    toggle.addEventListener('click', function (e) {
      e.preventDefault();
      setOpen(!isOpen());
    });

    // 메뉴 안 링크 클릭 → 닫기(같은 페이지 이동/앵커여도 깔끔히 정리).
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });

    // 시트 밖 클릭 → 닫기.
    document.addEventListener('click', function (e) {
      if (!isOpen()) return;
      if (e.target === toggle || toggle.contains(e.target)) return;
      if (menu.contains(e.target)) return;
      setOpen(false);
    });

    // Esc → 닫고 토글에 포커스 복귀.
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen()) {
        setOpen(false);
        toggle.focus();
      }
    });

    // 데스크톱 폭으로 넘어가면(메뉴가 인라인으로 노출되므로) 시트 상태 초기화.
    if (window.matchMedia) {
      var mq = window.matchMedia('(min-width: 561px)');
      var onWide = function (e) {
        if (e.matches && isOpen()) setOpen(false);
      };
      if (mq.addEventListener) mq.addEventListener('change', onWide);
      else if (mq.addListener) mq.addListener(onWide);
    }
  }

  // ── (2) 모바일 접이식 목차 ──────────────────────────────────────────────────
  var tocM = document.querySelector('.wiki-toc-m');
  if (tocM) {
    tocM.addEventListener('click', function (e) {
      if (e.target.closest('a')) tocM.open = false;
    });
  }
})();
