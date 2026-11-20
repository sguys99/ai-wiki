// graph-explorer.js — /graph/ 탐색기. 정본은 docs/graph-spec/ (01 화면, 02 인터랙션, 03 스키마, 04 배치와 그리기).
//
// 서버는 main.graph[data-view="list"] (카테고리별 목록) 로 내보낸다. 이 스크립트가 graph.json v2 를
// 받아 그릴 준비를 마쳐야만 "map" 으로 바꾼다. 실패하면 목록 판이 그대로 남고 안내 한 줄을 단다.
//
// 배치는 빌드가 계산해 노드 xy 에 실었다. 브라우저는 force 계산을 하지 않는다 (04 L2).
// 구성: 데이터 → 상태(cam, 화면 크기) → 좌표 변환 → 그리기(필요할 때만 rAF) → 판 전환.
// 시각 표현은 확정 시안 docs/graph-mockups/f-atlas-orbit.html 의 성도 화면을 옮겼다.

(function () {
  'use strict';

  var GC = window.GraphCore;
  var main = document.querySelector('main.graph');
  var stage = main && main.querySelector('.graph-stage');
  var canvas = stage && stage.querySelector('.graph-canvas');
  if (!GC || !canvas) return;

  var listEl = document.getElementById('graph-list');
  var noteEl = document.getElementById('graph-list-note');
  var toMapBtn = document.getElementById('graph-to-map');
  var toListBtn = document.getElementById('graph-to-list');
  var header = document.querySelector('.site-header');

  function fail(err) {
    console.warn('[graph] 그래프를 그리지 못해 목록 판을 유지한다:', err && err.message ? err.message : err);
    main.dataset.view = 'list';
    stage.hidden = true;
    listEl.hidden = false;
    toMapBtn.hidden = true;
    noteEl.textContent = '그래프를 불러오지 못해 목록으로 보여 드립니다.';
    noteEl.hidden = false;
  }

  var ctx = canvas.getContext('2d');
  if (!ctx) return fail('2D context 없음');

  GC.fetchGraph(canvas.dataset.graph)
    .then(function (graph) {
      if (!graph || graph.version !== 2 || !Array.isArray(graph.nodes) || !Array.isArray(graph.links))
        throw new Error('graph.json version 2 가 아니다');
      graph.nodes.forEach(function (n) {
        if (!n.xy || !isFinite(n.xy[0]) || !isFinite(n.xy[1])) throw new Error('노드 xy 없음: ' + n.id);
      });
      run(graph);
    })
    .catch(fail);

  function run(graph) {
    var TAU = Math.PI * 2;
    var reduce = GC.reduceMotion();
    var START = -Math.PI / 2; // 궤도 각도는 꼭대기에서 시계 방향 (04 4.1)
    var CAP2 = 28, TRACK = 24, LABEL_ROOM = 150;
    var ATLAS = -2;           // n.role: 조감. -1 궤도의 배경, 0 중심, 1 이웃, 2 두 다리
    var BASE = canvas.dataset.base || '/';

    // ── 데이터 ─────────────────────────────────────────────────────────────
    // n.hx, n.hy: home (구운 배치, 세로 화면이면 x와 y 교환). n.x, n.y: 지금 그리는 위치 (전환 중 다르다).
    // n.p 알파, n.lt 노드별 전환 진행, n.e 이징된 진행 (반지름 보간), n.f / n.t 전환 출발과 목표.
    var nodes = graph.nodes.map(function (d, i) {
      return {
        i: i, id: d.id, stem: d.stem || '', title: d.title, category: d.category, degree: d.degree, tags: d.tags || [],
        year: d.year, type: d.type,
        xy: d.xy, r: Math.min(20, 2 + 1.6 * Math.sqrt(d.degree)), label: shortTitle(d.title),
        hx: 0, hy: 0, x: 0, y: 0, nb: new Set(), out: new Set(),
        role: ATLAS, p: 1, lt: 1, e: 1, front: false, cap: 0, delay: 0, f: null, t: null, fr0: ATLAS, fc0: 0,
      };
    });
    var N = nodes.length;
    var byId = {};
    nodes.forEach(function (n) { byId[n.id] = n; });
    var edges = [];
    var L = graph.links;
    for (var li = 0; li + 1 < L.length; li += 2) {
      var s = nodes[L[li]], t = nodes[L[li + 1]];
      if (s && t && s !== t) { edges.push({ s: s, t: t }); s.nb.add(t); t.nb.add(s); s.out.add(t); }
    }
    // 같은 카테고리 엣지는 그 색 실로, 넘는 엣지는 중성 실로 묶어 stroke 한 번에 긋는다
    var buckets = {};
    edges.forEach(function (e) {
      var key = e.s.category === e.t.category ? e.s.category : '_x';
      (buckets[key] = buckets[key] || []).push(e);
    });
    var bucketKeys = Object.keys(buckets);
    // 큰 노드를 나중에 그려 위에 오게 한다
    var rank = nodes.slice().sort(function (a, b) { return b.degree - a.degree; });
    rank.forEach(function (n, i) { n.rank = i; });

    // 카테고리 이름은 서버가 그린 범례에서 읽는다 (빌드가 단일 출처)
    var catName = {};
    stage.querySelectorAll('.graph-legend-item[data-cat]').forEach(function (b) {
      var nm = b.querySelector('.graph-legend-name');
      catName[b.dataset.cat] = nm ? nm.textContent.trim() : b.dataset.cat;
    });
    var cats = [];
    nodes.forEach(function (n) { if (cats.indexOf(n.category) < 0) cats.push(n.category); });
    // 궤도 정렬은 범례 순서 (페이지 수 내림차순, 04 4.2)
    var CAT_ORDER = {};
    Object.keys(catName).forEach(function (c, i) { CAT_ORDER[c] = i; });
    cats.forEach(function (c) { if (!(c in CAT_ORDER)) CAT_ORDER[c] = 99; });
    function primaryTag(n) {
      for (var i = 0; i < n.tags.length; i++) if (n.tags[i] !== n.category && n.tags[i] !== 'physical-ai') return n.tags[i];
      return '';
    }

    function clearWidths() { nodes.forEach(function (n) { n.tw = null; }); fitCache.clear(); }
    var fitCache = new Map();
    function shortTitle(t) {
      var c = t.indexOf(':');
      if (c >= 2 && c <= 28 && !/[ㄱ-힝]/.test(t.slice(0, c))) return t.slice(0, c);
      return t.length > 28 ? t.slice(0, 27) + '…' : t;
    }

    // ── 상태 ───────────────────────────────────────────────────────────────
    var W = 0, H = 0, dpr = 1;
    var cam = { x: 0, y: 0, k: 1 }; // screen = world × k + (x, y)
    var K_MIN = 0.2, K_MAX = 6;
    var DUR_CAMERA = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--dur-camera')) || 480;
    var flight = null;       // { a, b, ax, ay, t0, dur, to, kind } 카메라 비행 (02 3.1절). kind 'exit' 는 복귀 비행
    var glide = null;        // { vx, vy } 손을 뗀 뒤 관성 팬, px/ms (02 J1)
    var wz = null;           // { k, px, py } 휠 줌 목표. 매 프레임 다가간다
    var wheelT = 0, lastNow = 0;
    var bounds = null;       // home 외곽 (world). 팬 경계에 쓴다
    var portrait = null;
    var fitted = false;      // 무대가 처음 보일 때 한 번 화면 맞춤
    var revealT0 = reduce ? -1 : null; // 첫 등장 시각. -1 은 연출 없음
    var morph = null;        // { t0, kind, dur, mixDur } 노드가 n.f 에서 n.t 로 옮겨 가는 중 (kind: home, enter, exit, recenter)
    var catInfo = [];        // 성운 이름 자리 계산용 카테고리 중심과 외곽 (home 기준)
    var T = null, dark = true, sprites = {}, bg = null, dust = null, haze = null;
    var chromeCache = null, namesCache = null;
    var drawTimes = [], drawnNodes = 0, drawnLabels = 0;

    // 선택과 궤도 (02 2절 B, C 영역). 6번(hash)과 7번(키보드)은 selectNode, recenter, exitOrbit 을 부른다
    var mode = 'atlas';
    var view = null, prevView = null; // 궤도 배치. prevView 는 중심 옮기기의 교차 페이드용
    var C = { x: 0, y: 0 };           // 궤도 중심 (world). 처음 고른 노드의 home
    var orbitMix = 0, mixFrom = 0, mixTo = 0;
    var atlasCam = null;              // 들어가기 직전 조감 카메라. 나갈 때 돌아간다 (04 6.3)
    var hovered = null, cursor = null, hotPlus = false, expanded = false, trail = []; // cursor: 궤도의 키보드 커서 (02 1절)
    var emph = new Float32Array(N).fill(1), hoverLift = new Float32Array(N);
    var pulseT0 = -1, shimmerUntil = 0;
    var pillBox = null, labelBoxes = [], orbitLabelCount = 0, centerPill = null;
    var sheetFull = false, sheetH = 0; // 모바일 시트 상태와 목표 높이 (px)
    // 필터 (02 8절). 축 안 OR, 축 사이 AND. inF 는 필터 안 여부, lit 은 그리기용 (범례 미리 강조 포함)
    var filt = { cat: new Set(), type: new Set(), tag: new Set() };
    var inF = new Uint8Array(N).fill(1), lit = new Uint8Array(N).fill(1), litCat = {};
    var fActive = false, fCount = N, legendHover = null, fMix = 0;
    var weakOn = false, weakMix = 0; // 약한 연결 렌즈 (06 12.2 E3). 필터가 아니라 표시라 hash 에 싣지 않는다
    var searchHits = new Set(); // 검색 상위 40개: 라벨 강제 후보와 캔버스 고리 (02 7.3)
    var popSwallow = false;      // 팝오버 밖 탭은 노드를 고르지 않는다 (02 2.6)
    // URL (02 8.4 ~ 8.6). hash 를 읽어 상태를 바꾸는 동안과 시작 전에는 history 를 쓰지 않는다
    var applying = true, expectBack = false;

    // ── 좌표 변환 ─────────────────────────────────────────────────────────
    function sx(wx) { return wx * cam.k + cam.x; }
    function sy(wy) { return wy * cam.k + cam.y; }
    function camFor(wx, wy, k, px, py) { return { x: px - wx * k, y: py - wy * k, k: k }; }
    // screen → world. 뒤 항목(선택, 검색)도 이것을 쓴다
    function toWorld(px, py, c) { c = c || cam; return { x: (px - c.x) / c.k, y: (py - c.y) / c.k }; }
    function clampK(k) { return Math.max(K_MIN, Math.min(K_MAX, k)); }
    function isMobile() { return W <= 640; }
    function headerH() { return header ? header.offsetHeight : 0; }

    // 조감 맞춤 영역: 헤더 유리판 밑. 모바일은 명령 줄과 한 줄 범례 자리를 비운다 (04 7.1, 01 5.4)
    function atlasRect() {
      var top = headerH();
      if (isMobile()) top += 60; // inset 16 + 명령 줄 38 + 6
      var bottom = isMobile() ? 56 : 0; // inset 16 + 견본 26 + 14
      return { x: 0, y: top, w: W, h: Math.max(120, H - top - bottom) };
    }
    function fitTarget(list) {
      var minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
      list.forEach(function (n) {
        minX = Math.min(minX, n.hx - n.r); maxX = Math.max(maxX, n.hx + n.r);
        minY = Math.min(minY, n.hy - n.r); maxY = Math.max(maxY, n.hy + n.r);
      });
      var v = atlasRect(), pad = Math.min(v.w, v.h) * 0.06;
      var k = Math.min((v.w - pad * 2) / Math.max(1, maxX - minX), (v.h - pad * 2) / Math.max(1, maxY - minY));
      k = Math.max(K_MIN, Math.min(2.4, k));
      return camFor((minX + maxX) / 2, (minY + maxY) / 2, k, v.x + v.w / 2, v.y + v.h / 2);
    }

    // 세로 화면은 구운 가로 배치의 x, y 를 맞바꾼다 (03 3.2, 04 3.4)
    function setHome(p) {
      portrait = p;
      nodes.forEach(function (n) {
        n.hx = p ? n.xy[1] : n.xy[0];
        n.hy = p ? n.xy[0] : n.xy[1];
      });
      bounds = { x0: Infinity, y0: Infinity, x1: -Infinity, y1: -Infinity };
      nodes.forEach(function (n) {
        bounds.x0 = Math.min(bounds.x0, n.hx); bounds.x1 = Math.max(bounds.x1, n.hx);
        bounds.y0 = Math.min(bounds.y0, n.hy); bounds.y1 = Math.max(bounds.y1, n.hy);
      });
      catInfo = cats.map(function (c) {
        var ns = nodes.filter(function (n) { return n.category === c; });
        var xs = ns.map(function (n) { return n.hx; }).sort(function (a, b) { return a - b; });
        var ys = ns.map(function (n) { return n.hy; }).sort(function (a, b) { return a - b; });
        return { id: c, name: catName[c] || c, n: ns.length, x: xs[xs.length >> 1], y: ys[ys.length >> 1],
          top: ys[0], bottom: ys[ys.length - 1], left: xs[0], right: xs[xs.length - 1] };
      });
      if (T) buildHaze();
      namesCache = null;
    }
    // 노드 전환 하나로 세로 전환, 궤도 들어가기, 나가기, 중심 옮기기를 모두 돈다 (04 6.1, 6.2).
    // 언제나 각 노드의 지금 위치와 알파에서 출발하므로 전환 도중 다시 불러도 튀지 않는다 (04 6.4)
    function setTargets(v, kind) {
      nodes.forEach(function (n) {
        var p = v ? v.pos.get(n.id) : null, old = n.role, tx, ty, tp, role;
        if (p) { tx = C.x + Math.cos(p.ang) * p.rad; ty = C.y + Math.sin(p.ang) * p.rad; tp = p.ring === 2 ? 0.62 : 1; role = p.ring; }
        else { tx = n.hx; ty = n.hy; tp = v ? T.backdrop : 1; role = v ? -1 : ATLAS; }
        n.f = { x: n.x, y: n.y, p: n.p };
        n.t = { x: tx, y: ty, p: tp };
        n.fr0 = old; n.fc0 = n.cap; // 반지름도 이전 역할의 크기에서 보간한다
        var fr = Math.hypot(n.x - C.x, n.y - C.y), trr = p ? p.rad : 0;
        n.polar = kind === 'recenter' && old >= 1 && role >= 1 && fr > 24 && trr > 24;
        if (n.polar) { n.pr = fr; n.pa = Math.atan2(n.y - C.y, n.x - C.x); n.qr = trr; n.qa = p.ang; }
        var delay = 0;
        if (kind === 'enter' && p) delay = p.ring === 0 ? 0 : p.ring === 1 ? 40 + 160 * frac(p.ang) : 200 + 160 * frac(p.ang);
        if (kind === 'exit' && old >= 0) delay = old === 2 ? 0 : old === 1 ? 60 + 120 * frac(Math.atan2(n.y - C.y, n.x - C.x)) : 140;
        n.delay = delay;
        n.front = role >= 0 || old >= 0;
        n.role = role;
        n.cap = p ? p.cap || 0 : 0;
        n.lt = 0; n.e = 0;
      });
      mixFrom = orbitMix; mixTo = v ? 1 : 0;
      morph = { t0: performance.now(), kind: kind, dur: kind === 'recenter' ? 600 : 640,
        mixDur: kind === 'enter' ? 760 : kind === 'recenter' ? 600 : 640 };
      if (reduce) morph.t0 = -1e9;
      namesCache = null;
    }
    function stepMorph(now) {
      if (!morph) return false;
      var el = now - morph.t0, busy = false, rc = morph.kind === 'recenter';
      for (var i = 0; i < N; i++) {
        var n = nodes[i], lt = clamp((el - n.delay) / morph.dur);
        if (lt < 1) busy = true;
        var t = rc ? ease4(lt) : easeIO(lt);
        n.lt = lt; n.e = t;
        if (n.polar) {
          var rad = n.pr + (n.qr - n.pr) * t, ang = lerpAng(n.pa, n.qa, t);
          n.x = C.x + Math.cos(ang) * rad; n.y = C.y + Math.sin(ang) * rad;
        } else { n.x = n.f.x + (n.t.x - n.f.x) * t; n.y = n.f.y + (n.t.y - n.f.y) * t; }
        n.p = n.f.p + (n.t.p - n.f.p) * t;
      }
      var mt = clamp(el / morph.mixDur);
      orbitMix = mixFrom + (mixTo - mixFrom) * easeIO(mt);
      if (mt < 1) busy = true;
      if (!busy) {
        if (morph.kind === 'enter' || morph.kind === 'recenter') shimmerUntil = reduce ? 0 : now + 7000;
        morph = null; prevView = null;
        nodes.forEach(function (n) { n.front = n.role >= 0; n.fr0 = n.role; n.fc0 = n.cap; });
        namesCache = null;
      }
      return true;
    }
    function easeIO(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
    function ease4(t) { return 1 - Math.pow(1 - t, 4); }
    function clamp(t) { return t < 0 ? 0 : t > 1 ? 1 : t; }
    function lerpAng(a, b, t) { var d = ((b - a) % TAU + TAU * 1.5) % TAU - TAU / 2; return a + d * t; }
    function frac(ang) { return (((ang - START) % TAU) + TAU) % TAU / TAU; }

    // ── 카메라: 비행, 휠 줌, 관성, 팬 경계 (02 3절, 04 6.3절) ─────────────
    // 사용 영역 중앙의 world 점과 log k 를 4차 ease-out 으로 옮긴다. 줌만 바뀌면 그 점이 화면에 고정된다
    function flyTo(target, dur, kind) {
      wz = null; glide = null;
      if (reduce || dur === 0) { cam = { x: target.x, y: target.y, k: target.k }; flight = null; redraw(); return; }
      var v = useRect(), ax = v.x + v.w / 2, ay = v.y + v.h / 2, a = toWorld(ax, ay), b = toWorld(ax, ay, target);
      flight = { a: { x: a.x, y: a.y, lk: Math.log(cam.k) }, b: { x: b.x, y: b.y, lk: Math.log(target.k) },
        ax: ax, ay: ay, t0: performance.now(), dur: dur || DUR_CAMERA, to: { x: target.x, y: target.y, k: target.k }, kind: kind || '' };
      redraw();
    }
    function stepFlight(now) {
      if (!flight) return false;
      var f = flight, t = clamp((now - f.t0) / f.dur), e = 1 - Math.pow(1 - t, 4);
      if (t >= 1) { cam = { x: f.to.x, y: f.to.y, k: f.to.k }; flight = null; return true; }
      cam = camFor(f.a.x + (f.b.x - f.a.x) * e, f.a.y + (f.b.y - f.a.y) * e, Math.exp(f.a.lk + (f.b.lk - f.a.lk) * e), f.ax, f.ay);
      return true;
    }
    function zoomAt(px, py, k) {
      var w = toWorld(px, py);
      cam = camFor(w.x, w.y, clampK(k), px, py);
      constrain();
    }
    // 휠 한 칸의 계단을 짧게 풀어 준다 (시상수 60ms). 커서 아래 world 점은 매 프레임 고정이다
    function stepWheel(dt) {
      if (!wz) return false;
      var d = Math.log(wz.k / cam.k);
      if (Math.abs(d) < 0.002) { zoomAt(wz.px, wz.py, wz.k); wz = null; return true; }
      zoomAt(wz.px, wz.py, cam.k * Math.exp(d * (1 - Math.exp(-dt / 60))));
      return true;
    }
    function stepGlide(dt) {
      if (!glide) return false;
      var x = cam.x + glide.vx * dt, y = cam.y + glide.vy * dt;
      cam.x = x; cam.y = y; constrain();
      if (cam.x !== x) glide.vx = 0; // 경계에 닿은 축은 멈춘다
      if (cam.y !== y) glide.vy = 0;
      var f = Math.pow(0.92, dt / 16.67);
      glide.vx *= f; glide.vy *= f;
      if (Math.hypot(glide.vx, glide.vy) < 0.015) glide = null;
      return true;
    }
    // 팬 경계: 배치 외곽이 화면 가장자리에서 짧은 변의 25% 안쪽까지는 남게 한다. 지도를 잃지 않는다
    function constrain() {
      if (!bounds) return;
      // 궤도에서는 궤도 원판을 잃지 않게 한다
      var bb = mode === 'orbit' && view ? { x0: C.x - view.R2o, x1: C.x + view.R2o, y0: C.y - view.R2o, y1: C.y + view.R2o } : bounds;
      var m = Math.min(W, H) * 0.25, k = cam.k;
      var l = bb.x0 * k + cam.x, r = bb.x1 * k + cam.x, t = bb.y0 * k + cam.y, b = bb.y1 * k + cam.y;
      if (r < m) cam.x += m - r; else if (l > W - m) cam.x -= l - (W - m);
      if (b < m) cam.y += m - b; else if (t > H - m) cam.y -= t - (H - m);
    }
    // 버튼 줌: 사용 영역 중앙 기준 비행. 비행 중 또 누르면 그 목표에 곱한다 (02 3.2절)
    function zoomBy(f) {
      if (wz) { zoomAt(wz.px, wz.py, wz.k); wz = null; }
      var to = flight ? flight.to : cam;
      var k = clampK(to.k * f);
      if (Math.abs(k - to.k) < 1e-6) return;
      var v = useRect(), cx = v.x + v.w / 2, cy = v.y + v.h / 2, w = toWorld(cx, cy, to);
      flyTo(camFor(w.x, w.y, k, cx, cy), DUR_CAMERA);
    }
    // 맞춤: 조감은 필터 안 노드 (없으면 전체), 궤도는 궤도 카메라 (02 3.4절)
    function fitView() { flyTo(mode === 'orbit' && view ? orbitCam(view) : fitTarget(fCount ? filtered() : nodes), DUR_CAMERA); }
    function filtered() { return nodes.filter(function (n) { return inF[n.i]; }); }
    function useRect() { return mode === 'orbit' && view ? orbitRect() : atlasRect(); }

    // 궤도 사용 영역: 경로 줄 아래, 패널(또는 시트와 범례) 바깥. 숫자 대신 크롬에서 구한다 (01 10절, 04 6.3)
    var mqLand = window.matchMedia ? window.matchMedia('(max-height: 480px)') : { matches: false };
    function orbitRect() {
      var inset = parseFloat(getComputedStyle(trailEl).left) || 16;
      var top = trailEl.hidden ? headerH() + inset + 76 : trailEl.offsetTop + trailEl.offsetHeight;
      var left = inset, right = inset, bottom = 20, land = mqLand.matches;
      if (land) left = dock.offsetLeft + dock.offsetWidth + 8; // 휴대폰 가로: 왼쪽 세로 범례 (01 5.5)
      if (isMobile()) {
        top += 12;
        bottom = sheetH + (sheetFull || land ? 20 : inset + dock.offsetHeight + 6);
      } else {
        top += 20;
        right = W - panel.offsetLeft + inset;
      }
      return { x: left, y: top, w: Math.max(80, W - left - right), h: Math.max(80, H - top - bottom) };
    }
    function orbitCam(v) {
      var a = orbitRect(), ext = isMobile() ? (v.r2.length ? v.R2o : v.R1o) + 36 : v.extent;
      var k = Math.max(0.2, Math.min(1.6, Math.min(a.w, a.h) / (2 * ext)));
      return camFor(C.x, C.y, k, a.x + a.w / 2, a.y + a.h / 2);
    }

    // ── 궤도 배치 (04 4절). 고를 때마다 계산한다 (노드당 약 0.03ms) ────────
    function placeRing(list, R, tracks, reserve, ring, pos, arcs, arcR, cap) {
      if (!list.length) return;
      var groups = 1;
      for (var i = 1; i < list.length; i++) if (list[i].category !== list[i - 1].category) groups++;
      var gap = groups > 1 ? Math.min(0.09, 0.7 / groups) : 0;
      var step = (TAU - reserve - gap * (groups > 1 ? groups : 0)) / list.length;
      var a = START + reserve / 2 + gap / 2, arc = null;
      list.forEach(function (n, j) {
        if (j > 0 && n.category !== list[j - 1].category) a += gap;
        pos.set(n.id, { rad: R + (tracks > 1 ? j % tracks : 0) * TRACK, ang: a + step / 2, ring: ring, cap: cap });
        if (!arc || arc.cat !== n.category) { arc = { cat: n.category, a0: a, a1: a + step, r: arcR, n: 1, m: [n] }; arcs.push(arc); }
        else { arc.a1 = a + step; arc.n++; arc.m.push(n); }
        a += step;
      });
    }
    function catThenTag(list) {
      var freq = {};
      list.forEach(function (n) { var key = n.category + '|' + primaryTag(n); freq[key] = (freq[key] || 0) + 1; });
      return function (a, b) {
        var ka = a.category + '|' + primaryTag(a), kb = b.category + '|' + primaryTag(b);
        return CAT_ORDER[a.category] - CAT_ORDER[b.category] || freq[kb] - freq[ka] || (ka < kb ? -1 : ka > kb ? 1 : 0) ||
          b.degree - a.degree || (a.id < b.id ? -1 : 1);
      };
    }
    function layout(cid, all) {
      var c = byId[cid], pos = new Map(), arcs = [], oedges = [];
      pos.set(cid, { rad: 0, ang: 0, ring: 0 });
      var r1 = Array.from(c.nb);
      r1.sort(catThenTag(r1));
      var tracks1 = r1.length <= 40 ? 1 : r1.length <= 90 ? 2 : 3;
      var R1 = Math.max(130, r1.length / tracks1 * 21 / TAU);
      placeRing(r1, R1, tracks1, 0, 1, pos, arcs, R1 - 16, 0.4 * TAU * R1 / Math.max(1, r1.length / tracks1));
      var R1o = R1 + (tracks1 - 1) * TRACK;
      var set1 = new Set(r1), par = new Map();
      r1.forEach(function (n) {
        n.nb.forEach(function (y) {
          if (y === c || set1.has(y)) return;
          if (!par.has(y)) par.set(y, []);
          par.get(y).push(n);
        });
      });
      var cand = Array.from(par.keys());
      cand.sort(function (a, b) { return par.get(b).length - par.get(a).length || b.degree - a.degree || (a.id < b.id ? -1 : 1); });
      var kept = all ? cand : cand.slice(0, CAP2);
      var hidden = cand.length - kept.length, mean = new Map();
      kept.forEach(function (n) {
        var mx = 0, my = 0;
        par.get(n).forEach(function (p) { var q = pos.get(p.id); mx += Math.cos(q.ang); my += Math.sin(q.ang); });
        mean.set(n, ((Math.atan2(my, mx) - START) % TAU + TAU) % TAU);
      });
      kept.sort(function (a, b) { return CAT_ORDER[a.category] - CAT_ORDER[b.category] || mean.get(a) - mean.get(b); });
      var tracks2 = Math.min(3, Math.max(1, Math.ceil(kept.length / 72)));
      var R2 = Math.max(R1o + LABEL_ROOM, kept.length / tracks2 * 16 / TAU);
      var reserve = hidden > 0 ? Math.min(0.5, 70 / R2) : 0;
      placeRing(kept, R2, tracks2, reserve, 2, pos, arcs, R2 - 26, 0.4 * (TAU * R2 - 70) / Math.max(1, kept.length / tracks2));
      var R2o = R2 + (tracks2 - 1) * TRACK;
      r1.forEach(function (n) {
        oedges.push([c, n, 0]);
        n.nb.forEach(function (b) { if (set1.has(b) && n.id < b.id) oedges.push([n, b, 1]); });
      });
      kept.forEach(function (n) { par.get(n).forEach(function (p) { oedges.push([p, n, 2]); }); });
      var guides = [];
      for (var t = 0; t < tracks1; t++) guides.push(R1 + t * TRACK);
      if (kept.length) for (t = 0; t < tracks2; t++) guides.push(R2 + t * TRACK);
      return { cid: cid, c: c, pos: pos, arcs: arcs, edges: oedges, guides: guides, r1: r1, r2: kept,
        R1: R1, R1o: R1o, R2: R2, R2o: R2o, hidden: hidden, total2: cand.length,
        extent: (kept.length ? R2o : R1o) + 130, t0: performance.now() };
    }
    function moving(now) { return !!(flight || glide || wz || morph || (gesture && gesture.moved) || now - wheelT < 160); }

    // ── 토큰, 스프라이트, 배경 ───────────────────────────────────────────
    // main.graph 가 사이트 토큰 일부를 시안 F 값으로 덮어쓰므로 main 에서 읽는다
    function readTokens() {
      var cs = getComputedStyle(main), g = function (n) { return cs.getPropertyValue(n).trim(); };
      var cat = {};
      cats.concat(['etc']).forEach(function (c) { cat[c] = g('--cat-' + c); });
      cats.forEach(function (c) { if (!cat[c]) cat[c] = cat.etc; });
      return {
        specular: rgbOf(g('--graph-specular')), shade: rgbOf(g('--graph-shade')), shadowInk: rgbOf(g('--graph-shadow-ink')),
        cat: cat, edge: g('--graph-edge'), edgeAlpha: parseFloat(g('--graph-edge-alpha')),
        label: g('--graph-label'), labelMuted: g('--graph-label-muted'), labelHalo: g('--graph-label-halo'),
        glowAlpha: parseFloat(g('--graph-glow-alpha')),
        bgCore: g('--graph-bg-core'), bgEdge: g('--graph-bg-edge'), vignette: g('--graph-vignette'),
        dust: g('--graph-dust'), dustAlpha: parseFloat(g('--graph-dust-alpha')),
        blend: g('--graph-filament-blend') || 'source-over', shadow: parseFloat(g('--graph-shadow-alpha')),
        font: g('--font-display'), mono: g('--font-mono'),
        edgeHi: parseFloat(g('--graph-edge-hi-alpha')), backdrop: parseFloat(g('--graph-backdrop-alpha')) || 0.16,
        dim: parseFloat(g('--graph-dim-alpha')) || 0.14,
        lens: g('--graph-lens'), hairline: g('--hairline'), signal: g('--signal'), text: g('--text'), muted: g('--muted'),
      };
    }
    function rgbOf(c) {
      if (c.charAt(0) === '#') {
        if (c.length === 4) c = '#' + c[1] + c[1] + c[2] + c[2] + c[3] + c[3];
        return [parseInt(c.substr(1, 2), 16), parseInt(c.substr(3, 2), 16), parseInt(c.substr(5, 2), 16)];
      }
      var m = c.match(/[\d.]+/g) || [0, 0, 0];
      return [+m[0], +m[1], +m[2]];
    }
    function rgba(c, a) { return 'rgba(' + Math.round(c[0]) + ',' + Math.round(c[1]) + ',' + Math.round(c[2]) + ',' + a + ')'; }
    function mixc(a, b, t) { return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]; }
    function mk(w, h) { var c = document.createElement('canvas'); c.width = w; c.height = h || w; return c; }

    // 노드 구슬: 카테고리마다 한 번 그려 두고 drawImage 로 붙인다 (프레임마다 그라데이션 없음)
    var SR = 56;
    function buildSprites() {
      sprites = {};
      var WHITE = T.specular, BLACK = T.shade, spec = function (a) { return rgba(WHITE, a); };
      cats.forEach(function (id) {
        var col = rgbOf(T.cat[id]), S = SR * 2 + 8, o = S / 2;
        var core = mk(S), g = core.getContext('2d');
        var gr = g.createRadialGradient(o - SR * 0.34, o - SR * 0.4, SR * 0.04, o, o, SR);
        if (dark) {
          gr.addColorStop(0, rgba(mixc(col, WHITE, 0.72), 1)); gr.addColorStop(0.32, rgba(mixc(col, WHITE, 0.18), 1));
          gr.addColorStop(0.78, rgba(col, 1)); gr.addColorStop(1, rgba(mixc(col, BLACK, 0.38), 1));
        } else {
          gr.addColorStop(0, rgba(mixc(col, WHITE, 0.5), 1)); gr.addColorStop(0.3, rgba(mixc(col, WHITE, 0.1), 1));
          gr.addColorStop(0.75, rgba(col, 1)); gr.addColorStop(1, rgba(mixc(col, BLACK, 0.32), 1));
        }
        if (id === 'etc') { // 유리 고리: 색이 아니어도 모양으로 구분된다
          g.lineWidth = SR * 0.26; g.strokeStyle = gr;
          g.beginPath(); g.arc(o, o, SR * 0.86, 0, TAU); g.stroke();
        } else {
          g.fillStyle = gr; g.beginPath(); g.arc(o, o, SR, 0, TAU); g.fill();
          // 아래쪽 반사광
          var b = g.createRadialGradient(o + SR * 0.15, o + SR * 0.62, 0, o + SR * 0.15, o + SR * 0.62, SR * 0.55);
          b.addColorStop(0, dark ? rgba(mixc(col, WHITE, 0.5), 0.35) : spec(0.32));
          b.addColorStop(1, spec(0));
          g.save(); g.beginPath(); g.arc(o, o, SR, 0, TAU); g.clip(); g.fillStyle = b; g.fillRect(0, 0, S, S); g.restore();
          g.lineWidth = dark ? 2.2 : 3; g.strokeStyle = dark ? rgba(mixc(col, WHITE, 0.6), 0.35) : spec(0.85);
          g.beginPath(); g.arc(o, o, SR - (dark ? 1.2 : 1.6), 0, TAU); g.stroke();
        }
        var hx = o - SR * 0.33, hy = o - SR * 0.4;
        var sp = g.createRadialGradient(hx, hy, 0, hx, hy, SR * 0.36);
        sp.addColorStop(0, spec(dark ? 0.9 : 0.95));
        sp.addColorStop(0.45, spec(dark ? 0.28 : 0.4));
        sp.addColorStop(1, spec(0));
        g.fillStyle = sp; g.beginPath(); g.ellipse(hx, hy, SR * 0.36, SR * 0.28, -0.6, 0, TAU); g.fill();

        // 빛번짐 (dark) 또는 바닥 그림자 (light)
        var HS = 128, ho = HS / 2, halo = mk(HS), h = halo.getContext('2d');
        var hg = h.createRadialGradient(ho, ho, 0, ho, ho, ho);
        if (dark) {
          hg.addColorStop(0, rgba(col, 0.55)); hg.addColorStop(0.22, rgba(col, 0.26));
          hg.addColorStop(0.5, rgba(col, 0.07)); hg.addColorStop(1, rgba(col, 0));
        } else {
          var ink = T.shadowInk;
          hg.addColorStop(0, rgba(ink, 0.34)); hg.addColorStop(0.45, rgba(ink, 0.12)); hg.addColorStop(1, rgba(ink, 0));
        }
        h.fillStyle = hg; h.fillRect(0, 0, HS, HS);
        var aura = null; // light 허브가 바닥에 비친 색
        if (!dark) {
          aura = mk(HS);
          var ag = aura.getContext('2d'), agr = ag.createRadialGradient(ho, ho, 0, ho, ho, ho);
          agr.addColorStop(0, rgba(col, 0.22)); agr.addColorStop(0.5, rgba(col, 0.06)); agr.addColorStop(1, rgba(col, 0));
          ag.fillStyle = agr; ag.fillRect(0, 0, HS, HS);
        }
        sprites[id] = { core: core, halo: halo, aura: aura, css: T.cat[id] };
      });
      // 허브의 렌즈 반짝임: 네 갈래 빛줄기
      var GS = 256, go = GS / 2, glint = mk(GS), gg = glint.getContext('2d');
      gg.globalCompositeOperation = 'lighter';
      [true, false].forEach(function (horiz) {
        var lg = horiz ? gg.createLinearGradient(0, go, GS, go) : gg.createLinearGradient(go, 0, go, GS);
        lg.addColorStop(0, spec(0)); lg.addColorStop(0.5, spec(0.9)); lg.addColorStop(1, spec(0));
        gg.fillStyle = lg; gg.beginPath();
        var hw = GS * 0.055 / 2;
        if (horiz) { gg.moveTo(0, go); gg.lineTo(go, go - hw); gg.lineTo(GS, go); gg.lineTo(go, go + hw); }
        else { gg.moveTo(go, 0); gg.lineTo(go + hw, go); gg.lineTo(go, GS); gg.lineTo(go - hw, go); }
        gg.fill();
      });
      sprites._glint = glint;
    }

    // 배경: 중심이 밝은 남색(dark) 또는 자기 표면(light), 비네트, 별먼지 타일. 크기가 바뀔 때만 다시 그린다
    function buildBackground() {
      var w = Math.max(1, Math.floor(W * dpr)), h = Math.max(1, Math.floor(H * dpr));
      bg = mk(w, h);
      var g = bg.getContext('2d');
      g.fillStyle = T.bgEdge; g.fillRect(0, 0, w, h);
      var rg = g.createRadialGradient(w * 0.46, h * 0.4, 0, w * 0.46, h * 0.4, Math.max(w, h) * 0.78);
      rg.addColorStop(0, T.bgCore); rg.addColorStop(1, T.bgEdge);
      g.fillStyle = rg; g.fillRect(0, 0, w, h);
      var vg = g.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.35, w / 2, h / 2, Math.hypot(w, h) * 0.62);
      vg.addColorStop(0, rgba(rgbOf(T.vignette), 0)); vg.addColorStop(1, T.vignette);
      g.fillStyle = vg; g.fillRect(0, 0, w, h);
      // 별먼지: 고정 시드라 새로 고쳐도 같은 하늘. 카메라를 4%만 따라가 깊이감을 준다
      var TS = 420, tile = mk(Math.round(TS * dpr)), tc = tile.getContext('2d'), dc = rgbOf(T.dust), seed = 11;
      var r2 = function () { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
      for (var i = 0, count = dark ? 90 : 900; i < count; i++) {
        var x = r2() * tile.width, y = r2() * tile.height;
        if (dark) {
          var big = r2() < 0.08;
          tc.fillStyle = rgba(dc, T.dustAlpha * (big ? 0.9 : 0.15 + r2() * 0.45));
          tc.beginPath(); tc.arc(x, y, (big ? 1.1 : 0.45 + r2() * 0.5) * dpr, 0, TAU); tc.fill();
        } else {
          tc.fillStyle = rgba(dc, T.dustAlpha * (0.4 + r2() * 0.6));
          tc.fillRect(x, y, dpr * 0.8, dpr * 0.8);
        }
      }
      dust = { pattern: ctx.createPattern(tile, 'repeat'), size: TS };
      if (dust.pattern && dust.pattern.setTransform) dust.pattern.setTransform(new DOMMatrix().scale(1 / dpr));
    }

    // 성운 안개: world 좌표 저해상도(0.25배) 오프스크린 한 장
    function buildHaze() {
      var minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
      nodes.forEach(function (n) {
        minX = Math.min(minX, n.hx); maxX = Math.max(maxX, n.hx); minY = Math.min(minY, n.hy); maxY = Math.max(maxY, n.hy);
      });
      var PAD = 160, S = 0.25, ox = minX - PAD, oy = minY - PAD;
      var w = Math.ceil((maxX - minX + PAD * 2) * S), h = Math.ceil((maxY - minY + PAD * 2) * S);
      var out = mk(w, h), o = out.getContext('2d'), tmp = mk(w, h), t = tmp.getContext('2d');
      cats.forEach(function (c) {
        if (c === 'overviews') return; // 성운이 아니라 성운 사이를 잇는 허브들이다
        t.globalCompositeOperation = 'source-over';
        t.clearRect(0, 0, w, h);
        nodes.forEach(function (n) {
          if (n.category !== c) return;
          var x = (n.hx - ox) * S, y = (n.hy - oy) * S, R = (70 + 6 * Math.sqrt(n.degree)) * S;
          var g = t.createRadialGradient(x, y, 0, x, y, R);
          g.addColorStop(0, rgba(T.shade, 0.2)); g.addColorStop(1, rgba(T.shade, 0)); // 알파 마스크 (뒤에 source-in 으로 색을 입힌다)
          t.fillStyle = g; t.fillRect(x - R, y - R, R * 2, R * 2);
        });
        t.globalCompositeOperation = 'source-in';
        t.fillStyle = T.cat[c]; t.fillRect(0, 0, w, h);
        o.globalAlpha = dark ? 0.3 : 0.13;
        o.drawImage(tmp, 0, 0);
      });
      haze = { img: out, ox: ox, oy: oy, s: S };
    }

    function applyTheme() {
      dark = document.documentElement.dataset.theme !== 'light';
      T = readTokens();
      buildSprites(); buildHaze();
      if (W) buildBackground();
      namesCache = null;
      clearWidths();
      // 배경 노드의 흐림 알파는 테마마다 다르다 (dark 0.16, light 0.2)
      if (view && !morph) nodes.forEach(function (n) { if (n.role === -1) n.p = T.backdrop; });
      redraw();
    }

    // 무대 위 크롬 상자 (무대 좌표). 라벨과 성운 이름이 그 밑에 깔리지 않게 피한다. 리사이즈 때만 다시 잰다 (04 9절)
    var CHROME = ['.graph-cmd', '#graph-active-filters', '.graph-trail', '.graph-filters', '.graph-dock', '.graph-tools'];
    function chromeRects() {
      if (chromeCache) return chromeCache;
      var s = canvas.getBoundingClientRect(), out = [];
      var els = CHROME.map(function (q) { return stage.querySelector(q); });
      els.push(header);
      els.forEach(function (el) {
        if (!el || el.closest('[hidden]')) return;
        var r = el.getBoundingClientRect();
        if (r.width && r.height) out.push({ x: r.left - s.left - 4, y: r.top - s.top - 4, w: r.width + 8, h: r.height + 8 });
      });
      // 패널은 열고 닫는 transform 과 시트 높이 전환 중이라도 도착할 자리로 잰다
      if (!panel.hidden) {
        if (isMobile()) out.push({ x: 0, y: H - sheetH - 4, w: W, h: sheetH + 4 });
        else out.push({ x: panel.offsetLeft - 4, y: panel.offsetTop - 4, w: panel.offsetWidth + 8, h: panel.offsetHeight + 8 });
      }
      return (chromeCache = out);
    }
    function overlaps(a, q) { return a.x < q.x + q.w && a.x + a.w > q.x && a.y < q.y + q.h && a.y + a.h > q.y; }

    // ── 그리기 ─────────────────────────────────────────────────────────────
    var rafId = 0;
    function redraw() { if (!rafId && W) rafId = requestAnimationFrame(frame); }
    function frame(now) {
      rafId = 0;
      if (revealT0 === null) revealT0 = now;
      // 쉬다 깨어난 첫 프레임은 한 프레임 길이로 본다 (관성과 휠이 튀지 않게)
      var dt = now - lastNow > 100 ? 16.67 : now - lastNow;
      lastNow = now;
      var busy = stepMorph(now);
      busy = stepFlight(now) | stepWheel(dt) | stepGlide(dt) || busy;
      busy = stepEmphasis(dt) || busy;
      syncZoomButtons();
      // 비행, 전환, 호버 들림 중에도 툴팁이 노드를 따른다 (들림이 덜 끝난 반지름에 멈추지 않게)
      if (tipNode && !tip.hidden) placeTip(tipNode);
      if (revealT0 >= 0 && now - revealT0 < 1100) busy = true;
      if (pulseT0 >= 0 && now - pulseT0 < 1000) busy = true;
      if (mode === 'orbit' && !morph && now < shimmerUntil) busy = true;
      var t0 = performance.now();
      draw(now);
      drawTimes.push(performance.now() - t0);
      if (drawTimes.length > 600) drawTimes.shift();
      if (busy) redraw();
    }
    // 첫 등장: 허브부터 차례로 켜진다 (600ms에 걸쳐 시작, 각 200ms)
    function reveal(n, now) {
      if (revealT0 < 0) return 1;
      return clamp((now - revealT0 - (n.rank / N) * 600) / 200);
    }
    // 강조: 호버한 노드와 이웃은 그대로, 나머지는 흐리게. 약 160ms 선형으로 다가간다 (02 9.5)
    // 필터 밖은 --graph-dim-alpha 로 가라앉고, 궤도에서는 구성원으로 남아 조금 덜 흐리다. 궤도 중심은 흐리지 않는다 (02 8.2)
    function targetE(n) {
      var h = hovered || cursor, base = lit[n.i] ? 1 : T.dim;
      if (mode === 'orbit' && view) {
        if (n.role < 0) return 1;
        if (n === view.c) base = 1; else if (!lit[n.i]) base = Math.min(1, T.dim * 1.6);
        return h && n !== h && !h.nb.has(n) && n !== view.c ? Math.min(base, 0.35) : base;
      }
      if (n === h) return 1;
      return h && !h.nb.has(n) ? Math.min(base, 0.42) : base;
    }
    function stepEmphasis(dt) {
      var busy = false, step = dt / 160, ft = fActive || legendHover ? 1 : 0;
      if (reduce || Math.abs(ft - fMix) <= step) fMix = ft; else { fMix += ft > fMix ? step : -step; busy = true; }
      var wt = weakOn ? 1 : 0, ws = dt / 220; // 렌즈 고리는 220ms 동안 커지며 나타난다 (06 2.2 첫 등장과 같은 길이)
      if (reduce || Math.abs(wt - weakMix) <= ws) weakMix = wt; else { weakMix += wt > weakMix ? ws : -ws; busy = true; }
      for (var i = 0; i < N; i++) {
        var n = nodes[i], ta = targetE(n), d = ta - emph[i], hl = n === (hovered || cursor) ? 1 : 0, dl = hl - hoverLift[i];
        if (reduce || Math.abs(d) <= step) emph[i] = ta; else { emph[i] += d > 0 ? step : -step; busy = true; }
        if (reduce || Math.abs(dl) <= 0.02) hoverLift[i] = hl; else { hoverLift[i] += dl * Math.min(1, 0.35 * dt / 16.67); busy = true; }
      }
      return busy;
    }
    // 그리는 반지름: 줌에 √k 로 자라고, 붐비는 궤도는 칸 폭으로 막는다. 전환 중에는 이전 역할의 크기에서 보간한다 (04 4.2)
    function roleR(n, role, cap) {
      var r = n.r * Math.sqrt(cam.k);
      if (role >= 1 && cap) r = Math.max(2.5, Math.min(r, cap * cam.k));
      return role === 0 ? r * 1.25 : r;
    }
    function nodeR(n) {
      var r = n.e >= 1 ? roleR(n, n.role, n.cap) : roleR(n, n.fr0, n.fc0) + (roleR(n, n.role, n.cap) - roleR(n, n.fr0, n.fc0)) * n.e;
      return r * (1 + 0.16 * hoverLift[n.i]);
    }
    function S(n) { return { x: n.x * cam.k + cam.x, y: n.y * cam.k + cam.y }; }

    function draw(now) {
      var k = cam.k, tx = cam.x, ty = cam.y;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
      // 1. 배경과 별먼지
      ctx.drawImage(bg, 0, 0, W, H);
      if (dust.pattern) {
        var ts = dust.size, ox = ((tx * 0.04) % ts + ts) % ts, oy = ((ty * 0.04) % ts + ts) % ts;
        ctx.save(); ctx.translate(ox - ts, oy - ts); ctx.fillStyle = dust.pattern; ctx.fillRect(0, 0, W + ts, H + ts); ctx.restore();
      }
      var hazeIn = revealT0 < 0 ? 1 : clamp((now - revealT0) / 700);
      var edgeIn = revealT0 < 0 ? 1 : clamp((now - revealT0 - 500) / 400);
      var mix = orbitMix, h = hovered || cursor;

      // 2. 성운 안개: 궤도에서는 28%로 가라앉는다
      ctx.globalAlpha = hazeIn * (1 - 0.72 * mix) * (1 - 0.45 * fMix); // 필터 중에는 55% (04 7.3)
      ctx.drawImage(haze.img, haze.ox * k + tx, haze.oy * k + ty, haze.img.width / haze.s * k, haze.img.height / haze.s * k);

      // 3. 성운 이름: 줌을 키우면 사라진다 (k 1.2 이하 완전, 1.7 이상 없음). 궤도 전환이 1/3 가면 사라진다
      var nameA = clamp((1.7 - k) / 0.5) * hazeIn * (1 - clamp(mix * 3));
      var names = nameA > 0 ? drawNebulaNames(nameA, now) : [];

      // 4. 엣지: 더하기 합성으로 겹칠수록 밝은 빛 실. 궤도에서는 배경 노드끼리만 아주 흐리게
      var atlasEA = edgeIn * (1 - 0.82 * mix) * (mode === 'atlas' && h ? 0.45 : 1);
      if (atlasEA > 0.01) {
        var inOrbit = mode === 'orbit';
        ctx.globalCompositeOperation = T.blend;
        ctx.lineWidth = 0.7;
        // 필터 중에는 두 번 긋는다: 양 끝이 모두 필터 안이면 × 1.5, 아니면 × 0.22 (04 7.3)
        var passes = fMix > 0.001 ? [1, 0] : [-1];
        for (var b = 0; b < bucketKeys.length; b++) {
          var key = bucketKeys[b], list = buckets[key], same = key !== '_x';
          ctx.strokeStyle = same ? T.cat[key] : T.edge;
          for (var pi = 0; pi < passes.length; pi++) {
            var want = passes[pi];
            ctx.globalAlpha = T.edgeAlpha * (same ? 1.25 : 0.9) * atlasEA * (want < 0 ? 1 : want ? 1 + 0.5 * fMix : 1 - 0.78 * fMix);
            ctx.beginPath();
            for (var i = 0; i < list.length; i++) {
              var e = list[i];
              if (inOrbit && (e.s.front || e.t.front)) continue;
              if (want >= 0 && (lit[e.s.i] && lit[e.t.i] ? 1 : 0) !== want) continue;
              ctx.moveTo(e.s.x * k + tx, e.s.y * k + ty);
              ctx.lineTo(e.t.x * k + tx, e.t.y * k + ty);
            }
            ctx.stroke();
          }
        }
      }
      // 조감에서 호버한 노드의 엣지: 두 노드 색 사이로 변하는 빛 실
      if (mode === 'atlas' && h && !morph && edgeIn > 0) {
        var hs = S(h);
        ctx.globalCompositeOperation = T.blend;
        ctx.lineWidth = 1.2;
        ctx.globalAlpha = T.edgeHi * edgeIn;
        h.nb.forEach(function (m) {
          var ms = S(m), g = ctx.createLinearGradient(hs.x, hs.y, ms.x, ms.y);
          g.addColorStop(0, T.cat[h.category]); g.addColorStop(1, T.cat[m.category]);
          ctx.strokeStyle = g; ctx.beginPath(); ctx.moveTo(hs.x, hs.y); ctx.lineTo(ms.x, ms.y); ctx.stroke();
        });
      }
      ctx.globalCompositeOperation = 'source-over';

      // 5. 뒤쪽 노드 (조감 전체, 또는 궤도의 배경)
      drawnNodes = 0;
      drawNodes(now, false);

      // 6. 궤도 층: 렌즈, 중심 빛, 안내선, 카테고리 호, 궤도 엣지
      var ov = view || prevView;
      if (ov && mix > 0.001) {
        var cs = { x: C.x * k + tx, y: C.y * k + ty };
        var LR = (ov.R2o + 110) * k;
        var lg = ctx.createRadialGradient(cs.x, cs.y, 0, cs.x, cs.y, LR), lc = rgbOf(T.lens);
        lg.addColorStop(0, T.lens); lg.addColorStop(0.74, T.lens); lg.addColorStop(1, rgba(lc, 0)); // 같은 색의 투명으로 끝내 회색 띠가 없다
        ctx.globalAlpha = mix; ctx.fillStyle = lg;
        ctx.fillRect(cs.x - LR, cs.y - LR, LR * 2, LR * 2);
        var et = morph && morph.kind === 'recenter' ? clamp((now - morph.t0) / 600) : 1;
        if (prevView && view && et < 1) drawOrbitLayer(prevView, mix * (1 - et), null, now, cs);
        drawOrbitLayer(ov, mix * (prevView && view ? et : 1), h, now, cs);
      }

      // 7. 앞쪽 노드 (궤도 위)
      drawNodes(now, true);

      // 8. 선택 맥박: 중심에서 한 번 퍼지는 고리 둘
      if (view && pulseT0 >= 0 && now >= pulseT0 && now - pulseT0 < 1000) {
        var pt = (now - pulseT0) / 1000, c0 = S(view.c), r0 = nodeR(view.c);
        ctx.strokeStyle = T.cat[view.c.category];
        ctx.globalAlpha = (1 - pt) * 0.75; ctx.lineWidth = 1.6;
        ctx.beginPath(); ctx.arc(c0.x, c0.y, r0 + 6 + ease4(pt) * 52, 0, TAU); ctx.stroke();
        ctx.globalAlpha = (1 - pt) * 0.35; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.arc(c0.x, c0.y, r0 + 6 + ease4(clamp(pt * 1.4)) * 96, 0, TAU); ctx.stroke();
      }
      ctx.globalAlpha = 1;

      // 9. 접힌 2-hop 수 "+k": 바깥 궤도 꼭대기 빈 틈. 궤도 노드에 닿으면 숨기고 누를 수도 없다 (04 4.6)
      pillBox = null;
      var pa = mode === 'orbit' && view && (view.hidden > 0 || expanded) && view.r2.length ? clamp(mix) : 0;
      var ptxt = '', ppx = 0, ppy = 0, ppw = 0;
      if (pa > 0) {
        ptxt = expanded ? '접기' : '+' + view.hidden;
        ppx = C.x * k + tx; ppy = (C.y - view.R2) * k + ty;
        ctx.font = '500 11px ' + T.mono;
        ppw = ctx.measureText(ptxt).width + 14;
        pillBox = { x: ppx - ppw / 2, y: ppy - 10, w: ppw, h: 20 };
        var members = view.r1.concat(view.r2, [view.c]);
        for (var mi = 0; mi < members.length && pillBox; mi++) {
          var mp = S(members[mi]), mr = nodeR(members[mi]) * 1.08 + (members[mi] === view.c ? 12 : 4);
          var qx = Math.max(pillBox.x, Math.min(mp.x, pillBox.x + ppw)), qy = Math.max(pillBox.y, Math.min(mp.y, pillBox.y + 20));
          if (Math.hypot(mp.x - qx, mp.y - qy) < mr) pillBox = null;
        }
      }

      // 10. 라벨 (궤도 라벨은 알약 자리를 비켜 간다)
      orbitLabelCount = 0; labelBoxes = []; centerPill = null;
      if (mode === 'atlas' && mix < 0.05 && (revealT0 < 0 || now - revealT0 >= 600)) drawLabels(names);
      else drawnLabels = 0;
      if (mode === 'orbit' && view) drawOrbitLabels(h);

      if (pillBox) {
        ctx.font = '500 11px ' + T.mono; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        if ('letterSpacing' in ctx) ctx.letterSpacing = '0px';
        ctx.globalAlpha = pa * (hotPlus ? 1 : 0.88);
        roundRect(ppx - ppw / 2, ppy - 10, ppw, 20, 10);
        ctx.fillStyle = T.labelHalo; ctx.fill();
        ctx.strokeStyle = hotPlus ? T.signal : T.hairline; ctx.lineWidth = 1; ctx.stroke();
        ctx.fillStyle = hotPlus ? T.text : T.muted; ctx.fillText(ptxt, ppx, ppy + 0.5);
        ctx.textAlign = 'left';
      }
      ctx.globalAlpha = 1;
    }
    function roundRect(x, y, w, h, r) {
      ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
    }

    function drawNodes(now, front) {
      var k = cam.k, tx = cam.x, ty = cam.y, glint = sprites._glint;
      for (var j = N - 1; j >= 0; j--) {
        var n = rank[j];
        if (n.front !== front) continue;
        var px = n.x * k + tx, py = n.y * k + ty, r = nodeR(n);
        if (px < -60 || py < -60 || px > W + 60 || py > H + 60) continue;
        var a = n.p * emph[n.i] * reveal(n, now);
        if (a <= 0.004) continue;
        drawnNodes++;
        var sp = sprites[n.category];
        var big = n.degree >= 30 || n.role === 0, lift = hoverLift[n.i];
        var shine = lit[n.i] ? fMix : 0; // 필터에 남은 노드는 빛이 한 단계 밝다
        if (dark) {
          // 빛번짐: 잎은 작게, 허브와 궤도 중심은 넓게. 궤도의 배경은 절반
          ctx.globalCompositeOperation = 'lighter';
          var hr = r * (big ? 3.4 : 2.5) * (1 + 0.25 * lift + 0.3 * shine);
          ctx.globalAlpha = Math.min(1, a * T.glowAlpha * (0.5 + 0.5 * Math.min(1, n.degree / 40)) * (n.role === -1 ? 0.5 : 1) * (1 + 0.7 * shine));
          ctx.drawImage(sp.halo, px - hr, py - hr, hr * 2, hr * 2);
          ctx.globalCompositeOperation = 'source-over';
        } else if (T.shadow > 0 && n.role !== -1) {
          if ((big || shine > 0) && sp.aura) { var ar = r * 3; ctx.globalAlpha = a * (big ? 1 : shine); ctx.drawImage(sp.aura, px - ar, py - ar, ar * 2, ar * 2); }
          var sw = r * 1.5;
          ctx.globalAlpha = a * (0.8 + 0.4 * lift);
          ctx.drawImage(sp.halo, px - sw, py - sw * 0.62 + r * (0.42 + 0.25 * lift), sw * 2, sw * 1.45);
        }
        ctx.globalAlpha = a;
        var cr = r * (SR + 4) / SR;
        ctx.drawImage(sp.core, px - cr, py - cr, cr * 2, cr * 2);
        if (n.category === 'overviews') {
          ctx.strokeStyle = sp.css; ctx.lineWidth = 1; ctx.globalAlpha = a * 0.8;
          ctx.beginPath(); ctx.arc(px, py, r + 2.6, 0, TAU); ctx.stroke();
        }
        // 렌즈 반짝임: 조감은 큰 허브, 궤도는 중심만 (dark)
        if (dark && (n.role === 0 || (n.degree >= 50 && n.role === ATLAS && !view)) && a > 0.3) {
          ctx.globalCompositeOperation = 'lighter';
          var gl = r * (n.role === 0 ? 4.6 : 3.6);
          ctx.globalAlpha = a * 0.42;
          ctx.drawImage(glint, px - gl, py - gl, gl * 2, gl * 2);
          ctx.globalCompositeOperation = 'source-over';
        }
        // 궤도 중심의 선택 고리 두 겹
        if (view && n === view.c && n.role === 0) {
          ctx.strokeStyle = sp.css;
          ctx.globalAlpha = a * 0.9; ctx.lineWidth = 1.6;
          ctx.beginPath(); ctx.arc(px, py, r + 6, 0, TAU); ctx.stroke();
          ctx.globalAlpha = a * 0.28; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.arc(px, py, r + 11, 0, TAU); ctx.stroke();
        }
        // 약한 연결 렌즈: 점선 바깥 고리. 경고색이 아니라 본문색으로 "표시" 만 한다 (06 12.2 E3)
        if (n.weak && weakMix > 0) {
          ctx.strokeStyle = T.text; ctx.lineWidth = 1.1; ctx.globalAlpha = a * 0.78 * weakMix;
          ctx.setLineDash([2.4, 2.6]);
          ctx.beginPath(); ctx.arc(px, py, r + 3 + 3.5 * ease4(weakMix), 0, TAU); ctx.stroke();
          ctx.setLineDash([]);
        }
        // 키보드 커서: 신호색 고리와 옅은 빛 테. 흐린 노드에서도 보이게 노드 알파를 따르지 않는다 (02 J3)
        if (n === cursor) {
          ctx.strokeStyle = T.signal;
          ctx.globalAlpha = 0.22; ctx.lineWidth = 6;
          ctx.beginPath(); ctx.arc(px, py, r + 7, 0, TAU); ctx.stroke();
          ctx.globalAlpha = 1; ctx.lineWidth = 2;
          ctx.beginPath(); ctx.arc(px, py, r + 7, 0, TAU); ctx.stroke();
        }
        // 검색 결과: 신호색 고리 하나. 흐린 노드에도 보이게 노드 알파를 따르지 않는다 (02 7.3)
        if (searchHits.has(n)) {
          ctx.strokeStyle = T.signal; ctx.lineWidth = 1.4;
          ctx.globalAlpha = 0.95 * reveal(n, now);
          ctx.beginPath(); ctx.arc(px, py, r + 4.5, 0, TAU); ctx.stroke();
          ctx.globalAlpha = 0.25 * reveal(n, now); ctx.lineWidth = 4;
          ctx.beginPath(); ctx.arc(px, py, r + 4.5, 0, TAU); ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;
    }

    // 궤도 층 (04 4.4, 6.2). a 는 층 알파, h 는 호버 노드, cs 는 중심의 화면 좌표
    function drawOrbitLayer(v, a, h, now, cs) {
      if (a <= 0.004) return;
      var k = cam.k, prog = reduce ? 1 : easeIO(clamp((now - v.t0 - 80) / 760));
      // 중심의 빛: 안쪽 궤도까지 카테고리 색으로 은은하게 번진다
      var cc = rgbOf(T.cat[v.c.category]), R1s = v.R1 * k;
      var cg = ctx.createRadialGradient(cs.x, cs.y, 0, cs.x, cs.y, R1s * 1.08);
      cg.addColorStop(0, rgba(cc, dark ? 0.2 : 0.1)); cg.addColorStop(0.55, rgba(cc, dark ? 0.06 : 0.035)); cg.addColorStop(1, rgba(cc, 0));
      ctx.globalCompositeOperation = T.blend; ctx.globalAlpha = a; ctx.fillStyle = cg;
      ctx.fillRect(cs.x - R1s * 1.1, cs.y - R1s * 1.1, R1s * 2.2, R1s * 2.2);
      ctx.globalCompositeOperation = 'source-over';
      // 안내선: 꼭대기에서 시작해 원을 그리며 들어온다
      ctx.lineWidth = 1; ctx.strokeStyle = T.hairline; ctx.globalAlpha = a;
      v.guides.forEach(function (R) { ctx.beginPath(); ctx.arc(cs.x, cs.y, R * k, START, START + TAU * prog); ctx.stroke(); });
      // 카테고리 호: 넓고 흐린 빛 위에 가는 선 한 줄. 한 개짜리 묶음은 취소선처럼 읽혀 생략한다
      ctx.globalCompositeOperation = T.blend;
      ctx.lineCap = 'round';
      v.arcs.forEach(function (arc) {
        if (arc.n < 2) return;
        var a0 = arc.a0 + 0.004, a1 = Math.max(arc.a0 + 0.008, arc.a1 - 0.004), end = Math.min(a1, START + TAU * prog);
        if (end <= a0) return;
        // 묶음 전부가 필터 밖이면 호도 흐린 알파로 (04 7.3)
        var da = arc.m.some(function (m) { return lit[m.i]; }) ? 1 : 1 - (1 - T.dim) * fMix;
        ctx.strokeStyle = T.cat[arc.cat];
        ctx.globalAlpha = a * da * (dark ? 0.16 : 0.1); ctx.lineWidth = 6;
        ctx.beginPath(); ctx.arc(cs.x, cs.y, arc.r * k, a0, end); ctx.stroke();
        ctx.globalAlpha = a * da * 0.85; ctx.lineWidth = 1.6;
        ctx.beginPath(); ctx.arc(cs.x, cs.y, arc.r * k, a0, end); ctx.stroke();
      });
      // 궤도 엣지: 바큇살은 이웃 색, 현과 2-hop 선은 중성 색. 호버 중이면 나머지를 30%로
      var hiList = [], groups = {};
      // 필터 밖 구성원에 닿는 엣지는 25%로 (04 7.3). 중심은 필터 밖이어도 밝은 쪽으로 센다
      var on = function (n) { return n === v.c || lit[n.i]; };
      v.edges.forEach(function (e) {
        if (h && (e[0] === h || e[1] === h)) { hiList.push(e); return; }
        var key = (fMix > 0.001 && !(on(e[0]) && on(e[1])) ? '~' : '') + (e[2] === 0 ? 's:' + e[1].category : 'k' + e[2]);
        (groups[key] || (groups[key] = [])).push(e);
      });
      var base = h ? 0.3 : 1;
      Object.keys(groups).forEach(function (gk) {
        var list = groups[gk], dimmed = gk.charAt(0) === '~', key = dimmed ? gk.slice(1) : gk;
        var kind = key.charAt(0) === 's' ? 0 : +key.charAt(1);
        var ea = kind === 0 ? T.edgeHi * 0.32 : kind === 1 ? T.edgeAlpha * 2.6 : T.edgeAlpha * 2;
        ctx.globalAlpha = ea * a * base * (dimmed ? 1 - 0.75 * fMix : 1);
        ctx.strokeStyle = kind === 0 ? T.cat[key.slice(2)] : T.edge;
        ctx.lineWidth = kind === 0 ? 0.9 : 0.75;
        ctx.beginPath(); list.forEach(edgePath); ctx.stroke();
        if (kind === 0 && !morph) { ctx.fillStyle = ctx.strokeStyle; ctx.beginPath(); list.forEach(arrow); ctx.fill(); }
      });
      // 반짝임: 선택 직후 7초 동안 중심에서 이웃으로 빛 띠가 흐른다
      if (!reduce && !morph && v === view && now < shimmerUntil && !h) {
        var fade = clamp((shimmerUntil - now) / 1200);
        ctx.lineWidth = 1.4;
        v.edges.forEach(function (e, i) {
          if (e[2] !== 0) return;
          var A = S(e[0]), B = S(e[1]), col = rgbOf(T.cat[e[1].category]);
          var u = (((now - v.t0) / 2200 + i * 0.137) % 1 + 1) % 1;
          var u0 = Math.max(0, u - 0.14), u1 = Math.min(1, u + 0.04);
          var g = ctx.createLinearGradient(A.x, A.y, B.x, B.y);
          g.addColorStop(0, rgba(col, 0)); g.addColorStop(u0, rgba(col, 0));
          g.addColorStop(Math.max(u0, Math.min(u1, u)), rgba(dark ? mixc(col, T.specular, 0.5) : col, dark ? 0.75 : 0.55));
          g.addColorStop(u1, rgba(col, 0)); g.addColorStop(1, rgba(col, 0));
          ctx.globalAlpha = a * fade; ctx.strokeStyle = g;
          ctx.beginPath(); ctx.moveTo(A.x, A.y); ctx.lineTo(B.x, B.y); ctx.stroke();
        });
      }
      // 강조 엣지: 두 노드 색 사이 그라데이션과 방향 촉
      hiList.forEach(function (e) {
        var A = S(e[0]), B = S(e[1]), g = ctx.createLinearGradient(A.x, A.y, B.x, B.y);
        g.addColorStop(0, T.cat[e[0].category]); g.addColorStop(1, T.cat[e[1].category]);
        ctx.globalAlpha = T.edgeHi * a; ctx.strokeStyle = g; ctx.lineWidth = 1.3;
        ctx.beginPath(); edgePath(e); ctx.stroke();
        ctx.fillStyle = T.cat[(e[0] === h ? e[1] : e[0]).category]; ctx.beginPath(); arrow(e); ctx.fill();
      });
      ctx.lineCap = 'butt';
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;
    }
    function edgePath(e) {
      var A = S(e[0]), B = S(e[1]);
      ctx.moveTo(A.x, A.y);
      if (e[2] === 1) { // 안쪽 궤도끼리는 중심 쪽으로 휜 현
        var mx = C.x + ((e[0].x - C.x) + (e[1].x - C.x)) / 2 * 0.3, my = C.y + ((e[0].y - C.y) + (e[1].y - C.y)) / 2 * 0.3;
        ctx.quadraticCurveTo(mx * cam.k + cam.x, my * cam.k + cam.y, B.x, B.y);
      } else ctx.lineTo(B.x, B.y);
    }
    function arrow(e) {
      if (e[2] === 1) return;
      if (e[0].out.has(e[1])) head(e[0], e[1]);
      if (e[1].out.has(e[0])) head(e[1], e[0]);
    }
    function head(from, to) {
      var A = S(from), B = S(to), dx = B.x - A.x, dy = B.y - A.y, Ln = Math.hypot(dx, dy);
      if (Ln < 20) return;
      var ux = dx / Ln, uy = dy / Ln, rr = nodeR(to) + 2, x = B.x - ux * rr, y = B.y - uy * rr;
      ctx.moveTo(x, y);
      ctx.lineTo(x - ux * 5 - uy * 2.5, y - uy * 5 + ux * 2.5);
      ctx.lineTo(x - ux * 5 + uy * 2.5, y - uy * 5 - ux * 2.5);
      ctx.closePath();
    }

    // 성운 이름: 노드와 크롬과 다른 이름을 피할 자리를 찾고, 없으면 그리지 않는다 (04 5.2)
    // 카메라가 움직이는 동안에는 자리를 다시 찾지 않고 지난 자리를 카메라에 따라 옮긴다 (04 5.2절 L9)
    function drawNebulaNames(alpha, now) {
      var key = cam.x + ',' + cam.y + ',' + cam.k + ',' + W + ',' + H;
      if (!namesCache || morph || (namesCache.key !== key && !(moving(now) && namesCache.W === W && namesCache.H === H)))
        namesCache = { key: key, W: W, H: H, cam: { x: cam.x, y: cam.y, k: cam.k }, list: placeNames() };
      var c0 = namesCache.cam, s = cam.k / c0.k;
      var mx = function (x) { return (x - c0.x) * s + cam.x; }, my = function (y) { return (y - c0.y) * s + cam.y; };
      var list = namesCache.key === key ? namesCache.list : namesCache.list.map(function (p) {
        return { id: p.id, name: p.name, size: p.size, ls: p.ls, x: mx(p.x), y: my(p.y),
          lead: p.lead && [mx(p.lead[0]), my(p.lead[1]), mx(p.lead[2]), my(p.lead[3])],
          box: { x: mx(p.box.x + p.box.w / 2) - p.box.w / 2, y: my(p.box.y + p.box.h / 2) - p.box.h / 2, w: p.box.w, h: p.box.h } };
      });
      ctx.textAlign = 'center';
      ctx.textBaseline = 'alphabetic';
      list.forEach(function (p) {
        var fa = alpha * (litCat[p.id] === false ? 1 - 0.75 * fMix : 1); // 걸러진 성운 이름은 25% (04 7.3)
        if (p.lead) {
          ctx.globalAlpha = fa * (dark ? 0.45 : 0.55); ctx.strokeStyle = T.cat[p.id]; ctx.lineWidth = 0.8;
          ctx.beginPath(); ctx.moveTo(p.lead[0], p.lead[1]); ctx.lineTo(p.lead[2], p.lead[3]); ctx.stroke();
        }
        ctx.font = '500 ' + p.size + 'px ' + T.font;
        if ('letterSpacing' in ctx) ctx.letterSpacing = p.ls;
        ctx.globalAlpha = fa * (dark ? 0.7 : 0.8);
        ctx.fillStyle = T.cat[p.id];
        ctx.fillText(p.name, p.x, p.y);
      });
      if ('letterSpacing' in ctx) ctx.letterSpacing = '0px';
      ctx.textAlign = 'left';
      ctx.globalAlpha = 1;
      return list.map(function (p) { return p.box; });
    }
    function placeNames() {
      var k = cam.k, tx = cam.x, ty = cam.y, rk = Math.sqrt(k), chrome = chromeRects(), placed = [], mob = isMobile();
      var ls = mob ? '0.1em' : '0.16em';
      catInfo.forEach(function (c) {
        if (c.id === 'overviews' || c.n < 5) return;
        var size = mob ? (c.n > 60 ? 13 : 11) : c.n > 60 ? 15 : 13;
        ctx.font = '500 ' + size + 'px ' + T.font;
        if ('letterSpacing' in ctx) ctx.letterSpacing = ls;
        var tw = ctx.measureText(c.name).width, x0 = c.x * k + tx;
        var top = c.top * k + ty, bot = c.bottom * k + ty, ym = c.y * k + ty + size / 2;
        var lft = c.left * k + tx - tw / 2 - 10, rgt = c.right * k + tx + tw / 2 + 10;
        var cands = [[x0, top - 18], [x0, bot + size + 18], [x0, top - 40], [x0, bot + size + 40],
          [x0 - tw * 0.6, top - 18], [x0 + tw * 0.6, top - 18], [lft, ym], [rgt, ym],
          [x0 - tw * 0.6, bot + size + 18], [x0 + tw * 0.6, bot + size + 18], [x0, ym]];
        var free = function (x, y) {
          var box = { x: x - tw / 2 - 6, y: y - size - 4, w: tw + 12, h: size + 10 };
          if (box.x < 4 || box.x + box.w > W - 4 || box.y < 4 || box.y + box.h > H - 4) return false;
          for (var i = 0; i < N; i++) {
            var n = nodes[i], nx = n.x * k + tx, ny = n.y * k + ty, nr = n.r * rk + 4; // 4: 구슬 테와 overviews 고리
            if (nx + nr >= box.x && nx - nr <= box.x + box.w && ny + nr >= box.y && ny - nr <= box.y + box.h) return false;
          }
          return !chrome.some(function (q) { return overlaps(box, q); }) && !placed.some(function (p) { return overlaps(box, p.box); });
        };
        var spot = null, lead = false;
        for (var ci = 0; ci < cands.length && !spot; ci++) if (free(cands[ci][0], cands[ci][1])) spot = cands[ci];
        // 그래도 막히면 성운 둘레를 넓혀 가며 빈 틈을 찾고 지시선으로 잇는다
        var hx0 = (c.left + c.right) / 2 * k + tx, hy0 = (c.top + c.bottom) / 2 * k + ty;
        var hrx = (c.right - c.left) / 2 * k + tw / 2, hry = (c.bottom - c.top) / 2 * k + size / 2;
        for (var d = 8; d <= 160 && !spot; d += 8) {
          for (var si = 0; si < 24 && !spot; si++) {
            var an = si / 24 * TAU, px = hx0 + Math.cos(an) * (hrx + d), py = hy0 + Math.sin(an) * (hry + d) + size / 2;
            if (free(px, py)) { spot = [px, py]; lead = true; }
          }
        }
        if (!spot) return;
        var p = { id: c.id, name: c.name, size: size, ls: ls, x: spot[0], y: spot[1], lead: null,
          box: { x: spot[0] - tw / 2 - 4, y: spot[1] - size - 2, w: tw + 8, h: size + 6 } };
        if (lead) {
          var best = null, bd = Infinity, bx = p.box;
          nodes.forEach(function (n) {
            if (n.category !== c.id) return;
            var nx = n.x * k + tx, ny = n.y * k + ty;
            var qx = Math.max(bx.x, Math.min(nx, bx.x + bx.w)), qy = Math.max(bx.y, Math.min(ny, bx.y + bx.h));
            var dd = Math.hypot(nx - qx, ny - qy);
            if (dd < bd) { bd = dd; best = [nx, ny, qx, qy, n.r * rk + 3]; }
          });
          if (best && bd > best[4] + 4) {
            var ux = (best[2] - best[0]) / bd, uy = (best[3] - best[1]) / bd;
            p.lead = [best[2] - ux * 2, best[3] - uy * 2, best[0] + ux * best[4], best[1] + uy * best[4]];
          }
        }
        placed.push(p);
      });
      if ('letterSpacing' in ctx) ctx.letterSpacing = '0px';
      return placed;
    }

    // 노드 라벨: 줌이 작을수록 큰 허브만. 크롬, 성운 이름, 앞 라벨과 겹치면 뺀다 (04 5.1)
    function minDegreeFor(k) { return k < 1 ? 20 : k < 1.4 ? 15 : k < 2.2 ? 8 : 0; }
    // 카테고리마다 가장 큰 허브: 낮은 줌에서도 성운마다 이름 하나는 읽히게 우선한다
    var catTop = {};
    nodes.forEach(function (n) { if (!catTop[n.category] || n.degree > catTop[n.category].degree) catTop[n.category] = n; });
    // 호버한 노드와 그 이웃(degree 10 이상)은 줌 하한을 넘어 늘 후보다. 흐린 노드는 뺀다 (04 5.1)
    // 그 밖의 라벨 수는 화면 넓이와 줌에 비례한다. 줌 문턱 하나에서 5개와 28개를 오가지 않게 한다
    function drawLabels(names) {
      var k = cam.k, minDeg = minDegreeFor(k), cand = [], h = hovered;
      var budget = k >= 2.2 ? 160 : Math.max(4, Math.round(W * H / 100000 * Math.min(3, k / 0.8)));
      for (var i = 0; i < N; i++) {
        var n = nodes[i], top = catTop[n.category] === n;
        var hit = searchHits.has(n), forced = n === h || hit || (h && h.nb.has(n) && n.degree >= 10);
        if (!forced && ((n.degree < minDeg && !top) || emph[i] < 0.9 || !lit[i])) continue;
        var px = sx(n.x), py = sy(n.y);
        if (px < -20 || py < -20 || px > W + 20 || py > H + 20) continue;
        cand.push({ n: n, x: px, y: py, forced: forced, pri: (n === h ? 1e6 : 0) + (hit ? 1e5 : 0) + (forced ? 1e4 : 0) + (top ? 1e3 : 0) + n.degree });
      }
      cand.sort(function (a, b) { return b.pri - a.pri; });
      var boxes = chromeRects().concat(names), drawn = 0, free = 0, heavy = [];
      // 라벨이 덮지 않을 구슬: 이름이 붙을 만한 허브와 overviews 고리 (작은 잎은 할로 위로 지나가도 읽힌다)
      for (var hi = 0; hi < N; hi++) {
        var hn = nodes[hi];
        if ((hn.degree >= 15 || hn.category === 'overviews') && emph[hi] >= 0.9) heavy.push({ n: hn, x: sx(hn.x), y: sy(hn.y), r: nodeR(hn) * 1.08 + (hn.category === 'overviews' ? 3.1 : 0) + 1 });
      }
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'left';
      ctx.lineJoin = 'round';
      if ('letterSpacing' in ctx) ctx.letterSpacing = '0.01em';
      for (var c = 0; c < cand.length && drawn < 160; c++) {
        var o = cand[c], m = o.n, hot = m === h, strong = hot || m.degree >= 50;
        if (!o.forced && free >= budget) continue;
        var size = strong ? 13 : m.degree >= 15 ? 12 : 11;
        ctx.font = (strong ? '700 ' : '500 ') + size + 'px ' + T.font;
        if (m.tw == null || hot) m.tw = ctx.measureText(m.label).width; // 줌, 팬 프레임마다 재지 않는다 (04 9절)
        var tw = m.tw, r = nodeR(m);
        if (hot) m.tw = null; // 호버가 풀리면 보통 글꼴로 다시 잰다
        // 노드와 고리를 비켜 오른쪽 위에. 막히면 왼쪽 위, 오른쪽 아래, 왼쪽 아래 순으로. 큰 구슬 위에는 얹지 않는다
        var gap = r + (m.category === 'overviews' ? 6 : 4) + 3, lx, ly, box = null;
        for (var sp = 0; sp < 4 && !box; sp++) {
          lx = sp % 2 ? o.x - gap * 0.92 - tw : o.x + gap * 0.92; ly = sp < 2 ? o.y - gap * 0.62 : o.y + gap * 0.62;
          // 화면 끝에 밀려 제 구슬을 덮는 자리는 버린다 (호버 라벨만 예전처럼 끝에 붙인다)
          if (!hot && (lx < 8 || lx + tw > W - 8)) continue;
          if (lx + tw > W - 8) lx = o.x - gap * 0.92 - tw;
          if (lx < 8) lx = Math.min(8, W - 8 - tw);
          var bx = { x: lx - 2, y: ly - size / 2 - 2, w: tw + 4, h: size + 4 };
          if (hot || (!boxes.some(function (q) { return overlaps(bx, q); }) && !heavy.some(function (q) { return q.n !== m && circleHits(bx, q); }))) box = bx;
        }
        if (!box && catTop[m.category] === m) { // 성운의 대표 허브는 다른 구슬 위라도 오른쪽 위에 이름을 남긴다
          lx = o.x + gap * 0.92; ly = o.y - gap * 0.62;
          if (lx + tw > W - 8) lx = o.x - gap * 0.92 - tw;
          var tb = { x: lx - 2, y: ly - size / 2 - 2, w: tw + 4, h: size + 4 };
          if (lx >= 8 && !boxes.some(function (q) { return overlaps(tb, q); })) box = tb;
        }
        if (!box) continue;
        boxes.push(box); labelBoxes.push(box);
        drawn++;
        if (!o.forced) free++;
        ctx.globalAlpha = 1;
        ctx.fillStyle = strong || m.degree >= 15 ? T.label : T.labelMuted;
        label(m.label, lx, ly);
      }
      if ('letterSpacing' in ctx) ctx.letterSpacing = '0px';
      drawnLabels = drawn;
    }
    function circleHits(b, c) {
      var qx = Math.max(b.x, Math.min(c.x, b.x + b.w)), qy = Math.max(b.y, Math.min(c.y, b.y + b.h));
      return Math.hypot(c.x - qx, c.y - qy) < c.r;
    }
    function label(txt, x, y) {
      ctx.lineWidth = 3; ctx.lineJoin = 'round'; ctx.strokeStyle = T.labelHalo;
      ctx.strokeText(txt, x, y); ctx.fillText(txt, x, y);
    }

    // 궤도 라벨: 모두 가로. 옆 호는 바깥쪽으로, 위아래 호는 노드 위나 아래 가운데. 크롬, 다른 라벨,
    // 다른 노드 원, 알약과 겹치면 뺀다 (탐욕, 우선순위 순). 다 못 적는 허브는 패널 목록이 맡는다 (04 4.7)
    function fitText(s, font, maxW) {
      // 폭을 8px 칸으로 내려 잰다. 칸 안 첫 호출 폭으로 재면 결과가 지나온 프레임에 따라 달라진다
      maxW = Math.floor(maxW / 8) * 8;
      var key = font + '|' + maxW + '|' + s;
      if (fitCache.has(key)) return fitCache.get(key);
      ctx.font = font;
      var out = s.length > 28 ? s.slice(0, 27) + '…' : s;
      while (out.length > 4 && ctx.measureText(out).width > maxW) out = out.slice(0, -2) + '…';
      if (ctx.measureText(out).width > maxW || (out !== s && out.length < Math.min(s.length, 8))) out = '';
      if (fitCache.size > 4000) fitCache.clear();
      fitCache.set(key, out);
      return out;
    }
    function wrap(text, maxW, maxLines) {
      var words = text.split(' '), lines = [], cur = '', i;
      for (i = 0; i < words.length; i++) {
        var t = cur ? cur + ' ' + words[i] : words[i];
        if (ctx.measureText(t).width > maxW && cur) { lines.push(cur); cur = words[i]; if (lines.length === maxLines) break; }
        else cur = t;
      }
      if (lines.length < maxLines) { lines.push(cur); i = words.length; }
      if (i < words.length || ctx.measureText(lines[lines.length - 1]).width > maxW) {
        var last = lines[lines.length - 1];
        while (last.length > 1 && ctx.measureText(last + '…').width > maxW) last = last.slice(0, -1);
        lines[lines.length - 1] = last + '…';
      }
      return lines;
    }
    function drawOrbitLabels(h) {
      var k = cam.k, cs = { x: C.x * k + cam.x, y: C.y * k + cam.y };
      var rightBound = isMobile() || panel.hidden ? W - 8 : panel.offsetLeft - 8;
      var boxes = chromeRects().slice(), obst = [];
      if (pillBox) boxes.push({ x: pillBox.x - 4, y: pillBox.y - 4, w: pillBox.w + 8, h: pillBox.h + 8 });
      var members = view.r1.concat(view.r2);
      // 장애물은 그려진 크기로 잰다: 구슬 테(1.08배)와 overviews 고리(+3.1)
      members.forEach(function (n) {
        var p = S(n), r = nodeR(n) * 1.08 + (n.category === 'overviews' ? 3.1 : 0) + 1;
        obst.push({ n: n, x: p.x - r, y: p.y - r, w: 2 * r, h: 2 * r });
      });
      var cd = view.c, c0 = S(cd), rc = nodeR(cd);
      obst.push({ n: cd, x: c0.x - rc - 12, y: c0.y - rc - 12, w: 2 * rc + 24, h: 2 * rc + 24 });
      ctx.lineJoin = 'round';
      // 중심 라벨: 노드 아래 두 줄까지. 줄 폭은 안쪽 궤도 안쪽 원의 현을 넘지 않는다. 다 안 들어가면 짧은 이름 한 줄
      if (cd.lt > 0.6) {
        ctx.globalAlpha = clamp((cd.lt - 0.6) / 0.4);
        ctx.font = '700 15px ' + T.font; ctx.textAlign = 'center'; ctx.textBaseline = 'top'; ctx.fillStyle = T.label;
        if ('letterSpacing' in ctx) ctx.letterSpacing = '-0.01em';
        var y0 = c0.y + rc + 16, rIn = 0;
        view.r1.forEach(function (m) { rIn = Math.max(rIn, nodeR(m)); });
        rIn = Math.min(view.R1 * k - rIn - 6, (view.R1 - 16) * k - 5);
        var chord = function (dy) { return 2 * Math.sqrt(Math.max(0, rIn * rIn - dy * dy)); };
        var lines = wrap(cd.title, Math.min(260, chord(y0 - c0.y + 36)), 2);
        var w1 = chord(y0 - c0.y + 17);
        if (/…$/.test(lines[lines.length - 1])) lines = w1 >= 16 ? wrap(cd.label, Math.min(220, w1), 1) : [];
        // 아래 자리가 범례 같은 크롬에 닿으면 노드 위로 올린다. 위도 막히면 알약으로 넘어간다
        var chrome0 = chromeRects(), hitsChrome = function (bs) { return bs.some(function (q) { return chrome0.some(function (c) { return overlaps(q, c); }); }); };
        var place = function (top) { return lines.map(function (ln, i) { var w = ctx.measureText(ln).width; return { x: c0.x - w / 2 - 2, y: top + i * 19 - 2, w: w + 4, h: 19 }; }); };
        var lb = lines.length && !/^…?$/.test(lines[0]) ? place(y0) : null;
        if (lb && hitsChrome(lb)) { y0 = c0.y - rc - 14 - lines.length * 19; lb = place(y0); if (hitsChrome(lb)) lb = null; }
        if (lb) {
          lines.forEach(function (ln, i) { label(ln, c0.x, y0 + i * 19); boxes.push(lb[i]); labelBoxes.push(lb[i]); });
        } else {
          // 안쪽 궤도가 중심에 붙어 자리가 없으면 짧은 이름을 알약에 얹어 궤도 위에 띄운다 (+k 알약과 같은 모양)
          ctx.font = '600 12px ' + T.font;
          var pt = fitText(cd.label, ctx.font, 150) || cd.label.slice(0, 10) + '…', pw = ctx.measureText(pt).width + 18, py0 = c0.y + rc + 14;
          if (hitsChrome([{ x: c0.x - pw / 2, y: py0, w: pw, h: 22 }])) py0 = c0.y - rc - 36;
          roundRect(c0.x - pw / 2, py0, pw, 22, 11);
          ctx.fillStyle = T.lens; ctx.fill();
          ctx.strokeStyle = T.cat[cd.category]; ctx.globalAlpha *= 0.9; ctx.lineWidth = 1; ctx.stroke();
          ctx.fillStyle = T.label; ctx.textBaseline = 'middle'; ctx.fillText(pt, c0.x, py0 + 11.5);
          var pbx = { x: c0.x - pw / 2, y: py0, w: pw, h: 22 };
          boxes.push(pbx); labelBoxes.push(pbx); centerPill = pbx;
        }
        if ('letterSpacing' in ctx) ctx.letterSpacing = '0px';
      }
      var list = members.filter(function (n) { return n.role >= 1 && n.lt > 0.85 && (lit[n.i] || n === h); });
      var pri = function (n) { return (n === h ? 1e6 : 0) + (h && h.nb.has(n) ? 1e4 : 0) + (n.role === 1 ? 1e3 : 0) + n.degree; };
      list.sort(function (a, b) { return pri(b) - pri(a); });
      ctx.textBaseline = 'middle';
      if ('letterSpacing' in ctx) ctx.letterSpacing = '0.01em';
      var n1 = 0, n2 = 0;
      list.forEach(function (n) {
        var strong = n === h;
        if (!strong && (n.role === 1 ? n1 >= 64 : n2 >= 18)) return;
        var p = S(n), r = nodeR(n), rd = r * 1.08 + (n.category === 'overviews' ? 3.1 : 0); // rd: 그려진 반지름
        var ang = Math.atan2(p.y - cs.y, p.x - cs.x), cx = Math.cos(ang), cy = Math.sin(ang);
        var side = Math.abs(cx) >= 0.4;
        if (n.role === 2 && !side && !strong) return; // 바깥 궤도의 위아래 라벨은 패널에 맡긴다
        var lf = strong || n.degree >= 50 ? { f: '700 13px ', px: 13, c: T.label } : n.degree >= 15 ? { f: '500 12px ', px: 12, c: T.label } : { f: '500 11px ', px: 11, c: T.labelMuted };
        var font = lf.f + T.font, lx, ly, align, maxW;
        if (side) {
          var rad = Math.hypot(p.x - cs.x, p.y - cs.y);
          var st = n.role === 1 ? Math.max(rad + r + 5, view.R1o * k + 8) : rad + r + 5;
          lx = cs.x + cx * st; ly = cs.y + cy * st;
          align = cx > 0 ? 'left' : 'right';
          // 수직에 가까운 옆 호에서는 글자 상자 모서리가 제 구슬에 닿지 않게 가로로 더 민다
          lx = cx > 0 ? Math.max(lx, p.x + rd + 5) : Math.min(lx, p.x - rd - 5);
          maxW = n.role === 1 ? Math.max(40, (view.R2 - view.R1o) * k / Math.max(0.6, Math.abs(cx)) - 22) : 150;
          maxW = Math.min(maxW, 170, cx > 0 ? rightBound - lx : lx - 8);
        } else {
          align = 'center'; lx = p.x; ly = p.y + (cy > 0 ? rd + lf.px * 0.5 + 4 : -(rd + lf.px * 0.5 + 4));
          maxW = 120;
        }
        if (strong) maxW = Math.max(maxW, 200);
        var txt = fitText(n.label, font, maxW);
        if (!txt) return;
        ctx.font = font;
        var tw = ctx.measureText(txt).width;
        var bx = align === 'left' ? lx : align === 'right' ? lx - tw : lx - tw / 2;
        var box = { x: bx - 2, y: ly - lf.px / 2 - 2, w: tw + 4, h: lf.px + 4 };
        if (!strong) {
          if (box.x < 4 || box.x + box.w > (align === 'left' ? rightBound + 2 : W - 4) || box.y < 4 || box.y + box.h > H - 4) return;
          for (var i = 0; i < boxes.length; i++) if (overlaps(box, boxes[i])) return;
          for (i = 0; i < obst.length; i++) if (obst[i].n !== n && overlaps(box, obst[i])) return;
        }
        // 호버 라벨은 충돌 검사를 건너뛰므로 알약에 닿으면 알약을 내린다 (수는 패널에 있다)
        if (strong && pillBox && overlaps(box, { x: pillBox.x - 4, y: pillBox.y - 4, w: pillBox.w + 8, h: pillBox.h + 8 })) pillBox = null;
        boxes.push(box); labelBoxes.push(box);
        if (n.role === 1) n1++; else n2++;
        orbitLabelCount++;
        var la = clamp((n.lt - 0.85) / 0.15) * (n.role === 2 && !strong ? 0.85 : 1);
        if (h && !strong && !h.nb.has(n)) la *= 0.35;
        ctx.globalAlpha = la; ctx.textAlign = align; ctx.fillStyle = strong ? T.label : lf.c;
        label(txt, lx, ly);
      });
      if ('letterSpacing' in ctx) ctx.letterSpacing = '0px';
      ctx.textAlign = 'left'; ctx.globalAlpha = 1;
    }

    // ── 입력: Pointer Events 하나, 휠 따로 (02 X1, 4 ~ 5절) ────────────────
    var pointers = new Map(), gesture = null, lastTap = null;
    function local(e) { var r = canvas.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; }
    function endGesture() {
      pointers.clear(); gesture = null; glide = null;
      canvas.classList.remove('is-panning');
    }
    function panFrom(p) {
      return { moved: true, sx: p.x, sy: p.y, cam: { x: cam.x, y: cam.y, k: cam.k }, type: gesture && gesture.type, track: [] };
    }

    // 히트 테스트: 화면 거리 - 화면 반지름이 여유보다 작은 것 중 가장 가까운 노드 (04 8절)
    // 궤도에서는 배경 노드와 거의 투명한 노드를 건너뛴다
    function hitTest(px, py, slop) {
      var best = null, bd = slop, orbit = mode === 'orbit';
      for (var i = 0; i < N; i++) {
        var n = nodes[i];
        if (orbit && (n.role < 0 || n.p < 0.3)) continue;
        var d = Math.hypot(sx(n.x) - px, sy(n.y) - py) - nodeR(n);
        if (d < bd) { bd = d; best = n; }
      }
      return best;
    }
    function hitPlus(x, y) {
      return mode === 'orbit' && !!pillBox && x > pillBox.x - 6 && x < pillBox.x + pillBox.w + 6 && y > pillBox.y - 3 && y < pillBox.y + pillBox.h + 3;
    }
    // 탭 한 곳: 조감은 궤도 열기, 궤도는 중심 옮기기. 빈 곳 두 번 누르기는 맞춤이다 (02 2.2, 4.2, 4.3절)
    function onTap(p, type) {
      if (popSwallow) { popSwallow = false; return; }
      var n = hitTest(p.x, p.y, type === 'mouse' ? 4 : 12), plus = !n && hitPlus(p.x, p.y);
      var now = performance.now(), prev = lastTap;
      lastTap = { t: now, x: p.x, y: p.y, type: type, n: n || plus };
      if (!n && !plus && prev && !prev.n && prev.type === type && now - prev.t <= 300 && Math.hypot(p.x - prev.x, p.y - prev.y) <= 24) {
        lastTap = null;
        fitView();
        return;
      }
      if (mode !== 'orbit') { if (n) selectNode(n.id); return; }
      if (n && n !== view.c) recenter(n.id);
      else if (n) { if (isMobile() && !sheetFull) setSheet(true, true); }
      else if (plus) toggleExpand();
      else if (cursor) setCursor(null, true);
    }

    canvas.addEventListener('pointerdown', function (e) {
      if (e.button !== 0 || pointers.size >= 2) return; // 오른쪽, 가운데 버튼과 셋째 손가락은 받지 않는다 (02 4.1절)
      try { canvas.setPointerCapture(e.pointerId); } catch (err) { /* 이미 끝난 포인터 */ }
      var p = local(e);
      pointers.set(e.pointerId, p);
      glide = null; // 미끄러지는 지도를 손으로 잡는다. 비행은 팬이 시작될 때만 멈춘다
      if (pointers.size === 1) {
        gesture = { moved: false, sx: p.x, sy: p.y, cam: null, type: e.pointerType, track: [] };
      } else {
        var ps = Array.from(pointers.values());
        flight = null; wz = null;
        setHover(null);
        gesture = { moved: true, type: e.pointerType, pinch: {
          d: Math.max(1, Math.hypot(ps[0].x - ps[1].x, ps[0].y - ps[1].y)),
          w: toWorld((ps[0].x + ps[1].x) / 2, (ps[0].y + ps[1].y) / 2), k: cam.k } };
        canvas.classList.add('is-panning');
      }
    });
    canvas.addEventListener('pointermove', function (e) {
      if (!gesture || !pointers.has(e.pointerId)) {
        if (e.pointerType === 'mouse' && !pointers.size) hoverAt(local(e));
        return;
      }
      var p = local(e);
      pointers.set(e.pointerId, p);
      if (gesture.pinch) {
        if (pointers.size < 2) return;
        var ps = Array.from(pointers.values()), g = gesture.pinch;
        var d = Math.hypot(ps[0].x - ps[1].x, ps[0].y - ps[1].y);
        // 처음 중점 아래 world 점을 지금 중점에 둔다: 확대와 중점 팬이 한 식이다
        cam = camFor(g.w.x, g.w.y, clampK(g.k * d / g.d), (ps[0].x + ps[1].x) / 2, (ps[0].y + ps[1].y) / 2);
        constrain(); redraw();
        return;
      }
      var dx = p.x - gesture.sx, dy = p.y - gesture.sy;
      if (!gesture.moved) {
        if (Math.hypot(dx, dy) <= (gesture.type === 'mouse' ? 4 : 8)) return; // 탭과 끌기 경계 (02 X2)
        gesture.moved = true; gesture.cam = { x: cam.x, y: cam.y, k: cam.k };
        flight = null; wz = null;
        canvas.classList.add('is-panning');
        setHover(null);
      }
      cam.x = gesture.cam.x + dx; cam.y = gesture.cam.y + dy;
      constrain();
      var t = e.timeStamp, tr = gesture.track;
      tr.push({ x: p.x, y: p.y, t: t });
      while (tr.length > 2 && t - tr[0].t > 100) tr.shift();
      redraw();
    });
    function endPointer(e) {
      if (!pointers.has(e.pointerId)) return;
      var p = local(e), g = gesture;
      pointers.delete(e.pointerId);
      if (g && !g.moved && e.type === 'pointerup') onTap(p, g.type);
      if (pointers.size === 1) {
        // 핀치에서 한 손가락을 떼면 남은 손가락으로 팬을 잇는다 (02 5.2절)
        gesture = panFrom(Array.from(pointers.values())[0]);
        return;
      }
      gesture = null;
      canvas.classList.remove('is-panning');
      // 관성: 마지막 80ms 속도로 미끄러진다. 손가락이 멈춘 뒤 뗐으면 없다 (02 J1)
      var tr = g && g.moved && !g.pinch && !reduce ? g.track : [];
      var last = tr[tr.length - 1];
      if (last && e.timeStamp - last.t < 50) {
        var first = tr.filter(function (q) { return last.t - q.t <= 80; })[0];
        var ddt = last.t - first.t;
        if (ddt > 8) {
          var vx = (last.x - first.x) / ddt, vy = (last.y - first.y) / ddt, sp = Math.hypot(vx, vy);
          if (sp > 0.12) { var c = Math.min(1, 4 / sp); glide = { vx: vx * c, vy: vy * c }; }
        }
      }
      redraw();
    }
    canvas.addEventListener('pointerup', endPointer);
    canvas.addEventListener('pointercancel', endPointer);
    canvas.addEventListener('lostpointercapture', endPointer);
    canvas.addEventListener('contextmenu', function () { if (gesture) endGesture(); });
    canvas.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse' && !pointers.size) setHover(null); });

    // 호버: 마우스만, 전환 중에는 판정하지 않는다 (02 2.4, 4.2절)
    function hoverAt(p) {
      var n = morph ? null : hitTest(p.x, p.y, 4), plus = !n && hitPlus(p.x, p.y);
      canvas.classList.toggle('is-over', !!n || plus);
      if (plus !== hotPlus) { hotPlus = plus; redraw(); }
      setHover(n);
    }
    function setHover(n) {
      if (!n) canvas.classList.remove('is-over');
      if (n === hovered) { if (n) placeTip(n); return; }
      hovered = n;
      wantTip(n);
      redraw();
    }

    // 툴팁: 노드 아래 r + 10px. 처음은 120ms 뒤, 300ms 안에 옮기면 바로 (02 9.5절)
    var tipTimer = 0, tipHiddenAt = -1e9, tipNode = null;
    function wantTip(n) {
      clearTimeout(tipTimer);
      if (!n) { if (!tip.hidden) tipHiddenAt = performance.now(); tip.hidden = true; return; }
      if (!tip.hidden || performance.now() - tipHiddenAt < 300) showTip(n);
      else { tip.hidden = true; tipTimer = setTimeout(function () { if (hovered === n) showTip(n); }, 120); }
    }
    function showTip(n) {
      var rel = mode === 'orbit' && view ? (n === view.c ? '중심' : n.role === 1 ? '이웃' : n.role === 2 ? '두 다리 건너' : '') : '';
      tip.innerHTML = '<div class="graph-tip-title">' + esc(n.title) + '</div><div class="graph-tip-meta" data-cat="' + esc(n.category) +
        '"><span class="graph-swatch"></span><span>' + esc(catName[n.category] || n.category) + '</span>' +
        (n.year ? '<span>' + n.year + '</span>' : '') + (n.type ? '<span>' + esc(n.type) + '</span>' : '') +
        '<span>연결 ' + n.degree + '</span>' + (rel ? '<span class="graph-tip-rel">' + rel + '</span>' : '') + '</div>';
      tip.hidden = false; tipNode = n;
      placeTip(n);
    }
    function placeTip(n) {
      if (tip.hidden) return;
      var p = S(n), r = nodeR(n), tw = tip.offsetWidth, th = tip.offsetHeight;
      var lx = p.x - 14, ly = p.y + r + 10;
      if (ly + th > H - 8) ly = p.y - r - 10 - th - 18; // 위로 뒤집을 때는 라벨 줄을 넘어서
      if (lx + tw > W - 8) lx = W - 8 - tw;
      tip.style.left = Math.max(8, lx) + 'px'; tip.style.top = Math.max(8, ly) + 'px';
    }

    // 휠: 커서 기준 줌. 두 손가락 스크롤도 줌이고 ctrl 휠(트랙패드 핀치)은 빠른 줌이다 (02 3.3절, N1)
    canvas.addEventListener('wheel', function (e) {
      e.preventDefault();
      if (gesture && gesture.moved) return;
      flight = null; glide = null;
      setHover(null);
      var dy = e.deltaY * (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? H : 1);
      var f = Math.max(0.5, Math.min(2, Math.exp(-dy * (e.ctrlKey ? 0.01 : 0.0018))));
      var p = local(e);
      wheelT = performance.now();
      if (reduce || e.ctrlKey) {
        // 핀치는 손을 그대로 따른다. 남은 휠 목표가 있으면 그 자리에서 이어 간다
        wz = null;
        zoomAt(p.x, p.y, cam.k * f);
      } else {
        wz = { k: clampK((wz ? wz.k : cam.k) * f), px: p.x, py: p.y };
      }
      clearTimeout(wheelEnd);
      wheelEnd = setTimeout(redraw, 170); // 휠이 멈추면 성운 이름 자리를 다시 찾는다
      redraw();
    }, { passive: false });
    var wheelEnd = 0;
    // iOS Safari 의 페이지 핀치 확대를 무대에서 막는다 (02 5.1절)
    stage.addEventListener('gesturestart', function (e) { e.preventDefault(); });

    // 줌 버튼과 맞춤 (01 5.6절, 02 3.2절)
    var zoomIn = document.getElementById('graph-zoom-in');
    var zoomOut = document.getElementById('graph-zoom-out');
    var fitBtn = document.getElementById('graph-fit');
    [zoomIn, zoomOut, fitBtn, stage.querySelector('.graph-hint.is-atlas'), stage.querySelector('.graph-hint.is-orbit'),
      stage.querySelector('.graph-hint-line[data-hint="select"]')].forEach(function (b) { if (b) b.hidden = false; });
    if (zoomIn) zoomIn.addEventListener('click', function () { zoomBy(1.5); });
    if (zoomOut) zoomOut.addEventListener('click', function () { zoomBy(1 / 1.5); });
    if (fitBtn) fitBtn.addEventListener('click', fitView);
    var zState = '';
    function syncZoomButtons() {
      var k = flight ? flight.to.k : wz ? wz.k : cam.k;
      var s = (k >= K_MAX - 1e-6 ? 'i' : '') + (k <= K_MIN + 1e-6 ? 'o' : '');
      if (s === zState) return;
      zState = s;
      if (zoomIn) zoomIn.setAttribute('aria-disabled', String(s.indexOf('i') >= 0));
      if (zoomOut) zoomOut.setAttribute('aria-disabled', String(s.indexOf('o') >= 0));
    }
    zState = '-'; syncZoomButtons();

    // ── 선택, 궤도, 복귀 (02 2.2, 2.3절, 04 6절) ─────────────────────────────
    // 진입점: selectNode(id) 조감이면 궤도 열기, 궤도면 중심 옮기기. exitOrbit() 조감으로 복귀.
    // 진입은 pushState, 중심 옮기기와 펼침은 replaceState, 나가기는 push 한 항목이면 back (writeUrl, 02 8.6)
    function selectNode(id, opts) {
      var n = byId[id];
      if (!n) return false;
      if (mode === 'orbit') recenter(id, opts); else enterOrbit(n, opts);
      return true;
    }
    function enterOrbit(n, opts) {
      opts = opts || {};
      // 복귀 카메라: 나가는 비행 중이면 그 목표, 사용자가 멈췄거나 쉬고 있으면 지금 카메라 (02 2.5절, 시안 결함 수정)
      var c0 = flight && flight.kind === 'exit' ? flight.to : cam;
      atlasCam = { x: c0.x, y: c0.y, k: c0.k };
      C = { x: n.hx, y: n.hy };
      mode = 'orbit'; stage.dataset.mode = 'orbit';
      trail = [n.id]; expanded = false;
      cursor = null; setHover(null);
      view = layout(n.id, false); prevView = null;
      setTargets(view, 'enter');
      if (opts.instant) morph.t0 = -1e9;
      openPanel();
      var target = orbitCam(view);
      if (opts.instant) { cam = target; flight = null; } else flyTo(target, 720, 'enter');
      pulseT0 = opts.instant || reduce ? -1 : performance.now() + 380;
      announceCenter(n);
      writeUrl(true);
      redraw();
    }
    function recenter(id, opts) {
      opts = opts || {};
      var n = byId[id];
      if (!n) return;
      if (mode !== 'orbit') { enterOrbit(n, opts); return; }
      if (n === view.c && !opts.force) return;
      if (!opts.fromTrail) { var at = trail.indexOf(id); if (at >= 0) trail = trail.slice(0, at + 1); else trail.push(id); }
      if (n !== view.c) expanded = false;
      cursor = null; setHover(null);
      prevView = view; view = layout(id, expanded);
      setTargets(view, 'recenter');
      renderPanel(); renderTrail();
      if (isMobile()) setSheet(sheetFull, false); // 내용이 바뀌면 펼친 시트 높이도 바뀐다
      flyTo(orbitCam(view), 600, 'recenter');
      pulseT0 = reduce ? -1 : performance.now() + 200;
      if (!opts.keepList) announceCenter(n);
      writeUrl(false);
      redraw();
    }
    function exitOrbit() {
      if (mode !== 'orbit') return;
      mode = 'atlas'; stage.dataset.mode = 'atlas';
      cursor = null; setHover(null);
      // 궤도 중에 미뤄 둔 세로 전환을 나가면서 적용한다. 그때 복귀 카메라는 새 배치의 맞춤이다 (04 3.4)
      var p = W < H * 0.8;
      if (p !== portrait) { setHome(p); atlasCam = null; }
      prevView = view; view = null;
      setTargets(null, 'exit');
      closePanel();
      flyTo(atlasCam || fitTarget(nodes), 640, 'exit');
      canvas.setAttribute('aria-label', 'wiki 페이지 관계 그래프, 전체 보기');
      announce('전체 보기');
      // 이 탐색기가 push 한 궤도 항목이면 되돌아가고, 아니면 node 만 지운다 (02 2.3)
      if (!applying && main.dataset.view === 'map' && history.state && history.state.graph === 'orbit') { expectBack = true; history.back(); }
      else writeUrl(false);
      redraw();
    }
    function back() { // 경로를 한 칸 되돌린다. 7번(Backspace)이 쓴다
      if (trail.length < 2) { exitOrbit(); return; }
      trail.pop();
      recenter(trail[trail.length - 1], { fromTrail: true });
    }
    function toggleExpand() {
      var fromBtn = pBody.contains(document.activeElement);
      expanded = !expanded;
      cursor = null; setHover(null);
      prevView = view; view = layout(view.cid, expanded);
      setTargets(view, 'recenter');
      renderPanel();
      if (isMobile()) setSheet(sheetFull, false);
      flyTo(orbitCam(view), 600, 'recenter');
      // 목록을 다시 그리면 누른 버튼이 사라져 초점이 body 로 떨어진다. 새 버튼으로 옮긴다
      var nb = fromBtn && pBody.querySelector('[data-act="expand"]');
      if (nb) nb.focus({ preventScroll: true });
      writeUrl(false);
      redraw();
    }

    // ── 알림 (02 9.2절) ──────────────────────────────────────────────────
    function announce(text) {
      if (live.textContent !== text) { live.textContent = text; return; }
      live.textContent = '';
      requestAnimationFrame(function () { live.textContent = text; });
    }
    function announceCenter(n) {
      canvas.setAttribute('aria-label', '관계 그래프, ' + n.title + ' 중심');
      announce(n.title + ' 중심. 이웃 ' + n.degree + '개' + (inF[n.i] ? '' : '. 지금 필터 밖입니다'));
    }

    // ── 상세 패널과 경로 줄 (01 5, 6, 9절, 02 9.1절) ─────────────────────
    function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
    function pageHref(n) { return BASE + n.id + '/'; }
    // inert 를 열 때 먼저 풀고 닫을 때 바로 건다 (01 9.3절)
    function openPanel() {
      panel.removeAttribute('inert');
      if (panel.hidden) sheetFull = false;
      panel.hidden = false;
      trailEl.hidden = false;
      if (tools) tools.hidden = true; // 궤도에서는 경로 줄의 "전체 보기" 가 맞춤을 대신한다 (01 5.6)
      syncRow();
      renderPanel(); renderTrail();
      syncSheet();
      chromeCache = null;
    }
    function closePanel() {
      var had = panel.contains(document.activeElement) || trailEl.contains(document.activeElement);
      panel.setAttribute('inert', '');
      panel.hidden = true;
      trailEl.hidden = true;
      if (tools) tools.hidden = false;
      syncRow();
      syncSheet();
      chromeCache = null;
      if (had) canvas.focus({ preventScroll: true });
    }
    function renderPanel() {
      var n = view.c, nb = view.r1.length;
      pCat.dataset.cat = n.category;
      pCat.innerHTML = '<span class="graph-swatch" aria-hidden="true"></span>' + esc(catName[n.category] || n.category);
      pTitle.textContent = n.title;
      var ins = 0, outs = 0;
      view.r1.forEach(function (m) { if (m.out.has(n)) ins++; if (n.out.has(m)) outs++; });
      pMeta.innerHTML = (n.year ? '<span>' + n.year + '</span>' : '') + (n.type ? '<span>' + esc(n.type) + '</span>' : '') +
        '<span>연결 ' + n.degree + '</span><span class="graph-meta-io" title="이 페이지를 링크하는 페이지 ' + ins + '개, 이 페이지가 링크하는 페이지 ' + outs + '개">' +
        '<span aria-hidden="true">←</span>' + ins + ' <span aria-hidden="true">→</span>' + outs + '<span class="sr-only">, 들어오는 링크 ' + ins + '개, 나가는 링크 ' + outs + '개</span></span>' +
        '<span class="graph-out-mark" hidden>필터 밖</span>';
      pOpen.href = pageHref(n);
      var html = n.tags.length ? '<ul class="graph-p-tags" aria-label="태그">' + n.tags.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>' : '';
      html += '<h3 class="graph-p-section">이웃 페이지 <span>' + nb + '개</span></h3>';
      if (nb > 40) html += '<p class="graph-p-note">이웃이 많아 궤도에는 라벨을 일부만 적습니다. 전체는 이 목록에 있습니다.</p>';
      var cur = null, first = true;
      view.r1.forEach(function (m) {
        if (m.category !== cur) {
          if (cur) html += '</ul>';
          cur = m.category;
          var cnt = view.r1.filter(function (x) { return x.category === cur; }).length;
          html += '<p class="graph-nb-group" data-cat="' + esc(cur) + '"><span class="graph-swatch" aria-hidden="true"></span>' +
            esc(catName[cur] || cur) + '<span class="graph-nb-n">' + cnt + '</span></p><ul class="graph-nb-list">';
        }
        var both = n.out.has(m) && m.out.has(n), dir = both ? '↔' : n.out.has(m) ? '→' : '←';
        var dirText = both ? '서로 링크' : dir === '→' ? '이 페이지가 링크' : '이 페이지를 링크';
        html += '<li><button type="button" class="graph-nb" data-id="' + esc(m.id) + '" data-cat="' + esc(m.category) + '" tabindex="' + (first ? 0 : -1) + '">' +
          '<span class="graph-nb-dir" title="' + dirText + '" aria-hidden="true">' + dir + '</span><span class="graph-nb-t">' + esc(m.title) + '</span>' +
          '<span class="graph-nb-deg"><span class="sr-only">, ' + dirText + ', 연결 </span>' + m.degree + '</span></button></li>';
        first = false;
      });
      if (cur) html += '</ul>';
      if (view.total2) {
        html += '<p class="graph-p-note is-hop2">두 다리 건너 닿는 페이지는 ' + view.total2 + '개입니다. ' +
          (view.hidden ? '바깥 궤도에는 이웃을 많이 공유하는 ' + view.r2.length + '개만 둡니다. <button type="button" class="graph-linkish" data-act="expand">모두 보이기</button>'
            : expanded ? '바깥 궤도에 모두 보입니다. <button type="button" class="graph-linkish" data-act="expand">' + CAP2 + '개로 줄이기</button>' : '바깥 궤도에 모두 보입니다.') + '</p>';
      }
      pBody.innerHTML = html;
      pBody.scrollTop = 0;
      syncPanelFilter();
      pToggle.textContent = sheetFull ? '이웃 접기' : '이웃 ' + nb + '개';
    }
    function renderTrail() {
      var show = trail.slice(-4), skipped = trail.length - show.length;
      crumbs.innerHTML = (skipped ? '<li class="graph-crumb-more"><span aria-hidden="true">…</span><span class="sr-only">앞의 ' + skipped + '개 생략</span></li>' : '') +
        show.map(function (id, i) {
          var m = byId[id], last = i === show.length - 1;
          return '<li data-cat="' + esc(m.category) + '"><button type="button" data-id="' + esc(id) + '" title="' + esc(m.title) + '"' +
            (last ? ' aria-current="location"' : '') + '><span class="graph-swatch" aria-hidden="true"></span><span class="graph-crumb-t">' + esc(m.label) + '</span></button></li>';
        }).join('');
      trailEl.scrollLeft = trailEl.scrollWidth;
    }

    var panel = stage.querySelector('.graph-panel');
    var pCat = document.getElementById('graph-p-cat'), pTitle = document.getElementById('graph-p-title');
    var pMeta = document.getElementById('graph-p-meta'), pBody = document.getElementById('graph-p-body');
    var pOpen = document.getElementById('graph-p-open'), pToggle = document.getElementById('graph-p-toggle');
    var pHead = panel.querySelector('.graph-panel-head'), pFoot = panel.querySelector('.graph-panel-foot');
    var grip = panel.querySelector('.graph-sheet-grip');
    var crumbs = document.getElementById('graph-crumbs'), live = document.getElementById('graph-live');
    var tools = stage.querySelector('.graph-tools');
    var trailEl = stage.querySelector('.graph-trail'), dock = stage.querySelector('.graph-dock'), tip = stage.querySelector('.graph-tip');

    crumbs.addEventListener('click', function (ev) {
      var b = ev.target.closest('button[data-id]');
      if (!b) return;
      var at = trail.indexOf(b.dataset.id);
      if (at >= 0) trail = trail.slice(0, at + 1);
      recenter(b.dataset.id, { fromTrail: true });
    });
    document.getElementById('graph-home').addEventListener('click', function () { exitOrbit(); canvas.focus({ preventScroll: true }); });
    document.getElementById('graph-p-close').addEventListener('click', function () { exitOrbit(); canvas.focus({ preventScroll: true }); });
    // 이웃 목록: 누르면 중심 옮기기. 키보드로 눌렀으면 초점을 캔버스로 (02 6.6절)
    pBody.addEventListener('click', function (ev) {
      if (ev.target.closest('[data-act="expand"]')) { toggleExpand(); return; }
      var b = ev.target.closest('.graph-nb');
      if (!b) return;
      recenter(b.dataset.id);
      if (ev.detail === 0) canvas.focus({ preventScroll: true });
    });
    // 목록은 Tab 한 번으로 들어가고 나온다. 안에서는 ↑ ↓ Home End (roving tabindex, 02 6.6절)
    pBody.addEventListener('keydown', function (ev) {
      var b = ev.target.closest('.graph-nb');
      if (!b || ['ArrowDown', 'ArrowUp', 'Home', 'End'].indexOf(ev.key) < 0) return;
      var all = Array.prototype.slice.call(pBody.querySelectorAll('.graph-nb')), i = all.indexOf(b);
      var j = ev.key === 'Home' ? 0 : ev.key === 'End' ? all.length - 1 : Math.max(0, Math.min(all.length - 1, i + (ev.key === 'ArrowDown' ? 1 : -1)));
      ev.preventDefault();
      if (j === i) return;
      b.tabIndex = -1; all[j].tabIndex = 0; all[j].focus();
    });
    // 목록 행을 가리키거나 초점을 주면 캔버스의 그 노드를 강조한다 (툴팁은 없다)
    function listHover(ev) {
      var b = ev.target.closest && ev.target.closest('.graph-nb'), n = b ? byId[b.dataset.id] : null;
      if (n !== hovered && !morph) { hovered = n; redraw(); }
    }
    pBody.addEventListener('pointerover', listHover);
    pBody.addEventListener('focusin', listHover);
    pBody.addEventListener('pointerleave', function () { if (hovered) { hovered = null; redraw(); } });
    pBody.addEventListener('focusout', function (ev) { if (!pBody.contains(ev.relatedTarget) && hovered) { hovered = null; redraw(); } });

    // ── 모바일 바닥 시트: 접힘과 펼침, 손잡이 끌기 (01 5.4절, 02 2.7, 5.3절) ──
    // 높이는 내용에서 잰다. 펼침은 --graph-sheet-max(42vh)까지
    function sheetPx(full) {
      var was = panel.classList.contains('is-peek');
      panel.classList.toggle('is-peek', !full);
      var fixed = pHead.offsetTop + pHead.offsetHeight + pFoot.offsetHeight + 2;
      var h = full ? Math.min(parseFloat(getComputedStyle(panel).maxHeight) || H * 0.42, fixed + pBody.scrollHeight) : fixed;
      panel.classList.toggle('is-peek', was);
      return Math.round(h);
    }
    function setSheet(full, fly) {
      if (!isMobile() || panel.hidden || !view) return;
      sheetFull = full;
      var h = sheetPx(full);
      panel.classList.toggle('is-peek', !full);
      panel.style.height = h + 'px';
      if (full) pBody.removeAttribute('inert'); else pBody.setAttribute('inert', '');
      pToggle.setAttribute('aria-expanded', String(full));
      pToggle.textContent = full ? '이웃 접기' : '이웃 ' + view.r1.length + '개';
      sheetH = h;
      stage.style.setProperty('--graph-sheet', h + 'px');
      stage.classList.toggle('is-sheet-full', full);
      chromeCache = null;
      if (fly) flyTo(orbitCam(view), 360);
      redraw();
    }
    // 640px 경계와 열림 상태에 맞춰 옆 패널과 시트를 오간다 (02 2.7절 마지막 줄)
    function syncSheet() {
      if (isMobile() && !panel.hidden && view) { setSheet(sheetFull, false); return; }
      if (!isMobile()) { panel.classList.remove('is-peek'); panel.style.height = ''; pBody.removeAttribute('inert'); }
      sheetH = 0;
      stage.style.setProperty('--graph-sheet', '0px');
      stage.classList.remove('is-sheet-full');
      chromeCache = null;
    }
    pToggle.addEventListener('click', function () { setSheet(!sheetFull, true); });
    var sdrag = null;
    function sheetDown(e) {
      if (!isMobile() || panel.hidden || e.button !== 0 || e.target.closest('button, a')) return;
      try { e.currentTarget.setPointerCapture(e.pointerId); } catch (err) { /* 이미 끝난 포인터 */ }
      sdrag = { id: e.pointerId, y0: e.clientY, h0: sheetH, moved: false, track: [] };
    }
    function sheetMove(e) {
      if (!sdrag || e.pointerId !== sdrag.id) return;
      var dy = e.clientY - sdrag.y0;
      if (!sdrag.moved) {
        if (Math.abs(dy) <= 8) return;
        sdrag.moved = true; sdrag.lo = sheetPx(false); sdrag.hi = sheetPx(true);
        stage.classList.add('is-sheet-drag');
        panel.classList.remove('is-peek');
      }
      var h = Math.max(sdrag.lo, Math.min(sdrag.hi, sdrag.h0 - dy));
      panel.style.height = h + 'px';
      stage.style.setProperty('--graph-sheet', h + 'px'); // 궤도 카메라는 끄는 동안 다시 맞추지 않는다
      sdrag.track.push({ y: e.clientY, t: e.timeStamp });
      while (sdrag.track.length > 2 && e.timeStamp - sdrag.track[0].t > 100) sdrag.track.shift();
    }
    function sheetUp(e) {
      if (!sdrag || e.pointerId !== sdrag.id) return;
      var d = sdrag; sdrag = null;
      stage.classList.remove('is-sheet-drag');
      if (!d.moved) { if (e.type === 'pointerup') setSheet(!sheetFull, true); return; }
      var tr = d.track, a = tr[0], z = tr[tr.length - 1], v = a && z && z.t > a.t ? (z.y - a.y) / (z.t - a.t) : 0;
      var h = parseFloat(panel.style.height) || sheetH;
      // 빠르게 튕기면 그 방향, 느리면 가까운 멈춤점 (0.5px/ms)
      setSheet(v < -0.5 ? true : v > 0.5 ? false : h - d.lo > d.hi - h, true);
    }
    [grip, pHead].forEach(function (el) {
      el.addEventListener('pointerdown', sheetDown);
      el.addEventListener('pointermove', sheetMove);
      el.addEventListener('pointerup', sheetUp);
      el.addEventListener('pointercancel', sheetUp);
    });
    dock.addEventListener('transitionend', function () { chromeCache = null; redraw(); });
    // 팝오버와 시트의 등장 애니메이션 도중 잰 크롬 상자를 끝난 자리로 다시 잰다
    stage.addEventListener('animationend', function () { chromeCache = null; redraw(); });

    // ── 필터: 카테고리(범례), 유형과 태그(팝오버) (01 4절, 02 8.1 ~ 8.3절, 04 7.3절) ──
    // 모든 변경은 applyFilters() 하나를 지나고 거기서 hash 를 replaceState 한다
    var cmd = stage.querySelector('.graph-cmd'), legendEl = stage.querySelector('.graph-legend');
    var legendStat = stage.querySelector('.graph-legend-stat'), legendReset = stage.querySelector('.graph-legend-reset');
    var statText = legendStat.textContent;
    var fBtn = document.getElementById('graph-filter-btn'), badge = fBtn.querySelector('.graph-badge');
    var pop = document.getElementById('graph-filters'), popEmpty = document.getElementById('graph-filters-empty');
    var rowEl = document.getElementById('graph-active-filters');
    var tagQ = document.getElementById('graph-tag-q'), tagRes = document.getElementById('graph-tag-results');
    var tagPicked = document.getElementById('graph-tag-picked'), tagSuggest = document.getElementById('graph-tag-suggest');
    var typeChips = Array.prototype.slice.call(pop.querySelectorAll('.graph-chip[data-type]'));
    var TYPE_ORDER = typeChips.map(function (b) { return b.dataset.type; });
    var CAT_LIST = Object.keys(catName);
    var tagFreq = {};
    nodes.forEach(function (n) { n.tags.forEach(function (t) { tagFreq[t] = (tagFreq[t] || 0) + 1; }); });
    var TAGS = Object.keys(tagFreq).sort(function (a, b) { return tagFreq[b] - tagFreq[a] || (a < b ? -1 : 1); });

    function matches(n) {
      if (filt.cat.size && !filt.cat.has(n.category)) return false;
      if (filt.type.size && !filt.type.has(n.type)) return false;
      if (filt.tag.size && !n.tags.some(function (t) { return filt.tag.has(t); })) return false;
      return true;
    }
    function getFilters() {
      return {
        cat: CAT_LIST.filter(function (c) { return filt.cat.has(c); }),
        type: TYPE_ORDER.filter(function (t) { return filt.type.has(t); }),
        tag: Array.from(filt.tag).sort(),
      };
    }
    // 모르는 값은 버린다 (02 8.5). 빠진 축은 비운다
    function setFilters(f, opts) {
      f = f || {};
      filt.cat = new Set((f.cat || []).filter(function (c) { return c in catName; }));
      filt.type = new Set((f.type || []).filter(function (t) { return TYPE_ORDER.indexOf(t) >= 0; }));
      filt.tag = new Set((f.tag || []).filter(function (t) { return t in tagFreq; }));
      applyFilters(opts);
    }
    function syncLit() {
      litCat = {};
      for (var i = 0; i < N; i++) {
        var n = nodes[i];
        lit[i] = fActive ? inF[i] : legendHover ? (n.category === legendHover ? 1 : 0) : 1;
        if (lit[i]) litCat[n.category] = true; else if (!(n.category in litCat)) litCat[n.category] = false;
      }
      namesCache = null;
      redraw();
    }
    function applyFilters(opts) {
      opts = opts || {};
      fActive = !!(filt.cat.size || filt.type.size || filt.tag.size);
      fCount = 0;
      for (var i = 0; i < N; i++) { inF[i] = matches(nodes[i]) ? 1 : 0; fCount += inF[i]; }
      if (fActive) legendHover = null;
      syncLit();
      // 범례: 눌림, 해제 버튼, 맞는 수
      legendEl.querySelectorAll('.graph-legend-item[data-cat]').forEach(function (b) {
        b.setAttribute('aria-pressed', String(filt.cat.has(b.dataset.cat)));
      });
      legendReset.hidden = !filt.cat.size;
      legendStat.textContent = fActive ? '맞는 페이지 ' + fCount + '개 / ' + N + '개' : statText;
      legendStat.classList.toggle('is-filtered', fActive);
      // 팝오버: 칩, 배지 (유형과 태그 수만, 01 4절), 0개 안내
      typeChips.forEach(function (b) { b.setAttribute('aria-pressed', String(filt.type.has(b.dataset.type))); });
      var nb = filt.type.size + filt.tag.size;
      badge.hidden = !nb; badge.textContent = nb || '';
      fBtn.classList.toggle('is-on', nb > 0);
      fBtn.setAttribute('aria-label', '필터' + (nb ? ', 유형과 태그 ' + nb + '개 켜짐' : ''));
      popEmpty.hidden = fCount > 0;
      popEmpty.textContent = fCount ? '' : '조건에 맞는 페이지가 없습니다.';
      renderTags();
      syncRow();
      syncPanelFilter();
      if (searchQ) runSearch(true);
      if (!opts.silent) announce(!fActive ? '필터 해제' : fCount ? '필터 적용. 페이지 ' + fCount + '개' : '조건에 맞는 페이지가 없습니다');
      writeUrl(false);
    }
    // 궤도에서는 칩 줄 자리를 경로 줄이 쓰므로 숨기고 배지만 남긴다 (01 4절, 6절)
    function syncRow() {
      var items = getFilters(), show = mode !== 'orbit' && (items.type.length || items.tag.length || (fActive && !fCount));
      var html = '';
      if (show) {
        html = '<span class="graph-row-count' + (fCount ? '' : ' is-zero') + '">' + (fCount ? '페이지 ' + fCount + '개' : '맞는 페이지가 없습니다') + '</span>' +
          items.type.map(function (t) { return chipX('type', t, '유형'); }).join('') +
          items.tag.map(function (t) { return chipX('tag', t, '태그'); }).join('') +
          (fCount ? '' : '<button type="button" class="graph-row-reset" data-act="reset">모두 해제</button>');
      }
      var changed = rowEl.hidden === !!show || rowEl.innerHTML !== html;
      if (rowEl.innerHTML !== html) rowEl.innerHTML = html;
      rowEl.hidden = !show;
      if (changed) { chromeCache = null; namesCache = null; redraw(); } // 줄 폭이 바뀌면 라벨이 피할 상자도 바뀐다
    }
    function chipX(axis, v, lab) {
      return '<button type="button" class="graph-fchip" data-axis="' + axis + '" data-v="' + esc(v) + '" aria-label="' + lab + ' ' + esc(v) + ' 해제">' +
        '<span class="graph-fchip-k">' + lab + '</span>' + esc(v) + '<span class="graph-fchip-x" aria-hidden="true">×</span></button>';
    }
    // 패널: 중심이 필터 밖이면 메타에 표시, 이웃 행은 흐리게 (02 8.2)
    function syncPanelFilter() {
      if (!view) return;
      var mark = pMeta.querySelector('.graph-out-mark');
      if (mark) mark.hidden = inF[view.c.i] === 1;
      pBody.querySelectorAll('.graph-nb').forEach(function (b) { b.classList.toggle('is-out', !inF[byId[b.dataset.id].i]); });
    }
    function toggleIn(set, v) { if (set.has(v)) set.delete(v); else set.add(v); applyFilters(); }
    // 약한 연결 렌즈: 목록 판 리포트 행의 data-id 가 집합이다 (graph.json 에 싣지 않는다). 상태는 보기 취향이라 localStorage 에만 둔다
    var weakSw = document.getElementById('graph-weak');
    listEl.querySelectorAll('#weak-links li[data-id]').forEach(function (li) { var n = byId[li.dataset.id]; if (n) n.weak = true; });
    function setWeak(on) {
      weakOn = on;
      weakSw.setAttribute('aria-checked', String(on));
      fBtn.classList.toggle('has-emph', on); // 배지 옆 점: 모바일은 범례 줄이 없어 강조가 켜진 것을 여기서 안다
      announce(on ? '연결이 적은 페이지 강조' : '강조 해제');
      redraw();
    }
    try { if (localStorage.getItem('graph.weak') === '1') { weakOn = true; weakSw.setAttribute('aria-checked', 'true'); fBtn.classList.add('has-emph'); } } catch (err) { /* 저장 불가 */ }
    function resetAll() { filt.cat.clear(); filt.type.clear(); filt.tag.clear(); applyFilters(); }

    // 범례: 누르면 켜고 끈다. 미리 강조(마우스)는 필터가 하나도 없을 때만 (02 8.1)
    legendEl.addEventListener('click', function (e) {
      var b = e.target.closest('.graph-legend-item[data-cat]');
      if (b) toggleIn(filt.cat, b.dataset.cat);
    });
    legendReset.addEventListener('click', function () {
      filt.cat.clear(); applyFilters();
      var first = legendEl.querySelector('.graph-legend-item');
      if (first) first.focus({ preventScroll: true }); // 눌렀던 버튼이 숨으므로 초점을 범례 안에 둔다
    });
    legendEl.addEventListener('pointerover', function (e) {
      if (e.pointerType !== 'mouse') return;
      var b = e.target.closest('.graph-legend-item[data-cat]'), c = b && !fActive ? b.dataset.cat : null;
      if (c !== legendHover) { legendHover = c; syncLit(); }
    });
    legendEl.addEventListener('pointerleave', function () { if (legendHover) { legendHover = null; syncLit(); } });

    // 활성 필터 줄: × 로 하나씩 푼다
    rowEl.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (!b) return;
      if (b.dataset.act === 'reset') resetAll();
      else { filt[b.dataset.axis].delete(b.dataset.v); applyFilters(); }
      if (!rowEl.contains(document.activeElement) || rowEl.hidden) {
        var nx = rowEl.hidden ? null : rowEl.querySelector('button');
        (nx || fBtn).focus({ preventScroll: true });
      }
    });

    // 팝오버 열고 닫기 (02 2.6). 열면 첫 칩에 초점, Esc 와 버튼은 초점을 버튼으로 돌린다
    function openFilters() {
      closeResults();
      pop.hidden = false;
      fBtn.setAttribute('aria-expanded', 'true');
      // 모바일 궤도: 패널 시트를 접고 inert (01 5.4)
      if (isMobile() && !panel.hidden) { if (sheetFull) setSheet(false, true); panel.setAttribute('inert', ''); }
      chromeCache = null; namesCache = null;
      (typeChips[0] || tagQ).focus({ preventScroll: true });
      redraw();
    }
    function closeFilters(focusBtn) {
      if (pop.hidden) return;
      var had = pop.contains(document.activeElement);
      pop.hidden = true;
      fBtn.setAttribute('aria-expanded', 'false');
      closeTagList();
      if (!panel.hidden) panel.removeAttribute('inert');
      chromeCache = null; namesCache = null;
      if (focusBtn || had) fBtn.focus({ preventScroll: true });
      redraw();
    }
    fBtn.addEventListener('click', function () { if (pop.hidden) openFilters(); else closeFilters(true); });
    function popKey(e) {
      if (e.key !== 'Escape' || pop.hidden || e.isComposing) return;
      e.preventDefault(); e.stopPropagation();
      closeFilters(true);
    }
    pop.addEventListener('keydown', popKey);
    fBtn.addEventListener('keydown', popKey);
    // 밖을 누르면 닫는다. 캔버스 탭이었으면 노드를 고르지 않는다 (드래그는 팬으로 둔다)
    document.addEventListener('pointerdown', function (e) {
      var open = !pop.hidden, out = open && !pop.contains(e.target) && !fBtn.contains(e.target);
      popSwallow = out && e.target === canvas;
      if (out) closeFilters(false);
    }, true);
    pop.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (!b) return;
      if (b.id === 'graph-filters-reset') { resetAll(); return; } // 강조 스위치는 그대로 둔다 (06 2.2)
      if (b === weakSw) { setWeak(!weakOn); try { localStorage.setItem('graph.weak', weakOn ? '1' : '0'); } catch (err) { /* 저장 불가 */ } return; }
      if (b.dataset.type) { toggleIn(filt.type, b.dataset.type); return; }
      if (b.dataset.tag) {
        var box = b.parentNode, at = Array.prototype.indexOf.call(box.children, b);
        toggleIn(filt.tag, b.dataset.tag);
        // 다시 그려 사라진 칩 자리에 초점을 남긴다. 없으면 태그 입력으로
        var nx = box.children[Math.min(at, box.children.length - 1)];
        (nx || tagQ).focus({ preventScroll: true });
      }
    });

    // 태그: 자동완성 입력 + 추천 칩 8개 + 고른 칩 (01 4절). 카테고리와 같은 이름은 추천에서 뺀다
    var tagHits = [], tagActive = -1;
    function renderTags() {
      var picked = Array.from(filt.tag).sort();
      tagPicked.innerHTML = picked.map(function (t) {
        return '<button type="button" class="graph-chip is-picked" data-tag="' + esc(t) + '" aria-pressed="true" aria-label="태그 ' + esc(t) + ' 해제">' +
          esc(t) + '<span class="graph-chip-x" aria-hidden="true">×</span></button>';
      }).join('');
      var sug = TAGS.filter(function (t) { return !(t in catName) && !filt.tag.has(t); }).slice(0, 8);
      tagSuggest.innerHTML = sug.map(function (t) {
        return '<button type="button" class="graph-chip" data-tag="' + esc(t) + '" aria-pressed="false">' + esc(t) + '<span class="graph-chip-n">' + tagFreq[t] + '</span></button>';
      }).join('');
      if (tagQ.value) runTagSearch();
    }
    function runTagSearch() {
      var s = norm(tagQ.value);
      tagHits = !s ? [] : TAGS.filter(function (t) { return !filt.tag.has(t) && t.indexOf(s) >= 0; })
        .sort(function (a, b) { return (b.indexOf(s) === 0) - (a.indexOf(s) === 0) || tagFreq[b] - tagFreq[a] || (a < b ? -1 : 1); }).slice(0, 8);
      tagActive = tagHits.length ? 0 : -1;
      renderTagList(s);
    }
    function renderTagList(s) {
      if (!s) { closeTagList(); return; }
      tagQ.setAttribute('aria-expanded', 'true');
      tagRes.innerHTML = tagHits.length ? tagHits.map(function (t, i) {
        var at = t.indexOf(s);
        return '<li role="option" id="graph-tag-opt-' + i + '" data-tag="' + esc(t) + '" aria-selected="' + (i === tagActive) + '">' +
          '<span class="graph-opt-t">' + esc(t.slice(0, at)) + '<mark>' + esc(t.slice(at, at + s.length)) + '</mark>' + esc(t.slice(at + s.length)) + '</span>' +
          '<span class="graph-opt-n">' + tagFreq[t] + '</span></li>';
      }).join('') : '<li class="graph-opt-empty" role="presentation">일치하는 태그가 없습니다</li>';
      if (tagActive >= 0) tagQ.setAttribute('aria-activedescendant', 'graph-tag-opt-' + tagActive); else tagQ.removeAttribute('aria-activedescendant');
    }
    function closeTagList() {
      tagRes.innerHTML = ''; tagHits = []; tagActive = -1;
      tagQ.setAttribute('aria-expanded', 'false'); tagQ.removeAttribute('aria-activedescendant');
    }
    function pickTag(t) {
      tagQ.value = ''; closeTagList();
      filt.tag.add(t); applyFilters();
      tagQ.focus({ preventScroll: true });
    }
    tagQ.addEventListener('input', runTagSearch);
    tagQ.addEventListener('keydown', function (e) {
      if (e.isComposing || e.keyCode === 229) return; // 한글 조합 중 Enter, 방향키는 조합이 쓴다 (02 7.1)
      if ((e.key === 'ArrowDown' || e.key === 'ArrowUp') && tagHits.length) {
        e.preventDefault();
        tagActive = (tagActive + (e.key === 'ArrowDown' ? 1 : -1) + tagHits.length) % tagHits.length;
        renderTagList(norm(tagQ.value));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (tagActive >= 0) pickTag(tagHits[tagActive]);
      } else if (e.key === 'Escape' && tagRes.innerHTML) {
        e.preventDefault(); e.stopPropagation(); // 제안 목록만 닫는다 (02 6.5 2단계)
        closeTagList();
      }
    });
    tagQ.addEventListener('blur', function () { setTimeout(function () { if (document.activeElement !== tagQ) closeTagList(); }, 0); });
    tagRes.addEventListener('pointerdown', function (e) { e.preventDefault(); });
    tagRes.addEventListener('click', function (e) { var li = e.target.closest('li[data-tag]'); if (li) pickTag(li.dataset.tag); });

    // ── 검색: 제목과 stem 부분 일치, 태그 제외 (02 7절) ─────────────────────
    var q = document.getElementById('graph-q'), results = document.getElementById('graph-results');
    var searchQ = '', hits = [], active = -1, countTimer = 0;
    function norm(s) { return String(s).normalize('NFC').toLowerCase().trim().replace(/\s+/g, ' '); }
    nodes.forEach(function (n) { n.qt = norm(n.title); });
    function runSearch(keepActive) {
      var s = searchQ = norm(q.value), st = s.replace(/ /g, '-'), prev = active >= 0 && hits[active] && hits[active].n;
      hits = !s ? [] : nodes.map(function (n) {
        var at = n.qt.indexOf(s);
        if (at < 0 && n.stem.indexOf(st) < 0) return null;
        return { n: n, at: at, score: (at === 0 ? 1000 : at > 0 ? 500 : 0) + n.degree };
      }).filter(Boolean).sort(function (a, b) { return b.score - a.score || a.n.title.localeCompare(b.n.title, 'ko'); });
      searchHits = new Set(hits.slice(0, 40).map(function (h) { return h.n; }));
      active = hits.length ? 0 : -1;
      if (keepActive && prev) for (var i = 0; i < Math.min(8, hits.length); i++) if (hits[i].n === prev) active = i;
      renderResults();
      redraw();
      // 결과 수는 입력이 500ms 멈춘 뒤 알린다 (02 9.2)
      clearTimeout(countTimer);
      if (s && !keepActive) countTimer = setTimeout(function () { announce(hits.length ? '결과 ' + hits.length + '개' : '일치하는 페이지가 없습니다'); }, 500);
    }
    function renderResults() {
      var open = !!searchQ && document.activeElement === q;
      q.setAttribute('aria-expanded', String(open));
      if (!open) { results.innerHTML = ''; q.removeAttribute('aria-activedescendant'); return; }
      var s = searchQ, st = s.replace(/ /g, '-');
      results.innerHTML = !hits.length
        ? '<li class="graph-res-empty" role="presentation"><span class="graph-res-empty-t">일치하는 페이지가 없습니다</span>영문 제목이나 파일 이름으로 찾아 보세요.</li>'
        : hits.slice(0, 8).map(function (h, i) {
          var n = h.n, t = n.title, out = !inF[n.i];
          // 정규화 뒤에도 길이가 같을 때만 원문 위치에 강조를 건다
          var title = h.at >= 0 && n.qt.length === t.length ? esc(t.slice(0, h.at)) + '<mark>' + esc(t.slice(h.at, h.at + s.length)) + '</mark>' + esc(t.slice(h.at + s.length)) : esc(t);
          var sa = h.at < 0 ? n.stem.indexOf(st) : -1;
          var stem = sa >= 0 ? '<span class="graph-res-stem">' + esc(n.stem.slice(0, sa)) + '<mark>' + esc(n.stem.slice(sa, sa + st.length)) + '</mark>' + esc(n.stem.slice(sa + st.length)) + '</span>' : '';
          return '<li role="option" id="graph-res-' + i + '" class="graph-res' + (out ? ' is-out' : '') + '" data-cat="' + esc(n.category) + '" data-id="' + esc(n.id) + '" aria-selected="' + (i === active) + '" title="' + esc(t) + '">' +
            '<span class="graph-swatch" aria-hidden="true"></span><span class="graph-res-main"><span class="graph-res-t">' + title + '</span>' + stem + '</span>' +
            '<span class="graph-res-meta">' + (out ? '<span class="graph-res-out">필터 밖</span>' : '') + '<span class="graph-res-deg"><span class="sr-only">연결 </span>' + n.degree + '</span></span></li>';
        }).join('') + (hits.length > 8 ? '<li class="graph-res-more" role="presentation">위 8개를 보여 줍니다. 결과 ' + hits.length + '개</li>' : '');
      if (active >= 0) q.setAttribute('aria-activedescendant', 'graph-res-' + active); else q.removeAttribute('aria-activedescendant');
      var a = results.querySelector('[aria-selected="true"]');
      if (a && a.scrollIntoView) a.scrollIntoView({ block: 'nearest' });
    }
    function closeResults() { results.innerHTML = ''; q.setAttribute('aria-expanded', 'false'); q.removeAttribute('aria-activedescendant'); }
    function clearSearch() { q.value = ''; searchQ = ''; hits = []; active = -1; searchHits = new Set(); clearTimeout(countTimer); closeResults(); redraw(); }
    // 고르면: 입력 비우기, 그 노드를 막던 축만 풀기, 궤도 진입이나 중심 옮기기, 초점은 캔버스로 (02 7.5)
    function pick(n) {
      clearSearch();
      var freed = false;
      if (fActive && !inF[n.i]) {
        if (filt.cat.size && !filt.cat.has(n.category)) { filt.cat.clear(); freed = true; }
        if (filt.type.size && !filt.type.has(n.type)) { filt.type.clear(); freed = true; }
        if (filt.tag.size && !n.tags.some(function (t) { return filt.tag.has(t); })) { filt.tag.clear(); freed = true; }
        if (freed) applyFilters({ silent: true });
      }
      canvas.focus({ preventScroll: true });
      if (mode === 'orbit' && view && view.c === n) { if (freed) announce('필터 일부를 해제했습니다'); return; }
      selectNode(n.id);
      if (freed) announce(live.textContent + '. 필터 일부를 해제했습니다');
    }
    q.addEventListener('input', function () { runSearch(false); });
    q.addEventListener('focus', function () { closeFilters(false); if (searchQ) renderResults(); });
    q.addEventListener('blur', function () { setTimeout(function () { if (document.activeElement !== q) closeResults(); }, 0); });
    q.addEventListener('keydown', function (e) {
      if (e.isComposing || e.keyCode === 229) return; // 조합을 끝내는 Enter 가 결과 선택으로 번지지 않게 (02 7.1)
      var m = Math.min(hits.length, 8);
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (!results.innerHTML && searchQ) { renderResults(); return; }
        if (!m) return;
        active = (active + (e.key === 'ArrowDown' ? 1 : -1) + m) % m;
        renderResults();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (active >= 0 && hits[active]) pick(hits[active].n);
      } else if (e.key === 'Escape') {
        e.preventDefault(); e.stopPropagation(); // 글자를 지우고 결과를 닫는다 (02 6.5 1단계)
        clearSearch();
        canvas.focus({ preventScroll: true });
      }
    });
    results.addEventListener('pointerdown', function (e) { e.preventDefault(); }); // 입력 초점을 지킨다 (02 7.4)
    results.addEventListener('click', function (e) { var li = e.target.closest('li[data-id]'); if (li) pick(byId[li.dataset.id]); });

    // ── 키보드 (02 6절). 검색, 태그 입력, 팝오버, 이웃 목록은 자기 키를 먼저 처리한다 ──
    function typing(el) { return !!el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName)); }
    function skipKey(e) { return e.isComposing || e.keyCode === 229 || main.dataset.view !== 'map' || typing(e.target); }
    // 궤도 커서: 호버를 지우고 툴팁을 붙이고 알린다. 화면 밖이면 카메라가 따라간다 (02 6.4절)
    function setCursor(n, quiet) {
      cursor = n; hovered = null;
      canvas.classList.remove('is-over');
      wantTip(null);
      if (n) {
        showTip(n); follow(n);
        var p = view.pos.get(n.id), list = p.ring === 2 ? view.r2 : view.r1;
        announce(n.title + ', ' + (catName[n.category] || n.category) + '. ' + (p.ring === 2 ? '바깥' : '안쪽') + ' 궤도 ' + (list.indexOf(n) + 1) + ' / ' + list.length);
      } else if (!quiet) announce(view.c.title + ' 중심');
      redraw();
    }
    // 커서 노드의 도착 자리가 사용 영역 밖이면 최소 거리만 240ms 비행한다
    function follow(n) {
      var p = view.pos.get(n.id), to = flight ? flight.to : cam, a = useRect(), m = 28;
      var x = (C.x + Math.cos(p.ang) * p.rad) * to.k + to.x, y = (C.y + Math.sin(p.ang) * p.rad) * to.k + to.y;
      var dx = x < a.x + m ? a.x + m - x : x > a.x + a.w - m ? a.x + a.w - m - x : 0;
      var dy = y < a.y + m ? a.y + m - y : y > a.y + a.h - m ? a.y + a.h - m - y : 0;
      if (dx || dy) flyTo({ x: to.x + dx, y: to.y + dy, k: to.k }, 240);
    }
    function angOf(n) { return view.pos.get(n.id).ang; }
    // 원형 최소 각도 차가 가장 작은 노드. 같으면 목록 앞쪽 (02 6.4절)
    function nearest(list, ang) {
      var best = null, bd = Infinity;
      list.forEach(function (m) {
        var d = Math.abs(((angOf(m) - ang) % TAU + TAU * 1.5) % TAU - TAU / 2);
        if (d < bd - 1e-9) { bd = d; best = m; }
      });
      return best;
    }
    function moveCursor(k) {
      var ring = cursor ? view.pos.get(cursor.id).ring : 0, r1 = view.r1, r2 = view.r2, nx = null;
      if (k === 'ArrowRight' || k === 'ArrowLeft') {
        var d = k === 'ArrowRight' ? 1 : -1, list = ring === 2 ? r2 : r1;
        if (!ring) nx = r1.length ? r1[d > 0 ? 0 : r1.length - 1] : null;
        else nx = list[(list.indexOf(cursor) + d + list.length) % list.length];
      } else if (k === 'ArrowDown') nx = !ring ? nearest(r1, Math.PI / 2) : ring === 1 ? nearest(r2, angOf(cursor)) : null;
      else if (ring === 1) { setCursor(null); return; }
      else if (ring === 2) nx = nearest(r1, angOf(cursor));
      if (nx) setCursor(nx);
    }
    // 필터 안 최대 degree, 같으면 id 순 (02 2.2절)
    function topHub() {
      var best = null;
      nodes.forEach(function (n) { if (inF[n.i] && (!best || n.degree > best.degree || (n.degree === best.degree && n.id < best.id))) best = n; });
      return best;
    }
    var ARROW = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };
    // 캔버스 키 (02 6.3절). 처리했으면 true
    function canvasKey(e) {
      var k = e.key, dir = ARROW[k];
      if (k === '+' || k === '=') { zoomBy(1.5); return true; }
      if (k === '-' || k === '_') { zoomBy(1 / 1.5); return true; }
      if (k === '0') { fitView(); return true; }
      if (dir && e.shiftKey) {
        var d = useRect().w * 0.1;
        flight = null; wz = null; glide = null;
        cam.x -= dir[0] * d; cam.y -= dir[1] * d;
        constrain(); redraw();
        return true;
      }
      if (mode !== 'orbit' || !view) {
        if (!dir && k !== 'Enter') return false;
        var hub = topHub();
        if (hub) selectNode(hub.id);
        return true;
      }
      if (k === 'Enter') { if (cursor && cursor !== view.c) selectNode(cursor.id); else location.href = pageHref(view.c); return true; }
      if (k === ' ') { if (cursor) selectNode(cursor.id); return true; }
      if (k === 'Backspace') { back(); return true; }
      if (k === 'Home' || k === 'End') { if (view.r1.length) setCursor(view.r1[k === 'Home' ? 0 : view.r1.length - 1]); return true; }
      if (dir) { moveCursor(k); return true; }
      return false;
    }
    // Esc 단계 4 ~ 8. 1 ~ 3단계는 검색, 태그 입력, 팝오버가 먼저 처리하고 전파를 멈춘다 (02 6.5절)
    function escStep() {
      if (!pop.hidden) { closeFilters(true); return; }
      if (mode === 'orbit' && view) {
        if (isMobile() && sheetFull && !panel.hidden) setSheet(false, true);
        else if (cursor) setCursor(null);
        else exitOrbit();
        return;
      }
      if (filt.cat.size) {
        var onReset = document.activeElement === legendReset;
        filt.cat.clear(); applyFilters();
        if (onReset) legendEl.querySelector('.graph-legend-item[tabindex="0"]').focus({ preventScroll: true }); // 누르던 버튼이 숨는다
      }
    }
    // "/" 는 사이트 검색(search.js)보다 먼저 받아 그래프 검색에 준다 (02 6.2절)
    window.addEventListener('keydown', function (e) {
      if (e.key !== '/' || e.ctrlKey || e.metaKey || e.altKey || skipKey(e)) return;
      e.preventDefault(); e.stopPropagation();
      q.focus(); q.select();
    }, true);
    document.addEventListener('keydown', function (e) {
      if (e.defaultPrevented || e.altKey || skipKey(e)) return;
      var mod = e.ctrlKey || e.metaKey, t = e.target;
      if (e.key === 'Escape') {
        // 헤더(모바일 메뉴)의 Esc 는 nav.js 몫이다
        if (!mod && !(header && header.contains(t))) escStep();
        return;
      }
      if (t !== canvas && t !== document.body) return;
      if (mod) {
        if (e.key === 'Enter' && mode === 'orbit' && view) { e.preventDefault(); window.open(pageHref(cursor || view.c), '_blank', 'noopener'); }
        return;
      }
      if (canvasKey(e)) e.preventDefault();
    });

    // 범례와 도구 묶음: Tab 한 번으로 들어가고 나오며 안에서는 방향키 (roving tabindex, 02 6.6절)
    function roving(box, sel) {
      function items() {
        var all = Array.prototype.slice.call(box.querySelectorAll(sel));
        var vis = all.filter(function (b) { return !b.hidden && b.getClientRects().length; });
        return vis.length ? vis : all;
      }
      function sync(cur) {
        var all = items();
        if (all.indexOf(cur) < 0) cur = all.filter(function (b) { return b.tabIndex === 0; })[0] || all[0];
        all.forEach(function (b) { b.tabIndex = b === cur ? 0 : -1; });
      }
      box.addEventListener('focusin', function (e) { var b = e.target.closest(sel); if (b) sync(b); });
      box.addEventListener('keydown', function (e) {
        var b = e.target.closest(sel), all = items(), i = all.indexOf(b), k = e.key;
        if (i < 0 || e.altKey || e.ctrlKey || e.metaKey) return;
        var j = k === 'Home' ? 0 : k === 'End' ? all.length - 1 : k === 'ArrowRight' || k === 'ArrowDown' ? (i + 1) % all.length
          : k === 'ArrowLeft' || k === 'ArrowUp' ? (i - 1 + all.length) % all.length : -1;
        if (j < 0) return;
        e.preventDefault();
        all[j].focus();
      });
      sync();
      return sync;
    }
    var syncLegendTabs = roving(legendEl, '.graph-legend-item');
    var syncToolTabs = tools ? roving(tools, '.graph-tool') : function () {};

    cmd.hidden = false;
    chromeCache = null;
    applyFilters({ silent: true });

    // ── 크기와 테마 ───────────────────────────────────────────────────────
    function resize() {
      var r = canvas.getBoundingClientRect(), oldW = W, oldH = H;
      if (!r.width || !r.height) return; // 목록 판에서는 무대가 숨어 크기가 0이다
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = r.width; H = r.height;
      canvas.width = Math.max(1, Math.floor(W * dpr));
      canvas.height = Math.max(1, Math.floor(H * dpr));
      chromeCache = null;
      buildBackground();
      endGesture(); // 진행 중 제스처는 끝낸다 (02 10절)
      syncLegendTabs(); syncToolTabs(); // 폭에 따라 숨는 버튼(모바일 줌)이 Tab 자리를 쥐지 않게
      var p = W < H * 0.8;
      setHover(null);
      if (!fitted) {
        setHome(p);
        nodes.forEach(function (n) { n.x = n.hx; n.y = n.hy; });
        cam = fitTarget(nodes);
        fitted = true;
      } else if (mode === 'orbit' && view) {
        // 궤도는 상태를 그대로 두고 카메라만 즉시 다시 맞춘다. 세로 전환은 나갈 때 적용한다 (04 3.4, 7.2)
        syncSheet();
        cam = orbitCam(view); flight = null;
      } else if (p !== portrait) {
        // 노드의 640ms 이동과 카메라 맞춤 비행을 같이 돌려 함께 도착시킨다 (04 3.4절)
        cam.x += (W - oldW) / 2;
        cam.y += (H - oldH) / 2;
        setHome(p);
        setTargets(null, 'home');
        flyTo(fitTarget(nodes), 640);
      } else {
        // 같은 곳을 화면 가운데에 둔다 (다시 맞추지 않는다, 04 7.2)
        cam.x += (W - oldW) / 2;
        cam.y += (H - oldH) / 2;
        constrain();
      }
      redraw();
    }

    // 무대 위쪽 크롬이 헤더 밑에서 시작하도록 실제 헤더 높이를 넣는다 (01 2.2)
    function syncHeader() {
      main.style.setProperty('--graph-header-h', headerH() + 'px');
      chromeCache = null;
      namesCache = null;
      redraw();
    }

    // ── 판 전환: 지도와 목록 (01 2.3, 02 8.4 ~ 8.6) ──────────────────────
    var pushedList = false;
    function setView(v) {
      main.dataset.view = v;
      stage.hidden = v !== 'map';
      listEl.hidden = v === 'map';
      toMapBtn.hidden = v === 'map';
      if (v === 'map') { syncHeader(); resize(); }
    }
    // ── hash 와 history (02 8.4 ~ 8.6) ────────────────────────────────────
    function own(o, k) { return Object.prototype.hasOwnProperty.call(o, k); } // #toString 같은 입력이 프로토타입에 걸리지 않게
    function encId(id) { return /^[a-z0-9/-]+$/.test(id) ? id : id.split('/').map(encodeURIComponent).join('/'); }
    function hashOf(s) {
      var p = [];
      if (s.node) p.push('node=' + encId(s.node));
      ['cat', 'type', 'tag'].forEach(function (k) { if (s[k].length) p.push(k + '=' + s[k].map(encodeURIComponent).join(',')); });
      return p.length ? '#' + p.join('&') : '';
    }
    function curState() {
      var f = getFilters();
      f.node = mode === 'orbit' && view ? view.c.id : null;
      return f;
    }
    function setUrl(h, push) {
      var url = location.pathname + location.search + h;
      try {
        if (push) history.pushState({ graph: 'orbit' }, '', url);
        else if (location.hash !== h || (!h && location.href.slice(-1) === '#')) history.replaceState(history.state, '', url);
      } catch (e) { /* file:// 등 */ }
    }
    // 상태 → URL. 궤도 진입만 push, 나머지는 replace (02 8.6, N3)
    function writeUrl(push) {
      if (applying || main.dataset.view !== 'map') return;
      setUrl(hashOf(curState()), push);
    }
    // hash 를 { kind: 'state' | 'list' | 'anchor' | 'ignore' } 로 읽는다. 모르는 키와 깨진 인코딩은 그 part만 버린다 (02 8.5)
    function readHash() {
      var h = location.hash.slice(1), s = { node: null, cat: [], type: [], tag: [] }, known = false, list = false;
      if (!h) return { kind: 'state', s: s };
      h.split('&').forEach(function (part) {
        if (part === 'list') { list = true; return; }
        var i = part.indexOf('='), k = part.slice(0, i);
        if (i < 0 || ['node', 'path', 'cat', 'type', 'tag'].indexOf(k) < 0) return;
        known = true;
        try {
          var raw = part.slice(i + 1);
          if (k === 'node') s.node = decodeURIComponent(raw) || null;
          else if (k !== 'path') s[k] = raw.split(',').map(decodeURIComponent).filter(Boolean); // path 는 Phase 5 예약
        } catch (e) { /* 깨진 % 인코딩 */ }
      });
      if (list) return { kind: 'list' };
      if (known) return { kind: 'state', s: s };
      if (own(catName, h)) return { kind: 'state', s: { node: null, cat: [h], type: [], tag: [] } }; // 옛 #physical-ai 형식
      var el = null;
      try { el = document.getElementById(decodeURIComponent(h)); } catch (e) { /* 깨진 인코딩 */ }
      return el && listEl.contains(el) ? { kind: 'anchor', el: el } : { kind: 'ignore' };
    }
    // URL → 상태. 멱등이라 popstate 와 hashchange 가 함께 와도 한 번만 바뀐다
    function syncFromHash(e) {
      if (expectBack && e && e.type === 'popstate') {
        // exitOrbit 이 부른 back. 궤도 중에 바꾼 필터를 앞 항목에도 남긴다
        expectBack = false;
        applying = false;
        writeUrl(false);
        return;
      }
      applying = false;
      var first = !e, r = readHash();
      if (r.kind === 'ignore') { if (first) setView('map'); return; } // #main 같은 목록 밖 앵커는 무시한다
      if (r.kind !== 'state') {
        setView('list');
        if (r.kind === 'anchor') r.el.scrollIntoView();
        else if (location.hash !== '#list') setUrl('#list', false);
        return;
      }
      pushedList = false;
      applying = true;
      var s = r.s, n = s.node ? byId[s.node] : null;
      // 새로 고친 궤도 항목은 이미 앞에 조감 항목이 있다. 그 밖의 첫 딥링크는 조감 항목을 깔고 push 한다 (02 8.6)
      var stack = first && n && !(history.state && history.state.graph === 'orbit');
      try {
        if (main.dataset.view !== 'map') setView('map');
        var before = JSON.stringify(getFilters());
        filt.cat = new Set(s.cat); filt.type = new Set(s.type); filt.tag = new Set(s.tag.filter(function (t) { return own(tagFreq, t); }));
        var f = getFilters(); // 범례, 유형, 사전 순으로 정렬된 정규형
        setFilters(f, { silent: first || JSON.stringify(f) === before });
        if (n && !stack) { if (mode !== 'orbit') enterOrbit(n, { instant: first }); else if (view.c !== n) recenter(n.id); }
        else if (!n && mode === 'orbit') exitOrbit();
      } finally { applying = false; }
      if (s.node && !n) announce('요청한 페이지를 그래프에서 찾지 못했습니다');
      if (stack) { setUrl(hashOf(getFilters()), false); enterOrbit(n, { instant: true }); }
      else setUrl(hashOf(curState()), false); // 정규형으로 고친다
    }
    toListBtn.addEventListener('click', function () {
      try { history.pushState(null, '', '#list'); pushedList = true; } catch (e) { /* file:// 등 */ }
      setView('list');
      window.scrollTo(0, 0);
      toMapBtn.focus({ preventScroll: true });
    });
    toMapBtn.addEventListener('click', function () {
      if (pushedList) { history.back(); return; } // popstate 가 지도 판으로 되돌린다
      setView('map');
      setUrl(hashOf(curState()), false); // 메모리에 둔 궤도와 필터를 되살린다
      canvas.focus({ preventScroll: true });
    });
    window.addEventListener('popstate', syncFromHash);
    window.addEventListener('hashchange', syncFromHash);

    // ── 시작 ───────────────────────────────────────────────────────────────
    applyTheme();
    GC.onThemeChange(applyTheme);
    GC.onResize(stage, resize, 0);
    if (header && window.ResizeObserver) new ResizeObserver(syncHeader).observe(header);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () {
      namesCache = null; clearWidths();
      if (mode === 'orbit' && view && !morph) { syncSheet(); cam = orbitCam(view); }
      redraw();
    });
    // 늦게 받은 글꼴로 라벨 폭과 시트 높이가 바뀌므로 다시 잰다 (WebKit 은 loadingdone 이 없어 loading 뒤 ready)
    if (document.fonts && document.fonts.addEventListener) document.fonts.addEventListener('loading', function () {
      document.fonts.ready.then(function () {
        namesCache = null; clearWidths();
        if (mode === 'orbit' && view && !sdrag) syncSheet();
        redraw();
      });
    });
    // 페이지를 연 뒤 OS 설정이 바뀌어도 따라간다. 켜지면 진행 중인 모션을 끝 상태로 보낸다 (02 9.5)
    var mqReduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
    function onReduce() {
      reduce = mqReduce.matches;
      if (!reduce) return;
      revealT0 = -1; pulseT0 = -1; shimmerUntil = 0; glide = null;
      if (morph) morph.t0 = -1e9;
      if (flight) { cam = { x: flight.to.x, y: flight.to.y, k: flight.to.k }; flight = null; }
      if (wz) { zoomAt(wz.px, wz.py, wz.k); wz = null; }
      redraw();
    }
    if (mqReduce && mqReduce.addEventListener) mqReduce.addEventListener('change', onReduce);
    else if (mqReduce && mqReduce.addListener) mqReduce.addListener(onReduce);
    syncFromHash();

    // 검증용 읽기 창구 (브라우저 자동 검증과 뒤 항목 테스트가 쓴다)
    window.__graphExplorer = {
      nodes: N, edges: edges.length,
      cam: function () { return { x: cam.x, y: cam.y, k: cam.k }; },
      drawn: function () { return drawnNodes; },
      drawTimes: drawTimes,
      portrait: function () { return portrait; },
      busy: function () { return !!(rafId || morph || flight || glide || wz); },
      toWorld: function (px, py) { return toWorld(px, py); },
      glide: function () { return glide && { vx: glide.vx, vy: glide.vy }; },
      flying: function () { return !!flight; },
      hit: function (px, py, slop) { var n = hitTest(px, py, slop == null ? 12 : slop); return n && n.id; },
      labels: function () { return drawnLabels; },
      // 선택과 궤도 (4번). 뒤 항목도 selectNode, exitOrbit, back 을 그대로 쓴다
      select: function (id, opts) { return selectNode(id, opts); },
      exit: exitOrbit,
      back: back,
      mode: function () { return mode; },
      morphing: function () { return !!morph; },
      orbit: function () {
        return view && { cid: view.cid, r1: view.r1.map(function (n) { return n.id; }), r2: view.r2.map(function (n) { return n.id; }),
          hidden: view.hidden, total2: view.total2, expanded: expanded, trail: trail.slice(), labels: orbitLabelCount };
      },
      atlasCam: function () { return atlasCam && { x: atlasCam.x, y: atlasCam.y, k: atlasCam.k }; },
      pos: function (id) { var n = byId[id]; return n && { x: n.x, y: n.y, hx: n.hx, hy: n.hy, sx: sx(n.x), sy: sy(n.y), r: nodeR(n), p: n.p }; },
      screen: function (id) { var n = byId[id]; return n && { x: sx(n.x), y: sy(n.y), r: nodeR(n) }; },
      hovered: function () { return hovered && hovered.id; },
      // 키보드 (7번)
      cursor: function () { return cursor && cursor.id; },
      ang: function (id) { var p = view && view.pos.get(id); return p ? { ang: p.ang, ring: p.ring } : null; },
      // 검색과 필터 (5번). 6번 hash 도 getFilters, setFilters 를 그대로 쓴다
      getFilters: getFilters,
      setFilters: setFilters,
      filtered: function () { return { active: fActive, count: fCount, ids: nodes.filter(function (n) { return inF[n.i]; }).map(function (n) { return n.id; }) }; },
      emph: function (id) { var n = byId[id]; return n && emph[n.i]; },
      weak: function () { return { on: weakOn, mix: weakMix, ids: nodes.filter(function (n) { return n.weak; }).map(function (n) { return n.id; }) }; },
      search: function () { return { q: searchQ, total: hits.length, shown: hits.slice(0, 8).map(function (h) { return h.n.id; }), active: active, canvas: searchHits.size }; },
      sheet: function () { return { full: sheetFull, h: sheetH }; },
      geom: function () {
        return { pill: pillBox, centerPill: centerPill, labels: labelBoxes.slice(), chrome: chromeRects(),
          nodes: nodes.filter(function (n) { return mode === 'atlas' ? true : n.role >= 0; }).map(function (n) {
            var r = nodeR(n) * 1.08 + (n.category === 'overviews' ? 3.1 : 0);
            return { id: n.id, x: sx(n.x), y: sy(n.y), r: r };
          }) };
      },
    };
  }
})();
