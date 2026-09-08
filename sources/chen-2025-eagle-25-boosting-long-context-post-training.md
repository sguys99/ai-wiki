---
title: "Eagle 2.5: Boosting Long-Context Post-Training for Frontier Vision-Language Models"
type: paper
year: 2025
category: llms
raw_path: raw/papers/chen-2025-eagle-25-boosting-long-context-post-training.pdf
raw_filename: "chen-2025-eagle-25-boosting-long-context-post-training.pdf"
source_collection: external
authors: "Guo Chen, Zhiqi Li, Shihao Wang, Jindong Jiang, Yicheng Liu, Lidong Lu, De-An Huang, Wonmin Byeon, Matthieu Le, Tuomas Rintamaki, Tyler Poon, Max Ehrlich, Tong Lu, Limin Wang, Bryan Catanzaro, Jan Kautz, Andrew Tao, Zhiding Yu, Guilin Liu"
arxiv_id: "2504.15271"
tags: [vlm, long-context, video-understanding, high-resolution, nvidia, eagle, post-training, qwen25, siglip, video-dataset]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/chen-2025-eagle-25-boosting-long-context-post-training/fig01.png
    raw: raw/papers/chen-2025-eagle-25-boosting-long-context-post-training-figures/fig01.png
    caption: "Video-MME에서 입력 프레임 수를 늘렸을 때의 모델별 성능 곡선. Eagle-2.5-8B만 16프레임에서 512프레임까지 계속 오른다"
    page: 1
    bbox_norm: [0.4741, 0.5295, 0.9053, 0.7601]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/chen-2025-eagle-25-boosting-long-context-post-training/fig02.png
    raw: raw/papers/chen-2025-eagle-25-boosting-long-context-post-training-figures/fig02.png
    caption: "Eagle 2.5 모델 구조. information-first sampling이 고른 시각 입력이 SigLIP-so400M 인코더와 MLP connector를 거쳐 LLM에 들어가고, 텍스트는 그대로 LLM에 들어간다"
    page: 4
    bbox_norm: [0.5349, 0.0929, 0.9021, 0.2351]
    strategy: manual
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/chen-2025-eagle-25-boosting-long-context-post-training/fig03.png
    raw: raw/papers/chen-2025-eagle-25-boosting-long-context-post-training-figures/fig03.png
    caption: "image area preservation 비교. (a) InternVL식 tiling은 2000×1300 이미지의 왼쪽 위 일부만 3×2 타일로 덮고, (b) 면적 우선 tiling은 4×3 타일로 원본 전체를 덮는다"
    page: 4
    bbox_norm: [0.5295, 0.497, 0.9028, 0.6172]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/chen-2025-eagle-25-boosting-long-context-post-training/fig04.png
    raw: raw/papers/chen-2025-eagle-25-boosting-long-context-post-training-figures/fig04.png
    caption: "Open-Data와 Eagle-Video-110K의 영상 길이 분포(로그 스케일). Open-Data는 약 1,500초에서 끝나고 Eagle-Video-110K는 12,000초 근처까지 이어진다"
    page: 7
    bbox_norm: [0.4519, 0.5109, 0.9121, 0.7141]
    strategy: manual
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/chen-2025-eagle-25-boosting-long-context-post-training/fig05.png
    raw: raw/papers/chen-2025-eagle-25-boosting-long-context-post-training-figures/fig05.png
    caption: "Eagle-Video-110K 주석 파이프라인. 왼쪽 bottom-up은 클립마다 GPT-4o로 QA를 만들고 time anchor와 textual context anchor를 붙이며, 오른쪽 top-down은 사람이 나눈 chapter를 caption으로 바꾼 뒤 GPT-4가 story-level QA를 만든다"
    page: 8
    bbox_norm: [0.0941, 0.0944, 0.9053, 0.2429]
    strategy: caption-region
    curated: true
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/chen-2025-eagle-25-boosting-long-context-post-training/fig06.png
    raw: raw/papers/chen-2025-eagle-25-boosting-long-context-post-training-figures/fig06.png
    caption: "post-training 스케줄과 Eagle-Video-110K 유무에 따른 Video-MME 프레임 확장 곡선. 128K 모델은 512프레임까지 오르고, Eagle-Video-110K를 뺀 64K 모델은 256프레임 이후 내려간다"
    page: 11
    bbox_norm: [0.5532, 0.3468, 0.9053, 0.5278]
    strategy: caption-region
    curated: true
  - id: tab01
    label: Table 1
    kind: table
    file: assets/chen-2025-eagle-25-boosting-long-context-post-training/tab01.png
    raw: raw/papers/chen-2025-eagle-25-boosting-long-context-post-training-figures/tab01.png
    caption: "Eagle 2.5가 쓴 영상, 다중 페이지 문서, long text 오픈 데이터셋 목록(Table 1). 크롭에서 마지막 Long Text 행이 잘려 있다"
    page: 7
    bbox_norm: [0.0947, 0.0708, 0.9053, 0.3896]
    strategy: table-region
    curated: false
  - id: tab02
    label: Table 2
    kind: table
    file: assets/chen-2025-eagle-25-boosting-long-context-post-training/tab02.png
    raw: raw/papers/chen-2025-eagle-25-boosting-long-context-post-training-figures/tab02.png
    caption: "영상 벤치마크 비교(Table 2). 값은 본문 마크다운 표로 옮겼다"
    page: 9
    bbox_norm: [0.0947, 0.0708, 0.9053, 0.29]
    strategy: table-region
    curated: false
  - id: tab03
    label: Table 3
    kind: table
    file: assets/chen-2025-eagle-25-boosting-long-context-post-training/tab03.png
    raw: raw/papers/chen-2025-eagle-25-boosting-long-context-post-training-figures/tab03.png
    caption: "이미지 벤치마크 비교(Table 3). 값은 본문 마크다운 표로 옮겼다"
    page: 9
    bbox_norm: [0.0977, 0.3585, 0.9053, 0.5394]
    strategy: table-region
    curated: false
  - id: tab04
    label: Table 4
    kind: table
    file: assets/chen-2025-eagle-25-boosting-long-context-post-training/tab04.png
    raw: raw/papers/chen-2025-eagle-25-boosting-long-context-post-training-figures/tab04.png
    caption: "long-context 데이터가 이미지 벤치마크에 미치는 영향(Table 4). L_max 32K, 64K, 128K 학습 전후 비교"
    page: 10
    bbox_norm: [0.0947, 0.0708, 0.9053, 0.182]
    strategy: table-region
    curated: false
  - id: tab05
    label: Table 5
    kind: table
    file: assets/chen-2025-eagle-25-boosting-long-context-post-training/tab05.png
    raw: raw/papers/chen-2025-eagle-25-boosting-long-context-post-training-figures/tab05.png
    caption: "이미지 데이터와 pre-training이 영상 벤치마크에 미치는 영향(Table 5). 크롭에 오른쪽 Table 6이 함께 들어 있다"
    page: 10
    bbox_norm: [0.0947, 0.208, 0.9045, 0.2855]
    strategy: table-region
    curated: false
  - id: tab06
    label: Table 6
    kind: table
    file: assets/chen-2025-eagle-25-boosting-long-context-post-training/tab06.png
    raw: raw/papers/chen-2025-eagle-25-boosting-long-context-post-training-figures/tab06.png
    caption: "information-first sampling ablation(Table 6). IAP와 ADS를 각각 뺐을 때의 이미지와 영상 벤치마크"
    page: 10
    bbox_norm: [0.5144, 0.208, 0.9045, 0.2855]
    strategy: table-region
    curated: false
  - id: tab07
    label: Table 7
    kind: table
    file: assets/chen-2025-eagle-25-boosting-long-context-post-training/tab07.png
    raw: raw/papers/chen-2025-eagle-25-boosting-long-context-post-training-figures/tab07.png
    caption: "Eagle-Video-110K와 post-training 스케줄이 영상 벤치마크에 미치는 영향(Table 7)"
    page: 11
    bbox_norm: [0.5136, 0.1429, 0.9055, 0.2289]
    strategy: table-region
    curated: false
  - id: tab08
    label: Table 8
    kind: table
    file: assets/chen-2025-eagle-25-boosting-long-context-post-training/tab08.png
    raw: raw/papers/chen-2025-eagle-25-boosting-long-context-post-training-figures/tab08.png
    caption: "progressive post-training 단계별 설정(Table 8). 크롭 위쪽에 본문 한 줄이 함께 들어 있다"
    page: 12
    bbox_norm: [0.0799, 0.6209, 0.9221, 0.8251]
    strategy: manual
    curated: false
  - id: tab09
    label: Table 9
    kind: table
    file: assets/chen-2025-eagle-25-boosting-long-context-post-training/tab09.png
    raw: raw/papers/chen-2025-eagle-25-boosting-long-context-post-training-figures/tab09.png
    caption: "SlideVQA 성능(Table 9). 크롭에 오른쪽 Table 10이 함께 들어 있다"
    page: 13
    bbox_norm: [0.1107, 0.0941, 0.8789, 0.1553]
    strategy: table-region
    curated: false
  - id: tab10
    label: Table 10
    kind: table
    file: assets/chen-2025-eagle-25-boosting-long-context-post-training/tab10.png
    raw: raw/papers/chen-2025-eagle-25-boosting-long-context-post-training-figures/tab10.png
    caption: "MMLongBench-Doc 성능(Table 10)"
    page: 13
    bbox_norm: [0.5322, 0.0941, 0.8789, 0.1553]
    strategy: table-region
    curated: false
  - id: tab11
    label: Table 11
    kind: table
    file: assets/chen-2025-eagle-25-boosting-long-context-post-training/tab11.png
    raw: raw/papers/chen-2025-eagle-25-boosting-long-context-post-training-figures/tab11.png
    caption: "Stage 1.5 추가 pre-training 데이터셋(Table 11b). 크롭이 하위 표 (b)만 담고 (a) SFT 데이터셋 표는 잘려 있다"
    page: 17
    bbox_norm: [0.0982, 0.7231, 0.9028, 0.8136]
    strategy: table-region
    curated: false
  - id: tab12
    label: Table 12
    kind: table
    file: assets/chen-2025-eagle-25-boosting-long-context-post-training/tab12.png
    raw: raw/papers/chen-2025-eagle-25-boosting-long-context-post-training-figures/tab12.png
    caption: "clip-level QA 생성에 쓴 질문 유형 63종의 이름과 설명(Table 12)"
    page: 18
    bbox_norm: [0.0947, 0.0708, 0.9171, 0.8212]
    strategy: table-region
    curated: false
---

## 한 줄 요약 (One-line Summary)

NVIDIA의 long-context VLM Eagle 2.5는 압축 모듈을 새로 붙이지 않고 세 가지 변경만으로 긴 영상과 고해상도 이미지 이해를 끌어올렸다. 텍스트를 먼저 온전히 확보하고 남은 예산으로 시각 입력을 조정하는 information-first sampling(IAP와 ADS), 최대 시퀀스 길이를 32K에서 64K, 128K로 올리는 progressive mixed post-training, 그리고 story-level과 clip-level 주석을 겹쳐 넣은 Eagle-Video-110K다. Eagle2.5-8B는 512프레임 Video-MME에서 72.4를 기록해 GPT-4o(71.9)를 넘고 Qwen2.5-VL-72B(73.3)에 근접하며, 16프레임에서 512프레임까지 프레임을 늘릴수록 성능이 계속 오른다.

## 1. 자료 정보 (Document Information)

- **제목**: Eagle 2.5: Boosting Long-Context Post-Training for Frontier Vision-Language Models
- **저자**: 19명. Guo Chen, Zhiqi Li, Shihao Wang, Jindong Jiang(이상 4명은 NVIDIA 인턴 기간에 수행), Yicheng Liu, Lidong Lu, De-An Huang, Wonmin Byeon, Matthieu Le, Tuomas Rintamaki, Tyler Poon, Max Ehrlich, Tong Lu, Limin Wang, Bryan Catanzaro, Jan Kautz, Andrew Tao, Zhiding Yu, Guilin Liu. Zhiding Yu와 Guilin Liu가 공동 지도와 교신 저자다.
- **소속**: NVIDIA. 추가 소속은 Nanjing University(Guo Chen, Zhiqi Li, Yicheng Liu, Lidong Lu, Tong Lu, Limin Wang), The Hong Kong Polytechnic University(Shihao Wang), Rutgers University(Jindong Jiang)다.
- **발행**: 첫 페이지 날짜 2025년 4월 22일, arXiv:2504.15271v1 [cs.CV] 등록일 2025년 4월 21일. 논문 본문에 게재 학회 표기는 없다. 같은 팀의 저장소 README([[llms/nvlabs-eagle]])는 2025년 9월 NeurIPS 2025 채택을 기록하는데, 이는 저장소 쪽 근거다.
- **구성**: 35페이지. 본문 11페이지(1~11), 부록 A~E 7페이지(12~18), 참고문헌 17페이지(19~35).
- **프로젝트 페이지**: <https://nvlabs.github.io/EAGLE/> (첫 페이지 링크)
- **wiki 내 짝 자료**: [[llms/nvlabs-eagle]]. 같은 팀의 저장소 README로, Eagle 세대 구성과 model zoo, GR00T 채택 이력이 거기에 있다.

## 2. 주요 기여 (Key Contributions)

1. **information-first sampling**: 시각 입력을 고정 해상도와 고정 프레임 수로 뽑던 관행을 뒤집어, 텍스트 토큰을 먼저 온전히 확보하고 남는 예산으로만 시각 입력을 조정한다. image area preservation(IAP)과 automatic degradation sampling(ADS) 두 규칙으로 구성된다.
2. **progressive mixed post-training**: 최대 시퀀스 길이 L_max를 32K, 64K, 128K 순서로 올린다. 같은 데이터로 처음부터 64K를 학습하는 것보다 결과가 낫고, 중간 단계마다 쓸 수 있는 모델 변형이 남는다.
3. **Eagle-Video-110K**: 사람이 붙인 chapter를 구간으로 삼는 top-down story-level 주석과 GPT-4o로 만드는 bottom-up clip-level 주석을 한 데이터셋에 겹쳐 넣었다. 오픈 데이터에 부족한 긴 영상 구간을 채운다.
4. **프레임을 늘릴수록 오르는 성능 곡선**: 압축 모듈 없이도 Video-MME 성능이 16프레임에서 512프레임까지 계속 오른다. 비교 모델인 InternVL-2.5-8B는 48프레임에서, LongViTA-14B는 64프레임 이후 66% 근처에서 정체된다(Figure 1).
5. **long-context 학습 인프라**: Triton fused operator, USP 기반 context parallelism, 영상 디코딩 가속, vLLM 서빙을 한 파이프라인으로 묶었다(부록 B).

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 모델 구성

LLaVA 계보를 그대로 따르는 단순한 구성이다(Figure 2). SigLIP vision 인코더가 만든 임베딩을 MLP projection layer가 LLM 표현 공간에 맞추고, LLM은 Qwen2.5 계열이다. Table 8은 LLM을 Qwen2.5-7B로, 전체 학습 파라미터를 8B로 적는다. 임의 해상도를 다루기 위해 LLaVA-1.5와 InternVL에서 가져온 image tiling을 쓴다. image tiling은 큰 이미지를 448픽셀 정사각 타일 격자로 잘라 각각 인코딩하는 방식이다.

압축이나 선택 모듈을 일부러 넣지 않은 것이 설계 결정이다. 저자들은 긴 입력에만 최적화한 특수 모듈이 범용성을 제한한다고 보고, 대신 학습 전략과 데이터 레시피로 long-context 능력을 확보한다.

인코더 표기는 두 곳이 다르다. Figure 2는 SigLIP-so400M으로 적고 본문은 Zhai 2023(SigLIP)을 인용한다. 반면 저장소 README의 model zoo([[llms/nvlabs-eagle]])는 Eagle2.5-8B의 vision 인코더를 SigLIP2-so400m-patch16-512, LLM을 Qwen2.5-7B-Instruct로 적는다. 논문 본문만으로는 어느 쪽이 공개 체크포인트와 같은지 확정할 수 없다.

### 3.2 image area preservation

기존 tiling은 W×H 이미지를 r_w × r_h 격자의 s×s 타일로 자른다. InternVL처럼 종횡비 제약이 엄격하면 원본을 줄여 격자에 맞춰야 하므로 고해상도를 살리려던 tiling의 목적이 반감된다.

Eagle 2.5는 두 목표를 함께 만족하는 격자를 고른다. 하나는 원본 면적 A_orig = WH의 60% 이상을 타일 면적 A_new = r_w r_h s²에 남기는 것이고, 다른 하나는 타일 비율 r_t = r_w/r_h를 원본 종횡비 r_orig = W/H에 맞추는 것이다. r_w × r_h ≤ N인 후보 중에서 식 (1)을 최대화한다.

```
argmax  min(A_new / A_orig, 0.6) × min(r_t / r_orig, r_orig / r_t)
(r_w,r_h)     [면적 벌점]              [종횡비 정합]
```

앞 항은 A_new가 0.6 A_orig에 못 미칠 때만 벌점을 주고 그 위로는 더 보상하지 않는다. 뒤 항은 r_t = r_orig에서 1이 되고 어느 쪽으로 벗어나든 대칭으로 줄어든다. Figure 3은 2000×1300 이미지에서 InternVL식 tiling (a)가 3×2 타일로 왼쪽 위 일부만 덮는 반면, 면적 우선 tiling (b)는 4×3 타일로 원본 전체를 덮는 모습을 보여 준다.

### 3.3 automatic degradation sampling

시각 입력을 고정 FPS나 고정 개수로 뽑는 기존 방식은 vision-context-centric이라 텍스트가 뒤에서 잘릴 수 있다. ADS는 순서를 뒤집은 all-context-centric 전략이다. 학습 샘플 S = {S_visual, S_text}와 최대 시퀀스 길이 L_max가 주어지면 텍스트 토큰 길이 L_text를 먼저 확정하고, L_visual = L_max − L_text만 시각 예산으로 쓴다. 텍스트는 항상 온전히 남는다.

그 예산 안에서 두 변수를 함께 키우는 제약 최적화를 푼다(식 (2)). 이미지 M장에 대해서는 이미지당 최대 타일 수 t(1 ≤ t ≤ 12)를, 영상이나 다중 페이지 문서 같은 시간축 입력에 대해서는 샘플링 개수 n(1 ≤ n ≤ N_max)을 키운다. 목적 함수는 Σ L(t, I_i) + 256 n이고 제약은 이 값이 L_visual 이하라는 것이다. L(t, I_i)는 최대 타일 수 t에서 i번째 이미지가 차지하는 토큰 수다. 프레임과 페이지에는 tiling을 쓰지 않아 하나당 256 토큰(t = 1일 때의 L 값)으로 고정이고, N_max는 영상이면 2 × duration(초), 문서면 페이지 수다.

학습 샘플은 대개 이미지 아니면 시간축 입력 한쪽에 몰려 있으므로 두 단계로 나눠 푼다.

| 단계 | 내용 |
|---|---|
| temporal degradation | t = 1로 고정한 채 영상은 2 FPS를 목표로, 문서는 전체 페이지 사용을 목표로 샘플링 개수를 정한다. n* = ⌊(L_visual − M)/256⌋. 최소 프레임 수 N_min조차 못 채우면 그 샘플은 버린다 |
| tiling degradation | 프레임 수가 정해지면 T = {12, 8, 6, 4, 2, 1}을 큰 값부터 훑어 Σ L(t, I_i) ≤ L_visual − n* × 256을 만족하는 최대 타일 수 t*를 고른다 |

이 절차는 텍스트를 온전히 보존하면서 남은 예산에 맞춰 시각 해상도를 조정하므로, 고정 샘플링보다 정보 밀도가 높다는 것이 저자들의 설명이다.

### 3.4 post-training 스케줄

두 전략이 층을 이룬다. 기반은 mixed post-training이고, 그 위에 progressive mixed post-training을 올린다.

mixed post-training은 길이가 다양한 입력에서 일정한 성능을 유지하기 위한 방식이다. ADS가 모든 샘플을 L_max에 맞춰 주므로 학습이 프레임 수에 무관해지고, 여기에 length-balanced packing을 결합해 길이 스펙트럼 전체에서 고르게 학습한다. length-balanced packing은 Eagle 2 논문(Authors 2025)의 기법을 인용한 것이다.

progressive mixed post-training은 L_max를 단계적으로 올리는 스케줄이다. L_max가 크면 짧은 시퀀스와 긴 시퀀스의 분포를 한 번에 맞추기가 계산상 무겁고, 한 번의 학습으로 최적 성능을 얻기 어렵다. 그래서 L_max를 32K, 64K, 128K 순서로 올린다. 저자들은 이 방식이 서로 다른 길이에서의 능력을 더 잘 보존하고 중간 단계마다 다양한 모델 변형을 안전하게 남긴다고 설명한다.

### 3.5 데이터 레시피

"diversity first, then quality" 원칙으로 오픈 데이터부터 모은다. 사람이 주석한 COIN, SlideVQA 계열은 그대로 고품질 데이터로 취급하고, GPT-4V/4o, Claude-3, Gemini-1.5 Pro로 자동 주석한 LLaVA-Video 계열 합성 영상 데이터를 더한다. 짧은 컨텍스트 데이터까지 합친 전체를 Open-Data라 부른다. Table 1의 목록은 다음과 같다.

| 범주 | 데이터셋 |
|---|---|
| Video Classification | Kinetics710, Something-Something-v2, ActivityNet, HACS Segment, COIN, HIREST, FineAction, PortraitMode-400 |
| Temporal Action Localization | ActivityNet, HACS Segment, FineAction, Ego4D-MQ, COIN, HIREST, Perception-Test |
| Video Temporal Grounding | Charade-STA, QVHighlight, Ego4D-NLQ, Didemo, QueryD, MedVidQA, Youcook2, FineVideo, ActivityNet, HACS Segment, FineAction, Ego4D-MQ, COIN, HIREST, Perception-Test, EgoExoLearn |
| Dense Video Captioning | ActivityNet, Youcook2, EgoExoLearn, ViTT, HIREST, COIN |
| Temporal Segmentation | Breakfast, ViTT |
| Temporal Reasoning | ActivityNet-RTL |
| General Video QA | TVQA, CLEVRER, NextQA, SportsQA, LLaVA-Video, FineVideo, VideoGPT+, Oops, Perception-Test, EgoTaskQA, CinePile, STAR |
| Multi-Page Document | SlideVQA, DUDE, MP-DocVQA |
| Video Captioning | ActivityNet, Youcook2, Shot2story, Vript, LLaVA-Video, Momentos, FunQA, S-MiT, LLaVA-Hound, Ego4D-HCap, EgoExoLearn |
| Long Text | LongAlign, LongReward |

오픈 데이터에서 부족한 것이 긴 영상이다. Figure 4의 길이 분포에서 Open-Data는 약 1,500초에서 끝나고, Eagle-Video-110K가 12,000초 근처까지 이어지며 그 위 구간을 채운다.

**다양성 기준 수집.** Vidchapters, MiraData, InternVid-10M, Panda-70M, Vript, Shot2story, ViTT, WebVid-10M에서 후보 집합 A를 모은다. 현재 학습셋 B와 A의 영상을 모두 10초 클립으로 자르고, CLIP으로 초당 1프레임의 feature를 뽑아 클립마다 pooling한 대표 벡터를 만든다. A의 클립 a_j마다 B의 모든 클립과의 코사인 유사도 최댓값 S_max(a_j)를 구하고, 임계값 τ = 0.5보다 낮은 클립만 새롭다고 보아(A_novel) 그 클립과 원본 영상을 채택한다.

**story-level 주석(top-down).** Shot2story처럼 shot detection으로 자르면 과분할이 일어나 일관된 줄거리 텍스트를 만들기 어렵다는 판단에서, 사람이 붙인 chapter를 구간으로 쓴다. 채택한 영상 중 ViTT와 Vidchapters의 내용을 쓰고, chapter가 둘 미만인 영상은 버린다. 절차는 두 단계다.

| 단계 | 내용 |
|---|---|
| chapter-level dense caption | 구간마다 최대 2 FPS, 최대 50프레임을 뽑아 사용자가 붙인 구간 제목과 함께 GPT-4o에 넣고, 제목이 가리키는 내용에 집중한 상세 caption을 만든다 |
| long-form QA 생성 | 전체 구간의 caption과 시간 구간, chapter 제목을 모아 GPT-4에 넣고 여러 질문 유형을 아우르는 QA 쌍을 만든다 |

**clip-level 주석(bottom-up).** story-level 주석은 긴 시간에 걸친 의미에 치우치므로, 국소적인 시공간 세부를 묻는 질문을 따로 만든다. 집합 A의 짧은 클립마다 최대 2 FPS로 프레임을 뽑아 GPT-4o에 넣고, 미리 정의한 질문 유형 풀에서 다섯 개를 무작위로 골라 QA 쌍을 만들게 한다. 질문 유형 풀은 부록 Table 12에 63종이 정의돼 있다.

클립용 질문을 영상 전체에 그대로 붙이면 답이 충돌할 수 있다. 이를 막기 위해 클립 질문 쌍마다 두 anchor를 붙인다. 하나는 질문 안에 시간 구간을 직접 적는 time anchor이고, 다른 하나는 답을 드러내지 않으면서 추가 정보를 주는 GPT-4o 생성 textual context anchor다. 부록 E.1.1의 caption 프롬프트는 15~30단어의 brief caption과 상세 caption을 함께 만들게 하며, brief caption이 textual context anchor로 쓰인다.

### 3.6 부록의 주석 프롬프트와 질문 유형 풀

부록 E.1은 세 종류의 프롬프트를 싣는다.

| 프롬프트 | 입력 | 출력과 제약 |
|---|---|---|
| caption과 anchor 생성(E.1.1) | 클립 프레임과 제목 | brief caption(15~30단어)과 detailed caption을 JSON으로 출력. 동작의 진행 순서를 단계별로 적고, 화면의 텍스트는 원어와 영어 번역을 함께 적되 흐릿하면 존재만 언급한다 |
| clip-level QA 생성(E.1.2) | detailed caption, brief caption, 질문 유형 풀 | 유형마다 QA 하나. brief caption만으로 완전히 답할 수 있는 질문은 만들지 않고, 해당 없는 유형은 null로 표시한다 |
| video-level QA 생성(E.1.3) | "start ~ end: caption" 형식으로 이은 클립 caption 목록 | 유형마다 QA 하나. caption으로 다룰 수 없는 유형만 null로 표시한다 |

Table 12의 질문 유형 63종은 object(인식, 속성, 개수, 상태, 위치, 존재), human(속성, 자세, 외양, 정체, 인지 과정, 위치, 감정), scene과 text, 단일 물체 이벤트와 변화(상태, 수량, 위치, 궤적, 속도, 존재), 사람과 물체 사이의 상호작용, 이상 이벤트, 도메인 지식(의료, 교육, 스포츠, 영화, 게임, 기술, 예술), 편집 효과와 카메라 움직임, 공간 관계와 비교, 시간 순서와 인과, 반사실 추론, 예측, planning과 navigation, 대화 내용, 요약과 주제로 묶인다.

### 3.7 학습 인프라와 단계별 설정

부록 B.1의 인프라 최적화는 네 가지다.

| 항목 | 내용 |
|---|---|
| GPU 메모리 | Triton 기반 fused operator가 PyTorch의 MLP, RMSNorm, RoPE를 대체한다. linear layer와 cross-entropy 손실을 융합해 중간 logit 저장을 없애고, hidden state를 CPU로 offload한다 |
| 분산 context parallelism | USP 위에 Ulysses와 Ring 두 층의 통신 그룹을 둔다. zigzag ring-attention 대신 all-gather KV를 쓰는 zigzag Llama3 방식 context parallelism으로 통신 지연을 줄인다 |
| 영상 디코딩 | 희소한 프레임을 찾아 읽을 때 생기는 seek 지연과 메모리 문제를 빠른 메타데이터 파싱으로 줄인다 |
| 추론 | vLLM으로 서빙과 평가를 수행해 메모리 요구량을 줄이고 속도를 높인다 |

부록 B.2에 따르면 자원을 아끼기 위해 Eagle-2의 Stage-1.5 학습 가중치를 그대로 받아 Stage-2에서 long-context 학습을 이어 간다. Table 8의 단계별 설정은 다음과 같다.

| 항목 | Stage-1 | Stage-1.5 | Stage-2 | Stage-3 | Stage-4 |
|---|---|---|---|---|---|
| vision 해상도 | 448 × {(i, j) : i, j ∈ Z+, i × j ≤ 12} (전 단계 공통) | | | | |
| vision 토큰 | (i × j + 1) × 256 (전 단계 공통) | | | | |
| 데이터셋 | ALLaVA | Rich Diverse Data | Short+Long Data | Short+Long Data | Short+Long Data |
| 샘플 수 | 120만 | 2,160만 | 460만+460만 | 460만+460만 | 460만+460만 |
| 학습 대상 | MLP connector (4,000만) | Full Model (8B, LLM은 Qwen2.5-7B) | Full Model (8B) | Full Model (8B) | Full Model (8B) |
| 배치 크기 | 1024 | 1024 | 256 | 128 | 128 |
| 학습률 | 2×10⁻⁴ | 2×10⁻⁵ | 2×10⁻⁵ | 2×10⁻⁵ | 2×10⁻⁵ |
| 최대 길이 | 4096 | 8192 | 32768 | 65536 | 128K |

부록 D는 단계별 데이터를 다음과 같이 적는다. Stage-1은 ALLaVA, Stage-1.5는 Table 11의 Eagle2.5-Image-SFT(11a)와 추가 pre-training 데이터(11b), Stage-2부터 Stage-4는 Eagle2.5-Image-SFT(11a), Open-Data, Eagle-Video-110K를 섞은 short+long 데이터다. Table 11a의 SFT 데이터는 Captioning & Knowledge, Mathematics, Science, Chart & Table, Naive OCR, OCR QA, Grounding & Counting, General VQA, Text-only 아홉 범주로 나뉘고, Table 11b의 Stage 1.5 추가 데이터는 CC3M, TextCaps, ShareGPT-4V, DenseFusion-1M(Captioning & Knowledge), Object 365(Grounding & Counting), OpenMathInstruct(Text-only)다. Table 11 캡션은 마젠타색 항목이 내부 데이터라고 적지만 텍스트 추출본에서는 색을 구분할 수 없다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 영상 벤치마크 (Table 2)

기본 설정은 2 FPS 샘플링, tiling 끔, 최소 8프레임이다. Video-MME만 최대 512프레임이고 나머지는 256프레임이며, Perception-Test는 고해상도 평가를 위해 tiling을 켠다. 아래 두 표는 Table 2를 둘로 나눈 것이다. MMB-Video는 점수 척도가 다르고, "-"는 논문이 값을 적지 않은 칸이다.

| 모델 | MVBench | Perception_test (Val) | EgoSchema (fullset) | MMB-Video | MLVU (Val) | LVBench (Val) | Video-MME w/o sub | Video-MME w/ sub |
|---|---|---|---|---|---|---|---|---|
| GPT-4o-0806 | - | - | - | 1.63 | - | 66.7 | 71.9 | 77.2 |
| Claude-3.5-Sonnet | - | - | - | - | - | - | 60.0 | 62.9 |
| Gemini-1.5-Pro | - | - | 72.2 | 1.30 | - | 64.0 | 75.0 | 81.3 |
| MiniCPM-V2.6-8B | - | - | - | - | - | - | 60.9 | 63.7 |
| LongVILA-8B | 67.1 | 58.1 | 67.7 | - | - | 57.1 | 60.1 | 65.1 |
| InternVL2.5-8B | 72.0 | - | - | 1.68 | 68.9 | 60.0 | 64.2 | 66.9 |
| LLaVA-Video-8B | 58.6 | 67.9 | 57.3 | - | 70.8 | 58.2 | 63.3 | 69.7 |
| Qwen2.5-VL-8B | 69.6 | 70.5 | 65.0 | 1.79 | 70.2 | 56.0 | 65.1 | 71.6 |
| VideoChat-Flash-8B | 74.0 | 76.2 | - | - | 74.6 | 64.7 | 65.3 | 69.7 |
| InternVL2.5-78B | 76.4 | - | - | 1.97 | 75.7 | 63.6 | 72.1 | 74.0 |
| Qwen2.5-VL-72B | 70.4 | 73.2 | 76.2 | 2.02 | 74.6 | 60.7 | 73.3 | 79.1 |
| LLaVA-Video-72B | 64.1 | 74.3 | 65.6 | - | 74.4 | 61.9 | 70.6 | 76.9 |
| Eagle2.5-8B | 74.8 | 82.0 | 72.2 | 1.94 | 77.6 | 66.4 | 72.4 | 75.7 |

| 모델 | CG-Bench Clue | CG-Bench Long | CG-Bench Open | CG-Bench mIoU | HourVideo Dev | HourVideo Test | Charade-STA mIoU |
|---|---|---|---|---|---|---|---|
| GPT-4o-0806 | 58.6 | 44.9 | 39.2 | 5.73 | - | - | 35.7 |
| Claude-3.5-Sonnet | 56.5 | 40.3 | 35.6 | 4.17 | - | - | - |
| Gemini-1.5-Pro | 50.9 | 37.8 | 28.7 | 3.85 | 37.2 | 37.4 | - |
| MiniCPM-V2.6-8B | 44.4 | 29.9 | 26.3 | 2.27 | - | - | - |
| LongVILA-8B | 47.5 | 34.3 | 26.6 | - | - | - | - |
| Qwen2.5-VL-8B | 44.5 | 35.5 | 24.1 | 2.48 | - | - | 43.6 |
| VideoChat-Flash-8B | 52.8 | 43.1 | 37.5 | 1.49 | - | - | - |
| InternVL2.5-78B | 59.5 | 44.2 | 34.2 | 3.90 | - | - | - |
| Qwen2.5-VL-72B | - | - | - | - | - | - | 50.9 |
| Eagle2.5-8B | 55.8 | 46.6 | 45.6 | 13.4 | 44.5 | 41.8 | 65.9 |

본문의 해석은 다음과 같다. MVBench 74.8, Perception_test 82.0, EgoSchema 72.2는 같은 크기의 InternVL2.5-8B(72.0)와 Qwen2.5-VL-8B(69.6, 70.5, 65.0)를 앞선다. MLVU 77.6과 LVBench 66.4는 InternVL2.5-78B(75.7, 63.6)를 넘는다. Video-MME(자막 없음) 72.4는 같은 크기 모델을 크게 앞서고 72B 모델(73.3)에 매우 가깝다. CG-Bench는 Clue 55.8, Long 46.6, Open 45.6, mIoU 13.4로, 본문은 Claude-3.5-Sonnet(56.5, 40.3, 35.6, 4.17)과 Gemini-1.5-Pro(50.9, 37.8, 28.7, 3.85)를 넘는다고 적는다. 다만 표의 값으로는 Clue 항목에서 Claude(56.5)와 GPT-4o(58.6)가 Eagle(55.8)보다 높다. HourVideo는 dev 44.5, test 41.8로 Gemini-1.5-Pro(37.2, 37.4)를 넘고, Charade-STA mIoU 65.9는 다른 모델을 크게 앞서 시간 인식 능력이 강하다고 해석한다.

### 4.2 이미지 벤치마크 (Table 3)

평균은 모든 벤치마크 점수의 평균이며 OCRBench는 10으로 나눠 넣는다.

| 모델 | DocVQA (Test) | ChartQA (Test) | InfoVQA (Test) | TextVQA (Val) | OCRBench (Test) | MMstar (Test) | RWQA (Test) | AI2D (Test) | MMMU (Val) | MMB1.1 (Test) | MMVet (Test) | HallB (Test) | MathVista (Test-Mini) | Avg |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| GPT-4o-0806 | 92.8 | 85.7 | 79.2 | 77.4 | 736 | 64.7 | 75.4 | 84.6 | 69.1 | 83.1 | 69.1 | 55.0 | 63.8 | 74.9 |
| Claude-3.5-Sonnet | 95.2 | 90.8 | 74.3 | 74.1 | 788 | 65.1 | 60.1 | 81.2 | 68.3 | 80.9 | 70.1 | 55.5 | 67.7 | 74.0 |
| Gemini-1.5-Pro | 93.1 | 87.2 | 81.0 | 78.8 | 754 | 59.1 | 67.5 | 79.1 | 62.2 | 74.6 | 64.0 | 45.6 | 63.9 | 71.7 |
| MiniCPM-V2.6-8B | 90.8 | 82.4 | - | 80.1 | 852 | 57.5 | 65.0 | 82.1 | 49.8 | 78.0 | 60.0 | 48.1 | 60.6 | - |
| LLaVA-One-Vision-8B | 87.5 | 80.0 | 68.8 | - | 622 | 61.7 | 66.3 | 81.4 | 48.8 | 80.9 | 57.5 | 31.6 | 63.2 | - |
| InternVL2.5-8B | 93.0 | 84.8 | 77.6 | 79.1 | 822 | 62.8 | 70.1 | 84.5 | 56.0 | 83.2 | 62.8 | 50.1 | 64.4 | 73.1 |
| Qwen2.5-VL-8B | 95.7 | 87.3 | 82.6 | 84.9 | 864 | 63.9 | 68.5 | 83.9 | 58.6 | 82.6 | 67.1 | 52.9 | 68.2 | 75.6 |
| LLaVA-One-Vision-72B | 91.7 | 83.7 | 74.9 | - | 741 | 66.1 | 71.9 | 85.6 | 56.6 | 84.5 | 60.6 | 47.5 | 68.4 | - |
| LLaMa-3.2-90B-Vision | 90.1 | 85.5 | - | - | 783 | 55.3 | - | - | 60.3 | 77.3 | 64.1 | 44.1 | 57.3 | - |
| Eagle2.5-8B | 94.1 | 87.5 | 80.4 | 83.7 | 869 | 66.2 | 76.7 | 84.5 | 55.8 | 81.7 | 62.9 | 54.7 | 67.8 | 75.6 |

평균 75.6으로 Qwen2.5-VL-8B와 같고 GPT-4o(74.9)보다 높다. 본문은 문서 이해(DocVQA 94.1), 차트 해석(ChartQA 87.5), 정보 추출(InfoVQA 80.4, TextVQA 83.7), OCR(OCRBench 869), 일반 인식과 추론(MMstar 66.2, RWQA 76.7, MMB1.1 81.7, MMVet 62.9), 지식(MMMU 55.8, AI2D 84.5), 시각 환각(HallB 54.7), 수학 추론(MathVista 67.8)을 차례로 들며 균형 잡힌 범용 VLM이라고 해석한다. 표에서 Eagle2.5-8B가 열 최고값인 항목은 OCRBench, MMstar, RWQA 세 개다.

### 4.3 추가 벤치마크 (Table 9, Table 10)

부록 C는 다중 페이지 문서 벤치마크 두 개를 더 보고한다. ANLS는 Approximate Normalized Levenshtein Similarity다.

| SlideVQA subset | ANLS | Exact Match | F1 |
|---|---|---|---|
| Dev | 73.8 | 67.7 | 74.7 |
| Test | 72.7 | 63.2 | 72.3 |

| MMLongBench-Doc 지표 | 값 |
|---|---|
| Overall F1 | 29.4 |
| Overall Acc | 27.7 |

### 4.4 ablation

**Q1. long-context 데이터가 이미지 성능을 해치는가 (Table 4).** 해치지 않는다. L_max 학습을 하지 않은 Eagle2.5-S2가 평균 74.8인데 32K에서 75.3, 64K에서 75.6, 128K에서 75.7로 조금씩 오른다. Table 4는 Table 3과 달리 DocVQA, InfoVQA, OCRBench를 Val, MMB1.1을 EN-Val로 평가하므로 같은 모델이라도 Table 3의 값과 다르다.

| 설정 | DocVQA | ChartQA | InfoVQA | TextVQA | OCRBench | MMstar | RWQA | AI2D | MMMU | MMB1.1 | MMVet | HallB | MathVista | Avg |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Eagle2.5-S2 | 92.6 | 88.3 | 78.8 | 84.6 | 868 | 66.5 | 74.4 | 85.5 | 54.0 | 85.5 | 57.3 | 53.4 | 65.1 | 74.8 |
| L_max = 32K | 92.3 | 86.6 | 77.6 | 82.8 | 861 | 66.7 | 75.9 | 83.7 | 55.5 | 84.8 | 63.6 | 55.4 | 68.3 | 75.3 |
| L_max = 64K | 92.5 | 87.0 | 78.4 | 83.9 | 865 | 66.8 | 76.8 | 83.9 | 55.7 | 85.2 | 63.3 | 55.2 | 67.3 | 75.6 |
| L_max = 128K | 93.2 | 87.5 | 78.5 | 83.7 | 869 | 66.2 | 76.7 | 84.5 | 55.8 | 85.5 | 62.9 | 54.7 | 67.8 | 75.7 |

Table 4의 원래 행 라벨은 "Eagle2.5-S2+Eagle2.5-S2, L_max = 32K"처럼 같은 이름을 두 번 적어 의미가 불명확하다. 위 표에서는 L_max 값만 남겼다.

**Q1(계속). 이미지 데이터와 pre-training이 영상 성능에 얼마나 기여하는가 (Table 5).** L_max = 32K 모델로 비교했고, 벤치마크마다 2 FPS로 최대 32프레임을 샘플링했다. S1과 S1.5는 Eagle 2와 같은 stage-1, stage-1.5를 뜻한다.

| 학습 경로 | MVBench | MLVU (Val) | Video-MME w/o sub |
|---|---|---|---|
| S1 → S2 | 70.4 | 67.4 | 64.9 |
| S1 → S1.5 → S2 (Open-Data + EV-110K) | 72.9 | 70.9 | 65.2 |
| S1 → S1.5 → S2 (Image + Open-Data + EV-110K) | 73.1 | 71.5 | 65.4 |

대규모 이미지 pre-training은 짧은 영상 벤치마크 MVBench와 비교적 쉬운 긴 영상 벤치마크 MLVU에서 효과가 크지만, 더 어렵고 held-out인 Video-MME에서는 효과가 작다.

**Q2. information-first sampling을 빼면 (Table 6).** baseline은 IAP와 ADS를 모두 갖춘 설정이다.

| 설정 | InfoVQA (Val) | DocVQA (Val) | TextVQA (Val) | Perception_test (Val) | MLVU (Val) | Video-MME w/o sub |
|---|---|---|---|---|---|---|
| baseline | 77.6 | 92.3 | 82.8 | 76.3 | 71.5 | 65.4 |
| w/o IAP | 76.2 | 91.9 | 82.4 | 73.3 | 71.2 | 64.9 |
| w/o ADS | 77.0 | 92.1 | 82.8 | 75.5 | 70.1 | 65.0 |

IAP를 빼면 고해상도가 필요한 InfoVQA와 세밀한 영상 벤치마크 Perception_test가 크게 떨어지고 다른 벤치마크의 변화는 작다. ADS를 빼면 MLVU가 71.5에서 70.1로 내려간다. 저자들은 vision-context-centric 샘플링이 supervision 신호를 잘라 성능을 잃게 한다고 해석한다.

**Q3. post-training 스케줄 (Table 7).** 32K에서 64K로 올리는 progressive 학습이 곧장 64K를 학습하는 것보다 낫다. 저자들이 든 이유는 두 가지다. 곧장 64K를 학습하면 샘플이 64K 공간에 흩어져 짧은 컨텍스트에 대한 집중이 흐려지고, 일부 긴 샘플은 쉬운 것에서 어려운 것으로 넘어가는 점진적 과정 없이는 배우기 어렵다.

| 설정 | MVBench | MLVU (Val) | Video-MME w/o sub |
|---|---|---|---|
| 32K → 64K, Open-Data | 73.0 | 74.5 | 68.1 |
| 64K, Open-Data | 71.3 | 74.0 | 67.9 |
| 32K → 64K, Open-Data + Eagle-Video-110K | 73.9 | 75.1 | 68.8 |

**Q4. Eagle-Video-110K (Table 7, Figure 6).** Eagle-Video-110K를 더하면 Table 7의 세 벤치마크가 모두 오른다. Figure 6은 16K, 32K, 64K, 128K 모델과 Eagle-Video-110K를 뺀 64K 모델의 Video-MME 곡선을 16프레임에서 512프레임까지 그린다. 단계가 올라갈수록 더 많은 프레임을 처리하는 능력이 커지며, 128K 모델은 512프레임에서 72.4에 이른다. Eagle-Video-110K를 뺀 64K 모델은 128프레임까지는 32K 모델보다 높지만 256프레임 근처에서 정점을 찍고 512프레임에서 내려간다. 저자들은 Open-Data에 없던 긴 영상을 포함한 것이 128프레임 이상을 다루는 능력을 크게 끌어올렸다고 설명한다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

논문에 별도 limitations 절이 없고 결론은 성과 요약으로 끝난다. 아래는 자료의 수치와 기술 범위에서 확인되는 제약이며, 저자가 명시한 것이 아니다.

- 다중 페이지 문서 벤치마크 MMLongBench-Doc은 F1 29.4, Acc 27.7로, 다른 벤치마크와 비교 대상 없이 값만 보고된다.
- 어려운 긴 영상 벤치마크 Video-MME에서는 이미지 데이터와 pre-training의 효과가 작다(Table 5의 65.2에서 65.4). 이 점은 저자들이 본문에서 직접 언급한다.
- Eagle-Video-110K의 caption과 QA는 GPT-4o와 GPT-4 출력에 의존한다. 데이터 품질이 이 모델들의 출력 품질에 묶인다.
- 논문은 "a family of frontier VLMs"라고 부르지만 결과를 보고하는 모델은 Eagle2.5-8B 하나다. 다른 크기에서 레시피가 어떻게 작동하는지는 자료에 없다.
- Eagle-Video-110K의 영상 수, QA 쌍 수, 총 시간 같은 규모 통계는 본문에 없다. 이름의 110K가 무엇의 개수인지도 적혀 있지 않다.
- 가중치 라이선스는 논문에 없다. 저장소 README([[llms/nvlabs-eagle]])는 가중치를 CC BY-NC 4.0 또는 NVIDIA License의 비상업 research preview로 적는다.

자료 자체의 내적 불일치는 다음과 같다.

| 위치 | 내용 |
|---|---|
| Table 2 vs 4.1절 | 표의 열 이름은 LVBench인데 본문은 같은 값 66.4를 LongVideobench(Wu et al. 2025, 참고문헌 [223])로 부른다. 두 벤치마크는 서로 다른 데이터셋이다 |
| 4.1절 CG-Bench 서술 | 본문은 Claude-3.5-Sonnet을 넘는다고 적지만 Clue 항목은 Claude 56.5, GPT-4o 58.6이 Eagle 55.8보다 높다 |
| Table 11 캡션 vs 부록 D | 캡션은 "Stage 1 and Stage1.5" 데이터셋이라고 적지만 부록 D는 Stage-1 데이터를 ALLaVA 하나로, Table 11을 Stage-1.5 데이터로 적는다 |
| Table 4 행 라벨 | "Eagle2.5-S2+Eagle2.5-S2, L_max = 32K"처럼 같은 이름이 반복된다 |
| Figure 2 vs 저장소 | 인코더가 SigLIP-so400M(Figure 2)과 SigLIP2-so400m-patch16-512(저장소 model zoo)로 다르다. 저장소 쪽은 논문 밖 근거다 |

## 6. 관련 연구 (Related Work)

long-context VLM은 두 계열로 나뉜다. 하나는 question-guided compression이나 selection, token reduction 같은 전용 모듈을 붙여 LLM에 들어가기 전에 시각 표현을 줄이는 계열이고, 다른 하나는 LongVA, LongVILA, LongViTA처럼 LLM의 context 자체를 늘리는 계열이다. Eagle 2.5는 후자에 속하면서 압축 모듈을 붙이지 않는다. 저자들이 지적하는 기존 확장 시도의 문제는 세 가지다. 상용 모델에 못 미치는 성능, 시각 입력을 늘려도 따라 오르지 않는 성능, 그리고 정리되지 않은 학습 전략과 데이터 레시피다.

구조 계보는 LLaVA(MLP projection)에서 LLaVA-1.5와 InternVL(image tiling)로 이어지고, 인코더는 SigLIP, LLM은 Qwen2.5다.

데이터 쪽 관련 연구는 세 묶음이다. 슬라이드와 논문 같은 긴 문서 데이터셋은 시간 이해가 빠져 있고, 영화 기반 데이터셋은 긴 구간에 걸친 시간 일관성과 정보 검색을 강조한다. 주석 방식은 초기의 수작업에서 GPT-4V와 Gemini를 쓴 자동화로 옮겨 왔으며, 최근에는 서사 구조를 보존하는 계층적 주석이 강조된다. Eagle-Video-110K의 story-level 주석은 Shot2story가 shot 단위로 자르는 것과 달리 사람이 붙인 chapter를 구간으로 삼는다.

## 7. 용어집 (Glossary)

도메인 공통 용어는 [[overviews/glossary-llms]]에 위임하고, 이 자료 고유의 이름만 적는다.

| 용어 | 뜻 |
|---|---|
| Eagle 2.5 | NVIDIA Eagle 계열의 long-context VLM. 논문이 결과를 보고하는 모델은 Eagle2.5-8B 하나다 |
| Eagle-Video-110K | 이 논문이 만든 긴 영상 데이터셋. story-level과 clip-level 주석을 겹쳐 넣었다 |
| information-first sampling | 텍스트를 먼저 온전히 확보하고 남은 예산으로만 시각 입력을 조정하는 샘플링 원칙. IAP와 ADS를 묶는 상위 이름이다 |
| image area preservation (IAP) | 원본 면적의 60% 이상을 남기면서 종횡비도 맞추도록 tiling 격자를 고르는 규칙 |
| automatic degradation sampling (ADS) | 시각 예산 안에서 프레임 수를 먼저 정하고 타일 수를 단계적으로 낮춰 맞추는 샘플링 절차 |
| mixed post-training | ADS와 length-balanced packing으로 길이가 다양한 샘플을 한 번에 학습하는 방식 |
| progressive mixed post-training | 최대 시퀀스 길이를 32K, 64K, 128K로 올려 가며 학습하는 post-training 스케줄 |
| length-balanced packing | 길이가 제각각인 샘플을 한 배치에 채울 때 길이 분포가 치우치지 않게 묶는 방식. Eagle 2 논문의 기법 |
| image tiling | 큰 이미지를 448픽셀 정사각 타일 격자로 잘라 각각 인코딩하는 고해상도 처리 방식 |
| story-level 주석 | 사람이 붙인 chapter를 구간으로 삼아 영상 전체 줄거리를 담는 top-down 주석 |
| clip-level 주석 | 짧은 클립마다 GPT-4o로 QA를 만드는 bottom-up 주석 |
| time anchor | 클립용 질문을 영상 전체에 붙일 때 질문 안에 시간 구간을 직접 적어 답 충돌을 막는 장치 |
| textual context anchor | 답을 드러내지 않으면서 어느 장면인지 알려 주는 GPT-4o 생성 문장. brief caption이 이 용도로 쓰인다 |
| context parallelism | 하나의 긴 시퀀스를 여러 GPU에 나눠 attention을 계산하는 분산 방식. USP, Ulysses, Ring이 그 구현이다 |
| Video-MME | 이 논문의 대표 지표로 쓰인 영상 이해 벤치마크. 자막 유무를 나눠 보고한다 |

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 1 | Video-MME에서 입력 프레임 수를 늘렸을 때의 모델별 성능 곡선. Eagle-2.5-8B만 16프레임에서 512프레임까지 계속 오른다 | caption-region | ★ wiki 권장 (result) |
| fig02 | 4 | Eagle 2.5 모델 구조. information-first sampling이 고른 시각 입력이 SigLIP-so400M 인코더와 MLP connector를 거쳐 LLM에 들어가고, 텍스트는 그대로 LLM에 들어간다 | manual | ★ wiki 권장 (architecture) |
| fig03 | 4 | image area preservation 비교. (a) InternVL식 tiling은 2000×1300 이미지의 왼쪽 위 일부만 3×2 타일로 덮고, (b) 면적 우선 tiling은 4×3 타일로 원본 전체를 덮는다 | caption-region | ★ wiki 권장 (method) |
| fig04 | 7 | Open-Data와 Eagle-Video-110K의 영상 길이 분포(로그 스케일). Open-Data는 약 1,500초에서 끝나고 Eagle-Video-110K는 12,000초 근처까지 이어진다 | manual | ★ wiki 권장 (data) |
| fig05 | 8 | Eagle-Video-110K 주석 파이프라인. 왼쪽 bottom-up은 클립마다 GPT-4o로 QA를 만들고 time anchor와 textual context anchor를 붙이며, 오른쪽 top-down은 사람이 나눈 chapter를 caption으로 바꾼 뒤 GPT-4가 story-level QA를 만든다 | caption-region | ★ wiki 권장 (method) |
| fig06 | 11 | post-training 스케줄과 Eagle-Video-110K 유무에 따른 Video-MME 프레임 확장 곡선. 128K 모델은 512프레임까지 오르고, Eagle-Video-110K를 뺀 64K 모델은 256프레임 이후 내려간다 | caption-region | ★ wiki 권장 (ablation) |
| tab01 | 7 | Eagle 2.5가 쓴 영상, 다중 페이지 문서, long text 오픈 데이터셋 목록(Table 1). 크롭에서 마지막 Long Text 행이 잘려 있다 | table-region | (확인 필요, 본문 표로 대체) |
| tab02 | 9 | 영상 벤치마크 비교(Table 2). 값은 본문 마크다운 표로 옮겼다 | table-region | (본문 표로 대체) |
| tab03 | 9 | 이미지 벤치마크 비교(Table 3). 값은 본문 마크다운 표로 옮겼다 | table-region | (본문 표로 대체) |
| tab04 | 10 | long-context 데이터가 이미지 벤치마크에 미치는 영향(Table 4). L_max 32K, 64K, 128K 학습 전후 비교 | table-region | (본문 표로 대체) |
| tab05 | 10 | 이미지 데이터와 pre-training이 영상 벤치마크에 미치는 영향(Table 5). 크롭에 오른쪽 Table 6이 함께 들어 있다 | table-region | (확인 필요, 본문 표로 대체) |
| tab06 | 10 | information-first sampling ablation(Table 6). IAP와 ADS를 각각 뺐을 때의 이미지와 영상 벤치마크 | table-region | (본문 표로 대체) |
| tab07 | 11 | Eagle-Video-110K와 post-training 스케줄이 영상 벤치마크에 미치는 영향(Table 7) | table-region | (본문 표로 대체) |
| tab08 | 12 | progressive post-training 단계별 설정(Table 8). 크롭 위쪽에 본문 한 줄이 함께 들어 있다 | manual | (확인 필요, 본문 표로 대체) |
| tab09 | 13 | SlideVQA 성능(Table 9). 크롭에 오른쪽 Table 10이 함께 들어 있다 | table-region | (확인 필요, 본문 표로 대체) |
| tab10 | 13 | MMLongBench-Doc 성능(Table 10) | table-region | (본문 표로 대체) |
| tab11 | 17 | Stage 1.5 추가 pre-training 데이터셋(Table 11b). 크롭이 하위 표 (b)만 담고 (a) SFT 데이터셋 표는 잘려 있다 | table-region | (확인 필요, 본문 목록으로 대체) |
| tab12 | 18 | clip-level QA 생성에 쓴 질문 유형 63종의 이름과 설명(Table 12) | table-region | (본문 요약으로 대체) |
