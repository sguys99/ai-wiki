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
tags: [rag, advanced-rag, agentic-rag, langchain, langgraph, hyde, hybrid-rag, corrective-rag, self-rag, adaptive-rag, react, reflexion, rewoo, rag-evaluation, athina, cookbook, repo, oss]
---

## 한 줄 요약 (One-line Summary)

Athina AI의 **rag-cookbooks**는 naive RAG에서 출발해 advanced·agentic RAG까지 16개 기법을 각각 **end-to-end Jupyter 노트북 한 개 + Athina AI 평가 단계**로 정리한 실무 레시피 모음이다. 대부분의 노트북이 원논문(arXiv) 참조를 명시하며, "기법 설명 → LangChain/LangGraph 구현 → 평가"라는 일관된 템플릿을 따른다.

## 1. 자료 정보 (Document Information)

- **Org / Repo**: `athina-ai/rag-cookbooks`
- **License**: MIT (Copyright (c) 2024 Athina AI)
- **형식**: Jupyter notebook 컬렉션 (별도 패키지 없음 — 각 노트북이 자기완결적 end-to-end 예제)
- **Snapshot**: `git clone --depth 1` (2026-06-07 시점)
- **공통 스택**: LangChain · LangGraph · 다양한 vector store(Pinecone / Chroma / Weaviate / Qdrant / FAISS) · **Athina AI**(평가 플랫폼, 모든 노트북 마지막 단계) · Google Colab badge로 즉시 실행 가능
- **상위 디렉토리 구성**:
  - `advanced_rag_techniques/` — 8개 노트북 (naive · hybrid · hyde · parent_document_retriever · fusion · contextual · rewrite_retrieve_read · basic_unstructured)
  - `agent_techniques/` — 3개 노트북 (react · reflexion · rewoo) — *README 표에는 미수록된 reasoning agent 패턴*
  - `agentic_rag_techniques/` — 5개 노트북 (basic_agentic · corrective · self · adaptive · agentic_rag_using_deepseek_qdrant_and_langchain)
  - `data/` — 공용 샘플 데이터: `context.csv`(~1.7MB), `tesla_q3.pdf`(~1MB, Tesla Q3 실적 보고서)
  - `README.md` · `LICENSE.txt`
- **비고**: repo에 별도 이미지 파일(`assets/`·`img/`)이 없다. 일부 노트북(예: corrective_rag)은 다이어그램을 cell에 base64로 직접 임베드하고, README는 GitHub user-attachments CDN 이미지를 링크한다 → wiki 임베드용 figure 후보 없음(`figures:` 키 생략).

## 2. 주요 기여 (Key Contributions)

1. **RAG 기법 카탈로그의 단일 진입점** — naive를 baseline으로 두고 advanced → agentic으로 난이도가 점증하는 16개 기법을 한 repo에 모았다. 각 기법을 처음부터 구현하는 시간과 평가 방법을 찾는 수고, 이 두 진입장벽을 ready-to-use 노트북으로 덜어내는 것이 명시적 목표다.
2. **일관된 노트북 템플릿** — 거의 모든 노트북이 같은 구조를 따른다: `Initial Setup` → `Indexing` → `Retriever`(+기법별 추가 컴포넌트) → `RAG Chain` → `Preparing Data for Evaluation` → `Evaluation in Athina AI`. 그래서 학습자가 기법 간 차이를 컴포넌트 단위로 비교하기 쉽다.
3. **논문 grounding** — 16개 중 11개 노트북이 원논문 arXiv 링크를 헤더에 명시한다(아래 표). 기법의 출처를 추적할 수 있어 cookbook을 논문 reading list로도 쓴다.
4. **평가 일급화 (Athina AI)** — 모든 노트북이 구현으로 끝나지 않고 Athina AI 평가 단계를 포함한다. 기법마다 적합한 eval을 골라 쓴다 (예: contextual_rag → Context Relevancy, corrective_rag → Context Precision).
5. **vector store·LLM 백엔드 다양성** — 노트북마다 다른 vector DB(Pinecone/Chroma/Weaviate/Qdrant/FAISS)와 도구(BM25·Unstructured.io·DeepSeek)를 의도적으로 섞어, 특정 벤더에 묶이지 않은 패턴 학습을 유도한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

repo는 라이브러리가 아니라 **노트북 컬렉션**이라, 여기서 "아키텍처"는 각 기법의 파이프라인과 공용 평가 템플릿을 가리킨다.

### 공용 노트북 골격

```
[data/context.csv | data/tesla_q3.pdf]
   ↓ Initial Setup        (API key, LLM, embedding 준비)
   ↓ Indexing             (chunk → embedding → vector store)
   ↓ Retriever            (기법별 핵심 — 여기서 기법이 갈린다)
   ↓ RAG Chain            (retrieved context + query → LLM 답변)
   ↓ Preparing Data for Evaluation   (query/context/response/ground-truth 정리)
   → Evaluation in Athina AI         (기법에 맞는 preset eval)
```

### Advanced RAG 8종 (retriever 단계의 변형)

| 기법 | 핵심 변형 | 도구 | 원논문 |
|---|---|---|---|
| **Naive RAG** | retrieved context + LLM 단순 결합 (baseline) | LangChain · Pinecone | [arXiv 2005.11401](https://arxiv.org/pdf/2005.11401) (Lewis et al., RAG) |
| **Hybrid RAG** | vector similarity ⊕ BM25/full-text 결합 | LangChain · Chroma | [2408.05141](https://arxiv.org/pdf/2408.05141) · [2408.04948](https://arxiv.org/pdf/2408.04948) |
| **HyDE RAG** | 질의로 *가상 문서(hypothetical doc)* 생성 → 그 embedding으로 검색 | LangChain · Weaviate | [2212.10496](https://arxiv.org/pdf/2212.10496) |
| **Parent Document Retriever** | child chunk로 검색, 매칭 시 parent 전체 문서 반환 | LangChain · Chroma | [LangChain docs](https://python.langchain.com/docs/how_to/parent_document_retriever/) |
| **RAG Fusion** | sub-query 생성 → Reciprocal Rank Fusion(RRF)로 재순위 | LangChain · LangSmith · Qdrant | [2402.03367](https://arxiv.org/pdf/2402.03367) |
| **Contextual RAG** | retrieved doc을 Document Compressor로 압축(노이즈 제거) | LangChain · Chroma | — |
| **Rewrite-Retrieve-Read** | 질의를 먼저 rewrite → 검색 품질 향상 → 답변 | LangChain · Chroma | [2305.14283](https://arxiv.org/pdf/2305.14283) |
| **Unstructured RAG** | text·table·image 혼재 문서를 Unstructured.io로 파싱·분리 | LangChain · LangGraph · FAISS · Unstructured | — |

### Agentic RAG 5종 (LangGraph 기반 제어 흐름)

| 기법 | 핵심 메커니즘 | 도구 | 원논문 |
|---|---|---|---|
| **Basic Agentic RAG** | agent가 VectorStore·WebSearch 두 tool을 선택·호출 | LangChain · FAISS | [2501.09136](https://arxiv.org/pdf/2501.09136) |
| **Corrective RAG (CRAG)** | Document Grader로 relevant/irrelevant/ambiguous 판정 → 정제·폐기·web search 보강 | LangChain · LangGraph · Chroma | [2401.15884](https://arxiv.org/pdf/2401.15884) |
| **Self RAG** | reflection token으로 검색 필요성·답변 충분성을 모델이 자가 점검 | LangChain · LangGraph · FAISS | [2310.11511](https://arxiv.org/pdf/2310.11511) |
| **Adaptive RAG** | 질의 복잡도에 따라 self-corrective(인덱스) vs web search 전략 분기 | LangChain · LangGraph · FAISS | [2403.14403](https://arxiv.org/pdf/2403.14403) |
| **Agentic RAG (DeepSeek)** | DeepSeek + Qdrant 기반 basic agentic RAG 변형 | LangChain · Qdrant · DeepSeek | [2501.09136](https://arxiv.org/pdf/2501.09136) |

### Agent 기법 3종 (`agent_techniques/`, RAG와 독립적인 reasoning 패턴)

| 기법 | 핵심 | 원논문 |
|---|---|---|
| **ReAct** | reasoning trace와 action을 interleaving — 사고+도구호출 교대로 hallucination 감소·해석성 향상 (LangChain·CrewAI 두 구현 제공) | [2210.03629](https://arxiv.org/pdf/2210.03629) (Yao et al.) |
| **Reflexion** | verbal reinforcement learning — 수치 보상 대신 자기반성(self-reflection) 텍스트를 episodic memory에 저장, 가중치 갱신 없이 개선 | [2303.11366](https://arxiv.org/pdf/2303.11366) (Shinn et al.) |
| **ReWOO** | Reasoning WithOut Observation — 도구 응답을 기다리지 않고 reasoning plan을 선생성해 token 중복·연산 비용 절감 | [2305.18323](https://arxiv.org/pdf/2305.18323) (Xu et al.) |

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

이 repo는 **벤치마크 수치를 제공하지 않는다** — 교육용 cookbook이지 성능 비교 연구가 아니다. 정량 결과는 각 기법의 원논문(위 표 링크)을 참조해야 한다. repo가 내놓는 "결과"는 다음 정도다:

- 각 노트북 말미의 **Athina AI 평가 실행 예시** — 기법마다 적합한 preset eval을 골라 실제 점수를 산출하는 방법을 보여준다 (Context Relevancy, Context Precision 등).
- 공용 데이터(`tesla_q3.pdf`, `context.csv`)로 모든 기법을 같은 입력에서 돌려볼 수 있어, 사용자가 직접 정성 비교를 한다.
- 커뮤니티 지표: GitHub에서 널리 star 받은 RAG 학습 자료 중 하나다(README가 star 요청·share 배지를 강조한다).

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **벤치마크 부재** — 기법 간 우열을 정량 비교하는 데이터가 없다. "어떤 기법이 내 데이터에 더 나은가"는 사용자가 Athina eval로 직접 측정해야 한다.
- **Athina AI 종속** — 평가 단계가 Athina 플랫폼 API에 묶여 있어, 평가 부분을 재현하려면 Athina 계정·API key가 필요하다. 구현부는 독립적이지만 eval은 vendor-locked다.
- **유지보수 편차** — 노트북마다 vector store·LLM·라이브러리 버전이 제각각이라, LangChain/LangGraph API가 바뀌면 일부 노트북이 깨질 수 있다(특정 시점 스냅샷 성격).
- **README 카탈로그 불완전** — README 표는 advanced 7종 + agentic 5종만 나열한다. `agent_techniques/`의 react·reflexion·rewoo와 naive/unstructured 일부는 파일이 있는데도 표에서 빠졌다. README의 ReAct RAG 링크가 `react_rag.ipynb`를 가리키지만 실제 파일은 `agent_techniques/react.ipynb`라, 경로가 어긋나는 곳도 있다.
- **deep-dive 부재** — 각 기법을 "동작하는 최소 예제" 수준으로만 보여주며, 프로덕션 스케일링·실패 모드·하이퍼파라미터 튜닝은 다루지 않는다.

## 6. 관련 연구 (Related Work)

- [[database/edge-2024-from-local-to-global]] — GraphRAG. 본 cookbook이 다루지 않는 graph 기반 RAG 계열의 출발점. cookbook의 hybrid/fusion이 vector 중심이라면 GraphRAG는 KG 중심이다.
- [[database/guo-2025-lightrag-simple-and-fast]] · [[database/guo-2025-rag-anything-all-in-one-rag]] · [[database/hkuds-rag-anything]] — KG·multimodal RAG. cookbook의 unstructured RAG가 가볍게 건드리는 multimodal 문제를 본격적으로 다루는 후속 계열.
- [[database/vectifyai-pageindex]] · [[database/zhang-2025-pageindex-vectorless-reasoning-rag]] — vectorless/reasoning RAG. cookbook의 모든 기법이 vector store를 전제하는 것과 대비되는 반대 진영.
- [[database/li-2026-beyond-semantic-similarity-rethinking-retrieval]] — DCI. cookbook의 retrieval interface(vector similarity) 자체를 재고하는 관점.
- agentic RAG의 self/corrective/adaptive 흐름은 본 wiki `agents/` 카테고리의 agent reasoning 자료들과 직접 이어진다 (ReAct·Reflexion·ReWOO는 일반 agent 패턴).
- 평가 측면: 본 wiki `evaluations/` 카테고리(RAGAS 등)와 cookbook의 Athina AI eval 단계가 대응한다.

## 7. 용어집 (Glossary)

- **Advanced RAG**: naive RAG의 retriever/generation 단계를 개선한 기법군(hybrid·hyde·fusion·contextual 등). 제어 흐름은 여전히 선형이다.
- **Agentic RAG**: LLM agent가 도구 선택·재검색·자가 점검 등 동적 의사결정을 수행하는 RAG. 본 repo에서는 주로 LangGraph state machine으로 구현한다.
- **HyDE (Hypothetical Document Embeddings)**: 질의에 직접 답하는 *가상의 이상적 문서*를 LLM이 생성하고, 그 embedding으로 검색해 query-document mismatch를 완화하는 기법.
- **Reciprocal Rank Fusion (RRF)**: 여러 sub-query의 검색 결과를 순위 역수 합으로 재점수화·통합하는 RAG Fusion의 핵심 연산.
- **Document Grader**: Corrective RAG에서 retrieved doc의 관련성을 relevant/irrelevant/ambiguous로 판정하는 LLM 컴포넌트.
- **Reflection Token**: Self RAG에서 모델이 "추가 검색 필요 여부·답변 충분성"을 스스로 표시하는 특수 토큰.
- **Verbal Reinforcement Learning**: Reflexion의 학습 방식 — 수치 보상 대신 자연어 self-reflection을 메모리에 축적해 가중치 갱신 없이 행동을 개선한다.
- **Reasoning WithOut Observation (ReWOO)**: 도구 호출 결과를 관찰하기 전에 전체 reasoning plan을 먼저 생성해, 관찰 의존적 왕복을 줄이는 prompting paradigm.
- **Athina AI**: 본 repo가 평가 단계에서 쓰는 RAG 평가 플랫폼. Context Relevancy·Context Precision 등 preset eval을 제공한다.
- **Unstructured.io**: text·table·image가 혼재된 문서를 파싱·분리하는 도구. unstructured RAG 노트북에서 사용한다.
