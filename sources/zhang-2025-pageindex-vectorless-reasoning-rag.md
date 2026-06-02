---
title: "PageIndex: Next-Generation Vectorless, Reasoning-based RAG"
type: article
year: 2025
category: database
raw_path: /Users/kmyu/Desktop/project/ai-wiki/raw/articles/zhang-2025-pageindex-vectorless-reasoning-rag.md
raw_filename: "zhang-2025-pageindex-vectorless-reasoning-rag.md"
source_collection: external
author: "Mingtian Zhang, Yu Tang and PageIndex Team"
url: "https://pageindex.ai/blog/pageindex-intro"
publisher: "PageIndex Blog"
publication_date: "2025-09-19"
tags: [rag, vectorless-rag, pageindex, reasoning-based-rag, toc-tree, in-context-index, long-document, mcp, cross-reference, hard-chunking]
---

## 한 줄 요약 (One-line Summary)

PageIndex는 **vector embedding 없이** 문서의 Table of Contents(ToC)를 JSON 트리로 변환해 LLM이 직접 "어디를 볼지" 추론(reasoning)하며 탐색하는 **vectorless · reasoning-based RAG** 프레임워크로, vector 유사도 검색의 5대 한계(query/지식 mismatch, similarity≠relevance, hard chunking, chat history 미통합, in-document reference 처리 실패)를 극복한다.

## 1. 자료 정보 (Document Information)

- **제목**: PageIndex: Next-Generation Vectorless, Reasoning-based RAG
- **저자**: Mingtian Zhang, Yu Tang and PageIndex Team
- **출처**: PageIndex Blog (https://pageindex.ai/blog/pageindex-intro)
- **발행일**: 2025-09-19
- **유형**: 회사 블로그 introduction 글 (제품 소개 + 기술 철학)
- **관련 자료**: [[vectifyai-pageindex]] (오픈소스 레포), [[geeksforgeeks-2026-vectorless-rag-pageindex]] (외부 튜토리얼)

## 2. 주요 기여 (Key Contributions)

1. **Vectorless RAG 패러다임 제시**: vector DB(Chroma, Pinecone 등) 없이 LLM의 in-context reasoning만으로 long document에서 정답을 찾는 retrieval 방식 정의.
2. **PageIndex Tree (ToC Index) 자료구조**: `{node_id, name/title, description/summary, metadata, start_index, end_index, sub_nodes}` 의 재귀 JSON 트리로 비구조 문서(unstructured document)에 인덱스를 부여.
3. **5대 vector RAG 한계 분류**: (1) query–knowledge space mismatch, (2) semantic similarity ≠ relevance, (3) hard chunking으로 인한 semantic 단절, (4) chat history 미통합, (5) in-document reference("see Appendix G") 처리 실패 — 각 한계에 reasoning-based 대응 매핑.
4. **In-context index 개념**: vector DB는 외부의 정적 embedding 저장소인 반면, PageIndex 트리는 LLM의 active reasoning context 내부에 상주하는 "in-context index"로서 모델이 직접 navigate · reason 가능.
5. **Iterative retrieval 알고리즘**: ToC 읽기 → 섹션 선택 → 정보 추출 → 충분성 평가 → (불충분 시) 반복 → 답변 생성. 인간이 긴 문서를 다루는 방식 모사.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### Vector-based RAG의 동작 (대비군)

- **Preprocessing**: 문서를 512/1000 토큰의 fixed-size chunk로 분할 → embedding 모델로 vector 변환 → vector DB(Chroma/Pinecone) 저장.
- **Query**: 사용자 query를 embedding → vector DB에서 top-k 유사 chunk 검색 → 검색된 chunks를 LLM context에 주입.

### PageIndex (Reasoning-based) 동작

1. **ToC 인덱스 생성 (offline)**: 비구조 문서를 PageIndex Tree(JSON) 형태로 변환. 각 노드는 논리적 섹션 단위.
2. **Reasoning loop (online)**: LLM이 query와 함께 ToC 트리를 받아 다음 4단계를 반복:
   - **Read ToC**: 문서 구조 파악 및 후보 섹션 식별.
   - **Select Section**: query 의도에 가장 부합하는 노드 선택.
   - **Extract & Assess**: 해당 섹션의 raw content(`node_id → node_content`)를 가져와 충분성 판단.
   - **Iterate or Answer**: 부족하면 다른 섹션 탐색, 충분하면 답변 생성.
3. **In-document reference 추적**: 본문에 "Appendix G", "Table 5.3" 같은 cue가 나오면 LLM이 ToC 트리를 따라 해당 노드로 직접 이동.
4. **Multi-turn 통합**: 이전 대화 맥락을 reasoning에 함께 입력하여 "financial assets → liabilities" 같은 follow-up query에서 동일 섹션의 다른 측면을 탐색.

### PageIndex Tree 노드 스키마 (JSON)

```
Node {
  node_id: string,         // 고유 식별자, raw content 매핑 키
  name/title: string,      // 사람이 읽을 수 있는 섹션 제목
  description/summary: string,
  metadata: object,        // document type, author, timestamp, relevance score 등
  start_index/end_index: int,  // 원본 문서 페이지 또는 위치 범위
  sub_nodes: [Node]        // 재귀 자식 노드
}
```

### 배포 형태

- **GitHub**: 오픈소스 코드 + cookbooks/tutorials.
- **ChatGPT-style 채팅 플랫폼**: 일반 사용자용 UI.
- **MCP (Model Context Protocol) · API**: 개발자용 통합 인터페이스.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

본 글은 벤치마크 수치 위주가 아닌 **질적 비교 사례**를 제시한다.

- **PageIndex MCP 사례 (Federal Reserve 보고서)**:
  - Query: "총 deferred asset 가치"
  - 주요 섹션(pp. 75–82)에는 **증가분만** 기재되어 있어 vector RAG는 정답을 놓침.
  - p. 77의 본문에 "Table 5.3 ... Appendix G of this report, 'Statistical Tables,' provides more detailed information…" 이라는 cue 존재.
  - PageIndex는 이 cue를 따라 Appendix G로 이동 → 정확한 총 deferred asset 값 반환.
- **정성 요약 비교 표**:

  | 한계 | Vector-based RAG | Reasoning-based RAG |
  |---|---|---|
  | Query–Knowledge mismatch | 표면 유사도 매칭, 진짜 맥락 놓침 | reasoning으로 관련 섹션 추론 |
  | Similarity ≠ Relevance | 의미 유사하지만 무관한 chunk 반환 | 문맥적 관련성 우선 |
  | Hard chunking | 고정 길이 분할로 의미 단절 | semantic 단위(섹션/챕터) 동적 retrieval |
  | Chat context | 각 query 독립 | 이전 대화 활용한 multi-turn |
  | Cross-reference | 내부 링크 추적 실패 | ToC/PageIndex로 reference 따라감 |

- 참조 비교: **Claude Code도 코드 retrieval에서 vector DB 없이 우수한 정밀도/속도** 달성 — 같은 원리를 문서 retrieval에도 적용해야 한다는 논거.

## 5. 한계와 향후 과제 (Limitations and Future Work)

블로그 글이라 한계는 명시되지 않으나 다음이 잠재 이슈로 추정된다:

- **ToC 트리 생성 비용**: 비구조 문서를 PageIndex Tree로 변환하는 전처리 비용 (특히 ToC가 명시되지 않은 문서).
- **Context window 부담**: ToC 트리 자체가 active context에 상주하므로 매우 큰 문서에서는 트리 크기가 context 한계와 충돌 가능.
- **Iteration latency**: vector retrieval이 단일 K-NN인 반면 reasoning loop는 여러 LLM 호출을 요구해 latency · 비용 증가.
- **벤치마크 부재**: 정성 사례 외에 정량적 평가(precision/recall, latency, cost) 미제시.
- **문서 유형 일반화**: 사례가 주로 금융/법률 등 명시적 섹션 구조가 있는 문서에 집중 — 평문 위주 문서(대화, 자유 산문)에서의 효과는 불분명.

## 6. 관련 연구 (Related Work)

- **VectifyAI/PageIndex (오픈소스 레포)**: 본 글에서 소개하는 시스템의 구현체. [[vectifyai-pageindex]] 참고.
- **GeeksforGeeks: Vectorless RAG: PageIndex 튜토리얼**: LangChain · Gemini · DeepSeek-R1 결합한 실습 가이드. [[geeksforgeeks-2026-vectorless-rag-pageindex]].
- **Claude Code의 code retrieval**: vector DB 없이 LLM reasoning으로 코드 탐색 — vectorless 패러다임의 선례로 인용.
- **MCP (Model Context Protocol)**: PageIndex의 배포 채널 중 하나.
- **전통적 vector RAG 인프라**: Chroma, Pinecone — 본 글의 대비군.
- **Hierarchical / structure-aware RAG 연구 전반**: knowledge graph 기반 RAG, GraphRAG 등이 cross-reference 문제를 다른 방식으로 해결 시도.

## 7. 용어집 (Glossary)

- **Vectorless RAG**: vector embedding · vector DB 없이 LLM의 reasoning만으로 retrieval을 수행하는 패러다임.
- **Reasoning-based RAG**: 정적 유사도 대신 LLM이 동적으로 "어디를 볼지" 추론하여 retrieve하는 방식.
- **PageIndex Tree (ToC Index)**: 문서의 Table of Contents를 재귀 JSON 트리로 표현한 인덱스 자료구조.
- **In-context Index**: vector DB 같은 외부 저장소가 아니라 LLM의 active context 내부에 상주하는 인덱스 — 모델이 직접 navigate.
- **Hard Chunking**: 문서를 512/1000 토큰 등 고정 크기로 자르는 방식. 문장/문단 경계를 무시해 의미 단절을 유발.
- **node_id → node_content 매핑**: PageIndex 트리의 각 노드 ID가 원본 raw 콘텐츠(텍스트, 이미지)와 매핑되어 LLM이 선택적 retrieval 가능.
- **In-document Reference**: "see Appendix G", "refer to Table 5.3" 같은 문서 내부 참조 — vector RAG가 의미 유사도 부족으로 추적 실패하는 케이스.
- **MCP (Model Context Protocol)**: PageIndex의 배포 채널 중 하나로, LLM 도구 통합 표준 프로토콜.
- **Iterative Retrieval Loop**: ToC 읽기 → 섹션 선택 → 추출 → 충분성 평가 → (반복 or 답변)의 사람 흉내 retrieval 루프.
