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

## 요약 (Summary)

Physical AI 분야의 논문과 리소스를 16개 최상위 섹션으로 큐레이션한 CC0 awesome-list다. Physical AI란 로봇 embodiment로 물리 세계를 인식·추론·조작하는 AI 시스템을 가리킨다. VLA(vision-language-action) 아키텍처와 world model이 두 중심축이다. 여기에 action 표현·embodied reasoning·학습 패러다임을 더한다. 데이터셋·시뮬레이터·기업·연구실 레퍼런스까지 붙여 분야 전체를 한 장으로 정리한다. RT-1·RT-2에서 출발한 VLA 계보가 이 분류의 가장 굵은 축이다.

## 자료 정보 (Document Information)

- **레포**: `keon/awesome-physical-ai` (GitHub awesome-list, CC0-1.0)
- **범위**: VLA 모델, world model, embodied AI, robotic foundation model
- **구조**: 16개 최상위 섹션, 대부분 하위 서브섹션으로 다시 갈린다. 항목마다 논문 제목·발표처·연도에 Paper/Project/Code/Blog 링크가 붙고 주요 논문에는 한 줄 해설이나 `TL;DR` 요약이 달린다
- **시점**: 2026년 초까지의 최신 arXiv preprint와 ICLR 2026 submission을 다수 담은 리빙 도큐먼트다

## 주요 기여 (Key Contributions)

RT-1·RT-2로 시작된 VLA 계보부터 world model, discrete diffusion action decoding, real-time control까지 Physical AI 전 영역을 한 좌표계에 배열한다. "각 논문은 하나의 카테고리에만 넣는다"는 규칙이 method 기준 분류를 강제한다.

조직 원리는 소재가 아니라 방법이다. VLA를 End-to-End · Modular · Compact & Efficient로 가르고 action 표현을 Discrete Tokenization · Discrete Diffusion · Continuous & Diffusion Policies로 나눈다. 미래에 어느 카테고리에서 찾을지를 기준으로 삼은 분류다.

아직 출판 전인 흐름까지 앞서 정리한다는 점도 눈에 띈다. ICLR 2026 submission 다수(FASTer·OmniSAT·dVLA·DIVA 등)를 `TL;DR`과 함께 등재해 action tokenizer·discrete diffusion 연구의 최전선을 담는다.

논문 밖 리소스도 빠뜨리지 않는다. Open X-Embodiment·DROID·LIBERO·CALVIN·SIMPLER 등 데이터셋·벤치마크 30여 종과 ManiSkill3·Genesis·Isaac Lab·MuJoCo Playground 등 시뮬레이터를 표로 정리하고 Physical Intelligence·Google DeepMind·NVIDIA·Figure·1X·Unitree 같은 기업의 초점·대표 제품과 Stanford·Berkeley·CMU 연구실의 기여까지 표로 연결한다.

## 방법론 및 아키텍처 (Methodology and Architecture)

리스트는 16개 최상위 섹션으로 이뤄진다.

- **Foundations** — VLA의 인식 backbone이 되는 vision-language 모델(CLIP·SigLIP·PaLI-X·LLaVA·Prismatic VLMs)과 self-supervised 시각 인코더(DINOv2·SAM·R3M·MVP).
- **VLA Architectures** — vision·language·action을 한 아키텍처로 다루는 End-to-End(RT-1·RT-2·OpenVLA·PaLM-E·π0.5·GR-3), 인지(VLM 계획)와 action(전용 모터 모듈)을 분리한 Modular(CogACT·Gemini Robotics·SayCan·Code as Policies), 엣지 배포용 경량 Compact & Efficient(TinyVLA·SmolVLA·BitVLA·NORA).
- **Action Representation** — 연속 관절 움직임을 이산 action token으로 바꾸는 Discrete Tokenization(FAST·ACT·GR-1/2), autoregressive 대신 병렬로 생성하는 Discrete Diffusion VLA, flow matching·diffusion으로 연속 trajectory를 내는 Continuous & Diffusion Policies(π0·Octo·Diffusion Policy·RDT-1B).
- **World Models** — 픽셀 대신 미래 latent를 예측하는 JEPA 계열(I-JEPA·V-JEPA·V-JEPA 2), 픽셀·비디오·상호작용 환경을 생성하는 Generative(World Models·DreamerV3·Genie·Sora·Cosmos), 조작·내비게이션용 Embodied World Models. world model은 환경의 dynamics를 학습해 미래를 예측하는 모델이다.
- **Reasoning & Planning** — action 전에 명시적 추론을 두는 Chain-of-Thought & Deliberation(Embodied-CoT·ReAct·Cosmos-Reason1)과, 실패를 감지·복구하는 Error Detection & Recovery(DoReMi·Code-as-Monitor·AHA).
- **Learning Paradigms** — 시연을 흉내 내는 Imitation Learning(CLIPort·MimicPlay·Phantom), policy를 RL로 최적화하는 Reinforcement Learning(VLA-RL·SimpleVLA-RL·ConRFT), 언어 모델로 reward를 자동 생성하는 Reward Design(Text2Reward). imitation learning은 시연 데이터를 흉내 내 policy를 학습하는 방법이다.
- **Scaling & Generalization** — Scaling Laws, 한 policy로 여러 로봇을 제어하는 Cross-Embodiment Transfer(RT-X·Crossformer·X-VLA), 새 시각·의미 개념으로 넓히는 Open-Vocabulary Generalization(VoxPoser·VLMaps).
- **Deployment** — 저비트 양자화로 엣지에 올리는 Quantization & Compression(BitVLA·DeeR-VLA), 고지연 추론과 저지연 제어를 잇는 Real-Time Control.
- **Safety & Alignment** — Robot Constitution, ASIMOV 안전 벤치마크, RoboPAIR jailbreak, 로봇이 편향을 상속한다는 연구.
- **Lifelong Learning** — 이전 스킬을 잊지 않고 이어 학습하는 agent(Voyager·RoboCat·LOTUS).
- **Applications** — Humanoid Robots(GR00T N1·HumanPlus·ExBody), Manipulation, Navigation(LM-Nav·NaVILA·다수 VLN). Navigation 서브섹션이 가장 방대하다.
- **Sim-to-Real Transfer** — 시뮬레이션 학습 policy를 실기기로 옮기는 방법(RE3SIM·Real2Render2Real). sim2real은 시뮬레이션에서 학습한 policy를 실기기로 옮기는 문제다.
- **Surveys / Resources / Companies & Projects / Related Works** — 서베이 40여 편, 데이터셋·시뮬레이터 표, 기업·연구실 표, 인접 awesome-list 링크.

## 결과 (Results)

리스트가 해설에서 밝힌 대표 수치와 주장은 이렇다. OpenVLA는 오픈소스 7B 모델로 55B RT-2-X를 앞서며 VLA 연구를 대중화했다. RT-2는 VLM을 로봇 데이터로 co-fine-tuning해 VLA 패러다임을 세웠다. SmolVLA는 450M 파라미터로 10배 큰 모델에 맞먹고 FAST는 frequency-space(DCT) tokenization으로 action 시퀀스를 7배 압축한다. π0는 flow matching으로 50Hz 연속 action을 생성해 dexterous 과제를 다루며 Consistency Policy는 diffusion policy를 단일 스텝으로 distill해 추론을 10배 당긴다. GENBOT-1K는 약 1,000개 로봇 body로 학습해 미지 로봇으로 zero-shot 전이한다.

Resources 표의 대표 데이터셋·벤치마크는 Open X-Embodiment(100만+ trajectory, 22개 로봇), DROID(76K trajectory, 564 장면), LIBERO(130 과제), CALVIN(long-horizon 언어 조건), SIMPLER(sim-to-real policy 평가)다. 시뮬레이터로는 ManiSkill3·Genesis·Isaac Lab·MuJoCo Playground·OmniGibson·Habitat 2.0·BEHAVIOR-1K가 올라 있다.

## 한계 (Limitations)

awesome-list는 논문 제목·링크·짧은 해설의 인덱스여서 방법 자체의 상세나 정량 비교표는 없다. 깊이는 원논문을 다시 읽어야 나온다. preprint 특성상 arxiv id가 `XXXXX` 플레이스홀더로 남은 항목이 여럿이고 ICLR 2026 submission은 익명·미출판 상태라 인용 전 링크 유효성과 출판 여부를 재확인해야 한다. 2026년 초 스냅샷이라 이후 후속 연구는 원본 GitHub에서 갱신을 봐야 하고 manipulation·navigation·VLA 쪽이 두터운 반면 hardware·control theory 같은 영역은 상대적으로 얇다.

## 관련 페이지 (Related Pages)

- [[overviews/physical-ai-overview]] — physical-ai 카테고리의 분류 뼈대·태그 어휘·학습 경로 허브. 이 awesome-list는 그 분류를 외부에서 교차 검증하는 지도로 쓸 수 있다
- [[physical-ai/brohan-2022-rt-1-robotics-transformer-for-real-world]] — 리스트가 VLA 계보의 출발점으로 잡는 RT-1 원논문
- [[physical-ai/brohan-2023-rt-2-vision-language-action-models-transfer-web]] — VLA 범주를 세운 RT-2 원논문
- [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation]] — Applications/Humanoid 섹션의 GR00T N1 원논문
- [[physical-ai/hou-2026-world-model-for-robot-learning]] — World Models 섹션과 겹치는 world model 서베이
- [[overviews/glossary-physical-ai]] — policy·world model·sim2real 등 이 페이지가 따르는 용어 canonical 표기
