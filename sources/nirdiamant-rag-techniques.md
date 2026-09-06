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

Nir Diamant의 **RAG_Techniques**는 basic RAG부터 memory-augmented·agentic·graph RAG까지 **42+개의 실행 가능한 Jupyter 노트북**을 8개 카테고리(Foundational → Query Enhancement → Context Enrichment → Advanced Retrieval → Iterative/Adaptive → Evaluation → Explainability → Advanced Architecture)에 난이도 순으로 담은 커뮤니티 주도 RAG 기법 카탈로그다. 기법마다 "Overview → Implementation" 설명, LangChain/LlamaIndex 노트북, 실행용 `.py` 스크립트, Colab 배지를 갖춰 하나하나가 자기완결적이다. 5만 구독자 DiamantAI 뉴스레터와 베스트셀러 도서 *RAG Made Simple*로 이어지는 학습 생태계의 코드 허브 역할을 한다.

## 1. 자료 정보 (Document Information)

- **Org / Repo**: `NirDiamant/RAG_Techniques`
- **License**: **Custom non-commercial license** (athina cookbook의 MIT와 결정적으로 다름) — 비상업 목적이라면 사용·복제·수정·배포가 허용되지만 attribution(저자명·repo 링크·변경 여부 명시) 의무가 따르고, **상업 사용은 저자의 사전 서면 허가가 있어야 한다**. 기여물(Contribution)의 상업권도 전부 저자에게 귀속된다. 실무에 들일 때 가장 먼저 확인할 조건이다.
- **규모**: README 기준 42+ 노트북 (마스터 표는 35행이지만 일부 항목이 LangChain/LlamaIndex/Colpali 등 복수 구현을 포함해 실제 노트북 수가 더 많음)
- **디렉토리 구성**:
  - `all_rag_techniques/` — 대부분의 기법 노트북 (`.ipynb`)
  - `all_rag_techniques_runnable_scripts/` — 동일 기법의 실행 가능한 `.py` 버전
  - `evaluation/` — 평가 노트북 4종 (DeepEval, GroUSE, End-to-End, Open-RAG-Eval)
- **공통 스택**: LangChain(주력) · LlamaIndex(일부 병행 구현) · OpenAI/GPT · FAISS/Milvus/Chroma 등 vector store · Colab 즉시 실행
- **외부 연계 기법**: 일부는 별도 repo로 분리 — Microsoft GraphRAG, `Controllable-RAG-Agent`(Special Advanced Technique)
- **비고 (이미지)**: README의 이미지는 대부분 브랜딩·후원·뉴스레터·도서 배너(`images/`)이고 wiki에 임베드할 기법 다이어그램은 아니다 → `figures:` 키 생략.

## 2. 주요 기여 (Key Contributions)

1. **가장 방대한 RAG 기법 단일 카탈로그** — 42+ 기법을 Foundational부터 Advanced Architecture까지 8개 카테고리로 계단식 배열했다. athina cookbook(16종)보다 폭이 넓고, chunking·query enhancement·context enrichment처럼 retriever 이전 단계까지 세분화한 점이 두드러진다.
2. **Overview + Implementation 이원 설명** — 기법마다 "무엇을 하는가(Overview)"와 "어떻게 구현하는가(Implementation)"를 짧게 나눠 설명한다. 노트북을 열기 전에 목적부터 빠르게 잡을 수 있다.
3. **다중 구현 제공** — 핵심 기법은 LangChain·LlamaIndex 두 프레임워크 노트북에 `all_rag_techniques_runnable_scripts/`의 CLI 실행용 `.py`까지 붙였다. 프레임워크 비교 학습과 프로덕션 이식을 함께 뒷받침한다.
4. **저자 오리지널 기법 포함** — 남의 기법을 재구현만 한 것이 아니라 저자가 직접 제안·정리한 기법도 들어 있다. 그중 **HyPE(Hypothetical Prompt Embeddings)**는 SSRN 프리프린트를 함께 내놓았는데, "인덱싱 시점에 가상 질문을 미리 임베딩 → 질의-질문 매칭"으로 HyDE의 런타임 LLM 호출을 없앴다(context precision +42%p, claim recall +45%p 주장).
5. **평가를 독립 섹션으로 일급화** — `evaluation/`에 DeepEval·GroUSE·End-to-End(RAGAS 연동)·Open-RAG-Eval 4종을 따로 두어 기법 구현과 평가 방법론을 분리해 다룬다.
6. **학습 생태계의 코드 허브** — 5만+ 구독 뉴스레터, 베스트셀러 도서(*RAG Made Simple*, 400p), 자매 repo(GenAI_Agents·Prompt_Engineering·Agent_Memory_Techniques)를 교차 연결하는 교육 프로젝트 군의 중심이다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

repo는 라이브러리가 아니라 **노트북 카탈로그**다. 아래는 README 마스터 표와 상세 섹션을 기준으로 8개 카테고리를 정리한 것이다.

### 🌱 Foundational (기초)

| 기법 | 핵심 |
|---|---|
| **Simple RAG** | retrieved context + LLM 기본 결합 (baseline, LangChain·LlamaIndex 양쪽) |
| **RAG with CSV / JSON** | 정형 파일(CSV·JSON)에서 필드를 합쳐 임베딩·검색 |
| **Reliable RAG** | 검색 문서 relevancy 검증 + 답변에 쓰인 근거 segment 하이라이트 |
| **Choose Chunk Size** | 문맥 보존과 검색 효율의 균형점을 찾는 chunk size 실험 |
| **Proposition Chunking** | 문서를 완결적 명제(factual statement) 단위로 분해 + 품질 grading(정확·명료·완결·간결) |

### 🔍 Query Enhancement (질의 강화)

| 기법 | 핵심 |
|---|---|
| **Query Transformations** | query rewriting + step-back prompting(상위 질의) + sub-query decomposition |
| **HyDE** | 질의로 *가상 문서* 생성 → 그 임베딩으로 검색 (query-doc 정렬 개선) |
| **HyPE** | **인덱싱 시점**에 chunk별 가상 질문 다수를 미리 임베딩 → 질의-질문 매칭. HyDE와 달리 런타임 LLM 호출 없음 (저자 오리지널, SSRN 프리프린트) |

### 📚 Context Enrichment (문맥 보강)

| 기법 | 핵심 |
|---|---|
| **Contextual Chunk Headers (CCH)** | 문서·섹션 수준 문맥을 헤더로 만들어 chunk 앞에 붙여 임베딩 (dsRAG가 구현) |
| **Relevant Segment Extraction (RSE)** | 검색 후처리로 관련 chunk를 이어붙여 multi-chunk segment 동적 구성 |
| **Context Window Enhancement** | 문장 단위 임베딩 + 매칭 문장의 앞뒤 이웃 문장까지 확장 검색 |
| **Semantic Chunking** | 고정 크기 대신 의미 응집도(topic boundary)로 분할 |
| **Contextual Compression** | 검색된 chunk를 LLM으로 압축·요약해 노이즈 제거 |
| **Document Augmentation** | 각 chunk에서 가능한 질문들을 LLM으로 생성·부착해 검색 확률 향상 |

### 🚀 Advanced Retrieval (고급 검색)

| 기법 | 핵심 |
|---|---|
| **Fusion Retrieval** | keyword(BM25) 검색 ⊕ vector 검색 결합 |
| **Intelligent Reranking** | LLM 스코어링 + cross-encoder 재인코딩 + metadata 기반 재순위 |
| **Multi-faceted Filtering** | metadata·similarity threshold·content·diversity 필터로 결과 정제 |
| **Hierarchical Indices** | 문서 요약 tier + 상세 chunk tier의 2단 인덱스 |
| **Dartboard Retrieval** | relevance와 diversity를 하나의 스코어로 합쳐 Relevant Information Gain 직접 최적화 (dense DB에서 plain RAG 능가 PoC) |
| **Multi-modal RAG** | captioning(멀티미디어를 텍스트 캡션화) 또는 Colpali(문서를 이미지화 → VLM에 전달) 두 경로 |

### 🔁 Iterative & Adaptive (반복·적응)

| 기법 | 핵심 |
|---|---|
| **Retrieval with Feedback Loop** | 사용자 피드백을 수집해 검색·랭킹 모델 개선 |
| **Adaptive Retrieval** | 질의 유형·사용자 문맥으로 분류 → 유형별 맞춤 검색 전략 |

### 📊 Evaluation (평가, `evaluation/`)

| 기법 | 핵심 |
|---|---|
| **DeepEval** | `deepeval`로 correctness·faithfulness·contextual relevancy 테스트 케이스 |
| **GroUSE** | `grouse` 6개 지표 + GPT-4 평가 + custom Llama 3.1 405B judge의 meta-evaluation(unit test) |
| **End-to-End RAG Evaluation** | 평가 기준 선택 → LLM-as-judge → RAGAS 연동 → 전체 파이프라인. RAG-12000 데이터셋으로 completeness·relevance·hallucination 커스텀 지표 |
| **Open-RAG-Eval** | `open-rag-eval` — UMBRELA 스코어링·AutoNuggetizer·citation/hallucination 탐지, FIQA 금융 데이터셋 |

### 🧠 Memory-Augmented & 🔬 Explainability

| 기법 | 핵심 |
|---|---|
| **MemoRAG** | key-value 추출 + surrogate query 생성 + multi-query 검색을 from-scratch 구현 (FAISS MemoryStore, standard RAG와 비교 평가) |
| **Explainable Retrieval** | 특정 정보가 왜 검색됐고 질의와 어떻게 연결되는지 설명 제공 |

### 🏗️ Advanced Architecture (고급 아키텍처)

| 기법 | 핵심 |
|---|---|
| **Agentic RAG (Contextual AI)** | Contextual AI 관리형 플랫폼 기반 프로덕션 agentic RAG — Document Parser·instruction-following reranker·Grounded LM(GLM)·LMUnit |
| **Graph RAG (Milvus)** | text passage와 relationship triplet(SPO)을 별도 Milvus 컬렉션에 저장 → 다중 검색 + LLM 재순위로 multi-hop 개선 |
| **Graph RAG (LangChain / KG)** | knowledge graph에서 엔티티·관계 검색 → 정형 데이터 + 비정형 텍스트 결합 |
| **Microsoft GraphRAG** | 엔티티·관계 추출 → community 요약을 bottom-up 생성하는 MS 오픈소스 GraphRAG 노트북 |
| **RAPTOR** | 검색 문서를 재귀적 abstractive summarization으로 tree 구조 조직화 (계층적 문맥) |
| **Self-RAG** | retrieval 결정 → 검색 → relevance 평가 → 생성 → support·utility 평가의 다단계 자가 점검 |
| **Corrective RAG (CRAG)** | Retrieval Evaluator + Knowledge Refinement + Web Search Rewriter + Response Generator로 relevance에 따라 소싱 전략 적응 |
| **Sophisticated Controllable Agent** ★ | 별도 repo `Controllable-RAG-Agent`. 결정론적 graph를 "brain"으로 삼아 question anonymization → 고수준 planning → task 분해 → 적응적 검색·QA → 재계획 → 답변 검증 |

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

repo는 교육용 카탈로그라 **기법 간 통일 벤치마크는 없다**. 정량 수치는 개별 기법 노트북과 원논문에 흩어져 있다. 눈에 띄는 수치와 산출물은 다음과 같다.

- **HyPE**: context precision 최대 **+42%p**, claim recall 최대 **+45%p** 향상을 주장한다(SSRN 프리프린트 근거).
- **Dartboard Retrieval**: dense DB에서 plain RAG는 성능이 떨어지고 dartboard가 이를 앞서는 PoC를 담았다.
- **평가 노트북**: DeepEval·GroUSE·RAGAS(End-to-End)·Open-RAG-Eval로 실제 점수를 뽑아 보는 실행 예제다. 자기 데이터에 평가를 직접 붙이는 방법을 익힐 수 있다.
- 정성 결과: 모든 노트북이 Colab에서 바로 돌아가, 같은 입력으로 여러 기법을 직접 돌려 비교해 볼 수 있다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **라이선스 제약** — custom non-commercial. athina(MIT)와 달리 **상업 사용에는 서면 허가가 필요**하고 attribution 의무가 있다. 실무·제품에 넣기 전 라이선스 검토가 필수다(이 repo에서 가장 신경 써야 할 실무 주의점).
- **벤치마크 부재** — 통일된 정량 비교가 없으니 "내 데이터엔 어떤 기법이 나은가"는 직접 재 봐야 한다.
- **README 정합성 문제** — 마스터 표의 항목 번호와 하단 상세 섹션 번호가 어긋나고(중복·건너뜀), 일부 GitHub 링크는 `.../blob/main/https://colab...`처럼 URL이 이중으로 끼어 깨졌다. 실제 노트북은 `all_rag_techniques/{name}.ipynb` 경로로 들어가야 하는 경우가 있다.
- **유지보수 편차** — 노트북마다 프레임워크·라이브러리 버전이 제각각이라 LangChain/LlamaIndex API가 바뀌면 일부가 깨질 수 있다(스냅샷 성격).
- **벤더·플랫폼 종속 기법** — Agentic RAG는 Contextual AI 플랫폼, Graph RAG(Milvus)처럼 특정 인프라에 묶인 노트북이 있어 재현하려면 외부 계정·서비스가 든다.
- **깊이의 한계** — 각 기법은 "동작하는 최소 예제" 수준에 머문다. 프로덕션 스케일링·실패 모드·하이퍼파라미터 튜닝은 도서(*RAG Made Simple*)나 원논문에 넘긴다.

## 6. 관련 연구 (Related Work)

- [[database/athina-ai-rag-cookbooks]] — **가장 직접적인 비교 대상**이다. 같은 "RAG 기법 노트북 cookbook" 포맷이지만 athina는 16종·MIT·Athina 평가 종속이고, NirDiamant는 42+종·non-commercial에다 chunking/query enhancement까지 더 잘게 나눴다. 두 repo가 다루는 기법(HyDE·fusion·CRAG·self·adaptive·reranking)은 상당 부분 겹친다.
- [[database/edge-2024-from-local-to-global]] — Microsoft GraphRAG 원논문. 본 repo의 "Microsoft GraphRAG"·"Graph RAG" 노트북이 이를 실습으로 옮겼다.
- [[database/guo-2025-lightrag-simple-and-fast]] · [[database/guo-2025-rag-anything-all-in-one-rag]] · [[database/hkuds-rag-anything]] — graph·multimodal RAG 후속 계열. 본 repo의 Graph RAG·Multi-modal 노트북이 가볍게 건드리는 지점을 논문과 구현체로 깊이 파고든다.
- [[database/vectifyai-pageindex]] · [[database/zhang-2025-pageindex-vectorless-reasoning-rag]] · [[database/li-2026-beyond-semantic-similarity-rethinking-retrieval]] — vectorless/reasoning RAG. 본 repo의 모든 기법이 embedding·vector store를 전제로 삼는 것과 정반대 진영이다.
- self·corrective·adaptive·agentic 흐름은 wiki `agents/` 카테고리의 agent reasoning 자료로 이어진다.
- 평가 4종(DeepEval·GroUSE·RAGAS·Open-RAG-Eval)은 wiki `evaluations/` 카테고리와 맞닿는다.

## 7. 용어집 (Glossary)

- **HyPE (Hypothetical Prompt Embeddings)**: 인덱싱 시점에 chunk별 가상 질문을 생성·임베딩해 두고, 사용자 질의를 그 질문들과 맞춰 검색하는 기법. HyDE와 달리 질의 시점에 LLM을 부르지 않아 더 빠르고 저렴하다. (저자 오리지널)
- **HyDE (Hypothetical Document Embeddings)**: 질의에 답하는 가상의 이상적 문서를 LLM이 생성하고 그 임베딩으로 검색해 query-document mismatch를 완화.
- **Proposition Chunking**: 문서를 완결적·독립적 사실 명제 단위로 분해해 검색 정밀도를 높이는 chunking.
- **Contextual Chunk Headers (CCH)**: 문서·섹션 문맥 요약을 chunk 앞에 헤더로 붙여 임베딩, 고립된 chunk의 검색 정확도를 개선.
- **Relevant Segment Extraction (RSE)**: 검색 후 관련 chunk들을 이어 붙여 더 긴 multi-chunk 문맥을 동적으로 구성하는 후처리.
- **Dartboard Retrieval**: relevance와 diversity를 단일 스코어(Relevant Information Gain)로 합쳐 직접 최적화하는 검색.
- **RAPTOR**: Recursive Abstractive Processing for Tree-Organized Retrieval — 문서를 재귀 요약으로 트리화해 계층적 문맥을 제공.
- **Self-RAG**: 모델이 검색 필요성·문서 관련성·답변 근거·유용성을 스스로 평가하는 다단계 자가 점검 RAG.
- **Corrective RAG (CRAG)**: retrieval evaluator로 관련성을 판정해 정제·웹검색 보강으로 소싱 전략을 교정하는 RAG.
- **MemoRAG**: key-value 메모리 추출과 surrogate query로 장문 문맥을 다루는 memory-augmented RAG.
- **GroUSE**: contextually-grounded LLM 생성을 6개 지표로 평가하고 custom LLM judge를 unit test로 meta-evaluate하는 평가 프레임워크.
- **UMBRELA / AutoNuggetizer**: Open-RAG-Eval이 쓰는 open-source 평가 컴포넌트(관련성 스코어링·nugget 기반 평가).
- **Colpali**: 문서를 텍스트 파싱 없이 이미지로 렌더링해 VLM으로 검색하는 multi-modal RAG 경로.
