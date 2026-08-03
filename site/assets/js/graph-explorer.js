// graph-explorer.js — /graph/ 의 전체 지식 그래프 뷰 (홈 히어로와 graph-core.js 를 공유).
//
//   (1) graph.json 을 받아 힘기반(force) 배치를 한 번 계산하고 캔버스에 정지 화면으로 그린다.
//   (2) 노드 색은 도메인 토큰, 크기는 degree.
//   (3) 호버(또는 터치 선택)하면 그 노드와 직접 이웃만 남기고 나머지를 죽인다.
//   (4) 노드를 누르면 해당 위키 페이지로 이동한다.
//   (5) 카테고리 칩으로 걸러내고 상태를 location.hash 에 남긴다(filter.js 와 같은 방식).
//
// 캔버스는 키보드·스크린리더로 읽히지 않으므로 같은 내용의 카테고리별 링크 목록이
// 서버 렌더로 항상 함께 나간다. 이 스크립트는 그 목록을 필터에 맞춰 접었다 펼 뿐이다.
//
// 배치는 로드 시 한 번만 돌고 결과는 단위 좌표([0,1])로 남는다. 리사이즈는 픽셀 매핑만
// 다시 하고, 호버는 미리 만든 인접 리스트를 읽는다 — 상호작용 중 재계산이 없다.

(function () {
  'use strict';

  var GC = window.GraphCore;
  var root = document.querySelector('.graph-page');
  if (!GC || !root) return;

  var explorer = root.querySelector('.graph-explorer');
  var canvas = root.querySelector('.graph-canvas');
  var statusEl = root.querySelector('.graph-status');
  var chips = Array.prototype.slice.call(root.querySelectorAll('.filter-chip'));
  var groups = Array.prototype.slice.call(root.querySelectorAll('.graph-group'));
  if (!canvas) return;

  var STATUS_DEFAULT = statusEl ? statusEl.textContent : '';
  var BASE = canvas.dataset.base || '/';

  // 카테고리 slug → 표기. 칩이 이미 갖고 있는 값을 재사용한다(별도 데이터 전송 없음).
  var catLabel = {};
  chips.forEach(function (chip) {
    var slug = chip.getAttribute('data-filter');
    if (slug && slug !== 'all') catLabel[slug] = chip.getAttribute('data-label') || slug;
  });

  GC.fetchGraph(canvas.dataset.graph)
    .then(function (graph) {
      run(graph);
    })
    .catch(function () {
      // 캔버스는 열지 않는다 — 빈 상자 대신 아래 카테고리별 목록만 남는다.
    });

  // ── 배치 (Fruchterman-Reingold) ──────────────────────────────────────────────
  //
  // 초기 위치는 골든앵글 나선이라 결정적이다 — 새로고침해도 같은 그림이 나온다.
  // 반발은 모든 쌍(121개 → 7,260쌍), 인력은 엣지, 중심 중력이 고립 노드를 잡아 준다.
  function layout(nodes, es, et) {
    var N = nodes.length;
    var x = new Float64Array(N);
    var y = new Float64Array(N);
    var i, j;

    for (i = 0; i < N; i++) {
      var a = i * 2.39996323; // golden angle
      var rad = Math.sqrt((i + 0.5) / N);
      x[i] = Math.cos(a) * rad;
      y[i] = Math.sin(a) * rad;
    }
    if (N < 2) return { x: x, y: y };

    var dx = new Float64Array(N);
    var dy = new Float64Array(N);
    var k = 0.72 * Math.sqrt(4 / N); // 이상 간격 — 폭 2짜리 정사각에 N개를 깔았을 때
    var k2 = k * k;
    var ITER = 300;
    var TEMP = 0.16; // 한 스텝 최대 이동량 (선형 냉각)
    var GRAV = 2.0; // 중심 중력 — 고립 노드가 날아가지 않을 정도만

    for (var it = 0; it < ITER; it++) {
      var temp = TEMP * (1 - it / ITER);
      dx.fill(0);
      dy.fill(0);

      for (i = 0; i < N; i++) {
        for (j = i + 1; j < N; j++) {
          var rx = x[i] - x[j];
          var ry = y[i] - y[j];
          var d2 = rx * rx + ry * ry;
          if (d2 < 1e-9) {
            // 완전히 겹친 쌍 — 인덱스로 만든 결정적 미세 오프셋으로 떼어 놓는다.
            rx = ((i % 7) - 3) * 1e-4 + 1e-5;
            ry = ((j % 5) - 2) * 1e-4 + 1e-5;
            d2 = rx * rx + ry * ry;
          }
          var d = Math.sqrt(d2);
          var f = k2 / d / d; // (k²/d) 를 단위벡터 대신 원벡터에 곱하려 d 로 한 번 더 나눔
          dx[i] += rx * f;
          dy[i] += ry * f;
          dx[j] -= rx * f;
          dy[j] -= ry * f;
        }
      }

      for (var e = 0; e < es.length; e++) {
        var s = es[e];
        var t = et[e];
        var ex = x[t] - x[s];
        var ey = y[t] - y[s];
        var ed = Math.sqrt(ex * ex + ey * ey);
        if (ed < 1e-9) continue;
        var af = ed / k; // (d²/k) / d
        dx[s] += ex * af;
        dy[s] += ey * af;
        dx[t] -= ex * af;
        dy[t] -= ey * af;
      }

      for (i = 0; i < N; i++) {
        dx[i] -= x[i] * GRAV;
        dy[i] -= y[i] * GRAV;
        var len = Math.sqrt(dx[i] * dx[i] + dy[i] * dy[i]);
        if (len < 1e-12) continue;
        var step = Math.min(len, temp) / len;
        x[i] += dx[i] * step;
        y[i] += dy[i] * step;
      }
    }

    // 축별로 [0,1] 정규화. 캔버스가 가로로 길면 그만큼 늘어나지만, 배치가 거의 원형이라
    // 균등 축척으로 가운데만 쓰는 것보다 화면을 잘 쓴다.
    normalize(x);
    normalize(y);
    return { x: x, y: y };
  }

  function normalize(arr) {
    var min = Infinity;
    var max = -Infinity;
    var i;
    for (i = 0; i < arr.length; i++) {
      if (arr[i] < min) min = arr[i];
      if (arr[i] > max) max = arr[i];
    }
    var span = max - min;
    if (!(span > 1e-9)) {
      for (i = 0; i < arr.length; i++) arr[i] = 0.5;
      return;
    }
    for (i = 0; i < arr.length; i++) arr[i] = (arr[i] - min) / span;
  }

  // ── 본체 ────────────────────────────────────────────────────────────────────
  function run(graph) {
    var nodes = graph.nodes || [];
    var edges = graph.edges || [];
    var N = nodes.length;
    if (!N) return;

    // 크기를 재기 전에 열어야 getBoundingClientRect 가 0 이 아니다.
    if (explorer) explorer.hidden = false;

    var ctx = canvas.getContext('2d');
    var adj = GC.buildAdjacency(nodes, edges);
    var index = adj.index;
    var neighbors = adj.neighbors;

    // 엣지를 인덱스 쌍으로 펴 둔다(그릴 때마다 id 조회하지 않도록).
    var es = [];
    var et = [];
    for (var i = 0; i < edges.length; i++) {
      var s = index[edges[i].source];
      var t = index[edges[i].target];
      if (s == null || t == null || s === t) continue;
      es.push(s);
      et.push(t);
    }

    var pos = layout(nodes, es, et);
    var maxDeg = 1;
    nodes.forEach(function (n) {
      if (n.degree > maxDeg) maxDeg = n.degree;
    });

    var W = 0;
    var H = 0;
    var PAD = 26;
    var px = new Float64Array(N);
    var py = new Float64Array(N);
    var pr = new Float64Array(N);
    // 호버 이웃 플래그 — 호버마다 새로 만들지 않고 채워 쓴다.
    var nbFlag = new Uint8Array(N);

    var focus = -1; // 호버 또는 터치 선택된 노드
    var selected = -1; // 터치에서만 쓰는 고정 선택
    var filter = 'all';
    var pending = false;

    var fine =
      !window.matchMedia || window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    function project() {
      var size = GC.fitCanvas(canvas, ctx);
      W = size.w;
      H = size.h;
      var rScale = Math.max(0.72, Math.min(1, W / 760));
      var innerW = Math.max(1, W - PAD * 2);
      var innerH = Math.max(1, H - PAD * 2);
      for (var i = 0; i < N; i++) {
        px[i] = PAD + pos.x[i] * innerW;
        py[i] = PAD + pos.y[i] * innerH;
        pr[i] = (3 + 6 * Math.sqrt((nodes[i].degree || 0) / maxDeg)) * rScale;
      }
    }

    function isOn(i) {
      return filter === 'all' || nodes[i].category === filter;
    }

    function requestDraw() {
      if (pending) return;
      pending = true;
      requestAnimationFrame(function () {
        pending = false;
        draw();
      });
    }

    function draw() {
      var pal = GC.palette();
      ctx.clearRect(0, 0, W, H);

      var hasFocus = focus >= 0;
      if (hasFocus) {
        nbFlag.fill(0);
        var nb = neighbors[focus];
        for (var n = 0; n < nb.length; n++) nbFlag[nb[n]] = 1;
      }

      // 배경 엣지 — 한 path 로 모아 한 번만 stroke.
      ctx.lineWidth = 1;
      ctx.strokeStyle = pal.signalDim;
      ctx.globalAlpha = hasFocus ? 0.07 : 0.3;
      ctx.beginPath();
      var e;
      for (e = 0; e < es.length; e++) {
        if (hasFocus && (es[e] === focus || et[e] === focus)) continue;
        if (!isOn(es[e]) || !isOn(et[e])) continue;
        ctx.moveTo(px[es[e]], py[es[e]]);
        ctx.lineTo(px[et[e]], py[et[e]]);
      }
      ctx.stroke();

      // 포커스 노드에 붙은 엣지.
      if (hasFocus) {
        ctx.strokeStyle = GC.nodeColor(nodes[focus], pal);
        ctx.globalAlpha = 0.75;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        for (e = 0; e < es.length; e++) {
          if (es[e] !== focus && et[e] !== focus) continue;
          ctx.moveTo(px[es[e]], py[es[e]]);
          ctx.lineTo(px[et[e]], py[et[e]]);
        }
        ctx.stroke();
      }

      // 노드.
      for (var i = 0; i < N; i++) {
        var on = isOn(i);
        var lit = !hasFocus || i === focus || nbFlag[i] === 1;
        ctx.globalAlpha = on ? (lit ? 1 : 0.18) : 0.1;
        ctx.fillStyle = on ? GC.nodeColor(nodes[i], pal) : pal.faint;
        ctx.beginPath();
        ctx.arc(px[i], py[i], pr[i], 0, Math.PI * 2);
        ctx.fill();
        if (i === focus) {
          ctx.globalAlpha = 1;
          ctx.lineWidth = 2;
          ctx.strokeStyle = pal.text;
          ctx.beginPath();
          ctx.arc(px[i], py[i], pr[i] + 3.5, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;

      if (hasFocus) drawLabel(pal, focus);
    }

    // 포커스 노드 제목을 캔버스 안에 띄운다. 같은 정보가 아래 상태줄에도 텍스트로 나간다.
    function drawLabel(pal, i) {
      var text = nodes[i].title || nodes[i].id;
      ctx.font = '12px "JetBrains Mono", ui-monospace, monospace';
      var w = Math.min(ctx.measureText(text).width, W - 24) + 16;
      var h = 22;
      var lx = Math.max(8, Math.min(px[i] - w / 2, W - w - 8));
      var ly = py[i] - pr[i] - h - 8;
      if (ly < 4) ly = py[i] + pr[i] + 8;
      ctx.globalAlpha = 0.96;
      ctx.fillStyle = pal.surface;
      ctx.beginPath();
      ctx.rect(lx, ly, w, h);
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.strokeStyle = GC.nodeColor(nodes[i], pal);
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.fillStyle = pal.text;
      ctx.textBaseline = 'middle';
      ctx.save();
      ctx.beginPath();
      ctx.rect(lx + 4, ly, w - 8, h);
      ctx.clip();
      ctx.fillText(text, lx + 8, ly + h / 2 + 0.5);
      ctx.restore();
    }

    // ── 상태줄 ─────────────────────────────────────────────────────────────────
    function urlOf(i) {
      return BASE + nodes[i].id + '/';
    }

    function setStatus(i) {
      if (!statusEl) return;
      if (i < 0) {
        statusEl.textContent = STATUS_DEFAULT;
        return;
      }
      var node = nodes[i];
      var link = document.createElement('a');
      link.className = 'graph-status-link';
      link.href = urlOf(i);
      link.textContent = node.title || node.id;
      var meta = document.createElement('span');
      meta.className = 'graph-status-meta';
      meta.textContent =
        (catLabel[node.category] || node.category) + ' · ↳ ' + (node.degree || 0);
      statusEl.textContent = '';
      statusEl.appendChild(link);
      statusEl.appendChild(meta);
    }

    // ── 히트 테스트 ────────────────────────────────────────────────────────────
    function hit(cx, cy) {
      var best = -1;
      var bestD = Infinity;
      for (var i = 0; i < N; i++) {
        if (!isOn(i)) continue;
        var dx = px[i] - cx;
        var dy = py[i] - cy;
        var d2 = dx * dx + dy * dy;
        var reach = Math.max(pr[i] + 5, fine ? 9 : 15);
        if (d2 <= reach * reach && d2 < bestD) {
          bestD = d2;
          best = i;
        }
      }
      return best;
    }

    function pointAt(ev) {
      var rect = canvas.getBoundingClientRect();
      return { x: ev.clientX - rect.left, y: ev.clientY - rect.top };
    }

    function setFocus(i) {
      if (focus === i) return;
      focus = i;
      canvas.style.cursor = i >= 0 ? 'pointer' : '';
      setStatus(i);
      requestDraw();
    }

    canvas.addEventListener('pointermove', function (ev) {
      if (ev.pointerType === 'touch') return; // 터치는 탭으로만 다룬다
      var p = pointAt(ev);
      setFocus(hit(p.x, p.y));
    });

    canvas.addEventListener('pointerleave', function () {
      setFocus(selected);
    });

    canvas.addEventListener('click', function (ev) {
      var p = pointAt(ev);
      var i = hit(p.x, p.y);
      if (i < 0) {
        selected = -1;
        setFocus(-1);
        return;
      }
      // 마우스는 한 번 클릭으로 이동. 터치는 한 번 탭으로 고르고(상태줄에 링크가 뜬다)
      // 같은 노드를 다시 탭하면 이동한다.
      if (fine || selected === i) {
        location.href = urlOf(i);
        return;
      }
      selected = i;
      setFocus(i);
    });

    // ── 카테고리 필터 (filter.js 와 같은 해시 동기화) ────────────────────────────
    var slugs = {};
    groups.forEach(function (g) {
      slugs[g.getAttribute('data-category')] = true;
    });

    function apply(active) {
      if (active !== 'all' && !slugs[active]) active = 'all';
      filter = active;
      selected = -1;
      focus = -1;
      canvas.style.cursor = '';
      if (statusEl) statusEl.textContent = STATUS_DEFAULT;

      chips.forEach(function (chip) {
        var on = chip.getAttribute('data-filter') === active;
        chip.classList.toggle('is-active', on);
        chip.setAttribute('aria-pressed', String(on));
      });
      groups.forEach(function (g) {
        g.hidden = !(active === 'all' || g.getAttribute('data-category') === active);
      });
      requestDraw();
      return active;
    }

    function slugFromHash() {
      var h = (location.hash || '').replace(/^#/, '');
      return slugs[h] ? h : 'all';
    }

    chips.forEach(function (chip) {
      chip.addEventListener('click', function (ev) {
        ev.preventDefault();
        var active = apply(chip.getAttribute('data-filter'));
        try {
          if (active === 'all') {
            history.replaceState(null, '', location.pathname + location.search);
          } else {
            history.replaceState(null, '', '#' + active);
          }
        } catch (err) {
          /* file:// 등 replaceState 불가 환경 — 무시 */
        }
      });
    });

    window.addEventListener('hashchange', function () {
      apply(slugFromHash());
    });

    // ── 기동 ───────────────────────────────────────────────────────────────────
    project();
    apply(slugFromHash());
    GC.onResize(canvas, function () {
      project();
      requestDraw();
    });
    GC.onThemeChange(requestDraw);
  }
})();
