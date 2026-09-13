---
title: "DESIGN.md 포맷과 production 트레이드오프"
type: overview
year: 2026
category: overviews
source_collection: synthesis
sources:
  - anthropic-2025-effective-context-engineering-for-ai.md
  - google-labs-code-design-md.md
  - hall-2026-atlassians-design-md-is-here.md
  - osmani-2026-agent-skills.md
  - hada-2026-agent-skills.md
tags: [design-md, design-system, design-tokens, portable-context, context-engineering, mcp, agent-skills, token-cost, synthesis]
study_path:
  - id: agents/anthropic-2025-effective-context-engineering-for-ai
    note: "컨텍스트를 미리 올릴지 실행 중에 가져올지가 왜 설계 선택인지를 먼저 잡는다. 뒤의 모든 비교가 이 구분 위에서 이루어진다."
  - id: agents/google-labs-code-design-md
    note: "포맷이 무엇을 약속하는지 확인한다. 두 레이어 구조와 산문 우선 철학, 린터 9규칙이 이후 대조의 기준점이 된다."
    prereq: ["agents/anthropic-2025-effective-context-engineering-for-ai"]
  - id: agents/hall-2026-atlassians-design-md-is-here
    note: "같은 약속이 이미 성숙한 디자인 시스템 위에서 어떻게 되는지 실측으로 본다. 네 조건 비교표가 이 페이지의 중심 근거다."
    prereq: ["agents/google-labs-code-design-md"]
  - id: agents/osmani-2026-agent-skills
    note: "on-demand 쪽 수단인 Agent Skills가 같은 비용 문제를 어떤 원칙으로 다루는지 확인한다. progressive disclosure가 그 원칙이다."
    prereq: ["agents/anthropic-2025-effective-context-engineering-for-ai"]
  - id: agents/hada-2026-agent-skills
    note: "그 원칙이 실무에서 어디까지 지켜지는지 듣는다. 800줄 스킬 보고가 이식성과 토큰 비용이 한 성질의 양면임을 보여준다."
    prereq: ["agents/osmani-2026-agent-skills"]
---

## 요약

DESIGN.md는 디자인 시스템을 코딩 에이전트에 넘기기 위해 Markdown 파일 하나로 정의한 포맷이다. 색과 타이포그래피 같은 값을 YAML에 적고 그 값의 근거를 아래 산문에 적으면, 파일을 읽을 수 있는 에이전트는 어디서든 같은 디자인 언어로 화면을 만든다.

이 페이지는 포맷을 정의한 저장소와 그 포맷을 production에서 실측한 보고를 한자리에 놓는다. 개별 자료의 내용 요약은 각 wiki 페이지가 담당하고, 여기서는 같은 성질이 어디서 장점이 되고 어디서 비용이 되는지를 다룬다.

페이지 전체를 관통하는 관찰은 하나다. DESIGN.md의 강점으로 꼽히는 성질과 production에서 지적된 한계가 서로 다른 두 성질이 아니라 같은 한 성질이라는 것이다. 파일 한 장에 의도를 통째로 서술한다는 점이 이식성을 만들고, 같은 점이 토큰 비용과 이른 truncation을 만든다.

표기를 하나 고정해 둔다. 디자인 값을 가리킬 때는 원어 design token으로 적고, 언어 모델이 소비하는 비용 단위만 토큰으로 적는다. 두 단어가 같은 문단에 자주 함께 나오기 때문이다.

## 자료의 역할 분담

커버하는 다섯 편은 상위 원리, 규격, 실측, 대안 수단 네 성격으로 나뉜다. 같은 문제를 다루더라도 답하는 질문이 서로 다르다.

| 역할 | 자료 | 유형 | 이 페이지가 가져오는 것 |
|---|---|---|---|
| 상위 원리 | [[agents/anthropic-2025-effective-context-engineering-for-ai\|Effective Context Engineering]] | article (2025) | attention budget, pre-inference retrieval과 just-in-time의 구분, just-in-time 자체의 비용 |
| 규격 본체 | [[agents/google-labs-code-design-md\|DESIGN.md 저장소]] | repo (2026) | 두 레이어 구조, 산문 우선 철학, CLI 4종과 린터 9규칙, 열린 스키마 |
| production 실측 | [[agents/hall-2026-atlassians-design-md-is-here\|Atlassian's DESIGN.md is here]] | article (2026) | 네 조건 비교 수치, 한계 3종, 값어치를 하는 시나리오 4종, 표준과 갈라진 지점 |
| 대안 수단의 원칙 | [[agents/osmani-2026-agent-skills\|Agent Skills (Osmani)]] | article (2026) | progressive disclosure의 정의와 채택 이유, 수치가 제시되지 않는다는 사실 |
| 대안 수단의 실무 비용 | [[agents/hada-2026-agent-skills\|Agent Skills (GeekNews)]] | article (2026) | 800줄 스킬의 컨텍스트 비용, frontmatter 선행 로드, Markdown 한 장이라는 이식 근거 |

역할이 갈리는 자리가 이 페이지의 작성 규칙도 정한다. 포맷 스펙의 세부는 규격 본체 페이지가, Agent Skills 규격의 세부는 자매 페이지인 [[overviews/agent-skills-overview]]가 담당한다. 여기서는 세 수단을 같은 기준에 올려 비교하는 일만 맡는다.

## 학습 경로

컨텍스트 예산이라는 상위 문제를 먼저 잡고 규격과 실측으로 내려간 뒤 대안 수단으로 옮기는 순서다. 아래 5단계는 frontmatter의 `study_path`와 같은 순서이며, 4단계와 5단계는 3단계를 기다리지 않고 1단계 직후에 읽어도 된다.

1. [[agents/anthropic-2025-effective-context-engineering-for-ai|Effective Context Engineering]]. 컨텍스트를 미리 올릴지 실행 중에 가져올지가 왜 설계 선택인지를 먼저 잡는다. attention budget은 모델이 대량의 컨텍스트를 파싱할 때 끌어다 쓰는 유한한 주의 자원을 뜻한다.
2. [[agents/google-labs-code-design-md|DESIGN.md 저장소]]. 포맷이 무엇을 약속하는지 확인한다. YAML과 산문 두 레이어, 린터 9규칙, 그리고 산문이 스펙의 초점이라는 철학이 이후 대조의 기준점이 된다.
3. [[agents/hall-2026-atlassians-design-md-is-here|Atlassian's DESIGN.md is here]]. 같은 약속이 이미 성숙한 디자인 시스템 위에서 어떻게 되는지 실측으로 본다. 컨텍스트 확보율 약 30%와 평균 721만 토큰이라는 조합이 이 페이지의 중심 근거다.
4. [[agents/osmani-2026-agent-skills|Agent Skills (Osmani)]]. 같은 비용 문제를 on-demand 쪽 수단이 어떤 원칙으로 다루는지 확인한다. progressive disclosure는 필요한 시점에만 정보를 단계적으로 노출하는 설계를 뜻한다.
5. [[agents/hada-2026-agent-skills|Agent Skills (GeekNews)]]. 그 원칙이 실무에서 어디까지 지켜지는지 듣는다. 800줄을 넘는 스킬 보고가 Markdown 한 장이라는 이식 근거와 토큰 비용이 같은 성질의 양면임을 보여준다.

## 컨텍스트 예산이라는 상위 문제

세 수단의 차이는 디자인 도구의 문제이기 전에 컨텍스트 설계의 문제다. [[agents/anthropic-2025-effective-context-engineering-for-ai]]는 LLM의 attention budget이 유한하다는 제약에서 출발해, 좋은 설계란 원하는 결과의 확률을 최대화하는 high-signal 토큰의 최소 집합을 찾는 일이라고 규정한다.

같은 글은 컨텍스트를 확보하는 방식을 세 가지로 나눈다. 추론 전에 미리 올리는 pre-inference retrieval, 실행 중에 tool로 가져오는 just-in-time, 그리고 둘을 섞는 hybrid다. 토큰 수가 늘수록 컨텍스트 안의 정보를 정확히 recall하는 능력이 떨어지는 context rot가 이 구분을 중요하게 만든다.

이 세 방식에 세 수단을 대응시키면 비교의 자리가 잡힌다. DESIGN.md는 파일 전체를 미리 올리므로 pre-inference retrieval의 극단이고, MCP server는 tool call로 요청한 항목만 가져오므로 just-in-time이며, Agent Skills는 활성화 시점에 본문을 올리므로 둘 사이에 있다. 다만 이 대응은 이 페이지의 해석이다. Anthropic의 글은 DESIGN.md나 MCP server를 언급하지 않고 일반 원리만 다룬다.

같은 글이 just-in-time 쪽에도 비용을 단다는 점을 함께 기억해 둘 만하다. 실행 중 탐색은 미리 계산해 둔 조회보다 느리고, tool과 heuristic을 제대로 갖추지 못하면 에이전트가 tool을 잘못 쓰거나 막다른 경로를 따라가며 컨텍스트를 낭비한다. 따라서 on-demand가 언제나 유리하다는 결론은 이 상위 원리에서 나오지 않는다.

## 포맷이 약속하는 것

[[agents/google-labs-code-design-md]]가 정의하는 골격은 두 레이어다. 위쪽 YAML front matter에 design token 값이 들어가고, 아래쪽 Markdown 본문에 그 값을 왜 그렇게 정했고 어디에 쓰고 어디에는 쓰지 않는지가 문장으로 들어간다.

우선순위는 아래쪽에 있다. 저장소의 PHILOSOPHY.md는 생성된 디자인의 품질이 값의 정밀도보다 의도가 얼마나 명확히 서술됐는지에 더 좌우된다고 적고, 산문을 스펙에서 가장 중요한 부분으로 규정한다. "1970년대 대학원 강의 유인물"처럼 구체적인 레퍼런스 한 문장이 수치 열두 개보다 많은 정보를 담는다는 것이 그 근거다. 형용사 나열은 영역만 지정하지만 구체적 레퍼런스는 점을 찍고, 무엇이 아닌지에 해당하는 negative constraint까지 함께 전달하기 때문이다.

규격은 도구도 함께 제공한다. `@google/design.md` 패키지의 명령은 파일을 검증하는 `lint`, 두 버전을 비교하는 `diff`, Tailwind와 W3C DTCG로 변환하는 `export`, 스펙 자체를 출력해 프롬프트에 주입하는 `spec` 네 가지다. 린터가 실행하는 규칙은 9개이며 error는 참조가 해소되지 않는 `broken-ref` 하나뿐이다. 나머지는 WCAG 대비율을 보는 `contrast-ratio`처럼 에이전트가 기본값으로 메울 수 있는 항목이라 warning이나 info에 머문다.

스키마는 닫혀 있지 않다. 표준화된 카테고리는 colors, typography, spacing, rounded, components 다섯 가지이고, motion이나 iconography 같은 그 밖의 영역은 커스텀 키로 확장한다. 린터의 `unknown-key` 규칙은 알려진 키의 오타로 보이는 것만 경고하고 커스텀 확장 키는 조용히 통과시킨다.

## production 실측

### 네 조건 비교

[[agents/hall-2026-atlassians-design-md-is-here]]는 Atlassian Design System을 소재로 네 가지 조건을 나란히 재고 그 표를 공개했다. 이 저장소가 보유한 자료 중 세 수단의 운영 비용을 같은 기준으로 비교한 정량 근거는 이 표 하나뿐이다.

| 조건 | 디자인 시스템 컨텍스트 확보 | 평균 토큰 | 평균 시간 | 평균 turn |
|---|---|---|---|---|
| 컨텍스트 미제공 | 약 5% | 420만 | 6분 19초 | 43 |
| ADS MCP server | 약 80% | 375만 | 5분 1초 | 35.1 |
| ADS Skill | 약 80% | 443만 | 5분 23초 | 36 |
| DESIGN.md | 약 30% | 721만 | 6분 46초 | 45.3 |

측정 조건을 함께 밝혀야 표가 읽힌다. 환경은 기존 design token과 컴포넌트 라이브러리가 이미 존재하는 production 코드베이스이고, 비교한 세 수단은 모두 Atlassian의 같은 structured content 파이프라인에서 생성되었다. 따라서 이 비교는 서로 다른 팀이 만든 서로 다른 품질의 자료를 견주는 것이 아니라 같은 내용을 다른 전달 방식에 담았을 때의 차이를 재는 성격을 갖는다.

밝혀지지 않은 항목도 분명하다. 기사는 대상 과제와 사용 모델, 시행 횟수를 적지 않고 평균값만 제시한다. 저자들은 이 결과가 관찰된 일반적 제약을 반영하지만 확정적인 것으로 보아서는 안 되며 모델과 프롬프트와 환경이 달라지면 결과도 달라진다는 단서를 직접 단다.

### 표가 담은 것과 담지 않은 것

DESIGN.md의 위치가 이 표에서 가장 눈에 띈다. 컨텍스트 확보율은 약 30%로 MCP server와 스킬의 절반에 못 미치는데, 토큰과 시간과 turn 세 항목은 모두 가장 나쁘다. 평균 토큰 721만은 MCP server의 375만의 약 1.9배다.

비용 항목만 보면 DESIGN.md는 컨텍스트를 전혀 주지 않은 조건보다도 나쁘다. 토큰은 420만에서 721만으로, 시간은 6분 19초에서 6분 46초로, turn 수는 43회에서 45.3회로 모두 늘어난다. 확보한 컨텍스트가 약 5%에서 약 30%로 올라갔으므로 얻은 것이 없지는 않지만, 이 측정 조건에서는 그 대가가 세 항목 모두에서 발생한다.

ADS Skill의 수치도 함께 봐야 한다. 평균 토큰 443만은 컨텍스트를 전혀 주지 않은 조건의 420만보다 많다. 그런데 시간은 5분 23초로 짧고 turn 수도 36회로 적으므로, 스킬이 올린 토큰은 반복 시도를 줄이는 데 쓰인 것으로 읽힌다.

표가 재지 않은 항목을 분명히 해 둘 필요가 있다. 네 열은 컨텍스트 확보율과 토큰, 시간, turn 수이므로 최종 산출물의 디자인 품질 자체는 직접 측정되지 않았다. 정확도에 대한 서술은 벤치마크 표가 아니라 저자들이 첫 번째 한계를 설명하며 든 truncation 메커니즘에서 나온 것이다.

## 약속과 현장의 대조

포맷이 내세우는 성질과 production에서 지적된 한계를 나란히 놓으면 둘이 같은 항목의 앞뒤임이 드러난다. 왼쪽 두 열은 규격 저장소가, 오른쪽 두 열은 Atlassian 보고가 근거다.

| 포맷이 약속하는 것 | 약속의 근거 | 성숙한 시스템 위에서 나타난 결과 | 결과의 근거 |
|---|---|---|---|
| 파일 한 장이면 어느 에이전트든 읽는다 | 규격 저장소의 두 레이어 정의 | 부분만 참조하는 로딩 장치가 스펙에 없어 전량이 한 번에 올라간다. 비용과 지연이 늘고 이른 truncation이 생긴다 | 실측 보고의 한계 1 |
| 산문이 스펙의 초점이라 의도를 풍부히 서술한다 | PHILOSOPHY.md의 핵심 명제 | 약 2.5 MB를 약 80 KB로 줄여야 해서 50개가 넘는 컴포넌트의 상세 가이드와 foundation 가이드, 사용 빈도가 낮은 design token을 버렸다 | 실측 보고의 한계 2 |
| 밑바닥부터 다시 만들 수 있도록 완전한 세부를 드러낸다 | 규격의 설계 목적 | 에이전트가 기존 라이브러리를 import하는 대신 컴포넌트를 재생성하도록 유도한다. 유지보수와 코드 리뷰가 어려워진다 | 실측 보고의 한계 3 |
| 린터가 구조와 참조 해소, 대비율을 검사한다 | 린터 9규칙 | 코딩 표준을 강제하는 lint rule은 포맷 밖에 있다. MCP server와 스킬은 그 강제를 추가 토큰 소비 없이 함께 제공한다 | 실측 보고의 한계 3 설명 |
| 열린 스키마로 부족한 영역을 확장한다 | 표준화 다섯 카테고리와 커스텀 키 | Atlassian은 렌더링 컨텍스트용 비표준 property와 dark mode용 별도 variant를 덧대야 했다 | 실측 보고의 표준 이탈 정리 |

첫 세 행이 같은 구조를 공유한다. 파일 한 장에 의도를 통째로 담는다는 성질이 이식성을 만들고, 그 성질이 그대로 일괄 로드와 압축 손실과 재생성 유도를 만든다. 규격이 자랑하는 항목과 실측 보고가 지적한 항목은 서로 다른 두 성질이 아니라 같은 한 성질의 양면이다.

마지막 행은 방향이 조금 다르다. 확장 자체는 규격이 의도한 동작이지만, 확장이 조직마다 갈리면 이식성이라는 애초의 목적이 약해진다. 실측 보고의 저자들이 업계 공동의 표준 형성 참여를 촉구하는 이유가 여기에 있고, 그들이 보낸 피드백 일부는 이미 표준에 반영되었다.

## 세 수단의 비교

같은 문제를 푸는 세 수단을 같은 기준에 올리면 각자가 어디서 값을 내는지가 드러난다. Agent Skills 규격의 세부 구조는 [[overviews/agent-skills-overview]]가 담당하므로, 여기서는 로딩 방식과 이식성과 토큰 비용 세 기준만 본다.

| 기준 | DESIGN.md | MCP server | Agent Skills |
|---|---|---|---|
| 로딩 시점 | 파일 전체를 한 번에 올린다 | tool call로 요청한 항목만 가져온다 | 스킬이 활성화될 때 본문이 올라온다 |
| 부분 로드 장치 | 스펙에 없다 | tool call이 그 장치다 | progressive disclosure가 그 장치다. frontmatter만 먼저 올리는 방식이 완화책으로 논의된다 |
| 이식 단위 | Markdown 파일 한 장 | 서버 구현과 운영 | Markdown 파일 한 장 |
| 이식의 실제 경로 | 규격을 지원하는 에이전트가 파일을 읽는다 | 조직이 서버를 만들어 운영한다 | 설치 경로를 갖춘 도구, 규칙 디렉터리를 갖춘 도구, 본문을 직접 넣는 도구 세 방식 모두 같은 Markdown을 읽는다 |
| 토큰 비용의 증가 방향 | 디자인 시스템이 커질수록 함께 커진다 | 요청한 만큼만 늘어난다 | 설치한 스킬 수와 본문 길이에 비례한다 |
| Atlassian 실측 평균 토큰 | 721만 | 375만 | 443만 |
| 코딩 표준 강제 | 포맷에 없다 | lint rule과 함께 동작한다 | lint rule과 함께 동작한다 |

이식 단위 행이 가장 흥미로운 대응을 만든다. DESIGN.md와 Agent Skills가 같은 근거로 이식성을 주장하기 때문이다. [[agents/hada-2026-agent-skills]]는 스킬이 특정 런타임에 묶인 플러그인이 아니라 Markdown 텍스트 파일이라서 도구를 바꿔도 자산이 남는다고 적고, 같은 형식 선택이 이식성과 컨텍스트 비용을 동시에 결정한다고 밝힌다.

그런데 두 포맷이 그 비용에 대응하는 방식은 갈린다. Agent Skills는 [[agents/osmani-2026-agent-skills]]가 다섯 설계 원칙 중 하나로 든 progressive disclosure를 두어, 스킬 20개를 동시에 올리지 않고 맥락에 맞는 것만 활성화한다. DESIGN.md는 같은 자리에 해당하는 장치를 스펙에 두지 않았다. 규격 저장소 스스로 부분 참조 메커니즘의 부재를 한계로 적는다.

대응 장치를 둔 쪽도 문제가 끝나지는 않았다. [[agents/hada-2026-agent-skills]]가 전하는 커뮤니티 토론은 스킬 하나가 800줄을 넘기는 경우와 필요하지 않은 스킬까지 설치했을 때의 토큰 낭비를 지적한다. 원칙이 있다는 것과 규모가 커져도 그 원칙이 지켜진다는 것은 다른 사건이다.

## 결정 가이드

수단 선택은 코드베이스에 이미 무엇이 있는지로 갈린다. 아래 표의 첫 행은 실측 결과이고 나머지 네 행은 실측 보고가 별도로 제시한 시나리오 목록이다.

| 상황 | 권장 수단 | 근거 |
|---|---|---|
| 기존 design token과 컴포넌트 라이브러리가 있는 production 코드베이스의 일상 UI 개발 | MCP server 또는 Agent Skills | 네 조건 실측에서 토큰과 시간, turn 세 항목 모두 앞섰다 |
| 문서화된 시각 방향이 없는 시스템의 high-level 아트 디렉션 | DESIGN.md | 실측 보고가 든 네 시나리오 중 하나. 다만 frontmatter가 코드베이스에 이미 있는 정보를 중복 기술한다는 단서가 붙는다 |
| tech stack을 구성하지 않고 on-brand UI를 만드는 blue-sky 프로토타이핑 | DESIGN.md | 같은 네 시나리오 |
| pre-built 컴포넌트를 디자인 언어에 맞춰 커스터마이즈하는 디자인 도구와의 상호운용 | DESIGN.md | 같은 네 시나리오 |
| 고객이 브랜드를 서술하면 AI가 리포트와 차트와 대시보드를 생성하는 adaptive theming | DESIGN.md | 같은 네 시나리오 |

근거의 출처를 구분해 둘 필요가 있다. 실측 보고의 저자들은 네 시나리오가 "기존 디자인 시스템 출력물을 쓸 수 없거나 실용적이지 않은 환경"이라는 조건을 공유한다고 직접 밝히고, DESIGN.md가 MCP server나 스킬의 대체재가 아니라 디자인 시스템의 snapshot이자 이식 포맷이라고 규정한다. 여기까지가 저자의 주장이다.

이 두 진술을 "기존 시스템 출력물을 쓸 수 있으면 on-demand로 부르고, 쓸 수 없으면 의도를 통째로 서술한다"는 한 문장으로 묶은 것은 이 저장소의 정리다. 저자들이 그 문장을 그대로 쓰지는 않는다.

표 안에서 서로 당기는 항목도 있다. 마지막 행의 adaptive theming은 DESIGN.md의 값어치를 인정하는 자리인데, 같은 기사는 기사 시점의 표준이 theming을 지원하지 않아 Atlassian이 dark mode용 별도 variant를 따로 제공해야 했다고 적는다. 기사는 두 서술을 연결해 설명하지 않으므로, theming 시나리오를 실행하려면 비표준 확장이 필요한 상태로 읽는 편이 안전하다.

## 근거의 비대칭

이 페이지가 다루는 세 수단의 근거 수준이 같지 않다. 비교를 읽을 때 이 차이를 감안해야 한다.

| 수단 | 이 저장소가 보유한 근거의 성격 | 확인되는 한계 |
|---|---|---|
| DESIGN.md | 한 조직이 한 환경에서 잰 정량 실측 | 시행 횟수와 과제, 모델이 밝혀지지 않았고 저자들이 확정적으로 보지 말라는 단서를 달았다 |
| MCP server | 같은 실측의 한 조건 | 비교 대상 두 경로를 직접 만든 조직의 자체 측정이다 |
| Agent Skills | 같은 실측의 한 조건, 그리고 원칙과 커뮤니티 관찰 | 원칙 쪽 자료에는 정량 데이터가 하나도 없고, 800줄 같은 수치는 발화자가 특정되지 않는 댓글 요약이다 |
| 상위 원리 | 사례와 선행 연구 참조 | 정량 벤치마크가 없다 |

한쪽에만 수치가 있다는 사실이 결론의 방향을 정하지는 않는다. 수치가 있는 쪽은 한 조직 한 사례이고, 수치가 없는 쪽은 원칙만 있을 뿐 반증된 것이 아니다. 세 수단의 우열을 일반화하려면 서로 다른 조직과 과제에서 나온 측정이 더 필요하다.

## 한계

커버 범위가 좁다. 이 페이지가 근거로 삼는 자료는 다섯 편이고, 그중 DESIGN.md를 직접 다루는 것은 규격 저장소와 실측 보고 두 편뿐이다. 나머지 세 편은 컨텍스트 예산이라는 상위 문제와 대안 수단을 다룬다.

정량 비교가 한 조직 한 사례에 의존한다. 네 조건 실측은 Atlassian이 자사 디자인 시스템 위에서 수행한 측정이며, 비교 대상 중 두 경로를 직접 만든 조직의 자체 보고다. 다른 조직이 다른 디자인 시스템에서 잰 값은 이 저장소에 없다.

규격 원문을 전량 확인할 수 없다. 저장소 README는 자기 내용이 요약본이고 정본 스펙은 저장소 안 `docs/spec.md`에 있다고 안내하는데, 이 저장소의 raw 스냅샷에는 `README.md`와 `PHILOSOPHY.md`만 들어 있다. 따라서 스펙 전문에만 있는 규정은 확인 대상 밖이다.

실측 보고의 수집본도 원문 전문이 아니다. `raw/articles/`에 남은 자료는 저자들의 1인칭 서술 대신 제3자 요약 문체로 압축된 형태이며, 원문의 예시 화면이나 코드 예시는 남아 있지 않다.

포맷의 버전이 유동적이다. 규격 저장소는 포맷 버전이 `alpha`이고 스펙과 토큰 스키마, CLI가 모두 활발히 개발 중이라 변경을 예상해야 한다고 적는다. 실측 보고의 저자들도 자신들이 보낸 제안 중 일부가 이미 반영되었다고 적는다. 따라서 이 페이지의 대조표는 두 자료의 시점을 기준으로 읽어야 한다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| DESIGN.md | 디자인 시스템을 코딩 에이전트에 넘기기 위한 Markdown 포맷. YAML front matter의 design token과 Markdown 산문의 설계 근거 두 레이어로 이루어진다 |
| design token | 색과 간격, 타이포그래피 같은 디자인 값에 이름을 붙여 관리하는 단위. 언어 모델이 소비하는 토큰과 구분해 원어로 적는다 |
| pre-inference retrieval | 추론이 시작되기 전에 필요한 컨텍스트를 미리 올려 두는 방식. DESIGN.md의 일괄 로드가 이 방식의 극단에 해당한다 |
| just-in-time | 가벼운 식별자만 두었다가 실행 중에 tool로 필요한 것만 불러오는 방식. MCP server가 tool call로 이 방식을 쓴다 |
| progressive disclosure | 필요한 시점에만 정보를 단계적으로 노출하는 설계. Agent Skills가 컨텍스트 비용에 대응하는 장치이며 DESIGN.md 스펙에는 대응 장치가 없다 |
| truncation | 컨텍스트가 한도를 넘어 잘려 나가는 현상. 일괄 로드가 이 시점을 앞당긴다는 것이 실측 보고의 첫 번째 한계다 |

## 관련 페이지

- [[agents/google-labs-code-design-md]]: 포맷을 정의한 Google Labs 저장소. 두 레이어 구조와 토큰 스키마, CLI 4종, 린터 9규칙의 세부는 그 페이지가 담당한다
- [[agents/hall-2026-atlassians-design-md-is-here]]: Atlassian의 production 검증 보고. 네 조건 실측과 한계 3종, 표준과 갈라진 지점의 원자료다
- [[agents/anthropic-2025-effective-context-engineering-for-ai]]: attention budget과 high-signal 토큰의 최소 집합 원칙. 일괄 로드와 on-demand의 대비를 놓는 상위 프레임이다
- [[agents/osmani-2026-agent-skills]]: 스킬을 checkpoint가 있는 워크플로로 보는 다섯 설계 원칙. progressive disclosure의 정의를 가져온 자료다
- [[agents/hada-2026-agent-skills]]: Agent Skills를 둘러싼 커뮤니티 토론. 800줄 스킬의 컨텍스트 비용과 Markdown 한 장이라는 이식 근거를 함께 전한다
- [[overviews/agent-skills-overview]]: Agent Skills 규격과 생태계를 다루는 자매 페이지. 스킬 쪽 규격 세부는 그 페이지가 맡고 세 수단의 운영 비용 비교는 이 페이지가 맡는다
- [[overviews/headroom-context-compression-overview]]: 컨텍스트를 통째로 올릴지 줄일지의 같은 문제를 압축 도구 관점에서 다룬다
