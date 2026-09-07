---
title: "RAG는 더 이상 vector search + LLM이 아니다: 다섯 가지 production RAG 아키텍처 (Pandey, LinkedIn)"
type: article
year: 2026
category: applications
raw_path: raw/articles/pandey-2026-rag-is-no-longer-just.md
raw_filename: "pandey-2026-rag-is-no-longer-just.md"
source: pandey-2026-rag-is-no-longer-just.md
source_collection: external
author: "Brij Kishore Pandey"
url: "https://www.linkedin.com/posts/brijpandeyji_rag-is-no-longer-just-vector-search-llm-activity-7467221569761832962-xgVn"
publisher: "LinkedIn (post by Brij Kishore Pandey)"
publication_date: "2026-06-02"
tags: [rag, hybrid-rag, graphrag, agentic-rag, corrective-rag, crag, multimodal-rag, retrieval-architecture, production-rag, design-space, linkedin]
---

## 요약

Brij Kishore Pandey가 2026년 6월 2일 LinkedIn에 올린 약 260단어 분량의 짧은 포스트다. 제목 한 줄이 곧 주장이다. RAG는 더 이상 vector search와 LLM을 이어 붙인 하나의 구성이 아니라는 것이다.

포스트가 제안하는 것은 질문의 교체다. 저자는 진짜 질문이 "Which vector database should we use?"가 아니라고 적고, 더 나은 질문으로 "What kind of retrieval architecture does this use case actually need?"를 제시한다. 어떤 제품을 도입할지보다 이 use case에 어떤 검색 구조가 필요한지가 먼저라는 순서 정리다.

그 위에서 저자는 모든 AI 엔지니어와 아키텍트가 이해해야 할 RAG 아키텍처로 다섯 가지를 나열한다. 각 항목은 무엇을 결합하거나 사용하는지 한 문장, 언제 쓰는지 한 문장으로만 서술된다.

| 항목 | 무엇을 결합하거나 사용하는가 | 언제 쓰는가 |
|---|---|---|
| Hybrid RAG | dense vector search와 sparse keyword search | semantic similarity만으로 충분하지 않을 때 |
| GraphRAG | entity, relationship, knowledge graph | 답이 연결과 컨텍스트, 관계 위의 추론에 의존할 때 |
| Agentic RAG | retrieval을 planning 워크플로로 전환 | 에이전트가 도구와 검색 시점, confidence 충족 여부를 판단해야 할 때 |
| Corrective RAG (CRAG) | 검색 결과의 grading, 쿼리 재작성, 다른 소스로의 fallback | 검색 결과를 신뢰하기 전에 품질을 확인해야 할 때 |
| Multimodal RAG | text, image, chart, table을 가로지르는 retrieval | enterprise 문서와 report, slide deck, invoice, 시각 데이터를 다룰 때 |

다섯 항목의 서술 형식이 모두 같다는 점이 이 포스트의 성격을 보여준다. 구현 절차나 성능 비교가 아니라 선택지의 목록과 각각의 적용 조건까지가 저자가 제공하는 범위다.

결론은 두 문장으로 압축된다. 팀이 저지르는 가장 큰 실수는 RAG를 단일 패턴으로 다루는 것이고, 실제 RAG는 design space가 되어 가고 있다는 것이다. 마지막 문장은 "The future of RAG is not just better embeddings. It is better retrieval design."이다.

이 페이지의 서술은 raw에 수집된 텍스트만을 근거로 한다. 포스트에는 벤치마크, 수치, 코드, 외부 인용이 하나도 없다.

## 배경

### 포스트가 전제하는 2026년의 상황

저자는 다섯 아키텍처를 나열하기 전에 시대 진단을 한 문장 둔다. 2026년의 production 수준 RAG 시스템이 더 전문화되고(more specialized), 더 지능적이며(more intelligent), 더 아키텍처 주도적(more architecture-driven)으로 바뀌고 있다는 것이다.

세 표현은 포스트 안의 다른 서술과 이어진다.

| 원문 표현 | 같은 글 안에서 이어지는 서술 |
|---|---|
| more specialized | 다섯 아키텍처가 각각 다른 적용 조건을 가진다 |
| more intelligent | Agentic RAG와 Corrective RAG처럼 검색 자체가 판단을 포함한다 |
| more architecture-driven | 질문이 vector database 선택에서 retrieval architecture 선택으로 옮겨간다 |

이 대응은 포스트가 명시한 것이 아니라 같은 글 안의 서술을 이어 붙인 것이다. 저자는 세 표현을 따로 정의하지 않고 곧장 다섯 항목의 나열로 넘어간다.

### 질문의 교체

포스트의 출발점은 팀이 흔히 먼저 묻는 질문을 진짜 질문이 아니라고 지목하는 데 있다.

| 질문 | 결정 대상 | 포스트의 평가 |
|---|---|---|
| "Which vector database should we use?" | 저장과 검색을 담당할 인프라 제품 | 진짜 질문이 아니다 |
| "What kind of retrieval architecture does this use case actually need?" | 무엇을 어떻게 검색하고 판단할지의 구조 | 더 나은 질문이다 |

두 질문의 차이는 결정의 순서에 있다. 앞의 질문은 검색 구조를 이미 정해진 것으로 두고 부품만 고르는 반면, 뒤의 질문은 use case가 구조를 정하게 한다. 따라서 다섯 아키텍처의 나열은 뒤의 질문에 답하기 위한 선택지 목록으로 읽어야 한다.

## 핵심 개념

retrieval architecture는 무엇을 어떻게 검색하고, 가져온 결과를 어떻게 다루며, 결과가 부족할 때 무엇을 할지까지 포함하는 설계를 뜻한다. 포스트가 옮기자고 제안하는 질문의 대상이 바로 이 설계이며, vector database 선택은 그 안의 한 부분이 된다.

design space는 하나의 정답 구성이 있는 것이 아니라 요구에 따라 다른 조합을 고르는 설계 공간을 말한다. 저자가 RAG를 다시 정의하는 데 쓴 표현으로, 결론 문장 "In reality, RAG is becoming a design space."에 등장한다.

single pattern은 RAG를 하나의 고정된 구성으로 다루는 태도를 가리킨다. 저자는 이것을 팀이 저지르는 가장 큰 실수로 지목하며, design space라는 재정의는 이 태도에 대한 반대편에 놓인다.

dense vector search와 sparse keyword search는 Hybrid RAG의 구성 요소로 등장하는 두 검색 방식이다. dense vector search는 질의와 문서를 임베딩으로 바꿔 의미가 가까운 것을 찾고, sparse keyword search는 질의에 나온 단어가 문서에 그대로 들어 있는지를 기준으로 찾는다. 포스트는 두 방식을 결합한다는 사실만 적고 결합 방법은 밝히지 않는다.

grading은 검색해 온 문서를 신뢰하기 전에 품질을 판정하는 단계를 말한다. Corrective RAG의 핵심 동작이며, 판정 기준과 판정 결과의 종류는 포스트에 나오지 않는다.

## 방법

이 포스트는 연구 방법론이 아니라 아키텍처 카탈로그다. 다섯 항목이 모두 두 문장으로 서술되고, 첫 문장이 구성을, 둘째 문장이 적용 조건을 담는다. 아래 다섯 절은 항목마다 원문이 밝힌 내용과 밝히지 않은 내용을 함께 정리한다.

### Hybrid RAG

dense vector search와 sparse keyword search를 결합한다. 적용 조건으로 제시된 것은 semantic similarity 하나만으로는 충분하지 않은 경우다. 즉 의미가 가까운 문서를 찾는 것만으로 부족하고, 특정 단어가 그대로 들어 있는 문서를 함께 찾아야 하는 상황을 가리킨다.

원문은 어떤 sparse 검색 방식을 쓰는지, 두 검색 결과를 어떤 규칙으로 합치는지, 둘의 비중을 어떻게 정하는지를 적지 않는다. 두 방식을 결합한다는 사실까지가 확인 가능한 범위다.

### GraphRAG

entity와 relationship, knowledge graph를 사용한다. 적용 조건은 답이 연결(connections)과 컨텍스트(context), 그리고 관계 위의 추론에 의존할 때다. 문서 단위로 비슷한 것을 찾는 대신 개체와 개체 사이의 관계를 따라가야 답이 나오는 질의를 염두에 둔 서술이다.

그래프를 어떤 절차로 만드는지, 질의 시점에 그래프를 어떻게 따라가는지는 포스트에 없다.

### Agentic RAG

retrieval을 planning 워크플로로 바꾼다. 검색이 한 번의 조회가 아니라 에이전트가 계획하고 실행하는 절차가 된다는 뜻이다. 원문은 에이전트가 결정하는 항목을 세 가지로 명시한다.

| 에이전트의 결정 | 원문 표현 |
|---|---|
| 어떤 도구를 쓸 것인가 | which tools to use |
| 언제 검색할 것인가 | when to search |
| 언제 충분한 confidence를 확보했는가 | when it has enough confidence |

세 항목의 공통점은 검색 여부와 종료 시점까지 에이전트가 스스로 정한다는 데 있다. confidence는 에이전트가 지금까지 모은 근거만으로 답하기에 충분하다고 보는 정도를 뜻하며, 이를 어떻게 재는지는 포스트에 나오지 않는다.

### Corrective RAG

검색해 온 문서를 신뢰하기 전에 먼저 grading한다. retrieval이 약하다고 판정되면 시스템이 쿼리를 다시 쓰거나 다른 소스로 fallback한다. 검색과 생성 사이에 품질 판정 단계를 하나 더 두는 구조다.

원문이 밝힌 대응은 쿼리 재작성과 다른 소스로의 전환 두 가지다. 반면 판정 기준, 판정 결과의 종류, 어떤 소스로 fallback하는지는 적혀 있지 않다. 이름 그대로 검색 결과를 교정하는 단계가 붙었다는 것까지가 확인 가능한 내용이다.

### Multimodal RAG

text와 image, chart, table을 가로질러 retrieval을 수행한다. 원문은 enterprise 문서와 report, slide deck, invoice, 시각 데이터에 결정적(critical)이라고 적었다. 앞의 네 항목이 검색 방식이나 절차를 바꾸는 데 비해, 이 항목은 검색 대상의 형식을 넓힌다는 점에서 성격이 다르다.

여러 형식을 하나의 검색으로 어떻게 묶는지는 포스트에 없다.

### 원문이 명시한 것과 남긴 것

| 아키텍처 | 명시된 것 | 남겨진 것 |
|---|---|---|
| Hybrid RAG | 두 검색 방식의 결합, 적용 조건 | 검색 방식의 구체적 선택, 결과 병합 규칙 |
| GraphRAG | 사용하는 자료 구조, 적용 조건 | 그래프 구축 절차, 질의 시 탐색 방식 |
| Agentic RAG | 에이전트가 정하는 세 항목 | confidence 측정 방법, 사용하는 도구의 종류 |
| Corrective RAG | grading 단계, 두 가지 대응 | 판정 기준과 판정 결과, fallback 대상 |
| Multimodal RAG | 대상 형식 네 가지, 적용 문서 유형 | 형식별 처리와 통합 방식 |

다섯 항목 모두 명시된 것은 구성과 적용 조건까지이고, 남겨진 것은 구현이다. 따라서 이 포스트를 읽고 실제로 하나를 구성하려면 항목마다 별도의 자료로 넘어가야 한다.

## 결과

포스트에는 수치와 벤치마크가 없다. 구체적으로 다음이 모두 빠져 있다.

- 다섯 아키텍처별 지연 시간, 비용, 정확도 수치
- 같은 코퍼스 위에서의 직접 비교 결과
- production 트래픽 통계나 배포 사례
- 참고 문헌이나 원논문 인용

대신 포스트가 내놓는 산출물은 분류 목록과 결론 문장이다.

| 포스트가 제시하는 것 | 내용 |
|---|---|
| 분류 | 다섯 아키텍처의 이름, 구성, 적용 조건 |
| 진단 | RAG를 단일 패턴으로 다루는 것이 팀의 가장 큰 실수다 |
| 재정의 | RAG는 design space가 되어 가고 있다 |
| 근거 | 서로 다른 비즈니스 문제는 서로 다른 retrieval 전략을 요구한다 |
| 슬로건 | "The future of RAG is not just better embeddings. It is better retrieval design." |

재정의의 근거로 저자가 드는 것은 use case의 다양성이다. 원문은 다섯 가지를 나열한다.

- support chatbot
- financial analyst assistant
- legal research system
- medical document reviewer
- enterprise knowledge assistant

이 다섯 use case가 모두 매우 다른 RAG 아키텍처를 필요로 할 수 있다는 것이 저자의 서술이다. 다만 어느 use case에 어느 아키텍처가 맞는지의 대응은 제시되지 않는다. 다섯 아키텍처와 다섯 use case가 같은 개수로 나란히 놓이지만 둘 사이를 잇는 선은 원문에 없다.

슬로건은 임베딩 품질을 올리는 경쟁만으로는 다음 단계에 이르지 못하고 검색 설계 자체가 관건이라는 주장이다. 포스트는 2026년에 어떤 RAG 아키텍처가 가장 중요해질 것 같은지를 독자에게 되묻는 질문으로 끝난다.

## 한계

- 분류만 있고 선택 기준이 없다. 다섯 아키텍처와 다섯 use case를 나란히 나열할 뿐 대응 관계를 제시하지 않는다.
- 조합 가능성을 다루지 않는다. 다섯 항목을 병렬로 나열하기만 하고 둘 이상을 함께 쓰는 경우를 언급하지 않는다.
- 목록의 범위가 다섯 가지로 한정된다. 이 목록에 없는 RAG 변형을 왜 뺐는지에 대한 설명이 없다.
- 검증이 없다. 각 항목의 적용 조건은 저자의 주장이며 실험이나 인용으로 뒷받침되지 않는다.
- 구현 세부가 없다. 결합 대상과 적용 조건만 한 문장씩 적혀 있어 실제 구성에는 별도 자료가 필요하다.
- 시각 자료가 남아 있지 않다. raw 머리말이 밝히듯 LinkedIn의 동적 렌더링 탓에 원문 그대로의 추출이 완전하지 않을 수 있고, 수집된 raw에는 텍스트만 있다.

분량이 짧다는 것 자체가 이 자료의 결함은 아니다. 선택지를 한 화면에 정렬하는 용도로 읽으면 목적을 다하지만, 구현이나 도입 판단에 쓰려면 항목마다 다른 자료가 필요하다.

## 이 wiki 안의 대응 자료

포스트가 나열한 다섯 항목은 이 wiki에 이미 개별 자료로 쌓여 있다. 아래 표는 포스트의 항목을 그 자료들과 이어 붙인 것이며, 수치나 비교 결과는 각 페이지가 담당한다.

| 포스트의 항목 | 이 wiki의 페이지 | 관계 |
|---|---|---|
| 분류 자체 | [[applications/alex-xu-2026-rag-vs-graph-rag-vs]], [[applications/liu-2026-rag-llm-wiki-or-gbrain]] | 같은 시기에 RAG를 여러 유형으로 나눈 다른 분류 |
| Hybrid RAG | [[database/lumer-2025-rethinking-retrieval-from-traditional-retrieval]] | 금융 도메인에서 여러 검색 전략을 실측한 논문 |
| GraphRAG | [[database/edge-2024-from-local-to-global]], [[database/guo-2025-lightrag-simple-and-fast]], [[database/zhang-2026-leanrag-knowledge-graph-based-generation]], [[overviews/lightrag-family-graph-rag-overview]] | 문서 집합을 knowledge graph로 바꿔 질의에 답하는 방법을 다룬 논문과 후속 구현, 계열 정리 |
| Agentic RAG | [[database/li-2026-beyond-semantic-similarity-rethinking-retrieval]], [[agents/qiao-2026-memory-intelligence-agent]] | 검색을 에이전트의 판단 절차로 바꾼 구현 사례 |
| Corrective RAG | [[database/athina-ai-rag-cookbooks]], [[database/nirdiamant-rag-techniques]] | 실행 가능한 CRAG 레시피를 포함한 기법 카탈로그 |
| Multimodal RAG | [[database/guo-2025-rag-anything-all-in-one-rag]], [[database/shanbhogue-2026-gemini-embedding-2-native-multimodal]] | 여러 형식을 한 파이프라인에서 다루는 구현과 임베딩 모델 |
| 목록에 없는 변형 | [[database/vectifyai-pageindex]], [[database/geeksforgeeks-2026-vectorless-rag-pageindex]] | 벡터 검색을 쓰지 않는 계열로, 다섯 항목 어디에도 들어가지 않는다 |

이 대응이 보여주는 것은 포스트의 역할이다. 다섯 이름은 이 wiki가 이미 개별적으로 보유한 자료들의 색인 역할을 하고, 각 항목의 수치와 구현 세부는 표의 오른쪽 페이지들이 채운다. 마지막 행은 포스트의 목록이 완결된 분류가 아니라는 근거이기도 하다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| retrieval architecture | 어떤 vector database를 쓰느냐를 넘어, 무엇을 어떻게 검색하고 검증하고 다시 시도하는지까지 포함하는 설계. 포스트가 제안하는 질문의 대상이다 |
| design space | 하나의 정답 구성이 아니라 요구에 따라 다른 조합을 고르는 설계 공간. 포스트가 RAG를 다시 정의하는 데 쓴 표현이다 |
| Hybrid RAG | dense vector search와 sparse keyword search를 결합한 RAG. semantic similarity만으로 부족할 때의 선택지로 제시된다 |
| Agentic RAG | retrieval을 planning 워크플로로 바꾼 RAG. 에이전트가 도구와 검색 시점, confidence 충족 여부를 스스로 정한다 |
| Corrective RAG (CRAG) | 검색해 온 문서를 신뢰하기 전에 grading하고, 결과가 약하면 쿼리를 다시 쓰거나 다른 소스로 fallback하는 RAG |

## 관련 페이지

- [[applications/alex-xu-2026-rag-vs-graph-rag-vs]]: 같은 시기에 나온 LinkedIn 포스트로, RAG를 Standard와 Graph, Agentic 세 가지로 나눈다. 이 포스트가 다섯 가지로 나눈 목록과 겹치는 부분이 많아 나란히 읽기 좋다.
- [[applications/liu-2026-rag-llm-wiki-or-gbrain]]: 지식을 기억하는 방식을 RAG와 LLM Wiki, fat skills 세 가지로 나눈 결정 프레임워크. 이 포스트가 검색 방식 안에서 선택지를 나눈다면, 그 글은 검색 자체를 하나의 선택지로 놓는다.
- [[database/lumer-2025-rethinking-retrieval-from-traditional-retrieval]]: 금융 도메인에서 여러 검색 전략을 비교한 논문. 이 포스트가 수치 없이 나열한 항목들을 실험으로 다룬다.
- [[database/edge-2024-from-local-to-global]]: Microsoft Research의 GraphRAG 논문으로, 문서 집합을 knowledge graph로 바꾼 뒤 community 요약을 거쳐 전역 질의에 답한다. 이 포스트의 두 번째 항목에 해당하는 자료다.
- [[overviews/lightrag-family-graph-rag-overview]]: graph 기반 RAG 계열을 한데 묶은 합성 페이지.
- [[database/li-2026-beyond-semantic-similarity-rethinking-retrieval]]: 에이전트가 코퍼스를 직접 다루는 검색 방식을 다룬 논문으로, 세 번째 항목의 사례다.
- [[database/athina-ai-rag-cookbooks]], [[database/nirdiamant-rag-techniques]]: 네 번째 항목인 Corrective RAG를 포함해 여러 RAG 기법을 실행 가능한 형태로 모은 카탈로그.
- [[database/guo-2025-rag-anything-all-in-one-rag]]: 여러 형식의 자료를 한 파이프라인에서 다루는 구현으로, 다섯 번째 항목의 사례다.
- [[database/shanbhogue-2026-gemini-embedding-2-native-multimodal]]: 임베딩 모델 쪽의 진전을 다룬 자료. "better embeddings"보다 "better retrieval design"이라는 이 포스트의 슬로건과 대비해 읽을 수 있다.
- [[database/vectifyai-pageindex]]: 벡터 검색을 쓰지 않는 계열의 자료로, 이 포스트의 다섯 항목 밖에 있다.
