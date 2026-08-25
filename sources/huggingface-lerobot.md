---
title: "LeRobot — State-of-the-art Machine Learning for Real-World Robotics in PyTorch"
type: repo
year: 2026
category: physical-ai
raw_path: /home/sguys99/project/ai-wiki/raw/repos/huggingface-lerobot.md
raw_filename: "huggingface-lerobot.md"
source_collection: external
org: "huggingface"
repo: "lerobot"
url: "https://github.com/huggingface/lerobot"
license: "Apache-2.0"
tags: [physical-ai, robot-learning, vla, robot-dataset]
figures:
  - id: fig01
    label: VLA architecture
    kind: figure
    file: assets/huggingface-lerobot/fig01.jpg
    raw: https://raw.githubusercontent.com/huggingface/lerobot/main/media/readme/VLA_architecture.jpg
    caption: "README의 SoTA Models 절에 실린 VLA 구조 도식 (img alt 텍스트는 \"Gr00t Architecture\")"
    strategy: manual
    curated: false
  - id: fig02
    label: robots control demo
    kind: figure
    file: assets/huggingface-lerobot/fig02.webp
    raw: https://raw.githubusercontent.com/huggingface/lerobot/main/media/readme/robots_control_video.webp
    caption: "Robots & Control 절의 Reachy 2 데모 (애니메이션 webp)"
    strategy: manual
    curated: false
  - id: fig03
    label: SO101 demo
    kind: figure
    file: assets/huggingface-lerobot/fig03.webp
    raw: https://raw.githubusercontent.com/huggingface/lerobot/main/media/readme/so100_video.webp
    caption: "문서 말미의 SO101 팔 데모 (애니메이션 webp)"
    strategy: manual
    curated: false
---

## 한 줄 요약 (One-line Summary)

Hugging Face가 PyTorch로 만든 로봇 학습 라이브러리. 하드웨어 차이를 감추는 `Robot` 인터페이스, Hub에 얹은 LeRobotDataset 포맷, imitation learning부터 VLA·world model까지 20여 종의 policy 구현, 학습·평가 CLI가 한 패키지에 들어 있다. `pip install lerobot` 한 줄로 시작한다.

## 1. 자료 정보 (Document Information)

- URL: https://github.com/huggingface/lerobot
- 조직: Hugging Face (LeRobot 팀)
- 라이선스: Apache-2.0
- 설치: `pip install lerobot` 후 `lerobot-info`로 환경 확인. PyPI 배포판이 정식 경로다
- 문서 사이트: https://huggingface.co/docs/lerobot/index — README는 입구 역할만 하고 설치·하드웨어·policy 세부는 전부 이쪽으로 넘긴다
- 인용: 저장소 자체는 `cadene2024lerobot` (2024). 학술 인용은 ICLR 2026 논문 "LeRobot: An Open-Source Library for End-to-End Robot Learning" (arXiv 2602.22818)
- 주 저자진: Remi Cadene, Simon Alibert, Francesco Capuano, Michel Aractingi, Adil Zouitine, Mustafa Shukor 외, Thomas Wolf
- 아카이브한 README 스냅샷: 2026-08-25 수집 (`raw.githubusercontent.com/huggingface/lerobot/main/README.md`)

## 2. 주요 기여 (Key Contributions)

저장소가 내건 목표는 진입 문턱을 낮추는 것이다. 데이터셋과 pretrained model을 공유해서 누구나 기여하고 그 결과를 다시 가져다 쓰게 하겠다는 것인데, `transformers`가 NLP에서 했던 역할을 로봇 쪽으로 옮긴 셈이다.

README가 스스로 드는 축은 넷이다. 하드웨어에 종속되지 않는 Python 인터페이스로 SO-100 같은 저가 팔부터 humanoid까지 같은 코드로 제어하고, Parquet과 MP4를 섞은 LeRobotDataset 형식으로 대규모 로봇 데이터를 저장·스트리밍·시각화하며, 실기기 전이가 확인된 policy들을 학습·배포 가능한 상태로 제공하고, 오픈소스 생태계를 지원해 physical AI를 대중화한다.

앞선 오픈소스 VLA 저장소들과 자리가 다르다. [[physical-ai/physical-intelligence-openpi]]는 π 계열 한 모델군의 공식 구현이고 GR00T-WholeBodyControl은 SONIC 논문의 실행 스택이다. LeRobot은 특정 모델의 레퍼런스 구현이 아니라 데이터 형식·하드웨어 추상화·policy 구현·평가를 한 자리에 모은 공용 프레임워크를 노린다. 그래서 π0·π0.5·GR00T N1.7·SmolVLA가 모두 이 안에 PyTorch 구현으로 들어와 있다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### Robot 인터페이스

제어 로직과 하드웨어 세부를 떼어놓는 `Robot` 클래스 하나로 통일한다. 연결한 뒤 observation을 읽고 action을 보내는 것이 전부다. observation은 매 timestep에 policy가 받는 센서 입력이고, action은 policy가 내놓는 제어 명령이다.

```python
from lerobot.robots.myrobot import MyRobot

robot = MyRobot(config=...)
robot.connect()

obs = robot.get_observation()
action = model.select_action(obs)
robot.send_action(action)
```

기본 지원 하드웨어는 SO100·LeKiwi·Koch·HopeJR·OMX·EarthRover·Reachy2·OpenARM·Unitree G1·reBot B601이고, teleoperation 장치로 게임패드·키보드·휴대폰이 붙는다. teleoperation은 사람이 로봇을 원격으로 움직여 시연을 만드는 방식이다. 목록에 없는 로봇도 이 인터페이스만 구현하면 데이터 수집·학습·시각화 도구를 그대로 쓴다.

### LeRobotDataset

로봇 데이터가 연구실마다 제각각인 문제를 형식 통일로 푼다. 영상은 MP4(또는 이미지 시퀀스), 상태와 action은 Parquet으로 두고 둘을 시간축으로 맞춘다. 데이터셋은 Hugging Face Hub에 올라가 있어 `repo_id`만 주면 받아 쓴다.

```python
from lerobot.datasets.lerobot_dataset import LeRobotDataset

dataset = LeRobotDataset("lerobot/aloha_mobile_cabinet")
episode_index = 0
print(f"{dataset[episode_index]['action'].shape=}")
```

인덱싱하면 영상 디코딩이 알아서 처리된다. episode 삭제, 인덱스나 비율로 분할, feature 추가·제거, 여러 데이터셋 병합 같은 편집 도구도 함께 온다. episode는 과제 시작부터 종료까지의 한 실행 단위다.

### policy 구현

순수 PyTorch로 쓰인 policy들이 다섯 갈래로 묶여 있다. policy는 현재 observation을 받아 다음 action을 정하는 함수를 말한다.

| 갈래 | 구현된 모델 |
|---|---|
| imitation learning | ACT, Diffusion, VQ-BeT, Multitask DiT Policy |
| 강화학습 | HIL-SERL, TDMPC (QC-FQL은 예정) |
| VLA | Pi0, Pi0Fast, Pi0.5, GR00T N1.7, SmolVLA, XVLA, EO-1, MolmoAct2, WALL-OSS, EVO1 |
| world model | VLA-JEPA, LingBot-VA, FastWAM |
| reward model | SARM, TOPReward, Robometer |

imitation learning은 시연 데이터를 흉내 내 policy를 학습하는 방법이고, world model은 환경의 동역학을 학습해 미래를 예측하는 모델이다. 학습은 policy 타입과 데이터셋만 지정하면 시작된다.

```bash
lerobot-train \
  --policy.type=act \
  --dataset.repo_id=lerobot/aloha_mobile_cabinet
```

policy도 하드웨어처럼 직접 구현해 끼워 넣을 수 있고, 만든 모델은 Hub에 올려 공유한다. policy별 GPU·RAM 요구사항과 예상 학습 시간은 별도 Compute Hardware Guide에 있다.

### 평가와 플러그인 생태계

`lerobot-eval` 하나로 시뮬레이션과 실기기 평가를 함께 다룬다. 표준 벤치마크로는 LIBERO와 MetaWorld가 들어와 있다.

```bash
lerobot-eval \
  --policy.path=lerobot/pi0_libero_finetuned \
  --env.type=libero \
  --env.task=libero_object \
  --eval.n_episodes=10
```

자체 시뮬레이션 환경이나 벤치마크를 만들어 Hub로 배포하는 통로가 EnvHub다.

서드파티 하드웨어는 패키지 이름으로 자동 발견된다. `lerobot_robot_`·`lerobot_teleoperator_`·`lerobot_camera_` 접두사가 붙은 패키지를 설치하면 LeRobot이 import하고, 그 패키지가 등록한 `type` 이름을 CLI에서 바로 쓴다. 커뮤니티가 UFACTORY xArm, Universal Robots UR5e, Franka, AgileX Piper, Trossen WidowX, ARX5, I2RT YAM, GELLO, SpaceMouse, Meta Quest, ROS 2 브리지, 촉각·깊이 카메라까지 붙여둔 상태다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

README에는 성능 수치가 없다. 벤치마크 표도, policy 간 비교도 싣지 않는다. 이 문서는 라이브러리 사용법과 지원 범위를 안내하는 성격이라 정량 근거는 ICLR 2026 논문(arXiv 2602.22818)과 각 policy의 원 논문에 있다.

측정 가능한 것으로 확인되는 사실은 지원 폭 정도다. 기본 하드웨어 13종, policy 20종, 표준 벤치마크 2종(LIBERO·MetaWorld), 그리고 Hub에 올라온 수천 개 규모의 로봇 데이터셋이다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

README만으로는 판단할 수 없는 것이 많다. policy들이 저장소 안에서 어느 수준으로 재현되는지, 원 논문 대비 성능 차가 있는지 문서 어디에도 적혀 있지 않다. "실기기 전이가 확인된 SoTA policy"라는 서술은 주장이고 근거는 링크 너머에 있다.

미완인 부분도 표시돼 있다. 강화학습 갈래의 QC-FQL은 예정 상태이고, 벤치마크는 LIBERO와 MetaWorld 둘뿐이며 "more to come"이라고만 적혀 있다.

플러그인 자동 발견 방식은 편한 만큼 위험도 안는다. 설치된 패키지 이름의 접두사만 보고 import하기 때문에 서드파티 코드의 품질과 안전성은 사용자 몫이다. 커뮤니티가 유지하는 목록이라는 점도 README가 분명히 해둔다.

## 6. 관련 연구 (Related Work)

데이터 형식 통일이라는 문제의식은 [[physical-ai/open-x-embodiment-2023-robotic-learning-datasets-and-rt-x]]와 겹친다. Open X-Embodiment는 60종 데이터셋을 한 형식으로 합쳐 cross-embodiment 학습을 가능하게 했고, LeRobotDataset은 그 통일을 데이터 수집 시점부터 강제하는 쪽이다.

policy 목록은 이 wiki가 개별 페이지로 다룬 모델들과 상당수 겹친다. ACT는 [[physical-ai/zhao-2023-learning-fine-grained-bimanual-manipulation]], π 계열은 [[physical-ai/black-2024-pi0-a-vision-language-action-flow-model]]과 [[physical-ai/black-2025-pi05-a-vision-language-action-model-with]], GR00T는 [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation]]이 원 자료다. SmolVLA는 LeRobot 팀 자신이 낸 모델인데 이 wiki에는 아직 PDF만 있고 페이지가 없다.

world model 갈래가 policy 목록에 별도 카테고리로 서 있다는 점은 [[physical-ai/reuss-2026-pretrained-to-imagine-fine-tuned]]가 정리한 world-action model 흐름과 이어진다. 예측 모델과 제어 policy를 한 프레임워크에서 같은 데이터로 다루려는 시도다.

## 7. 용어집 (Glossary)

- **LeRobotDataset**: 영상을 MP4, 상태·action을 Parquet으로 저장하고 시간축을 맞춘 이 저장소의 데이터 형식. Hugging Face Hub 호스팅을 전제로 설계됐다
- **EnvHub**: 자체 시뮬레이션 환경·벤치마크를 만들어 Hub로 배포하는 경로
- **LeLab**: CLI 없이 브라우저에서 teleoperation·캘리브레이션·데이터 수집·재생·학습을 하는 웹 인터페이스 (별도 저장소 `huggingface/leLab`)
- **HIL-SERL**: 사람이 개입하는 실기기 강화학습 방식. 저장소의 강화학습 갈래에 구현돼 있다
- **플러그인 접두사**: `lerobot_robot_`·`lerobot_teleoperator_`·`lerobot_camera_`. 설치된 패키지 이름이 이 접두사로 시작하면 LeRobot이 자동으로 import한다

## 8. 그림 후보 (Figure Candidates)

repo 유형이라 이미지를 자동으로 내려받지 않는다. 아래는 README 본문에 등장하는 이미지의 원본 URL이며, 필요한 것만 사용자가 `wiki/assets/huggingface-lerobot/`에 저장한다.

| id | 원본 | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | `media/readme/VLA_architecture.jpg` | VLA 구조 도식 (SoTA Models 절) | manual | ★ wiki 권장 (architecture) |
| fig02 | `media/readme/robots_control_video.webp` | Reachy 2 제어 데모 | manual | 애니메이션 webp — 정지 도식이 아니라 비권장 |
| fig03 | `media/readme/so100_video.webp` | SO101 팔 데모 | manual | 애니메이션 webp — 비권장 |

로고(`lerobot-logo-thumbnail.png`)는 장식이라 후보에서 제외했다.
