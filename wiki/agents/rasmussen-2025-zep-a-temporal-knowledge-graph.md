---
title: "Zep: A Temporal Knowledge Graph Architecture for Agent Memory"
type: paper
year: 2025
category: agents
raw_path: raw/papers/rasmussen-2025-zep-a-temporal-knowledge-graph.pdf
raw_filename: "rasmussen-2025-zep-a-temporal-knowledge-graph.pdf"
source_collection: external
source: rasmussen-2025-zep-a-temporal-knowledge-graph.md
authors: "Preston Rasmussen, Pavlo Paliychuk, Travis Beauvais, Jack Ryan, Daniel Chalef"
arxiv_id: "2501.13956"
tags: [agent-memory, knowledge-graph, temporal-knowledge-graph, graphiti, zep, memgpt, longmemeval, graph-rag]
figures:
  - id: tab01
    label: Table 1
    kind: table
    file: assets/rasmussen-2025-zep-a-temporal-knowledge-graph/tab01.png
    raw: raw/papers/rasmussen-2025-zep-a-temporal-knowledge-graph-figures/tab01.png
    caption: "Deep Memory Retrieval 벤치마크 — Zep 94.8% (gpt-4-turbo)로 MemGPT 93.4% 상회"
    page: 6
    bbox_norm: [0.3233, 0.1147, 0.6729, 0.2886]
    strategy: table-region
    curated: true
  - id: tab02
    label: Table 2
    kind: table
    file: assets/rasmussen-2025-zep-a-temporal-knowledge-graph/tab02.png
    raw: raw/papers/rasmussen-2025-zep-a-temporal-knowledge-graph-figures/tab02.png
    caption: "LongMemEval 결과 — 정확도 상승과 동시에 context 토큰 115k→1.6k, latency 약 90% 단축"
    page: 7
    bbox_norm: [0.1502, 0.3774, 0.8398, 0.5176]
    strategy: manual
    curated: true
  - id: tab03
    label: Table 3
    kind: table
    file: assets/rasmussen-2025-zep-a-temporal-knowledge-graph/tab03.png
    raw: raw/papers/rasmussen-2025-zep-a-temporal-knowledge-graph-figures/tab03.png
    caption: "LongMemEval 질문 유형별 분해 — 복잡한 유형(preference·temporal·multi-session)에서 이득이 크다"
    page: 7
    bbox_norm: [0.1502, 0.5824, 0.8398, 0.8576]
    strategy: manual
    curated: true
---

## 요약 (Summary)

Zep은 AI 에이전트를 위한 메모리 계층 서비스다. 핵심 엔진 Graphiti가 대화·업무 데이터를 시간에 따라 변하는 knowledge graph로 합성해 정적 문서 검색에 머무는 기존 RAG의 한계를 넘어선다. knowledge graph는 엔티티를 노드로, 엔티티 사이 관계를 엣지로 표현한 데이터 구조를 말한다. Zep의 차별점은 이 그래프에 시간 축을 넣어 각 사실이 언제 참이 됐고 언제 뒤집혔는지를 유효 기간으로 담는다는 데 있다. MemGPT가 대표 지표로 삼은 DMR에서 94.8% 대 93.4%로 앞서고 더 까다로운 LongMemEval에서는 정확도를 최대 18.5% 끌어올리면서 응답 latency를 약 90% 줄였다. 엔진 자체는 [[agents/getzep-graphiti]]로 오픈소스 공개돼 있다.

## 주요 기여 (Key Contributions)

- **Graphiti 엔진.** 대화 같은 비정형 데이터와 업무용 정형 데이터를 하나의 temporally-aware knowledge graph로 동적으로 합성한다. 새 정보가 들어올 때마다 그래프를 non-lossy 방식으로 갱신한다.
- **Bi-temporal 모델.** 사건이 실제로 일어난 시간 축 T와 데이터가 시스템에 들어온 시간 축 T′를 분리해 추적한다. LLM 기반 knowledge graph 구축에서 이 이중 시간 모델은 새로운 시도이고 사실의 유효 기간을 그래프에 표현한다.
- **Edge invalidation.** 새 사실이 기존 사실과 모순되면 예전 엣지를 삭제하지 않고 무효(invalid)로 표시하며 유효 기간을 닫는다. 그 덕에 지금 참인 것과 과거 어느 시점에 참이었던 것을 모두 질의할 수 있다.
- **벤치마크 우위.** DMR과 LongMemEval 두 메모리 벤치마크에서 기존 최고 시스템 MemGPT와 full-context 기준선을 앞서고 동시에 context 크기와 latency를 크게 줄였다.

## 방법론 및 아키텍처 (Methodology and Architecture)

### 3계층 그래프 구조

Zep의 메모리는 G = (N, E, φ) 형태의 동적 knowledge graph이고 세 층의 하위 그래프로 나뉜다.

- **Episode subgraph (G_e).** episode는 메시지·텍스트·JSON 원본을 그대로 담는 non-lossy 저장 단위다. 여기서 엔티티와 관계가 추출되며 episodic 엣지가 episode를 그 엔티티에 잇는다. 이 논문 실험은 대화 메모리에 집중하므로 message 타입만 다룬다.
- **Semantic entity subgraph (G_s).** episode에서 뽑아낸 엔티티를 노드로, 엔티티 사이 관계를 엣지(semantic edge, 곧 fact)로 둔다. 새로 추출한 엔티티는 기존 그래프의 엔티티와 대조해 중복을 합친다.
- **Community subgraph (G_c).** 강하게 연결된 엔티티 군집을 community 노드로 묶고 그 요약을 담는다. GraphRAG의 community 개념을 이어받아 도메인 전반을 조망하는 층이다.

원본 episode와 파생된 semantic 정보를 함께 저장하는 이 구조는 인간 기억의 episodic memory와 semantic memory 구분을 본떴다. episodic memory는 개별 사건을 그대로 담는 기억이고 semantic memory는 개념 사이 연관을 담는 기억이다. AriGraph가 비슷한 접근을 먼저 보였고 Zep은 여기에 시간 축과 community 요약을 더했다.

### Bi-temporal 모델과 edge invalidation

각 메시지에는 발화 시각 t_ref가 붙는다. 이 시각 정보 덕에 Zep은 "다음 목요일", "2주 뒤" 같은 상대 날짜를 정확한 날짜로 환산해 추출한다. 시간 축은 둘이다. T는 사건이 실제로 일어난 연대기적 순서를, T′는 Zep이 데이터를 받아들인 처리 순서를 나타낸다. Graphiti를 다른 엔진과 가르는 핵심이 여기서 나온다. 새 fact가 기존 엣지와 모순되면 예전 엣지의 유효 기간을 닫아 invalid로 표시하되 그래프에서 지우지 않는다. 과거 상태를 보존한 채로도 현재 상태를 정확히 질의할 수 있는 이유다.

### 추출과 검색

엔티티 추출은 현재 메시지와 직전 4개 메시지를 맥락으로 삼고 reflexion에서 착안한 reflection으로 누락과 환각을 줄인다. 이어 엔티티 이름을 1024차원 벡터로 임베딩해 코사인 유사도로 후보를 찾고 full-text 검색을 더해 중복을 판정한다. 그래프 반영에는 LLM이 생성한 쿼리 대신 미리 정의한 Cypher 쿼리를 써서 스키마 일관성을 지킨다.

검색은 세 함수를 병렬로 돌린다. full-text 검색이 단어 유사도를, 코사인 유사도가 의미 유사도를, breadth-first search가 그래프상 n-hop 이웃을 훑어 맥락 유사도를 잡는다. 초기 검색은 recall을 노리고 그 뒤 reranker가 precision을 끌어올린다. Reciprocal Rank Fusion·Maximal Marginal Relevance 같은 기존 방식에 더해 언급 빈도를 반영하는 episode-mentions reranker와 중심 노드로부터의 그래프 거리로 재정렬하는 node distance reranker, 그리고 가장 정교하지만 비싼 cross-encoder를 함께 제공한다.

## 결과 (Results)

두 LLM 메모리 벤치마크로 평가했다. 그래프 구축에는 gpt-4o-mini를, 답변 생성에는 gpt-4o-mini와 gpt-4o를 썼고 임베딩·reranking은 BAAI의 BGE-m3를 썼다. MemGPT와 직접 비교하려고 DMR은 gpt-4-turbo로도 돌렸다.

### DMR (Deep Memory Retrieval)

DMR은 Multi-Session Chat에서 뽑은 500개 대화의 부분집합이다. gpt-4-turbo에서 Zep은 94.8%로 MemGPT 93.4%와 full-conversation 94.4%를 근소하게 앞섰다.

![[assets/rasmussen-2025-zep-a-temporal-knowledge-graph/tab01.png]]
*Table 1: DMR 결과 — Zep이 gpt-4-turbo 94.8%, gpt-4o-mini 98.2%로 MemGPT·full-conversation 기준선을 앞선다 (Rasmussen et al. 2025, p.6)*

저자들은 이 결과를 그대로 받아들이지 말라고 못 박는다. 대화당 메시지가 60개뿐이라 현재 context window에 통째로 들어가서 full-context 기준선만으로도 높은 점수가 나온다. 질문도 단일 턴 사실 검색에 그친다. DMR은 메모리 시스템을 가르기에는 너무 쉽다.

### LongMemEval (LME)

LongMemEval은 평균 11만 5천 토큰짜리 긴 대화로 기업 시나리오에 가깝다. Zep은 gpt-4o-mini에서 63.8%(상대 15.2%↑), gpt-4o에서 71.2%(상대 18.5%↑)를 냈다. 동시에 context 토큰을 115k에서 1.6k로 줄여 gpt-4o 기준 응답 시간을 28.9초에서 2.58초로 약 90% 단축했다.

![[assets/rasmussen-2025-zep-a-temporal-knowledge-graph/tab02.png]]
*Table 2: LongMemEval 결과 — 정확도는 오르고 context 토큰은 115k→1.6k, latency는 약 90% 줄었다 (Rasmussen et al. 2025, p.7)*

질문 유형별로 보면 이득은 복잡한 유형에 몰린다. single-session-preference·temporal-reasoning·multi-session에서 특히 크고 gpt-4o에서는 knowledge-update까지 개선된다. 반대로 single-session-assistant처럼 소폭 하락한 유형도 있어 약한 모델은 Zep의 시간 데이터를 다 살리지 못한다.

![[assets/rasmussen-2025-zep-a-temporal-knowledge-graph/tab03.png]]
*Table 3: LongMemEval 질문 유형별 분해 — Delta의 ↑는 Zep 우위, ↓는 하락 (Rasmussen et al. 2025, p.7)*

MemGPT는 기존 메시지 이력을 직접 넣는 기능이 없어 LongMemEval 비교를 완주하지 못했다.

## 한계 (Limitations)

- 두 실험은 Graphiti 전체 검색 능력의 부분집합만 쓴다. community 검색이나 episode-엔티티 양방향 순회는 이번 실험 밖이다.
- MemGPT와의 LongMemEval 직접 비교는 상대 시스템의 구조적 제약으로 완주하지 못했다.
- gpt-4o-mini는 일부 유형에서 오히려 하락했다. bi-temporal 데이터를 충분히 쓰려면 더 강한 모델이 필요하다.
- Zep 평가는 호스팅 서비스(AWS us-west-2)에 접속해 진행돼 기준선에 없던 네트워크 지연이 섞였다. 보고된 latency는 다소 보수적으로 읽어야 한다.

## 관련 페이지 (Related Pages)

- [[agents/getzep-graphiti]] — 이 논문의 핵심 엔진을 오픈소스로 공개한 구현체
- [[agents/qiao-2026-memory-intelligence-agent]] — 에이전트 메모리를 다룬 다른 자료
- [[database/gutierrez-2025-from-rag-to-memory-non]] — HippoRAG 2. KG + Personalized PageRank로 메모리를 푸는 또 다른 접근
- [[database/edge-2024-from-local-to-global]] — GraphRAG. Zep이 community 개념을 빌려온 출처
- [[database/guo-2025-lightrag-simple-and-fast]] — LightRAG. Zep이 community 검색의 병렬 사례로 지목
