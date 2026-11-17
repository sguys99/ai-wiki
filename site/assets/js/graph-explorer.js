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

    // ── 데이터 ─────────────────────────────────────────────────────────────
    // n.hx, n.hy: home (구운 배치, 세로 화면이면 x와 y 교환). n.x, n.y: 지금 그리는 위치 (전환 중 다르다).
    var nodes = graph.nodes.map(function (d, i) {
      return {
        i: i, id: d.id, title: d.title, category: d.category, degree: d.degree, tags: d.tags || [],
        xy: d.xy, r: Math.min(20, 2 + 1.6 * Math.sqrt(d.degree)), label: shortTitle(d.title),
        hx: 0, hy: 0, x: 0, y: 0,
      };
    });
    var N = nodes.length;
    var edges = [];
    var L = graph.links;
    for (var li = 0; li + 1 < L.length; li += 2) {
      var s = nodes[L[li]], t = nodes[L[li + 1]];
      if (s && t && s !== t) edges.push({ s: s, t: t });
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

    function shortTitle(t) {
      var c = t.indexOf(':');
      if (c >= 2 && c <= 28 && !/[ㄱ-힝]/.test(t.slice(0, c))) return t.slice(0, c);
      return t.length > 28 ? t.slice(0, 27) + '…' : t;
    }

    // ── 상태 ───────────────────────────────────────────────────────────────
    var W = 0, H = 0, dpr = 1;
    var cam = { x: 0, y: 0, k: 1 }; // screen = world × k + (x, y)
    var K_MIN = 0.2;
    var portrait = null;
    var fitted = false;      // 무대가 처음 보일 때 한 번 화면 맞춤
    var revealT0 = reduce ? -1 : null; // 첫 등장 시각. -1 은 연출 없음
    var morph = null;        // { t0, dur } 노드가 n.f 에서 n.t 로 옮겨 가는 중
    var catInfo = [];        // 성운 이름 자리 계산용 카테고리 중심과 외곽 (home 기준)
    var T = null, dark = true, sprites = {}, bg = null, dust = null, haze = null;
    var chromeCache = null, namesCache = null;
    var drawTimes = [], drawnNodes = 0;

    // ── 좌표 변환 ─────────────────────────────────────────────────────────
    function sx(wx) { return wx * cam.k + cam.x; }
    function sy(wy) { return wy * cam.k + cam.y; }
    function camFor(wx, wy, k, px, py) { return { x: px - wx * k, y: py - wy * k, k: k }; }
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
    function setHome(p, animate) {
      portrait = p;
      nodes.forEach(function (n) {
        n.hx = p ? n.xy[1] : n.xy[0];
        n.hy = p ? n.xy[0] : n.xy[1];
        if (animate) { n.f = { x: n.x, y: n.y }; } else { n.x = n.hx; n.y = n.hy; }
      });
      morph = animate && !reduce ? { t0: performance.now(), dur: 640 } : null;
      if (animate && reduce) nodes.forEach(function (n) { n.x = n.hx; n.y = n.hy; });
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
    function stepMorph(now) {
      if (!morph) return false;
      var e = easeIO(clamp((now - morph.t0) / morph.dur));
      nodes.forEach(function (n) { n.x = n.f.x + (n.hx - n.f.x) * e; n.y = n.f.y + (n.hy - n.f.y) * e; });
      if (e >= 1) morph = null;
      return true;
    }
    function easeIO(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
    function clamp(t) { return t < 0 ? 0 : t > 1 ? 1 : t; }

    // ── 토큰, 스프라이트, 배경 ───────────────────────────────────────────
    // main.graph 가 사이트 토큰 일부를 시안 F 값으로 덮어쓰므로 main 에서 읽는다
    function readTokens() {
      var cs = getComputedStyle(main), g = function (n) { return cs.getPropertyValue(n).trim(); };
      var cat = {};
      cats.concat(['etc']).forEach(function (c) { cat[c] = g('--cat-' + c); });
      cats.forEach(function (c) { if (!cat[c]) cat[c] = cat.etc || '#7d8ba6'; });
      return {
        cat: cat, edge: g('--graph-edge'), edgeAlpha: parseFloat(g('--graph-edge-alpha')),
        label: g('--graph-label'), labelMuted: g('--graph-label-muted'), labelHalo: g('--graph-label-halo'),
        glowAlpha: parseFloat(g('--graph-glow-alpha')),
        bgCore: g('--graph-bg-core'), bgEdge: g('--graph-bg-edge'), vignette: g('--graph-vignette'),
        dust: g('--graph-dust'), dustAlpha: parseFloat(g('--graph-dust-alpha')),
        blend: g('--graph-filament-blend') || 'source-over', shadow: parseFloat(g('--graph-shadow-alpha')),
        font: g('--font-display'),
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
    var WHITE = [255, 255, 255], BLACK = [0, 0, 0];

    // 노드 구슬: 카테고리마다 한 번 그려 두고 drawImage 로 붙인다 (프레임마다 그라데이션 없음)
    var SR = 56;
    function buildSprites() {
      sprites = {};
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
          b.addColorStop(0, dark ? rgba(mixc(col, WHITE, 0.5), 0.35) : 'rgba(255,255,255,0.32)');
          b.addColorStop(1, 'rgba(255,255,255,0)');
          g.save(); g.beginPath(); g.arc(o, o, SR, 0, TAU); g.clip(); g.fillStyle = b; g.fillRect(0, 0, S, S); g.restore();
          g.lineWidth = dark ? 2.2 : 3; g.strokeStyle = dark ? rgba(mixc(col, WHITE, 0.6), 0.35) : 'rgba(255,255,255,0.85)';
          g.beginPath(); g.arc(o, o, SR - (dark ? 1.2 : 1.6), 0, TAU); g.stroke();
        }
        var hx = o - SR * 0.33, hy = o - SR * 0.4;
        var sp = g.createRadialGradient(hx, hy, 0, hx, hy, SR * 0.36);
        sp.addColorStop(0, 'rgba(255,255,255,' + (dark ? 0.9 : 0.95) + ')');
        sp.addColorStop(0.45, 'rgba(255,255,255,' + (dark ? 0.28 : 0.4) + ')');
        sp.addColorStop(1, 'rgba(255,255,255,0)');
        g.fillStyle = sp; g.beginPath(); g.ellipse(hx, hy, SR * 0.36, SR * 0.28, -0.6, 0, TAU); g.fill();

        // 빛번짐 (dark) 또는 바닥 그림자 (light)
        var HS = 128, ho = HS / 2, halo = mk(HS), h = halo.getContext('2d');
        var hg = h.createRadialGradient(ho, ho, 0, ho, ho, ho);
        if (dark) {
          hg.addColorStop(0, rgba(col, 0.55)); hg.addColorStop(0.22, rgba(col, 0.26));
          hg.addColorStop(0.5, rgba(col, 0.07)); hg.addColorStop(1, rgba(col, 0));
        } else {
          var ink = [24, 34, 72];
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
        lg.addColorStop(0, 'rgba(255,255,255,0)'); lg.addColorStop(0.5, 'rgba(255,255,255,0.9)'); lg.addColorStop(1, 'rgba(255,255,255,0)');
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
      vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, T.vignette);
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
          g.addColorStop(0, 'rgba(0,0,0,0.2)'); g.addColorStop(1, 'rgba(0,0,0,0)');
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
      redraw();
    }

    // 무대 위 크롬 상자 (무대 좌표). 라벨과 성운 이름이 그 밑에 깔리지 않게 피한다. 리사이즈 때만 다시 잰다 (04 9절)
    var CHROME = ['.graph-cmd', '#graph-active-filters', '.graph-trail', '.graph-filters', '.graph-legend', '.graph-tools', '.graph-panel'];
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
      return (chromeCache = out);
    }
    function overlaps(a, q) { return a.x < q.x + q.w && a.x + a.w > q.x && a.y < q.y + q.h && a.y + a.h > q.y; }

    // ── 그리기 ─────────────────────────────────────────────────────────────
    var rafId = 0;
    function redraw() { if (!rafId && W) rafId = requestAnimationFrame(frame); }
    function frame(now) {
      rafId = 0;
      if (revealT0 === null) revealT0 = now;
      var busy = stepMorph(now);
      if (revealT0 >= 0 && now - revealT0 < 1100) busy = true;
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
    function nodeR(n) { return n.r * Math.sqrt(cam.k); }

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

      // 2. 성운 안개
      ctx.globalAlpha = hazeIn;
      ctx.drawImage(haze.img, haze.ox * k + tx, haze.oy * k + ty, haze.img.width / haze.s * k, haze.img.height / haze.s * k);

      // 3. 성운 이름: 줌을 키우면 사라진다 (k 1.2 이하 완전, 1.7 이상 없음)
      var nameA = clamp((1.7 - k) / 0.5) * hazeIn;
      var names = nameA > 0 ? drawNebulaNames(nameA) : [];

      // 4. 엣지: 더하기 합성으로 겹칠수록 밝은 빛 실
      if (edgeIn > 0) {
        ctx.globalCompositeOperation = T.blend;
        ctx.lineWidth = 0.7;
        for (var b = 0; b < bucketKeys.length; b++) {
          var key = bucketKeys[b], list = buckets[key], same = key !== '_x';
          ctx.strokeStyle = same ? T.cat[key] : T.edge;
          ctx.globalAlpha = T.edgeAlpha * (same ? 1.25 : 0.9) * edgeIn;
          ctx.beginPath();
          for (var i = 0; i < list.length; i++) {
            var e = list[i];
            ctx.moveTo(e.s.x * k + tx, e.s.y * k + ty);
            ctx.lineTo(e.t.x * k + tx, e.t.y * k + ty);
          }
          ctx.stroke();
        }
        ctx.globalCompositeOperation = 'source-over';
      }

      // 5. 노드
      drawNodes(now);

      // 6. 라벨
      if (revealT0 < 0 || now - revealT0 >= 600) drawLabels(names);
      ctx.globalAlpha = 1;
    }

    function drawNodes(now) {
      var k = cam.k, tx = cam.x, ty = cam.y, glint = sprites._glint;
      drawnNodes = 0;
      for (var j = N - 1; j >= 0; j--) {
        var n = rank[j];
        var px = n.x * k + tx, py = n.y * k + ty, r = nodeR(n);
        if (px < -60 || py < -60 || px > W + 60 || py > H + 60) continue;
        var a = reveal(n, now);
        if (a <= 0.004) continue;
        drawnNodes++;
        var sp = sprites[n.category];
        var big = n.degree >= 30;
        if (dark) {
          // 빛번짐: 잎은 작게, 허브는 넓게
          ctx.globalCompositeOperation = 'lighter';
          var hr = r * (big ? 3.4 : 2.5);
          ctx.globalAlpha = a * T.glowAlpha * (0.5 + 0.5 * Math.min(1, n.degree / 40));
          ctx.drawImage(sp.halo, px - hr, py - hr, hr * 2, hr * 2);
          ctx.globalCompositeOperation = 'source-over';
        } else if (T.shadow > 0) {
          if (big && sp.aura) { var ar = r * 3; ctx.globalAlpha = a; ctx.drawImage(sp.aura, px - ar, py - ar, ar * 2, ar * 2); }
          var sw = r * 1.5;
          ctx.globalAlpha = a * 0.8;
          ctx.drawImage(sp.halo, px - sw, py - sw * 0.62 + r * 0.42, sw * 2, sw * 1.45);
        }
        ctx.globalAlpha = a;
        var cr = r * (SR + 4) / SR;
        ctx.drawImage(sp.core, px - cr, py - cr, cr * 2, cr * 2);
        if (n.category === 'overviews') {
          ctx.strokeStyle = sp.css; ctx.lineWidth = 1; ctx.globalAlpha = a * 0.8;
          ctx.beginPath(); ctx.arc(px, py, r + 2.6, 0, TAU); ctx.stroke();
        }
        if (dark && n.degree >= 50 && a > 0.3) {
          ctx.globalCompositeOperation = 'lighter';
          var gl = r * 3.6;
          ctx.globalAlpha = a * 0.42;
          ctx.drawImage(glint, px - gl, py - gl, gl * 2, gl * 2);
          ctx.globalCompositeOperation = 'source-over';
        }
      }
      ctx.globalAlpha = 1;
    }

    // 성운 이름: 노드와 크롬과 다른 이름을 피할 자리를 찾고, 없으면 그리지 않는다 (04 5.2)
    function drawNebulaNames(alpha) {
      var key = cam.x + ',' + cam.y + ',' + cam.k + ',' + W + ',' + H;
      if (!namesCache || namesCache.key !== key || morph) namesCache = { key: key, list: placeNames() };
      ctx.textAlign = 'center';
      ctx.textBaseline = 'alphabetic';
      namesCache.list.forEach(function (p) {
        if (p.lead) {
          ctx.globalAlpha = alpha * (dark ? 0.45 : 0.55); ctx.strokeStyle = T.cat[p.id]; ctx.lineWidth = 0.8;
          ctx.beginPath(); ctx.moveTo(p.lead[0], p.lead[1]); ctx.lineTo(p.lead[2], p.lead[3]); ctx.stroke();
        }
        ctx.font = '500 ' + p.size + 'px ' + T.font;
        if ('letterSpacing' in ctx) ctx.letterSpacing = p.ls;
        ctx.globalAlpha = alpha * (dark ? 0.7 : 0.8);
        ctx.fillStyle = T.cat[p.id];
        ctx.fillText(p.name, p.x, p.y);
      });
      if ('letterSpacing' in ctx) ctx.letterSpacing = '0px';
      ctx.textAlign = 'left';
      ctx.globalAlpha = 1;
      return namesCache.list.map(function (p) { return p.box; });
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
    function minDegreeFor(k) { return k < 0.8 ? 50 : k < 1.4 ? 25 : k < 2.2 ? 10 : 0; }
    function drawLabels(names) {
      var k = cam.k, minDeg = minDegreeFor(k), cand = [];
      for (var i = 0; i < N; i++) {
        var n = nodes[i];
        if (n.degree < minDeg) continue;
        var px = sx(n.x), py = sy(n.y);
        if (px < -20 || py < -20 || px > W + 20 || py > H + 20) continue;
        cand.push({ n: n, x: px, y: py });
      }
      cand.sort(function (a, b) { return b.n.degree - a.n.degree; });
      var boxes = chromeRects().concat(names), drawn = 0;
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'left';
      ctx.lineJoin = 'round';
      if ('letterSpacing' in ctx) ctx.letterSpacing = '0.01em';
      for (var c = 0; c < cand.length && drawn < 160; c++) {
        var o = cand[c], m = o.n, strong = m.degree >= 50;
        var size = strong ? 13 : m.degree >= 15 ? 12 : 11;
        ctx.font = (strong ? '700 ' : '500 ') + size + 'px ' + T.font;
        var tw = ctx.measureText(m.label).width, r = nodeR(m);
        // 노드와 고리를 비켜 오른쪽 위에. 오른쪽 끝을 넘으면 왼쪽으로
        var gap = r + (m.category === 'overviews' ? 6 : 4) + 3;
        var lx = o.x + gap * 0.92, ly = o.y - gap * 0.62;
        if (lx + tw > W - 8) lx = o.x - gap * 0.92 - tw;
        if (lx < 8) lx = Math.min(8, W - 8 - tw);
        var box = { x: lx - 2, y: ly - size / 2 - 2, w: tw + 4, h: size + 4 };
        if (boxes.some(function (q) { return overlaps(box, q); })) continue;
        boxes.push(box);
        drawn++;
        ctx.globalAlpha = 1;
        ctx.lineWidth = 3;
        ctx.strokeStyle = T.labelHalo;
        ctx.fillStyle = m.degree >= 15 ? T.label : T.labelMuted;
        ctx.strokeText(m.label, lx, ly);
        ctx.fillText(m.label, lx, ly);
      }
      if ('letterSpacing' in ctx) ctx.letterSpacing = '0px';
    }

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
      var p = W < H * 0.8;
      if (!fitted) {
        setHome(p, false);
        cam = fitTarget(nodes);
        fitted = true;
      } else if (p !== portrait) {
        setHome(p, true);
        cam = fitTarget(nodes);
      } else {
        // 같은 곳을 화면 가운데에 둔다 (다시 맞추지 않는다, 04 7.2)
        cam.x += (W - oldW) / 2;
        cam.y += (H - oldH) / 2;
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
    // 판만 hash 로 정한다. node=, cat= 같은 나머지 문법은 딥링크 항목이 붙인다
    function viewFromHash() {
      var h = location.hash.slice(1);
      if (!h) return 'map';
      if (h === 'list') return 'list';
      var el = document.getElementById(decodeURIComponentSafe(h));
      if (el && listEl.contains(el)) return 'list';
      return null; // #main 같은 목록 밖 앵커는 무시한다
    }
    function decodeURIComponentSafe(s) { try { return decodeURIComponent(s); } catch (e) { return s; } }
    function syncFromHash() {
      var v = viewFromHash();
      if (!v) return;
      if (v === 'map') pushedList = false;
      setView(v);
      if (v === 'list' && location.hash !== '#list') {
        var el = document.getElementById(decodeURIComponentSafe(location.hash.slice(1)));
        if (el) el.scrollIntoView();
      }
    }
    toListBtn.addEventListener('click', function () {
      try { history.pushState(null, '', '#list'); pushedList = true; } catch (e) { /* file:// 등 */ }
      setView('list');
      window.scrollTo(0, 0);
      toMapBtn.focus({ preventScroll: true });
    });
    toMapBtn.addEventListener('click', function () {
      if (pushedList) { history.back(); return; } // popstate 가 지도 판으로 되돌린다
      try { history.replaceState(null, '', location.pathname + location.search); } catch (e) { /* file:// 등 */ }
      setView('map');
      canvas.focus({ preventScroll: true });
    });
    window.addEventListener('popstate', syncFromHash);
    window.addEventListener('hashchange', syncFromHash);

    // ── 시작 ───────────────────────────────────────────────────────────────
    applyTheme();
    GC.onThemeChange(applyTheme);
    GC.onResize(stage, resize, 0);
    if (header && window.ResizeObserver) new ResizeObserver(syncHeader).observe(header);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { namesCache = null; redraw(); });
    if (viewFromHash()) syncFromHash();
    else setView('map');

    // 검증용 읽기 창구 (브라우저 자동 검증과 뒤 항목 테스트가 쓴다)
    window.__graphExplorer = {
      nodes: N, edges: edges.length,
      cam: function () { return { x: cam.x, y: cam.y, k: cam.k }; },
      drawn: function () { return drawnNodes; },
      drawTimes: drawTimes,
      portrait: function () { return portrait; },
      busy: function () { return !!(rafId || morph); },
    };
  }
})();
