---
title: "From RAG to Memory: Non-Parametric Continual Learning for Large Language Models"
type: paper
year: 2025
category: database
raw_path: raw/papers/gutierrez-2025-from-rag-to-memory-non.pdf
raw_filename: "gutierrez-2025-from-rag-to-memory-non.pdf"
source_collection: external
source: gutierrez-2025-from-rag-to-memory-non.md
authors: "Bernal Jiménez Gutiérrez, Yiheng Shu, Weijian Qi, Sizhe Zhou, Yu Su"
arxiv_id: "2502.14802"
tags: [rag, knowledge-graph, continual-learning, memory, pagerank, hipporag]
figures:
  - id: fig01
    file: assets/gutierrez-2025-from-rag-to-memory-non/fig01.png
    raw: raw/papers/gutierrez-2025-from-rag-to-memory-non-figures/fig01.png
    caption: "HippoRAG 2 vs 기존 방법 3차원 평가 결과 (factual, sense-making, associativity)"
    page: 2
    strategy: page-region
    curated: true
  - id: fig02
    file: assets/gutierrez-2025-from-rag-to-memory-non/fig02.png
    raw: raw/papers/gutierrez-2025-from-rag-to-memory-non-figures/fig02.png
    caption: "HippoRAG 2 전체 아키텍처 — offline indexing과 online retrieval 파이프라인"
    page: 4
    strategy: page-region
    curated: true
  - id: fig03
    file: assets/gutierrez-2025-from-rag-to-memory-non/fig03.png
    raw: raw/papers/gutierrez-2025-from-rag-to-memory-non-figures/fig03.png
    caption: "Continual learning 실험: corpus 확장 시 HippoRAG 2 vs NV-Embed-v2 성능 추이"
    page: 8
    strategy: page-region
    curated: true
  - id: fig04
    file: assets/gutierrez-2025-from-rag-to-memory-non/fig04.png
    raw: raw/papers/gutierrez-2025-from-rag-to-memory-non-figures/fig04.png
    caption: "Triple Filter LLM 프롬프트 (recognition memory) — few-shot 예시 포함"
    page: 14
    strategy: page-region
    curated: false
  - id: fig05
    file: assets/gutierrez-2025-from-rag-to-memory-non/fig05.png
    raw: raw/papers/gutierrez-2025-from-rag-to-memory-non-figures/fig05.png
    caption: "HippoRAG 2 파이프라인 예시 — Erik Hort 질문으로 query-to-triple~PPR 전 과정"
    page: 15
    strategy: page-region
    curated: false
---

## 요약 (Summary)

표준 RAG의 벡터 검색에 knowledge graph와 Personalized PageRank를 더해 사실·sense-making·연상(multi-hop) 세 가지 메모리 과제를 한꺼번에 개선한 HippoRAG 2를 제안한다. ICML 2025에 발표된 논문으로, 기존 structure-augmented RAG 방법들이 한 유형에서만 강하고 나머지에서 급락하는 문제를 해결한다.

![[assets/gutierrez-2025-from-rag-to-memory-non/fig01.png]]
*Figure 1: HippoRAG 2가 factual memory, sense-making, associativity 세 벤치마크 유형 모두에서 기존 방법을 앞선다 (Gutiérrez et al. 2025, p.2)*

## 주요 기여 (Key Contributions)

1. **HippoRAG 2 프레임워크** — 표준 RAG 대비 factual/sense-making/associativity 세 벤치마크 유형에서 모두 우위를 보인 최초의 structure-augmented RAG
2. **Dense-Sparse Integration** — phrase node(sparse, 개념)에 passage node(dense, 맥락)를 KG에 더해, 개념과 맥락 사이의 trade-off를 neurobiology 관점에서 풀어냈다
3. **Deeper Contextualization** — 기존 HippoRAG의 NER-to-node 대신 query-to-triple 방식으로 쿼리를 KG에 연결해 Recall@5를 평균 12.5%p 끌어올렸다
4. **Recognition Memory** — LLM이 top-k triple을 필터링해 노이즈를 제거한다(recall과 recognition의 이중 메모리 모방)

## 방법론 및 아키텍처 (Methodology and Architecture)

**offline indexing**과 **online retrieval** 두 단계로 구성된다.

![[assets/gutierrez-2025-from-rag-to-memory-non/fig02.png]]
*Figure 2: HippoRAG 2 전체 파이프라인. Offline에서 LLM OpenIE로 KG를 구성하고, Online에서 query-to-triple → recognition memory → PPR 순으로 검색한다 (Gutiérrez et al. 2025, p.4)*

### Offline Indexing

1. **OpenIE by LLM** — 각 passage에서 (subject, relation, object) triple을 schema-less KG에 추가한다. subject와 object를 phrase node, edge를 relation edge라 부른다.
2. **Synonym detection** — embedding 유사도가 임계값(0.8) 이상인 phrase 쌍에 synonym edge를 추가해 다른 passage의 동의어를 연결한다.
3. **Dense-Sparse Integration** — 각 passage를 passage node로 KG에 추가하고, 그 passage에서 파생된 모든 phrase node와 context edge("contains")로 잇는다. 최종 KG는 phrase node와 passage node, relation·synonym·context edge가 섞인 형태다.

### Online Retrieval

1. **Query to Triple** — 전체 쿼리를 embedding으로 KG의 top-k triple과 매칭한다(NER 불필요).
2. **Recognition Memory (triple filtering)** — LLM이 top-k triple 가운데 쿼리와 무관한 것을 걸러 최종 seed triple T′를 산출한다.
3. **Seed node selection** — T′에 속한 phrase node(average ranking score 기준 최대 5개)와 모든 passage node를 seed로 고른다.
4. **PPR graph search** — phrase node는 ranking score를, passage node는 embedding 유사도에 weight factor(기본 0.05)를 곱한 값을 reset probability로 써서 PPR을 실행한다.
5. **QA** — PageRank 상위 5개 passage를 LLM에 context로 넣어 답변을 생성한다.

### HippoRAG vs HippoRAG 2 차이점

| 항목 | HippoRAG | HippoRAG 2 |
|---|---|---|
| KG 노드 | phrase node만 | phrase node + **passage node** |
| 쿼리 연결 | NER-to-node | **query-to-triple** |
| triple 필터 | 없음 | **LLM recognition memory** |
| PPR seed | phrase node | phrase node + **all passage nodes** |

## 결과 (Results)

### QA 성능 (F1, Llama-3.3-70B-Instruct reader)

| 방법 | Simple QA avg | Multi-hop avg | NarrativeQA | 전체 avg |
|---|---|---|---|---|
| NV-Embed-v2 (7B) | 58.8 | 50.8 | 25.7 | 57.0 |
| HippoRAG | 55.6 | 44.7 | 16.3 | 53.1 |
| GraphRAG | 47.5 | 44.6 | 23.0 | 49.6 |
| **HippoRAG 2** | **59.7** | **52.5** | **25.9** | **59.8** |

- NV-Embed-v2 대비 **+2.8 avg F1**, 2Wiki +9.5, LV-Eval +3.1
- 검색 성능(Recall@5): 78.2 avg vs NV-Embed-v2 73.4 (+4.8%p). MuSiQue +5.0, 2Wiki +13.9

![[assets/gutierrez-2025-from-rag-to-memory-non/fig03.png]]
*Figure 3: corpus를 점진적으로 확장해도 HippoRAG 2의 우위가 NQ(simple)와 MuSiQue(associative) 양쪽에서 일관되게 유지된다 (Gutiérrez et al. 2025, p.8)*

### Ablation 주요 결과

- query-to-triple을 NER-to-node로 교체하면 avg Recall@5 -12.5%p
- passage node를 제거하면 avg -6.1%p
- triple filter를 제거하면 avg -0.7%p

## 한계 (Limitations)

- **Recognition memory 정밀도**: 26% 샘플에서 필터링 후 supporting passage의 phrase가 매칭되지 않고, 18%에서는 triple이 하나도 남지 않는다
- **컴퓨팅 비용**: QA GPU memory 9.9GB, 인덱싱 99.5분으로 표준 dense retriever(12.1분)보다 높다

## 관련 페이지 (Related Pages)

- [[database/edge-2024-from-local-to-global|GraphRAG]] — community detection + map-reduce 요약. sense-making 강점, simple QA 약점
- [[database/guo-2025-lightrag-simple-and-fast|LightRAG]] — dual-level keyword 검색 + KG. HippoRAG 2의 비교 대상
