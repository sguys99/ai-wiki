---
title: "PageIndex: The RAG Framework That Threw Out Vector Databases and Still Hit 98.7% Accuracy"
type: article
year: 2026
category: database
raw_path: /Users/kmyu/Desktop/project/ai-wiki/raw/articles/kalane-2026-pageindex-threw-out-vector-databases.md
raw_filename: "kalane-2026-pageindex-threw-out-vector-databases.md"
source_collection: external
author: "Akshay Kalane"
url: "https://pub.towardsai.net/pageindex-the-rag-framework-that-threw-out-vector-databases-and-still-hit-98-7-accuracy-d194e0549478"
publisher: "Towards AI (pub.towardsai.net)"
publication_date: "2026-04-02"
tags: [rag, vectorless-rag, pageindex, reasoning-based-rag, financebench, mafin-2.5, mcp, openai-agents-sdk, vision-rag, tree-search, in-context-index, third-party-assessment]
---

## 한 줄 요약 (One-line Summary)

IBM AI 엔지니어 Akshay Kalane가 [[zhang-2025-pageindex-vectorless-reasoning-rag]] 창업자 글을 인용·확장한 **3rd-party post-launch 리뷰**로, **Mafin 2.5(VectifyAI 자체 보고)의 FinanceBench 98.7%** 정량 벤치마크 표(vs. vector RAG ~50% · GPT-4o direct ~31% · Perplexity ~45%)와 **2025-09 launch 이후 6개월간 추가된 신규 기능 카탈로그**(OpenAI Agents SDK 통합 · Vision-based OCR-free 모드 · `pageindex-js-sdk` TypeScript SDK · `.mcpb` Claude Desktop 익스텐션 · ChatIndex)를 정리하면서 latency·cost·scale·structure dependency·reasoning approximation 등 5가지 trade-off를 솔직 진단했다.

## 1. 자료 정보 (Document Information)

- **제목**: PageIndex: The RAG Framework That Threw Out Vector Databases and Still Hit 98.7% Accuracy
- **부제**: *How VectifyAI's reasoning-based retrieval is quietly dismantling the most deep-rooted assumption in production RAG*
- **저자**: Akshay Kalane — *AI Engineer @IBM | NLP | Generative AI | Machine Learning | Data Science*
- **출처**: Towards AI (`pub.towardsai.net`, Medium 호스팅)
- **발행일**: 2026-04-02 (read time ~13분)
- **유형**: 3rd-party 실무자(production RAG 2년 경험) 리뷰 + 코드 cookbook 재구성
- **Verbatim 한계**: Medium fair-use 제약으로 raw 파일은 verbatim mirror가 아닌 *structured technical extraction*(섹션별 bullet + verbatim 인용 phrase + 코드 블록 전문 + 정량 표). 모든 정량 수치 · 명명된 시스템 · 코드 예제는 원문 순서대로 보존됨.
- **관련 자료**: [[zhang-2025-pageindex-vectorless-reasoning-rag]] (founder intro 2025-09-19, 본 글이 인용·확장), [[vectifyai-pageindex]] (오픈소스 레포 MIT), [[geeksforgeeks-2026-vectorless-rag-pageindex]] (자매 튜토리얼 2026-03-09), [[sguys99-langchain-study-vectorless-rag]] (LangChain 실습 페어), [[li-2026-beyond-semantic-similarity-rethinking-retrieval]] (similarity≠relevance 이론), [[lumer-2025-rethinking-retrieval-from-traditional-retrieval]] (retrieval 재정의 흐름)

## 2. 주요 기여 (Key Contributions)

1. **Mafin 2.5 / FinanceBench 정량 비교 표 (verbatim)** — VectifyAI의 금융 분석 agent **Mafin 2.5**가 FinanceBench(real SEC 10-K/10-Q/8-K, exact-answer benchmark)의 **100% coverage에서 98.7% accuracy**, 전통적 vector RAG ~50%, GPT-4o direct ~31%, Perplexity ~45%. 약 49 percentage point 격차를 *"not incremental improvement; it's a different class of result"*로 규정. (출처 주의: VectifyAI 자체 보고치, 독립 재검증 없음.)

2. **Post-launch 6개월(2025-09 → 2026-04) 신규 기능 카탈로그** — [[zhang-2025-pageindex-vectorless-reasoning-rag]] launch 시점에는 없었던 다섯 가지:
   - **Agentic Vectorless RAG with OpenAI Agents SDK** — self-hosted PageIndex + Agents SDK 통합. agent에 세 가지 tool(`get_document()` · `get_document_structure()` · `get_page_content()`)을 부여하면 tree index 위에서 자율 reasoning. 예제: `pip install openai-agents` + `python3 examples/agentic_vectorless_rag_demo.py`.
   - **Vision-based Vectorless RAG (OCR-free)** — PDF 텍스트 추출 단계를 건너뛰고 page image를 vision-capable LLM에 직접 전달하여 트리를 구성. 금융 문서의 balance sheet / merged-cell table / footnote annotation의 *시각 레이아웃* 보존.
   - **JavaScript/TypeScript SDK** — `pageindex-js-sdk` (2026 초). Node.js 통합 + 웹 기반 문서 분석.
   - **One-click `.mcpb` Claude Desktop Extension** — bundle 파일 다운로드 → 더블클릭 → OAuth 자동 처리 → Claude Desktop 익스텐션으로 PageIndex 사용 가능.
   - **ChatIndex** — 2026-01 출시. 같은 tree-indexing 철학을 *문서가 아닌 긴 대화 history*에 적용한 자매 레포.

3. **End-to-end Python 코드 (gpt-4.1 명시)** — PageIndex Cloud SaaS API + `AsyncOpenAI`로 vectorless RAG 전체 흐름 재현:
   - **Setup**: `PageIndexClient(api_key=...)` + `AsyncOpenAI(api_key=...)`.
   - **Ingest**: `pi_client.upload("annual_report_2024.pdf")` → `doc_id` 반환 → `is_retrieval_ready(doc_id)` 폴링 → `get_tree(doc_id, node_summary=True)` 트리 fetch + `utils.print_tree(tree)`.
   - **Tree Search** (`find_relevant_nodes`): `utils.remove_fields(tree.copy(), fields=["text"])`로 raw 본문 제거(토큰 절약) → 한 번의 `chat.completions.create(model="gpt-4.1", response_format={"type": "json_object"})` 호출로 `{thinking, node_list}` 반환.
   - **Content Collection** (`collect_node_content`): `utils.flatten_tree(tree)` 후 선택된 `node_id`들의 `text`를 `[title | pages N-M]\n{text}` 포맷으로 concatenate.
   - **Answer Generation** (`answer_query`): cite specific pages and sections 프롬프트 + 결과 dict `{answer, retrieved_nodes, context_length}` 반환.
   - **MCP 통합** (verbatim JSON): HTTP MCP server (`https://api.pageindex.ai/mcp`) + 로컬 npx-based MCP server (`@pageindex/mcp`, Node.js 18+).

4. **"Appendix G" Cross-reference 사례 재현 + reasoning trace** — Federal Reserve annual report에서 "total deferred assets" 쿼리 시 main body(pp. 75–82)는 *변화분*만 기재, p. 77에 *"Table 5.3 summarizes the income, expenses, and distributions… Appendix G of this report provides more detailed information"* cue 존재. Vector RAG는 Appendix G(숫자 표)와의 semantic similarity 부재로 추적 실패. PageIndex는 LLM이 트리를 읽고 cross-reference를 인지 → Appendix G 노드로 이동 → 정확한 총합 반환, **모든 hop이 reasoning trace로 가시화**됨. [[zhang-2025-pageindex-vectorless-reasoning-rag]]의 동일 사례를 Python 코드 + benchmark 수치로 재해석.

5. **3rd-party Trade-off 솔직 진단** — 창업자 블로그가 다루지 않은 5가지 한계를 *"It's a depth tool, not a breadth tool"* 한 줄로 요약:
   - **Latency**: 매 retrieval마다 여러 LLM 호출(인덱스 read + 노드 reason + 콘텐츠 fetch + 충분성 평가, 필요 시 loop). Vector RAG는 milliseconds, PageIndex는 *"several seconds"*. (Time-to-first-token은 inline 생성으로 인해 normal LLM 호출과 비슷할 수 있다는 창업자 노트는 인정하면서도 총 latency는 더 높다고 결론.)
   - **Cost**: 쿼리당 다수 LLM inference vs. single embedding lookup. *"For high-volume applications, the cost math gets rough fast."*
   - **Depth vs Breadth**: *"phenomenal at deep extraction from a single long document"*이지만 10,000개의 짧은 문서 corpus를 동시 검색해야 한다면 vector DB가 우위.
   - **Structure Dependency**: 트리 인덱스 품질은 문서 구조에 비례. 잘 구성된 SEC 파일링은 우수, scanned PDF 등 messy 문서는 ToC가 degrade. Vision-based RAG 모드가 일부 완화하나 *"structured docs remain the sweet spot"*.
   - **Reasoning Approximation Failure Mode**: *"Vector RAG fails through embedding approximation. PageIndex fails through reasoning approximation."* 모델이 잘못된 섹션 선택 / 요약 오해 / 관련 sub-node 누락 가능. 다만 *"more interpretable, arguably more debuggable"*.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### Vector-based RAG 대비군 (저자가 정리한 5대 실패 모드)

표준 vector pipeline: 300–500 토큰 fixed chunk → `text-embedding-3-large` 등으로 embed → Pinecone / Weaviate / Milvus / Chroma / pgvector 저장 → query embedding → top-k cosine → LLM context 주입.

저자가 production에서 반복 목격한 다섯 실패 모드:
1. **Query-Answer Mismatch** — *"Vector retrieval assumes that the text most semantically similar to the query is also the most relevant."* 쿼리는 intent를, 답변은 content를 표현 → "revenue trends" 쿼리는 p. 47의 구체 table row가 아니라 revenue 언급 문단들을 retrieval.
2. **Term Frequency Problem** — 200페이지 annual report에 "operating income"이 60+회 등장 → vector similarity는 모두 비슷하게 ranking → 실제 답이 top-3 진입 실패.
3. **Chunking Destroys Tables** — *"A financial table header ends up in chunk 14, the data row the user needs is in chunk 15. Neither chunk alone makes any sense."* Overlapping window, semantic chunking, table-aware parser 모두 완화책일 뿐 근본 해결 아님.
4. **No Multi-Turn Memory** — follow-up "what about liabilities?"가 fresh query로 처리되어 직전 문서/섹션 컨텍스트 손실.
5. **Cross-References Invisible** — p. 12 "see Appendix G for details", Appendix G는 p. 87 — appendix 본문은 원 쿼리와 semantic similarity 0 → vector RAG는 follow 불가. Cross-reference metadata 주입은 *"brittle and doesn't scale."*

VectifyAI Mingtian Zhang 인용: *"relevance requires reasoning."*

### PageIndex 2-step Architecture

**Step 1: Hierarchical Tree Index (offline)**

- 문서 ingest 시 embedding 0개 생성. 대신 LLM-optimized table of contents를 hierarchical JSON tree로 구축.
- 50페이지 SEC 파일링 → 30–50 노드. 전체 tree가 단일 LLM context window 안에 fit.
- VectifyAI 용어: **in-context index** — vector DB(외부의 static embedding 저장소)와 달리, tree는 inference 동안 LLM의 active context 내부에 상주 → 모델이 *query만 하지 않고 reason 가능*.

**노드 스키마 (verbatim JSON 예시)**:
```json
{
  "node_id": "0006",
  "title": "Financial Stability",
  "start_index": 21,
  "end_index": 22,
  "summary": "Covers the Federal Reserve's financial stability oversight...",
  "sub_nodes": [
    {
      "node_id": "0007",
      "title": "Monitoring Financial Vulnerabilities",
      "start_index": 22,
      "end_index": 28,
      "summary": "Describes the Fed's vulnerability monitoring framework..."
    },
    {
      "node_id": "0008",
      "title": "Domestic and International Cooperation",
      "start_index": 28,
      "end_index": 31,
      "summary": "Federal Reserve collaboration with international bodies..."
    }
  ]
}
```

각 `node_id`는 해당 섹션의 raw content(text · table · image)와 매핑되어 LLM이 on-demand fetch.

**Step 2: Reasoning-Based Tree Search (online)**

쿼리가 들어오면 시스템은 LLM에 **트리 구조(titles + summaries only, raw text 제외)**와 *"Given this document structure and this question, where should we look?"*를 던지고 `node_id` 리스트를 받음. 그 후 실제 콘텐츠를 fetch.

Retrieval loop (4단계):
1. **Scan the ToC** — 문서 레이아웃 파악, 후보 섹션 식별.
2. **Pick a section** — 답을 가장 잘 담고 있을 노드 선택.
3. **Read it** — 해당 노드의 raw text 추출.
4. **Enough?** — 충분하면 답변 생성, 부족하면 step 1로 복귀.

저자 대비 명제: *"Vector DB computes cosine similarity for every chunk in parallel, fast but dumb. PageIndex asks the LLM to think about where the answer lives."* — 모델은 cross-reference 따라가기, multi-part 질문이 두 개 섹션을 동시에 필요로 함을 인지하기, appendix data 질문은 appendix 노드로 가야 함 등을 추론. 모든 step에 **reasoning trace** 잔존 → 더 이상 *"black-box retrieval"*이 아님.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### FinanceBench (verbatim 표)

FinanceBench는 industry-standard financial document QA benchmark, real SEC filings (10-K, 10-Q, 8-K), exact-answer 요구.

| System | Accuracy | Benchmark Coverage |
|---|---|---|
| **Mafin 2.5 (PageIndex)** | **98.7%** | 100% |
| Traditional vector-based RAG | ~50% | varies |
| GPT-4o (direct, no RAG) | ~31% | 100% |
| Perplexity | ~45% | varies |

- **출처 맥락**: Mafin 2.5는 VectifyAI가 PageIndex 위에 만든 금융 분석 agent. 본 표는 **VectifyAI 자체 보고치**이며 외부 독립 재현 없음.
- **격차**: ~49 percentage points vs. 전통 vector RAG.

### 저자가 정리한 성능 driver 3가지

1. **Cross-reference following** — *"see Appendix G"* 같은 in-document 참조를 트리 구조로 추적. Vector similarity는 이 개념 자체가 없음.
2. **Structure preservation** — 금융 table의 header · footnote · cell relationship이 트리 노드로 유지. Chunking은 이를 파괴.
3. **Multi-step reasoning** — FY2023 vs FY2024처럼 데이터가 두 섹션에 분산된 질문도 iterative loop가 자연스럽게 처리.

### 정량 수치 요약

| Metric | Value |
|---|---|
| Mafin 2.5 FinanceBench Accuracy | **98.7%** |
| Mafin 2.5 Coverage | 100% |
| Traditional vector RAG (FinanceBench) | ~30–50% |
| GPT-4o direct (no RAG) | ~31% |
| Perplexity | ~45% |
| Accuracy gap (PageIndex vs vector) | ~49 pp |
| Vector RAG 일반 chunk 크기 | 300–500 tokens |
| 50-page 문서당 PageIndex 노드 수 | 30–50 |
| PageIndex GitHub stars (2026-03 말 기준) | 23,000+ |
| PageIndex GitHub forks | ~2,000 |
| Vector RAG latency | milliseconds |
| PageIndex latency | "several seconds" |
| VectifyAI/PageIndex launch | 2025-09 |
| TypeScript SDK 출시 | 2026 초 |
| ChatIndex 출시 | 2026-01 |

## 5. 한계와 향후 과제 (Limitations and Future Work)

저자가 직접 정리한 5가지 trade-off:

1. **Latency** — 다중 LLM 호출(read index + reason + fetch content + 충분성 평가 + 잠재 loop). 창업자 측은 retrieval이 generation과 inline으로 진행되어 time-to-first-token이 normal LLM 호출과 비슷할 수 있다고 주장하지만, 저자는 *총 latency는 여전히 더 높다*고 결론.
2. **Cost** — 쿼리당 LLM inference 호출 수가 single embedding lookup 대비 큼 → high-volume application에서 *"cost math gets rough fast."*
3. **Depth, Not Breadth** — *"phenomenal at deep extraction from a single long document"*. 그러나 10,000개의 짧은 문서를 동시에 검색해야 한다면 *"vector databases earn their keep."* 모든 문서에 트리 만들고 그 위에서 reasoning은 비현실적.
4. **Structure Dependency** — 잘 정리된 SEC filing은 훌륭한 트리, 헤딩 없는 스캔 PDF는 ToC가 degrade하면서 downstream 전체가 영향. Vision-based RAG 모드가 일부 완화하지만 structured docs가 sweet spot.
5. **Reasoning Approximation** — *"Vector RAG fails through embedding approximation. PageIndex fails through reasoning approximation."* 모델이 잘못된 섹션으로 navigate, summary 오해, 관련 sub-node skip 가능. 실패 모드가 다르고 더 interpretable / debuggable하지만 *"it doesn't vanish."*

추가 비판:

- **단일 벤치마크 의존성** — *"The 98.7% is on one benchmark."* FinanceBench는 well-structured SEC filing에 특화. messy · multi-domain · 매우 ambiguous한 쿼리 + 이질적 문서 유형에서의 성능은 *"hasn't been independently validated to the same degree."*

저자가 권하는 **hybrid 활용 방안**: 큰 corpus에서 어느 문서가 관련 있는지 *vector search로 빠르게 식별* → 그 문서를 PageIndex로 *deep extraction*. *"Best of both worlds. The hybrid play is probably underexplored."*

## 6. 관련 연구 (Related Work)

- **[[zhang-2025-pageindex-vectorless-reasoning-rag]]** — PageIndex 창업자 글(2025-09-19). 본 글이 인용·확장하는 출발점. "Appendix G" 사례 + in-context index 개념 + 5대 vector RAG 한계가 여기서 정의됨.
- **[[vectifyai-pageindex]]** — 본 글의 코드 예제(`PageIndexClient`, `upload`, `get_tree`, `is_retrieval_ready`, `utils.print_tree`, `utils.flatten_tree`, `utils.remove_fields`)가 사용하는 오픈소스 레포. MIT, GitHub 23k+ stars / ~2k forks.
- **[[geeksforgeeks-2026-vectorless-rag-pageindex]]** — 같은 PageIndex Cloud SaaS API 다루는 자매 튜토리얼(2026-03-09). LangChain + Gemini-2.5-flash + DeepSeek-R1 조합. Kalane 글은 더 최신(2026-04) + Agents SDK + Vision + TS SDK 등 신규 기능 추가.
- **[[sguys99-langchain-study-vectorless-rag]]** — 사용자 본인의 LangChain + Gemini 실습. Kalane 글의 `gpt-4.1` + OpenAI Agents SDK 변형과 함께 vectorless RAG 구현 사례 페어.
- **[[li-2026-beyond-semantic-similarity-rethinking-retrieval]]** — Direct Corpus Interaction(DCI), embedding·index 없이 agent가 `grep`·`bash`로 raw corpus 직접 검색. Kalane이 정리한 vector RAG 5대 한계의 학술적 근거.
- **[[lumer-2025-rethinking-retrieval-from-traditional-retrieval]]** — semantic similarity 한계와 retrieval 재정의 흐름. Kalane "relevance requires reasoning" 명제의 이론 배경.
- **Claude Code · Cursor의 active codebase exploration** — code retrieval이 vector-based RAG에서 자율 탐색으로 이동한 선례 — 저자가 *"already happening in code"*로 언급, document retrieval도 같은 trajectory를 따른다고 주장.
- **AlphaGo metaphor** — *"Instead of searching a space exhaustively, use a learned strategy to navigate it intelligently"* — PageIndex의 reasoning-based navigation을 정당화하는 비유.
- **MCP (Model Context Protocol)** — PageIndex의 표준 배포 채널. HTTP MCP server + 로컬 npx server + `.mcpb` 데스크톱 익스텐션 3가지 통합 경로.
- **OpenAI Agents SDK** — Agentic Vectorless RAG demo의 핵심 의존성. `get_document` · `get_document_structure` · `get_page_content` 세 tool로 agent가 트리 위에서 자율 reasoning.
- **ChatIndex** — VectifyAI가 2026-01 출시한 자매 레포. 같은 tree-indexing 철학을 긴 conversation history에 적용. 팀의 방향성을 시사.

## 7. 용어집 (Glossary)

- **Mafin 2.5** — VectifyAI가 PageIndex 위에 만든 *금융 분석 agent*. FinanceBench 100% coverage에서 98.7% 정답률(자체 보고치). 본 글의 핵심 benchmark numerator.
- **FinanceBench** — real SEC filings(10-K, 10-Q, 8-K) 기반 industry-standard financial document QA benchmark. exact-answer 요구 → multi-step reasoning · cross-section reference · 정확 numerical answer가 요구되는 retrieval 난제.
- **In-context Index** — vector DB(외부 static embedding 저장소)와 대비되는 *LLM의 active context 내부에 상주하는* index. PageIndex Tree(JSON)가 inference 동안 모델 context 안에 함께 들어가 모델이 직접 navigate·reason.
- **Agentic Vectorless RAG** — PageIndex가 2026 초에 추가한 OpenAI Agents SDK 통합 모드. agent에 `get_document` · `get_document_structure` · `get_page_content` 세 tool을 부여하면 트리 인덱스 위에서 자율 tool calling 수행.
- **Vision-based Vectorless RAG (OCR-free)** — PDF 텍스트 추출 대신 page image를 vision-capable LLM에 직접 전달하여 트리 구성. 금융 문서의 balance sheet · merged-cell table · footnote 시각 레이아웃을 텍스트화 없이 보존.
- **`.mcpb` Bundle** — Claude Desktop Extension 포맷. 다운로드 → 더블클릭 → OAuth 자동 → PageIndex 설치 완료. 가장 마찰 적은 PageIndex 도입 경로.
- **ChatIndex** — 2026-01 출시된 VectifyAI 자매 레포. PageIndex의 tree-indexing 철학을 *문서가 아닌 긴 conversation history*에 적용.
- **Reasoning Approximation Failure Mode** — vector RAG가 embedding 근사로 실패한다면 PageIndex는 reasoning 근사로 실패한다는 명제. 잘못된 노드 선택, summary 오해, 관련 sub-node skip 등. 다만 더 interpretable · debuggable.
- **Hybrid Retrieval Play** — 저자가 *"underexplored"*로 강조한 권장 패턴. 큰 corpus에서 vector search로 관련 *문서*를 식별 → 그 문서를 PageIndex로 *deep extraction*.
- **Iterative Retrieval Loop** — PageIndex의 4단계 (Scan ToC → Pick section → Read it → Enough? → 반복 / 답변). 인간이 긴 문서를 다루는 방식을 모사.
- **Cross-reference Following** — *"see Appendix G"* 같은 in-document 참조를 LLM이 트리 구조로 추적하는 능력. Kalane이 꼽은 PageIndex 성능 driver의 1순위.
- **Mingtian Zhang** — VectifyAI 창업자, UCL 동문, PageIndex 공동 저자. *"relevance requires reasoning"* 인용의 출처.
- **Yu Tang** — PageIndex 공동 저자, VectifyAI.
