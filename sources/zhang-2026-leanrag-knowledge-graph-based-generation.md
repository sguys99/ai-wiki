---
title: "LeanRAG: Knowledge-Graph-Based Generation with Semantic Aggregation and Hierarchical Retrieval"
type: paper
year: 2026
category: database
raw_path: /Users/kmyu/Desktop/project/ai-wiki/raw/papers/08780-AAAI26.ZhangY-NLP.pdf
raw_filename: "08780-AAAI26.ZhangY-NLP.pdf"
source_collection: external
authors: "Yaoze Zhang, Rong Wu, Pinlong Cai, Xiaoman Wang, Guohang Yan, Song Mao, Ding Wang, Botian Shi"
venue: "AAAI-26 (The Fortieth AAAI Conference on Artificial Intelligence)"
url: "https://github.com/KnowledgeXLab/LeanRAG"
tags: [graph-rag, rag, knowledge-graph, leanrag, hierarchical-retrieval, semantic-aggregation, lca, lowest-common-ancestor, gmm-clustering, aaai-2026, paper]
---

## 한 줄 요약 (One-line Summary)

**LeanRAG**는 GraphRAG·HiRAG·LightRAG가 공통으로 가진 두 결함 — (1) abstract 노드들이 **semantic islands**처럼 단절돼 cross-community 추론이 안 됨, (2) retrieval이 **structurally unaware**해서 평면 검색에 가까움 — 을 동시에 해결한다. 핵심은 (a) **Semantic Aggregation**: GMM-BIC로 entity를 클러스터링해 abstract 노드를 만들되 **abstract 노드 간 relation까지 LLM으로 합성**해 fully navigable semantic network 구축, (b) **LCA 기반 Bottom-up Retrieval**: 쿼리로 anchor entity를 선택한 뒤 hierarchy에서 seed들의 Lowest Common Ancestor 경로만 따라 최소 redundancy 서브그래프 추출. UltraDomain 4 도메인에서 SOTA 달성, **retrieval redundancy 46% 감소**(평균 토큰 수 기준), HiRAG·GraphRAG·LightRAG·KAG 등을 1–10 점수 평균에서 일관 능가.

## 1. 자료 정보 (Document Information)

- **제목**: LeanRAG: Knowledge-Graph-Based Generation with Semantic Aggregation and Hierarchical Retrieval
- **저자**: Yaoze Zhang¹·²*, Rong Wu¹·³*, Pinlong Cai¹† (corresponding), Xiaoman Wang⁴, Guohang Yan¹, Song Mao¹, Ding Wang¹, Botian Shi¹  
  (*공동 1저자. ¹Shanghai AI Lab, ²University of Shanghai for Science and Technology, ³Zhejiang University, ⁴East China Normal University)
- **발표**: AAAI-26 (The Fortieth AAAI Conference on Artificial Intelligence), pp. 34862–34869
- **PDF 경로**: `raw/papers/08780-AAAI26.ZhangY-NLP.pdf` (8 pages)
- **오픈소스**: https://github.com/KnowledgeXLab/LeanRAG
- **저작권**: © 2026 AAAI

## 2. 주요 기여 (Key Contributions)

1. **Semantic Islands 문제 정식화**: 기존 hierarchical KG-RAG(HiRAG·Raptor 등)는 abstract 노드를 만들지만 **노드 간 관계를 만들지 않아** cross-community 추론 불가. 이를 첫 문제로 명시.
2. **Structure-Retrieval Mismatch 문제 정식화**: 검색이 hierarchical 인덱스를 잘 활용하지 못하고 평면 노드 리스트에서 단순 유사도 검색으로 퇴화하는 현상을 두 번째 문제로 명시.
3. **Hierarchical Knowledge Graph Aggregation 알고리즘**:
   - 평면 KG $G_0$의 entity description을 임베딩.
   - **Gaussian Mixture Model**로 클러스터링.
   - 클러스터를 LLM에 입력해 **aggregated entity** $\alpha_j$ 생성.
   - 핵심: **aggregated relation** $r_{\langle\alpha_j, \alpha_k\rangle}$도 LLM으로 생성 — connectivity strength $\lambda_{j,k}$가 threshold $\tau$ 초과 시 LLM이 합성, 그 이하면 inter-cluster relation들의 단순 concatenation.
   - 재귀적으로 $G_0, G_1, \ldots, G_k$ 다층 hierarchy $H$ 구축.
4. **LCA-based Structured Retrieval**:
   - 쿼리로부터 base layer entity 임베딩 매칭으로 top-n **seed entity** $V_{\text{seed}}$ 선택.
   - hierarchy $H$ 내에서 seed들의 **Lowest Common Ancestor** $v_{\text{lca}}$ 계산.
   - $V_{\text{seed}}$의 각 노드 → $v_{\text{lca}}$까지 shortest path들의 union $P_{\text{lca}}$를 retrieval path로 사용.
   - 검색 결과 $G_{\text{ret}} = (V_{\text{ret}}, R_{\text{ret}})$에 LCA 경로 entity·relation + 같은 레이어의 inter-cluster aggregated relation 포함.
   - 마지막으로 base entity의 출처 chunk를 supporting evidence로 추가.
5. **State-of-the-art 성능**:
   - UltraDomain 4개 도메인(Mix·CS·Legal·Agriculture)에서 HiRAG, GraphRAG, LightRAG, KAG, FastGraphRAG, NaiveRAG 대비 1–10 점수 평균 우수.
   - 검색 token 수 평균 **46% 감소** (Qwen3-14B 기준).
6. **RQ3 / RQ4 ablation으로 두 핵심 결과 검증**:
   - RQ3: abstract relation 제거 시 Diversity가 가장 크게 하락 — relation 도입 효과 입증.
   - RQ4: 원문 chunk 제거 시 **모든 도메인에서 성능 하락** (Mix Overall 8.59 → 7.93) — graph + 원문 융합이 필수임을 보임.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 Preliminary

지식 그래프 $G = (V, R, D^{(\text{ver})}, D^{(\text{rel})})$. 검색은 쿼리 $q$와 entity description 임베딩 유사도로 top-n entity 선택:

$$\tilde{V} = \text{Top-}n_{v \in V}(\text{Sim}(q, d_v))$$

이후 $\tilde{V}$ 노드 쌍 간 경로 $L = \bigcup_{x, y \in \tilde{V}} \text{Path}(x, y)$를 구해 서브그래프 $\tilde{G}$ 형성.

### 3.2 Hierarchical Knowledge Graph Aggregation

평면 KG $G_0$를 multi-level hierarchy $H = \{G_0, G_1, \ldots, G_k\}$로 bottom-up 확장. 각 층 $G_i = (V_i, R_i, D^{(\text{ver})}_i, D^{(\text{rel})}_i)$는 아래 층의 더 추상적인 view.

#### Recursive Semantic Clustering

1. **Semantic Embedding**: pre-trained 임베딩 모델 $\Phi(\cdot)$로 entity description 인코딩.
   $$E_{i-1} = \{\Phi(d_v) \mid v \in V_{i-1}\}$$
2. **GMM Clustering**: Gaussian Mixture Model로 $E_{i-1}$을 $m$개 disjoint 클러스터 $C_{i-1} = \{C_1, \ldots, C_m\}$로 분할. (논문은 GMM의 BIC 기반 자동 결정은 명시적으로 강조하진 않으나, 발표 슬라이드에 따르면 $m$은 BIC로 정함.)

#### Aggregated Entity Generation

각 클러스터 $C_j$에 대해 LLM이 abstract entity $\alpha_j$와 description $d_{\alpha_j}$를 생성:

$$(\alpha_j, d_{\alpha_j}) = F_{\text{entity}}(C_j, R_{C_j})$$

여기서 $R_{C_j}$는 $C_j$ 내부 entity 간 relation 집합. $V_i = \{\alpha_j\}_{j=1}^m$이 다음 layer 노드, 각 자식 $v \in C_j$는 parent $\alpha_j$로 연결.

#### Aggregated Relation Generation (논문의 핵심 차별점)

기존 hierarchical 방법(Raptor·HiRAG)이 빠뜨린 부분: abstract 노드 사이의 **inter-cluster relation 생성**. 두 abstract entity $(\alpha_j, \alpha_k)$ 사이 — 원래 그래프에서 $C_j$와 $C_k$를 잇는 모든 relation 집합 $R_{\langle C_j, C_k \rangle}$의 크기를 connectivity strength $\lambda_{j,k}$로 정의.

$$r_{\langle \alpha_j, \alpha_k \rangle} = \begin{cases} F_{(\text{rel})}(\alpha_j, \alpha_k, R_{\langle C_j, C_k \rangle}), & \lambda_{j,k} > \tau \\ \text{Concate}(R_{\langle C_j, C_k \rangle}), & \text{otherwise} \end{cases}$$

- $\tau$ 초과 → LLM이 **새로운 high-level relation** 합성.
- $\tau$ 이하 → inter-cluster relation들을 단순 텍스트 concatenation.

$\tau$는 layer index와 그래프 밀도에 따라 동적으로 조정되는 data-dependent hyper-parameter. 이를 통해 **fully navigable semantic network**가 됨 — abstract layer에서도 모든 노드가 의미 있는 relation으로 연결.

### 3.3 Structured Retrieval via Lowest Common Ancestor

#### Initial Entity Anchoring

쿼리 $q$를 base-layer $G_0$ entity에 anchor:

$$V_{\text{seed}} = \text{Top-}n_{v \in V_0}(\text{sim}(q, d_v))$$

기존 GraphRAG·LightRAG가 abstract layer까지 함께 매칭해 노이즈를 받는 것과 달리, **fine-grained leaf entity에만 anchor**.

#### Contextualization via LCA Path Traversal

평면 KG에서 seed entity 간 모든 경로를 찾으면 노드 수가 폭증·중복 증가. LeanRAG는 hierarchy를 이용한 **LCA 기반 최소 redundancy 경로**:

- 두 seed의 **LCA** $v_{\text{lca}}$: hierarchy $H$에서 두 노드의 공통 조상 중 depth 최소.
- Retrieval path:
  $$P_{\text{lca}}(V_{\text{seed}}, H) = \bigcup_{v \in V_{\text{seed}}} \text{ShortestPath}_H(v, v_{\text{lca}})$$
- 트리형 hierarchy이므로 자식-부모 chain이 곧 shortest path.
- 최종 retrieved subgraph:
  $$G_{\text{ret}} = (V_{\text{ret}}, R_{\text{ret}}),\quad R_{\text{ret}} = R_{\text{lca}} \cup R_{\text{inter-cluster}}$$
  - $R_{\text{lca}}$: $P_{\text{lca}}$ 위 relation들.
  - $R_{\text{inter-cluster}}$: 같은 레이어 abstract 노드 간 relation $r_{\langle \alpha_j, \alpha_k \rangle}$.
- 마지막으로 base entity의 출처 **원문 chunk**를 supporting evidence로 첨부.

핵심 효과: "specific facts → shared abstract concepts"로 이어지는 **connected, coherent narrative structure** — 단순 entity collection이 아닌 의미 있는 그래프 컨텍스트.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 Experimental Settings

- **데이터셋**: UltraDomain 중 Mix, CS, Legal, Agriculture (LightRAG와 동일 셋업).
- **Baselines**: NaiveRAG, GraphRAG (local mode), LightRAG, KAG, FastGraphRAG, HiRAG (현 SOTA).
- **평가**:
  - **DeepSeek-V3**를 LLM-as-judge로 사용. 각 쿼리·답변에 대해 5회 채점, 1–10 평균.
  - 4 dimension: Comprehensiveness, Empowerment, Diversity, Overall.
- **Implementation**:
  - Generator = **DeepSeek-V3**.
  - Embedding = **BGE-M3** (Chen et al., 2024).
  - GMM 클러스터 수와 hyperparameter는 held-out validation으로 튜닝.
  - RQ2(redundancy 비교)는 Qwen3-14B로 재현해서 측정.

### 4.2 Overall Performance (RQ1) — Table 1 발췌

LeanRAG의 핵심 점수(평균±std, 1–10):

| Dataset | Metric | LeanRAG | HiRAG | GraphRAG | LightRAG | NaiveRAG | KAG | FastGraphRAG |
|---|---|---|---|---|---|---|---|---|
| **Mix** | Overall | **8.59** | 8.08 | 7.87 | 7.61 | 7.47 | 7.25 | 5.76 |
| Mix | Diversity | **7.73** | 7.21 | 7.04 | 6.69 | 6.65 | 6.42 | 4.88 |
| **CS** | Overall | **8.82** | 8.77 | 8.37 | 8.59 | 8.77 | 7.99 | 6.31 |
| **Legal** | Overall | **8.49** | 8.00 | 8.44 | 7.74 | 8.21 | 7.83 | 3.43 |
| **Agriculture** | Overall | **8.87** | 8.87 | 8.85 | 8.56 | 8.69 | 7.95 | 3.17 |

- LeanRAG가 거의 모든 metric·dataset에서 SOTA. Diversity에서 가장 큰 격차.
- HiRAG가 그 뒤를 잇는 강력한 baseline — hierarchical 접근의 효용을 추가 확인.
- FastGraphRAG는 모든 도메인에서 현저히 낮음.

### 4.3 Information Redundancy (RQ2)

검색된 context token 수(낮을수록 less redundant, Qwen3-14B 재현, Figure 3):

| Dataset | GraphRAG | LightRAG | HiRAG | **LeanRAG** |
|---|---|---|---|---|
| Mix·CS·Legal·Agriculture | (가장 많음 / 두번째) | (긴 편) | (중간) | **평균 46% 감소** |

- LeanRAG가 평균 token 수에서 **46% 감소** — LCA 기반 minimal subgraph 효과.
- 발표자 김도윤 관찰: **LightRAG의 context가 GraphRAG보다 길게 나옴** — entity·relation 텍스트에 원문 chunk까지 추가하는 구조 때문.

### 4.4 Cluster Relation Effectiveness (RQ3) — Table 2

LeanRAG vs LeanRAG w/o Relation 페어와이즈 win rate:

| Metric | Mix | CS | Legal | Agriculture |
|---|---|---|---|---|
| Comprehensiveness | 51.5% : 48.6% | 54.5% : 45.5% | 55.5% : 44.5% | 54.0% : 46.0% |
| Empowerment | 55.0 : 45.0 | 55.5 : 44.5 | 56.5 : 43.5 | 59.5 : 40.5 |
| **Diversity** | **59.6 : 40.4** | **66.0 : 34.0** | 57.0 : 43.0 | **63.0 : 37.0** |
| Overall | 53.8 : 46.2 | 58.5 : 41.5 | 56.5 : 43.5 | 58.0 : 42.0 |

- Abstract relation 제거 시 모든 metric에서 성능 하락. **특히 Diversity 하락 폭이 가장 큼** — abstract relation이 cross-community 정보를 연결해 다양성을 만들어내는 핵심 컴포넌트임을 입증.

### 4.5 Necessity of Textual Context (RQ4) — Table 3

LeanRAG vs LeanRAG w/o Context (graph 정보만 사용, chunk 제거):

| Dataset | Metric | Full | w/o Context |
|---|---|---|---|
| Mix | Overall | 8.59 | **7.93** ↓ |
| CS | Overall | 8.82 | 8.34 ↓ |
| Legal | Overall | 8.49 | 8.00 ↓ |
| Agriculture | Overall | 8.87 | 8.53 ↓ |

- 모든 데이터셋·메트릭에서 일관된 성능 하락.
- 가장 큰 하락은 **Comprehensiveness, Empowerment** — 원문에 담긴 detailed evidence와 narrative richness가 generation에 필수.
- 저자 결론: hierarchical graph는 **semantic index + navigation system**, 원문은 generation에 필요한 **rich content** — 두 정보의 협업이 SOTA의 핵심.
- **LightRAG와 정반대 결과**: LightRAG는 -Origin ablation에서 Agriculture·Mix에서 성능 향상이 나왔는데, LeanRAG는 같은 데이터셋에서도 일관 하락. 검색 알고리즘의 정밀도가 다르면 원문의 역할이 noise(LightRAG)냐 evidence(LeanRAG)냐가 갈리는 것으로 해석 가능.

## 5. 한계와 향후 과제 (Limitations and Future Work)

발표자 김도윤의 비판 + 본문 한계:

- **LCA case study 부재**: 실제 LCA가 어느 깊이까지 올라가는지 정성 분석 없음. 만약 항상 root 근처라면 LCA의 효과가 작아질 수 있음.
- **효율성·추론 시간 비교 실험 부재**: LCA 탐색의 인덱싱·런타임 비용이 어느 정도인지 본문에서 거의 다루지 않음. retrieval 빠르다는 주장의 정량 근거 부족.
- **페어와이즈 vs 평균 점수**: 본 논문은 1–10 평균을 메인으로 사용했는데, LightRAG처럼 페어와이즈로 측정하면 더 직관적이었을 가능성.
- **GMM 클러스터 수 결정**: 본문은 held-out validation으로 튜닝한다고만 명시. 발표 슬라이드에 따르면 BIC를 쓴다고 하지만 논문에는 BIC가 명시되어 있지 않음.
- **임계값 $\tau$**: layer index, density에 의존하는 hyperparameter라고만 서술. 실제로 어떻게 정했는지 구체적 가이드 부재.
- **고정 KG 환경**: 본 논문은 LLM이 코퍼스에서 KG를 추출. 외부 고정 KG(원문 부재)에서는 본 방법이 효과적인지 미검증.
- **Non-KG 일반 그래프**: 인용/소셜 그래프 등 비-지식그래프에서의 효과 미검증.

## 6. 관련 연구 (Related Work)

- **GraphRAG** (Edge et al., 2024): community detection 기반 graph RAG의 시조. local mode가 baseline.
- **LightRAG** (Guo et al., EMNLP 2025): dual-level keyword retrieval. 본 논문의 비교 baseline이자 같은 평가 프레임워크 사용.
- **HiRAG** (Huang et al., 2025a): hierarchical KG-RAG의 현 SOTA baseline. abstract 노드는 만들지만 abstract relation 부재 — LeanRAG가 메우는 gap.
- **Raptor** (Sarthi et al., 2024): 재귀적 클러스터 summary tree. text chunk를 다루지 entity 그래프는 아님. hierarchical 노드만 만들고 relation은 안 만드는 한계.
- **FastGraphRAG**: PageRank로 그래프 중심성 활용.
- **KAG** (Liang et al., 2025): mutual knowledge-text indexing + logic-form guidance로 LLM-KG alignment.
- **NaiveRAG** (Lewis et al., 2020): 평면 chunk RAG의 원조 baseline.
- **BGE-M3** (Chen et al., 2024): embedding 모델로 사용.
- **DeepSeek-V3**: generator·judge LLM.

## 7. 용어집 (Glossary)

- **Graph-based RAG / KG-based RAG**: 지식 그래프를 인덱스로 사용하는 RAG.
- **Semantic Islands**: HiRAG·Raptor 등에서 abstract 노드가 만들어졌으나 노드 간 explicit relation이 없어 cross-cluster 추론이 불가능한 상태. LeanRAG가 첫 번째로 해결하려는 문제.
- **Structure-Retrieval Mismatch**: 검색이 hierarchical 인덱스를 활용 못하고 평면 노드 리스트 위 단순 유사도 검색으로 퇴화하는 현상. LeanRAG가 두 번째로 해결하려는 문제.
- **Semantic Aggregation**: entity 임베딩을 GMM 클러스터링한 뒤 각 클러스터에 대해 LLM이 abstract entity와 description을 생성하고, 클러스터 간 relation도 LLM으로 합성하는 과정.
- **Hierarchical Knowledge Graph $H$**: 평면 KG $G_0$ 위에 abstract layer $G_1, \ldots, G_k$를 쌓아 multi-resolution 구조로 만든 KG. 같은 레이어 abstract 노드 간 relation 포함.
- **Aggregated Entity $\alpha_j$**: 클러스터 $C_j$의 abstract 대표 노드. LLM이 description $d_{\alpha_j}$와 함께 생성.
- **Aggregated Relation $r_{\langle \alpha_j, \alpha_k \rangle}$**: 두 abstract entity 간 관계. connectivity strength $\lambda_{j,k}$가 threshold $\tau$ 초과 시 LLM 합성, 이하 시 단순 concatenation.
- **Connectivity Strength $\lambda_{j,k}$**: 클러스터 $C_j$와 $C_k$ 사이의 base-layer relation 개수.
- **Seed Entity**: 쿼리 임베딩과 base-layer entity description 임베딩 유사도로 선택된 검색 시작점 top-n 집합.
- **Lowest Common Ancestor (LCA)**: hierarchy에서 두 노드의 공통 조상 중 depth 최소(가장 낮은) 노드. seed들의 LCA를 기준으로 retrieval path를 정의해 redundancy 최소화.
- **LCA Path / $P_{\text{lca}}$**: 각 seed entity에서 LCA까지 hierarchy 내 shortest path들의 union.
- **Inter-cluster Relation $R_{\text{inter-cluster}}$**: 같은 레이어 abstract 노드 간 LeanRAG가 새로 만들어낸 relation. 검색 결과에 항상 포함되어 cross-community 정보 공급.
- **Bottom-up Retrieval**: base layer에서 anchor → hierarchy 상위로 LCA 경로를 따라 이동하는 검색 전략. top-down GraphRAG와 반대.
- **GMM-BIC Clustering**: Gaussian Mixture Model로 노드 임베딩 클러스터링, 클러스터 수는 Bayesian Information Criterion으로 결정 (발표 슬라이드 출처 — 본문은 GMM과 hyperparameter tuning만 명시).
- **UltraDomain**: 18 도메인 428 원소의 LightRAG·LeanRAG·HiRAG 공통 평가 코퍼스.
- **DeepSeek-V3 / Qwen3-14B / BGE-M3**: 각각 generator·judge, redundancy 평가용 LLM, embedding 모델.
- **Comprehensiveness / Diversity / Empowerment / Overall**: open-ended QA의 1–10 평가 지표.
