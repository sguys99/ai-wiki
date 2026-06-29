// 환경 분기: 로컬 미리보기는 base path 없음(''), GitHub Pages 프로젝트 페이지는 '/ai-wiki'.
// 배포 빌드는 `BASE=/ai-wiki` 환경변수로 트리거한다 (package.json build:deploy / Actions).
//
// 사용 규칙:
//   - 모든 내부 링크/에셋/폰트/graph.json/Pagefind 경로 앞에 BASE를 붙인다.
//   - 절대 trailing slash 를 포함하지 않는다 (`/ai-wiki`, '' 둘 다 뒤에 `/...` 를 이어붙임).
const raw = process.env.BASE ?? '';
// 정규화: 빈 문자열이거나 '/'로 시작하고 trailing slash 제거.
export const BASE = raw === '' ? '' : '/' + raw.replace(/^\/+|\/+$/g, '');

// 경로 헬퍼: BASE + 정규화된 절대 경로. href('/agents/x/') → '/ai-wiki/agents/x/'
export function href(path = '/') {
  const p = path.startsWith('/') ? path : '/' + path;
  return BASE + p;
}

// 배포 origin (BASE 제외). OG/canonical 의 절대 URL 생성에만 쓴다.
export const ORIGIN = 'https://sguys99.github.io';

// 절대 URL: ORIGIN + href(path). og:url / og:image / canonical 용.
// 로컬 빌드(BASE='')에서도 배포 기준 절대경로를 만든다(OG는 배포 환경에서만 의미).
export function absUrl(path = '/') {
  return ORIGIN + href(path);
}

// 배포 메타
export const SITE = {
  repo: 'sguys99/ai-wiki',
  owner: 'sguys99',
  url: 'https://sguys99.github.io/ai-wiki/',
  title: 'ai-wiki',
  description: 'AI 관련 기술자료를 저장·관리하는 개인 지식 베이스 (Karpathy LLM Wiki 패턴)',
  lang: 'ko',
};
