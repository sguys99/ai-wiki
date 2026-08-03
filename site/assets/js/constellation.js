// constellation.js — 홈의 시그니처.
//   (1) 히어로 ambient 그래프: graph.json을 캔버스에 렌더, 노드 drift + 엣지.
//   (2) 카드 neighborhood hover: 카드에 마우스를 올리면 연결된 카드를 하이라이트.
//
// 색은 도메인당 signal 하나 — core는 aqua, physical은 amber. 토큰 읽기·캔버스 fit·
// 인접 계산 같은 공통 부품은 graph-core.js(window.GraphCore)가 갖고 있고 /graph/ 탐색기와
// 공유한다. CSS 토큰을 런타임에 읽으므로 light/dark 모두 따라간다.
// 노드 도메인은 graph.json 의 domain 필드다 — 카테고리 목록을 여기 적어 두지 않는다.
// prefers-reduced-motion 시 정지 프레임 1장만 그린다.

(function () {
  'use strict';
  var GC = window.GraphCore;
  var reduce = GC ? GC.reduceMotion() : false;

  // ── (1) 히어로 constellation ───────────────────────────────────────────────
  function initHero(canvas) {
    var url = canvas.dataset.graph;
    if (!url) return;
    GC.fetchGraph(url)
      .then(function (graph) {
        runHero(canvas, graph);
      })
      .catch(function () {
        /* graph.json 미가용 — 히어로 그래프 생략 (치명적 아님) */
      });
  }

  function runHero(canvas, graph) {
    var ctx = canvas.getContext('2d');
    var nodes = graph.nodes || [];
    var edges = graph.edges || [];
    var index = {};
    nodes.forEach(function (n, i) {
      index[n.id] = i;
    });

    var W = 0,
      H = 0;
    var maxDeg = 1;
    nodes.forEach(function (n) {
      if (n.degree > maxDeg) maxDeg = n.degree;
    });

    // 결정적 시드 배치(reload 안정) — 노드별 위치/위상.
    var P = nodes.map(function (n, i) {
      var a = (i * 2.39996323) % (Math.PI * 2); // golden-angle 분산
      var rad = 0.18 + 0.78 * ((i * 97) % 100) / 100;
      return {
        bx: 0.5 + Math.cos(a) * 0.42 * rad,
        by: 0.5 + Math.sin(a) * 0.42 * rad,
        ph: (i * 1.7) % (Math.PI * 2),
        sp: 0.6 + (((i * 53) % 100) / 100) * 0.8,
        r: 1.2 + 2.6 * (n.degree / maxDeg),
        phys: GC.isPhysical(n),
      };
    });

    function resize() {
      var size = GC.fitCanvas(canvas, ctx);
      W = size.w;
      H = size.h;
    }

    function pos(p, t) {
      // bounded ambient drift
      var dx = Math.cos(t * 0.00018 * p.sp + p.ph) * 14;
      var dy = Math.sin(t * 0.00021 * p.sp + p.ph * 1.3) * 14;
      return { x: p.bx * W + dx, y: p.by * H + dy };
    }

    function draw(t) {
      var pal = GC.palette();
      ctx.clearRect(0, 0, W, H);

      // 엣지
      ctx.lineWidth = 1;
      ctx.strokeStyle = pal.signalDim;
      for (var e = 0; e < edges.length; e++) {
        var si = index[edges[e].source];
        var ti = index[edges[e].target];
        if (si == null || ti == null) continue;
        var a = pos(P[si], t);
        var b = pos(P[ti], t);
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
      // 노드 — core는 허브만 aqua, 나머지는 faint. physical은 도메인이 눈에 띄어야
      // 하므로 항상 amber로 칠하고 허브가 아닌 노드만 알파로 낮춘다.
      for (var i = 0; i < P.length; i++) {
        var pt = pos(P[i], t);
        var hub = P[i].r > 2.6;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, P[i].r, 0, Math.PI * 2);
        ctx.globalAlpha = P[i].phys && !hub ? 0.55 : 1;
        ctx.fillStyle = P[i].phys ? pal.physical : hub ? pal.signal : pal.faint;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    resize();
    GC.onResize(canvas, function () {
      resize();
      if (reduce) draw(0);
    });

    if (reduce) {
      // 정지 프레임 1장 — 애니메이션 경로와 달리 테마가 바뀌면 직접 다시 그려야 한다.
      draw(0);
      GC.onThemeChange(function () {
        draw(0);
      });
      return;
    }
    var start = performance.now();
    (function loop(now) {
      draw(now - start);
      requestAnimationFrame(loop);
    })(start);
  }

  // ── (2) 카드 neighborhood hover ────────────────────────────────────────────
  function initCards() {
    var cards = document.querySelectorAll('.card[data-id]');
    if (!cards.length) return;
    var byId = {};
    cards.forEach(function (c) {
      byId[c.dataset.id] = c;
    });
    var grid = document.querySelector('.card-grid');
    cards.forEach(function (c) {
      c.addEventListener('mouseenter', function () {
        document.body.classList.add('cards-focusing');
        c.classList.add('is-source');
        (c.dataset.links || '')
          .split(/\s+/)
          .filter(Boolean)
          .forEach(function (id) {
            if (byId[id]) byId[id].classList.add('is-linked');
          });
      });
      c.addEventListener('mouseleave', function () {
        document.body.classList.remove('cards-focusing');
        cards.forEach(function (x) {
          x.classList.remove('is-source', 'is-linked');
        });
      });
    });
    void grid;
  }

  function init() {
    var canvas = document.querySelector('.hero-constellation');
    if (canvas && GC) initHero(canvas);
    initCards();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
