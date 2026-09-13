---
title: "Graph-based RAG 계보: GraphRAG 트렁크와 LightRAG, LeanRAG, RAG-Anything"
type: overview
year: 2026
category: overviews
source_collection: synthesis
sources:
  - edge-2024-from-local-to-global.md
  - dsba-2025-graphrag-paper-review.md
  - guo-2025-lightrag-simple-and-fast.md
  - guo-2025-rag-anything-all-in-one-rag.md
  - hkuds-rag-anything.md
  - 9bow-2026-rag-anything-multimodal-rag-framework.md
  - zhang-2026-leanrag-knowledge-graph-based-generation.md
  - dsba-2026-paper-review-graph-based-rag.md
tags: [graph-rag, rag, knowledge-graph, lightrag, leanrag, rag-anything, community-detection, dual-level-retrieval, hierarchical-retrieval, lca, multimodal-rag, overview, synthesis]
study_path:
  - id: database/dsba-2025-graphrag-paper-review
    note: "RAG 구성 요소, 지식 그래프, community detection, sensemaking을 한국어로 먼저 잡는다. 43쪽 중 열한 장이 배경 지식이라 논문을 바로 열지 않아도 되는 진입로다."
  - id: database/edge-2024-from-local-to-global
    note: "계열 전체의 트렁크. entity 추출부터 Leiden community, community summary, map-reduce 답변까지 이후 모든 분기가 물려받는 파이프라인이 여기서 정의된다."
    prereq: ["database/dsba-2025-graphrag-paper-review"]
  - id: database/guo-2025-lightrag-simple-and-fast
    note: "첫 번째 분기. community 단계를 통째로 걷어내면 비용이 어디까지 내려가는지를 검색 토큰 61만에서 100 미만이라는 수치로 확인한다."
    prereq: ["database/edge-2024-from-local-to-global"]
  - id: database/zhang-2026-leanrag-knowledge-graph-based-generation
    note: "두 번째 분기. 같은 평면 지식 그래프 위에 층을 쌓고 상위 노드끼리 relation을 만든다. semantic island와 structure-retrieval mismatch라는 문제 정의가 핵심이다."
    prereq: ["database/edge-2024-from-local-to-global", "database/guo-2025-lightrag-simple-and-fast"]
  - id: database/dsba-2026-paper-review-graph-based-rag
    note: "두 분기를 나란히 놓고 읽는 자리. 원문 chunk 첨부 효과가 정반대로 나온다는 이 계열 최대의 미해결 지점이 여기서 명시된다."
    prereq: ["database/guo-2025-lightrag-simple-and-fast", "database/zhang-2026-leanrag-knowledge-graph-based-generation"]
  - id: database/9bow-2026-rag-anything-multimodal-rag-framework
    note: "세 번째 분기의 한국어 진입로. 도전 과제, 기여, 파이프라인, 설치까지를 한 편에 압축한다. 수치 인용은 다음 단계에서 다시 확인한다."
    prereq: ["database/guo-2025-lightrag-simple-and-fast"]
  - id: database/guo-2025-rag-anything-all-in-one-rag
    note: "modality 분기의 본편. dual-graph 구축과 dereferencing이 텍스트 전용 전제를 어떻게 깨는지, DocBench와 MMLongBench 수치로 확인한다."
    prereq: ["database/9bow-2026-rag-anything-multimodal-rag-framework"]
  - id: database/hkuds-rag-anything
    note: "논문이 수식으로 적은 것이 실제로는 어떤 인터페이스인지 확인하는 마지막 단계. 파서 선택, 환경 변수, 운영체제 의존처럼 논문에 없는 요구 사항이 여기 있다."
    prereq: ["database/guo-2025-rag-anything-all-in-one-rag"]
---

## 요약

이 저장소의 graph-based RAG 자료 여덟 편은 하나의 계보를 이룬다. 뿌리는 Microsoft Research의 GraphRAG이고, 거기서 세 방향의 분기가 나온다. LightRAG는 community 단계를 걷어내 비용을 낮추고, LeanRAG는 평면 지식 그래프 위에 층을 쌓아 정밀도를 올리며, RAG-Anything은 텍스트 전용이라는 전제를 깨고 이미지와 표와 수식을 같은 인덱스에 올린다.

이 페이지가 담당하는 것은 개별 자료의 요약이 아니다. 자료별 내용은 각 wiki 페이지가 맡고, 여기서는 네 방법이 무엇을 공유하고 어디서 갈라지는지, 서로의 수치를 어디까지 나란히 놓을 수 있는지, 어떤 순서로 읽어야 하는지를 다룬다.

가장 먼저 확인해야 할 사실은 네 방법의 직접 비교가 성립하지 않는다는 점이다. GraphRAG는 자체 합성 코퍼스와 GPT-4 계열 judge로, LightRAG는 UltraDomain과 GPT-4o-mini pairwise 판정으로, LeanRAG는 같은 UltraDomain을 DeepSeek-V3의 1점에서 10점 채점으로, RAG-Anything은 DocBench와 MMLongBench의 정답 기반 정확도로 평가한다. 같은 데이터셋을 쓴 LightRAG와 LeanRAG조차 채점 방식이 달라 승률과 점수를 겹쳐 읽을 수 없다.

그 결과 계열 전체를 관통하는 미해결 문제가 남는다. 검색된 그래프 요소에 원문 chunk를 함께 붙이는 것이 이득인지 손해인지에 대해 LightRAG와 LeanRAG가 정반대 결론을 내고, 이를 해소한 연구가 이 저장소에 없다.

## 배경

### GraphRAG가 연 문제 설정

이 계열은 벡터 RAG가 원리적으로 답하지 못하는 query 유형에서 출발한다. query는 사용자가 시스템에 던지는 질문 하나를 가리킨다. [[database/edge-2024-from-local-to-global|GraphRAG 원논문]]은 이 유형을 sensemaking이라 부르는데, 사람과 장소와 사건 사이의 연결에 의미를 부여해 흐름을 예측하고 행동하기 위한 과정을 가리킨다. "이 데이터셋의 주요 테마는 무엇인가" 같은 질문이 여기 해당한다.

답이 소수의 chunk 안에 국소적으로 들어 있지 않으므로 유사도 검색으로는 근거를 모을 수 없다. GraphRAG의 해법은 코퍼스 전체를 지식 그래프로 바꾼 뒤 그 그래프를 주제 단위 community로 나누고, community마다 요약문을 미리 만들어 두는 것이다. query가 들어오면 요약문마다 부분 답변을 만들고 그것들을 다시 합쳐 최종 답을 낸다.

[[database/dsba-2026-paper-review-graph-based-rag|DSBA 2026 세미나]]는 이 구도를 vanilla RAG와 대비해 정리한다. vanilla RAG는 문서를 chunk로 자르는 순간 chunk 사이의 관계를 버리고, graph-based RAG는 그 관계를 노드와 엣지로 남기는 대신 인덱싱 단계에서 LLM 호출 비용을 치른다. 세미나가 graph-based RAG에 적합하다고 본 영역은 의학과 신약 연구 분석, 법률 판례 분석, 산업 트렌드 분석 세 가지이고, vanilla RAG가 여전히 나은 영역은 고객 지원 챗봇의 FAQ 조회나 단일 제품 설명서 QA다.

### 이 저장소가 보유한 겹

여덟 편은 서로 다른 겹을 담당한다. 논문 세 편이 방법과 수치를 담고, 저장소 한 편이 운영 인터페이스를 담으며, 한국어 자료 세 편이 진입로와 비판을 담당한다. 특히 RAG-Anything은 논문과 저장소와 한국어 소개가 모두 있어 같은 시스템을 세 겹으로 볼 수 있는데, 겹마다 확인 가능한 범위가 다르므로 인용 시점에 어느 겹의 주장인지를 구분해야 한다.

## 자료 구성

| 자료 | 유형 | 이 계보에서의 역할 | 이 overview가 가져온 것 |
|---|---|---|---|
| [[database/edge-2024-from-local-to-global\|GraphRAG (Edge 2024)]] | paper | 계열의 트렁크 | 인덱싱 다섯 단계, 여섯 비교 조건, 토큰 비용, 평가 프레임 |
| [[database/dsba-2025-graphrag-paper-review\|GraphRAG 리뷰 (DSBA 2025)]] | article | 트렁크의 한국어 해설과 첫 비판 | 발표자 견해 아홉 건, 논문과 코드의 간극, DRIFT의 존재 |
| [[database/guo-2025-lightrag-simple-and-fast\|LightRAG]] | paper | 비용 분기 | key-value 인덱스, dual-level retrieval, 비용 실측, 원문 제거 ablation |
| [[database/zhang-2026-leanrag-knowledge-graph-based-generation\|LeanRAG]] | paper | 추상화 분기 | semantic island 문제 정의, aggregated relation, LCA 검색, 원문 제거 ablation |
| [[database/guo-2025-rag-anything-all-in-one-rag\|RAG-Anything]] | paper | modality 분기 | dual-graph 구축, dereferencing, DocBench와 MMLongBench 수치 |
| [[database/hkuds-rag-anything\|HKUDS/RAG-Anything]] | repo | modality 분기의 운영 인터페이스 | 파서 세 종, query 방식 세 가지, 설치와 운영 의존 |
| [[database/9bow-2026-rag-anything-multimodal-rag-framework\|RAG-Anything 한국어 소개]] | article | modality 분기의 한국어 진입로 | 소개 순서와 강조점, 도메인별 ablation 증감 |
| [[database/dsba-2026-paper-review-graph-based-rag\|Graph-based RAG 세미나 (DSBA 2026)]] | video | 두 분기를 나란히 놓은 비교 | retrieval 패턴 다섯 가지, 연구 흐름도, 원문 첨부 상충, 남은 연구 질문 |

한국어 자료 세 편 가운데 두 편은 같은 발표자의 시간 순차 세미나다. [[database/dsba-2025-graphrag-paper-review]]가 2025년 8월 GraphRAG 한 편을 깊게 다루고, [[database/dsba-2026-paper-review-graph-based-rag]]가 2026년 4월 그 이후 2년의 흐름을 지도로 그린다. 두 자료를 겹쳐 읽으면 한 연구자의 판단이 어떻게 이어지는지 확인할 수 있지만, 독립적인 외부 시각은 이 저장소에 없다.

## 계보

### 트렁크가 남긴 진단

[[database/dsba-2025-graphrag-paper-review|DSBA 2025 리뷰]]는 GraphRAG를 읽고 발표자 자신의 판단 아홉 건을 남긴다. 세 건은 논문 서술과 공식 코드가 어긋난다는 지적이고, 세 건은 평가 설계 비판이며, 나머지는 긍정 평가 하나와 후속 방향 제언이다. 이 가운데 마지막 슬라이드의 종합 견해 네 항목이 이후 분기가 실제로 향한 방향과 맞물린다.

| 진단 | 발표자의 서술 | 이후 분기에서의 전개 |
|---|---|---|
| 그래프의 정보 반영 효율 | 문서 본문 대비 지식 그래프가 얼마나 효율적으로 전체 정보를 반영하느냐가 핵심으로 보인다 | LightRAG가 key-value 직렬화로 검색 컨텍스트를 줄이고, LeanRAG가 retrieval 토큰을 baseline 평균 대비 약 46% 줄였다고 보고한다 |
| 고정된 프롬프트 | 고정된 프롬프트로 지식 그래프를 구축했고, 사용자 목적에 맞게 구축하는 방법이 성능을 좌우할 것으로 보인다 | RAG-Anything이 modality별 전용 프롬프트와 확장 가능한 처리기를 두어 도메인 확장 경로를 연다 |
| 요약의 상세 손실 | community summary를 쓰면 글로벌 정보는 반영되지만 본문의 상세 정보 손실은 불가피하다 | LeanRAG가 계층 구조와 상위 relation으로 같은 손실을 다르게 다룬다 |
| hybrid scheme의 필요 | 임베딩 벡터를 활용하는 hybrid scheme이 필수 불가결이며, community summary를 query 임베딩 유사도로 취사선택했으면 어땠을지 아쉬움이 남는다 | LightRAG의 키워드 임베딩 매칭과 LeanRAG의 base 층 anchoring이 모두 이 방향이다 |

네 번째 항목이 특히 직접적이다. 모든 community 요약을 훑는 대신 query와 가까운 것만 골라 쓰자는 제안인데, LightRAG와 LeanRAG가 실제로 그 방향으로 갔다. 그 대응 관계는 [[database/dsba-2025-graphrag-paper-review]] 자신이 본문에서 밝힌다.

별도로 남는 것이 논문과 코드의 간극이다. 같은 자료가 슬라이드 42에서 공식 코드에 DRIFT(Dynamic Reasoning and Inference with Flexible Traversal) 같은 추가 절차가 있다고 지적하고, [[database/edge-2024-from-local-to-global]] 페이지도 공식 구현체에 local search와 global search와 DRIFT search가 다중 검색 모드로 들어가 있다고 적는다. 원논문이 규정한 query 절차는 community summary 기반 map-reduce 단일 모드다.

### 분기가 바꾼 것

세 분기는 트렁크의 서로 다른 부분을 건드린다. 무엇을 덜어냈고 무엇을 더했는지로 나누면 차이가 분명해진다.

| 분기 | 트렁크에서 덜어낸 것 | 새로 더한 것 | 겨냥한 한계 | 근거 페이지 |
|---|---|---|---|---|
| LightRAG | community detection과 community report 생성 전체 | entity와 relation의 key-value 직렬화, dual-level 키워드 검색, 합집합 증분 갱신 | 그래프 순회 비용과 갱신 비용 | [[database/guo-2025-lightrag-simple-and-fast]] |
| LeanRAG | 평면 community 분할 | Gaussian Mixture Model 기반 계층 클러스터, 상위 entity 사이의 aggregated relation, LCA 경로 검색 | community가 성기고 상위 요약끼리 연결이 없다는 점 | [[database/zhang-2026-leanrag-knowledge-graph-based-generation]] |
| RAG-Anything | 텍스트 전용 인덱스라는 전제 | atomic content unit 추상화, cross-modal 그래프와 텍스트 그래프의 이중 구축, 합성 시점 dereferencing | 비텍스트 정보가 인덱스에 들어가지 못하거나 평문으로 평탄화되는 손실 | [[database/guo-2025-rag-anything-all-in-one-rag]] |

분기 사이의 위치 관계도 중요하다. RAG-Anything은 트렁크에서 바로 갈라지지 않고 LightRAG 위에 선다. [[database/hkuds-rag-anything]]의 README가 상단 배지와 시스템 개요에서 LightRAG 기반임을 명시하고, 텍스트 쪽 지식 그래프 인덱스와 query 모드를 그대로 받는다. 그 관계는 한 방향이 아니어서, 같은 README의 2026년 6월 항목은 LightRAG가 RAG-Anything을 통합해 multimodal RAG를 지원하게 됐다고 적는다.

LeanRAG의 직전 참조점은 HiRAG다. [[database/zhang-2026-leanrag-knowledge-graph-based-generation]]은 HiRAG를 당시 state-of-the-art로 인정하면서 상위 요약 노드 사이에 relation이 없다는 한계를 문제로 세운다. [[database/dsba-2026-paper-review-graph-based-rag]]의 연구 흐름도도 같은 자리에 LeanRAG를 놓는다. HiRAG 자체는 이 저장소에 없으므로 baseline 쪽 세부는 두 페이지가 인용한 범위로 제한된다.

## 공통 전제

네 방법이 공유하는 전제는 네 가지이고, 모두 이 계열 전체의 적용 범위를 규정한다.

첫째, 지식 그래프를 LLM이 코퍼스에서 뽑아낸다. 외부에서 주어진 고정 지식 그래프를 쓰지 않는다. [[database/dsba-2026-paper-review-graph-based-rag]]는 entity에서 이름과 타입과 설명을, relationship에서 출발 entity와 도착 entity와 관계 설명을 뽑는 프롬프트 형식이 GraphRAG 이후 사실상 표준이 되었다고 정리한다. 그래서 이후 방법론의 차이는 그래프를 어떻게 만드는가가 아니라 만들어진 그래프에서 무엇을 어떻게 뽑는가에서 생긴다.

둘째, 평가가 정답 없는 개방형 query를 전제한다. GraphRAG가 정립한 절차는 코퍼스 설명에서 persona 5명을 만들고 persona마다 task 5개, 조합마다 질문 5개를 만들어 데이터셋당 125문항을 얻는 방식이다. LightRAG와 LeanRAG가 이 절차를 그대로 가져다 쓴다. RAG-Anything만 정답이 있는 문서 QA 벤치마크로 옮겨 간다.

셋째, 검색은 임베딩 유사도와 구조 정보의 결합이다. 단일 벡터 검색만으로 부족하다는 것이 공통 가정이고, 결합 방식이 방법마다 다르다. GraphRAG는 community 요약으로, LightRAG는 키워드 임베딩과 1-hop 확장으로, LeanRAG는 base 층 anchoring과 LCA 경로로, RAG-Anything은 구조 탐색과 dense 검색의 병렬 실행으로 처리한다.

넷째, entity가 등장한 원문 chunk를 컨텍스트에 함께 붙이는 것이 표준 관행이다. [[database/dsba-2026-paper-review-graph-based-rag]]가 이 관행의 표준화를 명시하는데, 바로 그 관행의 효용을 두 논문이 반대로 측정한 것이 아래에서 다룰 상충의 배경이 된다.

## 검색 전략 비교

### 전략 대응표

같은 지식 그래프를 놓고도 무엇을 뽑느냐에 따라 완전히 다른 시스템이 된다. [[database/dsba-2026-paper-review-graph-based-rag]]는 뽑는 대상을 주요 노드, 주요 관계, 주요 경로, 서브그래프, 이 넷을 종합한 hybrid 다섯 가지로 나눈다. 이 저장소가 보유한 네 방법을 그 구분 위에 놓으면 다음과 같다.

| 방법 | 인덱스 단위 | query 시점 동작 | 글로벌 정보의 출처 | 원문 chunk | 검색 LLM 호출 |
|---|---|---|---|---|---|
| GraphRAG | entity, relationship, claim, 4단계 community summary | 한 level의 요약을 무작위로 섞어 자른 뒤 chunk마다 부분 답변과 0에서 100 사이 helpfulness score를 만들고 점수 순으로 합친다 | community summary 자체 | 쓰지 않는다. TS 조건만 원본 chunk를 직접 쓴다 | 요약 chunk 수만큼 |
| LightRAG | entity와 relation의 key-value 쌍 | query에서 low-level 키워드와 high-level 키워드를 한 번에 뽑아 각각 entity 인덱스와 relation 인덱스에 매칭하고 1-hop 이웃까지 넓힌다 | relation의 상위 테마 키워드 | 등장 횟수가 높은 상위 원문만 붙인다 | 키워드 추출 1회 |
| LeanRAG | base entity, aggregated entity, aggregated relation | base 층 entity만 대상으로 seed를 고른 뒤 seed들의 lowest common ancestor까지 부모 링크를 따라 올라간다 | 상위 층 aggregated entity와 같은 층 aggregated relation | base entity의 출처 chunk를 붙인다 | 본문에 명시 없음 |
| RAG-Anything | atomic content unit, anchor 노드, 통합 그래프와 임베딩 테이블 | 구조 탐색과 dense 유사도 검색을 병렬로 수행한 뒤 구조 중요도와 의미 유사도와 modality 선호 세 신호로 순위를 정한다 | 통합 그래프의 구조 탐색 | 텍스트 표현을 붙이고 시각 자료는 원본으로 복원한다 | 본문에 명시 없음 |

### community detection

GraphRAG의 검색이 성립하는 근거는 community 분할의 성질에 있다. 각 level의 partition이 상호 배타적이면서 전체를 덮기 때문에, 모든 노드가 정확히 하나의 community에 속한다. 코퍼스 전체를 나눠 요약한 뒤 합치는 divide-and-conquer 전략이 그래서 성립한다.

분할 알고리즘은 Leiden이다. [[database/dsba-2025-graphrag-paper-review]]는 Leiden이 Louvain의 개선판이며 Refinement 단계를 더해 모든 community의 내부 연결성을 보장한다고 설명한다. Louvain에서는 같은 community 안의 노드가 서로 연결되지 않는 disconnected community가 생길 수 있었다.

요약은 아래에서 위로 올라간다. leaf 층에서는 edge를 양끝 노드의 degree 합 내림차순으로 정렬해 token limit이 찰 때까지 채우고, 상위 층에서는 하위 요약이 넘칠 때 토큰 수가 큰 sub-community부터 더 짧은 요약으로 치환한다. 요약문 형식은 프롬프트로 고정되며 제목, 요약, 0에서 10 사이 중요도 점수, 점수 설명, 5개에서 10개의 상세 발견으로 구성된다.

### dual-level retrieval

LightRAG의 핵심 판단은 query를 사전에 분류하지 않는다는 것이다. query 하나에서 low-level 키워드와 high-level 키워드를 함께 뽑아 둘 다 쓴다. query를 미리 글로벌형과 로컬형으로 나누려면 분류기가 필요하고 분류가 틀리면 회복할 방법이 없는데, 두 종류를 함께 뽑으면 그 위험이 사라진다.

이 설계가 성립하려면 entity와 relation에 key를 다르게 붙여야 한다. entity의 key는 이름 하나이고 고유명사에 가까워 query에 담긴 구체적인 단어와 맞는다. relation의 key는 연결된 두 entity에서 LLM이 합성한 상위 테마 키워드이고 여러 개일 수 있으며 개념어에 가까워 query에 담긴 추상적인 단어와 맞는다. 결국 어느 인덱스에 그 단어를 던지느냐로 검색의 추상 수준을 조절한다.

여기에 논문과 코드의 간극이 하나 남는다. [[database/dsba-2026-paper-review-graph-based-rag]]는 논문이 low-level 키워드를 entity 이름과 비교한다고 적는 반면 공식 코드는 이름과 설명 양쪽을 검색 대상으로 쓴다고 지적하고, 발표자 본인은 코드 기준으로 설명을 진행한다. 같은 자료가 임베딩 모델도 코드에 BGE-M3와 OpenAI text-embedding-3-large가 함께 확인된다고 적는데, [[database/guo-2025-lightrag-simple-and-fast]] 논문 본문은 임베딩 모델을 아예 밝히지 않는다.

### LCA 기반 계층 검색

LeanRAG는 두 문제를 나란히 세운다. semantic islands는 상위 개념 요약 노드들이 서로를 가리키는 relation 없이 고립된 상태를 말하고, structure-retrieval mismatch는 검색이 그래프 위상을 쓰지 못하고 평면화된 노드 목록 위의 단순 의미 탐색으로 퇴화하는 상태를 말한다.

첫 번째 문제의 해법이 aggregated relation이다. 두 상위 entity에 대해 원래 그래프에서 두 클러스터를 잇던 relation 집합을 모으고, 그 개수인 connectivity strength가 임계값을 넘으면 LLM이 새 relation으로 요약하며 넘지 않으면 원래 relation들을 텍스트로 이어 붙인다. [[database/dsba-2026-paper-review-graph-based-rag]]는 임계값 판정 기준을 relationship 표기의 토큰 수로 설명하고, 임계값을 둔 이유가 상위 층이 다시 장황해지는 것을 막기 위한 비용 관리라고 덧붙인다.

두 번째 문제의 해법이 LCA 경로 검색이다. 평면 그래프에서 seed 쌍마다 경로를 찾으면 경로 개수가 seed 쌍의 수만큼 늘고 각 경로의 중간 노드가 모두 결과에 들어온다. 계층 구조 위에서 공통 조상 하나를 목적지로 잡으면 경로 개수가 seed 개수와 같아지고, tree 구조라서 각 경로는 부모 링크를 따라 올라가는 chain 하나가 된다.

계층을 쌓는 파라미터에는 자료 사이의 정보량 차이가 있다. [[database/zhang-2026-leanrag-knowledge-graph-based-generation]] 논문 본문은 클러스터 개수와 주요 hyperparameter를 held-out validation set에서 튜닝했다고만 적는다. 클러스터 개수를 Bayesian Information Criterion으로 정한다는 설명과 최대 층 수가 평면 그래프 노드 수 $N$에 대해 $\log_2 N + 1$이라는 서술은 [[database/dsba-2026-paper-review-graph-based-rag]] 세미나에만 있다. 임계값의 실제 사용값과 민감도 분석은 어느 자료에도 없다.

### dual-graph와 modality 검색

RAG-Anything이 바꾸는 것은 인덱스에 올라가는 대상 자체다. 문서를 atomic content unit으로 분해하는데, 각 단위는 모달리티 유형과 원본 내용의 쌍이고 유형은 텍스트, 이미지, 표, 수식이다. 이 추상화 덕분에 PPT와 PDF와 XLS가 같은 처리 경로를 탄다.

비텍스트 단위마다 MLLM이 용도가 다른 두 가지 텍스트 표현을 만든다. 하나는 검색에 최적화된 상세 서술이고 다른 하나는 그래프 구축용 entity 요약이다. 표 하나가 노드 하나로 축약되는 것이 아니라, 표를 대표하는 anchor 노드 아래에 행 헤더와 열 헤더와 셀과 단위가 각각 노드로 달리고 `belongs_to` 엣지로 묶인다.

이중 구축을 택한 이유를 논문은 모달리티 고유의 구조 신호 보존으로 설명한다. 처음부터 단일 통합 그래프를 만들면 그 신호를 놓칠 위험이 있으므로, cross-modal 그래프와 텍스트 그래프를 따로 만든 뒤 entity 이름을 1차 매칭 키로 삼아 병합한다.

합성 시점에는 방향이 반대가 된다. 검색은 텍스트 임베딩 공간에서 값싸게 하되, 답을 만들 때는 dereferencing으로 텍스트 대리 표현을 원본 시각 자료로 되돌려 VLM에 직접 넣는다. [[database/hkuds-rag-anything]]의 README는 같은 절차를 코드 주석 수준으로 설명하는데, 이미지 경로가 든 컨텍스트를 먼저 검색하고 이미지를 base64로 인코딩한 다음 텍스트 컨텍스트와 함께 VLM에 보낸다는 세 걸음이다. 저장소는 이 기능을 별도 메서드가 아니라 `aquery`의 `vlm_enhanced` 인자로 문서화한다.

## 벤치마크 수치

### 평가 설정이 서로 다르다

수치를 나란히 놓기 전에 확인해야 할 것은 각 논문이 무엇을 어떻게 쟀는가다. 아래 표의 항목이 하나라도 다르면 두 수치를 직접 비교할 수 없다.

| 항목 | GraphRAG | LightRAG | LeanRAG | RAG-Anything |
|---|---|---|---|---|
| 코퍼스 | Podcast 약 100만 토큰과 News 약 170만 토큰 | UltraDomain 4개 도메인 | UltraDomain 같은 4개 도메인 | DocBench 229문서와 MMLongBench 135문서 |
| 질문 | 코퍼스 설명에서 합성한 125문항씩 | 같은 절차로 125문항씩 | 같은 절차로 125문항씩 | 전문가가 작성한 정답 있는 질문 |
| 채점 | 페어와이즈 승률, 각 비교 5회 반복 | 페어와이즈 승률, 답변 위치를 번갈아 바꿈 | 1점에서 10점 척도, 5회 평균. RQ3만 페어와이즈 | 0 또는 1의 이진 정확도 |
| judge | 본문에 모델 명시 없음 | GPT-4o-mini | DeepSeek-V3 | GPT-4o-mini |
| 답변 생성 | GPT-4-turbo | GPT-4o-mini | DeepSeek-V3 | GPT-4o-mini |
| 임베딩 | 본문 명시 없음 | 본문 명시 없음 | BGE-M3 | text-embedding-3-large, 3072차원 |
| 지표 | comprehensiveness, diversity, empowerment, directness | comprehensiveness, diversity, empowerment, overall | 같은 네 지표 | 정확도 백분율 |

judge와 답변 생성에 같은 모델을 쓴다는 점은 세 논문이 공유하는 약점이다. LightRAG는 제시 순서 편향만 통제하고 모델의 자기 선호는 다루지 않으며, LeanRAG는 채점자와 생성기가 모두 DeepSeek-V3이고, RAG-Anything도 응답 생성과 정확도 판정에 같은 GPT-4o-mini를 쓴다.

### GraphRAG 원논문 결과

GraphRAG의 핵심 주장은 두 가지다. 그래프 기반 조건이 벡터 RAG를 comprehensiveness와 diversity에서 앞서고, 가장 추상적인 root 층 요약만 써도 그 우위가 유지된다는 것이다.

| 비교 | Podcast | News | 출처 페이지 |
|---|---|---|---|
| comprehensiveness 승률 범위 (graph 조건 대 SS) | 72%에서 83% | 72%에서 80% | [[database/edge-2024-from-local-to-global]] |
| diversity 승률 범위 | 75%에서 82% | 62%에서 71% | 같은 페이지 |
| C0 컨텍스트 토큰 | 26,657 (최대의 2.6%) | 39,770 (최대의 2.3%) | 같은 페이지 |
| TS 컨텍스트 토큰 | 1,014,611 | 1,707,694 | 같은 페이지 |
| 지식 그래프 규모 | 노드 8,564, 엣지 20,691 | 노드 15,754, 엣지 19,520 | 같은 페이지 |
| 인덱싱 시간 | 600 토큰 chunk 기준 281분 | 본문 명시 없음 | 같은 페이지 |

논문이 토큰 절감을 9배에서 43배라고 표현하는 근거가 위 컨텍스트 토큰 비율이다. C0 조건은 다른 그래프 조건보다 성능이 조금 낮지만 벡터 RAG 대비로는 Podcast에서 comprehensiveness 72%, diversity 62% 승률을 유지한다.

우위가 모든 지표에 걸친 것은 아니다. empowerment에서 C0는 두 데이터셋 모두에서 SS에 졌고 C1에서 C3까지는 SS와 통계적으로 구별되지 않았다. 원인은 구체적인 예시와 인용과 출처를 제시하는 능력에 있는데, 원문 조각을 그대로 들고 오는 벡터 RAG가 이 지점에서 유리하다. directness는 통제 기준으로 일부러 넣은 항목이고 예상대로 벡터 RAG가 모든 비교에서 이겼다.

claim 기반 재검증도 같은 방향을 가리키되 완전히 겹치지는 않는다. Claimify로 뽑은 47,075개의 고유 claim을 기준으로 모든 그래프 조건이 SS를 앞섰고, LLM 판정과 claim 기반 판정이 같은 승자를 고른 비율은 comprehensiveness 78%, diversity 69%에서 70%다. 다만 이 정합성은 5회 판정의 다수결이 성립한 사례에서만 잰 값이고, 다수결이 성립한 비율 자체가 comprehensiveness 33%, diversity 39%다.

### UltraDomain 결과

같은 UltraDomain 4개 도메인을 LightRAG와 LeanRAG가 모두 쓰지만 채점 방식이 달라 두 표를 겹쳐 읽을 수 없다. 각 표가 무엇을 말하는지는 따로 읽어야 한다.

LightRAG의 표는 자신과 baseline의 페어와이즈 승률이다. 아래는 LightRAG 쪽 승률이고 단위는 백분율이다.

| 데이터셋 | 코퍼스 토큰 | comprehensiveness | diversity | empowerment | overall |
|---|---|---|---|---|---|
| Agriculture | 201만 | 54.4 | 77.2 | 58.8 | 54.8 |
| CS | 230만 | 51.6 | 59.2 | 54.8 | 52.0 |
| Legal | 508만 | 51.6 | 73.6 | 56.4 | 52.8 |
| Mix | 62만 | 49.6 | 64.0 | 49.2 | 49.6 |

LeanRAG의 표는 여러 방법을 1점에서 10점 척도로 나란히 놓은 것이다. 아래는 overall 지표만 옮긴 값이다.

| 데이터셋 | LeanRAG | HiRAG | GraphRAG | LightRAG | NaiveRAG | KAG | FastGraphRAG |
|---|---|---|---|---|---|---|---|
| Mix | 8.59 | 8.08 | 7.87 | 7.61 | 7.47 | 7.25 | 5.76 |
| CS | 8.82 | 8.77 | 8.37 | 8.59 | 8.77 | 7.99 | 6.31 |
| Legal | 8.49 | 8.00 | 8.44 | 7.74 | 8.21 | 7.83 | 3.43 |
| Agriculture | 8.87 | 8.87 | 8.85 | 8.56 | 8.69 | 7.95 | 3.17 |

두 표를 읽을 때 필요한 단서가 세 가지 있다. 첫째, LeanRAG의 overall 우위는 사실상 Mix 한 데이터셋에 몰려 있다. [[database/zhang-2026-leanrag-knowledge-graph-based-generation]] 페이지가 두 번째로 높은 방법과의 격차를 계산해 두었는데 Mix에서 0.51점이고 CS와 Legal에서 0.05점, Agriculture에서 0.00점이다. 뒤 세 값은 표준편차와 같은 자릿수다.

둘째, 같은 페이지는 16개 칸 가운데 LeanRAG가 최고값이 아닌 칸이 네 곳이라고 적는다. 그중 세 곳이 comprehensiveness이고 두 곳은 그래프를 쓰지 않는 NaiveRAG가 1위다.

셋째, LeanRAG 실험의 GraphRAG는 원논문이 규정한 map-reduce 절차가 아니다. [[database/zhang-2026-leanrag-knowledge-graph-based-generation]]은 논문이 baseline 설명에서 GraphRAG의 local search mode를 썼다고 적는다는 사실을 기록하고, local search가 원논문에 한 번도 등장하지 않으며 공식 구현체가 도입한 이름이라는 점을 함께 짚는다. 따라서 위 표의 GraphRAG 값은 구현체 한 모드의 성능으로 읽어야 한다.

### DocBench와 MMLongBench

RAG-Anything은 평가 무대를 바꾼다. 정답이 있는 장문 문서 QA 벤치마크이므로 값은 정확도 백분율이다.

| 방법 | DocBench 전체 | DocBench 텍스트 전용 | DocBench 멀티모달 | DocBench 답변 불가 | MMLongBench 전체 |
|---|---|---|---|---|---|
| GPT-4o-mini | 51.2 | 61.0 | 43.8 | 49.6 | 33.5 |
| LightRAG | 58.4 | 85.0 | 59.7 | 46.8 | 38.9 |
| MMGraphRAG | 61.0 | 67.6 | 66.0 | 60.5 | 37.7 |
| RAG-Anything | 63.4 | 85.0 | 76.3 | 46.0 | 42.8 |

전체 우위가 어디에서 왔는지는 세 열을 함께 보면 드러난다. 텍스트 전용 질문에서는 LightRAG와 85.0%로 동률이고, 멀티모달 질문에서만 두 번째로 높은 MMGraphRAG를 10.3%p 앞선다. 반대로 근거가 없다고 판단해야 하는 답변 불가 항목은 46.0%로 네 방법 중 가장 낮아 MMGraphRAG보다 14.5%p 뒤진다. 근거를 적극적으로 찾아내는 설계가 이 항목에서는 역방향으로 작용한 것으로 보이지만, 논문은 이 항목을 따로 논의하지 않는다.

문서 길이별 결과는 저자가 가장 강조하는 대목이다. DocBench 101페이지에서 200페이지 구간에서 RAG-Anything이 68.2%, MMGraphRAG가 54.6%로 13.6%p 차이가 나고, 200페이지 초과 구간에서도 68.8% 대 55.0%로 13.8%p 차이가 난다. 다만 [[database/guo-2025-rag-anything-all-in-one-rag]] 페이지가 함께 짚듯이 가장 큰 격차가 나타나는 구간이 QA 쌍이 가장 적은 구간이기도 하므로, 이 수치를 장문 일반의 경향으로 확대하기는 어렵다.

ablation은 성능 상승분의 출처를 가른다. 그래프 구축을 건너뛴 Chunk-only가 60.0%, reranking만 뺀 변형이 62.4%, 전체 모델이 63.4%이므로 그래프 구축이 2.4%p, reranking이 1.0%p를 담당한다. 도메인 단위로는 역전이 두 곳 있는데, [[database/9bow-2026-rag-anything-multimodal-rag-framework]]가 계산해 둔 증감표에 따르면 법률에서는 그래프를 뺀 변형이 0.5%p 높고 뉴스에서는 reranking을 뺀 변형이 2.3%p 높다.

### 비용 비교

품질 수치와 달리 비용 수치는 계열 안에서 방향이 일관된다. LightRAG가 GraphRAG를 상대로 잰 값이 가장 구체적이며, 모두 Legal 데이터셋 기준이다.

| 항목 | GraphRAG | LightRAG | 출처 페이지 |
|---|---|---|---|
| 검색 1회 토큰 | 약 61만 | 100 미만 | [[database/guo-2025-lightrag-simple-and-fast]] |
| 검색 1회 API 호출 | 본문 표현으로 수백 회 | 1회 | 같은 페이지 |
| 증분 갱신 토큰 | 약 1,399만에 추출 오버헤드 | 추출 오버헤드만 | 같은 페이지 |
| 평균 query 시간 | 23.6초 | 11.2초 | 같은 페이지 |
| 최종 저장 공간 | 286.7MB | 39.5MB | 같은 페이지 |

수치가 어디서 나왔는지를 따라가면 구조가 보인다. GraphRAG는 Legal 코퍼스에서 community를 1,399개 만들고 그중 level-2 community 610개를 검색에 쓰는데, report 하나가 평균 1,000 토큰이므로 610개면 61만 토큰이다. 증분 갱신에서는 기존 community 구조를 해체하고 report를 전부 다시 써야 하므로 report 하나를 약 5,000 토큰으로 잡아 1,399개 기준 비용이 나온다. LightRAG는 새 부분 그래프를 합집합으로 붙이므로 추출 오버헤드만 남는다.

이 비교에는 조건이 붙는다. [[database/guo-2025-lightrag-simple-and-fast]] 페이지가 기록하듯 비용 비교가 community 1,399개 중 level-2 610개를 쓰는 특정 설정에 기대며, 같은 논문이 community report 토큰 수를 검색 분석에서는 평균 1,000, 증분 갱신 분석에서는 약 5,000으로 다르게 적는다.

LeanRAG의 효율 주장은 성격이 다르다. 근거가 retrieval 컨텍스트 토큰 개수 하나이고, 값도 본문 표가 아니라 그림 눈금에서 읽은 근사값이다. 논문은 baseline 평균 대비 약 46% 작다고 적는데, [[database/zhang-2026-leanrag-knowledge-graph-based-generation]] 페이지가 데이터셋별로 다시 계산한 감소율은 Legal 약 30%에서 Mix 약 63%까지 벌어진다. 같은 그림에서 Legal 한 칸은 GraphRAG 막대가 LeanRAG보다 낮아 본문의 서술과 어긋난다.

RAG-Anything 쪽에는 비용 수치가 없다. [[database/guo-2025-rag-anything-all-in-one-rag]] 페이지는 본문에 latency라는 단어 자체가 나오지 않는다고 적고, [[database/hkuds-rag-anything]] 페이지는 README에 인덱싱 비용과 지연 시간과 throughput이 모두 없으며 조절 수단으로 안내되는 것이 `max_workers` 하나뿐이라고 적는다.

## 미해결 문제

### 원문 첨부 효과의 상충

이 계열 최대의 미해결 지점이다. 같은 UltraDomain 코퍼스에서 검색 컨텍스트의 원문 chunk를 빼는 같은 형태의 ablation을 두 논문이 수행했는데 결론이 반대다.

| 항목 | LightRAG의 원문 제거 | LeanRAG의 원문 제거 |
|---|---|---|
| 결과 | overall 기준 Agriculture에서 67.6%가 74.4%로 상승, Mix에서 60.0%가 55.6%로 하락 | 16개 칸 전부 하락. Mix overall 8.59가 7.93으로, Agriculture overall 8.87이 8.53으로 |
| 저자 해석 | 그래프 인덱싱이 이미 핵심 정보를 뽑았고 원문에는 노이즈가 섞인다 | 그래프는 semantic index이자 navigation system이고 실제 내용은 원문이 공급한다 |
| 채점 방식 | 페어와이즈 승률 | 1점에서 10점 평균 |
| judge | GPT-4o-mini | DeepSeek-V3 |

여기서 주의할 것이 하나 있다. LightRAG 논문 본문은 Agriculture와 Mix 두 곳에서 개선이라고 적지만, [[database/guo-2025-lightrag-simple-and-fast]] 페이지가 Table 2를 다시 읽은 결과 overall 기준 실제 상승은 Agriculture 한 곳뿐이다. Mix에서는 diversity 한 지표만 67.6%에서 74.4%로 오르고 overall은 내려간다. 본문 요약과 표가 어긋나는 사례이므로 "두 데이터셋에서 향상"이라는 서술을 그대로 옮기면 안 된다.

상충의 원인에 대해 [[database/dsba-2026-paper-review-graph-based-rag]] 발표자가 제시한 설명은 채점 방식의 차이다. 점수 평균 방식에서는 두 조건의 미묘한 차이가 같은 점수 구간에 묻힐 수 있으므로, LeanRAG도 컨텍스트를 넣은 답변과 넣지 않은 답변을 페어와이즈로 직접 비교했다면 더 적절했으리라는 지적이다. 세미나는 이 상충을 해소하지 않고 열어 둔 채 마치며, 원문을 언제 어떻게 얼마나 붙일지 정하는 체계가 필요하다는 것을 남은 연구 질문 네 가지 중 하나로 적는다.

retrieval 정밀도의 차이가 원인이라는 설명도 가능하다. 검색이 거칠면 원문이 노이즈를 더하고 정밀하면 원문이 근거를 보강한다는 구도인데, 이 저장소 자료 가운데 그 가설을 검증한 것은 없다. 판정 모델과 채점 방식과 retrieval 본질 가운데 무엇이 결과를 갈랐는지는 보유 자료만으로 분리되지 않는다.

### Mix 데이터셋의 예외

LightRAG가 GraphRAG를 상대로 유일하게 뒤지는 곳이 Mix다. comprehensiveness 49.6%, empowerment 49.2%, overall 49.6%로 근소하게 밀리고 diversity만 64.0%로 앞선다.

해석은 두 자료가 서로 보완한다. [[database/dsba-2026-paper-review-graph-based-rag]] 발표자는 GraphRAG가 이미 community 요약을 쓰고 있어 다양한 주제가 그 요약 안에 잘 담긴 결과라고 보면서, 승률 차이 자체는 크지 않다는 단서를 단다. [[database/guo-2025-lightrag-simple-and-fast]] 페이지는 Mix가 62만 토큰으로 네 데이터셋 중 가장 작다는 점을 단서로 들어, 코퍼스가 작으면 community 수가 적어 GraphRAG의 순회 부담이 줄고 LightRAG가 그래프에서 뽑을 관계의 밀도도 낮아진다고 읽는다.

같은 Mix에서 LeanRAG가 가장 큰 격차로 앞선다는 사실은 계층 구조가 community 요약의 대안이 될 수 있음을 시사한다. 다만 community detection과 계층 클러스터링을 같은 조건에서 직접 대조한 실험은 어느 논문에도 없다.

### 논문과 코드의 간극

같은 문제가 계열 안에서 세 번 반복된다. [[database/dsba-2025-graphrag-paper-review]]는 GraphRAG 본문이 map-reduce 단일 모드만 다루지만 공식 코드에는 주요 entity 선택과 DRIFT 탐색 같은 추가 절차가 있다고 지적하고, 질문 생성 순서가 논문과 코드에서 반대라는 점과 TS 조건 정의를 코드 두 곳을 읽어 재구성해야 했다는 점도 함께 적는다.

[[database/dsba-2026-paper-review-graph-based-rag]]는 같은 형태의 간극을 LightRAG에서 다시 발견한다. 논문은 low-level 키워드를 entity 이름과 비교한다고 적는데 코드는 이름과 설명 양쪽을 쓴다.

[[database/hkuds-rag-anything]] 페이지는 반대 방향의 사례를 기록한다. 이 저장소의 raw가 전체 클론에서 README 스텁으로 바뀌면서, 이전 판이 코드 구조를 근거로 적고 있던 서술이 확인 불가능해졌다. `aquery_vlm_enhanced`라는 별도 메서드도, `reproduce/` 디렉토리의 재현 스크립트도 README에는 없다. 구현 세부를 인용하려면 저장소 원본을 다시 확인해야 한다.

### 인덱싱 비용과 지연 시간

계열 전체가 이 항목을 제대로 재지 않는다. GraphRAG만 Podcast 코퍼스 281분이라는 값을 남기고, LightRAG가 GraphRAG 대비 상대 비교를 제공하며, LeanRAG는 retrieval 토큰 개수 하나만 제시하고, RAG-Anything은 아무 값도 내놓지 않는다.

RAG-Anything 쪽 공백이 실무에서 가장 크다. LightRAG는 chunk마다 LLM 호출 한 번으로 인덱싱이 끝나지만 RAG-Anything은 비텍스트 단위마다 MLLM 호출이 추가되는 구조다. 그 비용이 얼마나 드는지 논문도 저장소도 적지 않으며, 저장소가 제공하는 것은 실패 유형을 다루는 별도 점검 목록 `docs/multimodal_rag_failure_modes.md`와 `max_workers` 인자뿐이다.

[[database/dsba-2026-paper-review-graph-based-rag]] 발표자는 통념과 다른 관찰을 덧붙인다. 새 데이터를 기존 그래프에 추가하는 비용은 경험상 크지 않고, 검색 이후 컨텍스트화 과정의 소요 시간이 전체의 대부분을 차지하므로 그 단계의 효율화가 연구 지점이 된다는 것이다. 이 관찰은 세미나 발표자의 개인 경험에 근거하며 측정값이 제시되지는 않는다.

### 고정 지식 그래프와 일반 그래프

네 방법 모두 LLM이 코퍼스에서 그래프를 뽑는다는 전제 위에 선다. 외부에서 주어진 고정 지식 그래프나 인용 그래프와 소셜 그래프 같은 일반 그래프에서 같은 검색이 동작하는지는 어느 논문도 확인하지 않았다.

[[database/dsba-2026-paper-review-graph-based-rag]]는 이 두 가지를 남은 연구 질문의 앞 두 항목으로 명시하고, 고정 지식 그래프에서는 그래프 요소에 원문이 부재한 상황이 문제가 된다고 짚는다. [[database/zhang-2026-leanrag-knowledge-graph-based-generation]] 페이지도 같은 공백을 기록하는데, LeanRAG가 원문 chunk가 함께 있는 상황을 전제하므로 기성 지식 그래프에서의 동작은 미검증이라고 적는다.

이 공백은 앞의 원문 첨부 상충과 맞물린다. 원문이 있어야 한다는 LeanRAG의 결론이 옳다면 원문 없는 고정 지식 그래프에서는 계열 전체의 전제가 흔들리고, 원문이 노이즈라는 LightRAG의 결론이 옳다면 오히려 문제가 되지 않는다.

## 어디에 무엇을 쓰는가

아래 표는 보유 자료가 실제로 뒷받침하는 범위 안에서만 쓰였다. 네 방법을 같은 조건에서 비교한 실험이 없으므로 순위가 아니라 각 자료가 무엇을 보였는지로 읽어야 한다.

| 상황 | 자료가 뒷받침하는 선택 | 근거 |
|---|---|---|
| 코퍼스 전체를 종합해야 답이 되는 개방형 query | GraphRAG 계열의 community 요약 | 벡터 RAG 대비 comprehensiveness 72%에서 83% 승률 ([[database/edge-2024-from-local-to-global]]) |
| 인덱싱과 검색 비용이 우선 조건 | LightRAG | 검색 토큰 61만에서 100 미만, query 시간 23.6초에서 11.2초 ([[database/guo-2025-lightrag-simple-and-fast]]) |
| 문서가 자주 추가되는 환경 | LightRAG | 합집합 갱신으로 community 재구축 비용이 사라진다 (같은 페이지) |
| 여러 도메인이 섞인 코퍼스 | LeanRAG | Mix에서 두 번째로 높은 방법과 0.51점 차이. 나머지 세 도메인에서는 0.1점 미만 ([[database/zhang-2026-leanrag-knowledge-graph-based-generation]]) |
| 이미지와 표와 수식이 본문만큼 정보를 담는 문서 | RAG-Anything | 멀티모달 질문에서 76.3%로 두 번째보다 10.3%p 높다 ([[database/guo-2025-rag-anything-all-in-one-rag]]) |
| 근거가 없다고 판단해야 하는 query가 많은 환경 | RAG-Anything은 불리하다 | 답변 불가 항목 46.0%로 네 방법 중 최저 (같은 페이지) |
| Office 문서와 스캔 이미지가 섞인 입력 | HKUDS/RAG-Anything의 파서 선택 | MinerU, Docling, PaddleOCR를 문자열 인자로 고른다 ([[database/hkuds-rag-anything]]) |
| 외부에서 주어진 고정 지식 그래프 | 네 방법 모두 미검증 | 남은 연구 질문의 첫 항목 ([[database/dsba-2026-paper-review-graph-based-rag]]) |

운영 조건 하나를 덧붙인다. [[database/hkuds-rag-anything]]의 README는 Office 문서 처리에 LibreOffice가, PaddleOCR 경로에 `paddlepaddle`이 필요하다고 적고 `raganything[all]`도 Python 의존만 해결한다고 단서를 단다. 컨테이너 이미지를 만든다면 이 두 가지를 따로 챙겨야 한다.

## 학습 경로

아래 여덟 단계는 frontmatter의 `study_path`와 같은 순서다. 트렁크를 먼저 세우고 분기로 내려가되, 각 분기마다 한국어 자료를 진입로로 둔다.

1. [[database/dsba-2025-graphrag-paper-review|GraphRAG 리뷰 (DSBA 2025)]]. RAG 구성 요소와 지식 그래프, community detection, sensemaking을 한국어로 먼저 잡는다. 43쪽 중 열한 장이 배경 지식이라 논문을 바로 열지 않아도 되는 진입로다.
2. [[database/edge-2024-from-local-to-global|GraphRAG (Edge 2024)]]. 계열 전체의 트렁크다. entity와 relationship과 claim 추출, Leiden community 분할, community summary 생성, map-reduce 답변까지 이후 모든 분기가 물려받는 파이프라인이 여기서 정의된다.
3. [[database/guo-2025-lightrag-simple-and-fast|LightRAG]]. 첫 번째 분기다. community 단계를 통째로 걷어내면 비용이 어디까지 내려가는지를 검색 토큰 61만에서 100 미만, 저장 공간 286.7MB에서 39.5MB라는 실측으로 확인한다.
4. [[database/zhang-2026-leanrag-knowledge-graph-based-generation|LeanRAG]]. 두 번째 분기다. 같은 평면 지식 그래프 위에 층을 쌓고 상위 노드끼리 relation을 만든다. semantic island와 structure-retrieval mismatch라는 문제 정의가 방법 전체의 뼈대다.
5. [[database/dsba-2026-paper-review-graph-based-rag|Graph-based RAG 세미나 (DSBA 2026)]]. 두 분기를 나란히 놓고 읽는 자리다. 원문 chunk 첨부 효과가 정반대로 나온다는 이 계열 최대의 미해결 지점이 여기서 명시되고, 남은 연구 질문 네 가지도 함께 제시된다.
6. [[database/9bow-2026-rag-anything-multimodal-rag-framework|RAG-Anything 한국어 소개]]. 세 번째 분기의 진입로다. 도전 과제, 기여, 파이프라인, 설치까지를 한 편에 압축한다. 본문 말미에 GPT 모델로 정리했다는 안내가 붙으므로 수치 인용은 다음 단계에서 다시 확인한다.
7. [[database/guo-2025-rag-anything-all-in-one-rag|RAG-Anything]]. modality 분기의 본편이다. dual-graph 구축과 dereferencing이 텍스트 전용 전제를 어떻게 깨는지, DocBench와 MMLongBench 수치로 확인한다.
8. [[database/hkuds-rag-anything|HKUDS/RAG-Anything]]. 논문이 수식으로 적은 것이 실제로는 어떤 인터페이스인지 확인하는 마지막 단계다. 파서 선택, 환경 변수, 운영체제 의존처럼 논문에 없는 요구 사항이 여기 있다.

비용 관점만 빠르게 잡고 싶으면 2번과 3번 두 편으로 충분하다. 평가 설계를 다루려면 2번과 5번을 붙여 읽는 편이 낫다. modality 확장만 필요하면 6번에서 8번까지 세 편이 한 묶음이다.

## 한계

이 페이지는 2차 합성 자료이므로 근거의 층이 하나 더 쌓여 있다. 아래는 그 층에서 생기는 제약이다.

- 모든 수치가 wiki 페이지 여덟 편에서 왔고 각 페이지는 이미 원본의 2차 정리다. 정밀 인용이 필요하면 `raw/papers/`와 `raw/articles/`와 `raw/videos/`의 원본을 확인해야 한다.
- 네 방법을 같은 조건에서 비교한 실험이 이 저장소에 없다. 가장 가까운 것이 LeanRAG 실험의 baseline 측정인데, 그 GraphRAG 값은 원논문 절차가 아니라 공식 구현체 local search mode의 성능이다.
- 원문 첨부 효과의 상충이 judge 모델 차이인지 채점 방식 차이인지 retrieval 본질 차이인지 분리되지 않는다. 세미나 발표자는 채점 방식을 지목하지만 이를 검증한 실험은 없다.
- HiRAG와 RAPTOR와 MMGraphRAG와 KAG와 FastGraphRAG는 이 계보의 비교 대상으로 반복 등장하지만 해당 논문이 이 저장소에 없다. baseline 쪽 세부는 커버 자료가 인용한 범위로 제한된다.
- 두 한국어 세미나가 같은 발표자의 시간 순차 자료다. 발표자 견해의 일관성은 두 자료를 겹쳐 확인할 수 있지만 독립적인 외부 시각은 없다.
- RAG-Anything의 구현 세부는 raw가 README 스텁이라 확인 범위가 공개 인터페이스에 한정된다. 모듈 구성이나 재현 스크립트 같은 코드 수준 서술은 이 페이지에서 다루지 않는다.
- LeanRAG의 공개 저장소 정보가 없다. 논문 본문과 PDF 링크 주석 어디에도 저장소 주소가 없다는 것이 [[database/zhang-2026-leanrag-knowledge-graph-based-generation]] 페이지의 확인 결과이므로, 코드 수준 비교는 자료가 추가된 뒤에야 가능하다.
- 이 저장소에는 커버 여덟 편 밖에도 같은 계열의 자료가 있다. GraphRAG 공식 구현체는 [[database/microsoft-graphrag]]가, Personalized PageRank 계열의 대안 설계는 [[database/gutierrez-2025-from-rag-to-memory-non]]이 담당한다. 이 overview의 커버 범위 밖이라 본문에서 다루지 않으므로, 구현체 세부나 그 대안 설계가 필요하면 두 페이지를 직접 본다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| community summary | 지식 그래프를 community 단위로 나눈 뒤 각 community를 LLM으로 미리 요약해 둔 문서. GraphRAG가 도입했고 세 분기가 모두 이 장치의 비용이나 손실을 출발점으로 삼는다 |
| dual-level retrieval | query를 분류하지 않고 low-level 키워드와 high-level 키워드를 함께 뽑아 각각 entity 인덱스와 relation 인덱스에 매칭하는 LightRAG의 검색 방식 |
| semantic islands | 계층 지식 그래프의 상위 요약 노드들이 서로를 잇는 relation 없이 고립되어 개념 무리 사이 추론이 막히는 상태. LeanRAG의 첫 번째 문제 정의다 |
| aggregated relation | 같은 층의 두 상위 entity를 잇는 새 relation. connectivity strength가 임계값을 넘으면 LLM이 요약하고 넘지 않으면 원래 relation들을 텍스트로 이어 붙인다 |
| lowest common ancestor | 계층 구조에서 여러 seed entity의 공통 조상 가운데 depth가 가장 작은 노드. 이 노드를 목적지로 삼으면 경로 길이 합이 최소가 되어 중복이 줄어든다 |
| dual-graph construction | cross-modal 지식 그래프와 텍스트 기반 지식 그래프를 따로 만든 뒤 entity 이름 매칭으로 병합하는 RAG-Anything의 전략 |

## 관련 페이지

- [[database/edge-2024-from-local-to-global]]: 계열의 트렁크. 인덱싱 다섯 단계와 여섯 비교 조건, 토큰 비용, 평가 설계의 상세를 담는다. 이 overview의 GraphRAG 수치는 전부 이 페이지에서 왔다.
- [[database/dsba-2025-graphrag-paper-review]]: 트렁크의 한국어 해설 슬라이드. 발표자 견해 아홉 건이 후속 분기의 방향과 맞물리며, 논문과 공식 코드의 간극을 처음 명시한 자료다.
- [[database/guo-2025-lightrag-simple-and-fast]]: 비용 분기의 원전. key-value 인덱스와 dual-level retrieval의 정의, 비용 실측, 원문 제거 ablation의 표와 본문이 어긋나는 지점까지 담는다.
- [[database/zhang-2026-leanrag-knowledge-graph-based-generation]]: 추상화 분기의 원전. semantic island 문제 정의와 aggregated relation, LCA 검색의 상세를 담고, LeanRAG 실험의 GraphRAG baseline이 구현체 모드라는 점을 짚는다.
- [[database/guo-2025-rag-anything-all-in-one-rag]]: modality 분기의 원전. dual-graph 구축과 dereferencing, DocBench와 MMLongBench 수치, 저자가 밝힌 두 가지 실패 유형을 담는다.
- [[database/hkuds-rag-anything]]: modality 분기의 운영 인터페이스. 파서 세 종과 query 방식 세 가지, 설치 의존과 환경 변수를 담고, raw가 README 스텁이라 확인 범위가 어디까지인지도 함께 밝힌다.
- [[database/9bow-2026-rag-anything-multimodal-rag-framework]]: modality 분기의 한국어 진입로. 한국어 커뮤니티가 이 도구를 어떤 순서로 소개했는지와 도메인별 ablation 증감 계산을 담는다.
- [[database/dsba-2026-paper-review-graph-based-rag]]: 두 분기를 나란히 놓은 세미나. retrieval 패턴 분류와 연구 흐름도, 원문 첨부 상충의 1차 출처이며 남은 연구 질문 네 가지를 제시한다.
