// filter.js — 홈 카테고리 필터바 + 밴드 top-N 접기 (홈 전용, progressive enhancement).
//
//   기본 HTML 은 모든 밴드·카드를 전부 렌더한다(No-JS 폴백). 이 스크립트가 로드되면:
//     (1) 각 밴드를 top-N(TOP_N) 개로 접고 '+ 더 보기' 버튼을 노출.
//     (2) sticky 필터바 칩 클릭 → '전체'면 모든 밴드(접힘) 표시, 카테고리면 그 밴드만 펼쳐 표시.
//     (3) location.hash(#slug) 와 동기화 — 기존 [[category]] 위키링크가 필터를 활성화한다.
//
//   칩은 마크업상 <a>(앵커 폴백)라 클릭을 preventDefault 로 가로채 필터로 처리한다.

(function () {
  'use strict';

  var TOP_N = 6; // 밴드당 기본 노출 카드 수 (2행 × 3열)

  var filterBar = document.querySelector('.home-filter');
  if (!filterBar) return; // 홈이 아니면 무동작

  var chips = Array.prototype.slice.call(filterBar.querySelectorAll('.filter-chip'));
  var bands = Array.prototype.slice.call(document.querySelectorAll('.band[data-band]'));
  if (!bands.length) return;

  // slug → { band, grid, cards, moreBtn }
  var bySlug = {};
  var slugs = {};
  bands.forEach(function (band) {
    var slug = band.getAttribute('data-band');
    var grid = band.querySelector('.card-grid');
    var moreBtn = band.querySelector('.band-more');
    bySlug[slug] = {
      band: band,
      grid: grid,
      cards: grid ? Array.prototype.slice.call(grid.querySelectorAll('.card')) : [],
      moreBtn: moreBtn,
    };
    slugs[slug] = true;
  });

  // ── 밴드 접기/펼치기 ─────────────────────────────────────────────────────────
  function collapse(slug) {
    var b = bySlug[slug];
    if (!b) return;
    var over = b.cards.length > TOP_N;
    b.cards.forEach(function (card, i) {
      card.classList.toggle('is-clamped', i >= TOP_N);
    });
    if (b.moreBtn) {
      if (over) {
        b.moreBtn.hidden = false;
        b.moreBtn.textContent = '+ 더 보기 (' + (b.cards.length - TOP_N) + ')';
      } else {
        b.moreBtn.hidden = true;
      }
    }
  }

  function expand(slug) {
    var b = bySlug[slug];
    if (!b) return;
    b.cards.forEach(function (card) {
      card.classList.remove('is-clamped');
    });
    if (b.moreBtn) b.moreBtn.hidden = true;
  }

  // ── 필터 적용 ────────────────────────────────────────────────────────────────
  // active === 'all' → 전 밴드 표시(각 접힘). 그 외 → 해당 밴드만 펼쳐 표시.
  function apply(active) {
    if (active !== 'all' && !slugs[active]) active = 'all';

    bands.forEach(function (band) {
      var slug = band.getAttribute('data-band');
      if (active === 'all') {
        band.hidden = false;
        collapse(slug);
      } else if (slug === active) {
        band.hidden = false;
        expand(slug);
      } else {
        band.hidden = true;
      }
    });

    chips.forEach(function (chip) {
      var on = chip.getAttribute('data-filter') === active;
      chip.classList.toggle('is-active', on);
      chip.setAttribute('aria-pressed', String(on));
    });

    return active;
  }

  // ── hash 동기화 ──────────────────────────────────────────────────────────────
  function slugFromHash() {
    var h = (location.hash || '').replace(/^#/, '');
    return slugs[h] ? h : 'all';
  }

  function writeHash(active) {
    try {
      if (active === 'all') {
        history.replaceState(null, '', location.pathname + location.search);
      } else {
        history.replaceState(null, '', '#' + active);
      }
    } catch (e) {
      /* file:// 등 replaceState 불가 환경 — 무시 */
    }
  }

  // ── 이벤트 바인딩 ────────────────────────────────────────────────────────────
  chips.forEach(function (chip) {
    chip.addEventListener('click', function (e) {
      e.preventDefault();
      var active = apply(chip.getAttribute('data-filter'));
      writeHash(active);
    });
  });

  bands.forEach(function (band) {
    var moreBtn = band.querySelector('.band-more');
    if (moreBtn) {
      moreBtn.addEventListener('click', function () {
        expand(band.getAttribute('data-band'));
      });
    }
  });

  // 다른 페이지의 [[category]] 링크로 진입(또는 in-page hashchange) → 필터 동기화.
  window.addEventListener('hashchange', function () {
    apply(slugFromHash());
  });

  // 초기 상태: hash 가 카테고리면 그 필터로, 아니면 '전체'(접힘).
  apply(slugFromHash());
})();
