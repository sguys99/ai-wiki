---
title: "Assisting in Writing Wikipedia-like Articles From Scratch with Large Language Models"
type: paper
year: 2024
category: agents
raw_path: raw/papers/shao-2024-assisting-in-writing-wikipedia-like-articles.pdf
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
    caption: "주제만 주어진 글쓰기가 요구하는 pre-writing 단계와 세 가지 질문 방식 비교. Direct Prompting(A), 관점 유도 질문(B), 대화형 질문(C)"
    page: 1
    bbox_norm: [0.5134, 0.2541, 0.8798, 0.6203]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/shao-2024-assisting-in-writing-wikipedia-like-articles/fig02.png
    raw: raw/papers/shao-2024-assisting-in-writing-wikipedia-like-articles-figures/fig02.png
    caption: "STORM 전체 파이프라인. 관련 문서 survey와 관점 도출(1, 2), Wikipedia writer와 expert의 시뮬레이션 대화(3~6), draft outline 생성과 정제(7, 8)"
    page: 4
    bbox_norm: [0.128, 0.077, 0.8698, 0.3105]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/shao-2024-assisting-in-writing-wikipedia-like-articles/fig03.png
    raw: raw/papers/shao-2024-assisting-in-writing-wikipedia-like-articles-figures/fig03.png
    caption: "Wikipedia 편집자 10명이 답한 STORM 유용성 설문. 세 문항에 대한 1-5 Likert 응답 분포"
    page: 8
    bbox_norm: [0.109, 0.077, 0.4939, 0.2061]
    strategy: caption-region
    curated: false
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/shao-2024-assisting-in-writing-wikipedia-like-articles/fig04.png
    raw: raw/papers/shao-2024-assisting-in-writing-wikipedia-like-articles-figures/fig04.png
    caption: "Wikipedia 문서가 편집을 거치면서 참고문헌 수가 늘어나는 추이"
    page: 14
    bbox_norm: [0.109, 0.2048, 0.4934, 0.4142]
    strategy: caption-region
    curated: false
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/shao-2024-assisting-in-writing-wikipedia-like-articles/fig05.png
    raw: raw/papers/shao-2024-assisting-in-writing-wikipedia-like-articles-figures/fig05.png
    caption: "실험에 쓴 Wikipedia 문서 100편의 편집 횟수 분포"
    page: 14
    bbox_norm: [0.5042, 0.077, 0.8894, 0.2537]
    strategy: caption-region
    curated: false
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/shao-2024-assisting-in-writing-wikipedia-like-articles/fig06.png
    raw: raw/papers/shao-2024-assisting-in-writing-wikipedia-like-articles-figures/fig06.png
    caption: "표본 10편에서 인용이 뒷받침하지 않은 문장의 오류 유형 분포 파이차트"
    page: 17
    bbox_norm: [0.5067, 0.6331, 0.8802, 0.8546]
    strategy: caption-region
    curated: false
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/shao-2024-assisting-in-writing-wikipedia-like-articles/fig07.png
    raw: raw/papers/shao-2024-assisting-in-writing-wikipedia-like-articles-figures/fig07.png
    caption: "인간 평가에 쓴 웹 애플리케이션 화면. 생성 글과 인용 스니펫을 나란히 배치해 평점과 자유 서술을 함께 받는다"
    page: 22
    bbox_norm: [0.109, 0.3477, 0.8896, 0.6284]
    strategy: caption-region
    curated: false
  - id: tab01
    label: Table 1
    kind: table
    file: assets/shao-2024-assisting-in-writing-wikipedia-like-articles/tab01.png
    raw: raw/papers/shao-2024-assisting-in-writing-wikipedia-like-articles-figures/tab01.png
    caption: "선행 연구와 이 논문의 Wikipedia 생성 과제 설정 비교. 도메인 범위, 생성 분량, outline과 참고문헌 제공 여부"
    page: 3
    bbox_norm: [0.109, 0.0754, 0.8942, 0.1888]
    strategy: table-region
    curated: false
  - id: tab02
    label: Table 2
    kind: table
    file: assets/shao-2024-assisting-in-writing-wikipedia-like-articles/tab02.png
    raw: raw/papers/shao-2024-assisting-in-writing-wikipedia-like-articles-figures/tab02.png
    caption: "본문 품질 자동 평가 결과. ROUGE 2종, entity recall, 1-5 루브릭 4개 항목이며 단검 표시는 oRAG 대비 유의차를 뜻한다"
    page: 6
    bbox_norm: [0.109, 0.0775, 0.8873, 0.2001]
    strategy: table-region
    curated: false
  - id: tab03
    label: Table 3
    kind: table
    file: assets/shao-2024-assisting-in-writing-wikipedia-like-articles/tab03.png
    raw: raw/papers/shao-2024-assisting-in-writing-wikipedia-like-articles-figures/tab03.png
    caption: "outline 품질 평가 결과(%). GPT-3.5와 GPT-4 각각의 heading soft recall과 heading entity recall, ablation 2종 포함"
    page: 6
    bbox_norm: [0.109, 0.2467, 0.4922, 0.4621]
    strategy: table-region
    curated: false
  - id: tab04
    label: Table 4
    kind: table
    file: assets/shao-2024-assisting-in-writing-wikipedia-like-articles/tab04.png
    raw: raw/papers/shao-2024-assisting-in-writing-wikipedia-like-articles-figures/tab04.png
    caption: "Mistral 7B-Instruct가 판정한 STORM의 인용 품질. citation recall과 citation precision"
    page: 7
    bbox_norm: [0.109, 0.1467, 0.891, 0.2021]
    strategy: table-region
    curated: false
  - id: tab05
    label: Table 5
    kind: table
    file: assets/shao-2024-assisting-in-writing-wikipedia-like-articles/tab05.png
    raw: raw/papers/shao-2024-assisting-in-writing-wikipedia-like-articles-figures/tab05.png
    caption: "방법별로 수집한 고유 참고문헌 수 평균. full STORM과 ablation 2종 비교"
    page: 7
    bbox_norm: [0.109, 0.1467, 0.891, 0.2021]
    strategy: table-region
    curated: false
  - id: tab06
    label: Table 6
    kind: table
    file: assets/shao-2024-assisting-in-writing-wikipedia-like-articles/tab06.png
    raw: raw/papers/shao-2024-assisting-in-writing-wikipedia-like-articles-figures/tab06.png
    caption: "STORM과 oRAG 글 20쌍에 대한 편집자 평가 결과. 1-7 척도 평균, 4점 이상 비율, p값, 선호 횟수"
    page: 7
    bbox_norm: [0.5042, 0.0774, 0.891, 0.2021]
    strategy: table-region
    curated: false
  - id: tab07
    label: Table 7
    kind: table
    file: assets/shao-2024-assisting-in-writing-wikipedia-like-articles/tab07.png
    raw: raw/papers/shao-2024-assisting-in-writing-wikipedia-like-articles-figures/tab07.png
    caption: "실험에 쓴 FreshWiki 표본 100편의 통계. 섹션 수, 헤딩 수, 분량, 참고문헌 수"
    page: 14
    bbox_norm: [0.1365, 0.0775, 0.4646, 0.1741]
    strategy: table-region
    curated: false
  - id: tab08
    label: Table 8
    kind: table
    file: assets/shao-2024-assisting-in-writing-wikipedia-like-articles/tab08.png
    raw: raw/papers/shao-2024-assisting-in-writing-wikipedia-like-articles-figures/tab08.png
    caption: "평가자 LLM에 준 1-5 척도 채점 루브릭 전문. 4개 항목의 점수별 서술"
    page: 18
    bbox_norm: [0.109, 0.1658, 0.8881, 0.4707]
    strategy: table-region
    curated: false
  - id: tab09
    label: Table 9
    kind: table
    file: assets/shao-2024-assisting-in-writing-wikipedia-like-articles/tab09.png
    raw: raw/papers/shao-2024-assisting-in-writing-wikipedia-like-articles-figures/tab09.png
    caption: "인용이 뒷받침하지 않은 문장의 오류 유형별 실제 예시. 문장, 인용 출처, 어긋난 지점을 함께 제시한다"
    page: 18
    bbox_norm: [0.109, 0.6694, 0.8883, 0.8103]
    strategy: table-region
    curated: false
  - id: tab10
    label: Table 10
    kind: table
    file: assets/shao-2024-assisting-in-writing-wikipedia-like-articles/tab10.png
    raw: raw/papers/shao-2024-assisting-in-writing-wikipedia-like-articles-figures/tab10.png
    caption: "인간 평가에 쓴 1-7 척도 채점 루브릭 전문. Verifiability를 포함한 5개 항목"
    page: 20
    bbox_norm: [0.109, 0.2266, 0.8879, 0.7495]
    strategy: table-region
    curated: false
  - id: tab11
    label: Table 11
    kind: table
    file: assets/shao-2024-assisting-in-writing-wikipedia-like-articles/tab11.png
    raw: raw/papers/shao-2024-assisting-in-writing-wikipedia-like-articles-figures/tab11.png
    caption: "편집자가 STORM 생성 글에서 지적한 주요 문제 5종과 언급 횟수, 실제 코멘트 예시"
    page: 21
    bbox_norm: [0.1793, 0.2634, 0.8811, 0.7134]
    strategy: table-region
    curated: false
  - id: tab12
    label: Table 12
    kind: table
    file: assets/shao-2024-assisting-in-writing-wikipedia-like-articles/tab12.png
    raw: raw/papers/shao-2024-assisting-in-writing-wikipedia-like-articles-figures/tab12.png
    caption: "STORM이 생성한 Taylor Hawkins 문서 전문. 우물 정 기호는 섹션과 하위 섹션 제목, 대괄호 숫자는 인용된 참고문헌을 뜻한다"
    page: 27
    bbox_norm: [0.0971, 0.0, 0.9133, 0.3867]
    strategy: column-band
    curated: false
---

## 한 줄 요약 (One-line Summary)

STORM은 주제 하나만 받아 참고문헌도 outline도 없는 상태에서 Wikipedia 수준의 긴 grounded 글을 생성하는 시스템이다. 선행 연구가 건너뛴 pre-writing 단계를 관점 발견, 시뮬레이션 대화, outline 정제로 자동화한 것이 핵심 기여다.

## 1. 자료 정보 (Document Information)

- **제목**: Assisting in Writing Wikipedia-like Articles From Scratch with Large Language Models
- **저자**: Yijia Shao, Yucheng Jiang, Theodore A. Kanell, Peter Xu, Omar Khattab, Monica S. Lam (Stanford University)
- **발표**: NAACL 2024. arXiv:2402.14207v2, 2024-04-08 판, 본문 11페이지에 부록 16페이지를 더한 27페이지
- **코드와 데이터**: https://github.com/stanford-oval/storm
- **약어 풀이**: STORM은 Synthesis of Topic Outlines through Retrieval and Multi-perspective Question Asking의 머리글자다.
- **지원**: You.com이 검색 API를 제공했고, Verdant Foundation과 Microsoft Azure AI credits가 연구를 지원했다. 사용자 연구는 저자 소속 기관의 IRB 승인을 받았다.

## 2. 주요 기여 (Key Contributions)

1. **과제 정식화**: outline도 참고문헌도 주어지지 않은 상태에서 긴 grounded 글을 쓰는 과제를 정의했다. 주제 t가 주어지면 참고문헌 집합 R을 찾고, 각 문장 s_i가 R의 문서를 인용하는 전체 글 S를 생성하는 문제다. 이를 (1) 리서치와 outline 생성, (2) outline과 참고문헌으로 본문 작성의 두 단계로 나눈다. 이 분해는 pre-writing, drafting, revising로 이어지는 인간의 글쓰기 과정을 따른 것이다.
2. **STORM 시스템**: pre-writing 단계를 자동화한다. LLM이 서로 다른 관점을 나눠 갖고 심층 질문을 던지며, 신뢰할 수 있는 인터넷 출처를 검색해 답을 grounding한 뒤 그 대화 기록으로 outline을 정제한다.
3. **FreshWiki 데이터셋**: pre-training 데이터 오염(data leakage)을 피하려고 테스트 대상 LLM의 데이터 컷오프 이후 생성되거나 크게 편집된 최신 고품질 Wikipedia 문서를 큐레이션했다. 새 모델이 나오면 같은 절차를 반복할 수 있게 설계했다.
4. **outline 평가 지표**: heading soft recall과 heading entity recall 두 지표를 정의해 pre-writing 단계만 따로 잴 수 있게 했다.
5. **자동 평가와 전문가 평가 병행**: 자동 지표와 숙련 Wikipedia 편집자 10명의 평가를 함께 수행했다. 그 과정에서 grounded 글쓰기의 새 난제인 출처 편향 전이(source bias transfer)와 무관 사실 과잉 연결을 발굴했다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 선행 연구와의 과제 설정 차이 (Table 1)

논문은 기존 Wikipedia 생성 연구를 도메인 범위, 생성 분량, outline 제공 여부, 참고문헌 제공 여부 네 항목으로 비교한다.

| 연구 | 도메인 범위 | 생성 분량 | outline 제공 | 참고문헌 제공 |
|---|---|---|---|---|
| Balepur et al. (2023) | 1개 | 한 문단 | 해당 없음 | 예 |
| Qian et al. (2023) | 전체 | 한 문단 | 해당 없음 | 아니오 |
| Fan and Gardent (2022) | 1개 | 전체 문서 | 예 | 아니오 |
| Liu et al. (2018) | 전체 | 한 문단 | 해당 없음 | 예 |
| Sauper and Barzilay (2009) | 2개 | 전체 문서 | 아니오 | 아니오 |
| 이 논문 | 전체 | 전체 문서 | 아니오 | 아니오 |

한 문단만 생성하는 설정은 문서 outline을 필요로 하지 않는다. 이 논문만 도메인 제약 없이 전체 문서를 생성하면서 outline과 참고문헌을 모두 주지 않는다.

### 3.2 FreshWiki 데이터셋 구축

수집 절차는 다음 순서다.

1. 2022년 2월부터 2023년 9월까지 각 월별로 편집 횟수 상위 100개 문서를 Wikimedia REST API로 받는다. 생성일이 아니라 편집량을 기준으로 삼은 이유는 대부분의 Wikipedia 문서가 생성 시점에는 stub이거나 품질이 낮기 때문이다.
2. ORES 품질 예측이 B-class 이상인 문서만 남긴다. Wikipedia 자체 통계로 전체 문서의 약 3%만 이 기준을 만족한다.
3. 목록 문서(stand-alone list)와 하위 섹션이 없는 문서를 제외한다.
4. 표와 이미지 등 구조화 데이터를 빼고 순수 텍스트만 사용한다.

실험에서는 여기서 사람이 쓴 본문이 3,000 단어 미만인 표본 100편을 무작위로 골랐다. 표본 통계는 아래와 같다(Table 7).

| 항목 | 값 |
|---|---|
| 평균 섹션 수 | 8.4개 |
| 평균 전체 헤딩 수(모든 수준) | 15.8개 |
| 섹션 평균 분량 | 327.8 단어 |
| 문서 평균 분량 | 2,159.1 단어 |
| 평균 참고문헌 수 | 90.1개 |

사람이 쓴 문서는 참고문헌이 많지만 그 수준에 도달하려면 편집을 여러 차례 거쳐야 한다. Figure 4가 편집 과정에서 참고문헌 수가 늘어나는 추이를, Figure 5가 표본 100편의 편집 횟수 분포를 보여준다.

### 3.3 outline 평가 지표

전체 문서는 생성도 평가도 어렵기 때문에 논문은 생성을 두 단계로 나누고 pre-writing 단계를 outline 품질로 대리 측정한다. outline O는 다중 수준 섹션 헤딩 목록으로 정의하며, 우물 정 기호 개수로 수준을 표현해 선형화한다.

- **heading soft recall**: 사람이 쓴 문서의 헤딩 집합 G와 생성 outline P의 헤딩 집합을 비교한다. 정확히 일치할 필요가 없다는 점을 반영해 Fränti and Mariescu-Istodor (2023)의 soft recall 정의를 쓴다. 항목 하나의 soft count는 그 항목과 집합 내 모든 항목 사이 유사도 합의 역수이며, 유사도는 Sentence-BERT 임베딩의 코사인 유사도다. 임베딩 모델은 Sentence-Transformers의 `paraphrase-MiniLM-L6-v2`다. 집합의 cardinality는 개별 항목 count의 합이고, 교집합 cardinality는 card(G) + card(P) - card(G ∪ P)로 정의한다. 최종 지표는 card(G ∩ P) / card(G)다.
- **heading entity recall**: 사람이 쓴 문서 헤딩에 등장하는 named entity 중 생성 outline이 커버한 비율이다. entity 추출은 FLAIR NER을 쓴다.

### 3.4 STORM 파이프라인

STORM은 두 가설에 기반한다. 첫째, 다양한 관점은 다양한 질문을 낳는다. 둘째, 심층 질문을 만들려면 반복적 리서치가 필요하다.

**1단계. 관점 유도 질문 던지기 (§3.1)**. 입력 주제 t에 대해 LLM이 관련 주제 목록을 생성하고, Wikipedia API로 해당 문서의 목차(table of contents)를 추출한다. 목차들을 이어붙여 컨텍스트로 삼아 N개 관점 P = {p_1, ..., p_N}을 도출한다. 기본 사실이 빠지지 않도록 "basic fact writer focusing on broadly covering the basic facts about the topic"인 p_0를 항상 추가하므로 관점은 총 N+1개다. 각 관점은 병렬로 질문 생성을 이끈다. 논문이 드는 예로 이벤트 기획자 관점은 2022 동계 올림픽 개회식의 교통 준비와 예산을 묻지만, 일반인은 행사의 기본 정보만 묻는다. 이 설계는 기업의 이해관계자마다 중시하는 측면이 다르다는 경영학의 stakeholder theory에서 착안했다.

**2단계. 시뮬레이션 대화 (§3.2)**. 관점마다 Wikipedia writer와 topic expert 사이의 다중 턴 대화를 최대 M라운드까지 시뮬레이션한다. 라운드 i에서 writer는 주제 t, 배정된 관점 p, 대화 이력 {q_1, a_1, ..., q_{i-1}, a_{i-1}}을 근거로 질문 q_i 하나를 생성한다. 대화 이력이 있으므로 앞선 답을 읽고 후속 질문을 던질 수 있다. expert는 세 하위 단계로 답한다.

| 하위 단계 | 하는 일 |
|---|---|
| Split Queries | 복잡한 질문 q_i를 여러 개의 검색 쿼리로 분해한다 |
| Search & Sift | 검색 결과를 Wikipedia 신뢰 출처 지침 기반 규칙 필터로 걸러 신뢰할 수 없는 출처를 제외한다 |
| Synthesize | 남은 신뢰 출처를 종합해 답 a_i를 생성한다 |

이때 사용한 출처는 참고문헌 집합 R에 누적되어 본문 작성 단계로 넘어간다. 질문 던지기와 답하기의 순환을 설계한 근거로 논문은 질문 이론(Ram 1991)을 든다. 기존 질문에 대한 답은 이해를 넓히는 동시에 새 질문을 낳는다는 관점이다.

**3단계. outline 생성 (§3.3)**. LLM의 내부 지식을 활용하기 위해 먼저 주제 t만으로 draft outline O_D를 직접 생성한다. O_D는 일반적이지만 조직화된 뼈대를 제공한다. 이어서 주제 t, draft outline O_D, 수집한 대화 {C_0, C_1, ..., C_N}을 함께 프롬프트에 넣어 outline을 정제해 최종 outline O를 만든다.

**4단계. 본문 작성 (§3.4)**. 참고문헌 집합 R 전체를 context window에 넣는 것은 대개 불가능하다. 그래서 섹션 제목과 모든 수준의 하위 헤딩을 질의로 삼아 Sentence-BERT 임베딩 유사도로 R에서 관련 문서를 검색한다. 확보한 정보로 섹션마다 인용을 포함해 본문을 생성한다. 섹션을 병렬로 생성하므로 이어붙인 뒤 중복 정보를 삭제하도록 다시 프롬프트해 일관성을 높인다. 마지막으로 Wikipedia 문체 규범에 맞춰 전체 글의 요약인 lead section을 합성해 앞에 붙인다.

### 3.5 알고리즘과 프롬프트 (Appendix B)

Algorithm 1이 STORM의 골격을 담는다. 입력은 주제 t, 최대 관점 수 N, 최대 대화 라운드 M이고 출력은 outline O와 참고문헌 R이다. 흐름은 관련 주제 생성, 목차 추출, 관점 생성, 관점별 M라운드 대화, draft outline 생성, outline 정제 순이다. 관점 목록은 `P ← [P0] + P[:N]`으로 구성되어 상수 p_0가 항상 앞에 온다.

구현은 DSPy(Khattab et al. 2023) 기반 zero-shot 프롬프팅이며, 프롬프트는 7개 `dspy.Signature` 클래스로 정의된다.

| 프롬프트 클래스 | 역할 |
|---|---|
| `GenRelatedTopicsPrompt` | 주제와 밀접한 Wikipedia 문서 URL 목록을 추천받는다 |
| `GenPerspectivesPrompt` | 서로 다른 관점, 역할, 소속을 가진 Wikipedia 편집자 집단을 설명과 함께 생성한다 |
| `GenQnPrompt` | 배정된 관점과 대화 이력을 보고 한 번에 질문 하나만 생성한다. 더 물을 것이 없으면 감사 인사로 대화를 끝낸다 |
| `GenQueriesPrompt` | 질문에 답하기 위해 검색창에 입력할 쿼리 목록을 만든다 |
| `GenAnswerPrompt` | 수집한 정보만으로 모든 문장이 뒷받침되도록 답변을 작성한다 |
| `DirectGenOutlinePrompt` | 주제만으로 draft outline을 생성한다. 우물 정 기호로 수준을 표시하고 다른 정보는 넣지 않는다 |
| `RefineOutlinePrompt` | draft outline과 대화 이력을 받아 더 포괄적인 outline으로 개선한다 |

논문은 STORM이 단일 도메인용 프롬프트 엔지니어링에 크게 의존하지 않는 범용 프레임워크임을 강조한다.

### 3.6 실험 설정

| 항목 | 설정 |
|---|---|
| 관점 수 N | 5 |
| 대화 라운드 M | 5 |
| 질문 생성 모델 | `gpt-3.5-turbo` |
| 그 외 STORM 구성 요소 | `gpt-3.5-turbo-instruct` |
| outline 초안과 정제 | `gpt-4`도 함께 실험 |
| 본문 생성 | `gpt-4`만 사용. `gpt-3.5`는 인용을 붙일 때 출처에 충실하지 않다 |
| 검색 백엔드 | You.com Search API. 정답 Wikipedia 문서는 검색 결과에서 제외 |
| 샘플링 | temperature 1.0, top_p 0.9 (전 실험 공통) |
| 출력 상한 | 최대 4,000 토큰(약 3,000 단어) |
| 평가 표본 | FreshWiki에서 무작위 100편 |

baseline은 LLM 기반 3종이며, outline 평가에는 RAG-expand를 더해 4종을 쓴다.

| baseline | 동작 |
|---|---|
| Direct Gen | LLM에 직접 outline을 생성하게 하고 그 outline으로 본문을 쓴다. 외부 검색을 쓰지 않는다 |
| RAG | 주제로 한 번 검색하고 검색 결과와 주제로 outline이나 본문 전체를 생성한다 |
| oRAG (Outline-driven RAG) | outline 생성은 RAG와 같고, 섹션 제목으로 추가 검색을 해서 섹션 단위로 본문을 생성한다 |
| RAG-expand | RAG가 만든 outline의 섹션 제목을 검색 쿼리로 써서 출처를 더 모으고, 새 출처와 초기 outline으로 outline을 다시 다듬는다. outline 평가에만 쓴다 |

자동 평가 지표는 다음과 같이 나뉜다.

| 대상 | 지표 | 판정 도구 |
|---|---|---|
| outline | heading soft recall, heading entity recall | Sentence-BERT, FLAIR NER |
| 본문 대 사람 글 | ROUGE-1, ROUGE-L, entity recall | ROUGE, FLAIR NER |
| 본문 루브릭 | Interest Level, Coherence and Organization, Relevance and Focus, Coverage (1-5) | Prometheus 13B 평가자 LLM |
| 본문 검증 가능성 | citation recall, citation precision | Mistral 7B-Instruct |

루브릭은 숙련 Wikipedia 편집자 2명과 함께 만들었으며 전문이 Table 8에 있다. Prometheus는 5점 기준 답안을 함께 넣는 것이 권장되지만 context 한계를 넘기 때문에 기준 답안을 빼고 썼다. 입력 글은 가장 짧은 섹션부터 반복 삭제해 2,000 단어 안으로 줄였다. citation 판정은 문장 단위이며 NLTK `sent_tokenize`로 분할한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 outline 품질 (Table 3, %)

GPT-3.5 설정.

| 방법 | heading soft recall | heading entity recall |
|---|---|---|
| Direct Gen | 80.23 | 32.39 |
| RAG/oRAG | 73.59 | 33.85 |
| RAG-expand | 74.40 | 33.85 |
| STORM | 86.26 (유의) | 40.52 (유의) |
| w/o Perspective | 84.49 | 40.12 |
| w/o Conversation | 77.97 | 31.98 |

GPT-4 설정.

| 방법 | heading soft recall | heading entity recall |
|---|---|---|
| Direct Gen | 87.66 | 34.78 |
| RAG/oRAG | 89.55 | 42.38 |
| RAG-expand | 91.36 | 43.53 |
| STORM | 92.73 (유의) | 45.91 |
| w/o Perspective | 92.39 | 42.70 |
| w/o Conversation | 88.75 | 39.30 |

"유의"는 STORM과 baseline 사이 paired t-test에서 p < 0.05인 항목이다. GPT-4 설정의 entity recall 45.91에는 유의 표시가 없다.

Direct Gen도 heading soft recall이 이미 높다. LLM이 풍부한 파라미터 지식으로 주제의 고수준 측면을 파악한다는 뜻이다. STORM의 이득은 주제 특화 세부 측면을 더 많이 커버하는 데서 나온다. 한편 GPT-3.5에서는 RAG가 Direct Gen보다 낮은데, 정리되지 않은 정보를 context window에 넣으면 약한 모델에게는 outline 생성이 오히려 어려워지기 때문이다. RAG 계열의 한계를 시험하기 위해 추가 검색과 정제를 한 번 더 붙인 RAG-expand도 만들었지만 STORM이 여전히 앞섰다.

### 4.2 본문 품질 (Table 2)

| 방법 | ROUGE-1 | ROUGE-L | Entity Recall | Interest Level | Organization | Relevance | Coverage |
|---|---|---|---|---|---|---|---|
| Direct Gen | 25.62 | 12.63 | 5.08 | 2.87 | 4.60 | 3.10 | 4.16 |
| RAG | 28.52 | 13.18 | 7.57 | 3.14 | 4.22 | 3.05 | 4.08 |
| oRAG | 44.26 | 16.51 | 12.57 | 3.90 | 4.79 | 4.09 | 4.70 |
| STORM | 45.82 | 16.70 | 14.10 (유의) | 3.99 (유의) | 4.82 | 4.45 (유의) | 4.88 (유의) |
| w/o Outline Stage | 26.77 | 12.77 | 7.39 | 3.33 | 4.87 | 3.35 | 4.37 |

루브릭 4개 항목은 1-5 척도다. oRAG가 RAG를 크게 앞서는 결과는 outline으로 본문 생성을 구조화하는 것이 효과적임을 보여준다. STORM은 그 oRAG를 다시 앞서며, Interest Level, Relevance and Focus, Coverage, entity recall 네 항목에서 유의차를 얻었다. Organization 4.82에는 유의 표시가 없다.

**본문과 표의 불일치 1건**: 논문 본문 §5.2는 outline 단계를 제거하면 "모든 지표에서 성능이 유의하게 나빠진다"고 서술한다. 그러나 Table 2에서 w/o Outline Stage의 Organization은 4.87로 STORM의 4.82보다 높고 열 최고값으로 굵게 표시되어 있다. 표를 기준으로 삼으면 Organization은 예외이며, outline 제거로 크게 하락하는 것은 ROUGE-1(45.82에서 26.77), entity recall(14.10에서 7.39), Relevance(4.45에서 3.35), Coverage(4.88에서 4.37), Interest Level(3.99에서 3.33)이다.

논문은 평가자 LLM이 기계 생성 텍스트를 과대 평가할 가능성을 스스로 인정하고, 인간 평가에서 STORM에 개선 여지가 많이 남았음이 드러난다고 밝힌다.

### 4.3 Ablation (Table 3, Table 5)

Perspective를 빼면 질문 생성 프롬프트에서 관점을 제거하고, Conversation을 빼면 정해진 개수의 질문을 한 번에 생성한다. 비교 공정성을 위해 생성 질문 총수는 모든 변형에서 같게 통제했다. w/o Conversation이 가장 크게 나빠진다. 관련 정보를 읽는 것이 효과적 질문 생성의 핵심이라는 뜻이다.

수집한 고유 참고문헌 수 평균은 다음과 같다.

| 방법 | 고유 참고문헌 수 평균 |
|---|---|
| STORM | 99.83 |
| w/o Perspective | 54.36 |
| w/o Conversation | 39.56 |

참고문헌 수의 순서가 outline 품질 지표의 순서와 일치한다. 사람이 쓴 문서의 평균 참고문헌 수 90.1개(Table 7)와 비교하면 full STORM이 그 수준을 넘긴다.

### 4.4 인용 품질 (Table 4, Figure 6, Table 9)

| 지표 | 값 |
|---|---|
| citation recall | 84.83 |
| citation precision | 85.18 |

Mistral 7B-Instruct 판정으로 생성 문장의 84.83%가 인용에 의해 뒷받침된다. 곧 약 15%가 뒷받침되지 않는다. 저자 1명이 무작위 10편의 미지원 문장 전량을 수동 검토한 결과 분포는 다음과 같다(Figure 6).

| 유형 | 비율 | 성격 |
|---|---|---|
| Lack Citation | 47% | 인용 자체가 없는 문장 |
| False Negative | 15% | 저자 판단으로는 실제로 뒷받침되는 문장 |
| Incorrectly Split | 12% | 문장 분할 오류. `No.12847`이나 `Bhatia et al.` 같은 표기에서 `sent_tokenize`가 잘못 끊는다 |
| Improper Inferential Linking | 14% | 출처가 뒷받침하지 않는 추론적 연결을 만든 오류 |
| Inaccurate Paraphrasing | 7% | 출처를 부정확하게 옮긴 오류 |
| Citing Irrelevant Sources | 4% | 주제와 무관한 출처를 인용한 오류 |
| Others | 1% | 그 외 |

논문이 진짜 오류로 분류한 세 유형은 improper inferential linking, inaccurate paraphrasing, citing irrelevant sources이며 합계 25%다. 가장 큰 비중인 Lack Citation 47%와 False Negative 15%, Incorrectly Split 12%는 이 세 유형에서 제외된다. 세 유형 중 가장 흔한 것은 improper inferential linking으로, LLM이 context window 안의 서로 다른 정보 조각 사이에 부적절한 추론 연결을 만드는 경향에서 나온다. 존재하지 않는 내용을 만들어내는 환각(hallucination)이 주된 원인은 아니다.

Table 9의 실제 예시는 다음과 같다.

| 오류 유형 | 주제 | 어긋난 지점 |
|---|---|---|
| Improper Inferential Linking | Lahaina, Hawaii | 출처는 하와이 생활의 일부로서 종교를 논하지만 Lahaina를 언급하지 않는다 |
| Inaccurate Paraphrasing | 2022 Crimean Bridge explosion | 출처는 여객 열차 2019-12-25, 화물 열차 2020-06-30 개통이라고 적는데 생성 문장은 다리가 2020년 6월에 완공되었다고 서술한다 |
| Citing Irrelevant Sources | LK-99 | 게임 Battlefield 2042의 PC 성능 가이드를 LK-99 성능 비교 근거로 인용한다 |

### 4.5 인간 평가 (Table 6)

편집자 10명은 Wikipedia 편집 500회 이상, 경력 1년 이상 조건을 만족한다. 모집은 Meta-Wiki에 연구 페이지를 만들고 최근 문서를 승인한 활동 편집자에게 개별 연락하는 방식이었다. 경력 분포는 1-5년 3명, 6-10년 4명, 15년 초과 3명이다. 참가자는 Qualtrics 동의서에 서명했고 1인당 50달러를 받았다. 평가에는 본문과 인용 스니펫을 나란히 보여주는 웹 애플리케이션을 사용했다(Figure 7).

데이터셋에서 무작위로 뽑은 20개 주제에 대해 STORM과 oRAG가 생성한 글을 짝지어, 각 쌍을 편집자 2명이 평가했다. 척도는 자동 평가와 같은 5개 항목을 1-7로 세분화한 것이다. Verifiability는 인용 품질 대리 지표가 아니라 Wikipedia 기준인 "독자 연구 없이 검증 가능"을 그대로 적용했다.

| 항목 | oRAG 평균 | oRAG 4점 이상 비율 | STORM 평균 | STORM 4점 이상 비율 | p값 |
|---|---|---|---|---|---|
| Interest Level | 3.63 | 57.5% | 4.03 | 70.0% | 0.077 |
| Organization | 3.25 | 45.0% | 4.00 | 70.0% | 0.005 |
| Relevance | 3.93 | 62.5% | 4.15 | 65.0% | 0.347 |
| Coverage | 3.58 | 57.5% | 4.00 | 67.5% | 0.084 |
| Verifiability | 3.85 | 67.5% | 3.80 | 67.5% | 0.843 |
| 선호 횟수 | 14 | | 26 | | |

STORM은 Organization에서 4점 이상 비율이 45.0%에서 70.0%로 25.0%p, Coverage에서 57.5%에서 67.5%로 10.0%p 높다. 이 두 수치가 초록에 실린 값이다. p < 0.05를 만족하는 항목은 Organization(0.005) 하나뿐이며, Interest Level(0.077)과 Coverage(0.084)는 유의 수준에 미치지 못한다. Verifiability는 STORM 평균이 3.80으로 oRAG의 3.85보다 낮고 4점 이상 비율은 양쪽 모두 67.5%로 같다. 쌍별 선호에서는 40건 중 STORM 26건, oRAG 14건이다.

평가자 간 일치도(Krippendorff's Alpha)는 다음과 같다.

| 항목 | Krippendorff's Alpha |
|---|---|
| Interest Level | 0.349 |
| Organization | 0.221 |
| Relevance | 0.256 |
| Coverage | 0.346 |
| Verifiability | 0.388 |

전 항목이 0.4 미만이므로 편집자 사이 일치도가 낮다. 결과를 읽을 때 함께 고려해야 하는 값이다.

### 4.6 R이 커지면서 생기는 문제

oRAG를 선호한 14건의 응답을 검토한 결과, 평점과 선호가 어긋난 3건을 빼면 절반 이상의 사례에서 편집자가 STORM 글에 더 낮은 Verifiability 점수를 줬다. 원인은 red herring fallacy와 과잉 추론이다. R 안의 서로 다른 정보 조각 사이, 또는 정보와 주제 사이에 검증할 수 없는 연결을 만드는 문제다. 널리 논의되는 사실 환각보다 미묘한 문제이며 기본적인 fact-checking을 넘어선다.

### 4.7 편집자 유용성 설문 (Figure 3)

세 문항에 대한 1-5 Likert 응답 분포는 다음과 같다.

| 문항 | 매우 동의 | 다소 동의 | 중립 | 다소 반대 |
|---|---|---|---|---|
| 내 pre-writing 단계에 특히 도움이 된다 | 30% | 70% | 0% | 0% |
| 새 주제의 Wikipedia 문서를 편집할 때 도움이 된다 | 30% | 50% | 20% | 0% |
| Wikipedia 커뮤니티 전체에 유용한 도구가 될 수 있다 | 10% | 60% | 20% | 10% |

pre-writing 단계 유용성에는 편집자 10명 전원이 동의했다. 새 주제 편집 도움에는 80%가, 커뮤니티 전체 유용성에는 70%가 동의했으며 후자에는 10%가 반대했다.

### 4.8 편집자가 지적한 문제 (Table 11)

| 문제 | 언급 횟수 | 예시 |
|---|---|---|
| 감정적 어휘 사용과 중립성 부족 | 12 | Lahaina, Hawaii 글에서 significant가 17회 등장하고 근거 없는 정치적 중요성 주장이 있다 |
| red herring fallacy와 무관 출처 연결 | 11 | Typhoon Hinnamnor 글에서 출처가 명시적으로 연결하지 않은 기후 변화를 링크했다 |
| 중요 정보 누락 | 6 | LK-99 글에서 슈퍼컴퓨터 시뮬레이션 분석의 내용이 충분히 서술되지 않았다 |
| 시점 의존 정보의 부적절한 처리 | 5 | now 같은 표현 대신 as of December 2023 형식을 써야 한다 |
| 섹션 구성 문제 | 5 | 2022 West Java earthquake 글의 Recovery and Rehabilitation 섹션에 하위 섹션이 너무 많다 |

한 편집자는 STORM 결과가 사람이 쓴 글보다 "배경 정보를 조금 더" 준다고 평했고, 다른 편집자는 AI 글이 Wikipedia 글보다 깊이가 있었다고 답했다. 동시에 편집자들은 생성 글이 실제 Wikipedia 문서보다 정보량이 적다고 지적했으며, 10명 중 7명이 STORM 글이 감정적이거나 중립적이지 않게 들린다고 언급했다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **중립성과 검증 가능성**: 기계 생성 글은 잘 다듬어진 사람 글에 아직 미치지 못하며, 특히 중립성과 검증 가능성에서 차이가 크다. 관점을 여러 개 발견해도 수집 정보가 인터넷의 지배적 출처에 편향되거나 홍보성 내용을 담을 수 있다. pre-writing 단계의 검색 편향을 줄이는 것이 향후 과제다.
- **후처리 모듈 부재**: 현 시스템은 검색 엔진에 의존하며 별도 후처리 모듈이 없다. 저자들은 다양한 관점을 고르게 담는 검색 모듈 개선과 내용 선별(content sifting) 모듈 추가를 다음 단계로 지목한다.
- **과잉 추론**: 이 연구가 확인한 검증 가능성 문제는 사실 환각을 넘어선다. 사실 단위 검증이 아니라 높은 수준의 sensemaking이 필요하다.
- **자유 텍스트만 생성**: 과제 설정을 단순화해 자유 형식 텍스트만 다룬다. 고품질 Wikipedia 문서에 흔한 구조화 데이터와 멀티모달 정보 생성은 향후 과제로 남긴다.
- **영어 단일 언어**: 영어 Wikipedia만 대상이다. 비영어권에는 문서가 없는 주제가 더 많으므로 다국어 확장이 의미 있는 방향이다.
- **평가 신뢰도**: 평가자 LLM이 기계 생성 텍스트를 과대 평가할 가능성이 있고, 인간 평가의 평가자 간 일치도도 전 항목 0.4 미만이다.
- **윤리 고려**: 생성 글을 온라인에 게재하지 않고 정확성 검사를 적용했으며, 시스템이 실제 Wikipedia 페이지와 상호작용하지 않도록 해 커뮤니티 교란을 피했다.

## 6. 관련 연구 (Related Work)

- **RAG**: Lewis et al. (2020)이 지식 집약 과제에서 RAG가 다양성과 사실성을 높인다고 보고했다. Semnani et al. (2023)의 WikiChat은 영어 Wikipedia에 grounding한 챗봇으로 환각을 억제한다. 인용을 붙인 텍스트 생성(Menick 2022, Gao 2023)과 attributed QA(Bohnet 2023)도 같은 계열이다. 검색 출처는 도메인 DB(Zakka 2023), 코드 문서(Zhou 2023), 인터넷 전체(Nakano 2022, Komeili 2022)로 다양하고, 검색 시점을 모델이 스스로 정하는 연구(Jiang 2023b, Parisi 2022, Shuster 2022, Yao 2023의 ReAct)도 있다. 긴 글 생성에 RAG를 쓰는 문제는 상대적으로 덜 연구되었다.
- **자동 설명적 글쓰기**: Balepur et al. (2023)의 Imitate-Retrieve-Paraphrase는 문단 수준에서 여러 출처의 정보를 종합한다. Shen et al. (2023)은 설명적 글쓰기가 출처에 대한 저자의 sensemaking 과정과 좋은 outline planning을 요구한다고 지적한다. Liu et al. (2018)의 WikiSum은 Wikipedia 생성을 다문서 요약으로 다룬다.
- **NLP의 질문 던지기**: 사용자 의도를 파악하는 명확화 질문(Aliannejadi 2019, Rahmani 2023), 큰 질문을 작은 질문으로 쪼개 조합적 추론을 개선하는 연구(Press 2023)가 있다. 가장 가까운 연구는 Qi et al. (2020)으로, unigram precision 함수로 질문 informativeness를 정의하고 강화학습으로 이를 높인다.
- **평가 도구**: heading soft recall(Fränti and Mariescu-Istodor 2023), Sentence-BERT(Reimers and Gurevych 2019), FLAIR NER(Akbik 2019), Prometheus 13B 평가자 LLM(Kim 2023), ROUGE(Lin 2004), citation recall과 precision 정의(Gao 2023).

## 7. 용어집 (Glossary)

- **STORM**: Synthesis of Topic Outlines through Retrieval and Multi-perspective Question Asking. 이 논문이 제안한 pre-writing 자동화 시스템의 이름이다.
- **Pre-writing**: 실제 집필 전 리서치와 계획 단계다. 관점 발견, 정보 수집, outline 작성이 여기 들어가며 STORM이 자동화하는 대상이다.
- **Perspective-guided question asking**: 서로 다른 역할과 관점을 배정받은 LLM이 각기 다른 측면을 질문해 다면적 정보를 모으는 기법이다.
- **Heading soft recall**: 생성 outline과 사람이 쓴 글의 헤딩 사이 Sentence-BERT 코사인 유사도로 계산하는 soft recall이다. 정확 일치를 요구하지 않는다.
- **Heading entity recall**: 사람이 쓴 글 헤딩의 named entity 중 생성 outline이 커버한 비율이다.
- **FreshWiki**: pre-training 데이터 오염을 피하려고 LLM 데이터 컷오프 이후 편집된 고품질 Wikipedia 문서를 모은 데이터셋이다.
- **Source bias transfer**: 인터넷 검색 출처의 편향, 감정적 어조, 홍보성 표현이 생성 글로 옮겨가는 현상이다.
- **Improper inferential linking**: 출처가 뒷받침하지 않는데도 정보 조각 사이에 인과나 연관을 지어내는 오류다. 논문이 분류한 세 오류 유형 중 가장 흔하다.
- **Red herring fallacy**: 주제와 무관한 정보를 끌어와 관련이 있는 것처럼 연결하는 오류다. 편집자들이 두 번째로 많이 지적한 문제다.
- **oRAG (Outline-driven RAG)**: outline을 먼저 만들고 섹션 제목으로 추가 검색해 섹션 단위로 본문을 생성하는 baseline이다. 자동 평가에서 가장 강한 baseline이었다.
- **ORES**: Wikipedia의 문서 품질 예측 서비스다. FreshWiki는 B-class 이상 판정만 채택한다.

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 1 | 주제만 주어진 글쓰기의 pre-writing 단계와 세 가지 질문 방식 비교 | caption-region | ★ wiki 권장 (motivation) |
| fig02 | 4 | STORM 전체 파이프라인 | caption-region | ★★ wiki 강력 권장 (핵심 architecture) |
| fig03 | 8 | 편집자 10명의 유용성 설문 응답 분포 | caption-region | (선택, result) |
| fig04 | 14 | 편집 과정의 참고문헌 수 증가 추이 | caption-region | (확인 필요) |
| fig05 | 14 | 표본 100편의 편집 횟수 분포 | caption-region | (확인 필요) |
| fig06 | 17 | 인용 미지원 문장의 오류 유형 분포 | caption-region | (선택, analysis) |
| fig07 | 22 | 인간 평가용 웹 애플리케이션 화면 | caption-region | (확인 필요) |
| tab01 | 3 | 선행 연구와의 과제 설정 비교 | table-region | (본문 표로 재현) |
| tab02 | 6 | 본문 품질 자동 평가 결과 | table-region | (본문 표로 재현) |
| tab03 | 6 | outline 품질 평가 결과 | table-region | (본문 표로 재현) |
| tab04 | 7 | 인용 품질 | table-region | (크롭 어긋남, 아래 참고) |
| tab05 | 7 | 방법별 고유 참고문헌 수 평균 | table-region | (크롭 어긋남, 아래 참고) |
| tab06 | 7 | 인간 평가 결과 | table-region | (본문 표로 재현) |
| tab07 | 14 | FreshWiki 표본 통계 | table-region | (본문 표로 재현) |
| tab08 | 18 | 평가자 LLM 1-5 루브릭 전문 | table-region | (확인 필요) |
| tab09 | 18 | 인용 오류 유형별 예시 | table-region | (본문 표로 재현) |
| tab10 | 20 | 인간 평가 1-7 루브릭 전문 | table-region | (확인 필요) |
| tab11 | 21 | 편집자가 지적한 주요 문제 | table-region | (본문 표로 재현) |
| tab12 | 27 | STORM 생성 문서 전문 예시 | column-band | (확인 필요) |

> **크롭 어긋남 기록**: `tab04.png`와 `tab05.png`는 `figures.json`에서 bbox가 동일하고 파일도 같아, 두 크롭 모두 Table 5(고유 참고문헌 수)와 Table 6 하단 일부를 담고 있다. Table 4(인용 품질) 영역은 어느 크롭에도 들어 있지 않다. 두 항목 모두 curated 대상이 아니고 수치는 본문 표로 재현했으므로 재추출은 사용자 판단에 맡긴다. `extract_figures.py --force`는 지시 없이 실행하지 않는다.
