---
title: "A Comprehensive Survey on World Models for Embodied AI"
type: paper
year: 2025
category: physical-ai
raw_path: /Users/kmyu/Desktop/project/ai-wiki/raw/papers/li-2025-a-comprehensive-survey-on-world.pdf
raw_filename: "li-2025-a-comprehensive-survey-on-world.pdf"
source_collection: external
source: li-2025-a-comprehensive-survey-on-world.md
authors: "Xinqing Li, Xin He, Le Zhang, Min Wu, Xiaoli Li, Yun Liu"
arxiv_id: "2510.16732"
tags: [physical-ai, world-model, robot-learning, autonomous-driving, benchmark]
figures:
  - id: fig02
    file: assets/li-2025-a-comprehensive-survey-on-world/fig02.png
    raw: raw/papers/li-2025-a-comprehensive-survey-on-world-figures/fig02.png
    caption: "서베이 전체 구조와 3축 분류 도해 — 기능(decision-coupled/general-purpose) · 시간(sequential/global) · 공간(GLV/TFS/SLG/DRR) (Figure 1, p.3)"
    page: 3
    strategy: page-region
    curated: true
    note: "wiki/assets 사본은 도식 영역만 재렌더(clip 0.055~0.455, 220 DPI). raw는 전체 페이지 원형 유지"
  - id: fig03
    file: assets/li-2025-a-comprehensive-survey-on-world/fig03.png
    raw: raw/papers/li-2025-a-comprehensive-survey-on-world-figures/fig03.png
    caption: "로보틱스·범용 도메인 대표 world model 56편 분류표 (Table I, p.4)"
    page: 4
    strategy: page-region
    curated: true
  - id: fig04
    file: assets/li-2025-a-comprehensive-survey-on-world/fig04.png
    raw: raw/papers/li-2025-a-comprehensive-survey-on-world-figures/fig04.png
    caption: "자율주행 도메인 대표 world model 32편 분류표 (Table II, p.5)"
    page: 5
    strategy: page-region
    curated: true
  - id: fig05
    file: assets/li-2025-a-comprehensive-survey-on-world/fig05.png
    raw: raw/papers/li-2025-a-comprehensive-survey-on-world-figures/fig05.png
    caption: "데이터 자원 개괄 24종 (Table III, p.12)"
    page: 12
    strategy: page-region
    curated: false
  - id: fig06
    file: assets/li-2025-a-comprehensive-survey-on-world/fig06.png
    raw: raw/papers/li-2025-a-comprehensive-survey-on-world-figures/fig06.png
    caption: "nuScenes 비디오 생성 FID/FVD 비교 18종 (Table IV, p.14)"
    page: 14
    strategy: page-region
    curated: false
  - id: fig07
    file: assets/li-2025-a-comprehensive-survey-on-world/fig07.png
    raw: raw/papers/li-2025-a-comprehensive-survey-on-world-figures/fig07.png
    caption: "Occ3D-nuScenes(Table V) · DMC(Table VI) · RLBench(Table VII) 합본 페이지"
    page: 15
    strategy: page-region
    curated: false
  - id: fig10
    file: assets/li-2025-a-comprehensive-survey-on-world/fig10.png
    raw: raw/papers/li-2025-a-comprehensive-survey-on-world-figures/fig10.png
    caption: "nuScenes open-loop planning L2 오차·충돌률 22종 비교 (Table VIII, p.16)"
    page: 16
    strategy: page-region
    curated: false
---

## 요약 (Summary)

world model 연구는 로보틱스, 자율주행, 범용 비디오 생성 세 갈래로 나뉘어 발전하면서 용어와 분류가 서로 어긋난 상태였다. Nankai 대학 등 5개 기관이 쓴 이 서베이는 세 갈래를 하나의 좌표계에 올린다. 축은 셋이다. 모델이 특정 제어 목표에 얼마나 묶여 있는지(decision-coupled ↔ general-purpose), 미래를 한 스텝씩 펼치는지 한 번에 추정하는지(sequential ↔ global), 장면을 어떤 형식으로 담는지(압축 벡터 / 토큰 / 격자 / 렌더 가능 primitive)다.

이 좌표계로 로보틱스·범용 56편과 자율주행 32편을 표에 찍어 놓은 것이 실질 기여다. 여기에 데이터 자원 24종, 평가 지표 3단계, 표준 벤치마크 5종의 수치 비교가 붙는다. 참고문헌은 262편이고 큐레이션 서지를 [AwesomeWorldModels](https://github.com/Li-Zn-H/AwesomeWorldModels)에 별도로 유지한다.

world model의 범위는 좁게 잡았다. 정적 장면 서술자와 제어 가능한 dynamics를 잡지 않는 순수 생성 비주얼 모델은 대상에서 뺐다. embodied agent에게 실행 가능한 예측을 주는 모델만 다룬다.

## 주요 기여 (Key Contributions)

기존 서베이는 두 방식으로 갈렸다. Ding et al.과 Zhu et al.은 기능과 역량 기준으로 나눴고 Guan et al.·Feng et al.은 자율주행이라는 응용 도메인에 한정했다. 이 서베이의 차별점은 세 축을 세 도메인에 똑같이 적용한다는 데 있다.

정식화는 POMDP다. 실제 상태가 관측되지 않으므로 잠재 상태를 one-step filtering posterior로 추론한다. 뼈대가 되는 분포는 dynamics prior · filtered posterior · reconstruction 셋이다. 로그 가능도를 직접 최대화할 수 없어 ELBO를 대신 쓴다. Markov 분해를 가정하면 ELBO가 재구성 항과 KL 정칙화 항으로 쪼개진다. 여기서 공통 학습 패러다임이 나온다. 가능도 항은 관측을 충실히 예측하게 하고 KL 항은 filtered posterior를 dynamics prior에 맞춘다. recurrent 모델이든 Transformer든 diffusion decoder든 이 구조는 그대로다.

## 방법론 및 아키텍처 (Methodology and Architecture)

![[assets/li-2025-a-comprehensive-survey-on-world/fig02.png]]
*Figure 1: 서베이 구조와 3축 분류 — 기능(decision-coupled/general-purpose) · 시간(sequential/global) · 공간(GLV/TFS/SLG/DRR) (Li 2025, p.3)*

decision-coupled 모델은 dynamics를 특정 제어 목표에 밀착시킨다. 결합도가 높으면 샘플 효율과 closed-loop 성능이 올라가는 반면 학습 분포를 벗어나면 일반화가 약하다. general-purpose 모델은 task-agnostic 시뮬레이터라 전이가 쉽다. 문제는 pretraining 목적과 downstream 제어가 어긋난다는 점이다. 별도 완화 없이는 취약한 행동이 나온다.

시간을 펼치는 방식은 둘로 갈린다. sequential simulation and inference는 autoregressive하게 한 스텝씩 나아간다. 세밀한 제어와 closed-loop 계획에 맞지만 긴 horizon에서 오차가 누적되고 계산량이 rollout 길이에 선형으로 붙는다. global difference prediction은 미래를 병렬로 한 번에 추정한다. 상호작용성이 약해지고 국소 dynamics가 뭉개지는 대신 latency가 줄어든다.

남은 축은 장면을 담는 형식이다. coherence–fidelity–efficiency 삼각형에서 네 전략이 서로 다른 지점을 차지한다.

| 표현 | 방식 | 얻는 것 | 잃는 것 |
|---|---|---|---|
| Global Latent Vector (GLV) | 상태를 압축 벡터 하나로 | 실시간 rollout 효율 | 세밀한 공간 디테일 |
| Token Feature Sequence (TFS) | 토큰 시퀀스 + attention | 세밀한 멀티모달 모델링 | 대용량 데이터·모델·추론 비용 |
| Spatial Latent Grid (SLG) | BEV·voxel 격자 | 국소 위상 보존, multi-view 융합, 지도형 계획 | 메모리 비용, 해상도 제한, 비정형 환경 취약 |
| Decomposed Rendering Representation (DRR) | 3DGS·NeRF 등 렌더 가능 primitive | 기하 일관성, object-level 제어, 고품질 뷰 | 학습 비용, 급격한 dynamics·위상 변화 취약 |

## 3축으로 본 문헌 지도 (Literature Map)

![[assets/li-2025-a-comprehensive-survey-on-world/fig03.png]]
*Table I: 로보틱스·범용 도메인 56편 — 3축 약어, backbone, 데이터 플랫폼, 모달리티, 실제 로봇 검증 여부 (Li 2025, p.4)*

Dec/Seq/GLV 조합은 RSSM 계보가 채운다. PlaNet이 결정적 메모리와 확률 성분을 섞은 RSSM을 세웠고 Dreamer·DreamerV2·DreamerV3가 뒤를 이었다. 파생 연구는 대개 decoder를 손봤는데 Dreaming은 contrastive로 재구성을 없앴고 DreamerPro는 prototype 예측으로 바꿔 시각적 방해 요소에 덜 흔들리게 했다. 최근 흐름의 공통 주제는 전이 가능성이다. PreLAR의 implicit action abstraction, SENSEI의 VLM 유래 semantic reward, ReDRAW의 residual latent 보정이 sim-to-real이라는 같은 문제를 다르게 푼다.

토큰 계열인 Dec/Seq/TFS에서는 MWM이 masked autoencoder로 시각 토큰을 RSSM dynamics에서 떼어냈고 IRIS·TWM은 discrete token으로 데이터 효율적 RL을 했다. LLM과 CoT를 끌어들이는 쪽도 있다. NavCoT는 내비게이션을 imagination·filtering·prediction으로 분해했고 MineDreamer는 Chain-of-Imagination으로 멀티모달 LLM이 미래 관측을 상상해 diffusion을 조종하게 했다.

3D occupancy 예측이 몰린 곳은 Dec/Seq/SLG다. OccWorld·RenderWorld는 장면을 occupancy 토큰으로 이산화해 순차 예측하고 Drive-OccWorld·PreWorld는 volumetric feature를 직접 예보한다. 로보틱스 쪽에서는 EnerVerse가 chunk-wise autoregressive video diffusion과 sparse memory로 4D latent dynamics를 만들고 4DGS로 sim-to-real 간극을 줄인다.

iVideoGPT는 대규모 상호작용 비디오로 action-free 예측을 pretrain했고 Genie는 discrete latent action으로 사용자가 조작할 수 있는 환경을 학습했다. general-purpose 진영은 이렇게 Gen/Seq/TFS와 Gen/Glo/TFS에 몰려 있다. JEPA 계보에서는 V-JEPA가 픽셀 재구성 없이 가려진 시공간 영역의 latent feature를 예측했고 V-JEPA 2가 인터넷 규모로 스케일하며 로봇 데이터로 post-training해 계획까지 갔다. V-JEPA 2.1은 visible·masked 토큰 양쪽에 dense prediction을 걸었다. diffusion 쪽은 Sora가 비디오를 spacetime patch로 통일했고 Cosmos 3가 언어·이미지·비디오·오디오·행동을 mixture-of-transformers로 묶어 omnimodal world model을 Physical AI의 범용 backbone으로 세우려 한다.

![[assets/li-2025-a-comprehensive-survey-on-world/fig04.png]]
*Table II: 자율주행 도메인 32편 — CARLA·nuScenes·Occ3D·OpenDV 등 플랫폼과 입력 모달리티 (Li 2025, p.5)*

자율주행 표에서 눈에 띄는 건 SLG 쏠림이다. 32편 중 절반 이상이 BEV·voxel 격자를 쓴다. 지도형 계획과 multi-view 융합이 필요한 도메인 특성이 그대로 드러난다. 로보틱스 표에서 TFS가 다수인 것과 대비된다.

## 결과 (Results)

nuScenes 비디오 생성에서 시각 충실도는 DrivePhysica가 FID 4.0으로, 시간 일관성은 MiLA가 FVD 14.9로 앞선다. 같은 표의 DriveDreamer(ECCV'24)는 FID 52.6 · FVD 452.0이다. DrivePhysica와 견주면 FID가 열 배 넘게 벌어진다.

Occ3D-nuScenes 4D occupancy forecasting은 과거 2초로 이후 3초를 예측한다. occupancy 입력이 camera-only보다 낫고 GT ego trajectory와 보조 감독을 함께 쓰면 2–3초 구간의 성능 하락이 완화된다. GT ego를 쓴 COME-O가 평균 mIoU 34.23 · IoU 44.13이다. 마지막 프레임을 반복하는 Copy & Paste 베이스라인이 평균 mIoU 11.33이니 세 배가 넘는 차이다.

> 논문 p.14 본문은 COME-O가 mIoU와 per-horizon IoU 양쪽에서 최고라고 적었지만 Table V와 맞지 않는다. mIoU는 34.23으로 실제 최고(차순위 DTT-O 30.85)가 맞으나 IoU 평균은 DTT-O가 74.58로 COME-O의 44.13을 크게 앞선다. 원문 내부 불일치다. IoU 우위 주장은 그대로 받지 않는다.

DMC에서는 500k 스텝의 HRSSM이 3개 과제 평균 938, 1M 스텝의 DisWM이 5개 과제 평균 879를 냈다. RLBench 조작은 VidMan이 18개 과제 평균 성공률 67%로 가장 높고 TesserAct가 10개 과제 63%로 뒤따른다. 두 벤치마크 모두 평가 프로토콜과 과제 부분집합이 구현마다 달라 like-for-like 비교가 어렵다는 단서가 논문에 붙어 있다.

nuScenes open-loop planning에서 평균 L2가 가장 낮은 쪽은 UniAD+DriveWorld의 0.69 m지만 Map·Box·Motion·Tracklet·Occ까지 동원한 대규모 auxiliary supervision이 전제다. 추가 감독 없이 SSR이 L2 0.75 m에 충돌률 0.15%로 최저 충돌을 기록했다. camera 기반이 privileged occupancy를 쓰는 모델을 넘어서기 시작했다는 게 저자들의 관찰이다.

## 한계와 향후 과제 (Limitations and Future Work)

데이터가 파편화돼 있다. embodied AI는 내비게이션·조작·자율주행에 걸쳐 있는데 이를 아우르는 대규모 데이터셋이 없다. 모델 규모가 과제 관련 데이터보다 빨리 커질 때 이 문제가 특히 일반화를 막는다. 멀티 에이전트 상호작용 데이터는 더 부족하다.

지표도 문제다. FID·FVD는 픽셀 충실도에 기울어 물리 일관성이나 dynamics, 인과를 보지 못한다. 그래서 겉보기는 그럴듯하지만 물리 법칙에 어긋나는 rollout이 나온다. EWM-Bench 같은 시도가 있어도 과제에 한정된다. Sora류 비디오 시뮬레이터를 재는 방식과 embodied controller를 재는 방식 사이 간극도 그대로다.

계산 효율은 실시간 제어와 상충한다. Transformer와 diffusion decoder는 성능이 좋지만 추론 비용과 메모리가 온보드 플랫폼의 지연·전력 제약과 충돌한다. 실제 시스템 다수가 여전히 소형 recurrent 모델과 global latent vector에 머무는 이유다. 저자들은 압축 기법과 선형 시간 SSM, 자원에 맞춰 해상도·rollout horizon·모달리티를 조절하는 적응형 설계를 제안한다. 고용량 video diffusion은 오프라인 데이터 생성에 쓰고 온라인 제어에는 경량 코어를 남기라는 역할 분리도 함께 나온다.

모델링에서는 recurrent simulation과 global prediction의 균형이 핵심 난제로 남는다. 향후 방향으로는 Mamba류 SSM, JEPA류 masked prediction, 국소 autoregression과 global 업데이트를 별도 메모리나 계층 계획과 섞는 hybrid 설계를 든다.

## 관련 페이지 (Related Pages)

- [[physical-ai/hou-2026-world-model-for-robot-learning]] — 같은 시기에 나온 자매 서베이. 로봇 학습으로 초점을 좁혀 정책 결합 방식 5분류와 학습된 시뮬레이터 역할로 문헌을 나눈다. 이쪽이 로보틱스를 깊게 다룬다면 Li 2025는 자율주행과 범용 비디오까지 같은 축에 올려 넓게 본다. 두 편을 겹쳐 읽으면 같은 논문이 서로 다른 좌표에 찍히는 걸 볼 수 있다
- [[physical-ai/zhang-2024-vision-and-language-navigation-today]] — world model을 로보틱스·자율주행·범용 비디오가 아니라 navigation 축에서 다룬 자매 서베이. 같은 개념이 세 번째 좌표에서는 history/memory와 generalization 두 challenge로 갈라진다
- [[physical-ai/luo-2025-sonic-supersizing-motion-tracking]] — SONIC은 Table I·II에 없지만 이 분류에 놓으면 decision-coupled 계열의 humanoid 전신 제어에 해당한다
- [[physical-ai/nvlabs-gr00t-wholebodycontrol]] — SONIC 공식 구현. 서베이가 다루지 않는 배포·추론 스택 쪽 자료
- [[overviews/physical-ai-overview]] — physical-ai 카테고리의 분류 기준과 학습 경로 허브
