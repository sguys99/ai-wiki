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
    label: Figure 1
    kind: figure
    file: assets/gutierrez-2025-from-rag-to-memory-non/fig01.png
    raw: raw/papers/gutierrez-2025-from-rag-to-memory-non-figures/fig01.png
    caption: "HippoRAG 2 vs 기존 방법 3차원 평가 결과 (factual, sense-making, associativity)"
    page: 2
    bbox_norm: [0.0808, 0.075, 0.8945, 0.3407]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/gutierrez-2025-from-rag-to-memory-non/fig02.png
    raw: raw/papers/gutierrez-2025-from-rag-to-memory-non-figures/fig02.png
    caption: "HippoRAG 2 전체 아키텍처 — offline indexing과 online retrieval 파이프라인"
    page: 4
    bbox_norm: [0.0837, 0.0791, 0.8786, 0.301]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/gutierrez-2025-from-rag-to-memory-non/fig03.png
    raw: raw/papers/gutierrez-2025-from-rag-to-memory-non-figures/fig03.png
    caption: "Continual learning 실험: corpus 확장 시 HippoRAG 2 vs NV-Embed-v2 성능 추이"
    page: 8
    bbox_norm: [0.4925, 0.0771, 0.8945, 0.3364]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/gutierrez-2025-from-rag-to-memory-non/fig04.png
    raw: raw/papers/gutierrez-2025-from-rag-to-memory-non-figures/fig04.png
    caption: "Triple Filter LLM 프롬프트 (recognition memory) — few-shot 예시 포함"
    page: 14
    bbox_norm: [0.1383, 0.0771, 0.8328, 0.8974]
    strategy: caption-region
    curated: false
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/gutierrez-2025-from-rag-to-memory-non/fig05.png
    raw: raw/papers/gutierrez-2025-from-rag-to-memory-non-figures/fig05.png
    caption: "HippoRAG 2 파이프라인 예시 — Erik Hort 질문으로 query-to-triple~PPR 전 과정"
    page: 15
    bbox_norm: [0.186, 0.165, 0.7852, 0.7937]
    strategy: caption-region
    curated: false
  - id: tab01
    label: Table 1
    kind: table
    file: assets/gutierrez-2025-from-rag-to-memory-non/tab01.png
    raw: raw/papers/gutierrez-2025-from-rag-to-memory-non-figures/tab01.png
    caption: "Table 1. Dataset statistics"
    page: 6
    bbox_norm: [0.1677, 0.1084, 0.8039, 0.1743]
    strategy: table-region
    curated: false
  - id: tab02
    label: Table 2
    kind: table
    file: assets/gutierrez-2025-from-rag-to-memory-non/tab02.png
    raw: raw/papers/gutierrez-2025-from-rag-to-memory-non-figures/tab02.png
    caption: "Table 2. QA performance (F1 scores) on RAG benchmarks using Llama-3.3-70B-Instruct as the QA reader. No retrieval means evaluating"
    page: 7
    bbox_norm: [0.0808, 0.1027, 0.8945, 0.422]
    strategy: table-region
    curated: false
  - id: tab03
    label: Table 3
    kind: table
    file: assets/gutierrez-2025-from-rag-to-memory-non/tab03.png
    raw: raw/papers/gutierrez-2025-from-rag-to-memory-non-figures/tab03.png
    caption: "Table 3. Retrieval performance (passage recall@5) on RAG benchmarks. * denotes the report from the original paper. The compared"
    page: 7
    bbox_norm: [0.0843, 0.1659, 0.8945, 0.4255]
    strategy: table-region
    curated: false
  - id: tab04
    label: Table 4
    kind: table
    file: assets/gutierrez-2025-from-rag-to-memory-non/tab04.png
    raw: raw/papers/gutierrez-2025-from-rag-to-memory-non-figures/tab04.png
    caption: "Table 4. Ablations. We report passage recall@5 on multi-hop QA"
    page: 8
    bbox_norm: [0.0808, 0.1001, 0.889, 0.2602]
    strategy: table-region
    curated: false
  - id: tab05
    label: Table 5
    kind: table
    file: assets/gutierrez-2025-from-rag-to-memory-non/tab05.png
    raw: raw/papers/gutierrez-2025-from-rag-to-memory-non-figures/tab05.png
    caption: "Table 5. Reset probability factor. Passage recall@5 with different weight factors for passage nodes on our MuSiQue dev set and NaturalQuestions (NQ) dev set, where each set has 1 , 000 queries."
    page: 8
    bbox_norm: [0.0808, 0.1001, 0.889, 0.2602]
    strategy: table-region
    curated: false
  - id: tab06
    label: Table 6
    kind: table
    file: assets/gutierrez-2025-from-rag-to-memory-non/tab06.png
    raw: raw/papers/gutierrez-2025-from-rag-to-memory-non-figures/tab06.png
    caption: "Table 6. We show exemplary retrieval results (the title of passages) from HippoRAG 2 and NV-Embed-v2 on different types of questions."
    page: 9
    bbox_norm: [0.0808, 0.1245, 0.8909, 0.2573]
    strategy: table-region
    curated: false
  - id: tab07
    label: Table 7
    kind: table
    file: assets/gutierrez-2025-from-rag-to-memory-non/tab07.png
    raw: raw/papers/gutierrez-2025-from-rag-to-memory-non-figures/tab07.png
    caption: "Table 7. Robust to different dense retrievers. Passage recall@5"
    page: 9
    bbox_norm: [0.0808, 0.1245, 0.8909, 0.2573]
    strategy: table-region
    curated: false
  - id: tab08
    label: Table 8
    kind: table
    file: assets/gutierrez-2025-from-rag-to-memory-non/tab08.png
    raw: raw/papers/gutierrez-2025-from-rag-to-memory-non-figures/tab08.png
    caption: "Table 8. QA performance (EM / F1 scores) on RAG benchmarks. No retrieval means evaluating the parametric knowledge of the readers."
    page: 16
    bbox_norm: [0.0808, 0.1244, 0.8917, 0.4076]
    strategy: table-region
    curated: false
  - id: tab09
    label: Table 9
    kind: table
    file: assets/gutierrez-2025-from-rag-to-memory-non/tab09.png
    raw: raw/papers/gutierrez-2025-from-rag-to-memory-non-figures/tab09.png
    caption: "Table 9. Passage recall@2 / @5 on RAG benchmarks. * denotes the report from the original paper while we reproduce the HippoRAG"
    page: 17
    bbox_norm: [0.0808, 0.1245, 0.8909, 0.3886]
    strategy: table-region
    curated: false
  - id: tab10
    label: Table 10
    kind: table
    file: assets/gutierrez-2025-from-rag-to-memory-non/tab10.png
    raw: raw/papers/gutierrez-2025-from-rag-to-memory-non-figures/tab10.png
    caption: "Table 10. Knowledge graph statistics using different LLMs for OpenIE. The nodes and triples are counted based on unique values."
    page: 18
    bbox_norm: [0.0808, 0.1336, 0.8906, 0.4141]
    strategy: table-region
    curated: false
  - id: tab11
    label: Table 11
    kind: table
    file: assets/gutierrez-2025-from-rag-to-memory-non/tab11.png
    raw: raw/papers/gutierrez-2025-from-rag-to-memory-non-figures/tab11.png
    caption: "Table 11. Two examples from MuSiQue where passage recall@5 is less than 1.0."
    page: 18
    bbox_norm: [0.0808, 0.4946, 0.891, 0.8949]
    strategy: table-region
    curated: false
  - id: tab12
    label: Table 12
    kind: table
    file: assets/gutierrez-2025-from-rag-to-memory-non/tab12.png
    raw: raw/papers/gutierrez-2025-from-rag-to-memory-non-figures/tab12.png
    caption: "Table 12. We report the computational resource requirements (indexing tokens, indexing time, time per query, GPU memory requirements"
    page: 19
    bbox_norm: [0.0808, 0.1383, 0.8913, 0.2441]
    strategy: table-region
    curated: false
  - id: tab13
    label: Table 13
    kind: table
    file: assets/gutierrez-2025-from-rag-to-memory-non/tab13.png
    raw: raw/papers/gutierrez-2025-from-rag-to-memory-non-figures/tab13.png
    caption: "Table 13. Hyperparameters set on HippoRAG 2"
    page: 19
    bbox_norm: [0.3702, 0.3311, 0.6051, 0.4096]
    strategy: table-region
    curated: false
  - id: tab14
    label: Table 14
    kind: table
    file: assets/gutierrez-2025-from-rag-to-memory-non/tab14.png
    raw: raw/papers/gutierrez-2025-from-rag-to-memory-non-figures/tab14.png
    caption: "Table 14. Hyperparameters set on GraphRAG and LightRAG"
    page: 19
    bbox_norm: [0.2803, 0.5915, 0.695, 0.7454]
    strategy: table-region
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
