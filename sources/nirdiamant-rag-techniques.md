---
title: "Advanced RAG Techniques (NirDiamant, GitHub repo)"
type: repo
year: 2024
category: database
raw_path: raw/repos/nirdiamant-rag-techniques.md
raw_filename: "nirdiamant-rag-techniques.md"
source_collection: external
org: "NirDiamant"
repo: "RAG_Techniques"
url: "https://github.com/NirDiamant/RAG_Techniques"
license: "Custom non-commercial (Nir Diamant), 비상업 사용만 허용, 상업 사용은 별도 서면 허가 필요"
tags: [rag, advanced-rag, agentic-rag, langchain, llamaindex, hyde, hype, semantic-chunking, proposition-chunking, fusion-retrieval, reranking, raptor, graph-rag, self-rag, corrective-rag, memorag, rag-evaluation, deepeval, grouse, cookbook, repo, oss]
---

## 한 줄 요약 (One-line Summary)

NirDiamant의 RAG_Techniques는 RAG 기법을 실행 가능한 Jupyter 노트북으로 모아 놓은 학습용 저장소다. README는 스스로를 "A community-driven hub of 42+ runnable notebooks covering RAG techniques from foundational to cutting-edge"로 소개하며, README가 링크하는 서로 다른 노트북 경로를 실제로 세면 42개다. 기법마다 Overview와 Implementation 두 소절로 짧게 설명하고 GitHub 보기 배지와 Colab 실행 배지를 나란히 붙이며, 19개 기법에는 CLI로 실행할 수 있는 `.py` 스크립트를 함께 둔다. 라이선스가 custom non-commercial이라는 점이 실무 도입 시 가장 먼저 확인할 조건이다.

## 1. 자료 정보 (Document Information)

- **Org / Repo**: `NirDiamant/RAG_Techniques`
- **자료 형태**: GitHub README 스냅샷 1개 파일 (645줄, 67,537 bytes). 노트북 본문과 `LICENSE` 파일은 raw에 없다.
- **저자 생태계**: DiamantAI 뉴스레터(README 기준 구독자 5만 명 이상), 도서 *RAG Made Simple*, 코스 *Prompt to Production*(대기자 명단 모집 중), 자매 저장소 4개.

### 1.1 라이선스 (검증 상태 포함)

README 본문 License 절은 다음 한 문장이 전부다.

> This project is licensed under a custom non-commercial license - see the [LICENSE](LICENSE) file for details.

| 조건 | raw 근거 | 판정 |
|---|---|---|
| custom non-commercial license임 | README License 절 명시 | 확인됨 |
| 비상업 사용만 허용 | "non-commercial"이라는 표현까지만 확인 | 부분 확인 |
| 상업 사용에 별도 서면 허가 필요 | README에 조항 없음 | 검증 불가 |
| attribution(저자명, 저장소 링크, 변경 여부) 의무 | README에 조항 없음 | 검증 불가 |
| 기여물의 상업권이 저자에게 귀속 | README에 조항 없음 | 검증 불가 |

raw는 README 한 파일이고 `LICENSE` 파일이 포함되어 있지 않다. 따라서 frontmatter의 `license` 값은 그대로 두되, 세부 조항은 저장소의 `LICENSE` 파일을 직접 확인해야 한다. README 본문과 frontmatter가 서로 모순되지는 않는다.

### 1.2 디렉토리 구성

README 링크 경로에서 확인되는 구성은 세 곳이다.

| 경로 | 내용 | 확인된 파일 수 |
|---|---|---|
| `all_rag_techniques/` | 기법 노트북 대부분 | 38개 |
| `all_rag_techniques_runnable_scripts/` | 같은 기법의 CLI 실행용 `.py` | 19개 |
| `evaluation/` | 평가 노트북 | 4개 |

`all_rag_techniques/` 38개와 `evaluation/` 4개를 더하면 42개다. README 헤더의 "42+ runnable notebooks"와 일치한다.

### 1.3 명시된 스택

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

Chroma를 비롯한 다른 vector store는 README에 등장하지 않는다.

## 2. 주요 기여 (Key Contributions)

1. **기법 단위로 완결된 노트북 카탈로그.** 42개 노트북 각각이 GitHub 보기 배지와 Colab 실행 배지를 갖춰, 설치 없이 브라우저에서 바로 실행해 볼 수 있다.
2. **Overview와 Implementation 이원 설명.** 기법마다 "무엇을 하는가"와 "어떻게 구현하는가"를 두 소절로 나눠 두세 문장씩 적는다. 노트북을 열기 전에 목적을 먼저 파악할 수 있다.
3. **동일 기법의 다중 구현.** 5개 기법(Simple RAG, CSV RAG, Context Enrichment, Fusion Retrieval, Reranking)은 LangChain과 LlamaIndex 두 프레임워크로 각각 구현했다. 19개 기법에는 CLI 실행용 `.py`도 함께 둔다.
4. **retrieval 이전 단계의 세분화.** chunking(고정 크기, 명제 단위, 의미 응집), 질의 변환, 컨텍스트 보강을 각각 독립 기법으로 분리해 다룬다. retrieval과 생성 단계에만 집중하는 다른 자료와 구분되는 지점이다.
5. **평가를 별도 디렉토리로 분리.** `evaluation/`에 DeepEval, GroUSE, End-to-End, Open-RAG-Eval 네 노트북을 두어 기법 구현과 평가 방법론을 나눠 다룬다.
6. **HyPE 노트북과 SSRN 프리프린트 연결.** HyPE 항목은 SSRN 프리프린트(abstract_id=5139335)를 Additional Resources로 링크하고, context precision 최대 42%p, claim recall 최대 45%p 향상 수치를 README 본문에 적는다. README는 이 프리프린트의 저자를 밝히지 않는다.
7. **저자 생태계와의 교차 연결.** 뉴스레터 해설 글 5편, 도서, 코스, 자매 저장소 4개를 README 곳곳에서 연결한다. 상세 섹션은 Overview와 Implementation 소절 쌍 37개, Additional Resources 블록 7개로 구성된다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

이 저장소는 라이브러리가 아니라 노트북 카탈로그다. README는 같은 내용을 두 번 제시한다. 먼저 35행짜리 마스터 표로 한눈에 보여주고, 그 아래에서 항목마다 Overview와 Implementation을 붙인 상세 섹션으로 다시 나열한다.

### 3.1 카테고리 구성 (실측 10종)

마스터 표의 Category 열에는 서로 다른 라벨이 10종 나온다.

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

상세 섹션도 10개다. `###` 수준 제목 9개와 `##` 수준 제목 1개(Special Advanced Technique)로 나뉜다. 라벨 이름은 양쪽이 정확히 일치하지 않으며, MemoRAG 한 항목은 마스터 표에서 "Advanced 🔬", 상세 섹션에서 "Memory-Augmented Retrieval 🧠"으로 불린다.

### 3.2 노트북 42개의 내역

마스터 표 35행 가운데 34행이 저장소 안의 노트북을 가리키고, 마지막 35행은 별도 저장소 `Controllable-RAG-Agent`를 가리킨다. 나머지 8개 노트북은 상세 섹션에만 링크되어 있다.

| 구간 | 노트북 수 |
|---|---|
| 마스터 표 1행부터 34행까지의 노트북 | 34 |
| 마스터 표 35행(외부 저장소 링크, 노트북 아님) | 0 |
| 상세 섹션에만 있는 LlamaIndex 병행 구현 | 5 |
| 상세 섹션에만 있는 JSON RAG | 1 |
| 상세 섹션에만 있는 Graph RAG with Milvus | 1 |
| 상세 섹션에만 있는 Colpali multi-modal | 1 |
| 합계 | 42 |

README 전체에서 추출한 서로 다른 `.ipynb` 파일명은 43개인데, 그중 `HyPE_Hypothetical_Prompt_Embedding.ipynb`(단수형)와 `HyPE_Hypothetical_Prompt_Embeddings.ipynb`(복수형)는 같은 노트북의 표기 변형이다. 둘 중 하나는 깨진 링크이므로 실제 노트북은 42개다.

### 3.3 Foundational

| 기법 | Overview 요지 | Implementation 요지 |
|---|---|---|
| Simple RAG | 입문자용 기본 RAG | 기본 retrieval 질의에서 시작해 점진적 학습 장치를 결합 |
| Simple RAG using a CSV file | CSV 파일 기반 기본 RAG | CSV로 기본 retrieval을 만들고 OpenAI와 결합해 질의응답 구성 |
| Reliable RAG | Simple RAG에 검증과 정제를 추가 | 검색 문서의 relevancy를 확인하고 답변에 쓰인 문서 구간을 표시 |
| Choose Chunk Size | 컨텍스트 보존과 retrieval 효율의 균형을 맞추는 고정 chunk 크기 선택 | 여러 chunk 크기를 실험해 사용 사례별 최적점을 찾음 |
| Proposition Chunking | 텍스트를 간결하고 완결적이며 의미 있는 문장으로 분해 | LLM과 전용 프롬프트로 사실 진술을 생성한 뒤 정확성, 명료성, 완결성, 간결성 네 기준으로 채점 |
| Simple RAG with JSON | JSON 파일로 retrieval과 질의응답 시스템 구성 | 항목마다 여러 필드를 가진 JSON을 적재하고 관련성 높은 텍스트 필드를 합쳐 임베딩 |

### 3.4 Query Enhancement

| 기법 | 내용 |
|---|---|
| Query Transformations | 질의 재작성, step-back prompting(더 넓은 질의 생성), 하위 질의 분해 세 가지를 함께 다룸 |
| HyDE | 마스터 표는 "HyDE (Hypothetical Document Embedding)"로 적지만, 상세 섹션 Overview는 "Generating hypothetical questions"로 서술한다. 데이터의 관련 위치를 가리키는 가상 질문을 만들어 질의와 데이터의 정렬을 개선한다는 설명이다 |

### 3.5 Context and Content Enrichment

| 기법 | 내용 |
|---|---|
| HyPE | 인덱싱 시점에 chunk마다 가상 질문을 여러 개 미리 생성해 chunk 대신 저장한다. retrieval이 질문 대 질문 매칭 과제로 바뀌고, HyDE와 달리 질의 시점에 LLM을 호출하지 않아 추론 비용이 줄어든다 |
| Contextual Chunk Headers (CCH) | 문서 수준과 섹션 수준 컨텍스트를 헤더로 만들어 chunk 앞에 붙인 뒤 임베딩한다. 오픈소스 retrieval 엔진 dsRAG가 이 기법을 구현하고 있다 |
| Relevant Segment Extraction (RSE) | retrieval 후처리로 관련성 높은 chunk를 분석해 더 긴 multi-chunk 구간을 동적으로 구성한다 |
| Context Enrichment Window | 문장 단위로 임베딩한 뒤, 가장 관련성 높은 문장의 원문 앞뒤 문장까지 함께 가져온다 |
| Semantic Chunking | 고정 크기 대신 의미 응집도로 분할한다. NLP 기법으로 주제 경계나 응집된 구간을 찾는다 |
| Contextual Compression | 질의 관련 내용을 보존하면서 검색된 chunk를 LLM으로 압축하거나 요약한다 |
| Document Augmentation | 각 문서 조각에 대해 나올 법한 질문들을 LLM으로 생성해 붙여, vector database 안에서 찾힐 확률을 높인다 |

### 3.6 Advanced Retrieval

| 기법 | 내용 |
|---|---|
| Fusion Retrieval | keyword 기반 검색과 vector 기반 검색을 결합한다. README는 특정 keyword 검색 알고리즘 이름을 적지 않는다 |
| Intelligent Reranking | LLM 기반 스코어링, cross-encoder로 질의와 문서를 함께 재인코딩, metadata를 반영한 순위 조정 세 가지를 쓴다 |
| Multi-faceted Filtering | metadata 필터(날짜, 출처, 저자, 문서 유형), 유사도 임계값, 내용 필터, 중복 제거를 위한 다양성 필터 |
| Hierarchical Indices | 문서 요약 계층과 상세 chunk 계층의 2단 구조. 두 계층 모두 데이터의 같은 위치를 가리키는 metadata를 갖는다 |
| Dartboard Retrieval | relevance와 다양성을 하나의 스코어 함수로 합쳐 직접 최적화한다. Relevant Information Gain을 최적화 대상으로 삼는다 |
| Multi-modal Retrieval | 두 경로를 제시한다. 캡셔닝 경로는 PDF와 PPT 등 멀티미디어를 텍스트 캡션으로 바꿔 vector store에 함께 저장하고, Colpali 경로는 데이터를 이미지로 변환한 뒤 관련 이미지를 vision LLM에 전달한다 |

### 3.7 Iterative and Adaptive

| 기법 | 내용 |
|---|---|
| Retrieval with Feedback Loops | 검색 문서와 생성 답변의 관련성 및 품질에 대한 사용자 피드백을 수집해 retrieval 모델과 랭킹 모델을 fine-tuning한다 |
| Adaptive Retrieval | 질의를 유형별로 분류하고, 사용자 컨텍스트와 선호를 고려해 유형마다 다른 retrieval 전략을 쓴다 |

### 3.8 Evaluation (평가 4종)

| 노트북 | 라이브러리 | 측정 대상 | 데이터셋 |
|---|---|---|---|
| DeepEval | `deepeval` | correctness, faithfulness, contextual relevancy 테스트 케이스 | README에 명시 없음 |
| GroUSE | `grouse` | GroUSE 프레임워크 6개 지표를 GPT-4로 평가하고, custom Llama 3.1 405B 평가자를 unit test로 meta-evaluate | GroUSE unit test |
| End-to-End RAG Evaluation | RAGAS 연동 + LLM-as-judge | completeness, relevance, 환각 탐지 custom 지표 | RAG-12000 |
| Open-RAG-Eval | `open-rag-eval` | UMBRELA 스코어링, AutoNuggetizer, 인용 및 환각 탐지 | FIQA 금융 데이터셋 |

### 3.9 Memory-Augmented와 Explainability

| 기법 | 내용 |
|---|---|
| MemoRAG | key-value 쌍 추출, surrogate query 생성, 다중 질의 retrieval을 처음부터 직접 구현한다. FAISS 기반 MemoryStore를 만들고 표준 RAG와 비교 평가한다 |
| Explainable Retrieval | 특정 정보가 왜 검색되었고 질의와 어떻게 연결되는지 설명해 retrieval 과정의 투명성을 제공한다 |

### 3.10 Advanced Architectures

| 기법 | 내용 |
|---|---|
| Agentic RAG with Contextual AI | Contextual AI 관리형 플랫폼으로 금융 문서 분석용 프로덕션 agentic RAG를 만든다. 구성 요소는 vision model로 복잡한 표와 차트, 다중 페이지 문서를 파싱하는 Document Parser, 상충 정보를 다루는 instruction-following reranker, RAG 용도로 환각을 최소화하도록 설계된 Grounded Language Model, 자연어 unit test 프레임워크 LMUnit이다 |
| Graph RAG with Milvus | 텍스트 구절과 관계 triplet(subject-predicate-object)을 각각 다른 Milvus 컬렉션에 저장한다. 두 컬렉션에 모두 질의해 다중 경로로 검색하고, LLM으로 관계를 reranking한 뒤 가장 관련성 높은 관계를 근거로 최종 구절을 가져온다. 복잡한 multi-hop 질문에서 성능이 크게 개선된다고 서술한다 |
| Knowledge Graph Integration | knowledge graph에서 질의와 관련된 엔티티와 관계를 검색해, 정형 데이터를 비정형 텍스트와 결합한다 |
| GraphRag (Microsoft) | 입력 코퍼스의 text unit에서 엔티티와 관계를 추출하고, 각 community와 그 구성원의 요약을 bottom-up으로 생성한다 |
| RAPTOR | abstractive summarization을 재귀적으로 적용해 검색 문서를 트리 구조로 조직하고 계층적 컨텍스트를 제공한다 |
| Self RAG | retrieval 결정, 문서 retrieval, relevance 평가, 답변 생성, 근거 평가, 유용성 평가로 이어지는 다단계 과정을 구현한다 |
| Corrective RAG | Retrieval Evaluator, Knowledge Refinement, Web Search Query Rewriter, Response Generator를 결합해, relevance 점수에 따라 정보 소싱 전략을 바꾸고 필요하면 여러 출처를 합친다 |

### 3.11 Special Advanced Technique

마스터 표 35행이자 유일하게 별도 저장소에 있는 항목이다. `NirDiamant/Controllable-RAG-Agent`에 있으며, 단순 의미 유사도 retrieval로는 풀 수 없는 복잡한 질문을 대상으로 한다. 결정론적 graph를 통제 가능한 자율 agent의 "brain"으로 삼고, 질문 익명화, 고수준 planning, 과제 분해, 적응적 정보 retrieval과 질의응답, 지속적 재계획, 엄격한 답변 검증으로 이어지는 다단계 과정을 구현한다.

### 3.12 실행 방법과 기여 절차

README의 Getting Started는 세 단계다. 저장소를 `git clone`하고, `cd all_rag_techniques/technique-name`으로 이동한 뒤, 각 기법 디렉토리의 구현 가이드를 따르라고 안내한다. 다만 README가 링크하는 실제 경로는 `all_rag_techniques/{name}.ipynb` 파일이므로 기법별 디렉토리는 존재하지 않는다.

기여 절차는 fork, `feature/AmazingFeature` 브랜치 생성, commit, push, pull request 다섯 단계로 안내한다. 커뮤니티 창구는 `CONTRIBUTING.md`, 서브레딧 r/EducationalAI, Discord, LinkedIn, Twitter다.

### 3.13 자매 저장소와 상업 구조

| 자매 저장소 | README 설명 |
|---|---|
| Agents Towards Production | 프로토타입에서 스케일까지, 프로덕션 등급 GenAI agent 출하를 위한 code-first 튜토리얼 |
| GenAI Agents | AI agent 구현과 튜토리얼의 광범위한 모음 |
| Prompt Engineering Techniques | 기초부터 고급까지의 프롬프트 전략 |
| Agent Memory Techniques | agent 메모리 노트북 30개. vector store, knowledge graph, Mem0, MemGPT, Zep, Graphiti |

README에는 학습 자료와 상업 요소가 함께 들어 있다.

- 후원사는 기업 2곳(Contextual AI, CodeRabbit)과 개인 1명(Eisenh)이다. Contextual AI는 후원사이면서 동시에 "Agentic RAG with Contextual AI" 노트북이 쓰는 플랫폼 제공자다.
- 도서 *RAG Made Simple*은 400쪽 분량이며 README는 Amazon Bestseller in Generative AI, 독자 1,500명 이상, 별점 4.6으로 소개한다. 코드 RAGKING으로 33% 할인, 1장 무료 공개를 안내한다.
- 추천 도서 5권은 모두 Amazon 제휴 링크이며 README가 제휴 관계를 명시한다.
- *RAG Made Simple*을 소개하면 25% 제휴 수익을 준다는 안내가 있다.
- README의 주요 링크는 `europe-west1-rag-techniques-views-tracker.cloudfunctions.net` 클릭 추적 리다이렉트를 경유하고, 문서 하단에 추적 픽셀 이미지가 있다.

| 추천 도서 | 저자 | README 설명 |
|---|---|---|
| Build a Large Language Model (From Scratch) | Sebastian Raschka | PyTorch로 GPT 계열 모델을 처음부터 끝까지 만든다 |
| AI Engineering: Building Applications with Foundation Models | Chip Huyen | foundation model 앱을 프로덕션화하는 표준 참고서 |
| Hands-On Large Language Models | Jay Alammar, Maarten Grootendorst | 시각 자료 중심의 실습형 LLM 안내 |
| Natural Language Processing with Transformers | Lewis Tunstall, Leandro von Werra, Thomas Wolf | Hugging Face 팀이 쓴 책 |
| Designing Machine Learning Systems | Chip Huyen | 프로덕션 ML 시스템의 표준 참고서 |

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

이 저장소는 교육용 카탈로그이고 기법을 한 잣대로 비교하는 통일 벤치마크가 없다. README가 수치나 실증 결과를 적은 지점은 두 곳뿐이다.

| 항목 | README가 적은 내용 | 근거 |
|---|---|---|
| HyPE | retrieval의 context precision 최대 42%p, claim recall 최대 45%p 향상 | SSRN 프리프린트(abstract_id=5139335) 링크. README는 저자를 밝히지 않음 |
| Dartboard Retrieval | database가 조밀할 때 단순 RAG의 성능이 떨어지고 dartboard retrieval이 이를 앞선다는 PoC를 담았다 | Implementation 소절 서술 |
| Graph RAG with Milvus | 복잡한 multi-hop 질문에서 성능이 크게 개선된다 | Overview 소절 서술. 수치 없음 |

평가 노트북 4종은 벤치마크 결과가 아니라 평가 절차의 실행 예제다. 사용자가 자기 데이터에 DeepEval, GroUSE, RAGAS, Open-RAG-Eval을 붙이는 방법을 익히는 것이 목적이다.

정성적 산출물은 실행 가능성 자체다. 모든 항목에 Colab 배지가 붙어 있어 설치 없이 브라우저에서 같은 입력으로 여러 기법을 나란히 실행해 볼 수 있다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

### 5.1 라이선스 검증 한계

README는 "custom non-commercial license"라는 표현과 `LICENSE` 파일 링크만 제공한다. 상업 사용 조건, attribution 의무, 기여물의 권리 귀속은 raw에 없어 확인할 수 없다. 실무 도입 전에 저장소의 `LICENSE` 파일을 직접 읽어야 한다.

### 5.2 통일 벤치마크 부재

기법 사이의 정량 비교가 없다. 어떤 기법이 자기 데이터에 맞는지는 직접 측정해야 한다. README가 제시하는 수치는 HyPE 한 건뿐이고 그마저 외부 프리프린트를 인용한 것이다.

### 5.3 README 자체의 내적 모순

README는 같은 내용을 마스터 표와 상세 섹션 두 곳에 적으면서 다음이 어긋난다.

| 항목 | 마스터 표 | 상세 섹션 |
|---|---|---|
| HyPE의 소속 카테고리 | Query Enhancement 🔍 | Context and Content Enrichment 📚 |
| HyPE 노트북 파일명 | `HyPE_Hypothetical_Prompt_Embeddings.ipynb` | `HyPE_Hypothetical_Prompt_Embedding.ipynb` |
| HyDE의 설명 | 제목이 Hypothetical Document Embedding | Overview는 hypothetical questions를 생성한다고 서술 |
| Multi-faceted Filtering의 노트북 링크 | 있음 | 없음 |
| JSON RAG | 표에 없음 | 항목 6으로 존재 |
| MemoRAG의 카테고리 이름 | Advanced 🔬 | Memory-Augmented Retrieval 🧠 |

노트북 개수 표현도 두 가지다. 헤더는 "42+ runnable notebooks", 본문 Recently added 문구는 "42 notebooks"로 적는다.

상세 섹션의 항목 번호는 중복과 누락이 함께 있다. 번호 6, 27, 28, 29가 각각 두 번씩 쓰이고, 번호 19와 24는 건너뛴다. 그래서 마스터 표의 행 번호와 상세 섹션의 항목 번호가 서로 대응하지 않는다.

### 5.4 링크 품질

GitHub 보기 배지 링크 34개가 `https://github.com/NirDiamant/RAG_TECHNIQUES/blob/main/https://colab.research.google.com/...` 형태로 두 URL이 겹쳐 들어가 깨져 있다. 실제 노트북에 접근하려면 Colab 배지를 쓰거나 `all_rag_techniques/{name}.ipynb` 경로로 직접 들어가야 한다. 저장소 이름도 대문자 `RAG_TECHNIQUES`가 74회, `RAG_Techniques`가 117회로 표기가 섞여 있다.

Getting Started의 `cd all_rag_techniques/technique-name`도 실제 저장소 구조와 맞지 않는다. 문서 맨 아래 Keywords 줄에는 PydanticAI와 Agent Frameworks가 들어 있으나 README 본문 어디에도 해당 내용이 없다.

### 5.5 설명 깊이

README의 기법 설명은 Overview와 Implementation을 합쳐 대체로 두 문단 안팎이다. Key Features는 "Comprehensive documentation for each technique"라고 적지만, README 수준에서 확인되는 것은 각 기법의 목적과 구성 요소 나열까지다. 하이퍼파라미터 선택, 실패 사례, 스케일링 논의는 README에 없다.

### 5.6 외부 플랫폼 의존

일부 노트북은 외부 서비스 계정이 있어야 재현된다. Agentic RAG는 Contextual AI 관리형 플랫폼, Graph RAG는 Milvus, Special Advanced Technique은 별도 저장소를 각각 요구한다. Contextual AI는 이 저장소의 후원사이기도 하다.

## 6. 관련 연구 (Related Work)

- [[database/athina-ai-rag-cookbooks]] 는 같은 형식의 RAG 기법 노트북 cookbook이다. athina 저장소 README는 MIT License를 명시하므로 상업 사용 조건에서 이 저장소와 다르다.
- [[database/edge-2024-from-local-to-global]] 는 Microsoft GraphRAG 원논문이다. 이 저장소의 GraphRag (Microsoft) 노트북이 엔티티와 관계 추출, community 요약의 bottom-up 생성을 실습으로 다룬다.
- [[database/guo-2025-lightrag-simple-and-fast]] 와 [[database/hkuds-rag-anything]] 는 graph 기반 RAG와 멀티모달 RAG를 논문과 구현체 수준에서 다룬다. 이 저장소의 Graph RAG 노트북과 Multi-modal 노트북이 개념 소개에 머무는 지점을 더 깊이 다룬다.
- [[database/vectifyai-pageindex]] 와 [[database/zhang-2025-pageindex-vectorless-reasoning-rag]] 는 임베딩과 vector store를 쓰지 않는 retrieval 접근이다. 이 저장소의 기법 대부분이 임베딩을 전제로 삼는 것과 대비된다.
- 평가 4종은 wiki `evaluations` 카테고리의 평가 프레임워크 자료와 맞닿는다.

## 7. 용어집 (Glossary)

- **HyPE (Hypothetical Prompt Embeddings)**: 인덱싱 시점에 chunk마다 가상 질문을 여러 개 생성해 chunk 대신 저장하고, 사용자 질의를 그 질문들과 맞추는 retrieval 기법. HyDE와 달리 질의 시점에 LLM을 호출하지 않는다.
- **HyDE (Hypothetical Document Embedding)**: 질의로부터 가상의 자료를 생성하고 그 임베딩으로 검색해 질의와 자료의 표현 차이를 줄이는 기법. README 상세 섹션은 가상 질문을 만든다고 서술해 제목과 어긋난다.
- **Proposition Chunking**: 문서를 간결하고 완결적인 사실 진술 단위로 분해한 뒤 정확성, 명료성, 완결성, 간결성으로 채점하는 chunking.
- **Contextual Chunk Headers (CCH)**: 문서 수준과 섹션 수준 컨텍스트 요약을 chunk 앞에 헤더로 붙여 임베딩하는 기법. dsRAG가 구현체다.
- **Relevant Segment Extraction (RSE)**: retrieval 후처리로 관련 chunk를 이어 붙여 더 긴 multi-chunk 구간을 동적으로 구성하는 기법.
- **Dartboard Retrieval**: relevance와 다양성을 Relevant Information Gain이라는 단일 스코어로 합쳐 직접 최적화하는 retrieval.
- **RAPTOR**: Recursive Abstractive Processing for Tree-Organized Retrieval. 재귀 요약으로 문서를 트리로 조직해 계층적 컨텍스트를 만든다.
- **Self RAG**: retrieval 필요성, 문서 relevance, 답변 근거, 유용성을 모델이 스스로 평가하는 다단계 자가 점검 RAG.
- **Corrective RAG (CRAG)**: Retrieval Evaluator로 relevance를 판정해 지식 정제와 웹 검색 보강으로 소싱 전략을 교정하는 RAG.
- **MemoRAG**: key-value 추출과 surrogate query로 메모리를 만들어 다중 질의 retrieval을 수행하는 memory-augmented RAG.
- **GroUSE**: 근거에 기반한 LLM 생성을 6개 지표로 평가하고, custom LLM 평가자를 unit test로 meta-evaluate하는 평가 프레임워크.
- **UMBRELA / AutoNuggetizer**: Open-RAG-Eval이 쓰는 오픈소스 평가 구성 요소. 각각 relevance 스코어링과 nugget 기반 평가를 담당한다.
- **Colpali**: 문서를 텍스트 파싱 없이 이미지로 변환해 vision LLM으로 검색하는 multi-modal RAG 경로.
- **LMUnit**: Contextual AI 플랫폼의 자연어 unit test 프레임워크. RAG 시스템 성능 평가와 최적화에 쓴다.
