---
title: "Atlassian's DESIGN.md is here: what we learned testing portable design context in practice"
type: article
year: 2026
category: agents
raw_path: raw/articles/hall-2026-atlassians-design-md-is-here.md
raw_filename: "hall-2026-atlassians-design-md-is-here.md"
source_collection: external
author: "Kylor Hall, Andrew Campbell"
url: "https://www.atlassian.com/blog/how-we-build/atlassians-design-md-is-here-what-we-learned-testing-portable-design-context-in-practice"
publisher: "Atlassian Blog (How We Build)"
publication_date: "2026-06-15"
tags: [design-md, design-system, mcp, agent-skills, ui-generation, context-engineering, token-cost, atlassian-design-system, portable-context, vibe-coding]
---

## 한 줄 요약 (One-line Summary)

Atlassian이 자사 Design System(ADS)을 소재로 Google의 이식용 디자인 컨텍스트 포맷 DESIGN.md를 production 환경에서 검증한 현장 보고다. 저자들의 결론은 조건에 따라 둘로 나뉜다. 기존 token과 컴포넌트 라이브러리가 이미 있는 production 코드베이스에서는 DESIGN.md가 MCP server나 스킬보다 뒤처졌고, 특히 토큰 사용량이 MCP의 약 두 배로 측정되었다. 반면 기존 디자인 시스템 출력물을 쓸 수 없는 자리, 즉 blue-sky 프로토타이핑과 고객 theming과 도구 간 이식에서는 DESIGN.md가 여전히 값어치를 한다고 본다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 저자 | Kylor Hall (Principal Prompt Engineer), Andrew Campbell (Senior Design Technologist) |
| 게시일 | 2026-06-15 |
| 매체 | Atlassian Blog, "How We Build" 시리즈 |
| 성격 | 자사 도구와 외부 규격을 비교한 실측 보고 |
| DESIGN.md 배포 | [atlassian.design/DESIGN.md](https://atlassian.design/DESIGN.md) |
| 핵심 명제 | DESIGN.md는 MCP나 스킬 같은 richer tooling의 대체재가 아니라 디자인 시스템의 snapshot이자 이식 포맷이다 |

수집본 관련 주의사항은 5절에 적었다.

## 2. 주요 기여 (Key Contributions)

| 기여 | 내용 |
|---|---|
| 네 방식 실측 벤치마크 공개 | No context, ADS MCP, ADS Skill, DESIGN.md를 디자인 시스템 컨텍스트 확보율과 토큰, 시간, turn 수로 비교한 표를 공개한다 |
| 포맷의 정의와 경계 정리 | YAML frontmatter의 machine-readable token과 Markdown prose의 design rationale, 두 부분으로 이루어진 이식용 파일이라는 점과, 코드 라이브러리와 linter와 상세 Figma 스펙은 담지 않는 intent 포맷이라는 점을 함께 못박는다 |
| production 3대 한계 명명 | 컨텍스트 일괄 로드, 간결성을 위한 디테일 희생, 내부 구현 노출로 인한 컴포넌트 재생성 유발 |
| 유용한 4개 시나리오 도출 | high-level 아트 디렉션, 낯선 환경에서의 빠른 프로토타이핑, 디자인 도구 간 상호운용, 고객 theming |
| 표준 확장 사례 공유 | 렌더링 컨텍스트를 위한 비표준 property와 dark mode 별도 variant로 표준의 공백을 메운 방식, 그리고 GitHub 피드백 반영 과정을 공개한다 |

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 문제 설정, AI가 생성한 UI의 slop

컨텍스트 없이 AI가 사용자 인터페이스를 생성하면 기능은 동작하지만 시각적 정체성과 의도된 디자인 결정이 빠진 출력이 나온다. 디자인 커뮤니티는 이 결과물을 slop이라고 부른다. 브랜드의 컴포넌트와 패턴을 모르는 AI는 generic한 평균값으로 회귀한다는 것이 저자들의 진단이다.

Atlassian의 디자인 시스템 팀은 이 문제에 대응해 에이전트에 풍부한 디자인 컨텍스트를 주는 도구를 먼저 만들어 두었다. ADS MCP server와 상세한 AI 스킬 두 가지다. 저자들은 이 두 경로가 수천 명 규모의 사내 product builder에게서 토큰 비용을 줄이고 생성 품질을 높였다고 적는다.

DESIGN.md는 그 뒤에 등장했다. Google이 자사 Stitch 디자인 도구용으로 만들어 오픈소스로 공개한 Markdown 포맷이고, AI가 생성한 UI의 slop에 대응하는 이식 가능한 해법으로 최근 주목을 받았다는 것이 기사의 소개다.

### 3.2 DESIGN.md 포맷의 구성과 경계

기사는 규격을 두 부분과 세 가지 배제 항목으로 요약한다.

| 구분 | 항목 | 내용 |
|---|---|---|
| 담는 것 | machine-readable semantic token | YAML frontmatter에 design token 값을 담는다 |
| 담는 것 | design rationale | 시각 스타일을 설명하는 Markdown prose로, 사람과 에이전트가 함께 읽는다 |
| 담지 않는 것 | 코드 라이브러리 | production 디자인 시스템의 완전한 기술 명세가 아니다 |
| 담지 않는 것 | linter | 코딩 표준을 강제하는 검사 규칙이 빠진다 |
| 담지 않는 것 | 상세 Figma 스펙 | 세부 디자인 스펙이 빠진다 |

저자들은 이 경계를 한 문장으로 정리한다. DESIGN.md는 전체 디테일이 아니라 intent를 담는 포맷이다.

### 3.3 세 가지 컨텍스트 전달 방식

| 방식 | 로딩 시점 | 성격 |
|---|---|---|
| ADS MCP server | tool call로 on-demand 로드 | 필요한 것만 그때그때 가져온다. 수백 개 아이콘과 semantic token 중 쓰지 않는 항목을 컨텍스트에 올리지 않는다 |
| ADS Skill | 스킬 활성화 시 로드 | 기존 시스템 사용법을 담은 instruction manual과 코딩 표준을 강제하는 lint rule을 함께 제공한다 |
| DESIGN.md | 파일 전체 일괄 로드 | 이식 가능한 단일 Markdown snapshot이다. 모든 내용을 한 번에 컨텍스트로 올린다 |

규모 차이가 이 비교의 전제다. MCP server와 스킬은 약 2.5 MB의 agent-readable 가이드를 on-demand로 제공한다. DESIGN.md는 같은 내용을 약 80 KB, frontmatter를 제외하면 약 10,700 토큰으로 압축해야 한다.

### 3.4 Atlassian DESIGN.md의 생성 절차

Atlassian은 새 파이프라인을 만들지 않고 기존 자산을 재사용했다. MCP server와 AI 스킬을 떠받치는 structured content 파이프라인에서 자사 DESIGN.md를 생성했다. 그 뒤 흔히 쓰이는 vibe coding 도구에서 시험하며 자주 발생하는 실수에 대한 stricter guidance를 덧붙였다.

### 3.5 Team '26 키노트 검증

포맷은 Atlassian의 Team '26 키노트에서 시험되었다. 그 자리에서 Figma Make가 Teamwork Graph를 소재로 커스텀 대시보드를 생성했다. 결과는 DESIGN.md가 generic 출력을 Atlassian 제품으로 알아볼 수 있는 인터페이스로 바꾸어 놓았다는 것이고, 기사는 그 변화가 나타난 시각 속성을 다섯 가지로 열거한다.

| 시각 속성 | 원문 표기 |
|---|---|
| 색 | color |
| 간격 | spacing |
| 형태 | shape |
| 타이포그래피 | typography |
| 그림자 깊이 | elevation |

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

측정 환경은 기존 token과 컴포넌트 라이브러리가 이미 존재하는 production 코드베이스다. 이 조건에서 DESIGN.md는 MCP server와 스킬보다 뒤처졌다.

| 방식 | 디자인 시스템 컨텍스트 | 평균 토큰 | 평균 시간 | 평균 turn |
|---|---|---|---|---|
| No context | 약 5% | 420만 | 6분 19초 | 43 |
| ADS MCP | 약 80% | 375만 | 5분 1초 | 35.1 |
| ADS Skill | 약 80% | 443만 | 5분 23초 | 36 |
| DESIGN.md | 약 30% | 721만 | 6분 46초 | 45.3 |

표를 항목별로 읽으면 다음과 같다.

| 항목 | 관찰 |
|---|---|
| 컨텍스트 확보율 | MCP와 스킬이 약 80%로 같고 DESIGN.md는 약 30%에 그친다. 컨텍스트를 전혀 주지 않은 조건은 약 5%다 |
| 평균 토큰 | ADS MCP가 375만으로 가장 적고 DESIGN.md가 721만으로 가장 많다. DESIGN.md는 MCP의 약 1.9배다 |
| ADS Skill의 토큰 | 443만으로 No context의 420만보다 오히려 많다. 다만 시간과 turn 수는 No context보다 적다 |
| 평균 시간 | ADS MCP가 5분 1초로 가장 짧고 DESIGN.md가 6분 46초로 가장 길다 |
| 평균 turn | ADS MCP 35.1회가 가장 적고 DESIGN.md 45.3회가 가장 많다 |

저자들은 수치에 단서를 단다. 이 결과는 관찰된 일반적 제약을 반영하지만 확정적인 것으로 보아서는 안 되며, 모델과 프롬프트와 환경이 달라지면 결과도 달라진다는 것이다.

### 4.1 한계 1, 컨텍스트를 한 번에 모두 올린다

MCP server는 tool call을 통해 관련 컨텍스트만 on-demand로 로드한다. 수백 개 아이콘과 semantic token을 가진 대규모 시스템에서 이 방식은 불필요한 항목이 컨텍스트에 올라가는 것을 피한다.

DESIGN.md는 전부를 동시에 로드한다. 그 결과 비용이 늘고 응답이 느려지며, 컨텍스트가 더 이른 시점에 잘려 나가는 truncation이 발생해 정확도가 떨어진다.

### 4.2 한계 2, 간결성이 디테일을 요구한다

디자인 시스템은 수천 개의 view와 파일과 컴포넌트에 걸쳐 복잡한 business guidance를 담고 있다. Atlassian의 on-demand MCP server와 스킬이 쓰는 약 2.5 MB를 약 80 KB로 줄이려면 버릴 것을 골라야 한다.

| 버려야 했던 항목 | 원문 표기 |
|---|---|
| 50개가 넘는 컴포넌트의 상세 사용 가이드 | detailed usage guidance from 50+ components |
| foundation 가이드 | foundation guidance |
| 사용 빈도가 낮은 다수의 design token | numerous design tokens with lower usage frequency |

이 컨텍스트가 없는 에이전트는 두 방향으로 반응한다. 정확도가 낮은 결과를 내놓거나, 컴포넌트 구현을 직접 읽어 스스로 정보를 모은다.

### 4.3 한계 3, 규격이 디자인 시스템 내부를 드러낸다

DESIGN.md는 디자인 시스템을 밑바닥부터 다시 만들기 위한 완전한 구현 세부를 드러낸다. production 환경에서는 이 성질이 에이전트로 하여금 기존 라이브러리를 쓰는 대신 컴포넌트를 재생성하도록 유도한다. 그 결과 유지보수 문제가 생기고 코드 리뷰가 어려워진다.

측정에서도 같은 경향이 확인되었다. DESIGN.md는 생성 turn 수의 변동폭이 더 컸고, 기존 컴포넌트를 import하는 대신 재생성하는 쪽으로 기울었다.

MCP server와 스킬은 더 나은 추상화를 제공한다. 기술적 foundation에 grounding하고, 기존 시스템 사용법을 알려주는 instruction manual 역할을 하며, 추가 토큰 소비 없이 코딩 표준을 강제하는 lint rule과 함께 동작한다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

수집본의 범위를 먼저 밝힌다. `raw/articles/`의 이 파일은 원문 전문이 아니라 WebFetch 계열 수집으로 만들어진 요약본이다. frontmatter에 `extractor_tier` 키가 없고, 본문이 1인칭 서술 대신 제3자 요약 문체로 되어 있으며 원문 문단이 라벨 붙은 불릿으로 압축되어 있다. 원문의 예시 코드나 스크린샷 설명 같은 세부는 이 수집본에 남아 있지 않다. 이 페이지의 서술은 수집본이 전하는 범위로 한정된다.

기사 자체가 밝힌 한계는 다음과 같다.

| 한계 | 내용 |
|---|---|
| 벤치마크의 일반화 | 모델과 프롬프트와 환경에 따라 달라지므로 확정적 수치로 볼 수 없다 |
| theming 미지원 | 현행 DESIGN.md 표준이 theming을 지원하지 않아 Atlassian은 dark mode용 별도 variant를 따로 두어야 했다 |
| 렌더링 컨텍스트 부재 | 표준이 컴포넌트 렌더링 컨텍스트 같은 실전 정보를 담지 못해 Atlassian이 비표준 property를 추가했다 |
| frontmatter 중복 | frontmatter가 코드베이스에 이미 있는 정보를 중복 기술한다 |

향후 과제로는 표준 형성에 대한 참여 요청이 있다. Atlassian은 GitHub에 피드백을 공유했고 일부 제안은 이미 반영되었으며, 저자들은 업계 공동의 표준 형성 참여를 촉구한다.

### 5.1 DESIGN.md가 가장 유용한 네 시나리오

| 시나리오 | 내용 | 단서 |
|---|---|---|
| high-level 아트 디렉션 | 문서화된 시각 방향이 없는 시스템에 유용한 산출물을 제공한다 | frontmatter가 코드베이스에 이미 있는 정보를 중복 기술한다 |
| 낯선 환경에서의 빠른 프로토타이핑 | 전체 tech stack을 구성하지 않고 on-brand UI를 만드는 blue-sky 프로토타이핑에 쓴다 | |
| 디자인 도구와의 상호운용 | pre-built 컴포넌트를 디자인 언어에 맞춰 커스터마이즈하는 도구에 지침을 준다 | |
| adaptive UI를 위한 고객 theming | 고객이 자기 브랜드를 서술하면 AI가 리포트와 차트와 대시보드를 생성한다 | |

네 시나리오의 공통점은 하나다. 기존 디자인 시스템 출력물을 쓸 수 없거나 실용적이지 않은 환경에서 에이전트가 UI를 생성한다는 조건이다.

### 5.2 Atlassian 구현이 표준과 갈라진 지점

| 항목 | 표준 | Atlassian 구현 |
|---|---|---|
| 렌더링 컨텍스트 | 관련 property가 없다 | 컴포넌트 렌더링 컨텍스트를 제공하는 비표준 property를 추가했다 |
| theming | 현행 표준이 지원하지 않는다 | dark mode용 별도 variant를 제공한다 |
| 피드백 경로 | | GitHub에 피드백을 공유했고 일부 제안이 이미 반영되었다 |

배포된 파일은 [atlassian.design/DESIGN.md](https://atlassian.design/DESIGN.md)에 있고, 규격을 지원하는 에이전트에서 사용할 수 있다.

기사의 마무리 문장은 다음과 같다.

> "The whole ecosystem benefits when design systems are legible to AI ✨"

## 6. 관련 연구 (Related Work)

| 자료 | 관계 |
|---|---|
| [[agents/google-labs-code-design-md]] | 이 기사가 검증 대상으로 삼은 DESIGN.md 규격의 본체 저장소다. 포맷 스펙과 CLI, 검사 규칙은 그 페이지가 담당한다 |
| [[agents/osmani-2026-agent-skills]] | 스킬을 checkpoint가 있는 워크플로로 보는 관점이다. 이 기사의 ADS Skill 경로가 그 적용 사례에 해당한다 |
| [[agents/hada-2026-agent-skills]] | Agent Skills를 둘러싼 커뮤니티 논의다 |
| [[overviews/headroom-context-compression-overview]] | 컨텍스트를 한 번에 올릴지 on-demand로 줄지의 교환 관계를 다룬다. 이 기사의 한계 1과 같은 문제다 |

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| DESIGN.md | Google이 Stitch 디자인 도구용으로 만든 오픈소스 Markdown 포맷. YAML frontmatter의 machine-readable token과 Markdown prose의 design rationale로 구성된 이식용 디자인 컨텍스트 파일 |
| slop | 컨텍스트가 부족한 상태에서 AI가 생성한, 기능은 동작하지만 시각적 정체성과 의도된 디자인 결정이 없는 UI 출력 |
| ADS | Atlassian Design System |
| design token | 색과 간격, 타이포그래피 같은 디자인 값을 이름 붙여 관리하는 단위. LLM의 토큰과 구별해 원어로 적는다 |
| elevation | 그림자 깊이로 표현하는 시각적 층위. Atlassian 디자인 시스템의 시각 속성 중 하나 |
| theming | 같은 컴포넌트 집합에 다른 색 체계를 입혀 여러 외관을 만드는 기능. dark mode와 브랜드별 외관이 여기에 해당한다 |
| vibe coding | 자연어 프롬프트로 UI나 코드를 즉흥 생성하는 작업 방식 |
| Teamwork Graph | Atlassian의 조직 데이터 그래프. Team '26 데모에서 Figma Make가 이 데이터를 소재로 대시보드를 생성했다 |
