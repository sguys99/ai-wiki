---
title: "The New SDLC With Vibe Coding: From ad-hoc prompting to Agentic Engineering"
type: report
year: 2026
category: agents
raw_path: raw/reports/google-2026-the-new-sdlc-with-vibe.pdf
raw_filename: "google-2026-the-new-sdlc-with-vibe.pdf"
source_collection: external
org: "Google"
url: "https://cloud.google.com/"
authors: "Addy Osmani, Shubham Saboo, Sokratis Kartakis"
tags: [vibe-coding, agentic-engineering, harness-engineering, context-engineering, sdlc, coding-agents, agent-skills, conductor-orchestrator, factory-model, token-economy, capex-opex, model-routing, agents-cli, adk, mcp, a2a]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/google-2026-the-new-sdlc-with-vibe/fig01.png
    raw: raw/reports/google-2026-the-new-sdlc-with-vibe-figures/fig01.png
    caption: "Figure 1: autocomplete에서 autonomy까지 5세대 진화. 2021년 autocomplete, 2022년 inline 코드 제안, 2023년 chat 기반 생성, 2024~25년 coding agent, 2025~26년 autonomous agent로 이어지며 개발의 1차 인터페이스가 syntax에서 intent로 이동한다"
    page: 8
    bbox_norm: [0.1061, 0.158, 0.8939, 0.5189]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/google-2026-the-new-sdlc-with-vibe/fig02.png
    raw: raw/reports/google-2026-the-new-sdlc-with-vibe-figures/fig02.png
    caption: "Figure 2: agent loop의 네 단계. Perceive Goal에서 Plan Steps, Act(Tools), Observe Results 순으로 순환하고, 결과가 미흡하면 계획 단계로 되돌아가며 종료 조건을 만족하면 output을 낸다"
    page: 10
    bbox_norm: [0.1078, 0.4987, 0.8922, 0.8474]
    strategy: caption-region
    curated: false
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/google-2026-the-new-sdlc-with-vibe/fig03.png
    raw: raw/reports/google-2026-the-new-sdlc-with-vibe-figures/fig03.png
    caption: "Figure 3: vibe coding에서 agentic engineering까지의 스펙트럼. 세 구간을 가르는 기준은 AI 사용 여부가 아니라 output을 어떻게 검증하는지이고, 왼쪽은 구조가 적고 속도가 빠르며 오른쪽은 구조가 많고 신뢰성이 높다"
    page: 14
    bbox_norm: [0.1062, 0.1716, 0.8938, 0.4731]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/google-2026-the-new-sdlc-with-vibe/fig04.png
    raw: raw/reports/google-2026-the-new-sdlc-with-vibe-figures/fig04.png
    caption: "Figure 4: 여섯 종류의 agent 컨텍스트를 static과 dynamic으로 배치하는 결정. static은 매 상호작용에 항상 로드되어 토큰 비용이 높고, dynamic은 task별로 필요할 때만 로드되어 턴당 비용이 낮다"
    page: 17
    bbox_norm: [0.1074, 0.158, 0.8926, 0.4811]
    strategy: caption-region
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/google-2026-the-new-sdlc-with-vibe/fig05.png
    raw: raw/reports/google-2026-the-new-sdlc-with-vibe-figures/fig05.png
    caption: "Figure 5: 전통 iterative SDLC와 AI 주도 SDLC 비교. 단계는 같지만 병목과 비중이 다르다. sprint 주기가 주 단위에서 분에서 시간 단위 iteration으로 줄고, 명세 품질이 새 병목이 된다"
    page: 20
    bbox_norm: [0.106, 0.1591, 0.894, 0.4716]
    strategy: caption-region
    curated: true
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/google-2026-the-new-sdlc-with-vibe/fig06.png
    raw: raw/reports/google-2026-the-new-sdlc-with-vibe-figures/fig06.png
    caption: "Figure 6: factory model의 두 영역. Developer Zone에서 개발자가 명세를 정하고 가드레일을 설계하고 승인하며, Agent Factory Floor에서 planning agent와 coding agent가 코드를 만들고 테스트가 검증한 뒤 실패는 계획 단계로 되돌아간다"
    page: 25
    bbox_norm: [0.1078, 0.2608, 0.8922, 0.6119]
    strategy: caption-region
    curated: false
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/google-2026-the-new-sdlc-with-vibe/fig07.png
    raw: raw/reports/google-2026-the-new-sdlc-with-vibe-figures/fig07.png
    caption: "Figure 7: harness 해부도. agent를 이루는 비중은 model이 약 10%, harness가 약 90%다. LLM을 framework layer, developer interface, cloud infrastructure 세 계층이 동심원으로 감싼다"
    page: 27
    bbox_norm: [0.1062, 0.2727, 0.8912, 0.6856]
    strategy: caption-region
    curated: true
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/google-2026-the-new-sdlc-with-vibe/fig08.png
    raw: raw/reports/google-2026-the-new-sdlc-with-vibe-figures/fig08.png
    caption: "Figure 8: conductor와 orchestrator 두 모드 비교. conductor는 실시간 동기 방식으로 IDE 안에서 키스트로크 수준을 제어하고, orchestrator는 비동기 고수준 방식으로 멀티에이전트에 위임한다"
    page: 32
    bbox_norm: [0.1061, 0.1577, 0.8939, 0.5917]
    strategy: caption-region
    curated: true
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/google-2026-the-new-sdlc-with-vibe/fig09.png
    raw: raw/reports/google-2026-the-new-sdlc-with-vibe-figures/fig09.png
    caption: "Figure 9: AI 개발의 경제학. vibe coding은 초기 CapEx가 낮지만 OpEx가 누적되고, crossover point를 지나면 기능당 비용이 agentic engineering의 3배에서 10배가 된다"
    page: 40
    bbox_norm: [0.1062, 0.1576, 0.8938, 0.4509]
    strategy: caption-region
    curated: true
  - id: tab01
    label: Table 1
    kind: table
    file: assets/google-2026-the-new-sdlc-with-vibe/tab01.png
    raw: raw/reports/google-2026-the-new-sdlc-with-vibe-figures/tab01.png
    caption: "Table 1: 6개 항목으로 비교한 vibe coding, structured AI-assisted coding, agentic engineering 스펙트럼. 항목은 의도 명세, 검증, 코드베이스 이해, 에러 처리, 적정 범위, 리스크 프로파일이다"
    page: 13
    bbox_norm: [0.1078, 0.1594, 0.8926, 0.6227]
    strategy: table-region
    curated: true
---

## 한 줄 요약 (One-line Summary)

Addy Osmani, Shubham Saboo, Sokratis Kartakis가 쓴 Google 백서(2026-05, 51쪽)다. "코드를 쓰는 것에서 의도(intent)를 표현하는 것으로"라는 전환을 출발점으로, vibe coding에서 agentic engineering까지의 스펙트럼과 "Agent = Model + Harness" 방정식이라는 두 개념 도구로 AI가 SDLC 전 단계를 어떻게 재편하는지 정리한 입문 겸 전략 문서다. 백서 시리즈 Day-1 편으로, Day-3(Context Engineering)과 Day-5(Spec-Driven Development)의 도입부 역할을 한다.

## 1. 자료 정보 (Document Information)

- **제목**: The New SDLC With Vibe Coding, From ad-hoc prompting to Agentic Engineering
- **저자**: Addy Osmani, Shubham Saboo, Sokratis Kartakis. content contributor는 Elia Secchi, Julia Wiesinger, Anant Nawalgaria이고, curator 겸 editor는 Anant Nawalgaria, designer는 Michael Lanning이다.
- **발행**: Google, 2026년 5월, 51쪽. 백서 시리즈 Day-1 편.
- **유형**: 산업 백서(report). 대상 독자는 소프트웨어 엔지니어, 엔지니어링 매니저, 아키텍트, 기술 리더다. 현대 소프트웨어 개발 실천 지식은 전제하지만 AI나 머신러닝 지식은 전제하지 않는다.
- **채택 통계(2026년 초, endnote 1의 GetPanto와 Index.dev 집계)**: 전문 개발자의 85%가 AI 코딩 에이전트를 상시 사용, 51%가 매일 사용, 신규 코드의 41%가 AI 생성으로 추정된다.
- **집필 목적**: 도구가 매주 새로 나오는 상황에서 몇 달 만에 낡는 스냅샷이 아니라 도구가 바뀌어도 남는 원칙과 멘털 모델을 제공하려 한다고 밝힌다.
- **위치**: harness engineering 계열 자료군의 개괄 문서다. LangChain, Anthropic, METR, Terminal Bench, Deloitte 수치를 인용한 2차 종합 문서이므로 원 측정치는 각 endnote의 원출처를 확인해야 한다.

## 2. 주요 기여 (Key Contributions)

1. **syntax에서 intent로의 전환 정의**: 개발의 1차 인터페이스가 문법(중괄호, 세미콜론, 타입 주석)에서 "무엇을 만들지"의 의도 표현으로 이동한다. autocomplete에서 autonomous agent까지 5세대 진화로 정리한다(Figure 1).
2. **vibe coding과 agentic engineering의 스펙트럼**: 이분법이 아니라 연속체로 본다. 차별점은 AI 사용 여부가 아니라 output을 구조와 검증과 인간 판단이 얼마나 둘러싸는가다. 6개 항목으로 세 구간을 비교한다(Table 1).
3. **검증의 이원화**: Tests는 결정적(deterministic) 부분을 코드로 검증하고, Evals는 비결정적 부분(trajectory, 도구 선택, 응답 품질)을 라벨링된 데이터셋과 채점 루브릭과 LM judge로 검증한다. 둘 다 없으면 프롬프트가 얼마나 정교하든 그 실천은 언제나 vibe coding이다.
4. **context engineering이 진짜 기술이라는 명제**: AI 생성 코드의 품질은 프롬프트의 영리함보다 제공된 컨텍스트의 품질에 좌우된다. 여섯 종류의 컨텍스트를 static과 dynamic으로 배치하는 것이 1급 아키텍처 결정이며, Agent Skills가 dynamic 컨텍스트 관리의 핵심 패턴이다.
5. **factory model**: 개발자의 1차 산출물은 코드가 아니라 코드를 생산하는 시스템이다. 명세와 컨텍스트, 구현 agent, 테스트와 품질 게이트, 피드백 루프, 가드레일로 이루어진다.
6. **Agent = Model + Harness**: 모델은 하나의 입력일 뿐이고 나머지 전부가 harness다. 대부분의 agent 실패는 모델 탓이 아니라 설정 실패(configuration failure)다.
7. **conductor와 orchestrator**: 실시간 동기 방식으로 IDE에서 밀착 지휘하는 모드와 비동기 고수준 방식으로 멀티에이전트에 위임하는 모드를 구분한다. 개발자는 task에 따라 두 모드를 오간다.
8. **AI 개발 경제학(TCO)**: vibe coding은 낮은 CapEx와 높은 OpEx, agentic engineering은 높은 CapEx와 낮은 OpEx로 부담이 이동한다. AI 시대의 OpEx는 토큰 경제가 지배하며 context engineering과 intelligent model routing이 재무 레버다.
9. **실천 처방**: 개인 개발자 6항목, 엔지니어링 리더 5항목, 조직 5항목의 액션 목록을 제시한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 5세대 진화 (Figure 1)

Figure 1은 다섯 세대를 시점과 함께 배치한다. 약 2021년 Autocomplete(단순 토큰 예측), 약 2022년 Inline Code Suggestions(signature에서 함수 전체 완성), 약 2023년 Chat-Based Generation(자연어 서술에서 동작하는 구현, 대화가 인터페이스가 된다), 약 2024~25년 Coding agents(멀티파일 편집, tool call, 테스트 실행, 반복적 자기 교정), 약 2025~26년 Autonomous Agents(저장소 clone부터 pull request 제출까지 인간의 키스트로크 없이)다. 각 세대는 앞 세대를 보존하면서 한 명의 엔지니어가 해낼 수 있는 천장을 올렸다. 그림 하단의 띠는 왼쪽 Syntax에서 오른쪽 Intent로, 왼쪽 "더 많은 인간 노력"에서 오른쪽 "더 많은 기계 자율성"으로 이어진다.

이 구분이 실무 대화에서 중요하다고 강조한다. 결제 처리 시스템을 vibe coding하고 있다고 CTO에게 말하면 경보가 울리는 것이 마땅하고, 인간이 설계한 제약 안에서 AI가 구현을 맡고 테스트 커버리지가 정확성을 보장하는 agentic engineering을 실천한다고 말하면 근본적으로 다른 대화가 된다.

### Agent의 5개 부품과 루프 (Figure 2)

2025년 11월 백서 "Introduction to Agents"를 참조 기반으로 삼아 agent를 다섯 부품으로 정리한다. Model(추론 엔진), Tools(모델을 세계와 연결하는 API와 코드와 데이터베이스와 다른 agent), Memory(상태, 과거 상호작용 회상과 프로젝트별 규칙 조회와 세션을 넘는 컨텍스트 유지), Orchestration(루프를 실행하는 코드로 컨텍스트 조립과 tool call 디스패치와 결과 수집과 계속 여부 판단), Deployment(호스팅과 identity와 observability와 운영 인프라)다.

부품들은 임무 수령, 상황 파악, 사고, 행동, 관찰과 반복의 연속 루프로 동작한다. 챗봇은 응답 뒤 다음 프롬프트를 기다리지만 agent는 스스로 루프를 실행한다. Figure 2는 Perceive Goal에서 Plan Steps, Act(Tools), Observe Results로 이어지는 순환에 결과가 미흡하면 계획으로 되돌아가는 화살표를 더해 그린다.

> 원문 11쪽은 "five parts"라고 쓴 뒤 다섯 항목을 열거하고 다음 문장에서 "These four parts work together"라고 적는다. 원문의 표기 불일치이며 열거는 다섯 항목이 맞다.

### vibe coding의 정의와 용어 이동

2025년 2월 Andrej Karpathy의 X 포스트가 용어의 시초다. "완전히 vibe에 몸을 맡기고 지수 성장을 받아들이며 코드가 존재한다는 사실조차 잊는다"는 방식으로, 원하는 것을 자연어로 서술하고 output을 수용하며 깨지면 에러 메시지를 프롬프트에 복사해 고쳐 달라고 요청한다.

용어가 퍼진 이유는 많은 개발자가 이미 그렇게 일하는데 부를 말이 없었기 때문이다. 다만 몇 달 만에 AI 보조 개발 워크플로 전반을 가리키는 말이 되면서 의미가 희석됐다. 2026년 초 Karpathy 본인이 원 framing이 너무 좁았다고 인정하고 스펙트럼의 규율 있는 쪽을 가리키는 "agentic engineering"을 도입했다.

### 스펙트럼의 6개 항목 비교 (Table 1)

| 항목 | Vibe Coding | Structured AI-Assisted Coding | Agentic Engineering |
|---|---|---|---|
| 의도 명세 | 캐주얼 자연어 프롬프트 | 예시와 제약이 붙은 상세 프롬프트 | 정식 명세, 아키텍처 문서, memory 파일 |
| 검증 | "되는 것 같은데?" | 수동 테스트와 스팟체크 | 자동 테스트 스위트, CI/CD 게이트, LM judge |
| 코드베이스 이해 | 최소. 생성된 코드를 읽지 않을 수도 있다 | 핵심 경로만 선별 리뷰 | 아키텍처 전면 리뷰. 구현 세부는 AI가 담당 |
| 에러 처리 | 에러 메시지를 AI에 복사해 붙인다 | 개발자가 근본 원인을 진단하고 AI가 수정을 구현 | agent가 정의된 경계 안에서 자가 진단, 인간은 아키텍처 이슈 담당 |
| 적정 범위 | 프로토타입, 스크립트, 개인 프로젝트, 해커톤 | 기존 코드베이스 안의 기능 | 프로덕션 시스템, 팀 규모 개발 |
| 리스크 프로파일 | 높음. 폐기용 코드에는 수용 가능 | 중간. 핵심 체크포인트에 인간 판단 | 낮음. 모든 단계에서 체계적 검증 |

적정 위치는 stakes가 결정한다. 주말 프로토타입은 순수 vibe coding이어도 되고 금융 거래를 처리하는 프로덕션 API는 agentic engineering을 요구한다. 실제 업무 대부분은 그 사이에 있으며, 실력은 각 task마다 어디에 선을 그을지 아는 것이다(14쪽 Applied Tip).

### Context engineering, static과 dynamic (Figure 4)

개발자가 고려해야 하는 컨텍스트는 여섯 종류다. Instructions(역할과 목표와 운영 경계), Knowledge(검색된 문서, 아키텍처 다이어그램, 도메인 데이터), Memory(단기 세션 로그와 장기 지속 상태), Examples(few-shot 행동 시연(demonstration)과 코드베이스 레퍼런스 패턴), Tools(호출 가능한 API와 스크립트와 외부 서비스의 정확한 정의), Guardrails(하드 제약, 포맷 규칙, 안전 검증)다.

| 구분 | 로드 시점 | 토큰 비용 | 구성 요소 | 성격 |
|---|---|---|---|---|
| Static context | 항상, 매 상호작용 | 높음 | 시스템 지시, rule 파일(AGENTS.md, CLAUDE.md, GEMINI.md), 글로벌 메모리, 페르소나 정의, 핵심 가드레일 | 비싸지만 신뢰할 수 있다. agent가 절대 잊지 않는다 |
| Dynamic context | 온디맨드, task별 | 턴당 낮음 | task 매칭으로 발동되는 skill 지시, 실행 중 얻은 tool 결과, RAG가 가져온 문서, 윈도우 세션 히스토리 | 효율적이고 확장된다. 쓴 만큼만 낸다 |

static이 너무 많으면 토큰이 낭비되고 신호가 희석되며, 너무 적으면 agent가 핵심 규칙을 잊는다. 최선의 시스템은 이 경계를 1급 아키텍처 결정으로 취급해 다른 설정과 마찬가지로 리뷰하고 버전 관리한다.

dynamic 컨텍스트 관리에서 가장 강력한 패턴은 Agent Skills다. 절차적 지식을 담은 구조화된 이식 가능한(portable) 패키지로, progressive disclosure에 따라 시작 시점에는 경량 메타데이터만, task가 맞으면 전체 지시, 명시적으로 필요할 때만 심화 참조 자료를 로드한다. 그 결과 agent는 수십 개 전문 능력을 지니면서도 지금 실제로 쓰는 하나에 대해서만 토큰 비용을 낸다. 빠른 채택 이유로 네 가지 문제 해결을 든다. 과부하된 프롬프트에서 오는 context rot, LLM의 절차 기억(procedural memory) 부재, 멀티에이전트 아키텍처의 운영 오버헤드, 도구와 벤더를 넘나드는 이식성 요구다.

"프롬프트 엔지니어링에서 context engineering으로"의 이동이 반영하는 진실은 이렇다. 모델에 필요한 것은 영리하게 다듬은 지시가 아니라 숙련된 인간 개발자가 좋은 결과를 내는 데 필요한 것과 같은 컨텍스트다. 질문은 "AI를 어떻게 속여 좋은 코드를 쓰게 할까"가 아니라 "새 팀원이 효과적으로 기여하려면 무엇을 알아야 하고, 그 지식을 AI가 쓸 수 있는 형태로 어떻게 인코딩할까"다.

### 전통 SDLC의 압박과 새 SDLC (Figure 5)

SDLC는 이미 한 차례 큰 전환을 겪었다. 지난 20년간 대부분의 기업이 순차적 waterfall에서 iterative 모델(Agile sprint, continuous integration, DevOps 파이프라인, 빠른 릴리스 사이클)로 옮겨 갔다.

AI는 이 사이클을 극적으로 압축하지만 불균등하게 압축한다. 한때 몇 주 걸린 구현이 몇 시간으로 줄어드는 반면 요구사항과 아키텍처와 검증은 여전히 인간 속도에 묶여 있다. 결과는 빨라진 옛 SDLC가 아니라 다른 워크플로다. 단계 경계가 흐려지고 iteration 주기가 주에서 분으로 줄며, 개발자의 역할이 주 구현자에서 시스템 설계자이자 품질 조정자로 옮겨 간다.

| 단계 | 전통 iterative SDLC | AI 주도 SDLC |
|---|---|---|
| Requirements | 2~3일 | 명세 품질이 새 병목이 된다 |
| Design | 1~2일 | 아키텍처 결정이 규모에서 증폭된다 |
| Implementation | 1~3주 | 분에서 시간 단위 |
| Testing | 3~5일 | Output Eval과 Trajectory Eval로 무엇을 만들었는지와 어떻게 만들었는지를 함께 검증 |
| Review & Deploy | 2~3일 | 동일 단계 유지 |
| Maintenance | 상시 | 연속 자동화 |
| 사이클 | sprint 주기가 주 단위 | iteration 주기가 분에서 시간 단위 |

그림은 되돌림 화살표 두 개도 표기한다. 명세가 eval 기준이 된다는 화살표가 Requirements와 Design 사이를, agent가 자가 교정한다는 화살표가 Implementation과 Eval 사이를 잇는다. 상단 구분선의 문구는 "같은 단계, 다른 병목, 다른 비중"이다.

### 단계별 변화

- **요구사항과 계획**: 의도와 구현 사이 간극이 역사적으로 가장 컸던 단계다. AI가 제품 브리프에서 user story를 생성하고, 인간이 놓치는 엣지 케이스를 식별하고, 자연어 서술에서 API 스키마를 만들고, 명세 문서에서 대화형 프로토타입을 생성한다. 요구사항은 팀 사이에 넘기는 문서이기를 멈추고 인간과 AI의 대화가 되어 명세와 초기 구현을 동시에 산출한다.
- **설계와 아키텍처**: 가장 완강하게 인간 중심적인 단계다. 트레이드오프(일관성 대 가용성, 복잡성 대 유연성, build 대 buy)가 AI가 온전히 파악할 수 없는 비즈니스 맥락과 조직 제약과 장기 전략에 달렸다. 반면 AI는 결정된 아키텍처를 애플리케이션 전체로 스캐폴딩하고 일관된 패턴을 생성하는 데 탁월하다. 개발자는 boilerplate 작성에서 그 boilerplate가 구현하는 구조적 결정의 문서화로 이동한다.
- **구현**: 산업 서베이는 25%에서 39% 생산성 향상을 보고하고 일부 task는 더 크다. 반면 METR 연구는 AI 어시스턴트를 쓴 숙련 개발자가 특정 task에서 19% 더 오래 걸렸다고 보고했고, 원인은 대체로 AI output을 검증하고 디버깅하고 교정하는 데 쓴 시간이다. AI는 구현을 없애기보다 쓰기를 리뷰하기와 안내하기와 검증하기로 바꾼다.
- **테스트와 품질 보증**: output evaluation(코드가 컴파일되는지, 테스트가 통과하는지)과 trajectory evaluation(tool call과 중간 추론의 전체 순서) 둘 다 필요하다. 검증 단계를 건너뛴 유창한 output이 눈에 보이는 에러보다 위험한 실패이기 때문이다. 테스트와 eval이 agent에 의도를 전달하는 1차 수단이 되며, continuous quality flywheel(벤치마크 평가, 근본 원인 클러스터링, 프롬프트와 도구 최적화, 회귀 검증, 프로덕션 모니터링)로 엮일 때 매 사이클이 누적된다.
- **코드 리뷰와 배포**: AI가 1차 리뷰어로 잠재 버그와 스타일 위반과 보안 취약점과 성능 문제를 식별한다. 맥락 의존적 판단은 인간이 필요하므로 인간 리뷰를 대체하지 않고 인지 부담만 줄인다. 배포 파이프라인도 AI-aware로 바뀌어 헬스를 모니터링하고 문제 릴리스를 자동 롤백하며 변경의 성격과 범위로 리스크를 예측한다.
- **유지보수와 진화**: 가장 과소평가된 변화다. 원 저자만 이해해서 "너무 위험해 못 건드린다"고 여겨졌던 코드를 안전하게 리팩터하고 현대화할 수 있다. 프레임워크 사이 마이그레이션과 deprecated API 갱신과 테스트 스위트 현대화처럼 과거에는 너무 지루하고 위험해서 그냥 일어나지 않던 일들이 가능해진다.

### Factory model (Figure 6)

이 변화들을 묶는 멘털 모델이 factory model이다. 개발자의 1차 산출물은 코드가 아니라 코드를 생산하는 시스템이며, 그 시스템은 명세와 컨텍스트, 명세를 구현으로 옮기는 agent, 정확성을 검증하는 테스트와 품질 게이트, 실패를 교정용으로 되돌리는 피드백 루프, 안전하고 예측 가능한 행동으로 제한하는 가드레일을 포함한다.

공장 관리자는 모든 위젯을 손으로 조립하지 않고 조립 라인을 설계하고 품질 관리를 보장한다. 현대 개발자는 개발 시스템을 설계하고 그 output이 요구 기준을 만족하는지 보장한다. 성공은 단계별 지시가 아니라 성공 기준을 agent에 주고 반복하게 두는 데서 온다.

Figure 6은 이 구조를 Developer Zone(Define Specs, Design Guardrails, Review & Approve)과 Agent Factory Floor(Planning Agent에서 Coding Agent, Tests & Verification, 통과 시 Verified Output, 실패 시 failure feedback으로 Planning Agent 복귀)로 그린다. 하단의 가드레일 항목은 토큰 한도, 보안 정책, 스타일 규칙, 아키텍처 제약이다.

개발자가 공장 관리자라면 AI 모델은 공장 바닥의 원 엔진일 뿐이다. 엔진 하나로는 자동차를 만들 수 없고 벨트와 기어와 안전 센서와 조립 라인이 필요하다. AI 보조 개발에서 이 둘러싼 기계 장치가 harness다.

### Harness 해부도 (Figure 7)

모델을 시스템으로 취급하려는 유혹이 있다. 새 모델이 나오면 agent가 똑똑해지고 낡은 모델이면 나빠진다는 식이다. 그 직관은 틀렸고 잘못된 투자로 이어진다. 모델은 동작 중인 agent에 들어가는 하나의 입력이고, 나머지 전부, 곧 프롬프트와 도구와 컨텍스트 정책과 훅과 샌드박스와 서브에이전트와 observability가 harness다. 원 모델은 agent가 아니다. harness가 상태와 도구 실행과 피드백 루프와 강제 가능한 제약을 주는 순간 agent가 된다. Claude Code, Cursor, Codex, Antigravity, Aider, Cline을 쓸 때 경험하는 행동은 아래에 어떤 모델이 있는지보다 harness가 무엇을 하는지가 지배한다.

Figure 7은 비중을 model 약 10%, harness 약 90%로 표기하고 구조를 세 계층 동심원으로 그린다. 안쪽 Framework Layer(지능이 형태를 갖는 곳)에 LLM과 Instructions / Rule Files, Tools & MCP Servers, Orchestration Logic, Guardrails & Hooks가 놓이고, 중간 Developer Interface(운영 도구)에 CLI / IDE Integration과 Session / Memory Store와 Eval & Testing이, 바깥 Cloud Infrastructure(프로덕션 서비스)에 Managed Runtimes와 Observability & Tracing과 Deployment Config와 Service & Scaling이 놓인다. 마무리 문구는 "모델은 엔진이고 harness는 자동차와 도로와 교통 법규다"다.

harness의 구성 요소는 여섯이다.

- **Instructions and Rule Files**: agent가 누구이고 무엇을 중시하며 무엇이 금지되는지 정의하는 텍스트. AGENTS.md, CLAUDE.md, GEMINI.md, skill 파일, 서브에이전트 프롬프트.
- **Tools**: 호출 가능한 함수와 MCP 서버와 API, 그리고 언제 어떻게 호출할지 알려주는 주변 산문.
- **Sandboxes and execution environments**: agent의 코드가 실제 실행되는 곳, 접근 가능한 범위와 닿을 수 없는 범위.
- **Orchestration logic**: 서브에이전트 스포닝, 모델 라우팅, 전문가 사이의 handoff, 각각의 발동 규칙.
- **Guardrails or Hooks**: 특정 라이프사이클 지점에서 실행되는 결정적 코드(tool call 전, 파일 편집 후, 커밋 전). agent가 절대 잊어서는 안 되는데 자주 잊는 것들의 자리.
- **Observability**: 로그, 트레이스, 평가, 비용과 지연 계측. 없으면 agent가 잘하고 있는지 조용히 드리프트하는지 알 방법이 없다.

원문은 이 표면적이 넓다는 점을 인정하고, 그것이 모델 제공자의 표면적이 아니라 팀의 표면적이라고 못 박는다.

### SDLC 단계별 harness의 역할

harness는 agent가 동작하는 모든 단계에 존재해야 한다. 백서는 네 구간으로 나눈다. 요구사항과 계획과 아키텍처는 설정과 보정 구간으로, Instructions와 Rule Files를 제공하고 접근할 도구를 정의하며 깨서는 안 되는 근본 규칙을 정한다. 구현은 실행 구간으로, 생성된 코드를 격리된 샌드박스에서 실행하고 파일 읽기나 웹 검색은 harness가 제공한 도구로 한다. 테스트와 QA는 피드백 루프 구간으로, 자동 테스트를 실행할 환경을 제공하고 실패하면 orchestration logic이 에러 output을 붙잡아 모델로 되돌린다. 이 자동화된 think에서 act, observe 루프를 만드는 것이 harness다. 코드 리뷰와 배포와 유지보수는 관측 구간으로, 결정적 훅을 실행하고(하드코딩된 비밀번호를 푸시하려 하면 커밋 차단) observability 계층이 토큰 비용과 지연과 agent 드리프트를 추적한다.

vibe coding에서 agentic engineering으로의 전환은 쓰는 도구의 문제가 아니다. 개발자는 정확히 같은 agent로 둘 다 할 수 있다. 차이는 harness를 얼마나 의도적으로 설정하고 적용하는지다. vibe coding은 빠른 구현만 겨냥한 최소한의 암묵적 스캐폴딩에 의존하고, agentic engineering은 최초 계획 문서부터 프로덕션 모니터링까지 AI를 안내하는 명확하고 광범위한 harness 추상에 의존한다.

### Harness 효과의 벤치마크 증거

Terminal Bench 2.0에서 한 팀은 모델을 전혀 바꾸지 않고 harness만 변경해 coding agent를 Top 30 밖에서 Top 5로 옮겼다. LangChain의 별도 연구는 고정된 모델 주위의 시스템 프롬프트와 도구와 미들웨어만 조정해 같은 벤치마크 점수를 13.7점 올렸다.

이 관찰의 일상 버전은 이렇다. agent가 뭔가 잘못하면 첫 본능은 모델을 탓하는 것이지만, 더 자주 실패는 빠진 도구, 모호한 규칙, 없는 가드레일, 노이즈로 채워진 context window로 되짚어진다. 정직하게 검토하면 대부분의 agent 실패는 설정 실패다.

### Conductor와 orchestrator (Figure 8)

| 항목 | Conductor | Orchestrator |
|---|---|---|
| 방식 | 실시간, 동기, IDE 안 | 비동기, 고수준, 멀티에이전트 |
| 제어 | 키스트로크 수준 제어, 즉시 피드백 | 목표 수준 제어, 지연 피드백 |
| 범위 | 단일 파일. 개발자가 항상 루프 안에 있다 | 멀티 파일. 키스트로크가 아니라 결과를 리뷰한다 |
| 기능 | Inline Completion, Chat-in-Editor, Diff Review와 Accept, Quick Fix와 Refactor | Task와 Issue Assignment, Background Terminal Agents, CI/CD Integration, Eval과 Test Suites, 멀티에이전트 조율 |
| 적합 | 탐색적 코딩, 프로토타이핑, 새 API 학습 | 기능 구현, 마이그레이션, 테스트 생성 |
| 도구 | GitHub Copilot, Google Gemini Code Assist, Cursor, Windsurf | Google Jules, GitHub Copilot agent mode, Cursor background agents, Claude Code |

conductor 모드는 복잡한 로직, 까다로운 디버깅, 변경마다 이해가 필요한 낯선 코드베이스에서 전형적이다. 전통 엔지니어링 배경 개발자에게 자연스럽고 이해와 통제 감각을 보존한다. 다만 개발자가 모든 키스트로크를 직접 지휘하면 AI로 얻는 처리량 향상이 제한되므로 그 자체가 병목이 될 수 있다.

orchestrator 모드는 문법과 언어 관용구에 대한 깊은 전문성 대신 네 가지 스킬을 요구한다. Specification(agent가 모호함 없이 실행할 수 있을 만큼 정확한 task 정의), Decomposition(큰 task를 agent 실행에 적절한 크기 단위로 분할), Evaluation(agent output이 품질 기준을 만족하는지 빠른 판단), System design(agent를 생산적으로 유지하는 제약과 테스트와 피드백 루프 설계)이다. 그림 하단 띠는 왼쪽 fine-grained control에서 오른쪽 high-leverage delegation으로 이어지며 대부분의 개발자가 둘 사이를 유동적으로 오간다고 표기한다.

### 80% 문제

AI agent는 기능 코드의 약 80%를 빠르게 생성하지만 나머지 20%, 곧 엣지 케이스와 에러 처리와 통합점과 미묘한 정확성 요구는 현재 모델이 자주 결여한 깊은 맥락 지식을 요구한다.

AI 에러의 성격도 단순 문법 실수에서 더 교묘한 개념적 실패로 진화했다. 비즈니스 로직에 대한 잘못된 가정, 모호한 요구사항에 대한 확인 요청 실패, 누락된 엣지 케이스, 미묘한 장기 유지보수 부담을 만드는 아키텍처 결정이 그 예다. 코드가 "맞아 보이고" 기본 테스트를 통과할 수도 있기 때문에 정확히 그 이유로 탐지하기 더 어렵다.

효과적으로 대응하는 개발자는 AI가 잘하는 일(잘 명세된 task의 빠른 구현)에 AI를 쓰고, 자기 주의는 AI가 어려워하는 것(모호한 요구사항, 아키텍처 트레이드오프, 정확성 검증)에 남긴다.

### 코딩 에이전트의 3자리

- **In the editor**: 인라인 완성, 코드를 제자리에서 설명하거나 수정하는 챗 패널, IDE 안의 전체 코드베이스 인식. 코드를 쓰는 중에 흐름을 벗어나지 않고 제안과 빠른 편집을 원할 때 맞는다(GitHub Copilot, Cursor, Windsurf, JetBrains AI Assistant).
- **In the terminal**: 커맨드라인에서 실행하고 자연어로 목표를 넘긴다. 전체 파일시스템 접근, 멀티파일 편집, 도구와 테스트 실행과 결과 기반 반복이 가능하다. 낯선 코드베이스 탐색과 agent가 실행 결과에 반응해야 하는 task에 맞는다(Antigravity CLI, Claude Code, Codex CLI, Open Code, Cline). 원문은 진지한 vibe coding이 오늘날 여기서 일어난다고 적는다.
- **In the background**: 클라우드 호스팅 샌드박스에서 자율 실행하며 흔히 몇 시간 동안 작업하고 pull request를 output으로 낸다. 한 단락으로 서술하고 자리를 떠날 수 있는 잘 명세된 task에 맞는다. 알려진 버그 수정, 테스트 스위트 생성, 프레임워크 사이 코드 마이그레이션이 그 예다(Google Jules, GitHub Copilot agent mode, Cursor background agents, AlphaEvolve).

올바른 시작점은 어떤 범주가 자율성 사다리의 가장 높은 곳에 있는지가 아니라 task가 결정한다.

### 프로덕션 agent 빌드와 Agents CLI

만들어야 하는 대상 자체가 agent일 때는 상황이 다르다. 환불 요청을 처리하는 고객지원 봇, 출처를 상호 참조해 근거 있는 보고서를 만드는 리서치 어시스턴트, 컴플라이언스를 모니터링하는 내부 도구가 그런 예다. 이들은 자체 도구와 자체 메모리와 자체 평가와 자체 배포 인프라가 필요한 제품이다. 판별 기준은 세션을 넘는 지속 메모리, 도구와 데이터에 대한 범위 지정 권한, 배포 전 회귀를 잡는 eval 커버리지, agent가 실제로 무엇을 했는지 추적하는 observability다. 일회성 스크립트에는 일반 코딩 에이전트로 충분하며 그때 agent는 목적지다. 실제 사용자에게 규모로 서비스하는 agent에서는 agent가 제품이고 그 아래에 기반이 필요하다.

Google Agents CLI는 Google Cloud에서 agent를 만드는 skill 묶음을 담은 커맨드라인 도구이며, 개발자가 선호하는 코딩 에이전트가 무엇이든(Claude Code, Codex 등) 함께 동작한다. 한 번 설치하면 코딩 에이전트가 ADK 라이프사이클 전체를 덮는 7개 skill을 얻는다. 프로젝트 스캐폴딩, agent 코드 작성, 평가, Agent Runtime 배포, observability 연결이다.

```
# One-time setup
uvx google-agents-cli setup

# Then in your coding agent:
> Build a support agent that answers questions from our docs.
> evaluate it on the FAQ dataset
> Deploy it to Agent Engine
```

이 지시 뒤에서 코딩 에이전트가 템플릿에서 프로젝트를 스캐폴딩하고 ADK 코드를 쓰고 evalset을 생성해 실행하고 Agent Runtime에 배포한 뒤 결과를 보고한다. 직접 운전하려는 개발자는 같은 작업을 평범한 CLI 명령으로 쓸 수 있다(`agents-cli create`, `agents-cli playground`, `agents-cli eval`, `agents-cli deploy`). ADK는 그래프 기반 워크플로와 멀티에이전트 워크플로, 그리고 shared session state와 LLM 주도 delegation과 명시적 호출이라는 상호작용 수단을 제공한다. agent 사이 조율은 단순한 경우 shared session state로, 도구 접근은 Model Context Protocol(MCP)로, cross-agent delegation은 Agent2Agent(A2A) 프로토콜로 이루어진다.

Anthropic 엔지니어링 팀은 2026년 초 이런 아키텍처에서 동작하는 agent 팀이 2주에 걸쳐 Rust로 동작하는 C 컴파일러를 만든 실험을 발표했다. 인간은 방향을 설정하고 output을 리뷰했지만 구현을 쓰지 않았다. 병목은 코드를 쓰는 일에서 무엇을 해야 하는지 명세하고 agent가 실제로 그것을 했는지 검증하는 일로 옮겨 갔다.

### AI 개발 경제학 (Figure 9)

엔지니어링 리더에게 개발자 속도보다 중요한 지표는 총소유비용(TCO)이다. 워크플로가 자본적 지출(CapEx, 무언가를 만드는 선행 투자)과 운영 지출(OpEx, 실행하고 고치고 유지하는 지속 비용) 사이에서 부담을 어떻게 옮기는지 봐야 한다. AI 시대의 OpEx는 토큰 경제가 크게 지배한다.

| 구분 | Vibe Coding | Agentic Engineering |
|---|---|---|
| CapEx | 최소 투자. 전체 비중의 12%로 표기 | 선행 플랫폼 설계. 전체 비중의 88%로 표기 |
| OpEx | 높은 운영 비용. 전체 비중의 88%로 표기 | 낮은 marginal 운영 비용. 전체 비중의 12%로 표기 |
| 장점 | 첫 output까지의 속도 | 지속 가능한 확장 |
| 특징 | 빠른 프로토타이핑과 느린 확장, 장기 유지보수의 높은 마찰, 복잡한 시스템에서 경제적 막다른 길 | 통제된 iteration과 빠른 확장, 자동 갱신의 낮은 마찰, 성숙한 코드베이스에서 경제적으로 지속 가능 |

그래프의 세로축은 누적 총소유비용, 가로축은 시간과 배포된 기능 수다. vibe coding 곡선에는 Token Burn, Prompting Tax, Maintenance Tax, Security Risk, Context Collapse가 순서대로 표기되고, agentic engineering 곡선에는 Regressions Caught가 세 곳에 표기된다. 두 곡선이 만나는 crossover point의 설명은 "이 지점에서 vibe coding이 기능당 3배에서 10배 더 비싸진다"다.

vibe coding의 숨은 OpEx는 세 항목이다. 토큰 소진율(Token Burn Rate)은 방대한 비정형 파일을 context window에 던져 넣고 검증되지 않은 자기 실수를 고치라고 반복 요청하면서 발생하며, first-pass 성공률이 낮은 상태로 API 토큰을 소진하는 비싼 프롬프팅 루프를 만든다. 유지보수세(Maintenance Tax)는 임시 프롬프팅으로 쓴 코드가 구조적 일관성이 부족해 6개월 뒤 버그가 생기면 비정형 "스파게티" 코드를 역공학하는 데 며칠이 드는 비용이다. 보안 리메디에이션(Security Remediation)은 자동 평가 harness가 없을 때 빠른 코드 생성이 빠른 취약점 생성으로 이어지는 비용이며, 프로덕션에서 보안 결함을 고치는 비용은 설계 단계에서 잡는 비용보다 지수적으로 높다.

agentic engineering의 CapEx에는 API 스키마 설계, 결정적 테스트 스위트 구축, 그리고 가장 중요하게 agent의 컨텍스트 구조화가 든다. 선행 비용은 높지만 기능을 배포하고 유지하는 marginal 비용이 크게 낮아진다. AI가 엄격하게 통제된 "공장" 안에서 동작하므로 output이 구조적으로 건전하고 미리 테스트되었으며 회사 표준에 정렬된다.

재무 레버는 두 가지다. context engineering은 10만 토큰 규모 저장소 전체를 매 프롬프트에 넘기는 것이 규모에서 재무적으로 불가능하다는 인식에서 출발해, 밀도 높고 신호가 강한 payload(정밀한 AGENTS.md와 아키텍처 가드레일)로 first-pass 성공률을 올려 시행착오 루프를 없앤다. intelligent model routing은 고도로 복잡한 task(요구사항, 아키텍처, 초기 구현)에는 큰 프론티어 모델을 쓰고 결정적이고 복잡도가 낮은 task(테스트 생성, 코드 리뷰, CI/CD 모니터링)는 더 작고 빠르고 훨씬 싼 모델로 자동 라우팅한다. dynamic 컨텍스트와 skill을 통한 추가 최적화는 Day-3 편으로 넘긴다.

### 실천 처방

기본 원칙은 "AI는 자신이 놓인 엔지니어링 문화를 증폭한다"다. 대상별 액션 목록은 다음과 같다.

- **개인 개발자 6항목**: AGENTS.md를 열 줄부터 만들고 agent가 실수할 때마다 규칙을 추가한다. Agents CLI 같은 skill 묶음을 설치한다. 반복적 워크플로 하나를 첫 agent로 만든다. 코드를 생성하기 전에 테스트와 eval을 쓴다. 배포될 코드는 모든 줄을 리뷰한다. 디버깅과 시스템 설계 같은 기본기를 유지한다.
- **엔지니어링 리더 5항목**: context engineering을 1급 실천으로 만든다. 기준을 데모가 아니라 eval에 두고 루브릭을 명시한다(task 성공, tool use 품질, trajectory 준수, 환각, 응답 품질). AI 생성 코드용으로 코드 리뷰를 재설계한다. 프로토타이핑 작업과 프로덕션 작업의 경계를 명시한다. harness 구성 요소를 공유 팀 자산으로 투자한다.
- **조직 5항목**: AI 보조 개발을 생산성 기능이 아니라 엔지니어링 투자로 다룬다. 규모화 전에 프로덕션 기반(substrate)에 투자한다. MCP와 A2A 같은 오픈 표준을 채택한다. 사람과 agent의 하이브리드 팀을 전제로 팀 구조를 재편한다. 채용과 역량 개발을 판단 중심으로 재편한다.

### 결론의 세 원칙

1. **Structure scales, vibes don't**: 조직이 의존하는 소프트웨어에는 명세와 테스트와 가드레일과 사람의 감독이라는 규율이 선택이 아니다. "되는 것 같다"와 "모든 조건에서 정확히 동작한다" 사이의 간극에 프로덕션 장애와 보안 취약점과 유지보수 악몽이 산다.
2. **AI amplifies your engineering culture**: AI는 힘의 승수여서 강점도 약점도 함께 증폭한다. 테스트 실천과 아키텍처 표준과 리뷰 문화가 강한 조직이 훨씬 더 많은 값을 얻는다.
3. **The human role is evolving, not diminishing**: 중요한 스킬이 구현에서 판단으로 이동한다. 마지막 문장은 "Generation is solved. Verification, judgment, and direction are the new craft."다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

| 항목 | 수치 | 출처 성격 |
|---|---|---|
| AI 코딩 에이전트 상시 사용 | 전문 개발자의 85% | endnote 1(GetPanto, Index.dev), 2026년 초 |
| 매일 사용 | 51% | endnote 1, 2026년 초 |
| 신규 코드 중 AI 생성 비율 | 41%(추정) | endnote 1, 2026년 초 |
| 생산성 향상 | 25%에서 39% | endnote 7(GroovyWeb, EPAM) 산업 서베이. 일부 task는 더 큰 향상 |
| 생산성 향상 전망 | 30%에서 35% | endnote 9(Deloitte). 개발 프로세스 전체 기준이며 본문 서술에는 인용되지 않고 endnote에만 있다 |
| 숙련 개발자의 특정 task 소요 시간 | 19% 증가 | METR 연구. AI output 검증과 디버깅과 교정에 쓴 시간이 주된 원인 |
| harness 변경만으로 순위 이동 | Terminal Bench 2.0에서 Top 30 밖에서 Top 5로 | 모델 변경 없음 |
| harness 변경만으로 점수 향상 | 같은 벤치마크에서 13.7점 | LangChain 연구. 고정 모델 주위의 시스템 프롬프트와 도구와 미들웨어만 조정 |
| crossover point 이후 기능당 비용 | vibe coding이 3배에서 10배 | Figure 9 그래프 표기 |
| CapEx와 OpEx 비중 표기 | vibe는 CapEx 12%, agentic은 OpEx 12% | Figure 9 막대 표기 |
| harness와 model의 비중 표기 | model 약 10%, harness 약 90% | Figure 7 범례 표기 |
| Agents CLI가 부여하는 skill 수 | 7개 | ADK 라이프사이클 전체 |
| Anthropic 실험 | agent 팀이 2주에 걸쳐 Rust로 동작하는 C 컴파일러 구현 | 2026년 초 발표. 인간은 방향 설정과 리뷰만 담당 |
| AI가 빠르게 생성하는 기능 코드 비율 | 약 80% | 80% 문제. 나머지 20%가 깊은 맥락 지식을 요구 |

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **변화 속도에 대한 자체 주석**: 단계별 그림은 2026년 중반 상태를 반영하고 빠르게 바뀌고 있다고 밝힌다. 압축이 구현을 넘어 퍼지는 조짐이 있고, 이미 개발자가 명세에서 리뷰로 직행하며 AI agent가 구현과 테스트와 배포를 백그라운드에서 처리하는 워크플로를 실험하는 팀이 있다. 이 절이 그린 경계선은 12개월 후 달라 보일 수 있다. 변하지 않을 것은 인간의 판단과 취향, 그리고 AI output을 검증하는 스킬이다.
- **2차 종합 문서의 성격**: LangChain, Anthropic, METR, Terminal Bench, Deloitte 수치는 모두 외부 인용이다. 실험 조건과 재현 가능성은 각 원출처를 확인해야 한다. endnote 상첨자 번호가 endnote 목록과 어긋나는 자리도 있다(METR 인용은 본문에 8, 목록에 10).
- **결론이 언급하는 미개발 분류**: 결론 절(47쪽)은 이 백서가 제시한 framework의 하나로 "ambient, workflow, autonomous agent의 taxonomy"를 든다. 그러나 본문은 그 세 범주 대신 editor, terminal, background라는 자리 기준 3분류를 전개한다. 결론이 참조하는 분류가 본문에 없다.
- **80% 문제의 미해결**: 나머지 20%(엣지 케이스, 에러 처리, 통합점, 미묘한 정확성)는 여전히 인간의 깊은 맥락 지식을 요구하는 상수로 남는다.
- **보안**: 자동 평가 harness 없는 빠른 생성이 빠른 취약점 생성으로 이어진다고 지적하고, 프로덕션에서의 수정 비용이 설계 단계 대비 지수적으로 높다고 적는다. 엔지니어링 리더 처방에서는 환각된 의존성을 리뷰 시 추가 주의 대상으로 지목한다. endnote 목록에는 slopsquatting 자료(27번)와 AI 생성 코드의 보안 리스크 자료(16번, 26번)가 실려 있다.
- **후속 편으로의 이관**: 세션과 skill과 메모리 설계, 프로덕션 시스템의 토큰 경제 최적화는 Day-3 편(Context Engineering: Sessions, Skills & Memory)으로, spec-driven development와 구조적 코드 리뷰, 가드레일, 샌드박싱, 제로트러스트 개발은 Day-5 편(Spec-Driven Production Grade Development in the Age of Vibe Coding)으로 넘긴다.

## 6. 관련 연구 (Related Work)

- **Karpathy, "Vibe Coding"** (2025-02, X 포스트, endnote 2): 용어의 시초. 2026년 초 Karpathy 본인이 원 framing이 너무 좁았다고 인정하고 "agentic engineering"을 도입했다(endnote 4).
- **Google, "Introduction to Agents"** (2025-11 백서, endnote 11, 17, 24, 25): agent 5개 부품, 멀티에이전트 설계 패턴, agent 품질, 프로토타입에서 프로덕션까지를 다룬다. 본 백서의 참조 기반이다.
- **METR, "Uplift Update: Measuring the Impact of AI Coding Tools"** (2026-02, endnote 10): 19% 지연 반례의 출처다.
- **Addy Osmani 블로그**: Agentic Engineering(endnote 3), The Factory Model(endnote 8), From Conductors to Orchestrators(endnote 12), The 80% Problem in Agentic Coding(endnote 14), Beyond Vibe Coding(O'Reilly, endnote 28), My LLM Coding Workflow Going Into 2026(endnote 30).
- **Google ADK, MCP, A2A** (endnote 18, 19, 24): Agent Development Kit, Model Context Protocol, Agent2Agent 프로토콜.
- **Google Jules** (endnote 13), **Gemini Code Assist** (endnote 21), **Gemini CLI** (endnote 23): 백서가 도구 예시로 든 Google 제품군.
- **보안 관련**: Lawfare, "When the Vibes Are Off: The Security Risks of AI-Generated Code"(endnote 16, 26), DevOps.com의 slopsquatting 자료(endnote 27), Dark Reading의 2026 보안 함정 자료(endnote 22).

## 7. 용어집 (Glossary)

- **Vibe coding**: 원하는 것을 자연어로 말하고 AI output을 수용하며 깨지면 에러 메시지를 복사해 고치라고 요청하는 방식. 검증이 선택적이다.
- **Agentic engineering**: 명세와 테스트와 가드레일과 아키텍처에 대한 인간 감독으로 AI 구현을 둘러싸는 규율. 검증이 필수다. Karpathy가 2026년 초 도입했다.
- **Structured AI-Assisted Coding**: 스펙트럼의 중간 구간. 예시와 제약이 붙은 상세 프롬프트를 쓰고 수동 테스트와 스팟체크로 검증한다.
- **Factory model**: 개발자의 1차 산출물이 코드가 아니라 코드를 생산하는 시스템이라는 멘털 모델. Developer Zone과 Agent Factory Floor로 그려진다.
- **Output evaluation / Trajectory evaluation**: 최종 산출물을 검사하는 평가와 tool call과 중간 추론의 전체 순서를 검사하는 평가.
- **Continuous quality flywheel**: 벤치마크 평가, 근본 원인 클러스터링, 프롬프트와 도구 최적화, 회귀 검증, 프로덕션 모니터링의 순환.
- **Conductor / Orchestrator**: 실시간 동기 방식으로 IDE에서 밀착 지휘하는 모드와 비동기 고수준 방식으로 멀티에이전트에 위임하는 모드.
- **80% problem**: AI가 기능 코드의 약 80%를 빠르게 생성하지만 나머지 20%(엣지 케이스, 에러 처리, 통합점, 미묘한 정확성)는 현재 모델이 결여한 깊은 맥락 지식을 요구하는 문제.
- **CapEx / OpEx**: 자본적 지출(선행 구축 투자)과 운영 지출(실행하고 고치고 유지하는 비용). AI 시대의 OpEx는 토큰 경제가 지배한다.
- **Token Burn Rate**: 비정형 파일을 context window에 통째로 던지고 검증되지 않은 실수를 반복 수정하게 하면서 API 토큰을 소진하는 비율.
- **Maintenance Tax / Security Remediation**: 비정형 AI 생성 코드를 역공학하는 비용과, 평가 harness 없이 생성된 코드의 취약점을 고치는 비용.
- **Intelligent model routing**: 복잡한 task는 큰 프론티어 모델로, 결정적이고 복잡도 낮은 task는 작고 싼 모델로 자동 라우팅하는 방식.
- **Agents CLI**: Google Cloud에서 agent를 만드는 skill 묶음을 담은 커맨드라인 도구. 코딩 에이전트에 ADK 라이프사이클 7개 skill을 부여한다.
- **ADK / Agent Runtime**: Google Agent Development Kit과 그 배포 대상 런타임.

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 8 | "Figure 1: autocomplete에서 autonomy까지 5세대 진화" | caption-region | ★ wiki 권장 (개괄) |
| fig02 | 10 | "Figure 2: agent loop의 네 단계" | caption-region | (선택) 기본 개념 |
| tab01 | 13 | "Table 1: 6개 항목으로 비교한 스펙트럼" | table-region | ★ wiki 권장 (핵심 표) |
| fig03 | 14 | "Figure 3: vibe coding에서 agentic engineering까지의 스펙트럼" | caption-region | ★ wiki 권장 (method) |
| fig04 | 17 | "Figure 4: 여섯 종류의 agent 컨텍스트를 static과 dynamic으로 배치하는 결정" | caption-region | ★ wiki 권장 (method) |
| fig05 | 20 | "Figure 5: 전통 iterative SDLC와 AI 주도 SDLC 비교" | caption-region | ★ wiki 권장 (핵심) |
| fig06 | 25 | "Figure 6: factory model의 두 영역" | caption-region | (선택) |
| fig07 | 27 | "Figure 7: harness 해부도" | caption-region | ★ wiki 권장 (센터피스) |
| fig08 | 32 | "Figure 8: conductor와 orchestrator 두 모드 비교" | caption-region | ★ wiki 권장 (역할) |
| fig09 | 40 | "Figure 9: AI 개발의 경제학" | caption-region | ★ wiki 권장 (경제학) |

**기본 권장 큐레이션**: `fig01, fig03, fig04, fig05, fig07, fig08, fig09, tab01` 8개다. 5세대 개괄, 스펙트럼, context engineering, SDLC 대조, harness 해부, 역할 두 모드, 경제학, 6개 항목 비교표를 모두 덮는다.

**보류 항목**: `fig02`(agent loop)는 agents 도메인 다른 페이지가 같은 도식을 이미 담아 중복이고, `fig06`(factory model)은 본문 표와 산문으로 옮겨 적었다. 두 항목은 sources frontmatter에 `curated: false`로 남아 나중에 재선택할 수 있다.

38쪽의 Snippet 1(Agents CLI 명령)은 코드 블록이라 `extract_figures.py`가 figure로 검출하지 않았다. 명령 자체는 본문 코드 블록으로 옮겨 적었으므로 이미지 후보로 두지 않는다.
