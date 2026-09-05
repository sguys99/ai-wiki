---
title: "RT-1: Robotics Transformer for Real-World Control at Scale"
type: paper
year: 2022
category: physical-ai
source: brohan-2022-rt-1-robotics-transformer-for-real-world.md
raw_path: raw/papers/brohan-2022-rt-1-robotics-transformer-for-real-world.pdf
raw_filename: "brohan-2022-rt-1-robotics-transformer-for-real-world.pdf"
source_collection: external
authors: "Anthony Brohan 외 40여 명 (저자 알파벳순, Robotics at Google, Everyday Robots, Google Research Brain Team)"
arxiv_id: "2212.06817"
url: "https://robotics-transformer1.github.io"
tags: [physical-ai, vla, imitation-learning, manipulation]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/brohan-2022-rt-1-robotics-transformer-for-real-world/fig01.png
    raw: raw/papers/brohan-2022-rt-1-robotics-transformer-for-real-world-figures/fig01.png
    caption: "RT-1 전체 개요. 이미지와 지시문을 받아 이산화된 arm/base 행동을 내고 13만 개 시연 데이터, 3,000회 실세계 평가로 검증"
    page: 2
    bbox_norm: [0.1667, 0.0962, 0.8333, 0.4393]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/brohan-2022-rt-1-robotics-transformer-for-real-world/fig03.png
    raw: raw/papers/brohan-2022-rt-1-robotics-transformer-for-real-world-figures/fig03.png
    caption: "RT-1 상세 아키텍처. USE 임베딩, FiLM EfficientNet-B3, TokenLearner(81에서 8로), decoder-only Transformer, action token"
    page: 6
    bbox_norm: [0.1103, 0.0865, 0.7738, 0.6118]
    strategy: caption-region
    curated: true
  - id: tab02
    label: Table 2
    kind: table
    file: assets/brohan-2022-rt-1-robotics-transformer-for-real-world/tab02.png
    raw: raw/papers/brohan-2022-rt-1-robotics-transformer-for-real-world-figures/tab02.png
    caption: "전체 성능 비교. seen/unseen/distractor/background 성공률 표와 막대그래프 (Table 2)"
    page: 10
    bbox_norm: [0.1503, 0.0401, 0.8497, 0.2497]
    strategy: column-band
    curated: true
---

## 요약

RT-1은 이미지 히스토리와 지시문을 토큰으로 바꿔 로봇 action 토큰을 출력하는 35M 파라미터 Transformer policy다. Everyday Robots의 로봇 13대가 17개월간 모은 약 13만 개(130k)의 시연 데이터(demonstration)로 behavioral cloning 학습해, 700개 넘는 지시문을 seen 과제에서 97% 성공률로 수행하고 학습에서 본 skill과 물체의 새 조합인 unseen 지시문에도 76%로 일반화한다.

이 논문의 성격은 검증 실험이다. vision과 NLP에서 확립된 "크고 다양한 데이터로 큰 모델을 학습하면 범용성이 생긴다"는 레시피를 실제 로봇 조작에서 처음으로 대규모로 실증했다. 따라서 RT-2, OpenVLA, GR00T로 이어지는 VLA 계보의 출발점으로 읽는 것이 적절하다.

![[assets/brohan-2022-rt-1-robotics-transformer-for-real-world/fig01.png]]
*Figure 1: RT-1 전체 개요. 이미지와 지시문을 받아 3Hz로 이산 arm/base 행동을 내고, 약 13만 개의 시연 데이터와 3,000회 실세계 평가로 일반화와 robustness를 보인다 (Brohan 2022, Figure 1).*

## 배경

로봇 분야에 범용 대형 모델이 없었던 이유는 데이터 수집 비용이다. 텍스트와 이미지는 인터넷에서 수집할 수 있지만, 로봇 데이터는 실제 로봇을 구동해 사람이 시연해야 나온다. 그 결과 로봇 학습은 오랫동안 작업 하나에 데이터 하나, 모델 하나를 짝짓는 방식에 머물렀다.

RT-1은 이 병목의 답을 모델 크기가 아니라 데이터에서 찾는다. 즉 규모와 다양성을 함께 갖춘 데이터셋을 수집하고, 그것을 감당할 수 있으면서도 실시간 제어가 가능한 아키텍처를 설계하는 것이 논문의 두 가지 과제다.

고용량 Transformer는 여러 작업을 언어 조건으로 배우기에 유리하지만 실시간 제어에는 무겁다. RT-1은 카메라 이미지, 지시문, 모터 명령을 모두 압축된 토큰으로 인코딩해 이 상충을 절충하고, 35M 파라미터로 3Hz(추론 예산 100ms 미만) 제어를 만족한다.

## 문제 설정

policy는 현재 observation을 받아 다음 action을 정하는 함수를 말한다. RT-1의 설정에서는 지시문(instruction)과 이미지 observation이 매 timestep 주어지고 policy가 action을 낸다.

학습은 성공한 시연 데이터만 모은 데이터셋에 대한 behavioral cloning이다. 즉 시연에서 나온 action의 negative log-likelihood를 최소화하는 지도학습이고, 강화학습은 쓰지 않는다. policy나 imitation learning 같은 기초 개념이 낯설다면 입문 해설 [[physical-ai/jo-2026-rt-1-vla-primer]]를 먼저 읽는 것을 권한다.

## 아키텍처

입력은 300×300 이미지 6장의 히스토리와 지시문 한 문장이다. 처리 흐름은 네 단계로 나뉜다.

| 단계 | 모듈 | 출력 |
|---|---|---|
| 이미지 인코딩 | ImageNet pre-training EfficientNet-B3 + FiLM | 이미지당 81개 vision-language token |
| 언어 인코딩 | Universal Sentence Encoder (USE) | FiLM의 조건으로 들어가는 문장 임베딩 |
| 압축 | TokenLearner | 이미지당 8개 token |
| 예측 | decoder-only Transformer (8층, 19M) | 11차원 action token |

![[assets/brohan-2022-rt-1-robotics-transformer-for-real-world/fig03.png]]
*Figure 3: RT-1 상세 아키텍처. 지시문은 USE 임베딩이 되어 FiLM으로 EfficientNet을 조건화하고, TokenLearner가 압축한 vision-language token을 decoder-only Transformer가 받아 이산 action token을 낸다 (Brohan 2022, Figure 3).*

### 언어의 early fusion

RT-1의 특징적인 선택은 언어를 이미지 파이프라인 초입에서 융합하는 early fusion이다. 언어를 마지막에 결합하는 대신, USE로 임베딩한 지시문을 EfficientNet 내부에 삽입한 FiLM layer의 조건으로 적용해 이미지 인코딩 단계부터 "이번 작업에서 무엇이 중요한가"를 반영한다.

pre-training된 가중치를 보호하는 장치도 있다. FiLM의 affine 변환을 만드는 dense layer 가중치를 0으로 초기화해 학습 초기에는 항등으로 동작하게 했다. 이 이미지 인코딩 단계가 16M 파라미터, MBConv와 FiLM 26층으로 이미지당 81개 token을 만든다.

### 압축과 action 예측

TokenLearner는 81개 token을 elementwise attention으로 소프트 선별해 이미지당 8개로 줄인다. 6장에서 나온 8개씩, 총 48개 token에 position encoding을 더해 Transformer에 입력한다.

action은 각 차원을 256개 bin으로 이산화한다. 구성은 arm 7차원(x, y, z, roll, pitch, yaw, gripper 개폐), base 3차원(x, y, yaw), 그리고 arm 제어, base 제어, 종료를 고르는 mode 1차원으로 총 11차원이다. 손실은 causal masking을 쓴 categorical cross-entropy다.

연속 회귀 대신 이산화를 택한 근거는 시연 데이터의 행동 분포가 multi-modal이라는 점이다. 같은 상황에서 시연자마다 다른 경로를 갈 수 있는데, Gaussian 연속 출력은 하나의 mode만 담는 반면 차원별 이산화는 복잡한 분포를 표현할 수 있다. 이 선택이 성능에 결정적이라는 사실은 뒤의 ablation에서 확인된다.

### 실시간 제어 설계

추론 속도는 두 장치로 확보한다. TokenLearner로 token 수를 줄여 2.4배, 겹치는 window의 token을 한 번만 계산해 재사용하는 방식으로 1.7배 가속한다. 또한 jitter를 줄이기 위해 상태 캡처 뒤 280ms 고정 대기 후 행동을 적용하는 운영 세부도 있다.

결과적으로 RT-1의 추론은 15ms다. 비슷한 파라미터 규모의 Gato(129ms)보다 한 자릿수 빠르고, ResNet 기반 BC-Z(5.3ms)보다는 느리다.

## 데이터와 평가 설계

데이터는 Everyday Robots의 mobile manipulator(7자유도 arm, two-finger gripper, mobile base) 13대로 17개월간 모은 약 13만 개의 시연 데이터다. 수집은 robot classroom에서, 평가는 실제 office kitchen 두 곳(Kitchen1, Kitchen2)에서 진행했다.

지시문은 동사 단위의 skill로 묶인다.

| skill | 지시문 수 |
|---|---|
| Move Near | 337 |
| Pick from Receptacle & Place on Counter | 162 |
| Pick | 130 |
| Place into Receptacle | 84 |
| Place Upright | 8 |
| Knock Over | 8 |
| Open/Close Drawer | 6 |
| realistic long 태스크 | 9 |
| 합계 | 744 |

베이스라인은 모두 RT-1과 같은 데이터로 학습해 아키텍처만 비교한다. Gato는 Transformer지만 이미지 토큰화에 언어 조건이 들어가지 않고(late fusion) pre-training된 텍스트 임베딩과 TokenLearner가 없으며 auto-regressive다(실제 로봇 구동을 위해 1.2B에서 37M로 축소). BC-Z는 ResNet 기반 feedforward로 히스토리를 쓰지 않고 연속 행동을 낸다. BC-Z XL은 그 파라미터를 RT-1급으로 키운 버전이다.

## 결과

### 전체 성능

![[assets/brohan-2022-rt-1-robotics-transformer-for-real-world/tab02.png]]
*Table 2: RT-1과 베이스라인의 seen/unseen/distractor/background 성공률(%). 모두 같은 데이터로 학습해 아키텍처만 비교한다 (Brohan 2022, Table 2).*

| Model | Seen | Unseen | Distractors | Backgrounds |
|---|---|---|---|---|
| Gato | 65 | 52 | 43 | 35 |
| BC-Z | 72 | 19 | 47 | 41 |
| BC-Z XL | 56 | 43 | 23 | 35 |
| RT-1 | 97 | 76 | 83 | 59 |

RT-1은 seen 과제에서 97%의 성공률을 기록해 BC-Z보다 25%p, Gato보다 32%p 높았다. unseen(76%) 항목에서도 두 번째로 높은 모델을 24%p 앞서고, distractor 83%(+36%p), background 59%(+18%p)로 모든 평가 항목에서 가장 높았다. unseen 평가는 학습에서 53개 지시문을 통째로 제외해 두고, 그 안의 물체와 skill 자체는 학습에 남긴 조합 일반화 시험이다.

### 실제 주방 시나리오

실제 Google kitchen에서 restocking, snack 준비, 분실물 찾기 시나리오를 세 수준으로 나눠 평가한다. L1은 새 countertop 배치와 조명, L2는 추가로 unseen distractor, L3는 급격히 새로운 과제 설정(싱크대 근처 같은 새 위치, 새 물체)까지 겹친 조건이다.

| Model | All | L1 | L2 | L3 |
|---|---|---|---|---|
| Gato | 30 | 63 | 25 | 0 |
| BC-Z | 45 | 38 | 50 | 50 |
| BC-Z XL | 55 | 63 | 75 | 38 |
| RT-1 | 70 | 88 | 75 | 50 |

RT-1이 전 수준에서 가장 강하다. 반면 Gato는 L1에서는 선전하지만 수준이 오를수록 하락해 L3에서 0%가 된다.

### 이질적 데이터 흡수

RT-1은 성격이 전혀 다른 데이터를 함께 학습해도 원래 성능을 잃지 않는다.

- 실세계에서 본 적 없는 물체의 simulation 데이터를 더하면, 실제 물체 성능은 92%에서 90%로 거의 유지되고 sim에서만 본 물체의 실제 성능은 23%에서 87%로 오른다(+64%p).
- RL로 수집돼 action 분포와 외형과 동역학이 전혀 다른 Kuka QT-Opt bin-picking 데이터 20만 9천 개 episode를 함께 학습하면, classroom 평가는 92%에서 90%로 유지되면서 bin-picking 평가가 22%에서 39%로 거의 2배가 된다. 반면 Kuka 데이터만으로 학습하면 EDR 로봇에서 0%다.

즉 morphology가 다른 로봇의 경험이 명시적 시연 데이터 없이도 전이된다.

### 긴 작업과 데이터 구성

SayCan planner의 저수준 policy로 결합하면 두 주방 모두 planning 87%에 execution은 Kitchen1 67%로 가장 높다. 학습 환경과 크게 다른 Kitchen2에서 Gato 0%, BC-Z 13%로 크게 하락하는 반면 RT-1은 67%를 유지하고, 최대 50단계 태스크까지 실행한다.

데이터 구성에 대한 결과는 이 논문에서 가장 자주 인용되는 발견이다. 데이터 양을 줄이면 성능이 완만하게 하락하지만, task 다양성을 줄이면 훨씬 급격히 하락한다. 예를 들어 task의 25%를 제외하면(데이터의 97%는 유지) 데이터를 49% 줄인 것과 맞먹는 일반화 손실이 난다. 따라서 다양성이 양보다 중요하다.

## 설계 ablation

| 변형 | Seen | Unseen | Distractors | (hard) | Backgrounds | 추론(ms) |
|---|---|---|---|---|---|---|
| RT-1 (full) | 97 | 76 | 83 | 64 | 59 | 15 |
| 모델 축소 (35M을 21M으로) | 89 | 62 | 77 | 50 | 53 | 13.5 |
| ImageNet pre-training 제거 | 84 | 43 | 60 | 36 | 41 | 15 |
| continuous action으로 교체 | 68 | 43 | 37 | 0 | 35 | 16 |
| auto-regressive action 추가 | 85 | 71 | 67 | 43 | 65 | 36 |
| observation history 제거 | 82 | 62 | 50 | 14 | 59 | 15 |
| Transformer 제거 | 86 | 62 | 67 | 29 | 59 | 26 |

이 표의 결과는 세 가지로 요약된다.

- continuous action 교체의 영향이 가장 크다. hard distractor(distractor 9개에 목표물 가림) 조건에서는 0%까지 하락한다. 따라서 이산화는 구현 세부가 아니라 핵심 설계다.
- ImageNet pre-training과 observation history가 일반화의 핵심 요소다. pre-training을 제거하면 unseen이 33%p 하락하고, history를 제거하면 hard distractor가 64%에서 14%로 하락한다.
- auto-regressive action은 성능 이득 없이 추론만 2배(15ms에서 36ms) 느리다. 따라서 최종 RT-1은 action을 auto-regressive로 생성하지 않는다.

## 부록의 주요 분석

본문 밖에도 두 가지 유용한 분석이 있다.

attention 분석(D.5)은 early fusion의 효과를 보여준다. FiLM으로 언어를 이미지 파이프라인 초입에서 융합한 결과, attention이 지시문과 관련된 물체와 그리퍼 상호작용에 집중하고 distractor와 background를 무시한다. 논문은 Gato의 late fusion이 distractor에 약한 이유로 이 차이를 든다.

model selection(C.3)은 실무 문제를 다룬다. 학습 중 수많은 체크포인트 중 무엇을 실제 로봇에 올릴지 고르기 위해 real-to-sim 전이를 쓴다. RetinaGAN으로 sim 이미지를 실사풍으로 변환해 실제 데이터로 학습한 policy를 sim에서 실행하면, sim 성공률 순위가 실세계 순위를 예측할 만큼 상관한다.

## 관련 연구 맥락

RT-1은 새로운 발명이 아니라 검증된 부품들의 조합이다. 각 구성 요소의 출처를 알면 이후 VLA 논문을 읽을 때 계보가 보인다.

| 구성 요소 | 출처 |
|---|---|
| Transformer | Vaswani 2017 |
| EfficientNet | Tan & Le 2019 |
| FiLM | Perez 2018 |
| TokenLearner | Ryoo 2021 |
| Universal Sentence Encoder | Cer 2018 |

비교 대상이 된 Transformer policy 계보로는 Gato(Reed 2022), Behavior Transformer(Shafiullah 2022), Decision Transformer(Chen 2021)가 있다. 언어 조건 imitation learning 쪽에서는 BC-Z(Jang 2021), SayCan(Ahn 2022), CLIPort와 PerceiverActor(Shridhar)가 선행 연구다. multi-task 로봇 학습과 데이터셋으로는 QT-Opt/MT-Opt, BridgeData, RoboNet 계열이 있으며, RT-1의 데이터 규모는 이들을 크게 넘어선다.

## 한계

- imitation learning이라 시연자의 수준을 넘어서기 어렵다.
- 일반화는 이미 본 개념들의 새 조합까지다. 완전히 새로운 motion은 만들지 못한다.
- 조작 task 집합은 크지만 정교하지는 않다(dexterity 부족).
- 저자들이 드는 후속 과제는 비전문가의 directed data collection, 환경 다양성 확대를 통한 background robustness 개선, scalable attention과 memory다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| FiLM | 조건 입력으로 중간 feature에 채널별 affine 변환을 가하는 conditioning 기법. 여기서는 언어 임베딩으로 이미지 인코더를 조건화한다 |
| TokenLearner | 많은 token을 elementwise attention으로 소수 token(81개를 8개로)으로 압축하는 모듈 |
| action tokenization | 각 행동 차원을 256 bin으로 이산화해 분류 문제로 바꾸는 것. Gaussian 연속 출력과 달리 multi-modal 분포를 표현한다 |
| early fusion / late fusion | 언어와 비전을 파이프라인 초입에서 합치는 방식(RT-1의 FiLM)과 나중에 합치는 방식(Gato). early fusion이 관련 feature 집중에 유리하다 |
| SayCan | LLM으로 고수준 지시문을 저수준 skill 시퀀스로 분해하고 value function으로 실행 가능성을 평가하는 planner. RT-1이 그 저수준 policy가 된다 |
| real-to-sim | 실제 데이터로 학습한 policy를 시뮬레이션에서 실행해 모델을 고르는 평가 기법. RetinaGAN으로 시각 격차를 줄인다 |

## 관련 페이지

- [[physical-ai/jo-2026-rt-1-vla-primer]]: 이 논문의 한국어 입문 해설. 기초 개념이 낯설면 입문 해설을 먼저 읽는다.
- [[physical-ai/brohan-2023-rt-2-vision-language-action-models-transfer-web]]: 직계 후속작. RT-1의 action tokenization을 웹 스케일 VLM과 결합해 co-fine-tuning한다.
- [[physical-ai/open-x-embodiment-2023-robotic-learning-datasets-and-rt-x]]: RT-1의 이질적 데이터 흡수 발견을 22개 로봇, 21개 기관 규모로 확장한 RT-X 프로젝트.
- [[physical-ai/wu-2023-unleashing-large-scale-video-generative]]: GR-1이 CALVIN과 실제 기기 양쪽에서 RT-1을 비교 대상으로 삼는다. 같은 imitation learning 계열이지만 사람 영상 pre-training이 앞에 붙는 갈림길.
- [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation]]: 같은 계보의 후속 VLA foundation model. discrete action token 대신 flow-matching DiT로 연속 행동을 낸다.
- [[physical-ai/hou-2026-world-model-for-robot-learning]]: 로봇 학습 policy 결합 방식 5분류 서베이. RT-1 같은 single-backbone policy가 그 한 유형이다.
- [[overviews/physical-ai-overview]]: physical-ai 카테고리의 분류 뼈대와 학습 경로 허브.
