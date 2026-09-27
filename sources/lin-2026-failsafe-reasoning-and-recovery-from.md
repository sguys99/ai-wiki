---
title: "FailSafe: Reasoning and Recovery from Failures in Vision-Language-Action Models"
type: paper
year: 2026
category: physical-ai
raw_path: raw/papers/lin-2026-failsafe-reasoning-and-recovery-from.pdf
raw_filename: "lin-2026-failsafe-reasoning-and-recovery-from.pdf"
source_collection: external
authors: "Zijun Lin, Jiafei Duan, Haoquan Fang, Dieter Fox, Ranjay Krishna, Cheston Tan, Bihan Wen (Nanyang Technological University, Centre for Frontier AI Research A*STAR, Allen Institute for AI, University of Washington)"
arxiv_id: "2510.01642"
url: "https://arxiv.org/abs/2510.01642"
tags: [physical-ai, vla, manipulation, robot-dataset]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/lin-2026-failsafe-reasoning-and-recovery-from/fig01.png
    raw: raw/papers/lin-2026-failsafe-reasoning-and-recovery-from-figures/fig01.png
    caption: "FailSafe 전체 구성. 위쪽은 failure mode 주입과 systematic verification으로 이뤄진 데이터 생성, 아래쪽은 FailSafe-VLM이 VLA의 실패를 되돌리고 공간 배치, 시야각, 물체, embodiment 변화에 일반화하는 모습"
    page: 1
    bbox_norm: [0.5152, 0.2604, 0.9148, 0.6256]
    strategy: manual
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/lin-2026-failsafe-reasoning-and-recovery-from/fig02.png
    raw: raw/papers/lin-2026-failsafe-reasoning-and-recovery-from-figures/fig02.png
    caption: "FailSafe 파이프라인 5단계. 실패 생성, action 수집, systematic verification, 데이터셋 형식, 지시문 fine-tuning이 차례로 이어진다"
    page: 4
    bbox_norm: [0.0813, 0.028, 0.9139, 0.4521]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/lin-2026-failsafe-reasoning-and-recovery-from/fig03.png
    raw: raw/papers/lin-2026-failsafe-reasoning-and-recovery-from-figures/fig03.png
    caption: "FailSafe-VLM과 VLA가 함께 동작하는 구조. VLA는 매 step action을 내고 FailSafe-VLM은 10 step마다 최근 이미지 10장을 받아 실패 여부를 판정한다"
    page: 5
    bbox_norm: [0.502, 0.0557, 0.9216, 0.2147]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/lin-2026-failsafe-reasoning-and-recovery-from/fig04.png
    raw: raw/papers/lin-2026-failsafe-reasoning-and-recovery-from-figures/fig04.png
    caption: "OpenVLA 단독 실행과 FailSafe-VLM이 함께 붙은 실행의 end-effector x축, z축 위치 비교. 초록색 구간이 FailSafe-VLM이 개입한 지점이다"
    page: 7
    bbox_norm: [0.502, 0.0557, 0.9216, 0.2496]
    strategy: caption-region
    curated: false
  - id: tab01
    label: Table I
    kind: table
    file: assets/lin-2026-failsafe-reasoning-and-recovery-from/tab01.png
    raw: raw/papers/lin-2026-failsafe-reasoning-and-recovery-from-figures/tab01.png
    caption: "과제 3종에 걸친 failure mode별 데이터 수와 ground truth 수. 실패 대 성공 비율이 2.3 대 1이다"
    page: 4
    bbox_norm: [0.5406, 0.5311, 0.8829, 0.669]
    strategy: table-region
    curated: false
  - id: tab02
    label: Table II
    kind: table
    file: assets/lin-2026-failsafe-reasoning-and-recovery-from/tab02.png
    raw: raw/papers/lin-2026-failsafe-reasoning-and-recovery-from-figures/tab02.png
    caption: "ManiSkill 과제 3종에서 VLA 3종의 성공률을 FailSafe-VLM 유무로 비교한 표"
    page: 6
    bbox_norm: [0.0791, 0.0562, 0.4973, 0.186]
    strategy: table-region
    curated: false
  - id: tab03
    label: Table III
    kind: table
    file: assets/lin-2026-failsafe-reasoning-and-recovery-from/tab03.png
    raw: raw/papers/lin-2026-failsafe-reasoning-and-recovery-from-figures/tab03.png
    caption: "학습에서 보지 못한 물체 범주에 대한 OpenVLA-OFT 성공률 비교"
    page: 6
    bbox_norm: [0.502, 0.0562, 0.9253, 0.1236]
    strategy: table-region
    curated: false
  - id: tab04
    label: Table IV
    kind: table
    file: assets/lin-2026-failsafe-reasoning-and-recovery-from/tab04.png
    raw: raw/papers/lin-2026-failsafe-reasoning-and-recovery-from-figures/tab04.png
    caption: "학습에서 보지 못한 embodiment인 xArm 6에서의 OpenVLA-OFT 성공률 비교"
    page: 6
    bbox_norm: [0.5034, 0.1632, 0.9201, 0.2307]
    strategy: table-region
    curated: false
  - id: tab05
    label: Table V
    kind: table
    file: assets/lin-2026-failsafe-reasoning-and-recovery-from/tab05.png
    raw: raw/papers/lin-2026-failsafe-reasoning-and-recovery-from-figures/tab05.png
    caption: "FailSafe-VLM과 범용 VLM 3종의 실패 판정 및 회복 예측 성능 비교"
    page: 7
    bbox_norm: [0.0805, 0.0562, 0.4959, 0.1236]
    strategy: table-region
    curated: false
  - id: tab06
    label: Table VI
    kind: table
    file: assets/lin-2026-failsafe-reasoning-and-recovery-from/tab06.png
    raw: raw/papers/lin-2026-failsafe-reasoning-and-recovery-from-figures/tab06.png
    caption: "실행 75회 평균으로 잰 VLA 3종의 성능과 추론 소요 시간"
    page: 7
    bbox_norm: [0.1271, 0.178, 0.4494, 0.3079]
    strategy: table-region
    curated: false
---

## 한 줄 요약 (One-line Summary)

FailSafe는 시뮬레이터 안에서 로봇 manipulation 실패를 자동으로 만들어 내고 그 실패를 되돌리는 7-DoF recovery action을 함께 수집하는 파이프라인이며, 이 데이터로 fine-tuning한 FailSafe-VLM은 VLA 3종의 ManiSkill 성공률을 평균 최대 22.6%p 끌어올린다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 제목 | FailSafe: Reasoning and Recovery from Failures in Vision-Language-Action Models |
| 저자 | Zijun Lin, Jiafei Duan, Haoquan Fang, Dieter Fox, Ranjay Krishna, Cheston Tan, Bihan Wen |
| 소속 | Nanyang Technological University, Centre for Frontier AI Research(A*STAR), Allen Institute for AI, University of Washington |
| arXiv | 2510.01642 (v4, 2026년 7월 7일) |
| 분류 | cs.RO |
| 프로젝트 페이지 | https://jimntu.github.io/FailSafe/ |
| 실험 환경 | ManiSkill, Franka Emika Panda 및 xArm 6 |

## 2. 주요 기여 (Key Contributions)

논문이 스스로 꼽는 기여는 세 가지다.

1. **실패 생성과 회복을 함께 자동화한 첫 프레임워크.** motion planning을 지원하는 시뮬레이터라면 어디에든 결합할 수 있는 구조이며, 실패에 대한 자연어 설명과 로봇이 그대로 실행할 수 있는 recovery action을 동시에 만들어 낸다. motion planning은 지정한 시작 pose와 목표 pose 사이의 유효한 경로를 자동으로 생성하는 기능을 말한다.
2. **기존 VLM을 실패 추론 능력이 있는 모델로 바꾸는 데이터셋.** FailSafe 데이터로 fine-tuning한 모델이 VLA 3종의 성능을 높이면서 추가되는 추론 시간은 작다.
3. **일반화 범위의 실험적 확인.** 카메라 시야각, 물체 범주, 로봇 embodiment가 학습과 달라져도 FailSafe-VLM이 동작한다. embodiment는 로봇의 물리적 형상과 그에 딸린 제어 API 구성을 뜻한다.

### 문제 설정

VLA는 이미지 observation과 지시문(instruction)을 받아 로봇이 실행할 action을 직접 내놓는 모델이다. observation은 매 timestep에 policy가 받는 센서 입력을 말한다. 지금까지 VLA 학습에 쓰인 데이터는 Open X-Embodiment, BridgeData V2, DROID처럼 대부분 성공한 trajectory만 담고 있다. trajectory는 observation과 action이 시간순으로 이어진 실행 기록이다.

성공 데이터만으로 학습한 policy는 실패 상태에 들어갔을 때 참고할 전례가 없다. policy는 현재 observation을 받아 다음 action을 정하는 함수를 말한다. 논문은 이 공백을 두 갈림길로 정리한다.

| 접근 | 대표 연구 | 한계 |
|---|---|---|
| 사람 관찰자가 개입 | OLAF, YAY | 사람이 계속 지켜봐야 해서 자율 운용과 맞지 않고 규모를 키우기 어렵다 |
| 실패 데이터 자동 생성 | AHA, RoboFAC, REFLECT | 실패 판정까지는 자동화했지만 교정은 자연어 설명에 머문다 |

자연어 교정의 구체적 문제는 크기와 끝점이 정해지지 않는다는 점이다. 논문이 드는 예는 "the gripper should move left to align with the center of the cube"인데, 얼마나 왼쪽으로 몇 센티미터를 움직여야 하는지가 문장에 없다. 그리퍼는 물체를 집는 end-effector의 한 형태이고, end-effector는 로봇 팔 끝에서 물체와 접촉하는 부분이다. VLA는 이런 문장을 기존 지시문 뒤에 덧붙여 받더라도 복잡한 자연어 지시를 따르는 능력이 제한적이라 제어에 직접 반영하지 못한다.

여기서 논문의 질문이 나온다. 상위 수준의 실패 설명과 하위 수준의 교정 action을 한 파이프라인에서 대규모로 만들어 VLA에 직접 도움이 되게 할 수 있는가.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

FailSafe는 ManiSkill 위에서 구현됐고 네 단계로 나뉜다. 실패 생성, action 수집, systematic verification을 거쳐 데이터셋이 만들어지고, 그 데이터셋으로 LLaVA-OneVision 7B를 fine-tuning해 FailSafe-VLM을 얻는다.

### 3.1 실패 생성 (Failure Generation)

논문은 manipulation에서 자주 나오는 실패를 세 가지 failure mode로 정의한다.

| failure mode | 정의 | 크기 범위 |
|---|---|---|
| translation failure | 직교 좌표축 x, y, z 방향의 위치 perturbation | ±0.1 |
| rotation failure | roll, pitch, yaw의 각도 편차 | ±1 라디안 |
| no-ops failure | 로봇 팔이 일정 시간 동안 아무 움직임 없이 멈춰 있는 상태 | 해당 없음 |

perturbation은 예측이나 실행에 함께 들어가는 교란 입력을 가리킨다.

ManiSkill을 비롯한 대부분의 시뮬레이터에서 motion planning은 과제를 여러 stage로 나누고, motion planner가 stage마다 정해진 pose를 차례로 지나가며 과제를 끝낸다. FailSafe는 이 구조를 그대로 이용한다. 가능한 failure mode와 noise 범위, 실패를 넣을 stage를 YAML 설정 파일에 적어 두고, ManiSkill을 감싸는 환경 wrapper가 그 설정을 읽어 stage의 사전 정의 pose를 무작위 크기로 흔든다.

실패 trajectory 하나에는 어긋난 stage가 정확히 하나만 들어간다. 정상 경로가 A → B → C → D였다면 실패 경로는 A → B' → C → D가 된다. 이렇게 넣은 perturbation 때문에 과제가 결국 실패하면 FailSafe는 이미지 observation, 실패 trajectory, failure mode를 기록해 action 수집 단계로 넘긴다.

**지연 실패와 동시 실패의 처리.** 세 failure mode는 단순하지만 근본적이라는 것이 논문의 주장이다. 운반 도중 물체가 미끄러지는 여러 단계짜리 실패도 거슬러 올라가면 처음의 부적절한 grasping에서 나온 translation 또는 rotation 편차로 환원된다. grasping은 물체를 안정적으로 쥐는 동작이다. 그래서 FailSafe는 근본 오류가 생긴 뒤 여러 step이 지나서야 과제가 실패하는 경우를 명시적으로 다룬다. 여러 실패가 동시에 일어나는 경우도 처리되는데, 지정한 failure mode는 하나여도 corrective action ΔA가 7개 차원 전부에 의미 있는 조정을 주기 때문이다.

### 3.2 action 수집 (Action Collection)

perturbation 값을 그대로 뒤집어 delta action으로 쓰면 그리퍼와 물체가 충돌할 수 있다. 또한 교정은 특정 stage나 timestep에 묶이지 않고 실패가 완전히 전개되기 전 어느 시점에서든 적용될 수 있어야 한다. 그래서 별도의 수집 절차를 둔다.

trajectory의 각 step은 7-DoF pose로 표현된다. 올바른 trajectory와 실패 trajectory 한 쌍마다 다음 규칙으로 후보 corrective action ΔA를 모은다.

| 구성 요소 | 탐색 범위 | 이유 |
|---|---|---|
| deviated pose P_d | 실패 trajectory의 10번째 step부터 마지막 step까지 | 초반 step에서는 실패를 알아보기 어렵다 |
| corrective pose P_c | 올바른 trajectory의 시작 후 10 step부터 종료 3 step 전까지 | 그리퍼와 물체의 충돌을 막는다 |
| no-ops failure의 P_c | P_d 이후 3에서 10 step 사이에서 무작위 추출 | 멈춰 있던 팔을 정상 진행 구간으로 되돌린다 |

P_d는 후보 전체를 순서대로 훑고, 각 P_d에 P_c가 무작위로 짝지어진다. 그 결과 여러 개의 (P_d, P_c) 쌍이 생기고, 두 pose의 7-DoF 차이가 곧 ΔA다. 실패 trajectory 하나에서 여러 개의 회복 경로가 나오는 구조다.

**ΔA는 1-sparse가 아니다.** 실패 trajectory를 만들 때 특정 failure mode를 지정하긴 했지만 결과로 나오는 ΔA는 한 차원만 값을 갖는 형태가 아니다. corrective pose를 무작위로 뽑기 때문에 ΔA는 7개 차원 모두에 조정값을 담는다. 논문은 failure mode를 정의하는 목적이 ΔA를 한 차원에 가두는 것이 아니라 오류의 지배적 원인을 지목하는 데 있다고 명시한다. 여러 실패가 겹쳐 일어나는 VLA 환경을 돕기에는 7개 차원 전체를 조정하는 설계가 맞다는 판단이다. 논문 Figure 2가 드는 실제 값은 (0.043, 0.003, -0.022, 0.048, -0.008, -0.006, 0.0)이다.

### 3.3 systematic verification

후보 corrective action은 검사를 통과해야 최종 데이터셋에 들어간다. 검사의 목적은 두 가지로, ΔA가 실패를 실제로 교정하는지와 실패가 일어날 수 있는 어느 timestep에 적용해도 효과가 있는지다.

검사 방식은 재실행이다. motion planner가 로봇 팔을 먼저 deviated pose P_d로 보내고, 이어서 corrective pose P_c로 보낸 뒤, 나머지 과제 pose를 그대로 이어서 실행한다.

```
A → P_d → P_c → B → C → D
```

원래 실패했던 과제가 P_c 적용 후 성공하면 그 ΔA를 실패 생성 단계에서 모아 둔 이미지 observation, failure mode와 함께 데이터셋에 넣는다. 통과하지 못하면 버린다.

### 3.4 FailSafe 데이터셋

ManiSkill의 과제 3종에 파이프라인을 적용했다.

| 과제 | No-ops | Trans x | Trans y | Trans z | Rot x | Rot y | Rot z | GT |
|---|---|---|---|---|---|---|---|---|
| Pick Cube | 7,485 | 10,575 | 5,295 | 0 | 60 | 69 | 60 | 24,351 |
| Push Cube | 12,057 | 2,394 | 13,947 | 2,385 | 15,690 | 11,397 | 2,565 | 16,893 |
| Stack Cube | 6,693 | 11,511 | 9,792 | 0 | 12,057 | 6,270 | 738 | 14,717 |
| 합계 | 26,235 | 24,480 | 29,034 | 2,385 | 27,807 | 17,736 | 3,363 | 55,961 |

실패 항목의 합계는 13만 1,040건이고 여기에 실패가 없는 ground truth trajectory 5만 5,961건이 더해진다. 실패 대 성공 비율은 2.3 대 1이다. ground truth를 함께 넣는 이유는 모델이 실패 상황과 성공 상황을 구분하게 하기 위해서다.

failure mode별 분포가 과제마다 크게 다른 점이 눈에 띈다. Pick Cube와 Stack Cube는 Trans z 항목이 0이고 회전 실패도 60에서 69 사이로 거의 없는 반면, Push Cube는 Rot x가 15,690건으로 가장 많다. 물체를 집어 올리는 과제와 미는 과제에서 어떤 편차가 실제로 과제를 실패시키는지가 다르기 때문이다.

**데이터 형식.** 질문은 이미지 observation과 과제 지시문을 주고 잠재적 실패 여부를 묻는다. 답변은 현재 sub-task를 먼저 적고, 실패 여부를 yes 또는 no로 답한 뒤, yes인 경우에만 failure mode와 그에 대응하는 ΔA를 이어서 출력한다.

```
질문: The task is <Current Task>. First identify the current sub-task robot is executing,
      then determine whether a failure is likely at this stage by choosing from ['yes', 'no'],
      and if it is 'yes', also output a corrective action that could help the robot
      return to the correct state.

답변(실패 없음): Sub-task: <Current Sub-task>.<No>.
답변(실패 있음): Sub-task: <Current Sub-task>.<Yes>,<Failure Type>.<ΔA>.
```

실패와 성공 항목 각각에 로봇 trajectory의 연속 이미지 10장이 들어간다. 카메라는 front, side, hand 세 시점을 포함해 환경을 여러 각도에서 담는다. 다만 실제 실험에서는 VLA 학습 시야각에 맞춘 새 카메라 시점을 따로 도입해, FailSafe-VLM이 학습에서 보지 못한 시야각에도 일반화하는지를 확인한다.

### 3.5 지시문 fine-tuning

LLaVA-OneVision 7B에 대한 전체 지시문 fine-tuning을 수행했다. 일반화를 위해 RoboPoint VQA mixture를 함께 넣는 co-training 방식을 썼다. co-training은 성격이 다른 여러 데이터 원천을 하나의 학습 mixture에 함께 넣는 방식이다.

| 설정 항목 | 값 |
|---|---|
| 학습 규모 | 1 epoch, H100 GPU 32장, DeepSpeed ZeRO 3 |
| 초기화 | 단일 이미지 체크포인트 |
| 언어 backbone | Qwen2-7B-Instruct |
| vision tower | SigLIP |
| projector | 2층 GELU MLP, hidden 차원 2배 확장 |
| 시각 특징 | vision encoder의 끝에서 두 번째 층 |
| 학습 대상 | vision tower, MLP adapter, 언어 모델을 함께 학습 |
| 학습률 | 기본 1e-5, vision tower 2e-6 |
| 스케줄 | cosine decay, warmup 3% |
| weight decay | 0 |
| 수치 정밀도 | bfloat16 및 TF32 활성화 |

backbone은 상위 head가 올라타는 pre-training된 특징 추출 본체를 뜻한다.

### 3.6 VLA와의 결합 방식

FailSafe-VLM은 VLA를 대체하지 않고 옆에 붙어 동작한다. VLA가 매 step action을 내는 동안, FailSafe-VLM은 10 step마다 제어를 넘겨받아 실패 가능성을 판정한다. 실패가 확인되면 로봇이 곧바로 실행할 수 있는 ΔA를 출력하고, 그 뒤 제어권은 다시 기본 VLA로 넘어간다. 판정에 쓰이는 입력은 길이 10짜리 이미지 창이다.

실험 설정에서 카메라 시점은 VLA 학습 시점과 같게 두고 FailSafe-VLM에게만 새로운 시점이 되게 했다. 실제 배포에서 FailSafe-VLM 전용 카메라를 따로 두기 어렵다는 현실적 제약을 반영한 설정이다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 VLA 3종에 붙였을 때의 성공률

baseline VLA 3종은 과제마다 ground truth trajectory 1,000개로 fine-tuning했다. 평가는 학습 환경과 공간 배치가 다른 test seed에서 진행했다.

| VLA | FailSafe-VLM | Pick Cube | Push Cube | Stack Cube | 평균 |
|---|---|---|---|---|---|
| π0-FAST | 없음 | 88.0% | 52.0% | 96.0% | 78.7% |
| π0-FAST | 있음 | 88.0% | 64.0% | 96.0% | 82.7% |
| π0-FAST | 차이 | +0.0%p | +12.0%p | +0.0%p | +4.0%p |
| OpenVLA | 없음 | 28.0% | 4.0% | 12.0% | 14.7% |
| OpenVLA | 있음 | 48.0% | 24.0% | 40.0% | 37.3% |
| OpenVLA | 차이 | +20.0%p | +20.0%p | +28.0%p | +22.6%p |
| OpenVLA-OFT | 없음 | 84.0% | 88.0% | 100.0% | 90.7% |
| OpenVLA-OFT | 있음 | 96.0% | 100.0% | 100.0% | 98.7% |
| OpenVLA-OFT | 차이 | +12.0%p | +12.0%p | +0.0%p | +8.0%p |

세 모델 모두 평균이 올랐다. 가장 큰 폭은 OpenVLA의 22.6%p이며, baseline이 14.7%로 낮았던 만큼 개선 여지도 컸다. baseline이 이미 높았던 OpenVLA-OFT와 π0-FAST에서도 각각 8.0%p와 4.0%p가 더해졌고, OpenVLA-OFT는 Push Cube에서 100%에 도달했다.

AHA와 RoboFAC은 자연어 지시만 내놓기 때문에 이 설정에서는 비교 대상이 될 수 없다는 점을 논문이 명시한다. 논문은 FailSafe-VLM을 VLA의 대체물이 아니라 실패 추론과 회복을 맡는 보조 장치로 규정하며, 팔이 멈춰 있거나 실패 직전일 때 방향을 밀어 주는 역할을 관찰했다고 적는다.

### 4.2 학습에 없던 물체로의 일반화

과제에 쓰이는 물체를 Sphere와 Charger로 바꿨다. 둘 다 FailSafe-VLM이 학습 중 본 적 없는 범주다.

| VLA | FailSafe-VLM | Pick Sphere | Place Sphere | Pick Charger | 평균 |
|---|---|---|---|---|---|
| OpenVLA-OFT | 없음 | 44.0% | 36.0% | 80.0% | 53.3% |
| OpenVLA-OFT | 있음 | 68.0% | 52.0% | 92.0% | 70.7% |
| OpenVLA-OFT | 차이 | +24.0%p | +16.0%p | +12.0%p | +17.4%p |

평균 17.4%p가 올랐다. 논문은 이 일반화의 근거를 실패 상황 자체의 유사성에서 찾는다. 서로 다른 manipulation 과제에서 나타나는 failure mode에 공통 패턴이 있어서, 모델이 물체가 아니라 실패의 원리를 익혔다는 설명이다.

### 4.3 학습에 없던 embodiment로의 일반화

xArm 6에서 과제마다 trajectory 1,000개를 모아 OpenVLA-OFT를 fine-tuning하고, FailSafe-VLM은 Franka Emika Panda로만 학습한 체크포인트를 그대로 재사용했다.

| VLA | FailSafe-VLM | Pick Cube | Push Cube | Stack Cube | 평균 |
|---|---|---|---|---|---|
| OpenVLA-OFT (xArm 6) | 없음 | 100.0% | 100.0% | 56.0% | 85.3% |
| OpenVLA-OFT (xArm 6) | 있음 | 100.0% | 100.0% | 76.0% | 92.0% |
| OpenVLA-OFT (xArm 6) | 차이 | +0.0%p | +0.0%p | +20.0%p | +6.7%p |

xArm 6 데이터를 한 번도 보지 않은 체크포인트가 Stack Cube를 56%에서 76%로 올렸고, 이미 100%였던 두 과제의 성능을 떨어뜨리지 않았다. FailSafe가 만들어 내는 실패 상황과 trajectory가 특정 로봇 형상에 묶이지 않는다는 것이 논문의 설명이다.

### 4.4 범용 VLM과의 비교

test seed 20개를 따로 떼어 학습 데이터와 공간 배치가 다른 실패 및 성공 사례를 만들었고, 그 결과 평가 항목 1,712건이 나왔다. 평가 지표는 세 가지다.

| 지표 | 정의 |
|---|---|
| binary success | 실패 사례와 성공 사례를 구분하는 2class 분류 정확도 |
| accuracy | failure mode와 축까지 정확히 맞혔을 때만 정답으로 인정하는 정확도 |
| cosine similarity | ground truth recovery action과 예측 recovery action 사이의 코사인 유사도 |

비교 대상 VLM에는 상세 지시, ground truth 예시 1개, 가능한 delta action 범위를 담은 템플릿을 주어 공정성을 맞췄다.

| VLM | binary success | accuracy | cosine similarity |
|---|---|---|---|
| Qwen2.5-VL | 0.2401 | 0.2401 | 0.0000 |
| Gemini-2.5-flash | 0.6229 | 0.1412 | -0.0121 |
| GPT-4o | 0.7007 | 0.1960 | 0.0117 |
| FailSafe-VLM | 0.9094 | 0.8368 | 0.6522 |

Qwen2.5-VL은 trajectory가 실제로 실패하든 아니든 항상 실패 없음과 전부 0인 recovery action을 출력해 회복에 쓸 수 없었다. Gemini-2.5-flash와 GPT-4o는 실패 여부 판정에서는 각각 0.6229와 0.7007로 어느 정도 동작했지만, failure mode를 맞히는 정확도는 20% 아래에 머물렀고 recovery action의 코사인 유사도는 0에 가까웠다.

FailSafe-VLM은 세 지표 모두에서 가장 높았다. failure mode 정확도는 Gemini-2.5-flash와 GPT-4o의 네 배를 넘고 코사인 유사도는 0.6을 웃돈다. 논문은 여기에 단서를 붙인다. 하나의 실패를 되돌리는 ΔA가 여러 개 존재하므로 강한 실패 추론에 완벽에 가까운 코사인 유사도가 필요하지는 않으며, 4.1절 결과를 근거로 65% 수준이면 이미 의미 있는 성능 향상이 나온다고 본다.

### 4.5 추론 효율

| VLA | FailSafe-VLM | 성능 | 소요 시간 |
|---|---|---|---|
| π0-FAST | 없음 | 78.7% | 43.3초 |
| π0-FAST | 있음 | 82.7% | 47.2초 |
| π0-FAST | 차이 | +4.0%p | +3.9초 |
| OpenVLA | 없음 | 14.7% | 112.1초 |
| OpenVLA | 있음 | 37.3% | 121.2초 |
| OpenVLA | 차이 | +22.6%p | +9.1초 |
| OpenVLA-OFT | 없음 | 90.7% | 28.8초 |
| OpenVLA-OFT | 있음 | 98.7% | 32.6초 |
| OpenVLA-OFT | 차이 | +8.0%p | +3.8초 |

실행 75회 평균이다. 추가 시간은 3.8초에서 9.1초 사이다. 논문은 이 지연의 대부분이 FailSafe-VLM에서 corrective action을 받은 뒤 시뮬레이터가 다시 경로를 계획하는 데서 온다고 분석하고, 더 빠른 시뮬레이션이나 real-time action chunking으로 줄일 수 있다고 본다. real-time action chunking은 추론 지연이 있어도 action chunk가 매끄럽게 이어지도록 학습 중에 지연을 흉내 내는 기법이다.

### 4.6 정성 분석

OpenVLA와 FailSafe-VLM을 함께 실행했을 때 end-effector의 x축과 z축 위치가 시간에 따라 어떻게 변하는지를 관찰했다. 과제는 "Pick up the red cube on the table"이다.

실행 초반에 로봇 팔은 거의 멈춘 상태였다. VLA가 학습한 데이터에 이런 상황이 없으므로 실패 추론 능력이 없으면 이 상태가 그대로 지속된다. FailSafe-VLM은 잠재적 실패를 감지하고 팔을 ground truth trajectory 쪽으로 밀어 주었으며, 그 개입 구간이 그래프에 초록색으로 표시된다.

과제 후반에 x축이 ground truth pose에서 벌어지는 현상도 관찰됐지만 논문은 이를 문제로 보지 않는다. 팔이 큐브의 x 위치인 약 0.02에 도달한 뒤에는 x가 더 변해도 들어 올리는 동작에 영향을 주지 않기 때문이다. 팔이 올바른 pose로 돌아온 뒤 OpenVLA가 제어를 다시 받아 과제를 끝냈다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

| 한계 | 내용 |
|---|---|
| 회복 범위가 motion 수준에 한정 | 현재 파이프라인은 움직임 수준의 교정만 다루고 물체 수준 오류의 교정은 아직 지원하지 않는다 |
| VLA와의 결합 효율 | 성능 향상은 확인됐지만 두 모델이 맞물려 동작하는 방식의 효율과 유연성에 개선 여지가 있다 |
| 시뮬레이터 재계획 지연 | 추가 지연의 대부분이 시뮬레이터 재계획에서 발생한다 |

향후 방향으로는 real-time action chunking 도입이 명시적으로 언급된다. 논문은 FailSafe를 로봇 제어에서 더 강한 실패 추론과 자율성을 향한 초기 시도로 규정한다.

## 6. 관련 연구 (Related Work)

### 6.1 VLA 계보

| 모델 | 방식 | 한계 또는 개선점 |
|---|---|---|
| OpenVLA | Prismatic-7B를 Open X-Embodiment로 fine-tuning하고, 연속 action을 잘 쓰이지 않는 토큰 256개에 대응시켜 action tokenization을 수행 | 이산 토큰 설계가 action의 연속적 성질과 어긋나 섬세한 과제에서 효과가 떨어진다 |
| OpenVLA-OFT | action chunking과 회귀 손실을 도입해 next-token prediction과 교차 엔트로피 손실을 대체 | OpenVLA의 이산 토큰 한계를 겨냥한다 |
| π0-FAST, Diffusion-VLA | 별도의 action expert head를 두고 diffusion 또는 flow matching을 VLM backbone과 결합 | 연속적이고 높은 control frequency의 action 생성이 가능해진다 |
| MolmoAct, ChatVLA, ThinkAct | action을 직접 내놓는 대신 중간 sub-goal이나 예측 trajectory 같은 추론 신호를 생성 | 강건성과 설명 가능성을 함께 노린다 |

action tokenization은 연속값인 제어 명령을 정해진 구간으로 나눠 이산 토큰으로 바꾸는 기법이고, action chunking은 미래 여러 step의 action을 한 묶음으로 예측하는 방식이다. flow matching은 noise에서 데이터로 향하는 vector field를 학습해 샘플을 만드는 생성 기법이며, control frequency는 로봇이 1초에 몇 번 새로운 action을 갱신하는지를 뜻한다.

### 6.2 manipulation의 실패 추론

| 연구 | 방식 | FailSafe와의 차이 |
|---|---|---|
| OLAF | 사람의 구두 교정과 상태 observation을 LLM에 넣어 후보 중 하나를 고르게 한다 | 사람이 필요해 규모 확대가 어렵고 정확도가 떨어진다 |
| YAY | 사람 개입으로 상위 언어 policy를 갱신한다 | 같은 이유로 자율 운용과 맞지 않는다 |
| REFLECT | sub-goal별 계층적 로봇 요약을 LLM에 넣어 실패 여부를 판정하게 하고 RoboFail 데이터셋을 구축 | 교정이 자연어에 머문다 |
| AHA | 시뮬레이터에서 key pose를 체계적으로 흔들어 실패 상황을 생성 | 교정 자체를 다루지 않는다 |
| RoboFAC | 같은 방식으로 실패를 만들고 분석과 교정 설명을 붙인다 | 교정이 자연어여서 VLA에 직접 적용되지 않는다 |

FailSafe의 위치는 이 표의 마지막 열에서 드러난다. 실패 추론 데이터를 자동으로 대규모 생성한다는 점은 AHA, RoboFAC과 같지만, 거기에 7-DoF end-effector recovery action을 붙여 VLA 제어에 직접 들어가게 만든 점이 다르다.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| FailSafe | 시뮬레이터에서 실패 상황과 실행 가능한 recovery action을 자동으로 만들어 내는 파이프라인의 이름 |
| FailSafe-VLM | FailSafe 데이터셋으로 LLaVA-OneVision 7B를 fine-tuning해 얻은, 실패 판정과 회복을 담당하는 보조 모델 |
| failure mode | 논문이 정의한 실패의 종류. translation failure, rotation failure, no-ops failure 세 가지 |
| no-ops failure | 로봇 팔이 일정 시간 동안 아무 움직임 없이 멈춰 있는 실패 유형 |
| deviated pose (P_d) | 실패 trajectory 위에서 교정 대상으로 고른 pose |
| corrective pose (P_c) | 올바른 trajectory 위에서 P_d에 대응시킨 pose |
| corrective action (ΔA) | P_c와 P_d의 7-DoF 차이로 정의되는, 로봇이 그대로 실행할 수 있는 회복 명령 |
| systematic verification | 후보 ΔA를 실제로 재실행해 과제가 성공하는지 확인한 뒤에만 데이터셋에 넣는 검사 단계 |
| binary success | 실패 사례와 성공 사례를 구분하는 2class 분류 정확도 지표 |
| test seed | 학습 환경과 공간 배치가 다르도록 따로 떼어 둔 평가용 초기 조건 |

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 1 | "FailSafe 전체 구성과 FailSafe-VLM의 일반화 범위" | manual | ★ wiki 권장 (overview) |
| fig02 | 4 | "FailSafe 파이프라인 5단계" | caption-region | ★ wiki 권장 (method) |
| fig03 | 5 | "FailSafe-VLM과 VLA가 함께 동작하는 구조" | caption-region | ★ wiki 권장 (method) |
| fig04 | 7 | "end-effector x축과 z축 위치의 정성 비교" | caption-region | (확인 필요, 본문 서술로 대체 가능) |
| tab01 | 4 | "failure mode별 데이터 수와 ground truth 수" | table-region | 마크다운 표로 옮김 |
| tab02 | 6 | "VLA 3종의 성공률 비교" | table-region | 마크다운 표로 옮김 |
| tab03 | 6 | "새 물체 범주에서의 성공률" | table-region | 마크다운 표로 옮김 |
| tab04 | 6 | "새 embodiment에서의 성공률" | table-region | 마크다운 표로 옮김 |
| tab05 | 7 | "범용 VLM과의 실패 추론 성능 비교" | table-region | 마크다운 표로 옮김 |
| tab06 | 7 | "성능과 추론 소요 시간" | table-region | 마크다운 표로 옮김 |
