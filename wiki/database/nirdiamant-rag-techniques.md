---
title: "Advanced RAG Techniques (NirDiamant, GitHub repo)"
type: repo
year: 2024
category: database
raw_path: raw/repos/nirdiamant-rag-techniques.md
raw_filename: "nirdiamant-rag-techniques.md"
source_collection: external
source: nirdiamant-rag-techniques.md
org: "NirDiamant"
repo: "RAG_Techniques"
url: "https://github.com/NirDiamant/RAG_Techniques"
license: "Custom non-commercial (Nir Diamant), 비상업 사용만 허용, 상업 사용은 별도 서면 허가 필요"
tags: [rag, advanced-rag, agentic-rag, langchain, llamaindex, hyde, hype, semantic-chunking, proposition-chunking, fusion-retrieval, reranking, raptor, graph-rag, self-rag, corrective-rag, memorag, rag-evaluation, deepeval, grouse, cookbook, repo, oss]
---

## 요약

NirDiamant의 RAG_Techniques는 RAG 기법 하나하나를 실행 가능한 Jupyter 노트북으로 옮겨 모아 놓은 학습용 저장소다. README는 스스로를 "A community-driven hub of 42+ runnable notebooks covering RAG techniques from foundational to cutting-edge"로 소개한다. README가 링크하는 서로 다른 노트북 경로를 세어 보면 실제로 42개이므로 이 수치는 자료 안에서 확인된다.

이 저장소의 쓸모는 개별 기법의 깊이가 아니라 배열에 있다. 기본 RAG에서 출발해 chunk 설계, 질의 변환, 컨텍스트 보강, 고급 retrieval, 반복과 적응, 평가, 메모리, 설명 가능성, 고급 아키텍처까지 이어지는 순서로 기법을 늘어놓고, 각 기법에 Overview와 Implementation 두 소절을 붙인다. 모든 항목에 Colab 실행 배지가 있어 설치 없이 브라우저에서 같은 자료로 여러 기법을 나란히 실행해 볼 수 있다.

실무에 들이기 전 확인할 조건은 라이선스다. README는 "custom non-commercial license"라고만 적고 세부 조항은 `LICENSE` 파일로 넘긴다. 상업 사용 가부, attribution 의무, 기여물의 권리 귀속은 README만으로는 확인되지 않는다.

## 배경

RAG는 외부 자료에서 관련 정보를 찾아 프롬프트에 넣고 답을 생성하는 구조다. 구조가 단순해 보이지만 실제 품질은 여러 단계의 선택이 겹쳐 결정된다. 자료를 어떤 단위로 쪼갤지, 질의를 그대로 쓸지 바꿔 쓸지, 후보를 얼마나 넓게 뽑고 어떻게 다시 좁힐지, 생성 결과를 어떤 지표로 잴지가 모두 별개의 설계 문제다.

문제가 단계별로 흩어져 있다는 점이 기법 카탈로그가 필요한 이유다. 논문 하나는 대개 한 단계만 다루고, 프레임워크 문서는 API 사용법만 알려준다. 자기 데이터에 무엇이 맞는지 알려면 여러 기법을 같은 조건에서 실행해 보는 편이 빠르다.

### RAG 파이프라인의 단계 구분

이 저장소가 기법을 나누는 기준은 파이프라인의 어느 지점에 개입하는가다.

| 단계 | 개입 대상 | 이 저장소의 해당 기법 |
|---|---|---|
| 색인 이전 | 자료를 쪼개는 단위 | Choose Chunk Size, Proposition Chunking, Semantic Chunking |
| 색인 시점 | 무엇을 임베딩해 저장할지 | HyPE, Contextual Chunk Headers, Document Augmentation, Hierarchical Indices |
| 질의 시점 | 질의 문자열 자체 | Query Transformations, HyDE, Adaptive Retrieval |
| 후보 선택 | 어떤 후보를 얼마나 가져올지 | Fusion Retrieval, Multi-faceted Filtering, Dartboard Retrieval |
| 후보 정제 | 가져온 후보를 다시 다듬는 처리 | Intelligent Reranking, Contextual Compression, Relevant Segment Extraction |
| 생성 제어 | 생성 전후의 자가 점검 | Self RAG, Corrective RAG, Reliable RAG |
| 측정 | 결과 품질의 정량화 | DeepEval, GroUSE, End-to-End, Open-RAG-Eval |

임베딩 이전 단계까지 독립 기법으로 분리한 점이 이 저장소의 특징이다. retrieval과 생성만 다루는 자료에서는 chunk 크기 선택이나 명제 단위 분해가 별도 항목으로 등장하지 않는다.

### 저자 생태계

저장소는 단독으로 존재하지 않고 저자의 다른 자료와 묶여 있다. README가 밝히는 연결 대상은 다음과 같다.

| 자료 | README 설명 |
|---|---|
| DiamantAI 뉴스레터 | 구독자 5만 명 이상. 기법별 해설 글 5편을 Additional Resources로 링크 |
| 도서 *RAG Made Simple* | 400쪽 분량. Amazon Bestseller in Generative AI, 독자 1,500명 이상, 별점 4.6 |
| 코스 *Prompt to Production* | 대기자 명단 모집 중 |
| Agents Towards Production | 프로덕션 등급 GenAI agent 출하를 위한 code-first 튜토리얼 |
| GenAI Agents | AI agent 구현과 튜토리얼 모음 |
| Prompt Engineering Techniques | 기초부터 고급까지의 프롬프트 전략 |
| Agent Memory Techniques | agent 메모리 노트북 30개. vector store, knowledge graph, Mem0, MemGPT, Zep, Graphiti |

## 핵심 개념

**chunk**는 자료를 검색 단위로 쪼갠 조각을 말한다. 조각이 너무 작으면 문맥이 끊기고 너무 크면 관련 없는 내용이 함께 딸려 온다. 이 저장소는 chunk를 고정 크기로 자르는 방법, 완결된 사실 진술 단위로 자르는 방법, 의미 응집도로 자르는 방법을 각각 별개 노트북으로 다룬다.

**retrieval**은 외부 지식에서 관련 정보를 찾아오는 단계다. 임베딩 기반 retrieval은 질의와 자료를 같은 벡터 공간에 놓고 거리로 관련성을 판단한다. 질의는 짧은 질문이고 자료는 긴 서술이라 표현 형태가 애초에 다르며, 이 차이를 줄이려는 시도가 HyDE와 HyPE다.

**reranking**은 1차 검색이 뽑은 후보를 더 정밀한 모델로 다시 정렬하는 단계다. 1차 검색은 속도를 위해 근사 계산을 쓰므로 순위가 거칠다. 후보를 넉넉히 뽑아 놓고 상위 몇 개만 정밀 모델에 넘기면 비용을 크게 늘리지 않고 순위를 개선할 수 있다.

**grounding**은 모델 출력을 검색해 온 근거에 붙들어 매는 것을 뜻한다. 근거에 없는 내용을 지어내는 환각을 줄이는 것이 목적이며, 이 저장소의 Reliable RAG와 Self RAG, Corrective RAG가 각기 다른 방식으로 이 문제를 다룬다.

**multi-hop 질문**은 답을 얻으려면 서로 다른 자리의 정보를 두 번 이상 이어 붙여야 하는 질문을 가리킨다. 한 번의 유사도 검색으로는 중간 연결 고리가 걸리지 않아 답이 나오지 않는다. 이 저장소의 Graph RAG 계열과 하위 질의 분해가 이 문제를 겨냥한다.

**agentic RAG**는 검색과 생성을 한 번에 끝내지 않고, planning과 재시도를 포함한 여러 단계로 나눠 수행하는 구조다. planning은 목표를 하위 단계로 쪼개 실행 순서를 정하는 과정을 가리킨다. 단순 의미 유사도로는 풀리지 않는 복합 질문을 대상으로 한다.

## 방법

### 저장소의 이중 구조

README는 같은 내용을 두 번 제시한다. 먼저 35행짜리 마스터 표로 전체를 한눈에 보여주고, 그 아래에서 항목마다 Overview와 Implementation을 붙인 상세 섹션으로 다시 나열한다. 두 표현이 서로 완전히 일치하지 않는다는 점이 이 저장소를 읽을 때 주의할 지점이며, 구체적인 불일치는 한계 절에 정리했다.

### 카테고리 10종

마스터 표의 Category 열에는 서로 다른 라벨이 10종 등장한다. 상세 섹션 제목도 10개이지만 이름이 정확히 대응하지는 않는다.

| 마스터 표 카테고리 | 행 수 | 대응하는 상세 섹션 제목 |
|---|---|---|
| Foundational 🌱 | 5 | Foundational RAG Techniques |
| Query Enhancement 🔍 | 3 | Query Enhancement |
| Context Enrichment 📚 | 6 | Context and Content Enrichment |
| Advanced Retrieval 🚀 | 6 | Advanced Retrieval Methods |
| Iterative Techniques 🔁 | 2 | Iterative and Adaptive Techniques |
| Evaluation 📊 | 4 | Evaluation |
| Explainability 🔬 | 1 | Explainability and Transparency |
| Advanced Architecture 🏗️ | 6 | Advanced Architectures |
| Advanced 🔬 | 1 | Memory-Augmented Retrieval 🧠 |
| Special Technique 🌟 | 1 | Special Advanced Technique 🌟 |

상세 섹션은 `###` 수준 제목 9개와 `##` 수준 제목 1개로 나뉜다. MemoRAG 한 항목은 마스터 표에서 "Advanced 🔬", 상세 섹션에서 "Memory-Augmented Retrieval 🧠"이라는 다른 이름으로 불린다.

### 노트북 42개의 내역

마스터 표 35행 가운데 34행이 저장소 안의 노트북을 가리키고, 마지막 35행은 별도 저장소를 가리키는 링크다. 나머지 8개 노트북은 상세 섹션에만 링크되어 있어 마스터 표만 보면 놓친다.

| 구간 | 노트북 수 |
|---|---|
| 마스터 표 1행부터 34행까지의 노트북 | 34 |
| 마스터 표 35행(외부 저장소 링크, 노트북 아님) | 0 |
| 상세 섹션에만 있는 LlamaIndex 병행 구현 | 5 |
| 상세 섹션에만 있는 JSON RAG | 1 |
| 상세 섹션에만 있는 Graph RAG with Milvus | 1 |
| 상세 섹션에만 있는 Colpali multi-modal | 1 |
| 합계 | 42 |

README 전체에서 추출한 서로 다른 `.ipynb` 파일명은 43개인데, 그중 `HyPE_Hypothetical_Prompt_Embedding.ipynb`(단수형)와 `HyPE_Hypothetical_Prompt_Embeddings.ipynb`(복수형)는 같은 노트북의 표기 변형이라 하나는 깨진 링크다. 디렉토리로 보면 `all_rag_techniques/`에 38개, `evaluation/`에 4개가 들어 있어 합이 42개다. 같은 기법의 CLI 실행용 `.py` 스크립트는 `all_rag_techniques_runnable_scripts/`에 19개 있다. 즉 42개 기법 노트북 가운데 19개만 스크립트 형태를 함께 제공한다.

### 노트북 항목의 공통 구성

상세 섹션의 각 항목은 정해진 틀을 따른다. 제목 줄에 GitHub 보기 배지와 Colab 실행 배지를 놓고, 프레임워크가 두 가지면 LangChain과 LlamaIndex를 각각 줄로 나눈다. 그 아래에 Overview와 Implementation 두 소절을 두고, 참고 자료가 있으면 Additional Resources 소절을 덧붙인다.

| 구성 요소 | README 안의 개수 | 내용 |
|---|---|---|
| Overview 소절 | 37 | 기법이 무엇을 하는지 한두 문장 |
| Implementation 소절 | 37 | 구현 방식. 구성 요소가 여럿이면 불릿으로 나열 |
| Additional Resources 소절 | 7 | 뉴스레터 해설 5편, 외부 구현체 dsRAG 1건, SSRN 프리프린트 1건 |

Overview와 Implementation 쌍이 37개인데 마스터 표는 35행이다. 상세 섹션에만 있는 항목이 있기 때문이며, 두 목록을 함께 봐야 전체가 드러난다.

Additional Resources에 붙은 뉴스레터 해설 5편은 다음 기법을 다룬다.

| 해설 글 제목 | 대상 기법 |
|---|---|
| The Propositions Method: Enhancing Information Retrieval for AI Systems | Proposition Chunking |
| HyDE: Exploring Hypothetical Document Embeddings for AI Retrieval | HyDE |
| Semantic Chunking: Improving AI Information Retrieval | Semantic Chunking |
| Relevance Revolution: How Re-ranking Transforms RAG Systems | Intelligent Reranking |
| Hierarchical Indices: Enhancing RAG Systems | Hierarchical Indices |

해설 글이 붙은 다섯 기법은 저자가 별도 글로 풀어 쓸 만큼 중요하게 본 항목으로 볼 수 있다. 해설 글이 없는 나머지 기법에는 README의 두 문단 설명이 유일한 산문 자료다.

### 실행 스크립트 제공 범위

노트북 42개 가운데 CLI 실행용 `.py` 스크립트를 함께 제공하는 기법은 19개다. 마스터 표의 카테고리 기준으로 보면 제공 범위가 고르지 않다.

| 마스터 표 카테고리 | 표의 행 수 | 스크립트 제공 |
|---|---|---|
| Foundational 🌱 | 5 | 2 |
| Query Enhancement 🔍 | 3 | 3 |
| Context Enrichment 📚 | 6 | 4 |
| Advanced Retrieval 🚀 | 6 | 3 |
| Iterative Techniques 🔁 | 2 | 2 |
| Evaluation 📊 | 4 | 0 |
| Explainability 🔬 | 1 | 1 |
| Advanced Architecture 🏗️ | 6 | 4 |
| Advanced 🔬 (MemoRAG) | 1 | 0 |
| Special Technique 🌟 | 1 | 0 |

평가 노트북 4종에는 스크립트가 하나도 없다. 평가는 결과를 눈으로 확인하며 지표를 조정하는 작업이라 노트북 형태가 더 맞는다고 볼 수 있으나, 평가를 정기 실행에 넣으려면 사용자가 직접 스크립트로 옮겨야 한다.

외부 플랫폼에 의존하는 항목(Agentic RAG, Graph RAG with Milvus, Microsoft GraphRAG, MemoRAG)에도 스크립트가 없다. 스크립트 제공 여부가 재현 난이도와 어느 정도 함께 움직인다.

README 안에서 스크립트 링크 19개 중 17개는 저장소 루트 기준 상대 경로이고 2개만 전체 URL이다. 상대 경로 링크는 GitHub 웹에서 열면 동작하지만 다른 문맥에 README를 옮겨 붙이면 끊긴다.

### 기초 단계

Foundational에 속한 여섯 항목은 파이프라인을 처음 세우고 chunk 단위를 정하는 데 초점이 있다.

| 기법 | 무엇을 하는가 | 어떻게 구현하는가 |
|---|---|---|
| Simple RAG | 입문자용 기본 RAG | 기본 retrieval 질의에서 시작해 점진적 학습 장치를 결합 |
| Simple RAG using a CSV file | CSV 파일 기반 기본 RAG | CSV로 기본 retrieval을 만들고 OpenAI와 결합해 질의응답 구성 |
| Simple RAG with JSON | JSON 파일 기반 RAG | 항목마다 여러 필드를 가진 JSON을 적재하고 관련성 높은 텍스트 필드를 합쳐 임베딩 |
| Reliable RAG | Simple RAG에 검증과 정제를 추가 | 검색 문서의 relevancy를 확인하고 답변에 실제로 쓰인 문서 구간을 표시 |
| Choose Chunk Size | 컨텍스트 보존과 retrieval 효율의 균형점 찾기 | 여러 chunk 크기를 실험해 사용 사례별 최적점을 결정 |
| Proposition Chunking | 텍스트를 간결하고 완결적인 문장으로 분해 | LLM과 전용 프롬프트로 사실 진술을 생성한 뒤 네 기준으로 채점 |

Proposition Chunking의 채점 기준 네 가지는 정확성, 명료성, 완결성, 간결성이다. chunk를 자르기만 하고 끝내지 않고 생성된 명제의 품질을 다시 판정하는 구조라, chunking을 한 번의 전처리가 아니라 생성과 검증의 두 단계로 다룬다.

Reliable RAG는 답변에 쓰인 근거 구간을 표시한다는 점에서 뒤에 나올 Explainable Retrieval과 목적이 겹친다. 다만 Reliable RAG는 답변 쪽 근거를 표시하고 Explainable Retrieval은 검색 쪽 이유를 설명한다.

### 질의 강화

질의와 자료는 형태가 다르다. 질의는 짧은 의문문이고 자료는 긴 서술문이라, 같은 내용을 담아도 임베딩 공간에서 멀어질 수 있다. Query Enhancement에 속한 기법들은 이 차이를 줄이는 서로 다른 방법이다.

| 기법 | 내용 |
|---|---|
| Query Transformations | 질의 재작성, step-back prompting, 하위 질의 분해 세 가지를 함께 다룸 |
| HyDE | 질의로부터 가상의 자료를 만들고 그 임베딩으로 검색 |
| HyPE | 인덱싱 시점에 chunk마다 가상 질문을 만들어 두고 질의를 그 질문들과 대조 |

step-back prompting은 원래 질의보다 한 단계 넓은 질의를 만들어 배경 정보를 함께 가져오는 방법이다. 하위 질의 분해는 복합 질문을 단순 질문 여러 개로 쪼개 각각 검색한다.

HyDE와 HyPE는 같은 문제에 대한 반대 방향의 해법이다. HyDE는 질의를 자료 쪽으로 옮기고, HyPE는 자료를 질의 쪽으로 옮긴다.

| 항목 | HyDE | HyPE |
|---|---|---|
| 무엇을 미리 만드는가 | 질의에 답할 법한 가상 자료 | chunk마다 나올 법한 가상 질문 여러 개 |
| 만드는 시점 | 질의 시점 | 인덱싱 시점 |
| 색인에 저장하는 것 | 원본 chunk의 임베딩 | 가상 질문의 임베딩 |
| retrieval이 맞추는 대상 | 가상 자료와 chunk | 사용자 질의와 가상 질문 |
| 질의 시점 LLM 호출 | 필요 | 불필요 |
| README가 적은 효과 | 질의와 데이터의 정렬 개선 | context precision 최대 42%p, claim recall 최대 45%p 향상 |

HyPE가 질의 시점 LLM 호출을 없앤다는 점은 비용과 지연 양쪽에서 의미가 있다. 대신 인덱싱 비용이 늘어난다. chunk 하나당 질문을 여러 개 생성해야 하므로 색인을 만들 때 LLM 호출이 chunk 수의 배수만큼 발생한다. README는 인덱싱 비용 증가분을 수치로 적지 않는다.

### 컨텍스트 보강

chunk는 잘리는 순간 주변 정보를 잃는다. 어느 문서의 어느 절에서 나왔는지, 앞뒤 문장이 무엇이었는지가 사라지면 같은 문장이라도 검색과 이해가 모두 어려워진다. Context and Content Enrichment의 기법들은 잃어버린 주변 정보를 되돌려주는 방법들이다.

| 기법 | 내용 |
|---|---|
| Contextual Chunk Headers | 문서 수준과 섹션 수준 컨텍스트를 헤더로 만들어 chunk 앞에 붙인 뒤 임베딩. 오픈소스 retrieval 엔진 dsRAG가 구현체 |
| Relevant Segment Extraction | retrieval 후처리로 관련 chunk를 분석해 더 긴 multi-chunk 구간을 동적으로 구성 |
| Context Enrichment Window | 문장 단위로 임베딩한 뒤 가장 관련성 높은 문장의 원문 앞뒤 문장까지 함께 가져옴 |
| Semantic Chunking | 고정 크기 대신 의미 응집도로 분할. NLP 기법으로 주제 경계를 찾음 |
| Contextual Compression | 질의 관련 내용을 보존하면서 검색된 chunk를 LLM으로 압축하거나 요약 |
| Document Augmentation | 각 문서 조각에서 나올 법한 질문들을 LLM으로 생성해 붙여 검색될 확률을 높임 |

이 여섯 기법은 개입 시점이 서로 다르다. Contextual Chunk Headers, Semantic Chunking, Document Augmentation은 색인을 만들 때 작동하고, Relevant Segment Extraction과 Contextual Compression은 검색이 끝난 뒤 작동한다. Context Enrichment Window는 색인은 문장 단위로 만들되 반환은 구간 단위로 하므로 양쪽에 걸친다.

Document Augmentation은 HyPE와 발상이 비슷하다. 둘 다 chunk에서 질문을 생성해 검색 가능성을 높인다. 차이는 생성한 질문을 chunk에 덧붙이는가(Document Augmentation) 아니면 chunk를 대신해 저장하는가(HyPE)에 있다.

### 고급 retrieval

Advanced Retrieval의 여섯 기법은 후보를 넓히는 쪽과 다시 좁히는 쪽으로 나뉜다.

| 기법 | 내용 |
|---|---|
| Fusion Retrieval | keyword 기반 검색과 vector 기반 검색을 결합. README는 특정 keyword 검색 알고리즘 이름을 적지 않음 |
| Intelligent Reranking | LLM 기반 스코어링, cross-encoder 재인코딩, metadata 반영 순위 조정 |
| Multi-faceted Filtering | metadata 필터, 유사도 임계값, 내용 필터, 중복 제거를 위한 다양성 필터 |
| Hierarchical Indices | 문서 요약 계층과 상세 chunk 계층의 2단 구조 |
| Dartboard Retrieval | relevance와 다양성을 Relevant Information Gain 하나로 합쳐 직접 최적화 |
| Multi-modal Retrieval | 캡셔닝 경로와 Colpali 경로 두 가지 |

Fusion Retrieval은 후보를 넓히는 쪽이다. 임베딩 검색은 표현이 달라도 의미가 같으면 찾아내지만 고유명사나 코드처럼 정확한 문자열이 중요한 경우에 약하다. keyword 검색은 그 반대다. 둘을 합치면 각자의 사각지대를 서로 메운다.

Intelligent Reranking과 Multi-faceted Filtering은 좁히는 쪽이다. cross-encoder는 질의와 문서를 따로 인코딩하지 않고 한 번에 넣어 관련성을 계산하므로 정확도가 높지만 후보 수만큼 모델을 호출해야 해서 느리다. 1차 검색으로 후보를 줄인 뒤에만 쓸 수 있는 이유다.

Multi-faceted Filtering이 쓰는 metadata 필터의 기준은 날짜, 출처, 저자, 문서 유형이다. 다양성 필터는 거의 중복인 항목을 걸러 같은 내용이 상위를 채우는 것을 막는다.

Dartboard Retrieval은 관련성과 다양성을 두 개의 목표로 두고 사후에 조정하는 대신, 둘을 하나의 스코어 함수로 합쳐 직접 최적화한다. README는 database가 조밀할 때 단순 RAG의 성능이 떨어지고 dartboard가 이를 앞선다는 PoC를 담았다고 적는다.

Hierarchical Indices는 요약 계층과 상세 계층을 함께 두되, 두 계층 모두 데이터의 같은 위치를 가리키는 metadata를 갖게 한다. 요약으로 범위를 좁힌 뒤 같은 위치의 상세 chunk로 내려가는 방식이다.

Multi-modal Retrieval의 두 경로는 접근이 정반대다. 캡셔닝 경로는 PDF와 PPT 같은 멀티미디어를 텍스트 캡션으로 바꿔 텍스트와 함께 vector store에 저장한다. Colpali 경로는 반대로 자료 전체를 이미지로 바꾸고 관련 이미지를 vision LLM에 그대로 전달한다. 앞쪽은 텍스트 파이프라인을 재사용하고 뒤쪽은 파싱 손실을 피한다.

### 반복과 적응

| 기법 | 내용 |
|---|---|
| Retrieval with Feedback Loops | 검색 문서와 생성 답변의 관련성 및 품질에 대한 사용자 피드백을 수집해 retrieval 모델과 랭킹 모델을 fine-tuning |
| Adaptive Retrieval | 질의를 유형별로 분류하고 사용자 컨텍스트와 선호를 고려해 유형마다 다른 retrieval 전략을 적용 |

두 기법 모두 고정된 파이프라인을 전제하지 않는다. Retrieval with Feedback Loops는 시간이 지나며 모델을 바꾸고, Adaptive Retrieval은 질의마다 경로를 바꾼다.

### 평가 4종

평가 노트북은 `evaluation/` 디렉토리에 따로 모여 있다. 기법 구현과 평가 방법론을 분리해 다루려는 구성이다.

| 노트북 | 라이브러리 | 측정 대상 | 데이터셋 |
|---|---|---|---|
| DeepEval | `deepeval` | correctness, faithfulness, contextual relevancy 테스트 케이스 | README에 명시 없음 |
| GroUSE | `grouse` | GroUSE 프레임워크 6개 지표를 GPT-4로 평가. custom Llama 3.1 405B 평가자를 unit test로 meta-evaluate | GroUSE unit test |
| End-to-End RAG Evaluation | RAGAS 연동 + LLM-as-judge | completeness, relevance, 환각 탐지 custom 지표 | RAG-12000 |
| Open-RAG-Eval | `open-rag-eval` | UMBRELA 스코어링, AutoNuggetizer, 인용 및 환각 탐지 | FIQA 금융 데이터셋 |

GroUSE 노트북은 평가자 자체를 평가한다는 점이 다르다. GPT-4로 6개 지표를 재는 데 그치지 않고, 직접 만든 Llama 3.1 405B 평가자가 GroUSE unit test를 제대로 통과하는지 확인한다. LLM을 심판으로 쓸 때 심판의 신뢰도를 먼저 검증한다는 발상이다.

End-to-End 노트북은 평가 기준 선택부터 파이프라인 조립까지를 한 흐름으로 다루고, RAG-12000 데이터셋으로 완결성과 관련성과 환각 탐지 지표를 직접 만든다. Open-RAG-Eval은 FIQA 금융 데이터셋을 대상으로 오픈소스 지표 여러 개를 함께 적용한다.

### 메모리와 설명 가능성

| 기법 | 내용 |
|---|---|
| MemoRAG | key-value 쌍 추출, surrogate query 생성, 다중 질의 retrieval을 처음부터 직접 구현. FAISS 기반 MemoryStore를 만들고 표준 RAG와 비교 평가 |
| Explainable Retrieval | 특정 정보가 왜 검색되었고 질의와 어떻게 연결되는지 설명해 retrieval 과정의 투명성을 제공 |

MemoRAG 노트북은 라이브러리를 가져다 쓰지 않고 MemoryStore를 처음부터 구현한 뒤 표준 RAG와 나란히 비교한다는 점에서 다른 노트북과 성격이 다르다. surrogate query는 사용자 질의를 대신해 메모리에서 근거를 꺼내는 중간 질의를 뜻한다.

### 고급 아키텍처

Advanced Architectures의 일곱 항목은 단일 검색과 단일 생성으로 끝나지 않는 구조들이다.

| 기법 | 내용 |
|---|---|
| Agentic RAG with Contextual AI | Contextual AI 관리형 플랫폼으로 금융 문서 분석용 프로덕션 agentic RAG를 구성 |
| Graph RAG with Milvus | 텍스트 구절과 관계 triplet을 서로 다른 Milvus 컬렉션에 저장해 multi-hop 질문에 대응 |
| Knowledge Graph Integration | knowledge graph에서 질의 관련 엔티티와 관계를 검색해 비정형 텍스트와 결합 |
| GraphRag (Microsoft) | text unit에서 엔티티와 관계를 추출하고 각 community 요약을 bottom-up으로 생성 |
| RAPTOR | abstractive summarization을 재귀 적용해 문서를 트리로 조직 |
| Self RAG | retrieval 결정부터 유용성 평가까지 다단계 자가 점검 |
| Corrective RAG | relevance 점수에 따라 정보 소싱 전략을 바꾸고 필요하면 여러 출처를 결합 |

Agentic RAG 노트북이 쓰는 Contextual AI 플랫폼의 구성 요소는 네 가지다. 복잡한 표와 차트, 다중 페이지 자료를 vision model로 파싱하는 Document Parser, 상충하는 정보를 다루는 instruction-following reranker, RAG 용도로 환각을 최소화하도록 설계된 Grounded Language Model, 자연어 unit test 프레임워크 LMUnit이다.

Graph RAG with Milvus의 절차는 네 단계다. 텍스트 구절과 관계 triplet을 각각 다른 컬렉션에 저장하고, 두 컬렉션에 모두 질의해 다중 경로로 검색하고, LLM으로 관계를 reranking하고, 가장 관련성 높은 관계를 근거로 최종 구절을 가져온다. README는 복잡한 multi-hop 질문에서 성능이 크게 개선된다고 서술하지만 수치는 적지 않는다.

Self RAG의 다단계는 retrieval 결정, 문서 retrieval, relevance 평가, 답변 생성, 근거 평가, 유용성 평가 여섯 단계다. 첫 단계에서 검색이 필요한지부터 판단하므로 모든 질의에 검색을 붙이지 않는다.

Corrective RAG의 구성 요소는 Retrieval Evaluator, Knowledge Refinement, Web Search Query Rewriter, Response Generator 넷이다. Retrieval Evaluator가 매긴 relevance 점수가 낮으면 웹 검색으로 보강하는 식으로 소싱 전략을 바꾼다.

### 별도 저장소의 controllable agent

마스터 표 35행은 유일하게 다른 저장소를 가리킨다. `NirDiamant/Controllable-RAG-Agent`에 있으며, 단순 의미 유사도 retrieval로는 풀 수 없는 복잡한 질문을 대상으로 한다. 결정론적 graph를 통제 가능한 자율 agent의 "brain"으로 삼고, 질문 익명화, 고수준 planning, 과제 분해, 적응적 정보 retrieval과 질의응답, 지속적 재계획, 엄격한 답변 검증으로 이어지는 다단계 과정을 구현한다.

질문 익명화를 첫 단계에 두는 구성이 특이하다. 고유명사를 걸러낸 뒤 planning을 시키면 모델이 사전 지식으로 답을 지어내는 대신 자료에서 근거를 찾도록 유도할 수 있다.

### 실행 환경과 의존 도구

README가 이름을 밝힌 도구는 다음과 같다. 통합 `requirements.txt`나 버전 고정 목록은 README에 없다.

| 구분 | README에 등장하는 이름 |
|---|---|
| 프레임워크 | LangChain(주력), LlamaIndex(5개 기법에 병행 구현) |
| vector store | FAISS(MemoRAG의 MemoryStore), Milvus(Graph RAG) |
| 모델 | OpenAI(CSV RAG), GPT-4(GroUSE 평가), Llama 3.1 405B(custom judge), Colpali(multi-modal) |
| 평가 라이브러리 | `deepeval`, `grouse`, `open-rag-eval`, RAGAS |
| 데이터셋 | RAG-12000(End-to-End 평가), FIQA(Open-RAG-Eval) |
| 외부 구현 참조 | dsRAG(Contextual Chunk Headers 구현체), Contextual AI 관리형 플랫폼 |
| 실행 환경 | Google Colab(모든 항목에 배지), 로컬 `git clone` |

LlamaIndex 병행 구현이 있는 다섯 기법은 Simple RAG, CSV RAG, Context Enrichment Window, Fusion Retrieval, Reranking이다. 나머지는 LangChain 단일 구현이다.

### 기여 방법과 커뮤니티 운영

기여 절차는 fork, `feature/AmazingFeature` 브랜치 생성, commit, push, pull request 다섯 단계다. 별도 심사 기준이나 노트북 작성 규약은 README에 적혀 있지 않고 `CONTRIBUTING.md`로 넘긴다.

| 창구 | 용도 |
|---|---|
| `CONTRIBUTING.md` | 기법 제안, 개선안, 피드백 |
| 서브레딧 r/EducationalAI | 커뮤니티 논의 |
| Discord | 커뮤니티 논의 |
| LinkedIn, Twitter | 저자 계정 |
| GitHub Sponsors | 후원 |

후원사는 기업 두 곳(Contextual AI, CodeRabbit)과 개인 한 명(Eisenh)이다. Contextual AI는 후원사이면서 동시에 "Agentic RAG with Contextual AI" 노트북이 쓰는 플랫폼 제공자다. 후원 관계와 기법 소개가 겹치는 항목이므로 그 노트북을 볼 때는 이 점을 함께 고려하는 편이 좋다.

README에는 학습 자료와 상업 요소가 함께 들어 있다. 도서 *RAG Made Simple*은 코드 RAGKING으로 33% 할인을 안내하고 1장을 무료 공개한다. 추천 도서 5권은 모두 Amazon 제휴 링크이며 README가 제휴 관계를 명시한다. *RAG Made Simple*을 소개하면 25% 제휴 수익을 준다는 안내도 있다. README의 주요 링크는 클릭 추적 리다이렉트를 경유하고 문서 하단에 추적 픽셀 이미지가 있다.

## 결과

이 저장소는 교육용 카탈로그이고 기법을 한 잣대로 비교하는 통일 벤치마크가 없다. README가 정량 수치나 실증 결과를 적은 지점은 세 곳뿐이다.

| 항목 | README가 적은 내용 | 근거 |
|---|---|---|
| HyPE | retrieval의 context precision 최대 42%p, claim recall 최대 45%p 향상 | SSRN 프리프린트(abstract_id=5139335) 링크. README는 저자를 밝히지 않음 |
| Dartboard Retrieval | database가 조밀할 때 단순 RAG의 성능이 떨어지고 dartboard가 이를 앞선다는 PoC | Implementation 소절 서술 |
| Graph RAG with Milvus | 복잡한 multi-hop 질문에서 성능이 크게 개선됨 | Overview 소절 서술. 수치 없음 |

HyPE의 두 수치는 서로 다른 것을 잰다. context precision은 검색해 온 컨텍스트 가운데 실제로 관련 있는 비율이고, claim recall은 정답에 있어야 할 사실 진술 가운데 검색된 컨텍스트가 담아낸 비율이다. 앞쪽은 잡음이 적은지를 재고 뒤쪽은 빠진 것이 없는지를 잰다. 두 지표가 함께 오른다는 것은 관련 없는 내용을 걷어내면서 필요한 내용은 더 가져왔다는 뜻이다.

다만 42%p와 45%p는 비율의 차이이지 배수가 아니다. README는 비교 대상이 된 기준 구성과 출발점 수치를 적지 않으므로, 이 값만으로는 개선 폭의 실제 크기를 판단할 수 없다. "최대"라는 단서도 붙어 있어 평균이 아니라 가장 좋았던 조건의 값이다.

세 항목 모두 이 저장소가 직접 수행한 통제 실험의 결과가 아니다. HyPE 수치는 외부 프리프린트를 인용한 것이고, 나머지 둘은 수치 없는 서술이다. 즉 이 저장소를 근거로 기법 사이의 우열을 주장할 수는 없다.

평가 노트북 4종도 벤치마크 결과가 아니라 평가 절차의 실행 예제다. 사용자가 자기 데이터에 DeepEval, GroUSE, RAGAS, Open-RAG-Eval을 붙이는 방법을 익히는 것이 목적이다.

실질적인 산출물은 실행 가능성 그 자체다. 모든 항목에 Colab 배지가 붙어 있어 설치 없이 브라우저에서 같은 입력으로 여러 기법을 나란히 실행해 볼 수 있다. 자기 데이터에 무엇이 맞는지는 이 저장소가 답해 주지 않으므로 직접 측정해야 한다.

## 한계

### 라이선스 조건의 검증 범위

README 본문 License 절은 "This project is licensed under a custom non-commercial license - see the LICENSE file for details."라는 한 문장이 전부다. raw에는 README만 있고 `LICENSE` 파일이 포함되어 있지 않다.

| 조건 | raw 근거 | 판정 |
|---|---|---|
| custom non-commercial license임 | README License 절 명시 | 확인됨 |
| 비상업 사용만 허용 | "non-commercial"이라는 표현까지만 확인 | 부분 확인 |
| 상업 사용에 별도 서면 허가 필요 | README에 조항 없음 | 검증 불가 |
| attribution 의무 | README에 조항 없음 | 검증 불가 |
| 기여물의 상업권이 저자에게 귀속 | README에 조항 없음 | 검증 불가 |

이 페이지 frontmatter의 `license` 값은 "비상업 사용만 허용, 상업 사용은 별도 서면 허가 필요"로 적혀 있다. README 본문과 모순되지는 않지만 서면 허가 요건까지 뒷받침하지도 않는다. 상업 목적으로 코드를 쓰려면 저장소의 `LICENSE` 파일을 직접 확인해야 한다.

### README 내부의 불일치

README는 같은 내용을 마스터 표와 상세 섹션 두 곳에 적으면서 여러 지점이 어긋난다.

| 항목 | 마스터 표 | 상세 섹션 |
|---|---|---|
| HyPE의 소속 카테고리 | Query Enhancement 🔍 | Context and Content Enrichment 📚 |
| HyPE 노트북 파일명 | `HyPE_Hypothetical_Prompt_Embeddings.ipynb` | `HyPE_Hypothetical_Prompt_Embedding.ipynb` |
| HyDE의 설명 | 제목이 Hypothetical Document Embedding | Overview는 hypothetical questions를 생성한다고 서술 |
| Multi-faceted Filtering의 노트북 링크 | 있음 | 없음 |
| JSON RAG | 표에 없음 | 항목 6으로 존재 |
| MemoRAG의 카테고리 이름 | Advanced 🔬 | Memory-Augmented Retrieval 🧠 |

노트북 개수 표현도 두 가지다. 헤더는 "42+ runnable notebooks", 본문 Recently added 문구는 "42 notebooks"로 적는다.

상세 섹션의 항목 번호에는 중복과 누락이 함께 있다. 번호 6, 27, 28, 29가 각각 두 번씩 쓰이고 번호 19와 24는 건너뛴다. 그래서 마스터 표의 행 번호와 상세 섹션의 항목 번호가 서로 대응하지 않으며, 번호로 항목을 지목하면 두 곳을 함께 확인해야 한다.

HyDE 항목의 불일치는 개념 이해에 직접 영향을 준다. 제목과 파일명은 가상 자료를 만든다는 원래 HyDE 정의를 따르는데 Overview와 Implementation은 가상 질문을 만든다고 서술한다. README만 읽으면 HyDE와 HyPE의 차이를 파악하기 어렵다.

### 링크 품질

| 문제 | 규모 |
|---|---|
| GitHub 보기 배지에 두 URL이 겹쳐 들어간 깨진 링크 | 34개 |
| 저장소 이름 표기 혼재 (`RAG_TECHNIQUES` 대 `RAG_Techniques`) | 74회 대 117회 |
| 실제 구조와 맞지 않는 Getting Started 경로 안내 | `cd all_rag_techniques/technique-name` |
| 본문 근거가 없는 Keywords 항목 | PydanticAI, Agent Frameworks |

깨진 링크는 `https://github.com/NirDiamant/RAG_TECHNIQUES/blob/main/https://colab.research.google.com/...` 형태로 GitHub 경로와 Colab URL이 이어 붙은 것이다. 실제 노트북에 접근하려면 Colab 배지를 쓰거나 `all_rag_techniques/{name}.ipynb` 경로로 직접 들어가야 한다.

Getting Started의 두 번째 단계는 기법별 디렉토리로 이동하라고 안내하지만, README가 링크하는 실제 경로는 모두 `all_rag_techniques/` 아래의 파일이므로 그런 디렉토리는 없다.

### 설명 깊이와 유지보수

README의 기법 설명은 Overview와 Implementation을 합쳐 대체로 두 문단 안팎이다. Key Features는 "Comprehensive documentation for each technique"라고 적지만 README 수준에서 확인되는 것은 각 기법의 목적과 구성 요소 나열까지다. 하이퍼파라미터 선택 기준, 실패 사례, 규모 확장 논의는 README에 없다. 노트북 본문에 더 있을 수 있으나 현재 raw는 README 한 파일이라 확인할 수 없다.

의존 라이브러리의 버전 고정 목록도 README에 없다. 노트북마다 필요한 패키지를 각자 설치하는 구성으로 보이는데, 이 부분 역시 README만으로는 판단할 수 없다.

### 외부 플랫폼 의존

일부 노트북은 외부 서비스 계정이 있어야 재현된다.

| 노트북 | 필요한 외부 자원 |
|---|---|
| Agentic RAG | Contextual AI 관리형 플랫폼 계정 |
| Graph RAG with Milvus | Milvus 인스턴스 |
| Sophisticated Controllable Agent | 별도 저장소 `Controllable-RAG-Agent` |
| 대부분의 노트북 | OpenAI 등 상용 모델 API 키 |

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| HyPE (Hypothetical Prompt Embeddings) | 인덱싱 시점에 chunk마다 가상 질문을 여러 개 생성해 chunk 대신 저장하고, 사용자 질의를 그 질문들과 맞추는 retrieval 기법. HyDE와 달리 질의 시점에 LLM을 호출하지 않는다 |
| HyDE (Hypothetical Document Embedding) | 질의로부터 가상의 자료를 생성하고 그 임베딩으로 검색해 질의와 자료의 표현 차이를 줄이는 기법 |
| Proposition Chunking | 문서를 간결하고 완결적인 사실 진술 단위로 분해한 뒤 정확성, 명료성, 완결성, 간결성으로 채점하는 chunking |
| Dartboard Retrieval | relevance와 다양성을 Relevant Information Gain이라는 단일 스코어로 합쳐 직접 최적화하는 retrieval |
| Corrective RAG (CRAG) | Retrieval Evaluator로 relevance를 판정해 지식 정제와 웹 검색 보강으로 소싱 전략을 교정하는 RAG |
| GroUSE | 근거에 기반한 LLM 생성을 6개 지표로 평가하고, custom LLM 평가자를 unit test로 meta-evaluate하는 평가 프레임워크 |

## 관련 페이지

- [[database/athina-ai-rag-cookbooks]]: 같은 형식의 RAG 기법 노트북 cookbook이다. athina 저장소 README는 MIT License를 명시하므로 상업 사용 조건에서 이 저장소와 다르다.
- [[database/edge-2024-from-local-to-global]]: Microsoft GraphRAG 원논문이다. 이 저장소의 GraphRag (Microsoft) 노트북이 엔티티와 관계 추출, community 요약의 bottom-up 생성을 실습으로 다룬다.
- [[database/guo-2025-lightrag-simple-and-fast]]: graph 기반 RAG를 다루는 논문이다. 이 저장소의 Graph RAG 노트북 두 개가 개념 소개 수준에서 그치는 주제를 설계와 비용까지 다룬다.
- [[database/hkuds-rag-anything]]: 멀티모달 RAG를 다루는 구현체 자료다. 이 저장소의 Multi-modal Retrieval 노트북과 주제가 겹치므로 두 경로의 실제 구현을 확인할 때 함께 본다.
- [[database/vectifyai-pageindex]]: 임베딩과 vector store를 쓰지 않는 retrieval 접근이다. 이 저장소의 기법 대부분이 임베딩을 전제로 삼는 것과 대비된다.
