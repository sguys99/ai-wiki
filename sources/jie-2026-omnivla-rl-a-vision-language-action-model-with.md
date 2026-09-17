---
title: "OmniVLA-RL: A Vision-Language-Action Model with Spatial Understanding and Online RL"
type: paper
year: 2026
category: physical-ai
raw_path: raw/papers/jie-2026-omnivla-rl-a-vision-language-action-model-with.pdf
raw_filename: "jie-2026-omnivla-rl-a-vision-language-action-model-with.pdf"
source_collection: external
authors: "Haoxiang Jie, Yaoyuan Yan (공동 제1저자), Xiangyu Wei, Kailin Wang, Hongjie Yan, Zhiyou Heng, Daocheng Chen; AI Lab, Country Garden Services / Omni AI / VBot / East China Normal University"
arxiv_id: "2604.17706"
tags: [physical-ai, vla, rl-control, manipulation, spatial-reasoning]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/jie-2026-omnivla-rl-a-vision-language-action-model-with/fig01.png
    raw: raw/papers/jie-2026-omnivla-rl-a-vision-language-action-model-with-figures/fig01.png
    caption: "OmniVLA-RL 전체 구조. 왼쪽부터 Spatial Expert, Reasoning Expert, Action Expert가 하나의 Mixture-of-Transformers backbone을 공유하고, Spatial Encoder와 Vision Encoder, Text Encoder가 각각 observation과 프롬프트를 토큰으로 바꾼다. Action Expert는 Gaussian noise에서 연속 action을 생성하고, 오른쪽 Flow-GSPO 모듈이 reward function, group computation, advantage를 거쳐 policy를 갱신한다"
    page: 5
    bbox_norm: [0.1405, 0.0997, 0.8386, 0.3014]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/jie-2026-omnivla-rl-a-vision-language-action-model-with/fig02.png
    raw: raw/papers/jie-2026-omnivla-rl-a-vision-language-action-model-with-figures/fig02.png
    caption: "Block-wise Causal Attention 마스크. Reasoning과 Spatial 토큰(초록, 파랑)은 서로 양방향으로 attention하는 prefix를 이루고, State와 Action 토큰(노랑, 보라)은 prefix 전체를 보되 자기들끼리는 하삼각 causal 패턴만 허용된다. prefix가 action 토큰을 보는 칸은 흰색으로 막혀 있다"
    page: 7
    bbox_norm: [0.3369, 0.1027, 0.6641, 0.3309]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/jie-2026-omnivla-rl-a-vision-language-action-model-with/fig03.png
    raw: raw/papers/jie-2026-omnivla-rl-a-vision-language-action-model-with-figures/fig03.png
    caption: "3단계 학습 과정. Stage 1은 Spatial Decoder를 붙인 Spatial Expert와 Reasoning Expert를 3D 데이터로 학습하고 Action Expert는 두지 않는다. Stage 2는 세 expert를 모두 풀고 언어와 noise를 입력해 flow matching으로 action을 학습한다. RL Post Training은 Flow-GSPO 목적함수로 전체를 다시 fine-tuning한다"
    page: 9
    bbox_norm: [0.1385, 0.1189, 0.8616, 0.2541]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/jie-2026-omnivla-rl-a-vision-language-action-model-with/fig04.png
    raw: raw/papers/jie-2026-omnivla-rl-a-vision-language-action-model-with-figures/fig04.png
    caption: "LIBERO-Plus에서 200 RL step 동안의 성공률 곡선. Flow-GSPO(빨강)는 50 step 안에 0.7을 넘고 100 step 이후 0.8 근처를 유지한다. PPO(파랑)는 80 step 부근에서 하락하고, GRPO(주황)는 0.65 부근에서 정체된다"
    page: 11
    bbox_norm: [0.1078, 0.0833, 0.8922, 0.4648]
    strategy: caption-region
    curated: true
  - id: tab01
    label: Table 1
    kind: table
    file: assets/jie-2026-omnivla-rl-a-vision-language-action-model-with/tab01.png
    raw: raw/papers/jie-2026-omnivla-rl-a-vision-language-action-model-with-figures/tab01.png
    caption: "LIBERO 4개 suite 성공률 비교표. Diffusion Policy, Octo, OpenVLA, SpatialVLA, CoT-VLA, π0, π0.5, F1, OmniVLA-RL 9개 방법의 Spatial, Object, Goal, Long 성공률과 순위, 평균이 실려 있다. OmniVLA-RL이 네 suite 모두 1위이고 평균 97.6%다"
    page: 10
    bbox_norm: [0.1125, 0.1052, 0.8875, 0.2946]
    strategy: table-region
    curated: false
  - id: tab02
    label: Table 2
    kind: table
    file: assets/jie-2026-omnivla-rl-a-vision-language-action-model-with/tab02.png
    raw: raw/papers/jie-2026-omnivla-rl-a-vision-language-action-model-with-figures/tab02.png
    caption: "LIBERO-Plus ablation 표. SFT만 한 기준선 41.2%에 PPO, GRPO, Flow-GSPO를 각각 더했을 때의 성공률과 증가폭, 그리고 Spatial Expert를 뺐을 때의 하락폭 8.3%p가 실려 있다"
    page: 12
    bbox_norm: [0.2396, 0.2464, 0.7604, 0.3643]
    strategy: table-region
    curated: false
---

## 한 줄 요약 (One-line Summary)

OmniVLA-RL은 Spatial Expert, Reasoning Expert, Action Expert 세 전문가를 Mixture-of-Transformers(MoT) backbone 하나에 통합해 3D 공간 특징과 언어와 시각 의미를 Transformer 층 안에서 직접 융합하고, flow matching의 ODE 디노이징을 SDE로 바꿔 GSPO와 결합한 Flow-GSPO로 online 강화학습을 수행하는 VLA다. LIBERO 평균 성공률 97.6%로 π0.5(96.9%)를 넘었고, LIBERO-Plus에서는 SFT 기준선 41.2%를 80.3%로 끌어올려 PPO(78.7%)와 GRPO(65.7%)를 앞섰다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 제목 | OmniVLA-RL: A Vision-Language-Action Model with Spatial Understanding and Online RL |
| 저자 | Haoxiang Jie, Yaoyuan Yan (공동 제1저자), Xiangyu Wei, Kailin Wang, Hongjie Yan, Zhiyou Heng, Daocheng Chen |
| 소속 | AI Lab, Country Garden Services (碧桂园服务), Omni AI, VBot, East China Normal University |
| 발행 | arXiv 2604.17706v2, 2026년 4월 24일 (본문 날짜 4월 27일), cs.RO, preprint |
| 분량 | 16쪽 (본문 12쪽, 참고문헌 4쪽), Figure 4개, Table 2개 |
| 키워드 | VLA, spatial intelligence, 강화학습, flow matching |
| 코드 | 논문에 공개 링크 없음 |

이름이 같은 다른 자료로 Hirose 외(UC Berkeley, ICRA 2026)의 navigation용 "OmniVLA: An Omni-Modal Vision-Language-Action Model for Robot Navigation"이 있다. 두 연구는 저자와 문제 설정이 전혀 다르며, 이 논문은 후자를 인용하지 않는다. wiki에서는 `hirose-2025-omnivla-project-page`가 별도 페이지다.

## 2. 주요 기여 (Key Contributions)

저자들이 정리한 기여는 네 가지다.

1. **MoT 기반 tri-expert 구조.** Spatial Expert, Reasoning Expert, Action Expert가 같은 Transformer 층을 공유하며 언어 지시문(instruction) 특징, 시각 의미 특징, 3D 공간 특징이 층 내부에서 양방향으로 상호작용한다. 인코더나 action head에서만 공간 정보를 섞는 early fusion과 late fusion의 표현 병목을 피하려는 설계다.
2. **Block-wise Causal Attention.** 공간과 의미 토큰을 prefix로, action 토큰을 suffix로 나누어, prefix는 서로 양방향으로 보되 action 토큰은 보지 못하게 하고, action 토큰은 prefix 전체와 자기 앞의 action 토큰만 보게 하는 마스크다. 장면 이해가 디노이징 노이즈에 오염되지 않으면서 action 생성은 autoregressive causality를 지킨다.
3. **Flow-GSPO.** flow matching의 결정론적 ODE 디노이징을 Fokker-Planck 방정식을 거쳐 SDE로 바꾸어 확률적 탐색을 가능하게 하고, action block 단위로 GSPO 목적함수를 적용한다. GRPO 계열의 토큰 단위 importance ratio가 만드는 편향과 불안정을 피하는 것이 목적이다.
4. **LIBERO와 LIBERO-Plus 실험.** LIBERO 평균 97.6%로 비교 대상 중 1위, LIBERO-Plus에서 PPO와 GRPO보다 수렴 속도와 최종 성공률 모두 우위다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 문제 의식

논문은 기존 VLA의 문제를 세 가지로 본다. 첫째, 일반 VLM은 장면 이해와 지시문 해석에는 강하지만 물체의 3D 위치와 크기를 정확히 내지 못해 VLA의 공간 정밀도를 떨어뜨린다. 둘째, 공간 특징을 VLA에 넣는 기존 방법은 early fusion(Evo-0, SpatialVLA처럼 VLM 앞단 인코더에서 융합)이나 late fusion(FALCON처럼 VLM 뒤 action head에서 cross-attention)이라 핵심 대형 모델 부분은 건드리지 않는다. 셋째, VLA에 강화학습을 적용할 때 PPO는 action 모델과 비슷한 크기의 value 모델을 따로 설계해야 하고, GRPO는 토큰 단위 importance ratio 설계 결함 때문에 학습이 불안정하고 collapse가 잦다(Zheng 외 2025, GSPO 논문의 지적).

### 3.2 문제 정식화

로봇 manipulation 과제를 Markov process M = (S, A, P, R, ρ0)로 둔다. 상태 공간 S는 RGB 이미지 I, 언어 지시문 L, proprioception 상태 S_prop으로 구성된다. A는 action space, P는 상태 전이 함수, R은 reward function, ρ0는 초기 상태 분포다. timestep t에서 observation o_t는 상태 s_t와 같다고 두고, agent는 π_θ(a|s_t)에서 action a_t를 샘플링한다. 이 π_θ가 VLA 모델이다.

### 3.3 전체 구조

OmniVLA-RL은 VLA 모델과 online 강화학습 모듈로 구성된다. VLA 모델은 Mixture-of-Transformers(MoT, Liang 외 2024) backbone 위에 세 expert를 둔다.

| Expert | 입력 | 역할 | 인코더 |
|---|---|---|---|
| Reasoning Expert | 멀티뷰 observation O, 지시문 L | 고수준 의미 임베딩과 시각 사전 지식 추출. 결과 latent가 다른 모듈의 전역 컨텍스트가 된다 | SigLIP (vision), pre-training된 VLM |
| Spatial Expert | 멀티뷰 observation O | 세밀한 3D 구조 특징 추출. Transformer 블록 안에서 의미 정보와 attention을 수행해 과제 관련 공간-의미 특징을 만든다 | VGGT (Wang 외 2025b) |
| Action Expert | 융합된 공간-의미 표현, 언어 supervision | 실행 가능한 제어 신호를 end-to-end로 생성 | 선형 projector + conditional flow matching |

#### Reasoning Expert

대규모 이미지-텍스트 데이터로 pre-training된 VLM으로 초기화한다. 매 timestep에 SigLIP(Zhai 외 2023)으로 멀티뷰 observation O = {O_i} (i = 1..M)에서 의미 특징 z_sem ∈ R^{n×d}를 뽑고, 언어 토큰 z_lang과 이어 붙여 decoder-only Transformer에 넣는다. 조건부 분포 p(z_lang | z_sem)을 모델링해 cross-modal alignment를 수행한다.

#### Spatial Expert

VGGT로 세밀한 특징을 뽑아 Transformer backbone에 통합해 공간 표현 z_spatial을 만든다. 최적화를 돕기 위해 마지막 hidden state h_i ∈ R^{C×d}에 경량 Transformer decoder를 spatial auxiliary head로 붙이고, 학습 중 공간 중심 pretext task로 supervision을 준다. 이 auxiliary head는 downstream 추론 파이프라인과 분리되어 최종 action 생성에는 참여하지 않는다.

#### Action Expert

action chunking 전략을 쓴다. action chunking은 한 번의 추론으로 여러 timestep의 action을 묶어 내는 방식이다. action 시퀀스를 선형 projector로 Transformer의 latent 공간에 사상하고, conditional flow matching(CFM, Lipman 외 2022a)으로 다음 조건부 분포를 모델링한다.

a_t ~ p(a | z_spatial, z_sem, z_lang)   (식 8)

#### Block-wise Causal Attention

이질적인 모달리티 표현을 하나의 Transformer 안에서 통합하기 위한 마스크 설계다.

- Reasoning Expert와 Spatial Expert의 토큰은 omni-visible prefix로 취급한다. 세밀한 공간 패치와 거시적 의미 컨텍스트가 과제 프롬프트의 안내 아래 양방향 cross-modal alignment를 이룬다. 즉 의사결정 전에 물리적으로 grounding된 환경 표현을 먼저 만든다.
- Action suffix에는 엄격한 causal 단방향 제약을 둔다. action chunk는 prefix 전체 정보에 접근하되, 내부에서는 autoregressive causality를 따른다.
- prefix 모듈은 뒤따르는 action block의 latent 노이즈를 attention하지 못하게 막는다. diffusion 샘플링의 확률적 노이즈가 장면 이해를 오염시키는 것을 막기 위해서다.

Figure 2의 마스크는 Reasoning, Spatial, State, Action 네 블록으로 구성된다. Reasoning과 Spatial 블록은 서로 완전히 보이고(진한 칸), State와 Action은 prefix를 보되 자기들 사이는 하삼각 패턴이며, prefix 행에서 action 열은 흰 칸이다.

### 3.4 Flow-GSPO

#### 배경 지식 GSPO

강화학습의 목표는 horizon H 아래에서 기대 누적 reward J_RL(θ) = E[Σ_{t=0}^{H} γ^t R(s_t, a_t)]를 최대화하는 것이다. GSPO(Group Sequence Policy Optimization, Zheng 외 2025)는 importance ratio를 토큰이 아니라 시퀀스 우도 기준으로 정의한다.

- 목적함수 (식 2): 그룹 G개 샘플 y_i에 대해 min(s_i(θ) Â_i, clip(s_i(θ), 1-ε, 1+ε) Â_i)의 평균
- 그룹 advantage (식 3): Â_i = (r(x, y_i) - mean{r(x, y_j)}) / std{r(x, y_j)}
- importance ratio (식 4): s_i(θ) = exp( (1/|y_i|) Σ_t log π_θ(y_{i,t}|x, y_{i,<t}) / π_θold(y_{i,t}|x, y_{i,<t}) ), 즉 시퀀스 길이로 정규화한 기하 평균 우도비

#### 배경 지식 flow matching

flow matching은 Gaussian 같은 단순 초기 분포를 목표 데이터 분포로 옮기는 continuous normalizing flow를 학습하는 방법이다. 흐름은 ODE dx_t/dt = v_t(x_t, t)로 기술되며 v_t가 velocity field다. ReFlow에서는 x = (1-t) x_0 + t x_1 선형 보간으로 확률 밀도 경로를 얻고, 신경망 v_θ(x, t)가 목표 velocity field를 회귀한다(식 6). 목표 field를 직접 얻기 어려우므로 Lipman 외는 조건부 velocity field u(x|x_1)을 도입한 conditional flow matching 손실(식 7)을 쓴다.

#### Stochastic Flow Matching

CFM이 생성하는 연속 action 시퀀스를 A_t = [a_{t,0}, ..., a_{t,H-1}]로 두고, 디노이징 step 수를 K, step 크기를 δ = 1/K로 둔다. A_t^τ는 τ번째 디노이징 단계의 action이고 A_t^0 ~ N(0, I)다. Rectified Flow 틀에서 조건부 확률 p(A_t^τ | A_t)를 채택하고 목표 vector field를 u(A_t^τ | A_t) = A_t - ε (ε ~ N(0, I))으로 두면 결정론적 갱신식은 다음과 같다.

A_t^{τ+δ} = A_t^τ + δ v_θ(A_t^τ, s_t)   (식 9)

강화학습은 action 탐색이 확률적이어야 한다. 그래서 Chen 외 2025와 Lu 외 2025를 따라 Fokker-Planck 방정식을 통해 ODE를 다음 SDE로 바꾼다. 무작위 노이즈 주입이 action 생성 과정을 미분 가능하면서 확률적 탐색에 적합하게 만든다.

dA_t^τ = [ v_θ(A_t^τ, s_t) + (σ_τ²/2)(A_t^τ + (1-τ) v_θ(A_t^τ, s_t)) ] dτ + σ_τ dw_τ   (식 10)

Euler-Maruyama 방법으로 이산화하면 갱신식은 다음과 같다.

A_t^{τ+δ} = A_t^τ + [ v_θ + (σ_τ²/2)(A_t^τ + (1-τ) v_θ) ] δ + σ_τ √δ ϵ   (식 11)

따라서 전이 확률 p(A_t^{τ+δ} | A_t^τ, s_t)는 평균 μ_τ = A_t^τ + [v_θ + (σ_τ²/2)(A_t^τ + (1-τ) v_θ)] δ, 공분산 Σ_τ = σ_τ² δ I인 등방성 Gaussian이다(식 12, 13). 이 닫힌 형태의 Gaussian 전이가 있어야 우도비를 계산할 수 있다.

#### GSPO를 stochastic flow matching에 적용

GRPO 같은 토큰 단위 최적화가 만드는 단일 step 편향 누적과 action 연속성 훼손을 피하기 위해, VLA가 생성한 action block A_t를 시퀀스 단위 최적화 단위로 삼는다.

- 그룹 크기 G에 대해 상태 s_t마다 G개의 action 시퀀스 {A_{t,i}}를 샘플링한다.
- 각 action 시퀀스의 우도는 K단계 Gaussian 전이의 곱이다(식 14): π_θ(A_{t,i}|s_t) = Π_{τ=0}^{K-1} N(A_{t,i}^{τ+δ} | μ_{τ,i}, Σ_{τ,i}).
- |A_{t,i}| = H × K (action block 길이 × 디노이징 step 수)로 두고, action block 단위 importance ratio를 시퀀스 우도비의 1/|A_{t,i}| 제곱으로 정의한다(식 15).
- advantage는 G개 action block의 누적 reward R_total(A_{i,t}, s_t) = Σ_{h=0}^{H-1} γ^h R(s_t, a_{t,i,h})를 그룹 평균과 표준편차로 정규화한 값이다(식 16).
- 안정성을 위해 old policy와 new policy 사이의 action block 단위 KL divergence 항 β D_KL(π_θ || π_old)를 뺀다(식 17, 18).

최종 목적함수 J_Flow-GSPO(θ)는 GSPO의 clip 목적함수에 KL 벌점을 더한 꼴이다.

#### gradient 분석

clip 항을 무시하면 주 항의 gradient는 (1/G) Σ_i s_{t,i}(θ) Â_{i,t} ∇_θ log s_{t,i}(θ)의 기대값이다(식 19). 전이가 Gaussian이므로 log 우도의 gradient는 Σ^{-1}_{τ,i} (A^{τ+δ} - μ_{τ,i}) × ∇_θ μ_{τ,i}이고(식 21), μ_{τ,i}를 θ와 무관한 항 C_0 = A_t^τ (1 + σ_τ² δ / 2)와 θ에 의존하는 항 C_r = (1 + σ_τ² (1-τ)/2) δ × v_θ로 분해하면 ∇_θ μ_{τ,i} = C_r ∇_θ v_θ가 된다(식 22, 23). 최종 gradient(식 24)는 각 디노이징 step에서 (예측 노이즈 잔차) × (1 + σ_τ²(1-τ)/2) δ × ∇_θ v_θ의 합에 (s Â / |A| + β) 가중치를 곱한 형태다. 즉 Flow-GSPO의 gradient는 velocity network v_θ의 gradient를 advantage 가중 잔차로 되먹이는 구조이며, 디노이징 step마다 σ_τ에 따라 기여가 달라진다.

### 3.5 3단계 학습 과정

| 단계 | 학습 대상 | 동결 | 데이터 | 손실 |
|---|---|---|---|---|
| Stage I 공간 pre-training | Reasoning Expert(PaLiGemma로 초기화) + Spatial Expert(무작위 초기화) + Spatial Decoder | Action Expert | 대규모 3D 데이터셋 | L_Spatial = L_points + λ_cam L_cam + λ_normal L_normal (식 25) |
| Stage II action pre-training | Action Expert 해제, 전체 학습 | Spatial Head 비활성화 | DROID 전체 | conditional flow matching 손실 (식 26) |
| Stage III online RL | 전체 파라미터 | 없음 | 과제별 환경 (LIBERO, LIBERO-Plus) | J_Flow-GSPO (식 17) |

Stage I의 공간 손실은 PI-3(Wang 외 2025c)에서 착안한 재구성 목적함수로, point cloud 재구성, 카메라 파라미터 재구성, surface normal 재구성 손실의 가중합이다. Action Expert를 얼려 두는 이유는 지각 특징이 수렴하기 전에 action 편향을 갖는 것을 막기 위해서다.

Stage II의 CFM 손실은 L_CFM = E_{t~U(0,1), x_0~p_0} [ || v_t(x_t, t; c) - (x_1 - x_0) ||² ]이며, c는 멀티모달 조건 컨텍스트, x_t = t x_1 + (1-t) x_0는 보간된 action 상태다.

Stage III의 설정은 다음과 같다.

| 항목 | 값 |
|---|---|
| reward | 이진 과제 완료 reward + end-effector와 목표 물체 사이 거리로 잰 연속 gripper-alignment reward |
| 그룹 크기 G | 8 |
| clip 계수 ε | 0.2 |
| KL 벌점 가중치 β | 0.01 |
| 노이즈 스케줄 | σ_τ = σ_max (1-τ), σ_max = 0.1 |
| 디노이징 step K | 10 |
| action horizon H | 16 |
| optimizer | AdamW, lr 1e-5, weight decay 0.01 |
| RL 갱신 step | 200, rollout buffer는 10 step마다 갱신 |

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 벤치마크

- **LIBERO** (Liu 외 2023): 평생 로봇 학습의 지식 전이를 재는 벤치마크로, LIBERO-Spatial, LIBERO-Object, LIBERO-Goal, LIBERO-Long 네 suite가 각각 공간 추론, 물체 중심 manipulation, 목표 조건 완수, 중간 길이 horizon 의사결정을 잰다.
- **LIBERO-Plus** (Zhou 외 2025): 서랍 열기, 특정 물체 꺼내기, distractor를 피해 목표 위치에 놓기 같은 다단계 compositional long-horizon 과제를 한 episode 안에서 요구하는 확장판이다. action horizon이 길고 물체 상호작용이 밀집되며 공간 정밀도 요구가 엄격해 모든 방법의 절대 성공률이 LIBERO보다 크게 낮다. 논문은 그래서 각 구성 요소의 상대 개선폭을 핵심 지표로 본다.

### 4.2 LIBERO 결과 (Table 1)

| 방법 | Spatial | Object | Goal | Long | 평균 | 평균 순위 |
|---|---|---|---|---|---|---|
| Diffusion Policy | 78.5% | 87.5% | 73.5% | 64.8% | 76.1% | 7 |
| Octo | 78.9% | 85.7% | 75.1% | 54.1% | 74.8% | 8 |
| OpenVLA | 84.7% | 88.4% | 79.2% | 63.7% | 76.5% | 6 |
| SpatialVLA | 88.2% | 89.9% | 78.6% | 55.5% | 78.1% | 5 |
| CoT-VLA | 87.5% | 91.6% | 87.6% | 69.0% | 83.9% | 4 |
| π0 | 96.8% | 98.8% | 95.8% | 85.2% | 94.2% | 3 |
| π0.5 | 98.8% | 98.2% | 98.0% | 92.4% | 96.9% | 2 |
| F1 (Lv 외 2025) | 98.2% | 97.8% | 95.4% | 91.3% | 95.7% | 3 |
| OmniVLA-RL | 99.2% | 99.2% | 98.5% | 93.5% | 97.6% | 1 |

논문이 강조하는 해석은 세 가지다.

- LIBERO-Spatial과 LIBERO-Goal에서 가장 강한 기준선 π0.5를 각각 0.4%p, 0.5%p 앞선다. tri-expert 구조가 공간 지각과 목표 지향 추론을 조절한 효과라고 본다.
- LIBERO-Long 93.5%로 2위(π0.5, 92.4%)보다 1.1%p 높다. long-horizon 과제는 compounding error에 민감하므로 이 차이가 의미 있다고 본다.
- 본문은 "π0 대비 평균 성공률 21.1%p 절대 개선"이라고 쓰지만, Table 1에서 π0 평균은 94.2%라 차이는 3.4%p다. 21.1%p는 OpenVLA(76.5%)와의 차이에 해당하므로 본문의 π0 표기는 오기로 보인다.

Table 1의 순위 열은 표 자체에서 일관되지 않다. 예를 들어 Long 열에서 F1(91.3%)이 π0(85.2%)보다 높은데 둘 다 2위로 적혀 있고, 평균 열에서 π0(94.2%)와 F1(95.7%)이 모두 3위다. 수치는 표 그대로 옮기되 순위는 참고로만 본다.

### 4.3 LIBERO-Plus 학습 곡선 (Figure 4)

Flow-GSPO, PPO, GRPO를 같은 SFT 체크포인트에서 200 step 동안 online RL로 학습한 성공률 곡선이다.

- **표본 효율**: Flow-GSPO는 첫 50 step 안에 70% 성공률을 넘는다. PPO와 GRPO보다 빠르며, 논문은 action block 단위 importance ratio가 토큰 단위 방법보다 시퀀스 의존성을 잘 잡기 때문이라고 설명한다.
- **수렴 안정성**: PPO는 80 step 부근에서 눈에 띄는 변동과 퇴행을 보이는 반면, Flow-GSPO는 단조 개선 추세를 유지한다. 논문은 segmented policy optimization과 action block KL 항의 효과로 본다.
- **성능 상한**: 100 step 이후 Flow-GSPO는 80% 이상을 유지하며 GRPO보다 약 14.6%p 높다.

### 4.4 Ablation (Table 2, LIBERO-Plus)

| 구성 | 성공률 | 변화 |
|---|---|---|
| OmniVLA-RL (SFT only) | 41.2% | 기준 |
| + PPO | 78.7% | +37.5%p |
| + GRPO | 65.7% | +24.5%p |
| + Flow-GSPO | 80.3% | +39.1%p |
| Spatial Expert 제거 (Reasoning + Action만) | 32.9% | -8.3%p |

- SFT만 한 기준선 41.2%는 다단계 과제 분포에서 imitation learning이 도달하는 상한과 일치한다고 논문은 설명한다.
- Flow-GSPO는 SFT 대비 +39.1%p로, 같은 학습 제약 아래 PPO보다 1.6%p, GRPO보다 14.6%p 높다. 논문은 action block 단위 최적화가 연속 로봇 trajectory의 시간 의존성과 다봉 분포를 토큰 단위 policy gradient보다 잘 포착한다는 근거로 든다.
- Spatial Expert를 빼면 41.2%에서 32.9%로 8.3%p 떨어진다. 구조 ablation 중 가장 큰 하락이며, 고해상도 공간 특징 없이는 작은 물체를 찾거나 복잡한 가림을 다루는 정밀도가 부족하다는 해석이다. 이 ablation은 SFT 단계 기준선에서 잰 것이며 RL 이후 비교는 없다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

논문이 스스로 밝힌 한계는 두 가지다.

1. 검증이 고충실도 시뮬레이션 환경에 한정되어 sim2real 격차와 실제 하드웨어 제약 아래의 견고성은 확인되지 않았다.
2. action chunk 단위 최적화가 단기 일관성은 높이지만, 구조적 long-horizon 추론과 환경 전이 예측을 담당하는 world model이 없다.

향후 계획은 실제 로봇 플랫폼 배포, 생성형 world model을 통합한 imagination 기반 planning, 다양한 물체와 멀티모달 센서 피드백을 다루는 open-world manipulation 확장이다.

논문 외적으로 읽을 때 유의할 점은 다음과 같다.

- Stage I의 "대규모 3D 데이터셋"이 구체적으로 무엇인지, 모델 크기와 학습 자원이 얼마인지는 본문에 없다.
- LIBERO-Plus 절대 수치는 Figure 4와 Table 2에만 있고, LIBERO-Plus에서 다른 VLA(π0.5 등)와의 비교는 없다. PPO와 GRPO 비교는 모두 같은 OmniVLA-RL SFT 체크포인트 위에서 이루어졌다.
- Block-wise Causal Attention과 MoT 구조 자체에 대한 ablation(예: prefix가 action을 보게 했을 때)은 없다. Spatial Expert 제거만 있다.
- 4.2절에서 짚은 본문과 표의 수치 불일치(π0 대비 21.1%p)와 순위 열 불일치가 있다.

## 6. 관련 연구 (Related Work)

| 분류 | 자료 | 이 논문과의 관계 |
|---|---|---|
| 공간 지각 | BEVFormer, M2BEV, FastBEV (자율주행 BEV), VoxPoser (3D value map), FALCON (Embodied Spatial Model) | 2D 이미지에서 3D를 지각하는 선행 방법. FALCON은 late fusion의 대표 사례 |
| 공간 융합 VLA | Evo-0 (VGGT 특징을 fusion layer에서 cross-attention), SpatialVLA (Ego3D position encoding을 SigLIP 특징에 주입해 PaLiGemma2에 입력) | early fusion의 대표 사례. OmniVLA-RL은 Transformer 층 내부 융합으로 차별화 |
| VLA | RT-2, OpenVLA (autoregressive head), π 시리즈 (flow matching + action chunking), SmolVLA (Smol-VLM 기반 소형), Octo | 기준선이자 설계 계보. Action Expert의 flow matching은 π 계열을 따른다 |
| VLA 강화학습 | VLA-RL (Lu 외 2025), PI-RL (Chen 외 2025) | PPO와 GRPO를 VLA에 적용한 선행 연구. Flow-GSPO의 SDE 전환은 이 둘을 참고했다 |
| 생성 모델 | DDPM, score-based model, consistency model, flow matching (Lipman 외 2023) | action 생성에 쓰이는 세 생성 패러다임. Diffusion Policy, Consistency Policy, CEED-VLA, Flow Policy가 로봇 적용 사례 |
| 대형 모델 RL | policy gradient, TRPO, PPO, GRPO (DeepSeek-Math), GSPO (Zheng 외 2025) | GRPO는 value 모델을 그룹 상대 advantage로 대체했고, GSPO는 importance ratio를 시퀀스 단위로 옮겼다. Flow-GSPO는 GSPO를 action block에 적용한다 |
| backbone | Mixture-of-Transformers (Liang 외 2024), PaLiGemma, SigLIP, VGGT, PI-3 | MoT는 모달리티별 파라미터를 분리하되 attention을 공유하는 구조. PI-3는 Stage I 공간 손실의 출처 |
| 데이터와 벤치마크 | DROID, LIBERO, LIBERO-Plus | Stage II 학습 데이터와 평가 무대 |

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| Mixture-of-Transformers (MoT) | 모달리티마다 feed-forward와 projection 파라미터를 따로 두면서 attention 연산은 공유하는 Transformer 변형. OmniVLA-RL은 이 위에 세 expert를 둔다 |
| Spatial Expert | VGGT 특징으로 멀티뷰 장면의 3D 구조를 담당하는 expert. 학습 중에만 Spatial Decoder(auxiliary head)를 붙여 point cloud, 카메라, surface normal 재구성으로 supervision을 받는다 |
| Reasoning Expert | PaLiGemma로 초기화한 VLM expert. SigLIP 시각 특징과 언어 토큰을 받아 의미 추론을 담당한다 |
| Action Expert | 융합된 공간-의미 표현을 조건으로 conditional flow matching으로 action chunk를 생성하는 expert |
| Block-wise Causal Attention | 공간과 의미 토큰을 양방향 prefix로, action 토큰을 causal suffix로 두고 prefix가 action을 보지 못하게 막는 attention 마스크 |
| GSPO (Group Sequence Policy Optimization) | importance ratio를 토큰이 아니라 시퀀스 우도의 길이 정규화 값으로 정의한 그룹 기반 policy 최적화. GRPO의 토큰 단위 불안정을 줄이려는 방법 |
| Flow-GSPO | flow matching의 ODE 디노이징을 SDE로 바꿔 Gaussian 전이 우도를 얻고, action block을 시퀀스 단위로 삼아 GSPO 목적함수와 KL 벌점으로 최적화하는 online 강화학습 방법 |
| Stochastic Flow Matching | Fokker-Planck 방정식으로 결정론적 flow matching ODE를 SDE로 바꾸고 Euler-Maruyama로 이산화한 확률적 디노이징. 각 step의 전이가 등방성 Gaussian이 된다 |
| importance ratio | 새 policy와 old policy가 같은 샘플에 부여하는 확률의 비. PPO와 GSPO 계열은 이 비를 clip해 갱신 폭을 제한한다 |
| LIBERO-Plus | LIBERO를 다단계 compositional long-horizon 과제로 확장한 벤치마크. 이 논문에서 online RL과 ablation의 무대 |
| early fusion / late fusion | 공간 특징을 VLM 앞단 인코더에서 섞는 방식과 VLM 뒤 action head에서 섞는 방식. 둘 다 VLM 본체는 건드리지 않는다는 것이 논문의 비판점 |

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 5 | "OmniVLA-RL 전체 구조: 세 expert와 MoT backbone, Flow-GSPO 모듈" | caption-region | ★ wiki 권장 (architecture) |
| fig02 | 7 | "Block-wise Causal Attention 마스크" | caption-region | ★ wiki 권장 (method) |
| fig03 | 9 | "3단계 학습 과정" | caption-region | ★ wiki 권장 (method) |
| fig04 | 11 | "LIBERO-Plus RL 학습 곡선: Flow-GSPO vs PPO vs GRPO" | caption-region | ★ wiki 권장 (result) |
| tab01 | 10 | "LIBERO 4개 suite 성공률 비교표" | table-region | (선택) 본문 표로 옮겼으므로 임베드는 생략 가능 |
| tab02 | 12 | "LIBERO-Plus ablation 표" | table-region | (선택) 본문 표로 옮겼으므로 임베드는 생략 가능 |
