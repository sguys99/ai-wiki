---
title: "HiVLA: A Visual-Grounded-Centric Hierarchical Embodied Manipulation System"
type: paper
year: 2026
category: physical-ai
raw_path: raw/papers/yang-2026-hivla-a-visual-grounded-centric-hierarchical-embodied.pdf
raw_filename: "yang-2026-hivla-a-visual-grounded-centric-hierarchical-embodied.pdf"
source_collection: external
authors: "Tianshuo Yang, Guanyu Chen (공동 1저자), Yutian Chen, Zhixuan Liang, Yitian Liu, Zanxin Chen, Chunpu Xu, Haotian Liang, Jiangmiao Pang, Yao Mu, Ping Luo (교신 Yao Mu, Ping Luo)"
arxiv_id: "2604.14125"
url: "https://arxiv.org/abs/2604.14125"
tags: [physical-ai, vla, manipulation, robot-learning, benchmark]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/yang-2026-hivla-a-visual-grounded-centric-hierarchical-embodied/fig01.png
    raw: raw/papers/yang-2026-hivla-a-visual-grounded-centric-hierarchical-embodied-figures/fig01.png
    caption: "HiVLA 시스템 개요와 RoboTwin 성공률 비교. 왼쪽은 1920×1080 원본 이미지와 지시문을 VLM이 받아 384×384 크롭 두 장을 만들고 DiT action expert가 action 시퀀스를 내는 흐름이고, 오른쪽은 9개 과제 레이더 차트와 전체 평균 막대 그래프다"
    page: 2
    bbox_norm: [0.1667, 0.1095, 0.8382, 0.2662]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/yang-2026-hivla-a-visual-grounded-centric-hierarchical-embodied/fig02.png
    raw: raw/papers/yang-2026-hivla-a-visual-grounded-centric-hierarchical-embodied-figures/fig02.png
    caption: "HiVLA 파이프라인. (a) VLM이 지시문과 observation을 받아 subtask 문장과 대상 물체의 bounding box를 내고 그 좌표로 고해상도 국소 크롭을 뽑는다. (b) DiT 블록은 self-attention 뒤에 global 이미지, local 이미지, 언어 토큰을 차례로 받는 cross-attention 세 층과 FFN으로 구성된다"
    page: 5
    bbox_norm: [0.1978, 0.0634, 0.8789, 0.3162]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/yang-2026-hivla-a-visual-grounded-centric-hierarchical-embodied/fig03.png
    raw: raw/papers/yang-2026-hivla-a-visual-grounded-centric-hierarchical-embodied-figures/fig03.png
    caption: "평가 과제 시각화. 위쪽은 RoboTwin 시뮬레이터의 Stack 3 Blocks, Place Shoe, Click 3 Bells, Stamp Seal, Lift Pot, Click Clock이고 아래쪽은 실제 로봇의 블록, 컵, 벨 배치 장면이다"
    page: 9
    bbox_norm: [0.1848, 0.1129, 0.842, 0.2802]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/yang-2026-hivla-a-visual-grounded-centric-hierarchical-embodied/fig04.png
    raw: raw/papers/yang-2026-hivla-a-visual-grounded-centric-hierarchical-embodied-figures/fig04.png
    caption: "RoboTwin 9개 과제의 실행 장면 연속 프레임 (부록)"
    page: 25
    bbox_norm: [0.2104, 0.2127, 0.7951, 0.7442]
    strategy: caption-region
    curated: false
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/yang-2026-hivla-a-visual-grounded-centric-hierarchical-embodied/fig05.png
    raw: raw/papers/yang-2026-hivla-a-visual-grounded-centric-hierarchical-embodied-figures/fig05.png
    caption: "실제 로봇 과제의 실행 장면 연속 프레임 (부록)"
    page: 26
    bbox_norm: [0.2104, 0.2582, 0.7951, 0.6988]
    strategy: caption-region
    curated: false
  - id: tab01
    label: Table 1
    kind: table
    file: assets/yang-2026-hivla-a-visual-grounded-centric-hierarchical-embodied/tab01.png
    raw: raw/papers/yang-2026-hivla-a-visual-grounded-centric-hierarchical-embodied-figures/tab01.png
    caption: "RoboTwin 시뮬레이터 9개 과제 성공률. Easy 4개와 Hard 5개로 나누어 π0, π0.5, StarVLA, H-RDT, Ours w/o Skill, Ours를 비교한다"
    page: 10
    bbox_norm: [0.2147, 0.1945, 0.7951, 0.409]
    strategy: table-region
    curated: true
  - id: tab02
    label: Table 2
    kind: table
    file: assets/yang-2026-hivla-a-visual-grounded-centric-hierarchical-embodied/tab02.png
    raw: raw/papers/yang-2026-hivla-a-visual-grounded-centric-hierarchical-embodied-figures/tab02.png
    caption: "guidance 교란에 대한 action expert의 robustness. bounding box, 언어, 양쪽에 0%에서 100%까지 오류를 주입했을 때의 성공률 변화다"
    page: 12
    bbox_norm: [0.2546, 0.1806, 0.7503, 0.2726]
    strategy: table-region
    curated: true
  - id: tab03
    label: Table 3
    kind: table
    file: assets/yang-2026-hivla-a-visual-grounded-centric-hierarchical-embodied/tab03.png
    raw: raw/papers/yang-2026-hivla-a-visual-grounded-centric-hierarchical-embodied-figures/tab03.png
    caption: "실제 로봇 성공률. 벨 누르기와 컵, 블록 옮기기를 단일 물체와 다중 물체 배치로 나누어 H-RDT와 30회 시행 기준으로 비교한다"
    page: 13
    bbox_norm: [0.2519, 0.1787, 0.7415, 0.2517]
    strategy: table-region
    curated: true
  - id: tab04
    label: Table 4
    kind: table
    file: assets/yang-2026-hivla-a-visual-grounded-centric-hierarchical-embodied/tab04.png
    raw: raw/papers/yang-2026-hivla-a-visual-grounded-centric-hierarchical-embodied-figures/tab04.png
    caption: "ablation 결과. (A) cross-attention 주입 순서 여섯 가지 비교와 (B) 고해상도 크롭 제거 및 absolute positional encoding 제거의 영향이다"
    page: 14
    bbox_norm: [0.2405, 0.1743, 0.7645, 0.3889]
    strategy: table-region
    curated: true
  - id: tab05
    label: Table 5
    kind: table
    file: assets/yang-2026-hivla-a-visual-grounded-centric-hierarchical-embodied/tab05.png
    raw: raw/papers/yang-2026-hivla-a-visual-grounded-centric-hierarchical-embodied-figures/tab05.png
    caption: "DiT action expert의 하이퍼파라미터와 아키텍처 사양 (부록)"
    page: 20
    bbox_norm: [0.3006, 0.1807, 0.7158, 0.6145]
    strategy: table-region
    curated: false
  - id: tab06
    label: Table 6
    kind: table
    file: assets/yang-2026-hivla-a-visual-grounded-centric-hierarchical-embodied/tab06.png
    raw: raw/papers/yang-2026-hivla-a-visual-grounded-centric-hierarchical-embodied-figures/tab06.png
    caption: "VLM planner 평가. 모델 규모별 zero-shot 성적과 fine-tuning 후 성적을 grounding mIoU와 subtask 정확도로 비교하고 visual history 제거 효과를 함께 싣는다"
    page: 21
    bbox_norm: [0.215, 0.2083, 0.7905, 0.3805]
    strategy: table-region
    curated: true
  - id: tab07
    label: Table 7
    kind: table
    file: assets/yang-2026-hivla-a-visual-grounded-centric-hierarchical-embodied/tab07.png
    raw: raw/papers/yang-2026-hivla-a-visual-grounded-centric-hierarchical-embodied-figures/tab07.png
    caption: "VLM planner에 주는 시스템 프롬프트 전문 (부록)"
    page: 23
    bbox_norm: [0.2104, 0.2854, 0.8012, 0.7532]
    strategy: table-region
    curated: false
  - id: tab08
    label: Table 8
    kind: table
    file: assets/yang-2026-hivla-a-visual-grounded-centric-hierarchical-embodied/tab08.png
    raw: raw/papers/yang-2026-hivla-a-visual-grounded-centric-hierarchical-embodied-figures/tab08.png
    caption: "시뮬레이션과 실제 로봇 과제별 자연어 지시문 목록 (부록)"
    page: 24
    bbox_norm: [0.2104, 0.3353, 0.8138, 0.6895]
    strategy: table-region
    curated: false
---

## 한 줄 요약 (One-line Summary)

HiVLA는 VLM planner가 내는 subtask 문장과 bounding box를 인터페이스로 삼아 상위 계획과 하위 제어를 분리한 계층형 manipulation 시스템으로, DiT action expert 안에 global 이미지, 고해상도 국소 크롭, 언어를 차례로 받는 cascaded cross-attention을 두어 RoboTwin 2.0 9개 과제 평균 83.3%를 기록했다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 제목 | HiVLA: A Visual-Grounded-Centric Hierarchical Embodied Manipulation System |
| 저자 | Tianshuo Yang과 Guanyu Chen 공동 1저자 외 9인, 교신 Yao Mu와 Ping Luo |
| 소속 | The University of Hong Kong, Shanghai AI Laboratory, Shanghai Jiao Tong University, The Chinese University of Hong Kong |
| arXiv | 2604.14125v2 (2026년 5월 10일) |
| 프로젝트 페이지 | https://tianshuoy.github.io/HiVLA-page/ |
| 분량 | 본문 15쪽에 부록 8쪽, 그림 5개와 표 8개 |
| 키워드 | Vision-Language-Action Models, VLM Agent Systems |

## 2. 주요 기여 (Key Contributions)

논문이 내세우는 기여는 세 가지다.

1. **visual grounding을 인터페이스로 삼은 계층 구조.** VLM은 계획만 담당하고 하위 제어에는 fine-tuning되지 않으므로 catastrophic forgetting이 발생하지 않는다. 두 모듈을 잇는 인터페이스는 subtask 문장 하나와 대상 물체의 bounding box 하나로 이뤄진 구조화된 계획이다. VLM과 action expert를 서로 독립적으로 교체하거나 개선할 수 있다.
2. **cascaded cross-attention.** DiT action expert의 각 블록 안에서 global 시각 문맥, 절대 위치 정보를 더한 고해상도 국소 특징, subtask 언어 임베딩을 순서대로 주입한다. 하나의 cross-attention에 여러 조건을 합쳐 넣지 않고 층을 나눠 쌓은 점이 기존 구조와 다르다.
3. **시뮬레이션과 실제 로봇 양쪽 평가.** RoboTwin 2.0에서 π0 대비 37.7%p, H-RDT 대비 12.7%p 높은 전체 평균을 얻었고, 실제 로봇의 다중 물체 배치에서 baseline이 거의 실패하는 조건을 통과했다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 문제 설정과 출발점

논문은 end-to-end VLA가 안고 있는 절충을 출발점으로 삼는다. 단일 시스템 계열(RT-2, OpenVLA)과 dual-system VLA 계열(π0, GR00T-N1.5)은 모두 시각 추론과 저수준 action 생성을 한 모델 안에서 묶는다. 이 구조에서 VLM을 좁은 manipulation 데이터로 fine-tuning하면 웹 규모에서 얻은 추론 능력이 손상되는데, 이것이 catastrophic forgetting이다.

계층형 시스템은 대안이지만 두 모듈을 잇는 중간 표현이 성패를 가른다. 논문은 기존 중간 표현이 두 방향 중 하나로 치우쳐 있다고 정리한다. 국소 크롭만 쓰면 물체의 절대 좌표 정보가 사라지고(InterleaveVLA), 축소된 전역 이미지에 마스크를 씌우면 정밀 조작에 필요한 세부가 사라진다(DexGraspVLA). 따라서 논문이 세우는 질문은 고해상도 국소 외형, 정확한 전역 공간 인식, 명시적 skill 지시문을 모두 활용하는 policy를 어떻게 설계하느냐다.

형식화는 조건부 시퀀스 생성 문제다. 시각 입력은 K대의 카메라에서 오는 1920×1080 해상도 이미지 집합이고, 여기에 관절 위치와 그리퍼 상태를 담은 14차원 proprioceptive 상태가 더해진다. policy는 관찰 이력과 지시문을 받아 예측 구간 H 동안의 action 시퀀스를 낸다.

### 3.2 VLM Planner Agent

planner는 매 결정 시점에 다섯 가지 입력을 받는다. 전체 목표 지시문, 그리퍼 상태, 직전에 실행한 subtask, 직전 action 이후의 장면 이미지, 그리고 현재 장면 이미지다. 시각 이력을 함께 주는 이유는 manipulation이 순차 과제라서 무엇이 이미 끝났는지를 알아야 다음 단계를 고를 수 있기 때문이다.

출력은 네 개의 키를 가진 JSON 객체다.

| 키 | 내용 |
|---|---|
| `next_subtask_description` | 다음에 수행할 subtask를 설명하는 문장 |
| `action_type` | `pick` 또는 `place` |
| `target_object` | 대상 물체 이름. pick이면 집을 물체, place면 올려놓을 대상 |
| `bbox` | `[ymin, xmin, ymax, xmax]` 형식의 정규화 bounding box. 좌표 범위는 0에서 1000 |

논문은 planner를 도구를 쓰는 에이전트로 본다. bounding box는 결과값이 아니라 Image Crop 도구를 호출하는 지시로 취급되고, 이 도구가 1920×1080 원본에서 물체 중심의 고해상도 패치를 잘라낸다. subtask 문장과 잘라낸 패치가 함께 DiT action expert로 전달되며, action expert 자체도 planner가 의도를 물리 동작으로 옮기기 위해 마지막으로 호출하는 도구로 서술된다.

과제 분해의 세밀함은 난이도에 따라 달라진다. 단순한 지시문은 subtask 하나로 끝나고, "블록 세 개를 쌓아라" 같은 long-horizon 과제는 primitive skill과 대상 물체를 짝지은 subtask 여러 개로 나뉜다.

### 3.3 DiT Action Expert의 flow matching

action expert는 조건부 확률 분포를 모델링하는 DiT다. 학습 방식은 Conditional Flow Matching이며, 표준 정규분포에서 뽑은 잡음과 목표 action 시퀀스 사이를 선형 보간으로 잇는 경로를 정의한다.

연속 시간 변수를 0에서 1까지 두고, 0에서는 순수 잡음이고 1에서는 목표 action 시퀀스가 되도록 경로를 설정한다. 신경망은 잡음에서 데이터로 향하는 벡터장을 예측하도록 학습되고, 손실은 예측 벡터장과 목표 벡터장 사이의 L2 거리다.

추론은 학습된 벡터장이 정의하는 상미분방정식을 푸는 방식이다. 잡음 표본에서 시작해 전진 오일러법 같은 수치 해법으로 0에서 1까지 적분하면 조건에 맞는 action 시퀀스가 결정론적으로 나온다.

### 3.4 cascaded cross-attention

핵심 구조는 각 Transformer 블록 안에서 세 종류의 조건을 순서대로 주입하는 cross-attention 층이다. 입력 토큰은 현재 proprioceptive 상태와 잡음이 섞인 미래 action 시퀀스이며, 각각 전용 MLP 어댑터로 은닉 차원에 사영된다. diffusion 시각 변수는 임베딩으로 부호화한 뒤 Adaptive Layer Normalization으로 각 블록에 주입된다.

| 순서 | 조건 | 출처 | 역할 |
|---|---|---|---|
| 1 | global 시각 문맥 | 여러 시점 이미지를 DINOv2와 SigLIP 결합 인코더로 처리한 토큰 | 장면 전체의 물체 관계와 작업 공간 배치를 거칠게 파악한다 |
| 2 | 위치 인식 국소 특징 | bounding box로 1920×1080 원본에서 잘라낸 패치를 같은 인코더로 처리한 토큰 | 대상 물체의 고해상도 외형과 원본 좌표계 안의 정확한 위치를 제공한다 |
| 3 | subtask 언어 | subtask 문장을 부호화한 언어 임베딩 | pick, place, push 같은 필요 skill의 의미를 지정한다 |

국소 특징에는 절대 공간 정보를 명시적으로 더한다. 크롭 안의 각 패치 토큰에 대해 원본 고해상도 프레임 안에서의 중심 좌표를 계산하고, 그 좌표를 DETR 방식의 고정 sinusoidal positional encoding으로 바꿔 국소 특징 토큰에 원소별로 더한다. 크롭만 쓰면 사라지는 절대 좌표를 이 항이 되살린다.

모든 블록을 통과한 뒤 action 시퀀스에 대응하는 은닉 상태는 MLP 기반 디코더를 거쳐 로봇의 원래 action 공간으로 사상된다. 이 디코더도 시각 임베딩으로 변조된다.

### 3.5 아키텍처 사양과 학습 설정

action expert의 backbone은 H-RDT를 따르며, RMSNorm과 SwiGLU를 쓰는 LLaMA 계열 Transformer다. 부록 Table 5가 구체 수치를 싣는다.

| 항목 | 값 |
|---|---|
| 은닉 차원 | 2,176 |
| 층 수 | 16 |
| attention head | 16 (key-value head 8, Grouped Query Attention) |
| 활성화 함수 | SwiGLU |
| 정규화 | LayerNorm, epsilon 1e-5 |
| action chunk 크기 | 16 |
| vision backbone | DINOv2와 SigLIP 결합, 학습 중 동결 |
| 시각과 텍스트 어댑터 | 2층 MLP, SiLU |
| 상태와 action 어댑터 | 3층 MLP, SiLU |
| 상태와 action 차원 | 14 |
| 입력 해상도 | 384×384, 패치 14×14 |
| 최적화 | AdamW, 학습률 1e-4, 상수 스케줄에 500스텝 선형 warmup |
| weight decay | 1e-2 |
| gradient clipping | 1.0 |
| 전체 배치 크기 | 64 (GPU당 32) |
| 혼합 정밀도 | bfloat16 |
| 학습 스텝 | 15만 |

DiT의 가중치는 EgoDex로 pre-training된 H-RDT 가중치에서 초기화한다. 새로 추가한 국소 이미지 cross-attention 층은 기존 global 이미지 cross-attention 층의 가중치를 그대로 복사해 초기화했다. 학습은 NVIDIA H200 GPU 2대에서 PyTorch와 HuggingFace Accelerate로 수행했다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 실험 환경과 데이터셋

시뮬레이터는 RoboTwin 2.0이고, 데이터 생성과 평가 모두 domain randomization 설정을 쓴다. 배경, 어수선한 탁상, 탁자 높이, 조명이 무작위로 바뀌므로 visual grounding 능력이 직접 시험된다. 하드웨어는 시뮬레이션과 실제 양쪽에서 Aloha-Agilex-1.0을 쓴다. 팔 하나당 6자유도에 그리퍼 1자유도씩 더해 전체 14자유도를 가진 양팔 플랫폼이다.

데이터셋은 RoboTwin 2.0의 Hard 모드에서 생성한 HiVLA-HD다. 15개 manipulation 과제로 구성되고, 머리 카메라 관찰은 1920×1080으로, 손목 카메라는 720p로 저장했다. 시뮬레이터를 쓴 덕분에 주석 비용이 들지 않았다. subtask 전환은 action 계획 스크립트가 기록하고, 대상 물체의 bounding box는 마스크 ID에서 직접 유도했다. 필터링 후 과제당 약 1,000개 episode가 남았다. 비교 대상 모델은 전부 같은 데이터셋으로 fine-tuning했다.

비교 대상은 네 가지다. π0와 π0.5는 dual-system VLA를 대표하고, StarVLA는 여러 VLA 아키텍처를 모아둔 코드베이스로서 GR00T-N1.5와 공식 성능이 일치하는 Qwen-GR00T 변형을 썼다. 이 변형은 HiVLA와 동일한 Qwen3-VL backbone을 쓰므로 아키텍처 패러다임만 비교된다. H-RDT는 전역 이미지 특징만으로 policy를 만들기 때문에 visual grounding 기법을 뺀 ablation 역할을 겸한다.

논문은 비교군이 좁은 이유도 밝힌다. 범용 manipulation을 겨냥한 오픈소스 계층형 grounding 시스템이 드물다. DexGraspVLA는 다중 물체 grasping에 한정되고, Gemini Robotics와 HiRobot은 비공개이며, InterleaveVLA는 완결된 계층 시스템이 아니라 물체 중심 policy에 가깝다.

### 4.2 RoboTwin 2.0 본 결과

평가는 9개 과제를 Easy 4개와 Hard 5개로 나눠 진행했다. Easy 과제는 벨이나 스테이플러 같은 작은 물체를 정확히 다루는 단일 skill 과제이고, Hard 과제는 여러 skill을 순차로 엮거나 고급 공간 추론을 요구한다. Stack 3 Blocks는 정해진 색 순서를 시각으로 추론해야 하고, Click 3 Bells는 동일한 벨 세 개 중에서 left, center, right라는 공간 표현만으로 대상을 골라야 한다. 과제마다 학습에 쓰지 않은 환경 구성으로 100회씩 독립 시행했고, 마지막 세 개 체크포인트의 평균 성공률을 보고한다.

| 구분 | 과제 | π0 | π0.5 | StarVLA | H-RDT | Ours w/o Skill | Ours |
|---|---|---|---|---|---|---|---|
| Easy | Click Bell | 45% | 65% | 71% | 88% | 95% | 94% |
| Easy | Click Clock | 53% | 66% | 83% | 93% | 97% | 97% |
| Easy | Press Stapler | 60% | 69% | 63% | 89% | 98% | 97% |
| Easy | Lift Pot | 59% | 21% | 18% | 92% | 96% | 96% |
| Easy | 평균 | 54.3% | 55.3% | 58.8% | 90.5% | 96.5% | 96.0% |
| Hard | Place Shoe | 75% | 68% | 61% | 88% | 94% | 95% |
| Hard | Move Stapler | 15% | 17% | 15% | 34% | 42% | 60% |
| Hard | Stamp Seal | 61% | 42% | 25% | 43% | 68% | 76% |
| Hard | Stack 3 Blocks | 1% | 1% | 16% | 20% | 26% | 37% |
| Hard | Click 3 Bells | 41% | 54% | 66% | 88% | 92% | 98% |
| Hard | 평균 | 38.6% | 36.4% | 36.6% | 54.6% | 64.4% | 73.2% |
| 전체 | 평균 | 45.6% | 44.8% | 46.4% | 70.6% | 78.7% | 83.3% |

HiVLA의 전체 평균은 83.3%다. Easy 과제에서는 96.0%로 H-RDT의 90.5%를 5.5%p 앞선다. 고해상도 물체 중심 크롭이 작은 대상의 시각 세부를 보존한 결과다.

격차는 Hard 과제에서 크게 벌어진다. dual-system VLA 세 종은 모두 40% 미만에 머무는 반면 HiVLA는 73.2%를 기록해 H-RDT를 18.6%p 앞선다. 상위 planner가 과제 진행 상황을 파악하고 대상을 지정하기 때문에 여러 단계에 걸친 공간 일관성이 유지된다.

### 4.3 skill 분해의 기여와 오류 정정 동작

Ours w/o Skill은 subtask 문장 대신 전체 지시문을 그대로 넣은 변형이다. Easy 과제에서는 전체 지시문이 단일 skill과 사실상 일치하므로 차이가 없지만(96.5% 대 96.0%), Hard 과제에서는 8.8%p 낮아진다(64.4% 대 73.2%). subtask로 쪼개 하나의 명령이 하나의 동작에 대응하게 만들면 diffusion policy의 부담이 줄고 국소 기하와 실행에 집중할 수 있다는 뜻이다.

논문은 계층 구조에서 나타난 부수 효과도 보고한다. DiT policy가 grasping에 실패했을 때 planner가 subtask가 아직 끝나지 않았음을 인식하고 같은 시각 언어 명령을 다시 내보낸다. planner가 독립적인 의미 감독자 역할을 하므로 시스템이 skill을 재시도한다. 단일 모델로 묶인 VLA에서는 나타나지 않는 동작이다.

### 4.4 planner 오류에 대한 robustness

계층형 시스템에 흔히 제기되는 비판은 상위 오류가 하위로 누적된다는 점이다. 논문은 추론된 bounding box와 언어 지시문에 조정된 잡음을 주입해 이를 검증했다.

| 교란 대상 | 0% | 20% | 40% | 60% | 80% | 100% |
|---|---|---|---|---|---|---|
| bounding box에 잡음 | 83.3% | 78.5% | 74.0% | 70.8% | 59.8% | 57.0% |
| subtask 언어에 잡음 | 83.3% | 69.3% | 49.3% | 36.0% | 24.3% | 12.0% |
| 양쪽 모두 | 83.3% | 62.0% | 42.5% | 33.3% | 23.0% | 17.3% |

두 모달리티의 반응이 뚜렷하게 갈린다. bounding box를 100% 어긋나게 해도 성공률이 57.0%로 유지되는데, global 이미지 특징을 보조 단서로 써서 실제 대상을 스스로 찾아내기 때문이다. 반면 언어에 주입한 오류는 성공률을 주입 비율에 거의 비례해 떨어뜨린다. policy가 언어 명령을 엄격히 따른다는 뜻이며, 시각 적응성과 언어 준수가 함께 성립한다는 것이 논문의 해석이다.

### 4.5 실제 로봇 평가

실제 환경 평가는 7개 물체 범주와 16개 세부 시나리오를 포함한다. 쉬운 과제를 고르는 대신 환경 간 일반화와 지시문 준수를 시험하도록 설계했고, 색과 공간 배치가 다양한 다중 물체 조합에서 특정 대상 하나를 고르는 형태가 중심이다.

학습 데이터는 teleoperation으로 수집한 360개 episode이고, bounding box 주석은 GroundingDINO와 SAM2로 자동 생성했다. H-RDT와 HiVLA 모두 시뮬레이션 학습 체크포인트에서 초기화한 뒤 실제 데이터로 8만 스텝 추가 fine-tuning했다. 평가는 과제마다 30회씩 시행했고 물체 위치를 매번 무작위로 바꿨다.

| 방법 | Click 1 Bell | Click 2 Bells | Place 1 Cup | Place 3 Cups | Place 1 Block | Place 3 Blocks |
|---|---|---|---|---|---|---|
| H-RDT | 8/30 | 9/30 | 4/30 | 0/30 | 9/30 | 0/30 |
| HiVLA | 13/30 | 17/30 | 21/30 | 6/30 | 20/30 | 7/30 |

H-RDT는 단일 물체 조건에서만 어느 정도 동작하고 다중 물체 조건인 3 Cups와 3 Blocks에서는 0회 성공에 그친다. 전역 시각 특징만으로는 같은 모양의 물체를 색이나 공간 표현으로 구별하지 못한다. HiVLA는 같은 조건에서 각각 6회와 7회 성공했다. 절대 수치는 낮지만 baseline이 완전히 실패하는 구간에서 동작한다는 점이 논문의 주장이다.

### 4.6 ablation

ablation은 조건 주입 순서와 visual grounding 구성 요소 두 가지를 다룬다.

| 구분 | 방법 | 평균 |
|---|---|---|
| (A) 주입 순서 | Local → Text | 70.4% |
| (A) 주입 순서 | Global → Text | 70.6% |
| (A) 주입 순서 | Local → Text → Global | 80.1% |
| (A) 주입 순서 | Global → Text → Local | 78.3% |
| (A) 주입 순서 | Local → Global → Text | 74.1% |
| (A) 주입 순서 | Global → Local → Text | 83.3% |
| (B) 구성 요소 | 고해상도 크롭 제거 | 75.2% |
| (B) 구성 요소 | absolute positional encoding 제거 | 76.8% |
| (B) 구성 요소 | 전체 구성 | 83.3% |

시각 조건을 하나만 쓰면 국소든 전역이든 70% 근처에 머문다. 둘을 함께 쓰면 넓은 환경 파악과 대상 지정이 동시에 가능해진다. 순서 중에서는 전역에서 국소로, 다시 언어로 좁혀가는 coarse-to-fine 구성이 83.3%로 가장 높다. DiT가 장면 전체에서 특정 물체로, 마지막에 의미적 동작으로 주의를 단계적으로 좁히기 때문이라는 것이 논문의 해석이다.

구성 요소 쪽에서는 두 항목이 서로 다른 과제에서 효과를 보인다. 640×360으로 축소한 이미지에서 크롭하면 Lift Pot의 얇은 손잡이처럼 미세 구조를 다루는 과제에서 성공률이 96%에서 79%로 떨어진다. absolute positional encoding을 제거하면 Click 3 Bells처럼 동일한 물체를 구별해야 하는 과제에서 98%에서 80%로 떨어진다.

### 4.7 VLM planner 자체 평가

planner는 Qwen3-VL을 쓴다. 평가용으로 HiVLA-HD에서 21만 개 대화 인스턴스를 만들어 8대 2로 나눴다. fine-tuning은 H200 GPU 2대에서 배치 크기 4, 학습률 1e-5로 3 epoch 수행했다. grounding은 예측 bounding box의 mIoU로, subtask 예측은 필요 skill과 대상 물체 이름을 모두 맞혀야 성공으로 치는 엄격한 일치 기준으로 측정했다.

| 모델 | 설정 | grounding mIoU | subtask 정확도 |
|---|---|---|---|
| Qwen3-VL-4B | zero-shot | 28.03% | 45.51% |
| Qwen3-VL-8B | zero-shot | 12.68% | 35.71% |
| Qwen3-VL-32B | zero-shot | 20.17% | 39.85% |
| Qwen3-VL-30B-A3B | zero-shot | 32.46% | 41.41% |
| GPT-4o | zero-shot | 3.45% | 42.85% |
| Qwen3-VL-4B | fine-tuning | 92.21% | 97.92% |
| Qwen3-VL-8B | fine-tuning, 시각 이력 제거 | 89.63% | 95.24% |
| Qwen3-VL-8B | fine-tuning (채택 구성) | 90.37% | 98.57% |

zero-shot 성적만으로는 정밀한 long-horizon manipulation에 부족하다. GPT-4o는 subtask 정확도 42.85%로 경쟁력이 있지만 공간 grounding은 3.45% mIoU에 그친다. 반면 도메인 데이터로 가볍게 fine-tuning하면 성적이 크게 오른다. 채택 구성인 8B 모델은 mIoU 90.37%와 subtask 정확도 98.57%를 기록했다.

시각 이력을 제거하면 subtask 정확도가 98.57%에서 95.24%로 낮아진다. 과거 관찰이 과제 진행 상황 파악과 대상 구별에 필요하다는 근거다.

논문은 planner 교체 가능성을 설계상의 이점으로 든다. 도메인별 경량 fine-tuning을 하거나, 성능이 충분해지면 기성 VLM을 그대로 zero-shot으로 붙일 수 있다.

### 4.8 지연 시간과 control frequency

계층 구조는 느린 시각 언어 추론과 빠른 모터 제어 사이의 주기 불일치를 asynchronous inference로 해소한다. asynchronous inference는 상위 계획기와 하위 제어기가 서로의 완료를 기다리지 않고 각자의 주기로 동작하는 실행 방식을 말한다.

| 구성 요소 | 지연 |
|---|---|
| VLM planner 추론 1회 | 1.9초 (최적화 이전) |
| DiT policy의 16스텝 action chunk 추론 | 0.162초 |
| 시스템 control frequency | 8Hz |

control frequency는 로봇이 1초에 몇 번 새로운 action을 갱신하는지를 뜻한다. 의미 계획기를 제어 policy와 병렬로 실행하고 실시간 추적으로 시간 일관성을 유지해 8Hz를 달성했다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

논문은 별도의 한계 절을 두지 않는다. 본문에서 확인되는 제약은 다음과 같다.

- **planner 지연.** VLM planner 1회 추론이 1.9초다. 논문 스스로 최적화 이전 수치이며 소프트웨어 가속 여지가 크다고 적는다.
- **언어 오류에 대한 취약성.** bounding box 잡음에는 견디지만 subtask 언어 오류는 성공률을 거의 비례해 낮춘다. planner의 subtask 예측 정확도가 시스템 전체의 상한을 정한다.
- **채택 구성이 fine-tuning에 의존한다.** zero-shot grounding 성적이 낮아 본문 평가는 모두 도메인 데이터로 fine-tuning한 8B 모델을 쓴다. 기성 VLM을 그대로 붙이는 경로는 가능성으로만 제시된다.
- **평가 범위.** 하드웨어는 Aloha-Agilex-1.0 양팔 플랫폼 한 종이고, 실제 로봇 과제는 벨, 컵, 블록을 다루는 7개 물체 범주다. 다른 embodiment로의 이전은 다루지 않는다.
- **비교군의 제약.** 오픈소스 계층형 grounding 시스템이 드물어 직접적인 동종 비교가 빠져 있다. 가장 가까운 비교는 grounding을 뺀 H-RDT다.
- **실제 로봇 절대 성능.** 다중 물체 조건 성공률은 3 Cups에서 6/30, 3 Blocks에서 7/30으로 낮다. baseline 대비 우위는 분명하지만 실용 수준과는 거리가 있다.
- **코드 공개.** 프로젝트 페이지의 코드 링크는 공개 예정 상태다.

## 6. 관련 연구 (Related Work)

논문이 배치하는 좌표는 두 묶음이다.

**VLA 아키텍처.** 단일 시스템 계열은 RT-2와 OpenVLA처럼 하나의 네트워크가 감각 입력에서 action 토큰을 자기회귀로 디코딩한다. dual-system VLA 계열은 π0와 GR00T-N1.5처럼 VLM backbone이 공동 최적화된 특징 공간을 통해 action expert를 암묵적으로 유도한다. 두 계열 모두 좁은 manipulation 데이터로 fine-tuning할 때 catastrophic forgetting을 겪는다. 계층형 시스템은 해석 가능한 중간 표현으로 계획과 제어를 분리하며, 중간 표현으로는 Hi Robot과 MemER의 텍스트 subtask, HAMSTER의 공간 keypoint 등이 쓰였다.

**visual grounding 중심 VLA.** π0.5와 InternVLA-M1은 강한 시각 언어 정렬로 공간 위치를 잡는다. ReconVLA는 DiT가 시선 영역을 복원하게 만드는 암묵적 방식이고, InterleaveVLA와 3D-CAVLA는 시각 토큰과 언어를 교차 배치하거나 chain-of-thought 영역 검출을 결합한다. 이들은 구조적 분리가 없어 여전히 catastrophic forgetting에 노출된다. 명시적 계층 grounding 계열인 DexGraspVLA와 RoboGround는 분할 마스크를 중간 표현으로 쓰는데, 마스크 생성은 표준 VLM의 기본 능력이 아니라 외부 전문 모델이 필요하다. RoboGround는 GR-1 기반 policy를 써서 최신 DiT 대비 연속 제어 성능이 떨어지고, DexGraspVLA는 축소된 전역 이미지에 마스크를 적용해 세부를 잃는다. HiVLA는 VLM이 기본으로 낼 수 있는 bounding box를 써서 고해상도 크롭을 뽑고, 이를 전역 문맥과 skill 의미와 함께 cascaded DiT로 결합해 이 간극을 메운다고 주장한다.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| visual-grounded-centric | VLM이 낸 bounding box와 그로부터 잘라낸 고해상도 크롭을 상위와 하위를 잇는 주 인터페이스로 삼는 설계 관점 |
| cascaded cross-attention | DiT 블록 하나 안에서 global 이미지, 국소 이미지, 언어를 각각 별도의 cross-attention 층으로 순서대로 주입하는 구조 |
| Image Crop 도구 | planner가 낸 정규화 bounding box를 인자로 받아 1920×1080 원본에서 물체 중심 패치를 잘라내는 도구. bounding box를 출력값이 아니라 tool call 지시로 취급한다 |
| absolute positional encoding | 크롭 안 패치 토큰의 원본 프레임 기준 중심 좌표를 고정 sinusoidal 임베딩으로 바꿔 국소 특징에 더하는 항. DETR 방식을 따른다 |
| HiVLA-HD | RoboTwin 2.0 Hard 모드에서 생성한 자체 데이터셋. 15개 과제, 머리 카메라 1920×1080, 과제당 약 1,000 episode |
| Ours w/o Skill | subtask 문장 대신 전체 지시문을 그대로 조건으로 준 ablation 변형 |
| guidance injection strategy | global, 국소, 언어 세 조건을 DiT에 주입하는 순서를 가리키는 실험 변수 |
| phantom execution | DiT policy가 grasping에 실패해 동작만 수행되고 결과가 없는 상태. planner가 이를 인식해 같은 subtask를 재발행한다 |
| Grouped Query Attention | 여러 query head가 key-value head를 공유해 연산 효율과 성능을 절충하는 attention 구성. HiVLA는 head 16개에 key-value head 8개를 쓴다 |

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 2 | 시스템 개요와 RoboTwin 성공률 비교 | caption-region | ★ wiki 권장 (architecture, result) |
| fig02 | 5 | HiVLA 파이프라인과 DiT 블록 구조 | caption-region | ★ wiki 권장 (method) |
| fig03 | 9 | 시뮬레이션과 실제 로봇 과제 시각화 | caption-region | ★ wiki 권장 (setup) |
| fig04 | 25 | RoboTwin 과제 실행 연속 프레임 | caption-region | (부록, fig03과 중복) |
| fig05 | 26 | 실제 로봇 과제 실행 연속 프레임 | caption-region | (부록, fig03과 중복) |
| tab01 | 10 | RoboTwin 9개 과제 성공률 | table-region | ★ wiki 권장 (result) |
| tab02 | 12 | guidance 교란 robustness | table-region | ★ wiki 권장 (result) |
| tab03 | 13 | 실제 로봇 성공률 | table-region | ★ wiki 권장 (result) |
| tab04 | 14 | ablation 결과 | table-region | ★ wiki 권장 (ablation) |
| tab05 | 20 | 하이퍼파라미터와 아키텍처 사양 | table-region | (부록, 본문 표로 대체) |
| tab06 | 21 | VLM planner 평가 | table-region | ★ wiki 권장 (result) |
| tab07 | 23 | planner 시스템 프롬프트 | table-region | (부록 참고용) |
| tab08 | 24 | 과제별 지시문 목록 | table-region | (부록 참고용) |
