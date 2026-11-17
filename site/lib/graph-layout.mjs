// graph-layout.mjs — 그래프 탐색기 성도(조감) 배치를 빌드에서 계산한다 (정본 docs/graph-spec/04-layout-algorithm.md 2절).
//
// layoutGraph(graph, pages) → Map(id → [x, y]) 가로 배치 정수 world 좌표. graph.json 노드 `xy` 가 된다.
//   - 시안 F(docs/graph-mockups/f-atlas-orbit.html) 배치 그대로, collide 반지름만 1.4r + 3.5 (04 2.4절)
//   - 결정성: id 정렬 사본 + 시드 7 LCG 초기 위치 + 360 tick. graph.nodes 순서는 건드리지 않는다
// checkLayout(graph, xy) → { problems, warnings } (04 3.3절 자체 점검). problems 가 비면 통과.
// d3 네 패키지는 정확한 버전으로 고정한다: 2026-11-03 재게시된 3.0.1/3.0.2 계열을 피한다 (05 3절).

import { forceSimulation, forceManyBody, forceLink, forceX, forceY, forceCollide } from 'd3-force';

const ANCHOR = {
  'physical-ai': [-330, 10],
  llms: [-40, -300],
  agents: [300, -90],
  evaluations: [430, -330],
  applications: [210, 270],
  database: [470, 200],
  etc: [-30, 360],
  overviews: null,
};
// physical-ai 하위 오프셋 (첫 태그 기준, 표에 없으면 [0, 0])
const SUB = {
  vla: [0, 0],
  'world-model': [-150, -150],
  manipulation: [-30, 175],
  'robot-learning': [-30, 175],
  'imitation-learning': [-30, 175],
  humanoid: [130, 150],
  slam: [-200, 120],
  'mobile-robot': [-200, 120],
  simulator: [-175, -10],
  benchmark: [120, -170],
  'robot-dataset': [120, -170],
};

const radius = (degree) => Math.min(20, 2 + 1.6 * Math.sqrt(degree));

export function layoutGraph(graph, pages) {
  const nodes = graph.nodes
    .map((n) => ({ id: n.id, category: n.category, degree: n.degree, tags: pages.get(n.id).tags || [] }))
    .sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
  const byId = new Map(nodes.map((n) => [n.id, n]));
  const links = graph.edges.map((e) => ({ source: e.source, target: e.target }));
  const nb = new Map(nodes.map((n) => [n.id, new Set()]));
  for (const e of graph.edges) {
    nb.get(e.source).add(e.target);
    nb.get(e.target).add(e.source);
  }

  for (const n of nodes) {
    let a = ANCHOR[n.category] || null; // 표에 없는 카테고리는 앵커 없음 (checkLayout 이 경고)
    if (a && n.category === 'physical-ai') {
      const o = SUB[n.tags.find((t) => t !== 'physical-ai')] || [0, 0];
      a = [a[0] + o[0], a[1] + o[1]];
    }
    n.ax = a ? a[0] : null;
    n.ay = a ? a[1] : null;
  }

  let seed = 7;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  for (const n of nodes) {
    let cx = n.ax;
    let cy = n.ay;
    if (cx == null) {
      cx = 0;
      cy = 0;
      let c = 0;
      for (const m of nb.get(n.id)) {
        const a = ANCHOR[byId.get(m).category];
        if (a) {
          cx += a[0];
          cy += a[1];
          c++;
        }
      }
      if (c) {
        cx /= c;
        cy /= c;
      }
    }
    const a = rnd() * 2 * Math.PI;
    const d = 20 + rnd() * 90;
    n.x = cx + Math.cos(a) * d;
    n.y = cy + Math.sin(a) * d;
  }

  forceSimulation(nodes)
    .force('charge', forceManyBody().strength((n) => -26 - 3.2 * n.degree).distanceMax(520).theta(0.85))
    .force(
      'link',
      forceLink(links)
        .id((n) => n.id)
        .distance((l) => 26 + 5.5 * Math.sqrt(Math.max(l.source.degree, l.target.degree)))
        .strength((l) => {
          const hi = Math.max(l.source.degree, l.target.degree);
          let s = 0.7 / Math.min(l.source.degree, l.target.degree);
          if (hi >= 30) s *= 0.3;
          if (l.source.category !== l.target.category) s *= 0.35;
          return s;
        })
    )
    .force('x', forceX((n) => n.ax ?? 0).strength((n) => (n.ax == null ? 0 : 0.11)))
    .force('y', forceY((n) => n.ay ?? 0).strength((n) => (n.ay == null ? 0 : 0.11)))
    .force('collide', forceCollide((n) => 1.4 * radius(n.degree) + 3.5).strength(0.9).iterations(2))
    .stop()
    .tick(360);

  return new Map(nodes.map((n) => [n.id, [Math.round(n.x), Math.round(n.y)]]));
}

export function checkLayout(graph, xy) {
  const problems = [];
  const pts = graph.nodes.map((n) => ({ n, p: xy.get(n.id), r: radius(n.degree) }));
  const bad = pts.filter(({ p }) => !p || p.length !== 2 || !p.every(Number.isInteger));
  if (bad.length) problems.push(`xy 가 정수 두 개가 아닌 노드 ${bad.length}개 (예: ${bad[0].n.id})`);
  else {
    let overlap = 0;
    for (let i = 0; i < pts.length; i++)
      for (let j = i + 1; j < pts.length; j++) {
        const a = pts[i];
        const b = pts[j];
        if (Math.hypot(a.p[0] - b.p[0], a.p[1] - b.p[1]) < a.r + b.r) overlap++;
      }
    if (overlap) problems.push(`world 에서 겹친 노드 쌍 ${overlap}개`);
    const xs = pts.map(({ p }) => p[0]);
    const width = Math.max(...xs) - Math.min(...xs);
    if (width < 600 || width > 3000) problems.push(`외곽 가로 ${width} world (600 ~ 3,000 밖)`);
  }
  const unknown = [...new Set(graph.nodes.map((n) => n.category))].filter((c) => !(c in ANCHOR));
  // 앵커 표에 없는 카테고리는 실패가 아니라 경고 (04 2.2절)
  return { problems, warnings: unknown.map((c) => `앵커 표에 없는 카테고리 ${c} (graph-layout.mjs ANCHOR 에 추가)`) };
}
