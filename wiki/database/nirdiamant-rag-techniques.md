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

## 요약 (Summary)

Nir Diamant의 RAG_Techniques는 basic RAG에서 memory-augmented·agentic·graph RAG까지 42개 넘는 실행 가능한 Jupyter 노트북을 모은 커뮤니티 주도 카탈로그다. Foundational → Query Enhancement → Context Enrichment → Advanced Retrieval → Iterative/Adaptive → Evaluation → Explainability → Advanced Architecture로 이어지는 8개 카테고리에 난이도를 계단식으로 배열했다. 기법마다 "Overview → Implementation" 짧은 설명에 LangChain/LlamaIndex 노트북, 실행 가능한 `.py` 스크립트, Colab 배지가 붙어 그 자체로 완결된다. 5만 구독자 DiamantAI 뉴스레터와 베스트셀러 도서 *RAG Made Simple*(400p)로 이어지는 학습 생태계의 코드 허브 역할을 한다.

athina cookbook과 포맷은 같지만 두 가지가 결정적으로 다르다. 하나는 규모다. 16종 대 42+종인 데다 chunking, query enhancement처럼 retriever 이전 단계까지 세분화했다. 다른 하나는 라이선스다. athina가 MIT인 반면 이쪽은 custom non-commercial이라, 비상업 사용만 자유롭고 상업 사용은 저자의 사전 서면 허가가 필요하다. 실무에 들이기 전 반드시 짚어야 할 조건이다.

## 주요 기여 (Key Contributions)

- **가장 방대한 RAG 기법 단일 카탈로그** — 42+ 기법을 기초부터 고급 아키텍처까지 8개 카테고리로 계단식 배열했다. chunking, query enhancement, context enrichment처럼 retriever 이전 단계까지 파고든 점이 athina cookbook과 갈린다.
- **Overview + Implementation 이원 설명** — 노트북을 열기 전에 "무엇을, 어떻게"를 짧게 파악한다.
- **다중 구현** — 핵심 기법은 LangChain, LlamaIndex 노트북에 CLI 실행용 `.py`(`all_rag_techniques_runnable_scripts/`)까지 함께 제공한다.
- **저자 오리지널 기법** — 특히 HyPE(Hypothetical Prompt Embeddings)는 SSRN 프리프린트를 함께 낸다. 인덱싱 시점에 chunk별 가상 질문을 미리 임베딩해 질의-질문 매칭으로 바꾸고, HyDE의 런타임 LLM 호출을 없앤다(context precision +42%p, claim recall +45%p 주장).
- **평가를 독립 섹션으로 일급화** — `evaluation/`에 DeepEval·GroUSE·End-to-End(RAGAS 연동)·Open-RAG-Eval 4종을 따로 둔다.

## 방법론 및 아키텍처 (Methodology and Architecture)

repo는 라이브러리가 아니라 노트북 카탈로그다. README 마스터 표와 상세 섹션을 기준으로 8개 카테고리를 정리했다.

### 🌱 Foundational · 🔍 Query Enhancement · 📚 Context Enrichment

| 카테고리 | 기법 | 핵심 |
|---|---|---|
| Foundational | **Simple RAG / CSV / JSON** | baseline 및 정형 파일 검색 |
| Foundational | **Reliable RAG** | 검색 문서 relevancy 검증 + 근거 segment 하이라이트 |
| Foundational | **Choose Chunk Size** | 문맥 보존과 검색 효율의 균형점 실험 |
| Foundational | **Proposition Chunking** | 완결적 명제 단위 분해 + 품질 grading |
| Query Enhancement | **Query Transformations** | rewriting + step-back + sub-query decomposition |
| Query Enhancement | **HyDE** | 가상 문서 생성 → 그 임베딩으로 검색 |
| Query Enhancement | **HyPE** ★ | 인덱싱 시점 가상 질문 임베딩 → 질의-질문 매칭 (런타임 LLM 호출 없음, 저자 오리지널) |
| Context Enrichment | **CCH / RSE** | 문서·섹션 헤더 부착 / 관련 chunk 이어붙이기 |
| Context Enrichment | **Context Window / Semantic Chunking** | 이웃 문장 확장 / 의미 응집 기반 분할 |
| Context Enrichment | **Contextual Compression / Doc Augmentation** | chunk 압축 / 질문 생성 부착 |

### 🚀 Advanced Retrieval · 🔁 Iterative & Adaptive

| 기법 | 핵심 |
|---|---|
| **Fusion Retrieval** | keyword(BM25) ⊕ vector 검색 결합 |
| **Intelligent Reranking** | LLM 스코어링 + cross-encoder + metadata 재순위 |
| **Multi-faceted Filtering** | metadata·threshold·content·diversity 필터 |
| **Hierarchical Indices** | 요약 tier + 상세 chunk tier 2단 인덱스 |
| **Dartboard Retrieval** | relevance+diversity 단일 스코어 최적화 (dense DB에서 plain RAG 능가 PoC) |
| **Multi-modal RAG** | captioning 또는 Colpali(문서 이미지화 → VLM) 두 경로 |
| **Retrieval with Feedback Loop** | 사용자 피드백으로 검색·랭킹 개선 |
| **Adaptive Retrieval** | 질의 유형별 맞춤 검색 전략 |

### 📊 Evaluation · 🧠 Memory · 🔬 Explainability

| 기법 | 핵심 |
|---|---|
| **DeepEval** | correctness·faithfulness·contextual relevancy 테스트 |
| **GroUSE** | 6개 지표 + GPT-4 평가 + custom Llama 3.1 405B judge의 meta-evaluation |
| **End-to-End Evaluation** | LLM-as-judge + RAGAS 연동, RAG-12000으로 커스텀 지표 |
| **Open-RAG-Eval** | UMBRELA·AutoNuggetizer·citation/hallucination 탐지 (FIQA) |
| **MemoRAG** | key-value 추출 + surrogate query + multi-query를 from-scratch 구현 |
| **Explainable Retrieval** | 특정 정보가 왜 검색됐는지 설명 제공 |

### 🏗️ Advanced Architecture

| 기법 | 핵심 |
|---|---|
| **Agentic RAG (Contextual AI)** | 관리형 플랫폼 기반 프로덕션 파이프라인 — Parser·reranker·Grounded LM·LMUnit |
| **Graph RAG (Milvus)** | text passage와 relationship triplet(SPO)을 별도 컬렉션에 저장 → 다중 검색 + LLM 재순위로 multi-hop 개선 |
| **Graph RAG (LangChain KG)** | knowledge graph의 엔티티·관계 + 비정형 텍스트 결합 |
| **Microsoft GraphRAG** | 엔티티·관계 추출 → community 요약 bottom-up 생성 |
| **RAPTOR** | 재귀 abstractive summarization으로 문서를 tree화 |
| **Self-RAG** | retrieval 결정 → relevance·support·utility 다단계 자가 점검 |
| **Corrective RAG (CRAG)** | Retrieval Evaluator + Knowledge Refinement + Web Search Rewriter로 소싱 전략 교정 |
| **Sophisticated Controllable Agent** ★ | 별도 repo `Controllable-RAG-Agent`. 결정론적 graph를 brain으로 삼아 planning → task 분해 → 적응 검색 → 재계획 → 답변 검증 |

## 결과 (Results)

repo는 교육용 카탈로그라 기법을 한 잣대로 비교하는 벤치마크가 없다. 정량 수치는 개별 노트북과 원논문에 흩어져 있는데, 눈에 띄는 것만 꼽으면 이렇다.

- **HyPE**: context precision 최대 +42%p, claim recall 최대 +45%p 향상 주장(SSRN 프리프린트 근거).
- **Dartboard Retrieval**: dense DB에서 plain RAG가 성능이 떨어지고 dartboard가 이를 능가하는 PoC를 제공한다.
- **평가 노트북 4종**: DeepEval·GroUSE·RAGAS·Open-RAG-Eval로 실제 점수를 산출하는 실행 예제를 실어, 사용자가 자기 데이터에 평가를 직접 붙이는 법을 익히도록 한다.
- 모든 노트북이 Colab에서 바로 돌아가므로 같은 입력에서 기법을 나란히 비교한다.

실무에 쓸 때 주의할 점이 있다. 가장 중요한 건 라이선스다. custom non-commercial이라 상업 사용에 서면 허가가 필요하고 attribution 의무가 붙는다. athina(MIT)와 갈리는 지점이다. 벤치마크를 하나로 통일하지 않았으니 "내 데이터엔 뭐가 나은가"는 직접 재봐야 한다. README 자체도 정합성이 흔들린다. 마스터 표 번호와 상세 섹션 번호가 어긋나고, 일부 GitHub 링크에는 `.../blob/main/https://colab...`처럼 URL이 이중으로 끼어 깨져 있다(실제 노트북은 `all_rag_techniques/{name}.ipynb`로 접근한다). Agentic RAG(Contextual AI)나 Graph RAG(Milvus)처럼 특정 플랫폼·인프라에 묶여, 재현하려면 외부 계정이 필요한 노트북도 있다.

## 관련 페이지 (Related Pages)

- [[database/athina-ai-rag-cookbooks]] — 가장 직접적인 비교 대상. 같은 RAG 기법 cookbook 포맷이지만 athina는 16종에 MIT, Athina 평가에 묶여 있고, 이쪽은 42+종에 non-commercial, chunking/query enhancement까지 세분화했다. 겹치는 기법(HyDE·fusion·CRAG·self·adaptive·reranking)도 많다.
- [[database/edge-2024-from-local-to-global]] — Microsoft GraphRAG 원논문. 본 repo의 GraphRAG·Graph RAG 노트북이 이를 실습으로 옮겼다.
- [[database/guo-2025-lightrag-simple-and-fast]] · [[database/guo-2025-rag-anything-all-in-one-rag]] · [[database/hkuds-rag-anything]] — graph·multimodal RAG 후속 계열. 본 repo가 가볍게 건드린 지점을 논문과 구현체로 파고든다.
- [[database/vectifyai-pageindex]] · [[database/zhang-2025-pageindex-vectorless-reasoning-rag]] · [[database/li-2026-beyond-semantic-similarity-rethinking-retrieval]] — vectorless/reasoning RAG. 본 repo의 모든 기법이 embedding·vector store를 깔고 가는 것과는 정반대 진영이다.
