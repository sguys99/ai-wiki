---
title: "LIBERO-Recover: Beyond Task Success Towards Failure Recovery in Robotic Manipulation Models"
type: paper
year: 2026
category: physical-ai
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
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/liu-2026-libero-recover-beyond-task-success-towards/fig02.png
    raw: raw/papers/liu-2026-libero-recover-beyond-task-success-towards-figures/fig02.png
    caption: "기존 LIBERO 계열 벤치마크와의 지원 범위 비교. 학습과 평가 제공 여부, L1에서 L4 난이도, RD와 RC와 RSR 지표 지원 여부"
    page: 3
    bbox_norm: [0.1667, 0.0958, 0.8333, 0.3236]
    strategy: caption-region
    curated: false
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
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/liu-2026-libero-recover-beyond-task-success-towards/fig07.png
    raw: raw/papers/liu-2026-libero-recover-beyond-task-success-towards-figures/fig07.png
    caption: "실패 이전, 실패 도중, 실패 이후 세 구간의 RSR 변화와 task suite별 RD 값"
    page: 9
    bbox_norm: [0.1667, 0.0958, 0.8333, 0.2367]
    strategy: caption-region
    curated: false
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/liu-2026-libero-recover-beyond-task-success-towards/fig08.png
    raw: raw/papers/liu-2026-libero-recover-beyond-task-success-towards-figures/fig08.png
    caption: "task suite 4개에서 모델 6종의 RC 비교. WAM 계열 두 모델의 곡선이 가장 위에 있다"
    page: 9
    bbox_norm: [0.1667, 0.2657, 0.8333, 0.4222]
    strategy: caption-region
    curated: false
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/liu-2026-libero-recover-beyond-task-success-towards/fig09.png
    raw: raw/papers/liu-2026-libero-recover-beyond-task-success-towards-figures/fig09.png
    caption: "action chunk size를 4에서 32까지 키울 때 RSR이 감소하는 곡선. 모델 6종과 task suite 4개"
    page: 9
    bbox_norm: [0.1667, 0.6374, 0.8333, 0.7895]
    strategy: caption-region
    curated: false
  - id: fig10
    label: Figure 10
    kind: figure
    file: assets/liu-2026-libero-recover-beyond-task-success-towards/fig10.png
    raw: raw/papers/liu-2026-libero-recover-beyond-task-success-towards-figures/fig10.png
    caption: "LIBERO-Recover 학습 trajectory와 LIBERO 학습 trajectory의 3차원 밀도 분포 비교"
    page: 11
    bbox_norm: [0.1667, 0.0958, 0.8334, 0.3514]
    strategy: caption-region
    curated: false
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
  - id: tab02
    label: Table 2
    kind: table
    file: assets/liu-2026-libero-recover-beyond-task-success-towards/tab02.png
    raw: raw/papers/liu-2026-libero-recover-beyond-task-success-towards-figures/tab02.png
    caption: "복구 데이터를 섞어 학습한 뒤 LIBERO와 LIBERO-Recover 양쪽에서 측정한 성공률"
    page: 10
    bbox_norm: [0.4794, 0.2315, 0.8333, 0.369]
    strategy: table-region
    curated: false
  - id: tab03
    label: Table 3
    kind: table
    file: assets/liu-2026-libero-recover-beyond-task-success-towards/tab03.png
    raw: raw/papers/liu-2026-libero-recover-beyond-task-success-towards-figures/tab03.png
    caption: "과제 시작 프레임을 temporal prompt로 함께 주었을 때의 RSR 변화"
    page: 10
    bbox_norm: [0.4795, 0.6416, 0.8333, 0.7181]
    strategy: table-region
    curated: false
---

## 한 줄 요약 (One-line Summary)

LIBERO에서 성공률 100%에 근접한 VLA와 WAM 모델들이 실제로 발생한 실패 상태에서 다시 시작하면 성공률이 5.8%에서 34.0% 사이로 떨어진다는 것을 보이고, 실행 중 자연 발생한 실패 2,117건을 네 단계 복구 난이도로 정리한 LIBERO-Recover 벤치마크와 RSR, RD, RC 세 지표를 제안한 논문이다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 제목 | LIBERO-Recover: Beyond Task Success Towards Failure Recovery in Robotic Manipulation Models |
| 저자 | Lin Liu, Lu Zhang, Huchuan Lu, Wu Yang, Shuai Tao, Wulong Liu, Ziying Song, Zhicheng Bao |
| 소속 | Dalian University of Technology 정보통신공학부, Beta Infinity, Nanyang Technological University, Beijing Jiaotong University |
| arXiv | 2609.05178v1 (cs.RO, 2026-09-04) |
| 분량 | 전체 13쪽(본문 11쪽, 참고문헌 2쪽, 부록은 자리만 있고 내용 없음), figure 10개, table 3개 |
| 프로젝트 | https://liulin815.github.io/LIBERO-Recovery/ |
| 기반 환경 | LIBERO(Liu 2023), MuJoCo 기반 시뮬레이터 |

교신저자는 Lu Zhang과 Ziying Song 두 명으로 표시돼 있다. 논문 안에서 벤치마크 이름이 LIBERO-Recover와 LIBERO-Recovery 두 가지로 섞여 나오는데, 제목과 본문 표기는 LIBERO-Recover이고 프로젝트 페이지 주소만 LIBERO-Recovery다.

## 2. 주요 기여 (Key Contributions)

논문이 스스로 꼽는 기여는 세 가지다.

1. **표준 LIBERO 평가가 강건성을 과대평가한다는 진단.** 기존 평가는 정해진 초기 상태에서 한 번의 시도로 과제를 끝내는지만 본다. 이 설정은 실행이 이상적으로 진행된다고 가정하므로, 실제 상호작용에서 나타나는 grasping 실패와 충돌과 의도치 않은 물체 이동을 평가에서 제외한다. grasping은 물체를 안정적으로 쥐는 동작이다.
2. **자연 발생 실패에서 만든 복구 벤치마크 LIBERO-Recover.** 물체 위치나 외형을 사람이 바꿔 실패를 합성하지 않고, VLA와 WAM 모델이 실제로 실행하다 낸 실패 상태를 그대로 시나리오로 삼는다. 4개 과제 범주, 130개 subtask, 16개 평가 항목을 다룬다.
3. **주요 VLA 모델의 대규모 비교.** 표준 과제 실행 성공률과 실패 복구 성공률 사이의 큰 차이를 보이고, 실패 상태 이해와 복구 계획 수립에서의 한계를 드러낸다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 문제 정식화

논문은 manipulation 과제를 지시문(instruction) `l`과 goal 조건 `G`로 지정한다. manipulation은 팔과 손으로 물체를 다루는 과제 영역을 뜻한다. 초기 상태 `s_0`에서 시작해 policy `π_θ`가 observation을 받아 action을 만들면 실행 trajectory가 나온다.

```
τ = (s_0, a_0, s_1, a_1, ..., s_T)
```

policy는 현재 observation을 받아 다음 action을 정하는 함수를 말한다. trajectory는 observation과 action이 시간순으로 이어진 실행 기록이다.

기존 평가 설정은 `s_0 → s_1 → ... → s_T`가 순조롭게 이어지고 마지막에 `G(s_T, l) = 1`이 되는지만 확인한다. 즉 실패 이후에 어떻게 이어갈지는 묻지 않는다.

복구 설정은 실행이 의도한 진행에서 벗어나 중간 상태 `s_f`에 도달한 경우를 다룬다. `G(s_f, l) = 0`이면 이 상태를 failure state라고 부른다. failure state는 원래 goal이 아직 만족되지 않았고 남은 상호작용으로 회복이 가능한 중간 상태를 뜻한다. 이때 policy는 원래 action 시퀀스를 그대로 이어갈 수 없고, 실패가 과제 구성을 어떻게 바꿨는지 파악한 뒤 필요한 상태를 되돌리는 새 action 시퀀스를 만들어야 한다. 실행은 실패 이전 trajectory와 복구 trajectory로 나뉜다.

```
s_0 → ... → s_f → s_{f+1} → ... → s_T
```

실패 이후 구간이 복구 policy `π_rec`에 해당하고, `G(s_f, l) = 0`이면서 `G(s_T, l) = 1`로 만드는 `π_rec`가 존재하면 그 failure state는 recoverable로 분류된다.

### 3.2 실패와 단순 상태 변화의 구분

실행 중 일어나는 모든 상태 변화가 실패인 것은 아니다. 논문은 세 조건을 모두 만족할 때만 `s_f`를 failure state로 정의한다.

| 조건 | 뜻 |
|---|---|
| execution-induced | 앞선 action이 실제로 상태를 `s_t`에서 `s_f`로 바꾼 결과여야 한다 |
| task-relevant | 그 상태에서 goal이 만족되지 않아야 한다(`G(s_f, l) = 0`) |
| plan-invalidating | 현재 실행을 그대로 이어가는 것만으로는 원래 과제를 끝낼 수 없어야 한다 |

여기에 회복 가능성 조건이 하나 더 붙는다. `s_f`에서 출발해 `G(s_T, l) = 1`에 도달시키는 `π_rec`가 존재해야 한다. 결과적으로 과제 수행 가능성을 해치지 않는 상태 변화는 정상 변동으로 두고, 현재 계획을 무효로 만들면서 복구를 요구하는 변화만 실패로 취급한다.

### 3.3 네 단계 복구 난이도

논문은 회복 가능한 실패를 상태 추론과 복구 동작의 요구량에 따라 네 단계로 나눈다. 단계가 올라갈수록 action 하나를 고치는 문제에서 환경 전체를 되돌리는 문제로 옮겨간다.

| 단계 | 이름 | 상태 변화 | 요구되는 복구 |
|---|---|---|---|
| L1 | Action Retry | `s_f ≈ s_expected`로 과제 구성이 실질적으로 바뀌지 않았다 | 실패한 action을 다시 시도한다. 대상 물체가 그대로면 grasping을 재시도하면 된다 |
| L2 | Action Adaptation | `s_f ≠ s_expected`지만 물체는 여전히 바로 쓸 수 있다 | 실패한 action을 반복하지 않고 관찰된 상태에 맞춰 새 action `a' = π(o_f, l)`을 만든다 |
| L3 | Object State Recovery | 과제와 직접 관련된 물체의 상태가 크게 바뀌어 그대로는 과제를 끝낼 수 없다 | 물체 상태를 먼저 되돌린 뒤 원래 과제를 재개한다. grasping 실패로 그릇이 밀려났다면 그릇 자세부터 복원한다 |
| L4 | Environmental Recovery | 원래 과제가 직접 다루지 않는 물체나 상태가 바뀌어 실행을 막는다 | 과제와 무관한 상태까지 포함해 상호작용 위상을 추론하고, 방해 요소를 찾아 환경을 복원한 뒤 과제를 재개한다 |

L1과 L2는 시각 observation을 보고 다음 action을 조정하는 것으로 해결되는 경우가 많다. 반면 L3과 L4는 물체 상태와 공간 관계와 상호작용 의존성의 변화를 구조적으로 추론해야 하고, 장면에 대한 충분한 기억도 필요하다. 논문은 L2와 L3 사이를 action 수준 교정에서 상태 수준 복구로 넘어가는 경계로 본다.

### 3.4 시나리오 구축 파이프라인

각 복구 시나리오는 6개 요소로 정의된다.

```
(I, s_0, τ_fail, s_f, g, r)
```

`I`는 과제 지시문, `s_0`는 원래 초기 상태, `τ_fail`은 실패 trajectory, `s_f`는 그 결과로 도달한 failure state, `g`는 원래 goal, `r`은 요구되는 복구 동작이다. 시나리오가 과제 상태를 사람이 흔들어 만든 정적 변형이 아니라 실제 실패 전이에 근거한 과제 인스턴스라는 점이 정의에 담겨 있다.

구축은 3단계로 진행된다.

| 단계 | 내용 | 사용 도구 |
|---|---|---|
| Stage 1: Task Execution | LIBERO task suite 4개, subtask 130개의 원래 지시문과 초기 구성을 그대로 두고 여러 policy를 실행해 실패를 만든다. 물체나 환경이나 초기 구성을 사람이 바꾸지 않고, 실행 중에 실패를 주입하지도 않는다 | π0, π0.5, OpenVLA, GR00T, Wan-Policy, Cosmos-Policy를 failure generator로 사용 |
| Stage 2: Failure Localization | 실행 영상 전체와 과제 지시문을 함께 주고 실행이 의도한 진행에서 벗어나는 시점을 시간축에서 찾는다. 영상을 실패 이전, 실패 도중, 실패 이후 세 구간 `V = V_pre ∪ V_fail ∪ V_post`로 나눈다. 예측된 경계에 대응하는 로봇 시뮬레이션 상태와 물체 자세를 시뮬레이터에서 직접 가져온다 | Qwen3.5-27B-Instruct |
| Stage 3: Failure Characterization | 후보 실패 장면의 실행 trajectory를 영상으로 렌더링해 지시문과 함께 주고, 실패 이후 결과를 평가해 복구 유형과 난이도 단계를 3.3의 분류에 따라 판정하게 한다 | Qwen3.5-27B-Instruct |

실패를 사람이 주입하지 않는다는 점이 이 파이프라인의 핵심 설계다. 기존 LIBERO 확장 벤치마크들이 물체 자세와 외형과 장면 배치를 사람이 바꿔 분포 변화를 만든 것과 대비된다.

### 3.5 벤치마크 통계

Figure 5의 도넛 차트가 task suite 5개와 난이도 4단계의 교차 분포를 담고 있다.

| task suite | 시나리오 수 | 비중 | L1 | L2 | L3 | L4 |
|---|---|---|---|---|---|---|
| LIBERO-90 | 678 | 32.0% | 277 | 235 | 102 | 64 |
| LIBERO-10 | 578 | 27.3% | 239 | 218 | 84 | 37 |
| LIBERO-Goal | 368 | 17.4% | 154 | 124 | 70 | 20 |
| LIBERO-Object | 309 | 14.6% | 127 | 105 | 45 | 32 |
| LIBERO-Spatial | 184 | 8.7% | 61 | 55 | 45 | 23 |
| 합계 | 2,117 | 100% | 858 | 737 | 346 | 176 |

난이도별 분포는 크게 치우쳐 있다. L1이 858건인 반면 L4는 176건으로 5분의 1 수준이다. 논문은 이 불균형이 실제 모델 실행에서 자연스럽게 나온 결과이므로 사람이 다시 맞추지 않고 그대로 두었다고 밝힌다. 또한 난이도가 올라갈수록 Post-Task-Failure 사례의 비중이 늘어나는데, 복구 능력이 없는 모델이 실패한 action을 반복하다 결과를 더 악화시키기 때문이라고 설명한다.

### 3.6 복구 시연 데이터

fine-tuning용 데이터는 사람이 직접 만들었다. 4명의 teleoperator가 SpaceMouse로 5개 task suite에서 균등 추출한 실패 시나리오 413개에 대해 복구 trajectory 3,184개를 수집했다. teleoperation은 사람이 로봇을 원격으로 움직여 시연을 만드는 방식이다. 이렇게 만든 시연 데이터(demonstration)로 fine-tuning한 모델은 다시 실패 시나리오를 생성하는 데 쓰인다.

### 3.7 평가 지표

논문은 세 가지 지표를 제안한다.

| 지표 | 정의 | 해석 |
|---|---|---|
| RSR (Recovery Success Rate) | `RSR = (1/N) Σ I[G(s_T^i, l^i) = 1]`, failure state에서 시작해 원래 과제를 끝낸 비율 | 높을수록 복구 능력이 강하다. 난이도별로 RSR_L1부터 RSR_L4까지 따로 보고한다 |
| RD (Recovery Degradation) | `RD = 1 - (M_post + ε)/(M_pre + ε)`, 실패 이전 성능 `M_pre`와 실패 이후 성능 `M_post`의 비율 | 낮을수록 실패 이후에도 실행 능력을 유지한다. `ε`은 수치 안정을 위한 항이다 |
| RC (Recovery Consistency) | `RC = 1 - Std_k(R_k)`, 과제 `k`별 복구 성공률의 표준편차 | 높을수록 서로 다른 failure state에서도 복구가 고르게 된다 |

RD는 실행을 Pre-Failure, During-Failure, Post-Failure 세 구간으로 나눠 계산한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 실험 설정

평가 대상은 VLA 4종과 WAM 2종이다. VLA는 VLM backbone으로 시각 observation과 지시문을 부호화하고, WAM은 latent action 표현을 만든 뒤 action head를 붙인다.

| 계열 | 모델 |
|---|---|
| VLA | OpenVLA-OFT, π0-FAST, GR00T-N1.5, π0 |
| WAM | Wan2-Policy, Cosmos-Predict2-Policy |

모든 모델은 공식 설정을 그대로 쓴다. LIBERO 관례를 따라 각 과제를 물체 위치를 조금씩 바꿔 가며 10회 시도하고, 제한 시간은 과제 난이도로 조정한 사람 평균 완료 시간의 1.1배다. 초기 장면 구성은 기록해 두어 시작 조건을 일치시킨다.

### 4.2 Key Finding 1. 표준 벤치마크 순위는 실패 강건성을 예측하지 못한다

모든 모델이 자연 발생 실패에 노출되면 50%가 넘는 성능 하락을 보인다. Figure 6이 task suite별로 LIBERO 성공률과 LIBERO-Recover 성공률을 나란히 놓는다.

| task suite | LIBERO 성공률 범위 | LIBERO-Recover 성공률 범위 | 하락폭 범위 |
|---|---|---|---|
| LIBERO-Spatial | 92.0%에서 98.9% | 5.8%에서 15.7% | 84%에서 94% |
| LIBERO-Object | 92.0%에서 98.8% | 11.0%에서 34.0% | 65%에서 89% |
| LIBERO-Goal | 86.0%에서 97.9% | 14.7%에서 26.3% | 69%에서 85% |
| LIBERO-100 | 60.2%에서 94.5% | 8.3%에서 19.3% | 78%에서 91% |

순위 역전도 나타난다. Wan2-Policy는 LIBERO-100에서 GR00T-N1.5보다 14.40%p 앞서지만 대응하는 실패 시나리오에서는 5.0%p 뒤진다. π0와 π0-FAST도 LIBERO-Spatial에서 순위가 뒤집힌다.

### 4.3 Key Finding 2. 국소 교정은 되지만 상태 복구는 안 된다

모든 모델이 L1과 L2에서 L3과 L4보다 훨씬 높은 성공률을 낸다. Table 1이 task suite 4개에서 모델 6종의 난이도별 RSR을 담고 있다.

| 모델 | Spatial L1 | Spatial L2 | Spatial L3 | Spatial L4 | Object L1 | Object L2 | Object L3 | Object L4 |
|---|---|---|---|---|---|---|---|---|
| π0 | 40.0 | 12.5 | 12.5 | 6.7 | 55.7 | 42.5 | 24.3 | 8.8 |
| π0-FAST | 30.0 | 12.5 | 6.7 | 3.3 | 50.0 | 41.3 | 35.7 | 11.3 |
| GR00T-N1.5 | 8.0 | 12.5 | 7.5 | 3.3 | 47.1 | 27.5 | 30.0 | 2.5 |
| OpenVLA-OFT | 40.0 | 12.5 | 12.5 | 9.3 | 55.7 | 42.5 | 24.3 | 8.8 |
| Wan2-Policy | 16.0 | 4.0 | 12.0 | 12.5 | 10.0 | 32.5 | 20.0 | 0.0 |
| Cosmos-Predict2-Policy | 8.0 | 4.0 | 14.0 | 0.0 | 11.4 | 23.8 | 8.6 | 0.0 |

| 모델 | Goal L1 | Goal L2 | Goal L3 | Goal L4 | LIBERO-100 L1 | L2 | L3 | L4 |
|---|---|---|---|---|---|---|---|---|
| π0 | 50.0 | 22.5 | 5.7 | 2.9 | 38.8 | 20.0 | 11.3 | 0.0 |
| π0-FAST | 56.3 | 26.3 | 5.7 | 0.0 | 23.8 | 11.4 | 16.3 | 0.0 |
| GR00T-N1.5 | 52.5 | 41.3 | 5.7 | 0.0 | 15.0 | 20.0 | 17.5 | 0.0 |
| OpenVLA-OFT | 56.3 | 31.3 | 8.6 | 4.3 | 38.8 | 20.0 | 11.3 | 0.0 |
| Wan2-Policy | 33.8 | 21.3 | 4.3 | 2.9 | 11.3 | 7.1 | 13.8 | 0.0 |
| Cosmos-Predict2-Policy | 31.3 | 18.8 | 5.7 | 0.0 | 11.3 | 11.4 | 11.3 | 0.0 |

L4에서 LIBERO-100의 6개 모델이 모두 0.0%를 기록한다. LIBERO-Goal L4에서도 4개 모델이 0.0%다. 논문은 L2에서 L3으로 넘어갈 때의 큰 차이를 action 수준 교정과 상태 수준 복구 사이의 전환점으로 해석한다.

### 4.4 Key Finding 3. 실패는 누적되는 distribution shift를 만든다

Figure 7이 실패 이전과 이후의 RSR 변화를 보여준다. 모델 평균 기준 수치는 다음과 같다.

| task suite | 실패 이전 RSR | 실패 이후 RSR | RD |
|---|---|---|---|
| LIBERO-Spatial | 15.0% | 6.7% | 54.0% |
| LIBERO-Object | 38.3% | 5.0% | 82.0% |
| LIBERO-Goal | 35.5% | 4.0% | 87.0% |
| LIBERO-100 | 26.2% | 0.3% | 100.0% |

성능은 실패 구간에서 실패 이후 구간으로 갈수록 더 낮아진다. 논문은 실패한 상호작용이 반복되면서 실행이 점점 더 낯선 상태로 밀려나기 때문이라고 본다. 즉 실패는 일시적 방해가 아니라 이후 실행 전체를 저해하는 distribution shift를 만든다. distribution shift는 모델이 학습에서 본 상태 분포와 실제로 마주치는 상태 분포가 어긋나는 현상을 뜻한다.

### 4.5 Key Finding 4. WAM 계열의 복구가 더 일관적이다

WAM 계열이 VLA 계열보다 일관되게 높은 RC를 기록한다. Cosmos-Predict2-Policy가 0.8837, Wan2-Policy가 0.8698이다. 논문은 학습 목표의 차이를 이유로 제시한다. VLA는 성공한 trajectory에서 action을 흉내 내는 imitation learning 중심인 반면, world model 기반 policy는 action에 조건화된 상태 전이를 명시적으로 모델링하므로 action이 상태와 미래 결과에 어떤 영향을 주는지 추론하도록 유도된다는 것이다. 이 전이 인식 표현이 예상 밖 failure state에 적응하는 데 더 나은 귀납 편향을 준다고 해석한다.

다만 RC가 높다는 것이 복구를 더 잘한다는 뜻은 아니다. Table 1에서 Wan2-Policy와 Cosmos-Predict2-Policy의 RSR은 대체로 VLA 계열보다 낮다. RC는 과제 사이의 편차가 작다는 뜻이므로, 고르게 낮은 경우에도 높게 나온다.

### 4.6 Key Finding 5. action chunk가 작을수록 복구가 잘 된다

action chunk size를 4에서 32로 키우면 네 task suite 모두에서 RSR이 일관되게 낮아진다. action chunk는 policy가 한 번에 출력하는 여러 timestep 분량의 action 묶음이다.

| 곡선 | chunk 4 | chunk 8 | chunk 16 | chunk 32 |
|---|---|---|---|---|
| LIBERO-Spatial, OpenVLA | 0.249 | 0.186 | 0.146 | 0.085 |
| LIBERO-Object, FAST | 0.436 | 0.346 | 0.274 | 0.212 |
| LIBERO-Goal, OpenVLA | 0.319 | 0.251 | 0.178 | 0.134 |
| LIBERO-100, OpenVLA | 0.221 | 0.175 | 0.129 | 0.094 |

긴 action chunk는 다음 policy 호출까지 로봇을 정해진 동작 시퀀스에 묶어 두므로 실패로 생긴 이탈을 교정하기 어렵게 만든다. 짧은 chunk는 피드백과 action 조정을 더 자주 허용해 변해 가는 실패 이후 상태를 따라가게 한다. 논문의 결론은 효과적인 복구가 유능한 policy만이 아니라 충분히 세밀한 closed-loop 제어를 함께 요구한다는 것이다. closed-loop 제어는 매 timestep 새 observation을 받아 action을 다시 정하는 방식이다.

### 4.7 Key Finding 6. 복구 학습은 표준 실행 중의 실패로 전이되지 않는다

원래 LIBERO 학습 데이터와 LIBERO-Recover 데이터를 함께 학습시킨 뒤 양쪽에서 평가한 결과가 Table 2다.

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

복구 데이터를 섞으면 LIBERO-Recover 성능은 일관되게 오르지만 표준 LIBERO에서는 거의 변화가 없거나 오히려 내려간다. OpenVLA-OFT는 LIBERO 평균이 97.1%에서 96.6%로 낮아졌다.

논문은 이를 failure-recovery transfer gap이라고 부른다. failure state를 policy에 노출시키는 것만으로는 그 policy가 평상시 실행 중에 스스로 낸 오류에서 확실히 회복하게 만들지 못한다는 뜻이다. 실패한 상태에서 어떻게 움직일지를 배우는 것 외에, 자신의 실행 도중에 실패가 발생했음을 온라인으로 인식하고 반응하는 능력이 따로 필요하다는 해석이다.

### 4.8 Key Finding 7. 시작 프레임을 temporal prompt로 주면 복구가 개선된다

과제 시작 프레임을 시간 문맥으로 함께 제공한 결과가 Table 3이다.

| 설정 | Spatial | Object | Goal | LIBERO-100 | 평균 |
|---|---|---|---|---|---|
| GR00T-N1.5 | 0.057 | 0.260 | 0.263 | 0.133 | 17.8% |
| GR00T-N1.5 (temporal) | 0.066 | 0.260 | 0.264 | 0.166 | 18.9% |
| OpenVLA-OFT | 0.156 | 0.326 | 0.246 | 0.103 | 20.8% |
| OpenVLA-OFT (temporal) | 0.193 | 0.333 | 0.300 | 0.247 | 26.8% |

효과는 OpenVLA-OFT에서 훨씬 크다. LIBERO-100이 10.3%에서 24.7%로, LIBERO-Goal이 24.6%에서 30.0%로 올라간다. 논문은 시작 프레임이 현재 장면을 의도했던 과제 구성과 비교할 기준을 제공하므로, policy가 상태 이탈을 식별하고 실패로 무엇이 망가졌는지 추론할 수 있게 된다고 설명한다. 효과적인 복구가 현재 상태 이해만이 아니라 현재 상태와 기대 상태의 차이에 대한 추론을 요구한다는 근거로 쓰인다.

### 4.9 Key Finding 8. 복구 데이터의 상태 분포가 더 집중돼 있다

Figure 10의 KDE 시각화에서 LIBERO-Recover의 상태 분포는 원래 LIBERO 데이터보다 좁은 영역에 밀집해 있고 밀도가 높은 구역이 여러 개 뚜렷하다. 반면 원래 데이터는 작업 공간 전반에 넓게 퍼져 있다. 논문은 실패 복구가 grasping과 배치와 물체 상호작용처럼 실패가 일어나기 쉬운 소수의 임계 상태 주변에 집중된다고 해석한다. 즉 복구 데이터는 표준 시연 데이터가 충분히 담지 못한 상태 전이 구간에 집중된 정보를 제공한다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

논문이 스스로 밝힌 향후 방향은 복구를 명시적으로 모델링하는 policy 설계와, 온라인 실패 인식 능력의 확보다. 여기에 자료를 읽으며 확인한 한계를 더한다.

**논문 안의 수치 불일치.** 시나리오 개수가 세 곳에서 다르게 적혀 있다. 초록은 1,000건 이상이라고 쓰고, 3.5절 본문은 2,178건이라고 쓰며, Figure 5의 도넛 차트 중심에는 2,117건이 적혀 있다. Figure 5의 task suite별 합계를 더하면 2,117이 나온다. failure generator 개수도 3.4절 Stage 1은 6개 모델을 나열하는데 3.5절 본문은 3개 모델이라고 적는다. Figure 7의 RD 값도 LIBERO-Object에서 38.3%와 5.0%의 비율로 계산하면 87%인데 그림에는 82.0%로 표시돼 있다.

**Table 1의 중복 행.** π0 행과 OpenVLA-OFT 행이 LIBERO-Object의 네 값(55.7, 42.5, 24.3, 8.8)에서 완전히 같고, LIBERO-Spatial의 L1부터 L3까지(40.0, 12.5, 12.5)도 같으며, LIBERO-100의 네 값(38.8, 20.0, 11.3, 0.0)도 같다. 서로 다른 아키텍처의 모델이 세 자리 소수까지 일치하는 것은 표 작성이나 실험 기록의 문제일 가능성이 있다.

**16개 평가 항목이 열거되지 않는다.** 초록과 서론이 16 evaluation dimensions를 반복해서 언급하지만 본문 어디에도 그 16개가 무엇인지 나열돼 있지 않다. 네 가지 핵심 능력의 이름도 초록(spatial understanding, object structure reasoning, interaction understanding, topological reasoning)과 서론(embodiment understanding, object structure reasoning, topological interaction reasoning, failure recovery)에서 서로 다르다. 부록 A는 제목만 있고 내용이 비어 있다.

**LLM 판정에 대한 검증이 없다.** 실패 시점 판정과 난이도 분류를 Qwen3.5-27B-Instruct 한 모델이 전담하는데, 사람 라벨과의 일치도나 판정 신뢰도에 대한 보고가 없다. 벤치마크의 난이도 축이 그대로 이 모델의 판단에 의존한다.

**시뮬레이터 한정.** 모든 실험이 LIBERO의 MuJoCo 환경 안에서 이뤄진다. 실제 기기에서 발생하는 실패는 다루지 않으므로 sim2real 관점의 검증은 남아 있다. sim2real은 시뮬레이션에서 학습한 policy를 실제 기기로 옮기는 문제를 말한다.

**난이도 분포의 불균형.** L4가 전체의 8.3%(176건)에 그친다. 가장 어려운 단계의 표본이 적어 L4 성적의 통계적 신뢰 구간이 넓을 수 있다. 특히 대부분의 모델이 L4에서 0.0%를 기록해 모델 사이의 변별력이 떨어진다.

## 6. 관련 연구 (Related Work)

### 6.1 로봇 manipulation policy

논문은 두 계열로 나눈다. VLA 계열은 RT-1, RT-2, OpenVLA, π0, π0.5, RoboMamba, GR00T이며, 대규모 vision-language 데이터와 로봇 데이터로 과제와 물체와 embodiment 전반의 일반화를 넓힌다. WAM 계열은 UniVLA, Video Prediction Policy, UWM, FLARE, Cosmos-Policy이며, action과 미래 상태를 함께 모델링해 action의 결과를 미리 보고 long-horizon planning을 개선한다. WAM은 world-action model의 약자다.

논문의 진단은 두 계열 모두 성공적인 action 예측과 실행에 집중하고, 실패와 예기치 않은 상태 전이와 실패 이후 복구의 체계적 모델링은 거의 다루지 않았다는 것이다.

### 6.2 로봇 manipulation 벤치마크

초기 벤치마크는 RLBench와 LIBERO가 대규모 시뮬레이션 과제와 통일된 평가 규약을 세웠다. 이후 CALVIN, SimplerEnv, RoboCasa, RoboTwin이 과제 일반화와 장면 다양성과 long-horizon 상호작용을 다뤘다.

LIBERO 확장만 따로 보면 다음과 같다.

| 벤치마크 | 초점 |
|---|---|
| LIBERO-Pro (Zhou 2025) | 암기를 넘어선 공정한 평가, 더 복잡한 과제 변형 |
| LIBERO-Plus (Fei 2025) | 여러 측면에 걸친 강건성 심층 분석 |
| LIBERO-X (Wang 2026) | 과제 조건과 환경 조건의 변화 |
| LIBERO-Safety (Cui 2026) | 물리적 안전과 의미적 안전, 바람직하지 않은 상호작용 |
| LIBERO-Recover (본 논문) | 실행 중 자연 발생한 실패로부터의 복구 |

앞의 네 벤치마크는 모두 사람이 미리 정의한 분포 변화에 의존하고, 바뀐 조건에서 과제를 끝낼 수 있는지를 평가한다. 실패 인식과 상태 복구와 실패 이후 재계획은 거의 다뤄지지 않았다는 것이 이 논문의 출발점이다.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| failure state | 원래 goal이 아직 만족되지 않았고, 현재 실행을 그대로 이어가는 것만으로는 과제를 끝낼 수 없으며, 그럼에도 남은 상호작용으로 회복이 가능한 중간 상태 |
| recoverable | failure state에서 출발해 goal에 도달시키는 복구 policy가 존재하는 성질 |
| L1 Action Retry | 과제 구성이 실질적으로 바뀌지 않아 실패한 action의 재시도만으로 회복되는 난이도 |
| L2 Action Adaptation | 물체 구성이 조금 바뀌어 실패한 action을 반복하지 않고 관찰된 상태에 맞춰 새 action을 만들어야 하는 난이도 |
| L3 Object State Recovery | 과제 관련 물체의 상태가 크게 바뀌어 물체 상태를 먼저 복원해야 하는 난이도 |
| L4 Environmental Recovery | 과제가 직접 다루지 않는 물체나 상태가 실행을 막아 환경을 복원해야 하는 난이도 |
| RSR | Recovery Success Rate. failure state에서 시작해 원래 과제를 끝낸 시나리오의 비율 |
| RD | Recovery Degradation. 실패 이전 성능 대비 실패 이후 성능의 손실 비율 |
| RC | Recovery Consistency. 과제별 복구 성공률의 표준편차를 1에서 뺀 값으로, 복구의 고른 정도 |
| failure generator | 실패 시나리오를 만들기 위해 LIBERO 과제를 실제로 실행시키는 policy. π0, π0.5, OpenVLA, GR00T, Wan-Policy, Cosmos-Policy가 쓰였다 |
| failure-recovery transfer gap | 복구 시나리오로 학습한 능력이 표준 실행 중 자연 발생하는 실패로 전이되지 않는 현상 |
| temporal prompt | 과제 시작 프레임을 현재 observation과 함께 policy에 넣어 상태 이탈을 비교할 기준을 주는 입력 |

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 2 | LIBERO-Recover 전체 개요와 레이더 차트 | caption-region | ★ wiki 권장 (overview) |
| fig02 | 3 | 기존 LIBERO 계열 벤치마크와의 지원 범위 비교 | caption-region | ★ wiki 권장 (positioning) |
| fig03 | 5 | 네 단계 복구 난이도의 실행 장면 | caption-region | ★ wiki 권장 (concept) |
| fig04 | 6 | 3단계 구축 파이프라인 | caption-region | ★ wiki 권장 (method) |
| fig05 | 6 | task suite와 난이도별 시나리오 분포 도넛 차트 | manual | ★ wiki 권장 (statistics) |
| fig06 | 8 | LIBERO 성공률과 LIBERO-Recover 성공률 비교 | caption-region | ★ wiki 권장 (result) |
| fig07 | 9 | 세 구간 RSR 변화와 RD | caption-region | ★ wiki 권장 (result) |
| fig08 | 9 | 모델별 RC 비교 | caption-region | (확인 필요, 본문 표로 대체 가능) |
| fig09 | 9 | action chunk size에 따른 RSR 변화 | caption-region | ★ wiki 권장 (analysis) |
| fig10 | 11 | 학습 trajectory의 KDE 분포 비교 | caption-region | (확인 필요, 해상도 낮음) |
| tab01 | 8 | 난이도별 RSR 전체 표 | table-region | ★ wiki 권장 (result, 본문 표로 재현함) |
| tab02 | 10 | 복구 데이터 혼합 학습 결과 | table-region | (본문 표로 재현함) |
| tab03 | 10 | temporal prompt 효과 | table-region | (본문 표로 재현함) |
