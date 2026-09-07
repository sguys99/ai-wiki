---
title: "RAG-Anything: All-in-One RAG Framework"
type: paper
year: 2025
category: database
raw_path: raw/papers/guo-2025-rag-anything-all-in-one-rag.pdf
raw_filename: "guo-2025-rag-anything-all-in-one-rag.pdf"
source_collection: external
authors: "Zirui Guo, Xubin Ren, Lingrui Xu, Jiahao Zhang, Chao Huang"
arxiv_id: "2510.12323"
url: "https://github.com/HKUDS/RAG-Anything"
tags: [multimodal-rag, rag, knowledge-graph, dual-graph, hybrid-retrieval, document-qa, vlm, paper]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/guo-2025-rag-anything-all-in-one-rag/fig01.png
    raw: raw/papers/guo-2025-rag-anything-all-in-one-rag-figures/fig01.png
    caption: "RAG-Anything 전체 아키텍처. 왼쪽은 Parallel Parser가 문서를 텍스트, 이미지, 수식, 표 정보로 분해하는 Multimodal Knowledge Unification 단계이고, 가운데는 cross-modal KG와 text-based KG를 각각 만들어 병합하는 Dual-Graph Construction 단계이며, 오른쪽은 질의에서 키를 뽑아 structural navigation과 semantic matching을 병행한 뒤 LLM이 응답을 만드는 단계다"
    page: 4
    bbox_norm: [0.1661, 0.0627, 0.8339, 0.3277]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/guo-2025-rag-anything-all-in-one-rag/fig02.png
    raw: raw/papers/guo-2025-rag-anything-all-in-one-rag-figures/fig02.png
    caption: "문서 길이 구간별 정확도와 QA 쌍 개수. 왼쪽 두 패널이 DocBench, 오른쪽 두 패널이 MMLongBench이고 정확도 선 그래프의 비교 대상은 MMGraphRAG 하나다"
    page: 9
    bbox_norm: [0.1667, 0.0958, 0.8333, 0.2276]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/guo-2025-rag-anything-all-in-one-rag/fig03.png
    raw: raw/papers/guo-2025-rag-anything-all-in-one-rag-figures/fig03.png
    caption: "다중 패널 그림 해석 사례. style space 패널과 content space 패널이 나란히 놓인 t-SNE 그림에서 RAG-Anything만 DAE를 정답으로 맞혔고 나머지 세 방법은 VAE라고 답했다"
    page: 10
    bbox_norm: [0.166, 0.0952, 0.8338, 0.2154]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/guo-2025-rag-anything-all-in-one-rag/fig04.png
    raw: raw/papers/guo-2025-rag-anything-all-in-one-rag-figures/fig04.png
    caption: "재무 표 탐색 사례. Novo Nordisk 사업보고서에서 Wages and salaries 행과 2020 열이 만나는 26,778을 RAG-Anything만 정확히 지목했다"
    page: 10
    bbox_norm: [0.166, 0.347, 0.8462, 0.4579]
    strategy: caption-region
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/guo-2025-rag-anything-all-in-one-rag/fig05.png
    raw: raw/papers/guo-2025-rag-anything-all-in-one-rag-figures/fig05.png
    caption: "막대 그래프 판독 사례. GCAN ablation 그래프에서 정확도가 가장 낮은 구성인 -S-A를 RAG-Anything만 정확히 골랐다"
    page: 13
    bbox_norm: [0.1659, 0.713, 0.8339, 0.8485]
    strategy: caption-region
    curated: false
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/guo-2025-rag-anything-all-in-one-rag/fig06.png
    raw: raw/papers/guo-2025-rag-anything-all-in-one-rag-figures/fig06.png
    caption: "표 탐색 사례. 같은 행 이름이 데이터셋별로 반복되는 표에서 Evidence Inference 구간의 최고 AUPRC 0.506을 RAG-Anything만 찾아냈다"
    page: 14
    bbox_norm: [0.166, 0.2564, 0.8339, 0.3835]
    strategy: caption-region
    curated: false
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/guo-2025-rag-anything-all-in-one-rag/fig07.png
    raw: raw/papers/guo-2025-rag-anything-all-in-one-rag-figures/fig07.png
    caption: "이미지 분석 프롬프트. 주변 컨텍스트를 함께 입력하고 detailed_description과 entity_info를 JSON 형식으로 받아낸다"
    page: 15
    bbox_norm: [0.1667, 0.0958, 0.8333, 0.4622]
    strategy: caption-region
    curated: false
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/guo-2025-rag-anything-all-in-one-rag/fig08.png
    raw: raw/papers/guo-2025-rag-anything-all-in-one-rag-figures/fig08.png
    caption: "표 분석 프롬프트. 표 구조, 열 의미, 핵심 수치, 통계 경향을 지정된 항목으로 분해하도록 지시한다"
    page: 15
    bbox_norm: [0.1667, 0.4998, 0.8333, 0.8662]
    strategy: caption-region
    curated: false
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/guo-2025-rag-anything-all-in-one-rag/fig09.png
    raw: raw/papers/guo-2025-rag-anything-all-in-one-rag-figures/fig09.png
    caption: "수식 분석 프롬프트. LaTeX 재기술이 아니라 변수 정의와 연산의 의미, 다른 수식과의 관계를 설명하게 한다"
    page: 16
    bbox_norm: [0.1667, 0.0958, 0.8333, 0.4494]
    strategy: caption-region
    curated: false
  - id: fig10
    label: Figure 10
    kind: figure
    file: assets/guo-2025-rag-anything-all-in-one-rag/fig10.png
    raw: raw/papers/guo-2025-rag-anything-all-in-one-rag-figures/fig10.png
    caption: "정확도 평가 프롬프트. 예상 답과 생성 답을 비교해 0 또는 1의 이진 판정과 짧은 근거를 JSON으로 내게 한다"
    page: 16
    bbox_norm: [0.1667, 0.4549, 0.8333, 0.8303]
    strategy: caption-region
    curated: false
  - id: fig11
    label: Figure 11
    kind: figure
    file: assets/guo-2025-rag-anything-all-in-one-rag/fig11.png
    raw: raw/papers/guo-2025-rag-anything-all-in-one-rag-figures/fig11.png
    caption: "cross-modal 잡음 실패 사례. 아래에서 위로 읽어야 하는 NER 구조도에서 네 방법 모두 순서를 잘못 읽었다"
    page: 17
    bbox_norm: [0.166, 0.4049, 0.8338, 0.5371]
    strategy: caption-region
    curated: false
  - id: fig12
    label: Figure 12
    kind: figure
    file: assets/guo-2025-rag-anything-all-in-one-rag/fig12.png
    raw: raw/papers/guo-2025-rag-anything-all-in-one-rag-figures/fig12.png
    caption: "모호한 표 구조 실패 사례. 병합 셀과 불분명한 열 경계 때문에 네 방법 모두 GEM 행의 값을 잘못 읽었다"
    page: 17
    bbox_norm: [0.1659, 0.5752, 0.834, 0.7047]
    strategy: caption-region
    curated: true
  - id: tab01
    label: Table 1
    kind: table
    file: assets/guo-2025-rag-anything-all-in-one-rag/tab01.png
    raw: raw/papers/guo-2025-rag-anything-all-in-one-rag-figures/tab01.png
    caption: "실험 데이터셋 통계. DocBench와 MMLongBench의 문서 수, 평균 페이지, 평균 토큰, 문서 유형 수, 질문 수를 정리했다"
    page: 7
    bbox_norm: [0.1667, 0.1091, 0.8344, 0.1805]
    strategy: table-region
    curated: false
  - id: tab02
    label: Table 2
    kind: table
    file: assets/guo-2025-rag-anything-all-in-one-rag/tab02.png
    raw: raw/papers/guo-2025-rag-anything-all-in-one-rag-figures/tab02.png
    caption: "DocBench 정확도 비교표. 도메인 5종과 질문 유형 3종, 그리고 전체 정확도를 네 방법에 대해 보여준다"
    page: 8
    bbox_norm: [0.171, 0.1597, 0.829, 0.2835]
    strategy: table-region
    curated: false
  - id: tab03
    label: Table 3
    kind: table
    file: assets/guo-2025-rag-anything-all-in-one-rag/tab03.png
    raw: raw/papers/guo-2025-rag-anything-all-in-one-rag-figures/tab03.png
    caption: "MMLongBench 정확도 비교표. 도메인 7종과 전체 정확도를 네 방법에 대해 보여준다"
    page: 8
    bbox_norm: [0.1711, 0.3512, 0.8289, 0.4777]
    strategy: table-region
    curated: false
  - id: tab04
    label: Table 4
    kind: table
    file: assets/guo-2025-rag-anything-all-in-one-rag/tab04.png
    raw: raw/papers/guo-2025-rag-anything-all-in-one-rag-figures/tab04.png
    caption: "DocBench ablation 결과표. Chunk-only 변형과 w/o Reranker 변형을 전체 모델과 나란히 비교한다"
    page: 9
    bbox_norm: [0.1711, 0.3007, 0.829, 0.4111]
    strategy: table-region
    curated: false
  - id: tab05
    label: Table 5
    kind: table
    file: assets/guo-2025-rag-anything-all-in-one-rag/tab05.png
    raw: raw/papers/guo-2025-rag-anything-all-in-one-rag-figures/tab05.png
    caption: "DocBench 문서 유형별 분포. 유형 5종의 문서 수, 질문 수, 평균 페이지를 담았다"
    page: 13
    bbox_norm: [0.3113, 0.3094, 0.6887, 0.3929]
    strategy: table-region
    curated: false
  - id: tab06
    label: Table 6
    kind: table
    file: assets/guo-2025-rag-anything-all-in-one-rag/tab06.png
    raw: raw/papers/guo-2025-rag-anything-all-in-one-rag-figures/tab06.png
    caption: "MMLongBench 문서 유형별 분포. 유형 7종의 문서 수, 질문 수, 평균 페이지를 담았다"
    page: 13
    bbox_norm: [0.2492, 0.4237, 0.7508, 0.5072]
    strategy: table-region
    curated: false
---

## 한 줄 요약 (One-line Summary)

RAG-Anything(Guo et al., arXiv 2510.12323, 2025-10-14)은 텍스트뿐 아니라 이미지, 표, 수식까지 같은 등급의 지식 단위로 다루는 통합 multimodal RAG 프레임워크다. 비텍스트 단위를 anchor 노드로 삼는 cross-modal knowledge graph와 기존 방식의 text-based knowledge graph를 따로 만든 뒤 entity name으로 병합하는 dual-graph construction, 그리고 그래프 구조 탐색과 임베딩 유사도 검색을 함께 쓰는 cross-modal hybrid retrieval이 두 가지 핵심이다. DocBench 전체 정확도 63.4%로 MMGraphRAG 61.0%, LightRAG 58.4%, GPT-4o-mini 51.2%를 앞섰고 MMLongBench에서도 42.8%로 38.9%, 37.7%, 33.5%를 앞섰다. 100페이지가 넘는 문서에서는 MMGraphRAG와의 격차가 13%p 이상으로 커진다. Ablation에서 그래프 구축이 2.4%p, reranker가 1.0%p를 기여했다.

## 1. 자료 정보 (Document Information)

- **제목**: RAG-Anything: All-in-One RAG Framework
- **저자**: Zirui Guo, Xubin Ren, Lingrui Xu, Jiahao Zhang, Chao Huang (The University of Hong Kong)
- **교신저자**: Chao Huang (chaohuang75@gmail.com). 제1저자 연락처는 zrguo101@hku.hk다.
- **arXiv**: 2510.12323v1 [cs.AI], 2025-10-14 제출
- **PDF**: `raw/papers/guo-2025-rag-anything-all-in-one-rag.pdf` (18페이지, 본문 11페이지와 Appendix A.1~A.5)
- **오픈소스**: https://github.com/HKUDS/RAG-Anything (논문 abstract에 명시)
- **계보**: 같은 연구실의 LightRAG(Guo et al., 2024) 후속작이다. 본문은 text-based KG를 "LightRAG와 GraphRAG(Edge et al., 2024)에서 확립된 방법론과 유사한 방식으로" 구성한다고만 적었고, LightRAG 구현을 그대로 가져다 쓴다는 서술은 없다. LightRAG의 학회 게재 정보(Findings of ACL: EMNLP 2025)는 이 논문이 아니라 [[database/guo-2025-lightrag-simple-and-fast]] 페이지의 근거다.

## 2. 주요 기여 (Key Contributions)

논문은 multimodal RAG의 기술 과제를 세 가지로 정리하고(2절 Technical Challenges), 각각에 대응하는 설계를 제시한다.

| 저자가 정의한 과제 | 내용 | 대응 설계 |
|---|---|---|
| Unified Multimodal Representation | 서로 다른 정보 유형을 고유 특성과 상호 관계를 잃지 않고 통합해야 한다 | Multimodal Knowledge Unification |
| Structure-Aware Decomposition | 복잡한 레이아웃을 공간적, 계층적 관계를 유지한 채 파싱해야 한다 | 모달리티별 전용 파서와 atomic unit 추상화 |
| Cross-Modal Retrieval | 모달리티 사이를 오가며 상호 연결 위에서 추론하는 검색이 필요하다 | Cross-Modal Hybrid Retrieval |

1. **Multimodal Knowledge Unification**: 각 지식 원본 `k_i`를 atomic content unit 열 `{c_j = (t_j, x_j)}`로 분해한다. `t_j`는 모달리티 유형(text, image, table, equation 등)이고 `x_j`는 그 원본 내용이다. 그림은 캡션에, 수식은 주변 정의에, 표는 설명 문단에 결속된 상태를 유지한다.
2. **Dual-Graph Construction**: 단일 통합 그래프를 바로 만들면 모달리티 고유의 구조 신호를 놓친다는 문제의식에서 두 그래프를 따로 만든 뒤 병합한다.
3. **Cross-Modal Hybrid Retrieval**: structural knowledge navigation과 semantic similarity matching을 병렬로 수행하고 multi-signal fusion으로 재랭킹한다.
4. **Dereferencing 기반 합성**: 검색 단계에서는 시각 자료의 텍스트 대리 표현을 쓰고, 합성 단계에서 원본 시각 자료를 복원해 VLM에 함께 입력한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 Multimodal Knowledge Unification

Parallel Parser가 입력 문서를 atomic unit 열로 분해한다. 유형별 처리는 다음과 같다.

| 모달리티 | 처리 이름 | 산출 |
|---|---|---|
| 텍스트 | Hierarchical Text Extraction | 의미 단위 문단과 목록 항목 |
| 이미지 | Image Caption & Metadata Extraction | 캡션과 상호 참조를 포함한 메타데이터 |
| 수식 | LaTeX Equation Recognition | 기호 표현 |
| 표 | Table Structure & Content Parsing | 헤더와 값이 구분된 구조화 셀 |

이 분해는 파일 포맷의 차이를 흡수해 모달리티 일관 표현으로 정규화한다. Figure 1은 입력으로 PPT, DOC, JPG, PNG, XLS, PDF를 나열한다.

### 3.2 Cross-Modal Knowledge Graph

비텍스트 단위 `c_j`마다 multimodal large language model이 두 가지 텍스트 표현을 만든다.

- `d_chunk_j`: cross-modal retrieval에 최적화된 상세 서술
- `e_entity_j`: entity name, type, description을 담은 그래프 구축용 요약

생성은 컨텍스트를 함께 본다. 지역 이웃 `C_j = {c_k | |k - j| <= δ}`를 함께 입력하며 `δ`가 컨텍스트 윈도우 크기를 정한다.

그다음 비텍스트 단위를 anchor로 삼아 그래프를 만든다. 추출 루틴 `R(·)`이 `d_chunk_j`에서 세부 엔티티와 관계를 뽑는다.

- `(V_j, E_j) = R(d_chunk_j)`
- `Ṽ = {v_mm_j}_j ∪ ⋃_j V_j`
- `Ẽ = ⋃_j E_j ∪ ⋃_j {(u -belongs_to-> v_mm_j) : u ∈ V_j}`

`v_mm_j`가 각 비텍스트 단위를 대표하는 multimodal entity node이고, 그 안에서 추출된 엔티티들이 `belongs_to` 엣지로 anchor에 묶인다.

### 3.3 Text-Based Knowledge Graph

`t_j = text`인 청크에 대해서는 named entity recognition과 relation extraction으로 전통적 text KG를 만든다. 논문은 이 부분이 LightRAG와 GraphRAG에서 확립된 방법론과 유사하다고 밝히고, 텍스트는 이미 의미 정보가 풍부하므로 multimodal 컨텍스트 통합이 필요 없다고 적었다.

### 3.4 Graph Fusion and Index Creation

- **Entity Alignment and Graph Fusion**: entity name을 1차 매칭 키로 삼아 두 그래프에서 의미가 같은 엔티티를 찾아 통합해 `G = (V, E)`를 만든다.
- **Dense Representation Generation**: 모든 엔티티, 관계, 청크를 인코딩해 임베딩 테이블 `T = {emb(s) : s ∈ V ∪ E ∪ {c_j}_j}`를 만든다.
- 최종 검색 인덱스는 `I = (G, T)`다.

### 3.5 Cross-Modal Hybrid Retrieval

- **Modality-Aware Query Encoding**: 질의 `q`에서 어휘 단서와 모달리티 선호를 추출한다. 논문이 든 예시는 "figure", "chart", "table", "equation"이 들어간 질의다. 동시에 인덱싱과 같은 encoder로 통합 임베딩 `e_q`를 만든다.
- **Structural Knowledge Navigation**: 키워드 매칭과 엔티티 인식으로 그래프 구성 요소를 찾고, 질의어와의 정확 매칭에서 출발해 지정된 hop 거리 안에서 이웃을 확장한다. 결과가 `C_stru(q)`다.
- **Semantic Similarity Matching**: `e_q`와 `T`의 모든 구성 요소 사이에서 dense vector 유사도 검색을 수행하고, 코사인 유사도 상위 k개 청크 `C_seman(q)`를 돌려준다.
- **Candidate Pool Unification**: `C(q) = C_stru(q) ∪ C_seman(q)`로 후보를 모은다.
- **Multi-Signal Fusion Scoring**: 그래프 위상에서 나온 구조 중요도, 임베딩 공간의 의미 유사도, 어휘 분석으로 추론한 모달리티 선호 세 신호를 결합해 최종 순위 `C*(q)`를 정한다.

### 3.6 From Retrieval to Synthesis

- **Building Textual Context**: 상위 후보 `C*(q)`의 텍스트 표현을 이어 붙여 구조화 컨텍스트 `P(q)`를 만든다. entity summary, relationship description, chunk content가 모두 들어가며 모달리티 유형과 계층 출처를 나타내는 구분자를 삽입한다.
- **Recovering Visual Content**: 시각 자료에 대응하는 multimodal 청크는 dereferencing으로 원본 시각 자료 `V*(q)`를 복원한다. 텍스트 대리 표현이 검색 효율을 맡고 원본 시각 자료가 합성 시점의 의미 충실도를 맡는 분업이다.
- 최종 생성은 `Response = VLM(q, P(q), V*(q))`다.

### 3.7 실험 구현 설정

| 항목 | 값 |
|---|---|
| backbone LLM (모든 baseline 공통) | GPT-4o-mini |
| 문서 파서 | MinerU (Wang et al., 2024) |
| 임베딩 모델 | text-embedding-3-large, 3072차원 |
| reranker | bge-reranker-v2-m3 |
| 그래프 기반 방법의 entity와 relation 합산 토큰 한도 | 20,000 토큰 |
| 청크 토큰 한도 | 12,000 토큰 |
| 출력 형식 제약 | 한 문장 |
| GPT-4o-mini baseline 입력 | 문서를 최대 50페이지까지 144 dpi 이미지로 이어 붙여 입력 |
| 정확도 판정 | GPT-4o-mini judge |

Appendix A.4의 평가 프롬프트는 정확도를 0 또는 1의 이진값으로 판정하고 짧은 근거를 함께 JSON으로 내게 한다. 판정 지침에는 문체가 아니라 사실 정합성만 보고, 정답 정보를 담은 채 부가 설명이 붙은 답은 정확한 것으로 인정하며, 예상 답이 "Not answerable"이고 생성 답이 답할 수 없다는 취지면 정확으로 처리한다는 규칙이 들어 있다.

### 3.8 Appendix A.3의 모달리티별 프롬프트

| 프롬프트 | 요구 항목 | 반환 |
|---|---|---|
| Vision Analysis (Figure 7) | 전체 구도와 배치, 객체와 텍스트, 요소 사이 관계, 색과 조명, 동작, 차트 같은 기술 요소, 주변 내용과의 연결. 대명사 대신 고유명 사용 | `detailed_description`과 `entity_info`(entity_name, entity_type, summary 100단어 이내) |
| Table Analysis (Figure 8) | 표 구조와 구성, 열 헤더의 의미, 핵심 데이터와 패턴, 통계 경향, 데이터 요소 간 관계, 주변 컨텍스트에서의 의의 | 같은 JSON 구조, entity_type은 table |
| Equation Analysis (Figure 9) | 수학적 의미, 변수 정의, 연산과 함수, 적용 도메인, 이론적 의의, 다른 수식과의 관계, 실제 활용 | 같은 JSON 구조, entity_type은 equation |

세 프롬프트 모두 `{context}` 자리에 주변 내용을 함께 넣어 컨텍스트를 반영한 해석을 요구한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 데이터셋 (Table 1)

| Dataset | 문서 수 | 평균 페이지 | 평균 토큰 | 문서 유형 수 | 질문 수 |
|---|---|---|---|---|---|
| DocBench (Zou et al., 2024) | 229 | 66 | 46,377 | 5 | 1,102 |
| MMLongBench (Ma et al., 2024) | 135 | 47.5 | 21,214 | 7 | 1,082 |

DocBench 도메인은 Academia, Finance, Government, Laws, News 다섯이고 질문은 전문가가 작성했다. MMLongBench는 장문 multimodal 문서 이해에 초점을 둔 7개 유형 벤치마크다.

### 4.2 문서 유형별 분포 (Table 5, Table 6)

DocBench:

| 유형 | Acad. | Fin. | Gov. | Law. | News |
|---|---|---|---|---|---|
| 문서 수 | 49 | 40 | 44 | 46 | 50 |
| 질문 수 | 303 | 288 | 148 | 191 | 172 |
| 평균 페이지 | 11 | 192 | 69 | 58 | 1 |

MMLongBench:

| 유형 | Res. | Tut. | Acad. | Guid. | Broch. | Admin. | Fin. |
|---|---|---|---|---|---|---|---|
| 문서 수 | 34 | 17 | 26 | 22 | 15 | 10 | 11 |
| 질문 수 | 292 | 138 | 199 | 155 | 100 | 81 | 117 |
| 평균 페이지 | 39 | 58 | 35 | 78 | 30 | 17 | 87 |

저자 서술은 DocBench의 금융 보고서가 평균 192페이지로 가장 길고 News가 1페이지 신문 기사라는 점, MMLongBench는 연구 보고서와 튜토리얼과 학술 논문이 평균 35~58페이지이고 안내서가 약 78페이지, 브로슈어와 행정 문서가 상대적으로 짧으며 금융 보고서가 다시 가장 길다는 점을 짚는다.

### 4.3 Baseline

| Baseline | 성격 | 논문이 지적한 한계 |
|---|---|---|
| GPT-4o-mini | 텍스트와 이미지를 함께 이해하는 모델. 128K 토큰 context window로 문서 전체를 직접 처리 | 검색 구조가 없다 |
| LightRAG (Guo et al., 2024) | 구조화 지식 표현과 dual-level retrieval을 결합한 graph 기반 RAG | 텍스트 전용 처리로 제한된다 |
| MMGraphRAG (Wan & Yu, 2025) | 텍스트와 시각 내용을 아우르는 통합 KG. multimodal 엔티티 분석에 spectral clustering을 쓰고 추론 경로를 따라 컨텍스트를 검색 | 기본적인 이미지 처리만 더했을 뿐 표와 수식을 plain text로 취급해 구조 정보를 잃는다 |

### 4.4 DocBench 정확도 (%, Table 2)

| Method | Aca. | Fin. | Gov. | Law. | News | Txt. | Mm. | Una. | Overall |
|---|---|---|---|---|---|---|---|---|---|
| GPT-4o-mini | 40.3 | 46.9 | 60.3 | 59.2 | 61.0 | 61.0 | 43.8 | 49.6 | 51.2 |
| LightRAG | 53.8 | 56.2 | 59.5 | 61.8 | 65.7 | 85.0 | 59.7 | 46.8 | 58.4 |
| MMGraphRAG | 64.3 | 52.8 | 64.9 | 40.0 | 61.5 | 67.6 | 66.0 | 60.5 | 61.0 |
| RAG-Anything | 61.4 | 67.0 | 61.5 | 60.2 | 66.3 | 85.0 | 76.3 | 46.0 | 63.4 |

전체 정확도는 RAG-Anything이 가장 높지만 세부 항목은 갈린다. RAG-Anything이 1위인 항목은 Fin., News, Txt.(LightRAG와 동률 85.0), Mm.이고, Aca.와 Gov.는 MMGraphRAG가, Law.는 LightRAG가, Una.는 MMGraphRAG가 1위다. 특히 답할 수 없는 질문(Una.) 항목에서 RAG-Anything의 46.0은 네 방법 중 가장 낮다.

### 4.5 MMLongBench 정확도 (%, Table 3)

| Method | Res. | Tut. | Acad. | Guid. | Broch. | Admin. | Fin. | Overall |
|---|---|---|---|---|---|---|---|---|
| GPT-4o-mini | 35.5 | 44.0 | 24.6 | 33.1 | 29.5 | 46.8 | 31.1 | 33.5 |
| LightRAG | 40.8 | 34.1 | 36.2 | 39.4 | 41.0 | 44.4 | 38.3 | 38.9 |
| MMGraphRAG | 40.8 | 36.5 | 35.7 | 35.8 | 28.2 | 46.9 | 38.5 | 37.7 |
| RAG-Anything | 46.6 | 43.5 | 38.7 | 43.9 | 34.0 | 45.7 | 43.6 | 42.8 |

여기서도 Tut.은 GPT-4o-mini(44.0), Broch.는 LightRAG(41.0), Admin.은 MMGraphRAG(46.9)가 1위다. 저자는 정보 밀도가 높은 Research Reports와 Financial Reports에서 최고 성능을 얻었다는 점을 강조한다.

### 4.6 문서 길이별 성능 (Figure 2)

Figure 2는 DocBench와 MMLongBench 각각에 대해 정확도 선 그래프와 QA 쌍 개수 막대 그래프를 나란히 놓았고, 정확도 비교 대상은 MMGraphRAG 하나다.

| 벤치마크 | 구간 | RAG-Anything | MMGraphRAG | 차이 |
|---|---|---|---|---|
| DocBench | 101~200 페이지 | 68.2% | 54.6% | 13.6%p |
| DocBench | 200페이지 초과 | 68.8% | 55.0% | 13.8%p |
| MMLongBench | 11~50 페이지 | 명시 없음 | 명시 없음 | 3.4%p |
| MMLongBench | 51~100 페이지 | 명시 없음 | 명시 없음 | 9.3%p |
| MMLongBench | 101~200 페이지 | 명시 없음 | 명시 없음 | 7.9%p |

짧은 문서에서는 두 방법이 비슷하고 길이가 늘수록 격차가 커진다는 것이 저자의 관찰이다. Figure 2의 QA 개수 막대는 DocBench가 1~10페이지 약 340개, 11~50페이지 약 350개, 51~100페이지 약 160개, 101~200페이지 약 155개, 200페이지 초과 약 80개이고, MMLongBench는 11~50페이지 약 700개에 몰려 있으며 200페이지 초과 구간은 거의 비어 있다.

### 4.7 Ablation (DocBench, Table 4)

| 변형 | Aca. | Fin. | Gov. | Law. | News | Txt. | Mm. | Una. | Overall |
|---|---|---|---|---|---|---|---|---|---|
| Chunk-only | 55.8 | 61.5 | 60.1 | 60.7 | 64.0 | 81.6 | 66.2 | 43.5 | 60.0 |
| w/o Reranker | 60.9 | 63.5 | 58.8 | 60.2 | 68.6 | 81.7 | 74.7 | 45.4 | 62.4 |
| RAG-Anything | 61.4 | 67.0 | 61.5 | 60.2 | 66.3 | 85.0 | 76.3 | 46.0 | 63.4 |

Chunk-only는 dual-graph construction을 건너뛰고 전통적 청크 검색만 쓰는 변형이고, w/o Reranker는 cross-modal reranking만 제거하고 그래프 구조는 유지한 변형이다. 그래프 구축이 2.4%p, reranking이 1.0%p를 기여했다. 저자는 이를 "그래프 구축이 필수이고 reranking은 개선폭이 작다"로 정리한다.

멀티모달 질문(Mm.) 항목의 변화폭이 특히 크다. Chunk-only 66.2%에서 전체 모델 76.3%로 10.1%p 오르는데, 이는 Overall 상승폭 3.4%p의 3배에 가깝다. News 항목은 w/o Reranker가 68.6%로 전체 모델의 66.3%보다 높다.

### 4.8 사례 연구 (본문 3.4절)

**Case 1, 다중 패널 그림 해석 (Figure 3)**: Yelp 데이터의 t-SNE 그림에서 style space 패널과 content space 패널을 구분해야 하는 질의다. 정답은 DAE인데 GPT-4o-mini, MMGraphRAG, LightRAG 셋 다 VAE라고 답했고 RAG-Anything만 DAE를 맞혔다. RAG-Anything은 패널, 축 제목, 범례, 캡션을 노드로 두는 시각 레이아웃 그래프를 만들고 패널이 특정 플롯을 담는다는 관계, 캡션이 맥락을 제공한다는 관계, 부그림 사이의 계층 관계를 엣지로 표현한다.

**Case 2, 재무 표 탐색 (Figure 4)**: Novo Nordisk의 2020년 임금 총액을 묻는 질의다. 정답은 DKK 26,778백만이고 GPT-4o-mini는 32,928백만, MMGraphRAG와 LightRAG는 둘 다 11,503백만으로 답했다. RAG-Anything은 행 헤더, 열 헤더(연도), 데이터 셀, 단위를 각각 노드로 두고 `row-of`, `column-of`, `header-applies-to`, `unit-of` 엣지로 잇는다. 이 구조가 "Share-based payments" 같은 인접 항목과의 혼동을 막았다.

저자의 정리는 MMGraphRAG가 이미지 모달리티 엔티티만 다루고 표 셀, 행 헤더, 열 헤더 같은 다른 모달리티 엔티티를 무시해서 실패한다는 것이다.

### 4.9 Appendix A.2의 추가 사례

| 사례 | 질의 | 정답 | 결과 |
|---|---|---|---|
| Figure 5, 막대 그래프 판독 | Twitter15에서 정확도가 가장 낮은 GCAN sub-model 구성 | `-S-A` (source tweet embedding과 dual co-attention 동시 제거) | RAG-Anything만 정답. bar-of와 label-applies-to 엣지로 막대와 라벨을 연결했다 |
| Figure 6, 표 탐색 | Evidence Inference 데이터셋에서 AUPRC가 가장 높은 모델 조합 | GloVe + LSTM - Attention, 0.506 | RAG-Anything만 정답. GPT-4o-mini는 0.455, MMGraphRAG는 0.708, LightRAG는 0.429로 오답 |

## 5. 한계와 향후 과제 (Limitations and Future Work)

### 5.1 저자가 밝힌 failure mode (Appendix A.5)

1. **Text-Centric Retrieval Bias**: 질의가 명시적으로 시각 정보를 요구해도 텍스트 자료를 우선 검색한다. 시각 내용에 정확한 키워드가 없을 때 특히 두드러진다. 검색된 텍스트는 주제상 관련이 있어도 시각 자료와 세밀도 수준이 달라서, 이미지가 담은 정확한 수치나 공간 관계를 개념적 서술이 대체하지 못한 채 잡음으로 작용한다.
2. **Rigid Spatial Processing**: 시각 처리 모델이 위에서 아래로, 왼쪽에서 오른쪽으로 훑는 순서를 기본값으로 삼는다. 표는 열 방향 해석이, 기술 도해는 특정 방향 흐름이, 학술 그림은 예상 밖 위치의 주석 해석이 필요한데 이 요구에 적응하지 못한다.

두 실패 사례는 그림으로 함께 제시된다. Figure 11은 아래에서 위로 읽어야 하는 NER 구조도로, 네 방법 모두 순서를 틀렸다. Figure 12는 GEM 행에 셀 경계가 없고 Joint 열과 Slot 열이 구분 없이 병합된 표로, 네 방법 모두 값을 잘못 읽었다.

저자가 제시한 향후 방향은 adaptive spatial reasoning과 layout-aware parsing 강화, 그리고 시각 처리 능력 통합으로 잡음 내성을 높이는 것이다.

### 5.2 논문이 다루지 않은 항목

- **인덱싱 비용**: dual-graph 구축은 비텍스트 atomic unit마다 MLLM 호출을 요구하지만, 논문에는 인덱싱 시간, 토큰 소비, 비용을 baseline과 비교한 측정이 없다. latency라는 단어 자체가 본문에 등장하지 않는다.
- **backbone 다양성**: 모든 실험이 GPT-4o-mini 하나로 통일되어 있어 오픈소스 LLM이나 VLM에서의 재현성은 검증되지 않았다.
- **judge 편향**: 응답 생성과 정확도 판정에 같은 GPT-4o-mini를 쓴다. 저자는 판정 일관성을 근거로 들지만 self-judge 편향에 대한 검토는 없다.
- **평가 형식**: 두 벤치마크 모두 정답이 있는 QA 쌍 기반이고 출력은 한 문장으로 제약된다. 자유 형식 응답 품질은 평가 범위 밖이다.
- **δ, hop 거리, top-k, fusion 가중치**: 컨텍스트 윈도우 크기 `δ`, neighborhood expansion의 hop 거리, semantic matching의 k, multi-signal fusion의 신호별 가중치 산식이 모두 수치로 명시되지 않는다.

### 5.3 자료 자체의 내적 모순

- **평균 페이지 수 불일치**: Table 1은 DocBench 평균 66페이지라고 적었지만, Table 5의 유형별 문서 수와 평균 페이지로 가중평균을 내면 (49×11 + 40×192 + 44×69 + 46×58 + 50×1) / 229 = 61.0페이지다. MMLongBench는 Table 1이 47.5페이지, Table 6 기준 가중평균이 48.3페이지로 근사한다.
- **Figure 12의 질문 문구 오류**: Figure 12에 적힌 질문은 "Which model's style space shows a clearer separation between different styles according to Figure 2?"로 Figure 3의 질문과 같다. 그러나 같은 그림 안의 네 응답과 A.5 본문 서술은 모두 GEM fine-tuning의 Joint goal accuracy를 다룬다. 질문 라벨이 잘못 복사된 것으로 보인다.
- **failure mode 명칭 흔들림**: 5절 결론은 두 번째 실패 유형을 "rigid spatial processing patterns"라 부르고, A.5의 요약 불릿은 "Document Structure Processing Challenges", 그 아래 Issue 2는 다시 "Rigid Spatial Processing Patterns"로 적는다.
- **1절 문단 중복**: 1절에 "The consequences of this limitation become particularly severe in ... domains where multimodal content carries essential meaning."이 document-intensive와 knowledge-intensive만 바꾼 채 두 번 나온다.

## 6. 관련 연구 (Related Work)

논문은 4절에서 선행 연구를 두 흐름으로 정리한다.

**Graph-Enhanced RAG**: GraphRAG(Edge et al., 2024) 이후 두 방향으로 갈라졌다고 본다. 첫째는 검색 효율을 위해 구조를 최적화하는 그래프 구축 계열로 LightRAG의 희소화 인덱스, GNN-RAG(Mavromatis & Karypis, 2024) 같은 신경망 모델, HippoRAG(Jimenez Gutierrez et al., 2024) 같은 메모리 강화 변형이 여기 속한다. 둘째는 다층 추론을 위해 정보를 집계하는 계열로 RAPTOR(Sarthi et al., 2024)와 ArchRAG(Wang et al., 2025)가 해당한다. 저자는 두 계열 모두 텍스트 중심이고 입력이 동질적이라는 한계를 공유한다고 지적하며, RAG-Anything을 "GraphRAG를 모든 모달리티로 확장한 작업"으로 위치 짓는다.

**Multimodal RAG**: 모달리티별 전용 아키텍처 의존이 공통 제약이라고 본다.

| 선행 연구 | 접근 | 논문이 지적한 한계 |
|---|---|---|
| VideoRAG (Ren et al., 2025) | 비디오 이해를 위한 dual-channel 구조 | 모달리티 특화 구조 의존 |
| MM-VID (Lin et al., 2023) | 비디오를 텍스트로 변환 | 시각 정보 손실 |
| VisRAG (Yu et al., 2025) | 문서 레이아웃을 이미지로 보존 | 세밀한 관계 누락 |
| MMGraphRAG (Wan & Yu, 2025) | scene graph와 텍스트 표현을 연결 | 표와 수식을 plain text로 처리하는 구조적 맹점 |

저자는 이 제약의 근원을 architectural fragmentation으로 지목한다. 모달리티마다 전용 파이프라인이 필요하면 새 모달리티가 등장할 때마다 구조와 융합 방식을 새로 만들어야 하고, 그 과정에서 cross-modal alignment 난이도, 모달리티 편향, 정보 병목이 생긴다는 논지다.

서베이로는 Abootorabi et al.(2025)의 multimodal RAG 서베이, Zhang et al.(2025)의 graph RAG 서베이, Bei et al.(2025)의 그래프와 AI 에이전트 taxonomy를 인용한다.

## 7. 용어집 (Glossary)

- **Atomic content unit `c_j = (t_j, x_j)`**: 문서를 분해한 모달리티 일관 최소 단위. `t_j`가 모달리티 유형이고 `x_j`가 원본 내용이다.
- **Cross-Modal Knowledge Graph**: 비텍스트 단위를 anchor 노드 `v_mm_j`로 두고 그 안에서 추출한 엔티티를 `belongs_to` 엣지로 묶은 그래프.
- **Text-Based Knowledge Graph**: 텍스트 청크에 named entity recognition과 relation extraction을 적용해 만든 전통적 그래프.
- **Dual-Graph Construction**: 위 두 그래프를 따로 만든 뒤 entity name 매칭으로 병합하는 전략. 단일 그래프를 바로 만들 때 모달리티 고유 구조 신호를 놓치는 문제를 피하려는 설계다.
- **Belongs_to edge**: 비텍스트 anchor 노드와 그 내부 엔티티를 잇는 modality grounding 엣지.
- **Modality-Aware Query Encoding**: 질의의 어휘 단서로 모달리티 선호를 추출하는 질의 분석.
- **Structural Knowledge Navigation**: 그래프의 명시적 엣지를 따라 hop 거리 안에서 후보를 모으는 retrieval 경로.
- **Semantic Similarity Matching**: 임베딩 공간의 코사인 유사도로 상위 k개를 뽑는 retrieval 경로.
- **Multi-Signal Fusion Scoring**: 구조 중요도, 의미 유사도, 모달리티 선호 세 신호를 결합한 재랭킹.
- **Dereferencing**: 검색된 multimodal 청크의 텍스트 대리 표현을 원본 시각 자료로 되돌려 VLM에 직접 입력하는 과정.
- **Architectural Fragmentation**: 모달리티마다 별도 파이프라인을 두는 구조가 낳는 파편화. 논문이 기존 multimodal RAG의 근본 문제로 지목한 개념이다.
- **DocBench / MMLongBench**: 각각 다섯 도메인, 일곱 유형의 장문 multimodal 문서 QA 벤치마크.
- **MinerU**: 문서에서 텍스트, 이미지, 표, 수식을 분리 추출하는 오픈소스 파서.

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 4 | "전체 아키텍처. unification, dual-graph, hybrid retrieval 3단" | caption-region | ★ wiki 권장 (architecture) |
| fig02 | 9 | "문서 길이 구간별 정확도와 QA 쌍 개수" | caption-region | ★ wiki 권장 (result) |
| fig03 | 10 | "다중 패널 t-SNE 그림 해석 사례" | caption-region | ★ wiki 권장 (case) |
| fig04 | 10 | "재무 표 탐색 사례" | caption-region | ★ wiki 권장 (case) |
| fig05 | 13 | "막대 그래프 판독 사례" | caption-region | (본문 표로 대체) |
| fig06 | 14 | "표 탐색 사례" | caption-region | (본문 표로 대체) |
| fig07 | 15 | "이미지 분석 프롬프트" | caption-region | (본문 표로 대체) |
| fig08 | 15 | "표 분석 프롬프트" | caption-region | (본문 표로 대체) |
| fig09 | 16 | "수식 분석 프롬프트" | caption-region | (본문 표로 대체) |
| fig10 | 16 | "정확도 평가 프롬프트" | caption-region | (본문 서술로 대체, 크롭 상단에 Figure 9 캡션 혼입) |
| fig11 | 17 | "cross-modal 잡음 실패 사례" | caption-region | (본문 서술로 대체) |
| fig12 | 17 | "모호한 표 구조 실패 사례" | caption-region | ★ wiki 권장 (limitation) |
| tab01 | 7 | "실험 데이터셋 통계" | table-region | (본문 표로 대체, 크롭 상단 캡션 줄 잘림) |
| tab02 | 8 | "DocBench 정확도 비교" | table-region | (본문 표로 대체) |
| tab03 | 8 | "MMLongBench 정확도 비교" | table-region | (본문 표로 대체) |
| tab04 | 9 | "DocBench ablation 결과" | table-region | (본문 표로 대체) |
| tab05 | 13 | "DocBench 문서 유형별 분포" | table-region | (본문 표로 대체) |
| tab06 | 13 | "MMLongBench 문서 유형별 분포" | table-region | (본문 표로 대체) |
