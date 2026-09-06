---
title: "π0.5: a Vision-Language-Action Model with Open-World Generalization"
type: paper
year: 2025
category: physical-ai
raw_path: raw/papers/black-2025-pi05-a-vision-language-action-model-with.pdf
raw_filename: "black-2025-pi05-a-vision-language-action-model-with.pdf"
source_collection: external
authors: "Kevin Black, Noah Brown, Danny Driess, Chelsea Finn, Karol Hausman, Brian Ichter, Sergey Levine, Karl Pertsch, Lucy Xiaoyang Shi, Quan Vuong 외 (Physical Intelligence, 총 35인)"
arxiv_id: "2504.16054"
url: "https://pi.website/blog/pi05"
tags: [physical-ai, vla, manipulation, mobile-robot, robot-learning]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/black-2025-pi05-a-vision-language-action-model-with/fig01.png
    raw: raw/papers/black-2025-pi05-a-vision-language-action-model-with-figures/fig01.png
    caption: "π0.5 전체 그림. 왼쪽 multimodal data(subtask 명령, object detection, web VQA)와 오른쪽 robot action data(in-the-wild mobile/static, in-lab static, general robot data)가 하나의 VLA policy로 모이고, high-level에서 low-level, action expert 순으로 이어져 학습에 없던 집에 그대로 배치된다"
    page: 1
    bbox_norm: [0.0702, 0.2566, 0.9298, 0.6369]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/black-2025-pi05-a-vision-language-action-model-with/fig02.png
    raw: raw/papers/black-2025-pi05-a-vision-language-action-model-with-figures/fig02.png
    caption: "학습 데이터에 없던 부엌을 치우는 장면. close the cabinets, put the items in the drawer, wipe the spill, place the dishes in the sink"
    page: 2
    bbox_norm: [0.0103, 0.0606, 0.9298, 0.1924]
    strategy: caption-region
    curated: false
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/black-2025-pi05-a-vision-language-action-model-with/fig03.png
    raw: raw/papers/black-2025-pi05-a-vision-language-action-model-with-figures/fig03.png
    caption: "모델 개요. pre-training은 SigLIP 400M과 Gemma 2.6B로 이뤄진 VLM 위에서 subtask 문장, FAST 이산 action 토큰, 캡션, bounding box를 전부 next-token prediction으로 학습하고, post-training에서 300M action expert를 붙여 flow matching으로 연속 action을 낸다. 추론은 subtask를 먼저 출력하고 그 문장을 조건으로 action을 뽑는다"
    page: 4
    bbox_norm: [0.0702, 0.0606, 0.9298, 0.3456]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/black-2025-pi05-a-vision-language-action-model-with/fig04.png
    raw: raw/papers/black-2025-pi05-a-vision-language-action-model-with-figures/fig04.png
    caption: "학습 mixture를 이루는 여섯 슬라이스의 실제 예시. 실험실 cross-embodiment(CE), 다양한 집의 mobile manipulator(MM), 고정형 manipulator(ME), high-level subtask 라벨(HL), 웹 캡션과 VQA와 localization(WD), 사람이 말로 지시하는 verbal instruction(VI)"
    page: 6
    bbox_norm: [0.053, 0.0619, 0.9289, 0.4627]
    strategy: caption-region
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/black-2025-pi05-a-vision-language-action-model-with/fig05.png
    raw: raw/papers/black-2025-pi05-a-vision-language-action-model-with-figures/fig05.png
    caption: "로봇 시스템. 6 DoF 팔 둘과 그리퍼, 손목 카메라 2대와 전후방 카메라 2대, 3 DoF 홀로노믹 베이스, 1~2 DoF 리프트. state와 action 차원은 18~19다"
    page: 7
    bbox_norm: [0.5, 0.0606, 0.9298, 0.2661]
    strategy: caption-region
    curated: true
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/black-2025-pi05-a-vision-language-action-model-with/fig06.png
    raw: raw/papers/black-2025-pi05-a-vision-language-action-model-with-figures/fig06.png
    caption: "평가 환경. 통제된 비교용 mock 부엌과 침실(왼쪽), 최종 평가용 실제 집(오른쪽). 둘 다 학습에 없던 공간이다"
    page: 8
    bbox_norm: [0.0678, 0.0606, 0.952, 0.2622]
    strategy: caption-region
    curated: false
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/black-2025-pi05-a-vision-language-action-model-with/fig07.png
    raw: raw/papers/black-2025-pi05-a-vision-language-action-model-with-figures/fig07.png
    caption: "실제 집 3곳 평가. (a) 집마다 한 과제씩 뽑은 롤아웃과 그때 모델이 스스로 낸 subtask 예측, (b) 과제와 환경별 평균 task progress. mock 환경 성적이 실제 집 성적을 잘 대표한다"
    page: 8
    bbox_norm: [0.0702, 0.2924, 0.9298, 0.525]
    strategy: caption-region
    curated: true
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/black-2025-pi05-a-vision-language-action-model-with/fig08.png
    raw: raw/papers/black-2025-pi05-a-vision-language-action-model-with-figures/fig08.png
    caption: "학습 환경 수를 3~104개로 바꿔 가며 잰 성능. 104개에 이르면 테스트 집 데이터를 직접 넣고 학습한 통제군(초록 점선과 막대)과 비슷해진다. pre-training을 뺀 두 막대는 크게 하락한다"
    page: 9
    bbox_norm: [0.0702, 0.0606, 0.5, 0.2701]
    strategy: caption-region
    curated: true
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/black-2025-pi05-a-vision-language-action-model-with/fig09.png
    raw: raw/papers/black-2025-pi05-a-vision-language-action-model-with-figures/fig09.png
    caption: "학습 환경 수에 따른 언어 지시 따르기. 학습에서 본 물체 범주(in-distribution)와 못 본 범주(out-of-distribution) 각각의 follow rate와 success rate"
    page: 9
    bbox_norm: [0.5, 0.0606, 0.9298, 0.2165]
    strategy: caption-region
    curated: false
  - id: fig10
    label: Figure 10
    kind: figure
    file: assets/black-2025-pi05-a-vision-language-action-model-with/fig10.png
    raw: raw/papers/black-2025-pi05-a-vision-language-action-model-with-figures/fig10.png
    caption: "mock home 4과제 학습 mixture ablation. 다른 로봇 데이터(ME와 CE)를 빼면 79%에서 51~54%로 하락하고 둘 다 빼면 40%다. 웹 데이터(WD)를 뺀 차이는 이 평가에서 유의하지 않다(p=0.385)"
    page: 10
    bbox_norm: [0.0907, 0.0606, 0.4795, 0.2422]
    strategy: caption-region
    curated: false
  - id: fig11
    label: Figure 11
    kind: figure
    file: assets/black-2025-pi05-a-vision-language-action-model-with/fig11.png
    raw: raw/papers/black-2025-pi05-a-vision-language-action-model-with-figures/fig11.png
    caption: "언어 지시 따르기 ablation. in-distribution에서는 웹 데이터를 빼도 86%로 같지만 out-of-distribution follow rate는 94%에서 80%로 하락한다. ME와 CE를 빼면 33%까지 하락한다"
    page: 10
    bbox_norm: [0.0702, 0.3396, 0.5, 0.538]
    strategy: caption-region
    curated: true
  - id: fig12
    label: Figure 12
    kind: figure
    file: assets/black-2025-pi05-a-vision-language-action-model-with/fig12.png
    raw: raw/papers/black-2025-pi05-a-vision-language-action-model-with-figures/fig12.png
    caption: "π0, π0-FAST+Flow와의 비교. mock home 4과제 모두에서 π0.5가 앞선다. π0를 30만 step까지 더 학습해도 격차가 남는다"
    page: 10
    bbox_norm: [0.5, 0.0606, 0.9298, 0.2287]
    strategy: caption-region
    curated: true
  - id: fig13
    label: Figure 13
    kind: figure
    file: assets/black-2025-pi05-a-vision-language-action-model-with/fig13.png
    raw: raw/papers/black-2025-pi05-a-vision-language-action-model-with-figures/fig13.png
    caption: "high-level 추론 방식 비교. 전체 π0.5가 79%로 가장 높고 사람 전문가가 subtask를 불러 주는 human HL(63%)보다도 높다. GPT-4를 high-level policy로 쓴 조건이 58%로 가장 낮다"
    page: 11
    bbox_norm: [0.0702, 0.0606, 0.5, 0.3169]
    strategy: caption-region
    curated: true
  - id: fig14
    label: Figure 14
    kind: figure
    file: assets/black-2025-pi05-a-vision-language-action-model-with/fig14.png
    raw: raw/papers/black-2025-pi05-a-vision-language-action-model-with-figures/fig14.png
    caption: "언어 지시 따르기 평가의 초기 상태 예시 (Appendix C)"
    page: 18
    bbox_norm: [0.0702, 0.5433, 0.5, 0.6582]
    strategy: caption-region
    curated: false
  - id: fig15
    label: Figure 15
    kind: figure
    file: assets/black-2025-pi05-a-vision-language-action-model-with/fig15.png
    raw: raw/papers/black-2025-pi05-a-vision-language-action-model-with-figures/fig15.png
    caption: "언어 지시 따르기에서 다른 모델과의 비교 (Appendix C)"
    page: 18
    bbox_norm: [0.0702, 0.7021, 0.5, 0.861]
    strategy: caption-region
    curated: false
  - id: fig16
    label: Figure 16
    kind: figure
    file: assets/black-2025-pi05-a-vision-language-action-model-with/fig16.png
    raw: raw/papers/black-2025-pi05-a-vision-language-action-model-with-figures/fig16.png
    caption: "학습 mixture ablation의 과제별 분해 (Appendix D)"
    page: 18
    bbox_norm: [0.5, 0.0606, 0.9298, 0.2325]
    strategy: caption-region
    curated: false
  - id: fig17
    label: Figure 17
    kind: figure
    file: assets/black-2025-pi05-a-vision-language-action-model-with/fig17.png
    raw: raw/papers/black-2025-pi05-a-vision-language-action-model-with-figures/fig17.png
    caption: "high-level 추론 비교의 과제별 분해 (Appendix D)"
    page: 19
    bbox_norm: [0.0702, 0.0606, 0.5, 0.2619]
    strategy: caption-region
    curated: false
  - id: fig18
    label: Figure 18
    kind: figure
    file: assets/black-2025-pi05-a-vision-language-action-model-with/fig18.png
    raw: raw/papers/black-2025-pi05-a-vision-language-action-model-with-figures/fig18.png
    caption: "attention mask 패턴 예시. 이산 action 토큰과 연속 action 토큰이 서로를 참조하지 못하게 막는 구성 (Appendix E)"
    page: 19
    bbox_norm: [0.5, 0.0606, 0.9298, 0.3928]
    strategy: caption-region
    curated: false
---

## 한 줄 요약 (One-line Summary)

π0에 이질적인 데이터 원천을 함께 쓰는 co-training 레시피와 subtask를 먼저 출력하고 action을 내는 2단 추론을 결합해, 학습에 없던 실제 가정집에서 10~15분짜리 청소 과제를 수행한 VLA다.

## 1. 자료 정보 (Document Information)

- 제목: π0.5: a Vision-Language-Action Model with Open-World Generalization
- 저자: Physical Intelligence (Kevin Black, Noah Brown, Danny Driess, Chelsea Finn, Karol Hausman, Brian Ichter, Sergey Levine, Karl Pertsch, Lucy Xiaoyang Shi, Quan Vuong 등 35인)
- arXiv: 2504.16054v1 (cs.LG), 2025년 4월 22일
- 분량: 19페이지 (본문 11페이지 + Appendix A~E)
- 프로젝트 페이지: https://pi.website/blog/pi05
- 원본: `raw/papers/black-2025-pi05-a-vision-language-action-model-with.pdf`

## 2. 주요 기여 (Key Contributions)

논문이 푸는 문제는 open-world generalization이다. VLA가 새 물체와 새 배치를 만났을 때도 과제를 해내느냐를 가리키는 말인데, 기존 VLA 평가는 대개 학습 데이터와 비슷한 환경에서 이뤄졌다. π0.5는 학습에 한 번도 등장하지 않은 실제 가정집 세 곳에 로봇을 그대로 들여놓고 부엌과 침실을 치우게 한다.

레시피의 핵심은 co-training이다. co-training은 로봇 action 데이터만 쓰지 않고 성격이 다른 여러 데이터 원천을 하나의 학습 mixture에 함께 넣는 방식을 말한다. π0.5의 mixture에는 다른 로봇의 action, subtask 문장 예측, 사람이 말로 준 지시, 웹의 캡션, VQA, 객체 위치 데이터가 들어간다. 정작 평가 대상인 mobile manipulator의 가정 데이터는 첫 학습 단계 전체의 2.4%뿐이다. 나머지 97.6%가 다른 출처에서 온다.

매 스텝 모델이 먼저 "pick up the plate" 같은 subtask를 텍스트로 뱉고 그 문장을 조건으로 삼아 저수준 action chunk를 낸다. 계층적 추론이 또 하나의 축이다. 두 단계를 서로 다른 모델이 아니라 같은 모델이 수행한다는 점이 Hi Robot 같은 선행 구성과 다르다. 저자들은 이를 chain-of-thought에 빗댄다.

이산 표현과 연속 표현은 학습 단계별로 나눠 쓴다. pre-training에서는 FAST tokenizer로 action을 이산 토큰으로 적어 next-token prediction만으로 학습하고 post-training에서 action expert를 새로 붙여 flow matching으로 연속 action을 뽑는다. 학습은 이산 쪽이 빠르고 실시간 추론은 연속 쪽이 유리하다는 두 사실을 한 모델에 담았다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 하나의 Transformer, 두 종류의 출력

모델이 학습하는 분포는 πθ(a_t:t+H, ℓ̂ | o_t, ℓ)이다. o_t에는 카메라 이미지들과 로봇 자신의 상태(관절 각도, 그리퍼 자세, 리프트 위치, 베이스 속도)가 들어간다. ℓ은 "put away the dishes" 같은 전체 과제 프롬프트다. ℓ̂은 모델이 내놓는 텍스트 출력인데 subtask 예측일 수도 있고 웹 VQA의 답일 수도 있다.

이 분포를 두 조각으로 나눈다.

```
πθ(a, ℓ̂ | o, ℓ) = πθ(a | o, ℓ̂) · πθ(ℓ̂ | o, ℓ)
```

오른쪽이 high-level 추론이고 왼쪽이 low-level 추론이다. action은 전체 프롬프트 ℓ을 직접 보지 않고 모델이 스스로 만든 subtask ℓ̂만 조건으로 받는다. 두 분포를 같은 가중치가 표현한다.

토큰 종류에 따라 처리 경로가 갈린다. 이미지 패치는 vision encoder를 지나고 텍스트는 임베딩 행렬을 거친다. flow matching 중간값인 연속 action 토큰은 선형 사영을 거쳐 별도 expert 가중치로 들어간다. π0와 같은 mixture-of-experts 구조다. attention은 LLM의 인과 마스크와 달라서 이미지 패치, 프롬프트, 연속 action 토큰이 양방향으로 서로를 본다. proprioception은 이산화해 텍스트 토큰으로 넣는다.

### 이산과 연속을 한 손실로

학습 목표는 텍스트 cross entropy와 flow matching 회귀를 α로 섞은 합이다. FAST로 인코딩한 action 토큰도 텍스트 쪽 cross entropy에 포함된다. 두 표현이 서로를 참조하지 못하도록 attention mask로 분리한다.

α=0으로 두면 모델은 그냥 VLM처럼 학습된다. pre-training이 이 상태다. post-training에서 α=10.0으로 올리며 무작위 초기화한 action expert를 붙인다. 추론할 때는 텍스트를 자동회귀로 디코딩해 subtask를 얻고 그 문장을 조건으로 flow matching 10스텝을 밀어 연속 action을 만든다.

### 학습 mixture

pre-training은 28만 step, post-training은 8만 step이다. pre-training mixture는 다섯 가지다.

| 약칭 | 내용 | 비고 |
|---|---|---|
| MM | 100여 가정에서 mobile manipulator로 모은 약 400시간 | 평가 과제와 가장 가까움. 첫 단계 전체의 2.4% |
| ME | 여러 가정에 놓인 고정형 팔(1~2개) 데이터 | 베이스 없는 로봇 |
| CE | 실험실 조건의 cross-embodiment 데이터 + Open X-Embodiment | π0 학습셋 계열 |
| HL | observation에 붙은 high-level subtask 라벨과 bounding box | 텍스트 예측 과제 |
| WD | CapsFusion, COCO, Cambrian-7M, PixMo, VQAv2와 실내 장면 bounding box | 캡션, VQA, localization |

action은 전부 목표 관절각과 end-effector 자세를 함께 예측하도록 학습하고 프롬프트에 `<control mode>` 표시를 넣어 둘을 구분한다. 값은 데이터셋별 1%와 99% 분위수로 [−1, 1] 정규화하고 차원이 모자란 로봇은 0으로 패딩한다.

post-training에서는 CE를 빼고 MM과 ME 중 성공하고 길이가 짧은 episode만 남긴다. 웹 데이터는 의미와 시각 능력을 지키려고 계속 섞는다. 여기서 verbal instruction(VI)이 새로 들어온다. 전문 사용자가 학습된 저수준 policy에 말로 subtask를 하나씩 불러 과제를 끝내게 하는 방식으로 모은 데이터다. 사람이 실시간으로 로봇을 언어로 teleoperation한 기록에 가깝고 high-level 출력의 모범답안 역할을 한다.

### 로봇과 제어 루프

mobile manipulator 두 종을 썼다. 각각 6 DoF 팔 둘에 평행 그리퍼, 손목 카메라 두 대, 팔 사이의 전방과 후방 카메라, 홀로노믹 휠 베이스, 리프트를 갖췄다. high-level 추론은 카메라 4대를 다 쓰고 low-level 추론은 손목과 전방만 쓴다.

제어 계통은 단순하다. 모델이 팔, 그리퍼, 리프트의 목표 자세와 베이스 목표 속도를 50Hz로 내고 PD 제어기가 그걸 따라간다. 별도의 경로 계획이나 충돌 검사가 없다. manipulation과 이동이 모두 end-to-end다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 실제 집에서

학습에 없던 집 세 곳의 부엌과 침실에서 청소 과제를 시켰다. 채점은 단계별 진행률에 가까운 rubric이고 과제 하나가 2~5분, 긴 것은 10~15분이다. 세 집 모두에서 꾸준히 성공했고 mock 환경 성적이 실제 집 성적을 잘 대표한다는 점도 함께 확인됐다. 모델은 "place the dishes in the sink" 수준의 지시만 받고 "pick up the cup" 같은 중간 단계는 스스로 정한다.

### 환경 수를 늘렸을 때

mobile manipulation 데이터의 환경 수를 3, 12, 22, 53, 82, 104개로 바꿔 가며 학습했다. 데이터 크기 효과를 배제하려고 step 수(4만)를 맞춰 각 모델이 같은 수의 고유 샘플을 보게 했다. 성능은 환경 수를 따라 오르고 104개 지점에서 테스트 집 데이터를 직접 넣어 학습한 통제군과 비슷해진다. 새 집에 일반화하는 문제를 아예 없앤 모델과 대등하다. pre-training 없이 같은 데이터만 쓴 두 baseline은 크게 뒤처진다.

언어 지시 따르기 쪽도 같은 방향으로 오르는데 학습에서 본 물체 범주 쪽이 못 본 범주보다 빠르게 좋아진다.

### mixture 구성 요소를 제거했을 때

mock home 4과제에서 π0.5 전체가 79%다. 실험실 cross-embodiment를 빼면 51%, 다른 환경의 고정형 로봇 데이터를 빼면 54%, 둘 다 빼면 40%로 내려간다(모두 p<0.001). 웹 데이터를 뺀 차이는 이 평가에서 유의하지 않았다(p=0.385).

웹 데이터의 값어치는 다른 평가에서 드러난다. 언어 지시 따르기에서 학습에서 본 범주의 follow rate는 π0.5와 no WD가 86%로 같지만 못 본 범주로 가면 94%와 80%로 벌어진다. success rate는 94%와 74%다. 웹에 담긴 폭넓은 물체 지식이 처음 보는 범주의 이름을 알아듣게 해 준다고 저자들은 해석한다.

| 조건 | In-dist. follow | In-dist. success | OOD follow | OOD success |
|---|---|---|---|---|
| π0.5 | 86% | 83% | 94% | 94% |
| no WD | 86% | 82% | 80% | 74% |
| no CE | 74% | 67% | 67% | 49% |
| no ME | 66% | 57% | 33% | 31% |

### π0와의 비교

비교 대상은 원래 π0와, 같은 하이브리드 레시피를 쓰되 HL과 WD 없이 action 데이터로만 학습한 π0-FAST+Flow다. π0-FAST+Flow는 π0.5에 최대한 가깝게 맞춘 강한 baseline이다. mock home 4과제 전부에서 π0.5가 앞서고 π0를 30만 step까지 더 학습해도 뒤집히지 않는다.

### high-level 추론이 정말 필요한가

같은 저수준 policy 위에 high-level 쪽만 바꿔 가며 쟀다. 전체 π0.5가 79%로 1위다. 놀랍게도 2위는 런타임에 subtask를 뽑지 않지만 학습 mixture에는 HL 데이터가 들어간 implicit HL(71%)이다. subtask 데이터를 넣어 두기만 해도 이득의 상당 부분이 따라온다. 학습에서 HL을 아예 뺀 no HL은 62%로 내려간다. verbal instruction을 뺀 쪽(60%)과 웹 데이터를 뺀 쪽(60%)도 유의하게 낮다. VI는 high-level mobile manipulation 예시의 11%밖에 안 되는 작은 조각인데도 그렇다.

GPT-4를 high-level policy로 붙인 조건이 58%로 가장 낮았다. 사람 전문가가 subtask를 불러 주는 human HL도 63%에 그쳐 π0.5 자신보다 낮다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

실패가 남는다. 처음 보는 서랍 손잡이나 물리적으로 열기 힘든 수납장이 반복해서 걸림돌이 되고 로봇 팔이 닦아야 할 얼룩을 스스로 가려 observation이 불완전해지는 경우도 있다. high-level subtask 추론이 산만해질 때도 있어서 물건을 넣는 동안 서랍을 여닫기만 반복하는 식이다.

프롬프트가 단순하다는 제약도 저자들이 직접 짚는다. 받아들일 수 있는 지시의 복잡도는 결국 학습 데이터가 정한다. 더 복잡한 선호와 조건을 다루려면 사람 라벨러나 합성 방식으로 더 정교한 주석을 만들어야 한다.

context가 짧은 것도 한계다. 방 사이를 오가거나 물건을 어디에 뒀는지 기억해야 하는 과제라면 더 풍부한 문맥과 메모리가 필요하다. 마지막으로 데이터 원천의 조합은 이 논문이 시험한 것보다 훨씬 넓게 열려 있다. 특히 사람이 말로 지시하는 verbal instruction은 새로운 감독 방식이라 후속 연구 여지가 크다고 본다.

## 6. 관련 연구 (Related Work)

일반화 가능한 manipulation policy 계열이 첫 가지다. 단일 과제 데이터셋에서 여러 장면과 과제를 아우르는 데이터셋으로 넓히면 policy가 더 많은 과제를 풀고 새 장면에도 잘 옮겨 간다는 결과들이 쌓였다. VLA는 그 위에서 웹 pre-training의 의미 지식을 로봇으로 끌어오는 수단이다. flow matching, diffusion, FAST 같은 표현력 있는 action 디코딩이 붙으면서 복잡한 manipulation까지 범위가 넓어졌다.

새 환경 일반화 계열이 그다음 가지다. 물체 집기처럼 단순한 primitive에서는 grasp 예측이나 모델 기반 계획 같은 과제별 가정을 넣어 새 집까지 일반화한 사례가 있다. 다만 그런 방법은 generalist가 다뤄야 할 과제 전반으로 확장되지 않는다. 대규모 다도메인 데이터셋으로 end-to-end 일반화를 보인 연구들도 대체로 1분 미만의 단순한 과제에 머문다.

직접 뿌리가 된 연구는 π0(flow matching action expert), FAST(압축 기반 action tokenizer), Hi Robot(high-level과 low-level 분리)이다. π0.5는 앞의 둘을 학습 단계별로 나눠 쓰고 셋째를 하나의 모델 안으로 통합했다.

## 7. 용어집 (Glossary)

- **π0.5**: π0를 바탕으로 이질적 데이터 co-training과 계층적 추론을 결합한 VLA. 읽기는 "pi oh five".
- **co-training**: 로봇 action, 웹 VQA, subtask 라벨 등 성격이 다른 데이터를 하나의 학습 mixture에 함께 넣는 방식.
- **subtask**: high-level 추론이 텍스트로 내놓는 중간 단계 명령. "pick up the plate" 같은 한 문장.
- **high-level / low-level inference**: 각각 subtask 문장을 뽑는 단계와 그 문장을 조건으로 action chunk를 뽑는 단계.
- **MM, ME, CE, HL, WD, VI**: 학습 mixture의 여섯 슬라이스 약칭. 순서대로 mobile manipulator 데이터, 여러 환경의 고정형 로봇 데이터, 실험실 cross-embodiment 데이터, high-level subtask 라벨, 웹 multimodal 데이터, verbal instruction.
- **verbal instruction**: 사람이 학습된 저수준 policy에 말로 subtask를 하나씩 불러 과제를 완수시키며 모은 데이터.
- **FAST tokenizer**: action chunk를 압축해 이산 토큰으로 적는 방식. pre-training에서 action을 텍스트처럼 다루게 해 준다.
- **task progress**: 과제의 몇 단계까지 갔는지를 비율로 매기는 채점 방식. 접시 절반을 옮겼으면 50% 정도.
- **follow rate**: 로봇 행동이 지시와 맞아떨어진 비율. success rate와 나눠서 잰다.

도메인 공통 용어(policy, observation, action chunk, action expert, flow matching, pre-training 등)는 `wiki/overviews/glossary-physical-ai.md`와 `glossary-llms.md`를 따른다.

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 1 | 데이터 원천 → VLA policy → 새 집 배치 전체 그림 | caption-region | ★ wiki 권장 (architecture) |
| fig02 | 2 | 새 부엌 청소 롤아웃 4컷 | caption-region | (확인 필요) |
| fig03 | 4 | 모델 개요. pre-training(이산)과 post-training/추론(flow matching) | caption-region | ★ wiki 권장 (method) |
| fig04 | 6 | 학습 mixture 여섯 슬라이스 실제 예시 | caption-region | ★ wiki 권장 (data) |
| fig05 | 7 | 로봇 시스템 구성 | caption-region | ★ wiki 권장 (hardware) |
| fig06 | 8 | mock과 실제 평가 환경 | caption-region | (확인 필요) |
| fig07 | 8 | 실제 집 3곳 롤아웃 + 정량 결과 | caption-region | ★ wiki 권장 (result) |
| fig08 | 9 | 학습 환경 수에 따른 성능 | caption-region | ★ wiki 권장 (result) |
| fig09 | 9 | 학습 환경 수에 따른 언어 지시 따르기 | caption-region | (확인 필요) |
| fig10 | 10 | mock home mixture ablation | caption-region | ★ wiki 권장 (ablation) |
| fig11 | 10 | 언어 지시 따르기 ablation | caption-region | ★ wiki 권장 (ablation) |
| fig12 | 10 | π0, π0-FAST+Flow 비교 | caption-region | ★ wiki 권장 (result) |
| fig13 | 11 | high-level 추론 방식 비교 | caption-region | ★ wiki 권장 (result) |
| fig14 | 18 | 언어 평가 초기 상태 예시 (Appendix C) | caption-region | (아카이브) |
| fig15 | 18 | 언어 평가 모델 비교 (Appendix C) | caption-region | (아카이브) |
| fig16 | 18 | mixture ablation 과제별 분해 (Appendix D) | caption-region | (아카이브) |
| fig17 | 19 | high-level 비교 과제별 분해 (Appendix D) | caption-region | (아카이브) |
| fig18 | 19 | attention mask 패턴 (Appendix E) | caption-region | (확인 필요) |
