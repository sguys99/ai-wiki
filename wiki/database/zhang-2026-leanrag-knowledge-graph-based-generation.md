---
title: "LeanRAG — Knowledge-Graph-Based Generation with Semantic Aggregation and Hierarchical Retrieval (AAAI-26)"
type: paper
year: 2026
category: database
raw_path: /Users/kmyu/Desktop/project/ai-wiki/raw/papers/08780-AAAI26.ZhangY-NLP.pdf
raw_filename: "08780-AAAI26.ZhangY-NLP.pdf"
source_collection: external
source: zhang-2026-leanrag-knowledge-graph-based-generation.md
authors: "Yaoze Zhang, Rong Wu, Pinlong Cai, Xiaoman Wang, Guohang Yan, Song Mao, Ding Wang, Botian Shi"
venue: "AAAI-26 (The Fortieth AAAI Conference on Artificial Intelligence)"
url: "https://github.com/KnowledgeXLab/LeanRAG"
tags: [graph-rag, rag, knowledge-graph, leanrag, hierarchical-retrieval, semantic-aggregation, lca, lowest-common-ancestor, gmm-clustering, aaai-2026, paper]
---

## 요약 (Summary)

**LeanRAG**(Zhang et al., AAAI-26, Shanghai AI Lab)는 KG-based RAG의 두 결함을 명시·해결한다.

- **Semantic Islands**: HiRAG·Raptor가 abstract 노드는 만들지만 **노드 간 relation은 안 만들어** cross-community 추론 불가.
- **Structure-Retrieval Mismatch**: 검색이 hierarchical 인덱스를 무시하고 평면 유사도 검색으로 퇴화.

해결책 두 축:
1. **Semantic Aggregation**: GMM으로 entity 클러스터링 → LLM이 abstract entity와 description 생성. 핵심: 같은 레이어 abstract 노드 간 **aggregated relation까지 LLM으로 합성** ($\lambda > \tau$ 시 LLM 호출, 이하 시 단순 concatenation) → fully navigable semantic network 구축.
2. **LCA Bottom-up Retrieval**: 쿼리는 base-layer entity에만 anchor → seed들의 **Lowest Common Ancestor** 경로(shortest-path union)만 추출 → 의미 중복 최소화 서브그래프. 마지막에 base entity 출처 chunk를 supporting evidence로 첨부.

결과 (UltraDomain Mix·CS·Legal·Agriculture, DeepSeek-V3 judge, 1–10 평균):
- LeanRAG Overall = 8.59 / 8.82 / 8.49 / 8.87 — HiRAG·GraphRAG·LightRAG·KAG·FastGraphRAG·NaiveRAG 거의 모든 metric에서 SOTA.
- 검색 토큰 평균 **46% 감소** (Qwen3-14B 측정).
- Abstract relation 제거 시 **Diversity 가장 큰 하락** (Agriculture 63 : 37).
- 원문 제거 시 모든 데이터셋·메트릭 일관 하락 — LightRAG의 -Origin 결과와 정반대.

## 주요 기여 (Key Contributions)

- **두 문제 정식화**: Semantic Islands + Structure-Retrieval Mismatch.
- **Aggregated Relation 생성**: hierarchical 방법론들이 빠뜨린 *abstract 노드 간 relation*을 connectivity strength $\lambda_{j,k}$ 기반으로 LLM 합성 또는 concatenation으로 생성.
- **LCA-based Retrieval**: seed들의 LCA 경로만 사용해 redundancy 최소화. 결과 서브그래프에 inter-cluster relation도 포함.
- **State-of-the-art**: UltraDomain 4 도메인 거의 모든 metric에서 1위, 검색 token 46% 감소.
- **두 ablation의 통찰**:
  - RQ3: abstract relation 효과는 **Diversity**에서 가장 큼 (cross-community 정보 공급).
  - RQ4: graph + 원문 융합이 필수 — LightRAG의 정반대 결과와 대비되는 주요 발견.
- **오픈소스**: https://github.com/KnowledgeXLab/LeanRAG

## 방법론 및 아키텍처 (Methodology and Architecture)

### Hierarchical Knowledge Graph Aggregation

평면 KG $G_0$를 hierarchy $H = \{G_0, G_1, \ldots, G_k\}$로 bottom-up 확장.

1. **Semantic Embedding**: entity description $d_v$ → $\Phi(d_v)$.
2. **GMM Clustering**: $m$개 cluster $C_j$로 분할 (cluster 수는 held-out tuning; 발표 슬라이드에 따르면 BIC).
3. **Aggregated Entity**: $(\alpha_j, d_{\alpha_j}) = F_{\text{entity}}(C_j, R_{C_j})$ — LLM이 cluster의 entity·relation을 보고 abstract entity·description 합성.
4. **Aggregated Relation** (핵심 차별점):
   $$r_{\langle \alpha_j, \alpha_k \rangle} = \begin{cases} F_{(\text{rel})}(\alpha_j, \alpha_k, R_{\langle C_j, C_k \rangle}), & \lambda_{j,k} > \tau \\ \text{Concate}(R_{\langle C_j, C_k \rangle}), & \text{otherwise} \end{cases}$$
   - $\lambda_{j,k}$ = $C_j$↔$C_k$ inter-cluster relation 개수 (connectivity strength).
   - $\tau$는 layer index·density에 따라 동적 조정.
5. 재귀적으로 layer $G_1, G_2, \ldots$ 구축. parent-child link로 hierarchy 형성.

### Structured Retrieval via LCA

1. **Initial Entity Anchoring**: $V_{\text{seed}} = \text{Top-}n_{v \in V_0}(\text{sim}(q, d_v))$ — base layer entity에만 anchor.
2. **LCA Path Traversal**:
   $$P_{\text{lca}}(V_{\text{seed}}, H) = \bigcup_{v \in V_{\text{seed}}} \text{ShortestPath}_H(v, v_{\text{lca}})$$
   - $v_{\text{lca}}$ = seed들의 hierarchy 내 lowest common ancestor.
3. **Retrieved Subgraph**: $G_{\text{ret}} = (V_{\text{ret}}, R_{\text{ret}})$, $R_{\text{ret}} = R_{\text{lca}} \cup R_{\text{inter-cluster}}$.
4. **Supporting Evidence**: base entity의 출처 원문 chunk를 함께 첨부.

### 핵심 직관

- GraphRAG·LightRAG는 abstract 노드와 base 노드를 한꺼번에 매칭해 노이즈가 섞임 → **LeanRAG는 anchor를 base에만 두고 hierarchy를 통해 abstract 정보로 확장**.
- 평면 KG에서 seed 간 모든 경로를 찾으면 노드 수 폭증 → **LCA로 의미적 redundancy 최소화 경로만 추출**.

## 결과 (Results)

### RQ1 — Overall Performance (1–10, DeepSeek-V3 judge)

| Dataset | Metric | **LeanRAG** | HiRAG | GraphRAG | LightRAG | NaiveRAG |
|---|---|---|---|---|---|---|
| Mix | Overall | **8.59** | 8.08 | 7.87 | 7.61 | 7.47 |
| Mix | Diversity | **7.73** | 7.21 | 7.04 | 6.69 | 6.65 |
| CS | Overall | **8.82** | 8.77 | 8.37 | 8.59 | 8.77 |
| Legal | Overall | **8.49** | 8.00 | 8.44 | 7.74 | 8.21 |
| Agriculture | Overall | **8.87** | 8.87 | 8.85 | 8.56 | 8.69 |

- LeanRAG가 거의 모든 metric·dataset에서 1위. Diversity 격차 가장 큼.
- HiRAG가 두 번째로 강력 — hierarchical 접근의 우위 확인.

### RQ2 — Retrieval Redundancy

- LeanRAG retrieved context token = 평균 **46% 감소** (vs GraphRAG·LightRAG·HiRAG, Qwen3-14B 측정).
- 발표자 관찰: **LightRAG context가 GraphRAG보다 길게 나옴** (원문 chunk 첨부 영향).

### RQ3 — Cluster Relation Effectiveness (LeanRAG vs w/o Relation, win rate)

| Metric | Mix | CS | Legal | Agriculture |
|---|---|---|---|---|
| Comprehensiveness | 51.5 : 48.6 | 54.5 : 45.5 | 55.5 : 44.5 | 54.0 : 46.0 |
| Empowerment | 55.0 : 45.0 | 55.5 : 44.5 | 56.5 : 43.5 | 59.5 : 40.5 |
| **Diversity** | **59.6 : 40.4** | **66.0 : 34.0** | 57.0 : 43.0 | **63.0 : 37.0** |
| Overall | 53.8 : 46.2 | 58.5 : 41.5 | 56.5 : 43.5 | 58.0 : 42.0 |

- Abstract relation 제거 시 **Diversity 하락 폭이 가장 큼** — abstract relation이 cross-community 정보를 전달하는 핵심 컴포넌트.

### RQ4 — Necessity of Textual Context (Full vs w/o Context, Overall)

| Dataset | Full | w/o Context |
|---|---|---|
| Mix | 8.59 | **7.93** ↓ |
| CS | 8.82 | 8.34 ↓ |
| Legal | 8.49 | 8.00 ↓ |
| Agriculture | 8.87 | 8.53 ↓ |

- 모든 도메인에서 원문 chunk 필요 — Comprehensiveness·Empowerment 하락 폭이 가장 큼.
- 저자 결론: **graph = semantic index/navigation, 원문 = generation을 위한 rich content** — 두 정보의 협업이 SOTA의 핵심.
- **LightRAG (-Origin)와 정반대 결과**. retrieval 정밀도에 따라 원문이 noise(LightRAG)냐 evidence(LeanRAG)냐가 갈리는 것으로 해석 가능.

### 사용 모델

- Generator·judge: **DeepSeek-V3**.
- RQ2 redundancy 평가: **Qwen3-14B** 재현.
- Embedding: **BGE-M3**.

## 한계 (Limitations)

발표자 김도윤(DSBA) 비판 + 본문 한계:

- **LCA case study 부재**: 실제 LCA가 root까지 올라가는 빈도/깊이 분포 미공개. 자주 root까지 올라간다면 LCA 효과가 약해질 수 있음.
- **효율성·추론 시간 측정 부재**: LCA 탐색이 retrieval latency를 잡아먹을 가능성 있으나 본문 측정 없음.
- **GMM 클러스터 수**: 본문은 held-out validation으로 튜닝만 명시. BIC 사용은 발표 슬라이드 출처.
- **임계값 $\tau$**: 동적 조정 hyperparameter라고만 서술, 구체적 결정 가이드 부재.
- **고정 KG · non-KG 그래프**: 외부 고정 KG와 일반 그래프에서의 효과 미검증.
- **평가 방식**: 1–10 평균이라 페어와이즈가 더 직관적이었을 가능성 (RQ3·RQ4에서는 페어와이즈 사용).

## 관련 페이지 (Related Pages)

- [[overviews/lightrag-family-graph-rag-overview|Graph-based RAG — LightRAG 계열 overview]] — 본 논문은 LightRAG 계열의 abstraction 축(외부 그룹) 확장에 해당. RAG-Anything(modality 축)과 다른 평가 셋업의 비대칭 비교, -Origin/-Context 모순의 해석 가설(retrieval 정밀도에 따라 원문이 noise냐 evidence냐가 갈린다)은 overview에서 정리.
- [[database/guo-2025-lightrag-simple-and-fast|LightRAG (EMNLP 2025)]] — 본 논문의 주요 baseline. 평면 KG + dual-level keyword retrieval. LeanRAG의 hierarchical 접근과 method axis가 정확히 대비됨. 원문 ablation에서 정반대 결과.
- [[database/dsba-2026-paper-review-graph-based-rag|Graph-based RAG (DSBA 세미나)]] — 본 논문과 LightRAG를 함께 비교한 김도윤 박사과정 발표. LCA case study 부재, 효율성 평가 부재 등의 비판 1차 출처.
