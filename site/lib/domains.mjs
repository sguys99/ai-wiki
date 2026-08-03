// domains.mjs — 카테고리 → 도메인 매핑 단일 소스.
//
// 저장소가 성격이 다른 두 영역을 담는다. LLM 소프트웨어 쪽(core)과 물리 세계와
// 상호작용하는 쪽(physical)이다. 사이트는 이 구분을 강조색으로만 드러낸다 —
// core는 아쿠아, physical은 앰버. 실제 색은 styles.css의 `[data-domain]` 토큰
// 오버라이드가 담당하고 여기서는 어느 카테고리가 어느 도메인인지만 정한다.
//
// 새 카테고리가 생기면 이 맵에 한 줄 추가한다. 등록하지 않은 카테고리는 'core'다.

export const DOMAINS = ['core', 'physical'];

export const CATEGORY_DOMAIN = {
  database: 'core',
  llms: 'core',
  agents: 'core',
  evaluations: 'core',
  applications: 'core',
  etc: 'core',
  overviews: 'core',
  'physical-ai': 'physical',
};

export const DEFAULT_DOMAIN = 'core';

// category(slug) → domain. 미등록·빈 값은 'core'.
export function domainOf(category) {
  if (!category) return DEFAULT_DOMAIN;
  return CATEGORY_DOMAIN[String(category)] || DEFAULT_DOMAIN;
}
