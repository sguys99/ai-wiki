---
title: "LeRobot: State-of-the-art Machine Learning for Real-World Robotics in PyTorch"
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
---

## 요약

LeRobot은 Hugging Face가 PyTorch로 만든 로봇 학습 프레임워크로, 하드웨어 제어부터 데이터 수집, policy 학습, 평가까지를 한 패키지 안에 담는다. 라이선스는 Apache-2.0이고 `pip install lerobot` 한 줄로 설치한다. policy는 현재 observation을 받아 다음 action을 정하는 함수를 말한다.

특정 모델의 레퍼런스 구현이 아니라 여러 모델이 올라가는 공용 기반이라는 점이 이 저장소의 성격을 규정한다. ACT, Diffusion, π0 계열, GR00T N1.7, SmolVLA를 포함한 22종의 policy가 같은 데이터 형식과 같은 학습 CLI 위에서 동작한다. 따라서 이 wiki가 개별 논문 페이지로 다룬 모델 상당수가 여기에 구현으로 들어와 있고, 논문을 읽은 다음 코드를 만질 때의 첫 착지점이 된다.

## 배경

로봇 학습에는 두 종류의 파편화가 있다. 하드웨어마다 제어 API가 다르고, 연구실마다 데이터 형식이 다르다. 그 결과 같은 알고리즘을 다른 팔로 옮기려면 제어 코드를 새로 써야 하고, 남이 공개한 데이터셋을 쓰려면 변환기를 먼저 만들어야 한다.

LeRobot이 내건 목표는 진입 문턱을 낮추는 것이다. 데이터셋과 pretrained model을 공유해 누구나 기여하고 그 결과를 다시 가져다 쓰게 하겠다는 것으로, `transformers`가 자연어 처리에서 한 역할을 로봇 쪽으로 옮긴 구도다.

README가 스스로 드는 항목은 네 가지다.

- 하드웨어에 종속되지 않는 Python 인터페이스. SO-100 같은 저가 팔부터 humanoid까지 같은 코드로 제어한다.
- 확장 가능한 LeRobotDataset 형식. Parquet과 MP4(또는 이미지)를 섞어 Hugging Face Hub에 올리고, 대규모 로봇 데이터를 저장하고 스트리밍하고 시각화한다.
- 실제 기기로 전이된다고 확인된 policy 구현. 학습과 배포가 가능한 상태로 제공한다.
- 오픈소스 생태계 지원. physical AI를 대중화하겠다는 목표를 명시한다.

## 핵심 개념

observation은 매 timestep에 policy가 받는 센서 입력이고, action은 policy가 내놓는 제어 명령이다. `Robot` 인터페이스와 LeRobotDataset이 모두 이 두 개념을 중심으로 짜여 있어, 로봇을 바꾸든 데이터셋을 바꾸든 코드에서 오가는 것은 항상 observation과 action이다.

episode는 과제 시작부터 종료까지의 한 실행 단위다. 데이터셋 편집 도구가 다루는 최소 단위이자 평가에서 반복 횟수를 세는 단위이기도 하다.

teleoperation은 사람이 로봇을 원격으로 움직여 시연 데이터(demonstration)를 만드는 방식이다. LeRobot은 게임패드, 키보드, 휴대폰을 teleoperation 장치로 지원하고, `lerobot-record`가 그 조작을 데이터셋으로 기록한다.

imitation learning은 시연 데이터를 흉내 내 policy를 학습하는 방법이고, world model은 환경의 동역학을 학습해 미래를 예측하는 모델이다. 두 계열이 같은 policy 목록 안에 나란히 놓여 있다는 점이 이 저장소의 최근 범위를 보여준다.

## 저장소 구성

### Robot 인터페이스

`Robot` 클래스는 제어 로직과 하드웨어 세부를 분리한다. 연결하고, observation을 읽고, action을 보내는 세 단계가 인터페이스의 전부다.

```python
from lerobot.robots.myrobot import MyRobot

# 로봇에 연결
robot = MyRobot(config=...)
robot.connect()

# observation을 읽고 action을 보낸다
obs = robot.get_observation()
action = model.select_action(obs)
robot.send_action(action)
```

기본 지원 목록은 로봇과 teleoperation 장치를 함께 담는다.

| 구분 | 목록 |
|---|---|
| 로봇 | SO100, LeKiwi, Koch, HopeJR, OMX, EarthRover, Reachy2, OpenARM, Unitree G1, reBot B601 |
| teleoperation 장치 | 게임패드, 키보드, 휴대폰 |

목록에 없는 하드웨어도 이 인터페이스만 구현하면 LeRobot의 데이터 수집, 학습, 시각화 도구를 그대로 쓴다. 즉 확장 지점이 policy 쪽이 아니라 하드웨어 쪽에도 열려 있다. 기종별 배선과 캘리브레이션 절차는 README가 아니라 Hardware Documentation이 안내한다.

### LeRobotDataset

로봇 데이터가 연구실마다 제각각인 문제를 형식 통일로 푼다. 시각 정보와 저차원 신호를 서로 다른 파일 형식으로 나눠 저장하되 시간축을 맞추는 것이 핵심이다.

| 구성 | 저장 형식 | 담는 것 |
|---|---|---|
| 시각 정보 | MP4 영상 또는 이미지 | 카메라 프레임 |
| 상태와 action | Parquet | 로봇의 상태와 제어 명령 |

영상을 MP4로 두는 선택은 대규모 데이터의 저장 용량과 스트리밍을 고려한 것이다. 데이터셋은 Hugging Face Hub에 호스팅되어 `repo_id`만 주면 받아 쓴다.

```python
from lerobot.datasets.lerobot_dataset import LeRobotDataset

# Hub에서 데이터셋을 불러온다
dataset = LeRobotDataset("lerobot/aloha_mobile_cabinet")

# 인덱싱하면 영상 디코딩이 자동으로 처리된다
episode_index = 0
print(f"{dataset[episode_index]['action'].shape=}")
```

편집 도구도 함께 온다. episode 삭제, 인덱스나 비율로 분할, feature 추가와 제거, 여러 데이터셋 병합이 지원된다. 형식 자체의 상세 규격은 LeRobotDataset v3 문서가 정의한다.

### 지원 policy

순수 PyTorch로 쓰인 policy가 다섯 범주로 묶여 있다.

| 범주 | 구현된 모델 | 개수 |
|---|---|---|
| imitation learning | ACT, Diffusion, VQ-BeT, Multitask DiT Policy | 4 |
| 강화학습 | HIL-SERL, TDMPC (QC-FQL 예정) | 2 |
| VLA | Pi0, Pi0Fast, Pi0.5, GR00T N1.7, SmolVLA, XVLA, EO-1, MolmoAct2, WALL-OSS, EVO1 | 10 |
| world model | VLA-JEPA, LingBot-VA, FastWAM | 3 |
| reward model | SARM, TOPReward, Robometer | 3 |

구현된 policy는 모두 22종이고, 그중 VLA가 10종으로 절반에 가깝다. 반면 world model과 reward model은 각각 3종으로 아직 적지만, 별도 범주로 서 있다는 사실 자체가 이 저장소가 어느 방향으로 넓어지고 있는지를 보여준다.

각 모델의 구조와 실험 수치는 이 페이지가 다루지 않는다. 원 논문 페이지가 담당하며 대응 관계는 아래 "다른 자료와의 관계" 절의 표에 정리했다.

policy도 하드웨어처럼 직접 구현해 결합할 수 있고, 학습한 모델은 Hub에 올려 공유한다. 저장소는 학습 과정을 계측하고 들여다보는 도구도 함께 제공한다.

## 설치와 실행

### 설치

PyPI로 배포되는 패키지가 정식 설치 경로다.

```bash
pip install lerobot
lerobot-info
```

`lerobot-info`는 설치된 환경 정보를 출력하는 확인용 명령이다. 따라서 설치 직후 이 명령이 정상 동작하는지로 환경 구성을 먼저 점검한다. 의존성과 플랫폼별 세부 절차는 Installation Documentation이 안내한다.

### 데이터 수집

`lerobot-record`가 로봇과 teleoperation 장치를 짝지어 시연 데이터를 기록하고, 결과를 Hub 데이터셋으로 만든다.

```bash
lerobot-record \
  --robot.type=<robot_name> \
  --teleop.type=<teleoperator_name> \
  --dataset.repo_id=${HF_USER}/my-dataset
```

`--robot.type`과 `--teleop.type`에는 기본 지원 하드웨어의 이름이나 설치한 플러그인이 등록한 이름을 넣는다. `--dataset.repo_id`는 결과가 올라갈 Hub 저장소 식별자다.

### 학습

`lerobot-train`은 policy 타입과 데이터셋 `repo_id`만 받으면 학습을 시작한다.

```bash
lerobot-train \
  --policy.type=act \
  --dataset.repo_id=lerobot/aloha_mobile_cabinet
```

`--policy.type=act`는 지원 policy 표의 ACT를 고른다는 뜻이고, `--dataset.repo_id`는 ALOHA 이동형 캐비닛 데이터셋을 가리킨다. 즉 모델 코드를 건드리지 않고 두 인자만 바꿔 다른 policy와 다른 데이터셋 조합을 시험할 수 있다.

policy별 GPU와 RAM 요구사항, 예상 학습 시간은 README가 아니라 Compute Hardware Guide 문서에 있다. 어떤 policy를 보유 장비에서 학습할 수 있는지는 그 문서에서 먼저 확인해야 한다.

### 평가

`lerobot-eval` 한 스크립트가 시뮬레이터 평가와 실제 기기 평가를 함께 다룬다. 표준 벤치마크로는 LIBERO와 MetaWorld가 들어와 있다.

```bash
lerobot-eval \
  --policy.path=lerobot/pi0_libero_finetuned \
  --env.type=libero \
  --env.task=libero_object \
  --eval.n_episodes=10
```

| 옵션 | 뜻 |
|---|---|
| `--policy.path` | 평가할 모델의 Hub 경로 또는 로컬 체크포인트 |
| `--env.type` | 평가 환경 종류 (예시는 `libero`) |
| `--env.task` | 그 환경 안의 과제 이름 (예시는 `libero_object`) |
| `--eval.n_episodes` | 반복할 episode 수 |

예시의 `--eval.n_episodes=10`은 같은 과제를 10회 실행한다는 뜻이다. 즉 성공률은 10회 시행에서 나온 값이므로, 수치를 비교할 때는 이 반복 수를 함께 봐야 한다. 자체 시뮬레이터 환경이나 벤치마크를 만들어 Hub로 배포하는 통로는 EnvHub다.

### 서드파티 하드웨어 플러그인

플러그인은 패키지 이름으로 자동 발견된다. LeRobot은 설치된 패키지 중 정해진 접두사로 시작하는 것을 찾아 import한다.

| 접두사 | 등록 대상 |
|---|---|
| `lerobot_robot_` | 로봇 |
| `lerobot_teleoperator_` | teleoperation 장치 |
| `lerobot_camera_` | 카메라와 센서 |

설치한 패키지가 등록한 `type` 이름은 CLI에서 곧바로 쓴다. 별도 등록 파일을 편집하는 절차가 없다.

```bash
pip install lerobot_robot_<name> lerobot_teleoperator_<name>
```

커뮤니티가 이미 붙여둔 하드웨어는 UFACTORY xArm, Universal Robots UR5e, Franka, AgileX Piper, Trossen WidowX, ARX5, I2RT YAM, GELLO, SpaceMouse, Meta Quest, ROS 2 브리지, 촉각 카메라와 깊이 카메라 등이다. 전체 목록은 Third-Party Robots & Teleoperators 문서와 Third-Party Cameras & Sensors 문서가 관리한다.

## 지원 범위

README가 확인해주는 정량 정보는 성능이 아니라 지원 폭이다.

| 항목 | 규모 |
|---|---|
| 기본 지원 하드웨어 | 13종 (로봇 10종, teleoperation 장치 3종) |
| 구현된 policy | 22종 (5개 범주) |
| 표준 벤치마크 | 2종 (LIBERO, MetaWorld) |
| Hub 데이터셋 | 수천 개 규모 |
| 플러그인 접두사 | 3종 |

이 숫자들은 지원 폭을 보여줄 뿐 성능을 보증하지는 않는다. 각 policy가 원 논문 대비 어느 수준으로 재현되는지는 README 어디에도 적혀 있지 않다.

## 학습 자료와 생태계

README의 Resources 절은 문서 밖의 학습 경로를 안내한다. 코스와 데모가 Hugging Face Space로 배포되어 설치 없이 열어볼 수 있다.

| 자료 | 성격 |
|---|---|
| Documentation | 튜토리얼과 API를 다루는 공식 문서 사이트 |
| Robot Learning Tutorial | LeRobot으로 로봇 학습을 배우는 무료 실습 코스 (Hugging Face Space) |
| T-Shirt Folding Experiment | 티셔츠 접기를 처음부터 끝까지 수행하는 시연 (Hugging Face Space) |
| LeLab | 브라우저에서 teleoperation, 캘리브레이션, 데이터 수집, 재생, 학습을 하는 웹 인터페이스 (별도 저장소 `huggingface/leLab`) |
| 중국어 튜토리얼 | SO-ARM101 조립부터 teleoperation, 데이터셋, 학습, 배포까지 다루는 문서 |
| Discord, X | 커뮤니티 채널 |

LeLab은 CLI를 쓰지 않는 사용자를 위한 진입 경로다. 즉 하드웨어를 처음 다루는 사람은 브라우저에서 시작하고, 자동화가 필요해지면 같은 작업을 CLI로 옮길 수 있다.

## 한계

성능 근거가 문서 안에 없다. README에는 벤치마크 표도 policy 간 비교도 실려 있지 않다. "실제 기기로 전이된다고 확인된 SoTA policy"라는 서술은 주장이고, 근거는 ICLR 2026 논문(arXiv 2602.22818)과 각 모델의 원 논문에 있다. 따라서 어떤 policy를 고를지는 이 페이지가 아니라 개별 모델의 논문 페이지를 보고 판단해야 한다.

미완인 부분도 문서에 표시돼 있다. 강화학습 범주의 QC-FQL은 예정 상태이고, 표준 벤치마크는 LIBERO와 MetaWorld 둘뿐이며 그 뒤는 "more to come"이라고만 적혀 있다.

플러그인 자동 발견은 편한 만큼 위험도 안는다. 설치된 패키지 이름의 접두사만 보고 import하므로 서드파티 코드의 품질과 안전성은 사용자 책임이다. 서드파티 목록도 커뮤니티가 유지한다는 점을 README가 분명히 해둔다.

README 자체가 입구 역할만 한다는 점도 감안해야 한다. 설치 세부, 하드웨어 설정, 데이터셋 규격, policy 설정, 연산 요구사항이 모두 별도 문서 사이트로 넘어가 있다. 즉 이 스냅샷 하나로는 실제 구축 절차를 끝까지 따라갈 수 없다.

## 라이선스와 인용

라이선스는 Apache-2.0이라 상용 이용과 수정 배포에 제약이 적다. 다만 커뮤니티 행동 강령으로 Contributor Covenant v2.1을 채택하고 있고, 기여 절차는 CONTRIBUTING.md가 안내한다.

인용 대상은 두 가지다. 저장소 자체를 쓴 경우와 학술 논문을 참조하는 경우에 각각 다른 항목을 인용한다.

| 대상 | 인용 |
|---|---|
| 저장소 | `cadene2024lerobot` (2024). Remi Cadene 외 17인, "LeRobot: State-of-the-art Machine Learning for Real-World Robotics in Pytorch" |
| 학술 논문 | ICLR 2026 "LeRobot: An Open-Source Library for End-to-End Robot Learning" (arXiv 2602.22818) |

README는 두 인용을 함께 요청한다. 저장소를 쓰면 GitHub 항목을, 연구를 참조하면 ICLR 논문을 추가로 인용하라는 것이다.

## 다른 자료와의 관계

이 wiki가 개별 페이지로 다룬 모델 상당수가 LeRobot 안에 PyTorch 구현으로 들어와 있다. 구조와 실험 수치는 원 자료 페이지가 담당하고, 이 페이지는 그 모델을 실제로 학습하고 평가하는 경로를 담당한다.

| LeRobot 구현 | 이 wiki의 원 자료 |
|---|---|
| ACT | [[physical-ai/zhao-2023-learning-fine-grained-bimanual-manipulation]] |
| Pi0 | [[physical-ai/black-2024-pi0-a-vision-language-action-flow-model]] |
| Pi0.5 | [[physical-ai/black-2025-pi05-a-vision-language-action-model-with]] |
| SmolVLA | [[physical-ai/shukor-2025-smolvla-a-vision-language-action-model]] |
| GR00T N1.7 | [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation]] (앞 세대 N1) |
| WALL-OSS | [[physical-ai/x-square-robot-2026-wall-oss-05-technical-report]] |

[[physical-ai/physical-intelligence-openpi|openpi]]와 비교하면 성격 차이가 뚜렷하다. openpi는 π 계열 한 모델군의 공식 구현이고 base checkpoint 배포가 핵심인 반면, LeRobot은 모델을 소유하지 않고 여러 모델이 올라가는 공용 기반을 지향한다. 같은 π0.5를 두 저장소가 각각 구현하고 있으므로 재현 차이를 확인하려면 둘을 함께 봐야 한다.

데이터 쪽 문제의식은 [[physical-ai/open-x-embodiment-2023-robotic-learning-datasets-and-rt-x|Open X-Embodiment]]와 겹친다. Open X-Embodiment는 흩어진 데이터셋 60종을 사후에 한 형식으로 합쳤고, LeRobotDataset은 같은 통일을 수집 시점부터 강제한다.

policy 목록에 world model이 별도 범주로 서 있는 것은 [[physical-ai/reuss-2026-pretrained-to-imagine-fine-tuned|world-action model]] 흐름과 이어진다. 예측 모델과 제어 policy를 한 프레임워크에서 같은 데이터로 다루려는 시도다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| LeRobotDataset | 영상을 MP4, 상태와 action을 Parquet으로 저장하고 시간축을 맞춘 이 저장소의 데이터 형식. Hugging Face Hub 호스팅을 전제로 설계됐다 |
| EnvHub | 자체 시뮬레이터 환경이나 벤치마크를 만들어 Hub로 배포하는 경로 |
| LeLab | CLI 없이 브라우저에서 teleoperation, 캘리브레이션, 데이터 수집, 재생, 학습을 하는 웹 인터페이스 (별도 저장소 `huggingface/leLab`) |
| HIL-SERL | 사람이 개입하는 실제 기기 강화학습 방식. 저장소의 강화학습 범주에 구현돼 있다 |
| 플러그인 접두사 | `lerobot_robot_`, `lerobot_teleoperator_`, `lerobot_camera_`. 설치된 패키지 이름이 이 접두사로 시작하면 LeRobot이 자동으로 import한다 |
| `lerobot-info` | 설치 상태와 환경 정보를 출력하는 확인용 명령 |

## 관련 페이지

- [[physical-ai/physical-intelligence-openpi]]: π 계열 공식 구현. 모델 소유 저장소와 공용 프레임워크의 대비.
- [[physical-ai/zhao-2023-learning-fine-grained-bimanual-manipulation]]: 기본 학습 예제로 쓰이는 ACT의 원 논문.
- [[physical-ai/black-2024-pi0-a-vision-language-action-flow-model]]: VLA 범주에 구현된 Pi0의 원 논문.
- [[physical-ai/black-2025-pi05-a-vision-language-action-model-with]]: 같은 범주 Pi0.5의 원 논문.
- [[physical-ai/shukor-2025-smolvla-a-vision-language-action-model]]: LeRobot 팀이 직접 낸 VLA. 이 저장소의 데이터와 도구를 전제로 설계됐다.
- [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation]]: GR00T N1.7의 앞 세대 foundation model.
- [[physical-ai/open-x-embodiment-2023-robotic-learning-datasets-and-rt-x]]: 로봇 데이터 형식 통일의 선행 사례.
- [[physical-ai/reuss-2026-pretrained-to-imagine-fine-tuned]]: world model 범주가 놓인 흐름.
- [[physical-ai/learnopencv-2025-vision-language-action-models-vla]]: 이 프레임워크를 실제로 실행해 보는 튜토리얼. 저장소 clone부터 `lerobot/pi0` 체크포인트 평가, 커스텀 데이터셋 fine-tuning까지 명령 단위로 적혀 있다.
- [[overviews/physical-ai-overview]]: physical-ai 카테고리의 분류 뼈대와 학습 경로 허브.
