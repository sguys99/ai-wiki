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
tags: [latent-diffusion, diffusion-model, generative-model, autoencoder, cross-attention, text-to-image, super-resolution, inpainting]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/rombach-2022-high-resolution-image-synthesis-with-latent/fig01.png
    raw: raw/papers/rombach-2022-high-resolution-image-synthesis-with-latent-figures/fig01.png
    caption: "다운샘플링을 덜 할수록 재구성 상한이 오른다. f=4 autoencoder(PSNR 27.4, R-FID 0.58)가 DALL-E f=8과 VQGAN f=16보다 세부를 잘 보존한다"
    page: 1
    bbox_norm: [0.4953, 0.2328, 0.9001, 0.397]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/rombach-2022-high-resolution-image-synthesis-with-latent/fig02.png
    raw: raw/papers/rombach-2022-high-resolution-image-synthesis-with-latent-figures/fig02.png
    caption: "rate-distortion 곡선의 두 구간. 앞의 perceptual compression은 autoencoder와 GAN이, 뒤의 semantic compression은 LDM이 맡는다"
    page: 2
    bbox_norm: [0.5342, 0.0833, 0.8612, 0.2837]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/rombach-2022-high-resolution-image-synthesis-with-latent/fig03.png
    raw: raw/papers/rombach-2022-high-resolution-image-synthesis-with-latent-figures/fig03.png
    caption: "LDM 전체 구조. pixel space의 인코더와 디코더, latent space의 denoising U-Net, 조건 y를 τ_θ로 바꿔 cross-attention이나 concat으로 주입하는 경로"
    page: 4
    bbox_norm: [0.5006, 0.0854, 0.901, 0.2398]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/rombach-2022-high-resolution-image-synthesis-with-latent/fig04.png
    raw: raw/papers/rombach-2022-high-resolution-image-synthesis-with-latent-figures/fig04.png
    caption: "CelebA-HQ, FFHQ, LSUN-Churches, LSUN-Bedrooms, class-conditional ImageNet에서 학습한 LDM의 256×256 샘플"
    page: 5
    bbox_norm: [0.0757, 0.1062, 0.8969, 0.2433]
    strategy: caption-region
    curated: false
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/rombach-2022-high-resolution-image-synthesis-with-latent/fig05.png
    raw: raw/papers/rombach-2022-high-resolution-image-synthesis-with-latent-figures/fig05.png
    caption: "LAION으로 학습한 1.45B LDM-8(KL)의 text-to-image 샘플. prompt 7종, 200 DDIM step, guidance scale 10.0"
    page: 6
    bbox_norm: [0.0737, 0.1338, 0.9055, 0.324]
    strategy: caption-region
    curated: true
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/rombach-2022-high-resolution-image-synthesis-with-latent/fig06.png
    raw: raw/papers/rombach-2022-high-resolution-image-synthesis-with-latent-figures/fig06.png
    caption: "ImageNet class-conditional LDM의 f별 200만 step 학습 추이(FID, Inception Score). LDM-1은 느리고 LDM-32는 일찍 정체된다"
    page: 6
    bbox_norm: [0.0721, 0.3774, 0.4777, 0.4846]
    strategy: caption-region
    curated: true
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/rombach-2022-high-resolution-image-synthesis-with-latent/fig07.png
    raw: raw/papers/rombach-2022-high-resolution-image-synthesis-with-latent-figures/fig07.png
    caption: "CelebA-HQ(왼쪽)와 ImageNet(오른쪽)의 f별 샘플링 throughput 대비 FID. DDIM step 10에서 200까지 비교, LDM-4와 LDM-8이 가장 유리하다"
    page: 6
    bbox_norm: [0.0721, 0.5968, 0.4777, 0.7048]
    strategy: caption-region
    curated: true
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/rombach-2022-high-resolution-image-synthesis-with-latent/fig08.png
    raw: raw/papers/rombach-2022-high-resolution-image-synthesis-with-latent-figures/fig08.png
    caption: "COCO bounding box layout을 조건으로 준 layout-to-image 샘플. 왼쪽 열이 layout, 나머지가 생성 결과"
    page: 7
    bbox_norm: [0.0721, 0.0879, 0.4589, 0.2717]
    strategy: caption-region
    curated: false
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/rombach-2022-high-resolution-image-synthesis-with-latent/fig09.png
    raw: raw/papers/rombach-2022-high-resolution-image-synthesis-with-latent-figures/fig09.png
    caption: "256²로 학습한 semantic synthesis LDM이 convolutional 샘플링으로 만든 512×1024 풍경. 왼쪽 위가 semantic map 조건"
    page: 7
    bbox_norm: [0.4949, 0.5996, 0.9189, 0.7836]
    strategy: caption-region
    curated: true
  - id: fig10
    label: Figure 10
    kind: figure
    file: assets/rombach-2022-high-resolution-image-synthesis-with-latent/fig10.png
    raw: raw/papers/rombach-2022-high-resolution-image-synthesis-with-latent-figures/fig10.png
    caption: "ImageNet-Val 64→256 super-resolution 비교(bicubic, LDM-SR, SR3). LDM-SR은 질감, SR3는 미세 구조에 강하다"
    page: 8
    bbox_norm: [0.0741, 0.0972, 0.4689, 0.3028]
    strategy: caption-region
    curated: false
  - id: fig11
    label: Figure 11
    kind: figure
    file: assets/rombach-2022-high-resolution-image-synthesis-with-latent/fig11.png
    raw: raw/papers/rombach-2022-high-resolution-image-synthesis-with-latent-figures/fig11.png
    caption: "big, w/ ft inpainting 모델의 object removal 결과. 왼쪽이 마스크(빨간 윤곽) 입력, 오른쪽이 결과"
    page: 9
    bbox_norm: [0.0774, 0.1042, 0.4723, 0.5506]
    strategy: caption-region
    curated: false
  - id: fig12
    label: Figure 12
    kind: figure
    file: assets/rombach-2022-high-resolution-image-synthesis-with-latent/fig12.png
    raw: raw/papers/rombach-2022-high-resolution-image-synthesis-with-latent-figures/fig12.png
    caption: "512² 이미지로 fine-tuning한 semantic landscapes 모델의 convolutional 샘플 3장"
    page: 14
    bbox_norm: [0.1388, 0.1304, 0.8338, 0.882]
    strategy: caption-region
    curated: false
  - id: fig13
    label: Figure 13
    kind: figure
    file: assets/rombach-2022-high-resolution-image-synthesis-with-latent/fig13.png
    raw: raw/papers/rombach-2022-high-resolution-image-synthesis-with-latent-figures/fig13.png
    caption: "classifier-free guidance와 convolutional 샘플링을 결합해 1.45B text-to-image 모델이 256²보다 큰 이미지를 그린 예 4종"
    page: 15
    bbox_norm: [0.0866, 0.1138, 0.8633, 0.85]
    strategy: caption-region
    curated: false
  - id: fig14
    label: Figure 14
    kind: figure
    file: assets/rombach-2022-high-resolution-image-synthesis-with-latent/fig14.png
    raw: raw/papers/rombach-2022-high-resolution-image-synthesis-with-latent-figures/fig14.png
    caption: "풍경 unconditional 모델의 convolutional 샘플링은 전역 구조가 어긋날 수 있다(가운데). 저해상도 이미지 L2 guiding이 구조를 회복한다(오른쪽)"
    page: 18
    bbox_norm: [0.1843, 0.1511, 0.819, 0.6421]
    strategy: caption-region
    curated: false
  - id: fig15
    label: Figure 15
    kind: figure
    file: assets/rombach-2022-high-resolution-image-synthesis-with-latent/fig15.png
    raw: raw/papers/rombach-2022-high-resolution-image-synthesis-with-latent-figures/fig15.png
    caption: "latent rescaling이 convolutional 샘플링에 미치는 영향. KL-reg는 rescaling 전후, VQ-reg는 rescaling 없이 비교"
    page: 20
    bbox_norm: [0.0747, 0.1708, 0.9297, 0.513]
    strategy: caption-region
    curated: false
  - id: fig16
    label: Figure 16
    kind: figure
    file: assets/rombach-2022-high-resolution-image-synthesis-with-latent/fig16.png
    raw: raw/papers/rombach-2022-high-resolution-image-synthesis-with-latent-figures/fig16.png
    caption: "OpenImages 학습 후 COCO로 fine-tuning한 layout-to-image LDM-4의 추가 샘플. 100 DDIM step, η=0"
    page: 21
    bbox_norm: [0.0769, 0.4185, 0.8957, 0.8086]
    strategy: caption-region
    curated: false
  - id: fig17
    label: Figure 17
    kind: figure
    file: assets/rombach-2022-high-resolution-image-synthesis-with-latent/fig17.png
    raw: raw/papers/rombach-2022-high-resolution-image-synthesis-with-latent-figures/fig17.png
    caption: "class-conditional ImageNet LDM의 학습 추이를 35 V100-day 기준으로 다시 그린 FID와 Inception Score. 100 DDIM step"
    page: 22
    bbox_norm: [0.0721, 0.5869, 0.9005, 0.7996]
    strategy: caption-region
    curated: false
  - id: fig18
    label: Figure 18
    kind: figure
    file: assets/rombach-2022-high-resolution-image-synthesis-with-latent/fig18.png
    raw: raw/papers/rombach-2022-high-resolution-image-synthesis-with-latent-figures/fig18.png
    caption: "범용 upsampler LDM-BSR이 class-conditional LDM 샘플을 1024²로 키운 결과. 고정 bicubic 열화로 학습한 LDM-SR은 일반화가 떨어진다"
    page: 23
    bbox_norm: [0.034, 0.4148, 0.9192, 0.6539]
    strategy: caption-region
    curated: false
  - id: fig19
    label: Figure 19
    kind: figure
    file: assets/rombach-2022-high-resolution-image-synthesis-with-latent/fig19.png
    raw: raw/papers/rombach-2022-high-resolution-image-synthesis-with-latent-figures/fig19.png
    caption: "LDM-BSR로 LSUN-Cows 샘플을 1024²로 키운 결과. 왼쪽이 bicubic, 오른쪽이 LDM-BSR"
    page: 30
    bbox_norm: [0.1463, 0.1106, 0.8181, 0.8588]
    strategy: caption-region
    curated: false
  - id: fig20
    label: Figure 20
    kind: figure
    file: assets/rombach-2022-high-resolution-image-synthesis-with-latent/fig20.png
    raw: raw/papers/rombach-2022-high-resolution-image-synthesis-with-latent-figures/fig20.png
    caption: "같은 학습 step의 LDM-SR과 pixel space diffusion baseline의 super-resolution 정성 비교(ImageNet validation 2장)"
    page: 31
    bbox_norm: [0.1016, 0.1042, 0.871, 0.8819]
    strategy: caption-region
    curated: false
  - id: fig21
    label: Figure 21
    kind: figure
    file: assets/rombach-2022-high-resolution-image-synthesis-with-latent/fig21.png
    raw: raw/papers/rombach-2022-high-resolution-image-synthesis-with-latent-figures/fig21.png
    caption: "image inpainting 정성 결과. LaMa는 결과가 하나지만 LDM은 입력 하나에 여러 다양한 샘플을 만든다"
    page: 32
    bbox_norm: [0.1016, 0.1042, 0.871, 0.8819]
    strategy: caption-region
    curated: false
  - id: fig22
    label: Figure 22
    kind: figure
    file: assets/rombach-2022-high-resolution-image-synthesis-with-latent/fig22.png
    raw: raw/papers/rombach-2022-high-resolution-image-synthesis-with-latent-figures/fig22.png
    caption: "Figure 11과 같은 object removal 추가 결과. 입력과 결과를 나란히 배치"
    page: 33
    bbox_norm: [0.0721, 0.1042, 0.7113, 0.9006]
    strategy: caption-region
    curated: false
  - id: fig23
    label: Figure 23
    kind: figure
    file: assets/rombach-2022-high-resolution-image-synthesis-with-latent/fig23.png
    raw: raw/papers/rombach-2022-high-resolution-image-synthesis-with-latent-figures/fig23.png
    caption: "512² 이미지로 fine-tuning한 semantic landscapes 모델의 convolutional 샘플(Flickr-Landscapes)"
    page: 34
    bbox_norm: [0.1833, 0.1416, 0.7893, 0.846]
    strategy: caption-region
    curated: false
  - id: fig24
    label: Figure 24
    kind: figure
    file: assets/rombach-2022-high-resolution-image-synthesis-with-latent/fig24.png
    raw: raw/papers/rombach-2022-high-resolution-image-synthesis-with-latent-figures/fig24.png
    caption: "256²로 학습한 LDM이 풍경 semantic synthesis에서 더 큰 해상도로 일반화한 예"
    page: 35
    bbox_norm: [0.0721, 0.1639, 0.9005, 0.7971]
    strategy: caption-region
    curated: false
  - id: fig25
    label: Figure 25
    kind: figure
    file: assets/rombach-2022-high-resolution-image-synthesis-with-latent/fig25.png
    raw: raw/papers/rombach-2022-high-resolution-image-synthesis-with-latent-figures/fig25.png
    caption: "semantic map 조건으로 256² 학습 모델이 1024×384처럼 훨씬 큰 해상도의 샘플을 만든 예"
    page: 36
    bbox_norm: [0.153, 0.1075, 0.8196, 0.8862]
    strategy: caption-region
    curated: false
  - id: fig26
    label: Figure 26
    kind: figure
    file: assets/rombach-2022-high-resolution-image-synthesis-with-latent/fig26.png
    raw: raw/papers/rombach-2022-high-resolution-image-synthesis-with-latent-figures/fig26.png
    caption: "ImageNet LDM-4의 무작위 class-conditional 샘플. classifier-free guidance scale 5.0, 200 DDIM step, η=1.0"
    page: 37
    bbox_norm: [0.1125, 0.1093, 0.86, 0.8742]
    strategy: caption-region
    curated: false
  - id: fig27
    label: Figure 27
    kind: figure
    file: assets/rombach-2022-high-resolution-image-synthesis-with-latent/fig27.png
    raw: raw/papers/rombach-2022-high-resolution-image-synthesis-with-latent-figures/fig27.png
    caption: "ImageNet LDM-4의 무작위 class-conditional 샘플. classifier-free guidance scale 3.0, 200 DDIM step, η=1.0"
    page: 38
    bbox_norm: [0.1125, 0.1093, 0.86, 0.8742]
    strategy: caption-region
    curated: false
  - id: fig28
    label: Figure 28
    kind: figure
    file: assets/rombach-2022-high-resolution-image-synthesis-with-latent/fig28.png
    raw: raw/papers/rombach-2022-high-resolution-image-synthesis-with-latent-figures/fig28.png
    caption: "CelebA-HQ 최고 모델 LDM-4의 무작위 샘플. 500 DDIM step, η=0, FID 5.15"
    page: 39
    bbox_norm: [0.1125, 0.1265, 0.86, 0.8446]
    strategy: caption-region
    curated: false
  - id: fig29
    label: Figure 29
    kind: figure
    file: assets/rombach-2022-high-resolution-image-synthesis-with-latent/fig29.png
    raw: raw/papers/rombach-2022-high-resolution-image-synthesis-with-latent-figures/fig29.png
    caption: "FFHQ 최고 모델 LDM-4의 무작위 샘플. 200 DDIM step, η=1, FID 4.98"
    page: 40
    bbox_norm: [0.1125, 0.1265, 0.86, 0.8446]
    strategy: caption-region
    curated: false
  - id: fig30
    label: Figure 30
    kind: figure
    file: assets/rombach-2022-high-resolution-image-synthesis-with-latent/fig30.png
    raw: raw/papers/rombach-2022-high-resolution-image-synthesis-with-latent-figures/fig30.png
    caption: "LSUN-Churches 최고 모델 LDM-8의 무작위 샘플. 200 DDIM step, η=0, FID 4.48"
    page: 41
    bbox_norm: [0.1125, 0.1265, 0.86, 0.8446]
    strategy: caption-region
    curated: false
  - id: fig31
    label: Figure 31
    kind: figure
    file: assets/rombach-2022-high-resolution-image-synthesis-with-latent/fig31.png
    raw: raw/papers/rombach-2022-high-resolution-image-synthesis-with-latent-figures/fig31.png
    caption: "LSUN-Bedrooms 최고 모델 LDM-4의 무작위 샘플. 200 DDIM step, η=1, FID 2.95"
    page: 42
    bbox_norm: [0.1125, 0.1265, 0.86, 0.8446]
    strategy: caption-region
    curated: false
  - id: fig32
    label: Figure 32
    kind: figure
    file: assets/rombach-2022-high-resolution-image-synthesis-with-latent/fig32.png
    raw: raw/papers/rombach-2022-high-resolution-image-synthesis-with-latent-figures/fig32.png
    caption: "CelebA-HQ 모델 샘플의 VGG-16 feature space nearest neighbor. 맨 왼쪽이 생성 샘플, 나머지가 학습 데이터 이웃 10장"
    page: 43
    bbox_norm: [0.1125, 0.2223, 0.8601, 0.7488]
    strategy: caption-region
    curated: false
  - id: fig33
    label: Figure 33
    kind: figure
    file: assets/rombach-2022-high-resolution-image-synthesis-with-latent/fig33.png
    raw: raw/papers/rombach-2022-high-resolution-image-synthesis-with-latent-figures/fig33.png
    caption: "FFHQ 모델 샘플의 VGG-16 feature space nearest neighbor. 맨 왼쪽이 생성 샘플, 나머지가 이웃 10장"
    page: 44
    bbox_norm: [0.1125, 0.2223, 0.8601, 0.7488]
    strategy: caption-region
    curated: false
  - id: fig34
    label: Figure 34
    kind: figure
    file: assets/rombach-2022-high-resolution-image-synthesis-with-latent/fig34.png
    raw: raw/papers/rombach-2022-high-resolution-image-synthesis-with-latent-figures/fig34.png
    caption: "LSUN-Churches 모델 샘플의 VGG-16 feature space nearest neighbor. 맨 왼쪽이 생성 샘플, 나머지가 이웃 10장"
    page: 45
    bbox_norm: [0.1125, 0.2223, 0.8601, 0.7488]
    strategy: caption-region
    curated: false
  - id: tab01
    label: Table 1
    kind: table
    file: assets/rombach-2022-high-resolution-image-synthesis-with-latent/tab01.png
    raw: raw/papers/rombach-2022-high-resolution-image-synthesis-with-latent-figures/tab01.png
    caption: "unconditional 합성 평가지표(4개 데이터셋의 FID, Precision, Recall). 크롭 결함: 파일에는 Table 2 영역이 담겨 tab02와 중복이다"
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
    caption: "MS-COCO 256×256 text-conditional 합성 비교. LDM-KL-8-G가 FID 12.63, IS 30.29로 GLIDE와 Make-A-Scene에 근접, 파라미터 1.45B"
    page: 6
    bbox_norm: [0.4949, 0.6214, 0.9005, 0.7252]
    strategy: table-region
    curated: false
  - id: tab03
    label: Table 3
    kind: table
    file: assets/rombach-2022-high-resolution-image-synthesis-with-latent/tab03.png
    raw: raw/papers/rombach-2022-high-resolution-image-synthesis-with-latent-figures/tab03.png
    caption: "class-conditional ImageNet 비교. LDM-4-G가 FID 3.60, IS 247.67로 ADM-G(4.59, 608M)를 400M 파라미터로 앞선다"
    page: 7
    bbox_norm: [0.4949, 0.0837, 0.9005, 0.1564]
    strategy: table-region
    curated: false
  - id: tab04
    label: Table 4
    kind: table
    file: assets/rombach-2022-high-resolution-image-synthesis-with-latent/tab04.png
    raw: raw/papers/rombach-2022-high-resolution-image-synthesis-with-latent-figures/tab04.png
    caption: "super-resolution과 inpainting user study. 크롭 결함: 파일에는 표 대신 8쪽 본문 문단(LDM-BSR 소개)이 담겨 있다"
    page: 8
    bbox_norm: [0.0721, 0.8353, 0.5002, 0.9461]
    strategy: table-region
    low_confidence: true
    curated: false
  - id: tab05
    label: Table 5
    kind: table
    file: assets/rombach-2022-high-resolution-image-synthesis-with-latent/tab05.png
    raw: raw/papers/rombach-2022-high-resolution-image-synthesis-with-latent-figures/tab05.png
    caption: "ImageNet-Val ×4 upscaling 결과. 크롭 결함: 파일에는 Table 6(inpainting 효율) 영역이 담겨 있다"
    page: 8
    bbox_norm: [0.4949, 0.1931, 0.9005, 0.272]
    strategy: table-region
    low_confidence: true
    curated: false
  - id: tab07
    label: Table 7
    kind: table
    file: assets/rombach-2022-high-resolution-image-synthesis-with-latent/tab07.png
    raw: raw/papers/rombach-2022-high-resolution-image-synthesis-with-latent-figures/tab07.png
    caption: "Places 512×512 crop 3만 장 inpainting 비교. LDM-4 big, w/ ft가 FID 9.39(40~50% 마스크)와 1.50(전체)으로 최저"
    page: 9
    bbox_norm: [0.4949, 0.08, 0.9005, 0.2545]
    strategy: table-region
    curated: false
  - id: tab08
    label: Table 8
    kind: table
    file: assets/rombach-2022-high-resolution-image-synthesis-with-latent/tab08.png
    raw: raw/papers/rombach-2022-high-resolution-image-synthesis-with-latent-figures/tab08.png
    caption: "OpenImages 학습 autoencoder 전체 목록과 ImageNet-Val 재구성 지표. 크롭 결함: 파일에는 Figure 16 영역이 담겨 있다"
    page: 21
    bbox_norm: [0.0769, 0.3931, 0.8957, 0.8113]
    strategy: table-region
    low_confidence: true
    curated: false
  - id: tab09
    label: Table 9
    kind: table
    file: assets/rombach-2022-high-resolution-image-synthesis-with-latent/tab09.png
    raw: raw/papers/rombach-2022-high-resolution-image-synthesis-with-latent-figures/tab09.png
    caption: "COCO와 OpenImages layout-to-image 정량 비교. 크롭 결함: 파일에는 Table 10 영역이 담겨 tab10과 중복이다"
    page: 22
    bbox_norm: [0.0721, 0.2698, 0.9005, 0.4823]
    strategy: table-region
    low_confidence: true
    curated: false
  - id: tab10
    label: Table 10
    kind: table
    file: assets/rombach-2022-high-resolution-image-synthesis-with-latent/tab10.png
    raw: raw/papers/rombach-2022-high-resolution-image-synthesis-with-latent-figures/tab10.png
    caption: "class-conditional ImageNet 확장 비교. ImageBART, VQGAN+T, CDM, ADM 계열과 LDM-8, LDM-4 계열의 FID, IS, Precision, Recall"
    page: 22
    bbox_norm: [0.0721, 0.2698, 0.9005, 0.4823]
    strategy: table-region
    curated: false
  - id: tab11
    label: Table 11
    kind: table
    file: assets/rombach-2022-high-resolution-image-synthesis-with-latent/tab11.png
    raw: raw/papers/rombach-2022-high-resolution-image-synthesis-with-latent-figures/tab11.png
    caption: "ImageNet-Val ×4 upscaling 확장 결과. 같은 연산량의 Pixel-DM과 15 epoch 추가 학습한 LDM-4 비교"
    page: 23
    bbox_norm: [0.2373, 0.0838, 0.732, 0.2224]
    strategy: table-region
    curated: false
  - id: tab12
    label: Table 12
    kind: table
    file: assets/rombach-2022-high-resolution-image-synthesis-with-latent/tab12.png
    raw: raw/papers/rombach-2022-high-resolution-image-synthesis-with-latent-figures/tab12.png
    caption: "Table 1 결과를 낸 unconditional LDM 4종의 hyperparameter. 단일 A100 학습"
    page: 24
    bbox_norm: [0.153, 0.1687, 0.8196, 0.3619]
    strategy: table-region
    curated: false
  - id: tab13
    label: Table 13
    kind: table
    file: assets/rombach-2022-high-resolution-image-synthesis-with-latent/tab13.png
    raw: raw/papers/rombach-2022-high-resolution-image-synthesis-with-latent-figures/tab13.png
    caption: "Sec 4.1 f 분석에 쓴 ImageNet conditional LDM-1부터 LDM-32까지의 hyperparameter. 파라미터 391M에서 396M"
    page: 24
    bbox_norm: [0.153, 0.4387, 0.8196, 0.6762]
    strategy: table-region
    curated: false
  - id: tab14
    label: Table 14
    kind: table
    file: assets/rombach-2022-high-resolution-image-synthesis-with-latent/tab14.png
    raw: raw/papers/rombach-2022-high-resolution-image-synthesis-with-latent-figures/tab14.png
    caption: "Fig 7 분석에 쓴 CelebA unconditional LDM-1부터 LDM-32까지의 hyperparameter. 크롭 결함: 파일에는 Table 15 영역이 담겨 tab15와 중복이다"
    page: 25
    bbox_norm: [0.0923, 0.3494, 0.8803, 0.6026]
    strategy: table-region
    low_confidence: true
    curated: false
  - id: tab15
    label: Table 15
    kind: table
    file: assets/rombach-2022-high-resolution-image-synthesis-with-latent/tab15.png
    raw: raw/papers/rombach-2022-high-resolution-image-synthesis-with-latent-figures/tab15.png
    caption: "Sec 4 conditional LDM 6종의 hyperparameter. inpainting만 V100 8장, 나머지는 단일 A100"
    page: 25
    bbox_norm: [0.0923, 0.3494, 0.8803, 0.6026]
    strategy: table-region
    curated: false
  - id: tab16
    label: Table 16
    kind: table
    file: assets/rombach-2022-high-resolution-image-synthesis-with-latent/tab16.png
    raw: raw/papers/rombach-2022-high-resolution-image-synthesis-with-latent-figures/tab16.png
    caption: "ablated UNet의 self-attention 층을 대체하는 Transformer 블록 구조. self-attention, MLP, cross-attention을 T번 반복"
    page: 26
    bbox_norm: [0.3622, 0.2646, 0.6104, 0.4092]
    strategy: table-region
    curated: false
  - id: tab17
    label: Table 17
    kind: table
    file: assets/rombach-2022-high-resolution-image-synthesis-with-latent/tab17.png
    raw: raw/papers/rombach-2022-high-resolution-image-synthesis-with-latent-figures/tab17.png
    caption: "Transformer 인코더 τ_θ의 hyperparameter. text-to-image는 seq 77, depth 32, dim 1280, layout은 92, 16, 512"
    page: 26
    bbox_norm: [0.3057, 0.4769, 0.6669, 0.5654]
    strategy: table-region
    curated: false
  - id: tab18
    label: Table 18
    kind: table
    file: assets/rombach-2022-high-resolution-image-synthesis-with-latent/tab18.png
    raw: raw/papers/rombach-2022-high-resolution-image-synthesis-with-latent-figures/tab18.png
    caption: "학습 연산량(V100-day)과 추론 throughput 비교. LDM이 StyleGAN2와 ADM에 근접한 FID를 훨씬 적은 연산으로 낸다"
    page: 28
    bbox_norm: [0.0923, 0.1232, 0.8803, 0.4272]
    strategy: table-region
    curated: false
---

## 한 줄 요약 (One-line Summary)

diffusion model을 pixel space가 아니라 미리 학습한 autoencoder의 latent space에서 학습시켜 품질을 유지하면서 학습과 추론 비용을 크게 낮춘 Latent Diffusion Model(LDM) 논문이다. cross-attention conditioning으로 text, layout, class label을 한 틀에서 다루고, class-conditional ImageNet과 inpainting에서 당시 최고 성능을 냈다.

## 1. 자료 정보 (Document Information)

- **제목**: High-Resolution Image Synthesis with Latent Diffusion Models
- **저자**: Robin Rombach, Andreas Blattmann(두 사람이 공동 1저자), Dominik Lorenz, Björn Ommer(이상 Ludwig Maximilian University of Munich와 IWR, Heidelberg University), Patrick Esser(Runway ML)
- **버전**: arXiv 2112.10752v2(2022년 4월 13일). raw 본문에는 게재 학회가 적혀 있지 않다. 같은 wiki의 DiT 논문과 Flow Matching 논문 참고문헌에 CVPR 2022(pp. 10684-10695)로 인용돼 있다.
- **v1 대비 변경(부록 A)**: 1.45B 파라미터 text-to-image 모델을 새로 학습해 Sec 4.3 결과와 GLIDE, LAFITE, Make-A-Scene 비교를 갱신했다. class-conditional ImageNet 모델을 더 큰 batch로 재학습하고 두 모델 모두 classifier-free guidance를 적용했다. inpainting과 super-resolution user study를 추가했다. Fig 5를 본문에 넣고 Fig 18을 부록으로 옮겼으며 Fig 13을 부록에 추가했다.
- **코드와 모델**: https://github.com/CompVis/latent-diffusion (pre-training된 LDM과 autoencoder 공개)
- **지원**: German Federal Ministry for Economic Affairs and Energy의 'KI-Absicherung' 프로젝트, DFG 프로젝트 421703927
- **유형**: 논문 (생성 모델 아키텍처, 본문 9쪽과 부록 A~H 포함 45쪽)

diffusion model은 denoising autoencoder를 순차적으로 적용해 이미지 생성 과정을 분해하는 likelihood 기반 생성 모델이다. 당시 이미지 합성에서 최고 품질을 냈지만 pixel space에서 직접 동작하기 때문에 가장 강력한 모델의 학습에 150~1,000 V100-day가 들고, 단일 A100으로 5만 장을 샘플링하는 데 약 5일이 걸렸다. 이 논문은 그 비용의 근원을 rate-distortion 관점에서 짚고 학습을 두 단계로 나누는 해법을 제시한다.

## 2. 주요 기여 (Key Contributions)

- **latent space diffusion**: RGB pixel 대신 autoencoder가 만든 저차원 latent에서 diffusion model을 학습한다. 순수 Transformer 기반 접근(VQGAN, DALL-E)보다 고차원 데이터로 매끄럽게 확장되고, 공격적 압축 없이 충실한 재구성을 얻으며 megapixel 이미지 합성에도 효율적으로 적용된다.
- **비용 절감**: unconditional 합성, inpainting, stochastic super-resolution 등 여러 과제에서 경쟁력 있는 성능을 내면서 학습 비용과 추론 비용을 함께 낮춘다.
- **재구성과 생성의 분리**: 인코더와 디코더를 score 기반 prior와 동시에 학습하는 LSGM과 달리 autoencoder를 한 번만 학습해 고정한다. 그래서 재구성 능력과 생성 능력 사이의 미묘한 가중치 조정이 필요 없고, latent space에 대한 정규화가 거의 필요 없으며 재구성이 매우 충실하다.
- **convolutional 적용**: super-resolution, inpainting, semantic synthesis처럼 조건이 공간적으로 조밀한 과제에서는 모델을 convolutional 방식으로 적용해 약 1024² 크기의 일관된 이미지를 만든다.
- **cross-attention conditioning**: cross-attention 기반의 범용 conditioning으로 multi-modal 학습을 가능하게 하고 class-conditional, text-to-image, layout-to-image 모델을 학습한다.
- **모델 공개**: pre-training된 latent diffusion 모델과 autoencoder를 공개해 diffusion 학습 외의 용도에도 재사용할 수 있게 했다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

LDM은 학습을 perceptual compression 단계와 generative 학습 단계로 명시적으로 분리한다. 출발점은 학습된 diffusion model의 rate-distortion 곡선(Fig 2)이다. likelihood 기반 모델의 학습은 고주파 세부를 제거하되 의미 변화는 거의 배우지 않는 perceptual compression 구간과, 데이터의 의미 구성을 배우는 semantic compression 구간으로 나뉜다. diffusion model은 손실 항을 줄여 지각되지 않는 정보를 억제할 수 있지만 그래디언트와 backbone은 여전히 모든 픽셀에서 평가돼야 한다.

이 접근의 이점은 세 가지다. 저차원 공간에서 샘플링하므로 연산이 효율적이고, UNet의 inductive bias 덕분에 공간 구조를 가진 데이터에 효과적이어서 공격적 압축이 필요 없으며, 학습된 latent space를 여러 생성 모델이나 CLIP-guided 합성 같은 다른 응용에 재사용할 수 있다.

### 3.1 perceptual image compression

autoencoder는 VQGAN(Esser et al. [23])을 따라 perceptual 손실과 patch 기반 adversarial 손실을 결합해 학습한다. adversarial 손실은 재구성을 이미지 manifold에 가두어 국소 사실성을 강제하고 L2나 L1 손실만 쓸 때 생기는 흐릿함을 피한다. RGB 이미지 x ∈ R^{H×W×3}을 인코더 E가 latent z = E(x) ∈ R^{h×w×c}로 바꾸고 디코더 D가 x̃ = D(E(x))로 복원한다. 다운샘플링 계수는 f = H/h = W/w이며 f = 2^m을 실험한다.

| 정규화 | 방식 | 가까운 모델 | 세부 |
|---|---|---|---|
| KL-reg | 학습된 latent에 표준정규 분포를 향한 약한 KL penalty를 건다 | VAE | KL 항 가중치 약 10^-6. diffusion 학습 시 z = E_μ(x) + E_σ(x) ε로 샘플링한다 |
| VQ-reg | 디코더 안에 벡터 양자화(vector quantization) 층을 두고 코드북을 학습한다 | VQGAN(양자화 층을 디코더가 흡수한 형태) | 코드북 차원을 크게 잡아 정규화를 약하게 한다. diffusion 학습에는 양자화 이전의 z를 쓴다 |

전체 목표(부록 G, Eq 25)는 재구성 손실 L_rec, patch 기반 판별기 D_ψ의 adversarial 손실 L_adv, 정규화 손실 L_reg의 min-max 결합이다. 후속 diffusion model이 2차원 latent 구조를 그대로 다루므로 온화한 압축률로도 매우 좋은 재구성을 얻는다. VQGAN과 DALL-E는 latent를 임의의 1D 순서로 펼쳐 autoregressive하게 모델링하느라 고유 구조를 대부분 무시했다.

### 3.2 latent diffusion model

diffusion model은 정규분포 변수를 점진적으로 denoising해 p(x)를 배우는 확률 모델로, 길이 T의 고정 Markov chain을 되돌리는 과정을 학습한다. 가장 성공한 모델(DDPM, ADM, SR3)은 변분 하한의 reweighted 변형을 쓰며 이는 denoising score-matching과 같다. 목표는 다음으로 단순화된다.

- pixel space: L_DM = E_{x, ε~N(0,1), t}[‖ε − ε_θ(x_t, t)‖²₂], t는 {1, ..., T}에서 균등 샘플링 (Eq 1)
- latent space: L_LDM = E_{E(x), ε~N(0,1), t}[‖ε − ε_θ(z_t, t)‖²₂] (Eq 2)

부록 B는 SNR(t) = α_t²/σ_t²로 규정한 forward 과정과 ELBO에서 출발해, reparameterization ε_θ = (x_t − α_t x_θ)/σ_t와 동일 가중치 재조정으로 Eq 1을 유도한다. backbone ε_θ(∘, t)는 시점 t로 조건화된 UNet이며 주로 2D convolution 층으로 구성한다. forward 과정이 고정돼 있으므로 z_t는 E에서 바로 얻고, 샘플은 D를 한 번 통과시켜 이미지로 복원한다.

### 3.3 conditioning 메커니즘

조건부 denoising autoencoder ε_θ(z_t, t, y)로 p(z|y)를 모델링한다. 당시 diffusion model의 conditioning은 class label(ADM)이나 흐린 입력(SR3)에 머물렀다. LDM은 도메인별 인코더 τ_θ가 조건 y를 τ_θ(y) ∈ R^{M×d_τ}로 투영하고 UNet 중간 층에 cross-attention으로 사상한다.

- Attention(Q, K, V) = softmax(QK^T/√d) V
- Q = W_Q^{(i)} φ_i(z_t), K = W_K^{(i)} τ_θ(y), V = W_V^{(i)} τ_θ(y)
- φ_i(z_t) ∈ R^{N×d_ε^i}는 UNet의 평탄화한 중간 표현, W 세 개는 학습 가능한 투영 행렬

조건부 목표는 L_LDM = E_{E(x), y, ε, t}[‖ε − ε_θ(z_t, t, τ_θ(y))‖²₂](Eq 3)이고 τ_θ와 ε_θ를 함께 최적화한다.

| 과제 | τ_θ 구현 | 세부 |
|---|---|---|
| text-to-image | unmasked Transformer(x-transformers 기반), BERT 토크나이저 | seq-length 77, depth N 32, dim 1280 (Table 17) |
| layout-to-image | unmasked Transformer | bounding box를 (l, b, c) 튜플로 이산화(l은 왼쪽 위, b는 오른쪽 아래, c는 class). seq-length 92, depth 16, dim 512 |
| class-conditional | 단일 학습 가능 임베딩 층 | class y를 ζ ∈ R^{1×512}로 사상 |
| super-resolution, inpainting, semantic synthesis | identity, 조건을 UNet 입력에 concat | 공간적으로 정렬된 조건에 사용 |

Transformer τ_θ는 토큰 임베딩과 위치 임베딩을 더한 뒤 LayerNorm, multi-head self-attention, position-wise MLP를 N번 반복한다(Eq 18~24). UNet 쪽은 ADM의 "ablated UNet"에서 self-attention 층을 self-attention, MLP, cross-attention이 번갈아 나오는 얕은 unmasked Transformer T블록으로 바꾼 것이다(Table 16). τ_θ를 시점 t에도 조건화하는 변형은 추론 속도 때문에 채택하지 않았다.

### 3.4 convolutional 샘플링과 latent 스케일

공간 조건을 ε_θ 입력에 concat하면 LDM은 범용 image-to-image 변환 모델이 된다. semantic synthesis는 다운샘플링한 semantic map을 f = 4 VQ-reg 모델의 latent와 concat하며, 384² 이미지에서 자른 256² crop으로 학습해도 convolutional 방식으로 평가하면 megapixel 영역까지 일반화한다(Fig 9). super-resolution과 inpainting 모델도 512²에서 1024² 사이의 큰 이미지를 만든다.

이때 latent 스케일이 유도하는 signal-to-noise ratio Var(z)/σ_t²가 결과를 크게 좌우한다. KL-reg latent에서 바로 학습하면 이 비율이 매우 높아 reverse 과정 초반에 의미 세부를 과도하게 할당하므로, 첫 batch에서 성분별 분산 σ̂²을 추정해 z ← z/σ̂로 rescaling한다(부록 G, Fig 15). VQ-reg latent는 분산이 1에 가까워 rescaling이 필요 없다. rescaling과 classifier-free guidance를 결합하면 text-conditional LDM-KL-8-G로도 256²보다 큰 이미지를 직접 합성한다(Fig 13).

### 3.5 post-hoc image guiding

부록 C는 ADM의 classifier guiding ε̂ ← ε_θ(z_t, t) + √(1 − α_t²) ∇_{z_t} log p_Φ(y|z_t)를 image-to-image 변환으로 재해석한다. guiding 분포를 p_Φ(y|T(D(z_0(z_t))))로 두고 분산 1의 Gaussian guider를 가정하면 L2 회귀 목표 −½‖y − T(D(z_0(z_t)))‖²₂가 된다. 256² unconditional 샘플로 512² convolutional 합성을 guiding하면 어긋난 전역 구조가 회복되고(Fig 14), LPIPS 기반 perceptual guider는 super-resolution의 PSNR과 SSIM을 올린다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 압축률 f 분석

f ∈ {1, 2, 4, 8, 16, 32}(LDM-1은 pixel 기반)를 단일 A100에서 같은 step 수와 파라미터 수(391M~396M, Table 13)로 비교했다. batch size는 LDM-1의 7부터 LDM-16과 LDM-32의 112까지 늘렸다.

- ImageNet class-conditional 200만 step(Fig 6): LDM-1과 LDM-2는 학습이 느리고 LDM-32는 이른 시점에 품질이 정체된다. 원인은 perceptual compression을 diffusion model에 떠넘긴 것과 1단계 압축이 지나쳐 정보가 손실된 것이다. LDM-4에서 LDM-16이 균형을 이루며 LDM-1과 LDM-8의 FID 격차는 38이다.
- throughput 대비 FID(Fig 7): CelebA-HQ 50만 step과 ImageNet 200만 step 모델을 DDIM step 10, 20, 50, 100, 200으로 비교했다(FID는 5,000장 기준). LDM-4와 LDM-8이 LDM-1보다 훨씬 낮은 FID를 훨씬 높은 throughput으로 낸다. ImageNet 같은 복잡한 데이터셋은 압축률을 낮춰야 한다.
- V100-day 기준(Fig 17): 35 V100-day 예산으로 다시 그려도 정성적으로 같다.

VQ-reg latent에서 학습한 LDM은 1단계 재구성이 KL-reg보다 조금 뒤지는데도(Table 8) 샘플 품질은 때때로 더 좋았다.

### 4.2 autoencoder 재구성(Table 8)

OpenImages로 학습하고 ImageNet-Val에서 평가한 R-FID는 VQ-reg가 f = 32에서 31.83, f = 16에서 5.15, f = 8에서 1.14, f = 4에서 0.58, f = 2에서 0.16이고 KL-reg가 같은 순서로 2.04(c = 64), 0.87, 0.90, 0.27, 0.086이다. 비교 대상인 VQGAN f = 16(코드북 16384)은 4.98, DALL-E f = 8은 32.01이다. PSNR은 f = 4 VQ가 27.43, KL이 27.53이며 attention 없는 f = 4 VQ는 R-FID 1.06으로 조금 나빠진다. Fig 1의 DIV2K 예시(512²)에서 f = 4 모델(PSNR 27.4, R-FID 0.58)이 DALL-E f = 8(22.8, 32.01)과 VQGAN f = 16(19.9, 4.98)보다 세부를 잘 보존한다.

### 4.3 unconditional 합성(Table 1)

256² unconditional 모델을 FID, Precision, Recall로 평가했다. 통계는 5만 장 샘플과 전체 학습 세트로 추정하고 torch-fidelity로 계산했으며, Dhariwal and Nichol의 스크립트로는 ImageNet 7.76 대 7.77, LSUN-Bedrooms 2.95 대 3.0으로 조금 달랐다.

| 데이터셋 | LDM 결과 | 주요 비교 대상 |
|---|---|---|
| CelebA-HQ | LDM-4(500 DDIM step) FID 5.11, Precision 0.72, Recall 0.49 | LSGM 7.22, UDM 7.16, PGGAN 8.0, VQGAN+T 10.2, DC-VAE 15.8 |
| FFHQ | LDM-4(200 step) FID 4.98, 0.73, 0.50 | ProjectedGAN 3.08(0.65, 0.46), StyleGAN 4.16(0.71, 0.46), UDM 5.54, ImageBART 9.57 |
| LSUN-Churches | LDM-8(KL-reg, 200 step) FID 4.02, 0.64, 0.52 | ProjectedGAN 1.59(0.61, 0.44), StyleGAN2 3.86, StyleGAN 4.21, DDPM 7.89 |
| LSUN-Bedrooms | LDM-4(200 step) FID 2.95, 0.66, 0.48 | ProjectedGAN 1.52(0.61, 0.34), ADM 1.90(0.66, 0.51), StyleGAN 2.35(0.59, 0.48), DDPM 4.9 |

CelebA-HQ에서는 FID 5.11로 당시 최고이며 1단계와 latent diffusion을 함께 학습하는 LSGM도 앞섰다. diffusion 기반 이전 접근을 LSUN-Bedrooms를 제외한 모든 데이터셋에서 앞섰고, Bedrooms에서는 ADM에 근접하면서 파라미터는 절반, 학습 자원은 4분의 1이다. Precision과 Recall에서는 GAN 기반 방법을 꾸준히 앞서 mode-covering 목표의 이점을 확인했다.

### 4.4 text-to-image(Table 2)

LAION-400M에서 1.45B 파라미터 KL-reg LDM(f = 8, 채널 320, head 8, batch 680, 39만 iteration)을 학습하고 MS-COCO validation set 3만 장과 비교해 256×256에서 평가했다.

| 모델 | FID | IS | 파라미터 | 설정 |
|---|---|---|---|---|
| CogView | 27.10 | 18.20 | 4B | self-ranking, rejection rate 0.017 |
| LAFITE | 26.94 | 26.02 | 75M | |
| GLIDE | 12.24 | - | 6B | 277 DDIM step, c.f.g. s = 3 |
| Make-A-Scene | 11.84 | - | 4B | AR 모델용 c.f.g. s = 5 |
| LDM-KL-8 | 23.31 | 20.03±0.33 | 1.45B | 250 DDIM step |
| LDM-KL-8-G | 12.63 | 30.29±0.42 | 1.45B | 250 DDIM step, c.f.g. s = 1.5 |

classifier-free guidance가 샘플 품질을 크게 올려 LDM-KL-8-G는 GLIDE와 Make-A-Scene에 대등하면서 파라미터가 크게 적다. Fig 5의 샘플은 200 DDIM step, η = 1.0, guidance s = 10.0이다.

### 4.5 layout-to-image(Table 9)

OpenImages와 COCO에서 학습하고 COCO로 fine-tuning했다. 평가는 COCO Segmentation Challenge split 2,048장과 OpenImages validation center-crop 2,048장이다. COCO 256²에서 LostGAN-V2 42.55, OC-GAN 41.65, SPADE 41.11, VQGAN+T 56.58 대비 LDM-8(100 step, 처음부터 학습)은 42.06, LDM-4(200 step, OpenImages에서 fine-tuning)는 40.91이다. OpenImages 256²와 512²에서는 LDM-4가 32.02와 35.80으로 VQGAN+T의 45.33과 48.11보다 약 11 낮다.

### 4.6 class-conditional ImageNet(Table 3, Table 10)

| 모델 | FID | IS | Precision | Recall | 파라미터 | 설정 |
|---|---|---|---|---|---|---|
| BigGAN-deep | 6.95 | 203.6±2.6 | 0.87 | 0.28 | 340M | |
| ADM | 10.94 | 100.98 | 0.69 | 0.63 | 554M | 250 DDIM step |
| ADM-G | 4.59 | 186.7 | 0.82 | 0.52 | 608M | 250 DDIM step |
| ADM-G, ADM-U | 3.85 | 221.72 | 0.84 | 0.53 | n/a | 2×250 DDIM step |
| LDM-8 | 15.51 | 79.03±1.03 | 0.65 | 0.63 | 395M | 200 DDIM step, 480만 step, batch 64 |
| LDM-8-G | 7.76 | 209.52±4.24 | 0.84 | 0.35 | 506M | classifier scale 10, 480만 step |
| LDM-4 | 10.56 | 103.49±1.24 | 0.71 | 0.62 | 400M | 250 DDIM step, 17.8만 step, batch 1200 |
| LDM-4-G | 3.95 | 178.22±2.43 | 0.81 | 0.55 | 400M | c.f.g. scale 1.25 |
| LDM-4-G | 3.60 | 247.67±5.59 | 0.87 | 0.48 | 400M | c.f.g. scale 1.5 |

Table 10에는 SR3 11.30(625M), ImageBART 21.19와 7.44(3.5B), VQGAN+T 17.04와 5.88(1.3B), CDM 4.88, 290만 step의 LDM-8 17.41과 LDM-8-G 8.11도 실려 있다. LDM-4-G는 당시 최고 diffusion model ADM-G를 FID와 IS에서 앞서면서 파라미터를 줄였다. LDM-8-G는 latent space에서 값싸게 학습한 noise scale별 classifier로 guiding한다.

### 4.7 super-resolution(Table 5, Table 11, Table 4)

SR3를 따라 bicubic 4× 열화를 고정하고 ImageNet에서 학습했다. OpenImages로 pre-training한 f = 4 VQ-reg autoencoder를 쓰고 저해상도 조건을 UNet 입력에 concat한다.

| 모델 | FID(val / train 기준) | IS | PSNR | SSIM | 파라미터 | 샘플/초 |
|---|---|---|---|---|---|---|
| Image Regression | 15.2 | 121.1 | 27.9 | 0.801 | 625M | N/A |
| SR3 | 5.2 | 180.1 | 26.4 | 0.762 | 625M | N/A |
| LDM-4(100 step) | 2.8 / 4.8 | 166.3 | 24.4±3.8 | 0.69±0.14 | 169M | 4.62 |
| LDM-4(big, 100 step) | 2.4 / 4.3 | 174.9 | 24.7±4.1 | 0.71±0.15 | 552M | 4.5 |
| LDM-4(50 step, guiding) | 4.4 / 6.4 | 153.7 | 25.8±3.7 | 0.74±0.12 | 184M | 0.38 |
| LDM-4(100 step, +15 epoch) | 2.6 / 4.6 | 169.76±5.03 | 24.4±3.8 | 0.69±0.14 | | |
| Pixel-DM(100 step, +15 epoch) | 5.1 / 7.1 | 163.06±4.67 | 24.1±3.3 | 0.59±0.12 | | |

LDM-SR은 FID에서 SR3를 앞서고 SR3는 IS에서 앞선다. 단순 회귀 모델이 PSNR과 SSIM에서 가장 높은데 두 지표는 사람의 지각과 잘 맞지 않는다. 같은 연산량의 Pixel-DM보다 LDM이 더 나은 성능을 훨씬 빠른 샘플링으로 낸다. user study(Table 4)에서는 Task 1(ground truth 대비 선호) Pixel-DM 16.0% 대 LDM-4 30.4%, Task 2(두 결과 중 선호) 29.4% 대 70.6%였다. bicubic 열화가 다른 전처리에 일반화되지 않아, JPEG noise와 센서 noise, 여러 보간, Gaussian blur와 noise를 무작위 순서로 적용하는 BSR 파이프라인으로 범용 모델 LDM-BSR을 학습했다(Fig 18, 19).

### 4.8 inpainting(Table 6, Table 7)

LaMa 프로토콜을 따라 Places에서 validation 2,000장과 test 3만 장을 고정하고 256² crop으로 학습해 512² crop으로 평가한다.

| 모델(정규화) | 학습 throughput(샘플/초) | 샘플링 throughput @256 / @512 | 학습+검증 시간/epoch | FID(2,000장, 6 epoch) |
|---|---|---|---|---|
| LDM-1(1단계 없음) | 0.11 | 0.26 / 0.07 | 20.66 | 24.74 |
| LDM-4(KL, attention 있음) | 0.32 | 0.97 / 0.34 | 7.66 | 15.21 |
| LDM-4(VQ, attention 있음) | 0.33 | 0.97 / 0.34 | 7.04 | 14.99 |
| LDM-4(VQ, attention 없음) | 0.35 | 0.99 / 0.36 | 6.66 | 15.95 |

저자는 최소 2.7배 속도 향상과 최소 1.6배 FID 개선을 관찰했다고 적는다. 다른 방법과의 비교(Table 7)에서 LDM-4(w/ attn)는 40~50% 마스크 FID 11.87, 전체 2.15로 LaMa(12.31, 2.23)보다 좋고 LPIPS는 조금 높다(0.257 대 0.243). CoModGAN은 10.4와 1.82다. user study에서는 LaMa 13.6% 대 LDM-4 21.0%(Task 1), 31.9% 대 68.1%(Task 2)였다. attention 없는 VQ-reg 1단계 위에 ADM식 attention 세 단계와 BigGAN residual block을 쓴 387M 모델(big)은 512²에서 반 epoch fine-tuning하자 40~50% 마스크 9.39, 전체 1.50으로 최고 기록을 세웠다.

### 4.9 연산량 비교(Table 18)

학습 연산량은 V100-day이며 단일 A100 학습을 2.2배 가속으로 환산했다.

| 데이터셋 | 모델 | 학습 연산량 | 추론 throughput | 파라미터 | FID |
|---|---|---|---|---|---|
| LSUN-Churches | StyleGAN2 / LDM-8(100 step, 41만) | 64 / 18 | - / 6.80 | 59M / 256M | 3.86 / 4.02 |
| LSUN-Bedrooms | ADM(1000 step) / LDM-4(200 step, 190만) | 232 / 60(전체 55) | 0.03 / 1.07 | 552M / 274M | 1.9 / 2.95 |
| CelebA-HQ | LDM-4(500 step, 41만) | 14.4 | 0.43 | 274M | 5.11 |
| FFHQ | StyleGAN2 / LDM-4(200 step, 63.5만) | 32.13 / 26 | - / 1.07 | 59M / 274M | 3.8 / 4.98 |
| ImageNet | VQGAN-f-4 / f-8(1단계) | 29 / 66 | - | 55M / 68M | R-FID 0.58 / 1.14 |
| ImageNet | ADM-G(250 step) / LDM-4-G(scale 1.5) | 962 / 271 | 0.07 / 0.4 | 608M / 400M | 4.59 / 3.60 |
| ImageNet | LDM-8-G(100 step, 290만) | 79 + classifier 12 = 91 | 1.93 | 506M | 8.11 |

Table 12와 Table 15의 hyperparameter는 다음과 같다. unconditional 모델은 f = 4(Churches만 f = 8, KL), 파라미터 274M(Churches 294M), diffusion step 1000, linear noise schedule, 41만(CelebA-HQ), 63.5만(FFHQ), 50만(Churches), 190만(Bedrooms) iteration이다. conditional 모델은 text 1.45B(f = 8), layout OpenImages 306M(f = 4)과 COCO 345M(f = 8), class 395M(f = 4, batch 1200, 17.8만), super-resolution 169M(f = 4, 86만), inpainting 215M(f = 4, 36만, V100 8장), semantic map 215M(f = 8, 36만)이며 inpainting 외에는 단일 A100이다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

저자가 Sec 5에서 명시한 한계는 두 가지다.

- **샘플링 속도**: pixel 기반보다 연산량이 크게 줄었지만 순차적 샘플링 과정 때문에 GAN보다 여전히 느리다. 관련 연구 절은 고급 샘플링 전략과 계층적 접근이 추론 속도 문제를 부분적으로 해결한다고 적는다.
- **재구성 병목**: f = 4 autoencoder의 품질 손실은 매우 작지만 pixel space에서 미세한 정확도가 필요한 과제에서는 재구성 능력이 병목이 될 수 있다. 저자는 super-resolution 모델이 이미 이 점에서 어느 정도 제한된다고 가정한다.

실험 절에서 드러난 제약은 다음과 같다. 복잡한 데이터셋은 압축률을 낮춰야 하므로 단일 f가 모든 과제에 최적은 아니다. KL-reg latent는 rescaling 없이는 convolutional 샘플링에서 SNR이 지나치게 높다. unconditional 모델의 convolutional 샘플링은 전역 구조가 어긋날 수 있어 guiding이 필요하다. bicubic 열화로 학습한 LDM-SR은 다른 전처리에 일반화되지 않는다. big inpainting 모델은 256²와 512² 사이 품질 차이가 있어 fine-tuning이 필요했고 저자는 원인을 추가 attention 모듈로 추정한다.

사회적 영향으로는 비용을 낮춰 접근을 넓히는 한편 조작된 데이터와 허위 정보 생성이 쉬워진다는 점, deep fake의 피해가 여성에게 집중된다는 점, 생성 모델이 학습 데이터를 드러낼 수 있는데 이미지 diffusion model에 어느 정도 해당하는지 아직 모른다는 점, adversarial 학습과 likelihood 목표를 결합한 두 단계 접근의 데이터 왜곡 정도가 남은 과제라는 점을 든다.

자료 자체의 내적 불일치는 다음과 같다.

- Table 1의 CelebA-HQ LDM-4 FID는 5.11인데 Fig 28 캡션은 같은 설정(500 DDIM step, η = 0)에서 5.15로 적는다.
- Table 1의 LSUN-Churches LDM-8 FID는 4.02인데 Fig 30 캡션은 4.48로 적는다.
- LSUN-Churches 모델을 Table 12는 294M, 50만 iteration으로, Table 18은 256M, 41만 step, 100 step 샘플링으로 적는다. Table 1은 200 step이다.
- Table 18의 LSUN-Bedrooms LDM-4 행은 generator compute 60, overall compute 55로 전체가 부분보다 작다.
- Table 13과 Table 14의 LDM-32 z-shape가 "88 × 8 × 32"로 적혀 있다. 다른 열의 규칙대로면 8 × 8 × 32다.
- Sec 4.5 본문은 FID 개선이 최소 1.6배라고 적지만 Table 6의 VQ attention 없음 행은 24.74/15.95 = 1.55배다.

raw로 확인할 수 없는 것도 있다. 게재 학회와 Stable Diffusion과의 관계는 본문에 없다. Table 6은 figures.json에 항목이 없고 tab05 크롭에 대신 담겨 있다.

## 6. 관련 연구 (Related Work)

- **GAN(BigGAN, StyleGAN 계열)**: 고해상도 이미지를 효율적으로 샘플링하지만 최적화가 어렵고 전체 데이터 분포를 담기 힘들다.
- **VAE와 flow 기반 모델**: 고해상도 합성이 효율적이지만 샘플 품질이 GAN에 못 미친다.
- **autoregressive 모델과 두 단계 접근(VQ-VAE, VQGAN, DALL-E, VideoGPT)**: 밀도 추정은 강하지만 순차 샘플링 때문에 저해상도에 머물고, 압축된 discrete latent를 ARM으로 모델링할 때 필요한 높은 압축률이 성능을 제한한다.
- **diffusion model(DDPM, ADM, SR3, CDM)**: 밀도 추정과 샘플 품질 모두 최고 수준이며 UNet backbone이 이미지의 inductive bias와 잘 맞는다. pixel space 평가는 추론이 느리고 학습 비용이 크다.
- **LSGM(Vahdat et al. [93])과 D2C(Sinha et al. [80])**: 전자는 인코더와 score 기반 prior를 동시에 학습해 어려운 가중치 조정이 필요하고 LDM이 성능에서 앞선다. 후자는 분리 학습하되 얼굴처럼 구조가 강한 이미지에 집중한다.
- **guidance와 sampler**: Dhariwal and Nichol의 classifier guidance, Ho and Salimans의 classifier-free guidance, Song et al.의 DDIM을 실험 전반에 쓴다.
- **기타**: LaMa(inpainting 프로토콜), SR3(super-resolution 프로토콜), BSR degradation(Zhang et al. [105]), LPIPS(perceptual 손실과 guiding), CLIP-guided 합성(latent space 재사용 예).

## 7. 용어집 (Glossary)

- **Latent Diffusion Model(LDM)**: 미리 학습한 autoencoder의 latent space에서 학습하고 샘플링하는 diffusion model. LDM-f는 다운샘플링 계수 f를 뜻하고 LDM-1은 pixel 기반이다. 접미사 -G는 guidance 적용.
- **perceptual compression / semantic compression**: rate-distortion 곡선에서 본 학습의 두 구간. 앞 구간은 autoencoder가, 뒤 구간은 diffusion model이 맡는다.
- **KL-reg / VQ-reg**: latent의 두 정규화. 표준정규 분포를 향한 약한 KL penalty(가중치 약 10^-6)와 디코더 내부의 벡터 양자화 층.
- **R-FID**: autoencoder가 복원한 이미지와 원본 사이의 FID. 1단계 재구성 품질 지표.
- **cross-attention conditioning**: 조건 y를 τ_θ로 바꿔 UNet 중간 층의 cross-attention에 key와 value로 주입하는 방식.
- **convolutional 샘플링**: 공간 조건을 concat한 LDM을 학습 해상도보다 큰 입력에 적용해 512²에서 1024² 이미지를 만드는 방식.
- **classifier-free guidance(c.f.g.)**: Ho and Salimans의 guidance 기법. scale s로 강도를 조절하며 LDM-4-G는 s = 1.5, Fig 5는 s = 10.0을 쓴다.
- **DDIM**: Song et al.의 sampler. step 수(N-s)와 η로 설정하며 실험 전반에서 10~500 step을 쓴다.
- **LDM-SR / LDM-BSR**: bicubic 4× 열화로 학습한 super-resolution 모델과 BSR 열화 파이프라인으로 학습한 범용 upsampler.
- **post-hoc image guiding**: 부록 C의 방법. unconditional 모델을 목표 이미지 y와 변환 T로 test-time에 조건화한다.
- **FID / IS / Precision / Recall**: 생성 이미지 품질 지표. FID는 낮을수록, IS는 높을수록 좋다. Precision과 Recall은 데이터 manifold의 포괄 정도를 잰다.

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 1 | 다운샘플링을 덜 할수록 재구성 상한이 오른다. f=4 autoencoder(PSNR 27.4, R-FID 0.58)가 DALL-E f=8과 VQGAN f=16보다 세부를 잘 보존한다 | caption-region | ★ wiki 권장 (motivation) |
| fig02 | 2 | rate-distortion 곡선의 두 구간. 앞의 perceptual compression은 autoencoder와 GAN이, 뒤의 semantic compression은 LDM이 맡는다 | caption-region | ★ wiki 권장 (개념) |
| fig03 | 4 | LDM 전체 구조. pixel space의 인코더와 디코더, latent space의 denoising U-Net, 조건 y를 τ_θ로 바꿔 cross-attention이나 concat으로 주입하는 경로 | caption-region | ★ wiki 권장 (architecture) |
| fig04 | 5 | CelebA-HQ, FFHQ, LSUN-Churches, LSUN-Bedrooms, class-conditional ImageNet에서 학습한 LDM의 256×256 샘플 | caption-region | ○ 보조 (샘플) |
| fig05 | 6 | LAION으로 학습한 1.45B LDM-8(KL)의 text-to-image 샘플. prompt 7종, 200 DDIM step, guidance scale 10.0 | caption-region | ★ wiki 권장 (text-to-image 샘플) |
| fig06 | 6 | ImageNet class-conditional LDM의 f별 200만 step 학습 추이(FID, Inception Score). LDM-1은 느리고 LDM-32는 일찍 정체된다 | caption-region | ○ 보조 (효율) |
| fig07 | 6 | CelebA-HQ(왼쪽)와 ImageNet(오른쪽)의 f별 샘플링 throughput 대비 FID. DDIM step 10에서 200까지 비교, LDM-4와 LDM-8이 가장 유리하다 | caption-region | ★ wiki 권장 (효율) |
| fig08 | 7 | COCO bounding box layout을 조건으로 준 layout-to-image 샘플. 왼쪽 열이 layout, 나머지가 생성 결과 | caption-region | ○ 보조 (layout) |
| fig09 | 7 | 256²로 학습한 semantic synthesis LDM이 convolutional 샘플링으로 만든 512×1024 풍경. 왼쪽 위가 semantic map 조건 | caption-region | ★ wiki 권장 (convolutional 샘플링) |
| fig10 | 8 | ImageNet-Val 64→256 super-resolution 비교(bicubic, LDM-SR, SR3). LDM-SR은 질감, SR3는 미세 구조에 강하다 | caption-region | ○ 보조 (super-resolution) |
| fig11 | 9 | big, w/ ft inpainting 모델의 object removal 결과. 왼쪽이 마스크(빨간 윤곽) 입력, 오른쪽이 결과 | caption-region | ○ 보조 (inpainting) |
| fig12 | 14 | 512² 이미지로 fine-tuning한 semantic landscapes 모델의 convolutional 샘플 3장 | caption-region | (부록 갤러리) |
| fig13 | 15 | classifier-free guidance와 convolutional 샘플링을 결합해 1.45B text-to-image 모델이 256²보다 큰 이미지를 그린 예 4종 | caption-region | ○ 보조 (고해상도 text-to-image) |
| fig14 | 18 | 풍경 unconditional 모델의 convolutional 샘플링은 전역 구조가 어긋날 수 있다(가운데). 저해상도 이미지 L2 guiding이 구조를 회복한다(오른쪽) | caption-region | ○ 보조 (부록 guiding 분석) |
| fig15 | 20 | latent rescaling이 convolutional 샘플링에 미치는 영향. KL-reg는 rescaling 전후, VQ-reg는 rescaling 없이 비교 | caption-region | ○ 보조 (부록 rescaling 분석) |
| fig16 | 21 | OpenImages 학습 후 COCO로 fine-tuning한 layout-to-image LDM-4의 추가 샘플. 100 DDIM step, η=0 | caption-region | (부록 갤러리) |
| fig17 | 22 | class-conditional ImageNet LDM의 학습 추이를 35 V100-day 기준으로 다시 그린 FID와 Inception Score. 100 DDIM step | caption-region | ○ 보조 (효율, V100-day 기준) |
| fig18 | 23 | 범용 upsampler LDM-BSR이 class-conditional LDM 샘플을 1024²로 키운 결과. 고정 bicubic 열화로 학습한 LDM-SR은 일반화가 떨어진다 | caption-region | ○ 보조 (LDM-BSR) |
| fig19 | 30 | LDM-BSR로 LSUN-Cows 샘플을 1024²로 키운 결과. 왼쪽이 bicubic, 오른쪽이 LDM-BSR | caption-region | (부록 갤러리) |
| fig20 | 31 | 같은 학습 step의 LDM-SR과 pixel space diffusion baseline의 super-resolution 정성 비교(ImageNet validation 2장) | caption-region | (부록 갤러리) |
| fig21 | 32 | image inpainting 정성 결과. LaMa는 결과가 하나지만 LDM은 입력 하나에 여러 다양한 샘플을 만든다 | caption-region | (부록 갤러리) |
| fig22 | 33 | Figure 11과 같은 object removal 추가 결과. 입력과 결과를 나란히 배치 | caption-region | (부록 갤러리) |
| fig23 | 34 | 512² 이미지로 fine-tuning한 semantic landscapes 모델의 convolutional 샘플(Flickr-Landscapes) | caption-region | (부록 갤러리) |
| fig24 | 35 | 256²로 학습한 LDM이 풍경 semantic synthesis에서 더 큰 해상도로 일반화한 예 | caption-region | (부록 갤러리) |
| fig25 | 36 | semantic map 조건으로 256² 학습 모델이 1024×384처럼 훨씬 큰 해상도의 샘플을 만든 예 | caption-region | (부록 갤러리) |
| fig26 | 37 | ImageNet LDM-4의 무작위 class-conditional 샘플. classifier-free guidance scale 5.0, 200 DDIM step, η=1.0 | caption-region | (부록 갤러리) |
| fig27 | 38 | ImageNet LDM-4의 무작위 class-conditional 샘플. classifier-free guidance scale 3.0, 200 DDIM step, η=1.0 | caption-region | (부록 갤러리) |
| fig28 | 39 | CelebA-HQ 최고 모델 LDM-4의 무작위 샘플. 500 DDIM step, η=0, FID 5.15 | caption-region | (부록 갤러리) |
| fig29 | 40 | FFHQ 최고 모델 LDM-4의 무작위 샘플. 200 DDIM step, η=1, FID 4.98 | caption-region | (부록 갤러리) |
| fig30 | 41 | LSUN-Churches 최고 모델 LDM-8의 무작위 샘플. 200 DDIM step, η=0, FID 4.48 | caption-region | (부록 갤러리) |
| fig31 | 42 | LSUN-Bedrooms 최고 모델 LDM-4의 무작위 샘플. 200 DDIM step, η=1, FID 2.95 | caption-region | (부록 갤러리) |
| fig32 | 43 | CelebA-HQ 모델 샘플의 VGG-16 feature space nearest neighbor. 맨 왼쪽이 생성 샘플, 나머지가 학습 데이터 이웃 10장 | caption-region | (부록 nearest neighbor) |
| fig33 | 44 | FFHQ 모델 샘플의 VGG-16 feature space nearest neighbor. 맨 왼쪽이 생성 샘플, 나머지가 이웃 10장 | caption-region | (부록 nearest neighbor) |
| fig34 | 45 | LSUN-Churches 모델 샘플의 VGG-16 feature space nearest neighbor. 맨 왼쪽이 생성 샘플, 나머지가 이웃 10장 | caption-region | (부록 nearest neighbor) |
| tab01 | 6 | unconditional 합성 평가지표(4개 데이터셋의 FID, Precision, Recall). 크롭 결함: 파일에는 Table 2 영역이 담겨 tab02와 중복이다 | table-region | (확인 필요) |
| tab02 | 6 | MS-COCO 256×256 text-conditional 합성 비교. LDM-KL-8-G가 FID 12.63, IS 30.29로 GLIDE와 Make-A-Scene에 근접, 파라미터 1.45B | table-region | ○ 보조 (result) |
| tab03 | 7 | class-conditional ImageNet 비교. LDM-4-G가 FID 3.60, IS 247.67로 ADM-G(4.59, 608M)를 400M 파라미터로 앞선다 | table-region | ★ wiki 권장 (result) |
| tab04 | 8 | super-resolution과 inpainting user study. 크롭 결함: 파일에는 표 대신 8쪽 본문 문단(LDM-BSR 소개)이 담겨 있다 | table-region | (크롭 결함, 본문 표로 전사) |
| tab05 | 8 | ImageNet-Val ×4 upscaling 결과. 크롭 결함: 파일에는 Table 6(inpainting 효율) 영역이 담겨 있다 | table-region | (크롭 결함, 본문 표로 전사) |
| tab07 | 9 | Places 512×512 crop 3만 장 inpainting 비교. LDM-4 big, w/ ft가 FID 9.39(40~50% 마스크)와 1.50(전체)으로 최저 | table-region | 본문 표로 전사 |
| tab08 | 21 | OpenImages 학습 autoencoder 전체 목록과 ImageNet-Val 재구성 지표. 크롭 결함: 파일에는 Figure 16 영역이 담겨 있다 | table-region | (크롭 결함, 본문 표로 전사) |
| tab09 | 22 | COCO와 OpenImages layout-to-image 정량 비교. 크롭 결함: 파일에는 Table 10 영역이 담겨 tab10과 중복이다 | table-region | (크롭 결함, 본문 표로 전사) |
| tab10 | 22 | class-conditional ImageNet 확장 비교. ImageBART, VQGAN+T, CDM, ADM 계열과 LDM-8, LDM-4 계열의 FID, IS, Precision, Recall | table-region | 본문 표로 전사 |
| tab11 | 23 | ImageNet-Val ×4 upscaling 확장 결과. 같은 연산량의 Pixel-DM과 15 epoch 추가 학습한 LDM-4 비교 | table-region | 본문 표로 전사 |
| tab12 | 24 | Table 1 결과를 낸 unconditional LDM 4종의 hyperparameter. 단일 A100 학습 | table-region | 본문 표로 전사 |
| tab13 | 24 | Sec 4.1 f 분석에 쓴 ImageNet conditional LDM-1부터 LDM-32까지의 hyperparameter. 파라미터 391M에서 396M | table-region | 본문 표로 전사 |
| tab14 | 25 | Fig 7 분석에 쓴 CelebA unconditional LDM-1부터 LDM-32까지의 hyperparameter. 크롭 결함: 파일에는 Table 15 영역이 담겨 tab15와 중복이다 | table-region | (크롭 결함) |
| tab15 | 25 | Sec 4 conditional LDM 6종의 hyperparameter. inpainting만 V100 8장, 나머지는 단일 A100 | table-region | 본문 표로 전사 |
| tab16 | 26 | ablated UNet의 self-attention 층을 대체하는 Transformer 블록 구조. self-attention, MLP, cross-attention을 T번 반복 | table-region | 본문 표로 전사 |
| tab17 | 26 | Transformer 인코더 τ_θ의 hyperparameter. text-to-image는 seq 77, depth 32, dim 1280, layout은 92, 16, 512 | table-region | 본문 표로 전사 |
| tab18 | 28 | 학습 연산량(V100-day)과 추론 throughput 비교. LDM이 StyleGAN2와 ADM에 근접한 FID를 훨씬 적은 연산으로 낸다 | table-region | ○ 보조 (result) |

크롭 결함이 있는 항목은 caption 열에 명기했다. tab01, tab09, tab14는 인접한 다음 표(Table 2, Table 10, Table 15)와 같은 bbox로 잘려 중복이고, tab04는 본문 문단, tab05는 Table 6, tab08은 Figure 16이 담겨 있다. Table 6은 figures.json에 항목 자체가 없다. wiki에는 fig01, fig02, fig03, fig05, fig06, fig07, fig09를 임베드했고 Table 1~7, 9~13, 15, 17, 18은 본문 마크다운 표로 옮겼다. fig12~fig34 대부분은 부록 샘플 갤러리이고 fig14, fig15, fig17, fig18은 부록 분석 도식이다.
