---
title: "getzep/graphiti"
type: repo
year: 2025
category: agents
raw_path: raw/repos/getzep-graphiti.md
raw_filename: "getzep-graphiti.md"
source_collection: external
source: getzep-graphiti.md
org: "getzep"
repo: "graphiti"
url: "https://github.com/getzep/graphiti"
license: "Apache-2.0"
tags: [agent-memory, knowledge-graph, temporal-knowledge-graph, graphiti, zep, graph-rag, hybrid-search, neo4j]
---

## 요약

Graphiti는 AI 에이전트용 temporal context graph를 구축하고 질의하는 Apache-2.0 오픈소스 프레임워크다. Zep 상용 서비스의 컨텍스트 인프라 핵심에 있는 그래프 엔진을 그대로 공개한 것으로, PyPI 패키지 `graphiti-core` 하나로 시작한다.

정적 knowledge graph와 구분되는 지점은 시간 정보 처리다. 사실마다 언제 참이 됐고 언제 대체됐는지를 유효 기간으로 담기 때문에, 지금 참인 것과 과거 임의 시점에 참이었던 것을 함께 질의할 수 있다. 모든 파생 정보는 인제스트된 원본 데이터인 episode로 거슬러 올라간다.

이 페이지는 저장소 쪽 사실, 즉 설치와 설정과 API 표면과 라이선스를 다룬다. 3계층 그래프 구조와 edge invalidation의 설계 근거, 그리고 DMR과 LongMemEval 정량 결과는 원논문 요약인 [[agents/rasmussen-2025-zep-a-temporal-knowledge-graph]]에 있다. README 자체는 벤치마크 수치를 담지 않고 논문과 자사 블로그 링크로 넘긴다.

## 배경

전통적인 RAG 방식은 배치 처리와 정적 데이터 요약에 의존한다. 문서를 미리 쪼개 임베딩을 만들어 두고, 그래프 기반 방식이라면 엔티티 클러스터와 community 요약을 배치로 계산해 둔다. 이 구조는 문서 집합이 잘 바뀌지 않을 때 잘 맞는다.

문제는 에이전트가 다루는 데이터가 계속 바뀐다는 데 있다. 사용자 선호가 변하고, 조직의 운영 규칙이 개정되고, 어제 참이던 사실이 오늘 뒤집힌다. 배치 인덱싱은 이런 변화를 반영하려면 그래프를 다시 계산해야 하고, 모순되는 두 사실이 들어오면 어느 쪽이 현재인지 판단할 근거를 자체적으로 갖지 못한다.

Graphiti는 이 두 문제를 각각 증분 갱신과 bi-temporal 추적으로 다룬다. 새 데이터는 재계산 없이 즉시 통합되고, 모순되는 사실이 오면 예전 사실을 삭제하는 대신 유효 기간을 닫아 무효 처리한다. README가 제시하는 대표 예시는 "Kendra loves Adidas shoes (as of March 2026)"다. 이 진술은 2026년 3월 기준으로 참이며, 이후 뒤집히더라도 전환 시점과 함께 그래프에 남는다.

## 핵심 개념

**context graph**는 엔티티와 관계와 사실을 시간 축과 함께 담은 그래프다. README가 정적 knowledge graph와 구분하려고 쓰는 이름이며, 각 사실에 유효 기간이 붙어 있다는 점이 정의의 핵심이다.

**episode**는 인제스트된 그대로의 원본 데이터 단위다. README는 이를 ground truth 스트림이라고 부른다. 그래프의 모든 엔티티와 엣지는 자신을 만들어낸 episode로 계보를 남기므로, 파생 사실에서 원본까지 provenance가 끊기지 않는다.

**ontology**는 도메인의 개체 종류와 관계 타입을 정의한 구조를 말한다. Graphiti는 두 방식을 모두 허용한다. Pydantic 모델로 타입을 미리 선언하는 prescribed 방식과, 데이터에서 구조가 자라나게 두는 learned 방식이다. README의 권고는 단순하게 시작해 패턴이 드러나면 확장하라는 것이다.

**hybrid retrieval**은 retrieval을 한 가지 방법에 맡기지 않는 설계다. retrieval은 외부 지식에서 관련 정보를 찾아오는 단계를 뜻한다. Graphiti는 의미 임베딩과 키워드 검색(BM25), 그래프 순회를 결합해 LLM 요약에 의존하지 않고 결과를 만든다. 순차적으로 LLM에 요약을 시키는 방식보다 latency가 낮은 이유가 여기 있다.

**reranking**은 1차 검색이 뽑은 후보를 정밀 모델로 다시 정렬하는 단계다. Graphiti의 quickstart는 그래프 거리를 기준으로 reranking하는 예제를 포함하며, 별도로 cross-encoder 클라이언트를 지정해 모델 기반 reranking을 쓸 수도 있다.

## 아키텍처

### context graph의 네 가지 구성 요소

| 구성 요소 | 저장하는 것 |
|---|---|
| Entities (노드) | 사람, 제품, 정책, 개념. 시간에 따라 요약이 갱신된다 |
| Facts / Relationships (엣지) | (엔티티 → 관계 → 엔티티) 삼중항에 유효 기간을 붙인 것 |
| Episodes (provenance) | 인제스트된 그대로의 원본 데이터. 모든 파생 사실이 여기로 귀속된다 |
| Custom Types (ontology) | Pydantic 모델로 개발자가 정의한 엔티티 타입과 엣지 타입 |

앞의 세 요소가 그래프의 실체이고 네 번째는 그 실체에 개발자가 부과하는 형태다. README는 Graphiti의 고유한 점을 비정형과 정형 데이터로부터 이 그래프를 자율적으로 구축하면서, 바뀌는 관계를 처리하는 동시에 전체 시간 이력을 보존하는 능력이라고 설명한다.

### 저장소가 제공하는 계층

저장소는 라이브러리 본체 외에 두 가지 실행 계층과 예제를 함께 담고 있다.

| 경로 | 역할 |
|---|---|
| `graphiti_core/` | 라이브러리 본체. PyPI에 `graphiti-core`로 배포된다 |
| `mcp_server/` | Model Context Protocol 서버. Claude와 Cursor 같은 MCP 클라이언트에 temporal 메모리를 연결한다 |
| `server/` | FastAPI로 구현한 REST 서비스 |
| `examples/` | quickstart와 azure-openai 등 동작하는 예제 |

MCP 서버가 노출하는 기능은 다섯 가지다. episode 관리(추가, 조회, 삭제), 엔티티 관리와 관계 처리, 의미 검색과 hybrid 검색, 관련 데이터를 묶는 group 관리, 그래프 유지보수 작업이다. Neo4j와 함께 Docker로 배포할 수 있어 AI 어시스턴트 워크플로에 붙이기 쉽다고 안내한다.

## 설치와 요구 사항

기본 설치는 한 줄이다. `pip install graphiti-core` 또는 `uv add graphiti-core`를 쓴다. 다만 이것만으로는 동작하지 않고 그래프 데이터베이스와 LLM 자격 증명이 함께 있어야 한다.

| 요구 사항 | 조건 |
|---|---|
| Python | 3.10 이상. 임베디드 FalkorDB Lite를 쓰면 3.12 이상 |
| 그래프 데이터베이스 | Neo4j 5.26, FalkorDB 1.1.2, Amazon Neptune, Kuzu 0.11.2 중 하나 |
| LLM API 키 | 기본값이 OpenAI이므로 `OPENAI_API_KEY`가 필요하다 |
| 선택 사항 | Google Gemini, Anthropic, Groq API 키 |

백엔드와 LLM 제공자는 extra로 덧붙인다. 다음 일곱 가지가 정의돼 있다.

| extra | 용도 | 조건 |
|---|---|---|
| `falkordb` | FalkorDB 백엔드 | 없음 |
| `falkordblite` | 임베디드 FalkorDB | Python 3.12 이상 |
| `kuzu` | Kuzu 백엔드 | 폐기 예정. `DeprecationWarning` 발생 |
| `neptune` | Amazon Neptune 백엔드 | OpenSearch Serverless collection 필요 |
| `anthropic` | Anthropic LLM | 없음 |
| `groq` | Groq LLM | 없음 |
| `google-genai` | Google Gemini LLM, 임베딩, reranker | 없음 |

extra는 `graphiti-core[falkordb,anthropic,google-genai]`처럼 조합해 한 번에 설치할 수 있다.

로컬에서 의존 서비스를 띄우는 방법도 함께 안내한다. `docker compose up`은 Neo4j 서비스와 관련 컴포넌트를 시작하고, `docker compose --profile falkordb up`은 FalkorDB 쪽을 시작한다. FalkorDB만 단독으로 필요하면 `docker run -p 6379:6379 -p 3000:3000 -it --rm falkordb/falkordb:latest` 한 줄로도 충분하다. Neo4j를 가장 간단히 설치하는 경로로는 Neo4j Desktop을 권한다.

`examples/quickstart/`의 예제는 여섯 단계를 순서대로 보여준다.

1. Neo4j, Amazon Neptune, FalkorDB, Kuzu 중 하나에 연결한다.
2. Graphiti의 인덱스와 제약 조건을 초기화한다.
3. 그래프에 episode를 추가한다. 텍스트와 구조화 JSON 두 형태를 모두 다룬다.
4. hybrid search로 관계(엣지)를 검색한다.
5. 그래프 거리로 검색 결과를 reranking한다.
6. 미리 정의된 search recipe로 노드를 검색한다.

## 그래프 백엔드 설정

그래프 데이터베이스는 교체할 수 있다. 각 백엔드에는 전용 드라이버 클래스가 있고, 데이터베이스 이름 같은 설정은 드라이버 생성자에서 직접 지정한다.

| 백엔드 | 요구 버전과 조건 | 드라이버 클래스 | 기본 데이터베이스 이름 |
|---|---|---|---|
| Neo4j | 5.26 | `Neo4jDriver` | `neo4j` (하드코딩) |
| FalkorDB | 1.1.2 | `FalkorDriver` | `default_db` (하드코딩) |
| FalkorDB Lite (임베디드) | Python 3.12 이상 | `FalkorDriver` + `AsyncFalkorDB` | 파일 경로 지정 |
| Amazon Neptune | Neptune Database Cluster 또는 Neptune Analytics Graph에 Amazon OpenSearch Serverless collection 필요 | `NeptuneDriver` | 해당 없음 |
| Kuzu | 0.11.2, 폐기 예정 | `KuzuDriver` | 파일 경로 지정 |

Amazon Neptune 항목의 OpenSearch Serverless collection은 선택 사항이 아니다. 전문 검색 백엔드 역할을 맡기 때문에 hybrid retrieval의 키워드 검색 부분이 이것에 의존한다.

기본 데이터베이스 이름을 바꾸려면 드라이버를 직접 만들어 넘긴다. v0.17.0부터 Graphiti 생성자가 `graph_driver` 인자를 받는다.

```python
from graphiti_core import Graphiti
from graphiti_core.driver.neo4j_driver import Neo4jDriver

driver = Neo4jDriver(
    uri="bolt://localhost:7687",
    user="neo4j",
    password="password",
    database="my_custom_database",
)
graphiti = Graphiti(graph_driver=driver)
```

드라이버별로 받는 인자가 다르다.

| 드라이버 | 필수 인자 | 선택 인자 |
|---|---|---|
| `Neo4jDriver` | `uri`, `user`, `password` | `database` |
| `FalkorDriver` | `host`, `port` | `username`, `password`, `database`, 또는 `falkor_db`로 임베디드 클라이언트 주입 |
| `KuzuDriver` | `db` (파일 경로) | 없음 |
| `NeptuneDriver` | `host`, `aoss_host` | `port` (기본 8182), `aoss_port` (기본 443) |

새 백엔드를 추가하려는 기여자는 `CONTRIBUTING.md`의 "Adding a graph driver" 절을 참고하도록 안내한다.

## LLM과 임베딩 제공자 설정

LLM 추론과 임베딩의 기본값은 OpenAI다. 그 밖의 제공자는 클라이언트 클래스를 교체해 연결한다.

| 제공자 | 클라이언트 클래스 | 비고 |
|---|---|---|
| OpenAI | 기본값 | `OPENAI_API_KEY` 필요 |
| Azure OpenAI | `AzureOpenAILLMClient`, `AzureOpenAIEmbedderClient` | 표준 `AsyncOpenAI`를 Azure v1 API 엔드포인트에 연결한다 |
| Google Gemini | `GeminiClient`, `GeminiEmbedder`, `GeminiRerankerClient` | LLM, 임베딩, reranking 세 역할을 모두 덮는다 |
| Anthropic | extra 지원 | `graphiti-core[anthropic]` |
| Groq | extra 지원 | `graphiti-core[groq]` |
| OpenAI 호환 호스팅 API | `OpenAIGenericClient` | DeepSeek, Together, OpenRouter, Fireworks 등 |
| 로컬 서버 | `OpenAIGenericClient` | Ollama, vLLM, llama.cpp, LM Studio |

### Azure OpenAI 연결

Azure는 OpenAI v1 API 호환 계층을 통해 연결한다. 별도 Azure 전용 SDK를 쓰지 않고 표준 `AsyncOpenAI` 클라이언트의 `base_url`을 `https://{리소스명}.openai.azure.com/openai/v1/` 형식으로 지정하는 방식이다. 이때 지정하는 모델 이름은 OpenAI의 공개 모델명이 아니라 사용자의 Azure 배포 이름과 일치해야 한다.

```python
from openai import AsyncOpenAI
from graphiti_core import Graphiti
from graphiti_core.llm_client.azure_openai_client import AzureOpenAILLMClient
from graphiti_core.llm_client.config import LLMConfig
from graphiti_core.embedder.azure_openai import AzureOpenAIEmbedderClient

azure_client = AsyncOpenAI(
    base_url="https://your-resource-name.openai.azure.com/openai/v1/",
    api_key="your-api-key",
)

graphiti = Graphiti(
    "bolt://localhost:7687", "neo4j", "password",
    llm_client=AzureOpenAILLMClient(
        azure_client=azure_client,
        config=LLMConfig(model="gpt-5-mini", small_model="gpt-5-mini"),
    ),
    embedder=AzureOpenAIEmbedderClient(
        azure_client=azure_client,
        model="text-embedding-3-small",
    ),
)
```

`LLMConfig`가 `model`과 `small_model`을 따로 받는다는 점에 유의한다. 무거운 추출 작업과 가벼운 보조 작업에 다른 모델을 지정할 수 있는 구조이며, 위 예제는 둘을 같은 배포로 맞췄다. 완전한 예제는 `examples/azure-openai/`에 있다.

### Google Gemini 연결

Gemini는 세 역할을 각각 다른 클라이언트로 지정한다. LLM은 `GeminiClient`, 임베딩은 `GeminiEmbedder`, reranking은 `GeminiRerankerClient`다. README 예제는 LLM에 `gemini-2.0-flash`, 임베딩에 `embedding-001`을 쓴다.

```python
from graphiti_core import Graphiti
from graphiti_core.llm_client.gemini_client import GeminiClient, LLMConfig
from graphiti_core.embedder.gemini import GeminiEmbedder, GeminiEmbedderConfig
from graphiti_core.cross_encoder.gemini_reranker_client import GeminiRerankerClient

api_key = "<your-google-api-key>"

graphiti = Graphiti(
    "bolt://localhost:7687", "neo4j", "password",
    llm_client=GeminiClient(config=LLMConfig(api_key=api_key, model="gemini-2.0-flash")),
    embedder=GeminiEmbedder(
        config=GeminiEmbedderConfig(api_key=api_key, embedding_model="embedding-001")
    ),
    cross_encoder=GeminiRerankerClient(
        config=LLMConfig(api_key=api_key, model="gemini-2.5-flash-lite")
    ),
)
```

reranker의 기본 모델은 `gemini-2.5-flash-lite`다. 비용과 latency를 낮춘 분류 작업에 맞춘 모델로, OpenAI reranker와 같은 boolean 분류 방식을 쓴다. 즉 passage가 관련 있는지를 참과 거짓으로 판정하게 하고, Gemini의 log probability 기능으로 그 판정의 확신도를 읽어 순위를 만든다.

### 로컬 모델과 OpenAI 호환 엔드포인트

OpenAI 호환 `/v1` 엔드포인트에는 `OpenAIClient`가 아니라 `OpenAIGenericClient`를 써야 한다. 두 클래스의 차이는 두 가지다. 후자는 기본 최대 토큰 한도가 1만 6천으로 전자의 8천보다 크고, 호환 제공자 전반의 구조화 출력을 처리하도록 설계됐다.

Ollama 예제는 LLM으로 `deepseek-r1:7b`, 임베딩으로 `nomic-embed-text`를 내려받아 쓴다. 임베딩 차원은 768로 지정하고 `base_url`은 `http://localhost:11434/v1`을 가리킨다. `api_key`는 실제 키가 필요 없지만 자리를 채울 값은 있어야 해서 `"ollama"` 같은 문자열을 넣는다. 실행 전에 `ollama serve`가 떠 있고 모델을 내려받았는지 확인해야 한다.

```python
from graphiti_core import Graphiti
from graphiti_core.llm_client.config import LLMConfig
from graphiti_core.llm_client.openai_generic_client import OpenAIGenericClient
from graphiti_core.embedder.openai import OpenAIEmbedder, OpenAIEmbedderConfig
from graphiti_core.cross_encoder.openai_reranker_client import OpenAIRerankerClient

llm_config = LLMConfig(
    api_key="ollama",
    model="deepseek-r1:7b",
    small_model="deepseek-r1:7b",
    base_url="http://localhost:11434/v1",
)
llm_client = OpenAIGenericClient(config=llm_config)

graphiti = Graphiti(
    "bolt://localhost:7687", "neo4j", "password",
    llm_client=llm_client,
    embedder=OpenAIEmbedder(
        config=OpenAIEmbedderConfig(
            api_key="ollama",
            embedding_model="nomic-embed-text",
            embedding_dim=768,
            base_url="http://localhost:11434/v1",
        )
    ),
    cross_encoder=OpenAIRerankerClient(client=llm_client, config=llm_config),
)
```

세 클라이언트가 모두 같은 로컬 엔드포인트를 가리키므로 LLM 추론과 임베딩과 reranking이 전부 로컬에서 처리된다. README는 이 구성을 프라이버시가 중요한 응용이나 API 비용을 피하려는 경우에 적합하다고 설명한다.

## 구조화 출력과 동시성

### 구조화 출력 의존성

Graphiti는 엔티티 추출과 엣지 추출, 중복 해소에 구조화(JSON) 출력을 사용한다. 그래서 스키마를 확실히 지키는 모델과 제공자에서 가장 안정적으로 동작한다. README는 OpenAI, Anthropic, Gemini를 그런 제공자로 지목하고, 다른 서비스를 쓰면 출력 스키마가 어긋나 인제스트가 실패할 수 있다고 명시한다. 작은 모델에서 특히 문제가 된다는 경고도 함께 붙인다.

`OpenAIGenericClient`는 이 문제에 대응해 `structured_output_mode` 옵션을 제공한다.

| 값 | 동작 | 권장 상황 |
|---|---|---|
| `json_schema` (기본) | `response_format`으로 네이티브 구조화 출력을 요청한다 | constrained decoding으로 스키마를 강제하는 유능한 모델과 제공자 |
| `json_object` | 일반 JSON 모드를 요청하고 스키마를 프롬프트에 주입한다 | `json_schema` 요청은 받아들이지만 실제로는 출력을 제약하지 않는 일부 로컬 서버 |

두 번째 값이 필요한 이유가 미묘하다. 일부 로컬 서버는 `json_schema` 요청을 오류 없이 수락하면서도 실제 디코딩을 스키마로 제약하지 않는다. 이 경우 네이티브 모드를 신뢰하는 편보다 스키마를 프롬프트에 직접 넣는 `json_object`가 오히려 더 안정적일 수 있다.

작거나 로컬인 모델을 쓸 때 README가 권하는 지침은 세 가지다.

- 실행할 수 있는 가장 유능한 모델을 고른다. 매우 작은 모델은 요청 스키마와 다른 JSON을 자주 생성하고, 그 결과가 추출 실패로 드러난다.
- Markdown 코드 펜스로 감싼 응답은 자동으로 벗겨지므로 별도 처리가 필요 없다.
- `SEMAPHORE_LIMIT`를 낮게 유지한다. 로컬 서버와 일부 제공자는 동시성 한도가 낮다.

### 동시성 기본값

인제스트 파이프라인 자체는 높은 동시성을 노리고 설계됐다. 그런데 기본값은 낮게 잡혀 있는데, LLM 제공자의 429 rate limit 오류를 피하기 위한 선택이다.

| 항목 | 값 |
|---|---|
| 제어 수단 | `SEMAPHORE_LIMIT` 환경 변수 |
| 기본값 | 동시 작업 10개 |
| 429 오류가 날 때 | 값을 더 낮춘다 |
| 제공자 처리량이 충분할 때 | 값을 올려 episode 인제스트 성능을 높인다 |

README가 "Graphiti가 느리다면 동시성을 올려라"를 절 제목 수준으로 앞세운 것은, 기본값 그대로 쓰는 사용자가 성능을 오해할 가능성을 염두에 둔 것으로 읽힌다.

## 텔레메트리

Graphiti 인스턴스를 초기화하면 익명 사용 통계를 수집한다. 기본이 수집 상태이고 opt-out 방식이라 명시적으로 꺼야 멈춘다.

| 수집 항목 | 내용 |
|---|---|
| 익명 식별자 | 무작위 생성 UUID. `~/.cache/graphiti/telemetry_anon_id`에 로컬 저장된다 |
| 시스템 정보 | 운영체제, Python 버전, 시스템 아키텍처 |
| Graphiti 버전 | 사용 중인 버전 |
| 설정 선택 | LLM 제공자 종류, 데이터베이스 백엔드, 임베딩 제공자 종류 |

수집하지 않는 항목도 여섯 가지로 못 박는다. 개인 정보와 식별자, API 키와 자격 증명, 실제 데이터와 질의와 그래프 내용, IP 주소와 호스트명, 파일 경로와 시스템 특이 정보, 그리고 episode와 노드와 엣지의 내용이다. 수집 목적으로는 인기 있는 설정 조합 파악, 집중할 LLM과 데이터베이스 제공자 판단, 로드맵을 위한 도입 추이 추적, Python 버전과 운영체제 호환성 확인을 든다.

끄는 방법은 세 가지다.

| 방법 | 수단 |
|---|---|
| 환경 변수 | `export GRAPHITI_TELEMETRY_ENABLED=false` |
| 셸 프로필 | `~/.bashrc` 또는 `~/.zshrc`에 같은 export 추가 |
| Python 세션 | Graphiti 초기화 전에 `os.environ['GRAPHITI_TELEMETRY_ENABLED'] = 'false'` |

`pytest`가 감지되는 테스트 실행 중에는 자동으로 비활성화된다. 수집은 PostHog을 쓰고, 모든 텔레메트리 동작은 조용히 실패하도록 설계돼 애플리케이션을 중단시키거나 Graphiti 기능에 영향을 주지 않는다. 텔레메트리 코드 위치도 `graphiti_core/telemetry/telemetry.py`로 공개한다.

## 설계 포지션

### GraphRAG와의 비교

README는 정량 벤치마크 대신 설계 포지션 비교를 제시한다. 대비 상대는 [[database/microsoft-graphrag]]다.

| 항목 | GraphRAG | Graphiti |
|---|---|---|
| 주요 용도 | 정적 문서 요약 | 에이전트를 위한 동적이고 변화하는 컨텍스트 |
| 데이터 처리 | 배치 지향 | 연속적 증분 갱신 |
| 지식 구조 | 엔티티 클러스터와 community 요약 | temporal context graph (엔티티, 유효 기간 있는 사실, episode, community) |
| retrieval 방식 | 순차적 LLM 요약 | 의미 검색과 키워드 검색과 그래프 검색의 hybrid |
| 적응성 | 낮음 | 높음 |
| 시간 처리 | 기본적인 타임스탬프 추적 | 명시적 bi-temporal 추적과 자동 사실 무효화 |
| 모순 처리 | LLM 요약이 내리는 판단 | 시간 이력을 보존한 자동 사실 무효화 |
| 질의 latency | 수 초에서 수십 초 | 통상 1초 미만 |
| 커스텀 엔티티 타입 | 지원하지 않음 | Pydantic 모델로 지원 |
| 확장성 | 보통 | 높음. 대규모 데이터셋에 최적화 |

이 표는 자사 저장소가 자사 관점으로 작성한 비교이므로 그대로 벤치마크 결과로 읽을 수는 없다. 다만 열의 구성 자체가 Graphiti의 설계 의도를 드러낸다. 배치와 증분, 정적 요약과 시간 추적, LLM 요약과 hybrid retrieval이라는 세 대비가 반복되고, 이는 그대로 latency와 모순 처리의 차이로 이어진다.

README의 결론은 Graphiti가 동적이고 자주 갱신되는 데이터셋의 문제를 겨냥해 설계됐으며, 실시간 상호작용과 정밀한 과거 시점 질의가 필요한 응용에 특히 적합하다는 것이다.

### Zep과 Graphiti의 역할 구분

Zep은 관리형 서비스이고 Graphiti는 그 코어의 오픈소스 엔진이다. Zep 내부는 자체 그래프 데이터베이스인 Context Graph Engine으로 동작하며, 수백만 개의 context graph를 낮은 latency로 검색하도록 만들어졌기 때문에 프로덕션 배포에 별도 서드파티 그래프 데이터베이스가 필요하지 않다. Graphiti를 자체 호스팅하면 이 부분을 사용자가 직접 준비한다.

| 항목 | Zep | Graphiti |
|---|---|---|
| 정체 | AI 에이전트를 위한 관리형 context graph 인프라 | 오픈소스 temporal context graph 엔진 |
| context graph 규모 | 사용자별, 엔티티별 context graph를 대량으로 관리하며 거버넌스를 제공 | 개별 context graph를 구축하고 질의 |
| 그래프 데이터베이스 | 자체 Context Graph Engine. 서드파티 벤더가 필요 없다 | 서드파티 그래프 데이터베이스를 직접 준비 |
| 사용자와 대화 관리 | users, threads, message 저장이 내장 | 직접 구현 |
| retrieval과 성능 | 사전 구성된 프로덕션급 retrieval. 대규모에서 200ms 미만 | 직접 구현. 성능은 구성에 따라 달라진다 |
| 개발자 도구 | 그래프 시각화 대시보드, 디버그 로그, API 로그, Python과 TypeScript와 Go SDK | 직접 구현 |
| 엔터프라이즈 기능 | SLA, 지원, 보안 보증 | 자체 관리 |
| 배포 | 완전 관리형 또는 사용자 클라우드 | 자체 호스팅만 |

선택 기준은 README가 직접 제시한다. 보안과 성능과 지원이 갖춰진 턴키 엔터프라이즈 플랫폼을 원하면 Zep을 고르고, 유연한 오픈소스 코어를 원하며 주변 시스템을 직접 구축하고 운영할 수 있다면 Graphiti를 고른다. 표의 Graphiti 열에서 사용자와 대화 관리, retrieval과 성능, 개발자 도구 세 항목이 모두 직접 구현으로 표시된다. Graphiti 선택은 엔진 획득과 동시에 이 세 가지 구축 부담을 받아들이는 결정이다.

## 한계

| 한계 | 내용 |
|---|---|
| 외부 의존성 | 별도 그래프 데이터베이스와 LLM API 키가 있어야 동작한다. Zep 관리형과 달리 retrieval과 성능과 운영을 직접 구성해야 하고 개발자 도구도 직접 만들어야 한다 |
| 작은 모델 취약 | 구조화 출력에 의존하므로 작거나 로컬인 모델에서는 추출 실패가 잦다. README도 실행할 수 있는 가장 유능한 모델을 권한다 |
| Kuzu 백엔드 폐기 예정 | 업스트림 Kuzu 프로젝트가 유지보수를 멈춰 드라이버가 향후 릴리스에서 제거될 예정이다. 현재는 함께 배포되지만 `DeprecationWarning`을 발생시킨다. 신규 프로젝트는 Neo4j나 FalkorDB를 써야 한다 |
| 낮은 기본 동시성 | `SEMAPHORE_LIMIT` 기본값 10은 429 오류 방지용이라 그대로 쓰면 느리다. 제공자 처리량에 맞춰 조정해야 한다 |
| Neptune의 추가 요구 사항 | Amazon Neptune 백엔드는 전문 검색을 위해 Amazon OpenSearch Serverless collection을 별도로 갖춰야 한다 |
| 익명 텔레메트리 기본 수집 | 설정과 버전 같은 익명 통계를 기본으로 전송한다. opt-out 방식이라 끄려면 별도 설정이 필요하다 |
| 저장소 자체 성능 근거 부재 | README는 정량 벤치마크를 담지 않고 논문과 자사 블로그 링크로 넘긴다. 자체 구성에서의 성능은 직접 측정해야 한다 |

## 문서와 기여

저장소 밖의 참고 자료는 Zep 문서 사이트에 모여 있다.

| 자료 | 내용 |
|---|---|
| Guides and API documentation | `help.getzep.com/graphiti`의 전체 가이드와 API 문서 |
| Quick Start | 문서 사이트 버전의 시작 안내 |
| LangGraph 통합 가이드 | LangChain의 LangGraph로 Graphiti 기반 에이전트를 만드는 절차 |

기여는 코드에 한정하지 않는다. README는 코드, 문서, GitHub Issue 대응, 다른 사용자 지원을 모두 기여로 명시하고 코드 기여 지침은 `CONTRIBUTING.md`로 안내한다. 질문과 버그 보고와 논의는 GitHub Issue 하나로 받는다. 라이선스는 Apache-2.0으로 기록돼 있다. README 본문에는 라이선스 조항을 다시 적지 않으므로 사용 조건은 저장소의 LICENSE 파일에서 확인해야 한다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| context graph | 엔티티와 사실과 episode를 시간 축과 함께 담은 그래프. 각 사실에 유효 기간이 붙는다 |
| episode | 인제스트된 원본 데이터 단위. ground truth 스트림이며 모든 파생 사실의 provenance다 |
| graphiti-core | PyPI 배포 패키지 이름. 백엔드와 LLM 제공자는 extra로 덧붙인다 |
| Context Graph Engine | Zep 관리형 서비스 내부의 자체 그래프 데이터베이스. 오픈소스가 아니며 Graphiti와 별개다 |
| SEMAPHORE_LIMIT | 인제스트 동시성을 제어하는 환경 변수. 기본값 10으로 429 rate limit 오류를 피한다 |
| structured_output_mode | `OpenAIGenericClient`에서 구조화 출력 방식을 고르는 옵션. `json_schema`와 `json_object` 중 하나를 쓴다 |

## 관련 페이지

- [[agents/rasmussen-2025-zep-a-temporal-knowledge-graph]]: 이 저장소가 구현하는 원논문. 3계층 그래프 구조, bi-temporal 모델, edge invalidation의 설계 근거와 DMR, LongMemEval 정량 결과를 담당한다. 이 페이지는 설치와 설정과 API 표면을 담당한다
- [[database/microsoft-graphrag]]: README가 표로 명시적으로 대비하는 정적 배치형 graph RAG 구현체
- [[database/edge-2024-from-local-to-global]]: GraphRAG 원논문. community 요약과 배치 인덱싱 개념의 출처
- [[database/dsba-2025-graphrag-paper-review]]: GraphRAG 논문의 한글 해설. 배치 인덱싱 비용 구조를 다룬다
- [[agents/qiao-2026-memory-intelligence-agent]]: 에이전트 메모리를 다루는 다른 접근. temporal graph 대신 메모리 계층 설계에 초점을 둔다
- [[agents/rodrigues-2026-mcp-server-architecture-patterns]]: `mcp_server/`가 따르는 MCP 서버 아키텍처 패턴의 일반론
