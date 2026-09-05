---
title: "How OpenAI Built Its Data Agent"
type: article
year: 2026
category: agents
raw_path: raw/articles/bytebytego-2026-how-openai-built-its-data.md
raw_filename: "bytebytego-2026-how-openai-built-its-data.md"
source: bytebytego-2026-how-openai-built-its-data.md
source_collection: external
author: "ByteByteGo Newsletter (interview with Emma Tang, OpenAI)"
url: "https://blog.bytebytego.com/p/how-openai-built-its-data-agent"
publisher: "ByteByteGo Newsletter"
publication_date: "2026-06-03"
tags: [openai, data-agent, agentic-systems, llm-agents, sql-agent, context-engineering, context-assembly, codex, mcp, gpt-5-5, harness, tool-curation, retrieval, embedding, knowledge-platform, cross-cloud-migration, internal-platform]
---

# How OpenAI Built Its Data Agent

OpenAI 데이터 플랫폼 엔지니어링 책임자 **Emma Tang** 인터뷰 기반의 production agent case study. 1.5 exabyte · 9만 테이블 · 약 4,000 내부 사용자 규모에서 OpenAI는 *"pretty vanilla"* 구조의 사내 data agent를 돌리고 있고, 그 단순함을 받치는 건 agent 자체보다 그 밑의 데이터 인프라 기반이라는 게 이 글의 골자다. 같이 다루는 Codex 사내 use case 3건 — 2개월에 끝낸 cross-cloud migration, OSS 패치 무인 릴리스, support 자동 분류 — 역시 같은 *"foundation + simple agent + Codex"* 패턴 위에 서 있다.

## 요약 (Summary)

- **Production 규모**: 1.5 exabyte · 90,000 datasets · ~4,000 internal users (2026-05 기준).
- **아키텍처**: GPT-5.5 단일 LLM + 13개 큐레이션 도구 + 6-layer context assembly + 단순 agentic loop. **router·fine-tuning·post-training 없음.**
- **핵심 thesis**: *"the data foundation matters more than the agent"*. unified data lake · 단일 monorepo · 강한 annotation이 vanilla agent의 신뢰성을 뒷받침한다.
- **Six Layers of Context**: table usage metadata · human annotations · Codex enrichment · institutional knowledge · memory · runtime context. 앞 3개는 daily offline pipeline에서 테이블당 vector 1개로 머지·임베드, 뒤 3개는 별도 service·memory·live warehouse로 분리.
- **5대 교훈**: foundation > agent / fewer tools beat more (40 → 13) / 신뢰 가능한 query만 retrieval / prescriptive prompt 금지·goal만 지시 / be more ambitious.
- **로드맵**: per-question custom React app 생성, AI-amplified user code를 검증할 platform-side agent.

## 아키텍처 (Architecture)

### 4-Component (vanilla by design)

| Component | 구현 |
|---|---|
| **LLM** | GPT-5.5 단일 모델 — 모든 request 동일 |
| **Runtime** | agentic loop orchestrator — parse → dispatch → feed back → repeat |
| **Context Assembly** | 6-layer ("real engineering work lives here") |
| **Tools** | 13개 — company context · 내부 knowledge base · Airflow/Spark · metadata service |

> *"There is no router, no fine-tuning, and no special post-training. Every question goes to the same model."*

### Six Layers of Context

| Layer | 내용 | 처리 |
|---|---|---|
| **Table usage metadata** | schema · lineage · query history | 인기 dashboard 쿼리 가중치 ↑, one-off ↓ |
| **Human annotations** | owner의 business meaning · criticality · caveat | 스키마·쿼리만으론 알 수 없는 도메인 지식 |
| **Codex enrichment** | nightly Codex job이 pipeline code 분석 | batch 100~200 테이블, 테이블당 5~10분 |
| **Institutional knowledge** | Slack · Google Docs · Notion | 별도 embedding + access-controlled retrieval |
| **Memory** | 이전 대화의 correction · learning | global·personal scope |
| **Runtime context** | live warehouse 직접 쿼리, Airflow/Spark 통신 | offline이 stale·missing일 때 fallback |

앞 3개 layer를 매일 한 번 머지해 **테이블당 description 1개**로 만들고, embedding model이 description마다 **vector 1개**를 생성·저장한다. 런타임에서는 질문 vector와의 유사도로 description을 검색해 context에 넣는다.

### Request Flow (3 steps)

```
Q (plain English)
  │
  ▼ Step 1: 같은 embedding model로 question vector화
  ▼ Step 2: vector store에서 table description retrieval
              + semantic + exact text matching
              + institutional knowledge (access-controlled)
              + relevant memory
  ▼ Step 3: agent loop
              LLM → SQL → tool 실행 → 관찰 → 재시도 → verified answer
```

## 5대 교훈 (Lessons for Other Teams)

| 교훈 | 한 줄 |
|---|---|
| **The data foundation matters more than the agent** | coding agent의 source of truth는 repo, data agent의 source of truth는 회사 전체. legible하지 않으면 어떤 agent 구조로도 못 구한다. |
| **Fewer tools beat more tools** | 40 → 13으로 줄였더니 성능 회복. *"the model is better at reasoning than at choosing between near-duplicate tools."* |
| **Pick trusted queries for retrieval** | 모든 historical query를 임베드하면 망함. dashboard 쿼리는 ↑, one-off 쿼리는 ↓로 ranking. |
| **Guide the goal, not the path** | prescriptive prompt는 답을 망친다. high-level guidance + 좋은 context · 도구 → 추론은 모델에 맡긴다. |
| **Be more ambitious** | Codex 이전의 타임라인 추정은 더 이상 유효하지 않다. 1년 걸리던 일을 분기 단위로 다시 묻는다. |

## Codex 사내 use case 3건

| Use case | 규모·결과 |
|---|---|
| **Cross-cloud migration** | DAG 10,000개 + 테이블 90,000개 + 600 PB를 ~2개월에. 의존 그래프 ordering과 dual-cloud 동시 운영이 진짜 난제. Codex가 PR 생성, Codex Skills가 테스트·검증, 자체 시스템이 순서·정합성을 가드. |
| **OSS 패치 무인 릴리스** | Spark·Kafka·Flink 등 12+ fork에 release agent 배치. 패치 검증·실패 진단·롤아웃을 자동화. 3-4개월 무인 운영, 인시던트 0건. |
| **Support loop closure** | 5,500 사용자의 티켓에 support bot이 1차 응답, 미해결분은 on-call이 Codex에 minimal context로 위임. 엔지니어 한 명이 *"a hundred fixes per day"* dispatch. |

## 다음 과제 (What Comes Next)

- **Per-question custom apps**: 고정 widget 대신 Codex가 질문마다 full React app을 생성, backing store와 묶어 실데이터·guardrail 위에서 돌린다.
- **Platform-side agents**: *"vibe-coded"* 한 Flink job처럼 사용자가 의미를 모른 채 ship한 코드를 플랫폼이 받기 전에 triage·validate.

> *"The previous wave of agents helped users do more. The next wave will help platforms keep up."*

## 관련 페이지 (Related Pages)

- [[agents/lee-hoyeon-2026-harness-engineering]] — Prompt → Context → Harness 3단계 진화. 본 글이 정의한 *"LLM + harness"* 구조를 한국어 강의로 풀어낸 자료.
- [[agents/lin-2026-harness-updating-is-not-harness-benefit]] — base capability와 harness benefit 분리. OpenAI가 *"vanilla agent + strong harness/context"* 로 후자에 투자한 사례와 직결.
- [[agents/dennis-2026-compiling-agentic-workflows-into-llm]] — surface orchestration을 가중치로 컴파일하는 정반대 방향. OpenAI는 *"orchestration 자체를 무겁게 안 만든다"* 는 입장.
- [[agents/patel-2026-beyond-the-prompt-claude-code]] — *"setup is the work"*. 본 글의 *"foundation matters more than the agent"* 와 같은 정신을 코딩 에이전트 운영 매뉴얼로.
- [[agents/osmani-2026-loop-engineering]] — agentic loop을 *"designing loops that prompt agents"* 라는 일반 패턴으로 추상화.
- [[agents/zhang-2026-recursive-language-models]] — long-context를 root LLM이 코드로 탐색하는 정반대 전략. 본 글의 *"6-layer를 single embedding으로 압축"* 과 대비.
- [[applications/liu-2026-rag-llm-wiki-or-gbrain]] — retrieve · compile · act 프레임. 본 글의 6-layer context는 *"compile"* 단계의 산업 사례.
