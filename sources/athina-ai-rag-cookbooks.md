---
title: "Advanced + Agentic RAG Cookbooks (Athina AI, GitHub repo)"
type: repo
year: 2024
category: database
raw_path: raw/repos/athina-ai-rag-cookbooks.md
raw_filename: "athina-ai-rag-cookbooks.md"
source_collection: external
org: "athina-ai"
repo: "rag-cookbooks"
url: "https://github.com/athina-ai/rag-cookbooks"
license: "MIT"
tags: [rag, advanced-rag, agentic-rag, langchain, langgraph, hyde, hybrid-rag, corrective-rag, self-rag, adaptive-rag, react, rag-evaluation, athina, cookbook, repo, oss]
figures:
  - id: fig01
    label: final diagram
    kind: figure
    raw: https://github.com/user-attachments/assets/508b3a87-ac46-4bf7-b849-145c5465a6c0
    caption: "RAG의 네 구성 요소를 잇는 전체 흐름 도식. README의 RAG 소개 절에 실려 있다"
    strategy: manual
    curated: false
  - id: fig02
    label: evals diagram
    kind: figure
    raw: https://github.com/user-attachments/assets/65c2b5af-a931-40c5-b006-87567aef019f
    caption: "RAG 평가 흐름 도식. README의 평가 절에 실려 있다"
    strategy: manual
    curated: false
---

## 한 줄 요약 (One-line Summary)

Athina AI의 rag-cookbooks는 naive RAG를 출발점으로 advanced RAG 8종과 agentic RAG 5종, 합계 13종을 각각 Colab에서 바로 열리는 Jupyter 노트북 한 개로 정리한 학습용 레시피 모음이다. README는 기법 이름, 사용 도구, 한 줄 설명, Colab 링크의 네 열로 된 표 두 개로 카탈로그 전체를 제시하며, 13종 모두가 LangChain과 Athina AI 평가를 공통 스택으로 쓴다.

## 1. 자료 정보 (Document Information)

| 항목 | 값 |
|---|---|
| Org / Repo | `athina-ai/rag-cookbooks` |
| URL | https://github.com/athina-ai/rag-cookbooks |
| License | MIT. README의 License 절이 "This project is licensed under [MIT License](LICENSE)"로 명시한다 |
| 형식 | Jupyter notebook 컬렉션. 설치형 라이브러리나 패키지 API가 아니다 |
| README가 링크하는 노트북 | 13개 (advanced 8개, agentic 5개) |
| 공통 스택 | LangChain (13/13), Athina AI 평가 (13/13) |

현재 `raw/repos/athina-ai-rag-cookbooks.md`는 저장소 전체 클론이 아니라 README 본문 스텁이다. 노트북 내부 코드, 의존성 목록, Python 버전 요구사항, LICENSE 파일 원문은 이 자료로 확인할 수 없다. 아래 서술은 전부 README 본문에서 확인되는 범위로 제한한다.

README는 Colab 배지 링크로 노트북 경로를 노출한다. 링크에서 읽어낸 경로는 다음과 같다.

| 디렉토리 | 노트북 파일 |
|---|---|
| `advanced_rag_techniques/` | `naive_rag.ipynb`, `hybrid_rag.ipynb`, `hyde_rag.ipynb`, `parent_document_retriever.ipynb`, `fusion_rag.ipynb`, `contextual_rag.ipynb`, `rewrite_retrieve_read.ipynb`, `basic_unstructured_rag.ipynb` |
| `agentic_rag_techniques/` | `basic_agentic_rag.ipynb`, `corrective_rag.ipynb`, `self_rag.ipynb`, `adaptive_rag.ipynb`, `react_rag.ipynb` |

## 2. 주요 기여 (Key Contributions)

1. RAG 기법 카탈로그의 단일 진입점. README는 저장소의 목적을 "advanced RAG 기법을 프로젝트에 쓰려는 연구자와 개발자를 위한 자료"로 규정한다. 두 가지 진입장벽을 명시적으로 겨냥한다. 기법을 처음부터 구현하는 데 시간이 든다는 점, 그리고 적절한 평가 방법을 찾기 어렵다는 점이다. 저장소는 바로 쓸 수 있는 구현과 평가 방법 안내를 함께 제공해 이 과정을 단순화한다고 밝힌다.
2. 난이도 순서를 가진 배열. README의 Note는 저장소가 naive RAG를 기초로 삼아 advanced와 agentic으로 나아간다고 적는다. 카탈로그가 무작위 목록이 아니라 학습 순서를 가진 구성이라는 뜻이다.
3. 표 형태의 비교 가능한 카탈로그. 두 표가 기법마다 같은 네 열(기법, 도구, 설명, 노트북)을 채운다. 같은 속성을 나란히 비교할 수 있다.
4. 평가를 파이프라인의 일부로 둔 구성. README는 "이 노트북들은 end-to-end RAG 구현과 Athina AI에서의 RAG 평가 부분을 함께 담고 있다"고 적는다. 구현만 보여주고 끝내지 않는다는 것이 저장소의 설계 선택이다.
5. 백엔드를 고정하지 않은 예제 구성. 13개 노트북이 서로 다른 vector store 다섯 종을 나눠 쓴다. 특정 벤더에 묶이지 않은 형태로 기법을 익히게 한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

저장소는 라이브러리가 아니라 노트북 컬렉션이다. README가 제시하는 구조는 두 가지다. RAG 자체의 네 구성 요소, 그리고 기법 카탈로그 두 개다.

### RAG의 네 구성 요소

README는 RAG 소개 절에서 구성 요소 네 개를 정의한다.

| 구성 요소 | README의 정의 |
|---|---|
| Indexing | 형식을 가리지 않고 문서를 chunk로 나누고, 각 chunk의 임베딩을 만들어 vector store에 적재한다 |
| Retriever | vector store의 vector similarity 같은 기법으로 사용자 질의에 가장 관련 있는 문서를 찾는다 |
| Augment | 사용자 질의와 찾아온 컨텍스트를 하나의 프롬프트로 결합해 모델이 필요한 정보를 갖추게 한다 |
| Generate | 결합된 질의와 프롬프트를 모델에 넘겨 최종 응답을 생성한다 |

README는 이 구조가 필요한 이유도 함께 적는다. 대형 언어 모델은 고정된 데이터셋으로 학습해 비공개 정보나 최신 정보를 다루기 어렵고, 틀렸지만 그럴듯한 답을 내놓는 환각이 발생한다. fine-tuning으로 보완할 수 있지만 비용이 크고 새 데이터가 들어올 때마다 재학습하기에 적합하지 않다. RAG는 외부 문서를 in-context learning 형태로 넣어 이 문제를 다룬다.

### Advanced RAG 8종

README 표를 그대로 옮긴 것이다. 설명 열은 README의 한 줄 설명을 옮겼다.

| 기법 | 도구 | README의 설명 | 노트북 |
|---|---|---|---|
| Naive RAG | LangChain, Pinecone, Athina AI | 찾아온 데이터를 LLM과 결합해 단순하고 효과적인 응답을 만든다 | `naive_rag.ipynb` |
| Hybrid RAG | LangChain, Chromadb, Athina AI | vector 검색과 BM25 같은 전통적 방법을 결합해 검색 품질을 높인다 | `hybrid_rag.ipynb` |
| Hyde RAG | LangChain, Weaviate, Athina AI | 가상의 문서 임베딩을 만들어 질의에 관련된 정보를 찾는다 | `hyde_rag.ipynb` |
| Parent Document Retriever | LangChain, Chromadb, Athina AI | 큰 문서를 작은 조각으로 나누고, 조각이 질의와 맞으면 문서 전체를 반환한다 | `parent_document_retriever.ipynb` |
| RAG fusion | LangChain, LangSmith, Qdrant, Athina AI | sub-query를 생성하고 Reciprocal Rank Fusion으로 문서를 reranking한 뒤 상위 결과를 쓴다 | `fusion_rag.ipynb` |
| Contextual RAG | LangChain, Chromadb, Athina AI | 찾아온 문서를 압축해 관련 있는 세부만 남기고 간결하고 정확한 응답을 만든다 | `contextual_rag.ipynb` |
| Rewrite Retrieve Read | LangChain, Chromadb, Athina AI | 질의를 개선하고 더 나은 데이터를 찾아 정확한 답을 생성한다 | `rewrite_retrieve_read.ipynb` |
| Unstructured RAG | LangChain, LangGraph, FAISS, Athina AI, Unstructured | 텍스트, 표, 이미지가 섞인 문서를 다루도록 설계된 방법이다 | `basic_unstructured_rag.ipynb` |

### Agentic RAG 5종

| 기법 | 도구 | README의 설명 | 노트북 |
|---|---|---|---|
| Basic Agentic RAG | LangChain, FAISS, Athina AI | AI 에이전트가 vectordb와 web search 같은 도구를 써서 답을 찾고 생성한다 | `basic_agentic_rag.ipynb` |
| Corrective RAG | LangChain, LangGraph, Chromadb, Athina AI | 관련 문서를 정제하고 관련 없는 문서를 제거하거나 web search를 수행한다 | `corrective_rag.ipynb` |
| Self RAG | LangChain, LangGraph, FAISS, Athina AI | 찾아온 데이터를 되짚어 정확하고 완결된 응답을 보장한다 | `self_rag.ipynb` |
| Adaptive RAG | LangChain, LangGraph, FAISS, Athina AI | 질의 유형에 따라 색인 데이터와 web search 중에서 검색 방식을 조정한다 | `adaptive_rag.ipynb` |
| ReAct RAG | LangChain, LangGraph, FAISS, Athina AI | 추론과 검색을 결합해 컨텍스트를 고려한 응답을 만드는 시스템이다 | `react_rag.ipynb` |

### 스택 분포

두 표의 도구 열을 세면 다음과 같다. README 본문에서 직접 계산한 값이다.

| 도구 | 등장 노트북 수 | 비중 |
|---|---|---|
| LangChain | 13 | 13종 전체 |
| Athina AI | 13 | 13종 전체 |
| LangGraph | 5 | Unstructured RAG와 agentic 4종 (Corrective, Self, Adaptive, ReAct) |
| Chromadb | 5 | Hybrid, Parent Document Retriever, Contextual, Rewrite Retrieve Read, Corrective |
| FAISS | 5 | Unstructured, Basic Agentic, Self, Adaptive, ReAct |
| Pinecone | 1 | Naive RAG |
| Weaviate | 1 | Hyde RAG |
| Qdrant | 1 | RAG fusion |
| LangSmith | 1 | RAG fusion |
| Unstructured | 1 | Unstructured RAG |

vector store는 다섯 종이 쓰이며 Chromadb와 FAISS가 각 5종으로 가장 많다. LangGraph는 agentic 5종 중 4종에 들어가고 advanced 8종 중에서는 Unstructured RAG 하나에만 쓰인다. 제어 흐름이 분기하는 기법에 LangGraph가 몰려 있다는 뜻이다.

### 실행 방법

README의 Getting Started 절은 두 단계만 안내한다. `git clone https://github.com/athina-ai/rag-cookbooks.git`으로 저장소를 받고 `cd rag-cookbooks`로 이동한 뒤, 기법별 구현을 따라가라는 것이다. 의존성 설치 명령이나 Python 버전 요구사항은 README에 없다. 각 기법 행의 Colab 배지를 통해 저장소를 받지 않고 브라우저에서 노트북을 여는 경로도 함께 제공한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

README는 어떤 벤치마크 수치도 제시하지 않는다. 기법 간 성능 비교표, 데이터셋별 점수, 지연 시간이나 비용 측정값이 모두 없다. 저장소가 내세우는 산출물은 수치가 아니라 실행 가능한 구현과 평가 절차다.

| README가 제공한다고 밝힌 것 | README에 없는 것 |
|---|---|
| 13종의 end-to-end 구현 노트북 | 기법 간 성능 비교 수치 |
| 노트북마다 포함된 Athina AI 평가 단계 | 사용한 평가 지표의 이름과 값 |
| Colab에서 바로 여는 실행 경로 | 데이터셋 이름과 규모 |
| 기법별 참고 논문 링크 (노트북 안에 있다고 언급) | README 본문의 논문 링크 |
| 동작 시연 영상 | 재현 조건 (모델, 버전, 비용) |

README는 평가의 필요성을 별도 절로 설명한다. RAG 시스템이 정보 검색과 생성 모델을 얼마나 잘 결합하는지 정확성과 관련성으로 확인할 수 있고, 이 평가가 텍스트 요약, 챗봇, 질의응답 같은 과제에서 개선 지점을 찾아준다는 서술이다. 다만 어떤 지표를 어떤 값으로 얻었는지는 README에 나오지 않는다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- 벤치마크 부재. 기법 간 우열을 정량 비교할 데이터가 README에 없다. 어떤 기법이 특정 데이터에 더 나은지는 사용자가 직접 측정해야 한다.
- 평가 단계의 플랫폼 의존. 13종 전부가 Athina AI를 도구 열에 포함한다. 평가 절차를 그대로 재현하려면 해당 플랫폼을 쓰게 된다. 계정이나 API 키 요구사항은 README에 적혀 있지 않다.
- 참고 문헌이 README 밖에 있다. README의 Note는 각 RAG 기법의 연구 논문과 참고 자료를 포함한다고 밝히지만, README 본문에는 논문 링크가 하나도 없다. 논문 정보는 노트북 안에 있고 현재 raw 자료로는 확인할 수 없다.
- 의존성 정보 부재. Getting Started가 clone과 디렉토리 이동만 안내한다. 설치 명령, 요구 패키지 버전, Python 버전이 README에 없어 재현 조건을 알 수 없다.
- 카탈로그 명칭과 파일명의 불일치. 표의 기법 이름과 Colab 링크의 파일명이 어긋나는 항목이 있다. "RAG fusion"은 `fusion_rag.ipynb`로, "Unstructured RAG"는 `basic_unstructured_rag.ipynb`로 연결된다.
- 기여자 위젯이 다른 저장소를 가리킨다. Creators + Contributors 절의 이미지와 링크가 `athina-ai/cookbooks`를 대상으로 삼는데, 저장소 자체는 `athina-ai/rag-cookbooks`다. README 안에서 확인되는 내적 불일치다.
- naive RAG의 위치가 두 서술 사이에서 흔들린다. Note는 naive RAG를 이후 단계의 기초로 규정하지만, 카탈로그에서는 Advanced RAG 표의 첫 행으로 들어가 있다.
- 자료 계층의 한계. 저장소 클론이 README 스텁으로 교체되면서 노트북 코드와 LICENSE 파일이 raw에서 사라졌다. README가 명시한 MIT 표기는 확인되지만 LICENSE 파일 원문과 저작권자 표기는 현재 raw로 검증할 수 없다.

## 6. 관련 연구 (Related Work)

- [[database/nirdiamant-rag-techniques]]. 같은 성격의 RAG 기법 카탈로그 저장소다. 두 자료를 나란히 보면 기법 선정과 설명 깊이의 차이를 비교할 수 있다.
- [[database/edge-2024-from-local-to-global]]. GraphRAG 원논문이다. 이 cookbook의 13종이 모두 vector store를 전제하는 것과 달리 지식 그래프를 인덱스로 삼는 계열의 출발점이다.
- [[database/guo-2025-lightrag-simple-and-fast]]. 그래프 기반 인덱스를 가볍게 만드는 방향이다. cookbook이 다루지 않는 인덱스 구조 설계 문제를 정면으로 다룬다.
- [[database/guo-2025-rag-anything-all-in-one-rag]]와 [[database/hkuds-rag-anything]]. 멀티모달 RAG다. cookbook의 Unstructured RAG가 한 노트북 분량으로 다루는 텍스트와 표와 이미지 혼재 문제를 본격적으로 다룬다.
- [[database/vectifyai-pageindex]]와 [[database/zhang-2025-pageindex-vectorless-reasoning-rag]]. vector store 없이 문서 구조를 따라가는 retrieval이다. cookbook의 전제와 대비되는 접근이다.
- [[database/li-2026-beyond-semantic-similarity-rethinking-retrieval]]. vector similarity라는 retrieval 인터페이스 자체를 재검토한다.

## 7. 용어집 (Glossary)

- Advanced RAG: 이 저장소가 쓰는 분류 이름이다. naive RAG의 Indexing과 Retriever 단계를 변형해 검색 품질을 높이는 기법군을 가리킨다.
- Agentic RAG: 이 저장소의 두 번째 분류 이름이다. AI 에이전트가 vectordb와 web search 같은 도구를 골라 쓰고 검색 결과를 되짚어 흐름을 바꾸는 RAG를 가리킨다.
- HyDE: 질의에 답하는 가상의 문서를 먼저 만들고 그 임베딩으로 검색하는 기법이다. README는 "hypothetical document embeddings"로 설명한다.
- Reciprocal Rank Fusion: 여러 sub-query의 검색 결과 순위를 합쳐 하나로 reranking하는 연산이다. RAG fusion의 핵심 단계다.
- Parent Document Retriever: 작은 조각으로 검색하고 맞으면 원본 문서 전체를 돌려주는 retrieval 방식이다.
- Athina AI: 이 저장소가 평가 단계에서 쓰는 RAG 평가 플랫폼이다. 13종 전부의 도구 열에 들어 있다.
- Unstructured: 텍스트와 표와 이미지가 섞인 문서를 파싱하는 도구다. Unstructured RAG 노트북의 도구 열에만 등장한다.

## 8. 그림 후보 (Figure Candidates)

이 저장소는 `raw/repos/{stem}-figures/` 디렉토리를 만들지 않는다. repo 자료는 저장소 안의 이미지를 그 자리에서 참조하는 것이 규약이기 때문이다. README 본문에 실린 이미지 두 장은 GitHub의 user-attachments 주소를 가리키며, 자동 수집 대상이 아니다. 아래 캡션은 이미지 파일을 열어 확인한 것이 아니라 README의 alt text와 배치 위치만으로 작성했다.

| id | 위치 | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | README RAG 소개 절 | RAG의 네 구성 요소를 잇는 전체 흐름 도식 | manual | (확인 필요, 원본 이미지 미확인) |
| fig02 | README 평가 절 | RAG 평가 흐름 도식 | manual | (확인 필요, 원본 이미지 미확인) |

README의 Demo 절에는 각 노트북 동작을 보여주는 영상 첨부 링크가 하나 더 있다. 영상은 이미지 후보가 아니므로 위 표에 넣지 않았다.
