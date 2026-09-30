---
title: "DesignSystems.one: Design Systems, Explained (Gallery, Guides & Tools)"
type: article
year: 2026
category: etc
raw_path: raw/articles/designsystems-one-2026-design-systems-explained-gallery-guides.md
raw_filename: "designsystems-one-2026-design-systems-explained-gallery-guides.md"
source_collection: external
author: "Kiryl Zhukouski"
url: "https://www.designsystems.one/"
publisher: "DesignSystems.one"
tags: [design-system, design-token, agent-ready, ai-ready-index, mcp, design-md, carbon, primer, shadcn-ui, material-3, token-generator, oklch, wcag, designsystems-one]
figures:
  - id: fig01
    file: assets/designsystems-one-2026-design-systems-explained-gallery-guides/page-full.png
    raw: raw/articles/designsystems-one-2026-design-systems-explained-gallery-guides-figures/page-full.png
    caption: "DesignSystems.one 랜딩 페이지 전체 스크린샷. 상단 히어로, Agent-Ready Index, 네 가지 진입 경로, 다섯 섹션, 도구 목록, 푸터 순서로 이어진다"
    strategy: screenshot
    curated: false
  - id: fig02
    file: assets/designsystems-one-2026-design-systems-explained-gallery-guides/fig02.png
    raw: raw/articles/designsystems-one-2026-design-systems-explained-gallery-guides-figures/fig02.png
    caption: "Agent-Ready Index 상위 5개 design system 카드. Carbon 4/5, Primer 3/5, shadcn/ui 3/5, Ant Design 2/5, Atlassian Design System 2/5"
    strategy: crop
    curated: true
  - id: fig03
    file: assets/designsystems-one-2026-design-systems-explained-gallery-guides/fig03.png
    raw: raw/articles/designsystems-one-2026-design-systems-explained-gallery-guides-figures/fig03.png
    caption: "사용자 질문별 네 가지 진입 경로. 처음부터 구축, 기반 시스템 선택, 도입 확산, AI-ready 전환"
    strategy: crop
    curated: true
  - id: fig04
    file: assets/designsystems-one-2026-design-systems-explained-gallery-guides/fig04.png
    raw: raw/articles/designsystems-one-2026-design-systems-explained-gallery-guides-figures/fig04.png
    caption: "사이트를 이루는 다섯 섹션. Playbook, Foundations, Design Systems, Frameworks, Tools"
    strategy: crop
    curated: true
---

## 한 줄 요약 (One-line Summary)

DesignSystems.one은 실제 design system 120개를 모아 비교하고, 구축 playbook, foundations 해설, 프레임워크별 구현 가이드, 브라우저에서 실행되는 무료 도구를 함께 제공하는 레퍼런스 사이트다. 랜딩 페이지는 "no theory, just receipts"를 표어로 내걸고, 사용자가 근거 링크가 달린 결정 요약(evidence-linked decision brief)을 들고 나가도록 설계했다고 밝힌다. 2026년판의 특징은 design system이 Cursor, Claude Code, v0 같은 코딩 에이전트에 얼마나 준비되어 있는지를 5점 척도로 채점한 Agent-Ready Index(2026-09-04 감사, 37개 시스템)와, design token, MCP server, 에이전트를 다루는 AI-ready 허브다.

## 1. 자료 정보 (Document Information)

- 형식: 웹사이트 랜딩 페이지(<https://www.designsystems.one/>). 개별 글이 아니라 사이트 전체의 입구 페이지다. 하위 페이지(`/playbook`, `/ai-ready`, `/design-systems/which-one` 등)의 본문은 이번 수집 범위에 포함되지 않았다.
- 제작자: Kiryl Zhukouski. 텍스트 본문에는 이름이 없고 전체 페이지 스크린샷(fig01)의 푸터 "Built by Kiryl Zhukouski"에서 확인했다.
- 사이트 자기소개(푸터, fig01): "A curated gallery of 120 real-world design systems, foundations and guidelines from fourteen years of practice, plus free interactive tools." 즉 14년의 실무 경험에서 나온 foundations와 가이드라인, 그리고 무료 인터랙티브 도구를 함께 담은 큐레이션 갤러리다.
- 연도: 발행일 표기는 없다. Agent-Ready Index 감사일(2026-09-04), "Which design system to choose in 2026" 카드, 푸터의 "© 2026"을 근거로 2026년으로 기록한다.
- 수집: 2026-09-30, `scripts/fetch_article.py`의 chrome tier에 `--full-body`를 적용했다. 기본 본문 선택기로는 1,005자만 잡혀 랜딩 페이지 전체 body를 받았다. 쿠키 배너와 skip link만 잡음으로 제거했다.
- 상단 네비게이션(fig01): Design Systems, Learn, AI-Ready, Tools, 그리고 AI-Ready Index 버튼. 상단 배너는 "The Atlas"라는 신규 기능을 "every design system, mapped in 3D"로 소개한다.

## 2. 주요 기여 (Key Contributions)

1. **120개 design system 갤러리.** Polaris, Carbon, Material 3, Apple HIG, Atlassian, Stripe, Primer, shadcn/ui, Material UI, Ant Design, Chakra UI, Geist(Vercel)를 대표로 노출하고 나머지 108개를 "+ 108 more"로 연결한다. 각 시스템은 design token과 breakdown을 갖춰 나란히 비교할 수 있다고 소개한다.
2. **Agent-Ready Index.** design system이 코딩 에이전트에 얼마나 준비되어 있는지를 "AI n/5" 점수로 매긴 지표다. 2026-09-04에 감사했고 전체 목록은 37개 시스템이다. 랜딩 페이지는 상위 5개를 보여 준다.
3. **질문 중심의 네 가지 진입 경로.** 사용자가 처한 상황("처음부터 시작한다", "무엇 위에 지을지 골라야 한다", "도입을 늘리려 한다", "AI-ready로 만들려 한다")에 따라 playbook, 선택 가이드, 도입 가이드, AI-ready 허브로 안내한다.
4. **브라우저 전용 무료 도구.** Token Generator, Grid Builder, Accessibility Checker, ROI Calculator를 포함한 도구 8종을 가입 없이 제공하며, 데이터가 브라우저 밖으로 나가지 않는다고 명시한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 히어로 영역

- 헤드라인: "Design systems, explained for people who ship". 부제는 "no theory, just receipts"(원문은 em dash로 연결).
- 설명문: "Choose from 120 design systems, compare the tradeoffs, and leave with an evidence-linked decision brief. Build on it with free token tools and editable references."
- 행동 버튼: Browse the gallery(`/design-systems`), Start with foundations(`/foundations`).
- 히어로 주변 장식 카드(텍스트 추출과 fig01에서 확인): "Tokens, OKLCH" 색 팔레트(원문은 두 단어를 중간점으로 구분), "Agent-Ready Index Carbon 4/5", "stripe-design.md Ready to download", "Components Primary Ghost" 버튼 예시, "Aa 1.25×" 타입 스케일, "Material 3, 120 in the gallery". stripe-design.md 카드는 design system을 Markdown 파일로 내려받는 기능이 있음을 암시하지만 랜딩 페이지에는 그 이상의 설명이 없다.

### 3.2 Agent-Ready Index 상위 5개 (audited 2026-09-04)

| 순위 | 시스템 | 점수 |
|---|---|---|
| 1 | Carbon | AI 4/5 |
| 2 | Primer | AI 3/5 |
| 3 | shadcn/ui | AI 3/5 |
| 4 | Ant Design | AI 2/5 |
| 5 | Atlassian Design System | AI 2/5 |

제목은 "The systems closest to agent-ready today"이고, 전체 지표는 `/ai-ready/systems`에 37개 시스템으로 있다. 채점 기준(5개 항목의 내용)은 랜딩 페이지에 나오지 않는다. 상위 1위도 5점 만점이 아니라는 점에서 사이트는 현재 어느 design system도 완전히 agent-ready 상태가 아니라고 본다.

### 3.3 네 가지 진입 경로 ("Start where you are")

| 번호 | 사용자 상황 | 제목 | 내용 | 링크 |
|---|---|---|---|---|
| 01 | "I'm starting from zero" | Build a design system, day 1 to day 90 | 90일 경로에 대응하는 8개 챕터. foundations first, tokens before themes, governance before headcount. 실무자 목소리, 이론 없음 | `/playbook` |
| 02 (New) | "I need to pick what to build on" | Which design system to choose in 2026 | 다섯 가지 팀 형태별 추천 다섯 개, 피해야 할 anti-pattern, 2023년 이후 답을 바꾼 변화 | `/design-systems/which-one` |
| 03 | "I'm trying to drive adoption" | Why your design system isn't being used | 어려운 것은 구축이 아니라 다른 팀이 그 위에서 출시하게 만드는 것. 배포 메커니즘과 discovery에서 maintenance까지의 퍼널 | `/designops/adoption` |
| 04 (New) | "I'm making ours AI-ready" | Tokens, MCP servers, and agents that ship code | "2026 wedge". design token, component, pattern을 Cursor, Claude Code, v0에 drift 없이 노출하는 방법. 세 가지 pillar, readiness 체크리스트, 1주 마이그레이션 계획 | `/ai-ready` |

### 3.4 사이트의 다섯 섹션 ("The whole site, in five sections")

| 섹션 | 규모 표기 | 설명 | 링크 |
|---|---|---|---|
| Playbook | 8 chapters | 8개 챕터로 design system을 구축한다. foundations first, governance before headcount | `/playbook` |
| Foundations | 11 foundations | 색, 타이포그래피, 간격, 접근성. 나머지 모든 것이 전제하는 기본 요소 | `/foundations` |
| Design Systems | 120 systems | 실제 시스템 120개를 나란히 비교. 각각 design token과 breakdown 포함. 카드에는 "+83" 표기 | `/design-systems` |
| Frameworks | Guides | React, Vue 등에 걸친 구현 가이드와 적응 패턴. 카드 예시로 CSS 변수 `--color-brand: #93293b;`, `--radius-md: 0.5rem;` | `/frameworks` |
| Tools | 8 tools | design system용 생성기, 계산기, 공개 사이트 스캐너 | `/tools` |

Design Systems 카드의 "+83"과 갤러리 줄의 "+ 108 more"는 노출된 아이콘 수가 달라서 생긴 차이로 보인다. 둘 다 전체 120개를 가리킨다.

### 3.5 도구 ("Design system tools", Free, runs in your browser)

설명문: "A workbench for the day-to-day: generate tokens, model the business case, check contrast, and lay out grids", 이어서 "no signup, nothing leaves your browser"(원문은 두 구절을 em dash로 연결).

| 도구 | 설명 | 태그 |
|---|---|---|
| Token Generator (Most used) | primitive, semantic, component design token을 CSS, SCSS, Tailwind, JSON으로 내보낸다. W3C 규격 호환 | Tokens, OKLCH, APCA, W3C-spec |
| Grid Builder | 반응형 grid 레이아웃을 시각적으로 구성 | Layout, Responsive |
| Accessibility Checker | WCAG 기본 항목 기준으로 작업물을 감사. 카드 예시는 대비 12.6 통과, 7.1 통과, 2.3 불통과 | WCAG, A11y, Audit |
| ROI Calculator | design speed, dev speed, 품질, 온보딩 개선을 수치화해 도입의 비즈니스 근거를 만든다. 카드는 "without"과 "with DS" 막대 비교 | Business case, Metrics |

도구는 총 8종(`/tools`)이며 랜딩 페이지에는 네 개만 소개된다.

### 3.6 푸터 (fig01)

Site 링크 목록: Tools, Design systems library, What is a design system?, Foundations, Glossary, Registry, About, Support the project. 쿠키 배너는 분석 목적 쿠키만 쓰며 광고, 데이터 판매, 프로파일링이 없다고 밝힌다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

랜딩 페이지가 제시하는 수치는 아래가 전부다.

| 항목 | 값 |
|---|---|
| 갤러리 수록 design system | 120개 |
| Agent-Ready Index 감사 대상 | 37개 시스템 (2026-09-04) |
| Agent-Ready Index 최고점 | Carbon 4/5 |
| Playbook 챕터 | 8개 (90일 경로) |
| Foundations | 11개 |
| 도구 | 8종 |
| 선택 가이드의 팀 형태 | 5가지, 추천 5개 |
| AI-ready 허브 | pillar 3개, readiness 체크리스트, 1주 마이그레이션 계획 |
| 제작자 경력 표기 | 14년 실무 (푸터) |

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **입구 페이지만 수집했다.** Agent-Ready Index의 채점 기준, AI-ready 허브의 세 가지 pillar 내용, playbook 8개 챕터 제목, 선택 가이드의 추천 결과는 모두 하위 페이지에 있어 이 자료로는 알 수 없다.
- **채점 방법 비공개(랜딩 기준).** "AI n/5" 점수가 무엇을 측정하는지 랜딩 페이지에 설명이 없다. 점수를 인용할 때는 사이트 자체 감사 결과라는 점을 함께 밝혀야 한다.
- **1인 제작 큐레이션.** 제작자 한 명이 운영하는 사이트로 보이며(푸터 "Built by Kiryl Zhukouski", "Support the project"), 비교와 추천에는 제작자의 관점이 반영된다.
- **시점 의존.** 감사일이 명시된 지표라 시간이 지나면 순위와 점수가 바뀔 수 있다. 사이트 스스로도 2023년 이후 답이 바뀌었다고 적는다.

## 6. 관련 연구 (Related Work)

- [[agents/google-labs-code-design-md]]: design system을 코딩 에이전트에게 넘기는 Google Labs의 DESIGN.md 포맷. 히어로의 "stripe-design.md Ready to download" 카드와 같은 계열의 Markdown 전달 방식이다.
- [[agents/hall-2026-atlassians-design-md-is-here]]: Atlassian Design System에서 DESIGN.md를 MCP, 스킬과 비교 실측한 글. Atlassian은 이 사이트의 Agent-Ready Index에서 2/5로 5위다.
- [[overviews/design-md-overview]]: DESIGN.md, MCP server, Agent Skills의 로딩 방식과 토큰 비용을 비교한 overview. AI-ready 허브가 다루는 "design token, MCP server, 에이전트" 주제와 겹친다.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| Agent-Ready Index | design system이 코딩 에이전트에 얼마나 준비되어 있는지를 AI n/5로 채점한 사이트 자체 지표 |
| AI-ready | design system의 design token, component, pattern을 에이전트가 drift 없이 읽고 쓸 수 있게 노출한 상태 |
| decision brief | 갤러리 비교 결과를 근거 링크와 함께 정리한 결정 요약 |
| foundations | 색, 타이포그래피, 간격, 접근성처럼 design system의 모든 요소가 전제하는 기본 요소 |
| drift | 에이전트가 만든 코드가 design system의 정의에서 조금씩 벗어나는 현상 |
| OKLCH | 명도, 채도, 색상각으로 색을 표현하는 지각 균일 색 공간. Token Generator의 태그로 쓰인다 |
| APCA | 텍스트와 배경의 명도 대비를 지각 기준으로 재는 대비 산정 방식. Token Generator의 태그로 쓰인다 |

## 8. 그림 후보 (Figure Candidates)

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | 랜딩 페이지 전체 스크린샷 (4,900px 세로) | screenshot | (선택) 전체 구조 확인용. 쿠키 배너가 겹쳐 있어 wiki 임베드는 비권장 |
| fig02 | Agent-Ready Index 상위 5개 카드 | crop | ★ wiki 권장 (result) |
| fig03 | 네 가지 진입 경로 카드 | crop | ★ wiki 권장 (structure) |
| fig04 | 사이트의 다섯 섹션 카드 | crop | ★ wiki 권장 (structure) |
