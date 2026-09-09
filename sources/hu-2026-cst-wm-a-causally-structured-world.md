---
title: "CST-WM: A Causally Structured World Model for Embodied Visual Tracking"
type: paper
year: 2026
category: physical-ai
raw_path: raw/papers/hu-2026-cst-wm-a-causally-structured-world.pdf
raw_filename: "hu-2026-cst-wm-a-causally-structured-world.pdf"
source_collection: external
authors: "Junyi Hu, Shuaihang Yuan, Yi Fang"
arxiv_id: "2609.06302"
tags: [physical-ai, world-model, mobile-robot, robot-learning]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/hu-2026-cst-wm-a-causally-structured-world/fig01.png
    raw: raw/papers/hu-2026-cst-wm-a-causally-structured-world-figures/fig01.png
    caption: "action에서 target evidence로 가는 직접 경로를 끊은 인과 구조 비교 (Figure 1, p.3)"
    page: 3
    bbox_norm: [0.1667, 0.0833, 0.8333, 0.2711]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/hu-2026-cst-wm-a-causally-structured-world/fig02.png
    raw: raw/papers/hu-2026-cst-wm-a-causally-structured-world-figures/fig02.png
    caption: "CST-WM 전체 파이프라인. 구조화 상태 구성, 인과 구조 diffusion transition, CEM planning (Figure 2, p.4)"
    page: 4
    bbox_norm: [0.1667, 0.0833, 0.8333, 0.3106]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/hu-2026-cst-wm-a-causally-structured-world/fig03.png
    raw: raw/papers/hu-2026-cst-wm-a-causally-structured-world-figures/fig03.png
    caption: "EVT-Bench에서 target을 일시적으로 놓친 뒤 다시 찾아내는 정성 사례 (Figure 3, p.9)"
    page: 9
    bbox_norm: [0.1632, 0.2824, 0.4978, 0.3966]
    strategy: manual
    curated: false
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/hu-2026-cst-wm-a-causally-structured-world/fig04.png
    raw: raw/papers/hu-2026-cst-wm-a-causally-structured-world-figures/fig04.png
    caption: "GroundingDINO target evidence score와 로봇 사람 사이 상대 거리의 관계 (Figure 4, p.9)"
    page: 9
    bbox_norm: [0.4832, 0.2824, 0.8278, 0.3966]
    strategy: manual
    curated: false
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/hu-2026-cst-wm-a-causally-structured-world/fig05.png
    raw: raw/papers/hu-2026-cst-wm-a-causally-structured-world-figures/fig05.png
    caption: "planning horizon별 offline rollout 정확도. latent 예측 오차와 target 가시성 AUROC (Figure 5, p.10)"
    page: 10
    bbox_norm: [0.1667, 0.0833, 0.5874, 0.2075]
    strategy: caption-region
    curated: true
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/hu-2026-cst-wm-a-causally-structured-world/fig06.png
    raw: raw/papers/hu-2026-cst-wm-a-causally-structured-world-figures/fig06.png
    caption: "여러 실제 실내 환경에서 수행한 tracking 정성 결과 (Figure 6, p.11)"
    page: 11
    bbox_norm: [0.1667, 0.0833, 0.8333, 0.3688]
    strategy: caption-region
    curated: false
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/hu-2026-cst-wm-a-causally-structured-world/fig07.png
    raw: raw/papers/hu-2026-cst-wm-a-causally-structured-world-figures/fig07.png
    caption: "planning 설정 세 가지의 성능과 지연 사이 Pareto 관계 (Figure 7, p.11)"
    page: 11
    bbox_norm: [0.1662, 0.3694, 0.5018, 0.6066]
    strategy: manual
    curated: false
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/hu-2026-cst-wm-a-causally-structured-world/fig08.png
    raw: raw/papers/hu-2026-cst-wm-a-causally-structured-world-figures/fig08.png
    caption: "Habitat 3.0 ablation 결과를 여섯 지표로 그린 레이더 차트 (Figure 8, p.11)"
    page: 11
    bbox_norm: [0.4822, 0.3694, 0.8458, 0.6066]
    strategy: manual
    curated: true
  - id: tab01
    label: Table 1
    kind: table
    file: assets/hu-2026-cst-wm-a-causally-structured-world/tab01.png
    raw: raw/papers/hu-2026-cst-wm-a-causally-structured-world-figures/tab01.png
    caption: "CST-WM 학습 절차 9단계 (Table 1, p.6)"
    page: 6
    bbox_norm: [0.1698, 0.2016, 0.8302, 0.3696]
    strategy: table-region
    curated: false
  - id: tab02
    label: Table 2
    kind: table
    file: assets/hu-2026-cst-wm-a-causally-structured-world/tab02.png
    raw: raw/papers/hu-2026-cst-wm-a-causally-structured-world-figures/tab02.png
    caption: "Cross-Entropy Method를 쓰는 MPC planning 절차 7단계 (Table 2, p.6)"
    page: 6
    bbox_norm: [0.1652, 0.3804, 0.8198, 0.5276]
    strategy: manual
    curated: false
  - id: tab03
    label: Table 3
    kind: table
    file: assets/hu-2026-cst-wm-a-causally-structured-world/tab03.png
    raw: raw/papers/hu-2026-cst-wm-a-causally-structured-world-figures/tab03.png
    caption: "데이터 규모, 아키텍처, 최적화, planner, 연산 자원을 모은 구현 명세 (Table 3, p.8)"
    page: 8
    bbox_norm: [0.1752, 0.1064, 0.8248, 0.4462]
    strategy: table-region
    curated: false
  - id: tab04
    label: Table 4
    kind: table
    file: assets/hu-2026-cst-wm-a-causally-structured-world/tab04.png
    raw: raw/papers/hu-2026-cst-wm-a-causally-structured-world-figures/tab04.png
    caption: "EVT-Bench, Habitat 3.0 표준 tracking, 교차 데이터셋 전이의 주요 성능 비교 (Table 4, p.8)"
    page: 8
    bbox_norm: [0.1632, 0.4789, 0.8458, 0.5721]
    strategy: manual
    curated: true
  - id: tab05
    label: Table 5
    kind: table
    file: assets/hu-2026-cst-wm-a-causally-structured-world/tab05.png
    raw: raw/papers/hu-2026-cst-wm-a-causally-structured-world-figures/tab05.png
    caption: "EVT-Bench에서 target을 일시 상실한 네 조건의 재획득 성능 (Table 5, p.9)"
    page: 9
    bbox_norm: [0.1667, 0.1301, 0.8334, 0.2946]
    strategy: table-region
    curated: true
  - id: tab06
    label: Table 6
    kind: table
    file: assets/hu-2026-cst-wm-a-causally-structured-world/tab06.png
    raw: raw/papers/hu-2026-cst-wm-a-causally-structured-world-figures/tab06.png
    caption: "시뮬레이터가 매긴 순위와 planning value 순위 사이의 상관 (Table 6, p.10)"
    page: 10
    bbox_norm: [0.617, 0.1623, 0.7971, 0.2388]
    strategy: table-region
    curated: false
  - id: tab07
    label: Table 7
    kind: table
    file: assets/hu-2026-cst-wm-a-causally-structured-world/tab07.png
    raw: raw/papers/hu-2026-cst-wm-a-causally-structured-world-figures/tab07.png
    caption: "target 가시 여부별로 나눈 Jacobian leakage 분포 (Table 7, p.10)"
    page: 10
    bbox_norm: [0.2412, 0.289, 0.7588, 0.3774]
    strategy: table-region
    curated: false
  - id: tab08
    label: Table 8
    kind: table
    file: assets/hu-2026-cst-wm-a-causally-structured-world/tab08.png
    raw: raw/papers/hu-2026-cst-wm-a-causally-structured-world-figures/tab08.png
    caption: "masking 깊이를 달리한 다섯 설정의 Jacobian leakage 요약 (Table 8, p.10)"
    page: 10
    bbox_norm: [0.2052, 0.4104, 0.7028, 0.4696]
    strategy: manual
    curated: false
  - id: tab09
    label: Table 9
    kind: table
    file: assets/hu-2026-cst-wm-a-causally-structured-world/tab09.png
    raw: raw/papers/hu-2026-cst-wm-a-causally-structured-world-figures/tab09.png
    caption: "사람을 정지시킨 채 로봇만 움직이게 한 통제 검사 (Table 9, p.10)"
    page: 10
    bbox_norm: [0.5734, 0.4092, 0.8019, 0.4737]
    strategy: table-region
    curated: false
  - id: tab10
    label: Table 10
    kind: table
    file: assets/hu-2026-cst-wm-a-causally-structured-world/tab10.png
    raw: raw/papers/hu-2026-cst-wm-a-causally-structured-world-figures/tab10.png
    caption: "action을 바꿔 넣는 개입 실험에서 나타난 target evidence 변동 (Table 10, p.10)"
    page: 10
    bbox_norm: [0.1756, 0.5074, 0.8244, 0.5839]
    strategy: table-region
    curated: false
  - id: tab11
    label: Table 11
    kind: table
    file: assets/hu-2026-cst-wm-a-causally-structured-world/tab11.png
    raw: raw/papers/hu-2026-cst-wm-a-causally-structured-world-figures/tab11.png
    caption: "target evidence proxy와 거리 인지 objective를 네 변형으로 비교한 검증 (Table 11, p.12)"
    page: 12
    bbox_norm: [0.2085, 0.1202, 0.7915, 0.2086]
    strategy: table-region
    curated: false
  - id: tab12
    label: Table 12
    kind: table
    file: assets/hu-2026-cst-wm-a-causally-structured-world/tab12.png
    raw: raw/papers/hu-2026-cst-wm-a-causally-structured-world-figures/tab12.png
    caption: "체형과 외형이 다른 사람들을 대상으로 한 거리 인지 tracking 검증 (Table 12, p.12)"
    page: 12
    bbox_norm: [0.2292, 0.2354, 0.7868, 0.2986]
    strategy: manual
    curated: false
  - id: tab13
    label: Table 13
    kind: table
    file: assets/hu-2026-cst-wm-a-causally-structured-world/tab13.png
    raw: raw/papers/hu-2026-cst-wm-a-causally-structured-world-figures/tab13.png
    caption: "Habitat 3.0에서 구성 요소를 하나씩 뺀 조건별 ablation (Table 13, p.12)"
    page: 12
    bbox_norm: [0.1662, 0.3234, 0.5268, 0.4316]
    strategy: manual
    curated: false
  - id: tab14
    label: Table 14
    kind: table
    file: assets/hu-2026-cst-wm-a-causally-structured-world/tab14.png
    raw: raw/papers/hu-2026-cst-wm-a-causally-structured-world-figures/tab14.png
    caption: "부분 masking과 갱신 순서 교란을 포함한 추가 아키텍처 ablation (Table 14, p.12)"
    page: 12
    bbox_norm: [0.5507, 0.3321, 0.8181, 0.4206]
    strategy: table-region
    curated: false
  - id: tab15
    label: Table 15
    kind: table
    file: assets/hu-2026-cst-wm-a-causally-structured-world/tab15.png
    raw: raw/papers/hu-2026-cst-wm-a-causally-structured-world-figures/tab15.png
    caption: "전체 모델을 세 seed로 학습했을 때의 성능 편차 (Table 15, p.12)"
    page: 12
    bbox_norm: [0.3942, 0.4394, 0.5978, 0.5176]
    strategy: manual
    curated: false
---

## 한 줄 요약 (One-line Summary)

CST-WM은 로봇이 움직이는 사람을 따라다니는 embodied visual tracking 과제를 위한 world model로, 현재 action이 target evidence를 직접 갱신하는 경로를 아키텍처 차원에서 차단해 causal hallucination을 억제하고, 그 예측을 rollout해 MPC로 추종과 재획득을 하나의 절차 안에서 처리한다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 제목 | CST-WM: A Causally Structured World Model for Embodied Visual Tracking |
| 저자 | Junyi Hu, Shuaihang Yuan, Yi Fang (교신저자) |
| 소속 | New York University Abu Dhabi |
| arXiv | 2609.06302v1 (cs.CV, 2026-09-05) |
| 분량 | 15페이지, preprint |
| 프로젝트 페이지 | https://junyi2005.github.io/cst-wm/ |
| 평가 환경 | EVT-Bench, Habitat 3.0, 실제 실내 환경 정성 배포 |

embodied visual tracking은 로봇이 egocentric RGB 영상만 보고 움직이는 target을 계속 따라가는 과제다. 논문은 이 과제를 반응형 매핑이 아니라 미래의 target 관찰 가능성에 대한 예측 의사결정 문제로 규정한다.

## 2. 주요 기여 (Key Contributions)

논문이 직접 밝힌 기여는 세 가지다.

1. **문제 규정과 구조 제안.** embodied visual tracking을 미래 target evidence에 대한 planning 문제로 형식화하고, target evidence와 로봇 운동과 observation 동역학을 분리하면서 target evidence branch로의 직접 action 주입을 막는 world model인 CST-WM을 제안한다.
2. **planning 지향 target evidence 표현.** 관찰 가능성과 겉보기 크기를 요약하는 2차원 표현을 도입해 추종과 재획득에 함께 쓴다. 테스트 시점에 privileged 기하 정보를 요구하지 않으면서 안전을 고려한 planning을 지원한다.
3. **구조 진단을 포함한 평가.** EVT-Bench와 Habitat 3.0에서 표준 tracking, 일시적 target 상실, rollout 정확도, planning value 일관성, leakage 진단까지 다룬다. 구조화된 transition이 downstream 제어와 상상된 미래의 내부 품질을 함께 개선한다는 것을 보인다.

논문이 정의한 실패 양상이 전체 설계의 출발점이다. causal hallucination은 action 조건부 순차 예측에서 모델이 로봇 제어와 target 관련 observation 사이의 강한 상관을 이용해, action이 로봇 운동과 그에 따른 observation 변화를 거쳐 간접적으로만 영향을 주어야 할 target evidence에 직접적인 인과 효과를 만들어내는 환각 현상이다. 이렇게 되면 rollout 결과는 그럴듯해 보이지만 재획득 planning에 필요한 의미를 잃는다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 문제 정의

매 timestep ℓ에 로봇은 egocentric RGB observation O_ℓ ∈ R^(H×W×3)을 받고 다음 action a_ℓ = (v_ℓ, ω_ℓ) ∈ A ⊆ R³을 고른다. v_ℓ ∈ R²는 linear velocity, ω_ℓ ∈ R는 angular velocity다. 장면 안 임의의 위치에서 시작해 privileged target state 없이 움직이는 target을 찾아내고, 정면을 향한 채 적정 추종 거리(논문 규약에서는 1~3 m)를 유지하면 성공으로 본다.

정적 목표를 향한 navigation과 다른 점은 action의 미래 가치가 로봇 상태 변화만이 아니라 미래의 target 관찰 가능성과 겉보기 크기 변화에도 달려 있다는 것이다. 그래서 논문은 이 과제를 프레임에서 제어로 가는 반응형 매핑이 아니라 예측 의사결정 문제로 둔다.

### 3.2 구조화 상태 구성

CST-WM은 observation을 세 성분으로 나눠 담는 structured state S_ℓ = [H_ℓ, Z_ℓ, x_ℓ]를 만든다.

| 성분 | 기호 | 구성 방법 | 차원 |
|---|---|---|---|
| target evidence | H_ℓ | GroundingDINO의 open-vocabulary detection confidence와 bounding box 면적비 | 2차원 입력, 내부 32 |
| visual latent | Z_ℓ | pre-training된 VAE encoder φ로 observation을 부호화 | 256 |
| 로봇 상태 | x_ℓ | action 이력에 kinematic update F를 적용해 복원 | 3 |

target evidence는 두 값을 붙인 벡터다. H_vis는 GroundingDINO가 target을 찾았는지를 나타내는 confidence이고, H_area는 bounding box 면적 S_GDINO를 이미지 면적 S(O_ℓ)로 나눈 값으로 겉보기 크기를 통해 추종 거리를 간접적으로 나타낸다. 둘 다 0과 1 사이 값이다.

H_ℓ은 target의 외부 상태를 완전히 복원한 추정값이 아니라 observation에서 유도한 요약이다. 논문은 이 점을 반복해서 못 박는다. 테스트 시점에 privileged 기하 정보를 쓰지 않기 위한 선택이다.

### 3.3 비유출 제약과 인과 구조 transition

핵심 요구는 target evidence branch가 현재 action을 직접 받지 않아야 한다는 것이다. action은 ego-motion을 바꾸고 그 결과 다음 observation을 바꾸는 경로로만 미래의 target evidence에 영향을 주어야 한다. 논문은 이를 아키텍처 수준의 비유출 제약으로 적는다.

```
p(H_{ℓ+1} | H_ℓ, Z_ℓ, x_ℓ, a_ℓ) = p(H_{ℓ+1} | H_ℓ, Z_ℓ, x_ℓ),   ∂Ĥ_{ℓ+1}/∂a_ℓ = 0
```

이 제약 아래 한 스텝 transition은 세 성분으로 인수분해된다.

```
p(H_{ℓ+1}, x_{ℓ+1}, Z_{ℓ+1} | H_ℓ, Z_ℓ, x_ℓ, a_ℓ)
  = p(H_{ℓ+1} | H_ℓ, Z_ℓ, x_ℓ) * p(x_{ℓ+1} | x_ℓ, a_ℓ) * p(Z_{ℓ+1} | Z_ℓ, H_{ℓ+1}, x_{ℓ+1})
```

layer 하나는 target evidence, 로봇, observation 순서로 세 branch를 갱신하며, action을 담은 표현이 target evidence 갱신에 끼어들지 못하도록 masking을 건다.

| branch | 갱신 식 | action 접근 |
|---|---|---|
| target evidence | H_{ℓ+1} = f_H(H_ℓ, Z_ℓ, x_ℓ) | 차단 |
| 로봇 | x_{ℓ+1} = f_x(x_ℓ, a_ℓ), R_{ℓ+1} = [x_{ℓ+1}, W_a(a_ℓ)] | 허용, 유일한 action 운반자 |
| observation | Z_{ℓ+1} = g_θ(Z_ℓ; R_{ℓ+1}, H_{ℓ+1}) | R_{ℓ+1}을 통해 간접 접근 |

전체 transition 연산자 T_θ의 계산 그래프는 a_ℓ → x_{ℓ+1} → Z_{ℓ+1}과 H_ℓ → H_{ℓ+1} → Z_{ℓ+1} 두 경로만 갖고, a_ℓ에서 H_{ℓ+1}로 가는 직접 간선이 없다. target evidence 예측기의 action에 대한 Jacobian이 0이라는 성질은 이 제약이 실제로 구현됐는지 재는 진단 지표로 쓰인다. g_θ는 attention과 feed-forward 연산으로 구현한다.

### 3.4 diffusion 학습

학습 데이터는 EVT-Bench와 Habitat 3.0에서 뽑은 한 스텝 transition (O_ℓ, a_ℓ, O_{ℓ+1})이다. 모델은 S_ℓ과 a_ℓ로부터 다음 structured state S_{ℓ+1} = [H_{ℓ+1}, Z_{ℓ+1}, x_{ℓ+1}]을 예측한다.

학습은 DDPM scheduler로 S_{ℓ+1}에 Gaussian noise를 섞은 뒤 denoising network ε_Θ가 그 noise를 맞히게 하는 표준 diffusion 목표를 쓴다. 세 branch는 공유된 다음 상태에 대한 하나의 목표 아래 함께 denoising되고, 허용되는 의존 관계는 transition 아키텍처의 masking이 정한다.

여기에 거리 인지 보조 손실을 더한다. target evidence branch에 가벼운 예측 head g_dist를 붙이고, 시뮬레이터가 알려주는 상대 거리 d_{ℓ+1}에서 만든 이진 라벨 y = I(d_ ≤ d_{ℓ+1} ≤ d_+)로 지도한다. 최종 목표는 L = L_diff + λ_dist * L_dist이며 기본값은 λ_dist = 0.2이다. 시뮬레이터 거리는 offline 지도에만 쓰이고 테스트 시점에는 제공되지 않는다. 보조 항을 빼도 아키텍처와 diffusion 목표는 그대로다.

추론 시점에는 Ŝ_{ℓ+1} = T_θ(S_ℓ, a_ℓ)를 후보 action 시퀀스 길이 T만큼 재귀적으로 적용한다.

### 3.5 CEM 기반 model-predictive planning

학습된 CST-WM 위에서 후보 action 시퀀스를 상상해 고르는 방식으로 제어한다. planner는 target이 보일 때는 유효한 추종 배치를 유지하고, 일시적으로 보이지 않을 때는 안전을 지키면서 target evidence를 회복하는 action을 찾는다. 추종과 재획득이 별도 모듈이 아니라 하나의 rollout 기반 절차 안에서 처리된다.

최적화에는 Cross-Entropy Method를 쓴다. Cross-Entropy Method는 후보를 무작위로 뽑아 점수를 매기고 상위 후보로 샘플링 분포를 갱신하는 과정을 반복하는 최적화 기법이다.

| 하이퍼파라미터 | 값 | 뜻 |
|---|---|---|
| T | 10 | planning horizon |
| N | 128 | 반복마다 뽑는 후보 시퀀스 수 |
| K | 16 | 분포 갱신에 쓰는 상위 후보 수 |
| M | 4 | 분포 갱신 반복 횟수 |

각 반복 m에서 N개 시퀀스를 정규분포에서 뽑아 rollout하고 점수를 매긴 뒤, 상위 K개의 평균과 공분산으로 다음 분포를 갱신한다. planning value는 rollout 전체에 걸쳐 누적된다.

```
V(S_0, a_{0:T-1}) = Σ_t [ β_vis * Ĥ_vis_t − β_dist * |Ĥ_area_t − α| ]
                    − λ_valid * Σ I(a_t ∉ A_valid) − λ_safe * Σ I(Ŝ_t ∉ O_safe)
```

첫 항은 target이 보이도록 유도하고, 둘째 항은 겉보기 크기를 기준값 α에서 벗어나지 않게 잡아 추종 거리를 조절한다. 나머지 두 항은 허용 action 집합과 안전 집합을 벗어난 경우에 벌점을 준다. 기본값은 β_vis = β_dist = λ_valid = λ_safe = 1.0, α = 0.5, d_safe = 0.20 m이다.

허용 action 집합 A_valid는 플랫폼의 속도 한계와 평활 한계를 건다. 즉 ||v_t||_∞ ≤ v_max, |ω_t| ≤ ω_max, ||a_t − a_{t-1}||_∞ ≤ δ_max를 만족하는 action만 남긴다. 안전 집합 O_safe는 예측 상태의 최소 여유 거리 proxy가 d_safe 이상인 경우로 정의한다. 운동 한계는 모든 baseline이 쓰는 시뮬레이터 경계와 맞췄다.

Ĥ_vis_t와 Ĥ_area_t를 rollout된 target evidence 벡터에서 직접 읽기 때문에 planner는 매 horizon마다 이미지를 디코딩할 필요가 없다. 최적 시퀀스의 첫 action만 실행하고 다음 스텝에서 다시 계획하는 receding horizon 방식으로 동작한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 실험 설정

평가는 EVT-Bench와 Habitat 3.0 두 환경에서 이뤄진다. 두 환경 모두 테스트 시점에 egocentric observation과 플랫폼 action만 제공하고 privileged 상태나 미래 경로나 oracle 거리를 주지 않는다. EVT-Bench는 동적 실내 장면의 embodied visual tracking을 다루고 로봇이 표준 추종 배치에서 시작한다. Habitat 3.0은 사람과 로봇이 함께 등장하는 더 까다로운 설정으로, 장면 기하가 복잡하고 occlusion과 재등장이 더 자주 일어난다.

Habitat 3.0에서는 두 규약을 쓴다. 하나는 target이 처음부터 보이는 표준 tracking이고, 다른 하나는 짧은 occlusion, 긴 occlusion, 시야 이탈, distractor 교차로 target이 일시적으로 사라지는 target 상실 규약이다. 상실 상황은 프레임을 사후에 지워 만든 것이 아니라 시뮬레이터 rollout으로 직접 생성했다. 일반화를 보기 위해 EVT-Bench로 학습하고 Habitat 3.0에서 그대로 평가하는 교차 데이터셋 전이도 보고한다.

| 데이터 항목 | EVT-Bench | Habitat 3.0 |
|---|---|---|
| 학습 장면 수 | 64 | 72 |
| 검증 장면 수 | 8 | 9 |
| 테스트 장면 수 | 8 | 9 |
| trajectory 수 | 4만 8000개 | 6만 1000개 |
| 한 스텝 clip 수 | 192만 개 | 244만 개 |

손상된 프레임, 잘못된 로봇 상태, 리셋 조각, 유효한 운동이 없는 종료 전용 조각, 플랫폼 action 제약을 어기는 transition을 걸러냈다. 학습과 검증과 테스트 분할은 장면 단위로 겹치지 않게 나눴고, 학습 모델은 모두 세 개의 무작위 seed로 학습해 평균을 보고한다.

지표는 환경마다 다르다.

| 환경 | 지표 | 뜻 |
|---|---|---|
| EVT-Bench | SR | 과제 성공률 |
| EVT-Bench | TR | 추종 연속성 |
| EVT-Bench | CR | 충돌률 |
| Habitat 3.0 표준 | F | 추종의 시간적 일관성 |
| Habitat 3.0 표준 | DRS | 목표 추종 구간 안에 머문 시간 비율 |
| Habitat 3.0 표준 | CR | 충돌률 |
| Habitat 3.0 표준 | ES | episode 성공 여부 |
| target 상실 | Re-acq. | 재획득 성공률 |
| target 상실 | TTR | 재획득까지 걸린 스텝 수 |
| target 상실 | Post-F | 재획득 이후 추종률 |
| target 상실 | Rec-ES | 회복 episode 성공률 |

여기에 offline 진단 두 가지를 더한다. 하나는 시뮬레이터가 만든 미래와 비교한 다단계 rollout 정확도이고, 다른 하나는 시뮬레이터가 유도한 후보 순위와의 planning value 일관성이다.

baseline은 EVT-Bench에서 Uni-NaVid, TrackVLA, TrackVLA++ 단일 시점 버전이고, Habitat 3.0에서는 Habitat 3.0 기본 baseline, SDA-S2, 적응시킨 NWM이다. 주 비교 대상은 구조 비교다. NWM은 같은 trajectory 데이터로 다시 학습시키고 원래의 선택 목표를 CST-WM의 planning value로 교체했다. tracking 설정에는 목표 이미지가 없으므로 적응시킨 NWM과 CST-WM은 같은 GroundingDINO 기반 target evidence 신호를 쓰고 observation 인터페이스, planning horizon, 후보 예산, action 한계를 공유한다. 남는 차이는 latent transition 설계뿐이다. 적응시킨 NWM과 TrackVLA 계열 예측기는 action masking이 없는 비인수분해 transition을 쓴다.

### 4.2 표준 tracking 성능

Table 4가 세 설정의 주요 결과를 담는다.

| 설정 | 방법 | 지표 |
|---|---|---|
| EVT-Bench | Uni-NaVid | SR 25.7, TR 39.5, CR 41.9 |
| EVT-Bench | TrackVLA | SR 85.1, TR 78.6, CR 1.65 |
| EVT-Bench | TrackVLA++ | SR 86.0, TR 81.0, CR 2.10 |
| EVT-Bench | CST-WM | SR 88.7, TR 83.4, CR 1.41 |
| Habitat 3.0 표준 | Habitat 3.0 | F 0.29, DRS 0.47, CR 0.48, ES 0.40 |
| Habitat 3.0 표준 | 적응시킨 NWM | F 0.41, DRS 0.61, CR 0.33, ES 0.49 |
| Habitat 3.0 표준 | SDA-S2 | F 0.39, DRS 0.63, CR 0.57, ES 0.43 |
| Habitat 3.0 표준 | CST-WM | F 0.53, DRS 0.70, CR 0.27, ES 0.61 |
| 교차 전이 | Uni-NaVid | F 0.40, DRS 0.56, CR 0.39, ES 0.45 |
| 교차 전이 | TrackVLA | F 0.38, DRS 0.54, CR 0.41, ES 0.43 |
| 교차 전이 | 적응시킨 NWM | F 0.43, DRS 0.58, CR 0.35, ES 0.47 |
| 교차 전이 | CST-WM | F 0.48, DRS 0.65, CR 0.30, ES 0.54 |

EVT-Bench에서 CST-WM은 SR, TR, CR 세 지표 모두 가장 좋다. Habitat 3.0 표준 tracking에서는 F, DRS, ES에서 일관된 개선을 보여, 학습된 표현이 안정적인 추종과 거리 조절을 함께 지원한다는 것을 나타낸다. 교차 데이터셋 전이에서도 모든 전이 가능한 baseline보다 앞서, 구조화된 동역학이 벤치마크 하나를 넘어 일반화된다는 점을 시사한다.

### 4.3 target 상실과 재획득

일시적 target 상실은 실제 tracking에서 long-horizon 난점의 핵심이다. Table 5는 네 가지 상실 조건별 재획득 성능을 나눠 보고한다.

| 조건 | 방법 | Re-acq. | TTR (스텝) | Post-F | Rec-ES |
|---|---|---|---|---|---|
| 짧은 occlusion | TrackVLA | 0.71 | 8.9 | 0.58 | 0.47 |
| 짧은 occlusion | 적응시킨 NWM | 0.75 | 8.1 | 0.62 | 0.50 |
| 짧은 occlusion | CST-WM | 0.84 | 6.4 | 0.71 | 0.61 |
| 긴 occlusion | TrackVLA | 0.48 | 14.6 | 0.41 | 0.29 |
| 긴 occlusion | 적응시킨 NWM | 0.54 | 13.2 | 0.45 | 0.34 |
| 긴 occlusion | CST-WM | 0.69 | 9.8 | 0.57 | 0.47 |
| 시야 이탈 | TrackVLA | 0.52 | 12.8 | 0.45 | 0.33 |
| 시야 이탈 | 적응시킨 NWM | 0.57 | 11.7 | 0.49 | 0.37 |
| 시야 이탈 | CST-WM | 0.73 | 8.7 | 0.60 | 0.50 |
| distractor 교차 | TrackVLA | 0.43 | 15.2 | 0.37 | 0.24 |
| distractor 교차 | 적응시킨 NWM | 0.49 | 14.0 | 0.41 | 0.29 |
| distractor 교차 | CST-WM | 0.65 | 10.6 | 0.54 | 0.43 |

CST-WM은 네 조건 모두에서 재획득 성공률을 높이고 회복 시간을 줄이며 재획득 이후 추종 품질도 개선했다. 격차는 긴 occlusion과 distractor 교차에서 특히 크다. 두 조건 모두 long-horizon 추론과 target evidence 대 action 조건부 observation 변화의 분리가 더 강하게 요구되는 상황이다.

### 4.4 offline world model 진단

online tracking 지표는 rollout 자체의 품질을 직접 재지 않는다. 그래서 시작 상태와 미래 action 시퀀스를 공유한 조건에서 offline 정확도를 따로 잰다. 시작 상태 500개와 상태마다 공유된 action 시퀀스 32개를 쓰고, horizon 1, 5, 10, 20, 40에서 모델 예측 미래와 시뮬레이터 미래를 비교한다.

Figure 5에 따르면 CST-WM은 모든 horizon에서 latent 예측 오차가 낮고 target 가시성 AUROC가 높다. 격차는 horizon이 길어질수록 벌어져, 구조화된 transition이 긴 rollout에서 오차를 덜 누적한다는 것을 나타낸다. planning이 예측된 미래의 순위를 매기는 방식이므로 rollout 정확도 개선은 곧 의사결정 품질로 이어진다.

순위 자체의 일관성은 따로 잰다. 같은 시작 상태에서 공유 후보를 planning value로 채점한 순위와 시뮬레이터 결과가 유도한 순위를 비교한다.

| 방법 | Spearman ρ | Kendall τ |
|---|---|---|
| 적응시킨 NWM | 0.47 | 0.33 |
| TrackVLA 계열 예측기 | 0.52 | 0.37 |
| CST-WM | 0.68 | 0.51 |

CST-WM이 가장 높은 순위 상관을 보인다. 이 성질은 회복 국면에서 특히 중요하다. planner가 추종을 되살리는 미래와 계속 어긋나는 미래를 구분해야 하기 때문이다.

### 4.5 구조 진단

순간 action 정보가 target evidence 경로에 부적절하게 들어가는지를 세 가지 방법으로 검사한다.

첫째는 Jacobian 기반 leakage다. Table 7은 장면과 episode와 시간 스텝에 걸친 분포 통계를 보고한다.

| 방법 | 전체 상태 | 가시 구간 | 비가시 구간 | leakage와 성능의 상관 |
|---|---|---|---|---|
| 적응시킨 NWM | 0.112 | 0.096 | 0.131 | −0.41 |
| leaky 변형 B | 0.331 | 0.304 | 0.357 | −0.53 |
| leaky 변형 C | 0.086 | 0.071 | 0.102 | −0.36 |
| CST-WM | 0.001 | 0.001 | 0.002 | −0.04 |

Table 8은 네 설계 변형과 CST-WM의 요약값 |∂H_{ℓ+1}/∂a_ℓ|를 rollout 상태 전체에 대해 평균해 보고한다. A는 masking 없는 단일 branch baseline, B는 얕은 masking, C는 부분 masking, D는 더 깊은 masking이다. 값은 A 0.19, B 0.37, C 0.09, D 0.04, CST-WM 0.00이다. masking이 깊어질수록 leakage가 줄고 완전한 아키텍처 masking에서 0에 도달한다. 다만 얕은 masking B는 masking이 없는 A보다 오히려 나쁘다. 경로를 부분적으로만 막는 것으로는 충분하지 않다는 뜻이다.

둘째는 action 교체 개입이다. 같은 latent에서 출발해 a_ℓ만 A_valid에서 뽑은 다른 action으로 바꾸고 나머지를 고정한 뒤, 예측된 target evidence의 분산과 결과 분포 사이의 1차원 Wasserstein 거리를 잰다.

| 방법 | action 간 분산 | 쌍별 Wasserstein 거리 | 해석 |
|---|---|---|---|
| 적응시킨 NWM | 0.084 | 0.127 | 뚜렷한 action 의존 |
| leaky baseline | 0.146 | 0.214 | 강한 branch 이탈 |
| CST-WM | 0.006 | 0.011 | 개입에 안정적 |

셋째는 로봇만 움직이는 통제 검사다. 사람을 정지시킨 채 로봇이 다양한 운동을 실행할 때, 사람 상태가 고정된 조건에서 Ĥ의 변동이 얼마나 작은지를 재는 target evidence 안정성과 시점 변화에서 Ẑ가 얼마나 반응하는지를 재는 observation 민감도를 함께 본다. CST-WM은 0.98과 0.84를, 적응시킨 NWM은 0.61과 0.78을 기록했다. 경로 동작이 action에 무차별적으로 둔감해진 것이 아니라 선택적으로 차단됐다는 뜻이다.

세 진단을 함께 놓으면 제안된 인수분해가 잘못된 action leakage를 억제하면서 observation 경로에 필요한 action 민감도는 유지한다는 결론이 나온다.

### 4.6 target evidence proxy 검증

Figure 4는 GroundingDINO 기반 target evidence score와 로봇과 사람 사이 상대 거리의 관계를 보인다. score는 궤도 대부분에서 단조롭게 변하고 아주 가까운 거리에서만 약한 포화를 보인다. 이는 이 값을 미터 단위 거리 추정기가 아니라 관찰 가능성과 거리의 proxy로 쓰겠다는 의도와 맞는다.

Table 11은 같은 규약으로 학습한 네 변형을 비교한다.

| 학습 신호와 채점 설계 | F | DRS | Re-acq. | CR |
|---|---|---|---|---|
| detector score만 사용 | 0.46 | 0.60 | 0.66 | 0.32 |
| 거리 인지 손실 없는 proxy | 0.49 | 0.65 | 0.72 | 0.29 |
| 시뮬레이터 직접 거리 oracle | 0.54 | 0.72 | 0.78 | 0.26 |
| 거리 인지 손실을 붙인 proxy | 0.53 | 0.70 | 0.76 | 0.27 |

전체 모델은 약한 proxy 변형들을 크게 앞서고 oracle 결과에 근접한다. 테스트 시점에 별도 거리 검출기를 요구하지 않으면서도 planning에 실질적으로 쓸 만한 거리 정보를 제공한다는 뜻이다.

Table 12는 체격, 키, 외형, 복장, 운동 방식이 다른 사람들로 이 검증을 확장한다. 거리 인지 손실을 더하면 proxy score와 실제 상대 거리 사이의 단조 Spearman 상관이 0.71에서 0.83으로 올라가고 downstream 지표 네 가지가 모두 개선된다. F는 0.47에서 0.52로, DRS는 0.62에서 0.69로, Re-acq.는 0.68에서 0.75로 올랐고 CR은 0.31에서 0.28로 낮아졌다. 논문은 이를 완전한 정체성 불변 기하 복원이 아니라 proxy의 실용적 강건성에 대한 근거로 읽는다.

### 4.7 ablation

ablation은 네 가지 질문으로 조직된다. action masking이 leakage 억제에 필요한지, branch 인수분해가 planning 지향 tracking에 필요한지, 거리 인지 objective가 안정적인 거리 조절에 필요한지, 확률적 rollout이 상실 이후 회복에 유용한지다.

| 변형 | F | DRS | Re-acq. | planning ρ |
|---|---|---|---|---|
| masking 제거 | 0.47 | 0.63 | 0.61 | 0.55 |
| 인수분해 제거 | 0.49 | 0.66 | 0.64 | 0.58 |
| 거리 인지 손실 제거 | 0.49 | 0.65 | 0.72 | 0.64 |
| 결정론적 rollout | 0.50 | 0.67 | 0.68 | 0.60 |
| 전체 모델 | 0.53 | 0.70 | 0.76 | 0.68 |

action masking을 빼면 재획득 성능이 가장 크게 하락하고 leakage 진단값도 나빠진다. 단일 branch 대안은 F와 planning value 일관성을 떨어뜨린다. 거리 인지 objective 제거는 주로 DRS를 해치고, 결정론적 예측기는 long-horizon 회복을 약화시킨다.

Table 14는 추가 아키텍처 변형을 보고한다. 부분 masking은 F 0.46, Re-acq. 0.68, planning value 0.62, CR 0.30이고, 갱신 순서를 뒤섞은 변형은 0.46, 0.65, 0.58, 0.32이며, 결정론적 변형은 0.48, 0.69, 0.60, 0.30이다. 전체 모델은 0.53, 0.76, 0.68, 0.27이다.

Table 15는 세 seed의 편차를 보고한다. F는 0.52, 0.54, 0.53이고 DRS는 0.69, 0.71, 0.70이며 CR은 0.28, 0.26, 0.27이다. 세 지표 모두 편차가 최대 0.02로, Table 4에서 가장 강한 baseline과의 격차보다 훨씬 작다. 보고된 개선이 특정 seed에서만 나온 결과가 아니라는 근거다.

### 4.8 실제 환경과 연산 비용

Figure 6은 서로 다른 실제 실내 환경에서의 tracking 정성 결과를 보인다. 같은 배포의 영상은 프로젝트 페이지에 있다.

Figure 7은 planning 설정 세 가지의 성능과 지연 관계를 정리한다. planning horizon과 후보 수를 늘리면 회복 성능이 오르지만 스텝당 지연도 함께 오른다.

| 설정 | 파라미터 | 스텝당 지연 | Re-acquisition Success |
|---|---|---|---|
| Fast | T=6, N=64, K=8, M=2, DDIM=10 | 약 70 ms | 약 0.68 |
| Balanced (기본) | T=10, N=128, K=16, M=4, DDIM=20 | 약 165 ms | 약 0.76 |
| Large | T=14, N=192, K=24, M=6, DDIM=30 | 약 390 ms | 약 0.78 |

기본 설정이 성능 이득의 대부분을 확보하면서 가장 큰 설정의 비용을 피해 Pareto 전선에서 유리한 위치를 차지한다.

구현 명세는 Table 3에 모여 있다. 모델은 latent 차원 256의 VAE encoder, target evidence 32차원, 로봇 상태 32차원, hidden 512와 head 8개를 갖는 transformer block 6층의 transition backbone, action 임베딩 128차원으로 구성된다. 토큰 순서는 target evidence, 로봇, observation이다. 학습은 linear DDPM 1000 스텝과 DDIM 20 스텝 추론, AdamW(학습률 1e-4, weight decay 1e-4), 배치 64, 80 epoch, gradient clipping 1.0을 쓴다. 연산 자원은 RTX 4090 24 GB 4장이고, 본문에 보고된 주요 모델에 약 320 GPU-시간, 표에 포함되지 않은 예비 실험과 ablation과 실패한 실행에 약 190 GPU-시간이 추가로 들었다. 주요 모델 하나의 평균 학습 시간은 19.5시간이고, 추론은 기본 planning 설정에서 스텝당 약 150 ms다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

논문은 한계를 일곱 항목으로 구체적으로 적는다.

1. **검출기 의존.** target evidence branch는 GroundingDINO의 confidence와 정규화된 box 면적으로 만든다. 심한 모션 블러, 저조도, 극단적 시점, 분포 밖 외형에서 검출이 불안정해지면 planning 신호도 함께 불안정해진다. 제안한 인수분해 자체가 근본적으로 신뢰할 수 없는 검출기를 되살려 주지는 않는다.
2. **proxy는 미터 단위 거리가 아니다.** 겉보기 면적 단서 H_area는 기하적으로 보정된 거리 추정이 아니라 관찰 가능성과 거리의 proxy다. 규약이 쓰는 1~3 m 추종 구간 안에서 가장 유용하고, 아주 먼 거리에서는 0에 가깝게, 아주 가까운 거리에서는 위쪽으로 포화한다. 보정 구간 밖의 거리 조절은 보장되지 않는다.
3. **시뮬레이션과 실제 사이 간극.** 주요 정량 결론은 EVT-Bench와 Habitat 3.0에서 나왔다. 4.6절이 실제 환경 정성 결과를 보고하지만 대규모 실기 통계는 없다. 검출기 동작, 운동 통계, 조명, 회복 양상이 물리 배포에서 달라질 수 있다.
4. **다중 target 정체성 모호성.** target evidence branch는 target이 보이는지를 나타내는 단일 신호를 요약할 뿐, 오래 이어지는 distractor 모호성 아래에서 지속적인 target 정체성을 명시적으로 유지하지 않는다. 외형이 비슷한 사람이 여럿인 혼잡한 장면에서는 다른 사람을 붙잡을 수 있다. 정체성을 고려한 재획득은 향후 과제로 남긴다.
5. **학습 시점에만 쓰는 privileged 신호.** 거리 인지 보조 손실은 시뮬레이터만 아는 상대 거리를 offline 지도에 쓴다. 테스트 시점에는 쓰지 않지만, 실제 데이터만 있는 배포에서는 이 학습 신호를 얻을 수 없다. Table 11의 보정 근거는 privileged 지도 없이 달성 가능한 proxy 품질의 하한으로 읽어야 한다.
6. **연산과 확장.** 주요 모델 하나 학습에 RTX 4090 4장으로 약 19.5시간이 들고, 보고된 전체 실험은 약 320 GPU-시간에 예비 실험과 ablation 약 190 GPU-시간이 더해진다. diffusion 기반 rollout은 반응형 policy보다 추론 비용도 크다. 지연 예산이 빡빡한 환경에서는 Fast 설정을 쓰거나 rollout을 distillation해야 한다.
7. **구조적 주장의 범위.** 비유출 제약 ∂Ĥ_{ℓ+1}/∂a_ℓ = 0은 planning 표현에 대한 구조적 요구이지 세계에 대한 강한 물리적 주장이 아니다. 실험 이득은 이 아키텍처 선택이 검증한 설정에서 유용하다는 근거일 뿐, 외부 사람 동역학의 완전한 인과 복원을 입증하지는 않는다.

## 6. 관련 연구 (Related Work)

**embodied visual tracking.** 로봇이 egocentric observation으로 움직이는 target을 따라가면서 가시성을 유지하고 추종 거리를 조절하며 안전을 지켜야 하는 과제다. 검출과 planning을 잇는 시스템은 기본 추종은 해내지만 복잡한 장면에서 target이 가려지거나 시각적으로 모호해지면 성능이 낮아진다. 최근 주류는 반응형 policy 학습이다. 강화학습 기반 active tracker, EVT 같은 offline RL 확장, 풍부한 시각 컨텍스트를 제어로 매핑하는 사회적 인지 변형과 VLA 변형이 여기 속한다. 이들은 occlusion과 distractor 아래 강건성을 높였지만, 대안 action들이 여러 스텝에 걸쳐 미래 target 관찰 가능성과 겉보기 크기를 어떻게 바꾸는지를 명시적으로 비교하지는 않는다.

**world model.** world model은 observation 이력에서 latent 동역학을 학습해 행동 전에 미래를 rollout한다. 초기 latent 동역학 방법에서 Dreamer 계열과 그 embodied 확장, 더 넓은 생성 환경과 자율주행 환경으로 이어진다. embodied navigation에서 가장 직접 관련된 선행 연구는 Navigation World Models로, diffusion 기반 world modeling이 egocentric planning을 지원할 수 있음을 보였다. 다만 일반적인 action 조건부 transition은 현재 action을 target evidence branch에 직접 써넣을 수 있고, 그 결과 미래는 그럴듯해 보이지만 재획득에 필요한 의미를 target evidence에 잘못 부여하는 tracking 특유의 causal hallucination이 생긴다. CST-WM은 이 지점에서 동역학을 세 branch로 분해한다.

이 저장소 안에서 이어지는 자료로는 world model 서베이(hou-2026, li-2025)와 Cosmos world foundation model 자료, VLN 개관 자료가 있다.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| CST-WM | Causally Structured World Model. target evidence, 로봇, observation 세 branch로 나눈 latent 위에서 action이 target evidence를 직접 갱신하지 못하게 막은 world model이다 |
| causal hallucination | action 조건부 예측에서 모델이 현재 action과 target 관련 observation 사이의 상관을 이용해 action에서 target evidence로 가는 직접 인과를 만들어내는 실패 양상이다 |
| target evidence | target이 보이는지와 겉보기 크기가 유효한 추종 거리와 맞는지를 요약한 2차원 표현으로, 기호는 H다 |
| 비유출 제약 | target evidence 예측의 현재 action에 대한 Jacobian을 0으로 두는 아키텍처 수준의 요구다 |
| structured state | target evidence, visual latent, 로봇 상태를 이어 붙인 상태 벡터 S = [H, Z, x]다 |
| planning value | rollout된 target evidence로 후보 action 시퀀스를 채점하는 목표 함수로, 가시성 항과 거리 항과 두 벌점 항으로 이뤄진다 |
| Cross-Entropy Method | 후보를 뽑아 채점하고 상위 후보로 샘플링 분포를 갱신하는 과정을 반복하는 최적화 기법이며 약어는 CEM이다 |
| Jacobian leakage | target evidence 예측의 action에 대한 편미분 크기로, 직접 action 주입이 남아 있는지를 재는 진단값이다 |
| TE-stab. | 사람이 정지한 조건에서 예측된 target evidence가 얼마나 변하지 않는지를 재는 값이다 |
| Obs-sens. | 시점이 바뀔 때 예측된 visual latent가 얼마나 반응하는지를 재는 값이다 |
| DRS | Distance-Range Success. 목표 추종 거리 구간 안에 머문 시간의 비율이다 |
| Re-acq. | 일시적으로 놓친 target을 다시 찾아낸 비율이다 |
| TTR | Time to Re-acquire. 재획득까지 걸린 스텝 수다 |

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 3 | action에서 target evidence로 가는 직접 경로를 끊은 인과 구조 비교 | caption-region | 별표 wiki 권장 (motivation) |
| fig02 | 4 | CST-WM 전체 파이프라인 세 단계 | caption-region | 별표 wiki 권장 (architecture) |
| fig03 | 9 | target 상실 후 재획득 정성 사례 | manual | (확인 필요) |
| fig04 | 9 | target evidence score와 상대 거리의 관계 | manual | 별표 wiki 권장 (proxy 검증) |
| fig05 | 10 | planning horizon별 rollout 정확도 | caption-region | 별표 wiki 권장 (result) |
| fig06 | 11 | 실제 환경 tracking 정성 결과 | caption-region | (확인 필요) |
| fig07 | 11 | planning 설정의 성능 지연 Pareto | manual | (확인 필요) |
| fig08 | 11 | ablation 레이더 차트 | manual | 별표 wiki 권장 (ablation) |
| tab01 | 6 | 학습 절차 9단계 | table-region | (확인 필요) |
| tab02 | 6 | MPC planning 절차 7단계 | manual | (확인 필요) |
| tab03 | 8 | 구현 명세 전체 | table-region | (확인 필요) |
| tab04 | 8 | 주요 성능 비교 세 설정 | manual | 별표 wiki 권장 (result) |
| tab05 | 9 | 상실 조건별 재획득 성능 | table-region | 별표 wiki 권장 (result) |
| tab06 | 10 | planning value 순위 상관 | table-region | (확인 필요) |
| tab07 | 10 | Jacobian leakage 분포 | table-region | (확인 필요) |
| tab08 | 10 | masking 깊이별 leakage 요약 | manual | 별표 wiki 권장 (진단) |
| tab09 | 10 | 로봇만 움직이는 통제 검사 | table-region | (확인 필요) |
| tab10 | 10 | action 교체 개입 실험 | table-region | (확인 필요) |
| tab11 | 12 | proxy와 거리 인지 objective 검증 | table-region | (확인 필요) |
| tab12 | 12 | 사람별 거리 인지 tracking 검증 | manual | (확인 필요) |
| tab13 | 12 | 조건별 ablation 분해 | manual | (확인 필요) |
| tab14 | 12 | 추가 아키텍처 ablation | table-region | (확인 필요) |
| tab15 | 12 | seed별 성능 편차 | manual | (확인 필요) |
