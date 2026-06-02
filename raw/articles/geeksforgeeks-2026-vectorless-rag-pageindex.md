---
source_url: "https://www.geeksforgeeks.org/artificial-intelligence/vectorless-rag-pageindex/"
canonical_url: "https://www.geeksforgeeks.org/vectorless-rag-pageindex/"
publisher: "GeeksforGeeks"
publication_date_last_updated: "2026-03-09"
fetched_at: "2026-06-02"
ingestion_note: "사용자가 명시적으로 ingestion을 요청한 URL이므로 CLAUDE.md rule #1 예외 조항에 따라 WebFetch로 본문 수집. 원본 HTML의 본문을 Markdown으로 변환해 verbatim 저장."
---

# Vectorless RAG: PageIndex

**Publisher:** GeeksforGeeks
**Last Updated:** 9 Mar, 2026
**Canonical URL:** https://www.geeksforgeeks.org/vectorless-rag-pageindex/

---

## Introduction

Vectorless RAG is a retrieval-augmented generation approach that retrieves relevant information from documents without relying on vector embeddings. Instead, it organizes content into indexed pages or structured sections, allowing fast keyword‑based retrieval before passing the selected context to a language model for generating accurate responses.

**Key Characteristics:**

- **Eliminates Embeddings and Vector Databases**: Uses document structure and LLM-guided reasoning instead of dense similarity search.
- **Avoids Artificial Chunking**: Preserves natural document sections such as pages and headings, maintaining contextual continuity and logical structure.
- **Human-like Retrieval**: Traverses a tree-structured index step by step, similar to how experts analyze and locate relevant information.
- **Transparent Retrieval Process**: Produces traceable and interpretable retrieval decisions rather than relying on approximate semantic matching.

PageIndex is a reasoning-based, vectorless RAG framework that performs retrieval in two steps:

1. Generate a tree structure index of documents
2. Perform reasoning-based retrieval through tree search

---

## Limitation in Traditional Vector-Based RAG

Vector-based RAG retrieves information using semantic embeddings and similarity search over chunked text stored in vector databases. While effective in many scenarios this approach faces structural and reasoning limitations when applied to long, complex or highly structured documents.

- **Query–Knowledge Mismatch**: Semantic similarity assumes the closest embedding is most relevant, but user queries often express intent rather than matching document wording.
- **Similarity Does Not mean Relevance**: In domain-specific texts like legal or technical documents, many passages appear semantically similar yet differ critically in actual relevance.
- **Hard Chunking Breaks Context**: Fixed-size chunking can split sentences, tables or sections, fragmenting meaning and reducing contextual integrity.
- **Limited Multi-Step Reasoning**: Retrieval is based on one-shot similarity search and cannot dynamically explore document structure step by step.
- **No Awareness of Conversation History**: Each query is embedded independently, making it difficult to incorporate prior questions, answers or evolving context.
- **Poor Handling of In-Document References**: References such as "see Appendix G" or "refer to Table 5.3" are often missed because they lack semantic similarity to the referenced content.
- **High Infrastructure and Computational Cost**: Requires embedding models, vector storage and similarity search systems, increasing operational complexity and resource usage.

---

## Workflow of Vectorless RAG

Vectorless RAG with PageIndex is a reasoning-driven retrieval approach designed to overcome the limitations of traditional vector databases. Instead of using mathematical similarity (vectors), it organizes the document like a tree and allows the model to logically decide where to look next similar to how a human scans chapters and sections.

### 1. Document Segmentation

The document is first divided into meaningful pages instead of random text chunks. This keeps related information together.

- Splits content based on headings, subheadings and topic changes
- Makes sure each page covers one clear idea
- Avoids breaking sentences or concepts in the middle

### 2. PageIndex Tree Construction

After splitting the document, a tree-like structure is created to organize it properly.

- The root represents the entire document
- Middle nodes represent sections and subsections
- Final nodes represent individual pages

This structure makes navigation easy and systematic.

### 3. Query Understanding

When a question is asked, the model first tries to understand what the user is looking for.

- Identifies important keywords and concepts
- Predicts which sections might contain the answer
- Chooses the most relevant branches to explore

### 4. Hierarchical Reasoning-Based Retrieval

Instead of immediately selecting top matching chunks, the system searches step by step from general to specific.

- Starts with broader sections
- Gradually moves into more specific subsections
- Ignores sections that are not relevant

### 5. Iterative Page Exploration

PageIndex uses an iterative reasoning loop to refine retrieval.

- Reads selected page
- Evaluates if answer is sufficient
- Moves deeper, sideways or backtracks if needed

### 6. Context Assembly

Once relevant pages are identified, only those pages are passed to the LLM.

- Combines selected pages together
- Avoids adding unnecessary information
- Keeps the context small and focused

### 7. Answer Generation

Finally, the model generates the answer using only the selected relevant pages.

- Combines information from chosen pages
- Produces a clear and structured response
- Ensures the answer matches the document content

---

## Implementation

Here we implement Vectorless RAG using PageIndex for document retrieval and Gemini AI for generating answers from the retrieved context.

### Step 1: Install Required Library

Install the necessary libraries for hierarchical document indexing (pageindex) and for integrating the Gemini LLM using LangChain.

```python
!pip install pageindex
!pip install langchain langchain-google-genai google-generativeai
```

### Step 2: Import Required Libraries

Now we import all necessary Python modules for document handling, API communication and async processing.

- **os, json, requests**: File handling and PDF download
- **asyncio, time**: Handle asynchronous processing and polling
- **PageIndexClient**: Core client for interacting with PageIndex
- **pageindex.utils**: Utility functions like printing document tree

```python
import os
import json
import requests
import asyncio
from pageindex import PageIndexClient
import pageindex.utils as utils
```

### Step 3: Initialize PageIndex Client

Here we configure the API key and initialize the PageIndex client.

> You can get API Key from PageIndex

```python
PAGEINDEX_API_KEY = "Page Index API Key"
pi_client = PageIndexClient(api_key=PAGEINDEX_API_KEY)
```

### Step 4: Download the PDF Document

Here we download a research paper from ArXiv and save it locally.

```python
pdf_url = "https://arxiv.org/pdf/2501.12948.pdf"
pdf_path = os.path.join("../data", pdf_url.split('/')[-1])
os.makedirs(os.path.dirname(pdf_path), exist_ok=True)
response = requests.get(pdf_url)
with open(pdf_path, "wb") as f:
    f.write(response.content)
print(f"Downloaded {pdf_url}")
```

### Step 5: Submit Document to PageIndex

Now we upload the PDF to PageIndex for hierarchical indexing.

```python
doc_info = pi_client.submit_document(pdf_path)
doc_id = doc_info["doc_id"]
print('Document Submitted:', doc_id)
```

### Step 6: Indexing

Since indexing takes time, we poll the system until the document is ready.

- Use `is_retrieval_ready()` to check indexing status.
- Implement retry logic with timeout handling.
- Once ready, fetch and print the document tree.

```python
import time
print(f"Waiting for document {doc_id} to be indexed...")
max_retries = 30
retry_count = 0
while not pi_client.is_retrieval_ready(doc_id):
    if retry_count >= max_retries:
        print("Timeout: Document processing took too long.")
        break
    print(f"Still processing... (Attempt {retry_count + 1}/{max_retries})")
    time.sleep(5)
    retry_count += 1
if pi_client.is_retrieval_ready(doc_id):
    print("Success! Document is ready.")
    tree = pi_client.get_tree(doc_id, node_summary=True)['result']
    utils.print_tree(tree)
else:
    tree = None
```

### Step 7: Initialize the LLM

Next, we configure the Large Language Model that will generate answers using retrieved context.

```python
from langchain_google_genai import ChatGoogleGenerativeAI
import os
os.environ["GOOGLE_API_KEY"] = "your_google_api_key"
llm = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash",
    temperature=0.3,
)
```

### Step 8: Define Retrieval Function (Vectorless Retrieval)

This function sends the user's question to PageIndex, waits until the system finds the most relevant sections in the document and then extracts the useful text content for answer generation.

- First, it submits the query to PageIndex using `submit_query()` and receives a `retrieval_id`.
- Then, it continuously checks (polls) the retrieval status until it is completed.
- Finally, it collects the relevant text content from the top matching nodes and returns them as context.

```python
def retrieve_from_pageindex(query, doc_id, top_k=3):
    response = pi_client.submit_query(
        doc_id=doc_id,
        query=query
    )
    retrieval_id = response.get("retrieval_id")
    if not retrieval_id:
        return []
    while True:
        retrieval = pi_client.get_retrieval(retrieval_id)
        status = retrieval.get("status")
        if status == "completed":
            break
        elif status == "failed":
            return []
        time.sleep(1)
    nodes = retrieval.get("retrieved_nodes", [])
    contexts = []
    for node in nodes[:top_k]:
        relevant_contents = node.get("relevant_contents", [])
        for group in relevant_contents:
            for item in group:
                content = item.get("relevant_content")
                if content:
                    contexts.append(content)
    return contexts
```

### Step 9: Build Vectorless RAG Pipeline

This function combines retrieved context and sends it to the LLM.

- Retrieve structured content from PageIndex.
- Combine context into a single prompt.
- Ask the LLM to answer strictly from retrieved context.

```python
def vectorless_rag(query, doc_id):
    contexts = retrieve_from_pageindex(query, doc_id)
    if not contexts:
        return "No relevant context found."
    combined_context = "\n\n".join(contexts)
    prompt = f"""
    You are a research assistant.
    Answer ONLY using the context below.
    If the answer is not found, say "Not found in document."

    Context:
    {combined_context}

    Question:
    {query}
    """
    response = llm.invoke(prompt)
    return response.content
```

### Step 10: Run Query and Generate Final Answer

Here we provide a question and generate the answer using Vectorless RAG.

```python
query = "What is the main contribution of this paper?"
answer = vectorless_rag(query, doc_id)
print("\nFINAL ANSWER:\n")
print(answer)
```

**Output:**

> The paper's main contribution is showing that the reasoning abilities of large language models (LLMs) can be enhanced through pure reinforcement learning (RL), eliminating the need for human-annotated reasoning trajectories. It also explores the development of reasoning abilities in LLMs through self-evolution in a reinforcement learning (RL) framework with minimal human labeling. Additionally, the multi-stage pipeline of DeepSeek-R1 and the development of its models (DeepSeek-R1 Dev1, Dev2, and Dev3) constitute the main contribution of the paper.

---

## Difference Between Vector RAG and Vectorless RAG

| Feature | Vector RAG | Vectorless RAG |
|---------|-----------|----------------|
| Retrieval Method | Uses embedding similarity search | Uses logical reasoning and tree navigation |
| Document Representation | Converts text into high-dimensional vectors | Organizes text into a hierarchical page tree |
| Search Process | Retrieves top-k similar chunks in one step | Looks through major sections first, then focuses on exact information |
| Context Usage | May include loosely related chunks | Selects only logically relevant pages |
| Computation Cost | Requires embedding generation and storage | Does not require vector storage |

---

## Limitations

- Depends heavily on the quality of document structure as poor headings reduce effectiveness
- Relies on the reasoning ability of the LLM, which may sometimes choose the wrong branch
- Can be slower due to step-by-step navigation
- Less effective for searching across many unrelated documents
- Performance may drop if the document is unstructured or poorly organized
