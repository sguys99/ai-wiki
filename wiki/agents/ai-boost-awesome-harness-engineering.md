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

## 요약 (Summary)

AI 에이전트를 둘러싼 **harness** — 컨텍스트 전달, 도구 인터페이스, 계획 산출물, 검증 루프, 메모리, 샌드박스 — 를 모델과 분리된 독립 공학 분야로 규정한 awesome-list다. 393개 자료를 벤더가 아니라 **문제(primitive) 단위**로 묶었다. 리스트를 관통하는 명제는 하나다. "여기 있는 모든 컴포넌트는 모델이 혼자 못 하기에 존재하며, 최고의 harness는 그것들이 모델 발전으로 언젠가 불필요해질 것을 알고 설계된다." (CC0-1.0)

## 주요 기여 (Key Contributions)

- **harness ≠ model 프레이밍**: 성능 레버가 모델 교체가 아니라 그 둘레의 scaffolding 설계에 있다는 관점을 리스트 전체의 축으로 삼는다.
- **problem-first 분류**: OpenAI·Anthropic·Google 문서를 벤더별로 묶는 대신 Agent Loop·Planning·Context·Tool Design처럼 해결하는 문제로 재조직했다. 나중에 다시 찾기 좋도록 method 기준으로 나눈 것이다.
- **정의·분류 논문 흡수**: "necessary and sufficient conditions for an agent harness"(arXiv 2606.10106), 70개 시스템을 실증한 "Architectural Design Decisions in AI Agent Harnesses" 등 2026년의 학술 정의를 실무 자료와 나란히 놓는다.
- **production case study**: Meta REA(6시간 태스크 hibernate-and-wake), Azure SRE Agent(35,000+ 인시던트, TTM 40.5h→3min), Confucius Code Agent(SWE-Bench-Pro 59%).

## 방법론 및 아키텍처 (Methodology and Architecture)

- **Foundations** — harness engineering을 정의하는 정본 에세이 (OpenAI·Anthropic·Google ADK·Martin Fowler·Birgitta Böckeler·LangChain·Red Hat·deepset + 정의/분류 논문).
- **Design Primitives** (12개 서브섹션, 문제 기준):
  - *Agent Loop* — ReAct(Thought/Action/Observation), Codex loop, LangGraph 그래프 모델, middleware 6-hook, statewright 상태머신 가드레일, dynamic workflows.
  - *Planning & Task Decomposition* — Plan.md/Implement.md 산출물, plan-and-execute, LATS(MCTS), 토폴로지 선택(AdaptOrch·TDP).
  - *Context Delivery & Compaction* — Effective Context Engineering, server-side compaction(84% 토큰 절감), LLMLingua, prompt caching, 파일시스템 기반 컨텍스트(OpenViking·Trellis·Token Savior).
  - *Tool Design* — 도구 스키마·에러 surface = agent UX.
  - *Skills & MCP* — Model Context Protocol, skills 시스템.
  - *Permissions & Authorization* — prompt 신뢰 대신 구조적 인가.
  - *Memory & State* / *Task Runners & Orchestration* / *Verification & CI* / *Observability & Tracing* / *Debugging & DX* / *Human-in-the-Loop*(AWS 4패턴).
- **Reference Implementations** / **Security·Sandbox** / **Evals & Verification** / **Templates** / **Production Infrastructure**(Claude Managed Agents, self-hosted sandbox, MCP tunnels) / **Related Awesome Lists**.

## 결과 (Results)

리스트가 "harness가 곧 성능 레버"라고 내세운 대표 증거는 이렇다.

- **LangChain Deep Agents** — harness만 바꿔 Terminal Bench 2.0 rank 30 → top 5 (모델 교체 없음).
- **statewright** — 도구 공간을 줄인 것만으로 로컬 모델이 SWE-bench 서브셋 2/10 → 10/10.
- **Azure SRE Agent** — 파일시스템 기반 context engineering으로 "Intent Met" 45% → 75%.
- **deepset** — harness만 바꿔 랭킹 20+ 계단 상승.
- **AdaptOrch** — 토폴로지 선택이 모델 선택보다 12–23% 향상.

## 관련 페이지 (Related Pages)

이 리스트는 wiki의 harness/loop engineering 클러스터를 묶는 상위 인덱스 역할을 한다.

- [[agents/lee-hoyeon-2026-harness-engineering]] — Prompt→Context→Harness 3단계 진화를 다룬 한국어 강의 자료
- [[agents/osmani-2026-loop-engineering]] · [[agents/runkle-2026-the-art-of-loop-engineering]] — 루프 설계로 무게중심을 옮기는 Loop Engineering
- [[agents/kang-2026-no-longer-prompting-claude]] — Prompt→Context→Harness→Loop 4단계 흐름 정리
- [[agents/google-2026-the-new-sdlc-with-vibe]] — Agent = Model + Harness 방정식
- [[agents/anthropic-2025-effective-context-engineering-for-ai]] — 이 리스트 Context 섹션의 정본 문헌
- [[agents/lin-2026-harness-updating-is-not-harness-benefit]] — harness 이득을 통제 실험으로 분해
