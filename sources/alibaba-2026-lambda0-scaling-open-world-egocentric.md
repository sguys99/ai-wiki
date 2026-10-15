---
title: "λ0: Scaling Open-World Egocentric Human Data for Humanoid Loco-Manipulation"
type: paper
year: 2026
category: physical-ai
raw_path: raw/papers/alibaba-2026-lambda0-scaling-open-world-egocentric.pdf
raw_filename: "alibaba-2026-lambda0-scaling-open-world-egocentric.pdf"
source_collection: external
authors: "humanoid Team, Alibaba Token Hub and Amap (Alibaba Group). Core: Chongyang Xu, Jin Chen, Jinhui Ye, Yilun Chen, Yiming Jiang, Zhao Wu"
arxiv_id: "2610.18950"
url: "https://arxiv.org/abs/2610.18950"
tags: [physical-ai, humanoid, robot-dataset, vla]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/alibaba-2026-lambda0-scaling-open-world-egocentric/fig01.png
    raw: raw/papers/alibaba-2026-lambda0-scaling-open-world-egocentric-figures/fig01.png
    caption: "λ0와 HumanVerse 개요. 왼쪽은 500시간 robot-aligned 전신 사람 데이터와 human-to-humanoid action alignment로 end-effector 위치 오차가 17.03 cm에서 3.83 cm로, 방향 오차가 36.06도에서 10.85도로 줄고 수집 throughput이 약 3.4배가 되는 결과다. 가운데는 egocentric hand-motion pre-training, 전신 사람 데이터 mid-training, 로봇 post-training의 3단계 학습이고, 오른쪽은 사람 데이터 규모에 따른 validation loss 감소와 task progress 59.9%에서 80.4% 상승, 실세계 성공률 62.5%, SIMPLE 성공률 90%다"
    page: 1
    bbox_norm: [0.108, 0.2121, 0.891, 0.5095]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/alibaba-2026-lambda0-scaling-open-world-egocentric/fig02.png
    raw: raw/papers/alibaba-2026-lambda0-scaling-open-world-egocentric-figures/fig02.png
    caption: "HumanVerse 구성. 왼쪽은 PICO 4U 헤드셋, 목에 건 GoPro HERO13, 손목과 발목의 PICO tracker로 이루어진 착용형 수집 장비와 같은 높이에 카메라를 단 G1이다. 가운데 동심원은 과제, 장면, 물체, 자세 분포이고, 오른쪽은 episode 32,993개, pose frame 8,700만 개, 과제 유형 827개, 스킬 18개 이상 통계와 스킬별 episode 수 막대다"
    page: 5
    bbox_norm: [0.0939, 0.0609, 0.9101, 0.3081]
    strategy: manual
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/alibaba-2026-lambda0-scaling-open-world-egocentric/fig03.png
    raw: raw/papers/alibaba-2026-lambda0-scaling-open-world-egocentric-figures/fig03.png
    caption: "로봇 없는 수집에서 로봇 정렬까지의 흐름. 1단계 실세계 장면 선정, 2단계 과제 선정, 3단계 로봇과 같은 시점의 카메라로 과제를 수행하면서 동작을 말로 설명하는 수집, 4단계 시간 동기화, 언어 주석, 신체와 손 동작 복원, observation alignment, action alignment, 품질 검사로 이어지는 큐레이션이다"
    page: 5
    bbox_norm: [0.109, 0.6414, 0.891, 0.7977]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/alibaba-2026-lambda0-scaling-open-world-egocentric/fig04.png
    raw: raw/papers/alibaba-2026-lambda0-scaling-open-world-egocentric-figures/fig04.png
    caption: "HumanVerse의 egocentric 프레임 60장을 12열 5행으로 배열한 예시. 과제, 장면, 물체, 손과 물체 상호작용의 다양성을 보여 주며 데이터 전체의 과제 빈도를 뜻하지는 않는다"
    page: 6
    bbox_norm: [0.0939, 0.3549, 0.9031, 0.5221]
    strategy: manual
    curated: false
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/alibaba-2026-lambda0-scaling-open-world-egocentric/fig05.png
    raw: raw/papers/alibaba-2026-lambda0-scaling-open-world-egocentric-figures/fig05.png
    caption: "동기화된 사람 동작과 egocentric observation 16쌍. 위는 egocentric RGB 프레임이고 아래는 같은 시점의 SMPL 신체 mesh와 MANO 손 동작, 카메라 시야를 나타낸 frustum이다"
    page: 7
    bbox_norm: [0.0939, 0.0649, 0.9011, 0.3071]
    strategy: manual
    curated: false
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/alibaba-2026-lambda0-scaling-open-world-egocentric/fig06.png
    raw: raw/papers/alibaba-2026-lambda0-scaling-open-world-egocentric-figures/fig06.png
    caption: "human-to-humanoid action alignment 3단계. 1단계는 SMPL 사본을 G1 키에 맞게 균일 축소한 뒤 고정된 end-effector 목표에 맞춰 사람 reference를 고치고, 2단계는 관절 제약을 건 오프라인 whole-body IK로 로봇 reference를 고치며, 3단계는 SONIC rollout과 response model을 써서 motion token을 gradient로 N번 갱신한다. 앞의 두 단계는 kinematics 수준, 마지막 단계는 dynamics 수준 보정이다"
    page: 7
    bbox_norm: [0.0989, 0.6329, 0.9611, 0.8631]
    strategy: manual
    curated: true
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/alibaba-2026-lambda0-scaling-open-world-egocentric/fig07.png
    raw: raw/papers/alibaba-2026-lambda0-scaling-open-world-egocentric-figures/fig07.png
    caption: "λ0의 3단계 학습. (a) 7개 egocentric 데이터셋으로 Qwen3.5-2B backbone이 미래 손 상태 토큰을 예측하는 pre-training, (b) HumanVerse를 SONIC과 MuJoCo로 G1 형식으로 바꿔 backbone과 action expert가 motion token과 손 명령을 예측하는 mid-training, (c) 실제 G1 시연 데이터로 SONIC controller를 구동하는 post-training이다"
    page: 9
    bbox_norm: [0.0939, 0.0649, 0.9011, 0.2681]
    strategy: manual
    curated: true
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/alibaba-2026-lambda0-scaling-open-world-egocentric/fig08.png
    raw: raw/papers/alibaba-2026-lambda0-scaling-open-world-egocentric-figures/fig08.png
    caption: "정렬된 사람 시연만으로 학습한 policy의 task progress. 왼쪽 EgoHumanoid-V2 전신 과제 4개는 alignment 전후로 Close laptop 0에서 53.33, Open fridge 0에서 38.33, Pull curtain 28.33에서 53.33, Close drawer 56.67에서 61.67로 오르고, 오른쪽 EgoAlign 장거리 과제 3개는 alignment 후 73.2, 76.3, 79.2다. N/R은 alignment 전 점수 미보고다"
    page: 10
    bbox_norm: [0.0939, 0.4449, 0.9031, 0.5941]
    strategy: manual
    curated: true
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/alibaba-2026-lambda0-scaling-open-world-egocentric/fig09.png
    raw: raw/papers/alibaba-2026-lambda0-scaling-open-world-egocentric-figures/fig09.png
    caption: "사람 시연과 로봇 시연의 성능과 수집 노동 비교. 왼쪽은 과제당 시연 수에 따른 평균 과제 점수로 로봇 시연 50개가 60.0%, 사람 시연 200개가 53.3%다. 오른쪽은 시연 1개당 수집 노동으로 사람 33.30 인초, 로봇 140.85 인초다"
    page: 10
    bbox_norm: [0.1835, 0.6609, 0.8206, 0.7913]
    strategy: caption-region
    curated: true
  - id: fig10
    label: Figure 10
    kind: figure
    file: assets/alibaba-2026-lambda0-scaling-open-world-egocentric/fig10.png
    raw: raw/papers/alibaba-2026-lambda0-scaling-open-world-egocentric-figures/fig10.png
    caption: "실세계 데이터 수집과 평가 구성. (a) PICO 4U, tracker, HexaCercle 장갑, GoPro로 G1과 BrainCo 손을 원격 조작하는 장비, (b) Toy Storage, Box Transport, Bottle Disposal, Chair Placement의 네 loco-manipulation 과제, (c) 로봇 시연에 나온 물체와 나오지 않은 물체다"
    page: 11
    bbox_norm: [0.0939, 0.3729, 0.9061, 0.5831]
    strategy: manual
    curated: false
  - id: fig11
    label: Figure 11
    kind: figure
    file: assets/alibaba-2026-lambda0-scaling-open-world-egocentric/fig11.png
    raw: raw/papers/alibaba-2026-lambda0-scaling-open-world-egocentric-figures/fig11.png
    caption: "사람 데이터 규모에 따른 validation loss. (a) 5%, 10%, 25%, 50%, 100% 데이터로 10만 update 학습한 곡선으로 작은 데이터는 일찍 최소점에 닿은 뒤 loss가 다시 오른다. (b) 데이터 비율별 최소 validation loss와 로그 선형 적합으로 representative와 clean holdout이 비슷한 기울기로 감소한다"
    page: 12
    bbox_norm: [0.0979, 0.4769, 0.9011, 0.6571]
    strategy: manual
    curated: true
  - id: fig12
    label: Figure 12
    kind: figure
    file: assets/alibaba-2026-lambda0-scaling-open-world-egocentric/fig12.png
    raw: raw/papers/alibaba-2026-lambda0-scaling-open-world-egocentric-figures/fig12.png
    caption: "Stage II 사람 데이터 비율에 따른 실세계 평균 task progress. 0%, 5%, 10%, 25%, 50%, 100%에서 59.9%, 64.2%, 67.3%, 72.1%, 76.4%, 80.4%로 단조 증가한다"
    page: 13
    bbox_norm: [0.5475, 0.2413, 0.8842, 0.377]
    strategy: caption-region
    curated: true
  - id: fig13
    label: Figure 13
    kind: figure
    file: assets/alibaba-2026-lambda0-scaling-open-world-egocentric/fig13.png
    raw: raw/papers/alibaba-2026-lambda0-scaling-open-world-egocentric-figures/fig13.png
    caption: "사람 시연을 통한 일반화. 네 실세계 과제마다 Seen(로봇 시연에 있던 물체 A), Human-guided(사람 시연에만 있던 물체 B), Robot-only(사람 데이터 없이 학습한 policy로 B 평가)의 weighted progress를 다섯 방법별로 비교한다"
    page: 14
    bbox_norm: [0.0939, 0.0649, 0.9031, 0.2521]
    strategy: manual
    curated: true
  - id: tab01
    label: Table 1
    kind: table
    file: assets/alibaba-2026-lambda0-scaling-open-world-egocentric/tab01.png
    raw: raw/papers/alibaba-2026-lambda0-scaling-open-world-egocentric-figures/tab01.png
    caption: "실세계 과제 성능. 네 과제의 10회 성공 수와 weighted progress로 λ0가 25/40 성공, 평균 progress 80.4%로 π0.5, GR00T N1.6, Ψ0, StarVLA를 앞선다"
    page: 12
    bbox_norm: [0.0979, 0.1439, 0.9021, 0.2631]
    strategy: manual
    curated: true
  - id: tab02
    label: Table 2
    kind: table
    file: assets/alibaba-2026-lambda0-scaling-open-world-egocentric/tab02.png
    raw: raw/papers/alibaba-2026-lambda0-scaling-open-world-egocentric-figures/tab02.png
    caption: "SIMPLE 과제 성능. 6개 과제를 Level 0~2에서 10회씩 평가한 성공률로 λ0가 전체 90.0%로 StarVLA 86.1%, Ψ0 85.6%, ACT 82.8%보다 높다"
    page: 12
    bbox_norm: [0.109, 0.7871, 0.891, 0.9207]
    strategy: table-region
    curated: true
  - id: tab03
    label: Table 3
    kind: table
    file: assets/alibaba-2026-lambda0-scaling-open-world-egocentric/tab03.png
    raw: raw/papers/alibaba-2026-lambda0-scaling-open-world-egocentric-figures/tab03.png
    caption: "로봇 지도를 고정한 학습 단계 ablation. Stage I과 Stage II를 각각 또는 함께 뺐을 때 SIMPLE 성공률과 실세계 성공률, progress를 비교하며 Stage II 제거의 영향이 가장 크다"
    page: 13
    bbox_norm: [0.147, 0.549, 0.853, 0.6433]
    strategy: table-region
    curated: true
  - id: tab04
    label: Table 4
    kind: table
    file: assets/alibaba-2026-lambda0-scaling-open-world-egocentric/tab04.png
    raw: raw/papers/alibaba-2026-lambda0-scaling-open-world-egocentric-figures/tab04.png
    caption: "egocentric 사람 데이터 자원 비교. EgoDex, HOT3D, NymeriaPlus, EgoHumanoid, EgoScale, Index, EgoSuite-Open100K와 HumanVerse의 시간, 신체와 손 범위, SMPL 호환성, humanoid 인터페이스, 수집 장비를 정리한다"
    page: 20
    bbox_norm: [0.1581, 0.2661, 0.8415, 0.5578]
    strategy: table-region
    curated: false
  - id: tab05
    label: Table 5
    kind: table
    file: assets/alibaba-2026-lambda0-scaling-open-world-egocentric/tab05.png
    raw: raw/papers/alibaba-2026-lambda0-scaling-open-world-egocentric-figures/tab05.png
    caption: "가장 가까운 humanoid VLA와 world-action 연구의 문제 수준 비교. WholeBodyVLA, EgoHumanoid, Ψ0, OpenHLM, ω-0, λ0의 사람 데이터 신호, 학습 내 역할, 통제한 규모, 핵심 질문을 나란히 놓는다"
    page: 20
    bbox_norm: [0.109, 0.6948, 0.8929, 0.8991]
    strategy: table-region
    curated: false
  - id: tab06
    label: Table 6
    kind: table
    file: assets/alibaba-2026-lambda0-scaling-open-world-egocentric/tab06.png
    raw: raw/papers/alibaba-2026-lambda0-scaling-open-world-egocentric-figures/tab06.png
    caption: "2B 모델의 기본 학습 일정. Stage I은 20만 update로 backbone만, Stage II는 10만 update로 backbone, action expert, 사람 데이터 projection을, Stage III는 5만 update로 backbone, action expert, 로봇 인터페이스를 갱신한다"
    page: 21
    bbox_norm: [0.1988, 0.7843, 0.8012, 0.8581]
    strategy: table-region
    curated: false
  - id: tab07
    label: Table 7
    kind: table
    file: assets/alibaba-2026-lambda0-scaling-open-world-egocentric/tab07.png
    raw: raw/papers/alibaba-2026-lambda0-scaling-open-world-egocentric-figures/tab07.png
    caption: "실세계 평가의 단계별 채점 정의. 네 과제마다 접근, grasping, 들어올리기, 운반, 배치, 해제 등 7단계에 점수를 매겨 합 100점을 만들고, 최종 성공 조건이 3초 유지되어야 성공으로 친다"
    page: 24
    bbox_norm: [0.1181, 0.1285, 0.8819, 0.4295]
    strategy: table-region
    curated: false
---

## 한 줄 요약 (One-line Summary)

Alibaba Token Hub와 Amap 팀이 egocentric 영상과 동기화된 전신 및 손 동작을 묶은 500시간 사람 데이터셋 HumanVerse와, 이를 Unitree G1 형식으로 바꾸는 human-to-humanoid alignment 파이프라인을 만들고, 그 데이터를 mid-training에 쓰는 humanoid loco-manipulation VLA λ0를 제안했다. 사람 데이터를 늘릴수록 실세계 task progress가 59.9%에서 80.4%로 단조 증가했고, λ0는 SIMPLE 90.0%, 실세계 네 과제 62.5% 성공률을 기록했다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 제목 | λ0: Scaling Open-World Egocentric Human Data for Humanoid Loco-Manipulation |
| 저자 | humanoid Team, Alibaba Token Hub와 Amap (Alibaba Group). 핵심 기여자 Chongyang Xu, Jin Chen, Jinhui Ye, Yilun Chen(Project Lead), Yiming Jiang, Zhao Wu. 감독 Mu Xu, Steven Hoi |
| 공개 | arXiv 2610.18950v1 (cs.RO), 2026년 10월 13일 |
| 코드 | github.com/LambdaHumanoid/openlambda |
| 홈페이지 | lambdahumanoid.github.io |
| 대상 로봇 | Unitree G1 humanoid, BrainCo Revo2 손 |
| 분량 | 본문 14쪽, 부록 포함 24쪽 |

이름의 λ는 한자 "人"(사람)을 닮은 글자로, 일상의 사람 경험에서 배운다는 의도를 담았다고 저자들은 설명한다.

## 2. 주요 기여 (Key Contributions)

- **human-to-humanoid alignment 파이프라인**: 로봇 없이 사람 시연을 수집하고, observation(카메라 시점과 팔 외형)과 action(motion reference와 controller 입력)을 G1에 맞게 오프라인으로 보정한다. 대상 과제의 로봇 시연 없이 G1 zero-shot 전이로 전신 과제 평균 51.7%, 장거리 과제 평균 76.2% progress를 얻었다.
- **HumanVerse 데이터셋**: 500시간, episode 32,993개, pose frame 8,700만 개, 과제 유형 827개. egocentric 영상과 동기화된 신체 및 손 동작을 실세계 장면과 과제에 걸쳐 묶는다.
- **λ0 모델**: egocentric hand-motion pre-training, HumanVerse 기반 전신 사람 데이터 mid-training, 로봇 post-training의 3단계로 사람 상호작용 경험을 humanoid 제어로 점진 적응시킨다. 전신 사람 데이터 규모를 키우면 downstream loco-manipulation 성능이 오른다는 것을 보였다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 문제 설정

humanoid loco-manipulation은 locomotion, 자세, manipulation을 함께 조율하는 시연 데이터(demonstration)를 요구한다. 전신 teleoperation은 로봇을 한 대씩 사람이 움직여야 하므로 과제와 환경 범위를 넓히는 비용이 크다. egocentric 영상에서 손목과 손 trajectory를 복원하는 기존 방법은 manipulation pre-training에는 도움이 되지만, humanoid에 필요한 걷기와 자세 변화를 담지 못한다. 신체와 손 동작을 함께 녹화해도 retargeting과 whole-body tracking 과정에서 기하 불일치와 실행 오차가 end-effector 오차로 남아 grasping와 접촉을 망칠 수 있다. 저자들의 중심 질문은 "egocentric 전신 사람 경험이 humanoid로 전이 가능하면서 대규모로 수집 가능한 지도 신호가 될 수 있는가"다.

### 3.2 데이터 수집 장비와 절차

| 구성 | 사양과 역할 |
|---|---|
| 카메라 | GoPro HERO13. 같은 카메라를 G1 머리에도 장착한다 |
| 카메라 높이 | 목걸이형 마운트로 사람 카메라 높이를 로봇 카메라 높이에 맞춘다 |
| 신체 동작 | PICO 4 Ultra 헤드셋과 body tracker로 24관절 신체 kinematics를 기록한다 |
| 손 동작 | 같은 영상에서 Dyn-HaMR로 손당 21관절을 복원한다 (카메라 움직임은 ViPE로 추정) |
| 음성 | 수집자가 동작을 말로 설명하고, GoPro 오디오를 전사해 episode 단위 언어 및 과제 라벨을 만든다 |

수집자는 관절 trajectory가 아니라 활동 수준의 프롬프트(예: "Clean the bench")만 받는다. 따라서 걷는 경로, 초기 자세, 물체 인스턴스, 배치, grasping 전략, 중간 수정이 자연스럽게 달라진다. 각 episode는 최종 손 동작만이 아니라 접근, 위치 조정, 전환 동작까지 보존한다. 수집은 현장에 로봇 없이 일상 장소에서 진행되며 운반, 정리, 청소, 물체와 설비 조작에 집중한다. 원본 스트림, 수집자와 세션 식별자, 활동 라벨, 캘리브레이션, 장비 상태 기록을 보존하고, 현장 점검으로 중단, 모달리티 누락, 캘리브레이션 실패를 표시한다.

### 3.3 데이터셋 범위

HumanVerse는 500시간 동기화 egocentric 전신 코퍼스만을 가리킨다. 외부 손과 물체 데이터셋과 로봇 시연 데이터는 시간 집계와 scaling 부분집합에서 제외된다. 500시간은 변환과 유효성 필터링 이전의 녹화 기준이다.

| 통계 | 값 |
|---|---|
| 총 시간 | 500시간 |
| episode | 32,993개 |
| pose frame | 8,700만 개 |
| 과제 유형 | 827개 |
| 스킬 | 18개 이상 |

장면은 가정, 소매점과 슈퍼마켓, 산업 현장, 사무실, 실외를 포함한다. 활동은 청소, 요리, 개인 위생, 세탁, 식탁 차리기, 대형 물체 운반 등이다. 예를 들어 높이가 다른 물체와 상호작용하면 허리를 굽히거나 팔을 뻗어야 하고, 물체 운반은 걷기와 지속적 grasping를 함께 요구한다. Figure 2의 분포에 따르면 과제는 기타 1,213, 개인 위생 288, 소매 및 진열 531, 장치 조작 1,203, 대형 물체 운반 465, 실외 14, 세탁 314, 식탁 차리기 736, 장난감 및 조립 1,275 episode 등이다. 물체는 가전 931, 청소 용품 563, 공구 490, 조리 도구 444, 식물 437이다. 자세 분포는 서 있기 75.4%, 한 손 74.7%, 걷기 17.1%, 두 손 17.0%이며, 스킬별 episode 수는 pick and place 15,740개가 가장 많다.

### 3.4 동작 복원과 주석

- **시간 동기화**: GoPro와 PICO는 독립 시계를 쓴다. episode마다 t_pico = t_gopro + Δ 오프셋을 두고, GoPro 자이로스코프 측정값과 tracker에서 얻은 신체 각속도를 교차상관해 오프셋을 정밀화한다. 이후 영상과 신체 자세를 공통 타임라인으로 재표본화하고 동기화 품질을 진단값으로 남긴다.
- **좌표 표현**: 손 trajectory는 재투영용 현재 카메라 좌표와, 첫 유효 카메라 자세에 고정한 episode 좌표 두 가지로 저장한다. 손가락 기하는 손목 기준, 손바닥 정렬, 크기 정규화 좌표로 표현한다.
- **주석 기록**: 원본 프레임 인덱스, 좌표 변환, 변환 버전, 트랙별 가시성, 추정기 신뢰도를 남긴다. 신체와 손 유효성 마스크를 분리해, 손이 가려져도 신체 동작은 살리고 빠진 자세는 보간하지 않는다.
- **분할**: 녹화 세션 단위로 먼저 나눈 뒤 시간 창을 추출한다. 하류 post-training용 과제 특화 사람 시연은 이 코퍼스와 분리하고, 사람 데이터 선택은 humanoid 평가 목록을 참조하지 않는다.

### 3.5 human-to-humanoid alignment

**action alignment**는 세 단계로 진행한다. humanoid는 SONIC 같은 tracking policy로 전신 동작을 실행하는데, GMR 같은 retargeting으로 얻은 reference나 사람 동작을 SONIC으로 실행한 결과에는 end-effector 자세 오차가 남는다. 기하 불일치는 reference를, controller tracking은 실행을 오염시킨다. end-effector 목표는 모든 단계에서 고정한다.

| 단계 | 대상 | 방법 |
|---|---|---|
| 1. human-reference alignment | 사람 reference | SMPL 사본을 G1 키로 균일 축소하고, end-effector가 고정 목표에 맞도록 자세를 조정한 뒤 그 보정을 사람 reference에 적용한다. SONIC rollout으로 더 잘 맞는 G1 동작을 얻는다 |
| 2. robot-reference alignment | 로봇 reference | 축소한 SMPL 골격과 G1 신체 기하의 차이로 남은 오차를, G1 kinematic 모델 기반의 관절 제약 오프라인 whole-body IK로 보정한다. 보정된 reference를 다시 인코딩해 token을 재생한다 |
| 3. dynamics-aware optimization | controller 입력 | kinematic 보정으로 해결되지 않는 실행 dynamics 오차를, rollout 피드백과 response model이 안내하는 gradient 기반 갱신으로 motion token을 직접 최적화한다. 여러 차례 token 갱신과 rollout을 반복한다 |

데이터 생산 시에는 세 단계 중 가장 좋은 유효 결과를 고르고, 개선이 없으면 원래 사람 자세의 SONIC rollout을 대체값으로 쓴다. 뒤의 두 단계를 50개 과제(약 1시간 데이터)에서 검증한 결과, 과제 평균 end-effector 위치 오차가 17.03 cm에서 3.83 cm로(77.5% 감소), 방향 오차가 36.06도에서 10.85도로(69.9% 감소) 줄었다.

**observation alignment**는 시점과 외형을 맞춘다. 같은 카메라 모델과 같은 촬영 높이로 시점 차이를 줄이고, SAM2로 사람 팔뚝과 손목 PICO tracker를 마스킹한 뒤 DiffuEraser로 그 영역을 inpainting한다. 이어 정렬된 관절 위치로 G1 팔을 렌더해 사람 손목과 팔뚝에 맞추고 inpainting된 프레임에 합성한다. 장면과 상호작용은 보존된다. 사람과 humanoid의 몸 움직임 차이로 시점이 여전히 다를 수 있어, 학습 시 random resized crop, 작은 회전, photometric jitter를 적용한다. 배포된 policy는 humanoid 이미지를 그대로 쓴다.

### 3.6 λ0 아키텍처와 action 인터페이스

λ0는 Qwen3.5-2B vision-language backbone에 생성형 action expert를 결합한다. Stage II와 III에서 policy는 egocentric 이미지, 언어 지시문(instruction), 현재 상태를 입력받는다.

| 요소 | 정의 |
|---|---|
| G1 상태 | 44차원: 신체 관절 위치 29, 손 명령 양쪽 6씩 12, projected gravity 3 |
| 상태 입력 방식 | π0.5를 따라 각 정규화 스칼라를 [-1, 1] 구간의 256개 균일 bin으로 이산화해 텍스트로 지시문 뒤에 붙인다 |
| action chunk | 50 step. step마다 64차원 SONIC motion latent와 6차원 Revo2 손 명령 2개, 총 76차원 |
| Stage I 출력 | backbone만으로 미래 양손 손 상태 토큰을 예측한다 (action expert 없음) |
| 손 상태 | 손당 3D 손목 위치, 6D 회전, 손목 외 20관절의 3D 좌표(60차원). 양손 합계 138차원 |
| 도메인 분리 | 사람 유래 데이터와 G1 데이터는 같은 상태와 action 형식을 쓰되 도메인 식별자와 입출력 projection을 분리한다 |
| 교차 도메인 전이 | X-VLA를 따라 embodiment 조건 soft prompt 32개 토큰과 학습된 embodiment bias를 쓴다 |

backbone의 층별 feature가 action expert의 각 층을 조건화한다. 사람 데이터의 G1 형식은 closed-loop free-base G1 rollout으로 29개 관절 위치와 projected gravity를 얻고, 손 retargeting으로 Revo2 명령을 얻는다. SIMPLE 같은 다른 embodiment는 고유 상태와 구동기 블록을 유지하고 collation 시점에만 padding한다.

### 3.7 3단계 학습

| 단계 | 데이터 | 학습 대상 | update 수 |
|---|---|---|---|
| Stage I: egocentric hand-motion pre-training | 공개 egocentric 손과 물체 데이터 7종 (EgoDex, EgoVerse, HO-Cap, HOI4D, HoloAssist, HOT3D, VITRA-1M) | vision-language backbone | 20만 |
| Stage II: egocentric 전신 사람 mid-training | HumanVerse를 G1 형식으로 변환한 데이터 | backbone, action expert, 사람 데이터 projection | 10만 |
| Stage III: 로봇 post-training | 실제 G1 시연 데이터 | backbone, action expert, 로봇 인터페이스와 조건화 | 5만 |

Stage I은 데이터셋을 사용 가능한 프레임 수의 제곱근에 비례해 표본추출해 작은 데이터셋의 비중을 높인다. 손 자세 지도는 원래 정답 주석이나 오픈소스 방법의 의사 라벨에서 온다. VITRA-1M은 Ego4D, EPIC-KITCHENS, Ego-Exo4D, Something-Something V2의 활동도 인덱싱한다. Stage I 설정은 batch size 1024, learning rate 10^-5, backbone learning rate 배율 0.1이다. Stage II는 Stage I의 EMA checkpoint로 backbone을 초기화하고 action expert를 새로 도입하며, Stage III는 Stage II의 EMA checkpoint에서 시작한다. EMA decay는 0.999다.

### 3.8 학습 목표와 배포

Stage II와 III는 π0.5를 따른 flow matching을 쓴다. flow matching은 가우시안 noise에서 목표 action으로 가는 velocity field를 학습해, 추론 때 그 field를 적분해 action을 생성하는 방법이다. noise가 섞인 action은 x_s = (1 - s)ε + s a이고, 목표 velocity는 a - ε다. masked velocity-field loss는 유효하고 prefix가 아닌 스칼라 목표에 대해서만 제곱 velocity 오차를 평균한다. 주석 누락, padding, action prefix는 마스크로 제외되며 action 블록 재가중은 하지 않는다.

real-time chunking(RTC)을 위해 학습 표본의 절반은 prefix 없이, 나머지는 최대 8 step의 유효 prefix를 noise 없이 고정해 loss에서 제외한다. observation마다 noise 실현 4개를 쓴다. 추론은 가우시안 noise에서 10 Euler step으로 action을 만든다.

배포 시 λ0는 G1의 egocentric 이미지, 지시문, proprioceptive 상태와 로봇 도메인 식별자를 받는다. 예측한 64차원 motion token이 SONIC whole-body controller를, 6차원 손 명령 2개가 Revo2 손을 구동한다. 배포에는 사람 동작 스트림이 필요 없다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 정렬된 사람 데이터만으로의 zero-shot 전이

대상 과제의 로봇 시연 없이, 과제 특화 사람 시연만으로 학습한 policy를 G1에서 평가했다. 부분 완료 점수를 포함한다.

| 과제군 | 과제 | alignment 전 | alignment 후 |
|---|---|---|---|
| EgoHumanoid-V2 전신 | Close laptop | 0 | 53.33 |
| | Open fridge | 0 | 38.33 |
| | Pull curtain | 28.33 | 53.33 |
| | Close drawer | 56.67 | 61.67 |
| EgoAlign 장거리 | Object relocation | 0 | 73.2 |
| | Navigation | N/R | 76.3 |
| | Foot interaction | N/R | 79.2 |

전신 과제 평균 51.7%, 장거리 과제 평균 76.2%이며 7개 과제를 동일 가중하면 62.2%다. 장거리 결과는 seen과 unseen 목표 위치의 평균이다.

### 4.2 수집 효율

Close Laptop과 Pull Curtain 평균에서 시연 1개당 수집 노동이 로봇 140.85 인초에서 사람 33.30 인초로 76.4% 줄었다 (인시당 시연 수 4.23배). 노동에는 촬영, 분할 상각한 준비, 캘리브레이션, 문제 해결, 리셋이 포함되며 사람 수집은 1명, teleoperation은 2명 기준이다. 사람 시연 200개로 학습한 policy는 평균 과제 점수 53.3%, 로봇 시연 50개는 60.0%였다. 장거리 object relocation에서는 현장 녹화와 리셋 시간이 시연당 130초에서 25초로 줄어 throughput이 5.2배였다. 개요 그림의 3.4배는 전신 과제 70초 대 33초, 장거리 130초 대 25초의 반올림 대리값을 동일 가중한 추정치(약 100초 대 29초)로, 전체 코퍼스 측정값이 아니다. 70초 대리값은 2인 노동의 절반을 근사한 값이며 실측 경과 시간이 아니다.

### 4.3 실세계 비교

평가 장비는 다섯 tracker를 단 PICO 4 Ultra(SONIC이 G1 제어 신호로 변환), 가림에 강한 HexaCercle M11 장갑(BrainCo Revo2 손 제어), 머리 장착 GoPro다. 과제마다 고정된 초기 구성 10개로 평가하고, 성공률과 progress(단계별 고정 점수 합, 과제당 100점)를 보고한다.

| 방법 | Bottle Disposal | Toy Storage | Box Transport | Chair Placement | 평균 |
|---|---|---|---|---|---|
| π0.5 | 2/10, 28.0 | 5/10, 64.5 | 5/10, 58.0 | 4/10, 65.5 | 16/40, 54.0 |
| GR00T N1.6 | 0/10, 10.0 | 1/10, 19.0 | 0/10, 10.0 | 2/10, 46.0 | 3/40, 21.3 |
| Ψ0 | 1/10, 26.5 | 2/10, 30.0 | 1/10, 37.5 | 0/10, 33.0 | 4/40, 31.8 |
| StarVLA | 0/10, 10.0 | 5/10, 55.0 | 3/10, 71.0 | 3/10, 82.5 | 11/40, 54.6 |
| λ0 | 5/10, 79.0 | 7/10, 81.0 | 7/10, 84.5 | 6/10, 77.0 | 25/40, 80.4 |

λ0는 평균 성공률 62.5%, progress 80.4%로 가장 강한 외부 baseline보다 각각 22.5%p, 25.8%p 높다. 네 과제 모두에서 성공 수가 가장 많고, progress 향상폭은 bottle disposal에서 51.0%p로 가장 크며 모든 과제에서 progress가 75%를 넘는다. 다만 chair placement는 성공 6/10 대 StarVLA 3/10이지만 progress는 77.0% 대 82.5%로 뒤진다.

### 4.4 SIMPLE 시뮬레이션

6개 핵심 과제를 Level 0~2에서 과제와 level 쌍마다 10 rollout으로 평가했다.

| 모델 | Level 0/1/2 평균 | 전체 |
|---|---|---|
| H-RDT | 0.0/1.7/5.0 | 2.2 |
| InternVLA-M1 | 13.3/16.7/11.7 | 13.9 |
| EgoVLA | 33.3/41.7/40.0 | 38.3 |
| Diffusion Policy | 46.7/36.7/33.3 | 38.9 |
| GR00T N1.6 | 51.7/55.0/40.0 | 48.9 |
| π0.5 | 58.3/53.3/41.7 | 51.1 |
| DreamZero | 66.7/66.7/63.3 | 65.6 |
| ACT | 85.0/85.0/78.3 | 82.8 |
| Ψ0 | 90.0/85.0/81.7 | 85.6 |
| StarVLA | 83.3/90.0/85.0 | 86.1 |
| λ0 | 90.0/93.3/86.7 | 90.0 |

λ0는 StarVLA와 Ψ0보다 각각 3.9%p, 4.4%p 높고 모든 level에서 StarVLA를 앞서지만 Level 2 격차는 1.7%p로 좁다. BendPick은 모든 level에서, Handover는 Level 1과 2에서 100%다. Mobile P&P가 가장 약해 Level 1과 2에서 StarVLA에 뒤진다(70% 대 80%). 180회 중 162회 성공이다. 단, λ0 수치는 과제별로 가장 좋은 구성을 고른 결과이며 공유 checkpoint나 추론 설정이 아니다.

### 4.5 사람 데이터 규모 scaling

**validation loss**: 같은 2B 모델을 중첩된 5%, 10%, 25%, 50%, 100% 부분집합에서 고정 seed로 10만 update 학습하고 1천 update마다 두 holdout을 평가했다. clean은 전신과 양손 주석 유효성이 상위 사분위인 세션(episode 1,008개), representative는 데이터 출처와 유효성 사분위로 층화한 세션(episode 513개)이며 각각 44개 세션으로 구성된다.

| 데이터 비율 | 학습 동역학 |
|---|---|
| 5%, 10% | representative 최소점이 6천, 1만 2천 update에서 나온 뒤 최종 loss가 24.7%, 19.0% 높아진다 (clean은 27.6%, 18.1%) |
| 25% | 두 holdout 모두 약 2만 2천 update에서 최소점, 최종 loss는 6.4~6.5%만 높다 |
| 50% | 최소점 3만 7천/5만 8천 update (representative/clean), 최종 loss가 최소점 대비 1.4%/0.9% 이내 |
| 100% | 최소점 9만 9천/9만 8천 update |

큰 데이터는 loss가 다시 오르기 전까지 더 오래 학습할 수 있고, 작은 데이터는 이른 checkpoint 선택이 유리하다. 최종 checkpoint만 보면 데이터 규모 효과와 후기 loss 상승이 섞인다. 최소 validation loss는 5%에서 100%로 갈 때 representative 35.5%, clean 40.6% 감소했다. L(D) = a + b ln D 적합의 R²는 0.9868/0.9901, 데이터 2배당 감소량은 0.000900/0.000877로 기울기 크기 차이는 2.7%에 불과하다. 이 적합은 단일 run이라 seed 간 재현성이나 외삽을 보장하지 않는다.

**downstream task progress**: Stage II 데이터 비율 0%, 5%, 10%, 25%, 50%, 100%에서 실세계 평균 progress가 59.9%, 64.2%, 67.3%, 72.1%, 76.4%, 80.4%로 단조 증가해, Stage II 없음 대비 20.5%p 올랐다. Stage I 초기화, 모델 용량, 로봇 시연, Stage III update 예산, 평가 구성은 고정했다.

### 4.6 학습 단계 ablation

| 변형 | SIMPLE L0/L1/L2 | SIMPLE 전체 | 실세계 성공 | 실세계 progress |
|---|---|---|---|---|
| 사람 데이터 pre-training 둘 다 없음 | 83.3/83.3/71.7 | 79.4 | 15.0 | 54.0 |
| Stage II 없음 | 83.6/86.7/76.7 | 82.3 | 22.5 | 59.9 |
| Stage I 없음 | 88.0/91.7/83.7 | 87.8 | 50.0 | 75.9 |
| λ0 전체 | 90.0/93.3/86.7 | 90.0 | 62.5 | 80.4 |

Stage II를 빼면 실세계 성공률이 40.0%p 하락하고, Stage I을 빼면 12.5%p 하락한다. 즉 전신 mid-training의 기여가 egocentric 손 데이터의 상호작용 prior보다 크다.

### 4.7 로봇이 보지 못한 물체로의 전이

각 방법마다 물체 A의 로봇 시연과 물체 A, B의 사람 시연으로 policy를 학습하고, A에서 평가하면 Seen, B에서 평가하면 Human-guided다. Robot-only는 사람 데이터 없이 A의 로봇 시연으로만 학습한 변형을 B에서 평가한다. 총 600 trial이다. λ0의 평균 Human-guided progress는 55.8%로 가장 강한 baseline π0.5의 46.5%보다 높다. Robot-only 변형 대비 네 과제 모두 향상되어 평균이 48.4%에서 55.8%로 7.4%p 올랐다. B의 progress는 여전히 Seen보다 낮다. 이 비교는 사람 데이터 학습 전체의 결합 효과를 재며, B 사람 시연의 기여를 A 사람 시연이나 사전 사람 데이터 학습과 분리하지 않는다.

### 4.8 평가 프로토콜 세부

- 실세계 baseline 4종은 Eq. 6의 G1 인터페이스, 50 Hz 절대 action, 50 frame 미래 버퍼로 맞췄다. GR00T N1.6은 Eagle backbone과 N1.6 flow action expert(128차원), 50 step horizon, learning rate 10^-4, batch 64다. Ψ0는 Qwen3-VL-2B, Ψ0 flow expert, 30 frame SONIC action chunk와 RTC(최대 지연 8)를 쓰고 VLM을 고정한다. π0.5는 openpi JAX 구현과 공식 가중치, batch 32다. StarVLA는 Qwen3-VL-4B와 QwenPI-v3 layerwise flow matching action model, 50 step horizon, 5만 step이다.
- 구성 순서는 policy마다 무작위화하고, 수동 판정자는 모델 정체를 모르는 상태(blind)로 채점한다. 실행 시작 후 사람이 로봇, 물체, 환경에 접촉하면 자율 성공에서 제외한다.
- progress는 과제별 7단계 점수의 합(100점)이며, 각 단계를 이전 단계와 독립적으로 채점한다. 접촉만으로는 안정 grasping로 치지 않고, 들어올리기는 지지면에서 떨어져야 한다. 최종 성공은 종료 조건이 3초 유지되어야 한다.

| 과제 | 단계별 점수 | 최종 성공 조건 |
|---|---|---|
| Bottle disposal | 접근 10, 안정 grasping 15, 들기 15, 쓰레기통 도착 15, 페달 눌러 뚜껑 열기 20, 병 놓기 20, 이후 안정 5 | 병이 완전히 통 안에 있고 로봇이 접촉 보조 없이 서 있음 |
| 한 손 toy storage | 접근 10, 접촉 15, 안정 grasping 20, 들기 15, 상자 위 운반 15, 상자 안 배치 20, 놓은 뒤 유지 5 | 장난감이 상자 안에 있고 손을 뺄 때 밀리지 않음 |
| 양손 parts-box transport | 접근 10, 양손 접촉 15, 안정 grasping 20, 들기 15, 목표면 위 운반 20, 목표면 배치 15, 놓은 뒤 안정 5 | 상자가 목표 영역 안에 있고 두 손이 떨어졌으며 내용물이 쏟아지지 않음 |
| Chair placement | 접근 10, 회전과 정렬 15, 양손 접촉 10, grasping와 밀기 시작 20, 연속 밀기 20, 책상 아래 삽입 20, 놓고 안전 정지 5 | 의자 위치와 yaw가 사전 등록한 허용 범위 안이고 로봇이 놓은 뒤 안정 |

## 5. 한계와 향후 과제 (Limitations and Future Work)

저자들이 본문과 부록에서 명시한 한계는 다음과 같다.

- **SIMPLE 구성 선택**: λ0의 SIMPLE 수치는 과제별 최고 구성을 고른 결과이며 validation 전용 선택으로 확립되지 않았다. 고정 구성 비교로 해석하면 안 되고, Table 3의 전체 레시피 행도 같은 방식이다. ablation 간 checkpoint와 추론 선택 일치도 검증되지 않았다.
- **scaling 통계**: validation loss 적합은 비율당 단일 run이며 seed 간 오차 막대가 없다. R²는 표본 내 적합만 나타내며 재현성, 기울기 동일성, 외삽 정확도를 보장하지 않는다.
- **실세계 통계**: 학습 seed를 합치거나 seed 기반 신뢰구간을 보고하지 않는다.
- **수집 효율 수치**: 전신 과제와 장거리 과제의 측정이 서로 다른 집계 방식을 쓰며, 3.4배 throughput은 대표 과제의 추정치다.
- **데이터 품질**: 신체 스트림은 착용 장비 기반 kinematics로 광학 모션캡처 정답이 아니며, 손 기하는 오프라인으로 RGB에서 복원한다.
- **일반화 실험 해석**: Human-guided 향상은 사람 데이터 학습 전체의 결합 효과이며, B 물체 사람 시연의 기여를 분리하지 않고 사람 데이터 규모도 바꾸지 않았다. B의 progress는 Seen보다 여전히 낮다.
- **시점 차이 잔존**: 카메라 높이와 모델을 맞춰도 사람과 humanoid의 몸 움직임 차이로 시점이 달라질 수 있어 학습 시 augmentation에 의존한다.

향후 과제로 저자들은 이 연구가 humanoid foundation model을 향한 확장 가능한 전신 사람 데이터 수집의 지침이 되기를 기대한다고 적는다.

## 6. 관련 연구 (Related Work)

| 계열 | 대표 연구 | λ0와의 관계 |
|---|---|---|
| generalist robot policy | RT-1, Open X-Embodiment, Octo, OpenVLA, Diffusion Policy | 대규모 로봇 데이터의 비용 문제가 출발점이다 |
| 휴대형 수집 인터페이스 | UMI, UMI on Legs, Mobile ALOHA | 로봇 기반 수집은 하드웨어와 리셋에, 휴대형 인터페이스는 action space에 제약이 있다 |
| 사람 영상 데이터 | Ego4D, EPIC-KITCHENS, Ego-Exo4D, Nymeria(300시간 전신), EgoDex, OpenEgo | Nymeria처럼 전신 동작을 포함하되 humanoid 인터페이스와 연결한다 |
| 사람 데이터로 로봇 학습 | HAT(PH2D), DexWild, EgoZero, HumanEgo, EMMA, EgoScale | EMMA처럼 사람 데이터 증가 효과를 측정하되, 로봇 시연을 고정한 채 이족 humanoid loco-manipulation에서 본다 |
| humanoid whole-body control | HumanPlus, OmniH2O, SONIC, GMR, Human2Humanoid | SONIC을 하위 controller로 쓰고 GMR류 retargeting 오차를 보정한다 |
| 사람 경험 기반 humanoid policy | WholeBodyVLA, EgoHumanoid, Ψ0, OpenHLM, ZeroWBC, HALOMI, ω-0 | 명시적 전신 사람 경험을 mid-training에 쓰고 그 규모를 통제 변수로 둔다 |
| 시뮬레이션 경로 | VideoMimic, SUGAR, GRAIL, LEGS | 시뮬레이션 대신 실제 사람 데이터를 직접 정렬한다 |

부록 Table 5는 가장 가까운 연구들의 질문을 대비한다. WholeBodyVLA는 300시간 action 없는 영상으로 latent action을, EgoHumanoid는 같은 과제 사람 데이터 0~300개와 co-training을, Ψ0는 829시간 EgoDex의 task-space pre-training을, OpenHLM은 인터페이스와 데이터 출처 선택을, ω-0는 latent 시각 예측을 다룬다. λ0의 질문은 "고정된 로봇 grounding 아래에서 명시적 전신 사람 경험을 늘리면 무엇이 확장되는가"이며, Stage II 사람 데이터를 0~100%로 바꾸고 로봇 예산은 고정한다.

부록 Table 4는 데이터 자원을 비교한다. EgoDex는 829시간이지만 상반신과 손, EgoScale은 20,854시간이지만 손목과 손 지도이며, HumanVerse는 500시간에 추적된 전신과 복원된 손, SMPL 호환, SONIC 신체 토큰과 G1 학습 시점이라는 humanoid 인터페이스를 갖춘다.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| HumanVerse | egocentric 영상, 동기화된 신체와 손 동작, 음성 설명을 묶은 500시간 사람 loco-manipulation 데이터셋 |
| λ0 | Qwen3.5-2B backbone과 action expert로 이루어진 humanoid 전신 loco-manipulation VLA |
| human-to-humanoid alignment | 사람 시연의 observation과 action을 G1이 쓰는 형식과 외형으로 오프라인 보정하는 파이프라인 |
| robot-aligned human data | alignment를 거쳐 G1 상태와 motion token 형식으로 바뀐 사람 시연 데이터 |
| mid-training | pre-training과 로봇 post-training 사이에 HumanVerse로 전신 동작을 학습하는 단계(Stage II) |
| dynamics-aware optimization | rollout 피드백과 response model로 motion token을 gradient 갱신해 실행 오차를 줄이는 alignment 3단계 |
| response model | motion token 변화가 SONIC 실행 결과에 미치는 영향을 근사해 token 최적화를 안내하는 모델 |
| SONIC motion latent | SONIC 인코더가 만드는 64차원 motion token. λ0가 예측하고 SONIC controller가 실행한다 |
| Human-guided | 로봇 시연에는 없고 사람 시연에만 나온 물체 B에서의 평가 조건 |
| clean / representative holdout | 주석 유효성 상위 사분위 세션과, 출처와 유효성으로 층화한 세션으로 만든 두 validation 집합 |

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 1 | λ0와 HumanVerse 개요, alignment 오차 감소, 3단계 학습, scaling 결과 | caption-region | ★ wiki 권장 (overview) |
| fig02 | 5 | HumanVerse 수집 장비와 과제, 장면, 자세 분포, 통계 | manual | ★ wiki 권장 (dataset) |
| fig03 | 5 | 로봇 없는 수집에서 큐레이션과 로봇 정렬까지 4단계 흐름 | caption-region | ★ wiki 권장 (method) |
| fig04 | 6 | egocentric 프레임 60장 갤러리 | manual | (부수) |
| fig05 | 7 | egocentric 프레임과 SMPL, MANO 복원 동작 16쌍 | manual | (부수) |
| fig06 | 7 | action alignment 3단계 도식 | manual | ★ wiki 권장 (method) |
| fig07 | 9 | λ0 3단계 학습 구조 | manual | ★ wiki 권장 (architecture) |
| fig08 | 10 | 정렬된 사람 시연만으로 학습한 7개 과제 progress | manual | ★ wiki 권장 (result) |
| fig09 | 10 | 사람 대 로봇 시연의 성능과 수집 노동 | caption-region | ★ wiki 권장 (result) |
| fig10 | 11 | 실세계 수집 장비, 네 과제, 평가 물체 | manual | (확인 필요) |
| fig11 | 12 | 데이터 비율별 validation loss 곡선과 scaling 적합 | manual | ★ wiki 권장 (result) |
| fig12 | 13 | Stage II 데이터 비율별 실세계 task progress | caption-region | ★ wiki 권장 (result) |
| fig13 | 14 | Seen, Human-guided, Robot-only 일반화 비교 | manual | ★ wiki 권장 (result) |
| tab01 | 12 | 실세계 네 과제 성공률과 progress | manual | ★ wiki 권장 (result) |
| tab02 | 12 | SIMPLE Level 0~2 성공률 | table-region | ★ wiki 권장 (result) |
| tab03 | 13 | 학습 단계 ablation | table-region | ★ wiki 권장 (ablation) |
| tab04 | 20 | egocentric 사람 데이터 자원 비교 | table-region | (부록) |
| tab05 | 20 | 가까운 humanoid VLA 연구와의 문제 수준 비교 | table-region | (부록) |
| tab06 | 21 | 2B 모델 학습 일정 | table-region | (부록) |
| tab07 | 24 | 실세계 평가 단계별 채점 정의 | table-region | (부록) |
