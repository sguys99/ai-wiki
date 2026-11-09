---
title: "A Pragmatic VLA Foundation Model"
type: paper
year: 2026
category: physical-ai
source: wu-2026-a-pragmatic-vla-foundation-model.md
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
---

## 요약

LingBot-VLA는 dual-arm 로봇 9종에서 모은 약 2만 시간 분량의 실제 조작 데이터로 pre-training한 VLA foundation model이다. 논문 제목의 "pragmatic"은 세 가지 요구를 가리킨다. 여러 과제와 여러 로봇에 일반화할 것, 새 로봇에 적응시킬 때 데이터와 GPU 비용이 적을 것, 그리고 실제 배치에 쓸 만큼 학습이 빠를 것이다.

논문의 기여는 모델 하나보다 넓다. 저자들은 실제 로봇 데이터를 3,000시간에서 2만 시간까지 늘리며 성공률이 포화 없이 오르는 scaling 곡선을 보고하고, GM-100 벤치마크 과제 100개를 실제 로봇 플랫폼 4종에서 22,500회 시행해 π0.5, GR00T N1.6, WALL-OSS와 비교하며, GPU 8개에서 초당 261 샘플을 처리하는 학습 코드베이스를 공개한다.

![[assets/wu-2026-a-pragmatic-vla-foundation-model/fig01.png]]
*Figure 1: 데이터 주석, understanding expert와 action expert 구조, 평가 결과, 실제 배치 과제를 한 장에 모은 개요 (Wu 2026, p.2)*

## 배경

VLA foundation model은 대규모 pre-training으로 범용 조작 기술을 익힌 뒤 새 과제와 새 로봇에 빠르게 적응하는 것을 목표로 한다. π0, π0.5, GR00T 계열이 이 흐름의 대표 사례다. 그러나 저자들은 두 가지가 비어 있다고 지적한다.

- **실제 데이터 scaling 연구의 부재**: pre-training 데이터를 키울 때 실제 로봇 성능이 어떻게 변하는지 체계적으로 측정한 연구가 없다.
- **대규모 학습 인프라의 부재**: 수만 시간 데이터로 scaling 실험을 반복하려면 학습 코드가 빨라야 하는데, 공개 코드베이스는 다중 노드에서 데이터 I/O와 통신 병목을 겪는다.

평가 쪽에도 문제가 있다. 시뮬레이션 벤치마크는 싸고 빠르지만 실제 물리 세계의 복잡성을 다 담지 못한다. 반면 실제 환경 평가는 로봇 대수만큼만 병렬화되므로, 기존 VLA 연구 대부분은 소수 과제에서 소수 모델만 비교했다. LingBot-VLA는 데이터 규모, 평가 규모, 학습 속도 세 가지를 함께 키우는 방향으로 이 공백에 대응한다.

## 핵심 개념

action expert는 로봇 상태와 action 토큰만 처리하도록 분리한 별도 가중치 묶음이다. LingBot-VLA에서는 VLM이 영상과 지시문을 이해하고, action expert가 그 이해를 조건으로 연속 action을 만든다.

action chunk는 policy가 한 번에 출력하는 여러 timestep 분량의 action 묶음이다. LingBot-VLA는 pre-training 단계에서 한 번에 50 timestep 분량을 예측한다.

flow matching은 noise에서 데이터로 향하는 vector field를 학습해 샘플을 만드는 생성 기법이다. π0 계열과 마찬가지로 LingBot-VLA는 이 방식으로 연속 action을 생성해 부드러운 제어를 얻는다.

teleoperation은 사람이 로봇을 원격으로 움직여 시연을 만드는 방식이다. pre-training 데이터와 GM-100 post-training 데이터가 모두 이 방식으로 수집됐다.

progress score는 과제를 이루는 subtask 중 몇 단계를 완료했는지를 비율로 나타낸 부분 성공 지표다. 예를 들어 6단계짜리 "Stack Bowls" 과제에서 4단계까지 완료하고 5단계에서 실패하면 4/6, 즉 약 0.67점이다. 성공률이 낮은 어려운 과제에서도 모델 간 차이를 읽을 수 있게 해준다.

## 방법

### pre-training 데이터

pre-training 데이터는 상용 dual-arm 로봇 9종에서 teleoperation으로 모은 약 2만 시간 분량이다. 바퀴형 플랫폼과 이족 humanoid가 섞여 있고, 팔 자유도(6-DoF, 7-DoF)와 카메라 구성이 로봇마다 다르다.

![[assets/wu-2026-a-pragmatic-vla-foundation-model/fig02.png]]
*Figure 2: pre-training 데이터를 구성하는 로봇 9종 (Wu 2026, p.4)*

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

Figure 1의 가운데 부분에 적힌 "Unify Action Space"는 이처럼 서로 다른 로봇의 action을 하나의 공간으로 묶어 학습한다는 뜻이다. 본문은 통합 방식의 세부를 서술하지 않는다.

### 데이터 라벨링

정확한 지시문(instruction)을 얻기 위해 라벨링을 두 단계로 진행한다.

1. **영상 분할**: 사람 주석자가 로봇이 찍은 여러 시점의 영상을 미리 정의한 atomic action 단위로 함께 자른다. 같은 단계에서 영상 앞뒤의 정지 프레임을 지워 중복 정보를 줄인다.
2. **지시문 주석**: 전체 trajectory 영상과 atomic action 클립에 대해 Qwen3-VL-235B-A22B가 task 지시문과 subtask 지시문을 붙인다.

Figure 1 왼쪽은 이 흐름의 예시를 보여준다. "토스터에 빵 두 조각을 굽고 상추와 소스를 더해 샌드위치를 만든다"가 task 지시문이고, 그 안의 "토스터에서 빵을 꺼낸다"가 subtask 지시문이다. 자동 주석 결과는 사람이 다시 다듬는다.

### 모델 구조

LingBot-VLA는 pre-training된 VLM(Qwen2.5-VL)과 새로 초기화한 action expert를 Mixture-of-Transformers(MoT) 구조로 결합한다. MoT는 BAGEL에서 쓰인 방식으로, vision-language 입력과 action 입력을 서로 다른 transformer 경로에서 처리하되 층마다 shared self-attention으로 하나의 시퀀스처럼 섞는다.

저자들은 이 구조의 장점을 두 가지로 설명한다.

- VLM의 고차원 의미 정보가 첫 층부터 마지막 층까지 계속 action 생성을 안내한다.
- 모달리티마다 가중치를 따로 두므로 vision-language 표현과 action 표현이 서로 간섭하는 문제가 줄어든다.

입력과 출력은 다음과 같이 정의된다.

| 구성 | 정의 | 처리 경로 |
|---|---|---|
| observation 조건 O_t | [I¹_t, I²_t, I³_t, T_t, s_t] | 3시점 영상과 task 지시문은 VLM, 로봇 상태는 action expert |
| action chunk A_t | [a_t, a_{t+1}, ..., a_{t+T-1}], pre-training에서 T = 50 | action expert |

observation은 매 timestep에 policy가 받는 센서 입력이다. 여기서는 dual-arm 로봇의 3시점 카메라 영상, 지시문, 로봇 상태를 합친 것이 observation 조건이 된다. 로봇 상태와 action chunk 같은 proprioception 시퀀스는 action expert 쪽으로 들어간다.

### flow matching 학습 목표

LingBot-VLA는 조건부 분포 p(A_t | O_t)를 conditional flow matching으로 학습한다. 절차는 다음과 같다.

1. flow timestep s를 [0, 1]에서 고르고 Gaussian noise ε를 뽑는다.
2. noise와 정답 action을 선형 보간해 중간 action A_{t,s} = sA_t + (1−s)ε를 만든다. 즉 s = 0이면 순수 noise, s = 1이면 정답 action이다.
3. action expert v_θ가 이 중간 지점에서 정답 방향의 속도 A_t − ε를 예측하도록 L_FM = E‖v_θ(A_{t,s}, O_t, s) − (A_t − ε)‖²를 최소화한다.

추론 시에는 noise에서 출발해 예측한 속도를 따라 적분하면 action chunk가 나온다. 이 설계는 π0와 같은 계열이다.

### blockwise causal attention

π0를 따라 시퀀스 [O_t, A_t]를 세 블록으로 나누고 블록 사이에 causal mask를 건다.

| 블록 | 내용 | 참조할 수 있는 범위 |
|---|---|---|
| 1 | 3시점 영상과 task 지시문 | 블록 1 |
| 2 | 로봇 상태 s_t | 블록 1, 2 |
| 3 | action chunk | 블록 1, 2, 3 |

블록 안의 토큰끼리는 양방향 attention을 쓴다. 따라서 action expert는 observation 정보를 모두 활용하고, 반대로 미래 action 토큰의 정보가 현재 observation 표현으로 새지 않는다.

### depth distillation

일반 VLA는 의미 이해에는 강하지만 정밀한 기하 추론과 깊이 인식에는 약하다. LingBot-VLA는 이를 보강하기 위해 vision distillation 방식을 적용한다. distillation은 큰 모델의 출력을 작은 모델이 흉내 내게 학습시키는 기법이며, 여기서는 depth 모델의 표현을 VLA 내부 표현이 따라가도록 쓰인다.

구체적으로 3시점 영상마다 learnable query [Q¹_t, Q²_t, Q³_t]를 하나씩 두고, VLM이 이 query를 처리한 결과를 LingBot-Depth가 낸 depth 토큰 [D¹_t, D²_t, D³_t]에 맞춘다. 손실은 L_distill = E|Proj(Q_t) − D_t|이며, Proj는 cross-attention으로 차원을 맞추는 projection 층이다. Figure 1 가운데의 "Depth query" 입력과 "Depth" 출력이 이 경로다.

이 문서에서는 depth distillation을 적용한 변형을 w/ depth, 적용하지 않은 변형을 w/o depth로 부른다. 논문의 모든 비교표가 두 변형을 함께 보고한다.

### 학습 효율 최적화

action 데이터는 본래 고빈도라 샘플 수가 많으므로, 저자들은 분산 학습과 연산자 수준 모두에서 최적화를 적용했다. VLA 모델은 파라미터 수가 크지 않지만 GPU 메모리와 throughput 사이의 균형을 맞추는 것이 여전히 중요하다는 판단이다.

| 구분 | 기법 | 목적 |
|---|---|---|
| 분산 전략 | FSDP(PyTorch의 ZeRO 구현)로 optimizer 상태, 파라미터, gradient를 sharding | 메모리 사용량 최소화 |
| 분산 전략 | VeOmni의 HSDP에서 착안해 action expert 모듈 전용 shard group 구성 | 과도한 sharding이 만드는 통신 오버헤드 완화 |
| 혼합 정밀도 | reduction은 float32, 저장과 통신은 bfloat16 | 수치 안정성 확보와 통신량 감소 |
| 연산자 최적화 | FlexAttention | vision, language, action 융합이 본질적으로 sparse attention이라는 점 활용 |
| 연산자 최적화 | torch.compile 기반 operator fusion | kernel launch 오버헤드 감소, 메모리 대역폭 활용 극대화 |

## 평가 설계

### 실제 환경 벤치마크

실제 환경 평가는 세 요소로 구성된다. 상용 플랫폼 4종에 걸친 로봇 25대, 과제 100개와 전문가 시연 데이터(demonstration) 39,000개로 이뤄진 GM-100 벤치마크, 그리고 같은 조건에서 baseline 3종과 비교하는 총 22,500회 시행이다.

| 항목 | 내용 |
|---|---|
| 플랫폼 | AgileX, Agibot G1, Galaxea R1Pro(이상 바퀴형), Leju KUAVO 4 Pro(이족) |
| 공통 구성 | dual-arm, 평행 그리퍼, 손목 카메라 2대와 머리 카메라 1대 |
| 작업 환경 | 탁상 과제, 차체와 허리를 고정 |
| 과제 | GM-100 과제 100개 |

### post-training 데이터 수집

GM-100 과제마다 표준 규약에 따라 시연 데이터를 모았다.

- **수량**: 과제당 raw trajectory 150개를 모으고, 과제 완료 여부, 동작 부드러움, 규약 준수를 기준으로 상위 130개만 학습에 쓴다.
- **물체 표준화**: GM-100 사양에 맞춘 물체를 써서 다른 장소에서도 재현할 수 있게 한다.
- **환경 다양성**: trajectory마다 물체 위치와 방향을 작업 공간 안에서 무작위로 바꿔 특정 배치에 대한 과적합을 막는다.
- **teleoperation 지침**: end-effector와 작업면 사이 간격 유지, 물체 접촉 구간 감속, episode 시작과 끝 영상이 뚜렷이 구별되도록 촬영.
- **자동 필터링과 사람 검수**: 알고리즘이 기술적 이상 episode를 거르고, 사람이 다시점 동기화 영상으로 다시 확인해 잡물체가 섞이거나 규약을 벗어난 episode를 제거한다.

학습과 테스트의 과제 차이도 측정했다. 테스트 과제에 등장하는 atomic action의 약 50%가 학습 데이터 빈도 상위 100개 action에 들지 않는다. 저자들은 이를 근거로 평가가 암기가 아니라 일반화를 검증한다고 설명한다.

### 비교 규약

비교 대상은 π0.5, GR00T N1.6, WALL-OSS다. 공정한 비교를 위해 네 가지 통제를 둔다.

| 통제 | 내용 |
|---|---|
| 학습 통일 | 모든 모델을 공개 pre-training 체크포인트에서 같은 post-training 파이프라인으로 학습. 과제당 trajectory 130개, batch size 256, epoch 20 |
| 기기 고정 | 데이터를 수집한 바로 그 로봇 개체에서 평가. 같은 기기와 과제 쌍에서 모든 모델을 무작위 순서로 연속 시험 |
| 조건 통제 | 수집 때와 같은 규약으로 물체 위치와 방향을 무작위화 |
| 시행과 기록 | 과제와 로봇 쌍마다 모델별 15회 시행. 3인칭 영상, 로봇 상태, 모델 예측을 rosbag으로 기록하고 공개 예정 |

### 평가 지표

| 지표 | 정의 |
|---|---|
| 성공률(SR) | 3분 안에 과제의 모든 단계를 완료한 시행의 비율. 실제 배치 가능성을 반영하는 주 지표 |
| progress score(PS) | 완료한 subtask 수를 전체 단계 수로 나눈 값. 실패 지점을 진단하고 부분 성공을 반영 |
| 종료 조건 | subtask 3회 연속 실패, 또는 충돌 같은 안전 사고 발생 시 시행 종료. 종료 전까지 완료한 subtask로 PS 계산 |

## 결과

### 실제 환경 비교

Table 1은 플랫폼 4종에서 다섯 모델의 성공률과 progress score를 비교한다.

![[assets/wu-2026-a-pragmatic-vla-foundation-model/tab01.png]]
*Table 1: GM-100 실제 환경 평가 결과 (Wu 2026, p.7)*

| 플랫폼 | WALL-OSS SR/PS | GR00T N1.6 SR/PS | π0.5 SR/PS | w/o depth SR/PS | w/ depth SR/PS |
|---|---|---|---|---|---|
| Agibot G1 | 2.99% / 8.75% | 5.23% / 12.63% | 7.77% / 21.98% | 12.82% / 30.04% | 11.98% / 30.47% |
| AgileX | 2.26% / 8.16% | 3.26% / 10.52% | 17.20% / 34.82% | 15.50% / 36.31% | 18.93% / 40.36% |
| Galaxea R1Pro | 6.89% / 14.13% | 14.29% / 24.83% | 14.10% / 26.14% | 18.89% / 34.71% | 20.98% / 35.40% |
| Leju KUAVO 4 Pro | 3.26% / 11.75% | 6.45% / 18.66% | 12.91% / 26.35% | 17.59% / 36.22% | 15.60% / 34.40% |
| 평균 | 3.85% / 10.70% | 7.31% / 16.66% | 13.00% / 27.32% | 16.20% / 34.32% | 16.87% / 35.16% |

w/o depth 변형만으로도 모든 플랫폼에서 WALL-OSS와 GR00T N1.6을 SR과 PS 양쪽에서 앞선다. 평균 기준으로 w/ depth는 가장 높은 SR(16.87%)과 PS(35.16%)를 기록했다.

π0.5와의 차이는 본문과 표가 다르게 적는다. 본문은 w/ depth가 π0.5보다 평균 SR 4.28%, PS 7.76% 높다고 서술하지만, Table 1 평균값으로 계산하면 SR 차이는 3.87%p, PS 차이는 7.84%p다.

플랫폼별로 보면 순위가 일정하지 않다.

- AgileX에서는 π0.5의 SR(17.20%)이 w/o depth(15.50%)보다 높다.
- Agibot G1과 Leju KUAVO 4 Pro에서는 w/o depth의 SR이 w/ depth보다 높다. 즉 depth 결합이 모든 로봇에서 SR을 올리지는 않는다.
- GR00T N1.6은 Galaxea R1Pro에서만 π0.5와 비슷한 수준(SR 14.29% 대 14.10%)이다. 저자들은 GR00T N1.6의 pre-training에 Galaxea R1Pro 데이터가 많이 들어갔기 때문으로 보고, 하위 과제와 구조가 비슷한 데이터로 pre-training하면 성능이 크게 오른다는 근거로 해석한다.

절대 수준도 함께 읽어야 한다. 가장 좋은 모델의 평균 SR이 16.87%이므로, GM-100 과제 대부분은 여전히 끝까지 완료되지 않는다. progress score가 35% 안팎인 것도 같은 맥락이다. 과제별 전체 결과는 부록 Table S1~S8에 있다.

### 시뮬레이션 비교

RoboTwin 2.0의 대표 조작 과제 50종에서 시뮬레이션 성능을 비교했다. 모든 모델을 pre-training 체크포인트에서 출발해 RoboTwin 데이터로 다과제 fine-tuning했다. 학습 데이터는 clean 장면 시연 데이터 2,500개(과제당 50개)와 randomized 장면 25,000개(과제당 500개)다. randomized 장면은 배경, 탁상 위 잡동사니, 탁자 높이, 조명을 바꾼다.

![[assets/wu-2026-a-pragmatic-vla-foundation-model/tab02.png]]
*Table 2: RoboTwin 2.0 clean 장면과 randomized 장면 평균 성공률 (Wu 2026, p.7)*

| 설정 | π0.5 | w/o depth | w/ depth | w/o depth 향상폭 | w/ depth 향상폭 |
|---|---|---|---|---|---|
| clean | 82.74% | 86.50% | 88.56% | 3.76%p | 5.82%p |
| randomized | 76.76% | 85.34% | 86.68% | 8.58%p | 9.92%p |

향상폭은 randomized 장면에서 더 크다. π0.5는 clean에서 randomized로 갈 때 약 6%p 떨어지지만 LingBot-VLA 두 변형은 1~2%p만 떨어진다. 즉 LingBot-VLA는 배경과 조명이 바뀌는 환경에서 상대적으로 안정적으로 동작한다. 실제 환경과 달리 시뮬레이션에서는 w/ depth가 두 설정 모두에서 w/o depth보다 높다.

평균 뒤에는 과제별 역전도 있다(부록 Table S9).

| 과제 | 설정 | π0.5 | w/o depth | w/ depth |
|---|---|---|---|---|
| Click Bell | clean | 99% | 32% | 43% |
| Click Alarmclock | randomized | 89% | 26% | 43% |
| Blocks Ranking Size | randomized | 26% | 73% | 70% |
| Handover Block | randomized | 57% | 83% | 95% |

### 학습 throughput

학습 효율은 Libero 데이터셋과 π 계열 구조로 조건을 통일해 비교했다. 코드베이스마다 VLM 구현이 다르므로, 저자들은 Qwen2.5-VL-3B-π와 PaliGemma-3B-pt-224-π 두 모델을 자기 코드베이스에 재현해 각 baseline과 맞췄다. local batch size는 모두 32다. throughput은 정해진 시간 안에 처리한 샘플 수를 말하며, 여기서는 초당 샘플 수로 잰다.

분산 방식은 코드베이스마다 다르다. StarVLA와 Dexbotic은 ZeRO, LingBot-VLA는 비슷한 수준의 FSDP2를 쓴다. OpenPI는 DDP를 써서 본래 통신 오버헤드가 낮다.

![[assets/wu-2026-a-pragmatic-vla-foundation-model/fig04.png]]
*Figure 4: GPU 수에 따른 학습 throughput. 점선은 이론적 선형 scaling (Wu 2026, p.8)*

| VLM | 코드베이스 | 8 GPU | 16 GPU | 32 GPU | 128 GPU | 256 GPU |
|---|---|---|---|---|---|---|
| Qwen2.5-VL-3B-π | LingBot-VLA | 261 | 506 | 975 | 3,700 | 7,356 |
| Qwen2.5-VL-3B-π | StarVLA | 90 | 159 | 349 | 1,307 | 2,644 |
| PaliGemma-3B-pt-224-π | LingBot-VLA | 229 | 443 | 856 | 3,315 | 6,411 |
| PaliGemma-3B-pt-224-π | OpenPI | 142 | 275 | 547 | 2,130 | 4,166 |
| PaliGemma-3B-pt-224-π | DexBotic | 129 | 238 | 425 | 1,079 | 1,249 |

LingBot-VLA 코드베이스는 두 모델 설정에서 모두 가장 빠르다. 256 GPU에서 Qwen 설정은 StarVLA의 약 2.8배, PaliGemma 설정은 OpenPI의 약 1.5배다. 초록 곡선이 점선(선형 scaling)에 가깝게 붙어 있어, GPU를 늘린 만큼 throughput도 거의 비례해 늘어난다. 반면 DexBotic은 128 GPU에서 256 GPU로 늘려도 1,079에서 1,249로 약 16%만 늘어난다.

### pre-training 데이터 scaling

scaling law는 데이터나 모델을 키울 때 성능이 따르는 경험 법칙이다. 저자들은 GM-100에서 대표 과제 25개를 골라 pre-training 데이터를 3,000, 6,000, 13,000, 18,000, 20,000시간으로 바꿔가며 학습하고 Agibot G1, AgileX, Galaxea R1Pro에서 평가했다.

![[assets/wu-2026-a-pragmatic-vla-foundation-model/fig05.png]]
*Figure 5: pre-training 데이터 양에 따른 (a) progress score와 (b) 성공률 (Wu 2026, p.9)*

평균 곡선은 두 지표 모두 꾸준히 오른다. 그래프에서 읽은 근사값으로 평균 PS는 약 31%에서 약 57%로, 평균 SR은 약 18%에서 약 39%로 오른다. 2만 시간 지점에서도 기울기가 꺾이지 않아, 저자들은 데이터를 더 늘리면 성능이 계속 오를 것이라고 본다.

개별 embodiment의 추세도 대체로 평균과 같은 방향이다. 다만 단조 증가는 아니다.

- AgileX는 6,000시간에서 PS와 SR이 모두 3,000시간보다 낮아진다.
- Galaxea R1Pro의 SR은 13,000시간에서 18,000시간 사이에 내려간다.

저자들은 세 로봇의 추세가 평균과 일치한다는 점을 들어 scaling 효과가 특정 플랫폼에 한정되지 않는다고 결론짓는다.

### post-training 데이터 효율

새 과제에 적응하는 데 필요한 데이터 양도 측정했다. Agibot G1에서 GM-100 대표 과제 8개를 골라 과제당 시연 데이터를 40개, 80개, 130개로 바꿔 post-training했다.

![[assets/wu-2026-a-pragmatic-vla-foundation-model/fig06.png]]
*Figure 6: 과제당 시연 데이터 수에 따른 성공률(막대)과 progress score(선) (Wu 2026, p.9)*

| 과제당 시연 데이터 | π0.5 SR | LingBot-VLA SR | π0.5 PS | LingBot-VLA PS |
|---|---|---|---|---|
| 40개 | 27.4% | 30.8% | 42.1% | 57.8% |
| 80개 | 32.4% | 43.3% | 52.7% | 63.7% |
| 130개 | 38.0% | 47.8% | 58.7% | 71.3% |

LingBot-VLA는 시연 데이터 80개만으로 130개를 모두 쓴 π0.5보다 SR(43.3% 대 38.0%)과 PS(63.7% 대 58.7%) 모두 높다. SR 격차는 40개에서 3.4%p, 80개에서 10.9%p, 130개에서 9.8%p로, 데이터가 적은 구간보다 많은 구간에서 더 크다. 즉 LingBot-VLA는 적은 데이터로 빠르게 적응하는 동시에 데이터를 더 줄 때 더 많이 개선된다.

## 한계

- **적용 범위**: pre-training 데이터와 평가가 모두 dual-arm 탁상 조작이다. 평가에서는 이동 로봇도 차체와 허리를 고정했다. 저자들은 single-arm 데이터와 이동 로봇 데이터를 결합해 mobile manipulation으로 넓히는 것을 향후 과제로 든다.
- **낮은 절대 성공률**: 실제 환경 평균 SR이 가장 좋은 모델도 16.87%다. 상대 비교에서는 앞서지만 GM-100 과제 다수는 아직 풀리지 않았다.
- **depth 결합의 불균일한 효과**: 실제 환경에서 Agibot G1과 Leju KUAVO 4 Pro는 w/ depth의 SR이 w/o depth보다 낮다. 시뮬레이션에서도 Click Bell처럼 π0.5보다 크게 낮은 과제가 있다.
- **수치 서술의 불일치**: 본문의 π0.5 대비 향상폭(SR 4.28%, PS 7.76%)이 Table 1 평균에서 계산한 값(3.87%p, 7.84%p)과 다르다. Figure 1 캡션과 본문 일부는 평가 플랫폼을 "three"로 적지만 Table 1은 4종이다.
- **scaling 실험 규모**: scaling 곡선은 과제 25개 부분집합과 데이터 양 5개 지점에서 얻은 것이고, 개별 로봇 곡선에는 하락 구간이 있다.
- **설계 세부 미기재**: 로봇 9종의 action space를 통합하는 구체적 방식, w/ depth 학습 시 손실 가중치는 본문에 서술되지 않았다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| LingBot-VLA | Qwen2.5-VL과 action expert를 MoT로 묶은 VLA foundation model. 약 2만 시간 실제 데이터로 pre-training |
| Mixture-of-Transformers (MoT) | 모달리티마다 별도 transformer 경로를 두고 shared self-attention으로 층마다 결합하는 구조 |
| LingBot-Depth | depth distillation의 teacher로 쓰는 depth 모델 |
| GM-100 | 과제 100개로 구성된 실제 환경 조작 벤치마크 |
| progress score (PS) | 완료한 subtask 수를 전체 단계 수로 나눈 부분 성공 지표 |
| atomic action | 영상 분할과 지시문 주석의 기준이 되는 최소 동작 단위 |

## 관련 페이지

- [[physical-ai/black-2024-pi0-a-vision-language-action-flow-model]]: action expert, flow matching, blockwise causal attention 설계의 출처
- [[physical-ai/black-2025-pi05-a-vision-language-action-model-with]]: 이 논문의 주 비교 대상인 π0.5
- [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation]]: 비교 대상 GR00T N1.6의 전신
- [[physical-ai/x-square-robot-2026-wall-oss-05-technical-report]]: 비교 대상 WALL-OSS 계열
- [[physical-ai/cai-2026-tau0-vla-a-hierarchical-robot-foundation]]: LingBot-VLA를 baseline으로 비교하며 지시문 grounding 실패를 분석한 연구
- [[overviews/glossary-physical-ai]]: 이 페이지의 용어 표기 기준
