---
title: "Awesome Physical AI"
type: repo
year: 2026
category: physical-ai
source: keon-awesome-physical-ai.md
raw_path: raw/repos/keon-awesome-physical-ai.md
raw_filename: "keon-awesome-physical-ai.md"
source_collection: external
org: "keon"
repo: "awesome-physical-ai"
url: "https://github.com/keon/awesome-physical-ai"
license: "CC0-1.0"
tags: [physical-ai, vla, world-model, robot-learning]
---

## 요약

Awesome Physical AI는 Physical AI 분야의 논문과 리소스를 16개 최상위 섹션으로 배열한 큐레이션 목록 저장소다. Keon Kim이 관리하고 라이선스는 CC0-1.0이다. 논문 항목만 377개이고 데이터셋, 시뮬레이터, 기업, 연구실 표까지 더하면 485개 항목이 실려 있다.

이 저장소의 가치는 개별 논문 요약이 아니라 분류 자체에 있다. 기고 가이드라인이 "각 논문은 하나의 카테고리에만 넣는다"로 명시돼 있어서, 어떤 연구가 어떤 방법 계보에 속하는지가 배치만으로 드러난다.

수록 시점은 2026년 초다. 2025년 발표 항목이 191개로 전체의 절반을 넘고 ICLR 2026 투고본이 19개 포함돼 있어, 확정 출판물을 모은 서지 목록이라기보다 진행 중인 연구까지 담은 리빙 도큐먼트에 가깝다.

## 배경

Physical AI는 로봇 embodiment로 물리 세계를 인식하고 추론하며 조작하는 AI 시스템을 가리킨다. embodiment는 로봇의 물리적 형상과 그에 딸린 제어 API 구성을 뜻한다. 이 저장소의 서문은 인식, 추론, action을 실제 환경에서 결합하는 것이 이 분야의 정의라고 밝힌다.

목록이 필요해진 이유는 발표량의 편중에서 드러난다. 수록 항목 377개의 발표 연도를 세어 보면 2023년 이후가 359개로 전체의 95.2%를 차지한다.

| 발표 연도 | 항목 수 | 비중 |
|---|---|---|
| 2021년 이전 | 5 | 1.3% |
| 2022년 | 13 | 3.4% |
| 2023년 | 52 | 13.8% |
| 2024년 | 84 | 22.3% |
| 2025년 | 191 | 50.7% |
| 2026년 | 32 | 8.5% |

절반이 한 해(2025년)에 몰려 있는 분포에서는 개별 논문을 순서대로 따라 읽는 방식이 잘 작동하지 않는다. 따라서 이 목록은 논문을 소개하는 대신 방법의 좌표계를 먼저 제시하고 그 위에 항목을 배치하는 방식을 택한다.

## 핵심 개념

VLA는 vision, language, action을 함께 다루는 모델 계열을 가리킨다. 이 목록에서 가장 큰 섹션이며, action을 어떤 형식으로 내보내는지에 따라 다시 하위 구분으로 나뉜다.

world model은 환경의 동역학을 학습해 미래를 예측하는 모델이다. 목록은 world model을 VLA와 나란한 두 번째 중심 계보로 잡고 별도 최상위 섹션을 준다.

단일 카테고리 규칙은 이 목록의 조직 원리다. 기고 가이드라인 네 항목 중 하나로, 한 논문이 여러 섹션에 중복 등장하지 못하게 막는다. 그 결과 목록은 링크 모음이 아니라 방법 기준 분류표가 된다.

기고 가이드라인 전체는 다음과 같다.

- 로보틱스, embodied agent, world model, VLA를 다루는 Physical AI 논문에 집중한다.
- 각 논문은 하나의 카테고리에만 등장한다.
- 논문, 프로젝트, 코드 링크를 갖춘 인용을 포함한다.
- 모든 링크의 유효성을 확인한다.

## 분류 체계

### 최상위 섹션과 항목 분포

16개 최상위 섹션 중 13개가 논문 항목을 담고, 나머지 3개는 리소스 표와 인접 목록 링크를 담는다.

| 섹션 | 항목 수 | 하위 구분과 항목 수 |
|---|---|---|
| Foundations | 10 | Vision-Language Backbones 5, Visual Representations 5 |
| VLA Architectures | 73 | End-to-End 39, Modular 19, Compact & Efficient 15 |
| Action Representation | 46 | Discrete Tokenization 8, Discrete Diffusion 5, Continuous & Diffusion Policies 33 |
| World Models | 33 | JEPA & Latent Prediction 7, Generative 13, Embodied 13 |
| Reasoning & Planning | 27 | Chain-of-Thought & Deliberation 22, Error Detection & Recovery 5 |
| Learning Paradigms | 39 | Imitation Learning 16, Reinforcement Learning 20, Reward Design 3 |
| Scaling & Generalization | 26 | Scaling Laws 6, Cross-Embodiment Transfer 12, Open-Vocabulary Generalization 8 |
| Deployment | 10 | Quantization & Compression 8, Real-Time Control 2 |
| Safety & Alignment | 8 | 하위 구분 없음 |
| Lifelong Learning | 8 | 하위 구분 없음 |
| Applications | 53 | Humanoid Robots 7, Manipulation 9, Navigation 37 |
| Sim-to-Real Transfer | 8 | 하위 구분 없음 |
| Surveys | 36 | 하위 구분 없음 |
| Resources | 48 | Datasets & Benchmarks 34, Simulation Platforms 14 |
| Companies & Projects | 49 | Companies 32, Research Labs & Initiatives 17 |
| Related Works | 11 | 인접 awesome 목록 링크 |

VLA Architectures와 Action Representation 두 섹션이 합쳐 119개로 논문 항목의 31.6%를 차지한다. 즉 목록의 무게 중심은 "무엇을 시키는가"가 아니라 "어떤 구조로 action을 만들어내는가"에 있다.

반면 밀도 차이도 크다. Applications 아래 Navigation 하나가 37개로 최대 하위 구분인 데 비해, Real-Time Control은 2개, Reward Design은 3개에 그친다.

### VLA 아키텍처 분류

VLA Architectures는 인지와 action을 한 모델에 담는지 여부를 기준으로 세 가지로 나뉜다.

| 구분 | 분류 기준 | 대표 항목 | 항목 수 |
|---|---|---|---|
| End-to-End VLAs | vision, language, action을 하나의 아키텍처에서 통합 토큰으로 다룬다 | RT-1, RT-2, OpenVLA, PaLM-E, Gato, VIMA, π0.5, π0.6, GR-3, UniVLA | 39 |
| Modular VLAs | 고수준 인지를 맡는 VLM 계획 모듈과 저수준 action을 맡는 전용 모터 모듈을 분리한다 | CogACT, Gemini Robotics, SayCan, Code as Policies, Helix, OpenHelix | 19 |
| Compact & Efficient VLAs | 빠른 추론과 엣지 배포를 목표로 모델을 경량화한다 | TinyVLA, SmolVLA, BitVLA, NORA, VLA-Adapter, MoLe-VLA | 15 |

Modular 계열에는 dual-system VLA 연구가 몰려 있다. dual-system VLA는 느린 대형 모델과 빠른 경량 policy를 서로 다른 주기로 함께 실행하는 구조를 말한다. Hume, RationalVLA, Fast-in-Slow, TriVLA, DualVLA가 모두 이 계열로 분류돼 있다.

### action 표현 분류

Action Representation은 policy가 내놓는 action을 어떤 형식으로 적는지에 따라 나뉜다. policy는 현재 observation을 받아 다음 action을 정하는 함수를 말한다.

| 구분 | 분류 기준 | 대표 항목 | 항목 수 |
|---|---|---|---|
| Discrete Tokenization | 연속적인 관절 움직임을 이산 action 토큰으로 변환한다 | FAST, ACT, GR-1, GR-2, Behavior Transformers, FASTer, OmniSAT, VQ-VLA | 8 |
| Discrete Diffusion VLAs | autoregressive 디코딩 대신 discrete diffusion으로 action 토큰을 병렬 생성한다 | Discrete Diffusion VLA, dVLA, DIVA, Unified Diffusion VLA, LLaDA-VLA | 5 |
| Continuous & Diffusion Policies | diffusion이나 flow matching으로 연속 trajectory를 직접 생성한다 | π₀, Octo, Diffusion Policy, RDT-1B, Consistency Policy, ManiFlow, Dita | 33 |

flow matching은 noise에서 목표 분포로 가는 연속 변환의 속도장을 학습하는 생성 기법이다. Continuous & Diffusion Policies가 33개로 세 구분 중 가장 크며, 이 목록에서 action 출력의 주류가 연속값 생성 쪽임을 보여준다.

Discrete Diffusion VLAs는 항목이 5개뿐이지만 그중 3개가 ICLR 2026 투고본이다. 즉 아직 출판 이전 단계의 신생 구분이다.

### world model 분류

World Models는 무엇을 예측하고 무엇을 생성하는지에 따라 세 가지로 나뉜다.

| 구분 | 분류 기준 | 대표 항목 | 항목 수 |
|---|---|---|---|
| JEPA & Latent Prediction | 픽셀 대신 미래 latent를 예측한다 | I-JEPA, V-JEPA, V-JEPA 2, MC-JEPA, LeJEPA, VL-JEPA | 7 |
| Generative World Models | 픽셀, 영상, 상호작용 가능한 환경을 직접 생성한다 | World Models, DreamerV3, Genie, Genie 2, Sora, GAIA-1, DIAMOND, Cosmos-Predict2.5 | 13 |
| Embodied World Models | manipulation과 내비게이션 같은 로봇 과제에 맞춘 world model을 다룬다 | UniSim, Video Language Planning, SIMA, MineDreamer, PointWorld, DreamDojo | 13 |

JEPA 계열의 출발점으로는 LeCun의 2022년 논문 "A Path Towards Autonomous Machine Intelligence"가 첫 항목으로 놓여 있고, 목록은 이를 world model을 인지 구조의 중심에 두는 구상으로 소개한다.

### 그 밖의 섹션

나머지 섹션은 학습 방법, 배포, 안전, 응용을 나눠 맡는다.

- **Reasoning & Planning**: action 이전에 명시적 추론을 두는 Chain-of-Thought & Deliberation 22개와, 실패를 감지하고 복구하는 Error Detection & Recovery 5개로 구성된다. 앞쪽에는 Embodied-CoT, ReAct, Cosmos-Reason1, HAMLET이, 뒤쪽에는 DoReMi, Code-as-Monitor, AHA가 들어 있다.
- **Learning Paradigms**: 시연 데이터(demonstration)를 흉내 내는 imitation learning 16개, policy를 강화학습으로 최적화하는 Reinforcement Learning 20개, 언어 모델로 reward 함수를 자동 생성하는 Reward Design 3개다. imitation learning은 시연 데이터를 흉내 내 policy를 학습하는 방법이다.
- **Scaling & Generalization**: scaling law 6개, 하나의 policy로 형상이 다른 여러 로봇을 제어하는 Cross-Embodiment Transfer 12개, 학습에서 보지 않은 시각과 의미 개념으로 넓히는 Open-Vocabulary Generalization 8개다.
- **Deployment**: 저비트 양자화로 엣지에 올리는 Quantization & Compression 8개와, 지연이 큰 추론과 지연이 작은 제어를 잇는 Real-Time Control 2개다.
- **Safety & Alignment**: 8개 항목으로 Robot Constitution, ASIMOV 안전 벤치마크, RoboPAIR jailbreak 연구, 로봇이 vision-language pre-training에서 유해한 편향을 물려받는다는 FAccT 2022 연구를 담는다.
- **Lifelong Learning**: 이전 스킬을 잊지 않고 계속 학습하는 agent 8개다. Voyager, RoboGen, RoboCat, LOTUS, JARVIS-1이 여기 있다.
- **Applications**: Humanoid Robots 7개, Manipulation 9개, Navigation 37개다. Navigation은 LM-Nav와 NaVILA 같은 초기 연구부터 2025년 이후의 VLN 계열까지 이어진다.
- **Sim-to-Real Transfer**: 8개 항목으로 RE3SIM, Real2Render2Real 같은 real-to-sim-to-real 파이프라인을 모은다. sim2real은 시뮬레이션에서 학습한 policy를 실제 기기로 옮기는 문제다.
- **Surveys**: 36개로 논문 항목을 담는 13개 섹션 중 다섯 번째로 크다. VLA, world model, embodied AI, 안전, 자율주행 각각의 서베이가 들어 있다.

## 수록 리소스

논문 밖 자원은 Resources와 Companies & Projects 두 섹션이 표로 정리한다. 리스트 형식 대신 표를 쓴 부분이라 항목 사이 비교가 가능하다.

### 데이터셋과 벤치마크

Datasets & Benchmarks 표에는 34개 항목이 규모와 초점과 함께 올라 있다.

| 이름 | 규모 | 초점 |
|---|---|---|
| Open X-Embodiment | 100만 개 이상 trajectory, 22종 로봇 | cross-embodiment |
| DROID | 7만 6천 개 trajectory, 564개 장면 | 통제되지 않은 환경의 manipulation |
| LIBERO | 130개 과제 | lifelong learning |
| CALVIN | long-horizon | 언어 조건 과제 |
| RLBench | 100개 과제 | manipulation 벤치마크 |
| RoboCasa365 | 365개 과제, 2천 개 이상 장면 | 주방 manipulation |
| SIMPLER | sim-to-real | policy 평가 |
| VLABench | long-horizon | 추론 벤치마크 |
| EWMBench | world model 평가 | 장면, 동작, 의미 |
| RoboArena | 분산 평가 | 실제 환경 벤치마크 |
| EmbSpatial-Bench | 공간 이해 | embodied 과제 |

long-horizon 과제는 여러 단계를 이어야 끝나는 긴 과제를 말한다. CALVIN과 VLABench가 이 성격을 명시적으로 내건 벤치마크다.

### 시뮬레이터

Simulation Platforms 표에는 14개 항목이 올라 있다. 시뮬레이터는 물리 엔진으로 로봇과 환경의 상호작용을 계산해 실제 기기 없이 데이터를 만들고 policy를 평가하는 소프트웨어다.

| 이름 | 초점 |
|---|---|
| ManiSkill3 | GPU 병렬 처리를 적용한 로보틱스 |
| Genesis | 미분 가능 물리 |
| Isaac Lab / Isaac Sim | NVIDIA 로보틱스 시뮬레이션 |
| MuJoCo Playground | 브라우저에서 실행되는 MuJoCo |
| OmniGibson | 고정밀 가정 환경 |
| Habitat 2.0 | 내비게이션과 물체 재배치 |
| BEHAVIOR-1K | 1,000가지 일상 활동 |
| RoboSuite | 모듈형 manipulation |
| LocoMuJoCo | locomotion 벤치마크 |
| PyBullet | 강화학습용 경량 물리 엔진 |

### 기업과 연구실

Companies 표 32개와 Research Labs & Initiatives 표 17개가 논문 밖 생태계를 연결한다.

| 기업 | 초점 | 대표 산출물 |
|---|---|---|
| Physical Intelligence | 범용 로봇 foundation model | π₀, π₀.5, π₀.6, FAST |
| Google DeepMind | 로보틱스 연구 | RT-1, RT-2, Gemini Robotics, Genie, PaLM-E |
| NVIDIA | 시뮬레이션과 foundation model | GR00T, Isaac Sim, Cosmos |
| Meta AI (FAIR) | JEPA와 embodied AI | I-JEPA, V-JEPA, R3M, DINOv2, SAM |
| Hugging Face | 오픈소스 VLA | LeRobot, SmolVLA |
| ByteDance | VLA 모델 | GR-1, GR-2, CogACT |
| World Labs | 공간 지능과 world model | Marble, RTFM |
| Wayve | 주행용 embodied AI | GAIA-1, LINGO |
| Figure AI | humanoid | Figure 01, Figure 02 |
| Unitree | 사족보행 로봇과 humanoid | H1, G1, Go2 |

연구실 표는 방법과 기관을 잇는다. Stanford IRIS Lab에 Diffusion Policy와 MimicPlay, Stanford ILIAD에 ACT와 ALOHA, Berkeley RAIL에 Octo와 BridgeData와 R3M, Columbia Robotics에 Diffusion Policy와 CLIPort, Toyota Research Institute에 Prismatic VLMs와 OpenVLA가 각각 대응한다.

## 대표 수치와 주장

항목 해설에 수치가 붙은 것을 모으면 다음과 같다. 모두 각 항목의 원문이 밝힌 값을 옮긴 것이다.

| 항목 | 목록이 밝힌 수치와 주장 |
|---|---|
| OpenVLA | 오픈소스 7B 모델이 55B RT-2-X를 앞서며 VLA 연구를 대중화했다 |
| RT-2 | VLM을 로봇 데이터로 co-fine-tuning해 VLA 패러다임을 세웠다 |
| PaLM-E | 562B 파라미터 모델이 멀티모달 chain-of-thought 추론을 보였다 |
| Gato | 단일 Transformer가 게임, 대화, 로보틱스에 걸친 604개 과제를 처리했다 |
| SmolVLA | 450M 파라미터로 10배 큰 모델과 비슷한 성능을 냈다 |
| FAST | frequency-space DCT 방식의 action tokenization으로 action 시퀀스를 7배 압축한다 |
| π₀ | flow matching으로 50Hz 연속 action을 생성해 정교한 조작 과제를 다룬다 |
| Consistency Policy | diffusion policy를 단일 스텝 모델로 distillation해 추론을 10배 빠르게 한다 |
| DreamerV3 | world model 기반 강화학습 agent가 150개 이상 과제를 익혔다 |
| GENBOT-1K | 약 1,000개 로봇 body로 학습해 학습에서 보지 않은 로봇으로 zero-shot 전이한다 |
| Crossformer | 하나의 policy로 로봇 팔, 다리 로봇, 드론을 함께 제어한다 |
| EgoScale | 2만 시간 이상의 1인칭 시점 영상으로 사람에서 로봇으로의 전이에서 로그 선형 scaling law를 찾고, 22자유도 손에서 성공률을 54% 개선했다 |
| CO-RFT | 2단계 offline 강화학습으로 imitation learning 대비 57% 개선했다 |
| Being-H0.5 | 3만 5천 시간 이상, 30종 embodiment 데이터로 학습해 LIBERO에서 98.9%를 기록했다 |
| WholeBodyVLA | AgiBot X2에서 GR00T를 21.3% 앞섰다 |
| DreamDojo | 4만 4천 시간의 1인칭 시점 사람 영상으로 pre-training하고, distillation 이후 초당 10.81프레임으로 동작한다 |
| PointWorld | 200만 개 trajectory로 학습해 시연 데이터나 fine-tuning 없이 zero-shot manipulation을 수행하며 MPC 추론이 0.1초다 |
| Cosmos-Predict2.5 | 2억 개 영상 클립으로 2B와 14B 규모를 학습한 flow 기반 world foundation model이다 |

수치는 성격이 두 가지로 갈린다. 하나는 효율 주장으로, SmolVLA의 450M 파라미터, FAST의 7배 압축, Consistency Policy의 10배 가속이 여기 속한다. 다른 하나는 규모 주장으로, EgoScale의 2만 시간, DreamDojo의 4만 4천 시간, Cosmos-Predict2.5의 2억 클립이 여기 속한다.

다만 이 수치들은 같은 조건에서 측정된 값이 아니다. 목록이 항목별 원문 주장을 옮겨 놓은 것이므로 항목 사이의 직접 비교에는 쓸 수 없다.

## 저장소 보유 자료와의 대응

이 목록의 항목 중 상당수는 이 저장소가 이미 개별 페이지로 보유하고 있다. 목록에서 방법 계보 안의 위치를 확인하고 세부는 저장소 페이지에서 읽는 방식으로 함께 쓸 수 있다.

| 목록 위치 | 목록 항목 | 저장소 페이지 |
|---|---|---|
| End-to-End VLAs | RT-1 | [[physical-ai/brohan-2022-rt-1-robotics-transformer-for-real-world]] |
| End-to-End VLAs | RT-2 | [[physical-ai/brohan-2023-rt-2-vision-language-action-models-transfer-web]] |
| End-to-End VLAs | OpenVLA | [[physical-ai/kim-2024-openvla-an-open-source-vision-language-action-model]] |
| End-to-End VLAs | π0.5 | [[physical-ai/black-2025-pi05-a-vision-language-action-model-with]] |
| End-to-End VLAs | π0.6 | [[physical-ai/amin-2025-pistar06-a-vla-that-learns]] |
| Modular VLAs | Helix | [[physical-ai/figure-ai-2025-helix-a-vision-language-action]] |
| Modular VLAs | OpenHelix | [[physical-ai/cui-2025-openhelix-a-short-survey-empirical]] |
| Compact & Efficient VLAs | SmolVLA | [[physical-ai/shukor-2025-smolvla-a-vision-language-action-model]] |
| Discrete Tokenization | ACT | [[physical-ai/zhao-2023-learning-fine-grained-bimanual-manipulation]] |
| Discrete Tokenization | GR-1 | [[physical-ai/wu-2023-unleashing-large-scale-video-generative]] |
| Continuous & Diffusion Policies | π₀ | [[physical-ai/black-2024-pi0-a-vision-language-action-flow-model]] |
| Cross-Embodiment Transfer | RT-X | [[physical-ai/open-x-embodiment-2023-robotic-learning-datasets-and-rt-x]] |
| Humanoid Robots | GR00T N1 | [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation]] |
| Datasets & Benchmarks | RoboCasa | [[physical-ai/nasiriany-2024-robocasa-large-scale-simulation-of-everyday]] |
| Datasets & Benchmarks | RoboCasa365 | [[physical-ai/nasiriany-2026-robocasa365-a-large-scale-simulation-framework]] |
| Surveys | An Anatomy of VLA Models | [[physical-ai/xu-2025-an-anatomy-of-vision-language-action-models]] |
| Surveys | World Models for Embodied AI | [[physical-ai/li-2025-a-comprehensive-survey-on-world]] |
| Surveys | VLA Models for Robotics | [[physical-ai/kawaharazuka-2025-vision-language-action-models-for-robotics]] |
| Companies (Hugging Face) | LeRobot | [[physical-ai/huggingface-lerobot]] |
| π0.5 항목의 Code 링크 | openpi | [[physical-ai/physical-intelligence-openpi]] |

반대 방향의 공백도 있다. 저장소가 보유한 자료 중 이 목록에 없는 것으로는 π0.7, WALL-OSS, GR00T N1.5, SONIC, Cosmos World Foundation Model Platform 논문이 있다. 목록의 스냅샷 시점 이후에 나왔거나 목록이 아직 반영하지 못한 항목이다.

FAST-LIO 계열의 LiDAR odometry와 Nav2 같은 ROS 2 내비게이션 스택도 빠져 있다. odometry는 센서로 이동량을 누적해 로봇의 상대 위치를 추정하는 방법을 말한다. 이 목록이 학습 기반 방법을 대상으로 삼고 고전 로보틱스 기반 소프트웨어를 범위 밖에 두기 때문이다.

Related Works가 나열한 인접 목록 11개에도 이 저장소가 보유한 natnew/awesome-physical-ai와 OpenHelix-robot/awesome-dual-system-vla는 들어 있지 않다. 세 목록을 함께 읽으면 서로의 공백을 메울 수 있다.

## 한계

목록 형식 자체의 한계가 가장 크다. 각 항목은 논문 제목, 발표처, 링크, 길어야 한두 줄 해설로 구성된 인덱스여서 방법의 상세나 항목 사이 정량 비교표가 없다. 실제 깊이는 원 논문에서 확보해야 한다.

미확정 참조가 상당수 남아 있다. arXiv 식별자가 `XXXXX` 플레이스홀더로 남은 항목이 27개이고, ICLR 2026 투고본 19개는 익명 심사 중이라 링크 자체가 없다. 따라서 인용하기 전에 출판 여부와 링크 유효성을 다시 확인해야 한다.

해설과 코드의 밀도도 고르지 않다.

| 지표 | 값 | 논문 항목 377개 대비 |
|---|---|---|
| Paper 링크가 붙은 항목 | 352개 | 93.4% |
| Project 링크가 붙은 항목 | 193개 | 51.2% |
| Code 링크가 붙은 항목 | 74개 | 19.6% |
| `TL;DR` 요약이 붙은 항목 | 23개 | 6.1% |

Code 링크가 5분의 1에 못 미친다는 것은 재현 가능한 구현이 공개된 항목이 소수라는 뜻이다. `TL;DR` 요약이 붙은 23개 중 16개는 ICLR 2026 투고본이라, 오히려 검증이 덜 된 항목에 해설이 몰려 있다.

커버리지도 편중돼 있다. Navigation 하위 구분 하나가 37개인 데 반해 Safety & Alignment 전체가 8개, Real-Time Control이 2개, Reward Design이 3개다. manipulation, 내비게이션, VLA 쪽은 두터운 반면 hardware와 control theory 영역은 얇다.

마지막으로 이 파일은 2026년 초 상태를 담은 사본이다. 이후 갱신은 원본 저장소에서 확인해야 한다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| Physical AI | 로봇 embodiment로 물리 세계를 인식하고 추론하며 조작하는 AI 시스템. 이 목록이 다루는 상위 범주 |
| End-to-End VLA | vision, language, action을 하나의 아키텍처에서 통합 토큰으로 다루는 모델 계열 |
| Modular VLA | 고수준 인지 모듈과 저수준 action 모듈을 분리한 계열 |
| Discrete Diffusion VLA | autoregressive 디코딩 대신 discrete diffusion으로 action 토큰을 병렬 생성하는 방식 |
| Cross-Embodiment Transfer | 하나의 policy로 형상이 다른 여러 로봇을 제어하는 문제 |
| 단일 카테고리 규칙 | 한 논문을 하나의 섹션에만 등재하도록 강제하는 기고 규칙. 이 목록을 분류표로 만드는 조직 원리 |

## 관련 페이지

- [[overviews/physical-ai-overview]]: physical-ai 카테고리의 분류 뼈대와 태그 어휘와 학습 경로 허브. 이 목록은 그 분류를 외부에서 교차 검증하는 지도로 쓸 수 있다.
- [[physical-ai/natnew-awesome-physical-ai]]: 같은 분야를 다루는 다른 awesome 목록. 이 목록의 Related Works에는 포함돼 있지 않다.
- [[physical-ai/openhelix-robot-awesome-dual-system-vla]]: Modular VLAs 구분과 겹치는 dual-system VLA 전용 목록.
- [[physical-ai/brohan-2022-rt-1-robotics-transformer-for-real-world]]: 목록이 VLA 계보의 출발점으로 잡는 RT-1 원 논문.
- [[physical-ai/hou-2026-world-model-for-robot-learning]]: World Models 섹션과 겹치는 world model 서베이.
- [[physical-ai/bytedance-gr-1]]: Discrete Tokenization 구분의 GR-1 공식 구현 저장소.
- [[overviews/glossary-physical-ai]]: policy, world model, sim2real 등 이 페이지가 따르는 용어 canonical 표기.
