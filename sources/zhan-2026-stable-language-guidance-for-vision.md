---
title: "Stable Language Guidance for Vision-Language-Action Models"
type: paper
year: 2026
category: physical-ai
raw_path: raw/papers/zhan-2026-stable-language-guidance-for-vision.pdf
raw_filename: "zhan-2026-stable-language-guidance-for-vision.pdf"
source_collection: external
authors: "Zhihao Zhan, Yuhao Chen, Jiaying Zhou, Qinhan Lyu, Hao Liu, Keze Wang, Liang Lin, Guangrun Wang (교신); Sun Yat-sen University, Guangdong Key Lab of Big Data Analysis and Processing, X-Era AI Lab"
arxiv_id: "2601.04052"
tags: [physical-ai, vla, manipulation, benchmark]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/zhan-2026-stable-language-guidance-for-vision/fig01.png
    raw: raw/papers/zhan-2026-stable-language-guidance-for-vision-figures/fig01.png
    caption: "지시문 교란의 세 유형. 왼쪽 destructive instruction overwriting은 black과 top을 MASK 토큰으로 지우고, 가운데 obfuscated instruction reinterpretation은 mug를 beverage container로 추상화하며, 오른쪽 out-of-distribution semantic transfer는 학습에서 본 stove 대신 cabinet을 목표로 준다. 각 칸 위아래에 원래 지시문과 교란된 지시문이 적혀 있다"
    page: 1
    bbox_norm: [0.5042, 0.2541, 0.9763, 0.4087]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/zhan-2026-stable-language-guidance-for-vision/fig02.png
    raw: raw/papers/zhan-2026-stable-language-guidance-for-vision-figures/fig02.png
    caption: "RSS 전체 구조. 왼쪽 위 Monte Carlo Syntactic Integration은 teacher VLM이 seed 지시문에서 spatial layout, subtask, rewrite 세 종류의 dense syntactic neighborhood를 만든다. 오른쪽 위 Residual Affordance Steering은 같은 observation에서 affordance prior와 semantic modulation 두 분포를 얻는다. 아래 Overview는 ViT와 pre-trained VLM이 blank input과 dense input을 따로 처리하고 action expert가 두 출력을 합쳐 steered policy의 action chunk를 내는 흐름이다"
    page: 4
    bbox_norm: [0.0652, 0.0733, 0.9349, 0.4244]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/zhan-2026-stable-language-guidance-for-vision/fig03.png
    raw: raw/papers/zhan-2026-stable-language-guidance-for-vision-figures/fig03.png
    caption: "R3 Reasoning Chain 지시문으로 서랍을 열고 그릇을 넣는 과제를 실행한 rollout 비교. 위에서부터 π0, RSS를 적용한 π0, π0.5, RSS를 적용한 π0.5이며, 빨간 확대 상자가 그리퍼가 서랍 근처에서 그릇을 다루는 시점을 보여 준다"
    page: 6
    bbox_norm: [0.4999, 0.2789, 0.9051, 0.4931]
    strategy: manual
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/zhan-2026-stable-language-guidance-for-vision/fig04.png
    raw: raw/papers/zhan-2026-stable-language-guidance-for-vision-figures/fig04.png
    caption: "destructive instruction overwriting에서 steering coefficient와 denoising step 수에 따른 성공률 막대그래프. (a)와 (b)는 π0와 π0.5의 coefficient를 1.25부터 3.0까지 바꾸고, (c)와 (d)는 denoising step을 바꾼다. π0는 coefficient가 커질수록 M6와 M8 마스크 조건 성공률이 크게 낮아진다"
    page: 8
    bbox_norm: [0.0898, 0.0364, 0.891, 0.1996]
    strategy: caption-region
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/zhan-2026-stable-language-guidance-for-vision/fig05.png
    raw: raw/papers/zhan-2026-stable-language-guidance-for-vision-figures/fig05.png
    caption: "3만 step 학습 동안의 loss 곡선. π0와 π0.5 각각의 base, RAS, MCSI, RAS와 MCSI 결합까지 여덟 변형을 그렸다. 초반에 빠르게 내려간 뒤 안정되며, RAS나 MCSI를 적용한 변형이 대응하는 base보다 낮은 loss에 머문다"
    page: 8
    bbox_norm: [0.0918, 0.2605, 0.5151, 0.4389]
    strategy: manual
    curated: false
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/zhan-2026-stable-language-guidance-for-vision/fig06.png
    raw: raw/papers/zhan-2026-stable-language-guidance-for-vision-figures/fig06.png
    caption: "π0.5에서 지시문을 비운 blank 조건으로 와인병을 cabinet 위에 올리는 과제를 실행한 rollout. base와 MCSI는 실패하고 RAS와 RAS와 MCSI 결합은 성공한다"
    page: 19
    bbox_norm: [0.2613, 0.1347, 0.7394, 0.3765]
    strategy: caption-region
    curated: false
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/zhan-2026-stable-language-guidance-for-vision/fig07.png
    raw: raw/papers/zhan-2026-stable-language-guidance-for-vision-figures/fig07.png
    caption: "같은 blank 조건과 같은 과제를 π0로 실행한 rollout. base와 MCSI는 실패로, RAS와 RAS와 MCSI 결합은 성공으로 표시돼 있다"
    page: 19
    bbox_norm: [0.2613, 0.5558, 0.7391, 0.7986]
    strategy: caption-region
    curated: false
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/zhan-2026-stable-language-guidance-for-vision/fig08.png
    raw: raw/papers/zhan-2026-stable-language-guidance-for-vision-figures/fig08.png
    caption: "R1 Distraction 지시문 생성 예시. 서랍 열기와 와인병 옮기기 두 지시문을 대화체 표현과 주변 맥락을 덧붙인 10가지 문장으로 바꾸라는 prompt와 ChatGPT-5.2의 출력이다"
    page: 20
    bbox_norm: [0.1852, 0.2392, 0.8148, 0.7231]
    strategy: caption-region
    curated: false
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/zhan-2026-stable-language-guidance-for-vision/fig09.png
    raw: raw/papers/zhan-2026-stable-language-guidance-for-vision-figures/fig09.png
    caption: "R2 Common Sense 지시문 생성 예시. 물체 이름을 기능 설명으로 바꾸라는 prompt와 출력으로, bowl은 재료를 담는 오목한 용기로, stove는 조리 열을 가하는 표면으로 바뀐다"
    page: 21
    bbox_norm: [0.1852, 0.1586, 0.8148, 0.789]
    strategy: caption-region
    curated: false
  - id: fig10
    label: Figure 10
    kind: figure
    file: assets/zhan-2026-stable-language-guidance-for-vision/fig10.png
    raw: raw/papers/zhan-2026-stable-language-guidance-for-vision-figures/fig10.png
    caption: "R3 Reasoning Chain 지시문 생성 예시. 최종 상태나 순서, 조건, 확인 단계를 덧붙이라는 prompt와 그릇을 cabinet 위에 올리기, 접시를 stove 앞쪽으로 밀기 두 지시문의 출력 10개씩이다"
    page: 22
    bbox_norm: [0.1852, 0.2092, 0.8148, 0.7387]
    strategy: caption-region
    curated: false
  - id: fig11
    label: Figure 11
    kind: figure
    file: assets/zhan-2026-stable-language-guidance-for-vision/fig11.png
    raw: raw/papers/zhan-2026-stable-language-guidance-for-vision-figures/fig11.png
    caption: "R4 Confusion 지시문 생성 예시. ignore the X, not X but Y, regardless of X 같은 배제 표현으로 distractor 물체를 언급하라는 prompt와 크림치즈 담기, stove 켜기 두 지시문의 출력이다"
    page: 23
    bbox_norm: [0.1852, 0.2325, 0.8148, 0.715]
    strategy: caption-region
    curated: false
  - id: tab01
    label: Table 1
    kind: table
    file: assets/zhan-2026-stable-language-guidance-for-vision/tab01.png
    raw: raw/papers/zhan-2026-stable-language-guidance-for-vision-figures/tab01.png
    caption: "Destructive Instruction Overwriting 결과표. Origin, Multi, Blank, Rand, M2, M4, M6, M8, Simple 9개 조건에서 π0와 π0.5의 base, RAS, MCSI, RAS와 MCSI 결합 성공률을 비교한다. 평균은 π0가 52.37%에서 82.22%로, π0.5가 75.90%에서 86.98%로 오른다"
    page: 5
    bbox_norm: [0.1122, 0.1461, 0.891, 0.3223]
    strategy: table-region
    curated: true
  - id: tab02
    label: Table 2
    kind: table
    file: assets/zhan-2026-stable-language-guidance-for-vision/tab02.png
    raw: raw/papers/zhan-2026-stable-language-guidance-for-vision-figures/tab02.png
    caption: "Obfuscated instruction reinterpretation 결과표. R0부터 R4까지 다섯 변형의 성공률이며, π0는 MCSI 단독이 평균 66.80%로 가장 높고 π0.5는 RAS와 MCSI 결합이 78.68%로 가장 높다"
    page: 5
    bbox_norm: [0.2019, 0.3879, 0.8001, 0.5911]
    strategy: manual
    curated: true
  - id: tab03
    label: Table 3
    kind: table
    file: assets/zhan-2026-stable-language-guidance-for-vision/tab03.png
    raw: raw/papers/zhan-2026-stable-language-guidance-for-vision-figures/tab03.png
    caption: "LIBERO-Goal의 와인병을 cabinet 위에 올리는 지시문을 R0부터 R4까지 다섯 방식으로 바꾼 예시표"
    page: 6
    bbox_norm: [0.113, 0.1177, 0.887, 0.2705]
    strategy: table-region
    curated: false
  - id: tab04
    label: Table 4
    kind: table
    file: assets/zhan-2026-stable-language-guidance-for-vision/tab04.png
    raw: raw/papers/zhan-2026-stable-language-guidance-for-vision-figures/tab04.png
    caption: "OOD semantic transfer 결과표. 두 과제를 뺀 데이터로 학습한 π0.5를 10, 100, 1000 step 적응시킨 성공률이며 MCSI가 평균 55.67%로 가장 높다"
    page: 6
    bbox_norm: [0.1029, 0.3589, 0.5121, 0.4641]
    strategy: manual
    curated: true
  - id: tab05
    label: Table 5
    kind: table
    file: assets/zhan-2026-stable-language-guidance-for-vision/tab05.png
    raw: raw/papers/zhan-2026-stable-language-guidance-for-vision-figures/tab05.png
    caption: "학습에 쓰지 않은 VLM이 바꿔 쓴 지시문에서의 성공률표. ChatGPT-5.2 기준 대비 drift가 DeepSeek-R1에서 base 10.54% 하락, MCSI 1.28% 하락이고 Qwen3.5에서 base 5.10% 하락, MCSI 1.71% 하락이다"
    page: 9
    bbox_norm: [0.2344, 0.1461, 0.7691, 0.3719]
    strategy: table-region
    curated: true
  - id: tab06
    label: Table 6
    kind: table
    file: assets/zhan-2026-stable-language-guidance-for-vision/tab06.png
    raw: raw/papers/zhan-2026-stable-language-guidance-for-vision-figures/tab06.png
    caption: "MCSI 학습용 지시문 생성 VLM을 Qwen2.5-VL, InternVL3, LLaVA-OneVision으로 바꾼 결과표. 평균 성공률이 73.55%에서 75.75% 사이에 머문다"
    page: 9
    bbox_norm: [0.1839, 0.4229, 0.8201, 0.5161]
    strategy: manual
    curated: false
  - id: tab07
    label: Table 7
    kind: table
    file: assets/zhan-2026-stable-language-guidance-for-vision/tab07.png
    raw: raw/papers/zhan-2026-stable-language-guidance-for-vision-figures/tab07.png
    caption: "LIBERO-Plus의 Camera, Robot, Language, Light, Background, Noise, Layout 7개 교란 항목 성공률 비교표. 기존 모델 11개와 π0.5 변형 4개를 비교하며 MCSI 단독과 RAS와 MCSI 결합이 평균 90.0%로 가장 높다"
    page: 14
    bbox_norm: [0.15, 0.1479, 0.8529, 0.3498]
    strategy: table-region
    curated: true
  - id: tab08
    label: Table 8
    kind: table
    file: assets/zhan-2026-stable-language-guidance-for-vision/tab08.png
    raw: raw/papers/zhan-2026-stable-language-guidance-for-vision-figures/tab08.png
    caption: "원래 지시문으로 LIBERO 4개 suite를 평가한 성공률표. Diffusion Policy, MDT, OpenVLA, Octo 등 기존 방법과 π0, π0.5 변형을 함께 싣는다"
    page: 14
    bbox_norm: [0.1884, 0.4465, 0.8148, 0.6792]
    strategy: table-region
    curated: false
  - id: tab09
    label: Table 9
    kind: table
    file: assets/zhan-2026-stable-language-guidance-for-vision/tab09.png
    raw: raw/papers/zhan-2026-stable-language-guidance-for-vision-figures/tab09.png
    caption: "지시문을 빈 문자열로 바꾼 blank 조건의 suite별 성공률표"
    page: 14
    bbox_norm: [0.1885, 0.7617, 0.8148, 0.9087]
    strategy: table-region
    curated: false
  - id: tab10
    label: Table 10
    kind: table
    file: assets/zhan-2026-stable-language-guidance-for-vision/tab10.png
    raw: raw/papers/zhan-2026-stable-language-guidance-for-vision-figures/tab10.png
    caption: "모든 지시문을 do something 한 문장으로 바꾼 simple-word 조건의 suite별 성공률표"
    page: 15
    bbox_norm: [0.1885, 0.1738, 0.8148, 0.3207]
    strategy: table-region
    curated: false
  - id: tab11
    label: Table 11
    kind: table
    file: assets/zhan-2026-stable-language-guidance-for-vision/tab11.png
    raw: raw/papers/zhan-2026-stable-language-guidance-for-vision-figures/tab11.png
    caption: "단어를 쉬운 대체어로 바꿔 쓴 multi-word 조건의 suite별 성공률표"
    page: 15
    bbox_norm: [0.1885, 0.4548, 0.8148, 0.6017]
    strategy: table-region
    curated: false
  - id: tab12
    label: Table 12
    kind: table
    file: assets/zhan-2026-stable-language-guidance-for-vision/tab12.png
    raw: raw/papers/zhan-2026-stable-language-guidance-for-vision-figures/tab12.png
    caption: "단어 순서를 무작위로 섞은 random-lang 조건의 suite별 성공률표"
    page: 15
    bbox_norm: [0.1885, 0.7359, 0.8148, 0.8828]
    strategy: table-region
    curated: false
  - id: tab13
    label: Table 13
    kind: table
    file: assets/zhan-2026-stable-language-guidance-for-vision/tab13.png
    raw: raw/papers/zhan-2026-stable-language-guidance-for-vision-figures/tab13.png
    caption: "단어마다 0.2, 0.4, 0.6, 0.8 확률로 MASK 토큰을 씌운 random-mask 조건의 suite별 성공률표"
    page: 16
    bbox_norm: [0.1885, 0.2727, 0.8148, 0.7981]
    strategy: table-region
    curated: false
  - id: tab14
    label: Table 14
    kind: table
    file: assets/zhan-2026-stable-language-guidance-for-vision/tab14.png
    raw: raw/papers/zhan-2026-stable-language-guidance-for-vision-figures/tab14.png
    caption: "steering coefficient ablation 표. denoising step을 10으로 고정하고 π0는 1.25부터 3.0까지, π0.5는 1.05부터 3.0까지 바꿔 9개 조건 성공률을 잰다"
    page: 17
    bbox_norm: [0.1315, 0.1693, 0.872, 0.4079]
    strategy: table-region
    curated: false
  - id: tab15
    label: Table 15
    kind: table
    file: assets/zhan-2026-stable-language-guidance-for-vision/tab15.png
    raw: raw/papers/zhan-2026-stable-language-guidance-for-vision-figures/tab15.png
    caption: "π0의 denoising step을 5, 10, 15로 바꾼 ablation 표. steering coefficient는 1.5로 고정했다"
    page: 17
    bbox_norm: [0.1315, 0.5473, 0.872, 0.6334]
    strategy: table-region
    curated: false
  - id: tab16
    label: Table 16
    kind: table
    file: assets/zhan-2026-stable-language-guidance-for-vision/tab16.png
    raw: raw/papers/zhan-2026-stable-language-guidance-for-vision-figures/tab16.png
    caption: "π0.5의 denoising step을 5, 15, 20으로 바꾼 ablation 표. steering coefficient는 1.25로 고정했다"
    page: 17
    bbox_norm: [0.1315, 0.787, 0.872, 0.8731]
    strategy: table-region
    curated: false
---

## 한 줄 요약 (One-line Summary)

VLA가 지시문 표현이 조금만 바뀌어도 성공률이 크게 떨어지는 원인을 시각 신호가 언어 신호를 압도하는 modality collapse로 진단하고, 학습 시 LLM으로 지시문을 촘촘히 바꿔 쓰는 Monte Carlo Syntactic Integration(MCSI)과 추론 시 언어 없는 forward 결과를 빼서 언어의 순수 기여만 키우는 Residual Affordance Steering(RAS)을 묶은 Residual Semantic Steering(RSS)을 제안한다. π0와 π0.5에 적용해 LIBERO 기반 지시문 교란 벤치마크와 LIBERO-Plus에서 성공률을 올렸다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 제목 | Stable Language Guidance for Vision-Language-Action Models |
| 저자 | Zhihao Zhan 외 7인, 교신저자 Guangrun Wang |
| 소속 | Sun Yat-sen University, Guangdong Key Lab of Big Data Analysis and Processing, X-Era AI Lab |
| arXiv | 2601.04052 (v2, 2026년 4월 20일, cs.RO) |
| 코드 | github.com/Doo-mon/RSS |
| baseline 모델 | π0, π0.5 (Gemma 기반 VLM backbone, Open X-Embodiment pre-training 가중치) |
| 평가 환경 | LIBERO 시뮬레이터 4개 suite와 이를 확장한 지시문 교란 변형, LIBERO-Plus |
| 분량 | 본문 9쪽, 부록 포함 23쪽 |

## 2. 주요 기여 (Key Contributions)

- **문제 진단**: VLA의 지시문 취약성을 두 원인으로 나눈다. 학습 데이터가 같은 의도를 표현하는 문장 분포의 극히 일부만 덮는 manifold sparsity와, 고주파 시각 신호가 gradient를 지배해 지시문과 무관하게 "가장 가까운 물체를 잡는다" 같은 visual affordance prior에 기대는 prior dominance다.
- **Monte Carlo Syntactic Integration(MCSI)**: 원래 지시문을 seed로 삼아 Oracle Teacher(LLM 또는 VLM)가 같은 의도의 문장 K개를 만들고, 그 평균 손실(Expected Semantic Loss)을 최소화한다. 문장 표현이라는 잡음 변수를 marginalize해 진짜 의도에 대한 policy를 근사하려는 학습 전략이다.
- **Residual Affordance Steering(RAS)**: 지시문을 비운 forward 결과를 시각만으로 정해지는 Base Affordance Distribution으로 해석하고, 지시문을 준 결과에서 이를 뺀 잔차(Pure Semantic Signal)를 steering coefficient γ로 증폭한다. 형식은 classifier-free guidance와 같지만, 저자들은 생성 품질을 올리는 장치가 아니라 시각 편향을 억누르는 Bias Suppressor로 위치를 정한다.
- **이론 분석**: logit을 시각 항과 언어 항의 선형 결합으로 근사하면 잔차에서 시각 항이 상쇄되고, γ배만큼 언어 항의 signal-to-noise ratio가 커진다는 Proposition 1과 증명을 부록에 둔다.
- **평가 설계**: LIBERO 지시문을 세 범주로 교란하는 벤치마크(destructive instruction overwriting, obfuscated instruction reinterpretation, out-of-distribution semantic transfer)를 구성하고 π0와 π0.5에 RAS, MCSI, 둘의 결합을 적용해 비교한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 문제 설정

이상적인 policy는 observation o와 잠재 의도 z를 받는 π(a|o, z)다. 실제로는 z를 표현한 지시문 l ~ p(l|z)만 주어지므로 기존 VLA는 π(a|o, l)을 학습한다. 저자들은 이때 같은 의도를 가진 두 지시문 l_i와 l_j에 대해 π(a|o, l_i)와 π(a|o, l_j)가 크게 달라지는 퇴화된 mapping이 학습된다고 본다. LIBERO-Plus와 RADAR 분석이 보고한 instruction blindness(지시문을 거의 무시하고 장면만으로 가장 그럴듯한 action을 내는 현상)와, LIBERO-Pro가 보고한 학습 템플릿 암기(rote pattern execution)를 근거로 든다.

VLA 학습 목표는 시연 데이터(demonstration) D에서 action chunk a_{t:t+H}의 log-likelihood를 최대화하는 것이다. observation은 여러 카메라 이미지와 관절 상태를 담은 proprioceptive state로 구성된다. RSS의 목표는 언어 잡음 ε_l에 대해 π(a|o, l) ≈ π(a|o, l+ε_l)이 성립하게 만드는 것이다.

### 3.2 Monte Carlo Syntactic Integration

진짜 의도에 대한 policy는 문장 표현을 적분해 없앤 p(a|o, z) = ∫ p(a|o, l) p(l|z) dl이다. 이 적분은 계산할 수 없으므로 Monte Carlo 근사를 쓴다.

1. 원래 지시문 l_orig를 seed로 삼는다.
2. Oracle Teacher가 같은 의도의 이웃 문장 집합 N(l_orig) = {l_1, ..., l_K}를 만든다. 이는 유도 분포 p̂(l|z)에서 표본을 뽑는 것에 해당한다.
3. Expected Semantic Loss L_RSS = E_(o,a)~D [ (1/K) Σ_k −log π_θ(a|o, l_k) ]를 최소화한다.

이 목표는 서로 다른 문장을 임베딩 공간의 한 영역으로 모으게 해, 문장 변화에 대한 조건부 엔트로피 H(A|L)를 줄인다. 예를 들어 "사과 잡기"라는 의도는 "Pick up the red fruit", "Fetch the apple", "Grab it"으로 표현될 수 있는데, 한 문장으로만 학습하면 fruit와 apple 같은 단어 선택 자체를 핵심 신호로 오해한다는 것이 저자들의 설명이다.

Figure 2에 따르면 teacher가 만드는 dense syntactic neighborhood는 세 종류다.

| 종류 | 내용 | 예시 (서랍 열고 그릇 넣기) |
|---|---|---|
| Spatial layout | 장면 배치 서술 | 테이블 위에 병, 그릇, 접시, 작은 상자, 서랍 달린 검은 cabinet이 있고 cabinet은 오른쪽에 있다 |
| Subtask | 단계 분해 | 그리퍼를 그릇으로 옮긴다, 위 서랍을 연다, 그릇을 열린 서랍에 넣는다 |
| Rewrite | 같은 의도의 바꿔 쓰기 | 위 서랍을 끝까지 연 뒤 그릇을 안쪽으로 옮긴다 |

입력 지시문은 Task, Spatial, Subtask 필드로 구성돼 pre-trained VLM에 들어간다.

### 3.3 Residual Affordance Steering

action의 logit score s(a|o, l)을 두 성분으로 나눈다.

| 성분 | 정의 | 의미 |
|---|---|---|
| Affordance Prior | s(a\|o, ∅) | 지시문 없이 장면 기하만으로 가능한 action의 점수 |
| Semantic Modulation | s(a\|o, l) − s(a\|o, ∅) = Δ_sem | 지시문이 만든 순수한 변화량 |

저자들은 언어 신호가 약하거나 시각 feature가 강할 때 s(a|o, l) ≈ s(a|o, ∅)가 된다고 관찰한다. 잔차 Δ_sem은 이 시각 편향을 상쇄한다. 예를 들어 로봇이 빨간 컵이 가깝다는 이유만으로 잡으려 하면 s(a_red|o, ∅)가 높게 나오고, 잔차에서는 이 몫이 빠져 지시문의 기여만 남는다.

최종 Steered Policy는 π̃(a|o, l) ∝ exp(s(a|o, ∅) + γ × Δ_sem(a, o, l))이며 γ > 1이 steering coefficient다. Figure 2의 Overview에서는 action expert가 blank input과 dense input을 각각 처리한 두 출력을 합쳐 steered policy를 만들고, 그 결과가 ΔT, ΔR, Grip으로 이뤄진 action chunk로 실행된다.

CFG와의 차이에 대해 저자들은 개념적 위치를 강조한다. diffusion의 CFG는 다양성을 줄이고 충실도를 올리는 quality booster인 반면, RAS는 null-text pass로 로봇의 "시각 본능"을 명시적으로 모델링하고 지시문이 뒷받침하지 않는 action에 불이익을 준다.

### 3.4 이론 분석 (Proposition 1, 부록 A)

- 가정: logit을 S(a|o, l) = W_vᵀφ(o) + W_lᵀψ(l) + ε로 선형 근사한다. φ와 ψ는 d차원 시각, 언어 임베딩이고 ε는 무시할 수 있는 고차 상호작용 항이다.
- Assumption 1 (Visual Dominance): 학습 gradient가 시각 신호에 지배돼 ‖W_v‖ ≫ ‖W_l‖이다.
- Assumption 2 (Null-Text Baseline): 지시문을 비우면 ψ(∅) ≈ 0이라 S(a|o, ∅) ≈ W_vᵀφ(o)다.
- 유도: Δ_sem = W_lᵀψ(l)이 되어 시각 항이 상쇄되고, S̃(a) = W_vᵀφ(o) + γW_lᵀψ(l)이다.
- SNR: 표준 추론의 SNR_std = |W_lᵀψ(l)| / |W_vᵀφ(o)|는 0에 가깝고, RSS의 SNR_rss = γ × SNR_std다. 즉 γ를 키우면 시각 affordance 지형을 바꾸지 않고 언어 가중치를 W̃_l = γW_l로 키운 효과가 난다.

### 3.5 학습 설정

| 항목 | 값 |
|---|---|
| baseline | π0, π0.5 (VLM backbone Gemma, Open X-Embodiment 기반 pre-training 가중치에서 fine-tuning) |
| 학습용 teacher | Qwen2.5-VL |
| 평가용 지시문 재작성 | ChatGPT-5.2 |
| 학습 step | 3만 step, batch size 32 |
| learning rate | CosineDecaySchedule, warm-up 1만 step, peak 5×10⁻⁵, final 5×10⁻⁵ |
| EMA | decay 0.999 |
| 추론 하드웨어 | NVIDIA RTX 3090 1장 (server 측 평가와 배포) |

### 3.6 평가 벤치마크 구성

LIBERO의 4개 suite(Spatial, Object, Goal, 10)를 바탕으로 지시문 교란 변형을 세 범주로 만든다.

| 범주 | 변형 | 내용 |
|---|---|---|
| Destructive instruction overwriting | Blank | 지시문을 빈 문자열로 바꾼다 |
| | Simple | 모든 지시문을 "Do something" 같은 무의미한 문장으로 바꾼다 |
| | Multi | LLM이 만든 여러 바꿔 쓰기 중 하나를 평가 때 무작위로 고른다 |
| | Rand | 단어 순서를 무작위로 섞는다 (어휘는 유지) |
| | Mask (M2, M4, M6, M8) | 단어마다 0.2, 0.4, 0.6, 0.8 확률로 MASK 토큰을 씌운다 |
| Obfuscated instruction reinterpretation (LIBERO-Goal) | R0 Multiword Substitution | 가벼운 동의어, 구 치환 |
| | R1 Distraction | 과제와 무관한 대화체 맥락 추가 |
| | R2 Common Sense | 물체 이름을 상식 기반 기능 설명으로 대체 |
| | R3 Reasoning Chain | 순서, 조건, 최종 상태 제약을 강조하도록 재구성 |
| | R4 Confusion | 부정 표현으로 distractor 물체를 명시 |
| Out-of-distribution semantic transfer (LIBERO-Goal) | 두 과제 제외 | 물체는 다른 과제에 남기고 물체와 목표 조합만 학습에서 뺀다 |

Table 3의 예시로 "Put the wine bottle on top of the cabinet"은 R2에서 "포도 음료를 따르는 데 쓰는 밀봉 용기를 서 있는 수납 가구의 윗면에 놓아라", R4에서 "서랍이 열려 있든 닫혀 있든 와인병을 cabinet 위에 놓아라"로 바뀐다. 평가용 변형은 ChatGPT-5.2가 만들고, 부록 F(Figure 8~11)에 변형별 prompt와 10개씩의 출력이 실려 있다.

OOD 설정은 남은 데이터로 baseline을 6,000 step(전체 학습의 약 20%) fine-tuning한 뒤, 빠진 두 과제의 소수 시연 데이터로 10, 100, 1000 step 적응시키는 few-step adaptation으로 평가한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 Destructive instruction overwriting (Table 1, 성공률 %)

| 모델 | Origin | Multi | Blank | Rand | M2 | M4 | M6 | M8 | Simple | 평균 |
|---|---|---|---|---|---|---|---|---|---|---|
| π0 base | 94.15 | 91.30 | 25.20 | 89.35 | 72.65 | 42.50 | 22.15 | 7.80 | 26.25 | 52.37 |
| π0 + RAS | 90.65 | 89.90 | 63.40 | 88.70 | 78.45 | 55.05 | 33.55 | 17.95 | 62.50 | 64.46 (+12.09) |
| π0 + MCSI | 94.55 | 93.45 | 41.85 | 92.95 | 88.85 | 77.75 | 63.85 | 52.80 | 39.85 | 71.77 (+19.40) |
| π0 + RAS & MCSI | 93.35 | 91.35 | 69.65 | 94.95 | 92.05 | 85.85 | 77.95 | 69.90 | 64.90 | 82.22 (+29.85) |
| π0.5 base | 95.15 | 95.45 | 50.05 | 95.20 | 92.65 | 82.70 | 69.55 | 55.45 | 46.90 | 75.90 |
| π0.5 + RAS | 96.65 | 96.80 | 70.50 | 95.95 | 93.90 | 86.65 | 79.30 | 71.05 | 69.10 | 84.43 (+8.53) |
| π0.5 + MCSI | 98.25 | 98.00 | 46.20 | 97.45 | 96.05 | 87.20 | 73.40 | 57.95 | 46.20 | 77.86 (+1.96) |
| π0.5 + RAS & MCSI | 96.60 | 97.50 | 70.25 | 97.45 | 96.35 | 92.00 | 84.55 | 77.50 | 70.60 | 86.98 (+11.08) |

- Blank, Simple, 높은 비율의 Mask에서 baseline 성공률이 크게 하락한다. π0 base는 M8에서 7.80%다.
- RAS는 지시문 정보가 사라진 Blank와 Simple에서 기여가 크다 (π0 Blank 25.20% → 63.40%, Simple 26.25% → 62.50%). 반면 Origin에서는 π0 성공률이 94.15%에서 90.65%로 소폭 낮아진다.
- MCSI는 Mask 조건에서 기여가 크다 (π0 M8 7.80% → 52.80%). 그러나 Blank와 Simple에서는 RAS만큼 오르지 않고, π0.5에서는 오히려 Blank가 50.05%에서 46.20%로 낮아진다.
- 둘을 합친 구성이 두 baseline 모두에서 평균 1위다.

suite별 세부(부록 Table 9, 10)를 보면 Blank와 Simple의 상승은 Spatial, Object, Long suite에서 나오고 LIBERO-Goal은 모든 구성이 15% 이하에 머문다. 예를 들어 π0 + RAS & MCSI의 Blank는 Spatial 88.0%, Object 98.8%, Goal 9.8%, Long 82.0%다. Goal suite는 같은 장면에서 목표만 다른 과제가 섞여 있어, 지시문 없이는 의도를 정할 근거가 없기 때문으로 해석할 수 있다.

### 4.2 Obfuscated instruction reinterpretation (Table 2, LIBERO-Goal, 성공률 %)

| 모델 | R0 | R1 | R2 | R3 | R4 | 평균 |
|---|---|---|---|---|---|---|
| π0 base | 91.4 | 55.8 | 7.4 | 28.4 | 42.4 | 45.08 |
| π0 + RAS | 90.0 | 59.0 | 11.4 | 40.2 | 46.0 | 49.32 (+4.24) |
| π0 + MCSI | 92.6 | 83.6 | 28.0 | 71.2 | 58.6 | 66.80 (+21.72) |
| π0 + RAS & MCSI | 88.4 | 85.4 | 26.8 | 80.0 | 47.0 | 65.52 (+20.44) |
| π0.5 base | 95.0 | 93.2 | 30.4 | 90.6 | 68.6 | 75.56 |
| π0.5 + RAS | 97.0 | 94.6 | 26.4 | 86.4 | 77.6 | 76.40 (+0.84) |
| π0.5 + MCSI | 97.0 | 94.6 | 31.4 | 84.4 | 70.6 | 75.60 (+0.04) |
| π0.5 + RAS & MCSI | 97.6 | 97.2 | 30.2 | 89.4 | 79.0 | 78.68 (+3.12) |

- R0(가벼운 치환)은 거의 영향이 없다.
- R1과 R2에서 성능이 더 크게 하락하며, R2(상식 기반 서술)는 모든 구성이 31.4% 이하로 가장 어렵다.
- 저자들은 R3와 R4를 진짜 language grounding의 지표로 본다. π0에서 MCSI는 R3를 28.4%에서 71.2%로 올린다.
- π0에서는 MCSI 단독(66.80%)이 결합(65.52%)보다 근소하게 높아, 본문의 "결합이 가장 높다"는 서술은 π0.5에만 해당한다.

### 4.3 Out-of-distribution semantic transfer (Table 4, π0.5, 성공률 %)

| 모델 | 10 step | 100 step | 1000 step | 평균 |
|---|---|---|---|---|
| base | 27.0 | 31.0 | 91.0 | 49.67 |
| + RAS | 17.0 | 29.0 | 98.0 | 48.00 |
| + MCSI | 28.0 | 42.0 | 97.0 | 55.67 |
| + RAS & MCSI | 31.0 | 31.0 | 97.0 | 53.00 |

baseline의 100 step, 1000 step 성공률은 두 과제 중 하나에 과적합해 얻은 값이며 다른 과제는 계속 실패한다고 저자들은 보고한다. RSS는 두 과제를 모두 성공시킨다. 이 범주에서는 MCSI 단독이 가장 효과적이고, RAS 단독은 10 step에서 27.0%를 17.0%로 낮춘다.

### 4.4 Ablation (Figure 4, 부록 Table 14~16)

steering coefficient(denoising step 10 고정, 평균 성공률 %):

| γ | π0 + RAS | π0.5 + RAS |
|---|---|---|
| 1.05 | | 84.28 |
| 1.1 | | 84.22 |
| 1.2 | | 84.41 |
| 1.25 | 67.35 | 84.77 |
| 1.5 | 64.46 | 84.43 |
| 1.75 | | 84.11 |
| 2.0 | 60.20 | 83.65 |
| 3.0 | 51.08 | 82.29 |

- 적당한 γ는 강건성을 올리지만 지나치게 큰 γ는 손상된 지시문에 대한 민감도를 키운다. π0는 γ = 3.0에서 M8 성공률이 1.90%까지 내려간다.
- π0.5는 γ에 덜 민감하다. 저자들은 기본 language grounding이 강한 모델일수록 추론 시 하이퍼파라미터에 덜 민감하다고 해석한다.

denoising step(평균 성공률 %):

| step | π0 (γ = 1.5) | π0.5 (γ = 1.25) |
|---|---|---|
| 5 | 66.59 | 84.47 |
| 10 | 64.46 | |
| 15 | 63.57 | 84.37 |
| 20 | | 84.32 |

step을 늘려도 평균은 오르지 않고 소폭 낮아진다. 저자들은 추가 denoising이 저수준 action 세부만 다듬고 의미 측면 이득은 주지 않는다고 본다. 최적 구성은 적당한 γ와 적당한 step 수의 절충이다.

### 4.5 teacher VLM 일반화 (Table 5, 6, π0.5)

재학습 없이 다른 VLM이 바꿔 쓴 지시문(R1~R4)으로 평가한 결과:

| 재작성 VLM | base 평균 (drift) | + MCSI 평균 (drift) | + RAS & MCSI 평균 (drift) |
|---|---|---|---|
| ChatGPT-5.2 | 70.70 (0) | 70.25 (0) | 73.95 (0) |
| DeepSeek-R1 | 63.25 (−10.54%) | 69.35 (−1.28%) | 70.85 (−4.19%) |
| Qwen3.5 | 67.10 (−5.10%) | 69.05 (−1.71%) | 75.00 (+1.41%) |

MCSI 학습용 지시문 생성 VLM을 바꾼 결과(R1~R4 평균 성공률 %): Qwen2.5-VL 73.95, InternVL3 75.75 (+2.43%), LLaVA-OneVision 73.55 (−0.54%). drift는 상대 변화율로 표기돼 있다. 저자들은 MCSI가 특정 teacher의 문체가 아니라 과제의 의미에 일반화한다고 결론짓는다.

### 4.6 LIBERO-Plus (부록 Table 7, 재학습 없음, 성공률 %)

| 모델 | Camera | Robot | Language | Light | Background | Noise | Layout | 평균 |
|---|---|---|---|---|---|---|---|---|
| OpenVLA | 0.8 | 3.5 | 23.0 | 8.1 | 34.8 | 15.2 | 28.5 | 15.6 |
| π0 | 13.8 | 6.0 | 58.8 | 85.0 | 81.4 | 79.0 | 68.9 | 53.6 |
| π0-FAST | 65.1 | 21.6 | 61.0 | 73.2 | 73.2 | 74.4 | 68.8 | 61.6 |
| OpenVLA-OFT | 56.4 | 31.9 | 79.5 | 88.7 | 93.3 | 75.8 | 74.2 | 69.6 |
| OpenVLA-OFT (plus) | 92.8 | 30.3 | 85.8 | 94.9 | 93.9 | 89.3 | 77.6 | 79.6 |
| π0.5 | 64.8 | 71.8 | 83.0 | 93.5 | 92.2 | 78.8 | 85.5 | 81.4 |
| π0.5 + RAS | 76.0 | 74.0 | 88.0 | 97.0 | 96.0 | 83.0 | 86.0 | 86.0 (+4.6) |
| π0.5 + MCSI | 86.0 | 83.0 | 83.0 | 97.0 | 98.0 | 92.0 | 87.0 | 90.0 (+8.6) |
| π0.5 + RAS & MCSI | 81.0 | 88.0 | 90.0 | 97.0 | 96.0 | 90.0 | 86.0 | 90.0 (+8.6) |

표에는 이 밖에 WorldVLA(25.0), NORA(39.0), UniVLA(43.9), OpenVLA-OFT (w)(55.8), OpenVLA-OFT (m)(67.9), RIPT-VLA(68.4)가 실려 있다. 언어 항목뿐 아니라 시각 교란 항목에서도 성공률이 올라, 저자들은 의미 통합이 시각 도메인 변화에 대한 민감도를 높이지 않는다고 해석한다.

### 4.7 원래 지시문 성능과 학습 곡선

원래 지시문 LIBERO 평균(부록 Table 8): π0 94.15%, π0 + RAS 90.65%, π0 + MCSI 94.55%, π0 + RAS & MCSI 93.35%, π0.5 95.15%, π0.5 + RAS 96.65%, π0.5 + MCSI 98.25%, π0.5 + RAS & MCSI 96.60%. 비교 대상으로 Diffusion Policy 72.40%, MDT 76.10%, OpenVLA 76.50%, Octo 75.10%, Dita 82.40%, TraceVLA 74.80%, SpatialVLA 78.10%, π0-FAST 85.50%가 실려 있다. 즉 π0에서 RAS는 교란 없는 조건의 성공률을 3.5%p 낮춘다.

Figure 5의 학습 loss는 모든 구성에서 초반에 빠르게 내려간 뒤 안정되고, RAS와 MCSI를 적용한 변형이 대응 baseline보다 낮은 loss를 보인다.

### 4.8 정성 분석 (부록 E, Figure 6, 7)

와인병을 cabinet 위에 올리는 과제를 지시문 일부를 비운 조건으로 실행하면 base는 와인병 위치를 찾지 못하거나 cabinet 윗면과 맞추지 못해 불안정한 grasp나 조기 종료로 실패한다. MCSI 단독은 문장 변화에는 강하지만 핵심 의미가 사라지면 의도를 되살리지 못한다. RAS는 과제와 관련된 물체와 목표 배치 쪽으로 policy를 이끌어 성공하며, 둘의 결합이 가장 안정적이다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **모호한 지시문에서의 보수적 동작**: RAS는 Base Affordance Distribution을 억누르므로 "do something" 같은 지시문에서 머뭇거리거나 움직이지 않을 수 있다. 저자들은 이를 시각 prior만으로 action을 지어내는 "자동 조종" 행동을 막는 안전 측면 이점으로도 해석한다. 다만 Table 1에서는 RAS가 Simple 조건 성공률을 크게 올리고 있어, 한계 절의 서술과 실험 결과 사이에 긴장이 있다.
- **교란 없는 조건의 손실**: π0에서 RAS는 원래 지시문 성공률을 94.15%에서 90.65%로 낮춘다. Table 8의 suite별 값에서도 π0 + RAS는 Spatial 91.4%, Goal 92.2%로 base보다 낮다.
- **LIBERO-Goal 한계**: Blank와 Simple 조건에서 Goal suite는 어떤 구성도 15%를 넘지 못한다. RAS가 올리는 성공률은 장면마다 과제가 사실상 하나인 suite에 집중된다.
- **효과의 비일관성**: π0.5에서 MCSI는 Blank와 Simple을 낮추고, OOD에서 RAS는 10 step 성공률을 낮춘다. 구성별 기여가 조건마다 달라 결합 구성이 항상 최선은 아니다.
- **이론의 강한 가정**: Proposition 1은 logit의 선형 분해와 ψ(∅) ≈ 0을 가정한다. flow matching action expert에서 "logit"이 무엇에 대응하는지 본문은 명시하지 않는다.
- **평가 범위**: 실험은 LIBERO 시뮬레이터와 LIBERO-Plus에 한정되고 실제 로봇 실험은 없다. LIBERO-Plus 결과는 최종본에 넣겠다고 적혀 있어 v2 시점에는 부록 결과다.
- **추론 비용**: RAS는 지시문을 준 forward와 비운 forward를 함께 계산해야 하지만 지연이나 연산량 증가는 보고하지 않는다.

## 6. 관련 연구 (Related Work)

| 계열 | 자료 | 이 논문과의 관계 |
|---|---|---|
| 초기 대규모 VLA | RT-1, RT-2, OpenVLA | VLA 계보의 출발점 |
| autoregressive VLA 변형 | SpatialVLA, OpenVLA-OFT, π0-FAST, CoT-VLA, GR-1 | 3D 단서, 연속 action tuning, 학습 효율, 추론 결합 |
| diffusion, flow matching 계열 | Diffusion Policy, CogACT, RDT, π0, π0.5, E0 | RSS가 적용된 baseline 계열 (π0, π0.5) |
| dual-system | OneTwoVLA, GR00T N1 | 일반화를 위한 구조 분리 |
| 모달리티 불균형 진단 | LIBERO-Plus, LIBERO-Pro, RADAR | instruction blindness와 rote execution 근거 |
| 구조적 해법 | RDT-1B | 이미지와 텍스트 토큰을 번갈아 cross-attention으로 주입해 언어 gradient 크기를 보존 |
| guidance | Classifier-Free Guidance (Ho and Salimans 2022) | RAS의 수식 형식 원형 |
| 같은 그룹 후속 | TAG (Zhou 2026) | target-agnostic guidance로 object-centric 추론 안정화 |

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| Residual Semantic Steering (RSS) | MCSI와 RAS를 묶은 이 논문의 전체 프레임워크 |
| Monte Carlo Syntactic Integration (MCSI) | teacher가 만든 같은 의도의 문장 K개에 대한 평균 손실로 학습해 문장 표현을 marginalize하는 학습 전략 |
| Residual Affordance Steering (RAS) | 지시문 있는 logit에서 지시문 없는 logit을 뺀 잔차를 γ배 증폭하는 추론 기법 |
| modality collapse | 강한 시각 prior가 드문 언어 신호를 압도해 policy가 지시문 의미를 무시하는 현상 |
| instruction blindness | VLA가 지시문을 거의 무시하고 장면만으로 가장 그럴듯한 action을 내는 현상 (LIBERO-Plus, RADAR 보고) |
| manifold sparsity | 학습 데이터가 같은 의도를 표현하는 문장 분포의 극히 일부만 덮는 상태 |
| prior dominance | 고주파 시각 신호가 gradient를 지배해 visual affordance prior에 기대는 상태 |
| Base Affordance Distribution | 지시문을 비운 forward가 내는 action 분포. 장면에서 물리적으로 가능한 action을 나타낸다 |
| Pure Semantic Signal (Δ_sem) | s(a\|o, l) − s(a\|o, ∅). 지시문이 action 점수에 준 인과적 기여 |
| steering coefficient (γ) | Δ_sem의 증폭 배율. γ > 1 |
| Oracle Teacher | 지시문 이웃 문장을 생성하는 고성능 LLM 또는 VLM (학습 시 Qwen2.5-VL) |
| Expected Semantic Loss | 이웃 문장 K개에 대한 음의 log-likelihood 평균 |
| drift | 기준 재작성 VLM 대비 평균 성공률의 상대 변화율 |

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 1 | "지시문 교란의 세 유형" | caption-region | ★ wiki 권장 (문제 정의) |
| fig02 | 4 | "RSS 전체 구조" | caption-region | ★ wiki 권장 (architecture) |
| fig03 | 6 | "R3 Reasoning Chain 지시문으로 서랍을 열고 그릇을 넣는 과제를 실행한 rollout 비교" | manual | ★ wiki 권장 (정성 결과) |
| fig04 | 8 | "destructive instruction overwriting에서 steering coefficient와 denoising step 수에 따른 성공률 막대그래프" | caption-region | ★ wiki 권장 (ablation) |
| fig05 | 8 | "3만 step 학습 동안의 loss 곡선" | manual | (부록, 아카이브 유지) |
| fig06 | 19 | "π0.5에서 지시문을 비운 blank 조건으로 와인병을 cabinet 위에 올리는 과제를 실행한 rollout" | caption-region | (부록, 아카이브 유지) |
| fig07 | 19 | "같은 blank 조건과 같은 과제를 π0로 실행한 rollout" | caption-region | (부록, 아카이브 유지) |
| fig08 | 20 | "R1 Distraction 지시문 생성 예시" | caption-region | (부록, 아카이브 유지) |
| fig09 | 21 | "R2 Common Sense 지시문 생성 예시" | caption-region | (부록, 아카이브 유지) |
| fig10 | 22 | "R3 Reasoning Chain 지시문 생성 예시" | caption-region | (부록, 아카이브 유지) |
| fig11 | 23 | "R4 Confusion 지시문 생성 예시" | caption-region | (부록, 아카이브 유지) |
| tab01 | 5 | "Destructive Instruction Overwriting 결과표" | table-region | ★ wiki 권장 (result) |
| tab02 | 5 | "Obfuscated instruction reinterpretation 결과표" | manual | ★ wiki 권장 (result) |
| tab03 | 6 | "LIBERO-Goal의 와인병을 cabinet 위에 올리는 지시문을 R0부터 R4까지 다섯 방식으로 바꾼 예시표" | table-region | (부록, 아카이브 유지) |
| tab04 | 6 | "OOD semantic transfer 결과표" | manual | ★ wiki 권장 (result) |
| tab05 | 9 | "학습에 쓰지 않은 VLM이 바꿔 쓴 지시문에서의 성공률표" | table-region | ★ wiki 권장 (일반화) |
| tab06 | 9 | "MCSI 학습용 지시문 생성 VLM을 Qwen2.5-VL, InternVL3, LLaVA-OneVision으로 바꾼 결과표" | manual | (부록, 아카이브 유지) |
| tab07 | 14 | "LIBERO-Plus의 Camera, Robot, Language, Light, Background, Noise, Layout 7개 교란 항목 성공률 비교표" | table-region | ★ wiki 권장 (외부 벤치마크) |
| tab08 | 14 | "원래 지시문으로 LIBERO 4개 suite를 평가한 성공률표" | table-region | (부록, 아카이브 유지) |
| tab09 | 14 | "지시문을 빈 문자열로 바꾼 blank 조건의 suite별 성공률표" | table-region | (부록, 아카이브 유지) |
| tab10 | 15 | "모든 지시문을 do something 한 문장으로 바꾼 simple-word 조건의 suite별 성공률표" | table-region | (부록, 아카이브 유지) |
| tab11 | 15 | "단어를 쉬운 대체어로 바꿔 쓴 multi-word 조건의 suite별 성공률표" | table-region | (부록, 아카이브 유지) |
| tab12 | 15 | "단어 순서를 무작위로 섞은 random-lang 조건의 suite별 성공률표" | table-region | (부록, 아카이브 유지) |
| tab13 | 16 | "단어마다 0.2, 0.4, 0.6, 0.8 확률로 MASK 토큰을 씌운 random-mask 조건의 suite별 성공률표" | table-region | (부록, 아카이브 유지) |
| tab14 | 17 | "steering coefficient ablation 표" | table-region | (부록, 아카이브 유지) |
| tab15 | 17 | "π0의 denoising step을 5, 10, 15로 바꾼 ablation 표" | table-region | (부록, 아카이브 유지) |
| tab16 | 17 | "π0.5의 denoising step을 5, 15, 20으로 바꾼 ablation 표" | table-region | (부록, 아카이브 유지) |
