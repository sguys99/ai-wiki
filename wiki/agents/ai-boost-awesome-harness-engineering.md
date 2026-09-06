---
title: "Awesome Harness Engineering"
type: repo
year: 2026
category: agents
source: ai-boost-awesome-harness-engineering.md
raw_path: raw/repos/ai-boost-awesome-harness-engineering.md
raw_filename: "ai-boost-awesome-harness-engineering.md"
source_collection: external
org: "ai-boost"
repo: "awesome-harness-engineering"
url: "https://github.com/ai-boost/awesome-harness-engineering"
license: "CC0-1.0"
tags: [harness-engineering, agent-harness, awesome-list, agent-loop, context-engineering, tool-design, mcp, skills, memory, orchestration, evals, observability, hitl, sandbox]
---

## 요약

`ai-boost/awesome-harness-engineering`는 AI 에이전트를 감싸는 harness를 모델과 분리된 독립 공학 분야로 규정하고, 관련 자료 385개를 문제 단위로 분류한 GitHub awesome-list다. harness는 모델을 감싸 도구와 verification, 상태를 제공하는 실행 환경을 뜻한다. 목록은 본문 8개 절로 나뉘며, 그중 Design Primitives가 12개 하위 절 218개 항목으로 가장 크다.

이 목록의 특징은 분류 기준에 있다. 대부분의 에이전트 목록이 OpenAI, Anthropic, Google 같은 벤더나 프레임워크 이름으로 자료를 묶는 반면, 이 목록은 harness가 푸는 문제로 묶는다. README는 그 원칙을 "Harness components organized by the problem they solve, not by vendor"라고 명시한다. 라이선스는 CC0-1.0으로, 목록 전체가 public domain에 놓여 있어 인용과 재배포에 제약이 없다.

## 배경

harness engineering이라는 이름은 2026년 상반기에 여러 조직에서 거의 동시에 등장했다. OpenAI, Anthropic, Google, Red Hat, Martin Fowler 진영, LangChain, deepset이 각각 같은 문제를 다른 어휘로 정리했고, 여기에 arXiv 논문이 정의와 분류를 붙이기 시작했다. 자료는 늘었으나 어디서부터 읽어야 하는지, 어떤 글이 같은 문제를 다루는지는 흩어져 있었다.

이 목록은 그 흩어짐을 정리하려는 시도다. README 첫 문단이 분야의 범위를 직접 규정한다. harness engineering은 컨텍스트 전달, 도구 인터페이스, 계획 산출물, verification 루프, 메모리 시스템, 샌드박스를 설계하는 분야이며, 이 scaffolding이 에이전트가 실제 과제에서 성공하는지 실패하는지를 결정한다는 것이다. scaffold는 모델 주위에 짜 놓은 보조 실행 구조를 뜻한다.

목록 전체를 관통하는 전제도 첫 화면에 놓여 있다. 여기 수록된 모든 구성 요소는 모델이 혼자 해내지 못하기에 존재하며, 좋은 harness는 그 구성 요소가 모델 발전으로 언젠가 불필요해질 것을 알고 설계된다는 것이다. 이 전제는 harness를 영구 자산이 아니라 현재 모델의 결함에 대응하는 한시적 구조물로 본다.

## 핵심 개념

harness는 모델 호출을 감싸는 런타임 층 전체를 가리킨다. 목록이 수록한 arXiv 2606.10106은 그 필요충분조건을 네 가지로 규정한다. agent loop, 도구 인터페이스, 컨텍스트 관리, 제어 메커니즘이다. agent loop는 모델 호출에서 도구 실행, 관찰로 이어지는 기본 순환을 뜻한다. 이 네 가지를 모두 갖추어야 harness이고, 하나라도 빠지면 생성기나 가드레일, 단순 도구 래퍼로 분류된다. 논문은 이 기준을 Claude Code, Codex CLI, Aider, Cline, OpenHands, SWE-agent에 적용해 판정한다.

design primitive는 harness를 구성하는 문제 단위 요소를 뜻한다. 이 목록은 그것을 12가지로 나누고, 각 자료를 벤더가 아니라 이 12가지 중 어디에 속하는지로 분류한다. 같은 회사의 문서라도 다루는 문제가 다르면 다른 절에 놓인다. 예를 들어 Anthropic의 Writing Effective Tools for Agents는 Tool Design에, Compaction 문서는 Context Delivery & Compaction에 들어간다.

compaction은 길어진 대화 이력을 요약으로 접어 컨텍스트 한계 안에서 세션을 이어가는 처리다. 목록은 이 처리를 harness의 핵심 관심사로 다루며, 서버 측 자동 compaction부터 에이전트가 스스로 시점을 고르는 방식까지 25개 항목을 모았다.

meta-harness는 harness 자체를 생성하거나 최적화하는 상위 도구를 뜻한다. 사람이 harness를 손으로 조율하는 대신, 실패 사례를 모아 harness 구성을 자동으로 고치는 계열이며 목록은 이를 별도 하위 절로 분리했다.

## 목록의 구조

### 최상위 구성과 규모

본문은 8개 절로 나뉜다. 각 절의 항목 수는 다음과 같다.

| 절 | 항목 수 | 다루는 범위 |
|---|---|---|
| Foundations | 28 | 분야를 정의하는 에세이와 논문 |
| Design Primitives | 218 | 12개 하위 절, harness 구성 요소를 문제별로 분류 |
| Reference Implementations | 64 | 4개 하위 절, 읽을 가치의 근거를 주석으로 단 실제 레포 |
| Security, Sandbox & Permissions | 33 | 격리, prompt injection 방어, 인가 |
| Evals & Verification | 19 | 벤치마크와 평가 harness |
| Templates | 표 4행 | 복사해 쓰는 harness 산출물 |
| Production Infrastructure & Operations | 16 | 배포, 비용, 거버넌스, 관측 |
| Related Awesome Lists | 7 | 인접 범위의 다른 목록 |

전체 링크 항목은 385개이고, Templates 절은 링크가 아니라 레포 안의 파일 4개를 표로 제시한다. 절 하나가 목록의 절반을 넘는 구조인데, Design Primitives 218개가 그렇다. 나머지 7개 절을 모두 더해도 167개다. 이 편중은 목록의 목적이 자료 수집이 아니라 문제 분해에 있음을 보여준다.

README는 zdoc.app을 통해 9개 언어 번역본을 연결한다. 독일어, 영어, 스페인어, 프랑스어, 일본어, 한국어, 포르투갈어, 러시아어, 중국어다. 감사의 글은 harness engineering 아이디어가 논의되고 다듬어진 자리로 linux.do 테크 커뮤니티를 든다.

목차와 본문 사이에 불일치가 하나 있다. 상단 Contents 목록에는 Production Infrastructure & Operations 절이 빠져 있으나, 본문에는 16개 항목을 가진 절로 실재한다. 목차를 따라 훑으면 운영 관련 자료를 통째로 놓친다.

### 분야를 정의한 문헌

Foundations 28개 항목은 harness engineering이 무엇인지를 각자 다른 어휘로 정의한 글을 모은다. 정의가 하나로 수렴하지는 않으나, 서로를 대체하기보다 보완한다. 주요 정의를 나란히 놓으면 다음과 같다.

| 출처 | harness를 무엇으로 보는가 | 제시한 구성 요소 |
|---|---|---|
| arXiv 2606.10106 | 필요충분조건을 갖춘 런타임 층 | agent loop, 도구 인터페이스, 컨텍스트 관리, 제어 메커니즘 |
| LangChain, The Anatomy of an Agent Harness | 다섯 가지 primitive의 조합 | 파일시스템, 코드 실행, 샌드박스, 메모리, 컨텍스트 관리 |
| Martin Fowler | 맞물린 세 체계 | context engineering, 아키텍처 제약, 엔트로피 관리 |
| Birgitta Böckeler | feedforward 안내와 feedback 센서의 결합 | 계산 기반 통제(linter, 테스트)와 추론 기반 통제(LLM-as-judge) |
| Red Hat | 사람과 에이전트의 협업 구조 | vibes, specs, 스킬, 에이전트 네 요소 |
| deepset | 실패 유형별 대응 구조 | 컨텍스트, 제약, verification, planning 실패에 각 harness 구성 요소를 대응 |
| Architectural Design Decisions in AI Agent Harnesses | 설계 결정의 비교 대상 | 서브에이전트 구조, 컨텍스트 관리, 도구 체계, 안전 장치, 오케스트레이션 |

마지막 항목은 공개 에이전트 시스템 70개를 실증 분석해 다섯 가지 아키텍처 패턴을 뽑아낸 논문이다. 목록은 이 연구를 harness 선택이 프레임워크 인기 투표에서 설계 트레이드오프 비교로 넘어가는 계기로 소개한다.

Foundations에는 실패 사례도 들어 있다. Anthropic의 2026년 4월 postmortem은 Claude Code 품질 저하의 원인을 세 가지 harness 수준 변경으로 추적한다. reasoning effort 기본값 하향, 오래된 세션에서 사고 이력을 계속 떨어뜨린 캐싱 최적화 버그, 지나치게 공격적인 축약 지시문이다. 프롬프트 문구와 캐시 헤더, 기본 파라미터 같은 사소해 보이는 조정이 겹쳐 눈에 보이는 성능 저하로 이어질 수 있음을 보여주는 사례다.

### design primitive 12가지

Design Primitives는 harness를 12개 문제로 쪼갠다. 하위 절의 규모와 대표 항목은 다음과 같다.

| 하위 절 | 항목 수 | 대표 항목 |
|---|---|---|
| Agent Loop | 19 | ReAct, Unrolling the Codex Agent Loop, LangGraph Low Level Concepts, statewright, AgentSPEX |
| Planning & Task Decomposition | 12 | Run Long-Horizon Tasks with Codex, Plan-and-Execute, LATS, AdaptOrch, TDP |
| Context Delivery & Compaction | 25 | Effective Context Engineering, Compaction 문서, LLMLingua, OpenViking, Trellis, Token Savior |
| Tool Design | 15 | Writing Effective Tools for Agents, Tool Annotations as Risk Vocabulary, outlines, instructor, AutoHarness |
| Skills & MCP | 32 | Model Context Protocol, playwright-mcp, Code Execution with MCP, A2A Protocol, AG-UI |
| Permissions & Authorization | 12 | Beyond Permission Prompts, OWASP LLM06 Excessive Agency, Claude Code Auto Mode, Open Agent Passport |
| Memory & State | 23 | Letta(MemGPT), mem0, Zep, MemArchitect, ClawVM, cognee |
| Task Runners & Orchestration | 31 | LangGraph, OpenAI Agents SDK, Google ADK, AutoGen, CrewAI, strands-agents/harness-sdk |
| Verification & CI Integration | 12 | Demystifying Evals for AI Agents, promptfoo, AgentBench, AgentAssay |
| Observability & Tracing | 14 | OpenLLMetry, Arize Phoenix, Langfuse, OTel GenAI Semantic Conventions, Braintrust |
| Debugging & Developer Experience | 12 | AgentOps, claude-devtools, AgentDebug, AgentPrism, AgentStepper |
| Human-in-the-Loop | 11 | aws-samples HITL 4패턴, LangGraph HITL, HiL-Bench, Measuring AI Agent Autonomy |

가장 큰 두 하위 절은 Skills & MCP 32개와 Task Runners & Orchestration 31개다. 앞의 것은 에이전트에 능력을 붙이는 규약을, 뒤의 것은 여러 에이전트와 도구의 실행을 조율하는 층을 다룬다. 두 절을 합치면 63개로 Design Primitives의 약 29%를 차지한다.

Agent Loop 절은 이론과 구현을 함께 놓는다. ReAct 논문이 Thought, Action, Observation 순환의 원형을 제공하고, LangGraph는 그 순환을 타입이 붙은 상태와 조건부 간선, 체크포인트를 갖춘 방향 그래프로 모델링한다. LangChain의 미들웨어 글은 `before_agent`, `before_model`, `wrap_model_call`, `wrap_tool_call`, `after_model`, `after_agent` 여섯 개 훅으로 루프의 모든 단계를 가로채는 설계를 제시한다. 프롬프트로 부탁하는 대신 결정적 코드로 강제하는 방식이며, 개인정보 마스킹처럼 프롬프트에 맡길 수 없는 처리에 쓴다.

Context Delivery & Compaction 절은 컨텍스트를 압축 문제가 아니라 탐색 문제로 다시 보는 흐름을 담는다. Token Savior는 코드베이스를 함수와 클래스, 호출 그래프 단위로 색인해 에이전트가 파일 전체를 읽는 대신 포인터로 이동하게 한다. Trellis는 비대해진 단일 지시문 파일을 단계별로 필요한 규약과 태스크 명세, 세션 기록만 불러오는 구조로 대체한다. OpenViking은 메모리와 리소스, 스킬을 파일시스템 형태로 통합해 에이전트가 필요한 경로만 가져가게 한다.

Permissions & Authorization 절은 승인 피로 문제를 다룬다. Anthropic의 Claude Code Auto Mode 글은 사용자가 승인 요청의 93%를 그대로 승인한다는 관찰에서 출발한다. 승인 절차가 형식만 남았다는 뜻이다. 대안으로 제시된 것은 2단계 분류기로, 빠른 단일 토큰 판정을 먼저 돌리고 위험 표시가 붙은 행동에만 chain-of-thought 추론을 적용한다.

Human-in-the-Loop 절은 사람이 언제 개입해야 하는지를 계량한 자료를 모은다. AWS의 참고 구현은 민감한 tool call에 대한 승인 방식을 네 가지로 제시한다. 훅 기반 일괄 정책, 도구별 세밀 제어, Step Functions를 통한 비동기 외부 승인, MCP Elicitation을 이용한 규약 수준 실시간 승인이다. HiL-Bench는 잘 정의된 태스크에 현실적인 장애물을 3개에서 5개 주입하고 `ask_human()` 도구를 준 뒤, 에이전트가 도움을 요청할 시점을 아는지 측정한다.

### 참고 구현

Reference Implementations는 "각 항목에 왜 시간을 쓸 가치가 있는지 주석을 단다"는 원칙 아래 4개 하위 절로 나뉜다.

| 하위 절 | 항목 수 | 성격과 대표 항목 |
|---|---|---|
| Tutorials & Educational | 14 | 학습 경로. Learn Harness Engineering, smolagents, mini-coding-agent, learn-claude-code |
| Generators & Meta-Harnesses | 16 | harness를 만들거나 최적화하는 상위 도구. harness-evolver, auto-harness, Meta-Harness, AutoAgent |
| Demo Harnesses | 28 | 읽고 뜯어볼 완성 harness. OpenHands, Goose, SWE-agent, Aider, deepagents, OpenCode |
| Adjacent Collections | 6 | 범위가 겹치는 다른 목록과의 대조 |

Tutorials 절의 Learn Harness Engineering은 이 wiki에도 별도 페이지가 있는 프로젝트 기반 강의 과정이다. 목록은 이를 각 모듈이 개념 요약 대신 동작하는 산출물을 만들어낸다는 이유로 추천한다.

Generators & Meta-Harnesses 절은 harness 조율을 사람 손에서 떼어내려는 시도를 모은다. Meta-Harness 논문은 지시문과 도구 정의, 컨텍스트 관리, 종료 조건 전체를 하나의 최적화 대상으로 묶고, 제안자 에이전트에게 과거 harness 후보와 점수, 실행 기록 전체를 파일시스템으로 열어준다. 진단용 컨텍스트가 이전 연구의 26,000 토큰에서 1,000만 토큰으로 늘어난 점이 핵심 차이다.

Demo Harnesses 절의 OpenHands는 런타임과 샌드박스 격리, 이벤트 스트림 메시지 버스, 에이전트 컨트롤러라는 3계층 구성으로 소개된다. 완성된 harness 하나를 통째로 읽고 싶을 때의 출발점 역할을 한다.

### 보안과 샌드박스

Security, Sandbox & Permissions는 33개 항목으로 Design Primitives를 뺀 절 가운데 가장 크다. 샌드박스 구현, prompt injection 방어, 인가 규약, 감사 도구가 함께 들어 있다.

샌드박스는 기동 시간과 상태 유지 방식으로 갈린다. E2B는 Firecracker microVM 기반으로 약 150ms 만에 기동하며 일회성 코드 실행에 맞춰져 있다. Daytona는 OCI 컨테이너 기반으로 90ms 미만에 기동하고 작업 디렉터리 상태를 기한 없이 유지해, 여러 세션에 걸쳐 같은 작업 공간을 쓰는 harness에 적합하다.

방어 자료 가운데 tldrsec/prompt-injection-defenses는 입력 검증, 도구 출력 정화, 카나리 토큰 등 실무 방어 기법의 목록으로 소개되며, 신뢰 경계를 점검하는 체크리스트 역할을 한다. OWASP LLM06:2025는 과도한 권한 부여, 불필요한 기능 노출, 승인 절차 부재를 excessive agency 위험으로 규정해 harness 권한 범위를 최소 권한 원칙과 대조할 기준을 제공한다.

Anthropic의 격리 관련 글은 모델 계층 방어만으로는 과잉 행동의 약 17%를 놓친다고 보고하며, 환경 격리가 1차 경계여야 한다고 주장한다. 허용 목록을 통한 데이터 유출 사례를 들어 가장 약한 지점이 샌드박스 자체가 아니라 그 주변의 harness 배관이라는 점을 짚는다.

### 평가와 검증

Evals & Verification 19개 항목은 벤치마크와 평가 harness를 함께 담는다. SWE-bench가 코딩 에이전트의 기준 벤치마크로, promptfoo와 DeepEval, Inspect AI가 자체 평가를 구성하는 도구로 들어 있다.

이 절에서 눈에 띄는 것은 평가 자체를 의심하는 자료들이다. AgentLens는 OpenHands trajectory 2,614건을 분석해 통과 사례의 최대 23.2%가 검증 없이 얻어걸린 통과였고, 과정 품질로 채점하면 모델 순위가 최대 5계단 이동한다고 보고한다. trajectory는 세션 하나의 실행 기록 전체를 뜻한다. Harness-Bench는 trajectory 5,194건을 근거로 에이전트 능력을 모델 단독이 아니라 모델과 harness의 조합 수준에서 보고해야 한다고 주장한다.

Anthropic의 인프라 노이즈 연구는 더 직접적이다. 컨테이너 자원 설정만 바꿔도 벤치마크 점수가 6%p 이상 흔들리며, 이 폭은 모델 사이의 격차를 넘는 경우가 있다. 지정 자원의 3배까지는 점수가 안정적이지만 그 위로는 에이전트가 전략 자체를 바꾼다. 자원 제한이 빡빡할 때와 넉넉할 때 측정하는 대상이 근본적으로 달라진다는 뜻이다.

### 운영 인프라

Production Infrastructure & Operations 16개 항목은 harness를 실제로 운영할 때 나오는 문제를 다룬다. Anthropic의 Claude Managed Agents 문서는 오케스트레이션 루프를 제공자 인프라에 두고 도구 실행만 고객 통제 샌드박스로 옮기는 배포 형태를 제시한다. AWS Agent Registry는 에이전트와 도구, 스킬, MCP 서버를 승인 절차와 감사 기록이 붙은 카탈로그로 관리한다.

비용도 이 절의 주제다. FinOps for Agents는 인프라 게이트웨이에서 강제하는 예산 통제 다섯 가지를 정의한다. 루프와 단계 상한, tool call 상한, 실행당 토큰 예산, 벽시계 시간 제한, 테넌트별 예산과 이상 알림이다. 비용 측정 단위를 소비 토큰이 아니라 수용된 결과 하나당 비용으로 옮기자는 제안도 함께 담긴다.

LangChain의 State of Agent Engineering 2026은 전문가 1,300명 이상을 대상으로 한 설문 결과를 담는다. 57.3%가 production에 에이전트를 두고 있고, 품질이 32%로 가장 큰 장벽이며, 89%가 관측 체계를 갖춘 반면 평가를 실제로 돌리는 곳은 52%에 그친다.

### 템플릿

Templates 절은 링크 대신 레포 안의 파일 4개를 제공한다. 목록 가운데 유일하게 곧바로 복사해 쓸 수 있는 산출물이다.

| 템플릿 | 용도 |
|---|---|
| `templates/AGENTS.md` | 프로젝트 단위 에이전트 지시문, 규약, 제약, 도구 권한 |
| `templates/PLAN.md` | 마일스톤과 verification 게이트를 담은 계획 산출물 |
| `templates/IMPLEMENT.md` | 구현 로그, 결정과 이탈 사항, 미해결 질문 |
| `templates/HARNESS_CHECKLIST.md` | harness를 production에 넘기기 전 검토 체크리스트 |

이 네 파일은 Foundations 절이 수록한 OpenAI의 장기 태스크 가이드와 같은 계보에 있다. 그 글이 Plan.md와 Implement.md, Documentation.md를 재사용 가능한 harness 산출물로 제안했고, Templates 절은 같은 성격의 파일을 레포 안에 직접 둔 형태다.

### 인접 목록

목록은 범위가 겹치는 다른 목록을 한 자리에 몰지 않고 세 곳에 나눠 배치한다. Related Awesome Lists 7개는 컨텍스트와 Claude Code, MCP 서버, 에이전트 프레임워크처럼 인접 주제를 다루는 목록이고, Adjacent Collections 6개는 harness를 정면으로 다루는 목록이며, 학술 서베이 계보는 Foundations에 들어간다.

| 목록 | 수록 위치 | 성격과 이 목록과의 관계 |
|---|---|---|
| RUCAIBox/awesome-agent-harness | Foundations | 서베이 논문과 함께 제공되는 학술 독서 목록, 참고문헌 500건 이상. 벤더 중심 글에 대한 학술 보완재로 소개된다 |
| Picrew/awesome-agent-harness | Adjacent Collections | 항목 150개 가운데 84%가 GitHub 프로젝트, 9개 분류. 구현 중심이라 글 중심인 이 목록과 상호 보완 |
| jiji262/awesome-harness-engineering | Adjacent Collections | 플랫폼 전달 거버넌스와 내부 개발자 플랫폼, GitOps 중심. 이름이 같으나 Harness라는 회사 쪽에 가깝다 |
| AutoJunjie/awesome-agent-harness | Tutorials & Educational | 전체 수명주기 플랫폼, 태스크 러너, 에이전트 런타임, 코딩 에이전트로 분류. 범위가 가장 가까운 목록 |
| Awesome Code as Agent Harness Papers | Related Awesome Lists | Code as Agent Harness 서베이의 동반 목록. 코드를 실행 가능한 scaffold로 보는 연구 지도 |

## harness가 성능을 좌우한다는 근거

목록이 "성능 레버는 모델 교체가 아니라 harness 설계에 있다"는 주장을 뒷받침하려고 모은 수치는 다음과 같다.

| 사례 | 변화 | 조건 |
|---|---|---|
| LangChain Deep Agents | Terminal Bench 2.0 rank 30에서 top 5 | 모델 교체 없이 verification 루프, 컨텍스트 주입, loop-detection 미들웨어만 변경 |
| statewright | 로컬 모델 SWE-bench 서브셋 2/10에서 10/10 | 상태 기계로 단계별 도구 공간 축소 |
| Azure SRE Agent | Intent Met 45%에서 75%, 완화까지 걸린 시간 40.5시간에서 3분 | 도구 100여 개를 파일시스템 기반 context engineering으로 대체 |
| deepset | 랭킹 20계단 이상 상승 | 모델 교체 없이 harness만 변경 |
| Claude compaction | 100턴 web search 평가에서 토큰 84% 절감 | 서버 측 자동 요약 |
| Code Execution with MCP | 실험에서 최대 98.7% 토큰 절감 | tool call 대신 코드로 MCP 서버와 상호작용 |
| Token Savior | 활성 토큰 77% 절감, 벤치마크 실행 시간 76% 단축 | 심볼 색인으로 파일 전체 대신 포인터 탐색 |
| AdaptOrch | 모델 선택만으로 얻는 성능 대비 12~23% 향상 | 태스크 의존 그래프로 오케스트레이션 토폴로지 선택 |
| StaminaBench | 통과 횟수 최대 12배 차이 | 테스트 피드백과 재시도 능력 유무. 같은 모델도 최선과 최악 harness 사이에 6배 격차 |
| Live-SWE-agent | SWE-bench Verified 77.4% | 실패 신호를 받아 harness가 스스로 진화 |
| AutoHarness | Gemini-2.5-Flash가 Gemini-2.5-Pro와 GPT-5.2-High를 상회 | TextArena에서 합성된 코드 가드로 반칙 수 제거 |

수치를 나란히 놓으면 두 가지가 드러난다. 첫째, harness만 바꿔 얻는 개선폭이 모델 세대 차이에 맞먹거나 그를 넘는 사례가 반복해서 나온다. statewright의 2/10에서 10/10, Deep Agents의 30위에서 5위 안쪽이 그렇다. 둘째, 개선의 성격이 두 가지로 나뉜다. 컨텍스트 관련 항목은 토큰 절감으로, 루프와 도구 관련 항목은 성공률 상승으로 나타난다.

production 사례도 같은 방향을 가리킨다. Meta의 Ranking Engineer Agent는 6시간짜리 태스크가 중간에 끊겨도 상태를 저장했다 재개하는 방식으로 여러 날에 걸친 파이프라인의 일관성을 유지한다. Microsoft의 Azure SRE Agent는 인시던트 35,000건 이상을 자율 처리했다. Meta와 Harvard의 Confucius Code Agent는 SWE-Bench-Pro에서 Resolve@1 59%를 기록했다. Stripe의 Minions는 주당 1,300건 이상의 PR을 내며, 결정적 코드 노드와 에이전트 하위 태스크를 번갈아 배치하는 청사진 방식과 500개 도구를 담은 중앙 MCP 서버로 운영된다.

## 수록 기준과 기여 규약

목록은 자신을 "디렉토리가 아니라 견해가 담긴 목록"으로 규정하고, 그 기준을 Contributing 절에 명시한다.

| 구분 | 내용 |
|---|---|
| 수록 대상 | harness engineering의 구체적 문제를 다루는 자료. 컨텍스트, 도구, planning, 권한, 메모리, verification, 샌드박싱 |
| 필수 요건 | 항목마다 왜 포함할 가치가 있는지 한두 문장 설명 |
| 배제 대상 | 일반 AI/ML 논문, harness와 무관한 모델 벤치마크, 특정 모델 사용법 튜토리얼, 제품 홍보 |
| 라이선스 | CC0, public domain dedication |

이 기준 덕분에 각 항목의 주석이 단순 소개를 넘어 판단을 담는다. 예를 들어 Skill Issue 항목의 주석은 대부분의 에이전트 실패가 모델 한계가 아니라 설정 문제라는 원문의 핵심 주장을 그대로 옮기고, MCP 서버를 너무 많이 붙이면 컨텍스트가 부풀어 오른다는 실무 지침까지 함께 적는다.

## 한계

awesome-list 특성상 각 항목에는 한두 문장의 주석만 붙는다. 실제 이해는 링크된 원본을 읽어야 하며, 이 wiki의 개별 페이지가 그 심화 역할을 맡는다.

링크가 전부 외부 URL이라 링크 부패 위험이 있다. 이 wiki는 웹 검색 금지 원칙에 따라 자동 수집을 하지 않으므로, 개별 자료를 파고들려면 사용자가 원본을 `raw/`로 옮겨야 한다.

2026년 상반기까지의 스냅샷이다. 수록 항목 다수가 2026년 2월에서 6월 사이 발표물이라 갱신 주기가 짧다. Contents 목록이 본문의 한 절을 반영하지 못한 것도 빠른 증분 갱신의 부작용으로 보인다.

수록 기준은 문서화되어 있으나 판정은 주관적이다. 항목 주석에 담긴 "가장 데이터로 뒷받침된 사례", "가장 실행 가능한 단일 페이지 종합" 같은 평가는 목록 관리자의 판단이며, 독자가 원본을 읽고 다시 판단할 여지를 남긴다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| harness engineering | 에이전트를 감싸는 scaffolding, 곧 컨텍스트 전달과 도구 인터페이스, 계획 산출물, verification 루프, 메모리, 샌드박스를 설계하는 공학 분야 |
| design primitive | harness를 이루는 문제 단위 구성 요소. 이 목록은 12개로 나눈다 |
| meta-harness | harness 자체를 생성하거나 최적화하는 상위 도구 |
| hibernate-and-wake | 긴 태스크를 중간 상태로 저장했다가 재개하는 체크포인팅 방식. Meta REA가 6시간짜리 태스크에 쓴다 |
| lucky pass | 검증 없이 우연히 테스트를 통과한 사례. AgentLens가 정의하고 계량한 개념이다 |
| excessive agency | 과도한 권한 부여와 승인 절차 부재로 생기는 위험. OWASP LLM06:2025의 항목명 |

## 관련 페이지

이 목록은 wiki의 harness와 loop engineering 클러스터를 묶는 상위 색인 역할을 한다.

- [[agents/lee-hoyeon-2026-harness-engineering]]: 프롬프트에서 컨텍스트, harness로 이어지는 3단계 진화를 다룬 한국어 강의 자료
- [[agents/walkinglabs-learn-harness-engineering]]: 이 목록의 Tutorials 절이 추천하는 프로젝트 기반 강의 과정
- [[agents/lin-2026-harness-updating-is-not-harness-benefit]]: harness 갱신이 곧 이득인지를 통제 실험으로 분해
- [[agents/seans-ai-stories-2026-agent-harness-loop-engineering]]: harness와 loop engineering의 관계를 정리
- [[agents/he-2026-agent-lightning-v1-0-towards-harnessed]]: harness를 학습 대상으로 삼는 프레임워크
- [[agents/osmani-2026-loop-engineering]]: 루프 설계로 무게중심을 옮기는 관점
- [[agents/runkle-2026-the-art-of-loop-engineering]]: 루프 설계 실무 정리
- [[agents/kang-2026-no-longer-prompting-claude]]: 프롬프트에서 컨텍스트, harness, 루프로 이어지는 흐름 정리
- [[agents/google-2026-the-new-sdlc-with-vibe]]: 에이전트를 모델과 harness의 합으로 보는 관점
- [[agents/anthropic-2025-effective-context-engineering-for-ai]]: 이 목록 Context 절의 정본 문헌
