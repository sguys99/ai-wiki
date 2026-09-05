---
title: "A Comprehensive Survey on World Models for Embodied AI"
type: paper
year: 2025
category: physical-ai
raw_path: raw/papers/li-2025-a-comprehensive-survey-on-world.pdf
raw_filename: "li-2025-a-comprehensive-survey-on-world.pdf"
source_collection: external
authors: "Xinqing Li, Xin He, Le Zhang, Min Wu, Xiaoli Li, Yun Liu"
arxiv_id: "2510.16732"
tags: [physical-ai, world-model, robot-learning, autonomous-driving, benchmark]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/li-2025-a-comprehensive-survey-on-world/fig01.png
    raw: raw/papers/li-2025-a-comprehensive-survey-on-world-figures/fig01.png
    caption: "서베이 전체 구조와 3축 분류 도해 — 기능(decision-coupled/general-purpose) · 시간(sequential/global) · 공간(GLV/TFS/SLG/DRR) (Figure 1, p.3)"
    page: 3
    bbox_norm: [0.0801, 0.0631, 0.9036, 0.4553]
    strategy: caption-region
    curated: true
    note: "wiki/assets 사본은 도식 영역만 재렌더(clip 0.055~0.455, 220 DPI). raw는 전체 페이지 원형 유지"
  - id: tab01
    label: Table I
    kind: table
    file: assets/li-2025-a-comprehensive-survey-on-world/tab01.png
    raw: raw/papers/li-2025-a-comprehensive-survey-on-world-figures/tab01.png
    caption: "로보틱스·범용 도메인 대표 world model 56편 분류표 — Taxonomy 3축 약어, backbone, 데이터 플랫폼, 모달리티, 실제 로봇 검증 여부 (Table I, p.4)"
    page: 4
    bbox_norm: [0.0702, 0.0984, 0.9298, 0.7378]
    strategy: table-region
    curated: true
  - id: tab02
    label: Table II
    kind: table
    file: assets/li-2025-a-comprehensive-survey-on-world/tab02.png
    raw: raw/papers/li-2025-a-comprehensive-survey-on-world-figures/tab02.png
    caption: "자율주행 도메인 대표 world model 32편 분류표 — CARLA·nuScenes·Occ3D·OpenDV 등 플랫폼과 입력 모달리티 (Table II, p.5)"
    page: 5
    bbox_norm: [0.0702, 0.0989, 0.9298, 0.5177]
    strategy: table-region
    curated: true
  - id: tab03
    label: Table III
    kind: table
    file: assets/li-2025-a-comprehensive-survey-on-world/tab03.png
    raw: raw/papers/li-2025-a-comprehensive-survey-on-world-figures/tab03.png
    caption: "데이터 자원 개괄 — 시뮬레이션 플랫폼 5 · 인터랙티브 벤치마크 6 · 오프라인 데이터셋 10 · 실제 로봇 3 (Table III, p.12)"
    page: 12
    bbox_norm: [0.0702, 0.0984, 0.9298, 0.4191]
    strategy: table-region
    curated: false
  - id: tab04
    label: Table IV
    kind: table
    file: assets/li-2025-a-comprehensive-survey-on-world/tab04.png
    raw: raw/papers/li-2025-a-comprehensive-survey-on-world-figures/tab04.png
    caption: "nuScenes 비디오 생성 FID/FVD 비교 18종 — DrivePhysica FID 4.0, MiLA FVD 14.9 (Table IV, p.14)"
    page: 14
    bbox_norm: [0.5, 0.111, 0.9298, 0.3687]
    strategy: table-region
    curated: false
  - id: tab05
    label: Table V
    kind: table
    file: assets/li-2025-a-comprehensive-survey-on-world/tab05.png
    raw: raw/papers/li-2025-a-comprehensive-survey-on-world-figures/tab05.png
    caption: "Occ3D-nuScenes 4D occupancy forecasting(Table V) · DMC(Table VI) · RLBench(Table VII)가 함께 실린 p.15"
    page: 15
    bbox_norm: [0.0702, 0.0984, 0.9298, 0.3951]
    strategy: table-region
    curated: false
  - id: tab06
    label: Table VI
    kind: table
    file: assets/li-2025-a-comprehensive-survey-on-world/tab06.png
    raw: raw/papers/li-2025-a-comprehensive-survey-on-world-figures/tab06.png
    caption: "(중복) fig07과 동일한 p.15 이미지 — Table VI 캡션에 재매칭된 결과"
    page: 15
    bbox_norm: [0.0702, 0.4633, 0.9298, 0.6183]
    strategy: table-region
    curated: false
  - id: tab07
    label: Table VII
    kind: table
    file: assets/li-2025-a-comprehensive-survey-on-world/tab07.png
    raw: raw/papers/li-2025-a-comprehensive-survey-on-world-figures/tab07.png
    caption: "(중복) fig07과 동일한 p.15 이미지 — Table VII 캡션에 재매칭된 결과"
    page: 15
    bbox_norm: [0.5, 0.4633, 0.9298, 0.6183]
    strategy: table-region
    curated: false
  - id: tab08
    label: Table VIII
    kind: table
    file: assets/li-2025-a-comprehensive-survey-on-world/tab08.png
    raw: raw/papers/li-2025-a-comprehensive-survey-on-world-figures/tab08.png
    caption: "nuScenes open-loop planning L2 오차·충돌률 22종 비교 (Table VIII, p.16)"
    page: 16
    bbox_norm: [0.0702, 0.0984, 0.9298, 0.3834]
    strategy: table-region
    curated: false
---

## 한 줄 요약 (One-line Summary)

Embodied AI의 world model 문헌을 3축으로 자른다. 기능(decision-coupled ↔ general-purpose), 시간 모델링(sequential ↔ global), 공간 표현(latent vector / token / grid / rendering)이다. 로보틱스 56편과 자율주행 32편을 이 좌표계 위에 함께 올렸고 데이터 자원과 평가 지표, 벤치마크 수치까지 모았다.

## 1. 자료 정보 (Document Information)

- 제목: A Comprehensive Survey on World Models for Embodied AI
- 저자: Xinqing Li, Xin He, Le Zhang, Min Wu, Xiaoli Li, Yun Liu (교신저자 Yun Liu)
- 소속: Nankai University, Tianjin University of Technology, UESTC, A*STAR I2R (Singapore), SUTD
- arXiv: 2510.16732 (cs.CV), v3는 2026-06-25 개정본이며 본 자료는 v3 기준
- 지원: 중국 국가자연과학기금 62576176, 난카이대 중앙대학 기본연구비 070-63253235
- 큐레이션 서지: https://github.com/Li-Zn-H/AwesomeWorldModels
- 분량: 본문 17페이지 + 참고문헌 262편

## 2. 주요 기여 (Key Contributions)

3축 taxonomy를 제안한다. 그 축으로 로보틱스·자율주행·범용 비디오 세 하위 커뮤니티를 같은 표에 올렸고 데이터 자원과 평가 지표는 3단계 추상 레벨로 정리했다. 표준 벤치마크별 수치 비교도 붙였다.

기존 서베이와 무엇이 다른지는 저자들이 직접 적어 뒀다. Ding et al.은 이해와 예측 두 기능으로 문헌을 나눴고 Zhu et al.은 world model의 핵심 역량을 기준으로 삼았다. Guan et al.과 Feng et al.은 자율주행이라는 응용 도메인에 한정했다. 이 서베이는 decision coupling · temporal modeling · spatial representation 세 축을 세 도메인에 똑같이 적용한다. 앞선 서베이들과 다른 부분이 여기다.

world model의 정의도 좁혀 놓았다. 정적 장면 서술자, 그리고 제어 가능한 dynamics를 잡지 않는 순수 생성 비주얼 모델은 대상에서 뺐다. embodied agent에게 실행 가능한 예측을 주는 모델만 다룬다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### POMDP 정식화

환경 상호작용은 POMDP로 둔다. t=0에 null action a₀를 정의해 dynamics를 균일하게 쓴다. observation은 매 timestep에 에이전트가 받는 센서 입력을 말한다. 실제 상태 sₜ는 직접 관찰되지 않으므로 latent 상태 zₜ를 one-step filtering posterior로 추론한다. latent는 이렇게 겉으로 드러나지 않는 내부 표현 공간을 가리킨다. 기본이 되는 분포는 셋이다.

- Dynamics Prior: p_θ(zₜ | zₜ₋₁, aₜ₋₁)
- Filtered Posterior: q_φ(zₜ | zₜ₋₁, aₜ₋₁, oₜ)
- Reconstruction: p_θ(oₜ | zₜ)

로그 가능도 log p_θ(o₁:T | a₀:T₋₁)는 직접 최대화할 수 없어서 ELBO를 대신 최적화한다. Markov 분해를 가정하면 ELBO가 재구성 항과 KL 정칙화 항으로 쪼개진다. 현대 world model의 공통 학습 패러다임이 여기서 나온다. 가능도 항은 observation을 충실히 예측하게 하고 KL 항은 filtered posterior를 dynamics prior에 맞춘다. recurrent 모델이든 Transformer든 diffusion decoder든 어느 쪽으로 인스턴스화해도 이 구조는 그대로다.

### 축 1 — 기능 (decision coupling)

Decision-coupled 모델은 특정 제어 목표에 dynamics를 밀착시킨다. 샘플 효율과 closed-loop 성능을 얻는 대신 학습 분포를 벗어나면 일반화가 약하다. General-purpose 모델은 목표가 다르다. task-agnostic 시뮬레이터로 시각·물리 현상을 넓게 커버하니 전이는 쉬워진다. 다만 pretraining 목적과 downstream 제어가 어긋나 별도 완화 없이는 취약한 행동이 나온다.

### 축 2 — 시간 모델링

Sequential Simulation and Inference는 미래를 한 스텝씩 autoregressive하게 펼친다. 세밀한 제어와 closed-loop 계획에는 자연스럽다. 대신 긴 horizon에서 오차가 누적되고 계산량이 rollout 길이에 선형으로 붙는다. Global Difference Prediction은 미래 상태를 병렬로 한 번에 추정한다. 시간축 계산이 분산되고 wall-clock latency가 줄어드는 반면 closed-loop 상호작용성이 약해지고 국소 dynamics가 뭉개진다. 잦은 피드백과 정밀한 스텝 제어가 필요한 과제에는 덜 맞는다.

### 축 3 — 공간 표현

네 전략이 coherence–fidelity–efficiency 삼각형의 서로 다른 지점에 놓인다.

| 표현 | 방식 | 얻는 것 | 잃는 것 |
|---|---|---|---|
| Global Latent Vector (GLV) | 상태를 압축 벡터 하나로 | 실시간 rollout 효율 | 세밀한 공간 디테일 |
| Token Feature Sequence (TFS) | 토큰 시퀀스 + attention | 세밀한 멀티모달 모델링 | 대용량 데이터·모델·추론 비용 |
| Spatial Latent Grid (SLG) | BEV·voxel 격자 | 국소 위상 보존, multi-view 융합, 지도형 계획 | 메모리 비용, 해상도 제한, 비정형 환경 취약 |
| Decomposed Rendering Representation (DRR) | 3DGS·NeRF 등 렌더 가능 primitive | 기하 일관성, object-level 제어, 고품질 뷰 | 학습 비용, 급격한 dynamics·위상 변화 취약 |

### 축을 조합한 계보

본문 III장은 Dec/Gen × Seq/Glo × GLV/TFS/SLG/DRR 조합마다 대표 연구를 훑는다.

Dec/Seq/GLV는 RSSM 계보다. 출발점은 PlaNet이다. 결정적 메모리와 확률 성분을 섞은 RSSM을 세웠고 Dreamer·DreamerV2·DreamerV3가 뒤를 이었다. 파생 연구는 대개 decoder를 손봤다. Dreaming은 contrastive로 재구성을 없앴고 DreamerPro는 decoder를 prototype 예측으로 바꿔 시각적 방해 요소에 덜 흔들리게 했다. TransDreamer는 recurrent core를 Transformer로 교체한 TSSM을 냈고 GLAM은 Mamba 기반 병렬 프레임워크로 갔다. 최근 흐름의 공통 주제는 전이 가능성이다. PreLAR의 implicit action abstraction, SENSEI의 VLM 유래 semantic reward, ReDRAW의 residual latent 보정을 통한 sim-to-real 적응이 같은 문제를 서로 다르게 푼다.

토큰 의존성을 축으로 삼는 Dec/Seq/TFS에서는 MWM이 masked autoencoder로 시각 토큰을 RSSM dynamics에서 떼어냈고 IRIS·TWM은 discrete token으로 데이터 효율적 RL을 했다. 자율주행 쪽에서는 DrivingWorld가 next-state와 next-token 예측을 짝지었다. Doe-1은 perception-description-action 토큰의 autoregressive 예측으로 closed-loop 주행을 정식화했다. DrivingGPT는 vision·action 토큰을 교차 배치해 world modeling과 trajectory 계획을 모두 next-token prediction으로 캐스팅했다. LLM/CoT를 끌어들이는 쪽도 있다. NavCoT는 내비게이션을 imagination·filtering·prediction으로 분해했고 MineDreamer는 Chain-of-Imagination으로 멀티모달 LLM이 미래 observation을 상상해 diffusion을 조종하게 했다.

3D occupancy 예측이 몰린 곳은 Dec/Seq/SLG다. OccWorld·RenderWorld는 장면을 occupancy 토큰으로 이산화해 순차 예측하고 Drive-OccWorld·PreWorld는 volumetric feature를 직접 예보한다. 로보틱스로 넘어오면 EnerVerse가 chunk-wise autoregressive video diffusion과 sparse memory로 4D latent dynamics를 만들고 4DGS로 sim-to-real 간극을 줄인다. PointWorld는 장면 상태와 로봇 행동을 3D point flow로 통일해 RGB-D observation에서 MPC 기반 실제 로봇 조작을 돌린다.

ManiGaussian은 현재 상태·행동 조건에서 per-point 변화를 예측해 미래 Gaussian 장면을 만든다. Dec/Seq/DRR 칸을 채우는 3DGS 계열의 출발점이다. ManiGaussian++는 leader-follower 계층 설계로 양팔 조작까지 넓혔다. DreMa는 GS와 물리 시뮬레이터를 붙여 imitation learning용 데이터 합성 디지털 트윈을 만들고 PIN-WM은 3DGS와 미분 가능 물리를 결합해 제한된 observation에서 물리 파라미터를 추정한다.

Gen/Seq/TFS와 Gen/Glo/TFS가 General-purpose 쪽의 중심이다. iVideoGPT는 대규모 상호작용 비디오로 action-free 예측을 pretrain했고 Genie는 discrete latent action과 spatiotemporal token으로 사용자가 조작할 수 있는 인터랙티브 환경을 학습했다. JEPA 계보에서는 V-JEPA가 가려진 시공간 영역의 latent feature를 예측하는 방식으로 픽셀 재구성 없이 표현을 배웠다. V-JEPA 2는 인터넷 규모 비디오로 스케일하며 로봇 상호작용 데이터로 post-training해 계획까지 갔다. V-JEPA 2.1은 visible·masked 토큰 양쪽에 dense prediction을 걸고 deep self-supervision과 image-video tokenizer를 더했다. diffusion 쪽에서는 Sora가 비디오를 spacetime patch로 통일했다. Cosmos 3는 언어·이미지·비디오·오디오·action 시퀀스를 mixture-of-transformers로 묶어 omnimodal world model을 Physical AI의 범용 backbone으로 자리매김하려 한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 데이터 자원

데이터 자원은 네 범주로 나뉜다. 시뮬레이션 플랫폼은 MuJoCo, NVIDIA Isaac(Sim/Gym/Lab), CARLA, Habitat. 인터랙티브 벤치마크는 DMC, Atari(Atari100k 포함), Meta-World 50 tasks, RLBench 100 tasks, LIBERO 130 tasks, nuPlan 1,500시간. 오프라인 데이터셋은 SSv2 220,847 클립, nuScenes 1,000 scene, Waymo 1,150 scene, HM3D 1,000 실내 재구성, RT-1 13만 데모 700+ tasks, Occ3D, OXE(21개 기관·60개 소스·22 embodiment·527 skill·100만+ trajectory), OpenDV 2,059시간 6,510만 프레임, VideoMix22M, VisionMix163M. 실제 로봇은 Franka Emika 7-DoF, Unitree Go1, Unitree G1(최대 43-DoF, 무릎 토크 120 N·m).

### 평가 지표 3단계

- 픽셀 생성 품질: FID, FVD, SSIM, PSNR, LPIPS, VBench(16개 차원)
- 상태 수준 이해: mIoU, mAP, displacement error(ADE/FDE), Chamfer Distance
- 과제 성능: Success Rate, Sample Efficiency, Reward, Collision rate

### 벤치마크 수치

nuScenes 비디오 생성(Table IV, 18종)에서 시각 충실도는 DrivePhysica가 FID 4.0으로, 시간 일관성은 MiLA가 FVD 14.9로 가장 앞선다. 같은 표의 DriveDreamer(ECCV'24)는 FID 52.6 · FVD 452.0이다. DrivePhysica와 견주면 FID가 열 배 넘게 벌어진다.

Occ3D-nuScenes 4D occupancy forecasting(Table V)은 과거 2초 occupancy로 이후 3초를 예측하는 프로토콜이다. occupancy 입력이 camera-only보다 낫고 GT ego trajectory와 auxiliary supervision을 더하면 2–3초 구간의 성능 하락이 완화된다. GT ego를 쓴 COME-O가 평균 mIoU 34.23 · IoU 44.13이다. 비교 기준은 마지막 입력 프레임을 그대로 반복하는 Copy & Paste 베이스라인이다. 이쪽 평균 mIoU가 11.33이다.

다만 논문 p.14 본문의 "COME (with GT ego) achieves the best average mIoU and per-horizon IoU"는 Table V와 어긋난다. mIoU 34.23은 최고가 맞지만(차순위 DTT-O 30.85) IoU 평균은 DTT-O가 74.58로 COME-O의 44.13보다 훨씬 높다. 원문 내부 불일치다.

DMC(Table VI)는 64×64×3 픽셀 observation에서 1,000 스텝 누적 reward를 잰다. 500k 스텝의 HRSSM이 3개 과제 평균 938, 1M 스텝의 DisWM이 5개 과제 평균 879를 냈다. 다만 평가 프로토콜과 과제 부분집합이 제각각이라 일반화를 공정하게 판단하기 어렵다고 논문 스스로 적었다.

RLBench 조작(Table VII)에서는 VidMan이 18개 과제 평균 성공률 67%로 가장 높고 TesserAct가 10개 과제 63%로 뒤따른다. 여기에도 에피소드 예산·해상도·모달리티가 구현마다 달라 like-for-like 비교가 어렵다는 단서가 붙는다.

nuScenes open-loop planning(Table VIII)에서 평균 L2가 가장 낮은 쪽은 UniAD+DriveWorld의 0.69 m다. 다만 Map·Box·Motion·Tracklet·Occ까지 동원한 대규모 auxiliary supervision이 전제다. 추가 감독 없이 SSR이 L2 0.75 m에 충돌률 0.15%로 최저 충돌을 기록했다. 저자들은 camera 기반이 privileged occupancy를 쓰는 모델을 넘어서기 시작했다고 본다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

데이터와 평가부터 보자. embodied AI는 내비게이션·조작·자율주행에 걸쳐 있는데 이를 아우르는 대규모 데이터셋이 없다. 파편화는 모델 규모가 과제 관련 데이터보다 빨리 커질 때 특히 일반화를 막는다. 멀티 에이전트 상호작용 데이터는 더 부족해 협력적 world model 연구가 진척되기 어렵다. 지표 쪽도 사정이 비슷하다. FID·FVD는 픽셀 충실도에 기울어 물리 일관성이나 dynamics, 인과는 보지 못한다. 겉보기는 그럴듯하지만 물리 법칙에 어긋나는 rollout이 나온다. EWM-Bench 같은 시도가 있어도 과제에 한정되고 도메인 간 표준이 없다. Sora류 비디오 시뮬레이터를 재는 방식과 embodied controller를 재는 방식 사이 간극도 그대로다.

계산 효율과 실시간 제어는 서로 상충한다. Transformer와 diffusion decoder는 성능이 좋지만 추론 비용과 메모리가 온보드 로봇 플랫폼의 지연·전력 제약과 충돌한다. 실제 시스템 다수는 여전히 소형 recurrent 모델과 global latent vector에 머문다. 예측 가능한 실시간 동작을 얻는 대신 용량을 줄인다. 저자들이 내놓는 처방은 quantization·pruning·low-rank·sparse 계산 같은 압축, 선형 시간 SSM, 그리고 자원에 따라 해상도·rollout horizon·모달리티를 조절하는 적응형 설계다. 고용량 video diffusion은 오프라인 데이터 생성·시뮬레이션에 쓰고 온라인 제어와 안전 모니터링에는 경량 코어를 남기라는 역할 분리도 함께 제안한다.

모델링 전략에서는 recurrent simulation과 global prediction의 균형이 핵심 난제다. autoregressive는 표현이 압축적이고 샘플도 적게 드는 대신 오차가 쌓인다. global prediction은 multi-step coherence를 개선하지만 계산이 무겁고 closed-loop 상호작용성이 약하다. 공간축에서도 네 표현이 표현력·기하 충실도·계산 비용 사이에서 저마다 다르게 절충한다. 사실적인 비디오·3D 생성 모델이 인과 구조 없이 겉모습의 상관만 잡아 보기에는 그럴듯하나 물리 법칙에 어긋나는 예측을 낸다고 저자들은 거듭 지적한다. 향후 방향으로는 Mamba류 SSM, JEPA류 masked prediction, 그리고 국소 autoregression과 global·masked 업데이트를 별도 메모리나 계층 계획과 섞는 hybrid 설계를 든다.

결론에서 저자들은 앞으로의 진전을 세 흐름으로 본다. 범용 비디오·3D world model의 스케일링, action·reward를 조건으로 학습해 제어와 더 단단히 묶는 일, 인과와 물리에 근거한 목적 함수로 견고성을 높이는 일이다. 벤치마크는 단일 통합형보다 예측 품질과 의사결정, sim-to-real로 옮겼을 때의 안전을 함께 재는 cross-domain 멀티모달 스위트 계열이 나올 것으로 본다.

## 6. 관련 연구 (Related Work)

world model이라는 용어는 Ha와 Schmidhuber가 정착시켰고 Dreamer 계열이 imagination 기반 policy 최적화를 주류로 만들었다. policy는 observation을 받아 다음 action을 정하는 함수를 말한다. 이 서베이는 그 계보 위에 Sora, V-JEPA 2 같은 범용 시뮬레이터 확장을 얹는다. 선행 서베이로는 기능 중심의 Ding et al.·Zhu et al., 자율주행 한정의 Guan et al.·Feng et al.을 인용한다. 인지과학 쪽 근거로는 Clark, Barsalou, Friston의 내부 모델 논의를 든다.

저장소 안 인접 자료로는 같은 physical-ai 카테고리의 [[physical-ai/hou-2026-world-model-for-robot-learning]]이 가장 가깝다. 그쪽은 로봇 학습에 초점을 맞춰 policy 결합 방식 5분류와 학습된 시뮬레이터 역할로 문헌을 나눴다. 이 서베이는 자율주행과 범용 비디오까지 같은 3축에 올린다. [[physical-ai/luo-2025-sonic-supersizing-motion-tracking]]의 SONIC은 Table I·II에는 없지만 이 분류에 놓으면 decision-coupled 계열의 humanoid whole-body control에 해당한다.

## 7. 용어집 (Glossary)

- POMDP: Partially Observable Markov Decision Process. 실제 상태가 직접 관찰되지 않아 latent 상태 추론이 필요한 설정
- ELBO: Evidence Lower Bound. 다루기 힘든 로그 가능도 대신 최적화하는 하한
- RSSM: Recurrent State-Space Model. 결정적 메모리와 확률 성분을 섞은 PlaNet의 latent dynamics 모델
- TSSM: Transformer State-Space Model. RSSM의 recurrent core를 Transformer로 대체
- IDM: Inverse Dynamics Model. 초기 상태에서 목표 상태로 가는 데 필요한 행동을 역으로 추론
- JEPA: Joint-Embedding Predictive Architecture. 픽셀 재구성 없이 latent 공간에서 가려진 영역을 예측
- GLV / TFS / SLG / DRR: 이 서베이의 공간 표현 4분류 (Global Latent Vector / Token Feature Sequence / Spatial Latent Grid / Decomposed Rendering Representation)
- BEV: Bird's-Eye View. 자율주행에서 흔한 조감 격자 표현
- 3DGS / NeRF: 3D Gaussian Splatting / Neural Radiance Fields. 미분 가능 렌더링 기반 장면 표현
- DiT: Diffusion Transformer
- SSM: State Space Model. Mamba가 대표. 선형 시간 복잡도로 긴 시퀀스를 다룸
- S2R: Sim-to-Real. 시뮬레이션에서 학습한 policy를 실제 로봇으로 옮기는 문제
- occupancy: 공간을 voxel로 나눠 free/occupied/unobserved를 라벨링한 3D 표현
- FID / FVD: Fréchet Inception Distance / Fréchet Video Distance. 낮을수록 실제 분포에 가까움
- RLVR: Reinforcement Learning with Verifiable Rewards
- CoT / CoI: Chain-of-Thought / Chain-of-Imagination

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 2 | (오탐) 본문 교차참조가 줄머리에 잡힌 페이지 — 도식 없음 | page-region | — |
| fig02 | 3 | Figure 1 — 서베이 구조 + 3축 분류 전체 도해 | page-region | ★ wiki 권장 (architecture) |
| fig03 | 4 | Table I — 로보틱스·범용 56편 분류표 | page-region | ★ wiki 권장 (taxonomy) |
| fig04 | 5 | Table II — 자율주행 32편 분류표 | page-region | ★ wiki 권장 (taxonomy) |
| fig05 | 12 | Table III — 데이터 자원 개괄 24종 | page-region | ★ wiki 권장 (data) |
| fig06 | 14 | Table IV — nuScenes 비디오 생성 FID/FVD | page-region | (선택) |
| fig07 | 15 | Table V·VI·VII 합본 페이지 (Occ3D / DMC / RLBench) | page-region | (선택) |
| fig08 | 15 | (중복) fig07과 동일 이미지 | page-region | — |
| fig09 | 15 | (중복) fig07과 동일 이미지 | page-region | — |
| fig10 | 16 | Table VIII — nuScenes open-loop planning | page-region | (선택) |

> fig02는 도식이 페이지 상단 절반에 있어 그대로 임베드하면 아래쪽 본문이 함께 들어온다. wiki에 넣을 때 상단만 크롭하는 편이 낫다.
