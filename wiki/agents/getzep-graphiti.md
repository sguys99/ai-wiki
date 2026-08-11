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

## 요약 (Summary)

Graphiti는 AI 에이전트를 위한 temporal context graph를 짓고 질의하는 오픈소스 프레임워크다. Zep 논문([[agents/rasmussen-2025-zep-a-temporal-knowledge-graph]], arXiv:2501.13956)이 소개한 메모리 엔진을 그대로 구현한 것으로, Zep의 상용 인프라 밑에 깔린 엔진을 떼어내 Apache-2.0으로 공개했다. context graph는 엔티티·관계·사실을 시간 축과 함께 담아 각 사실이 언제 참이 됐고 언제 뒤집혔는지를 유효 기간으로 표현한 그래프를 말한다. 정적 knowledge graph와 달리 사실마다 유효 기간이 붙고 모든 파생 정보는 원본 episode로 거슬러 올라간다. `pip install graphiti-core` 한 줄로 시작한다.

## 주요 기여 (Key Contributions)

- **오픈소스 엔진.** 논문이 설명한 3계층 그래프와 bi-temporal 갱신 로직을 `graphiti-core` 패키지로 배포한다.
- **temporal fact 관리.** 정보가 바뀌면 예전 사실을 지우지 않고 무효로 표시한다. 지금 참인 것과 과거 어느 시점에 참이었던 것을 모두 질의할 수 있다.
- **증분 갱신.** 배치 재계산 없이 새 episode가 들어오는 즉시 그래프에 통합된다. GraphRAG류의 배치 인덱싱과 대비되는 지점이다.
- **hybrid retrieval.** 의미 임베딩, 키워드(BM25), 그래프 순회를 결합해 LLM 요약에 기대지 않고 낮은 latency로 검색한다.
- **prescribed·learned ontology.** Pydantic 모델로 엔티티·엣지 타입을 미리 정의하거나, 데이터에서 구조가 자라나게 둘 수 있다.
- **MCP 서버.** Claude·Cursor 같은 MCP 클라이언트에 temporal 메모리를 붙이는 Model Context Protocol 서버를 함께 제공한다.

## 방법론 및 아키텍처 (Methodology and Architecture)

context graph는 네 요소로 구성된다. 엔티티는 사람·제품·정책·개념을 노드로 담고 시간에 따라 요약이 갱신된다. 사실(관계)은 (엔티티 → 관계 → 엔티티) 삼중항에 유효 기간을 붙인 엣지다. episode는 들어온 원본 데이터로, 모든 파생 사실이 여기로 출처를 남긴다. custom 타입은 Pydantic 모델로 정의하는 개발자 지정 엔티티·엣지 타입이다.

그래프 백엔드는 갈아 끼울 수 있다. Neo4j 5.26, FalkorDB 1.1.2, Amazon Neptune, (곧 폐기 예정인) Kuzu를 지원한다. LLM 추론과 임베딩은 기본이 OpenAI다. Anthropic·Gemini·Groq은 확장으로 지원한다. DeepSeek·Together·OpenRouter 같은 OpenAI 호환 엔드포인트나 Ollama·vLLM·llama.cpp 같은 로컬 서버도 `OpenAIGenericClient`로 붙일 수 있다.

Graphiti는 엔티티·엣지 추출과 중복 해소에 구조화(JSON) 출력을 쓰기 때문에, 스키마를 확실히 지키는 모델(OpenAI·Anthropic·Gemini)에서 가장 잘 돈다. 작은 로컬 모델은 스키마를 어긋나게 뱉어 추출이 실패하기 쉬워서 `structured_output_mode`로 `json_schema`와 `json_object` 중 하나를 고르게 열어 뒀다. 인제스트 파이프라인은 높은 동시성을 노리지만 LLM 제공자의 429 rate limit을 피하려고 `SEMAPHORE_LIMIT` 기본값을 10으로 낮게 둔다.

README는 성능 수치 대신 GraphRAG와의 설계 대비를 정리한다. GraphRAG는 정적 문서 요약을 배치로 처리하고 초 단위 latency에 커스텀 엔티티 타입을 못 쓴다. Graphiti는 증분 갱신과 hybrid 검색으로 보통 1초 미만 latency를 내고 bi-temporal 추적으로 모순 사실을 자동 무효화하며 Pydantic 커스텀 타입을 지원한다. 자주 바뀌는 데이터의 실시간 상호작용과 정밀한 과거 시점 질의가 이 저장소가 겨냥하는 지점이다. 성능 벤치마크(DMR 94.8%, LongMemEval 최대 18.5% 향상)는 [[agents/rasmussen-2025-zep-a-temporal-knowledge-graph|Zep 논문]] 쪽에 있다.

## 한계 (Limitations)

- **외부 의존성.** 별도 그래프 데이터베이스(Neo4j·FalkorDB 등)와 LLM API 키가 있어야 돈다. Zep 관리형과 달리 검색·성능·운영을 직접 구성해야 한다.
- **작은 모델 취약.** 구조화 출력에 기대므로 작거나 로컬인 모델에서는 추출 실패가 잦다.
- **Kuzu 백엔드 폐기 예정.** 업스트림이 유지보수를 멈춰 Kuzu 드라이버는 곧 제거된다. 신규 프로젝트는 Neo4j·FalkorDB를 써야 한다.
- **rate limit 튜닝.** 기본 동시성이 낮아 그대로 쓰면 느리다. 제공자 처리량에 맞춰 `SEMAPHORE_LIMIT`를 손봐야 한다.
- **익명 텔레메트리 기본 수집.** 설정·버전 같은 익명 통계를 기본으로 보낸다(opt-out). `GRAPHITI_TELEMETRY_ENABLED=false`로 끈다.

## 관련 페이지 (Related Pages)

- [[agents/rasmussen-2025-zep-a-temporal-knowledge-graph]] — 이 저장소가 구현하는 원논문. 3계층 그래프·bi-temporal 모델·edge invalidation의 근거
- [[database/microsoft-graphrag]] — README가 명시적으로 대비하는 정적 배치형 graph RAG 구현체
- [[database/edge-2024-from-local-to-global]] — GraphRAG 원논문. community 요약 개념의 출처
