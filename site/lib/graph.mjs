// graph.mjs — 모든 wiki 페이지 본문의 [[…]] 인접을 파싱해 그래프 모델을 만든다.
//
// 산출 graph.json:
//   { nodes: [{ id, stem, title, category, domain, degree }], edges: [{ source, target }] }
//   - id = "category/stem" (페이지 라우트와 동일)
//   - domain = domains.mjs 의 domainOf(category). 캔버스 렌더러가 노드 색을 고를 때 쓴다.
//     브라우저 스크립트는 번들러 없이 실려 domains.mjs 를 import 할 수 없으므로 매핑을
//     여기서 한 번 풀어 실어 보낸다 — 카테고리 목록이 JS 쪽에 중복되지 않는다.
//   - degree = 무방향 인접(고유 이웃) 수 → 카드의 `↳ N links` 표기에 사용
//   - 홈 히어로 constellation + 그래프 탐색기(/graph/) + 페이지별 neighborhood 가 이 JSON을 소비
//
// 코드펜스/인라인코드 안의 [[…]] 예시는 extractWikiTargets가 제외한다.

import { extractWikiTargets } from './markdown.mjs';
import { domainOf } from './domains.mjs';

export function buildGraph(pages, resolve) {
  const nodes = [];
  for (const page of pages.values()) {
    nodes.push({
      id: page.id,
      stem: page.stem,
      title: page.title,
      category: page.category,
      domain: domainOf(page.category),
      degree: 0,
    });
  }

  const edges = [];
  const seenEdge = new Set(); // "source->target" 중복 제거(방향성)
  const adj = new Map(); // id → Set(이웃 id) — 무방향 degree용
  const unresolved = []; // { from, target }

  const link = (a, b) => {
    if (!adj.has(a)) adj.set(a, new Set());
    if (!adj.has(b)) adj.set(b, new Set());
    adj.get(a).add(b);
    adj.get(b).add(a);
  };

  for (const page of pages.values()) {
    for (const target of extractWikiTargets(page.body)) {
      const r = resolve(target);
      if (!r.ok || !r.id) {
        unresolved.push({ from: page.id, target });
        continue;
      }
      if (r.id === page.id) continue; // 자기참조 무시
      const key = `${page.id}->${r.id}`;
      if (!seenEdge.has(key)) {
        seenEdge.add(key);
        edges.push({ source: page.id, target: r.id });
      }
      link(page.id, r.id);
    }
  }

  const degree = new Map();
  for (const n of nodes) {
    n.degree = adj.get(n.id)?.size || 0;
    degree.set(n.id, n.degree);
  }

  return { nodes, edges, unresolved, degree };
}
