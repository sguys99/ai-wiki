---
title: "Finite Scalar Quantization: VQ-VAE Made Simple"
type: paper
year: 2023
category: llms
source: mentzer-2023-finite-scalar-quantization-vq-vae-made.md
raw_path: raw/papers/mentzer-2023-finite-scalar-quantization-vq-vae-made.pdf
raw_filename: "mentzer-2023-finite-scalar-quantization-vq-vae-made.pdf"
source_collection: external
authors: "Fabian Mentzer, David Minnen, Eirikur Agustsson, Michael Tschannen"
arxiv_id: "2309.15505"
url: "https://arxiv.org/abs/2309.15505"
tags: [quantization, vq-vae, tokenizer, discrete-representation, image-generation, representation-learning]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/mentzer-2023-finite-scalar-quantization-vq-vae-made/fig01.png
    raw: raw/papers/mentzer-2023-finite-scalar-quantization-vq-vae-made-figures/fig01.png
    caption: "FSQ와 VQ 개념 비교 — FSQ는 저차원으로 투영해 각 차원을 정수 격자로 반올림, VQ는 codebook 최근접 탐색"
    page: 2
    bbox_norm: [0.223, 0.113, 0.749, 0.242]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/mentzer-2023-finite-scalar-quantization-vq-vae-made/fig02.png
    raw: raw/papers/mentzer-2023-finite-scalar-quantization-vq-vae-made-figures/fig02.png
    caption: "VQ vs FSQ 구현·최적화 비교표와 단일 채널 bounding 함수"
    page: 3
    bbox_norm: [0.176, 0.096, 0.829, 0.243]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/mentzer-2023-finite-scalar-quantization-vq-vae-made/fig03.png
    raw: raw/papers/mentzer-2023-finite-scalar-quantization-vq-vae-made-figures/fig03.png
    caption: "codebook 크기에 따른 VQ·FSQ 4대 특성 (Reconstruction FID / Sampling FID / 사용률 / Compression Cost)"
    page: 5
    bbox_norm: [0.229, 0.096, 0.767, 0.394]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/mentzer-2023-finite-scalar-quantization-vq-vae-made/fig04.png
    raw: raw/papers/mentzer-2023-finite-scalar-quantization-vq-vae-made-figures/fig04.png
    caption: "ImageNet 256 MaskGIT 결과 — CFG weight에 따른 Precision-Recall·Sampling FID"
    page: 6
    bbox_norm: [0.17, 0.207, 0.831, 0.389]
    strategy: caption-region
    curated: false
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/mentzer-2023-finite-scalar-quantization-vq-vae-made/fig05.png
    raw: raw/papers/mentzer-2023-finite-scalar-quantization-vq-vae-made-figures/fig05.png
    caption: "FSQ(위)·VQ(아래) MaskGIT 샘플 — 네 개 ImageNet 클래스, 무선별(non-cherry-picked)"
    page: 7
    bbox_norm: [0.167, 0.096, 0.833, 0.235]
    strategy: caption-region
    curated: false
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/mentzer-2023-finite-scalar-quantization-vq-vae-made/fig06.png
    raw: raw/papers/mentzer-2023-finite-scalar-quantization-vq-vae-made-figures/fig06.png
    caption: "UViM depth estimation 샘플 — splitting 없는 VQ는 가장자리가 뭉개진다"
    page: 9
    bbox_norm: [0.167, 0.096, 0.833, 0.272]
    strategy: caption-region
    curated: false
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/mentzer-2023-finite-scalar-quantization-vq-vae-made/fig07.png
    raw: raw/papers/mentzer-2023-finite-scalar-quantization-vq-vae-made-figures/fig07.png
    caption: "UViM panoptic segmentation·colorization 정성 결과"
    page: 14
    bbox_norm: [0.167, 0.096, 0.833, 0.637]
    strategy: caption-region
    curated: false
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/mentzer-2023-finite-scalar-quantization-vq-vae-made/fig08.png
    raw: raw/papers/mentzer-2023-finite-scalar-quantization-vq-vae-made-figures/fig08.png
    caption: "representation stitching — 두 이미지 절반을 latent에서 이어 붙여 디코딩"
    page: 15
    bbox_norm: [0.199, 0.096, 0.801, 0.491]
    strategy: caption-region
    curated: false
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/mentzer-2023-finite-scalar-quantization-vq-vae-made/fig09.png
    raw: raw/papers/mentzer-2023-finite-scalar-quantization-vq-vae-made-figures/fig09.png
    caption: "marginal histogram에서 뽑은 가짜 representation 시각화"
    page: 15
    bbox_norm: [0.166, 0.581, 0.834, 0.746]
    strategy: caption-region
    curated: false
  - id: fig10
    label: Figure 10
    kind: figure
    file: assets/mentzer-2023-finite-scalar-quantization-vq-vae-made/fig10.png
    raw: raw/papers/mentzer-2023-finite-scalar-quantization-vq-vae-made-figures/fig10.png
    caption: "채널당 레벨 L 구성별 Sampling FID — 최소 L_i가 5 미만이면 성능 저하"
    page: 16
    bbox_norm: [0.361, 0.749, 0.639, 0.886]
    strategy: caption-region
    curated: false
  - id: tab01
    label: Table 1
    kind: table
    file: assets/mentzer-2023-finite-scalar-quantization-vq-vae-made/tab01.png
    raw: raw/papers/mentzer-2023-finite-scalar-quantization-vq-vae-made-figures/tab01.png
    caption: "목표 codebook 크기 |C|별 FSQ 레벨 L 권장값"
    page: 4
    bbox_norm: [0.12, 0.84, 0.87, 0.902]
    strategy: manual
    curated: true
  - id: tab02
    label: Table 2
    kind: table
    file: assets/mentzer-2023-finite-scalar-quantization-vq-vae-made/tab02.png
    raw: raw/papers/mentzer-2023-finite-scalar-quantization-vq-vae-made-figures/tab02.png
    caption: "UViM 세 태스크 결과 — FSQ는 splitting 없이 VQ와 대등"
    page: 8
    bbox_norm: [0.244, 0.096, 0.756, 0.399]
    strategy: table-region
    curated: true
---

## 요약 (Summary)

FSQ(finite scalar quantization)는 VAE 표현을 저차원으로 투영한 뒤 각 차원을 몇 개의 고정값으로 반올림하는 quantizer다. 차원별 값을 곱집합으로 묶은 것이 곧 암묵적 codebook이다. 채널 d개에 채널당 L개 값이면 codebook 크기는 L^d가 된다. 표현 벡터를 학습된 codebook의 최근접 벡터로 교체하는 VQ(vector quantization)와 대비되는 방식이다.

논문의 핵심 주장은 이 단순한 교체만으로 VQ를 그대로 대체(drop-in replacement)할 수 있다는 것이다. FSQ는 commitment loss·EMA·codebook splitting·entropy penalty 같은 보조 장치를 하나도 쓰지 않는다. 그런데도 codebook 사용률이 거의 100%에 이르고 image generation(MaskGIT)과 dense prediction(UViM) 모두에서 VQ와 대등한 지표를 낸다. VQ의 고질병인 codebook collapse는 FSQ 설계상 아예 생기지 않는다.

## 주요 기여 (Key Contributions)

- **VQ의 drop-in replacement**: MaskGIT(image generation)와 UViM(depth·colorization·panoptic segmentation)에 FSQ를 붙여 각 지표에서 0.5~3%의 작은 하락만으로 거의 같은 결과를 얻었다. 두 모델 계열은 convolutional vs transformer, masked vs autoregressive로 설계가 크게 다른데도 같은 교체가 통했다.
- **큰 codebook을 잘 쓴다**: codebook 크기를 키우며 스케일링을 분석한 결과, FSQ는 큰 codebook에서도 reconstruction과 sample 품질을 함께 끌어올렸고 사용률이 100%에 가까웠다. 모두 보조 손실 없이 얻은 결과다.
- **VQ의 일반성은 실익이 적다**: VQ의 완전한 일반성은 이득을 거의 주지 못하고 큰 codebook에서는 오히려 VQ가 더 나쁘다. FSQ는 표준 VQ에서 인코더 출력을 bound하고 codebook을 고정한 형태에 해당한다. 암묵적 codebook의 차원도 훨씬 작다(FSQ는 보통 d<10, VQ는 d≥512).

## 방법론 및 아키텍처 (Methodology and Architecture)

VQ-VAE는 codebook C를 학습해 입력을 이산 표현으로 압축한다. 인코더가 이미지를 표현 z로 바꾸면 z의 각 벡터를 C의 최근접 벡터로 교체하는데, 이 교체 연산은 미분이 안 되기 때문에 STE(straight-through estimator)로 디코더 입력의 gradient를 인코더 출력에 그대로 복사한다. 그런데 STE는 codebook 벡터 자체에는 gradient를 주지 못한다. 그래서 VQ-VAE는 codeword를 표현 쪽으로 끌어당기는 보조 손실을 따로 덧붙인다. 이 방식은 최적화가 까다롭고 codebook이 커지면 상당수 코드가 죽는 codebook collapse가 나타난다. 후속 연구들이 재초기화·random restart·stochastic 정식화 같은 장치로 이 문제를 메워 온 이유다.

![[assets/mentzer-2023-finite-scalar-quantization-vq-vae-made/fig01.png]]
*Figure 1: FSQ(왼쪽)는 인코더 출력을 d차원(그림은 d=3)으로 투영해 각 차원을 L개 값(L=3)으로 bound한 뒤 정수로 반올림, 하이퍼큐브의 최근접 점으로 양자화한다. VQ(오른쪽)는 z를 codebook 최근접 벡터로 교체한다 (Mentzer 2023, p.2).*

FSQ는 이 장치들을 전부 걷어낸다. d차원 표현 z에 bounding 함수 f를 적용한 뒤 정수로 반올림하는 게 전부다. f는 각 채널이 L개 값 중 하나만 갖도록 만드는 함수다. 기본형은 f: z ↦ ⌊L/2⌋ tanh(z)다. tanh로 범위를 묶고 반올림하면 결과는 곱집합 codebook 안에 들어가고 크기는 L^d다(채널마다 레벨을 다르게 주면 ∏ L_i). 반올림의 gradient는 VQ와 마찬가지로 STE로 통과시키는데, 구현은 stop-gradient 한 줄이면 된다: `round_ste: x ↦ x + sg(round(x) − x)`. 이렇게 reconstruction loss만으로 학습하면 인코더는 손실을 줄이려고 정보를 여러 quantization bin에 고루 퍼뜨린다. 그 덕분에 보조 손실 없이도 모든 codeword를 쓰는 quantizer가 만들어진다.

이렇게 단순한 방식이 통하는 이유는 이렇다. VQ는 고차원 latent에 학습 가능한 Voronoi 분할을 만들어 입력 공간을 복잡하게 나눈다. FSQ는 훨씬 낮은 차원에서 고정된 격자로 나눈다. VAE의 model capacity가 이미 충분하기 때문에 VQ의 비선형성은 인코더와 디코더가 흡수한다. 그래서 FSQ의 단순한 격자만으로도 비슷한 복잡도의 분할이 나온다.

![[assets/mentzer-2023-finite-scalar-quantization-vq-vae-made/fig02.png]]
*Figure 2: 왼쪽 — VQ와 FSQ의 구현·최적화 비교. FSQ는 보조 손실·codebook 파라미터·EMA·splitting이 모두 필요 없다. 오른쪽 — 단일 채널(L=5)에서 bounding 함수 f와 반올림 출력 (Mentzer 2023, p.3).*

FSQ의 하이퍼파라미터는 채널 수 d와 채널별 레벨 L뿐이다. 목표 codebook 크기를 맞추는 조합은 여러 가지인데, 저자들은 모든 채널에서 L_i ≥ 5를 쓰라는 규칙을 제시한다. 자주 쓰는 목표 크기별 권장 L은 아래 표에 정리했다. 파라미터 수에서도 FSQ가 유리하다. VQ는 크기 |C|·d의 codebook을 학습해야 하지만(|C|=4096, d=512면 약 200만 파라미터), FSQ에는 그런 파라미터가 아예 없고 d가 작아 마지막 인코더 층도 가볍다.

![[assets/mentzer-2023-finite-scalar-quantization-vq-vae-made/tab01.png]]
*Table 1: 목표 codebook 크기 |C|에 맞춘 FSQ 레벨 L 권장값 (Mentzer 2023, p.4).*

## 결과 (Results)

128×128 ImageNet에서 codebook 크기를 2^4부터 2^16까지 바꿔 가며 둘을 비교했다.

![[assets/mentzer-2023-finite-scalar-quantization-vq-vae-made/fig03.png]]
*Figure 3: codebook 크기별 VQ·FSQ 특성. a) Reconstruction FID b) Sampling FID c) codebook 사용률 d) Compression Cost. FSQ는 codebook을 키울수록 계속 개선되고 사용률이 100%에 가깝지만, VQ는 2^11 부근에서 꺾인다 (Mentzer 2023, p.5).*

FSQ의 Reconstruction FID는 codebook을 키울수록 계속 좋아진다. 담을 수 있는 비트가 늘면 재구성이 좋아진다는 압축의 상식과 들어맞는다. VQ는 entropy 정규화를 써도 큰 codebook을 살리지 못해 2^11에서 최소를 찍고 다시 나빠지는데, 이는 사용률이 꺾이는 지점과 겹친다. 사용률만 놓고 보면 FSQ는 아무 장치 없이도 2^14=16k codebook에서 거의 전부를 쓰고 2^16에서도 2^15개 넘게 살린다. 반면 VQ는 2^11을 넘어서면 50% 아래로 떨어진다. 그렇다고 codebook을 무한정 키운다고 답이 나오지는 않는다. 표현의 compression cost가 함께 올라 FSQ의 Sampling FID는 2^12 부근에서 포화한다. codebook이 작은 구간에서는 VQ가 표현력 덕분에 FSQ를 근소하게 앞선다.

MaskGIT을 256×256 ImageNet에서 학습하면 FSQ(L=[8,5,5,5])와 VQ(codebook 1024 + entropy loss)의 Sampling FID·Precision·Recall이 모두 대등하다(FSQ 4.534, VQ 4.509). 정성 샘플도 서로 구분하기 어렵다. codebook 사용률은 FSQ가 100%, VQ가 81%다. FSQ는 처음엔 recall이 높고 precision이 낮은 쪽에 치우쳐 있었는데, diffusion에서 가져온 CFG(classifier-free guidance)를 MaskGIT에 적용해 이 균형을 맞췄다.

![[assets/mentzer-2023-finite-scalar-quantization-vq-vae-made/tab02.png]]
*Table 2: UViM 세 태스크 결과. FSQ는 codebook splitting 없이도 VQ와 대등하다. splitting을 끈 VQ(depth)는 사용률이 0.78%로 붕괴한다 (Mentzer 2023, p.8).*

UViM의 dense prediction 세 태스크에서도 FSQ는 VQ와 경쟁력 있는 지표를 낸다(depth RMSE 0.473 vs 0.468, panoptic PQ 43.2 vs 43.4, colorization FID 17.55 vs 16.90). 특히 두 지점이 눈에 띈다. 하나는 panoptic에서 RGB context 입력을 없앤 경우로, 둘 다 나빠지지만 FSQ의 하락 폭이 더 작다(40.2 vs 39.0). 다른 하나는 depth에서 VQ의 codebook splitting을 껐을 때다. 이때 VQ는 사용률이 0.78%까지 두 자릿수 이상 붕괴하고 예측 가장자리가 뭉개지지만, FSQ는 어떤 보조 알고리즘 없이도 99% 사용률을 유지한다.

## 한계 (Limitations)

모든 태스크에서 FSQ의 지표는 VQ보다 근소하게(0.5~3%) 낮다. 절대적인 최고 수치가 중요한 상황이라면 VQ가 여전히 앞설 수 있다. 작은 codebook에서도 VQ의 표현력이 FSQ를 앞선다. FSQ의 이점은 codebook이 클 때 두드러진다. 한편 FSQ 표현의 이산 분포는 transformer가 모델링하기에 다소 까다로워서(compression cost가 VQ보다 높게 나오는 구간이 있다) codebook을 키워도 이득이 일정 지점에서 포화한다.

## 관련 페이지 (Related Pages)

- [[overviews/glossary-llms]] — quantization·embedding·tokenizer 등 모델 표현 용어의 canonical 표기
- [[llms/cai-2026-vlm3-vision-language-models]] — 비전 표현을 다루는 llms 페이지. FSQ 같은 discrete tokenizer는 multimodal 모델이 입력을 표현하는 building block으로 쓰인다
