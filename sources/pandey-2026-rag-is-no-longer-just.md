---
title: "RAG is no longer just \"vector search + LLM\""
type: article
year: 2026
category: applications
raw_path: raw/articles/pandey-2026-rag-is-no-longer-just.md
raw_filename: "pandey-2026-rag-is-no-longer-just.md"
source_collection: external
author: "Brij Kishore Pandey"
url: "https://www.linkedin.com/posts/brijpandeyji_rag-is-no-longer-just-vector-search-llm-activity-7467221569761832962-xgVn"
publisher: "LinkedIn (post by Brij Kishore Pandey)"
publication_date: "2026-06-02"
tags: [rag, hybrid-rag, graphrag, agentic-rag, corrective-rag, crag, multimodal-rag, retrieval-architecture, production-rag, design-space, linkedin]
---

## 한 줄 요약 (One-line Summary)

Brij Kishore Pandey가 LinkedIn에 올린 약 260단어 분량의 짧은 포스트다. "어느 vector database를 써야 하는가"라는 질문을 "이 use case에 실제로 필요한 retrieval architecture는 무엇인가"로 바꾸자고 제안하고, 2026년 production RAG를 Hybrid, GraphRAG, Agentic, Corrective(CRAG), Multimodal 다섯 가지로 나열한 뒤, RAG가 단일 패턴이 아니라 design space가 되어 간다는 결론으로 마무리한다. 벤치마크, 수치, 코드, 외부 인용은 하나도 제시하지 않는다.

## 1. 자료 정보 (Document Information)

- 저자: Brij Kishore Pandey
- 매체: LinkedIn 공개 포스트
- URL: <https://www.linkedin.com/posts/brijpandeyji_rag-is-no-longer-just-vector-search-llm-activity-7467221569761832962-xgVn>
- 게시일: 2026-06-02. raw 수집 시점 기준으로 게시 후 약 11시간이 지난 상태였다.
- 분량: 본문 약 260단어
- 장르: 아키텍처 분류를 한 화면에 나열한 정렬용 포스트다. 새 연구 결과나 실험은 담고 있지 않다.
- 수집 한계: raw 파일 머리말이 밝히듯 LinkedIn은 자체 스크롤과 동적 렌더링을 쓰기 때문에 원문 그대로의 추출이 완전하지 않을 수 있다.

## 2. 주요 기여 (Key Contributions)

1. 질문의 전환. 포스트는 진짜 질문이 "Which vector database should we use?"가 아니라고 명시하고, 더 나은 질문으로 "What kind of retrieval architecture does this use case actually need?"를 제시한다. 인프라 선택보다 아키텍처 선택이 앞선다는 정렬이다.
2. 다섯 아키텍처의 나열. Hybrid RAG, GraphRAG, Agentic RAG, Corrective RAG(CRAG), Multimodal RAG를 각각 "무엇을 결합하거나 사용하는가"와 "언제 쓰는가" 두 문장으로 정리했다. 저자는 이를 모든 AI 엔지니어와 아키텍트가 이해해야 할 목록으로 제시한다.
3. 시대 진단. 2026년의 production 수준 RAG 시스템이 더 전문화되고(specialized), 더 지능적이며(intelligent), 더 아키텍처 주도적(architecture-driven)으로 바뀌고 있다는 관찰이 다섯 아키텍처를 나열하는 전제다.
4. design space 관점. 팀이 저지르는 가장 큰 실수는 RAG를 단일 패턴으로 다루는 것이며, 실제 RAG는 design space가 되어 가고 있다는 것이 포스트의 결론이다.
5. use case별 요구 차이. support chatbot, financial analyst assistant, legal research system, medical document reviewer, enterprise knowledge assistant 다섯 가지를 들어, 서로 다른 비즈니스 문제는 서로 다른 retrieval 전략을 필요로 하며 이들 모두가 매우 다른 RAG 아키텍처를 필요로 할 수 있다고 말한다.
6. 슬로건. "The future of RAG is not just better embeddings. It is better retrieval design." 임베딩 품질 경쟁이 아니라 retrieval 설계가 다음 단계라는 주장이다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

이 포스트는 연구 방법론이 아니라 아키텍처 카탈로그다. 다섯 항목을 모두 같은 형식으로, 즉 "무엇을 결합하거나 사용하는가" 한 문장과 "언제 쓰는가" 한 문장으로 서술한다.

| 아키텍처 | 무엇을 결합하거나 사용하는가 | 언제 쓰는가 |
|---|---|---|
| Hybrid RAG | dense vector search와 sparse keyword search | semantic similarity만으로 부족할 때 |
| GraphRAG | entity, relationship, knowledge graph | 답이 연결, 컨텍스트, 관계 위의 reasoning에 의존할 때 |
| Agentic RAG | retrieval을 planning 워크플로로 전환 | agent가 도구 선택, 검색 시점, 충분한 confidence 여부를 판단해야 할 때 |
| Corrective RAG (CRAG) | 검색 결과의 grading, 쿼리 재작성, 대체 소스 fallback | 검색 결과를 신뢰하기 전에 품질을 확인해야 할 때 |
| Multimodal RAG | text, image, chart, table을 가로지르는 retrieval | enterprise 문서, report, slide deck, invoice, 시각 데이터를 다룰 때 |

### 3.1 Hybrid RAG

dense vector search와 sparse keyword search를 결합한다. 원문이 밝힌 적용 조건은 semantic similarity 하나만으로는 충분하지 않은 경우다. 어떤 sparse 검색 알고리즘을 쓰는지, 두 결과를 어떻게 합치는지는 포스트에 없다.

### 3.2 GraphRAG

entity, relationship, knowledge graph를 사용한다. 답이 연결(connections), 컨텍스트(context), 그리고 관계 위의 reasoning에 의존할 때 가장 적합하다고 서술한다. 그래프 구축 방법이나 질의 시 traversal 방식은 언급하지 않는다.

### 3.3 Agentic RAG

retrieval을 planning 워크플로로 바꾼다. agent가 결정하는 항목은 세 가지로 명시되어 있다.

- 어떤 도구를 쓸 것인가
- 언제 검색할 것인가
- 언제 충분한 confidence를 확보했는가

### 3.4 Corrective RAG (CRAG)

검색된 문서를 신뢰하기 전에 먼저 grading한다. retrieval이 약하다고 판정되면 시스템이 쿼리를 다시 쓰거나 다른 소스로 fallback한다. 즉 retrieval과 generation 사이에 품질 판정 단계를 하나 더 둔 구조다. grading 기준이나 판정 레이블은 포스트에 없다.

### 3.5 Multimodal RAG

text, image, chart, table을 가로질러 retrieval을 수행한다. 원문은 enterprise 문서, report, slide deck, invoice, 시각 데이터에 결정적(critical)이라고 적었다.

### 3.6 마무리 논지

- 실수: RAG를 단일 패턴(single pattern)으로 다루는 것이 팀이 저지르는 가장 큰 실수다.
- 재정의: 실제로 RAG는 design space가 되어 가고 있다.
- 근거: 서로 다른 비즈니스 문제는 서로 다른 retrieval 전략을 요구한다. 앞서 든 다섯 use case가 모두 매우 다른 RAG 아키텍처를 필요로 할 수 있다.
- 슬로건: "The future of RAG is not just better embeddings. It is better retrieval design."
- 맺음: 2026년에 어떤 RAG 아키텍처가 가장 중요해질 것인지를 독자에게 되묻는 질문으로 끝난다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

이 포스트에는 수치와 벤치마크가 없다. 구체적으로 다음이 모두 빠져 있다.

- 다섯 아키텍처별 지연 시간, 비용, 정확도 수치
- 동일 코퍼스 위에서의 직접 비교 결과
- production 트래픽 통계나 배포 사례 연구
- 참고 문헌이나 원논문 인용

포스트가 제시하는 산출물은 분류 목록과 두 개의 결론 문장, 즉 "RAG는 design space"와 "The future of RAG is not just better embeddings. It is better retrieval design."이다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- 분류만 있고 판단 기준이 없다. 다섯 use case와 다섯 아키텍처를 나란히 나열할 뿐, 어떤 use case에 어떤 아키텍처를 골라야 하는지 대응 관계를 제시하지 않는다.
- 조합 가능성을 다루지 않는다. 다섯 항목을 병렬로 나열하기만 하고, 둘 이상을 함께 쓰는 경우를 언급하지 않는다.
- 목록의 범위가 다섯 가지로 한정된다. 이 목록에 없는 RAG 변형을 왜 뺐는지에 대한 설명은 없다.
- 검증이 없다. 각 아키텍처의 적용 조건은 저자의 경험적 주장이며 실험이나 인용으로 뒷받침되지 않는다.
- 구현 세부가 없다. 결합 대상과 적용 조건만 한 문장씩 적혀 있어, 각 아키텍처를 실제로 구성하려면 별도 자료가 필요하다.
- 시각 자료가 남아 있지 않다. LinkedIn의 동적 렌더링 탓에 원문 그대로의 추출이 완전하지 않을 수 있다고 raw 머리말이 밝히고 있으며, 수집된 raw에는 텍스트만 있다.

## 6. 관련 연구 (Related Work)

포스트는 외부 인용이나 참고 문헌을 하나도 제시하지 않는다. 아래는 원문의 인용이 아니라, 같은 분류나 개별 아키텍처를 다루는 이 wiki 안의 페이지 목록이다.

| 이 포스트의 항목 | 이 wiki의 관련 페이지 |
|---|---|
| 분류 자체 | `applications/alex-xu-2026-rag-vs-graph-rag-vs`, `applications/liu-2026-rag-llm-wiki-or-gbrain` |
| Hybrid RAG, GraphRAG | `database/guo-2025-lightrag-simple-and-fast`, `database/zhang-2026-leanrag-knowledge-graph-based-generation`, `overviews/lightrag-family-graph-rag-overview` |
| Agentic RAG | `database/li-2026-beyond-semantic-similarity-rethinking-retrieval`, `agents/qiao-2026-memory-intelligence-agent` |
| Multimodal RAG | `database/guo-2025-rag-anything-all-in-one-rag`, `database/shanbhogue-2026-gemini-embedding-2-native-multimodal` |
| 목록에 없는 변형 | `database/vectifyai-pageindex` |

Corrective RAG(CRAG)를 단독으로 다룬 페이지는 없다. 다만 `database/athina-ai-rag-cookbooks`와 `database/nirdiamant-rag-techniques`가 기법 카탈로그 안에 CRAG 레시피를 포함하고 있어 이 항목의 대응 자료가 된다.

## 7. 용어집 (Glossary)

- Hybrid RAG: dense vector search와 sparse keyword search를 결합한 RAG. 포스트는 semantic similarity만으로 부족할 때의 선택지로 제시한다.
- GraphRAG: entity, relationship, knowledge graph를 사용하는 RAG. 답이 연결과 컨텍스트, 관계 위의 reasoning에 의존할 때 쓴다.
- Agentic RAG: retrieval을 planning 워크플로로 바꾼 RAG. agent가 도구, 검색 시점, 충분한 confidence 여부를 스스로 정한다.
- Corrective RAG (CRAG): 검색된 문서를 신뢰하기 전에 grading하고, 결과가 약하면 쿼리를 다시 쓰거나 다른 소스로 fallback하는 RAG.
- Multimodal RAG: text, image, chart, table을 가로질러 retrieval하는 RAG. enterprise 문서를 다룰 때 결정적이라고 서술한다.
- design space: 하나의 정답 구성이 아니라 요구에 따라 다른 조합을 고르는 설계 공간. 포스트가 RAG를 다시 정의하는 데 쓴 표현이다.
- retrieval architecture: 어떤 vector database를 쓰느냐를 넘어, 무엇을 어떻게 검색하고 검증하고 다시 시도하는지까지 포함하는 설계. 포스트가 제안하는 질문의 대상이다.
