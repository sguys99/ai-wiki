---
title: "AKB — Agent Knowledge Base"
type: repo
year: 2026
category: applications
raw_path: /Users/kmyu/Desktop/project/ai-wiki/raw/repos/dnotitia-akb
raw_filename: "dnotitia-akb/"
source_collection: external
org: "dnotitia"
repo: "AKB"
url: "https://github.com/dnotitia/AKB"
license: "PolyForm Noncommercial 1.0"
tags: [agent-memory, mcp, knowledge-base, hybrid-search, git-backed, rag-infrastructure, postgres, pgvector, qdrant, bm25, rrf, knowledge-graph, longmemeval]
---

## 한 줄 요약 (One-line Summary)

**AKB**(Agent Knowledge Base)는 **MCP(Model Context Protocol) Streamable HTTP**로 노출되는 AI 에이전트용 조직 메모리 시스템으로, **Git bare repo(SoT) + PostgreSQL 16(text·BM25 메타) + driver-pluggable vector store(pgvector/Qdrant/Seahorse)** 3-layer 위에서 hybrid dense+BM25 RRF 검색·구조화된 tables·files·URI graph를 단일 도구 집합(`akb_put`/`akb_search`/`akb_browse`/`akb_relations` 등 40+ tool)으로 제공한다. **LongMemEval-S 500Q에서 R@5 = 98.4%** (reranker 없이), MemPalace+rerank와 동률·gbrain-hybrid +0.8pp.

---

## 1. 자료 정보 (Document Information)

- **저장소**: [dnotitia/AKB](https://github.com/dnotitia/AKB)
- **조직**: Dnotitia, Inc. (한국 발음 "디노티시아")
- **라이선스**: PolyForm Noncommercial 1.0 (상업 사용은 별도 라이선스 필요; "AKB", "Dnotitia", "Seahorse" 상표권은 별도)
- **언어/스택**:
  - Backend: Python 3.11 / FastAPI / Uvicorn / asyncpg / GitPython / Anthropic MCP SDK
  - Frontend: React 19 / TypeScript / Vite / Tailwind CSS v4 / Radix UI / Plate(`platejs`) markdown editor
  - Proxy: Node.js ESM, zero-deps, stdio ↔ HTTP bridge (`akb-mcp` on npm)
  - DB: PostgreSQL 16, pgvector(default) / Qdrant / Seahorse Cloud
- **MCP transport**: Streamable HTTP (backend 직접) / stdio (`akb-mcp` proxy 경유)
- **호환 클라이언트**: Claude Code(CLI/VS Code/JetBrains), Claude Desktop, Cursor, Windsurf, Cline, Continue, custom HTTP agents
- **버저닝(monorepo)**:
  - Backend: `backend/pyproject.toml` → tag `backend-vX.Y.Z` → backend CHANGELOG (현재 0.3.6, 2026-05-28)
  - Proxy: `packages/akb-mcp-client/package.json` → tag `akb-mcp-vX.Y.Z` (별도 lifecycle, npm publish는 deliberate human gate)
- **벤치마크 결과(2026-05-20, backend `b54184a`)**: LongMemEval-S 500Q R@5 = **98.40%** (492/500), reranker 없이
- **배포 패키지**: docker compose 3-container 스택(postgres + backend + frontend) / Kubernetes kustomize base (`deploy/k8s/`)

## 2. 주요 기여 (Key Contributions)

1. **MCP-first agent knowledge base** — Confluence/Notion 대체 가능한 "에이전트 전용" 지식 저장소. 인간이 UI로 클릭하는 도구가 아니라 에이전트가 `tools/list`로 발견 → 직접 read/write. **40+ MCP tool**(akb_put·akb_search·akb_browse·akb_relations·akb_link·akb_publish·akb_remember 등)을 단일 catalogue로 노출.

2. **Hybrid retrieval (dense + BM25, RRF fusion) on LongMemEval-S = 98.4% R@5** — 동일 데이터셋에서 MemPalace(rerank 포함, 98.4%·n=450) 수준, gbrain-hybrid(97.6%·n=500)와 MemPal raw(96.6%) 상회. **reranker 없이** 달성. embedding은 `bge-m3@1024`, `search_prefetch: 30`. Cross-encoder reranker(cohere/rerank-v3.5 via OpenRouter, RRF fusion `rerank_fusion_k: 60`) 추가는 **−0.6pp(97.8%)**로 오히려 손해 — first-stage가 이미 top-5에 정답을 두면 reranker는 reorder만 함. category별 분해(single-session-user −4.3pp vs single-session-preference +3.4pp)까지 공개.

3. **3-layer 아키텍처: Git bare repo (SoT) → PG (text + BM25 vocab + meta) → driver-pluggable vector store** — PG는 진실의 원천(chunk text + 메타 + BM25). vector store는 derived index → 손실 시 `chunks.vector_indexed_at = NULL`로 재구축 가능. 세 가지 driver:
   - **`pgvector`** (default; pgvector/pgvector 이미지 + 별도 `vector_index` schema; 외부 서비스 0)
   - **`qdrant`** (별도 StatefulSet; native RRF via Query API; 독립 scaling)
   - **`seahorse`** (Dnotitia 자체 managed cloud table; BFF API + Bearer; infra 0)
   - 드라이버 전환은 `config/app.yaml`의 `vector_store_driver` 한 줄 수정(메인 DB schema migration 없음).

4. **Postgres-native vault isolation via per-user PG roles** — `akb_sql`로 사용자가 직접 SQL을 실행하는 위험을 **application-layer regex 검사 없이** PG ACL로 차단. 각 user → `akb_user_<uid>` PG role; 각 vault → `akb_vault_<vid>_{reader,writer,admin}` group role. user SQL은 tx 안에서 `SET LOCAL ROLE akb_user_<uid>` → 권한 밖 테이블 접근은 PG `42501` 그대로 반환. system tables(`users`/`vaults`/`tokens`/`chunks`) 모두 `akb_user_*`에서 unreachable. 디자인: `docs/designs/pg-native-rbac/`.

5. **Crash-safe indexing pipeline + persistent linked worktree per vault** — write path는 PG + git 만 touch (vector store round-trip 0). `embed_worker`가 `vector_indexed_at IS NULL` 행을 atomically 처리(embed → BM25 sparse encode → upsert → flag 갱신). delete는 `vector_delete_outbox`로 같은 tx 내 기록 → orphan vector 없음. Git은 vault당 bare repo + persistent worktree(`/data/vaults/_worktrees/{vault}`) — clone/push 없이 직접 commit, per-vault `threading.Lock`으로 직렬화.

6. **Design philosophy: "core stays small, flexibility via extension"** — built-in consolidator·summariser·"knowledge gardener" 없음. 모든 write는 Redis Stream `akb:events`에 structured event 발행 → 외부 consumer(주기적 synthesis bot, doc-rot reaper, weekly-digest agent, audit trail)가 core patch 없이 `XREAD`/consumer group으로 구독. Redis 없어도 PG `events` outbox는 항상 기록 → LISTEN/NOTIFY trigger 위에 SSE 엔드포인트 빌드 가능.

7. **Public LongMemEval reproducer + per-category breakdown** — `eval/longmemeval/`에 한 줄 docker compose 빌드 + `run.py` + config/postgres-init + 결과 markdown 까지 동봉. 다른 system(gbrain, MemPalace)과 **공개적으로 비교 가능한 라인** 제공.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3-Layer 시스템 구조

```
┌──────────────────────────────────────────────────────────┐
│                  Access Layer                            │
│   MCP Server  │  REST API  │  Web UI                     │
├──────────────────────────────────────────────────────────┤
│                  Core Services                           │
│   Document (Put/Get)  │  Search (Hybrid: dense+BM25)     │
│   Relations (graph)   │  Session  │  Publications        │
├──────────────────────────────────────────────────────────┤
│                  Storage Layer                           │
│   Git bare repos       │  PostgreSQL 16 (text + meta SoT)│
│                        │  Vector store (driver):         │
│                        │    pgvector (default, same PG)  │
│                        │    qdrant   (optional)          │
│                        │    seahorse (managed, optional) │
└──────────────────────────────────────────────────────────┘
```

### 2-Layer MCP architecture (Backend ↔ Proxy)

- **Backend (Streamable HTTP)** — business logic 전부. CRUD, search, tables, access control.
- **Proxy (`packages/akb-mcp-client/`, stdio ↔ HTTP bridge)** — local filesystem이 필요한 도구만 처리.
  - **Proxy-only tools**: `akb_put_file`, `akb_get_file`, `akb_delete_file`, `akb_put`/`akb_update`의 `file=` 파라미터
  - Proxy가 `tools/list` 응답에 이들을 **inject** → backend는 결코 보지 않음
  - **Rule**: local filesystem access가 필요한 모든 것은 proxy에 (backend는 무상태 HTTP only)

### Vault / Collection / Document / URI

- **Vault** — Git bare repo 1개 = access control & 물리적 isolation 단위. `/data/vaults/{vault_name}.git`.
- **Collection** — vault 내 디렉토리. topical 그룹.
- **Document** — Markdown + YAML frontmatter. agent read/write 최적화.
- **AKB URI** (0.3.0~):
  ```
  akb://{vault}                                              vault root
  akb://{vault}/coll/{coll_path}                             collection
  akb://{vault}[/coll/{coll_path}]/doc/{filename}            document
  akb://{vault}[/coll/{coll_path}]/table/{name}              table
  akb://{vault}[/coll/{coll_path}]/file/{uuid}               file
  ```
  → URI 부모 collection으로 walking up은 pure string operation. `akb_browse(uri=...)` 하나로 sibling 나열 가능.

- **Document frontmatter 예시**:
  ```yaml
  title: "Payment API v2 migration plan"
  type: plan              # note|report|decision|spec|plan|session|task|reference
  status: active          # draft|active|archived|superseded
  tags: [payments, api]
  domain: engineering
  summary: "REST → gRPC transition plan."
  depends_on: ["akb://eng/coll/specs/doc/payment-api-v2.md"]
  related_to: ["akb://eng/coll/meetings/doc/2026-05-01-payments.md"]
  ```

### Hybrid retrieval pipeline

- **Dense vector ANN top-K** (driver별: pgvector HNSW, Qdrant native, Seahorse server-side)
- **BM25 sparse** — corpus-side sparse vector 사전 계산, query-side는 vocab lookup. `bm25_vocab`/`bm25_stats` 테이블.
- **RRF fusion**:
  - pgvector: **application-side** fusion
  - qdrant: **native RRF** via Query API
  - seahorse: **native RRF** server-side
- **`search_prefetch: 30`** 권장, 응답에는 dedup된 prefetch pool size(`total_matches`) 보고 — 단, corpus-wide hit count 아님(ANN top-K)

### PG-native RBAC for `akb_sql`

- **Lifecycle hook**: signup, vault create/delete, grant/revoke → `RoleSync` (`backend/app/services/role_sync.py`)가 PG role DDL 발행 (best-effort).
- **Startup reconciler**: `lifecycle.init_storage` & `POST /admin/reconcile-roles`가 catalog에서 full role state 재구축.
- **`UserSqlExecutor`** (`backend/app/services/user_sql_executor.py`)이 user SQL의 **유일한** 진입점:
  - tx 시작 → `SET LOCAL ROLE akb_user_<uid>` → SQL 실행 → 커밋/롤백
  - `users.is_admin=TRUE`인 system admin은 role switch 우회
  - 권한 밖 객체는 PG `42501`로 즉시 거절 → cross-vault probe 차단

### Doc ID format (DB 키 vs user-facing)

- **DB primary key**: full UUID `0c37e906-6db0-48c2-ac5d-576d0797b3f7`
- **User-facing ID**: `d-` prefix + first 8 hex of hash → `d-94d8657f`, `metadata->>'id'`에 저장
- 모든 doc lookup은 **3-way OR 매칭**: `d.id::text = $X OR d.metadata->>'id' = $X OR d.path LIKE '%' || $X || '%'`
- 중심 함수: `document_repo.find_by_ref()`

### Git storage write path

- `/data/vaults/{vault_name}.git` (bare repo, vault당 1개)
- `/data/vaults/_worktrees/{vault_name}` (persistent linked worktree, 1회 `git worktree add`로 생성)
- commit은 worktree 경유 — **clone·push 없음** (object store는 bare와 공유)
- per-vault `threading.Lock` → 동시 write 직렬화
- 모든 `GitService` write는 async layer에서 `asyncio.to_thread`로 dispatch → event loop block 안 함

### Health endpoints

- `GET /livez` — 200 즉시 반환, deps 없음 (liveness)
- `GET /readyz` — DB ping + vector store ping, 성공 시 30s TTL 캐시. **vector store는 soft check**: 실패해도 `degraded:...`로 detail에 표시, ready 응답 유지 (검색은 degrade, 나머지는 동작)
- `GET /health` — 대시보드용 상세 status (`vector_store.{reachable,backfill,bm25_vocab_size}`, `external_git`, `metadata_backfill`, `events`)

### 0.3.6 (2026-05-28) bug-fix highlights (functional/logic review "P2 cut")

- **Archived vault은 진짜로 read-only** — write 차단(`check_vault_access`가 writer+admin 모두에서 archive guard 발동, system admin 포함 short-circuit 앞에 위치), read 보존(`_reconcile_vault_roles`가 archived 포함 ALL vault fetch → group role + GRANT 유지)
- **`alter_table` reserved-column guard** — `id`/`created_at`/`updated_at`/`created_by` drop/rename 차단. `_validate_column_name`이 add/drop/rename 공통 가드(`^[a-z][a-z0-9_]*$`)
- **`CollectionService.delete`가 tables도 처리** — empty-mode 체크에 `vault_tables` 포함, recursive 모드는 dynamic PG table + chunk outbox + registry row + edges 동일 tx 안에서 tear down
- **OpenAI embeddings `index` field로 pair** — array order 대신 each item의 `index`로 reorder + completeness assertion (`{0..n-1}`). gateway가 batched response를 out-of-order 조립해도 안전
- **`delete_publications_for_document` UUID branch 수정** — pre-0.3.0 legacy URI 쉐이프(`akb://V/doc/{path}`) 대신 canonical (`akb://V/coll/{coll}/doc/{name}`) 사용 → orphan publication 누락 방지 (latent landmine close)

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### LongMemEval-S (500Q, 2026-05-20, backend `b54184a`)

| System | R@5 | k | n | Reranker | Source |
|---|---:|:---:|:---:|:---:|---|
| **AKB hybrid (rerank off)** | **98.40%** | 5 | 500 | no | this repo |
| MemPal hybrid+rerank (held-out) | 98.4% | 5 | 450 | yes | MemPalace |
| **AKB hybrid + rerank (RRF fusion)** | **97.80%** | 5 | 500 | no | this repo |
| gbrain-hybrid | 97.60% | 5 | 500 | no | gbrain-evals |
| gbrain-vector | 97.40% | 5 | 500 | no | gbrain-evals |
| MemPal raw (ChromaDB) | 96.6% | 5 | 500 | no | MemPalace headline |
| gbrain-keyword (BM25) | 19.80% | 5 | 500 | no | gbrain-evals |

### Per-category Recall@5 (rerank off vs on(fusion))

| Question type | rerank off | rerank on | Δ |
|---|---:|---:|---:|
| knowledge-update | 100.0% | 100.0% | 0 |
| multi-session | 99.2% | 98.5% | +0.7 |
| single-session-assistant | 100.0% | 100.0% | 0 |
| single-session-preference | 93.3% | 96.7% | **−3.4** |
| single-session-user | 100.0% | 95.7% | **+4.3** |
| temporal-reasoning | 96.2% | 96.2% | 0 |
| **TOTAL** | **98.4%** | **97.8%** | **+0.6** |

**해석**: 첫 단계가 이미 top-5에 정답을 두면 reranker는 correct hit를 재정렬할 뿐 — `single-session-user`(literal-match 류)에서 잃는 폭(−4.3pp)이 `single-session-preference`(+3.4pp)에서 얻는 폭보다 큼.

> **Comparability 경고**: embedding model이 시스템마다 다름(AKB: `bge-m3@1024`). 따라서 본 표는 **stack-level 비교**(retrieval pipeline as a whole)이지 apples-to-apples 모델 비교가 아님.

### Test coverage (backend E2E)

- `test_mcp_e2e.sh` — 75 tests (core CRUD, search, tables, access control)
- `test_edit_e2e.sh` — 33 tests (`akb_edit`)
- `test_stdio_files_e2e.sh` — 18 tests (file upload/download)
- `test_put_file_param_e2e.sh` — 15 tests (file param)
- `test_security_edge_e2e.sh` — 62 tests (보안 & edge cases)
- `test_pg_rbac_e2e.sh` — **44 tests** (PG-native vault isolation: system-catalog access, schema-qualified, quoted, UNION/CTE/EXISTS/subquery, filesystem functions, DDL-shaped attempts, reader-scope writes)
- `test_graph_replace_e2e.sh` — 29 tests
- `test_defensive_e2e.sh` — 33 tests
- `test_probes_e2e.sh` — health probes + concurrent-burst regression
- 모두 ephemeral users/vaults 생성·정리. `AKB_URL` 환경변수로 임의 deploy target 지정.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **상업 라이선스 필요** — PolyForm Noncommercial 1.0은 비영리 범위에서만 무료. for-profit 내부/프로덕션 배포, hosted/on-prem/embedded/rebranded distribution, commercial bundle 모두 별도 라이선스 필요 (opensource@dnotitia.com). "AKB", "Dnotitia", "Seahorse" 상표권은 software license와 분리.
- **상표 제약** — fork·derivative work는 다른 이름으로 배포해야 함 (TRADEMARKS.md).
- **벤치마크 가용성** — LongMemEval-S 500Q 한 데이터셋 결과만 공개. multi-hop/temporal/agentic-bench는 `eval/agentic-bench/` 디렉토리만 있고 결과는 README에서 미언급. cross-domain·도메인 일반화·실 production 사용 사례 부족.
- **embedding model 종속성** — 본 결과는 `bge-m3@1024` + pgvector·HNSW. embedding 교체 시 R@5 거동은 미공개. pgvector + HNSW는 `embed_dimensions ≤ 2000`(또는 4000 with `halfvec`); 큰 모델은 exact scan으로 fallback.
- **LLM은 optional**, `metadata_worker`가 external git mirroring import 시 auto-tag에만 사용 → core CRUD/search는 LLM 없이 동작. 그러나 doc summary·auto-tagging 품질은 빠질 수 있음.
- **인프라 요구** — docker compose 3-container 또는 K8s. **OpenAI-compatible embedding endpoint는 필수 외부 dep**(자체 vLLM/TEI 서빙 시에도). 라이트 사용자에게 진입 장벽.
- **Vector store driver별 일관성** — RRF가 pgvector는 app-side, qdrant·seahorse는 native. 동작 동등성은 README 주장이지만 driver별 latency/cost·정확도 미세 차이는 미공개.
- **0.3.6 P2 cut에서 드러난 archive·collection·alter_table 모두 의미적 일관성이 늦게 발견됨** — 데이터 무결성/contract 버그가 한 cut에 5건. 향후 spec/property-based test가 필요.
- **proxy npm publish는 수동 human gate** — 자동화 CI 없이 deliberate manual step (`cd packages/akb-mcp-client && npm publish --access public`).

## 6. 관련 연구 (Related Work)

- **MemPalace** ([mempalace/mempalace](https://github.com/mempalace/mempalace)) — hybrid+rerank, LongMemEval-S 98.4% (n=450). reranker 의존. AKB는 reranker-free로 동일 수준.
- **gbrain (Garry Tan)** ([garrytan/gbrain](https://github.com/garrytan/gbrain)) — markdown-first + Postgres/pgvector + zero-LLM typed-edge KG. LongMemEval-S 97.6% (hybrid). AKB와 같은 "agent memory" 카테고리지만 single-operator 지향(Vectorize 리뷰 참고).
- **gbrain-evals** ([garrytan/gbrain-evals](https://github.com/garrytan/gbrain-evals)) — `docs/benchmarks/2026-05-07-longmemeval-s.md`. AKB는 이 라인을 reproducible하게 따라잡으려고 `eval/longmemeval/` 자체 runner 제공.
- **LongMemEval** ([xiaowu0162/LongMemEval](https://github.com/xiaowu0162/LongMemEval)) — 본 평가의 베이스 데이터셋. _s split(short-context) 500 questions, ~50 chat sessions per question.
- **HKUDS/RAG-Anything** — paper 기반 reference impl. KG + multimodal. AKB는 graph는 있지만 multimodal은 outside scope (text/markdown).
- **PageIndex (VectifyAI)** — vectorless RAG의 또 다른 축. AKB는 vector + BM25 hybrid 쪽.
- **Liu의 3-axis frame** (RAG/LLM Wiki/Fat Skills) — 본 repo는 retrieve(akb_search) + compile(LLM Wiki 페이지를 markdown으로) + act(MCP tool 통한 read/write)를 한 인프라에서 묶는다는 점에서 Liu의 convergence 예측(2026)에 부합.
- **MCP (Model Context Protocol)** — Anthropic의 표준. AKB는 Streamable HTTP server + stdio proxy 양쪽 모두 지원.

## 7. 용어집 (Glossary)

- **AKB** — Agent Knowledge Base. Dnotitia의 본 시스템.
- **MCP (Model Context Protocol)** — Anthropic이 제안한 LLM 에이전트 ↔ 외부 도구/리소스 통신 표준.
- **Streamable HTTP MCP** — MCP의 HTTP 기반 transport (vs stdio).
- **`akb-mcp` proxy** — `packages/akb-mcp-client/`. stdio ↔ HTTP bridge. zero-deps Node.js ESM. npm 배포.
- **Vault** — Git bare repo. AKB의 access control & 물리적 isolation 단위.
- **Collection** — vault 내 디렉토리(topical 그룹). URI `akb://{vault}/coll/{coll_path}`.
- **AKB URI** — `akb://{vault}[/coll/{coll}]/{doc|table|file}/{...}`의 location-aware 핸들. 모든 tool 입력·관계 저장에 사용.
- **Bare repo** — working tree 없이 `.git` 내용만 가진 repo. AKB는 `_worktrees/`에 vault당 1개의 persistent linked worktree로 commit.
- **BM25** — bag-of-words 기반 sparse lexical retrieval. AKB는 corpus-side sparse vector를 사전 계산(`bm25_vocab`/`bm25_stats`).
- **RRF (Reciprocal Rank Fusion)** — dense rank·sparse rank를 `sum(1/(k+rank))`로 fuse하는 표준 hybrid 기법.
- **pgvector** — PostgreSQL vector extension. AKB는 별도 `vector_index` schema에 호스팅 (main `chunks`는 plain PG).
- **HNSW** — Hierarchical Navigable Small World. pgvector의 ANN index.
- **bge-m3** — BAAI General Embedding M3. AKB가 본 벤치마크에서 사용한 모델 (1024-dim).
- **PG ACL (Access Control List)** — PostgreSQL의 GRANT/REVOKE + role 시스템. AKB는 이를 vault isolation의 1차 메커니즘으로 사용.
- **`akb_user_<uid>` / `akb_vault_<vid>_{reader|writer|admin}`** — AKB가 lifecycle 시점에 생성하는 PG role naming convention.
- **`SET LOCAL ROLE`** — tx 안에서 일시적으로 다른 role로 권한 전환. user SQL 실행 진입점.
- **42501** — PostgreSQL error code "insufficient privilege". cross-vault probe가 받게 되는 응답.
- **`vector_indexed_at`** — `chunks` 테이블 컬럼. `NULL`이면 indexing worker가 처리해야 함. crash-safe ordering의 핵심.
- **`vector_delete_outbox`** — chunk delete와 같은 tx 안에서 기록되는 outbox. delete worker가 driver별 vector store에서 point 제거.
- **`embed_worker`** — `vector_indexed_at IS NULL` 행을 drain하는 indexing worker. embed → BM25 sparse encode → upsert → flag UPDATE를 atomically 수행.
- **`metadata_worker`** — external git mirroring import 시 LLM으로 doc auto-tag. core CRUD/search와 분리.
- **`events_publisher` / `akb:events` Redis Stream** — PG `events` outbox → Redis로 drain. 외부 consumer가 `XREAD`/consumer group으로 구독. core patch 없는 확장 hook.
- **Seahorse Cloud** — Dnotitia의 managed vector table SaaS. TABLE_V2 + BFF API (Bearer 인증). AKB의 vector_store driver 중 하나.
- **PolyForm Noncommercial 1.0** — non-commercial 범위에서 자유로운 라이선스. for-profit 사용은 별도 commercial license.
- **`RoleSync`** — lifecycle event(signup/vault CRUD/grant/revoke) → PG role DDL 발행 컴포넌트. best-effort.
- **lifecycle reconciler** — startup & `POST /admin/reconcile-roles`에서 catalog로부터 PG role state 전체 재구축. RoleSync hook 실패에 대한 safety net.
- **`UserSqlExecutor`** — user SQL의 단일 진입점. system admin(`is_admin=TRUE`)만 role switch 우회.
- **`document_repo.find_by_ref()`** — UUID / `d-` ID / path substring 3-way OR로 document를 찾는 중앙 함수.
- **doc ID `d-` prefix** — full UUID의 첫 8 hex hash. `metadata->>'id'`에 저장.
- **proxy-injected tools** — `tools/list` 응답에 stdio proxy가 추가로 끼워넣는 tool. backend는 모름. 모두 local filesystem이 필요한 작업(`akb_put_file` 등).
- **LongMemEval-S** — LongMemEval의 short-context split. 500 questions × ~50 sessions.
- **`backend-vX.Y.Z` / `akb-mcp-vX.Y.Z`** — monorepo의 component별 tag prefix. v2.0.0 collision 방지용.
