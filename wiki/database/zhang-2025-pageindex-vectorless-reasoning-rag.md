---
title: "PageIndex: Next-Generation Vectorless, Reasoning-based RAG"
type: article
year: 2025
category: database
raw_path: /Users/kmyu/Desktop/project/ai-wiki/raw/articles/zhang-2025-pageindex-vectorless-reasoning-rag.md
raw_filename: "zhang-2025-pageindex-vectorless-reasoning-rag.md"
source: zhang-2025-pageindex-vectorless-reasoning-rag.md
source_collection: external
author: "Mingtian Zhang, Yu Tang and PageIndex Team"
url: "https://pageindex.ai/blog/pageindex-intro"
publisher: "PageIndex Blog"
publication_date: "2025-09-19"
tags: [rag, vectorless-rag, pageindex, reasoning-based-rag, toc-tree, in-context-index, long-document, mcp, cross-reference, hard-chunking]
---

## 요약 (Summary)

PageIndex 팀(Mingtian Zhang, Yu Tang)이 직접 쓴 제품 소개 글로, **vector embedding을 사용하지 않는(vectorless) reasoning-based RAG**의 동기·아키텍처·차별점을 정리했다. 핵심은 문서의 Table of Contents를 JSON 트리(PageIndex Tree)로 만들어 LLM의 active context 안에 인덱스를 두고, LLM이 직접 "어디를 볼지" 추론하며 섹션을 iterative하게 탐색하는 것이다. 이를 통해 vector RAG의 5대 한계(query/지식 mismatch, similarity≠relevance, hard chunking, chat history 미통합, in-document reference 처리 실패)를 동시에 해결한다고 주장한다.

## 주요 기여 (Key Contributions)

- **Vectorless RAG 정의**: vector DB 없이 LLM in-context reasoning만으로 long document retrieval을 수행하는 패러다임을 명시화.
- **PageIndex Tree 자료구조**: `{node_id, name, description, metadata, start_index, end_index, sub_nodes}` 재귀 JSON으로 비구조 문서에 ToC 기반 인덱스 부여.
- **In-context Index 개념**: vector DB(외부 정적 embedding 저장소)와 대비되는 "LLM context 내부에 상주하는 인덱스"로 모델이 직접 navigate.
- **5대 vector RAG 한계의 체계적 분류**와 각각에 대한 reasoning-based 대응 매핑.
- **Iterative retrieval 루프**: ToC 읽기 → 섹션 선택 → 정보 추출 → 충분성 평가 → (반복 or 답변).

## 방법론 및 아키텍처 (Methodology and Architecture)

**전처리 (offline)**: 비구조 문서 → PageIndex Tree(JSON) 변환. 각 노드 = 논리적 섹션 + page range + metadata + sub_nodes.

**Retrieval (online)**: LLM이 query와 PageIndex Tree를 함께 받아 다음 루프 수행
1. ToC 트리를 읽어 후보 섹션 식별
2. query 의도에 가장 부합하는 노드 선택
3. `node_id → node_content` 매핑으로 raw content fetch
4. 충분성 판단 → 부족하면 다른 섹션 탐색, 충분하면 답변 생성

**In-document reference 추적**: 본문의 "Appendix G", "Table 5.3" cue를 LLM이 인식하면 ToC 트리로 직접 점프. 사례로 Federal Reserve 보고서에서 main 섹션(pp.75–82)에는 deferred asset 증가분만 있고 총합은 Appendix G에 있었으나, PageIndex는 본문 cue를 따라 Appendix G로 이동해 정답 반환 — vector RAG가 놓치는 케이스.

**Multi-turn**: 이전 대화를 reasoning context에 함께 입력하여 "financial assets → liabilities" 같은 follow-up에서 동일 섹션의 다른 측면을 자연스럽게 탐색.

**배포**: GitHub 오픈소스, ChatGPT-style 채팅 플랫폼, MCP/API 통합.

## 결과 (Results)

블로그 글이라 정량 벤치마크 대신 정성 비교 표와 사례로 우위 주장:

| 한계 | Vector RAG | Reasoning RAG (PageIndex) |
|---|---|---|
| Query–Knowledge mismatch | 표면 유사도 매칭 | reasoning으로 관련 섹션 추론 |
| Similarity ≠ Relevance | 유사하지만 무관한 chunk | 문맥적 관련성 우선 |
| Hard chunking | 고정 길이로 의미 단절 | semantic 단위 동적 retrieval |
| Chat context | query 독립 | multi-turn reasoning |
| Cross-reference | 내부 링크 실패 | ToC 트리로 추적 |

근거 인용: Claude Code 또한 코드 retrieval에서 vector DB를 버리고 reasoning 기반으로 가서 정밀도/속도를 얻었다는 점을 동일 패러다임의 검증 사례로 제시.

## 한계와 비판적 시각

- **정량 벤치마크 부재**: precision/recall, latency, cost 등 수치 비교 미제공.
- **ToC 생성 비용**: 평문 위주 문서나 ToC가 명시되지 않은 자료에서 전처리 부담.
- **Context window 부담**: PageIndex Tree 자체가 LLM context를 점유 — 매우 큰 문서에서 한계.
- **Iteration latency · LLM 호출 비용**: reasoning loop는 본질적으로 여러 LLM 호출을 요구.

## 관련 페이지 (Related Pages)

- [[database/vectifyai-pageindex]] — 본 글에서 소개하는 시스템의 오픈소스 구현체 레포(MIT). 본 글이 철학·동기·개념을, 이 레포가 실제 코드/툴체인을 제공.
- [[database/geeksforgeeks-2026-vectorless-rag-pageindex]] — LangChain · Gemini · DeepSeek-R1 결합으로 PageIndex 흐름을 실습하는 외부 튜토리얼. 본 글의 개념을 코드로 구체화한 자료.
- [[database/li-2026-beyond-semantic-similarity-rethinking-retrieval]] — semantic similarity의 한계와 retrieval 재정의 흐름 — 본 글의 "similarity ≠ relevance" 논거와 직접 연결.
- [[database/zhang-2026-your-embedding-model-is-smarter]] — embedding 기반 검색의 한계/재해석 — vectorless RAG의 대척점 논의에 함께 참고.
- [[applications/pandey-2026-rag-is-no-longer-just]] — RAG가 단순 retrieval 문제를 넘어선다는 관점 — 본 글의 reasoning-as-retrieval 주장과 같은 흐름.
