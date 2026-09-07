---
title: "Vectorless RAG: PageIndex"
type: article
year: 2026
category: database
raw_path: raw/articles/geeksforgeeks-2026-vectorless-rag-pageindex.md
raw_filename: "geeksforgeeks-2026-vectorless-rag-pageindex.md"
source_collection: external
author: "GeeksforGeeks (no byline)"
url: "https://www.geeksforgeeks.org/artificial-intelligence/vectorless-rag-pageindex/"
publisher: "GeeksforGeeks"
publication_date: "2026-03-09 (Last Updated)"
tags: [rag, vectorless-rag, pageindex, tree-search, tutorial, langchain, gemini, deepseek-r1, geeksforgeeks]
---

## 한 줄 요약 (One-line Summary)

GeeksforGeeks가 2026-03-09에 마지막으로 갱신한 무서명 입문 튜토리얼로, PageIndex Cloud API와 LangChain과 Gemini 2.5 Flash를 조합해 PDF 한 편을 색인하고 질의하는 Python 코드 10단계를 제시한다. 개념부(vector RAG의 한계 7가지, vectorless RAG의 워크플로 7단계)와 실습부(코드 10단계)와 정리부(5개 항목 비교표, 한계 5가지)로 구성되며, 벤치마크 수치와 정량 측정은 한 건도 제시하지 않는다.

## 1. 자료 정보 (Document Information)

- 매체: GeeksforGeeks, Artificial Intelligence 섹션의 튜토리얼 문서
- 저자: 개별 byline 없음. 원문 상단에 표기된 것은 publisher와 최종 갱신일뿐이다
- URL: <https://www.geeksforgeeks.org/artificial-intelligence/vectorless-rag-pageindex/>
- canonical URL: <https://www.geeksforgeeks.org/vectorless-rag-pageindex/>
- 최종 갱신: 2026-03-09
- 수집 시점: 2026-06-02. CLAUDE.md rule #1의 자료 수집 예외를 적용해 본문을 그대로 Markdown으로 변환해 저장했다
- 분량: 산문 약 1,300단어, Python 코드 블록 10개, 마크다운 표 1개
- 장르: hands-on 입문 튜토리얼. 신규 연구나 측정 결과가 아니라 PageIndex를 처음 호출해 보는 독자를 위한 절차 안내다
- 원문에 이미지와 도식이 없어 figures 키를 두지 않는다

이 글은 PageIndex의 개발사나 라이선스나 저장소 주소를 한 번도 언급하지 않는다. 사용하는 것은 `pip install pageindex`로 설치되는 패키지와 API key 하나뿐이며, 자체 호스팅과 클라우드 서비스의 구분도 다루지 않는다.

## 2. 주요 기여 (Key Contributions)

1. vectorless RAG를 하나의 범주명으로 제시한다. 임베딩과 vector database를 쓰지 않고 문서 구조와 LLM 추론만으로 retrieval을 수행하는 방식을 가리키며, PageIndex를 그 대표 구현으로 지목한다.
2. vector 기반 RAG의 구조적 한계를 7개 항목으로 나열한다. 질의와 문서 표현의 불일치, similarity와 relevance의 괴리, 고정 크기 chunking의 문맥 절단, 다단계 추론 부재, 대화 이력 미반영, 문서 내부 상호 참조 처리 실패, 인프라 비용이다.
3. vectorless RAG의 처리 흐름을 7단계 워크플로로 정리한다. 문서 분할, 트리 구축, 질의 이해, 계층적 탐색, 반복 페이지 탐색, 컨텍스트 조립, 답변 생성 순이다.
4. PageIndex Cloud API의 호출 순서를 실행 가능한 코드로 노출한다. 클라이언트 초기화, 문서 제출, 색인 완료 폴링, 트리 조회, 질의 제출, retrieval 폴링, 응답 본문 추출까지 이어진다.
5. LangChain의 `ChatGoogleGenerativeAI`로 Gemini 2.5 Flash를 붙이고, 검색된 컨텍스트만 쓰도록 강제하는 grounding 프롬프트를 제시한다.
6. vector RAG와 vectorless RAG를 5개 항목으로 비교하는 표를 제공한다. 정성 비교이며 측정값은 없다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 vectorless RAG의 정의와 특성

글이 내린 정의는 다음과 같다. vectorless RAG는 vector 임베딩에 의존하지 않고 문서에서 관련 정보를 찾아오는 retrieval-augmented generation 방식이며, 내용을 색인된 페이지나 구조화된 섹션으로 조직한 뒤 선택된 컨텍스트를 언어 모델에 넘긴다.

글이 내세운 특성은 4가지다.

| 특성 | 글의 서술 |
|---|---|
| Eliminates Embeddings and Vector Databases | dense similarity search 대신 문서 구조와 LLM 주도 추론을 쓴다 |
| Avoids Artificial Chunking | 페이지와 heading 같은 자연 구획을 보존해 문맥 연속성과 논리 구조를 유지한다 |
| Human-like Retrieval | 트리 색인을 한 단계씩 따라 내려가며, 전문가가 자료를 찾는 방식과 유사하다 |
| Transparent Retrieval Process | 근사 의미 매칭에 기대지 않고 추적 가능하고 해석 가능한 결정을 낸다 |

PageIndex는 두 단계로 동작하는 프레임워크로 소개된다. 첫째로 문서의 트리 구조 색인을 생성하고, 둘째로 그 트리를 탐색하며 추론 기반 retrieval을 수행한다.

### 3.2 vector 기반 RAG의 한계 7가지

| # | 항목 | 글의 근거 |
|---|---|---|
| 1 | Query–Knowledge Mismatch | 사용자 질의는 의도를 표현하는데 문서는 특정 문구로 쓰여 있어, 가장 가까운 임베딩이 가장 관련 있는 대상이라는 전제가 흔들린다 |
| 2 | Similarity Does Not mean Relevance | 법률이나 기술 문서에서는 의미가 비슷해 보이는 구절이 많지만 실제 관련성은 결정적으로 다르다 |
| 3 | Hard Chunking Breaks Context | 고정 크기 chunking이 문장과 표와 섹션을 잘라 의미를 조각내고 문맥 완결성을 떨어뜨린다 |
| 4 | Limited Multi-Step Reasoning | retrieval이 한 번의 similarity 검색으로 끝나 문서 구조를 단계적으로 탐색하지 못한다 |
| 5 | No Awareness of Conversation History | 질의마다 독립적으로 임베딩되어 앞선 질문과 답변을 반영하기 어렵다 |
| 6 | Poor Handling of In-Document References | "see Appendix G"나 "refer to Table 5.3" 같은 참조는 대상 내용과 의미가 닮지 않아 놓치기 쉽다 |
| 7 | High Infrastructure and Computational Cost | 임베딩 모델과 vector 저장소와 similarity 검색 시스템이 모두 필요해 운영 복잡도와 자원 사용이 커진다 |

### 3.3 vectorless RAG 워크플로 7단계

| # | 단계 | 하는 일 | 글이 붙인 세부 |
|---|---|---|---|
| 1 | Document Segmentation | 임의 chunk 대신 의미 단위 페이지로 분할한다 | heading과 subheading과 주제 전환을 기준으로 나누고, 페이지 하나가 하나의 분명한 아이디어를 담게 하며, 문장이나 개념을 중간에서 자르지 않는다 |
| 2 | PageIndex Tree Construction | 분할 결과를 트리로 조직한다 | root는 문서 전체, 중간 노드는 섹션과 하위 섹션, 말단 노드는 개별 페이지를 나타낸다 |
| 3 | Query Understanding | 질문의 의도를 먼저 파악한다 | 중요한 키워드와 개념을 식별하고, 답이 있을 만한 섹션을 예측하고, 탐색할 branch를 고른다 |
| 4 | Hierarchical Reasoning-Based Retrieval | 상위에서 하위로 단계적으로 좁힌다 | 넓은 섹션에서 출발해 점차 구체적인 하위 섹션으로 내려가고, 무관한 섹션은 건너뛴다 |
| 5 | Iterative Page Exploration | 반복 추론 루프로 결과를 다듬는다 | 선택한 페이지를 읽고, 답이 충분한지 평가하고, 필요하면 더 깊이 들어가거나 옆으로 이동하거나 되돌아간다 |
| 6 | Context Assembly | 선별된 페이지만 모아 넘긴다 | 선택된 페이지를 결합하고, 불필요한 정보를 넣지 않고, 컨텍스트를 작고 집중된 상태로 유지한다 |
| 7 | Answer Generation | 선별 페이지만으로 답을 만든다 | 선택된 페이지의 정보를 종합해 명확하고 구조화된 응답을 만들고, 답이 문서 내용과 일치하도록 한다 |

### 3.4 구현 코드 10단계

| 단계 | 제목 | 핵심 호출 | 반환과 부수 효과 |
|---|---|---|---|
| 1 | Install Required Library | `pip install pageindex`, `pip install langchain langchain-google-genai google-generativeai` | 버전 고정 없음 |
| 2 | Import Required Libraries | `os`, `json`, `requests`, `asyncio`, `from pageindex import PageIndexClient`, `import pageindex.utils as utils` | 글은 `os`와 `json`과 `requests`를 파일 처리와 PDF 다운로드용, `asyncio`와 `time`을 비동기 처리와 폴링용, `PageIndexClient`를 핵심 클라이언트, `pageindex.utils`를 트리 출력 유틸로 설명한다 |
| 3 | Initialize PageIndex Client | `PageIndexClient(api_key=PAGEINDEX_API_KEY)` | API key는 PageIndex에서 발급받으라는 안내 한 줄뿐이다 |
| 4 | Download the PDF Document | `requests.get("https://arxiv.org/pdf/2501.12948.pdf")` | `../data` 아래에 파일명을 그대로 저장한다 |
| 5 | Submit Document to PageIndex | `pi_client.submit_document(pdf_path)` | `doc_info["doc_id"]`를 꺼내 이후 호출의 식별자로 쓴다 |
| 6 | Indexing | `pi_client.is_retrieval_ready(doc_id)`, `pi_client.get_tree(doc_id, node_summary=True)` | 색인은 비동기이므로 5초 간격으로 최대 30회 폴링한다. 완료되면 `['result']`를 꺼내 `utils.print_tree(tree)`로 출력하고, 실패하면 `tree = None`으로 둔다 |
| 7 | Initialize the LLM | `ChatGoogleGenerativeAI(model="gemini-2.5-flash", temperature=0.3)` | `os.environ["GOOGLE_API_KEY"]`로 키를 주입한다 |
| 8 | Define Retrieval Function | `pi_client.submit_query(doc_id, query)`, `pi_client.get_retrieval(retrieval_id)` | 질의를 제출해 `retrieval_id`를 받고, `status`가 `completed`가 될 때까지 1초 간격으로 폴링하며, `failed`면 빈 리스트를 돌려준다 |
| 9 | Build Vectorless RAG Pipeline | `llm.invoke(prompt)` | 컨텍스트를 두 줄 개행으로 이어 붙이고 grounding 프롬프트에 끼워 넣는다. 컨텍스트가 비면 "No relevant context found."를 반환한다 |
| 10 | Run Query and Generate Final Answer | `vectorless_rag(query, doc_id)` | 질의는 "What is the main contribution of this paper?"이고 답변 본문을 출력한다 |

### 3.5 응답 구조와 컨텍스트 추출

Step 8의 추출 코드는 3중 중첩 구조를 순회한다. `retrieval["retrieved_nodes"]`에서 앞의 `top_k`개(기본값 3)를 잘라내고, 각 노드의 `relevant_contents` 리스트를 돌고, 그 안의 각 group 리스트를 다시 돌아 `item["relevant_content"]` 문자열을 모은다. 빈 값은 건너뛴다.

| 계층 | 키 | 형태 | 코드가 하는 일 |
|---|---|---|---|
| 1 | `retrieved_nodes` | 리스트 | `[:top_k]`로 앞에서부터 3개만 취한다 |
| 2 | `relevant_contents` | 리스트의 리스트 | `node.get("relevant_contents", [])`로 꺼내 group 단위로 순회한다 |
| 3 | `relevant_content` | 문자열 | `item.get("relevant_content")`가 값을 가질 때만 컨텍스트에 넣는다 |

노드 식별자와 페이지 번호와 점수는 코드가 읽지 않으며, 최종 프롬프트에는 본문 문자열만 남는다.

### 3.6 폴링 설계

색인 폴링과 retrieval 폴링은 같은 글 안에서 다르게 짜여 있다.

| 항목 | 색인 폴링 (Step 6) | retrieval 폴링 (Step 8) |
|---|---|---|
| 판정 함수 | `is_retrieval_ready(doc_id)` 불리언 | `get_retrieval(retrieval_id)["status"]` 문자열 |
| 간격 | 5초 | 1초 |
| 상한 | `max_retries = 30` | 없음. `while True` 무한 루프 |
| 실패 처리 | 타임아웃 메시지 출력 후 `tree = None` | `status == "failed"`면 빈 리스트 반환 |
| 예외 처리 | 없음 | 없음 |

`status`가 `completed`도 `failed`도 아닌 동안 루프가 계속되므로 진행 중을 뜻하는 값이 하나 더 있다는 것은 코드에서 추론되지만, 그 값의 이름을 글은 밝히지 않는다.

### 3.7 grounding 프롬프트

Step 9의 프롬프트는 역할 지정과 근거 제한과 미발견 응답 문구를 담는다. 모델을 research assistant로 규정하고, 아래 컨텍스트만 사용해 답하라고 지시하며, 답을 찾지 못하면 "Not found in document."라고 답하게 한다. 컨텍스트와 질문은 프롬프트 하단에 각각 라벨을 달고 삽입된다.

### 3.8 예제 질의와 응답

대상 문서는 arXiv 2501.12948이다. 글은 이를 "a research paper from ArXiv"라고만 부르고 제목을 밝히지 않지만, 출력된 답변 본문이 DeepSeek-R1과 DeepSeek-R1 Dev1, Dev2, Dev3를 명시하므로 대상이 DeepSeek-R1 기술 보고서임이 응답에서 확인된다.

출력된 답변은 순수 강화학습으로 LLM의 추론 능력을 끌어올려 사람이 주석한 추론 경로가 필요 없다는 점, 최소한의 사람 라벨링으로 자기 진화를 통해 추론 능력이 발달한다는 점, DeepSeek-R1의 다단계 파이프라인과 세 가지 개발 버전이 주요 기여라는 점을 담는다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

이 글은 정량 결과를 보고하지 않는다. 정확도, 지연, 비용, 토큰 사용량, 색인 소요 시간 중 어느 것도 측정하지 않으며 외부 벤치마크 수치도 인용하지 않는다. 검증 가능한 산출물은 5개 항목 정성 비교표와 예제 질의 1건의 응답 본문뿐이다.

| Feature | Vector RAG | Vectorless RAG |
|---|---|---|
| Retrieval Method | 임베딩 similarity 검색을 쓴다 | 논리적 추론과 트리 탐색을 쓴다 |
| Document Representation | 텍스트를 고차원 vector로 변환한다 | 텍스트를 계층적 페이지 트리로 조직한다 |
| Search Process | 한 단계로 top-k 유사 chunk를 가져온다 | 큰 섹션을 먼저 훑고 이어서 정확한 정보로 좁힌다 |
| Context Usage | 느슨하게 관련된 chunk가 섞일 수 있다 | 논리적으로 관련된 페이지만 고른다 |
| Computation Cost | 임베딩 생성과 저장이 필요하다 | vector 저장이 필요 없다 |

비교표의 다섯 행은 모두 방식 서술이며 측정 결과가 아니다. Computation Cost 행은 저장 비용만 다루고 트리 탐색이 유발하는 LLM 호출 비용은 다루지 않는다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

### 5.1 글이 명시한 한계 5가지

1. 문서 구조 품질에 크게 의존한다. heading이 부실하면 효과가 떨어진다.
2. LLM의 추론 능력에 의존한다. 잘못된 branch를 고를 수 있다.
3. 단계별 탐색 때문에 더 느려질 수 있다.
4. 서로 무관한 다수 문서를 가로질러 검색하는 데는 덜 효과적이다.
5. 문서가 비구조적이거나 정리가 나쁘면 성능이 떨어질 수 있다.

### 5.2 글 자체의 내적 모순

| # | 모순 | 대조 위치 |
|---|---|---|
| 1 | 도입부는 vectorless RAG가 "fast keyword-based retrieval"을 가능하게 한다고 서술하지만, 이후 본문과 비교표는 retrieval이 키워드나 similarity가 아니라 논리적 추론과 트리 탐색으로 이루어진다고 서술한다 | Introduction 첫 문단 대 비교표 Retrieval Method 행 |
| 2 | 도입부는 retrieval이 빠르다고 서술하지만 한계 절은 단계별 탐색 때문에 더 느릴 수 있다고 서술한다 | Introduction 대 Limitations 3번 |
| 3 | Step 2는 `asyncio`를 비동기 처리와 폴링용으로 import한다고 설명하지만 Step 3부터 Step 10까지 어떤 코드도 `asyncio`를 쓰지 않는다. 폴링은 동기 `time.sleep`으로 구현된다. `json`도 import만 하고 쓰이지 않는다 | Step 2 대 Step 6, Step 8 |
| 4 | Step 2가 import 목록을 정리했는데도 Step 6에서 `import time`을, Step 7에서 `import os`를 다시 선언한다 | Step 2 대 Step 6, Step 7 |
| 5 | Transparent Retrieval Process를 특성으로 내세우지만 Step 8의 추출 코드는 `relevant_content` 문자열만 남기고 노드 식별자와 페이지 번호와 판단 근거를 버린다. 추적 가능성을 보여주는 출력이 없다 | Key Characteristics 대 Step 8 |
| 6 | vector RAG의 한계로 대화 이력 미반영을 지적하지만 데모는 단일 질의 `llm.invoke` 한 번이며 이력을 넘기는 코드가 없다. vectorless가 그 한계를 어떻게 푸는지 시연하지 않는다 | Limitation 5번 대 Step 9, Step 10 |
| 7 | Step 6에서 `get_tree`로 트리를 받아 출력하지만 Step 8부터 Step 10까지 `tree` 변수를 다시 쓰지 않는다. 트리는 화면 출력용이고 실제 retrieval은 `submit_query` 뒤 서버에서 일어난다 | Step 6 대 Step 8 |
| 8 | 색인 폴링에는 `max_retries = 30` 상한이 있는데 retrieval 폴링은 `while True`로 상한이 없다. 같은 튜토리얼 안에서 견고성 기준이 다르다 | Step 6 대 Step 8 |
| 9 | Computation Cost 항목의 답이 저장 비용에 한정된다. 같은 글이 단계별 탐색을 지연 요인으로 지적했으므로 연산 비용은 그 탐색이 유발하는 LLM 호출을 포함해야 한다 | 비교표 대 Limitations 3번 |
| 10 | Step 8 설명은 "top matching nodes"에서 본문을 모은다고 하지만 코드는 서버가 돌려준 순서를 그대로 `[:top_k]`로 자를 뿐이다. 정렬 기준을 글이 설명하지 않는다 | Step 8 설명 대 Step 8 코드 |

### 5.3 글이 밝히지 않는 API 스펙

| 항목 | 글에서 확인되는 것 | 확인되지 않는 것 |
|---|---|---|
| 엔드포인트 | 없음. SDK 메서드만 노출된다 | 기반 URL, 경로, HTTP 메서드 |
| 인증 | 생성자 인자 `api_key` | 전송 헤더 이름, 토큰 만료, 키 회전, 발급 절차 |
| 요금 | 없음 | 과금 단위, 무료 한도, 색인과 질의의 가격 차이 |
| rate limit | 없음 | 초당 또는 분당 호출 상한, 초과 시 동작 |
| 파일 형식 | PDF 1종만 시연 | 다른 형식 지원 여부, 페이지 수 상한, 파일 크기 상한 |
| 상태 값 | `completed`, `failed` | 진행 중 상태의 이름, 그 밖의 상태 값 |
| 에러 처리 | 없음. `try` 블록이 한 번도 나오지 않는다 | HTTP 상태 코드, 오류 응답 스키마, 재시도 권장 정책 |
| 응답 스키마 | `doc_id`, `retrieval_id`, `status`, `retrieved_nodes`, `relevant_contents`, `relevant_content`, `result` | 노드 스키마, 점수 필드, `node_summary=True`가 추가하는 필드 |
| 데이터 보존 | 없음 | 업로드 문서의 저장 기간, 삭제 방법 |
| SDK 버전 | `pip install pageindex`로 버전 고정 없이 설치한다 | 호환 버전 범위, 클라우드 클라이언트와 자체 호스팅 패키지의 관계 |

### 5.4 매체 특성에서 오는 주의

`pip install pageindex`로 설치한 패키지에서 `PageIndexClient`를 가져와 API key로 클라우드에 문서를 올리는 구성이라, 같은 이름의 오픈소스 프로젝트와 유료 클라우드 서비스가 서로 어떤 관계인지 글만 보고는 알 수 없다. 자체 호스팅으로 같은 결과를 얻을 수 있는지, 클라우드에서만 되는 부분이 무엇인지도 다루지 않는다.

한계 4번은 서로 무관한 다수 문서 검색에 덜 효과적이라고 쓰면서 이를 방식 자체의 성질처럼 제시한다. 이 서술이 PageIndex 프로젝트가 별도로 제시하는 corpus 규모 확장과 어긋나는지는 저장소 자료와 대조해야 판단할 수 있다.

한계 1번과 5번은 문서 구조 품질을 원인으로 지목하지만, PDF에서 구조를 뽑아내는 파싱 품질은 언급하지 않는다. 구조가 원래 좋은 문서라도 파서가 계층을 잃으면 같은 증상이 나온다는 점이 다루어지지 않는다.

### 5.5 후속 확인 과제

- 색인 1회와 질의 1회에 드는 실제 시간과 비용 측정
- vector RAG 파이프라인과 같은 문서 같은 질의로 맞붙인 정확도 비교
- 다중 문서 corpus에서의 동작 확인
- 트리 품질이 나쁜 문서에서의 저하 정도 측정
- 응답에 노드 식별자와 페이지 번호를 함께 남기는 추적 가능한 파이프라인 구성

## 6. 관련 연구 (Related Work)

이 글은 참고문헌 목록이나 외부 인용을 두지 않는다. 본문에 등장하는 외부 고유명사는 다음이 전부다.

| 이름 | 글에서의 역할 |
|---|---|
| PageIndex | 이 글이 사용하는 vectorless RAG 프레임워크이자 Python 패키지 이름 |
| LangChain | Gemini를 감싸는 래퍼로 `langchain-google-genai` 패키지를 통해 쓰인다 |
| Gemini 2.5 Flash | 답변 생성 모델. `temperature=0.3`으로 설정한다 |
| arXiv 2501.12948 | 예제 대상 문서. 응답 본문에서 DeepSeek-R1 기술 보고서로 확인된다 |

vector database, embedding model, similarity search는 대조군으로만 언급되며 특정 제품명은 나오지 않는다. graph 기반 RAG, GraphRAG, CRAG, Self-RAG 같은 인접 계열은 한 번도 언급되지 않으므로 이 글이 그 계열에 무엇을 귀속시켰는지 따질 대목은 없다.

## 7. 용어집 (Glossary)

- Vectorless RAG: 임베딩과 vector database를 쓰지 않고 문서 구조와 LLM 추론으로 retrieval을 수행하는 RAG 방식을 가리키는 이 글의 범주명이다.
- PageIndex: 문서를 트리 색인으로 바꾸고 그 트리를 탐색해 retrieval하는 프레임워크. 이 글은 클라우드 API 클라이언트 `PageIndexClient`로 사용한다.
- Tree structure index: root가 문서 전체, 중간 노드가 섹션과 하위 섹션, 말단 노드가 개별 페이지인 계층 색인이다.
- Hierarchical Reasoning-Based Retrieval: 넓은 섹션에서 시작해 구체적인 하위 섹션으로 내려가며 무관한 가지를 건너뛰는 탐색 단계다.
- Iterative Page Exploration: 페이지를 읽고 충분성을 평가한 뒤 더 깊이 가거나 옆으로 가거나 되돌아가는 반복 루프다.
- Hard chunking: 고정 크기로 문서를 자르는 vector RAG 전처리. 문장과 표와 섹션을 임의 지점에서 절단한다.
- Query–Knowledge Mismatch: 질의는 의도를 담고 문서는 특정 문구로 쓰여 있어 생기는 표현 격차다.
- Grounding 프롬프트: 주어진 컨텍스트만 근거로 답하고 찾지 못하면 정해진 문구로 답하게 하는 제약 프롬프트다.
- `retrieval_id`: 질의 제출 시 서버가 돌려주는 식별자로, 이후 폴링에서 상태와 결과를 조회하는 열쇠다.
- `is_retrieval_ready`: 문서 색인이 질의를 받을 준비가 되었는지 묻는 불리언 판정 함수다.
