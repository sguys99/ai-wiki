// graph.mjs — 모든 wiki 페이지 본문의 [[…]] 인접을 파싱해 그래프 모델을 만든다.
//
// buildGraph() 반환값(메모리): { nodes, edges: [{ source, target }], unresolved, degree }
//   빌드 안의 인접 맵, 통계, nav.mjs 가 edges 객체 배열을 그대로 쓴다.
//
// 산출 graph.json (version 2, 정본 docs/graph-spec/03-schema.md), toGraphJson() 이 만든다:
//   { version: 2, recentSince, recentMode, recentDays,
//     nodes: [{ id, stem, title, category, domain, degree, year, type, tags, added, xy }],
//     links: [s0, t0, s1, t1, …] }
//   - id = "category/stem" (페이지 라우트와 동일)
//   - domain = domains.mjs 의 domainOf(category). 브라우저 스크립트는 번들러 없이 실려
//     domains.mjs 를 import 할 수 없으므로 매핑을 여기서 한 번 풀어 실어 보낸다.
//   - degree = 무방향 인접(고유 이웃) 수
//   - year 정수|null, type 문자열|null, tags frontmatter 순서 그대로, added "YYYY-MM-DD" (git 최초 추가일)
//   - xy = 가로 배치 정수 좌표 [x, y]. 배치(graph-layout.mjs)가 주어질 때만 싣는다
//   - links = 방향 엣지를 nodes 배열 인덱스 쌍으로 이어 붙인 평면 배열 (buildGraph 엣지 순서)
//   - recentSince = 최근 집합 경계 날짜 (브라우저는 node.added >= recentSince), recentInfo() 참고
//   - 소비자: 홈 히어로 constellation + graph-core.js, 그래프 탐색기(/graph/)
//
// 코드펜스/인라인코드 안의 [[…]] 예시는 extractWikiTargets가 제외한다.

import { extractWikiTargets } from './markdown.mjs';
import { domainOf } from './domains.mjs';
import { RECENT_COUNT, RECENT_DAYS } from './config.mjs';

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

// 최근 집합 (03 3.4절). page.isNew 는 content.mjs 가 홈 NEW 뱃지와 같은 기준으로 매긴다.
// 반환 { recentSince, recentMode, recentDays, count } (count 는 날짜 비교로 판정되는 노드 수, 로그용).
export function recentInfo(pages) {
  const all = [...pages.values()].sort((a, b) => Date.parse(b.added) - Date.parse(a.added));
  const inDays = all.filter((p) => p.isNew);
  const recentMode = inDays.length >= RECENT_COUNT ? 'days' : 'count';
  const edge = recentMode === 'days' ? inDays[inDays.length - 1] : all[Math.min(RECENT_COUNT, all.length) - 1];
  let recentSince = edge ? edge.added.slice(0, 10) : null;
  const count = recentSince ? all.filter((p) => p.added.slice(0, 10) >= recentSince).length : 0;
  if (count > all.length / 2) recentSince = null; // git 이력 없는 빌드 가드 (06 9.1절)
  return { recentSince, recentMode, recentDays: RECENT_DAYS, count };
}

// graph.json 객체 (03 3절). 필드 순서가 곧 직렬화 순서다. layout 은 Map(id → [x, y]) 또는 생략.
export function toGraphJson(graph, pages, layout, recent) {
  const index = new Map(graph.nodes.map((n, i) => [n.id, i]));
  const nodes = graph.nodes.map((n) => {
    const p = pages.get(n.id);
    const year = Number.parseInt(p.year, 10);
    const node = {
      ...n,
      year: Number.isNaN(year) ? null : year,
      type: p.type,
      tags: p.tags,
      added: p.added.slice(0, 10),
    };
    if (layout) node.xy = layout.get(n.id);
    return node;
  });
  const links = [];
  for (const e of graph.edges) links.push(index.get(e.source), index.get(e.target));
  const { recentSince, recentMode, recentDays } = recent;
  return { version: 2, recentSince, recentMode, recentDays, nodes, links };
}
