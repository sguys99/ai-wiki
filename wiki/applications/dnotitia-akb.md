---
title: "AKB: Agent Knowledge Base"
type: repo
year: 2026
category: applications
raw_path: raw/repos/dnotitia-akb.md
raw_filename: "dnotitia-akb.md"
source: dnotitia-akb.md
source_collection: external
org: "dnotitia"
repo: "AKB"
url: "https://github.com/dnotitia/AKB"
license: "BUSL-1.1 (backend/frontend), MIT (akb-mcp proxy)"
tags: [agent-memory, mcp, knowledge-base, hybrid-search, git-backed, rag-infrastructure, postgres, pgvector, qdrant, seahorse, bm25, rrf, knowledge-graph, longmemeval, audit-log, rbac]
---

# AKB: Agent Knowledge Base

## 요약

AKB는 Dnotitia가 공개한 AI 에이전트용 조직 메모리 저장소다. Git bare repo와 PostgreSQL 16 위에 지식베이스를 올리고, 그 전체를 MCP(Model Context Protocol)로 노출해 에이전트가 사람의 화면을 거치지 않고 직접 문서를 읽고 쓰게 한다. README는 이 시스템을 Confluence와 Notion의 drop-in 대체재로 규정한다.

검색은 dense 벡터 검색과 BM25 키워드 검색을 RRF로 합친 hybrid retrieval을 단일 호출로 제공한다. LongMemEval의 short-context split 500문항에서 reranker 없이 Recall@5 = 98.4%를 기록했다. 같은 데이터셋에서 reranker를 쓴 MemPalace와 같은 수치이고, gbrain의 hybrid 구성보다 0.8%p 높다.

설계 철학은 "core stays small"이다. 지식을 요약하거나 정리하는 자동화를 내장하지 않고, 모든 write가 이벤트를 발행하게 만든 뒤 그 판단을 외부 consumer에 맡긴다. 저장소가 제공하는 기본 계약은 read/write 저장소까지이며 그 위의 정리 작업은 운영자가 붙인다.

## 배경

### 사람이 클릭하는 도구와 에이전트가 호출하는 도구

기존 지식 관리 도구는 사람이 화면을 클릭한다는 전제 위에 만들어졌다. README는 에이전트가 필요로 하는 형태가 그와 다르다고 보고 네 가지를 든다.

- 구조화된 문서
- semantic 검색과 keyword 검색을 한 번의 호출로 끝내는 인터페이스
- 명시적으로 선언된 relations
- 전체 버전 이력

AKB는 이 네 가지를 충족하는 도구 집합을 Git bare repo와 PostgreSQL hybrid 인덱스 위에 얹었다. 에이전트가 보는 것은 웹 화면이 아니라 `akb_put`, `akb_search`, `akb_browse`, `akb_relations` 같은 도구 이름의 목록이다.

### 자동화를 내장하지 않는 선택

AKB는 지식을 스스로 정리하는 기능을 넣지 않는다. README는 이 결정을 "core stays small; flexibility comes from extension, not built-in automation"으로 표현한다. 내장하지 않은 것을 구체적으로 열거하기까지 한다.

- consolidator: 흩어진 문서를 하나로 합치는 기능
- summariser: 문서를 요약해 다시 저장하는 기능
- knowledge gardener: 지식베이스를 주기적으로 손보는 기능

대신 모든 write가 구조화된 이벤트를 발행하게 만들고, 그 이벤트를 받아 무엇을 할지는 운영자가 정하게 한다. 저장소가 보증하는 기본 계약은 read/write 저장소까지이며, 지식을 어떻게 다룰지에 대한 판단은 바깥에 둔다는 뜻이다. 조직마다 정리 기준이 다르므로 그 판단을 코어에 박아 넣지 않겠다는 선택이다.

### MCP를 전면에 둔 구성

MCP는 LLM 에이전트와 외부 도구, 리소스 사이의 통신 표준이다. AKB는 backend 자체를 MCP 서버로 만들어 Streamable HTTP transport로 노출하고, 로컬 클라이언트를 위해 stdio 프록시를 따로 배포한다. 그래서 붙는 클라이언트의 범위가 넓다.

| 접속 경로 | 대상 클라이언트 |
|---|---|
| Streamable HTTP 직결 | Claude Code(CLI, VS Code, JetBrains), Claude Desktop(macOS, Windows) |
| stdio 프록시 `akb-mcp` 경유 | Cursor, Windsurf, Cline, Continue |
| `POST /mcp/`에 Bearer 토큰 | 직접 구현한 커스텀 에이전트 |

저장소는 공개 데모도 함께 운영한다. `akb-demo.agent.seahorse.dnotitia.ai`에서 가상 조직의 소규모 지식베이스를 가입 없이 열람할 수 있다. 제품 문서, 사내 핸드북, 에이전트 세션 노트, 엔지니어링 wiki가 URI graph로 이어져 있다.

데모를 자신의 에이전트에 붙여 보는 경로도 열려 있다. 아무 이메일로 가입한 뒤 `akb-mcp` 프록시를 데모 호스트의 `/mcp/` 경로로 향하게 하면 된다. 다만 README는 이 인스턴스가 매주 초기화되는 폐기용이며 가용성과 프라이버시와 데이터 보존을 전혀 보장하지 않는다고 못박는다. 실제 데이터나 민감 정보를 넣지 말고 모든 write를 공개되고 곧 사라지는 것으로 다루라는 경고가 붙어 있다. 실사용은 세 컨테이너 자체 호스팅이 전제다.

### 라이선스 구조

AKB는 완전한 오픈소스가 아니라 소스 공개형 라이선스를 쓴다. backend와 frontend와 배포 매니페스트는 Business Source License 1.1(BUSL-1.1)이고, npm 프록시 `akb-mcp`만 MIT로 분리돼 있다. 프록시를 MIT로 뗀 이유는 어떤 에이전트 클라이언트에도 제약 없이 embed할 수 있게 하기 위해서다.

BUSL-1.1의 Additional Use Grant는 좌석 수 임계값 아래에서 상업 여부와 무관하게 프로덕션 사용을 허용한다. 각 버전은 최초 공개 4년 뒤 Apache License 2.0으로 자동 전환된다.

| 구분 | 조건 |
|---|---|
| 무료 프로덕션 사용 | 집계 배포 기준 Named Seat 100석 미만 |
| Named Seat 정의 | 배포별 `users` 테이블의 서로 다른 사람 계정. 서비스 계정과 90일 이상 비활성 계정 제외 |
| 상업 라이선스 필요 | Named Seat 100석 이상 |
| 상업 라이선스 필요 | 수정 여부와 무관하게 호스팅 서비스, 온프레미스 제품, 임베디드 구성요소, 리브랜딩 배포로 제3자에게 제공 (좌석 수 무관) |
| 자동 전환 | 각 버전 최초 공개 4년 뒤 Apache License 2.0 |

상표는 라이선스와 분리돼 있다. "AKB", "Dnotitia", "Seahorse"는 Dnotitia, Inc.의 상표이고 소프트웨어 라이선스가 상표권까지 주지는 않는다. fork와 파생 저작물은 다른 이름으로 배포해야 한다.

## 핵심 개념

### vault

vault는 Git bare repo 한 개를 뜻하며 접근 제어와 물리적 격리의 단위다. bare repo는 작업 디렉토리 없이 `.git` 내용만 가진 저장소를 말한다. 권한도 백업도 삭제도 vault 단위로 움직이므로, 조직에서 부서나 프로젝트를 나누는 경계가 곧 vault 경계가 된다.

### collection과 document

collection은 vault 안의 디렉토리로 문서를 주제별로 묶는다. document는 Markdown 본문에 YAML frontmatter를 붙인 파일이며, 사람이 읽기 좋은 형식이 아니라 에이전트가 읽고 쓰기 좋은 형식으로 최적화했다는 점이 설계 의도다.

### AKB URI

AKB URI는 vault 안의 모든 자원에 붙는 위치 인식 핸들이다. 0.3.0부터 canonical 핸들로 자리 잡았고, 모든 도구 입력과 relations 저장이 이 URI를 쓴다. 문자열 자체에 위치가 들어 있다는 점이 핵심이다.

### relations

relations는 frontmatter에 선언하는 문서 사이의 연결이다. `depends_on`, `related_to`, `implements` 세 가지가 명시적 지식 그래프를 만든다. 링크가 본문 안에 묻혀 있지 않고 메타데이터로 올라와 있어서 그래프 조회 도구가 바로 읽는다.

### hybrid retrieval

hybrid retrieval은 의미 기반 검색과 어휘 기반 검색을 함께 돌려 결과를 합치는 방식이다. AKB는 dense 벡터 검색과 BM25를 RRF로 융합하고 source 단위 중복 제거를 적용한 뒤 한 번의 호출로 반환한다. BM25는 bag-of-words 기반의 sparse lexical retrieval 기법이고, RRF는 두 순위 목록을 순위의 역수 합으로 합치는 표준 융합 기법이다.

### driver-pluggable vector store

vector store는 진실의 원천이 아니라 파생 인덱스다. PostgreSQL이 chunk text와 메타데이터와 BM25 vocab을 들고 있고, vector store는 dense 임베딩과 corpus 쪽 sparse vector만 담는다. 이 분리 덕분에 vector store 구현을 설정 한 줄로 갈아 끼울 수 있고, 통째로 잃어도 PostgreSQL에서 복구된다.

### MCP transport 두 가지

transport는 에이전트와 서버가 실제로 메시지를 주고받는 통로를 뜻한다. AKB는 두 가지를 함께 지원한다.

Streamable HTTP는 서버가 HTTP 위에서 직접 응답하는 방식이고, stdio는 클라이언트가 로컬 프로세스와 표준 입출력으로 대화하는 방식이다. backend는 Streamable HTTP만 말하므로, stdio를 요구하는 클라이언트는 npm 패키지 `akb-mcp`를 사이에 두고 붙는다. 이 프록시는 stdio와 HTTP 사이를 잇는 얇은 계층이며 backend와 별도로 MIT 라이선스로 배포된다.

### Named Seat

Named Seat는 BUSL-1.1이 무료 사용 범위를 재는 단위다. 배포별 `users` 테이블에 들어 있는 서로 다른 사람 계정을 센다. 서비스 계정과 90일 이상 비활성 계정은 제외되므로, 자동화 목적으로 만든 계정이나 오래전에 떠난 구성원이 좌석 수를 밀어 올리지 않는다. 이 정의가 라이선스 판단의 기준이 되기 때문에 도입 검토에서 먼저 확인할 항목이다.

## 방법

### 3-layer 저장 구조

시스템은 접근 계층, 코어 서비스, 저장 계층 세 단계로 나뉜다.

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

저장 계층에서 역할이 명확히 갈린다. Git bare repo는 문서 원본과 버전 이력을 보관하고, PostgreSQL은 chunk text와 메타데이터와 BM25 vocab을 보유하며, vector store는 검색 가속을 위한 파생 인덱스만 담는다.

| 저장소 | 담는 것 | 성격 |
|---|---|---|
| Git bare repo | 문서 원본, 전체 버전 이력 | vault당 한 개 |
| PostgreSQL 16 | chunk text, 메타데이터, BM25 vocab | 진실의 원천 |
| vector store | dense 임베딩, corpus 쪽 sparse vector | 파생 인덱스. 재생성 가능 |

복구 절차가 단순하다는 점이 이 구조의 실질적 이점이다. vector store 전체를 잃어도 `chunks.vector_indexed_at`을 `NULL`로 되돌리면 indexing worker가 해당 행을 다시 집어 인덱스를 채운다. 메인 DB는 확장이 필요 없고, 같은 pgvector 이미지가 선택 사항인 `vector_index` schema를 함께 호스팅한다.

### AKB URI 체계

URI는 다섯 가지 형태를 갖는다.

```
akb://{vault}                                          vault root (browse target)
akb://{vault}/coll/{coll_path}                         collection (browse target)
akb://{vault}[/coll/{coll_path}]/doc/{filename}        document
akb://{vault}[/coll/{coll_path}]/table/{name}          table
akb://{vault}[/coll/{coll_path}]/file/{uuid}           file
```

vault 루트에 놓인 자원은 `/coll/{coll_path}` 구간이 빠진다. 이 설계에서 얻는 이득은 탐색 비용이다. URI를 부모 collection으로 거슬러 올라가는 일이 순수한 문자열 연산이라, 부모 URI를 `akb_browse(uri=...)`에 그대로 넣으면 추가 조회 없이 형제 자원을 나열할 수 있다. 즉 에이전트가 위치를 파악하려고 서버에 한 번 더 물을 필요가 없다.

### 문서 형식

문서는 Markdown 본문 앞에 YAML frontmatter를 둔다. `type`과 `status`는 열거값으로 고정돼 있어서 에이전트가 문서의 성격과 생애주기를 기계적으로 판단할 수 있다.

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

| 필드 | 값 |
|---|---|
| `type` | `note`, `report`, `decision`, `spec`, `plan`, `session`, `task`, `reference` |
| `status` | `draft`, `active`, `archived`, `superseded` |
| `depends_on`, `related_to` | AKB URI 배열. 지식 그래프의 간선이 된다 |
| `tags`, `domain`, `summary` | 분류와 요약 메타 |

### MCP 도구 카탈로그

README가 선별해 제시한 도구는 다음과 같다. 전체 목록은 MCP 클라이언트에서 `akb_help()`를 호출해 조회한다.

| 도구 | 설명 |
|---|---|
| `akb_list_vaults` / `akb_create_vault` | vault 관리 |
| `akb_put` / `akb_get` / `akb_update` / `akb_delete` | 문서 CRUD. Git commit과 인덱싱을 함께 수행한다 |
| `akb_put_file` / `akb_get_file` / `akb_delete_file` | 파일 첨부. 로컬 파일시스템이 필요해 프록시 쪽에서 처리한다 |
| `akb_create_table` / `akb_alter_table` / `akb_drop_table` / `akb_sql` | 표 형식 콘텐츠. 문서별 표와 SQL 실행 |
| `akb_browse` | 트리 순회. collection에서 문서로 내려간다 |
| `akb_search` / `akb_grep` | hybrid 검색과 리터럴 grep |
| `akb_drill_down` | 섹션 단위 조회 |
| `akb_relations` / `akb_link` / `akb_unlink` / `akb_graph` | 지식 그래프 조회와 편집 |
| `akb_edit` / `akb_diff` / `akb_history` | 제자리 편집, diff, Git 이력 |
| `akb_grant` / `akb_revoke` / `akb_set_public` | 권한 경계. 사용자별, 조직별, 공개 |
| `akb_publish` / `akb_unpublish` | 공개 발행 |

도구 이름이 CRUD, 검색, 그래프, 이력, 권한, 발행으로 나뉘어 있다는 점이 눈에 띈다. 사람이라면 화면 메뉴에서 찾을 기능이 전부 이름 붙은 호출 단위로 평평하게 펼쳐져 있다.

### backend와 프록시의 역할 분리

파일 첨부 도구만 backend가 아니라 프록시 쪽에서 처리된다. `akb_put_file`, `akb_get_file`, `akb_delete_file` 세 도구가 여기 해당하며, 이유는 로컬 파일시스템 접근이 필요하기 때문이다.

에이전트가 실행되는 기계의 디스크는 원격 backend가 볼 수 없다. 따라서 파일을 읽고 쓰는 일은 그 기계에서 함께 실행되는 stdio 프록시가 맡는다. 나머지 도구는 모두 backend가 처리한다.

이 분리는 두 가지를 얻는다. backend는 HTTP 요청만 받는 상태로 남아 배포 위치와 무관하게 같은 도구 목록을 제공하고, 파일 입출력은 실제로 파일이 있는 쪽에서만 일어난다.

### 에이전트 세션과 메모리 vault

에이전트 메모리와 세션 라이프사이클은 MCP 도구가 아니다. 전용 REST surface `/api/v1/agent-sessions`에 있고, 라이프사이클 플러그인이 에이전트 자신의 SessionStart, PreCompact, SessionEnd 이벤트에 훅을 걸어 구동한다.

에이전트 자신의 메모리 vault는 `agent-memory-{username}` 이름으로 만들어지며, 다른 vault와 똑같이 `akb_search`, `akb_browse`, `akb_get`으로 열람된다. 메모리를 특별한 저장소로 따로 두지 않고 일반 vault 하나로 취급하는 구성이다.

### 에이전트 플러그인

raw MCP 접근 외에 Claude Code와 Codex용 플러그인 세 종을 함께 배포한다. 자주 쓰는 vault 워크플로를 감싸 놓은 것이다.

| 플러그인 | 기능 |
|---|---|
| `akb-wiki` | 로컬 파일, 웹 URL, GitHub PR과 release와 commit, Confluence 페이지, Jira 이슈를 구조화 문서로 vault에 수집한다. vault를 근거로 인용을 붙인 답변도 제공하며 이 경로는 read-only다 |
| `akb-sessions` | 코딩 세션을 구조화 노트로 남긴다. 세션 리포트와 함께 후속 과제, 배운 점, 아이디어, 결정 사항을 기록한다 |
| `akb-claude-code` | Claude Code 라이프사이클 브리지. 훅이 각 세션을 AKB 메모리 vault에 연결해 시작 시점에 선호와 최근 학습을 주입하고 종료 시점에 요약을 기록한다 |

설치는 마켓플레이스 등록 한 줄로 끝난다.

```
/plugin marketplace add dnotitia/akb        # Claude Code
codex plugin marketplace add dnotitia/akb   # Codex
```

### hybrid 검색의 동작

검색은 `akb_search` 호출 한 번으로 끝난다. 에이전트가 의미 기반 검색과 키워드 검색을 따로 부르고 결과를 직접 합칠 필요가 없다는 뜻이다.

내부 처리는 세 단계로 이어진다.

| 단계 | 처리 |
|---|---|
| dense 검색 | 질의를 임베딩으로 바꿔 vector store에서 의미가 가까운 chunk를 찾는다 |
| BM25 검색 | 어휘 일치 기준으로 chunk를 찾는다. corpus 쪽 sparse vector와 vocab을 쓴다 |
| RRF 융합과 중복 제거 | 두 순위 목록을 순위 역수의 합으로 합치고 source 단위로 중복을 제거한다 |

두 검색을 함께 쓰는 이유는 서로의 약점이 다르기 때문이다. dense 검색은 표현이 달라도 뜻이 같으면 찾아내지만 고유명사나 식별자처럼 정확한 문자열이 중요한 질의에서 흔들린다. BM25는 반대로 문자열이 정확히 겹칠 때 강하고 표현이 바뀌면 놓친다. RRF는 두 목록의 순위만 보고 합치므로 점수 척도를 맞출 필요가 없다.

source 단위 중복 제거가 붙는 이유는 같은 문서에서 잘린 여러 chunk가 상위를 채우는 상황을 막기 위해서다. Recall@5처럼 상위 몇 개만 보는 지표에서는 이 처리가 결과 품질에 직접 영향을 준다.

리터럴 검색이 필요하면 `akb_grep`이 따로 있고, 문서 안에서 특정 구간만 필요하면 `akb_drill_down`이 섹션 단위로 반환한다. 검색 도구가 하나로 뭉뚱그려져 있지 않다.

### vector store 드라이버 5종

hybrid 검색은 드라이버 인터페이스를 통과한다. 설정 시점에 다섯 중 하나를 고르며, 드라이버를 바꿔도 메인 DB의 schema migration은 필요 없다.

| 드라이버 | 운영 형태 | RRF 융합 위치 | 특징 |
|---|---|---|---|
| `pgvector` (기본) | 애플리케이션 데이터와 같은 PostgreSQL 컨테이너 | 애플리케이션 쪽 | pgvector 이미지가 확장을 미리 설치한다. 드라이버가 별도 `vector_index` schema를 만들어 메인 `chunks` 테이블은 순수 PostgreSQL로 남는다. 운영할 외부 서비스가 없다 |
| `qdrant` | 별도 Qdrant 컨테이너 | Query API의 native RRF | 이미 Qdrant를 운영 중이거나 vector store를 PostgreSQL과 독립적으로 확장하려는 경우에 쓴다 |
| `seahorse-cloud` | 관리형 Seahorse Cloud 테이블 | 서버 쪽 native RRF | BFF 관리 API와 테이블별 데이터 플레인 호스트에 Bearer 인증으로 접속한다. 직접 운영할 인프라가 없고 BM25도 서버 쪽에서 처리한다 |
| `seahorse-db` | 자체 호스팅 SeahorseDB 클러스터 | 서버 쪽 native hybrid | Coral coordinator HTTP API로 접속한다. Coral, Writer, Reader, Redis, Kafka, sparse 임베딩 서버를 직접 운영해야 한다 |
| `seahorse-db-grpc` (실험적) | `seahorse-db`와 같은 Coral coordinator | 서버 쪽 | REST/JSONL 대신 gRPC로 통신한다. Coral이 axum과 tonic을 한 리스너에 합쳐 포트는 그대로이고 wire format만 바뀐다 |

gRPC 드라이버가 노리는 것은 JSON 파싱 경로에서 나오는 함정의 제거다. INT64 부호 불일치나 Arrow JSON 디코더의 경계 사례 같은 문제를 typed protobuf 메시지와 Arrow IPC 스트리밍 결과로 대체한다. REST 드라이버와 같은 25개 시나리오 hybrid E2E를 통과해 CRUD 동등성은 확인됐지만, 자체 QPS와 recall 벤치마크를 통과할 때까지는 프로덕션에서 REST 드라이버를 쓰라고 README가 직접 권고한다.

임베딩 모델과 차원도 교체 가능하다. `embed_base_url`, `embed_model`, `embed_dimensions` 세 설정으로 지정하며 코드에 하드코딩된 모델이 없다. 다만 차원 상한은 드라이버마다 다르다.

| 드라이버 | 차원 상한 |
|---|---|
| `pgvector` + HNSW | 2,000 이하 권장. `halfvec`를 쓰면 4,000. 더 큰 모델은 exact scan으로 fallback |
| `qdrant` | 65,536 |
| Seahorse (cloud와 db) | 테이블에 정의한 차원까지 |

HNSW는 pgvector의 근사 최근접 이웃 인덱스다. 차원이 상한을 넘으면 인덱스를 못 쓰고 전수 스캔으로 내려가므로 응답 지연이 늘어난다.

### 드라이버 전환 절차

드라이버 교체는 설정 편집으로 끝난다. 메인 DB에 schema migration을 걸 필요가 없다.

```bash
# Default flow targets pgvector.
docker compose up

# Qdrant:
docker compose -f docker-compose.yaml -f docker-compose.qdrant.yaml up
$EDITOR config/app.yaml     # vector_store_driver: qdrant
                            # vector_url: http://qdrant:6333

# Seahorse Cloud (managed; full guide in docs/vector-store-seahorse.md):
docker compose up           # no extra container needed
$EDITOR config/app.yaml     # vector_store_driver: seahorse-cloud
                            # seahorse_cloud_tenant_uuid: <your tenant>
                            # seahorse_cloud_table_name: <your table>
$EDITOR config/secret.yaml  # seahorse_cloud_token: shsk_<...>

# SeahorseDB (self-hosted cluster reached via the Coral coordinator):
docker compose up           # run the SeahorseDB stack separately
$EDITOR config/app.yaml     # vector_store_driver: seahorse-db
                            # seahorsedb_coordinator_url: http://localhost:3003
                            # seahorsedb_table_name: akb_chunks
```

드라이버마다 추가로 준비할 것이 다르다. `qdrant`는 compose 파일을 하나 더 얹어 컨테이너를 띄우고, `seahorse-cloud`는 컨테이너 없이 테넌트와 테이블 정보와 토큰만 넣으며, `seahorse-db`는 SeahorseDB 스택을 별도로 올린 뒤 Coral coordinator 주소를 가리킨다. Seahorse Cloud의 전체 설정 절차는 저장소의 `docs/vector-store-seahorse.md`가 가입부터 토큰 발급과 schema 정의까지 다룬다.

### 임베딩 endpoint의 선택성

dense 검색을 쓰려면 OpenAI 호환 임베딩 endpoint가 필요하다. OpenAI, OpenRouter, 자체 호스팅 vLLM이나 TEI 모두 가능하다. 그러나 README는 이것이 엄격한 필수 조건이 아니라고 명시한다.

임베딩 endpoint가 없거나 장애 중이면 `pgvector`와 `qdrant` 드라이버는 아무것도 반환하지 않는 대신 BM25 전용 lexical 검색으로 degrade한다. 즉 dense 경로는 처음부터 끝까지 선택 사항이다. 예외는 `seahorse-db`인데, sparse 경로가 서버 쪽에 있고 살아 있는 임베딩 단계와 구조적으로 결합돼 있어 BM25 전용 fallback을 지원하지 않는다.

### `akb_sql`의 PostgreSQL native 격리

`akb_sql`은 사용자가 SQL을 직접 실행하게 하는 도구다. 여기서 생기는 위험은 권한 밖 vault의 데이터를 조회하는 시도인데, AKB는 이를 애플리케이션 쪽 정규식 검사로 막지 않는다. 금지 식별자를 찾아내는 검사 자체가 존재하지 않는다.

대신 PostgreSQL의 권한 체계를 그대로 쓴다.

| 구성 요소 | 역할 |
|---|---|
| `akb_user_<uid>` | AKB 사용자마다 대응하는 PG role |
| `akb_vault_<vid>_{reader,writer,admin}` | vault마다 만드는 세 개의 group role |
| `SET LOCAL ROLE` | 트랜잭션 안에서만 권한을 전환하는 구문. 사용자 SQL 실행의 진입점 |
| `42501` | 권한 부족을 뜻하는 PostgreSQL 오류 코드. 다른 vault를 참조하면 그대로 반환된다 |

`akb_sql`은 사용자 SQL을 트랜잭션 안에서 `SET LOCAL ROLE`을 건 채 실행한다. 권한 밖 객체를 건드리면 애플리케이션이 판단하기 전에 데이터베이스가 먼저 거절한다. 검사 로직을 직접 짜지 않으니 우회 패턴을 뒤늦게 발견해 패치를 덧붙이는 일도 줄어든다. 설계 문서는 저장소의 `docs/designs/pg-native-rbac/`에 있다.

### 설정 모델

`config/app.yaml`과 `config/secret.yaml`이 런타임 설정의 유일한 원천이다. backend는 환경 변수를 하나도 읽지 않는다. 배포 시에는 `config/` 디렉토리를 `/etc/akb/`에 마운트한다.

로컬 기동은 세 단계로 끝난다.

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

기본 스택은 PostgreSQL with pgvector, backend, frontend 세 컨테이너다.

### 선택 기능

AKB는 세 가지 기능을 선택 사항으로 둔다. 셋 다 끄고도 core CRUD와 검색은 동작한다.

| 기능 | 기본값 | 켜는 방법 | 동작 |
|---|---|---|---|
| LLM 기능 | 꺼짐 | `app.yaml`의 `llm_base_url`과 `llm_model`, `secret.yaml`의 `llm_api_key` | `metadata_worker`가 외부 git 미러링으로 들여온 문서를 auto-tag할 때만 LLM을 쓴다 |
| 이벤트 팬아웃 | PG outbox는 항상 기록 | `app.yaml`의 `redis_url` | `events_publisher` worker가 outbox를 Redis Stream `akb:events`로 흘려보낸다 |
| 감사 로그 | 꺼짐 | `app.yaml`의 `audit.enabled: true` | MCP dispatch 지점에서 append-only hash chain JSON Lines 로그를 남긴다 |

### 이벤트 팬아웃과 확장 지점

이벤트 팬아웃은 "core stays small" 철학이 실제로 구현된 자리다. 모든 write가 PG `events` outbox에 기록되고, `redis_url`을 설정하면 `events_publisher` worker가 이를 Redis Stream `akb:events`로 흘려보낸다. 외부 서비스는 `XREAD`나 consumer group으로 구독한다.

이 위에 무엇을 붙일지는 운영자가 정한다. README가 예로 드는 것은 주기적 synthesis bot, 오래된 문서를 찾아내는 doc-rot reaper, weekly-digest 에이전트, 감사 추적이다. 어느 것도 core를 수정하지 않고 붙는다.

Redis를 쓰지 않아도 이벤트는 사라지지 않는다. 팬아웃을 비워 두면 이벤트가 PG에 계속 쌓이고, LISTEN/NOTIFY trigger 위에 SSE endpoint를 직접 만들 수 있다.

### 감사 로그

감사 로그는 MCP dispatch 지점 한 곳에서 모든 read와 write와 인증 거부를 동일한 형식으로 기록한다. 호출 경로마다 따로 심지 않고 한 지점에 모았기 때문에 누락 가능성이 줄어든다.

기록 방식과 책임 분리가 이 기능의 특징이다.

| 항목 | 내용 |
|---|---|
| 형식 | 구조화된 append-only JSON Lines |
| 무결성 | 각 줄에 단조 증가하는 `seq`와 `sha256(prev ‖ line)`. 줄 누락이나 변조를 사후 검증할 수 있다 |
| 재기동 | 디스크에서 chain을 다시 이어받는다 |
| 장기 보관 | `audit.bucket`을 지정하면 하루 단위로 rotate된 파일을 WORM 오브젝트 스토리지로 넘긴다 |
| 업로드 안전성 | 로컬 버퍼는 업로드가 확인된 뒤에만 정리된다 |
| 실패 처리 | 기록은 best-effort이며 서빙 경로로 예외를 던지지 않는다 |

AKB는 producer 역할만 한다. 감사 데이터를 저장하지도 조회하지도 보존하지도 않는다. Splunk, QRadar, Elastic 같은 SIEM이 스트림을 수집하고 자체 컴플라이언스 규정에 따라 보존을 담당한다. WORM은 한 번 쓰면 수정할 수 없는 저장 방식을 뜻하며, Object Lock과 write-only 키로 버킷을 프로비저닝하면 변경 불가능한 추적 기록이 된다.

### 기술 스택

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

### 저장소 구성

저장소는 실행 코드만이 아니라 참고 구현과 템플릿까지 함께 담는다.

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

`agents/`에는 MCP 위에서 think/act 루프를 실행하는 참고용 Python 에이전트 런타임이 있다. AKB를 붙여 쓸 에이전트를 처음 만드는 쪽에는 출발점이 된다. `templates/`에는 ADR과 PRD와 runbook 같은 문서 템플릿과 vault 프로파일이 들어 있어, 빈 vault에서 시작하지 않아도 된다.

backend 안에서 REST 경로와 MCP 서버가 나뉘어 있다는 점도 눈여겨볼 만하다. `app/api/routes/`가 REST endpoint를 맡고 `mcp_server/`가 Streamable HTTP MCP 서버를 맡는다. 앞서 본 `/api/v1/agent-sessions`가 MCP 도구가 아닌 REST surface에 놓인 것도 이 구분과 맞물린다.

### 배포와 버저닝

Kubernetes 배포는 `deploy/k8s/`의 범용 kustomize base를 쓴다. 레지스트리와 호스트명과 TLS issuer는 문서화된 환경 변수나 `deploy/k8s/internal/`의 운영자 전용 overlay로 넣는다.

버저닝은 SemVer를 따른다. 제품 버전은 `backend/pyproject.toml`의 `[project].version`이며 `scripts/bump-version.sh <x.y.z>`가 `frontend/package.json`으로 복제한다. `deploy/k8s/deploy.sh`는 실행할 때마다 Docker 이미지에 명시 버전 태그와 `:latest`를 함께 붙여, 과거 빌드를 롤백용으로 계속 받을 수 있게 한다.

npm 프록시는 제품 버전과 묶이지 않는다. `packages/akb-mcp-client`는 독립된 npm semver 라이프사이클을 따른다. 라이선스가 다르고 배포 채널이 다르므로 버전도 분리한 구성이다.

### 취약점 보고

보안 취약점은 공개 이슈가 아니라 비공개 경로로 보고하도록 저장소가 요청한다. 절차는 `SECURITY.md`에 있고 기여 규칙은 `CONTRIBUTING.md`에 있다. vault 격리와 감사 로그를 전면에 내건 시스템인 만큼 보고 경로를 분리해 둔 구성이다.

## 결과

### LongMemEval-S 벤치마크

평가에 쓴 데이터셋은 LongMemEval의 short-context split이다. 500개의 long-context 질문에 문항당 약 50개 채팅 세션이 딸려 있다. 오래 이어진 대화에서 필요한 대목을 찾아오는 능력을 재는 구성이다.

| System | R@5 | n | Reranker | Source |
|---|---:|:---:|:---:|---|
| **AKB hybrid** | **98.4%** | 500 | no | this repo |
| MemPalace hybrid + rerank | 98.4% | 450 | yes | MemPalace |
| gbrain hybrid | 97.6% | 500 | no | gbrain-evals |
| gbrain vector | 97.4% | 500 | no | gbrain-evals |

AKB는 reranker 없이 Recall@5 = 98.4%를 기록했다. 즉 상위 5개 결과 안에 정답 근거가 들어 있던 비율이 500문항 중 98.4%다. reranking은 1차 검색이 뽑은 후보를 별도 모델로 다시 정렬하는 단계인데, AKB는 그 단계를 쓰지 않고 rerank를 적용한 MemPalace와 같은 수치에 도달했다. 같은 500문항 조건인 gbrain hybrid보다는 0.8%p, gbrain vector보다는 1.0%p 높다.

reranker를 생략했다는 점은 비용과 지연 측면에서 의미가 있다. cross-encoder 계열 reranker는 후보마다 모델을 한 번씩 더 태우므로 호출 비용과 응답 시간이 함께 늘어난다. 1차 검색만으로 같은 수치가 나온다면 그 단계를 넣을 이유가 줄어든다.

### 비교를 읽을 때의 조건

README는 이 표를 그대로 모델 비교로 읽지 말라고 직접 경고한다. 시스템마다 임베딩 모델이 다르고 AKB는 `bge-m3@1024`를 썼다. 따라서 이 수치는 retrieval 파이프라인 전체를 놓고 견주는 stack 수준 비교이지 동일 조건에서 모델만 바꾼 비교가 아니다.

MemPalace 행의 n이 450이라는 점도 함께 봐야 한다. AKB와 gbrain은 500문항 전체이고 MemPalace만 held-out 450문항이라, 두 98.4%가 정확히 같은 모집단 위의 값은 아니다.

표가 말하는 범위와 말하지 않는 범위를 나누면 다음과 같다.

| 구분 | 내용 |
|---|---|
| 말하는 것 | 긴 대화 기록에서 답의 근거가 되는 세션을 상위 5개 안에 넣는 능력 |
| 말하는 것 | reranker 단계를 빼고도 그 수준에 도달했다는 사실 |
| 말하지 않는 것 | 임베딩 모델을 통제한 조건에서의 파이프라인 우열 |
| 말하지 않는 것 | 여러 문서를 거쳐야 답이 나오는 질의나 시간 순서를 따지는 질의의 성능 |
| 말하지 않는 것 | 응답 지연, 인덱싱 비용, 운영 규모에서의 거동 |

### 재현 가능성

AKB는 gbrain-evals와 MemPalace가 쓴 것과 같은 공개 데이터셋에서 자체 runner를 저장소에 넣었다. 방법론과 질문 유형별 분해, 한 번의 명령으로 재현하는 harness가 `eval/longmemeval/` 디렉토리에 있다고 README가 밝힌다. 서로 대조 가능한 공개 비교 라인을 하나 더 만든 셈이다.

다만 현재 보유 자료는 README 스텁이라 그 디렉토리의 내용은 확인할 수 없다. 질문 유형별 수치와 reranker ablation 결과는 이 페이지의 근거 범위 밖이다.

## 한계

| 항목 | 내용 |
|---|---|
| 라이선스 임계값 | Named Seat 100석 이상이거나 제3자 제공 형태이면 상업 라이선스가 필요하다. 완전한 오픈소스로 다룰 수 없다 |
| 상표 제약 | fork와 파생 저작물은 다른 이름으로 배포해야 한다 |
| 벤치마크 범위 | 공개 수치는 LongMemEval-S 한 데이터셋뿐이다 |
| 임베딩 모델 종속성 | 결과는 `bge-m3@1024` 기준이며 모델 교체 시 거동은 공개되지 않았다 |
| 드라이버별 차이 | 지연, 비용, 정확도의 드라이버별 차이가 수치로 공개되지 않았다 |
| 실험 단계 드라이버 | `seahorse-db-grpc`는 프로덕션 규모 노출을 아직 겪지 않았다 |
| 운영 부담 | 기본 경로도 3개 컨테이너이고, `seahorse-db`는 별도 클러스터 운영이 필요하다 |
| 감사 로그의 best-effort | 장애 시 유실된 줄이 생길 수 있다 |

라이선스가 가장 먼저 걸리는 제약이다. BUSL-1.1은 소스를 공개하되 사용 범위를 좌석 수로 제한하므로, 100석 이상 조직이나 이를 제품에 embed하려는 벤더는 도입 전에 상업 라이선스를 확보해야 한다. 각 버전이 4년 뒤 Apache License 2.0으로 전환된다는 점이 완화 조건이지만, 최신 버전을 쓰려는 조직에게 4년은 실질적 대안이 되기 어렵다.

벤치마크의 범위도 좁다. LongMemEval-S는 긴 대화에서 근거를 찾는 능력을 재는 데이터셋이라, 여러 문서를 거쳐야 답이 나오는 multi-hop 질의나 시간 순서를 따지는 temporal 추론, 도구를 연쇄 호출하는 agentic 과제의 성능은 이 수치로 말할 수 없다. 실제 프로덕션 사용 사례도 README에는 실려 있지 않다.

성능 조건도 특정 구성에 묶여 있다. 수치는 `bge-m3@1024` 기준이고 모델을 바꿨을 때 Recall@5가 어떻게 움직이는지는 공개되지 않았다. `pgvector`와 HNSW 조합에서는 `embed_dimensions`가 2,000을 넘으면 인덱스를 못 쓰고 전수 스캔으로 내려가므로, 차원이 큰 모델로 갈아탈 때 지연이 늘어난다.

감사 기능에도 설계상의 여백이 있다. 기록은 서빙 경로로 예외를 던지지 않는 best-effort 방식이라, 장애 상황에서는 줄이 빠질 수 있다. hash chain은 그렇게 빠진 줄을 사후에 검출하게 해 줄 뿐 애초에 유실을 막지는 않는다. 감사 데이터를 저장하고 조회하는 책임 자체가 SIEM에 있으므로, 감사 요건이 있는 조직은 수집 파이프라인을 따로 갖춰야 도입할 수 있다.

드라이버 사이의 동작도 완전히 같지는 않다. RRF 융합 위치가 `pgvector`는 애플리케이션 쪽이고 나머지는 서버 쪽이며, `seahorse-db`만 BM25 전용 fallback을 지원하지 않는다. 어느 드라이버가 어떤 조건에서 유리한지 판단할 비교 수치는 제시되지 않았다.

마지막으로 보유 자료의 범위를 밝혀 둔다. raw가 저장소 전체 클론에서 README 스텁으로 경량화되면서 backend 소스, CHANGELOG, 테스트 스크립트, `eval/longmemeval/` 결과가 빠졌다. 내부 구현 세부인 워커 구현, 서비스 파일 경로, 테스트 개수, health endpoint 사양, 버전별 버그 수정 내역은 현재 근거로 확인할 수 없어 이 페이지에 싣지 않았다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| vault | Git bare repo 한 개. 접근 제어와 물리적 격리의 단위다 |
| AKB URI | `akb://{vault}[/coll/{coll}]/{doc\|table\|file}/{...}` 형식의 위치 인식 핸들. 모든 도구 입력과 relations 저장에 쓰인다 |
| RRF | Reciprocal Rank Fusion. dense 순위와 sparse 순위를 순위 역수의 합으로 합치는 표준 hybrid 기법 |
| `vector_indexed_at` | `chunks` 테이블의 컬럼. `NULL`로 되돌리면 indexing worker가 해당 행을 다시 인덱싱한다 |
| `42501` | PostgreSQL의 권한 부족 오류 코드. 권한 밖 vault를 참조한 사용자 SQL이 받는 응답이다 |
| Named Seat | BUSL-1.1 Additional Use Grant의 과금 단위. 배포별 `users` 테이블의 서로 다른 사람 계정이며 서비스 계정과 90일 이상 비활성 계정은 제외한다 |

## 관련 페이지

- [[applications/garrytan-gbrain]]: Garry Tan의 markdown 우선 에이전트 메모리. LongMemEval-S에서 AKB의 직접 비교 대상이다 (AKB 98.4% 대 gbrain hybrid 97.6%)
- [[applications/dnotitia-2026-akb-product-introduction]]: 같은 회사가 낸 제품 소개 슬라이드. 이 저장소가 제공하는 기능이 제품에서 어떤 운영 시나리오로 제시되는지 볼 수 있다
- [[applications/kmyu-2026-akb-llmwiki-gbrain-comparison]]: AKB와 llmwiki와 GBrain을 점수화하고 AKB의 발전 방향을 제안한 전략 보고서. 이 페이지가 다루는 저장소를 평가 대상으로 삼는다
- [[applications/liu-2026-rag-llm-wiki-or-gbrain]]: RAG와 LLM Wiki와 Fat Skills를 견주는 결정 프레임워크. AKB는 retrieval과 문서 편집과 도구 실행을 한 인프라에 묶는 구성이다
- [[applications/vectorize-2026-gbrain-review-honest-assessment]]: gbrain을 다면 평가한 리뷰. 개인 운영과 팀 운영의 차이를 정리해 AKB의 vault 격리와 대조하기 좋다
- [[applications/gajjar-2026-gbrain-vs-computer-memory]]: 개인용 지식 저장소와 엔터프라이즈 메모리 사이의 격차를 다룬 에세이. AKB의 PostgreSQL ACL 격리가 겨냥하는 지점이다
- [[agents/rodrigues-2026-mcp-server-architecture-patterns]]: MCP 서버 아키텍처 패턴. AKB의 Streamable HTTP backend와 stdio 프록시 분리를 일반화된 패턴에 놓고 볼 수 있다
- [[agents/lee-hoyeon-2026-harness-engineering]]: harness 설계 관점. AKB의 `akb_help()`와 도구 분류는 harness가 외부 저장소에 제공하는 계약의 구현 사례다
- [[database/hkuds-rag-anything]]: multimodal RAG 참고 구현. AKB는 그래프는 갖췄지만 multimodal은 범위 밖이다
- [[database/vectifyai-pageindex]]: 벡터를 쓰지 않는 추론 기반 RAG. AKB의 dense와 BM25 hybrid 구성과 반대편에 있다
- [[overviews/gbrain-ecosystem-overview]]: gbrain 생태계 overview. AKB는 같은 문제를 다른 구성으로 푼 구현체로 비교 후보다
