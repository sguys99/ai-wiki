---
title: "Chain Of Interaction Benchmark (COIN): When Reasoning meets Embodied Interaction"
type: paper
year: 2026
category: physical-ai
raw_path: raw/papers/wang-2026-chain-of-interaction-benchmark-coin.pdf
raw_filename: "wang-2026-chain-of-interaction-benchmark-coin.pdf"
source_collection: external
authors: "Xianhao Wang, Xiaojian Ma, Haozhe Hu, Rongpeng Su, Yutian Cheng, Zhou Ziheng, Hangxin Liu, Lei Liu, Bin Li, Qing Li"
arxiv_id: "2604.16886"
tags: [physical-ai, benchmark, vla, manipulation, teleoperation]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/wang-2026-chain-of-interaction-benchmark-coin/fig01.png
    raw: raw/papers/wang-2026-chain-of-interaction-benchmark-coin-figures/fig01.png
    caption: "COIN 개요. 왼쪽은 문 열기 지시문과 primitive action 목록, 아래는 action space와 그리퍼, 형상, 도구 등 온라인 추론 항목, 오른쪽은 손잡이가 회전하지 않자 열쇠부터 풀도록 계획을 고치는 interactive reasoning 대화 예시다"
    page: 2
    bbox_norm: [0.181, 0.096, 0.815, 0.378]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/wang-2026-chain-of-interaction-benchmark-coin/fig02.png
    raw: raw/papers/wang-2026-chain-of-interaction-benchmark-coin-figures/fig02.png
    caption: "COIN 통계. 벤치마크별 step 길이 비교, COIN-Primitive와 COIN-50의 skill 분포, COIN-50 추론 능력 분포, step 길이와 subtask 개수 비중, 벤치마크 사이 skill 매핑을 함께 보여준다"
    page: 5
    bbox_norm: [0.167, 0.096, 0.833, 0.343]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/wang-2026-chain-of-interaction-benchmark-coin/fig03.png
    raw: raw/papers/wang-2026-chain-of-interaction-benchmark-coin-figures/fig03.png
    caption: "세 가지 모델 구조 비교. (a) CodeAsPolicy는 VLM이 코드를 생성하고 저수준 solver가 실행하며, (b) VLA는 환경에서 바로 action을 내고, (c) H-VLA는 System 2 planner와 System 1 executor를 지시문으로 연결한다"
    page: 7
    bbox_norm: [0.262, 0.096, 0.734, 0.3]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/wang-2026-chain-of-interaction-benchmark-coin/fig04.png
    raw: raw/papers/wang-2026-chain-of-interaction-benchmark-coin-figures/fig04.png
    caption: "COIN-Primitive 과제별 모델 성공률 heatmap. VLA 계열이 CodeAsPolicy보다 넓은 과제 범위를 덮지만 대부분의 칸이 0이다"
    page: 9
    bbox_norm: [0.213, 0.096, 0.783, 0.275]
    strategy: caption-region
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/wang-2026-chain-of-interaction-benchmark-coin/fig05.png
    raw: raw/papers/wang-2026-chain-of-interaction-benchmark-coin-figures/fig05.png
    caption: "COIN 환경 구성. Franka Emika Panda 팔을 오른쪽, 왼쪽, 손목, 정면, 왼쪽 정면 다섯 시점 카메라로 관찰한다"
    page: 14
    bbox_norm: [0.229, 0.096, 0.767, 0.383]
    strategy: caption-region
    curated: false
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/wang-2026-chain-of-interaction-benchmark-coin/fig06.png
    raw: raw/papers/wang-2026-chain-of-interaction-benchmark-coin-figures/fig06.png
    caption: "expert 시연 영상을 따라가며 측정한 VLM 추론 성능. GPT-4o가 Gemini 2.0보다 모든 능력 항목과 모든 시점에서 앞서고, 두 모델 모두 step이 진행돼도 점수가 오르지 않는다"
    page: 16
    bbox_norm: [0.197, 0.096, 0.799, 0.415]
    strategy: caption-region
    curated: false
  - id: tab01
    label: Table 1
    kind: table
    file: assets/wang-2026-chain-of-interaction-benchmark-coin/tab01.png
    raw: raw/papers/wang-2026-chain-of-interaction-benchmark-coin-figures/tab01.png
    caption: "기존 벤치마크 11종과 COIN 비교. 과제 수, 시연 데이터 수, 평균 step에 더해 연속 action, 인과 의존, 시각 조합, interactive reasoning, 시각 비가시, 기구 비가시 여섯 항목을 표시했고 COIN만 전부를 만족한다"
    page: 3
    bbox_norm: [0.167, 0.042, 0.833, 0.329]
    strategy: table-region
    curated: true
  - id: tab02
    label: Table 2
    kind: table
    file: assets/wang-2026-chain-of-interaction-benchmark-coin/tab02.png
    raw: raw/papers/wang-2026-chain-of-interaction-benchmark-coin-figures/tab02.png
    caption: "모델과 과제 유형별 trajectory 안정성과 그리퍼 안정성. CogACT만 사람 데이터 기준선을 넘고 Gr00t N1과 Pi0는 크게 낮다"
    page: 8
    bbox_norm: [0.251, 0.149, 0.746, 0.336]
    strategy: table-region
    curated: false
  - id: tab03
    label: Table 3
    kind: table
    file: assets/wang-2026-chain-of-interaction-benchmark-coin/tab03.png
    raw: raw/papers/wang-2026-chain-of-interaction-benchmark-coin-figures/tab03.png
    caption: "COIN-Composition 일반화 평가. primitive 성공률 16~19%가 composition에서 0~6.5%로 하락하고 GCS는 0.000에서 0.404 사이에 머문다"
    page: 9
    bbox_norm: [0.237, 0.371, 0.759, 0.456]
    strategy: table-region
    curated: false
  - id: tab04
    label: Table 4
    kind: table
    file: assets/wang-2026-chain-of-interaction-benchmark-coin/tab04.png
    raw: raw/papers/wang-2026-chain-of-interaction-benchmark-coin-figures/tab04.png
    caption: "COIN-50 interactive reasoning 과제 성적. 사람은 시뮬레이터에서 40%, 실제 환경에서 100%를 기록했지만 모든 모델은 3.26% 이하에 그친다"
    page: 15
    bbox_norm: [0.215, 0.163, 0.785, 0.407]
    strategy: table-region
    curated: true
  - id: tab05
    label: Table 5
    kind: table
    file: assets/wang-2026-chain-of-interaction-benchmark-coin/tab05.png
    raw: raw/papers/wang-2026-chain-of-interaction-benchmark-coin-figures/tab05.png
    caption: "벤치마크별 평균 trajectory 길이. COIN-50의 988.9 step은 두 번째로 긴 RoboCASA Composition의 371.9 step보다 2.7배 길다"
    page: 17
    bbox_norm: [0.34, 0.396, 0.656, 0.541]
    strategy: table-region
    curated: false
  - id: tab06
    label: Table 6
    kind: table
    file: assets/wang-2026-chain-of-interaction-benchmark-coin/tab06.png
    raw: raw/papers/wang-2026-chain-of-interaction-benchmark-coin-figures/tab06.png
    caption: "COIN-Primitive 20개 과제의 ID와 화면, 지시문 명세 (여러 쪽에 걸친 표의 마지막 부분)"
    page: 22
    bbox_norm: [0.167, 0.042, 0.833, 0.565]
    strategy: table-region
    curated: false
  - id: tab07
    label: Table 7
    kind: table
    file: assets/wang-2026-chain-of-interaction-benchmark-coin/tab07.png
    raw: raw/papers/wang-2026-chain-of-interaction-benchmark-coin-figures/tab07.png
    caption: "COIN-50 과제 명세. 과제 ID와 화면, 설명에 object-centric, robot-centric, compositional 능력 코드를 함께 붙였다 (여러 쪽에 걸친 표의 마지막 부분)"
    page: 30
    bbox_norm: [0.167, 0.042, 0.869, 0.682]
    strategy: table-region
    curated: false
---

## 한 줄 요약 (One-line Summary)

COIN은 로봇이 환경을 직접 건드려 보이지 않던 정보를 얻고 계획을 수정하는 능력을 재는 manipulation 벤치마크로, 90개 과제와 1,000개 시연 데이터(demonstration)를 제공하며 현재의 VLA와 code-as-policy 계열 모두 성공률 3.3% 이하에 머문다는 결과를 보고한다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 제목 | Chain Of Interaction Benchmark (COIN): When Reasoning meets Embodied Interaction |
| 저자 | Xianhao Wang 외 9인 |
| 소속 | University of Science and Technology of China, Beijing Institute for General Artificial Intelligence (BIGAI), Xidian University, Shanghai Jiao Tong University, UCLA |
| arXiv | 2604.16886v1, cs.RO, 2026-04-18, CC BY 4.0 |
| 시뮬레이터 | ManiSkill3 |
| 로봇 | Franka Emika Panda 7-DoF 팔과 평행 그리퍼 |
| 규모 | 과제 90개, 시연 데이터 1,000개 이상, 평균 988.9 step |

## 2. 주요 기여 (Key Contributions)

논문이 스스로 정리한 기여는 세 가지다.

1. **COIN 벤치마크.** COIN-Primitive 20개, COIN-Composition 20개, COIN-50 50개로 구성한 90개 과제를 interactive reasoning 능력 분류 체계에 따라 배치했다.
2. **저비용 모바일 AR teleoperation 시스템과 데이터셋.** 하드웨어 비용 20달러 미만의 스마트폰 기반 teleoperation을 만들고, 이것으로 primitive 과제당 50개씩 총 1,000개 trajectory를 5개 시점에서 수집했다.
3. **평가 지표와 분석.** 실행 안정성과 일반화 강건성을 재는 지표 6종을 정의하고 CodeAsPolicy, VLA, H-VLA 세 접근을 같은 기준으로 비교해 실패 양상을 분해했다.

논문이 강조하는 핵심 개념은 interactive reasoning이다. interactive reasoning은 환경을 계속 건드려 정보를 모으고 믿음을 갱신하며 계획을 바꾸는 능력을 뜻한다. 잠긴 문을 여는 과제가 대표 예시인데, 열쇠 구멍을 찾고 열쇠를 넣어 돌린 뒤 손잡이를 어느 방향으로 회전시킬지 시도로 알아내야 한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 과제 정의

COIN은 과제를 POMDP `M = <S, A, T, R, O, Z>`로 정의한다. POMDP는 상태 전부를 볼 수 없는 조건에서의 순차 의사결정 문제를 가리킨다. 상태 공간 S는 로봇 자세, 물체 상태, 물리 속성을 포함한다.

action space는 ManiSkill3를 따라 두 가지를 함께 제공한다. VLA용은 end-effector의 변화량을 쓰는 `A_VLA = {Δp, ΔR, g}`이고, CodeAsPolicy용은 관절 절대 위치를 쓰는 `A_VLM = {q1...q7, g}`이다. 위치 변화량은 [-0.3, 0.3], 자세 변화량은 [-0.5, 0.5] 범위로 제한한다.

observation은 카메라 5개 시점(정면, 왼쪽 뒤, 오른쪽 뒤, 왼쪽 앞, 손목)의 영상에 depth와 segmentation map, 지시문, proprioception을 더한 구성이다. proprioception은 로봇이 자기 관절 상태를 스스로 감지한 값을 말한다. reward는 성공 여부만 알려주는 이진 신호다.

### 3.2 세 단계 과제 구성

과제 90개는 난이도에 따라 세 묶음으로 나뉜다.

| 묶음 | 과제 수 | 성격 | 시연 데이터 |
|---|---|---|---|
| COIN-Primitive | 20 | 열기와 닫기, 집기와 놓기, 밀기와 당기기, 회전처럼 반복 등장하는 기본 manipulation skill | 과제당 50개 |
| COIN-Composition | 20 | primitive에 작은 시각 변화나 지시문 변형을 준 중간 난이도 | 별도 수집 없음 |
| COIN-50 | 50 | partial observability 아래에서 다단계 인과 추론이 필요한 완전한 interactive reasoning 과제 | 과제당 1개 |

환경은 ManiSkill3 위에 구축했고 자산은 PartNet-Mobility의 articulated object와 Transporter Networks, VLMbench, Sketchfab에서 가져왔다. articulated object는 문이나 서랍처럼 관절로 연결돼 일부만 움직이는 물체를 가리킨다.

각 interactive 과제에는 expert 시연 데이터, 정답 계획에 해당하는 subtask 분해 순서, 그리고 embodied VQA 문항이 붙는다. embodied VQA는 ERQA 방식을 따른 객관식 문제로, 성공 조건이나 상호작용 이력을 VLM에 묻는 추론 probe 역할을 한다.

### 3.3 추론 능력 분류 체계

COIN은 필요한 추론 능력을 세 영역으로 나누고 각 과제에 능력 코드를 붙였다.

| 영역 | 하위 범주 | 능력 코드 |
|---|---|---|
| Object-centric | 물리 속성 추정 | MAS(질량), FRI(마찰), SCA(크기), MOV(가동 여부) |
| Object-centric | 공간 추론 | OBS(장애물), ORI(방향), SRA(상대 위치), GEO(형상) |
| Object-centric | 기구 이해 | LOC(잠금 장치), KIN(운동 제약), SEQ(다단계 기구) |
| Object-centric | 시각 추론 | VCP(시각 비교), SEM(부분 구분), OCC(가림 처리) |
| Robot-centric | embodiment 인식 | MOR(형태 추론), PPO(시점 최적화), KCA(관절 한계 인식) |
| Robot-centric | 제어 최적화 | DYN(응답 조정), ACT(action space 탐색), SKL(skill 적응) |
| Compositional | 상위 통합 능력 | TOO(도구 활용), FDA(실패 기반 적응), PLA(계층 계획), EXP(경험 활용) |

### 3.4 teleoperation과 데이터 수집

COIN-teleoperation은 ARKit과 ARCore로 스마트폰의 6-DoF pose를 읽어 로봇을 조종하는 시스템이다. 하드웨어 비용은 중국 중고 시장 기준 20달러 미만이고, iPhone 7 Plus 같은 구형 기기에서도 20Hz control frequency를 유지한다. control frequency는 로봇이 1초에 몇 번 새로운 action을 갱신하는지를 뜻한다.

파이프라인은 두 부분으로 나뉜다. 휴대폰은 IMU와 자이로, 카메라 영상을 AR 프레임워크에 넣어 pose를 뽑고 웹소켓으로 PC에 보낸다. PC는 직전 pose와의 차이를 구한 뒤 최근 10개 값에 중앙값 필터를 적용하고, inverse kinematics로 관절 명령을 만들어 로봇에 전달한다.

검증 결과는 세 가지다. 수집한 trajectory의 90%가 ManiSkill3에서 재생됐고, 2016년 이후 출시된 Android와 iOS 기기에서 모두 동작했으며, 수천 달러대의 기존 teleoperation 장비 대비 접근성과 확장성에서 이점을 보였다.

COIN-Primitive Dataset은 20개 과제 각각에 대해 5개 시점으로 50회씩 수집한 1,000개 trajectory다. VLA fine-tuning의 주 학습 자원으로 쓴다.

### 3.5 평가 지표

지표는 여섯 가지이고 성격에 따라 세 묶음으로 나뉜다.

| 지표 | 묶음 | 정의 |
|---|---|---|
| SR (Success Rate) | 과제 수행 | 전체 trial 중 성공한 비율 |
| CSR (Class Success Rate) | 과제 수행 | object-centric, robot-centric, compositional 영역별 성공률 |
| VS (VQA Score) | 추론 평가 | 환경 상태와 상호작용 결과를 묻는 문항의 정답률 |
| TS (Trajectory Stability) | 실행 품질 | 속도, 가속도, jerk의 매끄러움 가중합 |
| GS (Gripper Control Stability) | 실행 품질 | 그리퍼 전환의 급격함, 전환 빈도, 팔과의 협응 가중합 |
| GCS (Generalization Capability Score) | 일반화 | composition 성공률을 primitive 성공률로 나눈 값 |

TS는 `0.3·S_vel + 0.3·S_acc + 0.4·S_jerk`로 계산한다. 각 항은 변동계수를 지수 함수에 넣은 `Smooth(x) = exp(-CV_x)` 형태이고, jerk는 위치의 3차 미분으로 움직임이 얼마나 덜컹거리는지를 나타낸다.

GS는 `0.4·S_smooth + 0.3·S_freq + 0.3·S_coord`다. 그리퍼 상태가 갑자기 바뀌면 첫 항이 깎이고, 전환 횟수가 기대치에서 멀어지면 두 번째 항이 깎이며, 팔과 그리퍼의 시점이 어긋나면 세 번째 항이 깎인다.

GCS는 1.0에 가까울수록 일반화가 잘 된 것이고 낮을수록 작은 변형에서 성능이 크게 하락하는 모델임을 뜻한다.

### 3.6 H-VLA 구조

논문은 Helix와 비슷한 두 계층 VLA 구조를 COIN 평가용으로 정의했다. dual-system VLA는 느린 계획 계층과 빠른 실행 계층을 분리한 설계를 가리킨다.

- **System 2 (상위 planner).** VLM이 여러 시점 이미지와 과제 지시문을 받아 subtask 순서를 만든다. 고정 간격(20 step마다 1회)으로 현재 observation을 다시 평가해 지시문 큐를 조정한다.
- **System 1 (하위 executor).** VLA가 이미지와 proprioception, 현재 지시문 하나를 받아 실시간으로 action을 낸다. 전체 계획은 알지 못한다.

두 계층은 자연어 지시문 하나로만 연결된다. 이 설계 선택이 뒤에서 통합 실패의 원인으로 지목된다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 COIN-50 결과와 사람 기준선

평가한 모델은 두 계열이다. H-VLA는 상위 planner 2종(GPT-4o, Gemini 2.0 Flash)과 하위 VLA 3종(Gr00t N1, Pi0, CogACT)을 조합한 6가지 구성이다. CodeAsPolicy는 Voxposer와 Rekep 두 가지이며 둘 다 gpt-4o-2024-11-20을 쓴다. Voxposer는 정답 물체 목록을 추가로 받는다.

| 모델 | Object-centric | Robot-centric | Compositional | 전체 |
|---|---|---|---|---|
| 사람 (시뮬레이터, 10개 과제) | N/A | N/A | N/A | 40% |
| 사람 (실제 환경, 10개 과제) | N/A | N/A | N/A | 100% |
| Pi0 + Gemini 2.0 | 1.88% | 2.14% | 1.97% | 1.99% |
| Pi0 + GPT-4o | 1.96% | 2.50% | 2.05% | 2.17% |
| Gr00t N1 + Gemini 2.0 | 1.74% | 2.50% | 1.82% | 2.02% |
| Gr00t N1 + GPT-4o | 1.52% | 1.79% | 1.59% | 1.63% |
| CogACT + Gemini 2.0 | 2.14% | 1.37% | 2.24% | 1.92% |
| CogACT + GPT-4o | 1.74% | 1.07% | 1.82% | 1.54% |
| Voxposer(TD) | 0.43% | 0.00% | 0.45% | 0.29% |
| Voxposer(Normal) | 2.17% | 3.57% | 2.27% | 2.67% |
| Rekep | 3.04% | 3.57% | 3.18% | 3.26% |

사람 평가는 학사 학위 소지자 3명이 사전 노출 없이 대표 과제 10개를 teleoperation으로 두 번씩 수행한 결과다. 시뮬레이터에서 40%, 실제 환경에서 100%를 기록해 과제 자체가 풀 수 있는 문제임을 확인했다. 가장 높은 모델인 Rekep의 3.26%와 비교하면 약 12배 차이다.

### 4.2 CodeAsPolicy의 실패 양상

첫 번째 문제는 비상호작용 계획 구조다. 이 계열은 환경 피드백으로 계획을 갱신하지 못한다. 논문이 든 예로, 큐브 집기에 실패하면 새 전략 없이 "back-home"과 "pick the cube"만 반복한다.

두 번째 문제는 계획과 실행의 단절이다. Figure 4의 heatmap을 보면 Voxposer와 Rekep는 기본 manipulation 과제에서도 대부분 0을 기록하고, 성공한 칸은 특정 과제에 몰려 있다.

세 번째 문제는 articulated object 처리다. 두 모델 모두 캐비닛, 문, 스위치를 다루지 못했는데, 논문은 이런 구조가 keypoint 기반 표현과 맞지 않기 때문이라고 설명한다.

### 4.3 실행 품질

| 모델 | 과제 유형 | Trajectory Stability | Gripper Stability |
|---|---|---|---|
| CogACT | Primitive | 0.150 ± 0.055 | 0.872 ± 0.134 |
| CogACT | Composition | 0.138 ± 0.039 | 0.796 ± 0.136 |
| CogACT | Interactive | 0.146 ± 0.041 | 0.782 ± 0.141 |
| Gr00t N1 | Primitive | 0.082 ± 0.015 | 0.318 ± 0.116 |
| Gr00t N1 | Composition | 0.086 ± 0.002 | 0.327 ± 0.058 |
| Gr00t N1 | Interactive | 0.084 ± 0.002 | 0.294 ± 0.050 |
| Pi0 | Primitive | 0.084 ± 0.067 | 0.440 ± 0.198 |
| Pi0 | Composition | 0.035 ± 0.043 | 0.465 ± 0.253 |
| Pi0 | Interactive | 0.061 ± 0.050 | 0.440 ± 0.219 |
| 사람 데이터 | Primitive | 0.134 ± 0.035 | 0.684 ± 0.297 |

CogACT만 사람 데이터 기준선을 두 지표 모두에서 넘었다. 논문은 원인을 temporal ensembling으로 추정하고 검증은 후속 과제로 남겼다. temporal ensembling은 여러 시점에 예측한 action chunk를 겹쳐 평균해 출력을 매끄럽게 만드는 기법이다.

나머지 모델은 사람 기준선에 크게 못 미친다. 특히 Gr00t N1의 그리퍼 안정성은 0.3 안팎으로 사람의 0.684 대비 절반 이하다. 모든 VLA에서 급격한 움직임과 불연속이 관찰됐다.

### 4.4 일반화 실패

| 모델 | Primitive SR | Composition SR | 완료 과제 | GCS |
|---|---|---|---|---|
| CogACT | 19.0% | 1.5% | 3/20 | 0.079 |
| Pi0 | 16.1% | 6.5% | 4/20 | 0.404 |
| Gr00t N1 | 16.7% | 0.0% | 0/20 | 0.000 |

primitive에서 16~19%를 내던 모델이 composition에서는 거의 전멸한다. 논문은 물체 하나를 추가하거나 지시문을 바꾸는 것만으로 실패한다고 보고한다.

지시문 민감성 사례가 특히 구체적이다. "open the door"를 수행하던 모델에 물리적으로 같은 동작을 "pull the door"로 바꿔 지시하면 성공률이 크게 하락하고 그리퍼가 엉뚱한 위치로 이동한다. 자연어 하나로 System 1과 System 2를 잇는 인터페이스가 실제 동작 의미를 담지 못한다는 증거로 제시된다.

### 4.5 VLM planner 비교

GPT-4o가 Gemini 2.0보다 논문의 추론 척도에서 약 1.5점 앞서고, 그 격차는 과제 진행 내내 유지된다. 다만 두 모델 모두 step이 진행돼도 점수가 오르지 않는다. 논문은 이를 과거 정보를 활용하는 능력에 문제가 있다는 신호로 해석한다.

embodied VQA 정답률은 과제 중반부에서 가장 높고 마지막 구간에서 조금 하락한다. 관찰을 통해 과제 관련 정보를 점진적으로 축적한다는 뜻이다.

### 4.6 시간 길이 비교

| 벤치마크 | 평균 길이(step) |
|---|---|
| CALVIN | 30 |
| ManiSkill | 52.3 |
| Libero | 77.3 |
| ARNOLD | 125.8 |
| VLABench | 157.2 |
| RLBench | 180.2 |
| RoboCASA Composition | 371.9 |
| COIN-50 | 988.9 |

COIN-50의 평균 길이는 두 번째로 긴 RoboCASA Composition의 2.7배다. 다만 논문은 길이 자체보다 상호작용 밀도를 강조한다. 과제당 평균 subtask는 2.83개이고, subtask 2개가 36%, 3개가 46%, 4개가 12%, 5개가 6%를 차지한다.

과제 다양성에 관한 수치도 함께 제시된다. 전체 과제의 50% 이상이 여러 개의 유효한 해법 경로를 갖는다. 예를 들어 Tabletop-Find-Dice는 모든 면을 차례로 확인해도 되고 주사위를 표식 위에 바로 놓아도 된다. 최소 40개 과제는 앞 단계에서 얻은 정보가 뒤 단계에 필요한 시간 의존 구조를 갖는다.

### 4.7 학습 설정

| 모델 | GPU | device batch size | step 수 |
|---|---|---|---|
| CogACT-Base | A800 4장 | 32 | 3만 |
| Gr00t N1 2B | A800 4장 | 16 | 12만 |
| Pi0-Fast | A800 3장 | 2 | 47만 |

Gr00t N1과 Pi0는 정면, 왼쪽 앞, 손목 세 카메라를 받고 CogACT는 설계상 왼쪽 앞 시점 하나만 받는다. 모든 VLA를 수렴 시점 또는 최대 3일까지 fine-tuning했고 검증 성공률로 checkpoint를 골랐다. SR은 10회 trial 평균이다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

논문이 명시한 한계는 두 가지다. 첫째, 단일 로봇 플랫폼과 정적 환경만 다뤄 실제 환경의 동적 복잡성을 담지 못한다. 둘째, 양팔 manipulation 과제가 없어 협응 문제를 드러내지 못한다.

향후 방향은 네 가지로 제시된다.

1. CogACT의 temporal ensembling에서 착안한 trajectory 매끄러움 개선
2. 시각 이해와 지시문 수행을 더 잘 결합하는 멀티모달 인식 구조
3. 자연어 인터페이스 대신 latent 벡터로 잇는 VLM과 VLA 통합 방식 비교
4. closed-loop 피드백으로 재계획하는 적응형 CodeAsPolicy 구조

추가로 가설을 세우고 검증 행동을 설계해 world model을 갱신하는 "생각하고 실행하고 다시 생각하는" 반복 학습 방식을 유망하게 본다.

## 6. 관련 연구 (Related Work)

**CodeAsPolicy 계열.** Code as Policies가 시작점이고 VLM과 미리 정의된 skill을 결합해 인식 모듈과 저수준 제어기를 조율한다. 일반화에는 강하지만 계획 후 실행 패러다임 탓에 온라인 적응이 약하다. Manipulate-Anything이 재계획을 도입했으나 부분적으로만 보이는 동적 환경에서는 여전히 한계가 있다.

**End-to-end VLA.** RT-1, RT-2, Gr00t N1, CogACT 계열은 영상과 언어를 토큰 예측으로 action에 직접 대응시킨다. 대규모 pre-training으로 추론 능력이 창발하지만 상태 유지와 적응 계획이 필요한 long-horizon 상황에서 약하다.

**계층 VLA.** Helix와 Gemini Robotics 계열은 상위 지시문을 subtask로 분해하고 하위 실행기와 조율한다.

**manipulation 벤치마크.** ARNOLD와 SimplerEnv는 사실적 시뮬레이션을 제공하지만 추론 요소가 없다. Libero와 RoboCASA는 partial observability를 일부 포함하지만 동적 상호작용과 실패 복구, interactive reasoning의 조합에는 미치지 못한다.

**시각 언어 추론 벤치마크.** VLMbench와 ClevrSkills는 단순화된 환경에서 인과 추론을 다루고 ReflectVLM은 실패 복구를 제공하지만 물리 상호작용이 제한적이다. COIN은 Table 1의 여섯 능력 항목을 모두 만족하는 유일한 벤치마크로 자리매김한다.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| interactive reasoning | 환경을 계속 건드려 정보를 모으고 계획을 갱신하는 능력. COIN의 평가 대상이다 |
| COIN-Primitive | 반복 등장하는 기본 manipulation skill 20개로 구성한 하위 집합. VLA 학습용 시연 데이터가 붙는다 |
| COIN-Composition | primitive에 작은 시각 변화나 지시문 변형을 준 20개 과제. 일반화 측정용이다 |
| COIN-50 | partial observability 아래 다단계 인과 추론이 필요한 50개 과제 |
| COIN-teleoperation | ARKit과 ARCore로 스마트폰 pose를 읽어 로봇을 조종하는 20달러 미만 teleoperation 시스템 |
| TS (Trajectory Stability) | 속도, 가속도, jerk의 변동계수를 지수 함수에 넣어 가중합한 실행 매끄러움 지표 |
| GS (Gripper Control Stability) | 그리퍼 전환의 급격함, 빈도, 팔과의 협응을 가중합한 지표 |
| GCS (Generalization Capability Score) | composition 성공률을 primitive 성공률로 나눈 값. 1.0에 가까울수록 일반화가 좋다 |
| H-VLA | System 2 VLM planner와 System 1 VLA executor를 지시문으로 연결한 계층 구조 |
| 능력 코드 | MAS, ORI, LOC처럼 과제마다 요구 추론 능력을 표시한 3글자 약어 |

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 2 | "COIN 개요와 interactive reasoning 대화 예시" | caption-region | ★ wiki 권장 (concept) |
| fig02 | 5 | "COIN 통계 종합 패널" | caption-region | ★ wiki 권장 (dataset) |
| fig03 | 7 | "CodeAsPolicy, VLA, H-VLA 구조 비교" | caption-region | ★ wiki 권장 (architecture) |
| fig04 | 9 | "COIN-Primitive 과제별 성공률 heatmap" | caption-region | ★ wiki 권장 (result) |
| fig05 | 14 | "5개 시점 카메라 환경 구성" | caption-region | (확인 필요) |
| fig06 | 16 | "GPT-4o와 Gemini 2.0의 추론 성능 비교" | caption-region | (확인 필요) |
| tab01 | 3 | "기존 벤치마크 11종과의 능력 항목 비교" | table-region | ★ wiki 권장 (positioning) |
| tab02 | 8 | "trajectory와 그리퍼 안정성" | table-region | (표로 옮겨 적음, 임베드는 선택) |
| tab03 | 9 | "COIN-Composition 일반화 평가" | table-region | (표로 옮겨 적음, 임베드는 선택) |
| tab04 | 15 | "COIN-50 성적과 사람 기준선" | table-region | ★ wiki 권장 (result) |
| tab05 | 17 | "벤치마크별 평균 trajectory 길이" | table-region | (표로 옮겨 적음, 임베드는 선택) |
| tab06 | 22 | "COIN-Primitive 과제 명세" | table-region | (부록, 확인 필요) |
| tab07 | 30 | "COIN-50 과제 명세" | table-region | (부록, 확인 필요) |
