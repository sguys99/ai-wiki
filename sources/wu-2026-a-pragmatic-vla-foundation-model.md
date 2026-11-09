---
title: "A Pragmatic VLA Foundation Model"
type: paper
year: 2026
category: physical-ai
raw_path: raw/papers/wu-2026-a-pragmatic-vla-foundation-model.pdf
raw_filename: "wu-2026-a-pragmatic-vla-foundation-model.pdf"
source_collection: external
authors: "Wei Wu, Fan Lu, Yunnan Wang, Shuai Yang, Shi Liu, Fangjing Wang 외 (총 25인, project lead Kecheng Zheng)"
arxiv_id: "2601.18692"
url: "https://technology.robbyant.com/lingbot-vla"
tags: [physical-ai, vla, manipulation, robot-dataset]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/wu-2026-a-pragmatic-vla-foundation-model/fig01.png
    raw: raw/papers/wu-2026-a-pragmatic-vla-foundation-model-figures/fig01.png
    caption: "LingBot-VLA 개요. 왼쪽은 dual-arm 실제 데이터의 자동 주석과 사람 검수, 가운데는 understanding expert와 action expert가 depth query와 noise를 함께 받는 구조, 오른쪽은 실제 환경과 시뮬레이션 평가 결과, 아래는 실제 배치 과제 8종이다"
    page: 2
    bbox_norm: [0.106, 0.0819, 0.894, 0.4934]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/wu-2026-a-pragmatic-vla-foundation-model/fig02.png
    raw: raw/papers/wu-2026-a-pragmatic-vla-foundation-model-figures/fig02.png
    caption: "pre-training 데이터를 구성하는 dual-arm 로봇 9종과 약 2만 시간 규모"
    page: 4
    bbox_norm: [0.106, 0.0819, 0.9136, 0.3526]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/wu-2026-a-pragmatic-vla-foundation-model/fig03.png
    raw: raw/papers/wu-2026-a-pragmatic-vla-foundation-model-figures/fig03.png
    caption: "atomic action 워드 클라우드. (a) pre-training 데이터셋, (b) 벤치마크"
    page: 6
    bbox_norm: [0.1074, 0.0819, 0.894, 0.2655]
    strategy: caption-region
    curated: false
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/wu-2026-a-pragmatic-vla-foundation-model/fig04.png
    raw: raw/papers/wu-2026-a-pragmatic-vla-foundation-model-figures/fig04.png
    caption: "GPU 8개에서 256개까지의 학습 throughput 비교. (a) Qwen2.5-VL-3B-π 모델에서 StarVLA 대비, (b) PaliGemma-3B-pt-224-π 모델에서 DexBotic, OpenPI 대비"
    page: 8
    bbox_norm: [0.106, 0.0819, 0.894, 0.2826]
    strategy: caption-region
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/wu-2026-a-pragmatic-vla-foundation-model/fig05.png
    raw: raw/papers/wu-2026-a-pragmatic-vla-foundation-model-figures/fig05.png
    caption: "pre-training 데이터를 3,000시간에서 2만 시간으로 늘릴 때의 progress score와 성공률 변화. 평균과 embodiment 3종의 추세를 함께 그렸다"
    page: 9
    bbox_norm: [0.106, 0.0819, 0.894, 0.3022]
    strategy: caption-region
    curated: true
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/wu-2026-a-pragmatic-vla-foundation-model/fig06.png
    raw: raw/papers/wu-2026-a-pragmatic-vla-foundation-model-figures/fig06.png
    caption: "Agibot G1에서 과제당 시연 데이터 40개, 80개, 130개로 post-training했을 때 π0.5와 LingBot-VLA의 성공률과 progress score"
    page: 9
    bbox_norm: [0.5332, 0.4509, 0.8663, 0.6275]
    strategy: caption-region
    curated: true
  - id: tab01
    label: Table 1
    kind: table
    file: assets/wu-2026-a-pragmatic-vla-foundation-model/tab01.png
    raw: raw/papers/wu-2026-a-pragmatic-vla-foundation-model-figures/tab01.png
    caption: "GM-100 실제 환경 평가 결과. 플랫폼 4종별 성공률과 progress score를 baseline 3종과 비교"
    page: 7
    bbox_norm: [0.1112, 0.1188, 0.8881, 0.2376]
    strategy: table-region
    curated: true
  - id: tab02
    label: Table 2
    kind: table
    file: assets/wu-2026-a-pragmatic-vla-foundation-model/tab02.png
    raw: raw/papers/wu-2026-a-pragmatic-vla-foundation-model-figures/tab02.png
    caption: "RoboTwin 2.0 시뮬레이션 평가의 clean 장면과 randomized 장면 평균 성공률"
    page: 7
    bbox_norm: [0.11, 0.265, 0.89, 0.335]
    strategy: manual
    curated: true
  - id: tabs1
    label: Table S1
    kind: table
    file: assets/wu-2026-a-pragmatic-vla-foundation-model/tabs1.png
    raw: raw/papers/wu-2026-a-pragmatic-vla-foundation-model-figures/tabs1.png
    caption: "GM-100 과제별 결과, AgileX 전반부"
    page: 12
    bbox_norm: [0.1161, 0.1324, 0.8839, 0.894]
    strategy: table-region
    curated: false
  - id: tabs2
    label: Table S2
    kind: table
    file: assets/wu-2026-a-pragmatic-vla-foundation-model/tabs2.png
    raw: raw/papers/wu-2026-a-pragmatic-vla-foundation-model-figures/tabs2.png
    caption: "GM-100 과제별 결과, AgileX 후반부"
    page: 13
    bbox_norm: [0.1161, 0.1394, 0.8839, 0.887]
    strategy: table-region
    curated: false
  - id: tabs3
    label: Table S3
    kind: table
    file: assets/wu-2026-a-pragmatic-vla-foundation-model/tabs3.png
    raw: raw/papers/wu-2026-a-pragmatic-vla-foundation-model-figures/tabs3.png
    caption: "GM-100 과제별 결과, Agibot G1 전반부"
    page: 14
    bbox_norm: [0.1087, 0.1324, 0.8913, 0.894]
    strategy: table-region
    curated: false
  - id: tabs4
    label: Table S4
    kind: table
    file: assets/wu-2026-a-pragmatic-vla-foundation-model/tabs4.png
    raw: raw/papers/wu-2026-a-pragmatic-vla-foundation-model-figures/tabs4.png
    caption: "GM-100 과제별 결과, Agibot G1 후반부"
    page: 15
    bbox_norm: [0.1234, 0.1394, 0.8766, 0.887]
    strategy: table-region
    curated: false
  - id: tabs5
    label: Table S5
    kind: table
    file: assets/wu-2026-a-pragmatic-vla-foundation-model/tabs5.png
    raw: raw/papers/wu-2026-a-pragmatic-vla-foundation-model-figures/tabs5.png
    caption: "GM-100 과제별 결과, Galaxea R1Pro 전반부"
    page: 16
    bbox_norm: [0.1161, 0.1324, 0.8839, 0.894]
    strategy: table-region
    curated: false
  - id: tabs6
    label: Table S6
    kind: table
    file: assets/wu-2026-a-pragmatic-vla-foundation-model/tabs6.png
    raw: raw/papers/wu-2026-a-pragmatic-vla-foundation-model-figures/tabs6.png
    caption: "GM-100 과제별 결과, Galaxea R1Pro 후반부"
    page: 17
    bbox_norm: [0.1234, 0.1394, 0.8766, 0.887]
    strategy: table-region
    curated: false
  - id: tabs7
    label: Table S7
    kind: table
    file: assets/wu-2026-a-pragmatic-vla-foundation-model/tabs7.png
    raw: raw/papers/wu-2026-a-pragmatic-vla-foundation-model-figures/tabs7.png
    caption: "GM-100 과제별 결과, 이족 humanoid Leju KUAVO 4 Pro 전반부"
    page: 18
    bbox_norm: [0.106, 0.1394, 0.9032, 0.887]
    strategy: table-region
    curated: false
  - id: tabs8
    label: Table S8
    kind: table
    file: assets/wu-2026-a-pragmatic-vla-foundation-model/tabs8.png
    raw: raw/papers/wu-2026-a-pragmatic-vla-foundation-model-figures/tabs8.png
    caption: "GM-100 과제별 결과, 이족 humanoid Leju KUAVO 4 Pro 후반부"
    page: 19
    bbox_norm: [0.1161, 0.1601, 0.8839, 0.8663]
    strategy: table-region
    curated: false
  - id: tabs9
    label: Table S9
    kind: table
    file: assets/wu-2026-a-pragmatic-vla-foundation-model/tabs9.png
    raw: raw/papers/wu-2026-a-pragmatic-vla-foundation-model-figures/tabs9.png
    caption: "RoboTwin 2.0 과제 50종별 clean, randomized 성공률"
    page: 20
    bbox_norm: [0.1244, 0.1394, 0.8719, 0.887]
    strategy: table-region
    curated: false
---

## 한 줄 요약 (One-line Summary)

LingBot-VLA는 dual-arm 로봇 9종에서 모은 약 2만 시간의 실제 teleoperation 데이터로 pre-training한 VLA foundation model이며, 실제 로봇 4종에서 GM-100 과제 100개로 평가해 π0.5, GR00T N1.6, WALL-OSS보다 높은 성공률을 보이고, 학습 코드베이스는 GPU 8개에서 초당 261 샘플의 throughput을 낸다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 제목 | A Pragmatic VLA Foundation Model |
| 저자 | Wei Wu, Fan Lu, Yunnan Wang, Shuai Yang, Shi Liu, Fangjing Wang(공동 1저자) 외, 총 25인. project lead Kecheng Zheng |
| arXiv | 2601.18692 (v4, 2026-06-15, cs.RO) |
| 공개물 | 코드(github.com/robbyant/lingbot-vla), 체크포인트(Hugging Face robbyant/lingbot-vla), 벤치마크 데이터 |
| 분량 | 본문 9쪽, 부록 표 S1~S9 포함 총 20쪽 |

## 2. 주요 기여 (Key Contributions)

- **실제 로봇 데이터 scaling 분석**: pre-training 데이터를 3,000시간에서 2만 시간으로 늘리는 동안 하위 과제 성공률이 꾸준히 오르고, 2만 시간에서도 포화 징후가 없음을 보였다. 저자들은 이를 실제 로봇 학습에서 유리한 scaling 특성을 보인 첫 실증 근거라고 주장한다.
- **대규모 실제 환경 평가**: GM-100 벤치마크의 과제 100개를 플랫폼 4종에서 평가했다. 과제당 시연 데이터 130개로 post-training하고, 로봇 25대에서 총 22,500회 시행을 수행했다.
- **depth 정보 결합**: learnable query를 LingBot-Depth의 depth 토큰에 distillation으로 맞춰 공간 인식을 보강했다.
- **효율적 학습 코드베이스**: FSDP 기반 분산 전략과 FlexAttention, torch.compile 연산 최적화로 GPU 8개에서 초당 261 샘플을 처리한다. 기존 VLA 코드베이스 대비 1.5~2.8배 빠르다(VLM 종류에 따라 다르다).
- **공개**: 코드, base model, 벤치마크 데이터(평가 rosbag 포함)를 공개한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 pre-training 데이터

teleoperation은 사람이 로봇을 원격으로 움직여 시연을 만드는 방식이다. pre-training 데이터는 dual-arm 로봇 9종에서 teleoperation으로 모은 약 2만 시간 분량이다.

| 로봇 | 팔 | 카메라와 비고 |
|---|---|---|
| AgiBot G1 | 7-DoF 2개 | RGB-D 카메라 3대, VR 기반 teleoperation |
| AgileX | 6-DoF 2개 | 카메라 3대, isomorphic arm으로 조종 |
| Galaxea R1Lite | 6-DoF 2개 | stereo 카메라 1대, 손목 카메라 2대 |
| Galaxea R1Pro | 7-DoF 2개 | stereo 카메라 1대, 손목 카메라 2대 |
| Realman Rs-02 | 7-DoF 2개, 평행 그리퍼 2개 | 카메라 3대, 16차원 설정과 action space |
| Leju KUAVO 4 Pro | 7-DoF 2개, 평행 그리퍼 2개 | 이족 humanoid, 머리 카메라 1대, 손목 카메라 2대 |
| Qinglong | 7-DoF 2개 | humanoid, 머리 카메라 1대, 손목 카메라 2대 |
| ARX Lift2 | 6-DoF 2개 | 카메라 3대 |
| Bimanual Franka | 7-DoF 2개, 평행 그리퍼 2개 | 카메라 3대, 16차원 action space |

라벨링은 두 단계다.

1. **Video Segment**: 사람 주석자가 여러 시점의 영상을 미리 정한 atomic action 기준으로 함께 잘라 클립으로 나눈다. 이때 영상 시작과 끝의 정지 프레임을 제거해 중복 정보를 줄인다.
2. **Instruction Annotation**: 전체 trajectory 영상과 atomic action 클립에 대해 Qwen3-VL-235B-A22B로 task 지시문(instruction)과 subtask 지시문을 주석한다. Figure 1은 자동 주석 뒤 사람이 다듬는 흐름을 보여준다.

### 3.2 아키텍처

LingBot-VLA는 pre-training된 VLM(Qwen2.5-VL)과 새로 초기화한 action expert를 Mixture-of-Transformers(MoT)로 묶는다. action expert는 로봇 상태와 action 토큰만 처리하도록 분리한 별도 가중치 묶음이다. MoT는 BAGEL과 같은 방식으로, vision-language와 action을 서로 다른 transformer 경로에서 처리하되 shared self-attention으로 층마다 하나의 시퀀스로 결합한다. 저자들은 이 구조가 VLM의 의미 정보를 모든 층에서 action 생성에 전달하면서 모달리티별 처리를 유지해 cross-modal 간섭을 줄인다고 설명한다.

- **입력**: 시점 t의 observation 조건 O_t = [I¹_t, I²_t, I³_t, T_t, s_t]. 3시점 영상, task 지시문, 로봇 상태로 구성된다. 영상과 지시문은 VLM이 인코딩하고, 초기 상태와 action chunk 같은 proprioception 시퀀스는 action expert로 들어간다.
- **출력**: action chunk A_t = [a_t, ..., a_{t+T-1}]. action chunk는 policy가 한 번에 출력하는 여러 timestep 분량의 action 묶음이며, pre-training 단계의 chunk 길이 T는 50이다.
- **학습 목표**: flow matching은 noise에서 데이터로 향하는 vector field를 학습해 샘플을 만드는 생성 기법이다. flow timestep s∈[0,1]에서 Gaussian noise ε와 정답 action A_t를 선형 보간한 A_{t,s} = sA_t + (1−s)ε를 만들고, action expert v_θ가 목표 속도 A_t − ε를 예측하도록 L_FM = E‖v_θ(A_{t,s}, O_t, s) − (A_t − ε)‖²를 최소화한다.
- **attention mask**: π0를 따라 blockwise causal attention을 쓴다. 시퀀스를 [영상 3개와 지시문], [상태], [action chunk] 세 블록으로 나누고, 각 블록은 자기 자신과 앞선 블록만 참조한다. 블록 내부는 양방향이다. 따라서 action expert는 observation 정보를 모두 쓰고, 미래 action 토큰 정보가 observation 표현으로 새지 않는다.

### 3.3 depth distillation

공간 인식을 보강하기 위해 3시점 영상 각각에 대응하는 learnable query [Q¹_t, Q²_t, Q³_t]를 두고, VLM이 처리한 query를 LingBot-Depth의 depth 토큰 [D¹_t, D²_t, D³_t]에 맞춘다. distillation loss는 L_distill = E|Proj(Q_t) − D_t|이며, Proj는 cross-attention으로 차원을 맞추는 projection 층이다. 이 방식은 최근 연구(참고문헌 12, 28)에서 착안했다. 이하 depth를 쓰는 변형을 w/ depth, 쓰지 않는 변형을 w/o depth로 적는다.

### 3.4 학습 효율 최적화

| 구분 | 기법 | 효과 |
|---|---|---|
| 분산 전략 | FSDP로 optimizer 상태, 파라미터, gradient를 sharding | 메모리 사용량 최소화 |
| 분산 전략 | VeOmni의 HSDP에서 착안해 action expert 전용 shard group 구성 | 과도한 sharding의 통신 오버헤드 완화 |
| 혼합 정밀도 | reduction은 float32, 저장과 통신은 bfloat16 | 수치 안정성과 효율 |
| 연산자 최적화 | FlexAttention | vision, language, action 융합이 sparse attention이라는 점을 활용 |
| 연산자 최적화 | torch.compile 기반 operator fusion | kernel launch 오버헤드 감소, 메모리 대역폭 활용 극대화 |

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 실제 환경 평가 설정

| 항목 | 내용 |
|---|---|
| 하드웨어 | 플랫폼 4종(AgileX, Agibot G1, Galaxea R1Pro, Leju KUAVO 4 Pro)의 로봇 25대. 모두 dual-arm에 평행 그리퍼, 손목 카메라 2대와 머리 카메라 1대. 탁상 과제이며 차체와 허리를 고정 |
| 벤치마크 | GM-100, 과제 100개, 전문가 시연 데이터 39,000개 |
| 데이터 수집 | 과제당 raw trajectory 150개를 모으고 완료 여부, 동작 부드러움, 규약 준수 기준 상위 130개를 학습에 사용. 물체 위치와 방향은 trajectory마다 무작위화 |
| 수집 지침 | end-effector와 작업면 간격 유지, 접촉 구간 감속, episode 시작과 끝 영상이 뚜렷이 구별되도록 수집 |
| 필터링 | 알고리즘 자동 선별 후 사람이 다시점 영상으로 검수 |
| 비교 모델 | π0.5, GR00T N1.6, WALL-OSS. 모두 공개 체크포인트에서 같은 post-training 파이프라인(batch size 256, epoch 20)으로 학습 |
| 시행 | 과제와 로봇 쌍마다 모델별 15회, 같은 로봇 개체에서 무작위 순서로 평가. 총 22,500회. 기록은 rosbag으로 공개 예정 |
| 지표 | 성공률(SR): 3분 안에 모든 단계 완료한 시행 비율. progress score(PS): 완료한 subtask 비율(6단계 중 4단계 완료면 4/6 ≈ 0.67) |
| 종료 조건 | subtask 3회 연속 실패 또는 충돌 같은 안전 사고 |

테스트 과제의 atomic action 중 약 50%가 학습 데이터 상위 100개 빈도 action에 들지 않아, 평가가 일반화를 검증한다고 저자들은 설명한다(Figure 3).

### 4.2 실제 환경 결과 (Table 1)

| 플랫폼 | WALL-OSS SR/PS | GR00T N1.6 SR/PS | π0.5 SR/PS | w/o depth SR/PS | w/ depth SR/PS |
|---|---|---|---|---|---|
| Agibot G1 | 2.99% / 8.75% | 5.23% / 12.63% | 7.77% / 21.98% | 12.82% / 30.04% | 11.98% / 30.47% |
| AgileX | 2.26% / 8.16% | 3.26% / 10.52% | 17.20% / 34.82% | 15.50% / 36.31% | 18.93% / 40.36% |
| Galaxea R1Pro | 6.89% / 14.13% | 14.29% / 24.83% | 14.10% / 26.14% | 18.89% / 34.71% | 20.98% / 35.40% |
| Leju KUAVO 4 Pro | 3.26% / 11.75% | 6.45% / 18.66% | 12.91% / 26.35% | 17.59% / 36.22% | 15.60% / 34.40% |
| 평균 | 3.85% / 10.70% | 7.31% / 16.66% | 13.00% / 27.32% | 16.20% / 34.32% | 16.87% / 35.16% |

- w/o depth만으로도 모든 플랫폼에서 WALL-OSS와 GR00T N1.6을 SR과 PS 모두 앞선다.
- 본문은 w/ depth가 π0.5 대비 평균 SR 4.28%, PS 7.76% 높다고 적지만, Table 1 평균값으로 계산하면 SR 3.87%p, PS 7.84%p 차이다. 본문 수치와 표 수치가 일치하지 않는다.
- AgileX에서는 π0.5(17.20%)가 w/o depth(15.50%)보다 SR이 높고, Agibot G1과 Leju KUAVO 4 Pro에서는 w/o depth가 w/ depth보다 SR이 높다. depth 결합의 이득이 플랫폼마다 일정하지 않다.
- GR00T N1.6은 Galaxea R1Pro에서만 π0.5와 비슷한 수준이다. 저자들은 GR00T N1.6 pre-training에 Galaxea R1Pro 데이터가 많이 포함됐기 때문으로 보고, 구조가 비슷한 하위 과제에서 pre-training의 효과가 크다는 근거로 해석한다.
- 전체 성공률 수준은 낮다. 가장 높은 평균 SR도 16.87%다.

### 4.3 시뮬레이션 결과 (Table 2, RoboTwin 2.0)

RoboTwin 2.0의 대표 과제 50종에서 평가했다. clean 장면 시연 데이터 2,500개(과제당 50개)와 randomized 장면 시연 데이터 25,000개(과제당 500개)로 모든 모델을 다과제 학습했다. randomized 장면은 배경, 탁상 잡동사니, 탁자 높이, 조명을 바꾼다.

| 설정 | π0.5 | w/o depth | w/ depth |
|---|---|---|---|
| clean 평균 SR | 82.74% | 86.50% | 88.56% |
| randomized 평균 SR | 76.76% | 85.34% | 86.68% |

w/o depth는 π0.5보다 clean에서 3.76%p, randomized에서 8.58%p 높고, w/ depth는 각각 5.82%p, 9.92%p 높다. 과제별로는 역전도 있다(Table S9). 예를 들어 Click Bell은 clean에서 π0.5 99%, w/o depth 32%, w/ depth 43%이고, Click Alarmclock randomized는 π0.5 89%, w/o depth 26%, w/ depth 43%다.

### 4.4 학습 throughput (Figure 4)

Libero 데이터셋과 π 계열 구조로 통일하고 local batch size 32로 비교했다. StarVLA와 Dexbotic은 ZeRO, LingBot-VLA는 FSDP2, OpenPI는 통신 오버헤드가 본래 낮은 DDP를 쓴다. 지표는 초당 샘플 수다.

| VLM | 코드베이스 | 8 GPU | 16 GPU | 32 GPU | 128 GPU | 256 GPU |
|---|---|---|---|---|---|---|
| Qwen2.5-VL-3B-π | LingBot-VLA | 261 | 506 | 975 | 3,700 | 7,356 |
| Qwen2.5-VL-3B-π | StarVLA | 90 | 159 | 349 | 1,307 | 2,644 |
| PaliGemma-3B-pt-224-π | LingBot-VLA | 229 | 443 | 856 | 3,315 | 6,411 |
| PaliGemma-3B-pt-224-π | OpenPI | 142 | 275 | 547 | 2,130 | 4,166 |
| PaliGemma-3B-pt-224-π | DexBotic | 129 | 238 | 425 | 1,079 | 1,249 |

LingBot-VLA 코드베이스는 두 설정 모두에서 가장 빠르고, GPU 수가 늘어도 이론적 선형 scaling에 가깝게 따라간다. DexBotic은 128 GPU 이후 거의 늘지 않는다.

### 4.5 데이터 scaling (Figure 5)

벤치마크에서 대표 과제 25개를 골라 pre-training 데이터 3,000, 6,000, 13,000, 18,000, 20,000시간으로 학습했다. 평균 PS와 SR이 모두 꾸준히 오른다. 그래프 판독 근사값으로 평균 PS는 약 31%에서 약 57%로, 평균 SR은 약 18%에서 약 39%로 오른다. Agibot G1, AgileX, Galaxea R1Pro 개별 추세도 대체로 평균과 같은 방향이지만, AgileX는 6,000시간에서 일시적으로 떨어지고 Galaxea R1Pro SR은 13,000시간에서 18,000시간 사이에 내려간다.

### 4.6 데이터 효율 (Figure 6)

Agibot G1에서 GM-100 대표 과제 8개로 post-training 데이터 양을 바꿨다.

| 과제당 시연 데이터 | π0.5 SR / PS | LingBot-VLA SR / PS |
|---|---|---|
| 40개 | 27.4% / 42.1% | 30.8% / 57.8% |
| 80개 | 32.4% / 52.7% | 43.3% / 63.7% |
| 130개 | 38.0% / 58.7% | 47.8% / 71.3% |

LingBot-VLA는 시연 데이터 80개만으로 130개를 쓴 π0.5보다 SR과 PS 모두 높고, 데이터가 늘수록 격차가 커진다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- 데이터와 평가가 모두 dual-arm 탁상 조작에 한정된다. 평가에서 차체와 허리를 고정했다.
- 저자들이 제시한 향후 과제는 single-arm 데이터와 이동 로봇 데이터를 결합해 mobile manipulation으로 범위를 넓히는 것이다.
- 실제 환경 절대 성공률이 평균 16.87%로 낮아, GM-100 과제 다수가 아직 풀리지 않은 상태다.
- depth 결합의 이득이 플랫폼과 과제에 따라 일정하지 않다(Agibot G1, Leju KUAVO 4 Pro SR 하락, RoboTwin 일부 과제 역전).
- 본문의 π0.5 대비 향상폭(SR 4.28%, PS 7.76%)과 Table 1 평균에서 계산한 차이(3.87%p, 7.84%p)가 다르다. Figure 1은 "three robotic embodiments"라고 적지만 실험은 플랫폼 4종이다.
- scaling 실험은 과제 25개 부분집합이며 데이터 양 5개 지점만 측정했다.

## 6. 관련 연구 (Related Work)

- **Foundation VLA**: π0, π0.5, GR00T N1, GR-3, Galaxea G0, Gemini Robotics 계열. VLM backbone과 diffusion 계열 action head 조합이 일반적이다.
- **Spatial VLA**: SpatialVLA, GeoVLA, InternVLA-M1, OmniVLA, Spatial Forcing. 공간 표현이나 depth를 VLA에 결합한다.
- **평가**: 시뮬레이션(RoboTwin 2.0, LIBERO, CALVIN, RoboCasa, SimplerEnv)과 실제 환경(RoboArena 등). 저자들은 실제 환경 평가가 하드웨어 병렬화에 막혀 기존 연구 대부분이 소수 과제와 소수 모델 비교에 머물렀다고 지적한다.
- **학습 코드베이스**: OpenPI(JAX와 PyTorch), StarVLA(VLA와 VLM co-training), Dexbotic(데이터에서 배치까지 통합).

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| LingBot-VLA | 이 논문의 VLA foundation model. Qwen2.5-VL과 action expert를 MoT로 묶는다 |
| LingBot-Depth | depth distillation의 teacher로 쓰는 depth 모델. masked depth modeling 기반 |
| GM-100 | 과제 100개로 구성된 실제 환경 조작 벤치마크 |
| progress score (PS) | 완료한 subtask 수를 전체 단계 수로 나눈 부분 성공 지표 |
| Mixture-of-Transformers (MoT) | 모달리티마다 별도 transformer 경로를 두고 shared self-attention으로 결합하는 구조 |
| w/ depth, w/o depth | depth distillation을 쓴 변형과 쓰지 않은 변형 |
| atomic action | 영상 분할의 기준이 되는 최소 동작 단위(pick, place, fold 등) |

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 2 | LingBot-VLA 데이터, 구조, 평가 개요 | caption-region | ★ wiki 권장 (architecture) |
| fig02 | 4 | pre-training 로봇 9종 | caption-region | ★ wiki 권장 (data) |
| fig03 | 6 | atomic action 워드 클라우드 | caption-region | (확인 필요) |
| fig04 | 8 | 학습 throughput scaling | caption-region | ★ wiki 권장 (result) |
| fig05 | 9 | pre-training 데이터 scaling | caption-region | ★ wiki 권장 (result) |
| fig06 | 9 | post-training 데이터 효율 | caption-region | ★ wiki 권장 (result) |
| tab01 | 7 | GM-100 실제 환경 결과 | table-region | ★ wiki 권장 (result) |
| tab02 | 7 | RoboTwin 2.0 시뮬레이션 결과 | manual | ★ wiki 권장 (result) |
| tabs1 | 12 | AgileX 과제별 결과 전반부 | table-region | (아카이브) |
| tabs2 | 13 | AgileX 과제별 결과 후반부 | table-region | (아카이브) |
| tabs3 | 14 | Agibot G1 과제별 결과 전반부 | table-region | (아카이브) |
| tabs4 | 15 | Agibot G1 과제별 결과 후반부 | table-region | (아카이브) |
| tabs5 | 16 | Galaxea R1Pro 과제별 결과 전반부 | table-region | (아카이브) |
| tabs6 | 17 | Galaxea R1Pro 과제별 결과 후반부 | table-region | (아카이브) |
| tabs7 | 18 | Leju KUAVO 4 Pro 과제별 결과 전반부 | table-region | (아카이브) |
| tabs8 | 19 | Leju KUAVO 4 Pro 과제별 결과 후반부 | table-region | (아카이브) |
| tabs9 | 20 | RoboTwin 2.0 과제별 결과 | table-region | (아카이브) |

**큐레이션 확정(Step 3.5)**: fig01, fig02, fig04, fig05, fig06, tab01, tab02 → `curated: true`. 나머지 10개는 아카이브에 보존한다.
