---
title: "AKB — Agent Knowledge Base"
type: repo
year: 2026
category: applications
raw_path: /Users/kmyu/Desktop/project/ai-wiki/raw/repos/dnotitia-akb
raw_filename: "dnotitia-akb/"
source: dnotitia-akb.md
source_collection: external
org: "dnotitia"
repo: "AKB"
url: "https://github.com/dnotitia/AKB"
license: "PolyForm Noncommercial 1.0"
tags: [agent-memory, mcp, knowledge-base, hybrid-search, git-backed, rag-infrastructure, postgres, pgvector, qdrant, bm25, rrf, knowledge-graph, longmemeval]
---

# AKB — Agent Knowledge Base

## 요약 (Summary)

**AKB**는 Dnotitia(디노티시아)가 만든 **AI 에이전트 전용 조직 메모리(organizational memory) 시스템**으로, **MCP(Model Context Protocol) Streamable HTTP**로 직접 노출된다. 인간이 UI로 클릭하는 Confluence/Notion 대체가 아니라, 에이전트가 `tools/list` → 직접 read/write 하도록 설계된 40+ MCP tool(`akb_put`/`akb_search`/`akb_browse`/`akb_relations` 등) 카탈로그를 제공한다.

저장 계층은 **Git bare repo (진실의 원천) + PostgreSQL 16 (text + BM25 vocab + 메타) + driver-pluggable vector store (pgvector default / Qdrant / Seahorse Cloud)** 의 3-tier. 검색은 **dense + BM25 sparse를 RRF로 fuse한 hybrid retrieval** 한 번에 끝나며, **LongMemEval-S 500Q에서 R@5 = 98.40%** 를 reranker 없이 달성한다 (MemPalace+rerank와 동률, gbrain-hybrid +0.8pp).

설계 철학은 **"core stays small, flexibility comes from extension"**: 내장 consolidator/summariser/"knowledge gardener"가 없고, 모든 write가 Redis Stream `akb:events`에 structured event를 발행 → 외부 consumer(주기적 synthesis bot, doc-rot reaper, weekly-digest, audit)가 core patch 없이 hook.

## 주요 기여 (Key Contributions)

1. **MCP-first 에이전트 KB** — Streamable HTTP backend + stdio proxy(`akb-mcp` on npm)의 **2-layer MCP** 구조. local filesystem이 필요한 도구(`akb_put_file`/`akb_get_file`/`akb_delete_file`/`akb_put`의 `file=` 파라미터)는 **proxy-only**, backend는 결코 보지 않음. 호환 클라이언트: Claude Code, Claude Desktop, Cursor, Windsurf, Cline, Continue, custom HTTP agents.

2. **Hybrid retrieval LongMemEval-S R@5 = 98.40%** — reranker 없이. `bge-m3@1024` embedding + pgvector + `search_prefetch: 30`. Cross-encoder reranker(cohere/rerank-v3.5 via OpenRouter, RRF fusion `rerank_fusion_k: 60`) 추가는 −0.6pp(97.8%)로 오히려 손해 — first-stage가 이미 top-5에 정답을 두면 reranker는 reorder만 수행. **per-category breakdown 까지 공개**(single-session-user −4.3pp vs single-session-preference +3.4pp).

3. **3-layer storage: Git bare repo (SoT) → PG (text + BM25 + 메타) → driver-pluggable vector store** — PG가 진실의 원천. Vector store는 derived index → 손실 시 `chunks.vector_indexed_at = NULL`로 재구축. 세 가지 driver(`pgvector` default / `qdrant` / `seahorse`)는 config 한 줄로 전환, 메인 DB schema migration 없음.

4. **PG-native vault isolation** — `akb_sql`의 cross-vault probe를 **application-layer regex 검사 없이** PG ACL로 차단. 각 user → `akb_user_<uid>` PG role, 각 vault → `akb_vault_<vid>_{reader,writer,admin}` group role. user SQL은 tx 안에서 `SET LOCAL ROLE akb_user_<uid>` → 권한 밖 객체는 PG `42501` 그대로 반환. **44개의 `test_pg_rbac_e2e.sh` 테스트**가 system-catalog access, schema-qualified, quoted, UNION/CTE/EXISTS/subquery, filesystem functions, DDL-shaped attempts, reader-scope writes 등 SQL surface variation을 검증.

5. **Crash-safe indexing pipeline** — write path는 PG + git만 touch (vector store round-trip 0). `embed_worker`가 `vector_indexed_at IS NULL` 행을 atomically 처리(embed → BM25 sparse encode → `vector_store.upsert_one()` → flag UPDATE). delete는 `vector_delete_outbox`에 같은 tx 내 기록 → orphan vector 없음. Git은 vault당 bare repo + **persistent linked worktree** (`/data/vaults/_worktrees/{vault}`) — clone/push 없이 직접 commit, per-vault `threading.Lock`으로 직렬화.

6. **Public LongMemEval reproducer** — `eval/longmemeval/`에 docker compose + `run.py` + config/postgres-init + 결과 markdown 까지 동봉. gbrain-evals, MemPalace와 동일 데이터셋에서 **공개 비교 가능한 라인** 제공.

7. **0.3.6 (2026-05-28) data-integrity bug-fix cut** — archived vault read/write 일관성, `alter_table` reserved-column guard, collection delete의 tables 처리, OpenAI embeddings response `index` field pairing, `delete_publications_for_document` UUID branch의 legacy URI 수정 — 다섯 개의 latent 버그를 한 번에 닫음. functional/logic review("P2 cut")의 결과.

## 방법론 및 아키텍처 (Methodology and Architecture)

### 3-Layer 시스템

```
Access:   MCP Server  │  REST API  │  Web UI
Core:     Document  │  Search (hybrid: dense+BM25)  │  Relations (graph)  │  Session  │  Publications
Storage:  Git bare repos  │  PostgreSQL 16 (SoT)  │  Vector store (pgvector | qdrant | seahorse)
```

- **PG가 진실의 원천**. Main `chunks` 테이블은 text + 메타만 (embedding column 없음, pgvector 의존 없음). BM25 vocab + stats는 `bm25_vocab`/`bm25_stats`.
- **Vector store는 driver-pluggable derived index** — dense embedding + corpus-side BM25 sparse vector를 보관. driver 선택은 `config/app.yaml`의 `vector_store_driver` 한 줄.

### Vault / Collection / Document / AKB URI

- **Vault** — Git bare repo (`/data/vaults/{vault_name}.git`). access control & 물리적 isolation 단위.
- **Collection** — vault 내 디렉토리. topical 그룹.
- **Document** — Markdown + YAML frontmatter (`type`, `status`, `tags`, `domain`, `summary`, `depends_on`, `related_to`).
- **AKB URI (0.3.0~)**:
  ```
  akb://{vault}                                            vault root
  akb://{vault}/coll/{coll_path}                           collection
  akb://{vault}[/coll/{coll_path}]/doc/{filename}          document
  akb://{vault}[/coll/{coll_path}]/table/{name}            table
  akb://{vault}[/coll/{coll_path}]/file/{uuid}             file
  ```
  → URI 부모 collection으로 walking up은 pure string operation. 모든 tool 입력·관계 저장이 URI 기반.

### 2-Layer MCP architecture

- **Backend (Streamable HTTP)** — business logic 전부.
- **Proxy (`packages/akb-mcp-client/`, stdio↔HTTP bridge, zero-deps Node.js ESM)** — local filesystem이 필요한 도구만. `tools/list` 응답에 proxy가 **inject**.

### Hybrid retrieval

- **Dense ANN top-K** (driver별 native) + **BM25 sparse** (corpus-side 사전 계산) → **RRF fusion**.
- pgvector: **application-side** fusion / qdrant: **native RRF via Query API** / seahorse: **native server-side**.
- `search_prefetch: 30` 권장. 응답의 `total_matches`는 dedup된 prefetch pool size — corpus-wide hit count 아님(ANN top-K).

### PG-native RBAC for `akb_sql`

- **Lifecycle hook** (`RoleSync`, `backend/app/services/role_sync.py`): signup, vault create/delete, grant/revoke → 즉시 PG role DDL 발행 (best-effort).
- **Startup reconciler** (`lifecycle.init_storage` + `POST /admin/reconcile-roles`): catalog로부터 full role state 재구축. hook 실패에 대한 safety net.
- **`UserSqlExecutor` (`backend/app/services/user_sql_executor.py`)**: user SQL의 단일 진입점. `SET LOCAL ROLE akb_user_<uid>` → 권한 밖 객체는 `42501`. system admin(`users.is_admin=TRUE`)만 우회.
- 디자인 문서: `docs/designs/pg-native-rbac/`.

### Git storage write path

- bare repo (`/data/vaults/{vault}.git`) + **persistent linked worktree** (`/data/vaults/_worktrees/{vault}`, 1회 `git worktree add`)
- commit은 worktree 경유 — **clone/push 없음** (object store는 bare와 공유)
- per-vault `threading.Lock` → 동시 write 직렬화. `asyncio.to_thread`로 dispatch.

### Health endpoints

- `GET /livez` — 200 즉시 (liveness)
- `GET /readyz` — DB ping + vector store **soft** check (실패 시 `degraded:...`만 표시, ready 유지). 30s TTL 캐시.
- `GET /health` — 대시보드용 상세 status

## 결과 (Results)

### LongMemEval-S (500Q, 2026-05-20, backend `b54184a`)

| System | R@5 | n | Reranker |
|---|---:|:---:|:---:|
| **AKB hybrid (rerank off)** | **98.40%** | 500 | no |
| MemPalace hybrid+rerank (held-out) | 98.4% | 450 | yes |
| AKB hybrid + rerank (RRF fusion) | 97.80% | 500 | no |
| gbrain-hybrid | 97.60% | 500 | no |
| gbrain-vector | 97.40% | 500 | no |
| MemPal raw (ChromaDB) | 96.6% | 500 | no |
| gbrain-keyword (BM25 only) | 19.80% | 500 | no |

### Per-category Recall@5 (rerank off vs on(fusion))

| Question type | rerank off | rerank on | Δ |
|---|---:|---:|---:|
| knowledge-update | 100.0% | 100.0% | 0 |
| multi-session | 99.2% | 98.5% | +0.7 |
| single-session-assistant | 100.0% | 100.0% | 0 |
| single-session-preference | 93.3% | 96.7% | **−3.4** |
| single-session-user | 100.0% | 95.7% | **+4.3** |
| temporal-reasoning | 96.2% | 96.2% | 0 |
| **TOTAL** | **98.4%** | **97.8%** | +0.6 |

**해석**: first-stage가 이미 top-5에 정답을 두면 cross-encoder reranker는 correct hit를 재정렬하는 작업밖에 안 함. literal-match 류(`single-session-user`)에서 잃는 폭이 preference 류에서 얻는 폭보다 큼.

> **Comparability 경고**: embedding model이 시스템마다 다름(AKB: `bge-m3@1024`). 본 표는 **stack-level 비교**(pipeline as a whole)지 apples-to-apples 모델 비교가 아님.

### E2E test 커버리지 (backend)

- `test_mcp_e2e.sh` 75 / `test_edit_e2e.sh` 33 / `test_stdio_files_e2e.sh` 18 / `test_put_file_param_e2e.sh` 15 / `test_security_edge_e2e.sh` 62 / **`test_pg_rbac_e2e.sh` 44** / `test_graph_replace_e2e.sh` 29 / `test_defensive_e2e.sh` 33 / `test_probes_e2e.sh` (probes + concurrent-burst regression).

### 한계

- **PolyForm Noncommercial 1.0** — for-profit 내부/프로덕션, hosted/on-prem, rebranded distribution 모두 commercial 라이선스 필요. "AKB"/"Dnotitia"/"Seahorse"는 별도 상표권.
- LongMemEval-S 한 데이터셋 결과만 공개. multi-hop/temporal/agentic-bench 결과는 미공개 (`eval/agentic-bench/` 디렉토리는 존재).
- embedding model 종속성 — `bge-m3@1024` + HNSW. 다른 모델/dim에서 거동은 미공개. pgvector + HNSW는 `embed_dimensions ≤ 2000` (또는 4000 with `halfvec`); 큰 모델은 exact scan fallback.
- proxy npm publish는 수동 human gate.

## 관련 페이지 (Related Pages)

- [[applications/garrytan-gbrain]] — Garry Tan의 markdown-first agent memory. 같은 "agent memory" 카테고리, AKB와 LongMemEval-S에서 직접 비교 대상(AKB 98.4% vs gbrain-hybrid 97.6%). gbrain은 zero-LLM typed-edge KG + git markdown SoT 축, AKB는 MCP-first + PG-native RBAC + driver-pluggable vector store 축.
- [[applications/liu-2026-rag-llm-wiki-or-gbrain]] — Yanli Liu의 3-축 결정 프레임워크(RAG/LLM Wiki/Fat Skills). AKB는 retrieve(akb_search) + compile(LLM Wiki 페이지를 markdown으로) + act(MCP tool 통한 read/write)를 한 인프라에서 묶는다는 점에서 Liu의 **2026 convergence 예측**(retrieve+compile+act 단일 knowledge OS)에 부합.
- [[applications/vectorize-2026-gbrain-review-honest-assessment]] — Vectorize의 10-dim scorecard로 gbrain을 평가. AKB와 비교 axis(single-operator vs team, managed cloud, multi-hop·temporal 지원) 정리에 참고.
- [[applications/gajjar-2026-gbrain-vs-computer-memory]] — 개인 GBrain ↔ 엔터프라이즈 Computer Memory의 격차 에세이. AKB는 vault·PG ACL·MCP transport로 엔터프라이즈 쪽 격차를 메우려는 시도.
- [[database/hkuds-rag-anything]] — multimodal RAG 쪽 reference impl. AKB는 graph는 있지만 multimodal은 outside scope.
- [[database/vectifyai-pageindex]] — vectorless reasoning-based RAG의 또 다른 축. AKB는 vector + BM25 hybrid 쪽(반대 진영).
- [[overviews/gbrain-ecosystem-overview]] — gbrain 생태계 overview. AKB는 이 ecosystem과 직접 비교되는 또 다른 implementation으로 향후 overview 확장에 후보.
- [[agents/lee-hoyeon-2026-harness-engineering]] — Harness Engineering. CLAUDE.md/skill 3-tier·tool catalogue 설계 관점에서 AKB의 `akb_help()`/tool taxonomy는 "harness가 외부 store에 제공할 contract"의 구현 예시.
