---
title: "Vectorless RAG: PageIndex"
type: article
year: 2026
category: database
raw_path: /Users/kmyu/Desktop/project/ai-wiki/raw/articles/geeksforgeeks-2026-vectorless-rag-pageindex.md
raw_filename: "geeksforgeeks-2026-vectorless-rag-pageindex.md"
source: geeksforgeeks-2026-vectorless-rag-pageindex.md
source_collection: external
author: "GeeksforGeeks (no byline)"
url: "https://www.geeksforgeeks.org/artificial-intelligence/vectorless-rag-pageindex/"
publisher: "GeeksforGeeks"
publication_date: "2026-03-09 (Last Updated)"
tags: [rag, vectorless-rag, pageindex, reasoning-based-rag, tree-search, tutorial, langchain, gemini, deepseek-r1, geeksforgeeks]
---

## 요약 (Summary)

**GeeksforGeeks**의 무서명 입문 튜토리얼(2026-03-09 최종 업데이트). VectifyAI의 **PageIndex**([[database/vectifyai-pageindex|repo 페이지]])를 *"vectorless RAG"* 라는 범주명으로 묶어 소개하고, **개념(vector RAG 7가지 한계 + vectorless 7-step workflow) → 10-step Python 코드(PageIndex Cloud SaaS API + LangChain + Gemini 2.5 Flash) → vector RAG vs vectorless RAG 5축 비교 표 → 5개 한계** 순서로 구성된 hands-on guide다.

새 벤치마크나 연구 결과는 없고, 가치는 다음 세 가지에 있다.

1. **"Vectorless RAG"라는 카테고리 라벨**을 입문자에게 정렬한다 — embedding/유사도 검색을 0으로 두고 *문서 구조 + LLM reasoning* 으로만 retrieval하는 패턴을 단일 명칭으로 묶음. *"similarity ≠ relevance"* 슬로건은 PageIndex OSS README와 동일 톤.
2. **PageIndex Cloud SaaS API의 호출 시퀀스를 verbatim 코드로 노출**한다 — `PageIndexClient(api_key=...)` → `submit_document(pdf_path)` → `is_retrieval_ready(doc_id)` 5초 폴링(`max_retries=30`) → `get_tree(doc_id, node_summary=True)` → `submit_query(doc_id, query)` → `get_retrieval(retrieval_id)` 1초 폴링 → `retrieved_nodes[:top_k][*].relevant_contents[*][*]["relevant_content"]`. **OSS의 `run_pageindex.py` CLI + `pageindex/retrieve.py`의 동기 함수(`get_document` / `get_document_structure` / `get_page_content(pages="5-7")`)와 다른 시그니처**(cloud는 비동기 polling + `retrieval_id` 모델)임이 명확히 드러나, OSS↔SaaS 인터페이스 격차를 처음 시연하는 자료가 된다.
3. **DeepSeek-R1 (arXiv 2501.12948)** 을 예제 문서로 사용해 *"What is the main contribution of this paper?"* 에 대해 *"pure RL로 LLM reasoning ability를 인간 annotated trajectory 없이 강화... DeepSeek-R1 Dev1/Dev2/Dev3 multi-stage pipeline"* 응답을 생성. 본 wiki에 DeepSeek-R1 페이지가 없으므로 이 응답이 그 논문에 대한 첫 간접 인용이 된다.

본 아티클은 **튜토리얼/입문** 장르이며, 정량 비교(latency·cost·accuracy)나 PageIndex의 외부 벤치마크(예: VectifyAI README의 *"Mafin 2.5 FinanceBench 98.7%"*)도 포함하지 않는다. 따라서 wiki에서의 역할은 *"PageIndex를 처음 만지는 사람을 위한 코드 entry point"* 이며, 깊은 분석은 [[database/vectifyai-pageindex]]와 [[database/li-2026-beyond-semantic-similarity-rethinking-retrieval|DCI]]가 담당한다.

## 주요 기여 (Key Contributions)

1. **"Vectorless RAG" 라벨링** — *"문서 구조 + LLM reasoning으로만 retrieval"* 패턴을 단일 범주명으로 묶음.
2. **Vector RAG의 7가지 구조적 한계**:
   - Query–Knowledge Mismatch (의도 vs 문구)
   - Similarity ≠ Relevance (legal/technical에서 semantic 유사하지만 critical하게 다름)
   - Hard Chunking Breaks Context (fixed-size가 문장·표·섹션 절단)
   - Limited Multi-Step Reasoning (one-shot similarity, 구조 탐색 불가)
   - No Awareness of Conversation History (각 쿼리 독립 embedding)
   - Poor Handling of In-Document References (*"see Appendix G"* / *"refer to Table 5.3"* 누락)
   - High Infrastructure and Computational Cost (embedding 모델·vector store·similarity search 스택)
3. **Vectorless RAG 7-step workflow**:
   1. Document Segmentation (heading·subheading·topic change로 페이지 분할, 문장 절단 회피)
   2. PageIndex Tree Construction (root=문서, 중간=섹션·서브섹션, leaf=페이지)
   3. Query Understanding (키워드·개념 식별, 관련 branch 예측)
   4. Hierarchical Reasoning-Based Retrieval (broad → specific 다단계)
   5. Iterative Page Exploration (read → evaluate → deeper/lateral/backtrack)
   6. Context Assembly (선택 페이지만 결합)
   7. Answer Generation (grounded prompt)
4. **PageIndex Cloud SaaS 클라이언트 사용법 verbatim 노출** — 위 *요약* Section 2 참조.
5. **LangChain + Gemini 2.5 Flash grounding prompt** — `ChatGoogleGenerativeAI(model="gemini-2.5-flash", temperature=0.3)` + *"Answer ONLY using the context below. If the answer is not found, say 'Not found in document.'"*
6. **Vector RAG vs Vectorless RAG 5축 비교 표**:
   | Feature | Vector RAG | Vectorless RAG |
   |---|---|---|
   | Retrieval Method | embedding similarity | logical reasoning + tree navigation |
   | Document Representation | high-dim vectors | hierarchical page tree |
   | Search Process | top-k chunks 1-step | broad → specific multi-step |
   | Context Usage | loosely related chunks 포함 가능 | logically relevant pages만 |
   | Computation Cost | embedding 생성·저장 필요 | vector storage 불필요 |

## 방법론 및 아키텍처 (Methodology and Architecture)

### 1. Vectorless RAG의 정의 (아티클 기준)

> *"Vectorless RAG is a retrieval-augmented generation approach that retrieves relevant information from documents **without relying on vector embeddings**. Instead, it organizes content into indexed pages or structured sections."*

4가지 특성을 주장한다.
- **Eliminates Embeddings and Vector Databases** — dense similarity search 대체.
- **Avoids Artificial Chunking** — 페이지·heading 등 자연 섹션 보존, contextual continuity 유지.
- **Human-like Retrieval** — tree를 단계별로 탐색 (전문가가 챕터→섹션을 훑는 방식).
- **Transparent Retrieval Process** — traceable, interpretable.

### 2. PageIndex Cloud SaaS 호출 시퀀스 (Step 1–10)

| 단계 | 호출 |
|---|---|
| Install | `pip install pageindex langchain langchain-google-genai google-generativeai` |
| Init | `pi_client = PageIndexClient(api_key=PAGEINDEX_API_KEY)` |
| Submit | `doc_info = pi_client.submit_document(pdf_path)` → `doc_id = doc_info["doc_id"]` |
| Poll index | `while not pi_client.is_retrieval_ready(doc_id):` ... `time.sleep(5)` (`max_retries=30`) |
| Tree | `tree = pi_client.get_tree(doc_id, node_summary=True)["result"]` + `utils.print_tree(tree)` |
| LLM | `llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash", temperature=0.3)` |
| Query | `resp = pi_client.submit_query(doc_id=doc_id, query=q)` → `retrieval_id = resp["retrieval_id"]` |
| Poll retrieval | `retrieval = pi_client.get_retrieval(retrieval_id)`; `status` ∈ {`completed`, `failed`}; 1초 간격 |
| Extract | `for node in nodes[:top_k]: for group in node["relevant_contents"]: for item in group: contexts.append(item["relevant_content"])` |
| Generate | grounded prompt + `llm.invoke(prompt).content` |

### 3. OSS와 SaaS 인터페이스 비교 (본 페이지의 정리, 아티클은 미언급)

| 측면 | OSS ([[database/vectifyai-pageindex]]) | SaaS (본 아티클) |
|---|---|---|
| 진입점 | `python run_pageindex.py --pdf_path ...` CLI / `page_index_main()` 동기 | `pi_client.submit_document(...)` 비동기 + polling |
| Tree 빌더 | `pageindex/page_index.py` (40+ 함수: TOC detect → extract → transform → physical_index 매핑 → verify → fix) 로컬 실행 | cloud 처리, `is_retrieval_ready`로 폴링 |
| Retrieval | `get_document` / `get_document_structure` / `get_page_content(pages="5-7")` 동기 | `submit_query` → `retrieval_id` → `get_retrieval` 폴링 |
| OCR | "standard PDF parsing만, 복잡 레이아웃은 cloud OCR" (README 명시) | cloud OCR 포함 (별도 비용 추정) |
| 의존성 | LiteLLM multi-provider, 로컬 PyPDF2 | SaaS API key + LangChain wrapper |

이 격차는 OSS README의 *"복잡한 PDF는 cloud OCR을 권장"* 과 정합한다.

### 4. 예제 질의

- **대상 문서**: <https://arxiv.org/pdf/2501.12948.pdf> = **DeepSeek-R1 technical report**.
- **질의**: *"What is the main contribution of this paper?"*
- **응답** (Gemini 2.5 Flash):
  > *"The paper's main contribution is showing that the reasoning abilities of large language models (LLMs) can be enhanced through pure reinforcement learning (RL), eliminating the need for human-annotated reasoning trajectories. It also explores the development of reasoning abilities in LLMs through self-evolution in a reinforcement learning (RL) framework with minimal human labeling. Additionally, the multi-stage pipeline of DeepSeek-R1 and the development of its models (DeepSeek-R1 Dev1, Dev2, and Dev3) constitute the main contribution of the paper."*
- DeepSeek-R1 논문 자체는 wiki에 별도 페이지 없음 — 이 응답이 그 논문에 대한 첫 간접 인용.

## 결과 (Results)

**정량 벤치마크 없음.** 아티클이 제공하는 것은:
- 5축 정성 비교 표 (위 *주요 기여* Section 6)
- end-to-end 데모 1건의 정성 응답 (DeepSeek-R1 paper main contribution)

PageIndex의 외부 벤치마크 수치(`Mafin 2.5 FinanceBench 98.7%` 등)는 본 아티클에 인용되지 않으며, OSS 페이지([[database/vectifyai-pageindex]]) 또는 별도 저장소 `VectifyAI/Mafin2.5-FinanceBench`에서 확인해야 한다.

## 한계 (Limitations)

**아티클이 명시한 5개**:
1. 문서 구조 품질에 강하게 의존 — 헤딩이 부실하면 효과 ↓
2. LLM reasoning에 의존 — 잘못된 branch 선택 가능
3. step-by-step navigation으로 **지연 ↑** 가능
4. **다수 비관련 문서 corpus에서 효과 ↓** (OSS README의 *"single document by default"* 와 정합)
5. 비구조화·열악한 문서에서 성능 저하

**아티클이 다루지 않은 한계** (본 페이지의 보완):
- **PageIndex Cloud SaaS 비용 모델 미공개** — `PAGEINDEX_API_KEY`만 언급. OSS 자체 호스팅 시 LLM API 호출량(TOC 검출·추출·변환·매핑·검증·보정 각 단계마다 발생)이 cloud에선 어떻게 청구되는지 정보 없음.
- **"vectorless"의 엄밀성** — *"임베딩을 0% 사용하지 않는다"* 는 보장은 OSS 코드 기준. cloud 내부 구현은 불투명하므로 *"agent-facing API에 embedding이 노출되지 않는다"* 정도로 이해하는 것이 안전.
- **벤치마크 부재** — 5축 비교 표는 hand-waving. 실제 cost/latency 비교는 별도 측정 필요.
- **single-document 가정** — OSS README *"reasoning-based RAG within a single document by default"* 를 한 줄로만 다룸. multi-doc은 OSS의 `examples/tutorials/doc-search/` 워크플로우에서 별도 처리.
- **CRAG·Self-RAG·Agentic-RAG와의 관계 미언급** — Pandey의 5개 design space([[applications/pandey-2026-rag-is-no-longer-just]]) 중 vectorless의 위치(Agentic의 변종? 별도 축?) 미정렬.
- **Conversation history 미시연** — vector RAG의 *"No Awareness of Conversation History"* 를 한계로 지적했지만 데모는 single-turn `llm.invoke`. vectorless가 그 한계를 어떻게 해결하는지 미시연.

## 관련 페이지 (Related Pages)

- [[database/vectifyai-pageindex]] — VectifyAI/PageIndex OSS(MIT). 본 아티클이 사용하는 PageIndex의 *자체 호스팅 인터페이스* — `run_pageindex.py` CLI + 동기 retrieve API + LiteLLM multi-provider. 본 아티클의 cloud SaaS와 시그니처가 다르다는 점이 두 페이지를 함께 보면 명확해짐.
- [[database/li-2026-beyond-semantic-similarity-rethinking-retrieval]] — Direct Corpus Interaction (DCI). embedding/index를 *완전히* 제거하고 agent가 `grep`·`bash`로 raw corpus 직접 검색. vectorless RAG의 **극단형**으로, PageIndex(structure-tree 기반)와 DCI(no-structure raw-grep 기반)를 vectorless 스펙트럼의 양 끝으로 볼 수 있음. BrowseComp-Plus 80.0% vs Qwen3-Embed-8B 69.0%.
- [[applications/pandey-2026-rag-is-no-longer-just]] — Pandey의 RAG 5 design space (Hybrid / Graph / Agentic / Corrective / Multimodal). 본 아티클이 제안하는 *"vectorless"* 를 그 5축 위에 어떻게 배치할지(독립 축인지, Agentic의 부분집합인지) 결정해야 할 open question 제공.
- [[database/guo-2025-lightrag-simple-and-fast]] — LightRAG. vector를 *완전 제거*하진 않지만 KG entity·relation을 key-value로 직렬화 + dual-level keyword retrieval로 *"vector-only 한계 극복"* 같은 모티프. PageIndex와는 graph vs structural tree로 갈림.
- [[database/zhang-2026-leanrag-knowledge-graph-based-generation]] — LeanRAG. hierarchical KG + LCA retrieval로 redundancy 46% 감소. PageIndex는 KG 대신 *문서 내장 TOC* 를 계층의 출처로 삼는다는 차이.
- [[database/guo-2025-rag-anything-all-in-one-rag]], [[database/hkuds-rag-anything]] — RAG-Anything(논문·repo). multimodal + dual-graph. PageIndex는 modality보다 *document structure* 에 집중하는 직교 축.
- [[overviews/lightrag-family-graph-rag-overview]] — graph-based RAG 합성 페이지. PageIndex(structure-based)와 DCI(no-structure)는 graph 가지가 아닌 별도 *vectorless/structure* 가지로 추가 가능. 이 페이지에 vectorless 축을 추가하는 후속 작업 후보.
- [[applications/liu-2026-rag-llm-wiki-or-gbrain]] — Liu의 retrieve/compile/act 3-축 분류. vectorless RAG는 *retrieve* 축에 속하지만, **PageIndex tree 빌드 단계는 compile 축**으로도 볼 수 있다는 미세한 hybrid 위치.

### 한 줄 결론

본 아티클은 *"PageIndex를 코드로 처음 만져보고 싶다"* 는 입문자에게 가장 직접적인 entry point다. 깊이 있는 분석·벤치마크·아키텍처 비교는 [[database/vectifyai-pageindex]]와 [[database/li-2026-beyond-semantic-similarity-rethinking-retrieval]]에 의존하고, 본 페이지는 PageIndex Cloud SaaS 인터페이스의 verbatim 시퀀스를 보존하는 역할을 한다.
