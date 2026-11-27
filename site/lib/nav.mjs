// nav.mjs — 내비게이션 보조: 같은 카테고리 내 이전/다음 (build.mjs 가 위키 페이지 하단에 쓴다).
// 관련 페이지 이웃은 build.mjs 가 buildGraph 엣지로 직접 만든다.

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
