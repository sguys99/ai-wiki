---
title: "Do World Models Make Better Robots? A Survey of Evaluation Benchmarks for Predictive Embodied Intelligence"
type: paper
year: 2026
category: physical-ai
raw_path: raw/papers/jena-2026-do-world-models-make-better.pdf
raw_filename: "jena-2026-do-world-models-make-better.pdf"
source_collection: external
authors: "Gaytri Jena, Kapil Wanaskar, Vinija Jain, Aman Chadha, Vasu Sharma, Amitava Das"
arxiv_id: "2609.29669"
tags: [physical-ai, world-model, benchmark, vla]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/jena-2026-do-world-models-make-better/fig01.png
    raw: raw/papers/jena-2026-do-world-models-make-better-figures/fig01.png
    caption: "서베이의 조직 질문을 실제 벤치마크로 배치한 그림. 왼쪽 closed-loop 열에 LIBERO, CALVIN, Meta-World, ManiSkill2, RoboCasa, Habitat 3.0, ALFRED, GemBench, VLABench을 두고 오른쪽 open-loop 열에 WorldModelBench, Physics-IQ, WorldScore, EWMBench, EVA-Bench, VideoPhy, Physion++, Physion, EvalCrafter를 둔 뒤, 가운데에 과제 성공과 예측 품질 중 무엇을 채점하는지를 묻는 기준을 세웠다. 160개 중 11개만 예측이 실행에 도움이 되는지를 검사한다고 적혀 있다"
    page: 2
    bbox_norm: [0.1405, 0.1124, 0.8598, 0.3841]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/jena-2026-do-world-models-make-better/fig02.png
    raw: raw/papers/jena-2026-do-world-models-make-better-figures/fig02.png
    caption: "가장 가까운 서베이 8편을 2019년부터 2026년까지 시간순으로 놓은 연표. 심사 학회에 실린 두 편(embodied AI 시뮬레이터 서베이, 실제 로봇 강화학습 재현성 서베이)은 최근 흐름보다 앞서고 나머지는 2026년 preprint이며, 오른쪽 끝에 이 서베이를 별표로 두었다"
    page: 3
    bbox_norm: [0.1473, 0.1432, 0.8488, 0.242]
    strategy: caption-region
    curated: false
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/jena-2026-do-world-models-make-better/fig03.png
    raw: raw/papers/jena-2026-do-world-models-make-better-figures/fig03.png
    caption: "PRISMA 2020 형식으로 그린 코퍼스 구축 흐름도. 왼쪽은 다섯 가지 주제 검색에서 시작해 이름과 arXiv ID로 중복을 없애고 데이터셋과 모델 7종을 걸러 낸 뒤 병렬 감사 에이전트가 메타데이터를 검증해 벤치마크 160개를 남기는 경로이고, 오른쪽은 인접 서베이 8편을 모으는 경로다"
    page: 5
    bbox_norm: [0.1431, 0.118, 0.8595, 0.4929]
    strategy: caption-region
    curated: false
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/jena-2026-do-world-models-make-better/fig04.png
    raw: raw/papers/jena-2026-do-world-models-make-better-figures/fig04.png
    caption: "코퍼스 요약 지표와 capability 영역별 벤치마크 수 막대그래프. long-horizon과 planning 26개, manipulation과 손재주 22개, 생성 품질 19개 순이며 12개 영역의 합이 160개다"
    page: 6
    bbox_norm: [0.1406, 0.3884, 0.8594, 0.6483]
    strategy: caption-region
    curated: false
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/jena-2026-do-world-models-make-better/fig05.png
    raw: raw/papers/jena-2026-do-world-models-make-better-figures/fig05.png
    caption: "벤치마크 160개의 네 가지 분포. 연도별 공개 수는 2017년 2개에서 2024년 36개로 올랐다가 줄고, evaluation lane은 embodied 85개가 가장 많으며, 평가 모드는 closed-loop 113개 대 open-loop 43개 대 bridge 4개이고, contrast는 model-agnostic 138개 대 partial 11개 대 explicit 11개다"
    page: 7
    bbox_norm: [0.1406, 0.1379, 0.859, 0.4098]
    strategy: caption-region
    curated: true
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/jena-2026-do-world-models-make-better/fig06.png
    raw: raw/papers/jena-2026-do-world-models-make-better-figures/fig06.png
    caption: "연도별 closed-loop 벤치마크와 open-loop 벤치마크 수를 나란히 놓은 막대그래프. 2024년까지는 closed-loop가 앞서지만 2025년에 open-loop 13개가 closed-loop 6개를 넘어선다"
    page: 9
    bbox_norm: [0.1488, 0.1459, 0.8587, 0.3702]
    strategy: caption-region
    curated: true
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/jena-2026-do-world-models-make-better/fig07.png
    raw: raw/papers/jena-2026-do-world-models-make-better-figures/fig07.png
    caption: "대표 벤치마크 86개를 하나의 뿌리 아래 네 evaluation lane으로 묶은 taxonomy 나무. policy suite는 manipulation과 일반화와 손재주로, embodied agent는 long-horizon과 사회적 상호작용과 내비게이션과 자율주행과 반사실과 locomotion으로, world-model eval은 생성 품질과 물리 추론과 반사실과 자율주행으로 나뉘고, 맨 아래 bridge에는 세 개만 있다"
    page: 10
    bbox_norm: [0.1591, 0.1127, 0.8409, 0.7613]
    strategy: caption-region
    curated: true
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/jena-2026-do-world-models-make-better/fig08.png
    raw: raw/papers/jena-2026-do-world-models-make-better-figures/fig08.png
    caption: "코퍼스에 속한 벤치마크들이 자기 논문에 실은 과제와 장면 그림을 evaluation lane별로 모은 갤러리. 각 칸에 arXiv 식별자가 붙어 원 논문으로 연결된다"
    page: 11
    bbox_norm: [0.1402, 0.1124, 0.8598, 0.7628]
    strategy: caption-region
    curated: false
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/jena-2026-do-world-models-make-better/fig09.png
    raw: raw/papers/jena-2026-do-world-models-make-better-figures/fig09.png
    caption: "코퍼스에 속한 벤치마크들이 보고한 결과 그림을 모은 갤러리. 순위표와 레이더 차트와 분포도가 주를 이루며 결과 그림을 내지 않은 벤치마크는 생략했다"
    page: 15
    bbox_norm: [0.1402, 0.1124, 0.8599, 0.6155]
    strategy: caption-region
    curated: false
  - id: fig10
    label: Figure 10
    kind: figure
    file: assets/jena-2026-do-world-models-make-better/fig10.png
    raw: raw/papers/jena-2026-do-world-models-make-better-figures/fig10.png
    caption: "예측의 이득을 분리해 내는 평가 루프. 과제와 장면이 direct VLA policy 가지와 예측 후 planning하는 world model 가지로 갈라져 같은 closed-loop 환경에서 실행되고, 같은 과제 성공 척도로 채점한 뒤 capability별 차이를 읽는다. 아래 점선 상자에 model-agnostic suite는 가지 하나만 실행하고 world model suite는 루프에 닿지 못한다고 적었다"
    page: 17
    bbox_norm: [0.1402, 0.1124, 0.8598, 0.4753]
    strategy: caption-region
    curated: true
  - id: fig11
    label: Figure 11
    kind: figure
    file: assets/jena-2026-do-world-models-make-better/fig11.png
    raw: raw/papers/jena-2026-do-world-models-make-better-figures/fig11.png
    caption: "제안한 네 가지 측정량의 목표 형태를 그린 개념도. 측정 결과가 아니라 목표 모양이며, capability별 advantage of prediction 곡선, 우연 수준에 머무는 반사실 정확도와 목표치, open-loop 품질과 closed-loop 성공 사이의 간극, capability별 contrast coverage를 차례로 보여 준다"
    page: 20
    bbox_norm: [0.1461, 0.14, 0.8534, 0.492]
    strategy: caption-region
    curated: true
  - id: tab01
    label: Table 1
    kind: table
    file: assets/jena-2026-do-world-models-make-better/tab01.png
    raw: raw/papers/jena-2026-do-world-models-make-better-figures/tab01.png
    caption: "가장 가까운 서베이 8편과 이 서베이를 다섯 조직 기준으로 비교한 표. 평가 모드, capability 구분, capability 대 model family 교차표, advantage of prediction 지표, 벤치마크 목록 다섯 열 중 교차표 열은 이 서베이만 채운다"
    page: 4
    bbox_norm: [0.1402, 0.1122, 0.8598, 0.3536]
    strategy: table-region
    curated: false
  - id: tab02
    label: Table 2
    kind: table
    file: assets/jena-2026-do-world-models-make-better/tab02.png
    raw: raw/papers/jena-2026-do-world-models-make-better-figures/tab02.png
    caption: "벤치마크를 평가 기준 위에 배치할 때 쓴 조작적 정의 표. open-loop 평가, closed-loop 평가, bridge, VLA 대 world model contrast, advantage of prediction 다섯 항목에 대해 무엇이 해당하고 무엇이 해당하지 않는지를 나란히 적었다"
    page: 6
    bbox_norm: [0.1398, 0.1129, 0.8619, 0.3319]
    strategy: table-region
    curated: false
  - id: tab03
    label: Table 3
    kind: table
    file: assets/jena-2026-do-world-models-make-better/tab03.png
    raw: raw/papers/jena-2026-do-world-models-make-better-figures/tab03.png
    caption: "160개 중 대표 31개를 evaluation lane별로 묶어 연도, 발표처, 평가 모드, capability, contrast 여부로 비교한 표. 7쪽과 8쪽에 걸쳐 있어 크롭에는 머리글과 첫 세 행만 들어갔다"
    page: 7
    bbox_norm: [0.1787, 0.726, 0.8213, 0.7615]
    strategy: table-region
    curated: false
  - id: tab04
    label: Table 4
    kind: table
    file: assets/jena-2026-do-world-models-make-better/tab04.png
    raw: raw/papers/jena-2026-do-world-models-make-better-figures/tab04.png
    caption: "evaluation lane마다 대표 벤치마크 하나씩(LIBERO, Habitat 3.0, WorldModelBench, World-in-World)을 골라 아홉 가지 평가 성질로 비교한 capability 행렬. 어느 대표도 VLA 대 world model contrast를 만들지 않고 반사실 검사도 전부 없다"
    page: 9
    bbox_norm: [0.1402, 0.4533, 0.8598, 0.6798]
    strategy: table-region
    curated: false
  - id: tab05
    label: Table 5
    kind: table
    file: assets/jena-2026-do-world-models-make-better/tab05.png
    raw: raw/papers/jena-2026-do-world-models-make-better-figures/tab05.png
    caption: "capability 구분마다 어떤 벤치마크가 그 능력을 검사하고 contrast를 만드는지 세부 감사한 표. hidden-state 4개 중 3개, theory-of-mind 4개 중 3개, 반사실 6개 중 3개가 contrast를 만드는 반면 long-horizon은 6개 중 1개, 사회적 상호작용은 5개 중 0개다"
    page: 12
    bbox_norm: [0.142, 0.247, 0.858, 0.7241]
    strategy: table-region
    curated: false
  - id: tab06
    label: Table 6
    kind: table
    file: assets/jena-2026-do-world-models-make-better/tab06.png
    raw: raw/papers/jena-2026-do-world-models-make-better-figures/tab06.png
    caption: "world-model eval lane의 벤치마크 34개를 하위 유형별로 모아 무엇을 채점하는지, 어떤 신호를 쓰는지, 물리 법칙을 다루는지 기록한 세부 표. 13쪽과 14쪽에 걸쳐 있어 크롭에는 뒷부분만 들어갔다"
    page: 13
    bbox_norm: [0.157, 0.4721, 0.843, 0.7963]
    strategy: table-region
    curated: false
  - id: tab07
    label: Table 7
    kind: table
    file: assets/jena-2026-do-world-models-make-better/tab07.png
    raw: raw/papers/jena-2026-do-world-models-make-better-figures/tab07.png
    caption: "world model이라는 말이 가리키는 다섯 가지 뜻을 표현 기준과 역할 기준으로 나눠 정리한 표. 각 뜻이 action 조건부인지, closed-loop에서 쓰이는지, 표준 평가 지표를 갖는지, VLA와 비교 가능한지를 표시했고 네 성질을 동시에 갖춘 뜻은 없다"
    page: 18
    bbox_norm: [0.1398, 0.1129, 0.8598, 0.3105]
    strategy: table-region
    curated: false
  - id: tab08
    label: Table 8
    kind: table
    file: assets/jena-2026-do-world-models-make-better/tab08.png
    raw: raw/papers/jena-2026-do-world-models-make-better-figures/tab08.png
    caption: "네 evaluation lane을 여섯 평가 성질로 비교하고 lane마다 구조적 맹점을 한 줄로 적은 행렬. 루프를 닫으면서 capability를 나누고 model family contrast까지 만드는 lane은 없다"
    page: 18
    bbox_norm: [0.1402, 0.4182, 0.86, 0.5919]
    strategy: table-region
    curated: false
  - id: tab09
    label: Table 9
    kind: table
    file: assets/jena-2026-do-world-models-make-better/tab09.png
    raw: raw/papers/jena-2026-do-world-models-make-better-figures/tab09.png
    caption: "향후 의제로 제안한 네 가지 측정량의 정의와 구체적 testbed와 겨냥하는 기준을 적은 표. advantage of prediction 곡선, 반사실 정확도, 예측 대 실행 충실도 간극, capability별 contrast coverage 순이다"
    page: 19
    bbox_norm: [0.1402, 0.1129, 0.8598, 0.3148]
    strategy: table-region
    curated: false
  - id: tab10
    label: Table 10
    kind: table
    file: assets/jena-2026-do-world-models-make-better/tab10.png
    raw: raw/papers/jena-2026-do-world-models-make-better-figures/tab10.png
    caption: "부록 A의 전체 목록. 벤치마크 160개를 연도, capability, 평가 모드, contrast 네 열로 적었고 evaluation lane과 capability로 묶었다. 29쪽부터 여러 쪽에 걸쳐 있어 크롭은 첫 쪽 전면이다"
    page: 29
    bbox_norm: [0.0, 0.0, 1.0, 1.0]
    strategy: page-region
    low_confidence: true
    curated: false
  - id: tab11
    label: Table 11
    kind: table
    file: assets/jena-2026-do-world-models-make-better/tab11.png
    raw: raw/papers/jena-2026-do-world-models-make-better-figures/tab11.png
    caption: "Figure 8 갤러리의 칸마다 어느 논문의 몇 번 그림을 가져왔는지 적은 출처 표"
    page: 33
    bbox_norm: [0.1402, 0.113, 0.8599, 0.5717]
    strategy: table-region
    curated: false
  - id: tab12
    label: Table 12
    kind: table
    file: assets/jena-2026-do-world-models-make-better/tab12.png
    raw: raw/papers/jena-2026-do-world-models-make-better-figures/tab12.png
    caption: "Figure 9 갤러리의 칸마다 어느 논문의 몇 번 그림을 가져왔는지 적은 출처 표"
    page: 34
    bbox_norm: [0.1402, 0.1132, 0.8598, 0.4115]
    strategy: table-region
    curated: false
  - id: tab13
    label: Table 13
    kind: table
    file: assets/jena-2026-do-world-models-make-better/tab13.png
    raw: raw/papers/jena-2026-do-world-models-make-better-figures/tab13.png
    caption: "Figure 1 표지 그림의 칸마다 어느 논문의 몇 번 그림을 가져왔는지 적은 출처 표"
    page: 34
    bbox_norm: [0.1402, 0.487, 0.8598, 0.6741]
    strategy: table-region
    curated: false
---

## 한 줄 요약 (One-line Summary)

2017년부터 2026년까지의 로봇 평가 벤치마크 160개를 웹으로 검증해 모으고, world model이 direct VLA policy보다 실제로 더 잘 행동하게 만드는지를 재는 벤치마크가 사실상 없다는 것을 수치로 보인 평가 서베이다.

## 1. 자료 정보 (Document Information)

- arXiv:2609.29669v1 [cs.RO], 2026년 8월 30일 공개. 본문 21쪽에 참고문헌과 부록을 더해 34쪽이다.
- 저자는 Gaytri Jena(UC Berkeley), Kapil Wanaskar(San Jose State University), Vinija Jain(Meta), Aman Chadha(Apple), Vasu Sharma(PocketFM), Amitava Das(Pragya Lab, BITS Pilani Goa)다. 각주에 저자들이 소속 업무와 무관하게 독립적으로 참여했다고 적혀 있다.
- 키워드는 robot learning, world models, evaluation, benchmarks, vision-language-action models, embodied AI, predictive models, survey다.
- 라이선스는 CC BY 4.0이다.
- 도식은 Figure 11개와 Table 13개다. Table 10은 부록 A의 전체 목록이고 Table 11부터 Table 13까지는 갤러리 그림의 출처 표다.

### 서베이의 단위와 제외 기준

이 서베이의 단위는 모델이 아니라 벤치마크다. 개별적으로 인용 가능한 평가 산출물, 즉 평가 suite나 채점 protocol이 붙은 데이터셋이나 과제 분포를 갖춘 상호작용 환경을 벤치마크로 본다.

인접한 세 가지는 의도적으로 뺐다.

1. 개별 모델과 policy. 벤치마크가 채점하는 대상이므로 벤치마크가 아니다.
2. 채점 protocol이 없는 데이터셋.
3. 과제 분포가 없는 순수 시뮬레이터.

모델과 벤치마크를 함께 기여한 논문은 벤치마크 부분만 코퍼스에 들어간다.

## 2. 주요 기여 (Key Contributions)

1. 벤치마크 160개를 네 evaluation lane과 12개 capability 영역으로 배치한 조작적 taxonomy를 제시한다. 대표 86개가 본문 taxonomy 그림에, 전체 160개가 부록 목록에 들어간다.
2. 코퍼스의 분포를 다섯 그림으로 요약한다. 연도별 공개 수, evaluation lane별 수, 평가 모드별 수, contrast 유형별 수, capability 영역별 수다.
3. 가장 가까운 서베이 8편과의 coverage 비교표를 제시한다. capability와 model family를 하나의 protocol 아래 교차시킨 것은 이 서베이뿐이다.
4. contrast 결손을 분석한다. 예측의 이득을 분리해 내는 평가 루프를 그림으로 정의하고, world model이라는 말의 다섯 가지 뜻을 구분하며, lane마다 왜 contrast가 만들어지지 않는지를 표로 정리한다.
5. advantage 인식 평가를 위한 실행 가능한 protocol을 제안한다. 측정 가능한 네 가지 양과 각각의 구체적 testbed를 짝지었다.

저자들은 조직 주장을 의도적으로 좁게 잡는다. world model이 도움이 된다거나 되지 않는다고 주장하지 않고, 현재의 벤치마크로는 그 질문에 답할 수 없으며 답하려면 벤치마크가 어떤 조건을 갖춰야 하는지를 규정한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 두 흐름과 그 사이의 빈 칸

로봇을 학습시키는 방법은 크게 두 가지다.

첫째는 direct policy를 배우는 방법이다. policy는 현재 observation을 받아 다음 action을 정하는 함수를 말하며, 최근에는 VLA 모델이 이 흐름의 대표다. 채점은 환경에서 실행해 과제 성공 수를 세는 방식이고 LIBERO, CALVIN, RLBench, ManiSkill2 같은 suite가 쓰인다.

둘째는 world model을 배우는 방법이다. world model은 환경의 동역학을 학습해 미래를 예측하는 모델이며, 컨트롤러가 그 예측을 놓고 planning한다. 이 흐름에는 latent dynamics 예측기(DreamerV3, TD-MPC2), action 조건부 영상 예측기(iVideoGPT, GR-2), 대형 생성 영상 모델(Sora, Cosmos, Genie)이 모두 들어간다. 채점은 행동이 아니라 예측이나 생성의 품질로 하며 VBench, EvalCrafter, EWMBench 같은 suite가 쓰인다.

두 흐름 사이에 어느 쪽도 답하도록 만들어지지 않은 질문이 있다. world model을 쓰면 direct policy보다 closed-loop에서 측정 가능한 이득을 얻는가, 그리고 어떤 capability에서 그러한가다. 저자들은 이 결손이 경험적인 것이 아니라 방법론적인 것이라고 본다. world model 벤치마크는 rollout을 사실성이나 물리적 타당성으로 채점하고 거기서 멈추므로 그 예측이 로봇의 행동에 도움이 됐을지는 보고하지 못한다. 과제 성공 suite는 루프를 닫지만 policy 하나만 올려 두고 의도적으로 model-agnostic하게 설계되므로 world model policy와 direct VLA policy를 하나의 protocol 아래 맞대어 보지 않는다.

### 3.2 다섯 조직 기준

서베이는 예측형 embodied 평가를 조직할 수 있는 다섯 기준을 세우고 그 위에 기존 서베이와 자신을 놓는다.

| 기호 | 기준 | 뜻 |
|---|---|---|
| α | 평가 모드 | open-loop인지 closed-loop인지를 1차 기준으로 삼는지 |
| β | capability | hidden-state, 반사실(counterfactual), long-horizon, 사회적 상호작용 같은 능력별 구분을 두는지 |
| γ | model family 교차 | capability와 model family를 하나의 protocol 아래 교차표로 놓는지 |
| δ | advantage 지표 | 예측이 주는 행동상의 이득을 재는 지표를 다루는지 |
| ε | 벤치마크 목록 | 포괄적인 벤치마크 카탈로그를 담았는지 |

기존 서베이 8편은 ε를 잘 채우고 α와 β를 지나가듯 다루지만, γ는 어디에도 없고 δ는 position paper 한 편이 부분적으로 닿았을 뿐 서베이가 다룬 적이 없다. 저자들은 δ에 대해 자신들도 특정 지표를 채택하지 않고 후보로 평가만 한다는 점을 명시한다.

비교 대상 8편은 Evaluation of Embodied AI(Authorea 2026), VLA Datasets and Benchmarks(arXiv 2026), Benchmark Construction(arXiv 2026), RL Reproducibility(CoRL 2020), World Models for Robots(arXiv 2026), Embodied World Models(preprint 2026), WM Evaluation position paper(arXiv 2026), Embodied AI Simulators(IEEE TETCI 2022)다. 심사를 거친 발표처는 CoRL과 IEEE TETCI 두 곳뿐이고 나머지는 preprint다.

### 3.3 코퍼스 구축 절차

후보는 arXiv와 출판사 발표처와 프로젝트 페이지를 병렬 웹 검색해 모았다. 질의 문자열은 네 evaluation lane(policy, embodied, world-model, bridge)과 capability 용어(manipulation, navigation, long-horizon, social, counterfactual, physical reasoning, generation quality)와 benchmark, evaluation, suite라는 단어의 곱집합으로 만들었다.

검증 절차는 다음과 같다.

- 모든 후보를 arXiv나 발표처 페이지에 대조해 정확한 제목, 제1저자, 연도, 식별자를 확인했다.
- 검증되지 않은 후보는 기억에 의존해 기록하지 않고 버렸다.
- 인용 키와 arXiv 식별자 양쪽으로 중복을 제거했다.
- 선별 단계에서 데이터셋이나 모델인 7종(Open X-Embodiment, DexYCB, DexGraspNet, AGIBot World, RoboCat, MimicGen, DexMimicGen)을 뺐다.

결과는 벤치마크 160개이며 그중 155개가 arXiv 식별자를 갖고 5개는 없다. 참고문헌 164개는 벤치마크 155개와 서베이 8편과 방법론 문헌 1편의 합이고, 이름으로만 인용한 벤치마크 5개는 참고문헌에 들어가지 않는다. 저자들은 중복 제거 이전의 후보 수와 검증 실패로 버린 후보 수를 기록하지 않았다는 사실을 추정치로 메우지 않고 그대로 적었다.

### 3.4 배치 기준과 core 대 부록 규칙

벤치마크마다 네 가지를 판정한다. evaluation lane, 주로 강조하는 capability, 평가 모드(open-loop 예측 또는 생성 품질, closed-loop 과제 성공, 예측을 실행으로 잇는 bridge), 그리고 VLA 대 world model contrast를 자체적으로 만드는지 여부(explicit, partial, model-agnostic)다.

경계 사례를 취향이 아니라 문서화된 규칙으로 가르기 위해 조작적 정의를 표로 고정했다.

| 구성 | 해당하는 경우 | 해당하지 않는 경우 |
|---|---|---|
| open-loop 평가 | 고정된 입력에 대해 예측이나 생성의 품질을 채점하고 그 예측을 피드백 루프에서 실행하지 않는다. 영상 충실도(FVD), 물리 일관성이나 rollout 일관성, 프레임 단위 정확도가 여기 든다 | action이 실행되고 환경이 반응하는 모든 protocol, policy 성공을 오프라인으로 채점하는 것 |
| closed-loop 평가 | policy를 환경 안에서 상태 피드백과 함께 실행해 과제 결과를 채점한다. 성공률, 하위 목표 달성, 상호작용 아래 reward가 여기 든다 | 생성된 영상이나 정적 예측을 채점하는 것, 환경을 한 스텝도 진행하지 않고 계산한 지표 |
| bridge | 예측(상상된 rollout, 영상, latent plan)을 실행 가능한 action으로 바꾸고 그 결과의 과제 성공을 채점한다 | 예측 품질에서 멈추는 벤치마크, 예측을 제어 신호로 바꾸지 않는 벤치마크 |
| contrast(γ) | 벤치마크 자체가 direct VLA policy와 world model policy를 하나의 protocol로 함께 실행하고 맞대결 결과를 보고한다 | 어느 계열이든 올릴 수 있게 열어 둔 model-agnostic suite, 원 논문에서 한 계열로만 평가된 suite |
| advantage of prediction(δ) | 같은 과제에서 예측형 policy가 짝지어진 direct VLA baseline보다 얻은 closed-loop 이득을 재는 지표가 있다 | 짝지어진 baseline 없는 절대 성공률, open-loop 품질 점수, 예측 요소를 분리하지 않는 순위 |

코퍼스가 크기 때문에 본문 taxonomy와 부록 목록을 나눴다. 기준에 깨끗하게 배치되고 이웃과 구별되며 논문만으로 성질을 다 적을 수 있는 벤치마크 86개가 본문 taxonomy에 들어가고, 전체 160개는 부록 A의 목록에 들어간다. 본문의 모든 수치는 그 목록과 맞춰져 있다.

### 3.5 네 evaluation lane

evaluation lane은 벤치마크를 채점 방식이 실제 실행된 행동에 얼마나 가까운지에 따라 나눈 묶음이다. lane은 가까운 순서대로 놓인다.

| lane | 수 | 무엇을 채점하는가 | 하위 묶음 |
|---|---|---|---|
| policy suite | 37 | policy를 실행해 과제 성공을 센다 | manipulation, 일반화, 기타, 손재주 |
| embodied agent | 85 | 내비게이션과 가사 과제 등에서 과제 성공을 센다 | long-horizon, 사회적 상호작용과 멀티에이전트, 내비게이션, 자율주행, 반사실, locomotion |
| world-model eval | 34 | 행동 없이 예측과 생성을 직접 채점한다 | 생성 품질, 물리 추론, 반사실, 자율주행 |
| bridge | 4 | 예측을 실행으로 바꿔 과제 성공을 채점한다 | 기타 |

**policy suite lane**은 단일 팔과 양팔 manipulation(ARNOLD, PerAct, FMB, ManiSkill2), 물체와 장면과 sim2real 간극을 바꾸는 일반화 suite(LIBERO, THE COLOSSEUM, SIMPLER, VIMA-Bench), 손재주(Bi-DexHands, DexArt, UniDexGrasp)로 이어진다. 이 suite들은 policy 평가의 뼈대이며 의도적으로 model-agnostic하다. 사용자가 가져오는 어떤 policy든 올릴 수 있고 특정 구조를 편들지 않도록 조심스럽게 설계된다. 저자들은 바로 그 중립성 때문에 이 suite들이 자체로는 world model policy가 direct policy를 이기는지 답할 수 없다고 본다.

**embodied agent lane**은 가장 크고 가장 다양하다. long-horizon 가사와 planning(ALFRED, BEHAVIOR-1K, EmbodiedBench), 사회적 상호작용과 멀티에이전트(Habitat 3.0, Overcooked-AI, Melting Pot), 내비게이션(Habitat, HM3D, GOAT-Bench), 자율주행(CARLA, Bench2Drive, Waymax), 반사실 추론(CausalWorld, CoPhy, ACRE), locomotion(HumanoidBench, Barkour, Isaac Gym)을 담는다. 서베이의 질문에 중요한 관찰은 두 가지다. 첫째, policy lane과 마찬가지로 압도적으로 model-agnostic하다. 둘째, 예측형 world model이 가장 도움이 될 법한 반사실 하위 묶음이 가장 얇고, 인과 추론 과제로 채워져 있을 뿐 closed-loop VLA 대 world model contrast로 실행되는 일은 거의 없다.

**world-model eval lane**은 행동 없이 예측과 생성을 직접 채점한다. 생성 품질(VBench, EvalCrafter, EWMBench, EVA-Bench), 물리 추론(IntPhys, PhysBench, PhyGenBench, Physics-IQ), 반사실 영상 추론(CLEVRER, WorldPrediction), 자율주행 world model(Vista)로 나뉜다. 34개 전수를 조사한 표는 각 벤치마크가 무엇을 채점하는지(생성, 질의응답, 물리 예측), 어떤 신호를 쓰는지(자동 지표, 정답 대비 정확도, 기대 위배, 사람 평가), 물리 법칙을 다루는지를 기록한다. 이 lane의 한계는 균일하다. 모든 벤치마크가 open-loop로 채점하고 예측한 것을 실행하지 않으므로, 높은 생성 점수는 시각 품질을 증명할 뿐 과제 성공에 대해서는 아무 말도 하지 않는다.

**bridge lane**은 최전선이면서 네 개뿐이다. RoboWM-Bench는 world model의 예측이 실행 가능한지를 검사하고, World-in-World와 WorldArena는 world model을 closed-loop에 넣어 rollout 사실성이 아니라 과제 성공으로 채점하며, WorldSimBench는 생성 모델을 렌더러이자 제어 가능한 시뮬레이터 양쪽으로 채점한다. 예측을 실행된 action까지 옮기는 유일한 벤치마크들이지만 넷 중 어느 것도 direct VLA policy와 world model policy를 하나의 protocol 아래 capability별로 맞대결시켜 보고하지는 않는다. 루프를 닫을 수 있다는 것은 증명했지만 예측의 이득을 분리하는 방식으로 닫지는 못했다.

### 3.6 world model이라는 말의 다섯 가지 뜻

contrast를 만들기 어려운 이유 중 하나로 저자들은 world model이라는 용어의 과부하를 든다. 문헌이 습관적으로 섞어 쓰는 두 기준을 분리한다.

| 기준 | 뜻 | 예시 | action 조건부 | closed-loop | 표준 지표 | VLA 비교 가능 |
|---|---|---|---|---|---|---|
| 표현 | latent dynamics 예측기 | DreamerV3, TD-MPC2 | 있음 | 있음 | 부분 | 부분 |
| 표현 | action 조건부 미래 프레임 예측기 | iVideoGPT, GR-2 | 있음 | 부분 | 부분 | 부분 |
| 표현 | 생성형 영상 모델 | Sora, Cosmos, Genie | 부분 | 없음 | 있음 | 없음 |
| 역할 | policy 학습과 평가를 위한 학습된 환경 | UniSim | 있음 | 있음 | 부분 | 부분 |
| 역할 | world model을 채점하는 평가 대상 | WorldSimBench, WorldModelBench, EWMBench | 해당 없음 | 부분 | 있음 | 없음 |

핵심은 action 조건부이면서 closed-loop에서 돌아가고 하나의 protocol로 VLA와 비교할 수 있는 뜻이 하나도 없다는 점이다. latent 예측기와 action 조건부 예측기는 행동하지만 표준 생성 지표로 채점되는 일이 드물고, 생성 모델은 지표를 갖췄지만 루프에 들어가는 일이 드물다. 따라서 world model policy와 VLA policy를 대조하려는 벤치마크는 기존 어느 뜻도 한꺼번에 제공하지 않는 성질들을 스스로 조립해야 한다.

### 3.7 예측의 이득을 분리하는 평가 루프

서베이의 질문은 다음처럼 정확하게 적을 수 있다. direct policy가 observation을 action으로 보내고, world model policy가 먼저 미래 observation을 예측한 뒤 그 예측을 놓고 planning한다고 하자. 예측의 이득은 짝지어진 direct policy 대비 world model policy의 closed-loop 과제 성공 증가분이며, hidden state나 가림이나 긴 과제 길이가 앞을 내다보는 일을 가치 있게 만드는 곳에서 더 커야 하므로 capability별로 보고할 때만 의미를 갖는다.

이 정의가 요구하는 루프는 다음과 같다.

1. 과제와 장면이 direct VLA 가지와 world model 가지로 갈라진다.
2. 두 가지 모두 상태 피드백이 있는 하나의 closed-loop에서 실행된다.
3. 두 가지 모두 같은 과제 성공 척도로 채점된다.
4. 차이를 capability별로 읽는다.

오늘의 벤치마크는 이 루프를 두 방식 중 하나로 끊는다. model-agnostic한 policy suite와 embodied suite는 루프를 닫지만 가지 하나만 실행하므로 읽을 대조가 없다. world-model eval suite는 예측 가지를 open-loop로 채점하고 실행하지 않으므로 높은 점수가 생성 품질을 증명할 뿐 과제 성공을 증명하지 않는다. bridge는 world model policy에 대해 루프를 닫지만 짝지어진 VLA 가지를 capability별로 실행하지 않는다. 어느 lane도 그림을 완성하지 못한다.

### 3.8 lane별 맹점

네 lane을 여섯 평가 성질로 비교한 행렬이 패턴을 lane 단위로 드러낸다.

| lane | 루프 닫힘 | 과제 길이 | capability 폭 | model family contrast | 재현성 | 구조적 맹점 |
|---|---|---|---|---|---|---|
| policy suite | 닫는다 | 짧은 반응형 skill, 이어 붙이면 길어진다 | manipulation과 전이 중심, hidden-state는 드물다 | model-agnostic | 시뮬레이터 중심, 일부 실제 대 시뮬레이션 전이 | world model policy를 올릴 수는 있으나 VLA contrast를 만들지 않는다 |
| embodied agent | 닫는다 | long-horizon 가사와 대화 | 내비게이션과 사회적 상호작용과 일부 hidden-state | 한 suite 안의 memory 대 Markovian 대조 정도 | 시뮬레이터 편중, sim2real 간극 | capability 구분은 있으나 capability별 model family ablation이 없다 |
| world-model eval | 닫지 않는다 | 짧은 클립, 시간적이되 과제 수준은 아니다 | 물리와 시간 중심, 반사실은 거의 없다 | world model만 채점한다 | 고정된 오프라인 집합과 결정론적 채점 | 시각 품질은 과제 성공이 아니며 행동상의 유용성을 보이지 못한다 |
| bridge | 예측을 실행으로 바꾼다 | 단일 실행 rollout | 좁다, 실행 가능성 위주 | world model을 policy 기반으로 쓰되 VLA 쪽 극이 없다 | 새롭고 아직 표준화되지 않은 protocol | 실행에는 닿지만 capability별 VLA 맞대결이 빠져 있다 |

closed-loop 채점과 capability별 구분과 world model 대 VLA family contrast가 겹치는 자리가 정확히 비어 있고, 저자들은 그 빈 칸을 이 서베이의 기여로 지목한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 코퍼스 분포

숫자는 모두 부록 목록에서 직접 다시 센 값이다.

| 구분 | 값 |
|---|---|
| 벤치마크 | 160개 |
| 참고문헌 | 164개 |
| evaluation lane | 4개 |
| capability 영역 | 12개 |
| explicit contrast | 11개 |
| 수집 기간 | 2017년부터 2026년까지 |

evaluation lane별로는 policy suite 37개, embodied agent 85개, world-model eval 34개, bridge 4개다. 평가 모드별로는 closed-loop 과제 성공 113개, open-loop 예측이나 생성 43개, bridge 4개다. contrast 기준으로는 model-agnostic 138개, partial 11개, explicit 11개이며 explicit은 전체의 7%다.

capability 영역별 분포는 다음과 같다.

| capability 영역 | 벤치마크 수 |
|---|---|
| long-horizon과 planning | 26 |
| manipulation과 손재주 | 22 |
| 생성 품질 | 19 |
| 내비게이션(VLN 포함) | 16 |
| 물리 추론 | 13 |
| 사회적 상호작용과 멀티에이전트 | 12 |
| hidden-state와 theory-of-mind | 9 |
| 반사실 | 9 |
| 자율주행 | 9 |
| 일반화 | 7 |
| locomotion | 6 |
| 기타 영역 | 12 |

연도별로는 2017년 2개에서 꾸준히 늘어 2024년 36개로 정점을 찍고 2025년 20개, 2026년 2개로 줄어든다. 2026년은 집계가 부분적이다.

### 4.2 open-loop 평가가 앞지른 시점

평가 모드를 연도별로 나눠 세면 흐름의 전환이 보인다. closed-loop suite는 2024년까지 우세하다가 2025년에 뒤집힌다.

| 연도 | closed-loop | open-loop |
|---|---|---|
| 2019 | 10 | 3 |
| 2020 | 16 | 1 |
| 2021 | 19 | 4 |
| 2022 | 8 | 3 |
| 2023 | 24 | 7 |
| 2024 | 24 | 11 |
| 2025 | 6 | 13 |

2025년에 open-loop 13개가 closed-loop 6개를 넘어선 것은 world model 생성 문헌이 도착했기 때문이다. 예측을 실행으로 잇는 bridge 네 개는 그보다도 새로워 전부 2024년 이후에 나왔다.

### 4.3 capability별 contrast 감사

capability 구분마다 어떤 벤치마크가 그 능력을 검사하고 그중 몇 개가 contrast를 만드는지 세면 편중이 뚜렷하다.

| capability 구분 | contrast를 만드는 비율 | contrast를 만드는 벤치마크 |
|---|---|---|
| hidden-state, 기억, 가림 | 4개 중 3개 | LIBERO-Mem, ComPhy, Bongard-HOI(부분) |
| theory-of-mind | 4개 중 3개 | AGENT, BIB, PHASE(부분) |
| 반사실과 물리 추론 | 6개 중 3개 | ACRE, CoPhy, CausalWorld |
| long-horizon과 조합 | 6개 중 1개 | ALFWorld(부분) |
| 사회적 상호작용과 멀티에이전트 | 5개 중 0개 | 없음 |

contrast는 hidden-state와 theory-of-mind와 반사실처럼 추론 성격이 강한 구분에 몰려 있고, 과제 성공 성격이 강한 long-horizon과 사회적 상호작용 구분은 거의 전부 model-agnostic이다.

### 4.4 lane별 대표 벤치마크 비교

lane마다 대표 하나씩을 골라 아홉 성질로 비교한 결과도 같은 결론을 가리킨다.

| 성질 | LIBERO | Habitat 3.0 | WorldModelBench | World-in-World |
|---|---|---|---|---|
| lane | policy suite | embodied 내비게이션 | world-model eval | bridge |
| 무엇을 채점하는가 | 과제 성공 | 사회적 내비게이션 성공 | 영상 예측 품질 | world model의 closed-loop 성공 |
| 평가 모드 | closed-loop | closed-loop | open-loop | bridge |
| 루프 안에서 action을 실행하는가 | 실행한다 | 실행한다 | 실행하지 않는다 | 실행한다 |
| VLA 대 world model contrast | 없음 | 없음 | 없음 | 부분 |
| 강조하는 capability | 짧은 과제와 전이 | 사회적 상호작용과 멀티에이전트 | 물리적 사실성 | plan 실행 가능성 |
| capability별 구분 | 부분 | 부분 | 없음 | 없음 |
| advantage of prediction 지표 | 없음 | 없음 | 없음 | 부분 |
| 반사실 검사 | 없음 | 없음 | 없음 | 없음 |

어느 lane의 대표도 contrast를 만들지 않고, 반사실 검사는 네 대표 모두에서 빠져 있다.

### 4.5 advantage 지표는 평가만 하고 채택하지 않는다

루프를 닫는 것은 필요조건이지 충분조건이 아니며 이득을 잴 도구도 있어야 한다. ACTION-ATLAS의 World Advantage Score처럼 행동상의 advantage of prediction 점수를 제안한 사례가 있지만 벤치마크 suite 전반에 자리 잡은 것이 아니라 position paper에서 제시된 단계다. 저자들은 그런 도구를 정답으로 채택하지 않고 후보로 평가만 하며, advantage 양은 짝지어진 baseline 대비 capability별 분포나 곡선으로 보고해야 하고 단일 대표 수치로 보고해서는 안 된다고 규정한다.

### 4.6 제안한 네 가지 측정량

| 측정량 | 정의 | testbed | 겨냥하는 기준 |
|---|---|---|---|
| advantage of prediction 곡선 | 짝지어진 direct VLA baseline 대비 예측형 policy의 closed-loop 성공 증가분을 capability별 곡선으로 보고한다 | LIBERO와 CALVIN을 하나의 harness로 돌리는 capability 구분 protocol | γ family, δ metric |
| 반사실 정확도 | 직접 보이지 않거나 가정된 동역학에 대한 추론이 필요한 episode에서의 과제 성공. 가림, 물체 영속성, 가정 질문이 여기 든다 | WorldPrediction에 LIBERO-Mem 방식의 가림과 기억 분할을 더한 구성 | β capability |
| 예측 대 실행 충실도 간극 | world model의 open-loop 생성 품질과 closed-loop 과제 성공의 차이 | WorldSimBench와 World-in-World 같은 bridge protocol | α mode |
| capability별 contrast coverage | 하나의 protocol 아래 VLA 대 world model 맞대결을 실제로 실행하는 capability의 비율 | 부록 목록을 선언된 contrast 스키마에 대조하는 감사 | γ family, ε catalog |

네 가지 모두 단일 수치가 아니라 분포나 곡선으로 보고한다. 그래야 "예측이 도움이 된다"를 "예측이 여기서 이만큼 도움이 된다"로 바꿀 수 있다는 것이 저자들의 설명이다.

제안 그림의 네 칸은 측정 결과가 아니라 목표 형태다. world model policy가 짝지어진 baseline을 capability 전반에서 넘어서야 한다는 곡선, 현재 우연 수준에 머무는 반사실 정확도가 올라가야 한다는 막대, open-loop 품질이 closed-loop 성공을 크게 웃도는 간극을 보고해야 한다는 막대, capability별 contrast coverage가 목표선에 한참 못 미친다는 막대다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

저자들이 명시한 한계는 네 가지다.

1. 단위가 모델이 아니라 벤치마크다. 코퍼스는 이 분야가 예측형 embodied 지능을 어떻게 측정하는지를 그릴 뿐, 어떤 world model이나 VLA policy가 더 강한지에 대해서는 의도적으로 아무 말도 하지 않는다. 모델 순위를 찾는 독자는 여기서 찾을 수 없다.
2. contrast 기준이 조작적 정의에 기댄다. 두 가지를 하나의 protocol로 실행할 때만 contrast로 세므로, 더 느슨하게 읽으면 일부 벤치마크가 model-agnostic에서 partial로 옮겨 간다. 다만 explicit contrast가 드물고 반사실 coverage가 얇다는 질적 그림은 판정 기준을 바꿔도 유지된다고 본다.
3. coverage가 최근의 영어권 arXiv 인덱스에 오른 문헌으로 기울어 있다. 웹 검색으로 닿을 수 있는 범위가 한계이며, 수집 흐름도는 기록된 단계만 담고 있고, 두 갤러리에는 그림을 찾아 출처를 확인할 수 있는 벤치마크만 들어갔다. 따라서 갤러리에 없다는 것이 결과가 없다는 증거는 아니다.
4. advantage of prediction 도구는 채택이 아니라 후보 평가에 그친다. 분야가 아직 검증하지 않은 지표로 벤치마크의 순위를 매기지 않는다.

향후 과제는 제안한 네 측정량을 실제 벤치마크가 채택하는 것이다. 저자들은 다음에 중요해질 벤치마크가 과제 수가 가장 많거나 렌더링이 가장 사실적인 것이 아니라, 두 가지를 하나의 루프에서 실행하고 그 차이를 읽어 내는 것이라고 맺는다.

## 6. 관련 연구 (Related Work)

- **평가 서베이 8편**. Evaluation of Embodied AI, VLA Datasets and Benchmarks, Benchmark Construction, RL Reproducibility, World Models for Robots, Embodied World Models, WM Evaluation position paper, Embodied AI Simulators. 벤치마크 카탈로그는 잘 갖췄으나 capability와 model family의 교차표는 어디에도 없다.
- **policy suite 계열**. LIBERO, CALVIN, RLBench, ManiSkill2, Meta-World, SIMPLER, THE COLOSSEUM, RoboCasa, RoboArena, GemBench, VLABench.
- **embodied agent 계열**. ALFRED, BEHAVIOR-1K, Habitat 계열, HM3D, GOAT-Bench, CARLA, Bench2Drive, Waymax, Melting Pot, Overcooked-AI, HumanoidBench, Isaac Gym.
- **world model 평가 계열**. VBench와 VBench-2.0, EvalCrafter, EWMBench, EVA-Bench, WorldModelBench, WorldScore, Physics-IQ, Physion과 Physion++, IntPhys와 IntPhys 2, PhysBench, PhyGenBench, VideoPhy와 VideoPhy-2, CLEVRER, WorldPrediction, Vista.
- **bridge 계열**. RoboWM-Bench, World-in-World, WorldArena, WorldSimBench. 네 개뿐이며 전부 2024년 이후다.
- **모델 쪽 참조**. DreamerV3, TD-MPC2, iVideoGPT, GR-2, Sora, Cosmos, Genie, UniSim. 서베이의 채점 대상이 아니라 world model의 뜻을 가르기 위한 예시로 등장한다.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| evaluation lane | 벤치마크를 채점 방식이 실제 실행된 행동에 얼마나 가까운지에 따라 나눈 묶음. policy suite, embodied agent, world-model eval, bridge 네 가지다 |
| bridge | 예측을 실행 가능한 action으로 바꾸고 그 결과의 과제 성공을 채점하는 벤치마크 유형 |
| contrast | 벤치마크가 direct VLA policy와 world model policy를 하나의 protocol로 함께 실행하고 맞대결 결과를 보고하는 설계. explicit, partial, model-agnostic 세 단계로 판정한다 |
| model-agnostic | 어떤 계열의 policy든 올릴 수 있게 열어 두고 특정 구조를 편들지 않는 벤치마크 설계 |
| advantage of prediction | 짝지어진 direct policy 대비 world model policy의 closed-loop 과제 성공 증가분. 이 서베이의 δ 기준이다 |
| 예측 대 실행 충실도 간극 | world model의 open-loop 생성 품질과 closed-loop 과제 성공의 차이. 시각 품질이 과제 성공이 아니라는 경고를 수치로 옮긴 양이다 |
| capability별 contrast coverage | 하나의 protocol 아래 VLA 대 world model 맞대결을 실제로 실행하는 capability의 비율 |
| LWM, WAM, WFM | 이 논문이 world model의 표현 기준을 가를 때 쓰는 약어로 각각 latent world model, action 조건부 world model, 생성형 world foundation model을 가리킨다. 이 저장소에서 WAM은 [[overviews/glossary-physical-ai]]에 따라 world-action model을 뜻하므로 같은 약어를 서로 다른 뜻으로 쓰지 않도록 본문에서는 풀어 쓴다 |

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 2 | "Predict or Act 표지, 조직 질문을 실제 벤치마크로 배치" | caption-region | ★ wiki 권장 (motivation) |
| fig02 | 3 | "인접 서베이 8편 연표" | caption-region | 본문 표로 재작성 |
| fig03 | 5 | "PRISMA 형식 코퍼스 구축 흐름도" | caption-region | 본문 산문으로 재작성 |
| fig04 | 6 | "capability 영역별 벤치마크 수" | caption-region | 본문 표로 재작성 |
| fig05 | 7 | "벤치마크 160개의 네 가지 분포" | caption-region | ★ wiki 권장 (result) |
| fig06 | 9 | "연도별 closed-loop 대 open-loop 벤치마크 수" | caption-region | ★ wiki 권장 (result) |
| fig07 | 10 | "대표 벤치마크 86개의 taxonomy 나무" | caption-region | ★ wiki 권장 (framework) |
| fig08 | 11 | "벤치마크 과제와 장면 그림 갤러리" | caption-region | (확인 필요) |
| fig09 | 15 | "벤치마크 결과 그림 갤러리" | caption-region | (확인 필요) |
| fig10 | 17 | "예측의 이득을 분리하는 평가 루프" | caption-region | ★ wiki 권장 (method) |
| fig11 | 20 | "제안한 네 측정량의 목표 형태" | caption-region | ★ wiki 권장 (future) |
| tab01 | 4 | "인접 서베이 8편 coverage 비교" | table-region | 본문 표로 재작성 |
| tab02 | 6 | "배치에 쓴 조작적 정의" | table-region | 본문 표로 재작성 |
| tab03 | 7 | "대표 31개 세부 비교" | table-region | 페이지에 걸쳐 있어 임베드 부적합 |
| tab04 | 9 | "lane별 대표 벤치마크 capability 행렬" | table-region | 본문 표로 재작성 |
| tab05 | 12 | "capability 구분별 contrast 감사" | table-region | 본문 표로 재작성 |
| tab06 | 13 | "world-model eval 34개 세부 표" | table-region | 페이지에 걸쳐 있어 임베드 부적합 |
| tab07 | 18 | "world model의 다섯 가지 뜻" | table-region | 본문 표로 재작성 |
| tab08 | 18 | "네 lane 비교 행렬" | table-region | 본문 표로 재작성 |
| tab09 | 19 | "제안한 네 측정량과 testbed" | table-region | 본문 표로 재작성 |
| tab10 | 29 | "부록 A 전체 벤치마크 160개 목록" | page-region | 여러 쪽에 걸쳐 있어 임베드 부적합 |
| tab11 | 33 | "Figure 8 출처 표" | table-region | 임베드 불요 |
| tab12 | 34 | "Figure 9 출처 표" | table-region | 임베드 불요 |
| tab13 | 34 | "Figure 1 출처 표" | table-region | 임베드 불요 |
