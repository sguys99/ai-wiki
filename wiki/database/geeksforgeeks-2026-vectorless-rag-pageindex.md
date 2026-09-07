---
title: "Vectorless RAG: PageIndex"
type: article
year: 2026
category: database
raw_path: raw/articles/geeksforgeeks-2026-vectorless-rag-pageindex.md
raw_filename: "geeksforgeeks-2026-vectorless-rag-pageindex.md"
source: geeksforgeeks-2026-vectorless-rag-pageindex.md
source_collection: external
author: "GeeksforGeeks (no byline)"
url: "https://www.geeksforgeeks.org/artificial-intelligence/vectorless-rag-pageindex/"
publisher: "GeeksforGeeks"
publication_date: "2026-03-09 (Last Updated)"
tags: [rag, vectorless-rag, pageindex, tree-search, tutorial, langchain, gemini, deepseek-r1, geeksforgeeks]
---

## 요약

이 페이지는 GeeksforGeeks가 2026-03-09에 마지막으로 갱신한 무서명 튜토리얼을 다룬다. PDF 한 편을 PageIndex 클라우드 서비스에 올려 트리 색인을 만들고, 그 색인을 통해 질의한 결과를 Gemini 2.5 Flash에 넘겨 답을 만드는 Python 코드 10단계가 본문의 절반을 차지한다.

글의 구성은 세 부분이다. 앞부분은 vector 기반 RAG가 부딪히는 한계 7가지와 vectorless RAG의 처리 흐름 7단계를 개념으로 설명하고, 가운데는 실행 가능한 코드 10단계를 제시하며, 뒷부분은 두 방식을 5개 항목으로 비교한 표와 한계 5가지로 마무리한다.

이 자료의 가치는 측정 결과가 아니라 호출 순서에 있다. 글에는 정확도도 지연도 비용도 없고 외부 벤치마크 인용도 없으므로, 성능을 근거로 삼을 자료가 아니라 클라우드 API를 처음 호출해 보는 절차서로 읽어야 한다.

읽을 때 주의할 점이 하나 있다. 이 글은 PageIndex의 개발사도 라이선스도 저장소 주소도 언급하지 않고, `pip install pageindex`로 설치한 패키지에서 API key를 받는 클라이언트를 꺼내 쓴다. 오픈소스 저장소와 유료 클라우드 서비스가 어떤 관계인지는 [[database/vectifyai-pageindex]]와 [[database/zhang-2025-pageindex-vectorless-reasoning-rag]]에서 확인해야 한다.

## 배경

### vector 기반 RAG의 전제

vector 기반 RAG는 문서를 고정 크기 chunk로 자르고, 각 chunk를 임베딩으로 바꿔 vector database에 넣은 뒤, 질의 임베딩과 가까운 chunk를 골라 모델에 넘긴다. 임베딩은 텍스트를 고정 차원 벡터로 바꾼 표현이며, 가까움은 벡터 사이의 similarity로 계산된다.

이 구조는 가장 가까운 임베딩이 가장 관련 있는 내용이라는 전제 위에 서 있다. 글은 그 전제가 길고 복잡하며 구조가 강한 문서에서 흔들린다고 주장하고, 흔들리는 지점을 7개로 나열한다.

### 글이 지목한 한계 7가지

| # | 항목 | 무엇이 문제인가 | 어떤 문서에서 두드러지는가 |
|---|---|---|---|
| 1 | Query–Knowledge Mismatch | 사용자 질의는 의도를 담고 문서는 특정 문구로 쓰여 있어, 표현이 어긋나면 가까운 임베딩이 관련 있는 내용을 가리키지 않는다 | 질문 방식이 문서 어휘와 다른 모든 문서 |
| 2 | Similarity Does Not mean Relevance | 의미가 비슷해 보이는 구절이 많아도 실제 관련성은 결정적으로 다를 수 있다 | 법률 문서, 기술 문서 |
| 3 | Hard Chunking Breaks Context | 고정 크기 분할이 문장과 표와 섹션을 잘라 의미를 조각내고 문맥 완결성을 떨어뜨린다 | 표와 절 구조가 촘촘한 문서 |
| 4 | Limited Multi-Step Reasoning | retrieval이 한 번의 similarity 검색으로 끝나 문서 구조를 단계적으로 탐색하지 못한다 | 답이 여러 절에 흩어진 문서 |
| 5 | No Awareness of Conversation History | 질의가 매번 독립적으로 임베딩되어 앞선 질문과 답변을 반영하기 어렵다 | 여러 차례 주고받는 대화 |
| 6 | Poor Handling of In-Document References | "see Appendix G"나 "refer to Table 5.3" 같은 참조는 대상 내용과 의미가 닮지 않아 놓치기 쉽다 | 부록과 표를 상호 참조하는 문서 |
| 7 | High Infrastructure and Computational Cost | 임베딩 모델과 vector 저장소와 similarity 검색 시스템이 모두 필요해 운영 복잡도와 자원 사용이 커진다 | 모든 배포 환경 |

7개 항목의 성격은 서로 다르다. 1번과 2번은 similarity라는 척도 자체를 겨냥하고, 3번은 전처리를, 4번과 5번은 검색 절차의 단발성을, 6번은 문서 내부 링크 구조를, 7번은 운영 비용을 겨냥한다. 따라서 이 목록은 하나의 결함이 아니라 서로 독립적인 다섯 계열의 불만을 모은 것이다.

### 이 글이 다루는 대조군의 범위

이 글의 대조군은 vector 기반 RAG 하나뿐이다. graph 기반 RAG나 재검색 단계를 덧붙인 변형처럼 인접 계열은 한 번도 언급되지 않으므로, 이 페이지에서 그 계열에 대한 평가를 얻을 수는 없다.

대조군 서술도 특정 제품을 지목하지 않는다. vector database, 임베딩 모델, similarity 검색이라는 일반명만 쓰이므로, 여기서 말하는 vector RAG는 특정 구현이 아니라 교과서적 기본형으로 읽어야 한다.

한계 5번은 성격이 조금 다르다. 대화 이력을 반영하지 못하는 것은 임베딩 검색 자체의 성질이라기보다 질의를 매번 독립적으로 처리하는 파이프라인 구성의 결과인데, 글은 그 구분을 두지 않고 vector RAG의 한계로 묶는다.

## 핵심 개념

### vectorless RAG

vectorless RAG는 임베딩과 vector database를 쓰지 않고 문서 구조와 LLM 추론만으로 관련 부분을 찾아오는 RAG 방식을 가리키는 이 글의 범주명이다. 내용을 색인된 페이지나 구조화된 섹션으로 조직해 두고, 그중 필요한 부분만 골라 언어 모델에 넘긴다.

글이 내세우는 특성은 4가지이며, 각각 앞 절의 한계 중 무엇을 겨냥하는지가 비교적 뚜렷하다.

| 특성 | 글의 서술 | 겨냥하는 한계 |
|---|---|---|
| Eliminates Embeddings and Vector Databases | dense similarity search 대신 문서 구조와 LLM 주도 추론을 쓴다 | 1번, 2번, 7번 |
| Avoids Artificial Chunking | 페이지와 heading 같은 자연 구획을 보존해 문맥 연속성과 논리 구조를 유지한다 | 3번 |
| Human-like Retrieval | 트리 색인을 한 단계씩 따라 내려가며, 전문가가 자료를 찾는 방식과 유사하다 | 4번 |
| Transparent Retrieval Process | 근사 의미 매칭 대신 추적 가능하고 해석 가능한 결정을 낸다 | 2번 |

한계 5번과 6번을 직접 겨냥하는 특성은 목록에 없다. 대화 이력과 문서 내부 상호 참조는 문제로 제기만 되고 해법으로 이어지지 않는다.

### 트리 색인

트리 색인은 문서를 세 계층으로 표현한 자료 구조다. root가 문서 전체를 뜻하고, 중간 노드가 섹션과 하위 섹션을 뜻하며, 말단 노드가 개별 페이지를 뜻한다.

이 구조가 chunk 목록과 다른 점은 계층이 살아 있다는 것이다. chunk 목록에서는 모든 조각이 평평하게 늘어서 서로의 상하 관계를 잃지만, 트리에서는 어떤 페이지가 어느 섹션 아래에 있는지가 그대로 남는다.

### 추론 기반 탐색

추론 기반 탐색은 similarity 점수 대신 모델의 판단으로 다음에 볼 노드를 고르는 방식이다. 넓은 섹션을 먼저 훑어 어느 가지에 답이 있을지 정하고, 그 가지 아래로 내려가면서 범위를 좁힌다.

목차를 보고 장을 고른 다음 절을 고르고 그 절만 읽는 사람의 순서와 같다. 관련 없어 보이는 장은 펼치지 않으므로, 읽는 분량이 문서 전체가 아니라 고른 가지에 비례한다.

### 비동기 색인과 폴링

비동기 호출은 요청을 넣은 즉시 결과가 오지 않고 이후 조회에 쓸 식별자만 먼저 오는 방식이다. 이 튜토리얼의 클라우드 호출은 문서 업로드와 질의 제출 두 곳에서 이 방식을 쓴다.

폴링은 그 식별자를 들고 일정 간격으로 완료 여부를 되묻는 대기 방식이다. 서버가 완료를 알려 주는 통지 경로가 없을 때 클라이언트가 택하는 가장 단순한 방법이며, 이 글의 코드도 두 곳 모두 폴링으로 처리한다.

| 구분 | 즉시 반환 호출 | 비동기 호출 |
|---|---|---|
| 이 글의 예 | `get_tree`, `get_retrieval`, `is_retrieval_ready` | `submit_document`, `submit_query` |
| 반환되는 것 | 요청한 내용 자체 | 이후 조회에 쓸 식별자 |
| 완료 확인 | 필요 없다 | 별도 함수나 상태 값으로 되묻는다 |
| 실패를 아는 시점 | 호출 직후 | 폴링 도중 |

이 구분을 먼저 잡아 두면 코드 10단계가 왜 두 번 기다리는지가 분명해진다. 대기 지점은 색인 한 번과 retrieval 한 번으로 두 곳이며, 두 대기의 구현이 서로 다르다는 점이 뒤에서 문제로 드러난다.

### PageIndex

PageIndex는 이 두 단계를 묶어 제공하는 프레임워크로 소개된다. 첫째로 문서의 트리 구조 색인을 만들고, 둘째로 그 트리를 탐색해 추론 기반 retrieval을 수행한다.

글은 PageIndex를 소개할 때 저장소도 라이선스도 개발사도 밝히지 않는다. 실습에서 실제로 쓰이는 것은 API key를 받는 클라우드 클라이언트이므로, 이 페이지에서 확인할 수 있는 것은 클라우드 서비스의 호출 형태에 한정된다.

## 방법

### 처리 흐름 7단계

글은 질문이 들어와 답이 나오기까지를 7단계로 나눈다. 앞의 두 단계는 문서를 받았을 때 한 번 수행하는 준비 작업이고, 뒤의 다섯 단계는 질문마다 반복되는 처리다.

| # | 단계 | 하는 일 | 글이 붙인 세부 조건 |
|---|---|---|---|
| 1 | Document Segmentation | 임의 chunk가 아니라 의미 단위 페이지로 나눈다 | heading과 subheading과 주제 전환을 기준으로 나눈다. 페이지 하나가 하나의 분명한 아이디어를 담게 하고 문장이나 개념을 중간에서 자르지 않는다 |
| 2 | PageIndex Tree Construction | 나눈 결과를 트리로 조직한다 | root는 문서 전체, 중간 노드는 섹션과 하위 섹션, 말단 노드는 개별 페이지다 |
| 3 | Query Understanding | 질문의 의도를 먼저 파악한다 | 중요한 키워드와 개념을 식별한 뒤 답이 있을 만한 섹션을 예측하고 탐색할 branch를 고른다 |
| 4 | Hierarchical Reasoning-Based Retrieval | 상위에서 하위로 단계적으로 좁힌다 | 넓은 섹션에서 출발해 점차 구체적인 하위 섹션으로 내려가고, 무관한 섹션은 건너뛴다 |
| 5 | Iterative Page Exploration | 반복 루프로 결과를 다듬는다 | 선택한 페이지를 읽고 답이 충분한지 평가한다. 필요하면 더 깊이 들어가거나 옆으로 이동하거나 되돌아간다 |
| 6 | Context Assembly | 고른 페이지만 모아 넘긴다 | 선택된 페이지를 결합한다. 불필요한 정보를 넣지 않고 컨텍스트를 작고 집중된 상태로 유지한다 |
| 7 | Answer Generation | 고른 페이지만으로 답을 만든다 | 선택된 페이지의 정보를 종합해 명확하고 구조화된 응답을 만든다. 답이 문서 내용과 일치하도록 한다 |

5단계의 되돌아가기가 이 흐름의 특징이다. top-k 검색은 한 번 뽑은 결과를 그대로 쓰지만, 여기서는 읽어 본 뒤 부족하다고 판단하면 다른 가지로 옮겨 가거나 상위로 돌아갈 수 있다.

### 구현 10단계 개관

실습부는 위 7단계를 클라우드 API 호출로 옮긴다. 준비, 색인, 질의, 생성 네 묶음으로 나누어 보면 각 코드 셀이 어디에 속하는지가 분명해진다.

| 단계 | 묶음 | 목적 | 호출 | 입력과 출력 | 주의할 점 |
|---|---|---|---|---|---|
| 1 | 준비 | 패키지 설치 | `pip install` | 없음 | 버전을 고정하지 않는다 |
| 2 | 준비 | 모듈 import | `from pageindex import PageIndexClient` | 없음 | 설명한 용도와 실제 사용이 어긋나는 모듈이 있다 |
| 3 | 준비 | 클라이언트 생성 | `PageIndexClient(api_key=...)` | API key를 받아 클라이언트를 만든다 | 키 발급 절차를 안내 한 줄로만 다룬다 |
| 4 | 준비 | 대상 문서 확보 | `requests.get(pdf_url)` | URL을 받아 로컬 파일로 저장한다 | 상대 경로 `../data`를 쓴다 |
| 5 | 색인 | 문서 업로드 | `submit_document(pdf_path)` | 파일 경로를 넣고 `doc_id`를 받는다 | 이후 모든 호출이 이 식별자를 쓴다 |
| 6 | 색인 | 완료 대기와 트리 조회 | `is_retrieval_ready(doc_id)`, `get_tree(doc_id, node_summary=True)` | `doc_id`를 넣고 불리언과 트리를 받는다 | 색인이 비동기라 폴링이 필요하다 |
| 7 | 생성 | 모델 준비 | `ChatGoogleGenerativeAI(...)` | 모델 이름과 temperature를 넣는다 | 별도의 Google API key가 필요하다 |
| 8 | 질의 | retrieval 함수 정의 | `submit_query(...)`, `get_retrieval(...)` | 질문을 넣고 본문 문자열 목록을 받는다 | 폴링에 상한이 없다 |
| 9 | 생성 | 파이프라인 조립 | `llm.invoke(prompt)` | 질문과 `doc_id`를 넣고 답변 문자열을 받는다 | grounding 제약을 프롬프트로만 건다 |
| 10 | 실행 | 질의 실행 | `vectorless_rag(query, doc_id)` | 질문 하나를 넣고 답을 출력한다 | 단일 질의이며 이력을 넘기지 않는다 |

### 실행에 필요한 준비물

코드를 그대로 실행하려면 글이 명시적으로 요구하는 것과 암묵적으로 전제하는 것을 함께 갖춰야 한다.

| 준비물 | 글의 언급 | 비고 |
|---|---|---|
| PageIndex API key | PageIndex에서 받으라는 안내 한 줄 | 발급 경로와 요금 조건은 다루지 않는다 |
| Google API key | `os.environ["GOOGLE_API_KEY"]` 대입 | Gemini 호출용이며 PageIndex와 별개로 과금된다 |
| 인터넷 접근 | 언급 없음 | arXiv 다운로드와 두 클라우드 호출에 모두 필요하다 |
| 쓰기 가능한 상대 경로 | `../data` | 노트북을 실행한 위치에 따라 파일이 만들어지는 자리가 달라진다 |
| 대상 PDF | arXiv 2501.12948 | 다른 문서로 바꾸려면 URL 한 줄만 고치면 된다 |

과금 주체가 둘이라는 점이 실습 전에 확인할 지점이다. 색인과 질의는 PageIndex 쪽에서, 답변 생성은 Google 쪽에서 각각 발생하는데 글은 어느 쪽 비용도 다루지 않는다.

### 준비 단계

설치는 두 줄로 나뉜다. 첫 줄이 PageIndex 패키지를, 둘째 줄이 LangChain과 Gemini 연동에 필요한 패키지를 설치한다.

```python
!pip install pageindex
!pip install langchain langchain-google-genai google-generativeai
```

import 목록은 파일 처리, 비동기 처리, PageIndex 클라이언트, 출력 유틸 네 부분으로 설명된다. 다만 뒤에서 보듯 설명과 실제 사용이 일치하지 않는 항목이 섞여 있다.

```python
import os
import json
import requests
import asyncio
from pageindex import PageIndexClient
import pageindex.utils as utils
```

클라이언트는 API key 하나로 만들어진다. 인자 이름이 `api_key`라는 것 외에 인증 방식에 관해 확인할 수 있는 정보는 글에 없다.

```python
PAGEINDEX_API_KEY = "Page Index API Key"
pi_client = PageIndexClient(api_key=PAGEINDEX_API_KEY)
```

대상 문서는 arXiv에서 내려받는다. 이 부분은 PageIndex와 무관한 일반적인 파일 다운로드이며, 로컬 경로를 만들어 두는 것이 목적이다.

```python
pdf_url = "https://arxiv.org/pdf/2501.12948.pdf"
pdf_path = os.path.join("../data", pdf_url.split('/')[-1])
os.makedirs(os.path.dirname(pdf_path), exist_ok=True)
response = requests.get(pdf_url)
with open(pdf_path, "wb") as f:
    f.write(response.content)
print(f"Downloaded {pdf_url}")
```

### 색인 단계

문서 업로드는 한 줄이고, 반환값에서 꺼내는 것은 `doc_id` 하나다. 이 식별자가 이후 색인 상태 확인과 트리 조회와 질의 제출을 모두 묶는 기준값이 된다.

```python
doc_info = pi_client.submit_document(pdf_path)
doc_id = doc_info["doc_id"]
print('Document Submitted:', doc_id)
```

색인은 서버에서 비동기로 진행되므로 곧바로 질의할 수 없다. 그래서 준비 여부를 묻는 함수를 5초 간격으로 최대 30회까지 호출하고, 준비되면 트리를 받아 화면에 출력한다.

```python
import time
print(f"Waiting for document {doc_id} to be indexed...")
max_retries = 30
retry_count = 0
while not pi_client.is_retrieval_ready(doc_id):
    if retry_count >= max_retries:
        print("Timeout: Document processing took too long.")
        break
    print(f"Still processing... (Attempt {retry_count + 1}/{max_retries})")
    time.sleep(5)
    retry_count += 1
if pi_client.is_retrieval_ready(doc_id):
    print("Success! Document is ready.")
    tree = pi_client.get_tree(doc_id, node_summary=True)['result']
    utils.print_tree(tree)
else:
    tree = None
```

이 코드에서 두 가지를 읽어 두면 이후가 편하다. 첫째로 5초 간격에 30회 상한이므로 최대 대기 시간은 약 150초이며, 그 안에 끝나지 않으면 루프를 벗어나 `tree`를 `None`으로 둔다. 둘째로 `get_tree`에 넘긴 `node_summary=True`는 노드마다 요약을 함께 달라는 요청으로 보이지만, 그 인자가 응답에 무엇을 더하는지 글은 설명하지 않는다.

트리 조회에는 중요한 함정이 있다. 여기서 받은 `tree` 변수는 이후 8단계부터 10단계까지 어디에서도 다시 쓰이지 않는다. 즉 화면 출력용이며, 실제 탐색은 질의를 서버에 넘긴 뒤 서버 쪽에서 일어난다.

### 질의 단계

retrieval 함수는 질의 제출과 상태 폴링과 본문 추출 세 부분으로 이루어진다. 질의를 넣으면 곧바로 결과가 오는 것이 아니라 `retrieval_id`가 오고, 그 식별자로 완료를 기다린다.

```python
def retrieve_from_pageindex(query, doc_id, top_k=3):
    response = pi_client.submit_query(
        doc_id=doc_id,
        query=query
    )
    retrieval_id = response.get("retrieval_id")
    if not retrieval_id:
        return []
    while True:
        retrieval = pi_client.get_retrieval(retrieval_id)
        status = retrieval.get("status")
        if status == "completed":
            break
        elif status == "failed":
            return []
        time.sleep(1)
    nodes = retrieval.get("retrieved_nodes", [])
    contexts = []
    for node in nodes[:top_k]:
        relevant_contents = node.get("relevant_contents", [])
        for group in relevant_contents:
            for item in group:
                content = item.get("relevant_content")
                if content:
                    contexts.append(content)
    return contexts
```

폴링 방식은 색인 때와 다르다. 색인은 불리언을 돌려주는 전용 함수를 쓰고 재시도 상한이 있었지만, retrieval은 문자열 `status`를 보고 판단하며 상한이 없다.

| 항목 | 색인 폴링 | retrieval 폴링 |
|---|---|---|
| 판정 방법 | `is_retrieval_ready(doc_id)`가 돌려주는 불리언 | `get_retrieval(retrieval_id)`의 `status` 문자열 |
| 대기 간격 | 5초 | 1초 |
| 재시도 상한 | 30회 | 없음 |
| 최대 대기 | 약 150초 | 상한 없음 |
| 실패 처리 | 메시지를 출력하고 `tree`를 `None`으로 둔다 | `status`가 `failed`면 빈 목록을 돌려준다 |
| 예외 처리 | 없음 | 없음 |

응답에서 본문을 꺼내는 부분은 3중 중첩이라 한 번 정리해 둘 필요가 있다. 노드 목록에서 앞의 세 개를 취하고, 각 노드의 `relevant_contents`를 group 단위로 돌고, 각 group 안의 항목에서 문자열을 꺼낸다.

| 계층 | 키 | 형태 | 코드가 하는 일 |
|---|---|---|---|
| 1 | `retrieved_nodes` | 노드 목록 | `[:top_k]`로 앞에서부터 세 개만 취한다 |
| 2 | `relevant_contents` | 목록의 목록 | 노드마다 꺼내 group 단위로 순회한다 |
| 3 | `relevant_content` | 문자열 | 값이 있을 때만 컨텍스트 목록에 넣는다 |

여기서 노드 식별자와 페이지 번호와 점수는 읽지 않는다. 최종 프롬프트에 남는 것은 본문 문자열뿐이므로, 답변에서 근거 위치를 되짚을 수 없다.

`top_k=3`도 서버가 아니라 클라이언트에서 적용되는 값이다. 서버는 노드를 몇 개 돌려주든 상관없이 돌려주고, 코드가 앞에서 세 개를 자를 뿐이며, 그 순서가 무엇을 기준으로 정해지는지는 글에 없다.

### 생성 단계

생성 모델은 LangChain 래퍼로 붙인다. `temperature=0.3`은 표현의 흔들림을 줄여 문서 내용을 재진술하는 쪽에 맞춘 설정이다.

```python
from langchain_google_genai import ChatGoogleGenerativeAI
import os
os.environ["GOOGLE_API_KEY"] = "your_google_api_key"
llm = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash",
    temperature=0.3,
)
```

파이프라인 함수는 retrieval 결과를 두 줄 개행으로 이어 붙이고 grounding 프롬프트에 끼워 넣는다. grounding은 모델의 출력을 외부 근거에 붙들어 매는 것을 뜻하며, 여기서는 세 가지 지시로 구현된다.

```python
def vectorless_rag(query, doc_id):
    contexts = retrieve_from_pageindex(query, doc_id)
    if not contexts:
        return "No relevant context found."
    combined_context = "\n\n".join(contexts)
    prompt = f"""
    You are a research assistant.
    Answer ONLY using the context below.
    If the answer is not found, say "Not found in document."

    Context:
    {combined_context}

    Question:
    {query}
    """
    response = llm.invoke(prompt)
    return response.content
```

프롬프트의 세 지시는 역할 고정, 근거 제한, 미발견 응답 문구다. 역할을 research assistant로 못 박고, 아래 컨텍스트만 써서 답하라고 지시하며, 답이 없으면 "Not found in document."라고 답하게 한다.

이 제약은 프롬프트 문구일 뿐 검증 장치가 아니다. 모델이 지시를 어기고 컨텍스트 밖 지식을 섞어도 코드가 걸러 내지 않으므로, 환각 방지는 모델의 지시 준수에 전적으로 기댄다.

### 실행과 응답

마지막 셀은 질문 하나를 넣어 답을 출력한다. 질문은 문서 종류를 가리지 않는 일반적인 형태다.

```python
query = "What is the main contribution of this paper?"
answer = vectorless_rag(query, doc_id)
print("\nFINAL ANSWER:\n")
print(answer)
```

대상 문서를 글은 "a research paper from ArXiv"라고만 부르고 제목을 밝히지 않는다. 다만 출력된 답변이 DeepSeek-R1과 그 세 가지 개발 버전을 직접 언급하므로, arXiv 2501.12948이 DeepSeek-R1 기술 보고서라는 사실이 응답 본문에서 확인된다.

답변은 세 가지를 주요 기여로 든다. 순수 강화학습으로 LLM의 추론 능력을 끌어올려 사람이 주석한 추론 경로가 필요 없다는 점, 최소한의 사람 라벨링으로 자기 진화를 통해 추론 능력이 발달한다는 점, 그리고 다단계 파이프라인과 세 가지 개발 버전이다.

## 결과

### 비교표

글이 제시하는 결과물은 다음 5개 항목 비교표와 위 응답 1건이 전부다. 표의 모든 칸은 방식 서술이며 측정값이 아니다.

| 항목 | Vector RAG | Vectorless RAG |
|---|---|---|
| Retrieval Method | 임베딩 similarity 검색을 쓴다 | 논리적 추론과 트리 탐색을 쓴다 |
| Document Representation | 텍스트를 고차원 벡터로 바꾼다 | 텍스트를 계층적 페이지 트리로 조직한다 |
| Search Process | 한 단계로 top-k 유사 chunk를 가져온다 | 큰 섹션을 먼저 훑고 이어서 정확한 정보로 좁힌다 |
| Context Usage | 느슨하게 관련된 chunk가 섞일 수 있다 | 논리적으로 관련된 페이지만 고른다 |
| Computation Cost | 임베딩 생성과 저장이 필요하다 | vector 저장이 필요 없다 |

앞의 네 행은 절차의 차이를 진술하므로 코드만 보고도 확인된다. 다섯째 행은 성격이 다르다. 항목 이름은 연산 비용인데 답은 저장 비용에 한정되며, 트리를 단계적으로 탐색할 때 발생하는 LLM 호출 비용은 표에 반영되지 않는다.

### 실증된 범위

이 자료가 실제로 보여 준 것은 파이프라인이 끝까지 실행되어 답이 나왔다는 사실 하나다. 그 범위를 명시해 두면 이 페이지를 어디까지 근거로 쓸 수 있는지가 분명해진다.

| 항목 | 실증 여부 |
|---|---|
| 클라우드에 PDF를 올려 색인이 완료된다 | 코드와 출력 흐름으로 제시된다 |
| 색인된 문서에서 질의 결과를 받아 온다 | 코드로 제시되고 응답 본문이 출력된다 |
| 답변이 문서 내용과 일치한다 | 제시되지 않는다. 검증 절차가 없다 |
| 트리 탐색이 vector 검색보다 나은 근거를 고른다 | 제시되지 않는다. 대조 실행이 없다 |
| 되돌아가기가 실제로 일어난다 | 제시되지 않는다. 서버 내부 동작이라 코드에서 보이지 않는다 |

### 측정되지 않은 것

이 글에는 정량 결과가 한 건도 없다. 아래 항목은 전부 확인할 수 없으므로, 이 페이지를 근거로 성능을 주장해서는 안 된다.

| 알고 싶은 것 | 글의 상태 |
|---|---|
| 정확도 비교 | 없음. 같은 문서 같은 질의로 vector RAG와 맞붙인 결과가 없다 |
| 지연 | 없음. 색인 시간도 질의 응답 시간도 기록하지 않는다 |
| 비용 | 없음. 호출당 과금도 토큰 사용량도 없다 |
| 외부 벤치마크 | 없음. 다른 자료의 수치를 인용하지도 않는다 |
| 응답 품질 평가 | 없음. 출력된 답변 1건이 맞는지 검증하지 않는다 |

### 벤치마크 인용의 부재

이 글은 PageIndex의 성능을 뒷받침하는 벤치마크 수치를 한 건도 인용하지 않는다. 다른 PageIndex 자료에서 널리 인용되는 FinanceBench 결과도 이 글에는 나오지 않으므로, 그 수치를 이 페이지의 근거로 삼을 수 없다.

인용이 없다는 사실은 양면을 갖는다. 성능을 수치로 주장하지 않으므로 조건이 잘린 인용을 퍼뜨리지는 않지만, vectorless RAG가 vector RAG보다 낫다는 비교표의 주장을 뒷받침할 근거도 함께 없다.

수치가 필요하면 [[database/vectifyai-pageindex]]와 [[database/kalane-2026-pageindex-threw-out-vector-databases]]를 참고하되, 그 수치가 무엇을 대상으로 측정한 것인지와 누가 보고했는지와 독립 재검증이 있었는지를 함께 확인해야 한다. PageIndex 자체의 점수와 PageIndex를 부품으로 쓰는 상위 시스템의 점수는 같은 값이 아니다.

## 한계

### 글이 명시한 한계

| # | 한계 | 근본 원인 |
|---|---|---|
| 1 | 문서 구조 품질에 크게 의존한다 | heading이 부실하면 트리가 의미 있는 계층을 갖지 못한다 |
| 2 | LLM의 추론 능력에 의존한다 | 잘못된 가지를 고르면 답이 있는 절에 도달하지 못한다 |
| 3 | 더 느려질 수 있다 | 단계별 탐색이 한 번의 검색보다 왕복 횟수가 많다 |
| 4 | 서로 무관한 다수 문서 검색에는 덜 효과적이다 | 트리가 문서 단위로 만들어진다 |
| 5 | 비구조적이거나 정리가 나쁜 문서에서 성능이 떨어진다 | 1번과 같은 원인이 결과로 드러난 형태다 |

1번과 5번은 사실상 같은 원인을 앞뒤에서 진술한 것이다. 서로 다른 다섯 개라기보다 세 가지에 가깝고, 구조 의존과 추론 의존과 탐색 비용으로 묶인다.

### 글 자체의 모순

같은 문서 안에서 서로 어긋나는 서술이 여러 곳에 있다. 이 표의 항목은 삭제하지 않고 그대로 남긴다. 튜토리얼을 그대로 따라 할 때 걸릴 수 있는 지점들이기 때문이다.

| # | 어긋나는 지점 | 대조 위치 |
|---|---|---|
| 1 | 도입부는 vectorless RAG가 빠른 키워드 기반 retrieval을 가능하게 한다고 서술하지만, 본문과 비교표는 retrieval이 키워드나 similarity가 아니라 논리적 추론과 트리 탐색이라고 서술한다 | 도입부 첫 문단 대 비교표 Retrieval Method 행 |
| 2 | 도입부는 빠르다고 하고 한계 절은 단계별 탐색 때문에 더 느릴 수 있다고 한다 | 도입부 대 한계 3번 |
| 3 | 2단계는 `asyncio`를 비동기 처리와 폴링용으로 import한다고 설명하지만 3단계부터 10단계까지 어느 코드도 쓰지 않는다. 폴링은 동기 `time.sleep`으로 구현된다. `json`도 import만 하고 쓰이지 않는다 | 2단계 대 6단계, 8단계 |
| 4 | 2단계에서 import 목록을 정리했는데도 6단계에서 `import time`을, 7단계에서 `import os`를 다시 선언한다 | 2단계 대 6단계, 7단계 |
| 5 | Transparent Retrieval Process를 특성으로 내세우지만 8단계 추출 코드는 본문 문자열만 남기고 노드 식별자와 페이지 번호와 판단 근거를 버린다. 추적 가능성을 보여 주는 출력이 없다 | 특성 목록 대 8단계 |
| 6 | vector RAG의 한계로 대화 이력 미반영을 지적하지만 데모는 단일 질의 한 번이며 이력을 넘기는 코드가 없다 | 한계 목록 5번 대 9단계, 10단계 |
| 7 | 6단계에서 트리를 받아 출력하지만 8단계부터 10단계까지 그 변수를 다시 쓰지 않는다. 트리는 화면 출력용이고 실제 탐색은 서버에서 일어난다 | 6단계 대 8단계 |
| 8 | 색인 폴링에는 재시도 상한이 있는데 retrieval 폴링은 무한 루프다. 같은 튜토리얼 안에서 견고성 기준이 다르다 | 6단계 대 8단계 |
| 9 | Computation Cost 항목의 답이 저장 비용에 한정된다. 같은 글이 단계별 탐색을 지연 요인으로 지적했으므로 연산 비용은 그 탐색이 유발하는 호출을 포함해야 한다 | 비교표 대 한계 3번 |
| 10 | 8단계 설명은 가장 잘 맞는 노드에서 본문을 모은다고 하지만 코드는 서버가 돌려준 순서를 그대로 자를 뿐이다. 정렬 기준을 설명하지 않는다 | 8단계 설명 대 8단계 코드 |

### 실습 코드를 재사용할 때의 보완 지점

위 모순 표의 항목은 대부분 코드 수정으로 이어진다. 이 코드를 그대로 가져다 쓸 계획이라면 아래를 먼저 손보는 편이 낫다.

| 보완할 지점 | 모순 표 번호 | 무엇을 바꾸는가 |
|---|---|---|
| retrieval 폴링에 상한을 둔다 | 8번 | 색인 폴링처럼 재시도 횟수와 타임아웃 처리를 추가한다 |
| 근거 위치를 함께 보존한다 | 5번, 10번 | 본문 문자열과 함께 노드 식별자와 페이지 번호를 모아 답변에 붙인다 |
| 쓰지 않는 import를 정리한다 | 3번, 4번 | `asyncio`와 `json`을 빼고 `time`을 상단으로 옮긴다 |
| 트리를 활용하거나 설명을 바꾼다 | 7번 | 트리가 화면 출력 전용임을 명시하거나 질의 범위를 좁히는 데 사용한다 |
| 오류 응답을 처리한다 | 아래 API 스펙 표 | 네트워크 오류와 인증 실패에 대비한 예외 처리를 추가한다 |
| 대화 이력을 반영한다 | 6번 | 앞선 질문과 답변을 프롬프트에 포함하는 경로를 만든다 |

### 글이 밝히지 않는 API 스펙

이 글은 SDK 메서드만 보여 주고 프로토콜 수준의 정보를 전혀 다루지 않는다. 실제로 서비스를 도입하려면 아래 항목을 공식 문서에서 따로 확인해야 한다.

| 항목 | 글에서 확인되는 것 | 확인되지 않는 것 |
|---|---|---|
| 엔드포인트 | 없음. SDK 메서드 이름만 나온다 | 기반 URL, 경로, HTTP 메서드 |
| 인증 | 생성자 인자 `api_key` 하나 | 전송 헤더 이름, 만료와 회전, 발급 절차 |
| 요금 | 없음 | 과금 단위, 무료 한도, 색인과 질의의 가격 차이 |
| 호출 상한 | 없음 | 초당 또는 분당 상한, 초과 시 동작 |
| 파일 형식 | PDF 1종만 시연한다 | 다른 형식 지원 여부, 페이지 수 상한, 파일 크기 상한 |
| 상태 값 | `completed`와 `failed` | 진행 중을 뜻하는 값의 이름, 그 밖의 상태 |
| 오류 처리 | 없음. `try` 블록이 한 번도 나오지 않는다 | HTTP 상태 코드, 오류 응답 형식, 재시도 정책 |
| 응답 스키마 | 코드가 읽는 키 몇 개뿐 | 노드 스키마, 점수 필드, `node_summary=True`가 더하는 필드 |
| 데이터 보존 | 없음 | 업로드한 문서의 보관 기간, 삭제 방법 |
| SDK 버전 | 버전 고정 없이 설치한다 | 호환 버전 범위, 클라우드 클라이언트와 자체 호스팅 패키지의 관계 |

### 매체 특성에서 오는 주의

이 글은 개념 서술을 원 자료에서 재구성하는 과정에서 정확성이 떨어진 대목을 갖고 있다. 위 모순 표의 1번과 2번이 대표적이며, 키워드 기반이라는 표현과 빠르다는 표현이 모두 글 자신의 나머지 서술과 어긋난다.

한계 4번은 다수 문서 검색에 덜 효과적이라는 서술을 방식 자체의 성질처럼 제시한다. 이 서술이 PageIndex 프로젝트가 별도로 내놓는 corpus 규모 확장 방향과 어떻게 맞물리는지는 [[database/vectifyai-pageindex]]에서 확인하는 편이 낫다.

한계 1번과 5번은 문서 구조 품질을 원인으로 지목하면서 PDF 파싱 품질은 언급하지 않는다. 원래 구조가 좋은 문서라도 파서가 계층을 잃으면 같은 증상이 나타나므로, 원인 분류가 한쪽으로 치우쳐 있다. 독자가 트리 품질이 나쁜 결과를 만났을 때 문서를 탓해야 할지 파싱 단계를 손봐야 할지 판단할 근거를 이 글만으로는 얻지 못한다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| Vectorless RAG | 임베딩과 vector database를 쓰지 않고 문서 구조와 LLM 추론으로 retrieval을 수행하는 방식을 가리키는 이 글의 범주명 |
| Tree structure index | root가 문서 전체, 중간 노드가 섹션과 하위 섹션, 말단 노드가 개별 페이지인 계층 색인 |
| Hierarchical Reasoning-Based Retrieval | 넓은 섹션에서 시작해 구체적인 하위 섹션으로 내려가며 무관한 가지를 건너뛰는 탐색 단계 |
| Iterative Page Exploration | 페이지를 읽고 충분성을 평가한 뒤 더 깊이 가거나 옆으로 가거나 되돌아가는 반복 루프 |
| Hard chunking | 고정 크기로 문서를 잘라 문장과 표와 섹션을 임의 지점에서 절단하는 vector RAG 전처리 |
| `retrieval_id` | 질의를 제출할 때 서버가 돌려주는 식별자로, 이후 폴링에서 상태와 결과를 조회할 때 쓴다 |

## 관련 페이지

- [[database/zhang-2025-pageindex-vectorless-reasoning-rag]]: PageIndex 팀이 직접 쓴 소개 자료. 이 튜토리얼이 범주명과 문제 의식을 가져온 원류에 해당하며, 개념의 출처를 확인할 때 먼저 본다.
- [[database/vectifyai-pageindex]]: PageIndex의 오픈소스 저장소 페이지. 이 튜토리얼이 쓰는 것은 API key로 접속하는 클라우드 서비스이므로 두 페이지의 인터페이스는 서로 다른 대상이다. 자체 호스팅 구성과 라이선스와 저장소 구조는 그 페이지에서 확인한다.
- [[database/kalane-2026-pageindex-threw-out-vector-databases]]: 제3자가 쓴 리뷰. 이 페이지가 절차만 다루는 데 비해 그 리뷰는 평가 관점을 담고 있어 튜토리얼을 따라 해 본 뒤 판단 근거를 보탤 때 함께 읽는다.
- [[database/sguys99-langchain-study-vectorless-rag]]: 클라우드 API 없이 같은 아이디어를 직접 구현한 한글 학습용 코드. 이 페이지의 코드가 서버에 맡기는 트리 탐색을 로컬에서 어떻게 쓰는지 대조할 수 있다.
- [[database/li-2026-beyond-semantic-similarity-rethinking-retrieval]]: 임베딩 색인 자체를 두지 않는 또 다른 접근. 구조를 미리 만들어 두는 이 페이지의 방식과 구조 없이 원문을 직접 뒤지는 방식을 양쪽 끝으로 놓고 볼 수 있다.
