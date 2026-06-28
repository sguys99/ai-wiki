// nav.mjs — 내비게이션 보조: 같은 카테고리 내 이전/다음, 페이지별 neighborhood.
// Phase 4·5(위키 페이지·관련 그래프)에서 소비한다. Phase 1에서는 모델만 제공.

// 카탈로그(index.md) 순서 기준 같은 카테고리 내 이전/다음 페이지.
export function prevNext(section, id) {
  const arr = section?.pages || [];
  const i = arr.findIndex((p) => p.id === id);
  if (i < 0) return { prev: null, next: null };
  return {
    prev: i > 0 ? arr[i - 1] : null,
    next: i < arr.length - 1 ? arr[i + 1] : null,
  };
}

// 그래프에서 한 페이지의 직접 이웃(무방향) 노드 목록 — 관련 페이지 그래프/목록용.
export function neighborhood(graph, id) {
  const seen = new Set();
  for (const e of graph.edges) {
    if (e.source === id) seen.add(e.target);
    else if (e.target === id) seen.add(e.source);
  }
  return graph.nodes.filter((n) => seen.has(n.id));
}
