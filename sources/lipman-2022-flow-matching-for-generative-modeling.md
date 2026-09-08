---
title: "Flow Matching for Generative Modeling"
type: paper
year: 2022
category: llms
raw_path: raw/papers/lipman-2022-flow-matching-for-generative-modeling.pdf
raw_filename: "lipman-2022-flow-matching-for-generative-modeling.pdf"
source_collection: external
authors: "Yaron Lipman, Ricky T. Q. Chen, Heli Ben-Hamu, Maximilian Nickel, Matt Le"
arxiv_id: "2210.02747"
tags: [flow-matching, generative-model, cnf, diffusion, optimal-transport, ode]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/lipman-2022-flow-matching-for-generative-modeling/fig01.png
    raw: raw/papers/lipman-2022-flow-matching-for-generative-modeling-figures/fig01.png
    caption: "FM과 OT 경로로 학습한 CNF의 unconditional ImageNet-128 생성 샘플. 2단 조판 탓에 크롭 왼쪽 절반에 서론 본문이 함께 잘려 들어갔다"
    page: 1
    bbox_norm: [0.1667, 0.6478, 0.8301, 0.8834]
    strategy: caption-region
    curated: false
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/lipman-2022-flow-matching-for-generative-modeling/fig02.png
    raw: raw/papers/lipman-2022-flow-matching-for-generative-modeling-figures/fig02.png
    caption: "diffusion 경로의 conditional score function(왼쪽)과 OT 경로의 conditional vector field(오른쪽)를 t=0, 1/3, 2/3, 1에서 비교. OT 쪽은 시간이 흘러도 방향이 바뀌지 않는다"
    page: 6
    bbox_norm: [0.1667, 0.0958, 0.8283, 0.1883]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/lipman-2022-flow-matching-for-generative-modeling/fig03.png
    raw: raw/papers/lipman-2022-flow-matching-for-generative-modeling-figures/fig03.png
    caption: "diffusion 궤적(굽은 곡선)과 OT 궤적(직선)의 샘플링 경로 비교. 크롭 대부분이 주변 본문 텍스트이고 도식은 오른쪽 아래에 작게 들어 있다"
    page: 6
    bbox_norm: [0.1667, 0.4311, 0.8368, 0.5753]
    strategy: caption-region
    curated: false
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/lipman-2022-flow-matching-for-generative-modeling/fig04.png
    raw: raw/papers/lipman-2022-flow-matching-for-generative-modeling-figures/fig04.png
    caption: "2D checkerboard 데이터에서 SM-diffusion, FM-diffusion, FM-OT의 밀도 경로(왼쪽)와 midpoint solver로 NFE 4, 8, 10, 20에서 뽑은 샘플(오른쪽)"
    page: 7
    bbox_norm: [0.1691, 0.0958, 0.8281, 0.2473]
    strategy: caption-region
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/lipman-2022-flow-matching-for-generative-modeling/fig05.png
    raw: raw/papers/lipman-2022-flow-matching-for-generative-modeling-figures/fig05.png
    caption: "ImageNet 64×64 학습 중 epoch별 FID 곡선. FM-OT가 가장 빠르고 낮게 내려간다. column-band 크롭이라 좌우 여백에 본문 글자 조각이 섞여 있다"
    page: 8
    bbox_norm: [0.5709, 0.6668, 0.8497, 0.7968]
    strategy: column-band
    low_confidence: true
    curated: true
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/lipman-2022-flow-matching-for-generative-modeling/fig06.png
    raw: raw/papers/lipman-2022-flow-matching-for-generative-modeling-figures/fig06.png
    caption: "같은 초기 noise에서 시작한 ImageNet 64×64 샘플 경로. OT 경로는 noise가 거의 선형으로 줄고 diffusion 경로는 끝부분에서야 이미지가 드러난다"
    page: 8
    bbox_norm: [0.1755, 0.2515, 0.8245, 0.3389]
    strategy: caption-region
    curated: true
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/lipman-2022-flow-matching-for-generative-modeling/fig07.png
    raw: raw/papers/lipman-2022-flow-matching-for-generative-modeling-figures/fig07.png
    caption: "ImageNet 32×32 모델의 NFE 대비 ODE 수치 오차(왼쪽)와 Euler, midpoint, RK4 solver별 FID(오른쪽 세 패널)"
    page: 9
    bbox_norm: [0.1808, 0.0954, 0.8192, 0.1934]
    strategy: caption-region
    curated: true
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/lipman-2022-flow-matching-for-generative-modeling/fig08.png
    raw: raw/papers/lipman-2022-flow-matching-for-generative-modeling-figures/fig08.png
    caption: "VP diffusion 경로의 conditional vector field를 t=0, 1/3, 2/3, 1에서 시각화. Figure 2의 OT vector field와 대조용 부록 도식"
    page: 19
    bbox_norm: [0.317, 0.0957, 0.6779, 0.1946]
    strategy: caption-region
    curated: false
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/lipman-2022-flow-matching-for-generative-modeling/fig09.png
    raw: raw/papers/lipman-2022-flow-matching-for-generative-modeling-figures/fig09.png
    caption: "2D checkerboard에서 ScoreFlow 손실과 DDPM 손실로 학습한 CNF의 밀도 경로. Figure 4와 같은 learning rate와 hyper-parameter를 썼다"
    page: 19
    bbox_norm: [0.2702, 0.2207, 0.7298, 0.3334]
    strategy: caption-region
    curated: false
  - id: fig10
    label: Figure 10
    kind: figure
    file: assets/lipman-2022-flow-matching-for-generative-modeling/fig10.png
    raw: raw/papers/lipman-2022-flow-matching-for-generative-modeling-figures/fig10.png
    caption: "CIFAR-10 학습 중 dopri5 solver(tolerance 1e-5)가 샘플 하나에 쓴 NFE의 epoch별 변화. score matching은 크게 요동하고 FM-OT는 일정하다"
    page: 21
    bbox_norm: [0.3166, 0.297, 0.6834, 0.4798]
    strategy: caption-region
    curated: true
  - id: fig11
    label: Figure 11
    kind: figure
    file: assets/lipman-2022-flow-matching-for-generative-modeling/fig11.png
    raw: raw/papers/lipman-2022-flow-matching-for-generative-modeling-figures/fig11.png
    caption: "FM-OT로 학습한 CNF의 unconditional ImageNet-32 생성 샘플 그리드(선별하지 않음)"
    page: 22
    bbox_norm: [0.1667, 0.1105, 0.8333, 0.8742]
    strategy: caption-region
    curated: false
  - id: fig12
    label: Figure 12
    kind: figure
    file: assets/lipman-2022-flow-matching-for-generative-modeling/fig12.png
    raw: raw/papers/lipman-2022-flow-matching-for-generative-modeling-figures/fig12.png
    caption: "FM-OT로 학습한 CNF의 unconditional ImageNet-64 생성 샘플 그리드(선별하지 않음)"
    page: 23
    bbox_norm: [0.1667, 0.1101, 0.8333, 0.8745]
    strategy: caption-region
    curated: false
  - id: fig13
    label: Figure 13
    kind: figure
    file: assets/lipman-2022-flow-matching-for-generative-modeling/fig13.png
    raw: raw/papers/lipman-2022-flow-matching-for-generative-modeling-figures/fig13.png
    caption: "FM-OT로 학습한 CNF의 unconditional ImageNet-128 생성 샘플 그리드(선별하지 않음)"
    page: 24
    bbox_norm: [0.1667, 0.1099, 0.8333, 0.8747]
    strategy: caption-region
    curated: false
  - id: fig14
    label: Figure 14
    kind: figure
    file: assets/lipman-2022-flow-matching-for-generative-modeling/fig14.png
    raw: raw/papers/lipman-2022-flow-matching-for-generative-modeling-figures/fig14.png
    caption: "validation set 이미지를 64×64에서 256×256으로 FM-OT가 업샘플링한 conditional 생성 결과. 각 쌍의 왼쪽이 입력, 오른쪽이 출력"
    page: 25
    bbox_norm: [0.1667, 0.0959, 0.8529, 0.8846]
    strategy: caption-region
    curated: false
  - id: fig15
    label: Figure 15
    kind: figure
    file: assets/lipman-2022-flow-matching-for-generative-modeling/fig15.png
    raw: raw/papers/lipman-2022-flow-matching-for-generative-modeling-figures/fig15.png
    caption: "Figure 14와 같은 64×64에서 256×256 super-resolution 샘플의 추가 예시"
    page: 26
    bbox_norm: [0.1667, 0.0959, 0.8529, 0.8846]
    strategy: caption-region
    curated: false
  - id: fig16
    label: Figure 16
    kind: figure
    file: assets/lipman-2022-flow-matching-for-generative-modeling/fig16.png
    raw: raw/papers/lipman-2022-flow-matching-for-generative-modeling-figures/fig16.png
    caption: "ImageNet-128 FM-OT 모델에서 같은 초기 noise로 NFE를 10, 20, 40, 100으로 바꿔 생성한 샘플"
    page: 27
    bbox_norm: [0.1667, 0.1048, 0.8333, 0.8789]
    strategy: caption-region
    curated: false
  - id: fig17
    label: Figure 17
    kind: figure
    file: assets/lipman-2022-flow-matching-for-generative-modeling/fig17.png
    raw: raw/papers/lipman-2022-flow-matching-for-generative-modeling-figures/fig17.png
    caption: "ImageNet 256×256 FM-OT 모델에서 같은 초기 noise로 NFE를 10, 20, 40, 60, 100으로 바꿔 생성한 샘플"
    page: 28
    bbox_norm: [0.1747, 0.0958, 0.8253, 0.8989]
    strategy: caption-region
    curated: false
  - id: tab01
    label: Table 1
    kind: table
    file: assets/lipman-2022-flow-matching-for-generative-modeling/tab01.png
    raw: raw/papers/lipman-2022-flow-matching-for-generative-modeling-figures/tab01.png
    caption: "CIFAR-10과 ImageNet 32, 64의 NLL, FID, NFE와 ImageNet 128의 GAN 대비 FID. 값은 본문 마크다운 표로 옮겼다"
    page: 8
    bbox_norm: [0.1667, 0.0961, 0.8306, 0.2147]
    strategy: table-region
    curated: false
  - id: tab02
    label: Table 2
    kind: table
    file: assets/lipman-2022-flow-matching-for-generative-modeling/tab02.png
    raw: raw/papers/lipman-2022-flow-matching-for-generative-modeling-figures/tab02.png
    caption: "ImageNet validation set에서 64×64를 256×256으로 올리는 super-resolution의 FID, IS, PSNR, SSIM 비교. 값은 본문 마크다운 표로 옮겼다"
    page: 9
    bbox_norm: [0.5619, 0.5983, 0.8281, 0.6777]
    strategy: table-region
    curated: false
  - id: tab03
    label: Table 3
    kind: table
    file: assets/lipman-2022-flow-matching-for-generative-modeling/tab03.png
    raw: raw/papers/lipman-2022-flow-matching-for-generative-modeling-figures/tab03.png
    caption: "데이터셋별 학습 hyper-parameter(채널, 깊이, batch size, GPU 수, epoch, iteration, learning rate 등). 값은 본문 마크다운 표로 옮겼다"
    page: 20
    bbox_norm: [0.1667, 0.0419, 0.8333, 0.312]
    strategy: table-region
    curated: false
  - id: tab04
    label: Table 4
    kind: table
    file: assets/lipman-2022-flow-matching-for-generative-modeling/tab04.png
    raw: raw/papers/lipman-2022-flow-matching-for-generative-modeling-figures/tab04.png
    caption: "Table 4 자리에 Figure 10의 NFE 곡선이 잘려 들어간 오크롭. uniform dequantization의 K별 NLL 값은 raw 텍스트로 대조해 본문 마크다운 표로 옮겼다"
    page: 21
    bbox_norm: [0.3735, 0.307, 0.6704, 0.4433]
    strategy: table-region
    curated: false
---

## 한 줄 요약 (One-line Summary)

Flow Matching(FM)은 continuous normalizing flow(CNF)를 ODE 시뮬레이션 없이 학습하는 회귀 목표다. 데이터 샘플 하나에 조건부인 vector field를 맞히는 Conditional Flow Matching(CFM)이 원래 목표와 같은 gradient를 주므로 고차원으로 확장되고, Gaussian 경로 족 안에서 diffusion 경로를 특수 사례로 포함하며, optimal transport(OT) 경로를 쓰면 ImageNet에서 likelihood, 샘플 품질, 샘플링 비용이 모두 diffusion 계열 baseline보다 낫다.

## 1. 자료 정보 (Document Information)

- 제목: Flow Matching for Generative Modeling
- 저자: Yaron Lipman(Meta AI FAIR, Weizmann Institute of Science), Ricky T. Q. Chen, Maximilian Nickel, Matt Le(Meta AI FAIR), Heli Ben-Hamu(Weizmann Institute of Science)
- 발표: arXiv 2210.02747 v2 (2023-02-08). PDF 머리말은 "Preprint"이고 게재 학회는 raw에 적혀 있지 않다
- 분량: 결론까지 본문 9쪽, 사회적 책임 절과 참고문헌, 부록 A부터 F까지 합쳐 28쪽
- 도구: ODE 적분에 torchdiffeq(Chen 2018)를 쓴다. FID는 CIFAR-10과 ImageNet-32/64에서 TensorFlow GAN 라이브러리로, ImageNet-128에서는 Dhariwal & Nichol(2021)의 공개 평가 스크립트로 계산한다

CNF는 신경망으로 시간에 따라 변하는 vector field $v_t(x;\theta)$를 정의하고, ODE $\frac{d}{dt}\phi_t(x) = v_t(\phi_t(x))$, $\phi_0(x) = x$가 만드는 flow $\phi_t$로 단순 분포 $p_0$를 데이터 분포 $p_1$로 옮기는 생성 모델이다(Chen et al. 2018). vector field는 각 시점과 위치에서 입자가 어느 방향으로 얼마나 빠르게 움직이는지 지정하는 함수를 말한다. 기존 CNF는 maximum likelihood로 학습하려면 forward와 backward 모두 순차적 ODE 시뮬레이션이 필요해 고차원 이미지로 확장하기 어려웠다.

## 2. 주요 기여 (Key Contributions)

- Flow Matching 목표(3절): 목표 probability path를 생성하는 vector field에 신경망을 직접 회귀시키는 단순한 손실. probability path는 시점 $t$가 0에서 1로 갈 때 noise 분포가 데이터 분포로 이어지는 시간 의존 밀도들의 궤적이다.
- conditional 구성과 CFM(3.1절, 3.2절): 목표 path와 field를 샘플 단위 conditional 대상의 집계로 구성하고(Theorem 1), conditional field만 회귀하는 CFM 목표가 FM 목표와 같은 gradient를 줌을 증명한다(Theorem 2). denoising score matching이 score matching을 대체하는 논리를 vector field로 일반화한 것이다.
- 일반 Gaussian 경로 족(4절): 평균 $\mu_t(x_1)$와 표준편차 $\sigma_t(x_1)$를 임의의 미분 가능 함수로 두는 conditional 경로 족과, 그 경로를 생성하는 유일한 vector field의 닫힌 형태(Theorem 3). VE와 VP diffusion 경로가 특수 사례로 들어오며, diffusion 경로에 FM을 써도 score matching보다 학습이 더 안정적이고 성능이 높다.
- OT 경로(4.1절 Example II): 평균과 표준편차를 시간에 선형으로 두면 두 Gaussian 사이의 optimal transport displacement map이 conditional flow가 된다. 입자가 직선을 등속으로 움직여 회귀 목표가 단순하고, 실험에서 더 빠른 학습, 더 빠른 생성, 더 나은 일반화로 이어진다.
- 실험(6절): CIFAR-10과 ImageNet 32/64/128에서 같은 U-Net으로 DDPM, score matching, ScoreFlow 손실과 비교해 likelihood와 샘플 품질 모두에서 일관되게 앞서고, 기성 ODE solver로 적은 NFE에서 안정적으로 샘플을 만든다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### CNF와 push-forward

flow $\phi_t$는 push-forward 식 $p_t = [\phi_t]_* p_0$로 밀도를 옮기며, $[\phi_t]_* p_0(x) = p_0(\phi_t^{-1}(x))\det[\partial\phi_t^{-1}/\partial x]$다. vector field $v_t$의 flow가 이 식을 만족하면 $v_t$가 probability path $p_t$를 생성한다고 부른다. 생성 여부는 continuity equation $\frac{d}{dt}p_t(x) + \mathrm{div}(p_t(x)v_t(x)) = 0$으로 검사하며, 이 PDE가 정리 증명의 핵심 도구다(부록 B).

### Flow Matching 목표

목표 path $p_t$와 그것을 생성하는 $u_t$가 주어졌다고 하면 FM 손실은 $\mathcal{L}_{FM}(\theta) = \mathbb{E}_{t, p_t(x)}\lVert v_t(x) - u_t(x)\rVert^2$이고, $t \sim U[0,1]$, $x \sim p_t(x)$다. 손실이 0이면 학습된 CNF가 $p_t$를 생성한다. 그러나 $p_1 \approx q$를 만족하는 path는 무수히 많고 그것을 생성하는 $u_t$의 닫힌 형태는 일반적으로 알 수 없어 그대로는 쓸 수 없다.

### conditional path와 vector field의 집계

데이터 샘플 $x_1$마다 conditional path $p_t(x \mid x_1)$를 두고 $t=0$에서 $p(x) = \mathcal{N}(x \mid 0, I)$, $t=1$에서 $x_1$ 주변에 집중된 분포(예: $\mathcal{N}(x \mid x_1, \sigma^2 I)$, 충분히 작은 $\sigma$)가 되게 한다. 이를 $q(x_1)$로 marginalize한 $p_t(x) = \int p_t(x \mid x_1)q(x_1)dx_1$이 marginal path이고 $t=1$에서 $q$를 근사한다. conditional field $u_t(\cdot \mid x_1)$를 $u_t(x) = \int u_t(x \mid x_1)\frac{p_t(x \mid x_1)q(x_1)}{p_t(x)}dx_1$로 가중 평균한 marginal field가 marginal path를 정확히 생성한다(Theorem 1, $p_t(x) > 0$ 가정). 저자들은 이 정리가 Peluchetti(2021)의 Diffusion Mixture Representation Theorem에서도 유도된다고 적는다.

### Conditional Flow Matching

marginal 적분은 여전히 intractable하므로 CFM 목표 $\mathcal{L}_{CFM}(\theta) = \mathbb{E}_{t, q(x_1), p_t(x \mid x_1)}\lVert v_t(x) - u_t(x \mid x_1)\rVert^2$를 쓴다. $p_t(x \mid x_1)$에서 샘플링하고 $u_t(x \mid x_1)$를 계산하는 일은 샘플 단위라 쉽다. Theorem 2는 $p_t(x) > 0$일 때 두 손실이 $\theta$와 무관한 상수 차이라서 $\nabla_\theta\mathcal{L}_{FM} = \nabla_\theta\mathcal{L}_{CFM}$임을 보인다. 증명은 2-norm을 전개한 뒤 적분 순서를 바꾸는 것으로, $u_t$가 $\theta$와 무관하다는 점을 쓴다(부록 A).

### Gaussian conditional 경로와 Theorem 3

conditional path를 $p_t(x \mid x_1) = \mathcal{N}(x \mid \mu_t(x_1), \sigma_t(x_1)^2 I)$로 두고 경계 조건 $\mu_0 = 0$, $\sigma_0 = 1$, $\mu_1 = x_1$, $\sigma_1 = \sigma_{min}$을 건다. 한 path를 생성하는 vector field는 무한히 많지만(continuity equation에 divergence-free 성분을 더할 수 있다) 대부분은 회전 성분처럼 분포를 바꾸지 않으면서 계산만 늘리는 것이다. 따라서 저자들은 Gaussian의 canonical 변환 $\psi_t(x) = \sigma_t(x_1)x + \mu_t(x_1)$에 대응하는 가장 단순한 field를 택한다. Theorem 3에 따라 $\psi_t$를 정의하는 유일한 field는 $u_t(x \mid x_1) = \frac{\sigma_t'(x_1)}{\sigma_t(x_1)}(x - \mu_t(x_1)) + \mu_t'(x_1)$이다. $x_0$로 reparameterize하면 CFM 손실은 $\mathbb{E}_{t, q(x_1), p(x_0)}\lVert v_t(\psi_t(x_0)) - \frac{d}{dt}\psi_t(x_0)\rVert^2$가 된다.

### diffusion 경로의 재현

| 경로 | $\mu_t(x_1)$ | $\sigma_t(x_1)$ | conditional vector field $u_t(x \mid x_1)$ |
|---|---|---|---|
| VE (reversed) | $x_1$ | $\sigma_{1-t}$ ($\sigma_t$는 증가 함수, $\sigma_0 = 0$, $\sigma_1 \gg 1$) | $-\frac{\sigma'_{1-t}}{\sigma_{1-t}}(x - x_1)$ |
| VP (reversed) | $\alpha_{1-t}x_1$ | $\sqrt{1 - \alpha_{1-t}^2}$, $\alpha_t = e^{-\frac{1}{2}T(t)}$, $T(t) = \int_0^t \beta(s)ds$ | $\frac{\alpha'_{1-t}}{1 - \alpha_{1-t}^2}(\alpha_{1-t}x - x_1)$ |
| OT | $t x_1$ | $1 - (1 - \sigma_{min})t$ | $\frac{x_1 - (1 - \sigma_{min})x}{1 - (1 - \sigma_{min})t}$ |

VE와 VP는 Theorem 3의 특정 평균과 표준편차 선택으로 재현되며, 이렇게 얻은 conditional field는 Song et al.(2020b)의 probability flow ODE(그 논문 식 13)를 conditional diffusion 과정에 제한한 것과 일치한다. 부록 D는 Fokker-Planck 식을 continuity equation 꼴로 고쳐 $w_t = f_t - \frac{g_t^2}{2}\nabla\log p_t$를 얻고 Lemma 1로 시간을 뒤집어 이를 보인다. diffusion 경로는 diffusion 과정의 해로 유도된 탓에 유한 시간 안에 진짜 noise 분포에 도달하지 못하고, 실무에서는 $p_0$를 적당한 Gaussian으로 근사한다. FM 구성은 $\mu_t$와 $\sigma_t$를 직접 정하므로 이 제약이 없다.

### optimal transport 경로

평균과 표준편차를 시간에 선형으로 두면 conditional flow는 $\psi_t(x) = (1 - (1 - \sigma_{min})t)x + t x_1$이고 CFM 손실은 $\mathbb{E}_{t, q(x_1), p(x_0)}\lVert v_t(\psi_t(x_0)) - (x_1 - (1 - \sigma_{min})x_0)\rVert^2$로 단순해진다. 이 $\psi_t$는 두 Gaussian $p_0(x \mid x_1)$과 $p_1(x \mid x_1)$ 사이의 OT displacement map이다(McCann 1997의 Definition 1.1과 Example 1.7, OT interpolant $p_t = [(1-t)\mathrm{id} + t\psi]_\star p_0$). 입자는 직선을 등속으로 움직이고, diffusion 경로가 최종 샘플을 지나쳤다가 되돌아오는 overshoot을 보이는 것과 달리 직선을 유지한다(Figure 3). OT field는 $u_t(x \mid x_1) = g(t)h(x \mid x_1)$ 꼴이라 시간에 대해 방향이 일정하고(Figure 2), diffusion conditional field(식 19)와 달리 모든 $t \in [0,1]$에서 정의된다. 다만 conditional flow가 최적이라고 해서 marginal field가 OT 해라는 뜻은 아니며, 저자들은 marginal field가 비교적 단순할 것으로 기대한다고만 적는다.

### 샘플링과 likelihood 계산

샘플링은 $x_0 \sim \mathcal{N}(0, I)$를 뽑아 학습된 $v_t$로 식 1을 $t \in [0,1]$에서 풀어 $\phi_1(x_0)$를 얻는다. likelihood는 continuity equation에서 나오는 instantaneous change of variables $\frac{d}{dt}\log p_t(\phi_t(x)) + \mathrm{div}(v_t(\phi_t(x))) = 0$을 써서, 임의의 $x_1$에서 ODE를 거꾸로 풀며 divergence를 함께 적분해 $\log p_1(x_1) = \log p_0(x_0) - f(0)$으로 구한다(부록 C). divergence는 $\mathbb{E}zz^T = I$인 $z$로 $z^T Dv\,z$를 쓰는 Hutchinson trace estimator로 편향 없이 추정한다(Grathwohl et al. 2018). 이미지는 픽셀을 $[-1, 1]$에서 $[0, 256]$으로 옮기는 변환 $\phi(y) = 2^7(y+1)$을 쓰므로 bits per dimension은 $\mathrm{BPD} = -\frac{\log\phi_* p_0(\phi^{-1}(x))}{d\log 2} + 7$이다.

### baseline 손실의 정의

부록 E.1은 같은 Gaussian 경로 위에서 세 baseline 손실을 정의한다. score matching 손실은 $\mathbb{E}\,\lambda(t)\lVert s_t(x) - \nabla\log p_t(x \mid x_1)\rVert^2$이고 $\nabla\log p_t(x \mid x_1) = -\frac{x - \mu_t(x_1)}{\sigma_t(x_1)^2}$다.

| baseline | 가중치 또는 형태 | 출처 |
|---|---|---|
| Score Matching (SM) | $\lambda(t) = \sigma_t(x_1)^2$ | Song & Ermon 2019 |
| ScoreFlow (SF) | $\lambda(t) = \beta(1-t)$, NLL 상한에서 유도 | Song et al. 2021 |
| DDPM (noise matching) | $\mathbb{E}\lVert \epsilon_t(x) - \frac{x - \mu_t(x_1)}{\sigma_t(x_1)}\rVert^2$ | Ho et al. 2020 |

diffusion 경로는 표준 VP를 쓰고 $\beta(s) = \beta_{min} + s(\beta_{max} - \beta_{min})$, $\beta_{min} = 0.1$, $\beta_{max} = 20$이며, 시간은 $[0, 1 - \epsilon]$, $\epsilon = 10^{-5}$에서 샘플링한다. score matching 모델의 샘플은 vector field $u_t(x) = -\frac{T'(1-t)}{2}[s_t(x) - x]$로 ODE를 풀어 만들고, DDPM은 $s_t(x) = \epsilon_t(x)/\sigma_t$로 두고 같은 식을 쓴다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 실험 설정

- 데이터: CIFAR-10, ImageNet 32/64/128. 32와 64는 Chrabaszcz et al.(2017)의 전처리를 따르고, 그 외는 center crop 후 resize
- 아키텍처: 이미지는 Dhariwal & Nichol(2021)의 U-Net을 최소 변경으로 사용, 2D 예제는 512 뉴런 5층 MLP
- 비교 대상: 같은 아키텍처, 같은 hyper-parameter, 같은 epoch 수로 DDPM, Score Matching, ScoreFlow 손실을 학습. baseline에는 수렴을 위해 더 많은 iteration을 허용
- 평가: likelihood와 샘플은 dopri5(절대와 상대 tolerance 1e-5)로 계산. NLL은 bits per dimension, 샘플 품질은 FID, 생성 비용은 적응형 solver가 tolerance에 도달할 때까지 vector field를 호출한 평균 횟수 NFE(5만 개 샘플 평균). 모두 unconditional 모델
- 학습: CIFAR-10과 ImageNet-32는 32비트, ImageNet-64/128/256은 16비트 mixed precision. Adam($\beta_1 = 0.9$, $\beta_2 = 0.999$, weight decay 0, $\epsilon = 10^{-8}$). polynomial decay 스케줄은 warm-up 동안 $10^{-8}$에서 peak까지 선형 증가한 뒤 마지막 step까지 $10^{-8}$으로 선형 감소
- NLL 보고: uniform dequantization, $K$개 noise로 importance-weighted 추정 $\log\frac{1}{K}\sum_{k=1}^{K} p_t(x + u_k)$, $u_k \sim U(0,1)$

### Table 1 (likelihood, 샘플 품질, 생성 비용)

| 모델 | CIFAR-10 NLL | FID | NFE | ImageNet 32 NLL | FID | NFE | ImageNet 64 NLL | FID | NFE |
|---|---|---|---|---|---|---|---|---|---|
| DDPM | 3.12 | 7.48 | 274 | 3.54 | 6.99 | 262 | 3.32 | 17.36 | 264 |
| Score Matching | 3.16 | 19.94 | 242 | 3.56 | 5.68 | 178 | 3.40 | 19.74 | 441 |
| ScoreFlow | 3.09 | 20.78 | 428 | 3.55 | 14.14 | 195 | 3.36 | 24.95 | 601 |
| FM w/ Diffusion | 3.10 | 8.06 | 183 | 3.54 | 6.37 | 193 | 3.33 | 16.88 | 187 |
| FM w/ OT | 2.99 | 6.35 | 142 | 3.53 | 5.02 | 122 | 3.31 | 14.45 | 138 |

| ImageNet 128 모델 | NLL | FID |
|---|---|---|
| MGAN (Hoang et al. 2018) | 없음 | 58.9 |
| PacGAN2 (Lin et al. 2018) | 없음 | 57.5 |
| Logo-GAN-AE (Sage et al. 2018) | 없음 | 50.9 |
| Self-cond. GAN (Lučić et al. 2019) | 없음 | 41.7 |
| Uncond. BigGAN (Lučić et al. 2019) | 없음 | 25.3 |
| PGMGAN (Armandpour et al. 2021) | 없음 | 21.7 |
| FM w/ OT | 2.90 | 20.9 |

FM-OT는 CIFAR-10과 ImageNet 32/64의 세 지표 모두에서 가장 좋다. CIFAR-10 FID가 기존 연구(Ho et al. 2020; Song et al. 2020b, 2021)보다 전반적으로 높은데, 저자들은 아키텍처가 CIFAR-10에 최적화되지 않은 탓일 수 있다고 본다. ImageNet-128 FID 20.9는 self-supervised ResNet50 조건부를 쓰는 IC-GAN(Casanova et al. 2021)을 제외하면 state-of-the-art다.

### Table 4 (dequantization K별 NLL)

| 모델 | CIFAR-10 K=1 | K=20 | K=50 | ImageNet 32 K=1 | K=5 | K=15 | ImageNet 64 K=1 | K=5 | K=10 |
|---|---|---|---|---|---|---|---|---|---|
| DDPM | 3.24 | 3.14 | 3.12 | 3.62 | 3.57 | 3.54 | 3.36 | 3.33 | 3.32 |
| Score Matching | 3.28 | 3.18 | 3.16 | 3.65 | 3.59 | 3.57 | 3.43 | 3.41 | 3.40 |
| ScoreFlow | 3.21 | 3.11 | 3.09 | 3.63 | 3.57 | 3.55 | 3.39 | 3.37 | 3.36 |
| FM w/ Diffusion | 3.23 | 3.13 | 3.10 | 3.64 | 3.58 | 3.56 | 3.37 | 3.34 | 3.33 |
| FM w/ OT | 3.11 | 3.01 | 2.99 | 3.62 | 3.56 | 3.53 | 3.35 | 3.33 | 3.31 |

CIFAR-10(K=50)과 ImageNet 64(K=10) 열은 Table 1과 일치한다. 반면 ImageNet 32는 Score Matching(Table 1 3.56, Table 4 K=15 3.57)과 FM w/ Diffusion(3.54 대 3.56)이 두 표에서 다르며, 논문은 Table 1이 어떤 K를 썼는지 명시하지 않는다.

### 학습 속도

ScoreFlow와 VDM이 각각 130만, 1,000만 iteration을 보고하는 것과 달리 FM은 훨씬 빨리 수렴한다. ImageNet 64의 학습 중 FID 곡선(Figure 5)에서 FM-OT가 가장 빨리, 가장 낮게 내려간다. ImageNet-128에서 Dhariwal & Nichol(2021)은 batch 256으로 436만 iteration을 학습한 반면, FM은 25% 큰 모델을 batch 1,536으로 50만 iteration 학습했고 image throughput은 33% 적다. score matching은 학습 중 샘플링 비용(NFE)이 크게 요동하지만 FM은 일정하다(Figure 10, CIFAR-10, dopri5 tolerance 1e-5).

### Table 3 (학습 hyper-parameter)

| 항목 | CIFAR-10 | ImageNet-32 | ImageNet-64 | ImageNet-128 |
|---|---|---|---|---|
| Channels | 256 | 256 | 192 | 256 |
| Depth | 2 | 3 | 3 | 3 |
| Channels multiple | 1,2,2,2 | 1,2,2,2 | 1,2,3,4 | 1,1,2,3,4 |
| Heads | 4 | 4 | 4 | 4 |
| Heads Channels | 64 | 64 | 64 | 64 |
| Attention resolution | 16 | 16,8 | 32,16,8 | 32,16,8 |
| Dropout | 0.0 | 0.0 | 0.0 | 0.0 |
| Effective Batch size | 256 | 1024 | 2048 | 1536 |
| GPUs | 2 | 4 | 16 | 32 |
| Epochs | 1000 | 200 | 250 | 571 |
| Iterations | 391,000 | 250,000 | 157,000 | 500,000 |
| Learning Rate | 5e-4 | 1e-4 | 1e-4 | 1e-4 |
| Learning Rate Scheduler | Polynomial Decay | Polynomial Decay | Constant | Polynomial Decay |
| Warmup Steps | 45,000 | 20,000 | 없음 | 20,000 |

### 샘플링 효율

diffusion 모델은 SDE로도 샘플링할 수 있지만 매우 비효율적이며, 빠른 sampler(Song et al. 2020a; Zhang & Chen 2022)는 ODE 관점을 직접 쓴다. ODE solver는 비슷한 비용에서 오차가 낮고(Kloeden et al. 2012) 종류가 많다. ablation에서 FM-OT는 solver 종류와 무관하게 항상 가장 효율적인 sampler였다.

- 샘플 경로(Figure 6): 같은 seed의 ImageNet-64 모델에서 OT 경로는 noise를 거의 선형으로 줄여 이미지가 더 일찍 나타나고, diffusion 경로는 마지막 시점까지 noise가 지배한다. 2D checkerboard(Figure 4 왼쪽)도 OT 경로가 패턴을 훨씬 일찍 만든다.
- 저비용 샘플(Figure 7): 고정 스텝 solver로 ImageNet-32 모델에서 100 이하 NFE 샘플을 만들어 1,000 NFE 해와 픽셀당 MSE를 비교했다(256개 noise seed). FM-OT는 같은 오차 문턱에 diffusion 모델의 약 60% NFE로 도달하고, 매우 낮은 NFE에서도 준수한 FID를 내 품질 대 비용 trade-off가 가장 좋다. Figure 4 오른쪽은 midpoint solver로 NFE 4, 8, 10, 20에서 2D 결과를 보여 준다.
- 부록 Figure 16과 17은 ImageNet-128과 ImageNet 256×256 FM-OT 모델에서 NFE 10부터 100까지 같은 noise로 만든 샘플을 보여 준다.

### Table 2 (super-resolution)

| 모델 | FID | IS | PSNR | SSIM |
|---|---|---|---|---|
| Reference | 1.9 | 240.8 | 없음 | 없음 |
| Regression | 15.2 | 121.1 | 27.9 | 0.801 |
| SR3 (Saharia et al. 2022) | 5.2 | 180.1 | 26.4 | 0.762 |
| FM w/ OT | 3.4 | 200.8 | 24.7 | 0.747 |

conditional 생성으로 ImageNet 64×64를 256×256으로 upsampling했다. 평가는 Saharia et al.(2022)의 절차를 따라 validation 이미지의 FID를 재고, reference(원본 validation set의 FID)와 regression을 baseline으로 둔다. FM-OT는 SR3와 비슷한 PSNR과 SSIM을 내면서 FID와 IS를 크게 개선했다. Saharia et al.은 FID와 IS가 생성 품질을 더 잘 나타내는 지표라고 주장한다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- 저자 명시: conditional flow가 OT라고 해서 marginal vector field가 OT 해인 것은 아니다. CIFAR-10 FID는 기존 연구보다 높다(아키텍처 미최적화 추정). ImageNet-128 비교에서 IC-GAN은 self-supervised 조건부를 써서 제외했다. 향후 non-isotropic Gaussian이나 더 일반적인 kernel 경로를 열어 두었다.
- 사회적 책임 절: 이미지 생성의 악용 가능성과 학습 에너지 문제를 언급하고, 적은 gradient update와 image throughput으로 학습되는 방법이 시간과 에너지를 아낀다고 적는다.
- 자료에 없어 확인 불가: 실험은 이미지에 한정된다. Table 3에는 ImageNet-256과 super-resolution 모델의 hyper-parameter가 없다(Figure 17과 E.2는 256 모델을 언급한다). 샘플링 비용은 NFE로만 보고하고 wall-clock 시간은 없다.
- 내적 불일치: Table 1과 Table 4의 ImageNet 32 NLL 2건. E.1의 "ε = 10⁻⁵ for training and likelihood and ε = 10⁻⁵ for sampling" 문장은 같은 값을 두 번 적는다.

## 6. 관련 연구 (Related Work)

| 계열 | 연구 | FM과의 관계 |
|---|---|---|
| CNF 원류 | Chen et al. 2018 (neural ODE), Grathwohl et al. 2018 (FFJORD) | maximum likelihood 학습은 ODE 시뮬레이션 비용이 커 고차원 확장이 어렵다 |
| ODE 정규화 | Dupont et al. 2019 (augmentation), Yang & Karniadakis 2019, Finlay et al. 2020, Onken et al. 2021, Tong et al. 2020, Kelly et al. 2020 (정규화 항), Du et al. 2022 (적분 구간 확률 샘플링) | ODE를 풀기 쉽게 만들 뿐 학습 알고리즘은 그대로다 |
| simulation-free CNF | Rozen et al. 2021 (prior와 target 사이 선형 보간), Ben-Hamu et al. 2022 (일반 경로) | 각각 고차원 적분 추정 곤란, 미니배치 편향 gradient. FM은 편향 없는 gradient로 고차원 확장 |
| diffusion과 score matching | Sohl-Dickstein et al. 2015, Ho et al. 2020, Song & Ermon 2019, Song et al. 2020b (denoising score matching, Vincent 2011) | CFM의 착안점. FM은 vector field 회귀로 일반화 |
| diffusion 개선 | Song et al. 2021 (loss rescaling), Dhariwal & Nichol 2021 (classifier guidance, 아키텍처), Nichol & Dhariwal 2021, Kingma et al. 2021 (noise schedule 학습) | 뒤의 둘은 단일 파라미터 diffusion 과정의 Gaussian 경로만 다뤄 OT 경로를 포함하지 않는다 |
| diffusion bridge | De Bortoli et al. 2021, Wang et al. 2021, Peluchetti 2021 | 무한 시간 denoising의 근사 오차를 유한 시간 구성으로 해소 |
| 동시대 | Liu et al. 2022 (rectified flow), Albergo & Vanden-Eijnden 2022 (stochastic interpolants), Neklyudov et al. 2023 (action matching) | 앞의 둘은 유사한 conditional 목표에 독립적으로 도달. 뒤는 $u_t$가 gradient field일 때의 implicit 목표 |

## 7. 용어집 (Glossary)

- **Flow Matching (FM)**: 목표 probability path를 생성하는 vector field에 신경망을 회귀시켜 CNF를 시뮬레이션 없이 학습하는 목표.
- **Conditional Flow Matching (CFM)**: 데이터 샘플 하나에 조건부인 vector field를 회귀 목표로 삼는 tractable 버전. FM과 gradient가 같다.
- **continuous normalizing flow (CNF)**: 신경망 vector field로 정의된 ODE의 flow를 따라 noise를 데이터로 변형하는 생성 모델.
- **flow와 push-forward**: vector field의 ODE 해인 시간 의존 diffeomorphism $\phi_t$와, 그것이 밀도를 옮기는 식 $p_t = [\phi_t]_* p_0$.
- **continuity equation**: vector field가 probability path를 생성하는지 판정하는 필요충분조건 PDE.
- **probability path**: 시점 $t$에 따라 noise 분포에서 데이터 분포로 이어지는 시간 의존 밀도.
- **conditional path와 marginal path**: 샘플 $x_1$ 하나에 조건부인 경로와, 그것을 $q(x_1)$로 marginalize한 경로.
- **optimal transport (OT) displacement map**: 두 분포 사이 OT map $\psi$에 대한 $(1-t)\mathrm{id} + t\psi$. 표준 Gaussian과 다른 Gaussian 사이에서는 평균과 표준편차가 선형으로 변하는 affine map이 된다.
- **score function**: $\nabla\log p_t(x)$. diffusion과 score matching의 회귀 목표. FM은 이를 vector field로 대체한다.
- **NFE (number of function evaluations)**: ODE solver가 샘플 하나를 만들 때 vector field를 호출한 횟수. 생성 비용의 척도.
- **bits per dimension (BPD)**: 차원당 음의 로그가능도를 2진 단위로 잰 밀도 추정 지표(낮을수록 좋음).
- **FID (Frechet Inception Distance)**: 생성 샘플 품질 지표(낮을수록 좋음).
- **Hutchinson trace estimator**: $\mathbb{E}zz^T = I$인 확률 벡터로 divergence(자코비안의 trace)를 편향 없이 추정하는 방법.
- **uniform dequantization**: 정수 픽셀에 $U(0,1)$ noise를 더해 연속 밀도 모델의 likelihood를 평가하는 관례.

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig02 | 6 | "diffusion 경로의 conditional score function(왼쪽)과 OT 경로의 conditional vector field(오른쪽)를 t=0, 1/3, 2/3, 1에서 비교. OT 쪽은 시간이 흘러도 방향이 바뀌지 않는다" | caption-region | ★ wiki 권장 (method 핵심 개념) |
| fig03 | 6 | "diffusion 궤적(굽은 곡선)과 OT 궤적(직선)의 샘플링 경로 비교. 크롭 대부분이 주변 본문 텍스트이고 도식은 오른쪽 아래에 작게 들어 있다" | caption-region | ★ wiki 권장 (직관) |
| fig04 | 7 | "2D checkerboard 데이터에서 SM-diffusion, FM-diffusion, FM-OT의 밀도 경로(왼쪽)와 midpoint solver로 NFE 4, 8, 10, 20에서 뽑은 샘플(오른쪽)" | caption-region | ★ wiki 권장 (method+result) |
| tab01 | 8 | "CIFAR-10과 ImageNet 32, 64의 NLL, FID, NFE와 ImageNet 128의 GAN 대비 FID. 값은 본문 마크다운 표로 옮겼다" | table-region | ★ wiki 권장 (핵심 result) |
| fig01 | 1 | "FM과 OT 경로로 학습한 CNF의 unconditional ImageNet-128 생성 샘플. 2단 조판 탓에 크롭 왼쪽 절반에 서론 본문이 함께 잘려 들어갔다" | caption-region | ○ (hero 이미지) |
| fig07 | 9 | "ImageNet 32×32 모델의 NFE 대비 ODE 수치 오차(왼쪽)와 Euler, midpoint, RK4 solver별 FID(오른쪽 세 패널)" | caption-region | ○ (result 보강) |
| fig06 | 8 | "같은 초기 noise에서 시작한 ImageNet 64×64 샘플 경로. OT 경로는 noise가 거의 선형으로 줄고 diffusion 경로는 끝부분에서야 이미지가 드러난다" | caption-region | (확인 필요) |
| fig05 | 8 | "ImageNet 64×64 학습 중 epoch별 FID 곡선. FM-OT가 가장 빠르고 낮게 내려간다. column-band 크롭이라 좌우 여백에 본문 글자 조각이 섞여 있다" | column-band | (확인 필요, 저신뢰) |
| fig08 | 19 | "VP diffusion 경로의 conditional vector field를 t=0, 1/3, 2/3, 1에서 시각화. Figure 2의 OT vector field와 대조용 부록 도식" | caption-region | (아카이브, Figure 2 보조) |
| fig09 | 19 | "2D checkerboard에서 ScoreFlow 손실과 DDPM 손실로 학습한 CNF의 밀도 경로. Figure 4와 같은 learning rate와 hyper-parameter를 썼다" | caption-region | (아카이브, Figure 4 보조) |
| fig10 | 21 | "CIFAR-10 학습 중 dopri5 solver(tolerance 1e-5)가 샘플 하나에 쓴 NFE의 epoch별 변화. score matching은 크게 요동하고 FM-OT는 일정하다" | caption-region | ○ (학습 중 샘플링 비용 근거) |
| fig11 | 22 | "FM-OT로 학습한 CNF의 unconditional ImageNet-32 생성 샘플 그리드(선별하지 않음)" | caption-region | (아카이브, 샘플 그리드) |
| fig12 | 23 | "FM-OT로 학습한 CNF의 unconditional ImageNet-64 생성 샘플 그리드(선별하지 않음)" | caption-region | (아카이브, 샘플 그리드) |
| fig13 | 24 | "FM-OT로 학습한 CNF의 unconditional ImageNet-128 생성 샘플 그리드(선별하지 않음)" | caption-region | (아카이브, 샘플 그리드) |
| fig14 | 25 | "validation set 이미지를 64×64에서 256×256으로 FM-OT가 업샘플링한 conditional 생성 결과. 각 쌍의 왼쪽이 입력, 오른쪽이 출력" | caption-region | (아카이브, super-resolution 예시) |
| fig15 | 26 | "Figure 14와 같은 64×64에서 256×256 super-resolution 샘플의 추가 예시" | caption-region | (아카이브, Figure 14 추가분) |
| fig16 | 27 | "ImageNet-128 FM-OT 모델에서 같은 초기 noise로 NFE를 10, 20, 40, 100으로 바꿔 생성한 샘플" | caption-region | (아카이브, NFE별 샘플) |
| fig17 | 28 | "ImageNet 256×256 FM-OT 모델에서 같은 초기 noise로 NFE를 10, 20, 40, 60, 100으로 바꿔 생성한 샘플" | caption-region | (아카이브, NFE별 샘플) |
| tab02 | 9 | "ImageNet validation set에서 64×64를 256×256으로 올리는 super-resolution의 FID, IS, PSNR, SSIM 비교. 값은 본문 마크다운 표로 옮겼다" | table-region | (아카이브, 본문 표로 대체) |
| tab03 | 20 | "데이터셋별 학습 hyper-parameter(채널, 깊이, batch size, GPU 수, epoch, iteration, learning rate 등). 값은 본문 마크다운 표로 옮겼다" | table-region | (아카이브, 본문 표로 대체) |
| tab04 | 21 | "Table 4 자리에 Figure 10의 NFE 곡선이 잘려 들어간 오크롭. uniform dequantization의 K별 NLL 값은 raw 텍스트로 대조해 본문 마크다운 표로 옮겼다" | table-region | (아카이브, 오크롭이라 사용 불가) |
