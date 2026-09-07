---
title: "PageIndex: The RAG Framework That Threw Out Vector Databases and Still Hit 98.7% Accuracy"
type: article
year: 2026
category: database
raw_path: raw/articles/kalane-2026-pageindex-threw-out-vector-databases.md
raw_filename: "kalane-2026-pageindex-threw-out-vector-databases.md"
source: kalane-2026-pageindex-threw-out-vector-databases.md
source_collection: external
author: "Akshay Kalane"
url: "https://pub.towardsai.net/pageindex-the-rag-framework-that-threw-out-vector-databases-and-still-hit-98-7-accuracy-d194e0549478"
publisher: "Towards AI (pub.towardsai.net)"
publication_date: "2026-04-02"
tags: [rag, vectorless-rag, pageindex, reasoning-based-rag, financebench, mafin-2.5, mcp, openai-agents-sdk, vision-rag, tree-search, in-context-index, third-party-assessment]
---

## 요약

이 페이지는 PageIndex를 만든 팀이 아니라 외부 실무자가 쓴 사후 점검 리뷰를 다룬다. 저자 Akshay Kalane는 production RAG를 2년간 다뤘다고 밝히며, PageIndex가 출시된 지 반년이 지난 2026년 4월 시점에서 그 주장이 어디까지 성립하는지를 검토한다. PageIndex 자체의 동작 상세는 [[database/zhang-2025-pageindex-vectorless-reasoning-rag]]와 [[database/vectifyai-pageindex]]가 담당하므로, 이 페이지는 외부 관찰자가 무엇을 확인했고 무엇을 문제로 봤는지에 집중한다.

이 글이 팀 자료에 더한 것은 세 가지다. 첫째, FinanceBench 정량 비교 표를 제시한다. PageIndex 팀 소개글에는 벤치마크 수치가 하나도 없으므로 이 표가 이 리뷰의 가장 눈에 띄는 기여다. 둘째, 출시 이후 반년간 추가된 기능 다섯 가지를 카탈로그로 묶는다. 셋째, latency와 비용과 규모와 문서 구조 의존과 추론 근사 실패라는 trade-off 다섯 가지를 한 절에 모은다. 팀 소개글은 이 다섯 가지 중 어느 것도 다루지 않았다.

다만 제목이 내세우는 98.7%는 그대로 인용하기 어려운 수치다. 이 값은 오픈소스 PageIndex가 아니라 VectifyAI가 그 위에 만든 금융 분석 에이전트 Mafin 2.5의 성적이고, 저자는 그 수치를 어디서 가져왔는지도 어떤 조건에서 측정됐는지도 적지 않는다. 저자 본인도 "The 98.7% is on one benchmark"라고 유보를 단다. 이 페이지는 아래 결과 절에서 그 조건과 공백을 항목별로 분리해 기록한다.

## 배경

### 이 리뷰가 놓인 자리

PageIndex 계열 자료는 이 wiki 안에 네 편이 있고 성격이 서로 다르다. 같은 시스템을 다루더라도 누가 썼는지에 따라 신뢰 조건이 달라지므로 먼저 위치를 확인한다.

| 자료 | 작성 주체 | 성격 |
|---|---|---|
| [[database/zhang-2025-pageindex-vectorless-reasoning-rag]] | PageIndex 팀 | 2025년 9월 소개글. 개념과 설계 의도의 원본 |
| [[database/vectifyai-pageindex]] | PageIndex 팀 | 오픈소스 구현체의 README |
| [[database/geeksforgeeks-2026-vectorless-rag-pageindex]] | 외부 매체 | Cloud API 사용법 튜토리얼 |
| 이 페이지 | 외부 실무자 | 출시 반년 뒤의 사후 점검 리뷰 |

공급자가 쓴 자료는 설계 의도를 가장 정확히 전하지만 한계를 스스로 짚을 유인이 적다. 이 리뷰의 값어치는 그 빈자리를 채우는 데 있다. 반대로 이 리뷰가 인용하는 성능 수치는 공급자가 발표한 값이므로, 이 페이지에서는 그 방향의 신뢰 조건을 따로 기록한다.

### vector RAG 파이프라인의 표준 구성

저자가 대비군으로 삼는 구성은 실무에서 흔한 형태다. 문서를 300~500 토큰 크기의 고정 조각으로 자르고, `text-embedding-3-large` 같은 모델로 각 조각을 임베딩한다. 임베딩은 텍스트를 고정 차원 벡터로 바꾼 표현이며, 그 벡터를 Pinecone이나 Weaviate, Milvus, Chroma, pgvector 같은 vector DB에 넣는다. 질의가 들어오면 질문도 같은 방식으로 임베딩해 코사인 거리가 가까운 상위 k개 조각을 뽑고 LLM에 함께 넣는다.

이 구성의 전제는 하나다. 질의와 의미적으로 가장 닮은 텍스트가 가장 관련 있는 텍스트라는 것이다. 저자가 문제 삼는 지점이 정확히 이 전제다.

### 저자가 반복 목격한 실패 유형

저자는 실패를 다섯 가지로 나눈다. 이 다섯 가지는 임베딩 모델을 바꾸거나 reranking 단계를 붙여도 사라지지 않는다는 것이 저자의 주장이다. reranking은 1차 검색이 뽑은 후보를 정밀 모델로 다시 정렬하는 단계를 말한다.

| 실패 유형 | 무엇이 어긋나는가 | 저자가 든 사례 |
|---|---|---|
| Query-Answer Mismatch | 질의는 의도를 담고 문서는 내용을 담는다. 두 공간이 애초에 다르다 | "revenue trends"로 검색해도 구체적인 표 값이 올라오지 않는다 |
| Term Frequency Problem | 같은 용어가 문서 전역에 반복되면 유사도가 평준화된다 | 200쪽 연차보고서에서 "operating income"이 60회 이상 등장하면 정작 필요한 항목이 상위 3개에 들지 못한다 |
| Chunking Destroys Tables | 고정 크기로 자르면 표의 머리와 몸통이 갈라진다 | 표 헤더가 14번 조각에, 사용자가 필요한 데이터 행이 15번 조각에 들어가면 어느 쪽도 단독으로는 뜻이 통하지 않는다 |
| No Multi-Turn Memory | 각 질의가 독립적으로 처리되어 직전 대화의 문서 컨텍스트가 사라진다 | "what about liabilities?" 같은 후속 질문이 새 질의로 처리된다 |
| Cross-References Invisible | 문서 안의 참조는 원 질의와 의미적으로 닮지 않는다 | "see Appendix G" 같은 페이지 참조는 유사도가 0이라 vector RAG가 따라가지 못한다 |

다섯 번째를 메타데이터로 우회하는 방식에 대해 저자는 "brittle and doesn't scale"이라고 적는다. 저자는 이 진단을 개별 구성 요소의 문제가 아니라 구조 수준의 문제로 규정하고, VectifyAI 창업자 Mingtian Zhang의 표현 "relevance requires reasoning"을 근거로 인용한다.

### PageIndex의 설계 출발점

저자는 PageIndex의 발상을 AlphaGo에서 가져왔다고 소개한다. "Instead of searching a space exhaustively (the way vector similarity scans all chunks), use a learned strategy to navigate it intelligently." 공간을 남김없이 훑는 대신 학습된 전략으로 이동한다는 뜻이다. 벡터 유사도가 모든 조각을 훑는 방식이라면 PageIndex는 그 반대편을 고른 셈이다.

시스템의 내력에 대해 저자는 VectifyAI가 2025년 9월에 공개한 오픈소스 프레임워크로 적고, 만든 사람으로 Mingtian Zhang과 Yu Tang을 든다. Mingtian Zhang은 UCL 동문으로 소개된다. 라이선스는 MIT이고 2026년 3월 말 기준 GitHub star가 2만 3천 개 이상, fork가 약 2천 개라고 밝힌다.

저자가 꼽는 차별점은 세 가지다.

| 차별점 | 무엇을 대체하는가 | 저자의 설명 |
|---|---|---|
| vector DB 없음 | 벡터 유사도 검색 | 문서 구조와 LLM의 판단이 유사도 검색을 대신한다 |
| chunking 없음 | 임의로 자른 500 토큰 창 | 자연스러운 절과 장과 문단과 표 단위를 그대로 쓴다 |
| 사람처럼 탐색 | 병렬 유사도 계산 | "Works the way I'd work if I were manually searching a document: check the table of contents, find the section that probably has my answer, read it" |

## 핵심 개념

**vectorless RAG**는 임베딩과 vector DB와 chunking을 모두 쓰지 않는 retrieval 방식을 뜻한다. retrieval은 외부 지식에서 관련 정보를 찾아오는 단계를 가리킨다. PageIndex는 벡터 유사도 대신 문서 구조와 LLM의 판단으로 어디를 볼지 정한다.

**트리 인덱스**는 문서의 목차를 계층 JSON으로 옮긴 자료 구조다. 각 노드가 하나의 논리적 섹션에 대응하고, 노드 아래에 하위 노드가 재귀적으로 달린다. 임의로 자른 500 토큰 창이 아니라 문서가 원래 가진 절, 장, 문단, 표 단위를 그대로 쓴다.

**in-context index**는 VectifyAI가 쓰는 용어로, 인덱스가 외부 저장소가 아니라 LLM의 활성 컨텍스트 안에 상주한다는 뜻이다. vector DB는 추론 밖에 미리 계산된 임베딩을 정적으로 쌓아 두지만, PageIndex의 JSON 트리는 추론이 진행되는 동안 모델이 직접 읽고 판단할 수 있는 위치에 있다. 50쪽짜리 SEC 파일링의 트리가 30~50개 노드로 만들어져 단일 context window 안에 들어간다는 것이 이 설계의 전제다. context window는 모델이 한 번에 받아들일 수 있는 토큰 길이 한도를 말한다.

**추론 기반 탐색**은 코사인 거리 계산 대신 LLM에게 어디를 볼지 묻는 방식이다. 저자의 대비 명제는 다음과 같다. "Vector DB computes cosine similarity for every chunk in parallel, fast but dumb. PageIndex asks the LLM to think about where the answer lives." 병렬 계산의 속도를 포기하는 대신 판단을 얻는 교환이다.

**추론 기록**은 어떤 노드를 왜 방문했는지가 단계마다 남는 흔적이다. 저자는 감사 추적이 필요한 규제 산업에서 이 점을 가장 큰 이점으로 꼽는다.

**Mafin 2.5**는 VectifyAI가 PageIndex 위에 만든 금융 분석 에이전트다. 이 구분이 이 페이지에서 가장 중요한 개념 구분이므로 표로 분리한다.

| 이름 | 정체 | 라이선스와 공개 여부 | 98.7%와의 관계 |
|---|---|---|---|
| PageIndex | 트리 인덱스와 추론 기반 탐색을 제공하는 프레임워크 | 저자는 MIT 라이선스 오픈소스로 소개한다 | 이 글의 도입부는 PageIndex가 98.7%를 달성했다고 적는다 |
| Mafin 2.5 | PageIndex 위에 만든 금융 분석 에이전트 | 이 글은 공개 여부나 라이선스를 적지 않는다 | 벤치마크 표는 98.7%를 Mafin 2.5 행에 적는다 |

두 이름 사이에 무엇이 더해졌는지는 이 글에 없다. 따라서 98.7%를 오픈소스 PageIndex의 성능으로 인용하면 근거를 넘어선다.

## 방법

### 1단계 계층 트리 인덱스 구축

문서를 넣는 시점에 PageIndex는 임베딩을 하나도 만들지 않는다. 대신 문서 구조를 분석해 LLM이 읽기 좋은 목차를 계층 트리로 생성한다. 트리 구축은 질의와 무관하게 미리 한 번만 수행된다.

노드가 담는 항목은 네 가지다.

| 필드 | 역할 |
|---|---|
| `title` | 섹션 이름 |
| `summary` | 그 섹션이 무엇을 다루는지에 대한 짧은 설명 |
| 페이지 범위 | `start_index`와 `end_index`로 원문 위치를 지정한다 |
| `child_nodes` | 하위 섹션을 재귀적으로 중첩한다 |

Federal Reserve 연차보고서에서 뽑은 실제 노드는 다음 형태다.

```json
{
  "node_id": "0006",
  "title": "Financial Stability",
  "start_index": 21,
  "end_index": 22,
  "summary": "Covers the Federal Reserve's financial stability oversight...",
  "sub_nodes": [
    {
      "node_id": "0007",
      "title": "Monitoring Financial Vulnerabilities",
      "start_index": 22,
      "end_index": 28,
      "summary": "Describes the Fed's vulnerability monitoring framework..."
    },
    {
      "node_id": "0008",
      "title": "Domestic and International Cooperation",
      "start_index": 28,
      "end_index": 31,
      "summary": "Federal Reserve collaboration with international bodies..."
    }
  ]
}
```

`node_id`는 해당 섹션의 원문에 대응하는 참조 키로 동작한다. 탐색 단계에서 모델이 노드를 고르면 시스템이 그 키로 실제 본문을 가져온다. 50쪽 문서가 30~50개 노드를 만든다는 수치는 노드 하나가 평균 한두 쪽 분량의 섹션에 대응한다는 뜻이다.

### 2단계 추론 기반 트리 탐색

질의가 들어오면 시스템은 트리를 LLM에 넘긴다. 이때 제목과 요약만 넘기고 본문 텍스트는 빼는 것이 핵심이다. 본문을 함께 넘기면 트리가 context window를 다 차지해 여러 번 반복할 여지가 없어진다. 프롬프트는 "Given this document structure and this question, where should we look?" 형태이고, 모델은 `node_id` 목록을 돌려준다.

탐색은 네 단계 루프로 진행된다.

| 단계 | 하는 일 | 실패 시 영향 |
|---|---|---|
| 1. 목차 훑기 | 문서 구조를 파악하고 후보 섹션을 추린다 | 후보에서 빠진 섹션은 이후 단계에서 복구되지 않는다 |
| 2. 섹션 선택 | 답이 있을 법한 노드를 고른다 | 요약을 오해하면 엉뚱한 섹션으로 이동한다 |
| 3. 본문 읽기 | 선택한 노드의 원문을 가져온다 | 노드 경계가 잘못 잡히면 필요한 표가 잘린다 |
| 4. 충분성 판단 | 충분하면 답을 만들고 부족하면 1단계부터 다시 수행한다 | 성급히 충분하다고 판단하면 부분 정보로 답한다 |

모델은 문서 안의 참조를 따라갈 수 있고, 두 섹션의 내용을 동시에 필요로 하는 복합 질문도 인식한다. 모든 단계가 추론 기록으로 남아 어떤 노드를 왜 방문했는지가 드러난다. 저자는 이 점을 두고 retrieval이 더 이상 들여다볼 수 없는 상자가 아니라고 평가한다.

### Appendix G 사례

저자는 VectifyAI의 MCP 연동 시연을 사례로 든다. 질의는 Federal Reserve 연차보고서에서 "total deferred assets"의 값을 묻는 것이다.

| 단계 | 문서에서 벌어지는 일 |
|---|---|
| 본문 위치 | 75쪽에서 82쪽이 이연자산을 다루지만 증감분만 서술하고 총액은 적지 않는다 |
| 참조 위치 | 77쪽에 "Table 5.3 summarizes the income, expenses, and distributions... Appendix G of this report provides more detailed information"이라는 문장이 있다 |
| vector RAG의 처리 | Appendix G는 숫자 표만 있어 질의와 의미적으로 닮지 않는다. vector DB는 이 부록을 무시한다 |
| PageIndex의 처리 | 트리를 읽고 금융 섹션으로 이동해 참조를 만나면 트리 구조를 따라 부록 노드로 넘어가 해당 표를 가져오고 정확한 숫자를 반환한다 |

이 사례 자체는 PageIndex 팀 소개글에 이미 실려 있던 것이다. 이 리뷰가 더한 것은 같은 사례를 파이썬 코드와 벤치마크 수치가 놓인 맥락 안에서 다시 서술한 점이다.

### 저자가 든 나머지 사례 두 가지

Appendix G 외에 저자는 두 가지 사례를 더 들어 같은 진단을 반복한다.

| 사례 | 질문 | vector RAG에서 벌어지는 일 | PageIndex에서 벌어지는 일 |
|---|---|---|---|
| 200쪽 연차보고서 | "What was total net revenue in FY2024 compared to FY2023?" | "operating income"이 60회 이상 등장해 유사도가 평준화되고 정답 항목이 상위 3개에 들지 못한다 | 금융 섹션으로 계층을 따라 이동한 뒤 FY2024와 FY2023 섹션을 오가며 다단계로 추론한다 |
| 표 분해 | 표 안의 특정 값 | 헤더가 14번 조각에, 데이터 행이 15번 조각에 들어가 어느 쪽도 단독으로는 뜻이 통하지 않는다 | 표 전체가 컨텍스트를 유지한 단일 트리 노드로 보존된다 |

첫 번째 사례는 두 회계연도의 값을 비교하라는 질문이라 필요한 데이터가 문서의 서로 다른 위치에 흩어져 있다. 조각 하나를 잘 뽑는 문제가 아니라 두 위치를 오가는 문제이므로, 상위 k개를 한 번에 뽑아 넘기는 구조로는 답에 이르기 어렵다는 것이 저자의 주장이다.

### 파이썬 구현 흐름

저자는 PageIndex Cloud API와 OpenAI API를 함께 쓰는 전체 흐름을 코드로 제시한다. 설치는 `pip install pageindex openai` 한 줄이고, 클라이언트 두 개를 각각 API 키로 초기화한다.

문서를 올리고 트리를 받는 부분은 다음과 같다. 인덱싱이 비동기로 진행되므로 준비 상태를 폴링한다.

```python
doc = pi_client.upload("annual_report_2024.pdf")
doc_id = doc["doc_id"]

while not pi_client.is_retrieval_ready(doc_id):
    print("Still indexing...")
    import time; time.sleep(5)

tree = pi_client.get_tree(doc_id, node_summary=True)["result"]
```

탐색 단계에서 토큰을 아끼는 처리가 이 구현의 핵심이다. `utils.remove_fields(tree.copy(), fields=["text"])`가 트리에서 본문 필드를 떼어내고, 남은 제목과 요약만 프롬프트에 실린다.

```python
response = await openai_client.chat.completions.create(
    model="gpt-4.1",
    messages=[{"role": "user", "content": search_prompt}],
    temperature=0,
    response_format={"type": "json_object"},
)
result = json.loads(response.choices[0].message.content)
return result["node_list"]
```

프롬프트는 모델에게 문서 retrieval 전문가 역할을 주고, 각 노드가 `node_id`와 `title`과 `summary`를 가진다고 알려 주며, 한 섹션이 다른 섹션을 언급하면 그 참조를 따라가라고 지시한다. 반환 형식은 `{"thinking", "node_list"}` 두 키의 JSON으로 고정된다. `thinking` 키가 추론 기록에 해당한다.

함수별 역할은 다음과 같다.

| 함수 | 하는 일 | 반환 |
|---|---|---|
| `pi_client.upload()` | PDF를 Cloud API에 올린다 | `doc_id`를 담은 응답 |
| `pi_client.is_retrieval_ready()` | 인덱싱 완료 여부를 확인한다 | 불린 |
| `pi_client.get_tree()` | 요약이 붙은 트리를 가져온다 | 트리 JSON |
| `find_relevant_nodes()` | 본문을 뺀 트리로 LLM에 질의해 노드를 고른다 | `node_id` 목록 |
| `collect_node_content()` | `utils.flatten_tree()` 후 선택된 노드의 본문을 이어 붙인다 | 제목과 페이지 범위를 헤더로 붙인 문자열 |
| `answer_query()` | 모은 컨텍스트로 답변을 생성한다 | `answer`, `retrieved_nodes`, `context_length` |

답변 생성 프롬프트는 제공된 컨텍스트만 쓰라고 제한하고 구체적인 페이지와 섹션을 인용하라고 지시한다. 이 지시가 추론 기록과 결합해 감사 추적을 만든다.

### MCP와 SDK 배포 경로

저자는 PageIndex를 연결하는 경로를 여러 가지로 나열한다. tool call은 모델이 도구 하나를 실제로 호출하는 한 번의 실행 단위를 뜻한다.

| 경로 | 설정 방식 | 대상 |
|---|---|---|
| HTTP MCP 서버 | `https://api.pageindex.ai/mcp`에 `Authorization: Bearer` 헤더를 붙인다 | Claude와 Cursor |
| 로컬 MCP 서버 | Node.js 18 이상에서 `npx -y @pageindex/mcp`를 실행한다 | 로컬 개발 환경 |
| `.mcpb` 데스크톱 확장 | 번들 파일을 내려받아 더블클릭하면 OAuth까지 자동 처리된다 | Claude Desktop |
| Python SDK | `pip install pageindex` | 서버 사이드 파이프라인 |
| JavaScript/TypeScript SDK | `pageindex-js-sdk` | Node.js 통합과 웹 기반 문서 분석 |
| OpenAI Agents SDK 연동 | `pip install openai-agents` 후 `python3 examples/agentic_vectorless_rag_demo.py` | 에이전트가 스스로 트리를 탐색하는 구성 |

## 결과

### FinanceBench 비교

FinanceBench는 실제 SEC 제출 문서(10-K, 10-Q, 8-K)를 대상으로 정확한 답을 요구하는 금융 문서 QA 벤치마크라고 저자는 소개한다. 저자가 이 벤치마크를 고른 이유는 다단계 추론과 섹션 간 참조와 정확한 수치 답변이 동시에 필요해 retrieval 난도가 높기 때문이다.

| 시스템 | 정답률 | 커버리지 |
|---|---|---|
| Mafin 2.5 (PageIndex 기반) | 98.7% | 100% |
| 전통 vector 기반 RAG | 약 50% | 가변 |
| GPT-4o 직접 응답 | 약 31% | 100% |
| Perplexity | 약 45% | 가변 |

저자는 격차를 약 49%p로 계산하고 "not incremental improvement; it's a different class of result"라고 규정한다. 여기서 %p는 비율 자체가 아니라 두 비율의 차이를 뜻한다.

### 98.7% 주장의 검증

이 수치가 제목이자 이 글의 중심 주장이므로 저자가 무엇을 밝히고 무엇을 밝히지 않는지 항목별로 분리한다. 3자 리뷰는 원 자료의 수치를 조건 없이 옮기면서 부정확해지는 경우가 흔하므로, 이 표의 오른쪽 열에 "밝히지 않는다"가 적힌 항목은 이 글을 근거로 인용할 수 없다.

| 검증 항목 | 이 글이 밝히는 내용 |
|---|---|
| 수치의 실재 | 실재한다. 제목, 도입부, 벤치마크 표, 수치 요약 표, 한계 절, 결론까지 여섯 곳에 나온다 |
| 측정 대상 시스템 | Mafin 2.5. VectifyAI가 PageIndex 위에 만든 금융 분석 에이전트이며 오픈소스 PageIndex 자체가 아니다 |
| 벤치마크 이름 | FinanceBench |
| 데이터셋 | 실제 SEC 제출 문서(10-K, 10-Q, 8-K). 정확한 답을 요구한다 |
| 커버리지 | FinanceBench 데이터셋의 100%에서 시험했다고 적는다 |
| 비교 대상 | 전통 vector RAG 약 50%, GPT-4o 직접 응답 약 31%, Perplexity 약 45% |
| 수치의 출처 | 밝히지 않는다. 인용도 링크도 없다 |
| 측정 주체 | 밝히지 않는다. 저자가 직접 측정했다는 서술은 어디에도 없다 |
| Mafin 2.5가 쓴 모델 | 밝히지 않는다 |
| 채점 방식 | 밝히지 않는다. 정확 일치인지 사람 채점인지 LLM 채점인지 알 수 없다 |
| 문항 수 | 밝히지 않는다. 커버리지 100%만 적고 절대 문항 수는 없다 |
| vector RAG 기준선의 구성 | 밝히지 않는다. 임베딩 모델, chunk 크기, 상위 k값, reranking 사용 여부가 모두 공백이다 |
| 측정 시점 | 밝히지 않는다 |
| 커버리지의 정의 | 밝히지 않는다. Mafin 2.5와 GPT-4o만 100%이고 나머지 두 행은 가변이라 같은 문항 집합에서 잰 값인지 확인할 수 없다 |
| 저자 본인의 유보 | 두 가지를 적는다. "The 98.7% is on one benchmark"이고, 다양한 문서 유형과 모호한 질의에서의 성능은 "hasn't been independently validated to the same degree" |
| 독립 재검증 여부 | 재검증을 거쳤다는 서술이 없다. 저자는 다른 도메인으로의 일반화에 대해서만 독립 검증이 부족하다고 적을 뿐, 98.7% 자체를 누가 검증했는지는 다루지 않는다 |

저자가 실제로 참고 자료 목록에 올린 외부 자료는 VentureBeat의 VectifyAI 공동 창업자 인터뷰와 링크 없는 "Critical takes on Medium" 두 가지뿐이며, 둘 다 벤치마크 수치와 연결되지 않는다.

수치의 출처는 이 글 밖에서 확인된다. 오픈소스 구현체의 README를 대조하면 같은 98.7%가 Mafin 2.5에 귀속되고 `github.com/VectifyAI/Mafin2.5-FinanceBench` 저장소와 `vectify.ai/blog/Mafin2.5` 블로그를 근거로 제시된다. 두 곳 모두 VectifyAI가 운영하는 자산이므로 이 수치는 공급자가 발표한 값이다. 이 글은 그 사실을 적지 않고 수치만 옮긴다.

한편 이 리뷰가 인용하고 확장한다고 밝힌 PageIndex 팀 소개글에는 벤치마크 수치가 하나도 없다. 따라서 98.7%가 그 소개글에서 온 것이 아니라는 점도 확인된다. 이 글은 팀 소개글이 다루지 않은 수치를 어딘가에서 가져왔지만 그 어딘가를 밝히지 않는다.

이 수치를 인용할 때 반드시 붙여야 하는 조건은 세 가지다. 측정 대상이 오픈소스 PageIndex가 아니라 VectifyAI의 금융 에이전트 Mafin 2.5라는 점, 그 값이 공급자가 발표한 수치라는 점, 그리고 독립 재검증 기록이 없다는 점이다. 세 조건을 함께 적을 수 없는 자리라면 수치를 인용하지 않는 편이 정확하다.

이 세 조건 중 저자가 명시하는 것은 하나도 없다. 측정 대상은 도입부와 표에서 서로 다르게 적히고, 공급자 발표라는 사실과 독립 재검증의 부재는 언급되지 않는다. 저자가 다는 유보는 벤치마크가 하나뿐이라는 점과 다른 도메인으로의 일반화가 검증되지 않았다는 점에 한정된다. 3자 리뷰가 원 자료의 수치를 조건 없이 옮기면서 부정확해지는 전형적인 형태이며, 제목이 그 수치를 그대로 내걸고 있어 영향이 가장 크다.

### 저자가 꼽은 성능 요인

저자는 98.7%를 만든 요인을 세 가지로 본다. 세 가지 모두 앞서 정리한 실패 유형과 짝을 이룬다.

| 성능 요인 | 대응하는 실패 유형 | 설명 |
|---|---|---|
| 문서 내 참조 추적 | Cross-References Invisible | "see Appendix G" 같은 참조를 트리 구조로 따라간다. 벡터 유사도에는 이 개념 자체가 없다 |
| 구조 보존 | Chunking Destroys Tables | 금융 표의 헤더와 각주와 셀 관계가 트리 노드 하나로 유지된다 |
| 다단계 추론 | Query-Answer Mismatch | FY2023과 FY2024처럼 데이터가 두 섹션에 나뉜 질문을 반복 루프가 자연스럽게 처리한다 |

### 정량 수치 요약

| 항목 | 값 |
|---|---|
| Mafin 2.5 FinanceBench 정답률 | 98.7% |
| Mafin 2.5 커버리지 | 100% |
| 전통 vector RAG 정답률 | 약 30~50%(도입부), 약 50%(표와 결론) |
| GPT-4o 직접 응답 | 약 31% |
| Perplexity | 약 45% |
| 정답률 격차 | 약 49%p |
| vector RAG 일반 chunk 크기 | 300~500 토큰 |
| 50쪽 문서당 노드 수 | 30~50개 |
| GitHub star(2026년 3월 말) | 2만 3천 개 이상 |
| GitHub fork | 약 2천 개 |
| vector RAG latency | 밀리초 단위 |
| PageIndex latency | "several seconds" |
| PageIndex 출시 | 2025년 9월 |
| TypeScript SDK 출시 | 2026년 초 |
| ChatIndex 출시 | 2026년 1월 |

## 출시 이후 추가된 기능

저자는 2025년 9월 출시 시점에는 없던 기능 다섯 가지를 모아 소개한다. 이 카탈로그가 팀 소개글만 읽어서는 얻을 수 없는 정보이므로, 시점이 다른 두 자료를 함께 두는 이유가 여기에 있다.

| 기능 | 시점 | 무엇이 달라지는가 |
|---|---|---|
| OpenAI Agents SDK 기반 agentic vectorless RAG | 이 글 기준 최신 | self-hosted PageIndex를 Agents SDK에 연결한다. 에이전트에 `get_document()`, `get_document_structure()`, `get_page_content()` 세 가지 tool을 주면 노드를 수동으로 지정하지 않아도 트리 위에서 스스로 판단해 tool call을 수행한다 |
| Vision 기반 vectorless RAG | 이 글 기준 최신 | OCR 단계를 건너뛰고 페이지 이미지를 vision LLM에 직접 넘겨 모델이 본 것으로 트리를 만든다. 대차대조표와 복잡한 격자의 시각 레이아웃, 차트, 병합 셀, 각주 표기가 텍스트로 옮겨지지 않고 보존된다 |
| JavaScript/TypeScript SDK | 2026년 초 | `pageindex-js-sdk`로 Node.js 통합과 웹 기반 문서 분석이 가능해진다 |
| `.mcpb` 데스크톱 확장 | 이 글 기준 최신 | 번들 파일을 내려받아 더블클릭하면 OAuth까지 자동 처리되어 Claude Desktop 확장으로 설치된다 |
| ChatIndex | 2026년 1월 | 같은 트리 인덱싱 방식을 문서가 아니라 긴 대화 이력에 적용한 별도 저장소다. 저자는 이를 팀의 방향을 보여 주는 신호로 읽는다 |

이 다섯 가지 중 vision 기반 모드는 아래 한계 절의 구조 의존 항목과 직접 맞물린다. 트리 품질이 문서 구조에 좌우된다는 약점을 페이지 이미지를 그대로 읽는 방식으로 완화하려는 시도이기 때문이다. 저자는 그럼에도 구조화된 문서가 여전히 가장 잘 맞는 영역이라고 적어, 이 기능을 한계의 해소가 아니라 완화로 평가한다.

## 한계

### 저자가 밝힌 trade-off 다섯 가지

이 절이 이 리뷰의 고유 가치다. 팀 소개글은 다섯 항목 중 어느 것도 다루지 않으므로, PageIndex 도입을 검토할 때 이 표가 반대편 자료가 된다.

| 항목 | 저자의 진단 |
|---|---|
| Latency | "Every retrieval involves multiple LLM calls: read the index, reason about nodes, fetch content, check if it's enough, maybe loop again. Vector RAG returns in milliseconds. PageIndex takes several seconds." 생성 중 retrieval이 함께 진행되어 첫 토큰까지의 시간은 일반 LLM 호출과 비슷할 수 있다는 점은 인정하지만, 총 latency는 여전히 더 높다고 결론짓는다 |
| 비용 | 질의마다 LLM 호출이 여러 번 일어나며 임베딩 조회 한 번과 비교된다. "For high-volume applications, the cost math gets rough fast." |
| 규모 | "PageIndex is phenomenal at deep extraction from a single long document. But if you need to search across 10,000 short documents simultaneously? That's where vector databases earn their keep." |
| 구조 의존 | 트리 인덱스의 품질은 문서 구조를 넘지 못한다. 잘 정리된 SEC 파일링은 좋은 트리를 만들지만 형식이 나쁜 스캔 PDF는 성능이 떨어진다. 비정형 문서용 vision 기반 모드가 있으나 구조화된 문서가 여전히 "sweet spot"이다 |
| 추론 근사 실패 | "Vector RAG fails through embedding approximation. PageIndex fails through reasoning approximation." 모델이 잘못된 섹션으로 이동하거나 요약을 오해하거나 관련 하위 노드를 건너뛸 수 있다. 실패 방식이 다르고 더 해석 가능하며 디버깅하기 쉽다는 점은 인정하지만 "it doesn't vanish"라고 못 박는다 |

다섯 번째 항목이 특히 중요하다. vectorless 방식이 vector 방식의 실패를 없앤 것이 아니라 다른 종류의 실패로 바꿔 놓았다는 뜻이기 때문이다. 저자는 이 전체를 "It's a depth tool, not a breadth tool"로 요약한다.

### 벤치마크 범위의 한계

저자는 98.7%가 하나의 벤치마크에서 나온 값임을 명시한다. FinanceBench는 잘 구조화된 SEC 파일링에서의 금융 QA를 시험하므로, 형식이 어수선하고 여러 도메인에 걸치며 매우 모호한 질의를 다양한 문서 유형에 던졌을 때의 성능은 같은 수준으로 독립 검증되지 않았다고 적는다. 이 유보는 저자가 스스로 단 것이므로, 이 페이지가 덧붙인 검증 표와 방향이 같다.

### 사용 조건별 권고

저자는 어느 쪽을 쓸지를 조건으로 나눈다. 결합 방식도 함께 제시한다.

| 상황 | 권고 |
|---|---|
| 연차보고서, 법률 계약서, 규제 제출 문서, 기술 매뉴얼처럼 길고 구조화된 전문 문서 | PageIndex |
| 오답의 비용이나 규제 위험이 커서 속도보다 정확도가 중요한 경우 | PageIndex |
| 다단계 추론이나 섹션 간 이동이 필요한 질의 | PageIndex |
| 감사 추적이 필요한 규제 산업 | PageIndex. 답변마다 추론 기록과 노드 참조가 따라오는 점을 "gold for regulated industries"로 표현한다 |
| 높은 질의량에서 1초 미만 응답이 필요한 경우 | vector RAG |
| 짧은 문서가 대량으로 있는 corpus 검색 | vector RAG |
| 비정형이거나 대화체인 문서 | vector RAG |
| 90% 정답률로 충분한 용도 | vector RAG |
| 질의당 비용이 최우선 제약인 경우 | vector RAG |
| 큰 corpus에서 특정 문서를 깊이 파야 하는 경우 | 결합 방식. vector 검색으로 관련 문서를 먼저 좁히고 그 문서를 PageIndex에 넘긴다. 저자는 이를 "Best of both worlds"라 부른다 |

### 자료 자체의 내적 모순

같은 글이 같은 값을 다르게 적는 대목이 네 곳 있다. 삭제하지 않고 기록한다.

| 모순 | 내용 |
|---|---|
| 프레임워크와 상용 에이전트의 혼동 | 제목과 도입부는 PageIndex가 98.7%를 달성했다고 적지만 벤치마크 표와 각주는 같은 수치를 Mafin 2.5에 귀속시킨다. Mafin 2.5가 PageIndex 위에 무엇을 더했는지는 이 글에 없다 |
| vector RAG 기준선의 흔들림 | 도입부는 "roughly 30~50%", 벤치마크 표는 약 50%, 수치 요약 표는 약 30~50%, 결론은 약 50%로 적는다. 저자가 계산한 약 49%p 격차는 기준선을 50%로 잡아야만 성립하며 30%를 쓰면 약 69%p가 된다 |
| 커버리지가 다른 행의 병렬 배치 | 표에서 Mafin 2.5와 GPT-4o만 커버리지 100%이고 vector RAG와 Perplexity는 가변이다. 같은 문항 집합에서 잰 값이 아닐 수 있는데 하나의 표에 나란히 놓여 있다 |
| 창업자 호칭 | 같은 글이 Mingtian Zhang을 "VectifyAI co-founder"로도 "VectifyAI founder"로도 적는다 |

### PageIndex 팀 자료와 어긋나는 대목

이 글은 외부 관찰자의 리뷰이므로 팀 자료와 어긋나는 지점 자체가 기록 가치가 있다. 대조 근거는 팀 소개글과 오픈소스 구현체 README의 원문이다.

| 항목 | 이 리뷰(2026년 4월) | PageIndex 팀 자료 |
|---|---|---|
| vector RAG의 일반적 chunk 크기 | 300~500 토큰 | 팀 소개글은 512 또는 1000 토큰으로 적는다 |
| 벤치마크 수치 | 제목과 본문 전면에 98.7%를 배치 | 팀 소개글에는 벤치마크 수치가 하나도 없다 |
| 98.7%의 귀속 | 도입부는 PageIndex에, 표는 Mafin 2.5에 귀속 | 구현체 README는 Mafin 2.5에 귀속시키고 VectifyAI 자체 벤치마크 저장소와 블로그를 링크로 제시한다 |
| 대규모 corpus | 짧은 문서 1만 개를 동시에 검색해야 하면 vector DB가 유리하다며 PageIndex의 한계로 규정 | 구현체 README는 파일 수준 트리 계층인 PageIndex File System으로 문서 하나가 아니라 corpus 전체를 대상으로 추론할 수 있다고 안내한다 |
| 생태계 범위 | ChatIndex만 언급 | 구현체 README는 OpenKB, ChatIndex, ConDB, PageIndex MCP를 함께 나열한다 |
| latency와 비용 | 두 항목을 명시적 한계로 다룬다 | 팀 소개글은 둘 다 다루지 않는다 |
| 실패 유형의 명칭 | Term Frequency Problem, No Multi-Turn Memory처럼 구체 사례 중심 | 팀 소개글은 Semantic Similarity Is Not Equivalent to Relevance, Cannot Integrate Chat History처럼 일반 진술 중심 |

대규모 corpus 항목은 두 자료의 시점 선후를 우리가 보유한 원문만으로 확정할 수 없다. 구현체 README 스냅샷이 이 글보다 나중일 가능성이 있으므로, 저자가 팀 발표를 놓쳤다고 단정하지 않는다.

### 저자 소속 표기에 대한 주의

이 글의 저자 소속은 Medium byline에 적힌 "AI Engineer @IBM"이 근거의 전부다. 본문 어디에도 IBM 업무와의 연결이나 사내 실험은 나오지 않으며, 이 글은 IBM의 결과물이 아니다. 저자를 소개할 때는 본인이 적은 byline이라는 점을 함께 밝히는 것이 정확하다.

## 저자의 전망

저자는 이 변화를 PageIndex 하나의 이야기로 두지 않고 retrieval 전반의 방향 전환으로 읽는다. 닮은 것을 가져오는 수동 retrieval에서 어디를 볼지 판단하는 능동 retrieval로 옮겨 간다는 것이다.

근거로 드는 선례는 코드 영역이다. Claude Code와 Cursor는 벡터 기반 코드 retrieval 대신 코드베이스를 능동적으로 탐색하는 방식을 쓴다. 저자는 문서 retrieval도 같은 경로를 따를 것이라는 PageIndex 팀의 전망에 "at least for the structured-document use case"라는 단서를 붙여 동의한다.

동시에 저자는 vector DB의 퇴장을 주장하지 않는다. "Vector databases aren't going anywhere"라고 적고 속도와 비용의 이점이 넓은 문제 영역에 맞는다고 인정한다. 추론 기반 retrieval이 더 나은 선택이 되는 범위는 좁고 분명하다. 정확성과 투명성과 깊은 문서 이해를 양보할 수 없는 용도, 즉 금융 감사와 법률 증거 조사와 의료 기록과 규제 준수다. 그 범위에서는 "reasoning-based retrieval isn't just an alternative. It's a fundamentally better fit"라고 결론짓는다.

저자가 스스로 밝힌 결론은 다섯 항목으로 나뉜다.

| 결론 항목 | 내용 |
|---|---|
| 문제 규정 | chunking의 취약성, 문서 내 참조를 따라가지 못하는 문제, 용어 빈도로 인한 평준화, 다중 턴 메모리 손실은 더 나은 임베딩이나 reranking으로 고쳐지지 않는 구조 문제다 |
| 방식 전환 | 관련성은 유사도가 아니라 추론을 요구한다. in-context 트리 인덱스가 능동적이고 해석 가능한 문서 탐색을 가능하게 한다 |
| 적용 범위 | 길고 구조화된 전문 문서에서 강점이 나타나며, 전통 방식은 약 50%에서 더 오르지 않는다 |
| trade-off | 질의당 latency와 비용이 높다. 짧은 문서를 대량으로 검색하거나 비정형 콘텐츠를 다루는 용도에는 맞지 않는다 |
| 방향 | 능동적 retrieval로 향하는 넓은 흐름의 일부이며 규제 산업에 특히 잘 맞는다 |

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| Mafin 2.5 | VectifyAI가 PageIndex 위에 만든 금융 분석 에이전트. 이 글이 내세우는 98.7%의 실제 측정 대상이며 오픈소스 PageIndex와 구분해야 한다 |
| FinanceBench | 실제 SEC 제출 문서(10-K, 10-Q, 8-K)를 대상으로 정확한 답을 요구하는 금융 문서 QA 벤치마크 |
| in-context index | 외부에 정적으로 저장되는 vector DB와 대비되는 개념으로, JSON 트리가 추론 중 LLM의 활성 컨텍스트 안에 상주해 모델이 직접 탐색하고 판단할 수 있는 인덱스 |
| agentic vectorless RAG | self-hosted PageIndex를 OpenAI Agents SDK에 연결한 모드. 에이전트에 tool 세 가지를 주면 노드를 수동 지정하지 않아도 트리 위에서 스스로 탐색한다 |
| 추론 근사 실패 | vector RAG가 임베딩 근사로 실패한다면 PageIndex는 추론 근사로 실패한다는 저자의 명제. 잘못된 섹션 선택, 요약 오해, 관련 하위 노드 누락이 사례다 |
| 추론 기록 | 어떤 노드를 왜 방문했는지가 단계마다 남는 기록. 감사 추적이 필요한 규제 산업에서 이 글이 강조하는 이점이다 |

## 관련 페이지

- [[database/zhang-2025-pageindex-vectorless-reasoning-rag]]: PageIndex 팀이 2025년 9월에 쓴 소개글로 이 리뷰의 대조 상대다. 개념과 설계 의도의 원본이며 Appendix G 사례와 in-context index와 vector RAG의 다섯 가지 한계가 여기서 먼저 정의됐다. 벤치마크 수치는 그 글에 없으므로 98.7%의 출처가 아니다.
- [[database/vectifyai-pageindex]]: 이 글의 코드 예제가 사용하는 오픈소스 구현체다. 98.7%가 Mafin 2.5에 귀속되고 VectifyAI 자체 자산을 근거로 제시된다는 사실, 그리고 대규모 corpus를 다루는 PageIndex File System의 존재를 이 페이지에서 확인할 수 있다.
- [[database/geeksforgeeks-2026-vectorless-rag-pageindex]]: 같은 PageIndex Cloud API를 다루는 튜토리얼로 이 글의 파이썬 예제와 짝을 이룬다. 사용법 중심이라 이 페이지의 검증 관점과는 성격이 다르다.
- [[database/sguys99-langchain-study-vectorless-rag]]: Cloud API 없이 직접 구현한 한글 학습용 코드다. SaaS 경로를 쓰는 이 글의 예제와 비교하면 어디까지가 프레임워크의 기여이고 어디까지가 API 서비스의 기여인지 가늠할 수 있다.
