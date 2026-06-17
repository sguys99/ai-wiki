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
tags: [rag, advanced-rag, agentic-rag, langchain, langgraph, hyde, hybrid-rag, corrective-rag, self-rag, adaptive-rag, react, reflexion, rewoo, rag-evaluation, athina, cookbook, repo, oss]
---

## 요약 (Summary)

Athina AI의 rag-cookbooks는 naive RAG에서 출발해 advanced·agentic RAG까지 16개 기법을 다룬다. 기법마다 end-to-end Jupyter 노트북 한 개와 Athina AI 평가 단계를 붙여 정리한 실무 레시피 모음이다. 라이브러리가 아니라 노트북 컬렉션이고, 거의 모든 노트북이 `Initial Setup → Indexing → Retriever → RAG Chain → Preparing Data for Evaluation → Evaluation in Athina AI`라는 같은 골격을 따른다. 16개 중 11개는 원논문(arXiv) 링크를 헤더에 달아두어, 동작하는 코드이면서 RAG 기법의 논문 reading list 역할도 한다. 별도 패키지나 벤치마크 수치는 없다. 각 기법을 처음부터 구현하는 시간과 평가 방법을 찾는 수고를 덜어주는 학습 자료다. License는 MIT.

## 주요 기여 (Key Contributions)

- RAG 기법 카탈로그의 단일 진입점 — naive를 baseline으로 두고 advanced에서 agentic으로 난이도가 점증하는 16개 기법을 한 repo에 모았다.
- 일관된 노트북 템플릿 — 모든 노트북이 같은 6단계 골격을 공유해, 기법 간 차이를 컴포넌트 단위(특히 Retriever 단계)로 비교하기 좋다.
- 논문 grounding — 11개 노트북이 arXiv 링크를 명시한다(아래 표). 기법의 출처를 추적할 수 있다.
- 평가 일급화 (Athina AI) — 구현에서 끝내지 않고 기법마다 적합한 preset eval을 골라 실제 점수를 산출한다 (예: contextual_rag → Context Relevancy, corrective_rag → Context Precision).
- 백엔드 다양성 — 노트북마다 다른 vector DB(Pinecone/Chroma/Weaviate/Qdrant/FAISS)와 도구(BM25·Unstructured.io·DeepSeek)를 섞어, 특정 벤더에 묶이지 않은 패턴을 익히게 한다.

## 방법론 및 아키텍처 (Methodology and Architecture)

repo가 노트북 컬렉션이라, 여기서 말하는 "아키텍처"는 각 기법의 파이프라인과 공용 평가 템플릿을 가리킨다.

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
| **ReAct** | reasoning trace와 action을 interleaving — 사고와 도구호출을 교대해 hallucination을 줄이고 해석성을 높인다 (LangChain·CrewAI 두 구현 제공) | [2210.03629](https://arxiv.org/pdf/2210.03629) (Yao et al.) |
| **Reflexion** | verbal reinforcement learning — 수치 보상 대신 자기반성(self-reflection) 텍스트를 episodic memory에 저장해, 가중치 갱신 없이 개선한다 | [2303.11366](https://arxiv.org/pdf/2303.11366) (Shinn et al.) |
| **ReWOO** | Reasoning WithOut Observation — 도구 응답을 기다리지 않고 reasoning plan을 미리 생성해 token 중복과 연산 비용을 줄인다 | [2305.18323](https://arxiv.org/pdf/2305.18323) (Xu et al.) |

## 결과 (Results)

repo 자체는 벤치마크 수치를 내놓지 않는다 — 교육용 cookbook이지 성능 비교 연구가 아니다. 정량 결과는 각 기법의 원논문(위 표 링크)에서 확인해야 하고, repo가 내놓는 "결과"는 다음 정도다.

- 각 노트북 말미의 Athina AI 평가 실행 예시 — 기법마다 맞는 preset eval로 실제 점수를 산출하는 방법을 보여준다.
- 공용 데이터(`tesla_q3.pdf`, `context.csv`)로 모든 기법을 같은 입력에서 돌려볼 수 있다. 직접 정성 비교가 가능하다.
- GitHub에서 널리 star 받은 RAG 학습 자료 중 하나다.

주의할 점은 네 가지다. 첫째, 기법 간 우열을 가리는 정량 데이터가 없어 "내 데이터엔 뭐가 나은가"는 직접 측정해야 한다. 둘째, 평가 단계가 Athina 플랫폼 API에 묶여 있어 재현에 계정과 API key가 필요하다(구현부는 독립적). 셋째, 노트북마다 라이브러리 버전이 제각각이라 LangChain/LangGraph API가 바뀌면 일부가 깨질 수 있다. 넷째, README 표는 advanced 7종과 agentic 5종만 나열해 `agent_techniques/`(react·reflexion·rewoo)와 일부 노트북이 빠져 있고, ReAct RAG 링크(`react_rag.ipynb`)와 실제 파일 경로(`agent_techniques/react.ipynb`)가 어긋나는 곳도 있다.

## 관련 페이지 (Related Pages)

- [[database/edge-2024-from-local-to-global]] — GraphRAG. cookbook이 다루지 않는 graph 기반 RAG 계열의 출발점. cookbook의 hybrid/fusion이 vector 중심이라면 GraphRAG는 KG 중심.
- [[database/guo-2025-lightrag-simple-and-fast]] · [[database/guo-2025-rag-anything-all-in-one-rag]] · [[database/hkuds-rag-anything]] — KG·multimodal RAG. cookbook의 unstructured RAG가 가볍게 건드리는 multimodal 문제를 본격적으로 파고드는 후속 계열.
- [[database/vectifyai-pageindex]] · [[database/zhang-2025-pageindex-vectorless-reasoning-rag]] — vectorless/reasoning RAG. cookbook의 모든 기법이 vector store를 전제하는 것과 정반대 진영.
- [[database/li-2026-beyond-semantic-similarity-rethinking-retrieval]] — DCI. cookbook이 당연시하는 retrieval interface(vector similarity) 자체를 재고하는 관점.
