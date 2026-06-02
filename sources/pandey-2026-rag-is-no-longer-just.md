---
title: "RAG is no longer just \"vector search + LLM\""
type: article
year: 2026
category: applications
raw_path: /Users/kmyu/Desktop/project/ai-wiki/raw/articles/pandey-2026-rag-is-no-longer-just.md
raw_filename: "pandey-2026-rag-is-no-longer-just.md"
source_collection: external
author: "Brij Kishore Pandey"
url: "https://www.linkedin.com/posts/brijpandeyji_rag-is-no-longer-just-vector-search-llm-activity-7467221569761832962-xgVn"
publisher: "LinkedIn (post by Brij Kishore Pandey)"
publication_date: "2026-06-02"
tags: [rag, hybrid-rag, graphrag, agentic-rag, corrective-rag, crag, multimodal-rag, retrieval-architecture, production-rag, design-space, linkedin]
---

## 한 줄 요약 (One-line Summary)

**Brij Kishore Pandey**의 LinkedIn 짧은 포스트. *"Which vector DB?" → "What kind of retrieval architecture does this use case actually need?"* 라는 질문 전환을 핵심으로, 2026년 production RAG를 **5가지 아키텍처 디자인 공간**(Hybrid · Graph · Agentic · Corrective(CRAG) · Multimodal)으로 정리하고, *"RAG는 단일 패턴이 아니라 design space"*, *"The future of RAG is not just better embeddings. It is better retrieval design"* 이라는 thesis를 제시한다. 깊은 벤치마크나 코드는 없는 **요약·정렬용 reference card** 성격의 자료다.

## 1. 자료 정보 (Document Information)

- **저자**: Brij Kishore Pandey (LinkedIn에서 AI/data engineering 콘텐츠로 알려진 인플루언서)
- **매체**: LinkedIn 공개 포스트
- **URL**: <https://www.linkedin.com/posts/brijpandeyji_rag-is-no-longer-just-vector-search-llm-activity-7467221569761832962-xgVn>
- **수집 시점**: 게시 ≈ 11시간 전 (2026-06-02 ingestion 기준)
- **분량**: 짧은 포스트 (≈ 300단어, 첨부 다이어그램은 LinkedIn 동적 렌더링으로 추출 실패)
- **수집 방법**: `WebFetch` 두 번 호출 (CLAUDE.md rule #1 *"사용자가 명시적으로 자료 수집을 지시한 경우"* 예외). LinkedIn은 dynamic rendering으로 verbatim 추출에 한계가 있어 본문 텍스트는 두 번째 호출(엄격 verbatim prompt)의 출력을 채택.
- **장르**: 정렬·요약용 **reference card / mental model 포스트**. 새 연구 결과나 벤치마크 없음.

## 2. 주요 기여 (Key Contributions)

1. **질문 전환** — *"Which vector database should we use?"* → *"What kind of retrieval architecture does this use case actually need?"*. 인프라 선택보다 아키텍처 선택이 앞선다는 명시적 정렬.
2. **5개 아키텍처를 한 카드에 정렬** — Hybrid · Graph · Agentic · Corrective(CRAG) · Multimodal RAG를 *각각 어떤 use case에 가장 적합한지* 한 줄로 매핑. 신규 분류는 아니지만 흩어진 패턴을 한 페이지에 압축.
3. **"RAG는 single pattern이 아니라 design space"** — 단일 stack 선택이 아니라 **use case-driven retrieval design** 으로 사고를 옮긴다는 thesis. 5개 use case(support chatbot · financial analyst · legal research · medical document review · enterprise knowledge)를 예시로 제시.
4. **Slogan** — *"The future of RAG is not just better embeddings. It is better retrieval design."* embedding 모델 경쟁(예: Gemini Embedding 2)이 아니라 retrieval 흐름·검증·재시도 설계가 차별 포인트라는 주장.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

본 포스트는 **연구 방법론이 아닌 design pattern catalog** 다. 5개 패턴을 각각 *"무엇을 결합하는가 + 언제 쓰는가"* 두 문장으로 요약한다.

### 3.1 Hybrid RAG
- **결합**: dense vector search + sparse keyword search (BM25/TF-IDF 등).
- **언제**: semantic similarity만으로 부족할 때 (예: 정확한 토큰 매칭이 중요한 코드·법조문·고유명사).
- 관련 외부 사례: dense + BM25 hybrid는 LightRAG의 dual-level keyword retrieval 등에서도 핵심 (`database/guo-2025-lightrag-simple-and-fast`).

### 3.2 GraphRAG
- **결합**: entities + relationships + knowledge graphs.
- **언제**: 답이 **연결**과 **관계 기반 reasoning**에 의존할 때.
- 관련 외부 사례: HKUDS/RAG-Anything의 cross-modal KG + text KG dual-graph, LeanRAG의 hierarchical KG + LCA retrieval(`database/zhang-2026-leanrag-knowledge-graph-based-generation`), graphify/codegraph 같은 코드-그래프 도구(`applications/safishamsi-graphify`, `applications/colbymchenry-codegraph`).

### 3.3 Agentic RAG
- **재정의**: retrieval을 **planning workflow** 로 변환.
- **에이전트의 책임**: (1) 어떤 도구를 쓸지, (2) 언제 검색할지, (3) **언제 충분한 confidence를 가졌는지** 결정.
- 관련 외부 사례: Direct Corpus Interaction(DCI) 패러다임 — agent가 `grep`·`bash`로 raw corpus 직접 검색 (`database/li-2026-beyond-semantic-similarity-rethinking-retrieval`), MIA의 Manager-Planner-Executor 분리 (`agents/qiao-2026-memory-intelligence-agent`).

### 3.4 Corrective RAG (CRAG)
- **메커니즘**: retrieved doc를 **grading**한 뒤에야 신뢰. retrieval 품질이 낮으면 (a) 쿼리 재작성, (b) 대체 소스로 fallback.
- 핵심은 *"retrieval → generation"* 사이에 **품질 게이트**를 박는 것.

### 3.5 Multimodal RAG
- **대상 modality**: text · images · charts · tables.
- **언제**: enterprise 문서(reports · slide decks · invoices · visual data).
- 관련 외부 사례: RAG-Anything의 dual-graph + modality-aware hybrid retrieval (`database/guo-2025-rag-anything-all-in-one-rag`), Gemini Embedding 2의 native multimodal embedding (`database/shanbhogue-2026-gemini-embedding-2-native-multimodal`).

### 3.6 Closing thesis
- **Mistake**: RAG를 **single pattern** 으로 다룸.
- **Reframe**: RAG는 **design space**.
- **Use case 다양성**: support chatbot · financial analyst assistant · legal research · medical document reviewer · enterprise knowledge assistant. 다섯 도메인 모두 retrieval 아키텍처가 달라야 함.
- **Slogan**: *"The future of RAG is not just better embeddings. It is better retrieval design."*

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

본 포스트에는 **수치·벤치마크가 없다**. 즉 다음을 제공하지 않는다:
- 5개 아키텍처별 latency · cost · accuracy 수치
- 비교 표(예: Hybrid vs Graph vs Agentic 동일 코퍼스 비교)
- production traffic 통계나 deployment case study

대신 **mental model** 과 **slogan** 만 제공. 정량 비교가 필요하면 같은 wiki 안의 다음 자료들이 보완재가 된다:
- `database/li-2026-beyond-semantic-similarity-rethinking-retrieval` — DCI(Agentic-RAG의 극단)가 BrowseComp-Plus 80.0% vs Qwen3-Embed-8B 69.0%, cost −29.4%
- `database/guo-2025-rag-anything-all-in-one-rag` — Multimodal RAG의 100+ 페이지 장문 격차 13점+
- `database/guo-2025-lightrag-simple-and-fast` — Hybrid/Graph 변형의 토큰·API 호출 절감
- `agents/dennis-2026-compiling-agentic-workflows-into-llm` — Agentic 워크플로우의 in-context vs compiled 87–98% quality 비교

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **깊이의 한계**: LinkedIn 포스트 특성상 5개 패턴의 **분류만** 제시하고 **trade-off matrix** 가 없다. 어떤 use case에 어떤 패턴을 쓰는지 매핑은 매우 거친 한 줄 수준.
- **누락된 패턴**: 본 포스트가 다루지 않는 RAG 변형들 — Self-RAG (LLM이 retrieval 필요성 self-assess), Adaptive RAG (쿼리 복잡도에 따라 routing), RAG-Fusion (multi-query expansion), Vectorless / Reasoning-based RAG (PageIndex 류, `database/vectifyai-pageindex`), LLM Wiki 패턴 (Karpathy gist, `applications/liu-2026-rag-llm-wiki-or-gbrain`).
- **5개 패턴의 상호 보완성 미언급**: 실제 production은 Hybrid + Graph + CRAG를 **stack**하는 경우가 흔하지만 본 포스트는 5개를 mutually exclusive처럼 나열.
- **벤치마크·코드 부재**: validation 없는 mental model. wiki에 ingestion할 때는 보조 자료(벤치마크 페이퍼)와 cross-link 필수.
- **LinkedIn 포스트 일반의 한계**: 첨부 다이어그램(5개 아키텍처를 한 다이어그램으로 그린 카드)이 일반적이지만 본 ingestion에서 verbatim 추출 실패. 시각 자료는 누락.

## 6. 관련 연구 (Related Work)

본 포스트는 외부 인용·레퍼런스를 명시하지 않지만, **묵시적으로 다음 흐름 위에 서 있다**:

- **GraphRAG**: Microsoft Research의 GraphRAG (2024) 계열, HKUDS LightRAG/RAG-Anything (`database/guo-2025-*`), LeanRAG (`database/zhang-2026-leanrag-knowledge-graph-based-generation`).
- **CRAG**: Yan et al. *"Corrective Retrieval-Augmented Generation"* (2024) 원논문. retrieval evaluator + 쿼리 재작성 + 웹 검색 fallback이 핵심.
- **Agentic RAG**: ReAct · Self-Ask 계열의 tool-use 패러다임. 본 wiki에서는 MIA(`agents/qiao-2026-memory-intelligence-agent`), Subterranean Agent(`agents/dennis-2026-compiling-agentic-workflows-into-llm`), DCI(`database/li-2026-beyond-semantic-similarity-rethinking-retrieval`)가 가까운 사례.
- **Multimodal RAG**: ColBERT · ColPali · Voyage-3.5-mm · Gemini Embedding 2 (`database/shanbhogue-2026-gemini-embedding-2-native-multimodal`), RAG-Anything (`database/guo-2025-rag-anything-all-in-one-rag`).
- **Hybrid (dense + sparse)**: BM25 + dense vector의 표준 hybrid는 Elastic · Vespa · OpenSearch 등 인프라 단에서 일반화.

## 7. 용어집 (Glossary)

- **RAG (Retrieval-Augmented Generation)**: LLM이 생성 전에 외부 코퍼스에서 관련 문서를 검색해 컨텍스트로 주입하는 패턴.
- **Hybrid RAG**: dense vector search(semantic)와 sparse keyword search(BM25/TF-IDF 등)의 결과를 결합·재정렬해 사용하는 RAG.
- **GraphRAG**: 문서 코퍼스에서 entity·relation을 추출해 knowledge graph로 만들고, 질의 시 그래프 traversal과 community summary를 사용하는 RAG.
- **Agentic RAG**: retrieval 자체를 planning step으로 두는 RAG. agent가 어떤 도구·소스·시점을 쓸지와 *"충분한가"* 를 스스로 판단.
- **Corrective RAG (CRAG)**: retrieval evaluator가 결과의 신뢰도를 grading(Correct / Incorrect / Ambiguous)하고, 약하면 쿼리 재작성 또는 대체 소스(예: web search)로 fallback하는 RAG.
- **Multimodal RAG**: 텍스트뿐 아니라 이미지·차트·표 등 multi-modality를 인덱싱·검색하는 RAG. enterprise 문서(슬라이드·인보이스·차트)에 필수.
- **Design space**: 단일 stack이 아니라, **요구사항에 따라 다른 조합을 선택하는 패턴 집합**. 본 포스트의 핵심 reframe.
- **Retrieval architecture**: vector DB 선택을 넘어, *어떻게 검색하고 검증하고 재시도하는가* 전체 흐름.
