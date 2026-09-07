---
title: "Atlassian's DESIGN.md is here: what we learned testing portable design context in practice"
type: article
year: 2026
category: agents
source: hall-2026-atlassians-design-md-is-here.md
raw_path: raw/articles/hall-2026-atlassians-design-md-is-here.md
raw_filename: "hall-2026-atlassians-design-md-is-here.md"
source_collection: external
author: "Kylor Hall, Andrew Campbell"
url: "https://www.atlassian.com/blog/how-we-build/atlassians-design-md-is-here-what-we-learned-testing-portable-design-context-in-practice"
publisher: "Atlassian Blog (How We Build)"
publication_date: "2026-06-15"
tags: [design-md, design-system, mcp, agent-skills, ui-generation, context-engineering, token-cost, atlassian-design-system, portable-context, vibe-coding]
---

## 요약

Atlassian의 디자인 시스템 팀이 Google의 이식용 디자인 컨텍스트 포맷 DESIGN.md를 자사 production 환경에서 실제로 써 보고 결과를 공개한 현장 보고다. 저자는 Kylor Hall(Principal Prompt Engineer)과 Andrew Campbell(Senior Design Technologist)이며, 2026년 6월 15일 Atlassian Blog의 "How We Build" 시리즈에 실렸다.

이 페이지는 규격 자체를 설명하는 자료가 아니라 도입 사례와 실측 결과를 다루는 해설 자료다. DESIGN.md 포맷 스펙과 CLI, 검사 규칙은 규격 본체 저장소를 정리한 [[agents/google-labs-code-design-md]]가 담당한다. 여기서는 그 규격을 이미 성숙한 디자인 시스템을 가진 조직이 production에 넣었을 때 무엇이 일어났는지를 다룬다.

저자들의 결론은 환경에 따라 둘로 갈린다. 기존 design token과 컴포넌트 라이브러리가 이미 갖추어진 production 코드베이스에서는 DESIGN.md가 ADS MCP server나 ADS Skill보다 모든 측정 항목에서 뒤처졌다. 평균 토큰 사용량은 721만으로 MCP의 375만의 약 1.9배였다. 반면 기존 디자인 시스템 출력물을 쓸 수 없거나 실용적이지 않은 환경, 즉 blue-sky 프로토타이핑과 고객 theming과 도구 간 이식에서는 DESIGN.md가 여전히 값어치를 한다고 본다.

핵심 명제는 대체 관계의 부정이다. DESIGN.md는 MCP나 스킬 같은 풍부한 도구 계층의 대체재가 아니라 디자인 시스템의 snapshot이자 이식 포맷이라는 것이다.

## 배경

### AI가 생성한 UI의 slop

이 기사의 출발점은 컨텍스트 없이 AI가 사용자 인터페이스를 만들 때 나오는 결과물의 품질 문제다. 기능은 동작하지만 시각적 정체성과 의도된 디자인 결정이 빠져 있고, 디자인 커뮤니티는 이런 출력을 slop이라고 부른다.

원인은 정보 부재에 있다. 브랜드가 어떤 컴포넌트와 패턴을 쓰는지 모르는 AI는 학습 분포의 generic한 평균값으로 회귀한다. 따라서 결과물은 어느 제품에 붙여도 어색하지 않지만 어느 제품의 것도 아닌 화면이 된다.

### Atlassian이 먼저 만들어 둔 두 경로

Atlassian은 DESIGN.md가 주목받기 전에 이미 자체 대응책을 운영하고 있었다. 에이전트에 풍부한 디자인 컨텍스트를 주는 두 가지 경로다.

| 경로 | 형태 | 기사가 밝힌 성과 |
|---|---|---|
| ADS MCP server | tool call로 컨텍스트를 제공하는 서버 | 토큰 비용을 줄이고 생성 품질을 높였다 |
| AI 스킬(ADS Skill) | 사용법과 코딩 표준을 담은 상세 스킬 | 같은 효과를 수천 명 규모의 사내 product builder에게서 확인했다 |

두 경로의 성과 서술은 Atlassian 자신의 보고다. 기사는 외부 검증 결과가 아니라 사내 운영 경험으로 이를 제시한다.

### DESIGN.md의 등장

DESIGN.md는 그 뒤에 나타난 외부 규격이다. 기사의 소개에 따르면 Google이 자사 Stitch 디자인 도구용으로 만들어 오픈소스로 공개한 Markdown 포맷이며, AI가 생성한 UI의 slop에 대응하는 이식 가능한 해법으로 최근 주목을 받았다.

따라서 이 기사가 답하려는 질문은 명확하다. 이미 MCP server와 스킬을 갖춘 조직에게 DESIGN.md는 무엇을 추가로 주는가, 그리고 무엇을 대체할 수 있는가다.

## 핵심 개념

**slop**은 컨텍스트가 부족한 상태에서 AI가 생성한 UI 출력을 가리킨다. 동작은 하지만 브랜드 고유의 시각 언어와 의도된 디자인 결정이 없는 상태를 뜻하며, 이 기사 전체가 겨누는 문제다.

**design token**은 색과 간격, 타이포그래피 같은 디자인 값에 이름을 붙여 관리하는 단위다. 이 페이지에서는 LLM이 소비하는 토큰과 구별하기 위해 디자인 값 쪽만 원어 design token으로 적고, 비용 단위는 토큰으로 적는다.

**on-demand 로드**는 필요한 컨텍스트를 필요한 시점에만 가져오는 방식이다. MCP server가 이 방식을 쓰며, 에이전트가 tool call로 요청한 항목만 컨텍스트에 올라간다. tool call은 모델이 도구 하나를 실제로 호출하는 한 번의 실행 단위다.

**일괄 로드**는 파일 하나를 통째로 컨텍스트에 넣는 방식이다. DESIGN.md가 이 방식을 쓰며, 쓰지 않을 항목까지 함께 올라간다는 점이 이 기사의 첫 번째 한계로 이어진다.

**intent 포맷**은 기사가 DESIGN.md의 성격을 규정한 말이다. 구현 전체를 기술하는 명세가 아니라 무엇을 의도했는지를 담는 문서라는 뜻이다.

**theming**은 같은 컴포넌트 집합에 다른 색 체계를 입혀 여러 외관을 만드는 기능이다. dark mode와 고객사별 브랜드 외관이 여기에 해당하고, 기사 시점의 DESIGN.md 표준은 이 기능을 지원하지 않는다.

**blue-sky 프로토타이핑**은 기존 코드베이스나 tech stack 제약 없이 백지에서 화면을 빠르게 만들어 보는 작업을 뜻한다. 이 기사가 DESIGN.md의 값어치를 인정하는 대표적 자리다.

## 방법

### DESIGN.md 포맷의 구성과 경계

기사는 규격을 두 개의 구성 요소와 세 개의 배제 항목으로 요약한다. 무엇이 없는지를 함께 밝히는 편이 성격 파악에 유용하기 때문이다.

| 구분 | 항목 | 내용 |
|---|---|---|
| 담는 것 | machine-readable semantic token | YAML frontmatter에 design token 값을 기계가 읽을 수 있는 형태로 담는다 |
| 담는 것 | design rationale | 시각 스타일을 설명하는 Markdown prose다. 사람과 에이전트가 함께 읽는 부분이다 |
| 담지 않는 것 | 코드 라이브러리 | production 디자인 시스템의 완전한 기술 명세가 아니다 |
| 담지 않는 것 | linter | 코딩 표준을 실제로 강제하는 검사 규칙이 빠진다 |
| 담지 않는 것 | 상세 Figma 스펙 | 세부 디자인 스펙이 빠진다 |

배제 목록이 뒤에서 중요해진다. linter가 없다는 점은 세 번째 한계에서 MCP와 스킬의 우위를 설명하는 근거가 되고, 완전한 기술 명세가 아니라는 점은 두 번째 한계의 전제가 된다.

기사가 규격을 이 수준에서만 다룬다는 점도 함께 기억해 둘 만하다. token 스키마의 상세 필드나 검증 CLI 같은 규격 내부 사항은 이 기사의 관심 대상이 아니며, [[agents/google-labs-code-design-md]]가 그 부분을 다룬다.

### 컨텍스트 전달 세 경로

비교의 대상은 세 가지 전달 방식이다. 구분 기준은 컨텍스트가 언제 로드되는가다.

| 방식 | 로딩 시점 | 성격 |
|---|---|---|
| ADS MCP server | tool call로 on-demand 로드 | 필요한 항목만 그때그때 가져온다. 수백 개 아이콘과 semantic token 중 쓰지 않는 것을 컨텍스트에 올리지 않는다 |
| ADS Skill | 스킬 활성화 시 로드 | 기존 시스템 사용법을 담은 instruction manual과 코딩 표준을 강제하는 lint rule을 함께 제공한다 |
| DESIGN.md | 파일 전체 일괄 로드 | 이식 가능한 단일 Markdown snapshot이다. 모든 내용을 한 번에 컨텍스트로 올린다 |

MCP server와 ADS Skill은 접근 방식이 다르지만 목적은 같다. 에이전트가 기존 시스템을 새로 만드는 대신 사용하게 만드는 것이다. DESIGN.md만 목적이 다르다. 시스템을 옮겨 심을 수 있게 만드는 데 초점이 있다.

### 규모의 비대칭

세 경로의 성능 차이를 이해하려면 담아야 하는 정보량의 차이를 먼저 봐야 한다. 디자인 시스템은 수천 개의 view와 파일과 컴포넌트에 걸친 business guidance를 담고 있고, 그 전부를 Markdown 파일 하나에 넣을 수는 없다.

| 항목 | MCP server와 스킬 | DESIGN.md |
|---|---|---|
| 가이드 분량 | 약 2.5 MB의 agent-readable 가이드 | 약 80 KB |
| 토큰 환산 | on-demand 로드라 전량이 컨텍스트에 올라가지 않는다 | frontmatter를 제외하고 약 10,700 토큰 |
| 로드 방식 | 요청한 부분만 | 전량 |

같은 디자인 시스템을 약 2.5 MB에서 약 80 KB로 줄이면 부피가 약 3% 수준으로 압축된다. 이 압축률이 뒤에 나오는 두 번째 한계의 원인이다.

### Atlassian DESIGN.md 생성 절차

Atlassian은 DESIGN.md를 별도 작업으로 새로 쓰지 않았다. MCP server와 AI 스킬을 떠받치는 기존 structured content 파이프라인에서 생성했다.

| 단계 | 내용 |
|---|---|
| 1. 기존 파이프라인 재사용 | MCP server와 스킬의 원천인 structured content 파이프라인에서 DESIGN.md를 생성했다 |
| 2. vibe coding 도구 시험 | 흔히 쓰이는 vibe coding 도구에 넣어 실제 생성 결과를 확인했다 |
| 3. stricter guidance 보강 | 시험에서 자주 나타난 실수에 대해 더 엄격한 지침을 파일에 덧붙였다 |

같은 원천에서 세 산출물이 나온다는 점이 이 절차의 특징이다. 따라서 이 기사의 비교는 서로 다른 팀이 만든 서로 다른 품질의 자료를 견주는 것이 아니라, 같은 내용을 다른 전달 방식에 담았을 때의 차이를 재는 성격을 갖는다.

### Team '26 키노트 검증

포맷은 Atlassian의 Team '26 키노트에서 시험되었다. 그 자리에서 Figma Make가 Teamwork Graph를 소재로 커스텀 대시보드를 생성했다. Teamwork Graph는 Atlassian의 조직 데이터 그래프다.

결과는 DESIGN.md가 generic 출력을 Atlassian 제품으로 알아볼 수 있는 인터페이스로 바꾸어 놓았다는 것이다. 기사는 그 변화가 나타난 시각 속성을 다섯 가지로 열거한다.

| 시각 속성 | 원문 표기 | 설명 |
|---|---|---|
| 색 | color | 팔레트가 브랜드 색으로 맞춰졌다 |
| 간격 | spacing | 여백 체계가 시스템 값으로 맞춰졌다 |
| 형태 | shape | 모서리 처리 같은 형태 속성이 맞춰졌다 |
| 타이포그래피 | typography | 서체와 크기 체계가 맞춰졌다 |
| 그림자 깊이 | elevation | 시각적 층위 표현이 맞춰졌다 |

이 검증은 blue-sky 조건에 가깝다는 점을 유념할 필요가 있다. 기존 코드베이스에 붙이는 작업이 아니라 새 대시보드를 생성하는 상황이었고, 뒤에 나오는 벤치마크는 조건이 다르다.

## 결과

### 네 방식 실측 비교

측정 환경은 기존 design token과 컴포넌트 라이브러리가 이미 존재하는 production 코드베이스다. Team '26 데모와 조건이 다른 지점이 여기다. 이 조건에서 DESIGN.md는 MCP server와 스킬보다 뒤처졌다.

| 방식 | 디자인 시스템 컨텍스트 | 평균 토큰 | 평균 시간 | 평균 turn |
|---|---|---|---|---|
| No context | 약 5% | 420만 | 6분 19초 | 43 |
| ADS MCP | 약 80% | 375만 | 5분 1초 | 35.1 |
| ADS Skill | 약 80% | 443만 | 5분 23초 | 36 |
| DESIGN.md | 약 30% | 721만 | 6분 46초 | 45.3 |

### 항목별 관찰

| 항목 | 관찰 |
|---|---|
| 컨텍스트 확보율 | MCP와 스킬이 약 80%로 같고 DESIGN.md는 약 30%에 그친다. 컨텍스트를 전혀 주지 않은 조건은 약 5%다 |
| 평균 토큰 | ADS MCP가 375만으로 가장 적고 DESIGN.md가 721만으로 가장 많다. DESIGN.md는 MCP의 약 1.9배다 |
| ADS Skill의 토큰 | 443만으로 No context의 420만보다 오히려 많다. 다만 시간은 5분 23초로 더 짧고 turn 수도 36회로 더 적다 |
| 평균 시간 | ADS MCP가 5분 1초로 가장 짧고 DESIGN.md가 6분 46초로 가장 길다 |
| 평균 turn | ADS MCP 35.1회가 가장 적고 DESIGN.md 45.3회가 가장 많다 |

가장 눈에 띄는 조합은 DESIGN.md의 위치다. 컨텍스트 확보율은 약 30%로 MCP와 스킬의 절반에 못 미치는데, 토큰과 시간과 turn 수는 세 항목 모두 가장 나쁘다. 즉 컨텍스트를 덜 확보하면서 비용은 더 쓰는 상태다.

비용 항목만 보면 DESIGN.md는 No context 조건보다도 나쁘다. 토큰은 420만에서 721만으로, 시간은 6분 19초에서 6분 46초로, turn 수는 43회에서 45.3회로 모두 늘어난다. 확보한 디자인 시스템 컨텍스트는 약 5%에서 약 30%로 올라갔으므로 얻은 것이 없지는 않지만, production 코드베이스라는 이 측정 조건에서는 컨텍스트 확보의 대가가 세 항목 모두에서 발생한다.

ADS Skill의 토큰 수치도 짚어 둘 만하다. 컨텍스트를 전혀 주지 않은 조건보다 토큰을 더 쓴다. 그러나 시간과 turn 수는 줄어들었으므로, 스킬이 올린 토큰은 낭비가 아니라 반복 시도를 줄이는 데 쓰인 것으로 읽힌다.

저자들은 수치에 단서를 단다. 이 결과는 관찰된 일반적 제약을 반영하지만 확정적인 것으로 보아서는 안 되며, 모델과 프롬프트와 환경이 달라지면 결과도 달라진다는 것이다. 따라서 이 표는 순위표가 아니라 방향 지표로 다루는 편이 적절하다.

### production 3대 한계

저자들은 수치 뒤의 원인을 세 가지로 명명한다.

| 한계 | 한 줄 원인 | 결과 |
|---|---|---|
| 컨텍스트 일괄 로드 | 필요 여부와 무관하게 전량이 올라간다 | 비용 증가, 응답 지연, truncation으로 인한 정확도 저하 |
| 간결성과 디테일의 교환 | 약 2.5 MB를 약 80 KB로 줄여야 한다 | 상세 가이드 유실, 에이전트의 자체 정보 수집 |
| 내부 구현 노출 | 처음부터 다시 만들기 위한 세부까지 드러난다 | 기존 라이브러리 대신 컴포넌트 재생성 |

#### 컨텍스트 일괄 로드

MCP server는 tool call을 통해 관련 컨텍스트만 on-demand로 로드한다. 수백 개 아이콘과 semantic token을 가진 대규모 시스템에서 이 방식은 쓰지 않을 항목이 컨텍스트에 올라가는 것을 피한다.

DESIGN.md는 전부를 동시에 로드한다. 그 결과 세 가지가 함께 나빠진다. 비용이 늘고, 응답이 느려지며, 컨텍스트가 더 이른 시점에 잘려 나가는 truncation이 발생해 정확도가 떨어진다.

세 번째 항목이 특히 중요하다. 토큰을 더 쓰는 것은 비용 문제로 끝나지만, 컨텍스트 앞부분이 잘려 나가면 정확도 자체가 낮아진다. 앞의 표에서 DESIGN.md가 컨텍스트 약 30%만 확보한 것으로 집계된 배경에 이 요인이 있다.

#### 간결성과 디테일의 교환

압축률이 약 3% 수준이므로 버릴 것을 골라야 한다. 기사는 실제로 무엇을 버렸는지 세 항목으로 밝힌다.

| 버려야 했던 항목 | 원문 표기 |
|---|---|
| 50개가 넘는 컴포넌트의 상세 사용 가이드 | detailed usage guidance from 50+ components |
| foundation 가이드 | foundation guidance |
| 사용 빈도가 낮은 다수의 design token | numerous design tokens with lower usage frequency |

이 컨텍스트를 받지 못한 에이전트는 두 방향으로 반응한다. 하나는 정확도가 낮은 결과를 내놓는 것이고, 다른 하나는 컴포넌트 구현을 직접 읽어 스스로 정보를 모으는 것이다.

두 번째 반응이 벤치마크 수치와 이어진다. 에이전트가 파일을 열어 정보를 스스로 모으면 그만큼 tool call과 turn이 늘고 토큰도 늘어난다. DESIGN.md의 turn 수가 45.3회로 가장 많은 것과 같은 방향의 관찰이다.

#### 내부 구현 노출

세 번째 한계는 규격의 설계 목적에서 나온다. DESIGN.md는 디자인 시스템을 밑바닥부터 다시 만들 수 있도록 완전한 구현 세부를 드러낸다. 백지 상태에서는 이 성질이 장점이다.

production 환경에서는 같은 성질이 문제가 된다. 에이전트가 기존 라이브러리를 import해 쓰는 대신 컴포넌트를 재생성하도록 유도하기 때문이다. 그 결과 유지보수 문제가 생기고 코드 리뷰도 어려워진다.

측정에서도 같은 경향이 확인되었다. DESIGN.md는 생성 turn 수의 변동폭이 더 컸고, 기존 컴포넌트를 import하는 대신 재생성하는 쪽으로 기울었다.

저자들은 MCP server와 스킬이 이 문제를 세 가지 방식으로 막는다고 설명한다. 첫째, 기술적 foundation에 grounding한다. grounding은 모델 출력을 외부 근거에 붙들어 매는 것을 뜻한다. 둘째, 기존 시스템 사용법을 알려주는 instruction manual 역할을 한다. 셋째, 코딩 표준을 강제하는 lint rule과 함께 동작하며, 이 강제에는 추가 토큰 소비가 들지 않는다.

## DESIGN.md가 값어치를 하는 자리

production 벤치마크의 결과와 별개로, 저자들은 DESIGN.md의 단순함과 이식성이 유용한 상황을 네 가지 제시한다.

| 시나리오 | 내용 | 단서 |
|---|---|---|
| high-level 아트 디렉션 | 문서화된 시각 방향이 없는 시스템에 유용한 산출물을 제공한다 | frontmatter가 코드베이스에 이미 있는 정보를 중복 기술한다 |
| 낯선 환경에서의 빠른 프로토타이핑 | 전체 tech stack을 구성하지 않고 on-brand UI를 만드는 blue-sky 프로토타이핑에 쓴다 | |
| 디자인 도구와의 상호운용 | pre-built 컴포넌트를 디자인 언어에 맞춰 커스터마이즈하는 도구에 지침을 준다 | |
| adaptive UI를 위한 고객 theming | 고객이 자기 브랜드를 서술하면 AI가 리포트와 차트와 대시보드를 생성한다 | |

네 시나리오는 하나의 조건을 공유한다. 기존 디자인 시스템 출력물을 쓸 수 없거나 실용적이지 않은 환경에서 에이전트가 UI를 생성한다는 것이다.

이 조건은 앞의 벤치마크 환경과 정확히 반대다. 벤치마크는 기존 token과 컴포넌트 라이브러리가 이미 있는 코드베이스에서 측정했고, 그 조건에서는 재생성 유도가 손실로 계산된다. 반대로 쓸 수 있는 라이브러리가 없는 환경에서는 같은 성질이 오히려 필요한 기능이 된다. 따라서 기사의 두 결론은 서로 모순되지 않는다.

## Atlassian 구현이 표준과 갈라진 지점

Atlassian은 자사 DESIGN.md 파일을 [atlassian.design/DESIGN.md](https://atlassian.design/DESIGN.md)에 공개했고, 규격을 지원하는 에이전트에서 사용할 수 있다. 다만 구현은 표준을 그대로 따르지 않는다.

| 항목 | 기사 시점의 표준 | Atlassian 구현 |
|---|---|---|
| 렌더링 컨텍스트 | 컴포넌트 렌더링 컨텍스트를 담을 property가 없다 | 중요한 렌더링 컨텍스트를 제공하는 비표준 property를 추가했다 |
| theming | 현행 표준이 theming을 지원하지 않는다 | dark mode용 별도 variant를 따로 제공한다 |
| 피드백 경로 | 규격 저장소가 GitHub에 있다 | 피드백을 공유했고 일부 제안은 이미 반영되었다 |

두 개의 이탈 항목은 성격이 같다. 표준이 아직 다루지 않는 실전 요구를 각 조직이 비표준 확장으로 메우는 상태다. 저자들이 업계 공동의 표준 형성 참여를 촉구하는 이유도 여기에 있다. 확장이 조직마다 갈라지면 이식성이라는 애초의 목적이 약해지기 때문이다.

기사는 다음 문장으로 마무리한다.

> "The whole ecosystem benefits when design systems are legible to AI ✨"

## 한계

수집본의 범위를 먼저 밝힌다. `raw/articles/`에 보관된 이 자료는 원문 전문이 아니라 요약본이다. frontmatter에 `extractor_tier` 키가 없어 `fetch_article.py` 경로로 수집되지 않았고, 본문이 저자들의 1인칭 서술 대신 제3자 요약 문체로 되어 있으며 원문 문단이 라벨 붙은 불릿으로 압축되어 있다. 원문의 예시 화면이나 코드 예시 같은 세부는 이 수집본에 남아 있지 않으므로, 이 페이지의 서술은 수집본이 전하는 범위로 한정된다.

기사 자체가 밝힌 한계는 네 가지다.

| 한계 | 내용 |
|---|---|
| 벤치마크의 일반화 | 모델과 프롬프트와 환경에 따라 결과가 달라지므로 확정적 수치로 볼 수 없다 |
| theming 미지원 | 현행 DESIGN.md 표준이 theming을 지원하지 않아 dark mode용 별도 variant가 필요했다 |
| 렌더링 컨텍스트 부재 | 표준이 컴포넌트 렌더링 컨텍스트 같은 실전 정보를 담지 못해 비표준 property를 추가해야 했다 |
| frontmatter 중복 | frontmatter가 코드베이스에 이미 있는 정보를 중복 기술한다 |

측정 설계에서 확인할 수 없는 부분도 있다. 기사는 시행 횟수와 대상 과제, 사용 모델을 밝히지 않으며, 평균값만 제시하고 분산은 세 번째 한계의 서술적 언급에서만 다룬다. 또한 표의 네 항목은 컨텍스트 확보율과 토큰, 시간, turn 수이므로 최종 산출물의 디자인 품질 자체는 직접 측정되지 않았다. 정확도에 대한 서술은 벤치마크 표가 아니라 한계 1의 설명에서 나온 것이다.

관점의 위치도 고려할 필요가 있다. 이 기사는 비교 대상 중 두 경로(ADS MCP server와 ADS Skill)를 직접 만든 조직이 자사 환경에서 수행한 측정이다. 결과 해석에서 이 조건을 감안하는 편이 적절하다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| DESIGN.md | Google이 Stitch 디자인 도구용으로 만든 오픈소스 Markdown 포맷. YAML frontmatter의 machine-readable token과 Markdown prose의 design rationale로 구성된 이식용 디자인 컨텍스트 파일 |
| slop | 컨텍스트가 부족한 상태에서 AI가 생성한, 기능은 동작하지만 시각적 정체성과 의도된 디자인 결정이 없는 UI 출력 |
| ADS | Atlassian Design System의 약어 |
| design token | 색과 간격, 타이포그래피 같은 디자인 값에 이름을 붙여 관리하는 단위. LLM의 토큰과 구별해 원어로 적는다 |
| theming | 같은 컴포넌트 집합에 다른 색 체계를 입혀 여러 외관을 만드는 기능. dark mode와 브랜드별 외관이 여기에 해당한다 |
| elevation | 그림자 깊이로 표현하는 시각적 층위. Atlassian 디자인 시스템의 시각 속성 중 하나 |

## 관련 페이지

- [[agents/google-labs-code-design-md]]: 이 기사가 검증 대상으로 삼은 DESIGN.md 규격의 본체 저장소다. 포맷 스펙과 token 스키마, CLI, 검사 규칙은 그 페이지가 담당하고, 이 페이지는 도입 사례와 실측 결과를 담당한다
- [[agents/osmani-2026-agent-skills]]: 스킬을 checkpoint가 있는 워크플로로 보는 관점이다. 이 기사의 ADS Skill 경로가 그 적용 사례에 해당한다
- [[agents/hada-2026-agent-skills]]: Agent Skills를 둘러싼 커뮤니티 논의다
- [[overviews/headroom-context-compression-overview]]: 컨텍스트를 한 번에 올릴지 on-demand로 줄지의 교환 관계를 다룬다. 이 기사의 한계 1과 같은 문제다
