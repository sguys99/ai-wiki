---
title: "Awesome Harness Engineering"
type: repo
year: 2026
category: agents
raw_path: raw/repos/ai-boost-awesome-harness-engineering.md
raw_filename: "ai-boost-awesome-harness-engineering.md"
source_collection: external
org: "ai-boost"
repo: "awesome-harness-engineering"
url: "https://github.com/ai-boost/awesome-harness-engineering"
license: "CC0-1.0"
tags: [harness-engineering, agent-harness, awesome-list, agent-loop, context-engineering, tool-design, mcp, skills, memory, orchestration, evals, observability, hitl, sandbox]
---

## 한 줄 요약 (One-line Summary)

AI 에이전트를 감싸는 harness를 모델과 분리된 독립 공학 분야로 규정하고, 관련 자료 385개를 벤더가 아니라 문제 단위로 분류한 awesome-list다. 최상위 본문 8개 절 가운데 Design Primitives가 12개 하위 절 218개 항목으로 가장 크며, 라이선스는 CC0-1.0이다.

## 1. 자료 정보 (Document Information)

- 레포: `ai-boost/awesome-harness-engineering` (GitHub awesome-list, awesome.re 배지 보유)
- 라이선스: CC0-1.0, public domain dedication
- 부제: "Curated resources, patterns, and templates for building reliable AI agent harnesses"
- 규모: 본문 8개 절에 링크 항목 385개, 여기에 Templates 절의 표 4행이 더해진다
- 분류 관점: README가 "Harness components organized by the problem they solve, not by vendor"라고 명시한다
- 다국어: zdoc.app을 통해 독일어, 영어, 스페인어, 프랑스어, 일본어, 한국어, 포르투갈어, 러시아어, 중국어 9개 번역본을 연결한다
- 커뮤니티: 감사의 글에서 harness engineering 아이디어가 논의되고 다듬어진 자리로 linux.do 테크 커뮤니티를 든다

정의는 README 첫 문단이 직접 내린다. harness engineering은 컨텍스트 전달, 도구 인터페이스, 계획 산출물, verification 루프, 메모리 시스템, 샌드박스를 설계하는 분야이며, 이 scaffolding이 에이전트가 실제 과제에서 성공하는지 실패하는지를 결정한다는 것이다.

목차와 본문 사이에 불일치가 하나 있다. 상단 Contents 목록에는 Production Infrastructure & Operations 절이 빠져 있으나, 본문에는 16개 항목을 가진 절로 실재한다.

## 2. 주요 기여 (Key Contributions)

1. **harness와 model의 분리 프레이밍**: "여기 있는 모든 컴포넌트는 모델이 혼자 못 하기에 존재하며, 최고의 harness는 그 컴포넌트가 모델 발전으로 불필요해질 것을 알고 설계된다"는 명제를 목록 전체의 전제로 삼는다.
2. **problem-first 분류법**: OpenAI, Anthropic, Google 문서를 벤더별로 묶는 대신 Agent Loop, Planning, Context, Tool Design처럼 harness가 푸는 문제 단위로 재조직했다. 나중에 다시 찾기 좋은 method 기준 분류다.
3. **정의 문헌 집적**: OpenAI(Harness Engineering, Unrolling the Codex Agent Loop), Anthropic(Building Effective Agents, Harness Design for Long-Running Application Development), Martin Fowler와 Birgitta Böckeler, LangChain(The Anatomy of an Agent Harness), Red Hat, deepset 등 분야를 정의한 문헌 28편을 Foundations 한 절에 모았다.
4. **학술 정의 흡수**: harness의 필요충분조건을 규정한 arXiv 2606.10106, 공개 에이전트 시스템 70개를 실증 분석한 "Architectural Design Decisions in AI Agent Harnesses", 코드를 harness 기반으로 보는 서베이 "Code as Agent Harness" 등 2026년 학술 문헌을 실무 자료와 나란히 배치한다.
5. **production case study 수집**: Meta REA(6시간 태스크 hibernate-and-wake 체크포인팅), Azure SRE Agent(35,000건 이상 인시던트 자율 처리), Confucius Code Agent(SWE-Bench-Pro Resolve@1 59%), Stripe Minions(주당 1,300건 이상 PR) 같은 실전 사례를 수록한다.
6. **재사용 산출물 제공**: 링크만 모으지 않고 `templates/` 아래 harness 산출물 4종을 직접 배포한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

목록은 본문 8개 절로 구성되며, 규모는 다음과 같다.

| 절 | 항목 수 | 성격 |
|---|---|---|
| Foundations | 28 | 분야를 정의하는 에세이와 논문 |
| Design Primitives | 218 | 12개 하위 절, harness 구성 요소를 문제별로 분류 |
| Reference Implementations | 64 | 4개 하위 절, 읽을 가치의 근거를 주석으로 단 실제 레포 |
| Security, Sandbox & Permissions | 33 | 격리, prompt injection 방어, 인가 |
| Evals & Verification | 19 | 벤치마크와 평가 harness |
| Templates | 표 4행 | 복사해 쓰는 harness 산출물 |
| Production Infrastructure & Operations | 16 | 배포, 비용, 거버넌스, 관측 |
| Related Awesome Lists | 7 | 인접 범위 목록 |

Design Primitives 12개 하위 절의 규모와 대표 항목은 다음과 같다.

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

Reference Implementations는 "각 항목에 왜 시간을 쓸 가치가 있는지 주석을 단다"는 원칙 아래 4개 하위 절로 나뉜다. Tutorials & Educational 14개(Learn Harness Engineering, smolagents, mini-coding-agent, learn-claude-code), Generators & Meta-Harnesses 16개(harness-evolver, auto-harness, Meta-Harness, AutoAgent), Demo Harnesses 28개(OpenHands, Goose, SWE-agent, Aider, deepagents, OpenCode), Adjacent Collections 6개(다른 harness 목록과의 대조표)다.

Templates 절은 링크가 아니라 레포 안의 파일 4개를 표로 제시한다.

| 템플릿 | 용도 |
|---|---|
| `templates/AGENTS.md` | 프로젝트 단위 에이전트 지시문, 규약, 제약, 도구 권한 |
| `templates/PLAN.md` | 마일스톤과 verification 게이트를 담은 계획 산출물 |
| `templates/IMPLEMENT.md` | 구현 로그, 결정과 이탈 사항, 미해결 질문 |
| `templates/HARNESS_CHECKLIST.md` | harness를 production에 넘기기 전 검토 체크리스트 |

Foundations가 모은 정의는 하나로 수렴하지 않고 서로 보완한다. arXiv 2606.10106은 harness를 agent loop, 도구 인터페이스, 컨텍스트 관리, 제어 메커니즘 네 요소를 갖춘 런타임 층으로 규정하고, 이 기준으로 Claude Code, Codex CLI, Aider, Cline, OpenHands, SWE-agent를 판정한다. LangChain의 The Anatomy of an Agent Harness는 파일시스템, 코드 실행, 샌드박스, 메모리, 컨텍스트 관리 다섯 가지를 구성 요소로 든다. Martin Fowler는 context engineering, 아키텍처 제약, 엔트로피 관리 세 체계가 맞물린다고 본다. Birgitta Böckeler는 harness를 feedforward 안내와 feedback 센서의 결합으로 보고, 계산 기반 통제(linter, 테스트)와 추론 기반 통제(LLM-as-judge)를 구분한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

목록이 "harness가 성능을 좌우한다"는 근거로 인용하는 수치는 다음과 같다.

| 사례 | 변화 | 조건 |
|---|---|---|
| LangChain Deep Agents | Terminal Bench 2.0 rank 30에서 top 5 | 모델 교체 없이 verification 루프, 컨텍스트 주입, loop-detection middleware만 변경 |
| statewright | 로컬 모델 SWE-bench 서브셋 2/10에서 10/10 | 상태 기계로 단계별 도구 공간 축소 |
| Azure SRE Agent | Intent Met 45%에서 75%, TTM 40.5시간에서 3분 | 도구 100여 개를 파일시스템 기반 context engineering으로 대체 |
| deepset | 랭킹 20계단 이상 상승 | 모델 교체 없이 harness만 변경 |
| Claude compaction | 100턴 web search eval에서 토큰 84% 절감 | 서버 측 자동 요약 |
| Code Execution with MCP | 실험에서 최대 98.7% 토큰 절감 | tool call 대신 코드로 MCP 서버와 상호작용 |
| Token Savior | 활성 토큰 77% 절감, 벤치마크 실행 시간 76% 단축 | 심볼 인덱스로 파일 전체 대신 포인터 탐색 |
| AdaptOrch | 모델 선택만으로 얻는 성능 대비 12~23% 향상 | 태스크 의존 그래프로 오케스트레이션 토폴로지 선택 |
| StaminaBench | 통과 횟수 최대 12배 차이 | 테스트 피드백과 재시도 능력 유무. 같은 모델도 최선과 최악 harness 사이에 6배 격차 |
| Anthropic 인프라 노이즈 연구 | 컨테이너 자원 설정만으로 벤치마크 6%p 이상 변동 | 지정 자원의 3배를 넘으면 에이전트가 전략 자체를 바꾼다 |
| Live-SWE-agent | SWE-bench Verified 77.4% | 실패 신호로 harness가 스스로 진화 |
| AutoHarness | Gemini-2.5-Flash가 Gemini-2.5-Pro와 GPT-5.2-High를 상회 | TextArena에서 합성된 코드 가드로 반칙 수 제거 |

평가 자체를 되짚는 자료도 함께 있다. AgentLens는 OpenHands trajectory 2,614건을 분석해 통과 사례의 최대 23.2%가 검증 없이 얻어걸린 통과였고, 과정 품질로 채점하면 모델 순위가 최대 5계단 이동한다고 보고한다. Harness-Bench는 trajectory 5,194건을 근거로 에이전트 능력을 모델 단독이 아니라 모델과 harness의 조합 수준에서 보고해야 한다고 주장한다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

awesome-list 특성상 각 항목에는 한두 문장의 주석만 붙는다. 실제 이해는 링크된 원본을 읽어야 하며, 이 wiki의 개별 페이지가 그 심화 역할을 맡는다.

링크가 전부 외부 URL이라 링크 부패 위험이 있다. 이 wiki는 rule #1에 따라 자동 fetch하지 않으므로, 개별 자료를 파고들려면 사용자가 원본을 `raw/`로 수집해야 한다.

2026년 상반기까지의 스냅샷이다. 수록 항목 다수가 2026년 2월에서 6월 사이 발표물이라 갱신 주기가 짧다. Contents 목록이 본문의 한 절을 반영하지 못한 것도 빠른 증분 갱신의 부작용으로 보인다.

수록 기준은 문서화되어 있으나 판정은 주관적이다. Contributing 절은 harness engineering의 구체적 문제(컨텍스트, 도구, 계획, 권한, 메모리, verification, 샌드박싱)를 다루는 자료만 받고 각 항목에 왜 포함할 가치가 있는지 한두 문장을 요구하며, 일반 AI/ML 논문과 모델 벤치마크, 특정 모델 사용법 튜토리얼, 제품 홍보는 배제한다고 밝힌다. 스스로 "디렉토리가 아니라 견해가 담긴 목록"이라고 규정한다.

## 6. 관련 연구 (Related Work)

이 wiki의 harness와 loop engineering 클러스터 전반과 맞물린다: [[agents/lee-hoyeon-2026-harness-engineering]], [[agents/walkinglabs-learn-harness-engineering]], [[agents/osmani-2026-loop-engineering]], [[agents/runkle-2026-the-art-of-loop-engineering]], [[agents/kang-2026-no-longer-prompting-claude]], [[agents/google-2026-the-new-sdlc-with-vibe]], [[agents/anthropic-2025-effective-context-engineering-for-ai]], [[agents/seans-ai-stories-2026-agent-harness-loop-engineering]], [[agents/lin-2026-harness-updating-is-not-harness-benefit]], [[agents/he-2026-agent-lightning-v1-0-towards-harnessed]].

목록은 자신과 범위가 겹치는 다른 목록을 세 자리에 나눠 배치한다. Foundations의 RUCAIBox/awesome-agent-harness는 참고문헌 500건 이상을 갖춘 학술 서베이 계보로, 벤더 중심 harness 글의 학술 보완재로 소개된다. Adjacent Collections의 Picrew/awesome-agent-harness는 항목 150개 가운데 84%가 GitHub 프로젝트인 구현 중심 목록으로, 글 중심인 이 목록과 상호 보완 관계로 규정된다. Related Awesome Lists에는 컨텍스트와 MCP, 에이전트 프레임워크처럼 범위가 인접한 목록 7개가 들어간다.

## 7. 용어집 (Glossary)

- **harness engineering**: 에이전트를 감싸는 scaffolding, 곧 컨텍스트 전달과 도구 인터페이스, 계획 산출물, verification 루프, 메모리, 샌드박스를 설계하는 공학 분야.
- **design primitive**: harness를 이루는 문제 단위 구성 요소. 이 목록은 12개로 나눈다.
- **meta-harness**: harness 자체를 생성하거나 최적화하는 상위 도구. 이 목록의 Generators & Meta-Harnesses 절이 다룬다.
- **hibernate-and-wake**: 긴 태스크를 중간 상태로 저장했다가 재개하는 체크포인팅 방식. Meta REA가 6시간짜리 태스크에 쓴다.
- **lucky pass**: 검증 없이 우연히 테스트를 통과한 사례. AgentLens가 정의하고 계량한 개념이다.
- **reasoning sandwich**: 계획 단계와 verification 단계에 사고량을 몰아주는 배치. LangChain Deep Agents 사례의 구성 요소다.
