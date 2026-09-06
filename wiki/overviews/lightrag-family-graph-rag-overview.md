---
title: "Graph-based RAG 계열: GraphRAG 트렁크 (LightRAG, LeanRAG, RAG-Anything)"
type: overview
year: 2026
category: overviews
source_collection: synthesis
sources:
  - edge-2024-from-local-to-global.md
  - dsba-2025-graphrag-paper-review.md
  - guo-2025-lightrag-simple-and-fast.md
  - guo-2025-rag-anything-all-in-one-rag.md
  - hkuds-rag-anything.md
  - 9bow-2026-rag-anything-multimodal-rag-framework.md
  - zhang-2026-leanrag-knowledge-graph-based-generation.md
  - dsba-2026-paper-review-graph-based-rag.md
tags: [graph-rag, knowledge-graph, graphrag, lightrag, leanrag, rag-anything, hkuds, microsoft, hierarchical-retrieval, dual-level-retrieval, community-detection, leiden, multimodal-rag, lca, overview, synthesis]
---

## 요약 (Summary)

**Graph-based RAG의 trunk root는 Microsoft Research의 GraphRAG (Edge et al., 2024, arXiv 2404.16130)** 이다. 본 논문이 정의한 *LLM 기반 entity·relationship·claim 추출 → KG 통합 → Leiden hierarchical community → community report 사전 생성 → map-reduce(partial answer + 0–100 helpfulness score) global answer* 파이프라인이 모든 후속 작업의 공통 조상이 된다. 이 trunk에서 세 갈래의 확장이 나온다:

- **LightRAG**(HKUDS, EMNLP 2025) — community summary 제거 + entity·relation **KV 직렬화** + **dual-level keyword retrieval**로 GraphRAG의 무거운 community 단계를 단순화. 이 분기에서 다시 **RAG-Anything**(HKUDS, arXiv 2510.12323)이 **modality 축**으로 확장.
- **LeanRAG**(Shanghai AI Lab, AAAI-26) — 평면 KG → **hierarchical KG + abstract relation 합성** + **LCA bottom-up retrieval**로 GraphRAG·HiRAG의 community summary detail-loss를 완화.
- **HiRAG · HippoRAG · CausalRAG · HugRAG** 등 외부 line — wiki 외부.

본 overview는 wiki에 실재하는 8개 자료를 합성한다:

| 자료 | 유형 | 위치 |
|---|---|---|
| **GraphRAG (Microsoft, 2024)** — trunk root | paper | [[database/edge-2024-from-local-to-global]] |
| **GraphRAG Paper Review (DSBA 김도윤 2025-08-11)** — trunk root의 한국어 review + 발표자 5가지 비판 | article | [[database/dsba-2025-graphrag-paper-review]] |
| LightRAG (EMNLP 2025) | paper | [[database/guo-2025-lightrag-simple-and-fast]] |
| RAG-Anything (arXiv 2510.12323) | paper | [[database/guo-2025-rag-anything-all-in-one-rag]] |
| HKUDS/RAG-Anything | repo | [[database/hkuds-rag-anything]] |
| RAG-Anything 한국어 소개 (PyTorchKR) | article | [[database/9bow-2026-rag-anything-multimodal-rag-framework]] |
| LeanRAG (AAAI-26) | paper | [[database/zhang-2026-leanrag-knowledge-graph-based-generation]] |
| Graph-based RAG 세미나 2026 (LightRAG · LeanRAG) | video | [[database/dsba-2026-paper-review-graph-based-rag]] |

핵심 메시지 네 줄:
- **공통 시조 GraphRAG (2024)**: LLM이 KG를 합성해 community-level summary로 *query-focused global sensemaking*을 가능케 한 첫 graph-based RAG. ~1M token 코퍼스에서 vector RAG 대비 comprehensiveness·diversity 승률 **72–83%** (p<.001), root-level **C0는 source-text 대비 토큰 9–43× 절감**으로 *sensemaking efficiency-quality* 트레이드오프를 처음 정의.
- **DSBA 김도윤 2025-08-11 review가 미리 진단한 5가지 약점**(KG efficiency · fixed prompt · summary detail-loss · **hybrid 필수** · 본문 외 코드의 DRIFT 등 추가 절차)이 이후 LightRAG·LeanRAG·RAG-Anything 세 갈래로 실제 구현됨.
- **세 축의 확장**: (1) RAG-Anything = **modality** 축, (2) LeanRAG = **abstraction** 축, (3) HKUDS/RAG-Anything repo = **engineering** 축.
- **미해결 모순**: LightRAG와 LeanRAG가 같은 UltraDomain 평가에서 **원문(passage) 첨부 효과**에 정반대 결과(LightRAG: 종종 제거 시 향상 / LeanRAG: 일관 하락). retrieval 정밀도에 따라 원문의 역할이 noise냐 evidence냐가 갈리는 것으로 해석되나 통합 framework는 부재.

## 1. 가족 구성과 계보 (Family Tree)

```
   ┌──────────────────────────────────────────┐
   │  GraphRAG (Microsoft, 2024)              │ ◄── TRUNK ROOT
   │  - LLM entity/relation/claim extraction  │     [[database/edge-2024-from-local-to-global]]
   │  - Leiden hierarchical community         │     [[database/dsba-2025-graphrag-paper-review]]
   │  - Bottom-up community summary           │
   │  - Map-reduce global answer + helpfulness│
   │  - C0: source-text 대비 9–43× 토큰 절감  │
   └──────────────────────────────────────────┘
            │
            │  DSBA 2025-08-11 review가 미리 진단한 5가지 약점:
            │   ① KG 효율 / ② fixed prompt / ③ summary detail-loss
            │   ④ "hybrid scheme 필수 불가결" / ⑤ DRIFT 등 코드 추가 절차
            │
            ├─────────────────────────┬──────────────────────────┐
            ▼                         ▼                          ▼
   ┌──────────────────┐   ┌──────────────────┐    (외부 line: HiRAG, HippoRAG,
   │  LightRAG        │   │  LeanRAG         │     CausalRAG, HugRAG, MMGraphRAG …
   │  (HKUDS, EMNLP25)│   │  (Shanghai AI    │     — wiki 미보유)
   │  community 제거 +│   │   Lab, AAAI-26)  │
   │  KV 직렬화 +     │   │  hierarchical KG │
   │  dual-level kw   │   │  + abstract rel  │
   │  retrieval       │   │  + LCA retrieval │
   └──────────────────┘   └──────────────────┘
        │
        │ modality 축
        ▼
   ┌──────────────────┐
   │  RAG-Anything    │
   │  (HKUDS, arXiv   │
   │   2510.12323)    │
   │  text-KG ⊕       │
   │  cross-modal KG  │
   │  + VLM dereference│
   └──────────────────┘
        │
        │ engineering 축
        ▼
   HKUDS/RAG-Anything (repo, MIT, PyPI `raganything`)
   + 9bow 한국어 소개글 (PyTorchKR Discuss)
   + DSBA 2026 세미나 (LightRAG · LeanRAG 비교)
```

> **출처 위치**: GraphRAG의 파이프라인은 [[database/edge-2024-from-local-to-global]] 3절. DSBA 2025 review의 5가지 비판은 [[database/dsba-2025-graphrag-paper-review]] §5. LightRAG의 KV·dual-level은 [[database/guo-2025-lightrag-simple-and-fast]] §3.2–3.3. RAG-Anything의 dual-graph는 [[database/guo-2025-rag-anything-all-in-one-rag]] §3.2. LeanRAG의 aggregated relation은 [[database/zhang-2026-leanrag-knowledge-graph-based-generation]] §3.2. 운영·코드 구조는 [[database/hkuds-rag-anything]].

## 2. GraphRAG (Trunk Root) — 본 계열이 무엇을 물려받는가

[[database/edge-2024-from-local-to-global|Edge et al. 2024]]가 정의한 패러다임 요약:

**Indexing**:
1. **Text chunks** (600 token + 100-overlap). chunk size ↑ ⇒ LLM 호출↓ but entity 추출↓ → **self-reflection** `LOOP_PROMPT` (Y/N) + `CONTINUE_PROMPT` ("MANY entities were missed...")으로 large chunk + 추출 누락 보완.
2. **Entity/Relationship/Claim 추출** — multipart prompt + few-shot. claim은 subject·object·type·status(TRUE/FALSE/SUSPECTED)·date·source 8필드.
3. **KG 통합** — exact string match, description은 LLM이 concatenate-summarize, **relationship 등장 횟수 → edge weight**.
4. **Leiden hierarchical community** (graspologic). 각 level이 mutually exclusive·collectively exhaustive — divide-and-conquer가 가능한 partition.
5. **Community summary** — TITLE/SUMMARY/IMPACT SEVERITY RATING(0–10)/RATING EXPLANATION/DETAILED FINDINGS(5–10). leaf: edge degree 정렬, higher: token 초과 시 큰 sub-community를 더 짧은 sub-summary로 치환.

**Query**: community summary random shuffle + chunk → 각 chunk → partial answer + helpfulness score(0–100), score 0 필터 → score 내림차순 누적 → global answer 1개.

**평가 프레임**:
- **Adaptive benchmarking**: corpus description으로부터 LLM이 K=N=M=5 (persona, task, question) 자동 생성 → 데이터셋당 125 문항.
- **LLM-as-judge**: comprehensiveness · diversity · empowerment + directness(control). 5회 replicate.
- **Claim-based 검증 (Experiment 2)**: Claimify(Metropolitansky & Larson 2025)로 47,075 unique claim 추출 → 평균 claim 수·1-ROUGE-L 거리 agglomerative clustering 군집 수 → LLM judge와 78%/69–70% alignment.

**핵심 정량**:
- Podcast: 8,564 nodes / 20,691 edges, News: 15,754 / 19,520.
- C0(root) = Podcast 26,657 토큰(2.6%) · News 39,770(2.3%) → source-text 대비 **38–43× 절감**.
- Vector RAG(SS) 대비 comprehensiveness 72–83% (p<.001), diversity 62–82% (p<.001~.01).
- Community summary vs source text: intermediate C2(Podcast) 57%, low C3(News) 64% (모두 p<.001).
- Context window ablation: **8k가 평균 58.1% 승** (lost-in-the-middle 회피).

**운영 비용**: GPT-4-turbo @ 2M TPM·10k RPM, Podcast(1M token) indexing **281분**, Intel Xeon Platinum 8171M + 16GB RAM.

**OSS**: `microsoft/graphrag` (MIT) + LangChain · LlamaIndex · NebulaGraph · Neo4J 통합.

## 3. DSBA 2025-08-11 Review — Trunk가 진단한 5가지 약점 (후속 작업의 청사진)

[[database/dsba-2025-graphrag-paper-review|DSBA 김도윤 박사과정의 2025-08-11 paper review slide]] §42 conclusion에서 명시된 5가지 비판/제언이, 본 wiki에 있는 모든 후속 작업의 *왜 그렇게 진화했는가*를 설명한다:

| # | 비판/제언 (2025-08-11) | 본 계열에서의 실현 (2025–2026) |
|---|---|---|
| 1 | *"KG가 본문 대비 얼마나 효율적으로 정보 반영하느냐가 핵심"* | LightRAG의 KV 직렬화는 community summary 대비 토큰을 더 줄임 |
| 2 | *"고정된 prompt로 KG 구축 → 사용자 목적에 맞춘 KG 구축이 GraphRAG 성능 좌우"* | RAG-Anything의 ModalProcessor 추상화로 도메인별 modality 처리 확장 |
| 3 | *"community summary 활용 → detail loss 불가피"* | LeanRAG의 hierarchical KG + abstract relation으로 detail-loss 완화 |
| 4 | **"Hybrid scheme(임베딩 활용) 필수 불가결, query 임베딩 유사도로 community summary 취사선택했으면 어땠을지"** | LightRAG의 dual-level keyword retrieval = entity embedding 기반 hybrid 검색; LeanRAG의 base-layer anchor도 embedding hybrid |
| 5 | **"본문보다 코드에 더 많은 절차 — DRIFT(Dynamic Reasoning and Inference with Flexible Traversal) 등"** | DSBA 2026 세미나에서 동일 발표자가 LightRAG·LeanRAG 본문 vs 코드 간극을 다시 지적 ([[database/dsba-2026-paper-review-graph-based-rag]] §방법론) |

→ **trunk의 5가지 진단이 그대로 후속 분기의 설계 동기**가 된다. 본 overview의 가치는 이 인과 관계를 명시한다는 점.

## 4. 공통 디자인 가정 (Shared Assumptions)

GraphRAG와 그 후속 4개 논문이 공유하는 가정:

1. **LLM-extracted KG**: 외부 고정 KG가 아니라, LLM 프롬프트로 코퍼스에서 entity·relation을 추출. → 외부 fixed KG 환경에서의 적용은 모두 미검증 (DSBA 2026 세미나의 open question, 본 overview §7.5).
2. **Open-ended 평가 패러다임**: GraphRAG가 정립한 *adaptive benchmarking + LLM-as-judge + comprehensiveness/diversity/empowerment/directness* 프레임이 후속 작업의 표준. LightRAG·LeanRAG는 UltraDomain(Qian et al., 2024) 위에서 동일 프레임 재사용. RAG-Anything만 DocBench/MMLongBench accuracy로 전환.
3. **검색은 dense + structural의 hybrid**: GraphRAG는 community summary로 structural, LightRAG는 KV + keyword, LeanRAG는 LCA + base entity. 모두 단일 vector search만으로 부족하다는 가정.
4. **Sensemaking 타겟**: 단순 fact retrieval이 아니라 corpus 전체를 종합해야 답할 수 있는 query (Klein et al., 2006). 의학·법률·산업 트렌드 분석 같은 다중 주제 통합이 핵심 use case.

## 5. 세 축의 확장 (Three Axes of Extension)

### Axis A — Modality (RAG-Anything)

- **무엇이 달라지는가**: 텍스트 외에 이미지·표·수식까지 atomic unit으로 normalize. 비텍스트 unit `c_j`마다 VLM이 검색용 description `d_chunk_j` + 그래프용 entity summary `e_entity_j` 생성 → anchor node `v_mm_j` + `belongs_to` 엣지.
- **왜 dual-graph인가**: 단일 거대 그래프 대신 cross-modal KG와 text-based KG를 별도 구축한 뒤 entity name으로 alignment. modality-specific grounding 보존이 목적.
- **합성 단계의 dereferencing**: 검색용 텍스트 프록시는 검색에만 사용하고, 합성 시 원본 시각을 base64로 복원해 VLM에 함께 입력 → 텍스트 압축으로 검색 효율 + 원본 시각으로 reasoning 충실도.
- **운영 측면 (repo)**: MinerU·Docling·PaddleOCR pluggable parser → 같은 `content_list` 표현으로 정규화. `BaseModalProcessor` 상속으로 modality 확장 가능. 3-mode 통합 질의 API(`aquery` / `aquery_with_multimodal` / `aquery_vlm_enhanced`).

### Axis B — Abstraction (LeanRAG)

- **두 문제 정식화**: (1) **Semantic Islands** — HiRAG/Raptor가 abstract 노드는 만들지만 노드 간 relation이 없어 cross-community 추론 불가. (2) **Structure-Retrieval Mismatch** — 검색이 hierarchical 인덱스를 무시하고 평면 유사도 검색으로 퇴화.
- **Aggregated Relation 생성** (핵심 차별점): 두 abstract entity $(\alpha_j, \alpha_k)$ 사이 connectivity strength $\lambda_{j,k}$(= base-layer inter-cluster relation 개수)가 threshold $\tau$ 초과 시 LLM 합성, 이하 시 단순 concatenation. → fully navigable semantic network.
- **LCA bottom-up retrieval**: 쿼리는 base-layer entity에만 anchor → seed들의 Lowest Common Ancestor 경로(shortest-path union)만 추출. 평면 KG에서 seed 간 모든 경로를 찾는 폭증을 피하고 의미 중복 최소화.
- **GMM-BIC**: 클러스터 수 $m$은 BIC로 자동 결정 (발표 슬라이드 출처; 본문에는 명시 부재). 최대 레이어 $K = \lceil \log_2 N \rceil + 1$.
- **Trunk와의 연속**: GraphRAG의 community detection(Leiden, 평면) → HiRAG의 hierarchical cluster(abstract relation 부재) → LeanRAG의 hierarchical + abstract relation. **DSBA 2025 review §5의 제언 #3·#4를 정확히 구현**.

### Axis C — Engineering (HKUDS/RAG-Anything repo + 9bow 글)

- **Reference implementation**: `reproduce/index.py` / `query.py` / `llm_answer_evaluator.py`로 paper 결과 재현. PyPI 한 줄 설치(`pip install raganything`).
- **운영 부속**: `resilience.py` (retry·CircuitBreaker), `callbacks.py` (MetricsCallback), `batch.py` (max_workers), `asset_urls.py` (CDN/S3 URL), `omml_extractor.py` (OOXML 수식), 다국어 프롬프트 — 논문에는 없는 production gap을 메운다.
- **확장 패턴**: `register_parser()`로 커스텀 파서, `BaseModalProcessor` 상속으로 modality 확장. 백본도 vLLM·Ollama·LM Studio·Minimax 예제 제공.
- **한국어 진입점**: 9bow(박정환)의 PyTorchKR 글이 도전 과제 → 핵심 기여 → 파이프라인 → 결과 → 설치까지 입문 압축. 단, GPT 정리본 디스클레이머가 붙어 있어 정밀 인용은 paper 페이지 우선.
- **Microsoft 본가 OSS**: GraphRAG 원논문의 `microsoft/graphrag`도 LangChain/LlamaIndex/NebulaGraph/Neo4J 통합. **Materials (DSBA 2025 review slide 40)**: microsoft.github.io/graphrag · wikidocs.net/book/16760 (Neo4j 기반 한국어 위키독스) · neo4j.com/essential-graphrag (Neo4j 무료 textbook).

## 6. 비교 매트릭스 (Comparison Matrix)

| 차원 | **GraphRAG** | LightRAG | RAG-Anything | LeanRAG |
|---|---|---|---|---|
| **저자 lab** | Microsoft Research | HKUDS | HKUDS | Shanghai AI Lab + 협력 |
| **출간** | arXiv 2024-04 (v2 2025-02) | EMNLP 2025 Findings | arXiv 2510.12323 (2025-10) | AAAI-26 |
| **KG 구조** | 평면 KG + **Leiden hierarchical community** | 평면 KG, **KV 직렬화** | text KG ⊕ cross-modal KG (dual) | hierarchical KG (multi-layer + abstract relation) |
| **인덱스 단위** | entity + edge + community summary (4 level) | entity·relation KV 쌍 | atomic unit (text/image/table/equation) | base entity + aggregated entity + aggregated relation |
| **Retrieval 패러다임** | **community summary map-reduce + helpfulness score** | dual-level keyword (low·high) | structural navigation + semantic matching + modality fusion | base-layer anchor + LCA bottom-up |
| **원문 chunk 사용** | community summary가 본문 대체 (C0–C3) / TS만 source-text 직접 | 검색된 entity 출처 chunk 일부 첨부 | dereferenced visual + textual context | base entity 출처 chunk 첨부 (필수) |
| **백본 (논문 셋업)** | **GPT-4-turbo** | GPT-4o-mini + BGE-M3 / text-embedding-3-large (혼재) | GPT-4o-mini + text-embedding-3-large + bge-reranker-v2-m3 | DeepSeek-V3 + BGE-M3 (RQ2는 Qwen3-14B) |
| **평가 데이터셋** | **Podcast(1M) + News(1.7M) — 자체 합성 125문항 × 2** | UltraDomain Mix/CS/Legal/Agriculture | DocBench (229 문서, 평균 66페이지) + MMLongBench (135 문서) | UltraDomain Mix/CS/Legal/Agriculture |
| **평가 방식** | **head-to-head 페어와이즈 (4 criterion + Claimify 검증)** | 페어와이즈 win rate (4 metric) | accuracy % (정답 기반) | 1–10 평균 (5회 채점) |
| **핵심 ablation** | **Context window 8k가 평균 58.1% 승**, Self-reflection iter | -High 가장 큰 하락 / -Origin은 **종종 향상** | Chunk-only 60.0 → Full 63.4 (+그래프), w/o Reranker 62.4 (+1.0 marginal) | -Relation은 Diversity 최대 하락 / -Context는 **모두 하락** |
| **증분 갱신** | 본문 명시 부재 (community 재계산 비용 큼) | union 연산 (O(extract)) | 동일 (LightRAG 위) + atomic-unit별 VLM 비용 추가 | 본문 미언급, hierarchy 재구축 비용 모름 |
| **외부 의존** | graspologic (Leiden), networkx + pandas | lightrag-hku | lightrag-hku + MinerU/Docling/PaddleOCR + LibreOffice | 미공개 (KnowledgeXLab/LeanRAG 저장소 존재) |
| **라이선스(공개)** | **MIT (microsoft/graphrag)** | MIT (HKUDS/LightRAG) | MIT (HKUDS/RAG-Anything) | 본문 명시 없음 (repo 확인 필요) |
| **DRIFT/추가 search 모드** | **공식 코드에 DRIFT/local/global search 존재** (논문 본문 외) | dual-level keyword 단일 | 3-mode 통합 질의 API | LCA 단일 |

## 7. 주요 결과 종합 (Key Results Synthesis)

### GraphRAG 원논문 (Podcast + News, 자체 합성 125문항)

| Metric | SS vs Graph 조건 | p-value |
|---|---|---|
| Comprehensiveness (Podcast) | **SS 17–28%** (graph 72–83% 승) | < .001 |
| Diversity (Podcast) | **SS 18–25%** | < .001 |
| Comprehensiveness (News) | **SS 20–28%** | < .001 |
| Diversity (News) | **SS 29–38%** | < .01 |
| Empowerment | mixed (SS 약간 우위 — 인용·예시 강점) | — |
| Directness (control) | **SS 우위** (의도된 결과) | — |

**Token efficiency**:
- Podcast C0: 26,657 토큰(max의 **2.6%**) — TS 1,014,611 대비 **38× 절감**, 그러면서 SS 대비 comprehensiveness 72%, diversity 62% 승.
- News C0: 39,770(2.3%) — TS 1,707,694 대비 **43× 절감**.

**Experiment 2 (Claimify)**: 47,075 unique claim. 모든 graph 조건이 SS 대비 p<.05 우위 (News C0 34.18 vs SS 25.23, Podcast C2 32.46 vs SS 26.50). LLM judge와 78%(comp)·69–70%(div) alignment.

### UltraDomain (LightRAG vs LeanRAG — 같은 데이터셋, 다른 judge)

LightRAG는 페어와이즈(LLM-as-judge: GPT-4o-mini), LeanRAG는 1–10 평균(LLM-as-judge: DeepSeek-V3). **직접 비교는 불가**하지만, LeanRAG 논문의 Table 1에서 LightRAG는 baseline으로 함께 측정됨:

| Dataset (Overall, 1–10, DeepSeek-V3 judge) | LeanRAG | HiRAG | **GraphRAG** | LightRAG | NaiveRAG |
|---|---|---|---|---|---|
| Mix | **8.59** | 8.08 | 7.87 | 7.61 | 7.47 |
| CS | **8.82** | 8.77 | 8.37 | 8.59 | 8.77 |
| Legal | **8.49** | 8.00 | 8.44 | 7.74 | 8.21 |
| Agriculture | **8.87** | 8.87 | 8.85 | 8.56 | 8.69 |

- LeanRAG가 모든 도메인에서 1위(또는 tie). Diversity 격차 최대.
- LightRAG는 LeanRAG 셋업에서 NaiveRAG·GraphRAG·HiRAG보다 종종 낮게 평가 — DSBA 2026 세미나 발표자는 "정밀 hierarchical 검색이 도입된 환경에서는 LightRAG의 평면 KV가 상대적으로 밀린다"고 해석.
- **그러나** LightRAG 자체 페어와이즈에서는 GraphRAG·NaiveRAG·HyDE·RQ-RAG 모두 대비 일관 우세 (Mix만 GraphRAG 미세 열세). → **judge·평가 방식의 영향이 결과를 좌우**.
- **주의**: 위 LeanRAG 셋업의 GraphRAG는 [[database/edge-2024-from-local-to-global|Edge et al. 2024]] 원본을 DeepSeek-V3 judge 환경에서 재측정한 결과. **원논문 셋업(Podcast/News + GPT-4 judge)에서의 GraphRAG 절대 성능과는 다른 수치**.

### DocBench / MMLongBench (RAG-Anything의 비교)

| Method | DocBench Overall | DocBench Mm. | MMLongBench Overall |
|---|---|---|---|
| GPT-4o-mini | 51.2% | 43.8% | 33.5% |
| LightRAG | 58.4% | 59.7% | 38.9% |
| MMGraphRAG | 61.0% | 66.0% | 37.7% |
| **RAG-Anything** | **63.4%** | **76.3%** | **42.8%** |

- 비텍스트 modality(Mm.) 격차가 가장 큼 — dual-graph의 본질적 기여.
- **장문 격차 확대**: 101–200p에서 68.2% vs MMGraphRAG 54.6%, 200+p에서 68.8% vs 55.0% → **13점+**. dual-graph의 entity 정렬이 페이지 간 multimodal evidence를 묶는다는 가설을 지지.

### Ablation 정렬 (그래프 vs 원문 vs 리랭커 vs context window)

| 논문 | 그래프 제거 | 리랭커 제거 | 원문(passage) 제거 | Context window |
|---|---|---|---|---|
| **GraphRAG** | (해당 안 됨 — graph가 본질) | — | (C0–C3 자체가 summary, TS=source-text는 별 조건) | **8k가 평균 58.1% 승** vs 16/32/64k |
| LightRAG | 측정 안 함 | — | **Agriculture·Mix에서 종종 향상** (원문 noise 가설) | — |
| RAG-Anything | DocBench 60.0 (–3.4pp) | 62.4 (–1.0pp) | 측정 안 함 | — |
| LeanRAG | — | — | **모든 도메인 일관 하락** (Mix Overall 8.59 → 7.93) | — |

→ 그래프 자체의 가치는 RAG-Anything이 직접 입증(+3.4pp), 원문의 역할은 LightRAG·LeanRAG가 정반대 결론. **context window 효과는 GraphRAG만 ablation**.

## 8. 미해결 모순과 Open Questions

DSBA 2026 세미나가 정리한 미해결 지점 + GraphRAG 원논문·DSBA 2025 review가 명시한 추가 지점:

### 8.1 -Origin 모순 (LightRAG vs LeanRAG)

| | LightRAG ablation (-Origin) | LeanRAG ablation (w/o Context) |
|---|---|---|
| Agriculture | NaiveRAG 대비 **승률 향상** | Overall 8.87 → 8.53 (**하락**) |
| Mix | NaiveRAG 대비 **승률 향상** | Overall 8.59 → 7.93 (**하락**) |
| 해석 (LightRAG 저자) | 원문은 noise 포함, KG가 이미 충분 | (해당 안 됨) |
| 해석 (LeanRAG 저자) | (해당 안 됨) | graph = index/navigation, 원문 = rich content — 두 정보 협업이 필수 |

화해 가설: **retrieval 정밀도가 다르면 원문의 역할이 noise냐 evidence냐가 갈린다**. LightRAG의 평면 dual-level keyword는 검색이 거칠어 원문이 노이즈를 더하고, LeanRAG의 LCA bottom-up은 정밀해서 원문이 evidence를 보강한다 — 하지만 이 가설을 체계적으로 검증한 framework는 wiki 내 부재. **Open question #1**.

### 8.2 Mix 데이터셋 — community summary의 잔존 가치

LightRAG는 4 데이터셋 중 **Mix만 GraphRAG 대비 미세 열세**(승률 49.6%). 해석: 다도메인 융합 질의에는 GraphRAG의 community summary가 여전히 유리. LeanRAG가 같은 Mix에서 SOTA를 달성한 사실은 hierarchical abstract relation이 community summary의 대안이 될 수 있음을 시사 — 다만 직접적인 community detection vs hierarchical clustering 비교는 어느 논문도 수행 안 함. **Open question #2**.

### 8.3 LCA 깊이와 효율성

LeanRAG의 LCA가 실제로 어느 깊이까지 올라가는지 정성 분석이 없다(DSBA 2026 세미나 발표자 비판). 만약 자주 root까지 올라간다면 LCA 효과가 약화 → hierarchy 사용 의의가 흔들린다. 또한 LCA 탐색의 latency 측정도 본문 부재. **Open question #3**.

### 8.4 인덱싱 비용 (특히 RAG-Anything)

LightRAG는 chunk별 LLM 1회로 끝나지만, RAG-Anything은 atomic unit별 VLM 호출이 누적 → indexing latency·비용이 크게 증가. paper는 latency 비교를 명시적으로 제공하지 않고, repo `docs/multimodal_rag_failure_modes.md`가 운영 함정만 안내. 정량 분석 부재가 **production 도입의 실질 장벽**. GraphRAG 자체도 Podcast 1M token에 281분(GPT-4-turbo). **Open question #4**.

### 8.5 고정 KG / Non-KG 그래프

네 논문 모두 "LLM이 코퍼스에서 KG 추출" 전제. 외부 fixed KG(원문 부재) 또는 인용 그래프·소셜 그래프 등 non-KG 일반 그래프에서 같은 retrieval이 동작하는지 미검증. **Open question #5** (DSBA 2026 세미나 결론에서 명시).

### 8.6 GraphRAG 본문 vs 코드의 간극 (DSBA 2025 §5 #5)

GraphRAG 본문은 *community summary + map-reduce* 단일 query 모드만 다루지만, `microsoft/graphrag` 공식 코드에는 **DRIFT (Dynamic Reasoning and Inference with Flexible Traversal)** · local search · global search 등 다중 모드가 존재. 본 wiki 내 어떤 자료도 DRIFT를 ingest하지 않았다 — 본문이 명시한 paradigm과 실제 production system 사이의 격차가 wiki에서 미해결. **Open question #6** (DSBA 2025 review가 처음 명시).

### 8.7 GraphRAG 평가 일반화 (Edge 2024 §6.1)

GraphRAG는 2개 corpus(Podcast 1M + News 1.7M)에서만 검증. **fabrication rate**(SelfCheckGPT 등)는 미측정. 후속 LightRAG·LeanRAG·RAG-Anything 어느 곳도 fabrication 평가를 수행하지 않음 → 본 계열 전체에 공통된 evaluation gap. **Open question #7**.

## 9. 운영 선택 가이드 (When to Use Which)

본 wiki의 자료 기반 추천 — 본격 도입 전 paper의 한계 섹션을 반드시 확인할 것.

| 상황 | 추천 | 근거 |
|---|---|---|
| **Sensemaking 평가가 본격 필요**(persona × task × question, head-to-head 평가) | **GraphRAG (원본)** | adaptive benchmarking + LLM-as-judge + Claimify 검증 프레임이 가장 풍부 |
| **Production OSS + 다중 search 모드** (DRIFT, local, global) | **microsoft/graphrag** | LangChain/LlamaIndex/NebulaGraph/Neo4J 통합. Neo4j essential-graphrag textbook + 한국어 위키독스 |
| 텍스트 중심 일반 QA, 빠른 prototype | **LightRAG** | dual-level keyword 단순, indexing 비용 낮음, community summary 제거로 더 빠름, MIT |
| 다중 주제 융합·법률 판례·도메인 트렌드 분석 | **LeanRAG** | hierarchical + abstract relation이 cross-community 정보를 묶음 (Diversity 우위) |
| **이미지·표·수식 포함 복합 문서** (논문·재무 보고서·정부 보고서) | **RAG-Anything** | dual-graph가 비텍스트 evidence를 보존, dereferencing으로 VLM에 직접 시각 입력 |
| **100+ 페이지 장문 multimodal 문서** | **RAG-Anything** | DocBench 100+p에서 MMGraphRAG 대비 13점+ |
| **Sensemaking on private corpus** (e.g., 학계 논문 collection 종합) | **GraphRAG** | C0 root-level summary가 토큰 9–43× 절감 + 우위, iterative sensemaking에 최적 |
| Production OSS 도입 (Korean tutorial 필요) | **HKUDS/RAG-Anything repo** + [[database/9bow-2026-rag-anything-multimodal-rag-framework|9bow 한국어 글]] | resilience·callbacks·batch 등 운영 기능 + 한국어 진입 자료 |
| 외부 fixed KG 사용 (LLM 추출 X) | **네 방법 모두 미검증** — 채택 시 추가 검증 필요 | DSBA 2026 세미나 open question #5 |
| 인덱싱 latency가 critical | **LightRAG > GraphRAG > LeanRAG > RAG-Anything** | GraphRAG는 community detection + 4-level summary로 비용↑, RAG-Anything은 atomic-unit별 VLM, LeanRAG는 hierarchy 재구축 비용 미명시 |
| 페어와이즈 평가 환경 | GraphRAG / LightRAG 모두 강점 | 본 평가 frame 정립 = GraphRAG |
| 1–10 평균 / DeepSeek-V3 judge 환경 | LeanRAG가 SOTA | LeanRAG RQ1 |

## 10. 외부 위치 (External Positioning)

DSBA 2026 세미나([[database/dsba-2026-paper-review-graph-based-rag]])가 정리한 graph-based RAG 전체 흐름 (본 overview의 트렁크 + 외부 line):

```
GraphRAG (MS, 2024) ◄── 본 overview의 TRUNK ROOT (ingest됨)
  ├── HippoRAG: entity PageRank + passage  (wiki 미보유)
  ├── HiRAG (2025): hierarchical clusters, abstract relation 부재  (wiki 미보유)
  ├── HugRAG, CausalRAG  (wiki 미보유)
  ├── MMGraphRAG: multimodal baseline  (RAG-Anything의 비교 대상; wiki 미보유)
  ├── LightRAG (HKUDS, EMNLP 2025)  ◄── 본 계열 메인 trunk
  │     └── RAG-Anything (HKUDS, arXiv 2510.12323)   ← modality 축
  └── LeanRAG (Shanghai AI Lab, AAAI-26)             ← abstraction 축
        └── (HiRAG의 후속 보완 작업)
```

vanilla RAG vs graph-based RAG의 적합 영역(세미나의 분류):
- **vanilla**: 빠른 단순 QA (고객 지원, 제품 설명서)
- **graph-based**: 다중 주제 통합이 필요한 도메인 (의학·신약, 법률 판례, 산업 트렌드 분석)

## 11. 참조 위치 가이드 (Where to Look)

| 질문 | 1차 출처 (wiki 내) |
|---|---|
| GraphRAG 파이프라인 6단계 정확한 정의 | [[database/edge-2024-from-local-to-global]] §3 |
| Self-Reflection의 LOOP/CONTINUE prompt verbatim | [[database/dsba-2025-graphrag-paper-review]] slide 20 |
| Leiden vs Louvain 차이 (disconnected community 시각화 포함) | [[database/dsba-2025-graphrag-paper-review]] slide 10–12 |
| Community summary 예시 JSON 출력 (Verdant Oasis Plaza) | [[database/dsba-2025-graphrag-paper-review]] slide 23 |
| Map-reduce query 흐름 (Level 1 hierarchical 포함) | [[database/dsba-2025-graphrag-paper-review]] slide 24–25 |
| Comprehensiveness/Diversity/Empowerment 정의 + Directness control | [[database/edge-2024-from-local-to-global]] §3.3 |
| Claimify 47,075 unique claim의 alignment 78%/69–70% | [[database/edge-2024-from-local-to-global]] §5.2 |
| Context window 8k 평균 58.1% 승 ablation | [[database/edge-2024-from-local-to-global]] Appendix C |
| GraphRAG의 5가지 약점 진단 (DSBA 2025) | [[database/dsba-2025-graphrag-paper-review]] §5 |
| DRIFT 등 microsoft/graphrag 본문 외 모드의 cue | [[database/dsba-2025-graphrag-paper-review]] slide 42 |
| LightRAG의 KV 인덱스 정확한 정의 | [[database/guo-2025-lightrag-simple-and-fast]] §3.2 |
| Dual-level keyword 매칭 대상 (논문 vs 코드 간극) | [[database/guo-2025-lightrag-simple-and-fast]] §3.3 + [[database/dsba-2026-paper-review-graph-based-rag]] |
| RAG-Anything의 dual-graph 수식 | [[database/guo-2025-rag-anything-all-in-one-rag]] §3.2 |
| Modality-aware retrieval signal 결합 방식 | [[database/guo-2025-rag-anything-all-in-one-rag]] §3.3 |
| `aquery_vlm_enhanced` 내부 동작 (base64 dereference) | [[database/hkuds-rag-anything]] §3 + repo `raganything/query.py` |
| MinerU / Docling / PaddleOCR 비교 | [[database/hkuds-rag-anything]] §3 |
| LeanRAG의 connectivity strength $\lambda_{j,k}$와 threshold $\tau$ | [[database/zhang-2026-leanrag-knowledge-graph-based-generation]] §3.2 |
| LCA path 정의 | [[database/zhang-2026-leanrag-knowledge-graph-based-generation]] §3.3 |
| RAG-Anything DocBench 카테고리별 점수 | [[database/guo-2025-rag-anything-all-in-one-rag]] §4.2 |
| LeanRAG ablation 페어와이즈 표 | [[database/zhang-2026-leanrag-knowledge-graph-based-generation]] §4.4 |
| Graph-based RAG 평가 패러다임 (open-ended QA) | [[database/dsba-2026-paper-review-graph-based-rag]] §방법론 |

## 12. 본 overview의 한계 (Caveats of This Synthesis)

- **2차 합성 자료**: 모든 수치는 wiki 내 8개 페이지에서 가져왔고, 각 페이지가 이미 원본의 2차 정리. 정밀 인용 시 원 논문(`raw/papers/`, `raw/articles/`) 및 repo 확인 필요.
- **비대칭 비교**: GraphRAG는 Podcast/News + GPT-4 judge, LightRAG·LeanRAG는 UltraDomain + GPT-4o-mini/DeepSeek-V3 judge, RAG-Anything은 DocBench/MMLongBench accuracy → 네 방법의 head-to-head 정량 비교는 wiki에 부재. LeanRAG 셋업에서 GraphRAG를 baseline으로 측정한 수치만 있음 (§7 두 번째 표).
- **LightRAG vs LeanRAG의 결과 차이**가 judge LLM(GPT-4o-mini vs DeepSeek-V3) 영향인지, 평가 방식(페어와이즈 vs 1–10) 영향인지, retrieval 본질 차이인지 — 본 wiki 자료만으로는 분리 불가.
- **DRIFT 등 GraphRAG 본문 외 모드**: DSBA 2025 review §5의 명시적 cue 외 wiki에 정보 없음. microsoft/graphrag 공식 문서·코드를 직접 ingest해야 보강 가능.
- **LeanRAG repo 운영 정보 부재**: KnowledgeXLab/LeanRAG는 wiki에 ingest되어 있지 않아, code-level 비교(LightRAG/RAG-Anything 대비)는 추후 추가 시 합성 가능.
- **HiRAG·HippoRAG·MMGraphRAG**가 본 wiki에 ingest되지 않아 baseline 측 디테일은 paper의 인용 범위로 제한.
- **DSBA 2025 vs 2026 발표자가 동일인**: 두 자료는 같은 연구자(김도윤)의 시간 순차 review이므로, "발표자 의견"의 일관성/변화는 양 자료 cross-reading으로 확인. 독립적 외부 view는 부재.

## 관련 페이지 (Related Pages)

### Trunk Root (GraphRAG)
- [[database/edge-2024-from-local-to-global|GraphRAG: From Local to Global (Edge et al., 2024)]] — Microsoft Research 원논문. 본 계열의 공통 시조.
- [[database/dsba-2025-graphrag-paper-review|GraphRAG Paper Review (DSBA 김도윤 2025-08-11)]] — trunk root의 한국어 review + 발표자의 5가지 비판/제언이 후속 작업의 청사진.

### Trunk Branch (LightRAG, HKUDS lineage)
- [[database/guo-2025-lightrag-simple-and-fast|LightRAG (EMNLP 2025)]] — KV 직렬화 + dual-level keyword. 본 계열의 메인 sub-trunk.

### Modality 축 (LightRAG → RAG-Anything)
- [[database/guo-2025-rag-anything-all-in-one-rag|RAG-Anything (arXiv 2510.12323)]] — dual-graph + cross-modal hybrid retrieval.
- [[database/hkuds-rag-anything|HKUDS/RAG-Anything (repo)]] — 위 논문의 reference implementation (MIT, PyPI `raganything`).
- [[database/9bow-2026-rag-anything-multimodal-rag-framework|RAG-Anything 한국어 소개글]] — PyTorchKR 9bow 작성, 입문 진입점.

### Abstraction 축 (GraphRAG → LeanRAG)
- [[database/zhang-2026-leanrag-knowledge-graph-based-generation|LeanRAG (AAAI-26)]] — hierarchical KG + aggregated relation + LCA retrieval.

### 외부 위치 / 비판 (DSBA 2026)
- [[database/dsba-2026-paper-review-graph-based-rag|Graph-based RAG 세미나 (LightRAG · LeanRAG)]] — DSBA 김도윤 박사과정, 53분 발표. 본 overview의 모순·open question 부분의 1차 출처.

### 추후 ingest 후보 (현재 wiki에 부재)
- microsoft/graphrag (repo) — GraphRAG 원논문의 공식 reference implementation. DRIFT·local search·global search 등 본문 외 모드 + Neo4j/LangChain 통합.
- HiRAG (Huang et al., 2025) — LeanRAG가 명시한 직전 SOTA.
- HippoRAG — entity-PageRank-passage 기반.
- Raptor — hierarchical clustering의 대표.
- MMGraphRAG — RAG-Anything 주요 multimodal baseline.
- KnowledgeXLab/LeanRAG (repo) — LeanRAG의 reference implementation.
- mlsZIThxQcQ YouTube — 사용자 의향 시 transcript 수집 후 GraphRAG 세 번째 자료로 ingest 가능.
