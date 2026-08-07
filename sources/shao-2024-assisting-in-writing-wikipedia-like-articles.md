---
title: "Assisting in Writing Wikipedia-like Articles From Scratch with Large Language Models"
type: paper
year: 2024
category: agents
raw_path: /Users/sguys99/Desktop/project/ai-wiki/raw/papers/shao-2024-assisting-in-writing-wikipedia-like-articles.pdf
raw_filename: "shao-2024-assisting-in-writing-wikipedia-like-articles.pdf"
source_collection: external
authors: "Yijia Shao, Yucheng Jiang, Theodore A. Kanell, Peter Xu, Omar Khattab, Monica S. Lam"
arxiv_id: "2402.14207"
tags: [storm, long-form-generation, pre-writing, multi-perspective, question-asking, rag, grounded-writing, dspy, wikipedia, outline]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/shao-2024-assisting-in-writing-wikipedia-like-articles/fig01.png
    raw: raw/papers/shao-2024-assisting-in-writing-wikipedia-like-articles-figures/fig01.png
    caption: "Wikipedia-like 글쓰기 개요 — pre-writing 단계와 Direct Prompting(A)/Perspective-Guided(B)/Conversational(C) 질문 비교 (paper Figure 1)"
    page: 1
    bbox_norm: [0.5134, 0.2541, 0.8798, 0.6203]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/shao-2024-assisting-in-writing-wikipedia-like-articles/fig02.png
    raw: raw/papers/shao-2024-assisting-in-writing-wikipedia-like-articles-figures/fig02.png
    caption: "STORM 전체 파이프라인 — 관점 발견(①②) → 시뮬레이션 대화(③-⑥) → outline 생성(⑦⑧) (paper Figure 2)"
    page: 4
    bbox_norm: [0.128, 0.077, 0.8698, 0.3105]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/shao-2024-assisting-in-writing-wikipedia-like-articles/fig03.png
    raw: raw/papers/shao-2024-assisting-in-writing-wikipedia-like-articles-figures/fig03.png
    caption: "Wikipedia 편집자 10명의 STORM 유용성 설문 결과 (paper Figure 3)"
    page: 8
    bbox_norm: [0.109, 0.077, 0.4939, 0.2061]
    strategy: caption-region
    curated: false
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/shao-2024-assisting-in-writing-wikipedia-like-articles/fig04.png
    raw: raw/papers/shao-2024-assisting-in-writing-wikipedia-like-articles-figures/fig04.png
    caption: "Figure 4: Evolution of reference count in the Wikipedia article editing process."
    page: 14
    bbox_norm: [0.109, 0.2048, 0.4934, 0.4142]
    strategy: caption-region
    curated: false
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/shao-2024-assisting-in-writing-wikipedia-like-articles/fig05.png
    raw: raw/papers/shao-2024-assisting-in-writing-wikipedia-like-articles-figures/fig05.png
    caption: "Figure 5: Distribution of edit counts for Wikipedia arti- cles in our experiments ( n = 100 )."
    page: 14
    bbox_norm: [0.5042, 0.077, 0.8894, 0.2537]
    strategy: caption-region
    curated: false
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/shao-2024-assisting-in-writing-wikipedia-like-articles/fig06.png
    raw: raw/papers/shao-2024-assisting-in-writing-wikipedia-like-articles-figures/fig06.png
    caption: "인용 미지원 문장의 오류 유형 분포 파이차트 (paper Figure 6)"
    page: 17
    bbox_norm: [0.5067, 0.6331, 0.8802, 0.8546]
    strategy: caption-region
    curated: false
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/shao-2024-assisting-in-writing-wikipedia-like-articles/fig07.png
    raw: raw/papers/shao-2024-assisting-in-writing-wikipedia-like-articles-figures/fig07.png
    caption: "Figure 7: Screenshot of the web application for evaluating the grounded article."
    page: 22
    bbox_norm: [0.109, 0.3477, 0.8896, 0.6284]
    strategy: caption-region
    curated: false
  - id: tab01
    label: Table 1
    kind: table
    file: assets/shao-2024-assisting-in-writing-wikipedia-like-articles/tab01.png
    raw: raw/papers/shao-2024-assisting-in-writing-wikipedia-like-articles-figures/tab01.png
    caption: "Table 1: Comparison of different Wikipedia generation setups in existing literature. Generating one paragraph does not need an article outline."
    page: 3
    bbox_norm: [0.109, 0.0754, 0.8942, 0.1888]
    strategy: table-region
    curated: false
  - id: tab02
    label: Table 2
    kind: table
    file: assets/shao-2024-assisting-in-writing-wikipedia-like-articles/tab02.png
    raw: raw/papers/shao-2024-assisting-in-writing-wikipedia-like-articles-figures/tab02.png
    caption: "Table 2: Results of automatic article quality evaluation. † denotes significant differences ( p < 0 . 05 ) from a paired t -test between STORM and the best baseline, i.e. , oRAG. The rubric grading uses a 1-5 scale."
    page: 6
    bbox_norm: [0.109, 0.0775, 0.8873, 0.2001]
    strategy: table-region
    curated: false
  - id: tab03
    label: Table 3
    kind: table
    file: assets/shao-2024-assisting-in-writing-wikipedia-like-articles/tab03.png
    raw: raw/papers/shao-2024-assisting-in-writing-wikipedia-like-articles-figures/tab03.png
    caption: "Table 3: Results of outline quality evaluation (%). † de- notes significant differences ( p < 0 . 05 ) from a paired t -test between STORM and baselines."
    page: 6
    bbox_norm: [0.109, 0.2467, 0.4922, 0.4621]
    strategy: table-region
    curated: false
  - id: tab04
    label: Table 4
    kind: table
    file: assets/shao-2024-assisting-in-writing-wikipedia-like-articles/tab04.png
    raw: raw/papers/shao-2024-assisting-in-writing-wikipedia-like-articles-figures/tab04.png
    caption: "Table 4: Citation quality judged by Mistral 7B-Instruct."
    page: 7
    bbox_norm: [0.109, 0.1467, 0.891, 0.2021]
    strategy: table-region
    curated: false
  - id: tab05
    label: Table 5
    kind: table
    file: assets/shao-2024-assisting-in-writing-wikipedia-like-articles/tab05.png
    raw: raw/papers/shao-2024-assisting-in-writing-wikipedia-like-articles-figures/tab05.png
    caption: "Table 5: Average number of unique references ( |R| ) collected using different methods."
    page: 7
    bbox_norm: [0.109, 0.1467, 0.891, 0.2021]
    strategy: table-region
    curated: false
  - id: tab06
    label: Table 6
    kind: table
    file: assets/shao-2024-assisting-in-writing-wikipedia-like-articles/tab06.png
    raw: raw/papers/shao-2024-assisting-in-writing-wikipedia-like-articles-figures/tab06.png
    caption: "Table 6: Human evaluation results on 20 pairs of articles generated by STORM and oRAG . Each pair of articles is evaluated by two Wikipedia editors. The ratings are given on a scale between 1 and 7, with values ≥ 4 indicating good quality (see Table 10 ). We conduct paired t -test and report the p -"
    page: 7
    bbox_norm: [0.5042, 0.0774, 0.891, 0.2021]
    strategy: table-region
    curated: false
  - id: tab07
    label: Table 7
    kind: table
    file: assets/shao-2024-assisting-in-writing-wikipedia-like-articles/tab07.png
    raw: raw/papers/shao-2024-assisting-in-writing-wikipedia-like-articles-figures/tab07.png
    caption: "Table 7: Statistics of the dataset used in our experiments."
    page: 14
    bbox_norm: [0.1365, 0.0775, 0.4646, 0.1741]
    strategy: table-region
    curated: false
  - id: tab08
    label: Table 8
    kind: table
    file: assets/shao-2024-assisting-in-writing-wikipedia-like-articles/tab08.png
    raw: raw/papers/shao-2024-assisting-in-writing-wikipedia-like-articles-figures/tab08.png
    caption: "Table 8: Scoring rubrics on a 1-5 scale for the evaluator LLM."
    page: 18
    bbox_norm: [0.109, 0.1658, 0.8881, 0.4707]
    strategy: table-region
    curated: false
  - id: tab09
    label: Table 9
    kind: table
    file: assets/shao-2024-assisting-in-writing-wikipedia-like-articles/tab09.png
    raw: raw/papers/shao-2024-assisting-in-writing-wikipedia-like-articles-figures/tab09.png
    caption: "Table 9: Examples of different error types of unsupported sentences."
    page: 18
    bbox_norm: [0.109, 0.6694, 0.8883, 0.8103]
    strategy: table-region
    curated: false
  - id: tab10
    label: Table 10
    kind: table
    file: assets/shao-2024-assisting-in-writing-wikipedia-like-articles/tab10.png
    raw: raw/papers/shao-2024-assisting-in-writing-wikipedia-like-articles-figures/tab10.png
    caption: "Table 10: Scoring rubrics on a 1-7 scale for human evaluation."
    page: 20
    bbox_norm: [0.109, 0.2266, 0.8879, 0.7495]
    strategy: table-region
    curated: false
  - id: tab11
    label: Table 11
    kind: table
    file: assets/shao-2024-assisting-in-writing-wikipedia-like-articles/tab11.png
    raw: raw/papers/shao-2024-assisting-in-writing-wikipedia-like-articles-figures/tab11.png
    caption: "Table 11: Summary of major issues found on articles produced by STORM."
    page: 21
    bbox_norm: [0.1793, 0.2634, 0.8811, 0.7134]
    strategy: table-region
    curated: false
  - id: tab12
    label: Table 12
    kind: table
    file: assets/shao-2024-assisting-in-writing-wikipedia-like-articles/tab12.png
    raw: raw/papers/shao-2024-assisting-in-writing-wikipedia-like-articles-figures/tab12.png
    caption: "Table 12: STORM’s generated article for “Taylor Hawkins”. “#”, “##” indicate the section title and subsection title respectively. Numbers in brackets indicate the cited references."
    page: 27
    bbox_norm: [0.0971, 0.0, 0.9133, 0.3867]
    strategy: column-band
    curated: false
---

## 한 줄 요약 (One-line Summary)

STORM은 LLM으로 **처음부터(from scratch)** Wikipedia 수준의 긴 grounded 글을 쓰는 시스템이다. 핵심 혁신은 "쓰기 전(pre-writing) 단계"를 **다중 관점(multi-perspective) 질문 던지기 + 시뮬레이션 대화**로 자동화해 outline을 만든 데 있다.

## 1. 자료 정보 (Document Information)

- **제목**: Assisting in Writing Wikipedia-like Articles From Scratch with Large Language Models
- **저자**: Yijia Shao, Yucheng Jiang, Theodore A. Kanell, Peter Xu, Omar Khattab, Monica S. Lam (Stanford University)
- **발표**: NAACL 2024 (arXiv:2402.14207v2, 2024-04-08)
- **코드**: https://github.com/stanford-oval/storm
- **STORM** = **S**ynthesis of **T**opic **O**utlines through **R**etrieval and **M**ulti-perspective question asking

## 2. 주요 기여 (Key Contributions)

1. **문제 정의**: 아웃라인도 참고문헌도 주어지지 않은 상태에서 긴 grounded 글을 쓰는 과제를 정식화했다. 이를 (1) 리서치→outline 생성, (2) outline+refs→본문 작성 두 단계로 나눈다(인간의 pre-writing / drafting / revising 과정을 반영).
2. **STORM 시스템**: pre-writing 단계를 자동화한다. LLM이 날카로운 질문을 던지고 신뢰할 만한 인터넷 소스를 검색해 outline을 만든다.
3. **FreshWiki 데이터셋**: 데이터 누출(data leakage)을 피하려고 LLM 학습 컷오프 이후 생성·대량 편집된 최신 고품질 위키 문서를 큐레이션했다. outline 평가 지표(heading soft recall, heading entity recall)도 함께 확립했다.
4. **자동+인간 평가**: 자동 지표와 숙련 Wikipedia 편집자 10명 평가 모두 baseline 대비 우위를 확인했다. 동시에 grounded 글쓰기의 **새로운 난제**(소스 편향 전이, 무관 사실 과잉연결)를 발굴했다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

STORM은 두 가설에 기반한다. **(1) 다양한 관점 → 다양한 질문**, **(2) 심층 질문은 반복적 리서치를 요구한다**.

**① 관점 유도 질문 던지기 (Perspective-Guided Question Asking)** — 입력 토픽 t에 대해 LLM으로 관련 토픽 목록을 생성하고, Wikipedia API로 그 문서들의 목차(ToC)를 수집·연결해 컨텍스트로 삼아 N개의 관점 P = {p1..pN}을 도출한다. 기본 사실 커버리지를 위해 p0("basic fact writer")를 항상 추가한다. 각 관점은 병렬로 질문 생성을 가이드한다.

**② 시뮬레이션 대화 (Simulating Conversations)** — 관점마다 "Wikipedia writer ↔ topic expert" 다중 턴 대화(최대 M라운드)를 시뮬레이션한다. 라운드 i에서 writer는 토픽·관점·대화 이력을 바탕으로 질문 qi 하나를 던지고, expert는 이를 검색 쿼리로 분해(split queries)한 뒤 검색·선별(search & sift, Wikipedia 신뢰 소스 룰 필터)하고 종합(synthesize)해 근거 있는 답 ai를 만든다. 이 소스들은 참고문헌 집합 R에 누적된다.

**③ Outline 생성** — 먼저 토픽만으로 draft outline O_D를 직접 생성한 뒤(LLM 내부 지식), 토픽+draft+수집된 대화들 {C0..CN}로 refine해 최종 outline O를 만든다.

**④ 본문 작성 (§3.4)** — outline의 각 섹션 제목·하위 헤딩으로 R에서 Sentence-BERT 의미 유사도 기반 문서를 검색하고, 섹션별로 인용을 포함해 병렬 생성한다. 전체를 이어붙인 뒤 중복을 제거하고, 마지막에 Wikipedia 스타일 lead section(요약)을 합성한다.

- **구현**: DSPy(Khattab 2023) zero-shot 프롬프팅. N=M=5. 질문에 gpt-3.5-turbo, 나머지에 gpt-3.5-turbo-instruct, outline 초안/정제에 gpt-4를 실험했다. 검색은 You.com API를 쓰되 정답 위키 문서는 검색에서 제외했다. 본문 생성은 인용 충실도 문제로 gpt-4만 사용했다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

**Outline 품질 (Table 3, %)** — GPT-4 기준 STORM은 heading soft recall 92.73 / entity recall 45.91로 Direct Gen·RAG·oRAG·RAG-expand를 모두 앞선다. Direct Gen도 soft recall은 높은데(LLM이 고수준 구조는 잘 파악한다), STORM의 이득은 주로 토픽 특화 세부 커버리지에서 나온다.

**본문 품질 (Table 2)** — STORM은 ROUGE-1 45.82, entity recall 14.10, 루브릭(1-5)에서 Interest 3.99·Organization 4.82·Relevance 4.45·Coverage 4.88로 최고 baseline oRAG를 유의하게(p<0.05) 상회한다. Outline 단계를 제거하면("w/o Outline Stage") 전 지표가 급락한다 → outline은 필수다.

**Ablation** — "w/o Conversation"이 가장 크게 악화한다 → 관련 정보를 읽는 것이 효과적 질문의 핵심이다. 수집 참고문헌 수도 full STORM 99.83 대 w/o Conversation 39.56으로 차이가 크다(Table 5).

**인용 품질 (Table 4)** — Mistral 7B-Instruct 판정으로 citation recall 84.83 / precision 85.18. 미지원 문장의 주 원인은 **부적절한 추론적 연결(improper inferential linking)**과 부정확한 패러프레이즈이지, 존재하지 않는 내용의 hallucination이 아니다.

**인간 평가 (Table 6, 편집자 10명, 20쌍)** — STORM은 oRAG 대비 Organization +25%p, Coverage +10%p(≥4 비율)를 기록했다. 편집자 전원이 pre-writing 단계에 유용하다고 동의했고(Fig 3), 80%는 새 토픽 편집에 도움된다고 답했다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **중립성·검증 가능성 부족**: 편집자 10명 중 7명이 STORM 글을 "감정적/비중립적"이라고 지적했다. 인터넷 소스의 편향·홍보성 내용이 옮겨간 탓이다(source bias transfer). pre-writing 단계의 검색 편향을 어떻게 줄일지가 향후 과제다.
- **Red herring / 과잉추론**: R 안에서 서로 무관한 정보나 토픽과 무관한 정보 사이에 검증 불가능한 연결을 만드는 문제다. 단순 fact-checking을 넘어 고차원 sensemaking이 필요하다.
- 잘 다듬어진 인간 글에는 여전히 못 미친다(정보량·중립성).
- 자유 텍스트만 생성하며 표·멀티모달은 아직 지원하지 않는다(향후 과제). 대상도 영어 Wikipedia뿐이라 다국어 확장이 필요하다.

## 6. 관련 연구 (Related Work)

- **RAG**: Lewis 2020(RAG), WikiChat(Semnani 2023, 위키 grounding 챗봇), 인용 생성(Gao 2023), 능동 검색(Active RAG, Jiang 2023b), WebGPT/ReAct 등 검색 시점 자기결정.
- **자동 설명적 글쓰기(Expository writing)**: WikiSum(Liu 2018, 다문서 요약), Imitate-Retrieve-Paraphrase(Balepur 2023), Shen 2023(sensemaking+outline).
- **NLP 질문 던지기**: 명확화 질문, 컴포지션 gap 축소(Press 2023), 질문 informativeness(Qi 2020).
- **평가 도구**: heading soft recall(Fränti 2023), Sentence-BERT(Reimers 2019), FLAIR NER, Prometheus 13B evaluator(Kim 2023), ROUGE.

## 7. 용어집 (Glossary)

- **Pre-writing**: 실제 집필 전 리서치·계획(관점 발견·정보 수집·outline) 단계. STORM이 자동화하는 핵심 대상.
- **Multi-perspective question asking**: 서로 다른 역할/관점의 LLM 페르소나가 각기 다른 측면을 질문해 다면적 정보를 수집하는 기법.
- **Heading soft recall**: 생성 outline과 인간 글 헤딩 간 Sentence-BERT 코사인 유사도 기반 soft recall(정확 일치 불필요).
- **Heading entity recall**: 인간 글 헤딩의 named entity 중 생성 outline이 커버한 비율(FLAIR NER).
- **Source bias transfer**: 인터넷 검색 소스의 편향·감정·홍보 톤이 생성 글로 옮겨가는 현상.
- **Improper inferential linking**: 소스가 뒷받침하지 않는데 정보 조각들 사이에 인과·연관을 지어내는 오류(가장 흔한 인용 미지원 원인).
- **FreshWiki**: data leakage 방지를 위해 LLM 학습 컷오프 이후 편집된 최신 고품질 위키 문서 데이터셋.

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 1 | Wikipedia-like 글쓰기 개요 + Direct/Perspective/Conversational 질문 비교 | page-region | ★ wiki 권장 (motivation) |
| fig03 | 4 | STORM 전체 파이프라인(관점→대화→outline) | page-region | ★★ wiki 강력 권장 (핵심 architecture) |
| fig07 | 8 | 편집자 유용성 설문 결과 | page-region | (선택, result) |
| fig10 | 17 | 인용 오류 유형 분포 파이차트 | page-region | (선택, analysis) |

> 참고: 추출 스크립트가 캡션 정규식으로 본문 내 "Figure N" 인라인 언급 페이지도 함께 캡처(fig02/04/05/06/09/11/12/13)했으나, 실제 도식은 위 4개 + fig08(참고문헌 수 추이)·fig13(웹앱 스크린샷). 전수 아카이브는 `raw/.../figures.json`에 보존.

