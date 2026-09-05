---
title: "Awesome Physical AI"
type: repo
year: 2026
category: physical-ai
raw_path: raw/repos/keon-awesome-physical-ai.md
raw_filename: "keon-awesome-physical-ai.md"
source_collection: external
org: "keon"
repo: "awesome-physical-ai"
url: "https://github.com/keon/awesome-physical-ai"
license: "CC0-1.0"
tags: [physical-ai, vla, world-model, robot-learning]
---

## 한 줄 요약 (One-line Summary)

Physical AI, 곧 로봇 embodiment로 물리 세계를 인식하고 추론하며 조작하는 AI 분야의 논문과 리소스를 16개 최상위 섹션으로 큐레이션한 CC0 awesome-list. VLA(vision-language-action) 아키텍처, world model, action 표현, embodied reasoning, 학습 패러다임을 중심 항목으로 삼고 데이터셋, 시뮬레이터, 기업, 연구실 레퍼런스까지 붙인 분야 지도다.

## 1. 자료 정보 (Document Information)

- **레포**: `keon/awesome-physical-ai` (GitHub awesome-list, CC0-1.0)
- **핵심 주제**: Physical AI, 곧 인식과 추론과 action을 실세계 로봇으로 결합하는 AI 시스템
- **범위**: VLA 모델, world model, embodied AI, robotic foundation model에 초점
- **구조**: 16개 최상위 섹션, 다수는 하위 서브섹션으로 다시 나뉜다. 각 항목은 논문 제목, 발표처, 연도에 Paper/Project/Code/Blog 링크가 붙고 주요 논문에는 한 줄 해설 또는 `TL;DR` 요약이 달린다
- **시점 특성**: 2026년 초까지의 최신 arXiv preprint와 ICLR 2026 submission이 다수 포함돼 있다. 확정 출판물이 아닌 진행 중 연구까지 담은 리빙 도큐먼트다
- **저자**: Keon Kim

## 2. 주요 기여 (Key Contributions)

1. **분야 지도 제공**: RT-1과 RT-2로 시작된 VLA 계보부터 world model, discrete diffusion action decoding, real-time control까지 Physical AI 전 영역을 한 좌표계에 배열한다. "각 논문은 하나의 카테고리에만 넣는다"는 규칙으로 method 기준 분류를 강제한다.
2. **method 기준 taxonomy**: VLA를 End-to-End, Modular, Compact & Efficient 세 가지로, action 표현을 Discrete Tokenization, Discrete Diffusion, Continuous & Diffusion Policies로 나누는 등, 소재가 아니라 방법으로 자료를 조직한다. 미래 검색성을 위한 분류다.
3. **진행 중 연구 흡수**: ICLR 2026 submission 다수(FASTer, OmniSAT, dVLA, DIVA 등)를 `TL;DR`과 함께 등재해, 아직 출판 전인 action tokenizer와 discrete diffusion 흐름을 앞서 정리한다.
4. **리소스 레이어**: 논문뿐 아니라 Open X-Embodiment, DROID, LIBERO, CALVIN, SIMPLER 등 데이터셋과 벤치마크 30여 종과 ManiSkill3, Genesis, Isaac Lab, MuJoCo Playground 등 시뮬레이터를 표로 정리한다.
5. **산업 지형도**: Physical Intelligence, Google DeepMind, NVIDIA, Figure, 1X, Unitree 등 기업의 초점과 대표 제품, 그리고 Stanford, Berkeley, CMU 등 연구실의 기여를 표로 붙여, 논문 밖 생태계까지 연결한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

리스트의 골격은 16개 최상위 섹션이다.

- **Foundations**: VLA의 인식 backbone이 되는 vision-language 모델(CLIP, SigLIP, PaLI-X, LLaVA, Prismatic VLMs)과 self-supervised 시각 인코더(DINOv2, SAM, R3M, MVP).
- **VLA Architectures**: vision, language, action을 한 아키텍처로 다루는 End-to-End(RT-1, RT-2, OpenVLA, PaLM-E, π0.5, GR-3), 인지(VLM 계획)와 action(전용 모터 모듈)을 분리한 Modular(CogACT, Gemini Robotics, SayCan, Code as Policies), 엣지 배포용 경량 Compact & Efficient(TinyVLA, SmolVLA, BitVLA, NORA).
- **Action Representation**: 연속 관절 움직임을 이산 action token으로 바꾸는 Discrete Tokenization(FAST, ACT, GR-1/2), autoregressive 대신 병렬 생성하는 Discrete Diffusion VLA, flow matching이나 diffusion으로 연속 trajectory를 내는 Continuous & Diffusion Policies(π0, Octo, Diffusion Policy, RDT-1B).
- **World Models**: 픽셀 대신 미래 latent를 예측하는 JEPA 계열(I-JEPA, V-JEPA, V-JEPA 2), 픽셀과 비디오와 상호작용 환경을 생성하는 Generative(World Models, DreamerV3, Genie, Sora, Cosmos), 조작과 내비게이션용 Embodied World Models. world model은 환경의 dynamics를 학습해 미래를 예측하는 모델을 말한다.
- **Reasoning & Planning**: action 전에 명시적 추론을 두는 Chain-of-Thought & Deliberation(Embodied-CoT, ReAct, Cosmos-Reason1), 실패를 감지하고 복구하는 Error Detection & Recovery(DoReMi, Code-as-Monitor, AHA).
- **Learning Paradigms**: 시연을 흉내 내는 Imitation Learning(CLIPort, MimicPlay, Phantom), policy를 RL로 최적화하는 Reinforcement Learning(VLA-RL, SimpleVLA-RL, ConRFT), 언어 모델로 reward를 자동 생성하는 Reward Design(Text2Reward). imitation learning은 시연 데이터를 흉내 내 policy를 학습하는 방법이다.
- **Scaling & Generalization**: 모델과 데이터 규모와 성능의 관계를 다루는 Scaling Laws, 한 policy로 다양한 로봇을 제어하는 Cross-Embodiment Transfer(RT-X, Crossformer, X-VLA), 새 시각 개념과 의미 개념으로 일반화하는 Open-Vocabulary Generalization(VoxPoser, VLMaps).
- **Deployment**: 저비트 양자화로 엣지에 올리는 Quantization & Compression(BitVLA, DeeR-VLA), 고지연 추론과 저지연 제어를 잇는 Real-Time Control(RTC).
- **Safety & Alignment**: Robot Constitution, ASIMOV 안전 벤치마크, RoboPAIR jailbreak, 로봇이 편향을 상속한다는 연구.
- **Lifelong Learning**: 이전 스킬을 잊지 않고 계속 학습하는 agent(Voyager, RoboCat, LOTUS).
- **Applications**: Humanoid Robots(GR00T N1, HumanPlus, ExBody), Manipulation, Navigation(LM-Nav, NaVILA, 다수 VLN). Navigation 서브섹션이 가장 방대하다.
- **Sim-to-Real Transfer**: 시뮬레이션 학습 policy를 실제 기기로 옮기는 방법(RE3SIM, Real2Render2Real). sim2real은 시뮬레이션에서 학습한 policy를 실제 기기로 옮기는 문제다.
- **Surveys**: VLA, world model, embodied AI 서베이 40여 편.
- **Resources**: Datasets & Benchmarks 표, Simulation Platforms 표.
- **Companies & Projects**: 기업과 연구실 표.
- **Related Works**: 인접 awesome-list 링크.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

리스트가 항목 해설에서 짚는 대표 수치와 주장:

- OpenVLA: 오픈소스 7B 모델이 55B RT-2-X를 앞서며 VLA 연구를 대중화했다.
- RT-2: VLM을 로봇 데이터로 co-fine-tuning해 VLA 패러다임을 정립했다.
- SmolVLA: 450M 파라미터로 10배 큰 모델과 비슷한 성능을 낸다.
- FAST: frequency-space(DCT) tokenization으로 action 시퀀스를 7배 압축한다.
- π0: flow matching으로 50Hz 고빈도 연속 action을 생성해 dexterous 과제를 다룬다.
- Consistency Policy: diffusion policy를 단일 스텝으로 distill해 추론을 10배 빠르게 한다.
- GENBOT-1K: 약 1,000개 로봇 body로 학습해 미지 로봇으로 zero-shot 전이한다.

대표 데이터셋과 벤치마크(Resources 표): Open X-Embodiment(100만 개 이상 trajectory, 22개 로봇), DROID(7만 6천 개 trajectory, 564개 장면), LIBERO(130개 과제, lifelong), CALVIN(long-horizon, 언어 조건), SIMPLER(sim-to-real policy 평가), RoboCasa, RLBench, ALFRED, RoboTwin. 시뮬레이터: ManiSkill3, Genesis, Isaac Lab/Isaac Sim, MuJoCo Playground, OmniGibson, Habitat 2.0, BEHAVIOR-1K.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **awesome-list의 본질적 한계**: 논문 제목과 링크와 짧은 해설로 이뤄진 인덱스일 뿐, 방법 자체의 상세나 정량 비교표는 없다. 각 항목의 깊이는 원논문을 다시 읽어야 확보된다.
- **미확정 참조**: preprint 특성상 arxiv id가 `XXXXX` 플레이스홀더로 남은 항목이 다수 있고(예: Helix, OpenVLA-OFT, 여러 RL 항목), ICLR 2026 submission은 익명이자 미출판 상태다. 링크 유효성과 출판 여부는 인용할 때 다시 확인해야 한다.
- **빠른 노후화**: 2026년 초 시점의 스냅샷이라, 이후 등장하는 후속 연구는 원본 GitHub에서 갱신을 확인해야 한다.
- **커버리지 편향**: manipulation, navigation, VLA 쪽이 두텁고 다른 physical AI 영역(예: 세밀한 hardware나 control theory)은 상대적으로 얇다.

## 6. 관련 연구 (Related Work)

리스트가 링크하는 인접 awesome-list: Awesome World Models, Awesome-VLA-Robotics, Awesome-VLA-RL, Awesome-Robotics-Foundation-Models, Awesome-LLM-Robotics, Awesome-Generalist-Agents, Awesome-VLA-Post-Training. 이 wiki 내부로는 개별 항목이 RT-1, RT-2, GR00T N1, world model 서베이 등 이미 보유한 physical-ai 페이지와 직접 대응한다.

## 7. 용어집 (Glossary)

이 자료 고유의 분류 용어만 정리한다. 도메인 공통 용어(policy, reward, trajectory, world model, imitation learning, sim2real 등)는 [[overviews/glossary-physical-ai]]를 따른다.

- **Physical AI**: 로봇 embodiment로 물리 세계를 인식하고 추론하며 조작하는 AI 시스템. 이 리스트가 다루는 상위 범주.
- **End-to-End VLA**: vision, language, action을 단일 아키텍처의 통합 토큰으로 다루는 monolithic 모델 계열(RT-2, OpenVLA).
- **Modular VLA**: 고수준 인지(VLM 기반 계획)와 저수준 action(전용 모터 모듈)을 분리한 계열(CogACT).
- **Discrete Diffusion VLA**: autoregressive 디코딩 대신 discrete diffusion으로 action token을 병렬 생성하는 방식.
- **Cross-Embodiment Transfer**: 하나의 policy로 형상이 다른 여러 로봇을 제어하는 문제.
