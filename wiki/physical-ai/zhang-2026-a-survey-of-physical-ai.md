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
    caption: "LLM-based world knowledge에서 Physical AI로 이어지는 로드맵. 왼쪽부터 LLM world knowledge, multimodal grounding, action grounding, latent와 video와 상호작용 world model, policy learning과 embodied deployment 다섯 구간이고 각 구간 아래에 대표 연구가 붙어 있다"
    page: 4
    bbox_norm: [0.1099, 0.1249, 0.8951, 0.2596]
    strategy: manual
    curated: true
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
  - id: taba5
    label: Table A5
    kind: table
    file: assets/zhang-2026-a-survey-of-physical-ai/taba5.png
    raw: raw/papers/zhang-2026-a-survey-of-physical-ai-figures/taba5.png
    caption: "로드맵 단계별 평가 프로토콜. 단계마다 무엇을 재야 하는지와 대표 벤치마크를 붙였다"
    page: 18
    bbox_norm: [0.1185, 0.1354, 0.8815, 0.6081]
    strategy: table-region
    curated: true
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
---

## 요약

이 서베이는 Physical AI를 로보틱스나 vision이 아니라 LLM이 담고 있는 world knowledge에서 출발하는 문제로 규정한다. world knowledge는 물체, 행위, 환경, 예상되는 결과에 대해 모델이 미리 갖고 있는 사전 지식을 말한다. 저자들은 pre-training으로 LLM 파라미터에 남은 이 언어 매개 지식이 어떤 인터페이스를 거쳐야 물리 세계에서 쓸모 있어지는지를 여섯 단계 로드맵으로 배치한다.

로드맵의 논지는 각 층이 앞 층의 결핍을 메운다는 것이다. 언어는 연속적인 물리 상태를 성기게 압축하므로 자세, 속도, 접촉, 변형, 마찰, 미래 trajectory를 담지 못한다. trajectory는 observation과 action이 시간순으로 이어진 실행 기록이다. VLM은 언어 지식을 눈앞의 장면에 붙여 주지만 여전히 언어로 답을 내놓고, VLA는 실행 가능한 출력까지 내려가지만 action을 취했을 때 세계가 어떻게 변할지에 대한 예측 모델은 갖고 있지 않다. 따라서 world model이 그 빈자리를 맡는다는 것이 이 논문의 핵심 주장이다.

문서 구성은 본문 9쪽과 부록 표 아홉 개다. 총 30쪽에 인용 문헌 148편이고, 저자들은 관련 논문 목록을 별도 저장소로 공개했다. 심사를 거치지 않은 preprint이며 자체 실험이나 정량 비교는 없다. 따라서 개별 방법의 세부를 얻기에는 얇고, 분야 전체를 어디에 놓고 볼지 정하는 배치도로 쓰기에 알맞다.

![[assets/zhang-2026-a-survey-of-physical-ai/fig01.png]]
*Figure 1: LLM-based world knowledge에서 Physical AI로 이어지는 로드맵. 다섯 구간 아래에 각각의 대표 연구가 앵커로 붙어 있다 (Zhang 2026, Figure 1, p.4)*

## 배경

Physical AI를 다루는 기존 논의는 대체로 세 갈림에서 출발했다. 로보틱스 쪽은 embodiment와 제어를 앞세우고, vision 쪽은 물리 인식과 생성을 앞세우며, cyber-physical 쪽은 배포와 센싱 인프라를 앞세운다. 세 관점 모두 유효하지만 Physical AI를 하나의 연구 문제가 아니라 응용 사례의 모음처럼 보이게 만든다는 것이 저자들의 진단이다.

이 논문이 택한 출발점은 네 번째 관점이다. GPT-4, Gemini, Claude 같은 frontier LLM이 텍스트 생성기에서 지시문 따르기, 과제 분해, tool use, planning, agentic 상호작용을 수행하는 범용 추론 엔진으로 바뀐 것이 계기다. 대규모 pre-training이 물체와 사건에 대한 의미 지식, 일상 상황에 대한 상식, 과제 수행 절차, action의 결과에 대한 인과 지식을 파라미터에 남기기 때문이다.

문제는 이 지식만으로는 물리 세계에 닿지 못한다는 점이다. 물리 세계는 촘촘하고 연속적이며 시간에 따라 변하고 기하, dynamics, 접촉, 힘, 불확실성, embodiment 제약의 지배를 받는다. embodiment는 로봇의 물리적 형상과 그에 딸린 제어 API 구성을 뜻한다. 언어는 효과적인 추상화 인터페이스지만 이런 상태를 표현하기에는 지나치게 성기고 손실이 크다.

저자들이 던지는 질문은 로봇이 움직일 수 있는지가 아니라, 언어에서 온 사전 지식을 어떻게 표현하고 grounding하고 검증하고 예측 모델과 결합할 것인지다. 로드맵은 그 질문에 대한 단계별 답이다.

## 핵심 개념

world knowledge와 world model의 구분이 이 서베이 전체를 지탱한다. world knowledge는 무엇이 그럴듯하고 어떤 action이 의미 있는지에 대한 사전 지식이고, world model은 환경의 동역학을 학습해 지금 상태와 가능한 action에서 다음에 무엇이 일어날지를 예측하는 모델이다. 전자는 행위의 의미를 알려주고 후자는 결과를 추정한다.

multimodal grounding은 언어로 된 지식을 이미지, 영상, 물체, 공간 관계에 붙이는 단계를 가리킨다. 유리가 깨지기 쉽다거나 손잡이를 당길 수 있다는 사전 지식이 있어도, 지금 그 물체가 장면에 있는지와 어디에 있는지를 확인하지 못하면 실행으로 이어지지 않는다.

action grounding은 인식과 언어를 실행 가능한 action으로 잇는 단계다. action은 policy가 출력하는 제어 명령이고, policy는 현재 observation을 받아 다음 action을 정하는 함수를 말한다. VLA가 이 층을 맡는다.

closed-loop와 open-loop의 구분은 평가 논의의 전제다. closed-loop 제어는 매 timestep 새 observation을 받아 action을 다시 정하는 방식이고, open-loop 실행은 한 번 계산한 결과를 중간 피드백 없이 내보내는 방식이다. 고정된 입력에 대한 정확도만 재는 오프라인 평가는 후자에 가깝다.

compounding error는 policy의 작은 예측 오차가 다음 입력을 어긋나게 만들어 시간이 갈수록 커지는 현상이다. 오프라인 평가가 이 현상을 가리기 때문에 저자들이 closed-loop 평가를 반복해서 요구한다.

## 서베이의 범위와 위치

저자들은 부록 A.1에서 다루는 범위와 다루지 않는 범위를 명시적으로 갈랐다. 판단 기준은 하나다. 어떤 연구 계열이 world knowledge를 물리 인식, 예측, planning, action으로 grounding하는 데 기여하는가 여부다.

| 로드맵 구성요소 | 서베이가 다루는 범위 | 망라하지 않는 인접 영역 |
|---|---|---|
| LLM world knowledge | LLM에 부호화된 의미, 상식, 절차, 인과, 공간, affordance 사전 지식 | 물리 추론과 무관한 일반 사실 회상, 지식 편집, 기억 분석 |
| multimodal grounding | 언어 지식을 이미지, 영상, 영역, 물체, 공간 관계, affordance에 붙이는 VLM과 MLLM | 물리적 grounding이나 상호작용과 무관한 일반 captioning, VQA, 멀티모달 대화 |
| action grounding | VLA 모델, action 표현, policy learning, 언어 조건 embodied 제어 | foundation model grounding이 없는 고전 로봇 제어, motion planning, manipulation 기법 |
| world model | 예측, 시뮬레이션, planning, policy learning을 돕는 video, latent, 상호작용, action 조건부 모델 | 로드맵 밖의 모든 영상 생성, 모든 시뮬레이터, 모든 model-based 강화학습 |
| embodied 시스템 | 인식, planning, 실행, 복구, 평가의 고리를 닫는 시스템 | 하드웨어 특화 로봇 엔지니어링, 로봇 설계, 도메인 특화 제어 스택 |

이 표는 분리선이 아니라 경계선으로 읽어야 한다고 저자들은 덧붙인다. 예를 들어 저수준 manipulation 제어와 하드웨어 설계는 배포에 필수지만, 이 논문은 foundation model과 world model이 그런 시스템과 어떻게 맞물리는지에 초점을 둔다.

기존 서베이와의 대비는 Table A2가 담당한다. 저자들은 네 계열을 LLM world knowledge, VLA와 action grounding, world model, 비공개 시스템의 네 항목으로 평가하고 Limited, Partial, Strong 세 등급을 매겼다.

| 서베이 계열 | 주된 초점 | LLM world knowledge | VLA와 action grounding | world model | 비공개 시스템 |
|---|---|---|---|---|---|
| Physical AI 일반 | 개념, 응용, 산업 시스템, cyber-physical 관점 | Limited | Partial | Limited | Partial |
| vision 중심 생성형 Physical AI | physics-aware generation, 시각 시뮬레이션, 물리적으로 근거 있는 computer vision | Limited | Limited | Partial | Partial |
| VLA와 로봇 foundation model | 로봇 policy, action 표현, embodied 제어 | Partial | Strong | Limited | Partial |
| world model 중심 | 예측, latent dynamics, model-based planning, 시뮬레이션 | Limited | Partial | Strong | Partial |
| 이 논문 | LLM world knowledge에서 Physical AI로 가는 로드맵 | Strong | Strong | Strong | Strong |

저자들은 이 비교가 기존 서베이의 불완전함을 주장하려는 것이 아니라 조직 기준이 다르다는 점을 보이려는 것이라고 밝힌다. 다만 자기 논문만 네 항목 모두 Strong으로 적혀 있고 등급의 근거가 인용 나열 수준이므로, 저자 자평으로 감안해 읽는 것이 적절하다.

평면적 taxonomy 대신 로드맵 구조를 택한 이유도 여기서 나온다. 평면적 taxonomy라면 LLM, VLM, VLA, world model, agent를 서로 독립된 계열로 나열하게 된다. 반면 로드맵은 이들을 점점 더 물리적으로 grounding되는 인터페이스의 연쇄로 본다.

## 로드맵의 여섯 단계

로드맵 전체는 Table A3 한 장으로 압축된다. 각 단계를 주된 표현 형식, Physical AI에서의 역할, 대표 연구 세 열로 적은 표다.

| 단계 | 주된 표현 형식 | Physical AI에서의 역할 | 대표 연구 |
|---|---|---|---|
| LLM world knowledge | 텍스트와 파라미터에 담긴 지식 | 의미, 상식, 절차, 인과, 공간, affordance 사전 지식 제공 | LAMA, closed-book QA, 사실 회상과 절차 지식 연구 |
| multimodal grounding | 이미지와 영상 기반 언어 표현 | world knowledge를 물체, 장면, 공간 관계, 시간 사건, affordance에 연결 | CLIP, Flamingo, BLIP-2, LLaVA, Gemini |
| action grounding | action 토큰, trajectory, action chunk, skill, 연속 제어값 | 인식과 지시문을 실행 가능한 action으로 사상 | PaLM-E, RT-2, OpenVLA, π0, π0.5 |
| world modeling | 미래 픽셀, latent state, reward, value, action 조건부 전이 | 가능한 미래를 예측하고 시뮬레이션해 planning과 반사실 추론을 지원 | World Models, Dreamer, MuZero, Genie, Cosmos, V-JEPA |
| policy learning | 학습된 policy, action expert, diffusion과 flow policy, 컨트롤러 | 인식, 추론, 예측을 실제 동작으로 변환 | ACT, FAST, RDT-1B, GR00T N1 |
| embodied deployment | 감지, planning, 실행, 검증, 복구가 물린 closed-loop 시스템 | 실제나 상호작용 환경에서 신뢰성 있게 동작하는지 시험 | Gemini Robotics, RoboCasa, LIBERO, EmbodiedBench |

대표 연구 열은 망라 목록이 아니라 앵커다. 하나의 VLA 시스템이 multimodal grounding, action tokenization, policy learning, 실환경 평가를 동시에 차지하는 일이 흔하기 때문에, 저자들은 각 연구를 로드맵에서 가장 두드러진 역할 하나에 배치했다고 밝힌다.

![[assets/zhang-2026-a-survey-of-physical-ai/taba3.png]]
*Table A3: 로드맵 여섯 단계의 확장 taxonomy. 단계별 주된 표현 형식, Physical AI에서의 역할, 대표 연구를 한 줄로 묶었다 (Zhang 2026, Table A3, p.15)*

### LLM의 world knowledge

저자들은 world knowledge를 하나의 저장소가 아니라 서로 물린 여러 종류의 사전 지식으로 본다. 의미 지식은 대상 범주와 지시 표현을 담고, 상식은 기본 가정과 안전 제약을 공급하며, 절차 지식은 과제를 분해한다. 인과 지식은 결과와 위험을 시사하고, 공간 지식은 배치와 manipulation 전제조건을 지원한다.

여기에 affordance 지식이 붙는다. affordance는 물체가 허용하는 상호작용 가능성을 뜻하며, AffordanceLLM, ManipVQA, RoboPoint처럼 어느 물체나 부위가 요청된 action을 지원하는지 직접 예측하는 모델로 구체화됐다. 공간 관계를 다루는 최근 VLM은 "안에"나 "정렬된" 같은 표현을 실제 3D 구조에 사상한다.

이 지식이 Physical AI에서 실제로 쓰이는 방식은 네 가지로 정리된다.

- **과제 planning**: SayCan은 LLM이 뽑은 단계 시퀀스를 학습된 affordance 값으로 걸러 물리적으로 불가능한 action을 제거한다. Inner Monologue는 환경 관찰을 언어로 되먹여 실행 중 재계획을 수행한다.
- **skill 생성**: Code as Policies와 ProgPrompt는 산문 대신 실행 가능한 로봇 프로그램을 짜게 하고, Voyager는 그렇게 만든 skill 라이브러리를 계속 확장한다.
- **목표와 reward 지정**: VoxPoser는 지시문에서 공간 value map을 합성해 사람이 reward를 직접 설계하는 부담을 줄인다. reward는 policy가 얼마나 잘했는지를 알려주는 스칼라 신호다.
- **agentic 조율**: 여러 단계에 걸친 과제에서 LLM이 도구와 하위 모듈을 지휘하며 일회성 planner가 아니라 closed-loop 의사결정 엔진으로 동작한다.

한계는 언어와 물리 사이의 추상화 격차로 수렴한다. LLM은 유리가 깨지기 쉽다거나 손잡이를 잡을 수 있다는 사실은 알아도 기하, 접촉, 힘, 마찰, 미래 trajectory를 추정하지 못한다. 그 결과 없는 물체를 환각하거나 실행 불가능한 계획을 제안하거나 action이 성공했다고 가정하는 오류가 나온다. LLM-modulo 계열 분석과 PlanBench 갱신판이 검증기 없는 언어 모델의 planning이 왜 불안정한지를 보였고, PHYBench와 PhysToolBench 같은 물리 추론 벤치마크가 동역학과 tool use에서 같은 약점을 드러낸다.

### perception으로의 grounding

VLM과 MLLM은 언어 지식을 눈앞의 장면에 붙이는 첫 다리다. 발전 경로는 이미지와 텍스트 표현 정렬에서 멀티모달 지시문 따르기로 이어진다. 대조 학습과 cross-modal pre-training이 언어를 열린 어휘의 시각 인터페이스로 만들었고, 최근 MLLM은 cross-attention, query transformer, projection layer, 지시문 tuning으로 시각 인코더를 대형 언어 backbone에 연결한다.

grounding의 촘촘함을 높이려는 시도는 세 방향이다.

- **공간 grounding**: region, mask, point 감독과 탐지, grounding, segmentation 통합, 명시적 pointing 감독으로 물체의 위치를 더 정확히 짚는다.
- **시간 grounding**: TimeChat, VTG-LLM, Grounded-VideoLLM, VQToken, TimeSuite가 타임스탬프와 특정 순간을 명시적으로 다루고, VideoGLaMM은 픽셀 수준 영상 영역까지 내려간다.
- **affordance grounding**: AffordanceLLM, PAVLM, Palm, RoboPoint가 VLM과 LLM의 사전 지식으로 상호작용 영역, 3D affordance, 언어 조건 affordance 지점을 예측한다.

그럼에도 grounding은 대체로 의미 수준에 머문다는 것이 이 장의 결론이다. BLINK는 저수준 시각 지각을, Video-MME는 long-horizon 영상 이해를, PhysBench와 QuantiPhy와 MASS-Bench는 물리 추론과 정량 물리와 움직임을 고려한 시공간 grounding을 각각 시험하는데 여기서 격차가 드러난다. 물체를 짚어내도 자세, 깊이, 불확실성, 도달 가능성은 나오지 않는다. 따라서 저자들은 VLM을 완결된 물리 모델이 아니라 인식 grounding 층으로만 취급하라고 못 박는다.

### action으로의 grounding

VLA는 시각 observation, embodiment 상태, 언어 목표를 action 출력으로 잇는다. action을 어떤 형식으로 적을지에 따라 세 계열이 나뉘고, 이 선택이 pre-training된 world knowledge가 실행 가능한 동작으로 바뀌는 방식을 결정한다.

| 계열 | action 표현 | 대표 모델 | 특징 |
|---|---|---|---|
| 이산 토큰화 | action을 토큰으로 나눠 auto-regressive 예측 | RT-2, OpenVLA, FAST | Transformer VLM backbone과 그대로 맞물린다. FAST는 고주파 action 시퀀스를 주파수 영역에서 토큰화한다 |
| 연속 chunk와 trajectory | action chunk나 trajectory를 직접 회귀 | ACT, π0, π0.5, DexVLA, RDT-1B | diffusion과 flow 기반 visuomotor policy 계열. action chunk는 policy가 한 번에 출력하는 여러 timestep 분량의 action 묶음이다 |
| 기하 구조화 | action 인터페이스 자체에 3D 구조를 부여 | SpatialVLA, 3D-VLA | SpatialVLA는 적응형 3D action grid로 후보 동작을 자기중심 좌표에 붙이고, 3D-VLA는 3D 상호작용 토큰으로 목표 지점이나 motion primitive를 예측한다 |

상위 수준 skill은 언어와 planning에 잘 맞고 저수준 명령은 정밀하지만 embodiment에 묶인다. 기하 구조를 노출하는 세 번째 계열은 물체와 장면과 embodiment를 넘는 전이에 유리하다는 것이 저자들의 평가다.

언어를 action에 붙이는 계보는 PaLM-E가 embodied 멀티모달 표현으로 로봇 추론과 planning이 된다는 것을 보인 데서 시작한다. RT-2가 웹 규모 vision-language 과제와 로봇 trajectory를 함께 co-fine-tuning하고 action을 텍스트 같은 토큰으로 적은 뒤 다시 명령으로 되돌리는 방식을 확립하면서 연결이 분명해졌다. 규모를 키우려면 데이터와 전이 가능한 policy 인터페이스가 필요했고, Open X-Embodiment와 RT-X가 여러 embodiment의 데이터를 한 형식으로 표준화했다. Octo와 OpenVLA가 그 위에서 generalist policy를 학습한다.

최근 흐름은 추론과 동작 생성을 분리하는 하이브리드 구조다. VLM이 지시문, 물체 의미, 공간 관계, 과제 이력, 상식 사전 지식을 담당하고 별도 policy가 그 결과를 embodiment 제약 아래 고주파 action으로 바꾼다. action-as-language에서 reasoning-to-control 인터페이스로 옮겨가는 전환이다.

- π0는 pre-training된 VLM에 flow matching action expert를 결합한다. flow matching은 noise에서 목표 분포로 가는 연속 변환의 속도장을 학습하는 생성 기법이다.
- π0.5는 로봇 데이터, 웹 데이터, 의미 예측 과제를 섞는 co-training을 더한다.
- DexVLA는 diffusion expert를, RDT-1B는 양팔 manipulation용 diffusion을, GR00T N1은 humanoid용 DiT를 action 생성기로 쓴다.
- TinyVLA, SmolVLA, Xiaomi-Robotics-0, StarVLA-α는 효율과 실시간 실행도 로드맵의 일부임을 보여준다.
- 오프라인 imitation learning 바깥으로 나가는 시도로 π\*0.6은 실제 배포에서 얻은 경험과 사람의 교정 개입으로 강화학습을 수행하고, MEM은 영상과 텍스트 기억을 더해 long-horizon 동작과 이력 기반 적응을 노린다.

그래도 VLA만으로는 부족하다는 것이 4.4절의 요지다. VLA의 추론은 여전히 성기고 의미 수준이라 마찰, 컴플라이언스, 접촉 기하, 힘, 타이밍처럼 언어로 적기 어려운 요소를 다루지 못한다.

### world model

world model은 미래 observation, latent state, reward, value, action의 결과를 예측하거나 시뮬레이션하는 모델을 뜻한다. 이 정의가 world knowledge와 world model을 가르는 지점이다. LLM은 보통 무슨 일이 일어나고 어떤 action이 의미 있는지에 대한 사전 지식을 주고, world model은 물리 dynamics 아래에서 다음에 무엇이 일어날지를 추정한다.

계보 자체는 오래됐다. 초기 신경망 world model이 agent를 위한 압축된 시공간 표현을 학습했고, PlaNet과 Dreamer 같은 latent dynamics 모델이 latent imagination으로 planning과 행동을 배웠으며, MuZero는 observation을 명시적으로 복원하지 않고도 value와 reward와 policy 관련 값을 예측해 planning을 지원할 수 있음을 보였다.

### policy learning과 embodied deployment

embodied agent는 지시문을 파싱하고 과제 구조를 추론한 뒤 물체와 상태를 grounding하고 action과 trajectory를 고르고 실행하고 결과를 검증하는 전체 고리다. 여기서 action 모델은 부품 하나일 뿐이고 상태 추정, 실행 인터페이스, 컨트롤러 거동, 온라인 검증이 성능을 함께 좌우한다.

많은 embodied agent가 추론과 제어 사이에 모듈 인터페이스를 둔다. 상위 모듈은 언어, 기호 상태, 물체 관계, keypoint 제약, value map, 로봇 프로그램 위에서 동작하고 하위 모듈은 motion primitive, grasping planner, visuomotor policy, 컨트롤러를 실행한다. 모듈화는 long-horizon 동작을 지정하고 진단하기 쉽게 만들지만 설계 문제를 새로 만든다. 모듈 사이에 어떤 정보를 넘길지, 불확실성을 어떻게 다룰지, 실행을 계속하는 대신 언제 다시 계획할지가 그것이다.

배포 단계의 중심 난점은 오프라인 평가와 상호작용 배포 사이의 격차다. 오프라인 평가는 고정된 데이터에서 모델이 정답 라벨과 얼마나 일치하는지를 재지만, 배포는 그 예측이 물리 세계에서 closed-loop 진행을 만들어내는지를 시험한다. 학습된 모델과 로봇 컨트롤러를 잇는 인터페이스 설계도 함께 걸린다. 다양한 과제를 지원할 만큼 표현력이 있으면서 안정적 실행을 보장할 만큼 제약된 인터페이스가 필요하다.

## world model 분류

world model이라는 말이 강화학습, 영상 생성, 로보틱스, 자율주행에서 서로 다른 뜻으로 쓰이기 때문에, 저자들은 예측 대상을 기준으로 다섯 계열을 나눈다. 모든 생성형 영상 모델과 모든 model-based policy를 같은 종류로 취급하지 않으려는 구분이다.

| 계열 | 예측 대상 | Physical AI에서의 역할 | 대표 연구 |
|---|---|---|---|
| 고전 model-based 강화학습 | 미래 상태, reward, value, policy 관련 값 | planning, latent imagination, 의사결정, policy 개선 | World Models, PlaNet, Dreamer, DreamerV3, MuZero |
| video 계열 | 미래 픽셀, 프레임, video 토큰 | 시각적 상상, 미래 장면 예측, 합성 데이터, 모의 경험 | GAIA-1, UniSim, Genie, Cosmos |
| latent 계열 | 미래 latent state, 임베딩, 마스킹된 시공간 표현 | 효율적인 long-horizon 예측, 간결한 planning, 제어에 필요한 표현 학습 | PlaNet, Dreamer, I-JEPA, V-JEPA, V-JEPA 2 |
| 상호작용과 action 조건부 | 후보 action에 조건화된 미래 observation이나 latent state | 반사실 추론, 시뮬레이션 기반 policy learning, 안전 평가, 복구 | MuZero, UniSim, Genie, GAIA-1, V-JEPA 2, Cosmos |
| world foundation model | 범용 예측 또는 생성 표현 | 로보틱스, 자율주행, embodied agent, 합성 데이터에 적응 가능한 기반 | Cosmos, Genie 계열, V-JEPA 계열 |

video 계열은 영상이 움직임과 시간 변화와 장면 변화를 그대로 드러내기 때문에 직관적이다. GAIA-1은 영상과 텍스트와 action 입력에서 자율주행의 미래를 모델링하고, UniSim은 이질적인 데이터에서 상호작용 시뮬레이터를 학습해 policy 학습에 쓰며, Genie는 라벨 없는 영상에서 생성형 상호작용 환경을 배운다. Cosmos는 world foundation model을 로보틱스와 자율주행과 합성 데이터 생성에 맞춰 조정 가능한 범용 world model로 내세운다.

이 계열의 한계는 시각적 사실성이 물리적 정확성을 보장하지 않는다는 점이다. 생성된 rollout이 그럴듯해 보이면서도 물체 영속성, 접촉 제약, controllability, 인과 일관성을 어길 수 있다. controllability는 명령한 action에 따라 생성된 미래가 얼마나 정확히 달라지는지를 뜻한다. 따라서 저자들은 유용한 video world model이라면 시간적 일관성, controllability, action 조건화, 물리적 타당성을 함께 갖춰야 한다고 조건을 건다.

latent 계열은 픽셀을 복원하는 대신 표현 공간에서 예측한다. 촘촘한 영상 생성은 연산 비용이 크고 제어와 무관한 시각 세부에 용량을 쓰기 쉬운 반면, latent 예측은 과제 관련 dynamics에 집중하기 때문에 planning과 policy learning과 long-horizon imagination에 유리하다. JEPA 계열은 예측 모델링이 전면 생성 복원이 아니라 표현 공간에서 일어나야 한다고 주장하고, V-JEPA 2는 자기지도 영상 표현 학습을 로봇 trajectory로 post-training해 action 조건부 latent world model로 잇는다.

상호작용과 action 조건부 계열이 Physical AI와 가장 가깝다. 다음에 무엇이 일어날지를 수동적으로 예측하는 대신 특정 action을 취했다면 무엇이 달라졌을지를 추정하기 때문이다. 이 능력이 planning, policy learning, 시뮬레이션 기반 학습, 안전 평가, 복구를 지원하고 실행 전에 action을 검토할 수 있게 해 비용이 크거나 위험한 시행착오 의존을 줄인다.

world model과 LLM의 관계는 대체가 아니라 보완이다. LLM은 상위 목표와 지시문과 상식 제약을 담당하고 world model은 action 조건부 rollout, 물리적 실현 가능성 확인, policy 최적화를 담당한다.

## 평가 프로토콜

평가가 어려운 이유는 로드맵이 성격이 다른 여러 능력에 걸쳐 있기 때문이다. 정적 언어 벤치마크는 상식이나 절차 지식을 담고 있는지는 재지만 그 지식이 물리 상태에 grounding됐는지는 판정하지 못한다. vision-language 벤치마크는 인식과 grounding을 재지만 인식이나 서술에서 멈추기 쉽다. VLA 벤치마크는 observation과 지시문에서 action을 예측하는지 재지만 open-loop action 정확도가 closed-loop 실행을 담아내지는 못한다.

| 로드맵 단계 | 평가 유형 | 무엇을 재는가 | 대표 벤치마크 |
|---|---|---|---|
| LLM world knowledge | 물리 상식, 도구 이해, 사실과 절차 지식 | 쓸 만한 의미, 상식, 절차, 인과 사전 지식을 담고 있는지 | PHYBench, PhySense, PhysToolBench |
| VLM과 MLLM grounding | 공간, 시간, affordance, 물리 추론 | 언어에서 온 지식이 인식과 공간 관계와 물리 상태에 붙는지 | BLINK, Video-MME, PhysBench, QuantiPhy, MASS-Bench |
| VLA와 action grounding | 로봇 manipulation, 내비게이션, action 예측 | 지시문과 observation을 실행 가능한 action으로 사상하는지 | RT-2, OpenVLA, LIBERO, LIBERO-Pro |
| world model | 영상 예측, latent 예측, action 조건부 시뮬레이션, planning 평가 | 물리적으로 타당하고 조종 가능하며 시간적으로 일관된 미래를 예측하는지 | World Models, Dreamer, Genie, Cosmos, V-JEPA 2 |
| embodied agent | closed-loop 시뮬레이션 또는 실환경 과제 | 과제를 끝내고 오류에서 복구하며 환경과 embodiment를 넘어 일반화하는지 | BEHAVIOR, EAI, EmbodiedBench, RoboSuite, RoboCasa |
| 비공개 frontier 시스템 | 블랙박스 또는 제품 수준 평가 | 제한된 공개 아래에서의 능력, 신뢰성, 재현성, 안전, 투명성 | Gemini Robotics, Gemini Robotics 1.5, GR00T N1, π 계열 |

이 표의 구성은 두 종류의 지표를 나눈 것이다. 단계별 지표는 어느 층이 고장 났는지 진단한다. 사실과 물리 상식인지, 인식 grounding인지, action 예측인지, world model rollout인지, closed-loop 실행인지를 가려낸다. 시스템 수준 지표는 그 부품들이 배포 제약 아래에서 함께 작동하는지를 본다.

두 지표가 모두 필요한 이유는 층별 성능이 좋아도 통합 시점에 실패할 수 있기 때문이다. 성능 좋은 VLA라도 action이 compounding error를 쌓거나, world model이 시각적으로는 그럴듯하지만 물리적으로 어긋난 미래를 만들거나, 컨트롤러가 교란에서 복구하지 못하면 실패한다. 따라서 저자들은 과제 성공률만이 아니라 실패 양상, 개입 횟수, 교란에 대한 견고성, 그리고 물체와 장면과 지시문과 초기 상태와 embodiment를 바꿨을 때의 일반화를 함께 보고할 것을 요구한다. 구현 세부가 성능을 크게 좌우하기 때문에 실제 기기 평가는 여전히 필요하다는 단서도 붙는다.

![[assets/zhang-2026-a-survey-of-physical-ai/taba5.png]]
*Table A5: 로드맵 단계별 평가 프로토콜. 단계마다 무엇을 어떤 벤치마크로 재야 하는지를 적었다 (Zhang 2026, Table A5, p.18)*

## 실패 양상과 디버깅

부록 A.7은 로드맵을 분류표가 아니라 진단 도구로 쓰는 방법을 제시한다. Physical AI 시스템은 world knowledge, 인식, action, 예측, policy learning, 배포, 평가 어느 층에서든 실패할 수 있고 그 실패는 질적으로 서로 다르다.

| 구성 요소 | 대표 실패 양상 | Physical AI에서 문제가 되는 이유 |
|---|---|---|
| LLM | 근거 없는 물리 지식 환각, 과신하는 계획, 물리량 부재 | 기하, 접촉, 힘, 물체 상태 제약을 어기는 그럴듯한 언어 계획을 낸다 |
| VLM과 MLLM | 의미 서술은 맞지만 촘촘한 grounding이 약함 | 물체를 짚어내도 자세, 깊이, 불확실성, 도달 가능성, action 조건부 dynamics를 추정하지 못한다 |
| VLA | cross-embodiment 일반화 부진, 데이터 의존, 취약한 복구 | 같은 지시문이라도 로봇과 환경에 따라 다른 grasping, trajectory, 제어 전략이 필요하다 |
| world model | 시각적으로는 그럴듯하나 물리적으로 어긋난 미래 | 사실적인 생성도 물체 영속성, 접촉, 중력, controllability, 인과 dynamics를 어길 수 있다 |
| policy learning | 오프라인 성공, closed-loop 실패 | 데이터셋 상태에서는 옳은 action을 내도 compounding error나 실시간 교란 아래에서는 실패한다 |
| embodied 시스템 | 센서, 보정, 지연, 컨트롤러, 하드웨어 고장 | 물리적 성능은 모델 정확도가 아니라 시스템 스택 전체에 달려 있다 |
| 비공개 frontier 시스템 | 재현성 제약과 불완전한 공개 | 분야를 이끄는 제품 수준 시스템이 공정한 벤치마크나 ablation 비교에서 빠진다 |

표보다 오래 남는 것은 여기 붙은 디버깅 규칙이다. 실패 시점을 관찰하면 의심할 층이 좁혀진다.

- action 이전에 실패하면 world knowledge나 인식 grounding을 의심한다.
- 실행 중 실패하면 action 표현, embodiment 전이, 컨트롤러 설계를 의심한다.
- 여러 단계 뒤에 실패하면 world model, compounding error, 기억, 복구를 의심한다.
- 시뮬레이션에서는 되는데 실제 환경에서 안 되면 sim2real 전이, 감지, 보정, 지연, 드러나지 않은 배포 가정을 의심한다. sim2real은 시뮬레이션에서 학습한 policy를 실제 기기로 옮기는 문제다.

이 분해는 왜 Physical AI를 벤치마크 하나로 평가할 수 없는지도 설명한다. 로드맵의 각 단계가 서로 다른 진단을 요구하므로, 종단 과제 성공률만으로는 실패의 출처가 가려진다.

![[assets/zhang-2026-a-survey-of-physical-ai/taba7.png]]
*Table A7: 로드맵 구성요소별 대표 실패 양상과 그것이 Physical AI에서 문제가 되는 이유 (Zhang 2026, Table A7, p.20)*

## frontier 시스템의 공개 수준

영향력 있는 Physical AI 시스템 상당수가 완전 공개 학술 산출물이 아니라 제품이나 플랫폼이나 부분 공개 기술 보고서로 나온다. 저자들은 이런 시스템을 배제하지도 학술 모델과 동일하게 취급하지도 않고, 역할과 공개 수준으로 분류하는 절충을 택했다.

| 시스템 | 범주 | 공개 수준 | 로드맵에서의 역할 |
|---|---|---|---|
| GPT-4와 ChatGPT 계열 agent | LLM과 agentic 어시스턴트 | 비공개, 기술 보고서나 제품 문서 | 상위 world knowledge, planning, tool use, 과제 분해 |
| Claude 계열 어시스턴트 | LLM과 agentic 어시스턴트 | 비공개, 제품 문서 | 추론, tool use, 코딩, agentic 조율 |
| Gemini Robotics와 Gemini Robotics 1.5 | 로보틱스 foundation model | 비공개 또는 부분 공개, 기술 보고서 | 멀티모달 추론, embodied 제어, 실제 로봇 상호작용 |
| Cosmos | world foundation model 플랫폼 | 부분 공개, 기술 보고서 | world model, 합성 데이터, 시뮬레이션, 자율주행, 로보틱스 |
| GR00T N1 | humanoid foundation model | 부분 공개, 기술 보고서 | generalist humanoid policy와 cross-embodiment action 학습 |
| π 계열 | generalist VLA와 로봇 foundation model | 부분 공개, 기술 보고서 | action grounding, 개방 환경 일반화, policy learning, embodied 배포 |

비공개 시스템이 던지는 난점은 재현 불가능성만이 아니다. 하나의 제품 스택이 로드맵의 여러 단계를 한꺼번에 담고 있어 ablation과 귀인이 어려워진다는 점이 더 크다. 어떤 시스템이 물리 추론에 강해 보일 때 그 원인이 LLM 사전 지식인지, 인식 모듈인지, action policy인지, 검색 시스템인지, 시뮬레이터인지, 사람 피드백 파이프라인인지 구분할 방법이 없다. 저자들이 능력 시험, 견고성 시험, 안전 시험, 재현성 보고를 분리한 평가 프로토콜을 요구하는 근거다.

## 과제와 향후 방향

본문 7장과 부록 A.8이 꼽는 과제는 다섯 가지이고, 각각이 로드맵의 한 지점에서 발생하는 인터페이스 불일치에 대응한다.

| 과제 | 인터페이스 불일치 | 향후 방향 | 근거 연구 |
|---|---|---|---|
| 암묵적 world knowledge | LLM 사전 지식이 언어 매개라 물리량으로 옮기기 어렵다 | 의미, 절차, 인과 사전 지식을 촘촘한 물리 표현으로 추출하고 정렬하고 grounding | 지식 probing, 사실 회상, 절차 지식, 언어 planning 연구 |
| 물리 인식 | VLM이 물리 상태 대신 의미 서술을 내놓는다 | 공간, 시간, affordance, 정량, action 관련 grounding으로 이동 | VLM과 MLLM grounding, 물리 추론 벤치마크 |
| generalist embodied policy | action이 embodiment에 묶여 있고 로봇 데이터가 적다 | 확장 가능한 action 표현, cross-embodiment 전이, 기억이나 world model을 결합한 policy | PaLM-E, RT-2, OpenVLA, π 계열, FAST, GR00T N1 |
| 예측형 world model | 영상 사실성이 물리적 정확성을 뜻하지 않고, latent 모델은 과제 head나 policy 인터페이스가 필요하다 | action 조건부이고 조종 가능하며 효율적이고 물리적으로 타당한 world model | Dreamer, MuZero, Genie, UniSim, Cosmos, V-JEPA |
| 배포 | 모델 수준 정확도가 감지, 제어, 지연, 복구, 안전, sim2real 견고성을 담지 못한다 | closed-loop 과제 완수, 복구, 안전, 재현성으로 통합 시스템을 평가 | LIBERO, RoboCasa, EmbodiedBench, Gemini Robotics, GR00T N1 |

VLA 쪽 병목은 세 가지로 더 구체화된다. 첫째, action space가 embodiment마다 다르다. action 토큰, end-effector 자세, trajectory, action chunk, 연속 제어값이 뒤섞여 있다. 둘째, 로봇 데이터가 언어나 vision 데이터보다 훨씬 적고 이질적이다. 셋째, imitation learning으로 학습한 policy는 분포 이동에 취약하고 복구 동작을 갖추지 못하는 경우가 많다. imitation learning은 시연 데이터(demonstration)를 흉내 내 policy를 학습하는 방법이다.

world model 쪽 요구는 효율과 충실도의 균형으로 요약된다. 픽셀 공간 시뮬레이터는 비용이 크고, latent 모델은 효율적이지만 action에 쓰려면 과제 head나 디코더나 policy 인터페이스가 추가로 필요하다.

## 한계

저자들이 밝힌 한계는 범위의 한계다. 이 서베이는 언어에서 출발하는 경로 하나에 집중했기 때문에 로보틱스, 제어, 시뮬레이션, 촉각 감지, 음향 인식, cyber-physical 시스템 전반을 망라하지 않는다. 촉각, 힘 피드백, 소리, 재질 특성, 질량 추정, 유체나 변형체 동역학은 로드맵과 직접 닿을 때만 언급한다.

읽는 쪽에서 감안할 점이 셋 더 있다. 첫째, 심사를 거치지 않은 preprint다. 둘째, 자체 실험이나 정량 비교가 전혀 없고 새 모델, 데이터셋, policy, 컨트롤러, 배포 시스템을 공개하지 않는다. 저자들 스스로 이 논문의 기여를 taxonomy와 분석과 연구 지침으로 한정한다. 셋째, 기존 서베이와 자기 논문을 Limited, Partial, Strong으로 등급 매긴 Table A2는 저자 자평이라 근거가 인용 나열 수준이다.

따라서 개별 방법의 깊이는 다른 서베이에서 채우는 것이 맞다. 이 페이지 아래의 관련 페이지 목록이 각 층을 확대한 자료를 가리킨다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| world knowledge | pre-training으로 LLM 파라미터에 남은 언어 매개 사전 지식. 의미, 상식, 절차, 인과, 공간, affordance 지식을 아우르며 이 서베이의 조직 기준이다 |
| world model | 지금 상태와 가능한 action에서 미래 observation, latent state, reward, value, action의 결과를 예측하거나 시뮬레이션하는 모델 |
| multimodal grounding | 언어에서 온 지식을 이미지, 영상, 영역, 물체, 공간 관계, affordance에 붙이는 단계. VLM과 MLLM이 맡는다 |
| action grounding | 인식과 언어를 실행 가능한 action으로 잇는 단계. VLA가 맡는다 |
| interface mismatch | 로드맵의 각 층이 다음 층에 넘기는 표현이 어긋나는 지점. Table A8이 과제마다 이 불일치를 지목한다 |
| closed frontier system | Gemini Robotics나 π 계열처럼 능력은 분야를 이끌지만 학습 데이터, 구조, 평가 절차가 공개되지 않아 학술 모델과 같은 방식으로 비교할 수 없는 시스템 |

## 관련 페이지

로드맵의 각 층을 확대한 서베이가 저장소에 함께 있다. 주제가 겹치므로 초점 차이를 기준으로 골라 읽는 것이 좋다.

- [[physical-ai/li-2025-a-comprehensive-survey-on-world]]: world model을 embodied AI 전반에서 훨씬 깊게 다루는 서베이. 이 논문 5장이 압축한 내용의 확장판에 해당한다
- [[physical-ai/hou-2026-world-model-for-robot-learning]]: 같은 world model 주제를 robot learning 문맥으로 좁힌 서베이. video, latent, action 조건부 구분이 겹친다
- [[physical-ai/xu-2025-an-anatomy-of-vision-language-action-models]]: VLA 내부를 perception, brain, action 모듈로 해부한다. 이 논문의 action grounding 한 칸을 모듈 단위로 확대한 관점이다
- [[physical-ai/kawaharazuka-2025-vision-language-action-models-for-robotics]]: 같은 VLA 주제를 실환경 적용 관점에서 정리한 리뷰. 배포 조건과 실무 제약에 초점이 있다
- [[physical-ai/sa-2026-vision-language-action-models-for]]: VLA 중에서도 양팔 manipulation과 실환경 배포로 범위를 좁힌 서베이
- [[physical-ai/cui-2025-openhelix-a-short-survey-empirical]]: dual-system VLA 구조 하나에 집중해 구성 요소별 실험 비교까지 수행한 짧은 서베이. 이 논문이 언급만 하는 하이브리드 구조를 실증한다
- [[physical-ai/liu-2025-generative-physical-ai-in-vision]]: Table A2가 vision 중심 생성형 Physical AI 계열로 분류한 관점의 서베이

로드맵 각 칸의 대표 모델도 개별 페이지로 있다.

- [[physical-ai/brohan-2022-rt-1-robotics-transformer-for-real-world]]와 [[physical-ai/brohan-2023-rt-2-vision-language-action-models-transfer-web]]: action grounding 층의 출발점. RT-2가 action을 텍스트 같은 토큰으로 적는 방식을 세웠다
- [[physical-ai/kim-2024-openvla-an-open-source-vision-language-action-model]]: 이산 토큰화 계열의 오픈소스 표준
- [[physical-ai/zhao-2023-learning-fine-grained-bimanual-manipulation]]: 연속 chunk 계열의 출발점인 ACT
- [[physical-ai/black-2024-pi0-a-vision-language-action-flow-model]]와 [[physical-ai/black-2025-pi05-a-vision-language-action-model-with]]: reasoning-to-action 하이브리드의 대표 사례
- [[physical-ai/amin-2025-pistar06-a-vla-that-learns]]: 오프라인 imitation learning을 넘어 실제 배포 경험으로 강화학습을 수행한 사례
- [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation]]: humanoid용 DiT action 생성기를 쓰는 policy learning 층 사례
- [[physical-ai/nvidia-2025-cosmos-world-foundation-model-platform]]: world foundation model 계열의 대표 플랫폼
- [[physical-ai/open-x-embodiment-2023-robotic-learning-datasets-and-rt-x]]: action grounding 층의 데이터 표준화 기반
- [[physical-ai/nasiriany-2024-robocasa-large-scale-simulation-of-everyday]]: embodied deployment 평가에 쓰이는 대규모 시뮬레이션 벤치마크
- [[overviews/physical-ai-overview]]: 도메인 허브
- [[overviews/glossary-physical-ai]]: 용어 canonical 표기
