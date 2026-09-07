---
title: "Graph-based RAG 세미나: LightRAG와 LeanRAG (DSBA, 2026)"
type: video
year: 2026
category: database
raw_path: raw/videos/dsba-2026-paper-review-graph-based-rag.md
raw_filename: "dsba-2026-paper-review-graph-based-rag.md"
supplementary_raw_path: raw/papers/dsba-2026-paper-review-graph-based-rag.pdf
supplementary_raw_filename: "dsba-2026-paper-review-graph-based-rag.pdf"
source_collection: external
source: dsba-2026-paper-review-graph-based-rag.md
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

## 요약

이 페이지는 서울대학교 산업공학과 DSBA 연구실 김도윤 박사과정이 2026-04-27에 진행한 53분짜리 논문 세미나를 정리한 것이다. 세미나는 개별 논문의 상세 해설보다 graph 기반 RAG라는 영역 전체를 구획하는 데 무게를 둔다. 먼저 공통 파이프라인과 retrieval 패턴을 나누고, 2024년 GraphRAG부터 2026년까지의 연구 흐름 위에 각 방법론을 배치한 다음, 그중 두 편인 LightRAG와 LeanRAG를 자세히 본다.

세미나가 두 논문을 나란히 놓는 이유는 설계 방향이 정반대이기 때문이다. LightRAG는 평면 지식 그래프의 entity와 relation을 key-value 문자열로 다시 적어 수평으로 빠르게 훑고, LeanRAG는 같은 평면 그래프 위에 클러스터 계층을 쌓아 수직으로 깊게 들어간다. 두 방법론이 같은 코퍼스와 같은 평가 프레임워크를 쓰면서도 원문 chunk를 컨텍스트에 붙이는 효과에 대해 정반대 결론을 낸 것이 세미나의 가장 중요한 관찰이다.

발표자의 최종 결론은 graph retrieval의 설계가 성패를 가른다는 것이다. 구조 정보를 얼마나 잘, 얼마나 효과적으로 찾아 반영하는가와, 로컬 정보와 글로벌 정보를 얼마나 잘 융합해 포착하는가 두 가지가 판단 기준이다.

## 배경

### 세미나의 위치

이 세미나는 같은 발표자의 GraphRAG 세미나에 이어지는 후속편이다. 발표자는 서두에서 이전 영상 두 편을 선행 자료로 지목한다. 하나는 GraphRAG를 다룬 세미나이고 다른 하나는 GNN4NLP라는 부제를 단, 그래프와 자연어 처리의 접점을 정리한 세미나다.

앞선 세미나가 GraphRAG 한 편을 깊게 팠다면 이 세미나는 그 이후 2년간 어떤 방법론들이 나왔고 서로 무엇을 지적하며 이어졌는지를 지도로 그린다. 슬라이드 45장 중 Introduction이 11장을 차지하는 구성 자체가 그 의도를 보여준다.

| 구간 | 슬라이드 | 다루는 내용 |
|---|---|---|
| Introduction | 3~11 | GraphRAG 개관, graph 기반 RAG 정의, vanilla RAG 비교, 연구 질문 2가지, 대표 방법론 연구 흐름, 평가 방식 2종 |
| Paper Review | 12~42 | LightRAG(14~27), LeanRAG(29~42) |
| Conclusion | 43~45 | graph retrieval의 핵심 요소와 남은 연구 질문 |

### GraphRAG가 연 문제 설정

발표자는 GraphRAG를 graph 기반 RAG의 서막으로 배치한다. 텍스트 코퍼스를 지식 그래프로 표현하고, 그 그래프에 community detection을 적용한 뒤 커뮤니티별 요약을 만들어, 질문이 들어오면 그 요약을 근거로 답을 생성하는 시스템이다. 슬라이드는 원논문을 "From Local to Global: A GraphRAG Approach to Query-Focused Summarization, Darren Edge and Ha Trinh et al., 2024 arxiv"로 인용한다.

GraphRAG의 강점은 코퍼스 전체의 내용이 반영되어야만 답할 수 있는 질문에서 나온다. 슬라이드가 든 예시는 "What are the main themes in the dataset?"처럼 특정 문서 한두 건으로는 답이 나오지 않는 질의다.

동시에 GraphRAG는 후속 연구가 겨냥한 출발점이기도 하다. 세미나의 연구 흐름도는 GraphRAG에 두 개의 한계 화살표를 붙인다. LLM의 높은 토큰 비용과 글로벌 요약 자체의 한계, 그리고 글로벌 요약을 거치면서 발생하는 precision 하락이다. 이 세미나가 다루는 두 논문은 각각 이 두 한계 중 하나씩을 정면으로 겨냥한다.

## 핵심 개념

**지식 그래프**는 entity를 노드로, entity 사이의 관계를 엣지로 표현한 구조다. 세미나가 다루는 연구들에서 entity는 이름과 타입과 설명을 갖고, 관계는 출발 entity와 도착 entity와 관계 설명을 갖는다. 이 형식이 GraphRAG 이후 사실상 표준이 되었기 때문에, 이후 방법론들의 차이는 그래프를 어떻게 만드는가가 아니라 만들어진 그래프에서 무엇을 어떻게 뽑는가에서 생긴다.

**Graph 기반 RAG**는 지식 그래프로 표현된 데이터베이스를 활용하는 검색 증강 생성 방식을 뜻한다. 발표자는 일반 그래프나 네트워크 데이터도 대상이 될 수 있지만 노드 간 관계 정보가 담겨 있을수록 더 의미 있는 검색이 가능하다고 단서를 단다.

**Graph retrieval**은 사용자 질의를 받아 그래프에서 무엇을 뽑을지 정하는 단계다. 세미나가 방법론별 핵심으로 지목하는 지점이 바로 여기다. 같은 지식 그래프를 놓고도 노드만 볼지, 관계를 볼지, 경로를 볼지, 부분 그래프를 통째로 볼지에 따라 완전히 다른 시스템이 된다.

**컨텍스트화**는 graph retrieval이 뽑아낸 그래프 요소를 LLM이 읽을 수 있는 텍스트로 직렬화하는 단계다. 여기서 출처가 되는 원문 chunk를 함께 붙일지 말지가 두 논문이 갈라지는 지점이 된다.

**Community summary**는 지식 그래프를 커뮤니티 단위로 나눈 뒤 각 커뮤니티의 내용을 LLM으로 미리 요약해 둔 문서를 가리킨다. GraphRAG가 도입한 장치이고, 이 세미나가 다루는 두 논문은 모두 이 장치의 한계를 출발점으로 삼는다. LightRAG는 요약을 만드는 비용이 크다고 보고, LeanRAG는 요약이 지나치게 성기고 요약들 사이에 연결이 없다고 본다.

**Passage와 chunk**는 지식 그래프를 만들 때 재료가 된 원문 텍스트 조각을 가리킨다. entity마다 그 entity가 등장한 원문을 되짚을 수 있고, 이를 컨텍스트에 함께 붙이는 것이 표준 관행이 되었다. 이 관행의 효용을 두 논문이 서로 다르게 측정한 것이 세미나의 핵심 관찰이다.

**로컬 정보와 글로벌 정보의 융합**은 세미나 전체를 관통하는 주제다. 로컬 정보는 특정 entity와 그 주변의 구체적인 사실이고, 글로벌 정보는 코퍼스 전반을 가로지르는 주제와 개념이다. 발표자는 그래프 데이터를 다룰 때 이 둘을 함께 잡아야 한다는 점을 LightRAG 절과 LeanRAG 절, 그리고 결론에서 세 번 반복한다.

**Abstract entity**는 평면 지식 그래프의 노드 여러 개를 묶어 상위 층에 새로 만든 가상 노드를 가리킨다. LeanRAG의 핵심 용어이며, 이 노드들 사이에 다시 관계를 만드는 것이 그 논문의 기여다.

**Seed entity**는 질의 임베딩과 노드 임베딩의 유사도로 고른 retrieval 시작점을 말한다. LeanRAG는 여기서 출발해 계층을 거슬러 올라가며 컨텍스트를 모은다.

**LLM-as-judge**는 사람 대신 LLM이 두 시스템의 답변을 읽고 우열을 매기는 평가 방식이다. 세미나가 다룬 두 논문의 주 평가가 모두 이 방식이며, 우열을 어떻게 매기느냐에서 갈린다. LightRAG는 두 답변을 직접 맞붙이는 pairwise 비교를 쓰고, LeanRAG는 답변마다 1점에서 10점 점수를 매겨 평균을 낸다. 발표자는 이 차이가 두 논문의 상충 결과를 만든 원인일 수 있다고 본다.

## 방법

### 공통 파이프라인

발표자가 그린 graph 기반 RAG의 흐름은 네 단계다.

| 단계 | 하는 일 | 방법론별 차이 |
|---|---|---|
| 1. 그래프 데이터베이스 구축 | 이미 공개된 지식 그래프를 쓰거나 코퍼스에서 새로 만든다 | 프롬프트 형식이 GraphRAG 이후 사실상 표준화되어 차이가 적다 |
| 2. Graph retrieval | 질의와 관련된 노드, 관계, 경로, 서브그래프를 뽑는다 | 방법론이 갈리는 첫 번째 지점 |
| 3. 컨텍스트화 | 뽑은 그래프 요소를 텍스트로 직렬화하고 출처 원문을 붙일지 정한다 | 방법론이 갈리는 두 번째 지점 |
| 4. Generation | 컨텍스트와 질의를 LLM에 넣어 응답을 만든다 | 차이가 거의 없다 |

전체 과정 도식의 출처로 슬라이드는 "Graph Retrieval-Augmented Generation: A Survey (2024)"를 인용한다. 네 단계 중 방법론의 정체성을 결정하는 것은 가운데 두 단계이고, 이 세미나의 나머지 논의도 모두 그 두 단계에 관한 것이다.

![[assets/dsba-2026-paper-review-graph-based-rag/fig01.png]]
*Figure 1: graph 기반 RAG의 전반적인 과정. 질의가 G-Retrieval, retrieval 결과, graph format 변환, G-Generation을 거쳐 응답이 된다 (DSBA 세미나 슬라이드 5).*

### Vanilla RAG와의 비교

vanilla RAG는 벡터 기반의 단순한 RAG를 가리킨다. 두 방식의 대비는 세미나의 도입부에서 표로 제시된다.

| 비교 항목 | Vanilla RAG | Graph 기반 RAG |
|---|---|---|
| 지식 표현 | 텍스트를 chunk로 나눈 뒤 벡터 임베딩으로 변환한다. 관계 정보가 손실되고 초기 인덱싱 구축 비용은 비교적 낮다 | 노드와 관계로 구성된 지식 그래프로 저장한다. 관계와 맥락이 보존되고, 새 정보는 기존 노드와 관계에 맞추어 추가한다 |
| 검색 방식 | 질의와 chunk 간 벡터 유사도 기반으로 단순하고 빠르다 | 방법론별 핵심이 되는 부분이다. 서브그래프를 탐지해 나열하거나 커뮤니티를 탐지해 요약본을 활용한다 |
| 응답 생성 | 단순 사실 질의에 빠르고 정확하다 | 복잡한 상호의존 관계를 포착해 맥락이 풍부하다 |
| 적합한 상황 | 고객 지원 챗봇에서 FAQ와 매뉴얼을 즉시 조회하는 경우, 단일 제품 설명서 QA | 의학과 신약 연구 분석, 법률 판례 분석, 산업 트렌드 분석 |

두 방식이 갈라지는 근본 지점은 지식 표현이다. vanilla RAG는 문서를 chunk로 자르는 순간 chunk 사이의 관계를 버린다. 검색은 빠르지만 여러 문서에 흩어진 사실을 이어 붙여야 답이 되는 질문에는 재료가 모자란다. graph 기반 RAG는 그 관계를 노드와 엣지로 남겨 두는 대신 인덱싱 단계에서 LLM 호출 비용을 치른다.

graph 기반 RAG가 유리한 세 영역은 슬라이드에 구체적인 작업 내용까지 적혀 있다. 의학과 신약 연구 분석은 수많은 논문에서 약물과 유전자와 질환의 관계를 추론하는 일이고, 법률 판례 분석은 선례와 법령의 인용 관계를 추적하는 일이며, 산업 트렌드 분석은 기술 경영 관점에서 기술 혁신 인사이트를 도출하는 일이다. 발표자는 마지막 항목이 자신의 개인 연구 주제라고 밝힌다.

이 표에서 눈여겨볼 대목은 인덱싱 비용에 대한 서술이다. 발표자는 새 데이터를 기존 그래프에 추가하는 비용이 개인 경험상 그리 크지 않다고 본문에서 두 번 언급하고, 결론에서 이를 연구 제언으로 발전시킨다.

### 지식 그래프 구축

첫 번째 연구 질문은 지식 그래프를 어떻게 만드는가다. 이미 구축된 지식 그래프를 활용하는 경로와 LLM 프롬프트로 코퍼스에서 triplet을 추출하는 경로가 있고, 다수의 연구가 후자를 택한다. 추출 대상은 주어, 관계, 목적어로 이루어진 triplet이다.

| 요소 | 추출 필드 |
|---|---|
| entity | entity name, entity type, entity description |
| relationship | source entity, target entity, relationship description, 설명에 필요한 부가 정보 |

이 형식에서 entity name이 key가 되고 나머지 서술이 value가 되는 구조가 자연스럽게 나온다. 발표자는 이 프롬프트 형식이 GraphRAG를 기점으로 표준화되어 이후 연구들이 모두 같은 방식을 따른다고 정리한다. 뒤에서 볼 LightRAG의 key-value 재표현은 이 구조를 그대로 활용한 설계다.

### Graph retrieval 패턴

두 번째 연구 질문은 구축된 지식 그래프에서 사용자 질의와 관련된 정보를 어떻게 뽑는가다. 발표자는 이 질문을 세미나의 메인 연구 질문으로 지목한다. 그래프에서 정보를 뽑는 방식은 다섯 가지로 나뉜다.

| 패턴 | 뽑는 대상 |
|---|---|
| 주요 노드 | 질의와 연관된 entity만 본다 |
| 주요 관계 | 질의와 연관된 relation을 본다 |
| 주요 경로 | 방향이 있는 그래프라면 시작점에서 방향을 따라 경로를 탐색한다 |
| 서브그래프 | triplet을 모아 부분 그래프를 만든다 |
| hybrid | 위의 방식을 종합한다 |

서브그래프 항목에 대해 발표자는 발표 도중 스스로 표현을 정정한다. 경로들을 모아 놓은 것이라기보다 triplet을 모아 놓은 것이라는 서술이 더 정확하다는 것이다.

각 패턴에는 대표 방법론이 붙는다.

| 활용 대상 | 방법론 | 세미나가 소개한 동작 |
|---|---|---|
| entity(노드) | HippoRAG | 질의와 연관된 entity를 검색한 뒤 일련의 과정을 거쳐 주요 entity만 필터링하고, 그 entity가 포함된 passage를 활용한다 |
| 서브그래프 | GraphRAG | community detection을 수행한 뒤 커뮤니티별 요약문을 document로 활용한다. 커뮤니티 자체가 서브그래프에 해당한다 |
| 서브그래프 | CausalRAG | 질의와 연관된 entity 검색을 시작으로 s-hop 서브그래프를 구축하고, 그 구축 경로에 대한 요약문을 활용한다 |
| 기존 KG에 모듈 추가 | LightRAG | entity와 relation 각각을 이름과 설명문의 key-value로 재표현하고 이를 document로 활용한다 |
| 기존 KG에 모듈 추가 | LeanRAG | GMM으로 노드를 클러스터링해 상위에 클러스터 요약 노드를 두고, 수직으로 연결된 노드 정보와 해당 entity가 포함된 passage를 활용한다 |

entity가 포함된 원문 passage를 컨텍스트에 함께 붙이는 관행 역시 표준화되었다고 발표자는 덧붙인다. 이 관행이 표준이 되었다는 사실이 뒤에서 다룰 상충 결과의 배경이 된다.

### 대표 방법론 연구 흐름

슬라이드 9장은 2024년부터 2026년까지의 흐름도를 제시한다. 각 방법론의 정의와 함께, 그 방법론이 지적받은 한계가 화살표로 다음 방법론에 연결되는 구조다.

![[assets/dsba-2026-paper-review-graph-based-rag/fig03.png]]
*Figure 3: 2024년부터 2026년까지의 대표 방법론 연구 흐름. 화살표에 붙은 문구가 앞선 방법론이 지적받은 한계다 (DSBA 세미나 슬라이드 9).*

| 방법론 | 한 줄 정의 | 흐름도가 붙인 한계 |
|---|---|---|
| GraphRAG | LLM으로 지식 그래프와 커뮤니티 요약을 사전 구축해 전체 코퍼스에 대한 글로벌 질의응답을 가능하게 하는 프레임워크 | LLM의 높은 토큰 비용과 글로벌 요약의 한계, 글로벌 요약으로 인한 precision 하락 |
| HippoRAG | 인간 해마의 기억 메커니즘을 모방해 LLM으로 구축한 지식 그래프와 Personalized PageRank를 결합하고, 멀티홉 질의에서 효과적인 연상 검색을 구현한 RAG | 대규모 데이터에서 확장이 어렵고, entity 중심 검색으로 정보 고립이 발생한다 |
| HippoRAG2 | HippoRAG에 passage 노드와 LLM 필터링 triplet을 추가해 단순 QA부터 복잡한 멀티홉 추론까지 포괄하도록 성능을 강화 | 흐름도에 별도 표기 없음 |
| LightRAG | entity라는 저수준과 토픽이라는 고수준을 동시에 검색하는 이중 레벨 검색 패러다임과 graph 기반 텍스트 인덱싱으로 응답의 다양성과 포괄성을 높인 경량 RAG | 흐름도에 별도 표기 없음 |
| CausalRAG | 단순 의미 유사도 대신 인과 그래프 기반 경로 탐색으로 검색 문맥을 결정해 응답의 인과적 근거와 충실도를 높임 | 인과 관계를 충분히 반영하지 못한다 |
| HugRAG | Hierarchical Causal Gating으로 전역 문맥과 지역 인과 경로 정제를 동시에 달성 | 흐름도에 별도 표기 없음 |
| HiRAG | GMM 기반 계층적 KG 인덱싱과 로컬, 글로벌, 브릿지 3단계 검색을 결합해 의미적으로 가까운 entity 간 연결성과 로컬 글로벌 지식 격차를 해결 | entity cluster 간의 연결이 부족하다 |
| LeanRAG | 다중 해상도 의미 집계로 구축된 계층적 지식 그래프에서 상하향식 앵커 기반 검색을 수행해 정보 중복을 최소화하고 정밀도를 높임 | 흐름도에 별도 표기 없음 |

이 지도에서 LeanRAG의 위치가 분명해진다. HiRAG가 계층 인덱싱을 먼저 도입했지만 entity cluster 간 연결이 부족하다는 한계를 남겼고, LeanRAG가 그 자리를 메운다.

### 평가 방식

graph 기반 RAG 연구가 쓰는 평가는 두 가지로 나뉜다.

| 구분 | Multi-hop QA | Open-ended QA |
|---|---|---|
| 방식 | 문서 여러 건에 걸쳐 여러 번의 추론 단계를 거쳐 답을 생성한다 | 다양한 도메인의 문서를 기반으로 질문을 직접 생성한 뒤 LLM-as-judge로 평가한다 |
| 지표 | Exact Match, Recall 등. 검색된 컨텍스트까지 함께 볼 때는 RAGAS를 쓴다 | Comprehensiveness, Diversity, Empowerment, Overall 등 |
| 예시 데이터셋 | HotpotQA. 슬라이드는 Mother Love Bone 밴드 관련 문항을 예시로 든다 | UltraDomain 코퍼스 |
| 세미나가 다룬 두 논문 | 메인 평가로 쓰지 않는다 | 두 논문 모두 이 방식을 택했다 |

open-ended QA의 질문 생성 방식은 GraphRAG 연구에서 시작되었다. persona 또는 시나리오를 정하고 그에 맞춰 질문을 직접 만드는 절차로, 사용자 5명과 task 5개, task별 질문 5개를 조합해 총 125개 질문을 생성한다.

네 지표는 답변의 서로 다른 성질을 본다. Comprehensiveness는 포괄성, Diversity는 관점의 다양성, Empowerment는 사용자의 의사결정을 얼마나 돕는지, Overall은 종합 품질이다. Diversity가 이 세미나에서 특히 자주 등장하는데, 두 논문이 각자의 핵심 설계를 제거했을 때 가장 크게 떨어진 지표가 모두 Diversity였기 때문이다.

### LightRAG의 설계

LightRAG는 지식 그래프를 대상으로 dual-level retrieval을 통해 다각적 정보를 효율적으로 획득하는 방법론이다. 제목의 Light와 Fast가 가리키듯 효율성을 전면에 내세운다.

![[assets/dsba-2026-paper-review-graph-based-rag/fig04.png]]
*Figure 4: LightRAG 전체 구조. 왼쪽이 graph 기반 텍스트 인덱싱이고 오른쪽이 dual-level retrieval paradigm이다 (DSBA 세미나 슬라이드 14).*

**문제 정의.** 논문이 지적하는 기존 RAG의 한계는 세 가지다.

첫째, entity 간 관계에 기반한 정보를 얻기 어렵다. 둘째, 동일한 entity라도 다른 entity와 여러 종류의 관계를 가질 수 있는데 이를 충분히 반영하지 못하고 주제 간 연결도 찾지 못한다. 슬라이드가 든 예시 질의는 "전기차 사용량의 증가가 대기 오염과 교통 체계에 주는 영향은?"이다. 일반 RAG는 전기차, 대기 오염, 교통 체계 각각에 대한 문서를 따로 반환할 뿐 세 주제를 통합한 답을 만들지 못한다.

셋째, 그래프를 대상으로 검색할 때 그래프 크기에 따라 비효율적일 수 있다. 발표자는 그래프의 복잡도가 노드 수 N의 제곱에 비례한다고 설명한다. 즉 노드가 열 배 늘면 탐색 대상이 백 배로 늘어난다. 이 지적은 커뮤니티 단위로 무거운 사전 요약을 만드는 GraphRAG를 직접 겨냥한 것이다.

세 지적은 서로 방향이 다르다. 앞의 두 가지는 답변 품질 문제이고 마지막 하나는 비용 문제다. LightRAG의 설계는 이 둘을 한 수단으로 동시에 풀려는 시도다. 그래프 구조를 순회하지 않고 키워드 임베딩으로 필요한 entity와 relation만 집어내면, 여러 주제를 잇는 관계 정보를 얻으면서도 그래프 크기에 비례하는 탐색 비용을 피할 수 있다.

해결 방안은 키워드 기반 검색이다. 키워드로 서로 다른 entity 간 inter-dependent한 그래프 정보를 빠르고 효율적으로 찾아 반영한다. 논문이 내건 목표는 comprehensive information retrieval, enhanced retrieval efficiency, rapid adaptation to new data 세 가지다.

**Graph-based Text Indexing.** 코퍼스에서 entity와 relationship을 추출한 뒤 각각을 key-value 쌍으로 표현하고 중복을 제거한다.

| 요소 | key | value |
|---|---|---|
| entity | entity 이름 | 그 entity에 대한 설명 |
| relationship | (source, target) 쌍 | 그 관계에 대한 설명 |

슬라이드의 예시는 "Cardiologists assess symptoms to identify potential heart issues."라는 원문 한 문장에서 시작한다. 여기서 entity로 Cardiologists와 Heart Disease를 뽑고, relationship으로 Cardiologists가 Heart Disease를 diagnose한다는 관계를 뽑는다. 각각은 이름을 key로 하고 설명문을 value로 하는 사전 형태의 문자열이 된다. 발표 중 발표자는 이 슬라이드의 표기에 오기가 있었다고 직접 정정한다.

이 재표현의 목적은 임베딩 검색을 단순하게 만드는 것이다. 그래프 구조를 그대로 순회하는 대신 key와 value를 이어 붙인 문자열 하나를 임베딩해 두면, 질의 쪽에서도 문자열 하나만 임베딩해 유사도를 재면 된다.

![[assets/dsba-2026-paper-review-graph-based-rag/fig05.png]]
*Figure 5: entity와 relationship을 key-value로 재표현한 예시. 원문 한 문장에서 entity 두 개와 relationship 하나를 뽑아 각각 이름과 설명문 쌍으로 옮긴다 (DSBA 세미나 슬라이드 16).*

**Dual-level Retrieval.** 그래프 데이터를 다룰 때는 로컬 관점과 글로벌 관점을 함께 잡아야 한다는 것이 이 설계의 전제다. 슬라이드는 두 관점을 질의 예시로 구분한다.

| 관점 | 예시 질의 | 대응 retrieval |
|---|---|---|
| Specific | Who wrote 'Pride and Prejudice'? | Low-level Retrieval |
| Abstract | How does artificial intelligence influence modern education? | High-level Retrieval |

핵심 설계 판단은 질의 자체를 글로벌형과 로컬형으로 분류하지 않는 것이다. 대신 질의 하나에서 두 레벨의 키워드를 모두 뽑아 둘 다 쓴다. 질의를 사전에 분류하려면 분류기가 필요하고 분류가 틀리면 회복할 방법이 없는데, 두 키워드를 함께 뽑으면 그 위험이 사라진다.

절차는 세 단계로 진행된다.

| 단계 | 하는 일 |
|---|---|
| 1. Query Keyword Extraction | keyword generation 지시 프롬프트로 high-level 키워드(전반적 concept와 theme)와 low-level 키워드(구체적 entity와 디테일)를 뽑는다. 프롬프트에는 few-shot 예시가 붙는다 |
| 2. Keyword Matching | 뽑은 키워드를 모두 이어 붙여 문자열 하나로 만든 뒤 임베딩을 구한다. local query keywords는 entity 노드의 key와 value 문자열 임베딩과 비교하고, global query keywords는 relation의 key와 value 문자열 임베딩과 비교한다. 그 결과 특정 개수의 entity와 relation이 검색된다 |
| 3. Incorporating High-Order Relatedness | 검색된 노드와 relation으로 구성된 서브그래프 정보를 텍스트로 나열하고 entity의 출처 원문도 포함한다. 원문이 과도해지지 않도록 등장 횟수가 높은 상위 원문만 고른다 |

두 번째 단계의 대응 관계가 이 방법론의 이름값이다. 구체적인 entity를 묻는 low-level 키워드는 entity 쪽에 매칭되고, 개념과 주제를 묻는 high-level 키워드는 relation 쪽에 매칭된다. relation이 글로벌 관점을 담당하는 이유는 관계 서술이 두 entity를 잇는 맥락 정보를 담고 있어서다.

![[assets/dsba-2026-paper-review-graph-based-rag/fig06.png]]
*Figure 6: Dual-level Retrieval Paradigm. low-level 키워드는 entity에, high-level 키워드는 relation에 매칭되고 그 결과에 출처 원문이 붙는다 (DSBA 세미나 슬라이드 17).*

### LeanRAG의 설계

LeanRAG는 평면 지식 그래프 내 entity를 대상으로 hierarchical clustering을 적용해 상위 개념 간에도 모두 연결되도록 만드는 방법론이다.

![[assets/dsba-2026-paper-review-graph-based-rag/fig08.png]]
*Figure 8: LeanRAG 전체 프레임워크. (a) 지식 그래프 구축, (b) 계층적 의미 집계, (c) inference 세 단계로 나뉜다 (DSBA 세미나 슬라이드 29).*

**문제 정의.** 논문이 겨냥하는 선행 연구는 둘이다.

| 대상 | 지적 내용 |
|---|---|
| GraphRAG | 여전히 크고 coarse-grained한 community summary가 반환되어 내용이 중복될 수 있고, community summary 사이에 연결이 없다 |
| HiRAG (2025) | high-level summary 노드 간에 연결이 없으며, retrieval 시 그래프 구조에 대한 정보가 잘 보존되지 않는다 |

두 지적의 공통 지점이 명확하다. 상위 층 요약을 만드는 시도는 이미 있었지만, 그 요약들 사이를 잇는 관계를 만든 연구는 없었다는 것이다. 발표자는 이 대목을 본 연구의 핵심으로 강조한다.

**Hierarchical Knowledge Graph Aggregation.** 계층 그래프는 층들의 모임이고, 각 층은 그 아래 층의 abstract view다. 각 층은 노드 집합, 관계 집합, entity description 모음, relationship description 모음으로 구성된다.

| 구성 요소 | 내용 |
|---|---|
| 층 구조 | $H = \{G_0, G_1, \ldots, G_k\}$. $G_0$가 평면 지식 그래프인 base layer다 |
| 각 층 | $G_i = (V_i, R_i, D_{ver}^i, D_{rel}^i)$. 아래 층 $G_{i-1}$의 abstract view에 해당한다 |
| 최대 층 수 | 평면 KG의 노드 수 $N$에 대해 $\log_2 N + 1$ |
| 클러스터링 | $G_{i-1}$ 노드의 description을 임베딩한 뒤 Gaussian Mixture Clustering으로 $m$개 클러스터를 만든다 |
| 클러스터 수 결정 | Bayesian Information Criterion이 최소가 되는 $m$을 고른다 |

최대 층 수가 $\log_2 N + 1$이라는 것은 층을 올라갈 때마다 노드 수가 대략 절반으로 줄어든다는 가정에서 나온다. 노드가 10만 개인 그래프라면 층은 18개 안팎이 된다.

클러스터 $C_j$를 대표하는 abstract entity $\alpha_j$는 클러스터 내 entity와 relation 정보를 템플릿에 담아 LLM에 입력하고 이름과 설명을 받아 만든다. 프롬프트는 LeanRAG 공식 GitHub 저장소의 `prompt.py`에 공개되어 있고 발표자가 슬라이드에 링크를 걸어 두었다.

**Aggregated Relation Generation.** 이 절차가 본 연구의 핵심이다. 기본 지식 그래프의 relationship 표기 형식은 `relationship<|>{SBJ}<|>{OBJ}<|>{DESCRIPTION}`이다.

슬라이드의 예시는 base layer에 E1부터 E5까지 다섯 노드를 두고, E1, E3, E4를 한 클러스터로, E2, E5를 다른 클러스터로 묶는다. 두 클러스터를 잇는 관계로는 r32와 r45가 존재한다. 이때 각 클러스터에서 만들어진 abstract 노드 $\alpha_1$과 $\alpha_2$ 사이의 관계를 다음 규칙으로 생성한다.

| 조건 | 처리 |
|---|---|
| 두 클러스터를 잇는 모든 relationship 표기의 토큰 수가 기준 하이퍼파라미터보다 훨씬 적을 때 | 기존 관계들을 단순히 연결한다 |
| 두 클러스터를 잇는 모든 relationship 표기의 토큰 수가 기준 하이퍼파라미터보다 훨씬 많을 때 | LLM을 이용해 새 관계를 산출한다 |

예시를 따라가면 절차가 분명해진다. 파란 클러스터는 E1, E3, E4를 담고 주황 클러스터는 E2, E5를 담는다. 두 클러스터를 실제로 잇는 관계는 r32와 r45 둘뿐이다. 이 두 관계의 표기를 이어 붙인 토큰 수가 임계값 아래이면 $\alpha_1$과 $\alpha_2$ 사이에 그대로 옮겨 붙이고, 임계값을 넘으면 LLM에 넘겨 두 상위 개념 사이의 관계를 새 문장으로 합성한다.

임계값을 둔 이유는 비용 때문이다. 이을 관계가 몇 개뿐이면 그대로 붙여도 컨텍스트가 길어지지 않지만, 수십 개라면 LLM으로 압축해야 상위 층이 다시 장황해지지 않는다. 참고로 부모 노드와 자식 노드 사이의 relationship은 별도로 표기하지 않는다. 계층 구조상 자명한 포함 관계이므로 따로 적을 이유가 없고, 적으면 컨텍스트만 늘어난다.

이 절차가 기여로 인정받는 이유는 앞선 계층 방법론들이 여기서 멈췄기 때문이다. 상위 층에 요약 노드를 만드는 일까지는 여러 연구가 했지만, 그 요약 노드들 사이를 잇는 관계를 만든 연구는 없었다. 관계가 없으면 계층은 서로 독립된 수직 경로의 모음이 되고, 서로 다른 경로에 걸친 질의는 다시 root까지 올라가야 답이 된다.

**Structured Retrieval via Lowest Common Ancestor.** retrieval은 두 단계다.

| 단계 | 하는 일 |
|---|---|
| Initial Entity Anchoring | 노드 임베딩을 기준으로 질의와 유사한 상위 n개를 골라 seed entity로 삼는다 |
| Contextualization via LCA Path Traversal | 계층 지식 그래프 위에서 seed entity를 모두 연결하는 서브그래프를 Lowest Common Ancestor 기법으로 찾는다 |

LCA를 쓰는 이유는 평면 지식 그래프만 놓고 보면 서로 다른 노드를 잇는 경로가 지나치게 많기 때문이다. 계층 구조 위에서 공통 조상을 찾으면 경로가 하나로 좁혀지고, 저자들은 이 경로가 의미적 중복을 최소화한다고 주장한다.

![[assets/dsba-2026-paper-review-graph-based-rag/fig09.png]]
*Figure 9: LeanRAG의 처리 흐름. 코퍼스를 인덱싱해 계층 그래프를 만들고 질의는 LCA 검색으로 처리한다 (DSBA 세미나 슬라이드 31).*

컨텍스트는 경로 안의 모든 entity와 relationship, 그리고 entity의 출처 원문 chunk로 구성한다. 원문은 많이 등장한 상위 몇 개만 고르며 그 개수는 하이퍼파라미터다. 이 부분은 LightRAG의 컨텍스트 구성 방식과 사실상 같다.

### 두 설계의 대비

같은 평면 지식 그래프에서 출발하지만 두 방법론이 그래프를 확장하는 방향은 정반대다.

| 비교 항목 | LightRAG | LeanRAG |
|---|---|---|
| 확장 방향 | 수평. 평면 그래프를 그대로 두고 표현 방식만 바꾼다 | 수직. 평면 그래프 위에 클러스터 층을 쌓는다 |
| KG에 더하는 모듈 | entity와 relation의 key-value 문자열 인덱스 | GMM 클러스터링으로 만든 abstract entity와 abstract relation |
| 글로벌 정보를 얻는 수단 | 질의에서 뽑은 high-level 키워드를 relation에 매칭 | 계층 구조를 거슬러 올라가며 상위 층 abstract 노드를 수집 |
| 로컬 정보를 얻는 수단 | 질의에서 뽑은 low-level 키워드를 entity에 매칭 | seed entity와 그 anchor 원문 |
| 중복을 줄이는 방법 | 등장 횟수 상위 원문만 골라 컨텍스트에 넣는다 | LCA로 경로를 좁혀 의미 중복을 줄인다 |
| 내세운 강점 | 효율. 토큰 수, API 호출, 인덱싱 시간, retrieval 시간 | 정밀도. 컨텍스트 토큰 수가 가장 적으면서 성능은 가장 높다 |
| 직접 겨냥한 선행 연구 | GraphRAG의 그래프 크기 대비 비효율 | GraphRAG의 성긴 요약과 HiRAG의 상위 노드 간 연결 부재 |

두 설계가 공유하는 전제는 같다. 로컬 정보와 글로벌 정보를 함께 잡아야 한다는 것이다. 다른 것은 글로벌 정보를 어디서 얻느냐다. LightRAG는 관계 서술에서 얻고 LeanRAG는 상위 층 요약 노드에서 얻는다.

## 결과

### 공통 실험 설정

두 논문은 같은 코퍼스와 같은 질문 생성 방식을 쓴다. 평가 모델과 채점 방식에서 갈린다.

| 항목 | LightRAG | LeanRAG |
|---|---|---|
| 코퍼스 | UltraDomain. 18개 분야, 428권의 원서 | LightRAG와 동일 |
| 선택 분야 | Agriculture, Computer Science, Legal, Mix 4개 | LightRAG와 동일 |
| 질문 생성 | GraphRAG 방식 차용. 사용자 5명, task 5개, task별 질문 5개로 총 125개 | LightRAG와 동일 |
| 판정 모델 | GPT-4o-mini | DeepSeek-V3 |
| 답변 생성 모델 | 슬라이드에 별도 명시 없음 | DeepSeek-V3 |
| 임베딩 모델 | 확실치 않음. 코드에서 bge-m3와 OpenAI 3-large가 함께 확인된다 | BGE-M3 |
| 채점 방식 | 제안 방법론 대 나머지 pairwise 비교 | 서로 다른 5번의 답안에 대해 기준별 1점에서 10점 점수를 매기고 평균값을 비교 |

Mix 분야는 여러 도메인의 문서를 통합한 데이터셋이다. 이 분야가 뒤에서 LightRAG의 유일한 예외 결과를 만든다.

### LightRAG 실험

논문은 연구 질문 세 가지로 실험을 나눈다.

| 연구 질문 | 결과 |
|---|---|
| RQ1. 기존 RAG baseline 대비 생성 성능 | graph 기반 RAG가 일반 RAG를 크게 앞서고, 코퍼스 크기가 클수록 격차가 두드러진다. 평가 지표 중 Diversity가 가장 높다. GraphRAG 대비로도 전반적으로 우수하지만 Mix 데이터셋에서는 예외다 |
| RQ2. dual-level retrieval과 graph 기반 인덱싱의 기여 | high-level 키워드 검색을 제거할 때 성능 하락 폭이 가장 크다. 원문을 제거한 -Origin 조건에서는 오히려 간혹 성능이 향상된다. Agriculture 데이터셋에서 대부분의 지표가 향상되었고 나머지에서는 큰 차이가 없었다 |
| RQ3. 비용과 데이터 변화 적응성 | Table 3에서 LLM 입출력 토큰 수와 API 호출 횟수가 현저히 낮다. Table 5와 7에서 새 document를 그래프에 추가할 때 걸리는 시간과 메모리가 훨씬 적다. Table 6에서 retrieval 시간도 현저히 적다 |

RQ1의 Diversity 우위는 설계 의도와 맞아떨어지는 결과다. 두 레벨의 키워드를 모두 쓰면 답변이 여러 관점을 담게 되고, 그 성질을 재는 지표가 Diversity다.

Mix 데이터셋 예외에 대한 발표자의 해석은 GraphRAG가 이미 커뮤니티 요약을 쓰고 있어 다양한 주제가 그 요약 안에 잘 담겼기 때문이라는 것이다. 다만 발표자는 승률 차이 자체가 크지는 않다고 단서를 단다.

RQ3의 효율성 결과는 네 가지 비용을 각각 다른 표로 나눠 보여준다. LLM 입출력 토큰 수와 API 호출 횟수는 그래프를 만들 때 드는 비용이고, 새 document 추가에 걸리는 시간과 메모리는 그래프를 유지할 때 드는 비용이며, retrieval 시간은 질의를 받을 때마다 드는 비용이다. 세 종류의 비용이 모두 GraphRAG보다 낮다는 것이 LightRAG가 Light와 Fast를 제목에 넣은 근거다. 커뮤니티를 탐지하고 커뮤니티마다 요약을 생성하는 단계를 통째로 없앤 설계의 직접적인 귀결이다.

RQ2의 원문 제거 결과는 이 세미나에서 가장 중요한 관찰로 이어진다. 저자들은 원문에 noise나 무관한 내용이 포함될 수 있어 원문을 항상 붙이는 것이 늘 성능 향상으로 이어지지는 않는다고 결론짓는다. 발표자는 청중에게 이 결과를 기억해 두라고 명시적으로 요청하는데, 뒤이어 볼 LeanRAG가 정반대 결과를 내기 때문이다.

### LeanRAG 실험

논문은 연구 질문 네 가지로 실험을 나눈다.

| 연구 질문 | 결과 |
|---|---|
| RQ1. 다양한 도메인에서 최신 baseline 대비 QA 성능 | LeanRAG가 전반적으로 우수하다. HiRAG를 포함해 계층 그래프를 활용할 때 더 효과적인 결과가 나온다 |
| RQ2. retrieval 전략이 중복을 줄이면서 품질을 높이는지 | 검색된 컨텍스트의 토큰 수가 적을수록 중복이 적다는 전제로 Qwen3-14B를 써서 평가했다. LeanRAG의 컨텍스트가 가장 짧아 방법론 이름의 Lean을 뒷받침한다 |
| RQ3. aggregated entity 간 관계 생성의 기여 | abstract entity 간 relation을 제거하면 성능이 하락하고, 특히 Diversity의 하락 폭이 가장 크다. 이 비교는 pairwise로 진행했다 |
| RQ4. 구조적 지식만으로 충분한지, 원문 컨텍스트가 필수인지 | 코퍼스 원문이 필요하다는 결론이다. 구조적 정보는 graph retrieval로 얻고 실제 내용은 원문 chunk로 얻어 두 정보를 융합해야 한다는 것이 저자 주장이다 |

RQ1에서 LeanRAG와 함께 상위권에 오른 것이 HiRAG라는 점이 결론의 근거가 된다. 두 방법론의 공통점이 계층 그래프이므로, 계층 구조 자체가 효과가 있다는 해석이 가능해진다. 다만 HiRAG는 LeanRAG가 문제 정의에서 직접 겨냥한 선행 연구이기도 하다. 상위 노드 간 연결이 없다는 한계를 지적받은 방법론이 그럼에도 상위권에 오른 것은, 계층 구조라는 뼈대만으로도 상당한 이득이 나오고 LeanRAG가 더한 abstract relation은 그 위의 증분이라는 뜻으로 읽힌다.

RQ2의 전제도 짚어 둘 필요가 있다. 컨텍스트 토큰 수가 적을수록 중복이 적다는 가정은 직접적인 중복 측정이 아니라 대리 지표다. 같은 정보를 짧게 담았는지, 아니면 필요한 정보를 덜 담았는지는 토큰 수만으로 구분되지 않는다. 이 실험이 RQ1의 성능 우위와 짝을 이룰 때 비로소 근거가 되는 구조다.

RQ2에서 발표자가 의외라고 짚은 대목은 LightRAG가 GraphRAG보다 긴 컨텍스트를 산출했다는 점이다. 발표자는 LightRAG가 원문 코퍼스까지 붙여서일 것이라고 추정하면서도, LeanRAG 역시 원문을 붙이므로 같은 논리로는 설명이 되지 않는다고 스스로 반박하고 더 자세한 분석이 있었으면 좋았겠다고 말한다.

![[assets/dsba-2026-paper-review-graph-based-rag/fig11.png]]
*Figure 11: 도메인 네 곳의 retrieval 컨텍스트 토큰 소비량 비교. LeanRAG가 가장 적고 LightRAG가 가장 많다 (DSBA 세미나 슬라이드 39).*

RQ3의 Diversity 하락은 LightRAG의 high-level 키워드 ablation과 같은 방향을 가리킨다. 계층적 관점은 곧 글로벌 관점을 포착하는 수단이므로, 그 수단을 빼면 답변의 관점 다양성이 먼저 무너진다. 로컬 관점과 글로벌 관점을 동시에 잡아야 한다는 세미나의 논지가 서로 다른 두 논문에서 같은 형태로 확인된 셈이다.

### 원문 첨부 효과의 상충

두 논문의 결론이 정면으로 어긋나는 지점이다.

| 비교 항목 | LightRAG | LeanRAG |
|---|---|---|
| 컨텍스트에서 원문 chunk 제거 시 | 간혹 성능 향상. Agriculture에서 대부분의 지표가 향상 | 성능 하락 |
| 저자 해석 | 원문에 noise나 무관한 내용이 포함될 수 있다 | 구조 정보와 실제 내용을 융합해야 한다 |
| 채점 방식 | pairwise 비교 | 1점에서 10점 점수의 평균 |
| 판정 모델 | GPT-4o-mini | DeepSeek-V3 |

발표자는 이 상충이 채점 방식의 차이에서 오는 맹점일 수 있다고 본다. 점수 평균 방식에서는 두 조건의 미묘한 차이가 같은 점수 구간에 묻힐 수 있으므로, 컨텍스트를 넣은 답변과 넣지 않은 답변을 pairwise로 직접 비교했다면 더 적절했으리라는 지적이다.

세미나가 이 상충을 해소하지 않고 열어 둔 채 마치는 점이 중요하다. 원문을 언제, 어떻게, 얼마나 융합할지는 발표 시점에 미해결 과제다.

### 발표자의 종합 평가

| 대상 | 긍정 평가 |
|---|---|
| LightRAG | 사용자 질의를 두 레벨 키워드로 치환해 글로벌과 로컬과 효율을 모두 포착했다. 키워드 검색 덕분에 비교적 디테일한 정보 보존도 가능할 것으로 본다. 지식 그래프 요소를 key-value로 표현한 방법의 유용성이 높다. 연구 질문에 따라 실험을 깔끔하게 구성했다 |
| LeanRAG | 평면 지식 그래프를 계층적으로 잘 확장했다. 그래프의 로컬 정보와 글로벌 정보를 동시에 탐색하는 데 적합하다. GraphRAG의 community summary를 비교적 lean하게 표현했다 |

## 한계

### 두 논문에 대한 발표자의 비판

| 대상 | 비판 내용 |
|---|---|
| LightRAG | 논문과 코드 사이에 간극이 있다. 논문은 질의에서 뽑은 low-level 키워드와 entity 이름(key)을 비교한다고 서술하지만, 코드는 entity의 이름과 설명(key와 value)을 대상으로 검색한다. 발표자는 코드 기준으로 설명을 진행했다 |
| LeanRAG | LCA 채택 결과를 함께 제시하지 않았다. 어떤 entity가 anchor가 되어 몇 개 층까지 올라갔는지 사례 분석이 없다. 대부분의 질의가 root까지 올라갔다면 LCA가 실질적 효과를 보지 못한 것이다 |
| LeanRAG | 효율성 비교 평가가 부재하고 추론 시간 비교 실험도 없다. 계층 그래프는 초기에 한 번 구축할 수 있으므로 LCA 탐색에 걸리는 시간이 관건일 것이라고 발표자는 추정한다 |
| LeanRAG | 채점을 1점에서 10점 평균으로 한 것이 아쉽다. pairwise 비교가 더 정확했을 것이라는 지적이 RQ4 해석과 연결된다 |

### 자료 자체의 한계

이 페이지의 근거는 YouTube 자동 자막을 정제한 transcript와 발표 슬라이드 PDF 두 가지다. 자동 자막은 고유명사를 자주 잘못 받아쓰므로 판독은 슬라이드를 1차 출처로 삼았다. 주요 오인식 사례는 다음과 같다.

| 자막 표기 | 슬라이드 기준 원어 | 판정 근거 |
|---|---|---|
| 라이레그, 라이베그, 라레그, 라이드레그 | LightRAG | 슬라이드 14~27장 |
| 린레그 | LeanRAG | 슬라이드 29~42장 |
| 지지크래프, 논리지 그래프 | 지식 그래프 | 전 구간 |
| 히포렉그 | HippoRAG | 슬라이드 8장의 entity 활용 방법론 |
| 하이래그 | HiRAG | 슬라이드 30장과 38장. 계층 방법론 문맥 |
| 커절 레그 | CausalRAG | 슬라이드 8장 |
| 트플 AI | AAAI | 슬라이드 2장의 AAAI-26 표기 |
| 1년의 과정 | 일련의 과정 | 슬라이드 8장의 HippoRAG 설명 |
| 428개의 원소 | 428권의 원서 | 슬라이드 22장의 UltraDomain 설명 |
| 쿠 3 14 빌리언 | Qwen3-14B | 슬라이드 39장 |
| 멀파 Q웨이 | 판독 불가 | 슬라이드 10장은 HotpotQA를 멀티홉 QA 예시로 든다 |

자료 안의 불일치도 남는다. 슬라이드 17장은 LightRAG가 질의 자체를 분류하기보다 질의에서 두 레벨의 키워드를 뽑아 모두 쓴다고 적는데, 같은 발표의 슬라이드 27장 take-away는 "기본적으로 query를 구분한 후 진행되지만"으로 시작한다. 두 문장의 주어가 서로 다른 것으로 보이나 자료만으로는 확정할 수 없다. 또 슬라이드 42장은 LCA를 "Lowest Ancestor Common"으로 적어 다른 슬라이드의 "Lowest Common Ancestor"와 어순이 어긋난다.

세미나는 두 논문의 정량 수치를 거의 인용하지 않는다. 슬라이드는 원논문의 표 이미지를 붙이고 경향만 서술하므로, 정확한 벤치마크 점수가 필요하면 각 원논문 페이지를 참조해야 한다. 이 페이지가 담는 것은 승률과 점수 자체가 아니라, 발표자가 그 수치를 어떻게 읽었고 어디에서 두 논문이 어긋난다고 판단했는가다.

한 가지 더 짚어 둘 점은 이 세미나의 GraphRAG 서술 범위다. 발표자는 GraphRAG를 커뮤니티 요약을 사전 구축해 글로벌 질의응답에 쓰는 시스템으로만 소개하며, 질의 유형에 따라 검색 모드를 나누는 구성은 다루지 않는다. GraphRAG의 세부는 [[database/edge-2024-from-local-to-global]]과 [[database/dsba-2025-graphrag-paper-review]]가 담당한다.

### 남은 연구 질문

발표자가 결론에서 제시한 과제는 네 가지다.

| 과제 | 내용 |
|---|---|
| 고정 지식 그래프 | 코퍼스에서 추출한 것이 아니라 외부에서 주어진 고정 지식 그래프를 다룰 때 어떤 retrieval이 효과적인지. 지식 그래프 요소에 원문이 부재한 상황이 문제가 된다 |
| 일반 그래프 | 지식 그래프가 아닌 일반 그래프에 어떤 retrieval이 효과적인지 |
| 컨텍스트화 효율 | 새 데이터를 기존 그래프에 추가하는 비용은 발표자 경험상 크지 않다. 검색 이후 컨텍스트화 과정의 소요 시간이 전체의 대부분을 차지하므로 이 단계의 효율화가 연구 포인트가 된다 |
| 원문 융합 방식 | LightRAG와 LeanRAG의 상충 결과를 설명하고, 원문을 언제 어떻게 얼마나 붙일지 정하는 체계가 필요하다 |

세 번째 과제는 통념을 뒤집는 관찰이라 눈여겨볼 만하다. graph 기반 RAG의 비용 부담이 인덱싱에 있다고 보기 쉬운데, 발표자는 실제 병목이 retrieval 이후의 컨텍스트화에 있다고 본다. 이 관찰은 LeanRAG 비판과도 이어진다. 발표자가 LeanRAG의 효율성 실험 부재를 지적하면서 계층 그래프는 초기에 한 번 만들면 되고 LCA 탐색 시간이 관건일 것이라고 추정한 것이 같은 논지다.

네 과제는 서로 독립적이지 않다. 첫 번째와 네 번째는 원문의 존재 여부를 공통 변수로 놓고 있고, 두 번째와 세 번째는 지식 그래프라는 전제를 각각 위와 아래에서 흔든다. 세미나는 이 네 질문을 답하지 않고 열어 둔 채 마치며, 발표자 본인의 산업 트렌드 분석 연구가 그중 일부를 다루고 있다고만 밝힌다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| Graph retrieval | 질의를 받아 지식 그래프에서 노드, 관계, 경로, 서브그래프를 뽑는 단계. 세미나가 방법론별 핵심으로 지목한 지점이다 |
| Dual-level Retrieval | LightRAG의 설계. 질의에서 high-level 키워드와 low-level 키워드를 함께 뽑아 각각 relation과 entity 검색에 쓴다 |
| Key-value 재표현 | LightRAG가 entity를 (이름, 설명), relationship을 ((source, target), 설명) 쌍 문자열로 직렬화한 방식 |
| Abstract entity | LeanRAG가 클러스터 하나를 대표해 상위 층에 새로 만든 가상 노드. 이 노드들 사이에 관계까지 만드는 것이 LeanRAG의 기여다 |
| Lowest Common Ancestor | 계층 그래프에서 여러 노드의 공통 조상 중 가장 낮은 노드. LeanRAG는 seed entity를 모두 연결하는 서브그래프를 이 방식으로 찾아 의미 중복을 줄인다 |
| Open-ended QA | persona와 task 조합으로 질문을 자동 생성해 LLM-as-judge로 평가하는 방식. GraphRAG 연구부터 차용되었다 |

## 관련 페이지

- [[database/guo-2025-lightrag-simple-and-fast]]: 세미나가 다룬 첫 번째 논문의 원전. dual-level keyword retrieval과 key-value 인덱스의 상세와 정량 수치를 담는다.
- [[database/zhang-2026-leanrag-knowledge-graph-based-generation]]: 세미나가 다룬 두 번째 논문의 원전. semantic aggregation과 LCA retrieval의 상세와 정량 수치를 담는다.
- [[database/edge-2024-from-local-to-global]]: 세미나가 서막으로 배치한 GraphRAG 원논문. 두 논문의 공통 baseline이자 KG 추출 프롬프트 형식과 open-ended QA 평가 방식의 출처다.
- [[database/dsba-2025-graphrag-paper-review]]: 같은 발표자가 GraphRAG를 다룬 선행 세미나. 이 페이지의 직접적인 전편에 해당한다.
- [[database/gutierrez-2025-from-rag-to-memory-non]]: 세미나 슬라이드가 multi-hop QA 평가 문헌으로 인용한 HippoRAG2 논문. 연구 흐름도에도 배치되어 있다.
- [[overviews/lightrag-family-graph-rag-overview]]: GraphRAG 계열 전체를 여러 자료로 합성한 overview. 이 세미나의 비판과 남은 연구 질문이 그 페이지에 반영되어 있다.
