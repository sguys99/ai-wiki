---
title: "Vision-Language-Action Models for Robotics: A Review Towards Real-World Applications"
type: paper
year: 2025
category: physical-ai
raw_path: /home/sguys99/project/ai-wiki/raw/papers/kawaharazuka-2025-vision-language-action-models-for-robotics.pdf
raw_filename: "kawaharazuka-2025-vision-language-action-models-for-robotics.pdf"
source_collection: external
authors: "Kento Kawaharazuka, Jihoon Oh, Jun Yamada, Ingmar Posner, Yuke Zhu"
arxiv_id: "2510.07077"
url: "https://vla-survey.github.io"
tags: [physical-ai, vla, robot-learning, robot-dataset]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/kawaharazuka-2025-vision-language-action-models-for-robotics/fig01.png
    raw: raw/papers/kawaharazuka-2025-vision-language-action-models-for-robotics-figures/fig01.png
    caption: "서베이 전체 구조. Section II 도전 과제를 중심으로 설계 전략(III)·아키텍처(IV)·학습 전략(V)·데이터(VI)·로봇/평가/응용(VII)이 VLA를 둘러싸고, 결론이 실무자 권고(VIII)로 모인다"
    page: 2
    bbox_norm: [0.052, 0.009, 0.947, 0.42]
    strategy: caption-region
    curated: false
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
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/kawaharazuka-2025-vision-language-action-models-for-robotics/fig07.png
    raw: raw/papers/kawaharazuka-2025-vision-language-action-models-for-robotics-figures/fig07.png
    caption: "VLA와 reinforcement learning을 결합하는 2가지 방식. (1) RL로 VLA를 fine-tuning (2) VLA를 high-level policy로, RL을 low-level 제어로"
    page: 14
    bbox_norm: [0.052, 0.009, 0.496, 0.235]
    strategy: caption-region
    curated: false
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/kawaharazuka-2025-vision-language-action-models-for-robotics/fig08.png
    raw: raw/papers/kawaharazuka-2025-vision-language-action-models-for-robotics-figures/fig08.png
    caption: "Section VI·VII 구성도. 로봇 종류(manipulator·hand/gripper·mobile·quadruped·humanoid), 데이터 수집(teleoperation·proxy device·human), 공개 데이터셋(human egocentric·simulation·real robot), 증강, 평가 벤치마크"
    page: 17
    bbox_norm: [0.052, 0.009, 0.947, 0.448]
    strategy: caption-region
    curated: false
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

## 한 줄 요약 (One-line Summary)

vision·language·action을 대규모로 통합해 다양한 과제·물체·embodiment·환경에 일반화하는 로봇 policy를 다룬 VLA 서베이로, 아키텍처 분류에 그치지 않고 로봇 플랫폼·데이터 수집·데이터셋·증강·평가까지 소프트웨어와 하드웨어를 아우르는 full-stack 관점에서 실무 지침을 제시한다.

## 1. 자료 정보 (Document Information)

- **저자**: Kento Kawaharazuka, Jihoon Oh (도쿄대), Jun Yamada, Ingmar Posner (옥스퍼드 Oxford Robotics Institute), Yuke Zhu (UT Austin, NVIDIA GEAR)
- **발표**: arXiv 2510.07077 (2025-10-08), IEEE Access 게재본 형식
- **프로젝트**: https://vla-survey.github.io — 학습 방식·평가·modality·데이터셋으로 분류한 전 참고문헌 표 제공
- **성격**: VLA를 정의 → 도전 과제 → 아키텍처 → 학습 → 데이터 → 실세계 응용 → 실무 권고 → 미래 방향의 순서로 훑는 종합 서베이. 400편 이상을 인용한다.
- **VLA의 정의(Def. I.1)**: visual observation과 자연어 지시를 필수 입력으로 받아 제어 명령을 직접 생성하는 시스템. VLM backbone이 미리 학습된 skill 집합에서 인덱스만 고르는 방식(예: high-level planner)은 이 정의에서 제외한다. vision과 language의 통합이 필수이고, proprioception·depth 같은 추가 modality는 선택이다.

## 2. 주요 기여 (Key Contributions)

- **full-stack 관점**: 기존 서베이가 action tokenization이나 아키텍처 진화에 좁게 집중한 반면, 이 논문은 소프트웨어(아키텍처·학습)와 하드웨어(로봇·데이터 수집)를 함께 다룬다.
- **아키텍처 taxonomy**: sensorimotor 모델을 7가지로, world model 활용을 3가지로, affordance 기반 모델을 3가지로 분류하고 각 범주의 대표 모델을 분석한다.
- **학습 전략 정리**: supervised·self-supervised·reinforcement learning 세 갈래로 나누고, pre-training/post-training 2단계 관행과 gradient insulation·LoRA 같은 실전 기법을 짚는다.
- **데이터·평가 레퍼런스**: real-world 로봇 데이터셋(Table 1)과 시뮬레이션 벤치마크(Table 2)를 표로 정리해 실무자가 바로 참조하도록 했다.
- **실무 권고(Section VIII)**: 데이터 다양성 우선, 생성 모델 기반 continuous action, gradient insulation, LoRA 등 경량 적응, world model·latent action 도입, multi-task 학습 등 6가지 실전 지침을 제시한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 도전 과제 (Section II)

VLA 개발을 막는 근본 제약은 셋이다. 먼저 데이터가 부족하다. vision·language·action 세 modality를 모두 정렬한 데이터셋은 규모와 다양성이 제한적인데, 웹 스케일 vision-language 데이터에는 action grounding이 없고 로봇 시연 데이터는 언어 다양성이 빈약하기 때문이다. embodiment 전이도 걸림돌이다. 로봇마다 action space와 proprioception 공간이 다르고, 사람 동작 데이터는 명시적 action 라벨이 없어 로봇이 실행할 수 있는 action으로 옮기기가 까다롭다. 남은 하나는 연산·학습 비용이다. 고차원 multimodal 입력과 Transformer의 시퀀스 길이에 대한 나쁜 확장성 때문에 적응·fine-tuning·추론이 모두 비싸다.

### 설계 전략의 역사적 전개 (Section III)

vision·language를 action으로 바꾸는 인터페이스 전략을 세대별로 짚는다. CLIPort는 CLIP 특징과 Transporter Network를 결합한 초기 CNN 기반 end-to-end 모델이지만 modality 통합과 확장에 한계가 있었다. Gato·VIMA는 Transformer로 여러 과제를 하나의 시퀀스로 처리했다. RT-1은 EfficientNet+FiLM+TokenLearner로 실시간 제어를 실현한 첫 통합 VLA로 꼽히고, RT-2는 PaLM-E·PaLI-X 같은 VLM backbone에 로봇 데이터를 co-fine-tuning해 강한 일반화를 얻으면서 VLM 기반 설계를 표준으로 만들었다. RT-X는 여러 로봇 데이터로 학습해 범용성을 넓혔고, OpenVLA는 이 계보를 오픈소스로 열었다. 이후 Octo가 Diffusion Policy를, RDT-1B가 diffusion transformer(DiT)를, π0가 flow matching action expert를 도입해 continuous action 생성으로 옮겨갔다. 가장 최근 세대는 RT-H·π0.5·GR00T N1처럼 high-level 언어 이해와 low-level 제어를 나누는 hierarchical policy를 쓴다.

### sensorimotor 모델의 7가지 아키텍처 (Section IV-A)

vision과 language를 받아 action을 직접 내는 sensorimotor 모델은 backbone(Transformer vs VLM)과 action 표현(discrete token / diffusion / flow matching / diffusion transformer)의 조합으로 7가지 계열로 갈린다. Transformer backbone 쪽에서는 discrete action token 계열이 VIMA·Gato·RT-1처럼 이산 토큰을 예측하고, diffusion action head 계열은 Octo·NoMAD처럼 Transformer 뒤에 diffusion policy를 붙여 부드러운 continuous action을 낸다. diffusion transformer 계열은 RDT-1B·LBM처럼 diffusion 과정을 Transformer 안에 직접 넣는다. backbone을 VLM으로 바꾼 계열은 상식 지식과 in-context learning을 끌어오는데, discrete action token은 RT-2·OpenVLA가, diffusion/flow matching action head는 π0가 대표다. 후자는 VLM의 일반화와 생성 모델의 부드러운 제어를 합친다. 마지막 VLM+diffusion transformer는 GR00T N1처럼 VLM을 high-level(system 2)로, diffusion transformer를 low-level(system 1)로 나눠 쓴다.

### world model·affordance 기반 모델 (Section IV-B, IV-C)

world model은 현재 입력으로 미래 observation이나 latent 표현을 예측해 planning·reasoning·제어를 돕는다. 세 갈래로 나뉜다. UniPi·DreamGen처럼 미래 영상을 생성하고 inverse dynamics model(IDM)로 action을 뽑는 방식, LAPA·UniVLA처럼 world model로 human video에서 latent action을 학습하는 방식, GR-1·GR-2처럼 sensorimotor 모델이 action과 미래 observation을 함께 예측하는 암묵적 world model 방식이다. affordance는 물체가 허용하는 상호작용 가능성을 뜻한다. affordance 기반 모델도 VLM으로 affordance를 예측해 action을 만드는 방식(VoxPoser·LERF-TOGO), human 데이터에서 affordance를 추출하는 방식(VRB·HRP), sensorimotor 모델에 affordance 예측을 통합하는 방식(CLIPort·RoboPoint)으로 나뉜다.

### modality 처리 (Section IV-D)

vision은 ResNet·ViT가 기본이고 CLIP·SigLIP·DINOv2가 널리 쓰인다. VQ-GAN·VQ-VAE로 이미지를 이산 토큰화하기도 하며 Perceiver Resampler·Q-Former·TokenLearner로 토큰을 압축한다. language는 backbone LLM의 토크나이저(T5·LLaMA)를 물려받는다. action 표현 방식은 네 가지로 나뉜다. 각 차원을 보통 256 bin으로 이산화해 토큰으로 쓰는 방식(RT-2·OpenVLA), 토큰을 MLP로 continuous action에 매핑하는 방식, diffusion·flow matching으로 continuous action을 생성하는 방식(Octo·π0), web-scale 영상에서 latent action을 학습하는 방식(LAPA)이다. FAST는 DCT+BPE로 토큰 길이를 줄여 control frequency를 높인다. cross-embodiment에는 OXE의 통일 포맷, CrossFormer의 embodiment별 action head, UniAct의 공유 action codebook 같은 접근이 있다. audio·tactile·3D(depth·multi-view·voxel·point cloud)도 부가 modality로 다룬다.

### 학습 전략 (Section V)

대부분의 VLA는 image·language·action 쌍으로 supervised learning한다. LLM 기반이라 next-token prediction으로 형식화하는 경우가 많고, action head 종류(MLP·diffusion·flow matching)에 따라 손실 함수가 달라진다. 학습은 pre-training과 post-training 2단계다. pre-training은 web-scale로 학습된 VLM을 backbone으로 삼아 로봇 도메인에 적응시키고, post-training은 소규모·고품질 과제 데이터로 fine-tuning한다. self-supervised learning은 modality 정렬(TRA), 시각 표현 학습(MAE·CLIP·DINOv2), latent action 표현 학습에 쓰인다. reinforcement learning은 두 방식으로 붙는다. RL로 VLA를 직접 fine-tuning하거나(iRe-VLA·ConRFT·DSRL — DSRL은 π0 성공률을 20%대에서 100% 근처로 끌어올렸다), VLA를 high-level로 두고 RL로 low-level 제어를 학습한다(Humanoid-VLA·NaVILA). gradient insulation(action head 그래디언트가 backbone으로 흐르지 않게 막기)과 LoRA·BitVLA 같은 경량 적응이 실전 안정화·효율화 기법으로 소개된다. 추론 단계에서는 Real-Time Chunking(RTC)·DeeR-VLA·VLA-Cache가 지연을 줄인다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

이 논문은 서베이라 자체 실험 대신 데이터·벤치마크를 정리한다.

- **real-world 로봇 데이터셋(Table 1)**: QT-Opt(580K episode)·RT-1(130K)·BridgeData V2(60.1K)·RH20T(110K)·DROID(76K)·RoboMIND(107K)·AgiBot World(1M)·OXE(1.4M, 22개 로봇 통합) 등을 skill·task·modality·embodiment·수집 방식으로 대조한다. OXE는 21개 기관·173명이 참여해 여러 데이터셋을 RLDS 포맷으로 통합한 대표 자원이다.
- **데이터 수집**: teleoperation(ALOHA·GELLO·AnyTeleop), proxy device(UMI·DexUMI·Dobb-E·DexCap), human data(Ego4D·Ego-Exo4D·Project Aria 스마트글라스)로 나뉜다. DROID는 18개 기관 분산 수집으로 76,000 trajectory·350시간을 모았고 언어 라벨은 크라우드소싱했다.
- **시뮬레이션 벤치마크(Table 2)**: LIBERO(130 task, 4 suite)가 현재 가장 널리 쓰이는 VLA 평가 벤치마크다. robosuite·robomimic·RoboCasa·Meta-World(MuJoCo), ManiSkill 1/2/3·RoboTwin(PhysX/SAPIEN), CALVIN·Habitat 1/2/3(Bullet), RLBench·THE COLOSSEUM(V-REP), AI2-THOR(Unity)를 과제·observation modality·물리엔진으로 정리한다. SIMPLER는 real-to-sim 평가, RoboArena는 7개 대학 로봇 네트워크의 분산 real-world 평가를 제공한다.
- **평가의 한계**: 실세계 평가 지표가 아직 부실하다. embodiment 차이·안전·재현성 문제로 대부분 시뮬레이션에서 평가되며, LBM은 충분한 시행 횟수와 신뢰구간 같은 통계적 엄밀성이 필요하다고 지적한다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

Section IX에서 8가지 미래 방향을 제시한다.

- **data modality**: audio·tactile·3D를 넣고 싶지만 특히 tactile은 센서 종류·포맷·하드웨어가 제각각이라 대규모 데이터 수집이 어렵다. 센서 구성 통일이 관건이다.
- **reasoning**: long-horizon 과제를 풀려면 시간에 걸친 memory와 선택적 정보 검색이 필요하다.
- **continual learning**: 현재 VLA는 학습 후 고정돼 새 상황에 적응하지 못한다. catastrophic forgetting과 안전 문제를 넘어 online·continual learning이 필요하다.
- **reinforcement learning**: 대부분 시뮬레이션에 머문다. learned world model 안에서의 fine-tuning, real-to-sim digital twin이 안전하고 sample-efficient한 대안으로 제시된다.
- **safety**: 비정형 환경 배치는 충돌 위험이 크다. 학습 policy의 일반화와 model-based 제어의 신뢰성을 합친 hybrid 아키텍처가 필요하다.
- **failure detection & recovery**: 대부분 실패를 종료로 처리한다. SAFE·Agentic Robot·LoHoVLA·FOREWARN처럼 실패 감지·재계획이 필요하다.
- **evaluation**: 어떤 접근이 가장 효과적인지 아직 불분명하다. 통계적으로 엄밀한 평가가 없기 때문이다.
- **applications**: 헬스케어·산업 자동화·자율주행 등 잠재력은 넓지만 아직 제약된 환경에서만 동작하고 human-level 신뢰성에 못 미친다.

## 6. 관련 연구 (Related Work)

기존 VLA 서베이 3종(Ma 2024, Sapkota 2025, Zhong 2025)이 action tokenization이나 아키텍처 진화에 집중한 것과 달리 이 논문은 하드웨어까지 아우르는 full-stack 관점을 표방한다. 계보의 출발점은 RT-1이고, RT-2가 VLA 범주를 세웠으며, OpenVLA가 오픈소스화, GR00T N1이 휴머노이드 foundation model로 확장했다. world model 축(UniPi·GR-1·DreamGen)과 affordance 축(VoxPoser·VRB), latent action 축(LAPA·UniVLA)이 sensorimotor 모델을 보완한다.

## 7. 용어집 (Glossary)

이 자료 고유의 용어만 담는다. 도메인 공통 용어(policy·observation·world model·affordance·imitation learning 등)는 [[overviews/glossary-physical-ai]]와 [[overviews/glossary-llms]]에 위임한다.

- **sensorimotor model**: vision과 language를 받아 action을 직접 출력하는 VLA의 기본 아키텍처 계열. world model·affordance 모델과 대비된다.
- **action head**: backbone(Transformer·VLM) 출력을 실제 action으로 바꾸는 마지막 모듈. discrete token·diffusion·flow matching 등으로 구현된다.
- **flow matching**: diffusion보다 적은 추론 스텝으로 continuous action을 생성하는 기법. π0가 최대 50Hz 제어에 썼다. real-time 응답성에 유리하다.
- **diffusion transformer (DiT)**: diffusion 과정을 별도 action head가 아니라 Transformer decoder 안에 직접 통합한 구조. RDT-1B가 대표.
- **latent action**: 명시적 action 라벨이 없는 데이터(human video)에서 학습하는 잠재 action 표현. LAPA가 초기·미래 이미지 차이를 VQ-VAE로 이산화해 얻는다.
- **inverse dynamics model (IDM)**: 연속한 두 observation(또는 예측 영상) 사이를 잇는 action을 추정하는 모델. world model이 생성한 미래 영상을 실행 가능한 action으로 옮길 때 쓴다.
- **gradient insulation**: 무작위 초기화된 action head의 그래디언트가 pre-training된 VLM backbone으로 흘러 표현을 망가뜨리지 않게 차단하는 기법. 학습 안정성·효율을 높인다. GR00T N1.5는 backbone 전체를 freeze한다.
- **cross-embodiment**: 서로 다른 로봇 형상 간에 policy를 전이하는 문제. OXE의 통일 포맷, CrossFormer·UniAct가 대표 접근.
- **control frequency**: 로봇이 1초에 몇 번 새로운 action을 갱신하는지. discrete token의 긴 토큰 길이가 이를 떨어뜨려 FAST(DCT+BPE)가 토큰을 압축한다.
- **Real-Time Chunking (RTC)**: 이미 실행된 action은 고정하고 다음 action을 비동기로 생성하는 추론 전략이다. 실세계 실행 지연을 줄인다.

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 2 | 서베이 전체 구조 (Section II~VIII 관계) | caption-region | (확인 필요 — 네비게이션용) |
| fig02 | 4 | 주요 VLA 모델의 시간축 (CLIPort→GR00T N1) | caption-region | ★ wiki 권장 (계보) |
| fig03 | 6 | Section IV·V 구성도 (아키텍처 3종·modality·학습) | caption-region | ★ wiki 권장 (분류 뼈대) |
| fig04 | 7 | sensorimotor 7가지 아키텍처 | caption-region | ★ wiki 권장 (핵심 taxonomy) |
| fig05 | 8 | world model 3가지 설계 패턴 | caption-region | ★ wiki 권장 (method) |
| fig06 | 10 | affordance 3가지 설계 패턴 | caption-region | ★ wiki 권장 (method) |
| fig07 | 14 | RL 결합 2가지 방식 | caption-region | (확인 필요 — 면적 작음) |
| fig08 | 17 | Section VI·VII 구성도 (로봇·데이터·평가) | caption-region | (확인 필요 — 네비게이션용) |
| tab01 | 19 | real-world 로봇 데이터셋 표 | table-region | ★ wiki 권장 (result/reference) |
| tab02 | 23 | 시뮬레이션 벤치마크 표 | table-region | ★ wiki 권장 (result/reference) |
