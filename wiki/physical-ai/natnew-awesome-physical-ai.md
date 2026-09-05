---
title: "Awesome Physical AI: A Comprehensive Resource Map"
type: repo
year: 2026
category: physical-ai
source: natnew-awesome-physical-ai.md
raw_path: raw/repos/natnew-awesome-physical-ai.md
raw_filename: "natnew-awesome-physical-ai.md"
source_collection: external
org: "natnew"
repo: "awesome-physical-ai"
url: "https://github.com/natnew/awesome-physical-ai"
license: "MIT"
tags: [physical-ai, robot-learning, vla, world-model]
figures: []
---

## 요약

`natnew/awesome-physical-ai`는 Physical AI 영역의 도구, 데이터, 논문, 회사, 규제 문서를 한 목차로 모은 큐레이션 링크 색인이다. 정본 카테고리 14개에 항목 226개, 부록 10개 절에 항목 127개를 담아 합계 353개 항목을 배열한다. 라이선스는 MIT이고 GitHub Pages 기반 라이브 문서 사이트를 함께 운영한다.

이 저장소는 논문이나 코드가 아니라 자료로 가는 지도다. 따라서 이 페이지는 저장소가 무엇을 주장하는지가 아니라 어떤 뼈대로 자료를 배열했고 그 배열을 이 wiki에서 어떻게 쓸 것인지를 정리한다.

이 목록의 성격은 연구 자료와 배포 자료를 같은 층에 놓은 데서 드러난다. 시뮬레이터와 데이터셋 옆에 ISO 26262와 ROS 2가 같은 등급의 정본 카테고리로 서 있어서, 알고리즘 논문에서 현장 배포까지를 하나의 목차로 훑게 한다.

## 배경

Physical AI 자료는 여러 곳에 흩어져 있다. 시뮬레이터 문서는 각 벤더 사이트에, 데이터셋은 프로젝트 페이지에, 평가 프로토콜은 개별 논문에, 안전 표준은 표준화 기구 사이트에 있어서 처음 들어오는 사람이 전체 지형을 파악하기 어렵다.

이 저장소는 그 흩어짐을 하나의 목차로 묶는 것을 목표로 삼는다. README 서두는 대상 독자를 연구자와 실무자, 그리고 embodied intelligence가 제품과 운영과 인프라를 어떻게 바꿀지 검토하는 기술 리더로 밝힌다. embodiment는 로봇의 물리적 형상과 그에 딸린 제어 구성을 뜻한다.

진입 장벽도 함께 다룬다. README는 "시작하는 데 하드웨어가 필요하지 않다"고 명시하고, 시뮬레이션에서 출발해 학습과 평가 루프를 이해한 뒤 실제 기기로 넘어가는 순서를 권한다.

## 핵심 개념

awesome-list는 특정 주제의 우수 자료를 한 줄 설명과 함께 모은 GitHub 링크 색인을 가리키는 관행이다. 원저작을 담지 않으므로 각 항목의 깊이는 링크가 가리키는 원본에 있고, 목록 자체의 값은 배열과 선별에 있다.

이 저장소는 수록 자료를 정본 카테고리(canonical categories)와 부록(appendices) 두 층으로 나눈다. 정본 카테고리는 방법과 자원의 종류에 따른 14개 상위 분류이고, 부록은 학습 자료, 하드웨어, 커뮤니티, 인접 색인처럼 본 분류를 보조하는 절이다.

policy는 현재 observation을 받아 다음 action을 정하는 함수를 말한다. 이 목록이 모으는 시뮬레이터, 데이터셋, 벤치마크, 모델은 결국 그 policy를 어떻게 학습하고 어떻게 검증하느냐를 둘러싼 자원이다.

trajectory는 observation과 action이 시간순으로 이어진 실행 기록이다. 데이터셋 항목의 규모가 대부분 trajectory 개수로 표기되므로, 이 단위를 알아야 목록의 수치를 읽을 수 있다.

## 분류 체계

### 정본 카테고리

정본 카테고리 14개는 자료의 성격을 따라 배열된다. 절 이름은 저장소의 목차 식별자이므로 원문 표기를 그대로 옮긴다.

| 절 이름 | 항목 수 | 담는 내용 | 대표 항목 |
|---|---|---|---|
| Simulators | 15 | 물리 엔진과 시뮬레이션 환경 | MuJoCo, Isaac Sim, Isaac Lab, Drake, Genesis, CARLA |
| Datasets | 15 | 대규모 teleoperation과 시연 데이터(demonstration) | Open X-Embodiment, DROID, BridgeData V2, RoboMIND, Ego4D |
| Benchmarks | 15 | 과제 스위트와 표준화된 평가 | LIBERO, RLBench, MetaWorld, CALVIN, HumanoidBench |
| Evaluation Methodology | 15 | 평가 프로토콜과 통계 방법론 | RoboArena, robomimic, SimplerEnv, rliable |
| Robotics Foundation Models | 15 | generalist policy와 VLA | π0, Octo, OpenVLA, RT-1, RT-2, RT-X, GR00T N1 |
| World Models | 16 | 예측과 생성 동역학 모델 | V-JEPA 2, Cosmos, Genie 2, DreamerV3, TD-MPC2 |
| Manipulation | 16 | grasping과 접촉이 많은 정밀 조작 | Diffusion Policy, ACT, Mobile ALOHA, Dex-Net, DP3 |
| Locomotion | 26 | 다리, 이족, humanoid 이동 | RMA, HumanPlus, RSL-RL, DeepMimic, HOVER, ASAP |
| Sim-to-Real | 15 | policy 전이 기법과 사례 | domain randomization, Eureka, DeXtreme, ADR, BayesSim |
| Safety & Robustness | 15 | 안전 탐색과 강건성 검증 | Safety Gym, CPO, control barrier function, VerifAI |
| Governance & Policy | 15 | 표준과 규제 | NIST AI RMF, EU AI Act, ISO 10218, ISO 26262 |
| Production Patterns / Reference Architectures | 16 | 미들웨어와 런타임 | ROS 2, Isaac ROS, MoveIt 2, Nav2, DDS Security, Foxglove |
| Courses | 16 | 대학 강의와 학습 프로그램 | Stanford CS336, Stanford CS224R, Berkeley CS287, MIT 6.4210 |
| Companies | 16 | 산업 주체 | Physical Intelligence, Figure, Boston Dynamics, Wayve |

항목 수가 가장 많은 절은 Locomotion으로 26개이고, 나머지 절은 대부분 15개에서 16개 사이로 고르게 유지된다. 즉 저자가 절마다 대략 15개라는 상한을 두고 큐레이션한 반면, humanoid whole-body control 논문이 몰린 Locomotion만 그 상한을 넘겼다. whole-body control은 균형과 이동을 포함해 몸 전체를 함께 제어하는 문제를 말하며, ASAP, HOVER, HugWBC, Humanoid Parkour Learning처럼 2024년 이후 발표된 결과가 이 절을 키웠다.

Governance & Policy와 Production Patterns를 부록이 아니라 정본 카테고리로 올린 점이 연구 중심 목록과 다른 부분이다. 예를 들어 차량 기능 안전 표준인 ISO 26262와 EU 기계류 규정 2023/1230이 시뮬레이터와 같은 층위에 놓이고, ROS 2와 DDS 보안 규격이 world model 옆에 자리한다. 따라서 배포를 전제로 자료를 찾는 실무자가 별도 검색 없이 같은 목차 안에서 표준 문서를 찾을 수 있다.

### 부록

부록은 본 분류를 보조하는 10개 절로 이루어진다.

| 절 이름 | 항목 수 | 담는 내용 |
|---|---|---|
| Books | 7 | Probabilistic Robotics, Modern Robotics 등 교재. 무료 공개본 여부를 함께 표기 |
| Tutorials & Guides | 7 | LeRobot, Isaac Lab, MuJoCo, ROS 2의 실습 문서 |
| Key Papers | 23 | 영향력 있는 논문. humanoid locomotion 계열이 다수이고 발표 학회와 연도를 병기 |
| Survey Papers | 6 | foundation model, neural field, world model, 3D Gaussian Splatting 서베이 |
| Hardware Platforms | 27 | 팔 8종, humanoid 7종, mobile 5종, 저가 DIY 7종으로 다시 세분 |
| Conferences | 9 | CoRL, RSS, ICRA, IROS, NeurIPS, ICML, ICLR, HRI, Humanoids |
| Community | 6 | ROS Discourse, Robotics Stack Exchange, Discord 채널 |
| Newsletters & Blogs | 14 | 심층 분석 6종, 산업 뉴스 3종, 연구와 기업 블로그 5종 |
| People to Follow | 15 | 연구 리더 7명, 로보틱스와 하드웨어 4명, 산업 리더 4명 |
| Related Awesome Lists | 13 | 인접 색인. 이 중 3개는 같은 저자의 agentic AI 계열 목록 |

Key Papers 절은 다른 절과 중복을 허용한다. 예를 들어 Radosavovic 등의 Real-World Humanoid Locomotion with RL은 Locomotion, Sim-to-Real, Key Papers 세 절에 모두 등장하고, MIT 6.4210 강의는 Manipulation과 Courses 두 절에 등장한다. 즉 한 항목을 한 절에만 넣는 배타적 분류가 아니라, 찾는 경로가 여럿이면 여러 자리에 두는 방식이다.

### 항목 태그

일부 항목에는 HTML 주석 형태의 태그가 붙어 있어 라이브 사이트 빌드가 필터와 분류에 쓸 수 있다. 예를 들어 MuJoCo 항목 아래에는 `<!-- tags: simulator, open-source, production-ready -->`가 달려 있다. 사용되는 태그 값은 9종이다.

| 태그 | 뜻 |
|---|---|
| paper | 논문 항목 |
| tool | 바로 쓸 수 있는 도구 |
| framework | 학습이나 제어 프레임워크 |
| simulator | 시뮬레이터 |
| benchmark | 벤치마크 |
| open-source | 오픈소스 공개 |
| commercial | 상용 제품 |
| production-ready | 배포 환경에 쓸 수 있는 성숙도 |
| research-only | 연구 목적 사용 |

태그 부여는 전체에 적용되지 않았다. 353개 항목 중 태그가 붙은 것은 Simulators 15개, Robotics Foundation Models 15개, World Models 3개로 모두 33개뿐이다. 따라서 태그 기반 필터는 아직 목록 전체를 대상으로 동작하지 못한다.

## 학습 경로

학습 경로는 두 층으로 제시된다. 첫 번째는 5단계 빠른 시작 경로이고, 두 번째는 관심사별 진입 루트다.

| 단계 | 자료 | 배우는 것 |
|---|---|---|
| 1 | Gymnasium CartPole | 상태, action, reward, policy로 이어지는 강화학습 루프 |
| 2 | MuJoCo | 제어, 물리, 접촉, 로봇 동역학의 모델링 방식 |
| 3 | LeRobot | 로봇 데이터셋, policy, 학습, 평가가 실무에서 묶이는 구조 |
| 4 | OpenVLA | perception과 언어와 로봇 제어를 잇는 vision-language-action 구조 |
| 5 | 심화 | imitation learning, generalist policy, sim2real, 하드웨어, 평가 |

이 순서는 계산 자원과 하드웨어 요구가 낮은 것부터 높은 것으로 올라간다. 1단계와 2단계는 노트북에서 실행되는 시뮬레이션이고, 3단계에서 실제 로봇 데이터의 형식과 학습 스크립트를 처음 만나며, 4단계에 이르러 대형 모델을 다룬다. sim2real은 시뮬레이션에서 학습한 policy를 실제 기기로 옮기는 문제를 말하는데, 5단계에서야 등장하는 것도 같은 이유다.

그 위에 관심사별 루트 5개가 놓인다.

- Foundations: 시뮬레이션, 제어, 강화학습, robot learning의 기본 개념
- Robot Learning: imitation learning, diffusion policy, visuomotor 제어
- Foundation Models: VLA, generalist policy, world model, 대규모 로봇 데이터
- Evaluation & Safety: 벤치마크, 강건성, 배포 제약, 책임 있는 embodied AI
- Hardware: 저가 로봇 플랫폼과 실습 프로젝트

generalist policy는 과제별 fine-tuning 없이 하나의 모델로 여러 downstream 과제를 푸는 policy를 말한다. Foundation Models 루트가 이 목록에서 가장 최근 자료로 채워진 구간이다.

## 수록 항목의 규모 지표

awesome-list라 자체 실험 결과는 없다. 대신 항목 설명에 붙은 규모 지표를 모으면 이 영역의 현재 좌표가 드러난다.

| 항목 | 규모 | 의미 |
|---|---|---|
| Open X-Embodiment | embodiment 22종에 걸친 trajectory 100만 개 이상 | cross-embodiment 학습의 사실상 표준 코퍼스 |
| DROID | 기관 13곳이 협력해 수집 | 실험실 밖 환경의 manipulation 데이터 |
| RoboMIND | trajectory 31만 개 이상 | 양팔 mobile manipulation 멀티모달 데이터셋 |
| V-JEPA 2 | 영상 100만 시간 이상으로 학습 | zero-shot 로봇 계획을 겨냥한 자기지도 world model |
| OpenVLA | 파라미터 70억 개 | Prismatic VLM 기반의 공개 VLA 기준선 |
| LIBERO | manipulation 과제 130개 | lifelong robot learning 벤치마크 |
| RLBench | 과제 100개 이상 | CoppeliaSim 기반 시각 조작 벤치마크 |
| MetaWorld | 과제 50개 | 다중 과제와 전이 연구용 meta-RL 벤치마크 |
| DreamerV3 | 과제 150개 이상에서 동일 hyperparameter | world model 알고리즘의 범용성 근거 |
| Colosseum | 변이 요인 14가지를 흔들어 평가 | manipulation 일반화 측정 |
| ALOHA 하드웨어 | 약 2만 달러 | 양팔 teleoperation 시스템의 저가 기준선 |
| Reachy Mini | 299달러부터 | 데스크톱 규모의 오픈소스 실험 플랫폼 |

이 수치들은 두 방향의 확장을 함께 보여준다. 한쪽에서는 데이터와 모델의 규모가 커져 trajectory 100만 개, 영상 100만 시간, 파라미터 70억 개 단위가 기준선이 됐다. 반면 다른 한쪽에서는 진입 비용이 내려가, 양팔 teleoperation 장비가 약 2만 달러, 데스크톱 실험 플랫폼이 299달러부터 제공된다.

world model은 환경의 동역학을 학습해 미래를 예측하는 모델을 말한다. 목록의 World Models 절은 Ha와 Schmidhuber의 2018년 논문부터 DreamerV3와 Cosmos, Genie 2까지 계보를 이어 놓아, 이 개념이 동역학 예측 모델에서 대규모 생성 모델로 확장돼 온 경로를 한 절에서 볼 수 있게 한다.

## 이 wiki와의 대응

목록의 개별 좌표 중 이 저장소가 이미 3-tier 자료로 보유한 항목은 다음과 같다.

| 목록의 항목 | 이 wiki의 페이지 |
|---|---|
| RT-1 | [[physical-ai/brohan-2022-rt-1-robotics-transformer-for-real-world]] |
| RT-2 | [[physical-ai/brohan-2023-rt-2-vision-language-action-models-transfer-web]] |
| RT-X, Open X-Embodiment | [[physical-ai/open-x-embodiment-2023-robotic-learning-datasets-and-rt-x]] |
| OpenVLA | [[physical-ai/kim-2024-openvla-an-open-source-vision-language-action-model]] |
| π0 | [[physical-ai/black-2024-pi0-a-vision-language-action-flow-model]], 구현체는 [[physical-ai/physical-intelligence-openpi]] |
| GR00T N1 | [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation]] |
| Helix (Figure) | [[physical-ai/figure-ai-2025-helix-a-vision-language-action]] |
| NVIDIA Cosmos | [[physical-ai/nvidia-2025-cosmos-world-foundation-model-platform]] |
| ACT | [[physical-ai/zhao-2023-learning-fine-grained-bimanual-manipulation]] |
| RoboCasa | [[physical-ai/nasiriany-2024-robocasa-large-scale-simulation-of-everyday]] |
| LeRobot | [[physical-ai/huggingface-lerobot]] |
| Nav2 | [[physical-ai/ros-navigation-navigation2]] |

목록이 한 줄 설명으로 가리키는 자리를 이 wiki는 원본 수집과 요약으로 채우는 관계다. 반대로 목록에는 있으나 아직 페이지가 없는 Octo, Diffusion Policy, V-JEPA 2, DROID, LIBERO는 다음 수집 후보로 볼 수 있다.

수록 시점 차이도 드러난다. 목록은 π0와 GR00T N1까지만 담고 있어서, 이 wiki가 이미 보유한 후속 버전인 [[physical-ai/black-2025-pi05-a-vision-language-action-model-with]]와 [[physical-ai/nvidia-2025-gr00t-n1-5-an-improved-open]]는 목록보다 앞서 있다.

## 한계

큐레이션 목록의 한계가 그대로 적용된다.

- 깊이: 항목은 링크와 한 줄 설명뿐이다. 따라서 특정 모델의 성능 수치를 이 목록을 근거로 인용해서는 안 된다. 목록은 무엇이 있는지를 알려줄 뿐 그것이 얼마나 잘하는지를 검증하지 않는다.
- 선별 기준: 포함 여부와 배치는 저자의 편집 판단이며 선정 기준이 문서에 명시돼 있지 않다. 절마다 항목이 15개 안팎으로 맞춰진 것도 기준이 아니라 편집 관행으로 보인다.
- 태그 불균질: 태그가 붙은 항목이 33개뿐이라 태그 기반 필터와 분류가 목록 전체에서 동작하지 않는다.
- 노후화: 활발한 영역이라 링크와 항목은 시간이 지나면 낡는다. 저장소는 link-check 워크플로 배지로 링크 유효성을 관리하지만, 항목 자체의 최신성은 별도 문제다. 최신 VLA 버전이 반영되지 않은 것이 그 예다.
- 중복 배치: 같은 자료가 여러 절에 반복 등장하므로 항목 수를 서로 다른 자료의 개수로 읽으면 실제보다 많게 집계된다.

사용법은 발견용 색인으로 한정하는 것이 맞다. 특정 자료의 근거가 필요하면 그 원본을 `raw/`로 따로 수집해 3-tier에 태운 뒤 해당 페이지를 인용한다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| awesome-list | 특정 주제의 우수 자료를 한 줄 설명과 함께 모은 GitHub 링크 색인. `awesome.re` 배지가 이 관행을 표시한다 |
| 정본 카테고리 | 이 저장소가 자료를 배치하는 14개 상위 분류. 부록 절과 구분된다 |
| generalist policy | 과제별 fine-tuning 없이 하나의 모델로 여러 downstream 과제를 푸는 policy |
| trajectory | observation과 action이 시간순으로 이어진 실행 기록. 데이터셋 규모의 표기 단위 |
| world model | 환경의 동역학을 학습해 미래를 예측하는 모델 |
| sim2real | 시뮬레이션에서 학습한 policy를 실제 기기로 옮기는 문제 |

## 관련 페이지

- [[physical-ai/keon-awesome-physical-ai]]: 같은 주제의 다른 awesome 리스트. 16개 절로 논문을 중심에 놓고 최신 arXiv preprint까지 담아 갱신이 빠르며, 한 논문을 한 카테고리에만 넣는 배타적 분류를 쓴다.
- [[physical-ai/openhelix-robot-awesome-dual-system-vla]]: dual-system VLA 한 주제만 다루는 좁은 색인. 배제 목록과 벤치마크 결과표를 둔 점이 특징이며, 갱신은 근거 논문 저자들의 커뮤니티 PR로 이루어진다.
- [[physical-ai/cui-2025-openhelix-a-short-survey-empirical]]: 위 dual-system 목록의 근거 논문. 배제 판정 기준의 출처다.
- [[overviews/physical-ai-overview]]: physical-ai 카테고리의 분류 뼈대와 학습 경로 허브. 이 목록은 그 허브가 앞으로 채울 자리를 바깥에서 보여주는 지도다.
- [[physical-ai/zhang-2026-a-survey-of-physical-ai]]: Physical AI 전체 흐름을 서술로 정리한 서베이. 목록이 항목으로 나열한 영역을 산문으로 잇는다.
- [[physical-ai/hou-2026-world-model-for-robot-learning]]: 목록의 World Models 절이 가리키는 영역을 이 wiki가 보유한 서베이로 다룬 페이지.
- [[physical-ai/li-2025-a-comprehensive-survey-on-world]]: embodied AI 관점의 world model 서베이. 위 서베이와 함께 읽는다.
- [[overviews/glossary-physical-ai]]: 이 페이지가 쓰는 policy, trajectory, world model, sim2real의 canonical 표기 SSOT.
