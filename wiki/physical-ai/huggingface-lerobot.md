---
title: "LeRobot — State-of-the-art Machine Learning for Real-World Robotics in PyTorch"
type: repo
year: 2026
category: physical-ai
source: huggingface-lerobot.md
raw_path: raw/repos/huggingface-lerobot.md
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

## 요약 (Summary)

Hugging Face가 PyTorch로 만든 로봇 학습 라이브러리. 라이선스는 Apache-2.0이고 `pip install lerobot`로 설치한다. 하드웨어 차이를 감추는 `Robot` 인터페이스, Hub에 올라가는 LeRobotDataset 형식, imitation learning부터 VLA·world model까지 20여 종의 policy 구현, 그리고 학습·평가 CLI가 한 패키지 안에 있다.

`transformers`가 NLP에서 한 일을 로봇 쪽으로 옮긴 저장소로 읽으면 자리가 잡힌다. 특정 모델의 레퍼런스 구현이 아니라 여러 모델이 얹히는 바닥이다.

## 구성 요소 (Components)

### Robot 인터페이스

제어 로직과 하드웨어 세부를 분리한다. 연결하고, observation을 읽고, action을 보내는 세 줄이 전부다. observation은 매 timestep에 policy가 받는 센서 입력이고 action은 policy가 내놓는 제어 명령이다.

```python
from lerobot.robots.myrobot import MyRobot

robot = MyRobot(config=...)
robot.connect()

obs = robot.get_observation()
action = model.select_action(obs)
robot.send_action(action)
```

기본 지원 하드웨어는 SO100·LeKiwi·Koch·HopeJR·OMX·EarthRover·Reachy2·OpenARM·Unitree G1·reBot B601이다. 저가 팔부터 humanoid까지 같은 코드로 다룬다는 뜻이다. teleoperation 장치로는 게임패드·키보드·휴대폰이 붙는다. teleoperation은 사람이 로봇을 원격으로 움직여 시연을 만드는 방식이다.

목록에 없는 로봇도 이 인터페이스만 구현하면 데이터 수집·학습·시각화 도구를 그대로 쓴다.

### LeRobotDataset

연구실마다 데이터 형식이 달라 재사용이 안 되는 문제를 형식 통일로 푼다. 영상은 MP4(또는 이미지), 상태와 action은 Parquet에 넣고 시간축을 맞춘다. 데이터셋은 Hugging Face Hub에 호스팅되어 `repo_id`만 주면 받아 쓴다.

```python
from lerobot.datasets.lerobot_dataset import LeRobotDataset

dataset = LeRobotDataset("lerobot/aloha_mobile_cabinet")
episode_index = 0
print(f"{dataset[episode_index]['action'].shape=}")
```

인덱싱할 때 영상 디코딩은 알아서 처리된다. episode 삭제, 인덱스·비율 분할, feature 추가·제거, 데이터셋 병합 도구도 함께 온다. episode는 과제 시작부터 종료까지의 한 실행 단위다.

### policy 구현

순수 PyTorch로 쓰인 policy가 다섯 갈래로 묶여 있다. policy는 현재 observation을 받아 다음 action을 정하는 함수를 말한다.

| 갈래 | 구현된 모델 |
|---|---|
| imitation learning | ACT, Diffusion, VQ-BeT, Multitask DiT Policy |
| 강화학습 | HIL-SERL, TDMPC (QC-FQL 예정) |
| VLA | Pi0, Pi0Fast, Pi0.5, GR00T N1.7, SmolVLA, XVLA, EO-1, MolmoAct2, WALL-OSS, EVO1 |
| world model | VLA-JEPA, LingBot-VA, FastWAM |
| reward model | SARM, TOPReward, Robometer |

imitation learning은 시연 데이터를 흉내 내 policy를 학습하는 방법이고 world model은 환경의 동역학을 학습해 미래를 예측하는 모델이다. policy 갈래에 world model과 reward model이 나란히 서 있다는 점이 이 저장소의 최근 성격을 보여준다.

## 쓰는 법 (Usage)

### 학습

policy 타입과 데이터셋만 주면 된다.

```bash
lerobot-train \
  --policy.type=act \
  --dataset.repo_id=lerobot/aloha_mobile_cabinet
```

policy도 하드웨어처럼 직접 구현해 끼울 수 있고, 학습한 모델은 Hub에 올려 공유한다. policy별 GPU·RAM 요구사항과 예상 학습 시간은 저장소가 아니라 Compute Hardware Guide 문서에 있다.

### 평가

시뮬레이션과 실기기 평가를 한 스크립트로 다룬다. 표준 벤치마크는 LIBERO와 MetaWorld가 들어와 있다.

```bash
lerobot-eval \
  --policy.path=lerobot/pi0_libero_finetuned \
  --env.type=libero \
  --env.task=libero_object \
  --eval.n_episodes=10
```

자체 환경이나 벤치마크를 만들어 Hub로 배포하는 통로가 EnvHub다.

### 서드파티 하드웨어

패키지 이름으로 자동 발견한다. `lerobot_robot_`·`lerobot_teleoperator_`·`lerobot_camera_` 접두사가 붙은 패키지를 설치하면 LeRobot이 import하고, 그 패키지가 등록한 `type`을 CLI에서 곧바로 쓴다.

```bash
pip install lerobot_robot_<name> lerobot_teleoperator_<name>

lerobot-record \
  --robot.type=<robot_name> \
  --teleop.type=<teleoperator_name> \
  --dataset.repo_id=${HF_USER}/my-dataset
```

커뮤니티가 UFACTORY xArm, UR5e, Franka, AgileX Piper, Trossen WidowX, ARX5, I2RT YAM, GELLO, SpaceMouse, Meta Quest, ROS 2 브리지, 촉각·깊이 카메라까지 붙여둔 상태다.

## 한계 (Limitations)

README에 성능 수치가 하나도 없다. policy들이 저장소 안에서 원 논문 대비 어느 수준으로 재현되는지 이 문서로는 알 수 없다. "실기기 전이가 확인된 SoTA policy"는 주장이고 근거는 ICLR 2026 논문(arXiv 2602.22818)과 각 모델의 원 논문에 있다.

미완인 자리도 있다. 강화학습 갈래의 QC-FQL은 예정 상태이고 벤치마크는 LIBERO·MetaWorld 둘뿐이다.

플러그인 자동 발견은 편한 만큼 위험도 안는다. 설치된 패키지 이름의 접두사만 보고 import하므로 서드파티 코드의 품질과 안전성은 사용자 책임이다.

## 이 저장소 안에서의 위치 (Position in This Wiki)

이 wiki가 개별 페이지로 다룬 모델 상당수가 LeRobot 안에 PyTorch 구현으로 들어와 있다. ACT는 [[physical-ai/zhao-2023-learning-fine-grained-bimanual-manipulation|ALOHA 논문]], π 계열은 [[physical-ai/black-2024-pi0-a-vision-language-action-flow-model|π0]]와 [[physical-ai/black-2025-pi05-a-vision-language-action-model-with|π0.5]], GR00T N1.7은 [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation|GR00T N1]]이 원 자료다. 논문을 읽은 다음 코드를 만지려 할 때 첫 착지점이 되는 페이지다.

[[physical-ai/physical-intelligence-openpi|openpi]]와 비교하면 성격 차이가 뚜렷하다. openpi는 π 계열 한 모델군의 공식 구현이고 base checkpoint 배포가 핵심이다. LeRobot은 모델을 소유하지 않고 여러 모델이 얹히는 공용 바닥을 지향한다. 같은 π0.5를 두 저장소가 각각 구현하고 있다는 뜻이기도 해서, 재현 차이를 확인하려면 둘을 함께 봐야 한다.

데이터 쪽 문제의식은 [[physical-ai/open-x-embodiment-2023-robotic-learning-datasets-and-rt-x|Open X-Embodiment]]와 겹친다. 그쪽은 흩어진 데이터셋 60종을 사후에 한 형식으로 합쳤고, LeRobotDataset은 수집 시점부터 형식을 강제한다. policy 목록에 world model이 별도 갈래로 서 있는 것은 [[physical-ai/reuss-2026-pretrained-to-imagine-fine-tuned|world-action model]] 흐름과 이어진다.

SmolVLA는 LeRobot 팀 자신이 낸 VLA인데 이 wiki에는 아직 `raw/papers/`에 PDF만 있고 페이지가 없다.

## 관련 페이지 (Related Pages)

- [[physical-ai/physical-intelligence-openpi]] — π 계열 공식 구현. 모델 소유 저장소와 공용 프레임워크의 대비
- [[physical-ai/zhao-2023-learning-fine-grained-bimanual-manipulation]] — 기본 학습 예제로 쓰이는 ACT의 원 논문
- [[physical-ai/black-2024-pi0-a-vision-language-action-flow-model]] — VLA 갈래에 구현된 Pi0의 원 논문
- [[physical-ai/black-2025-pi05-a-vision-language-action-model-with]] — 같은 갈래 Pi0.5의 원 논문
- [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation]] — GR00T N1.7의 앞 세대 foundation model
- [[physical-ai/open-x-embodiment-2023-robotic-learning-datasets-and-rt-x]] — 로봇 데이터 형식 통일의 선행 사례
- [[physical-ai/reuss-2026-pretrained-to-imagine-fine-tuned]] — world model 갈래가 놓인 흐름
- [[physical-ai/learnopencv-2025-vision-language-action-models-vla]] — 이 프레임워크를 실제로 굴려 보는 튜토리얼. 저장소 clone부터 `lerobot/pi0` 체크포인트로 pusht·aloha 평가, 커스텀 데이터셋 fine-tuning까지 명령 단위로 적혀 있다
- [[overviews/physical-ai-overview]] — 도메인 허브
