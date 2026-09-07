---
title: "LeanRAG: Knowledge-Graph-Based Generation with Semantic Aggregation and Hierarchical Retrieval"
type: paper
year: 2026
category: database
raw_path: raw/papers/zhang-2026-leanrag-knowledge-graph-based-generation.pdf
raw_filename: "zhang-2026-leanrag-knowledge-graph-based-generation.pdf"
source_collection: external
authors: "Yaoze Zhang, Rong Wu, Pinlong Cai, Xiaoman Wang, Guohang Yan, Song Mao, Ding Wang, Botian Shi"
venue: "AAAI-26 (The Fortieth AAAI Conference on Artificial Intelligence)"
tags: [graph-rag, rag, knowledge-graph, leanrag, hierarchical-retrieval, semantic-aggregation, lca, lowest-common-ancestor, gmm-clustering, aaai-2026, paper]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/zhang-2026-leanrag-knowledge-graph-based-generation/fig01.png
    raw: raw/papers/zhang-2026-leanrag-knowledge-graph-based-generation-figures/fig01.png
    caption: "Naive LLM, Naive RAG, 그래프 기반 RAG, LeanRAG의 파이프라인 비교와 탐색 복잡도 표기"
    page: 2
    bbox_norm: [0.0784, 0.0606, 0.9216, 0.4475]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/zhang-2026-leanrag-knowledge-graph-based-generation/fig02.png
    raw: raw/papers/zhang-2026-leanrag-knowledge-graph-based-generation-figures/fig02.png
    caption: "LeanRAG 전체 구조. KG 구축, 계층 aggregation, LCA 기반 추론의 세 단계"
    page: 4
    bbox_norm: [0.0805, 0.0621, 0.92, 0.3108]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/zhang-2026-leanrag-knowledge-graph-based-generation/fig03.png
    raw: raw/papers/zhang-2026-leanrag-knowledge-graph-based-generation-figures/fig03.png
    caption: "네 데이터셋의 retrieval 토큰 소비량 막대 그래프. GraphRAG, LightRAG, HiRAG, LeanRAG 비교"
    page: 6
    bbox_norm: [0.5423, 0.0763, 0.8948, 0.298]
    strategy: caption-region
    curated: true
  - id: tab01
    label: Table 1
    kind: table
    file: assets/zhang-2026-leanrag-knowledge-graph-based-generation/tab01.png
    raw: raw/papers/zhang-2026-leanrag-knowledge-graph-based-generation-figures/tab01.png
    caption: "일곱 개 방법의 1에서 10 척도 평가 점수표. 본문 마크다운 표로 전량 옮겼다"
    page: 7
    bbox_norm: [0.0815, 0.0611, 0.9185, 0.3221]
    strategy: table-region
    curated: false
  - id: tab02
    label: Table 2
    kind: table
    file: assets/zhang-2026-leanrag-knowledge-graph-based-generation/tab02.png
    raw: raw/papers/zhang-2026-leanrag-knowledge-graph-based-generation-figures/tab02.png
    caption: "잘못 잡힌 크롭. Table 2의 win rate 표가 아니라 왼쪽 단 본문과 Table 3이 담겨 있다"
    page: 7
    bbox_norm: [0.0784, 0.4779, 0.9192, 0.7389]
    strategy: table-region
    curated: false
  - id: tab03
    label: Table 3
    kind: table
    file: assets/zhang-2026-leanrag-knowledge-graph-based-generation/tab03.png
    raw: raw/papers/zhang-2026-leanrag-knowledge-graph-based-generation-figures/tab03.png
    caption: "원문 chunk 제거 ablation 결과표. 본문 마크다운 표로 전량 옮겼다"
    page: 7
    bbox_norm: [0.5146, 0.4779, 0.9192, 0.7389]
    strategy: table-region
    curated: false
---

## 한 줄 요약 (One-line Summary)

LeanRAG는 지식 그래프 기반 RAG가 계층 구조로 진화하면서 남긴 두 결함, 곧 상위 요약 노드가 서로 연결되지 않아 생기는 semantic island와 retrieval이 구조를 활용하지 못하고 평면 탐색으로 퇴화하는 structure-retrieval mismatch를 함께 겨냥한다. 해결 수단은 두 가지다. 하나는 semantic aggregation으로, entity 임베딩을 Gaussian Mixture Model로 묶은 뒤 LLM이 상위 entity와 상위 entity 사이의 relation까지 만들어 모든 층이 이어진 semantic network를 구성한다. 다른 하나는 LCA 기반 bottom-up retrieval로, 쿼리를 base layer의 세밀한 entity에만 anchor한 뒤 seed들의 lowest common ancestor까지의 경로만 모아 최소 서브그래프를 만든다. UltraDomain의 Mix, CS, Legal, Agriculture 네 데이터셋에서 대부분의 지표가 1위이고 retrieval 토큰은 baseline 평균 대비 46% 줄었다.

## 1. 자료 정보 (Document Information)

- **제목**: LeanRAG: Knowledge-Graph-Based Generation with Semantic Aggregation and Hierarchical Retrieval
- **저자**: Yaoze Zhang(1,2), Rong Wu(1,3), Pinlong Cai(1, 교신저자), Xiaoman Wang(4), Guohang Yan(1), Song Mao(1), Ding Wang(1), Botian Shi(1). Zhang과 Wu는 공동 1저자다.
- **소속**: (1) Shanghai Artificial Intelligence Laboratory, (2) University of Shanghai for Science and Technology, (3) Zhejiang University, (4) East China Normal University
- **발표**: The Fortieth AAAI Conference on Artificial Intelligence (AAAI-26), 논문 페이지 번호 34862에서 34869까지 8쪽
- **저작권**: Copyright 2026, Association for the Advancement of Artificial Intelligence
- **연구비**: Shanghai Artificial Intelligence Laboratory, 중국 National Key R&D Program (과제번호 2022ZD0160201), Science and Technology Commission of Shanghai Municipality (과제번호 22DZ1100102)
- **PDF 경로**: `raw/papers/zhang-2026-leanrag-knowledge-graph-based-generation.pdf`
- **코드 공개**: 논문 본문과 PDF 링크 주석 어디에도 저장소 URL이나 코드 공개 문구가 없다. 이전 판 frontmatter가 적고 있던 GitHub 주소는 이 raw에 근거가 없어 삭제했다.

## 2. 주요 기여 (Key Contributions)

논문이 Introduction 말미에 스스로 정리한 기여는 세 항목이다.

1. **지식 압축을 위한 semantic aggregation 알고리즘**. 요약 수준 개념 노드 사이에 새 relational edge를 만들어 다중 해상도 지식 지도를 구성한다. 세밀한 사실과 상위 주제 연결을 한 구조 안에 함께 보존하는 것이 목표다.
2. **정보 중복을 줄이는 bottom-up entity retrieval 전략**. 관련도가 높은 anchor 노드에서 출발해 의미 있는 경로를 따라서만 context를 넓혀, 정밀하고 압축된 evidence 서브그래프를 만든다.
3. **여러 QA 과제에서의 state-of-the-art 달성**. 응답 품질과 효율 양쪽에서 기존 방법을 앞선다고 주장한다.

여기에 본문이 별도 항목으로 세운 문제 정식화 두 가지를 더할 수 있다.

- **Semantic islands**: HiRAG나 RAPTOR처럼 계층 요약을 만드는 방법에서 상위 요약 노드들이 서로를 가리키는 explicit relation을 갖지 않아, 서로 다른 개념 community를 넘나드는 추론이 어렵다.
- **Structurally unaware retrieval**: retrieval이 인덱싱과 분리되어 평면화된 노드 목록 위 단순 의미 탐색으로 퇴화하고, 그래프에 담긴 위상 정보를 쓰지 못한다. 구조 정보는 retrieval 이후 확장에만 쓰이고 정작 무엇을 찾을지 고르는 단계에는 개입하지 못한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 Preliminary

지식 그래프를 $G = (V, R, D^{(\text{ver})}, D^{(\text{rel})})$로 둔다. $V$는 entity 집합, $R$은 relation 집합, $D^{(\text{ver})}$와 $D^{(\text{rel})}$은 각각 entity 설명문과 relation 설명문의 모음이다. KG 기반 RAG의 목표는 쿼리와 관련된 서브그래프를 만들어 LLM이 좋은 답을 내게 하는 것이다.

쿼리 $q$가 주어지면 탐색은 다음과 같이 정의된다.

$$\tilde{V} = \text{Top-}n_{v \in V}(\text{Sim}(q, d_v))$$

$\text{Sim}$은 임베딩 유사도 함수이고 $n$은 뽑을 entity 개수다. 이어서 $\tilde{V}$의 노드 쌍 사이 경로를 모두 모아 relation 경로 $L$을 만든다.

$$L = \bigcup_{x, y \in \tilde{V}} \text{Path}(x, y) = (r_1, r_2, \ldots)$$

$\tilde{V}$와 $L$로 서브그래프 $\tilde{G}$를 구성해 RAG의 context로 쓴다. LeanRAG는 이 기본 절차의 두 부분, 곧 그래프 $G$의 구조적 품질과 탐색 전략의 정밀도를 함께 바꾼다.

### 3.2 Hierarchical Knowledge Graph Aggregation

평면 지식 그래프 $G_0$를 다층 hierarchy $H = \{G_0, G_1, \ldots, G_k\}$로 bottom-up 확장한다. 각 층 $G_i = (V_i, R_i, D^{(\text{ver})}_i, D^{(\text{rel})}_i)$는 아래 층 $G_{i-1}$의 더 추상적인 view다.

#### Recursive Semantic Clustering

RAPTOR(Sarthi et al. 2024)의 텍스트 표현 클러스터링을 따라 두 단계로 진행한다.

1. **Semantic Embedding**: 각 entity의 설명문 $d_v$를 pre-training된 임베딩 모델 $\Phi(\cdot)$로 인코딩한다.
   $$E_{i-1} = \{\Phi(d_v) \mid v \in V_{i-1}\}$$
2. **Gaussian Mixture Clustering**: 임베딩 집합 $E_{i-1}$에 Gaussian Mixture Model(Reynolds 2015)을 적용해 $V_{i-1}$을 서로 겹치지 않는 $m$개 클러스터 $C_{i-1} = \{C_1, C_2, \ldots, C_m\}$로 나눈다.

클러스터 개수 $m$의 결정 방식에 대해 본문이 밝히는 것은 Implementation Details의 한 문장뿐이다. GMM의 클러스터 개수와 나머지 주요 hyperparameter를 held-out validation set에서 튜닝했다고만 적는다. Bayesian Information Criterion 같은 자동 결정 기준은 본문에 없다.

#### Aggregated Entity Generation

각 클러스터 $C_j$에 대해 그 클러스터의 의미를 대표하는 상위 entity $\alpha_j$와 설명문 $d_{\alpha_j}$를 생성한다. 생성 함수 $F_{\text{entity}}$는 클러스터 내부 entity와 그 사이의 relation 집합 $R_{C_j}$를 함께 본다.

$$(\alpha_j, d_{\alpha_j}) = F_{\text{entity}}(C_j, R_{C_j})$$

새 entity 집합 $V_i = \{\alpha_j\}_{j=1}^{m}$과 설명문 집합이 다음 층을 이루고, 각 자식 $v \in C_j$는 parent $\alpha_j$로 연결되어 hierarchy의 parent-child 링크를 만든다. 실제 구현에서 $F_{\text{entity}}$는 전용 프롬프트 $P_{\text{entity}}$로 유도한 LLM이다. 프롬프트는 새 entity의 간결한 이름과 구성 요소를 요약한 설명문을 함께 내도록 지시한다.

#### Aggregated Relation Generation

상위 층에서 semantic island가 생기지 않도록, $V_i$의 상위 entity 사이에 새 relation을 명시적으로 만든다. 두 상위 entity $(\alpha_j, \alpha_k)$에 대해 원래 그래프에서 클러스터 $C_j$와 $C_k$에 각각 속한 노드들을 잇던 relation 집합 $R_{\langle C_j, C_k \rangle}$를 확인하고, 그 개수를 connectivity strength $\lambda_{j,k}$로 정의한다.

$$r_{\langle \alpha_j, \alpha_k \rangle} = \begin{cases} F_{(\text{rel})}(\alpha_j, \alpha_k, R_{\langle C_j, C_k \rangle}), & \lambda_{j,k} > \tau \\ \text{Concate}(R_{\langle C_j, C_k \rangle}), & \text{otherwise} \end{cases}$$

$\lambda_{j,k}$가 임계값 $\tau$를 넘으면 의미 있는 상위 관계가 존재한다고 보고 LLM 기반 함수 $F_{\text{rel}}$이 요약한다. 넘지 않으면 클러스터 간 relation들을 텍스트로 이어 붙이기만 한다. $F_{\text{rel}}$ 역시 전용 프롬프트 $P_{\text{rel}}$로 유도한다.

$\tau$는 data-dependent hyper-parameter다. 추상화 수준마다 그래프 밀도가 다르므로 layer index에 따라 값이 달라질 수 있고, 뒷받침이 충분한 relation만 상위로 전파되게 하는 역할을 한다고 서술한다. 구체적 결정 절차나 실제 사용값은 본문에 없다.

이 클러스터링과 생성을 재귀적으로 반복해 다층 KG를 만든다. 각 층은 아래 층보다 추상적이면서도 의미상 일관된 view를 제공한다.

### 3.3 Structured Retrieval via Lowest Common Ancestor

#### Initial Entity Anchoring

쿼리 $q$를 가장 구체적인 사실에 붙이기 위해, 원래 그래프인 base layer $G_0$의 entity만 대상으로 dense retrieval을 수행한다.

$$V_{\text{seed}} = \text{Top-}n_{v \in V_0}(\text{sim}(q, d_v))$$

이렇게 뽑은 seed entity 집합 $V_{\text{seed}}$가 구조 탐색의 출발점이 된다. 상위 요약 노드를 anchoring 대상에서 제외한 점이 기존 방법과 다르다.

#### Contextualization via LCA Path Traversal

기존 KG 기반 RAG는 평면 그래프 $G_0$ 위에서 $V_{\text{seed}}$의 노드 쌍 사이 모든 경로를 찾는다. 이 방식은 잡음과 중복을 늘리는 중간 노드를 대량으로 가져온다. LeanRAG는 hierarchy $H$ 전체를 써서 훨씬 좁고 의미가 분명한 context를 정의한다.

두 seed entity의 lowest common ancestor $v_{\text{lca}}$는 hierarchy $H$에서 두 노드의 공통 조상 가운데 depth가 가장 작은 노드다. 이렇게 잡으면 두 seed에서 $v_{\text{lca}}$까지의 경로 길이 합이 최소가 되어 정보 중복을 피할 수 있다.

$$P_{\text{lca}}(V_{\text{seed}}, H) = \bigcup_{v \in V_{\text{seed}}} \text{ShortestPath}_H(v, v_{\text{lca}})$$

hierarchy가 tree 형태이므로 이 shortest path는 자식에서 부모로 이어지는 직선 chain이다. 최종 서브그래프는 다음과 같이 구성된다.

$$G_{\text{ret}} = (V_{\text{ret}}, R_{\text{ret}}), \quad V_{\text{ret}} = \{v \mid v \in P_{\text{lca}}\}, \quad R_{\text{ret}} = R_{\text{lca}} \cup R_{\text{inter-cluster}}$$

$R_{\text{lca}}$는 retrieval 경로 $P_{\text{lca}}$ 위의 relation이고, $R_{\text{inter-cluster}}$는 같은 층에 있는 상위 entity 사이의 relation이다. 예를 들어 $\alpha_j \in G_i$이고 $\alpha_k \in G_i$일 때 $r_{\langle \alpha_j, \alpha_k \rangle}$가 여기에 속한다.

마지막으로 base entity가 추출된 원문 chunk를 supporting evidence로 함께 돌려준다. 논문은 이 절차의 효과를 다음과 같이 정리한다. retrieval 결과가 관련 entity의 나열이 아니라 구체적 사실에서 공유 추상 개념으로 이어지는 연결된 서술 구조가 되고, 그 결과 정보 중복이 크게 줄면서 생성기에 더 구조화된 context가 전달된다.

### 3.4 Figure 1이 추가로 표기하는 복잡도

Figure 1은 본문에 없는 정보를 하나 담고 있다. 기존 그래프 기반 RAG의 탐색을 Graph Search로 두고 복잡도를 $O(n^2)$으로, LeanRAG의 탐색을 LCA Search로 두고 복잡도를 $\log(n)$으로 표기한다. 같은 그림은 기존 방식의 요약 지식 활용을 "모든 entity에서 매칭"으로, LeanRAG를 "bottom-top으로 entity 매칭"으로 대비시킨다. 이 복잡도 표기는 도식 안 주석일 뿐 본문 어디에도 유도나 측정이 없다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 실험 설정

- **데이터셋**: UltraDomain 벤치마크(Qian et al. 2024)의 Mix, CS, Legal, Agriculture 네 종. UltraDomain은 긴 context 과제와 전문 도메인의 상위 수준 질의를 다루도록 설계된 벤치마크이고, 네 종 선택은 선행 연구(Guo et al. 2024)를 따랐다. 본문은 UltraDomain의 총 도메인 수나 원소 개수를 밝히지 않는다.
- **Baseline 6종**: NaiveRAG(Lewis et al. 2020), GraphRAG(Edge et al. 2024), LightRAG(Guo et al. 2024), KAG(Liang et al. 2025), FastGraphRAG, HiRAG(Huang et al. 2025a). FastGraphRAG만 저자 연도 인용이 없고 PageRank(Page et al. 1999) 인용으로 대신한다.
- **GraphRAG 설정**: local search mode를 쓴다고 명시한다. global mode는 계산 비용이 크고 local 수준의 맥락 근거가 부족하다는 것이 이유다.
- **평가 지표 4종**: Comprehensiveness(질의를 얼마나 빠짐없이 다루는가), Empowerment(실무적 유용성과 행동 가능한 정보 제공력), Diversity(정보와 관점의 폭), Overall(앞의 세 가지와 기타 요인을 함께 고려한 총괄 품질). HiRAG(Huang et al. 2025a)의 지표 정의를 따랐다.
- **채점**: DeepSeek-V3(Liu et al. 2024)를 LLM-as-judge로 쓰고 1에서 10 척도로 채점한다. 각 쿼리와 답변 쌍을 5회 채점한다. 답변 품질을 직접 반영하기 위해 두 답변을 놓고 win rate를 재는 방식도 함께 쓴다.
- **생성 모델**: 모든 방법의 생성기를 DeepSeek-V3로 통일해 공정 비교를 맞췄다.
- **임베딩**: BGE-M3(Chen et al. 2024).
- **hyperparameter**: GMM 클러스터 개수를 포함한 주요 값은 held-out validation set에서 튜닝했다.
- **실행 환경**: 주요 실험은 상용 API 서비스로 수행했다. RQ2는 효율적 평가를 위해 baseline을 Qwen3-14B(Yang et al. 2025)로 재구현해 측정했다.

### 4.2 RQ1 전체 성능 (Table 1 전량)

1에서 10 척도 점수이고 값은 평균과 표준편차다. 열 순서는 논문 Table 1과 같다.

| 데이터셋 | 지표 | LeanRAG | HiRAG | Naive | GraphRAG | LightRAG | FastGraphRAG | KAG |
|---|---|---|---|---|---|---|---|---|
| Mix | Comprehensiveness | **8.89±0.01** | 8.72±0.02 | 8.20±0.01 | 8.52±0.01 | 8.19±0.02 | 6.56±0.02 | 7.90±0.03 |
| Mix | Empowerment | **8.16±0.02** | 7.86±0.03 | 7.52±0.03 | 7.73±0.02 | 7.56±0.03 | 5.82±0.03 | 7.41±0.04 |
| Mix | Diversity | **7.73±0.01** | 7.21±0.02 | 6.65±0.03 | 7.04±0.02 | 6.69±0.04 | 4.88±0.03 | 6.42±0.04 |
| Mix | Overall | **8.59±0.01** | 8.08±0.02 | 7.47±0.02 | 7.87±0.01 | 7.61±0.04 | 5.76±0.02 | 7.25±0.03 |
| CS | Comprehensiveness | 8.92±0.01 | 8.92±0.01 | **8.94±0.01** | 8.55±0.02 | 8.76±0.02 | 6.79±0.01 | 8.22±0.02 |
| CS | Empowerment | 8.68±0.02 | 8.66±0.02 | **8.69±0.04** | 8.28±0.04 | 8.50±0.04 | 6.67±0.04 | 8.52±0.05 |
| CS | Diversity | **7.87±0.02** | 7.84±0.02 | 7.79±0.02 | 7.42±0.02 | 7.63±0.04 | 5.45±0.04 | 7.03±0.02 |
| CS | Overall | **8.82±0.02** | 8.77±0.02 | 8.77±0.03 | 8.37±0.04 | 8.59±0.04 | 6.31±0.03 | 7.99±0.03 |
| Legal | Comprehensiveness | 8.88±0.02 | 8.68±0.02 | 8.85±0.01 | **8.95±0.01** | 8.24±0.02 | 3.87±0.02 | 8.41±0.02 |
| Legal | Empowerment | **8.42±0.03** | 8.18±0.06 | 8.28±0.03 | 8.33±0.02 | 7.83±0.05 | 3.53±0.03 | 8.20±0.03 |
| Legal | Diversity | **7.49±0.03** | 7.00±0.03 | 7.10±0.04 | 7.47±0.03 | 6.87±0.01 | 2.87±0.02 | 6.71±0.01 |
| Legal | Overall | **8.49±0.04** | 8.00±0.04 | 8.21±0.03 | 8.44±0.01 | 7.74±0.03 | 3.43±0.02 | 7.83±0.03 |
| Agriculture | Comprehensiveness | 8.94±0.06 | **8.99±0.00** | 8.85±0.01 | 8.97±0.01 | 8.71±0.01 | 3.28±0.01 | 8.22±0.01 |
| Agriculture | Empowerment | **8.66±0.02** | 8.52±0.02 | 8.51±0.03 | 8.52±0.02 | 8.23±0.02 | 3.29±0.05 | 8.33±0.06 |
| Agriculture | Diversity | **8.06±0.03** | 7.98±0.02 | 7.76±0.06 | 7.95±0.02 | 7.68±0.03 | 3.01±0.03 | 7.07±0.02 |
| Agriculture | Overall | **8.87±0.02** | 8.87±0.03 | 8.69±0.03 | 8.85±0.01 | 8.56±0.02 | 3.17±0.02 | 7.95±0.03 |

16개 칸 가운데 LeanRAG가 최고값이 아닌 칸은 네 곳이다.

| 데이터셋 | 지표 | LeanRAG | 1위 방법과 값 | 차이 |
|---|---|---|---|---|
| CS | Comprehensiveness | 8.92 | Naive 8.94 | 0.02점 낮음 |
| CS | Empowerment | 8.68 | Naive 8.69 | 0.01점 낮음 |
| Legal | Comprehensiveness | 8.88 | GraphRAG 8.95 | 0.07점 낮음 |
| Agriculture | Comprehensiveness | 8.94 | HiRAG 8.99 | 0.05점 낮음 |

Agriculture의 Overall은 LeanRAG 8.87과 HiRAG 8.87로 소수점 두 자리까지 같고 표준편차만 0.02와 0.03으로 다르다. 논문 표는 이 칸에서 LeanRAG를 굵게 표기한다. 본문도 이 상황을 반영해 "거의 모든 baseline을 앞선다"와 "대다수 지표에서 state-of-the-art이고 나머지에서도 높은 경쟁력"이라는 표현을 쓴다.

논문의 해석은 두 가지다. 첫째, 기존 KG 기반 RAG의 정보 밀집형 community 구조를 걷어냈는데도 LeanRAG의 aggregation이 질의 관련 정보를 충분히 공급한다는 점을 Comprehensiveness가 보여준다. 둘째, Empowerment와 Diversity는 제공 정보의 관련성을 재는 지표인데, 클러스터 간 relation을 세운 덕분에 정보의 폭이 늘어 이 두 지표에서 최적 성능이 나왔다고 본다.

FastGraphRAG는 네 데이터셋 모두에서 크게 낮다. Legal과 Agriculture의 Overall이 각각 3.43과 3.17로, 같은 칸의 LeanRAG(8.49, 8.87)와 5점 이상 차이가 난다.

### 4.3 RQ2 정보 중복 (Figure 3)

중복 지표로 retrieval된 context의 토큰 개수를 쓴다. 성능이 비슷한 수준일 때 토큰 수가 적으면 덜 중복된 context라는 전제다. 모든 baseline을 Qwen3-14B-Instruct로 재구현해 측정했다.

Figure 3은 네 데이터셋의 토큰 소비량을 백만 토큰 단위 막대 그래프로 보여준다. 논문 본문에 수치 표는 없어서, 아래 값은 그림의 눈금에서 읽은 근사값이다.

| 데이터셋 | GraphRAG | LightRAG | HiRAG | LeanRAG |
|---|---|---|---|---|
| Mix | 약 1.5백만 | 약 3.7백만 | 약 2.0백만 | 약 0.9백만 |
| CS | 약 1.7백만 | 약 3.0백만 | 약 3.0백만 | 약 1.3백만 |
| Legal | 약 1.7백만 | 약 3.0백만 | 약 3.0백만 | 약 1.8백만 |
| Agriculture | 약 1.5백만 | 약 3.0백만 | 약 2.9백만 | 약 1.0백만 |

본문 주장은 두 문장이다. LeanRAG가 모든 baseline보다 뚜렷하게 압축된 context를 가져오며, 평균적으로 baseline 대비 46% 작다. 원인은 LCA 기반 traversal이 hierarchy를 따라 좁은 서브그래프를 만드는 데 있고, 더 큰 community를 통째로 가져오는 방법들과 대비된다.

그림 자체는 LightRAG가 네 데이터셋 모두에서 GraphRAG보다 토큰을 많이 쓴다는 점도 보여준다. LightRAG는 entity와 relation 텍스트에 더해 원문 chunk를 함께 붙이는 구조다.

### 4.4 RQ3 클러스터 relation의 효과 (Table 2 전량)

LeanRAG와 relation 정보를 뺀 변형(LeanRAG w/o Relation)을 두고 두 답변을 직접 비교해 win rate를 잰다. 왼쪽이 LeanRAG, 오른쪽이 w/o Relation이다.

| 지표 | Mix | CS | Legal | Agriculture |
|---|---|---|---|---|
| Comprehensiveness | 51.5% 대 48.6% | 54.5% 대 45.5% | 55.5% 대 44.5% | 54.0% 대 46.0% |
| Empowerment | 55.0% 대 45.0% | 55.5% 대 44.5% | 56.5% 대 43.5% | 59.5% 대 40.5% |
| Diversity | 59.6% 대 40.4% | 66.0% 대 34.0% | 57.0% 대 43.0% | 63.0% 대 37.0% |
| Overall | 53.8% 대 46.2% | 58.5% 대 41.5% | 56.5% 대 43.5% | 58.0% 대 42.0% |

16개 비교 모두 LeanRAG가 우세하다. 우세폭이 가장 큰 지표는 Diversity이고, 그중에서도 CS가 66.0% 대 34.0%로 격차가 가장 크다. 가장 작은 격차는 Mix의 Comprehensiveness로 51.5% 대 48.6%다.

논문 해석은 이렇다. relation 경로를 제거하면 retrieval의 다양성, 곧 정보의 폭이 뚜렷하게 줄어든다. 클러스터 사이에 관계를 세우는 것이 고립된 entity들을 실제로 이어 주어 retrieval이 쓸 수 있는 정보를 넓힌다는 뜻이다. 이 관계를 명시적으로 반환하는 것 자체도 retrieval을 강화해 답변 품질을 끌어올린다.

### 4.5 RQ4 원문 context의 필요성 (Table 3 전량)

비교 대상 변형은 LeanRAG w/o Context다. 계층 retrieval 절차는 같지만 생성기에 주는 context에서 base 수준 entity에 연결된 원문 chunk를 빼고 entity 이름과 설명문만 남긴다.

| 데이터셋 | 지표 | LeanRAG | w/o Context | 하락폭 |
|---|---|---|---|---|
| Mix | Comprehensiveness | 8.89±0.01 | 8.15±0.02 | 0.74점 |
| Mix | Empowerment | 8.16±0.02 | 7.80±0.01 | 0.36점 |
| Mix | Diversity | 7.73±0.01 | 7.26±0.02 | 0.47점 |
| Mix | Overall | 8.59±0.01 | 7.93±0.01 | 0.66점 |
| CS | Comprehensiveness | 8.92±0.01 | 8.66±0.02 | 0.26점 |
| CS | Empowerment | 8.68±0.02 | 8.19±0.03 | 0.49점 |
| CS | Diversity | 7.87±0.02 | 7.57±0.02 | 0.30점 |
| CS | Overall | 8.82±0.02 | 8.34±0.02 | 0.48점 |
| Legal | Comprehensiveness | 8.88±0.02 | 8.49±0.01 | 0.39점 |
| Legal | Empowerment | 8.42±0.03 | 8.11±0.04 | 0.31점 |
| Legal | Diversity | 7.49±0.03 | 7.09±0.04 | 0.40점 |
| Legal | Overall | 8.49±0.04 | 8.00±0.04 | 0.49점 |
| Agriculture | Comprehensiveness | 8.94±0.06 | 8.65±0.01 | 0.29점 |
| Agriculture | Empowerment | 8.66±0.02 | 8.16±0.05 | 0.50점 |
| Agriculture | Diversity | 8.06±0.03 | 7.88±0.05 | 0.18점 |
| Agriculture | Overall | 8.87±0.02 | 8.53±0.03 | 0.34점 |

표의 16개 칸이 모두 하락 화살표다. 본문은 "네 데이터셋 전부와 거의 모든 평가 지표에서 성능이 크게 떨어진다"고 서술하고, 평균적으로 Mix의 Overall이 8.59점에서 7.93점으로 내려가며 CS, Legal, Agriculture에서도 비슷한 저하가 관찰된다고 적는다.

논문의 결론은 원문 chunk가 상세 설명, 근거, 미묘한 표현을 담고 있어 충실하고 실행 가능한 답을 만드는 데 필요하다는 것이다. 구조화된 entity 정보만으로 구성한 context는 의미상 초점은 맞지만 LLM이 필요로 하는 서술의 풍부함이 없다. 따라서 LeanRAG의 계층 그래프는 비구조 텍스트의 결정적 구간을 정확히 짚어 주는 semantic index이자 navigation system으로 기능하며, 구조 탐색으로 길을 안내하고 비구조 텍스트로 내용을 채우는 협업이 state-of-the-art의 조건이라고 정리한다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

논문에는 별도의 Limitations 절이 없다. 아래는 본문이 다루지 않은 범위를 정리한 것이다.

- **LCA 깊이에 대한 정성 분석 부재**: 실제 질의에서 LCA가 어느 층까지 올라가는지, root 근처로 수렴하는 경우가 얼마나 되는지에 대한 case study가 없다. LCA가 자주 root에 닿는다면 최소 서브그래프라는 성질이 약해질 수 있는데 이를 확인할 근거가 본문에 없다.
- **효율과 지연 시간 측정 부재**: 인덱싱 비용과 질의 시점 지연 시간을 직접 잰 실험이 없다. 효율 개선 주장의 근거는 retrieval 토큰 개수 한 가지이고, Figure 1의 복잡도 표기($O(n^2)$ 대 $\log(n)$)는 도식 주석일 뿐 유도나 측정이 아니다.
- **임계값 $\tau$의 결정 절차 부재**: layer index와 그래프 밀도에 따라 달라지는 data-dependent 값이라고만 적고, 실제 사용값이나 민감도 분석이 없다.
- **클러스터 개수 결정 절차 부재**: held-out validation으로 튜닝했다는 문장 외에 층별 클러스터 개수, 최대 층 수, 결정 기준이 없다.
- **고정 외부 KG 환경 미검증**: 본 방법은 코퍼스에서 LLM이 KG를 추출하고 원문 chunk를 함께 보관하는 상황을 전제한다. 원문이 없는 기성 KG에서도 동작하는지에 대한 실험이 없다.
- **KG가 아닌 일반 그래프 미검증**: 인용 그래프나 소셜 그래프처럼 entity와 relation 설명문이 없는 그래프에서의 적용 가능성은 다루지 않는다.
- **평가 판정자 단일**: 채점자가 DeepSeek-V3 한 종이고 생성기도 같은 모델이다. 판정자를 바꿨을 때의 안정성 검증이 없다.
- **코드 공개 정보 부재**: 재현에 필요한 저장소 주소나 공개 계획이 본문에 없다.

### 5.1 자료 자체의 내적 모순

본 논문 안에서 서로 어긋나는 서술이 여섯 건 확인된다. 삭제하지 않고 그대로 기록한다.

| 항목 | 한 쪽 서술 | 다른 쪽 서술 |
|---|---|---|
| RQ3의 표 참조 | 같은 문단 앞부분은 결과가 Table 2에 정리되어 있다고 적는다 | 바로 다음 문장은 "The data in Table 3 clearly shows"로 시작해 Table 3을 가리킨다 |
| Table 2 Mix Comprehensiveness | 51.5% 대 48.6%로 합이 100.1%다 | 나머지 15개 쌍은 모두 합이 정확히 100%다 |
| RQ2 압축 주장 | 본문은 모든 baseline보다 압축된 context를 가져온다고 적는다 | Figure 3의 Legal에서는 GraphRAG 막대가 LeanRAG보다 낮다 |
| RQ4 하락 지표 | 본문은 가장 큰 하락이 Comprehensiveness와 Empowerment에서 일관되게 나타난다고 적는다 | Table 3에서 Mix의 Empowerment 하락(0.36점)은 네 지표 중 가장 작고, CS의 Comprehensiveness 하락(0.26점)도 가장 작다. Legal에서 하락폭이 가장 큰 구성 지표는 Diversity(0.40점)다 |
| RQ4 하락 범위 | 본문은 "거의 모든 평가 지표"라고 한정한다 | Table 3의 16개 칸은 전부 하락 화살표다 |
| RQ2 모델 표기 | Implementation Details는 Qwen3-14b로 적는다 | RQ2 Experimental Setup은 Qwen3-14B-Instruct로 적는다 |

### 5.2 GraphRAG local search 귀속에 대한 주의

논문은 baseline 설명에서 GraphRAG(Edge et al. 2024)의 local search mode를 사용한다고 적는다. 그러나 우리 저장소가 보유한 Edge 2024 원논문 PDF 26쪽 전문에는 "local search"라는 표현이 한 번도 나오지 않는다. 원논문이 다루는 질의 방식은 community summary 기반 map-reduce 단일 모드이고, "global search"는 실험 조건 C0에서 C3까지를 묶어 부르는 이름으로 6회 등장한다. local과 global을 나란히 놓는 이원 구성은 Microsoft의 구현체가 도입한 것이다. 따라서 LeanRAG가 실제로 비교한 대상은 원논문이 규정한 절차가 아니라 구현체의 한 모드로 보아야 한다.

## 6. 관련 연구 (Related Work)

### 6.1 Retrieval-Augmented Generation

RAG(Lewis et al. 2020)는 코퍼스에서 관련 텍스트 chunk를 가져와 생성의 context로 제공한다(Wang et al. 2024). 논문은 이 방식의 근본 난점을 chunking dilemma라고 부른다. chunk를 작게 자르면 맥락을 잃고, 크게 자르면 잡음이 들어와 모델의 초점이 흐려진다(Tonellotto et al. 2024).

극복 시도는 두 방향이다. 하나는 retriever 자체의 개선으로, 희소 방식 BM25(Robertson, Zaragoza et al. 2009)에서 밀집 모델 DPR(Karpukhin et al. 2020)과 Contriever(Izacard et al. 2021)로 이어졌다. 다른 하나는 문서의 인덱싱과 조직화(Jiang et al. 2023)이고, 최근에는 텍스트 chunk의 계층 요약을 만들어 다중 수준 retrieval을 가능하게 하는 방법이 나왔다. RAPTOR(Sarthi et al. 2024)가 재귀 요약 클러스터 트리를 만들어 세밀한 세부와 상위 요약을 함께 가져온다. 다만 이 방법들은 지식을 선형 구조나 단순 계층으로만 다루고 entity와 개념 사이의 복잡한 비계층 관계를 명시적으로 모델링하지 않아, 그런 연결을 따라가야 답할 수 있는 질의에서 한계를 보인다.

### 6.2 Knowledge Graph Based RAG

KG 기반 RAG는 지식을 entity와 relation의 그래프로 표현해 LLM에 더 구조적이고 의미가 풍부한 context를 준다(Peng et al. 2024). 초기에는 그래프 구조를 retrieval 개선에 쓰는 데 집중했다. GraphRAG(Edge et al. 2024)는 문서를 community 기반 KG로 조직하고, FastGraphRAG는 PageRank(Page et al. 1999) 같은 그래프 중심성 지표로 중요한 노드를 우선한다. 이 서브그래프 retrieval 방식은 고객 서비스처럼 과거 지원 티켓에서 KG를 만드는 산업 응용에서도 효과를 보였다(Xu et al. 2024).

이후 더 정교한 계층 구조를 다룬 연구가 나왔다. HiRAG(Huang et al. 2025a)는 현재 state-of-the-art로, entity를 클러스터링해 다중 수준 요약을 만든다. LightRAG(Guo et al. 2024)는 dual-level 구성으로 global과 local retrieval의 균형을 잡는다. 그럼에도 질의 시점에 그래프 구조를 활용하는 방식에 공백이 남는다. retrieval이 인덱싱과 분리되어 초기 탐색이 community나 계층 관계의 안내 없이 평면화된 노드 목록 위에서 수행되고, 구조 정보는 retrieval 이후 확장에만 쓰인다. 그 결과 entity 사이 관계가 중요한 복잡 질의에서 성능이 제한되며, retrieval을 지식 구조와 함께 설계하는 방식이 필요하다.

### 6.3 인용 표기 확인

| 대상 | 이 논문의 인용 표기 | 비고 |
|---|---|---|
| GraphRAG | Edge et al. 2024, arXiv:2404.16130 | 우리 wiki의 `edge-2024-from-local-to-global`과 같은 자료 |
| LightRAG | Guo et al. 2024, arXiv:2410.05779 | 우리 wiki stem은 `guo-2025-lightrag-simple-and-fast`다. 이 논문은 2024년 arXiv 판으로 인용하며 학회 게재 정보는 적지 않는다 |
| HiRAG | Huang et al. 2025a, arXiv:2503.10150 | 아직 우리 wiki에 없다 |
| RAPTOR | Sarthi et al. 2024, ICLR | 아직 우리 wiki에 없다 |
| KAG | Liang et al. 2025, WWW 2025 Companion Proceedings 334쪽에서 343쪽 | 아직 우리 wiki에 없다 |
| NaiveRAG | Lewis et al. 2020, NeurIPS 33권 9459쪽에서 9474쪽 | 원조 RAG 논문 |
| UltraDomain | Qian et al. 2024, MemoRAG, arXiv:2409.05591 | 벤치마크 출처가 MemoRAG 논문이다 |
| BGE-M3 | Chen et al. 2024, arXiv:2402.03216 | 임베딩 모델 |
| DeepSeek-V3 | Liu et al. 2024, arXiv:2412.19437 | 생성기이자 판정자 |
| Qwen3 | Yang et al. 2025, arXiv:2505.09388 | RQ2 재구현용 |
| GMM | Reynolds 2015, Encyclopedia of Biometrics | 클러스터링 기법 출처 |

## 7. 용어집 (Glossary)

- **Semantic islands**: 계층 KG의 상위 요약 노드들이 서로를 잇는 explicit relation 없이 고립되어, 서로 다른 개념 community를 넘나드는 추론이 막히는 상태. 이 논문이 세운 첫 번째 문제다.
- **Structurally unaware retrieval**: retrieval이 그래프의 위상 정보를 쓰지 못하고 평면화된 노드 목록 위 단순 의미 탐색으로 퇴화하는 현상. 이 논문이 세운 두 번째 문제이며 structure-retrieval mismatch로도 불린다.
- **Semantic aggregation**: entity 임베딩을 GMM으로 묶고, 각 클러스터에 대해 LLM이 상위 entity와 설명문을 만들며, 클러스터 사이의 relation까지 함께 만들어 내는 절차.
- **Aggregated entity $\alpha_j$**: 클러스터 $C_j$를 대표하는 상위 entity. 클러스터 내부 entity와 그 사이 relation을 함께 본 LLM이 이름과 설명문을 생성한다.
- **Aggregated relation $r_{\langle \alpha_j, \alpha_k \rangle}$**: 같은 층의 두 상위 entity 사이 relation. connectivity strength가 임계값을 넘으면 LLM이 요약하고, 넘지 않으면 원래 relation들을 텍스트로 이어 붙인다.
- **Connectivity strength $\lambda_{j,k}$**: 클러스터 $C_j$와 $C_k$에 각각 속한 노드들을 잇던 base 층 relation의 개수.
- **임계값 $\tau$**: connectivity strength의 판정 기준이 되는 data-dependent hyper-parameter. layer index와 그래프 밀도에 따라 달라진다.
- **Hierarchical knowledge graph $H$**: 평면 KG $G_0$ 위에 상위 층 $G_1$에서 $G_k$까지를 쌓은 다중 해상도 구조. 같은 층 상위 entity 사이의 relation을 포함한다.
- **Seed entity $V_{\text{seed}}$**: 쿼리 임베딩과 base 층 entity 설명문 임베딩의 유사도로 뽑은 상위 $n$개 entity. 구조 탐색의 출발점이다.
- **Lowest common ancestor $v_{\text{lca}}$**: hierarchy에서 seed들의 공통 조상 가운데 depth가 가장 작은 노드. 두 seed에서 이 노드까지의 경로 길이 합이 최소가 된다.
- **LCA path $P_{\text{lca}}$**: 각 seed entity에서 $v_{\text{lca}}$까지의 shortest path를 모두 합집합한 경로. tree 구조이므로 자식에서 부모로 이어지는 chain이다.
- **Inter-cluster relation $R_{\text{inter-cluster}}$**: 같은 층 상위 entity 사이에 새로 만든 relation 가운데 retrieval 결과에 포함되는 것들. cross-community 정보를 공급한다.
- **Bottom-up retrieval**: base 층에서 anchor를 잡고 hierarchy 위쪽으로 LCA 경로를 따라 올라가는 전략.
- **LeanRAG w/o Relation**: RQ3의 비교 변형. 상위 entity 사이 relation 경로 정보를 retrieval 결과에서 제외한다.
- **LeanRAG w/o Context**: RQ4의 비교 변형. 계층 retrieval은 그대로 두고 base entity의 원문 chunk만 context에서 제외한다.
- **Comprehensiveness, Empowerment, Diversity, Overall**: open-ended QA 응답을 1에서 10 척도로 재는 네 지표. 각각 질의 충족도, 실무적 유용성, 정보의 폭, 총괄 품질이다.
- **UltraDomain**: Qian et al. 2024의 MemoRAG 논문이 제시한 벤치마크. 긴 context 과제와 전문 도메인 상위 수준 질의를 다룬다. 이 논문은 그중 Mix, CS, Legal, Agriculture 네 종을 쓴다.

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 2 | Naive LLM, Naive RAG, 그래프 기반 RAG, LeanRAG의 파이프라인 비교와 탐색 복잡도 표기 | caption-region | 별표 wiki 권장 (배경) |
| fig02 | 4 | LeanRAG 전체 구조. KG 구축, 계층 aggregation, LCA 기반 추론의 세 단계 | caption-region | 별표 wiki 권장 (architecture) |
| fig03 | 6 | 네 데이터셋의 retrieval 토큰 소비량 막대 그래프 | caption-region | 별표 wiki 권장 (result) |
| tab01 | 7 | 일곱 개 방법의 1에서 10 척도 평가 점수표 | table-region | 제외 (본문 표로 전량 이관) |
| tab02 | 7 | 잘못 잡힌 크롭. Table 2가 아니라 왼쪽 단 본문과 Table 3이 담겼다 | table-region | 제외 (크롭 오류, 재추출 필요) |
| tab03 | 7 | 원문 chunk 제거 ablation 결과표 | table-region | 제외 (본문 표로 전량 이관) |

`tab02`는 검출된 caption 앵커는 Table 2였지만 실제로 잘린 영역이 7쪽 하단 전체 너비여서, win rate 표 대신 왼쪽 단 본문 문단과 오른쪽의 Table 3이 담겼다. Table 2의 win rate 값은 위 4.4절에 전량 옮겨 두었으므로 정보 손실은 없다. 재추출이 필요하면 사람이 `--bbox`로 지정해야 한다.
