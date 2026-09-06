---
title: "From Local to Global: A GraphRAG Approach to Query-Focused Summarization"
type: paper
year: 2024
category: database
raw_path: raw/papers/edge-2024-from-local-to-global.pdf
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
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/edge-2024-from-local-to-global/fig01.png
    raw: raw/papers/edge-2024-from-local-to-global-figures/fig01.png
    caption: "GraphRAG 파이프라인 전체 구조. 인덱싱 시점에 원본 문서를 text chunk, entity와 relationship, knowledge graph, graph community, community summary 순으로 변환하고, 질의 시점에 community answer를 거쳐 global answer를 만든다"
    page: 4
    bbox_norm: [0.2097, 0.0838, 0.7618, 0.3466]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/edge-2024-from-local-to-global/fig02.png
    raw: raw/papers/edge-2024-from-local-to-global-figures/fig02.png
    caption: "6개 조건의 head-to-head 승률 행렬. 두 데이터셋과 4개 평가 기준에서 행 조건이 열 조건을 이긴 비율(%)이며, 질문 125개를 5회 반복해 평균했다"
    page: 10
    bbox_norm: [0.1721, 0.1191, 0.8198, 0.4201]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/edge-2024-from-local-to-global/fig03.png
    raw: raw/papers/edge-2024-from-local-to-global-figures/fig03.png
    caption: "chunk 크기와 self-reflection 반복 횟수에 따른 entity reference 검출 수. HotPotQA 데이터셋과 gpt-4-turbo 기준이다"
    page: 18
    bbox_norm: [0.1708, 0.624, 0.8392, 0.8032]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/edge-2024-from-local-to-global/fig04.png
    raw: raw/papers/edge-2024-from-local-to-global-figures/fig04.png
    caption: "MultiHop-RAG 데이터셋에서 Leiden 알고리즘이 찾아낸 graph community. (a) modularity가 최대인 level 0 root community와 (b) 그 내부 구조를 드러내는 level 1 sub-community"
    page: 19
    bbox_norm: [0.1764, 0.0833, 0.8626, 0.3766]
    strategy: caption-region
    curated: true
  - id: tab01
    label: Table 1
    kind: table
    file: assets/edge-2024-from-local-to-global/tab01.png
    raw: raw/papers/edge-2024-from-local-to-global-figures/tab01.png
    caption: "corpus 설명만 주고 LLM이 생성한 사용자 persona, task, global sensemaking 질문의 예시"
    page: 7
    bbox_norm: [0.1667, 0.6765, 0.8724, 0.9164]
    strategy: table-region
    curated: false
  - id: tab02
    label: Table 2
    kind: table
    file: assets/edge-2024-from-local-to-global/tab02.png
    raw: raw/papers/edge-2024-from-local-to-global-figures/tab02.png
    caption: "조건별 context unit 개수와 토큰 수, 최대 토큰 대비 비율. root-level community summary는 원본 텍스트 요약 대비 토큰을 9배에서 43배 적게 쓴다"
    page: 10
    bbox_norm: [0.1667, 0.5794, 0.8363, 0.6757]
    strategy: table-region
    curated: false
  - id: tab03
    label: Table 3
    kind: table
    file: assets/edge-2024-from-local-to-global/tab03.png
    raw: raw/papers/edge-2024-from-local-to-global-figures/tab03.png
    caption: "조건별, 데이터셋별 답변당 평균 claim 개수. Claimify로 추출한 comprehensiveness 지표다"
    page: 11
    bbox_norm: [0.3072, 0.119, 0.6887, 0.2634]
    strategy: table-region
    curated: false
  - id: tab04
    label: Table 4
    kind: table
    file: assets/edge-2024-from-local-to-global/tab04.png
    raw: raw/papers/edge-2024-from-local-to-global-figures/tab04.png
    caption: "거리 임계값 4개 구간에서 잰 claim 군집 수 평균. agglomerative clustering으로 계산한 diversity 지표다"
    page: 12
    bbox_norm: [0.169, 0.119, 0.8269, 0.2973]
    strategy: table-region
    curated: false
  - id: tab05
    label: Table 5
    kind: table
    file: assets/edge-2024-from-local-to-global/tab05.png
    raw: raw/papers/edge-2024-from-local-to-global-figures/tab05.png
    caption: "News 데이터셋 질문 하나에 대한 GraphRAG 답변과 vector RAG 답변, 그리고 4개 기준별 LLM 판정 근거의 전문"
    page: 20
    bbox_norm: [0.1667, 0.1442, 0.8724, 0.8333]
    strategy: table-region
    curated: false
  - id: tab06
    label: Table 6
    kind: table
    file: assets/edge-2024-from-local-to-global/tab06.png
    raw: raw/papers/edge-2024-from-local-to-global-figures/tab06.png
    caption: "6개 조건 쌍별 비교의 통계 분석 전문. Wilcoxon 부호순위 검정에 Holm-Bonferroni 보정을 적용한 평균 점수와 p-value다"
    page: 26
    bbox_norm: [0.1667, 0.2381, 0.8378, 0.6696]
    strategy: table-region
    curated: false
---

## 한 줄 요약 (One-line Summary)

Microsoft Research가 제안한 **GraphRAG**는 LLM으로 source corpus에서 entity와 relationship의 knowledge graph를 만들고, Leiden 알고리즘으로 hierarchical community partition을 구성한 뒤 community summary를 미리 생성해 둔다. 질의가 들어오면 community별로 partial answer를 만들고 map-reduce로 global answer를 합성한다. 약 100만 토큰 규모 corpus의 **query-focused summarization(sensemaking) 질의**에서 vector RAG 대비 comprehensiveness와 diversity 모두 승률 72~83%로 앞서고, root-level summary(C0)는 source text 대비 토큰을 9배에서 43배 줄이면서도 우위를 유지한다.

## 1. 자료 정보 (Document Information)

- **제목**: From Local to Global: A GraphRAG Approach to Query-Focused Summarization
- **저자**: Darren Edge†, Ha Trinh† (공동 1저자), Newman Cheng, Joshua Bradley, Alex Chao, Apurva Mody, Steven Truitt, Dasha Metropolitansky, Robert Osazuwa Ness, Jonathan Larson
- **소속**: Microsoft Research (Edge, Trinh, Metropolitansky, Ness, Larson), Microsoft Strategic Missions and Technologies (Cheng, Bradley, Truitt), Microsoft Office of the CTO (Chao, Mody)
- **arXiv**: 2404.16130 (v1: 2024-04-24, v2: 2025-02-19). 표지에 "Preprint. Under review"로 표기
- **공식 코드**: https://github.com/microsoft/graphrag (MIT License)
- **공식 문서**: https://microsoft.github.io/graphrag/
- **확장**: LangChain, LlamaIndex, NebulaGraph, Neo4J에 통합되어 있다 (논문 1절)
- **분량**: arXiv v2 기준 26페이지 (본문과 Appendix A부터 G까지)
- **위치**: `raw/papers/edge-2024-from-local-to-global.pdf`

## 2. 주요 기여 (Key Contributions)

논문이 스스로 밝힌 **메인 컨트리뷰션은 GraphRAG 메서드 자체와, 그것이 전체 corpus에 대한 global sensemaking을 수행할 수 있다는 능력**이다 (논문 1절). 세부 기여는 다음 다섯 가지다.

1. **GraphRAG 파이프라인 제안**: LLM 기반 (a) entity, relationship, claim 추출, (b) knowledge graph 구축, (c) Leiden hierarchical community detection, (d) bottom-up community summary 사전 생성, (e) map-reduce query answering을 잇는 end-to-end graph-based RAG.
2. **Global sensemaking 평가 프레임워크**: ground truth가 없는 broad-theme 질문을 대상으로 한 **LLM-as-a-judge 응용**. corpus description으로부터 LLM이 K개 persona, N개 task, M개 question(K=N=M=5, 총 125문항)을 자동 생성하고, comprehensiveness, diversity, empowerment 3개 기준에 directness 통제 기준을 더해 두 시스템의 답변을 head-to-head로 비교한다.
3. **두 개의 100만 토큰급 코퍼스에서 정량 비교**: Podcast transcripts(약 100만 토큰), News articles(약 170만 토큰)에서 vector RAG(SS) 대비 모든 graph-based 조건이 comprehensiveness와 diversity 우위. root-level summary(C0)는 source text 대비 **97% 적은 토큰**으로도 우위를 유지해, sensemaking 활동에 최적화된 efficiency와 quality의 균형점을 제시한다.
4. **self-reflection, hierarchical community, chunk size 상충 등 운영 세부 공개**: chunk size를 600에서 2400 토큰으로 키우면 entity 추출량이 거의 절반으로 줄어든다. 이를 self-reflection 프롬프트(`CONTINUE_PROMPT`, `LOOP_PROMPT`)로 다시 물어 보완해, 큰 chunk와 낮은 LLM 호출 비용과 추출 품질을 동시에 확보한다.
5. **Claim 기반 2차 검증(Experiment 2)**: Claimify(Metropolitansky and Larson, 2025)로 답변에서 factual claim을 추출해, 평균 claim 개수(comprehensiveness)와 1-ROUGE-L 거리 기반 agglomerative clustering 군집 수(diversity)를 측정한다. **C0부터 C3까지 모두 SS 대비 p<.05로 유의하게 우수**하며, LLM 판정과 comprehensiveness 78%, diversity 69~70%로 일치한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

GraphRAG는 **인덱싱 단계(indexing time)** 와 **쿼리 단계(query time)** 두 부분으로 나뉜다. 모든 LLM 호출은 GPT-4-turbo로 통일했다.

### 3.1 Indexing (Source Documents에서 Community Summaries까지)

**3.1.1 Source documents에서 text chunks로**
- 원본 문서를 고정 크기 chunk로 분할한다 (실험 설정은 600 토큰에 100 토큰 overlap).
- chunk가 크면 LLM 호출은 줄지만 chunk 앞부분 정보의 recall이 떨어진다. Appendix Figure 3은 self-reflection 반복 횟수와 chunk 크기별 추출 entity 수의 상충을 보여준다. 600 토큰일 때 2400 토큰 대비 약 2배를 추출한다.

**3.1.2 Text chunks에서 element instance(entity, relationship, claim)로**
- LLM에 entity type 목록과 함께 multipart 프롬프트를 넣는다 (Appendix E.1). 예시 entity는 `("entity"|FED|ORGANIZATION|The Fed is the Federal Reserve...)`, 예시 relationship은 `("relationship"|JEROME POWELL|FED|...|9)` 형식이다. relationship에는 강도 점수가 붙는다.
- few-shot 예시를 과학, 의학, 법률 등 도메인 특화 예시로 교체해 in-context learning으로 적응시킬 수 있다.
- **Claim 추출**: subject, object, claim type, status(TRUE/FALSE/SUSPECTED), date range, source quote를 별도 프롬프트로 추출한다. claim은 entity에 대한 중요한 fact, 즉 날짜, 이벤트, 다른 entity와의 상호작용을 가리킨다.
- **Self-reflection**: gleaning 절차로 놓친 entity를 다시 추출한다. `LOOP_PROMPT`로 LLM이 "추가할 entity가 남았는가"를 Y/N으로 판정하게 하고(logit bias 100으로 강제), Y면 `CONTINUE_PROMPT`로 "MANY entities were missed"라고 알려 추가 추출을 유도한다. 덕분에 chunk를 키워도 품질이 유지된다.

**3.1.3 Element instance에서 knowledge graph로**
- 같은 entity, relationship, claim에 대한 중복 instance를 묶어 **하나의 node와 edge로 통합**하면서 description을 LLM이 요약한다.
- relationship 중복 횟수가 **edge weight**가 된다.
- entity matching은 단순 exact string match를 썼다. soft matching도 가능하지만, 뒤따르는 community 단계가 중복에 robust하므로 필수는 아니다.

**3.1.4 Knowledge graph에서 graph community로**
- **Leiden 알고리즘**(Traag et al., 2019)으로 hierarchical community detection을 수행한다. 구현은 graspologic 라이브러리다. 더 나눌 수 없는 leaf community에 도달할 때까지 재귀적으로 sub-community를 찾는다.
- 각 level의 community partition은 상호 배타적이면서 전체를 덮으므로(mutually exclusive, collectively exhaustive) divide-and-conquer 방식의 global summarization이 가능하다.
- Appendix Figure 4는 MultiHop-RAG 데이터셋 위에서 OpenORD와 Force Atlas 2 레이아웃으로 시각화한 결과다. level 0(root)과 level 1의 색상이 다르게 분화한다.

**3.1.5 Graph community에서 community summary로**
- 각 community를 **report 형태로 요약**한다 (Appendix E.2). 구성은 TITLE, SUMMARY, IMPACT SEVERITY RATING(0~10 실수), RATING EXPLANATION, DETAILED FINDINGS(5~10개 insight)다. 각 insight에는 `[Data: Entities (5), Relationships (37, 38)]` 형태의 근거 참조를 달게 하는 grounding rule이 붙는다.
- **Leaf-level**: edge를 source와 target node의 combined degree 내림차순으로 정렬한 뒤, source description, target description, edge description, 관련 claim을 token limit까지 채운다.
- **Higher-level**: 가능하면 sub-community의 element summary를 그대로 쓰고, 토큰이 초과하면 element summary 토큰 수가 큰 sub-community부터 그 sub-community의 짧은 summary로 치환해 context window에 맞춘다.

### 3.2 Query Time (Community Summaries에서 Global Answer까지)

특정 community level이 주어지면 다음 순서로 답한다.

- **Prepare**: 해당 level의 community summary를 **무작위로 섞고**(중요 정보가 한 chunk에 몰려 사라지지 않게) 사전 정의된 토큰 크기로 자른다.
- **Map (community answers)**: 각 chunk에 대해 LLM이 partial answer와 **helpfulness score 0~100**(질문에 얼마나 도움이 되는지)을 병렬로 생성한다. score 0은 필터링한다.
- **Reduce (global answer)**: helpfulness score 내림차순으로 partial answer를 token limit까지 새 컨텍스트에 누적한 뒤 최종 답변 1개를 생성한다.

### 3.3 Global Sensemaking Question Generation (평가 데이터셋 합성)

ground truth가 없는 sensemaking 평가용 질문을 corpus 본문이 아니라 **corpus description**에서 LLM으로 생성한다. corpus 자체에서 뽑으면 공정한 평가가 되지 않기 때문이다.

- Algorithm 1: K개 persona를 만들고, persona당 N개 task를 정하고, (persona, task) 조합당 M개 question을 생성한다.
- K=N=M=5로 두어 데이터셋당 125개 test question을 얻었다.
- 논문 Table 1의 예시는 podcast 쪽에서 "tech journalist" persona와 "기술 리더가 정책과 규제를 어떻게 보는가" task, 그리고 "어느 에피소드가 tech policy를 주로 다루는가" 같은 질문이다.

### 3.4 Evaluation Criteria (Appendix F)

LLM judge에 question, answer1, answer2, criterion을 주고 winner(1/2/0)와 reasoning을 JSON으로 산출하게 한다.

- **Comprehensiveness**: 답변이 질문의 모든 측면을 얼마나 상세히 다루는가.
- **Diversity**: 답변이 얼마나 다양한 관점과 통찰을 제공하는가.
- **Empowerment**: 답변이 독자의 이해와 informed judgment를 얼마나 돕는가.
- **Directness (control)**: 답변이 얼마나 구체적이고 간결하게 질문에 답하는가. comprehensiveness, diversity와 반대 방향이라 reference로 쓴다.

각 비교를 5회 반복하고 평균한다. directness가 vector RAG에 유리하게 나오는 것 자체가 평가 절차의 validity check 역할을 한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 Experiment 1 (LLM judge head-to-head)

**비교 조건 6개**

- `SS` (Semantic Search, vector RAG baseline)
- `TS` (Text Summarization, map-reduce를 source text에 직접 적용)
- `C0` (root-level community summary), `C1` (high-level), `C2` (intermediate), `C3` (low-level)

여섯 조건의 context window 크기와 답변 생성 프롬프트는 동일하다. 컨텍스트를 무엇으로 채우는지만 다르다.

**Graph 통계**

- Podcast: node 8,564개, edge 20,691개
- News: node 15,754개, edge 19,520개

**Context unit 크기 (Table 2)**

| | C0 | C1 | C2 | C3 | TS |
|---|---|---|---|---|---|
| Podcast units | 34 | 367 | 969 | 1,310 | 1,669 |
| Podcast tokens | 26,657 | 225,756 | 565,720 | 746,100 | 1,014,611 |
| Podcast %max | **2.6** | 22.2 | 55.8 | 73.5 | 100 |
| News units | 55 | 555 | 1,797 | 2,142 | 3,197 |
| News tokens | 39,770 | 352,641 | 980,898 | 1,140,266 | 1,707,694 |
| News %max | **2.3** | 20.7 | 57.4 | 66.8 | 100 |

**C0(root)는 source text의 9배에서 43배 적은 토큰만으로 동등 이상의 성능을 낸다**는 점이 GraphRAG의 핵심 efficiency 주장이다.

**승률 (Figure 2)**, 행에서 열로 읽는 승률 %:

Podcast Comprehensiveness

- SS가 [TS, C0, C1, C2, C3]를 상대로 [17, 28, 25, 22, 21]. 모든 graph 조건이 SS를 크게 앞선다.
- C2 대 C1, C3 대 C2 등 graph 조건끼리는 50% 부근이다.

Podcast Diversity

- SS가 [TS, C0, C1, C2, C3]를 상대로 [18, 23, 25, 19, 19]. 역시 graph 조건 우위다.

Empowerment와 Directness

- Empowerment는 혼조다. SS가 directness에서는 자기 강점을 유지해 통제 기준이 의도대로 작동함을 확인해 준다.

**핵심 정량 (Section 5.1)**

- global 조건의 comprehensiveness 승률은 SS 대비 Podcast에서 **72~83%** (p<.001), News에서 **72~80%** (p<.001)다.
- diversity 승률은 Podcast **75~82%** (p<.001), News **62~71%** (p<.01)다.
- community summary 대 source text(`TS`) 비교에서도 Podcast는 intermediate level이 57% (p<.001), News는 low-level이 64% (p<.001)로 앞선다. community summary가 raw text보다 질의에 더 잘 부합하는 정보 응축을 제공한다는 뜻이다. 같은 비교의 diversity 승률은 Podcast intermediate 57% (p=.036), News low-level 60% (p<.001)다.
- 토큰 절감 폭은 level에 따라 다르다. C3는 TS 대비 26~33% 적고, C0는 97% 넘게 적다.
- **Root-level C0**: source text 대비 97% 적은 토큰으로 SS 대비 comprehensiveness 72%, diversity 62% 승률을 유지한다. 반복 질의가 이어지는 sensemaking 활동에 특히 적합하다.

### 4.2 Experiment 2 (claim 기반 지표)

Claimify로 47,075개의 unique claim을 추출했고 답변당 평균 31개다. Comprehensiveness는 답변당 평균 claim 수로, Diversity는 claim을 agglomerative clustering(complete linkage, 거리 지표 1-ROUGE-L, 임계값 0.5~0.8)한 군집 수로 측정했다.

**Table 3 (평균 claim 수)**

| Condition | News | Podcast |
|---|---|---|
| C0 | **34.18** | 32.21 |
| C1 | 32.50 | 32.20 |
| C2 | 31.62 | **32.46** |
| C3 | 33.14 | 32.28 |
| TS | 32.89 | 31.39 |
| SS | **25.23** | **26.50** |

모든 global 조건(C0부터 C3까지, 그리고 TS)이 SS를 앞서며 p<.05로 유의하다.

**Table 4 (군집 수)**: Podcast에서는 모든 global 조건이 모든 임계값에서 SS보다 유의하게 다양하다. News에서는 C0만 모든 임계값에서 유의했고, C1부터 C3는 평균 군집 수가 SS보다 높았지만 일부 임계값에서만 유의했다. 임계값 0.5 기준 News는 C0 23.42 대 SS 17.92, Podcast는 C0 23.16 대 SS 18.55다.

**Alignment**: LLM 판정에서 다수결이 성립한 33%(comprehensiveness)와 39%(diversity)의 케이스 중 **78%와 69~70%** 가 claim 기반 라벨과 같은 승자를 골랐다. 두 지표의 정합성이 중간에서 강한 수준이라는 뜻이다.

### 4.3 운영 세부

- **Configuration**: context window 8,000 토큰, Podcast 인덱싱 281분 (600 토큰 chunk, Intel Xeon Platinum 8171M, RAM 16GB, GPT-4-turbo 분당 200만 토큰과 분당 요청 1만 건 한도).
- **Context window ablation (Appendix C)**: 8,000 / 1만 6,000 / 3만 2,000 / 6만 4,000 토큰을 비교했다. **가장 작은 8,000 토큰이 comprehensiveness 평균 승률 58.1%** 로 모든 비교에서 우세했고, diversity 52.4%와 empowerment 51.3%로 큰 컨텍스트와 동등했다. "lost in the middle"(Liu et al., 2023) 회피 차원에서 8,000 토큰을 채택했다.
- **통계 처리 (Appendix G)**: Shapiro-Wilk 검정에서 정규성이 기각되어 비모수 검정인 Wilcoxon 부호순위 검정을 썼고, 다중 비교 보정으로 Holm-Bonferroni를 적용했다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **평가 일반화**: 약 100만 토큰 규모 corpus 2개에 한정된다. 다른 도메인과 use case로의 일반화 검증이 필요하다.
- **Fabrication rate 미측정**: SelfCheckGPT(Manakul et al., 2023) 같은 환각 평가를 더해야 분석이 강화된다.
- **Empowerment 약점**: vector RAG가 구체적인 인용과 예시 제공에 강하므로, element extraction 프롬프트를 개선해 인용 흔적을 graph index에 더 보존해야 한다.
- **Hybrid RAG**: 향후 방향으로 (a) **임베딩 기반 매칭**으로 사용자 질의와 graph annotation을 잇는 방식, (b) **just-in-time community report generation**, (c) community hierarchy를 질의 시점에 위아래로 오가는 **roll-up과 drill-down** 방식을 제안한다. 실제로 후속 GraphRAG 구현에는 **DRIFT search**, **local search**, **global search** 등 다중 모드가 포함되었다 (`microsoft/graphrag` 문서 참조).
- **Broader impacts**: 생성된 답변이 원본을 정확히 대표하지 못하면 후속 의사결정에 위험이 된다. 논문은 AI 사용 사실과 오류 가능성을 명시하라고 권고하면서, 검색된 사실 몇 개를 전체 요약처럼 제시하는 vector RAG보다는 GraphRAG가 이 위험을 줄인다고 본다.

## 6. 관련 연구 (Related Work)

논문 2절(Background)에서 다음 영역과의 차별점을 정리한다.

- **Vector RAG (canonical)**: Lewis et al., 2020; Ram et al., 2023; Gao et al., 2023의 top-k 유사도 retrieval. GraphRAG는 corpus 전체를 대상으로 한 sensemaking이 가능하다는 점에서 다르다.
- **Advanced RAG와 self-memory**: Cheng et al., 2024; Mao et al., 2020의 self-memory 패턴 위에 community summary를 결합한다. hierarchical indexing 측면에서는 Kim et al., 2023과 Sarthi et al., 2024(RAPTOR)와 유사하지만, **graph 기반 community detection으로 주제 단위 partition을 만든다**는 점이 다르다.
- **LLM과 knowledge graph**: Ban et al., 2023; Melnyk et al., 2022; Trajanoska et al., 2023; Yao et al., 2023; Zhang et al., 2024a 등 LLM 기반 KG 추출 계열이 있다. subgraph나 graph element를 프롬프트에 직접 넣는 방식(Baek et al., 2023; He et al., 2024; Zhang, 2023)과 KG를 retrieval enhancer로 쓰는 방식(Wang et al., 2023b)도 있다. GraphRAG는 **graph modularity(Newman, 2006)와 Louvain(Blondel et al., 2008), Leiden(Traag et al., 2019)의 hierarchical community 구조**를 활용한다는 점에서 구별된다.
- **Adaptive benchmarking**: Yuan et al., 2024; Zhang et al., 2024b처럼 LLM이 도메인별 평가 질문을 동적으로 생성하는 흐름이다. persona 기반 질문 생성은 Kosinski 2024; Salminen et al., 2024; Shin et al., 2024와 연속선상에 있다.
- **LLM-as-a-judge**: Zheng et al., 2024(MT-Bench)의 응용이다. 기존 QA benchmark(HotPotQA, MultiHop-RAG, MT-Bench)는 vector RAG 평가에 맞춰져 있어 global sensemaking 평가에 부적합하다. 그래서 본 논문이 새 평가 절차를 제시한다. RAGAS(Es et al., 2023)의 context relevance, faithfulness, answer relevance 같은 기준도 global sensemaking에는 맞지 않는다고 본다.

## 7. 용어집 (Glossary)

- **GraphRAG**: 본 논문이 제안한 graph 기반 RAG 방법론. LLM이 entity, relationship, claim을 추출해 KG를 만들고, Leiden hierarchical community를 나눈 뒤 community summary를 사전 생성하고, 질의 시 map-reduce로 global answer를 만든다.
- **Sensemaking**: "사람들이 사람, 장소, 사건 사이의 connection에 의미를 부여해 그 흐름을 예측하고 효과적으로 행동하기 위한 과정"(Klein et al., 2006). 본 논문의 평가 대상인 **global sensemaking query**는 corpus 전체를 종합해야만 답할 수 있는 질의다. 예를 들어 "데이터셋의 주요 테마는 무엇인가", "지난 10년간 학제간 연구가 과학적 발견에 미친 핵심 동향은 무엇인가" 같은 질문이다.
- **Query-Focused Summarization (QFS)**: 특정 질의에 초점을 맞춘 corpus 요약. 기존 QFS는 RAG가 다루는 규모로 확장되지 않았고, GraphRAG가 두 패러다임을 결합한다.
- **Community Detection**: graph clustering의 한 종류로 밀집된 node 집합을 식별한다. modularity(community 내부 edge는 많고 외부 edge는 적은 정도)를 최적화한다.
- **Louvain 알고리즘**(Blondel et al., 2008): Local Moving과 Aggregation 2단계로 modularity를 greedy하게 최적화한다. 같은 community 안의 node가 서로 연결되지 않는 disconnected community 문제가 있다.
- **Leiden 알고리즘**(Traag et al., 2019): Louvain에 Refinement 단계를 더해 모든 community의 내부 연결성을 보장한다. graspologic으로 구현되며 GraphRAG의 기본값이다.
- **Modularity**: community 구조의 품질 지표. 무작위 graph 대비 community 내부 edge 밀도를 잰다.
- **Self-Reflection / Gleaning**: LLM에게 자기 출력을 평가하고 부족분을 추가 추출하게 하는 프롬프트 기법. `LOOP_PROMPT`(Y/N 게이트)와 `CONTINUE_PROMPT`(놓친 entity 추출)의 조합이다.
- **Map-Reduce Global Answer**: community summary들에 대해 partial answer를 병렬 생성(map)하고, helpfulness score 기준으로 정렬해 축약한 뒤 최종 답변을 생성(reduce)한다.
- **Community Level (C0/C1/C2/C3)**: hierarchical community partition의 깊이. C0는 root로 개수가 가장 적고 추상도가 높으며, C3는 가장 깊고 세밀하다. 실험상 C0가 토큰 대비 가장 효율적이다.
- **Helpfulness Score**: map 단계에서 LLM이 자기 partial answer에 매기는 0~100점. reduce 단계의 정렬 기준이 되고 0점은 필터링된다.
- **LLM-as-a-Judge**: Zheng et al., 2024. 두 답변을 LLM이 비교 평가하는 방식으로, ground truth가 없는 평가에 쓴다.
- **Comprehensiveness / Diversity / Empowerment / Directness**: 본 논문의 4개 평가 기준. 앞의 셋이 sensemaking의 핵심이고, directness는 vector RAG에 유리하게 나오도록 설계한 control criterion이다.
- **Adaptive Benchmarking**: corpus description을 기반으로 LLM이 persona, task, question을 생성해 도메인 특화 평가 벤치마크를 동적으로 만드는 방법.
- **Claimify**(Metropolitansky and Larson, 2025): LLM 기반 factual claim 추출기. Experiment 2의 claim 기반 지표에서 사용한다.
- **Claim**: entity에 대해 검증 가능한 fact로, subject, object, type, status, date, source quote를 포함한다. KG의 element 중 하나다.
- **DRIFT (Dynamic Reasoning and Inference with Flexible Traversal)**: 논문 본문에는 없고 microsoft/graphrag 공식 코드에 추가된 후속 search 모드. 한국어 review 슬라이드의 결론에서 언급된다.
- **Lost in the Middle**(Liu et al., 2023; Kuratov et al., 2024): 긴 context window의 중간 위치 정보가 LLM에 잘 활용되지 못하는 현상. context window 8,000 토큰 채택의 근거다.

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 4 | "GraphRAG 파이프라인 전체 구조 (인덱싱과 질의 두 단계)" | caption-region | ★ wiki 권장 (architecture) |
| fig02 | 10 | "6개 조건의 head-to-head 승률 행렬" | caption-region | ★ wiki 권장 (result) |
| fig03 | 18 | "chunk 크기와 self-reflection 반복별 entity 검출 수" | caption-region | ★ wiki 권장 (method) |
| fig04 | 19 | "Leiden community 시각화 (level 0과 level 1)" | caption-region | ★ wiki 권장 (method) |
| tab01 | 7 | "persona, task, question 생성 예시" | table-region | 본문 표로 재작성 |
| tab02 | 10 | "조건별 context unit과 토큰 수" | table-region | 본문 표로 재작성 |
| tab03 | 11 | "조건별 평균 claim 개수" | table-region | 본문 표로 재작성 |
| tab04 | 12 | "거리 임계값별 claim 군집 수" | table-region | 본문 표로 재작성 |
| tab05 | 20 | "질문 하나의 답변과 LLM 판정 전문" | table-region | (확인 필요, 면적비 0.49로 큼) |
| tab06 | 26 | "쌍별 비교 통계 분석 전문" | table-region | 본문 표로 부분 재작성 |
