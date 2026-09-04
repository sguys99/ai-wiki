---
title: "Eagle 2.5: Boosting Long-Context Post-Training for Frontier Vision-Language Models"
type: paper
year: 2025
category: llms
raw_path: /Users/kmyu/Desktop/project/ai-wiki/raw/papers/chen-2025-eagle-25-boosting-long-context-post-training.pdf
raw_filename: "chen-2025-eagle-25-boosting-long-context-post-training.pdf"
source_collection: external
source: chen-2025-eagle-25-boosting-long-context-post-training.md
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

## 요약 (Summary)

NVIDIA Eagle 계열 VLM의 세 번째 릴리스이자 GR00T N1.5의 VLM backbone이다. 긴 영상과 고해상도 이미지를 다루려고 압축 모듈을 새로 붙이는 대신 세 가지만 바꿨다. 텍스트를 먼저 온전히 확보하고 남은 예산으로만 시각 입력을 깎는 sampling 규칙, 최대 시퀀스 길이를 32K에서 128K까지 단계적으로 올리는 post-training 스케줄, 그리고 사람이 붙인 chapter를 구간으로 삼은 Eagle-Video-110K 데이터셋이다.

결과는 Eagle2.5-8B가 512프레임 Video-MME에서 72.4를 기록한 것이다. GPT-4o(71.9)를 넘고 Qwen2.5-VL-72B(73.3)에 근접한다. 프레임을 16개에서 512개까지 늘리는 동안 성능이 꺾이지 않고 계속 오른다는 점이 이 논문의 실질적인 주장이다. 비교 모델들은 64~128프레임 근처에서 곡선이 평평해지거나 내려간다.

![[assets/chen-2025-eagle-25-boosting-long-context-post-training/fig01.png]]
*Figure 1: Video-MME에서 입력 프레임 수를 늘렸을 때의 성능 곡선. Eagle-2.5-8B만 512프레임까지 단조 증가한다 (Chen 2025, p.1).*

## 주요 기여 (Key Contributions)

1. **information-first sampling** — image area preservation과 automatic degradation sampling 둘을 묶는 이름. 고정 FPS·고정 해상도로 시각 입력을 먼저 뽑던 관행을 뒤집는다.
2. **progressive mixed post-training** — L_max를 32K → 64K → 128K로 올린다. 같은 데이터로 처음부터 64K를 학습하는 것보다 성적이 낫다.
3. **Eagle-Video-110K** — 오픈 데이터에 없던 긴 영상 구간을 메우는 데이터셋. story-level과 clip-level 주석을 겹쳐 넣었다.
4. **긴 문맥을 얻으면서 짧은 문맥을 잃지 않았다** — 이미지 벤치마크 평균 75.6으로 Qwen2.5-VL-8B와 동률이고 GPT-4o(74.9)를 웃돈다.
5. **long-context 학습 인프라** — Triton fused operator, USP 기반 context parallelism, 영상 디코딩 가속, vLLM 서빙을 한 파이프라인으로 묶었다.

## 방법론 및 아키텍처 (Methodology and Architecture)

구조 자체는 LLaVA 계보 그대로다. SigLIP 계열 vision encoder가 만든 임베딩을 MLP projection layer가 LLM 표현 공간에 맞추고, LLM은 Qwen2.5-7B-Instruct다. 합쳐 8B다. 임의 해상도는 image tiling으로 받는다. image tiling은 큰 이미지를 448픽셀 정사각 타일 격자로 잘라 각각 인코딩하는 방식이다.

압축이나 선택 모듈을 일부러 넣지 않은 것이 이 논문의 설계 결정이다. 긴 입력에만 최적화한 특수 모듈이 범용성을 깎는다고 봤고, 대신 무엇을 얼마나 넣을지 고르는 규칙 쪽에 손을 댔다.

![[assets/chen-2025-eagle-25-boosting-long-context-post-training/fig02.png]]
*Figure 2: 모델 구조. information-first sampling이 고른 시각 입력이 SigLIP 인코더와 MLP connector를 지나 LLM으로 들어간다 (Chen 2025, p.4).*

### information-first sampling

image area preservation은 tiling 격자를 고르는 규칙이다. 기존 방식은 종횡비 제약이 빡빡해서 원본을 줄여 격자에 맞춰야 했고, 그러면 고해상도를 살리려던 tiling의 목적이 반감된다. Eagle 2.5는 원본 면적의 60% 이상을 남기는 조건과 타일 비율을 원본 종횡비에 맞추는 조건의 곱을 최대화하는 격자를 고른다. 면적 항은 60%에 못 미칠 때만 벌점을 주고 그 위로는 더 보상하지 않으므로, 종횡비가 어긋난 큰 격자를 고르는 일이 없다.

![[assets/chen-2025-eagle-25-boosting-long-context-post-training/fig03.png]]
*Figure 3: image area preservation. (a) 고정 종횡비 tiling은 2000×1300 이미지의 일부만 덮지만 (b) 면적 우선 tiling은 원본 대부분을 담는다 (Chen 2025, p.4).*

automatic degradation sampling은 예산 배분 규칙이다. 텍스트 토큰 길이를 먼저 확정하고 나머지만 시각 예산으로 쓴다. 텍스트가 잘릴 일이 없다는 뜻이다. 그 예산 안에서 두 단계로 내려간다. 먼저 타일 수를 1로 두고 2 FPS를 목표로 프레임 수를 정하는데, 프레임과 페이지는 하나당 256 토큰으로 고정이라 계산이 단순하다. 최소 프레임 수조차 못 채우는 sample은 버린다. 프레임 수가 정해지면 12, 8, 6, 4, 2, 1 순으로 훑어 남은 예산에 들어가는 가장 큰 타일 수를 고른다.

### progressive mixed post-training

ADS가 모든 sample을 L_max에 맞춰 주므로 학습이 프레임 수에 무관해진다. 여기에 length-balanced packing을 얹어 길이 스펙트럼 전체에서 고르게 학습한다. L_max가 커지면 짧은 sample과 긴 sample의 분포를 한 번에 맞추기 어렵고 연산도 무거워서, 32K·64K·128K 세 단계로 나눠 올린다.

![[assets/chen-2025-eagle-25-boosting-long-context-post-training/tab08.png]]
*Table 8: 단계별 학습 설정. Stage-1은 MLP connector 40.0M만 열고, Stage-1.5부터 8B 전체를 학습한다. max length가 4096 → 8192 → 32768 → 65536 → 128K로 올라간다 (Chen 2025, p.12).*

Stage-1.5는 Eagle-2의 Stage-1.5 가중치를 그대로 받아 써서 연산을 아꼈다. vision resolution은 전 단계 공통으로 448 × {(i, j) | i×j ≤ 12}, 토큰 수는 (i×j + 1) × 256이다.

### Eagle-Video-110K

오픈 데이터를 모아 보면 긴 영상이 부족하다. 아래 분포가 그 공백을 보여 준다. Open-Data는 1,500초 근처에서 사실상 끊기고, Eagle-Video-110K가 그 위 구간을 채운다.

![[assets/chen-2025-eagle-25-boosting-long-context-post-training/fig04.png]]
*Figure 4: Open-Data와 Eagle-Video-110K의 영상 길이 분포. 세로축은 로그 스케일이다 (Chen 2025, p.7).*

수집은 다양성 기준이다. Vidchapters·MiraData·InternVid-10M·Panda-70M·Vript·Shot2story·ViTT·WebVid-10M에서 후보를 모으고, 기존 학습셋과 10초 클립 단위로 CLIP feature 코사인 유사도를 재서 최대 유사도가 0.5를 넘지 않는 클립만 새롭다고 본다.

주석은 위아래 두 방향에서 붙는다. story-level은 shot detection 대신 사람이 붙인 chapter를 구간으로 쓴다. shot 단위로 자르면 과분할이 일어나 줄거리를 엮기 어렵다는 판단이다. 구간마다 GPT-4o로 dense caption을 만들고, 전체 caption과 시간 구간·chapter 제목을 GPT-4에 모아 넣어 영상 전체를 아우르는 QA를 만든다. clip-level은 짧은 클립마다 질문 유형 다섯 개를 골라 GPT-4o로 QA를 만든다. 클립용 질문을 영상 전체에 그대로 붙이면 답이 충돌하므로, 질문에 시간 구간을 적는 time anchor와 답을 드러내지 않고 장면만 짚는 textual context anchor를 함께 넣는다.

![[assets/chen-2025-eagle-25-boosting-long-context-post-training/fig05.png]]
*Figure 5: Eagle-Video-110K 주석 파이프라인. 왼쪽이 bottom-up clip-level, 오른쪽이 top-down story-level이다 (Chen 2025, p.8).*

## 결과 (Results)

영상 평가는 2 FPS sampling에 tiling을 끄고 최소 8프레임을 보장한다. Video-MME만 최대 512프레임이고 나머지는 256프레임, Perception-Test는 고해상도 평가를 위해 tiling을 켠다.

![[assets/chen-2025-eagle-25-boosting-long-context-post-training/tab02.png]]
*Table 2: 영상 벤치마크 SoTA 비교. MLVU 77.6과 LVBench 66.4는 InternVL2.5-78B를 넘는 수치다 (Chen 2025, p.9).*

| 항목 | Eagle2.5-8B | 비교 |
|---|---|---|
| Video-MME (w/o sub) | 72.4 | GPT-4o 71.9 · Qwen2.5-VL-72B 73.3 |
| MLVU | 77.6 | InternVL2.5-78B 75.7 |
| LVBench | 66.4 | InternVL2.5-78B 63.6 |
| Perception_test | 82.0 | Qwen2.5-VL-72B 73.2 |
| HourVideo (dev/test) | 44.5 / 41.8 | Gemini-1.5-Pro 37.2 / 37.4 |
| Charade-STA mIoU | 65.9 | Qwen2.5-VL-72B 50.9 |

HourVideo와 Charade-STA에서 격차가 특히 크다. 시간축을 짚어 내는 쪽에 강점이 있다는 뜻이다.

![[assets/chen-2025-eagle-25-boosting-long-context-post-training/tab03.png]]
*Table 3: 이미지 벤치마크 SoTA 비교. 평균 75.6으로 Qwen2.5-VL-8B와 동률이다 (Chen 2025, p.9).*

이미지 쪽 평균 75.6은 GPT-4o(74.9)를 웃돈다. OCRBench 869와 RWQA 76.7이 표에서 가장 앞선 항목이고, MMMU 55.8과 MMB1.1 81.7은 Qwen2.5-VL-8B에 조금 뒤진다. 추가 벤치마크로 SlideVQA는 dev ANLS 73.8 / test 72.7, MMLongBench-Doc은 F1 29.4 · Acc 27.7이다.

### ablation

long-context 데이터를 넣는다고 이미지 성능이 깎이지는 않는다. L_max를 안 쓴 모델이 평균 74.8인데 32K에서 75.3, 64K에서 75.6, 128K에서 75.7로 오히려 조금씩 오른다.

information-first sampling을 하나씩 빼면 어디가 무너지는지 드러난다. IAP를 빼면 고해상도가 필요한 InfoVQA가 77.6에서 76.2로, 세밀한 Perception_test가 76.3에서 73.3으로 떨어진다. ADS를 빼면 MLVU가 71.5에서 70.1로 내려간다.

스케줄 쪽은 32K → 64K 단계 학습이 MVBench 73.0 · MLVU 74.5 · Video-MME 68.1이고, 곧장 64K를 학습하면 71.3 / 74.0 / 67.9다. 여기에 Eagle-Video-110K를 더하면 73.9 / 75.1 / 68.8이 된다.

![[assets/chen-2025-eagle-25-boosting-long-context-post-training/fig06.png]]
*Figure 6: 스케줄과 데이터셋별 프레임 확장 곡선. Eagle-Video-110K를 뺀 64K 모델은 128프레임 위에서 먼저 꺾인다 (Chen 2025, p.11).*

## VLA backbone으로서의 위치 (Role as a VLA Backbone)

Eagle 계열은 GR00T의 VLM backbone 공급처였다. 저장소 기록으로 Eagle 2가 GR00T N1의 System 2, Eagle 2.5가 GR00T N1.5, native resolution 변형 Eagle이 GR00T N1.6의 backbone이다. N1.7에서 `nvidia/Cosmos-Reason2-2B`로 갈아타면서 이 계보는 끊긴다.

이름이 겹치는 지점에 주의가 필요하다. [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation|GR00T N1]]이 쓰는 Eagle-2는 SmolLM2와 SigLIP-2에서 fine-tuning한 소형 변형이고, [[llms/nvlabs-eagle|저장소 model zoo]]가 배포하는 Eagle2-1B/2B/9B는 Qwen2.5 기반이다. 같은 이름의 다른 조합이므로 backbone을 특정할 때는 어느 계보인지 확인해야 한다.

이 논문이 VLA backbone으로서 의미를 갖는 이유는 결국 세 가지다. 영상 프레임을 늘려도 성능이 꺾이지 않으니 로봇의 시간축 관찰을 길게 넣을 여지가 생기고, 고해상도 tiling이 살아 있어 세밀한 장면 인식이 유지되며, 128K context window가 다중 카메라와 긴 지시문을 함께 담을 여유를 준다.

## 한계 (Limitations)

논문에 별도 limitations 절이 없다. 아래는 본문 수치와 공개 조건에서 읽히는 제약이다.

- 다중 페이지 문서 추론은 아직 낮다. MMLongBench-Doc F1 29.4 · Acc 27.7은 다른 성적과 확연히 다른 수준이다.
- 어려운 long video에는 이미지 데이터를 늘려도 잘 안 먹힌다. Video-MME는 65.2에서 65.4로 거의 움직이지 않는다.
- Eagle-Video-110K 주석이 GPT-4o·GPT-4 출력에 의존한다. 상용 모델의 품질과 이용 약관이 그대로 데이터셋의 제약으로 넘어온다.
- 공개 크기가 8B 하나뿐이라 이 레시피의 scaling law는 논문에서 확인할 수 없다.
- 가중치는 CC BY-NC 4.0 또는 NVIDIA License의 research preview로 비상업적 용도에 한정된다.

## 관련 페이지 (Related Pages)

- [[llms/nvlabs-eagle]] — 이 논문의 공식 저장소. 계보와 model zoo, GR00T 채택 이력이 거기 있다
- [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation]] — Eagle-2를 System 2로 쓴 VLA. 이 논문은 그 다음 세대인 N1.5의 backbone이다
- [[physical-ai/nvidia-isaac-gr00t]] — N1.7에서 backbone이 Cosmos-Reason2-2B로 바뀐 후속 저장소
- [[llms/cai-2026-vlm3-vision-language-models]] — 같은 "표준 VLM을 건드리지 않고 데이터·표현만 바꾼다"는 노선의 3D 판본
- [[physical-ai/cui-2025-openhelix-a-short-survey-empirical]] — VLM을 System 2로 쓰는 dual-system VLA의 설계 공간 정리
- [[overviews/glossary-llms]] — 용어 표기 기준

## 외부 참조 (External References)

- 논문: <https://arxiv.org/abs/2504.15271>
- 코드: <https://github.com/NVlabs/EAGLE>
- 가중치: <https://huggingface.co/nvidia/Eagle2.5-8B>
