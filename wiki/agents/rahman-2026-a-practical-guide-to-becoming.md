---
title: "A Practical Guide to Becoming an AI-Native Engineer (Shah Rahman, ByteByteGo 2026-06-02)"
type: article
year: 2026
category: agents
raw_path: /Users/kmyu/Desktop/project/ai-wiki/raw/articles/rahman-2026-a-practical-guide-to-becoming.md
raw_filename: "rahman-2026-a-practical-guide-to-becoming.md"
source_collection: external
source: rahman-2026-a-practical-guide-to-becoming.md
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

## 요약 (Summary)

![[assets/rahman-2026-a-practical-guide-to-becoming/fig01.png]]
*Figure 1: 글 헤더 — ADLC 4단계(Planning → Building → Testing → Review)가 순환하는 AI-native 개발 모델 (Rahman 2026)*

Meta Ads에서 Autonomous ML Iteration & Optimization을 총괄하는 Shah Rahman이 2026-06-02 ByteByteGo Newsletter에 기고한 2부작 중 1부다. 글은 화려한 통계로 문을 연다 — AI가 Google 신규 코드의 75%를 쓰고, OpenAI·Anthropic은 거의 전부를 AI로 생성하며, Amazon은 Java 8에서 17로의 30,000개 앱 마이그레이션(약 4,500 dev-year 분량)을 단기간에 끝냈고, Zuckerberg는 2026년 말이면 AI가 mid-level engineer 수준으로 일하리라 내다봤다. 그러나 저자는 곧장 반문한다. 그렇다면 왜 대부분의 팀은 2년 전보다 더 많은 버그·인시던트·기술부채를 쏟아내는가? (NYT가 2026-04-06 Isaac & Griffith의 기사에서 "code overload"라 부른 현상이다.) 같은 모델과 도구를 쓰는데도 결과가 갈리는 이 격차를, Rahman은 **engineer에서 orchestrator로의 정체성 전환** 한 가지로 설명한다.

![[assets/rahman-2026-a-practical-guide-to-becoming/fig02.png]]
*Figure 2: AI-native engineering ≠ vibe coding ≠ no human coding — 세 범주의 명시적 구분 (Rahman 2026)*

핵심 명제는 **AI-native engineering은 vibe coding(Karpathy 2025)과 범주가 다르다**는 것이다. "코딩은 늘 engineering의 20–30%였을 뿐이고, 코드가 늘었다고 더 생산적인 것은 아니다(오히려 줄기 쉽다)"는 인식 위에서, 저자는 네 가지 핵심 실천(4 Core Practices)을 처방한다 — ① 맥락 동기화 엔지니어링(Synchronized Context Engineering): MCP를 "USB-C for AI"로, CLAUDE.md를 선택적 문서가 아닌 핵심 인프라로 보며, 엄격히 실천하는 팀은 속도가 40–50% 빨라진다고 보고된다. ② 명세 주도 개발(Spec-Driven Development). ③ 비판적 검증(Critical Verification): AI 코드의 약 45%에 보안 결함이 있고, METR/Anthropic의 RCT에서는 경력 개발자가 친숙한 코드베이스에서 오히려 19% 느려졌다. ④ 문제 분해(Problem Decomposition): edge case와 도메인 로직은 사람이, 70–80%의 정형 구현은 AI가 맡는다. 여기에 **40/20/40 시간 배분**(맥락 설정 / 생성·테스트 / 리뷰·검증), 3단계 개인 전환(Foundation 2주 이내 · Integration 1개월 이내 · Mastery 지속 — 목표는 AI 생성 코드 80% 이상, 재작성률 20% 미만), 그리고 70/30 팀 변환(MIT 조사에서 리더 83%가 "psychological safety가 AI 이니셔티브 성공에 기여한다"고 응답)을 더하고, 운영의 중심축으로 **ADLC(Agentic Development Life Cycle)** 6단계(Planning → Building → Testing → Review → Documentation → Codify)를 정의한다.

ADLC의 차별점은 단계마다 별도의 agent swarm을 두어 서로 견제시키는 데 있다. planning agent가 지름길을 택한 building을 challenge하고, testing agent가 커버리지를 빠뜨린 곳을 잡아내며, review agent가 그럴듯하지만 편향된 구현을 적발한다. Review 단계에는 generalization principle을 둔다 — injection 취약점이 한 건 나오면 같은 유형이 다른 곳에도 있다고 보고 미리 스캔하는 것이다. 저자는 "construction cost와 decision cost"를 구분해 업계 통념도 반박한다. AI가 빌드 비용은 크게 줄였지만 그것은 전체 개발 비용의 20–30%일 뿐이고, "무엇을 만들고 무엇을 버릴지"라는 의사결정 비용은 거의 그대로라는 것이다. AI가 진짜 레버리지를 내는 곳은 네 군데다 — 값싼 실험(전체 기능의 70% 이상은 사용자에게 닿지도 못한다), 빠른 프로토타이핑(v0·Replit Agent·Bolt.new), 판단이 아닌 보일러플레이트 자동화, 그리고 "design to 50%" 원칙(최소 기능만 내보내고 사용자가 어디서 망설이고 이탈하는지 관찰).

![[assets/rahman-2026-a-practical-guide-to-becoming/fig07.png]]
*Figure 7: 학습 루프 — Build → Show → Watch → Learn → Decide → Simplify의 순환. AI가 Build를 압축해도 가치는 나머지 사이클의 실행 품질에 달려 있다 (Rahman 2026)*

마지막으로 저자는 **보안 가드레일은 더 이상 선택이 아니라고** 못 박는다. 자신의 환경에서 주당 한 건꼴로 새로운 insecure AI integration이 나타났고 다수가 실제 production incident로 이어졌다고 전하며, 네 건의 사고를 든다 — 이틀 만에 AI로 만든 Chat Integration이 2FA 우회와 열린 ACL을 타고 RCE에 이른 사례, AI 코딩 agent가 약 1,500개의 보호된 DB 테이블에 무단 접근한 사례, Google Docs에 심긴 prompt injection이 입력 필터링을 우회해 RCE로 번진 사례, 그리고 AI가 환각한 패키지명을 공격자가 선점 등록하는 2025년 신종 공급망 공격 slopsquatting이다. AI 코드 스니펫의 보안 취약 비율은 Python 약 30%, JavaScript 약 25%로 집계된다. 처방은 9개 컨트롤(4+3+2)로 — Agent Identity & Access · Data Classification · Prompt Injection Protection("신뢰할 수 없는 명령을 자동 실행하지 말고, agent 제안을 자동 수락하지 말 것") · Infrastructure Sandboxing의 4축, static analysis의 CI/CD 통합 · Ralph Loops나 OpenClaw 같은 autonomous loop · skills-based security의 기술 3축, 그리고 skill atrophy 예방(Gartner는 2026년까지 조직의 50%가 "AI-free" 역량 평가를 요구하리라 전망)과 productivity paradox 경고("망가진 프로세스에 AI를 더하면 망가진 코드를 더 빠르게 찍어낼 뿐")의 조직 2축이다.

결론은 분명하다. **AI-native 생산성의 진짜 차별자는 도메인 전문성**이며, 이것은 한 번의 도구 도입이 아니라 여러 해에 걸친 전환이라는 것이다.

> **2차 자료 주의**: Stanford·METR·Anthropic·GitClear·MIT·Gartner 등 다수 연구를 인용하지만 출처 링크나 논문 ID, 연도가 거의 없다(명시된 것은 NYT 2026-04-06 Isaac & Griffith뿐). "주당 한 건" 같은 1인칭 정성 관찰은 Meta hyperscale 환경 기준이라 SMB·스타트업에 그대로 일반화하기 어렵다. "OpenClaw of Claude", "Anthropic Daybreak/Mythos"는 공식 명칭이 확인되지 않아 후속 추적이 필요하다. 2부 "AI-Native Leaders"는 아직 미발행이다.

## 주요 기여 (Key Contributions)

1. **engineer에서 orchestrator로의 정체성 재정의**: 코딩은 늘 engineering의 20–30%였을 뿐이고 코드가 늘었다고 더 생산적이지는 않다는 전제에서 출발해, AI-native engineering을 "코딩 능력을 갖춘 사람이 AI agent와 도구를 부리고 통달하는 일"로 규정한다. vibe coding과는 범주가 다르다는 점을 분명히 했다.

![[assets/rahman-2026-a-practical-guide-to-becoming/fig03.png]]
*Figure 3: Orchestrator Pattern — 전통적 엔지니어는 Code·Tests·Docs·Reviews를 직접 다루지만, AI-native 엔지니어는 같은 자리에서 Planning·Building·Testing·Review agent를 지휘한다 (Rahman 2026)*
2. **4 Core Practices 체계화**: 맥락 동기화 엔지니어링 · 명세 주도 개발 · 비판적 검증 · 문제 분해. 각 실천을 "무엇을 · 왜 지금 · 어떤 운영 규칙으로"의 세 축으로 정렬했다.
3. **40/20/40 시간 배분 권고**: 개발자 대부분이 코드 생성에 시간을 쏟는다는 통념을 반박한다. 생성은 빠르고, 새로운 병목은 검증과 맥락 설정이라는 것이다.
4. **3단계 개인 전환 여정**: Foundation 2주 이내 · Integration 1개월 이내 · Mastery 지속. 목표는 AI 생성 코드 80% 이상, 재작성률 20% 미만이다.
5. **70/30 팀 변환 법칙**: 전환 성공의 70%가 운영·문화 변화에서 온다. 세 가지가 필수다 — psychological safety(MIT 조사 리더 83%), 진화한 코드 리뷰(AI 코드와 사람 코드를 분리해 별도 rubric으로 보고, "AI가 생성하고 AI가 리뷰한 PR" 조합에는 명시적 guardrail), 그리고 공유 맥락 라이브러리(표준화를 두고 경쟁하지 말고 협업하라는 경계).
6. **ADLC(Agentic Development Life Cycle) 6단계**: Planning → Building → Testing → Review → Documentation → Codify. 핵심 팁은 agent swarm을 분리해 서로 견제시키는 구조이며, Review 단계에는 한 건의 취약점이 발견되면 같은 유형을 미리 스캔하는 generalization principle을 둔다.
7. **construction cost와 decision cost의 구분**: AI가 빌드 비용을 크게 줄였지만 그것은 전체 개발 비용의 20–30%일 뿐이고, "무엇을 만들고 무엇을 버릴지"의 의사결정 비용은 그대로라는 논리로 업계 통념을 반박한다.
8. **AI가 내는 진짜 레버리지 4가지**: 값싼 실험(기능의 70% 이상은 사용자에게 닿지 못함), 빠른 프로토타이핑(v0·Replit Agent·Bolt.new), 판단이 아닌 보일러플레이트 자동화, 그리고 "design to 50%" 원칙.
9. **실제 보안 사고 4건과 slopsquatting**: Chat Integration RCE, 약 1,500개 테이블에 대한 무단 DB 접근, Google Docs prompt injection을 통한 RCE, 그리고 2025년 신종 공급망 공격 slopsquatting. AI 코드 스니펫의 보안 취약 비율은 Python 약 30%, JavaScript 약 25%다.
10. **4+3+2 = 9개 Guardrail 스택**: Agent/Identity 4축(Access · Data Classification · Prompt Injection Protection · Infrastructure Sandboxing), Technical 3축(static analysis CI/CD 통합 · Ralph Loops/OpenClaw autonomous loop · skills-based security), Organizational 2축(skill atrophy 예방 — Gartner 50% · productivity paradox 경고).
11. **진짜 차별자는 도메인 전문성**: senior engineer가 훨씬 나은 결과를 내는 이유는 더 깊은 맥락과 더 날카로운 판단을 가져오기 때문이다. AI는 전문성을 대체하는 게 아니라 증폭한다. 이것은 한 번의 도구 도입이 아니라 여러 해에 걸친 전환이며, 도구 업그레이드로만 취급한 팀은 한결같이 실패했다.

## 방법론 및 아키텍처 (Methodology and Architecture)

### 4 Core Practices의 운영적 정의

| Practice | 무엇을 | 왜 지금 | 운영 규칙 |
|---|---|---|---|
| **Synchronized Context Engineering** | 프로젝트별 정보(아키텍처 다이어그램·코딩 표준·비즈니스 규칙·팀 관례·개발 워크플로우)를 체계적으로 큐레이션해 AI working memory에 주입 — 팀 전체가 재사용·표준화 | AI 출력 품질은 받은 맥락의 품질을 넘지 못한다. MCP가 "USB-C for AI" 표준으로 자리 잡았고, CLAUDE.md는 선택적 문서가 아닌 핵심 인프라다 | "prompt engineering"에서 "context engineering"으로의 의식 전환. 팀 속도 40–50% 향상 보고 |
| **Spec-Driven Development** | AI에게 빌드를 맡기기 전에 무엇을 원하는지 먼저 정의하고, 명확한 milestone으로 쪼개 success criteria를 정한 뒤, 단계마다 검증하며 점진적으로 실행 | garbage-in이 전례 없는 속도·물량으로 증폭된다. 명세가 없으면 agent는 circular reasoning에 빠진다 | agent가 미해결 질문은 사용자에게 확인하게 하고, 혼자 답을 찾아 헤매지 못하게 강제 |
| **Critical Verification** | 병목이 "코드를 쓰는 일"에서 "그 코드가 규모·신뢰성·보안 측면에서 작동함을 증명하는 일"로 영구 이동 | AI 코드 품질은 초급 개발자 수준이다. 약 45%에 보안 결함, Stanford 연구는 "AI 사용자가 덜 안전한 코드를 더 자신 있게 쓴다"고 보고, METR/Anthropic은 친숙한 코드베이스에서 19% 감속, GitClear는 code churn 증가를 관찰 | 리뷰·테스트·검증이 새로운 율속 단계이며 타협 불가 |
| **Problem Decomposition** | 사람은 edge case·커스텀 로직·도메인을, AI는 70–80%의 정형 구현을 담당 | 복잡한 문제는 맥락 오염과 slop 생성을 부르고, agent가 거기서 회복하기 어렵다 | "하루이틀 날리지 마라" — 잘 정의된 맥락·합리적 명세·검증 가드레일 없이 고집스레 돌리는 실행을 피한다 |

![[assets/rahman-2026-a-practical-guide-to-becoming/fig04.png]]
*Figure 4: Context Engineering 스택 — User prompt 위에 Project files, Team conventions(CLAUDE.md·코딩 표준), Architecture/business rules, MCP integrations를 쌓아 AI agent가 정렬된 출력을 내게 한다 (Rahman 2026)*

### 40/20/40 시간 배분 (직관에 반하는 처방)

```
40% context-setting │ 20% generation + testing iteration │ 40% review + verification
```

![[assets/rahman-2026-a-practical-guide-to-becoming/fig05.png]]
*Figure 5: Verification Inversion — 개발자들이 기대하는 배분(10/70/20)과 실제로 통하는 배분(40/20/40)의 대비. 병목이 코드 작성에서 검증으로 이동했음을 보여준다 (Rahman 2026)*

개발자 대부분이 코드 생성에 시간을 쏟는다는 통념과 정면으로 부딪힌다. 생성은 빠르고, 새로운 시간 싱크는 검증과 맥락 설정이라는 것이다. ADLC 구조와도 맞물린다 — planning이 가장 중요하고, review swarm이 마지막 게이트가 된다.

### 3-phase 개인 전환 여정

| Phase | 기간 | 핵심 활동 | 핵심 위험 |
|---|---|---|---|
| **1. Foundation** | 2주 이내 | 주력 AI assistant 하나를 고르고(Codex / Claude Code / Cursor) 매일 써보며 능력과 한계에 대한 직관을 쌓는다 · workspace와 설정을 갖추고 개인 노트를 기록 | 수작업에서 AI 보조로의 정체성 도약 — "언제 AI가 도움이 되고 언제 일을 더 만드는지"에 대한 판단력 부재 |
| **2. Integration** | 1개월 이내 | 구조화된 프롬프트 framework · 프로젝트별 context file · "Plan → Execute → Review" 워크플로우 · atomic task마다 리뷰 · approval gate와 guardrail 수립 | 리뷰를 건너뛰면 사용자와 agent 모두에게 기술부채가 쌓인다. 큰 자율 실행의 유혹 — 계획 없이 추측으로 돌린 autonomous run은 결국 버려질 slop만 남긴다 |
| **3. Mastery** | 지속 | 다단계·다중 파일 task에 agent 투입 · AI 보조 코드 리뷰 · 다중 agent 워크플로우와 병렬 세션, cross-agent 검증 | 매주 새 벤치마크가 쏟아진다 — Claude·Codex 제작사의 권고를 그대로 따르지 말고 자기 상황에 맞게 적용 |

**Target metric**: **80%+ AI-generated coding rate · <20% rewrite rate**.

### ADLC (Agentic Development Life Cycle)

```
Planning ───────────► Building ─────► Testing ─────► Review ─────► Documentation
   ▲                                                                       │
   │                                                                       │
   └──────────────────────── Codify ADLC ◄─────────────────────────────────┘
```

![[assets/rahman-2026-a-practical-guide-to-becoming/fig06.png]]
*Figure 6: Agentic Development Lifecycle 전체도 — Planning·Building·Testing·Review가 순환하고, Documentation은 모든 단계에 걸쳐 실시간 생성되며, Codify ADLC가 실천을 스스로 진화하는 라이브러리로 인코딩한다 (Rahman 2026)*

| 단계 | 핵심 | Pro pattern |
|---|---|---|
| **Planning** (가장 중요) | deep research와 다중 agent 병렬 탐사, 코드베이스에 맞춘 명세화, 모호성 표시, subtask 분해, 난이도 추정, roadmap과 version milestone 수립 | planning agent가 여러 exploration agent의 발견을 모아 일관된 구현 전략을 만든다. Claude의 "OpenClaw"는 여러 sub-agent를 병렬로 돌릴 수 있다 |
| **Building** | agent는 초·중급 엔지니어 역할(1–2년 안에 senior 수준으로 오르리라 예상), 사람은 tech lead 역할. 순차/병렬 실행은 roadmap과 검증 계획에 따라 결정 | Claude Code · Cursor Composer · GitHub Copilot Agent Mode · OpenAI Codex의 빠른 변화를 추적 |
| **Testing** | "TDD의 부활" — agent가 테스트 계획을 먼저 세우고, 처음엔 모두 실패한 뒤 점진적으로 통과시킨다. unit · integration · e2e를 모두 | unit 테스트에 과몰입해 integration·system 테스트를 빠뜨리지 않도록 경계 |
| **Review** | swarm을 7개 차원(기능성 · 품질 · 확장성 · 성능 · 신뢰성 · 보안 · 프라이버시)으로 전문화해 agent가 1차로 훑고 사람이 꼼꼼히 확인 | **generalization principle**: 한 사례(예: injection 취약점)가 나오면 같은 유형이 다른 곳에도 있다고 보고 미리 스캔 |
| **Documentation** | 사후 문서화에서 실시간 생성으로 전환. agent가 요약·설계 결정·아키텍처 다이어그램·changelog를 쓰고, 이것이 API 문서와 고객용 콘텐츠로 이어진다 | 수십 년 묵은 낡고 일관성 없는 문서 문제를 마침내 풀어내는 중 |
| **Codify ADLC** | Layer-1(개인)과 Layer-2(팀)의 실천을 스스로 진화하는 context file·skills library·MCP tool로 인코딩 | 부족 지식에 머물지 않도록 조직 전체로 확장 |

**Pro Tip — agent swarm 견제 구조**: planning·building·testing·review agent를 분리해 서로 견제하게 한다. planning은 지름길을 택한 building을 물고 늘어지고, testing은 커버리지를 빠뜨린 곳을 잡아내며, review는 그럴듯하지만 편향된 구현을 적발한다.

### Security Guardrail Stack (4+3+2 = 9 컨트롤)

**Agent/Identity 4축**

| 컨트롤 | 핵심 |
|---|---|
| Agent Identity & Access Control | step-up 2FA, 최소 권한, 공유 credential·열린 ACL 금지, read-only로 시작해 read-write로 확장 |
| Data Classification Awareness | agent가 민감 데이터 경계를 존중하게 한다. "Agentic Authorization" — agent가 사람의 감독이 따라잡지 못하는 기계 속도로 제약을 우회하는, 새롭게 떠오른 엔터프라이즈 과제 |
| Prompt Injection Protection | 외부 콘텐츠(문서·웹·사용자 입력)에 숨은 명령이 들어 있을 수 있다. 입력 필터링·콘텐츠 검증·맥락 정화를 적용하고, 신뢰할 수 없는 명령을 자동 실행하거나 agent 제안을 자동 수락하지 않는다 |
| Infrastructure Sandboxing | agent 활동을 관찰·감사 가능하게 하고, 고위험 production 영역(설정·핵심 실행·핵심 저장소)을 차단하며 OS 수준에서 강제 |

**Technical 3축**

| 컨트롤 | 핵심 |
|---|---|
| Static analysis CI/CD 통합 | AI 코드 스니펫의 보안 취약 비율은 Python 약 30%, JavaScript 약 25%. 인증·결제·PII 관련 코드는 사람 리뷰 필수 |
| Automated quality gates | Ralph Loops나 OpenClaw 같은 autonomous loop로 success criteria를 충족할 때까지 반복 검증 + diff 제출 전 type-check·lint·test + 다단계 canary |
| Skills-based security | agent에게 안전한 코딩 패턴을 가르쳐 생성 단계에서 취약점을 짚게 한다 — "shift left, 단 agent와 함께" |

**Organizational 2축**

| 컨트롤 | 핵심 |
|---|---|
| Skill atrophy prevention | Gartner는 2026년까지 조직의 50%가 "AI-free" 역량 평가를 요구하리라 전망. AI를 학습 도구로 삼아 생성 코드와 함께 설명을 요청하고, 가끔은 AI 없이 작업한다. 러다이트가 아니라 보험이다 |
| Productivity paradox 경고 | 개인 차원의 이득이 팀·회사 차원에서 실현되지 못하는 경우가 많다. 코딩 속도가 아니라 end-to-end 사이클 타임과 기능 속도에 집중하라. 망가진 프로세스에 AI를 더하면 망가진 코드를 더 빠르게 찍어낼 뿐이다 |

## 결과 (Results)

이 글은 essay라서 **자체 측정 수치는 없다**. 인용된 외부 수치를 한자리에 모은다:

| 메트릭 | 값 | 출처 (article 인용) |
|---|---:|---|
| Google 신규 코드 중 AI 비중 | **>75%** | — (도입부 통계, 출처 미명시) |
| AI 생성 코드의 security flaw 비율 | **~45%** | "Research consistently shows" |
| AI 코드 Python snippet security weakness | **~30%** | "Data shows" |
| AI 코드 JS snippet security weakness | **~25%** | "Data shows" |
| METR/Anthropic RCT — 친숙 codebase 경력 OSS dev 속도 | **−19%** | "METR/Anthropic randomized controlled trial" (출처 링크 없음) |
| 컨텍스트 엔지니어링 팀 효과 | **40–50% 속도 ↑** | "Teams practicing rigorous context engineering report" (정성 보고) |
| 시간 배분 권고 | **40 / 20 / 40** | 1인칭 권고 |
| 개인 전환 — Foundation 기간 | **≤ 2주** | 1인칭 권고 |
| 개인 전환 — Integration 기간 | **≤ 1개월** | 1인칭 권고 |
| Mastery 타깃 메트릭 | **80%+ AI-generated · <20% rewrite** | 1인칭 권고 |
| 팀 변환 — operational/cultural 변화의 성공 기여 | **70%** | "Research shows" (출처 미명시) |
| MIT — psychological safety가 AI 성공에 기여한다고 본 리더 비율 | **83%** | "MIT research found" |
| Coding이 engineering에서 차지하는 비중 | **20–30% (max)** | 1인칭 주장 |
| 70% feature 사용자 미도달 | **>70%** | "cheaper experimentation" 섹션 |
| Gartner — 2026까지 AI-free skill assessment 요구할 조직 비율 | **50%** | "Gartner reports" |
| Unauthorized DB Access 인시던트 | **~1,500 secure DB table 접근** | 익명 사례 |
| 환경 내 신규 insecure AI integration 빈도 | **주당 ~1건, 다수 production incident** | 1인칭 관찰 (검증 불가) |

## 한계 (Limitations)

- **출처 명시 부족**: Stanford·METR·Anthropic·GitClear·MIT·Gartner 등 여러 연구를 인용하지만 직접 링크나 논문 ID, 연도가 거의 없다. 링크가 달린 것은 NYT(2026-04-06)뿐이라 독자가 후속 검증을 하기 어렵다.
- **Meta 시점 편향**: "주당 한 건꼴로 insecure AI integration이 나타난다"는 정성 관찰이 hyperscale 단일 회사를 넘어 일반화되는지 불분명하다. SMB·스타트업에서는 빈도와 유형이 다를 수 있다.
- **벤치마크 부재**: "4 Core Practices를 적용하면 40–50% 빨라진다" 같은 정량 주장의 측정 방법론과 통제군이 공개되지 않았다. ADLC가 전통 SDLC보다 우월하다는 핵심 명제에도 비교 실험이 없다.
- **80%+/<20% 메트릭 정의 모호**: "AI 생성"의 범위(제안 채택인지, 무수정 채택인지, 함수 단위인지)와 "재작성"의 기준(라인 단위 diff인지, 의미 단위인지)이 규정되지 않았다.
- **40/20/40 시간 배분의 일반화 위험**: 도메인(systems vs frontend), 친숙도(legacy vs greenfield), task 길이(빠른 수정 vs 수 주짜리 기능)에 따라 적정 비율이 달라질 텐데 이를 논하지 않는다. METR의 "친숙한 코드베이스에서 19% 감속"을 인용하면서도, 80%+ AI 생성 목표가 바로 그 환경에서 통하는지에는 답하지 않는다.
- **명칭 모호**: "OpenClaw of Claude", "Anthropic Daybreak/Mythos"는 공식 명칭이 확인되지 않아 미래 독자의 추적성이 약하다.
- **2차 통계의 누적 인용 위험**: "Google 신규 코드의 75%+가 AI" 같은 도입부 통계는 1차 출처가 명시되지 않았다. 미디어를 거쳐 반복 인용되며 정확도가 변질될 수 있다.
- **시리즈 1부만 발행**: 70% 팀 변환 처방은 2부 "AI-Native Leaders"의 몫으로 미뤄져, 이 글만으로는 미완이다.
- **실제 사고 4건의 익명화 한계**: 어느 조직·스택이었는지, 어떤 완화책이 효과적이었는지 같은 디테일이 빠져 "학습용 사례"로서의 가치가 제한된다.

## 관련 페이지 (Related Pages)

- [[agents/lee-hoyeon-2026-harness-engineering]] — 이 글의 직접적인 짝이다. "prompt → context → 환경 자체 설계"라는 진화 모델을 공유하며, 이호연의 Harness 6축 순환(구조/맥락/계획/실행/검증/개선)이 Rahman의 ADLC 6단계(Planning/Building/Testing/Review/Documentation/Codify)와 거의 1:1로 대응한다. "같은 모델에 다른 harness를 얹으니 TerminalBench가 14%p 올랐다"는 LangChain 사례가, 이 글의 "같은 모델·도구인데 결과가 갈린다"는 격차 명제의 정량적 증거가 된다.
- [[agents/lin-2026-harness-updating-is-not-harness-benefit]] — "harness 호출을 first-class skill로 학습시키고 long-horizon instruction following을 RL/SFT 타깃으로 삼으라"는 결론이, 이 글의 skills-based security(agent에게 안전한 코딩 패턴을 학습)와 같은 방향이다. "within-agent 편차 5.1pp 대 between-agent 격차 36.0pp"라는 발견은 "capability budget을 evolver가 아니라 task-solving agent에 투자하라"는 권고를 뒷받침한다.
- [[agents/dennis-2026-compiling-agentic-workflows-into-llm]] — "안정적 구조는 weights에, 일시적 상태는 prompt에 둔다"는 명제가, 이 글 ADLC의 Codify 단계(Layer-1/Layer-2 실천을 스스로 진화하는 context file·skill로 인코딩)와 같은 "안정 구조 압축" 철학이다.
- [[agents/qiao-2026-memory-intelligence-agent]] — Manager-Planner-Executor 3-agent 분리가, 이 글의 "planning/building/testing/review agent swarm을 나눠 서로 견제시킨다"는 Pro Tip과 같은 구조적 분리 사상이다.
- [[agents/zou-2026-task-focused-memorization-multimodal-agents]] — "메모리는 수동적 저장이 아니라 능동적·목표 지향적 과정"이라는 명제가, 이 글의 맥락 엔지니어링 정의(단순 prompt 저장이 아닌 체계적 큐레이션과 working memory 주입)와 같은 메모리 능동성을 강조한다.
- [[applications/kmyu-2026-llm-wiki-pattern-synthesis]] — "북키핑 비용이 0에 가까워지며 Bush의 1945년 Memex가 풀지 못한 '누가 유지하느냐' 문제에 LLM이 답한다"는 통찰이, 이 글 ADLC의 Documentation 단계(사후 문서화에서 실시간 생성으로)의 약속과 정렬한다.
- [[applications/datasciencedojo-2026-llm-wiki-by-andrej-karpathy]] — 이 글의 "context file은 핵심 인프라"라는 명제와 LLM Wiki의 entity page(Karpathy 패턴)는 "AI working memory를 체계적으로 큐레이션한다"는 같은 사상의 다른 표현이다.
- [[applications/dnotitia-akb]] — MCP 우선의 agent knowledge base로, 이 글이 "MCP = USB-C for AI"로 강조한 표준의 production 구현체다.
- [[applications/garrytan-gbrain]] / [[applications/safishamsi-graphify]] / [[applications/colbymchenry-codegraph]] — "context file은 핵심 인프라"라는 명제를 각각 markdown 우선 agent memory, graph 전용 RAG, code-intelligence MCP 형태로 구현한 도구들이다.
- [[applications/pandey-2026-rag-is-no-longer-just]] — "RAG는 하나의 패턴이 아니라 design space"라는 슬로건이, 이 글의 "agent도 단일 패러다임이 아니며 orchestration이 필요하다"는 마인드셋과 같은 방향이다.

## 외부 참고 (External References)

- 본 article URL: <https://blog.bytebytego.com/p/a-practical-guide-to-becoming-an>
- NYT "Code Overload" (Isaac & Griffith, 2026-04-06): <https://www.nytimes.com/2026/04/06/technology/ai-code-overload.html>
- Shah Rahman LinkedIn: <https://www.linkedin.com/in/shahirahman/>
- Karpathy "vibe coding" (2025-early) — 이 글이 명시적으로 구분하는 비교 대상.
- Anthropic MCP (Model Context Protocol) — "USB-C for AI" 비유로 인용.
- METR/Anthropic RCT(친숙한 코드베이스에서 19% 감속), Stanford AI-assistant 보안 연구, GitClear "code churn", MIT psychological safety 83%, Gartner AI-free 역량 평가 50%, slopsquatting(2025 신종 공급망 공격), "OpenClaw of Claude", Anthropic Daybreak/Mythos — **이 글에는 직접 링크나 논문 ID가 없어 후속 1차 자료 추적이 필요하다**.
- 시리즈 2부 "AI-Native Leaders" — 글 말미에 예고됐으나 발행 시점 미상.
