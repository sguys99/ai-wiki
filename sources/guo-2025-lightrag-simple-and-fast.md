---
title: "LightRAG: Simple and Fast Retrieval-Augmented Generation"
type: paper
year: 2025
category: database
raw_path: raw/papers/guo-2025-lightrag-simple-and-fast.pdf
raw_filename: "guo-2025-lightrag-simple-and-fast.pdf"
source_collection: external
authors: "Zirui Guo, Lianghao Xia, Yanhua Yu, Tu Ao, Chao Huang"
arxiv_id: "2410.05779"
venue: "Findings of ACL: EMNLP 2025, pp. 10746-10761"
url: "https://github.com/HKUDS/LightRAG"
tags: [graph-rag, rag, knowledge-graph, lightrag, dual-level-retrieval, key-value-indexing, emnlp-2025, paper]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/guo-2025-lightrag-simple-and-fast/fig01.png
    raw: raw/papers/guo-2025-lightrag-simple-and-fast-figures/fig01.png
    caption: "LightRAG 전체 아키텍처. 왼쪽은 원문 chunk에서 entity와 relation을 뽑아 LLM profiling과 중복 제거를 거쳐 index graph를 만드는 과정이고, 오른쪽은 질의에서 low-level key와 high-level key를 함께 뽑아 entity와 relation을 각각 검색한 뒤 원문까지 묶어 컨텍스트를 구성하는 과정이다"
    page: 4
    bbox_norm: [0.1112, 0.0782, 0.8888, 0.1925]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/guo-2025-lightrag-simple-and-fast/fig02.png
    raw: raw/papers/guo-2025-lightrag-simple-and-fast-figures/fig02.png
    caption: "질의 하나가 처리되는 전 과정 예시. 영화 추천 시스템의 평가 지표를 묻는 질의에서 high-level 키워드 3개와 low-level 키워드 7개를 뽑고, 검색된 entity와 relationship과 원문 조각을 컨텍스트로 묶어 최종 답변을 생성한다"
    page: 12
    bbox_norm: [0.109, 0.077, 0.8911, 0.495]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/guo-2025-lightrag-simple-and-fast/fig03.png
    raw: raw/papers/guo-2025-lightrag-simple-and-fast-figures/fig03.png
    caption: "그래프 구축 프롬프트. entity_name, entity_type, entity_description을 먼저 뽑고 이어서 source_entity, target_entity, relationship_description, relationship_strength, relationship_keywords를 뽑게 한다. relationship_keywords가 relation의 검색 key가 된다"
    page: 13
    bbox_norm: [0.109, 0.077, 0.8911, 0.3907]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/guo-2025-lightrag-simple-and-fast/fig04.png
    raw: raw/papers/guo-2025-lightrag-simple-and-fast-figures/fig04.png
    caption: "질문 생성 프롬프트. 데이터셋 설명을 주고 사용자 5명, 사용자마다 과제 5개, 과제마다 질문 5개를 만들게 해서 데이터셋당 125문항을 얻는다"
    page: 13
    bbox_norm: [0.109, 0.4167, 0.8911, 0.5688]
    strategy: caption-region
    curated: false
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/guo-2025-lightrag-simple-and-fast/fig05.png
    raw: raw/papers/guo-2025-lightrag-simple-and-fast-figures/fig05.png
    caption: "키워드 추출 프롬프트. high_level_keywords와 low_level_keywords 두 필드를 가진 JSON을 내게 하고 예시 3개를 함께 준다. 질의를 분류하지 않고 두 종류를 한 번에 뽑는 dual-level retrieval의 입구다"
    page: 14
    bbox_norm: [0.109, 0.0685, 0.8911, 0.3742]
    strategy: caption-region
    curated: true
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/guo-2025-lightrag-simple-and-fast/fig06.png
    raw: raw/papers/guo-2025-lightrag-simple-and-fast-figures/fig06.png
    caption: "평가 프롬프트. 두 답변을 Comprehensiveness, Diversity, Empowerment 세 기준으로 비교하고 종합 승자까지 JSON으로 내게 한다. 지시문은 기준이 네 가지라고 적어 놓고 세 가지만 나열한다"
    page: 14
    bbox_norm: [0.109, 0.3862, 0.8911, 0.6592]
    strategy: caption-region
    curated: true
  - id: tab01
    label: Table 1
    kind: table
    file: assets/guo-2025-lightrag-simple-and-fast/tab01.png
    raw: raw/papers/guo-2025-lightrag-simple-and-fast-figures/tab01.png
    caption: "네 데이터셋과 네 평가 항목에서 baseline 대비 LightRAG 승률. 크롭 위쪽의 데이터셋 이름 행과 아래쪽 GraphRAG 비교 블록이 잘려 있다"
    page: 6
    bbox_norm: [0.1125, 0.1127, 0.8875, 0.3455]
    strategy: table-region
    low_confidence: true
    curated: false
  - id: tab02
    label: Table 2
    kind: table
    file: assets/guo-2025-lightrag-simple-and-fast/tab02.png
    raw: raw/papers/guo-2025-lightrag-simple-and-fast-figures/tab02.png
    caption: "NaiveRAG를 기준으로 잰 LightRAG ablation 변형의 승률. 크롭 아래쪽 -Origin 블록이 잘려 있다"
    page: 7
    bbox_norm: [0.1124, 0.1123, 0.8876, 0.3405]
    strategy: table-region
    low_confidence: true
    curated: false
  - id: tab03
    label: Table 3
    kind: table
    file: assets/guo-2025-lightrag-simple-and-fast/tab03.png
    raw: raw/papers/guo-2025-lightrag-simple-and-fast-figures/tab03.png
    caption: "Legal 데이터셋의 비용 비교. retrieval 단계와 증분 갱신 단계에서 GraphRAG와 LightRAG가 쓰는 토큰 수와 API 호출 수를 나란히 둔다"
    page: 7
    bbox_norm: [0.5043, 0.4305, 0.891, 0.5177]
    strategy: table-region
    curated: false
  - id: tab04
    label: Table 4
    kind: table
    file: assets/guo-2025-lightrag-simple-and-fast/tab04.png
    raw: raw/papers/guo-2025-lightrag-simple-and-fast-figures/tab04.png
    caption: "네 데이터셋의 문서 수와 토큰 수 통계. Legal이 508만 토큰으로 가장 크고 Mix가 62만 토큰으로 가장 작다"
    page: 10
    bbox_norm: [0.1107, 0.3399, 0.4903, 0.4036]
    strategy: table-region
    curated: false
  - id: tab05
    label: Table 5
    kind: table
    file: assets/guo-2025-lightrag-simple-and-fast/tab05.png
    raw: raw/papers/guo-2025-lightrag-simple-and-fast-figures/tab05.png
    caption: "문서 추가 시간 비교 표와 최종 저장 공간 표가 한 크롭에 함께 들어갔다. 왼쪽이 Table 5, 오른쪽이 Table 7이다"
    page: 11
    bbox_norm: [0.1246, 0.0966, 0.8709, 0.2016]
    strategy: table-region
    low_confidence: true
    curated: false
  - id: tab06
    label: Table 6
    kind: table
    file: assets/guo-2025-lightrag-simple-and-fast/tab06.png
    raw: raw/papers/guo-2025-lightrag-simple-and-fast-figures/tab06.png
    caption: "Table 6이 아니라 Table 5와 Table 7 영역이 다시 잡힌 중복 크롭이다. 평균 질의 시간 표는 담기지 않았다"
    page: 11
    bbox_norm: [0.1246, 0.0966, 0.8709, 0.2016]
    strategy: table-region
    low_confidence: true
    curated: false
  - id: tab07
    label: Table 7
    kind: table
    file: assets/guo-2025-lightrag-simple-and-fast/tab07.png
    raw: raw/papers/guo-2025-lightrag-simple-and-fast-figures/tab07.png
    caption: "LightRAG와 GraphRAG의 최종 저장 공간 사용량 비교. 39.5MB 대 286.7MB다"
    page: 11
    bbox_norm: [0.5206, 0.0967, 0.8709, 0.1604]
    strategy: table-region
    curated: false
  - id: tab08
    label: Table 8
    kind: table
    file: assets/guo-2025-lightrag-simple-and-fast/tab08.png
    raw: raw/papers/guo-2025-lightrag-simple-and-fast-figures/tab08.png
    caption: "NaiveRAG와의 정성 비교 사례. 원주민의 소유권 관점이 기업 합병에 미치는 영향을 묻는 질의에 대한 두 답변과 judge의 항목별 판정을 나란히 둔다"
    page: 15
    bbox_norm: [0.1129, 0.1738, 0.8871, 0.8475]
    strategy: table-region
    curated: false
  - id: tab09
    label: Table 9
    kind: table
    file: assets/guo-2025-lightrag-simple-and-fast/tab09.png
    raw: raw/papers/guo-2025-lightrag-simple-and-fast-figures/tab09.png
    caption: "GraphRAG와의 정성 비교 사례. 표의 질의는 feature 정규화 방법을 묻는데 두 답변은 모두 영화 추천 평가 지표를 다뤄 질의와 답변이 어긋나 있다"
    page: 16
    bbox_norm: [0.1129, 0.1748, 0.8871, 0.8625]
    strategy: table-region
    curated: false
---

## 한 줄 요약 (One-line Summary)

**LightRAG**은 지식 그래프를 인덱스로 쓰면서도 GraphRAG의 community 처리를 걷어낸 경량 graph-based RAG이다. 핵심은 두 가지다. 첫째, entity와 relation을 **key-value 쌍**으로 직렬화해 벡터 인덱스를 단순화한다. 둘째, 질의에서 **low-level 키워드**(구체 entity)와 **high-level 키워드**(개념과 테마)를 동시에 뽑아 각각 entity 인덱스와 relation 인덱스에 매칭하는 **dual-level retrieval**을 쓴다. UltraDomain 4개 도메인에서 NaiveRAG, RQ-RAG, HyDE, GraphRAG 대비 페어와이즈 승률이 우세하고(특히 Diversity), retrieval 토큰과 API 호출, 문서 삽입 시간, 평균 질의 시간, 최종 저장 공간이 모두 GraphRAG보다 작다.

## 1. 자료 정보 (Document Information)

- **제목**: LightRAG: Simple and Fast Retrieval-Augmented Generation
- **저자**: Zirui Guo¹, Lianghao Xia¹, Yanhua Yu², Tu Ao², Chao Huang¹* (¹University of Hong Kong, ²Beijing University of Posts and Telecommunications)
- **교신저자**: Chao Huang (chaohuang75@gmail.com)
- **발표**: Findings of ACL: EMNLP 2025, pp. 10746-10761 (2025년 11월 4일부터 9일)
- **arXiv**: 2410.05779 (최초 공개 2024년 10월)
- **PDF 경로**: `raw/papers/guo-2025-lightrag-simple-and-fast.pdf` (16 pages)
- **오픈소스**: https://github.com/HKUDS/LightRAG
- **연구비**: 중국 국가자연과학기금 U22B2019

## 2. 주요 기여 (Key Contributions)

1. **Graph-empowered RAG의 필요성 제시**: 기존 RAG의 평면적(flat) 데이터 표현과 컨텍스트 인식 부족이 조각난 답변을 낳는다는 문제를 그래프 구조 인덱싱으로 해소한다. 논문이 든 예시는 "전기차 확산이 도시 대기질과 교통 인프라에 어떤 영향을 주는가"라는 질의로, 기존 RAG는 전기차와 대기오염과 교통 문제 문서를 따로 가져올 뿐 셋을 하나의 답으로 엮지 못한다.
2. **Graph-based Text Indexing**: LLM으로 entity(node)와 relation(edge)을 뽑고 LLM profiling으로 **key-value 쌍**을 만든다. Entity는 이름 자체가 유일한 index key이고, relation은 연결된 entity에서 합성한 global theme 덕분에 key를 여러 개 가질 수 있다. 중복 제거로 그래프 크기를 줄인다.
3. **Dual-level Retrieval Paradigm**: 질의를 분류하지 않고 local 키워드와 global 키워드를 동시에 뽑아, 전자는 entity 인덱스에 후자는 relation의 global key에 매칭한다. 검색된 node와 edge의 1-hop neighbor까지 subgraph로 포함한다.
4. **Incremental Update Algorithm**: 새 문서에 같은 인덱싱을 적용한 뒤 node 집합과 edge 집합의 합집합을 취한다. 전체 그래프 재구축이 없어 GraphRAG의 community report 재생성 비용이 발생하지 않는다.
5. **비용과 효율 분석**: Legal 데이터셋에서 retrieval 토큰이 61만 개에서 100개 미만으로, API 호출이 수백 회에서 1회로 줄었다. 문서 삽입 시간, 평균 질의 시간, 최종 저장 공간도 함께 측정했다.
6. **오픈소스 공개**: GitHub HKUDS/LightRAG.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 RAG Framework Formalization

$$M = (G, R = (\phi, \psi)),\quad M(q; D) = G(q, \psi(q; \hat{D})),\quad \hat{D} = \phi(D)$$

| 기호 | 역할 |
|---|---|
| $\phi(\cdot)$ | data indexer. 외부 DB $D$로부터 인덱스 구조 $\hat{D}$를 만든다 |
| $\psi(\cdot)$ | data retriever. 질의 $q$를 인덱스와 대조해 관련 문서를 얻는다 |
| $G(\cdot)$ | generation module. 질의와 검색 결과로 답변을 만든다 |

논문은 목표를 두 곳에서 서로 다른 이름으로 적는다. Introduction은 Comprehensive Information Retrieval, Enhanced Retrieval Efficiency, Rapid Adaptation to New Data로 쓰고, 2절은 Comprehensive Information Retrieval, Efficient and Low-Cost Retrieval, Fast Adaptation to Data Changes로 쓴다. 내용은 같고 표현만 다르다.

### 3.2 Graph-based Text Indexing

$$\hat{D} = (\hat{V}, \hat{E}) = \text{Dedupe} \circ \text{Prof}(V, E),\quad V, E = \bigcup_{D_i \in D} \text{Recog}(D_i)$$

| 단계 | 논문 표기 | 역할 |
|---|---|---|
| entity와 relation 추출 | $\text{Recog}(\cdot)$, 본문 $R(\cdot)$ | chunk $D_i$에서 entity(node)와 relation(edge)을 LLM 프롬프트로 뽑는다 |
| key-value 생성 | $\text{Prof}(\cdot)$, 본문 $P(\cdot)$ | 각 entity와 relation에 (K, V) 쌍을 만든다. key는 검색용 단어나 짧은 구, value는 생성에 쓸 요약 문단이다 |
| 중복 제거 | $\text{Dedupe}(\cdot)$, 본문 $D(\cdot)$ | 서로 다른 chunk에서 나온 동일 entity와 relation을 병합해 그래프 크기를 줄인다 |

추출 예시는 "Cardiologists assess symptoms to identify potential heart issues."라는 문장에서 entity {Cardiologists, Heart Disease}와 relation "Cardiologists diagnose Heart Disease"를 얻는 것이다.

key 부여 규칙이 entity와 relation에서 다르다. Entity는 이름 하나만 index key로 쓴다(sole index key). Relation은 연결된 entity의 global theme을 LLM이 합성해 key를 여러 개 가질 수 있다. 이 차이가 dual-level retrieval의 매칭 대상을 나눈다.

이 인덱싱이 주는 이점은 두 가지다. 첫째, Comprehensive Information Understanding으로 multi-hop subgraph에서 global 정보를 뽑을 수 있어 여러 chunk에 걸친 복잡한 질의를 다룬다. 둘째, Enhanced Retrieval Performance로 key-value 구조가 부정확한 임베딩 매칭(Gao et al., 2023)이나 비효율적인 chunk 순회(Edge et al., 2024)보다 빠르고 정확하다.

### 3.3 Dual-level Retrieval Paradigm

질의 유형을 둘로 나눈다.

| 유형 | 성격 | 논문의 예시 |
|---|---|---|
| Specific Query | 특정 node나 edge를 지목하는 세부 지향 질의 | "Who wrote 'Pride and Prejudice'?" |
| Abstract Query | 넓은 주제와 요약과 관통하는 테마를 묻는 개념 지향 질의 | "How does artificial intelligence influence modern education?" |

질의를 분류하지 않고 양쪽 키워드를 동시에 뽑아 각각 검색한다.

1. **Query Keyword Extraction**: 질의 $q$에서 local 키워드 $k^{(l)}$와 global 키워드 $k^{(g)}$를 LLM이 한 번에 뽑는다.
2. **Keyword Matching**: 벡터 데이터베이스로 $k^{(l)}$은 후보 entity와, $k^{(g)}$는 global key가 붙은 relation과 매칭한다.
3. **Incorporating High-Order Relatedness**: 검색된 node $v$와 edge $e$의 1-hop neighbor 집합 $\{v_i \mid v_i \in V \wedge (v_i \in N_v \vee v_i \in N_e)\}$까지 모아 subgraph를 넓힌다.

Low-Level Retrieval은 특정 entity와 그 속성과 관계를 정밀하게 가져오는 층이고, High-Level Retrieval은 여러 entity와 relation에 걸친 정보를 모아 상위 개념과 요약을 다루는 층이다.

> **논문과 코드의 간극**: [[database/dsba-2026-paper-review-graph-based-rag]]의 발표자 김도윤은, 논문 본문이 low-level 키워드를 entity name(key)과만 비교한다고 서술하는데 공식 코드는 entity의 name과 description(key와 value) 양쪽으로 검색한다고 지적한다. 이 지적은 본 논문 raw에는 없고 세미나 자료가 근거다.

### 3.4 Fast Adaptation to Incremental Knowledge Base

새 문서 $D'$에 같은 인덱싱 $\phi$를 적용해 $\hat{D}' = (\hat{V}', \hat{E}')$를 얻은 뒤 기존 그래프와 합집합을 취한다.

$$\hat{V}_{\text{new}} = \hat{V} \cup \hat{V}',\quad \hat{E}_{\text{new}} = \hat{E} \cup \hat{E}'$$

논문이 든 목표는 두 가지다. Seamless Integration of New Data는 기존 그래프 구조를 흔들지 않고 새 데이터를 합쳐 기존 연결의 무결성과 과거 데이터 접근성을 지키는 것이다. Reducing Computational Overhead는 전체 인덱스 그래프를 다시 만들 필요를 없애 새 데이터 흡수를 빠르게 하는 것이다.

### 3.5 Retrieval-Augmented Answer Generation

검색된 entity와 relation의 value를 이어 붙이고 여기에 entity와 relation의 이름과 description, 원문 발췌를 더해 general-purpose LLM에 컨텍스트로 넘긴다. 별도 fine-tuning은 없다.

### 3.6 Complexity Analysis

| 단계 | LLM 호출 수 | 비고 |
|---|---|---|
| Index phase | $\lceil$ total tokens / chunk size $\rceil$ | chunk마다 entity와 relation 추출 1회. 추가 오버헤드가 없다 |
| Retrieval phase | 키워드 생성 1회 | 이후는 벡터 검색이다. chunk가 아니라 entity와 relation을 가져와 GraphRAG의 community 순회보다 오버헤드가 작다 |

### 3.7 프롬프트 구성 (Appendix 9.4)

| 프롬프트 | 위치 | 출력 |
|---|---|---|
| Graph Generation | Figure 3 | entity_name, entity_type(organization, person, geo, event), entity_description과 source_entity, target_entity, relationship_description, relationship_strength, relationship_keywords, 그리고 문서 전체의 content_keywords |
| Query Generation | Figure 4 | 사용자 5명 × 과제 5개 × 질문 5개 구조 |
| Keyword Extraction | Figure 5 | `high_level_keywords`와 `low_level_keywords` 두 필드를 가진 JSON. 예시 3개 포함 |
| RAG Evaluation | Figure 6 | 항목별 Winner와 Explanation, 그리고 Overall Winner를 담은 JSON |

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 실험 설정

데이터셋은 UltraDomain benchmark(Qian et al., 2024)의 4개다. UltraDomain은 대학 교재 428권에서 뽑은 18개 도메인 코퍼스이고, 여기서 Agriculture, CS, Legal, Mixed를 골랐다.

| 통계 | Agriculture | CS | Legal | Mix |
|---|---|---|---|---|
| 문서 수 | 12 | 10 | 94 | 61 |
| 토큰 수 | 2,017,886 | 2,306,535 | 5,081,069 | 619,009 |

| 도메인 | 다루는 내용 |
|---|---|
| Agriculture | 양봉, 벌통 관리, 작물 생산, 병해 예방 등 농업 실무 |
| CS | 데이터 사이언스와 소프트웨어 공학. 추천 시스템, 분류 알고리즘, Spark 실시간 분석 |
| Legal | 기업 구조조정, 법률 계약, 규제 준수, 지배구조 등 기업 법무 |
| Mixed | 문학, 전기, 철학 텍스트를 포함한 문화와 역사와 철학 전반 |

Baseline은 네 가지다.

| Baseline | 방식 |
|---|---|
| Naive RAG (Gao et al., 2023) | 원문을 chunk로 나눠 임베딩으로 벡터 DB에 넣고 유사도 상위 chunk를 그대로 가져온다 |
| RQ-RAG (Chan et al., 2024) | LLM이 질의를 재작성, 분해, 모호성 해소를 거쳐 여러 sub-query로 쪼갠다 |
| HyDE (Gao et al., 2022) | LLM이 가상의 문서를 생성해 그 문서로 관련 chunk를 검색한다 |
| GraphRAG (Edge et al., 2024) | LLM으로 entity와 relation을 뽑아 node와 edge로 표현하고, node를 community로 묶어 community report를 만든 뒤 high-level 질의에서 community를 순회한다 |

구현 파라미터는 다음과 같다.

| 항목 | 값 |
|---|---|
| 벡터 저장소 | nano vector database |
| 모든 LLM 연산 | GPT-4o-mini |
| chunk size | 1200 (전 데이터셋 공통) |
| gleaning parameter | 1 (GraphRAG와 LightRAG 동일) |
| judge 모델 | GPT-4o-mini |
| 임베딩 모델 | 본문에 명시 없음 |

질문 생성은 GraphRAG(Edge et al., 2024)의 방식을 따른다. 데이터셋 전체 텍스트를 컨텍스트로 주고 LLM에 사용자 5명을 만들게 하고, 사용자마다 과제 5개, (사용자, 과제) 쌍마다 질문 5개를 만들게 해 데이터셋당 125문항을 얻는다.

평가는 GPT-4o-mini judge의 페어와이즈 비교다. 네 항목은 Comprehensiveness(질문의 모든 측면과 세부를 얼마나 철저히 다루는가), Diversity(관점과 통찰이 얼마나 다양하고 풍부한가), Empowerment(독자가 주제를 이해하고 판단하도록 얼마나 잘 돕는가), Overall(앞 세 항목의 종합)이다. 제시 순서에서 오는 편향을 줄이려고 두 답변의 위치를 번갈아 바꿔 측정하고 승률을 계산한다.

### 4.2 RAG Performance Comparison (RQ1)

Table 1의 전체 수치다. 각 칸은 (baseline 승률, LightRAG 승률)이다.

| 항목 | Agriculture | CS | Legal | Mix |
|---|---|---|---|---|
| **vs NaiveRAG** | | | | |
| Comprehensiveness | 32.4 / 67.6 | 38.4 / 61.6 | 16.4 / 83.6 | 38.8 / 61.2 |
| Diversity | 23.6 / 76.4 | 38.0 / 62.0 | 13.6 / 86.4 | 32.4 / 67.6 |
| Empowerment | 32.4 / 67.6 | 38.8 / 61.2 | 16.4 / 83.6 | 42.8 / 57.2 |
| Overall | 32.4 / 67.6 | 38.8 / 61.2 | 15.2 / 84.8 | 40.0 / 60.0 |
| **vs RQ-RAG** | | | | |
| Comprehensiveness | 31.6 / 68.4 | 38.8 / 61.2 | 15.2 / 84.8 | 39.2 / 60.8 |
| Diversity | 29.2 / 70.8 | 39.2 / 60.8 | 11.6 / 88.4 | 30.8 / 69.2 |
| Empowerment | 31.6 / 68.4 | 36.4 / 63.6 | 15.2 / 84.8 | 42.4 / 57.6 |
| Overall | 32.4 / 67.6 | 38.0 / 62.0 | 14.4 / 85.6 | 40.0 / 60.0 |
| **vs HyDE** | | | | |
| Comprehensiveness | 26.0 / 74.0 | 41.6 / 58.4 | 26.8 / 73.2 | 40.4 / 59.6 |
| Diversity | 24.0 / 76.0 | 38.8 / 61.2 | 20.0 / 80.0 | 32.4 / 67.6 |
| Empowerment | 25.2 / 74.8 | 40.8 / 59.2 | 26.0 / 74.0 | 46.0 / 54.0 |
| Overall | 24.8 / 75.2 | 41.6 / 58.4 | 26.4 / 73.6 | 42.4 / 57.6 |
| **vs GraphRAG** | | | | |
| Comprehensiveness | 45.6 / 54.4 | 48.4 / 51.6 | 48.4 / 51.6 | 50.4 / 49.6 |
| Diversity | 22.8 / 77.2 | 40.8 / 59.2 | 26.4 / 73.6 | 36.0 / 64.0 |
| Empowerment | 41.2 / 58.8 | 45.2 / 54.8 | 43.6 / 56.4 | 50.8 / 49.2 |
| Overall | 45.2 / 54.8 | 48.0 / 52.0 | 47.2 / 52.8 | 50.4 / 49.6 |

저자의 관찰은 세 가지다.

- **대규모 코퍼스에서 graph 기반 RAG의 우위**: 토큰 수가 크고 데이터셋 전체 이해가 필요한 질의에서 LightRAG와 GraphRAG가 chunk 기반 방법(NaiveRAG, HyDE, RQ-RAG)을 일관되게 앞선다. 격차는 데이터셋이 커질수록 벌어지고, 가장 큰 Legal에서 baseline 승률이 20% 수준까지 내려간다고 서술한다. 다만 Legal의 HyDE는 Overall 26.4%로 이 서술보다 높다.
- **Diversity에서 가장 큰 우위**: 특히 Legal에서 두드러진다. 저자는 dual-level retrieval이 low-level과 high-level 양쪽에서 정보를 모으기 때문으로 해석한다.
- **GraphRAG 대비 우위**: Agriculture, CS, Legal에서 Overall이 각각 54.8%, 52.0%, 52.8%로 앞선다. Mix에서는 Comprehensiveness 49.6%, Empowerment 49.2%, Overall 49.6%로 GraphRAG가 근소하게 앞서고, Diversity만 64.0%로 LightRAG가 앞선다.

### 4.3 Ablation Studies (RQ2)

Table 2는 NaiveRAG를 기준으로 각 변형의 승률을 잰다. 아래는 LightRAG 쪽 승률만 옮긴 것이다.

| 항목 | 변형 | Agriculture | CS | Legal | Mix |
|---|---|---|---|---|---|
| Comprehensiveness | 전체 | 67.6 | 61.6 | 83.6 | 61.2 |
| | -High | 65.2 | 57.2 | 76.4 | 59.6 |
| | -Low | 64.0 | 56.8 | 80.8 | 64.0 |
| | -Origin | 75.2 | 60.8 | 83.6 | 55.6 |
| Diversity | 전체 | 76.4 | 62.0 | 86.4 | 67.6 |
| | -High | 72.8 | 63.2 | 83.2 | 64.0 |
| | -Low | 72.0 | 60.4 | 86.4 | 66.8 |
| | -Origin | 73.6 | 55.2 | 85.6 | 74.4 |
| Empowerment | 전체 | 67.6 | 61.2 | 83.6 | 57.2 |
| | -High | 64.0 | 57.6 | 77.2 | 52.4 |
| | -Low | 65.2 | 57.2 | 83.6 | 64.8 |
| | -Origin | 68.0 | 56.8 | 82.8 | 54.8 |
| Overall | 전체 | 67.6 | 61.2 | 84.8 | 60.0 |
| | -High | 64.8 | 56.0 | 78.0 | 57.6 |
| | -Low | 65.2 | 56.4 | 81.2 | 64.8 |
| | -Origin | 74.4 | 60.8 | 84.4 | 55.6 |

세 변형의 정의와 결과는 다음과 같다.

| 변형 | 정의 | Overall 변화 (전체 대비) |
|---|---|---|
| -High | high-level retrieval 제거. low-level만 쓴다 | 네 데이터셋 모두 하락. Agriculture -2.8%p, CS -5.2%p, Legal -6.8%p, Mix -2.4%p |
| -Low | low-level retrieval 제거. high-level만 쓴다 | Agriculture -2.4%p, CS -4.8%p, Legal -3.6%p, Mix는 +4.8%p로 상승 |
| -Origin | 검색 결과에서 원문 passage 제거 | Agriculture +6.8%p, CS -0.4%p, Legal -0.4%p, Mix -4.4%p |

저자의 해석은 다음과 같다. -High는 entity와 그 직접 이웃에 지나치게 집중해 종합적 통찰이 필요한 복잡한 질의에서 정보를 모으지 못한다. -Low는 entity 사이 관계로 넓은 범위를 담아 comprehensiveness에서 유리하지만 특정 entity의 깊이가 얕아져 정밀한 답이 필요한 과제에서 약해진다. Hybrid mode인 전체 LightRAG는 넓이와 깊이를 함께 확보한다.

-Origin에 대해 저자는 "성능이 크게 떨어지지 않고 일부(Agriculture, Mix)에서는 오히려 올랐다"고 적고, 그래프 인덱싱이 이미 핵심 정보를 충분히 뽑아 두었고 원문에는 노이즈가 될 무관한 정보가 섞여 있기 때문으로 해석한다. Overall 기준으로 실제 상승은 Agriculture 한 곳이고, Mix는 Overall이 60.0%에서 55.6%로 내려가며 Diversity 한 항목만 67.6%에서 74.4%로 오른다.

### 4.4 Cost and Adaptability Analysis (RQ3)

Legal 데이터셋 기준이다. $T_{\text{extract}}$는 entity와 relation 추출의 토큰 오버헤드, $C_{\max}$는 API 호출당 허용 토큰 상한, $C_{\text{extract}}$는 추출에 필요한 API 호출 수다.

| 단계 | 지표 | GraphRAG | LightRAG |
|---|---|---|---|
| Retrieval | 토큰 | 610 × 1,000 (61만) | 100 미만 |
| Retrieval | API 호출 | (610 × 1,000) / $C_{\max}$, 본문 표현으로 수백 회 | 1회 |
| Incremental Text Update | 토큰 | 1,399 × 2 × 5,000 + $T_{\text{extract}}$ (약 1,399만) | $T_{\text{extract}}$ |
| Incremental Text Update | API 호출 | 1,399 × 2 + $C_{\text{extract}}$ | $C_{\text{extract}}$ |

수치의 출처는 이렇다. GraphRAG는 community 1,399개를 만들고 이 실험에서는 level-2 community 610개를 retrieval에 실제로 쓴다. community report 하나가 평균 1,000 토큰이라 610개면 61만 토큰이고, community를 하나씩 순회해야 해서 API 호출이 수백 회가 된다. LightRAG는 키워드 생성과 검색에 100 토큰 미만을 쓰고 전 과정에 API 호출이 1회다.

증분 갱신에서는 두 방법의 추출 오버헤드가 비슷하다. 차이는 그 다음이다. GraphRAG는 새 entity와 relation을 넣으려고 기존 community 구조를 해체한 뒤 원래 report와 새 report를 모두 다시 만들어야 하고, 이때 report 하나가 약 5,000 토큰이라 community 1,399개 기준 1,399 × 2 × 5,000 토큰이 든다. LightRAG는 재구축 없이 그래프에 합치므로 추출 오버헤드만 남는다.

### 4.5 시간과 저장 공간 (Appendix 9.2)

토큰 수 41,224에서 73,989 사이의 문서 5개를 지식 베이스에 추가하며 잰 결과다.

| 번호 | 토큰 수 | LightRAG (초) | GraphRAG (초) |
|---|---|---|---|
| 1 | 59,870 | 486 | 642 |
| 2 | 41,224 | 418 | 700 |
| 3 | 73,989 | 561 | 953 |
| 4 | 47,502 | 513 | 741 |
| 5 | 48,353 | 453 | 926 |

LightRAG의 삽입 시간은 418초에서 561초 범위로 거의 선형에 가깝게 늘어나고, GraphRAG는 642초에서 953초 범위로 더 크다. 저자는 GraphRAG의 community detection이 무거운 원인이라고 본다.

| 지표 | LightRAG | GraphRAG |
|---|---|---|
| 평균 질의 시간 | 11.2초 | 23.6초 |
| 최종 저장 공간 | 39.5MB | 286.7MB |

### 4.6 Case Study (Appendix 9.5, 9.6)

Table 8은 NaiveRAG와의 비교다. 캐나다와 호주에서 원주민의 소유권과 협업 관점이 기업 합병에 미치는 영향을 묻는 질의에 대해, LightRAG는 토지 소유의 문화적 의미, 협업의 역할, 법률과 규제 프레임워크로 절을 나눠 답하고 judge가 네 항목 모두 LightRAG를 택한다.

Table 9는 GraphRAG와의 비교다. 표의 Query 칸은 "Which methods can normalize the feature values for effective machine learning?"인데 GraphRAG와 LightRAG의 답변은 모두 영화 추천 시스템 평가 지표를 다룬다. judge는 LightRAG가 MAPK, AUC, user engagement metrics까지 포함해 더 넓다는 이유로 네 항목 모두 LightRAG를 택한다. 부록 9.6 본문은 이 사례를 "machine learning question"이라고 부른다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

논문의 Limitations 절(7절)은 한계를 적는 대신 확장 방향 두 가지를 서술한다.

- **멀티모달 확장**: 텍스트와 이미지와 오디오를 함께 다루면 컨텍스트 이해가 풍부해진다.
- **시간 인식**: time-awareness를 넣으면 변화하는 사건과 맥락을 반영해 시의성 있는 답을 낼 수 있다.

raw에서 확인되는 실질적 한계는 다음과 같다.

- **Mix 데이터셋에서 GraphRAG 대비 열세**: Comprehensiveness 49.6%, Empowerment 49.2%, Overall 49.6%로 근소하게 뒤진다. Mix는 62만 토큰으로 네 데이터셋 중 가장 작고 문학과 전기와 철학이 섞여 있다.
- **-Origin 해석과 표의 불일치**: 본문은 Agriculture와 Mix에서 개선이라고 적지만 Table 2의 Mix Overall은 하락한다.
- **community report 토큰 수의 이중 표기**: retrieval 분석에서는 평균 1,000 토큰, 증분 갱신 분석에서는 약 5,000 토큰으로 같은 대상을 다르게 적는다.
- **Table 9의 질의와 답변 불일치**: 질의는 feature 정규화를 묻는데 답변은 추천 시스템 평가 지표다.
- **평가 프롬프트의 항목 수 불일치**: Figure 6의 지시문이 "four criteria"라고 적고 세 가지만 나열한다.
- **임베딩 모델 미명시**: 본문은 nano vector database와 GPT-4o-mini만 밝히고 임베딩 모델을 적지 않는다.
- **judge와 generator가 같은 모델**: 답변 생성과 판정에 모두 GPT-4o-mini를 쓴다. 논문은 순서 편향만 통제하고 모델 자기선호는 다루지 않는다.
- **GraphRAG 설정의 특정성**: 비용 비교는 community 1,399개 중 level-2 610개를 쓴 특정 설정에 기댄다. 다른 level 선택이나 다른 코퍼스에서 같은 비율이 나오는지는 다루지 않는다.

wiki 내 다른 자료가 제기한 한계는 다음과 같고 근거가 본 논문 raw가 아니다.

- **논문과 코드의 간극**: low-level 키워드 매칭 대상이 entity name인지 name과 description인지 어긋난다는 지적. 근거는 [[database/dsba-2026-paper-review-graph-based-rag]].
- **임베딩 모델 실태**: 공식 코드에 BGE-M3와 OpenAI text-embedding-3-large가 섞여 있다는 관찰. 근거는 같은 세미나 자료.
- **계층 구조 부재**: 후속 HiRAG와 LeanRAG가 계층을 도입해 정밀도에서 앞선다는 비교. 근거는 [[database/zhang-2026-leanrag-knowledge-graph-based-generation]].
- **원문 제거 효과의 상반된 재현**: LeanRAG 실험에서는 원문을 빼면 일관되게 성능이 내려간다. 근거는 같은 LeanRAG 페이지.

## 6. 관련 연구 (Related Work)

### 6.1 Retrieval-Augmented Generation

기존 RAG는 질의를 벡터 공간에 넣어 가장 가까운 컨텍스트 벡터를 찾는다(Gao et al., 2022, 2023; Chan et al., 2024; Yu et al., 2024). 조각난 chunk에 의존하고 상위 k개만 가져와 global 정보를 담기 어렵다.

그래프 구조를 쓴 선행 연구(Edge et al., 2024)에 대해 저자는 두 한계를 든다. 첫째, 지식 그래프의 동적 갱신과 확장 능력이 부족해 새 정보를 넣기 어렵다. 둘째, 생성된 community마다 brute-force 검색에 의존해 대규모 질의에 비효율적이다.

### 6.2 Large Language Model for Graphs

| 분류 | 방식 | 예시 |
|---|---|---|
| GNNs as Prefix | GNN이 구조 인식 토큰을 만들어 LLM에 넣는다 | GraphGPT (Tang et al., 2024), LLaGA (Chen et al., 2024) |
| LLMs as Prefix | LLM이 그래프의 텍스트를 처리해 임베딩이나 레이블을 만들고 이것으로 GNN 학습을 다듬는다 | GALM (Xie et al., 2023), OFA (Liu et al., 2024) |
| LLMs-Graphs Integration | 융합 학습, GNN 정렬, LLM 기반 에이전트로 그래프를 직접 다룬다 | Grenade (Li et al., 2023), Congrat (Brannon et al., 2023) |

LightRAG는 이 세 분류 어디에도 들어가지 않는다. GNN을 쓰지 않고 LLM을 그래프 구축과 검색의 도구로만 쓴다.

## 7. 용어집 (Glossary)

- **Graph-based RAG**: 지식 그래프 구조를 인덱스로 쓰는 RAG. 기존 RAG의 평면적 chunk 벡터 인덱스와 대비된다.
- **Key-Value Indexing (LightRAG)**: entity와 relation을 (key, value) 쌍 문자열로 직렬화하는 인덱싱. key는 검색용 단어나 짧은 구, value는 생성에 쓸 요약 문단이다. Entity는 이름 하나가 key이고 relation은 global theme에서 온 key를 여러 개 가질 수 있다.
- **Dual-level Retrieval (LightRAG)**: 질의를 분류하지 않고 low-level 키워드와 high-level 키워드를 동시에 뽑아 각각 entity 인덱스와 relation 인덱스에 매칭하는 검색 방식.
- **Low-level Retrieval / High-level Retrieval**: 각각 특정 entity의 속성과 관계를 정밀하게 가져오는 층과, 여러 entity에 걸친 상위 개념과 요약을 다루는 층.
- **LLM Profiling (Prof)**: LLM이 entity와 relation의 description과 global 키워드를 합성해 key-value 쌍을 만드는 단계.
- **Deduplication (Dedupe)**: 서로 다른 chunk에서 나온 동일 entity와 relation을 병합해 그래프 크기를 줄이는 단계.
- **Incremental Update**: 새 데이터를 기존 지식 그래프에 합집합으로 합치는 알고리즘. GraphRAG의 community 재구축 비용을 없앤다.
- **gleaning parameter**: entity와 relation 추출을 몇 번 더 반복해 놓친 것을 줍는지 정하는 값. 이 실험에서는 GraphRAG와 LightRAG 모두 1로 고정했다.
- **UltraDomain**: 대학 교재 428권에서 뽑은 18개 도메인 코퍼스(Qian et al., 2024). graph-based RAG 평가에 널리 쓰인다.
- **Open-ended QA (GraphRAG 방식)**: 사용자 5명과 과제 5개와 질문 5개 구조로 LLM이 자동 생성한 질문에 대해 LLM judge가 페어와이즈로 판정하는 평가.
- **Comprehensiveness / Diversity / Empowerment / Overall**: open-ended QA의 네 평가 항목. 각각 질문의 모든 측면을 다루는 정도, 관점의 다양성, 독자의 이해와 판단을 돕는 정도, 앞 셋의 종합이다.

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 4 | "LightRAG 전체 아키텍처. 인덱싱과 dual-level retrieval 두 부분" | caption-region | ★ wiki 권장 (architecture) |
| fig02 | 12 | "질의 하나가 처리되는 전 과정 예시" | caption-region | ★ wiki 권장 (method) |
| fig03 | 13 | "그래프 구축 프롬프트" | caption-region | ★ wiki 권장 (method) |
| fig04 | 13 | "질문 생성 프롬프트" | caption-region | (본문 표로 대체) |
| fig05 | 14 | "키워드 추출 프롬프트" | caption-region | ★ wiki 권장 (method) |
| fig06 | 14 | "평가 프롬프트" | caption-region | ★ wiki 권장 (evaluation) |
| tab01 | 6 | "baseline 대비 LightRAG 승률" | table-region | (본문 표로 대체, 크롭 상하 잘림) |
| tab02 | 7 | "ablation 변형의 승률" | table-region | (본문 표로 대체, 크롭 하단 잘림) |
| tab03 | 7 | "Legal 데이터셋 비용 비교" | table-region | (본문 표로 대체) |
| tab04 | 10 | "데이터셋 통계" | table-region | (본문 표로 대체) |
| tab05 | 11 | "문서 삽입 시간과 저장 공간이 한 크롭에 섞임" | table-region | (본문 표로 대체, 크롭 정확도 낮음) |
| tab06 | 11 | "tab05와 동일 영역의 중복 크롭" | table-region | (사용 불가) |
| tab07 | 11 | "최종 저장 공간 사용량" | table-region | (본문 표로 대체) |
| tab08 | 15 | "NaiveRAG와의 정성 비교" | table-region | (본문 서술로 대체) |
| tab09 | 16 | "GraphRAG와의 정성 비교" | table-region | (본문 서술로 대체) |
