---
title: "From Local to Global: A GraphRAG Approach to Query-Focused Summarization (Paper Review, DSBA Lab Seminar)"
type: article
year: 2025
category: database
raw_path: raw/articles/dsba-2025-graphrag-paper-review.pdf
raw_filename: "dsba-2025-graphrag-paper-review.pdf"
source_collection: external
author: "김도윤 (Kim Doyoon)"
affiliation: "서울대학교 산업공학과 데이터과학 및 비즈니스 애널리틱스(DSBA) 연구실 박사과정"
contact: "doyooni303@snu.ac.kr"
presentation_date: "2025-08-11"
venue: "DSBA Lab Seminar (SNU 산업공학과)"
language: "ko"
slides_count: 43
reviews_paper: "Edge et al. (2024), arXiv 2404.16130, From Local to Global: A GraphRAG Approach to Query-Focused Summarization"
publisher: "DSBA Lab (SNU 산업공학과)"
url: "https://github.com/microsoft/graphrag"
tags: [graph-rag, paper-review, dsba, knowledge-graph, community-detection, leiden, sensemaking, lecture-deck, korean]
---

## 한 줄 요약 (One-line Summary)

DSBA 연구실(SNU 산업공학과) **김도윤 박사과정**의 2025-08-11 lab seminar 슬라이드 deck(43p). Edge et al. (2024) **GraphRAG** 논문을 한국어로 정리한 paper review로, 본 ai-wiki의 동일 발표자 2026-05-02 [[database/dsba-2026-paper-review-graph-based-rag|"이전 세미나"]]에서 언급된 "이전 GraphRAG 영상"의 실제 슬라이드에 해당한다. Backgrounds(RAG·KG·Community Detection·Sensemaking 사전 지식) → Methodology(indexing + query) → Experiments(condition 6개·승률·claim metric) → Materials → Conclusions 5장 구성이며, **발표자 견해**(self-reflection의 호출 비용 절감 가치 / hybrid scheme 필수성 / community summary의 detail loss / fixed prompt의 한계 / DRIFT 등 코드 상의 추가 절차)가 부록처럼 곳곳에 명시되어 있어 단순 요약을 넘어선 **비판적 해설**의 가치가 있다.

## 1. 자료 정보 (Document Information)

- **제목**: From Local to Global: A GraphRAG Approach to Query-Focused Summarization — Paper Review (Korean slide deck)
- **발표자**: 김도윤 (서울대학교 산업공학과 DSBA 연구실 박사과정) — `doyooni303@snu.ac.kr`
- **발표일**: 2025년 8월 11일 (월) — slide 1의 표지에 명기
- **유형**: Lab Seminar paper review slide deck (PDF, 43 pages, ~4.2MB)
- **대상 논문**: Edge et al., 2024, arXiv 2404.16130 ([[database/edge-2024-from-local-to-global|edge-2024-from-local-to-global]])
- **언어**: 한국어 본문 + 영문 기술용어 + 영문 인용 prompt
- **목차**: 1) Backgrounds → 2) Methodology → 3) Experiments → 4) Materials → 5) Conclusions
- **위치**: `raw/articles/dsba-2025-graphrag-paper-review.pdf`
- **관련 자료**: 같은 발표자의 후속 세미나 [[database/dsba-2026-paper-review-graph-based-rag|Graph based RAG (2026-05-02, LightRAG + LeanRAG 리뷰)]] — 본 deck이 그 세미나에서 "이전 GraphRAG 영상"으로 cross-reference된다.

## 2. 주요 기여 (Key Contributions)

본 deck은 자체 연구가 아닌 GraphRAG 논문의 review/정리이다. 주된 가치는:

1. **GraphRAG의 사전 개념(prerequisite) 한국어 정리**: 일반 RAG의 발전 단계(Naive → Advanced → Modular RAG, Survey 2024 인용), Knowledge Graph 정의(고려대 DSBA 노건호 KG 자료 인용), KBQA vs GraphRAG 차이 표(목적·지식 표현·질의 처리·답변 형태·추론·데이터 소스 6축), Community Detection(Louvain → Leiden disconnected community 문제 시각화 포함), Sensemaking 개념(Wikipedia + Klein 2006 인용)을 슬라이드별로 분해.
2. **논문 본문 내 prompt를 verbatim 재제공**: Entity·Relationship 추출 prompt(slide 18 전문), Claim 추출 prompt(slide 19), Self-Reflection의 `CONTINUE_PROMPT` / `LOOP_PROMPT`(slide 20), Description 요약 prompt(slide 21), Community summarization 예시 출력 JSON(slide 23, Verdant Oasis Plaza 예제) — 한국어 학습자에게 논문 부록을 압축한 형태.
3. **Query 시 map-reduce 흐름의 시각화**: slide 24·25에 KG → Community → Summary → (shuffle+score 정렬) → Global Answer 도식을 root level vs Level 1 두 버전으로 그려 hierarchical 처리 흐름을 명확히 했다.
4. **Experiment 1·2 결과 한국어 요약**: condition 6개 정의(C0~C3, TS, SS) + 데이터셋별 KG 통계(Podcast 8,564 nodes / 20,691 edges, News 15,754 / 19,520) + comprehensiveness·diversity·empowerment·directness 승률 표 + Experiment 2의 alignment 결과("majority가 갈린 33%·39% 케이스 중 78%·69~70% 일치").
5. **발표자 견해(주관적 review)**: slide 17 "발표자 의견" — chunk size가 클수록 entity가 줄어드는 trade-off는 "entity 중복·관계 요약" 관점; slide 34 — empowerment에서 SS·TS 우세 이유는 "예시·인용문 등의 직접적인 정보가 판단의 근거"; slide 36 — "indexing 단계의 claim 활용법에 대한 본문 언급 부족"; **slide 42 conclusion** — (a) "지식 그래프가 본문 대비 얼마나 효율적으로 정보를 반영하는가가 핵심", (b) **"본 방법론은 고정된 prompt로 KG 구축 → 사용자 목적에 맞게 KG를 어떻게 더 적합하게 구축할 것인가가 GraphRAG 성능 좌우"**, (c) **"detail loss 불가피 → hybrid scheme(임베딩 벡터 활용) 필수 불가결"** → "community summary를 query 임베딩 유사도로 취사선택하면 어땠을지", (d) **"본문 외 코드 상에는 DRIFT(Dynamic Reasoning and Inference with Flexible Traversal) 등 더 많은 절차가 있다"** — 논문 본문에 없는 실제 구현 추가 절차를 명시.
6. **재현 자료 큐레이션(Materials, slide 40)**: Microsoft 공식 깃허브(github.com/microsoft/graphrag) · 공식 문서(microsoft.github.io/graphrag) · **Neo4j 기반 GraphRAG 위키독스**(wikidocs.net/book/16760) · Neo4j 제공 무료 textbook(neo4j.com/essential-graphrag) 4개 링크 제공.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

본 deck은 논문의 **methodology를 5개 sub-stage로 분해**한다 (slide 15–25):

- **Overview (slide 16)**: GraphRAG = Indexing time(LLM-derived graph index of source documents) + Query time(community별 query 연관 요약 추출 → 최종 통합 → global answer). 모든 LLM 호출은 GPT-4-turbo.
- **3.1 Source documents → Text chunks (slide 17)**: chunk size 큰 쪽이 LLM 호출 횟수는 적지만 entity 수가 감소 (trade-off). 데이터셋: Podcast 1669×600 토큰·100-overlap (≈1M), News 3197×600·100-overlap (≈1.7M).
- **3.2 Text chunks → Entities/Relationships (slide 18)**: entity types는 도메인에 따라 변경 가능. prompt 전문(영문) 그대로 재게재.
- **3.3 Claim 추출 (slide 19)**: entity의 중요한 fact(날짜·이벤트·다른 entity와의 interaction). subject/object/type/status(TRUE/FALSE/SUSPECTED)/start_date/end_date/description/source 8필드. 1월 10일 Company A 부정 입찰 예제 포함.
- **3.4 Self-Reflection (slide 20)**: `CONTINUE_PROMPT = "MANY entities were missed in the last extraction. Add them below using the same format:"`, `LOOP_PROMPT = "It appears some entities may have still been missed. Answer Y if there are still entities that need to be added, or N if there are none. Please answer with a single letter Y or N."` — chunk size를 키워 LLM 호출은 줄이면서 entity는 더 많이 detect.
- **3.5 Entities → KG (slide 21)**: 동일 entity·relationship·claim의 chunk별 description을 모아 description 요약 prompt로 하나의 description으로 통합. relationship 등장 횟수가 edge weight. 공식 코드는 **networkx + pandas DataFrame**으로 그래프 관리.
- **3.6 KG → Community (slide 22)**: Leiden 알고리즘 사용. 색깔로 community 구분, community 내 degree 합으로 노드 크기 시각화 — 상위 level vs 하위 level 두 시각.
- **3.7 Community → Community summary (slide 23)**: Verdant Oasis Plaza와 Unity March 예제 verbatim 재게재(title/summary/rating 5.0/findings 4개). leaf-level: edge degree 합 기준 정렬, 상위 level: sub-community summary 길이 짧은 것부터 입력.
- **3.8 Query 시 map-reduce (slide 24, 25)**: 도식으로 ① community summary random shuffle + chunking → ② 각 chunk에 대해 local answer + helpfulness score (0–100) 산출 → ③ score 정렬 후 token limit까지 누적 → ④ global answer. Level 1까지 hierarchical 흐름(slide 25)도 별도 도식.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

본 deck은 논문의 실험 결과를 한국어로 풀어 정리한다 (slide 28–37):

- **slide 28–29 (Question/Criteria)**: persona/task/question 생성 + judge prompt verbatim. JSON 출력 형식(`winner`, `reasoning`).
- **slide 30 (Conditions)**: SS·TS·C0·C1·C2·C3. TS는 "entity와 relationship까지 구축한 상황에서, 일반 RAG처럼 문서를 chunking 후 random shuffle, query 임베딩과 유사한 entity 최대 20개 추출 → 추출 entity가 포함된 chunk = (sub) community summary"로 운영적으로 설명. 공식 코드 라인까지 인용(`text_units.py#L11`, `mixed_context.py#L355`).
- **slide 31 (Configuration)**: 생성문 길이 8k, 컴퓨터 사양(16GB RAM, Intel Xeon Platinum 8171M @ 2.60GHz), Podcast 600-token chunk indexing 281분, LLM: GPT-4-turbo @ 2M TPM·10k RPM.
- **slide 32 (Statistics)**: Podcast 8,564 nodes/20,691 edges, News 15,754/19,520. condition별 community summary 개수·길이·% Max 표.
- **slide 33 (Global vs Vector RAG)**: Comprehensiveness·Diversity에서 GraphRAG 월등, Directness는 일반 RAG 근소 우세. **"행→열 승률, ex. SS→TS = 17% / TS→SS = 83%"** 표 해석법까지 명시.
- **slide 34 (Empowerment)**: 특별히 우수한 조건 없음. C0가 근소 약세, SS·TS 평균적 근소 우세. **발표자 견해: "예시·인용문 등의 직접적인 정보가 판단의 근거로 활용 가능 → 문서를 직접 활용하는 SS·TS가 유리"**.
- **slide 35 (Summary vs Source)**: Comprehensiveness·Diversity에서 community summary가 source text 대비 더 좋음(C0 제외 — 유의 검정 통과). **"C0의 경우 DB로 활용되는 토큰 수도 매우 적고(2.6%) 성능은 훨씬 높음"** 강조.
- **slide 36–37 (Experiment 2)**: Claimify로 claim 추출(comprehensiveness = 평균 claim 수, diversity = agglomerative clustering 군집 수, 1-ROUGE-L distance). 모든 조건 SS 대비 claim 수 우위. Experiment 1과 alignment 78%·69–70%. **발표자 견해(slide 36)**: "indexing 과정에서 구한 claim 활용법에 대해서는 본문 언급 없음".
- **slide 38 (Discussion)**: 한계 — 더 다양한 도메인 corpus 실험, fabrication rate 등 평가 기준 추가; 향후 — hybrid RAG scheme(community summary 임베딩 활용), global approach로 partial-represents-whole 회피.

## 5. 한계와 향후 과제 (Limitations and Future Work)

본 deck이 명시한 한계와 발표자의 향후 과제 의견 정리 (slide 38, 42):

- **본 자료의 본질적 한계**: paper review slide이며 자체 실험·코드·벤치마크 없음. 새로운 결과는 0건이며 가치는 한국어 정리 + 발표자의 비판적 코멘트.
- **논문 자체의 한계** (slide 38, 논문 6.1 풀이):
  - 일반화: 2개 corpus(~1M 토큰)만으로 검증, 더 다양한 도메인 실험 필요.
  - 평가 기준: fabrication rate(환각률) 같은 측정 추가 가능.
- **발표자의 5가지 주관적 비판/제언 (slide 42)**:
  1. *"지식 그래프가 본문 대비 얼마나 효율적으로 전체 정보를 반영할 것인가가 핵심"*.
  2. *"고정된 prompt로 KG 구축 → 사용자 목적에 맞게 KG를 더 적합하게 구축할 것인가가 GraphRAG 성능 좌우"* — domain adaptation 가능성 시사.
  3. *"community summary 활용 → 어찌되었든 요약된 정보 → detail loss 불가피"*.
  4. **"Hybrid scheme(임베딩 벡터 활용)은 필수 불가결"** — community summary를 query와 임베딩 vector 유사도 기준으로 취사선택하면 어땠을지. 후속 [[database/guo-2025-lightrag-simple-and-fast|LightRAG]]·[[database/zhang-2026-leanrag-knowledge-graph-based-generation|LeanRAG]]가 실제로 이 방향으로 진행됨.
  5. *"본문에서 소개되는 내용보다 실제로 코드 상에서는 더욱 많은 과정"* — **DRIFT(Dynamic Reasoning and Inference with Flexible Traversal)** 등 — 논문에 없는 운영 디테일이 실제 시스템에 존재함.

## 6. 관련 연구 (Related Work)

slide deck이 참조하는 외부 자료(공식 인용 외):

- **Retrieval-Augmented Generation for Large Language Models: A Survey (2024)** — slide 4·5·6의 GraphRAG pipeline 도식, RAG 발전 단계 도식의 출처.
- **A Survey on Complex Knowledge Base Question Answering: Methods, Challenges and Solutions (Lan et al., IJCAI 2021)** — slide 8의 KBQA vs GraphRAG 비교 표 background.
- **Knowledge-Augmented Language Model Prompting for Zero-Shot Knowledge Graph Question Answering (2023)**; **Enhancing Knowledge Graph Construction Using Large Language Models (2023)**; **Knowledge Graph Prompting for Multi-Document Question Answering (Wang et al., 2023)**; **LLM-based Knowledge Graph Traversal Agent (Wang et al., 2023)** — slide 9의 LLM × KG 4가지 활용 패턴.
- **Community detection in graphs (Santo Fortunato, 2009)**; **Fast unfolding of communities in large networks (Blondel et al., 2008)**; **From Louvain to Leiden: guaranteeing well-connected communities (Traag et al., 2019)** — slide 10–12의 community detection 알고리즘 background.
- **Making Sense of Sensemaking 1: Alternative Perspectives (Klein et al., 2006)** + **Wikipedia Sensemaking** — slide 13의 sensemaking 정의.
- **AFaCTA: Assisting the annotation of factual claim detection with reliable LLM annotators (Ni et al., 2024)**; **Towards effective extraction and evaluation of factual claims (Metropolitansky & Larson, 2025)** — slide 36의 claim 추출 방법론.
- **고려대학교 DSBA 연구실 졸업생 노건호 / 김선우의 세미나 자료** — slide 7·10에서 인용된 KG·community detection 사전 학습 자료.

내부 연관 (본 ai-wiki):

- [[database/edge-2024-from-local-to-global|GraphRAG 원논문]] — 본 review의 대상.
- [[database/dsba-2026-paper-review-graph-based-rag|동일 발표자의 후속 세미나]] — LightRAG + LeanRAG 비교. 본 deck이 "이전 GraphRAG 영상/슬라이드"로 cross-reference됨.
- [[database/guo-2025-lightrag-simple-and-fast|LightRAG]] — 발표자가 제언한 "hybrid (KG + embedding)" 방향의 실현 사례.
- [[database/zhang-2026-leanrag-knowledge-graph-based-generation|LeanRAG]] — hierarchical KG로 발표자가 제안한 community summary detail-loss 완화 방향.

## 7. 용어집 (Glossary)

(공통 정의는 [[database/edge-2024-from-local-to-global|paper source의 7절 Glossary]] 참조. 본 deck 특유의 한국어 표현·발표자 정의만 발췌.)

- **Naive / Advanced / Modular RAG**: slide 6에 인용된 Survey 2024의 RAG 발전 3단계. "기본적으로 일반 RAG의 초점은 질문 의도 분석 및 질문과 연관 있는 문서를 어떻게 탐색할 것인가에 초점, DB 내 문서간 관계·연결성에 대한 관심은 비교적 낮음"이 본 deck의 일반 RAG 정의.
- **KBQA (Knowledge Base Question Answering)**: 정답이 있는 자연어 사실 질문에 KG를 통해 정답 entity를 산출. KBQA는 RDF triplet 기반 SPARQL/논리형식 변환·정확한 fact 답변. GraphRAG는 텍스트+그래프 반구조화·자연어 생성·LLM 추론. **"KBQA의 일반화 형태가 GraphRAG"**(발표자 정의, slide 8).
- **Knowledge Graph (KG)**: Knowledge Base를 그래프로 나타낸 것. Knowledge Base = 두 객체 소속·관계를 담은 지식 정보. 예: `(김도윤, member_of, DSBA)` triplet → head·relation·tail.
- **Knowledge Graph Completion**: triplet 중 하나의 요소를 제외한 후 해당 요소 예측 (slide 9).
- **류류상종 (類類相從)**: slide 10에서 community detection의 기본 가정으로 인용된 한국어 표현 — "비슷한 노드들은 서로 연결/밀집".
- **Local Moving / Refinement / Aggregation**: Leiden의 3단계 (slide 11–12). Louvain의 2단계(Local Moving + Aggregation)에 Refinement 추가로 disconnected community 문제 해결.
- **Noticing / Interpreting / Acting / Reflecting**: Sensemaking 4단계 (slide 13). "조직이 어떻게 불확실한 환경에서 의미를 만들어가는지를 내포하는 개념".
- **문헌 분석 프레임워크**: slide 14에서 발표자가 자신의 공동 연구 주제로 언급한 global sensemaking use case 예 — *"2015~2025 동안 전기차 배터리 또는 배터리 공정 관련 연구 분야에서 인공지능 기술로 해결하고자 했던 과업은 무엇이며 이에 대한 예시"*.
- **DRIFT (Dynamic Reasoning and Inference with Flexible Traversal)**: slide 42에서 발표자가 언급. 논문 본문에는 없고 공식 microsoft/graphrag 코드에 존재하는 추가 search 모드 — 본 review가 논문 → 실제 시스템 사이의 격차를 명시하는 중요 cue.
- **수직적으로 연결된 노드**: slide 22의 community 시각화 + slide 25의 hierarchical map-reduce를 묘사하는 발표자 어휘. "플랫한 KG를 hierarchical하게 네트워크 형성하여 입체적으로 보겠다"는 후속 LeanRAG 등의 방향성 예고.
