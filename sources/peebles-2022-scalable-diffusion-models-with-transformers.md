---
title: "Scalable Diffusion Models with Transformers"
type: paper
year: 2022
category: llms
raw_path: /home/sguys99/project/ai-wiki/raw/papers/peebles-2022-scalable-diffusion-models-with-transformers.pdf
raw_filename: "peebles-2022-scalable-diffusion-models-with-transformers.pdf"
source_collection: external
authors: "William Peebles (UC Berkeley), Saining Xie (New York University)"
arxiv_id: "2212.09748"
url: "https://www.wpeebles.com/DiT"
tags: [llms, diffusion, transformer, image-generation, scaling-law]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/peebles-2022-scalable-diffusion-models-with-transformers/fig01.png
    raw: raw/papers/peebles-2022-scalable-diffusion-models-with-transformers-figures/fig01.png
    caption: "DiT-XL/2가 ImageNet 512×512·256×256에서 생성한 고품질 샘플 (paper Figure 1)"
    page: 1
    bbox_norm: [0.0714, 0.1795, 0.9009, 0.6118]
    strategy: caption-region
    curated: false
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
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/peebles-2022-scalable-diffusion-models-with-transformers/fig06.png
    raw: raw/papers/peebles-2022-scalable-diffusion-models-with-transformers-figures/fig06.png
    caption: "모델을 키우거나 patch를 작게 하면 학습 전 구간에서 FID가 개선된다 (paper Figure 6)"
    page: 6
    bbox_norm: [0.0721, 0.0833, 0.9005, 0.3329]
    strategy: caption-region
    curated: false
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/peebles-2022-scalable-diffusion-models-with-transformers/fig07.png
    raw: raw/papers/peebles-2022-scalable-diffusion-models-with-transformers-figures/fig07.png
    caption: "forward pass Gflops를 늘리면 FID가 개선된다 — 파라미터 수보다 Gflops가 품질을 잘 설명한다 (paper Figure 7)"
    page: 7
    bbox_norm: [0.0721, 0.069, 0.9019, 0.8637]
    strategy: caption-region
    curated: false
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
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/peebles-2022-scalable-diffusion-models-with-transformers/fig09.png
    raw: raw/papers/peebles-2022-scalable-diffusion-models-with-transformers-figures/fig09.png
    caption: "큰 DiT 모델이 연산 대비 더 효율적이다 (paper Figure 9)"
    page: 8
    bbox_norm: [0.4949, 0.0827, 0.9014, 0.3209]
    strategy: caption-region
    curated: false
  - id: fig10
    label: Figure 10
    kind: figure
    file: assets/peebles-2022-scalable-diffusion-models-with-transformers/fig10.png
    raw: raw/papers/peebles-2022-scalable-diffusion-models-with-transformers-figures/fig10.png
    caption: "sampling 연산을 늘려도 모델 연산 부족을 메우지 못한다 — 작은 모델은 sampling step을 늘려도 큰 모델을 못 따라간다 (paper Figure 10)"
    page: 9
    bbox_norm: [0.4949, 0.0833, 0.9005, 0.2973]
    strategy: caption-region
    curated: false
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
  - id: tab03
    label: Table 3
    kind: table
    file: assets/peebles-2022-scalable-diffusion-models-with-transformers/tab03.png
    raw: raw/papers/peebles-2022-scalable-diffusion-models-with-transformers-figures/tab03.png
    caption: "ImageNet 512×512 class-conditional 벤치마크. DiT-XL/2-G가 FID 3.04로 SOTA (paper Table 3)"
    page: 9
    bbox_norm: [0.0352, 0.3524, 0.4848, 0.5076]
    strategy: manual
    curated: false
---

## 한 줄 요약 (One-line Summary)

diffusion model의 U-Net backbone을 순수 Transformer로 갈아끼운 DiT를 제안하고 연산량(Gflops)을 키우면 FID가 꾸준히 낮아진다는 scaling 성질을 보여 ImageNet 256×256에서 FID 2.27의 SOTA를 달성한 논문.

## 1. 자료 정보 (Document Information)

- **제목**: Scalable Diffusion Models with Transformers
- **저자**: William Peebles (UC Berkeley), Saining Xie (New York University) — 1저자 작업은 Meta AI FAIR 인턴십 중 수행
- **arXiv**: 2212.09748 (2022년 12월 제출, v2 2023년 3월) · ICCV 2023 게재
- **프로젝트 페이지**: https://www.wpeebles.com/DiT

diffusion model은 노이즈를 점진적으로 제거하며 이미지를 생성하는 모델이다. 이 논문이 나오기 전까지 거의 모든 diffusion model은 convolution 기반 U-Net을 backbone으로 썼다. 저자들은 이 관성을 깨고 backbone을 통째로 Transformer로 바꿔도 되는지, 바꾸면 어떤 이득이 있는지를 실증한다.

## 2. 주요 기여 (Key Contributions)

핵심 주장은 "U-Net의 inductive bias가 diffusion model 성능에 필수가 아니다"는 것이다. backbone을 표준 Transformer로 대체해도 성능이 떨어지지 않고 오히려 다른 도메인의 scaling 관행을 그대로 가져올 수 있다는 이점이 생긴다.

- U-Net을 대신하는 순수 Transformer backbone **DiT**(Diffusion Transformer)를 latent diffusion 틀 안에서 설계했다. DiT는 latent를 patch로 나눈 token 위에서 동작한다.
- 아키텍처 복잡도를 파라미터 수가 아니라 **Gflops**(forward pass 한 번의 부동소수점 연산량)로 재고, Gflops와 FID 사이에 −0.93의 강한 상관을 확인했다. 깊이·너비를 키우거나 token을 늘려 Gflops를 올리면 FID가 일관되게 낮아진다.
- conditioning을 주입하는 block 변형 네 가지를 비교해 timestep과 class label로 normalization의 scale·shift를 조절하는 **adaLN-Zero**가 가장 좋다는 것을 ablation으로 보였다.
- 가장 큰 **DiT-XL/2**(118.6 Gflops)가 ImageNet 256×256에서 FID 2.27, 512×512에서 FID 3.04로 당시 모든 diffusion model을 앞섰다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

픽셀 공간에서 직접 diffusion을 돌리면 연산이 너무 비싸다. 그래서 DiT는 LDM(Latent Diffusion Model)처럼 먼저 VAE로 이미지를 압축한 latent 위에서 학습한다. 256×256 RGB 이미지는 32×32×4 latent로 줄어든다. VAE는 고정(frozen)이고 diffusion 학습은 이 latent만 다룬다.

latent를 token 시퀀스로 바꾸는 단계가 patchify다. ViT처럼 latent를 p×p 크기 patch로 잘라 각 patch를 하나의 token으로 임베딩한다. I×I latent를 patch size p로 자르면 T=(I/p)² 개의 token이 나온다. patch를 작게 잡을수록 token 수가 제곱으로 늘어 Gflops가 커진다. 논문은 p ∈ {2, 4, 8}을 실험한다. `DiT-XL/2`처럼 모델 크기 뒤에 patch size를 붙여 표기한다.

diffusion model은 timestep t와 class label y라는 두 조건 정보를 매 block에 넣어야 한다. DiT block은 이 conditioning을 어떻게 주입하느냐로 갈린다. 논문은 표준 ViT block에 조건을 넣는 방식을 네 가지로 나눠 비교한다.

- in-context conditioning: 조건 벡터를 별도 token으로 시퀀스에 이어 붙인다.
- cross-attention: self-attention 뒤에 조건을 key·value로 받는 cross-attention 층을 하나 더 둔다.
- adaLN(adaptive layer norm): layer norm의 scale γ와 shift β를 조건에서 회귀해 만든다.
- adaLN-Zero: adaLN에 더해 각 residual 연결 직전에 dimension별 scaling α를 하나 더 회귀한다. 이 α를 0으로 초기화해 학습 초기에 각 block이 항등 함수가 되도록 만든다.

adaLN-Zero가 FID를 가장 낮췄고 연산 추가 비용도 가장 작았다(그림 5). 이후 논문 전체는 adaLN-Zero를 기본으로 삼는다.

S·B·L·XL 네 등급은 ViT 관행을 그대로 가져와 layer 수 N, hidden size d, head 수를 정한다(표 1). 여기에 patch size 조합을 곱하면 DiT 설정이 총 12가지가 된다. 이 12개를 전부 학습해 scaling 곡선을 그린다.

학습은 표준 DDPM을 그대로 쓴다. noise 예측 network ϵθ를 단순 MSE 손실 Lsimple로 학습한다. 분산 Σθ는 전체 변분 하한으로 함께 학습한다(Nichol·Dhariwal 방식). 샘플 품질은 classifier-free guidance로 끌어올린다. 이 기법은 조건 있는 예측과 조건 없는(null) 예측의 차이를 scale s만큼 증폭해 조건에 더 충실한 샘플을 뽑는다. 표기에서 `-G` 접미사가 guidance를 적용한 결과다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

12개 설정을 400K step까지 학습한 뒤 Gflops와 FID를 찍으면 상관계수가 −0.93으로 나온다(그림 8). 품질을 결정하는 것은 Gflops다. 파라미터 수는 이만큼 잘 설명하지 못한다 — 같은 파라미터라도 token을 늘려 Gflops를 키우면 FID가 내려간다. 모델을 키우는 것과 patch를 줄이는 것 모두 Gflops를 올리는 경로다. 둘 다 학습 전 구간에서 FID를 개선한다(그림 6).

ImageNet 256×256 class-conditional 생성에서 DiT-XL/2-G(guidance cfg=1.50)는 FID 2.27을 기록해 SOTA에 오른다. 직전 최고였던 LDM-4-G(3.60)와 StyleGAN-XL(2.30)을 넘어선 수치다(표 2). 512×512에서도 FID 3.04로 ADM-U(3.85)를 앞선다(표 3). guidance 없이도 DiT-XL/2는 FID 9.62로 모든 기존 diffusion model보다 recall이 높다.

DiT-XL/2는 118.6 Gflops로, 픽셀 공간 모델인 ADM-U(2813 Gflops)나 심지어 LDM-4보다 적은 연산으로 더 나은 FID를 낸다(그림 2 오른쪽). 연산 효율에서도 앞선다.

작은 모델에 sampling step을 크게 늘려 test-time 연산을 부어도 연산을 적게 쓰는 큰 모델을 따라잡지 못한다(그림 10). sampling 연산은 model 연산을 대체하지 못한다. 품질은 backbone의 연산 용량에서 나온다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- scaling 곡선이 아직 포화되지 않아 더 큰 모델과 더 많은 token으로 계속 밀어붙일 여지가 있다고 본다.
- 이 논문은 class-conditional 생성에 한정한다. 저자들은 DiT를 DALL·E 2나 Stable Diffusion 같은 text-to-image 모델의 drop-in backbone으로 쓰는 방향을 결론에서 예고했다. 이 방향은 이후 Stable Diffusion 3(MMDiT)와 Sora에서 그대로 현실이 됐다.
- VAE를 고정으로 두므로 latent 표현 품질은 별도 문제로 남는다(표 5의 decoder ablation이 이 민감도를 일부 다룬다).

## 6. 관련 연구 (Related Work)

- **DDPM 계열**: Ho 외(2020)가 U-Net backbone을 처음 도입했고, Dhariwal·Nichol(ADM, 2021)이 U-Net 설계와 classifier guidance를 다듬어 GAN을 넘어섰다. DiT는 이 계보에서 backbone만 교체한다.
- **LDM**: Rombach 외(2022)의 latent diffusion 틀을 그대로 빌려 VAE latent 위에서 학습한다.
- **ViT**: Dosovitskiy 외(2020)의 patch 기반 Transformer 설계와 scaling 관행을 이미지 생성으로 옮긴다.
- **classifier-free guidance**: Ho·Salimans(2021)의 기법을 샘플 품질 향상에 쓴다.

## 7. 용어집 (Glossary)

이 자료 고유의 용어만 정리한다. 일반 학습·아키텍처 용어는 [[overviews/glossary-llms]]를 따른다.

| 용어 | 뜻 |
|---|---|
| DiT (Diffusion Transformer) | U-Net 대신 Transformer를 backbone으로 쓰는 diffusion model. latent patch token 위에서 동작한다 |
| patchify | latent를 p×p patch로 잘라 T=(I/p)² 개 token 시퀀스로 바꾸는 입력 처리 |
| adaLN-Zero | timestep·label로 layer norm의 scale·shift와 residual scaling α를 회귀하고 α를 0으로 초기화하는 conditioning block. DiT 기본값 |
| classifier-free guidance | 조건 있는/없는 예측 차이를 증폭해 조건 충실도를 높이는 sampling 기법. `-G` 표기 |
| Gflops | forward pass 1회의 연산량. 이 논문이 아키텍처 복잡도의 대표 지표로 삼는 값 |
| FID / sFID / IS | 생성 품질 지표. FID·sFID는 낮을수록, IS는 높을수록 좋다 |
| DiT-XL/2 표기 | 모델 등급(XL) / patch size(2) 조합 표기. 숫자가 작을수록 token이 많다 |

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 1 | DiT-XL/2 생성 샘플 (teaser) | caption-region | (확인 필요) |
| fig02 | 2 | Gflops↔FID + SOTA 비교 버블차트 | caption-region | ★ wiki 권장 (result) |
| fig03 | 3 | DiT 아키텍처 + block 변형 4종 | caption-region | ★ wiki 권장 (architecture) |
| fig04 | 4 | patchify 입력 규격 | caption-region | ★ wiki 권장 (method) |
| fig05 | 5 | conditioning 방식 ablation | caption-region | ★ wiki 권장 (method) |
| fig06 | 6 | 모델·patch scaling → FID 개선 | caption-region | (확인 필요) |
| fig07 | 7 | Gflops 증가 → FID 개선 | caption-region | (확인 필요) |
| fig08 | 8 | Gflops↔FID 상관 −0.93 | caption-region | ★ wiki 권장 (result) |
| fig09 | 8 | 큰 모델의 연산 효율 | caption-region | (확인 필요) |
| fig10 | 9 | sampling 연산 ≠ model 연산 | caption-region | (확인 필요) |
| tab01 | 5 | DiT 모델 구성 (S/B/L/XL) | table-region | ★ wiki 권장 (method) |
| tab02 | 9 | ImageNet 256×256 벤치마크 (FID 2.27) | manual | ★ wiki 권장 (result) |
| tab03 | 9 | ImageNet 512×512 벤치마크 (FID 3.04) | manual | (확인 필요) |

> 부록의 uncurated 샘플 그리드(Figure 11, 14~33)는 원본 아카이브에만 두고 frontmatter 후보에서 제외했다 — `figures.json`으로 추적 가능.
