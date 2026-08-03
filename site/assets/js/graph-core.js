// graph-core.js — 캔버스로 그래프를 그리는 두 화면의 공통 부품.
//
//   소비자: constellation.js(홈 히어로 ambient 그래프) · graph-explorer.js(/graph/ 탐색기)
//
// 번들러가 없어 import 를 못 쓰므로 window.GraphCore 로 노출하고, 두 소비자보다 먼저
// 로드한다. <script defer> 는 문서 순서를 지키므로 templates.mjs 의 scripts 배열에서
// graph-core.js 를 앞에 두는 것으로 순서가 보장된다.
//
// 색은 CSS 토큰을 런타임에 읽는다. 하드코딩하지 않으므로 테마 토글이 그대로 따라온다.
// 노드 도메인은 graph.json 의 domain 필드다(빌드의 domains.mjs 가 단일 소스).

(function () {
  'use strict';

  // ── CSS 토큰 ───────────────────────────────────────────────────────────────
  function token(name, fallback) {
    var v = getComputedStyle(document.documentElement).getPropertyValue(name);
    return (v && v.trim()) || fallback;
  }

  // 한 번의 getComputedStyle 로 그래프가 쓰는 색을 모두 읽는다.
  // core 는 --signal(아쿠아), physical 은 --signal-physical(앰버).
  function palette() {
    var cs = getComputedStyle(document.documentElement);
    var get = function (name, fallback) {
      var v = cs.getPropertyValue(name);
      return (v && v.trim()) || fallback;
    };
    return {
      bg: get('--bg', '#0b0e14'),
      surface: get('--surface', '#141923'),
      text: get('--text', '#e6e9ef'),
      muted: get('--muted', '#8a93a3'),
      faint: get('--faint', '#5a6373'),
      hairline: get('--hairline', '#232a38'),
      signal: get('--signal', '#5eead4'),
      signalDim: get('--signal-dim', 'rgba(94,234,212,.25)'),
      physical: get('--signal-physical', '#f0a868'),
      physicalDim: get('--signal-physical-dim', 'rgba(240,168,104,.25)'),
    };
  }

  // 노드 도메인 → 강조색. graph.json 에 domain 이 없던 시절 캐시를 만나면 core 로 떨어진다.
  function isPhysical(node) {
    return !!node && node.domain === 'physical';
  }

  function nodeColor(node, pal) {
    return isPhysical(node) ? pal.physical : pal.signal;
  }

  // ── 캔버스 ─────────────────────────────────────────────────────────────────
  function reduceMotion() {
    return !!(
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }

  // CSS 픽셀 크기를 재고 devicePixelRatio 를 반영해 백버퍼를 맞춘다.
  // 반환 { w, h } 는 CSS 픽셀 — 그리기 좌표계는 언제나 CSS 픽셀이다.
  function fitCanvas(canvas, ctx) {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var rect = canvas.getBoundingClientRect();
    var w = rect.width;
    var h = rect.height;
    canvas.width = Math.max(1, Math.floor(w * dpr));
    canvas.height = Math.max(1, Math.floor(h * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { w: w, h: h };
  }

  // 리사이즈 구독. ResizeObserver 가 있으면 요소 크기를, 없으면 window 리사이즈를 본다.
  // 두 경로 모두 디바운스해 연속 이벤트에서 레이아웃을 반복 계산하지 않는다.
  function onResize(el, cb, delay) {
    var wait = delay == null ? 120 : delay;
    var timer = null;
    var fire = function () {
      if (timer) clearTimeout(timer);
      timer = setTimeout(cb, wait);
    };
    if (window.ResizeObserver) {
      var ro = new ResizeObserver(fire);
      ro.observe(el);
      return function () {
        ro.disconnect();
        if (timer) clearTimeout(timer);
      };
    }
    window.addEventListener('resize', fire);
    return function () {
      window.removeEventListener('resize', fire);
      if (timer) clearTimeout(timer);
    };
  }

  // 테마 전환 구독 — theme.js 가 <html data-theme> 를 바꾸면 다시 그려야 색이 맞는다.
  function onThemeChange(cb) {
    if (!window.MutationObserver) return function () {};
    var mo = new MutationObserver(cb);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return function () {
      mo.disconnect();
    };
  }

  // ── 그래프 자료구조 ────────────────────────────────────────────────────────
  function fetchGraph(url) {
    return fetch(url).then(function (r) {
      return r.json();
    });
  }

  // 노드 배열 → { index: {id: i}, neighbors: [[i,…],…] }.
  // 인접은 한 번만 만들어 두고 호버마다 재계산하지 않는다.
  function buildAdjacency(nodes, edges) {
    var index = {};
    var i;
    for (i = 0; i < nodes.length; i++) index[nodes[i].id] = i;

    var sets = [];
    for (i = 0; i < nodes.length; i++) sets.push({});
    for (i = 0; i < edges.length; i++) {
      var s = index[edges[i].source];
      var t = index[edges[i].target];
      if (s == null || t == null || s === t) continue;
      sets[s][t] = 1;
      sets[t][s] = 1;
    }
    var neighbors = sets.map(function (set) {
      return Object.keys(set).map(Number);
    });
    return { index: index, neighbors: neighbors };
  }

  window.GraphCore = {
    token: token,
    palette: palette,
    isPhysical: isPhysical,
    nodeColor: nodeColor,
    reduceMotion: reduceMotion,
    fitCanvas: fitCanvas,
    onResize: onResize,
    onThemeChange: onThemeChange,
    fetchGraph: fetchGraph,
    buildAdjacency: buildAdjacency,
  };
})();
