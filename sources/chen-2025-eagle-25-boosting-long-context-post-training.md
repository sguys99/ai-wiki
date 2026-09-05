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
tags: [vlm, long-context, video-understanding, high-resolution, nvidia, eagle, post-training, vla-backbone, qwen25, siglip, neurips-2025]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/chen-2025-eagle-25-boosting-long-context-post-training/fig01.png
    raw: raw/papers/chen-2025-eagle-25-boosting-long-context-post-training-figures/fig01.png
    caption: "Video-MME에서 입력 프레임 수를 늘렸을 때의 성능 곡선 비교"
    page: 1
    bbox_norm: [0.4741, 0.5295, 0.9053, 0.7601]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/chen-2025-eagle-25-boosting-long-context-post-training/fig02.png
    raw: raw/papers/chen-2025-eagle-25-boosting-long-context-post-training-figures/fig02.png
    caption: "Eagle 2.5 구조 — information-first sampling · SigLIP 인코더 · MLP connector · LLM"
    page: 4
    bbox_norm: [0.5349, 0.0929, 0.9021, 0.2351]
    strategy: manual
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/chen-2025-eagle-25-boosting-long-context-post-training/fig03.png
    raw: raw/papers/chen-2025-eagle-25-boosting-long-context-post-training-figures/fig03.png
    caption: "image area preservation — (a) 고정 격자 tiling과 (b) 면적 우선 tiling 비교"
    page: 4
    bbox_norm: [0.5295, 0.497, 0.9028, 0.6172]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/chen-2025-eagle-25-boosting-long-context-post-training/fig04.png
    raw: raw/papers/chen-2025-eagle-25-boosting-long-context-post-training-figures/fig04.png
    caption: "Open-Data와 Eagle-Video-110K의 영상 길이 분포"
    page: 7
    bbox_norm: [0.4519, 0.5109, 0.9121, 0.7141]
    strategy: manual
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/chen-2025-eagle-25-boosting-long-context-post-training/fig05.png
    raw: raw/papers/chen-2025-eagle-25-boosting-long-context-post-training-figures/fig05.png
    caption: "Eagle-Video-110K 주석 파이프라인 — bottom-up clip-level과 top-down story-level"
    page: 8
    bbox_norm: [0.0941, 0.0944, 0.9053, 0.2429]
    strategy: caption-region
    curated: true
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/chen-2025-eagle-25-boosting-long-context-post-training/fig06.png
    raw: raw/papers/chen-2025-eagle-25-boosting-long-context-post-training-figures/fig06.png
    caption: "Eagle-Video-110K와 progressive post-training이 Video-MME 프레임 확장에 미치는 영향"
    page: 11
    bbox_norm: [0.5532, 0.3468, 0.9053, 0.5278]
    strategy: caption-region
    curated: true
  - id: tab01
    label: Table 1
    kind: table
    file: assets/chen-2025-eagle-25-boosting-long-context-post-training/tab01.png
    raw: raw/papers/chen-2025-eagle-25-boosting-long-context-post-training-figures/tab01.png
    caption: "Eagle 2.5가 쓴 영상 · 다중 페이지 문서 · long text 데이터셋 목록"
    page: 7
    bbox_norm: [0.0947, 0.0708, 0.9053, 0.3896]
    strategy: table-region
    curated: false
  - id: tab02
    label: Table 2
    kind: table
    file: assets/chen-2025-eagle-25-boosting-long-context-post-training/tab02.png
    raw: raw/papers/chen-2025-eagle-25-boosting-long-context-post-training-figures/tab02.png
    caption: "영상 벤치마크 SoTA 비교"
    page: 9
    bbox_norm: [0.0947, 0.0708, 0.9053, 0.29]
    strategy: table-region
    curated: true
  - id: tab03
    label: Table 3
    kind: table
    file: assets/chen-2025-eagle-25-boosting-long-context-post-training/tab03.png
    raw: raw/papers/chen-2025-eagle-25-boosting-long-context-post-training-figures/tab03.png
    caption: "이미지 벤치마크 SoTA 비교"
    page: 9
    bbox_norm: [0.0977, 0.3585, 0.9053, 0.5394]
    strategy: table-region
    curated: true
  - id: tab04
    label: Table 4
    kind: table
    file: assets/chen-2025-eagle-25-boosting-long-context-post-training/tab04.png
    raw: raw/papers/chen-2025-eagle-25-boosting-long-context-post-training-figures/tab04.png
    caption: "long-context 데이터가 이미지 벤치마크에 미치는 영향"
    page: 10
    bbox_norm: [0.0947, 0.0708, 0.9053, 0.182]
    strategy: table-region
    curated: false
  - id: tab05
    label: Table 5
    kind: table
    file: assets/chen-2025-eagle-25-boosting-long-context-post-training/tab05.png
    raw: raw/papers/chen-2025-eagle-25-boosting-long-context-post-training-figures/tab05.png
    caption: "이미지 데이터와 pre-training이 영상 벤치마크에 미치는 영향"
    page: 10
    bbox_norm: [0.0947, 0.208, 0.9045, 0.2855]
    strategy: table-region
    curated: false
  - id: tab06
    label: Table 6
    kind: table
    file: assets/chen-2025-eagle-25-boosting-long-context-post-training/tab06.png
    raw: raw/papers/chen-2025-eagle-25-boosting-long-context-post-training-figures/tab06.png
    caption: "information-first sampling ablation — IAP · ADS를 뺐을 때의 성능"
    page: 10
    bbox_norm: [0.5144, 0.208, 0.9045, 0.2855]
    strategy: table-region
    curated: false
  - id: tab07
    label: Table 7
    kind: table
    file: assets/chen-2025-eagle-25-boosting-long-context-post-training/tab07.png
    raw: raw/papers/chen-2025-eagle-25-boosting-long-context-post-training-figures/tab07.png
    caption: "Eagle-Video-110K와 post-training 스케줄이 영상 벤치마크에 미치는 영향"
    page: 11
    bbox_norm: [0.5136, 0.1429, 0.9055, 0.2289]
    strategy: table-region
    curated: false
  - id: tab08
    label: Table 8
    kind: table
    file: assets/chen-2025-eagle-25-boosting-long-context-post-training/tab08.png
    raw: raw/papers/chen-2025-eagle-25-boosting-long-context-post-training-figures/tab08.png
    caption: "progressive post-training 단계별 설정 (Stage-1 ~ Stage-4)"
    page: 12
    bbox_norm: [0.0799, 0.6209, 0.9221, 0.8251]
    strategy: manual
    curated: true
  - id: tab09
    label: Table 9
    kind: table
    file: assets/chen-2025-eagle-25-boosting-long-context-post-training/tab09.png
    raw: raw/papers/chen-2025-eagle-25-boosting-long-context-post-training-figures/tab09.png
    caption: "SlideVQA 성능"
    page: 13
    bbox_norm: [0.1107, 0.0941, 0.8789, 0.1553]
    strategy: table-region
    curated: false
  - id: tab10
    label: Table 10
    kind: table
    file: assets/chen-2025-eagle-25-boosting-long-context-post-training/tab10.png
    raw: raw/papers/chen-2025-eagle-25-boosting-long-context-post-training-figures/tab10.png
    caption: "MMLongBench-Doc 성능"
    page: 13
    bbox_norm: [0.5322, 0.0941, 0.8789, 0.1553]
    strategy: table-region
    curated: false
  - id: tab11
    label: Table 11
    kind: table
    file: assets/chen-2025-eagle-25-boosting-long-context-post-training/tab11.png
    raw: raw/papers/chen-2025-eagle-25-boosting-long-context-post-training-figures/tab11.png
    caption: "Stage-1.5 · Stage-2에서 쓴 데이터셋 목록"
    page: 17
    bbox_norm: [0.0982, 0.7231, 0.9028, 0.8136]
    strategy: table-region
    curated: false
  - id: tab12
    label: Table 12
    kind: table
    file: assets/chen-2025-eagle-25-boosting-long-context-post-training/tab12.png
    raw: raw/papers/chen-2025-eagle-25-boosting-long-context-post-training-figures/tab12.png
    caption: "clip-level QA 생성에 쓴 질문 유형 분류"
    page: 18
    bbox_norm: [0.0947, 0.0708, 0.9171, 0.8212]
    strategy: table-region
    curated: false
---

## 한 줄 요약 (One-line Summary)

NVIDIA Eagle 계열 VLM의 세 번째 릴리스. 압축 모듈을 새로 붙이는 대신 sampling 규칙 두 가지(image area preservation·automatic degradation sampling), 32K → 64K → 128K로 올리는 progressive post-training, story·clip 두 층으로 주석한 Eagle-Video-110K만으로 long-context 이해를 끌어올려, Eagle2.5-8B가 512프레임 Video-MME에서 72.4를 기록하며 GPT-4o(71.9)와 Qwen2.5-VL-72B(73.3) 사이에 들어간다.

## 1. 자료 정보 (Document Information)

- **제목**: Eagle 2.5: Boosting Long-Context Post-Training for Frontier Vision-Language Models
- **저자**: Guo Chen · Zhiqi Li · Shihao Wang · Jindong Jiang (공동 1저자, NVIDIA 인턴 기간 수행), Yicheng Liu, Lidong Lu, De-An Huang, Wonmin Byeon, Matthieu Le, Tuomas Rintamaki, Tyler Poon, Max Ehrlich, Tong Lu, Limin Wang, Bryan Catanzaro, Jan Kautz, Andrew Tao, Zhiding Yu† · Guilin Liu† (†공동 지도 및 교신)
- **소속**: NVIDIA (+ Nanjing University, The Hong Kong Polytechnic University, Rutgers University)
- **발행**: 2025년 4월 22일 · arXiv:2504.15271v1 [cs.CV] (2025-04-21). 저장소 README 기준 NeurIPS 2025 채택
- **유형**: Technical report (35페이지 — 본문 11페이지 + 부록 24페이지)
- **코드·가중치**: <https://github.com/NVlabs/EAGLE> · <https://huggingface.co/nvidia/Eagle2.5-8B>
- **wiki 내 짝 자료**: [[nvlabs-eagle]] — 같은 팀의 공식 저장소 README. Eagle 1 → 2 → 2.5 → LocateAnything 계보와 GR00T 채택 이력이 거기 있다

## 2. 주요 기여 (Key Contributions)

1. **information-first sampling** — 텍스트를 먼저 온전히 확보하고 남는 예산으로만 시각 입력을 깎는 sampling 규칙. 고정 해상도·고정 프레임 수로 뽑던 기존 관행을 뒤집는다.
2. **progressive mixed post-training** — 최대 시퀀스 길이 L_max를 32K → 64K → 128K로 단계적으로 올린다. 같은 데이터로 처음부터 64K를 학습하는 것보다 결과가 낫다.
3. **Eagle-Video-110K** — 사람이 붙인 chapter를 구간으로 삼는 story-level 주석과 GPT-4o로 만드는 clip-level 주석을 한 데이터셋에 겹쳐 넣었다. 오픈 데이터에 없던 긴 영상 구간을 메운다.
4. **프레임을 늘릴수록 오르는 성능 곡선** — 압축 모듈 없이도 16프레임에서 512프레임까지 단조 증가한다. 비교 대상인 LongViTA-14B·InternVL2.5-8B는 64~128프레임 근처에서 곡선이 꺾인다.
5. **long-context 학습 인프라** — Triton fused operator, USP 기반 context parallelism, 영상 디코딩 가속, vLLM 서빙을 한 파이프라인으로 묶었다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 모델 구성

LLaVA 계보를 그대로 따르는 단순한 구성이다. SigLIP 계열 vision encoder가 만든 임베딩을 MLP projection layer가 LLM 표현 공간에 맞추고, LLM은 Qwen2.5-7B-Instruct를 쓴다. 합쳐 8B다. 임의 해상도를 다루려고 LLaVA-1.5·InternVL에서 가져온 image tiling을 쓴다. image tiling은 큰 이미지를 448픽셀짜리 정사각 타일 격자로 잘라 각각을 인코딩하는 방식이다.

압축이나 선택 모듈을 일부러 넣지 않은 것이 설계 결정이다. 긴 입력에만 최적화한 특수 모듈이 범용성을 깎는다고 봤다.

표기가 하나 어긋난다. 논문 Figure 2는 인코더를 SigLIP-so400M으로 적고 본문은 Zhai 2023(SigLIP)을 인용하는데, 저장소 model zoo는 Eagle2.5-8B의 vision encoder를 SigLIP2-so400m-patch16-512로 적는다. 공개된 체크포인트는 저장소 표기 쪽을 따르는 것으로 보인다.

### 3.2 image area preservation

기존 tiling은 W×H 이미지를 r_w × r_h 격자의 s×s 타일로 자른다. InternVL처럼 종횡비 제약이 빡빡하면 원본을 줄여 격자에 맞춰야 해서 고해상도를 살리려던 tiling의 목적이 반감된다.

Eagle 2.5는 두 목표를 함께 만족하는 격자를 고른다. 하나는 원본 면적 A_orig = WH의 60% 이상을 타일 쪽 면적 A_new = r_w r_h s²에 남기는 것이고, 다른 하나는 타일 비율 r_t = r_w/r_h를 원본 종횡비 r_orig = W/H에 맞추는 것이다. r_w × r_h ≤ N인 후보 중에서 다음을 최대화한다.

```
argmax  min(A_new / A_orig, 0.6) · min(r_t / r_orig, r_orig / r_t)
(r_w,r_h)     └─ 면적 벌점 ─┘     └─ 종횡비 정합 ─┘
```

앞 항은 A_new가 0.6·A_orig에 못 미칠 때만 벌점을 주고 그 위로는 더 보상하지 않는다. 뒤 항은 r_t = r_orig에서 1이 되고 어느 쪽으로 벗어나든 대칭으로 줄어든다.

### 3.3 automatic degradation sampling

시각 입력을 고정 FPS나 고정 개수로 뽑는 기존 방식은 vision-context-centric이라 텍스트가 뒤에서 잘릴 수 있다. ADS는 순서를 뒤집어 all-context-centric으로 간다. 텍스트 토큰 길이 L_text를 먼저 확정하고, L_visual = L_max − L_text만 시각 예산으로 쓴다. 텍스트는 무조건 온전히 남는다.

그 예산 안에서 이미지당 최대 타일 수 t(1~12)와 시간축 sampling 개수 n(1~N_max)을 함께 키우는 제약 최적화를 푼다. 프레임과 페이지는 tiling을 쓰지 않아 하나당 256 토큰으로 고정이고, N_max는 영상이면 2 × duration, 문서면 페이지 수다.

학습 sample은 대개 이미지 아니면 시간축 입력 한쪽에 몰려 있어서 두 단계로 나눠 푼다. 먼저 t = 1로 고정한 채 2 FPS를 목표로 프레임 수를 정한다(n* = ⌊(L_visual − M)/256⌋). 최소 프레임 수 N_min조차 못 채우면 그 sample은 버린다. 프레임 수가 정해지면 T = {12, 8, 6, 4, 2, 1}을 큰 값부터 훑어 남은 예산에 들어가는 최대 타일 수 t*를 고른다.

### 3.4 progressive mixed post-training

ADS가 모든 sample을 L_max에 맞춰 주므로 학습은 프레임 수에 무관해진다. 여기에 length-balanced packing을 얹어 길이 스펙트럼 전체에서 고르게 학습하는 것이 mixed post-training이다.

L_max가 크면 짧은 sample과 긴 sample의 분포를 한 번에 맞추기가 어렵고 연산도 무겁다. 그래서 L_max를 32K, 64K, 128K 순서로 올린다. 짧은 문맥에 대한 집중이 흐려지지 않고, 어려운 긴 sample도 쉬운 것에서 넘어가며 배우게 된다. 중간 단계마다 쓸 만한 변형 모델이 남는 것도 부수적인 이점이다.

### 3.5 데이터 레시피

"diversity first, then quality" 원칙으로 오픈 데이터부터 모은다. 사람이 주석한 COIN·SlideVQA 계열과 GPT-4V/4o·Claude-3·Gemini-1.5 Pro로 자동 주석한 LLaVA-Video 계열 합성 영상을 합쳐 Open-Data라 부른다. 목록은 Table 1에 있다.

여기서 빠지는 것이 긴 영상이다. Eagle-Video-110K가 그 구멍을 메운다. Vidchapters·MiraData·InternVid-10M·Panda-70M·Vript·Shot2story·ViTT·WebVid-10M에서 후보 집합 A를 모으고, 기존 학습셋 B와 각각 10초 클립으로 잘라 CLIP feature의 코사인 유사도를 비교한다. B의 어느 클립과도 유사도가 τ = 0.5를 넘지 않는 클립만 새롭다고 보고 그 원본 영상을 채택한다.

주석은 위아래 두 방향에서 붙는다.

story-level은 top-down이다. Shot2story처럼 shot detection으로 자르면 과분할이 일어나 줄거리를 엮기 어렵다는 판단에서, 사람이 붙인 chapter를 구간으로 쓴다. chapter가 둘 미만인 영상은 버린다. 구간마다 최대 2 FPS·50프레임을 제목과 함께 GPT-4o에 넣어 dense caption을 만들고, 전체 caption과 시간 구간·chapter 제목을 GPT-4에 모아 넣어 영상 전체를 아우르는 long-form QA를 만든다.

clip-level은 bottom-up이다. 짧은 클립마다 질문 유형 풀에서 다섯 개를 무작위로 골라 GPT-4o에 QA 생성을 시킨다. 문제는 클립용 질문을 영상 전체에 그대로 붙이면 답이 충돌한다는 점이다. anchor 두 개가 이걸 막는다. 질문 안에 시간 구간을 직접 적는 time anchor, 그리고 답을 드러내지 않으면서 어느 장면인지 짚어 주는 GPT-4o 생성 textual context anchor다.

### 3.6 학습 인프라와 단계

메모리 쪽은 Triton fused operator가 PyTorch의 MLP·RMSNorm·RoPE를 대체하고, linear layer와 cross-entropy를 융합해 중간 logit 저장을 없애며, hidden state를 CPU로 offload한다. 분산 쪽은 USP 위에 Ulysses와 Ring 두 층 통신 그룹을 얹되, zigzag ring-attention 대신 all-gather KV를 쓰는 zigzag Llama3 방식 context parallelism으로 통신 지연을 줄인다. 영상은 메타데이터 파싱을 빠르게 해 sparse frame seek 비용을 낮췄고, 서빙과 평가는 vLLM으로 돌린다.

단계별 설정은 Table 8이다. Stage-1은 MLP connector 40.0M만 열어 ALLaVA 1.2M으로 학습한다(batch 1024, lr 2×10⁻⁴, max length 4096). Stage-1.5부터는 8B 전체를 열고 lr을 2×10⁻⁵로 낮춘다. 이때 Eagle-2의 Stage-1.5 가중치를 그대로 받아 써서 연산을 아꼈다(21.6M, 8192). Stage-2부터 4까지가 short+long 4.6M+4.6M을 같은 데이터로 반복하되 max length만 32768 → 65536 → 128K로 올린다. vision resolution은 전 단계 공통으로 448 × {(i, j) | i×j ≤ 12}, 토큰 수는 (i×j + 1) × 256이다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 영상 벤치마크 (Table 2)

기본 설정은 2 FPS sampling, tiling 끔, 최소 8프레임이다. Video-MME만 최대 512프레임이고 나머지는 256프레임이며, Perception-Test는 고해상도 평가를 위해 tiling을 켠다.

| 모델 | MVBench | Perception_test | EgoSchema | MLVU | LVBench | Video-MME (w/o sub) | HourVideo (dev/test) | Charade-STA mIoU |
|---|---|---|---|---|---|---|---|---|
| GPT-4o-0806 | - | - | - | - | 66.7 | 71.9 | - | 35.7 |
| Gemini-1.5-Pro | - | - | 72.2 | - | 64.0 | 75.0 | 37.2 / 37.4 | - |
| Qwen2.5-VL-8B | 69.6 | 70.5 | 65.0 | 70.2 | 56.0 | 65.1 | - | 43.6 |
| InternVL2.5-8B | 72.0 | - | - | 68.9 | 60.0 | 64.2 | - | - |
| InternVL2.5-78B | 76.4 | - | - | 75.7 | 63.6 | 72.1 | - | - |
| Qwen2.5-VL-72B | 70.4 | 73.2 | 76.2 | 74.6 | 60.7 | 73.3 | - | 50.9 |
| **Eagle2.5-8B** | **74.8** | **82.0** | 72.2 | **77.6** | **66.4** | **72.4** | **44.5 / 41.8** | **65.9** |

MLVU와 LVBench에서는 열 배 가까이 큰 InternVL2.5-78B를 넘고, Video-MME는 72B 모델 바로 아래에 붙는다. HourVideo와 Charade-STA에서 격차가 특히 크게 벌어져 시간축 인식 쪽 강점이 드러난다. CG-Bench는 Clue 55.8 · Long 46.6 · Open 45.6 · mIoU 13.4로 Claude-3.5-Sonnet과 Gemini-1.5-Pro를 모두 넘는다. 자막을 넣은 Video-MME는 75.7이다.

### 4.2 이미지 벤치마크 (Table 3)

| 모델 | DocVQA | ChartQA | InfoVQA | TextVQA | OCRBench | MMstar | RWQA | AI2D | MMMU | MMB1.1 | MathVista | Avg |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| GPT-4o-0806 | 92.8 | 85.7 | 79.2 | 77.4 | 736 | 64.7 | 75.4 | 84.6 | 69.1 | 83.1 | 63.8 | 74.9 |
| InternVL2.5-8B | 93.0 | 84.8 | 77.6 | 79.1 | 822 | 62.8 | 70.1 | 84.5 | 56.0 | 83.2 | 64.4 | 73.1 |
| Qwen2.5-VL-8B | **95.7** | 87.3 | **82.6** | **84.9** | 864 | 63.9 | 68.5 | 83.9 | **58.6** | **82.6** | **68.2** | **75.6** |
| **Eagle2.5-8B** | 94.1 | **87.5** | 80.4 | 83.7 | **869** | **66.2** | **76.7** | 84.5 | 55.8 | 81.7 | 67.8 | **75.6** |

평균 75.6으로 Qwen2.5-VL-8B와 동률이고 GPT-4o(74.9)를 웃돈다. 즉 긴 문맥을 얻으면서 짧은 문맥 능력을 잃지 않았다는 것이 이 표의 요지다. 추가 벤치마크로 SlideVQA는 dev ANLS 73.8 / test 72.7, MMLongBench-Doc은 F1 29.4 · Acc 27.7이다.

### 4.3 ablation

**long-context 데이터가 이미지 성능을 해치는가 (Table 4).** 해치지 않는다. L_max를 안 쓴 Eagle2.5-S2가 평균 74.8인데 32K에서 75.3, 64K에서 75.6, 128K에서 75.7로 오히려 조금씩 오른다.

**이미지 데이터와 pre-training이 영상 성능에 얼마나 기여하는가 (Table 5).** S1 → S2만 돌리면 MVBench 70.4 · MLVU 67.4 · Video-MME 64.9인데, S1 → S1.5 → S2로 pre-training을 끼우면 72.9 / 70.9 / 65.2, 이미지 데이터까지 섞으면 73.1 / 71.5 / 65.4가 된다. 짧은 영상(MVBench)과 쉬운 긴 영상(MLVU)에서는 효과가 크지만 어려운 held-out인 Video-MME에서는 거의 움직이지 않는다.

**information-first sampling을 빼면 (Table 6).** IAP를 빼면 고해상도가 필요한 InfoVQA가 77.6 → 76.2, 세밀한 Perception_test가 76.3 → 73.3으로 떨어진다. ADS를 빼면 MLVU가 71.5 → 70.1로 내려간다. 시각 중심 sampling이 supervision 신호를 잘라 먹은 결과로 해석한다.

**progressive와 Eagle-Video-110K (Table 7, Figure 6).** 같은 Open-Data로 32K → 64K 단계 학습이 73.0 / 74.5 / 68.1, 곧장 64K 학습이 71.3 / 74.0 / 67.9다. 여기에 Eagle-Video-110K를 더하면 73.9 / 75.1 / 68.8까지 오른다. Figure 6은 그 차이가 어디서 나오는지 보여 준다. 128프레임 이상 구간에서 Eagle-Video-110K를 뺀 곡선이 먼저 꺾인다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

논문에 별도 limitations 절이 없다. 결론은 성과 요약으로 끝난다. 아래는 본문 수치와 공개 조건에서 읽히는 제약이다.

- 다중 페이지 문서 추론은 아직 낮다. MMLongBench-Doc F1 29.4 · Acc 27.7은 다른 벤치마크 성적과 확연히 다른 수준이다.
- 어려운 long video에서는 이미지 데이터를 늘려도 잘 안 먹힌다(Table 5의 Video-MME 65.2 → 65.4).
- Eagle-Video-110K 주석이 GPT-4o·GPT-4 출력에 의존한다. 상용 모델의 품질과 이용 약관이 그대로 데이터셋의 제약으로 넘어온다.
- 공개 크기가 8B 하나뿐이라 이 레시피의 scaling law는 논문에서 확인할 수 없다.
- 가중치는 CC BY-NC 4.0 또는 NVIDIA License의 research preview로, 비상업적 용도로 제한된다(저장소 기준).

## 6. 관련 연구 (Related Work)

long-context VLM은 두 갈래로 나뉜다. 하나는 question-guided compression이나 token reduction 같은 전용 모듈을 붙이는 쪽이고, 다른 하나는 LongVA·LongVILA·LongViTA처럼 LLM의 context 자체를 늘리는 쪽이다. Eagle 2.5는 후자에 속하면서 모듈을 하나도 안 붙이는 자리를 택했다. 논문이 지적하는 기존 확장 시도의 문제는 상용 모델에 못 미친다는 점, 시각 입력을 늘려도 성능이 따라 오르지 않는다는 점, 그리고 학습 전략과 데이터 레시피가 정리되지 않았다는 점이다.

구조 계보는 LLaVA(MLP projection) → LLaVA-1.5·InternVL(image tiling)이고, 인코더는 SigLIP, LLM은 Qwen2.5다.

데이터 쪽 차별점은 story-level 주석이다. Shot2story가 shot 단위로 자르고 그 위에 줄거리를 엮는 데 반해, 이쪽은 사람이 이미 붙여 둔 chapter를 그대로 구간으로 삼는다.

## 7. 용어집 (Glossary)

도메인 공통 용어는 [[glossary-llms]]에 위임하고, 이 자료 고유의 이름만 적는다.

| 용어 | 뜻 |
|---|---|
| Eagle 2.5 | NVIDIA Eagle 계열의 세 번째 VLM. 공개 모델은 Eagle2.5-8B 하나다 |
| Eagle-Video-110K | 이 논문이 만든 긴 영상 데이터셋. story-level과 clip-level 주석을 겹쳐 넣었다 |
| information-first sampling | 텍스트를 먼저 온전히 확보하고 남은 예산으로만 시각 입력을 조정하는 sampling 원칙. IAP와 ADS 둘을 묶는 상위 이름이다 |
| image area preservation (IAP) | 원본 면적의 60% 이상을 남기면서 종횡비도 맞추도록 tiling 격자를 고르는 규칙 |
| automatic degradation sampling (ADS) | 시각 예산 안에서 타일 수와 프레임 수를 단계적으로 낮춰 맞추는 sampling 절차 |
| progressive mixed post-training | 최대 시퀀스 길이를 32K → 64K → 128K로 올려 가며 학습하는 post-training 스케줄 |
| length-balanced packing | 길이가 제각각인 sample을 한 배치에 채울 때 길이 분포가 치우치지 않게 묶는 방식 |
| image tiling | 큰 이미지를 448픽셀 정사각 타일 격자로 잘라 각각 인코딩하는 고해상도 처리 방식 |
| story-level 주석 | 사람이 붙인 chapter를 구간으로 삼아 영상 전체 줄거리를 담는 top-down 주석 |
| clip-level 주석 | 짧은 클립마다 GPT-4o로 QA를 만드는 bottom-up 주석 |
| time anchor · textual context anchor | 클립용 질문을 영상 전체에 붙일 때 답 충돌을 막는 두 장치. 각각 시간 구간을 명시하고, 답을 드러내지 않는 맥락 문장을 덧붙인다 |
| context parallelism | 하나의 긴 시퀀스를 여러 GPU에 나눠 attention을 계산하는 분산 방식. USP·Ulysses·Ring이 그 구현이다 |
| Video-MME | 이 논문의 대표 지표로 쓰인 영상 이해 벤치마크. 자막 유무를 나눠 보고한다 |

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 1 | Video-MME 프레임 수 대비 성능 곡선 | caption-region | ★ wiki 권장 (result) |
| fig02 | 4 | 모델 구조 — sampling · SigLIP · MLP connector · LLM | manual | ★ wiki 권장 (architecture) |
| fig03 | 4 | image area preservation 비교 | caption-region | ★ wiki 권장 (method) |
| fig04 | 7 | Open-Data와 Eagle-Video-110K의 영상 길이 분포 | manual | ★ wiki 권장 (data) |
| fig05 | 8 | Eagle-Video-110K 주석 파이프라인 | caption-region | ★ wiki 권장 (method) |
| fig06 | 11 | progressive 스케줄·데이터셋별 프레임 확장 곡선 | caption-region | ★ wiki 권장 (ablation) |
| tab01 | 7 | Open-Data 데이터셋 목록 | table-region | (확인 필요 — 목록이 길어 본문 인용으로 충분) |
| tab02 | 9 | 영상 벤치마크 SoTA 비교 | table-region | ★ wiki 권장 (result) |
| tab03 | 9 | 이미지 벤치마크 SoTA 비교 | table-region | ★ wiki 권장 (result) |
| tab04 | 10 | long-context 데이터 → 이미지 성능 | table-region | (확인 필요 — 본문 표로 대체) |
| tab05 | 10 | 이미지 데이터·pre-training → 영상 성능 | table-region | (확인 필요) |
| tab06 | 10 | information-first sampling ablation | table-region | (확인 필요) |
| tab07 | 11 | Eagle-Video-110K·스케줄 ablation | table-region | (확인 필요) |
| tab08 | 12 | Stage-1 ~ Stage-4 학습 설정 | manual | ★ wiki 권장 (method) |
| tab09 | 13 | SlideVQA 성능 | table-region | (확인 필요) |
| tab10 | 13 | MMLongBench-Doc 성능 | table-region | (확인 필요) |
| tab11 | 17 | Stage-1.5·Stage-2 데이터셋 목록 | table-region | (확인 필요) |
| tab12 | 18 | clip-level QA 질문 유형 분류 | table-region | (확인 필요) |
