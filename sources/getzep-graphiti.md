---
title: "getzep/graphiti"
type: repo
year: 2025
category: agents
raw_path: raw/repos/getzep-graphiti.md
raw_filename: "getzep-graphiti.md"
source_collection: external
org: "getzep"
repo: "graphiti"
url: "https://github.com/getzep/graphiti"
license: "Apache-2.0"
tags: [agent-memory, knowledge-graph, temporal-knowledge-graph, graphiti, zep, graph-rag, hybrid-search, neo4j]
---

## 한 줄 요약 (One-line Summary)

Graphiti는 AI 에이전트용 temporal context graph를 구축하고 질의하는 오픈소스 프레임워크로, 사실이 시간에 따라 어떻게 바뀌는지 추적하고 원본 데이터까지 출처를 남기며 Zep 상용 서비스의 그래프 엔진을 Apache-2.0으로 공개한 것이다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 저장소 | [getzep/graphiti](https://github.com/getzep/graphiti) |
| 라이선스 | Apache-2.0 |
| 패키지 | `graphiti-core` (PyPI) |
| 런타임 | Python 3.10 이상. 임베디드 FalkorDB Lite는 3.12 이상 |
| 관련 논문 | Rasmussen et al. 2025, "Zep: A Temporal Knowledge Graph Architecture for Agent Memory" (arXiv:2501.13956) |
| 부속 컴포넌트 | `mcp_server/` (MCP 서버), `server/` (FastAPI REST 서비스), `examples/` (quickstart, azure-openai) |

Graphiti는 Zep의 컨텍스트 인프라 핵심에 있는 오픈소스 temporal context graph 엔진이다. README는 이를 "context graph" 프레임워크로 부른다. context graph는 엔티티와 관계와 사실을 시간 축과 함께 담아 각 사실이 언제 참이 됐고 언제 대체됐는지를 유효 기간으로 표현한 그래프를 말한다. 정적 knowledge graph와 달리 사실마다 유효 기간이 붙고 모든 파생 정보는 원본 episode로 거슬러 올라간다.

README가 제시하는 대표 예시는 "Kendra loves Adidas shoes (as of March 2026)"다. 같은 사실이 2026년 3월 기준으로는 참이지만 이후 뒤집힐 수 있고, 그 전환 시점까지 그래프가 함께 보관한다는 뜻이다.

README는 Graphiti의 용도를 세 가지로 제시한다.

- 상호작용마다 자라나는 context graph를 구축해 지금 참인 것과 이전에 참이었던 것을 함께 추적한다.
- 평평한 문서 chunk나 원시 대화 이력 대신 구조화된 컨텍스트를 에이전트에 제공한다.
- hybrid retrieval로 시간과 의미와 관계를 아울러 질의한다.

## 2. 주요 기여 (Key Contributions)

README는 기존 RAG 방식이 배치 처리와 정적 요약에 의존해 자주 바뀌는 데이터에 비효율적이라고 지적하고, Graphiti가 제공하는 이점을 여섯 가지로 정리한다.

| 항목 | 내용 |
|---|---|
| Temporal Fact Management | 사실마다 유효 기간이 있다. 정보가 바뀌면 예전 사실을 삭제하지 않고 무효화한다. 지금 참인 것과 과거 임의 시점에 참이었던 것을 모두 질의할 수 있다 |
| Episodes와 provenance | 모든 엔티티와 관계가 그것을 만들어낸 episode(원본 데이터)로 거슬러 올라간다. 파생 사실에서 원본까지 계보가 완전히 남는다 |
| Prescribed와 learned ontology | Pydantic 모델로 엔티티 타입과 엣지 타입을 미리 정의하거나(prescribed), 데이터에서 구조가 자라나게 둘 수 있다(learned) |
| Incremental Graph Construction | 새 데이터가 배치 재계산 없이 즉시 통합된다. episode가 인제스트되는 대로 그래프가 실시간으로 갱신된다 |
| Hybrid Retrieval | 의미 임베딩, 키워드(BM25), 그래프 순회를 결합해 LLM 요약에 의존하지 않고 낮은 latency로 정밀하게 질의한다 |
| Scalability | 병렬 처리와 교체 가능한 그래프 백엔드로 대규모 데이터셋을 다루며 엔터프라이즈 워크로드를 겨냥한다 |

여기에 저장소는 두 가지 실행 계층을 함께 제공한다. `mcp_server/`는 Claude와 Cursor 같은 MCP 클라이언트에 temporal 메모리를 연결하는 Model Context Protocol 서버이고, `server/`는 FastAPI로 구현한 REST 서비스다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### context graph 구성 요소

| 구성 요소 | 저장하는 것 |
|---|---|
| Entities (노드) | 사람, 제품, 정책, 개념. 시간에 따라 요약이 갱신된다 |
| Facts / Relationships (엣지) | (엔티티 → 관계 → 엔티티) 삼중항에 유효 기간을 붙인 것 |
| Episodes (provenance) | 인제스트된 그대로의 원본 데이터. ground truth 스트림이며 모든 파생 사실이 여기로 귀속된다 |
| Custom Types (ontology) | Pydantic 모델로 개발자가 정의한 엔티티 타입과 엣지 타입 |

README는 Graphiti의 고유한 점을 비정형과 정형 데이터로부터 context graph를 자율적으로 구축하면서, 바뀌는 관계를 처리하는 동시에 전체 시간 이력을 보존하는 능력이라고 설명한다.

### 그래프 백엔드

그래프 데이터베이스는 교체할 수 있고, 각 백엔드는 별도 extra로 설치한다.

| 백엔드 | 요구 버전과 조건 | 드라이버 클래스 | 기본 데이터베이스 이름 |
|---|---|---|---|
| Neo4j | 5.26 | `Neo4jDriver` | `neo4j` (하드코딩) |
| FalkorDB | 1.1.2 | `FalkorDriver` | `default_db` (하드코딩) |
| FalkorDB Lite (임베디드) | Python 3.12 이상 | `FalkorDriver` + `AsyncFalkorDB` | 파일 경로 지정 |
| Amazon Neptune | Neptune Database Cluster 또는 Neptune Analytics Graph에 Amazon OpenSearch Serverless collection 필요 (전문 검색 백엔드 역할) | `NeptuneDriver` | 해당 없음 |
| Kuzu | 0.11.2, **폐기 예정** | `KuzuDriver` | 파일 경로 지정 |

데이터베이스 이름은 드라이버 생성자에서 직접 설정한다. v0.17.0부터는 드라이버를 직접 생성해 Graphiti 생성자의 `graph_driver` 인자로 넘기면 데이터베이스 이름 같은 설정을 바꿀 수 있다. `Neo4jDriver`는 `uri`, `user`, `password`, `database`를 받고, `FalkorDriver`는 `host`, `port`에 선택 인자 `username`, `password`, `database`를 받는다. `NeptuneDriver`는 `host`와 `aoss_host`를 받고 `port`는 기본 8182, `aoss_port`는 기본 443이다. 새 그래프 백엔드를 추가하려는 기여자는 `CONTRIBUTING.md`의 "Adding a graph driver" 절을 참고하도록 안내한다.

### LLM과 임베딩 제공자

LLM 추론과 임베딩의 기본값은 OpenAI이며 `OPENAI_API_KEY`가 환경에 있어야 한다.

| 제공자 | 지원 방식 | 비고 |
|---|---|---|
| OpenAI | 기본 | `OPENAI_API_KEY` 필요 |
| Azure OpenAI | `AzureOpenAILLMClient`, `AzureOpenAIEmbedderClient` | 표준 `AsyncOpenAI` 클라이언트를 Azure v1 API 엔드포인트(`https://{resource}.openai.azure.com/openai/v1/`)에 연결한다. 모델 이름은 Azure 배포 이름과 일치시킨다 |
| Google Gemini | `GeminiClient`, `GeminiEmbedder`, `GeminiRerankerClient` | `graphiti-core[google-genai]` extra. LLM, 임베딩, reranking 세 역할 모두 지원 |
| Anthropic | extra 지원 | `graphiti-core[anthropic]` |
| Groq | extra 지원 | `graphiti-core[groq]` |
| OpenAI 호환 호스팅 API | `OpenAIGenericClient` | DeepSeek, Together, OpenRouter, Fireworks 등 |
| 로컬 서버 | `OpenAIGenericClient` | Ollama, vLLM, llama.cpp, LM Studio |

Gemini reranker는 기본 모델이 `gemini-2.5-flash-lite`다. 비용과 latency를 낮춘 분류 작업에 맞춘 모델이며, OpenAI reranker와 같은 boolean 분류 방식을 쓰고 Gemini의 log probability 기능으로 passage 관련도를 순위화한다.

OpenAI 호환 엔드포인트에는 `OpenAIClient`가 아니라 `OpenAIGenericClient`를 써야 한다. 후자는 기본 최대 토큰 한도가 1만 6천으로 전자의 8천보다 크고, 호환 제공자 전반의 구조화 출력을 처리하도록 설계됐다. Ollama 예시는 LLM으로 `deepseek-r1:7b`, 임베딩으로 `nomic-embed-text`(차원 768)를 내려받고 `base_url`을 `http://localhost:11434/v1`로 지정한다. `api_key`는 실제 키가 필요 없지만 자리를 채울 값은 있어야 한다.

### 설치 extra

기본 설치는 `pip install graphiti-core` 또는 `uv add graphiti-core`다. 백엔드와 제공자는 extra로 덧붙인다.

| extra | 용도 | 조건 |
|---|---|---|
| `falkordb` | FalkorDB 백엔드 | 없음 |
| `falkordblite` | 임베디드 FalkorDB | Python 3.12 이상 |
| `kuzu` | Kuzu 백엔드 | 폐기 예정. `DeprecationWarning` 발생 |
| `neptune` | Amazon Neptune 백엔드 | OpenSearch Serverless collection 필요 |
| `anthropic` | Anthropic LLM | 없음 |
| `groq` | Groq LLM | 없음 |
| `google-genai` | Google Gemini LLM, 임베딩, reranker | 없음 |

extra는 `graphiti-core[falkordb,anthropic,google-genai]`처럼 조합할 수 있다.

### 구조화 출력과 동시성

Graphiti는 엔티티 추출과 엣지 추출, 중복 해소에 구조화(JSON) 출력을 사용한다. 그래서 스키마를 확실히 지키는 모델과 제공자(OpenAI, Anthropic, Gemini)에서 가장 안정적으로 동작한다. README는 다른 서비스를 쓰면 출력 스키마가 어긋나 인제스트가 실패할 수 있고, 작은 모델에서 특히 문제가 된다고 명시한다.

`OpenAIGenericClient`는 이 문제에 대응해 `structured_output_mode` 옵션을 제공한다.

| 값 | 동작 | 권장 상황 |
|---|---|---|
| `json_schema` (기본) | `response_format`으로 네이티브 구조화 출력을 요청한다 | constrained decoding으로 스키마를 강제하는 유능한 모델과 제공자 |
| `json_object` | 일반 JSON 모드를 요청하고 스키마를 프롬프트에 주입한다 | `json_schema` 요청을 받아들이지만 실제로는 출력을 제약하지 않는 일부 로컬 서버. 이 경우 `json_object`가 오히려 더 안정적일 수 있다 |

작거나 로컬인 모델을 쓸 때 README가 권하는 지침은 세 가지다. 실행할 수 있는 가장 유능한 모델을 고르고, 매우 작은 모델은 요청 스키마와 다른 JSON을 자주 생성해 추출 실패로 드러난다는 점을 감안한다. Markdown 코드 펜스로 감싼 응답은 자동으로 벗겨진다. 로컬 서버와 일부 제공자는 동시성 한도가 낮으므로 `SEMAPHORE_LIMIT`를 낮게 유지한다.

인제스트 파이프라인 자체는 높은 동시성을 노리고 설계됐지만, 기본값은 LLM 제공자의 429 rate limit 오류를 피하려고 낮게 잡혀 있다. `SEMAPHORE_LIMIT` 환경 변수가 동시 작업 수를 제어하며 기본값은 10이다. 429 오류가 나면 이 값을 더 낮추고, 제공자가 더 높은 처리량을 허용하면 값을 올려 episode 인제스트 성능을 높인다.

### 시작 절차와 배포

`examples/quickstart/`의 예제는 여섯 단계를 보여준다.

1. Neo4j, Amazon Neptune, FalkorDB, Kuzu 중 하나에 연결한다.
2. Graphiti의 인덱스와 제약 조건을 초기화한다.
3. 그래프에 episode를 추가한다. 텍스트와 구조화 JSON 둘 다 다룬다.
4. hybrid search로 관계(엣지)를 검색한다.
5. 그래프 거리로 검색 결과를 reranking한다.
6. 미리 정의된 search recipe로 노드를 검색한다.

로컬 실행에는 Docker Compose를 쓴다. `docker compose up`은 Neo4j 서비스와 관련 컴포넌트를 띄우고, `docker compose --profile falkordb up`은 FalkorDB 쪽을 띄운다. FalkorDB만 단독으로 쓰려면 `docker run -p 6379:6379 -p 3000:3000 -it --rm falkordb/falkordb:latest`로도 시작할 수 있다. Neo4j를 가장 간단히 설치하는 방법으로는 Neo4j Desktop을 안내한다.

MCP 서버의 주요 기능은 다섯 가지다. episode 관리(추가, 조회, 삭제), 엔티티 관리와 관계 처리, 의미 검색과 hybrid 검색, 관련 데이터를 묶는 group 관리, 그래프 유지보수 작업이다. Neo4j와 함께 Docker로 배포할 수 있어 AI 어시스턴트 워크플로에 붙이기 쉽다고 설명한다.

문서는 `help.getzep.com/graphiti`에 가이드와 API 문서, Quick Start, 그리고 LangChain의 LangGraph로 에이전트를 만드는 통합 가이드가 있다.

### 텔레메트리

Graphiti 인스턴스를 초기화하면 익명 사용 통계를 수집한다. 수집 대상은 네 가지다.

| 수집 항목 | 내용 |
|---|---|
| 익명 식별자 | 무작위 생성 UUID. `~/.cache/graphiti/telemetry_anon_id`에 로컬 저장된다 |
| 시스템 정보 | 운영체제, Python 버전, 시스템 아키텍처 |
| Graphiti 버전 | 사용 중인 버전 |
| 설정 선택 | LLM 제공자 종류, 데이터베이스 백엔드, 임베딩 제공자 종류 |

수집하지 않는 항목도 여섯 가지로 명시한다. 개인 정보와 식별자, API 키와 자격 증명, 실제 데이터와 질의와 그래프 내용, IP 주소와 호스트명, 파일 경로와 시스템 특이 정보, episode와 노드와 엣지의 내용이다. 수집 목적은 인기 있는 설정 조합 파악, 집중할 LLM과 데이터베이스 제공자 판단, 로드맵을 위한 도입 추이 추적, Python 버전과 운영체제 호환성 확인이다.

텔레메트리는 opt-out이며 언제든 끌 수 있다. 방법은 환경 변수 `GRAPHITI_TELEMETRY_ENABLED=false` 지정, 셸 프로필에 같은 export 추가, Python 세션에서 `os.environ`으로 설정하는 세 가지다. `pytest`가 감지되는 테스트 실행 중에는 자동으로 비활성화된다. 수집은 PostHog을 쓰고, 모든 텔레메트리 동작은 조용히 실패하도록 설계돼 애플리케이션을 중단시키거나 Graphiti 기능에 영향을 주지 않는다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

정량 성능 수치는 이 저장소가 아니라 Zep 논문에 있다. README는 "Using Graphiti, we've demonstrated Zep is the State of the Art in Agent Memory"라는 자사 블로그 링크와 논문 링크를 제시하는 데 그친다. DMR과 LongMemEval 결과는 논문 요약([[agents/rasmussen-2025-zep-a-temporal-knowledge-graph]])에 정리돼 있다.

README가 대신 제시하는 것은 설계 포지션 비교 두 개다.

### Graphiti와 GraphRAG 비교

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

README는 이 비교를 근거로 Graphiti가 동적이고 자주 갱신되는 데이터셋의 문제를 겨냥해 설계됐으며, 실시간 상호작용과 정밀한 과거 시점 질의가 필요한 응용에 특히 적합하다고 정리한다.

### Zep과 Graphiti의 역할 구분

Zep은 관리형 서비스이고 Graphiti는 그 코어의 오픈소스 엔진이다. Zep 내부는 자체 그래프 데이터베이스인 Context Graph Engine으로 동작하며, 수백만 개의 context graph를 낮은 latency로 검색하도록 만들어졌기 때문에 프로덕션 배포에 별도 서드파티 그래프 데이터베이스가 필요하지 않다.

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

README의 선택 기준은 명확하다. 보안과 성능과 지원이 갖춰진 턴키 엔터프라이즈 플랫폼을 원하면 Zep을 고르고, 유연한 오픈소스 코어를 원하며 주변 시스템을 직접 구축하고 운영할 수 있다면 Graphiti를 고른다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

| 한계 | 내용 |
|---|---|
| 외부 의존성 | 별도 그래프 데이터베이스와 LLM API 키가 있어야 동작한다. Zep 관리형과 달리 retrieval과 성능과 운영을 직접 구성해야 하고, 개발자 도구도 직접 만들어야 한다 |
| 작은 모델 취약 | 구조화 출력에 의존하므로 작거나 로컬인 모델에서는 추출 실패가 잦다. README도 실행할 수 있는 가장 유능한 모델을 권한다 |
| Kuzu 백엔드 폐기 예정 | 업스트림 Kuzu 프로젝트가 유지보수를 멈춰 드라이버가 향후 릴리스에서 제거될 예정이다. 현재는 함께 배포되지만 `DeprecationWarning`을 발생시킨다. 신규 프로젝트는 Neo4j나 FalkorDB를 써야 한다 |
| 낮은 기본 동시성 | `SEMAPHORE_LIMIT` 기본값 10은 429 오류 방지용이라 그대로 쓰면 느리다. 제공자 처리량에 맞춰 조정해야 한다 |
| Neptune의 추가 요구 사항 | Amazon Neptune 백엔드는 전문 검색을 위해 Amazon OpenSearch Serverless collection을 별도로 갖춰야 한다 |
| 익명 텔레메트리 기본 수집 | 설정과 버전 같은 익명 통계를 기본으로 전송한다. opt-out 방식이라 끄려면 `GRAPHITI_TELEMETRY_ENABLED=false`를 지정해야 한다 |
| 저장소 자체 성능 근거 부재 | README는 정량 벤치마크를 담지 않고 논문과 자사 블로그 링크로 넘긴다. 자체 구성에서의 성능은 직접 측정해야 한다 |

## 6. 관련 연구 (Related Work)

- **Zep 논문 (Rasmussen et al. 2025).** 이 저장소의 엔진을 다룬 원논문이며 arXiv:2501.13956이다. README가 링크로 제시한다. bi-temporal 모델과 edge invalidation의 설계 근거와 정량 벤치마크가 여기 있다.
- **microsoft/graphrag.** README가 표로 명시적으로 대비하는 정적 배치형 graph RAG. Graphiti는 증분 갱신과 hybrid retrieval로 차별화한다.
- **Neo4j / FalkorDB / Amazon Neptune / Kuzu.** 교체 가능한 그래프 데이터베이스 백엔드.
- **LangGraph 통합 가이드.** Zep 문서 사이트가 LangChain의 LangGraph로 Graphiti 기반 에이전트를 만드는 가이드를 제공한다.

## 7. 용어집 (Glossary)

- **Graphiti**: 이 저장소. temporal context graph를 구축하고 질의하는 오픈소스 엔진.
- **context graph**: 엔티티와 사실과 episode를 시간 축과 함께 담은 그래프. 각 사실에 유효 기간이 붙는다. README가 정적 knowledge graph와 구분하려고 쓰는 이름이다.
- **episode**: 인제스트된 원본 데이터 단위. ground truth 스트림이며 모든 파생 사실의 provenance다.
- **graphiti-core**: PyPI 배포 패키지 이름. 백엔드와 LLM 제공자는 extra로 덧붙인다.
- **Context Graph Engine**: Zep 관리형 서비스 내부의 자체 그래프 데이터베이스. 오픈소스가 아니며 Graphiti와 별개다.
- **SEMAPHORE_LIMIT**: 인제스트 동시성을 제어하는 환경 변수. 기본값 10으로 429 rate limit 오류를 피한다.
- **structured_output_mode**: `OpenAIGenericClient`에서 구조화 출력 방식을 고르는 옵션. `json_schema`와 `json_object` 중 하나를 쓴다.
- **search recipe**: quickstart가 소개하는 미리 정의된 노드 검색 설정.
