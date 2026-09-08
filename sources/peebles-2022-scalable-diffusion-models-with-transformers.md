---
title: "Scalable Diffusion Models with Transformers"
type: paper
year: 2022
category: llms
raw_path: raw/papers/peebles-2022-scalable-diffusion-models-with-transformers.pdf
raw_filename: "peebles-2022-scalable-diffusion-models-with-transformers.pdf"
source_collection: external
authors: "William Peebles (UC Berkeley), Saining Xie (New York University)"
arxiv_id: "2212.09748"
url: "https://www.wpeebles.com/DiT"
tags: [diffusion-model, transformer, generative-model, latent-diffusion, image-generation, scaling]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/peebles-2022-scalable-diffusion-models-with-transformers/fig01.png
    raw: raw/papers/peebles-2022-scalable-diffusion-models-with-transformers-figures/fig01.png
    caption: "512×512와 256×256 해상도 DiT-XL/2 두 모델이 생성한 선별 샘플"
    page: 1
    bbox_norm: [0.0714, 0.1795, 0.9009, 0.6118]
    strategy: caption-region
    curated: false
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/peebles-2022-scalable-diffusion-models-with-transformers/fig02.png
    raw: raw/papers/peebles-2022-scalable-diffusion-models-with-transformers-figures/fig02.png
    caption: "버블 넓이는 모델 Gflops. 왼쪽은 40만 step에서 DiT 12개 설정의 Gflops와 FID-50K, 오른쪽은 DiT-XL/2-G가 ADM-U-G, LDM-4-G, LDM-8-G 등 U-Net 기반 모델보다 낮은 FID를 기록하는 비교"
    page: 2
    bbox_norm: [0.0721, 0.0833, 0.9005, 0.343]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/peebles-2022-scalable-diffusion-models-with-transformers/fig03.png
    raw: raw/papers/peebles-2022-scalable-diffusion-models-with-transformers-figures/fig03.png
    caption: "DiT 아키텍처. 왼쪽은 noised latent를 patchify해 DiT block N개로 처리하는 전체 구조, 오른쪽은 adaLN-Zero, cross-attention, in-context conditioning 세 가지 block 설계"
    page: 3
    bbox_norm: [0.0721, 0.0695, 0.9148, 0.3625]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/peebles-2022-scalable-diffusion-models-with-transformers/fig04.png
    raw: raw/papers/peebles-2022-scalable-diffusion-models-with-transformers-figures/fig04.png
    caption: "patchify 입력 규격. I×I×C latent를 p×p patch로 잘라 길이 T=(I/p)²인 토큰 시퀀스로 만든다. p가 작을수록 토큰이 늘어 Gflops가 커진다"
    page: 4
    bbox_norm: [0.5142, 0.0833, 0.8812, 0.3222]
    strategy: caption-region
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/peebles-2022-scalable-diffusion-models-with-transformers/fig05.png
    raw: raw/papers/peebles-2022-scalable-diffusion-models-with-transformers-figures/fig05.png
    caption: "DiT-XL/2의 conditioning 방식 4종 비교. adaLN-Zero가 학습 전 구간에서 in-context, cross-attention, adaLN보다 FID-50K가 낮다"
    page: 5
    bbox_norm: [0.0914, 0.0833, 0.4584, 0.2998]
    strategy: caption-region
    curated: true
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/peebles-2022-scalable-diffusion-models-with-transformers/fig06.png
    raw: raw/papers/peebles-2022-scalable-diffusion-models-with-transformers-figures/fig06.png
    caption: "DiT 12개 모델의 학습 step별 FID-50K. 윗줄은 patch size를 고정하고 모델 크기를 키운 비교, 아랫줄은 모델 크기를 고정하고 patch size를 줄인 비교"
    page: 6
    bbox_norm: [0.0721, 0.0833, 0.9005, 0.3329]
    strategy: caption-region
    curated: true
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/peebles-2022-scalable-diffusion-models-with-transformers/fig07.png
    raw: raw/papers/peebles-2022-scalable-diffusion-models-with-transformers-figures/fig07.png
    caption: "12개 DiT 모델이 같은 noise와 class label로 생성한 샘플 격자. 오른쪽으로 갈수록 Transformer가 크고 아래로 갈수록 patch가 작아 시각 품질이 좋아진다"
    page: 7
    bbox_norm: [0.0721, 0.069, 0.9019, 0.8637]
    strategy: caption-region
    curated: false
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/peebles-2022-scalable-diffusion-models-with-transformers/fig08.png
    raw: raw/papers/peebles-2022-scalable-diffusion-models-with-transformers-figures/fig08.png
    caption: "Transformer Gflops와 40만 step FID-50K의 산점도. 상관계수 -0.93으로, Gflops가 비슷하면 설정이 달라도 FID가 비슷하다"
    page: 8
    bbox_norm: [0.0721, 0.0803, 0.4777, 0.3192]
    strategy: caption-region
    curated: true
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/peebles-2022-scalable-diffusion-models-with-transformers/fig09.png
    raw: raw/papers/peebles-2022-scalable-diffusion-models-with-transformers-figures/fig09.png
    caption: "총 학습 연산량 대비 FID-50K. 큰 DiT 모델이 같은 연산량에서 더 낮은 FID에 도달하고, 작은 모델은 오래 학습해도 연산 효율이 떨어진다"
    page: 8
    bbox_norm: [0.4949, 0.0827, 0.9014, 0.3209]
    strategy: caption-region
    curated: false
  - id: fig10
    label: Figure 10
    kind: figure
    file: assets/peebles-2022-scalable-diffusion-models-with-transformers/fig10.png
    raw: raw/papers/peebles-2022-scalable-diffusion-models-with-transformers-figures/fig10.png
    caption: "샘플링 연산량 대비 FID-10K. 16 step에서 1000 step까지 샘플링 step을 늘려도 작은 모델은 큰 모델의 FID에 이르지 못한다"
    page: 9
    bbox_norm: [0.4949, 0.0833, 0.9005, 0.2973]
    strategy: caption-region
    curated: true
  - id: fig11
    label: Figure 11
    kind: figure
    file: assets/peebles-2022-scalable-diffusion-models-with-transformers/fig11.png
    raw: raw/papers/peebles-2022-scalable-diffusion-models-with-transformers-figures/fig11.png
    caption: "512×512(guidance scale 6.0)와 256×256(guidance scale 4.0) DiT-XL/2 모델의 추가 선별 샘플"
    page: 12
    bbox_norm: [0.0714, 0.0956, 0.9009, 0.528]
    strategy: caption-region
    curated: false
  - id: fig12
    label: Figure 12
    kind: figure
    file: assets/peebles-2022-scalable-diffusion-models-with-transformers/fig12.png
    raw: raw/papers/peebles-2022-scalable-diffusion-models-with-transformers-figures/fig12.png
    caption: "FID, sFID, IS, Precision, Recall 다섯 지표의 scaling 추이. 왼쪽은 학습 연산량 대비 곡선, 오른쪽은 40만 step에서 Transformer Gflops와의 상관"
    page: 14
    bbox_norm: [0.0721, 0.083, 0.9005, 0.8222]
    strategy: caption-region
    curated: false
  - id: fig13
    label: Figure 13
    kind: figure
    file: assets/peebles-2022-scalable-diffusion-models-with-transformers/fig13.png
    raw: raw/papers/peebles-2022-scalable-diffusion-models-with-transformers-figures/fig13.png
    caption: "DiT 전 모델의 학습 손실 곡선. Gflops가 큰 모델일수록 손실이 빨리 내려가고 더 낮은 값에서 포화한다"
    page: 15
    bbox_norm: [0.0903, 0.0829, 0.8782, 0.8818]
    strategy: caption-region
    curated: false
  - id: fig14
    label: Figure 14
    kind: figure
    file: assets/peebles-2022-scalable-diffusion-models-with-transformers/fig14.png
    raw: raw/papers/peebles-2022-scalable-diffusion-models-with-transformers-figures/fig14.png
    caption: "DiT-XL/2 512×512 uncurated 샘플. classifier-free guidance scale 4.0, class label arctic wolf (270)"
    page: 16
    bbox_norm: [0.0721, 0.1451, 0.4777, 0.7966]
    strategy: caption-region
    curated: false
  - id: fig15
    label: Figure 15
    kind: figure
    file: assets/peebles-2022-scalable-diffusion-models-with-transformers/fig15.png
    raw: raw/papers/peebles-2022-scalable-diffusion-models-with-transformers-figures/fig15.png
    caption: "DiT-XL/2 512×512 uncurated 샘플. classifier-free guidance scale 4.0, class label volcano (980)"
    page: 16
    bbox_norm: [0.4949, 0.1451, 0.9005, 0.7966]
    strategy: caption-region
    curated: false
  - id: fig16
    label: Figure 16
    kind: figure
    file: assets/peebles-2022-scalable-diffusion-models-with-transformers/fig16.png
    raw: raw/papers/peebles-2022-scalable-diffusion-models-with-transformers-figures/fig16.png
    caption: "DiT-XL/2 512×512 uncurated 샘플. classifier-free guidance scale 4.0, class label husky (250)"
    page: 17
    bbox_norm: [0.0721, 0.1602, 0.4777, 0.8117]
    strategy: caption-region
    curated: false
  - id: fig17
    label: Figure 17
    kind: figure
    file: assets/peebles-2022-scalable-diffusion-models-with-transformers/fig17.png
    raw: raw/papers/peebles-2022-scalable-diffusion-models-with-transformers-figures/fig17.png
    caption: "DiT-XL/2 512×512 uncurated 샘플. classifier-free guidance scale 4.0, class label sulphur-crested cockatoo (89)"
    page: 17
    bbox_norm: [0.4949, 0.1602, 0.9005, 0.8117]
    strategy: caption-region
    curated: false
  - id: fig18
    label: Figure 18
    kind: figure
    file: assets/peebles-2022-scalable-diffusion-models-with-transformers/fig18.png
    raw: raw/papers/peebles-2022-scalable-diffusion-models-with-transformers-figures/fig18.png
    caption: "DiT-XL/2 512×512 uncurated 샘플. classifier-free guidance scale 4.0, class label cliff drop-off (972)"
    page: 18
    bbox_norm: [0.0721, 0.1602, 0.4777, 0.8117]
    strategy: caption-region
    curated: false
  - id: fig19
    label: Figure 19
    kind: figure
    file: assets/peebles-2022-scalable-diffusion-models-with-transformers/fig19.png
    raw: raw/papers/peebles-2022-scalable-diffusion-models-with-transformers-figures/fig19.png
    caption: "DiT-XL/2 512×512 uncurated 샘플. classifier-free guidance scale 4.0, class label balloon (417)"
    page: 18
    bbox_norm: [0.4949, 0.1602, 0.9005, 0.8117]
    strategy: caption-region
    curated: false
  - id: fig20
    label: Figure 20
    kind: figure
    file: assets/peebles-2022-scalable-diffusion-models-with-transformers/fig20.png
    raw: raw/papers/peebles-2022-scalable-diffusion-models-with-transformers-figures/fig20.png
    caption: "DiT-XL/2 512×512 uncurated 샘플. classifier-free guidance scale 4.0, class label lion (291)"
    page: 19
    bbox_norm: [0.0721, 0.1602, 0.4777, 0.8117]
    strategy: caption-region
    curated: false
  - id: fig21
    label: Figure 21
    kind: figure
    file: assets/peebles-2022-scalable-diffusion-models-with-transformers/fig21.png
    raw: raw/papers/peebles-2022-scalable-diffusion-models-with-transformers-figures/fig21.png
    caption: "DiT-XL/2 512×512 uncurated 샘플. classifier-free guidance scale 4.0, class label otter (360)"
    page: 19
    bbox_norm: [0.4949, 0.1602, 0.9005, 0.8117]
    strategy: caption-region
    curated: false
  - id: fig22
    label: Figure 22
    kind: figure
    file: assets/peebles-2022-scalable-diffusion-models-with-transformers/fig22.png
    raw: raw/papers/peebles-2022-scalable-diffusion-models-with-transformers-figures/fig22.png
    caption: "DiT-XL/2 512×512 uncurated 샘플. classifier-free guidance scale 2.0, class label red panda (387)"
    page: 20
    bbox_norm: [0.0721, 0.1602, 0.4777, 0.8117]
    strategy: caption-region
    curated: false
  - id: fig23
    label: Figure 23
    kind: figure
    file: assets/peebles-2022-scalable-diffusion-models-with-transformers/fig23.png
    raw: raw/papers/peebles-2022-scalable-diffusion-models-with-transformers-figures/fig23.png
    caption: "DiT-XL/2 512×512 uncurated 샘플. classifier-free guidance scale 2.0, class label panda (388)"
    page: 20
    bbox_norm: [0.4949, 0.1602, 0.9005, 0.8117]
    strategy: caption-region
    curated: false
  - id: fig24
    label: Figure 24
    kind: figure
    file: assets/peebles-2022-scalable-diffusion-models-with-transformers/fig24.png
    raw: raw/papers/peebles-2022-scalable-diffusion-models-with-transformers-figures/fig24.png
    caption: "DiT-XL/2 512×512 uncurated 샘플. classifier-free guidance scale 1.5, class label coral reef (973)"
    page: 21
    bbox_norm: [0.0721, 0.1602, 0.4777, 0.8117]
    strategy: caption-region
    curated: false
  - id: fig25
    label: Figure 25
    kind: figure
    file: assets/peebles-2022-scalable-diffusion-models-with-transformers/fig25.png
    raw: raw/papers/peebles-2022-scalable-diffusion-models-with-transformers-figures/fig25.png
    caption: "DiT-XL/2 512×512 uncurated 샘플. classifier-free guidance scale 1.5, class label macaw (88)"
    page: 21
    bbox_norm: [0.4949, 0.1602, 0.9005, 0.8117]
    strategy: caption-region
    curated: false
  - id: fig26
    label: Figure 26
    kind: figure
    file: assets/peebles-2022-scalable-diffusion-models-with-transformers/fig26.png
    raw: raw/papers/peebles-2022-scalable-diffusion-models-with-transformers-figures/fig26.png
    caption: "DiT-XL/2 256×256 uncurated 샘플. classifier-free guidance scale 4.0, class label macaw (88)"
    page: 22
    bbox_norm: [0.0721, 0.1602, 0.4777, 0.8117]
    strategy: caption-region
    curated: false
  - id: fig27
    label: Figure 27
    kind: figure
    file: assets/peebles-2022-scalable-diffusion-models-with-transformers/fig27.png
    raw: raw/papers/peebles-2022-scalable-diffusion-models-with-transformers-figures/fig27.png
    caption: "DiT-XL/2 256×256 uncurated 샘플. classifier-free guidance scale 4.0, class label dog sled (537)"
    page: 22
    bbox_norm: [0.4949, 0.1602, 0.9005, 0.8117]
    strategy: caption-region
    curated: false
  - id: fig28
    label: Figure 28
    kind: figure
    file: assets/peebles-2022-scalable-diffusion-models-with-transformers/fig28.png
    raw: raw/papers/peebles-2022-scalable-diffusion-models-with-transformers-figures/fig28.png
    caption: "DiT-XL/2 256×256 uncurated 샘플. classifier-free guidance scale 4.0, class label arctic fox (279)"
    page: 23
    bbox_norm: [0.0721, 0.1602, 0.4777, 0.8117]
    strategy: caption-region
    curated: false
  - id: fig29
    label: Figure 29
    kind: figure
    file: assets/peebles-2022-scalable-diffusion-models-with-transformers/fig29.png
    raw: raw/papers/peebles-2022-scalable-diffusion-models-with-transformers-figures/fig29.png
    caption: "DiT-XL/2 256×256 uncurated 샘플. classifier-free guidance scale 4.0, class label loggerhead sea turtle (33)"
    page: 23
    bbox_norm: [0.4949, 0.1602, 0.9005, 0.8117]
    strategy: caption-region
    curated: false
  - id: fig30
    label: Figure 30
    kind: figure
    file: assets/peebles-2022-scalable-diffusion-models-with-transformers/fig30.png
    raw: raw/papers/peebles-2022-scalable-diffusion-models-with-transformers-figures/fig30.png
    caption: "DiT-XL/2 256×256 uncurated 샘플. classifier-free guidance scale 2.0, class label golden retriever (207)"
    page: 24
    bbox_norm: [0.0721, 0.1602, 0.4777, 0.8117]
    strategy: caption-region
    curated: false
  - id: fig31
    label: Figure 31
    kind: figure
    file: assets/peebles-2022-scalable-diffusion-models-with-transformers/fig31.png
    raw: raw/papers/peebles-2022-scalable-diffusion-models-with-transformers-figures/fig31.png
    caption: "DiT-XL/2 256×256 uncurated 샘플. classifier-free guidance scale 2.0, class label lake shore (975)"
    page: 24
    bbox_norm: [0.4949, 0.1602, 0.9005, 0.8117]
    strategy: caption-region
    curated: false
  - id: fig32
    label: Figure 32
    kind: figure
    file: assets/peebles-2022-scalable-diffusion-models-with-transformers/fig32.png
    raw: raw/papers/peebles-2022-scalable-diffusion-models-with-transformers-figures/fig32.png
    caption: "DiT-XL/2 256×256 uncurated 샘플. classifier-free guidance scale 1.5, class label space shuttle (812)"
    page: 25
    bbox_norm: [0.0721, 0.1602, 0.4777, 0.8117]
    strategy: caption-region
    curated: false
  - id: fig33
    label: Figure 33
    kind: figure
    file: assets/peebles-2022-scalable-diffusion-models-with-transformers/fig33.png
    raw: raw/papers/peebles-2022-scalable-diffusion-models-with-transformers-figures/fig33.png
    caption: "DiT-XL/2 256×256 uncurated 샘플. classifier-free guidance scale 1.5, class label ice cream (928)"
    page: 25
    bbox_norm: [0.4949, 0.1602, 0.9005, 0.8117]
    strategy: caption-region
    curated: false
  - id: tab01
    label: Table 1
    kind: table
    file: assets/peebles-2022-scalable-diffusion-models-with-transformers/tab01.png
    raw: raw/papers/peebles-2022-scalable-diffusion-models-with-transformers-figures/tab01.png
    caption: "DiT 모델 등급 4종(S, B, L, XL)의 layer 수, hidden size, head 수, Gflops(I=32, p=4)"
    page: 5
    bbox_norm: [0.5075, 0.0838, 0.8912, 0.1729]
    strategy: table-region
    curated: false
  - id: tab02
    label: Table 2
    kind: table
    file: assets/peebles-2022-scalable-diffusion-models-with-transformers/tab02.png
    raw: raw/papers/peebles-2022-scalable-diffusion-models-with-transformers-figures/tab02.png
    caption: "ImageNet 256×256 class-conditional 벤치마크. DiT-XL/2-G(cfg=1.50)가 FID 2.27로 비교 모델 전체에서 최저"
    page: 9
    bbox_norm: [0.0352, 0.0774, 0.4848, 0.3076]
    strategy: manual
    curated: false
  - id: tab03
    label: Table 3
    kind: table
    file: assets/peebles-2022-scalable-diffusion-models-with-transformers/tab03.png
    raw: raw/papers/peebles-2022-scalable-diffusion-models-with-transformers-figures/tab03.png
    caption: "ImageNet 512×512 class-conditional 벤치마크. DiT-XL/2-G(cfg=1.50)가 FID 3.04로 diffusion model 중 최저"
    page: 9
    bbox_norm: [0.0352, 0.3524, 0.4848, 0.5076]
    strategy: manual
    curated: false
  - id: tab04
    label: Table 4
    kind: table
    file: assets/peebles-2022-scalable-diffusion-models-with-transformers/tab04.png
    raw: raw/papers/peebles-2022-scalable-diffusion-models-with-transformers-figures/tab04.png
    caption: "부록 Table 4. 전 DiT 모델의 해상도, Gflops, 파라미터 수, 학습 step, block 종류, guidance 없는 FID-50K"
    page: 13
    bbox_norm: [0.1004, 0.0837, 0.8752, 0.3509]
    strategy: table-region
    curated: false
  - id: tab05
    label: Table 5
    kind: table
    file: assets/peebles-2022-scalable-diffusion-models-with-transformers/tab05.png
    raw: raw/papers/peebles-2022-scalable-diffusion-models-with-transformers-figures/tab05.png
    caption: "크롭 결함. Table 5(VAE decoder ablation) 자리에 Table 6과 같은 U-Net 모델 Gflops 표가 잘려 있어 Table 5 내용이 없다"
    page: 13
    bbox_norm: [0.4974, 0.5895, 0.9051, 0.706]
    strategy: table-region
    curated: false
  - id: tab06
    label: Table 6
    kind: table
    file: assets/peebles-2022-scalable-diffusion-models-with-transformers/tab06.png
    raw: raw/papers/peebles-2022-scalable-diffusion-models-with-transformers-figures/tab06.png
    caption: "부록 Table 6. ADM, ADM-U, LDM-4, LDM-8의 해상도별 base와 upsampler Gflops"
    page: 13
    bbox_norm: [0.4974, 0.5895, 0.9051, 0.706]
    strategy: table-region
    curated: false
---

## 한 줄 요약 (One-line Summary)

diffusion model의 U-Net backbone을 latent patch 토큰 위에서 동작하는 표준 Transformer(DiT)로 교체하고, forward pass Gflops를 키울수록 FID가 일관되게 낮아지는 scaling 성질을 12개 설정 실험으로 보인 뒤, DiT-XL/2로 ImageNet 256×256 FID 2.27과 512×512 FID 3.04를 기록한 논문.

## 1. 자료 정보 (Document Information)

- **제목**: Scalable Diffusion Models with Transformers
- **저자**: William Peebles (UC Berkeley), Saining Xie (New York University). 1저자의 작업은 Meta AI FAIR 팀 인턴십 중에 수행됐다
- **arXiv**: 2212.09748, v2는 2023년 3월 2일 (cs.CV). 게재 학회는 raw PDF에 표기가 없다
- **구현**: JAX로 구현하고 TPU v3 pod에서 학습했다. 코드와 프로젝트 페이지 링크가 본문 각주에 있다
- **분량**: 본문 9쪽, 참고문헌 2쪽, 부록 A~D와 샘플 14쪽 (총 25쪽)

diffusion model은 데이터에 noise를 단계적으로 더하는 forward process를 거꾸로 되돌리는 reverse process를 학습해 이미지를 생성하는 모델이다. 이 논문 이전의 diffusion model은 예외 없이 convolution 기반 U-Net을 backbone으로 썼다. 저자들은 U-Net의 inductive bias가 diffusion model 성능에 필수가 아님을 보이고, Transformer로 교체했을 때 어떤 scaling 성질이 나타나는지를 실증한다.

## 2. 주요 기여 (Key Contributions)

- **DiT 설계**: LDM 틀 안에서 U-Net을 대신하는 순수 Transformer backbone을 제안했다. DiT는 ViT의 관행을 최대한 그대로 따라 latent를 patch 토큰 시퀀스로 바꾸고 표준 Transformer block으로 처리한다. 설계 공간은 patch size, block 구조, 모델 크기 세 가지다.
- **Gflops 기준 scaling 분석**: 아키텍처 복잡도를 파라미터 수가 아니라 forward pass 1회의 이론 Gflops로 재고, 12개 DiT 설정에서 Gflops와 FID-50K의 상관계수 -0.93을 확인했다. Transformer의 깊이와 너비를 키우든 입력 토큰 수를 늘리든 Gflops가 커지면 FID가 낮아진다.
- **adaLN-Zero block**: timestep과 class label을 주입하는 block 변형 4종(in-context, cross-attention, adaLN, adaLN-Zero)을 비교해, 각 block을 항등 함수로 초기화하는 adaLN-Zero가 FID를 가장 낮추면서 추가 Gflops도 가장 작음을 보였다.
- **SOTA 결과**: DiT-XL/2가 classifier-free guidance와 함께 ImageNet 256×256에서 FID 2.27, 512×512에서 FID 3.04를 기록해 기존 diffusion model을 모두 앞섰다. 256×256에서는 StyleGAN-XL(2.30)을 포함한 모든 기존 생성 모델보다 FID가 낮다.
- **샘플링 연산과 모델 연산의 비대칭**: 작은 모델에 샘플링 step을 늘려 test-time 연산을 더해도 큰 모델의 FID에 이르지 못함을 보였다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 배경 정식화

**DDPM**. forward process는 q(x_t|x_0) = N(x_t; sqrt(ᾱ_t) x_0, (1-ᾱ_t)I)로 noise를 더하고, reverse process p_θ(x_{t-1}|x_t) = N(μ_θ(x_t), Σ_θ(x_t))를 신경망으로 학습한다. μ_θ를 noise 예측 network ε_θ로 다시 매개화하면 학습 목표는 예측 noise와 실제 noise의 MSE인 L_simple = ||ε_θ(x_t) - ε_t||²로 줄어든다. 공분산 Σ_θ까지 학습하려면 전체 KL 항을 최적화해야 하므로, Nichol과 Dhariwal의 방식대로 ε_θ는 L_simple로, Σ_θ는 전체 변분 하한 L로 학습한다.

**classifier-free guidance**. class label c를 조건으로 받는 모델에서 log p(c|x)가 높은 x를 찾도록 샘플링을 유도하는 기법이다. Bayes 규칙으로 ∇_x log p(c|x) ∝ ∇_x log p(x|c) - ∇_x log p(x)가 성립하므로, 예측 noise를 ε̂_θ(x_t, c) = ε_θ(x_t, ∅) + s(ε_θ(x_t, c) - ε_θ(x_t, ∅))로 바꾼다. s > 1이 guidance scale이고 s = 1이면 표준 샘플링이다. 조건 없는 예측 ε_θ(x_t, ∅)는 학습 중 c를 무작위로 떨어뜨리고 학습된 null 임베딩 ∅으로 대체해 얻는다.

**LDM**. 고해상도 픽셀 공간에서 diffusion을 직접 학습하면 연산이 지나치게 크다. LDM은 (1) 이미지를 작은 공간 표현으로 압축하는 autoencoder(인코더 E)를 학습하고 (2) 이미지 x 대신 표현 z = E(x)의 diffusion model을 학습하는 두 단계로 이 문제를 푼다. E는 고정하고, 생성 시에는 z를 샘플링한 뒤 디코더로 x = D(z)를 복원한다. Figure 2에서 LDM은 ADM 같은 픽셀 공간 모델의 일부 Gflops로 좋은 성능을 내므로, 연산 효율을 중시하는 이 논문은 latent 공간을 출발점으로 삼는다. DiT는 픽셀 공간에도 수정 없이 적용할 수 있으나, 이 논문은 기성 convolution VAE와 Transformer DDPM을 결합한 하이브리드 구성만 다룬다.

### 3.2 DiT 설계 공간

**patchify**. 입력은 공간 표현 z이며 256×256×3 이미지에서 z는 32×32×4다. 첫 layer인 patchify가 이 입력을 각 patch를 선형 임베딩해 차원 d인 토큰 T개의 시퀀스로 바꾸고, 이어서 ViT의 sine-cosine positional 임베딩을 모든 토큰에 더한다. 토큰 수 T는 patch size p로 정해지며 p를 절반으로 줄이면 T가 4배, Transformer Gflops도 최소 4배가 된다. p를 바꿔도 파라미터 수는 거의 변하지 않는다. 설계 공간에는 p = 2, 4, 8이 들어간다.

**block 설계 4종**. diffusion model은 noised 이미지 외에 timestep t와 class label c 같은 조건 입력을 처리해야 한다. 논문은 표준 ViT block에 조건을 주입하는 방식을 네 가지로 나눈다.

| block | 조건 주입 방식 | Gflops (XL/2) | 비고 |
|---|---|---|---|
| in-context conditioning | t와 c의 임베딩을 토큰 2개로 시퀀스 뒤에 붙인다. ViT의 cls 토큰과 비슷하며 마지막 block 뒤에 조건 토큰을 제거한다 | 119.4 | 표준 ViT block을 수정 없이 쓴다. 추가 Gflops는 무시할 수준 |
| cross-attention | t와 c 임베딩을 길이 2인 별도 시퀀스로 두고, self-attention 뒤에 multi-head cross-attention layer를 추가한다 | 137.6 | Vaswani 원 설계와 LDM의 class 조건 방식과 비슷. 약 15% overhead로 Gflops 증가가 가장 크다 |
| adaLN | layer norm의 scale γ와 shift β를 직접 학습하지 않고 t와 c 임베딩의 합에서 회귀한다 | 118.6 | 세 설계 중 Gflops 증가가 가장 작다. 모든 토큰에 같은 함수를 적용하는 유일한 방식 |
| adaLN-Zero | adaLN에 더해 residual 연결 직전에 dimension별 scaling α를 회귀하고, α를 내는 MLP를 0으로 초기화해 block 전체를 항등 함수로 시작한다 | 118.6 | Goyal 외의 zero-init batch norm과 diffusion U-Net의 마지막 conv zero-init에서 착안 |

adaLN 계층은 timestep과 class 임베딩의 합을 SiLU와 선형 layer에 통과시켜 hidden size의 4배(adaLN) 또는 6배(adaLN-Zero) 출력을 낸다.

**모델 크기**. hidden 차원 d인 DiT block N개를 쌓는다. ViT를 따라 N, d, attention head 수를 함께 키우는 표준 설정 4종을 쓴다. S, B, L은 ViT 설정을 그대로 따르고 XL은 이 논문이 추가한 가장 큰 설정이다. Gflops 범위는 0.3에서 118.6까지다.

| 모델 | layer N | hidden size d | head 수 | Gflops (I=32, p=4) |
|---|---|---|---|---|
| DiT-S | 12 | 384 | 6 | 1.4 |
| DiT-B | 12 | 768 | 12 | 5.6 |
| DiT-L | 24 | 1024 | 16 | 19.7 |
| DiT-XL | 28 | 1152 | 16 | 29.1 |

**Transformer 디코더**. 마지막 DiT block 뒤에 마지막 layer norm(adaLN이면 adaptive)을 적용하고, 각 토큰을 p×p×2C 텐서로 선형 디코딩한다. C는 입력 채널 수다. 디코딩한 토큰을 원래 공간 배치로 되돌려 noise 예측과 대각 공분산 예측을 얻는다.

모델 이름은 설정과 patch size를 붙여 쓴다. DiT-XL/2는 XL 설정에 p = 2다.

### 3.3 학습과 평가 설정

- **데이터와 해상도**: ImageNet class-conditional, 256×256과 512×512
- **초기화**: 마지막 선형 layer는 0으로, 나머지는 ViT 표준 초기화
- **최적화**: AdamW, 학습률 1×10⁻⁴ 고정, weight decay 없음, batch 256, 데이터 증강은 수평 뒤집기만
- **warmup과 정규화**: 없음. 그래도 모든 설정에서 학습이 안정적이었고 Transformer 학습에서 흔한 손실 급증이 없었다
- **EMA**: 감쇠 0.9999. 보고 수치는 모두 EMA 모델
- **하이퍼파라미터**: 모델 크기와 patch size에 관계없이 동일하며 거의 전부 ADM에서 가져왔다. 학습률, 감쇠와 warmup 일정, Adam β₁/β₂, weight decay를 튜닝하지 않았다
- **VAE**: Stable Diffusion의 pre-training된 VAE. 인코더 downsample 배율 8, 256×256×3 이미지가 32×32×4 latent가 된다. 파라미터는 인코더와 디코더 합쳐 8,400만 개
- **diffusion 하이퍼파라미터**: ADM의 것을 유지. t_max = 1000, 1×10⁻⁴에서 2×10⁻²까지 선형 분산 일정, ADM의 공분산 매개화와 timestep, label 임베딩 방식
- **timestep 임베딩**: 256차원 frequency 임베딩 뒤에 hidden size 차원의 2-layer MLP(SiLU). Transformer 본체의 비선형은 GELU(tanh 근사)
- **평가 지표**: FID-50K(250 DDPM 샘플링 step), Inception Score, sFID, Precision/Recall. FID는 구현 세부에 민감하므로 샘플을 내보내 ADM의 TensorFlow 평가 suite로 계산했다. 본문 5절의 FID는 별도 표기가 없으면 guidance 없이 잰 값이다
- **연산 자원**: JAX와 TPU v3 pod. DiT-XL/2는 TPU v3-256 pod에서 batch 256으로 초당 약 5.7 iteration

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 block 설계 ablation

Gflops가 가장 큰 DiT-XL/2 4개를 block 설계만 다르게 학습해 FID를 추적했다(Figure 5). adaLN-Zero가 학습 전 구간에서 FID가 가장 낮았고 연산 효율도 가장 좋았다. 40만 step에서 adaLN-Zero의 FID는 in-context의 거의 절반이다. 초기화 효과도 커서, 같은 연산량인 adaLN보다 adaLN-Zero가 뚜렷이 낫다. 이후 모든 실험은 adaLN-Zero를 쓴다.

| block (XL/2, 40만 step) | Gflops | 파라미터 (M) | FID-50K (guidance 없음) |
|---|---|---|---|
| in-context | 119.37 | 449 | 35.24 |
| cross-attention | 137.62 | 598 | 26.14 |
| adaLN | 118.56 | 600 | 25.21 |
| adaLN-Zero | 118.64 | 675 | 19.47 |

### 4.2 모델 크기와 patch size scaling

설정 4종(S, B, L, XL)과 patch size 3종(8, 4, 2)을 조합한 12개 모델을 40만 step 학습했다. DiT-L과 DiT-XL은 다른 설정보다 상대 Gflops 차이가 작다. 모든 경우에 모델을 키우거나 patch를 줄이면 diffusion model이 뚜렷이 좋아진다(Figure 2 왼쪽, Figure 6).

| 모델 | Gflops | 파라미터 (M) | FID-50K (40만 step, guidance 없음) |
|---|---|---|---|
| DiT-S/8 | 0.36 | 33 | 153.60 |
| DiT-S/4 | 1.41 | 33 | 100.41 |
| DiT-S/2 | 6.06 | 33 | 68.40 |
| DiT-B/8 | 1.42 | 131 | 122.74 |
| DiT-B/4 | 5.56 | 130 | 68.38 |
| DiT-B/2 | 23.01 | 130 | 43.47 |
| DiT-L/8 | 5.01 | 459 | 118.87 |
| DiT-L/4 | 19.70 | 458 | 45.64 |
| DiT-L/2 | 80.71 | 458 | 23.33 |
| DiT-XL/8 | 7.39 | 676 | 106.41 |
| DiT-XL/4 | 29.05 | 675 | 43.01 |
| DiT-XL/2 | 118.64 | 675 | 19.47 |

**Gflops가 성능을 결정한다**. 모델 크기를 고정하고 patch size를 줄이면 파라미터는 사실상 그대로(실제로는 약간 감소)인데 Gflops만 늘고 FID가 내려간다. 즉 파라미터 수가 DiT 품질을 유일하게 결정하지 않는다. 40만 step의 FID-50K를 모델 Gflops에 대해 그리면(Figure 8) 총 Gflops가 비슷한 설정은 FID도 비슷하고(DiT-S/2 6.06 Gflops의 68.40과 DiT-B/4 5.56 Gflops의 68.38), Gflops와 FID-50K의 상관계수는 -0.93이다. 부록 Figure 12에서 이 추세는 Inception Score 등 다른 지표에서도 유지된다.

**큰 모델이 연산 효율이 높다**. 총 학습 연산량을 모델 Gflops × batch size × 학습 step × 3으로 추정해(backward pass가 forward의 2배라는 근사) FID를 그리면(Figure 9), 작은 모델은 오래 학습해도 결국 더 적은 step을 학습한 큰 모델보다 연산 효율이 떨어진다. patch size만 다른 모델도 학습 Gflops를 맞춰도 성능 궤적이 다르며, XL/4는 약 10¹⁰ Gflops 이후 XL/2에 뒤진다.

**시각화**. 40만 step에서 12개 모델에 같은 시작 noise, 샘플링 noise, class label을 주고 뽑은 샘플(Figure 7)에서도 모델 크기와 토큰 수를 키울수록 시각 품질이 눈에 띄게 좋아진다.

### 4.3 ImageNet 256×256 SOTA

Gflops가 가장 큰 DiT-XL/2를 700만 step까지 학습했다. classifier-free guidance를 쓰면 LDM의 직전 최고 FID-50K 3.60을 2.27로 낮춰 모든 기존 diffusion model을 앞선다. StyleGAN-XL(2.30)을 포함한 모든 기존 생성 모델보다 FID가 낮다. DiT-XL/2는 시험한 모든 guidance scale에서 LDM-4와 LDM-8보다 recall이 높다. ADM과 비슷한 235만 step만 학습해도 FID 2.55로 모든 기존 diffusion model보다 낫다.

| 모델 | FID | sFID | IS | Precision | Recall |
|---|---|---|---|---|---|
| BigGAN-deep | 6.95 | 7.36 | 171.4 | 0.87 | 0.28 |
| StyleGAN-XL | 2.30 | 4.02 | 265.12 | 0.78 | 0.53 |
| ADM | 10.94 | 6.02 | 100.98 | 0.69 | 0.63 |
| ADM-U | 7.49 | 5.13 | 127.49 | 0.72 | 0.63 |
| ADM-G | 4.59 | 5.25 | 186.70 | 0.82 | 0.52 |
| ADM-G, ADM-U | 3.94 | 6.14 | 215.84 | 0.83 | 0.53 |
| CDM | 4.88 | - | 158.71 | - | - |
| LDM-8 | 15.51 | - | 79.03 | 0.65 | 0.63 |
| LDM-8-G | 7.76 | - | 209.52 | 0.84 | 0.35 |
| LDM-4 | 10.56 | - | 103.49 | 0.71 | 0.62 |
| LDM-4-G (cfg=1.25) | 3.95 | - | 178.22 | 0.81 | 0.55 |
| LDM-4-G (cfg=1.50) | 3.60 | - | 247.67 | 0.87 | 0.48 |
| DiT-XL/2 | 9.62 | 6.85 | 121.50 | 0.67 | 0.67 |
| DiT-XL/2-G (cfg=1.25) | 3.22 | 5.28 | 201.77 | 0.76 | 0.62 |
| DiT-XL/2-G (cfg=1.50) | 2.27 | 4.60 | 278.24 | 0.83 | 0.57 |

연산 효율 면에서 DiT-XL/2(118.6 Gflops)는 latent 공간 U-Net인 LDM-4(103.6 Gflops)와 비슷한 수준이고, 픽셀 공간 U-Net인 ADM(1120 Gflops)이나 ADM-U(742 Gflops)보다 훨씬 적다(Figure 2 오른쪽).

### 4.4 ImageNet 512×512

같은 하이퍼파라미터로 새 DiT-XL/2를 512×512에서 300만 step 학습했다. 64×64×4 latent를 p = 2로 patchify하면 토큰 1024개, 524.6 Gflops다. guidance와 함께 ADM의 직전 최고 FID 3.85를 3.04로 낮춰 이 해상도의 모든 기존 diffusion model을 앞선다. 토큰이 늘었어도 ADM(1983 Gflops)과 ADM-U(2813 Gflops)보다 연산이 적다.

| 모델 | FID | sFID | IS | Precision | Recall |
|---|---|---|---|---|---|
| BigGAN-deep | 8.43 | 8.13 | 177.90 | 0.88 | 0.29 |
| StyleGAN-XL | 2.41 | 4.06 | 267.75 | 0.77 | 0.52 |
| ADM | 23.24 | 10.19 | 58.06 | 0.73 | 0.60 |
| ADM-U | 9.96 | 5.62 | 121.78 | 0.75 | 0.64 |
| ADM-G | 7.72 | 6.57 | 172.71 | 0.87 | 0.42 |
| ADM-G, ADM-U | 3.85 | 5.86 | 221.72 | 0.84 | 0.53 |
| DiT-XL/2 | 12.03 | 7.12 | 105.25 | 0.75 | 0.64 |
| DiT-XL/2-G (cfg=1.25) | 4.64 | 5.77 | 174.77 | 0.81 | 0.57 |
| DiT-XL/2-G (cfg=1.50) | 3.04 | 5.02 | 240.82 | 0.84 | 0.54 |

Table 3의 Precision과 Recall은 선행 연구(ADM)를 따라 실제 샘플 1000개로 계산했다.

### 4.5 모델 연산 대 샘플링 연산

diffusion model은 학습 뒤에도 샘플링 step을 늘려 연산을 더 쓸 수 있다. 40만 step 학습한 12개 모델 각각에 16, 32, 64, 128, 256, 1000 step 샘플링으로 FID-10K를 쟀다(Figure 10). DiT-L/2를 1000 step으로 샘플링하면 이미지당 80.7 Tflops, DiT-XL/2를 128 step으로 샘플링하면 5분의 1인 15.2 Tflops인데 FID-10K는 XL/2가 더 낮다(23.7 대 25.9). 샘플링 연산을 늘려도 모델 연산 부족을 보상하지 못한다.

### 4.6 부록 실험

**전 모델 상세(Table 4)**. 위 12개 모델과 block ablation 4개 외에 DiT-XL/2 256×256을 235만 2천 step(FID 10.67)과 700만 step(FID 9.62), 512×512를 130만 1천 step(FID 13.78)과 300만 step(FID 11.93)까지 학습한 값이 있다. 모두 guidance 없는 FID-50K이고 ft-MSE 디코더 기준이다. 두 XL/2 모델 모두 FID 포화를 관찰하지 못해 가능한 한 오래 학습했다.

**FID 외 지표(Figure 12)**. FID, sFID, IS, Precision, Recall 전부에서 큰 DiT가 연산 효율이 높고 Gflops와 성능의 상관이 강하다. 40만 step에서 Transformer Gflops와의 상관계수는 FID -0.93, sFID -0.86, IS 0.90, Precision 0.93, Recall 0.86이다. Inception Score와 Precision이 모델 규모 확대의 이득을 특히 크게 받는다.

**학습 손실(Figure 13)**. Gflops를 키우면(Transformer 크기든 토큰 수든) 학습 손실이 더 빨리 내려가고 더 낮은 값에서 포화한다. 언어 모델에서 scaling된 Transformer가 손실 곡선과 downstream 성능 모두 개선되는 추세와 일치한다.

**VAE 디코더 ablation(Table 5)**. ft-MSE와 ft-EMA는 LDM의 원래 f8 모델에서 디코더 가중치만 fine-tuning한 것이다. 5절 scaling 분석은 ft-MSE, Table 2와 3의 최종 수치는 ft-EMA로 쟀다. 인코더가 같으므로 diffusion model 재학습 없이 디코더만 바꿔 비교할 수 있다.

| 디코더 (DiT-XL/2-G, cfg=1.5, 256×256) | FID | sFID | IS | Precision | Recall |
|---|---|---|---|---|---|
| original (LDM) | 2.46 | 5.18 | 271.56 | 0.82 | 0.57 |
| ft-MSE | 2.30 | 4.73 | 276.09 | 0.83 | 0.57 |
| ft-EMA | 2.27 | 4.60 | 278.24 | 0.83 | 0.57 |

**U-Net baseline Gflops(Table 6)**. DDPM 구성 요소만 센 값이다.

| 모델 | 해상도 | base Gflops | upsampler Gflops | 총 Gflops |
|---|---|---|---|---|
| ADM | 128×128 | 307 | - | 307 |
| ADM | 256×256 | 1120 | - | 1120 |
| ADM | 512×512 | 1983 | - | 1983 |
| ADM-U | 256×256 | 110 | 632 | 742 |
| ADM-U | 512×512 | 307 | 2506 | 2813 |
| LDM-4 | 256×256 | 104 | - | 104 |
| LDM-8 | 256×256 | 57 | - | 57 |

**채널 일부에만 guidance(부록 A)**. guidance 실험에서는 latent 4채널 중 앞 3채널에만 guidance를 적용했다. scale을 조정하면 3채널과 4채널 guidance의 FID가 비슷하며, 3채널 scale (1+x)는 4채널 scale (1+3x/4)로 근사된다. 3채널 scale 1.5의 FID-50K는 2.27, 4채널 scale 1.375는 2.20이다. 저자들은 일부 원소에만 guidance를 걸어도 성능이 좋은 현상의 분석을 향후 과제로 남겼다.

**샘플(부록 B)**. Figure 14~33은 250 DDPM step과 ft-EMA 디코더로 뽑은 uncurated 샘플이다. 선행 연구와 마찬가지로 guidance scale이 클수록 시각 충실도는 오르고 다양성은 준다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

저자가 명시한 것:

- scaling 결과가 유망하므로 후속 연구는 더 큰 모델과 더 많은 토큰으로 DiT를 계속 scaling해야 한다.
- DiT를 DALL-E 2나 Stable Diffusion 같은 text-to-image 모델의 drop-in backbone으로 탐구할 수 있다. 이 논문 자체는 class-conditional 생성만 다룬다.
- 앞 3채널에만 guidance를 걸어도 성능이 좋은 현상은 설명하지 않고 향후 과제로 남겼다.
- guidance scale을 키우면 시각 충실도가 오르는 대신 샘플 다양성이 준다.

자료에서 확인할 수 있는 사실이나 저자가 한계로 명시하지 않은 것:

- sFID는 256×256에서 StyleGAN-XL(4.02)이 DiT-XL/2-G(4.60)보다 낮고, 512×512에서는 FID도 StyleGAN-XL(2.41)이 DiT-XL/2-G(3.04)보다 낮다. 본문의 "모든 기존 모델을 앞선다"는 256×256 FID에 한정된 서술이다.
- VAE를 고정하고 기성 모델을 쓰므로 latent 표현 자체의 품질은 다루지 않는다. Table 5의 디코더 ablation은 디코더 가중치 3종만 비교한다.
- Table 4의 512×512 XL/2 300만 step FID 11.93(ft-MSE)과 Table 3의 12.03(ft-EMA)은 디코더가 달라 생긴 차이로, Table 4 주석이 디코더 기준을 명시한다.
- 실험이 ImageNet class-conditional에 한정되며 text 조건이나 다른 데이터셋 결과는 없다.

## 6. 관련 연구 (Related Work)

- **Transformer**: 언어, 비전, 강화학습, 메타러닝에서 도메인 특화 아키텍처를 대체했고 모델 크기, 학습 연산, 데이터에 대한 scaling 성질을 보였다. 픽셀 자기회귀 생성, 이산 codebook 위의 자기회귀와 masked 생성(20B 파라미터까지 scaling)에도 쓰였다. DDPM에서는 DALL-E 2의 CLIP 이미지 임베딩 생성처럼 비공간 데이터에 한해 쓰였다.
- **DDPM**: Ho 외(2020)가 U-Net backbone을 도입했고, 이 U-Net은 PixelCNN++에서 물려받아 ResNet block 중심에 저해상도 self-attention block을 삽입한 구조다. Dhariwal과 Nichol(ADM)이 adaptive normalization과 채널 수 등을 ablation했으나 큰 틀은 유지됐다. 최근 개선은 classifier-free guidance, noise 예측 재정식화, cascaded 파이프라인 같은 샘플링 기법에서 나왔다. 동시대 연구(Jabri 외, 2022)는 attention 기반의 효율적 DDPM 아키텍처를 제안했고 이 논문은 순수 Transformer를 탐구한다.
- **아키텍처 복잡도**: 이미지 생성 문헌은 파라미터 수를 관행적으로 쓰지만, 파라미터 수는 해상도 같은 요인을 반영하지 못한다. 이 논문은 아키텍처 설계 문헌을 따라 이론 Gflops를 쓴다. Nichol과 Dhariwal이 U-Net 계열의 scalability와 Gflops를 분석한 것이 가장 가까운 선행 연구다.
- **LDM**: Rombach 외(2022)의 latent diffusion 틀과 Stable Diffusion의 VAE를 그대로 쓴다.
- **ViT**: Dosovitskiy 외(2020)의 patch 기반 설계와 S/B/L 설정, Zhai 외(2022)의 scaling 관행을 따른다.

## 7. 용어집 (Glossary)

이 자료 고유의 용어만 정리한다. 일반 학습과 아키텍처 용어는 [[overviews/glossary-llms]]를 따른다.

| 용어 | 뜻 |
|---|---|
| DiT (Diffusion Transformer) | U-Net 대신 표준 Transformer를 backbone으로 쓰는 diffusion model. latent patch 토큰 시퀀스 위에서 동작한다 |
| patchify | I×I×C latent를 p×p patch로 잘라 길이 T=(I/p)²인 토큰 시퀀스로 바꾸는 DiT의 첫 layer |
| adaLN | layer norm의 scale γ와 shift β를 timestep과 class 임베딩의 합에서 회귀하는 conditioning block |
| adaLN-Zero | adaLN에 residual 직전의 dimension별 scaling α를 더하고 α를 0으로 초기화해 block을 항등 함수로 시작하는 설계. DiT 기본값 |
| classifier-free guidance | 조건 있는 예측과 조건 없는 예측의 차이를 scale s배로 증폭해 조건 충실도를 높이는 샘플링 기법. 모델명의 -G 접미사 |
| Gflops | forward pass 1회의 이론 부동소수점 연산량(10억 단위). 이 논문이 아키텍처 복잡도의 대표 지표로 삼는다 |
| FID-50K, FID-10K | 생성 샘플 5만 개(또는 1만 개)로 잰 Fréchet Inception Distance. 낮을수록 좋다 |
| DiT-XL/2 표기 | 모델 설정(XL)과 patch size(2)의 조합. 숫자가 작을수록 토큰이 많다 |
| ft-MSE, ft-EMA | LDM f8 VAE에서 디코더만 fine-tuning한 Stable Diffusion 디코더 가중치 2종 |

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 1 | 512×512와 256×256 해상도 DiT-XL/2 두 모델이 생성한 선별 샘플 | caption-region | (확인 필요) |
| fig02 | 2 | 버블 넓이는 모델 Gflops. 왼쪽은 40만 step에서 DiT 12개 설정의 Gflops와 FID-50K, 오른쪽은 DiT-XL/2-G가 ADM-U-G, LDM-4-G, LDM-8-G 등 U-Net 기반 모델보다 낮은 FID를 기록하는 비교 | caption-region | ★ wiki 권장 (result) |
| fig03 | 3 | DiT 아키텍처. 왼쪽은 noised latent를 patchify해 DiT block N개로 처리하는 전체 구조, 오른쪽은 adaLN-Zero, cross-attention, in-context conditioning 세 가지 block 설계 | caption-region | ★ wiki 권장 (architecture) |
| fig04 | 4 | patchify 입력 규격. I×I×C latent를 p×p patch로 잘라 길이 T=(I/p)²인 토큰 시퀀스로 만든다. p가 작을수록 토큰이 늘어 Gflops가 커진다 | caption-region | ★ wiki 권장 (method) |
| fig05 | 5 | DiT-XL/2의 conditioning 방식 4종 비교. adaLN-Zero가 학습 전 구간에서 in-context, cross-attention, adaLN보다 FID-50K가 낮다 | caption-region | ★ wiki 권장 (method) |
| fig06 | 6 | DiT 12개 모델의 학습 step별 FID-50K. 윗줄은 patch size를 고정하고 모델 크기를 키운 비교, 아랫줄은 모델 크기를 고정하고 patch size를 줄인 비교 | caption-region | (확인 필요) |
| fig07 | 7 | 12개 DiT 모델이 같은 noise와 class label로 생성한 샘플 격자. 오른쪽으로 갈수록 Transformer가 크고 아래로 갈수록 patch가 작아 시각 품질이 좋아진다 | caption-region | (확인 필요) |
| fig08 | 8 | Transformer Gflops와 40만 step FID-50K의 산점도. 상관계수 -0.93으로, Gflops가 비슷하면 설정이 달라도 FID가 비슷하다 | caption-region | ★ wiki 권장 (result) |
| fig09 | 8 | 총 학습 연산량 대비 FID-50K. 큰 DiT 모델이 같은 연산량에서 더 낮은 FID에 도달하고, 작은 모델은 오래 학습해도 연산 효율이 떨어진다 | caption-region | (확인 필요) |
| fig10 | 9 | 샘플링 연산량 대비 FID-10K. 16 step에서 1000 step까지 샘플링 step을 늘려도 작은 모델은 큰 모델의 FID에 이르지 못한다 | caption-region | (확인 필요) |
| fig11 | 12 | 512×512(guidance scale 6.0)와 256×256(guidance scale 4.0) DiT-XL/2 모델의 추가 선별 샘플 | caption-region | (부록 선별 샘플, 선택) |
| fig12 | 14 | FID, sFID, IS, Precision, Recall 다섯 지표의 scaling 추이. 왼쪽은 학습 연산량 대비 곡선, 오른쪽은 40만 step에서 Transformer Gflops와의 상관 | caption-region | (선택, 본문에 상관계수 표로 옮김) |
| fig13 | 15 | DiT 전 모델의 학습 손실 곡선. Gflops가 큰 모델일수록 손실이 빨리 내려가고 더 낮은 값에서 포화한다 | caption-region | (선택) |
| fig14 | 16 | DiT-XL/2 512×512 uncurated 샘플. classifier-free guidance scale 4.0, class label arctic wolf (270) | caption-region | (부록 uncurated 샘플) |
| fig15 | 16 | DiT-XL/2 512×512 uncurated 샘플. classifier-free guidance scale 4.0, class label volcano (980) | caption-region | (부록 uncurated 샘플) |
| fig16 | 17 | DiT-XL/2 512×512 uncurated 샘플. classifier-free guidance scale 4.0, class label husky (250) | caption-region | (부록 uncurated 샘플) |
| fig17 | 17 | DiT-XL/2 512×512 uncurated 샘플. classifier-free guidance scale 4.0, class label sulphur-crested cockatoo (89) | caption-region | (부록 uncurated 샘플) |
| fig18 | 18 | DiT-XL/2 512×512 uncurated 샘플. classifier-free guidance scale 4.0, class label cliff drop-off (972) | caption-region | (부록 uncurated 샘플) |
| fig19 | 18 | DiT-XL/2 512×512 uncurated 샘플. classifier-free guidance scale 4.0, class label balloon (417) | caption-region | (부록 uncurated 샘플) |
| fig20 | 19 | DiT-XL/2 512×512 uncurated 샘플. classifier-free guidance scale 4.0, class label lion (291) | caption-region | (부록 uncurated 샘플) |
| fig21 | 19 | DiT-XL/2 512×512 uncurated 샘플. classifier-free guidance scale 4.0, class label otter (360) | caption-region | (부록 uncurated 샘플) |
| fig22 | 20 | DiT-XL/2 512×512 uncurated 샘플. classifier-free guidance scale 2.0, class label red panda (387) | caption-region | (부록 uncurated 샘플) |
| fig23 | 20 | DiT-XL/2 512×512 uncurated 샘플. classifier-free guidance scale 2.0, class label panda (388) | caption-region | (부록 uncurated 샘플) |
| fig24 | 21 | DiT-XL/2 512×512 uncurated 샘플. classifier-free guidance scale 1.5, class label coral reef (973) | caption-region | (부록 uncurated 샘플) |
| fig25 | 21 | DiT-XL/2 512×512 uncurated 샘플. classifier-free guidance scale 1.5, class label macaw (88) | caption-region | (부록 uncurated 샘플) |
| fig26 | 22 | DiT-XL/2 256×256 uncurated 샘플. classifier-free guidance scale 4.0, class label macaw (88) | caption-region | (부록 uncurated 샘플) |
| fig27 | 22 | DiT-XL/2 256×256 uncurated 샘플. classifier-free guidance scale 4.0, class label dog sled (537) | caption-region | (부록 uncurated 샘플) |
| fig28 | 23 | DiT-XL/2 256×256 uncurated 샘플. classifier-free guidance scale 4.0, class label arctic fox (279) | caption-region | (부록 uncurated 샘플) |
| fig29 | 23 | DiT-XL/2 256×256 uncurated 샘플. classifier-free guidance scale 4.0, class label loggerhead sea turtle (33) | caption-region | (부록 uncurated 샘플) |
| fig30 | 24 | DiT-XL/2 256×256 uncurated 샘플. classifier-free guidance scale 2.0, class label golden retriever (207) | caption-region | (부록 uncurated 샘플) |
| fig31 | 24 | DiT-XL/2 256×256 uncurated 샘플. classifier-free guidance scale 2.0, class label lake shore (975) | caption-region | (부록 uncurated 샘플) |
| fig32 | 25 | DiT-XL/2 256×256 uncurated 샘플. classifier-free guidance scale 1.5, class label space shuttle (812) | caption-region | (부록 uncurated 샘플) |
| fig33 | 25 | DiT-XL/2 256×256 uncurated 샘플. classifier-free guidance scale 1.5, class label ice cream (928) | caption-region | (부록 uncurated 샘플) |
| tab01 | 5 | DiT 모델 등급 4종(S, B, L, XL)의 layer 수, hidden size, head 수, Gflops(I=32, p=4) | table-region | ★ wiki 권장 (method) |
| tab02 | 9 | ImageNet 256×256 class-conditional 벤치마크. DiT-XL/2-G(cfg=1.50)가 FID 2.27로 비교 모델 전체에서 최저 | manual | ★ wiki 권장 (result) |
| tab03 | 9 | ImageNet 512×512 class-conditional 벤치마크. DiT-XL/2-G(cfg=1.50)가 FID 3.04로 diffusion model 중 최저 | manual | (확인 필요) |
| tab04 | 13 | 부록 Table 4. 전 DiT 모델의 해상도, Gflops, 파라미터 수, 학습 step, block 종류, guidance 없는 FID-50K | table-region | (본문 마크다운 표로 옮김) |
| tab05 | 13 | 크롭 결함. Table 5(VAE decoder ablation) 자리에 Table 6과 같은 U-Net 모델 Gflops 표가 잘려 있어 Table 5 내용이 없다 | table-region | (크롭 결함, 본문 표로 옮김) |
| tab06 | 13 | 부록 Table 6. ADM, ADM-U, LDM-4, LDM-8의 해상도별 base와 upsampler Gflops | table-region | (본문 마크다운 표로 옮김) |

큐레이션 결정: fig02, fig03, fig04, fig05, fig06, fig08, fig10 7장을 wiki에 임베드한다. Table 1~6은 본문 마크다운 표로 옮겼으므로 tab01과 tab02는 큐레이션에서 내렸다. fig01, fig07, fig11, fig14~33은 샘플 이미지라 아카이브에만 둔다. tab05 크롭은 Table 6 영역과 동일한 결함 크롭이며 Table 5 값은 raw 텍스트에서 옮겼다.
