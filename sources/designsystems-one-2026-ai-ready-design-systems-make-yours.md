---
title: "AI-ready design systems: make yours readable to Cursor, Claude, and v0"
type: article
year: 2026
category: etc
raw_path: raw/articles/designsystems-one-2026-ai-ready-design-systems-make-yours.md
raw_filename: "designsystems-one-2026-ai-ready-design-systems-make-yours.md"
source_collection: external
author: "Kiryl Zhukouski"
url: "https://www.designsystems.one/ai-ready"
publisher: "DesignSystems.one"
tags: [design-system, design-token, ai-ready, mcp, w3c-design-tokens, dtcg, typescript, discriminated-union, shadcn-ui, component-registry, readiness-checklist, cursor, claude-code, v0, designsystems-one]
figures:
  - id: fig01
    file: assets/designsystems-one-2026-ai-ready-design-systems-make-yours/page-full.png
    raw: raw/articles/designsystems-one-2026-ai-ready-design-systems-make-yours-figures/page-full.png
    caption: "AI-ready 허브 페이지 전체 스크린샷"
    strategy: screenshot
    curated: false
  - id: fig02
    file: assets/designsystems-one-2026-ai-ready-design-systems-make-yours/fig02.png
    raw: raw/articles/designsystems-one-2026-ai-ready-design-systems-make-yours-figures/fig02.png
    caption: "세 pillar의 적층 구조. Tokens가 substrate, MCP server가 query, Components가 contract 층을 맡는다"
    strategy: crop
    curated: true
  - id: fig03
    file: assets/designsystems-one-2026-ai-ready-design-systems-make-yours/fig03.png
    raw: raw/articles/designsystems-one-2026-ai-ready-design-systems-make-yours-figures/fig03.png
    caption: "세 pillar 카드. 각 pillar의 설명과 핵심 항목 세 가지"
    strategy: crop
    curated: true
  - id: fig04
    file: assets/designsystems-one-2026-ai-ready-design-systems-make-yours/fig04.png
    raw: raw/articles/designsystems-one-2026-ai-ready-design-systems-make-yours-figures/fig04.png
    caption: "readiness 체크리스트 여섯 질문"
    strategy: crop
    curated: true
  - id: fig05
    file: assets/designsystems-one-2026-ai-ready-design-systems-make-yours/fig05.png
    raw: raw/articles/designsystems-one-2026-ai-ready-design-systems-make-yours-figures/fig05.png
    caption: "지난 12개월의 네 가지 신호 카드"
    strategy: crop
    curated: false
---

## 한 줄 요약 (One-line Summary)

DesignSystems.one의 AI-ready 허브 페이지는 design system을 Cursor, Claude Code, v0, Lovable, Figma Make 같은 에이전트가 읽을 수 있게 만드는 조건을 세 가지 pillar로 정리한다. 첫째는 기계가 파싱할 수 있는 design token, 둘째는 에이전트가 세션 중에 조회하는 MCP server, 셋째는 type error 없이는 어길 수 없는 컴포넌트 계약이다. 페이지의 핵심 주장은 2026년의 병목이 UI 생성(generation)에서 통합(integration)으로 옮겨 갔고, 해결은 AI 쪽이 아니라 design system 쪽에 있다는 것이다. 세 pillar는 함께 갖춰야 효과가 나며, 여섯 문항 readiness 체크리스트와 지난 12개월의 네 가지 신호가 뒤따른다.

## 1. 자료 정보 (Document Information)

- 형식: DesignSystems.one 사이트의 AI-ready 허브(<https://www.designsystems.one/ai-ready>). 랜딩 페이지의 네 번째 진입 경로 "I'm making ours AI-ready"가 가리키는 페이지다. 페이지 머리 표어는 "AI-ready"와 "2026 wedge"를 중간점으로 이은 문구다.
- 제작자: Kiryl Zhukouski (사이트 푸터 기준, 랜딩 페이지 수집 때 확인).
- 연도: 발행일 표기는 없다. 본문의 "In 2026"과 Agent-Ready Index 재감사일 2026-09-04를 근거로 2026년으로 기록한다.
- 수집: 2026-09-30, chrome tier에 `--full-body`를 적용했다. 기본 본문 선택기는 1,827자만 잡았고 전체 body로 7,652자를 받았다. 쿠키 배너와 skip link만 잡음으로 제거했다.
- 절 구성: 히어로, 01 Why this matters, 02 Three pillars, 03 Readiness checklist, 04 Where the field is, 마지막 안내("Pillar 01 is the foundation").
- 하위 페이지 링크: Structure guide(`/ai-ready/structure`), Tokens(`/ai-ready/tokens`), MCP servers(`/ai-ready/mcp`), Components(`/ai-ready/components`), Agent files(`/ai-ready/agent-files`), Skills(`/ai-ready/skills`), Agent-Ready Index(`/ai-ready/systems`). 이 하위 페이지들의 본문은 수집 범위 밖이다.

## 2. 주요 기여 (Key Contributions)

1. **병목 이동이라는 문제 정의.** 2023년의 질문은 "LLM이 쓸 만한 UI를 생성할 수 있는가"였고 답은 예였다. 2026년의 질문은 "LLM이 생성 대상으로 삼는 design system이 그 결과를 drift 없이 받아들일 수 있는가"이며 답은 거의 언제나 아니오다. 해결은 design system 쪽에 있다고 본다.
2. **세 pillar와 상호 의존.** machine-readable design token, MCP server, typed 컴포넌트를 세 pillar로 두고, 셋 중 하나라도 빠지면 나머지가 효과를 내지 못한다고 주장한다("Get all three or get none of it").
3. **여섯 문항 readiness 체크리스트.** 하나라도 "아니오"면 할 일이 있다는 실무 기준이다. 대부분의 팀이 첫 감사에서 여섯 중 셋을 통과하지 못한다고 적는다.
4. **네 가지 시장 신호.** shadcn/ui, Agent-Ready Index, 생성 도구(Figma Make, v0, Lovable), MCP 지원 편집기(Cursor, Claude Code, Cline)를 AI-readiness가 "table stakes"가 되었다는 근거로 든다.
5. **두 가지 입문 자료 안내.** 여섯 단계 구조 가이드(How to structure your design system for AI)와 에이전트가 읽는 파일을 정리한 무료 팩(AGENTS.md, CLAUDE.md, SKILL.md 등 템플릿 9종, CC0)을 소개한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 히어로와 입문 자료

- 헤드라인: "Make your design system readable to AI."
- 설명문: Cursor, Claude Code, v0, Lovable, Figma Make처럼 2026년의 중요한 워크플로는 모두 에이전트를 거친다. "readable"의 의미를 세 pillar가 정의한다: machine-parseable tokens, MCP servers, component contracts agents can't violate without a type error.
- Start here 카드: "How to structure your design system for AI". 여섯 단계, 단계마다 도식 하나. design token, 네이밍, LLM이 읽을 수 있는 문서를 구축 순서대로 다룬다. 목표는 "the agent guesses"에서 "the agent uses your system"으로 옮기는 것이다.
- Free download 카드: "What agents actually read". Cursor, Claude Code, Copilot이 어떤 파일을 어떤 순서로 로드하는지와 채워 쓰는 템플릿 9종(AGENTS.md, CLAUDE.md, SKILL.md 등)을 CC0로 제공한다.

### 3.2 Why this matters: 병목의 이동

- 2023년 질문: LLM이 쓸 만한 UI를 생성할 수 있는가. 답은 예.
- 2026년 질문: LLM이 생성하는 대상 design system이 그 결과를 drift 없이 소비할 수 있는가. 답은 거의 언제나 아니오. 해결은 design system 쪽에 있다.
- 2026년에 가장 빠르게 출시하는 팀의 공통점 세 가지:
  1. 아무것도 렌더링하지 않고 에이전트가 파싱할 수 있는 design token
  2. 에이전트가 type error 없이는 어길 수 없는 prop 형태를 가진 컴포넌트
  3. 세션 중에 에이전트가 호출할 수 있는 조회 창구(보통 MCP)
- 나머지 팀의 모습: Storybook URL을 복사해 붙이고, 에이전트가 `color="dark-blue-2"` 같은 값을 지어내는 것을 지켜보며 괜찮은 척한다.
- 허브의 자기 규정: 벤더 홍보가 아니라 실제 구성 요소, 작동하는 형태, 작동하지 않는 anti-pattern, 기존 시스템을 버리지 않고 마이그레이션하는 방법을 다룬다.

### 3.3 세 pillar

pillar 간 의존 관계(원문 "The pillars compound"):

| 빠진 pillar | 결과 |
|---|---|
| MCP server 없이 machine-readable design token만 | 에이전트가 design token을 스스로 찾아야 한다 |
| typed 컴포넌트 없이 MCP server만 | 에이전트가 prop 값을 지어낼 수 있다 |
| machine-readable design token 없이 typed 컴포넌트만 | hex 리터럴이 출력에 섞인다 |

전체 스택은 함께 출시되거나 출시되지 않는다. 도식(fig02)은 세 층을 아래에서 위로 쌓는다: 01 Tokens `var(--color-*)` (substrate), 02 MCP server `list_tokens · get_*` (query), 03 Components typed props (contract). 캡션은 "The three pillars compound, pull the token base and the stack falls"(원문은 em dash로 연결)다.

| pillar | 제목 | 설명 | 핵심 항목 | 상태 |
|---|---|---|---|---|
| 01 | Tokens that LLMs can read | W3C Design Tokens Format, 시맨틱 네이밍, 기계가 파싱할 수 있는 type. 에이전트가 #4F46E5를 지어내는 대신 `var(--color-bg-accent)`를 쓰게 하는 기반 | W3C 규격 `.tokens.json`을 진실의 원천(source of truth)으로 삼는다. semantic design token을 primitive 위에 층으로 둔다. design token마다 JSDoc/TSDoc을 달아 의도를 보이게 한다 | Shipped |
| 02 | MCP servers for design systems | design token, 컴포넌트, 패턴을 MCP로 노출해 에이전트가 편집 시점에 조회하게 한다. 에이전트가 실제로 읽지 못하는 Storybook URL에서 추측하지 않게 한다 | 에이전트가 호출하는 tool: list-tokens, find-component, get-pattern. 에이전트가 읽는 resource: design token 카탈로그, 컴포넌트 계약, 결정 기록. 200줄짜리 TypeScript 참고 구현 | Shipped |
| 03 | Components agents can use without drift | TypeScript 우선 계약, 예측 가능한 prop 형태, 기계가 읽는 문서, registry endpoint. 50개 메시지 규모의 리팩터 세션을 견디는 컴포넌트 형태 | 열린 prop 대신 discriminated-union prop API. shadcn 방식 registry를 배포 채널로. type 검사를 거친 코드 예제가 든 MDX 문서 | Shipped |

"Shipped"는 각 pillar의 심층 해설(deep dive) 페이지가 공개되었음을 표시하는 배지로 보인다.

### 3.4 Readiness checklist

"Six questions. Answer 'no' to any one and you've got work to do." 여섯 문항은 에이전트가 쓸 수 있는 시스템과 에이전트가 환각으로 메워야 하는 시스템을 가르는 실무 기준이다. 대부분의 팀이 첫 감사에서 셋을 통과하지 못하며, 정상이고 고칠 수 있다고 적는다.

| 번호 | 질문 | 설명 |
|---|---|---|
| 01 | 새 Cursor 세션이 Storybook을 탐색하지 않고 design token을 찾을 수 있는가 | "문서 사이트를 읽어야 한다"면 이미 진 것이다. 저장소 안에 파싱 가능한 파일이 필요하다: `.tokens.json`, 이름 붙은 변수를 담은 `tokens.css`, 또는 TypeScript export |
| 02 | design token 이름이 겉모습이 아니라 의미를 알려 주는가 | `color.brand.500`은 추측이고 `color.action.primary`는 계약이다. 시맨틱 이름이면 에이전트가 의도만으로 맞는 design token을 고른다 |
| 03 | 에이전트가 보유 컴포넌트와 정확한 prop 형태를 나열할 수 있는가 | 에이전트가 `src/` 폴더를 `<Button`으로 grep해야 알아낸다면 올바른 prop을 고를 근거가 약하다 |
| 04 | 조합 패턴이 Figma 스크린샷이 아니라 코드 예제로 문서화되어 있는가 | 이미지는 겉모습 해석을 돕고, 동작하는 코드 예제는 정확한 API와 동작을 준다. 시각 예시와 실행 가능한 스니펫을 짝지어라 |
| 05 | 에이전트가 세션 중에 조회할 수 있게 MCP로 제공되는가 | MCP는 호환 에이전트에 조회 인터페이스를 준다. 저장소 파일, 패키지 type, registry, 읽을 수 있는 문서도 유용한 배포 경로다 |
| 06 | 컴포넌트 라이브러리가 variant에 TypeScript discriminated union을 쓰는가 | `size?: string`이면 에이전트가 `size='huge'`를 지어낸다. `size: 'sm' \| 'md' \| 'lg'`는 type 검사에서 거부한다. 제약된 API만 자동 편집을 견딘다 |

### 3.5 Where the field is: 네 가지 신호

"Four signals from the last twelve months." AI-readiness가 "앞을 내다본 있으면 좋은 것"에서 "향후 18개월의 기본 조건(table stakes)"으로 옮겨 갔다는 가장 강한 지표 네 가지다.

| 신호 | 내용 |
|---|---|
| shadcn/ui | 컴포넌트를 평범한 TSX로 저장소 안에 넣어 준다. 에이전트가 읽고 고치며 틀리면 type error를 받는다. 2026년 신규 구축의 기본값이며, 우연히 AI-native가 된 유일한 라이브러리라는 점이 큰 이유다 |
| The Agent-Ready Index | 2026-09-04에 각 시스템의 저장소 트리를 읽는 방식으로 재감사했고, 따라서 부재도 증거로 센다. 37개 중 6개가 확인된 DTCG design token을, 3개가 Figma Code Connect를 공개한다. 업계가 말하는 것보다 적다. 둘 다 자주 거론되는 Polaris와 Spectrum은 규격 이전 형식이거나 전체 트리에 없었다. 185칸 중 48칸이 아직 unknown이다 |
| Figma Make + v0 + Lovable | 셋 다 프롬프트에서 UI를 생성한다. 받는 쪽 design system이 machine-readable하지 않으면 셋 다 좋은 결과를 내지 못한다. 병목이 생성에서 통합으로 옮겨 갔다 |
| Cursor + Claude Code + Cline | MCP를 지원하는 편집기. tool을 호출하고 resource를 읽고 server에 조회한다. design system MCP server가 있으면 환각 대신 맞는 답을 얻는다 |

185칸은 37개 시스템에 신호 5개를 곱한 값이다.

### 3.6 마무리 안내

"Pillar 01 is the foundation. Read it first." design token이 기반이다. design token 카탈로그가 없는 MCP server는 제공할 것이 없고, semantic design token이 없는 typed 컴포넌트는 여전히 hex 값을 흘린다. design token 형태를 먼저 바로잡고 나머지를 쌓으라고 권한다. 링크는 pillar 01 해설, W3C design token 생성기(`/tools/token-generator`), 구축 playbook이다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

이 페이지는 실험 결과가 아니라 가이드이며, 등장하는 수치는 아래와 같다.

| 항목 | 값 |
|---|---|
| pillar | 3개 |
| readiness 체크리스트 | 6문항, 첫 감사에서 대부분의 팀이 3문항 불통과 |
| 구조 가이드 | 6단계 |
| 에이전트 파일 템플릿 | 9종, CC0 |
| MCP 참고 구현 | TypeScript 200줄 |
| 컴포넌트 계약의 목표 | 50개 메시지 리팩터 세션을 견딤 |
| Agent-Ready Index DTCG 공개 | 37개 중 6개 |
| Agent-Ready Index Figma Code Connect 공개 | 37개 중 3개 |
| Agent-Ready Index unknown 칸 | 185칸 중 48칸 |
| AI-readiness가 기본 조건이 되는 기간 | 향후 18개월 |

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **허브 페이지만 수집했다.** 세 pillar의 심층 해설, 여섯 단계 구조 가이드, Agent files 팩, Skills 페이지의 본문은 없다. 200줄 MCP 참고 구현의 코드도 이 자료에는 없다.
- **정량 근거가 약하다.** "대부분의 팀이 셋을 통과하지 못한다", "가장 빠르게 출시하는 팀의 공통점" 같은 서술은 조사 방법이나 표본이 제시되지 않은 저자의 관찰이다.
- **자기 도구 연결.** 마무리 안내가 사이트 자체 Token Generator와 playbook으로 이어진다. 허브는 벤더 홍보가 아니라고 밝히지만 사이트 자체 제품을 권하는 구조임은 감안해야 한다.
- **MCP 편향 가능성.** 체크리스트 05번은 MCP 외 배포 경로(저장소 파일, 패키지 type, registry, 문서)도 유용하다고 적어 균형을 잡지만, pillar 구성은 MCP를 필수 요소로 둔다. [[agents/hall-2026-atlassians-design-md-is-here]]의 실측처럼 전달 수단마다 비용이 다르다는 점은 이 페이지에서 다루지 않는다.

## 6. 관련 연구 (Related Work)

- [[etc/designsystems-one-2026-design-systems-explained-gallery-guides]]: 같은 사이트의 랜딩 페이지. 이 허브를 네 번째 진입 경로로 소개한다.
- [[etc/designsystems-one-2026-agent-ready-design-systems-index-who]]: 같은 사이트의 Agent-Ready Index. 허브의 네 번째 신호가 요약하는 감사의 원자료다.
- [[agents/google-labs-code-design-md]]: design system을 DESIGN.md 파일 하나로 에이전트에 넘기는 규격. 허브의 pillar 01과 달리 design token과 산문을 한 파일에 담는다.
- [[agents/hall-2026-atlassians-design-md-is-here]]: Atlassian에서 DESIGN.md, MCP server, 스킬을 실측 비교한 글. pillar 02(MCP server)의 효과를 수치로 보여 준다.
- [[overviews/design-md-overview]]: DESIGN.md, MCP server, Agent Skills의 로딩 방식과 토큰 비용 비교.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| 2026 wedge | 사이트가 AI-ready 전환을 2026년의 핵심 쟁점으로 내세우며 붙인 이름 |
| machine-parseable token | 렌더링 없이 에이전트가 파일에서 바로 읽을 수 있는 형식(`.tokens.json`, `tokens.css`, TypeScript export)의 design token |
| semantic token | `color.action.primary`처럼 겉모습이 아니라 용도를 이름에 담은 design token. `color.brand.500` 같은 primitive design token 위에 층으로 둔다 |
| component contract | 컴포넌트의 prop 형태를 type으로 고정해 에이전트가 type error 없이는 어길 수 없게 한 계약 |
| discriminated union | `'sm' \| 'md' \| 'lg'`처럼 허용 값을 열거한 TypeScript type. 열린 `string` 대신 써서 지어낸 값을 type 검사에서 거부한다 |
| W3C Design Tokens Format | W3C Design Tokens Community Group(DTCG)이 정한 design token 파일 형식. `$value`, `$type` 키를 쓴다 |
| table stakes | 경쟁에 참여하기 위한 기본 조건 |

## 8. 그림 후보 (Figure Candidates)

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | 허브 페이지 전체 스크린샷 (6,000px 세로) | screenshot | (선택) 쿠키 배너가 겹쳐 있어 wiki 임베드 비권장 |
| fig02 | 세 pillar의 적층 구조 도식 | crop | ★ wiki 권장 (architecture) |
| fig03 | 세 pillar 카드 | crop | ★ wiki 권장 (method) |
| fig04 | readiness 체크리스트 여섯 질문 | crop | ★ wiki 권장 (method) |
| fig05 | 네 가지 신호 카드 | crop | (확인 필요) 왼쪽 가장자리가 약간 잘렸고 내용은 표로 옮겼다 |
