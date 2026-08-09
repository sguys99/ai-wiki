---
title: "Rethinking Retrieval: From Traditional Retrieval Augmented Generation to Agentic and Non-Vector Reasoning Systems in the Financial Domain for Large Language Models"
type: paper
year: 2025
category: database
raw_path: /home/sguys99/project/ai-wiki/raw/papers/lumer-2025-rethinking-retrieval-from-traditional-retrieval.pdf
raw_filename: "lumer-2025-rethinking-retrieval-from-traditional-retrieval.pdf"
source_collection: external
source: lumer-2025-rethinking-retrieval-from-traditional-retrieval.md
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
    bbox_norm: [0.1137, 0.1529, 0.8657, 0.2746]
    strategy: table-region
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

## 요약 (Summary)

PricewaterhouseCoopers U.S.의 Elias Lumer 외 8인이 1,200 SEC 10-K/10-Q/8-K filing(Fortune 500, 2020–2025) + 150-question 벤치마크에서 **두 가지 RAG architecture를 controlled 비교**하고 **두 가지 enhancement 기법을 추가 평가**한 financial-domain RAG benchmark 논문이다. 핵심 결과:

- **Vector-based agentic RAG가 hierarchical node-based RAG([[vectifyai-pageindex]] 스타일)를 68% win rate**(latency 5.2 vs 5.98s)로 능가. Hierarchical 실패 mechanism은 **table-of-contents 단계의 selection bottleneck**.
- **Cross-encoder reranking $(k_{init}=10, k_{final}=5)$가 MRR@5 0.160 → 0.750(+59%p 절대 향상)** + perfect Recall@5(1.00), latency 2.02s. $k_{init} \geq 50$은 diminishing returns.
- **Small-to-big retrieval가 65% win rate vs baseline + 0.2s latency only + $0 추가 비용**. Async 구현(0.17s)이 sync(0.34s) 대비 2배 빠름.
- **Hierarchical RAG preprocessing cost = $30.62/10-K**(GPT-4o, summary 미포함은 $0.97 — summary 포함 시 6.3× 증가); vector RAG는 이런 1회성 preprocessing overhead가 없다.

논문은 [[vectifyai-pageindex]]의 reasoning-based RAG와 [[geeksforgeeks-2026-vectorless-rag-pageindex]] 튜토리얼이 주장하는 "vectorless가 미래"라는 narrative에 대해 **financial 도메인에서는 vector + 고급 기법이 여전히 우위**임을 controlled 실험으로 보인 first systematic counterexample이다. [[pandey-2026-rag-is-no-longer-just]]가 추상적으로 정렬한 5 design space(Hybrid · Graph · Agentic · Corrective · Multimodal)를 SEC filing 도메인에서 실측한 셈.

## 주요 기여 (Key Contributions)

1. **First systematic comparison of vector vs vectorless RAG on financial documents** — 동일 corpus(1,200 SEC filing) · 동일 질문(150 Q&A: 65 multi-hop · 65 single-hop · 20 summary) · 동일 judge(Claude 4.5 Sonnet 6-criteria pairwise)에서 vector RAG가 68% win rate.
2. **Hierarchical RAG의 mechanism-level failure mode 식별** — TOC 단계 selection bottleneck. Future work: **vector retrieval로 candidate node를 좁힌 뒤 hierarchical traversal**을 적용하는 hybrid.
3. **Cross-encoder reranking parameter sweep(10 configs)** — $(10,5)$ 절대 우승(MRR@5 0.750, Recall@5 1.00, latency 2.02s). Sub-2s 요구 시 $(10, 10)$ 추천(MRR@5 0.625, 1.24s).
4. **Small-to-big retrieval cost-quality 측정** — 65% win rate + $0.000078/query unchanged + async 구현이 sync의 2배 속도.
5. **Hierarchical RAG preprocessing 모델 비교** — GPT-4o 우위(coherence), Gemini 2.5 Flash 최저 비용($5.94/10-K, GPT-4o의 19%)이지만 compatibility 이슈 보고. Summary inclusion ablation: $0.97 → $6.12 (6.3×).
6. **Specialized 50-question subset 3종 + 75-question 비교 subset** — controlled comparison을 위한 evaluation protocol 공개.

## 방법론 및 아키텍처 (Methodology and Architecture)

### Architecture A — Vector-based Agentic RAG (winner)

- 512-token chunk + 50-token overlap, `text-embedding-ada-002`
- Azure AI Search + metadata filtering(year, form type, company 등)
- **Hybrid search** (semantic + lexical/BM25) + corrective RAG(Yan 2024)
- Agentic — LLM(GPT-4o)이 query reformulation, retrieval tool 동적 호출

### Architecture B — Hierarchical Node-Based Reasoning RAG (PageIndex 스타일)

- 문서를 TOC tree로 변환 — 노드 = {title, start_index, end_index, node_id, nested nodes}. [[vectifyai-pageindex]]의 `get_document_structure` 출력과 동일 구조.
- Node tree generator 3종 비교: **GPT-4o**(coherence 최고로 선택) > GPT-4.1 mini > Gemini 2.5 Flash(compatibility 이슈).
- Query time: LLM이 hierarchy를 traversal → relevant node 선택 → 해당 page range를 context로 retrieval. **Embedding 없음**.

![[assets/lumer-2025-rethinking-retrieval-from-traditional-retrieval/fig01.png]]
*Figure 1: hierarchical node tree 구조 예시 — 문서를 title·page range·node_id를 가진 중첩 노드로 표현한 JSON (Lumer 2025, p.3)*

### Enhancement C — Cross-encoder reranking (vector RAG 위에 적용)

- `Cohere rerank-english-v3.0` — query-chunk pair jointly encode.
- Grid: $(k_{init}, k_{final}) \in \{(10,5), (10,10), (20,5), (20,10), (50,5), (50,10), (75,15), (75,25), (100,20), (100,30)\}$.

### Enhancement D — Small-to-big retrieval

- Target chunk + immediate neighbors(±1) augmentation. Sync vs async(인접 chunk 병렬 fetch) 비교.

![[assets/lumer-2025-rethinking-retrieval-from-traditional-retrieval/fig02.png]]
*Figure 2: small-to-big retrieval — vector search로 찾은 target chunk(idx)를 인접 chunk(idx±1, idx±2)로 확장해 LLM에 전달 (Lumer 2025, p.4)*

### Evaluation framework

- **Retrieval**: MRR@5, Recall@5 (ground truth = annotated page numbers).
- **Answer quality**: Claude 4.5 Sonnet pairwise, 6 criteria(accuracy · completeness · clarity · conciseness · relevance · style) → win rate.
- **Latency**: end-to-end query → answer.
- **Cost**: preprocessing + runtime.

## 결과 (Results)

### Vector vs Hierarchical (75Q)

| System | Win rate | Latency | Failures |
|---|---|---|---|
| **Vector agentic RAG** | **68%** | **5.20s** | 0 |
| Hierarchical PageIndex | 32% | 5.98s | 2 unanswered + 2 incorrect |

### Cross-encoder reranking sweep (50Q)

| $(k_{init}, k_{final})$ | MRR@5 | Recall@5 | Latency |
|---|---|---|---|
| Baseline | 0.160 | 0.50 | 0.22s |
| **(10, 5)** ⭐ | **0.750** | 1.00 | 2.02s |
| (10, 10) — fastest | 0.625 | 1.00 | 1.24s |
| (20, 10) | 0.566 | 1.00 | 1.61s |
| (50, 10) | 0.550 | 1.00 | 4.15s |
| (75, 25) | 0.536 | 1.00 | 4.52s |
| (100, 30) | 0.519 | 1.00 | 5.33s |

**모든 reranking 설정이 perfect Recall@5(1.00)** — reranker가 ranking + coverage를 모두 향상. $k_{init} \geq 50$은 diminishing returns.

![[assets/lumer-2025-rethinking-retrieval-from-traditional-retrieval/tab04.png]]
*Table 4: cross-encoder reranking 파라미터별 성능 — 굵게 표시된 (10,5)에서 MRR@5 0.160→0.750(+59%p), Recall@5 1.00, latency 2.02s (Lumer 2025, p.6)*

### Small-to-big retrieval (50Q)

| Variant | Win rate | Extra latency | Per-query cost |
|---|---|---|---|
| Baseline chunking | 35% | 0 | $0.000078 |
| **Small-to-big (async)** | **65%** | +0.17s | $0.000078 (no change) |
| Small-to-big (sync) | — | +0.34s | $0.000078 |

### Preprocessing cost (hierarchical only)

Per company (Table 1):
- GPT-4o: 10-Q $7.21, **10-K $30.62**
- GPT-4.1 mini: 10-Q $4.23, 10-K $22.27
- Gemini 2.5 Flash: 10-Q $0.99, **10-K $5.94 (GPT-4o 대비 19%)**

![[assets/lumer-2025-rethinking-retrieval-from-traditional-retrieval/tab01.png]]
*Table 1: hierarchical node tree 생성 preprocessing 비용 — 한 기업의 10-Q/10-K 기준 세 모델 비교 (Lumer 2025, p.5)*

Per filing summary ablation (GPT-4o, 10-K):
- Without summary: $0.97 (300k tokens, 126s latency)
- With summary: **$6.12 (6.3×)** (667k tokens, 144.6s latency)

## 핵심 인사이트 (Key Insights)

1. **"Vectorless가 미래"는 도메인 의존적**: [[vectifyai-pageindex]]와 [[geeksforgeeks-2026-vectorless-rag-pageindex]] 튜토리얼이 주장하는 vectorless RAG의 우수성은 **broad summarization·table-of-contents 친화적 query**에 한정될 수 있다. 본 논문의 financial 도메인(specific factual retrieval 중심)에서는 vector RAG + 고급 기법이 압도적 우위. [[li-2026-beyond-semantic-similarity-rethinking-retrieval]]가 BrowseComp-Plus에서 DCI 우위를 보인 것과는 결과가 갈리는데, 두 논문의 대상 task가 다르다는 점을 같이 봐야 한다.

2. **TOC selection이 hierarchical RAG의 단일 bottleneck**: TOC level에서 LLM이 relevant section을 고르지 못하면 그 아래 traversal은 무의미. **Vector embedding으로 candidate node를 좁힌 뒤 LLM traversal**을 얹는 hybrid가 자연스러운 다음 step — [[zhang-2026-leanrag-knowledge-graph-based-generation]]의 LCA retrieval(KG의 hierarchical structure + LCA로 candidate path 선정)과 발상은 비슷하지만, 본 논문은 vector를 candidate selector로 쓰자는 더 단순한 hybrid를 제시.

3. **Reranking은 거의 무조건 옳다, 단 $k_{init}$은 작게**: 모든 reranking 설정이 perfect Recall@5를 찍었고, 큰 $k_{init}$(50+)이 작은 $k_{init}$(10)보다 MRR이 *낮았다*. 이는 reranker가 noise를 골라내는 데 강하다는 일반적 가정과 어긋나는 흥미로운 결과로, financial 도메인의 chunk 분포(긴 표·반복적 boilerplate) 특성 때문일 가능성이 있다.

4. **Small-to-big의 거의 무료 점심**: +0.2s + $0 cost로 65% win rate은 production deployment에서 거의 즉시 적용할 수 있는 enhancement. 단, "needle-in-haystack" query(단일 isolated fact)에는 effect가 제한적이라는 caveat가 discussion에 명시.

5. **Cost 측면에서 vector RAG가 hierarchical 대비 ROI 우위**: hierarchical은 10-K당 $30.62(GPT-4o) preprocessing이 있고, summary 포함 시 6.3× 증가. Vector RAG는 1회성 embedding($0.0001/1K token 수준)만 있고 win rate도 높다.

## 관련 페이지 (Related Pages)

- [[database/vectifyai-pageindex]] — 본 논문의 hierarchical RAG 비교 대상이 된 reasoning-based RAG의 reference implementation. Mafin 2.5 FinanceBench 98.7%를 주장하는 PageIndex가 본 논문 setup에서는 vector RAG에 32:68로 밀린 것은 흥미로운 대조 — 두 평가가 다른 benchmark·다른 question style을 쓴다는 점이 핵심.
- [[database/geeksforgeeks-2026-vectorless-rag-pageindex]] — PageIndex의 vectorless RAG 입문 튜토리얼. 본 논문은 그 narrative에 financial 도메인 controlled counterexample을 제공.
- [[database/li-2026-beyond-semantic-similarity-rethinking-retrieval]] — BrowseComp-Plus에서 embedding-free DCI가 vector를 누른 다른 "rethinking retrieval" 논문. 본 논문과 결론 방향은 반대지만, 두 논문 모두 *"vector RAG는 모든 task의 정답이 아니다"* 라는 message를 공유 — task별로 architecture 선택이 갈린다는 design space sentiment([[applications/pandey-2026-rag-is-no-longer-just]])와 정합.
- [[database/guo-2025-lightrag-simple-and-fast]] · [[database/zhang-2026-leanrag-knowledge-graph-based-generation]] — KG-based RAG family. 본 논문이 future work로 제안한 "vector + hierarchical hybrid"의 가까운 친척으로, KG의 entity/relation 그래프 위에 dual-level/LCA retrieval을 적용한 사례.
- [[applications/pandey-2026-rag-is-no-longer-just]] — "RAG는 single pattern이 아니라 design space"라는 mental-model을 제공. 본 논문은 그 5 design space 중 Hybrid(vector+lexical) + Agentic + Corrective + 부가 reranking·small-to-big을 financial 도메인에서 실측 검증한 셈.
- [[evaluations]] — 본 논문의 150-question SEC benchmark + LLM-as-a-judge pairwise protocol은 향후 financial RAG evaluation 페이지가 생기면 leading reference가 될 만하다.
