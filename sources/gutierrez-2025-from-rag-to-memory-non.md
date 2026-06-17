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

## 한 줄 요약 (One-line Summary)

표준 RAG의 벡터 검색에 knowledge graph와 Personalized PageRank를 더해 사실·sense-making·연상(multi-hop) 세 가지 메모리 과제를 한꺼번에 개선한 HippoRAG 2를 제안한다.

## 1. 자료 정보 (Document Information)

- **저자**: Bernal Jiménez Gutiérrez\*, Yiheng Shu\*, Weijian Qi, Sizhe Zhou, Yu Su (\*equal contribution)
- **소속**: Ohio State University, UIUC
- **발표**: ICML 2025 (arXiv 2502.14802v2, 2025-06-19)
- **코드**: https://github.com/OSU-NLP-Group/HippoRAG

## 2. 주요 기여 (Key Contributions)

1. **HippoRAG 2 프레임워크** — 표준 RAG 대비 factual/sense-making/associativity 세 벤치마크 유형에서 모두 우위를 보인 최초의 structure-augmented RAG
2. **Dense-Sparse Integration** — phrase node(sparse, 개념)에 passage node(dense, 맥락)를 KG에 더해, 개념-맥락 trade-off를 neurobiologically 풀어냈다
3. **Deeper Contextualization** — 기존 HippoRAG의 NER-to-node 대신 query-to-triple 방식으로 쿼리를 KG에 연결, Recall@5 평균 12.5%p 향상
4. **Recognition Memory** — LLM이 top-k triple을 필터링해 노이즈를 제거(recall/recognition 이중 메모리 모방)

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 전체 흐름

**offline indexing**과 **online retrieval** 두 단계로 구성된다.

### Offline Indexing

1. **OpenIE by LLM** — 각 passage에서 (subject, relation, object) triple을 schema-less KG에 추가한다. subject/object를 phrase node, edge를 relation edge라 부른다.
2. **Synonym detection** — embedding 유사도가 임계값(0.8) 이상인 phrase 쌍에 synonym edge를 추가해 다른 passage의 동의어를 연결한다.
3. **Dense-Sparse Integration** — 각 passage를 passage node로 KG에 추가하고, 그 passage에서 파생된 모든 phrase node와 context edge("contains")로 잇는다. 최종 KG는 phrase node와 passage node, relation/synonym/context edge가 섞인 형태다.

### Online Retrieval

1. **Query to Triple** — 전체 쿼리를 embedding으로 KG의 top-k triple과 매칭한다(NER 불필요).
2. **Recognition Memory (triple filtering)** — LLM이 top-k triple 가운데 쿼리와 무관한 것을 걸러 최종 seed triple T′를 산출한다.
3. **Seed node selection** — T′에 속한 phrase node(최대 5개, average ranking score 기준)와 모든 passage node를 seed로 고른다.
4. **PPR graph search** — phrase node는 ranking score를, passage node는 embedding 유사도 × weight factor(기본 0.05)를 reset probability로 써서 PPR을 실행한다.
5. **QA** — PageRank 상위 5개 passage를 LLM에 context로 넣어 답변을 생성한다.

### HippoRAG vs HippoRAG 2 차이점

| 항목 | HippoRAG | HippoRAG 2 |
|---|---|---|
| KG 노드 | phrase node만 | phrase node + **passage node** |
| 쿼리 연결 | NER-to-node | **query-to-triple** |
| triple 필터 | 없음 | **LLM recognition memory** |
| PPR seed | phrase node | phrase node + **all passage nodes** |

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### QA 성능 (F1, Llama-3.3-70B-Instruct reader)

| 방법 | Simple QA avg | Multi-hop avg | NarrativeQA | 전체 avg |
|---|---|---|---|---|
| NV-Embed-v2 (7B) | 58.8 | 50.8 | 25.7 | 57.0 |
| HippoRAG | 55.6 | 44.7 | 16.3 | 53.1 |
| GraphRAG | 47.5 | 44.6 | 23.0 | 49.6 |
| **HippoRAG 2** | **59.7** | **52.5** | **25.9** | **59.8** |

- NV-Embed-v2 대비 **+2.8 avg F1**, 2Wiki +9.5, LV-Eval +3.1
- 선행 structure-augmented 방법들은 세 유형 중 자신이 최적화된 한 유형에서만 강하고 나머지에서 급락하지만, HippoRAG 2는 세 유형 모두에서 성능을 유지하거나 개선한다

### 검색 성능 (Recall@5)

HippoRAG 2: 78.2 avg vs NV-Embed-v2: 73.4 avg (+4.8%p)
MuSiQue +5.0, 2Wiki +13.9가 특히 두드러진다

### Continual Learning 실험

corpus를 4개 세그먼트로 점진적으로 확장해도, simple QA(NQ)와 associative(MuSiQue) 양쪽에서 HippoRAG 2의 NV-Embed-v2 대비 우위가 일관되게 유지된다.

### Ablation 주요 결과

- query-to-triple을 NER-to-node로 교체하면 avg Recall@5 -12.5%p
- passage node를 제거하면 avg -6.1%p
- triple filter를 제거하면 avg -0.7%p (소폭이지만 긍정적)

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **Recognition memory 정밀도**: 26% 샘플에서 필터링 후 supporting passage의 phrase가 매칭되지 않고, 18%는 필터링 후 triple이 0개가 된다
- **Graph search 실패**: 50% 샘플에서 linked phrase node 중 절반 이상이 supporting doc에 있는데도 최종 top-5에 들지 못하는 경우가 발생한다
- **컴퓨팅 비용**: QA GPU memory 9.9GB, 인덱싱 99.5분으로 NV-Embed-v2(12.1분)보다 높다. 다만 LightRAG·GraphRAG보다는 크게 효율적이다
- **향후 연구**: graph-based retrieval로 LLM의 episodic memory(장기 대화) 능력을 끌어올릴 가능성을 제시한다

## 6. 관련 연구 (Related Work)

- **HippoRAG** (Gutiérrez et al., 2024, NeurIPS) — HippoRAG 2의 직접 전신. PPR + OpenIE KG 아이디어의 원출처
- **GraphRAG** (Edge et al., 2024) — community detection + map-reduce 요약. sense-making에 강하지만 simple QA에서 급락
- **LightRAG** (Guo et al., 2024) — dual-level keyword 검색 + KG. 전반적 성능은 낮음(본 논문 재현 실험 기준)
- **RAPTOR** (Sarthi et al., 2024, ICLR) — GMM cluster 요약 트리. sense-making에 특화, simple/multi-hop에서 열세
- **NV-Embed-v2** (Lee et al., 2025, ICLR) — 7B LLM 기반 embedding. 주요 dense baseline

## 7. 용어집 (Glossary)

| 용어 | 설명 |
|---|---|
| PPR (Personalized PageRank) | 특정 seed node에 확률 질량을 편향시키는 PageRank 변형. context-based retrieval에 사용 |
| OpenIE | 스키마 없이 (subject, relation, object) triple을 자동 추출하는 정보 추출 기법 |
| Phrase node | KG의 개념 노드. OpenIE triple의 subject/object |
| Passage node | KG의 맥락 노드 (HippoRAG 2 신규). passage 전체를 노드화하고 phrase node와 context edge로 연결 |
| Context edge | passage node와 그 passage에서 파생된 phrase node를 잇는 "contains" 엣지 |
| Synonym edge | 두 phrase node 간 embedding 유사도 ≥ 0.8일 때 추가되는 엣지 |
| Recognition memory | 인간의 외부 단서 기반 기억 재인을 모방한 LLM triple 필터링 단계 |
| Dense-Sparse Integration | 뇌의 dense coding(맥락)과 sparse coding(개념)을 KG에서 통합하는 설계 원칙 |
| Sense-making | 복잡하고 긴 담화를 이해하는 능력. NarrativeQA로 측정 |
| Associativity | 분산된 사실 간 multi-hop 연결 능력. MuSiQue, 2Wiki, HotpotQA, LV-Eval로 측정 |

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 2 | "3차원 평가 결과: factual/sense-making/associativity 막대그래프" | page-region | ★ wiki 권장 (result) |
| fig02 | 4 | "HippoRAG 2 전체 아키텍처 — offline indexing + online retrieval" | page-region | ★ wiki 권장 (architecture) |
| fig03 | 8 | "Continual learning 실험: corpus 확장 시 F1 추이" | page-region | ★ wiki 권장 (result) |
| fig04 | 14 | "Triple filter LLM 프롬프트 (appendix)" | page-region | (선택) |
| fig05 | 15 | "파이프라인 end-to-end 예시 (appendix)" | page-region | (선택) |
