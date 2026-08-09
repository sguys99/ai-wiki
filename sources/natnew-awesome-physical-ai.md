---
title: "Awesome Physical AI: A Comprehensive Resource Map"
type: repo
year: 2026
category: physical-ai
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

## 한 줄 요약 (One-line Summary)

Physical AI 전 영역을 엔지니어 관점으로 훑는 큐레이션 링크 맵. simulator·dataset·benchmark·robotics foundation model·world model·manipulation·locomotion·sim2real부터 안전·거버넌스·프로덕션 미들웨어까지 14개 정본 카테고리로 자료를 묶고 시뮬레이션에서 시작해 실기로 넘어가는 초심자 학습 경로를 앞세운다.

## 1. 자료 정보 (Document Information)

- URL: https://github.com/natnew/awesome-physical-ai
- 라이선스: MIT (LICENSE 파일 기준, Copyright 2026 Natasha)
- 유형: awesome-list (curated resource index). 원저작이 아니라 외부 자료로 가는 링크 모음이다.
- 라이브 문서 사이트: https://natnew.github.io/awesome-physical-ai/
- 아카이브한 README 스냅샷: 2026-08-09 수집 (`raw.githubusercontent.com/natnew/awesome-physical-ai/main/README.md`)

이 저장소는 논문이나 코드 프로젝트가 아니라 자료 지도다. 그래서 아래 항목들은 "이 문서가 무엇을 주장하는가"가 아니라 "이 문서가 어떤 자료를 어떤 뼈대로 모아 두었는가"를 정리한다.

## 2. 주요 기여 (Key Contributions)

값은 두 가지다. 하나는 분류 뼈대다. Physical AI라는 넓은 영역을 14개 정본 카테고리와 여러 부록으로 갈라 두고 흩어진 도구·데이터·논문·회사를 발견 가능한 자리에 앉혀 둔다. 다른 하나는 진입로다. 하드웨어 없이 시뮬레이션부터 시작하라는 원칙 아래, Gymnasium CartPole로 강화학습 루프를 익히고 MuJoCo로 물리 모델링을, LeRobot으로 실제 robot learning 워크플로를, OpenVLA로 vision-language-action 통합을 순서대로 보게 안내한다.

목록 규모를 저자가 직접 세어 둔 것으로는 simulator 17종, dataset 15종, benchmark 15종, robotics foundation model 14종, 그리고 주요 논문 80편+, 교재·코스 30종+이 있다. 여기에 회사 14곳+, 하드웨어 플랫폼, 거버넌스 프레임워크(NIST AI RMF·EU AI Act 등), 커뮤니티 포인터가 부록으로 붙는다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

문서의 "아키텍처"는 곧 분류 체계다. 정본 카테고리 14개는 자료의 성격을 따라 배열된다.

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

부록은 정본 분류를 보완한다. Books(Probabilistic Robotics·Modern Robotics 등), Tutorials & Guides, Key Papers, Survey Papers, Hardware Platforms(팔·humanoid·mobile·저가 DIY로 다시 세분), Conferences(CoRL·RSS·ICRA·IROS), Community, Newsletters & Blogs, People to Follow, Related Awesome Lists가 이어진다.

학습 경로는 두 층으로 제시된다. 빠른 시작 경로는 앞서 적은 CartPole → MuJoCo → LeRobot → OpenVLA 5단계다. 그 위에 관심사별 루트(Foundations / Robot Learning / Foundation Models / Evaluation & Safety / Hardware)를 얹어 목적에 따라 갈라 들어가게 한다. "하드웨어 없이 시작해도 된다, 시뮬레이션 먼저"라는 문구가 전체 편집 방침을 요약한다.

각 항목에는 HTML 주석 형태의 태그(`simulator, open-source, production-ready` 등)가 붙어 있어 라이브 사이트 빌드가 필터·분류에 쓸 수 있게 되어 있다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

awesome-list라 자체 실험 결과는 없다. 대신 목록이 강조하는 규모 지표 몇 개를 보면 이 영역이 지금 어디쯤 와 있는지 알 수 있다.

- Open X-Embodiment — 22개 embodiment에 걸친 1M+ trajectory. 사실상의 cross-embodiment 학습 코퍼스다.
- DROID — 13개 기관이 협력해 모은 야외(in-the-wild) manipulation 데이터셋.
- RoboMIND — 310K+ trajectory의 bimanual mobile manipulation 데이터셋.

foundation model 축에서는 OpenVLA가 7B 파라미터 오픈 VLA, GR00T N1이 slow/fast dual-system humanoid foundation model로 소개된다. world model 축에서는 V-JEPA 2가 1M+ 시간 영상으로 학습해 zero-shot 로봇 계획을 겨냥한 자기지도 모델로 꼽힌다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

큐레이션 목록의 본질적 한계가 그대로 적용된다. 항목은 링크와 한 줄 설명뿐이라 깊이는 각 원본으로 넘긴다. 포함 여부와 배치는 저자의 편집 판단이고 활발한 영역이라 링크는 시간이 지나면 낡는다(저장소가 link-check 워크플로를 두는 이유다). 한국어 wiki에 옮길 때는 이 목록을 발견용 색인으로 쓰고 실제 근거가 필요하면 개별 자료를 `raw/`로 따로 수집해 3-tier에 태우는 편이 맞는다. 이 목록 자체를 근거로 특정 모델의 수치를 인용해서는 안 된다 — 목록은 "무엇이 있는지"를 알려줄 뿐 "그것이 얼마나 잘하는지"를 검증하지 않는다.

## 6. 관련 연구 (Related Work)

저장소 말미의 Related Awesome Lists가 인접 색인을 가리킨다. Awesome LLM Robotics(로보틱스의 LLM/VLM 응용), Awesome Robotics, Awesome Robotics 3D(3D 비전), Awesome Embodied Agent, Awesome World Models, Awesome Deep RL, Awesome Imitation Learning 등이다. 같은 저자(natnew)의 인접 목록으로 Awesome Agentic Engineering·Awesome Agentic AI Security·Awesome AI Scientists도 링크된다.

이 wiki 내부에서는 physical-ai 카테고리에 이미 들어와 있는 1차 자료들이 이 지도의 개별 좌표에 해당한다 — RT-1·RT-2(VLA 계보의 출발점), GR00T N1(dual-system VLA), SONIC 계열(whole-body control), world model 서베이 2종, VLA bimanual 서베이가 그것이다.

## 7. 용어집 (Glossary)

이 자료 고유의 용어는 거의 없다(외부 프로젝트명 모음이라 대부분 고유명사다). 도메인 공통 용어는 [[overviews/glossary-physical-ai]]·[[overviews/glossary-llms]]에 위임한다.

- awesome-list — GitHub 관행으로, 특정 주제의 우수 자료를 한 줄 설명과 함께 큐레이션한 링크 색인. `awesome.re` 배지가 그 관행을 표시한다.
- 정본 카테고리(canonical categories) — 이 저장소가 자료를 배치하는 14개 상위 분류. 부록(appendices)과 구분된다.
