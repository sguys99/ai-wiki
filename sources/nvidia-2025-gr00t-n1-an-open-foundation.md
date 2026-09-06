---
title: "GR00T N1: An Open Foundation Model for Generalist Humanoid Robots"
type: paper
year: 2025
category: physical-ai
raw_path: raw/papers/nvidia-2025-gr00t-n1-an-open-foundation.pdf
raw_filename: "nvidia-2025-gr00t-n1-an-open-foundation.pdf"
source_collection: external
authors: "NVIDIA (contributor 목록은 논문 Appendix A)"
arxiv_id: "2503.14734"
tags: [physical-ai, vla, humanoid, robot-dataset]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/nvidia-2025-gr00t-n1-an-open-foundation/fig01.png
    raw: raw/papers/nvidia-2025-gr00t-n1-an-open-foundation-figures/fig01.png
    caption: "data pyramid. 웹 데이터와 human video가 하단, 합성 데이터가 중간, 실제 로봇 데이터가 상단이다"
    page: 2
    bbox_norm: [0.4949, 0.1393, 0.9006, 0.3219]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/nvidia-2025-gr00t-n1-an-open-foundation/fig02.png
    raw: raw/papers/nvidia-2025-gr00t-n1-an-open-foundation-figures/fig02.png
    caption: "GR00T N1 모델 개요. VLM(System 2)에서 DiT(System 1)로 이어지는 dual-system 구성"
    page: 3
    bbox_norm: [0.0908, 0.0939, 0.9219, 0.3996]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/nvidia-2025-gr00t-n1-an-open-foundation/fig03.png
    raw: raw/papers/nvidia-2025-gr00t-n1-an-open-foundation-figures/fig03.png
    caption: "GR00T N1 모델 아키텍처. Eagle-2 VLM, cross-attention DiT 블록, embodiment별 state와 action 인코더"
    page: 4
    bbox_norm: [0.0936, 0.0905, 0.9187, 0.402]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/nvidia-2025-gr00t-n1-an-open-foundation/fig04.png
    raw: raw/papers/nvidia-2025-gr00t-n1-an-open-foundation-figures/fig04.png
    caption: "latent action. 로봇과 사람을 포함한 8개 embodiment에서 같은 latent action이 같은 동작에 대응한다"
    page: 6
    bbox_norm: [0.1144, 0.0939, 0.8858, 0.2976]
    strategy: caption-region
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/nvidia-2025-gr00t-n1-an-open-foundation/fig05.png
    raw: raw/papers/nvidia-2025-gr00t-n1-an-open-foundation-figures/fig05.png
    caption: "비디오 생성 모델이 만든 neural trajectory. 같은 초기 프레임에 프롬프트만 바꿔 counterfactual 상황을 만든다"
    page: 7
    bbox_norm: [0.1121, 0.0939, 0.8832, 0.6558]
    strategy: caption-region
    curated: true
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/nvidia-2025-gr00t-n1-an-open-foundation/fig06.png
    raw: raw/papers/nvidia-2025-gr00t-n1-an-open-foundation-figures/fig06.png
    caption: "teleoperation 데이터 수집. Manus Glove와 VIVE, Apple Vision Pro, Leap Motion 세 가지 방식과 retargeting"
    page: 10
    bbox_norm: [0.0924, 0.0522, 0.9819, 0.274]
    strategy: caption-region
    curated: false
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/nvidia-2025-gr00t-n1-an-open-foundation/fig07.png
    raw: raw/papers/nvidia-2025-gr00t-n1-an-open-foundation-figures/fig07.png
    caption: "시뮬레이션 태스크. RoboCasa, DexMimicGen, GR-1 tabletop 3개 벤치마크 예시"
    page: 11
    bbox_norm: [0.0947, 0.0939, 0.9053, 0.3102]
    strategy: caption-region
    curated: false
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/nvidia-2025-gr00t-n1-an-open-foundation/fig08.png
    raw: raw/papers/nvidia-2025-gr00t-n1-an-open-foundation-figures/fig08.png
    caption: "실제 로봇 태스크. pre-training 평가 2종과 post-training 4범주(pick-and-place, articulated, industrial, coordination)"
    page: 13
    bbox_norm: [0.0871, 0.0885, 0.934, 0.6327]
    strategy: caption-region
    curated: false
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/nvidia-2025-gr00t-n1-an-open-foundation/fig09.png
    raw: raw/papers/nvidia-2025-gr00t-n1-an-open-foundation-figures/fig09.png
    caption: "neural trajectory ablation. RoboCasa 세 데이터 구간과 실제 로봇 저데이터 구간의 co-training 이득"
    page: 16
    bbox_norm: [0.0867, 0.0863, 0.9056, 0.2996]
    strategy: caption-region
    curated: true
  - id: fig10
    label: Figure 10
    kind: figure
    file: assets/nvidia-2025-gr00t-n1-an-open-foundation/fig10.png
    raw: raw/papers/nvidia-2025-gr00t-n1-an-open-foundation-figures/fig10.png
    caption: "태스크당 시연 데이터 30개, 100개, 300개 구간의 시뮬레이션 성공률 막대그래프"
    page: 20
    bbox_norm: [0.0947, 0.5483, 0.9053, 0.7471]
    strategy: caption-region
    curated: true
  - id: fig11
    label: Figure 11
    kind: figure
    file: assets/nvidia-2025-gr00t-n1-an-open-foundation/fig11.png
    raw: raw/papers/nvidia-2025-gr00t-n1-an-open-foundation-figures/fig11.png
    caption: "pre-training 체크포인트의 왼손에서 오른손으로 넘기는 handover 정성 롤아웃"
    page: 21
    bbox_norm: [0.0892, 0.0891, 0.9052, 0.1941]
    strategy: caption-region
    curated: false
  - id: fig12
    label: Figure 12
    kind: figure
    file: assets/nvidia-2025-gr00t-n1-an-open-foundation/fig12.png
    raw: raw/papers/nvidia-2025-gr00t-n1-an-open-foundation-figures/fig12.png
    caption: "post-training을 마친 GR00T N1과 Diffusion Policy의 롤아웃 비교"
    page: 21
    bbox_norm: [0.0872, 0.2567, 0.9052, 0.595]
    strategy: caption-region
    curated: false
  - id: fig13
    label: Figure 13
    kind: figure
    file: assets/nvidia-2025-gr00t-n1-an-open-foundation/fig13.png
    raw: raw/papers/nvidia-2025-gr00t-n1-an-open-foundation-figures/fig13.png
    caption: "neural trajectory 생성의 네 가지 능력(multi-view grid, multi-round, 액체, img2img 초기 프레임)"
    page: 22
    bbox_norm: [0.1277, 0.088, 0.9792, 0.7739]
    strategy: caption-region
    curated: false
  - id: fig14
    label: Figure 14
    kind: figure
    file: assets/nvidia-2025-gr00t-n1-an-open-foundation/fig14.png
    raw: raw/papers/nvidia-2025-gr00t-n1-an-open-foundation-figures/fig14.png
    caption: "pre-training에 쓴 7개 human egocentric video 데이터셋 샘플"
    page: 25
    bbox_norm: [0.1065, 0.1644, 0.8967, 0.7928]
    strategy: caption-region
    curated: false
  - id: tab01
    label: Table 1
    kind: table
    file: assets/nvidia-2025-gr00t-n1-an-open-foundation/tab01.png
    raw: raw/papers/nvidia-2025-gr00t-n1-an-open-foundation-figures/tab01.png
    caption: "Table 1: Training Data Generation. Our data generation strategies leverage different data sources. The latent- action learning technique is broadly applied to diverse video datasets. Neural trajectories can be generated from datasets containing robot actions, while simulation trajectories rely on a "
    page: 9
    bbox_norm: [0.151, 0.297, 0.849, 0.3803]
    strategy: table-region
    curated: false
  - id: tab02
    label: Table 2
    kind: table
    file: assets/nvidia-2025-gr00t-n1-an-open-foundation/tab02.png
    raw: raw/papers/nvidia-2025-gr00t-n1-an-open-foundation-figures/tab02.png
    caption: "Table 2: Simulation Results. Average success rate across three simulation benchmarks, using 100 demonstra- tions per task. GR00T N1 outperforms both baselines, especially on the GR-1 task where it outperforms by more than 17 %."
    page: 15
    bbox_norm: [0.266, 0.5367, 0.734, 0.62]
    strategy: table-region
    curated: false
  - id: tab03
    label: Table 3
    kind: table
    file: assets/nvidia-2025-gr00t-n1-an-open-foundation/tab03.png
    raw: raw/papers/nvidia-2025-gr00t-n1-an-open-foundation-figures/tab03.png
    caption: "Table 3: Real-World Results. Average policy success rate on real-world tasks with the GR-1 humanoid robots. GR00T N1 beats the diffusion policy baseline and shows strong results even with very little data."
    page: 15
    bbox_norm: [0.0947, 0.757, 0.9053, 0.9368]
    strategy: table-region
    curated: false
  - id: tab04
    label: Table 4
    kind: table
    file: assets/nvidia-2025-gr00t-n1-an-open-foundation/tab04.png
    raw: raw/papers/nvidia-2025-gr00t-n1-an-open-foundation-figures/tab04.png
    caption: "Table 4: Simulation Evaluation Results with Models Trained with Different Dataset Sizes."
    page: 26
    bbox_norm: [0.0947, 0.1204, 0.9053, 0.9368]
    strategy: table-region
    curated: false
  - id: tab05
    label: Table 5
    kind: table
    file: assets/nvidia-2025-gr00t-n1-an-open-foundation/tab05.png
    raw: raw/papers/nvidia-2025-gr00t-n1-an-open-foundation-figures/tab05.png
    caption: "Table 5: Success rate on real-world tasks with the GR-1 humanoid robot."
    page: 27
    bbox_norm: [0.2107, 0.1534, 0.7893, 0.5592]
    strategy: table-region
    curated: false
  - id: tab06
    label: Table 6
    kind: table
    file: assets/nvidia-2025-gr00t-n1-an-open-foundation/tab06.png
    raw: raw/papers/nvidia-2025-gr00t-n1-an-open-foundation-figures/tab06.png
    caption: "Table 6: Training hyperparameters. Pre- and post-training use the same hyperparameters unless specified."
    page: 27
    bbox_norm: [0.2197, 0.6474, 0.7757, 0.8727]
    strategy: table-region
    curated: false
  - id: tab07
    label: Table 7
    kind: table
    file: assets/nvidia-2025-gr00t-n1-an-open-foundation/tab07.png
    raw: raw/papers/nvidia-2025-gr00t-n1-an-open-foundation-figures/tab07.png
    caption: "Table 7: Pre-training Dataset Statistics"
    page: 28
    bbox_norm: [0.0947, 0.3548, 0.9053, 0.9368]
    strategy: table-region
    curated: false
---

## 한 줄 요약 (One-line Summary)

NVIDIA가 공개한 humanoid용 VLA foundation model. Eagle-2 VLM(System 2)이 10Hz로 상황을 해석하고 flow-matching DiT(System 1)가 120Hz로 모터 액션을 뽑는다. 두 System을 dual-system으로 묶어 end-to-end로 함께 학습한다. pre-training 코퍼스는 human video와 합성 비디오, 실제 로봇 trajectory를 data pyramid로 쌓아 만든다.

## 1. 자료 정보 (Document Information)

- 제목: GR00T N1: An Open Foundation Model for Generalist Humanoid Robots
- 저자: NVIDIA (기여자 명단은 Appendix A)
- arXiv: 2503.14734v2 (2025-03-27), 본문 표기 날짜 2025-3-28, 총 36페이지
- 공개물: GR00T-N1-2B 체크포인트, 학습 데이터, 시뮬레이션 벤치마크 (GitHub, HuggingFace Datasets)

## 2. 주요 기여 (Key Contributions)

VLM 기반 추론 모듈(System 2)과 DiT 기반 액션 모듈(System 1)이 하나의 학습 프레임워크 안에 들어간다. 두 모듈을 느슨하게 이어붙인 파이프라인이 아니라 학습 중 함께 최적화하는 compositional 모델이다.

pre-training은 대규모 일반 데이터로 모델의 기반 능력을 먼저 학습하는 단계다. 여기에는 human video와 시뮬레이션 데이터, neural 생성 데이터, 실제 로봇 시연 데이터(demonstration)를 섞어 쓴다. 저자들은 이 혼합 코퍼스를 data pyramid라고 부른다. 아래로 갈수록 양이 많고 embodiment 특수성이 낮다.

탁상 단일 팔부터 dexterous hand를 단 humanoid까지 한 체크포인트가 커버한다. policy는 observation을 받아 다음 action을 정하는 함수를 말한다. GR00T N1은 단일 가중치로 여러 embodiment를 지원하는 다중 태스크 language-conditioned policy이고 소량 데이터로 post-training하면 새 태스크에 빠르게 적응한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### dual-system 구성

GR00T-N1-2B는 전체 2.2B 파라미터이고 그중 1.34B이 VLM이다. 16개 액션 chunk를 샘플링하는 데 L40 GPU와 bf16에서 63.9ms가 걸린다.

System 2는 Eagle-2 VLM이다. SmolLM2 LLM과 SigLIP-2 이미지 인코더에서 파인튜닝해 만들었다. 이미지는 224×224로 인코딩한 뒤 pixel shuffle을 거쳐 프레임당 64개 image token이 된다. 최종 layer 대신 중간 layer 임베딩을 쓰면 추론이 빠르고 downstream 성공률도 높았다. GR00T-N1-2B는 12번째 layer 표현을 쓴다.

System 1은 DiT 변종이다. adaptive layer norm으로 denoising step을 조건화한다. self-attention 블록이 noised action token과 state 임베딩을 처리하고 그 블록들 사이에 cross-attention 블록이 들어가 VLM 토큰을 받는다. Flamingo, VIMA와 같은 계열 구조다. 마지막 DiT 블록 뒤에 embodiment별 Action Decoder MLP가 붙어 H개 토큰을 액션으로 바꾼다.

embodiment마다 state와 action 차원이 다른 문제는 embodiment별 MLP projector로 푼다. π0(Black et al., 2024) 계열은 mixture-of-experts로 VLM과 액션 모델을 잇지만 여기서는 단순 cross-attention을 쓴다. 저자들은 덕분에 VLM과 액션 모델 아키텍처를 자유롭게 고를 수 있다고 말한다.

### flow matching

액션 생성은 flow matching으로 학습한다. ground-truth chunk $A_t$, timestep $\tau \in [0,1]$, noise $\epsilon \sim \mathcal{N}(0,I)$에 대해 $A^\tau_t = \tau A_t + (1-\tau)\epsilon$이고 모델은 $\epsilon - A_t$를 근사하도록 L2 손실을 최소화한다. $\tau$ 샘플링은 $\text{Beta}((s-\tau)/s; 1.5, 1)$, $s=0.999$. 추론은 forward Euler 적분으로 K-step denoising을 실행한다. K=4가 모든 embodiment에서 충분했다. 액션 chunk 길이는 H=16.

### 데이터 생성 세 가지 경로

액션 라벨이 없는 데이터를 쓰려면 라벨을 만들어야 한다. Human egocentric video와 neural trajectory에는 VQ-VAE를 학습해 latent action을 뽑는다. 인코더가 프레임 $x_t$와 $x_{t+H}$를 받아 latent $z_t$를 내고 디코더가 $z_t$와 $x_t$로 $x_{t+H}$를 복원하는 구조다. 학습이 끝나면 인코더를 inverse dynamics model처럼 쓴다. pre-quantized 임베딩을 latent action 라벨로 삼아 "LAPA"라는 별도 embodiment로 취급한다. 모든 이종 데이터에 같은 VQ-VAE를 학습시키니 latent action 공간이 공유된다. 논문 Figure 4를 보면 로봇 8종과 인간 embodiment에서 "오른팔을 왼쪽으로"라는 같은 latent action이 일관되게 대응된다.

Neural trajectory는 image-to-video 생성 모델(Cosmos와 Wan 계열)을 자체 teleoperation 데이터 88시간으로 파인튜닝해 만든다. 초기 프레임과 새 언어 프롬프트를 주면 실제로 수집하지 않은 counterfactual 상황이 나온다. 88시간을 827시간으로, 약 10배 늘렸다. 다양성 확보에는 상용 multimodal LLM을 두 번 쓴다. 먼저 초기 프레임에서 객체를 검출해 물리적으로 가능한 "pick up {object} from {A} to {B}" 조합을 만들게 한다. 다음으로 생성된 비디오를 8프레임으로 다운샘플해 지시를 안 따른 것을 걸러내는 판정자로 쓴다.

trajectory는 observation과 action이 시간순으로 이어진 실행 기록이다. 시뮬레이션 trajectory는 DexMimicGen으로 증식한다. 사람 시연 데이터 수십 개를 객체 중심 subtask로 쪼갠 뒤 객체 위치에 맞춰 변환하고 재생한 다음 end effector와 객체의 상대 pose를 유지한 채 구간을 이어붙인다. 성공한 것만 남긴다. pre-training과 post-training을 합쳐 780,000개 trajectory, 사람 시연 데이터로 환산하면 6,500시간(연속 9개월)에 해당하는 양을 11시간에 만들었다.

### 학습

pre-training은 flow-matching 손실 하나로 전체 코퍼스를 학습한다. Human video는 latent action을 타깃으로 삼는다. GR-1과 OpenX 같은 로봇 데이터에는 실제 액션과 latent action을 같이 쓰고 neural trajectory에는 latent action과 실제 로봇 데이터로 학습한 IDM의 예측 액션을 쓴다. Post-training에서는 embodiment별 데이터로 파인튜닝하며 VL backbone의 language 부분은 계속 frozen이다. Neural trajectory로 증강할 때는 실제 trajectory와 1:1 비율로 co-train한다.

인프라는 NVIDIA OSMO가 관리하는 H100 클러스터다(Quantum-2 InfiniBand fat-tree). Ray 위에 올린 자체 라이브러리로 fault-tolerant 다중 노드 학습을 한다. 단일 모델에 최대 1024 GPU를 쓰고 GR00T-N1-2B pre-training에 약 50,000 H100 GPU 시간이 들었다. 최소 사양도 적어뒀다. A6000 한 장으로 adapter(state encoder, action encoder, action decoder)와 DiT만 튜닝하면 batch size 200까지, vision encoder까지 튜닝하면 16까지 올라간다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### pre-training 코퍼스

실제 로봇 데이터에는 자체 수집한 Fourier GR-1 humanoid 데이터가 들어간다. VIVE Ultimate Tracker로 손목, Xsens Metagloves로 손가락을 잡고 20Hz로 제어하며 atomic/aggregate 2단으로 주석했다. 여기에 OpenX-Embodiment 중 RT-1, Bridge-v2, Language Table, DROID, MUTEX, RoboSet, Plex와 AgiBot-Alpha 140,000개 trajectory를 더했다.

합성 데이터는 RoboCasa 프레임워크 위에 "A를 B에서 C로 재배치" 구조의 태스크를 세우고 source와 target receptacle 조합 54종에 각 10,000개씩, 총 54만 개 시연 데이터를 DexMimicGen으로 만들었다. Neural trajectory는 실제 로봇 3,000샘플(480P 해상도 81프레임)로 100 epoch 파인튜닝한 비디오 모델을 써서 827시간을 만들었다. L40에서 1초 영상에 2분이 걸린다. 3,600장에 약 10만 5천 GPU 시간(1.5일)이 들었다.

Human video는 Ego4D, Ego-Exo4D, Assembly-101, EPIC-KITCHENS, HOI4D, HoloAssist, RH20T-Human 일곱 개다.

### 시뮬레이션

RoboCasa Kitchen 24태스크(Franka Panda), DexMimicGen 9태스크(bimanual Panda 그리퍼, dexterous hand, GR-1 humanoid 3종 embodiment), GR-1 Tabletop 24태스크에서 BC-Transformer와 Diffusion Policy를 비교한다. 태스크당 시연 데이터 100개 기준:

| 모델 | RoboCasa | DexMG | GR-1 | 평균 |
|---|---|---|---|---|
| BC Transformer | 26.3% | 53.9% | 16.1% | 26.4% |
| Diffusion Policy | 25.6% | 56.1% | 32.7% | 33.4% |
| GR00T-N1-2B | 32.1% | 66.5% | 50.0% | 45.0% |

GR-1 태스크의 격차가 17%p를 넘는다. 평가는 100 trial 평균, 마지막 5개 체크포인트 중 최댓값(RoboCasa 프로토콜).

### 실제 로봇

Pre-training 체크포인트만으로 두 태스크를 재봤다. bimanual 태스크는 왼손으로 잡아 오른손에 넘긴 뒤 선반에 놓는 동작인데 여기서 76.6%(11.5/15)가 나왔다. 처음 보는 객체를 처음 보는 컨테이너에 넣는 태스크는 73.3%(11/15)다. 0.5점은 잡기는 했으나 넣지 못한 경우다.

Post-training 비교는 GR-1 humanoid에서 Diffusion Policy를 상대로 한다.

| 모델 | Pick-and-Place | Articulated | Industrial | Coordination | 평균 |
|---|---|---|---|---|---|
| Diffusion Policy (10%) | 3.0% | 14.3% | 6.7% | 27.5% | 10.2% |
| Diffusion Policy (Full) | 36.0% | 38.6% | 61.0% | 62.5% | 46.4% |
| GR00T-N1-2B (10%) | 35.0% | 62.0% | 31.0% | 50.0% | 42.6% |
| GR00T-N1-2B (Full) | 82.0% | 70.9% | 70.0% | 82.5% | 76.8% |

GR00T N1은 데이터 10%만 써도 42.6%다. 전체 데이터로 학습한 Diffusion Policy는 46.4%이니 3.8%p 차이다. 데이터 효율이 그만큼 좋다. 같은 데이터량에서는 10% 구간 32.4%p, full 구간 30.4%p 앞선다.

### neural trajectory ablation

RoboCasa에서 태스크당 3,000개, 실제 로봇에서 100개 neural trajectory를 1:1로 co-train하면 실제 trajectory만 쓴 GR00T N1보다 성공률이 오른다. 30/100/300 데이터 구간에서 각각 +4.2%p, +8.8%p, +6.8%p, 실제 로봇 GR-1 8태스크 평균 +5.8%p.

데이터가 적은 30 구간에서는 LAPA(latent action)가 IDM을 약간 앞서지만 100개와 300개로 갈수록 차이가 벌어진다. IDM 학습 데이터가 늘면 pseudo-action이 실제 액션에 가까워져서라는 설명이다. GR-1은 상대적으로 고데이터 구간이라 실제 로봇 co-training에는 IDM 액션만 썼다.

### 정성 관찰

RoboCasa "Turn Sink Spout"에서 100 샘플 구간 DP가 11.8%, GR00T N1이 42.2%다. DP는 태스크 의미를 자주 혼동한다. pre-training 체크포인트에 "빨간 사과를 바구니에 놓아라"를 주고 사과를 왼손 쪽에 일부러 두면 동작이 다소 거칠긴 해도 왼손으로 집어 오른손에 넘긴 뒤 바구니에 넣는다. 그런데 post-trained 체크포인트는 같은 상황에서 실패한다. post-training 데이터가 전부 오른손 단독이고 손 간 전달이 없어서 그 능력을 잃었다. post-training이 pre-training 단계의 능력을 덮어쓸 수 있다는 사례로 보인다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

현재 모델은 short-horizon 탁상 조작에 초점을 뒀다. long-horizon loco-manipulation으로 넓히려면 하드웨어와 아키텍처, 학습 코퍼스 모두 진전이 필요하다고 적었다. vision-language backbone이 더 강해지면 공간 추론과 언어 이해도 나아진다고 봤다.

합성 데이터의 한계도 명시했다. 비디오 생성과 자동 trajectory 합성이 유망하지만 물리 법칙을 지키면서 다양하고 counterfactual한 데이터를 만드는 일은 여전히 어렵다. 그래서 합성 데이터의 품질과 변동성이 부족하다.

위에서 본 post-training 능력 손실(손 간 전달)은 논문이 정성 관찰로만 다루고 정량 평가는 하지 않았다. 다중 라운드 비디오 생성이나 액체와 관절 객체의 neural trajectory도 예시만 보여주고 downstream 정량 평가는 후속 과제로 남겼다.

## 6. 관련 연구 (Related Work)

로보틱스 foundation model 접근은 크게 두 가지다. 한쪽은 pre-trained 모델을 상위 블랙박스 추론 모듈로 두고 하위 로봇 policy와 붙인다(SayCan, PaLM-E, Code as Policies 계열). 이 방식은 하위 policy와 인터페이스가 이미 있다고 전제한다. 다른 방식은 pre-trained 모델을 로봇 데이터로 파인튜닝해 VLA를 만든다(RT-1, RT-2, π0, OpenVLA, LAPA 등). GR00T N1이 여기 속한다. 계층을 고정하지 않고 배포 태스크를 향해 end-to-end로 최적화하는 접근이다.

데이터 쪽 선행 연구로는 teleoperation 대규모화(AgiBot과 OpenX)와 특수 하드웨어로 로봇 없이 시연 데이터를 모으는 방식(instrumented demonstration)을 짚는다. UMI 그리퍼, exoskeleton, 안경 같은 장치가 여기 속한다. human video로 표현을 pre-training하는 방식, 중간 표현을 매개로 로봇 데이터와 같이 쓰는 방식도 든다. LAPA(Ye et al., 2025)는 human video만으로 latent action pre-training을 해도 downstream 전이가 된다는 것을 보였고 GR00T N1이 그 기법을 가져왔다.

합성 데이터에는 MimicGen과 DexMimicGen 계열 자동 생성과 생성 모델 증강이 있다. 생성 모델 증강은 이전까지 in-painting이나 text-to-image diffusion 수준이었다. 이 논문은 비디오 생성 모델로 trajectory 전체를 만든다. 약 30만 개 neural trajectory, 827시간 규모다.

Embodiment별 projector는 Octo와 유사하지만 Octo는 VLM을 파인튜닝하지 않았다.

## 7. 용어집 (Glossary)

- **VLA (Vision-Language-Action)**: 이미지와 언어 입력에서 로봇 액션을 내는 모델 계열.
- **dual-system**: Kahneman의 System 1/2 구분에서 온 이름. 느린 추론(VLM, 10Hz)과 빠른 반응(DiT, 120Hz)을 분리하되 함께 학습한다.
- **data pyramid**: 웹 데이터와 human video(양이 많고 embodiment 무관), 합성 데이터, 실제 로봇 데이터(양이 적고 embodiment 특수) 순으로 쌓은 학습 코퍼스 구성.
- **flow matching**: noise에서 데이터로 가는 vector field를 학습하고 적분으로 샘플링하는 생성 기법. 여기서는 액션 chunk 생성에 쓴다.
- **action chunk**: 한 번의 추론으로 미래 H스텝 액션을 함께 예측하는 방식. H=16.
- **latent action**: 액션 라벨이 없는 비디오에서 VQ-VAE로 뽑은 동작 표현. 별도 embodiment("LAPA")로 취급해 학습에 넣는다.
- **IDM (inverse dynamics model)**: 연속된 observation에서 그 사이의 액션을 역추정하는 모델. neural trajectory에 pseudo-action을 붙이는 데 쓴다.
- **neural trajectory**: 비디오 생성 모델이 만든 로봇 trajectory 영상. 실제 수집 없이 counterfactual 상황을 늘린다.
- **DexMimicGen**: 사람 시연 데이터 소수를 객체 중심 subtask로 쪼개 변환하고 재생해 시뮬레이션 데이터를 대량 증식하는 시스템.
- **embodiment**: 로봇 형태와 센서, 자유도의 조합. 여기서는 latent action 채널도 하나의 embodiment로 센다.
- **pixel shuffle**: 해상도를 채널로 접어 토큰 수를 줄이는 연산. 프레임당 image token을 64개로 만든다.

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 2 | "Figure 1: Data Pyramid" | page-region | ★ wiki 권장 (concept) |
| fig02 | 3 | "Figure 2: Model Overview" | page-region | ★ wiki 권장 (architecture) |
| fig04 | 4 | "Figure 3: Model Architecture" | page-region | ★ wiki 권장 (architecture 상세) |
| fig07 | 6 | "Figure 4: Latent Actions" | page-region | ★ wiki 권장 (method) |
| fig08 | 7 | "Figure 5: Synthetically Generated Videos" | page-region | ★ wiki 권장 (method) |
| fig09 | 10 | "Figure 6: Data Collection via Teleoperation" | page-region | (선택) |
| fig10 | 11 | "Figure 7: Simulation Tasks" | page-region | (선택) |
| fig12 | 13 | "Figure 8: Real-World Tasks" | page-region | (선택) |
| fig13 | 16 | "Figure 9: Neural Trajectories Ablations" | page-region | ★ wiki 권장 (result) |
| fig16 | 20 | "Figure 10: 시연 데이터 수별 시뮬레이션 성공률" | page-region | ★ wiki 권장 (result) |
| fig19 | 21 | "Figure 11: Pre-training 정성 롤아웃" | page-region | (선택) |
| fig20 | 21 | "Figure 12: Post-training 정성 롤아웃" | page-region | (선택) |
| fig21 | 22 | "Figure 13: neural trajectory 추가 예시" | page-region | (선택) |
| fig22 | 25 | "Figure 14: human egocentric 데이터셋 샘플" | page-region | (선택) |

> 추출 스크립트가 본문 인라인 "Fig. N" 참조까지 잡아 `figures.json`에는 22개 항목이 들어 있다. 위 표는 실제 figure가 있는 페이지만 남긴 것이다 (fig03, fig05, fig06, fig11, fig14, fig15, fig17, fig18은 인라인 참조로 인한 중복 페이지 캡처). page-region 전략상 각 PNG는 해당 페이지 전체이므로 wiki로 옮길 때 크롭을 권한다.
