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

AI 에이전트를 둘러싼 **harness**(컨텍스트 전달·도구 인터페이스·계획 산출물·검증 루프·메모리·샌드박스)를 모델과 분리된 독립 공학 분야로 규정한다. 이를 12개 design primitive와 reference implementation·security·evals·templates로 나눠 393개 자료를 큐레이션한 awesome-list다. CC0 라이선스.

## 1. 자료 정보 (Document Information)

- **레포**: `ai-boost/awesome-harness-engineering` (GitHub awesome-list, CC0-1.0)
- **핵심 주제**: harness engineering — "모델이 아니라 모델을 감싸는 scaffolding을 설계하는 규율"
- **규모**: 393개 링크 항목, 최상위 8개 섹션에 Design Primitives 하위 12개 서브섹션
- **관점**: 벤더별이 아니라 **문제(primitive)별**로 자료를 분류 (Agent Loop, Planning, Context, Tool Design 등)
- **다국어**: README를 9개 언어로 번역 제공 (zdoc.app)
- **커뮤니티**: 상당수 아이디어가 linux.do 테크 커뮤니티 논의에서 나왔다

## 2. 주요 기여 (Key Contributions)

1. **harness ≠ model 프레이밍**: "여기 있는 모든 컴포넌트는 모델이 혼자 못 하는 것이기에 존재하며, 최고의 harness는 그 컴포넌트가 모델 발전으로 불필요해질 것을 알고 설계된다"는 명제를 리스트 전체의 축으로 삼는다.
2. **problem-first 분류법**: 자료를 벤더(OpenAI/Anthropic/Google)가 아니라 harness가 해결하는 문제 단위로 재조직했다. 미래의 검색성을 위한 method 기준 분류다.
3. **정본 에세이 집적**: OpenAI(Harness Engineering, Codex Agent Loop), Anthropic(Building Effective Agents, Effective Context Engineering, Effective Harnesses for Long-Running Agents), Martin Fowler·Birgitta Böckeler, LangChain(Anatomy of an Agent Harness) 등 분야 정의 문헌을 한자리에 모았다.
4. **학술 정의 흡수**: "necessary and sufficient conditions for an agent harness"(arXiv 2606.10106), "Architectural Design Decisions in AI Agent Harnesses"(70개 시스템 실증), scheduler-theoretic framework 등 2026년 harness 정의·분류 논문을 담았다.
5. **production case study**: Meta REA(6시간 태스크 hibernate-and-wake), Azure SRE Agent(35,000+ 인시던트, TTM 40.5h→3min), Confucius Code Agent(SWE-Bench-Pro 59%) 같은 실전 harness 사례를 소개한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

리스트의 골격은 다음과 같다.

- **Foundations** — harness engineering이 무엇이고 왜 중요한지 정의하는 정본 에세이 (OpenAI·Anthropic·Google ADK·Martin Fowler·LangChain·Red Hat·deepset + 정의/분류 논문).
- **Design Primitives** (12개 서브섹션, 벤더 아닌 문제 기준):
  - *Agent Loop* — ReAct(Thought/Action/Observation), Codex loop, LangGraph 그래프 모델, middleware 6-hook, statewright 상태머신 가드레일, dynamic workflows.
  - *Planning & Task Decomposition* — Plan.md/Implement.md 산출물, plan-and-execute, LATS(MCTS), 멀티에이전트 토폴로지 선택(AdaptOrch·TDP).
  - *Context Delivery & Compaction* — Effective Context Engineering, server-side compaction(84% 토큰 절감), LLMLingua, prompt caching, autonomous/active context compression, 파일시스템 기반 컨텍스트(OpenViking·Trellis·Token Savior).
  - *Tool Design* — Writing Effective Tools, 도구 스키마·에러 surface = agent UX.
  - *Skills & MCP* — Model Context Protocol, skills 시스템.
  - *Permissions & Authorization* — Beyond Permission Prompts(prompt 신뢰 대신 구조적 인가).
  - *Memory & State* — in-context·external·procedural 메모리를 harness 관심사로.
  - *Task Runners & Orchestration* — 큐잉·병렬성·진행 보고.
  - *Verification & CI Integration* — 검증을 사후 eval이 아닌 루프 안으로.
  - *Observability & Tracing* — OpenLLMetry(OTEL 기반) 등.
  - *Debugging & DX* — AgentOps 등 세션 replay·비용 추적.
  - *Human-in-the-Loop* — AWS 4패턴(Hook·Tool Context·Step Functions·MCP Elicitation).
- **Reference Implementations** — Tutorials, Generators/Meta-Harnesses, Demo Harnesses, Adjacent Collections. "왜 볼 가치가 있는지" 주석 포함.
- **Security, Sandbox & Permissions** / **Evals & Verification** / **Templates**(복사해 쓰는 harness 산출물) / **Production Infrastructure & Operations**(Claude Managed Agents, self-hosted sandbox, MCP tunnels) / **Related Awesome Lists**.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

리스트가 인용한 대표적 "harness가 성능 레버"라는 증거들:

- **LangChain Deep Agents**: harness-only 변경으로 Terminal Bench 2.0 rank 30 → top 5 (모델 교체 없음).
- **statewright**: 도구 공간 축소만으로 로컬 모델이 SWE-bench 서브셋 2/10 → 10/10.
- **Azure SRE Agent**: 파일시스템 기반 context engineering으로 "Intent Met" 45% → 75%; TTM 40.5h → 3min.
- **deepset**: harness만 바꿔 랭킹 20+ 계단 상승.
- **Compaction(Claude)**: 100턴 web search eval에서 토큰 84% 절감.
- **AdaptOrch**: 토폴로지 선택이 모델 선택 대비 12–23% 향상.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- awesome-list 특성상 각 항목은 한두 줄 주석뿐이라, 실제 이해는 링크된 원본을 읽어야 한다(이 wiki의 여러 개별 페이지가 그 심화 역할을 한다).
- 링크가 외부 URL이라 링크 부패(link rot) 위험이 있다. 이 wiki는 rule #1에 따라 자동 fetch하지 않으므로, 개별 자료 심화는 사용자가 원본을 raw/로 수집해야 한다.
- 2026년 상반기까지의 스냅샷이다. harness 분야가 빠르게 변하는 만큼 지속 갱신이 필요하다.

## 6. 관련 연구 (Related Work)

이 wiki의 harness/loop engineering 클러스터 전반과 직접 맞물린다: [[agents/lee-hoyeon-2026-harness-engineering]], [[agents/osmani-2026-loop-engineering]], [[agents/runkle-2026-the-art-of-loop-engineering]], [[agents/kang-2026-no-longer-prompting-claude]], [[agents/google-2026-the-new-sdlc-with-vibe]], [[agents/anthropic-2025-effective-context-engineering-for-ai]], [[agents/seans-ai-stories-2026-agent-harness-loop-engineering]], [[agents/lin-2026-harness-updating-is-not-harness-benefit]]. 학술 서베이 계보로는 RUCAIBox/awesome-agent-harness와 대비되는 실무 인덱스다.

## 7. 용어집 (Glossary)

- **Harness Engineering**: 에이전트를 감싸는 scaffolding(컨텍스트·도구·계획·검증·메모리·샌드박스)을 설계하는 공학 분야. 모델 자체가 아니라 그 둘레를 다룬다.
- **Design Primitive**: harness를 구성하는 문제 단위 컴포넌트(Agent Loop, Planning, Context, Tool 등).
- **Agent Loop**: observe → plan → act → verify로 도는 에이전트의 기본 실행 사이클(ReAct 계보).
- **Compaction**: 컨텍스트 윈도 한계에 근접하면 과거 컨텍스트를 요약해 토큰을 줄이는 기법.
- **HITL (Human-in-the-Loop)**: 민감한 도구 호출에 사람 승인을 끼우는 패턴.
- **Meta-Harness / Generator**: harness 자체를 생성·구성하는 상위 도구.
