---
title: "Vision-Language-Action Models for Robotics: A Review Towards Real-World Applications"
type: paper
year: 2025
category: physical-ai
source: kawaharazuka-2025-vision-language-action-models-for-robotics.md
raw_path: /home/sguys99/project/ai-wiki/raw/papers/kawaharazuka-2025-vision-language-action-models-for-robotics.pdf
raw_filename: "kawaharazuka-2025-vision-language-action-models-for-robotics.pdf"
source_collection: external
authors: "Kento Kawaharazuka, Jihoon Oh, Jun Yamada, Ingmar Posner, Yuke Zhu"
arxiv_id: "2510.07077"
url: "https://vla-survey.github.io"
tags: [physical-ai, vla, robot-learning, robot-dataset]
figures:
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/kawaharazuka-2025-vision-language-action-models-for-robotics/fig02.png
    raw: raw/papers/kawaharazuka-2025-vision-language-action-models-for-robotics-figures/fig02.png
    caption: "주요 VLA 모델의 시간축. CLIPort(CNN) → Gato·VIMA(Transformer) → RT-1·RT-2·RT-X·OpenVLA(VLM backbone) → Octo·RDT-1B·π0(diffusion·flow matching) → LAPA·π0.5·GR00T N1(latent action·hierarchical)"
    page: 4
    bbox_norm: [0.052, 0.009, 0.947, 0.434]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/kawaharazuka-2025-vision-language-action-models-for-robotics/fig03.png
    raw: raw/papers/kawaharazuka-2025-vision-language-action-models-for-robotics-figures/fig03.png
    caption: "Section IV·V 구성도. 가운데 아키텍처 3종(sensorimotor·world model·affordance), 왼쪽 입출력 modality(vision·language·action·기타), 오른쪽 학습 패러다임(supervised·self-supervised·reinforcement)"
    page: 6
    bbox_norm: [0.052, 0.009, 0.947, 0.351]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/kawaharazuka-2025-vision-language-action-models-for-robotics/fig04.png
    raw: raw/papers/kawaharazuka-2025-vision-language-action-models-for-robotics-figures/fig04.png
    caption: "sensorimotor 모델의 7가지 아키텍처. (1) Transformer+discrete action token (2) Transformer+diffusion action head (3) diffusion transformer (4) VLM+discrete action token (5,6) VLM+diffusion/flow matching action head (7) VLM+diffusion transformer"
    page: 7
    bbox_norm: [0.052, 0.009, 0.947, 0.508]
    strategy: caption-region
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/kawaharazuka-2025-vision-language-action-models-for-robotics/fig05.png
    raw: raw/papers/kawaharazuka-2025-vision-language-action-models-for-robotics-figures/fig05.png
    caption: "VLA에 world model을 넣는 3가지 설계 패턴. (1) world model+inverse dynamics로 action 생성 (2) world model로 latent action 학습(주로 human video) (3) sensorimotor 모델에 암묵적 world model(미래 observation 동시 예측)"
    page: 8
    bbox_norm: [0.0, 0.0, 0.951, 0.341]
    strategy: caption-region
    curated: true
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/kawaharazuka-2025-vision-language-action-models-for-robotics/fig06.png
    raw: raw/papers/kawaharazuka-2025-vision-language-action-models-for-robotics-figures/fig06.png
    caption: "affordance 기반 모델의 3가지 설계 패턴. (1) VLM으로 affordance 예측 후 action 생성 (2) human 시연에서 affordance 추출 (3) sensorimotor 모델에 affordance 예측 모듈 통합"
    page: 10
    bbox_norm: [0.052, 0.009, 0.947, 0.314]
    strategy: caption-region
    curated: true
  - id: tab01
    label: Table 1
    kind: table
    file: assets/kawaharazuka-2025-vision-language-action-models-for-robotics/tab01.png
    raw: raw/papers/kawaharazuka-2025-vision-language-action-models-for-robotics-figures/tab01.png
    caption: "VLA 연구에 쓰이는 최근 real-world 로봇 데이터셋. QT-Opt(580K)·RT-1(130K)·OXE(1.4M)·DROID(76K)·AgiBot World(1M) 등을 episode 수·skill·task·modality·embodiment·수집 방식으로 정리"
    page: 19
    bbox_norm: [0.052, 0.108, 0.947, 0.277]
    strategy: table-region
    curated: true
  - id: tab02
    label: Table 2
    kind: table
    file: assets/kawaharazuka-2025-vision-language-action-models-for-robotics/tab02.png
    raw: raw/papers/kawaharazuka-2025-vision-language-action-models-for-robotics-figures/tab02.png
    caption: "VLA 평가용 시뮬레이션 벤치마크. robosuite·LIBERO·Meta-World(MuJoCo), ManiSkill·RoboTwin(PhysX), CALVIN·Habitat(Bullet), RLBench(V-REP), AI2-THOR(Unity), SIMPLER·RoboArena(real-to-sim/real)를 과제·observation·물리엔진으로 대조"
    page: 23
    bbox_norm: [0.052, 0.119, 0.947, 0.404]
    strategy: table-region
    curated: true
---

## 요약 (Summary)

VLA는 vision·language·action을 대규모로 통합해 다양한 과제·물체·embodiment·환경에 일반화하는 로봇 policy를 지향한다. 이 서베이는 아키텍처 분류에 머무르지 않는다. 로봇 플랫폼·데이터 수집·공개 데이터셋·데이터 증강·평가 벤치마크까지 소프트웨어와 하드웨어를 함께 놓고 실무자가 실제로 VLA를 로봇에 올릴 때 필요한 것들을 full-stack으로 훑는다. 도쿄대·옥스퍼드 Oxford Robotics Institute·UT Austin(NVIDIA GEAR)이 함께 썼고 400편 이상을 인용한다.

논문이 정의하는 VLA는 좁고 분명하다. visual observation과 자연어 지시를 필수 입력으로 받아 제어 명령을 직접 생성하는 시스템이다(Def. I.1). observation은 매 timestep에 policy가 받는 센서 입력을 말하고 policy는 그 입력을 받아 다음 action을 정하는 함수다. VLM backbone이 미리 학습된 skill 집합에서 인덱스만 고르는 방식은 여기서 빠진다. action을 직접 내지 않고 골라 쓰기 때문이다.

![[assets/kawaharazuka-2025-vision-language-action-models-for-robotics/fig03.png]]
*Figure 3: Section IV·V 구성도 — 아키텍처 3종(sensorimotor·world model·affordance), 입출력 modality, 학습 패러다임 (Kawaharazuka 2025, p.6)*

## 세 가지 도전 과제 (Challenges)

VLA를 실세계에 올리기 어려운 이유는 크게 셋이다. 우선 데이터가 부족하다. vision·language·action을 모두 정렬한 데이터셋은 규모도 다양성도 제한적이다. 웹 스케일 vision-language 데이터에는 action grounding이 없고 로봇 시연 데이터에는 언어 다양성이 없다. embodiment 전이도 걸림돌이다. 로봇마다 action space와 proprioception 공간이 달라 한 로봇의 policy를 다른 로봇으로 옮기기 어렵고, 값싼 대안인 사람 동작 데이터는 action 라벨이 없어 로봇이 실행할 수 있는 action으로 번역하는 일 자체가 난제다. 마지막 이유는 비용이다. 고차원 multimodal 입력에 Transformer의 시퀀스 길이 확장성까지 겹쳐 적응·fine-tuning·추론이 모두 무겁다. fine-tuning은 pre-training된 모델을 특정 과제 데이터로 더 학습시키는 단계를 말한다.

## 설계 전략의 전개 (Design Strategy and Transition)

vision·language를 action으로 바꾸는 인터페이스는 세대를 거치며 바뀌었다. 출발점인 CLIPort는 CLIP 특징과 Transporter Network를 엮은 CNN 기반 end-to-end 모델이었지만 modality 통합과 확장에서 막혔다. Gato·VIMA가 Transformer로 여러 과제를 한 시퀀스에 담았고, RT-1이 EfficientNet·FiLM·TokenLearner로 실시간 제어를 실현하며 첫 통합 VLA로 자리잡았다. 판을 바꾼 건 RT-2다. 로봇 액션을 256 bin으로 이산화해 텍스트 토큰처럼 적으면 PaLM-E·PaLI-X 같은 VLM을 그대로 policy로 fine-tuning할 수 있었고, 이 VLM 기반 설계가 이후 표준이 됐다. 여기서 핵심 레시피가 co-fine-tuning이다. 로봇 데이터만이 아니라 원래 웹 데이터를 배치에 계속 섞어 함께 학습시키는 방법이다. RT-X가 여러 로봇 데이터로 범용성을 넓혔고 OpenVLA가 이 계보를 오픈소스로 열었다.

그다음 흐름은 continuous action 생성이다. Octo가 Diffusion Policy를, RDT-1B가 diffusion transformer를, π0가 flow matching을 도입했다. flow matching은 diffusion보다 적은 추론 스텝으로 continuous action을 생성해 real-time 응답에 유리하며, π0는 이걸로 최대 50Hz 제어를 냈다. 가장 최근 세대는 RT-H·π0.5·GR00T N1처럼 high-level 언어 이해와 low-level 제어를 분리한 hierarchical policy로 넘어갔다.

![[assets/kawaharazuka-2025-vision-language-action-models-for-robotics/fig02.png]]
*Figure 2: 주요 VLA 모델의 시간축 — CLIPort에서 GR00T N1까지의 계보 (Kawaharazuka 2025, p.4)*

이 계보에서 [[physical-ai/brohan-2022-rt-1-robotics-transformer-for-real-world|RT-1]]·[[physical-ai/brohan-2023-rt-2-vision-language-action-models-transfer-web|RT-2]]·[[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation|GR00T N1]]은 이 wiki에 개별 페이지로 있다.

## sensorimotor 모델의 7가지 아키텍처 (Architectures)

vision과 language를 받아 action을 직접 내는 sensorimotor 모델이 VLA의 기본 계열이다. 이 논문은 이를 backbone(Transformer냐 VLM이냐)과 action head(action을 실제 제어값으로 바꾸는 마지막 모듈)의 조합으로 7가지로 가른다. Transformer 계열은 (1) discrete action token(VIMA·Gato·RT-1), (2) diffusion action head(Octo·NoMAD), (3) diffusion transformer(RDT-1B)로 나뉜다. backbone을 VLM으로 바꾸면 (4) discrete action token(RT-2·OpenVLA), (5,6) diffusion/flow matching action head(π0), (7) diffusion transformer(GR00T N1)가 된다. VLM을 쓰면 웹에서 얻은 상식 지식과 in-context learning을 끌어올 수 있고, (7)에서는 VLM이 high-level(system 2), diffusion transformer가 low-level(system 1) 역할을 맡는다.

![[assets/kawaharazuka-2025-vision-language-action-models-for-robotics/fig04.png]]
*Figure 4: sensorimotor 모델의 7가지 아키텍처 (Kawaharazuka 2025, p.7)*

## world model과 affordance (World Models and Affordances)

sensorimotor 모델 말고도 두 계열이 있다. world model은 환경의 동역학을 학습해 미래를 예측하는 모델로, 그 예측을 planning·reasoning·제어에 쓴다. 활용은 셋으로 나뉜다. 하나는 UniPi·DreamGen처럼 미래 영상을 생성하고 inverse dynamics model(IDM)로 그 영상 사이를 잇는 action을 뽑는다. 또 하나는 LAPA·UniVLA처럼 world model로 human video에서 latent action을 학습한다. 마지막은 GR-1·GR-2처럼 sensorimotor 모델이 action과 미래 observation을 함께 예측하는 암묵적 world model이다. latent action은 명시적 action 라벨이 없는 데이터에서 학습하는 잠재 action 표현으로, human video를 로봇 학습에 끌어오는 통로가 된다.

affordance는 물체가 허용하는 상호작용 가능성을 뜻한다. affordance 기반 모델도 셋으로 갈린다. VLM으로 affordance를 예측해 action을 만들거나(VoxPoser·LERF-TOGO), human 데이터에서 affordance를 뽑는다(VRB·HRP). sensorimotor 모델에 affordance 예측을 통합하는 방식(CLIPort·RoboPoint)도 있다.

![[assets/kawaharazuka-2025-vision-language-action-models-for-robotics/fig05.png]]
*Figure 5: VLA에 world model을 넣는 3가지 설계 패턴 (Kawaharazuka 2025, p.8)*

![[assets/kawaharazuka-2025-vision-language-action-models-for-robotics/fig06.png]]
*Figure 6: affordance 기반 모델의 3가지 설계 패턴 (Kawaharazuka 2025, p.10)*

world model 축은 이 wiki의 [[physical-ai/hou-2026-world-model-for-robot-learning|World Model for Robot Learning]]·[[physical-ai/li-2025-a-comprehensive-survey-on-world|A Comprehensive Survey on World Models]]가 더 깊이 다룬다.

## 학습 전략 (Training Strategy)

대부분의 VLA는 image·language·action 쌍으로 supervised learning하고, LLM 기반이라 next-token prediction으로 형식화하는 경우가 많다. 학습은 두 단계다. pre-training은 web-scale로 학습된 VLM을 backbone으로 삼아 로봇 도메인에 적응시키는 단계다. post-training은 소규모·고품질 과제 데이터로 다듬는 단계다. self-supervised learning은 modality 정렬, 시각 표현 학습(MAE·CLIP·DINOv2), latent action 학습에 쓰인다.

reinforcement learning은 두 방식으로 붙는다. RL로 VLA를 직접 fine-tuning하거나(iRe-VLA·ConRFT·DSRL — DSRL은 π0 성공률을 약 20%대에서 100% 근처까지 끌어올렸다), VLA를 high-level policy로 두고 low-level 제어만 RL로 학습한다(Humanoid-VLA·NaVILA). 실전에서 자주 언급되는 안정화 기법이 gradient insulation이다. 무작위 초기화된 action head의 그래디언트가 pre-training된 backbone으로 흘러 표현을 망가뜨리지 않게 차단하는 것으로, 학습 안정성과 효율을 함께 높인다. GR00T N1.5는 아예 backbone 전체를 freeze한다. 효율 쪽으로는 LoRA·BitVLA 같은 경량 적응, 추론 지연을 줄이는 Real-Time Chunking(RTC)·DeeR-VLA·VLA-Cache가 있다.

## 데이터와 평가 (Data and Evaluation)

이 서베이는 데이터·평가 정리에서 실무 가치가 크다. real-world 로봇 데이터셋은 QT-Opt(580K episode)·RT-1(130K)·DROID(76K)·RoboMIND(107K)·AgiBot World(1M)·OXE(1.4M) 등이 규모다. 특히 OXE는 21개 기관·173명이 여러 데이터셋을 RLDS 포맷으로 통합한 대표 자원이다. 데이터 수집은 teleoperation(ALOHA·GELLO), proxy device(UMI·DexCap), human data(Ego4D·Project Aria 스마트글라스)로 나뉜다. teleoperation은 사람이 로봇을 원격으로 움직여 시연을 만드는 방식이다.

![[assets/kawaharazuka-2025-vision-language-action-models-for-robotics/tab01.png]]
*Table 1: VLA 연구에 쓰이는 최근 real-world 로봇 데이터셋 (Kawaharazuka 2025, p.19)*

평가는 대부분 시뮬레이션에 의존한다. 실기기 평가는 embodiment 차이·안전·재현성 때문에 어렵다. 현재 가장 널리 쓰이는 벤치마크는 LIBERO(130 task, 4 suite)다. 그 밖에 robosuite·Meta-World(MuJoCo), ManiSkill·RoboTwin(PhysX), CALVIN·Habitat(Bullet), RLBench(V-REP), AI2-THOR(Unity)가 물리엔진별로 갈린다. SIMPLER는 real-to-sim 평가, RoboArena는 7개 대학 로봇 네트워크의 분산 real-world 평가를 제공한다. 다만 논문은 통계적으로 엄밀한 평가(충분한 시행 횟수·신뢰구간)가 아직 부족하다고 짚는다.

![[assets/kawaharazuka-2025-vision-language-action-models-for-robotics/tab02.png]]
*Table 2: VLA 평가용 시뮬레이션 벤치마크 (Kawaharazuka 2025, p.23)*

## 실무 권고와 미래 방향 (Recommendations and Future Directions)

Section VIII은 실전 지침 6가지로 정리한다. 데이터는 양보다 다양성을 우선한다. action은 discrete token보다 diffusion·flow matching 같은 생성 방식으로 continuous하게 내는 편이 낫다. pre-training 때는 gradient insulation으로 backbone을 지키고, 전체 fine-tuning 대신 action head만 학습하거나 LoRA로 시작한다. 휴머노이드처럼 embodiment가 사람과 가까우면 human video와 latent action을 끌어온다. affordance·keypoint·미래 상태 예측 같은 보조 과제로 multi-task 학습을 붙이는 것도 권장한다.

미래 방향(Section IX)으로는 tactile·audio·3D 같은 modality 통합, long-horizon reasoning과 memory, 배치 후에도 배우는 continual learning, learned world model 안에서 이뤄지는 안전한 RL fine-tuning, model-based 제어와 결합한 safety, 실패 감지·재계획(SAFE·LoHoVLA·FOREWARN), 엄밀한 평가 체계를 든다. 현재 VLA는 제약된 환경에서만 동작하고 human-level 신뢰성에는 못 미친다는 게 저자들의 진단이다.

## 관련 페이지 (Related Pages)

- [[physical-ai/sa-2026-vision-language-action-models-for]] — 같은 VLA 문헌을 양팔(bimanual) 조작 렌즈로 좁혀 본 서베이. 이 논문은 full-stack을 넓게 훑고, 저쪽 서베이는 두 팔의 결합도라는 한 축을 깊이 다룬다
- [[physical-ai/brohan-2022-rt-1-robotics-transformer-for-real-world]] — 이 서베이가 "첫 통합 VLA"로 꼽는 계보의 출발점
- [[physical-ai/brohan-2023-rt-2-vision-language-action-models-transfer-web]] — VLM 기반 설계를 표준으로 만든 논문. 이 서베이의 (4) VLM+discrete action token 아키텍처의 대표
- [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation]] — 이 서베이의 (7) VLM+diffusion transformer + latent action + hierarchical을 모두 통합한 최신 세대 사례
- [[physical-ai/hou-2026-world-model-for-robot-learning]] — 이 서베이가 한 절로 다룬 world model 축을 통째로 파고든 서베이
- [[physical-ai/zhang-2024-vision-and-language-navigation-today]] — 같은 개념을 navigation 축에서 본 서베이
- [[physical-ai/keon-awesome-physical-ai]] — VLA·world model 문헌의 상위 큐레이션 지도
- [[overviews/physical-ai-overview]] — physical-ai 카테고리 허브
