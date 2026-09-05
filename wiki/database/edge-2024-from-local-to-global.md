---
title: "GraphRAG: From Local to Global"
type: paper
year: 2024
category: database
raw_path: raw/papers/edge-2024-from-local-to-global.pdf
raw_filename: "edge-2024-from-local-to-global.pdf"
source: edge-2024-from-local-to-global.md
source_collection: external
authors: "Darren Edge, Ha Trinh, Newman Cheng, Joshua Bradley, Alex Chao, Apurva Mody, Steven Truitt, Dasha Metropolitansky, Robert Osazuwa Ness, Jonathan Larson"
affiliation: "Microsoft Research"
arxiv_id: "2404.16130"
url: "https://arxiv.org/abs/2404.16130"
code_url: "https://github.com/microsoft/graphrag"
tags: [graph-rag, rag, knowledge-graph, community-detection, leiden, query-focused-summarization, sensemaking, llm-as-a-judge, microsoft]
---

## 요약 (Summary)

Microsoft Research가 **GraphRAG**를 제안한 원논문(arXiv 2404.16130, v2 2025-02-19). **인덱싱**: LLM이 source corpus에서 entity·relationship·claim을 추출 → KG로 통합 → Leiden hierarchical community 분할 → community별 report-style summary를 bottom-up으로 사전 생성. **질의**: community summary를 random shuffle 후 chunk, 각 chunk에 대해 partial answer + helpfulness score(0–100)를 map 병렬, score 정렬 후 reduce하여 global answer. ~100만 토큰 corpus에서 vector RAG 대비 comprehensiveness·diversity 승률 **72–83%**, 특히 **root-level C0는 source-text 대비 토큰 9–43× 절감**하면서 SS 대비 우위 유지 — sensemaking에 최적화된 efficiency-quality trade-off를 처음으로 명시. 본 ai-wiki 내 graph-based RAG 계열([[database/guo-2025-lightrag-simple-and-fast|LightRAG]] · [[database/zhang-2026-leanrag-knowledge-graph-based-generation|LeanRAG]] · [[database/guo-2025-rag-anything-all-in-one-rag|RAG-Anything]])의 **공통 조상**.

## 주요 기여 (Key Contributions)

1. **GraphRAG 메서드 자체** — 본 논문의 메인 컨트리뷰션 (1절). LLM 기반 entity·relationship·claim 추출 + Leiden hierarchical community + community report 사전 생성 + map-reduce global answering의 end-to-end 파이프라인을 처음으로 통합 제시.
2. **LLM-as-a-judge로 ground-truth 없는 sensemaking 평가** — corpus description에서 K=N=M=5 persona·task·question 합성으로 데이터셋당 125문항 + comprehensiveness·diversity·empowerment + directness control criterion + 5회 replicate.
3. **Claim-based 2차 검증** — Claimify로 47,075 unique claim 추출 → 평균 claim 수(comprehensiveness)·1-ROUGE-L 거리 agglomerative clustering 군집 수(diversity)를 LLM judge와 별도로 측정, 78%(comp)·69–70%(div) alignment로 LLM-as-a-judge의 validity 보강.
4. **운영 디테일 공개**: chunk size 600 vs 2400 trade-off + self-reflection `LOOP_PROMPT`/`CONTINUE_PROMPT`로 large chunk 유지하면서 entity 누락 보완 / context window 8k 채택(lost-in-the-middle 회피) / Podcast 281분 indexing (Intel Xeon Platinum 8171M + 16GB RAM + GPT-4-turbo @ 2M TPM·10k RPM).
5. **공식 OSS 배포** — `microsoft/graphrag` (MIT) + LangChain · LlamaIndex · NebulaGraph · Neo4J 통합.

## 방법론 및 아키텍처 (Methodology and Architecture)

**파이프라인 6단계**:

1. **Source documents → Text chunks** (600 token + 100-overlap). Trade-off: chunk size 크면 LLM 호출↓ but entity 추출↓ → self-reflection으로 보완.
2. **Text chunks → Entities & relationships** — entity name·type·description, relationship source/target/description/strength를 multipart prompt로 추출. domain-specific few-shot 가능.
3. **(Optional) Claim extraction** — subject·object·type·status(TRUE/FALSE/SUSPECTED)·date·source quote 8필드.
4. **Element instances → Knowledge graph** — exact string match로 entity 통합, description은 LLM이 concatenate-summarize, relationship 중복 횟수 → edge weight.
5. **KG → Communities (Leiden, graspologic)** — hierarchical community partition (level 0 root → leaf). 각 level이 mutually exclusive·collectively exhaustive.
6. **Communities → Summaries** — TITLE/SUMMARY/IMPACT SEVERITY RATING(0–10)/RATING EXPLANATION/DETAILED FINDINGS(5–10). Leaf: edge degree 합 기준 정렬, Higher: token 초과 시 큰 sub-community를 더 짧은 sub-summary로 치환.

**질의 처리**: ① community summary random shuffle + 사전 정의 token chunk → ② 각 chunk → partial answer + helpfulness score(0–100), score 0 필터 → ③ score 내림차순 누적 → global answer 1개. Community level(C0/C1/C2/C3)이 question에 따라 다른 detail-scope 트레이드오프 제공.

## 결과 (Results)

**Experiment 1 (LLM judge head-to-head)** — Podcast(8,564 nodes, 20,691 edges) + News(15,754 nodes, 19,520 edges):

| Metric | Vector RAG (SS) vs C0–C3 best | Comments |
|---|---|---|
| Comprehensiveness (Podcast) | SS 17–28% (graph 72–83% 승) | p<.001 |
| Comprehensiveness (News) | SS 20–28% | p<.001 |
| Diversity (Podcast) | SS 18–25% | p<.001 |
| Diversity (News) | SS 29–38% | p<.01 |
| Empowerment | mixed (SS 약간 우위) | LLM judge가 "예시·인용" 강조 |
| Directness (control) | **SS 우위** (intended) | criterion validity 확인 |

**Token efficiency (Table 2)**:
- Podcast C0 = 26,657 tokens (max 2.6%) vs TS 1,014,611 → **38× 절감** 하면서 SS 대비 comprehensiveness 72%, diversity 62% 승.
- News C0 = 39,770 (2.3%) vs TS 1,707,694 → **43× 절감**.

**Community vs source text**: intermediate C2 (Podcast) 57% (p<.001), low-level C3 (News) 64% (p<.001) → community summary가 raw text보다 query에 더 잘 부합.

**Experiment 2 (claim-based)**: C0–C3 + TS의 평균 claim 수 모두 SS 대비 p<.05 우위 (Podcast 31.4 vs 26.5, News 31.6–34.2 vs 25.2). agglomerative clustering 군집 수도 Podcast에서 SS 대비 모든 condition 우위. LLM judge와 78%/69–70% alignment.

**Context window ablation (Appendix C)**: 8k vs 16k/32k/64k에서 **8k가 comprehensiveness 평균 58.1% 승** — lost-in-the-middle (Liu et al., 2023) 회피 차원에서 채택.

## 한계와 향후 (Limitations and Future)

- 평가 corpus 2개(~1M 토큰)로 일반화 검증 불충분; fabrication rate (SelfCheckGPT 등) 평가 부재.
- empowerment에서 vector RAG가 인용/예시 측면에서 약간 강함 → element extraction prompt로 인용 흔적 보존 필요.
- **Future**: (a) embedding-based query↔graph annotation matching, (b) just-in-time community report generation, (c) community hierarchy를 query time에 roll-up/drill-down 탐색하는 hybrid scheme. **실제로 후속 GraphRAG 코드에는 DRIFT search/local search/global search 등이 추가됨** (한국어 review에서 명시, [[database/dsba-2025-graphrag-paper-review]] 참조).

## 관련 페이지 (Related Pages)

- [[database/dsba-2025-graphrag-paper-review]] — 본 논문의 한국어 paper review 슬라이드 deck (DSBA 김도윤 박사과정, 2025-08-11). 본 논문의 prompt verbatim, KG 시각화, 발표자의 5가지 비판/제언(특히 *"hybrid scheme 필수 불가결"*, *"DRIFT 등 코드 상 추가 절차"*)을 한국어로 제공.
- [[database/dsba-2026-paper-review-graph-based-rag]] — 동일 발표자의 **후속 세미나** (2026-05-02 영상 + 슬라이드). 본 논문을 "이전 GraphRAG 영상"으로 referencing하며 그 뒤를 잇는 [[database/guo-2025-lightrag-simple-and-fast|LightRAG]]·[[database/zhang-2026-leanrag-knowledge-graph-based-generation|LeanRAG]]를 다룸.
- [[database/guo-2025-lightrag-simple-and-fast|LightRAG (EMNLP 2025)]] — GraphRAG의 community summary를 entity·relationship key-value 직렬화 + dual-level keyword retrieval로 대체해 토큰·API 호출 절감. 본 논문이 명시한 *"hybrid scheme"* 방향의 한 답.
- [[database/zhang-2026-leanrag-knowledge-graph-based-generation|LeanRAG (AAAI-26)]] — GMM-BIC로 hierarchical KG + abstract 노드간 relation 합성 + LCA retrieval. 본 논문의 community summary detail-loss 우려를 hierarchical abstraction으로 완화.
- [[database/guo-2025-rag-anything-all-in-one-rag|RAG-Anything]] — LightRAG 후속, multimodal graph로 확장.
- [[database/9bow-2026-rag-anything-multimodal-rag-framework]] — 한국어 RAG-Anything 소개글.
- [[overviews/lightrag-family-graph-rag-overview|Graph-based RAG 계열 — GraphRAG 트렁크 overview]] — **본 논문이 trunk root**로 명시적 편입된 합성 페이지(2026 갱신). LightRAG/LeanRAG/RAG-Anything 세 분기의 공통 조상으로서 본 논문의 파이프라인·평가 프레임·정량 결과(C0 9–43× 토큰 절감, 승률 72–83%, Claimify 78%/69–70% alignment, context window 8k 평균 58.1% 승)가 §2·§7에 정리됨. DSBA 2025 review가 본 논문에 진단한 5가지 약점(§3)이 후속 LightRAG·LeanRAG·RAG-Anything의 설계 동기로 매핑됨.
