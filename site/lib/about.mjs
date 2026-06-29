// about.mjs — About 페이지 본문(한글 markdown).
//
// 내용은 저장소의 README.md / CLAUDE.md 에서 추출한 프로젝트 철학·THE FOUR RULES·
// 3-tier 파이프라인을 요약·정리한 것이다 (Rule #1 위반 아님 — 로컬 문서 읽기).
// build.mjs 가 이 문자열을 renderMarkdown 으로 렌더해 about() 템플릿에 넘긴다.
//
// 본문 안의 [[category]] 위키링크는 resolver 가 홈의 카테고리 밴드 앵커로 해석한다.

export const ABOUT_INTRO =
  'AI 관련 기술자료(papers · repos · articles · reports · videos · books · lectures)를 ' +
  '구조화해 검색 가능한 지식 베이스로 관리하는 방법론. ' +
  'Karpathy의 LLM Wiki 패턴을 다중 자료 유형으로 확장했다.';

export function aboutMarkdown(hrefFn) {
  const home = hrefFn ? hrefFn('/') : '/';
  return `이 사이트는 **개인 AI 지식 베이스**를 웹·모바일에서 읽기 위한 정적 뷰다.
원본 콘텐츠(\`wiki/\`, \`sources/\`, \`raw/\`, \`index.md\`)는 단일 소스로 유지되는 **읽기 전용** 자료이고,
이 페이지들은 그것을 빌드 시점에 그대로 읽어 렌더한 결과물이다.

매일 새 모델·프레임워크·논문이 쏟아지는 와중에, *복리로 쌓이는* 지식 베이스를 만드는 것이 목표다.
자료가 쌓일수록 기존 자료와 \`[[wikilinks]]\` · overview 페이지로 엮이며 가치가 누적된다.

## The Four Rules — 시스템의 심장

이 wiki가 존재하는 이유는 단 하나, **환각(hallucination)을 막고 모든 답변이 실제 보유 자료에
근거하도록 강제하는 것**이다. 이 네 규칙이 없으면 wiki는 잘 차려입은 웹 검색기에 지나지 않는다.

1. **웹 검색 금지.** 빈틈을 \`WebSearch\`·\`WebFetch\`로 메우지 않는다. 이 wiki의 존재 이유는
   모든 답변이 우리가 실제로 보유한 자료에 근거한다는 점이다.
2. **wiki를 먼저 본다.** \`sources/\`와 \`wiki/\`만이 진실의 원천(source of truth)이다.
3. **wiki가 부족하면 \`raw/\`의 원본을 다시 읽는다.** 세부를 더 뽑아낸 뒤 wiki를 갱신한다.
4. **자료가 없으면 없다고 말한다.** *"해당 주제에 대한 자료가 없습니다 — 원본 자료(PDF · URL ·
   transcript 등)를 제공해 주세요"*라고 답한다. 임의로 메우지 않는다.

overview 페이지를 포함해 **모든** 응답에 적용된다 — wiki에 있는 자료만 인용한다.

## 3-tier 파이프라인

자료 하나는 세 단계를 거쳐 정제된다. 세 계층은 **같은 stem**을 공유한다.

\`\`\`
원본 자료 (raw/{papers|repos|articles|reports|videos|books|lectures}/)
    ↓ 텍스트 + 이미지(도식) 추출
sources/{stem}.md         (한글 표준 섹션 — 도식이 있으면 "그림 후보"까지)
    ↓ 정제 + 교차참조 + 큐레이션 figure 임베드
wiki/{category}/{stem}.md (한글, [[wikilinks]], ![[assets/...]])
    ↓ 합성
wiki/overviews/{topic}.md ← 지식이 복리로 쌓이는 곳
\`\`\`

1. **raw/** — 원본(immutable archive). PDF · 레포 스냅샷 · article 본문 · transcript · 도서 ·
   강의 패키지. 항상 복사(\`cp\`)하며 symlink 하지 않는다.
2. **sources/** — LLM이 생성한 구조화 요약. 본문은 한글, 도식 후보는 텍스트 메타로만 기록한다.
3. **wiki/** — 교차 참조(\`[[wikilinks]]\`)와 큐레이션 도식(\`![[assets/...]]\`)을 갖춘 정제 페이지.

진짜 복리가 일어나는 곳은 여러 자료를 묶는 **overview 페이지**다.

## 분류 (Categories)

\`raw/\`의 하위 폴더(자료 유형, \`type\`)와 \`wiki/\`의 하위 폴더(분류, \`category\`)는 **서로 독립적**이다.
같은 카테고리 안에 paper · repo · article이 섞여 들어갈 수 있다.
분류 기준은 주제가 아니라 **방법(method)** 이다 — *"미래의 내가 어느 카테고리에서 찾아야 더 유용할까?"*
가 판단의 잣대다.

현재 카테고리: [[database]] · [[llms]] · [[agents]] · [[evaluations]] · [[applications]] ·
[[etc]] · [[overviews]]. [홈으로 돌아가면](${home}) 카테고리별 카드 그리드를 볼 수 있다.

## 둘러보기 (Browsing)

- **이 사이트**: 전체 검색(\`Ctrl/⌘ K\`), 라이트/다크 토글, 위키 페이지의 목차·관련 페이지 그래프.
- **Obsidian**: \`wiki/\` 폴더를 Vault로 열면 \`[[wikilinks]]\` · graph view · full-text 검색을 그대로 쓸 수 있다.

더 자세한 운영 규칙과 자료 추가 워크플로는 저장소의 \`README.md\`와 \`CLAUDE.md\`에 있다.`;
}
