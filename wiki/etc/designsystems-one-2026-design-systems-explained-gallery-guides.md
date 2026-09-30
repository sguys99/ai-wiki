---
title: "DesignSystems.one: Design Systems, Explained (Gallery, Guides & Tools)"
type: article
year: 2026
category: etc
raw_path: raw/articles/designsystems-one-2026-design-systems-explained-gallery-guides.md
raw_filename: "designsystems-one-2026-design-systems-explained-gallery-guides.md"
source_collection: external
source: designsystems-one-2026-design-systems-explained-gallery-guides.md
author: "Kiryl Zhukouski"
url: "https://www.designsystems.one/"
publisher: "DesignSystems.one"
tags: [design-system, design-token, agent-ready, ai-ready-index, mcp, design-md, carbon, primer, shadcn-ui, material-3, token-generator, oklch, wcag, designsystems-one]
figures:
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

## 요약

DesignSystems.one은 실제 기업과 오픈소스 프로젝트가 공개한 design system 120개를 한곳에 모아 비교하게 해 주는 레퍼런스 사이트다. 갤러리 외에도 design system을 처음 만드는 팀을 위한 8장짜리 playbook, 색과 타이포그래피 같은 기본 요소를 다루는 foundations 해설, React와 Vue 등 프레임워크별 구현 가이드, 브라우저 안에서만 실행되는 무료 도구 8종을 함께 제공한다. 제작자는 Kiryl Zhukouski이며, 사이트는 스스로를 14년 실무에서 나온 foundations와 가이드라인을 담은 큐레이션 갤러리로 소개한다.

이 wiki에서 이 자료가 갖는 의미는 2026년판에 추가된 AI 관련 축에 있다. 사이트는 design system이 Cursor, Claude Code, v0 같은 코딩 에이전트에 얼마나 준비되어 있는지를 5점 척도로 채점한 Agent-Ready Index를 공개했고(2026-09-04 감사, 37개 시스템), 가장 높은 Carbon도 4/5에 그쳤다. 또한 design token, MCP server, 에이전트를 묶어 design system을 AI-ready로 전환하는 허브를 "2026 wedge"라는 이름으로 전면에 배치했다. 즉 design system 업계의 레퍼런스 사이트가 에이전트 대응을 네 가지 핵심 질문 중 하나로 올려 둔 사례다.

이 페이지는 사이트의 랜딩 페이지만을 근거로 한다. 같은 사이트의 AI-ready 허브는 [[etc/designsystems-one-2026-ai-ready-design-systems-make-yours]]에서, Agent-Ready Index의 채점 기준과 37개 시스템 점수표는 [[etc/designsystems-one-2026-agent-ready-design-systems-index-who]]에서 따로 다룬다. playbook 각 장의 본문과 선택 가이드는 아직 수집하지 않았다.

## 배경

### design system의 정의

design system은 한 조직의 제품들이 같은 모양과 동작을 갖도록 색, 글꼴, 간격 같은 기본 값과 버튼, 입력창 같은 컴포넌트, 그리고 그 사용 규칙을 한 묶음으로 정리한 체계다. 사이트의 갤러리가 Apple HIG, Atlassian, Stripe, Geist(갤러리 주소는 `vercel-geist`)처럼 조직 이름이 붙은 시스템을 대표로 내세우는 것도 이 때문이다. 한 조직이 자기 제품들의 일관성을 위해 만든 체계를 외부에 공개한 것이 곧 이 갤러리의 수록 대상이다.

### 사이트가 겨냥하는 독자

사이트의 헤드라인은 "Design systems, explained for people who ship"이다. 즉 이론가가 아니라 실제로 제품을 출시하는 사람을 독자로 삼는다. 부제 "no theory, just receipts"도 같은 방향이다. receipts는 영수증, 곧 주장마다 확인 가능한 근거를 붙인다는 뜻으로, 설명문의 "evidence-linked decision brief"와 짝을 이룬다.

설명문 전체는 다음과 같다. "Choose from 120 design systems, compare the tradeoffs, and leave with an evidence-linked decision brief. Build on it with free token tools and editable references." 사이트가 약속하는 사용 흐름은 세 단계로 정리된다.

1. 120개 design system 중에서 고른다.
2. 시스템 사이의 트레이드오프를 비교한다.
3. 근거 링크가 달린 결정 요약을 들고 나가고, 무료 도구와 편집 가능한 레퍼런스로 그 위에 구축한다.

### AI 대응이 전면에 오른 맥락

design system을 에이전트에 넘기는 문제는 이 wiki에서 이미 여러 자료가 다뤘다. [[agents/google-labs-code-design-md]]는 design system을 Markdown 파일 하나에 담아 코딩 에이전트에 넘기는 DESIGN.md 포맷을 정의했고, [[agents/hall-2026-atlassians-design-md-is-here]]는 Atlassian Design System 위에서 DESIGN.md, MCP server, 스킬을 실측 비교했다. DesignSystems.one의 AI-ready 허브와 Agent-Ready Index는 같은 문제를 개별 포맷이 아니라 design system 전체를 대상으로 다루는 레퍼런스 사이트 쪽의 응답이다.

## 핵심 개념

design token은 색, 간격, 글꼴 크기 같은 디자인 값에 이름을 붙여 코드와 디자인 도구가 공유하는 단위다. 사이트의 Token Generator는 이 design token을 primitive, semantic, component 세 층으로 만든다. Frameworks 카드의 예시 `--color-brand: #93293b;`, `--radius-md: 0.5rem;`은 브랜드 색과 모서리 반경을 CSS 변수 형태의 design token으로 적은 것이다.

foundations는 design system의 다른 모든 요소가 전제하는 기본 요소를 가리킨다. 사이트는 색, 타이포그래피, 간격, 접근성을 예로 들고 모두 11개를 다룬다. playbook이 "foundations first"를 첫 원칙으로 두는 이유도 컴포넌트와 테마가 이 값들 위에 쌓이기 때문이다.

MCP는 모델이 외부 도구와 데이터 원천에 표준화된 방식으로 접근하게 하는 프로토콜이다. AI-ready 허브의 제목 "Tokens, MCP servers, and agents that ship code"는 design token을 MCP server로 노출해 에이전트가 필요할 때 조회하게 하는 방식을 AI 대응의 핵심 수단 중 하나로 본다는 뜻이다.

drift는 에이전트가 만든 코드가 design system의 정의에서 조금씩 벗어나는 현상을 이 페이지에서 가리키는 말이다. AI-ready 허브는 design token, 컴포넌트, 패턴을 "without drift" 상태로 코딩 에이전트에 노출하는 것을 목표로 적는다.

Agent-Ready Index는 design system이 코딩 에이전트에 얼마나 준비되어 있는지를 "AI n/5" 점수로 매긴 사이트 자체 지표다. 점수가 무엇을 측정하는지는 랜딩 페이지에 나오지 않으며, 다섯 가지 채점 신호는 [[etc/designsystems-one-2026-agent-ready-design-systems-index-who]]에 정리했다.

## 사이트 구성

### 히어로 영역

랜딩 페이지 최상단은 헤드라인, 설명문, 두 행동 버튼(Browse the gallery, Start with foundations)으로 이루어지고, 주변에 사이트 기능을 암시하는 장식 카드가 흩어져 있다. 카드는 사이트가 무엇을 다루는지 미리 보여 주는 역할을 한다.

| 장식 카드 | 암시하는 기능 |
|---|---|
| Tokens, OKLCH 색 팔레트 | Token Generator와 OKLCH 색 공간 지원 |
| Agent-Ready Index, Carbon 4/5 | Agent-Ready Index 채점 |
| stripe-design.md, Ready to download | design system을 Markdown 파일로 내려받는 기능 |
| Components, Primary와 Ghost 버튼 | 컴포넌트 레퍼런스 |
| Aa 1.25× | 타이포그래피 스케일 |
| Material 3, 120 in the gallery | 120개 시스템 갤러리 |

stripe-design.md 카드는 [[agents/google-labs-code-design-md]]가 정의한 DESIGN.md 계열 파일을 연상시키지만, 랜딩 페이지에는 파일의 형식이나 규격 준수 여부에 대한 설명이 없다. 따라서 두 자료의 관계는 이 페이지의 추정 수준에 머문다.

히어로 아래에는 갤러리 대표 12개가 이름으로 나열된다. Polaris, Carbon, Material 3, Apple HIG, Atlassian, Stripe, Primer, shadcn/ui, Material UI, Ant Design, Chakra UI, Geist이며, 나머지는 "+ 108 more" 링크로 이어진다.

### Agent-Ready Index

히어로 바로 다음 절이 Agent-Ready Index다. 제목은 "The systems closest to agent-ready today"이고, 절 머리에 "audited 2026-09-04"라는 감사일이 붙어 있다. 랜딩 페이지는 상위 5개만 보여 주고 전체 37개 시스템은 `/ai-ready/systems`로 연결한다.

![[assets/designsystems-one-2026-design-systems-explained-gallery-guides/fig02.png]]
*Figure 2: Agent-Ready Index 상위 5개 design system 카드. 막대 다섯 칸 중 채워진 칸 수가 점수다 (DesignSystems.one 2026)*

| 순위 | 시스템 | 점수 |
|---|---|---|
| 1 | Carbon | AI 4/5 |
| 2 | Primer | AI 3/5 |
| 3 | shadcn/ui | AI 3/5 |
| 4 | Ant Design | AI 2/5 |
| 5 | Atlassian Design System | AI 2/5 |

이 표는 두 가지 사실을 보여 준다. 첫째, 1위인 Carbon도 5점 만점에 이르지 못했으므로 사이트 기준으로는 완전히 agent-ready인 design system이 아직 없다. 둘째, 5위의 점수가 이미 2/5이므로 37개 중 나머지 32개는 2/5 이하다. 즉 사이트가 보는 업계 전반의 에이전트 대응 수준은 낮은 편이다.

Atlassian Design System이 2/5로 5위에 있다는 점은 [[agents/hall-2026-atlassians-design-md-is-here]]와 함께 읽을 만하다. 그 글은 Atlassian이 MCP server와 스킬을 이미 운영하며 DESIGN.md와 비교 실측할 만큼 에이전트 대응을 진행한 사례인데, 이 지표에서는 중간 이하 점수를 받았다. 지표 페이지([[etc/designsystems-one-2026-agent-ready-design-systems-index-who]])에 따르면 점수는 MCP server, llms.txt, DTCG design token, component registry, Figma Code Connect 다섯 신호의 공개 여부이며, Atlassian은 MCP server와 llms.txt가 확인되고 DTCG와 Code Connect가 unknown이다. 즉 이 점수는 산출물의 공개 여부를 센 것이고, 실측 글이 잰 토큰 비용이나 컨텍스트 확보율과는 측정 대상이 다르다.

### 네 가지 진입 경로

"Start where you are" 절은 사용자가 지금 품고 있는 질문에 따라 네 가지 길을 제시한다. 사이트 전체의 내용을 기능별이 아니라 상황별로 다시 묶은 안내판이다.

![[assets/designsystems-one-2026-design-systems-explained-gallery-guides/fig03.png]]
*Figure 3: 사용자 질문별 네 가지 진입 경로. 02와 04에 New 표시가 붙어 있다 (DesignSystems.one 2026)*

| 번호 | 사용자의 질문 | 안내 대상 | 담긴 내용 |
|---|---|---|---|
| 01 | "I'm starting from zero" | Build a design system, day 1 to day 90 (`/playbook`) | 90일 경로에 대응하는 8개 챕터. foundations를 먼저, 테마보다 design token을 먼저, 인력 충원보다 governance를 먼저 둔다 |
| 02 | "I need to pick what to build on" | Which design system to choose in 2026 (`/design-systems/which-one`) | 다섯 가지 팀 형태별 추천 다섯 개, 피해야 할 anti-pattern, 2023년 이후 답을 바꾼 변화 |
| 03 | "I'm trying to drive adoption" | Why your design system isn't being used (`/designops/adoption`) | 배포 메커니즘과 discovery에서 maintenance까지의 퍼널 |
| 04 | "I'm making ours AI-ready" | Tokens, MCP servers, and agents that ship code (`/ai-ready`) | design token, 컴포넌트, 패턴을 Cursor, Claude Code, v0에 drift 없이 노출하는 방법. pillar 3개, readiness 체크리스트, 1주 마이그레이션 계획 |

01번 경로의 세 원칙은 순서에 관한 원칙이다. "foundations first, tokens before themes, governance before headcount"는 기본 값을 먼저 정하고, 그 값을 design token으로 고정한 다음에 테마를 얹으며, 사람을 늘리기 전에 운영 규칙부터 세우라는 뜻이다. 사이트는 이 playbook을 "Practitioner voice, no theory"로 소개한다.

03번 경로는 design system의 실패 원인을 구축이 아니라 확산에서 찾는다. 카드 문구는 "The hard part isn't building it"이며, 어려운 부분은 다른 팀이 그 위에서 실제로 제품을 출시하게 만드는 일이라고 적는다.

04번 경로는 사이트가 2026년의 새 쟁점으로 내세우는 부분이다. 대상 도구로 Cursor, Claude Code, v0를 명시하므로, 사이트가 말하는 AI-ready는 코딩 에이전트가 design system을 읽고 그 규칙에 맞는 코드를 생성하는 상황을 가리킨다. 02번과 04번에만 New 표시가 붙어 있어, 선택 가이드와 AI-ready 허브가 최근 추가된 콘텐츠임을 알 수 있다.

### 다섯 섹션

"The whole site, in five sections" 절은 사이트의 전체 지도를 기능별로 보여 준다. 네 가지 진입 경로가 상황별 안내라면 이 절은 목차에 해당한다.

![[assets/designsystems-one-2026-design-systems-explained-gallery-guides/fig04.png]]
*Figure 4: 사이트를 이루는 다섯 섹션. 각 카드 오른쪽 위에 규모가 표기된다 (DesignSystems.one 2026)*

| 섹션 | 규모 | 설명 |
|---|---|---|
| Playbook | 8 chapters | 8개 챕터로 design system을 구축한다. foundations first, governance before headcount |
| Foundations | 11 foundations | 색, 타이포그래피, 간격, 접근성 등 나머지 모든 것이 전제하는 기본 요소 |
| Design Systems | 120 systems | 실제 시스템 120개를 나란히 비교한다. 각각 design token과 breakdown을 갖춘다 |
| Frameworks | Guides | React, Vue 등에 걸친 구현 가이드와 적응 패턴 |
| Tools | 8 tools | design system용 생성기, 계산기, 공개 사이트 스캐너 |

Design Systems 카드에는 아이콘 몇 개 뒤에 "+83"이, 히어로 아래 갤러리 줄에는 "+ 108 more"가 표시된다. 두 숫자가 다른 것은 앞에 노출한 아이콘 수가 달라서이며, 둘 다 전체 120개를 가리킨다.

### 무료 도구

"Design system tools" 절은 "Free, runs in your browser"를 표어로 내건다. 설명문은 도구를 매일 쓰는 작업대(workbench)로 소개하고, 가입이 필요 없으며 어떤 데이터도 브라우저 밖으로 나가지 않는다고 적는다.

| 도구 | 기능 | 태그 |
|---|---|---|
| Token Generator (Most used) | primitive, semantic, component design token을 만들어 CSS, SCSS, Tailwind, JSON으로 내보낸다. W3C 규격과 호환된다 | Tokens, OKLCH, APCA, W3C-spec |
| Grid Builder | 반응형 grid 레이아웃을 시각적으로 구성한다 | Layout, Responsive |
| Accessibility Checker | WCAG 기본 항목 기준으로 작업물을 감사한다 | WCAG, A11y, Audit |
| ROI Calculator | design 속도, 개발 속도, 품질, 온보딩 개선을 수치화해 도입의 비즈니스 근거를 만든다 | Business case, Metrics |

Token Generator의 태그 두 개는 색을 다루는 방식을 알려 준다. OKLCH는 명도, 채도, 색상각으로 색을 표현하는 지각 균일 색 공간이고, APCA는 텍스트와 배경의 명도 대비를 지각 기준으로 재는 대비 산정 방식이다. 즉 이 도구는 색 design token을 만들 때 사람이 느끼는 밝기와 대비를 기준으로 삼는다.

Accessibility Checker 카드는 대비 값 세 개를 예로 보여 준다. 12.6과 7.1은 통과, 2.3은 불통과로 표시된다. ROI Calculator 카드는 design system 없이(without)와 있을 때(with DS)를 막대 두 개로 대비한다.

도구는 모두 8종이지만 랜딩 페이지에는 위 네 개만 소개되고 나머지는 View All Tools(`/tools`)로 이어진다. 다섯 섹션 표의 설명에 "public-site scanners"가 있으므로 공개 사이트를 스캔하는 도구가 그 안에 포함된 것으로 보인다.

### 푸터와 운영 정보

푸터에는 사이트 링크로 Tools, Design systems library, What is a design system?, Foundations, Glossary, Registry, About, Support the project가 있고, 저작권 표기 "© 2026"과 "Built by Kiryl Zhukouski"가 있다. 쿠키 배너는 트래픽 측정과 경험 개선을 위한 분석 쿠키만 쓰며 광고, 데이터 판매, 프로파일링이 없다고 밝힌다. Support the project 링크는 사이트가 개인이 운영하는 프로젝트라는 점을 시사한다.

## 수치 정리

랜딩 페이지가 제시하는 정량 정보는 아래 표가 전부다. 성능 비교나 실험 결과는 없고, 사이트의 규모와 구성을 나타내는 수치다.

| 항목 | 값 |
|---|---|
| 갤러리 수록 design system | 120개 |
| Agent-Ready Index 감사 대상 | 37개 시스템 (2026-09-04 감사) |
| Agent-Ready Index 최고점 | Carbon 4/5 |
| Agent-Ready Index 5위 점수 | 2/5 |
| Playbook | 8개 챕터, 90일 경로 |
| Foundations | 11개 |
| 무료 도구 | 8종 (랜딩 소개 4종) |
| 선택 가이드 | 팀 형태 5가지, 추천 5개 |
| AI-ready 허브 | pillar 3개, readiness 체크리스트, 1주 마이그레이션 계획 |
| 제작자 경력 표기 | 14년 실무 |

## 한계

이 자료를 인용할 때 고려해야 할 제약은 다음과 같다.

- **입구 페이지만 다룬다.** playbook 8개 챕터의 제목과 본문, 선택 가이드의 실제 추천은 하위 페이지에 있고 아직 수집하지 않았다. AI-ready 허브와 Agent-Ready Index는 별도 페이지로 수집했다.
- **랜딩 페이지에는 채점 기준이 없다.** "AI n/5" 점수의 기준은 지표 페이지에만 있다. 점수를 인용할 때는 사이트 자체 감사 결과라는 점과 감사일(2026-09-04)을 함께 밝혀야 한다.
- **1인 제작 큐레이션이다.** 푸터의 "Built by Kiryl Zhukouski"와 Support the project 링크로 보아 개인이 운영하는 사이트이며, 비교와 추천에는 제작자의 관점이 반영된다.
- **시점에 의존한다.** 감사일이 명시된 지표이므로 시간이 지나면 순위와 점수가 바뀔 수 있다. 사이트 스스로도 선택 가이드에서 2023년 이후 답이 바뀌었다고 적는다.
- **제작자 확인 경로.** 제작자 이름은 텍스트 본문이 아니라 전체 페이지 스크린샷의 푸터에서 확인했다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| Agent-Ready Index | design system이 코딩 에이전트에 얼마나 준비되어 있는지를 AI n/5로 채점한 사이트 자체 지표 |
| AI-ready | design system의 design token, 컴포넌트, 패턴을 에이전트가 drift 없이 읽고 쓸 수 있게 노출한 상태 |
| decision brief | 갤러리 비교 결과를 근거 링크와 함께 정리한 결정 요약 |
| foundations | 색, 타이포그래피, 간격, 접근성처럼 design system의 모든 요소가 전제하는 기본 요소 |
| drift | 에이전트가 만든 코드가 design system의 정의에서 조금씩 벗어나는 현상 |
| OKLCH | 명도, 채도, 색상각으로 색을 표현하는 지각 균일 색 공간 |

## 관련 페이지

- [[etc/designsystems-one-2026-ai-ready-design-systems-make-yours]]: 같은 사이트의 AI-ready 허브. design token, MCP server, 컴포넌트 계약의 세 pillar와 readiness 체크리스트
- [[etc/designsystems-one-2026-agent-ready-design-systems-index-who]]: 같은 사이트의 Agent-Ready Index 원자료. 다섯 신호 채점 규칙과 37개 시스템 점수표
- [[agents/google-labs-code-design-md]]: design system을 Markdown 파일 하나로 코딩 에이전트에 넘기는 DESIGN.md 규격. 히어로의 stripe-design.md 카드와 같은 계열의 전달 방식이다
- [[agents/hall-2026-atlassians-design-md-is-here]]: Atlassian Design System에서 DESIGN.md, MCP server, 스킬을 실측 비교한 글. Atlassian은 이 사이트의 Agent-Ready Index에서 2/5로 5위다
- [[overviews/design-md-overview]]: DESIGN.md, MCP server, Agent Skills의 로딩 방식과 토큰 비용을 비교한 overview. AI-ready 허브가 다루는 주제와 겹친다
