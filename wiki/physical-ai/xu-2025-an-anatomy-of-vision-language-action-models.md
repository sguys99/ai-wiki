---
title: "An Anatomy of Vision-Language-Action Models: From Modules to Milestones and Challenges"
type: paper
year: 2025
category: physical-ai
raw_path: raw/papers/xu-2025-an-anatomy-of-vision-language-action-models.pdf
raw_filename: "xu-2025-an-anatomy-of-vision-language-action-models.pdf"
source_collection: external
source: xu-2025-an-anatomy-of-vision-language-action-models.md
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

## 요약 (Summary)

IEEE TPAMI에 투고된 VLA 서베이다. perception·brain·action 세 모듈로 해부하고 2022~2025년 milestone을 연표로 훑은 뒤, 5대 도전 과제(표현·실행·일반화·안전·데이터)와 15개 하위 과제를 각각 경쟁 해법과 미래 방향까지 짚는다. 인용 문헌 약 285편.

기존 VLA 서베이와 각도가 다르다. 저자들이 보기에 기존 서베이는 도전 과제를 결론부 한 절로 밀어낸다. 방법도 범주별로 나열만 해 분야가 어떻게 이어져 왔는지는 보여주지 못한다. 그래서 도전 과제 분석 자체를 본체(Section 4, 전체의 절반 이상)로 삼고 문서 순서를 연구자가 분야를 익히는 순서에 맞췄다.

![[assets/xu-2025-an-anatomy-of-vision-language-action-models/fig01.png]]
*Figure 1: 서베이 구조 피라미드 — 기본 모듈(Sec 2) → 진화와 milestone(Sec 3) → 도전 과제와 해법(Sec 4) → 응용(Appendix A.1) (Xu 2025, p.1)*

## 주요 기여 (Key Contributions)

- **5대 도전 과제의 심층 해부**: multi-modal alignment와 물리 세계의 모델링, 지시 해석과 실시간 실행, 일반화와 지속 적응, 안전과 해석 가능성, 데이터와 평가 표준. 각각을 15개 하위 과제로 쪼개고 경쟁하는 해법 계열을 비교한 뒤 "Summary & Trends → Directions" 형식으로 다음 연구 방향을 제시한다.
- **학습 경로형 구조**: 모듈(공통 어휘) → milestone(맥락) → 도전 과제(연구 프런티어)의 3단 피라미드. 입문자는 아래부터 쌓고 숙련자는 필요한 층만 골라 읽는 것을 의도했다.
- **VLA 연표(2022~2025)**: SayCan·RT-1의 등장부터 PaLM-E·Diffusion Policy·Open X-Embodiment, OpenVLA·π0·GR-2·3D-VLA에 2025년의 GR00T N1·π0.5·VLA-RL·GEN-0까지를 모델·데이터셋·벤치마크 세 줄로 배치했다.
- **참조표 3종**: 대표 embodied 데이터셋(Table S1), 벤치마크(Table S2), milestone 모델의 perception/brain/action 구성 비교(Table S3).

## 기본 모듈 (Basic Modules)

VLA 시스템을 perception(입력을 grounding된 observation으로), brain(multi-modal 융합과 planning), action(모터 명령 실행)으로 나눠 본다. observation은 매 timestep에 policy가 받는 센서 입력을 말한다. 저자들은 세 모듈 모두에서 방향 전환이 진행 중이라고 정리한다. perception은 일반 visual backbone에서 언어에 alignment된 Transformer(SigLIP)로 옮겨 가는 중이고 여기에 기하 정보를 위한 DINOv2가 얹힌다. brain은 pre-trained VLM으로 수렴하는 쪽이다. action은 이산 tokenization에서 연속 생성 모델링(diffusion·flow matching)으로 무게가 옮겨 가는 중이다.

**Perception**. vision encoder는 네 갈래다. CNN 계열(ResNet·EfficientNet)은 실시간·저자원 환경에서 여전히 쓰이고 ViT가 지배적 backbone이 됐다. ViT 안에서도 언어 감독형(CLIP·SigLIP), 자기지도형(DINOv2), 둘을 합친 hybrid, pre-trained VLM을 통째로 encoder로 쓰는 방식으로 갈린다. OpenVLA·UniVLA·VLA-RL이 SigLIP+DINOv2 hybrid를 쓴다. language encoder는 BERT·T5 같은 텍스트 전용 Transformer에서 Llama·Gemma 같은 LLM으로, 다시 시각과 함께 pre-training된 VLM으로 옮겨 갔다. proprioception은 관절 각도 같은 로봇 자신의 상태 감각 입력이고 저차원 구조화 벡터라 MLP로 충분하다.

**Brain**. Transformer 단독(Gato·VIMA·GR-1/GR-2), 생성 코어로 diffusion을 두고 Transformer가 denoising을 이끄는 DiT(RDT-1B·TriVLA), Transformer backbone에 flow matching이나 diffusion head를 붙인 hybrid(π0·Octo·MinD), pre-trained VLM을 그대로 두뇌로 쓰는 방식으로 나뉜다. 마지막이 RT-2 이후 사실상 표준이고 계층형에서는 VLM이 high-level planner를 맡는다.

**Action**. action space는 이산(bin으로 나눠 next-token 분류로 푼다), 연속(관절 각도·속도를 직접 회귀하며 diffusion·flow matching과 잘 맞는다), 혼합 셋이다. BridgeVLA는 이동을 연속으로 회전을 이산으로 두고 π0.5는 상위 skill을 이산으로 하위 실행을 연속으로 둔다. 디코딩은 autoregressive, 지연을 줄이는 non-autoregressive, hybrid 셋으로 갈린다. action chunking은 미래 여러 스텝의 action을 한 묶음으로 예측하는 방식을 말한다.

## VLA 연표 (Timeline)

![[assets/xu-2025-an-anatomy-of-vision-language-action-models/fig02.png]]
*Figure 2: 2022~2025 VLA 모델·데이터셋·벤치마크 연표. 연간 등장 모델 수가 2023년 약 50개 → 2024년 약 80개 → 2025년 약 200개로 늘었다 (Xu 2025, p.5)*

2022년에는 SayCan이 LLM 기반 high-level planning과 저수준 skill 실행을 분리했다. 같은 해 RT-1·RT-2는 Transformer로 vision·language에서 action까지 end-to-end 학습을 실현했다. 2023년 PaLM-E는 시각·상태 표현을 pre-trained LLM에 직접 넣어 통합 입력 공간을 만들었고 Diffusion Policy가 생성 모델을 action 모델링에 들여왔으며 Open X-Embodiment가 대규모 cross-robot 데이터를 열었다. 2024년에는 Octo·OpenVLA·π0·GR-2·3D-VLA가 오픈소스 확장과 flow matching, 웹 스케일 비디오 pre-training, 3D world modeling을 각각 밀어붙였다. 2025년에는 세 방향으로 벌어졌다. Humanoid-VLA·GR00T N1은 전신 휴머노이드 제어로, PointVLA·Cosmos-Reason1·CoT-VLA는 open-world 추론으로 갔다. π0.5·LUMOS·VLA-RL·GEN-0은 계층·추론·제어의 통합을 향했다.

## 5대 도전 과제 (Challenges)

![[assets/xu-2025-an-anatomy-of-vision-language-action-models/fig03.png]]
*Figure 3: 5대 도전 과제와 15개 하위 과제 taxonomy. 각 상자에 해당 연구 목록이 붙어 논문 지도 역할을 한다 (Xu 2025, p.6)*

**1. multi-modal alignment와 물리 세계 표현**. 추상적 의미와 물리 현실 사이의 간극을 세 층으로 쪼갠다. vision-language gap은 시각 표현을 언어에 더 민감하게 만들거나(OTTER·LIV) LLM을 써서 언어를 중간 표현으로 삼는 symbolic reasoning으로(ACT-LLM·Look Leap) 좁힌다. vision-language와 action 사이의 gap에는 제어를 시퀀스 생성으로 바꾸는 end-to-end fine-tuning(RT-2·OpenVLA), 공유 중간 표현(CLIP-RT·VoxPoser), VLM planner와 저수준 controller를 나누는 계층 구조가 쓰인다. 세 번째는 촉각·힘·소리까지 끌어들이는 융합이다. 공간 표현에서는 2D에서 출발한 pre-trained VLM에 3D를 넣는 문제가 남는다 — depth map, point cloud(PointVLA·GeoVLA), voxel(OccLLaMA·RoboMM), 3D 점의 움직임을 예측하는 4D trajectory(ARM4R)가 후보다. 가장 위층은 predictive world model이다. world model은 환경의 동역학을 학습해 미래를 예측한다.

**2. 지시 해석·planning·실시간 실행**. 모호한 지시 파싱(OE-VLA·TinkAct), 긴 과제를 실행 단위로 쪼개는 계층적 planning과 skill library(Long-VLA·π0.5·Hi Robot·RoboBrain), 오류 검출과 복구, 실시간 제약이 여기 묶인다. 복구에는 사람을 루프에 넣는 방식(Yell At Your Robot·CLIP-RT)과 모델이 스스로 고치는 방식이 있다. CorrectNav는 자기 오류 trajectory를 모아 계속 fine-tuning하고 Agentic Robot은 plan-act-verify 폐루프를 돌린다. 실시간성에는 압축·양자화로 대응한다. BitVLA는 1비트를 쓰고 SQAP-VLA는 지각적 pruning으로 약 2배 가속과 메모리 절반을 얻는다.

**3. 일반화와 지속 적응**.

![[assets/xu-2025-an-anatomy-of-vision-language-action-models/fig06.png]]
*Figure 6: open-world 일반화 · continual learning(isolation·replay) · sim2real 간극 · 온라인 강화학습 (Xu 2025, p.11)*

continual learning에서는 새 과제를 배우다 기존 능력이 지워지는 catastrophic forgetting이 핵심 문제다. 해법은 새 skill에 전용 파라미터를 주는 격리·확장(InstructVLA의 mixture-of-experts 라우팅, iManip의 skill별 가중치 추가) 쪽과 과거 샘플 일부를 다시 학습에 섞는 replay(ExpReS-VLA·iManip) 쪽이다. sim2real에서 ManiSkill3는 GPU 병렬 렌더링과 domain randomization으로 시뮬레이션 충실도를 높인다. SLIM은 RGB를 segmentation·depth로 압축해 policy를 표현 수준에서 둔감하게 만든다. DreamGen·RynnVLA-001은 물리 엔진 대신 실데이터로 학습한 world model에 맡긴다. 강화학습 적용은 표본 효율과 reward 설계가 발목을 잡는다. 앞의 문제는 VLA의 사전 지식을 RL에 주입해 푼다(RLDG의 distillation, iRe-VLA의 교대 학습). reward 설계는 VLM·LLM에 맡긴다(VLM-RMs·RoboCLIP의 유사도, RL-VLM-F·GRAPE의 순위, Eureka의 코드 생성).

**4. 안전·해석 가능성·신뢰**. 규칙을 밖에서 씌우는 제약 기반 계열에는 AutoRT의 robot constitution이 있다. 다른 쪽은 안전을 학습 목표 안으로 끌어들인다. SafeVLA는 위험 행동을 비용 함수로 모델링해 제약 MDP로 푼다. GPI는 확신도 추정으로 불확실할 때 멈추거나 도움을 청하고 RationalVLA는 부적절한 명령을 거부하는 refusal token을 둔다. 해석 가능성은 chain-of-thought를 언어로 노출하거나(Diffusion-VLA·ECoT) 시각 subgoal 이미지로 보여준다(CoT-VLA). 계층 구조에서는 planner의 중간 지시 자체가 설명이 된다(RT-H·HiRobot).

**5. 데이터와 평가 표준**. 데이터의 이질성을 표현·데이터·표준화 수준으로 나눠 다룬다. 표현 수준에서는 연속 동작을 latent action 토큰으로 사상하거나(LAPA·Moto·UniVLA) 공유 의미 공간을 만든다(RDT-1B·AgiBot World). 데이터 수준에서는 생성 모델로 시각 다양성을 늘리고(CACTI·GenAug·ROSIE) Re-Mix는 혼합 비율을 성능 피드백으로 조정한다. 평가 쪽은 지표와 설정이 제각각이고 벤치마크가 짧은 과제에 머물러 고차 추론을 시험하지 못한다고 저자들은 짚는다.

## 참조표 (Reference Tables)

서베이라 자체 실험은 없다. 부록의 표 3종이 결과물에 해당한다.

![[assets/xu-2025-an-anatomy-of-vision-language-action-models/tabs1.png]]
*Table S1: 대표 embodied 데이터셋. BridgeData V2 60,096 trajectory, DROID 약 76k(약 350시간), Open X-Embodiment 100만+ trajectory와 22종 로봇, Ego4D 약 3,700시간 (Xu 2025, p.25)*

![[assets/xu-2025-an-anatomy-of-vision-language-action-models/tabs3.png]]
*Table S3: VLA milestone 모델의 perception·brain·action 구성과 학습 방식·데이터셋·평가 환경 (Xu 2025, p.27)*

Table S3에서 action 표현이 discrete(autoregressive)에서 continuous(DDPM·flow matching)로 옮겨 간 흐름이 보인다. brain도 LSTM·Transformer에서 VLM으로 넘어가는 추세다.

## 저자들이 제시한 방향 (Future Directions)

각 도전 과제 절은 "현재 추세 → 방향" 형식으로 끝난다.

- **일반화**: 지금은 scaling law에 기대 성격이 다른 데이터를 모아 수동적 imitation learning으로 큰 모델을 학습시키는 흐름이다. 성공률은 올랐지만 모델은 하드웨어에 묶여 있고 학습 후 고정된다. 저자들은 의미 수준 planning과 저수준 제어를 분리한 morphology-agnostic 표현으로 옮겨 가 새 로봇을 주변기기처럼 붙이는 zero-shot cross-embodiment 전이를, 나아가 스스로 탐색해 데이터를 만드는 자율적 개방형 진화를 제안한다.
- **안전**: 현재의 안전 장치는 규칙 기반 방패나 사후 합리화라 policy의 결정 과정과 분리돼 있어 실시간 환각이나 확신에 찬 오작동을 막지 못한다. 저자들이 내놓은 답은 epistemic uncertainty를 능동적으로 추정하는 System 2 반성 층, 즉 의심할 줄 아는 능력이다.
- **데이터와 평가**: 실세계 수집은 본질적으로 확장이 어렵고 잡음이 많다. 시뮬레이션을 1차 데이터 공장으로 삼고 실데이터는 시뮬레이터의 물리·렌더링을 보정하는 alignment 용도로 돌리자는 제안, 실패 trajectory를 negative mining의 재료로 삼자는 제안, 이진 성공률 대신 안전 여유·효율·교란 내성까지 재는 진단형 stress test로 바꾸자는 제안이 따른다.

기본 모듈(Section 2)은 도전 과제 분석에 지면을 몰아주느라 요약본으로 줄였다고 저자들이 명시한다. 아키텍처 taxonomy가 필요하면 다른 서베이를 보라고 안내한다.

## 관련 페이지 (Related Pages)

- [[physical-ai/liu-2025-generative-physical-ai-in-vision]] — physics-aware generation 서베이. 이 서베이가 도전 과제 1에서 다루는 predictive world model을 생성 모델 쪽에서 확대하고, future direction으로 "VLA에 물리 추론을 명시적으로 주입"을 든다
- [[physical-ai/kawaharazuka-2025-vision-language-action-models-for-robotics]] — 이 논문이 참고문헌 [8]로 인용한 full-stack 서베이. 아키텍처 7분류와 하드웨어·데이터 수집을 더 자세히 다룬다. 도전 과제 중심인 이 페이지와 서로 보완한다
- [[physical-ai/hou-2026-world-model-for-robot-learning]] — 도전 과제 1의 최상위층인 predictive world model만 따로 다룬 서베이
- [[physical-ai/brohan-2022-rt-1-robotics-transformer-for-real-world]] — 연표의 출발점. Transformer 기반 end-to-end 로봇 policy
- [[physical-ai/brohan-2023-rt-2-vision-language-action-models-transfer-web]] — VLM을 두뇌로 쓰는 방식의 milestone
- [[physical-ai/kim-2024-openvla-an-open-source-vision-language-action-model]] — SigLIP+DINOv2 hybrid encoder의 대표 사례
- [[physical-ai/black-2024-pi0-a-vision-language-action-flow-model]] — action을 flow matching으로 내는 계열의 출발점
- [[physical-ai/black-2025-pi05-a-vision-language-action-model-with]] — 이산·연속 혼합 action과 계층 구조를 한 가중치로 묶은 후속
- [[overviews/glossary-physical-ai]] — 용어 canonical 표기
