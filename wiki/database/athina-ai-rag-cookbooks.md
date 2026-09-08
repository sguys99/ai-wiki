---
title: "Advanced + Agentic RAG Cookbooks (Athina AI, GitHub repo)"
type: repo
year: 2024
category: database
raw_path: raw/repos/athina-ai-rag-cookbooks.md
raw_filename: "athina-ai-rag-cookbooks.md"
source_collection: external
source: athina-ai-rag-cookbooks.md
org: "athina-ai"
repo: "rag-cookbooks"
url: "https://github.com/athina-ai/rag-cookbooks"
license: "MIT"
tags: [rag, advanced-rag, agentic-rag, langchain, langgraph, hyde, hybrid-rag, corrective-rag, self-rag, adaptive-rag, react, rag-evaluation, athina, cookbook, repo, oss]
---

## 요약

Athina AI의 rag-cookbooks는 RAG 기법 13종을 각각 실행 가능한 Jupyter 노트북 한 개로 정리한 학습용 저장소다. naive RAG를 출발점으로 두고 advanced RAG 8종과 agentic RAG 5종으로 나아가는 순서를 가진다.

이 저장소는 설치해서 쓰는 라이브러리가 아니다. README가 제공하는 것은 기법 이름, 사용 도구, 한 줄 설명, Colab 링크의 네 열로 된 카탈로그 표 두 개다. 독자는 표에서 기법을 고르고 배지를 눌러 브라우저에서 노트북을 연다.

카탈로그의 특징은 두 가지로 요약된다. 첫째, 13종 전부가 LangChain과 Athina AI 평가를 공통으로 쓴다. 구현에서 끝내지 않고 평가 단계까지 포함하는 것이 저장소의 설계 선택이다. 둘째, vector store는 다섯 종을 나눠 써서 특정 벤더에 묶이지 않은 형태로 기법을 익히게 한다.

성능 수치는 없다. README는 어떤 벤치마크도 제시하지 않으며, 기법 간 우열을 가릴 데이터를 담지 않는다. 이 저장소의 쓸모는 비교 연구가 아니라 실행 가능한 출발점 제공에 있다. License는 MIT이며 README의 License 절이 이를 명시한다.

## 배경

### 대형 언어 모델의 한계와 RAG

README는 RAG가 필요한 이유를 모델 자체의 제약에서 시작한다. 대형 언어 모델은 고정된 데이터셋으로 학습하기 때문에 비공개 정보나 최근 정보를 다루기 어렵다. 그리고 틀렸지만 그럴듯한 답을 내놓는 환각이 발생한다.

fine-tuning으로 보완할 수는 있다. fine-tuning은 pre-training을 마친 모델을 특정 데이터로 더 학습시키는 단계를 말한다. 다만 README는 이 방법의 비용이 크고 새 데이터가 들어올 때마다 반복 재학습하기에 적합하지 않다고 지적한다.

RAG는 다른 경로를 택한다. 외부 문서를 가져와 in-context learning 형태로 모델에 제공한다. in-context learning은 가중치를 갱신하지 않고 프롬프트 안의 내용만으로 과제를 수행하게 하는 방식이다. 그래서 모델을 다시 학습시키지 않고도 최신 정보와 비공개 정보를 답변에 반영할 수 있다.

### 저장소가 겨냥한 두 가지 진입장벽

README는 저장소의 목적을 advanced RAG 기법을 실제 프로젝트에 쓰려는 연구자와 개발자를 돕는 것으로 규정한다. 그리고 그 앞을 막는 장벽 두 가지를 명시한다.

| 장벽 | README의 서술 | 저장소의 대응 |
|---|---|---|
| 구현 비용 | 이 기법들을 처음부터 만드는 데 시간이 든다 | 바로 쓸 수 있는 구현을 기법마다 노트북 한 개로 제공한다 |
| 평가 방법 | 적절한 평가 방법을 찾기가 어렵다 | 평가 방법에 대한 안내를 구현과 함께 제공한다 |

두 번째 장벽을 함께 다룬 것이 이 저장소를 단순한 예제 모음과 구분 짓는다. 기법을 구현해 보는 것과 그 기법이 내 데이터에서 잘 동작하는지 확인하는 것은 별개의 작업이며, README는 후자를 처음부터 범위에 넣었다.

## 핵심 개념

### RAG의 네 구성 요소

README는 RAG 소개 절에서 구성 요소 네 개를 정의한다. 이후 카탈로그의 기법들은 대부분 이 중 한두 개를 변형한 것이다.

| 구성 요소 | 하는 일 |
|---|---|
| Indexing | 형식을 가리지 않고 문서를 chunk로 나누고, 각 chunk의 임베딩을 만들어 vector store에 적재한다 |
| Retriever | vector similarity 같은 기법으로 사용자 질의에 가장 관련 있는 문서를 vector store에서 찾는다 |
| Augment | 사용자 질의와 찾아온 컨텍스트를 하나의 프롬프트로 합쳐, 모델이 답에 필요한 정보를 갖추게 한다 |
| Generate | 합쳐진 질의와 프롬프트를 모델에 넘겨 최종 응답을 만든다 |

임베딩은 텍스트를 고정 차원 벡터로 바꾼 표현이다. vector similarity는 질의 임베딩과 문서 임베딩 사이의 거리로 관련성을 재는 방식을 뜻한다. 카탈로그의 여러 기법이 바로 이 지점을 문제 삼는다. 의미가 가까운 벡터가 반드시 질문에 답하는 문서는 아니기 때문이다.

### 색인이 만들어지는 과정

Indexing 단계의 서술에는 카탈로그를 읽는 데 필요한 전제가 몇 가지 들어 있다. README는 문서를 chunk로 나누고 각 chunk의 임베딩을 만들어 vector store에 넣는다고 적는다.

여기서 세 가지가 결정된다. 첫째, 검색의 최소 단위가 문서 전체가 아니라 chunk라는 점이다. 둘째, 검색이 원문 글자가 아니라 임베딩 위에서 이루어진다는 점이다. 셋째, 형식을 가리지 않는다는 표현대로 입력 문서의 종류가 열려 있다는 점이다.

이 세 결정이 곧 세 가지 문제의 출발점이 된다. chunk 단위 반환은 문맥이 잘리는 문제를 낳고, 임베딩 기반 검색은 글자가 정확히 일치하는 문서를 놓치는 문제를 낳으며, 열린 입력 형식은 표와 이미지를 어떻게 처리할지의 문제를 낳는다. 카탈로그의 Parent Document Retriever와 Hybrid RAG와 Unstructured RAG가 각각 이 세 문제에 대응한다.

### advanced RAG와 agentic RAG의 구분

저장소는 기법을 두 묶음으로 나눈다. README는 두 이름을 정의하지 않고 표 제목으로만 쓰지만, 각 표의 한 줄 설명을 비교하면 구분 기준이 드러난다.

| 기준 | Advanced RAG (8종) | Agentic RAG (5종) |
|---|---|---|
| 개선 대상 | Indexing과 Retriever 단계의 처리 방식 | 파이프라인 전체의 제어 흐름 |
| 실행 경로 | 정해진 순서를 한 번 통과한다 | 판단 결과에 따라 경로가 바뀐다 |
| 판단 주체 | 없다. 설계자가 정한 절차를 따른다 | 에이전트가 도구 선택과 재검색을 결정한다 |
| web search 언급 | 8종 중 0종 | 5종 중 3종 (Basic Agentic, Corrective, Adaptive) |
| LangGraph 사용 | 8종 중 1종 (Unstructured RAG) | 5종 중 4종 |

web search 언급 비율의 차이가 두 묶음의 성격을 잘 보여준다. advanced RAG는 색인해 둔 문서 안에서 더 잘 찾는 문제를 다룬다. 반면 agentic RAG는 색인 밖으로 나가는 경로를 갖추는 것을 공통 특징으로 삼는다.

### 평가를 파이프라인의 일부로 두는 구성

README는 RAG 평가에 별도 절을 배정한다. 평가가 정확성과 관련성을 확인해 검색과 생성이 얼마나 잘 결합했는지 보여주고, 텍스트 요약과 챗봇과 질의응답 같은 과제에서 개선 지점을 찾아준다는 서술이다. 정보가 바뀌는 상황에서도 신뢰할 수 있는 응답을 내는지 확인하는 수단이라고도 적는다.

이 서술이 카탈로그 표에 그대로 반영되어 있다. 13종 전부의 도구 열에 Athina AI가 들어 있다. README의 표현으로는 각 노트북이 end-to-end RAG 구현과 Athina AI에서의 평가 부분을 함께 담고 있다.

## 방법

### 카탈로그의 구성

저장소가 README로 노출하는 전체 구조는 다음과 같다. 노트북 경로는 각 행의 Colab 배지 링크에서 읽어낸 것이다.

| 묶음 | 노트북 수 | 디렉토리 |
|---|---|---|
| Advanced RAG | 8 | `advanced_rag_techniques/` |
| Agentic RAG | 5 | `agentic_rag_techniques/` |
| 합계 | 13 | |

### 학습 순서

README의 Note는 이 저장소가 naive RAG를 기초로 삼아 advanced와 agentic으로 나아간다고 밝힌다. 카탈로그가 나열이 아니라 순서를 가진 구성이라는 뜻이며, 표의 배열도 그 순서를 따른다.

| 단계 | 시작점 | 이 단계에서 익히는 것 |
|---|---|---|
| naive RAG | Naive RAG 노트북 | 네 구성 요소를 한 번씩 통과하는 최소 파이프라인의 형태 |
| advanced RAG | Hybrid RAG 이후 7종 | 같은 파이프라인에서 질의, 검색, 반환 단위, 후처리를 바꾸는 방법 |
| agentic RAG | Basic Agentic RAG 이후 5종 | 결과에 따라 실행 경로 자체를 바꾸는 구성 |

이 순서에는 실용적인 이유도 있다. 기준선이 없으면 개선 여부를 판단할 수 없기 때문이다. naive RAG를 먼저 돌려 두면 이후 기법의 결과를 비교할 대상이 생긴다.

### Advanced RAG 8종

설명 열은 README의 한 줄 설명을 옮긴 것이다.

| 기법 | 도구 | 하는 일 | 노트북 |
|---|---|---|---|
| Naive RAG | LangChain, Pinecone | 찾아온 데이터를 모델과 결합해 단순하고 효과적인 응답을 만든다 | `naive_rag.ipynb` |
| Hybrid RAG | LangChain, Chromadb | vector 검색과 BM25 같은 전통적 방법을 결합해 검색 품질을 높인다 | `hybrid_rag.ipynb` |
| Hyde RAG | LangChain, Weaviate | 가상의 문서 임베딩을 만들어 질의에 관련된 정보를 찾는다 | `hyde_rag.ipynb` |
| Parent Document Retriever | LangChain, Chromadb | 큰 문서를 작은 조각으로 나누고, 조각이 질의와 맞으면 문서 전체를 반환한다 | `parent_document_retriever.ipynb` |
| RAG fusion | LangChain, LangSmith, Qdrant | sub-query를 만들고 Reciprocal Rank Fusion으로 reranking한 뒤 상위 결과를 쓴다 | `fusion_rag.ipynb` |
| Contextual RAG | LangChain, Chromadb | 찾아온 문서를 압축해 관련 있는 세부만 남긴다 | `contextual_rag.ipynb` |
| Rewrite Retrieve Read | LangChain, Chromadb | 질의를 개선하고 더 나은 데이터를 찾아 정확한 답을 만든다 | `rewrite_retrieve_read.ipynb` |
| Unstructured RAG | LangChain, LangGraph, FAISS, Unstructured | 텍스트와 표와 이미지가 섞인 문서를 다루도록 설계됐다 | `basic_unstructured_rag.ipynb` |

도구 열에서 Athina AI는 생략했다. 8종 모두가 공통으로 포함하기 때문이다.

### 기법이 손대는 지점

8종의 설명을 파이프라인 단계에 대응시키면 다음처럼 나뉜다. README가 직접 이렇게 분류하지는 않지만, 각 기법이 어디를 바꾸는지 보면 선택 기준이 잡힌다.

| 손대는 지점 | 기법 | 전제하는 문제 |
|---|---|---|
| 기준선 | Naive RAG | 없다. 비교 대상이 된다 |
| 질의 자체 | Hyde RAG, Rewrite Retrieve Read, RAG fusion | 사용자가 쓴 질의가 검색에 바로 쓰기에 좋지 않다 |
| 검색 방식 | Hybrid RAG | vector similarity 하나로는 놓치는 문서가 있다 |
| 반환 단위 | Parent Document Retriever | chunk 단위 반환은 문맥이 잘려 답을 만들기 어렵다 |
| 검색 결과 후처리 | Contextual RAG | 찾아온 문서에 답과 무관한 내용이 섞여 있다 |
| 입력 문서 유형 | Unstructured RAG | 실제 문서는 텍스트만으로 되어 있지 않다 |

질의를 손대는 기법이 셋으로 가장 많다. 세 기법의 방법은 서로 다르다. Hyde RAG는 질의에 답하는 가상의 문서를 먼저 만들어 그 임베딩으로 검색한다. Rewrite Retrieve Read는 질의 자체를 검색에 유리하게 다시 쓴다. RAG fusion은 질의 하나를 여러 sub-query로 늘린 뒤 결과를 Reciprocal Rank Fusion으로 합친다.

### Agentic RAG 5종

| 기법 | 도구 | 하는 일 | 노트북 |
|---|---|---|---|
| Basic Agentic RAG | LangChain, FAISS | 에이전트가 vectordb와 web search 같은 도구를 써서 답을 찾고 생성한다 | `basic_agentic_rag.ipynb` |
| Corrective RAG | LangChain, LangGraph, Chromadb | 관련 문서를 정제하고 관련 없는 문서를 제거하거나 web search를 수행한다 | `corrective_rag.ipynb` |
| Self RAG | LangChain, LangGraph, FAISS | 찾아온 데이터를 되짚어 정확하고 완결된 응답을 보장한다 | `self_rag.ipynb` |
| Adaptive RAG | LangChain, LangGraph, FAISS | 질의 유형에 따라 색인 데이터와 web search 중에서 검색 방식을 조정한다 | `adaptive_rag.ipynb` |
| ReAct RAG | LangChain, LangGraph, FAISS | 추론과 검색을 결합해 컨텍스트를 고려한 응답을 만든다 | `react_rag.ipynb` |

5종이 내리는 결정의 종류는 서로 다르다. 무엇을 보고 무엇을 정하는지로 나누면 다음과 같다.

| 기법 | 판단의 대상 | 정하는 것 | 판단 시점 |
|---|---|---|---|
| Basic Agentic RAG | 질의 | 어떤 도구를 호출할지 | 검색 전 |
| Corrective RAG | 찾아온 문서 | 정제, 제거, web search 중 무엇을 할지 | 검색 후 |
| Self RAG | 찾아온 데이터와 자기 응답 | 응답이 정확하고 완결됐는지 | 생성 전후 |
| Adaptive RAG | 질의 유형 | 색인 데이터와 web search 중 어느 경로로 갈지 | 검색 전 |
| ReAct RAG | 진행 중인 추론 상태 | 다음에 추론할지 검색할지 | 매 단계 |

판단 시점이 서로 다르다는 점이 선택 기준이 된다. Basic Agentic RAG와 Adaptive RAG는 검색 전에 한 번 결정하고 그대로 진행한다. Corrective RAG와 Self RAG는 결과를 본 뒤 되돌아가는 경로를 갖는다. ReAct RAG는 결정 지점을 매 단계에 둔다.

### 공통 스택과 백엔드 분포

두 표의 도구 열을 세면 다음과 같다.

| 도구 | 노트북 수 | 쓰이는 곳 |
|---|---|---|
| LangChain | 13 | 13종 전체 |
| Athina AI | 13 | 13종 전체 |
| LangGraph | 5 | Unstructured RAG와 agentic 4종 |
| Chromadb | 5 | Hybrid, Parent Document Retriever, Contextual, Rewrite Retrieve Read, Corrective |
| FAISS | 5 | Unstructured, Basic Agentic, Self, Adaptive, ReAct |
| Pinecone | 1 | Naive RAG |
| Weaviate | 1 | Hyde RAG |
| Qdrant | 1 | RAG fusion |
| LangSmith | 1 | RAG fusion |
| Unstructured | 1 | Unstructured RAG |

vector store는 Chromadb, FAISS, Pinecone, Weaviate, Qdrant의 다섯 종이 쓰인다. Chromadb와 FAISS가 각 5종으로 대부분을 차지하고 나머지 셋은 한 번씩만 등장한다. 저장소가 특정 vector store를 표준으로 삼지 않았다는 뜻이다.

LangGraph의 분포는 더 뚜렷한 경향을 보인다. advanced 8종 중에서는 Unstructured RAG 하나에만 쓰이고, agentic 5종 중에서는 Basic Agentic RAG를 뺀 넷에 쓰인다. LangGraph가 상태를 가진 분기 흐름을 다루는 도구이므로, 실행 경로가 조건에 따라 바뀌는 기법에 몰린 결과다.

### 실행 방법

README는 두 가지 실행 경로를 제공한다.

| 경로 | 절차 | 필요한 것 |
|---|---|---|
| 로컬 clone | `git clone`으로 저장소를 받고 `cd rag-cookbooks`로 이동한 뒤 기법별 구현을 따라간다 | git과 로컬 실행 환경 |
| Colab 배지 | 카탈로그 표의 배지를 눌러 브라우저에서 노트북을 연다 | 브라우저와 구글 계정 |

Getting Started 절이 안내하는 단계는 clone과 디렉토리 이동 둘뿐이다. 의존성 설치 명령이나 Python 버전 요구사항은 README에 없다.

## 결과

### 저장소가 내놓는 산출물

README는 벤치마크 수치를 하나도 제시하지 않는다. 기법 간 성능 비교표, 데이터셋별 점수, 지연 시간이나 비용 측정값이 모두 없다. 이 저장소가 성능 비교 연구가 아니라 교육용 자료이기 때문이다.

| README가 제공한다고 밝힌 것 | README에 없는 것 |
|---|---|
| 13종의 end-to-end 구현 노트북 | 기법 간 성능 비교 수치 |
| 노트북마다 포함된 Athina AI 평가 단계 | 사용한 평가 지표의 이름과 값 |
| Colab에서 바로 여는 실행 경로 | 데이터셋 이름과 규모 |
| 기법별 참고 논문 링크 (노트북 안에 있다고 언급) | README 본문의 논문 링크 |
| 동작 시연 영상 | 재현 조건 (모델, 라이브러리 버전, 비용) |

그래서 이 자료로 답할 수 있는 질문과 답할 수 없는 질문이 갈린다. "Corrective RAG를 LangGraph로 어떻게 짜는가"는 노트북이 답한다. "Corrective RAG가 Hybrid RAG보다 내 문서에서 나은가"는 사용자가 직접 측정해야 한다. README가 평가를 범위에 넣은 이유도 이 두 번째 질문에 있다.

### 평가 서술의 위치

평가 절은 방법이 아니라 필요성을 설명한다. 평가가 개선 지점을 찾아주고 정보가 바뀌는 상황에서도 신뢰할 수 있는 응답을 확인하는 수단이라는 서술까지다. 어떤 지표를 어떤 값으로 얻었는지는 README에 나오지 않으며, 실제 평가 코드는 각 노트북 안에 있다.

## 한계

### 자료 자체의 한계

| 항목 | 내용 |
|---|---|
| 벤치마크 부재 | 기법 간 우열을 정량 비교할 데이터가 없다. 선택은 사용자의 측정에 맡겨진다 |
| 평가 단계의 플랫폼 의존 | 13종 전부가 Athina AI를 도구 열에 포함한다. 평가 절차를 그대로 재현하면 해당 플랫폼을 쓰게 된다. 계정이나 API 키 요구사항은 README에 적혀 있지 않다 |
| 참고 문헌이 README 밖에 있다 | README의 Note는 기법마다 연구 논문과 참고 자료를 포함한다고 밝히지만 본문에는 논문 링크가 하나도 없다 |
| 의존성 정보 부재 | 설치 명령, 요구 패키지 버전, Python 버전이 README에 없어 재현 조건을 알 수 없다 |
| 깊이의 한계 | 각 기법을 노트북 한 개 분량으로 다룬다. 프로덕션 규모 확장, 실패 사례, 파라미터 조정은 README 범위 밖이다 |

### README 내부의 불일치

README 본문만으로 확인되는 불일치가 셋 있다.

| 항목 | 내용 |
|---|---|
| 기여자 위젯의 대상 저장소 | Creators + Contributors 절의 이미지와 링크가 `athina-ai/cookbooks`를 가리킨다. 저장소 자체는 `athina-ai/rag-cookbooks`다 |
| 표 이름과 파일명의 어긋남 | "RAG fusion"은 `fusion_rag.ipynb`로, "Unstructured RAG"는 `basic_unstructured_rag.ipynb`로 연결된다 |
| naive RAG의 위치 | Note는 naive RAG를 이후 단계의 기초로 규정하지만, 카탈로그에서는 Advanced RAG 표의 첫 행에 들어가 있다 |

### 현재 raw로 검증할 수 없는 항목

이 stem의 `raw/repos/`는 저장소 전체 클론에서 README 본문 스텁으로 교체됐다. 그 결과 아래 항목은 현재 자료로 확인할 수 없으며, 필요하면 저장소를 직접 확인해야 한다.

| 항목 | 상태 |
|---|---|
| 노트북 내부 코드와 셀 구성 | 확인 불가. 노트북 파일이 raw에 없다 |
| 기법별 참고 논문 정보 | 확인 불가. README에 논문 링크가 없고 노트북도 없다 |
| 평가에 쓴 지표 이름과 값 | 확인 불가 |
| 의존성 목록과 Python 버전 | 확인 불가 |
| LICENSE 파일 원문과 저작권자 표기 | 확인 불가. 다만 README의 License 절이 MIT를 명시하므로 frontmatter의 `license: "MIT"`는 유지한다. 조항 원문은 저장소의 LICENSE 파일을 직접 확인할 것 |
| 샘플 데이터의 내용과 규모 | 확인 불가 |

한 가지 사항은 기록해 둘 값이 있다. 스텁 전환 이전 스냅샷의 파일 목록에는 `agentic_rag_techniques/react_rag.ipynb`가 없었고, 대신 `agent_techniques/react.ipynb`와 `agentic_rag_techniques/agentic_rag_using_deepseek_qdrant_and_langchain.ipynb`가 있었다. README의 ReAct RAG 행이 가리키는 경로와 어긋난다. 이 대조는 raw 아카이브의 git 이력을 근거로 한 것이며 현재 raw 본문으로는 확인되지 않는다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| Advanced RAG | 이 저장소의 첫 번째 분류 이름. naive RAG의 Indexing과 Retriever 단계를 변형해 검색 품질을 높이는 기법군을 가리킨다 |
| Agentic RAG | 이 저장소의 두 번째 분류 이름. 에이전트가 도구를 골라 쓰고 검색 결과에 따라 흐름을 바꾸는 RAG를 가리킨다 |
| HyDE | 질의에 답하는 가상의 문서를 먼저 만들고 그 임베딩으로 검색하는 기법. README는 hypothetical document embeddings로 설명한다 |
| Reciprocal Rank Fusion | 여러 sub-query의 검색 결과 순위를 합쳐 하나로 reranking하는 연산. RAG fusion의 핵심 단계다 |
| Parent Document Retriever | 작은 조각으로 검색하고 맞으면 원본 문서 전체를 돌려주는 retrieval 방식 |
| Athina AI | 이 저장소가 평가 단계에서 쓰는 RAG 평가 플랫폼. 13종 전부의 도구 열에 들어 있다 |

## 관련 페이지

- [[database/nirdiamant-rag-techniques]]: 같은 성격의 RAG 기법 카탈로그 저장소다. 기법 선정 범위와 설명 깊이를 비교하기 좋다.
- [[database/edge-2024-from-local-to-global]]: GraphRAG 원논문이다. 이 cookbook의 13종이 모두 vector store를 전제하는 것과 달리 지식 그래프를 인덱스로 삼는다.
- [[database/guo-2025-lightrag-simple-and-fast]]: 그래프 기반 인덱스를 가볍게 만드는 방향이다. cookbook이 다루지 않는 인덱스 구조 설계를 정면으로 다룬다.
- [[database/guo-2025-rag-anything-all-in-one-rag]]: 멀티모달 RAG다. cookbook의 Unstructured RAG가 노트북 한 개로 다루는 문제를 본격적으로 확장한다.
- [[database/hkuds-rag-anything]]: 위 논문의 구현 저장소다. cookbook과 같은 저장소 자료라 구성 방식을 비교할 수 있다.
- [[database/vectifyai-pageindex]]: vector store 없이 문서 구조를 따라가는 retrieval이다. cookbook의 전제와 대비된다.
- [[database/zhang-2025-pageindex-vectorless-reasoning-rag]]: 위 접근의 논문 쪽이다.
- [[database/li-2026-beyond-semantic-similarity-rethinking-retrieval]]: vector similarity라는 retrieval 인터페이스 자체를 재검토한다.
