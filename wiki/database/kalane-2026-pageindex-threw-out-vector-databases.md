---
title: "PageIndex: The RAG Framework That Threw Out Vector Databases and Still Hit 98.7% Accuracy"
type: article
year: 2026
category: database
raw_path: /Users/kmyu/Desktop/project/ai-wiki/raw/articles/kalane-2026-pageindex-threw-out-vector-databases.md
raw_filename: "kalane-2026-pageindex-threw-out-vector-databases.md"
source: kalane-2026-pageindex-threw-out-vector-databases.md
source_collection: external
author: "Akshay Kalane"
url: "https://pub.towardsai.net/pageindex-the-rag-framework-that-threw-out-vector-databases-and-still-hit-98-7-accuracy-d194e0549478"
publisher: "Towards AI (pub.towardsai.net)"
publication_date: "2026-04-02"
tags: [rag, vectorless-rag, pageindex, reasoning-based-rag, financebench, mafin-2.5, mcp, openai-agents-sdk, vision-rag, tree-search, in-context-index, third-party-assessment]
---

## 요약 (Summary)

IBM AI 엔지니어 Akshay Kalane가 2026-04-02 Towards AI(Medium)에 게재한 PageIndex **3rd-party post-launch 리뷰**다. [[database/zhang-2025-pageindex-vectorless-reasoning-rag]]의 founder intro(2025-09)를 인용·확장하며, 두 가지 가치를 더한다 — (1) **Mafin 2.5(VectifyAI 자체 보고)의 FinanceBench 98.7%** 정량 표를 vector RAG ~50% · GPT-4o direct ~31% · Perplexity ~45%와 비교, (2) **launch 이후 6개월간 추가된 신규 기능 카탈로그**(OpenAI Agents SDK 통합 · Vision-based OCR-free 모드 · `pageindex-js-sdk` TS SDK · `.mcpb` Claude Desktop 익스텐션 · ChatIndex 2026-01)를 정리한다. 동시에 latency · cost · breadth-not-depth · structure dependency · reasoning approximation 다섯 trade-off를 솔직 진단하고 *"It's a depth tool, not a breadth tool"*로 결론낸 뒤, 대규모 corpus는 vector search로 후보 *문서*를 좁힌 다음 PageIndex로 deep extraction 하는 **hybrid play**를 *"probably underexplored"*로 강조한다.

## 주요 기여 (Key Contributions)

- **FinanceBench 정량 비교 표 (verbatim, VectifyAI 자체 보고)** — Mafin 2.5(PageIndex) **98.7%** / 100% coverage, 전통 vector RAG ~50%, GPT-4o direct ~31%, Perplexity ~45%. 격차 ~49 pp. [[database/zhang-2025-pageindex-vectorless-reasoning-rag]] founder intro가 정량 수치를 미제시했던 빈자리를 채움.
- **Post-launch 5대 신규 기능 카탈로그** — (1) OpenAI Agents SDK 통합 (`agentic_vectorless_rag_demo.py`, agent에 `get_document` · `get_document_structure` · `get_page_content` 3 tools), (2) Vision-based OCR-free 모드(page image → vision LLM, balance sheet 시각 레이아웃 보존), (3) `pageindex-js-sdk` TypeScript SDK (2026 초), (4) `.mcpb` Claude Desktop Extension (더블클릭 OAuth 자동), (5) ChatIndex (2026-01, 같은 tree-indexing을 conversation history에 적용).
- **end-to-end Python 코드 with gpt-4.1** — `PageIndexClient.upload` + `is_retrieval_ready` 폴링 + `get_tree(node_summary=True)` → `utils.remove_fields(tree, ["text"])`로 토큰 절약 후 `chat.completions.create(model="gpt-4.1", response_format={"type": "json_object"})` 한 번에 `{thinking, node_list}` 반환 → `utils.flatten_tree` + 선택된 노드의 text concat → answer prompt + cite pages/sections. [[database/geeksforgeeks-2026-vectorless-rag-pageindex]]의 Gemini-2.5-flash 변형과 OpenAI gpt-4.1 변형으로 짝을 이룬다.
- **"Appendix G" 사례를 reasoning trace로 재현** — Federal Reserve annual report에서 "total deferred assets" 쿼리 시 main body(pp. 75–82)는 변화분만, p. 77이 *"Table 5.3 ... Appendix G of this report provides more detailed information"*을 cue로 두면 PageIndex가 트리를 따라 Appendix G 노드로 이동해 정확한 총합을 반환. [[database/zhang-2025-pageindex-vectorless-reasoning-rag]]에 정성 사례로 있던 것을 Python + benchmark 수치와 함께 정량적 맥락에서 재서술.
- **3rd-party trade-off 진단** — 창업자 글에서 약했던 latency(수초, 다중 LLM 호출) · cost · scale 한계 · structure dependency · *"PageIndex fails through reasoning approximation"* 실패 모드를 한 절로 정리.

## 방법론 및 아키텍처 (Methodology and Architecture)

**대비군 — Vector RAG (저자의 5대 실패 모드)**:
(1) Query-Answer Mismatch (intent vs content), (2) Term Frequency Problem ("operating income" 60+ 등장), (3) Chunking Destroys Tables (header chunk 14 + data row chunk 15 분리), (4) No Multi-Turn Memory, (5) Cross-References Invisible ("see Appendix G"는 semantic similarity 0). Mingtian Zhang 인용 *"relevance requires reasoning."*

**Step 1 — Hierarchical Tree Index (offline)**: ingest 시 embedding 0개. 대신 LLM-optimized ToC를 JSON tree로 변환. 50-page SEC filing → 30–50 노드. 전체 tree가 단일 LLM context window에 fit → **in-context index** (vector DB의 외부 static 저장소와 대비). 각 `node_id`는 해당 섹션의 raw text/table/image에 매핑.

노드 스키마(verbatim):
```json
{
  "node_id": "0006",
  "title": "Financial Stability",
  "start_index": 21,
  "end_index": 22,
  "summary": "Covers the Federal Reserve's financial stability oversight...",
  "sub_nodes": [...]
}
```

**Step 2 — Reasoning-Based Tree Search (online)**: LLM에 트리(titles + summaries only, raw text 제외)와 *"Given this document structure and this question, where should we look?"*를 입력 → `node_id` 리스트 반환 → 선택된 노드의 raw text fetch. 4-step loop: (i) Scan ToC, (ii) Pick section, (iii) Read it, (iv) Enough? → 반복 or 답변. *"Vector DB computes cosine similarity for every chunk in parallel, fast but dumb. PageIndex asks the LLM to think about where the answer lives."* 모든 hop이 **reasoning trace**로 가시화.

## 결과 (Results)

**FinanceBench 비교** (VectifyAI 자체 보고치, 독립 재검증 없음):

| System | Accuracy | Coverage |
|---|---|---|
| **Mafin 2.5 (PageIndex)** | **98.7%** | 100% |
| Traditional vector-based RAG | ~50% | varies |
| GPT-4o (direct, no RAG) | ~31% | 100% |
| Perplexity | ~45% | varies |

저자가 짚은 성능 driver 3가지: cross-reference following, structure preservation (table header · footnote · cell relationship 유지), multi-step reasoning (FY2023 vs FY2024 같이 데이터가 두 섹션에 흩어진 질문). 부수 수치: vector RAG latency ms 단위, PageIndex *"several seconds"*. GitHub 23k+ stars / ~2k forks (2026-03 말).

## 한계와 비판적 시각

저자 본인이 정리한 5가지 trade-off:
1. **Latency** — 다중 LLM 호출(인덱스 read + 노드 reason + content fetch + 충분성 평가 + loop). 창업자 측 *"time-to-first-token은 normal LLM 호출과 비슷"* 주장은 인정하나, 총 latency는 더 높음을 결론.
2. **Cost** — 쿼리당 다수 LLM inference vs. single embedding lookup. *"For high-volume applications, the cost math gets rough fast."*
3. **Depth, Not Breadth** — 단일 long document deep extraction에 *phenomenal*. 10,000개의 짧은 문서 동시 검색이라면 *"vector databases earn their keep."*
4. **Structure Dependency** — 잘 정리된 SEC filing은 우수, scanned PDF는 ToC가 degrade. Vision-based RAG 모드가 일부 완화하지만 structured docs가 sweet spot.
5. **Reasoning Approximation Failure Mode** — *"Vector RAG fails through embedding approximation. PageIndex fails through reasoning approximation."* 잘못된 노드 선택 · summary 오해 · sub-node skip 가능. 더 interpretable · debuggable하지만 vanish하지 않음.

추가: **단일 벤치마크 의존성** — 98.7%는 FinanceBench(well-structured SEC filing) 한 가지에서만 검증. messy · multi-domain · ambiguous 쿼리에서는 *"hasn't been independently validated to the same degree."*

저자 권고: **hybrid play** — 큰 corpus에서 vector search로 후보 *문서* 좁힌 뒤 PageIndex로 deep extraction. *"Best of both worlds. The hybrid play is probably underexplored."*

## 관련 페이지 (Related Pages)

- [[database/zhang-2025-pageindex-vectorless-reasoning-rag]] — PageIndex 창업자(Mingtian Zhang, Yu Tang) intro(2025-09-19). 본 글이 인용·확장하는 출발점. "Appendix G" 사례 · in-context index 개념 · vector RAG 5대 한계가 여기서 정의됨. Kalane 글은 이 위에 Mafin 2.5 정량 표 + post-launch 신규 기능을 얹는 update.
- [[database/vectifyai-pageindex]] — 본 글의 코드 예제(`PageIndexClient`, `upload`, `get_tree`, `is_retrieval_ready`, `utils.print_tree`, `utils.flatten_tree`, `utils.remove_fields`)가 사용하는 오픈소스 레포. MIT, GitHub 23k+ stars.
- [[database/geeksforgeeks-2026-vectorless-rag-pageindex]] — 같은 PageIndex Cloud SaaS API 다루는 자매 튜토리얼(2026-03-09, LangChain + Gemini-2.5-flash + DeepSeek-R1). Kalane 글은 더 최신(2026-04) + Agents SDK · Vision · TS SDK 신규 기능 추가하는 후속 버전.
- [[database/sguys99-langchain-study-vectorless-rag]] — 사용자 본인의 LangChain + Gemini vectorless RAG 실습. Kalane 글의 OpenAI `gpt-4.1` + Agents SDK 변형과 함께 구현 사례 페어.
- [[database/li-2026-beyond-semantic-similarity-rethinking-retrieval]] — Direct Corpus Interaction(DCI). embedding/index 없이 agent가 raw corpus 직접 검색. Kalane이 정리한 vector RAG 5대 한계의 학술적 근거이자 vectorless 패러다임의 자매 접근.
- [[database/lumer-2025-rethinking-retrieval-from-traditional-retrieval]] — semantic similarity 한계와 retrieval 재정의 흐름. *"relevance requires reasoning"* 명제의 이론 배경.
