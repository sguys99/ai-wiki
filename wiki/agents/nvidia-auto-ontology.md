---
title: "Auto Ontology"
type: repo
year: 2026
category: agents
raw_path: raw/repos/nvidia-auto-ontology.md
raw_filename: "nvidia-auto-ontology.md"
source_collection: external
source: nvidia-auto-ontology.md
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

## 요약

Auto Ontology는 NVIDIA가 Apache-2.0 라이선스로 공개한 Python 프레임워크다. 기업 데이터베이스의 메타데이터에서 ontology를 자동으로 생성하고, 사람이 그 정의를 검토해 인증하게 한 뒤, 에이전트가 인증된 정의를 근거로 자연어 질문을 SQL로 바꿔 실행하도록 만든다. 2026-04-27에 생성되어 2026-11-13 수집 시점 기준 star 약 1.2만 개를 기록하고 있다.

ontology는 도메인의 개체 종류와 관계 타입을 고정된 집합으로 정의한 구조다. Auto Ontology에서는 이 구조가 업무 개념(term), 검토된 SQL 식(SQL attribute), 테이블 사이 join 방식(relationship) 세 가지 정의로 구체화된다. 에이전트는 질문의 단어를 이 정의에 대응시키고, 정의가 가리키는 column과 join 경로로 SQL을 작성한다.

이 저장소의 결과물은 답과 함께 SQL과 단계 기록을 돌려준다는 점에서 일반 text-to-SQL 도구와 다르다. 또한 ontology가 질문을 덮지 못하면 SQL을 억지로 만들지 않고 답할 수 없다고 보고한다. 이 컨텍스트는 MCP, CLI, REST API로 노출되므로 특정 agent harness에 묶이지 않는다.

이 페이지는 저장소 최상위 `README.md` 한 파일을 근거로 한다. `docs/` 아래 하위 문서와 `AGENTS.md`, 스킬 본문은 수집 범위에 포함되지 않았다.

## 배경

### 에이전트 분석의 신뢰성 문제

README는 에이전트가 이미 문서를 검색하고 데이터베이스를 질의할 수 있다는 사실에서 출발한다. 그러나 agentic analytics, 즉 에이전트가 데이터 분석 질문에 직접 답하는 사용 방식에서는 신뢰성이 관문이 된다. README의 표현으로는 매출 지표를 더 빨리 답해도 숫자가 틀리면 아무 가치가 없다.

숫자가 틀리는 원인은 대개 데이터의 의미를 모르는 데 있다. 같은 "매출"이라도 시스템마다 계산 방식이 다르고, 어떤 테이블을 어떤 순서로 join해야 하는지는 스키마 이름만으로 드러나지 않는다. 따라서 에이전트는 SQL 문법보다 먼저 데이터에 관한 맥락이 필요하다.

### 컨텍스트 계층이라는 해법

README는 에이전트에게 필요한 맥락을 여섯 가지 질문으로 정리한다.

- 데이터가 어디에 있는가
- 그 데이터가 무엇을 뜻하는가
- 그 데이터를 써도 되는가
- 그 데이터를 어떻게 써야 하는가
- 그 데이터가 어디서 왔는가
- 무엇과 비슷한가

Auto Ontology는 이 질문에 답하는 계층을 기업 메타데이터로부터 만들고, 여러 시스템 사이의 정의 차이를 조정하며, 그 결과를 어떤 agent harness에도 노출하는 개방형 라이브러리를 표방한다. harness는 모델을 감싸 도구, 검증, 상태를 제공하는 실행 환경이다. 또한 README는 이 계층이 고객이 이미 가진 semantic model을 대체하는 것이 아니라 보완한다고 명시한다.

### 다섯 가지 역할

README는 라이브러리의 역할을 다섯 동사로 나눈다.

| 역할 | 내용 |
|---|---|
| Discover | 메타데이터에서 기업 ontology를 생성하고, 기존 ontology와 semantic model을 연결하며, AI가 쓸 수 있는 knowledge graph를 구축한다 |
| Ground | 지표, entity, 관계의 신뢰된 업무 의미를 에이전트에게 제공하고 시스템 간 불일치 정의를 조정한다 |
| Validate | 생성된 질의를 인증된 정의와 lineage로 검사하고, 모든 답에 provenance를 붙여 돌려준다 |
| Expose | MCP, CLI, API로 어떤 agent harness에도 컨텍스트를 제공한다 |
| Learn | 인증된 수정과 사용 기록을 ontology에 되먹여 질문이 쌓일수록 공유 컨텍스트가 나아지게 한다 |

grounding은 모델 출력을 외부 근거에 붙들어 매는 것이다. 여기서는 에이전트의 SQL이 인증된 업무 정의에 근거하도록 만드는 것을 뜻한다. provenance는 어떤 정보가 어느 원본에서 어떤 경로로 왔는지를 되짚을 수 있게 남긴 출처 계보로, Auto Ontology에서는 답과 함께 제공되는 SQL과 단계 기록이 그 역할을 한다.

## 핵심 개념

### ontology의 세 가지 정의

Auto Ontology의 ontology는 세 종류의 정의로 이루어진다. 세 정의는 각각 "무엇을 묻는가", "어떻게 계산하는가", "어떻게 연결하는가"에 대응한다.

| 정의 | 내용 | 예시 |
|---|---|---|
| Term | 설명과 동의어를 가진 업무 개념. 실제 값을 담은 column에 매핑된다 | Customer, Invoice Line |
| SQL attribute | term 아래에 두는 검토된 SQL 식 | 마진, rolling total |
| Relationship | 테이블이 join되는 방식. bridge table을 포함하며 key와 데이터에서 추론한다 | invoice line에서 state province까지의 join 경로 |

SQL attribute는 일관성을 위한 장치다. 에이전트가 검토된 SQL 식을 재사용하므로, 같은 지표는 어느 질문에서든 같은 방식으로 계산된다. 즉 "마진"을 물을 때마다 에이전트가 계산식을 새로 짜는 일이 없다.

bridge table은 다대다 관계를 잇는 중간 테이블이다. 예를 들어 주문과 제품 사이에 주문 행 테이블이 끼어 있으면, 두 개념을 잇는 relationship은 그 중간 테이블을 거쳐야 한다. Auto Ontology는 이런 경로도 key와 실제 데이터에서 추론해 relationship으로 저장한다.

### 인증과 answerability

certify는 사람이 검토를 마친 이름, 설명, SQL attribute를 신뢰할 수 있는 정의로 확정하는 행위다. 자동 생성된 초안은 그대로 쓰지 않고, 사람이 실제 질문으로 시험하고 고친 뒤 인증해야 신뢰 대상이 된다.

answerability는 ontology가 특정 질문을 덮는지 여부다. MCP 도구 `check_answerable`이 이 값을 coverage 수치로 보고한다. 질문에 쓰인 개념 가운데 대응하는 term이 없는 것이 있으면 coverage가 낮아지고, 에이전트는 SQL을 쓰는 대신 사용자에게 되묻는다.

### semantic compilation

semantic compilation은 원천 데이터베이스의 메타데이터를 읽어 term, relationship, SQL attribute를 생성하는 과정이다. UI의 Settings에서 이 기능을 켜면 ingestion이 시작 시 실행되고, 컴파일이 끝나면 "Semantic compilation is ready"를 보고한다. 결과는 UI에서 탐색할 수 있는 semantic graph로 나타난다.

## 방법

### 전체 아키텍처

Auto Ontology는 쓰기 경로와 읽기 경로가 분리된 구조다. ingestion service가 원천 데이터베이스를 읽어 ontology를 PostgreSQL에 쓰고, backend가 그 ontology를 읽어 질문에 답한다. 두 서비스 모두 NVIDIA NIM의 LLM과 임베딩 모델을 호출한다.

![[assets/nvidia-auto-ontology/arch.png]]
*Figure 1: Auto Ontology 아키텍처. agent harness, frontend, backend가 PostgreSQL을 읽고 ingestion service가 원천 DB에서 ontology를 쓰며, backend는 생성 SQL을 원천 DB에 직접 실행한다 (NVIDIA auto-ontology README)*

그림에서 backend와 원천 데이터베이스를 잇는 선은 text-to-SQL 질의 실행 경로다. 즉 ontology는 PostgreSQL에 따로 저장되지만, 최종 SQL은 고객의 원천 데이터베이스에서 실행된다. 이미지 상단의 제목 표기는 "NVIDIA AI-Q Agent Harness Architecture"다.

### Generate 단계

첫 단계에서 ingestion service가 원천 데이터베이스로부터 ontology 초안을 만든다. 순서는 다음과 같다.

1. 원천 읽기: 스키마를 추출하고, column을 profiling하며, 샘플 값을 catalog에 넣는다.
2. entity 명명: 테이블 단위로 term을 추출하고 각 term을 column에 매핑한다.
3. relationship 해석: 테이블 사이 join과 bridge table을 추론하고, 질의 이력에서 SQL attribute를 제안한다.
4. ontology 저장: term, relationship, SQL attribute를 Postgres에 저장하고, retrieval에 쓸 임베딩을 pgvector에 둔다.

retrieval은 외부 지식에서 관련 정보를 찾아오는 단계다. Auto Ontology에서는 질문과 가장 가까운 term, column, SQL attribute를 임베딩 유사도로 찾는 과정이 이에 해당한다. 따라서 Generate 단계의 임베딩과 Answer 단계의 임베딩은 같은 모델로 만들어야 한다.

README 예시에서 Microsoft의 샘플 판매 데이터베이스 Wide World Importers를 한 번 컴파일하자 term 31개가 생성됐다. 아래 그림은 그 결과를 semantic graph로 본 화면이다.

![[assets/nvidia-auto-ontology/ontology-graph.png]]
*Figure 2: Wide World Importers semantic graph. Order term을 선택하면 설명, 관련 term 7개, attribute column 10개, SQL attribute 2개가 표시된다 (NVIDIA auto-ontology README)*

Order term의 설명은 "고객 주문과 그 날짜, 배송 정보, 코멘트, 처리 메타데이터"다. 그래프의 노드는 Customer, Invoice, Stock Item, Delivery Method, City 같은 업무 개념이고, 노드 사이 선은 relationship이다. 범례는 term 외에도 column attribute, SQL attribute, table, schema, column, SQL, custom analysis를 구분해 보여 준다.

### Certify 단계

두 번째 단계는 사람이 초안을 신뢰할 수 있게 만드는 과정이다. 자동 생성 결과는 출발점일 뿐이므로 사람의 검토를 거친다.

1. Chat에서 실제 질문으로 시험하거나, MCP의 `check_answerable`과 `ask_question`으로 시험한다.
2. UI나 API로 term, 설명, SQL attribute를 다듬는다.
3. 정확해진 이름, 설명, SQL attribute를 인증한다.

Certify 단계가 Learn 역할과 이어진다. 인증된 수정이 ontology에 되먹여지므로, 질문을 많이 받을수록 정의가 정확해진다.

### Answer 단계

세 번째 단계에서 backend의 text-to-SQL 에이전트가 질문 하나를 다섯 단계로 처리한다.

| 순서 | 동작 | 담당 모델 역할 |
|---|---|---|
| 1 | 질문의 의도를 분류하고 질문이 가리키는 entity를 추출한다 | `NON_REASONING` |
| 2 | 임베딩 검색으로 후보 term, column, SQL attribute를 찾는다 | `EMBED` |
| 3 | 후보를 바탕으로 SQL을 작성한다 | `REASONING` |
| 4 | filter 값과 질의를 데이터베이스에 대조해 검사하고, 실패하면 SQL을 수리한다 | `NON_REASONING` |
| 5 | 질의를 실행하고 답, SQL, 거쳐 온 단계를 함께 돌려준다 | 없음 |

담당 모델 열은 README "Models" 절의 역할 설명을 단계에 대응시킨 것이다. 4단계의 검사는 SQL 문법만 보는 것이 아니라 filter에 쓴 값이 실제 데이터에 있는지까지 확인한다. 예를 들어 제품명을 잘못 적으면 실행 전에 그 값이 없다는 사실이 드러나 SQL을 고칠 수 있다.

후보가 질의를 뒷받침하지 못하면 에이전트는 이 데이터로는 답할 수 없다고 보고한다. 또한 예측형 질문은 KumoRFM이 설정된 경우 KumoRFM으로 보낸다.

### Quickstart의 두 질의

README Quickstart는 Docker Compose로 Wide World Importers를 띄워 두 질의를 시연한다. 필요 조건은 Docker Compose v2, uv, `nvapi-`로 시작하는 NVIDIA API key다. 샘플 데이터 적재 스크립트는 별도 저장소 `auto-ontology-eval`에 있다.

| 질문 | 에이전트 동작 | 결과 |
|---|---|---|
| 2015년 6월 Pennsylvania에서 USB food flash drive - sushi roll의 매출 | revenue, product, state를 term으로 해석하고 relationship을 따라 join 5개를 구성한 뒤 filter 값을 검증하고 실행 | 588.80달러, invoice line 3개 |
| 같은 제품의 2015년 6월 광고 수익률(return on ad spend) | MCP로 연결된 에이전트가 `check_answerable`을 먼저 호출 | coverage 0.5, "ad spend"를 덮는 term 없음 |

첫 질의에서 에이전트는 Invoice Line(revenue), Stock Item, State Province, Invoice를 term으로 해석했다. join 경로는 invoice line, invoice, customer, city, state province 순이고, 제품명은 stock item 테이블의 이름으로 걸렀다. 매출은 invoice line의 extended price 합계로 계산했다.

두 번째 질의는 answerability의 의미를 보여 준다. Wide World Importers에는 광고 데이터가 없으므로 "ad spend"에 대응하는 term이 없다. 따라서 에이전트는 2015년 6월 매출로 대신할지, 광고비가 다른 원천에 있어 연결해야 하는지 사용자에게 되묻는다.

Chat 화면은 답과 함께 SQL을 보여 주며, 결과 행을 표로 보거나 CSV로 내려받거나 차트로 볼 수 있다.

![[assets/nvidia-auto-ontology/qa-example.png]]
*Figure 3: Chat 답변 예시. 매출과 고객 수가 가장 많은 제품을 묻는 질문에 생성 SQL과 제품별 매출 막대 차트를 함께 보여 준다 (NVIDIA auto-ontology README)*

### 소프트웨어 구성 요소

시스템은 다섯 개의 서비스와 선택 구성 요소 하나로 이루어진다. 아래 표는 README "How it works" 절의 표를 따른다.

| 구성 요소 | 기술 | 역할 | 포트 |
|---|---|---|---|
| Frontend | Next.js, Better Auth, Prisma | Web UI, 인증, 공개 API gateway | 3000 |
| Backend | FastAPI (Python 3.12 이상), LangChain | text-to-SQL 에이전트, catalog, ontology API | 3001 |
| Ingestion service | FastAPI (Python 3.12 이상) | ingestion과 semantic compilation | 3002 |
| MCP server | FastMCP | 공개 API 위의 읽기 전용 에이전트 도구 | 3003 |
| Postgres + pgvector | PostgreSQL 17 | catalog, ontology, 앱 데이터, vector store | 5432 |
| HashiCorp Vault | 선택 | 연결 자격 증명 저장 | 없음 |

README 앞부분의 주요 기능 목록은 NIM 기반 자연어 질의, Postgres에 catalog와 함께 저장되는 semantic catalog, Better Auth 기반 인증과 RBAC, chat, analysis, data catalog, analytics, settings를 담은 Web UI, Helm chart나 Docker Compose를 통한 배포를 든다.

보안 경계는 포트 3000 하나다. FastAPI backend는 frontend가 `x-auto-ontology-user-id` 헤더로 넘긴 사용자 신원을 그대로 믿고, ingestion service의 ingest, delete, reset, compile 엔드포인트에는 자체 인증이 없다. 따라서 3001과 3002 포트는 사설망에 두고, 클라이언트는 항상 3000 포트의 웹 앱을 거쳐야 한다.

### 에이전트 연결 방식

Auto Ontology는 세 가지 방식으로 에이전트와 연결된다. MCP는 모델이 외부 도구와 데이터 원천에 표준화된 방식으로 접근하게 하는 프로토콜이다.

| 방식 | 대상 | 특징 |
|---|---|---|
| MCP server | Cursor, Claude Desktop 등 MCP 클라이언트 | 읽기 전용 도구, 사용자별 로그인과 권한 |
| Agent skills | 코딩 에이전트 | 설치, 관리, 질의 스킬 3개. `AGENTS.md`가 진입점 |
| REST API | 애플리케이션 | `POST /api/chat/completions`, server-sent event stream |

**MCP server**의 도구는 네 가지 용도로 나뉜다. 모든 호출은 로그인한 사용자의 권한으로 실행된다.

| 용도 | 도구 |
|---|---|
| Readiness | `check_readiness`: 이 배포가 무엇이든 답할 수 있는 상태인지 확인 |
| Terms | `search_terms`, `get_term`, `get_term_columns`, `get_term_sql_attributes`, `get_sql_attribute`, `describe_table` |
| Answerability | `check_answerable`: ontology가 질문을 덮는지 확인 |
| Questions | `ask_question`: 답, SQL, 행을 반환 |

서버는 `uvx --from "git+https://github.com/NVIDIA/auto-ontology.git#subdirectory=mcp" auto-ontology-mcp`로 실행하고 `AUTO_ONTOLOGY_API_URL`로 배포 주소를 지정한다. Cursor는 `http://localhost:3003/mcp`를 URL로 직접 등록하고, Claude Desktop은 `mcp-remote`로 같은 주소에 연결한다. 설정을 바꾼 뒤에는 클라이언트를 재시작하고 로그인 요청에 응한다.

**Agent skills**는 코딩 에이전트가 Auto Ontology를 다루는 방법을 가르치는 스킬 3개다.

| 스킬 | 범위 |
|---|---|
| `nvidia-ontology-setup` | 설치, 원천 연결, 컴파일, readiness 증명 |
| `nvidia-ontology-management` | 검사, 모델링, 인증, import/export, 게시 |
| `nvidia-ontology-query` | 질문하고 SQL, 행, 답을 검증 |

**REST API**는 웹 앱 origin의 `POST /api/chat/completions`로 질문을 받는다. 사용자 메뉴의 API Tokens에서 발급한 토큰을 `x-api-key` 헤더에 담는다. 응답은 server-sent event stream이며, `result` 이벤트의 `answer.response`에 답이, `answer.sql_code`에 SQL이 들어 있고 `data: [DONE]`이 스트림을 끝낸다. 오류는 `error` 이벤트로 온다. README의 Python 예시는 timeout을 900초로 둔다. 그 밖의 연산은 OpenAPI 명세에 있다.

### 연결 가능한 원천

원천 엔진은 10종을 지원한다.

| 분류 | 엔진 |
|---|---|
| 관계형 데이터베이스 | PostgreSQL, MySQL |
| 클라우드 데이터 플랫폼 | Databricks, Snowflake |
| 분석용 엔진 | ClickHouse, Trino, Apache Kyuubi, HeavyDB |
| 임베디드 | DuckDB, SQLite |

분류는 이 페이지가 정리한 것이고 README는 목록만 나열한다. 연결은 Settings의 Connections 화면이나 `CONNECTION_STRINGS` 환경 변수로 추가하며, DuckDB와 SQLite는 connection string으로만 연결할 수 있다.

### 모델 역할과 triplet 설정

Auto Ontology는 네 가지 모델 역할을 쓴다. `nvapi-` key가 있으면 각 역할의 기본값은 build.nvidia.com의 NVIDIA NIM이다.

| 역할 | 기본 모델 | 하는 일 |
|---|---|---|
| `REASONING` | `nvidia/nemotron-3.5-lightning-30b-a3b` | ontology 구축, 답변의 SQL과 설명 작성, answerability 채점 |
| `NON_REASONING` | `nvidia/nemotron-3.5-lightning-30b-a3b` | 질문 의도, entity 추출, 후보 선택, SQL 검사와 수리 |
| `EMBED` | `nvidia/nemotron-3.5-embed-1b` | 테이블, column, term, SQL attribute를 pgvector에 인덱싱하고 질문과 대조 |
| `RERANK` | `nvidia/nemotron-3.5-rerank-8b` | 컴파일 중 bridge table SQL attribute를 만들 때 후보 테이블 순위 결정 |

두 추론 역할의 기본 모델은 같지만 맡는 일이 다르다. `REASONING`은 ontology 구축과 SQL 작성처럼 무거운 판단을, `NON_REASONING`은 의도 분류와 검사처럼 빠른 단계를 맡는다. 따라서 역할별로 다른 모델을 지정하면 비용과 속도를 조절할 수 있다.

각 역할은 `<PREFIX>_ENDPOINT`, `<PREFIX>_API_KEY`, `<PREFIX>_MODEL` 세 환경 변수, 즉 triplet으로 설정한다. 비워 둔 필드는 `DEFAULT_MODELS_<FIELD>`로 대체되므로, 가장 단순한 설정은 `DEFAULT_MODELS_*`만 채우고 다른 값만 덮어쓰는 것이다. `*_API_KEY`는 하위 호환을 위해 예전 변수 `NVIDIA_API_KEY`로도 대체된다.

모델 선택에는 두 가지 조건이 있다. structured output을 지원하는 모델을 써야 하고, 임베딩 모델은 ingestion과 질의에서 같아야 한다. self-hosted NIM이나 OpenAI 호환 엔드포인트도 쓸 수 있다.

### 예측과 상호운용

`KUMO_RFM_API_KEY`를 설정하면 에이전트가 예측형 질문을 KumoRFM으로 보낸다. KumoRFM은 hosted 서비스라서, 답하려면 에이전트가 연결된 테이블을 업로드한다. 업로드 상한은 `KUMO_MAX_TABLES`(기본 20개)와 `KUMO_MAX_ROWS_PER_TABLE`(따로 정하지 않으면 무제한)이다. README는 이 기능을 켜기 전에 전송 내용을 검토하고 조직의 데이터 검토를 마치라고 권고한다.

Apache Ossie는 semantic model 교환을 위한 개방형 표준이다. Ossie 프로젝트가 Auto Ontology용 converter를 제공하고, Auto Ontology는 이 converter로 모델 정의를 Ossie YAML 형식으로 가져오고 내보낸다. UI의 Settings에 있는 Import / Export나 `POST /api/model/import`, `POST /api/model/export`를 쓴다. 기존 semantic model을 보완한다는 README의 입장은 이 상호운용 경로로 구현된다.

## 결과

README에는 정확도 같은 정량 벤치마크 수치가 없다. BIRD 같은 text-to-SQL 벤치마크 실행은 별도 저장소 `NVIDIA/ontology-sql-eval`로 안내한다. README에서 확인할 수 있는 결과는 시연 수치다.

| 항목 | 값 |
|---|---|
| Wide World Importers 1회 컴파일로 생성된 term | 31개 |
| Order term의 관련 term, attribute column, SQL attribute | 7개, 10개, 2개 |
| 매출 질의의 답 | 588.80달러 (invoice line 3개) |
| 매출 질의의 join 수 | 5개 |
| 광고 수익률 질의의 coverage | 0.5 (답변 불가 판정 후 되묻기) |

시연 수치는 기능이 의도대로 동작함을 보여 주지만, ontology 계층이 text-to-SQL 정확도를 얼마나 높이는지는 알려 주지 않는다. 따라서 정량 효과는 `ontology-sql-eval` 저장소의 결과로 확인해야 한다.

## 한계

README에서 드러나는 한계와 주의 사항은 다음과 같다.

| 구분 | 내용 |
|---|---|
| README 내부 불일치 | "NVIDIA NIM" 절은 기본 임베딩을 `nvidia/nemotron-3-embed-1b`, reranker를 `nvidia/llama-nemotron-rerank-vl-1b-v2`로 적지만 "Models" 절 표는 `nvidia/nemotron-3.5-embed-1b`, `nvidia/nemotron-3.5-rerank-8b`로 적는다 |
| 구성 요소 표 중복 | 앞쪽 "Software Components" 표에는 MCP server 행이 없고 Frontend를 Next.js 16 (React 19, TypeScript, Tailwind CSS 4)로 적는다. 실제 기본값은 `.env.example`로 확인해야 한다 |
| 내부 서비스 무인증 | backend는 헤더의 사용자 신원을 믿고 ingestion 엔드포인트는 인증이 없어 네트워크 분리가 필수다 |
| 외부 전송 | KumoRFM을 켜면 연결 테이블이 외부 hosted 서비스로 업로드된다. 모델 엔드포인트의 기본값도 NVIDIA API catalog(`integrate.api.nvidia.com`, `ai.api.nvidia.com`)다 |
| 사람의 인증 부담 | 자동 생성 초안은 사람이 질문으로 시험하고 인증해야 신뢰할 수 있다 |
| 기여 정책 | 외부 pull request를 받지 않는다. integration 요청과 버그 보고만 issue로 받는다 |
| 정량 근거 부재 | README만으로는 정확도 개선 폭을 확인할 수 없다 |

운영상 알려진 문제도 하나 있다. 재시작 후 UI가 왼쪽 내비게이션 없이 뜨면 브라우저가 오래된 세션 쿠키를 들고 있는 것이므로, `localhost:3000`의 사이트 데이터를 지우고 다시 로그인해야 한다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| Term | ontology의 업무 개념 단위. 설명, 동의어, 매핑된 column을 가진다 |
| SQL attribute | term 아래 두는 검토된 SQL 식. 지표 계산 방식을 고정한다 |
| Semantic compilation | 원천 메타데이터에서 term, relationship, SQL attribute를 생성하는 과정 |
| Certify | 사람이 검토를 마친 정의를 신뢰할 수 있는 정의로 확정하는 행위 |
| Answerability | ontology가 질문을 덮는지 여부. `check_answerable`이 coverage 값으로 보고한다 |
| Model triplet | 모델 역할별 ENDPOINT, API_KEY, MODEL 세 환경 변수 묶음 |

## 관련 페이지

- [[applications/fabio-rovai-open-ontologies]]: ontology를 다루는 다른 오픈소스 도구
- [[applications/wlsdks-ontology-atlas]]: 고정된 종류와 관계 타입으로 Markdown 폴더를 계산 가능한 그래프로 만드는 워크벤치
- [[etc/google-okf]]: 데이터 지식과 provenance를 Markdown frontmatter로 표현하는 포맷. 데이터 catalog 지식을 에이전트에게 주려는 같은 문제의식을 공유한다
- [[agents/getzep-graphiti]]: 에이전트 메모리용 temporal knowledge graph
- [[agents/rodrigues-2026-mcp-server-architecture-patterns]]: MCP 서버 설계 패턴
