---
title: "RAG vs Graph RAG vs Agentic RAG"
type: article
year: 2026
category: applications
raw_path: /Users/sguys99/Desktop/project/ai-wiki/raw/articles/alex-xu-2026-rag-vs-graph-rag-vs.md
raw_filename: "alex-xu-2026-rag-vs-graph-rag-vs.md"
source_collection: external
author: "Alex Xu"
url: "https://www.linkedin.com/posts/alexxubyte_systemdesign-coding-interviewtips-share-7475575250143928320-lWQD/"
publisher: "LinkedIn (post by Alex Xu / ByteByteGo)"
publication_date: "2026-06-28"
tags: [rag, graphrag, agentic-rag, vector-search, knowledge-graph, local-search, global-search, multi-agent, linkedin, bytebytego, system-design]
---

> 본 raw 파일은 LinkedIn 공개 포스트에서 사용자가 직접 붙여넣은 본문을 그대로 옮긴 것이다 (CLAUDE.md rule #1 — 사용자가 대화 중 원문을 직접 제공한 경우이며, 에이전트가 WebFetch로 수집하지 않았다). 원본 URL은 frontmatter `url`을 참조하라. 발행 시점은 수집 당시 "1주 전"으로 표시되어 있어 2026-06-28로 근사했다. 본문의 저작권은 게시자(Alex Xu / ByteByteGo)에게 있으며, 본 ai-wiki는 비공개 개인 지식 베이스 목적으로 이를 인용한다.

# RAG vs Graph RAG vs Agentic RAG

**Alex Xu** · Author of 4 Bestselling Books · Co-Founder of ByteByteGo · LinkedIn post · 2026-06-28 (수집 시점 "1주 전")

---

## 본문 (LinkedIn 추출)

RAG vs Graph RAG vs Agentic RAG

RAG connects LLMs to your data and there are three different ways to do it.

### Standard RAG

- The query is converted into an embedding and matched against a vector database.
- The top-K closest chunks are pulled out and passed to the LLM as context.
- The LLM writes a grounded answer using only what was retrieved.

### Graph RAG

- The query is classified: specific questions route to local search, broad questions route to global search.
- Local search: query embedded → vector DB finds matching entities → pipeline traverses across the knowledge graph collecting linked context → LLM synthesis final answer.
- Global search: no vector search, no graph traversal → community reports loaded in batches → LLM scores each for relevance → top-ranked context → LLM synthesizes final response.

### Agentic RAG

- A reasoning agent reads the query, breaks it into sub-questions and picks the sources.
- The context across multiple sources is retrieved, depending on the sub-query.
- Another agent checks whether the retrieved context answers the question. If not, it re-retrieves.
- Once satisfied, the final answer is synthesized by LLM based on the prompt.

---

## Closing

Standard RAG is fast and cheap but if the wrong chunk is retrieved, the answer is wrong and nothing catches it. Use it when the answer lives in your documents and speed matters.

Graph RAG is expensive to build and slow to update. Use it for structured knowledge like legal, compliance, or biomedical data.

Agentic RAG is more capable and flexible but slower, expensive, and harder to debug. Use it when the question needs multi-step reasoning and self-correction.

> Over to you: Which of these are you running in production?

--
Subscribe to our weekly newsletter to get a Free System Design PDF (368 pages): https://lnkd.in/gF7Vsw6X

#systemdesign #coding #interviewtips
