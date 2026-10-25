---
title: "πRL: Online RL Fine-tuning for Flow-based Vision-Language-Action Models"
type: paper
year: 2025
category: physical-ai
raw_path: raw/papers/chen-2025-pirl-online-rl-fine-tuning-for.pdf
raw_filename: "chen-2025-pirl-online-rl-fine-tuning-for.pdf"
source_collection: external
authors: "Kang Chen*, Zhihao Liu*, Tonghe Zhang*, Zhen Guo, Si Xu, Hao Lin, Hongzhi Zang, Xiang Li, Bingwen Wei, Jiakai Zhou, Quanlu Zhang, Zhaofei Yu, Guoliang Fan, Tiejun Huang, Yu Wang†, Chao Yu† (Tsinghua, PKU, CASIA, CMU, Infinigence AI, Zhongguancun Academy)"
arxiv_id: "2510.25889"
url: "https://arxiv.org/abs/2510.25889"
tags: [physical-ai, vla, rl-control, manipulation]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/chen-2025-pirl-online-rl-fine-tuning-for/fig01.png
    raw: raw/papers/chen-2025-pirl-online-rl-fine-tuning-for-figures/fig01.png
    caption: "πRL 개요. 왼쪽 위는 π0와 π0.5 구조, 가운데는 pre-training, SFT, RL로 이어지는 학습 패러다임, 오른쪽은 ManiSkill OOD 레이더 차트다. 아래에는 네 벤치마크 ID 성공률, LIBERO-Long에서 one-shot SFT 43.9%가 RL 후 94.0%로 오르는 곡선, Real2Sim2Real 실제와 시뮬레이터 화면 비교가 있다"
    page: 1
    bbox_norm: [0.0878, 0.2416, 0.8877, 0.5907]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/chen-2025-pirl-online-rl-fine-tuning-for/fig02.png
    raw: raw/papers/chen-2025-pirl-online-rl-fine-tuning-for-figures/fig02.png
    caption: "πRL의 noise 주입 위치. VLM이 observation(다시점 영상, 언어 명령, 관절 state)을 KV-cache로 넘기고 action expert가 속도 v와 표준편차 σ를 낸다. Flow-Noise는 noise network가 학습한 분산을, Flow-SDE는 ODE를 SDE로 바꿔 얻은 고정 분산을 쓴다"
    page: 4
    bbox_norm: [0.0844, 0.0802, 0.4796, 0.271]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/chen-2025-pirl-online-rl-fine-tuning-for/fig03.png
    raw: raw/papers/chen-2025-pirl-online-rl-fine-tuning-for-figures/fig03.png
    caption: "πRL의 두 MDP 정식화. Flow-Noise는 denoising 과정 전체의 결합 log-likelihood를 한 step의 action 확률로 쓰는 one-layer MDP이고, Flow-SDE는 denoising을 inner MDP, 환경 상호작용을 outer MDP로 둔 two-layer MDP다"
    page: 4
    bbox_norm: [0.5083, 0.0773, 0.8782, 0.3217]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/chen-2025-pirl-online-rl-fine-tuning-for/fig04.png
    raw: raw/papers/chen-2025-pirl-online-rl-fine-tuning-for-figures/fig04.png
    caption: "critic 배치 두 가지. (a) π0는 state가 action expert로 들어가므로 critic을 action expert 뒤에 두고 denoising 시점 τ에 대해 value를 평균한다. (b) π0.5는 state가 VLM 입력에 합쳐지므로 critic을 VLM 출력에 직접 붙인다"
    page: 6
    bbox_norm: [0.107, 0.0788, 0.8879, 0.2572]
    strategy: caption-region
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/chen-2025-pirl-online-rl-fine-tuning-for/fig05.png
    raw: raw/papers/chen-2025-pirl-online-rl-fine-tuning-for-figures/fig05.png
    caption: "OOD 평가 결과. (a) CALVIN ABC에서 D로 옮긴 평가에서 성공률이 SFT 61.3%에서 RL 79.1%로 17.8%p 오른다. (b) ManiSkill OOD 12개 항목 레이더 차트. (c) MetaWorld ML45에서 ID 학습 성공률은 오르지만 OOD 평가는 진동한다"
    page: 7
    bbox_norm: [0.1153, 0.2672, 0.8607, 0.4659]
    strategy: caption-region
    curated: true
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/chen-2025-pirl-online-rl-fine-tuning-for/fig06.png
    raw: raw/papers/chen-2025-pirl-online-rl-fine-tuning-for-figures/fig06.png
    caption: "Flow-SDE π0, LIBERO-Long에서 critic 설계 ablation. VLM 뒤에 붙인 V_vlm이 성공률, value loss, explained variance 모두에서 약간 앞서고, V_expert는 4층 MLP가 1층 MLP보다 회귀를 잘한다"
    page: 8
    bbox_norm: [0.0967, 0.0771, 0.8792, 0.2311]
    strategy: caption-region
    curated: false
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/chen-2025-pirl-online-rl-fine-tuning-for/fig07.png
    raw: raw/papers/chen-2025-pirl-online-rl-fine-tuning-for-figures/fig07.png
    caption: "Flow-SDE π0, LIBERO-Goal에서 MDP 정식화 비교. 최종 성공률은 셋이 비슷하고, update 시간은 two-layer 814.2초, hybrid two-layer 428.6초, one-layer 821.4초로 hybrid가 약 2배 빠르다"
    page: 8
    bbox_norm: [0.0946, 0.2182, 0.8807, 0.4203]
    strategy: caption-region
    curated: true
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/chen-2025-pirl-online-rl-fine-tuning-for/fig08.png
    raw: raw/papers/chen-2025-pirl-online-rl-fine-tuning-for-figures/fig08.png
    caption: "Flow-SDE π0, LIBERO-Long에서 고정 noise와 학습형 noise 비교. step 0 학습 성능이 비슷하고 수렴 성능도 둘 다 높다"
    page: 8
    bbox_norm: [0.181, 0.443, 0.7949, 0.5963]
    strategy: caption-region
    curated: false
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/chen-2025-pirl-online-rl-fine-tuning-for/fig09.png
    raw: raw/papers/chen-2025-pirl-online-rl-fine-tuning-for-figures/fig09.png
    caption: "Flow-SDE π0, LIBERO-Spatial에서 noise level a(0.2, 0.5, 0.8) ablation. a=0.2는 clipped fraction이 크게 높아 학습이 불안정하다"
    page: 9
    bbox_norm: [0.0808, 0.2641, 0.8951, 0.4177]
    strategy: caption-region
    curated: false
  - id: fig10
    label: Figure 10
    kind: figure
    file: assets/chen-2025-pirl-online-rl-fine-tuning-for/fig10.png
    raw: raw/papers/chen-2025-pirl-online-rl-fine-tuning-for-figures/fig10.png
    caption: "Flow-SDE π0, LIBERO-Spatial에서 denoise step(1, 2, 4, 8) ablation. step 1은 학습 rollout 성공률이 크게 낮다"
    page: 9
    bbox_norm: [0.181, 0.4403, 0.7943, 0.5935]
    strategy: caption-region
    curated: false
  - id: fig11
    label: Figure 11
    kind: figure
    file: assets/chen-2025-pirl-online-rl-fine-tuning-for/fig11.png
    raw: raw/papers/chen-2025-pirl-online-rl-fine-tuning-for-figures/fig11.png
    caption: "Flow-SDE π0, LIBERO-Spatial에서 action chunk 크기(5, 10, 20) ablation. chunk가 클수록 explained variance가 낮아진다"
    page: 9
    bbox_norm: [0.181, 0.6161, 0.7949, 0.7693]
    strategy: caption-region
    curated: false
  - id: fig12
    label: Figure 12
    kind: figure
    file: assets/chen-2025-pirl-online-rl-fine-tuning-for/fig12.png
    raw: raw/papers/chen-2025-pirl-online-rl-fine-tuning-for-figures/fig12.png
    caption: "RL로 개선한 policy를 실제 Franka 로봇에 zero-shot 배포해 집어 놓기 과제를 수행하는 장면"
    page: 17
    bbox_norm: [0.0808, 0.261, 0.8946, 0.3541]
    strategy: caption-region
    curated: false
  - id: fig13
    label: Figure 13
    kind: figure
    file: assets/chen-2025-pirl-online-rl-fine-tuning-for/fig13.png
    raw: raw/papers/chen-2025-pirl-online-rl-fine-tuning-for-figures/fig13.png
    caption: "RL 중 VLM 학습 여부 ablation. VLM 고정, LoRA-I, LoRA-II의 평가 성공률과 KL divergence를 비교하며 LoRA-II가 고정 기준과 비슷한 곡선을 보인다"
    page: 19
    bbox_norm: [0.181, 0.0771, 0.7943, 0.2304]
    strategy: caption-region
    curated: false
  - id: fig14
    label: Figure 14
    kind: figure
    file: assets/chen-2025-pirl-online-rl-fine-tuning-for/fig14.png
    raw: raw/papers/chen-2025-pirl-online-rl-fine-tuning-for-figures/fig14.png
    caption: "learning rate scheduler ablation. cosine annealing scheduler가 KL divergence 증가를 막아 학습을 안정시킨다"
    page: 19
    bbox_norm: [0.181, 0.2526, 0.795, 0.4064]
    strategy: caption-region
    curated: false
  - id: fig15
    label: Figure 15
    kind: figure
    file: assets/chen-2025-pirl-online-rl-fine-tuning-for/fig15.png
    raw: raw/papers/chen-2025-pirl-online-rl-fine-tuning-for-figures/fig15.png
    caption: "ManiSkill 학습 곡선. π0와 π0.5 모두 평가 성공률이 초반에 잠시 하락한 뒤 explained variance가 오르면서 회복한다"
    page: 20
    bbox_norm: [0.181, 0.0771, 0.7949, 0.2217]
    strategy: caption-region
    curated: false
  - id: fig16
    label: Figure 16
    kind: figure
    file: assets/chen-2025-pirl-online-rl-fine-tuning-for/fig16.png
    raw: raw/papers/chen-2025-pirl-online-rl-fine-tuning-for-figures/fig16.png
    caption: "ManiSkill에서 π0.5 RL 학습 중 episode 길이. Flow-SDE와 Flow-Noise 모두 전문가 범위(34.5±2.6 step)로 수렴한다"
    page: 20
    bbox_norm: [0.319, 0.2444, 0.6563, 0.4062]
    strategy: caption-region
    curated: false
  - id: fig17
    label: Figure 17
    kind: figure
    file: assets/chen-2025-pirl-online-rl-fine-tuning-for/fig17.png
    raw: raw/papers/chen-2025-pirl-online-rl-fine-tuning-for-figures/fig17.png
    caption: "GR00T N1.5에 πRL을 적용한 구조. Eagle 2.5 VLM과 DiT action head에 critic을 action head 쪽으로 연결한다"
    page: 21
    bbox_norm: [0.1999, 0.0771, 0.7754, 0.2975]
    strategy: caption-region
    curated: false
  - id: tab01
    label: Table 1
    kind: table
    file: assets/chen-2025-pirl-online-rl-fine-tuning-for/tab01.png
    raw: raw/papers/chen-2025-pirl-online-rl-fine-tuning-for-figures/tab01.png
    caption: "네 벤치마크 ID 성능 종합. π0는 평균 51.1%에서 Flow-Noise 80.3%(+29.2%p), π0.5는 55.6%에서 Flow-SDE 86.6%(+31.0%p)로 오른다"
    page: 7
    bbox_norm: [0.0752, 0.0724, 0.9048, 0.2656]
    strategy: manual
    curated: true
  - id: tab02
    label: Table 2
    kind: table
    file: assets/chen-2025-pirl-online-rl-fine-tuning-for/tab02.png
    raw: raw/papers/chen-2025-pirl-online-rl-fine-tuning-for-figures/tab02.png
    caption: "Flow-SDE π0, LIBERO-Spatial 하이퍼파라미터 ablation. noise level, denoise step, action chunk별 SFT와 RL의 학습 및 평가 성공률"
    page: 9
    bbox_norm: [0.0808, 0.0897, 0.8684, 0.26]
    strategy: table-region
    curated: true
  - id: tab03
    label: Table 3
    kind: table
    file: assets/chen-2025-pirl-online-rl-fine-tuning-for/tab03.png
    raw: raw/papers/chen-2025-pirl-online-rl-fine-tuning-for-figures/tab03.png
    caption: "LIBERO 네 과제 묶음 결과. few-shot SFT에 RL을 더한 π0.5 Flow-Noise가 평균 98.3%로 전체 데이터 SFT π0.5의 96.9%를 넘는다"
    page: 14
    bbox_norm: [0.0808, 0.0993, 0.8945, 0.4027]
    strategy: table-region
    curated: false
  - id: tab04
    label: Table 4
    kind: table
    file: assets/chen-2025-pirl-online-rl-fine-tuning-for/tab04.png
    raw: raw/papers/chen-2025-pirl-online-rl-fine-tuning-for-figures/tab04.png
    caption: "ManiSkill IND와 OOD(Vision, Semantic, Execution) 결과. π0.5 Flow-SDE는 IND 40.1%에서 90.9%로 오른다"
    page: 14
    bbox_norm: [0.0808, 0.0993, 0.8945, 0.4027]
    strategy: table-region
    curated: false
  - id: tab05
    label: Table 5
    kind: table
    file: assets/chen-2025-pirl-online-rl-fine-tuning-for/tab05.png
    raw: raw/papers/chen-2025-pirl-online-rl-fine-tuning-for-figures/tab05.png
    caption: "CALVIN Scene D에서 길이 1~5 과제 연쇄 성공률과 평균 완료 subtask 수. π0.5 Flow-SDE의 Len-5가 61.3%에서 87.0%로 오른다"
    page: 15
    bbox_norm: [0.0808, 0.1118, 0.8945, 0.2731]
    strategy: table-region
    curated: false
  - id: tab06
    label: Table 6
    kind: table
    file: assets/chen-2025-pirl-online-rl-fine-tuning-for/tab06.png
    raw: raw/papers/chen-2025-pirl-online-rl-fine-tuning-for-figures/tab06.png
    caption: "MetaWorld MT50 난이도별 결과. π0 Flow-Noise가 평균 85.8%로 SmolVLA 68.2%를 넘는다"
    page: 15
    bbox_norm: [0.0808, 0.2958, 0.8945, 0.5087]
    strategy: table-region
    curated: false
  - id: tab07
    label: Table 7
    kind: table
    file: assets/chen-2025-pirl-online-rl-fine-tuning-for/tab07.png
    raw: raw/papers/chen-2025-pirl-online-rl-fine-tuning-for-figures/tab07.png
    caption: "ManiSkill OOD 세부 환경 13개별 성공률. 시각 언어 변형, 의미 추론, action 실행 세 묶음"
    page: 16
    bbox_norm: [0.0808, 0.0992, 0.8945, 0.3553]
    strategy: table-region
    curated: false
  - id: tab08
    label: Table 8
    kind: table
    file: assets/chen-2025-pirl-online-rl-fine-tuning-for/tab08.png
    raw: raw/papers/chen-2025-pirl-online-rl-fine-tuning-for-figures/tab08.png
    caption: "SIMPLER 네 과제 결과(Flow-Noise). π0 평균 67.2%에서 86.7%, π0.5 평균 59.2%에서 79.1%"
    page: 17
    bbox_norm: [0.0808, 0.0993, 0.8945, 0.2606]
    strategy: table-region
    curated: false
  - id: tab09
    label: Table 9
    kind: table
    file: assets/chen-2025-pirl-online-rl-fine-tuning-for/tab09.png
    raw: raw/papers/chen-2025-pirl-online-rl-fine-tuning-for-figures/tab09.png
    caption: "LIBERO에서 Flow-SDE와 함께 쓴 PPO와 GRPO 비교. π0 평균은 GRPO 90.0%, PPO 96.0%다"
    page: 18
    bbox_norm: [0.0808, 0.0993, 0.8945, 0.2606]
    strategy: table-region
    curated: false
  - id: tab10
    label: Table 10
    kind: table
    file: assets/chen-2025-pirl-online-rl-fine-tuning-for/tab10.png
    raw: raw/papers/chen-2025-pirl-online-rl-fine-tuning-for-figures/tab10.png
    caption: "GR00T N1.5에 Flow-SDE와 PPO를 적용한 LIBERO 결과. 평균 52.5%에서 89.9%로 오른다"
    page: 21
    bbox_norm: [0.0808, 0.3413, 0.8945, 0.4359]
    strategy: table-region
    curated: false
  - id: tab11
    label: Table 11
    kind: table
    file: assets/chen-2025-pirl-online-rl-fine-tuning-for/tab11.png
    raw: raw/papers/chen-2025-pirl-online-rl-fine-tuning-for-figures/tab11.png
    caption: "LIBERO 학습 하이퍼파라미터"
    page: 23
    bbox_norm: [0.0808, 0.1263, 0.8945, 0.4625]
    strategy: table-region
    curated: false
  - id: tab12
    label: Table 12
    kind: table
    file: assets/chen-2025-pirl-online-rl-fine-tuning-for/tab12.png
    raw: raw/papers/chen-2025-pirl-online-rl-fine-tuning-for-figures/tab12.png
    caption: "SIMPLER와 ManiSkill 학습 하이퍼파라미터"
    page: 23
    bbox_norm: [0.0808, 0.5341, 0.8945, 0.8829]
    strategy: table-region
    curated: false
  - id: tab13
    label: Table 13
    kind: table
    file: assets/chen-2025-pirl-online-rl-fine-tuning-for/tab13.png
    raw: raw/papers/chen-2025-pirl-online-rl-fine-tuning-for-figures/tab13.png
    caption: "MetaWorld와 CALVIN 학습 하이퍼파라미터"
    page: 24
    bbox_norm: [0.0808, 0.3365, 0.8945, 0.6727]
    strategy: table-region
    curated: false
---

## 한 줄 요약 (One-line Summary)

πRL은 flow matching으로 action을 생성하는 VLA(π0, π0.5)에 online RL fine-tuning을 적용하는 프레임워크다. flow matching에서 action의 log-likelihood를 계산할 수 없다는 문제를 학습형 noise network로 denoising을 이산 MDP로 만드는 Flow-Noise와, ODE를 SDE로 바꾸고 two-layer MDP를 세우는 Flow-SDE 두 방식으로 풀고 PPO로 최적화한다. LIBERO, ManiSkill, MetaWorld, CALVIN에서 few-shot SFT 대비 평균 성공률을 약 30%p 끌어올린다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 제목 | πRL: Online RL Fine-tuning for Flow-based Vision-Language-Action Models |
| 저자 | Kang Chen, Zhihao Liu, Tonghe Zhang (공동 1저자) 외 13명, 교신 Yu Wang, Chao Yu |
| 소속 | Tsinghua University, Peking University, 중국과학원 자동화연구소(CASIA), Carnegie Mellon University, Infinigence AI, Zhongguancun Academy |
| 공개 | arXiv 2510.25889 (2025-10 최초, v3 2026-01-29), cs.LG |
| 코드 | RLinf 저장소(github.com/RLinf/RLinf), 모델은 Hugging Face RLinf 조직 |
| 분량 | 본문 10쪽, 부록 포함 24쪽 |
| 대상 모델 | π0, π0.5 (부록에서 GR00T N1.5 추가) |

## 2. 주요 기여 (Key Contributions)

- **flow 기반 VLA용 RL**: online RL fine-tuning 프레임워크 πRL을 제안하고, log-likelihood 계산 문제를 Flow-Noise와 Flow-SDE 두 정식화로 해결한다.
- **성능 향상**: 네 벤치마크 모두에서 SFT 기준선을 크게 넘는다. few-shot SFT 모델이 RL을 거쳐 전체 데이터로 SFT한 모델보다 높아진다.
- **포괄적 ablation**: critic 배치와 구조, MDP 정식화, noise 주입 방식, noise level, denoise step, action chunk 크기, RL 알고리즘(PPO와 GRPO), VLM 학습 여부를 분석한다.
- **코드와 모델 공개**: RLinf 코드베이스 위에 전체 구현을 공개한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 문제 설정

과제를 MDP M = (S, A, P0, P_ENV, R_ENV, γ)로 둔다. state는 로봇 observation o_t이고, policy가 a_t ~ π(×|s_t)를 내면 환경이 다음 state와 reward를 준다. 목표는 길이 T+1 horizon에서 γ 할인 return의 기댓값 J(π_θ)를 최대화하는 것이다. policy gradient는 ∇θ log π_θ(a_t|s_t) A(s_t, a_t)의 기댓값으로 근사하므로 **실행한 action의 log-likelihood**가 반드시 필요하다. advantage A(s,a) = Q(s,a) − V(s)는 분산이 낮은 업데이트 신호를 준다.

### 3.2 flow 기반 VLA

flow 기반 VLA는 observation(RGB 영상, 언어 토큰, proprioception)을 받아 H개 미래 action 묶음 A_t = [a_{t,0}, ..., a_{t,H−1}]을 낸다. VLM이 시각과 언어 feature를 뽑고 flow matching action expert가 action을 만든다. 학습은 Conditional Flow Matching(CFM) loss로 예측 vector field v_θ를 정답 vector field u = A_t − ε에 맞춘다. noisy action은 A^τ = τA + (1−τ)ε, τ ∈ [0,1]이다. 추론은 가우시안 noise A^0에서 시작해 forward Euler A^{τ+δ} = A^τ + v_θ×δ를 고정 step 수만큼 반복한다.

### 3.3 기존 VLA-RL의 한계

| 모델 유형 | log-likelihood 계산 방식 | 예 |
|---|---|---|
| 이산 action | 출력 logit에 softmax | OpenVLA (RL4VLA) |
| 연속 action | action을 가우시안으로 보고 분산 예측 head 추가 | OpenVLA-OFT (SimpleVLA-RL) |
| flow 기반 | Hutchinson 추정 같은 정확 likelihood 계산은 denoising step이 적으면 부정확하고, ODE 샘플링이 결정적이라 탐색도 불가능하다 | π0, π0.5 |

### 3.4 Flow-Noise

ReinFlow에서 착안했다. denoising의 각 step 전이를 가우시안 p(A^{τ+δ}|A^τ) ~ N(μ_τ, Σ_τ)로 둔다.

- 평균 μ_τ = A^τ + v^τ×δ (원래 ODE의 Euler 업데이트)
- 분산 Σ_τ = diag(σ²_θ′) (학습형 noise network θ′가 action A^τ와 observation o를 조건으로 출력)
- noise network는 velocity와 함께 학습하고 fine-tuning 후 버린다. 추론 policy는 결정적으로 남는다.
- denoising을 K개 균일 step(δ = 1/K, τ_k = k×δ)으로 이산화하면 전체 denoising 시퀀스의 log 확률은 log π(A|o) = log(π(A^0|o) ∏ π(A^{τ_{k+1}}|A^{τ_k}, o))로 정확히 계산된다.
- 이 결합 log-likelihood를 policy gradient 식에 그대로 대입한다. 환경 step 하나가 MDP step 하나인 **one-layer MDP**다.

### 3.5 Flow-SDE

Flow-GRPO에서 착안했다. 결정적 ODE dA^τ = v^τ dτ를 marginal 분포가 같은 SDE로 바꾼다.

- 일반형: dA^τ = [v^τ − ½ g²(τ) ∇log q_τ(A^τ)] dτ + g(τ) dw. 앞항이 drift, 뒤항이 diffusion이다.
- score function과 velocity의 관계 ∇log q_τ(A^τ) = −A^τ/τ − (1−τ)/τ × v^τ를 대입하고 noise schedule을 σ_τ = a×√(τ/(1−τ))로 둔다. a가 noise level이다.
- 최종식: dA^τ = [v^τ + σ²_τ/(2τ) (A^τ + (1−τ)v^τ)] dτ + σ_τ dw_τ.
- 이산화하면 전이가 등방 가우시안이고 평균은 A^τ + [v^τ + σ²_τ/(2τ)(A^τ + (1−τ)v^τ)]×δ, 분산은 σ²_τ δ×I다.

**two-layer MDP** (DPPO를 따른다):

| 요소 | 정의 |
|---|---|
| state | s̄ = (o_t, A^τ_t), observation과 현재 denoising 중인 action |
| action | τ < 1이면 다음 denoised action A^{τ+δ}, τ = 1이면 환경에서 실행할 A^1 |
| transition | τ < 1이면 observation 고정, action state만 갱신(inner loop). τ = 1이면 환경이 o_{t+1}을 내고 action state를 N(0, I)에서 다시 뽑는다(outer loop) |
| reward | τ < 1이면 0, τ = 1이면 R_ENV(o_t, A^1_t) |

이렇게 하면 log π(a_t|s_t) 추정이 가우시안 전이의 log π(ā|s̄) 계산으로 바뀌어 쉽게 구해진다.

**hybrid ODE-SDE 샘플링**: two-layer MDP는 horizon이 denoising step 수만큼 늘어 학습이 어렵고 비싸다. 그래서 환경 step마다 denoising 시점 τ_t 하나만 무작위로 골라 SDE로 탐색하고 나머지 step은 결정적 ODE로 처리한다(MixGRPO, TempFlow-GRPO 방식). 나머지 ODE step과 환경 전이는 environment wrapper가 실행한다. MDP horizon이 짧아지면서 two-layer 정식화와 이론적 일관성은 유지된다.

### 3.6 policy 최적화

- **알고리즘**: PPO. π 계열은 chunk 단위로 action을 내므로 H개 action 묶음 전체를 하나의 macro-step으로 보고 reward를 chunk 내 reward의 합 R_t = Σ r_{t,j}로 둔다(RLinf-VLA의 chunk-level 정식화).
- **advantage**: GAE, Â_t = Σ (γλ)^k T_{t+k}, TD-error T_t = R_t + γV(s_{t+1}) − V(s_t).
- **목적함수**: clip 함수로 확률비 ρ_t(θ)를 [1−ε, 1+ε]로 제한한다. 확률비는 Flow-Noise에서 π(a_t|s_t)의 비, Flow-SDE에서 π(ā|s̄)의 비다.

### 3.7 critic 설계

actor와 critic이 backbone을 공유하는 구조로 메모리를 아낀다. 두 모델은 proprioception state를 넣는 위치가 다르다.

| 모델 | state 입력 위치 | critic 위치 | value 계산 |
|---|---|---|---|
| π0.5 | VLM 프롬프트 embedding에 합침 | VLM 출력에 부착(V_vlm) | V_vlm(o_t) |
| π0 | action expert 입력 | action expert 뒤(V_expert) | noisy action A^τ도 입력되므로 denoising 경로 전체에 대해 평균: V_expert(o_t) ≈ E_{τ~U[0,1]}[V_expert(o_t, A^τ_t)] |

### 3.8 구현 세부 (부록 B)

- SFT 단계에서는 공식 설정대로 3.3B 전체 모델을 fine-tuning한다.
- RL 단계에서는 VLM을 고정하고 300M action expert만 학습한다. GPU 메모리 효율과 "RL은 action 일반화에 더 크게 기여한다"는 RL4VLA 발견이 근거다.
- RLinf 코드베이스에서 환경, rollout 모델, actor 모델을 같은 GPU에 두고 직렬로 실행하는 공유 co-located 배치를 쓴다.
- openpi 공식 설정을 따라 π0는 영상, 언어, proprioception을 입력받고 π0.5는 state를 생략한다.
- 실험은 NVIDIA H100 80GB GPU 8장에서 수행했다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 벤치마크 구성

| 벤치마크 | 초점 | SFT 데이터 | RL reward |
|---|---|---|---|
| LIBERO | 과제 조합 변형과 지식 전이. Spatial, Object, Goal, Long 네 묶음, 묶음당 subtask 10개 | few-shot. π0는 1,692개 중 58개 trajectory(Long은 208개), π0.5는 40개로 통합 checkpoint | 성공 1, 실패 0 |
| ManiSkill | 대규모 환경 다양성에서 인식과 실행 견고성. 물체 16종, 받침 17종, 테이블 장면 16종으로 4,352개 집어 놓기 조합 | MPLib motion planner로 합성한 16,384 episode, 끝에 15프레임 추가 | 올바른 배치 1.0, 그리퍼와 물체 부착 보조 0.1 |
| CALVIN | 긴 연쇄 과제와 언어 grounding. episode당 무작위 subtask 5개를 리셋 없이 연속 수행 | ABC 데이터(약 24시간 play data, 2만 개 이상 언어 라벨 trajectory, 과제 34종) | subtask마다 성공 1.0 |
| MetaWorld | 기술 폭과 다과제 범용성. manipulation primitive 50종 | 공식 MT50 데이터 2,500 trajectory | 성공 1, 실패 0 |

### 4.2 ID 종합 결과 (Table 1, 성공률 %)

| 모델 | 방법 | LIBERO | ManiSkill | MetaWorld | CALVIN | 평균 | 평균 차이 |
|---|---|---|---|---|---|---|---|
| π0 | SFT | 57.6 | 38.4 | 50.8 | 57.5 | 51.1 | - |
| π0 | Flow-SDE | 96.1 | 78.8 | 78.1 | 61.7 | 78.7 | +27.6 |
| π0 | Flow-Noise | 97.6 | 77.8 | 85.8 | 59.9 | 80.3 | +29.2 |
| π0.5 | SFT | 77.1 | 40.1 | 43.8 | 61.3 | 55.6 | - |
| π0.5 | Flow-SDE | 97.9 | 90.9 | 70.7 | 87.0 | 86.6 | +31.0 |
| π0.5 | Flow-Noise | 98.3 | 89.7 | 66.1 | 84.5 | 84.7 | +29.1 |

CALVIN 열은 Len-5 성공률이다.

### 4.3 LIBERO (Table 3)

| 모델 | Spatial | Object | Goal | Long | 평균 |
|---|---|---|---|---|---|
| Octo (전체 SFT) | 78.9 | 85.7 | 84.6 | 51.1 | 75.1 |
| OpenVLA (전체 SFT) | 84.7 | 88.4 | 79.2 | 53.7 | 76.5 |
| π_fast (전체 SFT) | 96.4 | 96.8 | 88.6 | 60.2 | 85.5 |
| OpenVLA-OFT (전체 SFT) | 91.6 | 95.3 | 90.6 | 86.5 | 91.0 |
| π0 (전체 SFT) | 96.8 | 98.8 | 95.8 | 85.2 | 94.2 |
| π0.5 (전체 SFT) | 98.8 | 98.2 | 98.0 | 92.4 | 96.9 |
| π0 few-shot SFT | 65.3 | 64.4 | 49.8 | 51.2 | 57.6 |
| π0 + Flow-SDE | 98.4 | 99.4 | 96.2 | 90.2 | 96.1 (+38.5) |
| π0 + Flow-Noise | 99.0 | 99.2 | 98.2 | 93.8 | 97.6 (+40.0) |
| π0.5 few-shot SFT | 84.6 | 95.4 | 84.6 | 43.9 | 77.1 |
| π0.5 + Flow-SDE | 99.6 | 100 | 98.8 | 93.0 | 97.9 (+20.8) |
| π0.5 + Flow-Noise | 99.6 | 100 | 99.6 | 94.0 | 98.3 (+21.2) |

- 평가는 묶음당 500개 초기 state(subtask 10개 × state 50개)의 성공률이다.
- π0 few-shot SFT는 57.6%에 그치지만 RL 후 96.1%와 97.6%로 전체 데이터 π0 SFT(94.2%)를 넘는다.
- π0.5 few-shot SFT는 평균 77.1%지만 Long이 43.9%로 낮다. RL로 Long이 94.0%가 되어 50.1%p 오른다. 저자들은 단일 trajectory SFT로도 최종 98.3%에 도달해 전체 데이터 SFT 96.9%를 넘었다고 서술한다(Figure 1의 one-shot SFT 43.9%에서 SFT+RL 94.0% 곡선).

### 4.4 ManiSkill (Table 4, Table 7)

| 모델 | 방법 | IND | Vision | Semantic | Execution | OOD 평균 |
|---|---|---|---|---|---|---|
| π0 | SFT | 38.4 | 32.6 | 8.4 | 13.2 | 18.1 |
| π0 | Flow-SDE | 78.8 (+40.4) | 61.1 | 25.4 | 31.5 | 39.3 (+21.2) |
| π0 | Flow-Noise | 77.8 (+39.4) | 63.4 | 23.1 | 24.2 | 36.9 (+18.8) |
| π0.5 | SFT | 40.1 | 40.2 | 16.6 | 22.4 | 26.4 |
| π0.5 | Flow-SDE | 90.9 (+50.8) | 68.0 | 34.5 | 45.4 | 49.3 (+22.9) |
| π0.5 | Flow-Noise | 89.7 (+49.6) | 69.9 | 35.5 | 54.9 | 53.4 (+27.0) |

Table 7 세부 OOD 환경(π0-SFT / π0 Flow-SDE / π0 Flow-Noise / π0.5-SFT / π0.5 Flow-SDE / π0.5 Flow-Noise):

| 묶음 | 환경 | 값 |
|---|---|---|
| ID | Main-v3-train | 38.4 / 78.8 / 77.8 / 40.1 / 90.9 / 89.7 |
| 시각 언어 변형 | Instruct-v1-test | 30.1 / 64.6 / 66.5 / 46.6 / 77.0 / 85.7 |
| 시각 언어 변형 | VisionImage-v1-test | 38.3 / 68.8 / 71.7 / 46.2 / 78.8 / 83.1 |
| 시각 언어 변형 | VisionTexture03-v1-test | 35.1 / 66.0 / 66.8 / 36.7 / 69.6 / 75.0 |
| 시각 언어 변형 | VisionTexture05-v1-test | 31.0 / 55.8 / 60.5 / 32.7 / 58.0 / 62.2 |
| 시각 언어 변형 | VisionWhole03-v1-test | 35.4 / 62.4 / 69.0 / 40.1 / 69.6 / 71.6 |
| 시각 언어 변형 | VisionWhole05-v1-test | 28.5 / 49.0 / 53.9 / 30.7 / 55.0 / 57.0 |
| 의미 추론 | MultiCarrot-v1-test | 7.8 / 28.2 / 23.0 / 16.7 / 36.8 / 38.2 |
| 의미 추론 | MultiCarrot-v1-train | 12.5 / 36.5 / 31.8 / 28.2 / 49.5 / 50.1 |
| 의미 추론 | MultiPlate-v1-test | 5.0 / 16.4 / 18.3 / 11.8 / 29.4 / 28.3 |
| 의미 추론 | MultiPlate-v1-train | 7.3 / 20.5 / 19.6 / 9.7 / 22.3 / 25.4 |
| action 실행 | PositionChangeTo-v1-test | 9.6 / 17.4 / 10.9 / 13.5 / 36.2 / 54.7 |
| action 실행 | Position-v1-test | 16.9 / 45.6 / 37.5 / 31.2 / 54.5 / 55.0 |

- OOD 세 범주: Vision(새 배경과 질감), Semantics(처음 보는 물체, 다양한 지시문(instruction), 여분의 물체와 받침 같은 교란 요소), Execution(초기 state 변화, 처음 보는 로봇 자세, 동적 교란).
- π0-SFT는 시각 일반화가 강하다(VLM 기반 덕분으로 해석). 반면 의미 성능은 크게 떨어지고, π0.5에서는 하락이 덜하다(pre-trained π0.5의 지식 일반화로 추정).
- action 실행에서 π0가 π0.5보다 크게 떨어진다. 저자들은 π0가 관절 각도 state를 입력받아 제어에 과적합했기 때문이라고 가설을 세운다.
- 절대 향상폭은 OOD가 작지만 상대 향상은 비슷하다. π0.5 Flow-SDE는 IND를 126.7%, OOD를 102.3% 상대 향상시킨다. 저자들은 이를 일반화된 action 표현 학습의 근거로 본다.
- Vision OOD 상대 향상은 73.9%로 IND의 126.7%보다 낮다. RL 중 VLM을 고정해 새 질감과 배경에 시각 grounding feature를 적응시키지 못했기 때문으로 추정한다.

### 4.5 CALVIN (Table 5, Scene D, 1,000 episode)

| 모델 | 방법 | Len-1 | Len-2 | Len-3 | Len-4 | Len-5 | 평균 완료 수 |
|---|---|---|---|---|---|---|---|
| π0 | SFT | 94.7 | 84.9 | 74.3 | 65.2 | 57.5 | 3.766 |
| π0 | Flow-SDE | 96.4 | 88.0 | 77.5 | 70.8 | 61.7 | 3.944 (+0.178) |
| π0 | Flow-Noise | 96.9 | 88.8 | 78.0 | 68.3 | 59.9 | 3.919 (+0.153) |
| π0.5 | SFT | 92.7 | 84.3 | 76.7 | 68.8 | 61.3 | 3.838 |
| π0.5 | Flow-SDE | 99.7 | 98.2 | 95.8 | 91.0 | 87.0 | 4.717 (+0.879) |
| π0.5 | Flow-Noise | 99.6 | 97.6 | 93.9 | 89.6 | 84.5 | 4.652 (+0.814) |

SFT는 연속 과제에서 오차가 누적되어 어려움을 겪는다. π0.5 Flow-SDE의 SFT 대비 향상은 Len-1에서 7.0%p, Len-5에서 25.7%p로 연쇄가 길수록 커진다.

### 4.6 MetaWorld MT50 (Table 6)

| 방법 | Easy | Medium | Hard | Very Hard | 평균 |
|---|---|---|---|---|---|
| Diffusion Policy | 23.1 | 10.7 | 1.9 | 6.1 | 10.5 |
| TinyVLA | 77.6 | 21.5 | 11.4 | 15.8 | 31.6 |
| SmolVLA | 87.1 | 51.8 | 70.0 | 64.0 | 68.2 |
| π0 SFT | 77.9 | 51.8 | 53.3 | 20.0 | 50.8 |
| π0 Flow-SDE | 92.1 | 74.6 | 61.7 | 84.0 | 78.1 (+27.3) |
| π0 Flow-Noise | 91.1 | 81.8 | 78.3 | 92.0 | 85.8 (+35.0) |
| π0.5 SFT | 68.2 | 37.3 | 41.7 | 28.0 | 43.8 |
| π0.5 Flow-SDE | 86.4 | 55.5 | 75.0 | 66.0 | 70.7 (+26.9) |
| π0.5 Flow-Noise | 86.8 | 58.1 | 63.3 | 56.0 | 66.1 (+22.3) |

SmolVLA의 난이도 분류를 따라 50개 과제를 네 범주로 나눴다.

### 4.7 OOD 평가 요약 (Figure 5, 부록 D)

- **CALVIN ABC→D**: ABC 환경에서 학습하고 시각 질감, 조명, 공간 배치가 다른 Scene D에서 zero-shot 평가한다. RL policy가 79.1%로 SFT 61.3%보다 17.8%p 높다.
- **MetaWorld ML45**: 45개 과제로 학습하고 처음 보는 5개 과제로 평가한다. ID 성공률은 꾸준히 오르지만 OOD 성능은 학습 내내 진동한다. 즉 RL은 과제 간 일반화를 안정적으로 키우지 못한다. 다만 SFT에서 얻은 OOD 능력은 RL 중에도 유지되어 catastrophic forgetting이 일어나지 않는다.
- 저자들의 결론: RL은 비슷한 과제와 저수준 변화(시각, 실행)에 대한 견고성은 높이지만 완전히 새로운 과제 목표로는 일반화하지 못한다. RL의 이득은 action 수준 정제에 국한된다.

### 4.8 단일 과제 사례 (부록 E)

**SIMPLER** (8-DoF WidowX-250S 팔, 과제당 시연 데이터(demonstration) 144 episode로 SFT, Flow-Noise):

| 모델 | Carrot | Eggplant | Spoon | Cube | 평균 |
|---|---|---|---|---|---|
| π0 SFT | 82.7 | 87.5 | 61.7 | 37.1 | 67.2 |
| π0 + RL | 95.7 | 96.7 | 91.6 | 63.0 | 86.7 (+19.5) |
| π0.5 SFT | 70.6 | 91.9 | 43.5 | 31.0 | 59.2 |
| π0.5 + RL | 82.0 | 98.2 | 82.8 | 53.3 | 79.1 (+19.9) |

**Real2Sim2Real**: 강체 동역학은 ManiSkill, 사실적 렌더링은 3D Gaussian Splatting으로 만든 고충실도 시뮬레이터를 쓴다. 하드웨어는 Franka Panda 팔과 Intel RealSense D435 카메라다. 시뮬레이터 시점을 실제 카메라에 맞춰 extrinsic을 수동 보정했다. motion planner로 모은 전문가 trajectory 20개로 few-shot SFT한 뒤 RL 100 iteration을 돌리고 실제 환경에 zero-shot 배포했다. SFT 기준선은 과제를 완료하지 못했고 RL policy는 40% 성공률을 기록했다.

### 4.9 ablation (Flow-SDE 기준)

**critic 배치와 구조 (Figure 6, π0, LIBERO-Long)**: V_vlm이 proprioception을 입력받지 않는데도 성능이 약간 높고 value loss가 낮으며 explained variance가 높다. V_vlm은 observation에서 value로 직접 매핑하지만 V_expert는 state와 noisy action이 결합된 입력 때문에 최적화가 어렵기 때문으로 해석한다. 그래도 value function 개념에 맞추기 위해 π0에는 V_expert를 유지한다. V_expert는 4층 MLP가 1층 MLP(action expert의 action projection 구조)보다 value 근사가 정확해 성능과 안정성이 좋다.

**MDP 정식화 (Figure 7, π0, LIBERO-Goal, 같은 고정 noise)**: one-layer가 가장 빨리 수렴하지만 최종 성공률은 셋이 비슷하다. update 시간은 two-layer 814.2초, hybrid two-layer 428.6초, one-layer 821.4초다. hybrid는 MDP chain이 짧아 약 2배 빠르다. one-layer는 log-likelihood 추정을 위해 denoising 경로 전체를 다시 계산해야 하므로 wall-clock 이점이 없다.

**noise 주입 방식 (Figure 8, π0, LIBERO-Long)**: 고정 noise 0.5와 학습형 noise(log-variance 하한 0.08, 상한 0.16, entropy bonus 0)를 비교했다. step 0 학습 성능이 비슷해 noise 크기가 비슷하고, 수렴 성능도 둘 다 좋다.

**하이퍼파라미터 (Table 2, π0, LIBERO-Spatial, RL 100 step 후)**:

| 단계 | noise 0.2 | noise 0.5 | noise 0.8 | step 1 | step 2 | step 4 | step 8 | chunk 5 | chunk 10 | chunk 20 |
|---|---|---|---|---|---|---|---|---|---|---|
| SFT 학습 | 62.3 | 56.0 | 46.6 | 9.4 | 28.3 | 56.1 | 62.6 | 56.0 | 60.7 | 70.3 |
| SFT 평가 | 65.2 | 65.2 | 65.2 | 63.8 | 64.9 | 65.2 | 63.2 | 65.2 | 70.5 | 72.6 |
| RL 학습 | 59.5 | 93.5 | 95.3 | 73.8 | 90.8 | 93.5 | 84.3 | 93.5 | 93.3 | 87.5 |
| RL 평가 | 73.1 | 94.5 | 98.1 | 88.5 | 97.0 | 94.5 | 86.7 | 94.5 | 95.5 | 89.2 |

학습은 확률적 rollout 단계, 평가는 결정적 평가 단계의 성공률이다.

- **noise level a**: SFT 평가는 결정적 ODE라 noise와 무관하게 65.2%로 같다. SFT 학습 성능은 noise가 클수록 떨어진다(flow 경로가 왜곡되어 marginal action 분포 추정이 부정확해진다). RL에서는 낮은 noise가 탐색으로 인한 성능 하락을 줄이지만 RL 개선 여지도 줄인다. a = 0.2는 clipped fraction이 크게 높아 불안정한데, 낮은 noise에서 gradient 크기가 커지기 때문으로 본다(Figure 9).
- **denoise step K**: 평가 성능은 비슷하게 시작하지만 K = 1이면 학습 성공률이 9.4%로 크게 떨어진다. ODE에서 SDE로의 이산화 오차가 크다는 뜻이다. K가 크면 rollout 성능은 좋아지지만 학습 복잡도와 계산량이 늘어난다(Figure 10).
- **action chunk**: chunk가 크면 SFT 성능은 약간 좋지만 policy와 환경의 상호작용 빈도가 줄고 reward credit 할당이 흐려져 explained variance가 떨어진다. 결과적으로 RL 개선 상한이 낮아진다(Figure 11).

**RL 알고리즘 (Table 9, LIBERO)**:

| 모델 | Spatial | Object | Goal | Long | 평균 |
|---|---|---|---|---|---|
| π0 SFT | 65.3 | 64.4 | 49.8 | 51.2 | 57.6 |
| π0 + GRPO | 97.8 | 97.8 | 83.2 | 81.4 | 90.0 (+32.4) |
| π0 + PPO | 98.4 | 99.4 | 96.2 | 90.2 | 96.0 (+38.4) |
| π0.5 SFT | 84.6 | 95.4 | 84.6 | 43.9 | 77.1 |
| π0.5 + GRPO | 97.4 | 99.8 | 91.2 | 77.6 | 91.5 (+14.4) |
| π0.5 + PPO | 99.6 | 100 | 98.8 | 93.0 | 97.9 (+20.8) |

PPO가 두 모델 모두에서 GRPO보다 높다. 저자들은 rollout 성공에 맞춘 파라미터가 학습 안정성을 해쳐 RL 성능 상한을 제한할 수 있으므로 신중한 튜닝이 필요하다고 정리한다.

**VLM 학습 여부 (Figure 13, π0 Flow-SDE, LIBERO-Long)**: VLM에 LoRA(rank 32, α 32)를 적용해 action expert와 함께 학습했다. 설정은 VLM 고정(lr 5e-6, epoch당 업데이트 4회), LoRA-I(5e-6, 4회), LoRA-II(1e-6, 2회)다. LoRA-II가 고정 기준과 비슷한 곡선을 보인다. 즉 LIBERO에서 VLM fine-tuning 이득은 뚜렷하지 않고(장면 변화가 적어 pre-training된 VLM 표현으로 충분하다고 추정), VLM을 함께 학습하려면 더 보수적인 최적화 설정이 필요하다.

### 4.10 대규모 RL 학습에서 얻은 경험 (부록 G)

- SFT checkpoint의 학습(확률적) 성능과 평가(결정적) 성능 차이가 크면 noise를 줄이거나 denoising step을 늘린다. noise가 낮으면 gradient가 커지므로 learning rate를 낮춘다.
- 학습 성능은 오르는데 평가 성능이 진동하면 denoising step을 늘린다. 결정적 생성과 확률적 생성의 action 분포 차이가 줄어든다.
- long-horizon 과제는 큰 chunk가 유리하다. LIBERO-Long은 chunk 10, 나머지는 5를 썼다.
- π0.5 LIBERO-Long 학습에서 KL divergence가 계속 증가해 불안정해졌고, cosine annealing learning rate scheduler로 막았다(Figure 14).
- ManiSkill에서는 평가 성능이 초반에 하락했다가 회복한다. critic warm-up 동안 부정확한 신호 때문이며, explained variance가 오르며 회복한다(Figure 15).
- ManiSkill π0.5의 episode 길이가 RL 후 전문가 범위(34.5±2.6 step)로 수렴한다(Figure 16). RL이 실패에서 회복하는 오류 수정 능력을 키우고, partial reset 메커니즘이 할인 reward를 통해 빠른 완료를 유도하기 때문으로 본다(빨리 끝내면 update 주기 안에 더 많은 reset과 reward를 얻는다).

### 4.11 GR00T N1.5 적용 (부록 H)

GR00T N1.5는 Eagle 2.5 VLM과 action denoising용 DiT head를 결합한 humanoid용 foundation model이다. critic을 action head와 결합해 denoising 경로 전체에서 value를 추정한다. RL 단계에서는 VLM을 고정하고 action expert만 학습한다. expert 모델의 dropout을 identity layer로 바꾼 점이 핵심이다. dropout이 policy에 비결정적 교란을 넣어 확률비 분자가 dropout mask에 따라 바뀌는 불안정한 형태가 되고, 매 step policy 업데이트와 겹쳐 수렴을 크게 해친다. 하이퍼파라미터는 π0와 같고 Flow-SDE를 쓴다.

| 모델 | Spatial | Object | Goal | Long | 평균 |
|---|---|---|---|---|---|
| GR00T few-shot SFT | 41.4 | 58.6 | 48.2 | 61.9 | 52.5 |
| + PPO (Flow-SDE) | 92.5 | 96.2 | 84.3 | 86.6 | 89.9 (+37.4) |

### 4.12 주요 하이퍼파라미터 (Table 11~13)

| 항목 | LIBERO | SIMPLER, ManiSkill | MetaWorld, CALVIN |
|---|---|---|---|
| global batch | 2,048 | 2,560 (ManiSkill 5,120) | 2,048 |
| actor lr | 5e-6 | 5.6e-6 (ManiSkill 7.91e-6) | 5e-6 (MetaWorld π0 1e-5) |
| critic lr | 1e-4 | 1.1e-4 (ManiSkill 1.55e-4) | 1e-4 |
| γ, GAE λ, clip ε | 0.99, 0.95, 0.2 | 0.99, 0.95, 0.2 | 0.99, 0.95, 0.2 |
| 병렬 환경 | 64 | 256 (ManiSkill 320) | 64 |
| action 예측 horizon H | π0 50, π0.5 10 | 8 | 5 |
| replan horizon H′ | 5 (Long 10) | 5 | 5 |
| denoise step | π0 4, π0.5 3~5 | 4 | 5 |
| Flow-SDE noise level | 0.5 (π0.5 Object, Goal 0.3) | 0.5 | 0.5 |
| Flow-Noise log-var 범위 | π0 0.08~0.16, π0.5 0.04~0.10 | 같음 | MetaWorld 0.04~0.10, CALVIN 0.08~0.16 |
| entropy bonus (Flow-Noise) | 0.005 | 0.005 | 0.005 |

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **실세계 학습 불가**: online RL의 샘플 효율이 낮아 현재는 sim-to-real 배포에 의존한다. 실세계에서 직접 RL 학습이 가능한 효율적 알고리즘이 과제다.
- **noise 주입**: ODE에서 SDE로 바꿀 때 성능이 떨어진다. Flow-CPS(coefficients-preserving sampling)를 시도해 ODE-SDE 정밀도 오차는 줄었지만 RL 개선은 제한적이었다. action 분포를 흐트러뜨리지 않는 SDE 변환에 개선 여지가 크다고 본다.
- **학습 가속**: 현재 hybrid ODE-SDE rollout은 denoising step 하나만 무작위로 SDE로 두는 단순한 방식이다. flow 기반 영상 생성 가속 연구(MixGRPO, TempFlow-GRPO, Flow-GRPO, BranchGRPO)를 적용할 여지가 있다.
- **일반화**: ManiSkill OOD에서 SFT와 RL 모두 의미 일반화가 제한적이다. 더 다양한 과제 분포와 지시문으로 RL 학습해 과제 간 적응성을 높이는 것이 향후 과제다.
- **과제 간 일반화**: MetaWorld ML45에서 처음 보는 과제에 대한 OOD 성능은 개선되지 않았다.

## 6. 관련 연구 (Related Work)

- **VLA**: Octo, RT 계열, OpenVLA, OpenVLA-OFT, π0, π0.5, GR00T.
- **VLA online RL fine-tuning**: SimpleVLA-RL(OpenVLA-OFT와 GRPO로 데이터 부족 상황의 long-horizon 계획 개선), RL4VLA(PPO, GRPO, DPO를 단계별 sparse reward로 비교), RLinf-VLA(확장 가능한 VLA RL 학습 통합 프레임워크).
- **flow 모델 RL fine-tuning**: Flow-GRPO(ODE를 등가 SDE로 바꿔 확률적 탐색), MixGRPO와 TempFlow-GRPO(hybrid ODE-SDE rollout으로 가속), ReinFlow(flow 경로에 학습형 noise를 넣어 likelihood 계산이 가능한 이산 Markov 과정으로 변환), FPO(policy 최적화를 advantage 가중 conditional flow matching loss 비율 최대화로 재구성), DPPO(denoising과 환경 상호작용을 결합한 two-layer MDP).

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| πRL | flow 기반 VLA를 online RL로 fine-tuning하는 프레임워크. RLinf 위에 구현된다 |
| Flow-Noise | 학습형 noise network로 denoising 각 step을 가우시안 전이로 만들어 denoising 전체의 결합 log-likelihood를 정확히 계산하는 one-layer MDP 정식화 |
| Flow-SDE | flow matching의 결정적 ODE를 marginal이 같은 SDE로 바꾸고 denoising과 환경 상호작용을 two-layer MDP로 결합한 정식화 |
| two-layer MDP | denoising step을 inner MDP, 환경 step을 outer MDP로 두어 action state와 observation을 함께 state로 쓰는 구조 |
| hybrid ODE-SDE 샘플링 | 환경 step마다 denoising 시점 하나만 SDE로 탐색하고 나머지를 ODE로 처리해 MDP horizon을 줄이는 rollout 방식 |
| noise level a | Flow-SDE의 noise schedule σ_τ = a×√(τ/(1−τ))에서 주입 noise 크기를 정하는 계수 |
| V_vlm, V_expert | VLM 출력에 붙인 critic과 action expert 뒤에 붙인 critic. 후자는 denoising 시점에 대해 value를 평균한다 |
| chunk-level 정식화 | action chunk 전체를 하나의 macro-step으로 보고 chunk 내 reward 합을 reward로 쓰는 방식 |
| explained variance | critic의 value 예측이 실제 return 분산을 얼마나 설명하는지 나타내는 지표. 높을수록 advantage 추정이 믿을 만하다 |
| Real2Sim2Real | 실제 장면을 Gaussian Splatting 등으로 시뮬레이터에 옮겨 학습한 뒤 다시 실제 로봇에 배포하는 방식 |

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 1 | "πRL 개요와 학습 패러다임, 주요 결과" | caption-region | ★ wiki 권장 (overview) |
| fig02 | 4 | "πRL의 noise 주입 위치" | caption-region | ★ wiki 권장 (architecture) |
| fig03 | 4 | "one-layer MDP와 two-layer MDP" | caption-region | ★ wiki 권장 (method) |
| fig04 | 6 | "critic 배치 두 가지" | caption-region | ★ wiki 권장 (method) |
| fig05 | 7 | "CALVIN, ManiSkill, MetaWorld OOD 평가" | caption-region | ★ wiki 권장 (result) |
| fig06 | 8 | "critic 설계 ablation" | caption-region | (보관) |
| fig07 | 8 | "MDP 정식화 비교와 update 시간" | caption-region | ★ wiki 권장 (ablation) |
| fig08 | 8 | "고정 noise와 학습형 noise 비교" | caption-region | (보관) |
| fig09 | 9 | "noise level ablation" | caption-region | (보관) |
| fig10 | 9 | "denoise step ablation" | caption-region | (보관) |
| fig11 | 9 | "action chunk 크기 ablation" | caption-region | (보관) |
| fig12 | 17 | "실제 Franka 로봇 배포 장면" | caption-region | (보관) |
| fig13 | 19 | "RL 중 VLM 학습 여부 ablation" | caption-region | (보관) |
| fig14 | 19 | "learning rate scheduler ablation" | caption-region | (보관) |
| fig15 | 20 | "ManiSkill 학습 곡선" | caption-region | (보관) |
| fig16 | 20 | "ManiSkill episode 길이 변화" | caption-region | (보관) |
| fig17 | 21 | "GR00T N1.5 적용 구조" | caption-region | (보관) |
| tab01 | 7 | "네 벤치마크 ID 성능 종합" | manual | ★ wiki 권장 (result) |
| tab02 | 9 | "하이퍼파라미터 ablation" | table-region | ★ wiki 권장 (ablation) |
| tab03 | 14 | "LIBERO 결과" | table-region | (보관) |
| tab04 | 14 | "ManiSkill IND와 OOD 결과" | table-region | (보관) |
| tab05 | 15 | "CALVIN 결과" | table-region | (보관) |
| tab06 | 15 | "MetaWorld MT50 결과" | table-region | (보관) |
| tab07 | 16 | "ManiSkill OOD 세부 결과" | table-region | (보관) |
| tab08 | 17 | "SIMPLER 결과" | table-region | (보관) |
| tab09 | 18 | "PPO와 GRPO 비교" | table-region | (보관) |
| tab10 | 21 | "GR00T N1.5 결과" | table-region | (보관) |
| tab11 | 23 | "LIBERO 하이퍼파라미터" | table-region | (보관) |
| tab12 | 23 | "SIMPLER와 ManiSkill 하이퍼파라미터" | table-region | (보관) |
| tab13 | 24 | "MetaWorld와 CALVIN 하이퍼파라미터" | table-region | (보관) |
