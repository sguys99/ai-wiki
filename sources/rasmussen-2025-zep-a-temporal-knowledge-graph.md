---
title: "Zep: A Temporal Knowledge Graph Architecture for Agent Memory"
type: paper
year: 2025
category: agents
raw_path: raw/papers/rasmussen-2025-zep-a-temporal-knowledge-graph.pdf
raw_filename: "rasmussen-2025-zep-a-temporal-knowledge-graph.pdf"
source_collection: external
authors: "Preston Rasmussen, Pavlo Paliychuk, Travis Beauvais, Jack Ryan, Daniel Chalef"
arxiv_id: "2501.13956"
tags: [agent-memory, knowledge-graph, temporal-knowledge-graph, graphiti, zep, memgpt, longmemeval, graph-rag]
figures:
  - id: tab01
    label: Table 1
    kind: table
    file: assets/rasmussen-2025-zep-a-temporal-knowledge-graph/tab01.png
    raw: raw/papers/rasmussen-2025-zep-a-temporal-knowledge-graph-figures/tab01.png
    caption: "DMR 벤치마크 결과. Zep이 gpt-4-turbo에서 94.8%로 MemGPT 93.4%와 full-conversation 94.4%를 앞선다"
    page: 6
    bbox_norm: [0.3233, 0.1147, 0.6729, 0.2886]
    strategy: table-region
    curated: true
  - id: tab02
    label: Table 2
    kind: table
    file: assets/rasmussen-2025-zep-a-temporal-knowledge-graph/tab02.png
    raw: raw/papers/rasmussen-2025-zep-a-temporal-knowledge-graph-figures/tab02.png
    caption: "LongMemEval 결과. 정확도가 오르는 동시에 평균 context 토큰이 11만 5천에서 1,600으로 줄고 latency가 약 90% 짧아진다"
    page: 7
    bbox_norm: [0.1502, 0.3774, 0.8398, 0.5176]
    strategy: manual
    curated: true
  - id: tab03
    label: Table 3
    kind: table
    file: assets/rasmussen-2025-zep-a-temporal-knowledge-graph/tab03.png
    raw: raw/papers/rasmussen-2025-zep-a-temporal-knowledge-graph-figures/tab03.png
    caption: "LongMemEval 질문 유형별 분해. preference, temporal-reasoning, multi-session에서 이득이 크고 assistant 유형은 하락한다"
    page: 7
    bbox_norm: [0.1502, 0.5824, 0.8398, 0.8576]
    strategy: manual
    curated: true
---

## 한 줄 요약 (One-line Summary)

Zep은 AI 에이전트를 위한 메모리 계층 서비스다. temporally-aware knowledge graph 엔진 Graphiti로 대화 데이터와 업무 데이터를 시간에 따라 변하는 그래프로 합성하며, MemGPT가 대표 지표로 삼은 DMR 벤치마크에서 94.8% 대 93.4%로 앞서고 더 까다로운 LongMemEval에서는 full-context 기준선 대비 정확도를 상대 최대 18.5% 높이면서 응답 latency를 약 90% 줄인다.

## 1. 자료 정보 (Document Information)

- **제목**: Zep: A Temporal Knowledge Graph Architecture for Agent Memory
- **저자**: Preston Rasmussen, Pavlo Paliychuk, Travis Beauvais, Jack Ryan, Daniel Chalef (전원 Zep AI)
- **arXiv**: 2501.13956v1 (2025-01-20, cs.CL). 총 12쪽으로 본문 8쪽, 프롬프트 부록 약 3쪽, 참고문헌 28건
- **러닝 헤더**: "Using Knowledge Graphs to power LLM-Agent Memory"
- **연계 저장소**: [getzep/graphiti](https://github.com/getzep/graphiti). 논문이 참고문헌 [6]으로 직접 인용하는 오픈소스 구현체다

Zep은 상용 프로덕션 시스템이고, 이 논문은 그 메모리 검색 메커니즘의 정확도와 latency, 확장성을 두 벤치마크로 평가한다. knowledge graph는 엔티티를 노드로, 엔티티 사이의 관계를 엣지로 표현한 데이터 구조를 말한다. Zep의 차별점은 이 그래프에 시간 축을 넣어 각 사실이 언제 참이었고 언제 바뀌었는지를 함께 담는다는 데 있다.

논문의 문제 설정은 도입부에 정리돼 있다. 저자들은 chat 기반 에이전트의 능력이 LLM의 context window 크기, 그 context를 실제로 활용하는 정도, pre-training으로 얻은 지식의 범위에 갇힌다고 본다. 따라서 도메인 밖 지식을 공급하고 환각(hallucination)을 줄이려면 추가 context가 필요하다. 기존 RAG는 이 역할을 맡아 왔지만 정보 검색 분야가 지난 50년간 다듬은 기법을 대체로 정적인 코퍼스에 적용한다는 전제를 깔고 있다. 에이전트가 일상에서 문제를 자율적으로 풀려면 사용자와의 상호작용에서 끊임없이 늘어나는 데이터, 그리고 관련 업무 데이터와 세계 데이터에 접근해야 한다. 전체 대화 이력과 업무 데이터셋을 context window에 그대로 담을 수 없으므로 새로운 접근이 필요하다는 것이 논문의 출발점이다.

## 2. 주요 기여 (Key Contributions)

- **Graphiti 엔진.** 대화 같은 비정형 메시지 데이터와 업무용 정형 데이터를 하나의 temporally-aware knowledge graph로 동적으로 합성한다. 정적 문서 검색에 머무는 기존 RAG와 달리, 새 정보가 들어올 때마다 그래프를 non-lossy 방식으로 갱신하며 사실과 관계의 타임라인을 유효 기간까지 함께 유지한다.
- **Bi-temporal 모델.** 사건이 실제로 일어난 시간 축 T와 데이터가 시스템에 들어온 시간 축 T′를 분리해 추적한다. 저자들은 이 이중 시간 모델을 LLM 기반 knowledge graph 구축에서 새로운 진전이라고 표현하며, Zep의 차별화된 능력 대부분이 여기서 나온다고 본다.
- **Edge invalidation.** 새 사실이 기존 사실과 모순되면 예전 엣지를 삭제하지 않고 무효(invalid) 처리하며 유효 기간을 닫는다. 그 결과 지금 참인 것과 과거 어느 시점에 참이었던 것을 모두 질의할 수 있다.
- **동적 community 탐지.** GraphRAG의 community 개념을 가져오되 Leiden 대신 label propagation을 써서, 새 노드가 들어올 때 전체 재계산 없이 community를 증분 확장한다.
- **벤치마크 우위.** MemGPT가 자기네 대표 지표로 삼은 DMR에서 94.8% 대 93.4%로 앞섰다. 더 까다로운 LongMemEval에서는 full-context 기준선 대비 정확도를 상대 최대 18.5% 높이면서 latency는 약 90% 줄였다. 단 LongMemEval에서는 MemGPT와의 직접 비교를 완주하지 못했으므로, 이 벤치마크의 비교 대상은 full-context 기준선이다.
- **latency 보고.** 저자들은 LLM 메모리와 RAG 문헌이 프로덕션 확장성을 비용과 latency 측면에서 충분히 다루지 않는다고 지적하며, LightRAG 저자들의 선례를 따라 검색 메커니즘의 latency를 함께 보고한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3계층 그래프 구조

Zep의 메모리는 G = (N, E, φ) 형태의 동적 knowledge graph다. N은 노드 집합, E는 엣지 집합, φ : E → N × N은 엣지가 어느 노드 쌍에 걸리는지 정하는 incidence 함수다. 이 그래프는 세 층의 하위 그래프로 나뉜다.

- **Episode subgraph (G_e).** episodic 노드는 메시지, 텍스트, JSON 원본을 그대로 담는 non-lossy 저장 단위다. 여기서 의미 있는 엔티티와 관계가 추출되며, episodic 엣지 E_e ⊆ φ*(N_e × N_s)가 episode를 그 엔티티에 잇는다. 이 논문의 실험은 대화 메모리에 집중하므로 message 타입만 다룬다.
- **Semantic entity subgraph (G_s).** episode에서 뽑아내고 기존 그래프 엔티티와 대조해 해소한 엔티티를 노드로 둔다. 엔티티 사이 관계는 semantic edge E_s ⊆ φ*(N_s × N_s), 곧 fact로 표현한다.
- **Community subgraph (G_c).** 강하게 연결된 엔티티 군집을 community 노드로 묶고 그 군집의 고수준 요약을 담는다. community 엣지 E_c ⊆ φ*(N_c × N_s)가 community를 소속 엔티티에 잇는다. Zep 그래프의 최상위 층이며 G_s 구조를 조망하는 역할을 한다.

원본 episode와 거기서 파생된 semantic 정보를 함께 저장하는 이 이중 구조는 인간 기억을 다룬 심리학 모형을 본뜬 것이다. episodic memory는 개별 사건을 그대로 담는 기억 층이고 semantic memory는 개념 사이의 연관과 의미를 담는 기억 층이다. AriGraph가 두 층을 나누는 접근을 먼저 보였고, community 노드로 도메인 개념을 조망하는 부분은 GraphRAG에서 가져왔다. 저자들은 episode에서 fact로, fact에서 엔티티로, 엔티티에서 community로 올라가는 이 위계가 HiQA와 HIRO 같은 기존 계층형 RAG 전략의 확장이라고 본다.

### Episode 처리와 bi-temporal 모델

Zep의 그래프 구축은 Episode라는 원본 데이터 단위를 받아들이는 데서 시작한다. episode는 message, text, JSON 세 유형 가운데 하나이고, 유형마다 구축 절차가 다르다. 이 논문은 실험이 대화 메모리를 대상으로 하므로 message 유형만 다룬다. 여기서 message는 여러 개가 LLM context window에 들어갈 만큼 짧은 텍스트와 그 발화를 한 화자 정보를 함께 담은 단위다.

각 메시지에는 발화 시각을 가리키는 기준 시각 t_ref가 붙는다. 이 시각 정보 덕에 Zep은 "다음 목요일", "2주 뒤", "지난여름" 같은 상대 날짜와 부분 날짜를 정확한 날짜로 환산해 추출할 수 있다. 시간 축은 둘로 나뉜다. T는 사건이 실제로 일어난 연대기적 순서를, T′는 Zep이 데이터를 받아들인 트랜잭션 순서를 나타낸다. T′가 전통적인 데이터베이스 감사 용도라면, T는 대화와 메모리의 시간적 변화를 모델링하는 차원을 더한다. 저자들은 이 접근을 LLM 기반 knowledge graph 구축의 새로운 진전으로 평가하며, 기존 graph 기반 RAG 제안과 Zep을 구분하는 근거로 든다.

episodic 엣지 E_e는 episode를 거기서 추출된 엔티티 노드에 잇는다. episode와 파생된 semantic 엣지는 양방향 인덱스를 유지해 엣지와 원본 episode의 관계를 추적한다. 이 설계 덕에 순방향과 역방향 순회가 모두 가능하다. semantic 산출물은 인용이나 출처 표기를 위해 원본까지 거슬러 올라갈 수 있고, episode는 자기와 관련된 엔티티와 fact를 빠르게 가져올 수 있다. 저자들은 이 연결이 이번 실험에서는 직접 검증되지 않았고 후속 연구 대상이라고 밝힌다.

### 엔티티 추출과 중복 해소

엔티티 추출은 episode 처리의 첫 단계다. 시스템은 현재 메시지 내용과 직전 n개 메시지를 함께 넣어 named entity recognition의 맥락으로 삼는다. 이 논문과 Zep의 일반 구현에서 n = 4이며, 대화 두 턴 분량에 해당한다. 메시지 처리에 초점을 두므로 화자는 자동으로 엔티티로 추출된다. 1차 추출 뒤에는 reflexion에서 착안한 reflection 기법을 적용해 환각을 줄이고 추출 범위를 넓힌다. 시스템은 이어지는 엔티티 해소와 검색에 쓰려고 episode에서 엔티티 요약도 함께 추출한다.

추출 후에는 각 엔티티 이름을 1024차원 벡터 공간에 임베딩한다. 이 임베딩으로 기존 그래프 엔티티 노드를 대상으로 코사인 유사도 검색을 수행해 비슷한 노드를 가져오고, 별도로 기존 엔티티 이름과 요약을 대상으로 full-text 검색을 수행해 후보 노드를 더 모은다. 이 후보 노드들과 episode 맥락을 엔티티 해소 프롬프트에 담아 LLM에 넘기며, 중복으로 판정되면 갱신된 이름과 요약을 생성한다. 추출과 해소를 마친 데이터를 그래프에 반영할 때는 LLM이 생성한 데이터베이스 쿼리 대신 미리 정의한 Cypher 쿼리를 쓴다. 스키마 형식의 일관성을 지키고 환각 여지를 줄이려는 선택이다.

### fact 추출과 중복 해소

fact는 두 엔티티 사이의 관계를 담고 핵심 술어를 포함한다. 부록의 fact 추출 프롬프트는 이 술어를 `relation_type`이라는 짧은 대문자 표기로 요구하며 LOVES, IS_FRIENDS_WITH, WORKS_FOR를 예로 든다. 같은 fact가 서로 다른 엔티티 사이에서 여러 번 추출될 수 있고, Graphiti는 이를 hyper-edge 구현으로 다중 엔티티 fact까지 표현한다.

추출 후 시스템은 그래프 통합을 준비하며 fact 임베딩을 생성하고, 엔티티 해소와 유사한 절차로 엣지 중복을 해소한다. 다만 관련 엣지를 찾는 hybrid 검색을 새 엣지와 같은 엔티티 쌍 사이에 이미 존재하는 엣지로 한정한다. 이 제약은 서로 다른 엔티티 사이의 유사 엣지가 잘못 합쳐지는 것을 막는다. 동시에 탐색 공간을 해당 엔티티 쌍과 관련된 엣지 부분집합으로 줄여 중복 해소의 계산 복잡도도 크게 낮춘다.

### Temporal extraction과 edge invalidation

저자들은 Graphiti를 다른 knowledge graph 엔진과 구분하는 핵심 기능으로 temporal extraction과 edge invalidation을 통한 동적 정보 갱신을 든다. 시스템은 t_ref를 써서 episode 맥락에서 fact의 시간 정보를 추출한다. 그래서 "Alan Turing was born on June 23, 1912" 같은 절대 시각과 "I started my new job two weeks ago" 같은 상대 시각을 모두 정확한 datetime으로 표현할 수 있다.

bi-temporal 모델에 맞춰 시스템은 네 개의 시각을 추적한다. T′에 속하는 t′_created와 t′_expired는 fact가 시스템 안에서 생성되거나 무효화된 시점을 기록한다. T에 속하는 t_valid와 t_invalid는 fact가 실제로 참이었던 시간 구간을 기록한다. 이 네 값은 나머지 fact 정보와 함께 엣지에 저장된다.

새 엣지가 들어오면 기존 엣지가 무효화될 수 있다. 시스템은 LLM으로 새 엣지를 의미상 관련된 기존 엣지와 비교해 모순 가능성을 찾는다. 시간 구간이 겹치는 모순을 찾아내면, 해당 엣지의 t_invalid를 무효화를 유발한 엣지의 t_valid로 설정해 무효 처리한다. 트랜잭션 시간 축 T′를 따르므로 Graphiti는 무효화 판정에서 언제나 새 정보를 우선한다. 이 방식은 대화가 진행되는 동안 데이터를 계속 추가하면서도 현재 관계 상태와 관계 변화의 과거 기록을 함께 유지한다.

### Community 탐지와 요약

episodic 하위 그래프와 semantic 하위 그래프를 세운 다음, 시스템은 community 탐지로 community 하위 그래프를 구축한다. 탐지 기법은 GraphRAG의 방식을 바탕으로 하되 Leiden 알고리즘 대신 label propagation을 쓴다. label propagation이 동적 확장으로 넘어가기 쉬워서, 새 데이터가 그래프에 들어와도 정확한 community 표현을 더 오래 유지할 수 있고 그만큼 전체 갱신을 늦출 수 있다는 것이 선택 이유다.

동적 확장은 label propagation의 단일 재귀 단계를 그대로 구현한 것이다. 새 엔티티 노드 n_i ∈ N_s가 들어오면 시스템은 이웃 노드들의 community를 조사한 뒤, 이웃 다수가 속한 community에 새 노드를 배정하고 community 요약과 그래프를 갱신한다. 이 방식은 데이터가 흘러 들어오는 동안 효율적으로 community를 확장하지만, 그 결과는 label propagation을 처음부터 완전히 다시 수행한 결과에서 점점 멀어진다. 따라서 주기적인 community 전체 갱신은 여전히 필요하다. 그럼에도 이 동적 갱신 전략은 latency와 LLM 추론 비용을 크게 줄이는 실용적 heuristic 역할을 한다.

community 노드의 요약은 GraphRAG와 마찬가지로 소속 노드를 map-reduce 방식으로 반복 요약해 만든다. 다만 검색 방식은 GraphRAG의 map-reduce 접근과 크게 다르다. Zep은 자체 검색 방법론을 뒷받침하려고 community 요약에서 핵심 용어와 관련 주제를 뽑아 community 이름을 생성하고, 이 이름을 임베딩해 저장해 코사인 유사도 검색이 가능하게 한다.

### 검색 파이프라인 3단계

Zep의 그래프 검색 API는 텍스트 문자열 쿼리 α ∈ S를 받아 텍스트 문자열 context β ∈ S를 반환하는 함수 f : S → S로 정의된다. 출력 β는 LLM 에이전트가 α에 정확히 답하는 데 필요한 노드와 엣지 데이터를 정해진 형식으로 담는다. f(α) → β는 세 단계로 나뉜다.

- **Search (ϕ).** 관련 정보를 담고 있을 후보 노드와 엣지를 찾는다. ϕ : S → E_s^n × N_s^n × N_c^n으로, 쿼리를 semantic edge, entity 노드, community 노드 세 목록의 3-tuple로 바꾼다. 이 셋이 관련 텍스트 정보를 담은 그래프 유형 전부다.
- **Reranker (ρ).** 검색 결과의 순서를 다시 매긴다. ρ : ϕ(α), ... → E_s^n × N_s^n × N_c^n으로, 결과 목록을 받아 순서를 바꾼 목록을 반환한다.
- **Constructor (χ).** 관련 노드와 엣지를 텍스트 context로 바꾼다. χ : E_s^n × N_s^n × N_c^n → S이며, semantic edge에서는 fact와 t_valid, t_invalid 필드를, entity 노드에서는 이름과 요약 필드를, community 노드에서는 요약 필드를 반환한다.

세 함수를 합성하면 f(α) = χ(ρ(ϕ(α))) = β가 된다. 논문은 이 결과로 만들어지는 context 문자열 템플릿도 함께 싣는다. 템플릿은 FACTS 블록과 ENTITIES 블록으로 나뉘고, FACTS 블록은 각 fact를 유효 기간과 함께 `FACT (Date range: from - to)` 형식으로 적으며 그 기간이 사건 발생 기간을 뜻한다고 명시한다. ENTITIES 블록은 `ENTITY_NAME: entity summary` 형식으로 엔티티 요약을 나열한다.

### 세 가지 검색 함수

Zep은 코사인 의미 유사도 검색 ϕ_cos, Okapi BM25 full-text 검색 ϕ_bm25, breadth-first search ϕ_bfs를 구현한다. 앞의 두 함수는 Neo4j의 Lucene 구현을 활용한다. 세 함수는 관련 문서를 찾는 성질이 서로 달라서, 합치면 reranking 전에 후보 결과를 폭넓게 확보한다.

검색 대상 필드는 객체 유형마다 다르다. E_s에서는 fact 필드를, N_s에서는 엔티티 이름을, N_c에서는 community 이름을 검색한다. community 이름은 그 community가 다루는 핵심 키워드와 표현을 담은 값이다. 저자들은 이 community 검색 방식이 독자적으로 개발됐지만 LightRAG의 high-level key 검색 방법론과 병렬을 이룬다고 밝히고, LightRAG의 접근을 Graphiti 같은 graph 기반 시스템과 결합하는 것을 유망한 후속 방향으로 지목한다.

코사인 유사도와 full-text 검색은 RAG에서 이미 정착한 방식이지만, knowledge graph 위의 breadth-first search는 RAG 분야에서 관심을 거의 받지 못했고 AriGraph와 Distill-SynthKG 같은 graph 기반 RAG 시스템이 눈에 띄는 예외다. Graphiti에서 breadth-first search는 n-hop 안의 추가 노드와 엣지를 찾아 1차 검색 결과를 보강한다. 또 ϕ_bfs는 노드를 파라미터로 받을 수 있어 검색 함수를 더 세밀하게 통제할 수 있다. 최근 episode를 seed로 주면 방금 언급된 엔티티와 관계를 검색 context에 끌어올 수 있어 특히 유용하다.

세 방식은 각기 다른 종류의 유사도를 겨냥한다. full-text 검색은 단어 유사도를, 코사인 유사도는 의미 유사도를, breadth-first search는 맥락 유사도를 잡는다. 맥락 유사도란 그래프에서 가까운 노드와 엣지가 더 비슷한 대화 맥락에 등장한다는 성질이다. 저자들은 이 다면적 후보 확보가 최적 context를 발견할 확률을 최대화한다고 설명한다.

### Reranker

1차 검색이 높은 recall을 노리는 반면, reranker는 가장 관련 있는 결과를 앞으로 끌어 precision을 높이는 역할을 한다. reranking은 1차 검색이 뽑은 후보를 정밀 모델이나 별도 기준으로 다시 정렬하는 단계다. Zep은 다섯 방식을 제공한다.

- **Reciprocal Rank Fusion (RRF).** 여러 검색 결과의 순위를 결합하는 기존 방식이다.
- **Maximal Marginal Relevance (MMR).** 관련도와 다양성을 함께 고려하는 기존 방식이다.
- **episode-mentions reranker.** 대화 안에서 엔티티나 fact가 언급된 빈도를 기준으로 우선순위를 정한다. 자주 참조된 정보가 더 쉽게 접근되는 시스템이 된다.
- **node distance reranker.** 지정한 중심 노드로부터의 그래프 거리를 기준으로 순서를 바꾼다. knowledge graph의 특정 영역에 국한된 context를 얻을 수 있다.
- **cross-encoder.** 가장 정교한 방식이다. 쿼리와 노드, 엣지를 cross-attention으로 함께 평가해 관련도 점수를 생성하는 LLM을 쓰지만 계산 비용이 가장 크다.

### 부록의 그래프 구축 프롬프트

부록은 그래프 구축에 쓰는 프롬프트 다섯 개를 싣는다. 다섯 프롬프트 모두 PREVIOUS MESSAGES와 CURRENT MESSAGE를 태그로 감싸 넘기는 공통 구조를 쓴다.

| 프롬프트 | 입력 | 주요 지침 |
|---|---|---|
| Entity Extraction | 이전 메시지, 현재 메시지 | 화자를 항상 첫 노드로 추출한다. 관계나 행위는 노드로 만들지 않는다. 날짜, 시각, 연도 같은 시간 정보도 노드로 만들지 않는다(나중에 엣지에 붙는다). 노드 이름은 전체 이름으로 최대한 명시적으로 적는다 |
| Entity Resolution | 이전 메시지, 현재 메시지, 기존 노드, 새 노드 | 중복이면 `is_duplicate: true`와 기존 노드 uuid를 반환하고 가장 완전한 전체 이름을 새 이름으로 제시한다. 이름과 요약을 함께 보고 판정한다(중복 노드가 다른 이름을 가질 수 있다) |
| Fact Extraction | 이전 메시지, 현재 메시지, 엔티티 목록 | 제공된 엔티티 사이의 fact만 추출한다. 각 fact는 서로 다른 두 노드 사이의 명확한 관계여야 한다. `relation_type`은 짧은 대문자 표기로 적는다(LOVES, IS_FRIENDS_WITH, WORKS_FOR) |
| Fact Resolution | 기존 엣지 목록, 새 엣지 | 같은 사실 정보를 표현하면 중복으로 판정한다. 문장이 완전히 같아야 하는 것은 아니고 같은 정보를 전달하면 된다 |
| Temporal Extraction | 이전 메시지, 현재 메시지, 기준 시각, fact | fact에 포함된 시간 정보만 추출한다. valid_at은 관계가 성립한 시점, invalid_at은 관계가 끝난 시점이다. ISO 8601 형식을 쓰고, 상대 시각은 기준 시각으로 환산한다. 관련 사건에서 날짜를 추론하지 않는다. 날짜만 있으면 00:00:00, 연도만 있으면 1월 1일 00:00:00을 쓴다 |

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 실험 설계

실험은 LLM 메모리 벤치마크 두 개로 진행했다. DMR은 MemGPT 논문이 만든 과제로, "Beyond Goldfish Memory: Long-Term Open-Domain Conversation"이 소개한 Multi-Session Chat 데이터셋에서 500개 대화를 뽑은 부분집합이다. 두 번째는 LongMemEval 벤치마크이며, 그중 대화 context가 평균 11만 5천 토큰에 이르는 LongMemEval_s 데이터셋을 썼다.

두 실험 모두 Zep API로 대화 이력을 Zep knowledge graph에 통합한 뒤, 3절의 기법으로 가장 관련 있는 엣지(fact)와 엔티티 노드(엔티티 요약) 상위 20개를 검색했다. 다만 DMR을 서술하는 4.2절은 같은 절차를 "상위 10개"로 적어 두 수치가 어긋난다. 시스템은 이 데이터를 Zep 메모리 API가 제공하는 것과 같은 형식의 context 문자열로 재구성했다. 저자들은 이 두 실험이 Graphiti의 핵심 검색 능력을 보여주지만 전체 검색 기능의 부분집합에 지나지 않는다고 명시한다.

| 항목 | DMR | LongMemEval_s |
|---|---|---|
| 출처 | MemGPT 논문 | LongMemEval 논문 |
| 원 데이터셋 | Multi-Session Chat 500대화 부분집합 | 기업 활용을 반영한 장기 대화 |
| 대화 규모 | 5세션 × 최대 12메시지 = 대화당 60메시지 | 평균 약 11만 5천 토큰 |
| 질문 구성 | 대화마다 질의응답 1쌍, 단일 턴 사실 검색 | 여섯 유형(single-session-user, single-session-assistant, single-session-preference, multi-session, knowledge-update, temporal-reasoning). 유형별 분포는 균일하지 않다 |
| 비교 대상 | MemGPT, full-conversation, session summaries, recursive summarization | full-context 기준선 |
| 채점 | LLM judge가 golden answer와 대조 | GPT-4o에 원 논문의 질문별 프롬프트를 적용(인간 평가자와 높은 상관을 보인 방식) |

모델 구성은 역할별로 나뉜다.

| 역할 | 모델 |
|---|---|
| 임베딩과 reranking | BAAI의 BGE-m3 |
| 그래프 구축 | gpt-4o-mini-2024-07-18 |
| 답변 생성 | gpt-4o-mini-2024-07-18, gpt-4o-2024-11-20 |
| MemGPT와의 DMR 직접 비교 | gpt-4-turbo-2024-04-09 |

측정 환경도 밝혀져 있다. 실험은 2024년 12월부터 2025년 1월 사이에 수행했고, 매사추세츠주 보스턴의 주거지에서 소비자용 노트북으로 AWS us-west-2에 호스팅된 Zep 서비스에 접속했다. 이 분산 구조 때문에 Zep 평가에는 기준선 평가에 없던 네트워크 latency가 추가로 섞였다.

### DMR (Deep Memory Retrieval)

MemGPT는 gpt-4-turbo로 93.4%를 기록해 이 지표의 선두였고, recursive summarization 기준선 35.3%를 크게 앞선 값이었다. 저자들은 비교 기준선으로 흔히 쓰이는 두 접근을 직접 구현했다. gpt-4-turbo에서 full-conversation 기준선은 94.4%로 MemGPT의 보고값을 근소하게 넘었고, session summary 기준선은 78.6%였다. gpt-4o-mini에서는 두 접근 모두 성능이 올라 full-conversation 98.0%, session summaries 88.0%를 기록했다. MemGPT는 gpt-4o-mini로 재현하지 못했는데, 저자들은 그 원인을 MemGPT 논문의 방법론 세부가 충분하지 않았던 점으로 든다.

Zep 평가는 대화를 그래프에 적재한 뒤 검색 함수로 가장 관련 있는 노드와 엣지 상위 10개를 가져오는 방식으로 진행했고(4절은 같은 절차의 검색 개수를 20개로 적는다), LLM judge가 에이전트 응답을 golden answer와 대조했다. Zep은 gpt-4-turbo에서 94.8%, gpt-4o-mini에서 98.2%로 MemGPT와 각 full-conversation 기준선을 소폭 넘었다.

| Memory | Model | Score | Zep과의 차이 |
|---|---|---|---|
| Recursive Summarization | gpt-4-turbo | 35.3% | -59.5%p |
| Conversation Summaries | gpt-4-turbo | 78.6% | -16.2%p |
| MemGPT | gpt-4-turbo | 93.4% | -1.4%p |
| Full-conversation | gpt-4-turbo | 94.4% | -0.4%p |
| **Zep** | gpt-4-turbo | **94.8%** | 기준 |
| Conversation Summaries | gpt-4o-mini | 88.0% | -10.2%p |
| Full-conversation | gpt-4o-mini | 98.0% | -0.2%p |
| **Zep** | gpt-4o-mini | **98.2%** | 기준 |

Recursive Summarization과 MemGPT 값은 MemGPT 논문이 보고한 수치이며 나머지는 이 논문이 직접 측정했다.

저자들은 이 결과를 그대로 받아들이면 안 된다고 단서를 붙인다. 대화당 메시지가 60개뿐이라 현재 LLM의 context window에 통째로 들어가고, 그래서 단순한 full-context 접근만으로도 높은 점수가 나온다. 벤치마크 설계의 약점은 규모 문제를 넘어선다. 평가가 단일 턴 사실 검색 질문에만 의존해 복잡한 메모리 이해를 재지 못하고, "favorite drink to relax with"나 "weird hobby"처럼 대화에서 그렇게 규정되지 않은 개념을 가리키는 모호한 표현이 다수 섞여 있다. 저자들이 가장 중대한 문제로 꼽는 것은 이 데이터셋이 LLM 에이전트의 실제 기업 활용을 제대로 대표하지 못한다는 점이다. 현대 LLM의 단순 full-context 접근이 높은 성능을 낸다는 사실 자체가 메모리 시스템 평가 도구로서의 부적절성을 드러낸다는 것이 저자들의 판단이다. 이 판단은 대화가 길어질수록 LLM 성능이 급격히 떨어진다는 LongMemEval 논문의 관찰로도 뒷받침된다.

### LongMemEval (LME)

LongMemEval_s는 LLM 에이전트의 실제 업무 활용을 대표하는 대화와 질문을 제공하며, 기존 LLM과 상용 메모리 솔루션에 상당한 난이도를 부과한다. 대화 길이가 평균 약 11만 5천 토큰이라 최신 frontier 모델의 context window에는 여전히 들어가므로, 저자들은 의미 있는 기준선을 세울 수 있었다고 설명한다.

MemGPT와의 비교도 시도했다. 현행 MemGPT 프레임워크가 기존 메시지 이력의 직접 적재를 지원하지 않아 대화 메시지를 archival history에 추가하는 우회 방법을 구현했지만, 이 방식으로는 질문에 대한 성공적인 응답을 얻지 못했다. 저자들은 다른 연구팀이 이 벤치마크로 평가해 주기를 기대한다고 밝힌다. 따라서 LongMemEval의 비교 대상은 full-context 기준선뿐이다.

Zep은 두 모델 모두에서 정확도와 latency를 함께 개선했다. gpt-4o-mini에서는 정확도 상대 15.2% 향상, gpt-4o에서는 상대 18.5% 향상이다. 프롬프트 크기가 줄어든 결과 latency 비용도 크게 낮아졌다.

| Memory | Model | Score | Latency | Latency IQR | Avg Context Tokens |
|---|---|---|---|---|---|
| Full-context | gpt-4o-mini | 55.4% | 31.3초 | 8.76초 | 11만 5천 |
| **Zep** | gpt-4o-mini | **63.8%** | **3.20초** | 1.31초 | **1,600** |
| Full-context | gpt-4o | 60.2% | 28.9초 | 6.01초 | 11만 5천 |
| **Zep** | gpt-4o | **71.2%** | **2.58초** | 0.684초 | **1,600** |

표에서 계산한 절대 변화는 다음과 같다. gpt-4o-mini는 정확도 +8.4%p, latency 31.3초에서 3.20초로 89.8% 감소다. gpt-4o는 정확도 +11.0%p, latency 28.9초에서 2.58초로 91.1% 감소다. 두 모델 모두 평균 context 토큰이 11만 5천에서 1,600으로 약 98.6% 줄었다. latency IQR도 함께 줄어 응답 시간의 산포가 좁아졌다.

질문 유형별 분석에서는 이득이 복잡한 유형에 집중된다. Zep을 쓴 gpt-4o-mini는 여섯 유형 중 넷에서 향상됐고, 가장 큰 향상은 single-session-preference, multi-session, temporal-reasoning에서 나왔다. gpt-4o에서는 knowledge-update까지 개선돼 더 유능한 모델과 짝지을 때 효과가 커진다. 저자들은 반대로 덜 유능한 모델이 Zep의 시간 데이터를 이해하도록 하려면 추가 개발이 필요할 수 있다고 덧붙인다.

| Question Type | Model | Full-context | Zep | Delta(논문) | %p 차이 |
|---|---|---|---|---|---|
| single-session-preference | gpt-4o-mini | 30.0% | 53.3% | 77.7% 상승 | +23.3%p |
| single-session-assistant | gpt-4o-mini | 81.8% | 75.0% | 9.06% 하락 | -6.8%p |
| temporal-reasoning | gpt-4o-mini | 36.5% | 54.1% | 48.2% 상승 | +17.6%p |
| multi-session | gpt-4o-mini | 40.6% | 47.4% | 16.7% 상승 | +6.8%p |
| knowledge-update | gpt-4o-mini | 76.9% | 74.4% | 3.36% 하락 | -2.5%p |
| single-session-user | gpt-4o-mini | 81.4% | 92.9% | 14.1% 상승 | +11.5%p |
| single-session-preference | gpt-4o | 20.0% | 56.7% | 184% 상승 | +36.7%p |
| single-session-assistant | gpt-4o | 94.6% | 80.4% | 17.7% 하락 | -14.2%p |
| temporal-reasoning | gpt-4o | 45.1% | 62.4% | 38.4% 상승 | +17.3%p |
| multi-session | gpt-4o | 44.3% | 57.9% | 30.7% 상승 | +13.6%p |
| knowledge-update | gpt-4o | 78.2% | 83.3% | 6.52% 상승 | +5.1%p |
| single-session-user | gpt-4o | 81.4% | 92.9% | 14.1% 상승 | +11.5%p |

Delta 열은 논문이 표에 적은 상대 변화이고, %p 열은 같은 표의 두 점수 차이를 계산한 값이다. 저자들은 이 결과가 모델 규모를 가로질러 성능을 높이는 Zep의 능력을 보여주며, 더 유능한 모델과 짝지은 복잡하고 미묘한 질문 유형에서 향상이 가장 두드러진다고 정리한다. latency 개선도 주목할 만한 지점으로, 더 높은 정확도를 유지하면서 응답 시간을 약 90% 줄였다.

single-session-assistant 유형의 성능 하락은 gpt-4o에서 17.7%, gpt-4o-mini에서 9.06%다. 저자들은 이 하락을 Zep의 일관된 향상 흐름에서 벗어난 주목할 예외로 명시하며 추가 연구와 엔지니어링이 필요하다고 밝힌다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **검색 기능의 일부만 평가.** 두 실험은 Graphiti 전체 검색 능력의 부분집합만 쓴다. community 검색이나 episode와 엔티티 사이의 양방향 순회 같은 기능은 이번 실험 밖이고 후속 과제로 남겼다.
- **MemGPT와의 LongMemEval 직접 비교 부재.** MemGPT가 기존 메시지 이력의 직접 적재를 지원하지 않아 같은 조건 비교를 완주하지 못했다. 저자들은 다른 연구팀의 평가를 기다린다고 밝힌다.
- **덜 유능한 모델의 시간 추론.** gpt-4o-mini는 일부 유형에서 오히려 하락했다. Zep의 bi-temporal 데이터를 충분히 활용하려면 추가 개발이 필요할 수 있다.
- **single-session-assistant 하락.** 두 모델 모두에서 이 유형만 뚜렷하게 하락했고 저자들도 원인을 규명하지 못한 채 후속 과제로 남겼다.
- **네트워크 latency 혼입.** Zep 평가는 보스턴의 노트북에서 AWS us-west-2의 호스팅 서비스에 접속해 진행돼 기준선에는 없던 네트워크 지연이 섞였다. 보고된 Zep latency는 다소 보수적으로 읽어야 한다.
- **community 갱신의 근사.** 동적 label propagation 확장은 완전 재계산 결과에서 점점 멀어지므로 주기적 전체 갱신이 필요하다. 저자들은 이를 latency와 비용을 줄이는 실용적 heuristic으로 규정한다.

결론부는 후속 방향을 다섯 가지로 제시한다.

- **추출 전용 fine-tuning 모델.** GraphRAG 계열에서 엔티티와 엣지 추출에 fine-tuning 모델을 쓰면 정확도가 오르고 비용과 latency가 낮아진다는 연구가 이미 있다(Distill-SynthKG, Triplex). Graphiti 프롬프트에 맞춰 fine-tuning한 모델도 특히 복잡한 대화의 지식 추출을 개선할 수 있다.
- **도메인 ontology 도입.** LLM이 생성하는 knowledge graph 연구는 대체로 형식 ontology 없이 진행돼 왔다. ontology는 도메인의 개체 종류와 관계 타입을 고정된 집합으로 정의한 구조를 말한다. LLM 이전 knowledge graph 연구의 기반이었던 graph ontology를 Graphiti 프레임워크 안에서 더 탐색할 가치가 있다.
- **메모리 벤치마크 확충.** 저자들이 찾은 기존 벤치마크는 선택지가 적고 견고성과 복잡성이 부족해 단순한 바늘 찾기식 사실 검색 질문으로 흐르는 경우가 많았다. 고객 경험 과제처럼 실제 업무 활용을 반영하는 메모리 벤치마크가 더 필요하다.
- **대화와 정형 업무 데이터의 통합 평가.** 대화 이력과 정형 업무 데이터를 함께 처리하고 합성하는 Zep의 능력을 적절히 평가하는 기존 벤치마크가 없다.
- **전통적 RAG 능력 평가.** Zep은 LLM 메모리에 초점을 두지만 전통적 RAG 능력도 LightRAG, FinanceBench, BEIR 같은 정착된 벤치마크로 평가해야 한다.

저자들은 GraphRAG의 다른 접근을 Zep 패러다임에 통합하는 것도 후속 경로로 들며, Graphiti와 Zep의 결과가 인상적이지만 graph 기반 메모리 시스템의 초기 진전에 지나지 않을 것이라고 밝힌다.

## 6. 관련 연구 (Related Work)

- **MemGPT.** LLM 에이전트에 메모리를 붙인 선행 연구이자 이 논문의 주 비교 대상이다. DMR 벤치마크를 만든 팀이며, 이 논문은 MemGPT의 방법론 세부 부족으로 gpt-4o-mini 재현에 실패했다고 적는다.
- **AriGraph.** episodic 하위 그래프와 semantic 하위 그래프를 나누는 접근으로 Zep의 그래프 구성에 영향을 줬다. graph 위 breadth-first search를 쓴 드문 선례로도 함께 인용된다.
- **GraphRAG.** community 노드로 도메인을 조망하는 아이디어와 map-reduce 요약의 출처다. Zep은 여기에 동적 갱신과 시간 축을 더하고 community 탐지 알고리즘을 label propagation으로 교체했다.
- **LightRAG.** high-level key 검색이 Zep의 community 검색과 병렬을 이룬다. 두 접근의 결합이 후속 과제로 제시되며, latency를 우선 보고하는 관행의 선례로도 인용된다.
- **Reflexion.** 엔티티 추출의 reflection 단계가 여기서 착안했다.
- **Distill-SynthKG.** graph 기반 RAG에서 breadth-first search를 쓴 드문 선례이자, 추출용 fine-tuning 모델의 효과를 보인 연구로 인용된다.
- **HiQA와 HIRO.** 계층형 RAG 전략의 선행 연구로, Zep의 episode에서 community까지의 위계가 이들의 확장이라고 저자들은 설명한다.
- **LongMemEval.** 두 번째 평가 벤치마크의 출처이며, 대화가 길어질수록 LLM 성능이 급격히 떨어진다는 관찰로 DMR의 한계 논증을 뒷받침한다.
- **Leiden 알고리즘과 label propagation.** community 탐지의 두 선택지로, Zep은 동적 확장이 쉬운 후자를 택했다.
- **Neo4j와 Apache Lucene.** 코사인 유사도 검색과 BM25 full-text 검색의 실행 기반이다.
- **BGE-m3.** 실험의 임베딩 모델 겸 reranker다.
- **Triplex.** knowledge graph 구축용 fine-tuning 모델의 사례로 후속 방향에서 인용된다.
- **FinanceBench와 BEIR.** 전통적 RAG 능력 평가에 쓰라고 저자들이 지목한 벤치마크다.

## 7. 용어집 (Glossary)

- **Zep**: AI 에이전트용 메모리 계층 서비스. 이 논문이 소개하는 상용 프로덕션 시스템이다.
- **Graphiti**: Zep을 떠받치는 temporally-aware knowledge graph 엔진. [getzep/graphiti](https://github.com/getzep/graphiti)로 오픈소스 공개돼 있다.
- **episode**: 메시지, 텍스트, JSON 원본을 그대로 담는 non-lossy 저장 단위. 여기서 엔티티와 fact가 파생된다.
- **fact (semantic edge)**: 두 엔티티 사이의 관계를 담은 엣지. 핵심 술어를 `relation_type` 대문자 표기로 갖고, 같은 fact가 여러 엔티티 쌍에서 반복되면 hyper-edge로 표현한다.
- **bi-temporal 모델**: 사건이 일어난 시간 축 T와 데이터가 처리된 시간 축 T′를 분리해 추적하는 모델. 엣지마다 t′_created, t′_expired, t_valid, t_invalid 네 시각을 저장한다.
- **edge invalidation**: 모순되는 새 fact가 오면 예전 엣지를 지우지 않고 t_invalid를 새 엣지의 t_valid로 설정해 유효 기간을 닫는 갱신 방식.
- **label propagation**: Zep이 Leiden 대신 택한 community 탐지 알고리즘. 새 노드를 이웃 다수의 community에 배정하는 단일 재귀 단계로 증분 확장한다.
- **Search, Reranker, Constructor**: 검색 파이프라인의 세 단계 함수 ϕ, ρ, χ. 합성하면 f(α) = χ(ρ(ϕ(α))) = β다.
- **episode-mentions reranker**: 대화에서 엔티티나 fact가 언급된 빈도로 결과 순서를 정하는 Zep 고유의 reranker.
- **node distance reranker**: 지정한 중심 노드로부터의 그래프 거리로 결과 순서를 정하는 Zep 고유의 reranker.
- **DMR (Deep Memory Retrieval)**: MemGPT 팀이 만든 메모리 검색 벤치마크. Multi-Session Chat의 500대화 부분집합이며 대화당 60메시지다.
- **LongMemEval_s**: 평균 약 11만 5천 토큰짜리 장기 대화로 기업 시나리오를 반영한 메모리 벤치마크의 부분집합. 여섯 질문 유형을 담는다.
- **BGE-m3**: BAAI가 낸 임베딩 모델 겸 reranker. 이 논문 실험의 임베더와 reranker다.

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| tab01 | 6 | DMR 벤치마크 결과. Zep이 gpt-4-turbo에서 94.8%로 MemGPT 93.4%와 full-conversation 94.4%를 앞선다 | table-region | ★ wiki 권장 (result) |
| tab02 | 7 | LongMemEval 결과. 정확도가 오르는 동시에 평균 context 토큰이 11만 5천에서 1,600으로 줄고 latency가 약 90% 짧아진다 | manual | ★ wiki 권장 (result) |
| tab03 | 7 | LongMemEval 질문 유형별 분해. preference, temporal-reasoning, multi-session에서 이득이 크고 assistant 유형은 하락한다 | manual | ★ wiki 권장 (result) |
