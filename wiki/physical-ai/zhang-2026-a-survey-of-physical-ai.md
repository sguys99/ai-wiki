---
title: "A Survey of Physical AI: A History from ChatGPT to World Models and Embodied Agents"
type: paper
year: 2026
category: physical-ai
raw_path: raw/papers/zhang-2026-a-survey-of-physical-ai.pdf
raw_filename: "zhang-2026-a-survey-of-physical-ai.pdf"
source_collection: external
source: zhang-2026-a-survey-of-physical-ai.md
authors: "Haichao Zhang, Mingfei Chen, Shwai He, Zhengtong Xu, Yifan Shen, Yiyang Huang, Jianglin Lu, Yijiang Li, Yu She, Yun Fu"
doi: "10.20944/preprints202606.0173.v1"
tags: [physical-ai, vla, world-model, robot-learning, benchmark]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/zhang-2026-a-survey-of-physical-ai/fig01.png
    raw: raw/papers/zhang-2026-a-survey-of-physical-ai-figures/fig01.png
    caption: "LLM-based world knowledge에서 Physical AI로 이어지는 로드맵. 왼쪽부터 LLM world knowledge, multimodal grounding(VLM/MLLM), action grounding(VLA), latent·video·interactive world model, policy learning과 embodied deployment 다섯 구간이고 각 구간 아래에 대표 연구가 붙어 있다"
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
    caption: "기존 서베이 관점과의 비교. Physical AI 일반·vision 중심·VLA 중심·world model 중심 네 계열을 LLM world knowledge, VLA·action grounding, world model, closed system 네 축으로 Limited·Partial·Strong 등급을 매겼다"
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
    caption: "world model 확장 taxonomy. 무엇을 예측하는지를 기준으로 model-based RL 계열, video 계열, latent 계열, interactive·action-conditioned 계열로 나눴다"
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
    caption: "공개 수준이 제한된 frontier 시스템 정리. GPT-4·Claude 계열 어시스턴트, Gemini Robotics, GR00T N1, π 계열을 공개 범위와 로드맵에서의 역할로 분류했다"
    page: 19
    bbox_norm: [0.1185, 0.1838, 0.8815, 0.5784]
    strategy: table-region
    curated: false
  - id: taba7
    label: Table A7
    kind: table
    file: assets/zhang-2026-a-survey-of-physical-ai/taba7.png
    raw: raw/papers/zhang-2026-a-survey-of-physical-ai-figures/taba7.png
    caption: "로드맵 구성요소별 대표 실패 양상. LLM의 환각부터 embodied 시스템의 센서·지연 문제까지 일곱 층의 전형적 실패와 그것이 Physical AI에서 문제가 되는 이유를 나란히 적었다"
    page: 20
    bbox_norm: [0.1185, 0.1049, 0.8815, 0.5055]
    strategy: table-region
    curated: true
  - id: taba8
    label: Table A8
    kind: table
    file: assets/zhang-2026-a-survey-of-physical-ai/taba8.png
    raw: raw/papers/zhang-2026-a-survey-of-physical-ai-figures/taba8.png
    caption: "다섯 과제를 interface mismatch·향후 방향·근거 연구 세 열로 펼친 표"
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

## 요약 (Summary)

Physical AI를 다루는 서베이는 대개 로봇 쪽이나 vision 쪽에서 출발한다. 이 논문은 출발점을 LLM에 두었다. ChatGPT 계열 모델이 pre-training으로 얻은 의미·상식·절차·인과 지식을 world knowledge라 부르고, 그것이 물리 세계에서 쓸모 있어지려면 어떤 층을 더 거쳐야 하는지를 여섯 단계로 배치한다. LLM world knowledge에서 시작해 multimodal grounding, action grounding, world model, policy learning을 거쳐 실환경 배포에 닿는 경로다.

논지 자체는 간명하다. 언어는 물리 상태를 성기게 압축한다. 유리가 깨지기 쉽다는 사실은 알아도 자세·속도·접촉·마찰·미래 trajectory는 담기지 않는다. VLM은 그 지식을 눈앞의 장면에 붙여 주지만 여전히 언어로 답을 내놓는다. VLA는 실행 가능한 출력까지 내려가지만 action을 취했을 때 세계가 어떻게 변할지에 대한 예측 모델은 갖고 있지 않다. 그 빈자리를 world model이 맡는다는 것이다.

본문은 9쪽으로 짧고 부록 표 아홉 개가 절반 이상을 차지한다. 개별 방법의 세부를 얻기에는 얇고, 분야 전체를 어디에 놓고 볼지 정하는 배치도로 쓰기에 알맞다. 심사를 거치지 않은 preprint이며 자체 실험이나 정량 비교는 없다.

![[assets/zhang-2026-a-survey-of-physical-ai/fig01.png]]
*Figure 1: LLM-based world knowledge에서 Physical AI로 이어지는 로드맵. 다섯 구간 아래에 각각의 대표 연구가 앵커로 붙어 있다 (Zhang 2026, p.3)*

## 주요 기여 (Key Contributions)

저자들이 내세우는 것은 새 방법이 아니라 재배치다. foundation model 시대의 Physical AI를 world knowledge 관점에서 정의한 첫 서베이라고 주장하며, 연도순이나 방법 계열 대신 "언어에서 온 지식이 어느 인터페이스를 거쳐 물리적으로 쓸모 있어지는가"를 조직 축으로 삼았다. 여기에 배포를 가로막는 걸림돌 — 촘촘한 물리 표현, 언어와 action 사이의 grounding, 긴 시간대의 world model, sim2real, closed-loop 평가, 안전, 재현성, 비공개 frontier 시스템 — 을 덧붙인다.

## 로드맵의 여섯 층 (The Six-Layer Roadmap)

### LLM의 world knowledge와 그 한계

world knowledge는 하나의 저장소가 아니라 서로 물린 여러 갈래로 본다. 의미·상식·절차·인과·공간 지식에 affordance 지식이 붙는다. affordance는 물체가 허용하는 상호작용 가능성을 뜻하며, AffordanceLLM·ManipVQA·RoboPoint처럼 이걸 직접 예측하는 모델로 구체화됐다.

실제 활용은 네 갈래다. SayCan은 LLM이 뽑은 단계 시퀀스를 학습된 affordance 값으로 걸러 물리적으로 불가능한 action을 쳐낸다. Inner Monologue는 환경 관찰을 언어로 되먹여 실행 중 재계획을 돌린다. Code as Policies와 ProgPrompt는 산문 대신 실행 가능한 로봇 프로그램을 짜게 하고 Voyager는 그렇게 만든 skill을 계속 쌓는다. VoxPoser는 지시문에서 공간 value map을 합성해 reward 설계 부담을 던다.

한계는 언어와 물리 사이의 추상화 격차로 수렴한다. LLM-modulo 계열 분석과 PlanBench 갱신판은 검증기 없는 언어 모델의 planning이 왜 흔들리는지를 보였고, PHYBench·PhysToolBench 같은 벤치마크가 동역학과 도구 사용에서 같은 약점을 짚는다.

### perception과 action으로의 grounding

VLM과 MLLM은 언어 지식을 장면에 붙이는 첫 다리다. 최근 모델은 region·mask·point 감독으로 grounding을 촘촘하게 만들고, 시간축에서는 TimeChat·Grounded-VideoLLM 계열이 타임스탬프와 순간을 명시적으로 다룬다. 그래도 BLINK·Video-MME·PhysBench·QuantiPhy·MASS-Bench가 드러내는 격차는 그대로다. 물체를 짚어내도 자세·깊이·불확실성·도달 가능성은 나오지 않는다.

VLA 층에서는 action을 어떤 형식으로 적을지가 갈린다. RT-2와 OpenVLA는 이산 토큰화, ACT·π0·π0.5·DexVLA·RDT-1B는 연속 chunk나 trajectory, SpatialVLA와 3D-VLA는 action 인터페이스 자체에 기하를 넣는 쪽이다. 최근 흐름은 추론과 동작 생성을 갈라 놓는 하이브리드다. VLM이 지시와 물체 의미와 공간 관계를 맡고 별도 policy가 그걸 embodiment 제약 아래 고주파 action으로 바꾼다. π0의 flow matching action expert, π0.5의 co-training, GR00T N1의 diffusion transformer가 그 사례고, π*0.6은 실제 배포에서 얻은 경험과 사람의 교정 개입으로 강화학습까지 끌고 간다.

### world model이 맡는 자리

이 서베이가 가장 공들여 가르는 구분이 여기 있다. LLM의 world knowledge는 무엇이 그럴듯하고 어떤 action이 의미 있는지를 알려주고, world model은 지금 상태와 가능한 action에서 다음에 무엇이 일어날지를 추정한다. world model은 미래 observation·latent 상태·reward·value·action 결과를 예측하거나 시뮬레이션하는 모델을 뜻한다.

갈래는 셋이다. GAIA-1·UniSim·Genie·Cosmos처럼 픽셀을 그리는 video 계열, PlaNet·Dreamer·JEPA·V-JEPA 2처럼 표현 공간에서 예측하는 latent 계열, 그리고 특정 action을 취했다면 무엇이 달라졌을지를 추정하는 상호작용·action 조건부 계열이다. 마지막 갈래가 실행 전 검토와 복구에 직접 쓰이기 때문에 Physical AI와 가장 가깝다. 사실적인 영상 생성이 곧 world model은 아니라는 단서가 반복해서 붙는다. 시간적 일관성, 조종 가능성, action 조건화, 물리적 타당성이 함께 있어야 한다.

![[assets/zhang-2026-a-survey-of-physical-ai/taba3.png]]
*Table A3: 로드맵 여섯 단계의 확장 taxonomy — 단계별 주된 표현 형식, Physical AI에서의 역할, 대표 연구 (Zhang 2026, p.14)*

## 평가를 어떻게 바꿔야 하는가 (Evaluation)

고정된 입력에 대한 정확도는 오차 누적과 복구 실패, 상태 이탈에 대한 민감도를 가린다. 저자들은 과제 성공률만이 아니라 실패 양상, 개입 횟수, 교란에 대한 견고성, 그리고 물체·장면·지시·초기 상태·embodiment를 바꿨을 때의 일반화를 함께 보고하라고 요구한다. 구현 세부가 성능을 크게 흔들기 때문에 실기기 평가는 여전히 필요하다는 단서도 붙는다.

Table A5는 이 요구를 단계별로 쪼갠 것이다. 어느 층이 고장 났는지 진단하는 지표와 시스템 전체가 배포 조건에서 작동하는지 보는 지표를 나눠 두었다.

![[assets/zhang-2026-a-survey-of-physical-ai/taba5.png]]
*Table A5: 로드맵 단계별 평가 프로토콜 — 무엇을 어떤 벤치마크로 재야 하는지 (Zhang 2026, p.17)*

## 층별 실패와 디버깅 (Failure Modes)

부록 A.7은 이 논문에서 실무적으로 가장 쓸모 있는 부분이다. LLM의 환각과 과신, VLM의 서술은 맞지만 촘촘한 grounding은 약한 문제, VLA의 cross-embodiment 일반화와 취약한 복구, world model의 시각적으로는 그럴듯하지만 물리적으로 어긋난 미래, policy의 오프라인 성공과 closed-loop 실패, 시스템의 센서·보정·지연 문제, 비공개 시스템의 재현성 문제를 층별로 갈라 놓았다.

여기 붙은 규칙이 표보다 오래 남는다. action 이전에 실패하면 world knowledge나 perception grounding을, 실행 중이면 action 표현이나 embodiment 전이나 컨트롤러를, 여러 단계 뒤면 world model·오차 누적·기억·복구를, 시뮬레이션은 되는데 실기기에서 안 되면 sim2real과 감지·보정·지연을 의심하라는 것이다. 로드맵을 분류표가 아니라 진단 도구로 쓰는 방식이다.

![[assets/zhang-2026-a-survey-of-physical-ai/taba7.png]]
*Table A7: 로드맵 구성요소별 대표 실패 양상과 그것이 Physical AI에서 문제가 되는 이유 (Zhang 2026, p.19)*

## 한계 (Limitations)

저자들은 언어에서 출발하는 경로 하나에 집중했다고 밝힌다. 촉각, 힘 피드백, 소리, 재질, 질량 추정, 유체나 변형체 동역학은 로드맵과 직접 닿을 때만 언급하고 로보틱스·제어·시뮬레이션 전반은 다루지 않는다.

읽는 쪽에서 감안할 것이 셋 더 있다. 심사를 거치지 않은 preprint이고, 자체 실험이나 정량 비교가 없으며, 기존 서베이와 자기 논문을 Limited·Partial·Strong으로 등급 매긴 Table A2는 저자 자평이라 근거가 인용 나열 수준이다. 개별 방법의 깊이는 다른 서베이에서 채우는 게 맞다.

## 관련 페이지 (Related Pages)

- [[physical-ai/li-2025-a-comprehensive-survey-on-world]] — world model 쪽을 훨씬 깊게 파는 서베이. 이 논문 5장이 압축한 내용의 확장판으로 읽으면 된다
- [[physical-ai/hou-2026-world-model-for-robot-learning]] — robot learning 문맥의 world model 서베이. video·latent·action 조건부 구분이 겹친다
- [[physical-ai/xu-2025-an-anatomy-of-vision-language-action-models]] — VLA 내부를 perception·brain·action 모듈로 해부한 서베이. 이 논문의 action grounding 한 칸을 통째로 확대한 셈이다
- [[physical-ai/kawaharazuka-2025-vision-language-action-models-for-robotics]] — 실환경 적용 관점의 VLA 리뷰
- [[physical-ai/black-2024-pi0-a-vision-language-action-flow-model]] · [[physical-ai/black-2025-pi05-a-vision-language-action-model-with]] — 로드맵의 reasoning-to-action 하이브리드 대표 사례
- [[physical-ai/open-x-embodiment-2023-robotic-learning-datasets-and-rt-x]] — action grounding 층의 데이터 표준화 축
- [[overviews/physical-ai-overview]] — 도메인 허브
- [[overviews/glossary-physical-ai]] — 용어 canonical 표기
