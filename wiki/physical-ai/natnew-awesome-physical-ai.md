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

## 요약 (Summary)

Physical AI 전 영역을 엔지니어 관점으로 훑는 큐레이션 링크 맵이다. simulator·dataset·benchmark·robotics foundation model·world model·manipulation·locomotion·sim2real, 여기에 안전·거버넌스·프로덕션 미들웨어까지 14개 정본 카테고리로 자료를 묶는다. 논문이나 코드가 아니라 자료로 가는 색인이라 이 페이지도 무엇을 주장하는지가 아니라 어떤 뼈대로 모았는지를 정리한다.

전면에 내세우는 건 초심자 학습 경로다. 하드웨어 없이 시뮬레이션부터 시작하라는 원칙 아래, Gymnasium CartPole로 강화학습 루프를 익히고 MuJoCo로 물리 모델링을, LeRobot으로 실제 robot learning 워크플로를, OpenVLA로 vision-language-action 통합을 순서대로 보게 안내한다. policy는 현재 observation을 받아 다음 action을 정하는 함수를 말하는데, 이 목록은 그 policy를 배우는 도구와 데이터가 지금 어디에 흩어져 있는지를 한자리에 모은다.

저자가 직접 센 규모로는 simulator 17종, dataset 15종, benchmark 15종, robotics foundation model 14종, 주요 논문 80편+, 교재·코스 30종+이 있고, 회사 14곳+, 하드웨어 플랫폼, 거버넌스 프레임워크, 커뮤니티 포인터가 부록으로 붙는다.

## 주요 기여 (Key Contributions)

값은 두 갈래다. 분류 뼈대 하나, 진입로 하나.

분류 뼈대는 넓은 영역을 발견 가능하게 만든다. Physical AI에 흩어진 도구·데이터·논문·회사를 14개 정본 카테고리와 여러 부록으로 갈라 "미래의 내가 어디서 찾을까"에 답이 되는 자리에 놓는다. 진입로는 순서를 준다. 시뮬레이션 먼저라는 방침 아래 CartPole → MuJoCo → LeRobot → OpenVLA로 이어지는 5단계 빠른 시작 경로를 깔고 그 위에 관심사별 루트(Foundations / Robot Learning / Foundation Models / Evaluation & Safety / Hardware)를 얹어 목적에 따라 갈라 들어가게 한다.

각 항목에는 HTML 주석 형태의 태그(`simulator, open-source, production-ready` 같은)가 붙어 있어 라이브 사이트 빌드가 필터·분류에 쓸 수 있다.

## 분류 뼈대 (Taxonomy)

이 저장소의 아키텍처는 곧 분류 체계다. 정본 카테고리 14개는 자료의 성격을 따라 배열된다.

| 카테고리 | 담는 것 (대표 항목) |
|---|---|
| Simulators | 물리 엔진·시뮬레이션 환경 (MuJoCo, Isaac Sim, Isaac Lab, Drake, Genesis, CARLA) |
| Datasets | teleoperation·시연 데이터 (Open X-Embodiment, DROID, BridgeData V2, RoboMIND) |
| Benchmarks | 과제 스위트 (LIBERO, RLBench, MetaWorld, CALVIN, HumanoidBench) |
| Evaluation Methodology | 평가 방법론·프로토콜 (RoboArena, robomimic, SimplerEnv, rliable) |
| Robotics Foundation Models | generalist policy·VLA (π0, Octo, OpenVLA, RT-2, RT-X, GR00T N1) |
| World Models | 예측·생성 동역학 모델 (V-JEPA 2, Cosmos, Genie 2, DreamerV3, TD-MPC2) |
| Manipulation | grasping·정밀 조작 (Diffusion Policy, ACT, Mobile ALOHA, Dex-Net, DP3) |
| Locomotion | 다리·이족·humanoid 이동 (RMA, HumanPlus, RSL-RL, DeepMimic, HOVER) |
| Sim-to-Real | policy 전이 기법·사례 (domain randomization, Eureka, DeXtreme, ADR) |
| Safety & Robustness | 안전 탐색·강건성 (Safety Gym, CPO, control barrier function, VerifAI) |
| Governance & Policy | 표준·규제 (NIST AI RMF, EU AI Act, ISO 10218, ISO 26262) |
| Production Patterns | 미들웨어·런타임 (ROS 2, Isaac ROS, MoveIt 2, Nav2, DDS, Foxglove) |
| Courses | 대학 강의·학습 프로그램 (Stanford CS336/CS224R, Berkeley CS287, MIT 6.4210) |
| Companies | 산업 주체 (Physical Intelligence, Figure, Boston Dynamics, Wayve) |

부록은 정본 분류를 보완한다. Books, Tutorials & Guides, Key Papers, Survey Papers, Hardware Platforms(팔·humanoid·mobile·저가 DIY로 다시 세분), Conferences(CoRL·RSS·ICRA·IROS), Community, Newsletters & Blogs, People to Follow, Related Awesome Lists가 이어진다.

거버넌스와 프로덕션 축을 정본 카테고리로 끌어올린 점에서 이 목록의 성격이 드러난다. 연구 자료만 모으는 대신 실제 배포에서 부딪히는 표준(ISO 26262·EU Machinery Regulation)과 미들웨어(ROS 2·DDS 보안)를 같은 뼈대에 넣어 논문에서 현장까지 한 축으로 훑게 한다.

## 규모 좌표 (Notable Scale)

awesome-list라 자체 실험 결과는 없다. 대신 목록이 강조하는 규모 지표 몇 개를 보면 이 영역의 현재 좌표가 잡힌다.

- Open X-Embodiment — 22개 embodiment에 걸친 1M+ trajectory. trajectory는 observation과 action이 시간순으로 이어진 실행 기록이고, 이 데이터셋은 사실상의 cross-embodiment 학습 코퍼스다.
- DROID — 13개 기관이 협력해 모은 야외(in-the-wild) manipulation 데이터셋.
- RoboMIND — 310K+ trajectory의 bimanual mobile manipulation 데이터셋.

foundation model 축에서는 OpenVLA가 7B 파라미터 오픈 VLA, GR00T N1이 slow/fast dual-system humanoid foundation model로 소개된다. world model 축에서는 V-JEPA 2가 1M+ 시간 영상으로 학습해 zero-shot 로봇 계획을 겨냥한 자기지도 모델로 꼽힌다. world model은 환경의 동역학을 학습해 미래를 예측하는 모델을 말한다.

## 이 wiki에서 쓰는 법 (Limitations & How to Use)

큐레이션 목록의 한계가 그대로 적용된다. 항목은 링크와 한 줄 설명뿐이라 깊이는 각 원본으로 넘긴다. 포함 여부와 배치는 저자의 편집 판단이고 활발한 영역이라 링크는 시간이 지나면 낡는다(저장소가 link-check 워크플로를 두는 이유다).

이 페이지는 발견용 색인으로 쓴다. 특정 모델의 수치가 필요하면 이 목록을 근거로 인용하지 않고 해당 자료를 `raw/`로 따로 수집해 3-tier에 태운 뒤 그 페이지를 인용한다. 목록은 무엇이 있는지 알려줄 뿐, 그것이 얼마나 잘하는지는 검증하지 않는다. 이 wiki에 이미 들어와 있는 RT-1·RT-2·GR00T N1·SONIC 계열이 그렇게 색인의 한 좌표에서 실제 근거를 가진 페이지로 승격된 예다.

## 관련 페이지 (Related Pages)

- [[overviews/physical-ai-overview]] — 이 카테고리의 허브. 분류 기준·태그 어휘·학습 경로가 모여 있다. 이 목록은 그 허브가 앞으로 채울 자리를 밖에서 비춰 주는 지도다.
- [[physical-ai/brohan-2022-rt-1-robotics-transformer-for-real-world]] — 목록의 Robotics Foundation Models / Key Papers 축에 있는 RT-1. VLA 계보의 출발점.
- [[physical-ai/brohan-2023-rt-2-vision-language-action-models-transfer-web]] — 같은 축의 RT-2. 웹 지식을 로봇 제어로 전이한 VLA.
- [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation]] — 목록이 dual-system humanoid foundation model로 소개하는 GR00T N1의 1차 자료.
- [[physical-ai/luo-2025-sonic-supersizing-motion-tracking]] — Locomotion / whole-body control 축의 SONIC. 목록의 개별 좌표가 이 wiki에서 근거를 갖춘 사례.
- [[overviews/glossary-physical-ai]] — 이 페이지가 쓰는 policy·trajectory·world model 등의 canonical 표기 SSOT.
