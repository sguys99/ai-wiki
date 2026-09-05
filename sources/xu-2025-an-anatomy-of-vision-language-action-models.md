---
title: "An Anatomy of Vision-Language-Action Models: From Modules to Milestones and Challenges"
type: paper
year: 2025
category: physical-ai
raw_path: raw/papers/xu-2025-an-anatomy-of-vision-language-action-models.pdf
raw_filename: "xu-2025-an-anatomy-of-vision-language-action-models.pdf"
source_collection: external
authors: "Chao Xu, Suyu Zhang, Yang Liu, Baigui Sun, Weihong Chen, Bo Xu, Qi Liu, Juncheng Wang, Shujun Wang, Shan Luo, Jan Peters, Athanasios V. Vasilakos, Stefanos Zafeiriou, Jiankang Deng"
arxiv_id: "2512.11362"
tags: [physical-ai, vla, robot-learning, benchmark]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/xu-2025-an-anatomy-of-vision-language-action-models/fig01.png
    raw: raw/papers/xu-2025-an-anatomy-of-vision-language-action-models-figures/fig01.png
    caption: "서베이 전체 구조를 피라미드로 그린 그림. 아래에서 위로 기본 모듈(Section 2) → 진화와 milestone(Section 3) → 도전 과제와 해법(Section 4) → 응용(Appendix A.1) 순으로 쌓인다"
    page: 1
    bbox_norm: [0.5419, 0.4503, 0.8894, 0.827]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/xu-2025-an-anatomy-of-vision-language-action-models/fig02.png
    raw: raw/papers/xu-2025-an-anatomy-of-vision-language-action-models-figures/fig02.png
    caption: "2022~2025년 VLA 모델·데이터셋·벤치마크 연표. 윗줄은 연도별 주요 모델(약 50개 → 80개 → 200개로 증가), 아랫줄은 학습용 데이터셋과 평가 벤치마크를 real world/simulation으로 나눠 배치한다"
    page: 5
    bbox_norm: [0.0739, 0.039, 0.9174, 0.2424]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/xu-2025-an-anatomy-of-vision-language-action-models/fig03.png
    raw: raw/papers/xu-2025-an-anatomy-of-vision-language-action-models-figures/fig03.png
    caption: "5대 도전 과제와 15개 하위 과제 taxonomy. 각 하위 과제 상자에 해당 연구 목록이 붙어 있어 논문 지도 역할을 한다"
    page: 6
    bbox_norm: [0.0702, 0.0494, 0.5078, 0.2636]
    strategy: manual
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/xu-2025-an-anatomy-of-vision-language-action-models/fig04.png
    raw: raw/papers/xu-2025-an-anatomy-of-vision-language-action-models-figures/fig04.png
    caption: "도전 과제 1(multi-modal alignment와 물리 세계 표현)의 3단계. 왼쪽부터 기본 alignment(V-L gap·VL-A gap·다중 센서 융합), 공간 기하와 동역학(2D→3D→4D 표현), predictive world model"
    page: 6
    bbox_norm: [0.0704, 0.3166, 0.5082, 0.4742]
    strategy: caption-region
    curated: false
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/xu-2025-an-anatomy-of-vision-language-action-models/fig05.png
    raw: raw/papers/xu-2025-an-anatomy-of-vision-language-action-models-figures/fig05.png
    caption: "도전 과제 2(지시 해석·planning·실시간 실행)의 4단계 흐름. 모호한 복합 지시 해석 → 계층적 planning과 skill 분해 → 오류 검출과 자율 복구 → 실시간 실행을 위한 연산 최적화"
    page: 9
    bbox_norm: [0.1355, 0.0505, 0.8652, 0.242]
    strategy: caption-region
    curated: false
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/xu-2025-an-anatomy-of-vision-language-action-models/fig06.png
    raw: raw/papers/xu-2025-an-anatomy-of-vision-language-action-models-figures/fig06.png
    caption: "도전 과제 3(일반화와 지속 적응)의 4개 축. open-world 일반화, catastrophic forgetting을 막는 continual learning(isolation·replay), sim2real 간극, 온라인 상호작용과 강화학습"
    page: 11
    bbox_norm: [0.1323, 0.049, 0.8653, 0.2405]
    strategy: caption-region
    curated: true
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/xu-2025-an-anatomy-of-vision-language-action-models/fig07.png
    raw: raw/papers/xu-2025-an-anatomy-of-vision-language-action-models-figures/fig07.png
    caption: "도전 과제 4(안전성·해석 가능성·신뢰 가능한 상호작용). 위험 감지 후 정지, 판단 근거 설명, 사람과의 협업 세 층으로 신뢰를 쌓는다"
    page: 13
    bbox_norm: [0.434, 0.0018, 1.0, 0.2412]
    strategy: caption-region
    curated: false
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/xu-2025-an-anatomy-of-vision-language-action-models/fig08.png
    raw: raw/papers/xu-2025-an-anatomy-of-vision-language-action-models-figures/fig08.png
    caption: "도전 과제 5(데이터 구축과 평가 표준). 왼쪽은 데이터셋의 이질성 문제와 표현·데이터 수준 해법, 오른쪽은 평가 기준 난립과 과제 난이도 확장 방향"
    page: 14
    bbox_norm: [0.5012, 0.5337, 0.93, 0.7404]
    strategy: caption-region
    curated: false
  - id: tabs1
    label: Table S1
    kind: table
    file: assets/xu-2025-an-anatomy-of-vision-language-action-models/tabs1.png
    raw: raw/papers/xu-2025-an-anatomy-of-vision-language-action-models-figures/tabs1.png
    caption: "대표 embodied 데이터셋 정리표. simulation 중심(ALFRED·LIBERO·VLA-3D), 실기기 manipulation(BridgeData V2·DROID·Open X-Embodiment·AgiBot World), 사람 중심 egocentric(Ego4D·HOI4D·HD-EPIC), embodied VQA 네 갈래로 embodiment·시점·episode 수·수집 방식을 비교한다"
    page: 25
    bbox_norm: [0.0686, 0.2661, 0.9417, 0.7507]
    strategy: table-region
    curated: true
  - id: tabs2
    label: Table S2
    kind: table
    file: assets/xu-2025-an-anatomy-of-vision-language-action-models/tabs2.png
    raw: raw/papers/xu-2025-an-anatomy-of-vision-language-action-models-figures/tabs2.png
    caption: "대표 embodied 벤치마크 정리표"
    page: 26
    bbox_norm: [0.0686, 0.3193, 0.9314, 0.7048]
    strategy: table-region
    curated: false
  - id: tabs3
    label: Table S3
    kind: table
    file: assets/xu-2025-an-anatomy-of-vision-language-action-models/tabs3.png
    raw: raw/papers/xu-2025-an-anatomy-of-vision-language-action-models-figures/tabs3.png
    caption: "VLA milestone 모델 비교표. 2021년 이전부터 2025년까지 각 모델의 perception·brain·action 구성, 학습 방식, 주 데이터셋, 평가 환경을 한 줄씩 정리한다"
    page: 27
    bbox_norm: [0.0686, 0.1965, 0.9515, 0.8202]
    strategy: table-region
    curated: true
---

## 한 줄 요약 (One-line Summary)

VLA를 perception·brain·action 세 모듈로 해부하고 2022~2025년 milestone을 연표로 훑은 뒤, 5대 도전 과제(표현·실행·일반화·안전·데이터)와 15개 하위 과제를 각각 경쟁 해법과 미래 방향까지 파고든 IEEE TPAMI 투고 서베이다.

## 1. 자료 정보 (Document Information)

- **저자**: Chao Xu·Suyu Zhang·Yang Liu·Baigui Sun 외 (IROOTECH TECHNOLOGY, Sany Group 산하 Wolf 1069 b Lab), Shan Luo (King's College London), Shujun Wang (홍콩이공대), Jan Peters (TU Darmstadt), Stefanos Zafeiriou·Jiankang Deng (Imperial College London). 앞의 세 저자가 동등 기여.
- **발표**: arXiv 2512.11362v3 (2025-12-19), IEEE TPAMI 투고 preprint. 본문 16쪽 + 참고문헌 8쪽 + 부록. 인용 문헌 약 285편.
- **성격**: 연구자가 분야를 익히는 순서를 그대로 문서 구조로 삼은 서베이. 기본 모듈 → milestone → 도전 과제 순으로 쌓아 올리고 프로젝트 페이지에서 계속 갱신하는 living survey를 표방한다.
- **기존 서베이와의 차이**: 저자들은 두 가지 빈틈을 지적한다. 하나는 도전 과제를 결론부 한 절로 밀어내는 관행이다. 다른 하나는 방법을 범주별로 나열만 해 분야가 어떻게 이어져 왔는지 보여주지 못한다는 것이다. 이 논문은 도전 과제 분석 자체를 본체(Section 4, 전체의 절반 이상)로 삼았다.

## 2. 주요 기여 (Key Contributions)

- **5대 도전 과제의 심층 해부**: multi-modal alignment와 물리 세계의 모델링, 지시 해석과 실시간 실행, 일반화와 지속 적응, 안전과 해석 가능성, 데이터와 평가 표준. 각각을 15개 하위 과제로 쪼개고 경쟁하는 해법 계열을 비교한 뒤 "Summary & Trends → Directions" 형식으로 다음 연구 방향을 제시한다.
- **학습 경로형 구조**: 모듈(공통 어휘) → milestone(맥락) → 도전 과제(연구 프런티어)의 3단 피라미드. 입문자는 아래부터 쌓고 숙련자는 필요한 층만 골라 읽는 것을 의도했다.
- **VLA 연표(2022~2025)**: SayCan·RT-1의 등장부터 PaLM-E·Diffusion Policy·Open X-Embodiment, OpenVLA·π0·GR-2·3D-VLA, 그리고 2025년의 GR00T N1·π0.5·VLA-RL·GEN-0까지를 모델·데이터셋·벤치마크 세 줄로 배치했다.
- **참조표 3종**: 대표 embodied 데이터셋(Table S1), 벤치마크(Table S2), milestone 모델의 perception/brain/action 구성 비교(Table S3).

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 기본 모듈 세 가지

VLA 시스템을 perception(입력을 grounding된 observation으로), brain(multi-modal 융합과 planning), action(모터 명령 실행)으로 나눠 본다. 저자들은 세 모듈 모두에서 방향 전환이 진행 중이라고 정리한다. perception은 일반 visual backbone에서 언어에 alignment된 Transformer(SigLIP)로 옮겨 가는 중이고 여기에 기하 정보를 위한 DINOv2가 얹힌다. brain은 pre-trained VLM으로 수렴하는 쪽이다. action은 이산 tokenization에서 연속 생성 모델링(diffusion·flow matching)으로 무게가 옮겨 가는 중이다.

perception부터 보자. vision encoder는 CNN 계열(ResNet·EfficientNet)이 실시간·저자원 환경에서 여전히 쓰이지만 ViT가 주류 backbone이 됐다. ViT 안에서도 갈래가 나뉜다. 언어 감독형(CLIP·SigLIP), 자기지도형(DINOv2), 둘을 합친 hybrid, 그리고 pre-trained VLM을 통째로 encoder로 쓰는 방식이다. hybrid는 OpenVLA·UniVLA·VLA-RL이 SigLIP+DINOv2를 얹는 식이다. language encoder는 BERT·T5 같은 텍스트 전용 Transformer → Llama·Gemma 같은 LLM → 시각과 함께 pre-training된 VLM 순으로 옮겨 갔다. proprioception은 관절 상태·end-effector pose·그리퍼 상태 같은 저차원 구조화 벡터라 MLP로 충분하다. 나머지 modality와는 FiLM 등으로 융합한다.

Gato·VIMA·GR-1/GR-2는 brain을 Transformer 단독으로 쓴다. 생성 코어로 diffusion을 두고 Transformer가 denoising을 이끄는 DiT는 RDT-1B·TriVLA가 택했다. π0·Octo·MinD는 Transformer backbone에 flow matching이나 diffusion head를 붙인 hybrid다. pre-trained VLM을 그대로 두뇌로 쓰는 방식은 RT-2 이후 사실상 표준이 됐다. 계층형에서는 VLM이 high-level planner를 맡는다.

action space는 이산·연속·혼합 셋이다. 이산은 bin으로 나눠 next-token 분류로 푼다. 연속은 관절 각도·속도를 직접 회귀하는 방식이라 diffusion·flow matching과 잘 맞는다. 혼합에서는 BridgeVLA가 이동은 연속·회전은 이산으로 가고 π0.5는 상위 skill은 이산·하위 실행은 연속으로 간다. 디코딩은 autoregressive, non-autoregressive, hybrid 셋으로 갈린다. non-autoregressive는 양방향 attention 또는 diffusion·flow matching으로 action horizon을 한 번에 뽑아 지연을 줄인다. hybrid는 청크 단위로는 autoregressive지만 청크 안에서는 병렬로 푼다. action chunking은 미래 여러 스텝의 action을 한 묶음으로 예측하는 방식을 말한다.

### 3.2 도전 과제 1 — multi-modal alignment와 물리 세계 표현

의미와 물리 현실 사이의 간극은 vision-language gap에서 시작한다. OTTER·LIV는 시각 표현을 언어에 더 민감하게 만든다. ACT-LLM·Look Leap은 LLM을 써서 언어를 중간 표현으로 삼는 symbolic reasoning으로 간극을 좁힌다. vision-language와 action 사이의 gap은 제어를 시퀀스 생성으로 바꾸는 end-to-end fine-tuning(RT-2·OpenVLA), 언어와 action이 공유하는 중간 표현(CLIP-RT·VoxPoser), 그리고 VLM planner와 저수준 controller를 나누는 계층 구조로 접근한다. 세 번째는 촉각·힘·소리까지 끌어들이는 multi-modal 융합이다. modality별 전용 encoder를 만들어 언어와 대조학습으로 맞춘다(TLA·OmniVTLA). 융합은 전 파이프라인 깊은 융합(Tactile-VLA)부터 VLM 표현을 보존하는 mixture-of-experts 융합(ForceVLA)까지 폭이 넓다.

공간 표현에서는 2D에서 출발한 pre-trained VLM에 3D를 어떻게 넣느냐가 문제다. 표현 후보는 2.5D depth map, point cloud(PointVLA·GeoVLA·FP3), voxel과 occupancy grid(OccLLaMA·RoboMM), 그리고 3D 점의 움직임을 예측하는 4D trajectory(ARM4R)다. 아키텍처 통합에서 PointVLA·SpatialVLA는 backbone을 건드리지 않고 adapter만 주입한다. BridgeVLA·OG-VLA는 3D를 2D로 되돌려 렌더링하는 우회를 택하고 VoxPoser·Gemini Robotics는 큰 멀티모달 모델의 추론 능력에 맡긴다.

가장 위층은 predictive world model이다. world model은 환경의 동역학을 학습해 미래를 예측하는 모델을 말한다. 미래를 픽셀로 직접 그리는 계열(TriVLA·CoT-VLA·DreamVLA·FlowVLA)이 있고 latent에서 예측하는 계열이 있다. 예측 결과를 policy 강화에 쓸지 명시적 planning에 쓸지도 설계 선택으로 남는다.

### 3.3 도전 과제 2 — 지시 해석·planning·실시간 실행

모호하거나 여러 modality가 섞인 지시를 파싱하는 문제(OE-VLA·TinkAct), 긴 과제를 실행 가능한 단위로 쪼개는 계층적 planning과 skill library(Long-VLA·π0.5·Hi Robot·VLP·RoboBrain), 실행 중 오류를 잡아내고 복구하는 문제, 그리고 이 모든 것을 실시간 안에 끝내야 하는 연산 제약이다.

복구는 사람을 루프에 넣는 방식(Yell At Your Robot·CLIP-RT)과 모델이 스스로 이상 상태를 감지해 고치는 방식으로 나뉜다. CorrectNav는 자기 오류 trajectory를 모아 계속 fine-tuning하고 FPC-VLA는 VLM으로 핵심 action의 타당성을 평가하며 Agentic Robot은 plan-act-verify 폐루프를 돌린다. 실시간성에는 압축·양자화로 대응한다. BitVLA는 1비트를 쓰고 SQAP-VLA는 지각적 pruning으로 약 2배 가속과 메모리 절반을 얻는다. 경량 backbone(NORA·TinyVLA), adapter로 지식을 작은 policy에 옮기는 방식(VLA-Adapter), attention 자체를 바꾸는 방식(RoboMamba)도 있다.

### 3.4 도전 과제 3 — 일반화와 지속 적응

open-world 일반화, continual learning, sim2real, 온라인 강화학습을 다룬다.

continual learning에서는 새 과제를 배우다 기존 능력이 지워지는 catastrophic forgetting이 핵심 문제다. 해법은 새 skill에 전용 파라미터를 주는 격리·확장(prompt나 codebook 항목 추가, InstructVLA의 mixture-of-experts 라우팅, iManip의 skill별 가중치 추가)과 과거 샘플 일부를 다시 학습에 섞는 replay(ExpReS-VLA의 압축 경험 replay, iManip의 시간 기반 replay)로 갈린다.

sim2real에서 ManiSkill3는 GPU 병렬 렌더링과 domain randomization으로 시뮬레이션 충실도를 높인다. SLIM은 RGB를 segmentation·depth로 압축해 policy를 표현 수준에서 둔감하게 만든다. DreamGen·RynnVLA-001은 물리 엔진 대신 실데이터로 학습한 world model에 맡기는 데이터 주도 시뮬레이터다.

강화학습 적용은 표본 효율과 reward 설계가 발목을 잡는다. 앞의 문제는 VLA가 이미 가진 사전 지식을 RL에 주입해 푼다 — RLDG는 과제별 전문 RL policy의 고품질 trajectory를 일반 VLA로 distillation하고 iRe-VLA는 backbone을 얼린 채 가벼운 action head만 학습하는 단계와 성공 trajectory로 지도학습하는 단계를 번갈아 돌린다. reward 설계는 VLM·LLM에 맡기는 흐름이다. VLM-RMs·RoboCLIP은 시각 상태와 목표 서술의 유사도로 reward를 뽑는다. RL-VLM-F는 GPT-4V로 observation 쌍을 비교하고 GRAPE는 단계별 선호를 생성한다. 둘 다 VLM을 심판으로 세워 trajectory를 순위 매기는 방식이다. Eureka는 LLM에 실행 가능한 reward 함수를 짜게 한다.

### 3.5 도전 과제 4 — 안전·해석 가능성·신뢰

안전 보장은 규칙을 밖에서 씌우는 제약 기반 계열(AutoRT의 robot constitution)과 학습 목표 안으로 끌어들이는 계열로 나뉜다. SafeVLA는 위험 행동을 비용 함수로 모델링해 제약 MDP로 푼다. 학습 기반 alignment 쪽에서는 Gemini Robotics가 안전 데이터로 Constitutional AI post-training을 한다. GPI는 확신도 추정과 언어 기반 되돌리기로 불확실할 때 멈추거나 도움을 청한다. RationalVLA는 부적절한 명령을 거부하는 refusal token을 둔다.

해석 가능성은 chain-of-thought를 언어로 노출하거나(Diffusion-VLA·ECoT) 시각 subgoal 이미지로 보여준다(CoT-VLA). 계층 구조에서는 planner가 뱉는 중간 지시 자체를 설명으로 삼는다(RT-H·HiRobot). DIARC-OpenVLA는 학습된 블랙박스 모델의 은닉층에 linear probe를 달아 기호 상태를 읽어낸다.

### 3.6 도전 과제 5 — 데이터와 평가 표준

데이터의 이질성(시뮬레이션 대 실기기, 서로 다른 embodiment와 제어 인터페이스)은 표현·데이터·표준화 수준으로 나눠 다룬다. 표현 수준에서는 연속 동작을 의미가 일관된 latent action 토큰으로 사상하거나(LAPA·Moto·UniVLA) 지각·추론·제어를 아우르는 공유 의미 공간을 만든다(RDT-1B·AgiBot World). 데이터 수준에서는 생성 모델로 시각 다양성을 늘린다(CACTI·GenAug·ROSIE). Re-Mix는 성격이 다른 데이터셋의 혼합 비율을 성능 피드백으로 조정한다. 표준화 수준에서는 수집 프로토콜과 동기화를 규격화하거나(RH20T·BridgeData V2) 데이터셋을 대규모로 합친다(Open X-Embodiment).

평가에서는 지표와 실험 설정이 제각각이다. 벤치마크는 짧은 과제에 머물러 고차 추론을 시험하지 못하고 일반화도 체계적으로 재지 못한다. 대응으로 Benchmarking VLAs는 입출력·지표·로봇 커버리지를 통일하려 하고 EUQ는 성공/실패 이진값 너머의 과정 품질을 사람이 채점한다. 장기 과제의 CALVIN, lifelong learning 전용 LIBERO, 1·3인칭 동기화의 Ego-Exo4D는 과제의 폭과 깊이를 넓혔다. 프런티어 일반화를 겨냥한 어려운 시험으로는 From Intention to Execution이 있다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

서베이라 자체 실험은 없다. 대신 세 개의 참조표가 결과물에 해당한다.

- **Table S1(데이터셋)**: simulation 중심(ALFRED 8,055 시연·LIBERO 약 6,500 episode·VLA-3D), 실기기 manipulation(BridgeData V2 60,096 trajectory·DROID 약 76k(약 350시간)·Open X-Embodiment 100만+ trajectory와 22종 로봇·AgiBot World 100만+ trajectory), 사람 중심 egocentric(Ego4D 약 3,700시간·HOI4D·HD-EPIC), embodied VQA(MT-EQA·EgoTaskQA·EmbodiedEval)를 embodiment·시점·규모·수집 방식으로 비교한다.
- **Table S2(벤치마크)**: 대표 embodied 벤치마크의 구성 비교.
- **Table S3(milestone 모델)**: 2021년 이전 EmbodiedQA·CLIPort부터 SayCan·RT-1·RT-2(2022), PaLM-E·Diffusion Policy(2023), 3D-VLA·Octo·OpenVLA·GR-2·π0(2024), Humanoid-VLA·GR00T N1·PointVLA·CoT-VLA·π0.5·LUMOS·VLA-RL·Cosmos-R1(2025)까지를 훑는다. 모델마다 perception·brain·action 구성, 학습 방식(BC·RL·predictive modeling), 주 데이터셋, 평가 환경을 한 줄로 정리했다. 여기서 action 표현이 discrete(autoregressive)에서 continuous(DDPM·flow matching)로 옮겨 간 흐름이 보인다. brain도 LSTM·Transformer에서 VLM으로 넘어가는 추세다.

규모 변화도 하나의 결과다. 연표(Figure 2)를 보면 연간 등장 모델 수가 2023년 약 50개에서 2024년 약 80개, 2025년 약 200개로 늘었다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

각 도전 과제 절은 "현재 추세 → 방향" 형식으로 끝난다. 저자들이 제시한 방향은 다음과 같다.

- **일반화**: 지금은 scaling law에 기대 성격이 다른 데이터를 모아 수동적 imitation learning으로 큰 모델을 학습시키는 흐름이다. 성공률은 올랐지만 모델은 하드웨어에 묶여 있고 학습 후 고정된다. 저자들은 의미 수준 planning과 저수준 제어를 분리한 morphology-agnostic 표현으로 옮겨 가 새 로봇을 주변기기처럼 붙이는 zero-shot cross-embodiment 전이를, 나아가 스스로 탐색해 데이터를 만드는 자율적 개방형 진화를 제안한다.
- **안전**: 현재의 안전 장치는 규칙 기반 방패나 사후 합리화라 policy의 결정 과정과 분리돼 있어 실시간 환각이나 확신에 찬 오작동을 막지 못한다. 저자들이 내놓은 답은 epistemic uncertainty를 능동적으로 추정하는 System 2 반성 층, 즉 의심할 줄 아는 능력이다. 해석 가능성도 사후 디버깅 도구가 아니라 실행 루프의 일부여야 하며 사람이 추론 사슬을 언어나 제스처로 고칠 수 있어야 한다.
- **데이터와 평가**: 실세계 수집은 본질적으로 확장이 어렵고 잡음이 많다. 저자들은 시뮬레이션을 1차 데이터 공장으로 삼고 실데이터는 시뮬레이터의 물리·렌더링을 보정하는 alignment 용도로 돌리자고 한다. 실패 trajectory를 버리지 말고 negative mining과 대조학습의 재료로 삼자는 제안, 그리고 이진 성공률 대신 안전 여유·효율·교란 내성까지 재는 진단형 stress test로 평가를 바꾸자는 제안이 따른다.

서베이 자체의 한계로는, 기본 모듈(Section 2)을 도전 과제 분석에 지면을 몰아주느라 요약본으로 줄였다고 저자들이 명시한다. 아키텍처 taxonomy가 필요하면 다른 서베이를 참조하라고 안내한다.

## 6. 관련 연구 (Related Work)

- 이 논문이 인용한 기존 VLA 서베이: action tokenization 관점(Zhong 2025), 효율적 학습(Guan 2025), post-training과 인간 운동 학습의 유사성(Xiang 2025), 그리고 종합 서베이 여섯 편(Zhang 2025·Din 2025·Sapkota 2025·Shao 2025·Kawaharazuka 2025·Ma 2024).
- wiki 내부: [[physical-ai/kawaharazuka-2025-vision-language-action-models-for-robotics]]는 이 논문이 참고문헌 [8]로 인용한 full-stack 관점 서베이로, 아키텍처 분류와 하드웨어·데이터 수집을 더 자세히 다룬다. 도전 과제 중심의 이 논문과 상호 보완적이다.
- milestone으로 다룬 개별 모델 중 wiki에 있는 것: RT-1, RT-2, OpenVLA, π0, π0.5.

## 7. 용어집 (Glossary)

| 용어 | 설명 |
|---|---|
| morphology-agnostic representation | 로봇 형상에 의존하지 않는 표현. 의미 수준 planning과 저수준 제어를 분리해 새 embodiment에 가벼운 adapter만 붙여 전이하자는 저자들의 제안 |
| epistemic uncertainty | 모델이 아는 것과 모르는 것을 구분하는 지식 차원의 불확실성. 데이터 자체의 잡음(aleatoric)과 대비된다 |
| refusal token | RationalVLA가 도입한, 부적절하거나 실행 불가능한 명령을 거부하기 위해 학습시킨 출력 토큰 |
| latent action | 서로 다른 로봇이나 사람 영상의 연속 동작을 의미가 일관된 이산 토큰으로 사상한 표현. LAPA·Moto·UniVLA 계열이 쓴다 |
| robot constitution | AutoRT가 도입한, 구조화된 프롬프트로 로봇 행동에 다층 제약을 부여하는 규칙 집합 |
| System 2 reflective layer | 빠른 반사적 실행 위에 얹는 느린 반성 층. 저자들이 안전의 미래 방향으로 제안한다 |

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 1 | 서베이 전체 구조 피라미드 (모듈 → milestone → 도전 과제 → 응용) | caption-region | ★ wiki 권장 (구조) |
| fig02 | 5 | 2022~2025 VLA 모델·데이터셋·벤치마크 연표 | caption-region | ★ wiki 권장 (역사) |
| fig03 | 6 | 5대 도전 과제 · 15개 하위 과제 taxonomy (논문 지도) | manual | ★ wiki 권장 (핵심) |
| fig04 | 6 | 도전 과제 1 — alignment · 공간 표현 · world model 3단계 | caption-region | (선택) |
| fig05 | 9 | 도전 과제 2 — 지시 해석 · planning · 복구 · 실시간 | caption-region | (선택) |
| fig06 | 11 | 도전 과제 3 — open-world · continual · sim2real · RL | caption-region | ★ wiki 권장 (일반화) |
| fig07 | 13 | 도전 과제 4 — 안전 · 해석 가능성 · 신뢰 | caption-region | (선택) |
| fig08 | 14 | 도전 과제 5 — 데이터 구축과 평가 표준 | caption-region | (선택) |
| tabs1 | 25 | 대표 embodied 데이터셋 비교표 | table-region | ★ wiki 권장 (참조표) |
| tabs2 | 26 | 대표 embodied 벤치마크 비교표 | table-region | (선택) |
| tabs3 | 27 | milestone 모델의 perception/brain/action 구성 비교표 | table-region | ★ wiki 권장 (참조표) |
