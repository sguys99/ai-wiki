---
title: "RT-1: Robotics Transformer for Real-World Control at Scale"
type: paper
year: 2022
category: physical-ai
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
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/brohan-2022-rt-1-robotics-transformer-for-real-world/fig02.png
    raw: raw/papers/brohan-2022-rt-1-robotics-transformer-for-real-world-figures/fig02.png
    caption: "실험 환경. robot classroom, Kitchen1과 Kitchen2, Everyday Robots 모바일 매니퓰레이터, 오브젝트 세트"
    page: 5
    bbox_norm: [0.2314, 0.0958, 0.7686, 0.3187]
    strategy: caption-region
    curated: false
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
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/brohan-2022-rt-1-robotics-transformer-for-real-world/fig04.png
    raw: raw/papers/brohan-2022-rt-1-robotics-transformer-for-real-world-figures/fig04.png
    caption: "평가 시나리오. distractor(easy/medium/hard), background, realistic(L1/L2/L3)"
    page: 9
    bbox_norm: [0.2637, 0.3465, 0.7363, 0.6287]
    strategy: caption-region
    curated: false
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/brohan-2022-rt-1-robotics-transformer-for-real-world/fig05.png
    raw: raw/papers/brohan-2022-rt-1-robotics-transformer-for-real-world-figures/fig05.png
    caption: "RT-1 실행 trajectory 예시. 서랍 열기, 물체 이동, 세우기 등"
    page: 11
    bbox_norm: [0.2314, 0.0958, 0.7692, 0.5739]
    strategy: caption-region
    curated: false
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/brohan-2022-rt-1-robotics-transformer-for-real-world/fig06.png
    raw: raw/papers/brohan-2022-rt-1-robotics-transformer-for-real-world-figures/fig06.png
    caption: "두 로봇 플랫폼(EDR + Kuka) 혼합 학습과 morphology 간 전이 (paper Figure 6 + Table 5)"
    page: 13
    bbox_norm: [0.2314, 0.0958, 0.7686, 0.2738]
    strategy: caption-region
    curated: false
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/brohan-2022-rt-1-robotics-transformer-for-real-world/fig07.png
    raw: raw/papers/brohan-2022-rt-1-robotics-transformer-for-real-world-figures/fig07.png
    caption: "RT-1 모델 카드"
    page: 21
    bbox_norm: [0.1667, 0.096, 0.8333, 0.9276]
    strategy: caption-region
    curated: false
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/brohan-2022-rt-1-robotics-transformer-for-real-world/fig08.png
    raw: raw/papers/brohan-2022-rt-1-robotics-transformer-for-real-world-figures/fig08.png
    caption: "카메라 이미지 예시. 원본 시뮬레이션, RetinaGAN을 적용한 시뮬레이션, 실세계 순으로 보여준다"
    page: 22
    bbox_norm: [0.2152, 0.6063, 0.7848, 0.8605]
    strategy: caption-region
    curated: false
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/brohan-2022-rt-1-robotics-transformer-for-real-world/fig09.png
    raw: raw/papers/brohan-2022-rt-1-robotics-transformer-for-real-world-figures/fig09.png
    caption: "시간에 따른 데이터량, 태스크 수, seen 성능의 성장 곡선"
    page: 23
    bbox_norm: [0.2314, 0.2131, 0.7686, 0.4029]
    strategy: caption-region
    curated: false
  - id: fig10
    label: Figure 10
    kind: figure
    file: assets/brohan-2022-rt-1-robotics-transformer-for-real-world/fig10.png
    raw: raw/papers/brohan-2022-rt-1-robotics-transformer-for-real-world-figures/fig10.png
    caption: "Backgrounds 평가. 조리대 질감과 배경을 바꿔 RT-1의 성능을 시험하며, 학습에 없던 주방도 포함한다. 시각적 차이가 뚜렷하고 가장 어려운 경우에는 주방 자체가 새 곳으로 바뀐다"
    page: 24
    bbox_norm: [0.1667, 0.2863, 0.8339, 0.4873]
    strategy: caption-region
    curated: false
  - id: fig11
    label: Figure 11
    kind: figure
    file: assets/brohan-2022-rt-1-robotics-transformer-for-real-world/fig11.png
    raw: raw/papers/brohan-2022-rt-1-robotics-transformer-for-real-world-figures/fig11.png
    caption: "Realistic instructions 평가. 난이도가 점차 올라가는 분포 변화를 여러 겹으로 제시한다. L1은 조명 조건이 다른 새 사무실 주방을 도입하고, L2는 여기에 미학습 distractor 물체를 더한다"
    page: 24
    bbox_norm: [0.1667, 0.5767, 0.8339, 0.7842]
    strategy: caption-region
    curated: false
  - id: fig12
    label: Figure 12
    kind: figure
    file: assets/brohan-2022-rt-1-robotics-transformer-for-real-world/fig12.png
    raw: raw/papers/brohan-2022-rt-1-robotics-transformer-for-real-world-figures/fig12.png
    caption: "Distractors 평가. distractor 물체가 2~4개인 학습 데이터 분포를 크게 벗어나도록 초기 장면 구성을 다양화한다. 가장 어려운 경우 장면이 매우 혼잡하고 가림이 생긴다"
    page: 26
    bbox_norm: [0.1667, 0.0958, 0.8338, 0.4129]
    strategy: caption-region
    curated: false
  - id: fig13
    label: Figure 13
    kind: figure
    file: assets/brohan-2022-rt-1-robotics-transformer-for-real-world/fig13.png
    raw: raw/papers/brohan-2022-rt-1-robotics-transformer-for-real-world-figures/fig13.png
    caption: "RT-1 attention map. layer와 head별로 그리퍼와 오브젝트의 상호작용에 집중한다"
    page: 31
    bbox_norm: [0.1667, 0.2975, 0.8395, 0.7034]
    strategy: caption-region
    curated: false
  - id: tab01
    label: Table 1
    kind: table
    file: assets/brohan-2022-rt-1-robotics-transformer-for-real-world/tab01.png
    raw: raw/papers/brohan-2022-rt-1-robotics-transformer-for-real-world-figures/tab01.png
    caption: "RT-1이 수집한 skill 목록과 각 설명, 지시문 예시"
    page: 7
    bbox_norm: [0.1667, 0.0419, 0.8333, 0.4772]
    strategy: table-region
    curated: false
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
  - id: tab03
    label: Table 3
    kind: table
    file: assets/brohan-2022-rt-1-robotics-transformer-for-real-world/tab03.png
    raw: raw/papers/brohan-2022-rt-1-robotics-transformer-for-real-world-figures/tab03.png
    caption: "현실적 일반화 시나리오. Google 주방 환경에서 세 단계 일반화에 대한 모델 성공률을 비교한다. L1은 새 조리대 배치와 조명 조건에 대한 일반화, L2는 여기에 미학습 distractor 물체까지 더한 경우다"
    page: 11
    bbox_norm: [0.1503, 0.0401, 0.8497, 0.7867]
    strategy: column-band
    curated: false
  - id: tab04
    label: Table 4
    kind: table
    file: assets/brohan-2022-rt-1-robotics-transformer-for-real-world/tab04.png
    raw: raw/papers/brohan-2022-rt-1-robotics-transformer-for-real-world-figures/tab04.png
    caption: "시뮬레이션 데이터를 결합한 실험 결과. 시뮬레이션 데이터를 더해도 실제 물체 성능은 영향을 받지 않고, 시뮬레이션에만 등장한 물체의 실세계 성능은 크게 오른다(+64%)"
    page: 12
    bbox_norm: [0.5922, 0.1091, 0.8282, 0.2675]
    strategy: table-region
    curated: false
  - id: tab05
    label: Table 5
    kind: table
    file: assets/brohan-2022-rt-1-robotics-transformer-for-real-world/tab05.png
    raw: raw/papers/brohan-2022-rt-1-robotics-transformer-for-real-world-figures/tab05.png
    caption: "서로 다른 두 로봇의 데이터를 섞은 실험 결과. QT-Opt(Kalashnikov et al., 2018)의 Kuka bin-picking 데이터를 RT-1에 결합해도 표준 classroom 평가 성능은 거의 영향받지 않고, Bin-picking 일반화는 약 2배 개선된다"
    page: 13
    bbox_norm: [0.5549, 0.2762, 0.8309, 0.4791]
    strategy: table-region
    curated: false
  - id: tab06
    label: Table 6
    kind: table
    file: assets/brohan-2022-rt-1-robotics-transformer-for-real-world/tab06.png
    raw: raw/papers/brohan-2022-rt-1-robotics-transformer-for-real-world-figures/tab06.png
    caption: "Kitchen1과 Kitchen2에서의 SayCan 방식 long-horizon 과제. (*원래 SayCan 평가는 프롬프트가 조금 달라 planning 성공률이 더 낮다)"
    page: 14
    bbox_norm: [0.2781, 0.1422, 0.7219, 0.2368]
    strategy: table-region
    curated: false
  - id: tab07
    label: Table 7
    kind: table
    file: assets/brohan-2022-rt-1-robotics-transformer-for-real-world/tab07.png
    raw: raw/papers/brohan-2022-rt-1-robotics-transformer-for-real-world-figures/tab07.png
    caption: "RT-1의 데이터 ablation. seen 과제, 미학습 과제 일반화, distractor와 background에 대한 견고성을 비교한다. 데이터 다양성이 데이터 양보다 성능과 일반화에 더 큰 영향을 준다"
    page: 14
    bbox_norm: [0.1667, 0.8629, 0.8333, 0.9699]
    strategy: table-region
    curated: false
  - id: tab08
    label: Table 8
    kind: table
    file: assets/brohan-2022-rt-1-robotics-transformer-for-real-world/tab08.png
    raw: raw/papers/brohan-2022-rt-1-robotics-transformer-for-real-world-figures/tab08.png
    caption: "6.2절의 미학습 지시문 목록. Unseen Tasks 평가를 위해 학습에서 53개 과제를 제외했다. 이 지시문 자체는 학습셋에 없지만 지시문에 담긴 물체와 skill은 학습셋에 있었다"
    page: 25
    bbox_norm: [0.221, 0.1345, 0.779, 0.83]
    strategy: table-region
    curated: false
  - id: tab09
    label: Table 9
    kind: table
    file: assets/brohan-2022-rt-1-robotics-transformer-for-real-world/tab09.png
    raw: raw/papers/brohan-2022-rt-1-robotics-transformer-for-real-world-figures/tab09.png
    caption: "시뮬레이션 데이터를 결합한 실험 결과. 시뮬레이션 데이터를 더해도 실제 물체 성능은 영향을 받지 않고, 시뮬레이션에만 등장한 물체의 실세계 성능은 크게 오른다"
    page: 27
    bbox_norm: [0.5922, 0.1091, 0.8282, 0.2675]
    strategy: table-region
    curated: false
  - id: tab10
    label: Table 10
    kind: table
    file: assets/brohan-2022-rt-1-robotics-transformer-for-real-world/tab10.png
    raw: raw/papers/brohan-2022-rt-1-robotics-transformer-for-real-world-figures/tab10.png
    caption: "서로 다른 두 로봇의 데이터를 섞은 실험 결과. QT-Opt(Kalashnikov et al., 2018)의 Kuka bin-picking 데이터를 RT-1에 결합해도 표준 classroom 평가 성능은 거의 영향받지 않고, Bin-picking 평가 일반화는 약 2배 개선된다"
    page: 28
    bbox_norm: [0.5549, 0.0582, 0.8309, 0.2611]
    strategy: table-region
    curated: false
  - id: tab11
    label: Table 11
    kind: table
    file: assets/brohan-2022-rt-1-robotics-transformer-for-real-world/tab11.png
    raw: raw/papers/brohan-2022-rt-1-robotics-transformer-for-real-world-figures/tab11.png
    caption: "Kitchen1과 Kitchen2에서의 SayCan 방식 long-horizon 과제. (*원래 SayCan 평가는 프롬프트가 조금 달라 planning 성공률이 더 낮다)"
    page: 29
    bbox_norm: [0.2781, 0.1438, 0.7219, 0.2384]
    strategy: table-region
    curated: false
  - id: tab12
    label: Table 12
    kind: table
    file: assets/brohan-2022-rt-1-robotics-transformer-for-real-world/tab12.png
    raw: raw/papers/brohan-2022-rt-1-robotics-transformer-for-real-world-figures/tab12.png
    caption: "6.4절에서 평가한 SayCan 지시문 목록"
    page: 30
    bbox_norm: [0.221, 0.096, 0.779, 0.326]
    strategy: table-region
    curated: false
  - id: tab13
    label: Table 13
    kind: table
    file: assets/brohan-2022-rt-1-robotics-transformer-for-real-world/tab13.png
    raw: raw/papers/brohan-2022-rt-1-robotics-transformer-for-real-world-figures/tab13.png
    caption: "RT-1의 모델 ablation. seen 과제, 미학습 과제 일반화, distractor와 background에 대한 견고성을 비교한다"
    page: 30
    bbox_norm: [0.1503, 0.0401, 0.8497, 0.7749]
    strategy: column-band
    curated: false
---

## 한 줄 요약 (One-line Summary)

이미지 히스토리와 자연어 지시를 토큰으로 바꿔 로봇 action 토큰을 뽑는 35M짜리 Transformer policy다. 13대 로봇이 17개월간 모은 약 13만 개(130k) 시연 데이터로 imitation learning 학습해 700개 넘는 지시를 97% 성공률로 수행하고 새 태스크, 오브젝트, 환경에 zero-shot으로 일반화한 로봇 조작 foundation model이다.

## 1. 자료 정보 (Document Information)

- **제목**: RT-1: Robotics Transformer for Real-World Control at Scale
- **저자**: Anthony Brohan 외 40여 명 (저자 알파벳순 표기). 소속은 Robotics at Google, Everyday Robots, Google Research Brain Team.
- **출처**: arXiv:2212.06817 (v1 2022-12, v2 2023-08). 프로젝트 페이지 robotics-transformer1.github.io, 코드 github.com/google-research/robotics_transformer.
- **한 줄 성격**: vision과 NLP에서 검증된 "크고 다양한 task-agnostic 데이터로 대형 모델을 pre-training → downstream에 전이"라는 레시피를 로봇 조작에 옮긴 대규모 실증. pre-training은 대규모 일반 데이터로 모델의 기반 능력을 먼저 학습하는 단계를 말한다. 뒤에 나오는 RT-2, OpenVLA, GR00T 계보의 출발점이다.

## 2. 주요 기여 (Key Contributions)

- **RT-1 모델**: 카메라 이미지, 언어 지시, 모터 명령을 모두 compact token으로 인코딩해 Transformer가 실시간(3 Hz)으로 다룰 수 있게 한 아키텍처. 고용량 모델과 실시간 추론이라는 상충 요구를 tokenization으로 절충했다.
- **대규모 실세계 데이터와 평가**: 13대 로봇으로 17개월간 모은 약 13만 개(130k) 시연 데이터, 744개 태스크(700개 넘는 언어 지시), 3000회 넘는 실세계 시행. 당시 로봇 학습 평가 중 최대 규모급이다.
- **강한 일반화와 robustness 실증**: seen 97%, unseen 76%, distractor 83%, background 59%로 Gato와 BC-Z 대비 각각 최대 25%, 24%, 36%, 18%p 앞선다.
- **이질적 데이터 흡수**: 시뮬레이션 데이터와 다른 로봇(Kuka)의 데이터를 섞어도 원래 태스크 성능을 잃지 않으면서 새 시나리오 일반화가 오른다. 즉 morphology가 다른 로봇의 경험까지 "빨아들여" 쓴다.
- **데이터 다양성 > 데이터 양**: 태스크 다양성을 줄이는 편이 데이터 양을 줄이는 것보다 일반화를 훨씬 크게 해친다는 ablation. 태스크 25%를 빼면(데이터의 97%는 유지) 데이터를 49% 줄인 것과 맞먹는 일반화 하락이 온다.
- **SayCan 연동 long-horizon**: RT-1을 SayCan planner의 저수준 policy로 써서 최대 50단계짜리 초장기 태스크를 실행한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

**문제 설정.** policy는 현재 observation을 받아 다음 action을 정하는 함수이고, observation은 매 timestep에 policy가 받는 센서 입력이다. 여기서는 언어 지시 $i$와 이미지 observation $x_t$가 주어지는 순차적 의사결정 환경에서 policy $\pi$가 action $a_t$를 낸다. 학습은 성공한 시연만 모은 데이터셋 $D$에 대한 behavioral cloning(action의 negative log-likelihood 최소화)이다. imitation learning은 시연 데이터를 흉내 내 policy를 학습하는 방법인데, RT-1은 그중에서도 순수 imitation learning만 쓴다.

**입력.** 300×300 이미지 6장(히스토리)과 자연어 지시 한 문장.

**image + instruction tokenization.** 6장을 ImageNet으로 pre-training한 EfficientNet-B3에 통과시켜 9×9×512 feature map을 얻고 81개 visual token으로 편다. 언어는 Universal Sentence Encoder(USE)로 임베딩한 뒤, EfficientNet 내부에 끼운 FiLM layer의 조건으로 넣어 이미지 인코더를 언어에 conditioning한다. pre-training 가중치를 망치지 않도록 FiLM의 affine 변환을 만드는 dense layer 가중치를 0으로 초기화해 초기에는 항등(identity)으로 작동하게 했다(identity-initialized FiLM). 이 단계가 16M 파라미터, MBConv와 FiLM 26층으로 81개 vision-language token을 낸다.

**TokenLearner.** attention은 토큰들이 서로를 얼마나 참조할지 가중치를 계산하는 메커니즘이다. TokenLearner는 81개 token을 elementwise attention으로 소프트 선별해 이미지당 8개 token으로 압축한다. 추론 속도를 위한 핵심 장치다.

**Transformer.** 이미지당 8개 × 6장 = 48개 token(+ position encoding)을 decoder-only Transformer(self-attention 8층, 19M 파라미터)에 넣어 action token을 출력한다.

**action tokenization.** 각 행동 차원을 256개 bin으로 이산화한다. 행동은 arm 7차원(x, y, z, roll, pitch, yaw, gripper 개폐), base 3차원(x, y, yaw), 그리고 arm/base/종료를 고르는 mode 1차원으로 총 11차원이다. 손실은 causal masking을 쓴 categorical cross-entropy.

**실시간 추론.** 전체 35M 파라미터로 3 Hz(추론 예산 100ms 미만) 제어를 맞춘다. TokenLearner로 token 수를 줄여 2.4배, 겹치는 window의 token을 한 번만 계산해 재사용하는 방식으로 1.7배 가속한다. jitter를 줄이려 상태 캡처 뒤 280ms 고정 대기 후 행동을 적용한다.

**데이터.** Everyday Robots의 모바일 매니퓰레이터(7-DoF 팔, 2지 그리퍼, 이동 베이스)로 수집. 환경은 데이터 수집용 robot classroom과 평가용 실제 오피스 주방 두 곳(Kitchen1, Kitchen2). 지시는 동사(skill)로 묶는다. Pick(130), Move Near(337), Place Upright(8), Knock Over(8), Open/Close Drawer(6), Place into Receptacle(84), Pick from Receptacle & Place on Counter(162), 그리고 realistic long 태스크(9)로 총 744개.

**베이스라인.** 둘 다 RT-1과 같은 데이터로 학습해 아키텍처만 비교한다. Gato는 Transformer지만 언어 없이 patch별로 이미지 token을 만들고 pre-training된 텍스트 임베딩과 TokenLearner가 없으며 auto-regressive다(실제 로봇 구동을 위해 1.2B에서 37M로 축소). BC-Z는 ResNet 기반 feedforward로 히스토리를 안 쓰고 연속 행동을 낸다(BC-Z XL은 파라미터를 RT-1급으로 키운 버전).

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

**전체 성능 (Table 2, 성공률 %).**

| Model | Seen | Unseen | Distractors | Backgrounds |
|---|---|---|---|---|
| Gato | 65 | 52 | 43 | 35 |
| BC-Z | 72 | 19 | 47 | 41 |
| BC-Z XL | 56 | 43 | 23 | 35 |
| **RT-1 (ours)** | **97** | **76** | **83** | **59** |

seen 97%(BC-Z보다 25%, Gato보다 32% 높음), unseen 76%(두 번째로 높은 모델 대비 +24%p), distractor 83%(+36%p), background 59%(+18%p). 네 항목 모두에서 앞선다.

**realistic kitchen 일반화 (Table 3, 성공률 %).** 실제 Google kitchen에서 restocking, snack 준비, 분실물 찾기 시나리오를 세 수준으로 나눠 평가한다. L1은 새 countertop 배치와 조명, L2는 추가로 unseen distractor, L3는 급격히 새로운 과제 설정(싱크대 근처 같은 새 위치, 새 오브젝트)까지 겹친 조건이다. (2026-09 40,000자 재추출로 보강)

| Model | All | L1 | L2 | L3 |
|---|---|---|---|---|
| Gato | 30 | 63 | 25 | 0 |
| BC-Z | 45 | 38 | 50 | 50 |
| BC-Z XL | 55 | 63 | 75 | 38 |
| **RT-1 (ours)** | **70** | **88** | **75** | **50** |

RT-1이 전 수준에서 가장 강하다. Gato는 L1은 견디지만 수준이 오를수록 급락해 L3에서 0이 되고, BC-Z 계열은 L2까지는 선전하지만 전체적으로 RT-1에 못 미친다.

**시뮬레이션 데이터 흡수 (Table 4).** 실제 데이터에 "실세계에서 본 적 없는" 오브젝트의 sim 데이터를 더한다. 실제 물체 성능은 92%에서 90%로(-2%p) 거의 유지되고 sim에서만 본 오브젝트의 seen-skill은 23%에서 87%로(+64%p), unseen-skill은 7%에서 33%로(+26%p) 오른다. 도메인 전이가 크게 일어난다.

**다른 로봇 데이터 흡수 (Table 5).** RL로 수집돼 action 분포, 외형, 동역학이 전혀 다른 Kuka QT-Opt bin-picking 데이터(20만 9천 개 episode)를 EDR 데이터와 섞는다. Classroom eval은 92%에서 90%로(-2%p) 유지되고 Bin-picking eval은 22%에서 39%로(+17%p, 거의 2배) 오른다. Kuka 데이터만으로 학습하면 EDR에서 0%지만, 섞으면 EDR에 명시적 bin-picking 시연 데이터 없이도 전이가 일어난다.

**long-horizon (SayCan, Table 6).** 두 주방에서 SayCan planner로 실행. planning은 모두 87%, RT-1의 execution이 Kitchen1 67%로 최고. 더 어려운 Kitchen2에서 Gato 0%, BC-Z 13%인 반면 RT-1은 67%로 성능 저하가 눈에 띄지 않는다. 최대 50단계 태스크 실행.

**데이터 양 vs 다양성 (Table 7).** 데이터를 줄이면 성능과 일반화가 완만히 떨어지지만 태스크를 줄여 데이터를 좁히면 일반화가 훨씬 급격히 떨어진다. 태스크 25%를 제거(데이터 97% 유지)한 것이 데이터를 49% 줄인 것과 맞먹는 일반화 손실을 낸다 → **다양성이 양보다 중요**.

**ablation (Table 13, 성공률 %와 추론 시간).** (2026-09 40,000자 재추출로 정확 수치 보강)

| 변형 | Seen | Unseen | Distractors | (hard) | Backgrounds | 추론(ms) |
|---|---|---|---|---|---|---|
| RT-1 (full) | 97 | 76 | 83 | 64 | 59 | 15 |
| w/o big model (35M을 21M으로) | 89 | 62 | 77 | 50 | 53 | 13.5 |
| w/o ImageNet pre-training | 84 | 43 | 60 | 36 | 41 | 15 |
| w/ continuous actions | 68 | 43 | 37 | 0 | 35 | 16 |
| w/ auto-regressive actions | 85 | 71 | 67 | 43 | 65 | 36 |
| w/o history | 82 | 62 | 50 | 14 | 59 | 15 |
| w/o Transformer | 86 | 62 | 67 | 29 | 59 | 26 |

연속(Gaussian) 행동으로 바꾸면 크게 하락한다. per-dimension 이산화가 multi-modal 분포를 표현하는 반면 Gaussian은 단일 mode만 담기 때문이다. ImageNet pre-training 제거 시 unseen이 33%p 하락한다. 히스토리는 distractor 일반화에 특히 기여하고(hard distractor 64에서 14로), Transformer 제거는 전반적으로 작은 하락이다. auto-regressive 행동은 이득 없이 추론이 2배 느려져 최종 RT-1은 쓰지 않는다. 추론 시간은 RT-1 15ms로 Gato(129ms)보다 한 자릿수 빠르고 ResNet 기반 BC-Z(5.3ms)보다는 느리다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **imitation learning의 한계**: 시연자를 넘어서기 어렵다.
- **일반화 범위**: 이미 본 개념들의 새로운 조합까지만 일반화하고 아예 새로운 motion은 만들지 못한다.
- **dexterity**: 크지만 정교하지는 않은 조작 태스크 집합이다.
- **향후**: 비전문가가 directed data collection과 model prompting으로 스킬을 빠르게 늘리는 방법, 환경 다양성 확대로 background robustness 개선, scalable attention과 memory로 반응 속도와 문맥 유지 개선.

부록의 **model selection at scale(C.3)**: 학습 중 여러 태스크에서 모델을 고르기 위해 real-to-sim 전이를 쓴다. RetinaGAN으로 sim 이미지를 실사풍으로 바꿔 실제 데이터로 학습한 policy를 sim에서 실행하면 sim 성공률의 순위가 실세계 순위를 예측하는 데 쓸 만큼 상관한다(off-policy evaluation 대안).

부록의 **attention 분석(D.5)**: FiLM으로 언어를 이미지 파이프라인 초입에서 융합(early fusion)한 덕에 attention이 지시와 관련된 오브젝트와 그리퍼 상호작용에 집중하고 distractor와 background를 무시한다. Gato의 late fusion이 distractor에 약한 이유로 이 차이를 든다.

## 6. 관련 연구 (Related Work)

- **Transformer policy**: Gato(Reed 2022, generalist agent), Behavior Transformer(Shafiullah 2022), Decision Transformer(Chen 2021), 시뮬레이션 navigation, locomotion, manipulation에서의 sequence modeling.
- **언어 조건 imitation learning**: BC-Z(Jang 2021), SayCan(Ahn 2022), CLIPort와 PerceiverActor(Shridhar), Lynch & Sermanet 2020.
- **핵심 구성 요소의 출처**: Transformer(Vaswani 2017), EfficientNet(Tan & Le 2019), FiLM(Perez 2018), TokenLearner(Ryoo 2021), Universal Sentence Encoder(Cer 2018).
- **multi-task 로봇 학습과 데이터셋**: QT-Opt/MT-Opt(Kalashnikov), BridgeData, RoboNet, Meta-World, RLBench 등.

## 7. 용어집 (Glossary)

- **RT-1 (Robotics Transformer 1)**: 이미지+언어를 로봇 action 토큰으로 매핑하는 35M Transformer policy.
- **FiLM (Feature-wise Linear Modulation)**: 조건 입력으로 중간 feature에 채널별 affine 변환($\gamma, \beta$)을 가하는 conditioning 기법. 여기선 언어 임베딩으로 이미지 인코더를 조건화.
- **TokenLearner**: 많은 token을 elementwise attention으로 소수 token(81→8)으로 압축하는 모듈.
- **behavioral cloning**: 성공 시연의 (observation→action)을 지도학습으로 모방하는 imitation learning.
- **action tokenization / discretization**: 각 행동 차원을 256 bin으로 이산화해 분류 문제로 바꾸는 것. 연속 Gaussian과 달리 multi-modal 분포 표현이 쉽다.
- **early vs late fusion**: 언어와 비전을 파이프라인 초입에서 합치느냐(RT-1, FiLM) 나중에 합치느냐(Gato). early fusion이 관련 feature에 집중하기 좋다.
- **SayCan**: LLM으로 고수준 지시를 저수준 스킬 시퀀스로 쪼개고 affordance(value function)로 실행 가능성을 grounding하는 planner. RT-1이 그 저수준 policy가 된다.
- **morphology 전이**: 팔 구조와 action space가 다른 로봇(Kuka ↔ EDR) 간에 학습된 행동이 옮겨가는 것.
- **real-to-sim**: 실제 데이터로 학습한 policy를 시뮬레이션에서 실행해 모델을 고르는 평가 기법. 여기선 RetinaGAN으로 sim↔real 시각 격차를 메운다.

## 8. 그림 후보 (Figure Candidates)

page-region 방식(캡션이 잡힌 페이지를 200 DPI로 통째 렌더)이라 각 PNG는 해당 페이지 전체다. 아래는 실제 논문 그림/표에 대응하는 후보만 추린 것이다(전체 22개는 `figures.json` 참조).

| id | page | 대응 | caption | 추천 |
|---|---|---|---|---|
| fig01 | 2 | Figure 1 | RT-1 전체 개요(아키텍처+데이터+평가) | ★ wiki 권장 (overview) |
| fig05 | 6 | Figure 3 | 상세 아키텍처: USE→FiLM EfficientNet→TokenLearner→Transformer→action | ★★ wiki 권장 (architecture) |
| fig09 | 10 | Table 2 | 전체 성능 비교 표+막대그래프 | ★ wiki 권장 (result) |
| fig03 | 5 | Figure 2 | 환경, 로봇, 오브젝트 세트 | (선택) setup |
| fig08 | 9 | Figure 4 | distractor, background, realistic 평가 시나리오 | (선택) |
| fig12 | 11 | Figure 5 | 실행 trajectory 예시 | (선택) |
| fig13 | 13 | Figure 6 | 두 로봇 플랫폼 혼합 학습과 전이 | (선택) multi-robot |
| fig17 | 23 | Figure 9 | 데이터, 태스크, 성능 성장 곡선 | (선택) |
| fig22 | 31 | Figure 13 | attention 맵 시각화 | (선택) |
