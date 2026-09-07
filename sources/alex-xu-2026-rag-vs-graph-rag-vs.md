---
title: "RAG vs Graph RAG vs Agentic RAG"
type: article
year: 2026
category: applications
raw_path: raw/articles/alex-xu-2026-rag-vs-graph-rag-vs.md
raw_filename: "alex-xu-2026-rag-vs-graph-rag-vs.md"
source_collection: external
author: "Alex Xu"
url: "https://www.linkedin.com/posts/alexxubyte_systemdesign-coding-interviewtips-share-7475575250143928320-lWQD/"
publisher: "LinkedIn (post by Alex Xu / ByteByteGo)"
publication_date: "2026-06-28"
tags: [rag, graphrag, agentic-rag, vector-search, knowledge-graph, local-search, global-search, multi-agent, linkedin, bytebytego, system-design]
figures:
  - id: fig01
    file: assets/alex-xu-2026-rag-vs-graph-rag-vs/fig01.png
    raw: raw/articles/alex-xu-2026-rag-vs-graph-rag-vs-figures/fig01.png
    caption: "RAG, Agentic RAG, Graph RAG를 왼쪽부터 세 열로 나란히 놓은 파이프라인 비교도. 왼쪽 열은 retrieval, augmented, generation 3단계를 색 블록으로 구분하고, 가운데 열은 Planning agent와 Evaluator agent의 재검색 순환을 표시하며, 오른쪽 열은 query classification에서 갈라지는 local 경로와 global 경로를 함께 담았다"
    strategy: manual
    curated: true
---

## 한 줄 요약 (One-line Summary)

ByteByteGo 공동창업자 Alex Xu가 LinkedIn에 올린 짧은 비교 포스트다. LLM을 자기 데이터에 연결하는 방식을 Standard RAG, Graph RAG, Agentic RAG 세 가지로 나누고 각각을 3~4단계 파이프라인으로 정리한 뒤, 속도와 비용과 갱신 난이도와 디버깅 난이도를 기준으로 언제 무엇을 고를지 한 줄씩 제시한다. 본문에는 수치와 벤치마크와 코드가 없고, 첨부된 파이프라인 비교도 한 장이 본문보다 더 세밀한 정보를 담고 있다.

## 1. 자료 정보 (Document Information)

- **저자**: Alex Xu. 본문 서명은 "Author of 4 Bestselling Books", "Co-Founder of ByteByteGo"다.
- **매체**: LinkedIn 공개 포스트.
- **URL**: <https://www.linkedin.com/posts/alexxubyte_systemdesign-coding-interviewtips-share-7475575250143928320-lWQD/>
- **발행 시점**: 수집 당시 "1주 전"으로 표시되어 2026-06-28로 근사했다.
- **분량**: 본문 약 300단어의 짧은 포스트다. 첨부된 파이프라인 비교도 한 장을 사용자가 `raw/articles/alex-xu-2026-rag-vs-graph-rag-vs-figures/fig01.png`로 저장했고 fig01로 큐레이션했다.
- **수집 방법**: 사용자가 대화 중 본문을 직접 붙여넣었다 (CLAUDE.md rule #1, WebFetch 미사용).
- **장르**: 세 가지 RAG 구성을 나란히 놓고 비교하는 reference card다. 새 연구 결과나 벤치마크는 제시하지 않는다.
- **부가 요소**: 본문 말미에 독자 질문("Which of these are you running in production?"), 뉴스레터 구독 안내(368페이지 System Design PDF 제공), 해시태그 `#systemdesign`, `#coding`, `#interviewtips`가 붙어 있다.

## 2. 주요 기여 (Key Contributions)

1. **3분류 프레임 제시**. "RAG는 LLM을 데이터에 연결하는 것이고 그 방법이 셋 있다"는 한 문장 아래 Standard RAG, Graph RAG, Agentic RAG를 배치하고, 각각을 3~4단계 파이프라인으로 명시한다.
2. **Graph RAG의 질의 분류 단계 명시**. 검색 방식을 고르기 전에 질의부터 분류한다는 점을 첫 단계로 세운다. 구체적 질문은 local search로, 광범위한 질문은 global search로 보낸다.
3. **local search와 global search의 처리 경로 대비**. local은 벡터 검색으로 entity를 찾은 뒤 knowledge graph를 순회하고, global은 벡터 검색과 그래프 순회를 모두 쓰지 않고 community report를 배치로 불러와 LLM이 관련도를 채점한다. 두 경로가 쓰는 자원이 서로 다르다는 점을 명확히 갈라 적었다.
4. **Agentic RAG를 검증 루프로 정의**. 질의를 sub-question으로 분해하고 소스를 고르는 에이전트와, 검색 결과가 질문에 답이 되는지 판정해 부족하면 재검색을 지시하는 별도 에이전트로 이루어진 2에이전트 구성을 제시한다. 최종 답 생성은 에이전트가 아니라 LLM이 맡는다.
5. **선택 기준 3줄 요약**. 세 방식의 강점과 약점, 그리고 어떤 상황에 적합한지를 각각 한 줄로 제시한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

연구 방법론이 아니라 세 파이프라인을 나란히 배치한 비교 카드다. 아래는 본문 서술을 단계별로 옮긴 것이고, 3.5절에 첨부 비교도가 본문보다 더 담고 있는 정보를 따로 정리했다.

### 3.1 Standard RAG

1. 질의를 임베딩으로 변환해 벡터 데이터베이스와 매칭한다.
2. 가장 가까운 top-K chunk를 꺼내 LLM에 컨텍스트로 전달한다.
3. LLM이 검색된 내용만 써서 근거 있는 답을 작성한다.

본문은 "using only what was retrieved"라고 적어, 답변 근거를 검색 결과로 한정한다는 점을 명시한다.

### 3.2 Graph RAG

1. 질의를 분류한다. 구체적 질문은 local search로, 광범위한 질문은 global search로 라우팅한다.
2. **Local search**: 질의를 임베딩한다. 벡터 데이터베이스가 매칭되는 entity를 찾는다. 파이프라인이 knowledge graph를 순회하며 연결된 컨텍스트를 모은다. LLM이 최종 답을 합성한다.
3. **Global search**: 벡터 검색도 그래프 순회도 하지 않는다. community report를 배치 단위로 불러온다. LLM이 각 report의 관련도를 채점한다. 상위 컨텍스트를 모아 LLM이 최종 응답을 합성한다.

### 3.3 Agentic RAG

1. 추론 에이전트가 질의를 읽고 sub-question으로 분해하며 어떤 소스를 쓸지 고른다.
2. sub-query에 따라 여러 소스에서 컨텍스트를 검색한다.
3. 다른 에이전트가 검색된 컨텍스트로 질문에 답이 되는지 확인한다. 되지 않으면 다시 검색한다.
4. 충분하다고 판정되면 LLM이 프롬프트를 바탕으로 최종 답을 합성한다.

### 3.4 트레이드오프 (Closing)

- **Standard RAG**: 빠르고 저렴하다. 다만 잘못된 chunk가 검색되면 답이 틀리고, 그것을 잡아내는 장치가 없다. 답이 문서 안에 있고 속도가 중요할 때 쓴다.
- **Graph RAG**: 구축 비용이 크고 갱신이 느리다. 법률, 컴플라이언스, 바이오메디컬 데이터처럼 구조화된 지식에 쓴다.
- **Agentic RAG**: 더 유능하고 유연하지만 느리고 비싸며 디버깅이 어렵다. 다단계 추론과 self-correction이 필요한 질문에 쓴다.

### 3.5 첨부 비교도가 추가로 담은 정보

fig01은 본문 세 절을 세 열로 배치한 그림인데, 본문 텍스트에 없는 구성 요소를 여럿 담고 있다. 아래는 그림에서만 확인되는 항목이다.

- **Standard RAG 열의 3단계 구획**: retrieval, augmented, generation 세 구간이 색 블록으로 나뉜다. 벡터 데이터베이스에는 "offline indexing"과 "Index + Metadata"가 붙어 있고, 검색 결과가 LLM으로 바로 가지 않고 "Context augmentation" 블록에서 system prompt, user query, top-K chunk와 합쳐져 augmented prompt가 된다.
- **Agentic RAG 열의 에이전트 이름과 분기**: 첫 에이전트는 "Planning agent (LLM + System Prompt)"이고 "Needs retrieval?"을 먼저 판정한다. 아니면 검색을 건너뛰고 direct query로 바로 LLM에 간다. 맞으면 "Sub-queries + tool selection"을 산출한다. 두 번째 에이전트는 "Evaluator agent (LLM + System Prompt)"로 "Scores retrieved context"와 "Pass or re-retrieve?" 두 동작을 수행한다.
- **Agentic RAG의 검색 대상**: retrieval 블록이 벡터 데이터베이스 하나가 아니라 "Vector database", "Tools + APIs", "MCP servers" 셋을 나열한다. 본문의 "picks the sources"가 무엇을 뜻하는지 그림이 구체화한다.
- **Graph RAG local 경로의 중간 산출물**: 벡터 데이터베이스가 "Find matching entities" 역할을 맡고 "Top K entity IDs"를 낸다. knowledge graph는 "Traverses linked context across connected node"로 표기되고 그 결과가 "Linked context"다. context augmentation 블록의 입력은 "entities, relationships, text chunks"로 명시된다.
- **Graph RAG global 경로의 map 단계 구조**: community report 배치가 "LLM mapping call"로 들어가고, 이 호출의 프롬프트는 "extract & rate"다. 배치는 "next batch until all processed"로 반복된다. 산출물은 "Key points + ratings"이고, 그다음 "Filter low rated points (Keep top ranked only)" 단계를 거쳐 "LLM final synthesis"가 "synthesize" 프롬프트로 최종 답을 만든다.
- **인덱싱 시점 표시**: 벡터 데이터베이스, knowledge graph, community report 세 블록 모두에 "offline indexing"이 붙어 있다. 질의 시점 처리와 사전 구축 자산이 그림에서 구분된다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

본 포스트에는 수치와 벤치마크가 없다. 세 구성 사이의 latency, cost, accuracy 비교표도 없고 production 통계도 없다. 비용과 속도에 관한 서술은 전부 정성 표현("fast and cheap", "expensive to build", "slower, expensive")에 머문다.

정량 비교가 필요하면 이 wiki의 다음 자료가 보완재가 된다.

- `database/li-2026-beyond-semantic-similarity-rethinking-retrieval`: 에이전트가 임베딩 없이 grep과 bash로 원본 코퍼스를 직접 탐색하는 구성의 정량 결과. BrowseComp-Plus에서 동일 backbone 비교 시 Qwen3-Embed-8B retriever 69.0%에서 80.0%로 오르고 비용은 29.4% 줄었다.
- `database/guo-2025-lightrag-simple-and-fast`, `database/zhang-2026-leanrag-knowledge-graph-based-generation`: graph 기반 RAG 계열의 토큰 사용량과 정확도 수치.
- `database/edge-2024-from-local-to-global`: GraphRAG 원논문의 global 질의 벤치마크. 약 100만 토큰 코퍼스 두 개에서 vector RAG 대비 comprehensiveness와 diversity 승률이 72%에서 83% 사이다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **정량 비교 부재**: 세 방식을 정성 서술로만 비교한다. 동일 코퍼스 위에서 맞붙인 head-to-head 결과나 비교표는 없다.
- **조합 가능성 미언급**: 포스트는 세 방식을 상호 배타적인 선택지처럼 나열한다. 둘 이상을 결합하는 구성을 다루지 않으며, 이 wiki 안에서도 그 조합의 실측 근거는 이 자료가 아니라 다른 자료가 들고 있다.
- **다른 변형 누락**: `applications/pandey-2026-rag-is-no-longer-just`가 함께 다루는 Hybrid RAG, Corrective RAG, Multimodal RAG는 이 포스트에 등장하지 않는다.
- **본문과 그림의 배치 순서 불일치**: 본문은 Standard, Graph, Agentic 순으로 설명하지만 첨부 그림은 RAG, Agentic RAG, Graph RAG 순으로 배치되어 있다.
- **그림이 본문보다 상세하다**: 3.5절에 정리한 대로 Planning agent와 Evaluator agent의 이름, direct query 우회 경로, MCP servers를 포함한 검색 대상, global 경로의 mapping call과 저평가 항목 필터링 단계는 그림에만 있다. 본문만 읽으면 이 구조를 알 수 없다.
- **각 항목의 근거 부재**: "구축 비용이 크다", "갱신이 느리다", "디버깅이 어렵다" 같은 판정에 측정값이나 사례가 붙어 있지 않다.

## 6. 관련 연구 (Related Work)

본 포스트는 외부 인용을 명시하지 않는다. 이 wiki 안의 자료와 대조하면 다음 관계가 확인된다.

- **Graph RAG의 global 경로**: `database/edge-2024-from-local-to-global`(Microsoft Research, 2024)이 다루는 설계와 대응한다. community report를 배치로 처리하고 부분 결과를 다시 합성하는 map-reduce 구조가 같다. 한국어 해설은 `database/dsba-2025-graphrag-paper-review`에 있다.
- **Graph RAG의 local 경로**: 원논문이 아니라 공식 구현체 `database/microsoft-graphrag`에 대응한다. `overviews/lightrag-family-graph-rag-overview`가 지적하듯 원논문 본문은 community summary와 map-reduce 단일 질의 모드만 다루고, local search와 global search의 이원 구성은 구현체 쪽 기능이다. Alex Xu가 그린 질의 분류 라우팅은 논문보다 구현체의 동작에 가깝다.
- **graph 기반 RAG 계보의 후속 변형**: LightRAG(`database/guo-2025-lightrag-simple-and-fast`), LeanRAG(`database/zhang-2026-leanrag-knowledge-graph-based-generation`), RAG-Anything(`database/guo-2025-rag-anything-all-in-one-rag`)이 있고, 이들을 묶은 계보 정리는 `overviews/lightrag-family-graph-rag-overview`다.
- **에이전트 역할 분리의 사례**: `agents/qiao-2026-memory-intelligence-agent`의 MIA는 Memory Manager, Planner, Executor로 역할을 나누고 별도 심사 에이전트가 품질을 판정한다. Alex Xu의 Planning agent와 Evaluator agent 구분과 같은 방향의 설계다.
- **같은 형식의 LinkedIn RAG 개관**: `applications/pandey-2026-rag-is-no-longer-just`(Hybrid, Graph, Agentic, CRAG, Multimodal 5분류), `applications/liu-2026-rag-llm-wiki-or-gbrain`.

## 7. 용어집 (Glossary)

- **Standard RAG**: 질의를 임베딩해 벡터 데이터베이스에서 top-K chunk를 찾고, LLM이 그 chunk만으로 답을 쓰는 기본 구성.
- **Graph RAG**: knowledge graph 위에서 검색하는 RAG. 질의 범위에 따라 local search와 global search로 경로가 갈린다.
- **Local search**: Graph RAG에서 구체적 질문에 쓰는 경로. 벡터 검색으로 entity를 찾은 뒤 knowledge graph를 순회해 연결된 컨텍스트를 모은다.
- **Global search**: Graph RAG에서 광범위한 질문에 쓰는 경로. 벡터 검색과 그래프 순회 없이 community report를 LLM이 배치로 채점해 상위 항목만 쓴다.
- **Agentic RAG**: 검색을 에이전트의 판단 대상으로 다루는 RAG. 질의를 sub-question으로 분해하고, 별도 에이전트가 검색 결과의 충분성을 판정해 부족하면 재검색한다.
- **Community report**: knowledge graph의 커뮤니티 단위를 요약해 미리 만들어 둔 문서. global search의 입력 단위다.
- **Planning agent**: 그림에서 Agentic RAG의 첫 에이전트에 붙은 이름. 검색이 필요한지 판정하고 필요하면 sub-query와 사용할 도구를 정한다.
- **Evaluator agent**: 그림에서 두 번째 에이전트에 붙은 이름. 검색된 컨텍스트를 채점하고 통과시킬지 재검색할지 정한다.

## 8. 그림 후보 (Figure Candidates)

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | RAG, Agentic RAG, Graph RAG 3열 파이프라인 비교도 (ByteByteGo 카드 이미지) | manual | ★ wiki 권장 (architecture). 본문보다 상세해 이 자료의 실질 정보량 대부분을 담고 있다 |

후보는 fig01 한 장뿐이다. 사용자가 원 포스트의 첨부 이미지를 수동 저장한 것이라 `figures.json` 매니페스트는 없다.
