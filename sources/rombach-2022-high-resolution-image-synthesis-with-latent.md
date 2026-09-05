---
title: "High-Resolution Image Synthesis with Latent Diffusion Models"
type: paper
year: 2022
category: llms
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

## 한 줄 요약 (One-line Summary)

diffusion model을 pixel space가 아니라 미리 학습해 둔 autoencoder의 latent space에서 돌려 품질을 유지하면서 학습·추론 비용을 크게 낮춘 Latent Diffusion Model(LDM). cross-attention conditioning으로 text-to-image·layout-to-image까지 확장했다. Stable Diffusion의 직접적 토대가 됐다.

## 1. 자료 정보 (Document Information)

- **제목**: High-Resolution Image Synthesis with Latent Diffusion Models
- **저자**: Robin Rombach, Andreas Blattmann, Dominik Lorenz (LMU Munich & IWR, Heidelberg University), Patrick Esser, Björn Ommer (Runway ML)
- **발표**: CVPR 2022 (arXiv 2112.10752, 최초 2021년 12월)
- **코드/모델**: https://github.com/CompVis/latent-diffusion
- **유형**: 논문 (생성 모델 아키텍처)

diffusion model은 이미지에 조금씩 noise를 더했다가 그 과정을 거꾸로 되돌리도록 학습하는 생성 모델이다. 당시 image synthesis에서 최고 품질을 냈지만 수백 GPU-day가 드는 학습과 느린 sampling이 발목을 잡았다. 이 논문은 그 비용의 근원을 짚고 실용적인 해법을 제시한다.

## 2. 주요 기여 (Key Contributions)

- **latent space에서 돌리는 diffusion**: RGB pixel을 직접 다루는 대신, autoencoder가 만든 저차원 latent에서 diffusion model을 학습한다. transformer 기반 autoregressive 접근보다 고차원 데이터로 더 매끄럽게 확장되고 공격적 압축 없이도 충실한 재구성을 얻는다.
- **compute 절감**: pixel 기반 diffusion 대비 학습·추론 비용을 크게 줄이면서도 여러 과제에서 경쟁력 있는 품질을 유지한다.
- **재구성과 생성의 분리**: 재구성 품질과 latent prior 학습을 동시에 저울질하던 기존 연구(LSGM 등)와 달리, autoencoder 단계를 한 번만 학습해 고정하므로 latent space에 대한 정규화가 거의 필요 없고 재구성이 매우 충실하다.
- **convolutional 적용**: super-resolution·inpainting·semantic synthesis처럼 조건이 공간적으로 정렬된 과제에서는 모델을 convolutional하게 굴려 ~1024² 크기의 큰 이미지를 일관되게 만든다.
- **cross-attention conditioning**: cross-attention 기반의 범용 conditioning 메커니즘으로 class label·text·layout 등 다양한 modality를 하나의 틀에서 다룬다.
- **모델 공개**: pretrained LDM과 autoencoder를 공개해 재사용 가능하게 했다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

LDM은 학습을 두 단계로 나눈다. 이 분리가 논문의 핵심 발상이다.

첫 단계는 perceptual compression을 맡는 autoencoder다. encoder가 이미지를 다운샘플링 계수 f = 2^m 만큼 줄여 latent z를 만들고 decoder가 z에서 이미지를 복원한다. 이 단계는 사람 눈에 잘 안 보이는 고주파 세부만 걷어내고 의미는 거의 그대로 남긴다. latent가 지나치게 고분산이 되지 않도록 두 가지 정규화를 실험한다. KL-reg는 latent를 표준정규 쪽으로 살짝 끌어당기는 약한 KL penalty로 VAE와 비슷하고 VQ-reg는 decoder 안에 vector quantization 레이어를 두어 VQGAN과 비슷하다. 이전 두 단계 접근이 1D로 펼친 discrete latent를 autoregressive하게 모델링한 것과 달리, LDM의 latent는 2차원 구조를 유지해 이미지 고유의 inductive bias를 살린다.

두 번째 단계는 이렇게 얻은 저차원 latent space에서 diffusion model을 학습하는 것이다. 학습 목표는 각 시점 t에서 더해진 noise ε를 UNet backbone ε_θ가 맞히는 것으로, latent 버전의 손실은 L_LDM = E[‖ε − ε_θ(z_t, t)‖²]이다. forward 과정이 고정돼 있어 z_t는 학습 중 encoder 출력에서 바로 얻을 수 있고 sampling으로 나온 latent는 decoder를 한 번 통과시켜 이미지로 되돌린다. UNet은 시점 t로 조건화된 형태다.

autoencoder를 한 번만 학습해 고정하면 같은 latent space를 여러 diffusion model 학습이나 완전히 다른 과제에 재사용할 수 있다. 여러 image-to-image·text-to-image 과제를 값싸게 탐색할 수 있는 이유다.

conditioning은 cross-attention으로 처리한다. 조건 y(text prompt, semantic map 등)를 domain-specific encoder τ_θ가 중간 표현으로 바꾸고 이를 UNet 중간 레이어에 cross-attention으로 주입한다. attention의 query는 UNet 쪽 표현에서, key·value는 τ_θ(y)에서 나온다. text-to-image에서는 τ_θ를 Transformer로 두어 language prompt를 처리한다. 조건이 공간적으로 정렬된 과제(super-resolution, inpainting)에서는 조건 정보를 입력에 concatenate하는 방식을 쓴다. 조건부 목표는 L_LDM = E[‖ε − ε_θ(z_t, t, τ_θ(y))‖²]이며 ε_θ와 τ_θ를 함께 최적화한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

다운샘플링 계수 f ∈ {1, 2, 4, 8, 16, 32}(LDM-f, LDM-1은 pixel diffusion)를 같은 연산 예산으로 비교했다. f가 너무 작으면(LDM-1·2) perceptual compression 부담이 diffusion에 몰려 학습이 느리고 너무 크면(LDM-32) 정보 손실로 품질이 일찍 정체된다. LDM-4~16이 효율과 충실도의 균형점이다. 2M step 학습 뒤 LDM-1과 LDM-8 사이 FID 격차는 38에 달했다. sampling throughput 대비 FID에서도 LDM-4·8이 pixel 기반을 크게 앞선다.

unconditional 생성(Table 1)에서는 CelebA-HQ에서 FID 5.11로 당시 최고 성능을 기록해 이전 likelihood 기반 모델과 GAN을 모두 앞섰다. FFHQ 4.98, LSUN-Churches 4.02, LSUN-Bedrooms 2.95를 냈고 Bedrooms에서는 ADM에 근접하되 파라미터는 절반, 학습 자원은 1/4만 썼다. Precision·Recall에서도 GAN 계열을 꾸준히 앞서 mode-covering 목표의 이점을 보였다.

LAION-400M으로 학습한 1.45B 파라미터 KL-reg LDM을 MS-COCO에서 text-to-image로 평가했다(Table 2). classifier-free guidance를 적용한 LDM-KL-8-G가 FID 12.63, Inception Score 30.29로, 훨씬 큰 GLIDE(6B)·Make-A-Scene(4B)와 대등하면서 파라미터는 크게 적었다.

class-conditional ImageNet(Table 3)에서는 LDM-4-G가 FID 3.60, IS 247.67로 당시 최고 diffusion model이던 ADM-G(FID 4.59, 608M)를 400M 파라미터로 앞섰다.

이 밖에 inpainting에서 새 최고 성능을, super-resolution(LDM-SR)에서 경쟁력 있는 결과를 냈다. 조건이 공간적으로 정렬된 과제에서는 convolutional sampling으로 학습 해상도(256²)를 넘는 megapixel 이미지를 일관되게 생성했다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **sampling 속도**: DDIM 같은 sampler로 완화되긴 해도 순차적 denoising이라 단일 forward pass인 GAN보다는 여전히 느리다.
- **재구성 상한**: autoencoder의 압축이 달성 가능한 품질의 상한을 정한다. 픽셀 단위 정확도가 중요한 과제에서는 이 재구성 병목이 한계가 된다. f를 너무 키우면 정보 손실로 충실도가 떨어진다.
- **과제별 f 조정 필요**: ImageNet처럼 복잡한 데이터셋은 압축률을 낮춰야 품질이 유지된다. 단일 f가 모든 과제에 최적은 아니다.

이 두 단계 latent 접근은 이후 대규모 text-to-image 시스템의 표준 틀이 됐다. 같은 CompVis 계열에서 Stable Diffusion으로 이어졌다.

## 6. 관련 연구 (Related Work)

- **GAN**: 고해상도 sampling은 빠르지만 최적화가 어렵고 mode collapse로 분포 전체를 담기 힘들다.
- **VAE·flow 기반 모델**: 효율적이지만 sample 품질이 GAN에 못 미쳤다.
- **autoregressive transformer(VQGAN, DALL-E)**: 압축된 discrete latent를 1D로 펼쳐 모델링한다. LDM은 latent의 2차원 구조를 살린다는 점이 다르다.
- **diffusion model(DDPM, ADM/guided diffusion)**: pixel space에서 최고 품질을 냈지만 학습·추론이 비싸다. LDM은 이를 latent space로 옮겨 비용을 낮췄다.
- **LSGM**: autoencoder와 score 기반 prior를 동시에 학습한다. LDM은 두 단계를 분리해 가중치 저울질 문제를 피한다.
- **DDIM**: 빠른 sampling을 위한 sampler로 실험 전반에 사용.
- **classifier-free guidance**: 조건부 sample 품질을 끌어올리는 데 사용.

## 7. 용어집 (Glossary)

- **Latent Diffusion Model (LDM)**: pixel space가 아닌 pretrained autoencoder의 latent space에서 학습·sampling하는 diffusion model. LDM-f는 다운샘플링 계수 f를 뜻한다(LDM-4 = f=4).
- **diffusion model (DM)**: 데이터에 점진적으로 noise를 더한 뒤 그 역과정(denoising)을 학습해 sample을 생성하는 모델.
- **perceptual compression / semantic compression**: 이미지 학습을 두 국면으로 본 구분. perceptual compression은 눈에 안 보이는 고주파 세부를 걷어내는 단계(autoencoder가 담당), semantic compression은 의미·개념 구성을 배우는 단계(diffusion이 담당).
- **KL-reg / VQ-reg**: autoencoder latent의 두 정규화 방식. KL-reg는 표준정규 쪽으로의 약한 KL penalty, VQ-reg는 decoder 내부 vector quantization.
- **cross-attention conditioning**: 조건 y를 encoder τ_θ로 표현한 뒤 UNet에 cross-attention으로 주입해 text·layout 등 다양한 modality를 다루는 방식.
- **classifier-free guidance**: 조건부·무조건부 예측을 섞어 조건 반영 강도를 조절하는 기법. 접미사 -G로 표기(LDM-4-G).
- **DDIM**: 적은 step으로 빠르게 sampling하는 결정론적 sampler.
- **FID / Inception Score (IS)**: 생성 이미지 품질 지표. FID는 낮을수록, IS는 높을수록 좋다.

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig03 | 4 | LDM 전체 아키텍처 (autoencoder + denoising UNet + cross-attention) | caption-region | ★ wiki 권장 (architecture) |
| fig02 | 2 | rate-distortion — perceptual vs semantic compression | caption-region | ★ wiki 권장 (개념) |
| fig01 | 1 | 다운샘플링 계수별 재구성 품질 상한 (PSNR·R-FID) | caption-region | ★ wiki 권장 (motivation) |
| fig07 | 6 | f별 throughput 대비 FID — LDM-4·8 우세 | caption-region | ★ wiki 권장 (효율) |
| fig06 | 6 | f별 학습 진행에 따른 FID·IS | caption-region | ○ 보조 (효율) |
| tab03 | 7 | class-conditional ImageNet — LDM-4-G FID 3.60 | table-region | ★ wiki 권장 (result) |
| tab02 | 6 | text-conditional MS-COCO — LDM-KL-8-G | table-region | ○ 보조 (result) |
| tab18 | 28 | 학습·추론 연산량 비교 | table-region | ○ 보조 (result) |
| tab01 | 6 | unconditional 평가지표 (크롭이 Table 2 영역 — 확인 필요) | table-region | (확인 필요) |

> 이 논문은 45페이지로 부록에 sample 갤러리(fig12~fig34)와 hyperparameter 표(tab12~tab17)가 많다. 전체 51건은 `figures.json`에 아카이브돼 있고 위 표는 wiki 후보로 볼 만한 것만 추렸다.
