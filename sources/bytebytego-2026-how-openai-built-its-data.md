---
title: "How OpenAI Built Its Data Agent"
type: article
year: 2026
category: agents
raw_path: /Users/kmyu/Desktop/project/ai-wiki/raw/articles/bytebytego-2026-how-openai-built-its-data.md
raw_filename: "bytebytego-2026-how-openai-built-its-data.md"
source_collection: external
author: "ByteByteGo Newsletter (interview with Emma Tang, OpenAI)"
url: "https://blog.bytebytego.com/p/how-openai-built-its-data-agent"
publisher: "ByteByteGo Newsletter"
publication_date: "2026-06-03"
tags: [openai, data-agent, agentic-systems, llm-agents, sql-agent, context-engineering, context-assembly, codex, mcp, gpt-5-5, harness, tool-curation, retrieval, embedding, knowledge-platform, cross-cloud-migration, internal-platform]
---

## 한 줄 요약 (One-line Summary)

ByteByteGo Newsletter가 OpenAI 데이터 플랫폼 엔지니어링 책임자 **Emma Tang**과 인터뷰해 정리한 글. 1.5 exabyte · 9만 테이블 · 약 4,000 내부 사용자 규모에서 OpenAI가 운영 중인 **사내 data agent**는 *"pretty vanilla"* — GPT-5.5 단일 모델 + 13개 큐레이션 도구 + 6-layer context assembly + 단순 agentic loop. **router·fine-tuning·post-training 없음**. 핵심 메시지는 *"the data foundation matters more than the agent"*: 단일 monorepo·통합 lakehouse·강한 annotation이 있어야 vanilla agent가 exabyte 규모에서 신뢰성 있게 돌아간다. Codex의 사내 활용 3가지(2개월 만에 10,000 DAG·9만 테이블 cross-cloud migration, 12개+ OSS fork의 무인 패치 릴리스, support 티켓 자동 분류)도 함께 다룬다. 다른 팀이 가져갈 5대 교훈: foundation > agent, fewer tools beat more (40 → 13), 신뢰 가능한 query만 retrieval, prescriptive prompt 금지·goal만 지시, ambitious timeline. 다음 과제는 *"per-question custom React app"* 과 *"AI로 가속된 사용자 코드를 platform-side agent가 검증"* 두 가지.

## 1. 자료 정보 (Document Information)

- **저자/발행자**: ByteByteGo Newsletter (Substack)
- **인용된 인물**: Emma Tang — Head of Data Platform Engineering, OpenAI
- **URL**: <https://blog.bytebytego.com/p/how-openai-built-its-data-agent>
- **게시일**: 2026-06-03
- **분량**: 약 2,500단어 (긴 인터뷰 기반 long-form)
- **수집 방법**: `WebFetch` 두 번 호출 — 첫 호출은 요약만 반환되어 *"verbatim full text"* 를 강하게 요구한 두 번째 호출의 출력을 채택 (CLAUDE.md rule #1의 *"사용자가 명시적으로 자료 수집을 지시한 경우"* 예외).
- **figures**: 원문에 *"the figure below"*, *"The Figure above"* 두 곳의 다이어그램 참조가 있으나 rule #1로 자동 fetch ❌ → `figures:` 키 생략.
- **장르**: **production agent case study**. 새 벤치마크는 없고, OpenAI 내부 운영 사례 + 5대 교훈 + 향후 로드맵을 정리한 architectural deep-dive.

## 2. 주요 기여 (Key Contributions)

1. **OpenAI data agent의 architectural blueprint 공개** — 4-component 구조(LLM · Runtime · Context Assembly · Tools)를 1.5 exabyte 규모의 production system 사례와 함께 드러낸다.
2. **"Six Layers of Context" 명명** — table usage metadata · human annotations · Codex enrichment · institutional knowledge · memory · runtime context. 처음 3 layer는 daily offline pipeline에서 단일 description으로 머지되고 테이블당 vector 1개로 임베드, 나머지 3 layer는 access-controlled service·conversation memory·live warehouse로 분리.
3. **"Vanilla is the point" 디자인 원칙** — router·multi-model·fine-tuning을 모두 제거한 단순 LLM+harness 구조가 강한 foundation 위에서 exabyte 규모에 충분히 동작함을 사례로 입증.
4. **Tool curation의 정량 사례** — 40 → 13 tools로 축소했을 때 성능이 개선됐다는 구체적 수치. *"the model is better at reasoning than at choosing between near-duplicate tools."*
5. **Codex 사내 use case 3건** — cross-cloud migration 2개월 (DAG 10,000개 · 테이블 90,000개 · 600 PB), open-source patch release 3-4개월 무인 운영·인시던트 0건, support 티켓 dispatch (engineer당 일 ~100건).
6. **5대 교훈을 모듈화** — (i) data foundation > agent, (ii) fewer tools beat more, (iii) trusted queries만 retrieval로, (iv) guide the goal not the path, (v) be more ambitious.
7. **로드맵 공개** — per-question custom React app 생성 + AI-amplified user code를 검증하는 platform-side agents.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 4-Component Architecture (vanilla by design)

| Component | 구현 | 메모 |
|---|---|---|
| **LLM** | GPT-5.5 단일 모델 | 모든 request에 동일 모델. router·fine-tuning 없음 |
| **Runtime** | agentic loop orchestrator | parse → dispatch → feed back → repeat |
| **Context Assembly** | 6-layer (아래 참조) | *"real engineering work lives here"* |
| **Tools** | 13개 큐레이션 | company context, knowledge bases, Airflow/Spark, metadata services |

> *"There is no router, no fine-tuning, and no special post-training. Every question goes to the same model."*

### 3.2 Six Layers of Context

| Layer | 내용 | 처리 방식 |
|---|---|---|
| **Table usage metadata** | schema, lineage, query history | 인기 대시보드 쿼리에 가중치 ↑, one-off 쿼리는 ↓ |
| **Human annotations** | owner가 쓴 business meaning·criticality·caveat | 스키마·과거 쿼리만으로는 알 수 없는 도메인 지식 |
| **Codex enrichment** | nightly Codex job이 pipeline code 분석 | batch 100~200 테이블, 테이블당 5~10분 |
| **Institutional knowledge** | Slack·Google Docs·Notion | 별도 embedding + access-controlled retrieval |
| **Memory** | 이전 대화의 correction·learning | global·personal scope |
| **Runtime context** | live warehouse 직접 쿼리, Airflow/Spark 통신 | offline 정보가 stale·missing일 때 fallback |

**Offline merge pipeline**: 처음 3 layer를 매일 한 번 머지해 *"single description per table"* 로 만들고, embedding model로 테이블당 vector 1개를 만들어 store에 저장.

### 3.3 Request Flow (3 steps)

```
Q (plain English)
  │
  ▼ Step 1: 같은 embedding model로 question vector화
  │
  ▼ Step 2: vector store에서 table description retrieval
              + semantic + exact text matching
              + institutional knowledge retrieval (access-controlled)
              + relevant memory merge
  │
  ▼ Step 3: agent loop 시작
              LLM → SQL 생성 → tool 실행 → 관찰 → 재시도
              → "verified answer"
```

### 3.4 Architectural philosophy

- **harness fills the gap**: *"An LLM by itself can only predict the next token. It cannot run a SQL query or act on the result."* → tools + assembled context + loop.
- **simplicity is by design**: 복잡한 router·multi-model fusion·content-type별 embedding pipeline은 모두 cost·latency·failure mode를 늘린다.
- **infrastructure does the heavy lifting**: agent 자체보다 그 *밑에 있는* unified data lake·monorepo pipeline·annotation enforcement가 신뢰성의 진짜 원천.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

본 글은 정량 벤치마크 논문이 아니라 운영 사례 보고서다. 인용 가능한 정량 지표:

| 항목 | 수치 |
|---|---|
| Data platform 규모 | **1.5 exabyte**, **90,000 datasets**, **~4,000 internal users** (2026-05 기준) |
| 데이터 agent foundation model | GPT-5.5 단일 |
| 도구 수 | 40 → **13** (per-call cap) |
| Codex enrichment batch | 100~200 테이블/batch, 5~10분/테이블 |
| Cross-cloud migration | **DAG 10,000개 + 테이블 90,000개 + 600 PB**, **약 2개월** |
| OSS patch release agent | 12+ forks (Spark · Kafka · Flink 등), **3-4개월 무인 운영**, **incident 0건** |
| Support 티켓 | 5,500 사용자, engineer당 *"a hundred fixes per day"* (이전: *"a few hours per ticket"*) |

> "Comparable cross-cloud migrations at other companies have run for years." (비교군 정량값은 미공개)

## 5. 한계와 향후 과제 (Limitations and Future Work)

**글 자체의 한계 (자료 제공자 관점):**
- 다이어그램(architecture·context assembly figure)이 본문에 있지만 raw에는 캡처되지 않음 (rule #1로 자동 fetch ❌). 사용자가 별도 저장 시점에 큐레이션 가능.
- *"vanilla"* 의 정량적 baseline 비교(router 있는 버전 vs 없는 버전 성능)는 인터뷰에서 공개되지 않음 — *"the results were bad"* 같은 정성 표현만 제공.
- GPT-5.5의 cost·latency·throughput per request 수치 미공개.
- *"around 13 tools"* 의 구체적 목록 미공개.
- Codex가 *"investigates, finds the fix, and applies it"* 라고만 표현 — failure rate, false positive rate, human review reject rate 미공개.

**OpenAI 팀이 명시한 차기 과제:**

| 과제 | 설명 |
|---|---|
| **Per-question custom apps** | 고정 widget(bar chart·pivot table) 대신 Codex가 질문마다 full React app을 생성해 backing store와 연결 |
| **Platform-side agents for incoming code** | *"vibe-coded"* Flink job처럼 사용자가 의미를 모르고 ship한 코드를 플랫폼에 도달하기 전 triage·validate |

> *"The previous wave of agents helped users do more. The next wave will help platforms keep up."*

## 6. 관련 연구 (Related Work)

### 본 ai-wiki 내부 연결

| 자료 | 관련성 |
|---|---|
| [[agents/lee-hoyeon-2026-harness-engineering]] | Prompt → Context → Harness 3단계 진화 — 본 글의 *"LLM + harness"* 정의를 한국어로 풀어낸 강의 |
| [[agents/lin-2026-harness-updating-is-not-harness-benefit]] | base capability vs harness-benefit 분리 — OpenAI가 *"vanilla agent + strong harness"* 로 후자에 투자한 사례와 직결 |
| [[agents/dennis-2026-compiling-agentic-workflows-into-llm]] | surface orchestration을 가중치로 컴파일 — OpenAI는 정반대로 *"무거운 orchestration 자체를 안 만든다"* 는 입장 |
| [[agents/patel-2026-beyond-the-prompt-claude-code]] | *"setup is the work"* — 본 글의 *"foundation matters more than the agent"* 와 동일 정신 |
| [[agents/osmani-2026-loop-engineering]] | designing loops that prompt agents — 본 글의 agentic loop을 일반 패턴으로 추상화 |
| [[agents/zhang-2026-recursive-language-models]] | long-context를 root LLM이 코드로 탐색 — 본 글의 *"6-layer context를 single embedding으로 압축"* 과 대비되는 또 다른 long-context 전략 |
| [[applications/liu-2026-rag-llm-wiki-or-gbrain]] | retrieve · compile · act framework — 본 글의 6-layer context는 *"compile"* 단계의 산업 사례 |

### 본 글 안에서 외부 자료로 언급된 것

- **Codex** (OpenAI 공개) — public API
- **MCP** (Model Context Protocol) — open protocol
- **OpenAI Embedding API** — public
- **GPT-5.5** — public via API

## 7. 용어집 (Glossary)

- **Data agent** — 자연어 질문을 받아 9만 테이블 중 적절한 테이블을 찾고 SQL을 작성·실행·검증하는 사내 에이전트.
- **Harness** — LLM이 next token만 예측할 수 있다는 한계를 메우는 wrapper. tool 제공, context 조립, agentic loop 실행을 담당.
- **Agentic loop** — *reason → act → observe → reason …* 의 반복. tool 호출 결과를 다시 LLM에 feed back.
- **Context assembly** — 질문에 답하기 위해 필요한 정보를 6-layer에서 모아 LLM 입력으로 조립하는 layer. 본 사례의 *"real engineering work"*.
- **Table usage metadata** — 스키마·lineage·과거 쿼리 history. 단, **인기 dashboard 쿼리**와 **one-off 쿼리**는 다르게 가중.
- **Codex enrichment** — pipeline code를 야간 batch로 읽어 *"테이블이 실제로 무엇을 담는가, 어떻게 derive되는가, 언제 비슷한 테이블 대신 이것을 써야 하는가"* 를 추출하는 작업.
- **Memory (agent)** — 이전 대화에서 누적된 correction·learning. global·personal scope.
- **Runtime context** — offline description이 stale·missing일 때 warehouse·Airflow·Spark에 live로 질의해 채우는 fallback.
- **MCP (Model Context Protocol)** — agent ↔ tool 통신의 open protocol. 본 사례에서 Codex CLI 통합에 사용.
- **DAG (data engineering 맥락)** — 테이블 간 의존관계 그래프. Table B가 Table A에 의존하면 cutover 시 ordering 중요.
- **Cutover** — 마이그레이션 도중 한 시점에서 *"어느 cloud의 어느 카피가 authoritative source인가"* 가 바뀌는 전환점.
- **Vibe-coded** — 사용자가 코드의 실제 동작을 정확히 이해하지 못한 채 LLM에 의존해 작성한 코드. 본 글에서 platform-side agent가 필요한 이유로 등장.
