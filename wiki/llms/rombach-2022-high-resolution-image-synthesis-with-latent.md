---
title: "High-Resolution Image Synthesis with Latent Diffusion Models"
type: paper
year: 2022
category: llms
source: rombach-2022-high-resolution-image-synthesis-with-latent.md
raw_path: raw/papers/rombach-2022-high-resolution-image-synthesis-with-latent.pdf
raw_filename: "rombach-2022-high-resolution-image-synthesis-with-latent.pdf"
source_collection: external
authors: "Robin Rombach, Andreas Blattmann, Dominik Lorenz, Patrick Esser, Björn Ommer"
arxiv_id: "2112.10752"
url: "https://arxiv.org/abs/2112.10752"
tags: [latent-diffusion, diffusion-model, generative-model, autoencoder, cross-attention, text-to-image, stable-diffusion]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/rombach-2022-high-resolution-image-synthesis-with-latent/fig01.png
    raw: raw/papers/rombach-2022-high-resolution-image-synthesis-with-latent-figures/fig01.png
    caption: "다운샘플링을 덜 공격적으로 할 때 재구성 품질 상한 — f=4 autoencoder가 DALL-E(f=8)·VQGAN(f=16)보다 낮은 R-FID"
    page: 1
    bbox_norm: [0.4953, 0.2328, 0.9001, 0.397]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/rombach-2022-high-resolution-image-synthesis-with-latent/fig02.png
    raw: raw/papers/rombach-2022-high-resolution-image-synthesis-with-latent-figures/fig02.png
    caption: "rate-distortion 곡선 — autoencoder가 담당하는 perceptual compression 구간과 diffusion이 담당하는 semantic compression 구간"
    page: 2
    bbox_norm: [0.5342, 0.0833, 0.8612, 0.2837]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/rombach-2022-high-resolution-image-synthesis-with-latent/fig03.png
    raw: raw/papers/rombach-2022-high-resolution-image-synthesis-with-latent-figures/fig03.png
    caption: "LDM 전체 아키텍처 — pixel space의 autoencoder, latent space의 denoising UNet, cross-attention conditioning"
    page: 4
    bbox_norm: [0.5006, 0.0854, 0.901, 0.2398]
    strategy: caption-region
    curated: true
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/rombach-2022-high-resolution-image-synthesis-with-latent/fig06.png
    raw: raw/papers/rombach-2022-high-resolution-image-synthesis-with-latent-figures/fig06.png
    caption: "다운샘플링 계수 f별 학습 진행에 따른 FID·Inception Score (ImageNet class-conditional, 2M steps)"
    page: 6
    bbox_norm: [0.0721, 0.3774, 0.4777, 0.4846]
    strategy: caption-region
    curated: false
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/rombach-2022-high-resolution-image-synthesis-with-latent/fig07.png
    raw: raw/papers/rombach-2022-high-resolution-image-synthesis-with-latent-figures/fig07.png
    caption: "f별 sampling throughput 대비 FID (CelebA-HQ·ImageNet) — DDIM step 수를 바꿔가며 측정, LDM-4·8이 우세"
    page: 6
    bbox_norm: [0.0721, 0.5968, 0.4777, 0.7048]
    strategy: caption-region
    curated: true
  - id: tab01
    label: Table 1
    kind: table
    file: assets/rombach-2022-high-resolution-image-synthesis-with-latent/tab01.png
    raw: raw/papers/rombach-2022-high-resolution-image-synthesis-with-latent-figures/tab01.png
    caption: "unconditional image synthesis 평가지표 (크롭이 인접한 Table 2 영역을 담고 있어 확인 필요)"
    page: 6
    bbox_norm: [0.4949, 0.6214, 0.9005, 0.7252]
    strategy: table-region
    low_confidence: true
    curated: false
  - id: tab02
    label: Table 2
    kind: table
    file: assets/rombach-2022-high-resolution-image-synthesis-with-latent/tab02.png
    raw: raw/papers/rombach-2022-high-resolution-image-synthesis-with-latent-figures/tab02.png
    caption: "text-conditional image synthesis on MS-COCO — LDM-KL-8-G FID 12.63, 1.45B params"
    page: 6
    bbox_norm: [0.4949, 0.6214, 0.9005, 0.7252]
    strategy: table-region
    low_confidence: true
    curated: false
  - id: tab03
    label: Table 3
    kind: table
    file: assets/rombach-2022-high-resolution-image-synthesis-with-latent/tab03.png
    raw: raw/papers/rombach-2022-high-resolution-image-synthesis-with-latent-figures/tab03.png
    caption: "class-conditional ImageNet 비교 — LDM-4-G FID 3.60·IS 247.67로 ADM-G(FID 4.59) 상회, 파라미터는 더 적음"
    page: 7
    bbox_norm: [0.4949, 0.0837, 0.9005, 0.1564]
    strategy: table-region
    curated: true
  - id: tab18
    label: Table 18
    kind: table
    file: assets/rombach-2022-high-resolution-image-synthesis-with-latent/tab18.png
    raw: raw/papers/rombach-2022-high-resolution-image-synthesis-with-latent-figures/tab18.png
    caption: "학습·추론 연산량 비교 — pixel diffusion 대비 LDM의 비용 절감"
    page: 28
    bbox_norm: [0.0923, 0.1232, 0.8803, 0.4272]
    strategy: table-region
    curated: false
---

## 요약 (Summary)

diffusion model은 이미지에 조금씩 noise를 더했다가 그 과정을 거꾸로 되돌리도록 학습하는 생성 모델이다. 당시 image synthesis에서 최고 품질을 냈지만 수백 GPU-day가 드는 학습과 느린 sampling이 발목을 잡았다. 비용의 근원은 모델이 RGB pixel 공간에서 직접 돌아간다는 데 있다.

Latent Diffusion Model(LDM)은 diffusion을 pixel space가 아니라 미리 학습해 둔 autoencoder의 저차원 latent space에서 돌린다. 눈에 잘 안 보이는 세부는 autoencoder가 걷어내고 diffusion은 의미 있는 구조만 배우면 되므로 품질을 유지하면서 학습·추론 비용이 크게 준다. 여기에 cross-attention conditioning을 붙여 text-to-image·layout-to-image까지 하나의 틀로 다뤘다. 이 구조는 이후 대규모 text-to-image 시스템의 표준 틀이 됐고 같은 CompVis 계열에서 Stable Diffusion으로 이어졌다.

![[assets/rombach-2022-high-resolution-image-synthesis-with-latent/fig01.png]]
*Figure 1: 다운샘플링을 덜 공격적으로 할수록 재구성 품질 상한이 올라간다. f=4 autoencoder는 DALL-E(f=8)·VQGAN(f=16)보다 낮은 R-FID를 낸다 (Rombach 2022, p.1)*

## 주요 기여 (Key Contributions)

- latent space에서 돌리는 diffusion: autoencoder가 만든 저차원 latent에서 diffusion model을 학습한다. transformer 기반 autoregressive 접근보다 고차원 데이터로 매끄럽게 확장되고 공격적 압축 없이도 충실한 재구성을 얻는다.
- compute 절감: pixel 기반 diffusion 대비 학습·추론 비용을 크게 줄이면서도 여러 과제에서 경쟁력 있는 품질을 유지한다.
- 재구성과 생성의 분리: autoencoder 단계를 한 번만 학습해 고정하므로 latent space 정규화가 거의 필요 없고 재구성이 매우 충실하다. 재구성과 latent prior 학습을 동시에 저울질하던 LSGM 계열의 어려움을 피한다.
- cross-attention conditioning: class label·text·layout 등 다양한 modality를 하나의 conditioning 틀에서 다룬다.
- convolutional 적용: 조건이 공간적으로 정렬된 과제에서는 모델을 convolutional하게 굴려 ~1024² 크기의 큰 이미지를 일관되게 만든다.

## 방법론 및 아키텍처 (Methodology and Architecture)

LDM은 학습을 두 단계로 나눈다. 이 분리가 논문의 핵심 발상이다. 이미지 학습을 rate-distortion 관점에서 보면, 대부분의 bit는 눈에 안 보이는 고주파 세부에 쓰이고 의미 있는 구조는 그 뒤에 온다. 앞쪽 구간을 autoencoder에 맡기고 뒤쪽 구간만 diffusion에 남기는 것이 LDM의 설계다.

![[assets/rombach-2022-high-resolution-image-synthesis-with-latent/fig02.png]]
*Figure 2: 학습을 perceptual compression과 semantic compression 두 국면으로 본다. 고주파 세부를 걷어내는 앞 구간은 autoencoder가, 의미·개념 구성을 배우는 뒤 구간은 diffusion(LDM)이 맡는다 (Rombach 2022, p.2)*

첫 단계는 perceptual compression을 맡는 autoencoder다. encoder가 이미지를 다운샘플링 계수 f = 2^m 만큼 줄여 latent z를 만들고 decoder가 z에서 이미지를 복원한다. latent가 지나치게 고분산이 되지 않도록 두 가지 정규화를 실험한다. KL-reg는 latent를 표준정규 쪽으로 살짝 끌어당기는 약한 KL penalty로 VAE와 비슷하다. VQ-reg는 decoder 안에 vector quantization 레이어를 두어 VQGAN과 비슷하다. 이전 두 단계 접근이 1D로 펼친 discrete latent를 autoregressive하게 모델링한 것과 달리, LDM의 latent는 2차원 구조를 유지해 이미지 고유의 inductive bias를 살린다.

두 번째 단계는 이 latent space에서 diffusion model을 학습하는 것이다. 학습 목표는 각 시점 t에서 더해진 noise ε를 UNet backbone ε_θ가 맞히는 것으로, 손실은 L_LDM = E[‖ε − ε_θ(z_t, t)‖²]다. autoencoder를 한 번만 학습해 고정하면 같은 latent space를 여러 diffusion model 학습이나 다른 과제에 재사용할 수 있다.

![[assets/rombach-2022-high-resolution-image-synthesis-with-latent/fig03.png]]
*Figure 3: LDM 전체 구조. 왼쪽 pixel space의 autoencoder(E/D), 가운데 latent space의 denoising UNet, 오른쪽 conditioning을 cross-attention으로 주입하는 경로 (Rombach 2022, p.4)*

conditioning은 cross-attention으로 처리한다. 조건 y(text prompt, semantic map 등)를 domain-specific encoder τ_θ가 중간 표현으로 바꾸고 이를 UNet 중간 레이어에 cross-attention으로 주입한다. attention의 query는 UNet 쪽 표현에서, key·value는 τ_θ(y)에서 나온다. text-to-image에서는 τ_θ를 Transformer로 두어 language prompt를 처리한다. 조건이 공간적으로 정렬된 과제(super-resolution, inpainting)에서는 조건 정보를 입력에 concatenate한다.

## 결과 (Results)

다운샘플링 계수 f ∈ {1, 2, 4, 8, 16, 32}(LDM-f, LDM-1은 pixel diffusion)를 같은 연산 예산으로 비교했다. f가 너무 작으면 perceptual compression 부담이 diffusion에 몰려 학습이 느리고 너무 크면 정보 손실로 품질이 일찍 정체된다. LDM-4~16이 효율과 충실도의 균형점이다. 2M step 학습 뒤 LDM-1과 LDM-8 사이 FID 격차는 38에 달했다.

![[assets/rombach-2022-high-resolution-image-synthesis-with-latent/fig07.png]]
*Figure 7: sampling throughput 대비 FID (CelebA-HQ 왼쪽, ImageNet 오른쪽). DDIM step 수를 바꿔가며 측정했고 LDM-4·8이 pixel 기반 LDM-1보다 훨씬 낮은 FID를 더 빠른 속도로 낸다 (Rombach 2022, p.6)*

unconditional 생성에서는 CelebA-HQ FID 5.11로 당시 최고 성능을 기록했다. FFHQ 4.98, LSUN-Churches 4.02, LSUN-Bedrooms 2.95를 냈다. Bedrooms에서는 ADM에 근접하되 파라미터는 절반, 학습 자원은 1/4만 썼다. LAION-400M으로 학습한 1.45B 파라미터 KL-reg LDM은 MS-COCO text-to-image에서 classifier-free guidance를 적용해 FID 12.63, Inception Score 30.29를 냈다. 훨씬 큰 GLIDE(6B)·Make-A-Scene(4B)와 대등하면서 파라미터는 크게 적었다.

![[assets/rombach-2022-high-resolution-image-synthesis-with-latent/tab03.png]]
*Table 3: class-conditional ImageNet 비교. LDM-4-G가 FID 3.60·IS 247.67로 당시 최고 diffusion model이던 ADM-G(FID 4.59, 608M)를 400M 파라미터로 앞섰다 (Rombach 2022, p.7)*

## 한계 (Limitations)

- sampling 속도: DDIM 같은 sampler로 완화되긴 해도 순차적 denoising이라 단일 forward pass인 GAN보다는 여전히 느리다.
- 재구성 상한: autoencoder의 압축이 달성 가능한 품질의 상한을 정한다. 픽셀 단위 정확도가 중요한 과제에서는 이 재구성 병목이 한계가 되고 f를 너무 키우면 정보 손실로 충실도가 떨어진다.
- 과제별 f 조정 필요: ImageNet처럼 복잡한 데이터셋은 압축률을 낮춰야 품질이 유지된다. 단일 f가 모든 과제에 최적은 아니다.

## 관련 페이지 (Related Pages)

- [[llms/peebles-2022-scalable-diffusion-models-with-transformers]] — LDM의 denoising UNet backbone을 순수 Transformer로 교체한 DiT. LDM이 연 latent diffusion 틀 위에서 backbone을 바꾼 후속 계보이며 Stable Diffusion 3·Sora로 이어진다.
- [[llms/mentzer-2023-finite-scalar-quantization-vq-vae-made]] — LDM의 VQ-reg autoencoder가 쓰는 vector quantization을 단순화한 FSQ. latent tokenizer 계보에서 맞닿는다.
- [[overviews/glossary-llms]] — pre-training·fine-tuning·임베딩 등 모델 학습 일반 용어의 canonical 표기.
