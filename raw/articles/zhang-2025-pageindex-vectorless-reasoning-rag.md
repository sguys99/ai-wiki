---
title: "PageIndex: Next-Generation Vectorless, Reasoning-based RAG"
authors: "Mingtian Zhang, Yu Tang and PageIndex Team"
url: "https://pageindex.ai/blog/pageindex-intro"
publisher: "PageIndex Blog"
publication_date: "2025-09-19"
---

# PageIndex: Next-Generation Vectorless, Reasoning-based RAG

**Author(s):** Mingtian Zhang, Yu Tang

**Publication Date:** September 19, 2025

---

## Introduction

Large Language Models have become powerful tools for document understanding and question answering, yet they face a fundamental constraint: the context window—the maximum number of tokens a model can process at once. Despite advances in longer context support, research demonstrates that model performance deteriorates as context length increases. This challenge makes it difficult for LLMs to accurately interpret complex, domain-specific documents like financial reports or legal filings.

To address this limitation, Retrieval Augmented Generation (RAG) has emerged as a dominant solution. Rather than passing entire documents to models, RAG retrieves only the most relevant text chunks based on user queries, optimizing effective context length. However, conventional vector-based RAG methods depend on static semantic similarity and face significant limitations.

The authors introduce PageIndex, a reasoning-based retrieval framework that enables LLMs to dynamically navigate document structures and identify genuinely relevant sections, rather than merely retrieving semantically similar text.

---

## The Limitations of Vector-based RAG

Vector-based RAG relies on semantic embeddings and vector databases to identify relevant text chunks. The preprocessing stage involves splitting documents into chunks, embedding each chunk into vector space using an embedding model, and storing vectors in databases like Chroma or Pinecone. During querying, the user query is embedded, the vector database is searched for similar chunks, and top-k results form the model's input context.

While effective for short texts, vector-based RAG faces five major challenges:

**1. Query and Knowledge Space Mismatch**

Vector retrieval assumes the most semantically similar text to a query is also the most relevant. However, queries express intent rather than content, creating a fundamental mismatch between search assumptions and actual relevance needs.

**2. Semantic Similarity Is Not Equivalent to Relevance**

This problem is especially acute in domain-specific documents like financial filings, legal documents, and technical manuals, where many passages share nearly identical semantics but differ critically in relevance.

**3. Hard Chunking Breaks Semantic and Contextual Integrity**

Documents are split into fixed-size chunks (typically 512 or 1000 tokens) for embedding. This "hard chunking" often cuts through sentences, paragraphs, or sections, fragmenting meaning and context.

**4. Cannot Integrate Chat History**

Each query is treated independently. The retriever lacks knowledge of what has been asked or answered before, preventing coherent multi-turn conversations.

**5. Hard to Deal with In-Document References**

Documents often contain references like "see Appendix G" or "refer to Table 5.3". Since these references lack semantic similarity with referenced content, traditional RAG misses them unless additional preprocessing like knowledge graphs is performed.

The article notes that even advanced systems like Claude Code have moved away from traditional vector-based RAG for code retrieval, achieving superior precision and speed without vector databases. The same principle should apply to document retrieval: LLMs can reason over structured document representations, deciding where to look next rather than merely identifying similar text.

---

## PageIndex: Reasoning-based Retrieval

PageIndex's reasoning-based RAG mimics how humans naturally navigate and extract information from long documents. Unlike traditional vector-based methods relying on static semantic similarity, this approach uses a dynamic, iterative reasoning process to actively decide where to look next based on evolving question context.

### The Iterative Process

1. **Read the Table of Contents (ToC)**: Understand the document's structure and identify potentially relevant sections.
2. **Select a Section**: Choose the section most likely to contain useful information based on the question.
3. **Extract Relevant Information**: Parse the selected section to gather content that could help answer the question.
4. **Assess Information Sufficiency**:
   - **Yes** → Proceed to answer the question
   - **No** → Return to step 1 and repeat with another section
5. **Answer the Question**: Once enough information is collected, generate a complete, well-supported answer.

In this process, the Table of Contents serves as a key index for the document, enabling efficient navigation and retrieval.

---

## "Table of Contents" Index for LLMs

A JSON-based hierarchical structure represents a Table of Contents (ToC) for unstructured documents. The ToC acts as an index tree organizing content into hierarchical nodes. Each node represents a logical section and may contain metadata, descriptions, and links to sub-sections.

This approach enables LLMs to:

- Traverse structured content recursively
- Retrieve targeted raw data by node_id
- Associate contextual metadata such as source type, topic, or semantic tags

### PageIndex Tree Index Structure (JSON Format)

```
Node {
  node_id: string,         // Unique node identifier
  name: string,            // Human-readable label or title
  description: string,     // Optional detailed explanation
  metadata: object,        // Key-value pairs for context or attributes
  sub_nodes: [Node]        // Array of child nodes (recursive structure)
}
```

**Notes:**

- The `node_id` serves as a reference key to locate corresponding raw data
- The `sub_nodes` field allows recursive nesting, forming a complete ToC tree
- The `metadata` field can store semantic information such as document type, author, timestamp, or relevance scores

### Example PageIndex Tree

```
{
  "node_id": "0006",
  "title": "Financial Stability",
  "start_index": 21,
  "end_index": 22,
  "summary": "The Federal Reserve ...",
  "sub_nodes": [
    {
      "node_id": "0007",
      "title": "Monitoring Financial Vulnerabilities",
      "start_index": 22,
      "end_index": 28,
      "summary": "The Federal Reserve's monitoring ..."
    },
    {
      "node_id": "0008",
      "title": "Domestic and International Cooperation and Coordination",
      "start_index": 28,
      "end_index": 31,
      "summary": "In 2023, the Federal Reserve collaborated ..."
    }
  ]
}
```

Each node in the ToC links directly to its corresponding raw content:

```
node_id → node_content (raw content, extracted text, images, etc.)
```

This mapping enables LLMs to select and retrieve specific nodes as needed, facilitating precise and context-aware information access.

Unlike vector databases storing external, static embeddings, the JSON-based ToC index resides within the LLM's active reasoning context—an "in-context index" that the model can directly reference, navigate, and reason over during inference. By integrating the index into the model's context window, the LLM dynamically decides where to look next rather than depending solely on precomputed similarity scores. This enables in-context reasoning-driven retrieval, addressing many constraints inherent in traditional vector-based RAG systems.

---

## Overcoming the Limitations

### 1. Query–Knowledge Space Mismatch

Instead of relying solely on embedding similarity search, the LLM uses reasoning to infer which section likely contains the answer. It can think about document structure: "Debt trends are usually in the financial summary section or Appendix G—let's look there." This dynamic inference bridges the gap between query meaning and information location.

### 2. Semantic Similarity ≠ True Relevance

Reasoning-based retrieval emphasizes contextual relevance rather than similarity alone. The model reads the ToC or PageIndex structure, interprets query intent, and navigates to sections containing actual answers, even if language differs. This mirrors human information-seeking: understanding the question rather than merely matching words.

### 3. Hard Chunking Breaks Semantic Integrity

Rather than chunking arbitrarily, reasoning-based RAG retrieves semantically coherent sections like full pages, sections, or chapters. If the model detects a section is incomplete, it iteratively fetches neighboring sections until context suffices. This preserves logical continuity and minimizes hallucination.

### 4. Inability to Integrate Chat History

Retrieval is context-aware: the model uses prior conversation history to refine understanding of the current question. If a user previously asked about "financial assets" and now asks "What about liabilities?", the retriever knows to explore the same report section under liabilities. This enables coherent, multi-step exploration across multiple turns.

### 5. Poor Handling of In-Document References

By leveraging PageIndex or ToC-based hierarchical structures, reasoning-based retrieval can follow references like a human reader. When encountering "see Appendix G", the LLM navigates the index tree to that section and retrieves relevant data. This allows accurate cross-referencing without manual link-building.

In a PageIndex MCP example, a query asked for the total value of deferred assets. The main section (pages 75–82) only reported the increase in value, not the total. On page 77, the text read:

> "Table 5.3 summarizes the income, expenses, and distributions of the Reserve Banks for 2023 and 2022. Appendix G of this report, 'Statistical Tables,' provides more detailed information…"

The reasoning-based retriever followed this cue to Appendix G, found the correct table, and returned the total deferred asset value—a task vector-based retrieval would likely fail.

---

## Summary: Vector vs. Reasoning-based RAG

| **Limitation** | **Vector-based RAG** | **Reasoning-based RAG** |
|---|---|---|
| **1. Query–Knowledge Mismatch** | Matches surface-level similarity; often misses true context | Uses inference to identify the most relevant document sections |
| **2. Similarity ≠ Relevance** | Retrieves semantically similar but irrelevant chunks | Retrieves contextually relevant information |
| **3. Hard Chunking** | Fixed-length chunks fragment meaning | Retrieves coherent sections dynamically |
| **4. No Chat Context** | Each query is isolated | Multi-turn reasoning considers prior context |
| **5. Cross-References** | Fails to follow internal document links | Follows in-text references via ToC/PageIndex reasoning |

---

## Conclusion

Vector-based RAG searches for similar text whereas reasoning-based RAG thinks about where to look and why. By combining structured document representations like ToC Trees with iterative reasoning, reasoning-based RAG enables LLMs to retrieve relevant information rather than merely similar information, paving the way for a new generation of intelligent document understanding systems.

Developers can access open-source code via GitHub, along with cookbooks and tutorials for additional usage guides and examples. PageIndex is available as a ChatGPT-style chat platform, or can be integrated via MCP or API.

---

## Citation

Please cite this work as:

```
Mingtian Zhang, Yu Tang and PageIndex Team,
"PageIndex: Next-Generation Vectorless, Reasoning-based RAG",
PageIndex Blog, Sep 2025.
```

**BibTeX Citation:**

```
@article{zhang2025pageindex,
  author = {Mingtian Zhang and Yu Tang and PageIndex Team},
  title = {PageIndex: Next-Generation Vectorless, Reasoning-based RAG},
  journal = {PageIndex Blog},
  year = {2025},
  month = {September},
  note = {https://pageindex.ai/blog/pageindex-intro},
}
```
