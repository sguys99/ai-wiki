---
title: "GraphRAG Paper Review (DSBA, 김도윤 2025-08-11)"
type: article
year: 2025
category: database
raw_path: /Users/kmyu/Desktop/project/ai-wiki/raw/articles/dsba-2025-graphrag-paper-review.pdf
raw_filename: "dsba-2025-graphrag-paper-review.pdf"
source: dsba-2025-graphrag-paper-review.md
source_collection: external
author: "김도윤 (Kim Doyoon, SNU 산업공학과 DSBA 박사과정)"
presentation_date: "2025-08-11"
venue: "DSBA Lab Seminar"
reviews_paper: "Edge et al. (2024) — From Local to Global: A GraphRAG Approach to Query-Focused Summarization"
tags: [graph-rag, paper-review, dsba, knowledge-graph, community-detection, leiden, sensemaking, korean, lecture-deck]
---

## 요약 (Summary)

DSBA 연구실(SNU 산업공학과) **김도윤 박사과정**의 2025-08-11 lab seminar paper review 슬라이드 deck(43p). [[database/edge-2024-from-local-to-global|Edge et al. 2024 GraphRAG]] 논문을 한국어로 정리하면서, **본 논문에 없는 발표자 견해 5가지**를 명시한다 — (a) "KG가 본문 대비 얼마나 효율적으로 정보 반영하느냐가 핵심", (b) **"고정된 prompt로 KG 구축 → 사용자 목적에 맞춘 KG 구축이 GraphRAG 성능 좌우"**, (c) "community summary 활용 → detail loss 불가피", (d) **"hybrid scheme(임베딩 활용) 필수 불가결, query 임베딩 유사도로 community summary 취사선택했으면 어땠을지"**, (e) **"본문보다 코드에 더 많은 절차 — DRIFT(Dynamic Reasoning and Inference with Flexible Traversal) 등"**. 발표자의 후속 [[database/dsba-2026-paper-review-graph-based-rag|2026-05-02 세미나 (LightRAG + LeanRAG)]]가 본 deck에서 제언한 hybrid scheme · hierarchical KG 방향을 실제로 추적하는 직접적 연속선상에 있다.

## 주요 기여 (Key Contributions)

본 deck은 자체 연구가 아닌 한국어 paper review. 주요 가치:

1. **사전 개념의 한국어 정리** — RAG 발전 단계(Survey 2024 인용), KG 정의(노건호 KG 자료), KBQA vs GraphRAG 6축 비교 표, Louvain/Leiden community detection 시각화(disconnected community 문제 포함), Sensemaking 4단계(Klein 2006).
2. **논문 prompt verbatim** — Entity·Relationship 추출 prompt(slide 18), Claim 추출 prompt(slide 19), `CONTINUE_PROMPT`/`LOOP_PROMPT` self-reflection(slide 20), description 요약 prompt(slide 21), community summary 예시 JSON(slide 23 Verdant Oasis Plaza).
3. **map-reduce 흐름 도식 (slide 24·25)** — root vs Level 1 hierarchical 두 버전.
4. **실험 결과 한국어 풀이** — condition 6개 정의(C0~C3·TS·SS), KG 통계(Podcast 8,564/20,691, News 15,754/19,520), 승률 표(comp·div·emp·dir), Experiment 2 alignment 78%·69~70%.
5. **발표자 견해 5가지** (위 요약 참조).
6. **Materials 큐레이션 (slide 40)** — microsoft/graphrag, microsoft.github.io/graphrag, **Neo4j 기반 GraphRAG 위키독스** (wikidocs.net/book/16760), Neo4j essential-graphrag textbook 4링크.

## 방법론 및 아키텍처 (Methodology and Architecture)

논문 methodology를 5 sub-stage로 분해 (slide 15–25):

- **Indexing time vs Query time** 구분 (slide 16).
- **Source → chunks**: 600 토큰 + 100-overlap, chunk size 키울 때 entity 감소 — slide 17의 trade-off 그래프.
- **Chunks → Entities/Relationships/Claims**: entity types는 도메인별 변경, prompt 전문 재게재.
- **Self-Reflection**: `CONTINUE_PROMPT = "MANY entities were missed in the last extraction. Add them below using the same format:"` + `LOOP_PROMPT` Y/N gate.
- **Entities → KG**: chunk별 description을 LLM이 summary로 통합, edge weight = relationship 등장 횟수, **networkx + pandas DataFrame** 운영.
- **KG → Communities**: Leiden, graspologic. 색·degree로 시각화.
- **Communities → Summaries**: leaf = edge degree 정렬, higher = sub-community summary 길이 짧은 것부터 입력.
- **Query**: shuffle → chunk → local answer + score → score 정렬 → global answer. Level 1 hierarchical도 별도 도식.

## 결과 (Results)

논문의 실험을 한국어로 정리 (slide 28–37):

- **slide 30 Conditions**: TS의 운영적 정의 ("entity·relationship 구축 후 일반 RAG처럼 chunking·shuffle, query 임베딩과 유사한 entity 최대 20개 → 포함 chunk = sub-community summary"). 공식 코드 라인 인용(`text_units.py#L11`, `mixed_context.py#L355`).
- **slide 33 Global vs Vector RAG**: Comp·Div에서 GraphRAG 월등, Directness는 SS 근소 우위.
- **slide 34 Empowerment**: 발표자 견해 — "예시·인용문 같은 직접 정보가 판단 근거로 작용 → 문서 직접 활용 SS·TS 유리".
- **slide 35 Summary vs Source**: C0 제외 community summary가 source text보다 우위 (유의 검정 통과). **"C0가 토큰 2.6%로 훨씬 적으면서 성능 우위"** 강조.
- **slide 36 Experiment 2 발표자 견해**: "indexing 단계의 claim 활용법에 대해 본문 언급 없음" — open question 명시.
- **slide 37 Alignment**: Experiment 1 majority 결정 33%·39% 케이스에서 claim metric과 78%·69~70% 일치.

## 발표자 견해 — 5가지 (Slide 42)

본 deck의 핵심 가치인 conclusion 슬라이드의 발표자 비판/제언:

1. **"문서 본문 대비 KG가 얼마나 효율적으로 전체 정보를 반영할 것인가가 핵심"**.
2. **"고정된 prompt로 KG 구축 → 사용자 목적에 맞게 KG를 어떻게 더 적합하게 구축할 것인가가 GraphRAG 성능 좌우"** → domain-adaptive KG 구축 방향 시사.
3. **"community summary 활용 → 요약된 정보이기 때문에 본문 상세 정보 손실 불가피"**.
4. **"Hybrid scheme(임베딩 벡터 활용)은 필수 불가결"** — "community summary를 query와 임베딩 유사도로 취사선택하면 어땠을지" → 후속 [[database/guo-2025-lightrag-simple-and-fast|LightRAG]]·[[database/zhang-2026-leanrag-knowledge-graph-based-generation|LeanRAG]]가 이 방향으로 진행.
5. **"본문에서 소개되는 내용보다 코드 상에는 더욱 많은 과정 — DRIFT(Dynamic Reasoning and Inference with Flexible Traversal) 등"** → 논문 본문에 없는 운영 디테일 cue.

## 관련 페이지 (Related Pages)

- [[database/edge-2024-from-local-to-global]] — 본 review의 대상 논문. 본 deck은 그 한국어 verbatim+해설판.
- [[database/dsba-2026-paper-review-graph-based-rag]] — 동일 발표자의 후속 세미나(2026-05-02, LightRAG + LeanRAG). 본 deck을 "이전 GraphRAG 영상/슬라이드"로 cross-reference하며, 본 deck이 제언한 hybrid scheme·hierarchical KG의 후속 사례를 직접 추적.
- [[database/guo-2025-lightrag-simple-and-fast|LightRAG]] — 본 deck conclusion (d)의 "hybrid (KG + embedding) scheme" 방향 실현.
- [[database/zhang-2026-leanrag-knowledge-graph-based-generation|LeanRAG]] — 본 deck conclusion (c)·(d)의 detail-loss·hybrid 해결 후속.
- [[overviews/lightrag-family-graph-rag-overview]] — graph-based RAG 합성 overview. 본 deck의 발표자 견해 5가지는 그 overview의 open question 라인업과 직접 비교 가능.
