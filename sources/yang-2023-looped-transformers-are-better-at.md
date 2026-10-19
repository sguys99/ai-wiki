---
title: "Looped Transformers are Better at Learning Learning Algorithms"
type: paper
year: 2023
category: llms
raw_path: raw/papers/yang-2023-looped-transformers-are-better-at.pdf
raw_filename: "yang-2023-looped-transformers-are-better-at.pdf"
source_collection: external
authors: "Liu Yang, Kangwook Lee, Robert D. Nowak, Dimitris Papailiopoulos"
arxiv_id: "2311.12424"
url: "https://arxiv.org/abs/2311.12424"
tags: [looped-transformer, in-context-learning, weight-sharing, iterative-algorithm, fixed-point, transformer-architecture]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/yang-2023-looped-transformers-are-better-at/fig01.png
    raw: raw/papers/yang-2023-looped-transformers-are-better-at-figures/fig01.png
    caption: "문제 설정과 두 해법 비교. 표준 Transformer는 닫힌 형태 해를 한 번의 forward pass로 근사하고, looped transformer는 한 블록을 입력 주입과 함께 반복해 gradient descent 같은 반복 알고리즘을 흉내 낸다"
    page: 2
    bbox_norm: [0.1802, 0.2604, 0.8198, 0.4196]
    strategy: manual
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/yang-2023-looped-transformers-are-better-at/fig02.png
    raw: raw/papers/yang-2023-looped-transformers-are-better-at-figures/fig02.png
    caption: "선형 회귀 in-context learning 결과. 왼쪽은 30회 반복으로 학습한 looped transformer가 100회까지 오차가 안정적인 fixed point에 머무는 모습, 오른쪽은 1/12 파라미터로 12층 Transformer와 최소제곱 해에 일치하는 모습"
    page: 3
    bbox_norm: [0.2059, 0.0939, 0.7941, 0.2129]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/yang-2023-looped-transformers-are-better-at/fig03.png
    raw: raw/papers/yang-2023-looped-transformers-are-better-at-figures/fig03.png
    caption: "입력 주입 유무 비교. 입력 주입이 없는 weight-tying 모델은 학습한 반복 횟수(20회)를 넘기면 오차가 다시 커지고, 입력 주입 모델은 낮은 오차를 유지한다"
    page: 5
    bbox_norm: [0.6032, 0.2138, 0.8497, 0.36]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/yang-2023-looped-transformers-are-better-at/fig04.png
    raw: raw/papers/yang-2023-looped-transformers-are-better-at-figures/fig04.png
    caption: "선형 회귀에서 b와 T 조합별 추론 반복 횟수 대비 오차. 왼쪽부터 T=5, 10, 15이고 색은 b 값, 점선은 학습 시 b 위치다. b가 작으면 학습 범위를 넘어 발산한다"
    page: 5
    bbox_norm: [0.1702, 0.6674, 0.8298, 0.8076]
    strategy: manual
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/yang-2023-looped-transformers-are-better-at/fig05.png
    raw: raw/papers/yang-2023-looped-transformers-are-better-at-figures/fig05.png
    caption: "학습 중 본 서로 다른 prompt 수에 따른 오차(d=10). looped transformer가 5천 개에서 1만 개 구간에서 표준 Transformer보다 훨씬 낮은 오차에 도달한다"
    page: 7
    bbox_norm: [0.6102, 0.2624, 0.8498, 0.3826]
    strategy: manual
    curated: true
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/yang-2023-looped-transformers-are-better-at/fig06.png
    raw: raw/papers/yang-2023-looped-transformers-are-better-at-figures/fig06.png
    caption: "분포 밖 입력 평가. (a) 공분산이 치우친 입력, (b) 잡음이 섞인 선형 회귀, (c) 입력을 3배로 키운 경우의 오차"
    page: 7
    bbox_norm: [0.1502, 0.0824, 0.8498, 0.2526]
    strategy: manual
    curated: true
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/yang-2023-looped-transformers-are-better-at/fig07.png
    raw: raw/papers/yang-2023-looped-transformers-are-better-at-figures/fig07.png
    caption: "구조 변형 실험. 왼쪽은 층 수 L에 따른 표준 Transformer와 looped transformer 비교, 오른쪽은 looped transformer의 L, 임베딩 차원 D, head 수 h 변화"
    page: 8
    bbox_norm: [0.2177, 0.0795, 0.9039, 0.2286]
    strategy: caption-region
    curated: true
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/yang-2023-looped-transformers-are-better-at/fig08.png
    raw: raw/papers/yang-2023-looped-transformers-are-better-at-figures/fig08.png
    caption: "층 또는 반복별 probing 오차. 표준 Transformer는 10층 근처에서 X^T y와 최소제곱 해를 가장 잘 담다가 이후 나빠지고, looped transformer는 반복할수록 계속 좋아진다. 점선은 control task 오차"
    page: 8
    bbox_norm: [0.2002, 0.4404, 0.7898, 0.5756]
    strategy: manual
    curated: true
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/yang-2023-looped-transformers-are-better-at/fig09.png
    raw: raw/papers/yang-2023-looped-transformers-are-better-at-figures/fig09.png
    caption: "T=10에서 함수 클래스별 b에 따른 수렴 양상. (a) 희소 선형 회귀, (b) 결정 트리, (c) 2층 ReLU 신경망"
    page: 9
    bbox_norm: [0.1602, 0.4154, 0.8398, 0.5756]
    strategy: manual
    curated: true
  - id: fig10
    label: Figure 10
    kind: figure
    file: assets/yang-2023-looped-transformers-are-better-at/fig10.png
    raw: raw/papers/yang-2023-looped-transformers-are-better-at-figures/fig10.png
    caption: "복잡한 함수 클래스에서 in-context 예시 수 대비 오차. 희소 선형 회귀, 결정 트리, 2층 ReLU 신경망 모두에서 looped transformer가 1/12 파라미터로 표준 Transformer와 같거나 더 낫다"
    page: 10
    bbox_norm: [0.1667, 0.0777, 0.8156, 0.2047]
    strategy: caption-region
    curated: true
  - id: fig11
    label: Figure 11
    kind: figure
    file: assets/yang-2023-looped-transformers-are-better-at/fig11.png
    raw: raw/papers/yang-2023-looped-transformers-are-better-at-figures/fig11.png
    caption: "희소도 s=1, 3, 6, 9, 12인 희소 선형 함수(d=20)에서 looped transformer(실선)와 표준 Transformer(점선)의 오차"
    page: 10
    bbox_norm: [0.1502, 0.3874, 0.5098, 0.5226]
    strategy: manual
    curated: true
  - id: fig12
    label: Figure 12
    kind: figure
    file: assets/yang-2023-looped-transformers-are-better-at/fig12.png
    raw: raw/papers/yang-2023-looped-transformers-are-better-at-figures/fig12.png
    caption: "부록 B. 선형 함수와 희소 선형 함수에서 b와 T 전체 조합별 반복 횟수 대비 오차와 예시 수 대비 오차"
    page: 16
    bbox_norm: [0.1233, 0.16, 0.8288, 0.7495]
    strategy: caption-region
    curated: false
  - id: fig13
    label: Figure 13
    kind: figure
    file: assets/yang-2023-looped-transformers-are-better-at/fig13.png
    raw: raw/papers/yang-2023-looped-transformers-are-better-at-figures/fig13.png
    caption: "부록 B. 결정 트리와 2층 ReLU 신경망에서 b와 T 전체 조합별 반복 횟수 대비 오차와 예시 수 대비 오차"
    page: 17
    bbox_norm: [0.1298, 0.1603, 0.8325, 0.7494]
    strategy: caption-region
    curated: false
  - id: fig14
    label: Figure 14
    kind: figure
    file: assets/yang-2023-looped-transformers-are-better-at/fig14.png
    raw: raw/papers/yang-2023-looped-transformers-are-better-at-figures/fig14.png
    caption: "부록 C. 문제 차원 d=5, 10, 20에서 학습 prompt 수에 따른 표준 Transformer와 looped transformer의 표본 효율 비교"
    page: 18
    bbox_norm: [0.1667, 0.0885, 0.8156, 0.2334]
    strategy: caption-region
    curated: false
  - id: fig15
    label: Figure 15
    kind: figure
    file: assets/yang-2023-looped-transformers-are-better-at/fig15.png
    raw: raw/papers/yang-2023-looped-transformers-are-better-at-figures/fig15.png
    caption: "부록 D. 선형 회귀로 학습한 모델을 여섯 가지 분포 밖 조건(치우친 공분산, 부분공간, 잡음, 직교 질의, 예시와 같은 질의, 다른 orthant)에서 평가한 결과"
    page: 19
    bbox_norm: [0.1949, 0.1141, 0.805, 0.4088]
    strategy: caption-region
    curated: false
  - id: fig16
    label: Figure 16
    kind: figure
    file: assets/yang-2023-looped-transformers-are-better-at/fig16.png
    raw: raw/papers/yang-2023-looped-transformers-are-better-at-figures/fig16.png
    caption: "부록 D. 추론 시 입력 x 또는 함수 파라미터 w를 1/3, 1/2, 2, 3배로 바꿨을 때의 오차"
    page: 19
    bbox_norm: [0.1633, 0.537, 0.8324, 0.8203]
    strategy: caption-region
    curated: false
  - id: fig17
    label: Figure 17
    kind: figure
    file: assets/yang-2023-looped-transformers-are-better-at/fig17.png
    raw: raw/papers/yang-2023-looped-transformers-are-better-at-figures/fig17.png
    caption: "부록 E. b 스케줄링 적용 여부에 따른 네 함수 클래스의 오차. 결정 트리에서만 스케줄링이 약간 낫다"
    page: 20
    bbox_norm: [0.2202, 0.0874, 0.7798, 0.4406]
    strategy: manual
    curated: false
  - id: tab01
    label: Table 1
    kind: table
    file: assets/yang-2023-looped-transformers-are-better-at/tab01.png
    raw: raw/papers/yang-2023-looped-transformers-are-better-at-figures/tab01.png
    caption: "부록 G에서 쓴 OpenML 데이터셋 10개의 ID, 이름, 수치 feature 수, 샘플 수"
    page: 21
    bbox_norm: [0.25, 0.5897, 0.75, 0.77]
    strategy: table-region
    curated: false
  - id: tab02
    label: Table 2
    kind: table
    file: assets/yang-2023-looped-transformers-are-better-at/tab02.png
    raw: raw/papers/yang-2023-looped-transformers-are-better-at-figures/tab02.png
    caption: "OpenML 데이터셋 leave-one-out 평가의 테스트 정확도. 표준 Transformer와 looped transformer 비교"
    page: 22
    bbox_norm: [0.2222, 0.2034, 0.7778, 0.3838]
    strategy: table-region
    curated: true
---

## 한 줄 요약 (One-line Summary)

Transformer 블록 하나를 입력 주입과 함께 여러 번 반복 적용하는 looped transformer를 in-context learning 과제로 학습시키는 방법을 제안하고, 이 모델이 표준 12층 Transformer의 10% 미만 파라미터로 선형 회귀, 희소 선형 회귀, 결정 트리, 2층 ReLU 신경망 데이터를 비슷하거나 더 잘 푼다는 것을 실험으로 보인 ICLR 2024 논문이다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 제목 | Looped Transformers are Better at Learning Learning Algorithms |
| 저자 | Liu Yang, Kangwook Lee, Robert D. Nowak, Dimitris Papailiopoulos |
| 소속 | University of Wisconsin, Madison |
| 발표 | ICLR 2024 (arXiv 2311.12424, v3 2024-03-16) |
| 코드 | https://github.com/Leiay/looped_transformer |
| 분량 | 본문 10쪽, 부록 A부터 G까지 포함 22쪽 |

## 2. 주요 기여 (Key Contributions)

- in-context learning은 가중치를 갱신하지 않고 prompt 안의 예시만으로 과제를 푸는 능력이다. 저자들은 Garg et al.(2022)의 설정, 즉 Transformer를 처음부터 학습시켜 함수 클래스를 in-context로 푸는 실험 틀을 그대로 쓰면서 구조만 looped transformer로 바꾼다.
- 전통적 기계학습은 선형 회귀를 gradient descent 같은 반복 알고리즘으로 푸는데, 표준 Transformer에는 반복 구조가 없다. looped transformer는 같은 블록을 반복하므로 반복 알고리즘을 흉내 내기에 구조적으로 맞고, 과제를 단순한 하위 단계로 쪼개 파라미터를 크게 줄일 수 있다.
- 반복 알고리즘을 흉내 내는 looped transformer의 학습법을 제시한다. 핵심 설계는 두 가지다. 매 반복마다 원래 prompt를 다시 더하는 입력 주입(input injection), 그리고 최대 반복 횟수 b와 손실을 계산할 마지막 T회 구간으로 정의한 truncated loss다.
- 선형 회귀에서 1층 looped transformer(0.79M 파라미터)가 12층 표준 Transformer(9.48M 파라미터)와 같은 성능을 내고, 학습한 반복 횟수를 넘겨 추론해도 오차가 발산하지 않는 fixed-point 해에 머문다.
- 희소 선형 회귀에서는 표준 Transformer뿐 아니라 in-context 예시가 적은 구간에서 Lasso보다도 낮은 오차를 기록한다. 저자들은 이를 더 단순한(희소한) 해를 선호하는 inductive bias로 해석한다.
- 학습에 필요한 서로 다른 prompt 수가 적어 표본 효율이 높고, 실제 데이터인 OpenML 10개 데이터셋에서도 표준 Transformer와 비슷하거나 더 나은 정확도를 보인다.
- b와 T의 최적값이 과제 난이도를 반영한다는 관찰을 근거로, 두 값을 Transformer 관점의 과제 난이도 지표로 쓸 수 있다고 제안한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 문제 설정

함수 클래스 F 위의 분포 D_F에서 함수 f를 하나 뽑고, 입력 분포 D_X에서 x_1부터 x_k까지 k개 예시와 질의 x_test를 뽑는다. prompt는 P = (x_1, f(x_1), ..., x_k, f(x_k), x_test)이고 학습 시스템 M은 f를 직접 보지 않고 f(x_test)를 예측한다. 성능은 제곱 오차 (M(P) - f(x_test))^2로 잰다.

모델은 GPT-2 디코더다. 표준(unlooped) Transformer는 Garg et al.(2022)를 따라 L=12층, looped transformer는 L=1층을 쓴다.

### 3.2 반복 알고리즘이 필요한 이유

선형 회귀 min_w ||Xw - y||^2의 닫힌 형태 해 (X^T X)^{-1} X^T y는 역행렬 계산을 요구한다. 역행렬은 행렬 곱보다 Transformer가 배우기 어렵고 더 많은 층과 head가 필요하다(Charton 2021, von Oswald 2022, Giannou 2023). 반면 gradient descent는 행렬 곱 X^T(Xw - y)만 쓰되 이를 반복 적용한다. 따라서 같은 블록을 여러 번 쓰는 구조가 반복 알고리즘을 적은 파라미터로 표현하기에 유리하다는 것이 출발점이다.

연구 질문은 "looped transformer가 비재귀 표준 Transformer보다 반복 학습 알고리즘을 더 효율적으로 흉내 낼 수 있는가"이며, 저자들은 시험한 함수 클래스 범위 안에서는 그렇다고 답한다.

### 3.3 학습 목표

looped transformer가 반복 알고리즘을 흉내 내려면 두 성질을 가져야 한다고 본다.

1. 반복이 진행될수록 성능이 유지되거나 좋아진다.
2. 반복을 무한히 계속해도 성능이 나빠지지 않는다.

i개 예시를 가진 prompt 앞부분을 P^i = (x_1, f(x_1), ..., x_i, f(x_i), x_{i+1})로 두면, t회 반복 후 출력은 Y_t(P^i|θ) = M_θ(M_θ(... M_θ(Y_0^i + P^i) + P^i) ... + P^i)이고 Y_0^i는 P^i와 같은 모양의 영 텐서다. 학습 손실은 다음과 같다(식 1).

- 반복 b_0부터 b까지의 출력에 대해, 모든 prompt 앞부분 i=0..k의 제곱 오차를 평균한다.
- b_0 = max(b - T, 0)이다. 즉 마지막 T회 반복만 손실에 기여한다.
- 이 truncated loss는 계산을 줄이기 위해 truncated backpropagation through time에서 착안했다.

### 3.4 입력 주입

일반형 looped transformer는 Y_{t+1} = M(Y_t; P)로 쓸 수 있다. 기존의 weight-tying 형식(ALBERT, Universal Transformer)은 Y_{t+1} = M(Y_t), Y_0 = P이고 반복 횟수를 유한한 T로 제한한다. 이 형식은 t가 커질수록 초기 입력의 영향이 사라져 해가 사실상 무작위가 된다(Bai 2019, Bansal 2022).

저자들은 Y_{t+1} = M(Y_t + P)로 매 반복마다 원래 prompt를 더한다. 입력 주입 방식이 덧셈에만 한정되지는 않는다. Figure 3에서 입력 주입이 없는 weight-tying 모델은 학습 반복 횟수를 넘기면 오차가 빠르게 발산하고, 입력 주입 모델은 낮은 오차를 유지한다.

### 3.5 b와 T의 선택

b회 반복은 가중치를 공유하는 b층 Transformer와 같은 실효 깊이를 갖는다. 두 값에는 각각 trade-off가 있다.

| 변수 | 크게 하면 | 작게 하면 |
|---|---|---|
| b (최대 반복 횟수) | 학습과 추론 시간 증가, 학습 범위 밖에서도 발산하지 않는 fixed point를 찾기 쉬움. 일정 값을 넘으면 수렴 속도가 오히려 떨어짐 | 모델 잠재력 제한, 학습 반복 횟수 이후 발산 |
| T (손실 구간 길이) | 그래디언트 요동으로 학습 불안정 (순환 모델 학습 문헌의 알려진 현상) | 메모리 절약, 성능 저하 |

선형 회귀에서 b ∈ {12, 20, 30, 40, 50}, T ∈ {5, 10, 15}를 탐색했다(Figure 4).

- b가 작으면 학습 반복 횟수 이후 발산해 fixed-point 해가 불안정하다.
- b=12는 표준 12층 Transformer와 실효 깊이가 같지만 그 성능을 재현하지 못한다.
- looped transformer는 학습한 b보다 먼저 포화하는 fixed point를 찾는다. 손실이 b단계 안에 목표에 도달하도록 요구하기 때문이며, b가 작을수록 fixed point로 빨리 수렴한다.
- 일정 b를 넘으면 수렴 속도가 포화한다. 예를 들어 T=15에서 b=40과 50의 수렴 속도는 비슷하다.
- 목표는 학습 분포 안 과제를 효율적으로 푸는 것이므로 발산을 막는 최소 b와 메모리를 아끼는 작은 T를 고른다. 선형 회귀는 b=20, T=15를 채택했다.

### 3.6 모델 구성과 학습 세부

| 항목 | 표준 Transformer | looped transformer |
|---|---|---|
| 구조 | GPT-2 디코더, 12층 | GPT-2 디코더, 1층 |
| 임베딩 차원 D | 256 | 256 |
| head 수 h | 8 | 8 |
| 파라미터 수 | 9.48M | 0.79M |
| 최적화 | Adam, learning rate 0.0001 | 동일 |
| 정규화 | weight decay, gradient clip, data augmentation 없음 | 동일 |

정규화를 빼는 이유는 Garg et al.(2022)의 학습법과 공정하게 비교하기 위해서다.

### 3.7 실험 설정과 스케줄링

- 기본 과제는 문제 차원 d=20, in-context 예시 k=40인 선형 함수다. 파라미터 w와 입력 x_i는 모두 N(0, I_d)에서 뽑는다.
- 평가는 prompt 1,280개에 대해 하고, bootstrap 1,000회로 90% 신뢰구간을 보고한다. 오차는 Garg et al.(2022)처럼 문제 차원으로 정규화한다.
- d와 k에 대해서는 Garg et al.(2022)의 학습 curriculum을 따른다.
- b에도 스케줄을 둔다. 학습 중 b를 점점 키우므로 손실 구간은 [1, T]에서 시작해 [b-T, b]로 옮겨 간다. [1, T] 구간에서 목표를 맞히는 쪽이 더 어려우므로 저자들은 이를 curriculum learning이라 부르지 않고 학습 시동(kick-start) 장치로 본다. 대부분의 경우 스케줄 유무가 결과에 큰 영향을 주지 않지만 결정 트리에서는 스케줄링이 약간 낫다(부록 E, Figure 17).

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 선형 회귀 (분포 안)

b=20, T=15로 학습한 looped transformer는 표준 Transformer의 성능과 일치하고 최적 해인 최소제곱(ordinary least squares)에 거의 근접한다(Figure 2 오른쪽). 30회 반복으로 학습한 모델은 추론 시 100회까지 반복해도 안정적인 fixed-point 해에 머문다(Figure 2 왼쪽). 사용 파라미터는 표준 Transformer의 1/12이다.

### 4.2 표본 효율

학습 중 함수를 매번 새로 만들지 않고 고정된 학습 데이터셋을 미리 만들어, 서로 다른 prompt 수가 결과에 미치는 영향을 측정했다. d=10, k=20이며 curriculum은 껐다. looped transformer는 파라미터가 적어 더 적은 수의 서로 다른 prompt로 함수를 학습한다(Figure 5). 부록 C에서 d=5(k=10), d=20(k=40)으로 넓혀도 같은 경향이다(Figure 14). 이 실험에서 looped transformer는 b=30, T=15, b 스케줄링 없이 학습했고, learning rate는 d=5에서 {0.0001}, d=10에서 {0.00001, 0.0001}, d=20에서 {0.00001, 0.0001, 0.001} 중 최적을 골랐다.

### 4.3 분포 밖 평가와 inductive bias

선형 회귀로 학습한 모델을 세 조건에서 평가했다(Figure 6).

| 조건 | 결과 |
|---|---|
| (a) 공분산이 치우친 입력 | looped transformer가 더 낫다. 단순한 해를 선호하는 inductive bias 덕분으로 해석 |
| (b) 잡음이 섞인 선형 회귀 | double descent 곡선의 봉우리가 낮아진다. 기본 모델에 약한 정규화를 건 효과와 비슷 |
| (c) 입력을 3배로 키운 경우(x = 3z) | looped transformer가 표준 Transformer보다 나쁘다. 단순성 편향이 스케일 변화에는 불리 |

looped transformer는 입력 분포 변화와 무관하게 참 알고리즘을 익힌 것이 아니라, 표준 Transformer보다 단순한 해를 선호하는 inductive bias를 보인다. Bhattamishra et al.(2022)가 보고한 무작위 Transformer의 단순성 편향과 같은 계열이다.

부록 D(Figure 15, 16)의 확장 결과는 다음과 같다.

- 잡음 선형 회귀처럼 일부 조건에서는 looped transformer가 층 수가 적은 표준 Transformer(L=4)와 비슷하게 행동한다. L=4 Transformer도 예시 수가 d개일 때 봉우리가 낮다.
- 치우친 공분산, d/2차원 부분공간 입력, 예시와 질의가 다른 orthant에 있는 경우처럼 L이 클수록 좋은 조건에서는 looped transformer가 최대 L=20 표준 Transformer와 같거나 더 낫다. b<20은 fixed point를 못 찾으므로 비교에서 뺐다.
- 질의가 예시와 직교하거나 예시 중 하나와 같은 경우에는 두 모델이 비슷하다.
- x나 w를 1/3, 1/2, 2, 3배로 바꾸면 looped transformer는 층이 적은 표준 Transformer와 비슷하다. 예를 들어 x를 2배 키우면 L=4 Transformer와 비슷하다.

### 4.4 구조 변형 (b=30, T=15)

| 변형 | 관찰 |
|---|---|
| 층 수 L | L이 클수록 빨리 수렴한다. L층 표준 Transformer를 따라잡으려면 L회보다 많은 반복이 필요하다. 1층 looped transformer는 약 20회 반복해야 8층 Transformer 성능에 도달한다. 즉 두 모델은 층(반복)마다 다른 표현을 배운다 |
| 임베딩 차원 D (L=1, h=8) | D가 클수록 수렴이 좋아지고 D=256에서 포화한다 |
| L (D=256, h=8) | 수렴 성능은 비슷하고 수렴 속도만 다르다 |
| head 수 h (L, D 고정) | h가 2에서 8로 늘 때 오차가 줄고, 8에서 32로 늘면 다시 커진다. GPT-2 구현에서 head당 차원이 D/h라 head 수와 head당 차원이 맞바뀌기 때문이다 |

### 4.5 probing으로 본 층별 표현

Akyürek et al.(2022), Alain and Bengio(2016)의 model probing을 썼다. t번째 층(또는 t회 반복) 출력 Y_t(k×D)에 대해 학습 가능한 가중치 s로 softmax 가중합 Z_t = softmax(s)^T Y_t를 만들고, 은닉 64개인 2층 MLP로 목표값을 복원한다. 목표값은 gradient 성분 X^T y와 최소제곱 해 w_ols 두 가지다. 층과 문맥 길이마다 별도 probe를 학습하고, 오차는 문제 차원 d로 나눈다(D=256, d=20, Adam, learning rate 0.001을 {0.01, 0.001, 0.0001} 중 선택).

- 표준 Transformer는 초반 층에서 X^T y와 w_ols를 담다가 10층 근처에서 가장 잘 복원하고, 이후 다른 통계로 초점을 옮겨 probe 오차가 다시 커진다.
- looped transformer는 반복할수록 두 목표의 표현을 꾸준히 개선한다(Figure 8).
- control task(w를 1로 고정해 입력 통계만 학습)의 최소 probe 오차가 점선이며, 실제 probe 오차와의 차이가 커서 probe가 in-context 정보를 실제로 쓰고 있음을 보여 준다.

### 4.6 복잡한 함수 클래스

| 함수 클래스 | 설정 | 최적 b, T |
|---|---|---|
| 희소 선형 함수 | d=20, k=100, 비영 성분 s=3 | b=20, T=10 |
| 결정 트리 | 깊이 4, d=20 | b=70, T=15 |
| 2층 ReLU 신경망 | 은닉 100, d=20 | b=12, T=5 |

결정 트리는 각 내부 노드가 무작위로 고른 입력 좌표의 부호로 좌우를 정하고 잎 값은 N(0, I)에서 뽑는다. 희소 선형 함수는 d차원 중 s개만 0이 아니다.

T=10에서 b를 바꾼 결과(Figure 9), 선형 회귀는 b=20에서 발산하지만 희소 선형 회귀는 fixed point로 수렴한다. 즉 파라미터가 많은 과제일수록 큰 b와 T가 필요하다. 결정 트리는 학습할 파라미터가 2^{depth+1} - 1 = 31개라 더 큰 b가 필요하다. 반면 2층 ReLU 신경망은 파라미터가 21 × 100개로 많고 학습이 어렵다고 알려져 있는데도 b=12면 충분하며, 저자들은 그 이유를 밝히지 못했다.

최적 b, T로 학습한 결과(Figure 10)는 다음과 같다.

- 모든 과제에서 looped transformer가 표준 Transformer와 일치한다.
- 희소 선형 회귀에서는 표준 Transformer는 물론 Lasso(α=0.01, {1e-4, 1e-3, 0.01, 0.1, 1}에서 탐색)보다도 낫다. 여기서 "낫다"는 최종 정밀도가 아니라 예시 수에 따른 추세를 뜻한다.
- 예시 40개에서 오차는 Lasso 1.32e-04, 최소제곱 8.21e-14, looped transformer 6.12e-04, 표준 Transformer 0.0017이다. 예시가 10개 미만이면 looped transformer가 Lasso보다 오차가 작다.
- 결정 트리 비교 대상은 3-Nearest Neighbors, Greedy Tree Learning, XGBoost(부호 전처리 유무), 2층 ReLU 신경망 비교 대상은 최소제곱, 3-Nearest Neighbors, gradient descent로 학습한 2층 신경망이다.

희소도 s=1, 3, 6, 9, 12로 바꾼 실험(b=30, T=15, Figure 11)에서도 모든 희소도에서 looped transformer가 표준 Transformer와 같거나 더 낫고, 예시 수가 적을 때 차이가 크다.

### 4.7 부록 B의 b와 T 전수 결과

선형, 희소 선형, 2층 ReLU 신경망은 b ∈ {12, 20, 30, 40, 50}, 결정 트리는 b ∈ {12, 50, 70, 100}, 모든 과제에서 T ∈ {5, 10, 15}를 탐색했다(Figure 12, 13). 결과는 과제와 무관하게 일관된다.

- T가 작을수록 in-context 해의 평균 제곱 오차가 크다.
- T를 고정하면 b가 클수록 fixed point를 찾기 쉽고, 성능은 일정 b까지 좋아진 뒤 포화한다.
- T=20 같은 큰 값은 weight decay, mixed precision, gradient norm clip 같은 안정화 기법 없이 학습하면 불안정하지만, 이 기법들을 쓰면 안전하게 학습할 수 있다.

### 4.8 OpenML 실제 데이터 (부록 G)

OpenML 10개 데이터셋(0/1 이진 레이블, 수치 feature만 사용)에서 9개로 학습하고 나머지 1개로 평가하는 leave-one-out 방식을 썼다. 두 모델 모두 임베딩 256, head 8이며 표준 Transformer는 12층, looped transformer는 1층(b=30, T=15)이다.

| Test ID | 이름 | 표준 Transformer | looped transformer |
|---|---|---|---|
| 720 | abalone | 0.626 ± 0.008 | 0.662 ± 0.008 |
| 725 | bank8FM | 0.511 ± 0.007 | 0.504 ± 0.008 |
| 737 | space ga | 0.656 ± 0.006 | 0.72 ± 0.01 |
| 803 | delta ailerons | 0.394 ± 0.01 | 0.40 ± 0.01 |
| 807 | kin8nm | 0.405 ± 0.004 | 0.416 ± 0.005 |
| 816 | puma8NH | 0.463 ± 0.004 | 0.462 ± 0.004 |
| 819 | delta elevators | 0.483 ± 0.005 | 0.568 ± 0.01 |
| 847 | wind | 0.668 ± 0.007 | 0.757 ± 0.006 |
| 871 | pollen | 0.532 ± 0.004 | 0.51 ± 0.005 |
| 42192 | compas-two-years | 0.65 ± 0.005 | 0.65 ± 0.008 |

10개 중 6개에서 looped transformer가 높고, 3개에서 약간 낮으며, 1개는 같다. 가장 큰 차이는 wind(0.668에서 0.757)와 delta elevators(0.483에서 0.568)다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **학습 분포 안에서만 알고리즘을 흉내 낸다.** looped transformer는 학습 반복 횟수를 넘어서도 fixed-point 해를 근사해 학습 분포 안에서는 fixed-point 반복법을 흉내 내지만, 해에 고유한 오차 하한(error floor)이 있고 분포 밖 prompt 성능이 제한된다. 어떤 입력 분포에도 일반화하는 실제 알고리즘을 찾지는 못한다.
- **b와 T 튜닝 비용.** 최적값은 발산을 막는 최소값을 하이퍼파라미터 탐색으로 정한다. b는 forward pass 시간(b회 펼침)을, T는 학습 메모리(T회분 손실)를 정한다. fixed point 근사만이 목표라면 큰 b, 적당한 T, 그리고 mixed precision, gradient clipping, weight decay 같은 정규화로 집중 튜닝을 피할 수 있다고 제안한다.
- **표현력 분석 부재.** Bai et al.(2019)의 정리 3은 임의의 L층 신경망을 weight-tied, input-injected 네트워크로 표현할 수 있음을 보였고, Giannou et al.(2023)은 인코더 looped transformer가 범용 컴퓨터로 동작할 수 있음을 보였다. 이 논문은 실험적 검증과 학습법에 집중했으며 디코더 looped transformer의 표현력 분석은 향후 과제로 남긴다.
- **적응형 반복.** 과제 난이도가 섞인 실제 환경에서는 Universal Transformer식 토큰 단위 적응 반복이나 in-context multi-task 추론 같은 적응형 looping 전략이 유용할 수 있다.
- **설명되지 않은 관찰.** 2층 ReLU 신경망이 작은 b로 충분한 이유는 밝혀지지 않았다.
- **실험 범위.** 결론은 시험한 함수 클래스(선형, 희소 선형, 결정 트리, 2층 ReLU 신경망)와 OpenML 표 데이터에 한정된다. 언어 모델링 같은 대규모 과제는 다루지 않는다.

## 6. 관련 연구 (Related Work)

| 계열 | 대표 연구 | 이 논문과의 관계 |
|---|---|---|
| 가중치 공유 모델 | RNN, LSTM, Transformer-XL, R-Transformer, Block-Recurrent Transformer, ALBERT, Perceiver, Universal Transformer | 층 사이 가중치 공유를 쓰되 유한 층 또는 halting 기준을 둔다. 이 논문은 입력 주입과 truncated loss로 반복을 확장한다 |
| Deep implicit model | Deep Equilibrium Models(Bai 2019), Jacobian 정규화(Bai 2021) | black-box solver로 fixed point를 찾지만 하이퍼파라미터 튜닝이 많고 불안정하다 |
| Transformer로 수학, 추론 과제 풀기 | Zhang 2023b, Ongie 2020, Charton 2022 등 | 대부분 유한 상태 과제다. 회귀는 연속 출력 공간이라 성격이 다르다 |
| in-context 함수 학습 | Garg 2022, Akyürek 2022, Raventós 2023 | 이 논문은 Garg 2022와 같은 디코더 구조와 non-linear attention을 그대로 쓴다 |
| in-context learning의 이론 | von Oswald 2022(1층 linear self-attention이 gradient descent 한 단계를 학습), Ahn 2023, Zhang 2023a, Mahankali 2023, Fu 2023, Giannou 2024(고차 최적화), 베이즈 추정 관점(Xie 2021, Bai 2023) | 단순화된 linear attention 구조와 실제 디코더 사이의 간극을 학습법으로 메우려 한다 |
| looped transformer | Giannou 2023(Looped Transformers as Programmable Computers) | 같은 그룹의 선행 연구로, 이론적 구성을 실제 학습 가능한 모델로 옮긴다 |

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| looped transformer | 적은 수의 Transformer 층을 가중치 공유 상태로 여러 번 반복 적용하는 구조. 이 논문은 1층 블록을 반복한다 |
| input injection | 매 반복의 입력에 원래 prompt P를 다시 더하는 설계. Y_{t+1} = M(Y_t + P) |
| weight-tying | 입력 주입 없이 Y_{t+1} = M(Y_t)로 같은 가중치만 반복하는 형식. 반복이 길어지면 초기 입력 정보를 잃는다 |
| fixed-point solution | 반복을 계속해도 출력이 더 이상 바뀌지 않는 해. 학습 반복 횟수를 넘겨도 발산하지 않는 상태를 뜻한다 |
| b | 학습 시 펼치는 최대 반복 횟수. forward pass 시간을 정한다 |
| T | 손실을 계산하는 마지막 반복 구간 길이(truncated loss window). 학습 메모리를 정한다 |
| effective depth | b회 반복한 looped transformer가 갖는 가중치 공유 b층에 해당하는 실효 깊이 |
| model probing | 중간 층 출력에서 특정 목표값을 작은 모델로 복원해 그 층이 어떤 정보를 담는지 재는 분석법 |

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 2 | 문제 설정과 표준 Transformer 대 looped transformer 비교 | manual | ★ wiki 권장 (architecture) |
| fig02 | 3 | 선형 회귀에서 fixed point 안정성과 표준 Transformer 일치 | caption-region | ★ wiki 권장 (headline result) |
| fig03 | 5 | 입력 주입 유무에 따른 발산 비교 | caption-region | ★ wiki 권장 (method) |
| fig04 | 5 | b와 T 조합별 수렴 양상 | manual | ★ wiki 권장 (method) |
| fig05 | 7 | 서로 다른 prompt 수에 따른 표본 효율 | manual | ★ wiki 권장 (result) |
| fig06 | 7 | 분포 밖 입력 세 조건 평가 | manual | ★ wiki 권장 (result) |
| fig07 | 8 | 층 수, 임베딩 차원, head 수 변형 | caption-region | ★ wiki 권장 (ablation) |
| fig08 | 8 | 층과 반복별 probing 오차 | manual | ★ wiki 권장 (analysis) |
| fig09 | 9 | 함수 클래스별 b에 따른 수렴 | manual | ★ wiki 권장 (result) |
| fig10 | 10 | 복잡한 함수 클래스 세 종류 성능 비교 | caption-region | ★ wiki 권장 (result) |
| fig11 | 10 | 희소도별 희소 선형 회귀 비교 | manual | ★ wiki 권장 (result) |
| fig12 | 16 | 부록 B 선형과 희소 선형 b, T 전수 결과 | caption-region | (부록) |
| fig13 | 17 | 부록 B 결정 트리와 2층 ReLU b, T 전수 결과 | caption-region | (부록) |
| fig14 | 18 | 부록 C 문제 차원별 표본 효율 | caption-region | (부록) |
| fig15 | 19 | 부록 D 여섯 가지 분포 밖 조건 | caption-region | (부록) |
| fig16 | 19 | 부록 D 입력과 파라미터 스케일 변화 | caption-region | (부록) |
| fig17 | 20 | 부록 E 스케줄링 유무 비교 | manual | (부록) |
| tab01 | 21 | OpenML 데이터셋 목록 | table-region | (본문 표로 대체) |
| tab02 | 22 | OpenML 테스트 정확도 | table-region | ★ wiki 권장 (result) |
