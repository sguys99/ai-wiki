---
title: "From RAG to Memory: Non-Parametric Continual Learning for Large Language Models"
type: paper
year: 2025
category: database
raw_path: raw/papers/gutierrez-2025-from-rag-to-memory-non.pdf
raw_filename: "gutierrez-2025-from-rag-to-memory-non.pdf"
source_collection: external
authors: "Bernal Jiménez Gutiérrez, Yiheng Shu, Weijian Qi, Sizhe Zhou, Yu Su"
arxiv_id: "2502.14802"
tags: [rag, knowledge-graph, continual-learning, memory, pagerank, hipporag]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/gutierrez-2025-from-rag-to-memory-non/fig01.png
    raw: raw/papers/gutierrez-2025-from-rag-to-memory-non-figures/fig01.png
    caption: "세 가지 메모리 능력(사실 기억, sense-making, associativity)에서 다섯 방법을 비교한 막대그래프"
    page: 2
    bbox_norm: [0.0808, 0.075, 0.8945, 0.3407]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/gutierrez-2025-from-rag-to-memory-non/fig02.png
    raw: raw/papers/gutierrez-2025-from-rag-to-memory-non-figures/fig02.png
    caption: "HippoRAG 2 전체 구조, offline indexing 3단계와 online retrieval 5단계"
    page: 4
    bbox_norm: [0.0837, 0.0791, 0.8786, 0.301]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/gutierrez-2025-from-rag-to-memory-non/fig03.png
    raw: raw/papers/gutierrez-2025-from-rag-to-memory-non-figures/fig03.png
    caption: "corpus를 25%에서 100%까지 늘릴 때 NQ와 MuSiQue의 F1 추이"
    page: 8
    bbox_norm: [0.4925, 0.0771, 0.8945, 0.3364]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/gutierrez-2025-from-rag-to-memory-non/fig04.png
    raw: raw/papers/gutierrez-2025-from-rag-to-memory-non-figures/fig04.png
    caption: "recognition memory가 쓰는 triple filter 프롬프트 전문, 지시문과 few-shot 예시 7개"
    page: 14
    bbox_norm: [0.1383, 0.0771, 0.8328, 0.8974]
    strategy: caption-region
    curated: false
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/gutierrez-2025-from-rag-to-memory-non/fig05.png
    raw: raw/papers/gutierrez-2025-from-rag-to-memory-non-figures/fig05.png
    caption: "Erik Hort 질문으로 본 online retrieval 실행 예시, query-to-triple부터 상위 5개 passage까지"
    page: 15
    bbox_norm: [0.186, 0.165, 0.7852, 0.7937]
    strategy: caption-region
    curated: false
  - id: tab01
    label: Table 1
    kind: table
    file: assets/gutierrez-2025-from-rag-to-memory-non/tab01.png
    raw: raw/papers/gutierrez-2025-from-rag-to-memory-non-figures/tab01.png
    caption: "벤치마크 7종의 질문 수와 passage 수 통계"
    page: 6
    bbox_norm: [0.1677, 0.1084, 0.8039, 0.1743]
    strategy: table-region
    curated: false
  - id: tab02
    label: Table 2
    kind: table
    file: assets/gutierrez-2025-from-rag-to-memory-non/tab02.png
    raw: raw/papers/gutierrez-2025-from-rag-to-memory-non-figures/tab02.png
    caption: "Llama-3.3-70B-Instruct를 reader로 쓴 벤치마크 7종의 QA F1 비교"
    page: 7
    bbox_norm: [0.0808, 0.1027, 0.8945, 0.422]
    strategy: table-region
    curated: false
  - id: tab03
    label: Table 3
    kind: table
    file: assets/gutierrez-2025-from-rag-to-memory-non/tab03.png
    raw: raw/papers/gutierrez-2025-from-rag-to-memory-non-figures/tab03.png
    caption: "벤치마크 5종의 passage recall@5 검색 성능 비교 (크롭은 Table 2 본문이 잡혔다)"
    page: 7
    bbox_norm: [0.0843, 0.1659, 0.8945, 0.4255]
    strategy: table-region
    curated: false
  - id: tab04
    label: Table 4
    kind: table
    file: assets/gutierrez-2025-from-rag-to-memory-non/tab04.png
    raw: raw/papers/gutierrez-2025-from-rag-to-memory-non-figures/tab04.png
    caption: "graph linking, graph 구성, triple 필터를 각각 바꾼 multi-hop recall@5 ablation"
    page: 8
    bbox_norm: [0.0808, 0.1001, 0.889, 0.2602]
    strategy: table-region
    curated: false
  - id: tab05
    label: Table 5
    kind: table
    file: assets/gutierrez-2025-from-rag-to-memory-non/tab05.png
    raw: raw/papers/gutierrez-2025-from-rag-to-memory-non-figures/tab05.png
    caption: "passage node의 weight factor를 0.01에서 0.5까지 바꾼 recall@5 (크롭이 tab04와 같다)"
    page: 8
    bbox_norm: [0.0808, 0.1001, 0.889, 0.2602]
    strategy: table-region
    curated: false
  - id: tab06
    label: Table 6
    kind: table
    file: assets/gutierrez-2025-from-rag-to-memory-non/tab06.png
    raw: raw/papers/gutierrez-2025-from-rag-to-memory-non-figures/tab06.png
    caption: "simple QA와 multi-hop QA 각 1건의 검색 결과를 NV-Embed-v2와 나란히 놓은 정성 비교"
    page: 9
    bbox_norm: [0.0808, 0.1245, 0.8909, 0.2573]
    strategy: table-region
    curated: false
  - id: tab07
    label: Table 7
    kind: table
    file: assets/gutierrez-2025-from-rag-to-memory-non/tab07.png
    raw: raw/papers/gutierrez-2025-from-rag-to-memory-non-figures/tab07.png
    caption: "dense retriever 3종을 교체했을 때의 MuSiQue recall@5 (크롭이 tab06과 같다)"
    page: 9
    bbox_norm: [0.0808, 0.1245, 0.8909, 0.2573]
    strategy: table-region
    curated: false
  - id: tab08
    label: Table 8
    kind: table
    file: assets/gutierrez-2025-from-rag-to-memory-non/tab08.png
    raw: raw/papers/gutierrez-2025-from-rag-to-memory-non-figures/tab08.png
    caption: "Llama-3.3-70B-Instruct와 GPT-4o-mini를 각각 reader로 쓴 EM과 F1 전체 결과"
    page: 16
    bbox_norm: [0.0808, 0.1244, 0.8917, 0.4076]
    strategy: table-region
    curated: false
  - id: tab09
    label: Table 9
    kind: table
    file: assets/gutierrez-2025-from-rag-to-memory-non/tab09.png
    raw: raw/papers/gutierrez-2025-from-rag-to-memory-non-figures/tab09.png
    caption: "벤치마크 5종의 passage recall@2와 recall@5 전체 결과"
    page: 17
    bbox_norm: [0.0808, 0.1245, 0.8909, 0.3886]
    strategy: table-region
    curated: false
  - id: tab10
    label: Table 10
    kind: table
    file: assets/gutierrez-2025-from-rag-to-memory-non/tab10.png
    raw: raw/papers/gutierrez-2025-from-rag-to-memory-non-figures/tab10.png
    caption: "OpenIE에 쓴 LLM별 knowledge graph 노드 수와 edge 수 통계"
    page: 18
    bbox_norm: [0.0808, 0.1336, 0.8906, 0.4141]
    strategy: table-region
    curated: false
  - id: tab11
    label: Table 11
    kind: table
    file: assets/gutierrez-2025-from-rag-to-memory-non/tab11.png
    raw: raw/papers/gutierrez-2025-from-rag-to-memory-non-figures/tab11.png
    caption: "MuSiQue에서 recall@5가 1.0에 못 미친 오류 사례 2건의 전체 실행 기록"
    page: 18
    bbox_norm: [0.0808, 0.4946, 0.891, 0.8949]
    strategy: table-region
    curated: false
  - id: tab12
    label: Table 12
    kind: table
    file: assets/gutierrez-2025-from-rag-to-memory-non/tab12.png
    raw: raw/papers/gutierrez-2025-from-rag-to-memory-non-figures/tab12.png
    caption: "MuSiQue corpus 기준 인덱싱 토큰, 인덱싱 시간, 질의당 시간, GPU memory 비교"
    page: 19
    bbox_norm: [0.0808, 0.1383, 0.8913, 0.2441]
    strategy: table-region
    curated: false
  - id: tab13
    label: Table 13
    kind: table
    file: assets/gutierrez-2025-from-rag-to-memory-non/tab13.png
    raw: raw/papers/gutierrez-2025-from-rag-to-memory-non-figures/tab13.png
    caption: "HippoRAG 2 하이퍼파라미터 3종의 설정값"
    page: 19
    bbox_norm: [0.3702, 0.3311, 0.6051, 0.4096]
    strategy: table-region
    curated: false
  - id: tab14
    label: Table 14
    kind: table
    file: assets/gutierrez-2025-from-rag-to-memory-non/tab14.png
    raw: raw/papers/gutierrez-2025-from-rag-to-memory-non-figures/tab14.png
    caption: "비교 대상 GraphRAG와 LightRAG에 적용한 하이퍼파라미터 설정"
    page: 19
    bbox_norm: [0.2803, 0.5915, 0.695, 0.7454]
    strategy: table-region
    curated: false
---

## 한 줄 요약 (One-line Summary)

표준 RAG의 벡터 retrieval에 knowledge graph와 Personalized PageRank를 결합하되 passage 자체를 그래프 노드로 넣어, 사실 기억과 sense-making과 associativity 세 가지 메모리 과제에서 동시에 우위를 확보한 HippoRAG 2를 제안한다.

## 1. 자료 정보 (Document Information)

- **저자**: Bernal Jiménez Gutiérrez\*, Yiheng Shu\*, Weijian Qi, Sizhe Zhou, Yu Su (\*equal contribution)
- **소속**: The Ohio State University (1저자 포함 4인), University of Illinois Urbana-Champaign (Sizhe Zhou)
- **발표**: ICML 2025 (Proceedings of the 42nd ICML, Vancouver, PMLR 267). arXiv 2502.14802v2, 2025-06-19
- **코드**: https://github.com/OSU-NLP-Group/HippoRAG
- **지원**: ARL W911NF2220144, NSF 2112606, Cisco 기부금. 연산 자원은 Ohio Supercomputer Center

## 2. 주요 기여 (Key Contributions)

1. **HippoRAG 2 프레임워크**. 사실 기억, sense-making, associativity 세 가지 벤치마크 유형 전부에서 최강 임베딩 모델을 앞선 structure-augmented RAG다. 논문은 기존 structure-augmented 방법이 자기 실험 설정 밖의 과제에서 가장 크게 하락한다는 점을 실험으로 보이고 그 문제를 해결 대상으로 삼는다.
2. **Dense-Sparse Integration**. phrase node(개념, sparse coding)만 있던 HippoRAG의 KG에 passage node(맥락, dense coding)를 더하고 "contains" context edge로 잇는다. 뇌의 dense coding과 sparse coding 이론(Beyeler et al., 2019)에서 착안했다.
3. **Deeper Contextualization**. 쿼리를 KG에 잇는 방식을 NER-to-node에서 query-to-triple로 바꿨다. multi-hop recall@5 평균이 74.6에서 87.1로 12.5%p 올랐다.
4. **Recognition Memory**. 인간 기억의 recall과 recognition 이중 구조(Uner & Roediger III, 2022)를 본떠, retrieval된 top-5 triple을 LLM이 한 번 더 걸러 seed node를 정한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 신경생물학 대응 구조

HippoRAG 계열은 구성 요소마다 인간 기억의 대응물을 둔다. LLM은 인공 neocortex, KG와 PPR은 hippocampus의 auto-associative 성질, retrieval encoder는 parahippocampal region의 기능을 맡는다.

### Offline Indexing

1. **OpenIE by LLM**. 각 passage에서 (subject, relation, object) triple을 추출해 schema 없는 KG에 넣는다. subject와 object가 phrase node, 이를 잇는 edge가 relation edge다.
2. **Synonym detection**. retrieval encoder가 phrase 쌍의 벡터 유사도를 재고 임계값 0.8을 넘으면 synonym edge를 추가한다. 서로 다른 passage에 흩어진 동의어가 이 edge로 연결된다.
3. **Dense-sparse integration**. 각 passage를 passage node로 KG에 추가하고, 그 passage에서 나온 모든 phrase node와 "contains" context edge로 잇는다. HippoRAG의 document ensemble(그래프 점수와 임베딩 점수를 사후 합산)과 달리 그래프 구조 안에서 통합한다.

### Online Retrieval

1. **Query to Triple**. 쿼리 전체를 임베딩으로 KG의 top-5 triple과 매칭한다. NER 단계가 사라진다.
2. **Recognition memory (triple filtering)**. LLM이 top-5 triple 중 쿼리와 관련 있는 것만 남겨 T′를 만든다. 프롬프트는 최대 4개까지 고르라고 지시하고, 없으면 빈 리스트를 반환하게 한다.
3. **Seed node selection**. T′에 등장한 phrase node를 최대 5개까지 고른다. 각 phrase node의 ranking score는 그것이 등장한 filtered triple 점수의 평균이다. passage node는 전량이 seed가 된다. 상위 몇 개만 활성화하는 것보다 넓게 활성화하는 편이 multi-hop 추론 사슬을 따라가는 데 낫다고 보고한다. T′가 비면 그래프 검색을 건너뛰고 임베딩 검색 결과를 그대로 반환한다.
4. **Reset probability 배정**. phrase node는 ranking score를 그대로 쓰고, passage node는 임베딩 유사도에 weight factor를 곱한 값을 쓴다. 기본값은 0.05다.
5. **PPR 실행과 QA**. python-igraph로 PPR을 돌려 passage node의 PageRank 점수로 순위를 매기고, 상위 5개를 QA reader의 context로 넣는다.

### 쿼리 연결 방식 세 가지

| 방식 | 설명 | 출처 |
|---|---|---|
| NER to node | 쿼리에서 개체를 뽑아 임베딩으로 KG 노드와 매칭 | HippoRAG 원안 |
| Query to node | 쿼리 전체를 KG 노드와 직접 매칭 | 본 논문 대안 |
| Query to triple | 쿼리 전체를 KG의 triple과 매칭 | HippoRAG 2 기본값 |

query-to-node가 NER-to-node보다 나쁜 이유로, 쿼리와 KG 노드의 입도가 다르다는 점을 든다. NER 결과와 KG 노드는 둘 다 phrase 수준이지만 쿼리 전체는 그렇지 않다.

### HippoRAG와 HippoRAG 2 차이

| 항목 | HippoRAG | HippoRAG 2 |
|---|---|---|
| KG 노드 | phrase node만 | phrase node와 passage node |
| 쿼리 연결 | NER to node | query to triple |
| triple 필터 | 없음 | LLM recognition memory |
| PPR seed | phrase node | phrase node와 모든 passage node |
| passage 점수 결합 | 그래프 점수와 임베딩 점수 사후 합산 | 그래프 구조 안에서 통합 |

### 실험 설정

- **추출과 필터 LLM**: Llama-3.3-70B-Instruct. QA reader는 Llama-3.3-70B-Instruct 또는 GPT-4o-mini
- **retriever**: nvidia/NV-Embed-v2
- **triple filter 프롬프트**: DSPy MIPROv2 optimizer와 Llama-3.3-70B-Instruct로 지시문과 시연을 함께 튜닝
- **비교 대상 재현**: structure-augmented 방법 전부를 같은 추출 LLM과 같은 retriever로 다시 돌렸다
- **하이퍼파라미터 튜닝**: MuSiQue 학습 데이터 100건
- **지표**: 검색은 passage recall@5, QA는 MuSiQue를 따른 토큰 기반 F1
- **LLM 서빙**: NVIDIA H100 4장, vLLM의 tensor parallelism

| 하이퍼파라미터 | 값 |
|---|---|
| Synonym Threshold | 0.8 |
| Damping Factor of PPR | 0.5 |
| Temperature | 0.0 |

비교 대상 GraphRAG와 LightRAG는 둘 다 Mode를 Local, Response Type을 Short phrase, Top-k Phrases for QA를 60, Chunk Token Size를 1,200, Chunk Overlap을 100으로 뒀다. GraphRAG는 여기에 Community Report Max Length 2,000과 Max Input Length 8,000과 Max Cluster Size 10을, LightRAG는 Entity Summary Max Tokens 500을 더 쓴다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 데이터셋 통계 (Table 1)

| 항목 | NQ | PopQA | MuSiQue | 2Wiki | HotpotQA | LV-Eval | NarrativeQA |
|---|---|---|---|---|---|---|---|
| 질문 수 | 1,000 | 1,000 | 1,000 | 1,000 | 1,000 | 124 | 293 |
| passage 수 | 9,633 | 8,676 | 11,656 | 6,119 | 9,811 | 22,849 | 4,111 |

simple QA는 NQ와 PopQA, multi-hop QA는 MuSiQue와 2Wiki와 HotpotQA와 LV-Eval, discourse understanding은 NarrativeQA가 맡는다. LV-Eval은 키워드와 구절을 치환해 지식 누출을 줄인 데이터셋이라 위키 기반 데이터셋과 성격이 다르다. NarrativeQA는 장편 소설 10편과 그에 딸린 질문 293건을 골랐다.

### QA 성능 (Table 2, F1, Llama-3.3-70B-Instruct reader)

| 방법 | NQ | PopQA | MuSiQue | 2Wiki | HotpotQA | LV-Eval | NarrativeQA | Avg |
|---|---|---|---|---|---|---|---|---|
| None (retrieval 없음) | 54.9 | 32.5 | 26.1 | 42.8 | 47.3 | 6.0 | 12.9 | 38.4 |
| Contriever | 58.9 | 53.1 | 31.3 | 41.9 | 62.3 | 8.1 | 19.7 | 46.9 |
| BM25 | 59.0 | 49.9 | 28.8 | 51.2 | 63.4 | 5.9 | 18.3 | 47.7 |
| GTR (T5-base) | 59.9 | 56.2 | 34.6 | 52.8 | 62.8 | 7.1 | 19.9 | 50.4 |
| GTE-Qwen2-7B-Instruct | 62.0 | 56.3 | 40.9 | 60.0 | 71.0 | 7.1 | 21.3 | 54.9 |
| GritLM-7B | 61.3 | 55.8 | 44.8 | 60.6 | 73.3 | 9.8 | 23.9 | 56.1 |
| NV-Embed-v2 (7B) | 61.9 | 55.7 | 45.7 | 61.5 | 75.3 | 9.8 | 25.7 | 57.0 |
| RAPTOR | 50.7 | 56.2 | 28.9 | 52.1 | 69.5 | 5.0 | 21.4 | 48.8 |
| GraphRAG | 46.9 | 48.1 | 38.5 | 58.6 | 68.6 | 11.2 | 23.0 | 49.6 |
| LightRAG | 16.6 | 2.4 | 1.6 | 11.6 | 2.4 | 1.0 | 3.7 | 6.6 |
| HippoRAG | 55.3 | 55.9 | 35.1 | 71.8 | 63.5 | 8.4 | 16.3 | 53.1 |
| **HippoRAG 2** | **63.3** | 56.2 | **48.6** | 71.0 | **75.5** | **12.9** | **25.9** | **59.8** |

부트스트랩 검정에서 NQ, MuSiQue, 2Wiki, LV-Eval 네 곳의 개선이 유의했다(p < 0.05). NV-Embed-v2 대비 평균 +2.8 F1이고, 2Wiki에서 +9.5, LV-Eval에서 +3.1이다. 2Wiki 단독 최고점은 HippoRAG의 71.8이다.

### 세 능력별 집계 (Figure 1)

| 방법 | 사실 기억 | sense-making | associativity |
|---|---|---|---|
| RAPTOR | 53.45 | 21.40 | 48.37 |
| GraphRAG | 47.50 | 23.00 | 53.49 |
| HippoRAG | 55.60 | 16.30 | 54.88 |
| NV-Embed-v2 | 58.80 | 25.70 | 58.81 |
| HippoRAG 2 | 59.75 | 25.90 | 62.96 |

HippoRAG는 sense-making에서 16.30으로 가장 낮고, RAPTOR는 associativity에서 48.37로 가장 낮다. 논문은 각 방법이 자기 실험 설정 밖에서 가장 크게 하락한다는 관찰을 이 그림으로 뒷받침한다.

### 검색 성능 (Table 3, passage recall@5)

| 방법 | NQ | PopQA | MuSiQue | 2Wiki | HotpotQA | Avg |
|---|---|---|---|---|---|---|
| BM25 | 56.1 | 35.7 | 43.5 | 65.3 | 74.8 | 55.1 |
| Contriever | 54.6 | 43.2 | 46.6 | 57.5 | 75.3 | 55.4 |
| GTR (T5-base) | 63.4 | 49.4 | 49.1 | 67.9 | 73.9 | 60.7 |
| GTE-Qwen2-7B-Instruct | 74.3 | 50.6 | 63.6 | 74.8 | 89.1 | 70.5 |
| GritLM-7B | 76.6 | 50.1 | 65.9 | 76.0 | 92.4 | 72.2 |
| NV-Embed-v2 (7B) | 75.4 | 51.0 | 69.7 | 76.5 | 94.5 | 73.4 |
| RAPTOR | 68.3 | 48.7 | 57.8 | 66.2 | 86.9 | 65.6 |
| HippoRAG (원 논문 보고) | 없음 | 없음 | 51.9 | 89.1 | 77.7 | 없음 |
| HippoRAG (재현) | 44.4 | 53.8 | 53.2 | 90.4 | 77.3 | 63.8 |
| **HippoRAG 2** | **78.0** | 51.7 | **74.7** | **90.4** | **96.3** | **78.2** |

GraphRAG와 LightRAG는 passage 검색 결과를 직접 내지 않아 이 표에서 빠졌다. HippoRAG는 PopQA recall@5 53.8로 개체 중심 검색에서는 앞서지만 전반적으로는 최신 dense retriever에 밀린다. HippoRAG 2는 NV-Embed-v2 대비 MuSiQue +5.0, 2Wiki +13.9다. 논문은 이 절에서 대형 임베딩 모델의 우위를 "9.8% higher F1", HippoRAG 재현판의 개선폭을 "1.3% increase in F1"이라 쓰지만, 두 값은 모두 Table 3의 recall@5 차이와 일치한다.

### recall@2와 recall@5 전체 (Table 9)

reader를 GPT-4o-mini로 바꾼 HippoRAG 2도 recall@2 59.3 / recall@5 77.7로, Llama 판(61.1 / 78.2)과 큰 차이가 없다. 논문은 recall@2의 개선 추세가 recall@5와 비슷하다고 정리한다.

### Ablation (Table 4, multi-hop passage recall@5)

| 설정 | MuSiQue | 2Wiki | HotpotQA | Avg |
|---|---|---|---|---|
| HippoRAG 2 | 74.7 | 90.4 | 96.3 | 87.1 |
| w/ NER to node | 53.8 | 91.2 | 78.8 | 74.6 |
| w/ Query to node | 44.9 | 65.5 | 68.3 | 59.6 |
| w/o Passage Node | 63.7 | 90.3 | 88.9 | 81.0 |
| w/o Filter | 73.0 | 90.7 | 95.4 | 86.4 |

query-to-triple을 NER-to-node로 되돌리면 평균 12.5%p, passage node를 빼면 6.1%p, triple filter를 빼면 0.7%p 내려간다. NER-to-node와 query-to-node에는 필터를 적용하지 않았다. 2Wiki만은 NER-to-node(91.2)와 w/o Filter(90.7)가 기본 설정(90.4)보다 높다.

### Reset probability weight factor (Table 5)

| weight | 0.01 | 0.05 | 0.1 | 0.3 | 0.5 |
|---|---|---|---|---|---|
| MuSiQue dev | 79.9 | 80.5 | 79.8 | 78.4 | 77.9 |
| NQ dev | 75.6 | 76.9 | 76.9 | 76.7 | 76.4 |

dev set은 각각 1,000건이다. 두 데이터셋을 함께 보고 기본값을 0.05로 정했다.

### Dense retriever 교체 (Table 7, MuSiQue 부분집합 recall@5)

| retriever | dense retrieval 단독 | HippoRAG 2 |
|---|---|---|
| GTE-Qwen2-7B-Instruct | 63.6 | 68.8 |
| GritLM-7B | 66.0 | 71.6 |
| NV-Embed-v2 (7B) | 69.7 | 74.7 |

세 retriever 모두에서 이득이 유지된다.

### QA reader 교체 (Table 8, EM / F1)

GPT-4o-mini를 인덱싱과 QA reading에 쓴 경우에도 HippoRAG 2 평균이 44.3 / 58.1로 NV-Embed-v2의 42.9 / 55.7을 앞선다. LV-Eval에서 10.5 / 14.0으로 격차가 가장 크고, GPT-4o-mini의 retrieval 없는 기준선은 22.6 / 33.1이다.

### Continual learning (Figure 3)

NQ와 MuSiQue를 각각 4등분해 한 구간을 평가용으로 두고 나머지를 순차 투입했다. 각 구간은 약 250개 질문의 정답 문서와 distractor를 담는다. NQ 계열은 corpus가 커져도 두 방법 모두 60 부근을 유지하지만, MuSiQue 계열은 25%에서 100%로 갈수록 함께 내려간다. HippoRAG 2와 NV-Embed-v2의 격차는 구간 전체에서 거의 일정하게 유지된다.

### KG 통계 (Table 10)

Llama-3.3-70B-Instruct 기준 MuSiQue의 KG는 phrase node 85,288개, passage node 11,656개, extracted edge 140,830개, synonym edge 1,125,951개, context edge 132,586개다. 어느 데이터셋이든 synonym edge가 전체 edge의 대부분을 차지한다. GPT-4o-mini는 같은 corpus에서 phrase node를 더 많이 만든다(MuSiQue 101,641개).

### 비용과 효율 (Table 12, MuSiQue corpus 11,656 passage)

| 항목 | NV-Embed-v2 | RAPTOR | LightRAG | GraphRAG | HippoRAG | HippoRAG 2 |
|---|---|---|---|---|---|---|
| Input Tokens | 없음 | 1.7M | 68.5M | 115.5M | 9.2M | 9.2M |
| Output Tokens | 없음 | 0.2M | 18.3M | 36.1M | 3.0M | 3.0M |
| Indexing Time (분) | 12.1 | 100.5 | 235.0 | 277.0 | 57.5 | 99.5 |
| QA Time/Query (초) | 0.3 | 0.6 | 13.3 | 10.7 | 0.9 | 1.2 |
| QA GPU Memory (GB) | 1.7 | 1.4 | 4.5 | 3.7 | 6.0 | 9.9 |

모델 가중치 메모리는 모든 시스템이 공유하므로 제외했다. HippoRAG 2의 인덱싱 입력 토큰은 GraphRAG의 약 12분의 1이고 LightRAG의 약 7분의 1이다. 반면 triple 자체를 임베딩해 보관하기 때문에 QA GPU memory는 비교 대상 중 가장 크다.

### 정성 사례 (Table 6)

"In what city was I. P. Paul born?"에서 NV-Embed-v2는 정답 근거 passage를 1위로 올렸지만, HippoRAG 2는 triple 연결 단계에서 답 "Thrissur"를 직접 찾아내고 그 passage를 2위에 올렸다. "What county is Erik Hort's birthplace a part of?"에서 NV-Embed-v2는 "Erik Hort" passage만 찾고 멈추지만, HippoRAG 2는 query-to-triple 단계에서 "Montebello" passage를 끌어와 상위에 올린다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

### 오류 분석 (Appendix E, recall@5 < 1.0인 샘플 100건)

샘플의 hop 분포는 2-hop 26%, 3-hop 41%, 4-hop 33%다. 오류의 주된 출처는 triple filtering과 그래프 검색 두 가지다.

| 구간 | 관찰 | 비율 |
|---|---|---|
| recognition memory | 필터 전에 이미 근거 문서의 phrase가 하나도 매칭되지 않음 | 7% |
| recognition memory | 필터 후에 근거 문서의 phrase가 하나도 매칭되지 않음 | 26% |
| recognition memory | 필터 후 근거 phrase 비율이 오히려 감소 | 8% |
| recognition memory | 필터 후 triple이 0개 | 18% |
| graph construction | 연결된 노드의 1-hop 이웃에 근거 문서 phrase가 전혀 없음 | 2% |
| Personalized PageRank | 연결된 phrase node의 절반 이상이 근거 문서에 있는데도 최종 결과가 미흡 | 50% |

필터 후 triple이 0개가 되는 18%는 필터의 오류라기보다 연결 시도 자체가 실패한 경우로, 이때 HippoRAG 2는 dense retrieval 결과를 대신 쓴다. 그래프 구성 실패가 2%에 그친다는 점에서, 저자들은 dense-sparse integration 덕에 그래프가 필요한 정보를 대체로 담고 있다고 본다. 남는 병목은 필터의 정밀도와 그래프 검색이다. Table 11의 두 번째 사례에서는 recognition memory가 "Philippe, Duke of Orléans"를 제대로 잡았는데도 그래프 검색이 상위 5개 안에 정답 근거를 올리지 못했다.

### 비용 부담

인덱싱 99.5분과 QA GPU memory 9.9GB는 NV-Embed-v2(12.1분, 1.7GB)보다 크다. 논문은 모든 structure-augmented 방법이 표준 RAG보다 시간과 메모리에서 불리하지만, 그중 성능으로 표준 RAG를 실질적으로 앞선 것은 HippoRAG 2뿐이라고 정리한다.

### associativity의 지속 하락

Figure 3에서 corpus가 커질 때 MuSiQue 성능은 두 방법 모두 비슷한 속도로 내려간다. 저자들은 앞으로의 continual learning 벤치마크가 과제 난이도를 여러 수준으로 갖춰야 한다는 근거로 이 관찰을 든다.

### 향후 과제

graph 기반 retrieval로 장기 대화에서의 episodic memory 능력을 끌어올리는 방향을 제시한다.

## 6. 관련 연구 (Related Work)

- **HippoRAG** (Gutiérrez et al., 2024, NeurIPS). 직접 전신. PPR과 OpenIE KG 조합의 원출처이며 associativity를 다룬 유일한 선행 RAG 프레임워크로 소개된다. 개체 중심 접근 탓에 인덱싱과 추론 양쪽에서 맥락을 잃는 점이 본 논문이 짚은 결함이다.
- **GraphRAG** (Edge et al., 2024). graph community detection으로 문서, 관계를 가진 개체 군집, 또는 그 조합을 요약한다. HippoRAG 2와 달리 KG로 retrieval corpus 자체를 확장한다.
- **LightRAG** (Guo et al., 2024). dual-level retrieval로 저수준과 고수준 지식을 함께 다루고 그래프 구조와 벡터 retrieval을 결합한다. 본 논문의 재현 실험에서는 QA 평균 6.6으로 가장 낮다.
- **RAPTOR** (Sarthi et al., 2024, ICLR). Gaussian Mixture Model로 문서 군집을 잡아 요약 계층을 만든다. LLM 요약이 corpus에 노이즈를 넣어 simple QA와 multi-hop QA에서 하락한다.
- **NV-Embed-v2** (Lee et al., 2025, ICLR). 7B LLM 기반 임베딩 모델이자 본 논문의 주 비교 대상이며 동시에 HippoRAG 2 내부 retriever다.
- **continual learning 계보**. LLM에 새 지식을 넣는 방법을 continual fine-tuning, model editing, RAG 세 가지로 정리한다(Shi et al., 2024). continual fine-tuning은 catastrophic forgetting과 비용이, model editing은 갱신 효과가 지나치게 국소적이라는 점이 걸림돌이다.

## 7. 용어집 (Glossary)

| 용어 | 설명 |
|---|---|
| Personalized PageRank (PPR) | seed node 쪽으로 확률 질량을 몰아주도록 PageRank를 변형한 알고리즘. HippoRAG 계열의 맥락 기반 retrieval 엔진 |
| OpenIE | schema를 미리 정하지 않고 (subject, relation, object) triple을 뽑는 정보 추출 기법 |
| Phrase node | OpenIE triple의 subject나 object에 해당하는 KG 노드. 개념을 sparse하게 표현한다 |
| Passage node | passage 하나를 통째로 나타내는 KG 노드. HippoRAG 2가 새로 넣었고 맥락을 dense하게 표현한다 |
| Context edge | passage node와 그 passage에서 나온 phrase node를 잇는 "contains" edge |
| Synonym edge | 두 phrase node의 벡터 유사도가 0.8 이상일 때 추가되는 edge |
| Reset probability | PPR에서 random walk가 특정 노드로 되돌아갈 확률. seed node 지정 수단이다 |
| Weight factor | passage node의 reset probability에 곱해 phrase node와의 균형을 맞추는 계수. 기본 0.05 |
| Recognition memory | 외부 단서를 놓고 알아보는 인간의 기억 재인을 본뜬 LLM triple 필터링 단계 |
| Dense-Sparse Integration | 뇌의 dense coding(맥락)과 sparse coding(개념)을 KG 안에서 통합하는 설계 원칙 |
| Sense-making | 크고 복잡하거나 불확실한 맥락을 해석하는 능력. NarrativeQA로 측정한다 |
| Associativity | 흩어진 사실 사이에 multi-hop 연결을 만드는 능력. MuSiQue, 2Wiki, HotpotQA, LV-Eval로 측정한다 |

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 2 | "세 가지 메모리 능력 비교 막대그래프" | caption-region | ★ wiki 권장 (result) |
| fig02 | 4 | "HippoRAG 2 전체 구조" | caption-region | ★ wiki 권장 (architecture) |
| fig03 | 8 | "corpus 확장 시 F1 추이" | caption-region | ★ wiki 권장 (result) |
| fig04 | 14 | "triple filter 프롬프트 전문" | caption-region | (선택) 본문 인용으로 대체 |
| fig05 | 15 | "online retrieval 실행 예시" | caption-region | (선택) 본문 표로 대체 |
| tab01 | 6 | "벤치마크 7종 질문 수와 passage 수" | table-region | 본문 표로 이관 |
| tab02 | 7 | "QA F1 전체 비교" | table-region | 본문 표로 이관 |
| tab03 | 7 | "passage recall@5 비교" | table-region | 본문 표로 이관 (크롭 결함) |
| tab04 | 8 | "ablation" | table-region | 본문 표로 이관 (인접 도식 혼입) |
| tab05 | 8 | "weight factor 실험" | table-region | 본문 표로 이관 (tab04와 중복 크롭) |
| tab06 | 9 | "정성 검색 사례" | table-region | 본문 표로 이관 |
| tab07 | 9 | "retriever 교체 실험" | table-region | 본문 표로 이관 (tab06과 중복 크롭) |
| tab08 | 16 | "reader별 EM과 F1" | table-region | 본문 서술로 이관 |
| tab09 | 17 | "recall@2와 recall@5" | table-region | 본문 서술로 이관 |
| tab10 | 18 | "KG 노드와 edge 통계" | table-region | 본문 표로 이관 |
| tab11 | 18 | "오류 사례 2건" | table-region | 본문 표로 이관 |
| tab12 | 19 | "비용과 효율" | table-region | 본문 표로 이관 |
| tab13 | 19 | "HippoRAG 2 하이퍼파라미터" | table-region | 본문 표로 이관 |
| tab14 | 19 | "비교 대상 하이퍼파라미터" | table-region | 본문 표로 이관 |

### 크롭 결함 기록

`figures.json`은 불변이므로 수정하지 않고 관찰만 남긴다.

| id | 결함 |
|---|---|
| tab02 | 캡션 첫 줄 상단이 잘렸다 |
| tab03 | Table 3이 아니라 Table 2 본문이 잡혔다. 같은 페이지의 앞 표에 앵커가 걸렸다 |
| tab04 | 캡션 첫 줄 상단이 잘렸고, 오른쪽 단의 Figure 3 그래프가 함께 담겼다 |
| tab05 | tab04와 bbox가 같아 파일이 동일하다. Table 5가 담기지 않았다 |
| tab07 | tab06과 bbox가 같아 파일이 동일하다. Table 7이 담기지 않았다 |
