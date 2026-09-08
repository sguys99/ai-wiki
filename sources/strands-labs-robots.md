---
title: "Strands Robots: Control, simulate, and train robots with natural language"
type: repo
year: 2026
category: physical-ai
raw_path: raw/repos/strands-labs-robots.md
raw_filename: "strands-labs-robots.md"
source_collection: external
org: "strands-labs"
repo: "robots"
url: "https://github.com/strands-labs/robots"
license: "Apache-2.0"
tags: [physical-ai, simulator, vla, robot-learning]
figures:
  - id: fig01
    label: hero loop
    kind: figure
    file: assets/strands-labs-robots/fig01.svg
    raw: https://raw.githubusercontent.com/strands-labs/robots/main/docs/assets/hero_loop.svg
    caption: "Strands Agent를 가운데 두고 perceive, reason, act, world가 도는 폐쇄 제어 루프 도식"
    strategy: manual
    curated: true
  - id: fig02
    label: architecture flow
    kind: figure
    file: assets/strands-labs-robots/fig02.svg
    raw: https://raw.githubusercontent.com/strands-labs/robots/main/docs/assets/architecture_flow.svg
    caption: "Agent, Policies, Backends, Robots 4계층 구조와 아래로 흐르는 action 신호, 위로 돌아오는 observation 신호"
    strategy: manual
    curated: true
  - id: fig03
    label: mesh network
    kind: figure
    file: assets/strands-labs-robots/fig03.svg
    raw: https://raw.githubusercontent.com/strands-labs/robots/main/docs/assets/mesh_network.svg
    caption: "Zenoh mesh 위에서 서로를 발견하고 지시를 주고받는 로봇 peer 구성도"
    strategy: manual
    curated: true
  - id: fig04
    label: use_ros turtlesim demo
    kind: figure
    file: assets/strands-labs-robots/fig04.gif
    raw: https://raw.githubusercontent.com/strands-labs/robots/main/docs/assets/use_ros_agent_square.gif
    caption: "use_ros 도구를 받은 에이전트가 ROS 2 turtlesim을 정사각형 경로로 폐쇄 루프 주행시키는 실행 화면 (애니메이션 GIF)"
    strategy: manual
    curated: true
---

## 한 줄 요약 (One-line Summary)

Strands Agent에 로봇 제어 능력을 붙이는 Apache-2.0 Python 라이브러리다. `Robot("so100")` 한 줄이 기본적으로 MuJoCo 시뮬레이션을 띄우고 실제 하드웨어는 `mode="real"`을 명시해야만 잡히며, teleoperation으로 시연 데이터(demonstration)를 모으고 policy를 fine-tuning하고 시뮬레이션과 실제 기기에서 같은 코드로 실행하고 Zenoh mesh로 여러 대를 묶고 ROS 2 그래프에 연결하는 과정이 하나의 자연어 제어 인터페이스 아래 들어간다.

## 1. 자료 정보 (Document Information)

- URL: https://github.com/strands-labs/robots
- 조직: Strands Labs (상위 프로젝트 Strands Agents, https://strandsagents.com)
- 라이선스: Apache-2.0
- 패키지: PyPI `strands-robots`. 설치는 `uv pip install strands-robots`이며 Python 3.12 이상이 필요하다
- 문서 사이트: https://strands-labs.github.io/robots/. README가 사실상 전체 매뉴얼 역할을 하고 세부는 문서 사이트와 저장소 내 `docs/`로 넘긴다
- 저장소 생성 2026-02-19, 최종 push 2026-09-08, star 155 (수집 시점 GitHub API 기준)
- 로드맵 관리처: Strands Labs Robots project board (https://github.com/orgs/strands-labs/projects/2)
- 아카이브한 README 스냅샷: 2026-09-09 수집 (`raw.githubusercontent.com/strands-labs/robots/main/README.md`, 1,423줄)
- 기여 규약과 코드리뷰 누적 학습은 저장소의 `AGENTS.md`에 따로 있다

## 2. 주요 기여 (Key Contributions)

README가 전면에 내거는 주장은 로보틱스 작업의 전 구간을 하나의 라이브러리와 하나의 개념 모델로 덮는다는 것이다. 다섯 단계를 각각 다른 도구로 조립하던 흐름을 한 패키지 안에 넣었다.

| 단계 | 능력 | 노출 표면 |
|---|---|---|
| 1 | teleoperation과 데이터셋 기록 | `Robot(mode="real")`, `attach_teleop`, `start_recording` |
| 2 | policy post-training | `train_policy` (LeRobot / GR00T trainer) |
| 3 | 시뮬레이션과 하드웨어 policy 실행 | `run_policy` (시뮬레이션), `start_task` (하드웨어) |
| 4 | 다중 로봇 조정 | `robot.mesh.tell` / `robot_mesh` 도구 |
| 5 | ROS 2 상호운용 | `Simulation(ros2_bridge=True)`, `use_ros` |

1단계와 3단계의 실제 기기 실행은 하드웨어가 있어야 하고 2단계는 GPU가 필요하지만, 나머지는 하드웨어 없이 시뮬레이션만으로 전부 실행된다는 것이 README의 설계 전제다.

설계상 두드러지는 선택은 여섯 가지다.

- **시뮬레이션 우선 기본값**: `Robot("so100")`은 MuJoCo 세계를 띄운다. 실제 서보를 구동하려면 `mode="real"`을 명시해야 하므로 실수로 하드웨어를 움직일 경로가 없다.
- **팩토리이지 래퍼가 아님**: `Robot()`은 실제 백엔드 인스턴스를 그대로 돌려준다. 반환값이 `Simulation`이면 그 클래스의 모든 메서드를 직접 부를 수 있다.
- **policy 인터페이스 단일화**: VLA 모델과 고전 motion planner, MPC, 스크립트 컨트롤러가 모두 하나의 ABC(`async get_actions`)를 구현한다.
- **mesh 내장**: 로봇 하나가 곧 Zenoh peer다. `tell()`로 다른 로봇에 지시하고 E-STOP을 broadcast하며 AWS IoT Core로 다중 로봇 운영까지 연결한다.
- **시뮬레이션 도구의 액션 폭**: 세계 구성, 물리, 렌더링, domain randomization, 절차적 지형 생성, LeRobotDataset 기록이 모두 에이전트가 호출 가능한 액션으로 나와 있다.
- **자기 치유형 스키마 오류**: 잘못된 파라미터는 프로세스를 죽이지 않고 유효 목록을 담은 오류 메시지로 거부되어, 에이전트가 호출 규약을 스스로 학습한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 Robot 팩토리

`Robot()`은 이름과 mode로 백엔드를 고르는 팩토리다. 주요 파라미터는 다음과 같다.

| 파라미터 | 기본값 | 설명 |
|---|---|---|
| `name` | 필수 | 로봇 이름 또는 별칭 |
| `mode` | `"sim"` | `"sim"`, `"real"`, `"auto"` (대소문자 무시). `auto`는 USB에서 서보를 탐색하고 없으면 시뮬레이션으로 내려간다 |
| `backend` | `"mujoco"` | 시뮬레이션 백엔드: `"mujoco"`, `"newton"`, `"isaac"` |
| `urdf_path` | `None` | MJCF/URDF 경로 직접 지정 (registry 조회를 건너뛴다) |
| `cameras` | `None` | 카메라 설정. `mode="real"`에서만 허용된다 |
| `position` | `[0,0,0]` | 시뮬레이션 세계 안의 생성 위치 |
| `data_config` | 이름과 동일 | observation과 action의 스키마 이름 |
| `mesh` | `None` | Zenoh mesh 참여 여부. `None`이면 `STRANDS_MESH`를 참조하고, 그 값이 없으면 참여하지 않는다 |

검증 규칙도 안전 쪽으로 기울어 있다. 시뮬레이션 mode에서 `cameras=`를 주면 거부되고(시뮬레이션 카메라는 생성 후 `add_camera` 액션으로 추가한다), 등록되지 않은 로봇 이름은 `urdf_path=`가 없는 한 `ValueError`가 되며, `STRANDS_ROBOT_MODE`에 오타가 들어가면 경고를 남기고 시뮬레이션으로 되돌아간다.

### 3.2 로봇 registry

로봇 정의는 `registry/robots.json`에 있고 MJCF와 메시 자산은 robot_descriptions와 MuJoCo Menagerie에서 최초 사용 시 자동으로 내려받는다. README는 "70+ robots across 8 categories"라고 쓰지만 카테고리 표에 이름이 적힌 로봇을 세면 68종이다.

| 카테고리 | 표에 적힌 수 | 예시 |
|---|---|---|
| Arm | 22 | so100, so101, koch, panda, ur5e, xarm7, kinova_gen3, kuka_iiwa |
| Humanoid | 18 | unitree_g1, unitree_h1, apollo, talos, reachy2, cassie, op3 |
| Mobile | 13 | spot, go1, unitree_go2, anymal_c, stretch3, lekiwi, earthrover |
| Hand | 8 | shadow_hand, allegro_hand, leap_hand, robotiq_2f85 |
| Bimanual | 3 | aloha, bi_openarm, trossen_wxai |
| Aerial | 2 | crazyflie, skydio_x2 |
| Expressive | 1 | reachy_mini |
| Mobile manip | 1 | google_robot |

이 중 LeRobot을 통해 `mode="real"`로 실제 구동까지 되는 것은 11종이다: so100, so101, koch, omx, hope_jr, aloha, bi_openarm, reachy2, unitree_g1, lekiwi, earthrover. 나머지는 시뮬레이션 전용이다.

로봇을 추가하는 경로는 둘이다. robot_descriptions가 이미 배포하는 MJCF 로봇은 `robots.json` 항목 없이도 이름만으로 해석된다(`Robot("iiwa14")`, 목록은 `list_discoverable()`). 관절 수나 하드웨어 포트, 별칭, 장면 조정이 필요한 로봇은 `robots.json`에 항목을 추가해 PR을 내거나, 기기 로컬 로봇이면 `register_robot()`으로 실행 시점에 등록한다. `robots.json` 항목은 자동 탐색보다 항상 우선한다.

### 3.3 시뮬레이션 백엔드와 액션

기본 백엔드는 MuJoCo이고 Newton(GPU 네이티브, 배치 환경과 헤드리스 레이트레이싱 렌더)과 Isaac Sim(RTX 렌더, 합성 데이터, USD 장면)이 in-tree로 함께 들어 있다. 세 백엔드 외의 것은 Python entry point 그룹 `strands_robots.backends`로 등록하면 이 패키지를 수정하지 않고 `create_simulation(name)`에 잡힌다. 내장 백엔드가 같은 이름의 플러그인보다 우선하고, 플러그인 탐색은 지연 실행이라 초기 import를 느리게 만들지 않는다.

시뮬레이션 도구의 액션은 다음 묶음으로 나뉜다.

| 묶음 | 액션 예시 |
|---|---|
| 세계와 장면 | `create_world`, `load_scene`, `replace_scene_mjcf`, `patch_scene_mjcf`, `reset`, `save_state`, `load_state`, `export_xml` |
| 로봇 | `add_robot`, `remove_robot`, `list_robots`, `get_robot_state`, `register_urdf`, `get_features` |
| 물체 | `add_object`, `remove_object`, `move_object`, `list_objects` |
| 카메라와 렌더링 | `add_camera`, `render`, `render_depth`, `render_all`, `get_world_point`, `start_cameras_recording` |
| 물리 | `step`, `set_gravity`, `apply_force`, `raycast`, `get_contacts`, `forward_kinematics`, `get_jacobian`, `get_mass_matrix`, `inverse_dynamics`, `get_energy` |
| policy | `run_policy`, `start_policy`, `stop_policy`, `replay_episode`, `eval_policy` |
| 무작위화 | `randomize` |
| 데이터셋 기록 | `start_recording`, `stop_recording`, `get_recording_status` |
| 벤치마크 | `list_benchmarks`, `register_benchmark_from_file`, `evaluate_benchmark` |
| 뷰어 | `open_viewer`, `close_viewer` |

README 안에서 이 도구의 액션 개수는 두 값으로 적혀 있다. 개요 절과 프로젝트 구조 설명은 67개라고 쓰고, Simulation 절과 Robot 도구 액션 표는 77개라고 쓴다. 문서 내부 불일치이므로 인용할 때 주의가 필요하다.

자주 걸리는 제약도 README가 따로 모아두었다. plane 물체는 정적이어야 하고, 카메라는 `target`을 줘야 하며 `target`이 `position`과 같으면 오류다. 손목 카메라는 `parent_body="<robot>/gripper"`로 몸체에 장착하며 이때 좌표는 세계가 아니라 그 몸체의 지역 좌표계로 해석된다. `start_cameras_recording`은 평범한 MP4를, `start_recording`은 LeRobotDataset을 쓰고 후자는 `lerobot` extra를 요구한다. policy가 실행 중이면 상태를 바꾸는 액션은 거부된다.

### 3.4 policy provider

모든 policy는 `async get_actions(observation, instruction, **kwargs)` 하나를 구현한다. 이 인터페이스는 action이 어떻게 만들어지는지에 대해 의도적으로 무관심해서 VLA 모델과 고전 컨트롤러를 함께 담는다.

| provider | 백엔드 | 특징 |
|---|---|---|
| `mock` | 없음 | 사인파 trajectory. `requires_images=False`라 카메라 렌더링을 건너뛰어 약 10배 빠르다 |
| `groot` | NVIDIA GR00T N1.5 / N1.6 / N1.7 | Docker 컨테이너에 ZMQ로 붙는 서비스 방식과 `model_path=`로 프로세스 안에서 도는 방식 |
| `cosmos3` | NVIDIA Cosmos 3 omnimodal VLA | Cosmos Framework RoboLab policy server에 WebSocket으로 접속. embodiment는 droid, umi, av, bridge, openarm |
| `lerobot_local` | Hugging Face | ACT, Pi0, SmolVLA, Diffusion을 서버 없이 직접 추론 |
| `lerobot_async` | Hugging Face gRPC | LeRobot 자체 async-inference gRPC로 원격 `PolicyServer`에 위임 |
| `remote` | 임의 policy, WebSocket | observation을 원격 서버로 넘기고 action chunk를 받는 클라이언트 |
| `vera` | MIT VERA | 영상에서 action을 뽑는 2단계 planner. PyPI에 없어 git에서 설치한다 |

GR00T의 embodiment 스키마는 `data_config`라는 이름으로 27종이 `policies/groot/data_configs.json`에 들어 있다. 카메라 수와 상태 구성이 다른 so100 계열(단일, dualcam, 4cam), 실제 humanoid(fourier_gr1_arms_only, unitree_g1과 그 전신 변형), LIBERO Panda, Open X-Embodiment 계열(oxe_droid, oxe_google, oxe_widowx) 등이 포함된다.

Cosmos 3의 droid embodiment는 세 개의 카메라 화면을 모두 요구한다. `observation_mapping`이 `wrist_image_left`, `exterior_image_1_left`, `exterior_image_2_left` 세 키를 모두 채우지 못하면 요청을 보내기 전에 빠진 키 이름을 담은 `ValueError`가 난다. umi, av, bridge는 `observation/image` 하나면 된다.

보안 관련 제약이 하나 붙어 있다. `lerobot_local`은 Hugging Face 모델을 `trust_remote_code=True`로 읽어들이므로 임의 코드 실행 위험이 있고, `STRANDS_TRUST_REMOTE_CODE=1`로 명시 동의해야 동작한다.

### 3.5 비-VLA policy의 목표 전달 규약

motion planner와 MPC, 스크립트 trajectory는 자연어 지시문(instruction)을 해석하지 않는다. 대신 정해진 `**kwargs` 키로 목표를 받는다.

| 키 | 타입 | 의미 |
|---|---|---|
| `target_pose` | `list[float]` | base 좌표계 기준 Cartesian 목표 `[x, y, z, qw, qx, qy, qz]` |
| `target_joints` | `dict[str, float]` | 관절 이름을 키로 하는 관절 공간 목표 (rad 또는 m) |
| `world_update` | `dict \| None` | 충돌 회피 planner를 위한 호출 단위 세계 갱신 |

provider는 모르는 `**kwargs`를 오류로 만들지 않고 무시해야 한다. 그래야 호출자가 백엔드에 결합되지 않은 채 공통 키를 그대로 넘길 수 있다. 참조 구현은 넷이다.

| provider | 별칭 | 실행 위치 | 목표 키 |
|---|---|---|---|
| `moveit2` | `moveit` | ROS 2 `moveit_py` 사이드카에 ZMQ | `target_pose` / `target_joints` |
| `curobo` | `cumotion` | 프로세스 내부 CUDA | `target_pose` / `target_joints` / `world_update` |
| `wbc` | `sonic` | 프로세스 내부 ONNX (CPU) | `target_velocity` `[vx, vy, omega]` |
| `motionbricks` | `motion_bricks` | 프로세스 내부 torch | `style` / `mode`, `target_velocity`, `target_heading` |

이 목표 키 어휘는 mesh에도 그대로 통한다. `mesh.tell(peer, "...", policy_provider="curobo", target_pose=[...])`처럼 보내면 시뮬레이션 peer의 planner가 같은 payload를 받는다. 프로세스 안에서는 `run_policy(policy_kwargs={...})`가 통로이며 `run_policy` 자체에는 `target_pose` 파라미터가 없다.

### 3.6 training provider

`create_trainer`는 `create_policy`의 학습 쪽 짝이다. provider 이름이 추론과 학습에서 같아서 `create_policy("groot")`와 `create_trainer("groot")`가 같은 provider를 가리킨다. 반환되는 `Trainer`는 `TrainSpec`을 받아 동작하고, 에이전트가 호출하는 `train_policy` 도구도 같은 팩토리를 감싼다.

| provider | 종류 | 설명 |
|---|---|---|
| `lerobot_local` | imitation / post-training | LeRobotDataset 위에서 전체 또는 LoRA fine-tuning |
| `groot` | imitation / post-training | GR00T fine-tuning. `embodiment` 태그가 필요하다 |
| `cosmos3` | imitation / post-training | Cosmos 3 fine-tuning. 다중 노드 HSDP 지원 |
| `mock` | imitation (테스트) | 아무 일도 하지 않는 trainer |
| `sagemaker` | 관리형 클라우드 전송 | 같은 spec을 SageMaker 학습 작업 하나로 제출 |
| `ppo` | 강화학습 | on-policy PPO. `VecSimEnv`와 짝을 이룬다 |
| `fast_sac` | 강화학습 | off-policy Soft Actor-Critic |

강화학습 trainer는 `BaseRLAlgo`를 상속해 imitation trainer와 같은 `validate → prepare → train → export` 수명주기를 공유하고, `VecSimEnv`(독립 `SimEnv` N개를 배치 환경 하나로 묶은 것)로 trajectory를 모은다. 학습 패키지는 강화학습 provider가 처음 해석될 때까지 torch를 import하지 않는다.

SageMaker provider는 동작이 아니라 전송 계층이다. 학습 로직은 지정한 컨테이너 이미지 안에 있고, `dataset_root`와 `output_dir`는 `s3://` URI여야 하며 나머지 spec 필드와 `extra`는 문자열 하이퍼파라미터로 실려 컨테이너 진입점에서 다시 `TrainSpec`으로 복원된다. 제출 전에 로컬 검증을 먼저 수행하고, 로컬 폴링 예산을 넘긴 작업은 `running`으로 보고된 뒤 `trainer.status(job_name)`로 계속 조회된다. 호출자에게는 `sagemaker:CreateTrainingJob`, `sagemaker:DescribeTrainingJob`, 실행 역할에 대한 `iam:PassRole`이 필요하다.

### 3.7 데이터 기록과 스트리밍

physical AI 데이터 루프가 기록, 스트리밍, 버킷 반출의 세 동작으로 정리되어 있다. `lerobot` extra가 필요하다.

- **기록**: 자연어 프롬프트 하나가 장면 구성, 카메라 추가, policy 실행, 기록 시작과 종료까지 몰아서 수행한다.
- **스트리밍**: `stream_dataset()`이 기록의 프로세스 내 읽기 짝이다. 카메라 프레임은 MP4 샤드에서 즉석 디코딩되고 상태와 action은 parquet에서 읽히며 디스크로 다시 펼치지 않는다. 영상 디코더가 없는 기기를 위해 `drop_videos=True`로 상태와 action만 읽는 경로가 있는데, 이때는 영상이 아닌 키를 최소 하나 담은 `delta_timestamps`를 함께 줘야 하고 없으면 `ValueError`가 난다.
- **버킷 반출**: `stop_recording(bucket=...)`이나 `sync_dataset_to_bucket()`으로 Hugging Face Storage Bucket에 올린다. git-LFS 이력 비대화를 피하려는 선택이다. `hf` CLI의 `buckets`/`sync` 하위 명령이 필요한데 이는 `huggingface_hub` 1.5.0에서 처음 들어갔고, 버킷 읽기는 `strands-robots` 0.5.1 이상이 필요하다.

가장 실무적인 항목은 episode 무결성 검증이다. README는 기록의 진실은 `meta/episodes/` 아래 parquet이지 모델이 수집 중에 서술한 개수가 아니라고 못박는다. 모델이 자기 tool call을 세도록 두지 말고 결정적인 Python 루프로 `run_policy(..., n_episodes=1)`과 `save_episode()`를 episode마다 한 번씩 부르라고 권한다. 검증은 프로세스 안에서 `sim.verify_dataset_episodes(expected=20)`으로, 셸에서는 `strands-robots verify-dataset /tmp/demo --expected 20`으로 수행하며 후자는 종료 코드로 CI 게이트에 바로 들어간다. 이 검사가 잡는 것은 세 가지다: 모든 프레임을 `episode_index=0` 하나에 몰아넣고도 20/20을 보고한 mega-episode 손상, `meta/info.json`과 parquet의 불일치, 길이가 0인 episode.

### 3.8 mesh 네트워킹

`Robot("so100", mesh=True)`는 로컬 Zenoh mesh에 참여한다. 참여는 선택이고, 기본 `Robot()`은 `STRANDS_MESH`가 `true`/`1`/`yes`가 아닌 한 `robot.mesh`를 `None`으로 둔다. 같은 호스트의 peer는 gossip scouting과 공유 로컬 엔드포인트로 서로를 찾고 프로세스당 `zenoh.Session` 하나를 참조 계수로 공유한다. 호스트를 넘는 발견은 의도적으로 명시적이어서 `ZENOH_CONNECT`로 상대를 직접 지정해야 한다. multicast scouting은 LAN의 아무 기기나 다중 로봇을 열거하고 유인할 수 있어 기본 비활성이고, `STRANDS_MESH_MULTICAST=true`로 켜면 경고를 남긴다.

`tell()`은 하드웨어 peer와 시뮬레이션 peer 모두에 통한다. 생성자 인자(`model_path`, `server_address`)는 `policy_config`로, 호출 단위 목표(`target_pose`, `target_joints`, `world_update`)는 `policy_kwargs`로 각각 다른 소비처에 전달된다. 에이전트에게는 `robot_mesh` 도구로 peers, status, tell, send, broadcast, stop, emergency_stop, subscribe, watch, inbox 액션이 노출된다.

보안 기본값이 촘촘한 편이다. 기본 인증 방식은 mTLS이고 `none`으로 내리려면 별도 확인 변수가 필요하다. 다중 로봇 운영에서는 topic 단위 ACL 파일이 사실상 필수라고 문서가 못박는데, mTLS는 신원만 줄 뿐 최소 권한을 주지 않아 기기 인증서 하나로 전체 트래픽을 읽고 아무 로봇에나 명령할 수 있기 때문이다. `allow` 기본값에 규칙을 얹은 blacklist 형태의 ACL은 아예 적재 단계에서 거부되며, 이를 받아들이려면 `STRANDS_MESH_ACCEPT_PERMISSIVE_ACL`을 명시해야 한다. 그 밖에 topic별 메시지 크기 상한(`cmd` 16KiB, camera 1MiB, safety 4KiB), 수신 속도 상한(`cmd` 20Hz, safety 2Hz), HMAC로 서명되고 회전되는 안전 감사 로그, teleoperation 입력의 값과 속도 제한, e-stop 해제용 HMAC 증명과 시각 오차 허용 범위가 모두 환경 변수로 노출된다. 단일 기기 실험용으로는 `STRANDS_MESH_LOCAL_DEV=1` 하나로 localhost 프리셋이 켜진다.

다중 로봇을 네트워크 너머로 묶을 때는 mesh를 AWS IoT Core의 MQTT5/mTLS로 다리 놓는다. Device Shadow 반영, S3 카메라 오프로드, 계정 단위 Fleet Provisioning이 붙고, Amazon Root CA1 PEM의 SHA-256을 고정해 네트워크 수준 공격자가 CA를 바꿔치기하지 못하게 한다. 고정 값은 스칼라가 아니라 집합이라 새 pin과 옛 pin이 동시에 유효할 수 있고, README는 이를 이용한 4단계 회전 절차(대역 외 검증, 새 pin 추가 배포, 전파 대기, 옛 pin 제거)와 긴급 상황용 `STRANDS_MESH_CA_PINS` 추가 지정 방법까지 적어두었다.

### 3.9 ROS 2 상호운용

ROS 2와의 접점이 네 가지로 나뉜다. 에이전트가 ROS 2 시스템을 관찰하고, 명령하고, 스스로 로봇이 되고, 시뮬레이션을 노출하는 방향이다.

| 표면 | 하는 일 | 백엔드 | ROS 2 설치 필요 |
|---|---|---|---|
| `use_ros` | topic 목록과 echo, publish, service 호출 | 프로세스 내 `rclpy` | 필요 |
| `use_rtps` | DDS peer로 그래프에 참여해 실제 스택이 소비하는 topic을 발행 | 순수 `cyclonedds` (pip) | 불필요 |
| `RosBridgedRobot` | `cmd_vel`과 odometry를 쓰는 ROS 2 베이스를 일반 `Robot`처럼 구동 | `use_ros` | 필요 |
| `SimEngine(ros2_bridge=True)` | 실행 중인 MuJoCo 시뮬레이션의 `joint_states`와 카메라 `image_raw`를 발행 | `rclpy` | 필요 |

`rclpy`는 PyPI에 없고 ROS 2 배포판을 source해야 들어오므로, `[ros2]` extra는 `use_rtps`가 쓰는 `cyclonedds` 바인딩만 담는다. 그래서 순수 RTPS 경로는 macOS와 CI, Jetson에서 ROS 설치 없이 동작한다. 각 표면은 백엔드가 없으면 구조화된 오류로 내려앉고 기본 설치는 ROS 2를 전혀 건드리지 않는다.

명령 표면에는 사람 승인 게이트가 있다. `use_ros`의 명령은 기본적으로 조작자 확인을 요구하고, 조작자가 없는 헤드리스 환경에서는 `STRANDS_ROS2_COMMAND_ALLOW`로 미리 승인한 표면만 통과한다. 승인은 payload가 아니라 표면 기준이라 속도 0인 정지 명령도 같은 게이트를 지난다. 읽기는 게이트 대상이 아니다.

### 3.10 설치 extras

기본 설치는 numpy, opencv-headless, Pillow만 담아 가볍고 필요한 것만 extra로 추가한다.

| extra | 설치물 | 용도 |
|---|---|---|
| `sim-mujoco` | MuJoCo, robot_descriptions, imageio, mink + qpsolvers[daqp] | 시뮬레이션 기본 경로. mink와 qpsolvers는 `move_to` Cartesian 이동을 담당하는 미분 IK solver다 |
| `sim-newton` | Newton, Warp, MuJoCo-Warp, trimesh | GPU 네이티브 시뮬레이션 (NVIDIA GPU) |
| `sim-isaac` | usd-core, imageio | Isaac Sim 백엔드용 pip 헬퍼. Isaac Sim 런타임 약 30GB는 별도 설치. `[all]`에 포함되지 않는다 |
| `sim-gs` | gsplat, plyfile, torch | Gaussian Splatting 혼합 렌더링. `[all]`에 포함되지 않는다 |
| `lerobot` | LeRobot | 실제 하드웨어, 로컬 VLA 추론, 데이터셋 기록 |
| `molmoact2` | LeRobot + transformers, peft, scipy | MolmoAct2 VLA |
| `groot-service` / `cosmos3-service` | pyzmq, msgpack / websockets, msgpack | GR00T와 Cosmos 3 추론 클라이언트 |
| `curobo` / `motionbricks` | (비어 있음) / torch 계열 | 소스 설치가 필요한 planner와 생성 모션 |
| `wbc` | onnxruntime | GR00T whole-body control(SONIC) humanoid locomotion. GPU 없이 프로세스 안에서 동작한다 |
| `mesh` / `mesh-iot` | eclipse-zenoh, json5 / awsiotsdk, awscrt, boto3 | mesh와 AWS IoT Core 전송 |
| `sagemaker` | boto3 | 관리형 SageMaker 학습 작업 제출 |
| `device-connect` | device-connect-edge, device-connect-agent-tools | 기기 인식 네트워킹. 없으면 내장 mesh로 되돌아간다 |
| `all` | GPU 전용 extra를 제외한 전부 | 한 번에 설치 |

### 3.11 에이전트 도구 목록

`Agent(tools=[...])`에 넘길 수 있는 도구는 16종이고 모두 `{"status", "content"}` 형태를 돌려준다.

| 도구 | 용도 |
|---|---|
| `Robot(...)` | 시뮬레이션과 하드웨어를 아우르는 로봇 제어 |
| `run_policy` | episode 단위 policy 실행과 평가, 데이터셋 기록 |
| `train_policy` | 기록한 데이터셋 위에서 policy post-training |
| `use_lerobot` | 임의의 lerobot 모듈과 클래스를 직접 호출하는 범용 다리 |
| `lerobot_train` | `lerobot-train` CLI를 감싼 얇은 로컬 래퍼 |
| `robot_mesh` | Zenoh mesh 조정 (tell, broadcast, E-STOP) |
| `use_ros` / `use_rtps` | ROS 2 그래프 연결 두 경로 |
| `gr00t_inference` | GR00T 추론 서비스의 Docker 수명주기 관리 |
| `lerobot_camera` / `lerobot_calibrate` / `lerobot_teleoperate` | 카메라 탐색과 촬영, 보정 관리, 시연 기록과 재생 |
| `pose_tool` | 이름 붙인 자세를 저장하고 불러오고 실행 |
| `harness_memory` | 과제 해결 trajectory와 성공 규칙, 실패 모델을 세션 너머로 보존 |
| `serial_tool` | Feetech 서보와 저수준 시리얼 통신 |
| `download_assets` | 로봇 MJCF와 메시를 미리 내려받기 |

teleoperation 쪽은 별도로 17종의 teleoperator가 14종의 로봇을 구동한다. so100/so101/koch/omx/openarm 계열 leader arm, 양팔 leader, 게임패드, 키보드 세 변형, 휴대폰, reachy2, unitree_g1, homunculus 팔과 장갑이 포함된다. action 키가 서로 맞으면 설정 없이 연결되고, 어휘가 다르면 `map_fn`을 넘긴다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

이 저장소는 논문이 아니라 라이브러리라서 성능 수치표는 없다. README가 제시하는 것은 지원 범위의 규모와 하나의 실행 데모다.

| 항목 | 수 |
|---|---|
| 지원 로봇 | README 표기 70종 이상, 카테고리 표에 이름이 적힌 것은 68종 |
| 로봇 카테고리 | 8 |
| 실제 하드웨어 구동 가능 로봇 | 11 |
| teleoperator | 17종이 로봇 14종을 구동 |
| 시뮬레이션 도구 액션 | README 안에서 67과 77로 엇갈림 |
| 에이전트 도구 | 16 |
| policy provider | VLA와 원격 계열 7종 + 비-VLA 참조 구현 4종 |
| training provider | 7 (imitation 4, 클라우드 전송 1, 강화학습 2) |
| GR00T data config | 27 |
| 시뮬레이션 백엔드 | 내장 3종 + entry point 플러그인 |
| ROS 2 접점 | 4 |
| 설치 extra | 15개 개별 extra + `all` |

실행 데모로는 `use_ros` 도구를 받은 에이전트(Amazon Bedrock의 Claude Opus)가 ROS 2 turtlesim을 정사각형 경로로 주행시킨 기록이 있다. 자세를 읽고 방향을 보정하고 다시 주행하는 폐쇄 루프를 프로세스 내 tool call 43회로 완주했으며 실행 코드는 `examples/ros2/use_ros/`에 있다.

벤치마크 기능 자체는 선언형으로 제공된다. `list_benchmarks`, `register_benchmark_from_file`, `evaluate_benchmark` 세 액션이 있고 locomotion 표준 세트는 `simulation/builtin_benchmarks.py`에 들어 있다. 과제별 세트는 어댑터 코드가 아니라 JSON 파일 하나로 추가한다.

성능 관련 언급으로는 `mock` provider가 카메라 렌더링을 건너뛰어 약 10배 빠르다는 것, `run_policy(fast_mode=True)`가 단계 사이 대기를 생략해 배치 평가와 데이터 수집을 앞당긴다는 것, GR00T 추론에 TensorRT를 적용해 ViT를 fp8, LLM을 nvfp4, DiT를 fp8로 낮출 수 있다는 것이 있다. 어느 쪽도 측정값은 제시되지 않는다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

README가 스스로 밝히는 제약과 문서 자체의 공백을 함께 정리한다.

- **하드웨어와 GPU 의존 구간**: 5단계 루프 중 teleoperation 수집과 실제 기기 실행은 하드웨어가, post-training은 GPU가 필요하다. 하드웨어 없이 검증되는 범위는 시뮬레이션까지다.
- **무거운 선택 의존성**: Isaac Sim 런타임 약 30GB, cuRobo와 motionbricks와 VERA는 PyPI에 없어 소스 설치, `rclpy`는 ROS 2 배포판 source가 필요하다. `sim-isaac`과 `sim-gs`는 GPU 전용이라 `[all]`에서 빠진다.
- **의존성 해석의 취약함**: Newton은 MuJoCo 요구를 자기 `[sim]` extra 아래에만 선언해 해석기가 적용하지 않으므로, `sim-newton`이 `mujoco`와 `mujoco-warp`를 직접 한 계열로 고정하고 `newton`을 다음 minor에서 끊는다. `gsplat`은 소스 배포판이라 최초 사용 시 `nvcc`로 CUDA 커널을 JIT 컴파일한다.
- **업그레이드 함정**: 버킷 읽기는 0.5.1 이상이 필요한데 `pip install "strands-robots[...]"`는 기존 설치가 있으면 아무것도 올리지 않고 넘어간다. 0.4.1에서는 `TypeError: open() got an unexpected keyword argument 'repo_type'`이 난다. `-U`를 붙여야 한다.
- **플랫폼 우회 코드**: macOS에서 torchcodec이 Homebrew ffmpeg를 찾지 못하는 문제를 `import strands_robots` 시점에 `DYLD_FALLBACK_LIBRARY_PATH`를 채워 우회한다. 일반 스크립트 실행에서는 인터프리터를 한 번 다시 실행하며, Jupyter와 pytest 안에서는 실행하지 않고 필요한 `export` 한 줄만 출력한다.
- **보안 부담이 조작자에게 남는다**: `trust_remote_code`는 명시 동의를 요구하고, WAN이나 클라우드 라우터에서는 topic ACL 파일 작성이 사실상 필수이며, CA pin 회전은 사람이 수행하는 4단계 절차다. 라이브러리가 안전한 기본값을 주지만 다중 로봇 운영 구성은 여전히 사람의 몫이다.
- **문서 내부 불일치**: 시뮬레이션 액션 개수가 67과 77로 엇갈리고, 로봇 수는 "70종 이상"이라 쓰였지만 표에 열거된 이름은 68종이다.
- **정량 평가의 부재**: 성공률이나 throughput 같은 측정값이 없다. policy provider 사이의 성능 비교, 시뮬레이션 백엔드 사이의 속도 비교, sim2real 전이 결과가 모두 문서에 없어서 선택 근거는 사용자가 직접 만들어야 한다.
- **활발한 개발 단계**: 저장소가 2026-02에 만들어져 수집 시점 기준 7개월가량 되었고 로드맵은 project board가 진실의 원천이라고 명시한다. API 안정성을 전제하기에는 이른 시점이다.

## 6. 관련 연구 (Related Work)

- **LeRobot** (Hugging Face): 실제 하드웨어 구동, 데이터셋 형식, 로컬 VLA 추론의 토대다. `lerobot_local`과 `lerobot_async` provider, `lerobot_train` 도구, LeRobotDataset 기록이 전부 여기에 기댄다.
- **NVIDIA Isaac GR00T**: `groot` policy provider와 `gr00t_inference` 도구가 붙는 humanoid foundation model. `data_config` 27종이 GR00T의 embodiment 스키마를 그대로 따른다.
- **NVIDIA Cosmos 3**: omnimodal VLA. WebSocket policy server로 붙으며 `openpi-client` 의존과 numpy 버전 고정을 피해 LeRobot과 한 환경에서 공존한다.
- **MuJoCo와 MuJoCo Menagerie, robot_descriptions**: 기본 물리 엔진과 로봇 자산 공급원이다.
- **NVIDIA Newton과 Warp, Isaac Sim**: GPU 시뮬레이션 백엔드.
- **cuRobo, MoveIt2, OMPL**: 비-VLA policy 쪽 참조 구현이 기대는 고전 planner 계열.
- **SONIC과 GR00T whole-body control**: `wbc` extra가 ONNX 체크포인트로 humanoid locomotion을 담당한다.
- **MIT VERA**: 영상에서 action을 도출하는 2단계 planner. git 설치 전용 provider다.
- **Eclipse Zenoh, AWS IoT Core, Amazon SageMaker**: mesh 전송과 다중 로봇 연결, 관리형 학습 인프라.
- **Strands Agents (harness-sdk)**: 이 라이브러리가 도구를 공급하는 상위 에이전트 프레임워크.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| `Robot()` 팩토리 | 이름과 mode로 백엔드를 골라 실제 인스턴스를 그대로 돌려주는 진입점. 래퍼가 아니라 팩토리라 반환된 객체의 메서드를 직접 부를 수 있다 |
| `data_config` | GR00T가 특정 embodiment에 기대하는 영상 키와 상태 키의 조합을 이름 붙인 스키마. 27종이 저장소에 들어 있다 |
| `TrainSpec` | 데이터셋 경로, 기반 모델, 출력 경로, 방식, step 수를 담아 `Trainer`에 넘기는 학습 명세. SageMaker에서는 이 명세가 문자열 하이퍼파라미터로 실려 컨테이너에서 복원된다 |
| mega-episode | 모든 프레임이 `episode_index=0` 하나에 몰려 기록됐는데도 정상 개수를 보고하는 데이터셋 손상 유형. `verify_dataset_episodes`가 parquet을 읽어 잡아낸다 |
| self-healing 스키마 | 잘못된 파라미터를 프로세스 중단 없이 유효 목록을 담은 메시지로 거부해 에이전트가 호출 규약을 학습하게 하는 방식 |
| `SimEngine` | 시뮬레이션 백엔드가 구현하는 추상 클래스. entry point 그룹 `strands_robots.backends`로 외부 패키지도 등록할 수 있다 |
| mesh peer | Zenoh mesh에 참여한 로봇 하나. `tell`로 지시를 받고 `emergency_stop` broadcast를 수신한다 |
| `map_fn` | teleoperator와 로봇의 action 키 어휘가 다를 때 사이에 끼워 넣는 변환 함수 |

## 8. 그림 후보 (Figure Candidates)

| id | 파일 | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | `docs/assets/hero_loop.svg` | "Strands Agent를 중심에 둔 perceive, reason, act, world 폐쇄 제어 루프" | manual | ★ wiki 권장 (개요) |
| fig02 | `docs/assets/architecture_flow.svg` | "Agent, Policies, Backends, Robots 4계층과 action 하향, observation 상향 흐름" | manual | ★ wiki 권장 (구조) |
| fig03 | `docs/assets/mesh_network.svg` | "Zenoh mesh 위의 로봇 peer 발견과 조정" | manual | ★ wiki 권장 (mesh 절) |
| fig04 | `docs/assets/use_ros_agent_square.gif` | "에이전트가 turtlesim을 정사각형으로 주행시키는 실행 화면" | manual | (확인 필요, 애니메이션 GIF 293KB) |

repo 유형이라 `-figures/` 디렉토리를 만들지 않고 GitHub 원본 URL을 `raw` 필드에 기록했다. 큐레이션이 확정되면 해당 파일만 `wiki/assets/strands-labs-robots/`로 내려받는다.
