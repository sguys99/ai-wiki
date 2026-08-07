---
title: "The New SDLC With Vibe Coding: From ad-hoc prompting to Agentic Engineering"
type: report
year: 2026
category: agents
raw_path: /Users/sguys99/Desktop/project/ai-wiki/raw/reports/google-2026-the-new-sdlc-with-vibe.pdf
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

## 한 줄 요약 (One-line Summary)

Addy Osmani·Shubham Saboo·Sokratis Kartakis가 쓴 Google 백서(2026-05). "코드를 쓰는 것에서 의도(intent)를 표현하는 것으로"라는 전환을 축으로, **vibe coding → agentic engineering** 스펙트럼과 **Agent = Model + Harness** 방정식을 통해 AI가 SDLC 전 단계를 어떻게 재편하는지를 정리한 입문·전략 문서다. Day-1 백서로, Day-3(Context Engineering)·Day-5(Spec-Driven Development)의 도입부 역할을 한다.

## 1. 자료 정보 (Document Information)

- **제목**: The New SDLC With Vibe Coding — From ad-hoc prompting to Agentic Engineering
- **저자**: Addy Osmani, Shubham Saboo, Sokratis Kartakis (content: Elia Secchi, Julia Wiesinger, Anant Nawalgaria)
- **발행**: Google, 2026년 5월, 51쪽 (백서 시리즈 Day-1)
- **유형**: 산업 백서(report). AI/ML 사전지식 없는 소프트웨어 엔지니어·매니저·아키텍트·기술 리더 대상.
- **핵심 통계 (2026 초 기준, endnote 1)**: 전문 개발자의 85%가 AI 코딩 에이전트를 상시 사용, 51%가 매일 사용, 신규 코드의 41%가 AI 생성.
- **위치**: 하네스 계열(harness engineering) 자료군의 개괄판. Anthropic/LangChain/METR 등 외부 수치를 인용한 2차 종합 문서로, 원 측정치는 각 endnote 원출처 확인 필요.

## 2. 주요 기여 (Key Contributions)

1. **syntax → intent 전환 정의**: 개발의 1차 인터페이스가 문법(중괄호·세미콜론·타입)에서 "무엇을 만들지"의 의도 표현으로 이동. autocomplete → inline → chat → coding agent → autonomous agent의 5세대 진화(Figure 1).
2. **vibe coding ↔ agentic engineering 스펙트럼**: 이분법이 아닌 연속체. 차별점은 "AI를 쓰는가"가 아니라 **output에 구조·검증·인간 판단이 얼마나 둘러싸는가**. 6개 축(의도 명세·검증·코드베이스 이해·에러 처리·적정 범위·리스크)으로 3구간 비교(Table 1).
3. **검증 이원화 — Tests + Evals**: Tests는 결정적(deterministic) 부분(입력→출력)을, Evals는 비결정적 부분(에이전트의 궤적·도구 선택·응답 품질)을 검증. 둘 다 없으면 아무리 정교한 프롬프트도 vibe coding.
4. **Context engineering이 진짜 기술**: 코드 품질은 프롬프트의 영리함보다 **컨텍스트 품질**에 좌우. 6종 컨텍스트(Instructions·Knowledge·Memory·Examples·Tools·Guardrails)를 static/dynamic으로 배치하는 것이 1급 아키텍처 결정. **Agent Skills**(progressive disclosure)가 dynamic context 관리의 핵심 패턴.
5. **factory model**: 개발자의 산출물은 코드가 아니라 "코드를 생산하는 시스템"(명세·에이전트·테스트/게이트·피드백 루프·가드레일). 공장 관리자는 위젯을 손으로 조립하지 않고 조립 라인을 설계한다.
6. **Agent = Model + Harness**: 모델은 엔진일 뿐, 하네스(프롬프트·툴·컨텍스트 정책·훅·샌드박스·서브에이전트·관측성)가 에이전트를 완성. 대부분의 에이전트 실패는 모델 탓이 아니라 **설정 실패**(configuration failure).
7. **conductor ↔ orchestrator**: 실시간·동기·IDE 밀착(지휘자) vs 비동기·고수준·멀티에이전트 위임(오케스트레이터). 개발자는 두 모드를 유동적으로 오간다.
8. **AI 개발 경제학(TCO)**: vibe coding = Low CapEx / High OpEx(토큰 번·유지보수세·보안 리메디에이션), agentic engineering = High CapEx / Low OpEx. context engineering·intelligent model routing이 재무 레버.
9. **실천 처방**: 개인 개발자·엔지니어링 리더·조직 단위별 액션 목록(AGENTS.md, eval 우선, 하네스를 공유 자산화 등).

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 스펙트럼: 6축 비교 (Table 1)

| 차원 | Vibe Coding | Structured AI-Assisted | Agentic Engineering |
|---|---|---|---|
| 의도 명세 | 캐주얼 자연어 프롬프트 | 예시·제약 붙은 상세 프롬프트 | 정식 스펙·아키텍처 문서·memory 파일 |
| 검증 | "되는 것 같은데?" | 수동 테스트·스팟체크 | 자동 테스트 스위트·CI/CD 게이트·LM judge |
| 코드베이스 이해 | 최소 (생성 코드 안 읽기도) | 핵심 경로만 선별 리뷰 | 아키텍처 전면 리뷰, 구현 세부는 AI |
| 에러 처리 | 에러 메시지 복붙 | 개발자 근본원인 진단 → AI 수정 | 에이전트 자가진단(경계 내), 인간은 아키텍처 이슈 |
| 적정 범위 | 프로토타입·스크립트·해커톤 | 기존 코드베이스 내 기능 | 프로덕션·팀 규모 개발 |
| 리스크 | 높음(폐기용 코드에 OK) | 중간(핵심 체크포인트에 인간 판단) | 낮음(모든 단계 체계적 검증) |

적정 위치는 **stakes(위험도)**가 결정한다. 주말 프로토타입은 순수 vibe coding, 금융 거래 프로덕션 API는 agentic engineering. 대부분은 그 사이에 있고, "어디에 선을 그을지 아는 것"이 실력.

### Agent의 5개 부품 + 루프 (Figure 2)

Model(추론 엔진) · Tools(세계와 연결) · Memory(상태) · Orchestration(루프 실행 코드) · Deployment(서비스화). 이 부품들이 **인지 → 계획 → 행동 → 관찰 → 반복**의 루프를 돈다. 챗봇은 응답한 뒤 대기하지만 에이전트는 스스로 루프를 돌린다.

### Context Engineering — Static vs Dynamic (Figure 4/5)

- **6종 컨텍스트**: Instructions(역할·목표·경계) · Knowledge(문서·다이어그램·도메인 데이터) · Memory(단기 세션 로그 + 장기 상태) · Examples(few-shot·레퍼런스 패턴) · Tools(API·스크립트 정의) · Guardrails(하드 제약·포맷·안전 검증).
- **Static**: 항상 로드(시스템 지시·rule 파일 AGENTS.md/CLAUDE.md/GEMINI.md·글로벌 메모리·페르소나). 신뢰성 높지만 매 상호작용마다 토큰 비용 → 비쌈.
- **Dynamic**: 온디맨드 로드(task 매칭 skill·툴 결과·RAG 문서·윈도우 세션 히스토리). 필요할 때만 비용 지불 → 효율적.
- 무엇을 static/dynamic에 둘지는 진짜 엔지니어링 트레이드오프. static 과다 → 토큰 낭비·신호 희석, 과소 → 규칙 망각. 이 경계를 코드처럼 리뷰·버전 관리하는 것이 최선의 시스템.
- **Agent Skills**: 절차적 지식의 이식 가능한(portable) 패키지. progressive disclosure로 에이전트는 시작 시 메타데이터만, task 매칭 시 전체 지시, 필요 시에만 심화 참조를 로드 → 경량 제너럴리스트가 수십 개 전문 역할로 유연 전환. 4대 문제(프롬프트 과부하 context rot·LLM 절차 기억 부재·멀티에이전트 운영 오버헤드·툴/벤더 이식성) 해결.

### 새 SDLC — 단계별 변화 (Figure 6)

AI는 사이클을 극적이되 **불균등하게** 압축. 구현은 주 단위 → 시간 단위로 붕괴하지만 요구사항·아키텍처·검증은 여전히 인간 속도. 결과는 빠른 옛 SDLC가 아니라 **다른 워크플로우**(단계 경계 흐려짐, 반복 주기 분 단위, 개발자는 구현자→시스템 설계자·품질 조정자).

- **요구사항/계획**: user story 생성, 엣지 케이스 식별, API 스키마·프로토타입 생성. 요구사항은 문서 hand-off가 아니라 인간-AI 대화가 되어 명세와 초기 구현을 동시 산출.
- **설계/아키텍처**: 가장 인간 중심적. 트레이드오프(일관성 vs 가용성 등)는 비즈니스·조직 맥락 의존. AI는 결정된 아키텍처를 스캐폴딩·일관 패턴 적용에 탁월. 개발자는 boilerplate 작성 → 구조적 결정 문서화로 이동.
- **구현**: 25~39% 생산성 향상 보고(endnote 7). 단, METR 연구는 숙련 개발자가 특정 작업에서 검증·디버깅·수정에 시간을 써 **19% 더 오래 걸렸다**고 보고(endnote 8). AI는 구현을 없애기보다 "쓰기 → 리뷰·안내·검증"으로 전환.
- **테스트/QA**: **output evaluation**(최종 산출물: 컴파일·테스트 통과?) + **trajectory evaluation**(툴 콜·중간 추론 전 과정). 매끈하지만 검증 단계를 건너뛴 output이 눈에 보이는 에러보다 위험. "continuous quality flywheel"(벤치마크 평가 → 실패 클러스터링 → 프롬프트/툴 최적화 → 회귀 검증 → 프로덕션 모니터링)로 매 사이클 복리.
- **코드 리뷰/배포**: AI가 1차 리뷰어(버그·스타일·보안·성능)로 인간 인지 부담 경감(대체 아님). 배포 파이프라인도 AI-aware(헬스 모니터·자동 롤백·리스크 예측).
- **유지보수/진화**: 가장 과소평가된 변화. "너무 위험해서 못 건드리던" 레거시를 안전하게 리팩터·현대화. 프레임워크 마이그레이션·deprecated API 갱신 등 과거엔 안 하던 일이 가능.

### Harness Anatomy — Agent = Model + Harness (Figure 8)

모델을 시스템으로 착각하면 잘못된 투자로 이어진다. 모델은 하나의 입력일 뿐. 하네스 구성:

- **Instructions & Rule Files**: AGENTS.md·CLAUDE.md·GEMINI.md·skill·서브에이전트 프롬프트.
- **Tools**: 함수·MCP 서버·API + 언제·어떻게 호출할지 알려주는 산문.
- **Sandboxes / 실행 환경**: 코드가 실제 도는 곳, 접근 가능/불가능 범위.
- **Orchestration logic**: 서브에이전트 스포닝·모델 라우팅·전문가 hand-off·발동 규칙.
- **Guardrails / Hooks**: 특정 라이프사이클 지점(툴 콜 전·파일 편집 후·커밋 전)에 도는 결정적 코드. 에이전트가 잊으면 안 되는 것들의 자리.
- **Observability**: 로그·트레이스·평가·비용/지연 계측. 없으면 에이전트가 조용히 드리프트하는지 알 수 없다.

**하네스 효과의 증거**: Terminal Bench 2.0에서 한 팀은 모델 변경 없이 하네스만 바꿔 Top 30 밖 → Top 5. LangChain은 시스템 프롬프트·툴·미들웨어만 손봐 같은 벤치마크 +13.7점. → **대부분의 에이전트 실패는 정직하게 보면 설정 실패**(빠진 툴·모호한 규칙·없는 가드레일·노이즈로 찬 컨텍스트).

**SDLC 단계별 하네스 역할**: ① 요구사항/계획/아키텍처 = 하네스 설정·보정(rule 파일 제공, 툴·불변 규칙 정의) → ② 구현 = 하네스 실행(샌드박스·툴 경계) → ③ 테스트/QA = 피드백 루프(orchestration이 실패 output을 모델로 되돌려 think→act→observe) → ④ 리뷰/배포/유지보수 = 관측(훅으로 하드코딩 비밀번호 커밋 차단, observability로 드리프트·비용 감사).

### Conductor vs Orchestrator (Figure 9)

| | Conductor | Orchestrator |
|---|---|---|
| 방식 | 실시간·동기·IDE 내 | 비동기·고수준·멀티에이전트 |
| 제어 | 키스트로크 수준, 즉시 피드백 | 목표 수준, 지연 피드백 |
| 범위 | 단일 파일, 항상 루프 안 | 멀티 파일, 결과(궤적) 리뷰 |
| 적합 | 탐색·프로토타이핑·새 API 학습 | 기능 구현·마이그레이션·테스트 생성 |
| 도구 | Copilot·Gemini Code Assist·Cursor·Windsurf | Jules·Copilot agent mode·Cursor background·Claude Code |

오케스트레이터는 다른 스킬셋(명세·분해·평가·시스템 설계)을 요구. **80% 문제**: AI가 기능의 ~80%를 빠르게 생성하지만 나머지 20%(엣지 케이스·에러 처리·통합점·미묘한 정확성)는 현재 모델이 결여한 깊은 맥락 지식을 요구. AI 에러가 문법 실수 → 개념적 실패(잘못된 비즈니스 로직 가정·모호성에 대한 확인 미요청·엣지 케이스 누락)로 진화 — "코드가 맞아 보이고" 기본 테스트를 통과해 더 탐지 어려움.

### 코딩 에이전트의 3자리

- **In the editor**: 인라인 완성·챗·전체 코드베이스 인식 (Copilot·Cursor·Windsurf·JetBrains AI).
- **In the terminal**: CLI에서 목표 위임, 파일시스템 접근·멀티파일·툴/테스트 실행 (Antigravity CLI·Claude Code·Codex CLI·Open Code·Cline). 진지한 vibe coding이 여기서.
- **In the background**: 클라우드 샌드박스에서 자율 실행, PR 산출 (Jules·Copilot agent mode·Cursor background·AlphaEvolve).

"올바른 시작점은 자율성 사다리의 높이가 아니라 task가 결정."

### 프로덕션 에이전트 빌드 — Agents CLI

에이전트 자체가 제품일 때(고객지원 봇·리서치 어시스턴트·컴플라이언스 도구)는 자체 툴·메모리·평가·배포 인프라 필요. Google **Agents CLI**(`uvx google-agents-cli setup`)는 선호하는 코딩 에이전트에 7개 skill(ADK 라이프사이클: 스캐폴딩·코드 작성·평가·Agent Runtime 배포·observability)을 부여. 개발자는 새 SDK를 배우지 않고 자연어로 지시. ADK는 graph-based·멀티에이전트 워크플로우 제공, 조율은 shared session state / MCP(툴 접근) / A2A(cross-agent delegation). Anthropic 팀은 2026 초 이 아키텍처로 에이전트 팀이 2주 만에 Rust로 C 컴파일러를 만든 실험 발표(인간은 방향·리뷰만).

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

- **채택률(2026 초)**: 전문 개발자 85% 상시 사용, 51% 매일, 신규 코드 41% AI 생성.
- **생산성**: 산업 서베이 25~39% 향상(endnote 7), Deloitte 30~35% 전망(endnote 9). 반례 — METR: 숙련 개발자가 특정 작업에서 19% 지연(검증·수정 비용)(endnote 8).
- **하네스 효과**: Terminal Bench 2.0에서 모델 불변·하네스만으로 Top 30 밖 → Top 5. LangChain 시스템 프롬프트·툴·미들웨어만 +13.7점.
- **경제학(Figure 11)**: vibe coding은 crossover point에서 기능당 3~10배 비싸짐. Vibe = 12% CapEx / 높은 OpEx, Agentic = 높은 CapEx / 12% OpEx(그래프 표기).

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **속도 주석**: 단계별 그림은 2026 중반 상태. 압축이 구현을 넘어 확산 중(spec → review 직행, 구현·테스트·배포는 백그라운드). 12개월 후 경계선이 달라질 수 있음. 불변은 인간 판단·취향·AI output 검증 능력.
- **2차 종합**: LangChain·Anthropic·METR·Terminal Bench 수치는 외부 인용. 재현·조건은 원출처 확인 필요.
- **80% 문제**: 나머지 20%(엣지·통합·정확성)는 여전히 인간 깊은 맥락 요구, 미해결 상수.
- **보안**: 자동 eval 하네스 없는 급속 생성은 급속 취약점 생성(slopsquatting·hallucinated dependency 등, endnote 27).
- **Day-3/Day-5 이관**: 세션·스킬·메모리 설계와 토큰 경제 최적화(Day-3), spec-driven·구조적 리뷰·가드레일·제로트러스트(Day-5)로 심화 예정.

## 6. 관련 연구 (Related Work)

- **Karpathy "Vibe Coding"** (2025-02, X 포스트) — 용어 시초. 2026 초 Karpathy 본인이 "agentic engineering"으로 재정의(원 framing이 너무 좁았다).
- **Google "Introduction to Agents"** (2025-11 백서) — 에이전트 5부품 심화. 본 백서의 참조 기반.
- **METR "Uplift Update"** (2026-02) — AI 코딩 툴의 실제 영향 측정, 19% 지연 반례.
- **Addy Osmani 블로그** — Agentic Engineering·Factory Model·Conductors to Orchestrators·80% Problem·"Beyond Vibe Coding"(O'Reilly).
- **ADK·MCP·A2A** — Google Agent Development Kit, Model Context Protocol, Agent2Agent 프로토콜.

## 7. 용어집 (Glossary)

- **Vibe coding**: 자연어로 원하는 걸 말하고 AI output을 수용, 깨지면 에러 복붙해 고치는 방식. 검증이 선택적.
- **Agentic engineering**: 명세·테스트·가드레일·인간 아키텍처 감독으로 AI 구현을 둘러싼 규율. 검증이 필수.
- **Harness**: 모델을 감싸 상태·툴 실행·피드백 루프·강제 제약을 부여하는 스캐폴딩. Agent = Model + Harness.
- **Context engineering**: 코드베이스·아키텍처·컨벤션·의도에 대한 풍부·구조적 정보를 에이전트에 제공하는 실천. static/dynamic 배치.
- **Agent Skills**: progressive disclosure로 필요 시에만 로드되는 이식 가능한 절차적 지식 패키지.
- **Tests vs Evals**: Tests=결정적 부분(입력→출력) 코드 검증, Evals=비결정적 부분(궤적·툴 선택·품질) 데이터셋·루브릭·LM judge 검증.
- **Conductor / Orchestrator**: 실시간 IDE 밀착 지휘 / 비동기 멀티에이전트 위임.
- **Factory model**: 개발자 산출물이 코드가 아니라 코드를 생산하는 시스템.
- **80% problem**: AI가 기능의 ~80%를 빠르게 생성하나 나머지 20%(엣지·정확성)는 인간 맥락 요구.
- **CapEx / OpEx**: 상류 구축 투자 / 운영·유지 비용. AI 시대 OpEx는 토큰 경제가 지배.
- **Intelligent model routing**: 복잡 task는 프론티어 모델, 결정적 저복잡 task는 작고 싼 모델로 자동 라우팅.

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 8 | From Autocomplete to Autonomy (5세대 타임라인) | page-region | ★ wiki 권장 (개괄) |
| fig02 | 10 | The Agent Loop (perceive→plan→act→observe) | page-region | (선택) 기본 개념 |
| fig03 | 13 | Table 1 — 6축 스펙트럼 | page-region | ★ wiki 권장 (핵심 표) |
| fig04 | 14 | Vibe→Agentic 스펙트럼 (검증 차별점) | page-region | ★ wiki 권장 (method) |
| fig05 | 17 | Context Engineering static vs dynamic | page-region | ★ wiki 권장 (method) |
| fig06 | 20 | Traditional vs AI-Driven SDLC | page-region | ★ wiki 권장 (핵심) |
| fig07 | 25 | The Factory Model | page-region | (선택) |
| fig08 | 27 | Harness Anatomy — Agent=Model+Harness | page-region | ★ wiki 권장 (센터피스) |
| fig09 | 32 | Conductor vs Orchestrator | page-region | ★ wiki 권장 (역할) |
| fig10 | 38 | Snippet 1 — Agents CLI 명령 | page-region | (선택) |
| fig11 | 40 | The Economics of AI Development | page-region | ★ wiki 권장 (경제학) |
