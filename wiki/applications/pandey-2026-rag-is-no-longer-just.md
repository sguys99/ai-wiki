---
title: "RAG는 더 이상 vector search + LLM이 아니다: 5가지 production RAG 아키텍처 (Pandey, LinkedIn)"
type: article
year: 2026
category: applications
raw_path: raw/articles/pandey-2026-rag-is-no-longer-just.md
raw_filename: "pandey-2026-rag-is-no-longer-just.md"
source: pandey-2026-rag-is-no-longer-just.md
source_collection: external
author: "Brij Kishore Pandey"
url: "https://www.linkedin.com/posts/brijpandeyji_rag-is-no-longer-just-vector-search-llm-activity-7467221569761832962-xgVn"
publisher: "LinkedIn (post by Brij Kishore Pandey)"
publication_date: "2026-06-02"
tags: [rag, hybrid-rag, graphrag, agentic-rag, corrective-rag, crag, multimodal-rag, retrieval-architecture, production-rag, design-space, linkedin, mental-model]
---

## 요약 (Summary)

Brij Kishore Pandey의 짧은 LinkedIn 포스트(≈300단어). 핵심 reframe은 *"Which vector database should we use?"* 라는 인프라 질문을 *"What kind of retrieval architecture does this use case actually need?"* 라는 **디자인 질문** 으로 옮기는 것. 2026 production RAG를 **5개 아키텍처 디자인 공간** 으로 정리한다:

| # | 패턴 | 결합 | 언제 쓰는가 |
|---|---|---|---|
| 1 | **Hybrid RAG** | dense vector + sparse keyword | semantic similarity만으로 부족할 때 |
| 2 | **GraphRAG** | entity + relation + KG | 답이 연결·관계 reasoning에 의존할 때 |
| 3 | **Agentic RAG** | retrieval = planning workflow | agent가 도구·시점·confidence를 결정 |
| 4 | **Corrective RAG (CRAG)** | retrieval grading + 재시도/fallback | retrieval 품질을 신뢰 전 검증 |
| 5 | **Multimodal RAG** | text + image + chart + table | enterprise 문서(slide·invoice 등) |

Thesis: *"RAG는 single pattern이 아니라 design space"*, *"The future of RAG is not just better embeddings. It is better retrieval design."*

## 주요 기여 (Key Contributions)

1. **질문 전환** — *"Which vector DB?"* → *"What retrieval architecture does this use case need?"* 인프라 선택을 architectural choice 뒤로 미룸.
2. **5개 아키텍처 정렬 카드** — Hybrid · Graph · Agentic · CRAG · Multimodal을 한 페이지에 압축. 새 분류는 아니지만 흩어진 패턴을 mental model로 묶는 reference.
3. **Use case 다양성 강조** — support chatbot · financial analyst · legal research · medical document reviewer · enterprise knowledge assistant 5개 도메인은 retrieval 아키텍처가 달라야 함.
4. **"Design space" reframe** — RAG는 단일 stack 선택이 아니라 use case-driven design space. 팀의 가장 흔한 실수는 RAG를 single pattern으로 다루는 것.
5. **Slogan** — *"The future of RAG is not just better embeddings. It is better retrieval design."* embedding 모델 경쟁(Gemini Embedding 2 등)이 아니라 retrieval flow 설계가 차별 포인트.

## 방법론 및 아키텍처 (Methodology and Architecture)

본 포스트는 **연구가 아닌 design pattern catalog**다. 5개 패턴을 *"무엇을 결합 + 언제 사용"* 두 문장으로 요약한다.

### 1. Hybrid RAG
- **결합**: dense vector search + sparse keyword search (BM25/TF-IDF).
- **언제**: semantic similarity 단독으로 부족 — 정확한 토큰 매칭이 중요한 코드·법조문·고유명사·버전 번호 등.
- 이 wiki 안의 가까운 사례: LightRAG의 dual-level keyword retrieval은 hybrid를 graph 축으로 확장한 변형이다 (`database/guo-2025-lightrag-simple-and-fast`).

### 2. GraphRAG
- **결합**: entity · relation · knowledge graph.
- **언제**: 답이 **연결과 관계 reasoning**에 의존할 때 (예: 다중-홉 QA, "X와 Y는 무슨 관계?").
- 이 wiki 안의 가까운 사례: RAG-Anything의 cross-modal KG + text KG dual-graph (`database/guo-2025-rag-anything-all-in-one-rag`, `database/hkuds-rag-anything`), LeanRAG의 hierarchical KG + LCA retrieval로 redundancy 46% 감소 (`database/zhang-2026-leanrag-knowledge-graph-based-generation`), 코드·polyglot 코퍼스의 graph-only RAG인 graphify/codegraph (`applications/safishamsi-graphify`, `applications/colbymchenry-codegraph`).

### 3. Agentic RAG
- **재정의**: retrieval을 **planning workflow** 로 변환.
- **에이전트의 책임 3가지**: (a) 어떤 도구를 쓸지, (b) 언제 검색할지, (c) **언제 충분한 confidence를 가졌는지** 판단.
- 이 wiki 안의 극단 사례: Direct Corpus Interaction(DCI) — embedding/index 없이 agent가 `grep`·`bash`로 raw corpus 직접 탐색, BrowseComp-Plus 80.0% vs Qwen3-Embed-8B 69.0%, cost −29.4% (`database/li-2026-beyond-semantic-similarity-rethinking-retrieval`). 다른 사례: MIA의 Manager-Planner-Executor 분리 (`agents/qiao-2026-memory-intelligence-agent`), Subterranean Agent의 in-context vs compiled trade-off (`agents/dennis-2026-compiling-agentic-workflows-into-llm`).

### 4. Corrective RAG (CRAG)
- **메커니즘**: retrieval evaluator가 retrieved doc를 **grading** → 약하면 쿼리 재작성 또는 대체 소스(web search 등)로 fallback.
- 핵심: *"retrieval → generation"* 사이의 **품질 게이트**.
- 본 wiki에는 CRAG 전용 자료는 아직 없음. 원논문(Yan et al., 2024) 참조 필요. agentic RAG의 self-grading 변형으로 볼 수도 있다.

### 5. Multimodal RAG
- **modality**: text · image · chart · table.
- **언제**: enterprise 문서 — reports · slide decks · invoices · visual data.
- 이 wiki 안의 가까운 사례: RAG-Anything의 dual-graph + modality-aware hybrid retrieval, 100+ 페이지 장문에서 격차 13점+ (`database/guo-2025-rag-anything-all-in-one-rag`); Gemini Embedding 2의 native multimodal embedding (text/image/audio 단일 모델), MSCOCO T→I 62.9, ViDoRe V2 64.9 (`database/shanbhogue-2026-gemini-embedding-2-native-multimodal`); SMART(single-vector → late-interaction multi-vector adapter)로 visdoc 81.25 달성 (`database/zhang-2026-your-embedding-model-is-smarter`).

### Use case → 패턴 매핑 (포스트 본문 + 본 wiki 보완)

| Use case | 주된 패턴 후보 |
|---|---|
| Support chatbot | Hybrid + CRAG (FAQ + 키워드 우선) |
| Financial analyst assistant | Multimodal (slide/PDF) + Graph (entity relation) |
| Legal research | Hybrid (정확 토큰) + Graph (case 인용 관계) + CRAG |
| Medical document reviewer | Multimodal (영상·차트) + CRAG (안전 검증) |
| Enterprise knowledge assistant | Hybrid + Multimodal + Agentic (도구 선택) |

> 본 매핑은 wiki ingestion 시 보강한 해석이며, 원 포스트는 5개 패턴과 5개 use case를 나란히 나열하기만 했다 (1:1 매핑은 제시하지 않음).

## 결과 (Results)

본 포스트는 **벤치마크·코드·수치가 없는 mental-model 카드** 다. 즉 다음을 *제공하지 않는다*:
- 5개 아키텍처별 latency/cost/accuracy 수치
- 동일 코퍼스 위 head-to-head 비교
- production traffic 통계 / case study

대신 *"RAG는 design space"* 라는 한 줄 reframe과 *"embeddings보다 retrieval design"* 슬로건이 자료의 결과물이다. 정량 비교가 필요하면 본 wiki 내 다음 자료가 보완재가 된다:

- **Agentic 극단**: DCI vs embedding baseline 정량 — `database/li-2026-beyond-semantic-similarity-rethinking-retrieval`
- **Multimodal 정량**: RAG-Anything DocBench/MMLongBench — `database/guo-2025-rag-anything-all-in-one-rag`, Gemini Embedding 2 MTEB Multilingual 69.9 — `database/shanbhogue-2026-gemini-embedding-2-native-multimodal`
- **Graph 정량**: LightRAG/LeanRAG 토큰·정확도 — `database/guo-2025-lightrag-simple-and-fast`, `database/zhang-2026-leanrag-knowledge-graph-based-generation`
- **Agentic workflow의 cost/quality**: in-context vs compiled — `agents/dennis-2026-compiling-agentic-workflows-into-llm`

## 한계 (Limitations)

- **분류만, trade-off matrix 없음**: 어떤 use case에 어떤 패턴인지 1:1 매핑이 없다. 위의 use case 매핑 표는 wiki ingestion 시의 해석.
- **5개 패턴의 stacking 미언급**: 실제 production은 Hybrid + Graph + CRAG를 동시에 쌓는 경우가 흔하지만, 본 포스트는 mutually exclusive처럼 나열.
- **누락 패턴**: Self-RAG, Adaptive RAG, RAG-Fusion (multi-query expansion), Vectorless/Reasoning-based RAG (PageIndex 류, `database/vectifyai-pageindex`), LLM Wiki 패턴 (Karpathy gist, `applications/liu-2026-rag-llm-wiki-or-gbrain`)이 다뤄지지 않음.
- **시각 자료 미수집**: LinkedIn 포스트는 보통 5개 아키텍처를 한 다이어그램으로 제시하지만, dynamic rendering으로 verbatim 추출에 실패해 본 ingestion에는 텍스트만 남았다.

## 관련 페이지 (Related Pages)

- [[applications/liu-2026-rag-llm-wiki-or-gbrain]] — 같은 *"RAG는 single pattern이 아니다"* 흐름을 더 깊게 (RAG vs LLM Wiki vs Fat Skills 3축 결정 프레임워크). Pandey의 5-아키텍처가 *"retrieve" 축 내부의 변형* 이라면, Liu는 retrieve/compile/act 자체를 분류한다.
- [[database/li-2026-beyond-semantic-similarity-rethinking-retrieval]] — Agentic RAG의 가장 극단(임베딩 없이 grep/bash) + 정량 결과.
- [[database/guo-2025-rag-anything-all-in-one-rag]], [[database/hkuds-rag-anything]] — Multimodal RAG의 구현 사례 (Pandey의 #5 패턴).
- [[database/guo-2025-lightrag-simple-and-fast]] — Hybrid의 dual-level keyword 변형 (Pandey의 #1 + #2).
- [[database/zhang-2026-leanrag-knowledge-graph-based-generation]] — GraphRAG의 hierarchical KG + LCA (Pandey의 #2).
- [[database/shanbhogue-2026-gemini-embedding-2-native-multimodal]] — *"better embeddings ≠ future of RAG"* 슬로건과 대비되는 embedding 진영의 사례.
- [[database/vectifyai-pageindex]] — Pandey 포스트에 누락된 vectorless/reasoning-based RAG.
- [[agents/dennis-2026-compiling-agentic-workflows-into-llm]] — Agentic RAG(#3)의 compile 가능성 정량 분석.
- [[agents/qiao-2026-memory-intelligence-agent]] — Agentic RAG(#3)의 Manager-Planner-Executor 분리 사례.
- [[overviews/lightrag-family-graph-rag-overview]] — Hybrid + Graph 흐름의 합성 페이지 (Pandey #1·#2 영역의 가족 트리).
- [[overviews/gbrain-ecosystem-overview]] — *"retrieve + compile + act 융합"* 관점 (Liu와 함께 Pandey의 "design space" 슬로건을 메타-레벨로 확장).
