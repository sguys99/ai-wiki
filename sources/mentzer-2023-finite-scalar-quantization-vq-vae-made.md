---
title: "Finite Scalar Quantization: VQ-VAE Made Simple"
type: paper
year: 2023
category: llms
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
    caption: "FSQ와 VQ의 양자화 방식 비교. FSQ는 인코더 출력을 d=3차원으로 투영해 각 차원을 L=3개 값으로 bound하고 반올림해 하이퍼큐브의 최근접 격자점을 고른다. VQ는 d=7차원 벡터를 codebook의 최근접 벡터로 교체한다"
    page: 2
    bbox_norm: [0.223, 0.113, 0.749, 0.242]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/mentzer-2023-finite-scalar-quantization-vq-vae-made/fig02.png
    raw: raw/papers/mentzer-2023-finite-scalar-quantization-vq-vae-made-figures/fig02.png
    caption: "왼쪽은 VQ와 FSQ의 구현과 최적화 비교표, 오른쪽은 L=5인 단일 채널에서 bounding 함수 f(z)와 round_ste(f(z))의 계단형 출력"
    page: 3
    bbox_norm: [0.176, 0.096, 0.829, 0.243]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/mentzer-2023-finite-scalar-quantization-vq-vae-made/fig03.png
    raw: raw/papers/mentzer-2023-finite-scalar-quantization-vq-vae-made-figures/fig03.png
    caption: "128×128 ImageNet에서 codebook 크기별 VQ와 FSQ 특성 비교. a) Reconstruction FID, b) Sampling FID, c) codebook 사용률, d) compression cost"
    page: 5
    bbox_norm: [0.229, 0.096, 0.767, 0.394]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/mentzer-2023-finite-scalar-quantization-vq-vae-made/fig04.png
    raw: raw/papers/mentzer-2023-finite-scalar-quantization-vq-vae-made-figures/fig04.png
    caption: "ImageNet 256 MaskGIT에서 CFG weight α를 바꿀 때의 Precision 대 Recall(왼쪽)과 Sampling FID(오른쪽). ADM은 참조선이며 크롭에는 상단 결과표가 포함되지 않았다"
    page: 6
    bbox_norm: [0.17, 0.207, 0.831, 0.389]
    strategy: caption-region
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/mentzer-2023-finite-scalar-quantization-vq-vae-made/fig05.png
    raw: raw/papers/mentzer-2023-finite-scalar-quantization-vq-vae-made-figures/fig05.png
    caption: "FSQ(위)와 VQ(아래) MaskGIT 모델의 무선별 샘플. ImageNet 클래스 330, 320, 510, 454에 대해 모델당 두 장씩"
    page: 7
    bbox_norm: [0.167, 0.096, 0.833, 0.235]
    strategy: caption-region
    curated: false
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/mentzer-2023-finite-scalar-quantization-vq-vae-made/fig06.png
    raw: raw/papers/mentzer-2023-finite-scalar-quantization-vq-vae-made-figures/fig06.png
    caption: "UViM depth estimation 샘플. 입력, ground truth, FSQ, VQ, codebook splitting을 끈 VQ 순서이며 마지막 열은 가장자리가 들쭉날쭉하다"
    page: 9
    bbox_norm: [0.167, 0.096, 0.833, 0.272]
    strategy: caption-region
    curated: true
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/mentzer-2023-finite-scalar-quantization-vq-vae-made/fig07.png
    raw: raw/papers/mentzer-2023-finite-scalar-quantization-vq-vae-made-figures/fig07.png
    caption: "UViM panoptic segmentation(위 두 행)과 colorization(아래 두 행)의 정성 결과. 입력, ground truth, FSQ, VQ 순서"
    page: 14
    bbox_norm: [0.167, 0.096, 0.833, 0.637]
    strategy: caption-region
    curated: false
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/mentzer-2023-finite-scalar-quantization-vq-vae-made/fig08.png
    raw: raw/papers/mentzer-2023-finite-scalar-quantization-vq-vae-made-figures/fig08.png
    caption: "representation stitching 분석. 검증 이미지 두 장의 위 절반과 아래 절반을 픽셀 공간에서 이어 붙인 것과 FSQ-GAN, VQ-GAN의 latent에서 이어 붙여 디코딩한 것을 비교"
    page: 15
    bbox_norm: [0.199, 0.096, 0.801, 0.491]
    strategy: caption-region
    curated: false
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/mentzer-2023-finite-scalar-quantization-vq-vae-made/fig09.png
    raw: raw/papers/mentzer-2023-finite-scalar-quantization-vq-vae-made-figures/fig09.png
    caption: "가짜 representation 시각화. 왼쪽 세 열은 marginal histogram에서 무작위로 뽑은 코드를 디코딩한 것, 오른쪽 세 열은 가장 흔한 코드 3개를 모든 공간 위치에 공유시켜 디코딩한 것. 위가 FSQ, 아래가 VQ"
    page: 15
    bbox_norm: [0.166, 0.581, 0.834, 0.746]
    strategy: caption-region
    curated: false
  - id: fig10
    label: Figure 10
    kind: figure
    file: assets/mentzer-2023-finite-scalar-quantization-vq-vae-made/fig10.png
    raw: raw/papers/mentzer-2023-finite-scalar-quantization-vq-vae-made-figures/fig10.png
    caption: "채널당 양자화 레벨 L 구성별 Sampling FID. 마커 색과 모양은 그 모델의 최소 L_i 값(3, 4, 5, 8)을 나타낸다"
    page: 16
    bbox_norm: [0.361, 0.749, 0.639, 0.886]
    strategy: caption-region
    curated: true
  - id: tab01
    label: Table 1
    kind: table
    file: assets/mentzer-2023-finite-scalar-quantization-vq-vae-made/tab01.png
    raw: raw/papers/mentzer-2023-finite-scalar-quantization-vq-vae-made-figures/tab01.png
    caption: "목표 codebook 크기 |C|(2^8부터 2^16)에 맞춘 FSQ 레벨 L 권장값. wiki에는 마크다운 표로 옮겼다"
    page: 4
    bbox_norm: [0.12, 0.84, 0.87, 0.902]
    strategy: manual
    curated: false
  - id: tab02
    label: Table 2
    kind: table
    file: assets/mentzer-2023-finite-scalar-quantization-vq-vae-made/tab02.png
    raw: raw/papers/mentzer-2023-finite-scalar-quantization-vq-vae-made-figures/tab02.png
    caption: "UViM 세 과제(NYU Depth v2, COCO Panoptic, ImageNet Colorization)의 VQ와 FSQ 결과와 codebook 사용률, GitHub 참조값과 baseline. wiki에는 마크다운 표로 옮겼다"
    page: 8
    bbox_norm: [0.244, 0.096, 0.756, 0.399]
    strategy: table-region
    curated: false
---

## 한 줄 요약 (One-line Summary)

VQ-VAE의 벡터 양자화(vector quantization, VQ)를 latent를 10차원 미만으로 투영한 뒤 차원마다 고정된 소수의 값으로 반올림하는 유한 스칼라 양자화(finite scalar quantization, FSQ)로 바꾸면, commitment 손실이나 codebook 재초기화 같은 보조 장치 없이도 codebook 사용률이 거의 100%에 이르고, MaskGIT의 이미지 생성과 UViM의 dense prediction에서 VQ 대비 0.5~3%의 지표 하락만으로 대등한 결과를 얻는다.

## 1. 자료 정보 (Document Information)

- **제목**: Finite Scalar Quantization: VQ-VAE Made Simple
- **저자**: Fabian Mentzer, David Minnen, Eirikur Agustsson (Google Research), Michael Tschannen (Google DeepMind, 저자 표기에 significant technical contributions 표시)
- **발표**: arXiv 2309.15505, cs.CV. v2는 2023년 10월 12일자다. 게재 학회는 raw에 기술이 없다
- **코드**: 모델 코드는 MaskGIT GitHub와 UViM GitHub를 참조하고, FSQ 자체는 Jax 구현 리스팅(부록 A.1)과 GitHub의 Colab으로 공개했다
- **분류 근거**: FSQ는 이산 표현을 만드는 양자화 모듈이다. 저자들은 VQ가 이미지 생성, 이미지와 오디오 표현 학습, 그리고 차세대 multimodal LLM의 유망한 구성 요소라고 소개한다. 모델 아키텍처 기법이므로 category는 `llms`로 둔다

## 2. 주요 기여 (Key Contributions)

FSQ는 VQ-VAE의 latent에서 벡터 양자화를 스칼라 양자화로 바꾼 방식이다. VAE 표현을 보통 10 미만의 소수 차원으로 투영한 뒤 각 차원을 소수의 고정값으로 양자화한다. 차원별 값 집합의 곱집합이 암묵적(implicit) codebook이 되고, 차원 수와 차원별 값 개수를 고르면 VQ와 같은 codebook 크기를 맞출 수 있다. 그 위에서 VQ-VAE 표현으로 학습하던 모델(이미지 생성과 multimodal 생성의 autoregressive Transformer와 masked Transformer, dense prediction 모델)을 그대로 학습시킬 수 있다.

저자들이 원래 VQ-VAE 정식화를 단순화하며 세운 목표는 세 가지다.

| 목표 | 내용 |
|---|---|
| i) 보조 손실 제거 | commitment 손실, codebook 손실, entropy 손실 없이 학습한다 |
| ii) 설계에 의한 높은 codebook 사용률 | 재초기화나 splitting 없이 사용률이 높게 나오도록 만든다 |
| iii) 기능적 설정 유지 | VQ의 drop-in replacement가 되도록 입출력 인터페이스를 그대로 둔다 |

논문의 기여는 세 가지다.

1. **drop-in replacement 검증**: 이미지 생성의 MaskGIT(Chang et al., 2022)와 depth estimation, colorization, panoptic segmentation의 UViM(Kolesnikov et al., 2022)에 FSQ를 적용해 각 지표에서 0.5~3%의 하락만으로 매우 비슷한 시각 결과를 얻었다. 두 모델 계열은 오토인코더가 convolutional인지 Transformer 기반인지, 생성 Transformer가 masked인지 완전 autoregressive인지, decoder-only인지 encoder-decoder인지가 모두 다르다.
2. **VQ 대 FSQ 트레이드오프 분석**: codebook 크기에 따른 두 방식의 scaling 거동을 특성화하고 압축 관점에서 표현의 복잡도를 분석했다. FSQ는 큰 codebook을 활용해 재구성 지표와 샘플 품질을 함께 높이고, 대부분의 모델에서 사용률이 약 100%다. 이 결과는 보조 손실 없이 얻은 것이다.
3. **VQ 일반성의 실익 검증**: VQ 정식화의 완전한 일반성은 FSQ 대비 이득이 거의 없고, 큰 codebook에서는 VQ가 오히려 나쁘다. 저자들은 VQ가 최적화하기 어렵기 때문으로 본다. FSQ는 표준 VQ에서 a) 인코더 출력을 bound하고 b) codebook C를 고정한 형태로 볼 수 있다. FSQ의 암묵적 codebook은 VQ보다 차원이 훨씬 작다(FSQ는 보통 d < 10, VQ는 d ≥ 512).

저자들은 FSQ가 압축 이외의 vision 과제에 쓰인 적이 없다고 보고, 강력한 Transformer와 결합해 FSQ를 재조명하는 것을 목적으로 삼았다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### VQ-VAE 정식화와 문제

VQ-VAE(Van Den Oord et al., 2017)는 입력 데이터(주로 이미지)의 압축된 의미 표현을 유도하는 codebook C를 학습한다. 순전파에서 이미지 x는 표현 z(보통 특징 벡터의 열)로 인코딩되고, z의 각 벡터는 C에서 가장 가까운 벡터로 교체된다. 이 교체 연산은 미분 불가능하다. 그래서 STE(straight-through estimator, Bengio et al., 2013)로 디코더 입력의 그래디언트를 인코더 출력에 그대로 복사한다. STE는 codebook 벡터에는 그래디언트를 주지 못하므로, codeword 벡터를 양자화 전 표현 벡터 쪽으로 끌어당기고 그 반대 방향으로도 당기는 보조 손실 두 개를 추가한다.

이 정식화는 최적화가 어렵고, codebook이 커질수록 많은 codeword가 쓰이지 않는 codebook 미활용 문제로 이어진다(Łańcucki et al., 2020; Takida et al., 2022; Dhariwal et al., 2020; Huh et al., 2023). 후속 연구들은 codebook 전체나 일부 codeword의 재초기화(Dhariwal et al., 2020; Łańcucki et al., 2020), stochastic 정식화(Takida et al., 2022) 같은 장치로 이를 보완해 왔다. 원 VQ-VAE 자체도 commitment 손실과 codebook EMA를 포함한다.

### FSQ의 직관

VQ는 VQ-VAE의 고차원 latent 공간에 학습 가능한 Voronoi 분할을 정의하고, 이것이 입력 공간(이미지)의 복잡한 비선형 분할로 이어진다. 반면 FSQ는 훨씬 낮은 차원의 공간에서 단순하고 고정된 격자 분할에 의존한다. 저자들은 일반적인 응용에서 VAE의 모델 용량이 비교적 크기 때문에 VQ의 비선형성이 인코더와 디코더에 "흡수"될 수 있고, 그래서 FSQ로도 VQ와 비슷한 복잡도의 입력 공간 분할이 가능하다고 설명한다.

FSQ의 착안점은 신경망 압축(neural compression) 문헌에서 왔다. 그 분야는 Ballé et al.(2016)과 Theis et al.(2017) 이후 표현 z의 스칼라 성분 각각을 독립적으로 반올림해 이산 코드를 얻는다. 현재 압축 문헌 대부분은 정수 범위를 인코더가 제한하지 않고 표현의 entropy만 제약하는 unbounded 스칼라 양자화를 쓰며, 일부 연구(Mentzer et al., 2018; Tschannen et al., 2018; Agustsson et al., 2019)는 양자화기의 범위를 bound했다.

### FSQ 정식화

d차원 표현 z ∈ R^d를 유한한 codeword 집합으로 양자화한다. 먼저 bounding 함수 f를 적용하고 정수로 반올림한다. f는 ẑ = round(f(z))의 각 채널이 L개 값 중 하나를 갖도록 고른다(예: f: z ↦ ⌊L/2⌋ tanh(z)). 따라서 ẑ ∈ C이고, C는 채널별 codebook 집합의 곱집합으로 정의되는 암묵적 codebook이며 |C| = L^d다. C의 벡터를 열거하면 임의의 ẑ를 {1, ..., L^d}의 정수 하나로 보내는 전단사가 생긴다. 그래서 VQ 앞뒤 층의 출력과 입력 차원만 맞추면 Transformer 학습 등 VQ가 흔히 쓰이는 어떤 신경망 설정에서도 VQ를 FSQ로 바꿀 수 있다. i번째 채널을 L_i개 값으로 보내는 일반형은 |C| = ∏_{i=1}^{d} L_i다.

Figure 1의 예는 d = 3, L = 3이고 codebook은 C = {(−1, −1, −1), (−1, −1, 0), (−1, −1, 1), ..., (1, 1, 1)}, |C| = 3^3 = 27이다. 반올림의 그래디언트는 VQ-VAE처럼 STE로 통과시키며 그래디언트를 1로 대체한다. ML 프레임워크에서는 stop gradient(sg) 연산으로 `round_ste: x ↦ x + sg(round(x) − x)`처럼 구현한다. 재구성 손실로 학습하는 오토인코더 안에 FSQ를 두면, 재구성 손실을 줄이는 방향의 그래디언트가 인코더에 전달되어 정보를 여러 양자화 bin에 퍼뜨리도록 강제한다. 그 결과 보조 손실 없이 모든 codeword를 쓰는 양자화기를 얻는다.

### bounding 함수의 구현 세부

양자화가 정수 반올림으로 수행되므로 L이 짝수인 채널은 비대칭 f가 필요하다. 부록 A.1의 Jax 구현은 다음과 같이 동작한다.

| 단계 | 구현 |
|---|---|
| half_l 계산 | `half_l = (L − 1) × (1 − eps) / 2`, `eps = 1e-3` |
| offset | L이 홀수면 0.0, 짝수면 0.5 |
| shift | `shift = tan(offset / half_l)` |
| bound(z) | `tanh(z + shift) × half_l − offset` |
| quantize(z) | `round_ste(bound(z))`를 `half_width = L // 2`로 나눠 [−1, 1]로 재정규화 |
| codes_to_indexes | 코드를 `half_width`만큼 scale-and-shift한 뒤 basis `[1, cumprod(L[:-1])]`와 내적해 정수 인덱스로 변환 |
| indexes_to_codes | 인덱스를 basis로 나눈 몫을 L로 나눈 나머지로 채널별 코드를 복원 |

`FSQ` 클래스는 생성 시 `codebook_size = prod(levels)`를 계산하고 `indexes_to_codes(arange(codebook_size))`로 암묵적 codebook 전체를 열거해 둔다.

### 하이퍼파라미터

FSQ의 하이퍼파라미터는 채널 수 d와 채널별 레벨 수 L = [L_1, ..., L_d]뿐이다. 대부분의 실험에서 공정한 비교를 위해 대체하려는 VQ codebook 크기를 목표 |C|로 삼았다. 다만 ∏ L_i ≈ |C|를 만족하는 (d, L_i) 조합은 여럿이고, 모든 선택이 최적은 아니다. 저자들이 찾은 단순 규칙은 모든 i에서 L_i ≥ 5를 쓰는 것이며, 이 규칙이 고려한 모든 과제에서 잘 동작했다.

| 목표 크기 \|C\| | 2^8 | 2^10 | 2^12 | 2^14 | 2^16 |
|---|---|---|---|---|---|
| 권장 L (Table 1) | [8, 6, 5] | [8, 5, 5, 5] | [7, 5, 5, 5, 5] | [8, 8, 8, 6, 5] | [8, 8, 8, 5, 5, 5] |
| ∏ L_i | 240 | 1,000 | 4,375 | 15,360 | 64,000 |

### 파라미터 수

VQ는 크기 |C| × d의 codebook을 학습한다. 흔한 |C| = 2^12 = 4096, d = 512면 200만 파라미터이고 FSQ에는 이 파라미터가 없다. 또한 FSQ의 d가 VQ보다 훨씬 작으므로(같은 |C|에서 FSQ는 d = 5) 마지막 인코더 층의 파라미터도 적다. 저자들은 이를 보상하려고 VAE 인코더 끝과 디코더 시작에 dense 층을 더 두어 봤지만 추가 이득이 없었다. 따라서 이 논문의 모든 모델에서 같은 codebook 크기의 FSQ가 VQ보다 파라미터가 적다.

### 적용 대상 아키텍처

MaskGIT(Chang et al., 2022)는 먼저 convolutional VQ-GAN 오토인코더(Esser et al., 2020)를 재구성 목적으로 학습하고(Stage I), 오토인코더를 얼린 뒤 BERT 방식의 masked Transformer로 양자화 표현을 예측하게 학습한다(Stage II). 표현 ẑ의 토큰 일부를 무작위로 MASK 토큰으로 바꾼 ẑ_M을 클래스 토큰과 함께 Transformer에 넣고, masked 토큰마다 분포를 예측한다. 추론에서는 처음에 MASK 토큰과 클래스 토큰만 넣고, 예측 확신도에 따라 일부 위치를 골라 토큰을 샘플링해 입력의 MASK를 교체하는 과정을 모든 토큰이 드러날 때까지 반복한다.

UViM(Kolesnikov et al., 2022)은 여러 dense prediction 과제를 다루는 범용 아키텍처다. 1단계에서 Transformer 기반 VQ-VAE가 목표 과제의 레이블 공간을 모델링한다. VQ-VAE 인코더와 디코더는 과제 입력(depth estimation과 segmentation은 RGB 이미지, colorization은 grayscale 이미지)을 side information, 즉 "context"로 받을 수 있고 일부 과제에서 유익했다. 2단계에서 encoder-decoder Transformer가 과제 입력을 받아 VQ-VAE 인코더가 만든 양자화 토큰으로 dense 레이블을 예측하도록 학습한다. 추론에서는 입력에 조건화된 Transformer로 코드를 autoregressive하게 샘플링한 뒤 VQ-VAE 디코더에 넣는다. 세 과제가 아키텍처를 공유하되 가중치는 과제별로 따로 학습한다.

### 실험 설정

| 실험 | 데이터 | Stage I | Stage II | VQ 설정 | FSQ 설정 |
|---|---|---|---|---|---|
| 트레이드오프 연구 | 128×128 ImageNet, MaskGIT | 100 epoch, 약 50만 스텝, 배치 256 | 200 epoch, 약 100만 스텝, 배치 256 | MaskGIT의 entropy 손실(가중치 0.1), codebook 크기만 sweep | 목표 크기에 맞춰 d와 L_i를 여러 가지로 탐색 |
| MaskGIT | ImageNet 256, 공개 GitHub 코드 | 100만 스텝, 배치 512 (원 설정은 200만 스텝, 배치 256) | 250만 스텝, 배치 256 | codebook 1024(10비트) + entropy 손실 (공개 모델과 동일) | L = [8, 5, 5, 5] |
| UViM | panoptic segmentation, depth estimation, colorization, 공개 GitHub 코드 | 과제별 VQ-VAE | 과제별 Transformer를 3회 학습해 평균 | codeword 4096(12비트) + codebook splitting (공개 결과와 동일) | L = [7, 5, 5, 5, 5] |

MaskGIT 추론은 cosine 스케줄로 12 스텝을 써서 이미지 한 장을 샘플링한다. 나머지 하이퍼파라미터는 MaskGIT GitHub의 `vqgan_config.py`와 `maskgit_class_cond_config.py`를 그대로 따른다.

### 지표 정의

| 지표 | 정의 |
|---|---|
| Reconstruction FID | GAN 손실로 학습한 오토인코더에 검증 이미지 5만 장을 통과시켜 얻은 FID. Stage II Transformer가 데이터를 완벽히 모델링했을 때 도달할 수 있는 FID다. ADM TensorFlow Suite(Dhariwal & Nichol, 2023)로 5만 장 재구성을 학습 집합과 비교해 계산한다 |
| Codebook Usage | 검증 집합을 인코딩할 때 한 번 이상 쓰인 codeword의 비율 |
| Sampling FID | Stage II Transformer로 클래스 조건부 샘플링한 표현 ẑ를 디코딩해 얻은 FID |
| Compression Cost | 표현 밑에 깔린 이산 분포를 모델링하기 얼마나 어려운지(모델링 복잡도)의 대리 지표. 이산 코드의 분포를 예측하는 Transformer는 entropy coding과 결합해 표현을 무손실 압축할 수 있으며, masked Transformer는 입력을 점진적으로 드러내는 결정적 masking 스케줄만 있으면 된다. M2T(Mentzer et al., 2023)의 결정적 스케줄을 쓴다 |
| Precision / Recall | Sajjadi et al.(2018)의 정의. precision은 샘플의 "품질"이고 recall은 샘플이 실제 분포를 덮는 비율이다 |
| PQ, RMSE, `FID-5k` | UViM 논문을 따라 panoptic segmentation은 panoptic quality, depth estimation은 RMSE, colorization은 `FID-5k`로 평가하며 UViM GitHub의 평가 suite를 쓴다 |

ADM TensorFlow Suite로 MaskGIT GitHub의 공식 체크포인트를 평가하면 ADM-FID-train이 4.916으로, MaskGIT 논문이 보고한 6.19와 다르다.

### classifier-free guidance 도입

초기 실험에서 FSQ는 VQ와 다른 Precision과 Recall 지점에 놓였다(FSQ가 recall은 높고 precision은 낮음). 저자들은 diffusion 문헌의 classifier-free guidance(CFG, Ho & Salimans, 2022)를 MaskGIT에 추가했다. 학습 때는 클래스 레이블의 10%를 MASK 토큰으로 바꿔 무조건부 분포를 배우게 하고, 추론 때는 클래스 c에 조건화한 logit l_c와 무조건부 logit l_∅로 l' = l_c + α(l_c − l_∅)를 계산한다. α가 CFG 추론 weight이며, 직관적으로 예측 분포를 무조건부 분포에서 멀어지는 방향으로 당긴다. 저자들은 이 기법이 masked Transformer 맥락에서 Chang et al.(2023, Muse)의 2.7절 등에서 이미 탐구된 것임을 명시한다.

### masking 비율 하한

MaskGIT는 학습 중 비율 r ~ U[0, 1]을 뽑고 N_M = ⌈cos(π/2 × (1 − r)) × S⌉개 토큰을 무작위로 마스킹한다. S는 시퀀스 길이로 ImageNet 256 모델에서는 16^2 = 256이다. 공개 코드로 초기 실험을 하자 Stage II Transformer 손실에 약간의 불안정이 나타났다. 저자들은 N_M = 1처럼 토큰 하나만 마스킹되어 손실이 예측 하나에서만 나오는 스텝이 원인일 것으로 보고, r을 r_min = 1 − arccos(0.45) × 2/π로 하한을 두어 모든 스텝에서 N_M > 0.45 S가 되게 했다. 0.45 대신 다른 값도 시험했는데 0.2를 넘는 값은 모두 안정화에 도움이 됐고 논문 전체에서는 0.45를 썼다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 트레이드오프 연구

Figure 3의 가로축은 항상 codebook 크기 |C|이고, 이는 codebook이 저장할 수 있는 최대 정보량을 나타낸다. 관찰은 다섯 가지다.

- **FSQ는 codebook 크기와 Reconstruction FID가 상관된다**: codebook을 키울수록 FSQ의 재구성 FID가 계속 좋아진다. 저장할 비트가 늘면 재구성 지표가 좋아진다는 압축 관점의 기대와 일치한다. 반면 VQ는 코드의 entropy 정규화에도 불구하고 큰 codebook을 활용하지 못해 2^11개 코드에서 재구성 FID가 최소가 되고, 이 지점은 codebook 사용률이 줄기 시작하는 지점과 일치한다. 작은 codebook에서는 VQ가 FSQ를 근소하게 앞서는데, 저자들은 VQ의 더 높은 표현력 때문일 것으로 본다.
- **FSQ의 Sampling FID가 더 낫다**: Stage I에서의 우위가 codebook을 키울수록 더 나은 Sampling FID로 이어진다. Figure 3 캡션은 2^10을 넘는 codebook에서 FSQ가 더 나은 Sampling FID와 더 높은 사용률을 얻고 VQ의 지표는 나빠지기 시작한다고 적는다.
- **FSQ의 codebook 사용률이 높다**: FSQ는 아무 장치 없이 2^14 = 16,384 크기에서 거의 모든 codeword를 쓰고, 2^16 크기에서는 2^15개 넘는 codeword를 활용한다. VQ는 2^11보다 큰 codebook에서 사용률이 50% 아래로 떨어지고 그보다 큰 codebook에서도 2^10개 넘는 codeword를 활용하지 못한다.
- **codebook 확장의 이득은 줄어든다**: codebook을 계속 키우면 Sampling FID가 계속 낮아질 것 같지만, Figure 3 d)의 compression cost가 계속 올라간다. 즉 양자화 표현이 Transformer가 모델링하기에 더 복잡해진다. 실제로 FSQ의 Sampling FID는 약 2^12개 codeword부터 포화한다. 이 과제에서 FSQ 표현 밑의 이산 분포는 일반적으로 VQ보다 약간 모델링하기 어렵다(같은 Transformer를 서로 다른 VAE에 학습시켰을 때 compression cost가 더 높다). VQ의 compression cost는 사용률과 상관되어 사용률이 떨어지면 코드가 다시 모델링하기 쉬워지고, 같은 모델 군 안에서는 compression cost와 Sampling FID가 반상관이다.
- **채널당 레벨 수 L 선택**: 부록 A.4.1에서 여러 L이 Sampling FID에 미치는 영향을 보였고 L_i < 5는 성능이 떨어졌다.

### MaskGIT (ImageNet 256)

Figure 4 상단 표의 값이다. † 표시는 ADM TensorFlow Suite로 평가했다는 뜻이다.

| 모델 | 출처 | CFG | Sampling FID ↓ | Precision ↑ | Recall ↑ | 사용률 ↑ |
|---|---|---|---|---|---|---|
| MaskGIT (VQ) | 저자 재학습 | 0.1 | 4.509 | 0.860 | 0.465 | 81% |
| MaskGIT (FSQ) | 저자 재학습 | 0.2 | 4.534 | 0.864 | 0.453 | 100% |
| MaskGIT (VQ) | GitHub 공식 체크포인트 | 없음 | 4.916 | 0.836 | 0.489 | 기재 없음 |
| ADM (Dhariwal & Nichol, 2021) | 참조 | 1.5 | 4.59 | 0.83 | 0.52 | 해당 없음 |

CFG weight를 VQ와 FSQ 양쪽에서 sweep한 결과 두 양자화기는 매우 비슷한 FID, precision, recall을 냈고, Figure 5의 시각 결과도 정성적으로 비슷했다. 추론 중 α를 바꾸면 두 모델은 Precision과 Recall 공간에서 매우 비슷한 영역을 덮고 매우 비슷한 최소 FID에 도달한다. ADM의 CFG weight 1.5는 논문의 α와 절대값으로 비교할 수 없어 Figure 4 오른쪽에는 수평선으로만 표시했다. 트레이드오프 연구에 근거해 이 모델들에 더 큰 codebook도 시도했지만 추가 이득은 없었다.

### UViM (dense prediction 세 과제)

Table 2의 값이다. 각 값은 3회 학습 평균과 표준편차이고, † 표시는 UViM GitHub 평가 suite를 썼다는 뜻이다.

| 과제 (데이터) | 모델 | 출처 | 지표 | codebook 사용률 |
|---|---|---|---|---|
| depth estimation (NYU Depth v2), RMSE ↓ | UViM (VQ) | 저자 재학습 | 0.468 ± 0.012 | 99% |
| | UViM (FSQ) | 저자 재학습 | 0.473 ± 0.012 | 99% |
| | UViM (VQ, splitting 없음) | 저자 재학습 | 0.490 ± 0.0037 | 0.78% |
| | UViM (VQ) | GitHub | 0.463 | 기재 없음 |
| | DenseDepth (Alhashim & Wonka, 2018) | baseline | 0.465 | 해당 없음 |
| panoptic segmentation (COCO Panoptic), PQ ↑ | UViM (VQ) | 저자 재학습 | 43.4 ± 0.0008 | 100% |
| | UViM (FSQ) | 저자 재학습 | 43.2 ± 0.0014 | 100% |
| | UViM (VQ, context 없음) | 저자 재학습 | 39.0 ± 0.0023 | 99% |
| | UViM (FSQ, context 없음) | 저자 재학습 | 40.2 ± 0.0019 | 99% |
| | UViM (VQ) | GitHub | 43.1 | 기재 없음 |
| | DETR-R101 (Carion et al., 2020) | baseline | 45.1 | 해당 없음 |
| colorization (ImageNet), `FID-5k` ↓ | UViM (VQ) | 저자 재학습 | 16.90 ± 0.056 | 100% |
| | UViM (FSQ) | 저자 재학습 | 17.55 ± 0.057 | 100% |
| | UViM (VQ) | GitHub | 16.99 ± 0.057 | 기재 없음 |
| | ColTran (Kumar et al., 2021) | baseline | 19.37 | 해당 없음 |

- **모든 과제에서 FSQ는 VQ와 경쟁력이 있다**: 세 과제 모두 FSQ가 VQ에 비해 경쟁력 있는 지표를 냈고, Figure 6(depth)과 부록 A.2의 Figure 7(panoptic, colorization) 시각 결과에서도 그렇다. Table 2 캡션은 FSQ가 모든 과제에서 경쟁력 있지만 근소하게 나쁜 결과를 얻는다고 정리한다.
- **side information이 없을 때 FSQ가 더 낫다**: panoptic segmentation에서 VAE 인코더와 디코더에 주던 원본 RGB 입력을 제거하면 둘 다 PQ가 낮아지지만 FSQ 기반 모델의 하락이 더 작다(VQ 43.4에서 39.0, FSQ 43.2에서 40.2).
- **FSQ는 codebook splitting에 의존하지 않는다**: UViM은 codebook 미활용을 막으려고 Linde et al.(1980)의 알고리즘을 채택해 학습 중 쓰이지 않는 벡터를 탐지하고, 가장 자주 쓰이는 임베딩을 노이즈를 더한 두 개로 쪼개 대체한다. panoptic segmentation에서 splitting을 끄면 학습이 불안정해져 depth estimation으로 ablation했다. NYU Depth에서 splitting을 끄자 RMSE가 유의미하게 나빠지고 사용률이 100배 넘게(two orders of magnitude) 떨어져 0.78%가 됐으며, 예측에 들쭉날쭉한 가장자리가 나타났다(Figure 6 맨 오른쪽 열). FSQ는 보조 알고리즘 없이 99% 사용률을 얻는다.

### 의미론 분석

문헌에서는 VQ-VAE와 VQ-GAN의 codebook이 의미 있는 코드를 학습한다고 흔히 주장된다. 그런데 FSQ는 명시적 codebook을 학습하지 않는데도(그래서 파라미터가 더 적은데도) VQ와 비슷한 샘플을 낸다. 부록 A.3의 소규모 연구에서 저자들은 어느 양자화기에서도 특정 코드가 고정된 시각 개념을 나타낸다는 증거를 찾지 못했고, 둘의 거동은 매우 비슷했다.

| 실험 | 절차 | 관찰 |
|---|---|---|
| 평균 표현(Figure 9 왼쪽) | ImageNet 검증 집합 전체를 인코딩해 marginal histogram을 만들고, 거기서 16×16 표현 3개를 샘플링해 각 디코더로 디코딩 | FSQ-GAN과 VQ-GAN 모두 비슷한 "패치 뒤범벅(soup of patches)"을 만든다 |
| 단일 코드 공유(Figure 9 오른쪽) | marginal histogram에서 가장 흔한 코드 3개를 골라 모든 공간 위치에 같은 코드를 채운 표현을 디코딩 | 단순한 텍스처나 단색에 가까운 출력 |
| representation stitching(Figure 8) | 검증 이미지 A의 위 절반과 B의 아래 절반을 픽셀 공간에서 이은 것과, FSQ-GAN과 VQ-GAN의 표현을 latent 공간에서 이어 디코딩한 것을 비교 | 두 디코더 모두 표현 공간의 급격한 전환을 픽셀 공간의 부드러운 전환으로 바꾼다 |

이 조사는 개별 코드가 아주 추상적인 개념을 배우지 않으며, 최종 RGB 이미지를 결정하는 것은 코드 조합과 디코더 가중치라는 점을 시사한다.

### 레벨 구성 ablation

부록 A.4.1은 128×128 ImageNet MaskGIT에서 여러 L 구성을 탐색했다(Figure 10). 최소 L_i가 5인 구성이 각 codebook 크기에서 가장 낮은 Sampling FID를 냈고, 이를 근거로 다음 권장표를 제시한다.

| 크기 | 2^4 | 2^6 | 2^8 | 2^9 | 2^10 | 2^11 | 2^12 | 2^14 | 2^16 |
|---|---|---|---|---|---|---|---|---|---|
| 권장 L (부록 표기 그대로) | [5, 3] | [8, 8] | [8, 6, 5] | [8, 8, 8] | [8, 5, 5, 5] | [8, 8, 6, 5] | [7, 5, 5, 5] | [8, 8, 8, 6, 5] | [8, 8, 8, 5, 5, 5] |

부록 표의 2^12 항목 [7, 5, 5, 5]는 곱이 875라 2^12에 맞지 않고, 본문 Table 1의 [7, 5, 5, 5, 5](곱 4,375)와 다르다. UViM 실험은 Table 1의 [7, 5, 5, 5, 5]를 썼다고 본문에 명시돼 있다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

저자가 명시한 것:

- 모든 과제에서 FSQ의 지표는 VQ보다 근소하게 나쁘다(기여 요약에서는 0.5~3% 하락으로 정량화).
- 작은 codebook에서는 재구성 FID에서 VQ가 FSQ를 근소하게 앞선다. 저자들은 VQ의 더 높은 표현력 때문일 것으로 추정한다.
- 트레이드오프 과제에서 FSQ 표현의 이산 분포는 일반적으로 VQ보다 약간 모델링하기 어렵고(compression cost가 더 높음), Sampling FID는 약 2^12개 codeword부터 포화해 codebook 확장의 이득이 줄어든다.
- MaskGIT 256에서 더 큰 codebook을 시도했지만 추가 이득이 없었다.
- (d, L_i) 조합은 모든 선택이 최적은 아니며 L_i < 5는 성능이 떨어진다.
- 향후 과제는 FSQ를 더 많은 응용에서 탐구하는 것이다.

자료에 기술이 없어 확인할 수 없는 것:

- 게재 학회, 평가에 쓴 하드웨어와 학습 시간, 오디오나 비디오 등 이미지 밖 도메인의 결과.
- 트레이드오프 연구의 정확한 수치는 Figure 3 그래프로만 제시되어 본문 텍스트에 표로 적혀 있지 않다.

자료 내적 모순:

- 본문 Table 1은 2^12에 [7, 5, 5, 5, 5]를, 부록 A.4.1의 권장표는 2^12에 [7, 5, 5, 5]를 적는다. 후자는 곱이 875라 2^12에 맞지 않는다.

## 6. 관련 연구 (Related Work)

| 묶음 | 연구 | 내용 |
|---|---|---|
| VQ-VAE와 개선 | Van Den Oord et al. (2017) | 원 정식화. commitment 손실과 codebook EMA 포함 |
| | Roy et al. (2018) | soft EM으로 VQ-VAE 학습. 목표 과제에 맞춘 codebook 크기 조정 |
| | Dhariwal et al. (2020) | 오디오 생성에 VQ-VAE. 사용률이 낮아진 벡터를 인코더 출력으로 되돌리는 "random restart", multi-scale VQ |
| | Łańcucki et al. (2020) | 오프라인 clustering으로 codebook을 주기적으로 재초기화 |
| | Yu et al. (2021) | ViT 기반 VQ-GAN. 모든 벡터를 l2 정규화하고 lookup용 저차원 공간으로 사상 |
| | Takida et al. (2022) | 인코더 출력에 가우시안 노이즈를 더해 양자화를 흉내 내고 학습 중 annealing하는 stochastic 양자화(SQ-VAE) |
| | Williams et al. (2020) | stochastic 양자화기와 계층 표현 |
| | Huh et al. (2023) | vanilla VQ 학습의 난점 분석. 재파라미터화, 교대 최적화, 개선된 commitment 손실 제안 |
| VQ 대안 | Lee et al. (2022), Zeghidour et al. (2021) | residual quantization(RVQ). 양자화 잔차를 추가로 저장해 코드를 정제 (이미지, 오디오) |
| | Chen et al. (2020), El-Nouby et al. (2022) | product quantization(PQ). codebook을 작은 codebook들의 곱으로 분해 |
| | Huang et al. (2023) | VQ-VAE 출력 토큰 수를 줄여 추론 효율화 |
| | Donahue et al. (2019), Dieleman et al. (2021) | 오디오 과제에 FSQ 적용. 인코더가 bounded 표현을 내도록 "margin 손실" 사용 |
| | Hsu et al. (2023) | 채널별 codebook으로 학습된 격자 형성. 최적화는 vanilla VQ와 같은 손실 |
| 신경망 압축 | Ballé et al. (2016), Minnen et al. (2018), Lu et al. (2019), Mentzer et al. (2020), Cheng et al. (2020) | unbounded 스칼라 양자화 + 양자화 표현의 entropy 제약 |
| | Mentzer et al. (2018) | bounded 스칼라 양자화(즉 FSQ)로 고화질 이미지 표현. d = 16, L = 5 |
| | Tschannen et al. (2018), Agustsson et al. (2019) | "극한 압축"에 bounded 스칼라 양자화. d = 5, L = 5 |

신경망 이미지 압축은 대체로 "high bitrate" 재구성을 목표로 하고 복잡한 표현의 entropy를 줄이는 것이 과제인 반면, VQ-VAE 표현 학습의 목표는 보통 그 반대로 강하게 제약된 표현의 entropy를 높여 최대한 활용하는 것이다. 적용 대상 모델은 MaskGIT(masked generative Transformer), UViM(learned guiding code 기반 dense prediction 통합 모델)이고, 참조 baseline은 diffusion 기반 ADM(Dhariwal & Nichol, 2021)이다.

## 7. 용어집 (Glossary)

- **FSQ (finite scalar quantization)**: VAE 표현을 저차원으로 투영해 각 차원을 bound한 뒤 정수로 반올림하는 양자화기. 차원별 값 집합의 곱집합이 암묵적 codebook이 된다.
- **VQ (vector quantization)**: 표현 벡터를 학습된 codebook의 최근접 벡터로 교체하는 양자화기. Gray(1984)가 도입했다.
- **codebook**: 이산 표현이 고를 수 있는 코드의 집합. VQ에서는 학습 파라미터이고 FSQ에서는 격자로 암묵적으로 정의된다.
- **codebook collapse**: codebook이 커질수록 다수의 codeword가 쓰이지 않는 현상. 논문은 "underutilized codebooks"라고도 부른다.
- **STE (straight-through estimator)**: 미분 불가능한 반올림이나 최근접 탐색의 그래디언트를 1로 대체해 통과시키는 기법(Bengio et al., 2013).
- **codebook splitting**: 쓰이지 않는 벡터를 가장 자주 쓰이는 임베딩을 둘로 쪼개 대체하는 VQ 보조 장치(Linde et al., 1980, UViM 사용).
- **bounding 함수 f**: 인코더 출력의 각 채널을 L개 값의 범위로 묶는 함수. 기본형은 ⌊L/2⌋ tanh(z)이고 짝수 L은 비대칭 offset이 필요하다.
- **CFG (classifier-free guidance)**: 조건부 logit과 무조건부 logit을 l' = l_c + α(l_c − l_∅)로 보간해 생성 품질을 조절하는 기법.
- **Reconstruction FID / Sampling FID**: 오토인코더 재구성 품질과 Stage II Transformer 샘플 품질을 각각 FID로 잰 지표.
- **Compression Cost**: Transformer와 entropy coding으로 표현을 무손실 압축했을 때의 비트 수. 이산 분포의 모델링 난이도의 대리 지표.

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 2 | "FSQ와 VQ의 양자화 방식 비교. FSQ는 인코더 출력을 d=3차원으로 투영해 각 차원을 L=3개 값으로 bound하고 반올림해 하이퍼큐브의 최근접 격자점을 고른다. VQ는 d=7차원 벡터를 codebook의 최근접 벡터로 교체한다" | caption-region | ★ wiki 권장 (architecture) |
| fig02 | 3 | "왼쪽은 VQ와 FSQ의 구현과 최적화 비교표, 오른쪽은 L=5인 단일 채널에서 bounding 함수 f(z)와 round_ste(f(z))의 계단형 출력" | caption-region | ★ wiki 권장 (method) |
| fig03 | 5 | "128×128 ImageNet에서 codebook 크기별 VQ와 FSQ 특성 비교. a) Reconstruction FID, b) Sampling FID, c) codebook 사용률, d) compression cost" | caption-region | ★ wiki 권장 (result) |
| fig04 | 6 | "ImageNet 256 MaskGIT에서 CFG weight α를 바꿀 때의 Precision 대 Recall(왼쪽)과 Sampling FID(오른쪽). ADM은 참조선이며 크롭에는 상단 결과표가 포함되지 않았다" | caption-region | ★ wiki 권장 (result, CFG sweep) |
| fig05 | 7 | "FSQ(위)와 VQ(아래) MaskGIT 모델의 무선별 샘플. ImageNet 클래스 330, 320, 510, 454에 대해 모델당 두 장씩" | caption-region | (옵션, 정성) |
| fig06 | 9 | "UViM depth estimation 샘플. 입력, ground truth, FSQ, VQ, codebook splitting을 끈 VQ 순서이며 마지막 열은 가장자리가 들쭉날쭉하다" | caption-region | ★ wiki 권장 (splitting ablation 정성) |
| fig07 | 14 | "UViM panoptic segmentation(위 두 행)과 colorization(아래 두 행)의 정성 결과. 입력, ground truth, FSQ, VQ 순서" | caption-region | (부록) |
| fig08 | 15 | "representation stitching 분석. 검증 이미지 두 장의 위 절반과 아래 절반을 픽셀 공간에서 이어 붙인 것과 FSQ-GAN, VQ-GAN의 latent에서 이어 붙여 디코딩한 것을 비교" | caption-region | (부록) |
| fig09 | 15 | "가짜 representation 시각화. 왼쪽 세 열은 marginal histogram에서 무작위로 뽑은 코드를 디코딩한 것, 오른쪽 세 열은 가장 흔한 코드 3개를 모든 공간 위치에 공유시켜 디코딩한 것. 위가 FSQ, 아래가 VQ" | caption-region | (부록) |
| fig10 | 16 | "채널당 양자화 레벨 L 구성별 Sampling FID. 마커 색과 모양은 그 모델의 최소 L_i 값(3, 4, 5, 8)을 나타낸다" | caption-region | ★ wiki 권장 (L_i ≥ 5 근거) |
| tab01 | 4 | "목표 codebook 크기 |C|(2^8부터 2^16)에 맞춘 FSQ 레벨 L 권장값. wiki에는 마크다운 표로 옮겼다" | manual | (마크다운 표로 대체) |
| tab02 | 8 | "UViM 세 과제(NYU Depth v2, COCO Panoptic, ImageNet Colorization)의 VQ와 FSQ 결과와 codebook 사용률, GitHub 참조값과 baseline. wiki에는 마크다운 표로 옮겼다" | table-region | (마크다운 표로 대체) |
