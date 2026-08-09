---
title: "Scalable Diffusion Models with Transformers"
type: paper
year: 2022
category: llms
source: peebles-2022-scalable-diffusion-models-with-transformers.md
raw_path: /home/sguys99/project/ai-wiki/raw/papers/peebles-2022-scalable-diffusion-models-with-transformers.pdf
raw_filename: "peebles-2022-scalable-diffusion-models-with-transformers.pdf"
source_collection: external
authors: "William Peebles (UC Berkeley), Saining Xie (New York University)"
arxiv_id: "2212.09748"
url: "https://www.wpeebles.com/DiT"
tags: [llms, diffusion, transformer, image-generation, scaling-law]
figures:
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/peebles-2022-scalable-diffusion-models-with-transformers/fig02.png
    raw: raw/papers/peebles-2022-scalable-diffusion-models-with-transformers-figures/fig02.png
    caption: "버블 넓이는 모델 Gflops. 왼쪽: Gflops가 커질수록 FID가 낮아진다. 오른쪽: DiT-XL/2가 ADM·LDM 등 기존 U-Net 모델을 앞선다 (paper Figure 2)"
    page: 2
    bbox_norm: [0.0721, 0.0833, 0.9005, 0.343]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/peebles-2022-scalable-diffusion-models-with-transformers/fig03.png
    raw: raw/papers/peebles-2022-scalable-diffusion-models-with-transformers-figures/fig03.png
    caption: "DiT 아키텍처. 왼쪽: latent를 patch로 나눠 DiT block 여러 개로 처리. 오른쪽: conditioning을 넣는 세 가지 block 변형 — adaLN-Zero가 가장 좋다 (paper Figure 3)"
    page: 3
    bbox_norm: [0.0721, 0.0695, 0.9148, 0.3625]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/peebles-2022-scalable-diffusion-models-with-transformers/fig04.png
    raw: raw/papers/peebles-2022-scalable-diffusion-models-with-transformers-figures/fig04.png
    caption: "patchify 입력 규격. I×I×C latent를 p×p patch로 잘라 T=(I/p)² 개의 token 시퀀스로 만든다. patch가 작을수록 token 수가 늘어 Gflops가 커진다 (paper Figure 4)"
    page: 4
    bbox_norm: [0.5142, 0.0833, 0.8812, 0.3222]
    strategy: caption-region
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/peebles-2022-scalable-diffusion-models-with-transformers/fig05.png
    raw: raw/papers/peebles-2022-scalable-diffusion-models-with-transformers-figures/fig05.png
    caption: "conditioning 방식 비교 (XL/2 기준). adaLN-Zero가 in-context·cross-attention·adaLN보다 FID가 낮다 (paper Figure 5)"
    page: 5
    bbox_norm: [0.0914, 0.0833, 0.4584, 0.2998]
    strategy: caption-region
    curated: true
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/peebles-2022-scalable-diffusion-models-with-transformers/fig08.png
    raw: raw/papers/peebles-2022-scalable-diffusion-models-with-transformers-figures/fig08.png
    caption: "Transformer Gflops와 FID-50K의 상관계수 −0.93. 연산량이 품질을 강하게 결정한다 (paper Figure 8)"
    page: 8
    bbox_norm: [0.0721, 0.0803, 0.4777, 0.3192]
    strategy: caption-region
    curated: true
  - id: tab01
    label: Table 1
    kind: table
    file: assets/peebles-2022-scalable-diffusion-models-with-transformers/tab01.png
    raw: raw/papers/peebles-2022-scalable-diffusion-models-with-transformers-figures/tab01.png
    caption: "DiT 모델 구성 (ViT를 따름). S/B/L/XL의 layer 수·hidden size·head 수·Gflops (paper Table 1)"
    page: 5
    bbox_norm: [0.5075, 0.0838, 0.8912, 0.1729]
    strategy: table-region
    curated: true
  - id: tab02
    label: Table 2
    kind: table
    file: assets/peebles-2022-scalable-diffusion-models-with-transformers/tab02.png
    raw: raw/papers/peebles-2022-scalable-diffusion-models-with-transformers-figures/tab02.png
    caption: "ImageNet 256×256 class-conditional 벤치마크. DiT-XL/2-G가 FID 2.27로 SOTA (paper Table 2)"
    page: 9
    bbox_norm: [0.0352, 0.0774, 0.4848, 0.3076]
    strategy: manual
    curated: true
---

## 요약 (Summary)

DiT는 diffusion model의 backbone을 convolution U-Net에서 순수 Transformer로 바꾼 아키텍처다. diffusion model은 노이즈를 조금씩 걷어내며 이미지를 만드는 생성 모델이다. 이 논문 전까지는 거의 예외 없이 U-Net을 backbone으로 썼다. Peebles와 Xie는 이 관성이 성능의 필수 조건이 아님을 보인다. VAE로 압축한 latent를 patch token으로 바꿔 표준 Transformer에 넣으면 U-Net 없이도 같은 일을 하고 scaling 이점까지 얻는다.

핵심 발견은 연산량과 품질의 관계다. 아키텍처 복잡도를 파라미터 수가 아니라 forward pass 한 번의 연산량인 Gflops로 재면 Gflops와 FID의 상관계수가 −0.93이다. 모델을 키우든 patch를 잘게 쪼개 token을 늘리든 Gflops를 올리는 쪽이 곧 FID를 낮추는 쪽이다. 이 관계를 끝까지 밀어붙인 DiT-XL/2는 ImageNet 256×256에서 FID 2.27로 당시 SOTA를 기록했다.

## 주요 기여 (Key Contributions)

- U-Net을 대체하는 순수 Transformer backbone DiT를 latent diffusion 틀 안에서 설계했다.
- 복잡도 지표로 Gflops를 채택하고 Gflops↔FID 상관 −0.93으로 "연산량이 품질을 결정한다"는 scaling 성질을 실증했다.
- conditioning 주입 방식 네 가지를 ablation해 adaLN-Zero가 최선임을 보였다.
- DiT-XL/2가 ImageNet 256×256에서 FID 2.27, 512×512에서 FID 3.04로 기존 diffusion model을 모두 앞섰다.

![[assets/peebles-2022-scalable-diffusion-models-with-transformers/fig02.png]]
*Figure 2: 버블 넓이는 모델 Gflops. 왼쪽은 Gflops 증가에 따른 FID 개선, 오른쪽은 DiT-XL/2가 ADM·LDM을 앞서는 비교 (Peebles 2022, p.2)*

## 방법론 및 아키텍처 (Methodology and Architecture)

DiT는 픽셀이 아니라 latent에서 학습한다. 픽셀 공간 diffusion은 연산이 너무 비싸므로 LDM처럼 먼저 VAE로 이미지를 압축한다. 256×256 이미지는 32×32×4 latent가 된다. VAE는 고정한 채 diffusion은 이 latent만 다룬다.

latent를 Transformer에 넣으려면 token 시퀀스로 바꿔야 한다. 이 과정이 patchify다. patchify는 ViT처럼 latent를 p×p patch로 잘라 각 patch를 하나의 token으로 임베딩한다. I×I latent를 patch size p로 자르면 T=(I/p)² 개 token이 나오므로 patch를 작게 잡을수록 token 수가 제곱으로 불어나고 그만큼 Gflops가 커진다. 논문은 p ∈ {2, 4, 8}을 쓴다. `DiT-XL/2`처럼 모델 등급 뒤에 patch size를 붙여 표기한다.

![[assets/peebles-2022-scalable-diffusion-models-with-transformers/fig04.png]]
*Figure 4: patchify 입력 규격. p×p patch가 T=(I/p)² 개 token이 되며, patch가 작을수록 token이 많아진다 (Peebles 2022, p.4)*

diffusion model은 timestep t와 class label y를 매 block에 넣어야 한다. DiT는 이 조건을 표준 ViT block에 주입하는 방식을 네 갈래로 나눠 비교한다. in-context는 조건을 별도 token으로 이어 붙인다. cross-attention 방식은 self-attention 뒤에 조건을 받는 cross-attention을 더한다. adaLN은 layer norm의 scale·shift를 조건에서 회귀하는 방식이다. adaLN-Zero는 여기에 residual 직전의 dimension별 scaling α까지 회귀한다. 단, 그 α를 0으로 초기화해 학습 초기에 block이 항등 함수가 되게 만든다.

![[assets/peebles-2022-scalable-diffusion-models-with-transformers/fig03.png]]
*Figure 3: DiT 전체 구조(왼쪽)와 conditioning block 변형(오른쪽). adaLN-Zero가 기본값이다 (Peebles 2022, p.3)*

네 방식 중 adaLN-Zero가 FID를 가장 낮췄고 추가 연산 비용도 가장 작았다. 그래서 이후 실험은 전부 adaLN-Zero를 기본으로 삼는다.

![[assets/peebles-2022-scalable-diffusion-models-with-transformers/fig05.png]]
*Figure 5: conditioning 방식 ablation. adaLN-Zero가 나머지 세 방식보다 FID가 낮다 (Peebles 2022, p.5)*

모델 크기는 ViT 관행을 따라 S·B·L·XL 네 등급으로 나눈다. 여기에 patch size를 곱해 총 12가지 설정을 만들고 전부 학습해 scaling 곡선을 그린다. 학습 목표는 표준 DDPM 그대로다 — noise 예측 network를 단순 MSE로 학습하고 분산은 전체 변분 하한으로 함께 학습한다. 샘플 품질은 classifier-free guidance로 끌어올린다. 이는 조건 있는 예측과 조건 없는 예측의 차이를 scale s만큼 증폭해 조건 충실도를 높이는 기법이다. 표기의 `-G` 접미사가 guidance를 적용한 결과를 뜻한다.

![[assets/peebles-2022-scalable-diffusion-models-with-transformers/tab01.png]]
*Table 1: DiT 모델 구성. S/B/L/XL의 layer 수, hidden size, head 수, Gflops (Peebles 2022, p.5)*

## 결과 (Results)

12개 설정을 400K step까지 학습해 Gflops와 FID를 찍으면 상관계수가 −0.93이다. Gflops가 품질을 좌우한다는 이 결과가 논문의 중심이다. 파라미터 수는 이만큼 설명력이 없다. 같은 파라미터라도 token을 늘려 Gflops를 키우면 FID가 내려가기 때문이다.

![[assets/peebles-2022-scalable-diffusion-models-with-transformers/fig08.png]]
*Figure 8: Transformer Gflops와 FID-50K의 상관계수 −0.93 (Peebles 2022, p.8)*

이 관계를 끝까지 밀어붙인 DiT-XL/2-G(guidance cfg=1.50)는 ImageNet 256×256에서 FID 2.27을 기록했다. 직전 최고인 LDM-4-G(3.60)를 크게 앞서고 StyleGAN-XL(2.30)도 넘어선 수치다. 512×512에서도 FID 3.04로 ADM-U(3.85)를 앞선다. 연산 효율도 좋다. DiT-XL/2는 118.6 Gflops로 픽셀 공간 모델 ADM-U(2813 Gflops)보다 훨씬 적은 연산으로 더 나은 품질을 낸다.

![[assets/peebles-2022-scalable-diffusion-models-with-transformers/tab02.png]]
*Table 2: ImageNet 256×256 class-conditional 벤치마크. DiT-XL/2-G가 FID 2.27로 SOTA (Peebles 2022, Table 2)*

반대 실험도 이 결론을 뒷받침한다. 작은 모델에 sampling step을 크게 늘려 test-time 연산을 부어도 연산을 적게 쓰는 큰 모델을 따라잡지 못한다. sampling 연산은 model 연산을 대체하지 못한다. 품질은 결국 backbone의 연산 용량에서 나온다.

## 한계와 의의 (Limitations and Significance)

scaling 곡선이 아직 포화되지 않아 더 큰 모델과 더 많은 token으로 밀어붙일 여지가 남는다. 실험은 class-conditional 생성에 한정된다. VAE를 고정으로 두므로 latent 표현 품질은 별도 문제로 남는다.

결론에서 예고한 방향은 그대로 현실이 됐다. 저자들은 DiT를 DALL·E 2나 Stable Diffusion 같은 text-to-image 모델의 drop-in backbone으로 쓰는 방향을 제시했다. 이후 Stable Diffusion 3의 MMDiT와 Sora가 실제로 Transformer backbone을 채택하면서 DiT는 대규모 생성 모델의 표준 backbone으로 자리 잡았다.

## 관련 페이지 (Related Pages)

- [[overviews/glossary-llms]] — 일반 학습·아키텍처 용어 canonical 표기
