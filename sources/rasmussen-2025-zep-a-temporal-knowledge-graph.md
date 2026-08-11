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

## 한 줄 요약 (One-line Summary)

Zep은 AI 에이전트를 위한 메모리 계층 서비스다. temporally-aware knowledge graph 엔진 Graphiti로 대화·업무 데이터를 시간에 따라 변하는 그래프로 합성하고 DMR·LongMemEval 두 벤치마크에서 기존 최고 시스템 MemGPT를 앞서면서 응답 latency를 크게 줄인다.

## 1. 자료 정보 (Document Information)

- **제목**: Zep: A Temporal Knowledge Graph Architecture for Agent Memory
- **저자**: Preston Rasmussen, Pavlo Paliychuk, Travis Beauvais, Jack Ryan, Daniel Chalef (Zep AI)
- **arXiv**: 2501.13956v1 (2025-01-20, cs.CL)
- **연계 저장소**: [getzep/graphiti](https://github.com/getzep/graphiti) — 논문의 핵심 엔진을 오픈소스로 공개한 구현체

Zep은 상용 프로덕션 시스템이고 이 논문은 그 메모리 검색 메커니즘의 정확도·latency·확장성을 두 벤치마크로 평가한다. knowledge graph는 엔티티를 노드로, 엔티티 사이의 관계를 엣지로 표현한 데이터 구조를 말한다. Zep의 차별점은 이 그래프에 시간 축을 넣어 "언제 참이었고 언제 바뀌었는지"를 함께 담는다는 데 있다.

## 2. 주요 기여 (Key Contributions)

- **Graphiti 엔진.** 대화 같은 비정형 데이터와 업무용 정형 데이터를 하나의 temporally-aware knowledge graph로 동적으로 합성한다. 정적 문서 검색에 머무는 기존 RAG와 달리, 새 정보가 들어올 때마다 그래프를 non-lossy 방식으로 갱신한다.
- **Bi-temporal 모델.** 사건이 실제로 일어난 시간 축 T와 데이터가 시스템에 들어온 시간 축 T′를 분리해 추적한다. LLM 기반 knowledge graph 구축에서 이 이중 시간 모델은 새로운 시도이고 사실의 유효 기간을 그래프에 표현한다.
- **Edge invalidation.** 새 사실이 기존 사실과 모순되면 예전 엣지를 삭제하지 않고 무효(invalid) 처리하며 유효 기간을 닫는다. 그 결과 "지금 참인 것"과 "과거 어느 시점에 참이었던 것"을 모두 질의할 수 있다.
- **벤치마크 우위.** MemGPT가 자기네 대표 지표로 삼은 DMR에서 94.8% 대 93.4%로 앞서고 더 까다로운 LongMemEval에서는 정확도를 최대 18.5% 끌어올리면서 latency는 약 90% 줄였다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3계층 그래프 구조

Zep의 메모리는 G = (N, E, φ) 형태의 동적 knowledge graph이고 세 층의 하위 그래프로 나뉜다.

- **Episode subgraph (G_e).** episode는 메시지·텍스트·JSON 원본을 그대로 담는 non-lossy 저장 단위다. 여기서 의미 있는 엔티티와 관계가 추출되며 episodic 엣지가 episode를 그 엔티티에 잇는다. 이 논문 실험은 대화 메모리에 집중하므로 message 타입만 다룬다.
- **Semantic entity subgraph (G_s).** episode에서 뽑아낸 엔티티를 노드로, 엔티티 사이 관계를 엣지(semantic edge, 곧 fact)로 둔다. 새로 추출한 엔티티는 기존 그래프의 엔티티와 대조해 중복을 합친다.
- **Community subgraph (G_c).** 강하게 연결된 엔티티 군집을 community 노드로 묶고 그 군집의 고수준 요약을 담는다. GraphRAG의 community 개념을 이어받아 도메인 전반을 조망하는 층이다.

원본 episode와 거기서 파생된 semantic 정보를 함께 저장하는 이 이중 구조는 인간 기억의 episodic memory와 semantic memory 구분을 본뜬 것이다. episodic memory는 개별 사건을 그대로 담는 기억이고 semantic memory는 개념 사이의 연관을 담는 기억이다. AriGraph가 비슷한 접근을 먼저 보였고 Zep은 여기에 시간 축과 community 요약을 더했다.

### Episode 처리와 bi-temporal 모델

각 메시지에는 발화 시각을 가리키는 기준 시각 t_ref가 붙는다. 이 시각 정보 덕에 Zep은 "다음 목요일", "2주 뒤", "지난여름" 같은 상대·부분 날짜를 정확한 날짜로 환산해 추출할 수 있다. 시간 축은 둘로 나뉜다. T는 사건이 실제로 일어난 연대기적 순서를, T′는 Zep이 데이터를 받아들인 처리 순서를 나타낸다. T′가 전통적인 데이터베이스 감사 용도라면, T는 대화와 메모리의 시간적 변화를 모델링하는 축을 더한다.

### 엔티티·fact 추출과 중복 해소

엔티티 추출은 episode 처리의 첫 단계다. 현재 메시지와 직전 n개 메시지(이 논문과 Zep 기본 구현에서 n=4, 대화 두 턴 분량)를 함께 넣어 named entity recognition의 맥락으로 삼는다. 추출 뒤에는 reflexion에서 착안한 reflection 기법으로 누락을 줄이고 환각을 억제한다. 이어 각 엔티티 이름을 1024차원 벡터로 임베딩해 코사인 유사도로 비슷한 노드를 찾고 이름·요약을 대상으로 한 full-text 검색을 별도로 돌려 후보를 모은다. 이 후보들과 episode 맥락을 LLM에 넘겨 중복 엔티티를 판정하고 중복이면 이름과 요약을 갱신한다. 그래프 반영에는 LLM이 생성한 쿼리 대신 미리 정의한 Cypher 쿼리를 써서 스키마 일관성을 지키고 환각 여지를 줄인다.

fact(semantic edge) 역시 임베딩을 만들어 통합하되, 중복 판정 대상을 같은 엔티티 쌍 사이의 엣지로 한정한다. 이 제약은 서로 다른 엔티티 쌍의 유사 엣지가 잘못 합쳐지는 것을 막고 탐색 공간을 줄여 계산량도 낮춘다. 같은 fact가 여러 엔티티 사이에서 반복 추출될 수 있어 Graphiti는 hyper-edge 구현으로 다중 엔티티 fact도 표현한다.

### Temporal extraction과 edge invalidation

Graphiti를 다른 knowledge graph 엔진과 가르는 핵심은 동적 정보 갱신을 temporal extraction과 edge invalidation으로 관리한다는 데 있다. 시스템은 episode 맥락과 t_ref로 fact의 유효 시작·종료 시각을 뽑는다. 새로 들어온 fact가 기존 엣지와 모순되면, 예전 엣지의 유효 기간을 닫아 invalid로 표시하되 그래프에서 지우지 않는다. 이렇게 하면 과거 상태를 보존한 채로도 현재 상태를 정확히 질의할 수 있다.

### 검색과 reranking

검색은 세 함수를 병렬로 돌려 후보를 모은다. full-text 검색은 단어 유사도를, 코사인 유사도는 의미 유사도를, breadth-first search는 그래프상 n-hop 이웃을 훑어 맥락 유사도를 잡는다. 대상 필드는 객체 유형마다 다르다. semantic edge는 fact 필드를, entity 노드는 이름을, community 노드는 관련 키워드를 담은 이름을 검색한다. graph 기반 breadth-first search는 RAG에서 드물게 쓰이는 방식인데 최근 episode를 seed로 주면 방금 언급된 엔티티를 맥락에 끌어올 수 있다.

reranker는 recall 위주의 초기 검색 결과에서 precision을 끌어올린다. Zep은 Reciprocal Rank Fusion과 Maximal Marginal Relevance 같은 기존 방식에 더해, 대화에서 엔티티·fact가 언급된 빈도를 반영하는 graph 기반 episode-mentions reranker와, 지정한 중심 노드로부터의 그래프 거리로 재정렬하는 node distance reranker를 제공한다. 가장 정교한 방식은 cross-encoder로, 쿼리와 노드·엣지를 cross-attention으로 함께 평가해 관련도 점수를 매기지만 계산 비용이 가장 크다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

실험은 LLM 메모리 벤치마크 두 개로 진행했다. DMR은 Multi-Session Chat에서 뽑은 500개 대화(대화당 5세션, 세션당 최대 12메시지)의 부분집합이고 LongMemEval은 대화 하나가 평균 11만 5천 토큰에 이르는 장기 메모리 벤치마크다. 두 실험 모두 대화 이력을 Zep 그래프에 넣은 뒤 가장 관련 있는 엣지·엔티티 노드를 검색해 context 문자열로 재구성했다. 그래프 구축에는 gpt-4o-mini-2024-07-18을, 답변 생성에는 gpt-4o-mini와 gpt-4o-2024-11-20을 썼고 임베딩과 reranking은 BAAI의 BGE-m3를 썼다. MemGPT와 직접 비교하려고 DMR은 gpt-4-turbo-2024-04-09로도 돌렸다.

### DMR (Deep Memory Retrieval)

gpt-4-turbo에서 Zep은 94.8%로 MemGPT의 93.4%와 full-conversation 기준선 94.4%를 근소하게 앞섰다. gpt-4o-mini에서는 Zep 98.2%, full-conversation 98.0%로 차이가 더 작다. 저자들은 이 결과를 그대로 받아들이지 말라고 못 박는다. 대화당 메시지가 60개뿐이라 현재 context window에 통째로 들어가고 그래서 full-context 기준선만으로도 높은 점수가 나온다. 질문은 단일 턴 사실 검색에 그치고 "긴장을 풀 때 마시는 음료" 같은 모호한 표현이 섞여 있으며 실제 기업 활용을 잘 대표하지도 못한다. DMR은 메모리 시스템을 가르기에는 너무 쉽다.

### LongMemEval (LME)

LongMemEval은 평균 11만 5천 토큰짜리 긴 대화로 기업 시나리오에 가깝고 single-session-user·assistant·preference, multi-session, knowledge-update, temporal-reasoning 여섯 질문 유형을 담는다. Zep은 gpt-4o-mini에서 63.8%로 full-context 55.4% 대비 상대 15.2% 향상, gpt-4o에서 71.2%로 60.2% 대비 상대 18.5% 향상을 보였다. 동시에 context 토큰을 115k에서 1.6k로 줄여 latency를 대폭 낮췄다. gpt-4o 기준 Zep은 2.58초, full-context는 28.9초로 약 90% 단축이다. 참고로 MemGPT는 기존 메시지 이력을 직접 넣는 기능이 없어 LongMemEval 비교를 완주하지 못했다.

질문 유형별로 보면 이득은 복잡한 유형에 몰린다. gpt-4o-mini는 여섯 중 넷에서 향상됐고 single-session-preference·temporal-reasoning·multi-session에서 특히 컸다. gpt-4o에서는 knowledge-update까지 개선돼 더 강한 모델일수록 Zep의 시간 데이터를 잘 활용한다. single-session-assistant와 (mini의) knowledge-update처럼 소폭 하락한 유형도 있어 약한 모델은 Zep의 시간 데이터를 다 살리지는 못한다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **검색 기능의 일부만 평가.** 두 실험은 Graphiti 전체 검색 능력의 부분집합만 쓴다. community 검색이나 episode-엔티티 양방향 순회 같은 기능은 이번 실험 밖이고 후속 과제로 남겼다.
- **MemGPT와의 LongMemEval 직접 비교 부재.** MemGPT의 구조적 제약으로 같은 조건 비교를 완주하지 못했다. 다른 연구팀의 평가를 기다린다고 밝힌다.
- **약한 모델의 시간 추론.** gpt-4o-mini는 일부 유형에서 오히려 하락했다. Zep의 bi-temporal 데이터를 충분히 쓰려면 더 강한 모델이 필요하다.
- **네트워크 latency 혼입.** Zep 평가는 AWS us-west-2의 호스팅 서비스에 접속해 진행돼 기준선에는 없던 네트워크 지연이 섞였다. 보고된 Zep latency는 다소 보수적으로 읽어야 한다.
- **community 검색의 발전 방향.** 저자들은 자신들의 community 검색이 LightRAG의 high-level key 검색과 닮았다고 보고 두 접근의 결합을 유망한 후속 방향으로 지목한다.

## 6. 관련 연구 (Related Work)

- **MemGPT.** LLM 에이전트에 메모리를 붙인 선행 연구이자 이 논문의 주 비교 대상. DMR 벤치마크를 만든 팀이다.
- **AriGraph.** episodic·semantic 하위 그래프를 나누는 접근으로 Zep의 그래프 구성에 영향을 줬다.
- **GraphRAG.** community 노드로 도메인을 조망하는 아이디어의 출처. Zep은 여기에 동적 갱신과 시간 축을 더했다.
- **LightRAG.** high-level key 검색이 Zep의 community 검색과 병렬을 이룬다. 결합이 후속 과제로 제시된다.
- **Reflexion.** 엔티티 추출의 reflection 단계가 여기서 착안했다.
- **Distill-SynthKG.** graph 기반 RAG에서 breadth-first search를 쓴 드문 선례로 인용된다.

## 7. 용어집 (Glossary)

- **Zep**: AI 에이전트용 메모리 계층 서비스. 이 논문이 소개하는 상용 프로덕션 시스템이다.
- **Graphiti**: Zep을 떠받치는 temporally-aware knowledge graph 엔진. [getzep/graphiti](https://github.com/getzep/graphiti)로 오픈소스 공개돼 있다.
- **episode**: 메시지·텍스트·JSON 원본을 그대로 담는 non-lossy 저장 단위. 여기서 엔티티와 fact가 파생된다.
- **fact (semantic edge)**: 두 엔티티 사이의 관계를 담은 엣지. 같은 fact가 여러 엔티티 쌍에서 반복되면 hyper-edge로 표현한다.
- **bi-temporal 모델**: 사건이 일어난 시간 축 T와 데이터가 처리된 시간 축 T′를 분리해 추적하는 모델.
- **edge invalidation**: 모순되는 새 fact가 오면 예전 엣지를 지우지 않고 유효 기간을 닫아 invalid로 표시하는 갱신 방식.
- **DMR (Deep Memory Retrieval)**: MemGPT 팀이 만든 메모리 검색 벤치마크. Multi-Session Chat 500대화 부분집합.
- **LongMemEval**: 평균 11만 5천 토큰짜리 장기 대화로 기업 시나리오를 반영한 메모리 벤치마크.
- **BGE-m3**: BAAI가 낸 임베딩·reranking 모델. 이 논문 실험의 임베더 겸 reranker다.

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| tab01 | 6 | Deep Memory Retrieval 결과 (Zep 94.8% vs MemGPT 93.4%) | table-region | ★ wiki 권장 (result) |
| tab02 | 7 | LongMemEval 결과 — 정확도↑ + context 115k→1.6k + latency 90%↓ | manual | ★ wiki 권장 (result) |
| tab03 | 7 | LongMemEval 질문 유형별 분해 | manual | ★ wiki 권장 (result) |
