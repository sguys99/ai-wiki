---
title: "The New SDLC With Vibe Coding: From ad-hoc prompting to Agentic Engineering"
type: report
year: 2026
category: agents
raw_path: /Users/sguys99/Desktop/project/ai-wiki/raw/reports/google-2026-the-new-sdlc-with-vibe.pdf
raw_filename: "google-2026-the-new-sdlc-with-vibe.pdf"
source_collection: external
source: google-2026-the-new-sdlc-with-vibe.md
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
    caption: "From Autocomplete to Autonomy — autocomplete → inline → chat → coding agents → autonomous agents (2021~2026)"
    page: 8
    bbox_norm: [0.1061, 0.158, 0.8939, 0.5189]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/google-2026-the-new-sdlc-with-vibe/fig02.png
    raw: raw/reports/google-2026-the-new-sdlc-with-vibe-figures/fig02.png
    caption: "The Agent Loop — Perceive → Plan → Act(Tools) → Observe → iterate (self-correcting)"
    page: 10
    bbox_norm: [0.1078, 0.4987, 0.8922, 0.8474]
    strategy: caption-region
    curated: false
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/google-2026-the-new-sdlc-with-vibe/fig03.png
    raw: raw/reports/google-2026-the-new-sdlc-with-vibe-figures/fig03.png
    caption: "The Vibe Coding to Agentic Engineering Spectrum — 차별점은 AI 사용 여부가 아니라 output 검증 방식"
    page: 14
    bbox_norm: [0.1062, 0.1716, 0.8938, 0.4731]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/google-2026-the-new-sdlc-with-vibe/fig04.png
    raw: raw/reports/google-2026-the-new-sdlc-with-vibe-figures/fig04.png
    caption: "Context Engineering — Static(항상 로드, 고비용) vs Dynamic(온디맨드, 저비용) 컨텍스트 6종"
    page: 17
    bbox_norm: [0.1074, 0.158, 0.8926, 0.4811]
    strategy: caption-region
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/google-2026-the-new-sdlc-with-vibe/fig05.png
    raw: raw/reports/google-2026-the-new-sdlc-with-vibe-figures/fig05.png
    caption: "Traditional SDLC vs AI-Driven SDLC — 같은 단계, 다른 병목·비율 (sprint 주 단위 → iteration 분·시간 단위)"
    page: 20
    bbox_norm: [0.106, 0.1591, 0.894, 0.4716]
    strategy: caption-region
    curated: true
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/google-2026-the-new-sdlc-with-vibe/fig06.png
    raw: raw/reports/google-2026-the-new-sdlc-with-vibe-figures/fig06.png
    caption: "The Factory Model — 개발자는 시스템을 설계, 에이전트가 코드 생산, 테스트가 output 검증 (Developer Zone / Agent Factory Floor)"
    page: 25
    bbox_norm: [0.1078, 0.2608, 0.8922, 0.6119]
    strategy: caption-region
    curated: false
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/google-2026-the-new-sdlc-with-vibe/fig07.png
    raw: raw/reports/google-2026-the-new-sdlc-with-vibe-figures/fig07.png
    caption: "Harness Anatomy — Agent = Model(~10%) + Harness(~90%). LLM을 감싸는 동심원 계층 (프레임워크·개발자 인터페이스·클라우드)"
    page: 27
    bbox_norm: [0.1062, 0.2727, 0.8912, 0.6856]
    strategy: caption-region
    curated: true
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/google-2026-the-new-sdlc-with-vibe/fig08.png
    raw: raw/reports/google-2026-the-new-sdlc-with-vibe-figures/fig08.png
    caption: "Conductor vs Orchestrator — 실시간·동기·IDE(fine-grained) vs 비동기·고수준·멀티에이전트(delegation)"
    page: 32
    bbox_norm: [0.1061, 0.1577, 0.8939, 0.5917]
    strategy: caption-region
    curated: true
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/google-2026-the-new-sdlc-with-vibe/fig09.png
    raw: raw/reports/google-2026-the-new-sdlc-with-vibe-figures/fig09.png
    caption: "The Economics of AI Development — Vibe Coding(Low CapEx·High OpEx) vs Agentic Engineering(High CapEx·Low OpEx), crossover point"
    page: 40
    bbox_norm: [0.1062, 0.1576, 0.8938, 0.4509]
    strategy: caption-region
    curated: true
  - id: tab01
    label: Table 1
    kind: table
    file: assets/google-2026-the-new-sdlc-with-vibe/tab01.png
    raw: raw/reports/google-2026-the-new-sdlc-with-vibe-figures/tab01.png
    caption: "Table 1 — 6개 축으로 본 Vibe Coding → Structured AI-Assisted → Agentic Engineering 스펙트럼"
    page: 13
    bbox_norm: [0.1078, 0.1594, 0.8926, 0.6227]
    strategy: table-region
    curated: true
---

## 요약 (Summary)

Addy Osmani·Shubham Saboo·Sokratis Kartakis가 쓴 Google 백서(2026-05, 51쪽). 핵심 명제는 *"소프트웨어 공학에서 가장 깊은 전환은 새 언어나 프레임워크가 아니라, 코드를 쓰던 데서 **의도(intent)를 표현하는 것으로** 옮겨가는 것"* 이다. 이 전환을 두 개의 렌즈로 정리한다 — **vibe coding → agentic engineering 스펙트럼**(연속체)과 **Agent = Model + Harness** 방정식.

2026년 초 기준 전문 개발자의 85%가 AI 코딩 에이전트를 상시 쓰고, 51%가 매일, 신규 코드의 41%가 AI 생성이다. 이런 채택 현실 위에서 SDLC 전 단계(요구사항·설계·구현·테스트·리뷰·유지보수)가 어떻게 재편되는지를 짚는다. 다만 압축은 불균등하다. 구현은 주 단위에서 시간 단위로 붕괴하지만, 요구사항·아키텍처·검증은 여전히 인간 속도다.

백서 시리즈의 Day-1 편으로, Day-3(Context Engineering: Sessions·Skills·Memory)과 Day-5(Spec-Driven Production-Grade Development)의 도입부 역할을 한다. LangChain·Anthropic·METR·Terminal Bench 수치는 외부 인용(2차 종합)이라 재현 조건은 원출처를 확인해야 한다.

![[assets/google-2026-the-new-sdlc-with-vibe/fig01.png]]
*Figure 1: From Autocomplete to Autonomy — autocomplete → inline → chat → coding agent → autonomous agent의 5세대 진화. 각 세대는 앞 세대를 보존하며 한 엔지니어가 해낼 수 있는 천장을 올렸다 (Osmani et al. 2026, p.8)*

## 주요 기여 (Key Contributions)

1. **syntax → intent 전환**: 개발의 1차 인터페이스가 문법(중괄호·세미콜론·타입)에서 "무엇을 만들지"의 의도로 이동. 인간은 의도·아키텍처·판단을 대고, 기계가 구현을 맡는다.
2. **vibe coding ↔ agentic engineering 스펙트럼**: 이분법이 아니라 연속체. 차별점은 "AI를 쓰는가"가 아니라 **output에 구조·검증·인간 판단이 얼마나 둘러싸는가**.
3. **검증 이원화 — Tests + Evals**: Tests는 결정적 부분(입력→출력), Evals는 비결정적 부분(궤적·도구 선택·품질). 둘 다 없으면 아무리 정교한 프롬프트여도 vibe coding이다.
4. **Context engineering이 진짜 기술**: 코드 품질은 프롬프트의 영리함보다 **컨텍스트 품질**에 달렸다. 6종 컨텍스트를 static/dynamic으로 배치하는 것이 1급 아키텍처 결정. Agent Skills가 그 핵심 패턴.
5. **factory model**: 개발자의 산출물은 코드가 아니라 "코드를 생산하는 시스템". 공장 관리자는 위젯을 손으로 조립하지 않고 조립 라인을 설계한다.
6. **Agent = Model + Harness**: 모델은 엔진일 뿐. 대부분의 에이전트 실패는 모델 탓이 아니라 **설정 실패**다.
7. **conductor ↔ orchestrator**: 실시간·IDE 밀착 지휘 vs 비동기·멀티에이전트 위임. 개발자는 두 모드를 유동적으로 오간다.
8. **AI 개발 경제학(TCO)**: vibe = Low CapEx / High OpEx, agentic = High CapEx / Low OpEx. context engineering과 model routing이 재무 레버.

## 방법론 및 아키텍처 (Methodology and Architecture)

### 스펙트럼 — 6축으로 본 세 구간

차별점은 AI 사용 여부가 아니라 output을 어떻게 검증하는가다. vibe coding에서 검증은 선택이지만, agentic engineering에서는 Tests(결정적)와 Evals(비결정적)가 함께 돈다.

| 차원 | Vibe Coding | Structured AI-Assisted | Agentic Engineering |
|---|---|---|---|
| 의도 명세 | 캐주얼 자연어 프롬프트 | 예시·제약 붙은 상세 프롬프트 | 정식 스펙·아키텍처 문서·memory 파일 |
| 검증 | "되는 것 같은데?" | 수동 테스트·스팟체크 | 자동 테스트·CI/CD 게이트·LM judge |
| 코드베이스 이해 | 최소 (생성 코드 안 읽기도) | 핵심 경로만 선별 리뷰 | 아키텍처 전면 리뷰, 세부는 AI |
| 에러 처리 | 에러 메시지 복붙 | 개발자 진단 → AI 수정 | 에이전트 자가진단(경계 내), 인간은 아키텍처 |
| 적정 범위 | 프로토타입·스크립트·해커톤 | 기존 코드베이스 내 기능 | 프로덕션·팀 규모 |
| 리스크 | 높음(폐기용 OK) | 중간 | 낮음(전 단계 검증) |

![[assets/google-2026-the-new-sdlc-with-vibe/tab01.png]]
*Table 1: 6개 축으로 본 스펙트럼 (Osmani et al. 2026, p.13)*

![[assets/google-2026-the-new-sdlc-with-vibe/fig03.png]]
*Figure 3: 적정 위치는 stakes가 결정한다 — 주말 프로토타입은 순수 vibe coding, 금융 거래 API는 agentic engineering. 실력은 "어디에 선을 그을지 아는 것" (Osmani et al. 2026, p.14)*

### Context Engineering — Static vs Dynamic

코드 품질은 프롬프트가 아니라 컨텍스트가 좌우한다. 개발자가 다뤄야 할 컨텍스트는 여섯 종이다. Instructions(역할·목표·경계), Knowledge(문서·다이어그램·도메인), Memory(단기 세션 + 장기 상태), Examples(few-shot·레퍼런스), Tools(API·스크립트 정의), Guardrails(하드 제약·안전 검증).

- **Static context**: 항상 로드된다 — 시스템 지시, rule 파일(AGENTS.md·CLAUDE.md·GEMINI.md), 글로벌 메모리, 페르소나. 신뢰성은 높지만 매 상호작용마다 토큰을 먹어 비싸다.
- **Dynamic context**: 온디맨드로 로드된다 — task 매칭 skill, 툴 결과, RAG 문서, 윈도우 세션 히스토리. 필요할 때만 비용을 낸다.

무엇을 어디에 둘지가 진짜 트레이드오프다. static이 많으면 토큰이 낭비되고 신호가 희석되며, 적으면 규칙을 망각한다. 이 경계를 설정 코드처럼 리뷰하고 버전 관리하는 것이 최선의 시스템이다.

dynamic context 관리에서 가장 강력한 패턴은 Agent Skills다. progressive disclosure 덕분에 에이전트는 시작할 때 메타데이터만 보고, task가 맞으면 전체 지시를, 필요할 때만 심화 참조를 로드한다. 그래서 경량 제너럴리스트가 수십 개 전문 역할을 짊어지면서도 지금 쓰는 하나의 토큰만 낸다. 이 패턴 하나로 네 가지 고질병(프롬프트 과부하로 인한 context rot, LLM의 절차 기억 부재, 멀티에이전트 운영 오버헤드, 툴·벤더 이식성)이 한꺼번에 풀린다.

![[assets/google-2026-the-new-sdlc-with-vibe/fig04.png]]
*Figure 4: 6종 컨텍스트를 static(고비용·항상)과 dynamic(저비용·온디맨드)으로 배치하는 결정 — "무엇을 어디에?" (Osmani et al. 2026, p.17)*

### 새 SDLC — 단계별 변화

AI는 사이클을 극적이되 불균등하게 압축한다. 결과는 빨라진 옛 SDLC가 아니라 다른 워크플로우다. 단계 경계는 흐려지고, 반복 주기는 주에서 분으로 줄며, 개발자는 구현자에서 시스템 설계자이자 품질 조정자로 옮겨간다.

- **요구사항/계획**: user story 생성, 엣지 케이스 식별, API 스키마·프로토타입 생성이 여기 든다. 요구사항은 팀 간 hand-off 문서가 아니라 인간-AI 대화가 되어, 명세와 초기 구현을 동시에 낸다.
- **설계/아키텍처**: 가장 인간 중심적인 단계다. 트레이드오프(일관성 vs 가용성, build vs buy)는 AI가 온전히 파악하지 못하는 비즈니스·조직 맥락에 걸린다. AI는 결정된 아키텍처를 스캐폴딩하는 데 탁월하고, 개발자는 boilerplate 작성에서 구조적 결정의 문서화로 옮겨간다.
- **구현**: 산업 서베이는 25~39% 생산성 향상을 보고한다. 그러나 METR 연구를 보면 숙련 개발자가 특정 작업에서 검증·디버깅·수정에 시간을 쓰느라 오히려 19% 더 걸렸다. AI는 구현을 없앤다기보다 "쓰기"를 "리뷰·안내·검증"으로 바꾼다.
- **테스트/QA**: output evaluation(컴파일·테스트 통과?)과 trajectory evaluation(툴 콜·중간 추론 전 과정)이 둘 다 필요하다. 검증을 건너뛴 매끈한 output이 눈에 보이는 에러보다 위험하기 때문이다. 이를 "continuous quality flywheel"(벤치마크 평가 → 실패 클러스터링 → 프롬프트·툴 최적화 → 회귀 검증 → 프로덕션 모니터링)로 엮으면 매 사이클이 복리로 쌓인다.
- **코드 리뷰/배포**: AI가 1차 리뷰어(버그·스타일·보안·성능)로 인간의 인지 부담을 덜어준다. 다만 인간 리뷰를 대체하진 않는다. 배포 파이프라인도 AI-aware로 헬스 모니터링·자동 롤백·리스크 예측을 한다.
- **유지보수/진화**: 가장 과소평가된 변화다. "너무 위험해서 못 건드리던" 레거시를 안전하게 리팩터하고 현대화하며, 프레임워크 마이그레이션이나 deprecated API 갱신처럼 과거엔 미뤄지던 일이 실제로 일어난다.

![[assets/google-2026-the-new-sdlc-with-vibe/fig05.png]]
*Figure 5: Traditional vs AI-Driven SDLC — 같은 단계지만 병목과 비율이 다르다. sprint 주 단위 → iteration 분·시간 단위, 명세 품질이 새 병목 (Osmani et al. 2026, p.20)*

### The Factory Model

이 모든 변화를 묶는 심상이 factory model이다. 개발자의 1차 산출물은 코드가 아니라 코드를 생산하는 시스템, 곧 명세와 컨텍스트, 구현하는 에이전트, 검증하는 테스트·게이트, 실패를 되돌리는 피드백 루프, 안전을 강제하는 가드레일이다. 공장 관리자가 위젯을 손으로 조립하는 대신 조립 라인을 설계하고 품질을 관리하듯, 개발자는 시스템을 설계하고 그 output이 기준을 넘는지를 본다. 성공은 단계별 지시가 아니라 성공 기준을 주고 반복하게 두는 데서 온다.

### Agent = Model + Harness

모델을 시스템으로 착각하면 투자가 어긋난다. 새 모델이 나오면 에이전트가 똑똑해지고 옛 모델이면 나빠진다는 직관은 틀렸다. 모델은 하나의 입력일 뿐이고, 나머지 전부, 곧 프롬프트, 툴, 컨텍스트 정책, 훅, 샌드박스, 서브에이전트, 관측성이 모델을 감싸 실제로 일을 끝내게 하는 하네스(harness)다.

하네스의 구성:

- **Instructions & Rule Files**: 에이전트가 누구이고 무엇을 금지당하는지 — AGENTS.md·CLAUDE.md·GEMINI.md·skill·서브에이전트 프롬프트.
- **Tools**: 함수·MCP 서버·API + 언제·어떻게 호출할지 알려주는 산문.
- **Sandboxes / 실행 환경**: 코드가 실제 도는 곳, 닿을 수 있고 없는 범위.
- **Orchestration logic**: 서브에이전트 스포닝·모델 라우팅·전문가 hand-off와 발동 규칙.
- **Guardrails / Hooks**: 툴 콜 전·파일 편집 후·커밋 전 같은 지점에 도는 결정적 코드. 에이전트가 자주 잊는 것을 붙잡아 두는 자리.
- **Observability**: 로그·트레이스·평가·비용/지연 계측. 없으면 에이전트가 조용히 드리프트하는지 알 수 없다.

하네스 효과는 측정된다. Terminal Bench 2.0에서 한 팀은 모델을 전혀 바꾸지 않고 하네스만 손봐 Top 30 밖에서 Top 5로 올라갔다. LangChain은 같은 모델에 시스템 프롬프트·툴·미들웨어만 조정해 같은 벤치마크를 13.7점 올렸다. 여기서 얻는 일상의 교훈은 이렇다. 에이전트가 뭔가 잘못하면 첫 본능은 모델 탓이지만, 정직하게 따져보면 대부분은 빠진 툴, 모호한 규칙, 없는 가드레일, 노이즈로 찬 컨텍스트로 되짚어진다. 대부분의 에이전트 실패는 설정 실패다.

SDLC 단계별 하네스의 역할: ① 요구사항·계획·아키텍처 = 하네스 설정·보정(rule 파일·툴·불변 규칙 정의) → ② 구현 = 하네스 실행(샌드박스·툴 경계) → ③ 테스트·QA = 피드백 루프(orchestration이 실패 output을 모델로 되돌려 think→act→observe) → ④ 리뷰·배포·유지보수 = 관측(훅으로 하드코딩 비밀번호 커밋 차단, observability로 드리프트·비용 감사).

![[assets/google-2026-the-new-sdlc-with-vibe/fig07.png]]
*Figure 7: Harness Anatomy — Agent = Model(~10%) + Harness(~90%). LLM을 감싸는 동심원(프레임워크 → 개발자 인터페이스 → 클라우드). "모델은 엔진, 하네스는 차·도로·교통법규" (Osmani et al. 2026, p.27)*

### Conductor vs Orchestrator

개발자의 역할은 두 모드 사이를 오간다.

| | Conductor | Orchestrator |
|---|---|---|
| 방식 | 실시간·동기·IDE 내 | 비동기·고수준·멀티에이전트 |
| 제어 | 키스트로크 수준, 즉시 피드백 | 목표 수준, 지연 피드백 |
| 범위 | 단일 파일, 항상 루프 안 | 멀티 파일, 결과(궤적) 리뷰 |
| 적합 | 탐색·프로토타이핑·새 API 학습 | 기능 구현·마이그레이션·테스트 생성 |
| 도구 | Copilot·Gemini Code Assist·Cursor·Windsurf | Jules·Copilot agent mode·Cursor background·Claude Code |

오케스트레이터 모드는 다른 스킬셋(명세·분해·평가·시스템 설계)을 요구한다. 여기서 마주치는 것이 80% 문제다. AI가 기능의 약 80%를 빠르게 짜지만, 나머지 20%(엣지 케이스·에러 처리·통합점·미묘한 정확성)는 현재 모델이 결여한 깊은 맥락 지식을 요구한다. AI 에러도 문법 실수에서 개념적 실패(잘못된 비즈니스 로직 가정, 모호성에 대한 확인 미요청, 엣지 케이스 누락)로 진화했다. "코드가 맞아 보이고" 기본 테스트를 통과하는 탓에 탐지하기가 더 어렵다. 이를 잘 헤쳐 나가는 개발자는 AI가 잘하는 일(잘 명세된 task의 빠른 구현)에 AI를 쓰고, 자기 주의는 AI가 약한 곳(모호한 요구·아키텍처 트레이드오프·정확성 검증)에 남긴다.

![[assets/google-2026-the-new-sdlc-with-vibe/fig08.png]]
*Figure 8: Conductor(실시간·동기·IDE, fine-grained) vs Orchestrator(비동기·고수준·멀티에이전트, delegation). 대부분의 개발자는 둘 사이를 유동적으로 오간다 (Osmani et al. 2026, p.32)*

### 코딩 에이전트의 3자리

코딩 에이전트는 하루 안에서 세 자리에 등장하고, 대부분 셋을 동시에 쓴다.

- **In the editor**: 인라인 완성·챗·전체 코드베이스 인식. 흐름을 안 끊는 자리 (Copilot·Cursor·Windsurf·JetBrains AI).
- **In the terminal**: CLI에서 목표를 자연어로 위임, 파일시스템 접근·멀티파일 편집·툴/테스트 실행. 진지한 vibe coding이 여기서 일어난다 (Antigravity CLI·Claude Code·Codex CLI·Open Code·Cline).
- **In the background**: 클라우드 샌드박스에서 몇 시간씩 자율 실행, PR을 산출 (Jules·Copilot agent mode·Cursor background·AlphaEvolve).

올바른 시작점은 자율성 사다리의 높이가 아니라 task가 정한다.

### 프로덕션 에이전트 빌드 — Agents CLI

에이전트 자체가 제품일 때(고객지원 봇·리서치 어시스턴트·컴플라이언스 도구)는 자체 툴·메모리·평가·배포 인프라가 필요하다. Google Agents CLI(`uvx google-agents-cli setup`)는 선호하는 코딩 에이전트에 ADK 라이프사이클을 덮는 7개 skill(스캐폴딩·코드 작성·평가·Agent Runtime 배포·observability)을 부여한다. 개발자는 새 SDK를 배울 필요 없이 자연어로 지시하면 된다. 조율은 단순 케이스면 shared session state로, 툴 접근은 MCP로, cross-agent delegation은 A2A로 한다. Anthropic 팀은 2026년 초, 이 아키텍처 위에서 에이전트 팀이 2주 만에 Rust로 동작하는 C 컴파일러를 만든 실험을 발표했다(인간은 방향 설정과 리뷰만 맡고 구현은 안 씀).

## 결과 (Results)

- **채택률(2026 초)**: 전문 개발자 85% 상시 사용, 51% 매일, 신규 코드 41% AI 생성.
- **생산성**: 산업 서베이 25~39% 향상, Deloitte 30~35% 전망. 반례 — METR: 숙련 개발자가 특정 작업에서 19% 지연.
- **하네스 효과**: Terminal Bench 2.0에서 모델 불변·하네스만으로 Top 30 밖 → Top 5. LangChain 시스템 프롬프트·툴·미들웨어만 +13.7점.
- **경제학**: crossover point에서 vibe coding은 기능당 3~10배 비싸진다. 그래프 표기로 vibe = 12% CapEx·높은 OpEx, agentic = 높은 CapEx·12% OpEx.

![[assets/google-2026-the-new-sdlc-with-vibe/fig09.png]]
*Figure 9: The Economics of AI Development — vibe coding(Low CapEx·High OpEx)은 초반 speed to first output이 강점이나 crossover point 뒤로 토큰 번·유지보수세·보안 리메디에이션이 복리로 쌓인다. agentic engineering(High CapEx·Low OpEx)은 상류 투자 후 marginal cost가 급락 (Osmani et al. 2026, p.40)*

### 경제학 — 세 가지 레버

1. **The Hidden Debt of Vibe Coding**: 진입 장벽은 사실상 0이지만 복리 OpEx가 숨어 있다 — 토큰 번(비정형 파일을 통째로 컨텍스트에 던지고 자기 실수를 반복 수정하는 "프롬프팅 루프"), 유지보수세(6개월 뒤 비정형 "스파게티" 코드 역공학), 보안 리메디에이션(자동 eval 없는 급속 생성 = 급속 취약점).
2. **Context Engineering as a Financial Lever**: 10만 토큰 레포를 매 프롬프트에 통째로 넘기는 건 규모에서 재무적으로 불가능. 밀도 높은 고신호 payload(정밀한 AGENTS.md·아키텍처 가드레일)로 first-pass 성공률을 올려 시행착오 루프를 없앤다.
3. **Intelligent Model Routing**: 복잡 task(요구사항·아키텍처·초기 구현)엔 큰 프론티어 모델, 결정적 저복잡 task(테스트 생성·코드 리뷰·CI/CD 모니터링)엔 작고 싼 모델. 멀티모델 생태계로 품질 유지하며 운영 토큰 비용을 체계적으로 낮춘다.

## 실천 처방 (Where to Start)

- **개인 개발자**: ① AGENTS.md 열 줄부터(스택·컨벤션·하드 룰·워크플로우), 에이전트가 실수할 때마다 규칙 추가. ② Agents CLI 같은 skill 세트 설치. ③ 반복 워크플로우 하나를 첫 에이전트로. ④ **코드보다 테스트·eval을 먼저** — AI와의 계약이다. ⑤ 배포되는 모든 라인 리뷰(영리해 보이는 것 의심, import 실존 확인). ⑥ 개발자 기본기(디버깅·시스템 설계) 유지.
- **엔지니어링 리더**: ① context engineering을 1급 실천으로(AGENTS.md·프롬프트·eval·skill을 코드처럼 PR 리뷰·버전 관리). ② **데모가 아니라 eval에 기준을**(루브릭 없는 eval은 무의미). ③ AI 코드용으로 리뷰 재설계. ④ 프로토타이핑과 프로덕션 작업 경계 명시. ⑤ 하네스 컴포넌트를 공유 팀 자산으로.
- **조직**: ① AI 개발을 생산성 기능이 아니라 엔지니어링 투자로. ② 스케일 전에 프로덕션 substrate(CI eval·트레이스·범위 권한·보안 리뷰) 구축. ③ MCP·A2A 오픈 표준 채택. ④ 인간-에이전트 하이브리드 팀 전제. ⑤ 구현이 아니라 판단 중심으로 채용·역량 개발 재편.

## 세 가지 durable 원칙 (Conclusion)

1. **Structure scales, vibes don't** — 조직이 의존하는 소프트웨어엔 명세·테스트·가드레일·인간 감독의 규율이 선택이 아니다. "되는 것 같다"와 "모든 조건에서 정확히 된다" 사이의 간극에 프로덕션 장애·보안 취약점·유지보수 악몽이 산다.
2. **AI amplifies your engineering culture** — AI는 힘의 승수라, 강점도 약점도 함께 증폭한다. 테스트·아키텍처 표준·리뷰 문화가 강한 조직이 훨씬 더 큰 값을 얻는다.
3. **The human role is evolving, not diminishing** — 아키텍처를 이해하고 정밀히 명세하며 output을 비판적으로 평가하고 제약·피드백 루프를 설계하는 사람은 그 어느 때보다 가치 있다. *"Generation is solved. Verification, judgment, and direction are the new craft."*

## 관련 페이지 (Related Pages)

- [[agents/lee-hoyeon-2026-harness-engineering]] — Team Attention 이호연의 하네스 6축 순환 모델. 본 백서의 "Agent = Model + Harness" 방정식과 Terminal Bench/LangChain 하네스 수치를 공유하는 국내 강연.
- [[agents/hada-2026-agent-skills]] · [[agents/osmani-2026-agent-skills]] — 본 백서 "Agent Skills(progressive disclosure)" 절의 심화. dynamic context 관리 패턴.
- [[agents/seans-ai-stories-2026-agent-harness-loop-engineering]] — harness·loop·LLMOps를 단일 비유로 푼 입문 강의. 본 백서의 하네스·루프 개념과 직결.
- [[overviews/agent-harness-engineering-overview]] — Skills·Loops·Verification 개괄 합성 페이지. 본 백서를 상위 계보에 배치할 앵커.
- [[agents/bai-2026-how-do-ai-agents-spend]] — agentic 토큰 경제 실증 연구. 본 백서 "The Economics of AI Development(CapEx/OpEx·token burn)" 장의 정량적 뒷받침.
- [[agents/lin-2026-harness-updating-is-not-harness-benefit]] — 하네스 업데이트가 곧 이득은 아니라는 반론. 본 백서의 "하네스 효과" 주장에 대한 비판적 대조.

## 외부 참조 (External References)

- **Karpathy, "Vibe Coding"** (2025-02, X) — 용어 시초. [x.com/karpathy/status/1886192184808149383](https://x.com/karpathy/status/1886192184808149383)
- **Osmani 블로그** — [Agentic Engineering](https://addyosmani.com/blog/agentic-engineering/) · [Factory Model](https://addyosmani.com/blog/factory-model/) · [Conductors to Orchestrators](https://addyosmani.com/blog/future-agentic-coding/) · [80% Problem](https://addyo.substack.com/p/the-80-problem-in-agentic-coding)
- **METR** — [Uplift Update (2026-02)](https://metr.org/blog/2026-02-24-uplift-update/)
- **Google** — "Introduction to Agents" 백서(2025-11), [ADK](https://google.github.io/adk-docs/), [A2A](https://google.github.io/a2a-protocol/)
- **O'Reilly** — Osmani, [Beyond Vibe Coding](https://www.oreilly.com/library/view/beyond-vibe-coding/9798341634749/)
