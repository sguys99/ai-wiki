---
title: "Flow Matching for Generative Modeling"
type: paper
year: 2022
category: llms
raw_path: /home/sguys99/project/ai-wiki/raw/papers/lipman-2022-flow-matching-for-generative-modeling.pdf
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

## 한 줄 요약 (One-line Summary)

Flow Matching은 continuous normalizing flow를 시뮬레이션 없이 학습하는 방법으로, diffusion을 특수 사례로 포함하면서 optimal transport 경로를 쓰면 더 빠른 학습·생성과 더 나은 sample 품질을 얻는다.

## 1. 자료 정보 (Document Information)

- 제목: Flow Matching for Generative Modeling
- 저자: Yaron Lipman, Ricky T. Q. Chen, Heli Ben-Hamu, Maximilian Nickel, Matt Le (Meta AI / FAIR, Weizmann Institute)
- 발표: arXiv 2210.02747 (v2, 2023-02-08), ICLR 2023
- 유형: 생성 모델링 방법론 논문

continuous normalizing flow(CNF)는 신경망으로 시간에 따라 변하는 vector field를 정의하고 그 field를 따라 흐르는 ordinary differential equation(ODE)으로 단순 분포(noise)를 데이터 분포로 변형하는 생성 모델이다. vector field는 각 시점·위치에서 입자가 어느 방향으로 얼마나 빠르게 움직일지를 지정하는 함수를 말한다. 기존 CNF는 maximum likelihood로 학습하려면 매 스텝 값비싼 ODE 시뮬레이션이 필요해 고차원으로 확장하기 어려웠다.

## 2. 주요 기여 (Key Contributions)

Flow Matching(FM)은 목표 vector field에 신경망을 회귀시키는 단순한 학습 목표다. 문제는 그 목표 field를 닫힌 형태로 알 수 없다는 데 있다. 논문은 데이터 sample 하나에만 의존하는 conditional 구성으로 이를 우회한다.

Flow Matching 목표는 probability path를 생성하는 marginal vector field에 신경망을 직접 회귀시킨다. probability path는 시점 $t$가 0에서 1로 갈 때 noise 분포가 데이터 분포로 이어지는 시간에 따른 밀도들의 궤적을 뜻한다. Conditional Flow Matching(CFM)은 intractable한 marginal field 대신 데이터 sample 하나에 조건부인 vector field를 회귀 목표로 삼는다. 논문은 FM과 CFM의 gradient가 파라미터에 대해 같음을 증명해 sample 단위로 편향 없이 학습할 수 있게 했다. 이는 denoising score matching이 score matching을 대체하는 논리를 vector field로 일반화한다.

논문은 평균과 표준편차를 임의의 미분 가능 함수로 두는 일반 Gaussian 경로 족을 제시했다. 이 족은 기존 diffusion 경로(variance exploding·variance preserving)를 특수 사례로 포함한다. Optimal Transport(OT) 경로는 평균과 표준편차를 시간에 대해 선형으로 두면 두 Gaussian 사이 OT displacement에 해당하는 경로가 나온다. 이 경로의 입자는 직선·등속으로 움직여 diffusion 경로보다 회귀 목표가 단순하다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

FM 목표는 vector field $u_t$가 목표 probability path $p_t$를 생성한다고 할 때 신경망 $v_t$를 회귀시키는 손실이다: $\mathcal{L}_{FM}(\theta) = \mathbb{E}_{t, p_t(x)} \lVert v_t(x) - u_t(x) \rVert^2$. 손실이 0에 도달하면 학습된 CNF가 그 path를 생성한다. 그러나 path와 vector field의 닫힌 형태를 모르므로 그대로는 계산할 수 없다.

Conditional 구성은 데이터 sample $x_1$마다 conditional path $p_t(x \mid x_1)$를 두어 $t=0$일 때 단순 noise, $t=1$일 때 그 sample 주변에 집중된 분포가 되게 한다. 이들을 데이터 분포 $q(x_1)$로 marginalize하면 marginal path가 나오고 $t=1$일 때 데이터 분포를 근사한다. conditional vector field들을 적절히 가중 평균한 marginal field가 이 marginal path를 정확히 생성한다(Theorem 1). 이것이 핵심 관찰이다.

CFM 목표 $\mathcal{L}_{CFM}(\theta) = \mathbb{E}_{t, q(x_1), p_t(x \mid x_1)} \lVert v_t(x) - u_t(x \mid x_1) \rVert^2$는 marginal field가 여전히 intractable하지만 conditional 목표는 sample 단위로 쉽게 추정된다는 점을 이용한다. FM과 CFM의 gradient가 같다는 정리 덕분에 CFM만 최소화해도 원래 목표를 최적화한다.

Gaussian 경로의 vector field는 conditional path가 Gaussian이면 그것을 생성하는 유일한 field가 닫힌 형태라는 정리(Theorem 3)로 주어진다: $u_t(x \mid x_1) = \frac{\sigma'_t(x_1)}{\sigma_t(x_1)}(x - \mu_t(x_1)) + \mu'_t(x_1)$. 여기에 평균과 표준편차를 어떻게 두느냐로 경로가 갈린다. diffusion 경로는 VE·VP diffusion을 이 틀의 특정 평균·표준편차 선택으로 재현한다. diffusion 경로를 FM 목표와 결합하면 score matching보다 학습이 더 안정적이다. OT 경로는 평균과 표준편차가 선형($\mu_t(x)=tx_1$, $\sigma_t(x)=1-(1-\sigma_{min})t$)이면 conditional flow가 두 Gaussian 사이 OT displacement map이 된다. 입자는 직선으로 움직이고 conditional field는 모든 $t \in [0,1]$에서 정의된다. diffusion 경로는 유한 시간에 진짜 noise에 도달하지 못한다.

샘플링은 noise $x_0 \sim \mathcal{N}(0, I)$에서 시작해 학습된 vector field로 ODE를 풀어 $t$가 0에서 1로 흐르면 sample이 나온다. 기성 ODE solver(Euler·midpoint·RK4)를 그대로 쓴다. NFE는 solver가 한 sample을 만들 때 vector field를 호출한 횟수로, 생성 비용의 척도다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

같은 U-Net 아키텍처(Dhariwal & Nichol 2021)를 DDPM·Score Matching·ScoreFlow 손실과 FM 손실로 각각 학습해 비교했다(Table 1). NLL은 bits per dimension, sample 품질은 FID, 생성 비용은 NFE로 잰다.

CIFAR-10과 ImageNet 32·64에서 FM-OT가 세 지표 모두에서 diffusion 계열 baseline을 일관되게 앞선다. 예를 들어 ImageNet 64×64에서 FM-OT는 FID 14.45·NFE 138로, DDPM(17.36·264)·ScoreFlow(24.95·601)보다 품질이 높고 호출 수가 적다. ImageNet 128×128에서는 FM-OT의 FID 20.9로, 여러 GAN baseline(BigGAN 25.3 등)을 앞서는 state-of-the-art급 결과다.

학습 속도 면에서 FM-OT는 diffusion baseline보다 빠르게 수렴한다. ImageNet-128에서 Dhariwal & Nichol이 4.36M iteration을 쓴 반면 FM은 500K iteration(약 33% 적은 image throughput)으로 학습했다. 샘플링 효율에서도 고정 스텝 solver에서 FM-OT는 diffusion 대비 약 60%의 NFE만으로 같은 수치 오차에 도달하고 매우 낮은 NFE에서도 준수한 FID를 낸다. conditional 생성인 super-resolution에서는 64×64를 256×256으로 업샘플링할 때 FM-OT가 SR3보다 FID·IS를 크게 개선하면서 PSNR·SSIM은 비슷한 수준을 유지한다(Table 2).

diffusion 경로에 FM을 써도 score matching보다 안정적이었고 OT 경로로 바꿀 때 추가 이득이 나왔다. 이 결과는 이득의 원천이 목표 함수와 경로 선택이라는 두 축으로 나뉨을 뜻한다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

실험은 이미지 도메인(CIFAR-10·ImageNet)에 한정된다. conditional flow가 OT displacement로 최적이라 해도 marginal vector field가 optimal transport 해라는 뜻은 아니다. 저자들도 marginal field가 비교적 단순할 것으로 기대할 뿐이라고 밝힌다. CIFAR-10 FID가 기존 연구보다 다소 높은데 쓰인 아키텍처가 CIFAR-10에 최적화되지 않은 탓으로 본다. 향후 방향으로 isotropic Gaussian을 넘어선 non-isotropic Gaussian이나 더 일반적인 kernel 기반 경로를 제안한다.

## 6. 관련 연구 (Related Work)

CNF는 Chen et al. (2018)의 neural ODE 기반 continuous normalizing flow가 출발점이다. 기존 학습은 ODE 시뮬레이션 비용이 커 고차원 확장이 어려웠다. Simulation-free CNF로는 Rozen et al. (2021), Ben-Hamu et al. (2022)이 목표 경로를 직접 설계했으나 각각 고차원 적분 추정 곤란과 미니배치 편향 gradient 문제가 있었다. FM은 편향 없는 gradient로 고차원까지 확장된다. Diffusion과 score matching 흐름에서는 Sohl-Dickstein et al. (2015), Ho et al. (2020, DDPM), Song et al. (2020b, 2021)의 denoising score matching이 CFM의 착안점이다. FM은 이를 vector field 회귀로 일반화해 diffusion 경로 밖으로 나간다. 동시대 연구로 Liu et al. (2022, Rectified Flow), Albergo & Vanden-Eijnden (2022, Stochastic Interpolants)이 유사한 conditional 목표에 독립적으로 도달했다.

## 7. 용어집 (Glossary)

- **Flow Matching (FM)**: 목표 vector field에 신경망을 회귀시켜 CNF를 시뮬레이션 없이 학습하는 방법.
- **Conditional Flow Matching (CFM)**: 데이터 sample 하나에 조건부인 vector field를 회귀 목표로 삼는 tractable 버전. FM과 gradient가 같다.
- **continuous normalizing flow (CNF)**: 신경망 vector field로 정의된 ODE를 따라 noise를 데이터로 변형하는 생성 모델.
- **vector field**: 각 시점·위치에서 입자의 이동 방향·속도를 지정하는 함수.
- **probability path**: 시점 $t$에 따라 noise 분포에서 데이터 분포로 이어지는 밀도들의 궤적.
- **optimal transport (OT) path**: 평균·표준편차가 시간에 선형인 경로. 입자가 직선·등속으로 움직여 회귀가 단순하다.
- **score function**: $\nabla \log p_t(x)$. diffusion·score matching의 회귀 목표. FM은 이를 vector field로 대체한다.
- **NFE (number of function evaluations)**: ODE solver가 한 sample 생성에 vector field를 호출한 횟수. 생성 비용의 척도.
- **NLL / bits per dimension (BPD)**: 밀도 추정 품질 지표(낮을수록 좋음).
- **FID (Frechet Inception Distance)**: 생성 sample 품질 지표(낮을수록 좋음).

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig02 | 6 | "diffusion score function vs OT vector field — OT는 방향이 일정" | caption-region | ★ wiki 권장 (method 핵심 개념) |
| fig03 | 6 | "diffusion 궤적(굽음) vs OT 궤적(직선)" | caption-region | ★ wiki 권장 (직관) |
| fig04 | 7 | "2D checkerboard 밀도 궤적 + 저-NFE 샘플링" | caption-region | ★ wiki 권장 (method+result) |
| tab01 | 8 | "CIFAR-10·ImageNet NLL/FID/NFE 벤치마크" | table-region | ★ wiki 권장 (핵심 result) |
| fig01 | 1 | "무조건 ImageNet-128 생성 샘플" | caption-region | ○ (hero 이미지) |
| fig07 | 9 | "NFE 대비 오차·품질 — 샘플링 효율" | caption-region | ○ (result 보강) |
| fig06 | 8 | "ImageNet-64 샘플 경로 비교" | caption-region | (확인 필요) |
| fig05 | 8 | "학습 중 FID 곡선" | column-band | (확인 필요, 저신뢰) |
| fig08–fig17, tab02–tab04 | 19–28 | Appendix 부수 도식·표 | — | (아카이브) |
