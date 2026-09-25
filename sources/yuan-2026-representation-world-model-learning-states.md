---
title: "Representation World Model: Learning States, Transition and Executable Plans in Representation"
type: paper
year: 2026
category: physical-ai
raw_path: raw/papers/yuan-2026-representation-world-model-learning-states.pdf
raw_filename: "yuan-2026-representation-world-model-learning-states.pdf"
source_collection: external
authors: "Yijun Yuan, Weicheng Zheng, Weibang Wang, Minghui Qin, Chang Sun, Junhao Huang, Kenan Li, Anmin Liu, Yicheng Yao, Hang Zhao"
arxiv_id: "2609.29171"
tags: [physical-ai, world-model, robot-learning, manipulation]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/yuan-2026-representation-world-model-learning-states/fig01.png
    raw: raw/papers/yuan-2026-representation-world-model-learning-states-figures/fig01.png
    caption: "기존 world model과 RWM의 대비. 왼쪽은 명시적 transition function으로 rollout을 만들고 추론 시점에 탐색으로 planning하는 LeWM 방식이고, 오른쪽은 representation space 안에 상태와 transition과 실행 가능한 plan을 함께 담아 시작 representation에서 목표 representation으로 가는 경로를 구성하는 RWM 방식이다"
    page: 1
    bbox_norm: [0.1667, 0.3267, 0.8335, 0.5253]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/yuan-2026-representation-world-model-learning-states/fig02.png
    raw: raw/papers/yuan-2026-representation-world-model-learning-states-figures/fig02.png
    caption: "RWM의 전체 구성. (a) 구성된 latent path 위에 Inverse Dynamics Model 지도를 거는 착상, (b) 인코더와 Inverse Dynamics Model을 함께 학습하는 절차, (c) 시작과 목표를 인코딩해 경로를 구성하고 이웃 쌍마다 action을 복원해 실행하는 추론 절차"
    page: 4
    bbox_norm: [0.1667, 0.0958, 0.8333, 0.344]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/yuan-2026-representation-world-model-learning-states/fig03.png
    raw: raw/papers/yuan-2026-representation-world-model-learning-states-figures/fig03.png
    caption: "LeWM 인코더와 RWM 인코더의 정보 보존 비교. 네 환경에서 state probe와 action probe의 결정계수를 나란히 그렸다"
    page: 8
    bbox_norm: [0.1667, 0.3401, 0.8333, 0.4592]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/yuan-2026-representation-world-model-learning-states/fig04.png
    raw: raw/papers/yuan-2026-representation-world-model-learning-states-figures/fig04.png
    caption: "interpolation으로 구성된 representation이 보존하는 정보량. 인코딩된 표현과 구성된 표현을 state probe와 action probe로 비교했고, action probe는 입력 쌍의 조합을 셋으로 나눠 측정했다"
    page: 8
    bbox_norm: [0.1667, 0.7497, 0.8333, 0.8569]
    strategy: caption-region
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/yuan-2026-representation-world-model-learning-states/fig05.png
    raw: raw/papers/yuan-2026-representation-world-model-learning-states-figures/fig05.png
    caption: "closed-loop interval에 따른 성공률 변화. 재계획 사이에 실행하는 action 수를 5에서 25까지 바꿨을 때의 과제별 성공률과 macro 평균이다"
    page: 9
    bbox_norm: [0.1667, 0.3211, 0.8333, 0.4367]
    strategy: caption-region
    curated: true
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/yuan-2026-representation-world-model-learning-states/fig06.png
    raw: raw/papers/yuan-2026-representation-world-model-learning-states-figures/fig06.png
    caption: "PushT에서 state probe로 복원한 물리 상태를 시뮬레이터에 그린 결과. 검은 테두리는 인코딩된 표현에서, 초록 테두리는 interpolation으로 구성된 표현에서 복원한 상태다"
    page: 14
    bbox_norm: [0.1667, 0.2463, 0.8333, 0.7245]
    strategy: caption-region
    curated: true
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/yuan-2026-representation-world-model-learning-states/fig07.png
    raw: raw/papers/yuan-2026-representation-world-model-learning-states-figures/fig07.png
    caption: "Cube에서 state probe로 복원한 물리 상태 시각화. 테두리 색의 뜻은 Figure 6과 같다"
    page: 15
    bbox_norm: [0.1667, 0.2463, 0.8333, 0.7245]
    strategy: caption-region
    curated: false
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/yuan-2026-representation-world-model-learning-states/fig08.png
    raw: raw/papers/yuan-2026-representation-world-model-learning-states-figures/fig08.png
    caption: "Reacher에서 state probe로 복원한 물리 상태 시각화. 테두리 색의 뜻은 Figure 6과 같다"
    page: 16
    bbox_norm: [0.1667, 0.2463, 0.8333, 0.7245]
    strategy: caption-region
    curated: false
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/yuan-2026-representation-world-model-learning-states/fig09.png
    raw: raw/papers/yuan-2026-representation-world-model-learning-states-figures/fig09.png
    caption: "TwoRoom에서 state probe로 복원한 물리 상태 시각화. 테두리 색의 뜻은 Figure 6과 같다"
    page: 17
    bbox_norm: [0.1667, 0.2463, 0.8333, 0.7245]
    strategy: caption-region
    curated: false
  - id: tab01
    label: Table 1
    kind: table
    file: assets/yuan-2026-representation-world-model-learning-states/tab01.png
    raw: raw/papers/yuan-2026-representation-world-model-learning-states-figures/tab01.png
    caption: "연속 제어 벤치마크 네 과제의 성공률 비교표. 탐색 기반 방법과 직접 방법으로 나누고 각 방법의 추론 방식을 함께 적었다"
    page: 7
    bbox_norm: [0.1667, 0.1503, 0.8333, 0.3021]
    strategy: table-region
    curated: false
  - id: tab02
    label: Table 2
    kind: table
    file: assets/yuan-2026-representation-world-model-learning-states/tab02.png
    raw: raw/papers/yuan-2026-representation-world-model-learning-states-figures/tab02.png
    caption: "LIBERO-Goal 열 개 과제의 과제별 성공률과 모델 크기 비교표"
    page: 7
    bbox_norm: [0.1871, 0.8255, 0.8129, 0.9128]
    strategy: table-region
    curated: false
  - id: tab03
    label: Table 3
    kind: table
    file: assets/yuan-2026-representation-world-model-learning-states/tab03.png
    raw: raw/papers/yuan-2026-representation-world-model-learning-states-figures/tab03.png
    caption: "세 학습 목적함수 조합의 ablation 결과표. PushT 성공률로 비교했다"
    page: 9
    bbox_norm: [0.3075, 0.6571, 0.6925, 0.7521]
    strategy: table-region
    curated: false
  - id: tab04
    label: Table 4
    kind: table
    file: assets/yuan-2026-representation-world-model-learning-states/tab04.png
    raw: raw/papers/yuan-2026-representation-world-model-learning-states-figures/tab04.png
    caption: "RWM의 학습 설정표. 입력 해상도부터 학습 시드와 GPU 구성까지 적혀 있다"
    page: 13
    bbox_norm: [0.2868, 0.1365, 0.7132, 0.4235]
    strategy: table-region
    curated: false
---

## 한 줄 요약 (One-line Summary)

RWM은 시작 observation과 목표 observation을 인코딩한 뒤 두 표현 사이를 직접 interpolation해 만든 latent path에 Inverse Dynamics Model 지도를 걸어, 추론 시점의 forward rollout이나 action space 탐색 없이 representation space 안에서 실행 가능한 plan을 구성하는 world model이다.

## 1. 자료 정보 (Document Information)

Tsinghua University IIIS의 Yijun Yuan과 Hang Zhao 등 10명이 2026년 9월 24일 arXiv에 올린 17페이지 preprint다. 본문 9페이지, 참고문헌 3페이지, 부록 5페이지로 구성되고 cs.RO로 분류돼 있다. 프로젝트 페이지는 `tsinghua-mars-lab.github.io/RepresentationWorldModel`이다.

평가는 연속 제어 벤치마크 네 과제(PushT, Cube, Reacher, TwoRoom)와 로봇 manipulation 벤치마크 LIBERO-Goal 열 과제에서 이뤄졌다. manipulation은 팔과 손으로 물체를 다루는 과제 영역을 말한다.

## 2. 주요 기여 (Key Contributions)

논문이 스스로 적은 기여는 세 가지다.

- **RWM 형식화**: action과 관련된 상태, transition, planning 구조를 하나의 representation space 안에서 함께 학습하는 구성을 제시했다.
- **구성된 latent path 위의 inverse dynamics objective**: action 지도를 표현이 보존할 정보와 실행 가능한 plan이 놓일 기하 양쪽에 직접 걸리게 했다.
- **탐색 없는 제어 성능**: 연속 제어 벤치마크에서 탐색 기반 방법보다 높은 성공률을 냈고, 더 복잡한 embodied control 과제로 확장할 가능성을 보였다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 문제 설정

offline 데이터셋 D는 action 라벨이 붙은 trajectory의 모음이다. trajectory는 observation과 action이 시간순으로 이어진 실행 기록을 말한다. 각 trajectory는 observation과 action이 번갈아 놓인 열이고, observation은 한 장이 아니라 고정 길이 묶음일 수 있으며 action도 마찬가지로 고정 길이 묶음이다.

인코더는 observation을 표현 벡터로 옮긴다. 기존 latent world model은 여기에 더해 forward transition model을 학습하고, 시작과 목표가 주어지면 후보 action 열을 여러 번 rollout해 목표에 가장 가까워지는 열을 고른다. rollout은 policy를 실행해 trajectory를 만들어내는 과정을 말한다. 이 탐색이 추론 시점 비용의 대부분이다.

### 3.2 representation space 안의 경로 구성

RWM은 forward 예측을 반복하는 대신, 같은 trajectory에서 뽑은 두 시점 t와 u의 표현을 양 끝점으로 두고 그 사이 시점 m의 표현을 선형 interpolation으로 만든다. 가중치는 시간 위치의 비율로 정해진다. 즉 m이 t에 가까우면 시작 쪽 표현의 비중이 커진다.

논문은 이 중간 표현이 학습 전에는 기하학적으로 구성된 점일 뿐이며 interpolation 자체가 유효한 transition이나 실행 가능한 trajectory를 뜻하지 않는다고 못 박는다. 학습의 역할은 이렇게 만들어진 중간점이 상태와 transition과 action의 의미를 갖도록 표현을 바꾸는 것이다.

이 구성이 갖는 성질은 두 가지다. 첫째, 데이터에 기록된 상태들 사이의 빈 영역이 학습 대상으로 드러난다. 둘째, 모든 중간점이 양 끝점 표현으로만 결정되므로 경로에 건 지도가 끝점 표현으로도 전파되고, 결과적으로 representation space의 기하 전체를 바꾼다.

planning도 같은 구성으로 이뤄진다. 현재 observation과 목표 observation을 인코딩한 뒤 둘 사이를 같은 비율식으로 채워 latent transition path를 만든다. 경로의 양 끝은 각각 현재와 목표의 표현이다. 남는 문제는 이 경로를 실행 가능하게 만드는 것이고, 논문은 그 답으로 action에 근거한 표현 학습을 든다.

### 3.3 action에 근거한 표현 학습

학습은 세 항으로 이뤄지며, 전체 목적함수는 interpolation 항에 나머지 두 항을 가중치와 함께 더한 형태다.

| 항 | 대상 | 역할 |
|---|---|---|
| interpolation IDM 손실 | 구성된 이웃 표현 쌍 | 경로 위 이웃 쌍에서 실제 실행된 action을 복원하게 해 경로에 action 의미를 부여한다. 필수 항이다 |
| encoded IDM 손실 | 인코딩된 이웃 표현 쌍 | 데이터에 기록된 latent transition에 직접 action 지도를 건다. 선택 항이다 |
| consistency 손실 | 구성된 표현과 같은 시점의 인코딩된 표현 | 구성된 경로가 기록된 trajectory의 기하에서 멀어지지 않게 잡아 준다. 선택 항이다 |

Inverse Dynamics Model은 두 표현을 입력받아 그 사이를 잇는 action을 되짚어 예측하는 모델이다. RWM은 인코더와 Inverse Dynamics Model 둘만 학습하고 forward dynamics model은 만들지 않는다.

논문은 interpolation 위에 Inverse Dynamics Model을 거는 것이 왜 표현을 바꾸는지를 두 단계로 설명한다. 먼저 표현 붕괴를 막는다. 모든 observation이 같은 표현으로 뭉치면 동일한 입력 쌍에 서로 다른 action이 정답으로 걸리므로 손실을 낮출 수 없다. 다음으로 transition과 관련된 상태 정보를 보존하게 만든다. 서로 다른 물체 배치가 비슷한 끝점 표현으로 뭉치면 비슷한 경로가 만들어지고, 그 경로에 서로 충돌하는 action 지도가 동시에 걸린다.

### 3.4 rollout 없는 추론

추론에서는 현재 observation과 목표 observation만 인코딩한다. 두 표현 사이를 같은 방식으로 채운 뒤 이웃 쌍마다 Inverse Dynamics Model을 적용해 action을 복원한다.

모든 중간 표현이 끝점에서 곧장 계산되므로 action 열을 병렬로 디코딩할 수 있고, 이 열을 그대로 내보내면 open-loop 실행이 된다. open-loop 실행은 한 번 계산한 action 묶음을 중간 피드백 없이 끝까지 내보내는 방식이다. closed-loop 제어에서는 action 묶음을 실행한 뒤 현재 observation을 다시 인코딩하고 목표까지의 경로를 새로 구성한다.

논문은 이 절차를 인코딩, 구성, 디코딩의 세 단계로 부르고, 재귀적 forward 예측과 action space 탐색이 모두 빠진다는 점을 강조한다.

### 3.5 LIBERO-Goal을 위한 delta predictor

LIBERO-Goal은 테스트 시점에 목표 observation을 주지 않는다. 따라서 목표 표현을 인코딩해 경로의 끝점으로 삼는 기본 구성을 쓸 수 없다.

RWM은 이 설정에서 delta predictor를 추가한다. 다음 표현을 만드는 데 쓸 변위를 예측하는 모듈이다. 학습 때는 시연 데이터(demonstration)의 전체 trajectory가 남아 있으므로 미래 상태로 목표 변위를 정의해 지도한다. 테스트 시점에는 예측된 변위가 목표 기반 변위를 대신해, 목표 표현 없이도 경로를 한 단계씩 이어 붙인다.

LIBERO-Goal용 구성은 인코더를 ViT-Small로 바꾸고 시각 표현을 로봇의 proprioceptive 상태와 결합한 뒤 하위 모듈로 넘긴다. proprioception은 관절 각도 같은 로봇 자신의 상태 감각 입력이다. LIBERO는 목표 의미가 다른 여러 manipulation 과제를 담고 있어, 과제 ID를 delta predictor와 Inverse Dynamics Model 양쪽에 조건으로 준다.

### 3.6 학습 설정

데이터 전처리와 학습 절차는 별도 언급이 없는 한 LeWM을 따른다. 주요 설정은 다음과 같다.

| 설정 | 값 |
|---|---|
| 입력 해상도 | 224×224 |
| frame skip | 5 |
| 학습 검증 분할 | 90% / 10% |
| 인코더 | ViT-Tiny/14 (처음부터 학습) |
| Inverse Dynamics Model | 3층 MLP |
| observation history | 3 |
| optimizer | AdamW |
| 학습률 | 5×10⁻⁴ (Reacher는 5×10⁻⁵) |
| weight decay | 10⁻³ |
| 스케줄 | linear warmup 후 cosine decay |
| batch size | 128 |
| 학습 epoch | 10 |
| 정밀도 | bfloat16 |
| gradient clipping | 1.0 |
| 학습 시드 | 0, 42, 3072 |
| 학습 GPU | RTX5090 8장 |

frame skip 5는 두 observation 사이의 저수준 action들을 한 묶음으로 합친다는 뜻이다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 연속 제어 벤치마크

평가 규약은 INTACT를 따른다. 학습 시드 세 개로 각각 학습한 모델을 평가 시드 세 개에서 실행하고, 학습 시드 세 개에 대한 평균과 표준편차를 적는다. 비교 대상은 탐색 기반과 직접 방법으로 나뉜다.

| 분류 | 방법 | 추론 방식 | PushT | Cube | Reacher | TwoRoom | Macro |
|---|---|---|---|---|---|---|---|
| 탐색 기반 | DINO-WM | CEM | 74.0±4.5 | 86.0±4.7 | 79.0±5.1 | 100.0±.0 | 84.75 |
| 탐색 기반 | LeWM | CEM 300×(30/10) | 96.0±4.0 | 74.0±3.0 | 86.0±5.0 | 87.0±2.5 | 85.75 |
| 탐색 기반 | Fast-LeWM | CEM | 96.0 | 80.0 | 88.0 | 98.0 | 90.50 |
| 탐색 기반 | Fast-LeWM + SC | CEM + score | 98.0 | 82.0 | 90.0 | 98.0 | 92.00 |
| 탐색 기반 | Qantara† | CEM 300×30, K=4 | 90.1±1.1 | 93.7±.7 | 80.9±1.8 | 100.0±.0 | 91.18 |
| 탐색 기반 | PRISM† | MPPI 128×30 | 89±4 | 79±6 | 없음 | 없음 | 없음 |
| 탐색 기반 | C-JEPA† | CEM 300×30 | 88.67 | 없음 | 없음 | 없음 | 없음 |
| 탐색 기반 | INTACT | Pure CEM 300×30 | 88.44±1.17 | 68.44±.77 | 83.67±.67 | 82.89±.84 | 80.86±.51 |
| 탐색 기반 | INTACT | Actor-guided CEM 300×30 | 93.56±.96 | 96.89±.19 | 86.67±.88 | 98.00±1.15 | 93.78±.77 |
| 탐색 기반 | INTACT | Guarded actor 128×3 | 92.22±.69 | 99.78±.19 | 97.44±.77 | 98.00±1.15 | 96.86±.38 |
| 직접 | GC-IDM | goal-conditioned IDM | 84.7±5.0 | 99.3±1.2 | 100.0±.0 | 100.0±.0 | 96.00 |
| 직접 | INTACT | goal-conditioned IDM | 85.78±1.54 | 100.00±.00 | 97.67±.00 | 97.89±1.26 | 95.33±.58 |
| 직접 | RWM | representation plan + IDM | 95.44±0.69 | 100.00±.00 | 97.89±.19 | 99.67±.00 | 98.25±.14 |

표의 단검 표시는 과제 일부만 다루거나 INTACT와 다른 재현 규약을 쓴 행을 뜻한다. 논문은 published 행이 외부 참조일 뿐 짝을 맞춘 통제 비교가 아니라고 명시한다.

RWM의 macro 평균 98.25%는 표에서 가장 높다. 추론 시점에 384개의 후보 trajectory를 평가하는 INTACT의 최고 변형(96.86%)보다 높고, 같은 직접 방법인 INTACT의 goal-conditioned IDM(95.33%)보다도 높다. 가장 크게 벌어진 과제는 PushT로 85.78%에서 95.44%로 9.66%p 올랐다.

### 4.2 LIBERO-Goal

LIBERO-Goal 비교는 RC-aux 논문의 설정을 따른다. 비교 대상은 LeWM, RC-aux, 그리고 외부 참조로 둔 OpenVLA-OFT 7B다.

| 방법 | 모델 크기 | T0 | T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | 평균 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| LeWM + OFT-head | 0.07B | 0.64 | 0.78 | 0.70 | 0.76 | 0.90 | 0.44 | 0.60 | 0.94 | 0.70 | 0.66 | 0.712 |
| RC-aux + OFT-head | 0.07B | 0.92 | 0.86 | 0.80 | 0.78 | 0.96 | 0.48 | 0.70 | 0.96 | 0.86 | 0.80 | 0.812 |
| RWM | 0.03B | 1.00 | 0.98 | 0.94 | 0.92 | 0.96 | 0.90 | 0.64 | 1.00 | 1.00 | 0.96 | 0.930 |
| OpenVLA-OFT | 7B | 0.98 | 0.92 | 0.96 | 0.86 | 1.00 | 1.00 | 1.00 | 1.00 | 1.00 | 0.98 | 0.970 |

RWM의 평균 93.0%는 LeWM(71.2%)보다 21.8%p, RC-aux(81.2%)보다 11.8%p 높다. 모델 크기는 0.03B로 두 baseline의 절반이다. 격차가 가장 큰 과제는 T5로 RWM 90%에 대해 LeWM 44%, RC-aux 48%다. 반대로 T6에서는 RWM 64%가 RC-aux 70%보다 낮다. OpenVLA-OFT 7B는 평균 97.0%로 RWM보다 높으며, 논문은 이 행을 외부 참조로만 둔다고 적는다.

### 4.3 ablation: 표현이 담은 정보

ablation은 구성 요소를 하나씩 빼거나 바꿔 각 요소의 기여를 재는 실험이다. 별도 언급이 없으면 시드 3072로 학습한 모델을 쓴다.

첫 번째 질문은 명시적 표현 정규화 없이도 정보가 남는지다. LeWM은 forward dynamics 예측과 SIGReg 같은 표현 정규화로 표현을 학습하는 반면, RWM에는 그런 정규화 항이 없다.

측정은 probe로 한다. 학습된 인코더를 동결하고 같은 학습 데이터에서 동일한 소형 MLP를 1 epoch만 학습시킨 뒤, episode 단위로 나눈 검증 집합에서 결정계수를 잰다. state probe는 표현 하나에서 시뮬레이터 설정값을 예측하고 속도는 제외한다. action probe는 이웃한 두 표현에서 action을 예측한다.

| 환경 | state probe LeWM | state probe RWM | action probe LeWM | action probe RWM |
|---|---|---|---|---|
| PushT | 0.988 | 0.982 | 0.862 | 0.883 |
| Cube | 0.611 | 0.633 | 0.704 | 0.878 |
| Reacher | 0.566 | 0.565 | 0.166 | 0.167 |
| TwoRoom | 1.000 | 0.891 | 0.241 | 0.243 |

state 정보는 PushT, Cube, Reacher에서 비슷하게 남고 TwoRoom에서는 RWM이 낮다. action 예측은 PushT, Reacher, TwoRoom에서 대등하고 Cube에서 RWM이 크게 앞선다.

두 번째 질문은 구성된 표현도 같은 정보를 담는지다. 같은 방식으로 인코더를 동결하되, state probe는 인코딩된 표현에서만 학습해 인코딩된 표현과 구성된 표현 양쪽에서 평가하고, action probe는 인코딩된 쌍에서만 학습해 세 종류의 입력 쌍에서 평가한다.

| 환경 | state (인코딩) | state (구성) | action (인코딩, 인코딩) | action (인코딩, 구성) | action (구성, 구성) |
|---|---|---|---|---|---|
| PushT | 0.983 | 0.950 | 0.884 | 0.722 | 0.547 |
| Cube | 0.633 | 0.596 | 0.878 | 0.701 | 0.603 |
| Reacher | 0.565 | 0.559 | 0.167 | 0.070 | 0.034 |
| TwoRoom | 0.890 | 0.854 | 0.243 | 0.113 | 0.089 |

물리 상태는 구성된 표현에서도 인코딩된 표현에 가깝게 복원된다. action 복원은 입력 쌍에 구성된 표현이 섞일수록 낮아지며, 특히 Reacher와 TwoRoom에서 낙차가 크다. 논문의 결론은 구성된 표현이 두 표현 사이의 임의의 점이 아니라 상태 정보와 transition 실행에 필요한 구조를 상당 부분 담고 있다는 것이다.

부록은 이 결과를 그림으로 덧붙인다. 네 과제 각각에 대해 state probe의 예측을 시뮬레이터에 그려, 구성된 표현에서 복원한 배치가 인코딩된 상태들 사이에서 일관되게 변해 가는 모습을 보인다.

### 4.4 ablation: closed-loop interval

학습된 모델을 고정한 채 재계획 사이에 실행하는 action 수를 5, 10, 15, 20, 25로 바꿔 측정했다.

| 재계획 간격 | PushT | Cube | Reacher | TwoRoom | Macro |
|---|---|---|---|---|---|
| 5 | 95.67 | 100 | 98 | 99.67 | 98.33 |
| 10 | 87 | 100 | 97.33 | 99.33 | 95.92 |
| 15 | 71.33 | 97.67 | 95 | 99.33 | 90.83 |
| 20 | 68.33 | 96.33 | 97.33 | 99 | 90.25 |
| 25 | 26 | 90 | 63 | 97.67 | 69.17 |

간격 5가 macro 평균 98.33%로 가장 높고 기본값으로 쓰인다. 중간 구간에서는 성능이 유지되지만 실행이 open-loop에 가까워질수록 하락해 간격 25에서 69.17%까지 내려간다. 하락을 주도하는 과제는 PushT와 Reacher이고 Cube와 TwoRoom은 상대적으로 안정적이다. 논문은 이 결과를 새 observation을 주기적으로 반영해 누적된 실행 오차를 바로잡는 일이 중요하다는 근거로 읽는다.

### 4.5 ablation: 목적함수의 역할

세 목적함수 조합을 PushT 성공률로 비교했다.

| 조합 | PushT 성공률 |
|---|---|
| interpolation IDM 단독 | 95.56 |
| encoded IDM + consistency (interpolation IDM 제외) | 39.37 |
| interpolation IDM + encoded IDM | 96.17 |
| interpolation IDM + consistency | 95.23 |
| 세 항 모두 | 96.00 |

interpolation IDM 항을 빼면 96.00%에서 39.37%로 떨어진다. 이 항을 포함한 조합은 95.23%에서 96.17% 사이로 모두 비슷하다. 논문은 구성된 latent path 위의 action grounding이 representation space에서의 planning을 실행 가능하게 만드는 주된 학습 신호라고 정리한다.

나머지 두 항의 역할은 성공률이 아니라 표현 성질에서 드러난다. encoded IDM 항은 state probe의 결정계수를 0.95에서 0.98로 올리고, consistency 항은 구성된 표현을 같은 시점의 인코딩된 표현에 기하적으로 맞춘다. 기본 설정으로 세 항을 모두 쓰는 이유는 이 성질을 함께 유지하면서도 성공률이 최고 조합과 비슷하기 때문이다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

논문에는 별도의 한계 절이 없다. 본문과 표에서 확인되는 제약은 다음과 같다.

- **open-loop 구간이 길어지면 성능이 크게 하락한다.** 재계획 간격 25에서 macro 평균이 69.17%로 내려가고 PushT는 26%까지 떨어진다. 병렬 디코딩이 가능하다는 장점을 실제로 쓰려면 재계획 주기를 짧게 유지해야 한다.
- **구성된 표현에서의 action 복원은 인코딩된 쌍보다 약하다.** Reacher는 0.167에서 0.034로, TwoRoom은 0.243에서 0.089로 낮아진다. 두 환경은 LeWM도 같은 구간에서 낮은 값을 보인다.
- **목표 observation이 없는 설정에는 추가 모듈이 필요하다.** LIBERO-Goal에서는 delta predictor와 과제 ID 조건을 붙여야 경로를 이어 붙일 수 있다.
- **대형 pre-training 모델과의 격차가 남아 있다.** LIBERO-Goal 평균에서 RWM 93.0%는 OpenVLA-OFT 7B의 97.0%보다 낮고, 개별 과제 T6에서는 RC-aux보다도 낮다.
- **경로 구성 규칙이 고정돼 있다.** 논문은 고정된 경로 구성 규칙이 기하학적 발판 역할을 하고 inverse dynamics 지도가 표현을 그 발판에 맞춘다고 설명한다. 규칙 자체를 학습하는 방향은 다루지 않는다.
- **비교표의 일부 행은 짝을 맞춘 통제가 아니다.** 단검 표시가 붙은 세 행은 과제 일부만 다루거나 재현 규약이 다르다.

결론 절이 제시하는 방향은 representation space에서의 planning이 기존 world model planning의 대안이 될 수 있다는 것이며, 더 복잡한 embodied control로의 확장 가능성을 LIBERO-Goal 결과로 뒷받침한다.

## 6. 관련 연구 (Related Work)

논문은 관련 연구를 세 가지로 나눈다.

**표현 학습.** autoencoder와 variational autoencoder의 복원 기반 학습에서 시작해 InstDisc, MoCo, SimCLR, BYOL, Barlow Twins, VICReg, DINO, iBOT으로 이어지는 자기지도 계열이 복원 없이도 전이 가능한 시각 표현을 만든다는 것을 보였다. 이후 V-JEPA는 시간에 걸친 표현 예측을 도입했고, embodied 변형들은 연속 제어를 위해 상태 transition과 상호작용 동역학을 latent에서 모델링했다. RWM은 상태만이 아니라 상태 사이의 영역까지 구조화한다는 점에서 한 걸음 더 나간다고 적는다.

**world model.** Ha와 Schmidhuber의 초기 latent world model, PlaNet과 Dreamer 계열, 그리고 복원 없이 planning에 맞춰 표현과 동역학을 함께 최적화한 MuZero가 계보를 이룬다. 시각적으로 풍부한 환경으로 규모가 커지면서 Genie와 Cosmos 같은 생성 시스템이 action 조건부 영상을 직접 만들지만, 후보 미래마다 고차원 observation을 생성해야 해 제어에는 비용이 크다. LeWM은 미래 observation을 복원하지 않고 압축된 표현 공간에서 예측해 이 비용을 낮춘 사례다.

**학습된 world model 기반 planning.** CEM과 MPPI로 후보 action 열을 표본 추출해 결과를 예측하고 고르는 방식이 표준이며 DINO-WM, LeWM, Fast-LeWM이 여기 속한다. 다른 가지는 goal-conditioned policy나 Inverse Dynamics Model로 탐색을 미리 상각하는 방식이고 GC-IDM이 대표다. RWM은 후보 미래를 평가하지도 않고 끝점에서 action으로 곧장 대응시키지도 않는 세 번째 방식으로 자리를 잡는다.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| RWM (Representation World Model) | 상태와 transition과 실행 가능한 plan을 하나의 representation space 안에서 함께 학습하는 world model. 이 논문이 제안한 구성이다 |
| representation space | 인코더가 observation을 옮겨 놓는 표현 벡터의 공간. RWM에서는 planning이 일어나는 장소이기도 하다 |
| latent path | 시작 표현과 목표 표현 사이를 interpolation으로 채워 만든 표현의 열. 학습을 거치면 실행 가능한 plan이 된다 |
| interpolation IDM 손실 | 구성된 이웃 표현 쌍에서 실제 실행된 action을 복원하게 하는 손실. RWM의 필수 학습 신호다 |
| delta predictor | 목표 observation이 없는 설정에서 다음 표현까지의 변위를 예측하는 모듈. LIBERO-Goal 실험에만 쓰인다 |
| state probe / action probe | 동결된 인코더 위에 얹어 물리 상태나 action을 예측하게 하는 소형 MLP. 표현이 담은 정보량을 재는 도구다 |
| closed-loop interval | 재계획과 재계획 사이에 실제로 실행하는 action의 개수 |
| LeWM | 시각 action trajectory에서 action 조건부 latent 동역학을 학습하는 world model. 이 논문의 주된 비교 대상이다 |
| INTACT | 탐색 없는 world model을 목표로 한 선행 연구이자 연속 제어 평가 규약의 출처 |
| SIGReg | LeWM이 표현 붕괴를 막기 위해 쓰는 표현 정규화. RWM은 쓰지 않는다 |

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 1 | "기존 world model과 RWM의 대비" | caption-region | ★ wiki 권장 (concept) |
| fig02 | 4 | "RWM의 전체 구성과 학습 추론 절차" | caption-region | ★ wiki 권장 (method) |
| fig03 | 8 | "LeWM과 RWM 인코더의 probe 비교" | caption-region | ★ wiki 권장 (result) |
| fig04 | 8 | "구성된 표현이 보존하는 정보량" | caption-region | ★ wiki 권장 (result) |
| fig05 | 9 | "closed-loop interval에 따른 성공률" | caption-region | ★ wiki 권장 (result) |
| fig06 | 14 | "PushT 물리 상태 복원 시각화" | caption-region | ★ wiki 권장 (result) |
| fig07 | 15 | "Cube 물리 상태 복원 시각화" | caption-region | (fig06과 같은 형식, 아카이브만) |
| fig08 | 16 | "Reacher 물리 상태 복원 시각화" | caption-region | (fig06과 같은 형식, 아카이브만) |
| fig09 | 17 | "TwoRoom 물리 상태 복원 시각화" | caption-region | (fig06과 같은 형식, 아카이브만) |
| tab01 | 7 | "연속 제어 벤치마크 성공률" | table-region | (wiki에는 마크다운 표로 재작성) |
| tab02 | 7 | "LIBERO-Goal 과제별 성공률" | table-region | (wiki에는 마크다운 표로 재작성) |
| tab03 | 9 | "목적함수 ablation" | table-region | (wiki에는 마크다운 표로 재작성) |
| tab04 | 13 | "학습 설정표" | table-region | (wiki에는 마크다운 표로 재작성) |
