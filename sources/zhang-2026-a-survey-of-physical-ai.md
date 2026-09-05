---
title: "A Survey of Physical AI: A History from ChatGPT to World Models and Embodied Agents"
type: paper
year: 2026
category: physical-ai
raw_path: raw/papers/zhang-2026-a-survey-of-physical-ai.pdf
raw_filename: "zhang-2026-a-survey-of-physical-ai.pdf"
source_collection: external
authors: "Haichao Zhang, Mingfei Chen, Shwai He, Zhengtong Xu, Yifan Shen, Yiyang Huang, Jianglin Lu, Yijiang Li, Yu She, Yun Fu"
doi: "10.20944/preprints202606.0173.v1"
tags: [physical-ai, vla, world-model, robot-learning, benchmark]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/zhang-2026-a-survey-of-physical-ai/fig01.png
    raw: raw/papers/zhang-2026-a-survey-of-physical-ai-figures/fig01.png
    caption: "LLM-based world knowledge에서 Physical AI로 이어지는 로드맵. 왼쪽부터 LLM world knowledge, multimodal grounding(VLM/MLLM), action grounding(VLA), latent와 video와 상호작용 world model, policy learning과 embodied deployment 다섯 구간이고 각 구간 아래에 대표 연구가 붙어 있다"
    page: 4
    bbox_norm: [0.1099, 0.1249, 0.8951, 0.2596]
    strategy: manual
    curated: true
  - id: taba1
    label: Table A1
    kind: table
    file: assets/zhang-2026-a-survey-of-physical-ai/taba1.png
    raw: raw/papers/zhang-2026-a-survey-of-physical-ai-figures/taba1.png
    caption: "서베이의 범위 경계. 로드맵 다섯 구성요소별로 다루는 것과 다루지 않는 것을 갈라 적었다"
    page: 13
    bbox_norm: [0.1185, 0.1354, 0.8815, 0.472]
    strategy: table-region
    curated: false
  - id: taba2
    label: Table A2
    kind: table
    file: assets/zhang-2026-a-survey-of-physical-ai/taba2.png
    raw: raw/papers/zhang-2026-a-survey-of-physical-ai-figures/taba2.png
    caption: "기존 서베이 관점과의 비교. Physical AI 일반, vision 중심, VLA 중심, world model 중심 네 계열을 LLM world knowledge, VLA와 action grounding, world model, closed system 네 항목으로 Limited, Partial, Strong 등급을 매겼다"
    page: 14
    bbox_norm: [0.1099, 0.1309, 0.8901, 0.6221]
    strategy: manual
    curated: false
  - id: taba3
    label: Table A3
    kind: table
    file: assets/zhang-2026-a-survey-of-physical-ai/taba3.png
    raw: raw/papers/zhang-2026-a-survey-of-physical-ai-figures/taba3.png
    caption: "로드맵 확장 taxonomy. 여섯 단계마다 주된 표현 형식, Physical AI에서 맡는 역할, 대표 연구를 한 줄로 묶었다"
    page: 15
    bbox_norm: [0.1185, 0.2492, 0.8815, 0.6568]
    strategy: table-region
    curated: true
  - id: taba4
    label: Table A4
    kind: table
    file: assets/zhang-2026-a-survey-of-physical-ai/taba4.png
    raw: raw/papers/zhang-2026-a-survey-of-physical-ai-figures/taba4.png
    caption: "world model 확장 taxonomy. 무엇을 예측하는지를 기준으로 model-based RL 계열, video 계열, latent 계열, interactive와 action-conditioned 계열로 나눴다"
    page: 16
    bbox_norm: [0.1185, 0.1672, 0.8815, 0.5299]
    strategy: table-region
    curated: false
  - id: taba5
    label: Table A5
    kind: table
    file: assets/zhang-2026-a-survey-of-physical-ai/taba5.png
    raw: raw/papers/zhang-2026-a-survey-of-physical-ai-figures/taba5.png
    caption: "로드맵 단계별 평가 프로토콜. 단계마다 어떤 벤치마크로 무엇을 재야 하는지와 대표 벤치마크를 붙였다"
    page: 18
    bbox_norm: [0.1185, 0.1354, 0.8815, 0.6081]
    strategy: table-region
    curated: true
  - id: taba6
    label: Table A6
    kind: table
    file: assets/zhang-2026-a-survey-of-physical-ai/taba6.png
    raw: raw/papers/zhang-2026-a-survey-of-physical-ai-figures/taba6.png
    caption: "공개 수준이 제한된 frontier 시스템 정리. GPT-4와 Claude 계열 어시스턴트, Gemini Robotics, GR00T N1, π 계열을 공개 범위와 로드맵에서의 역할로 분류했다"
    page: 19
    bbox_norm: [0.1185, 0.1838, 0.8815, 0.5784]
    strategy: table-region
    curated: false
  - id: taba7
    label: Table A7
    kind: table
    file: assets/zhang-2026-a-survey-of-physical-ai/taba7.png
    raw: raw/papers/zhang-2026-a-survey-of-physical-ai-figures/taba7.png
    caption: "로드맵 구성요소별 대표 실패 양상. LLM의 환각부터 embodied 시스템의 센서와 지연 문제까지 일곱 층의 전형적 실패와 그것이 Physical AI에서 문제가 되는 이유를 나란히 적었다"
    page: 20
    bbox_norm: [0.1185, 0.1049, 0.8815, 0.5055]
    strategy: table-region
    curated: true
  - id: taba8
    label: Table A8
    kind: table
    file: assets/zhang-2026-a-survey-of-physical-ai/taba8.png
    raw: raw/papers/zhang-2026-a-survey-of-physical-ai-figures/taba8.png
    caption: "다섯 과제를 interface mismatch, 향후 방향, 근거 연구 세 열로 펼친 표"
    page: 22
    bbox_norm: [0.1185, 0.2321, 0.8815, 0.6468]
    strategy: table-region
    curated: false
  - id: taba9
    label: Table A9
    kind: table
    file: assets/zhang-2026-a-survey-of-physical-ai/taba9.png
    raw: raw/papers/zhang-2026-a-survey-of-physical-ai-figures/taba9.png
    caption: "서베이가 쓰는 용어 정의. world knowledge, LLM-based world knowledge, world model, VLA model, Physical AI 다섯 항목"
    page: 23
    bbox_norm: [0.1185, 0.1049, 0.8815, 0.3374]
    strategy: table-region
    curated: false
---

## 한 줄 요약 (One-line Summary)

Physical AI를 로보틱스나 vision이 아니라 LLM이 품고 있는 world knowledge에서 출발하는 문제로 놓고, 그 언어 기반 지식이 perception → action → world model → policy learning → 실환경 배포로 내려가며 어떻게 물리적으로 쓸모 있어지는지를 여섯 단계 로드맵으로 정리한 서베이다.

## 1. 자료 정보 (Document Information)

- **저자**: Haichao Zhang(Northeastern University, 교신저자), Yiyang Huang, Jianglin Lu, Yun Fu(Northeastern), Mingfei Chen(University of Washington), Shwai He(University of Maryland, College Park), Zhengtong Xu, Yu She(Purdue), Yifan Shen(UIUC), Yijiang Li(UC San Diego).
- **발표**: Preprints.org, 2026년 6월 2일 게시. doi 10.20944/preprints202606.0173.v1. 심사를 거치지 않은 preprint이고 CC BY 4.0으로 배포된다.
- **분량**: 총 30쪽. 본문은 서론부터 결론까지 9쪽 남짓으로 짧고, 부록 A.1~A.9가 표 아홉 개와 함께 절반 이상을 차지한다. 인용 문헌은 148편.
- **부속 자료**: 저자들이 관련 논문 목록을 github.com/Hai-chao-Zhang/Awesome-Physical-AI 에 따로 모아 두었다고 밝힌다.
- **성격**: 방법을 백과사전식으로 나열하는 서베이가 아니라, 언어에서 물리로 내려가는 경로 하나를 기준으로 삼아 기존 연구를 다시 배치한 관점 논문에 가깝다. 본문이 짧은 대신 근거와 목록은 부록 표로 밀어 두었다.

## 2. 주요 기여 (Key Contributions)

저자들이 직접 꼽은 기여는 넷이다.

- **world knowledge 중심의 Physical AI 정의**. Physical AI를 "언어에서 온 의미, 상식, 절차, 인과 지식을 multimodal perception, 물리 예측, 시뮬레이션, planning, policy learning, embodied action으로 grounding하는 시스템"으로 규정한다. foundation model 시대의 Physical AI를 이 각도에서 정의한 서베이는 자신들이 처음이라고 주장한다.
- **언어 중심의 문헌 재배치**. 연도순이나 방법 계열이 아니라, 언어에서 온 지식이 어느 인터페이스를 통해 물리적으로 쓸모 있어지는지를 기준으로 기존 연구를 묶었다.
- **계층형 로드맵**. LLM world knowledge → multimodal grounding → action grounding → world modeling → policy learning → embodied deployment의 여섯 층이 서로를 어떻게 받쳐 주는지를 그림 한 장과 표 하나로 압축했다.
- **배포 관점의 과제 정리**. 촘촘한 물리 표현, 언어와 action 사이의 grounding, 긴 시간대의 world model, sim2real, closed-loop 평가, 안전, 재현성, 비공개 frontier 시스템을 걸림돌로 짚는다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

서베이의 뼈대는 Figure 1의 로드맵이고, 본문 각 장이 그 한 칸씩을 맡는다.

### 3.1 LLM이 가진 world knowledge (Section 2)

저자들은 world knowledge를 하나의 저장소가 아니라 서로 물린 여러 종류의 사전 지식으로 본다. 의미 지식은 대상 범주와 지시 표현을, 상식은 기본 가정과 안전 제약을, 절차 지식은 과제 분해를, 인과 지식은 결과와 위험을, 공간 지식은 배치와 조작 전제조건을 담당한다. 여기에 affordance 지식이 붙는다. affordance는 물체가 허용하는 상호작용 가능성을 뜻하고, 최근에는 AffordanceLLM, ManipVQA, RoboPoint처럼 이걸 직접 예측하는 모델로 구체화됐다.

이 지식이 Physical AI에서 실제로 쓰이는 방식은 네 가지로 정리된다. SayCan은 LLM이 뽑은 단계 시퀀스를 학습된 affordance 값으로 걸러 물리적으로 불가능한 action을 쳐내고, Inner Monologue는 환경 관찰을 언어로 되먹여 실행 중 재계획을 수행한다. Code as Policies와 ProgPrompt는 산문 대신 실행 가능한 로봇 프로그램을 짜게 하고, Voyager는 그렇게 만든 skill을 계속 쌓아 올린다. VoxPoser는 지시문에서 공간 value map을 합성해 reward 설계 부담을 줄인다. 그리고 여러 단계에 걸친 과제에서는 LLM이 도구와 하위 모듈을 지휘하는 조정자 역할을 맡는다.

한계는 결국 언어와 물리 사이의 추상화 격차다. 언어는 연속적인 물리 상태를 성기게 압축하기 때문에 자세, 속도, 접촉, 변형, 불확실성, embodiment 제약이 빠진다. 유리가 깨지기 쉽다거나 손잡이를 잡을 수 있다는 사실은 알아도, 기하, 접촉, 마찰, 미래 trajectory를 추정하지는 못한다. LLM-modulo 계열 분석과 PlanBench 갱신판이 검증기 없는 언어 모델의 planning이 왜 불안정한지를 보였고, PHYBench와 PhysToolBench 같은 물리 추론 벤치마크가 동역학과 도구 사용에서 같은 약점을 드러낸다.

### 3.2 perception으로의 grounding (Section 3)

VLM과 MLLM은 언어 지식을 눈앞의 장면에 붙이는 첫 다리다. CLIP, Flamingo, BLIP-2, LLaVA 계열로 이어지는 흐름에서 언어는 열린 어휘의 시각 인터페이스가 됐고, 최근 MLLM은 region, mask, point 감독이나 pointing 감독으로 grounding을 더 촘촘하게 만든다. 시간축에서는 TimeChat, VTG-LLM, Grounded-VideoLLM, VQToken, TimeSuite가 타임스탬프와 순간을 명시적으로 다루고, VideoGLaMM은 픽셀 수준으로 내려간다.

그럼에도 grounding은 대체로 의미 수준에 머문다는 게 이 장의 결론이다. BLINK는 저수준 시각 지각을, Video-MME는 긴 영상 이해를, PhysBench, QuantiPhy, MASS-Bench는 물리 추론과 정량 물리, 움직임을 고려한 시공간 grounding을 각각 시험하는데 여기서 격차가 드러난다. 물체를 짚어내도 자세, 깊이, 불확실성, 도달 가능성은 내놓지 못한다. 그래서 저자들은 VLM을 완결된 물리 모델이 아니라 grounding 층으로만 취급하라고 못 박는다.

### 3.3 action으로의 grounding (Section 4)

VLA는 시각 입력과 언어 목표를 실행 가능한 출력으로 잇는다. action을 어떤 형식으로 적을지에서 세 가지로 나뉜다. 하나는 이산 토큰화다. RT-2와 OpenVLA가 대표이고, FAST는 고주파 action 시퀀스를 주파수 영역에서 토큰화해 π0 같은 모델과 결합한다. 다른 하나는 연속적인 chunk나 trajectory를 뽑는 쪽으로, ACT, π0, π0.5, DexVLA, RDT-1B가 여기 속한다. 세 번째는 action 인터페이스 자체에 기하를 넣는 방식이다. SpatialVLA는 적응형 3D action grid로 후보 동작을 자기중심 좌표에 붙이고, 3D-VLA는 3D 상호작용 토큰으로 목표 지점이나 motion primitive를 예측한다.

언어를 action에 붙이는 계보는 PaLM-E가 embodied multimodal 표현으로 로봇 추론과 planning이 된다는 걸 보인 데서 시작해, RT-2가 웹 규모 vision-language 과제와 로봇 trajectory를 함께 fine-tuning하며 action을 텍스트 같은 토큰으로 적는 방식을 확립하면서 분명해졌다. 규모를 키우려면 데이터와 인터페이스가 필요했고 Open X-Embodiment와 RT-X가 여러 embodiment의 데이터를 한 형식으로 표준화했다. Octo와 OpenVLA가 그 위에서 범용 policy를 학습한다.

최근 흐름은 추론과 동작 생성을 갈라 놓는 하이브리드다. VLM이 지시문, 물체 의미, 공간 관계, 과거 맥락을 담당하고, 별도의 policy가 그 결과를 embodiment 제약 아래 고주파 action으로 바꾼다. π0는 pre-training된 VLM에 flow matching action expert를 붙였고 π0.5는 로봇, 웹, 의미 예측 과제를 섞는 co-training을 더했다. DexVLA는 diffusion expert를, RDT-1B는 양팔 조작용 diffusion을, GR00T N1은 humanoid용 diffusion transformer를 쓴다. TinyVLA, SmolVLA, Xiaomi-Robotics-0, StarVLA-α는 실시간 실행과 효율이 로드맵의 일부임을 보여준다. 오프라인 imitation learning 바깥으로 나가는 시도도 있다. π*0.6은 실제 배포에서 얻은 경험과 사람의 교정 개입으로 강화학습을 수행하고, MEM은 영상과 텍스트 기억을 붙여 긴 과제와 이력 기반 적응을 노린다.

그래도 VLA만으로는 부족하다는 게 4.4절의 요지다. VLA의 추론은 여전히 의미 수준이라 마찰, 컴플라이언스, 접촉 기하, 힘, 타이밍처럼 언어로 적기 어려운 요소를 다루지 못한다.

### 3.4 world model (Section 5)

이 서베이가 가장 공들여 가르는 구분이 여기 있다. LLM의 world knowledge는 무엇이 그럴듯하고 어떤 action이 의미 있는지를 알려주고, world model은 지금 상태와 가능한 action에서 다음에 무엇이 일어날지를 추정한다. world model은 미래 observation, latent state, reward, value, action의 결과를 예측하거나 시뮬레이션하는 모델을 뜻한다.

예측 대상에 따라 세 가지로 나뉜다. 픽셀을 그리는 video 계열에는 GAIA-1과 UniSim 같은 생성형 시뮬레이터와 상호작용 환경 모델 Genie가 있고, Cosmos는 이를 로보틱스, 자율주행, 합성 데이터 생성에 맞춰 조정 가능한 world foundation model로 내세운다. 저자들은 사실적인 영상 생성이 곧 world model은 아니라고 선을 긋는다. 시간적 일관성, 조종 가능성, action 조건화, 물리적 타당성이 함께 있어야 한다. latent 계열은 픽셀 복원 대신 표현 공간에서 예측한다. PlaNet과 Dreamer 같은 model-based 강화학습 계열과 JEPA 계열이 여기 속하고, V-JEPA 2는 자기지도 영상 표현 학습을 로봇 trajectory로 post-training해 action 조건부 예측으로 잇는다. 세 번째는 상호작용과 action 조건부 계열인데, 특정 action을 취했다면 무엇이 달라졌을지를 추정하기 때문에 실행 전 검토, 안전 평가, 복구에 직접 쓰인다.

### 3.5 모델에서 시스템으로 (Section 6)

embodied agent는 지시를 파싱하고 과제 구조를 추론한 뒤 물체와 상태를 grounding하고 action과 trajectory를 골라 실행하고 결과를 확인하는 전체 고리다. 여기서 action 모델은 부품 하나일 뿐이고 상태 추정, 실행 인터페이스, 컨트롤러 거동, 온라인 검증이 성능을 함께 좌우한다. 상위 모듈이 언어, 기호 상태, 물체 관계, keypoint 제약, value map, 로봇 프로그램 중 무엇을 다음 층에 넘길지, 불확실성을 어떻게 넘길지, 언제 계속하지 말고 다시 계획할지가 설계 문제로 남는다.

평가에 대한 문제 제기가 이 장의 핵심이다. 고정된 입력에 대한 정확도는 compounding error, 복구 실패, 상태 이탈에 대한 민감도를 가린다. LIBERO, RoboCasa, BEHAVIOR, RoboSuite, EmbodiedBench 같은 시도가 있지만, 저자들은 과제 성공률만이 아니라 실패 양상, 개입 횟수, 교란에 대한 견고성, 그리고 물체, 장면, 지시문, 초기 상태, embodiment를 바꿨을 때의 일반화를 함께 보고해야 한다고 요구한다. 구현 세부가 성능을 크게 흔들기 때문에 실제 기기 평가는 여전히 필요하다는 단서도 붙인다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

서베이라 자체 실험은 없다. 실질적인 산출물은 부록의 표 아홉 개다.

- **Table A1, 범위 경계**: 로드맵 다섯 구성요소마다 다루는 것과 다루지 않는 것을 갈랐다. 예컨대 world model은 예측, 시뮬레이션, planning, policy learning을 돕는 경우만 포함하고, 영상 생성 전반이나 model-based 강화학습 전반은 뺀다.
- **Table A2, 기존 서베이 대비**: Physical AI 일반 서베이, vision 중심 생성형 Physical AI, VLA와 로봇 foundation model 연구, world model 중심 연구를 네 항목으로 등급을 매기고 자기 논문만 네 항목 모두 Strong으로 적었다. 자기 평가라는 점은 감안해서 읽어야 한다.
- **Table A3, 로드맵 taxonomy**: 여섯 단계별 주된 표현 형식과 역할, 대표 연구. LLM은 텍스트와 파라미터, multimodal grounding은 이미지와 영상 기반 언어 표현, action grounding은 action 토큰, trajectory, action chunk, skill, world modeling은 미래 픽셀, latent state, reward, value, policy learning은 학습된 policy와 action expert, deployment는 감지, planning, 실행, 검증, 복구가 물린 closed-loop 시스템이다.
- **Table A4, world model taxonomy**: 예측 대상 기준으로 model-based 강화학습 계열, video 계열, latent 계열, 상호작용과 action 조건부 계열을 가른다.
- **Table A5, 단계별 평가 프로토콜**: LLM 단계는 PHYBench, PhySense, PhysToolBench, VLM 단계는 BLINK, Video-MME, PhysBench, QuantiPhy, MASS-Bench, VLA 단계는 LIBERO와 LIBERO-Pro, world model 단계는 Dreamer, Genie, Cosmos, V-JEPA 2, embodied agent 단계는 BEHAVIOR, EmbodiedBench, RoboSuite, RoboCasa, 비공개 frontier 시스템은 제품 수준 평가로 배치한다.
- **Table A6, frontier와 비공개 시스템**: GPT-4 계열 어시스턴트, Claude 계열, Gemini Robotics와 1.5, GR00T N1, π 계열을 공개 수준과 역할로 분류한다. 학습 데이터, 아키텍처, 평가 절차가 공개되지 않아 학술 모델과 같은 잣대로 다룰 수 없다는 점을 명시한다.
- **Table A7, 실패 양상**: LLM의 환각과 과신, VLM의 서술은 맞지만 촘촘한 grounding은 약한 문제, VLA의 cross-embodiment 일반화와 취약한 복구, world model의 시각적으로는 그럴듯하지만 물리적으로 어긋난 미래, policy의 오프라인 성공과 closed-loop 실패, 시스템의 센서, 보정, 지연, 하드웨어 문제, 비공개 시스템의 재현성 문제를 층별로 적었다. 여기에 붙은 디버깅 규칙이 표 자체보다 쓸모 있다. action 이전에 실패하면 world knowledge나 perception grounding을, 실행 중이면 action 표현이나 embodiment 전이나 컨트롤러를, 여러 단계 뒤면 world model, compounding error, 기억, 복구를, 시뮬레이션은 되는데 실제 기기에서 안 되면 sim2real과 감지, 보정, 지연을 의심하라는 것이다.
- **Table A8, 과제와 인터페이스 불일치**: 다섯 과제를 인터페이스 불일치, 향후 방향, 근거 연구 세 열로 펼쳤다.
- **Table A9, 용어 정의**: world knowledge, LLM-based world knowledge, world model, VLA model, Physical AI 다섯 개를 이 서베이가 쓰는 뜻으로 못 박는다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

본문 7장이 꼽는 과제는 네 가지다. 언어에 갇힌 암묵적 지식을 기하, 움직임, 접촉, 힘, 불확실성, 시간 변화 같은 촘촘한 물리 변수로 옮기는 일, 의미 수준 grounding을 공간, 시간, affordance, 정량 물리로 끌어내리는 일, embodiment마다 다른 action 형식과 부족한 로봇 데이터를 넘어설 확장 가능한 표현과 cross-embodiment 전이, 그리고 영상 생성이 곧 world model이 아니라는 전제 위에서 action 조건부이고 조종 가능하며 물리적으로 타당한 예측 모델을 만드는 일이다. 배포 쪽에서는 sim2real, 잡음과 지연에 대한 견고성, 안전, closed-loop 복구, 재현 가능한 평가가 함께 요구된다.

저자들이 밝힌 서베이 자체의 한계도 분명하다. 언어에서 출발하는 경로 하나에 집중했기 때문에 로보틱스, 제어, 시뮬레이션, 촉각, 음향, cyber-physical 전반을 망라하지 않는다. 촉각, 힘 피드백, 소리, 재질, 질량 추정, 유체나 변형체 동역학은 로드맵과 직접 닿을 때만 언급한다.

읽는 쪽에서 감안할 점을 더하자면 세 가지다. 심사를 거치지 않은 preprint이고, 정량 비교나 자체 실험이 전혀 없으며, 부록 표의 등급 판정이 저자들의 판단이라 근거가 인용 나열 수준에 머문다. 개별 방법의 세부는 이 논문에서 얻기 어렵고, 로드맵이라는 배치도로 쓰는 게 맞다.

## 6. 관련 연구 (Related Work)

- 이 논문이 대비 대상으로 삼은 계열: Physical AI 일반 서베이, vision 중심 생성형 Physical AI 서베이, VLA와 로봇 foundation model 연구, world model 중심 연구. Table A2가 그 비교표다.
- wiki 내부에서 겹치는 자료: [[physical-ai/li-2025-a-comprehensive-survey-on-world]]와 [[physical-ai/hou-2026-world-model-for-robot-learning]]이 world model 쪽을 훨씬 깊게 파고, [[physical-ai/kawaharazuka-2025-vision-language-action-models-for-robotics]]와 [[physical-ai/xu-2025-an-anatomy-of-vision-language-action-models]]는 VLA 내부 구조와 도전 과제를 상세히 다룬다. 이 논문은 그 사이를 언어 중심 기준으로 꿰는 상위 지도에 해당한다.
- 로드맵 각 칸의 대표 모델 중 wiki에 개별 페이지가 있는 것: RT-1, RT-2, OpenVLA, π0, π0.5, GR00T N1, Open X-Embodiment.

## 7. 용어집 (Glossary)

| 용어 | 설명 |
|---|---|
| LLM-based world knowledge | pre-training으로 LLM 파라미터에 남은 언어 매개 사전 지식. 프롬프트, 문맥, agentic 추론으로 끄집어낸다. 이 서베이의 출발점이자 조직 기준이다 |
| world knowledge vs world model | 앞은 무엇이 그럴듯하고 어떤 action이 의미 있는지에 대한 사전 지식, 뒤는 지금 상태와 action에서 다음에 무엇이 일어날지 추정하는 예측 장치. 서베이 전체가 이 구분 위에 서 있다 |
| multimodal grounding | 언어에서 온 지식을 이미지, 영상, 영역, 물체, 공간 관계, affordance에 붙이는 단계. VLM과 MLLM이 맡는다 |
| action grounding | perception과 언어를 실행 가능한 action으로 잇는 단계. VLA가 맡는다 |
| interface mismatch | 로드맵의 각 층이 다음 층에 넘기는 표현이 어긋나는 지점. Table A8이 과제마다 이 불일치를 지목한다 |
| closed frontier system | Gemini Robotics나 π 계열처럼 능력은 분야를 이끌지만 학습 데이터, 구조, 평가 절차가 공개되지 않아 학술 모델과 같은 방식으로 비교할 수 없는 시스템 |

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 4 | LLM world knowledge에서 Physical AI까지의 다섯 구간 로드맵 (대표 연구 포함) | manual | ★ wiki 권장 (architecture) |
| taba1 | 13 | 서베이 범위 경계, 다루는 것과 다루지 않는 것 | table-region | (확인 필요) |
| taba2 | 14 | 기존 서베이 관점과의 비교 격자 | manual | ★ wiki 권장 (positioning) |
| taba3 | 15 | 로드맵 여섯 단계 확장 taxonomy | table-region | ★ wiki 권장 (method) |
| taba4 | 16 | world model 확장 taxonomy | table-region | ★ wiki 권장 (method) |
| taba5 | 18 | 단계별 평가 프로토콜과 대표 벤치마크 | table-region | ★ wiki 권장 (evaluation) |
| taba6 | 19 | frontier와 비공개 시스템 분류 | table-region | (확인 필요) |
| taba7 | 20 | 층별 실패 양상 | table-region | ★ wiki 권장 (practical) |
| taba8 | 22 | 과제 × interface mismatch × 향후 방향 | table-region | (확인 필요) |
| taba9 | 23 | 서베이 용어 정의 다섯 항목 | table-region | (확인 필요) |
