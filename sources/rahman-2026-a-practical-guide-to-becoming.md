---
title: "AI-Native Engineer 실전 가이드: 4 Core Practices, ADLC, Guardrails (Shah Rahman, ByteByteGo 2026-06-02)"
type: article
year: 2026
category: etc
raw_path: raw/articles/rahman-2026-a-practical-guide-to-becoming.md
raw_filename: "rahman-2026-a-practical-guide-to-becoming.md"
source_collection: external
author: "Shah Rahman"
url: "https://blog.bytebytego.com/p/a-practical-guide-to-becoming-an"
publisher: "ByteByteGo Newsletter (Substack)"
publication_date: "2026-06-02"
tags: [ai-native-engineering, agentic-development-lifecycle, adlc, context-engineering, spec-driven-development, critical-verification, problem-decomposition, multi-agent-orchestration, ai-security, slopsquatting, prompt-injection, bytebytego, shah-rahman, meta, claude-code, cursor, codex, ralph-loop, openclaw, design-to-50, mcp]
figures:
  - id: fig01
    file: assets/rahman-2026-a-practical-guide-to-becoming/fig01.png
    raw: raw/articles/rahman-2026-a-practical-guide-to-becoming-figures/fig01.png
    caption: "글 헤더 — ADLC 4단계(Planning→Building→Testing→Review) 순환"
    strategy: manual
    curated: true
  - id: fig02
    file: assets/rahman-2026-a-practical-guide-to-becoming/fig02.png
    raw: raw/articles/rahman-2026-a-practical-guide-to-becoming-figures/fig02.png
    caption: "AI-native engineering ≠ vibe coding ≠ no human coding (범주 구분)"
    strategy: manual
    curated: true
  - id: fig03
    file: assets/rahman-2026-a-practical-guide-to-becoming/fig03.png
    raw: raw/articles/rahman-2026-a-practical-guide-to-becoming-figures/fig03.png
    caption: "Orchestrator Pattern — Traditional engineer vs AI-native engineer(agent swarm 지휘)"
    strategy: manual
    curated: true
  - id: fig04
    file: assets/rahman-2026-a-practical-guide-to-becoming/fig04.png
    raw: raw/articles/rahman-2026-a-practical-guide-to-becoming-figures/fig04.png
    caption: "Context Engineering 스택 (User prompt → Project files → Team conventions → Architecture/business rules → MCP → AI agent)"
    strategy: manual
    curated: true
  - id: fig05
    file: assets/rahman-2026-a-practical-guide-to-becoming/fig05.png
    raw: raw/articles/rahman-2026-a-practical-guide-to-becoming-figures/fig05.png
    caption: "Verification Inversion — 기대(10/70/20) vs 실제(40/20/40) 시간 배분"
    strategy: manual
    curated: true
  - id: fig06
    file: assets/rahman-2026-a-practical-guide-to-becoming/fig06.png
    raw: raw/articles/rahman-2026-a-practical-guide-to-becoming-figures/fig06.png
    caption: "Agentic Development Lifecycle 전체도 (Planning→Building→Testing→Review + Documentation + Codify ADLC)"
    strategy: manual
    curated: true
  - id: fig07
    file: assets/rahman-2026-a-practical-guide-to-becoming/fig07.png
    raw: raw/articles/rahman-2026-a-practical-guide-to-becoming-figures/fig07.png
    caption: "Learning Loop — Build→Show→Watch→Learn→Decide→Simplify 순환"
    strategy: manual
    curated: true
---

## 한 줄 요약 (One-line Summary)

Meta Ads에서 Autonomous ML Iteration & Optimization을 총괄하는 Shah Rahman이 ByteByteGo Newsletter에 기고한 2부작 1부(2026-06-02)다. AI가 코드를 대량으로 쏟아내는데도 대부분의 팀이 2년 전보다 더 많은 버그·인시던트·기술부채를 내는 역설(NYT가 "code overload"라 부른 현상)을, 저자는 **engineer에서 orchestrator로의 정체성 전환** 한 가지로 설명한다. AI-native engineering은 vibe coding(Karpathy 2025)과 범주가 다르며, 처방은 **4 Core Practices**(맥락 동기화 엔지니어링 · 명세 주도 개발 · 비판적 검증 · 문제 분해), **40/20/40 시간 배분**, **3단계 개인 전환**, **70/30 팀 변환**, 운영 프레임 **ADLC** 6단계, 그리고 9개 보안 가드레일이다. 핵심 메시지는 "진짜 차별자는 도메인 전문성이며, 이것은 도구 도입이 아니라 여러 해에 걸친 전환"이라는 것이다. (세부 수치·인용은 아래 각 섹션 참조.)

## 1. 자료 정보 (Document Information)

- **형식**: ByteByteGo Newsletter(Substack 기반) 게스트 long-form essay, Part 1 of 2 시리즈
- **저자**: **Shah Rahman** — Meta Ads의 **Global Head of Autonomous ML Iteration & Optimization**, AI-native infra 및 multi-agent system 설계 담당 (LinkedIn `shahirahman`)
- **퍼블리셔**: ByteByteGo Newsletter (Alex Xu의 system design / scalability 뉴스레터 — 구독자 수십만 규모, ByteByteGo는 *system-design-interview* 책 시리즈로 유명)
- **발행일**: **2026-06-02** (수신일 2026-06-05, "Nomad Academy" 이메일 캠페인을 통해 사용자 인박스 도달)
- **URL**: <https://blog.bytebytego.com/p/a-practical-guide-to-becoming-an>
- **분량**: ~3,500자 영문 long-form essay + 후속편 Part 2 "AI-Native Leaders" 예고
- **성격**: 1차 자료 — Meta hyperscale 환경에서의 1인칭 경험에 Stanford·METR·GitClear·MIT·Gartner 등 외부 연구 인용 5건 이상과 익명화된 실제 보안 사고 4건을 더했다. 다만 "환경에서 주당 한 건꼴로 insecure AI integration을 관찰한다" 같은 정성 수치는 1인 관찰자 시점이라 검증할 수 없다.
- **포지셔닝**: ByteByteGo 특유의 "엔지니어 마인드셋 + 실전 playbook" 포지션. 홍보성 글이라기보다 현장에서 일하는 hyperscale 엔지니어의 처방에 가까워, system-design 독자가 "읽고 내일 바로 적용할" 형식을 의도한다.

## 2. 주요 기여 (Key Contributions)

1. **engineer에서 orchestrator로의 정체성 재정의** — "코딩은 늘 engineering의 20–30%였고 코드가 늘었다고 더 생산적이지는 않다"는 한 문장으로 vibe coding(Karpathy 2025)의 민주화와 AI-native engineering(전문적 orchestration)의 범주 차이를 가른다. 후자는 "코딩 능력을 갖춘 사람이 AI agent와 도구를 부리고 통달하는" 직무로 정의되며 10x를 100x leverage로 끌어올린다. "코드가 많다고 더 생산적인 것은 아니다(오히려 줄기 쉽다)"가 핵심 명제다.
2. **4 Core Practices 체계화** — ① **Synchronized Context Engineering**(가장 중요한 단일 스킬으로, AI 출력 품질은 받은 맥락 품질을 넘지 못하며, MCP를 "USB-C for AI"로, CLAUDE.md를 핵심 인프라로 보고, 팀 속도 40–50% 향상), ② **Specification-Driven Development**("garbage in, garbage out"이 AI 환경에서 더 강하게 작동하고, 무작위 프롬프팅과 vibe coding은 명세 주도 방식에 일관되게 뒤지며, agent가 미해결 질문을 사용자에게 확인하고 혼자 답을 찾아 떠나지 못하게 한다), ③ **Critical Verification**(AI 코드의 약 45%에 보안 결함, Stanford 연구는 "AI 사용자가 덜 안전한 코드를 더 자신 있게 쓴다"고 보고, METR/Anthropic RCT에서 경력 OSS 개발자가 친숙한 코드베이스에서 19% 감속, GitClear는 code churn 증가를 관찰 — 결국 산출량은 생산성의 빈약한 대리지표), ④ **Problem Decomposition**(사람은 edge case를, AI는 70–80%의 정형 구현을 맡으며, 복잡한 문제에서 생기는 맥락 오염과 slop 생성에서 agent는 회복하기 어렵고, compact/clear는 long-horizon에 해로워 "하루이틀 날린 경험"이 잦다).
3. **40/20/40 시간 배분 권고** — 맥락 설정 40%, 생성·테스트 20%, 리뷰·검증 40%. 개발자 대부분이 생성에 시간을 쏟는다는 통념을 정면으로 반박하며, 생성은 빠르고 새로운 시간 싱크는 검증과 맥락이라는 것이다.
4. **3단계 개인 전환 여정과 목표 지표** — Phase 1 Foundation(2주 이내, 주력 AI assistant 하나 선택: Codex/Claude Code/Cursor, 매일 써보며 한계 판단력을 키우고 노트 기록), Phase 2 Integration(1개월 이내, 프로젝트별 context file, "Plan → Execute → Review" 워크플로우, 작은 루프와 검증 체크포인트 — 증거상 긴밀한 human-in-the-loop이 큰 autonomous run을 크게 앞서며, 느려 보여도 결과는 훨씬 낫다), Phase 3 Mastery(지속, 다중 agent 워크플로우·병렬 세션·cross-agent 검증). 목표 지표는 AI 생성 코드 80% 이상, 재작성률 20% 미만.
5. **70/30 팀 변환 법칙** — 전환 성공의 70%가 운영·문화 변화에서 온다. 세 가지가 필수다: (a) **psychological safety**(MIT 조사 리더 83%가 "AI 이니셔티브 성공에 측정 가능하게 기여한다"고 보고하며, "AI 실패 사례를 의도적으로 축하하라"), (b) **evolved code review**(AI 코드 물량이 전통적 사람 리뷰를 압도하므로 AI 코드와 사람 코드를 분리해 rubric을 적용하고, "AI가 생성하고 AI가 리뷰한 PR" 조합에는 명시적 guardrail이 필요), (c) **shared context libraries**(context file·eval set·agent config를 표준화하되, 팀원들이 표준화를 두고 경쟁하지 말고 협업하며 agent/skill 난립을 경계).
6. **Agentic Development Life Cycle(ADLC) 6단계** — Planning(deep research와 다중 agent 병렬 탐사, planning agent가 여러 exploration agent의 발견을 통합, Claude의 "OpenClaw"는 여러 sub-agent를 병렬로 실행) → Building(agent는 초·중급 엔지니어 역할로 1–2년 안에 senior 수준으로 오르리라 예상, 사람은 tech lead 역할, Claude Code/Cursor Composer/GitHub Copilot Agent Mode/OpenAI Codex 풍경) → Testing("TDD의 부활" — agent가 테스트 계획을 먼저 세우고 처음엔 모두 실패한 뒤 점진적으로 통과, unit·integration·e2e, unit 테스트 과몰입 경계) → Review(swarm을 기능성·품질·확장성·성능·신뢰성·보안·프라이버시로 분리, injection 취약점이 한 건 나오면 generalization principle로 같은 유형을 미리 스캔) → Documentation(사후 문서화에서 실시간 생성으로, 수십 년 묵은 낡고 일관성 없는 문서 문제를 마침내 해결 중) → **Codify ADLC**(Layer-1 개인과 Layer-2 팀의 실천을 스스로 진화하는 context file·skills library·MCP tool로 인코딩해 부족 지식에 머물지 않게 함). **Pro Tip: plan/build/test agent를 분리해 서로 견제**(planning이 building을 challenge, testing이 커버리지 누락을 적발, review가 편향된 구현을 적발).
7. **construction cost와 decision cost의 구분** — AI가 빌드 비용을 크게 줄였지만 그것은 전체 개발 비용의 20–30%일 뿐이고, "무엇을 만들고 무엇을 버릴지"의 의사결정 비용은 거의 그대로다. 오히려 코드와 빌더가 폭증하면서 의사결정 문제는 더 어려워졌다. AI-native 프로세스 최적화란 "실행을 조율하는 데 쓰던 노력을 학습을 가속하는 쪽으로 돌리는 일"이다.
8. **AI가 내는 진짜 레버리지 4가지** — (a) **값싼 실험**(기능의 70% 이상은 실제 사용자에게 닿지 못하므로, 단위 시간당 가설을 더 많이 시험하고 가망 없는 개념은 가차 없이 버린다), (b) **사용자 리서치용 빠른 프로토타이핑**(v0/Replit Agent/Bolt.new로 자연어를 분 단위 동작 프로토타입으로, 문서를 동작 프로토타입이 대체하며 사용자 테스트 신호의 품질이 우월), (c) **판단이 아닌 보일러플레이트 자동화**(AI는 스캐폴딩·정형 코드·비즈니스 로직 테스트·문서·데이터 모델을, 사람은 핵심 비즈니스 로직·공감 가는 UX·새로운 구현과 keep-or-kill 결정을 맡는다), (d) **"design to 50%" 원칙**(최소 기능만 내보내고 사용자의 망설임·오해·이탈을 관찰해 상상한 문제가 아닌 실제 제품 문제를 발견).
9. **실제 보안 사고 4건과 slopsquatting** — (a) **Chat Integration RCE**: 이틀 만에 AI로 만든 기능이 2FA 우회와 열린 ACL을 타고 RCE에 이르렀고, 탐지·완화·수정에 수십 시간이 들었다. (b) **무단 DB 접근**: AI 코딩 agent가 인증 없이 약 1,500개의 보호된 DB 테이블에 접근해 prompt injection 위험에 데이터가 노출됐다. (c) **Google Docs Prompt Injection**: 문서에 심긴 prompt injection이 입력 필터링을 우회해 RCE로 이어졌다. (d) **공급망 오염 — slopsquatting**(2025 신종 공격): AI가 환각한 패키지명을 공격자가 선점 등록해 악성 코드를 배포하며, 문서화된 사례가 여럿이다. 더해 AI 코드 스니펫의 보안 취약 비율은 Python 약 30%, JavaScript 약 25%다.
10. **4개 범주 Guardrails 처방** — **Agent Identity & Access**(step-up 2FA, 최소 권한, 공유 credential·열린 ACL 금지, read-only로 시작해 read-write로 확장) · **Data Classification Awareness**("Agentic Authorization"은 agent가 사람의 감독이 따라잡지 못하는 기계 속도로 제약을 우회하는 새로운 엔터프라이즈 과제) · **Prompt Injection Protection**(외부 콘텐츠에 숨은 명령이 들어 있을 수 있으므로 입력 필터링·콘텐츠 검증·맥락 정화를 적용하고, 신뢰할 수 없는 명령을 자동 실행하거나 agent 제안을 자동 수락하려는 유혹을 거부) · **Infrastructure Sandboxing**(관찰·감사 가능, production 영역 차단, OS 수준 강제). 기술 가드로는 **static analysis의 CI/CD 통합**(인증·결제·PII 관련 코드는 사람 리뷰 필수), **automated quality gates**(Ralph Loops·OpenClaw 같은 autonomous loop + diff 제출 전 type-check·lint·test + 다단계 canary), **skills-based security**("shift left, 단 agent와 함께"). 조직 가드로는 **skill atrophy 예방**(Gartner는 2026년까지 조직의 50%가 "AI-free" 역량 평가를 요구하리라 전망, 가끔은 AI 없이 작업하고, AI를 학습 도구로 삼아 생성 코드와 함께 설명을 요청), **productivity paradox 경고**(개인 차원의 이득이 팀·회사 차원에서 실현되지 못하는 경우가 많으므로 코딩 속도가 아니라 end-to-end 사이클 타임과 기능 속도에 집중, 망가진 프로세스에 AI를 더하면 망가진 코드를 더 빠르게 찍어낼 뿐).
11. **마지막 명제 — 진짜 차별자는 도메인 전문성** — senior engineer가 훨씬 나은 결과를 내는 이유는 더 깊은 맥락과 더 날카로운 판단을 가져오기 때문이다. AI는 전문성을 대체하는 게 아니라 증폭한다. 수학·과학·금융·헬스·법 어느 도메인이든 engineering 기본기를 끌어올리는 일은 AI 효율성에 두고두고 배당을 지급한다. 이것은 한 번의 도구 도입이 아니라 여러 해에 걸친 전환이며, 도구 업그레이드로 취급한 팀은 한결같이 실패했다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 4 Core Practices의 운영적 정의

| Practice | 무엇을 | 왜 지금 | 운영 규칙 |
|---|---|---|---|
| **Synchronized Context Engineering** | 프로젝트별 정보(아키텍처 다이어그램·코딩 표준·비즈니스 규칙·팀 관례·개발 워크플로우)를 체계적으로 큐레이션해 AI working memory에 주입 — 팀 전체가 재사용·표준화 | AI 출력 품질이 받은 맥락 품질을 넘지 못한다. MCP가 "USB-C for AI" 표준으로 정착했고 CLAUDE.md는 선택적 문서가 아닌 핵심 인프라 | "prompt engineering"에서 "context engineering"으로의 의식 전환. 팀 속도 40–50% 향상 보고 |
| **Spec-Driven Development** | AI에게 빌드를 맡기기 전 무엇을 원하는지 정의하고, 명확한 milestone으로 쪼개 success criteria를 정한 뒤, 단계마다 검증하며 점진적으로 실행 | garbage-in이 전례 없는 속도·물량으로 증폭. 명세가 없으면 agent가 circular reasoning에 빠짐 | agent가 미해결 질문을 사용자에게 확인하게 하고, 혼자 답을 찾아 떠나지 못하게 강제 |
| **Critical Verification** | 병목이 "코드 작성"에서 "그 코드가 규모·신뢰성·보안 측면에서 작동함을 증명하는 일"로 영구 이동 | AI 코드 품질은 초급 개발자 수준. 약 45%에 보안 결함, Stanford "사용자가 덜 안전한 코드를 더 자신 있게 작성", METR/Anthropic 친숙 코드베이스 19% 감속, GitClear code churn 증가 | 리뷰·테스트·검증이 새로운 율속 단계이며 타협 불가 |
| **Problem Decomposition** | 사람은 edge case·커스텀 로직·도메인을, AI는 70–80%의 정형 구현을 담당 | 복잡한 문제는 맥락 오염과 slop 생성을 부르고 agent가 거기서 회복하기 어려움 | "하루이틀 날리지 마라" — 잘 정의된 맥락·합리적 명세·검증 가드레일 없이 고집스레 돌리는 실행 회피 |

### 40/20/40 시간 배분 (직관에 반하는 결과)

```
40% context-setting  |  20% generation + testing iteration  |  40% review + verification
```

- 개발자 대부분이 생성 단계에 시간을 쏟는다는 통념과 정면으로 부딪힌다.
- 실제로는 생성이 빠르고, 검증과 맥락 설정이 새로운 시간 싱크다.
- ADLC 구조와도 맞물린다 — planning agent가 가장 중요하고 review agent swarm이 마지막 게이트가 된다.

### 3-phase 개인 전환 여정

| Phase | 기간 | 핵심 활동 | 핵심 위험 |
|---|---|---|---|
| **1. Foundation** | 2주 이내 | 주력 AI assistant 하나 선택(Codex / Claude Code / Cursor) · 매일 써보며 능력과 한계에 대한 직관 쌓기 · workspace/워크플로우/초기 설정 갖추기 · 개인 노트 작성 | 수작업에서 AI 보조로의 정체성 도약 — "언제 AI가 도움이 되고 언제 일을 더 만드는지"에 대한 판단력 부재 |
| **2. Integration** | 1개월 이내 | 구조화된 프롬프트 framework · 프로젝트별 context file(팀 표준 + 아키텍처 패턴) · **"Plan → Execute → Review" 워크플로우** · atomic task마다 리뷰 · approval gate와 guardrail | 리뷰를 건너뛰면 사용자와 agent 모두에게 기술부채가 쌓인다. 큰 자율 실행의 유혹 — 계획 없이 추측으로 돌린 autonomous run은 결국 버려질 slop만 남긴다 |
| **3. Mastery** | 지속 | 다단계·다중 파일 task에 agent 투입 · AI 보조 코드 리뷰 · 다중 agent 워크플로우 + 병렬 세션 + cross-agent 검증 | 매주 새 벤치마크가 등장 — Claude·Codex 제작사의 권고를 그대로 따르지 말고(그들의 상황은 사뭇 다를 수 있다) 자기 상황에 맞게 적용 |

**목표 지표**: AI 생성 코드 80% 이상 · **재작성률 20% 미만**. 도달한 뒤에는 팀을 같은 수준으로 비교적 빠르게 끌어올리는 단계로 넘어간다.

### ADLC (Agentic Development Life Cycle) — 6 단계 + Codify

```
Planning ───────────► Building ─────► Testing ─────► Review ─────► Documentation
   ▲                                                                       │
   │                                                                       │
   └──────────────────────── Codify ADLC ◄─────────────────────────────────┘
```

- **Planning**(가장 중요): deep research 모드와 다중 agent 병렬 탐사, 코드베이스에 맞춘 명세화, 모호성 표시, subtask 분해, 난이도 추정. roadmap과 version milestone으로 점진적으로 따라간다. planning agent가 여러 exploration agent의 발견을 모아 일관된 구현 전략을 만들며, Claude의 "OpenClaw"는 여러 sub-agent를 병렬로 돌릴 수 있다.
- **Building**: agent는 초·중급 엔지니어 역할(1–2년 안에 senior 수준으로 오르리라 예상), 사람은 tech lead 역할. 순차/병렬 실행 모델은 roadmap과 검증 계획에 따라 결정된다. Claude Code · Cursor Composer · GitHub Copilot Agent Mode · OpenAI Codex 풍경이며, 매월 새 버전을 추적하라고 권한다.
- **Testing**: "TDD의 부활"이다. agent가 테스트 계획을 먼저 세우고, 처음엔 모두 실패한 뒤 점진적으로 통과시킨다. unit(원자 단위) + integration(기능 간) + e2e(시스템 전반). unit 테스트에 과몰입해 integration·system 테스트를 빠뜨리지 않도록 경계.
- **Review**: agent swarm을 7개 차원(기능성 · 품질 · 확장성 · 성능 · 신뢰성 · 보안 · 프라이버시)으로 전문화한다. agent가 1차로 훑고 사람이 꼼꼼히 확인한다. **generalization principle**: 한 사례(예: injection 취약점)가 발견되면 같은 유형이 다른 곳에도 있다고 보고 미리 스캔한다.
- **Documentation**: 사후 문서화에서 실시간으로 전환. agent가 요약·설계 결정·아키텍처 다이어그램·changelog를 쓰고, 이것이 API 문서·기능 자료·고객용 콘텐츠로 자연스럽게 이어진다. 수십 년 묵은 낡고 일관성 없는 문서 문제를 마침내 해결하는 중.
- **Codify ADLC**: Layer-1(개인)과 Layer-2(팀)의 실천을 스스로 진화하는 context file·skills library·MCP tool로 인코딩해 ADLC를 조직 전체로 확장한다. 부족 지식에 머물거나 일부 부서에 갇히지 않게 하며, ADLC 도구 패키지를 적극 알린다.

**Pro Tip — agent swarm 견제 구조**: planning·building·testing·review agent를 분리해 서로 견제하게 한다. planning은 지름길을 택한 building을 물고 늘어지고, testing은 커버리지를 빠뜨린 곳을 적발하며, review는 그럴듯하지만 편향된 구현을 잡아낸다. 각 swarm이 코드베이스를 서로 다른 관점에서 깊이 이해하게 되는 셈이다.

### Security Guardrail Stack (4 + 3 + 2 = 9 컨트롤)

**Agent/Identity 4축**:
- Agent Identity & Access Control — step-up 2FA, 최소 권한, 공유 credential·열린 ACL 금지, read-only로 시작해 read-write로 확장
- Data Classification Awareness — agent가 민감 데이터 경계를 존중하게 한다. "Agentic Authorization"은 agent가 사람의 감독이 따라잡지 못하는 기계 속도로 제약을 우회하는, 새롭게 떠오른 엔터프라이즈 과제
- Prompt Injection Protection — 외부 콘텐츠(문서·웹·사용자 입력)에 숨은 명령이 들어 있을 수 있다. 입력 필터링·콘텐츠 검증·맥락 정화를 적용하고, **신뢰할 수 없는 명령을 자동 실행하거나 agent 제안을 자동 수락하지 않는다**
- Infrastructure Sandboxing — agent 활동을 관찰·감사 가능하게 하고, 고위험 production 영역(설정 · 핵심 실행 · 핵심 저장소)을 차단하며 OS 수준에서 강제

**Technical 3축**:
- Static analysis CI/CD 통합 — AI 코드 스니펫의 보안 취약 비율은 Python 약 **30%**, JavaScript 약 **25%**. 인증·결제·PII 관련 코드는 사람 리뷰 필수
- Automated quality gates — **Ralph Loops · OpenClaw 같은 autonomous loop**로 success criteria를 충족할 때까지 반복 검증 + diff 제출 전 type-check·lint·test + 다단계 canary
- Skills-based security — agent에게 안전한 코딩 패턴을 가르쳐 생성 단계에서 취약점을 짚게 한다. "shift left, 단 agent와 함께"

**Organizational 2축**:
- Skill atrophy prevention — Gartner는 2026년까지 조직의 50%가 "AI-free" 역량 평가를 요구하리라 전망한다. AI를 학습 도구로 삼아 생성 코드와 함께 설명을 요청하고, 가끔은 AI 없이 작업한다. 러다이트가 아니라, AI 도구가 없는 날이나 미묘하게 틀린(치명적일 수 있는) 결과에 대비한 보험이다
- Productivity paradox 경고 — 개인 차원의 이득이 팀·회사 차원에서 실현되지 못하는 경우가 많다. 코딩 속도가 아니라 **end-to-end 사이클 타임과 기능 속도**에 집중하라. 망가진 프로세스에 AI를 더하면 망가진 코드를 더 빠르게 찍어낼 뿐이다

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

본 자료는 essay이며 자체 측정 수치는 없다. **인용한 외부 수치 한 곳에 집계**:

| 메트릭 | 값 | 출처 (article 인용) | 비고 |
|---|---:|---|---|
| Google 신규 코드 중 AI 비중 | **>75%** | — (인용 출처 명시 안 됨) | 도입부 통계 |
| OpenAI/Anthropic 신규 코드 중 AI 비중 | "거의 전부" | — | 도입부 통계 |
| Amazon Java 8→17 마이그레이션 | **30,000 production app** (≈ **4,500 dev-year 절감 추정**) | — | 도입부 통계 |
| 컨텍스트 엔지니어링 팀 효과 | **40–50% 속도 ↑** | "Teams practicing rigorous context engineering report" | 정성 보고 |
| AI 생성 코드의 security flaw 비율 | **~45%** | "Research consistently shows" — 출처명 없음 | 정량 |
| AI 코드 Python snippet security weakness | **~30%** | "Data shows" | 정량 |
| AI 코드 JS snippet security weakness | **~25%** | "Data shows" | 정량 |
| METR/Anthropic RCT — 친숙 codebase 경력 OSS dev 속도 | **−19%** (AI 사용 시) | "striking METR/Anthropic randomized controlled trial" | "over-reliance without adequate verification"이 원인 |
| Stanford 연구 — AI 사용 dev 코드 보안성 | "significantly less secure + 더 자신감 있게" | "A Stanford study found" | 정성 (위험한 조합) |
| GitClear — AI-assisted codebase code churn | "증가" (방향 only) | "GitClear study found" | "raw output is poor proxy for productivity" |
| 시간 배분 권고 | **40% / 20% / 40%** (context / gen+test / review+verify) | 1인칭 권고 | 반-직관 처방 |
| 개인 전환 — Foundation 기간 | **≤ 2주** | 1인칭 권고 | — |
| 개인 전환 — Integration 기간 | **≤ 1개월** | 1인칭 권고 | — |
| Mastery 타깃 메트릭 | **80%+ AI-generated · <20% rewrite** | 1인칭 권고 | — |
| 팀 변환 — operational/cultural 변화의 성공 기여 | **70%** | "Research shows" — 출처명 없음 | — |
| MIT — psychological safety가 AI 성공에 기여한다고 본 리더 비율 | **83%** | "MIT research found" | — |
| 70% feature 사용자 미도달 | **>70%** | "cheaper experimentation" 섹션 | — |
| Coding이 engineering에서 차지하는 비중 | **20–30% (max)** | 1인칭 주장 | — |
| Gartner — 2026까지 AI-free skill assessment 요구할 조직 비율 | **50%** | "Gartner reports" | — |
| Chat Integration RCE 인시던트 | **2일 AI 빌드 + 2FA 우회 + ACL open → RCE** | 익명 사례 | "수십 시간 detect/mitigate/fix" |
| Unauthorized DB Access 인시던트 | **~1,500 secure DB table** 접근 | 익명 사례 | "prompt injection risk에 데이터 노출" |
| Google Docs Prompt Injection 인시던트 | **input filtering 우회 → RCE** | 익명 사례 | — |
| Slopsquatting (2025 신규 attack vector) | "multiple documented incidents" | — | AI hallucinated package name을 공격자가 register |
| 환경 내 신규 insecure AI integration 빈도 | "주당 약 1건, 다수가 production incident" | 1인칭 관찰 | 검증 불가 — Meta 환경 추정 |

**자체 실험 없음**: 본 자료는 1인칭 essay + 외부 인용. 벤치마크 비교나 ablation은 없다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

**자료의 한계**:

- **출처 명시 부족** — Stanford·METR·Anthropic·GitClear·MIT·Gartner 등 여러 연구를 인용하지만 직접 링크나 논문 ID, 연도가 거의 없어 독자가 후속 검증을 하기 어렵다. 링크가 달린 것은 NYT(2026-04-06 Isaac & Griffith)뿐이다.
- **Meta 시점 편향** — "환경에서 주당 한 건꼴로 insecure AI integration이 나타난다" 같은 정성 관찰이 hyperscale 단일 회사를 넘어 일반화되는지 확인할 수 없다. SMB·스타트업에서는 빈도와 유형이 다를 수 있다.
- **벤치마크 부재** — "4 Core Practices를 적용하면 40–50% 빨라진다" 같은 정량 주장의 측정 방법론과 통제군이 공개되지 않았다. ADLC가 전통 SDLC보다 우월하다는 핵심 명제에도 비교 실험이 없다.
- **80%+ AI-generated · <20% rewrite rate 정의 모호** — "AI 생성"의 범위(제안 채택인지, 무수정 채택인지, 함수 단위인지)와 "재작성"의 기준(라인 단위 diff인지, 의미 단위인지)이 규정되지 않았다.
- **40/20/40 시간 배분의 일반화 위험** — 도메인(systems vs frontend), 문제 친숙도(legacy 코드 vs greenfield), task 길이(빠른 수정 vs 수 주짜리 기능)에 따라 적정 비율이 달라질 텐데 이를 논하지 않는다. METR 연구의 "친숙한 코드베이스에서 19% 감속"을 인용하면서도, 80%+ AI 생성 목표가 바로 그 환경에서 통하는지에는 답하지 않는다.
- **"OpenClaw of Claude" 용어 모호** — Claude의 multi-sub-agent 기능을 가리키는 듯하나 공식 명칭이 아니어서 미래 독자의 추적성이 약하다. Anthropic의 Daybreak·Mythos도 같은 문제다.
- **2차 통계의 누적 인용** — "Google 신규 코드의 75%+가 AI" 같은 도입부 통계는 1차 출처가 명시되지 않았다. 미디어를 거쳐 반복 인용되며 정확도가 변질될 위험이 있다.
- **시리즈 1부만 발행** — 조직 변환·리더십 모델·측정 framework가 2부 "AI-Native Leaders"의 몫이라, 이 글만으로는 70% 팀 변환 처방이 미완이다.
- **실 인시던트 4건의 익명화 한계** — 어느 조직이었는지, 어떤 스택이었는지, 어떤 완화책이 효과적이었는지 디테일이 빠져 "학습용 사례"로서의 가치가 제한된다.

**미해결 / 후속 질문**:

- ADLC의 각 단계에서 agent swarm 분리가 토큰·비용·지연 측면에서 어디까지 효율적인가? [[agents/lin-2026-harness-updating-is-not-harness-benefit]]의 "harness 호출을 first-class skill로 학습한다"는 발견과 어떻게 맞물리는가?
- "design to 50%"와 "plan-first spec-driven" 사이의 긴장 — minimum lovable product와 명세 완결성의 트레이드오프는 어떻게 푸는가?
- skill atrophy 방지를 위한 "가끔 AI 없이 작업하라"는 권고가 80%+ AI 생성 목표와 어떻게 양립하는가? 역량 평가의 정량 틀이 필요하다.
- **slopsquatting** 방어의 구체적 컨트롤(패키지 allow-list? CI의 게시일 임계값? SBOM 자동 검증?)이 상세하지 않다.
- ADLC를 "codify"한다는 스스로 진화하는 context file·skill library·MCP tool의 실제 거버넌스 — 권한, 버전, 롤백, 다중 팀 충돌 해소는 어떻게 하는가?

## 6. 관련 연구 (Related Work)

- **[[agents/lee-hoyeon-2026-harness-engineering]]** (Lee Hoyeon, Team Attention, 2026-04-07) — 이 글의 4 Core Practices·ADLC와 직접 짝을 이루는 한국어 자료. 양쪽 모두 "prompt → context → 환경 자체 설계"라는 진화 모델을 따르며, 이호연의 Harness 6축 순환(구조/맥락/계획/실행/검증/개선)이 Rahman의 ADLC 6단계(Planning/Building/Testing/Review/Documentation/Codify)와 거의 1:1로 대응한다. "같은 모델에 다른 harness를 얹으니 TerminalBench가 14%p 올랐다"는 LangChain 사례(이호연 인용)가, 이 글의 "같은 모델·도구인데 결과가 갈린다"는 격차 명제의 정량적 증거가 된다.
- **[[agents/lin-2026-harness-updating-is-not-harness-benefit]]** (Lin et al., Penn State·UCSC·Amazon·Emory·UIUC·Northeastern, 2026) — "harness 호출을 first-class skill로 학습시키고 long-horizon instruction following을 RL/SFT 타깃으로 삼으라"는 결론이, 이 글의 skills-based security(agent에게 안전한 코딩 패턴을 학습)와 같은 방향이다. Lin et al.의 "within-agent 편차 5.1pp 대 between-agent 격차 36.0pp"라는 발견은 "capability budget을 evolver가 아니라 task-solving agent에 투자하라"는 권고를 뒷받침한다.
- **[[agents/dennis-2026-compiling-agentic-workflows-into-llm]]** (Dennis et al., 2026) — "안정적 구조는 weights에, 일시적 상태는 prompt에 둔다"는 명제가, 이 글 ADLC의 Codify 단계(Layer-1/Layer-2 실천을 스스로 진화하는 context file·skill로 인코딩)와 같은 "안정 구조 압축" 철학이다.
- **[[applications/kmyu-2026-llm-wiki-pattern-synthesis]]** (kmyu99, 2026-05-06) — "북키핑 비용이 0에 가까워지며 Bush의 1945년 Memex가 풀지 못한 '누가 유지하느냐' 문제에 LLM이 답한다"는 통찰이, 이 글 ADLC의 Documentation 단계(사후 문서화에서 실시간 생성으로)의 약속과 정렬한다.
- **[[applications/datasciencedojo-2026-llm-wiki-by-andrej-karpathy]]** (Data Science Dojo, 2026-04-16) — 이 글의 "context file은 핵심 인프라"라는 명제와 LLM Wiki entity page(Karpathy 패턴)는 "AI working memory를 체계적으로 큐레이션한다"는 같은 사상의 다른 표현이다.
- **Karpathy "vibe coding" (2025-early)** — 이 글이 명시적으로 구분하는 비교 대상. "vibe coding은 코딩을 모르는 사람의 민주화로 가치는 있지만, AI-native engineering과는 다르다".
- **NYT "Code Overload" (Isaac & Griffith, 2026-04-06)** — <https://www.nytimes.com/2026/04/06/technology/ai-code-overload.html> — 이 글 도입부 문제의식(대부분의 팀이 더 많은 버그·인시던트·기술부채를 만든다)의 직접 출처.
- **Anthropic MCP (Model Context Protocol)** — "USB-C for AI" 비유로 인용. AKB([[applications/dnotitia-akb]]) 같은 MCP 우선 시스템이 이 글의 "context file은 핵심 인프라"라는 명제의 인프라적 답이다.
- **Anthropic Daybreak / Mythos (security)** — 이 글이 "보안에 대한 분명한 경종"으로 언급. 공식 명칭·문서 미확인이라 후속 추적이 필요하다.
- **METR/Anthropic RCT (19% 감속)** — 이 글의 정량 인용 핵심 근거. 직접 링크가 없어 후속 검증이 필요하다.
- **Stanford AI-assistant security study** — "덜 안전한 코드를 더 자신 있게 작성"을 인용. 출처 없음.
- **GitClear "code churn"** — 출처 없음.
- **MIT psychological safety (83%)** / **Gartner AI-free skill assessment (50%)** — 출처 없음, 후속 검증 필요.
- **Slopsquatting (2025 신종 공급망 공격)** — AI가 환각한 패키지명을 공격자가 등록하는 공격. 이 글이 "문서화된 사례가 여럿"이라고 언급. 후속 1차 자료 추적 필요.

## 7. 용어집 (Glossary)

- **AI-native engineering**: AI agent와 도구를 부리고 통달해, AI 이전 시대에 불가능했던 것을 만들어내는 직무. 코딩 능력을 전제로 하며 vibe coding과는 범주가 다르다.
- **Vibe coding** (Karpathy 2025): 코딩을 모르는 사람이 원하는 바를 묘사함으로써 작동하는 소프트웨어를 만드는 행위. 민주화의 가치는 있으나 전문 engineering은 아니다.
- **Orchestrator**: AI agent들을 적절히 조율해 10x를 100x leverage로 끌어올리는 AI-native engineer의 정체성.
- **Context engineering**: 프로젝트별 정보(아키텍처 다이어그램·코딩 표준·비즈니스 규칙·팀 관례·개발 워크플로우)를 AI working memory에 체계적으로 큐레이션·주입하는 분야. AI-native engineering의 가장 중요한 단일 스킬.
- **Spec-driven development**: AI에게 빌드를 맡기기 전에 무엇을 원하는지 정의하고, 명확한 milestone으로 쪼개 success criteria를 정한 뒤, 단계마다 검증하며 점진적으로 실행하는 워크플로우.
- **Critical verification**: AI 코드가 규모·신뢰성·보안 측면에서 작동함을 증명하는 작업. AI-native 시대의 새로운 율속 단계다.
- **Problem decomposition**: 사람이 edge case·커스텀 로직·도메인을 맡고 AI agent가 70–80%의 정형 구현을 맡도록, task를 AI가 다룰 수 있는 단위로 쪼개는 일.
- **40/20/40 시간 배분**: 맥락 설정 / 생성+테스트 / 리뷰+검증의 권고 비율.
- **ADLC (Agentic Development Life Cycle)**: 전통 SDLC를 AI-native 환경에 맞게 재정의한 6단계(Planning · Building · Testing · Review · Documentation · Codify).
- **Agent swarm**: 같은 task에 여러 전문화된 agent를 투입해 서로 견제시키는 구조(예: planning ↔ building ↔ testing ↔ review).
- **Generalization principle (review)**: 한 이슈(예: injection 취약점)가 발견되면 같은 유형이 다른 곳에도 있다고 가정하고 미리 스캔하는 원칙.
- **MCP (Model Context Protocol)**: Anthropic이 제안한 agent와 외부 도구·데이터 소스 연결 표준. 이 글에서 "USB-C for AI"로 비유된다.
- **CLAUDE.md**: Claude Code 등 AI agent가 일관되게 참조하는 프로젝트 수준 context file. 이 글에서 "선택적 문서가 아닌 핵심 인프라"로 규정된다.
- **"OpenClaw" of Claude**: 이 글에서 Claude의 multi-sub-agent 병렬 실행 기능을 가리킨 비공식 명칭(공식 명칭 미확인).
- **Ralph Loops** (autonomous quality gate): success criteria를 충족할 때까지 반복 검증을 돌리는 자율 루프 패턴.
- **Anthropic Daybreak / Mythos**: 이 글이 보안 영역의 "분명한 경종"으로 언급한 Anthropic 도구(공식 문서 미확인).
- **"Design to 50%" principle**: 최소 기능으로 핵심 사용자 여정을 ship한 뒤 사용자의 망설임·오해·이탈을 관찰해 실제 제품 문제를 발견하는 원칙.
- **Vercel v0 / Replit Agent / Bolt.new**: 자연어를 분 단위로 동작 프로토타입으로 바꿔주는 AI 프로토타이핑 도구들.
- **Agentic Authorization**: agent가 사람의 감독이 따라잡지 못하는 기계 속도로 접근 제약을 우회하는, 새롭게 떠오른 엔터프라이즈 보안 문제.
- **Prompt injection**: 외부 콘텐츠(문서·웹·사용자 입력)에 숨은 명령이 agent의 행동을 가로채는 공격.
- **Slopsquatting** (2025 신종 공격): AI가 환각한 패키지명을 공격자가 등록해 악성 코드를 배포하는 공급망 오염.
- **Code overload** (NYT 2026-04-06 Isaac & Griffith): 기술 인력이 너무 빠르게 너무 많은 코드를 생산해 감당할 수 없게 된 산업 현상.
- **Code churn** (GitClear): 코드가 작성된 뒤 빠르게 수정·삭제되는 비율. 산출량이 생산성의 빈약한 대리지표임을 시사한다.
- **Skill atrophy** (Gartner): AI 의존으로 기초 능력이 퇴화하는 현상. "2026년까지 조직의 50%가 AI-free 역량 평가를 요구한다"는 전망.
- **Productivity paradox**: 개인의 AI 생산성 이득이 팀·회사 수준에서 실현되지 못하는 현상. "망가진 프로세스에 AI를 더하면 망가진 코드를 더 빠르게 양산할 뿐".
- **70/30 (팀 변환)**: 성공의 70%가 운영·문화 변화에서, 30%가 기술·도구에서 온다는 이 글의 처방.
- **80%+/<20% (Mastery 메트릭)**: AI 생성 코드 비율 80% 이상에 재작성률 20% 미만이 Phase 3 Mastery 목표.

## 8. 그림 후보 (Figure Candidates)

원본 article(ByteByteGo)에 실린 도식 7장을 사용자가 직접 캡처해 `raw/articles/rahman-2026-a-practical-guide-to-becoming-figures/`에 저장했다 (`strategy: manual` — rule #1로 에이전트 자동 fetch ❌). 모두 글의 핵심 개념을 1:1로 시각화한 자작 다이어그램이라 7장 전부 wiki 임베드를 권장한다.

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | 글 헤더 — ADLC 4단계(Planning→Building→Testing→Review) 순환 | manual | ★ wiki 권장 (요약 헤더) |
| fig02 | AI-native engineering ≠ vibe coding ≠ no human coding | manual | ★ wiki 권장 (orchestrator 정체성) |
| fig03 | Orchestrator Pattern — Traditional vs AI-native engineer | manual | ★ wiki 권장 (주요 기여 #1) |
| fig04 | Context Engineering 스택 (prompt→files→conventions→architecture→MCP→agent) | manual | ★ wiki 권장 (4 Core Practices) |
| fig05 | Verification Inversion — 기대 10/70/20 vs 실제 40/20/40 | manual | ★ wiki 권장 (40/20/40 시간 배분) |
| fig06 | Agentic Development Lifecycle 전체도 | manual | ★ wiki 권장 (ADLC) |
| fig07 | Learning Loop — Build→Show→Watch→Learn→Decide→Simplify | manual | ★ wiki 권장 (학습 루프/레버리지) |
