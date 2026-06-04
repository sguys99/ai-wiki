---
title: "LLM Wiki by Andrej Karpathy: Build a Compounding Knowledge Base"
type: article
year: 2026
category: applications
raw_path: /Users/kmyu/Desktop/project/ai-wiki/raw/articles/datasciencedojo-2026-llm-wiki-by-andrej-karpathy.md
raw_filename: "datasciencedojo-2026-llm-wiki-by-andrej-karpathy.md"
source_collection: external
author: "Data Science Dojo Staff"
url: "https://datasciencedojo.com/blog/llm-wiki-tutorial/"
publisher: "Data Science Dojo Blog"
publication_date: "2026-04-16"
tags: [llm-wiki, karpathy, knowledge-management, obsidian, claude-code, claude-ai, tutorial, rag-vs-wiki, compounding-knowledge, entity-pages, wiki-links, linting, datasciencedojo]
---

# LLM Wiki by Andrej Karpathy: Build a Compounding Knowledge Base

**Author:** Data Science Dojo Staff

**Publication Date:** April 16, 2026

---

## Article Content

### Overview

An LLM wiki represents a structured, AI-maintained knowledge base that expands and becomes increasingly intelligent each time a new source is incorporated. Unlike Retrieval-Augmented Generation (RAG) systems, which rediscover information from scratch during every query, an LLM wiki pre-compiles knowledge into interlinked entity pages so understanding compounds over time.

Andrej Karpathy, OpenAI co-founder and former Tesla AI Director, introduced this concept in April 2026 via a GitHub Gist. The post gained rapid traction among developers.

### Key Problem Addressed

"If you have ever uploaded a PDF to ChatGPT, asked a question, and then uploaded the same PDF again the next day to ask a follow-up.. you already understand the problem an LLM wiki solves."

Most existing AI knowledge systems lack memory between sessions. They retrieve, answer, and forget—requiring complete reconstruction of understanding on subsequent queries.

### What Is an LLM Wiki?

An LLM wiki consists of plain markdown files maintained by an AI agent, with each file representing one concept as a Wikipedia-style entity page linked through `[[wiki-links]]`.

**Core differences from RAG:**

When adding new documents, the system performs a compilation step that:
- Updates existing pages with fresh information
- Creates new entity pages for first-appearance concepts
- Establishes `[[wiki-links]]` connecting new concepts to related existing ones
- Flags contradictions between new sources and existing content

### LLM Wiki vs RAG Comparison

| Factor | RAG | LLM Wiki |
|--------|-----|----------|
| Knowledge persistence | None—stateless | Full—builds over time |
| Multi-document synthesis | Per query, from scratch | Pre-compiled into pages |
| Contradiction detection | No | Yes—flagged during compilation |
| Source traceability | High | Moderate (page-level) |
| Setup complexity | Low | Low–Medium |
| Best for | Quick Q&A on documents | Deep, growing research topics |

### Prerequisites

**Tools:**
- Computer with accessible folder (Mac, Windows, Linux)
- Claude.ai account (free tier sufficient)
- Obsidian (free markdown editor, optional but recommended)

**Files:**
- 5 research papers downloaded as PDFs

**Knowledge required:**
- Basic folder creation and file downloading
- No coding required for Claude.ai version

**Estimated time:** 25–35 minutes

### Step 1: Download Starting Papers

Five foundational AI research papers form the ideal starting material:

1. **Attention Is All You Need (2017)** - arXiv:1706.03762
   - Original transformer paper

2. **BERT (2018)** - arXiv:1810.04805
   - Bidirectional transformers for language understanding

3. **GPT-3 (2020)** - arXiv:2005.14165
   - Large language models as few-shot learners

4. **Foundation Models (2021)** - arXiv:2108.07258
   - Survey connecting transformers, scaling, applications

5. **RLHF (2022)** - arXiv:2203.02155
   - Human feedback alignment for GPT models

### Step 2: Create Folder Structure

```
my-wiki/
├── raw/
└── wiki/
```

- `raw/` contains source files (PDFs, articles, notes)—never edited manually
- `wiki/` contains compiled entity pages written by the AI agent

Move downloaded PDFs into the `raw/` folder.

### Step 3: Run Compilation Prompt

**Option A: Using Claude.ai**

Upload all five PDFs simultaneously and send this prompt:

"Read all these research papers carefully. Extract the key concepts, entities, and ideas from them. For each major concept, write one markdown entity page with: (1) A clear title and summary (2-3 sentences), (2) A detailed explanation of the concept, (3) [[wiki-links]] to related concepts in markdown format, (4) The source paper(s) where this concept appears, (5) Any contradictions or tensions you notice between how different papers treat this concept. Create one file per concept. Use markdown formatting. Save each as [concept-name].md"

Copy generated pages into `wiki/` folder as individual `.md` files.

**Option B: Using Claude Code**

In terminal, navigate to the wiki folder and launch Claude Code, then paste the same prompt. Claude Code reads files directly and writes pages to `wiki/` automatically.

### Step 4: Open Wiki in Obsidian

Install Obsidian and select `wiki/` folder as vault.

**Graph View** (Ctrl+G or Cmd+G):
Visualizes entity pages as nodes with `[[wiki-links]]` rendered as edges. After five papers, expect to see transformer architecture linking to attention mechanisms, BERT connecting to fine-tuning, and RLHF connecting to alignment and GPT concepts.

### Step 5: Add More Sources and Watch Compounding

Drop additional papers into `raw/` and run compilation again with this modified prompt:

"Read these new research papers and the existing wiki pages in the wiki/ folder. For each new concept from the new papers: (1) Create a new entity page if the concept doesn't exist, (2) Update existing entity pages if the new papers add relevant information, (3) Add new [[wiki-links]] between pages, (4) Flag any contradictions between old and new content."

The new papers enrich existing pages rather than just creating new ones.

### Step 6: Run Linting Pass

After reaching approximately 20 new pages, run maintenance:

"Read through all the markdown files in the wiki/ folder. Check for: (1) Pages with no incoming or outgoing links—these are orphans, (2) Duplicate or near-duplicate pages that should be merged, (3) Contradictions between pages, (4) Broken or incorrect [[wiki-links]], (5) Pages that are too long and should be split. For each issue found, suggest a fix. Create a maintenance-report.md listing all issues and recommendations."

This keeps the wiki accurate and internally consistent as it grows.

### Common Mistakes to Avoid

1. **Putting too much in one page** - Each entity page should cover exactly one concept; split when covering two ideas
2. **Never running linting** - Small errors propagate quickly; run audit passes regularly
3. **Adding too many unrelated topics at once** - Wikis compound best with topically related sources

### FAQ

**What is an LLM wiki?**
A personal knowledge base of plain markdown files that an AI agent actively builds and maintains, with pre-compiled knowledge into structured, interlinked entity pages.

**Who created it?**
Andrej Karpathy published the concept in a GitHub Gist in April 2026, which rapidly gained developer traction.

**Do I need coding knowledge?**
No. The Claude.ai version requires only PDF uploads and prompt pasting.

**How is it different from Notion or Obsidian?**
Those tools require human-written organization; an LLM wiki uses them as the viewing interface while the AI agent performs compilation, linking, and maintenance.

**How large can an LLM wiki grow?**
"Karpathy's own wiki reached approximately 100 articles and 400,000 words before he noted that the LLM could still navigate it efficiently."

**What file types work?**
PDFs work best for research papers; markdown files work well for web articles (Obsidian Web Clipper converts webpages automatically); plain text and exported conversations also work.

### Next Steps

- Add Obsidian Web Clipper browser extension for automatic webpage-to-markdown conversion
- Create topic-specific wikis rather than one massive wiki for cleaner graphs
- Eventually fine-tune a smaller model on 100+ well-maintained pages to create a custom private intelligence

---

## Key Concepts

- **Entity pages**: Wikipedia-style entries for single concepts
- **Wiki-links**: `[[concept]]` formatted internal connections between pages
- **Compilation step**: Process that updates existing pages, creates new ones, and establishes connections when new sources are added
- **Knowledge graph**: The visual network of connected concepts within the wiki
- **Linting**: Maintenance process checking for orphan pages, duplicates, contradictions, and broken links
- **Stateless vs. stateful**: RAG systems (stateless) rebuild answers from scratch; LLM wikis (stateful) maintain and compound knowledge
