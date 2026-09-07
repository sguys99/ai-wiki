---
title: "PageIndex: Next-Generation Vectorless, Reasoning-based RAG"
type: article
year: 2025
category: database
raw_path: raw/articles/zhang-2025-pageindex-vectorless-reasoning-rag.md
raw_filename: "zhang-2025-pageindex-vectorless-reasoning-rag.md"
source_collection: external
author: "Mingtian Zhang, Yu Tang and PageIndex Team"
url: "https://pageindex.ai/blog/pageindex-intro"
publisher: "PageIndex Blog"
publication_date: "2025-09-19"
tags: [rag, vectorless-rag, pageindex, reasoning-based-rag, toc-tree, in-context-index, long-document, mcp, cross-reference, hard-chunking]
---

## 한 줄 요약 (One-line Summary)

PageIndex 팀이 자사 블로그에 직접 게시한 소개글로, 문서의 목차를 JSON 트리로 만들어 LLM의 컨텍스트 안에 두고 모델이 스스로 다음에 볼 곳을 정하게 하는 reasoning-based RAG를 제안하고, 임베딩 유사도에 기대는 vector 기반 RAG의 다섯 가지 한계를 각각 어떻게 대응하는지 매핑한다. 정량 벤치마크는 제시하지 않고 Federal Reserve 보고서 질의 사례 하나로 우위를 주장한다.

## 1. 자료 정보 (Document Information)

- **제목**: PageIndex: Next-Generation Vectorless, Reasoning-based RAG
- **저자**: Mingtian Zhang, Yu Tang and PageIndex Team
- **출처**: PageIndex Blog (https://pageindex.ai/blog/pageindex-intro)
- **발행일**: 2025-09-19
- **유형**: 제품 개발사가 쓴 소개글. 설계 동기와 개념 설명이 중심이고 실험 보고서가 아니다
- **인용 형식**: 원문이 BibTeX 항목 `zhang2025pageindex`를 제공한다. journal 필드는 PageIndex Blog로 적혀 있다
- **관련 자료**: [[database/vectifyai-pageindex]] (오픈소스 구현체), [[database/geeksforgeeks-2026-vectorless-rag-pageindex]] (외부 튜토리얼), [[database/kalane-2026-pageindex-threw-out-vector-databases]] (3rd-party 리뷰)

## 2. 주요 기여 (Key Contributions)

1. **문제 규정**: LLM의 근본 제약을 context window로 잡고, context 길이가 늘어날수록 모델 성능이 떨어진다는 연구 결과를 근거로 든다. 원문은 이 주장에 개별 논문 인용을 달지 않는다. 그 결과 금융 보고서나 법률 서류처럼 복잡한 도메인 문서를 정확히 해석하기 어렵다고 본다.
2. **Vectorless RAG 개념 제시**: vector DB와 임베딩 없이 LLM의 컨텍스트 내부 추론만으로 장문 문서에서 답을 찾는 retrieval 방식을 정의한다.
3. **Vector 기반 RAG의 다섯 가지 한계 분류**: query와 지식 공간의 불일치, 의미 유사도와 관련성의 불일치, hard chunking으로 인한 의미 단절, 대화 이력 미통합, 문서 내부 참조 추적 실패로 나눈다.
4. **PageIndex Tree 자료구조**: `node_id`, `name`, `description`, `metadata`, `sub_nodes`로 구성된 재귀 JSON 트리로 구조가 없는 문서에 목차 인덱스를 부여한다.
5. **In-context index 개념**: vector DB가 외부에 정적으로 저장된 임베딩이라면, PageIndex 트리는 LLM의 추론 컨텍스트 안에 상주해 모델이 직접 참조하고 이동하며 추론할 수 있는 인덱스다.
6. **반복 retrieval 루프**: 목차 읽기, 섹션 선택, 정보 추출, 충분성 평가, 답변 생성의 5단계로 사람이 긴 문서를 다루는 방식을 모사한다.
7. **선례 인용**: Claude Code가 코드 retrieval에서 전통적 vector 기반 RAG를 벗어나 vector DB 없이 더 나은 정밀도와 속도를 얻었다는 점을 같은 원리의 근거로 든다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 대조군인 vector 기반 RAG의 동작

- **전처리**: 문서를 chunk로 분할한다. 원문은 통상 512개 또는 1000개 토큰을 예로 든다. 각 chunk를 임베딩 모델로 벡터 공간에 사상하고 Chroma나 Pinecone 같은 vector DB에 저장한다.
- **질의**: 사용자 query를 임베딩하고, vector DB에서 유사한 chunk를 찾은 뒤, top-k 결과를 모델 입력 컨텍스트로 삼는다.
- 원문은 이 방식이 짧은 텍스트에는 효과적이라고 인정한 뒤 다섯 가지 한계를 든다.

### 저자가 규정한 다섯 가지 한계

1. **Query와 지식 공간의 불일치**: vector retrieval은 query와 의미적으로 가장 유사한 텍스트가 가장 관련성 높은 텍스트라고 가정한다. 그러나 query는 내용이 아니라 의도를 표현하므로, 검색의 가정과 실제 관련성 요구 사이에 근본적 불일치가 생긴다.
2. **의미 유사도가 관련성과 같지 않음**: 금융 공시, 법률 문서, 기술 매뉴얼처럼 도메인 특화 문서에서 특히 심하다. 여러 문단이 거의 같은 의미를 공유하면서도 관련성은 결정적으로 다르기 때문이다.
3. **Hard chunking이 의미와 문맥의 완결성을 깨뜨림**: 고정 크기 분할이 문장, 문단, 섹션 한가운데를 자르면서 의미와 맥락을 조각낸다.
4. **대화 이력을 통합하지 못함**: 각 query가 독립적으로 처리되므로 retriever가 앞서 무엇을 묻고 답했는지 모른다. 일관된 multi-turn 대화가 성립하지 않는다.
5. **문서 내부 참조 처리의 어려움**: "see Appendix G"나 "refer to Table 5.3" 같은 참조는 참조 대상과 의미 유사도를 갖지 않는다. 원문은 knowledge graph 같은 추가 전처리를 하지 않는 한 전통적 RAG가 이런 참조를 놓친다고 적는다.

### PageIndex의 반복 retrieval 루프

원문이 제시하는 5단계는 다음과 같다.

1. **목차 읽기**: 문서 구조를 파악하고 관련 가능성이 있는 섹션을 식별한다.
2. **섹션 선택**: 질문에 비추어 유용한 정보를 담고 있을 가능성이 가장 높은 섹션을 고른다.
3. **관련 정보 추출**: 선택한 섹션을 파싱해 답에 쓸 내용을 모은다.
4. **정보 충분성 평가**: 충분하면 답변으로 넘어가고, 부족하면 1단계로 돌아가 다른 섹션으로 반복한다.
5. **답변 생성**: 정보가 모이면 근거를 갖춘 완전한 답을 만든다.

원문은 이 과정에서 목차가 문서의 핵심 인덱스 역할을 한다고 정리한다. 정적 의미 유사도에 기대는 기존 방식과 달리, 질문의 맥락이 전개되는 상황에 맞춰 다음에 볼 곳을 능동적으로 정하는 동적 반복 추론이라는 점을 차이로 든다.

### ToC 인덱스의 자료구조

JSON 기반 계층 구조가 구조 없는 문서의 목차를 표현한다. 목차는 내용을 계층 노드로 조직하는 인덱스 트리 역할을 하고, 각 노드는 하나의 논리적 섹션을 나타내며 metadata, 설명, 하위 섹션 링크를 가질 수 있다.

원문이 든 노드 스키마는 다음과 같다.

```
Node {
  node_id: string,         // 고유 노드 식별자
  name: string,            // 사람이 읽을 수 있는 라벨 또는 제목
  description: string,     // 선택적 상세 설명
  metadata: object,        // 맥락이나 속성을 담는 key-value 쌍
  sub_nodes: [Node]        // 자식 노드 배열, 재귀 구조
}
```

원문이 붙인 설명은 세 가지다. `node_id`는 대응하는 원본 데이터를 찾는 참조 키다. `sub_nodes`는 재귀 중첩을 허용해 완전한 목차 트리를 이룬다. `metadata`는 문서 유형, 저자, 타임스탬프, 관련성 점수 같은 의미 정보를 담을 수 있다.

이 구조가 LLM에 가능하게 하는 동작으로 세 가지를 든다. 구조화된 내용을 재귀적으로 순회하는 것, `node_id`로 목표 원본 데이터를 가져오는 것, 출처 유형이나 주제나 의미 태그 같은 맥락 metadata를 결합하는 것이다.

각 노드는 `node_id → node_content` 매핑으로 원본 내용에 직접 연결된다. 원문은 node_content가 원본 내용, 추출된 텍스트, 이미지 등을 포함한다고 적는다.

### 예시 트리

원문은 Federal Reserve 보고서를 예로 실제 트리 조각을 보여준다.

| node_id | title | start_index | end_index |
|---|---|---|---|
| 0006 | Financial Stability | 21 | 22 |
| 0007 | Monitoring Financial Vulnerabilities | 22 | 28 |
| 0008 | Domestic and International Cooperation and Coordination | 28 | 31 |

0007과 0008은 0006의 `sub_nodes`다. 각 노드에는 `summary` 필드가 붙어 있고, 예시에서는 "The Federal Reserve ..." 처럼 앞부분만 표시된다.

### In-context index

원문의 핵심 대비는 저장 위치다. vector DB는 외부에 정적 임베딩을 저장하지만, JSON 기반 목차 인덱스는 LLM의 활성 추론 컨텍스트 안에 상주한다. 저자는 이를 in-context index라 부르며, 모델이 추론 시점에 직접 참조하고 이동하고 추론할 수 있는 인덱스라고 설명한다. 인덱스를 모델의 context window 안에 통합함으로써, 모델은 미리 계산된 유사도 점수에만 의존하지 않고 다음에 볼 곳을 동적으로 정한다.

### 다섯 한계에 대한 대응

1. **Query와 지식 공간의 불일치**: 임베딩 유사도 검색에만 기대지 않고, 모델이 추론으로 어느 섹션에 답이 있을지 유추한다. 원문이 든 예시는 부채 추이라면 재무 요약 섹션이나 Appendix G에 있을 테니 그 섹션을 먼저 보자는 식의 문서 구조에 대한 사고다.
2. **의미 유사도와 관련성의 불일치**: 유사도만이 아니라 맥락적 관련성을 중시한다. 모델이 목차나 PageIndex 구조를 읽고 query의 의도를 해석해, 표현이 다르더라도 실제 답이 있는 섹션으로 이동한다. 단어를 맞추는 대신 질문을 이해하는 사람의 정보 탐색 방식과 같다는 것이 저자의 설명이다.
3. **Hard chunking**: 임의로 자르는 대신 전체 페이지, 섹션, 챕터처럼 의미가 온전한 단위를 가져온다. 섹션이 불완전하다고 판단하면 컨텍스트가 충분해질 때까지 이웃 섹션을 반복해 가져온다. 원문은 이것이 논리적 연속성을 보존하고 환각을 줄인다고 적는다.
4. **대화 이력 통합**: retrieval이 맥락을 인식해, 이전 대화 이력으로 현재 질문의 이해를 다듬는다. 사용자가 앞서 financial assets를 묻고 이제 liabilities를 물으면, retriever가 같은 보고서 섹션의 부채 항목을 살펴야 한다는 것을 안다.
5. **문서 내부 참조**: 목차 기반 계층 구조를 활용해 사람 독자처럼 참조를 따라간다. "see Appendix G"를 만나면 인덱스 트리를 따라 그 섹션으로 이동해 데이터를 가져온다. 수동 링크 구축 없이 상호 참조가 가능해진다.

### 배포 형태

개발자는 GitHub에서 오픈소스 코드와 cookbook, 튜토리얼을 받을 수 있다. 제품은 ChatGPT 스타일 채팅 플랫폼으로 제공되며, MCP나 API로 통합할 수도 있다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 정량 수치 없음

이 글은 정확도, precision, recall, latency, 비용 중 어떤 정량 벤치마크도 제시하지 않는다. 본문에 등장하는 숫자는 chunk 크기 예시(512개, 1000개 토큰), 사례의 페이지 번호(75~82, 77), 예시 트리의 노드 인덱스(21, 22, 28, 31)와 `node_id` 값이 전부다.

인접 페이지에서 자주 인용되는 FinanceBench 98.7% 수치는 **이 글에 없다**. 그 수치의 출처는 별개 자료이며 조건은 다음과 같다.

| 항목 | 내용 | 확인한 출처 |
|---|---|---|
| 수치 | FinanceBench 정확도 98.7%, coverage 100% | `raw/repos/vectifyai-pageindex.md`, `raw/articles/kalane-2026-...` |
| 대상 시스템 | Mafin 2.5. PageIndex를 retrieval 층으로 쓰는 VectifyAI의 금융 분석 에이전트로, PageIndex 자체가 아니다 | 위와 같음 |
| 벤치마크 | FinanceBench. 실제 SEC 공시(10-K, 10-Q, 8-K) 기반 정답 일치형 QA | `raw/articles/kalane-2026-...` |
| 보고 주체 | VectifyAI 자체 보고. 독립 재검증 없음 | `raw/articles/kalane-2026-...` |
| 이 글과의 관계 | 이 글은 2025-09-19 게시본이며 해당 수치를 언급하지 않는다 | 이 raw 전문 |

### 제시된 유일한 사례

PageIndex MCP 사례로 Federal Reserve 보고서 질의가 등장한다.

- **질문**: deferred asset의 총액.
- **문제**: 주 섹션인 75~82쪽에는 증가분만 적혀 있고 총액이 없다.
- **단서**: 77쪽 본문에 Table 5.3이 2023년과 2022년 Reserve Bank의 수입, 비용, 배분을 요약하며 이 보고서의 Appendix G "Statistical Tables"가 더 상세한 정보를 제공한다는 문장이 있다.
- **결과**: 추론 기반 retriever가 이 단서를 따라 Appendix G로 이동해 올바른 표를 찾고 deferred asset 총액을 반환했다.
- **비교 주장**: 저자는 vector 기반 retrieval이라면 실패할 가능성이 높은 과제라고 적는다. 실제로 vector RAG를 같은 질의로 돌린 대조 실험 결과는 제시하지 않는다.

### 정성 비교 표

원문이 결론부 앞에 둔 요약 표다.

| 한계 | Vector 기반 RAG | Reasoning 기반 RAG |
|---|---|---|
| Query와 지식의 불일치 | 표면 유사도를 맞추며 실제 맥락을 자주 놓친다 | 유추로 가장 관련 있는 섹션을 식별한다 |
| 유사도와 관련성의 불일치 | 의미는 유사하나 무관한 chunk를 가져온다 | 맥락적으로 관련 있는 정보를 가져온다 |
| Hard chunking | 고정 길이 chunk가 의미를 조각낸다 | 일관된 섹션을 동적으로 가져온다 |
| 대화 맥락 부재 | 각 query가 고립된다 | Multi-turn 추론이 이전 맥락을 고려한다 |
| 상호 참조 | 문서 내부 링크를 따라가지 못한다 | 목차와 PageIndex 추론으로 본문 참조를 따라간다 |

### 결론부의 주장

vector 기반 RAG가 유사한 텍스트를 찾는다면 reasoning 기반 RAG는 어디를 왜 볼지 생각한다는 것이 저자의 정리다. 목차 트리 같은 구조화된 문서 표현과 반복 추론을 결합하면 LLM이 단지 유사한 정보가 아니라 관련 있는 정보를 가져오게 된다고 주장한다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

### 저자가 밝힌 한계

원문에는 한계나 향후 과제를 다루는 절이 없다. 저자가 스스로 인정한 제약은 하나도 기재되어 있지 않다.

### 자료의 내적 모순

- **노드 스키마와 예시 트리의 필드가 다르다.** 스키마 정의는 `name`, `description`, `metadata`, `sub_nodes`를 든다. 그러나 바로 아래 예시 트리는 `title`, `summary`, `start_index`, `end_index`, `sub_nodes`를 쓰고 `metadata`는 나오지 않는다. 스키마에는 `start_index`와 `end_index`가 정의되어 있지 않다. 같은 글 안에서 두 형태가 공존한다.
- **내부 참조 한계의 서술 강도가 다르다.** 한계 서술에서는 knowledge graph 같은 추가 전처리를 하면 vector RAG도 내부 참조를 다룰 수 있다는 단서를 붙이지만, 요약 표는 vector RAG가 내부 링크를 따라가지 못한다고 단정한다.

### 자료 성격에서 오는 제약

- **정량 근거 부재**: 정확도, latency, 비용 어느 것도 수치로 제시되지 않는다. 우위 주장은 사례 하나와 정성 표에 의존한다.
- **대조 실험 부재**: deferred asset 사례에서 vector RAG의 실패는 실측이 아니라 저자의 예상이다.
- **자사 제품 소개글**: 저자가 곧 제품 개발사이므로 대비 서술이 자사에 유리하게 구성되어 있다.
- **context 성능 저하 주장에 인용이 없다**: 도입부의 근거인 context 길이에 따른 성능 저하 연구를 특정 논문으로 지목하지 않는다.

### 추가로 검토가 필요한 지점

- **트리 생성 비용**: 구조가 없는 문서를 목차 트리로 바꾸는 전처리 부담을 원문은 다루지 않는다. 목차가 명시되지 않은 문서에서 특히 문제가 될 수 있다.
- **Context window 점유**: 인덱스를 컨텍스트 안에 두는 설계이므로 트리 자체가 토큰을 소비한다. 문서가 커지면 도입부에서 문제로 지목한 context window 제약과 다시 만난다.
- **반복 호출 비용과 지연**: vector retrieval이 한 번의 top-k 검색인 반면 추론 루프는 LLM 호출을 여러 번 요구한다. 원문은 이 비용을 언급하지 않는다.
- **문서 유형 일반화**: 사례가 명시적 섹션 구조를 가진 금융 보고서에 집중되어 있어, 자유 산문이나 대화 기록에서의 효과는 이 글만으로 판단할 수 없다.

## 6. 관련 연구 (Related Work)

- **VectifyAI/PageIndex**: 이 글이 소개하는 시스템의 오픈소스 구현체. [[database/vectifyai-pageindex]].
- **GeeksforGeeks 튜토리얼**: PageIndex Cloud API를 코드로 따라가는 입문 자료. [[database/geeksforgeeks-2026-vectorless-rag-pageindex]].
- **Kalane의 3rd-party 리뷰**: 출시 6개월 뒤의 외부 점검이며, 이 글이 비워 둔 정량 표와 trade-off 진단을 채운다. [[database/kalane-2026-pageindex-threw-out-vector-databases]].
- **Claude Code의 코드 retrieval**: 원문이 vector DB를 쓰지 않고도 더 나은 정밀도와 속도를 얻은 선례로 인용한다. 원문은 Claude Code의 구현 방식을 상술하지 않는다.
- **Knowledge graph 전처리**: 원문은 내부 참조 문제를 다루는 기존 우회 수단으로 knowledge graph를 한 번 언급한다. GraphRAG 등 특정 시스템 이름은 이 글에 나오지 않는다.
- **Vector DB 인프라**: Chroma와 Pinecone이 대조군의 저장소 예로 등장한다.
- **MCP**: 배포 채널의 하나이자 사례 실험의 실행 환경으로 언급된다.

## 7. 용어집 (Glossary)

- **Vectorless RAG**: 임베딩과 vector DB 없이 LLM의 추론만으로 retrieval을 수행하는 방식을 가리키는 이 글의 범주명.
- **Reasoning-based RAG**: 미리 계산된 유사도 대신 모델이 질의 맥락에 따라 다음에 볼 곳을 정하는 retrieval 방식.
- **PageIndex Tree**: 문서의 목차를 재귀 JSON 트리로 표현한 인덱스 자료구조. 노드 하나가 논리적 섹션 하나에 대응한다.
- **In-context index**: 외부 저장소가 아니라 LLM의 활성 추론 컨텍스트 안에 상주해, 모델이 추론 시점에 직접 참조하고 이동할 수 있는 인덱스.
- **Hard chunking**: 문서를 512개나 1000개 토큰 같은 고정 크기로 자르는 방식. 문장과 문단 경계를 무시해 의미 단절을 일으킨다.
- **node_id에서 node_content로의 매핑**: 트리 노드의 식별자가 원본 내용, 추출 텍스트, 이미지에 연결되어 선택적 retrieval을 가능하게 하는 구조.
- **In-document reference**: "see Appendix G"나 "refer to Table 5.3"처럼 문서가 자기 안의 다른 위치를 가리키는 참조.
- **Mafin 2.5**: PageIndex를 retrieval 층으로 쓰는 VectifyAI의 금융 분석 에이전트. FinanceBench 98.7% 수치의 실제 대상이며, 이 글에는 등장하지 않는다.
