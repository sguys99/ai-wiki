---
title: "From Local to Global: A GraphRAG Approach to Query-Focused Summarization"
type: paper
year: 2024
category: database
raw_path: /Users/kmyu/Desktop/project/ai-wiki/raw/papers/edge-2024-from-local-to-global.pdf
raw_filename: "edge-2024-from-local-to-global.pdf"
source_collection: external
authors: "Darren Edge, Ha Trinh, Newman Cheng, Joshua Bradley, Alex Chao, Apurva Mody, Steven Truitt, Dasha Metropolitansky, Robert Osazuwa Ness, Jonathan Larson"
affiliation: "Microsoft Research / Microsoft Strategic Missions and Technologies / Microsoft Office of the CTO"
arxiv_id: "2404.16130"
arxiv_version: "v2 (19 Feb 2025)"
url: "https://arxiv.org/abs/2404.16130"
code_url: "https://github.com/microsoft/graphrag"
docs_url: "https://microsoft.github.io/graphrag/"
venue: "arXiv preprint (under review)"
tags: [graph-rag, rag, knowledge-graph, community-detection, leiden, query-focused-summarization, sensemaking, llm-as-a-judge, microsoft]
---

## 한 줄 요약 (One-line Summary)

Microsoft Research가 제안한 **GraphRAG** — LLM으로 source corpus에서 entity·relationship 지식 그래프를 구축하고 Leiden 알고리즘으로 hierarchical community partition을 만든 뒤 community summary를 사전 생성하여, 질의 시 community별로 partial answer를 만들고 map-reduce로 global answer를 합성한다. ~100만 토큰 corpus의 **query-focused summarization(sensemaking) 질의**에서 vector RAG 대비 comprehensiveness·diversity 모두 압도(승률 72–83%), root-level summary(C0)는 source-text 대비 토큰 9–43× 절감하면서도 우수한 성능을 유지한다.

## 1. 자료 정보 (Document Information)

- **제목**: From Local to Global: A GraphRAG Approach to Query-Focused Summarization
- **저자**: Darren Edge†, Ha Trinh† (공동 1저자), Newman Cheng, Joshua Bradley, Alex Chao, Apurva Mody, Steven Truitt, Dasha Metropolitansky, Robert Osazuwa Ness, Jonathan Larson
- **소속**: Microsoft Research (Edge, Trinh, Metropolitansky, Ness, Larson) / Microsoft Strategic Missions and Technologies (Cheng, Bradley, Truitt) / Microsoft Office of the CTO (Chao, Mody)
- **arXiv**: 2404.16130 (v1: 2024-04-24, v2: 2025-02-19) — "Preprint. Under review"
- **공식 코드**: https://github.com/microsoft/graphrag (MIT License)
- **공식 문서**: https://microsoft.github.io/graphrag/
- **확장**: LangChain, LlamaIndex, NebulaGraph, Neo4J에 통합되어 있음 (논문 1절)
- **분량**: arXiv v2 기준 26페이지 (본문 + Appendix A–G)
- **위치**: `raw/papers/edge-2024-from-local-to-global.pdf`

## 2. 주요 기여 (Key Contributions)

본 논문의 **메인 컨트리뷰션은 GraphRAG 메서드 자체와 그것이 전체 corpus에 대한 global sensemaking을 수행할 수 있다는 능력**이다 (논문 1절). 정리하면:

1. **GraphRAG 파이프라인 제안**: LLM 기반 (a) entity·relationship·claim 추출 → (b) knowledge graph 구축 → (c) Leiden hierarchical community detection → (d) bottom-up community summary 사전 생성 → (e) map-reduce query answering의 end-to-end graph-based RAG.
2. **Global sensemaking 평가 프레임워크**: ground truth가 없는 broad-theme 질문을 대상으로 한 **LLM-as-a-judge 응용**. corpus description으로부터 LLM이 K개 persona × N개 task × M개 question (K=N=M=5, 총 125문항)을 자동 생성하고, comprehensiveness·diversity·empowerment 3개 기준 + directness 통제 기준으로 두 시스템의 답변을 head-to-head 비교.
3. **두 개의 ~100만 토큰 코퍼스에서 정량 비교**: Podcast transcripts(~1.0M 토큰), News articles(~1.7M 토큰)에서 vector RAG(SS) 대비 모든 graph-based 조건이 comprehensiveness·diversity 우위. Root-level summary(C0)는 source-text 대비 **97% 적은 토큰**으로도 우위 유지 — sensemaking 활동에 최적화된 efficiency-quality trade-off.
4. **Self-reflection·hierarchical community·chunk-size trade-off 등 운영 디테일**: chunk size를 600→2400으로 키우면 entity 추출은 거의 절반으로 감소하므로, self-reflection prompt(`CONTINUE_PROMPT`, `LOOP_PROMPT`)로 reprompt하여 large chunk + 낮은 LLM 호출 비용 + 추출 quality를 동시 확보.
5. **Claim-based 2차 검증(Experiment 2)**: Claimify(Metropolitansky and Larson, 2025)로 답변에서 factual claim을 추출하여 평균 claim 개수(comprehensiveness)와 1-ROUGE-L 거리 기반 agglomerative clustering 군집 수(diversity)를 측정. **C0–C3 모두 SS 대비 p<.05로 유의미하게 우수**하며, LLM 판정과 78%(comprehensiveness)·69–70%(diversity) 정합.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

GraphRAG는 **인덱싱 단계(indexing time)** 와 **쿼리 단계(query time)** 두 부분으로 나뉜다. 모든 LLM 호출은 GPT-4-turbo로 통일.

### 3.1 Indexing — Source Documents → Knowledge Graph → Community Summaries

**3.1.1 Source documents → Text chunks**
- 원본 문서를 fixed-size chunk로 분할 (실험: 600 token + 100-token overlap).
- chunk size 큰 쪽이 LLM 호출은 적지만 entity 추출 수가 감소 (600 토큰일 때 2400 토큰 대비 약 2배 추출). Appendix Figure 3은 self-reflection iteration 횟수와 chunk size별 추출 entity 수 trade-off를 보여준다.

**3.1.2 Text chunks → Element instances (entities/relationships/claims)**
- LLM에 entity types 리스트와 함께 multipart prompt 입력 (Appendix E.1). 예시 entity: `("entity"|FED|ORGANIZATION|The Fed is the Federal Reserve...)`, 예시 relationship: `("relationship"|JEROME POWELL|FED|...|9)`.
- few-shot 예시를 도메인 특화(과학·의학·법률)로 교체해 in-context learning으로 적응.
- **Claim 추출**: subject·object·claim type·status(TRUE/FALSE/SUSPECTED)·date range·source quote를 별도 prompt로 추출 (Appendix Claim Extraction Prompt). claim은 entity에 대한 중요한 fact(날짜·이벤트·다른 entity와의 상호작용).
- **Self-Reflection**: `gleaning` 절차로 잘못 빠진 entity를 다시 추출. `LOOP_PROMPT`로 LLM이 "still entities to add"를 Y/N으로 판정(logit bias 100 강제), Y면 `CONTINUE_PROMPT`로 추가 추출 — chunk size 키워도 quality 유지.

**3.1.3 Element instances → Knowledge graph**
- 같은 entity·relationship·claim에 대한 중복 instance를 묶어 **single node·edge로 통합**하면서 description을 LLM이 요약(Appendix Description 요약 prompt: "concatenate all of these into a single, comprehensive description").
- relationship 중복 횟수가 **edge weight**가 된다.
- entity matching은 단순 exact string match (soft matching도 가능하나 후속 community step이 중복에 robust).

**3.1.4 Knowledge graph → Graph communities**
- **Leiden 알고리즘**(Traag et al., 2019)으로 hierarchical community detection. graspologic 라이브러리 사용.
- 각 level의 community partition은 mutually exclusive·collectively exhaustive — divide-and-conquer global summarization을 가능케 함.
- Appendix Figure 4: MultiHop-RAG dataset 위에서 OpenORD + Force Atlas 2 레이아웃으로 시각화, level 0 (root) → level 1 (sub) 색상 분화.

**3.1.5 Graph communities → Community summaries**
- 각 community를 **report 형태로 요약** (Appendix E.2 Community Summary Generation prompt). 구성: TITLE / SUMMARY / IMPACT SEVERITY RATING (0–10 float) / RATING EXPLANATION / DETAILED FINDINGS (5–10 insights).
- **Leaf-level**: edge를 source/target node combined degree 내림차순으로 정렬 후 element summary(source desc + target desc + edge desc + claims)를 token limit까지 채움.
- **Higher-level**: 가능하면 sub-community의 element summary를 그대로 사용, token 초과 시 element summary 토큰 수가 큰 sub-community부터 그 sub-community의 (짧은) summary로 substitute하여 context window에 맞춤.

### 3.2 Query Time — Community Summaries → Local Answers → Global Answer

특정 community level이 주어지면:
- **Prepare**: 해당 level의 community summary들을 **random shuffle**(중요 정보가 한 chunk에 몰리지 않게)하고 사전 정의 token size로 chunk.
- **Map (community answers)**: 각 chunk에 대해 LLM이 partial answer + **helpfulness score 0–100**(질문에 얼마나 도움이 되는지)을 병렬 생성. score 0은 필터 아웃.
- **Reduce (global answer)**: helpfulness score 내림차순으로 partial answer를 token limit까지 새 context에 누적 → 최종 답변 1개 생성.

### 3.3 Global Sensemaking Question Generation (평가 데이터셋 합성)

ground truth가 없는 sensemaking 평가용 질문을 corpus 자체에서가 아니라 **corpus description**에서 LLM으로 생성:
- Algorithm 1: K개 persona → persona당 N개 task → (persona, task)당 M개 question.
- K=N=M=5 → 데이터셋당 125 test question.
- 예시(논문 Table 1): podcast → "tech journalist" persona × "tech policy 영향" task × "어느 에피소드가 tech policy를 다루는가?" 등.

### 3.4 Evaluation Criteria (Appendix F)

LLM judge에 question + answer1 + answer2 + criterion을 주고 winner(1/2/0)와 reasoning을 JSON으로 산출:
- **Comprehensiveness**: 답변이 질문의 모든 측면을 얼마나 상세히 다루는가?
- **Diversity**: 답변이 얼마나 다양한 관점/통찰을 제공하는가?
- **Empowerment**: 답변이 독자의 이해와 informed judgment를 얼마나 돕는가?
- **Directness (control)**: 답변이 얼마나 구체적이고 명확하게 질문에 답하는가? — comprehensiveness·diversity와 반대 방향이라 reference로 사용.

각 비교를 5회 replicate하고 평균. directness가 vector RAG에 유리하게 나오는 것이 evaluation 자체의 validity check 역할.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 Experiment 1 — Head-to-head LLM judging

**비교 조건 6개**:
- `SS` (Semantic Search, vector RAG baseline)
- `TS` (Text Summarization, map-reduce를 source text에 직접 적용)
- `C0` (root-level community summary) / `C1` (high-level) / `C2` (intermediate) / `C3` (low-level)

**Graph 통계**:
- Podcast: 8,564 nodes / 20,691 edges
- News: 15,754 nodes / 19,520 edges

**Context unit 크기 (Table 2)**:
| | C0 | C1 | C2 | C3 | TS |
|---|---|---|---|---|---|
| Podcast units | 34 | 367 | 969 | 1,310 | 1,669 |
| Podcast tokens | 26,657 | 225,756 | 565,720 | 746,100 | 1,014,611 |
| Podcast %max | **2.6** | 22.2 | 55.8 | 73.5 | 100 |
| News units | 55 | 555 | 1,797 | 2,142 | 3,197 |
| News tokens | 39,770 | 352,641 | 980,898 | 1,140,266 | 1,707,694 |
| News %max | **2.3** | 20.7 | 57.4 | 66.8 | 100 |

**C0(root)는 source-text의 9–43× 적은 토큰만으로 동등 이상의 성능을 보장**한다는 점이 GraphRAG의 핵심 efficiency 주장.

**승률 (Figure 2)** — 행→열 승률 %:

Podcast Comprehensiveness:
- SS→[TS,C0,C1,C2,C3] = [17, 28, 25, 22, 21] → graph 조건이 모두 SS 압도
- C2→C1, C3→C2 등 사이는 50% 부근

Podcast Diversity:
- SS→[TS, C0–C3] = [18, 23, 25, 19, 19] → graph 압도

Empowerment / Directness:
- Empowerment는 mixed; SS가 directness에서 자기 강점 유지(통제 기준 작동 확인).

**핵심 정량 (Section 5.1)**:
- Global approaches comprehensiveness win rate **72–83%** vs SS (Podcast, p<.001), **72–80%** (News, p<.001).
- Diversity win rate **75–82%** (Podcast, p<.001), **62–71%** (News, p<.01).
- Community summaries vs source texts(`TS`)에서도 intermediate level이 Podcast 57% (p<.001), News low-level 64% (p<.001)로 우위 — community summary가 raw text보다 query에 더 잘 부합하는 정보 응축을 제공.
- **Root-level C0**: source-text 대비 97% 적은 토큰으로 SS 대비 comprehensiveness 72%, diversity 62% win rate 유지 → "iterative sensemaking에 최적".

### 4.2 Experiment 2 — Claim-based metric

47,075개의 unique claim 추출(answer당 평균 31개). Comprehensiveness = answer당 평균 claim 수, Diversity = claim의 agglomerative clustering 군집 수(1-ROUGE-L distance threshold 0.5–0.8).

**Table 3 (평균 claim 수)**:
| Condition | News | Podcast |
|---|---|---|
| C0 | **34.18** | 32.21 |
| C1 | 32.50 | 32.20 |
| C2 | 31.62 | **32.46** |
| C3 | 33.14 | 32.28 |
| TS | 32.89 | 31.39 |
| SS | **25.23** | **26.50** |

→ 모든 global 조건(C0–C3, TS) > SS, p<.05.

**Alignment**: LLM 판정에서 majority 결정이 난 33%(comprehensiveness)·39%(diversity) 케이스 중, **78%·69–70%** 가 claim-based label과 동일 winner → 두 metric 정합성 moderate-strong.

### 4.3 운영 디테일

- **Configuration**: context window 8k token, indexing 281분(Podcast, 600-token chunk, Intel Xeon Platinum 8171M / 16GB RAM, GPT-4-turbo @ 2M TPM·10k RPM).
- **Context window ablation (Appendix C)**: 8k / 16k / 32k / 64k 비교, **8k가 comprehensiveness 평균 58.1% 승률**, diversity·empowerment는 동등. "lost in the middle"(Liu et al., 2023) 회피 차원에서 8k 채택.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **평가 일반화**: 2개 corpus(~1M 토큰)에 한정. 다른 도메인·use case로의 일반화 검증 필요.
- **Fabrication rate 미측정**: SelfCheckGPT(Manakul et al., 2023) 등 환각 평가 추가 필요.
- **Empowerment 약점**: vector RAG가 구체 인용/예시 제공에 강하므로, element extraction prompt 개선으로 인용 흔적을 graph index에 더 보존해야.
- **Hybrid RAG**: 향후 방향으로 (a) **embedding-based matching**으로 user query↔graph annotation 매칭, (b) **just-in-time community report generation**, (c) **roll-up/drill-down** mechanism으로 community hierarchy를 query 시점에 따라 위·아래로 탐색하는 hybrid scheme 제안. (실제로 후속 GraphRAG 구현에는 **DRIFT search**, **local search**, **global search** 등 다중 모드가 포함되어 있음 — `microsoft/graphrag` 문서 참조.)

## 6. 관련 연구 (Related Work)

논문 2절(Background)에서 다음 영역과의 차별점을 정리:

- **Vector RAG (canonical)**: Lewis et al., 2020; Ram et al., 2023; Gao et al., 2023 — top-k 유사도 retrieval. GraphRAG는 entire corpus sensemaking이 가능한 점에서 차별.
- **Advanced RAG / self-memory**: Cheng et al., 2024; Mao et al., 2020 — 대규모 source 영역 summary를 미리 만들어 활용하는 self-memory 패턴 위에 community summary를 얹음. Hierarchical indexing 측면에서 Kim et al., 2023; Sarthi et al., 2024 (RAPTOR)와 유사하지만 **graph-based community detection**으로 thematic partition을 한다는 점이 차별.
- **LLM × Knowledge graph**: Ban et al., 2023; Melnyk et al., 2022; Trajanoska et al., 2023; Yao et al., 2023; Zhang et al., 2024a 등 LLM 기반 KG 추출 계열. subgraph/graph element를 prompt에 직접 넣는 방식(Baek et al., 2023; He et al., 2024; Zhang, 2023) 또는 KG를 retrieval enhancer로 쓰는 방식(Wang et al., 2023b)이 있음. GraphRAG는 **graph modularity(Newman, 2006)와 Louvain(Blondel et al., 2008)/Leiden(Traag et al., 2019) hierarchical community 구조**를 활용한다는 점에서 구별.
- **Adaptive benchmarking**: Yuan et al., 2024; Zhang et al., 2024b — LLM이 도메인별 평가 질문을 동적으로 생성. persona-based 질문 생성은 Kosinski 2024; Salminen et al., 2024; Shin et al., 2024와 연속선상.
- **LLM-as-a-judge**: Zheng et al., 2024 (MT-Bench) 응용. 기존 QA benchmark(HotPotQA, MultiHop-RAG, MT-Bench)는 vector RAG 평가에 맞춰져 있어 global sensemaking 평가에 부적합 — 본 논문이 새 평가 절차 제시.

## 7. 용어집 (Glossary)

- **GraphRAG**: 본 논문이 제안한 graph-based RAG 방법론. LLM이 entity/relationship/claim을 추출 → KG 구축 → Leiden hierarchical community → community summary 사전 생성 → query 시 map-reduce로 global answer.
- **Sensemaking**: "사람들이 connections(사람·장소·사건)에 의미를 부여하여 trajectory를 예측하고 효과적으로 행동하기 위한 과정"(Klein et al., 2006). 본 논문의 평가 타겟인 **global sensemaking query** = corpus 전체를 종합해야만 답할 수 있는 질의(예: "데이터셋의 주요 테마는?", "지난 10년간 학제간 연구가 과학적 발견에 미친 핵심 동향은?").
- **Query-Focused Summarization (QFS)**: 특정 질의에 초점을 맞춘 corpus 요약. 기존 QFS는 RAG 규모에 scale 안 됨 → GraphRAG가 두 패러다임 결합.
- **Community Detection**: graph clustering의 한 종류로 밀집된 노드 집합 식별. modularity(community 내 edge ↑, 외 edge ↓) 최적화.
- **Louvain 알고리즘**(Blondel et al., 2008): Local Moving + Aggregation 2단계 greedy modularity 최적화. **disconnected community** 문제(같은 community 내 노드가 서로 연결 안 됨).
- **Leiden 알고리즘**(Traag et al., 2019): Louvain + Refinement 단계 추가로 모든 community의 내부 connectivity 보장. graspologic으로 구현, GraphRAG 기본.
- **Modularity**: community 구조의 quality 지표. random graph 대비 community 내부 edge 밀도.
- **Self-Reflection / Gleaning**: LLM에게 자기 답변을 평가하고 부족분을 추가 추출하게 하는 prompt engineering. `LOOP_PROMPT` (Y/N gate) + `CONTINUE_PROMPT` (missed entities) 조합.
- **Map-Reduce Global Answer**: community summary들에 대해 parallel partial answer 생성(map) + helpfulness score 기반 정렬·축약 후 final answer 생성(reduce).
- **Community Level (C0/C1/C2/C3)**: hierarchical community partition의 깊이. C0=root(가장 적고 추상도 높음), C3=가장 깊고 세밀. 실험상 C0가 토큰 대비 가장 효율적.
- **Helpfulness Score**: map 단계에서 LLM이 자기 partial answer에 매기는 0–100 점수. reduce에서 정렬 기준이 됨. score 0은 필터.
- **LLM-as-a-Judge**: Zheng et al., 2024. 두 답변을 LLM이 비교 평가하는 방식. ground truth 없는 평가에 사용.
- **Comprehensiveness / Diversity / Empowerment / Directness**: 본 논문의 4개 평가 기준. 앞 3개가 sensemaking 핵심, directness는 vector RAG에 유리하게 나오도록 설계된 control criterion.
- **Adaptive Benchmarking**: corpus description 기반 LLM persona·task·question 생성으로 도메인 특화 평가 benchmark를 동적으로 만드는 방법.
- **Claimify**(Metropolitansky and Larson, 2025): LLM 기반 factual claim 추출기. Experiment 2의 claim-based metric에서 사용.
- **Claim**: entity에 대한 verifiable fact(subject·object·type·status·date·source quote 포함). KG의 element 중 하나.
- **DRIFT (Dynamic Reasoning and Inference with Flexible Traversal)**: 본문 외 microsoft/graphrag 공식 코드에 추가된 후속 search 모드. 한국어 review 슬라이드의 conclusion에서 언급(논문 본문에는 미포함).
- **Lost in the Middle**(Liu et al., 2023; Kuratov et al., 2024): 긴 context window 중간 위치의 정보가 LLM에 의해 잘 활용되지 못하는 현상 — 8k 채택의 근거.
