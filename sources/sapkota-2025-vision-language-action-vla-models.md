---
title: "Vision-Language-Action (VLA) Models: Concepts, Progress, Applications and Challenges"
type: paper
year: 2025
category: physical-ai
raw_path: raw/papers/sapkota-2025-vision-language-action-vla-models.pdf
raw_filename: "sapkota-2025-vision-language-action-vla-models.pdf"
source_collection: external
authors: "Ranjan Sapkota, Yang Cao, Konstantinos I. Roumeliotis, Manoj Karkee"
arxiv_id: "2505.04769"
tags: [physical-ai, vla, robot-learning, safety]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/sapkota-2025-vision-language-action-vla-models/fig01.png
    raw: raw/papers/sapkota-2025-vision-language-action-vla-models-figures/fig01.png
    caption: "분리된 vision, language, action 모델에서 통합 VLA로의 전개. 위쪽 세 모델(이미지 이해, 텍스트 이해, 제어)이 각각 따로 동작하던 구조를 아래쪽 VLA가 하나로 합친다. 과수원의 사과 인식 예시를 든다"
    page: 1
    bbox_norm: [0.524, 0.5539, 0.9237, 0.8097]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/sapkota-2025-vision-language-action-vla-models/fig02.png
    raw: raw/papers/sapkota-2025-vision-language-action-vla-models-figures/fig02.png
    caption: "VLA 핵심 개념 mind map. 가운데 VLA Concepts를 두고 정의(foundation), 진화 타임라인, 다중 modality 통합, tokenization과 인코딩, 학습 패러다임, 적응 실행 여섯 가지가 가지로 뻗는다"
    page: 2
    bbox_norm: [0.1008, 0.4727, 0.4469, 0.7448]
    strategy: caption-region
    curated: false
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/sapkota-2025-vision-language-action-vla-models/fig03.png
    raw: raw/papers/sapkota-2025-vision-language-action-vla-models-figures/fig03.png
    caption: "VLA 생태계 mind map. 왼쪽 VLA Models에서 가운데 진전과 학습 효율(아키텍처 혁신, 데이터 효율, 파라미터 효율, 가속, 응용)로, 오른쪽 도전 과제(추론 제약, 다중 modality action, 안전과 편향, 시스템 복잡도, 연산 수요, 일반화 격차, 환경 강건성, 윤리)로 이어진다"
    page: 3
    bbox_norm: [0.0595, 0.0899, 0.9363, 0.3738]
    strategy: caption-region
    curated: false
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/sapkota-2025-vision-language-action-vla-models/fig04.png
    raw: raw/papers/sapkota-2025-vision-language-action-vla-models-figures/fig04.png
    caption: "논문 구성도. 결론과 미래 로드맵에서 출발해 논의(잠재 해법), 도전 과제, 응용, 진전, 개념, 서론 순으로 거꾸로 내려가며 각 절의 하위 주제를 나열한다"
    page: 4
    bbox_norm: [0.064, 0.0896, 0.4841, 0.8607]
    strategy: caption-region
    curated: false
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/sapkota-2025-vision-language-action-vla-models/fig05.png
    raw: raw/papers/sapkota-2025-vision-language-action-vla-models-figures/fig05.png
    caption: "사과 수확 시나리오로 본 VLA 기본 개념. 왼쪽은 로봇 팔이 익은 사과를 집는 삽화, 오른쪽은 다중 modality 통합, tokenization과 표현, 학습 패러다임, 적응 제어와 실시간 실행 네 단계 흐름도"
    page: 5
    bbox_norm: [0.1384, 0.0893, 0.8574, 0.4077]
    strategy: caption-region
    curated: false
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/sapkota-2025-vision-language-action-vla-models/fig06.png
    raw: raw/papers/sapkota-2025-vision-language-action-vla-models-figures/fig06.png
    caption: "2022년부터 2025년까지 VLA 모델 45종의 타임라인. 회색(2022 기반), 파랑(2023 규모 확장과 policy), 빨강(2024 특화), 초록(2025 일반화와 고도화)으로 연도를 구분한다. CLIPort, Gato, RT-1, VIMA에서 시작해 EfficientVLA로 끝난다"
    page: 6
    bbox_norm: [0.0599, 0.0829, 0.9501, 0.7521]
    strategy: manual
    curated: true
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/sapkota-2025-vision-language-action-vla-models/fig07.png
    raw: raw/papers/sapkota-2025-vision-language-action-vla-models-figures/fig07.png
    caption: "VLA의 end-to-end tokenization 과정. 어수선한 탁자 이미지는 vision 인코더(ViT, ConvNeXt)가, 지시문 \"stack the green blocks on the red tray\"는 언어 인코더(T5, LLaMA)가 prefix 토큰으로 바꾸고, Transformer가 상태 토큰과 함께 융합해 autoregressive 디코더로 action 토큰을 낸다"
    page: 7
    bbox_norm: [0.505, 0.4032, 0.9427, 0.6241]
    strategy: caption-region
    curated: true
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/sapkota-2025-vision-language-action-vla-models/fig08.png
    raw: raw/papers/sapkota-2025-vision-language-action-vla-models-figures/fig08.png
    caption: "상태 토큰의 두 가지 용례. (a) manipulation에서는 깨지기 쉬운 물체 근처로 팔이 뻗은 정도를 상태 토큰으로 인지해 경로를 조정한다. (b) 이동 로봇에서는 LiDAR 지도와 odometry를 상태 토큰으로 담아 지형에 맞게 경로를 바꾼다"
    page: 8
    bbox_norm: [0.0386, 0.0893, 0.4908, 0.4316]
    strategy: caption-region
    curated: true
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/sapkota-2025-vision-language-action-vla-models/fig09.png
    raw: raw/papers/sapkota-2025-vision-language-action-vla-models-figures/fig09.png
    caption: "VLA가 세계를 인코딩하는 파이프라인. vision, language, 상태 세 입력을 각각 tokenization하고 다중 modality 융합을 거쳐 action tokenization과 action 예측으로 이어지며, 실행 루프가 새 observation을 되먹인다"
    page: 8
    bbox_norm: [0.505, 0.4804, 0.9427, 0.7714]
    strategy: caption-region
    curated: true
  - id: fig10
    label: Figure 10
    kind: figure
    file: assets/sapkota-2025-vision-language-action-vla-models/fig10.png
    raw: raw/papers/sapkota-2025-vision-language-action-vla-models-figures/fig10.png
    caption: "VLA 학습 패러다임. 웹 규모 vision-language 데이터(이미지 캡션, VQA, 지시문 추종)와 로봇 trajectory 데이터(시연 데이터셋, 실제 또는 시뮬레이션)를 co-fine-tuning으로 결합해 의미 이해(affordance, action 결과)와 일반화(새 시나리오, 언어 지시)를 얻는다"
    page: 10
    bbox_norm: [0.1844, 0.0893, 0.8176, 0.3485]
    strategy: caption-region
    curated: true
  - id: fig11
    label: Figure 11
    kind: figure
    file: assets/sapkota-2025-vision-language-action-vla-models/fig11.png
    raw: raw/papers/sapkota-2025-vision-language-action-vla-models-figures/fig11.png
    caption: "VLA 응용 도메인 mind map. humanoid 로봇을 맨 위에 두고 자율주행, 산업 로봇, 의료 로봇, 정밀 농업, 대화형 AR 내비게이션이 시계 방향으로 이어진다. 본문 논의 순서와 같다"
    page: 19
    bbox_norm: [0.0541, 0.0901, 0.5164, 0.4507]
    strategy: caption-region
    curated: false
  - id: fig12
    label: Figure 12
    kind: figure
    file: assets/sapkota-2025-vision-language-action-vla-models/fig12.png
    raw: raw/papers/sapkota-2025-vision-language-action-vla-models-figures/fig12.png
    caption: "humanoid 로봇 Helix가 냉장고에서 물병을 꺼내는 개념 삽화. VLM과 LLM이 장면과 지시를 해석하고, hierarchical controller가 하위 과제를 실행하며, agentic AI 모듈이 실시간으로 동작을 보정한다는 구성을 라벨로 표시한다"
    page: 20
    bbox_norm: [0.1602, 0.0893, 0.8356, 0.3642]
    strategy: caption-region
    curated: false
  - id: fig13
    label: Figure 13
    kind: figure
    file: assets/sapkota-2025-vision-language-action-vla-models/fig13.png
    raw: raw/papers/sapkota-2025-vision-language-action-vla-models-figures/fig13.png
    caption: "VLA 기반 자율 배송 차량의 개념 삽화. VLM이 visual grounding, LLM이 지시문 해석, VLA 디코더가 경로 계획을 맡고 agentic AI가 동적 환경에서 trajectory를 다시 계획한다"
    page: 21
    bbox_norm: [0.505, 0.0893, 0.9427, 0.3168]
    strategy: caption-region
    curated: false
  - id: fig14
    label: Figure 14
    kind: figure
    file: assets/sapkota-2025-vision-language-action-vla-models/fig14.png
    raw: raw/papers/sapkota-2025-vision-language-action-vla-models-figures/fig14.png
    caption: "의료 응용 두 장면. (a) \"apply a suture to the left coronary artery\" 지시를 vision 모듈, 언어 모듈, action 디코더가 처리해 서브밀리미터 정밀도의 봉합 동작으로 옮기는 수술 로봇. (b) \"bring my walker\" 요청을 듣고 환자 자세를 인식해 보행기를 가져다주는 간병 보조 로봇"
    page: 22
    bbox_norm: [0.505, 0.0883, 0.9427, 0.5095]
    strategy: caption-region
    curated: false
  - id: fig15
    label: Figure 15
    kind: figure
    file: assets/sapkota-2025-vision-language-action-vla-models/fig15.png
    raw: raw/papers/sapkota-2025-vision-language-action-vla-models-figures/fig15.png
    caption: "정밀 농업 응용 개념도. 지상 로봇은 \"pick only Grade A fruits\" 지시로 손상 없는 수확용 action 토큰을 내고, 드론은 언어 지시로 물 부족 구역에 관개한다. 합성 학습, lifelong learning, 실제 배포가 피드백 루프로 이어진다"
    page: 24
    bbox_norm: [0.1165, 0.0893, 0.8793, 0.4616]
    strategy: caption-region
    curated: false
  - id: fig16
    label: Figure 16
    kind: figure
    file: assets/sapkota-2025-vision-language-action-vla-models/fig16.png
    raw: raw/papers/sapkota-2025-vision-language-action-vla-models-figures/fig16.png
    caption: "대화형 AR 내비게이션 개념도. 공항에서 \"How do I reach Gate 22 without stairs?\" 질의를 받아 vision 인코더가 에스컬레이터와 게이트를 인식하고 action 디코더가 경로를 계획한 뒤 사용자 시야에 안내를 겹쳐 보여준다"
    page: 24
    bbox_norm: [0.4977, 0.5721, 0.95, 0.7708]
    strategy: caption-region
    curated: false
  - id: fig17
    label: Figure 17
    kind: figure
    file: assets/sapkota-2025-vision-language-action-vla-models/fig17.png
    raw: raw/papers/sapkota-2025-vision-language-action-vla-models-figures/fig17.png
    caption: "여섯 가지 핵심 도전 과제와 여섯 가지 대응 해법의 대응도. 위쪽 도전(실시간 추론, 다중 modality 융합 안전, 데이터셋 편향과 grounding, 시스템 통합 복잡도, 연산과 에너지 수요, 강건성과 윤리)에 아래쪽 해법(적응형 pruning, hybrid policy 아키텍처, meta/transfer learning, LoRA와 양자화, domain randomization, 윤리 감독 체계)을 짝지었다"
    page: 29
    bbox_norm: [0.1602, 0.0893, 0.8356, 0.3876]
    strategy: caption-region
    curated: true
  - id: fig18
    label: Figure 18
    kind: figure
    file: assets/sapkota-2025-vision-language-action-vla-models/fig18.png
    raw: raw/papers/sapkota-2025-vision-language-action-vla-models-figures/fig18.png
    caption: "미래 humanoid 보조 로봇 \"Eva\"의 개념 삽화. VLM이 장면 이해와 affordance 예측, VLA가 언어 지시를 계층적 동작 계획으로 변환, agentic AI가 적응 학습과 자기 보정을 맡는 구성을 주방 장면 위에 라벨로 표시한다"
    page: 29
    bbox_norm: [0.0616, 0.4446, 0.4824, 0.652]
    strategy: caption-region
    curated: false
  - id: fig19
    label: Figure 19
    kind: figure
    file: assets/sapkota-2025-vision-language-action-vla-models/fig19.png
    raw: raw/papers/sapkota-2025-vision-language-action-vla-models-figures/fig19.png
    caption: "VLA 미래 연구 로드맵. 효율적 배포(파라미터 효율 backbone, early-exit 추론, 압축 action tokenization과 chunking, 온디바이스 캐싱, 하드웨어 인지 컴파일), 신뢰할 수 있는 안전 지능(강건한 multimodal grounding, 보정된 abstention, world model, 제약 인지 제어, 검증과 런타임 안전 모니터), 통합 시스템과 거버넌스(2D-시간-3D 통합 표현, cross-embodiment 전이, sim2real 커리큘럼, 성공률 너머의 평가, 거버넌스) 세 영역"
    page: 31
    bbox_norm: [0.0537, 0.0897, 0.9424, 0.6253]
    strategy: caption-region
    curated: true
  - id: tab01
    label: Table 1
    kind: table
    file: assets/sapkota-2025-vision-language-action-vla-models/tab01.png
    raw: raw/papers/sapkota-2025-vision-language-action-vla-models-figures/tab01.png
    caption: "VLA 모델 51종의 아키텍처 분류표. end-to-end, hierarchical, component-focused 세 구조 유형과 low-level policy, high-level planner 두 강조점을 체크 표시로 구분한다. 2022년 CLIPort부터 2025년 EfficientVLA까지"
    page: 13
    bbox_norm: [0.0399, 0.0829, 0.9601, 0.9071]
    strategy: manual
    curated: true
  - id: tab02
    label: Table 2
    kind: table
    file: assets/sapkota-2025-vision-language-action-vla-models/tab02.png
    raw: raw/papers/sapkota-2025-vision-language-action-vla-models-figures/tab02.png
    caption: "대표 VLA 모델 요약표 첫 페이지. 모델별로 vision, language, action 아키텍처 구성, 학습 데이터, 핵심 강점을 정리한다. CLIPort, RT-1, RT-2, Gato, VIMA, ACT, Octo, VoxPoser, Diffusion Policy, OpenVLA, π0, π0-Fast, OpenVLA-OFT, RDT-1B, Helix, CogACT, Chain-of-Affordance, Edge VLA, ShowUI-2B, GR00T N1, Seer, DiffusionVLA를 담는다 (표는 다음 페이지로 이어진다)"
    page: 14
    bbox_norm: [0.0536, 0.118, 0.9464, 0.8699]
    strategy: table-region
    curated: false
  - id: tab03
    label: Table 3
    kind: table
    file: assets/sapkota-2025-vision-language-action-vla-models/tab03.png
    raw: raw/papers/sapkota-2025-vision-language-action-vla-models-figures/tab03.png
    caption: "대표 VLA 방법론과 응용 분야, 핵심 혁신 비교표. CogACT, VLATest, NaVILA, RoboNurse-VLA, Mobility VLA, CoVLA, OpenDriveVLA, ORION, QUAR-VLA, TinyVLA, UAV-VLA, Bi-VLA, ChatVLA, RoboMamba, OTTER, PointVLA, VLA-Cache, CombatVLA, HybridVLA, NORA, SpatialVLA, MoLe-VLA, JARVIS-VLA, UP-VLA, Shake-VLA, MoRE, DexGraspVLA, DexVLA 28종"
    page: 18
    bbox_norm: [0.0531, 0.1113, 0.9487, 0.8972]
    strategy: table-region
    curated: false
  - id: tab04
    label: Table 4
    kind: table
    file: assets/sapkota-2025-vision-language-action-vla-models/tab04.png
    raw: raw/papers/sapkota-2025-vision-language-action-vla-models-figures/tab04.png
    caption: "도전 과제, 잠재 해법, 기대 효과 대응표. 실시간 추론 제약부터 윤리와 사회적 영향까지 16개 항목을 세 열로 정리한다"
    page: 26
    bbox_norm: [0.0723, 0.1113, 0.9277, 0.563]
    strategy: table-region
    curated: false
---

## 한 줄 요약 (One-line Summary)

VLA 모델 80편 이상을 개념, 진전, 응용, 도전 과제, 로드맵 다섯 주제로 정리한 종합 서베이다. prefix, 상태, action 토큰이라는 세 토큰 구조로 VLA를 설명하고, 2022년부터 2025년까지 모델 45종의 타임라인과 51종의 아키텍처 분류표를 제공하며, 여섯 가지 도전 과제마다 해법을 짝지어 미래 로드맵으로 잇는다.

## 1. 자료 정보 (Document Information)

- 제목: Vision-Language-Action (VLA) Models: Concepts, Progress, Applications and Challenges
- 저자: Ranjan Sapkota, Yang Cao, Konstantinos I. Roumeliotis, Manoj Karkee (Cornell University, HKUST, University of the Peloponnese)
- 발표: arXiv 2505.04769 v2 (2026-01-29 개정, 최초 2025-05), CC BY 4.0
- 분량: 본문 33쪽, 참고문헌 299편, 그림 19장, 표 4개
- 대응 저자 소속이 Cornell 생물환경공학과라서 사과 수확 등 농업 시나리오가 예시로 반복된다. NSF와 USDA-NIFA의 AI Institute for Agriculture 지원을 받았다.
- 문헌 수집은 "Vision-Language-Action", "Vision-Language Models", "VLA" 키워드로 Hugging Face, arXiv, ScienceDirect, Nature, IEEE Xplore, Wiley, Springer Nature를 검색한 뒤 수동 선별했다.
- 논문 말미에 ChatGPT와 Perplexity를 문법 교정과 문장 다듬기에 썼다고 밝힌다.

## 2. 주요 기여 (Key Contributions)

- VLA를 "vision 인코더, 언어 모델, policy 모듈 또는 planner를 결합해 과제 조건부 제어를 수행하는 시스템"으로 정의하고, 2022년부터 2025년까지의 진화를 기반 통합, 특화와 embodied 추론, 일반화와 안전 필수 배포의 세 단계로 나눈다.
- VLA의 내부 표현을 prefix 토큰(장면과 지시문), 상태 토큰(관절 각도, 힘 센서, 그리퍼 상태, end-effector 자세), action 토큰(제어 신호)의 세 토큰 유형으로 설명하고, Algorithm 1로 tokenization 파이프라인을 구체적인 차원 수치와 함께 형식화한다.
- 최근 아키텍처를 early fusion, dual-system, self-correcting 세 패러다임으로 묶고, 모델 51종을 end-to-end, hierarchical, component-focused 구조와 low-level policy, high-level planner 강조점으로 분류한 표(Table 1)를 제시한다.
- 대표 모델 40여 종의 아키텍처 구성, 학습 데이터, 핵심 강점을 정리한 표(Table 2)와 방법론, 응용 분야, 혁신을 정리한 표(Table 3)를 제공한다.
- 학습 효율(co-fine-tuning, 합성 데이터, 자기지도 pre-training, LoRA)과 추론 가속(FAST, parallel decoding, action chunking, 양자화, pruning, 하드웨어 인지 컴파일) 기법을 수치와 함께 정리한다.
- humanoid 로봇, 자율주행, 산업 로봇, 의료 로봇, 정밀 농업, 대화형 AR 내비게이션 여섯 응용 도메인을 개념 시나리오와 함께 다룬다.
- 도전 과제를 실시간 추론, 다중 modality action 표현과 안전, 데이터셋 편향과 일반화, 시스템 통합과 연산 수요, 강건성과 윤리 다섯 절로 분석하고, 16개 항목의 도전-해법-효과 대응표(Table 4)를 제시한다.
- 효율적 배포, 신뢰할 수 있는 안전 지능, 통합 시스템과 거버넌스 세 영역으로 이루어진 미래 로드맵(Figure 19)과 여덟 가지 연구 방향을 제안한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 VLA의 정의와 진화 단계

VLA는 카메라나 센서로 환경을 관찰하고, 언어로 표현된 목표(예: "pick up the red apple")를 해석해, 실제 로봇 하드웨어에서 실행 가능한 low-level 또는 high-level action을 출력하는 시스템이다. 기존 visuomotor 파이프라인과 달리 semantic grounding, 맥락 추론, affordance 탐지, 시간적 planning을 지원한다. VLM에서 확립된 cross-attention, 임베딩 연결, 토큰 통합 같은 융합 기법을 observation, 지시문, action 표현의 alignment로 확장한다.

논문은 2022년부터 2025년까지의 발전을 세 단계로 나눈다.

| 단계 | 시기 | 특징 | 대표 모델 |
|---|---|---|---|
| 기반 통합 | 2022~2023 | 다중 modality 융합으로 기본 visuomotor 협응 확립. low-level 제어는 해결했으나 compositional reasoning은 부족 | CLIPort(CLIP 임베딩 + motion primitive), Gato(604개 과제 generalist), RT-1(imitation learning 규모 확장으로 manipulation 97% 성공), VIMA(Transformer planner로 시간 추론), RT-2(visual chain-of-thought), Diffusion Policy(diffusion 기반 stochastic action 예측) |
| 특화와 embodied 추론 | 2024 | 도메인별 inductive bias 도입 | DeeR-VLA(retrieval 보강 학습으로 few-shot 적응), Uni-NaVid(3D scene graph 내비게이션), ReVLA(메모리 효율을 위한 reversible 구조), OccLLaMA(physics-informed attention으로 partial observability 대응), CoVLA(object-centric disentanglement), OpenDriveVLA(자율주행용 다중 센서 융합) |
| 일반화와 안전 필수 배포 | 2025 | 강건성과 인간 alignment 우선 | SafeVLA(형식 검증), Humanoid-VLA(hierarchical VLA로 whole-body control), Edge VLA(임베디드용 연산 최적화), CogACT(neural-symbolic 추론), Chain-of-Affordance(affordance chaining), GR00T N1(sim2real 전이), ShowUI(human-in-the-loop 인터페이스) |

Figure 6의 타임라인은 45종을 연도별 색으로 구분한다. 2022년 CLIPort, Gato, RT-1, VIMA에서 시작해 2023년 ACT, RT-2, VoxPoser, Diffusion Policy, 2024년 Octo, OpenVLA, DeeR-VLA, Uni-NaVid, ReVLA, OccLLaMA, π0, RDT-1B, CogACT, EdgeVLA, ShowUI, NaVILA, QUAR-VLA, Bi-VLA, RoboMamba, 2025년 OTTER, PointVLA, HybridVLA, CoVLA, OpenDriveVLA, ORION, ObjectVLA, ConRFT, Hi Robot, TLA, RaceVLA, DexVLA, Humanoid-VLA, SafeVLA, MoManipVLA, VLA-Cache, TinyVLA, GR00T N1, NORA, SpatialVLA, MoLe-VLA, Long-VLA, RetoVLA, Vlaser, Discrete Diffusion VLA, Being-H0, EgoVLA, StereoVLA, GeoVLA, EfficientVLA로 이어진다.

### 3.2 다중 modality 통합

전통적 로봇 시스템은 인식, 언어 이해, 제어를 별개 모듈로 두고 수동 정의된 인터페이스로 연결했다. 인식 모델이 기호 라벨을 내면 planner가 이를 action으로 매핑하는 구조라서, 모호하거나 처음 보는 환경에서 실패하고 사전 정의된 템플릿 밖의 지시문은 일반화하지 못했다.

VLA는 대규모 pre-training 인코더와 Transformer로 modality를 end-to-end로 융합한다. "Pick the ripe apples" 과제에서 vision 인코더(ViT, ConvNeXt)는 장면을 파싱해 과일, 잎, 배경을 구분하고 질감과 형태에서 익은 정도를 추론한다. 언어 모델(T5, GPT, BERT 변형)은 지시문을 고차원 임베딩으로 바꾼다. 두 표현은 cross-attention이나 joint tokenization으로 융합되어 action policy에 전달되는 통합 latent를 이룬다.

| 모델 | 통합 방식 | 의의 |
|---|---|---|
| CLIPort | 탁자 RGB 이미지와 지시문을 CLIP으로 인코딩해 convolutional transport 디코더로 픽셀 단위 pick-and-place 분포 출력 | 명시적 언어 파싱을 없앤 end-to-end 언어 조건부 manipulation의 첫 실증 |
| VIMA | Transformer 인코더로 object-centric visual 토큰과 지시문 토큰을 함께 처리 | 공간 추론 과제에서 few-shot 일반화 |
| VoxPoser | pre-training VLM과 고전 motion planner를 조합해 voxel 수준 추론 | 과제별 학습 데이터 없이 zero-shot manipulation |
| RT-2 | visual-language 토큰과 action 표현을 하나의 Transformer에서 융합, 인터넷 규모 vision-language 코퍼스와 RT-1 데이터셋의 시연 데이터(demonstration) 10만 건 이상으로 co-training | 처음 보는 지시문에 zero-shot 일반화 |
| Octo | Open X-Embodiment의 400만 건 이상 trajectory로 학습한 메모리 보강 Transformer | long-horizon 의사결정과 joint perception-language-action 학습의 확장성 |
| OccLLaMA | attention 기반 메커니즘으로 가려진 물체 참조 처리 | 실세계 grounding |
| ShowUI | 음성이나 타이핑으로 비전문가가 명령하는 자연어 인터페이스 | 인간 상호작용 |

### 3.3 tokenization과 표현

VLA를 기존 vision-language 아키텍처와 구분하는 핵심은 토큰 기반 표현이다. vision, language, 상태, action 모든 modality를 이산 토큰으로 인코딩해 공유 임베딩 공간에 둔다. 논문은 토큰을 세 유형으로 나눈다.

| 토큰 유형 | 내용 | 역할 |
|---|---|---|
| prefix 토큰 | 이미지나 영상으로 본 환경 장면과 자연어 지시문의 압축 임베딩 | 목표와 환경 배치에 대한 초기 이해를 확립. "on the left", "next to the blue cup" 같은 공간 참조와 "green blocks" 같은 물체 의미를 두 modality에 걸쳐 해소 |
| 상태 토큰 | 관절 위치, 힘-토크 센서 값, 그리퍼 상태, end-effector 자세, 주변 물체 위치 | 상황 인식과 안전. manipulation에서는 깨지기 쉬운 물체 근처의 팔 위치를 인지해 trajectory를 재조정하고, 이동 로봇에서는 odometry, LiDAR, 관성 센서를 담아 지형 인지 locomotion과 장애물 회피를 지원 |
| action 토큰 | 관절 각도 갱신, 토크 값, 바퀴 속도, high-level movement primitive 등 low-level 제어 신호 | prefix와 상태 토큰을 조건으로 autoregressive 방식으로 한 단계씩 디코딩. 가변 길이 action 시퀀스를 지원하고 강화학습이나 imitation learning으로 fine-tuning 가능. RT-2와 PaLM-E가 대표 |

Algorithm 1은 이 파이프라인을 구체적인 차원으로 형식화한다.

| 단계 | 입력 | 모듈 | 출력 |
|---|---|---|---|
| 1 | RGB-D 프레임 I | ViT | vision 토큰 V 400개 |
| 2 | 텍스트 명령 T | BERT | 언어 토큰 L 12개 |
| 3 | 관절 각도 θ | MLP | 64차원 상태 임베딩 S |
| 4 | V, L, S | cross-attention | 512차원 융합 토큰 F |
| 5 | F | FAST | action 토큰 A 50개 |
| 6 | A | detokenize | 모터 명령 τ1:N |

Action Prediction Code 의사코드는 12층, d_model 512, attention head 8개의 Transformer 디코더가 융합 토큰을 컨텍스트로 받아 action 토큰을 하나씩 예측하고 연속 모터 명령 trajectory로 되돌리는 과정을 보인다. 논문은 이를 "LLM의 텍스트 생성과 같은 구조인데 문장이 motion trajectory인 셈"이라고 설명한다.

### 3.4 학습 패러다임

학습은 두 데이터 원천을 결합한다. 첫째는 웹 규모 코퍼스다. 이미지-캡션 쌍(COCO, LAION-400M), 지시문 추종 데이터(HowTo100M, WebVid), VQA 코퍼스(VQA, GQA)로 vision과 언어 인코더를 pre-training한다. CLIP 방식 contrastive 학습이나 언어 모델링 손실로 두 modality를 공유 임베딩 공간에 맞추며, 이 단계가 compositional generalization, object grounding, zero-shot 전이의 기반이 된다.

둘째는 로봇 trajectory 데이터셋이다. RoboNet, BridgeData, RT-X처럼 자연어 지시문 아래 영상-action 쌍, 관절 trajectory, 환경 상호작용을 담은 데이터로 언어와 인식이 action으로 옮겨지는 방식을 가르친다. 시연 데이터는 kinesthetic teaching, teleoperation, 스크립트 policy로 수집한다. 학습에는 지도학습(behavioral cloning), 강화학습, imitation learning을 쓴다.

최근에는 다단계 또는 다중 과제 학습이 늘었다. vision-language 데이터로 masked language modeling pre-training을 한 뒤 로봇 시연 데이터로 토큰 수준 autoregressive 손실로 fine-tuning하거나(OpenVLA, ChatVLA, VLA-Cache), 물체 밀기 같은 단순 과제에서 다단계 manipulation으로 올라가는 curriculum learning을 쓰거나(3D-VLA), OpenVLA처럼 domain adaptation이나 sim2real 전이로 합성과 실세계 분포 차이를 메운다(PointVLA). co-fine-tuning은 두 데이터를 함께 alignment해 affordance(사과는 집을 수 있다)와 action 결과(들어올리려면 힘과 trajectory가 필요하다)를 학습시키며, 주방 manipulation으로 학습한 모델이 과수원의 사과 수확으로 일반화하는 근거가 된다.

### 3.5 적응 제어와 실시간 실행

VLA는 센서의 실시간 피드백으로 동작을 즉시 조정한다. 과수원, 가정, 병원처럼 바람으로 사과가 움직이거나 조명이 바뀌거나 사람이 나타나는 환경에서 상태 토큰이 실시간으로 갱신되고 모델이 계획된 action을 수정한다. 사과 수확 시나리오에서 목표 사과가 약간 움직이거나 다른 사과가 시야에 들어오면 장면을 다시 해석해 grasping trajectory를 조정한다.

### 3.6 진전의 촉매와 세 가지 아키텍처 패러다임

VLA의 출발점은 2022년 11월 ChatGPT가 보인 의미 추론 능력이다. 2023년 GPT-4의 다중 modality 처리, CLIP(2022)과 Flamingo(2022)의 contrastive 학습 기반 visual-text alignment가 뒤를 이었다. RT-1의 시연 데이터 13만 건은 vision, language, action을 co-training하는 action grounding 데이터를 제공했다. 2023년 RT-2는 vision, language, action 토큰을 통합해 로봇 제어를 autoregressive 시퀀스 예측으로 다루었고, Discrete Cosine Transform 압축과 Byte-Pair Encoding으로 action을 이산화해 새 물체에서 63% 성능 향상을 얻었다. UC Berkeley의 Octo(2023)는 9,300만 파라미터와 diffusion 디코더를 쓰고 OpenX-Embodiment의 시연 데이터 80만 건으로 학습했다.

2023년부터 2024년까지의 진전으로 NVIDIA GR00T N1(2025)의 dual-system 설계, Stanford OpenVLA(2024)의 7B 오픈소스 VLA(시연 데이터 97만 건, DINOv2와 SigLIP 이중 vision 인코더, Llama 2, 55B RT-2-X를 능가), LAION-5B와 RT-X를 함께 쓰는 co-fine-tuning, UniSim의 합성 데이터 생성, LoRA 어댑터(GPU 시간 70% 절감), Physical Intelligence π0(2024)의 diffusion 기반 policy를 든다.

최근 VLA는 세 아키텍처 패러다임으로 수렴한다.

| 패러다임 | 대표 | 구조 | 보고된 효과 |
|---|---|---|---|
| early fusion | EF-VLA (ICLR 2025) | CLIP의 frozen 인코더로 이미지-텍스트를 인코딩하고 action 예측 전 Transformer backbone 초반에 융합. vision-language backbone을 고정해 catastrophic forgetting을 피하고 도메인 학습은 경량 policy 모듈에 국한 | compositional manipulation 과제에서 20% 향상, 처음 보는 목표 설명에서 85% 성공 |
| dual-system | GR00T N1 (2025) | dual-process theory에서 착안. System 1은 10ms latency의 diffusion 제어 policy로 end-effector 안정화와 적응 grasping, System 2는 LLM으로 "clean the table" 같은 long-horizon 목표를 원자적 subtask로 분해 | 다단계 가정 manipulation 벤치마크에서 RT-1, RT-2, OpenVLA 대비 성공률 17% 향상, 충돌 실패 28% 감소 |
| self-correcting | SC-VLA (2024) | 기본은 경량 Transformer로 자세나 action을 직접 예측하는 빠른 경로. grasping 실패나 충돌이 감지되면 chain-of-thought 추론을 수행하는 느린 보정 경로가 선택적으로 활성화되어 내부 LLM이나 외부 전문가 시스템에 실패 원인과 보정 전략을 질의 | closed-loop 실험에서 과제 실패율 35% 감소, 복잡하고 적대적인 환경에서 복구 가능성 향상 |

### 3.7 아키텍처 설계 공간 (Table 1)

Table 1은 모델 51종을 다섯 열로 분류한다. end-to-end(CLIPort, RT-1, OpenVLA처럼 raw 센서 입력을 단일 네트워크로 모터 명령까지 처리), hierarchical(CogACT, NaVILA처럼 LLM planner가 subgoal을 low-level 컨트롤러에 넘기는 2단 구조, ORION처럼 QT-Former로 장기 컨텍스트를 모으고 생성형 trajectory planner와 결합), component-focused(VLATest, Chain-of-Affordance처럼 인식, 언어 grounding, action 모듈을 분리해 개별 개선), 그리고 low-level policy 강조(π0, DexGraspVLA 같은 diffusion 컨트롤러로 매끄럽고 다양한 motion 분포를 만들되 연산 비용이 높음)와 high-level planner 강조(π0-FAST, CoVLA처럼 빠른 subgoal 생성이나 거친 trajectory 예측에 집중하고 세밀한 제어는 전용 모듈이나 고전 motion planner에 위임)다.

HybridVLA와 Helix 같은 end-to-end dual-system 모델은 두 요소를 함께 학습하면서 모듈 해석 가능성을 유지해 이 구분을 흐린다. OpenDriveVLA와 CombatVLA는 안전 필수 동적 도메인에서 hierarchical planning을 우선하고, Edge VLA와 TinyVLA는 high-level 추론을 희생하고 실시간 low-level policy를 강조한다. 논문은 임베디드 배포에 최적화된 완전 end-to-end hierarchical 모델처럼 아직 탐색되지 않은 조합을 이 분류표가 드러낸다고 본다. 농업 예시로 고속 과일 수확과 정밀 분무는 빠른 반응형 low-level 컨트롤러가, 과수원 내비게이션과 다열 커버리지 planning, long-horizon 작물 모니터링은 high-level planning이 필요하다고 설명한다.

### 3.8 대표 모델 카탈로그 (Table 2)

Table 2는 모델별 아키텍처(vision/language/action), 학습 데이터, 핵심 강점을 정리한다. 주요 항목은 다음과 같다.

| 모델 | 아키텍처 (vision / language / action) | 학습 데이터 | 핵심 강점 |
|---|---|---|---|
| CLIPort | CLIP-ResNet50 + Transporter-ResNet / CLIP-GPT / LingUNet | 자체 수집 | CLIP 의미 특징과 Transporter 공간 추론을 결합한 SE(2) manipulation |
| RT-1 | EfficientNet / Universal Sentence Encoder / Transformer (이산화 action) | RT-1-Kitchen | 다중 과제 주방 manipulation의 초기 대규모 Transformer policy |
| RT-2 | ViT-22B 또는 ViT-4B / PaLI-X 또는 PaLM-E / symbol-tuning (action 토큰) | VQA + RT-1-Kitchen | 인터넷 규모 VQA와 로봇 데이터의 co-fine-tuning으로 emergent capability 획득 |
| Gato | ViT / SentencePiece / Transformer (통합 토큰 스트림) | 자체 수집 | 로봇, 언어, Atari를 공유 tokenization과 단일 Transformer로 통합한 generalist |
| VIMA | ViT + Mask R-CNN / T5 / Transformer | VIMA-Data | 여섯 가지 프롬프트 modality로 compositional 과제 grounding |
| ACT | ResNet-18 / 없음 / CVAE-Transformer | ALOHA | temporal ensembling으로 매끄러운 양팔 imitation |
| Octo | CNN / T5-base / Diffusion Transformer | Open X-Embodiment | 400만 건 이상 trajectory로 학습한 다중 로봇 policy |
| VoxPoser | ViLD + MDETR / GPT-4 / MPC (LLM 유도 planning) | zero-shot | LLM과 VLM을 조합한 제약 인지 motion planning |
| Diffusion Policy | ResNet-18 / 없음 / U-Net 또는 Transformer diffusion | 자체 수집 | multimodal action 분포를 diffusion으로 포착 |
| OpenVLA | DINOv2 + SigLIP / Prismatic-7B / symbol-tuning | OXE + DROID | 오픈소스 RT-2 계열, LoRA 적응 지원 |
| π0 | PaliGemma VLM / PaliGemma / 300M diffusion action 모델 | Pi-Cross-Embodiment | 총 약 3B의 경량 general 컨트롤러, cross-robot과 open-world generalization, 양팔 스킬 |
| π0-Fast | PaliGemma / PaliGemma / FAST tokenization autoregressive Transformer | Pi-Cross-Embodiment | 주파수 공간 압축 action 토큰으로 최대 15배 빠른 추론 |
| OpenVLA-OFT | SigLIP + DINOv2 (다중 뷰) / Llama-2 7B / parallel decoding + action chunking (L1 회귀) | LIBERO, 양팔 ALOHA | LIBERO 97.1% 성공, 26배 빠른 추론 |
| RDT-1B | 다중 뷰 RGB 인코더 / Transformer 언어 모듈 / Diffusion Transformer (통합 action space) | 46개 데이터셋 100만 episode 이상 + ALOHA fine-tuning | 1.2B diffusion foundation model, 양팔 dexterous manipulation |
| Helix | System 2: 오픈소스 VLM (7~9Hz) / System 1: Transformer visuomotor policy (200Hz, 상체 전체) | Figure 로봇 end-to-end | humanoid용 이중 주기 VLA, 다중 로봇 협업 manipulation |
| CogACT | DINOv2 ViT-L/14 + SigLIP ViT-So400M/14 / Llama-2 (Prismatic-7B) / DiT-Base 300M diffusion | OXE 부분집합, Realman과 Franka | 구성 요소 분리형 VLA, OpenVLA 대비 실세계 성공률 +59.1% |
| Chain-of-Affordance | affordance 인지 visual 인코더 / Transformer 추론 프롬프트 / autoregressive + diffusion policy | LIBERO, 실제와 시뮬레이션 | object→grasp→spatial→motion 순차 affordance 추론 |
| Edge VLA | SigLIP + DINOv2 / Qwen2 0.5B / non-autoregressive joint 제어 예측 | Bridge, OXE, 텍스트-이미지 120만 쌍 | Jetson급에서 30~50Hz 추론, OpenVLA 수준 성능 |
| ShowUI-2B | UI 유도 visual 토큰 선택 / interleaved V-L-A 스트리밍 / Transformer GUI action 예측 | GUI 지시문 추종 25만 6천 건 | 디지털 자동화용 2B VLA |
| GR00T N1 | NVIDIA Eagle-2 VLM / 통합 high-level planning / DiT | 사람 시연 + 로봇 trajectory + 시뮬레이션 + 인터넷 영상 | humanoid generalist dual-system |
| NaVILA | CLIP + CNN / LLaMA-2 / 위상 planner + 강화학습 locomotion | 실세계 다리 로봇 내비게이션 시연 | 자연어로 88% 실세계 내비게이션 성공 |
| RoboNurse-VLA | SAM2 + RGB-D / LLaMA-2 + 음성-텍스트 / 자세 회귀 + 그리퍼 분류기 | 수술 도구 handover 영상 + 음성 프롬프트 | 실시간 수술 도구 handover |
| Mobility VLA | 장문맥 ViT + 목표 이미지 인코더 / T5 / 그래프 planner + visual 목표 localization | MINT | 다중 modality 투어에서 위상 지도를 만들어 대규모 미지 공간 내비게이션 |
| TinyVLA | FastViT / 128차원 언어 / 50M diffusion 디코더 | Mini-ALOHA + 자체 과제 | 대규모 pre-training 없이 5배 빠른 추론 |
| QUAR-VLA | CLIP + proprioception 임베딩 / BERT + grounding 어댑터 / Transformer 전신 디코더 | QUART | 4족 로봇 중심, 강한 sim2real |
| PointVLA | CLIP + 3D point cloud 융합 / LLaMA-2 / 공간 토큰 융합 Transformer | few-shot 공간 과제 | 2D 지식을 유지하며 3D 구조 주입 |
| VLA-Cache | SigLIP + 토큰 메모리 버퍼 / Prismatic-7B / 동적 토큰 재사용 | ALOHA + 시뮬레이션과 실제 | 정적 visual 토큰 캐싱으로 40~50% 빠른 추론 |
| HybridVLA | CLIP + DINOv2 / LLaMA-2 / diffusion + autoregressive 앙상블 | RT-X + 합성 | 다중 팔 환경에서 강건성 |
| MoLe-VLA | 다단계 ViT + STAR router / CogKD Transformer / sparse Transformer (동적 routing) | RLBench + 실세계 | layer skipping으로 5.6배 속도, 성공률 +8% |
| DexGraspVLA | object-centric 공간 ViT / Transformer grasping 추론 / diffusion grasping 컨트롤러 | dexterous grasping 벤치마크 | 다양한 물체에서 90% 이상 zero-shot 성공 |
| GraspVLA | 다중 뷰 DINOv2 + SigLIP / VLM이 박스와 grasp 예측 / flow matching action expert (PAG) | SynGrasp-1B, GRIT | 합성 pre-training grasping VLA |
| Interleave-VLA | InternVL2.5 + OWLv2 / Qwen2.5 / 연속 action 예측기 | Open Interleaved X-Embodiment (21만 episode, 11개 데이터셋) | 이미지-텍스트 교차 지시문, out-of-domain 2~3배 향상, 스케치 zero-shot |
| Being-H0, EgoVLA | 사람 영상 pre-training dexterous VLA / egocentric 사람 manipulation VLM pre-training + 통합 human-robot action space | 대규모 사람 manipulation 영상 + 소량 로봇 시연 | 풍부한 사람 영상으로 dexterous manipulation 확장 |
| Discrete Diffusion VLA | 단일 Transformer / 이산화 action chunk + 이산 diffusion 정제 (remasking) | LIBERO + SimplerEnv | diffusion 정제와 이산 토큰 인터페이스 통합 |
| EfficientVLA | 학습 없는 VLA 가속과 압축 | 기존 VLA에 적용 | 정확도 손실을 최소화한 속도와 메모리 절감 |

### 3.9 학습 효율과 추론 가속

논문은 3.2절에서 학습 효율 세 항목을, 3.3절에서 배포 시점 효율 여섯 기법을 정리한다.

| 범주 | 기법 | 보고된 수치 |
|---|---|---|
| 데이터 효율 | co-fine-tuning (LAION-5B + Open X-Embodiment) | OpenVLA 7B가 55B RT-2 변형보다 성공률 16.5% 높음 |
| 데이터 효율 | UniSim 합성 데이터 (가려짐, 동적 조명) | 어수선한 환경에서 강건성 20% 이상 향상 |
| 데이터 효율 | 자기지도 pre-training (CLIP식 contrastive) | Qwen2-VL이 grasp-and-place 수렴 12% 가속 |
| 파라미터 효율 | LoRA (frozen Transformer 층에 저차원 어댑터 삽입) | 학습 가중치 최대 70% 절감. π0-Fast는 1,000만 어댑터 파라미터로 200Hz 연속 제어. OpenVLA는 frozen 7B backbone 위 약 2,000만 어댑터로 여러 과제 policy 공존 |
| 양자화 | INT8 (Jetson Orin) | pick-and-place 성공률 약 97% 유지, 30Hz 지속 제어. dexterous 과제에서는 소폭 저하 |
| pruning | attention head, feed-forward 부분층 구조적 제거 | diffusion visuomotor policy에서 convolution vision 인코더 20% pruning 시 grasping 안정성 저하 없음. RDT-1B 계열은 메모리 약 25% 절감, 성공률 2% 미만 하락, 4GB 미만 배포 |
| 압축 action tokenization | FAST (연속 trajectory를 주파수 영역 토큰으로) | π0-Fast가 1,000ms action 창을 16개 토큰으로 압축해 최대 15배 빠른 추론, 데스크톱 GPU에서 200Hz |
| parallel decoding | 시공간 action 토큰 그룹 동시 생성 (GR00T N1) | 100Hz로 동작하는 7-DoF 팔에서 end-to-end latency 약 2.5배 감소, 단계당 5ms 미만. trajectory 매끄러움은 소폭 희생 |
| action chunking | 다단계 루틴을 단일 high-level 토큰으로 | 주방 워크플로 같은 long-horizon manipulation에서 추론 단계 최대 40% 감소 |
| 하드웨어 인지 컴파일 | TensorRT-LLM (tensor core, fused attention 커널, 파이프라인 메모리 전송) | OpenVLA-OFT에서 RTX급 GPU 기준 latency 약 30% 감소, 추론당 에너지 25% 절감 |

논문은 이 기법들이 종합적으로 소규모 연구실도 소비자급 하드웨어에서 수십억 파라미터 VLA를 fine-tuning하고 운용하게 하고, 4GB 미만 메모리와 5ms 미만 제어 루프, 100~200Hz 결정 주기를 가능하게 한다고 정리한다.

### 3.10 여섯 응용 도메인

| 도메인 | 핵심 사례 | 논문의 설명 |
|---|---|---|
| humanoid 로봇 | Helix (Figure AI), RoboNurse-VLA, TinyVLA, MoManipVLA, Figure 01 | Helix는 dual-system으로 다중 modality Transformer가 언어와 vision을 처리하고 실시간 motor policy가 200Hz로 dense action 벡터를 출력해 팔, 손, 몸통, 손가락을 제어한다. TinyVLA와 MoManipVLA는 Jetson급 GPU에서 동작한다. Figure 01은 창고에서 picking, sorting, shelving을 수행한다. Figure 12는 "Please take the water bottle from the fridge" 지시에 SigLIP과 LLaMA-4, hierarchical controller, agentic AI 모듈이 협력하는 개념 시나리오다 |
| 자율주행 | CoVLA, OpenDriveVLA, ORION, UAV-VLA | CoVLA는 실제 주행 영상 80시간 이상에 LiDAR, odometry, 자연어 주석, trajectory를 짝지은 데이터셋이고 CLIP, LLaMA-2, trajectory 디코더로 학습한다. OpenDriveVLA는 2D/3D 다중 뷰 토큰과 언어를 hierarchical alignment하고 nuScenes, Waymo Open Motion에서 planning과 trajectory 예측 성능을 보고한다. ORION은 QT-Former로 long-horizon visual 컨텍스트를 유지하고 LLM 추론과 생성형 trajectory planner를 결합한다. 논문은 Tesla Autopilot 같은 상용 시스템은 여전히 모듈형이나 하이브리드 파이프라인이라고 짚는다. Figure 13은 가상의 배송 차량 "AutoNav" 시나리오다 |
| 산업 로봇 | CogACT | Prismatic-7B로 장면과 지시문 임베딩을 뽑고 DiT-Base가 세밀한 모터 action을 생성한다. 6-DoF 팔과 양팔 시스템으로 빠르게 적응하며, 다단계 조립, 나사 체결, 부품 분류에서 OpenVLA 대비 실세계 성공률 28% 이상 향상을 보고한다 |
| 의료 로봇 | RoboNurse-VLA | SAM-2로 장면 분할, LLaMA-2로 명령 이해, 실시간 음성-action 파이프라인으로 수술 도구 handover를 수행한다. 다양한 도구, 조명, 소음에 강건하다. 논문은 grounding과 trajectory 예측의 사후 시각화가 FDA식 검증에 쓰일 수 있고, LoRA로 병원별 적응이 가능하다고 본다. Figure 14는 봉합과 보행기 전달 시나리오다 |
| 정밀 농업 | (개념 시나리오) | RGB-D, 다중 스펙트럼, 드론 영상으로 생육 모니터링, 질병 탐지, 영양 결핍 식별. "pick only Grade A fruits" 지시로 손상 없는 수확, 드론의 선택적 관개. 배포 중 수집한 실행 결과와 성공 신호를 policy 갱신에 되먹이는 lifelong learning과 3D 과수원 렌더링 합성 데이터를 전망한다 |
| 대화형 AR 내비게이션 | (개념 시나리오) | 스마트 안경이나 스마트폰의 영상 스트림과 자연어 질의로 사용자 시야에 방향 오버레이, waypoint, 음성 안내를 겹친다. "take me to the nearest pharmacy with a wheelchair ramp" 같은 자유 형식 지시문과 "avoid busy areas" 같은 후속 제약을 처리하는 대화형 지시 루프를 전망한다 |

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

서베이 논문이므로 자체 실험은 없다. 대신 인용 문헌의 수치를 모아 도전 과제와 해법의 근거로 삼는다.

### 4.1 도전 과제 절의 정량 근거

| 도전 과제 | 논문이 든 수치 |
|---|---|
| 실시간 추론 | autoregressive 디코딩은 표준 GPU 연구 플랫폼에서 end-to-end 3~5Hz에 그친다. GR00T N1의 parallel decoding은 약 2.52배 가속하지만 trajectory 매끄러움을 희생한다. 512차원 vision 토큰 400개 이상 처리에 약 1.2GB/s 메모리 대역폭이 필요해 Jetson급 임베디드 하드웨어를 넘어선다 |
| 다중 modality action 표현 | 256개 bin으로 나누는 이산 tokenization은 정밀 grasping이나 수술에서 오차가 크다. 연속 MLP 방식은 mode collapse 위험이 있다. π0, RDT-1B의 diffusion policy는 다양한 action을 표현하지만 연산 부담이 기존 Transformer 디코더의 약 3배다 |
| 안전 보증 | 충돌 예측 모델은 어수선한 동적 공간에서 약 82% 정확도에 그친다. 비상 정지는 안전 검증 때문에 200~500ms latency를 갖는다 |
| 데이터셋 편향과 grounding | 표준 데이터셋 연관의 약 17%가 고정관념(예: "doctor"와 남성)으로 치우친다. OpenVLA는 새 환경에서 물체 참조의 약 23%를 놓친다. "yellow horse" 같은 희귀 조합에서 compositional generalization이 실패한다 |
| 미지 과제 일반화 | 완전히 새로운 과제나 변형에서 성능이 최대 40% 저하된다 |
| 시스템 통합 | System 2 LLM은 표준 GPU에서 약 800ms 이상 latency, System 1은 수 ms 주기의 실시간 CPU나 마이크로컨트롤러에서 동작해 동기화가 어렵다. GR00T N1도 비동기 상호작용으로 간헐적 motion 끊김을 보인다. ViT의 고차원 특징과 저차원 action 디코더의 불일치로 OpenVLA와 RoboMamba가 시뮬레이션에서 실제 하드웨어로 옮길 때 성능이 떨어진다 |
| 연산과 에너지 | 7B 이상 VLA는 원형 그대로 28GB 이상 VRAM이 필요하다 |
| 환경 강건성 | OpenDriveVLA의 vision 모듈은 저대비나 그림자 장면에서 정확도 약 20~30% 저하. CoVLA의 언어 이해는 소음이나 의미 모호성에서 저하. RoboMamba는 부분 가려진 물체의 자세를 잘못 추정 |

### 4.2 4절 도입부의 모델별 한계 사례

| 모델 | 성과 | 남은 한계 |
|---|---|---|
| DeeR-VLA | 동적 early-exit으로 manipulation 벤치마크 연산 5~6배 절감 | 복잡한 시나리오에서 이득 감소 |
| Uni-NaVid | egocentric 영상 토큰 압축으로 5Hz 내비게이션 | 모호한 지시문과 긴 horizon에서 취약 |
| ObjectVLA | hybrid vision-language grounding | 새 물체의 64%에만 일반화 |
| ConRFT | behavioral cloning + Q-learning + human-in-the-loop fine-tuning으로 접촉 과제 8종에서 96.3% 성공 | 전문가 개입과 reward shaping 의존 |
| Hi Robot | high-level 추론과 low-level 실행 분리로 지시문 충실도 향상 | 모듈 조율과 모호한 피드백 grounding이 어려움 |
| TLA (Tactile-Language-Action) | 촉각 스트림과 언어 융합으로 미지 peg-in-hole 85% 이상 성공 | 데이터셋 폭과 실시간 다단계 디코딩 제한 |
| OccLLaMA | 3D 장면 이해와 action planning 통합 | 풍부한 장면 dynamics와 modality 간 의미 일관성으로 확장 필요 |
| RaceVLA | 양자화된 반복 제어 루프로 고속 드론 내비게이션 | 큰 VLA 대비 visual-physical 일반화 제한, 안전 우려 |
| ReVLA | 모델 병합으로 out-of-domain visual 강건성 회복, OOD grasping 성공 최대 77% 향상 | 추가 연산과 복잡도 |
| SafeVLA | constrained MDP로 위험 행동 80% 이상 감소 | 포괄적이면서 과도하지 않은 안전 규칙 정의가 미해결 |

### 4.3 해법 절의 기대 수치

5.1절은 해법별 기대 효과를 수치로 적는다. LoRA와 knowledge distillation은 파라미터를 최대 90% 줄이면서 벤치마크 성능 95% 이상을 유지하고, FP16/INT8 혼합 정밀도와 블록 단위 보정을 결합한 점진적 양자화는 연산을 2~4배 줄인다. 이런 기법을 합치면 상용 edge GPU에서 end-to-end 50ms 미만 추론이 가능하다고 전망한다. 대형 teacher VLA에서 경량 student로 distillation하면 파라미터 5~10배 감소에 과제 성능 90~95% 유지, 4~8비트 양자화 인지 학습으로 메모리 대역폭과 에너지 60% 이상 절감, VLA 전용 가속기는 20~30W에서 100 TOPS 이상 throughput을 낼 수 있다고 본다. TinyVLA는 1B 미만 파라미터로 manipulation 벤치마크에서 SOTA에 근접한 실시간 추론을 보인다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

### 5.1 도전 과제 여섯 묶음과 해법

논문은 도전 과제를 여섯 묶음으로 정리하고(Figure 17) 각각에 해법을 짝짓는다.

| 도전 과제 | 제안 해법 |
|---|---|
| 실시간 추론 제약 | FPGA vision 프로세서와 sparse 행렬용 tensor core, LoRA와 distillation, 점진적 양자화, DeeR-VLA식 early-exit 적응 추론, subword patch 임베딩과 동적 어휘 할당 tokenization |
| 다중 modality action 표현과 안전 보증 | low-level motion primitive용 diffusion 샘플링과 high-level autoregressive planner의 hybrid policy, 다중 센서 융합 기반 실시간 위험 평가 모듈과 비상 정지, SafeVLA의 Lagrangian 제약 강화학습, GRPO와 DPO 온라인 적응, 실행 전 planner 출력을 기호적으로 검사하는 형식 검증 층 |
| 데이터셋 편향, grounding, 미지 과제 일반화 | LAION-5B와 Open X-Embodiment를 결합한 편향 제거 데이터셋, hard-negative 샘플링과 contrastive fine-tuning, meta-learning, replay 버퍼와 정규화로 catastrophic forgetting 억제하는 continual learning, 3D-VLA식 point cloud 추론 전이, domain randomization과 실세계 보정을 결합한 sim2real fine-tuning |
| 시스템 통합 복잡도와 연산 수요 | 모듈화와 하드웨어-소프트웨어 공동 설계, LoRA, mutual information 기반 distillation, 양자화 인지 학습, VLA 전용 가속기, TensorRT-LLM과 TVM 툴체인 |
| 환경 변동 강건성 | UniSim 같은 closed-loop 센서 시뮬레이터로 조명, 가려짐, 센서 소음 변형 생성, 인식 임계값과 제어 이득을 실시간 조정하는 적응 재보정 모듈 |
| 윤리, 프라이버시, 사회 | 편향 감사 도구와 적대적 편향 제거, 반사실 데이터 증강, 온디바이스 처리와 동형 암호와 차등 프라이버시, 영향 평가와 이해관계자 참여, 규제 체계와 산업 표준 |

Table 4는 여기에 제한된 3D 인식, cross-embodiment 일반화, 주석 비용, sim2real 격차, 물리 지식 통합, 촉각과 오디오 통합, long-horizon 다단계 과제, 에너지와 연산 수요, 미지 과제 일반화를 더해 16개 항목으로 확장한다.

### 5.2 미래 로드맵 (Figure 19)

로드맵은 세 영역으로 이루어진다.

| 영역 | 항목 |
|---|---|
| 효율적 배포 | 파라미터 효율 VLA backbone, anytime/early-exit 추론, 압축 action tokenization과 chunking, 온디바이스 캐싱과 episodic memory, 하드웨어 인지 컴파일 |
| 신뢰할 수 있는 안전 지능 | 불확실성을 다루는 강건한 multimodal grounding, 보정된 abstention과 안전 fallback, 물리와 인과 예측용 world model, 제약 인지 제어(shield, MPC), 검증과 런타임 안전 모니터 |
| 통합 시스템과 거버넌스 | 2D-시간-3D 통합 표현, cross-embodiment 전이와 적응, sim2real 커리큘럼과 domain randomization, 성공률 너머의 평가(안전, 에너지, 복구), 프라이버시와 편향 감사와 책임성 거버넌스 |

5.2절은 여덟 가지 연구 방향을 서술한다.

1. embodied 인식의 "cortex"로서 다중 modality foundation model: 웹 규모 이미지, 영상, 텍스트, 상호작용과 affordance 흔적으로 학습해 정적 의미뿐 아니라 dynamics, 접촉 prior, 상식 물리 지식을 담는 공유 backbone. 과신과 환각 grounding을 막으려면 보정된 불확실성과 근거 연결 추론이 필요하다.
2. agentic, 자기지도, lifelong learning: 모델이 탐색 목표를 제안하고 결과를 가설화하며 시뮬레이션과 실제 rollout으로 자기 보정하는 학습 루프. 다만 반복 갱신은 catastrophic forgetting, 의도치 않은 행동 회귀, 적대적 피드백에 의한 policy 오염 위험이 있어 replay, 안전 인지 갱신, 모듈형 어댑터, 검증 기반 policy 개정과 함께 가야 한다.
3. hierarchical neuro-symbolic planning: 언어 grounding planner가 목표를 구조화된 subtask로 분해하고 중간 스킬 policy와 low-level 컨트롤러가 순응 motion을 보장한다. high-level 계획은 제약 위반을 검사하고 low-level trajectory는 control barrier function, MPC, 런타임 안전 모니터로 보호한다.
4. world model과 물리/인과 추론을 통한 실시간 적응: "여기를 밀면 무엇과 충돌하는가" 같은 반사실 평가와 grasping 미끄러짐 같은 예상 이탈에 대한 빠른 보정. 시간 토큰 압축, event-driven 상태 갱신, 미분 가능 물리 시뮬레이터와 학습 dynamics의 hybrid 모델이 필요하다.
5. 효율과 확장성: structured sparsity, 저차원 적응, 모듈형 expert, anytime/early-exit policy, 압축 action tokenization과 chunked 제어, GPU/NPU/edge 가속기용 컴파일, 연산 인지 캐싱과 episodic memory.
6. cross-embodiment 전이와 형태 불변 스킬 표현: 접촉 목표, affordance 지점 manipulation, task-space 제약 같은 추상 action space로 스킬을 표현해 바퀴형, 4족, humanoid에 걸쳐 전이. meta-learning과 few-shot 보정으로 새 로봇을 수 분의 데이터로 시작.
7. 과제 성공률 너머의 평가: 안전 위반, 불확실성 보정, 복구 행동, 시간 일관성, 에너지 소비, 인간 제약 아래의 downstream 효용을 계량하고 연산 예산, 데이터셋 구성, 배포 조건을 보고하는 벤치마크.
8. 안전, 윤리, 인간 중심 alignment: 고위험 action 실행 전 위험 추정, 모호할 때 자연어 확인 요청, 책임성을 위한 투명한 로그, 프라이버시 인지 센싱, 편향 감사, human-in-the-loop 감독.

횡단 주제로 안전하고 감사 가능한 continual learning, 일급 기능으로서의 실패 감지와 복구, action 생성의 정밀도(VLA planner의 trajectory 정확도와 제어 안정성은 MPC, 샘플링 기반 motion planning, feedback linearization 같은 고전 방식에 아직 뒤진다), 의도 명확화와 shared autonomy와 설명 가능한 action 근거를 든다. 결론은 VLA가 의미 의사결정과 유연한 과제 명세에는 적합하지만, 실용 운용에는 VLA 추론과 고전 또는 학습된 low-level 컨트롤러를 결합한 hybrid 아키텍처가 필수라고 정리한다.

### 5.3 자료 자체의 특성

- 응용 절의 Figure 12, 13, 14, 15, 16, 18은 실제 시스템 결과가 아니라 저자가 그린 개념 시나리오다. "AutoNav", "Eva"는 가상의 시스템이고, Helix 예시에서 언급하는 LLaMA-4 조합도 개념 설명이다.
- Table 2의 Helix 항목은 논문이 아니라 Figure AI 블로그를 출처로 든다.
- 도전 과제 절의 여러 수치(충돌 예측 82%, 편향 연관 17%, OpenVLA 물체 참조 누락 23%, 미지 과제 40% 저하 등)는 인용 번호만 붙어 있어 원 실험 조건은 이 논문에서 확인할 수 없다.
- 참고문헌 299편 가운데 상당수가 2025년 arXiv 프리프린트라서 인용된 성능 수치는 후속 검증이 필요하다.

## 6. 관련 연구 (Related Work)

- [[physical-ai/kawaharazuka-2025-vision-language-action-models-for-robotics]]: 같은 시기의 VLA 종합 서베이. 이 논문이 토큰 구조와 응용 도메인을 강조한다면, Kawaharazuka 서베이는 아키텍처 7종 분류와 데이터셋, 로봇 플랫폼 쪽을 깊게 다룬다.
- [[physical-ai/xu-2025-an-anatomy-of-vision-language-action-models]]: perception, brain, action 3모듈로 VLA를 해부한 서베이. 이 논문의 prefix, 상태, action 토큰 구분과 대응해 읽을 수 있다.
- [[physical-ai/sa-2026-vision-language-action-models-for]]: 양팔 manipulation 관점의 VLA 서베이. 이 논문 Table 2의 ACT, RDT-1B, OpenVLA-OFT, HybridVLA 항목과 겹친다.
- [[physical-ai/brohan-2023-rt-2-vision-language-action-models-transfer-web]]: 이 논문이 VLA 패러다임의 출발점으로 삼는 모델. action을 텍스트 토큰처럼 다루는 발상의 원 논문.
- [[physical-ai/kim-2024-openvla-an-open-source-vision-language-action-model]]: 논문 전반에서 효율 기법(LoRA, 양자화)과 한계(grounding 누락, sim2real 저하)의 기준 모델로 반복 인용된다.
- [[physical-ai/black-2024-pi0-a-vision-language-action-flow-model]]: diffusion/flow matching action expert의 대표. 이 논문은 π0와 π0-Fast를 low-level policy 강조 모델과 압축 action tokenization의 사례로 든다.
- [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation]]: dual-system 패러다임과 parallel decoding의 대표 사례. 이 논문이 인용하는 수치(17% 성공률 향상, 28% 충돌 감소, 2.52배 가속)의 원 출처.
- [[physical-ai/figure-ai-2025-helix-a-vision-language-action]]: Table 2와 humanoid 응용 절의 Helix 설명(System 2 7~9Hz, System 1 200Hz)의 원 자료.
- [[physical-ai/zhao-2023-learning-fine-grained-bimanual-manipulation]]: ACT와 ALOHA. action chunking과 temporal ensembling의 원 논문.
- [[physical-ai/open-x-embodiment-2023-robotic-learning-datasets-and-rt-x]]: Octo, OpenVLA, co-fine-tuning 논의의 데이터 기반.
- [[physical-ai/openhelix-robot-awesome-dual-system-vla]]: dual-system VLA 문헌 목록. 이 논문의 dual-system 패러다임 절을 확장해 읽을 수 있다.
- [[overviews/physical-ai-overview]]: physical-ai 카테고리 허브.

## 7. 용어집 (Glossary)

| 용어 | 설명 |
|---|---|
| prefix 토큰 | 환경 장면(이미지, 영상)과 자연어 지시문을 압축한 임베딩. 모델의 초기 목표 이해와 cross-modal grounding을 담당한다 |
| 상태 토큰 | 관절 위치, 힘-토크 값, 그리퍼 상태, end-effector 자세, odometry, LiDAR 등 로봇 내부 상태와 근접 환경을 담은 토큰. proprioception 정보의 토큰화다 |
| action 토큰 | 관절 각도 갱신, 토크, 바퀴 속도, movement primitive 같은 제어 신호를 이산화한 토큰. autoregressive 디코더가 한 단계씩 생성한다 |
| early fusion | action 예측 전 Transformer backbone 초반에서 vision과 language 표현을 융합하는 설계. EF-VLA가 CLIP frozen 인코더로 구현했다 |
| self-correcting VLA | 빠른 기본 추론 경로에 실패 감지 시 활성화되는 느린 chain-of-thought 보정 경로를 더한 설계. SC-VLA가 대표 |
| component-focused | 인식, 언어 grounding, action 모듈을 분리해 개별 개선하는 구조. Table 1의 세 구조 유형 가운데 하나 |
| FAST | 연속 action trajectory를 주파수 영역 이산 토큰으로 압축하는 tokenization. π0-Fast에서 1,000ms 창을 16개 토큰으로 줄인다 |
| parallel decoding | 시공간 action 토큰 그룹을 동시에 생성해 autoregressive 순차 latency를 줄이는 기법. GR00T N1이 사용 |
| early-exit 추론 | 입력 복잡도에 따라 네트워크 깊이나 폭을 동적으로 줄여 단순 장면에서 Transformer 층을 건너뛰는 적응 추론. DeeR-VLA가 대표 |
| cortex | 논문이 제안하는 미래 방향으로, 정적 의미와 dynamics, 접촉 prior, 상식 물리 지식을 함께 담아 planner와 컨트롤러에 안정된 의미 anchor를 주는 공유 다중 modality foundation model |
| agentic AI 모듈 | 탐색 목표 제안, 결과 가설화, rollout 기반 자기 보정을 수행하는 학습 루프 구성 요소. 응용 시나리오에서 실시간 micro-policy 보정을 맡는 것으로 그려진다 |
| neuro-symbolic planning | 언어 grounding planner가 목표를 구조화된 subtask로 분해하고 기호적 제약 검사로 안전을 확인하는 계층 설계 |
| UniSim | 가려짐과 동적 조명을 포함한 photorealistic 장면을 생성하는 closed-loop 센서 시뮬레이터. 합성 데이터 생성과 domain randomization 사례로 반복 인용된다 |

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 1 | "분리된 vision, language, action 모델에서 통합 VLA로의 전개" | caption-region | ★ wiki 권장 (background) |
| fig02 | 2 | "VLA 핵심 개념 mind map 여섯 가지" | caption-region | (Figure 3과 중복, 보류) |
| fig03 | 3 | "VLA 생태계 mind map: 진전과 도전 과제" | caption-region | (본문 표로 대체) |
| fig04 | 4 | "논문 구성도" | caption-region | (구성 설명은 텍스트로 충분) |
| fig05 | 5 | "사과 수확 시나리오의 VLA 네 단계" | caption-region | (개념 삽화, 보류) |
| fig06 | 6 | "2022~2025 VLA 모델 45종 타임라인" | manual | ★ wiki 권장 (timeline) |
| fig07 | 7 | "end-to-end tokenization 과정" | caption-region | ★ wiki 권장 (method) |
| fig08 | 8 | "상태 토큰의 manipulation과 내비게이션 용례" | caption-region | ★ wiki 권장 (method) |
| fig09 | 8 | "VLA가 세계를 인코딩하는 파이프라인" | caption-region | ★ wiki 권장 (method) |
| fig10 | 10 | "학습 패러다임: 웹 데이터와 로봇 데이터의 co-fine-tuning" | caption-region | ★ wiki 권장 (method) |
| fig11 | 19 | "응용 도메인 mind map" | caption-region | (본문 표로 대체) |
| fig12 | 20 | "Helix 냉장고 시나리오 개념 삽화" | caption-region | (개념 삽화, 보류) |
| fig13 | 21 | "자율 배송 차량 개념 삽화" | caption-region | (개념 삽화, 보류) |
| fig14 | 22 | "수술 봉합과 간병 보조 개념 삽화" | caption-region | (개념 삽화, 보류) |
| fig15 | 24 | "정밀 농업 개념도" | caption-region | (개념 삽화, 보류) |
| fig16 | 24 | "AR 내비게이션 개념도" | caption-region | (개념 삽화, 보류) |
| fig17 | 29 | "여섯 도전 과제와 여섯 해법의 대응도" | caption-region | ★ wiki 권장 (limitation) |
| fig18 | 29 | "미래 humanoid 보조 로봇 Eva 개념 삽화" | caption-region | (개념 삽화, 보류) |
| fig19 | 31 | "미래 연구 로드맵 세 영역" | caption-region | ★ wiki 권장 (roadmap) |
| tab01 | 13 | "VLA 모델 51종 아키텍처 분류표" | manual | ★ wiki 권장 (taxonomy) |
| tab02 | 14 | "대표 VLA 모델 요약표 첫 페이지" | table-region | (본문 표로 재구성, 다음 페이지 누락) |
| tab03 | 18 | "방법론, 응용 분야, 혁신 비교표" | table-region | (본문 표로 재구성) |
| tab04 | 26 | "도전 과제, 해법, 기대 효과 대응표" | table-region | (본문 표로 재구성) |
