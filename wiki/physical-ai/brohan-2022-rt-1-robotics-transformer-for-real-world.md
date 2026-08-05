---
title: "RT-1: Robotics Transformer for Real-World Control at Scale"
type: paper
year: 2022
category: physical-ai
source: brohan-2022-rt-1-robotics-transformer-for-real-world.md
raw_path: /home/sguys99/project/ai-wiki/raw/papers/brohan-2022-rt-1-robotics-transformer-for-real-world.pdf
raw_filename: "brohan-2022-rt-1-robotics-transformer-for-real-world.pdf"
source_collection: external
authors: "Anthony Brohan 외 40여 명 (저자 알파벳순, Robotics at Google · Everyday Robots · Google Research Brain Team)"
arxiv_id: "2212.06817"
url: "https://robotics-transformer1.github.io"
tags: [physical-ai, vla, imitation-learning, manipulation]
figures:
  - id: fig01
    file: assets/brohan-2022-rt-1-robotics-transformer-for-real-world/fig01.png
    raw: raw/papers/brohan-2022-rt-1-robotics-transformer-for-real-world-figures/fig01.png
    caption: "RT-1 전체 개요 — (a) 이미지+언어 지시 → 이산화된 arm/base 행동, (b) 130k 시연·3000 실세계 시행 (paper Figure 1)"
    page: 2
    strategy: page-region
    curated: true
  - id: fig03
    file: assets/brohan-2022-rt-1-robotics-transformer-for-real-world/fig03.png
    raw: raw/papers/brohan-2022-rt-1-robotics-transformer-for-real-world-figures/fig03.png
    caption: "실험 환경 — robot classroom, Kitchen1/2, Everyday Robots 모바일 매니퓰레이터, 오브젝트 세트 (paper Figure 2)"
    page: 5
    strategy: page-region
    curated: false
  - id: fig05
    file: assets/brohan-2022-rt-1-robotics-transformer-for-real-world/fig05.png
    raw: raw/papers/brohan-2022-rt-1-robotics-transformer-for-real-world-figures/fig05.png
    caption: "RT-1 상세 아키텍처 — USE embedding → FiLM EfficientNet-B3 → TokenLearner(81→8) → decoder-only Transformer → action token (paper Figure 3)"
    page: 6
    strategy: page-region
    curated: true
  - id: fig08
    file: assets/brohan-2022-rt-1-robotics-transformer-for-real-world/fig08.png
    raw: raw/papers/brohan-2022-rt-1-robotics-transformer-for-real-world-figures/fig08.png
    caption: "평가 시나리오 — distractor(easy/medium/hard)·background·realistic(L1/L2/L3) (paper Figure 4)"
    page: 9
    strategy: page-region
    curated: false
  - id: fig09
    file: assets/brohan-2022-rt-1-robotics-transformer-for-real-world/fig09.png
    raw: raw/papers/brohan-2022-rt-1-robotics-transformer-for-real-world-figures/fig09.png
    caption: "전체 성능 비교 — seen/unseen/distractor/background 성공률 표·막대그래프 (paper Table 2)"
    page: 10
    strategy: page-region
    curated: true
  - id: fig12
    file: assets/brohan-2022-rt-1-robotics-transformer-for-real-world/fig12.png
    raw: raw/papers/brohan-2022-rt-1-robotics-transformer-for-real-world-figures/fig12.png
    caption: "RT-1 실행 궤적 예시 — 서랍 열기·물체 이동·세우기 등 (paper Figure 5)"
    page: 11
    strategy: page-region
    curated: false
  - id: fig13
    file: assets/brohan-2022-rt-1-robotics-transformer-for-real-world/fig13.png
    raw: raw/papers/brohan-2022-rt-1-robotics-transformer-for-real-world-figures/fig13.png
    caption: "두 로봇 플랫폼(EDR + Kuka) 혼합 학습과 morphology 간 전이 (paper Figure 6 + Table 5)"
    page: 13
    strategy: page-region
    curated: false
  - id: fig17
    file: assets/brohan-2022-rt-1-robotics-transformer-for-real-world/fig17.png
    raw: raw/papers/brohan-2022-rt-1-robotics-transformer-for-real-world-figures/fig17.png
    caption: "시간에 따른 데이터량·태스크 수·seen 성능 성장 곡선 (paper Figure 9)"
    page: 23
    strategy: page-region
    curated: false
  - id: fig22
    file: assets/brohan-2022-rt-1-robotics-transformer-for-real-world/fig22.png
    raw: raw/papers/brohan-2022-rt-1-robotics-transformer-for-real-world-figures/fig22.png
    caption: "RT-1 어텐션 맵 — layer/head별로 그리퍼-오브젝트 상호작용에 집중 (paper Figure 13)"
    page: 31
    strategy: page-region
    curated: false
---

## 요약 (Summary)

RT-1은 이미지 히스토리와 자연어 지시를 토큰으로 바꿔 로봇 행동 토큰을 출력하는 35M Transformer 정책이다. Everyday Robots 모바일 매니퓰레이터 13대가 17개월간 모은 130k 시연으로 behavioral cloning(imitation learning) 학습한다. 700개 넘는 언어 지시를 seen 97%로 수행하고 학습에서 본 스킬·오브젝트의 새 조합인 unseen 지시에도 76%로 일반화한다. vision·NLP의 "크고 다양한 task-agnostic 데이터로 대형 모델을 사전학습해 downstream에 전이"라는 레시피를 로봇 조작에 옮긴 대규모 실증이다. RT-2·OpenVLA·GR00T로 이어지는 VLA 계보의 출발점이기도 하다.

![[assets/brohan-2022-rt-1-robotics-transformer-for-real-world/fig01.png]]
*Figure 1: RT-1 전체 개요 — 이미지+언어 지시를 받아 3 Hz로 이산 arm/base 행동을 내고, 130k 시연·3000회 실세계 시행으로 일반화·robustness를 보인다 (Brohan 2022, Figure 1).*

## 핵심 아이디어 (Key Idea)

로봇 조작에서 고용량 Transformer는 여러 태스크를 언어 조건으로 배우기에 유리하지만 실시간 제어에는 너무 무겁다. RT-1은 카메라 이미지·언어 지시·모터 명령을 모두 compact token으로 인코딩해 이 상충을 tokenization으로 절충한다. 35M 파라미터로 3 Hz(추론 예산 100ms 미만) 제어를 맞춘다.

또 하나의 축은 데이터다. 로봇 학습의 병목은 모델 크기보다 데이터에 있다고 보고 스케일과 다양성을 함께 갖춘 데이터셋을 모은다. ablation에서 태스크 다양성을 줄이는 편이 데이터 양을 줄이는 것보다 일반화를 훨씬 크게 해쳤다. 태스크의 25%를 빼면(데이터의 97%는 유지) 데이터를 49% 줄인 것과 맞먹을 만큼 일반화가 떨어진다 — 다양성이 양보다 중요하다는 결론이다.

## 방법론 및 아키텍처 (Methodology and Architecture)

입력은 300×300 이미지 6장(히스토리)과 자연어 지시 한 문장이다. 이미지는 ImageNet 사전학습 EfficientNet-B3을 지나 81개 visual token이 된다. 언어는 Universal Sentence Encoder(USE)로 임베딩한 뒤 EfficientNet 내부에 끼운 FiLM layer의 조건으로 들어가 이미지 인코더를 지시에 맞춰 conditioning한다(early fusion). 사전학습 가중치를 망치지 않도록 FiLM의 affine 변환 가중치를 0으로 초기화해 초기엔 항등으로 작동하게 했다(identity-initialized FiLM).

이어서 TokenLearner가 81개 token을 elementwise attention으로 소프트 선별해 이미지당 8개로 압축한다. 8개 × 6장 = 48개 token(+ position encoding)이 decoder-only Transformer(self-attention 8층, 19M 파라미터)에 들어가 action token을 낸다. 행동은 각 차원을 256 bin으로 이산화하며 arm 7차원·base 3차원·mode 1차원으로 총 11차원이다. 손실은 causal masking을 쓴 categorical cross-entropy. 연속(Gaussian) 대신 이산화를 택한 이유는 시연 데이터의 multi-modal 행동 분포를 표현하기 위해서다.

실시간성은 두 기법으로 확보한다. TokenLearner로 token 수를 줄여 2.4배, 겹치는 window의 token을 한 번만 계산해 재사용하는 방식으로 1.7배 가속한다.

![[assets/brohan-2022-rt-1-robotics-transformer-for-real-world/fig05.png]]
*Figure 3: RT-1 상세 아키텍처 — 지시는 USE 임베딩이 되어 FiLM으로 EfficientNet을 조건화하고, 그 vision-language token을 TokenLearner가 줄여 decoder-only Transformer에 넣으면 이산 action token이 나온다 (Brohan 2022, Figure 3).*

## 결과 (Results)

전체 성능은 같은 데이터로 학습한 Gato·BC-Z와 아키텍처만 비교한 것이다. RT-1은 seen 97%(BC-Z보다 25%, Gato보다 32% 높음), unseen 76%(차선 대비 +24%), distractor 83%(+36%), background 59%(+18%)로 네 축 모두 앞선다.

![[assets/brohan-2022-rt-1-robotics-transformer-for-real-world/fig09.png]]
*Table 2: RT-1과 베이스라인의 seen/unseen/distractor/background 성공률(%). 모두 RT-1 데이터로 학습해 아키텍처만 비교한다 (Brohan 2022, Table 2).*

이질적 데이터를 흡수하는 성질도 보인다. 실세계에서 본 적 없는 오브젝트의 시뮬레이션 데이터를 더하면 실오브젝트 성능은 92→90(-2%)으로 유지되고 sim에서만 본 오브젝트의 성능은 23→87(+64%)로 오른다. action 분포·외형이 전혀 다른 Kuka 로봇의 bin-picking 데이터(209k episode)를 섞으면 원래 태스크는 92→90(-2%)로 유지되면서 bin-picking은 22→39(+17%)로 거의 2배가 된다. Kuka 데이터만으로는 EDR에서 0%지만 섞으면 명시적 시연 없이 morphology 간 전이가 일어난다.

long-horizon에서는 RT-1을 SayCan planner의 저수준 정책으로 쓴다. 두 주방 모두 planning은 87%이고 RT-1의 execution은 Kitchen1 67%로 최고다. 학습 환경과 크게 다른 Kitchen2에서 Gato 0%·BC-Z 13%로 무너지는 반면 RT-1은 67%로 성능 저하가 눈에 띄지 않으며 최대 50단계 태스크까지 실행한다.

## 한계 (Limitations)

imitation learning이라 시연자를 넘어서기 어렵다. 일반화도 이미 본 개념들의 새 조합까지이고 아예 새로운 motion은 만들지 못한다. 조작 태스크 집합은 크지만 정교하지는 않다. 저자들은 비전문가 데이터 수집, 환경 다양성 확대, scalable attention·memory를 후속 과제로 든다.

## 관련 페이지 (Related Pages)

- [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation]] — RT-1과 같은 계보의 후속 VLA foundation model. RT-1의 discrete action token 대신 flow-matching DiT(System 1)로 연속 행동을 내고 dual-system 구조로 확장한다. RT-1이 세운 "이미지+언어 → 행동" 뼈대를 휴머노이드·멀티 embodiment로 밀어붙인 판.
- [[physical-ai/hou-2026-world-model-for-robot-learning]] — 로봇 학습 정책 결합 방식 5분류를 정리한 서베이. RT-1 같은 unified VLA/single-backbone 정책이 이 분류의 한 축이다.
- [[physical-ai/li-2025-a-comprehensive-survey-on-world]] — embodied AI world model 서베이. RT-1류의 decision-coupled 정책을 좌표계에 놓고 본다.
- [[physical-ai/luo-2025-sonic-supersizing-motion-tracking]] — 같은 NVIDIA GEAR 계열은 아니지만 로봇 foundation model이라는 점에서 이웃. SONIC은 manipulation이 아니라 whole-body motion tracking을 다루고, universal token을 VLA 행동 공간으로 쓴다.
- [[overviews/physical-ai-overview]] — physical-ai 카테고리의 분류 뼈대·학습 경로 허브.
