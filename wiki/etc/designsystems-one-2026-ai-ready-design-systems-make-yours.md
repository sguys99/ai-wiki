---
title: "AI-ready design systems: make yours readable to Cursor, Claude, and v0"
type: article
year: 2026
category: etc
raw_path: raw/articles/designsystems-one-2026-ai-ready-design-systems-make-yours.md
raw_filename: "designsystems-one-2026-ai-ready-design-systems-make-yours.md"
source_collection: external
source: designsystems-one-2026-ai-ready-design-systems-make-yours.md
author: "Kiryl Zhukouski"
url: "https://www.designsystems.one/ai-ready"
publisher: "DesignSystems.one"
tags: [design-system, design-token, ai-ready, mcp, w3c-design-tokens, dtcg, typescript, discriminated-union, shadcn-ui, component-registry, readiness-checklist, cursor, claude-code, v0, designsystems-one]
figures:
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
---

## 요약

DesignSystems.one의 AI-ready 허브는 design system을 코딩 에이전트가 읽고 규칙대로 쓸 수 있게 만드는 조건을 세 가지 pillar로 정리한 가이드 페이지다. 세 pillar는 기계가 파싱할 수 있는 design token, 에이전트가 작업 중에 조회하는 MCP server, 그리고 type error 없이는 어길 수 없는 컴포넌트 계약이다. 대상 에이전트로는 Cursor, Claude Code, v0, Lovable, Figma Make를 명시한다.

페이지의 출발점은 병목이 옮겨 갔다는 진단이다. 2023년에는 LLM이 쓸 만한 UI를 생성할 수 있는지가 질문이었고 답은 예였다. 2026년에는 LLM이 생성 대상으로 삼는 design system이 그 결과를 drift 없이 받아들일 수 있는지가 질문이며, 답은 거의 언제나 아니오다. 따라서 저자는 해결책이 AI 모델 쪽이 아니라 design system 쪽에 있다고 본다.

허브는 세 pillar가 서로 의존하므로 셋을 함께 갖춰야 효과가 난다고 주장하고("Get all three or get none of it"), 이를 점검하는 여섯 문항 readiness 체크리스트와 지난 12개월의 시장 신호 네 가지를 덧붙인다. 마지막 안내는 세 pillar 중 design token을 가장 먼저 바로잡으라는 것이다.

이 페이지는 허브 페이지 한 장을 근거로 한다. 각 pillar의 심층 해설, 여섯 단계 구조 가이드, 에이전트 파일 템플릿 팩의 본문은 하위 페이지에 있어 수집 범위 밖이다.

## 배경

### 허브의 위치

이 허브는 DesignSystems.one 랜딩 페이지([[etc/designsystems-one-2026-design-systems-explained-gallery-guides]])가 제시하는 네 가지 진입 경로 중 네 번째, "I'm making ours AI-ready"가 가리키는 곳이다. 페이지 머리에는 "AI-ready"와 "2026 wedge"라는 표어가 붙어 있다. 즉 사이트는 에이전트 대응을 2026년에 design system 논의를 여는 핵심 쟁점으로 내세운다.

허브 아래에는 여섯 개 하위 페이지와 지표 하나가 연결된다.

| 하위 페이지 | 경로 |
|---|---|
| Structure guide | `/ai-ready/structure` |
| Tokens | `/ai-ready/tokens` |
| MCP servers | `/ai-ready/mcp` |
| Components | `/ai-ready/components` |
| Agent files | `/ai-ready/agent-files` |
| Skills | `/ai-ready/skills` |
| Agent-Ready Index | `/ai-ready/systems` |

Agent-Ready Index는 별도 페이지로 수집했다([[etc/designsystems-one-2026-agent-ready-design-systems-index-who]]).

### 생성에서 통합으로

허브가 말하는 병목 이동은 두 해의 질문을 대비해 설명된다.

| 시점 | 질문 | 답 |
|---|---|---|
| 2023년 | LLM이 쓸 만한 UI를 생성할 수 있는가 | 예 |
| 2026년 | LLM이 생성하는 대상 design system이 그 결과를 drift 없이 소비할 수 있는가 | 거의 언제나 아니오 |

drift는 에이전트가 만든 코드가 design system의 정의에서 조금씩 벗어나는 현상을 이 페이지에서 가리키는 말이다. 허브는 이 문제를 모델 성능의 한계로 보지 않는다. 에이전트가 읽을 수 있는 형태로 design system이 제공되지 않는 것이 원인이며, 따라서 고쳐야 할 쪽은 design system이다.

### 빠른 팀과 나머지 팀

허브는 2026년에 가장 빠르게 출시하는 팀의 공통점을 세 가지로 든다.

1. 아무것도 렌더링하지 않고 에이전트가 파싱할 수 있는 design token
2. 에이전트가 type error 없이는 어길 수 없는 prop 형태를 가진 컴포넌트
3. 세션 중에 에이전트가 호출할 수 있는 조회 창구(보통 MCP)

반면 나머지 팀은 Storybook URL을 복사해 붙이고, 에이전트가 `color="dark-blue-2"` 같은 존재하지 않는 값을 지어내는 것을 지켜본다고 묘사한다. 이 세 공통점이 그대로 뒤의 세 pillar가 된다.

허브는 스스로를 벤더 홍보가 아니라고 규정한다. 다루는 대상은 실제 구성 요소, 작동하는 형태, 작동하지 않는 anti-pattern, 그리고 기존 시스템을 버리지 않고 마이그레이션하는 방법이다.

## 핵심 개념

design token은 색, 간격, 글꼴 크기 같은 디자인 값에 이름을 붙여 코드와 디자인 도구가 공유하는 단위다. 허브의 첫 번째 pillar는 이 design token을 에이전트가 렌더링 없이 파일에서 바로 읽을 수 있는 형식으로 두는 것이다. 예를 들어 에이전트가 #4F46E5 같은 색 값을 지어내는 대신 `var(--color-bg-accent)`를 쓰게 하는 것이 목표다.

MCP는 모델이 외부 도구와 데이터 원천에 표준화된 방식으로 접근하게 하는 프로토콜이다. 두 번째 pillar는 design token, 컴포넌트, 패턴을 MCP server로 노출해 에이전트가 편집 시점에 조회하게 하는 것이다. 허브는 에이전트가 Storybook URL을 받아도 실제로는 그 내용을 읽지 못한다는 점을 MCP가 필요한 이유로 든다.

component contract는 컴포넌트가 받는 prop의 형태를 type으로 고정해, 에이전트가 틀린 값을 넣으면 type 검사에서 바로 오류가 나게 만든 계약을 뜻한다. 세 번째 pillar의 핵심이 이 계약이다.

discriminated union은 허용 값을 열거한 TypeScript type이다. 허브의 예시에서 `size?: string`으로 열어 두면 에이전트가 `size='huge'`를 지어내지만, `size: 'sm' | 'md' | 'lg'`로 제한하면 type 검사가 그 값을 거부한다.

semantic token은 겉모습이 아니라 용도를 이름에 담은 design token이다. `color.brand.500`은 색의 단계를 말할 뿐이라 에이전트에게는 추측의 대상이지만, `color.action.primary`는 어디에 쓰는지를 알려 주는 계약이 된다. 허브는 semantic design token을 primitive design token 위에 층으로 두라고 권한다.

## 방법

### 세 pillar의 적층 구조

허브는 세 pillar를 아래에서 위로 쌓이는 층으로 그린다. 가장 아래 design token이 기반(substrate)이고, 그 위에 조회 창구인 MCP server(query), 맨 위에 계약인 컴포넌트(contract)가 놓인다.

![[assets/designsystems-one-2026-ai-ready-design-systems-make-yours/fig02.png]]
*Figure 2: 세 pillar의 적층 구조. 아래층을 빼면 스택 전체가 무너진다는 뜻의 캡션이 달려 있다 (DesignSystems.one 2026)*

| 층 | pillar | 역할 | 도식의 예시 |
|---|---|---|---|
| 01 | Tokens | substrate | `var(--color-*)` |
| 02 | MCP server | query | `list_tokens`, `get_*` |
| 03 | Components | contract | typed props |

도식 캡션은 "The three pillars compound, pull the token base and the stack falls"(원문은 em dash로 연결)다. 즉 design token 기반을 빼면 위의 두 층이 제 역할을 하지 못한다.

### pillar 간 의존 관계

허브는 세 pillar 중 하나만 빠져도 나머지가 효과를 잃는 이유를 경우별로 설명한다. 이 설명이 "셋을 함께 갖추거나 아무것도 갖추지 않은 것과 같다"는 주장의 근거다.

| 갖춘 것 | 빠진 것 | 결과 |
|---|---|---|
| machine-readable design token | MCP server | 에이전트가 design token을 스스로 찾아내야 한다 |
| MCP server | typed 컴포넌트 | 에이전트가 prop 값을 지어낼 수 있다 |
| typed 컴포넌트 | machine-readable design token | 출력에 hex 리터럴이 섞인다 |

따라서 허브는 전체 스택이 함께 출시되거나 출시되지 않는다고 결론짓는다. 다만 마지막 안내에서는 design token을 먼저 바로잡고 나머지를 층으로 쌓으라고 권해, 동시 완성보다는 순서를 둔 구축을 제시한다.

### 세 pillar의 내용

세 pillar는 각각 설명문과 핵심 항목 세 가지로 소개되며, 모두 심층 해설 페이지가 공개되었음을 뜻하는 "Shipped" 배지가 붙어 있다.

![[assets/designsystems-one-2026-ai-ready-design-systems-make-yours/fig03.png]]
*Figure 3: 세 pillar 카드. 각 카드 아래에 핵심 항목 세 가지가 체크 목록으로 붙는다 (DesignSystems.one 2026)*

**pillar 01. Tokens that LLMs can read.** W3C Design Tokens Format, 시맨틱 네이밍, 기계가 파싱할 수 있는 type을 갖춘 design token이다. 핵심 항목은 다음과 같다.

- W3C 규격 `.tokens.json`을 진실의 원천(source of truth)으로 삼는다.
- semantic design token을 primitive design token 위에 층으로 둔다.
- design token마다 JSDoc 또는 TSDoc 주석을 달아 에이전트가 의도를 볼 수 있게 한다.

**pillar 02. MCP servers for design systems.** design token, 컴포넌트, 패턴을 MCP로 노출해 에이전트가 편집 시점에 조회하게 한다. 허브가 제시하는 MCP server의 구성은 tool과 resource로 나뉜다.

| 구분 | 내용 |
|---|---|
| 에이전트가 호출하는 tool | list-tokens, find-component, get-pattern |
| 에이전트가 읽는 resource | design token 카탈로그, 컴포넌트 계약, 결정 기록 |
| 참고 구현 | TypeScript 200줄 |

**pillar 03. Components agents can use without drift.** TypeScript 우선 계약, 예측 가능한 prop 형태, 기계가 읽는 문서, registry endpoint를 갖춘 컴포넌트다. 허브는 이것을 50개 메시지 규모의 리팩터 세션을 견디는 컴포넌트 형태로 소개한다. 핵심 항목은 다음과 같다.

- 열린 prop 대신 discriminated-union prop API를 쓴다.
- shadcn 방식 registry를 배포 채널로 쓴다.
- type 검사를 거친 코드 예제가 든 MDX 문서를 둔다.

### readiness 체크리스트

허브는 현재의 design system으로 바로 점검할 수 있는 여섯 질문을 제시한다. 하나라도 "아니오"면 할 일이 있다는 기준이며, 이 질문들은 이상이 아니라 에이전트가 쓸 수 있는 시스템과 에이전트가 환각으로 메워야 하는 시스템을 가르는 실무 기준이라고 적는다.

![[assets/designsystems-one-2026-ai-ready-design-systems-make-yours/fig04.png]]
*Figure 4: readiness 체크리스트 여섯 질문 (DesignSystems.one 2026)*

| 번호 | 질문 | 대응 pillar | 판단 근거 |
|---|---|---|---|
| 01 | 새 Cursor 세션이 Storybook을 탐색하지 않고 design token을 찾을 수 있는가 | Tokens | 저장소 안에 파싱 가능한 파일(`.tokens.json`, 이름 붙은 변수를 담은 `tokens.css`, TypeScript export)이 있어야 한다. "문서 사이트를 읽어야 한다"면 이미 실패다 |
| 02 | design token 이름이 겉모습이 아니라 의미를 알려 주는가 | Tokens | `color.brand.500`은 추측, `color.action.primary`는 계약이다 |
| 03 | 에이전트가 보유 컴포넌트와 정확한 prop 형태를 나열할 수 있는가 | Components | `src/` 폴더를 `<Button`으로 grep해야 한다면 올바른 prop을 고를 근거가 약하다 |
| 04 | 조합 패턴이 Figma 스크린샷이 아니라 코드 예제로 문서화되어 있는가 | Components | 이미지는 겉모습 해석을 돕고 코드 예제는 정확한 API와 동작을 준다. 둘을 짝지어라 |
| 05 | 에이전트가 세션 중에 조회할 수 있게 MCP로 제공되는가 | MCP server | 저장소 파일, 패키지 type, registry, 읽을 수 있는 문서도 유용한 배포 경로다 |
| 06 | 컴포넌트 라이브러리가 variant에 TypeScript discriminated union을 쓰는가 | Components | 제약된 API만 자동 편집을 견딘다 |

대응 pillar 열은 이 페이지가 질문 내용을 기준으로 붙인 분류다. 여섯 문항 중 둘이 design token, 하나가 MCP server, 셋이 컴포넌트에 관한 것이다.

허브는 대부분의 팀이 첫 감사에서 여섯 중 셋을 통과하지 못하며, 그것이 정상이고 고칠 수 있다고 덧붙인다. 05번 질문의 설명은 MCP가 유일한 경로가 아니라고 명시해, pillar 구성이 MCP를 필수 요소로 두는 것과 균형을 맞춘다.

### 입문 자료 두 가지

허브 상단에는 처음 시작하는 독자를 위한 자료 두 개가 걸려 있다.

| 자료 | 내용 |
|---|---|
| How to structure your design system for AI | 여섯 단계, 단계마다 도식 하나. design token, 네이밍, LLM이 읽을 수 있는 문서를 구축 순서대로 다룬다. 목표는 "the agent guesses"에서 "the agent uses your system"으로 옮기는 것이다 |
| What agents actually read (무료) | Cursor, Claude Code, Copilot이 어떤 파일을 어떤 순서로 로드하는지 정리하고, AGENTS.md, CLAUDE.md, SKILL.md 등 채워 쓰는 템플릿 9종을 CC0로 제공한다 |

두 번째 자료가 다루는 AGENTS.md와 CLAUDE.md는 지시 파일(instruction file), 즉 에이전트가 작업을 시작할 때 읽는 진입 지시를 담은 파일이다. 허브는 design system을 에이전트에 전달하는 경로로 MCP server 외에 이런 파일도 함께 다룬다.

## 시장 신호

허브는 AI-readiness가 "앞을 내다본 있으면 좋은 것"에서 "향후 18개월의 기본 조건(table stakes)"으로 옮겨 갔다는 근거로 지난 12개월의 신호 네 가지를 든다.

| 신호 | 내용 | 시사점 |
|---|---|---|
| shadcn/ui | 컴포넌트를 평범한 TSX로 저장소 안에 넣어 준다. 에이전트가 읽고 고치며 틀리면 type error를 받는다 | 2026년 신규 구축의 기본값. 우연히 AI-native가 된 유일한 라이브러리라는 점이 큰 이유다 |
| The Agent-Ready Index | 2026-09-04에 각 시스템의 저장소 트리를 읽는 방식으로 재감사했다 | 37개 중 6개만 확인된 DTCG design token을, 3개만 Figma Code Connect를 공개한다. 업계가 말하는 것보다 적다 |
| Figma Make, v0, Lovable | 셋 다 프롬프트에서 UI를 생성한다 | 받는 쪽 design system이 machine-readable하지 않으면 좋은 결과를 내지 못한다 |
| Cursor, Claude Code, Cline | MCP를 지원하는 편집기로 tool 호출, resource 읽기, server 조회가 가능하다 | design system MCP server가 있으면 환각 대신 맞는 답을 얻는다 |

Agent-Ready Index 신호에는 세부가 더 있다. 저장소 트리를 직접 읽었으므로 부재도 증거로 센다. Polaris와 Spectrum은 DTCG와 Code Connect 두 신호에서 자주 거론되지만 규격 이전 형식이거나 전체 트리에 없었다. 또한 185칸 중 48칸이 아직 unknown이다. 185칸은 37개 시스템에 신호 5개를 곱한 값이다.

생성 도구와 편집기 두 신호는 같은 결론을 서로 다른 방향에서 뒷받침한다. 생성 도구의 경우 받는 design system이 준비되지 않으면 결과가 나쁘고, 편집기의 경우 MCP server가 있으면 결과가 좋아진다. 즉 두 신호 모두 병목이 생성에서 통합으로 옮겨 갔다는 허브의 첫 진단을 지지한다.

## 권장 순서

허브의 마지막 절은 "Pillar 01 is the foundation. Read it first."다. design token이 기반이므로 먼저 바로잡으라는 권고이며, 그 이유를 두 가지로 든다.

- design token 카탈로그가 없는 MCP server는 제공할 것이 없다.
- semantic design token이 없는 typed 컴포넌트는 여전히 hex 값을 흘린다.

따라서 권장 순서는 design token 형태를 먼저 정하고 그 위에 MCP server와 컴포넌트 계약을 쌓는 것이다. 절 끝의 링크는 pillar 01 해설, 사이트의 W3C design token 생성기(`/tools/token-generator`), 구축 playbook 세 가지다. 이 순서는 랜딩 페이지 playbook의 원칙 "foundations first, tokens before themes"와도 일치한다.

## 수치 정리

허브는 실험 결과가 아니라 가이드이므로 수치는 대부분 구성 규모다.

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

## 한계

- **허브 한 장만 수집했다.** 세 pillar의 심층 해설, 여섯 단계 구조 가이드, Agent files 팩, Skills 페이지의 본문은 없다. 200줄 MCP 참고 구현의 코드도 이 자료에는 없다.
- **정량 근거가 약하다.** "대부분의 팀이 셋을 통과하지 못한다", "가장 빠르게 출시하는 팀의 공통점" 같은 서술은 조사 방법이나 표본이 제시되지 않은 저자의 관찰이다.
- **자기 도구로 이어지는 구조.** 마무리 안내가 사이트 자체 Token Generator와 playbook으로 이어진다. 허브는 벤더 홍보가 아니라고 밝히지만 사이트 제품을 권하는 구조임은 감안해야 한다.
- **전달 수단별 비용을 다루지 않는다.** pillar 구성은 MCP server를 필수 요소로 두지만, [[agents/hall-2026-atlassians-design-md-is-here]]의 실측처럼 MCP server, 스킬, DESIGN.md는 토큰 비용과 컨텍스트 확보율이 서로 다르다. 허브에는 이런 비교가 없다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| 2026 wedge | 사이트가 AI-ready 전환을 2026년의 핵심 쟁점으로 내세우며 붙인 이름 |
| machine-parseable token | 렌더링 없이 에이전트가 파일에서 바로 읽을 수 있는 형식(`.tokens.json`, `tokens.css`, TypeScript export)의 design token |
| semantic token | `color.action.primary`처럼 겉모습이 아니라 용도를 이름에 담은 design token |
| component contract | prop 형태를 type으로 고정해 에이전트가 type error 없이는 어길 수 없게 한 컴포넌트 계약 |
| discriminated union | 허용 값을 열거한 TypeScript type. 지어낸 값을 type 검사에서 거부한다 |
| table stakes | 경쟁에 참여하기 위한 기본 조건 |

## 관련 페이지

- [[etc/designsystems-one-2026-design-systems-explained-gallery-guides]]: 같은 사이트의 랜딩 페이지. 이 허브를 네 번째 진입 경로로 소개한다
- [[etc/designsystems-one-2026-agent-ready-design-systems-index-who]]: 같은 사이트의 Agent-Ready Index. 허브의 두 번째 신호가 요약하는 감사의 원자료다
- [[agents/google-labs-code-design-md]]: design system을 DESIGN.md 파일 하나로 에이전트에 넘기는 규격. design token과 산문을 한 파일에 담는다는 점이 pillar 01과 다르다
- [[agents/hall-2026-atlassians-design-md-is-here]]: Atlassian에서 DESIGN.md, MCP server, 스킬을 실측 비교한 글. pillar 02의 효과를 수치로 보여 준다
- [[overviews/design-md-overview]]: DESIGN.md, MCP server, Agent Skills의 로딩 방식과 토큰 비용 비교
