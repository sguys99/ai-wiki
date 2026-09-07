---
title: "[Paper Review] Graph based RAG"
type: video
year: 2026
category: database
raw_path: raw/videos/dsba-2026-paper-review-graph-based-rag.md
raw_filename: "dsba-2026-paper-review-graph-based-rag.md"
supplementary_raw_path: raw/papers/dsba-2026-paper-review-graph-based-rag.pdf
supplementary_raw_filename: "dsba-2026-paper-review-graph-based-rag.pdf"
source_collection: external
channel: "서울대학교 산업공학과 DSBA 연구실"
presenter: "김도윤 (SNU 산업공학과 박사과정)"
url: "https://www.youtube.com/watch?v=QKewUxS1VKI"
duration: "PT53M20S"
upload_date: "2026-05-02"
presentation_date: "2026-04-27"
papers_reviewed:
  - "LightRAG: Simple and Fast Retrieval-Augmented Generation (EMNLP 2025)"
  - "LeanRAG: Knowledge-Graph-Based Generation with Semantic Aggregation and Hierarchical Retrieval (AAAI-26)"
tags: [graph-rag, rag, knowledge-graph, lightrag, leanrag, paper-review, dsba, dual-level-retrieval, hierarchical-clustering, lca, video]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/dsba-2026-paper-review-graph-based-rag/fig01.png
    raw: raw/papers/dsba-2026-paper-review-graph-based-rag-figures/fig01.png
    caption: "Figure 1: graph 기반 RAG의 전반적인 과정. 질의가 G-Retrieval, retrieval 결과, graph format 변환, G-Generation을 거쳐 응답이 된다"
    page: 5
    bbox_norm: [0.1238, 0.3589, 0.8763, 1.0]
    strategy: manual
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/dsba-2026-paper-review-graph-based-rag/fig02.png
    raw: raw/papers/dsba-2026-paper-review-graph-based-rag-figures/fig02.png
    caption: "Figure 2: LightRAG가 지식 그래프를 구축할 때 쓰는 프롬프트 전문. entity와 relationship의 추출 필드가 그대로 적혀 있다"
    page: 7
    bbox_norm: [0.2137, 0.4289, 0.7862, 1.0]
    strategy: manual
    curated: false
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/dsba-2026-paper-review-graph-based-rag/fig03.png
    raw: raw/papers/dsba-2026-paper-review-graph-based-rag-figures/fig03.png
    caption: "Figure 3: 2024년부터 2026년까지의 대표 방법론 연구 흐름. 화살표에 붙은 문구가 앞선 방법론이 지적받은 한계다"
    page: 9
    bbox_norm: [0.0137, 0.0089, 1.0, 1.0]
    strategy: manual
    low_confidence: true
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/dsba-2026-paper-review-graph-based-rag/fig04.png
    raw: raw/papers/dsba-2026-paper-review-graph-based-rag-figures/fig04.png
    caption: "Figure 4: LightRAG 전체 구조. 왼쪽이 graph 기반 텍스트 인덱싱이고 오른쪽이 dual-level retrieval paradigm이다"
    page: 14
    bbox_norm: [0.0338, 0.2989, 0.9862, 0.6711]
    strategy: manual
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/dsba-2026-paper-review-graph-based-rag/fig05.png
    raw: raw/papers/dsba-2026-paper-review-graph-based-rag-figures/fig05.png
    caption: "Figure 5: entity와 relationship을 key-value로 재표현한 예시. 원문 한 문장에서 entity 두 개와 relationship 하나를 뽑아 각각 이름과 설명문 쌍으로 옮긴다"
    page: 16
    bbox_norm: [0.0137, 0.5889, 0.9362, 1.0]
    strategy: manual
    curated: true
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/dsba-2026-paper-review-graph-based-rag/fig06.png
    raw: raw/papers/dsba-2026-paper-review-graph-based-rag-figures/fig06.png
    caption: "Figure 6: Dual-level Retrieval Paradigm. low-level 키워드는 entity에, high-level 키워드는 relation에 매칭되고 그 결과에 출처 원문이 붙는다"
    page: 17
    bbox_norm: [0.1238, 0.5689, 0.8763, 1.0]
    strategy: manual
    curated: true
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/dsba-2026-paper-review-graph-based-rag/fig07.png
    raw: raw/papers/dsba-2026-paper-review-graph-based-rag-figures/fig07.png
    caption: "Figure 7: 실제 질의에서 뽑힌 두 레벨 키워드와 그 결과로 구성된 retrieval context 예시"
    page: 20
    bbox_norm: [0.2238, 0.4789, 0.7763, 1.0]
    strategy: manual
    curated: false
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/dsba-2026-paper-review-graph-based-rag/fig08.png
    raw: raw/papers/dsba-2026-paper-review-graph-based-rag-figures/fig08.png
    caption: "Figure 8: LeanRAG 전체 프레임워크. (a) 지식 그래프 구축, (b) 계층적 의미 집계, (c) inference 세 단계로 나뉜다"
    page: 29
    bbox_norm: [0.0938, 0.3389, 0.9263, 0.8711]
    strategy: manual
    curated: true
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/dsba-2026-paper-review-graph-based-rag/fig09.png
    raw: raw/papers/dsba-2026-paper-review-graph-based-rag-figures/fig09.png
    caption: "Figure 9: LeanRAG의 처리 흐름. 코퍼스를 인덱싱해 계층 그래프를 만들고 질의는 LCA 검색으로 처리한다"
    page: 31
    bbox_norm: [0.1437, 0.4889, 0.8562, 0.7511]
    strategy: manual
    curated: true
  - id: fig10
    label: Figure 10
    kind: figure
    file: assets/dsba-2026-paper-review-graph-based-rag/fig10.png
    raw: raw/papers/dsba-2026-paper-review-graph-based-rag-figures/fig10.png
    caption: "Figure 10: LeanRAG inference 단계 확대. 질의 임베딩과 매칭된 노드에서 시작해 상향식으로 경로를 모아 컨텍스트를 만든다"
    page: 35
    bbox_norm: [0.6287, 0.2589, 0.9963, 0.9311]
    strategy: manual
    curated: false
  - id: fig11
    label: Figure 11
    kind: figure
    file: assets/dsba-2026-paper-review-graph-based-rag/fig11.png
    raw: raw/papers/dsba-2026-paper-review-graph-based-rag-figures/fig11.png
    caption: "Figure 11: 도메인 네 곳의 retrieval 컨텍스트 토큰 소비량 비교. LeanRAG가 가장 적고 LightRAG가 가장 많다"
    page: 39
    bbox_norm: [0.2637, 0.4889, 0.7263, 1.0]
    strategy: manual
    curated: true
---

## 한 줄 요약 (One-line Summary)

DSBA 연구실(서울대학교 산업공학과) 김도윤 박사과정이 2026-04-27에 진행한 53분 세미나로, graph 기반 RAG의 공통 파이프라인과 retrieval 패턴을 먼저 구획한 뒤 LightRAG(EMNLP 2025)와 LeanRAG(AAAI-26) 두 편을 비교한다. 발표자의 결론은 graph retrieval의 설계, 즉 구조 정보를 얼마나 잘 찾아 얼마나 효과적으로 반영하는가와 로컬 정보와 글로벌 정보를 얼마나 잘 융합하는가가 graph 기반 RAG의 성패를 가른다는 것이다.

## 1. 자료 정보 (Document Information)

| 항목 | 값 |
|---|---|
| 제목 | [Paper Review] Graph based RAG |
| 발표자 | 김도윤 (서울대학교 산업공학과 데이터과학 및 비즈니스 애널리틱스 연구실 박사과정) |
| 채널 | 서울대학교 산업공학과 DSBA 연구실 (YouTube) |
| 발표일 | 2026-04-27 (월), 슬라이드 표지 기준 |
| 업로드 | 2026-05-02 |
| 길이 | 53분 20초 |
| 유형 | 논문 세미나 (paper review) |
| 보조 자료 | `raw/papers/dsba-2026-paper-review-graph-based-rag.pdf` (슬라이드 45장) |

다룬 논문은 두 편이다.

1. LightRAG: Simple and Fast Retrieval-Augmented Generation (EMNLP 2025). 저장소 대응 페이지는 `sources/guo-2025-lightrag-simple-and-fast.md`.
2. LeanRAG: Knowledge-Graph-Based Generation with Semantic Aggregation and Hierarchical Retrieval (AAAI-26). 저장소 대응 페이지는 `sources/zhang-2026-leanrag-knowledge-graph-based-generation.md`.

발표자는 서두에서 이전 세미나 두 편을 선행 자료로 지목한다. 하나는 GraphRAG를 다룬 세미나이고 다른 하나는 GNN4NLP라는 부제를 단 세미나다. 슬라이드 4장은 GraphRAG를 "Graph-based RAG의 서막"으로 배치하고 원논문을 "From Local to Global: A GraphRAG Approach to Query-Focused Summarization, Darren Edge and Ha Trinh et al., 2024 arxiv"로 인용한다.

슬라이드 구성은 다음과 같다.

| 구간 | 슬라이드 | 내용 |
|---|---|---|
| 1. Introduction | 3~11 | GraphRAG 개관, graph 기반 RAG 정의, vanilla RAG 비교표, 연구 질문 2가지, 대표 방법론 연구 흐름, 평가 방식 2종 |
| 2. Paper Review | 12~42 | LightRAG(14~27), LeanRAG(29~42) |
| 3. Conclusion | 43~45 | graph retrieval의 핵심 3요소와 남은 연구 질문 |

자막은 YouTube 자동 자막(ko)을 정제한 transcript다. 자동 자막 특성상 고유명사 오인식이 잦아 판독 근거는 슬라이드 PDF를 1차 출처로 삼았다. 주요 오인식 대조는 5절에 정리한다.

## 2. 주요 기여 (Key Contributions)

본 영상은 발표자의 자체 연구가 아니라 두 논문의 정리와 비교 review다. 세미나가 만들어낸 값은 다음 다섯 가지다.

1. **Graph 기반 RAG의 표준 파이프라인 정리.** KG 구축, graph retrieval, 컨텍스트화, generation의 4단계로 나누고, 방법론마다 갈리는 지점이 두 번째와 세 번째 단계임을 명시한다.
2. **Graph retrieval 패턴 5종 구획.** 주요 노드, 주요 관계, 주요 경로, 서브그래프, hybrid로 나누고 각 패턴에 대표 방법론을 붙인다.
3. **대표 방법론 연구 흐름 지도.** 2024년 GraphRAG를 기점으로 HippoRAG, HippoRAG2, LightRAG, CausalRAG, HugRAG, HiRAG, LeanRAG를 배치하고, 각 방법론이 지적받은 한계를 후속 방법론의 출발점으로 연결한다.
4. **두 논문의 설계 방향 대비.** LightRAG는 평면 KG를 key-value로 재표현해 수평으로 빠르게 훑고, LeanRAG는 평면 KG 위에 계층을 쌓아 수직으로 깊게 들어간다.
5. **두 논문의 상충 결과 도출.** 원문 chunk를 컨텍스트에 붙이는 효과가 LightRAG에서는 제거 시 종종 향상이고 LeanRAG에서는 제거 시 하락이다. 발표자는 이를 미해결 연구 과제로 남긴다.

발표자는 개인 연구 동기도 공유한다. 기술 경영 관점에서 기술 혁신 인사이트를 도출하는 산업 트렌드 분석 프레임워크를 graph 기반 RAG로 진행 중이라고 밝힌다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 Graph 기반 RAG의 정의와 공통 흐름

발표자는 graph 기반 RAG를 "지식 그래프로 표현된 데이터베이스를 활용한 검색 증강 생성 방식"으로 정의한다. 일반 그래프나 네트워크 데이터도 대상이 될 수 있지만, 노드 간 관계 정보가 담겨 있을수록 더 의미 있는 검색이 가능하다고 덧붙인다.

흐름은 그래프 데이터베이스 구축에서 시작한다. 이미 공개된 지식 그래프를 쓸 수도 있고 코퍼스에서 새로 만들 수도 있다. 이후 graph retrieval로 그래프에서 내용을 뽑고, 그 내용을 텍스트로 바꿔 generator에 넣는다. 슬라이드 5장은 이 전체 과정 도식의 출처로 "Graph Retrieval-Augmented Generation: A Survey (2024)"를 인용한다.

### 3.2 Vanilla RAG와의 비교

| 비교 항목 | Vanilla RAG | Graph 기반 RAG |
|---|---|---|
| 지식 표현 방식 | 텍스트를 chunk로 분할한 뒤 벡터 임베딩으로 변환, 관계 정보 손실, 초기 인덱싱 구축 비용 비교적 낮음 | 노드와 관계로 구성된 지식 그래프로 저장, 관계와 맥락 보존, 새 정보는 기존 노드와 관계에 맞추어 추가 |
| 검색 방식 | 질의와 chunk 간 벡터 유사도 기반, 단순하고 빠름 | 방법론별 핵심이 되는 부분, 서브그래프 탐지 후 나열이나 커뮤니티 탐지 후 요약본 활용 등 |
| 응답 생성 | 단순 사실 질의에 빠르고 정확함 | 복잡한 상호의존 관계를 포착해 맥락이 풍부함 |
| 적합한 상황 | 고객 지원 챗봇(FAQ, 매뉴얼에서 즉시 답변), 제품 설명서 QA | 의학과 신약 연구 분석(수많은 논문에서 약물, 유전자, 질환 관계 추론), 법률 판례 분석(선례와 법령의 인용 관계 추적), 산업 트렌드 분석(기술 경영 관점의 혁신 인사이트 도출) |

발표자는 새 데이터를 기존 그래프에 추가하는 비용이 개인 경험상 그리 크지 않다고 두 번 언급한다. 이 관찰은 결론부의 연구 제언으로 이어진다.

### 3.3 연구 질문 1: 지식 그래프를 어떻게 구축하는가

슬라이드 7장은 두 경로를 든다. 이미 구축된 지식 그래프를 활용하는 경로와, LLM 프롬프트로 코퍼스에서 triplet(SBJ, REL, OBJ)을 추출하는 경로다. 후자가 다수 연구의 선택이며 프롬프트 형식은 GraphRAG를 기점으로 사실상 표준화되었다.

추출 형식은 다음과 같다.

| 요소 | 필드 |
|---|---|
| entity | entity name, entity type, entity description |
| relationship | source entity, target entity, relationship description, 설명에 필요한 부가 정보 |

entity name이 key가 되고 나머지가 value가 되는 구조다.

### 3.4 연구 질문 2: 지식 그래프에서 무엇을 어떻게 뽑는가

발표자는 이 질문을 세미나의 메인 연구 질문으로 지목한다. 그래프에서 정보를 뽑는 방식은 다섯 가지로 나뉜다.

| 패턴 | 설명 |
|---|---|
| 주요 노드 | 질의와 연관된 entity만 본다 |
| 주요 관계 | 질의와 연관된 relation을 본다 |
| 주요 경로 | 방향이 있다면 시작점에서 방향을 따라 경로를 탐색한다 |
| 서브그래프 | triplet을 모아 부분 그래프를 만든다. 발표자는 "경로를 모았다기보다 triplet을 모았다는 표현이 더 정확하다"고 정정한다 |
| hybrid | 위를 종합한다 |

슬라이드 8장은 이 구획에 대표 방법론을 붙인다.

| 활용 대상 | 방법론 | 세미나가 소개한 동작 |
|---|---|---|
| entity(노드) | HippoRAG | 질의와 연관된 entity를 검색한 뒤 일련의 과정을 거쳐 주요 entity만 필터링하고, 그 entity가 포함된 passage를 활용한다 |
| 서브그래프 | GraphRAG | community detection 후 커뮤니티별 요약문을 document로 활용한다 |
| 서브그래프 | CausalRAG | 질의와 연관된 entity 검색을 시작으로 s-hop 서브그래프를 구축하고, 그 구축 경로에 대한 요약문을 활용한다 |
| 기존 KG에 모듈 추가 | LightRAG | entity와 relation 각각을 이름과 설명문의 key-value로 재표현하고 이를 document로 활용한다 |
| 기존 KG에 모듈 추가 | LeanRAG | GMM으로 노드를 클러스터링해 상위에 클러스터 요약 노드를 두고, 수직으로 연결된 노드 정보와 해당 entity가 포함된 passage를 활용한다 |

entity가 포함된 passage를 함께 붙이는 관행 자체도 표준화되었다고 발표자는 덧붙인다.

### 3.5 대표 방법론 연구 흐름

슬라이드 9장은 2024년부터 2026년까지의 흐름도를 제시한다. 각 방법론의 한 줄 정의와 지적된 한계는 다음과 같다.

| 방법론 | 슬라이드의 한 줄 정의 | 흐름도가 붙인 한계 |
|---|---|---|
| GraphRAG | LLM으로 지식 그래프와 커뮤니티 요약을 사전 구축해 전체 코퍼스에 대한 글로벌 질의응답(QFS)을 가능하게 하는 프레임워크 | LLM의 높은 토큰 비용과 글로벌 요약의 한계, 글로벌 요약으로 인한 precision 하락 |
| HippoRAG | 인간 해마의 기억 메커니즘을 모방해 LLM으로 구축한 지식 그래프와 Personalized PageRank를 결합, 멀티홉 질의에서 효과적인 연상 검색을 구현 | 대규모 데이터에서 확장 어려움, entity 중심 검색으로 인한 정보 고립 |
| HippoRAG2 | HippoRAG에 passage 노드와 LLM 필터링 triplet을 추가해 단순 QA부터 복잡한 멀티홉 추론까지 포괄 | 흐름도에 별도 표기 없음 |
| LightRAG | entity(저수준)와 토픽(고수준)을 동시에 검색하는 이중 레벨 검색 패러다임과 graph 기반 텍스트 인덱싱으로 응답의 다양성과 포괄성을 높인 경량 RAG | 흐름도에 별도 표기 없음 |
| CausalRAG | 단순 의미 유사도 대신 인과 그래프 기반 경로 탐색으로 검색 문맥을 결정해 응답의 인과적 근거와 충실도를 높임 | 인과 관계를 충분히 반영하지 못함 |
| HugRAG | Hierarchical Causal Gating으로 전역 문맥과 지역 인과 경로 정제를 동시에 달성 | 흐름도에 별도 표기 없음 |
| HiRAG | GMM 기반 계층적 KG 인덱싱(HiIndex)과 로컬, 글로벌, 브릿지 3단계 검색(HiRetrieval)을 결합해 의미적으로 가까운 entity 간 연결성과 로컬 글로벌 지식 격차를 해결 | entity cluster 간의 연결 부족 |
| LeanRAG | 다중 해상도 의미 집계로 구축된 계층적 지식 그래프에서 상하향식 앵커 기반 검색을 수행해 정보 중복을 최소화하고 정밀도를 높임 | 흐름도에 별도 표기 없음 |

### 3.6 평가 방식 두 가지

| 구분 | Multi-hop QA | Open-ended QA |
|---|---|---|
| 방식 | 문서 여러 건에 걸쳐 여러 번의 추론 단계를 거쳐 답을 생성 | 다양한 도메인의 문서를 기반으로 질문을 직접 생성한 뒤 LLM-as-judge로 평가 |
| 지표 | Exact Match, Recall 등. 검색된 컨텍스트까지 고려할 때는 RAGAS(2024) | Comprehensiveness, Diversity, Empowerment, Overall 등 |
| 예시 데이터셋 | HotpotQA(2018). 슬라이드 10장이 Mother Love Bone 관련 문항을 예시로 든다 | UltraDomain(2024) 코퍼스 |
| 출처 | 슬라이드가 From RAG to Memory(2025), HugRAG(2026), RAGAS(2024)를 인용 | GraphRAG 연구부터 persona 또는 시나리오에 맞춰 질문을 직접 생성하는 방식이 차용되기 시작. MemoRAG(2024)와 LightRAG(2025)를 함께 인용 |

세미나가 다룬 두 논문은 모두 open-ended QA를 주 평가로 택했다. 질문 생성은 사용자 5명, task 5개, task별 질문 5개로 총 125개를 만드는 GraphRAG 방식을 그대로 따른다.

### 3.7 LightRAG

**개관.** 지식 그래프를 대상으로 dual-level retrieval을 통해 다각적 정보를 효율적으로 획득하는 방법론이다.

**문제 정의.** 슬라이드 15장은 세 가지를 든다.

- entity 간 관계에 기반한 정보를 획득하기 어렵다.
- 동일한 entity라도 다른 entity와 여러 종류의 관계가 존재하는데 이를 충분히 반영하지 못하고, 주제 간 연결도 찾을 수 없다. 예시 질의는 "전기차 사용량의 증가가 대기 오염과 교통 체계에 주는 영향은?"이다. 일반 RAG는 전기차, 대기 오염, 교통 체계 각각에 대한 문서를 반환할 뿐 세 주제를 통합한 답을 내지 못한다.
- 그래프를 대상으로 검색할 때 그래프 크기에 따라 비효율적일 수 있다. 발표자는 그래프의 복잡도가 노드 수 N의 제곱에 비례한다고 설명한다.

**해결 방안.** 키워드 기반 검색으로 서로 다른 entity 간 inter-dependent한 그래프 정보를 빠르고 효율적으로 검색해 반영한다. 논문이 내건 목표는 comprehensive information retrieval, enhanced retrieval efficiency, rapid adaptation to new data 세 가지다.

**Graph-based Text Indexing.** 코퍼스에서 entity와 relationship을 추출한 뒤 각각을 key-value 쌍으로 표현하고 중복을 제거한다.

| 요소 | key | value |
|---|---|---|
| entity | entity 이름 | 설명 |
| relationship | (source, target) | 설명 |

슬라이드 16장의 예시는 원문 "Cardiologists assess symptoms to identify potential heart issues."에서 entity로 Cardiologists와 Heart Disease를, relationship으로 Cardiologists diagnose Heart Disease를 뽑는다. 발표 중 발표자는 이 슬라이드의 표기에 오기가 있었다고 직접 정정한다.

**Dual-level Retrieval.** 그래프 데이터를 다룰 때는 로컬 관점과 글로벌 관점을 함께 잡아야 한다는 것이 전제다. 슬라이드 17장은 두 관점을 질의 예시로 구분한다.

| 관점 | 예시 질의 | 대응 retrieval |
|---|---|---|
| Specific | Who wrote 'Pride and Prejudice'? | Low-level Retrieval |
| Abstract | How does artificial intelligence influence modern education? | High-level Retrieval |

핵심 설계 판단은 질의 자체를 글로벌과 로컬로 분류하지 않고, 질의 하나에서 두 레벨의 키워드를 모두 뽑아 둘 다 쓰는 것이다. 절차는 세 단계다.

1. **Query Keyword Extraction.** keyword generation instruction 프롬프트로 high-level 키워드(전반적 concept와 theme)와 low-level 키워드(구체적 entity와 디테일)를 뽑는다. 프롬프트에는 few-shot 예시가 붙는다.
2. **Keyword Matching.** 뽑은 키워드를 모두 연결해 하나의 문자열로 만든 뒤 임베딩을 구한다. local query keywords는 entity 노드의 key와 value 문자열 임베딩과 비교하고, global query keywords는 relation의 key와 value 문자열 임베딩과 비교한다. 특정 개수의 entity와 relation이 최종 검색된다.
3. **Incorporating High-Order Relatedness.** 검색된 노드와 relation으로 구성된 서브그래프 정보를 텍스트로 나열하고, entity의 출처가 되는 원문도 포함한다. 원문이 과도해지지 않도록 등장 횟수가 높은 상위 원문만 고른다.

### 3.8 LeanRAG

**개관.** 평면 지식 그래프 내 entity를 대상으로 hierarchical clustering을 적용해 상위 개념 간에도 모두 연결되도록 만드는 방법론이다.

**문제 정의.** 슬라이드 30장은 두 선행 연구를 짚는다.

| 대상 | 지적 내용 |
|---|---|
| GraphRAG | 여전히 크고 coarse-grained한 community summary가 반환되어 중복될 수 있으며, community summary 간 연결이 없다 |
| HiRAG (2025) | high-level summary 노드 간에 연결이 없으며, retrieval 시 그래프 구조 정보가 잘 보존되지 않는다. 인용 문헌은 "Retrieval-Augmented Generation with Hierarchical Knowledge (2025 EMNLP)" |

**해결 방안.** Lowest Common Ancestor를 이용한 구조적 retrieval과 hierarchical graph aggregation이다. 지식 그래프 entity를 클러스터링한 뒤 클러스터 간에도 연결을 만들어 수직과 수평 양쪽으로 정보를 얻는다.

**Hierarchical Knowledge Graph Aggregation.** 계층 그래프는 $H = \{G_0, G_1, \ldots, G_k\}$이고 각 층 $G_i = (V_i, R_i, D_{ver}^i, D_{rel}^i)$는 아래 층 $G_{i-1}$의 abstract view다. $D_{ver}$는 entity description의 모음, $D_{rel}$은 relationship description의 모음이다. 최대 layer 수는 평면 KG의 노드 수 $N$에 대해 $\log_2 N + 1$이다.

Recursive semantic clustering은 $G_{i-1}$을 대상으로 한다. 노드 description을 임베딩해 $E_{i-1}$을 얻고, Gaussian Mixture Clustering으로 $m$개 클러스터 $C_1, \ldots, C_m$을 만든다. $m$은 Bayesian Information Criterion이 최소가 되는 값으로 정한다.

**Aggregated Entity Generation.** 클러스터 $C_j$를 대표하는 abstract entity $\alpha_j$는 클러스터 내 entity와 relation 정보를 LLM에 입력해 이름과 설명을 받아 만든다. 프롬프트는 공식 GitHub 저장소의 `prompt.py`에 공개되어 있다.

**Aggregated Relation Generation (본 연구의 핵심).** 기본 지식 그래프의 relationship 표기 형식은 `relationship<|>{SBJ}<|>{OBJ}<|>{DESCRIPTION}`이다. 슬라이드 34장의 예시는 Layer 0에 E1부터 E5까지 다섯 노드를 두고, E1, E3, E4를 한 클러스터로, E2, E5를 다른 클러스터로 묶는다. 두 클러스터를 잇는 관계는 r32와 r45다. 이때 두 abstract 노드 $\alpha_1$과 $\alpha_2$ 사이의 관계는 다음 규칙으로 만든다.

| 조건 | 처리 |
|---|---|
| 모든 relationship 표기의 토큰 수가 기준 하이퍼파라미터보다 훨씬 적을 때 | 단순 연결한다 |
| 모든 relationship 표기의 토큰 수가 기준 하이퍼파라미터보다 훨씬 많을 때 | LLM으로 새 관계를 산출한다 |

부모와 자식 간 relationship은 별도로 표기하지 않는다.

**Structured Retrieval via Lowest Common Ancestor.** 두 단계다.

1. **Initial Entity Anchoring.** 노드 임베딩 기반으로 상위 n개를 골라 seed entity로 삼는다.
2. **Contextualization via LCA Path Traversal.** 평면 지식 그래프에서 서로 다른 노드를 잇는 경로는 상당히 많을 수 있다. 그래서 계층 지식 그래프 위에서 seed entity를 모두 연결하는 서브그래프를 LCA로 찾는다. 저자들은 이 방식이 의미적 중복을 최소화한다고 주장한다.

컨텍스트는 경로 내 모든 entity, relationship, 그리고 entity의 출처 원문 chunk로 구성한다. 원문은 많이 등장한 상위 몇 개만 고르며 그 개수는 하이퍼파라미터다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 공통 실험 설정

| 항목 | LightRAG | LeanRAG |
|---|---|---|
| 코퍼스 | UltraDomain (18개 분야, 428권의 원서) | LightRAG와 동일 |
| 선택 분야 | Agriculture, Computer Science, Legal, Mix 4개 | LightRAG와 동일 |
| 질문 생성 | GraphRAG 방식 차용, 사용자 5명 × task 5개 × 질문 5개 = 125개 | LightRAG와 동일 |
| 판정 모델 | GPT-4o-mini | DeepSeek-V3 |
| 답변 생성 모델 | 슬라이드에 별도 명시 없음 | DeepSeek-V3 |
| 임베딩 모델 | 확실치 않음. 코드상 bge-m3와 OpenAI 3-large가 함께 확인됨 | BGE-M3 |
| 비교 방식 | 제안 방법론 대 나머지 pairwise | 서로 다른 5번의 답안에 대해 기준별 1점에서 10점 점수의 평균값 비교 |

### 4.2 LightRAG 실험 결과

연구 질문은 세 가지다.

1. 기존 RAG baseline과 비교했을 때 생성 성능은 어떤가.
2. dual-level retrieval과 graph 기반 인덱싱이 생성 품질을 어떻게 높이는가.
3. 비용은 얼마이고 데이터 변화에 얼마나 잘 적응하는가.

| 연구 질문 | 결과 |
|---|---|
| RQ1 성능 비교 | graph 기반 RAG가 일반 RAG를 크게 앞선다. 코퍼스 크기가 클수록 격차가 두드러진다. 평가 지표 중 Diversity가 가장 높다. GraphRAG 대비 전반적으로 우수하나 Mix 데이터셋에서는 예외다 |
| RQ2 ablation | high-level 키워드 검색을 제거할 때 성능 하락 폭이 가장 크다. 원문을 제거한 -Origin 조건에서는 오히려 간혹 성능이 향상된다. Agriculture 데이터셋에서 대부분의 지표가 향상되었고 나머지에서는 큰 차이가 없었다 |
| RQ3 비용과 적응성 | Table 3에서 LLM 입출력 토큰 수와 API 호출 횟수가 현저히 낮다. Table 5와 7에서 새 document를 그래프에 추가할 때 걸리는 시간과 메모리가 훨씬 적다. Table 6에서 retrieval 시간도 현저히 적다 |

Mix 데이터셋 예외에 대한 발표자 해석은 GraphRAG가 이미 커뮤니티 요약을 쓰고 있어 다양한 주제가 요약 안에 잘 담겼기 때문이라는 것이다. 다만 발표자는 승률 차이 자체가 크지는 않다고 덧붙인다.

원문 제거 시 성능이 오르는 현상에 대해 저자들은 원문에 noise나 무관한 내용이 포함되어 있을 가능성을 든다. 발표자는 이 결과를 기억해 두라고 청중에게 요청하는데, 이어서 볼 LeanRAG가 정반대 결과를 내기 때문이다.

### 4.3 LeanRAG 실험 결과

연구 질문은 네 가지다.

1. 다양한 도메인에서 최신 baseline 대비 QA 성능은 어떤가.
2. retrieval 전략이 중복을 줄이면서 생성 품질을 높이는가.
3. aggregated entity 간 관계를 명시적으로 생성하는 것이 응답 품질에 얼마나 기여하는가.
4. 그래프에서 검색한 구조적 지식만으로 충분한가, 아니면 entity의 원문 컨텍스트가 필수인가.

| 연구 질문 | 결과 |
|---|---|
| RQ1 전반 성능 | LeanRAG가 전반적으로 우수하다. HiRAG를 포함해 계층 그래프를 활용할 때 더 효과적인 결과를 보인다 |
| RQ2 정보 중복 | 검색된 컨텍스트의 토큰 수가 적을수록 중복이 적다는 전제로 Qwen3-14B로 평가했다. LeanRAG의 컨텍스트가 가장 짧아 방법론 이름의 Lean을 뒷받침한다. LightRAG의 컨텍스트가 비교적 길게 나온 점이 눈에 띈다 |
| RQ3 cluster relation | abstract entity 간 relation을 제거하면 성능이 하락하고, 특히 Diversity의 하락 폭이 가장 크다. 이 비교는 pairwise로 진행했다 |
| RQ4 원문 필요성 | 코퍼스 원문이 필요하다는 결론이다. 구조적 정보는 graph retrieval로, 실제 내용은 원문 chunk로 얻어 두 정보를 융합해야 한다는 것이 저자 주장이다 |

RQ2에서 발표자가 의외라고 짚은 대목은 LightRAG가 GraphRAG보다 긴 컨텍스트를 산출했다는 점이다. LightRAG가 원문 코퍼스까지 붙여서일 것이라고 추정하면서도, LeanRAG 역시 원문을 붙이므로 같은 논리라면 설명이 되지 않는다고 스스로 반문하고 더 자세한 분석이 있었으면 좋았겠다고 말한다.

RQ3의 Diversity 하락에 대해서는 계층적 관점이 곧 글로벌 관점을 포착하는 수단이므로, 로컬 관점과 글로벌 관점을 동시에 잡는 것이 그래프 데이터 활용에 중요하다는 앞선 논지가 다시 확인된 결과로 읽는다.

### 4.4 두 논문의 상충 결과

| 조건 | LightRAG | LeanRAG |
|---|---|---|
| 컨텍스트에서 원문 chunk 제거 | 간혹 성능 향상. Agriculture에서 대부분의 지표가 향상 | 성능 하락 |
| 저자 해석 | 원문에 noise나 무관한 내용이 포함될 수 있다 | 구조 정보와 실제 내용을 융합해야 한다 |
| 평가 방식 | pairwise 비교 | 1점에서 10점 점수의 평균 |

발표자는 이 상충이 평가 방식의 차이에서 오는 맹점일 수 있다고 본다. 점수 평균 대신 컨텍스트를 넣은 답변과 넣지 않은 답변을 pairwise로 비교했다면 더 적절했을 것이라는 지적이다.

### 4.5 발표자의 take-away와 비판

| 대상 | 긍정 평가 | 비판과 아쉬움 |
|---|---|---|
| LightRAG | 사용자 질의를 두 레벨 키워드로 치환해 글로벌, 로컬, 효율을 모두 포착했다. 키워드 검색 덕분에 비교적 디테일한 정보 보존도 가능할 것이다. 지식 그래프 요소를 key-value로 표현한 방법의 유용성이 높다. 연구 질문에 따른 실험을 깔끔히 보여주었다 | 논문과 코드 사이에 간극이 있다. 논문은 질의에서 뽑은 low-level 키워드와 entity 이름(key)을 비교한다고 서술하지만, 코드는 entity의 이름과 설명(key와 value)을 대상으로 검색한다. 발표자는 코드 기준으로 설명했다 |
| LeanRAG | 평면 지식 그래프를 계층적으로 잘 확장했다. 그래프의 로컬 정보와 글로벌 정보 탐색에 적합하다. GraphRAG의 community summary를 비교적 lean하게 표현했다 | LCA 결과를 함께 제시했으면 좋았다. 어떤 entity가 anchor가 되어 몇 개 층까지 올라갔는지 사례 분석이 없다. 대부분의 질의가 root까지 올라갔다면 LCA가 효과를 보지 못한 것이다. 효율성 비교 평가가 부재하고 추론 시간 비교 실험도 없다. 계층 그래프는 초기에 구축할 수 있으므로 LCA 탐색 소요 시간이 관건일 것이다 |

## 5. 한계와 향후 과제 (Limitations and Future Work)

### 5.1 발표자가 결론에서 남긴 연구 질문

슬라이드 44장은 graph retrieval의 핵심을 두 가지로 요약한다. 구조 정보를 얼마나 잘, 얼마나 효과적으로 찾고 반영하는가와, 로컬 정보와 글로벌 정보를 얼마나 잘 융합해 포착하는가다. GraphRAG처럼 community summary를 활용하면 디테일한 정보 파악이 어렵고, LightRAG처럼 개별 entity와 relation을 나열하는 것만으로도 일정 수준의 효과를 본다는 대비가 근거다.

남은 연구 질문은 세 가지다.

1. 코퍼스에서 추출한 것이 아니라 고정된 지식 그래프가 주어질 때 어떤 방법이 효과적인지. 즉 지식 그래프 요소의 원문이 부재한 상황을 어떻게 다룰지.
2. 지식 그래프가 아닌 일반 그래프에 어떤 retrieval이 효과적인지.
3. 컨텍스트화 단계의 효율화. 발표자 경험상 새 데이터를 기존 그래프에 추가하는 데는 비교적 적은 시간과 비용이 들고, 검색 후 컨텍스트화 과정의 소요 시간이 전체의 대부분을 차지한다.

여기에 두 논문이 상충한 원문 활용 방식이 네 번째 과제로 얹힌다. 원문을 언제, 어떻게, 얼마나 융합할지는 세미나 시점에 미해결이다.

### 5.2 자료 자체의 한계

자막이 YouTube 자동 자막이라 고유명사 오인식이 잦다. 슬라이드 PDF와 대조해 복원한 주요 사례는 다음과 같다.

| 자막 표기 | 슬라이드 기준 원어 | 위치 |
|---|---|---|
| 라이레그, 라이베그, 라레그, 라이드레그, 레라그 | LightRAG | 전 구간 |
| 린레그, 린 레그 | LeanRAG | 전 구간 |
| 지지크래프, 지지급 브래프, 논리지 그래프 | 지식 그래프 | 전 구간 |
| 히포렉그 | HippoRAG | 00:05 구간 |
| 하이래그 | HiRAG | 00:40 구간 |
| 커절 레그 | CausalRAG | 00:10 구간 |
| 트플 AI, 트리플 AI | AAAI | 00:00, 00:30 구간 |
| 1년의 과정 | 일련의 과정 | 00:05 구간 |
| 428개의 원소 | 428권의 원서 | 00:25 구간 |
| 쿠 3 14 빌리언 | Qwen3-14B | 00:45 구간 |
| 멀파 Q웨이 | 판독 불가. 슬라이드는 HotpotQA를 멀티홉 QA 예시로 든다 | 00:10 구간 |
| 로이스트 커먼 액세스터 | Lowest Common Ancestor | 00:40, 00:50 구간 |

두 자료 사이의 불일치도 있다. 슬라이드 17장은 LightRAG가 "쿼리 자체를 분류하기보다 쿼리로부터 두 level의 키워드를 추출해서 모두 활용한다"고 적는데, 같은 발표의 슬라이드 27장 take-away는 "기본적으로 query를 구분한 후 진행되지만"으로 시작한다. 두 문장이 가리키는 주어가 서로 다른 것으로 보이나 슬라이드만으로는 확정할 수 없다. 슬라이드 42장은 LCA를 "Lowest Ancestor Common"으로 적어 다른 슬라이드의 "Lowest Common Ancestor"와 어순이 어긋난다.

두 논문의 정량 수치(테이블 값)는 세미나에서 거의 인용되지 않는다. 슬라이드는 표 이미지를 붙이고 경향만 서술한다. 정확한 벤치마크 점수가 필요하면 각 원논문 페이지를 참조해야 한다.

## 6. 관련 연구 (Related Work)

| 자료 | 세미나 안에서의 위치 |
|---|---|
| GraphRAG (From Local to Global, Edge and Trinh et al., 2024 arXiv) | graph 기반 RAG의 서막. 두 논문의 공통 baseline이자 KG 추출 프롬프트 형식과 open-ended QA 평가의 출처 |
| Graph Retrieval-Augmented Generation: A Survey (2024) | graph 기반 RAG 전체 과정 도식의 출처 |
| HippoRAG | entity 활용 retrieval의 대표. 해마 기억 메커니즘 모방, Personalized PageRank 결합 |
| From RAG to Memory (2025) | HippoRAG2에 해당. multi-hop QA 평가 인용 문헌 |
| CausalRAG | 인과 그래프 기반 경로 탐색으로 검색 문맥 결정 |
| HugRAG (2026) | Hierarchical Causal Gating으로 전역 문맥과 지역 인과 경로 정제를 동시에 수행 |
| HiRAG (Retrieval-Augmented Generation with Hierarchical Knowledge, 2025 EMNLP) | 계층 KG 인덱싱과 3단계 검색. LeanRAG가 문제 정의에서 직접 겨냥한 선행 연구이자 RQ1 비교 대상 |
| RAGAS (2024) | 검색된 컨텍스트를 고려한 RAG 평가 지표 |
| HotpotQA (2018) | multi-hop QA 예시 데이터셋 |
| MemoRAG (2024) | open-ended QA 평가 인용 문헌 |
| UltraDomain (2024) | 18개 분야 428권 원서 코퍼스. 두 논문 공통 평가 코퍼스 |
| GNN4NLP 세미나 | 발표자의 이전 세미나. 그래프와 NLP 연계 연구의 선행 정리 |

## 7. 용어집 (Glossary)

- **Graph 기반 RAG**: 지식 그래프로 표현된 데이터베이스를 활용한 검색 증강 생성 방식. 일반 그래프도 대상이 되지만 노드 간 관계 정보가 많을수록 유리하다.
- **Graph retrieval**: 질의를 받아 그래프에서 노드, 관계, 경로, 서브그래프를 뽑는 단계. 세미나가 방법론별 핵심으로 지목한 지점이다.
- **컨텍스트화**: graph retrieval 결과를 LLM이 읽을 수 있는 텍스트로 직렬화하고 필요하면 출처 원문 chunk를 붙이는 단계.
- **Dual-level Retrieval**: LightRAG의 설계. 질의에서 high-level 키워드와 low-level 키워드를 함께 뽑아 각각 relation과 entity 검색에 쓴다.
- **Key-value 재표현**: LightRAG가 entity를 (이름, 설명), relationship을 ((source, target), 설명) 쌍 문자열로 직렬화한 방식.
- **Semantic Aggregation**: LeanRAG가 평면 KG의 노드 description 임베딩을 클러스터링해 상위 층 abstract entity를 만드는 절차.
- **Abstract entity와 abstract relation**: 클러스터를 대표하는 상위 층 가상 노드와 그 노드들 사이의 관계. 상위 노드 간 관계까지 만드는 것이 LeanRAG의 핵심 기여다.
- **Lowest Common Ancestor (LCA)**: 계층 그래프에서 여러 노드의 공통 조상 중 가장 낮은 노드. LeanRAG는 seed entity를 모두 연결하는 서브그래프를 LCA로 찾아 의미 중복을 줄인다.
- **Seed entity**: LeanRAG retrieval에서 노드 임베딩 유사도로 고른 상위 n개 시작점 entity.
- **Anchor 노드**: LCA 경로의 말단에 놓인 평면 KG entity. 출처 원문 chunk가 붙는다.
- **Open-ended QA**: persona와 task 조합으로 질문을 자동 생성해 LLM-as-judge로 평가하는 방식. GraphRAG 연구부터 차용되었다.
- **Comprehensiveness, Diversity, Empowerment, Overall**: open-ended QA의 평가 지표. 각각 답변의 포괄성, 관점의 다양성, 의사결정 지원력, 종합 품질을 본다.
- **UltraDomain**: 18개 분야 428권의 원서로 구성된 다중 도메인 코퍼스.
- **BIC (Bayesian Information Criterion)**: LeanRAG가 Gaussian Mixture Clustering의 클러스터 수 $m$을 정할 때 최소화하는 기준.

## 8. 그림 후보 (Figure Candidates)

원자료 영상에는 도식이 없고, 함께 보관한 보조 슬라이드 PDF 45장이 도해의 출처다. 슬라이드 캡션이 `Figure N` 형식이 아니어서 자동 검출이 멈췄고, 슬라이드 번호와 영역을 사람이 지정해 잘랐다. 표만 담긴 슬라이드(24, 38, 40)는 정량 수치를 본문이 인용하지 않는다는 이 자료의 성격을 유지하기 위해 후보에서 제외했다.

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 5 | graph 기반 RAG의 전반적인 과정 | manual | ★ wiki 권장 (method) |
| fig02 | 7 | LightRAG의 지식 그래프 구축 프롬프트 전문 | manual | (텍스트 이미지) |
| fig03 | 9 | 2024년부터 2026년까지의 대표 방법론 연구 흐름 | manual | ★ wiki 권장 (architecture) |
| fig04 | 14 | LightRAG 전체 구조 | manual | ★ wiki 권장 (architecture) |
| fig05 | 16 | entity와 relationship의 key-value 재표현 예시 | manual | ★ wiki 권장 (method) |
| fig06 | 17 | Dual-level Retrieval Paradigm | manual | ★ wiki 권장 (method) |
| fig07 | 20 | 질의, 두 레벨 키워드, retrieval context 예시 | manual | (텍스트 이미지) |
| fig08 | 29 | LeanRAG 전체 프레임워크 | manual | ★ wiki 권장 (architecture) |
| fig09 | 31 | LeanRAG의 처리 흐름과 LCA 검색 | manual | ★ wiki 권장 (method) |
| fig10 | 35 | LeanRAG inference 단계 확대 | manual | (fig08의 (c) 패널과 중복) |
| fig11 | 39 | 도메인별 retrieval 컨텍스트 토큰 소비량 | manual | ★ wiki 권장 (result) |
