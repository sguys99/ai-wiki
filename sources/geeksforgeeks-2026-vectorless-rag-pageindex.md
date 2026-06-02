---
title: "Vectorless RAG: PageIndex"
type: article
year: 2026
category: database
raw_path: /Users/kmyu/Desktop/project/ai-wiki/raw/articles/geeksforgeeks-2026-vectorless-rag-pageindex.md
raw_filename: "geeksforgeeks-2026-vectorless-rag-pageindex.md"
source_collection: external
author: "GeeksforGeeks (no byline)"
url: "https://www.geeksforgeeks.org/artificial-intelligence/vectorless-rag-pageindex/"
publisher: "GeeksforGeeks"
publication_date: "2026-03-09 (Last Updated)"
tags: [rag, vectorless-rag, pageindex, reasoning-based-rag, tree-search, tutorial, langchain, gemini, deepseek-r1, geeksforgeeks]
---

## 한 줄 요약 (One-line Summary)

**GeeksforGeeks**의 튜토리얼 아티클(2026-03-09 최종 업데이트, 무서명). VectifyAI의 **PageIndex**(이미 wiki에 등록된 [`database/vectifyai-pageindex`](../wiki/database/vectifyai-pageindex.md))를 *"vectorless RAG"* 라는 범주명으로 소개하고, **개념(7가지 한계 + 7-step workflow) → 10-step Python 코드 (PageIndex Cloud API + LangChain + Gemini 2.5 Flash) → vector RAG vs vectorless RAG 5축 비교 표 → 5개 한계** 순서로 구성된 **입문용 hands-on guide**다. 예제는 PageIndex Cloud의 SaaS 클라이언트(`pi_client.submit_document` / `submit_query` / `is_retrieval_ready` / `get_retrieval`) + LangChain `ChatGoogleGenerativeAI`로 **DeepSeek-R1 논문(arXiv 2501.12948)** 을 인덱싱·질의하는 end-to-end 데모이며, 본 아티클 자체는 새 연구 결과나 벤치마크 수치를 제공하지 않는다(*"FinanceBench 98.7%"* 같은 벤치마크 인용도 없음). 가치는 (1) **"vectorless RAG"라는 카테고리 라벨** 자체를 입문자에게 정렬, (2) **PageIndex Cloud SaaS API의 실제 호출 시퀀스를 verbatim 코드로 노출**(자체 호스팅 OSS와는 다른 인터페이스), (3) **vector ≠ relevance** thesis를 5줄 표로 압축한 점에 있다.

## 1. 자료 정보 (Document Information)

- **저자/매체**: GeeksforGeeks (Artificial Intelligence 섹션 튜토리얼, 개별 byline 없음)
- **URL**: <https://www.geeksforgeeks.org/artificial-intelligence/vectorless-rag-pageindex/> (canonical: <https://www.geeksforgeeks.org/vectorless-rag-pageindex/>)
- **Last Updated**: 2026-03-09
- **수집 시점**: 2026-06-02 (사용자 명시 ingestion 요청)
- **수집 방법**: `WebFetch` 1회 — CLAUDE.md rule #1의 *"사용자가 명시적으로 자료 수집을 지시한 경우"* 예외 적용. 본문 verbatim을 Markdown으로 변환해 `raw/articles/`에 저장.
- **분량**: ~1,500 단어 + Python 코드 10개 셀 + 1개 비교 표
- **장르**: **입문 튜토리얼(hands-on)**. 신규 연구·벤치마크가 아닌 *기존 OSS([`database/vectifyai-pageindex`](../wiki/database/vectifyai-pageindex.md))의 SaaS 인터페이스를 처음 사용해보는 사람*을 위한 step-by-step 가이드.
- **저작권/품질 주의**: GeeksforGeeks는 다수 기여자·LLM 보조 가능성이 있는 매체로, 본문은 **PageIndex 공식 문서**와 **Pandey 류 mental-model 카드**(`applications/pandey-2026-rag-is-no-longer-just`)를 재조합한 톤이다.

## 2. 주요 기여 (Key Contributions)

1. **"Vectorless RAG" 라벨링** — vector embedding을 쓰지 않고 *문서 구조(tree) + LLM reasoning* 으로 retrieval하는 패턴을 **단일 범주명("vectorless RAG")** 으로 묶어 입문자에게 정렬. PageIndex를 그 reference framework로 지목.
2. **Vector RAG의 7가지 구조적 한계 리스트** — Query–Knowledge Mismatch / Similarity ≠ Relevance / Hard Chunking / Limited Multi-Step Reasoning / No Conversation History / Poor In-Document References / High Infrastructure Cost. PageIndex의 *"similarity ≠ relevance"* 슬로건과 일치.
3. **Vectorless RAG 7-step workflow** — Document Segmentation → PageIndex Tree Construction → Query Understanding → Hierarchical Reasoning-Based Retrieval → Iterative Page Exploration → Context Assembly → Answer Generation. *"인간이 챕터·섹션을 훑는 것과 유사한 reasoning loop"* 비유.
4. **PageIndex Cloud SaaS API 사용법 verbatim 노출** — `PageIndexClient(api_key=...)` → `submit_document(pdf_path)` → `is_retrieval_ready(doc_id)` 폴링 → `get_tree(doc_id, node_summary=True)` → `submit_query(doc_id=..., query=...)` → `get_retrieval(retrieval_id)` 폴링 → `retrieved_nodes[*].relevant_contents[*][*].relevant_content` 추출. 이 SaaS 인터페이스는 OSS의 `run_pageindex.py` CLI + `pageindex/retrieve.py`(`get_document`/`get_document_structure`/`get_page_content`)와 **다른 시그니처**를 가지므로 (cloud는 비동기 폴링 + retrieval_id 모델, OSS는 동기 함수 호출 모델) 두 인터페이스의 존재 자체가 명확해진다.
5. **LangChain + Gemini 2.5 Flash 연동 예시** — `ChatGoogleGenerativeAI(model="gemini-2.5-flash", temperature=0.3)`. *"Answer ONLY using the context below. If the answer is not found, say 'Not found in document.'"* grounding prompt.
6. **Vector RAG vs Vectorless RAG 5축 비교 표** — Retrieval Method / Document Representation / Search Process / Context Usage / Computation Cost. 새 통찰은 아니지만 첫 비교 표로 쓸 만함.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 Vectorless RAG의 정의(아티클 기준)

> "Vectorless RAG is a retrieval-augmented generation approach that retrieves relevant information from documents **without relying on vector embeddings**. Instead, it organizes content into indexed pages or structured sections, allowing fast keyword‑based retrieval before passing the selected context to a language model."

핵심 주장(4개):
- Eliminates Embeddings and Vector Databases
- Avoids Artificial Chunking (페이지·heading 등 자연 섹션 보존)
- Human-like Retrieval (tree를 단계별 탐색)
- Transparent Retrieval Process (interpretable, traceable)

### 3.2 7-step Workflow

| # | 단계 | 핵심 동작 |
|---|---|---|
| 1 | Document Segmentation | heading·subheading·topic change로 페이지 분할, sentence/concept 중간 단절 회피 |
| 2 | PageIndex Tree Construction | root(전체) → 섹션·서브섹션(중간) → 페이지(leaf) |
| 3 | Query Understanding | 키워드/개념 식별, 관련 branch 예측 |
| 4 | Hierarchical Reasoning-Based Retrieval | broad section → specific subsection 단계 탐색, 무관 섹션 무시 |
| 5 | Iterative Page Exploration | 페이지 읽기 → 충분성 평가 → deeper/lateral/backtrack |
| 6 | Context Assembly | 선택된 페이지만 결합, 컨텍스트 최소화 |
| 7 | Answer Generation | grounded prompt로 LLM이 응답 |

> 이 7-step은 OSS([`database/vectifyai-pageindex`](../wiki/database/vectifyai-pageindex.md))의 `examples/agentic_vectorless_rag_demo.py`가 OpenAI Agents SDK로 구현한 **agentic loop**과 동일한 conceptual 모델이다. 아티클은 SaaS API로 같은 흐름을 단순 polling 코드로 압축.

### 3.3 PageIndex Cloud SaaS API 사용 시퀀스 (Step 1–10 코드)

| 단계 | 호출 | 비고 |
|---|---|---|
| Setup | `pip install pageindex langchain langchain-google-genai google-generativeai` | LangChain + Gemini 의존 |
| Init | `PageIndexClient(api_key=PAGEINDEX_API_KEY)` | SaaS 클라이언트 (OSS의 동기 함수와 다른 인터페이스) |
| Submit | `pi_client.submit_document(pdf_path) → {"doc_id": ...}` | PDF를 cloud에 업로드 |
| Poll index | `pi_client.is_retrieval_ready(doc_id)` 5초 간격, `max_retries=30` | indexing은 async |
| Inspect tree | `pi_client.get_tree(doc_id, node_summary=True)["result"]` + `utils.print_tree(tree)` | TOC 시각화 |
| LLM | `ChatGoogleGenerativeAI(model="gemini-2.5-flash", temperature=0.3)` | LangChain wrapper |
| Submit query | `pi_client.submit_query(doc_id, query) → {"retrieval_id": ...}` | 비동기 retrieval |
| Poll retrieval | `pi_client.get_retrieval(retrieval_id)["status"]` ∈ {completed, failed} | 1초 간격 |
| Extract context | `retrieved_nodes[:top_k][*].relevant_contents[*][*]["relevant_content"]` | 3중 중첩 리스트 |
| Generate | grounded prompt + `llm.invoke(prompt)` | "Answer ONLY using context..." |

### 3.4 OSS와 SaaS 인터페이스 비교 (아티클은 미언급, 본 source 정리에서 cross-link)

| 측면 | OSS ([`database/vectifyai-pageindex`](../wiki/database/vectifyai-pageindex.md)) | SaaS (본 아티클) |
|---|---|---|
| 진입점 | `python run_pageindex.py --pdf_path ...` CLI 또는 `page_index_main()` 동기 호출 | `pi_client.submit_document(...)` 비동기 + polling |
| Tree 빌더 | `pageindex/page_index.py`(40+ 함수, TOC detect → extract → transform → physical_index 매핑 → verify → fix) 로컬 실행 | cloud-side에서 처리, `is_retrieval_ready`로 폴링 |
| Retrieval | `get_document` / `get_document_structure` / `get_page_content(pages="5-7")` 동기 함수 | `submit_query` → `retrieval_id` → `get_retrieval` 폴링 |
| OCR | "standard PDF parsing만 지원, 복잡 레이아웃은 자사 cloud OCR" (README 명시) | cloud OCR 포함 (별도 추가 비용 추정) |
| 의존성 | LiteLLM (multi-provider), 로컬 PyPDF2 | SaaS API key + LangChain wrapper |

이 격차는 OSS README가 *"복잡한 PDF는 cloud OCR을 권장"* 이라고 명시한 부분과 정합한다.

### 3.5 예제 질의

- **대상 문서**: `https://arxiv.org/pdf/2501.12948.pdf` (= **DeepSeek-R1 technical report**).
- **질의**: *"What is the main contribution of this paper?"*
- **응답**: *"reasoning abilities of LLMs can be enhanced through pure reinforcement learning, eliminating the need for human-annotated reasoning trajectories... multi-stage pipeline of DeepSeek-R1 and the development of DeepSeek-R1 Dev1, Dev2, and Dev3..."* — DeepSeek-R1 논문의 핵심 thesis를 재진술한다. 본 wiki에 DeepSeek-R1 페이지가 없으므로 본 응답이 그 논문에 대한 첫 간접 인용.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

**본 아티클은 정량 벤치마크 수치를 보고하지 않는다.** 즉 제공하지 않는 것:
- Vector RAG vs Vectorless RAG의 latency/cost/accuracy 측정
- PageIndex의 FinanceBench / HotpotQA 등 표준 벤치 결과 (이는 OSS 페이지의 *"Mafin 2.5 98.7%"* 같은 외부 인용에 의존; 본 아티클은 그 수치도 포함하지 않음)
- DeepSeek-R1 응답의 정답성 평가

대신 제공하는 것:
- **5축 정성 비교 표** (Section 3.6)
  | Feature | Vector RAG | Vectorless RAG |
  |---|---|---|
  | Retrieval Method | embedding similarity | logical reasoning + tree navigation |
  | Document Representation | high-dim vectors | hierarchical page tree |
  | Search Process | top-k chunks 1-step | broad → specific multi-step |
  | Context Usage | loosely related chunks 포함 가능 | logically relevant pages만 |
  | Computation Cost | embedding 생성·저장 필요 | vector storage 불필요 |
- **end-to-end demo의 정성 결과** (DeepSeek-R1 paper에 대한 응답 1건)

**수치 비교가 필요한 독자는** 같은 wiki 안의 다음 자료를 함께 본다:
- [[database/vectifyai-pageindex|VectifyAI/PageIndex repo]] — FinanceBench 98.7% (Mafin 2.5 별도 시스템 인용)
- [[database/li-2026-beyond-semantic-similarity-rethinking-retrieval|Direct Corpus Interaction]] — BrowseComp-Plus 80.0% vs Qwen3-Embed-8B 69.0%, cost −29.4%
- [[applications/pandey-2026-rag-is-no-longer-just|Pandey RAG 5 design space]] — vectorless를 명시적으로 다루지 않지만 design space thesis로 PageIndex 위치 좌표 제공

## 5. 한계와 향후 과제 (Limitations and Future Work)

**아티클이 명시한 5개 한계**(요약 본문 그대로):
1. 문서 구조 품질에 강하게 의존 — 헤딩이 부실하면 효과 ↓
2. LLM reasoning에 의존 — 잘못된 branch 선택 가능
3. step-by-step navigation으로 인해 **지연 ↑** 가능
4. **다수 비관련 문서 corpus에서 효과 ↓** (OSS README의 *"single document by default"* 와 정합)
5. 비구조화·열악한 문서에서 성능 저하

**아티클이 다루지 않은 한계**(본 source 정리의 보완):
- **PageIndex Cloud SaaS는 비용 모델 미공개** — `PAGEINDEX_API_KEY`만 언급할 뿐, OSS 자체 호스팅 시 LLM API 호출량(TOC 검출·추출·변환·매핑·검증·보정 각 단계마다 발생, OSS 페이지에 상세) 가 cloud에선 어떻게 청구되는지 정보 없음.
- **"vectorless"의 엄밀성 의문** — PageIndex가 *임베딩을 0% 사용하지 않는다*는 보장은 OSS 코드 기준이고, cloud 내부 구현은 불투명. 사용자에게는 *"agent-facing API에 embedding이 노출되지 않는다"* 정도로 이해되어야 안전.
- **벤치마크 부재** — 5축 비교 표는 hand-waving. 실제 cost/latency 비교는 별도 측정 필요.
- **single-document 가정의 부각 부족** — PageIndex OSS README가 *"reasoning-based RAG within a single document by default"* 라고 명시한 사실을 아티클은 한 줄("Less effective for searching across many unrelated documents") 정도로만 다룸. multi-doc은 OSS의 `examples/tutorials/doc-search/`(metadata/semantics/description 3개 워크플로우)에서 별도 처리.
- **CRAG·Self-RAG·Agentic-RAG와의 관계 미언급** — Pandey 카드(`applications/pandey-2026-rag-is-no-longer-just`)의 5개 design space 중 vectorless가 어디에 들어가는지(Agentic의 한 변종? structure-based의 별도 축?) 미정렬.
- **Conversation history 미시연** — vector RAG 한계로 *"No Awareness of Conversation History"* 를 지적했지만, 본 데모 코드는 single-turn `llm.invoke`만 보이므로 vectorless가 그 한계를 어떻게 해결하는지 미시연.

## 6. 관련 연구 (Related Work)

본 아티클은 외부 인용을 거의 하지 않지만, **묵시적으로 다음 흐름 위에 서 있다**:

- **PageIndex (Vectify AI) 원본 OSS** — [[database/vectifyai-pageindex]] (MIT, FinanceBench 98.7% Mafin 2.5 인용, 본 아티클은 이 OSS의 cloud SaaS 인터페이스를 사용)
- **Reasoning-based / structure-based RAG** — Direct Corpus Interaction([[database/li-2026-beyond-semantic-similarity-rethinking-retrieval]]) — embedding/index 없이 agent가 `grep`·`bash`로 raw corpus 검색. vectorless RAG의 **극단형** (PageIndex보다 더 raw).
- **RAG design space 정렬** — Pandey LinkedIn([[applications/pandey-2026-rag-is-no-longer-just]]) — Hybrid / Graph / Agentic / Corrective / Multimodal 5축. Vectorless를 별도 축으로 추가할지 토의 가치 있음.
- **Graph-based RAG 계보** — LightRAG([[database/guo-2025-lightrag-simple-and-fast]]) · LeanRAG([[database/zhang-2026-leanrag-knowledge-graph-based-generation]]) · RAG-Anything([[database/guo-2025-rag-anything-all-in-one-rag]], [[database/hkuds-rag-anything]]) — vector를 *완전 제거*하지는 않지만 KG로 *대안 구조* 를 제공.
- **이용된 모델/도구**: DeepSeek-R1 (arXiv 2501.12948, wiki에 별도 페이지 없음), Gemini 2.5 Flash (LangChain `langchain-google-genai`), LangChain.
- **본 아티클 외 보완재**: VectifyAI PageIndex 공식 docs, FinanceBench leaderboard, Karpathy LLM Wiki gist([[applications/liu-2026-rag-llm-wiki-or-gbrain]]의 retrieve/compile/act 3-축 분류에서 vectorless는 *retrieve* 축에 속함).

## 7. 용어집 (Glossary)

- **Vectorless RAG**: vector embedding/임베딩 유사도 검색을 사용하지 않고, **문서의 구조(heading/section/page tree)** 와 **LLM reasoning**으로 retrieval을 수행하는 RAG 패턴. 본 아티클이 사용하는 카테고리 라벨.
- **PageIndex**: VectifyAI가 공개한 vectorless·reasoning-based RAG 프레임워크. (1) PDF/MD → 계층적 TOC tree, (2) tree search retrieval. OSS([[database/vectifyai-pageindex]])와 본 아티클이 사용한 Cloud SaaS 두 인터페이스 존재.
- **Reasoning-based retrieval**: similarity 점수가 아니라 LLM의 *어디를 볼지* 판단으로 다음 노드/페이지를 고르는 retrieval. tree search 또는 graph traversal 형태.
- **Tree structure index**: 문서를 root(전체) → section(중간) → page(leaf) 트리로 표현. PageIndex의 핵심 자료구조.
- **Hierarchical reasoning-based retrieval**: broad section → specific subsection 단계 탐색. 7-step workflow의 4단계.
- **Iterative page exploration**: 선택한 페이지를 읽고 충분성 평가 → deeper/lateral/backtrack 결정하는 reasoning loop. agent의 plan-execute-evaluate 패턴.
- **Hard chunking**: fixed-size chunking. 문장·표·섹션을 임의로 자르는 vector RAG 전처리. PageIndex의 "Avoids Artificial Chunking"이 반대 입장.
- **Query–Knowledge Mismatch**: 사용자 질의가 *의도(intent)* 인데 문서는 *문구(wording)* 인 격차. vector similarity가 이 격차를 메우지 못한다는 vector RAG의 핵심 한계.
- **Grounded prompt**: 외부 컨텍스트만 사용하고 모르면 *"Not found in document"* 라고 답하라는 grounding 제약. 본 아티클 Step 9 코드.
- **`is_retrieval_ready` / `get_retrieval` polling**: PageIndex Cloud의 비동기 indexing/retrieval 상태를 client가 5초(indexing) / 1초(retrieval) 간격으로 확인하는 패턴. OSS에는 없는 SaaS-specific 인터페이스.
- **DeepSeek-R1 (arXiv 2501.12948)**: 본 아티클의 예제 대상 문서. *"pure RL로 LLM reasoning ability 강화, 인간 annotated reasoning trajectory 불필요"* thesis. wiki에 별도 페이지 없음.
