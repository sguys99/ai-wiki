---
title: "GR00T N1: An Open Foundation Model for Generalist Humanoid Robots"
type: paper
year: 2025
category: physical-ai
source: nvidia-2025-gr00t-n1-an-open-foundation.md
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
    caption: "Data Pyramid — 웹 데이터·human video(하단) → 합성 데이터(중간) → 실제 로봇 데이터(상단)"
    page: 2
    bbox_norm: [0.4949, 0.1393, 0.9006, 0.3219]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/nvidia-2025-gr00t-n1-an-open-foundation/fig02.png
    raw: raw/papers/nvidia-2025-gr00t-n1-an-open-foundation-figures/fig02.png
    caption: "GR00T N1 Model Overview — VLM(System 2) → DiT(System 1) dual-system 개요"
    page: 3
    bbox_norm: [0.0908, 0.0939, 0.9219, 0.3996]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/nvidia-2025-gr00t-n1-an-open-foundation/fig03.png
    raw: raw/papers/nvidia-2025-gr00t-n1-an-open-foundation-figures/fig03.png
    caption: "GR00T N1 Model Architecture — Eagle-2 VLM + cross-attention DiT blocks + embodiment별 state/action encoder"
    page: 4
    bbox_norm: [0.0936, 0.0905, 0.9187, 0.402]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/nvidia-2025-gr00t-n1-an-open-foundation/fig04.png
    raw: raw/papers/nvidia-2025-gr00t-n1-an-open-foundation-figures/fig04.png
    caption: "Latent Actions — 8개 embodiment(로봇·인간)에서 같은 latent action이 같은 동작에 대응"
    page: 6
    bbox_norm: [0.1144, 0.0939, 0.8858, 0.2976]
    strategy: caption-region
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/nvidia-2025-gr00t-n1-an-open-foundation/fig05.png
    raw: raw/papers/nvidia-2025-gr00t-n1-an-open-foundation-figures/fig05.png
    caption: "Synthetically Generated Videos — 동일 초기 프레임에서 프롬프트만 바꿔 만든 counterfactual 궤적"
    page: 7
    bbox_norm: [0.1121, 0.0939, 0.8832, 0.6558]
    strategy: caption-region
    curated: true
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/nvidia-2025-gr00t-n1-an-open-foundation/fig06.png
    raw: raw/papers/nvidia-2025-gr00t-n1-an-open-foundation-figures/fig06.png
    caption: "Data Collection via Teleoperation — Manus Glove+VIVE / Apple Vision Pro / Leap Motion 3안과 retargeting"
    page: 10
    bbox_norm: [0.0924, 0.0522, 0.9819, 0.274]
    strategy: caption-region
    curated: false
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/nvidia-2025-gr00t-n1-an-open-foundation/fig07.png
    raw: raw/papers/nvidia-2025-gr00t-n1-an-open-foundation-figures/fig07.png
    caption: "Simulation Tasks — RoboCasa / DexMimicGen / GR-1 tabletop 3개 벤치마크 예시"
    page: 11
    bbox_norm: [0.0947, 0.0939, 0.9053, 0.3102]
    strategy: caption-region
    curated: false
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/nvidia-2025-gr00t-n1-an-open-foundation/fig08.png
    raw: raw/papers/nvidia-2025-gr00t-n1-an-open-foundation-figures/fig08.png
    caption: "Real-World Tasks — pre-training 평가 2종과 post-training 4범주(pick-and-place·articulated·industrial·coordination)"
    page: 13
    bbox_norm: [0.0871, 0.0885, 0.934, 0.6327]
    strategy: caption-region
    curated: false
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/nvidia-2025-gr00t-n1-an-open-foundation/fig09.png
    raw: raw/papers/nvidia-2025-gr00t-n1-an-open-foundation-figures/fig09.png
    caption: "Neural Trajectories Ablations — RoboCasa 3개 데이터 구간과 실제 로봇 저데이터 구간의 co-training 이득"
    page: 16
    bbox_norm: [0.0867, 0.0863, 0.9056, 0.2996]
    strategy: caption-region
    curated: true
  - id: fig10
    label: Figure 10
    kind: figure
    file: assets/nvidia-2025-gr00t-n1-an-open-foundation/fig10.png
    raw: raw/papers/nvidia-2025-gr00t-n1-an-open-foundation-figures/fig10.png
    caption: "Figure 10 — demonstration 수(30/100/300)별 시뮬레이션 성공률 막대그래프"
    page: 20
    bbox_norm: [0.0947, 0.5483, 0.9053, 0.7471]
    strategy: caption-region
    curated: true
  - id: fig11
    label: Figure 11
    kind: figure
    file: assets/nvidia-2025-gr00t-n1-an-open-foundation/fig11.png
    raw: raw/papers/nvidia-2025-gr00t-n1-an-open-foundation-figures/fig11.png
    caption: "Figure 11 — pre-trained 체크포인트의 좌→우 손 handover 정성 롤아웃"
    page: 21
    bbox_norm: [0.0892, 0.0891, 0.9052, 0.1941]
    strategy: caption-region
    curated: false
  - id: fig12
    label: Figure 12
    kind: figure
    file: assets/nvidia-2025-gr00t-n1-an-open-foundation/fig12.png
    raw: raw/papers/nvidia-2025-gr00t-n1-an-open-foundation-figures/fig12.png
    caption: "Figure 12 — post-trained GR00T N1 vs Diffusion Policy 롤아웃 비교"
    page: 21
    bbox_norm: [0.0872, 0.2567, 0.9052, 0.595]
    strategy: caption-region
    curated: false
  - id: fig13
    label: Figure 13
    kind: figure
    file: assets/nvidia-2025-gr00t-n1-an-open-foundation/fig13.png
    raw: raw/papers/nvidia-2025-gr00t-n1-an-open-foundation-figures/fig13.png
    caption: "Figure 13 — neural trajectory 생성의 4가지 능력(multi-view grid·multi-round·액체·img2img 초기프레임)"
    page: 22
    bbox_norm: [0.1277, 0.088, 0.9792, 0.7739]
    strategy: caption-region
    curated: false
  - id: fig14
    label: Figure 14
    kind: figure
    file: assets/nvidia-2025-gr00t-n1-an-open-foundation/fig14.png
    raw: raw/papers/nvidia-2025-gr00t-n1-an-open-foundation-figures/fig14.png
    caption: "Figure 14 — 사전학습에 쓴 7개 human egocentric video 데이터셋 샘플"
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

## 요약 (Summary)

NVIDIA가 공개한 휴머노이드용 VLA foundation model. Eagle-2 VLM이 10Hz로 상황을 해석하고 flow-matching DiT가 120Hz로 모터 액션을 낸다. 두 모듈을 dual-system으로 묶어 end-to-end로 함께 학습한다.

이 논문의 실질 기여는 아키텍처보다 데이터에 있다. 휴머노이드에는 인터넷 규모 데이터셋이 없고 로봇별 데이터는 서로 호환되지 않는 "데이터 섬"으로 흩어져 있다. GR00T N1은 이 섬들을 data pyramid로 쌓는다. 웹 데이터와 human video가 바닥, 시뮬레이션·비디오 생성 데이터가 중간, 실로봇 teleoperation trajectory가 꼭대기다. trajectory는 observation과 action이 시간순으로 이어진 실행 기록을 말한다. 아래로 갈수록 양이 많고 embodiment 특수성이 낮다.

![[assets/nvidia-2025-gr00t-n1-an-open-foundation/fig01.png]]
*Figure 1: Data Pyramid (NVIDIA 2025, p.2)*

액션 라벨이 없는 하위 계층을 어떻게 학습에 넣느냐가 핵심 문제다. 해법은 두 가지다. VQ-VAE로 추출한 latent action을 별도 embodiment("LAPA")로 취급하거나, 실로봇 데이터로 학습한 IDM으로 pseudo-action을 붙인다. 이렇게 하면 사람 영상과 생성 영상도 로봇 데이터와 같은 손실 함수 아래 들어간다.

공개 범위가 넓다. GR00T-N1-2B 체크포인트, 학습 데이터, 시뮬레이션 벤치마크를 모두 풀었다.

## 주요 기여 (Key Contributions)

VLM 기반 추론 모듈(System 2)과 DiT 기반 액션 모듈(System 1)이 하나의 학습 프레임워크 안에 들어간다. 두 모듈을 느슨하게 이어붙인 파이프라인이 아니라 학습 중 함께 최적화하는 compositional 모델이다.

pre-training은 대규모 일반 데이터로 모델의 기반 능력을 먼저 학습하는 단계다. 여기에는 human video와 시뮬레이션·neural 생성 데이터, 실로봇 데모를 섞어 쓴다.

탁상 단일 팔부터 dexterous hand를 단 휴머노이드까지 한 체크포인트가 커버한다. policy는 observation을 받아 다음 action을 정하는 함수를 말한다. GR00T N1은 단일 가중치로 여러 embodiment를 지원하는 다중 태스크 language-conditioned policy이고 소량 데이터로 post-training하면 새 태스크에 빠르게 적응한다.

## 방법론 및 아키텍처 (Methodology and Architecture)

GR00T-N1-2B는 전체 2.2B 파라미터이고 그중 1.34B이 VLM이다. 16개 액션 chunk를 샘플링하는 데 L40 GPU·bf16에서 63.9ms가 걸린다.

![[assets/nvidia-2025-gr00t-n1-an-open-foundation/fig02.png]]
*Figure 2: GR00T N1 Model Overview (NVIDIA 2025, p.3)*

### System 2, Eagle-2 VLM

SmolLM2 LLM과 SigLIP-2 이미지 인코더에서 파인튜닝해 만든 모델이다. 이미지는 224×224로 인코딩한 뒤 pixel shuffle을 거쳐 프레임당 64개 image token이 된다.

최종 layer 대신 중간 layer 임베딩을 쓰면 추론이 빠르고 downstream 성공률도 높았다. GR00T-N1-2B는 12번째 layer 표현을 쓴다. 실무에서 바로 참고할 만한 대목이다.

### System 1, flow-matching DiT

adaptive layer norm으로 denoising step을 조건화하는 DiT 변종이다. self-attention 블록이 noised action token과 state 임베딩을 처리하고 그 블록들 사이에 cross-attention 블록이 들어가 VLM 토큰을 받는다. 마지막 DiT 블록 뒤에 embodiment별 Action Decoder MLP가 붙어 H개 토큰을 액션으로 바꾼다. 액션 chunk 길이는 H=16이고 추론은 forward Euler 적분으로 K=4 step denoising을 돌린다.

embodiment마다 state·action 차원이 다른 문제는 embodiment별 MLP projector로 푼다. π0 계열은 mixture-of-experts로 VLM과 액션 모델을 잇지만 여기서는 단순 cross-attention을 쓴다. 저자들은 덕분에 VLM과 액션 모델 아키텍처를 자유롭게 고를 수 있다고 말한다.

![[assets/nvidia-2025-gr00t-n1-an-open-foundation/fig03.png]]
*Figure 3: GR00T N1 Model Architecture (NVIDIA 2025, p.4)*

### 라벨 없는 데이터에 라벨 붙이기

Human egocentric video와 neural trajectory에는 VQ-VAE를 학습해 latent action을 뽑는다. 인코더가 프레임 $x_t$와 $x_{t+H}$를 받아 latent $z_t$를 내고 디코더가 $z_t$·$x_t$로 $x_{t+H}$를 복원한다. 학습이 끝나면 인코더를 inverse dynamics model처럼 쓴다.

모든 이종 데이터에 같은 VQ-VAE를 학습시키니 latent action 공간이 공유된다. 로봇 8종과 인간 embodiment에서 "오른팔을 왼쪽으로"라는 같은 latent action이 일관되게 대응된다.

![[assets/nvidia-2025-gr00t-n1-an-open-foundation/fig04.png]]
*Figure 4: Latent Actions — 여러 embodiment에서 같은 latent action이 같은 동작에 대응 (NVIDIA 2025, p.6)*

### 데이터 증식 두 경로

비디오 생성 모델을 자체 teleoperation 88시간으로 파인튜닝해 neural trajectory를 만든다. 초기 프레임과 새 언어 프롬프트를 주면 실제로 수집하지 않은 counterfactual 상황이 나온다. 88시간이 827시간으로 늘었다. 다양성 확보에 상용 multimodal LLM을 두 번 쓴다. 초기 프레임에서 객체를 검출해 물리적으로 가능한 "pick up {object} from {A} to {B}" 조합을 만들게 한다. 그다음 생성된 비디오를 8프레임으로 다운샘플해 지시를 안 따른 것을 걸러내는 판정자로도 쓴다.

![[assets/nvidia-2025-gr00t-n1-an-open-foundation/fig05.png]]
*Figure 5: Synthetically Generated Videos — 같은 초기 프레임에서 프롬프트만 바꾼 counterfactual trajectory (NVIDIA 2025, p.7)*

시뮬레이션 데이터는 DexMimicGen이 담당한다. 사람 데모 수십 개를 객체 중심 subtask로 쪼갠 뒤 객체 위치에 맞춰 변환·재생하고 성공한 것만 남긴다. pre-training과 post-training을 합쳐 780,000개 trajectory를 만들었다. 사람 데모로 환산하면 6,500시간, 연속 9개월에 해당하는 양을 11시간에 확보했다.

### 학습 규모

H100 클러스터에서 단일 모델에 최대 1024 GPU를 쓴다. GR00T-N1-2B pre-training에 약 50,000 H100 GPU 시간이 들었다. 반대쪽 숫자도 논문에 적혀 있다. A6000 한 장으로 adapter와 DiT만 튜닝하면 batch size 200까지, vision encoder까지 튜닝하면 16까지 올라간다.

## 결과 (Results)

### 시뮬레이션

RoboCasa Kitchen 24태스크, DexMimicGen 9태스크, GR-1 Tabletop 24태스크에서 BC-Transformer와 Diffusion Policy를 비교한다. 태스크당 100 데모 기준이다.

| 모델 | RoboCasa | DexMG | GR-1 | 평균 |
|---|---|---|---|---|
| BC Transformer | 26.3% | 53.9% | 16.1% | 26.4% |
| Diffusion Policy | 25.6% | 56.1% | 32.7% | 33.4% |
| GR00T-N1-2B | 32.1% | 66.5% | 50.0% | 45.0% |

GR-1 태스크의 격차가 17%p를 넘는다.

![[assets/nvidia-2025-gr00t-n1-an-open-foundation/fig10.png]]
*Figure 10: 태스크당 데모 수(30/100/300)별 시뮬레이션 성공률 (NVIDIA 2025, p.20)*

### 실로봇

GR-1 휴머노이드에서 Diffusion Policy와 비교한다.

| 모델 | Pick-and-Place | Articulated | Industrial | Coordination | 평균 |
|---|---|---|---|---|---|
| Diffusion Policy (10%) | 3.0% | 14.3% | 6.7% | 27.5% | 10.2% |
| Diffusion Policy (Full) | 36.0% | 38.6% | 61.0% | 62.5% | 46.4% |
| GR00T-N1-2B (10%) | 35.0% | 62.0% | 31.0% | 50.0% | 42.6% |
| GR00T-N1-2B (Full) | 82.0% | 70.9% | 70.0% | 82.5% | 76.8% |

10% 데이터로 학습한 GR00T N1(42.6%)이 전체 데이터로 학습한 Diffusion Policy(46.4%)와 3.8%p 차이다. 데이터 효율이 이 표의 핵심이다.

pre-training 체크포인트만으로도 두 태스크를 재봤다. 왼손으로 잡아 오른손에 넘겨 선반에 놓아야 하는 bimanual 상황에서 76.6%(11.5/15), 처음 보는 객체를 처음 보는 컨테이너에 넣는 상황에서 73.3%(11/15)다.

### neural trajectory co-training

RoboCasa에서 태스크당 3k, 실로봇에서 100개 neural trajectory를 1:1로 co-train하면 실제 trajectory만 쓴 GR00T N1보다 오른다. 30/100/300 데이터 구간에서 각각 +4.2%p, +8.8%p, +6.8%p, 실로봇 GR-1 8태스크 평균 +5.8%p다.

![[assets/nvidia-2025-gr00t-n1-an-open-foundation/fig09.png]]
*Figure 9: Neural Trajectories Ablations (NVIDIA 2025, p.16)*

데이터가 적은 30 구간에서는 LAPA(latent action)가 IDM을 약간 앞선다. 100·300으로 갈수록 차이가 벌어진다. IDM 학습 데이터가 늘면 pseudo-action이 실제 액션에 가까워져서라는 설명이다. GR-1은 상대적으로 고데이터 구간이라 실로봇 co-training에는 IDM 액션만 썼다.

### post-training이 pre-training 능력을 지운 사례

정성 관찰 하나가 기억할 만하다. pre-training 체크포인트에 "빨간 사과를 바구니에 놓아라"를 주고 사과를 왼손 쪽에 일부러 두면, 동작이 다소 거칠긴 해도 왼손으로 집어 오른손에 넘긴 뒤 바구니에 넣는다. 그런데 post-trained 체크포인트는 같은 상황에서 실패한다. post-training 데이터가 전부 오른손 단독이고 손 간 전달이 없어서 그 능력을 잃었다.

논문은 이 관찰을 정량 평가하지 않았다. 그래도 좁은 post-training 데이터가 pre-training이 준 일반화를 덮어쓸 수 있다는 신호로 읽을 만하다.

## 한계 (Limitations)

현재 모델은 short-horizon 탁상 조작에 초점을 뒀다. long-horizon loco-manipulation으로 넓히려면 하드웨어·아키텍처·학습 코퍼스 모두 진전이 필요하다고 적었다.

합성 데이터의 한계도 명시했다. 물리 법칙을 지키면서 다양하고 counterfactual한 데이터를 만드는 일이 여전히 어렵고 그래서 합성 데이터의 품질과 변동성이 부족하다.

## 이 저장소 안에서의 위치 (Position in This Wiki)

GR00T N1은 physical-ai 카테고리에서 VLA 계보의 기준점 역할을 한다. 조작(manipulation) 쪽 dual-system VLA의 원형이다. 이후 NVIDIA 스택이 여기서 갈라져 나간다.

whole-body control 계보와 견주면 분업이 뚜렷하다. whole-body control은 균형과 이동을 포함해 몸 전체를 함께 제어하는 문제다. [[physical-ai/luo-2025-sonic-supersizing-motion-tracking]]과 [[physical-ai/nvlabs-gr00t-wholebodycontrol]]은 휴머노이드의 balance·locomotion·전신 모션을 담당한다. GR00T N1은 그 위에 얹히는 조작 policy를 다룬다. 저장소의 GR00T-WholeBodyControl README가 "GR00T N1.5·N1.6이 Decoupled WBC를 썼다"고 적은 대목이 두 계보의 접점이다. N1은 그 조작 policy의 첫 공개 세대다.

neural trajectory는 world model 논의와 곧바로 이어진다. [[physical-ai/hou-2026-world-model-for-robot-learning]] 서베이는 policy와 world model의 결합 방식을 5분류한다. GR00T N1의 비디오 생성 증강은 그중 latent·IDM 결합에 해당한다. 서베이가 진단한 병목("그럴듯한 미래"에서 "action에 인과적으로 aligned된 실행 가능한 미래"로)이 이 논문의 LAPA 대 IDM 비교와 정확히 같은 문제를 가리킨다. 생성 영상이 그럴듯해도 액션 라벨이 실제 동역학에 aligned되지 않으면 전이가 약해진다.

GR00T N1이 한계로 지목한 "더 강한 vision-language backbone"은 [[llms/cai-2026-vlm3-vision-language-models]]의 논의 대상이다.

## 관련 페이지 (Related Pages)

- [[physical-ai/luo-2025-sonic-supersizing-motion-tracking]] — 같은 NVIDIA GEAR 계열의 전신 모션 트래킹. GR00T N1이 조작을 맡고 SONIC이 whole-body control을 맡는 분업 관계
- [[physical-ai/nvlabs-gr00t-wholebodycontrol]] — SONIC·Decoupled WBC 실행 스택. GR00T N1.5·N1.6이 쓴 컨트롤러 세대가 여기 들어 있다
- [[physical-ai/nvlabs-2026-gear-sonic-project-page]] — GEAR SONIC 프로젝트 페이지
- [[physical-ai/nasiriany-2024-robocasa-large-scale-simulation-of-everyday]] — 이 논문이 세 벤치마크 중 하나로 쓰는 RoboCasa Kitchen의 원 논문. neural trajectory co-training 실험의 30/100/300 데이터 구간도 그쪽 환경 정의 위에서 잰다
- [[physical-ai/hou-2026-world-model-for-robot-learning]] — policy·world model 결합 5분류. GR00T N1의 neural trajectory 증강이 latent·IDM 결합에 해당
- [[llms/chen-2025-eagle-25-boosting-long-context-post-training]] — System 2로 쓰인 Eagle 계열의 다음 세대 기술 보고서. GR00T N1.5의 backbone이 이쪽이다
- [[llms/nvlabs-eagle]] — Eagle 계열 공식 저장소. N1·N1.5·N1.6의 backbone 채택 이력과 model zoo가 있다
- [[physical-ai/jo-2026-groot-n1-5-vla-primer]] — N1.5가 이 논문의 구조에 무엇을 더했는지 정리한 한국어 해설. VLM 교체, FLARE 손실, DreamGen 데이터가 축이다
- [[overviews/physical-ai-overview]] — physical-ai 분류 기준과 학습 경로 허브
