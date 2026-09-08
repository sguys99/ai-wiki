---
title: "LIBERO-Recover: Beyond Task Success Towards Failure Recovery in Robotic Manipulation Models"
type: paper
year: 2026
category: physical-ai
source: liu-2026-libero-recover-beyond-task-success-towards.md
raw_path: raw/papers/liu-2026-libero-recover-beyond-task-success-towards.pdf
raw_filename: "liu-2026-libero-recover-beyond-task-success-towards.pdf"
source_collection: external
authors: "Lin Liu, Lu Zhang, Huchuan Lu (Dalian University of Technology), Wu Yang, Shuai Tao, Wulong Liu (Beta Infinity), Ziying Song (Nanyang Technological University), Zhicheng Bao (Beijing Jiaotong University)"
arxiv_id: "2609.05178"
url: "https://arxiv.org/abs/2609.05178"
tags: [physical-ai, benchmark, vla, manipulation]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/liu-2026-libero-recover-beyond-task-success-towards/fig01.png
    raw: raw/papers/liu-2026-libero-recover-beyond-task-success-towards-figures/fig01.png
    caption: "LIBERO-Recover 전체 개요. 실제 실행에서 모은 실패, 네 단계 난이도로 정리한 벤치마크, 16개 항목 평가와 레이더 차트"
    page: 2
    bbox_norm: [0.1313, 0.0958, 0.8337, 0.3391]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/liu-2026-libero-recover-beyond-task-success-towards/fig03.png
    raw: raw/papers/liu-2026-libero-recover-beyond-task-success-towards-figures/fig03.png
    caption: "네 단계 복구 난이도의 실행 장면. L1 Action Retry에서 L4 Environmental Recovery까지 시간순 프레임"
    page: 5
    bbox_norm: [0.1667, 0.0958, 0.8333, 0.3571]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/liu-2026-libero-recover-beyond-task-success-towards/fig04.png
    raw: raw/papers/liu-2026-libero-recover-beyond-task-success-towards-figures/fig04.png
    caption: "LIBERO-Recover 구축 파이프라인. 과제 실행, 실패 상태 추출, 시간축 실패 위치 파악, 복구 데이터 수집, fine-tuning과 rollout"
    page: 6
    bbox_norm: [0.1667, 0.0958, 0.8336, 0.3119]
    strategy: caption-region
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/liu-2026-libero-recover-beyond-task-success-towards/fig05.png
    raw: raw/papers/liu-2026-libero-recover-beyond-task-success-towards-figures/fig05.png
    caption: "5개 task suite와 4개 복구 난이도별 시나리오 분포. 도넛 차트 중심에 전체 2,117건이 적혀 있다"
    page: 6
    bbox_norm: [0.553, 0.615, 0.838, 0.809]
    strategy: manual
    curated: true
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/liu-2026-libero-recover-beyond-task-success-towards/fig06.png
    raw: raw/papers/liu-2026-libero-recover-beyond-task-success-towards-figures/fig06.png
    caption: "모델 6종의 LIBERO 성공률과 LIBERO-Recover 성공률 비교. task suite 4개 각각에서 감소폭을 백분율로 표시"
    page: 8
    bbox_norm: [0.1667, 0.0958, 0.8333, 0.2483]
    strategy: caption-region
    curated: true
  - id: tab01
    label: Table 1
    kind: table
    file: assets/liu-2026-libero-recover-beyond-task-success-towards/tab01.png
    raw: raw/papers/liu-2026-libero-recover-beyond-task-success-towards-figures/tab01.png
    caption: "task suite 4개에서 모델 6종의 L1부터 L4까지 난이도별 RSR"
    page: 8
    bbox_norm: [0.1565, 0.3653, 0.8333, 0.4324]
    strategy: table-region
    curated: true
---

## 요약

LIBERO-Recover는 로봇 manipulation 모델이 실패한 뒤 스스로 회복할 수 있는지를 재는 벤치마크다. manipulation은 팔과 손으로 물체를 다루는 과제 영역을 뜻한다. 기존 LIBERO에서 성공률 100%에 가까운 점수를 내던 VLA와 WAM 모델 6종이 이 벤치마크에서는 5.8%에서 34.0% 사이의 성공률에 그친다.

이 결과가 중요한 이유는 벤치마크 점수와 실제 신뢰성 사이의 간극을 수치로 드러내기 때문이다. 성공률 97%라는 숫자는 이상적인 초기 상태에서 한 번에 성공한 비율일 뿐이고, 실행 도중 잡기에 실패하거나 물체를 밀어 놓쳤을 때 그 모델이 무엇을 하는지는 지금까지 측정된 적이 없었다.

논문은 실패를 사람이 만들어 넣지 않는다는 점에서 앞선 LIBERO 확장들과 다르다. π0, π0.5, OpenVLA, GR00T, Wan-Policy, Cosmos-Policy를 LIBERO 과제에 그대로 실행시켜 나온 실패 상태를 수집하고, 복구에 필요한 추론의 깊이에 따라 네 단계로 나눈 시나리오 2,117건을 만들었다.

![[assets/liu-2026-libero-recover-beyond-task-success-towards/fig01.png]]
*Figure 1: LIBERO-Recover 전체 개요. 실제 실행에서 모은 실패, 네 단계 난이도로 정리한 벤치마크, 16개 항목 평가와 레이더 차트 (Liu 2026, p.2)*

## 배경

### 표준 LIBERO 평가가 측정하지 않는 것

LIBERO를 비롯한 manipulation 벤치마크의 평가 방식은 2023년 이후 크게 바뀌지 않았다. 정해진 초기 상태를 주고, 모델이 한 번의 시도로 과제를 끝내는지를 본다. SimplerEnv, RoboTwin 2.0, RoboCasa도 같은 규약을 따른다.

이 방식은 실행이 이상적으로 진행된다고 가정한다. 반면 실제 manipulation에서는 grasping 실패, 충돌, 의도치 않은 물체 이동이 계속 일어난다. grasping은 물체를 안정적으로 쥐는 동작이다. 따라서 신뢰할 수 있는 로봇은 과제를 끝내는 능력만이 아니라 실패를 인식하고, 어긋난 상태를 되돌리고, 다시 계획을 세워 실행을 재개하는 능력을 함께 갖춰야 한다.

LIBERO에서 최신 모델들이 성공률 100%에 근접하자 일부 연구는 아예 LIBERO 결과를 보고에서 제외하기 시작했다. 과제가 더 이상 모델의 능력을 구분하지 못한다는 이유였다. 논문의 출발점은 이 진단이 성급하다는 것이다. 구분이 안 되는 것은 과제가 쉬워서가 아니라 평가가 한 가지 능력만 재고 있기 때문이다.

### 기존 LIBERO 확장 벤치마크의 공통 전제

LIBERO를 더 어렵게 만들려는 시도는 이미 여러 방향으로 나와 있다. 다만 실패를 만들어 내는 방식이 모두 같다.

| 벤치마크 | 초점 | 실패를 만드는 방식 |
|---|---|---|
| LIBERO-Pro (Zhou 2025) | 암기를 넘어선 공정한 평가, 복잡한 과제 변형 | 사람이 정의한 변형 |
| LIBERO-Plus (Fei 2025) | 여러 측면에 걸친 강건성 심층 분석 | 사람이 정의한 변형 |
| LIBERO-X (Wang 2026) | 과제 조건과 환경 조건의 변화 | 사람이 정의한 변형 |
| LIBERO-Safety (Cui 2026) | 물리적 안전과 의미적 안전 | 사람이 정의한 변형 |
| LIBERO-Recover (본 논문) | 실행 중 자연 발생한 실패로부터의 복구 | 모델 실행에서 수집 |

앞의 네 벤치마크는 물체 자세, 외형, 장면 배치를 사람이 미리 바꿔 놓고 그 조건에서 과제를 끝낼 수 있는지를 묻는다. 결과적으로 측정되는 것은 환경 변화에 대한 일반화 능력이다. 반면 실제 실패가 만들어 내는 상태는 훨씬 불규칙하다. 그릇이 뒤집히고, 집으려던 물체가 다른 물체 밑으로 굴러 들어가고, 무관한 물체가 경로를 막는다. 이런 상태를 이해하고 적절한 복구 동작을 계획해 과제를 재개하는 능력은 어느 벤치마크에서도 다뤄지지 않았다.

## 핵심 개념

### policy와 trajectory

policy는 현재 observation을 받아 다음 action을 정하는 함수를 말한다. observation은 매 timestep에 policy가 받는 센서 입력이고, action은 policy가 출력하는 제어 명령이다. policy를 실행하면 observation과 action이 시간순으로 이어진 실행 기록이 남는데 이것이 trajectory다.

논문은 manipulation 과제를 지시문(instruction) `l`과 goal 조건 `G`로 지정한다. 초기 상태 `s_0`에서 시작해 policy `π_θ`가 만드는 실행 trajectory는 다음과 같다.

```
τ = (s_0, a_0, s_1, a_1, ..., s_T)
```

기존 평가는 `s_0 → s_1 → ... → s_T`가 순조롭게 이어져 마지막에 `G(s_T, l) = 1`이 되는지만 확인한다. 실패 이후를 묻지 않으므로 실패 이후 동작이 평가에 반영되지 않는다.

### failure state

failure state는 원래 goal이 아직 만족되지 않았고, 현재 실행을 그대로 이어가는 것만으로는 과제를 끝낼 수 없으며, 그럼에도 남은 상호작용으로 회복이 가능한 중간 상태를 뜻한다. 이 상태에 도달하면 policy는 원래 action 시퀀스를 이어갈 수 없다. 실패가 과제 구성을 어떻게 바꿨는지 파악한 뒤, 필요한 상태를 먼저 복원하는 새 action 시퀀스를 만들어야 한다.

실행은 실패 이전 구간과 복구 구간으로 나뉜다.

```
s_0 → ... → s_f → s_{f+1} → ... → s_T
```

실패 이후 구간을 담당하는 것이 복구 policy `π_rec`다. `G(s_f, l) = 0`이면서 `G(s_T, l) = 1`로 만드는 `π_rec`가 존재하면 그 failure state를 recoverable로 분류한다.

### 실패와 단순한 상태 변화의 구분

실행 중 일어나는 모든 상태 변화가 실패인 것은 아니다. 물체가 조금 밀렸지만 그대로 집을 수 있다면 그것은 정상 변동이다. 논문은 세 조건을 모두 만족할 때만 failure state로 인정한다.

| 조건 | 뜻 |
|---|---|
| execution-induced | 앞선 action이 실제로 상태를 `s_t`에서 `s_f`로 바꾼 결과여야 한다 |
| task-relevant | 그 상태에서 goal이 만족되지 않아야 한다 |
| plan-invalidating | 현재 실행을 그대로 이어가는 것만으로는 원래 과제를 끝낼 수 없어야 한다 |

여기에 회복 가능성 조건이 하나 더 붙는다. `s_f`에서 출발해 goal에 도달시키는 `π_rec`가 존재해야 한다. 이 조건이 없으면 물체가 테이블 밖으로 떨어져 복구가 물리적으로 불가능한 경우까지 벤치마크에 들어오게 된다.

## 방법

### 네 단계 복구 난이도

논문은 회복 가능한 실패를 요구되는 상태 추론의 깊이에 따라 네 단계로 나눈다. 단계가 올라갈수록 문제의 성격이 action 하나를 고치는 것에서 환경 전체를 되돌리는 것으로 옮겨간다.

| 단계 | 이름 | 상태 변화 | 요구되는 복구 |
|---|---|---|---|
| L1 | Action Retry | `s_f ≈ s_expected`로 과제 구성이 실질적으로 바뀌지 않았다 | 실패한 action을 다시 시도한다. 대상 물체가 그대로면 grasping을 재시도하면 된다 |
| L2 | Action Adaptation | `s_f ≠ s_expected`지만 물체는 여전히 바로 쓸 수 있다 | 실패한 action을 반복하지 않고 관찰된 상태에 맞춰 새 action `a' = π(o_f, l)`을 만든다 |
| L3 | Object State Recovery | 과제와 직접 관련된 물체의 상태가 크게 바뀌어 그대로는 과제를 끝낼 수 없다 | 물체 상태를 먼저 되돌린 뒤 원래 과제를 재개한다. grasping 실패로 그릇이 밀려났다면 그릇 자세부터 복원한다 |
| L4 | Environmental Recovery | 원래 과제가 직접 다루지 않는 물체나 상태가 바뀌어 실행을 막는다 | 과제와 무관한 상태까지 포함해 상호작용 위상을 추론하고, 방해 요소를 찾아 환경을 복원한 뒤 과제를 재개한다 |

L1과 L2는 시각 observation을 보고 다음 action을 조정하는 것으로 해결되는 경우가 많다. 반면 L3과 L4는 물체 상태와 공간 관계와 상호작용 의존성이 어떻게 바뀌었는지를 구조적으로 추론해야 하고, 장면에 대한 충분한 기억도 필요하다. 논문은 L2와 L3 사이를 action 수준 교정에서 상태 수준 복구로 넘어가는 경계로 본다.

Figure 3이 각 단계의 실행 장면을 시간순으로 보여준다. L1은 8.2초, L4는 20.9초로 단계가 올라갈수록 복구에 걸리는 시간도 길어진다.

![[assets/liu-2026-libero-recover-beyond-task-success-towards/fig03.png]]
*Figure 3: 네 단계 복구 난이도의 실행 장면. L1 Action Retry에서 L4 Environmental Recovery까지 시간순 프레임 (Liu 2026, p.5)*

### 시나리오 구축 파이프라인

각 복구 시나리오는 6개 요소로 정의된다.

```
(I, s_0, τ_fail, s_f, g, r)
```

`I`는 과제 지시문, `s_0`는 원래 초기 상태, `τ_fail`은 실패 trajectory, `s_f`는 그 결과로 도달한 failure state, `g`는 원래 goal, `r`은 요구되는 복구 동작이다. 시나리오가 사람이 흔들어 만든 정적 변형이 아니라 실제 실패 전이에 근거한 과제 인스턴스라는 점이 정의 자체에 담겨 있다.

구축은 3단계로 진행된다.

| 단계 | 내용 | 사용 도구 |
|---|---|---|
| Stage 1: Task Execution | LIBERO task suite 4개, subtask 130개의 원래 지시문과 초기 구성을 그대로 두고 여러 policy를 실행해 실패를 만든다. 물체나 환경이나 초기 구성을 사람이 바꾸지 않고, 실행 중에 실패를 주입하지도 않는다 | π0, π0.5, OpenVLA, GR00T, Wan-Policy, Cosmos-Policy를 failure generator로 사용 |
| Stage 2: Failure Localization | 실행 영상 전체와 과제 지시문을 함께 주고 실행이 의도한 진행에서 벗어나는 시점을 시간축에서 찾는다. 영상을 `V = V_pre ∪ V_fail ∪ V_post` 세 구간으로 나눈 뒤, 예측된 경계에 대응하는 로봇 시뮬레이션 상태와 물체 자세를 시뮬레이터에서 직접 가져온다 | Qwen3.5-27B-Instruct |
| Stage 3: Failure Characterization | 후보 실패 장면의 실행 trajectory를 영상으로 렌더링해 지시문과 함께 주고, 실패 이후 결과를 평가해 복구 유형과 난이도 단계를 판정하게 한다 | Qwen3.5-27B-Instruct |

task suite는 LIBERO가 성격별로 묶어 둔 과제 집합을 가리키며, LIBERO-Spatial, LIBERO-Object, LIBERO-Goal, LIBERO-10, LIBERO-90 다섯 가지가 있다. 시뮬레이터는 물리 엔진으로 로봇과 환경의 상호작용을 계산해 실제 기기 없이 데이터를 만들고 policy를 평가하는 소프트웨어이며, LIBERO는 MuJoCo 위에서 동작한다.

실패를 사람이 주입하지 않는다는 점이 이 파이프라인의 핵심 설계다. 실패 상태와 그 결과가 모두 모델 자신의 실행에서 나오므로, 벤치마크에 담긴 실패 분포가 실제 배포 상황에서 마주칠 분포와 같은 성격을 갖는다.

![[assets/liu-2026-libero-recover-beyond-task-success-towards/fig04.png]]
*Figure 4: LIBERO-Recover 구축 파이프라인. 과제 실행, 실패 상태 추출, 시간축 실패 위치 파악, 복구 데이터 수집, fine-tuning과 rollout (Liu 2026, p.6)*

### 벤치마크 구성과 분포

완성된 벤치마크는 시나리오 2,117건을 담고 있다. task suite 5개와 난이도 4단계의 교차 분포는 다음과 같다.

| task suite | 시나리오 수 | 비중 | L1 | L2 | L3 | L4 |
|---|---|---|---|---|---|---|
| LIBERO-90 | 678 | 32.0% | 277 | 235 | 102 | 64 |
| LIBERO-10 | 578 | 27.3% | 239 | 218 | 84 | 37 |
| LIBERO-Goal | 368 | 17.4% | 154 | 124 | 70 | 20 |
| LIBERO-Object | 309 | 14.6% | 127 | 105 | 45 | 32 |
| LIBERO-Spatial | 184 | 8.7% | 61 | 55 | 45 | 23 |
| 합계 | 2,117 | 100% | 858 | 737 | 346 | 176 |

난이도별 분포는 크게 치우쳐 있다. L1이 858건인 반면 L4는 176건으로 5분의 1 수준이다. 논문은 이 불균형이 실제 모델 실행에서 자연스럽게 나온 결과이므로 사람이 다시 맞추지 않고 그대로 두었다고 밝힌다. 즉 어려운 실패가 드물게 일어난다는 사실 자체를 벤치마크가 반영하고 있다.

한편 난이도가 올라갈수록 Post-Task-Failure 사례의 비중이 늘어난다. 복구 능력이 없는 모델이 실패한 action을 반복하다 결과를 더 악화시키기 때문이라는 것이 논문의 설명이다.

![[assets/liu-2026-libero-recover-beyond-task-success-towards/fig05.png]]
*Figure 5: 5개 task suite와 4개 복구 난이도별 시나리오 분포. 도넛 차트 중심에 전체 2,117건이 적혀 있다 (Liu 2026, p.6)*

### 복구 시연 데이터 수집

fine-tuning용 데이터는 사람이 직접 만들었다. 4명의 teleoperator가 SpaceMouse로 5개 task suite에서 균등 추출한 실패 시나리오 413개에 대해 복구 trajectory 3,184개를 수집했다. teleoperation은 사람이 로봇을 원격으로 움직여 시연을 만드는 방식이다. 이렇게 만든 시연 데이터(demonstration)로 fine-tuning한 모델은 다시 실패 시나리오를 생성하는 데 투입된다. 즉 파이프라인이 한 바퀴 돌면 다음 회차의 failure generator가 갱신되는 구조다.

### 평가 지표 세 가지

논문은 복구 능력을 서로 다른 측면에서 재는 지표 세 가지를 제안한다.

| 지표 | 정의 | 해석 |
|---|---|---|
| RSR (Recovery Success Rate) | `RSR = (1/N) Σ I[G(s_T^i, l^i) = 1]`. failure state에서 시작해 원래 과제를 끝낸 비율 | 높을수록 복구 능력이 강하다. 난이도별로 RSR_L1부터 RSR_L4까지 따로 보고한다 |
| RD (Recovery Degradation) | `RD = 1 - (M_post + ε)/(M_pre + ε)`. 실패 이전 성능 `M_pre`와 실패 이후 성능 `M_post`의 비율 | 낮을수록 실패 이후에도 실행 능력을 유지한다. `ε`은 수치 안정을 위한 항이다 |
| RC (Recovery Consistency) | `RC = 1 - Std_k(R_k)`. 과제 `k`별 복구 성공률의 표준편차를 1에서 뺀 값 | 높을수록 서로 다른 failure state에서도 복구가 고르게 된다 |

RD를 계산하려면 실행을 Pre-Failure, During-Failure, Post-Failure 세 구간으로 나눠야 한다. 이 구간 분할은 Stage 2에서 이미 만들어 둔 시간축 경계를 그대로 쓴다.

## 결과

### 실험 설정

평가 대상은 VLA 4종과 WAM 2종이다. VLA는 VLM backbone으로 시각 observation과 지시문을 부호화한다. WAM은 world-action model의 약자로, 미래 장면 예측과 action 생성을 한 모델 안에서 함께 수행하는 policy 계열이며, latent action 표현을 만든 뒤 action head를 붙인다.

| 계열 | 모델 |
|---|---|
| VLA | OpenVLA-OFT, π0-FAST, GR00T-N1.5, π0 |
| WAM | Wan2-Policy, Cosmos-Predict2-Policy |

모든 모델은 공식 설정을 그대로 쓴다. LIBERO 관례를 따라 각 과제를 물체 위치를 조금씩 바꿔 가며 10회 시도하고, 제한 시간은 과제 난이도로 조정한 사람 평균 완료 시간의 1.1배다. 초기 장면 구성은 기록해 두어 모든 모델의 시작 조건을 일치시킨다.

### 표준 성공률과 복구 성공률의 격차

모든 모델이 자연 발생 실패에 노출되면 50%가 넘는 성능 하락을 보인다. task suite별 범위는 다음과 같다.

| task suite | LIBERO 성공률 범위 | LIBERO-Recover 성공률 범위 | 하락폭 범위 |
|---|---|---|---|
| LIBERO-Spatial | 92.0%에서 98.9% | 5.8%에서 15.7% | 84%에서 94% |
| LIBERO-Object | 92.0%에서 98.8% | 11.0%에서 34.0% | 65%에서 89% |
| LIBERO-Goal | 86.0%에서 97.9% | 14.7%에서 26.3% | 69%에서 85% |
| LIBERO-100 | 60.2%에서 94.5% | 8.3%에서 19.3% | 78%에서 91% |

LIBERO-Spatial의 하락이 가장 크다. 이 suite는 같은 물체를 서로 다른 위치에 놓고 공간 관계를 지시문으로 구분하는 과제로 이루어져 있어, 물체가 한 번 밀려나면 지시문과 장면의 대응 자체가 흐트러진다.

더 중요한 발견은 순위가 뒤집힌다는 점이다. Wan2-Policy는 LIBERO-100에서 GR00T-N1.5보다 14.40%p 앞서지만 대응하는 실패 시나리오에서는 5.0%p 뒤진다. π0와 π0-FAST도 LIBERO-Spatial에서 순위가 역전된다. 따라서 표준 벤치마크 순위는 실패 강건성의 예측 지표로 쓸 수 없다.

![[assets/liu-2026-libero-recover-beyond-task-success-towards/fig06.png]]
*Figure 6: 모델 6종의 LIBERO 성공률과 LIBERO-Recover 성공률 비교. task suite 4개 각각에서 감소폭을 백분율로 표시 (Liu 2026, p.8)*

### 난이도가 올라갈수록 벌어지는 차이

Table 1은 난이도 단계별 RSR을 모델 6종에 대해 담고 있다. LIBERO-Spatial과 LIBERO-Object 부분은 다음과 같다.

| 모델 | Spatial L1 | Spatial L2 | Spatial L3 | Spatial L4 | Object L1 | Object L2 | Object L3 | Object L4 |
|---|---|---|---|---|---|---|---|---|
| π0 | 40.0 | 12.5 | 12.5 | 6.7 | 55.7 | 42.5 | 24.3 | 8.8 |
| π0-FAST | 30.0 | 12.5 | 6.7 | 3.3 | 50.0 | 41.3 | 35.7 | 11.3 |
| GR00T-N1.5 | 8.0 | 12.5 | 7.5 | 3.3 | 47.1 | 27.5 | 30.0 | 2.5 |
| OpenVLA-OFT | 40.0 | 12.5 | 12.5 | 9.3 | 55.7 | 42.5 | 24.3 | 8.8 |
| Wan2-Policy | 16.0 | 4.0 | 12.0 | 12.5 | 10.0 | 32.5 | 20.0 | 0.0 |
| Cosmos-Predict2-Policy | 8.0 | 4.0 | 14.0 | 0.0 | 11.4 | 23.8 | 8.6 | 0.0 |

LIBERO-Goal과 LIBERO-100 부분은 다음과 같다.

| 모델 | Goal L1 | Goal L2 | Goal L3 | Goal L4 | LIBERO-100 L1 | L2 | L3 | L4 |
|---|---|---|---|---|---|---|---|---|
| π0 | 50.0 | 22.5 | 5.7 | 2.9 | 38.8 | 20.0 | 11.3 | 0.0 |
| π0-FAST | 56.3 | 26.3 | 5.7 | 0.0 | 23.8 | 11.4 | 16.3 | 0.0 |
| GR00T-N1.5 | 52.5 | 41.3 | 5.7 | 0.0 | 15.0 | 20.0 | 17.5 | 0.0 |
| OpenVLA-OFT | 56.3 | 31.3 | 8.6 | 4.3 | 38.8 | 20.0 | 11.3 | 0.0 |
| Wan2-Policy | 33.8 | 21.3 | 4.3 | 2.9 | 11.3 | 7.1 | 13.8 | 0.0 |
| Cosmos-Predict2-Policy | 31.3 | 18.8 | 5.7 | 0.0 | 11.3 | 11.4 | 11.3 | 0.0 |

L4에서 LIBERO-100의 6개 모델이 모두 0.0%를 기록한다. LIBERO-Goal L4에서도 4개 모델이 0.0%다. 즉 과제와 무관한 물체가 실행을 막는 상황에서는 현재 모델 가운데 어느 것도 회복하지 못한다.

L2에서 L3으로 넘어갈 때의 감소가 특히 크다. LIBERO-Goal에서 GR00T-N1.5는 L2의 41.3%에서 L3의 5.7%로 내려간다. 논문은 이 경계를 action 수준 교정과 상태 수준 복구를 가르는 지점으로 해석한다. L1과 L2는 눈에 보이는 것에 반응하면 되지만, L3부터는 무엇이 어떻게 어긋났는지를 구조적으로 표현해야 하기 때문이다.

![[assets/liu-2026-libero-recover-beyond-task-success-towards/tab01.png]]
*Table 1: task suite 4개에서 모델 6종의 L1부터 L4까지 난이도별 RSR (Liu 2026, p.8)*

### 실패 이후 누적되는 성능 손실

실패는 한 번의 방해로 끝나지 않는다. 모델 평균 기준으로 실행 구간별 RSR과 RD는 다음과 같다.

| task suite | 실패 이전 RSR | 실패 이후 RSR | RD |
|---|---|---|---|
| LIBERO-Spatial | 15.0% | 6.7% | 54.0% |
| LIBERO-Object | 38.3% | 5.0% | 82.0% |
| LIBERO-Goal | 35.5% | 4.0% | 87.0% |
| LIBERO-100 | 26.2% | 0.3% | 100.0% |

LIBERO-100의 RD가 100.0%라는 것은 실패 이후 구간에서 성공한 사례가 사실상 없다는 뜻이다. 이 suite는 여러 단계를 이어야 끝나는 long-horizon 과제를 담고 있어, 중간에 한 번 어긋나면 남은 단계 전체가 무효가 된다.

성능은 실패 구간에서 실패 이후 구간으로 갈수록 더 낮아진다. 논문은 실패한 상호작용이 반복되면서 실행이 점점 더 낯선 상태로 밀려나기 때문이라고 본다. 따라서 실패는 일시적 방해가 아니라 이후 실행 전체를 저해하는 distribution shift를 만든다. distribution shift는 모델이 학습에서 본 상태 분포와 실제로 마주치는 상태 분포가 어긋나는 현상을 뜻한다.

### WAM 계열의 복구 일관성

WAM 계열이 VLA 계열보다 일관되게 높은 RC를 기록한다. Cosmos-Predict2-Policy가 0.8837, Wan2-Policy가 0.8698이다.

논문은 학습 목표의 차이를 이유로 제시한다. VLA는 성공한 trajectory에서 action을 흉내 내는 imitation learning 중심이다. imitation learning은 시연 데이터를 흉내 내 policy를 학습하는 방법이다. 반면 world model 기반 policy는 action에 조건화된 상태 전이를 명시적으로 모델링하므로, action이 상태와 미래 결과에 어떤 영향을 주는지 추론하도록 유도된다. world model은 환경의 동역학을 학습해 미래를 예측하는 모델이다. 이 전이 인식 표현이 예상 밖 failure state에 적응하는 데 더 나은 귀납 편향을 준다는 해석이다.

다만 RC가 높다는 것이 복구를 더 잘한다는 뜻은 아니다. Table 1에서 Wan2-Policy와 Cosmos-Predict2-Policy의 RSR은 대체로 VLA 계열보다 낮다. RC는 과제 사이의 편차가 작다는 뜻이므로 고르게 낮은 경우에도 높게 나온다. 두 지표를 함께 읽어야 의미가 성립한다.

### action chunk 크기의 영향

action chunk size를 4에서 32로 키우면 네 task suite 모두에서 RSR이 일관되게 낮아진다. action chunk는 policy가 한 번에 출력하는 여러 timestep 분량의 action 묶음이다.

| 곡선 | chunk 4 | chunk 8 | chunk 16 | chunk 32 |
|---|---|---|---|---|
| LIBERO-Spatial, OpenVLA | 0.249 | 0.186 | 0.146 | 0.085 |
| LIBERO-Object, FAST | 0.436 | 0.346 | 0.274 | 0.212 |
| LIBERO-Goal, OpenVLA | 0.319 | 0.251 | 0.178 | 0.134 |
| LIBERO-100, OpenVLA | 0.221 | 0.175 | 0.129 | 0.094 |

LIBERO-Spatial에서 OpenVLA의 RSR은 chunk 4의 0.249에서 chunk 32의 0.085로 3분의 1 수준까지 내려간다. 긴 action chunk는 다음 policy 호출까지 로봇을 정해진 동작 시퀀스에 묶어 두므로 실패로 생긴 이탈을 교정하기 어렵게 만든다. 짧은 chunk는 피드백과 action 조정을 더 자주 허용해 변해 가는 실패 이후 상태를 따라가게 한다.

이 결과의 함의는 복구가 policy의 능력만으로 결정되지 않는다는 것이다. 충분히 세밀한 closed-loop 제어가 함께 필요하다. closed-loop 제어는 매 timestep 새 observation을 받아 action을 다시 정하는 방식이다. 반대로 긴 chunk를 실행하는 동안은 사실상 open-loop 구간이 되어 실패를 감지할 기회가 없다.

### 복구 데이터 혼합 학습의 전이 실패

표준 LIBERO 평가도 실패로부터 자유롭지 않다. 정상적인 초기 상태에서 출발해도 policy는 실행 중 실수를 하고 그 결과 과제를 끝내지 못한다. 논문은 복구 데이터로 학습한 능력이 표준 실행 중의 실패에도 전이되는지를 확인하기 위해, 원래 LIBERO 학습 데이터와 LIBERO-Recover 데이터를 함께 학습시켜 양쪽에서 평가했다.

| 모델 | LIBERO 평균 | LIBERO-Recover 평균 |
|---|---|---|
| GR00T-N1.5 | 86.5% | 17.8% |
| GR00T-N1.5 (Combined) | 87.2% | 21.2% |
| OpenVLA-OFT | 97.1% | 20.8% |
| OpenVLA-OFT (Combined) | 96.6% | 25.4% |

task suite별 값은 다음과 같다.

| 설정 | 지표 | Spatial | Object | Goal | LIBERO-100 |
|---|---|---|---|---|---|
| GR00T-N1.5 | LIBERO | 0.920 | 0.920 | 0.860 | 0.760 |
| GR00T-N1.5 (Combined) | LIBERO | 0.931 | 0.905 | 0.882 | 0.770 |
| OpenVLA-OFT | LIBERO | 0.976 | 0.984 | 0.979 | 0.945 |
| OpenVLA-OFT (Combined) | LIBERO | 0.982 | 0.994 | 0.970 | 0.916 |
| GR00T-N1.5 | LIBERO-Recover | 0.057 | 0.260 | 0.263 | 0.133 |
| GR00T-N1.5 (Combined) | LIBERO-Recover | 0.116 | 0.262 | 0.264 | 0.206 |
| OpenVLA-OFT | LIBERO-Recover | 0.156 | 0.326 | 0.246 | 0.103 |
| OpenVLA-OFT (Combined) | LIBERO-Recover | 0.178 | 0.333 | 0.270 | 0.236 |

복구 데이터를 섞으면 LIBERO-Recover 성능은 일관되게 올라간다. GR00T-N1.5는 17.8%에서 21.2%로, OpenVLA-OFT는 20.8%에서 25.4%로 개선된다. 반면 표준 LIBERO에서는 거의 변화가 없거나 오히려 내려간다. OpenVLA-OFT의 LIBERO 평균은 97.1%에서 96.6%로 낮아졌다.

논문은 이를 failure-recovery transfer gap이라고 부른다. failure state를 policy에 노출시키는 것만으로는 그 policy가 평상시 실행 중에 스스로 낸 오류에서 확실히 회복하게 만들지 못한다는 뜻이다. 실패한 상태에서 어떻게 움직일지를 배우는 것 외에, 자신의 실행 도중에 실패가 발생했음을 온라인으로 인식하고 반응하는 능력이 따로 필요하다는 해석으로 이어진다.

### temporal prompt의 효과

과제 시작 프레임을 시간 문맥으로 함께 제공하면 복구 성능이 개선된다.

| 설정 | Spatial | Object | Goal | LIBERO-100 | 평균 |
|---|---|---|---|---|---|
| GR00T-N1.5 | 0.057 | 0.260 | 0.263 | 0.133 | 17.8% |
| GR00T-N1.5 (temporal) | 0.066 | 0.260 | 0.264 | 0.166 | 18.9% |
| OpenVLA-OFT | 0.156 | 0.326 | 0.246 | 0.103 | 20.8% |
| OpenVLA-OFT (temporal) | 0.193 | 0.333 | 0.300 | 0.247 | 26.8% |

효과는 OpenVLA-OFT에서 훨씬 크다. LIBERO-100이 10.3%에서 24.7%로, LIBERO-Goal이 24.6%에서 30.0%로 올라간다. 개선 폭은 어려운 과제 설정일수록 크다.

시작 프레임이 현재 장면을 의도했던 과제 구성과 비교할 기준을 제공하기 때문이라는 것이 논문의 설명이다. policy는 두 장면의 차이를 보고 상태 이탈을 식별하고 실패로 무엇이 망가졌는지 추론할 수 있다. 결국 효과적인 복구는 현재 상태를 이해하는 것만으로 부족하고, 현재 상태와 기대 상태의 차이에 대한 추론을 요구한다.

### 복구 데이터의 상태 분포

Figure 10의 KDE 시각화에서 LIBERO-Recover의 상태 분포는 원래 LIBERO 데이터보다 좁은 영역에 밀집해 있고 밀도가 높은 구역이 여러 개 뚜렷하다. 반면 원래 데이터는 작업 공간 전반에 넓게 퍼져 있다.

논문은 실패 복구가 grasping과 배치와 물체 상호작용처럼 실패가 일어나기 쉬운 소수의 임계 상태 주변에 집중된다고 해석한다. 즉 복구 데이터는 표준 시연 데이터가 충분히 담지 못한 상태 전이 구간에 정보를 집중시킨다. 이 분포 차이가 복구를 별도로 모델링하고 평가해야 하는 근거가 된다.

## 한계

### 논문 내부의 수치 불일치

시나리오 개수가 세 곳에서 다르게 적혀 있다. 초록은 1,000건 이상이라고 쓰고, 본문 3.5절은 2,178건이라고 쓰며, Figure 5의 도넛 차트 중심에는 2,117건이 적혀 있다. task suite별 합계를 더하면 2,117이 나오므로 이 값이 실제 규모로 보인다.

failure generator 개수도 어긋난다. 3.4절 Stage 1은 6개 모델을 나열하는데 3.5절 본문은 3개 모델이라고 적는다. Figure 7의 RD 값도 LIBERO-Object에서 38.3%와 5.0%의 비율로 계산하면 87%인데 그림에는 82.0%로 표시돼 있다.

### 표 1의 중복 행

π0 행과 OpenVLA-OFT 행이 LIBERO-Object의 네 값(55.7, 42.5, 24.3, 8.8)에서 완전히 같다. LIBERO-Spatial의 L1부터 L3까지(40.0, 12.5, 12.5)도 같고, LIBERO-100의 네 값(38.8, 20.0, 11.3, 0.0)도 같다. 아키텍처가 다른 두 모델이 소수 첫째 자리까지 일치하는 것은 표 작성이나 실험 기록의 문제일 가능성이 있다.

### 평가 항목이 열거되지 않는다

초록과 서론이 16개 평가 항목을 반복해서 언급하지만 본문 어디에도 그 16개가 무엇인지 나열돼 있지 않다. 네 가지 핵심 능력의 이름도 초록과 서론에서 서로 다르다.

| 위치 | 네 가지 핵심 능력 |
|---|---|
| 초록 | spatial understanding, object structure reasoning, interaction understanding, topological reasoning |
| 서론 | embodiment understanding, object structure reasoning, topological interaction reasoning, failure recovery |

부록 A는 제목만 있고 내용이 비어 있다. 벤치마크를 재현하려는 독자는 프로젝트 페이지를 기다려야 한다.

### LLM 판정에 대한 검증 부재

실패 시점 판정과 난이도 분류를 Qwen3.5-27B-Instruct 한 모델이 전담하는데, 사람 라벨과의 일치도나 판정 신뢰도에 대한 보고가 없다. 난이도 단계가 이 벤치마크의 핵심 구성인 만큼, 그 라벨이 얼마나 믿을 만한지가 벤치마크 전체의 신뢰도를 좌우한다.

### 시뮬레이터 한정과 분포 불균형

모든 실험이 LIBERO의 MuJoCo 환경 안에서 이뤄진다. 실제 기기에서 발생하는 실패는 다루지 않으므로 sim2real 관점의 검증은 남아 있다. sim2real은 시뮬레이션에서 학습한 policy를 실제 기기로 옮기는 문제를 말한다.

난이도 분포의 불균형도 해석을 제약한다. L4가 전체의 8.3%인 176건에 그쳐 가장 어려운 단계의 표본이 적다. 게다가 대부분의 모델이 L4에서 0.0%를 기록하므로 이 단계에서는 모델 사이의 변별이 이루어지지 않는다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| failure state | 원래 goal이 아직 만족되지 않았고, 현재 실행을 그대로 이어가는 것만으로는 과제를 끝낼 수 없으며, 그럼에도 남은 상호작용으로 회복이 가능한 중간 상태 |
| RSR | Recovery Success Rate. failure state에서 시작해 원래 과제를 끝낸 시나리오의 비율 |
| RD | Recovery Degradation. 실패 이전 성능 대비 실패 이후 성능의 손실 비율 |
| RC | Recovery Consistency. 과제별 복구 성공률의 표준편차를 1에서 뺀 값으로, 복구의 고른 정도 |
| failure generator | 실패 시나리오를 만들기 위해 LIBERO 과제를 실제로 실행시키는 policy |
| failure-recovery transfer gap | 복구 시나리오로 학습한 능력이 표준 실행 중 자연 발생하는 실패로 전이되지 않는 현상 |
| temporal prompt | 과제 시작 프레임을 현재 observation과 함께 policy에 넣어 상태 이탈을 비교할 기준을 주는 입력 |

## 관련 페이지

- [[physical-ai/kim-2024-openvla-an-open-source-vision-language-action-model]]: 평가 대상 중 OpenVLA-OFT의 원형. 이 벤치마크에서 VLA 계열 중 가장 높은 RSR을 기록한다
- [[physical-ai/black-2024-pi0-a-vision-language-action-flow-model]]: 평가 대상 π0와 π0-FAST의 원 논문. flow matching 기반 action 출력과 action chunk 크기 설계가 복구 성능과 직결된다
- [[physical-ai/black-2025-pi05-a-vision-language-action-model-with]]: failure generator로 쓰인 π0.5. 실패 수집 단계에는 참여하지만 평가 대상에는 포함되지 않는다
- [[physical-ai/nvidia-2025-gr00t-n1-5-an-improved-open]]: 평가 대상 GR00T-N1.5. 복구 데이터 혼합 학습과 temporal prompt 실험의 두 대상 중 하나다
- [[physical-ai/nvidia-2025-cosmos-world-foundation-model-platform]]: Cosmos-Predict2-Policy의 기반 플랫폼. 이 벤치마크에서 RC가 가장 높은 WAM이다
- [[physical-ai/9bow-2026-world-action-model-rise]]: WAM 계열 전반의 설계 공간 정리. 상태 전이 모델링이 복구 일관성에 주는 영향을 이해하는 배경이 된다
- [[physical-ai/hou-2026-world-model-for-robot-learning]]: world model과 policy의 결합 방식을 5가지로 분류한 서베이. WAM이 왜 실패 상태에 더 고르게 반응하는지에 대한 이론적 배경
- [[physical-ai/nasiriany-2024-robocasa-large-scale-simulation-of-everyday]]: 같은 계열의 대규모 시뮬레이션 벤치마크. 사람이 정의한 변형으로 난이도를 만드는 기존 방식의 사례
- [[physical-ai/li-2026-roboclaw-an-agentic-framework-for]]: forward 동작에 inverse 복구 동작을 짝지어 환경을 스스로 되돌리는 프레임워크. 복구를 평가가 아니라 시스템 설계로 다루는 접근
- [[physical-ai/choi-2026-reactree-hierarchical-llm-agent-trees]]: 실패 39건을 범주별로 분류해 분석한 long-horizon planning 연구. 실패 유형화라는 문제의식을 공유한다
