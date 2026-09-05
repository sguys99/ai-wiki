---
title: "Flow Matching for Generative Modeling"
type: paper
year: 2022
category: llms
raw_path: raw/papers/lipman-2022-flow-matching-for-generative-modeling.pdf
raw_filename: "lipman-2022-flow-matching-for-generative-modeling.pdf"
source_collection: external
source: lipman-2022-flow-matching-for-generative-modeling.md
authors: "Yaron Lipman, Ricky T. Q. Chen, Heli Ben-Hamu, Maximilian Nickel, Matt Le"
arxiv_id: "2210.02747"
tags: [flow-matching, generative-model, cnf, diffusion, optimal-transport, ode]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/lipman-2022-flow-matching-for-generative-modeling/fig01.png
    raw: raw/papers/lipman-2022-flow-matching-for-generative-modeling-figures/fig01.png
    caption: "Flow Matching + OT path로 학습한 CNF의 무조건 ImageNet-128 샘플"
    page: 1
    bbox_norm: [0.1667, 0.6478, 0.8301, 0.8834]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/lipman-2022-flow-matching-for-generative-modeling/fig02.png
    raw: raw/papers/lipman-2022-flow-matching-for-generative-modeling-figures/fig02.png
    caption: "diffusion path의 conditional score function vs OT path의 conditional vector field — OT는 시간에 대해 방향이 일정"
    page: 6
    bbox_norm: [0.1667, 0.0958, 0.8283, 0.1883]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/lipman-2022-flow-matching-for-generative-modeling/fig03.png
    raw: raw/papers/lipman-2022-flow-matching-for-generative-modeling-figures/fig03.png
    caption: "diffusion 궤적(굽은 경로)과 OT 궤적(직선) 비교"
    page: 6
    bbox_norm: [0.1667, 0.4311, 0.8368, 0.5753]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/lipman-2022-flow-matching-for-generative-modeling/fig04.png
    raw: raw/papers/lipman-2022-flow-matching-for-generative-modeling-figures/fig04.png
    caption: "2D checkerboard에서 세 학습 방법의 밀도 궤적(좌)과 저-NFE 샘플링 품질(우)"
    page: 7
    bbox_norm: [0.1691, 0.0958, 0.8281, 0.2473]
    strategy: caption-region
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/lipman-2022-flow-matching-for-generative-modeling/fig05.png
    raw: raw/papers/lipman-2022-flow-matching-for-generative-modeling-figures/fig05.png
    caption: "ImageNet 64×64 학습 중 FID 곡선 — FM-OT가 더 빠르게 하락"
    page: 8
    bbox_norm: [0.5709, 0.6668, 0.8497, 0.7968]
    strategy: column-band
    low_confidence: true
    curated: false
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/lipman-2022-flow-matching-for-generative-modeling/fig06.png
    raw: raw/papers/lipman-2022-flow-matching-for-generative-modeling-figures/fig06.png
    caption: "같은 초기 noise에서 ImageNet 64×64 샘플 경로 — OT는 noise를 선형으로 제거"
    page: 8
    bbox_norm: [0.1755, 0.2515, 0.8245, 0.3389]
    strategy: caption-region
    curated: false
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/lipman-2022-flow-matching-for-generative-modeling/fig07.png
    raw: raw/papers/lipman-2022-flow-matching-for-generative-modeling-figures/fig07.png
    caption: "NFE 대비 수치 오차(좌)와 sample 품질(우) — FM-OT가 적은 NFE로 동일 품질"
    page: 9
    bbox_norm: [0.1808, 0.0954, 0.8192, 0.1934]
    strategy: caption-region
    curated: true
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/lipman-2022-flow-matching-for-generative-modeling/fig08.png
    raw: raw/papers/lipman-2022-flow-matching-for-generative-modeling-figures/fig08.png
    caption: "VP diffusion path의 conditional vector field 시각화 (Appendix)"
    page: 19
    bbox_norm: [0.317, 0.0957, 0.6779, 0.1946]
    strategy: caption-region
    curated: false
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/lipman-2022-flow-matching-for-generative-modeling/fig09.png
    raw: raw/papers/lipman-2022-flow-matching-for-generative-modeling-figures/fig09.png
    caption: "ScoreFlow로 학습한 CNF의 궤적 (Appendix)"
    page: 19
    bbox_norm: [0.2702, 0.2207, 0.7298, 0.3334]
    strategy: caption-region
    curated: false
  - id: fig10
    label: Figure 10
    kind: figure
    file: assets/lipman-2022-flow-matching-for-generative-modeling/fig10.png
    raw: raw/papers/lipman-2022-flow-matching-for-generative-modeling-figures/fig10.png
    caption: "학습 중 샘플링에 필요한 function evaluation 수 (Appendix)"
    page: 21
    bbox_norm: [0.3166, 0.297, 0.6834, 0.4798]
    strategy: caption-region
    curated: false
  - id: fig11
    label: Figure 11
    kind: figure
    file: assets/lipman-2022-flow-matching-for-generative-modeling/fig11.png
    raw: raw/papers/lipman-2022-flow-matching-for-generative-modeling-figures/fig11.png
    caption: "무조건 ImageNet-32 생성 샘플 그리드 (Appendix)"
    page: 22
    bbox_norm: [0.1667, 0.1105, 0.8333, 0.8742]
    strategy: caption-region
    curated: false
  - id: fig12
    label: Figure 12
    kind: figure
    file: assets/lipman-2022-flow-matching-for-generative-modeling/fig12.png
    raw: raw/papers/lipman-2022-flow-matching-for-generative-modeling-figures/fig12.png
    caption: "무조건 ImageNet-64 생성 샘플 그리드 (Appendix)"
    page: 23
    bbox_norm: [0.1667, 0.1101, 0.8333, 0.8745]
    strategy: caption-region
    curated: false
  - id: fig13
    label: Figure 13
    kind: figure
    file: assets/lipman-2022-flow-matching-for-generative-modeling/fig13.png
    raw: raw/papers/lipman-2022-flow-matching-for-generative-modeling-figures/fig13.png
    caption: "무조건 ImageNet-128 생성 샘플 그리드 (Appendix)"
    page: 24
    bbox_norm: [0.1667, 0.1099, 0.8333, 0.8747]
    strategy: caption-region
    curated: false
  - id: fig14
    label: Figure 14
    kind: figure
    file: assets/lipman-2022-flow-matching-for-generative-modeling/fig14.png
    raw: raw/papers/lipman-2022-flow-matching-for-generative-modeling-figures/fig14.png
    caption: "conditional 생성 64×64 → 256×256 super-resolution 샘플 (Appendix)"
    page: 25
    bbox_norm: [0.1667, 0.0959, 0.8529, 0.8846]
    strategy: caption-region
    curated: false
  - id: fig15
    label: Figure 15
    kind: figure
    file: assets/lipman-2022-flow-matching-for-generative-modeling/fig15.png
    raw: raw/papers/lipman-2022-flow-matching-for-generative-modeling-figures/fig15.png
    caption: "conditional 생성 64×64 → 256×256 super-resolution 샘플 추가 (Appendix)"
    page: 26
    bbox_norm: [0.1667, 0.0959, 0.8529, 0.8846]
    strategy: caption-region
    curated: false
  - id: fig16
    label: Figure 16
    kind: figure
    file: assets/lipman-2022-flow-matching-for-generative-modeling/fig16.png
    raw: raw/papers/lipman-2022-flow-matching-for-generative-modeling-figures/fig16.png
    caption: "같은 초기 noise로 생성한 샘플 비교 (Appendix)"
    page: 27
    bbox_norm: [0.1667, 0.1048, 0.8333, 0.8789]
    strategy: caption-region
    curated: false
  - id: fig17
    label: Figure 17
    kind: figure
    file: assets/lipman-2022-flow-matching-for-generative-modeling/fig17.png
    raw: raw/papers/lipman-2022-flow-matching-for-generative-modeling-figures/fig17.png
    caption: "같은 초기 noise로 생성한 샘플 비교 추가 (Appendix)"
    page: 28
    bbox_norm: [0.1747, 0.0958, 0.8253, 0.8989]
    strategy: caption-region
    curated: false
  - id: tab01
    label: Table 1
    kind: table
    file: assets/lipman-2022-flow-matching-for-generative-modeling/tab01.png
    raw: raw/papers/lipman-2022-flow-matching-for-generative-modeling-figures/tab01.png
    caption: "CIFAR-10·ImageNet 32/64/128의 NLL·FID·NFE 벤치마크"
    page: 8
    bbox_norm: [0.1667, 0.0961, 0.8306, 0.2147]
    strategy: table-region
    curated: true
  - id: tab02
    label: Table 2
    kind: table
    file: assets/lipman-2022-flow-matching-for-generative-modeling/tab02.png
    raw: raw/papers/lipman-2022-flow-matching-for-generative-modeling-figures/tab02.png
    caption: "ImageNet super-resolution(FID·IS·PSNR·SSIM) 비교"
    page: 9
    bbox_norm: [0.5619, 0.5983, 0.8281, 0.6777]
    strategy: table-region
    curated: false
  - id: tab03
    label: Table 3
    kind: table
    file: assets/lipman-2022-flow-matching-for-generative-modeling/tab03.png
    raw: raw/papers/lipman-2022-flow-matching-for-generative-modeling-figures/tab03.png
    caption: "모델별 학습 hyper-parameter (Appendix)"
    page: 20
    bbox_norm: [0.1667, 0.0419, 0.8333, 0.312]
    strategy: table-region
    curated: false
  - id: tab04
    label: Table 4
    kind: table
    file: assets/lipman-2022-flow-matching-for-generative-modeling/tab04.png
    raw: raw/papers/lipman-2022-flow-matching-for-generative-modeling-figures/tab04.png
    caption: "NLL(bits per dimension) 세부 결과 (Appendix)"
    page: 21
    bbox_norm: [0.3735, 0.307, 0.6704, 0.4433]
    strategy: table-region
    curated: false
---

## 요약 (Summary)

Flow Matching(FM)은 continuous normalizing flow를 시뮬레이션 없이 학습하는 방법이다. continuous normalizing flow(CNF)는 신경망으로 시간에 따라 변하는 vector field를 정의하고 그 field를 따라 흐르는 ordinary differential equation(ODE)으로 noise를 데이터 분포로 변형하는 생성 모델이다. vector field는 각 시점·위치에서 입자가 어느 방향으로 얼마나 빠르게 움직일지를 지정하는 함수를 말한다. 기존 CNF는 maximum likelihood로 학습하려면 매 스텝 값비싼 ODE 시뮬레이션이 필요해 고차원으로 확장하기 어려웠다.

FM은 목표 vector field에 신경망을 회귀시키는 단순한 손실로 이 문제를 푼다. 이 틀은 기존 diffusion을 특수 사례로 포함한다. optimal transport(OT) 경로를 쓰면 더 빠른 학습·생성과 더 나은 sample 품질을 얻는다. Flow Matching은 이후 로봇 policy의 action 생성(예: [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation|GR00T N1]]의 flow-matching action head)까지 퍼진 생성 모델링의 기반 기법이다.

![[assets/lipman-2022-flow-matching-for-generative-modeling/fig01.png]]
*Figure 1: Flow Matching + OT path로 학습한 CNF의 무조건 ImageNet-128 샘플 (Lipman 2022, p.1)*

## 주요 기여 (Key Contributions)

FM의 회귀 목표는 그 자체로는 계산할 수 없다. 목표 vector field를 닫힌 형태로 알 수 없기 때문이다. 논문은 데이터 sample 하나에만 의존하는 conditional 구성으로 이를 우회한다.

Conditional Flow Matching(CFM)은 intractable한 marginal field 대신 데이터 sample 하나에 조건부인 vector field를 회귀 목표로 삼는다. 논문은 FM과 CFM의 gradient가 파라미터에 대해 같음을 증명해 sample 단위로 편향 없이 학습할 수 있게 했다. 이는 denoising score matching이 score matching을 대체하는 논리를 vector field로 일반화한다.

평균과 표준편차를 임의의 미분 가능 함수로 두는 일반 Gaussian 경로 족은 기존 diffusion 경로를 특수 사례로 포함한다. 그 안에서 평균과 표준편차를 시간에 대해 선형으로 두면 두 Gaussian 사이 OT displacement에 해당하는 경로가 나온다. 이 OT 경로의 입자는 직선·등속으로 움직여 diffusion 경로보다 회귀 목표가 단순하다.

## 방법론 및 아키텍처 (Methodology and Architecture)

FM 목표는 vector field $u_t$가 목표 probability path $p_t$를 생성한다고 할 때 신경망 $v_t$를 회귀시키는 손실 $\mathcal{L}_{FM}(\theta) = \mathbb{E}_{t, p_t(x)} \lVert v_t(x) - u_t(x) \rVert^2$이다. probability path는 시점 $t$가 0에서 1로 갈 때 noise 분포가 데이터 분포로 이어지는 밀도들의 궤적을 뜻한다. 문제는 $p_t$와 $u_t$의 닫힌 형태를 모른다는 데 있다.

Conditional 구성은 데이터 sample $x_1$마다 conditional path $p_t(x \mid x_1)$를 두어 $t=0$일 때 noise, $t=1$일 때 그 sample 주변에 집중된 분포가 되게 한다. 이들을 데이터 분포로 marginalize하면 marginal path가 나온다. conditional vector field들을 적절히 가중 평균한 marginal field가 이 marginal path를 정확히 생성한다(Theorem 1). CFM 목표 $\mathcal{L}_{CFM}(\theta) = \mathbb{E}_{t, q(x_1), p_t(x \mid x_1)} \lVert v_t(x) - u_t(x \mid x_1) \rVert^2$는 이 conditional field만 회귀 목표로 삼아 sample 단위로 쉽게 추정된다. FM과 CFM의 gradient가 같으므로 CFM만 최소화해도 원래 목표를 최적화한다.

conditional path가 Gaussian이면 그것을 생성하는 유일한 field가 닫힌 형태로 주어진다(Theorem 3). 여기서 평균과 표준편차를 diffusion식으로 두면 VE·VP diffusion을 재현하고 선형으로 두면 OT 경로가 된다. diffusion path의 conditional score function은 시간에 따라 방향이 바뀌지만 OT path의 conditional vector field는 방향이 일정해 신경망이 맞히기 쉽다.

![[assets/lipman-2022-flow-matching-for-generative-modeling/fig02.png]]
*Figure 2: diffusion path의 conditional score function(좌)과 OT path의 conditional vector field(우). OT는 시간에 대해 방향이 일정하다 (Lipman 2022, p.6)*

OT 경로의 입자는 직선·등속으로 움직인다. diffusion 경로는 궤적이 굽어 최종 sample을 지나쳤다 되돌아오는 overshoot이 생기는 반면, OT 경로는 직선을 유지한다.

![[assets/lipman-2022-flow-matching-for-generative-modeling/fig03.png]]
*Figure 3: diffusion 궤적(굽은 경로)과 OT 궤적(직선) 비교 (Lipman 2022, p.6)*

샘플링은 noise $x_0 \sim \mathcal{N}(0, I)$에서 시작해 학습된 vector field로 ODE를 풀어 $t$가 0에서 1로 흐르면 sample이 나온다. 기성 ODE solver(Euler·midpoint·RK4)를 그대로 쓴다. NFE는 solver가 한 sample을 만들 때 vector field를 호출한 횟수로, 생성 비용의 척도다.

![[assets/lipman-2022-flow-matching-for-generative-modeling/fig04.png]]
*Figure 4: 2D checkerboard에서 세 학습 방법의 밀도 궤적(좌)과 저-NFE 샘플링 품질(우). FM-OT가 패턴을 더 일찍 형성하고 적은 스텝으로 복원한다 (Lipman 2022, p.7)*

## 결과 (Results)

같은 U-Net 아키텍처를 DDPM·Score Matching·ScoreFlow 손실과 FM 손실로 각각 학습해 비교했다. NLL은 bits per dimension, sample 품질은 FID, 생성 비용은 NFE로 잰다. CIFAR-10과 ImageNet 32·64에서 FM-OT가 세 지표 모두에서 diffusion 계열 baseline을 일관되게 앞선다. ImageNet 128×128에서는 FID 20.9로 여러 GAN baseline을 앞서는 state-of-the-art급 결과다.

![[assets/lipman-2022-flow-matching-for-generative-modeling/tab01.png]]
*Table 1: CIFAR-10·ImageNet 32/64/128의 NLL·FID·NFE 벤치마크. FM-OT가 diffusion baseline 대비 품질은 높고 NFE는 적다 (Lipman 2022, Table 1)*

FM-OT는 학습도 빠르게 수렴한다. ImageNet-128에서 기존 연구가 4.36M iteration을 쓴 반면 FM은 500K iteration으로 학습했다. 샘플링에서도 고정 스텝 solver 기준 diffusion 대비 약 60%의 NFE만으로 같은 수치 오차에 도달하고 매우 낮은 NFE에서도 준수한 FID를 낸다. conditional 생성인 super-resolution(64×64 → 256×256)에서는 SR3보다 FID·IS를 크게 개선하면서 PSNR·SSIM은 비슷한 수준을 유지한다.

![[assets/lipman-2022-flow-matching-for-generative-modeling/fig07.png]]
*Figure 7: NFE 대비 수치 오차(좌)와 sample 품질(우). FM-OT가 적은 NFE로 같은 품질에 도달한다 (Lipman 2022, p.9)*

diffusion 경로에 FM을 써도 score matching보다 안정적이었고 OT 경로로 바꿀 때 추가 이득이 나왔다. 이 결과는 이득의 원천이 목표 함수와 경로 선택이라는 두 축으로 나뉨을 뜻한다.

## 한계 (Limitations)

실험은 이미지 도메인에 한정된다. conditional flow가 OT displacement로 최적이라 해도 marginal vector field가 optimal transport 해라는 뜻은 아니다. 향후 방향으로 isotropic Gaussian을 넘어선 non-isotropic Gaussian이나 더 일반적인 kernel 기반 경로를 제안한다.

## 관련 페이지 (Related Pages)

- [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation]] — flow-matching DiT를 action head로 써 120Hz로 모터 action을 생성한다. Flow Matching이 로봇 policy로 넘어간 대표 사례.
- [[physical-ai/sa-2026-vision-language-action-models-for]] — VLA를 action 생성 메커니즘(autoregressive·flow·diffusion·hybrid)으로 분류한 서베이. 여기서 flow head가 곧 Flow Matching 계열이다.
- [[physical-ai/kawaharazuka-2025-vision-language-action-models-for-robotics]] — VLA 서베이. diffusion policy·flow 기반 action 생성의 계보를 짚는다.
- [[overviews/physical-ai-overview]] — physical-ai 허브. action 생성 head 논의와 연결.
