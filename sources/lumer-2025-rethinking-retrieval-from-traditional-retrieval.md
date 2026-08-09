---
title: "Rethinking Retrieval: From Traditional Retrieval Augmented Generation to Agentic and Non-Vector Reasoning Systems in the Financial Domain for Large Language Models"
type: paper
year: 2025
category: database
raw_path: /home/sguys99/project/ai-wiki/raw/papers/lumer-2025-rethinking-retrieval-from-traditional-retrieval.pdf
raw_filename: "lumer-2025-rethinking-retrieval-from-traditional-retrieval.pdf"
source_collection: external
authors: "Elias Lumer, Matt Melich, Olivia Zino, Elena Kim, Sara Dieter, Pradeep Honaganahalli Basavaraju, Vamse Kumar Subbiah, James A. Burke, Roberto Hernandez (PricewaterhouseCoopers U.S.)"
arxiv_id: "2511.18177"
tags: [rag, financial-qa, vector-rag, vectorless-rag, pageindex, hierarchical-node, cross-encoder-reranking, small-to-big, agentic-rag, sec-filings, evaluation, cohere-rerank, azure-ai-search]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/lumer-2025-rethinking-retrieval-from-traditional-retrieval/fig01.png
    raw: raw/papers/lumer-2025-rethinking-retrieval-from-traditional-retrieval-figures/fig01.png
    caption: "hierarchical node-based RAG의 node tree 구조 예시 — 문서를 title·page range(start/end index)·node_id를 가진 중첩 노드로 표현한 JSON"
    page: 3
    bbox_norm: [0.4922, 0.0, 0.9031, 0.5879]
    strategy: column-band
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/lumer-2025-rethinking-retrieval-from-traditional-retrieval/fig02.png
    raw: raw/papers/lumer-2025-rethinking-retrieval-from-traditional-retrieval-figures/fig02.png
    caption: "small-to-big retrieval — vector search로 찾은 target chunk(idx)를 인접 chunk(idx±1, idx±2)로 확장해 LLM에 전달"
    page: 4
    bbox_norm: [0.509, 0.1053, 0.8863, 0.238]
    strategy: caption-region
    curated: true
  - id: tab01
    label: Table 1
    kind: table
    file: assets/lumer-2025-rethinking-retrieval-from-traditional-retrieval/tab01.png
    raw: raw/papers/lumer-2025-rethinking-retrieval-from-traditional-retrieval-figures/tab01.png
    caption: "hierarchical node tree 생성 preprocessing 비용 — 한 기업의 10-Q/10-K 기준 세 모델 비교 (GPT-4o 10-K $30.62)"
    page: 5
    bbox_norm: [0.1109, 0.1544, 0.4922, 0.2269]
    strategy: manual
    curated: true
  - id: tab02
    label: Table 2
    kind: table
    file: assets/lumer-2025-rethinking-retrieval-from-traditional-retrieval/tab02.png
    raw: raw/papers/lumer-2025-rethinking-retrieval-from-traditional-retrieval-figures/tab02.png
    caption: "node-level summary 포함 시 preprocessing 성능 — token·latency·모델별 cost"
    page: 5
    bbox_norm: [0.5297, 0.1647, 0.8657, 0.2746]
    strategy: table-region
    curated: false
  - id: tab03
    label: Table 3
    kind: table
    file: assets/lumer-2025-rethinking-retrieval-from-traditional-retrieval/tab03.png
    raw: raw/papers/lumer-2025-rethinking-retrieval-from-traditional-retrieval-figures/tab03.png
    caption: "summary 미포함 시 preprocessing 성능 — 낮은 token·cost, 대신 navigation context 빈약"
    page: 5
    bbox_norm: [0.5149, 0.3279, 0.8801, 0.4621]
    strategy: manual
    curated: false
  - id: tab04
    label: Table 4
    kind: table
    file: assets/lumer-2025-rethinking-retrieval-from-traditional-retrieval/tab04.png
    raw: raw/papers/lumer-2025-rethinking-retrieval-from-traditional-retrieval-figures/tab04.png
    caption: "cross-encoder reranking 파라미터별 성능 — (10,5)에서 MRR@5 0.160→0.750, Recall@5 1.00"
    page: 6
    bbox_norm: [0.265, 0.1411, 0.735, 0.2989]
    strategy: table-region
    curated: true
---

## 한 줄 요약 (One-line Summary)

PricewaterhouseCoopers U.S.가 1,200개 SEC 10-K/10-Q/8-K filing과 150-question 벤치마크에서 **vector-based agentic RAG vs hierarchical node-based(PageIndex 스타일) reasoning RAG**를 처음으로 controlled 비교하고, vector RAG가 68% win rate(latency 5.2 vs 5.98s)로 승리; 추가로 **cross-encoder reranking (10,5) 설정이 MRR@5 0.160→0.750으로 +59%p 절대 향상**, **small-to-big retrieval가 +0.2s latency·$0 추가비용에 65% win rate** 임을 controlled grid로 증명한 financial-domain RAG benchmark 논문.

## 1. 자료 정보 (Document Information)

- **arXiv**: 2511.18177v1 (cs.CL, 2025-11-22)
- **저자**: Elias Lumer 외 8인 (PricewaterhouseCoopers U.S.)
  - Lumer는 PwC 내부에서 다수의 agentic RAG 관련 작업을 발표한 저자(MemTool, ScaleMCP, Tool-to-Agent Retrieval, Toolshed 등).
- **도메인**: Financial Q&A (SEC EDGAR filings), Agentic RAG, Vectorless/Reasoning RAG
- **벤치마크**: 자체 구축 — 1,200 SEC filing(10-K, 10-Q, 8-K) + 150 Q&A(65 multi-hop · 65 single-hop · 20 summary), 2020–2025 Fortune 500
- **실험 모델**:
  - Answer generation: OpenAI GPT-4o
  - Embedding: OpenAI `text-embedding-ada-002`
  - Reranker: `Cohere rerank-english-v3.0`
  - LLM judge: Anthropic Claude 4.5 Sonnet (pairwise, 6 criteria)
  - Vector DB: Azure AI Search
- **참고 자료**: 본 논문은 [[vectifyai-pageindex]](VectifyAI/PageIndex repo)와 [[geeksforgeeks-2026-vectorless-rag-pageindex]] 튜토리얼의 reasoning-based RAG를 vector RAG와 동일 corpus·질문에서 controlled 비교한 first systematic evaluation으로 자임한다.

## 2. 주요 기여 (Key Contributions)

논문의 5가지 finding:

1. **Architecture comparison — vector wins**: Hybrid search + metadata filtering + corrective RAG로 구성된 **vector-based agentic RAG가 hierarchical node-based(PageIndex 스타일) reasoning RAG 대비 68% win rate**(LLM-as-a-judge pairwise) + 더 빠른 latency(5.2s vs 5.98s). Hierarchical 시스템은 150문항 중 2개 답변 실패 + 2개 오답을 기록했고, vector RAG는 모든 질문에서 relevant context를 retrieval 성공.
2. **TOC selection bottleneck**: Hierarchical 패배의 mechanism은 **table-of-contents 단계에서 LLM이 relevant section을 고르는 selection bottleneck** — 복잡한 financial query에서 hierarchical navigation이 vector semantic matching에 밀린다. Vector search로 candidate node를 좁힌 뒤 LLM traversal을 얹는 **hybrid hierarchical-vector RAG**가 future work로 제안됨.
3. **Cross-encoder reranking optimal config = (10, 5)**: $k_{initial}=10$, $k_{final}=5$ 설정에서 **MRR@5 0.160 → 0.750 (+59%p 절대 향상)** + **Recall@5 0.50 → 1.00 (perfect)**, latency 0.22s → 2.02s. 모든 reranking 설정이 perfect Recall@5(1.00)을 달성했고, $k_{initial} \geq 50$은 diminishing returns. Sub-2s 응답이 필요하면 (10, 10) 설정(MRR@5 0.625, 1.24s) 추천.
4. **Small-to-big retrieval**: Target chunk + 인접 chunk(immediate neighbors) augmentation으로 **65% win rate vs baseline chunking** + **+0.2s latency only** + **$0.000078 per-query cost(증가 0)**. Async 구현(0.17s)이 sync(0.34s) 대비 2배 빠름(인접 chunk 병렬 fetch).
5. **Preprocessing cost trade-off (hierarchical 전용)**: Hierarchical node tree 생성 비용 — GPT-4o $30.62/10-K, GPT-4.1 mini $22.27/10-K, Gemini 2.5 Flash $5.94/10-K (Table 1, per-company). Node-level summary 포함 시 GPT-4o per-filing 10-K cost가 $0.97(without) → $6.12(with summary)로 **6.3× 증가**하지만 navigation context가 풍부해진다. **Vector RAG는 이런 preprocessing overhead가 없다**는 점이 cost 측면 강점.

추가 기여:
- **150 Q&A benchmark**: 65 multi-hop / 65 single-hop / 20 summary, 각 질문에 ground-truth answer + page location 수동 annotation. Architecture 비교용 75Q, reranking 평가용 50Q, small-to-big 평가용 50Q로 specialized subset 분할.
- **LLM-as-a-judge protocol**: Claude 4.5 Sonnet이 6 criteria(accuracy · completeness · clarity · conciseness · relevance · style) pairwise 비교.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 Two retrieval architectures (controlled comparison)

**(A) Vector-based agentic RAG** (논문의 baseline + winner):

- **Chunking**: 512-token chunk, 50-token overlap
- **Embedding**: OpenAI `text-embedding-ada-002`
- **Storage**: Azure AI Search (metadata 포함)
- **Retrieval**: Hybrid search(semantic + lexical/BM25) + metadata filtering (Anthropic contextual retrieval style)
- **Orchestration**: Agentic — LLM agent가 자체적으로 query를 formulate하고 top-k retrieval, corrective RAG(Yan et al. 2024) 포함

**(B) Hierarchical node-based reasoning RAG** (PageIndex 스타일):

- 각 document를 hierarchical node tree로 변환 (Figure 1 예시는 Federal Reserve annual report — `title`, `start_index`, `end_index`, `node_id`, 중첩 `nodes`). [[vectifyai-pageindex]] 구조와 동일.
- Node tree 생성 모델 비교: **GPT-4o**(structure coherence 최고로 선택) vs GPT-4.1 mini vs Gemini 2.5 Flash(compatibility 이슈)
- Query time: LLM이 hierarchy를 traversal하면서 relevant node를 select → 해당 page range를 context로 retrieval
- **Embedding 없음** — preprocessing cost는 node tree generation에 집중

### 3.2 Two advanced enhancement techniques (vector-based 위에 독립 평가)

**(C) Cross-encoder reranking**:

- 초기 vector retrieval로 $k_{initial}$ chunk 가져온 후, Cohere `rerank-english-v3.0`가 query-chunk pair를 jointly encode해서 fine-grained 점수 부여 → top $k_{final}$ 선택 ($k_{final} \leq k_{initial}$)
- Tested grid: $(k_{initial}, k_{final}) \in \{(10,5), (10,10), (20,5), (20,10), (50,5), (50,10), (75,15), (75,25), (100,20), (100,30)\}$

**(D) Small-to-big retrieval**:

- Target chunk를 vector search로 retrieval한 뒤, **immediate neighbors**(preceding + following chunk)로 augment해서 LLM에 제공. Figure 2는 idx-2, idx-1, idx, idx+1, idx+2 5-chunk window를 표시하지만 본문은 "immediate neighbors"라고 언급(±1).
- Sync vs async 구현 비교 — async가 인접 chunk를 병렬 fetch해서 latency 감소.

### 3.3 Evaluation framework

- **Retrieval metrics**: MRR@5, Recall@5 (ground truth = annotated page numbers)
- **Answer quality**: Claude 4.5 Sonnet LLM-as-a-judge, pairwise comparison, 6 criteria — win rate 계산
- **Latency**: end-to-end (query → answer)
- **Cost**: preprocessing(embedding/node tree generation) + runtime(retrieval + reranking + LLM inference)

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 Vector vs Hierarchical (75-question subset)

| System | Win rate | Avg latency (s) | Failures |
|---|---|---|---|
| Vector-based agentic RAG | **68%** | **5.20** | 0 |
| Hierarchical node-based | 32% | 5.98 | 2 unanswered + 2 incorrect |

### 4.2 Cross-encoder reranking (50-question subset)

| $(k_{init}, k_{final})$ | MRR@5 | Recall@5 | Latency (s) |
|---|---|---|---|
| Baseline (no rerank) | 0.160 | 0.50 | **0.22** |
| **(10, 5)** ⭐ optimal | **0.750** | 1.00 | 2.02 |
| (10, 10) — fastest | 0.625 | 1.00 | **1.24** |
| (20, 10) | 0.566 | 1.00 | 1.61 |
| (20, 5) | 0.479 | 1.00 | 2.13 |
| (50, 5) | 0.550 | 1.00 | 2.52 |
| (50, 10) | 0.550 | 1.00 | 4.15 |
| (75, 15) | 0.536 | 1.00 | 3.03 |
| (75, 25) | 0.536 | 1.00 | 4.52 |
| (100, 20) | 0.519 | 1.00 | 6.01 |
| (100, 30) | 0.519 | 1.00 | 5.33 |

핵심 관찰:
- **모든 reranking 설정이 perfect Recall@5 = 1.00** — reranker는 ranking 품질뿐 아니라 coverage도 끌어올렸다.
- **(10, 5) 절대 우승** — 가장 작은 initial retrieval depth가 가장 높은 MRR을 달성. Large $k_{initial} \geq 50$은 diminishing returns.
- **Sub-2s 응답 요구 시 (10, 10) 추천** — MRR@5 0.625로 baseline의 약 4배.

### 4.3 Small-to-big retrieval (50-question subset)

| Variant | Win rate | Extra latency (s) | Per-query cost ($) |
|---|---|---|---|
| Baseline chunking | 35% | 0 | 0.000078 |
| **Small-to-big (async)** | **65%** | **+0.17** | **0.000078** (no increase) |
| Small-to-big (sync) | (-) | +0.34 | 0.000078 |

### 4.4 Preprocessing cost — per company (Table 1)

| Model | 10-Q | 10-K |
|---|---|---|
| OpenAI GPT-4o | $7.21 | **$30.62** |
| OpenAI GPT-4.1 mini | $4.23 | $22.27 |
| Google Gemini 2.5 Flash | $0.99 | $5.94 |

Total tokens per company: 10-Q 2.15M, 10-K 3.34M.

### 4.5 Preprocessing per filing — summary inclusion ablation (Table 2 vs 3, GPT-4o)

| Variant | 10-Q tokens | 10-K tokens | 10-Q latency | 10-K latency | 10-K GPT-4o cost |
|---|---|---|---|---|---|
| Without summary | 56,833 | 299,622 | 44.18s | 125.95s | **$0.97** |
| With summary | 126,414 | 667,333 | 48.46s | 144.61s | **$6.12 (6.3×)** |

Summary inclusion은 navigation context를 풍부하게 하지만 cost가 6.3× 증가 — **selective summary inclusion (query complexity 기반)** 가 future work로 제안.

## 5. 한계와 향후 과제 (Limitations and Future Work)

저자가 명시한 한계:

1. **Hierarchical RAG가 모든 query type에 약하다고 단정할 수 없음** — 150 질문 set이 specific factual retrieval(multi-hop, single-hop, summary)에 치중되어 있어, broad document summarization 같이 hierarchical traversal이 빛날 수 있는 task에서는 결론이 다를 수 있다.
2. **Single reranker family**: `Cohere rerank-english-v3.0`만 평가됨. LLM-based reranker(예: RankGPT) 및 financial domain-specific reranker와의 비교는 future work.
3. **Single embedding model**: `text-embedding-ada-002`만 사용. 더 신형(예: `text-embedding-3-large`, BGE, GTE)이나 financial-tuned embedder의 영향은 미평가.
4. **Small-to-big expansion window 고정**: ±1 chunk만 테스트. 다른 window size가 answer quality vs context distraction trade-off에 미치는 영향은 미평가.
5. **Hybrid vector + hierarchical 미구현**: discussion에서 vector retrieval로 candidate node를 좁힌 뒤 hierarchical reasoning을 적용하는 **hybrid** 가능성을 제시했지만 실험은 미수행.
6. **Domain**: financial(SEC)에 한정. Legal·medical 등 다른 long-document domain의 일반화 가능성은 검증되지 않음.
7. **Cost 평가의 산업 시나리오 제약**: 1회성 preprocessing cost vs 누적 query-time cost trade-off가 deployment scale별로 다를 수 있으나, ROI 모델은 제시되지 않음.

## 6. 관련 연구 (Related Work)

논문이 인용한 핵심 카테고리:

- **Foundational RAG**: Lewis 2020 (RAG), Karpukhin 2020 (DPR), Manning 2008 (IR textbook).
- **Advanced RAG survey**: Gao 2023 (RAG survey), Zhao 2024 (RAG for AIGC survey), Singh 2025 (Agentic RAG survey), Liu 2023 (Lost in the Middle).
- **Reranking**: Nogueira & Cho 2019 (BERT reranker), Sun 2023 (ChatGPT as reranker), Yan 2024 (CRAG corrective RAG).
- **Chunking / context expansion**: Chiang 2024 (Optimizing RAG strategies), Anthropic 2024 (Contextual retrieval).
- **Hierarchical / non-vector RAG**: VectifyAI 2024·2025 (PageIndex), OpenAI 2024·2025 (index-free long RAG).
- **Financial Q&A benchmarks**: Islam 2023 (FinanceBench), Chen 2021 (FinQA), Zhu 2021 (TAT-QA), Setty 2024 (Improving RAG retrieval for financial docs), Dadopoulos 2025 (metadata-driven financial RAG), Wang 2025 (FinSage), Michel 2025 (FinCARE).
- **LLM-as-a-judge**: Zheng 2023 (MT-Bench/Chatbot Arena), Gu 2024 (LLM-as-judge survey).
- **Same-author Lumer 연구 series**: MemTool (2025a — agent tool memory), ScaleMCP (2025b — MCP tool sync), Tool-to-Agent Retrieval (2025c), Toolshed (2024) — 모두 agentic RAG / tool retrieval 계보.

## 7. 용어집 (Glossary)

- **MRR (Mean Reciprocal Rank)**: $\frac{1}{|Q|} \sum_i \frac{1}{rank_i}$, 첫 번째 relevant chunk의 평균 reciprocal rank. 1에 가까울수록 좋다.
- **Recall@5**: top-5 결과에 relevant chunk가 포함된 비율.
- **Cross-encoder reranking**: query와 candidate chunk를 **jointly encode**해서 점수를 매기는 방식. Bi-encoder(embedding) 대비 정확하지만 느리다 — 그래서 top-k 후보를 좁힌 뒤 reranker로 재정렬하는 2-stage가 표준.
- **Small-to-big retrieval**: 작은 chunk로 검색 정확도를 유지하면서, LLM에게 줄 때는 인접 chunk를 합쳐 더 넓은 context를 제공하는 전략. Chiang 2024 / Anthropic 2024.
- **Hierarchical node-based RAG (PageIndex 스타일)**: 문서를 TOC tree로 변환하고 LLM이 노드를 traversal해서 relevant page range를 retrieval하는 vectorless 방식. [[vectifyai-pageindex]] 구현 참조.
- **Agentic RAG**: LLM이 retrieval tool을 호출하면서 query reformulation, correction을 동적으로 수행하는 RAG.
- **Hybrid search**: semantic vector search + lexical(BM25) 결합.
- **Contextual retrieval (Anthropic)**: chunk마다 LLM이 생성한 contextual prefix를 붙여 임베딩 정확도를 끌어올리는 기법. 이 논문은 metadata filtering 부분에서 인용.
- **Corrective RAG (CRAG, Yan 2024)**: retrieval 결과의 품질을 평가하고 부정확하면 query rewrite/web search 등으로 보정하는 RAG.
- **LLM-as-a-judge (pairwise)**: 두 시스템의 답변을 LLM이 비교해서 승자를 고르고, 다수의 query에 걸쳐 win rate을 집계하는 평가 방법. Zheng 2023.
- **SEC 10-K / 10-Q / 8-K**: 미국 SEC 공시 양식 — annual report (100–300p) / quarterly report (30–80p) / material events.

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 3 | hierarchical node tree 구조 예시 (JSON) | column-band | ★ wiki (method) |
| fig02 | 4 | small-to-big retrieval — target chunk 인접 확장 | caption-region | ★ wiki (method) |
| tab01 | 5 | hierarchical node tree 생성 preprocessing 비용 (3 모델) | manual | ★ wiki (cost) |
| tab02 | 5 | summary 포함 preprocessing 성능 | table-region | 아카이브 (ablation 세부) |
| tab03 | 5 | summary 미포함 preprocessing 성능 | manual | 아카이브 (ablation 세부) |
| tab04 | 6 | cross-encoder reranking 파라미터별 성능 | table-region | ★ wiki (result) |

> tab03은 자동 검출이 tab02와 동일 영역을 잡아 `--bbox`로 재크롭했다(strategy: manual). tab02·tab03은 preprocessing ablation 세부라 아카이브에만 보존하고, 본문에는 fig01·fig02·tab01·tab04를 임베드한다.
