---
title: "Finite Scalar Quantization: VQ-VAE Made Simple"
type: paper
year: 2023
category: llms
raw_path: /home/sguys99/project/ai-wiki/raw/papers/mentzer-2023-finite-scalar-quantization-vq-vae-made.pdf
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

## 한 줄 요약 (One-line Summary)

VQ-VAE의 vector quantization을 각 latent 차원을 소수의 고정값으로 반올림하는 finite scalar quantization(FSQ)으로 대체하면, 보조 손실·codebook 관리 없이도 codebook 사용률이 거의 100%에 이르고 image generation·dense prediction에서 VQ와 대등한 성능을 얻는다.

## 1. 자료 정보 (Document Information)

- **제목**: Finite Scalar Quantization: VQ-VAE Made Simple
- **저자**: Fabian Mentzer, David Minnen, Eirikur Agustsson (Google Research), Michael Tschannen (Google DeepMind)
- **발표**: arXiv 2309.15505, 2023년 9월 (v2 2023년 10월)
- **코드**: GitHub 공개 (Jax 구현 + Colab)
- **분류 근거**: FSQ는 discrete representation을 만드는 tokenizer/quantizer 아키텍처 기법이다. 이미지 생성과 multimodal LLM의 핵심 building block이라 category는 `llms`로 둔다.

## 2. 주요 기여 (Key Contributions)

FSQ는 vector quantization을 스칼라 단위로 단순화한 quantizer다. VAE representation을 아주 낮은 차원(보통 10 미만)으로 투영한 뒤 각 차원을 몇 개의 고정값으로 반올림한다. 각 차원이 L개 값을 갖고 차원이 d개면, 그 곱집합이 곧 암묵적(implicit) codebook이 되어 크기가 L^d다. 예를 들어 d=3, L=3이면 codebook은 3^3 = 27개 코드로 이뤄진 정수 격자다.

논문의 기여는 세 갈래다.

먼저 FSQ가 여러 아키텍처에서 VQ의 drop-in replacement로 작동함을 보였다. image generation에서는 MaskGIT에, depth estimation·colorization·panoptic segmentation에서는 UViM에 붙였는데, 각 지표에서 0.5~3%의 작은 하락만으로 거의 같은 결과를 냈다. 두 모델 계열은 설계가 크게 다르다. 오토인코더가 convolutional이냐 transformer냐, 생성 transformer가 masked냐 autoregressive냐에서 갈린다. 그런데도 quantizer만 바꿔 끼우는 방식이 양쪽에서 통했다.

다음으로 codebook 크기에 따른 VQ와 FSQ의 스케일링 거동을 분석했다. FSQ는 큰 codebook을 잘 활용해 reconstruction 품질과 sample 품질을 함께 끌어올린다. 대부분의 모델에서 사용률이 100%에 가까운데, 이 모두를 보조 손실 하나 없이 이룬다.

마지막으로 VQ가 지닌 완전한 일반성이 실익을 거의 주지 못한다는 점을 보였다. 큰 codebook에서는 오히려 VQ가 더 나쁘다. 최적화가 까다롭기 때문이다. FSQ는 표준 VQ에서 인코더 출력을 bound하고 codebook을 고정한 특수형으로 볼 수 있다. 그 암묵적 codebook은 차원이 훨씬 작다(FSQ는 보통 d<10, VQ는 d≥512).

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### VQ의 문제

VQ-VAE(Van Den Oord et al., 2017)는 codebook C를 학습해 입력을 압축된 이산 표현으로 바꾼다. 인코더가 이미지 x를 표현 z로 바꾸면, z의 각 벡터를 C에서 가장 가까운 벡터로 교체(양자화)한다. 이 연산은 미분 불가능이라 straight-through estimator(STE)로 디코더 입력의 gradient를 인코더 출력에 그대로 복사한다. STE는 codebook 벡터 자체에는 gradient를 주지 못한다. 그래서 VQ-VAE는 codeword를 표현 쪽으로 끌어당기는 보조 손실 두 개(commitment loss 등)를 더 붙인다.

이 정식화는 최적화가 까다로운 데다, codebook이 커질수록 많은 codeword가 쓰이지 않는 codebook collapse(사용률 붕괴)로 이어진다. 후속 연구들은 codebook 재초기화, random restart, stochastic 정식화, EMA, code splitting 등 온갖 보조 장치로 이를 메워 왔다.

### FSQ의 정식화

FSQ는 이 장치들을 전부 걷어낸다. d차원 표현 z에 bounding 함수 f를 먼저 적용한 뒤 정수로 반올림한다. f는 각 채널이 L개 값 중 하나를 갖도록 설계하는데, 논문의 기본형은 f: z ↦ ⌊L/2⌋ tanh(z)다. tanh로 범위를 묶고 반올림하면 결과 zˆ는 곱집합 codebook C에 속하고 |C| = L^d다. 채널마다 레벨을 다르게(L_i) 줄 수도 있어 일반형은 |C| = ∏ L_i다.

반올림의 gradient도 VQ처럼 STE로 통과시킨다. 구현은 stop-gradient(sg) 한 줄이면 된다: `round_ste: x ↦ x + sg(round(x) − x)`. reconstruction loss로 학습하면 인코더는 손실을 줄이려고 정보를 여러 quantization bin에 골고루 퍼뜨린다. 그 결과 보조 손실 없이도 모든 codeword를 쓰는 quantizer가 된다.

이렇게 단순한 방식이 왜 통할까? VQ는 고차원 latent 공간에 학습 가능한 Voronoi 분할을 만들어 입력 공간을 잘게 나눈다. FSQ는 훨씬 낮은 차원에서 고정된 격자 분할을 쓸 뿐이다. 대신 VAE의 model capacity가 충분해 VQ의 비선형성을 인코더·디코더가 "흡수"한다. 그 덕에 단순한 격자로도 비슷한 복잡도의 분할을 얻는다.

### 하이퍼파라미터와 파라미터 수

FSQ의 하이퍼파라미터는 채널 수 d와 채널별 레벨 L=[L_1,...,L_d]뿐이다. 목표 codebook 크기 |C|에 맞추는 (d, L_i) 조합은 여럿인데, 저자들이 찾은 간단한 규칙은 모든 채널에서 L_i ≥ 5를 쓰라는 것이다. 흔한 목표 크기별 권장 L은 Table 1에 정리돼 있다.

FSQ는 VQ보다 파라미터가 적다. VQ는 크기 |C|·d의 codebook을 학습하는데, |C|=4096, d=512면 약 200만 파라미터에 이른다. FSQ에는 이 codebook 파라미터가 아예 없다. d가 훨씬 작아 마지막 인코더 층의 파라미터까지 줄어든다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 트레이드오프 연구 (128×128 ImageNet)

codebook 크기를 2^4부터 2^16까지 훑으며 VQ와 FSQ를 비교했다(Figure 3).

- **Reconstruction FID**: FSQ는 codebook을 키울수록 계속 개선된다. 정보를 담을 비트가 늘면 재구성이 좋아지는 압축의 상식과 일치한다. 반면 VQ는 entropy 정규화를 써도 큰 codebook을 살리지 못한다. 2^11에서 최소를 찍은 뒤 나빠지는데, 이는 codebook 사용률이 꺾이는 지점과 겹친다. 다만 작은 codebook에서는 VQ가 표현력 덕에 FSQ를 근소하게 앞선다.
- **Sampling FID**: Stage I(오토인코더)의 우위가 그대로 이어져 FSQ가 더 낫다.
- **Codebook 사용률**: FSQ는 아무 장치 없이도 2^14=16k codebook에서 거의 전부를 쓴다. 2^16에서도 2^15개 넘게 활용한다. VQ는 2^11을 넘으면 50% 아래로 떨어지고 2^10개 이상은 못 쓴다.
- **Compression Cost**: codebook을 무한정 키운다고 Sampling FID가 계속 좋아지진 않는다. 표현의 compression cost(transformer가 모델링하기 얼마나 어려운지의 대리 지표)가 함께 오른다. 그래서 FSQ의 Sampling FID는 2^12 부근에서 포화한다.

### MaskGIT (256×256 ImageNet)

Stage I 100만 스텝, Stage II 250만 스텝으로 학습했다. VQ는 codebook 1024(10비트)+entropy loss, FSQ는 L=[8,5,5,5]를 썼다. FSQ와 VQ는 Sampling FID(각각 4.534, 4.509)·Precision·Recall이 모두 대등했다. 정성 샘플도 서로 구분하기 어렵다(Figure 5). FSQ의 codebook 사용률은 100%, VQ는 81%였다.

FSQ는 초기 실험에서 VQ와 다른 Precision-Recall 지점(recall 높고 precision 낮음)에 놓였는데, diffusion에서 온 classifier-free guidance(CFG)를 MaskGIT에 도입해 이를 조정했다. 학습 때는 클래스 라벨의 10%를 MASK로 바꿔 unconditional 분포를 배우게 하고 추론 때는 conditional·unconditional logit을 보간한다.

### UViM (dense prediction 세 태스크)

depth estimation·panoptic segmentation·colorization을 각각 세 번씩 학습해 평균을 냈다. VQ는 4096 codeword(12비트)+codebook splitting, FSQ는 L=[7,5,5,5,5]다(Table 2).

- 세 태스크 모두 FSQ가 VQ와 경쟁력 있는 지표를 냈다(depth RMSE 0.473 vs 0.468, panoptic PQ 43.2 vs 43.4, colorization FID 17.55 vs 16.90). 근소하게 낮지만 대등하다.
- **context(RGB 입력) 제거**: panoptic에서 side information을 없애면 둘 다 나빠지지만 FSQ의 하락 폭이 더 작다(FSQ 40.2 vs VQ 39.0).
- **codebook splitting 제거**: depth 태스크에서 VQ의 splitting을 끄면 RMSE가 크게 나빠지고 사용률이 0.78%로 두 자릿수 이상 붕괴한다. 예측에서 가장자리가 뭉개진다(Figure 6). FSQ는 어떤 보조 알고리즘 없이도 99% 사용률을 낸다.

### 의미론(semantics) 관찰

VQ-VAE codebook이 의미 있는 코드를 학습한다는 통념과 달리, 저자들의 소규모 분석에서는 특정 코드가 고정된 시각 개념을 나타낸다는 증거를 찾지 못했다. FSQ와 VQ 모두 비슷하게 행동했다. 최종 이미지를 결정하는 것은 개별 코드가 아니라 코드 조합과 디코더 가중치라는 결론에 가깝다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- 모든 태스크에서 FSQ는 VQ보다 지표가 근소하게(0.5~3%) 낮다. 최고 수치가 절대적으로 중요한 경우엔 여전히 VQ가 앞설 수 있다.
- 작은 codebook에서는 VQ의 표현력이 FSQ를 앞선다. FSQ의 장점은 큰 codebook에서 두드러진다.
- FSQ representation의 이산 분포가 transformer에 다소 모델링하기 어렵다(compression cost가 VQ보다 높게 나오는 구간이 있다). codebook 확장의 이득은 일정 지점에서 포화한다.
- 저자들은 FSQ를 더 많은 응용으로 확장하는 것을 향후 과제로 남겼다.

## 6. 관련 연구 (Related Work)

- **VQ-VAE 계열**: Van Den Oord et al.(2017)의 원 정식화, EMA·commitment loss. 이후 soft EM, random restart, 주기적 재초기화, ViT 기반 VQ-GAN, stochastic quantization(SQ-VAE), STE 재파라미터화 등 codebook collapse를 막는 여러 개선.
- **VQ 대안**: residual quantization(RVQ), product quantization(PQ). 오디오에서 FSQ 유사 기법(margin loss로 bounded 표현 유도).
- **Neural compression**: 대부분 unbounded scalar quantization + entropy 제약. bounded scalar quantization(=FSQ)은 고화질 이미지 표현·극한 압축에 쓰였으나(예: d=16,L=5), 압축 밖의 비전 태스크에는 쓰인 적이 없었다. 이 논문이 그 공백을 메운다.
- **적용 대상 아키텍처**: MaskGIT(masked generative transformer), UViM(learned guiding code 기반 dense prediction 통합 모델), 참조 baseline으로 diffusion 기반 ADM.

## 7. 용어집 (Glossary)

- **FSQ (finite scalar quantization)**: VAE 표현을 저차원으로 투영해 각 차원을 몇 개의 고정값으로 반올림하는 quantizer. 차원별 값의 곱집합이 암묵적 codebook이 된다.
- **VQ (vector quantization)**: 표현 벡터를 학습된 codebook의 최근접 벡터로 교체하는 quantizer.
- **codebook**: 이산 표현이 고를 수 있는 코드(벡터/정수 조합)의 집합. FSQ에서는 격자로 암묵적으로 정의되고 VQ에서는 학습 파라미터다.
- **codebook collapse (사용률 붕괴)**: codebook이 커질수록 다수의 코드가 쓰이지 않게 되는 현상. VQ의 고질적 문제.
- **STE (straight-through estimator)**: 미분 불가능한 반올림·최근접 연산의 gradient를 항등으로 근사해 통과시키는 기법.
- **codebook splitting**: 자주 쓰이는 embedding을 둘로 쪼개 미사용 코드를 대체하는 VQ 보조 장치(UViM 사용). FSQ에는 불필요.
- **implicit codebook (암묵적 codebook)**: FSQ에서 채널별 레벨의 곱집합으로 자동 정의되는 codebook. 별도 파라미터가 없다.
- **CFG (classifier-free guidance)**: conditional·unconditional 예측을 보간해 생성 품질을 조절하는 기법. diffusion에서 유래, 이 논문은 MaskGIT에 도입.
- **Reconstruction FID / Sampling FID**: 오토인코더 재구성 품질 / transformer 샘플 품질을 각각 FID로 잰 지표.

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 2 | "FSQ와 VQ 개념 비교 — 저차원 정수 격자 반올림 vs codebook 최근접 탐색" | caption-region | ★ wiki 권장 (architecture) |
| fig02 | 3 | "VQ vs FSQ 구현·최적화 비교표 + 단일 채널 bounding 함수" | caption-region | ★ wiki 권장 (method) |
| fig03 | 5 | "codebook 크기별 VQ·FSQ 4대 특성(FID·사용률·compression)" | caption-region | ★ wiki 권장 (result) |
| tab01 | 4 | "목표 codebook 크기별 FSQ 레벨 L 권장값" | manual | ★ wiki 권장 (method) |
| tab02 | 8 | "UViM 세 태스크 결과 — FSQ vs VQ" | table-region | ★ wiki 권장 (result) |
| fig04 | 6 | "MaskGIT 256 결과 — CFG weight별 Precision-Recall·FID" | caption-region | (옵션 — 생성 상세) |
| fig05 | 7 | "FSQ·VQ MaskGIT 정성 샘플" | caption-region | (옵션 — 정성) |
| fig06 | 9 | "UViM depth 샘플 — splitting 없는 VQ는 가장자리 뭉갬" | caption-region | (옵션 — 정성) |
| fig07 | 14 | "UViM segmentation·colorization 정성" | caption-region | (부록) |
| fig08 | 15 | "representation stitching 분석" | caption-region | (부록) |
| fig09 | 15 | "가짜 representation 시각화" | caption-region | (부록) |
| fig10 | 16 | "채널당 레벨 L 구성별 Sampling FID" | caption-region | (부록 — L_i≥5 근거) |
