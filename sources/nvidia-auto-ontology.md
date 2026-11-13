---
title: "Auto Ontology"
type: repo
year: 2026
category: agents
raw_path: raw/repos/nvidia-auto-ontology.md
raw_filename: "nvidia-auto-ontology.md"
source_collection: external
org: "NVIDIA"
repo: "auto-ontology"
url: "https://github.com/NVIDIA/auto-ontology"
license: "Apache-2.0"
tags: [ontology, text-to-sql, semantic-layer, mcp, knowledge-graph, nvidia]
figures:
  - id: fig01
    file: assets/nvidia-auto-ontology/arch.png
    raw: docs/assets/arch.png
    caption: "Auto Ontology 아키텍처. agent harness가 frontend와 backend를 거쳐 PostgreSQL의 ontology를 읽고, ingestion service가 원천 데이터베이스를 읽어 ontology를 쓰며, 두 서비스 모두 NVIDIA NIM의 LLM과 임베딩을 호출한다. backend는 생성한 SQL을 원천 데이터베이스에 직접 실행한다."
    strategy: manual
    curated: true
  - id: fig02
    file: assets/nvidia-auto-ontology/ontology-graph.png
    raw: docs/assets/ontology-graph.png
    caption: "Wide World Importers를 한 번 컴파일해 얻은 term 31개의 semantic graph. Order term을 선택하면 설명과 함께 관련 term 7개, attribute column 10개, SQL attribute 2개가 표시된다."
    strategy: manual
    curated: true
  - id: fig03
    file: assets/nvidia-auto-ontology/qa-example.png
    raw: docs/assets/qa-example.png
    caption: "Chat 답변 예시. 매출과 고객 수가 가장 많은 제품을 묻는 질문에 생성 SQL을 보여 주고, 결과 행을 표나 CSV로 받거나 매출 막대 차트로 볼 수 있다."
    strategy: manual
    curated: true
---

## 한 줄 요약 (One-line Summary)

Auto Ontology는 NVIDIA가 Apache-2.0으로 공개한 Python 프레임워크로, 기업 데이터베이스의 메타데이터에서 ontology(term, SQL attribute, relationship)를 자동 생성하고 사람이 인증(certify)하게 한 뒤, 그 ontology를 근거로 자연어 질문을 SQL로 바꿔 실행하고 SQL과 단계 기록을 함께 돌려주는 에이전트용 컨텍스트 계층이다. MCP, CLI, REST API로 어떤 agent harness에도 노출된다.

## 1. 자료 정보 (Document Information)

- **저장소**: [NVIDIA/auto-ontology](https://github.com/NVIDIA/auto-ontology), 라이선스 Apache-2.0
- **규모**: star 약 1.2만 개, 2026-04-27 생성, 최종 push 2026-11-13 (2026-11-13 수집 시점 기준)
- **수집 범위**: 최상위 `README.md` 원문. `docs/mcp.md`, `docs/connections.md`, `DEPLOYMENT.md`, `AGENTS.md` 같은 하위 문서는 수집하지 않았다
- **저장소 설명**: "semantic, graph-based reasoning layer over data"를 만드는 Python 프레임워크로, deterministic query 생성, 더 나은 context retrieval, 설명 가능한 AI를 목표로 내건다
- **기여 정책**: 외부 pull request를 받지 않는다. integration 요청과 버그 보고는 issue로 받고, 보안 취약점은 `SECURITY.md` 절차를 따른다
- **벤치마크 위치**: BIRD 같은 text-to-SQL 벤치마크 실행은 별도 저장소 `NVIDIA/ontology-sql-eval`로 안내한다. README 자체에는 벤치마크 수치가 없다

## 2. 주요 기여 (Key Contributions)

1. **에이전트용 컨텍스트 계층이라는 문제 설정**. README는 에이전트가 문서 검색과 데이터베이스 질의를 할 수 있어도 신뢰성이 agentic analytics의 관문이라고 진단한다. 매출 지표를 빨리 답해도 숫자가 틀리면 가치가 없다. 따라서 에이전트에게 데이터가 어디 있는지, 무슨 뜻인지, 써도 되는지, 어떻게 쓰는지, 어디서 왔는지, 무엇과 비슷한지를 알려 주는 계층이 필요하다고 본다.
2. **Discover, Ground, Validate, Expose, Learn 다섯 단계 역할 정의**. 메타데이터에서 ontology를 생성하고(Discover), 지표와 entity와 관계의 업무 의미를 에이전트에게 제공하며 시스템 간 불일치 정의를 조정하고(Ground), 생성 질의를 인증된 정의와 lineage로 검사해 provenance를 함께 돌려주고(Validate), MCP, CLI, API로 노출하며(Expose), 인증된 수정과 사용 기록을 ontology에 되먹인다(Learn).
3. **Generate, Certify, Answer 3단계 운영 모델**. 자동 생성한 초안을 사람이 실제 질문으로 시험하고 수정해 인증하며, 에이전트는 인증된 정의를 재사용해 답한다.
4. **answerability 확인**. 질문에 해당하는 term이 ontology에 없으면 SQL을 억지로 만들지 않고 답할 수 없다고 보고하거나 사용자에게 되묻는다. MCP의 `check_answerable` 도구가 이 역할을 한다.
5. **기존 semantic model과의 공존**. 고객이 이미 가진 semantic model을 대체하지 않고 보완한다고 명시하며, 개방형 표준 Apache Ossie의 YAML로 모델을 가져오고 내보낼 수 있다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 ontology의 세 가지 정의

| 정의 | 내용 | 예시 |
|---|---|---|
| Term | 설명과 동의어를 가진 업무 개념. 실제 값을 담은 column에 매핑된다 | Customer, Invoice Line |
| SQL attribute | term 아래에 두는 검토된 SQL 식. 에이전트가 재사용하므로 같은 지표를 매번 같은 방식으로 계산한다 | 마진, rolling total |
| Relationship | 테이블이 join되는 방식. bridge table을 포함하며 key와 데이터에서 추론한다 | invoice line, invoice, customer, city, state province 순 join |

### 3.2 Generate 단계 (ingestion service)

1. 원천 읽기: 스키마를 추출하고 column을 profiling하며 샘플 값을 catalog에 넣는다.
2. entity 명명: 테이블 단위로 term을 추출하고 각 term을 column에 매핑한다.
3. relationship 해석: 테이블 사이 join과 bridge table을 추론하고, 질의 이력에서 SQL attribute를 제안한다.
4. ontology 저장: term, relationship, SQL attribute를 Postgres에 저장하고, retrieval용 임베딩을 pgvector에 둔다.

결과는 UI에서 탐색 가능한 semantic graph다. README 예시에서 Wide World Importers를 한 번 컴파일하자 term 31개가 생성됐다. Order를 선택하면 설명, 관련 term, 매핑된 column, SQL attribute가 보인다.

### 3.3 Certify 단계 (사람의 검토)

1. Chat에서 실제 질문으로 시험하거나 MCP의 `check_answerable`, `ask_question`으로 시험한다.
2. UI나 API로 term, 설명, SQL attribute를 다듬는다.
3. 정확해진 이름, 설명, SQL attribute를 인증한다.

### 3.4 Answer 단계 (text-to-SQL 에이전트)

1. 질문의 의도(intent)를 분류하고 질문이 가리키는 entity를 추출한다.
2. 임베딩 검색으로 후보 term, column, SQL attribute를 찾는다.
3. 후보를 바탕으로 SQL을 작성한다.
4. filter 값과 질의를 데이터베이스에 대조해 검사하고, 검사가 실패하면 SQL을 수리(repair)한다.
5. 질의를 실행하고 답과 SQL, 거쳐 온 단계를 함께 돌려준다.

후보가 질의를 뒷받침하지 못하면 이 데이터로는 답할 수 없다고 보고한다. 예측형 질문은 KumoRFM이 설정된 경우 KumoRFM으로 보낸다.

### 3.5 Quickstart 예시 질의

Docker Compose로 Microsoft의 샘플 판매 데이터베이스 Wide World Importers를 띄워 시연한다. 필요 조건은 Docker Compose v2, uv, `nvapi-`로 시작하는 NVIDIA API key다. 샘플 데이터 적재 스크립트는 별도 저장소 `auto-ontology-eval`에 있다. UI의 Settings에서 Semantic Compilation을 켜면 ingestion이 시작 시 실행되고 컴파일이 끝나면 "Semantic compilation is ready"를 보고한다.

| 질문 | 동작 | 결과 |
|---|---|---|
| 2015년 6월 Pennsylvania에서 USB food flash drive - sushi roll의 매출 | revenue, product, state를 term으로 해석하고 relationship을 따라 join 5개를 구성한 뒤 filter 값을 검증하고 실행 | 588.80달러, invoice line 3개. SQL과 단계 기록 동반 |
| 같은 제품의 2015년 6월 광고 수익률(return on ad spend) | MCP 연결 에이전트가 `check_answerable`을 먼저 호출 | coverage 0.5, "ad spend"를 덮는 term 없음. 매출로 대체할지, 광고비가 다른 원천에 있는지 사용자에게 되묻는다 |

첫 질문의 join 경로는 invoice line, invoice, customer, city, state province 순이며 제품명은 stock item에서 걸러진다.

### 3.6 소프트웨어 구성 요소

README의 "How it works" 절 표 기준이다.

| 구성 요소 | 기술 | 역할 | 포트 |
|---|---|---|---|
| Frontend | Next.js, Better Auth, Prisma | Web UI, 인증, 공개 API gateway | 3000 |
| Backend | FastAPI (Python 3.12 이상), LangChain | text-to-SQL 에이전트, catalog, ontology API | 3001 |
| Ingestion service | FastAPI (Python 3.12 이상) | ingestion과 semantic compilation | 3002 |
| MCP server | FastMCP | 공개 API 위의 읽기 전용 에이전트 도구 | 3003 |
| Postgres + pgvector | PostgreSQL 17 | catalog, ontology, 앱 데이터, vector store | 5432 |
| HashiCorp Vault | 선택 | 연결 자격 증명 저장 | 없음 |

README 앞부분 "Software Components" 표는 Frontend를 Next.js 16 (React 19, TypeScript, Tailwind CSS 4)로 적고 MCP server 행이 없다. 주요 기능으로는 NIM 기반 자연어 질의, Postgres에 catalog와 함께 저장되는 semantic catalog, Better Auth 기반 인증과 RBAC, chat/analysis/catalog/analytics/settings를 담은 Web UI, Helm chart 또는 Docker Compose 배포를 든다.

보안 경계: 3001과 3002 포트는 사설망에 둬야 한다. FastAPI는 frontend가 `x-auto-ontology-user-id` 헤더로 넘긴 사용자 신원을 그대로 믿고, ingestion service의 ingest, delete, reset, compile 엔드포인트에는 자체 인증이 없다. 클라이언트는 3000 포트의 웹 앱만 거친다.

### 3.7 에이전트 연결 방식

**MCP server**. MCP 클라이언트에 ontology 위의 읽기 전용 도구를 준다. 사용자마다 Auto Ontology로 로그인하고 모든 호출은 그 사용자 권한으로 실행된다.

| 용도 | 도구 |
|---|---|
| Readiness | `check_readiness`: 이 배포가 무엇이든 답할 수 있는 상태인가 |
| Terms | `search_terms`, `get_term`, `get_term_columns`, `get_term_sql_attributes`, `get_sql_attribute`, `describe_table` |
| Answerability | `check_answerable`: ontology가 이 질문을 덮는가 |
| Questions | `ask_question`: 답, SQL, 행 |

서버는 `uvx --from "git+https://github.com/NVIDIA/auto-ontology.git#subdirectory=mcp" auto-ontology-mcp`로 실행한다. Cursor는 `http://localhost:3003/mcp` URL을 직접 등록하고, Claude Desktop은 `mcp-remote`로 연결한다.

**Agent skills**. 코딩 에이전트용 스킬 3개를 제공하며 `AGENTS.md`가 진입점이다.

| 스킬 | 범위 |
|---|---|
| `nvidia-ontology-setup` | 설치, 원천 연결, 컴파일, readiness 증명 |
| `nvidia-ontology-management` | 검사, 모델링, 인증, import/export, 게시 |
| `nvidia-ontology-query` | 질문하고 SQL, 행, 답을 검증 |

**REST API**. 웹 앱 origin의 `POST /api/chat/completions`에 `x-api-key` 헤더(사용자 메뉴의 API Tokens에서 발급)로 질문을 보낸다. 응답은 server-sent event stream이며, `result` 이벤트가 답(`answer.response`, `answer.sql_code`)을 담고 `data: [DONE]`이 스트림을 끝낸다. `error` 이벤트도 있다. 그 밖의 연산은 OpenAPI 명세에 있다.

### 3.8 원천과 모델

원천 엔진은 10종이다: PostgreSQL, MySQL, Databricks, Snowflake, ClickHouse, Trino, Apache Kyuubi, HeavyDB, DuckDB, SQLite. Settings의 Connections나 `CONNECTION_STRINGS`로 추가하며, DuckDB와 SQLite는 connection string으로만 연결한다.

모델 역할은 네 가지다 ("Models" 절 표 기준).

| 역할 | 기본 모델 | 하는 일 |
|---|---|---|
| `REASONING` | `nvidia/nemotron-3.5-lightning-30b-a3b` | ontology(term, relationship, SQL attribute) 구축, 답변의 SQL과 설명 작성, answerability 채점 |
| `NON_REASONING` | `nvidia/nemotron-3.5-lightning-30b-a3b` | 질문 의도, entity 추출, 후보 선택, SQL 검사와 수리 같은 빠른 단계 |
| `EMBED` | `nvidia/nemotron-3.5-embed-1b` | 테이블, column, term, SQL attribute를 pgvector에 인덱싱하고 질문과 대조 |
| `RERANK` | `nvidia/nemotron-3.5-rerank-8b` | 컴파일 중 bridge table SQL attribute를 만들 때 후보 테이블 순위 결정 |

각 역할은 `<PREFIX>_ENDPOINT`, `<PREFIX>_API_KEY`, `<PREFIX>_MODEL` 세 변수(triplet)로 설정한다. 비워 둔 필드는 `DEFAULT_MODELS_<FIELD>`로 대체되고, `*_API_KEY`는 하위 호환을 위해 `NVIDIA_API_KEY`로도 대체된다. self-hosted NIM이나 OpenAI 호환 엔드포인트를 쓸 수 있다. structured output을 지원하는 모델을 써야 하며, 임베딩 모델은 ingestion과 질의에서 같아야 한다.

### 3.9 예측과 상호운용

`KUMO_RFM_API_KEY`를 설정하면 예측형 질문이 hosted 서비스 KumoRFM으로 간다. 이때 에이전트는 연결된 테이블을 KumoRFM에 업로드하며 상한은 `KUMO_MAX_TABLES`(기본 20개)와 `KUMO_MAX_ROWS_PER_TABLE`(기본 무제한)이다. README는 켜기 전에 전송 내용을 검토하고 조직의 데이터 검토를 마치라고 권고한다.

Apache Ossie는 semantic model 교환용 개방형 표준이다. Ossie가 Auto Ontology용 converter를 제공하고, Auto Ontology는 이를 이용해 모델 정의를 Ossie YAML로 가져오고 내보낸다(Settings의 Import / Export 또는 `POST /api/model/import`, `POST /api/model/export`).

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

README에는 정량 벤치마크가 없다. 확인 가능한 결과는 다음과 같다.

- Wide World Importers 한 번 컴파일로 term 31개 생성
- Order term: 관련 term 7개, attribute column 10개, SQL attribute 2개 (fig02 화면 기준)
- 매출 질의: 588.80달러, invoice line 3개, join 5개
- 광고 수익률 질의: coverage 0.5로 답변 불가 판정 후 되묻기

정량 평가는 BIRD 등을 돌리는 별도 저장소 `ontology-sql-eval`로 위임한다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **README 내부 불일치**. "NVIDIA NIM" 절은 기본 임베딩을 `nvidia/nemotron-3-embed-1b`, reranker를 `nvidia/llama-nemotron-rerank-vl-1b-v2`로 적지만 "Models" 절 표는 `nvidia/nemotron-3.5-embed-1b`, `nvidia/nemotron-3.5-rerank-8b`로 적는다. 구성 요소 표도 두 개가 있고 MCP server 포함 여부와 Frontend 버전 표기가 다르다. 실제 기본값은 `.env.example`을 봐야 한다.
- **내부 서비스 무인증**. backend는 헤더의 사용자 신원을 믿고 ingestion 엔드포인트는 인증이 없어 네트워크 분리가 필수다.
- **외부 전송 위험**. KumoRFM을 켜면 연결 테이블 데이터가 외부 hosted 서비스로 업로드된다. 모델 엔드포인트도 기본값은 NVIDIA API catalog다.
- **사람의 인증 부담**. 자동 생성 초안은 사람이 질문으로 시험하고 인증해야 신뢰할 수 있다.
- **외부 기여 불가**. 외부 pull request를 받지 않는다.
- **정량 근거 부재**. README만으로는 정확도 개선 폭을 확인할 수 없다.
- **운영 주의**. 재시작 후 UI 왼쪽 내비게이션이 사라지면 오래된 세션 쿠키 문제이므로 `localhost:3000`의 사이트 데이터를 지워야 한다.

## 6. 관련 연구 (Related Work)

- [[applications/fabio-rovai-open-ontologies]]: ontology를 다루는 다른 오픈소스 도구
- [[applications/wlsdks-ontology-atlas]]: 고정된 종류와 관계 타입으로 Markdown 폴더를 계산 가능한 그래프로 만드는 워크벤치
- [[etc/google-okf]]: 데이터 지식과 provenance를 Markdown frontmatter로 표현하는 포맷. 데이터 catalog 지식을 에이전트에게 주려는 같은 문제의식
- [[agents/getzep-graphiti]]: 에이전트 메모리용 temporal knowledge graph
- [[agents/rodrigues-2026-mcp-server-architecture-patterns]]: MCP 서버 설계 패턴

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| Term | ontology의 업무 개념 단위. 설명, 동의어, 매핑된 column을 가진다 |
| SQL attribute | term 아래 두는 검토된 SQL 식. 지표 계산 방식을 고정한다 |
| Semantic compilation | 원천 메타데이터에서 term, relationship, SQL attribute를 생성하는 과정 |
| Certify | 사람이 검토를 마친 이름, 설명, SQL attribute를 신뢰 정의로 확정하는 행위 |
| Answerability | ontology가 질문을 덮는지 여부. `check_answerable`이 coverage 값으로 보고한다 |
| Bridge table | 다대다 관계를 잇는 중간 테이블. relationship 추론 대상에 포함된다 |
| Model triplet | 모델 역할별 ENDPOINT, API_KEY, MODEL 세 환경 변수 묶음 |
| Apache Ossie | semantic model 교환용 개방형 표준. Auto Ontology는 Ossie YAML로 import/export한다 |
| KumoRFM | 예측형 질문을 처리하는 외부 hosted 서비스 |

## 8. 그림 후보 (Figure Candidates)

figure의 `raw:` 값은 README가 `<img src>`로 참조하는 저장소 내부 상대 경로다. repos 유형은 `-figures/` 디렉토리를 만들지 않고 저장소 내 이미지를 제자리에서 참조한다. 세 장 모두 README 본문에 들어 있는 그림이라 wiki 사본을 `wiki/assets/nvidia-auto-ontology/`에 저장했다. fig01 이미지의 제목 표기는 "NVIDIA AI-Q Agent Harness Architecture"다.

| id | strategy | caption | 추천 |
|---|---|---|---|
| fig01 | manual | 전체 아키텍처 (harness, frontend, backend, PostgreSQL, ingestion, NIM, 원천 DB) | ★ wiki 권장 (architecture) |
| fig02 | manual | Wide World Importers semantic graph와 Order term 상세 | ★ wiki 권장 (method) |
| fig03 | manual | Chat 답변의 SQL과 매출 차트 | ★ wiki 권장 (result) |
