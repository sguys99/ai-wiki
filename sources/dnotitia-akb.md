---
title: "AKB: Agent Knowledge Base"
type: repo
year: 2026
category: applications
raw_path: raw/repos/dnotitia-akb.md
raw_filename: "dnotitia-akb.md"
source_collection: external
org: "dnotitia"
repo: "AKB"
url: "https://github.com/dnotitia/AKB"
license: "BUSL-1.1 (backend/frontend), MIT (akb-mcp proxy)"
tags: [agent-memory, mcp, knowledge-base, hybrid-search, git-backed, rag-infrastructure, postgres, pgvector, qdrant, seahorse, bm25, rrf, knowledge-graph, longmemeval, audit-log, rbac]
---

## 한 줄 요약 (One-line Summary)

**AKB**(Agent Knowledge Base)는 Dnotitia가 공개한 AI 에이전트용 조직 메모리 저장소로, Git bare repo와 PostgreSQL 16 위에 올린 지식베이스를 **MCP(Model Context Protocol)** 로 그대로 노출해 에이전트가 사람의 UI를 거치지 않고 직접 읽고 쓰게 한다. dense와 BM25를 RRF로 합친 hybrid retrieval을 단일 호출로 제공하며, LongMemEval-S 500문항에서 **reranker 없이 Recall@5 = 98.4%** 를 기록했다.

---

## 1. 자료 정보 (Document Information)

- **저장소**: [dnotitia/AKB](https://github.com/dnotitia/AKB)
- **조직**: Dnotitia, Inc.
- **원제**: README 최상단 제목은 `AKB — Agent Knowledge Base`다. 본 wiki는 제목에 em dash를 쓰지 않는 규약에 따라 `AKB: Agent Knowledge Base`로 표기한다.
- **자료 형태**: raw는 저장소 README 전문이다. 과거에는 저장소 전체 클론을 보관했으나 2026-06 경량화 작업에서 README 스텁으로 대체됐다. 따라서 backend 소스, CHANGELOG, 테스트 스크립트, `eval/longmemeval/` 결과 파일은 현재 보유 자료에 포함되지 않는다.
- **라이선스**: backend, frontend, 배포 매니페스트는 **Business Source License 1.1**(BUSL-1.1). npm 프록시 `akb-mcp`(`packages/akb-mcp-client/`)만 **MIT**로 따로 배포된다.
- **연락처**: 상업 라이선스, BSL 전환 배경, 상표 사용 허가는 `LICENSE-CHANGE.md` 또는 support@dnotitia.com
- **MCP transport**: backend는 Streamable HTTP, 로컬 클라이언트는 stdio 프록시 `akb-mcp` 경유
- **호환 클라이언트**: Claude Code(CLI, VS Code, JetBrains), Claude Desktop(macOS, Windows), Cursor, Windsurf, Cline, Continue, 그리고 `POST /mcp/`에 Bearer 토큰을 붙이는 커스텀 에이전트
- **공개 데모**: `akb-demo.agent.seahorse.dnotitia.ai`. 가상 조직의 소규모 지식베이스(제품 문서, 사내 핸드북, 에이전트 세션 노트, 엔지니어링 wiki)를 URI graph로 이어 놓고 가입 없이 열람과 검색을 허용한다. 매주 초기화되고 가용성, 프라이버시, 데이터 보존을 보장하지 않는 폐기용 인스턴스다.
- **배포 형태**: docker compose 3-container 스택(PostgreSQL with pgvector, backend, frontend), Kubernetes는 `deploy/k8s/`의 kustomize base
- **버저닝**: SemVer. 제품 버전은 `backend/pyproject.toml`의 `[project].version`이며 `scripts/bump-version.sh <x.y.z>`가 `frontend/package.json`으로 복제한다. npm 프록시는 제품 버전과 묶이지 않은 독립 semver 라이프사이클을 따른다.

## 2. 주요 기여 (Key Contributions)

1. **MCP-first 지식베이스**: 사람이 UI를 클릭하는 도구가 아니라 에이전트가 도구 목록을 조회해 직접 read/write하는 저장소다. README는 이를 Confluence와 Notion의 drop-in 대체재로 규정한다. 에이전트에게 필요한 형태를 구조화된 문서, 한 번의 호출로 끝나는 semantic 검색과 keyword 검색, 명시적 relations, 전체 버전 이력 네 가지로 정리하고 그에 맞춰 도구 집합을 설계했다.

2. **단일 호출 hybrid retrieval과 공개 벤치마크**: dense 검색과 BM25 검색을 RRF로 합치고 source 단위 중복 제거를 적용한다. LongMemEval-S(500문항, 문항당 약 50개 채팅 세션)에서 reranker 없이 Recall@5 = 98.4%를 기록해 rerank를 쓴 MemPalace와 같은 수치, gbrain hybrid보다 0.8%p 높은 값을 보였다.

3. **PostgreSQL을 진실의 원천으로 두는 3-layer 저장 구조**: PG가 chunk text와 메타데이터, BM25 vocab을 보유하고, vector store는 파생 인덱스에 불과하다. vector store를 통째로 잃어도 `chunks.vector_indexed_at`을 `NULL`로 되돌리면 indexing worker가 다시 채운다.

4. **드라이버 5종을 갖춘 pluggable vector store**: `pgvector`(기본), `qdrant`, `seahorse-cloud`, `seahorse-db`, `seahorse-db-grpc`(실험적)를 설정 한 줄로 고른다. 메인 DB의 schema migration이 필요 없다.

5. **PostgreSQL ACL로 구현한 vault 격리**: `akb_sql`이 사용자 SQL을 직접 실행하는 위험을 애플리케이션 쪽 정규식 검사가 아니라 PG 권한 체계로 막는다. 사용자마다 `akb_user_<uid>` role, vault마다 `akb_vault_<vid>_{reader,writer,admin}` group role을 두고 트랜잭션 안에서 `SET LOCAL ROLE`로 전환한다. 권한 밖 vault를 참조하면 PG 오류 코드 `42501`이 그대로 반환된다.

6. **"core stays small" 설계 철학**: 내장 consolidator, summariser, knowledge gardener를 넣지 않는다. 대신 모든 write가 Redis Stream `akb:events`에 구조화된 이벤트를 발행하고, 주기적 synthesis bot이나 doc-rot reaper, weekly-digest 에이전트, 감사 추적 같은 외부 consumer를 core 수정 없이 붙인다. 기본 계약은 read/write 저장소이며 지식을 어떻게 다룰지에 대한 판단은 바깥에 둔다.

7. **에이전트 플러그인 3종 동봉**: raw MCP 접근 외에 Claude Code와 Codex용 플러그인 `akb-wiki`, `akb-sessions`, `akb-claude-code`를 함께 배포해 자주 쓰는 vault 워크플로를 감싼다.

8. **감사 로그 producer 설계**: 감사 로그를 hash chain으로 묶어 MCP dispatch 지점에서 한 번에 뽑되, 저장과 조회와 보존은 SIEM에 넘긴다. AKB 자신은 감사 데이터를 보관하지 않는다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3-layer 시스템 구조

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
│                        │    pgvector        (default, PG)│
│                        │    qdrant          (optional)   │
│                        │    seahorse-cloud  (managed)    │
│                        │    seahorse-db     (self-hosted)│
│                        │    seahorse-db-grpc(experimental)│
└──────────────────────────────────────────────────────────┘
```

PostgreSQL이 진실의 원천이며 chunk text, 메타데이터, BM25 vocab을 보유한다. vector store는 dense 임베딩과 corpus 쪽 sparse vector를 담는 파생 인덱스다. 메인 DB는 확장이 필요 없고, 같은 pgvector 이미지가 선택 사항인 `vector_index` schema를 함께 호스팅한다.

### 핵심 개체와 AKB URI

- **Vault**: Git bare repo 한 개. 접근 제어와 물리적 격리의 단위다.
- **Collection**: vault 안의 디렉토리. 문서를 주제별로 묶는다.
- **Document**: Markdown에 YAML frontmatter를 붙인 형식으로, 에이전트의 read/write에 맞춰 최적화했다.
- **Hybrid Search**: dense(semantic)와 BM25(lexical)를 RRF로 합쳐 한 번의 호출로 처리한다.
- **Relations**: frontmatter의 `depends_on`, `related_to`, `implements`가 명시적 지식 그래프를 만든다.

0.3.0부터 모든 vault 자원은 위치를 담은 AKB URI를 canonical 핸들로 갖는다. 모든 도구 입력과 relations 저장이 이 URI를 쓴다.

```
akb://{vault}                                          vault root (browse target)
akb://{vault}/coll/{coll_path}                         collection (browse target)
akb://{vault}[/coll/{coll_path}]/doc/{filename}        document
akb://{vault}[/coll/{coll_path}]/table/{name}          table
akb://{vault}[/coll/{coll_path}]/file/{uuid}           file
```

vault 루트에 있는 자원은 `/coll/{coll_path}` 구간이 빠진다. URI를 부모 collection으로 거슬러 올라가는 일은 순수한 문자열 연산이라, 부모 URI를 `akb_browse(uri=...)`에 그대로 넣으면 추가 조회 없이 형제 자원을 나열할 수 있다.

문서 frontmatter 예시는 다음과 같다.

```yaml
---
title: "Payment API v2 migration plan"
type: plan              # note | report | decision | spec | plan | session | task | reference
status: active          # draft | active | archived | superseded
tags: [payments, api]
domain: engineering
summary: "REST → gRPC transition plan."
depends_on: ["akb://eng/coll/specs/doc/payment-api-v2.md"]
related_to: ["akb://eng/coll/meetings/doc/2026-05-01-payments.md"]
---
```

### MCP 도구 카탈로그

README가 선별해 제시한 도구 목록은 다음과 같다. 전체 카탈로그는 MCP 클라이언트에서 `akb_help()`를 호출해 조회한다.

| 도구 | 설명 |
|---|---|
| `akb_list_vaults` / `akb_create_vault` | vault 관리 |
| `akb_put` / `akb_get` / `akb_update` / `akb_delete` | 문서 CRUD (Git commit과 인덱싱 포함) |
| `akb_put_file` / `akb_get_file` / `akb_delete_file` | 파일 첨부. 로컬 파일시스템이 필요해 프록시 쪽에서 처리한다 |
| `akb_create_table` / `akb_alter_table` / `akb_drop_table` / `akb_sql` | 표 형식 콘텐츠. 문서별 표와 SQL |
| `akb_browse` | 트리 순회 (collection에서 문서로) |
| `akb_search` / `akb_grep` | hybrid 검색 (dense와 BM25) / 리터럴 grep |
| `akb_drill_down` | 섹션 단위 조회 |
| `akb_relations` / `akb_link` / `akb_unlink` / `akb_graph` | 지식 그래프 |
| `akb_edit` / `akb_diff` / `akb_history` | 제자리 편집, diff, Git 이력 |
| `akb_grant` / `akb_revoke` / `akb_set_public` | 권한 경계. 사용자별, 조직별, 공개 |
| `akb_publish` / `akb_unpublish` | 공개 발행 |

에이전트 메모리와 세션 라이프사이클은 MCP 도구가 아니다. 전용 REST surface `/api/v1/agent-sessions`에 있고, 에이전트 자신의 SessionStart, PreCompact, SessionEnd 이벤트에 훅을 거는 라이프사이클 플러그인(`akb-claude-code`, `akb-cursor` 등)이 구동한다. 에이전트 자신의 메모리 vault인 `agent-memory-{username}`은 다른 vault와 똑같이 `akb_search`, `akb_browse`, `akb_get`으로 열람된다.

### 에이전트 플러그인

| 플러그인 | 기능 |
|---|---|
| `akb-wiki` | 로컬 파일, 웹 URL, GitHub PR/release/commit, Confluence 페이지, Jira 이슈를 구조화 문서로 vault에 수집한다. vault를 근거로 인용을 붙인 답변도 제공하며 이 경로는 read-only다 |
| `akb-sessions` | 코딩 세션을 구조화 노트로 남긴다. 세션 리포트와 함께 후속 과제, 배운 점, 아이디어, 결정 사항을 기록한다 |
| `akb-claude-code` | Claude Code 라이프사이클 브리지. 훅이 각 세션을 AKB 메모리 vault에 연결해 시작 시점에 선호와 최근 학습을 주입하고 종료 시점에 요약을 기록한다 |

설치는 Claude Code에서 `/plugin marketplace add dnotitia/akb`, Codex에서 `codex plugin marketplace add dnotitia/akb`다. 설치 절차와 인증 정보는 `plugins/skillpack-plugins.md`에 있다.

### vector store 드라이버 5종

hybrid 검색(dense와 BM25 sparse를 RRF로 융합)은 드라이버 인터페이스를 통과한다. 설정 시점에 다음 다섯 중 하나를 고른다.

| 드라이버 | 운영 형태 | RRF 융합 위치 | 특징 |
|---|---|---|---|
| `pgvector` (기본) | 애플리케이션 데이터와 같은 PostgreSQL 컨테이너 | 애플리케이션 쪽 | pgvector 이미지가 확장을 미리 설치한다. 드라이버가 별도 `vector_index` schema를 만들어 메인 `chunks` 테이블은 순수 PostgreSQL로 남는다. 운영할 외부 서비스가 없다 |
| `qdrant` | 별도 Qdrant 컨테이너 | Query API의 native RRF | 이미 Qdrant를 운영 중이거나 vector store를 PostgreSQL과 독립적으로 확장하려는 경우에 쓴다 |
| `seahorse-cloud` | 관리형 Seahorse Cloud 테이블 | 서버 쪽 native RRF | BFF 관리 API와 테이블별 데이터 플레인 호스트에 Bearer 인증으로 접속한다. 직접 운영할 인프라가 없고, 콘솔에서 테이블을 만들거나 드라이버가 자동 생성하게 둔다. BM25도 서버 쪽에서 처리한다 |
| `seahorse-db` | 자체 호스팅 SeahorseDB 클러스터 | 서버 쪽 native hybrid | Coral coordinator HTTP API로 접속한다. Coral, Writer, Reader, Redis, Kafka, sparse 임베딩 서버를 직접 운영해야 한다 |
| `seahorse-db-grpc` (실험적) | `seahorse-db`와 같은 Coral coordinator | 서버 쪽 | REST/JSONL 대신 gRPC로 통신한다. Coral이 axum과 tonic을 한 리스너에 합쳐 포트는 그대로이고 wire format만 바뀐다 |

`seahorse-db-grpc`는 JSON 파싱 경로와 INT64 부호 불일치, Arrow JSON 디코더 경계 사례 같은 함정을 typed protobuf 메시지와 Arrow IPC 스트리밍 결과로 바꾼다. REST 드라이버와 같은 25개 시나리오 hybrid E2E를 통과해 CRUD 동등성은 확인됐지만, 자체 QPS와 recall 벤치마크를 통과할 때까지는 프로덕션에서 REST 드라이버를 쓰라고 README가 권고한다.

임베딩 모델과 차원도 `embed_base_url`, `embed_model`, `embed_dimensions`로 완전히 교체 가능하며 코드에 하드코딩된 모델이 없다. 차원 제약은 드라이버마다 다르다.

| 드라이버 | 차원 상한 |
|---|---|
| `pgvector` + HNSW | 2,000 이하 권장. `halfvec`를 쓰면 4,000. 더 큰 모델은 exact scan으로 fallback |
| `qdrant` | 65,536 |
| Seahorse (cloud와 db) | 테이블에 정의한 차원까지 |

### `akb_sql`의 PostgreSQL native 격리

vault 격리는 PostgreSQL ACL이 강제한다. AKB 사용자마다 대응하는 PG role `akb_user_<uid>`가 있고, vault마다 세 개의 group role `akb_vault_<vid>_{reader,writer,admin}`이 있다. `akb_sql`은 사용자 SQL을 트랜잭션 안에서 `SET LOCAL ROLE`을 건 채 실행한다. 다른 vault를 참조하면 PG가 `42501`을 그대로 돌려준다. 금지 식별자를 찾는 애플리케이션 쪽 정규식 검사는 존재하지 않는다. 설계 문서는 `docs/designs/pg-native-rbac/`에 있다.

### 설정 모델

`config/app.yaml`과 `config/secret.yaml`이 런타임 설정의 유일한 원천이다. backend는 환경 변수를 하나도 읽지 않는다. 배포 시에는 `config/` 디렉토리를 `/etc/akb/`에 마운트한다.

기동 절차는 세 단계다.

```bash
# 1. Configure
cp config/app.yaml.example   config/app.yaml
cp config/secret.yaml.example config/secret.yaml
$EDITOR config/secret.yaml   # set embed_api_key (and jwt_secret for any non-local deploy)

# 2. Run
docker compose up -d

# 3. Open
open http://localhost:3000
```

### 임베딩 endpoint의 선택성

dense 검색을 쓰려면 OpenAI 호환 임베딩 endpoint가 필요하다. OpenAI, OpenRouter, 자체 호스팅 vLLM이나 TEI 모두 가능하다. 다만 README는 이것이 **엄격한 필수 조건은 아니라고 명시한다**. 임베딩 endpoint가 없거나 장애 중이면 `pgvector`와 `qdrant` 드라이버는 아무것도 반환하지 않는 대신 **BM25 전용 lexical 검색으로 degrade**한다. 예외는 `seahorse-db`로, sparse 경로가 서버 쪽에 있고 살아 있는 임베딩 단계와 구조적으로 결합돼 있어 BM25 전용 fallback을 지원하지 않는다.

### 선택 기능 3종

| 기능 | 기본값 | 동작 |
|---|---|---|
| LLM 기능 | 꺼짐 | `metadata_worker`가 외부 git 미러링으로 들여온 문서를 auto-tag할 때만 LLM을 쓴다. core CRUD와 검색은 LLM 없이 동작한다. `app.yaml`의 `llm_base_url`, `llm_model`과 `secret.yaml`의 `llm_api_key`로 켠다 |
| 이벤트 팬아웃 | PG outbox는 항상 기록 | `app.yaml`에 `redis_url`을 넣으면 `events_publisher` worker가 outbox를 Redis Stream `akb:events`로 흘려보내 외부 서비스가 `XREAD`나 consumer group으로 구독한다. 비워 두면 이벤트는 PG에 계속 쌓이고, Redis 없이 LISTEN/NOTIFY trigger 위에 SSE endpoint를 만들 수 있다 |
| 감사 로그 | 꺼짐 | `app.yaml`에 `audit.enabled: true`를 주면 MCP dispatch 지점에서 구조화된 append-only hash chain JSON Lines 로그를 남긴다 |

감사 로그는 모든 read, write, 인증 거부를 동일한 형식으로 기록한다. AKB는 producer 역할만 하고 감사 데이터를 저장하거나 조회하거나 보존하지 않는다. Splunk, QRadar, Elastic 같은 SIEM이 스트림을 수집하고 자체 컴플라이언스 규정에 따라 보존을 담당한다. 각 줄에는 단조 증가하는 `seq`와 `sha256(prev ‖ line)`이 붙어 줄이 빠지거나 변조됐는지 검증할 수 있고, 재기동 후에는 디스크에서 chain을 다시 이어받는다. `audit.bucket`을 지정하면 하루 단위로 rotate된 파일을 WORM 오브젝트 스토리지로 넘길 수 있다. Object Lock과 write-only 키로 프로비저닝하면 변경 불가능한 추적 기록이 된다. 로컬 버퍼는 업로드가 확인된 뒤에만 정리된다. 기록은 best-effort이며 서빙 경로로 예외를 던지지 않는다.

### 저장소 구성과 기술 스택

```
akb/
├── backend/                  # Python 3.14 / FastAPI / asyncpg / GitPython
│   ├── app/
│   │   ├── api/routes/       # REST endpoints
│   │   ├── services/         # Business logic + workers
│   │   └── db/               # PostgreSQL schema + migrations
│   ├── mcp_server/           # Streamable HTTP MCP server
│   └── tests/                # E2E shell tests
├── frontend/                 # React 19 + TypeScript + Vite + Tailwind
├── packages/
│   └── akb-mcp-client/       # stdio ↔ HTTP MCP proxy (npm: akb-mcp)
├── agents/                   # Reference Python agent runtime (think/act loop over MCP)
├── plugins/                  # Claude Code / Codex agent plugins
├── templates/                # Doc templates (ADR, PRD, runbook, …) and vault profiles
├── design-system/            # Frontend design system docs
├── config/
├── deploy/k8s/               # Generic kustomize base for Kubernetes
└── docker-compose.yaml       # 3-container local stack
```

| 영역 | 구성 |
|---|---|
| Backend | Python 3.14, FastAPI, Uvicorn, asyncpg, GitPython, MCP SDK |
| Database | PostgreSQL 16. 메인 DB는 확장이 필요 없고, 같은 pgvector 이미지가 선택적 `vector_index` schema를 호스팅한다 |
| Vector store | 드라이버 교체형. dense와 BM25 sparse의 RRF 융합, 임베딩 장애 시 BM25 전용 fallback |
| 이벤트 스트림 (선택) | PG `events` outbox와 Redis Streams 팬아웃 |
| 감사 로그 (선택) | MCP dispatch 지점의 hash chain append-only JSONL, 선택적 WORM S3 전달 |
| Frontend | React 19, TypeScript, Vite, Tailwind CSS v4, Radix UI |
| 인증 | JWT와 Personal Access Token(PAT) |
| MCP | backend는 Streamable HTTP, 로컬은 npm의 stdio 프록시 `akb-mcp` |

Kubernetes 배포는 `deploy/k8s/README.md`를 따른다. `deploy/k8s/`에는 범용 kustomize base가 있고, 레지스트리와 호스트명과 TLS issuer는 문서화된 환경 변수나 `deploy/k8s/internal/`의 운영자 전용 overlay로 넣는다. `deploy/k8s/deploy.sh`는 실행할 때마다 Docker 이미지에 명시 버전 태그 `:${VERSION}`과 `:latest`를 함께 붙여, 과거 빌드를 롤백용으로 계속 받을 수 있게 한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### LongMemEval-S 500문항

README가 제시하는 벤치마크는 LongMemEval의 short-context split이다. 500개의 long-context 질문에 문항당 약 50개 채팅 세션이 딸려 있다. AKB의 hybrid retrieval(dense와 BM25, source 단위 중복 제거)은 reranker 없이 Recall@5 = 98.4%를 기록했다.

| System | R@5 | n | Reranker | Source |
|---|---:|:---:|:---:|---|
| **AKB hybrid** | **98.4%** | 500 | no | this repo |
| MemPalace hybrid + rerank | 98.4% | 450 | yes | MemPalace |
| gbrain hybrid | 97.6% | 500 | no | gbrain-evals |
| gbrain vector | 97.4% | 500 | no | gbrain-evals |

방법론과 질문 유형별 분해, 한 번의 명령으로 재현하는 harness는 저장소의 `eval/longmemeval/` 디렉토리에 있다고 README가 밝히지만, 현재 raw는 README 스텁이라 그 디렉토리의 내용은 보유 자료에 없다. 질문 유형별 수치와 reranker ablation 결과는 확인할 수 없다.

임베딩 모델이 시스템마다 다르다는 점도 README가 직접 경고한다. AKB는 `bge-m3@1024`를 썼다. 따라서 이 표는 retrieval 파이프라인 전체를 놓고 비교하는 stack 수준 비교이지 모델 대 모델의 동일 조건 비교가 아니다.

### 재현 가능성

AKB는 gbrain-evals와 MemPalace가 공개한 것과 같은 데이터셋에서 자체 runner를 제공한다. 이 점에서 서로 대조 가능한 공개 라인을 하나 더 만든 셈이다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **라이선스 임계값**: BUSL-1.1의 Additional Use Grant는 좌석 수 임계값 아래에서만 상업 프로덕션 사용을 허용한다. 집계 배포 기준 Named Seat 100석 미만이면 상업 여부와 무관하게 프로덕션 사용이 무료다. Named Seat는 배포별 `users` 테이블의 서로 다른 사람 계정을 뜻하며 서비스 계정과 90일 이상 비활성 계정은 제외한다. 100석 이상이거나, 수정 여부와 무관하게 AKB를 호스팅 서비스, 온프레미스 제품, 임베디드 구성요소, 리브랜딩 배포로 제3자에게 제공하면 좌석 수와 관계없이 상업 라이선스가 필요하다. 각 버전은 최초 공개 4년 뒤 Apache License 2.0으로 자동 전환된다.
- **상표 제약**: "AKB", "Dnotitia", "Seahorse"는 Dnotitia, Inc.의 상표이며 소프트웨어 라이선스가 상표권까지 주지는 않는다. fork와 파생 저작물은 다른 이름으로 배포해야 한다.
- **벤치마크 범위**: 공개된 수치는 LongMemEval-S 한 데이터셋뿐이다. 질문 유형별 분해와 재현 harness는 `eval/longmemeval/`에 있다고만 언급될 뿐 README 본문에 수치가 실려 있지 않다. multi-hop, temporal, agentic 성격의 다른 벤치마크 결과나 실제 프로덕션 사용 사례도 README에는 없다.
- **임베딩 모델 종속성**: 결과는 `bge-m3@1024` 기준이다. 모델을 바꿨을 때 Recall@5가 어떻게 움직이는지는 공개되지 않았다. `pgvector`와 HNSW 조합은 `embed_dimensions`가 2,000을 넘으면(`halfvec`로는 4,000) exact scan으로 내려가므로 큰 모델에서 지연이 늘어난다.
- **드라이버별 동작 차이**: RRF 융합 위치가 드라이버마다 다르고(`pgvector`는 애플리케이션 쪽, 나머지는 서버 쪽), `seahorse-db`만 BM25 전용 fallback을 지원하지 않는다. 드라이버별 지연, 비용, 정확도 차이는 수치로 공개되지 않았다.
- **실험 단계 드라이버**: `seahorse-db-grpc`는 REST 드라이버와 CRUD 동등성은 확인했지만 프로덕션 규모 노출을 아직 겪지 않았고 자체 QPS와 recall 벤치마크도 통과하지 않았다. README가 직접 프로덕션에서 REST를 쓰라고 권고한다.
- **자체 호스팅 부담**: `seahorse-db` 드라이버를 고르면 Coral, Writer, Reader, Redis, Kafka, sparse 임베딩 서버를 직접 운영해야 한다. 기본 경로인 docker compose 3-container도 라이트 사용자에게는 진입 장벽이다.
- **데모 인스턴스의 성격**: 공개 데모는 매주 초기화되는 폐기용이며 가용성, 프라이버시, 데이터 보존을 보장하지 않는다. 실제 사용은 자체 호스팅이 전제다.
- **감사 로그의 best-effort 기록**: 감사 기록은 서빙 경로로 예외를 던지지 않는 best-effort 방식이라, 장애 상황에서 유실된 줄이 생길 수 있다. hash chain은 유실을 사후에 검출할 뿐 방지하지는 않는다.
- **보유 자료의 범위**: raw가 README 스텁으로 경량화되면서 backend 소스, CHANGELOG, 테스트 스크립트가 보유 자료에서 빠졌다. 내부 구현 세부(워커 이름, 서비스 파일 경로, 테스트 개수, health endpoint 사양, 버전별 버그 수정 내역)는 현재 근거로 확인할 수 없다.

## 6. 관련 연구 (Related Work)

- **MemPalace** ([mempalace/mempalace](https://github.com/mempalace/mempalace)): hybrid에 rerank를 더해 LongMemEval-S에서 98.4%(n=450). AKB는 reranker 없이 같은 수치를 500문항에서 달성했다.
- **gbrain**: LongMemEval-S에서 hybrid 97.6%, vector 97.4%. AKB와 같은 에이전트 메모리 범주다.
- **gbrain-evals** ([garrytan/gbrain-evals](https://github.com/garrytan/gbrain-evals)): 위 두 수치의 출처. AKB는 같은 데이터셋에서 자체 runner를 공개해 이 비교 라인에 합류했다.
- **LongMemEval** ([xiaowu0162/LongMemEval](https://github.com/xiaowu0162/LongMemEval)): 평가의 기반 데이터셋. short-context split은 500문항이며 문항당 약 50개 세션이 붙는다.
- **MCP (Model Context Protocol)**: Anthropic의 표준. AKB는 Streamable HTTP 서버와 stdio 프록시를 모두 지원한다.
- **Confluence, Notion**: README가 직접 지목한 대체 대상. 사람이 UI를 클릭하는 전제 위에 만들어졌다는 점을 차이로 든다.

## 7. 용어집 (Glossary)

- **AKB**: Agent Knowledge Base. Dnotitia가 공개한 본 시스템.
- **MCP (Model Context Protocol)**: LLM 에이전트와 외부 도구, 리소스 사이의 통신 표준.
- **Streamable HTTP**: MCP의 HTTP 기반 transport. stdio transport와 대비된다.
- **`akb-mcp` 프록시**: `packages/akb-mcp-client/`에 있는 stdio와 HTTP 사이의 브리지. npm에 배포되며 MIT 라이선스다.
- **Vault**: Git bare repo 한 개. 접근 제어와 물리적 격리의 단위.
- **Collection**: vault 안의 디렉토리. 문서를 주제별로 묶는다.
- **AKB URI**: `akb://{vault}[/coll/{coll}]/{doc|table|file}/{...}` 형식의 위치 인식 핸들. 모든 도구 입력과 relations 저장에 쓰인다.
- **Bare repo**: working tree 없이 `.git` 내용만 가진 저장소. AKB는 vault마다 하나씩 둔다.
- **BM25**: bag-of-words 기반 sparse lexical retrieval 기법. AKB는 corpus 쪽 sparse vector와 vocab을 PostgreSQL에 둔다.
- **RRF (Reciprocal Rank Fusion)**: dense 순위와 sparse 순위를 순위 역수의 합으로 합치는 표준 hybrid 기법.
- **pgvector**: PostgreSQL의 vector 확장. AKB는 별도 `vector_index` schema에 두어 메인 `chunks` 테이블을 순수 PostgreSQL로 유지한다.
- **HNSW**: Hierarchical Navigable Small World. pgvector의 근사 최근접 이웃 인덱스.
- **bge-m3**: 본 벤치마크에서 쓴 임베딩 모델. 차원은 1,024다.
- **Seahorse Cloud**: Dnotitia의 관리형 vector 테이블 서비스. BFF 관리 API와 Bearer 인증을 쓴다.
- **SeahorseDB**: 자체 호스팅 가능한 Seahorse 클러스터. Coral coordinator가 진입점이다.
- **Coral**: SeahorseDB의 coordinator. REST/JSONL과 gRPC를 한 리스너에서 함께 받는다.
- **`vector_indexed_at`**: `chunks` 테이블의 컬럼. `NULL`로 되돌리면 indexing worker가 해당 행을 다시 인덱싱한다. vector store 전체 손실에서 복구하는 수단이다.
- **`metadata_worker`**: 외부 git 미러링으로 들여온 문서를 LLM으로 auto-tag하는 워커. core CRUD와 검색과는 분리돼 있다.
- **`events_publisher`와 `akb:events`**: PG `events` outbox를 Redis Stream으로 흘려보내는 워커와 그 스트림 이름. 외부 consumer가 `XREAD`나 consumer group으로 구독한다.
- **`42501`**: PostgreSQL의 권한 부족 오류 코드. 권한 밖 vault를 참조한 사용자 SQL이 받는 응답이다.
- **`SET LOCAL ROLE`**: 트랜잭션 안에서만 다른 role로 권한을 바꾸는 PostgreSQL 구문. 사용자 SQL 실행의 진입점이다.
- **Named Seat**: BUSL-1.1 Additional Use Grant의 과금 단위. 배포별 `users` 테이블의 서로 다른 사람 계정이며 서비스 계정과 90일 이상 비활성 계정은 제외한다.
- **BUSL-1.1 (Business Source License 1.1)**: 소스 공개형 라이선스. 좌석 수 임계값 아래의 프로덕션 사용을 허용하고 최초 공개 4년 뒤 Apache License 2.0으로 전환된다.
- **WORM (Write Once Read Many)**: 한 번 쓰면 수정할 수 없는 저장 방식. 감사 로그를 Object Lock 버킷에 넘길 때 쓴다.
- **PAT (Personal Access Token)**: JWT와 함께 쓰는 AKB의 인증 수단.
- **LongMemEval-S**: LongMemEval의 short-context split. 500문항이며 문항당 약 50개 세션이 붙는다.
