---
title: "Auto Ontology"
type: repo
year: 2026
category: database
source: nvidia-auto-ontology.md
raw_path: raw/repos/nvidia-auto-ontology.md
raw_filename: "nvidia-auto-ontology.md"
source_collection: external
org: "NVIDIA"
repo: "auto-ontology"
url: "https://github.com/NVIDIA/auto-ontology"
license: "Apache-2.0"
tags: [ontology, text-to-sql, semantic-layer, knowledge-graph, mcp, nvidia]
figures:
  - id: fig01
    label: arch.png
    kind: figure
    file: assets/nvidia-auto-ontology/arch.png
    raw: https://raw.githubusercontent.com/NVIDIA/auto-ontology/main/docs/assets/arch.png
    caption: "Auto Ontology 아키텍처. agent harness가 Frontend와 Backend를 거쳐 PostgreSQL에 닿고, Ingestion Service가 원천 데이터베이스를 읽어 같은 PostgreSQL에 ontology를 쓴다. Backend와 Ingestion Service는 모두 NVIDIA NIM의 LLM과 임베딩 모델을 호출하며, Backend는 생성한 SQL을 원천 데이터베이스에서 직접 실행한다"
    strategy: manual
    curated: true
  - id: fig02
    label: ontology-graph.png
    kind: figure
    file: assets/nvidia-auto-ontology/ontology-graph.png
    raw: https://raw.githubusercontent.com/NVIDIA/auto-ontology/main/docs/assets/ontology-graph.png
    caption: "Wide World Importers를 한 번 컴파일해 얻은 semantic graph. term 31개가 노드로 나타나고, Order term을 고르면 설명과 함께 관련 term 7개, attribute column 10개, SQL attribute 2개가 표시된다"
    strategy: manual
    curated: true
  - id: fig03
    label: qa-example.png
    kind: figure
    file: assets/nvidia-auto-ontology/qa-example.png
    raw: https://raw.githubusercontent.com/NVIDIA/auto-ontology/main/docs/assets/qa-example.png
    caption: "Chat 화면의 질의응답 예시. 매출과 고객 수가 가장 높은 제품을 묻는 질문에 생성 SQL을 보여 주고, 결과 행 보기와 CSV 내려받기 버튼, 제품별 총매출 막대 차트를 함께 낸다"
    strategy: manual
    curated: true
---

## 요약

Auto Ontology는 NVIDIA가 2026년 4월에 공개한 Apache-2.0 라이브러리로, 기업 데이터베이스 위에 에이전트용 의미 계층을 자동으로 세운다. 원천 데이터베이스의 schema, column 통계, 샘플 값, 질의(query) 이력을 읽어 ontology 초안을 만들고, 사람이 그 정의를 인증하면, 에이전트가 인증된 정의를 근거로 자연어 질문을 SQL로 바꿔 실행한다. 답에는 생성된 SQL과 수행 단계가 함께 붙는다.

ontology는 도메인의 개체 종류와 관계 타입을 고정된 집합으로 정의한 구조다. Auto Ontology에서 ontology는 업무 개념(term), 검토된 계산식(SQL attribute), 테이블 join 방법(relationship) 세 종류의 정의로 이루어지고, Postgres와 pgvector에 카탈로그와 함께 저장된다.

저장소의 차별점은 정확도를 신뢰의 출발점으로 삼는다는 데 있다. 질문이 ontology로 덮이지 않으면 에이전트는 추측으로 SQL을 짜지 않고 답할 수 없다고 보고한다. 이 context layer는 MCP 서버, 코딩 에이전트용 스킬, REST API 세 경로로 어떤 agent harness에든 연결된다.

![[assets/nvidia-auto-ontology/arch.png]]
*Figure 1: Auto Ontology 아키텍처. 왼쪽 agent harness에서 Frontend, Backend로 요청이 흐르고, 오른쪽 Ingestion Service가 원천 DB를 읽어 PostgreSQL에 ontology를 쓴다. 두 서비스 모두 NVIDIA NIM을 호출한다 (NVIDIA auto-ontology README)*

## 배경

에이전트는 이미 문서를 찾고 데이터베이스를 조회할 수 있다. 그러나 README가 지적하듯 매출 지표를 빨리 답해도 숫자가 틀리면 가치가 없다. 즉 agentic analytics(에이전트가 데이터를 분석해 답하는 작업)의 병목은 속도가 아니라 신뢰성이다.

text-to-SQL이 틀리는 원인은 대개 데이터의 의미를 모르는 데 있다. 같은 "매출"이라도 시스템마다 계산 방식이 다르고, 어떤 테이블을 어떤 경로로 join해야 하는지는 schema만 봐서는 알기 어렵다. 따라서 README는 에이전트에게 다음 여섯 가지를 알려 주는 context layer가 필요하다고 본다.

| 질문 | 뜻 |
|---|---|
| 어디에 있는가 | 데이터가 저장된 위치 |
| 무엇을 뜻하는가 | 업무 의미 |
| 써도 되는가 | 사용 적합성 |
| 어떻게 쓰는가 | 계산과 join 방법 |
| 어디서 왔는가 | 출처와 lineage |
| 무엇과 비슷한가 | 유사 개념 |

Auto Ontology는 이 layer를 기업 메타데이터에서 생성하고, 시스템마다 다른 정의를 조정한다. 고객이 이미 가진 semantic model을 대체하지 않고 보완하는 위치에 선다는 점도 명시한다. 그래서 Apache Ossie라는 semantic model 교환 표준과의 import, export를 기본 기능으로 둔다.

## 핵심 개념

### term

term은 Customer나 Invoice Line처럼 업무 개념 하나를 나타내는 ontology 단위다. 각 term은 설명과 동의어를 갖고, 그 개념을 실제로 담은 column에 매핑된다. 예를 들어 사용자가 "revenue"라고 물으면 에이전트는 이를 Invoice Line term과 그 매핑 column으로 해석한다.

### SQL attribute

SQL attribute는 term 아래 두는 검토된 SQL 식이다. 마진이나 누적 합계처럼 계산이 필요한 지표가 여기에 속한다. 에이전트가 매번 SQL을 새로 짜지 않고 이 식을 재사용하므로, 같은 지표는 누가 언제 물어도 같은 방식으로 계산된다.

### relationship

relationship은 테이블이 어떻게 join되는지를 적은 정의다. 두 테이블을 잇는 중간 테이블(bridge table)도 포함하며, key 정의와 실제 데이터에서 추론한다. 에이전트는 질문에 등장한 term들을 이 relationship을 따라 연결해 join 경로를 찾는다.

### certify

certify는 사람이 term 이름, 설명, SQL attribute가 맞다고 확정하는 단계다. 자동 생성된 초안은 그대로는 신뢰할 수 없으므로, Auto Ontology는 생성과 응답 사이에 사람의 검토 단계를 명시적으로 둔다.

### answerability

answerability는 ontology가 질문을 얼마나 덮는지를 뜻한다. MCP 도구 `check_answerable`이 coverage 값과 덮지 못한 개념을 돌려준다. README 예시에서는 광고비를 묻는 질문에 coverage 0.5와 함께 "ad spend를 덮는 term이 없다"는 결과가 나온다.

## 방법

Auto Ontology는 생성(Generate), 인증(Certify), 응답(Answer) 세 단계로 동작한다. 생성은 기계가, 인증은 사람이, 응답은 에이전트가 맡는다.

### 생성 단계

ingestion service가 원천 데이터베이스에서 ontology 초안을 만든다. 이 과정을 semantic compilation이라 부르며, Web UI의 Settings에서 켜면 시작된다.

| 순서 | 단계 | 내용 |
|---|---|---|
| 1 | 원천 읽기 | schema 추출, column profiling, 샘플 값을 카탈로그에 저장 |
| 2 | entity 명명 | 테이블 단위로 term 추출, 각 term을 column에 매핑 |
| 3 | 관계 해석 | 테이블 사이 join과 bridge table 추론, 질의 이력에서 SQL attribute 제안 |
| 4 | ontology 기록 | term, 관계, SQL attribute를 Postgres에 저장하고 retrieval용 임베딩을 pgvector에 저장 |

결과물은 UI에서 탐색할 수 있는 semantic graph다. README 예시에서 Wide World Importers를 한 번 컴파일하자 term 31개가 만들어졌다. Order term을 선택하면 설명("고객 주문과 날짜, 배송 정보, 비고, 처리 메타데이터")과 함께 관련 term, 매핑 column, SQL attribute 개수가 나타난다.

![[assets/nvidia-auto-ontology/ontology-graph.png]]
*Figure 2: Wide World Importers semantic graph. term 31개가 노드이고, 선택한 Order term은 관련 term 7개, attribute column 10개, SQL attribute 2개를 가진다 (NVIDIA auto-ontology README)*

### 인증 단계

사람이 초안을 신뢰할 수 있는 상태로 만든다. 절차는 세 단계다.

1. 실제 질문으로 시험한다. Web UI의 Chat을 쓰거나 MCP의 `check_answerable`, `ask_question`을 호출한다
2. UI나 API로 term, 설명, SQL attribute를 다듬는다
3. 이름, 설명, SQL attribute가 맞으면 인증한다

README의 Learn 기능은 이 단계와 이어진다. 인증된 수정과 사용 기록을 ontology에 되먹여, 질문이 쌓일수록 공유 context가 나아지게 한다는 설계 목표다.

### 응답 단계

에이전트는 질문마다 다섯 단계를 거친다.

| 순서 | 단계 | 담당 모델 역할 |
|---|---|---|
| 1 | 질문 의도 분류와 entity 추출 | `NON_REASONING` |
| 2 | 임베딩 검색으로 후보 term, column, SQL attribute retrieval | `EMBED` |
| 3 | 후보로부터 SQL 작성 | `REASONING` |
| 4 | 필터 값과 질의를 데이터베이스에 대조해 검사, 실패하면 SQL 수정 | `NON_REASONING` |
| 5 | 질의 실행, 답과 SQL과 수행 단계 반환 | 없음 |

entity는 질문이 언급한 제품, 지역, 지표 같은 개별 대상이다. 담당 모델 열은 README의 Models 표가 각 역할에 배정한 작업을 단계에 대응시킨 것이다.

4단계의 검사가 신뢰성의 핵심이다. 예를 들어 사용자가 "Pennsylvania"라고 썼을 때 실제 데이터에 그 값이 있는지 먼저 확인하고, 없거나 질의가 실패하면 SQL을 고친 뒤 실행한다. 후보가 질의를 뒷받침하지 못하면 에이전트는 SQL을 지어내지 않고 이 데이터로는 답할 수 없다고 보고한다. 예측형 질문은 KumoRFM이 설정된 경우 KumoRFM으로 보낸다.

Chat 화면에서는 각 답이 SQL을 함께 보여 주고, 결과 행 보기, CSV 내려받기, 차트 보기를 지원한다.

![[assets/nvidia-auto-ontology/qa-example.png]]
*Figure 3: Chat 질의응답 화면. 매출과 고객 수 상위 제품을 묻자 생성 SQL, 데이터 보기와 CSV 버튼, 제품별 총매출 막대 차트를 함께 보여 준다 (NVIDIA auto-ontology README)*

### 소프트웨어 구성

시스템은 웹 계층, 에이전트 계층, 수집 계층, 저장 계층으로 나뉜다. README의 How it works 절 표 기준 구성은 다음과 같다.

| 구성 요소 | 기술 | 역할 | 포트 |
|---|---|---|---|
| Frontend | Next.js, Better Auth, Prisma | Web UI, 인증, 공개 API gateway | 3000 |
| Backend | FastAPI (Python 3.12+), LangChain | text-to-SQL 에이전트, 카탈로그와 ontology API | 3001 |
| Ingestion service | FastAPI (Python 3.12+) | ingestion과 semantic compilation | 3002 |
| MCP server | FastMCP | 공개 API 위의 읽기 전용 에이전트 도구 | 3003 |
| Postgres + pgvector | PostgreSQL 17 | 카탈로그, ontology, 앱 데이터, 벡터 저장소 | 5432 |
| HashiCorp Vault | 옵션 | 연결 자격 증명 저장 | 없음 |

README 앞부분의 Software Components 표는 내용이 조금 다르다. Frontend를 Next.js 16 (React 19, TypeScript, Tailwind CSS 4)로 구체적으로 적고, 3002번 서비스를 "Ingestion worker"로 부르며 역할을 "표 데이터를 수집하고 임베딩을 기록"으로 적는다. MCP server 행은 없다. 뒤쪽 표가 MCP server를 포함하므로 더 최신 구성으로 보인다.

카탈로그와 ontology와 벡터를 모두 한 Postgres에 두는 것이 저장 계층의 특징이다. 별도 vector database를 두지 않고 pgvector 확장으로 임베딩 검색을 처리한다.

### 보안 경계

내부 서비스 두 개는 자체 인증이 없어 네트워크 격리가 전제다. FastAPI Backend는 Frontend가 `x-auto-ontology-user-id` 헤더로 넘기는 사용자 신원을 그대로 믿는다. ingestion service의 ingest, delete, reset, compile 엔드포인트에는 인증이 전혀 없다. 따라서 3001과 3002 포트는 사설 네트워크에 두고, 모든 클라이언트는 3000번 web app을 거쳐야 한다.

Quickstart의 Docker Compose 구성은 Postgres, pgAdmin, web app 포트를 호스트에 공개한다. README는 이 때문에 기동 전에 기본 비밀번호를 모두 바꾸라고 경고한다.

### 모델 역할과 설정

모델은 네 가지 역할로 나뉜다. `nvapi-` 키가 있으면 각 역할의 기본값은 build.nvidia.com의 NVIDIA NIM이다.

| 역할 | 기본 모델 | 하는 일 |
|---|---|---|
| `REASONING` | `nvidia/nemotron-3.5-lightning-30b-a3b` | ontology 구축, 답의 SQL과 설명 작성, answerability 채점 |
| `NON_REASONING` | `nvidia/nemotron-3.5-lightning-30b-a3b` | 질문 의도, entity 추출, 후보 선택, SQL 검사와 수정 |
| `EMBED` | `nvidia/nemotron-3.5-embed-1b` | 테이블, column, term, SQL attribute를 pgvector에 인덱싱하고 질문과 매칭 |
| `RERANK` | `nvidia/nemotron-3.5-rerank-8b` | 컴파일 중 bridge table SQL attribute를 만들 때 후보 테이블 순위 결정 |

두 추론 역할의 기본 모델은 같다. 다만 README의 triplet 표는 `NON_REASONING`을 entity 추출에 쓰는 더 가벼운 모델로 설명하므로, 무거운 작업(ontology 구축, SQL 작성)과 빠른 작업(분류, 검사)에 서로 다른 모델을 배정할 수 있다. reranking은 1차 검색이 뽑은 후보를 정밀 모델로 다시 정렬하는 단계로, 질의 응답 경로가 아니라 컴파일 단계에서만 쓰인다.

각 역할은 `<PREFIX>_ENDPOINT`, `<PREFIX>_API_KEY`, `<PREFIX>_MODEL` 세 환경 변수, 즉 triplet으로 설정한다. 설정하지 않은 값은 `DEFAULT_MODELS_<FIELD>`로 fallback한다. 따라서 가장 간단한 설정은 `DEFAULT_MODELS_*`만 채우고 다른 값만 덮어쓰는 것이다. `*_API_KEY`는 하위 호환을 위해 예전 `NVIDIA_API_KEY`로도 fallback한다.

self-hosted NIM이나 OpenAI 호환 엔드포인트도 쓸 수 있다. 다만 두 조건이 있다.

- 모델이 structured output을 지원해야 한다
- 임베딩 모델은 ingestion과 질의에서 같아야 한다. 다르면 저장된 벡터와 질문 벡터가 다른 공간에 놓인다

README 안에서 기본 모델 표기가 두 곳에서 어긋난다. NVIDIA NIM 절은 `.env.example` 기본값으로 임베딩 `nvidia/nemotron-3-embed-1b`, reranking `nvidia/llama-nemotron-rerank-vl-1b-v2`를 적지만, Models 절 표는 `nemotron-3.5-embed-1b`, `nemotron-3.5-rerank-8b`를 적는다. 실제 값은 `.env.example`을 확인해야 한다.

### 에이전트 연동 경로

같은 ontology를 네 가지 경로로 노출한다.

| 경로 | 대상 | 특징 |
|---|---|---|
| MCP server | Cursor, Claude Desktop 등 MCP 클라이언트 | 읽기 전용, 사용자별 로그인과 권한 |
| Agent skills | 코딩 에이전트 | 설치부터 질의까지 절차를 담은 스킬 세 개 |
| REST API | 애플리케이션 | SSE 스트림으로 답 반환 |
| Import / Export | 다른 semantic model 도구 | Apache Ossie YAML |

**MCP server.** MCP는 모델이 외부 도구와 데이터 원천에 표준화된 방식으로 접근하게 하는 프로토콜이다. Auto Ontology의 MCP 서버는 모든 도구가 읽기 전용이고, 사용자마다 Auto Ontology로 로그인해 그 사용자의 권한으로 호출이 실행된다. `uvx`로 저장소의 `mcp` 하위 디렉토리를 바로 실행하며, Claude Desktop은 `mcp-remote`로 HTTP 엔드포인트에 연결한다.

| 용도 | 도구 |
|---|---|
| Readiness | `check_readiness`: 이 배포가 무엇이든 답할 수 있는 상태인지 |
| Terms | `search_terms`, `get_term`, `get_term_columns`, `get_term_sql_attributes`, `get_sql_attribute`, `describe_table` |
| Answerability | `check_answerable`: ontology가 이 질문을 덮는지 |
| Questions | `ask_question`: 답, SQL, 결과 행 |

도구 배열이 사용 순서를 반영한다. 에이전트는 배포 상태를 확인하고, term을 탐색하고, 질문이 답할 수 있는 것인지 확인한 뒤에 실제 질문을 던진다.

**Agent skills.** 스킬은 특정 작업 절차를 담아 에이전트에 결합하는 지침 패키지다. 진입점은 `AGENTS.md`이고 세 개가 있다.

| 스킬 | 다루는 범위 |
|---|---|
| `nvidia-ontology-setup` | 설치, 원천 연결, 컴파일, readiness 증명 |
| `nvidia-ontology-management` | 검사, 모델링, 인증, import와 export, 게시 |
| `nvidia-ontology-query` | 질문하고 SQL, 결과 행, 답 검증 |

**REST API.** web app 주소의 `POST /api/chat/completions`로 질문한다. 사용자 메뉴의 API Tokens에서 발급한 토큰을 `x-api-key` 헤더로 보낸다. 응답은 server-sent event 스트림이며, `result` 이벤트의 `answer` 객체에 `response`(답)와 `sql_code`(SQL)가 들어 있고 `data: [DONE]`이 스트림을 끝낸다. 오류는 `error` 이벤트로 온다. README의 Python 예제는 timeout을 900초로 둬, 한 질문의 처리가 길어질 수 있음을 보여 준다.

**Import / Export.** Apache Ossie는 semantic model 교환을 위한 개방 표준이다. Ossie 쪽 저장소에 Auto Ontology용 converter가 있고, Auto Ontology는 그 converter로 모델 정의를 Ossie YAML로 가져오고 내보낸다. Settings의 Import / Export 화면이나 `POST /api/model/import`, `POST /api/model/export`로 쓴다.

### 데이터 원천

지원하는 데이터베이스 엔진은 10종이다.

| 분류 | 엔진 |
|---|---|
| 범용 RDBMS | PostgreSQL, MySQL |
| 클라우드 데이터 플랫폼 | Databricks, Snowflake |
| 분석용 엔진 | ClickHouse, Trino, Apache Kyuubi, HeavyDB |
| 내장형 | DuckDB, SQLite |

분류 열은 이 페이지가 정리한 것이고 README는 목록만 나열한다. 연결은 Settings의 Connections 화면이나 `CONNECTION_STRINGS` 환경 변수로 추가하며, DuckDB와 SQLite는 connection string으로만 연결할 수 있다.

### 예측 질문과 KumoRFM

`KUMO_RFM_API_KEY`를 설정하면 에이전트가 예측형 질문을 hosted 서비스 KumoRFM으로 보낸다. 이때 연결된 테이블이 KumoRFM으로 업로드된다.

| 환경 변수 | 의미 | 기본값 |
|---|---|---|
| `KUMO_MAX_TABLES` | 업로드할 최대 테이블 수 | 20개 |
| `KUMO_MAX_ROWS_PER_TABLE` | 테이블당 최대 행 수 | 설정하지 않으면 무제한 |

README는 기업 데이터가 외부 서비스로 나가므로 활성화 전에 전송 범위를 확인하고 조직의 데이터 검토를 마치라고 권고한다.

## 결과

README에는 정확도 같은 정량 벤치마크가 없다. BIRD 같은 text-to-SQL 벤치마크 실행은 별도 저장소 NVIDIA/ontology-sql-eval로 위임한다. 대신 Quickstart가 Microsoft의 샘플 판매 데이터베이스 Wide World Importers로 두 가지 시연을 보인다.

### Quickstart 절차

시연 환경은 Docker Compose v2, uv, NVIDIA API 키(`nvapi-`)를 요구한다.

| 순서 | 작업 |
|---|---|
| 1 | 저장소를 clone하고 `.env`에 API 키, `AUTH_SECRET`, `APP_URL`, Postgres와 관리자와 pgAdmin 비밀번호, `CONNECTION_STRINGS` 설정 |
| 2 | Postgres만 기동하고 auto-ontology-eval 저장소의 seed 스크립트로 Wide World Importers 적재 |
| 3 | `docker compose up -d --build`로 나머지 스택 기동 |
| 4 | localhost:3000에 로그인하고 Settings의 Semantic Compilation 활성화. ingestion은 기동 시 실행되고 컴파일이 끝나면 준비 완료 메시지 표시 |
| 5 | Chat에서 질문 |

### 답할 수 있는 질문

"2015년 6월 펜실베이니아에서 USB food flash drive - sushi roll의 매출은?"이라는 질문에 에이전트는 revenue, product, state 세 단어를 ontology term으로 해석하고, relationship을 따라 join 경로를 찾아 질의를 실행했다. 답은 588.80달러이며 invoice line 3건에서 나왔다.

| 항목 | 내용 |
|---|---|
| 해석한 term | Invoice Line (revenue), Stock Item, State Province, Invoice |
| join 경로 | invoice line, invoice, customer, city, state province |
| 생성 SQL | `sales.invoicelines`에서 출발해 5번 join, 제품명과 주 이름과 날짜 범위로 필터, `SUM(extendedprice)`와 `COUNT(*)` 계산 |
| 검사 | 필터 값을 데이터와 대조한 뒤 실행 |

이 예시는 질문에 직접 등장하지 않는 테이블(customer, city)이 join 경로에 들어간다는 점에서 의미가 있다. 제품과 주를 잇는 경로가 고객의 배송 도시를 거치므로, relationship 정의가 없다면 모델이 이 경로를 스스로 찾기 어렵다. 답에 SQL과 단계가 함께 붙으므로 사용자는 원천 데이터에 대조해 결과를 확인할 수 있다.

### 답할 수 없는 질문

같은 제품의 2015년 6월 광고비 대비 수익(return on ad spend)을 물으면 상황이 달라진다. Wide World Importers에는 광고 데이터가 없다. MCP로 연결된 에이전트는 먼저 `check_answerable`을 호출해 coverage 0.5와 "ad spend를 덮는 term이 없다"는 결과를 받는다.

에이전트는 SQL을 짜지 않고 사용자에게 되묻는다. 매출은 찾을 수 있지만 광고비 데이터가 없어 return on ad spend를 계산할 수 없다고 설명하고, 2015년 6월 매출로 대신할지 아니면 광고비를 담은 다른 원천을 연결할지 묻는다. 이 동작은 README가 처음 제기한 문제, 즉 빠르지만 틀린 숫자를 피하는 설계를 직접 보여 준다.

## 한계

| 한계 | 내용 |
|---|---|
| 정량 평가 부재 | README에 정확도 수치가 없고 별도 평가 저장소로 위임한다 |
| 내부 서비스 무인증 | Backend는 헤더 신원을 신뢰하고 ingestion service에는 인증이 없어 3001, 3002 포트를 사설망에 격리해야 한다 |
| 외부 데이터 전송 | KumoRFM을 켜면 연결 테이블이 외부 hosted 서비스로 업로드된다 |
| 외부 엔드포인트 기본값 | 기본 설정은 NVIDIA API catalog(`integrate.api.nvidia.com`, `ai.api.nvidia.com`)를 호출한다 |
| 모델 조건 | 대체 모델은 structured output을 지원해야 하고, 임베딩 모델은 ingestion과 질의에서 같아야 한다 |
| 문서 불일치 | 구성 표 두 개와 기본 모델 표기 두 곳이 서로 다르고, 아키텍처 그림 제목은 "NVIDIA AI-Q Agent Harness Architecture"로 저장소 이름과 다르다 |
| 외부 기여 불가 | 외부 pull request를 받지 않고 integration 요청과 버그 리포트만 issue로 받는다 |

운영상 알려진 문제도 하나 있다. 재시작 후 UI가 왼쪽 내비게이션 없이 뜨면 브라우저가 오래된 세션 쿠키를 들고 있는 것이므로, localhost:3000의 사이트 데이터를 지우고 다시 로그인해야 한다.

이 페이지는 README만을 근거로 한다. README가 링크하는 `docs/mcp.md`, `docs/connections.md`, `AGENTS.md`, 스킬 문서, OpenAPI 명세는 수집하지 않았으므로 인증 방식, connection scoping, 스킬의 세부 절차는 다루지 않는다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| term | 업무 개념 하나를 나타내는 ontology 단위. 설명, 동의어, 매핑된 column을 가진다 |
| SQL attribute | term 아래 두는 검토된 SQL 식. 같은 지표를 항상 같은 방식으로 계산하게 한다 |
| semantic compilation | 원천 DB 메타데이터에서 term, 관계, SQL attribute를 자동 생성하는 과정 |
| certify | 사람이 term 이름, 설명, SQL attribute가 맞다고 확정하는 단계 |
| answerability | ontology가 질문을 덮는 정도. `check_answerable`이 coverage로 돌려준다 |
| model triplet | 모델 역할마다 ENDPOINT, API_KEY, MODEL 세 환경 변수를 묶은 설정 단위 |

## 관련 페이지

- [[applications/fabio-rovai-open-ontologies]]: 운영 ontology의 변경을 계획하고 결론에 certificate를 붙이는 도구. Auto Ontology는 사람의 인증으로, Open Ontologies는 기계 검사 certificate로 신뢰를 만든다
- [[applications/wlsdks-ontology-atlas]]: 코드베이스 ontology를 Markdown 폴더로 유지하고 MCP로 노출하는 워크벤치. 대상이 데이터베이스가 아니라 코드다
- [[agents/getzep-graphiti]]: 에이전트 메모리를 temporal context graph로 다루는 엔진. 둘 다 에이전트용 graph 형태 context를 만든다
- [[database/volcengine-openviking]]: 에이전트 context를 파일시스템 하나로 통합하는 context database
- [[database/microsoft-graphrag]]: 비정형 문서에서 entity와 관계를 뽑아 knowledge graph를 만드는 GraphRAG 구현. Auto Ontology는 정형 데이터베이스 메타데이터에서 출발한다
