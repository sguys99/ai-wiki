---
source_url: "https://pub.towardsai.net/pageindex-the-rag-framework-that-threw-out-vector-databases-and-still-hit-98-7-accuracy-d194e0549478"
canonical_url: "https://pub.towardsai.net/pageindex-the-rag-framework-that-threw-out-vector-databases-and-still-hit-98-7-accuracy-d194e0549478?gi=3c8ea96ac43b"
author: "Akshay Kalane"
author_byline: "AI Engineer @IBM | NLP | Generative AI | Machine Learning | Data Science"
publisher: "Towards AI (pub.towardsai.net)"
publication_date: "2026-04-02"
read_time: "13 minutes"
fetched_at: "2026-06-02"
ingestion_note: |
  사용자가 명시적으로 ingestion을 요청한 URL이므로 CLAUDE.md rule #1 예외 조항에 따라 WebFetch로 본문 수집.
  단, Medium/Towards AI는 verbatim 본문 제공이 fair-use 제한으로 거부되어,
  본 파일은 WebFetch가 반환한 **structured technical extraction**(섹션별 bullet + verbatim 인용 phrase + 코드 블록 전문 + 표)을 보존한 것이다.
  100% verbatim mirror가 아니며, 원문 전체 문장을 재구성하지 않는다.
  ingestion 대상의 모든 정량 수치, 명명된 시스템, 코드 예제, 인용 phrase, 섹션 헤딩은 원문 순서대로 보존됨.
---

# PageIndex: The RAG Framework That Threw Out Vector Databases and Still Hit 98.7% Accuracy

**Author:** Akshay Kalane — *AI Engineer @IBM | NLP | Generative AI | Machine Learning | Data Science*
**Publisher:** Towards AI (`pub.towardsai.net`)
**Publication Date:** April 2, 2026
**Read Time:** ~13 minutes
**Canonical URL:** <https://pub.towardsai.net/pageindex-the-rag-framework-that-threw-out-vector-databases-and-still-hit-98-7-accuracy-d194e0549478>

> **Archive note**: WebFetch from Medium-hosted articles is constrained by fair-use; the rendition below is a *faithful structured extraction* (section-by-section bullets, quoted verbatim phrases preserved in double quotes, full code blocks reproduced as shown by the fetcher, exhaustive benchmark/system enumeration) rather than a word-for-word mirror. Quoted phrases marked `"..."` are verbatim author phrasing as relayed by the extractor.

---

## 1. Introduction / Hook

- The author opens with two years of building RAG pipelines using chunking, embeddings, rerankers, and hybrid search strategies.
- **PageIndex** — an open-source framework from **VectifyAI** — achieves **"98.7%"** accuracy on **FinanceBench** (the industry-standard financial document QA benchmark) **without vector databases, embeddings, or chunking**.
- Traditional vector-based RAG scores **"roughly 30–50%"** on FinanceBench; PageIndex outperforms by **~49 percentage points**.
- Author frames this as a shift from "finding a better embedding model" to *eliminating embeddings entirely*.
- Financial QA on SEC filings is framed as **"one of the hardest retrieval problems in production AI"** due to multi-step reasoning, cross-section references, and exact numerical answers.

---

## 2. The Problem We Keep Papering Over

Standard vector RAG pipeline as described:
- Documents split into fixed-size chunks (300–500 tokens).
- Embedded with models like `text-embedding-3-large`.
- Stored in vector databases: **Pinecone, Weaviate, Milvus, Chroma, pgvector**.
- Query time: embed question → top-k nearest by cosine → feed to LLM.

Five recurring failure modes:

1. **Query-Answer Mismatch** — *"Vector retrieval assumes that the text most semantically similar to the query is also the most relevant."* Queries express intent, not content; searching for "revenue trends" doesn't surface specific table values.
2. **Term Frequency Problem** — A term like "operating income" appears 60+ times in a 200-page annual report; vector similarity ranks all occurrences nearly equally; relevant entries miss top-3.
3. **Chunking Destroys Tables** — *"A financial table header ends up in chunk 14, the data row the user needs is in chunk 15. Neither chunk alone makes any sense."*
4. **No Multi-Turn Memory** — Follow-up like "what about liabilities?" is treated as a fresh query with no document context.
5. **Cross-References Invisible** — Page refs like *"see Appendix G"* have zero semantic similarity to the original query; vector RAG never follows them. Metadata workarounds are *"brittle and doesn't scale."*

Architecture-level diagnosis attributed to **Mingtian Zhang** (VectifyAI co-founder): relevance requires **"reasoning,"** not just similarity.

---

## 3. What PageIndex Actually Is

- Open-source framework released by **VectifyAI in September 2025**, by **Mingtian Zhang (UCL alumnus, VectifyAI founder)** and **Yu Tang**.
- **MIT licensed**; GitHub repo: **23,000+ stars** and **~2,000 forks** as of late March 2026.
- Concept borrowed from **AlphaGo**: *"Instead of searching a space exhaustively (the way vector similarity scans all chunks), use a learned strategy to navigate it intelligently."*

Three differentiators:
1. **No Vector DB** — document structure + LLM reasoning replaces vector similarity search.
2. **No Chunking** — natural sections, chapters, paragraphs, tables; not arbitrary 500-token windows.
3. **Human-like Navigation** — *"Works the way I'd work if I were manually searching a document: check the table of contents, find the section that probably has my answer, read it."*

---

## 4. Step 1: Build a Hierarchical Tree Index

- On ingestion, PageIndex analyzes structure and generates a **hierarchical tree** (LLM-optimized table of contents).
- Each node contains:
  - `title` — section name
  - `summary` — short description
  - page range
  - `child_nodes` — recursively nested
- A 50-page SEC filing produces **~30–50 nodes** stored as JSON.
- Entire tree fits inside **a single LLM context window**; every node directly inspectable; no external vector database.
- VectifyAI's term: **"in-context index"** — the JSON tree lives inside the LLM's active context during inference.

**JSON Node Example:**
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

---

## 5. Step 2: Reasoning-Based Tree Search

- The query is handed to the LLM **with tree structure (titles + summaries only, without raw text)** and the prompt: "Given this document structure and this question, where should we look?"
- LLM returns list of `node_ids`. System then fetches the actual content from selected nodes.

Retrieval loop:
1. Scan the table of contents; identify candidate sections.
2. Pick the section most likely to contain the answer.
3. Read/retrieve raw text from that node.
4. Evaluate sufficiency; if yes → generate answer; if no → return to step 1 and try another section.

Contrast: *"Vector DB computes cosine similarity for every chunk in parallel, fast but dumb. PageIndex asks the LLM to **think** about where the answer lives."*

- Model can follow cross-references and recognize multi-part questions that need content from two sections.
- Every step leaves a **reasoning trace** with visible node visits and justifications.

---

## 6. Why This Actually Works: The "Appendix G" Example

Real demo from VectifyAI using MCP integration.

- **Scenario:** Query about *"total deferred assets"* in the **Federal Reserve annual report**.
- Main body (pages 75–82) discusses the *change* in deferred assets but never states the total.
- Page 77 contains the cross-reference: *"Table 5.3 summarizes the income, expenses, and distributions… Appendix G of this report provides more detailed information."*
- **Vector RAG failure:** Appendix G is a table of numbers with no semantic similarity to the query; the vector database ignores it.
- **PageIndex success:** LLM reads the tree, navigates to the financial section, encounters the cross-reference, follows it through the tree structure, retrieves the relevant table from the appendix, returns the exact number. The reasoning trace shows every hop.

---

## 7. Python Implementation: End-to-End Vectorless RAG

**Installation:**
```bash
pip install pageindex openai
```

**Setup:**
```python
import os
import json
import asyncio
from pageindex import PageIndexClient
from openai import AsyncOpenAI

PAGEINDEX_API_KEY = os.environ["PAGEINDEX_API_KEY"]
OPENAI_API_KEY = os.environ["OPENAI_API_KEY"]
pi_client = PageIndexClient(api_key=PAGEINDEX_API_KEY)
openai_client = AsyncOpenAI(api_key=OPENAI_API_KEY)
```

**Ingest and Build Tree:**
```python
import pageindex.utils as utils

doc = pi_client.upload("annual_report_2024.pdf")
doc_id = doc["doc_id"]

while not pi_client.is_retrieval_ready(doc_id):
    print("Still indexing...")
    import time; time.sleep(5)

tree = pi_client.get_tree(doc_id, node_summary=True)["result"]
print("Document Tree:")
utils.print_tree(tree)
```

**LLM-Driven Tree Search:**
```python
async def find_relevant_nodes(tree: dict, query: str) -> list:
    """LLM reasons over tree structure to identify relevant nodes."""
    tree_without_text = utils.remove_fields(
        tree.copy(), fields=["text"]
    )

    search_prompt = f"""
    You are a document retrieval expert. Given a question and
    a hierarchical tree structure of a document, identify all
    nodes likely to contain the answer.

    Each node has a node_id, title, and summary.
    Follow cross-references if a section mentions another.

    Question: {query}

    Document tree structure:
    {json.dumps(tree_without_text, indent=2)}

    Reply in this JSON format only:
    {{
        "thinking": "<reasoning about which nodes are relevant>",
        "node_list": ["node_id_1", "node_id_2"]
    }}
    """

    response = await openai_client.chat.completions.create(
        model="gpt-4.1",
        messages=[{"role": "user", "content": search_prompt}],
        temperature=0,
        response_format={"type": "json_object"},
    )

    result = json.loads(response.choices[0].message.content)
    print(f"LLM reasoning: {result['thinking']}")
    return result["node_list"]
```

**Retrieve and Generate Answer:**
```python
def collect_node_content(tree: dict, node_ids: list) -> str:
    """Pull raw text from the nodes the LLM selected."""
    all_nodes = utils.flatten_tree(tree)
    context_parts = []

    for node in all_nodes:
        if node["node_id"] in node_ids:
            title = node.get("title", "Untitled")
            pages = f"pages {node.get('start_index', '?')}-{node.get('end_index', '?')}"
            text = node.get("text", "")
            context_parts.append(
                f"[{title} | {pages}]\n{text}"
            )
    return "\n\n---\n\n".join(context_parts)

async def answer_query(tree: dict, query: str) -> dict:
    """Full vectorless RAG pipeline: tree search + answer generation."""
    node_ids = await find_relevant_nodes(tree, query)
    context = collect_node_content(tree, node_ids)

    answer_prompt = f"""
    Answer the question using only the provided context.
    Cite specific pages and sections in your answer.

    Context:
    {context}

    Question: {query}
    """

    response = await openai_client.chat.completions.create(
        model="gpt-4.1",
        messages=[{"role": "user", "content": answer_prompt}],
        temperature=0,
    )

    return {
        "answer": response.choices[0].message.content,
        "retrieved_nodes": node_ids,
        "context_length": len(context),
    }

query = "What was the total value of deferred assets in 2023?"
result = asyncio.run(answer_query(tree, query))
print(result["answer"])
print(f"Nodes used: {result['retrieved_nodes']}")
```

### 7b. Bonus: MCP Integration

**For Claude/Cursor via HTTP:**
```json
{
  "mcpServers": {
    "pageindex": {
      "type": "http",
      "url": "https://api.pageindex.ai/mcp",
      "headers": {
        "Authorization": "Bearer your_api_key"
      }
    }
  }
}
```

**Local MCP Server (Node.js 18+):**
```json
{
  "mcpServers": {
    "pageindex": {
      "command": "npx",
      "args": ["-y", "@pageindex/mcp"]
    }
  }
}
```

---

## 8. The Benchmark Numbers (With Context)

**FinanceBench Results** — real SEC filings (10-K, 10-Q, 8-K); expects exact answers.

| System | Accuracy | Coverage |
|---|---|---|
| **Mafin 2.5 (PageIndex)** | **98.7%** | 100% |
| Traditional vector-based RAG | ~50% | varies |
| GPT-4o (direct, no RAG) | ~31% | 100% |
| Perplexity | ~45% | varies |

- ~49 percentage point gap over traditional vector RAG; described as *"not incremental improvement; it's a different class of result."*
- **Mafin 2.5** = VectifyAI's financial analysis agent built on PageIndex, tested on **100%** of the FinanceBench dataset.

Key performance drivers:
1. **Cross-reference following** through tree structure (addresses *"see Appendix G"*).
2. **Structure preservation** — financial tables retain headers, footnotes, and cell relationships as tree nodes (chunking destroys these).
3. **Multi-step reasoning** — questions requiring data from two separate sections handled naturally by iterative loop.

---

## 9. Where PageIndex Falls Short (Trade-offs and Limitations)

- **Latency:** *"Every retrieval involves multiple LLM calls: read the index, reason about nodes, fetch content, check if it's enough, maybe loop again. Vector RAG returns in milliseconds. PageIndex takes several seconds."* (Author notes time-to-first-token can be comparable to a normal LLM call due to inline retrieval during generation, but total latency is higher.)
- **Cost:** Multiple LLM inference calls per query vs. a single embedding lookup. *"For high-volume applications, the cost math gets rough fast."*
- **Scale Limitations:** *"PageIndex is phenomenal at deep extraction from a single long document. But if you need to search across 10,000 short documents simultaneously? That's where vector databases earn their keep."*
- **Structure Dependency:** Tree index is only as good as the document's structure. Well-organized SEC filings produce excellent trees; poorly formatted scanned PDFs degrade performance. Vision-based RAG mode exists for unstructured docs but structured documents remain the *"sweet spot."*
- **Reasoning Approximation Failure Mode:** *"Vector RAG fails through embedding approximation. PageIndex fails through reasoning approximation. The model can navigate to the wrong section, misinterpret a summary, or skip a relevant sub-node. The failure mode is different, more interpretable, arguably more debuggable, but it doesn't vanish."*
- **Benchmark Scope:** *"The 98.7% is on one benchmark."* FinanceBench tests financial QA on well-structured SEC filings; performance on messy, multi-domain, highly ambiguous queries across diverse document types *"hasn't been independently validated to the same degree."*

---

## 10. When Should You Actually Use This?

**Reach for PageIndex when:**
- Long, structured professional documents: annual reports, legal contracts, regulatory filings, technical manuals.
- Accuracy matters more than speed; wrong answers carry real cost or compliance risk.
- Queries require multi-step reasoning or cross-section navigation.
- Audit trails needed — every PageIndex answer comes with a reasoning trace and node references (*"gold for regulated industries"*).

**Stick with vector RAG when:**
- Sub-second responses needed at high query volume.
- Searching across a large corpus of short documents.
- Documents are unstructured or conversational.
- 90% accuracy is sufficient for the use case.
- Cost per query is the primary constraint.

**Hybrid approach:** Use vector search to identify the relevant document from a large corpus, then hand off to PageIndex for deep extraction — *"Best of both worlds."*

---

## 11. What's Happened Since Launch (Recent Developments)

**Agentic Vectorless RAG with OpenAI Agents SDK (latest):**
- End-to-end example wiring self-hosted PageIndex to the OpenAI Agents SDK.
- Agent gets three tools: `get_document()`, `get_document_structure()`, `get_page_content()`.
- Agent autonomously reasons over the tree index, calls the correct tools, retrieves content without manual node selection.
- Install: `pip install openai-agents` then `python3 examples/agentic_vectorless_rag_demo.py`.

**Vision-based Vectorless RAG (OCR-free):**
- Skips OCR entirely; sends page images directly to a vision-capable LLM.
- Builds a tree from what the model *sees* rather than extracted text.
- Preserves visual layout meaning in balance sheets and complex grids; retains charts, merged cells, footnote annotations.

**JavaScript/TypeScript SDK:**
- `pageindex-js-sdk` shipped **early 2026** for Node.js integrations and web-based document analysis.

**MCP Desktop Extension (.mcpb bundle):**
- One-click install — download file, double-click, PageIndex installed as a Claude Desktop Extension with OAuth handled automatically.

**ChatIndex for Conversation History:**
- Separate repo applying the tree-indexing philosophy to long conversation histories instead of documents.
- Released **January 2026**; signals the team's direction.

---

## 12. The Bigger Picture

- Author frames this as a broader shift across AI tooling: *"move from passive retrieval (fetch whatever looks similar) to active, agentic retrieval (reason about where to look)."*
- Already happening in code: **Claude Code** and **Cursor** use active codebase exploration rather than vector-based code RAG.
- Author quote: PageIndex team *"believes document retrieval will follow the same trajectory, and after digging into this framework, I'm inclined to agree, at least for the structured-document use case."*
- Vector databases *"aren't going anywhere"* — speed and cost advantages fit large problem classes.
- For use cases prioritizing *"correctness, transparency, and deep document understanding"* (financial audits, legal discovery, medical records, regulatory compliance): *"reasoning-based retrieval isn't just an alternative. It's a fundamentally better fit."*

---

## All Named Systems, Models, Libraries, and Tools

**PageIndex-related:** PageIndex (OSS framework) · VectifyAI (creator company) · **Mafin 2.5** (VectifyAI's financial analysis agent on PageIndex) · **FinanceBench** (industry-standard financial QA benchmark) · **ChatIndex** (PageIndex applied to conversation history).
**Vector databases/libraries:** Pinecone · Weaviate · Milvus · Chroma · pgvector.
**Embedding/LLM models:** `text-embedding-3-large` (OpenAI) · GPT-4o (OpenAI) · `gpt-4.1` (referenced in code).
**Integration/SDK frameworks:** MCP (Model Context Protocol) · OpenAI Agents SDK · OpenAI API (`AsyncOpenAI`) · Claude Desktop Extension.
**Code tools (comparative context):** Claude Code · Cursor (IDE) · Perplexity (search) · AlphaGo (referenced for strategic-navigation concept).

---

## Benchmark Numbers and Quantitative Claims (Summary)

| Metric | Value |
|---|---|
| PageIndex FinanceBench Accuracy (Mafin 2.5) | **98.7%** |
| Traditional Vector RAG (FinanceBench) | ~30–50% |
| GPT-4o Direct (no RAG) | ~31% |
| Perplexity | ~45% |
| Accuracy gap (PageIndex vs. vector) | ~49 percentage points |
| Vector RAG typical chunk size | 300–500 tokens |
| Nodes per 50-page document | 30–50 nodes |
| PageIndex GitHub stars | **23,000+** |
| PageIndex GitHub forks | ~2,000 |
| Vector RAG latency | milliseconds |
| PageIndex latency | "several seconds" |
| VectifyAI / PageIndex launch | September 2025 |
| TypeScript SDK release | Early 2026 |
| ChatIndex release | January 2026 |

---

## Cross-References / External Resources Mentioned

**Official PageIndex resources:**
- GitHub: `github.com/VectifyAI/PageIndex` (MIT License)
- Agentic RAG demo: `examples/agentic_vectorless_rag_demo.py`
- Chat platform: `chat.pageindex.ai`
- API docs: `docs.pageindex.ai`
- MCP integration: `pageindex.ai/mcp`
- TypeScript SDK: `github.com/VectifyAI/pageindex-js-sdk`
- Official blog post: `pageindex.ai/blog/pageindex-intro`

**Referenced sources:** VentureBeat interview with VectifyAI co-founder · *"Critical takes on Medium"* (general reference, no specific link).
**Creator attribution:** Mingtian Zhang (founder, VectifyAI, UCL alumnus) · Yu Tang.

---

## Concrete Case Studies and Examples

**Example 1 — 200-page annual report:**
- Question: *"What was total net revenue in FY2024 compared to FY2023?"*
- Vector RAG failure: "operating income" appears 60+ times; vector similarity ranks all roughly equally; relevant answer misses top-3.
- PageIndex strength: hierarchical navigation to financial sections; multi-step reasoning across FY2024 and FY2023 sections.

**Example 2 — "Appendix G" cross-reference (the main case study):**
- See Section 6.

**Example 3 — Table destruction:**
- Vector RAG: table header in chunk 14, data row in chunk 15; neither chunk alone meaningful.
- PageIndex: entire table preserved as a single tree node with full context.

---

## Author's Stated Conclusion

1. **Problem identification** — traditional vector RAG has architectural blindspots (chunking brittleness, cross-reference blindness, term frequency, multi-turn memory loss) that aren't fixable through better embeddings or reranking.
2. **Paradigm shift** — PageIndex demonstrates that *"relevance requires reasoning,"* not just similarity matching. The in-context tree index enables active, interpretable document navigation.
3. **Specific advantage** — for highly structured, long-form professional documents, PageIndex achieves near-perfect accuracy (98.7%) via tree-based LLM reasoning while traditional approaches plateau ~50%.
4. **Trade-off honesty** — higher latency and cost per query; unsuitable for high-volume short-document search or unstructured content. *"It's a depth tool, not a breadth tool."*
5. **Future direction** — part of a broader trend toward agentic, active retrieval (already visible in code RAG via Claude Code / Cursor). For regulated industries valuing correctness and auditability, reasoning-based retrieval is *"a fundamentally better fit."*
6. **Final position** — *"Vector databases aren't going anywhere"* for general use cases, *"but for the subset of use cases where correctness, transparency, and deep document understanding are non-negotiable… reasoning-based retrieval isn't just an alternative. It's a fundamentally better fit."*
