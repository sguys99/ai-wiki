---
title: "OpenArm: A fully open-source humanoid arm for physical AI research and deployment in contact-rich environments"
type: repo
year: 2026
category: physical-ai
raw_path: raw/repos/enactic-openarm.md
raw_filename: "enactic-openarm.md"
source_collection: external
org: "enactic"
repo: "openarm"
url: "https://github.com/enactic/openarm"
license: "Apache-2.0"
tags: [physical-ai, hardware, teleoperation, robot-dataset]
figures:
  - id: fig01
    label: OpenArm and OpenArm Cell
    kind: figure
    file: assets/enactic-openarm/fig01.png
    raw: https://raw.githubusercontent.com/enactic/openarm/main/website/static/img/hardware/openarm_and_cell.png
    caption: "왼쪽에 양팔 OpenArm 2.0, 오른쪽에 조명과 카메라와 배경을 고정한 평가 환경 OpenArm Cell"
    strategy: manual
    curated: true
  - id: fig02
    label: Motor location
    kind: figure
    file: assets/enactic-openarm/fig02.png
    raw: https://raw.githubusercontent.com/enactic/openarm/main/website/static/img/hardware/openarm-2.0/motor/location.png
    caption: "어깨에서 end-effector까지 관절별로 배치한 DAMIAO 모터 3종의 위치"
    strategy: manual
    curated: true
  - id: fig03
    label: Gripper
    kind: figure
    file: assets/enactic-openarm/fig03.png
    raw: https://raw.githubusercontent.com/enactic/openarm/main/website/static/img/hardware/openarm-2.0/gripper/gripper.png
    caption: "카메라를 케이스 안에 넣고 손가락 부품을 교체할 수 있게 만든 OpenArm 2.0 그리퍼"
    strategy: manual
    curated: true
  - id: fig04
    label: OpenArm Cell
    kind: figure
    file: assets/enactic-openarm/fig04.png
    raw: https://raw.githubusercontent.com/enactic/openarm/main/website/static/img/hardware/openarm-cell/general/openarm-cell.png
    caption: "MISUMI 프레임과 전원계로 짠 OpenArm Cell 외형과 상하로 움직이는 Z축 리프터"
    strategy: manual
    curated: true
  - id: fig05
    label: KER mapping
    kind: figure
    file: assets/enactic-openarm/fig05.png
    raw: https://raw.githubusercontent.com/enactic/openarm/main/website/static/img/hardware/openarm-ker/general/ker-mapping.png
    caption: "링크 길이를 70%로 줄인 KER의 관절 각도가 OpenArm 2.0에 1:1로 그대로 전달되는 대응 관계"
    strategy: manual
    curated: true
  - id: fig06
    label: Unilateral leader-follower control
    kind: figure
    file: assets/enactic-openarm/fig06.png
    raw: https://raw.githubusercontent.com/enactic/openarm/main/website/static/img/teleop/leader-follower/unilateral.png
    caption: "leader의 위치 명령이 follower로 한 방향으로만 전달되는 unilateral 제어 구성"
    strategy: manual
    curated: true
---

## 한 줄 요약 (One-line Summary)

OpenArm은 접촉이 잦은 과제를 겨냥한 7자유도 오픈소스 humanoid 팔로, 팔 자체와 평가 환경 OpenArm Cell과 모터 없는 leader 장치 KER를 한 묶음으로 제공해 데이터 수집부터 재현 가능한 평가까지를 하나의 스택으로 잇는다.

## 1. 자료 정보 (Document Information)

| 항목 | 값 |
|---|---|
| 저장소 | [enactic/openarm](https://github.com/enactic/openarm) |
| 조직 | Enactic |
| 라이선스 | Apache-2.0 (하드웨어 CAD 저장소 `openarm_hardware`만 CERN-OHL-S-2.0) |
| 생성 | 2024-09-29 |
| 최종 push | 2026-09-08 |
| star | 2,936 |
| 홈페이지 | [openarm.dev](https://openarm.dev), 문서 [docs.openarm.dev](https://docs.openarm.dev) |
| 가격 | 양팔 완제품 기준 6,500 USD |

이 저장소는 코드 저장소가 아니라 Docusaurus 문서 사이트다. 실제 코드는 아래 9개 저장소로 나뉘어 있고, 이 저장소의 `website/docs/`가 그 전체를 설명하는 허브 역할을 한다. 그래서 수집 시 README와 함께 문서 페이지 22개를 원문 그대로 `raw/`에 담았다.

| 저장소 | 라이선스 | 역할 |
|---|---|---|
| `openarm_hardware` | CERN-OHL-S-2.0 | STL, STEP, Fusion 360 조립체를 포함한 CAD 전체 |
| `openarm_description` | Apache-2.0 | 시뮬레이션용 URDF와 xacro 로봇 기술 파일 |
| `openarm_can` | Apache-2.0 | 저수준 모터 통신을 담당하는 CAN 제어 라이브러리 |
| `openarm_ros2` | Apache-2.0 | ROS 2 통합 패키지와 노드 |
| `openarm_teleop` | Apache-2.0 | unilateral과 bilateral 제어를 포함한 teleoperation 패키지 |
| `openarm_isaac_lab` | Apache-2.0 | Isaac Lab 시뮬레이션 환경과 학습 과제 |
| `openarm_mujoco` | Apache-2.0 | MuJoCo 기술 파일(MJCF)과 에셋 |
| `openarm_dataset` | Apache-2.0 | 데이터셋 포맷, 기록 도구, Python API |
| `dora-openarm` | Apache-2.0 | 데이터 수집과 추론과 teleoperation을 잇는 Dora 데이터플로 노드 |

## 2. 주요 기여 (Key Contributions)

- **하드웨어 3종을 한 세트로 묶은 구성.** 2.0에서 팔 하나였던 제품군이 팔, 평가 환경(OpenArm Cell), 교시 장치(KER)로 늘었다. 데이터 수집, 학습, 평가라는 한 바퀴를 같은 규격 위에서 돌리는 것이 목표다.
- **재현 가능한 평가 환경의 하드웨어화.** "Model A가 Model B보다 낫다"는 주장은 같은 조건에서 재현될 때만 의미를 갖는다는 문제의식에서 출발해, 조명과 배경과 카메라 위치와 영점 보정 절차까지 통일한 Cell을 별도 제품으로 만들었다.
- **bilateral force feedback 기반 데이터 수집.** leader와 follower 사이에 힘을 양방향으로 주고받아 조작자가 접촉을 느끼면서 시연 데이터(demonstration)를 만든다. 위치 명령만 흘리는 unilateral 방식으로는 담기지 않는 접촉 정보가 데이터에 남는다.
- **모터 없는 leader 장치 KER.** 링크 길이를 70%로 줄이면서 관절 구조는 그대로 맞춰, 좌표 변환이나 retargeting 없이 1:1 매핑이 성립하게 했다. 무게 1.7kg의 배낭형이라 장시간 수집에서 조작자 피로가 줄어든다.
- **전 부품 조달 가능성.** CNC 가공품, 3D 프린팅 케이스, 전기 배선까지 모두 구매하거나 제작할 수 있고 CAD와 BOM이 공개된다. 조립 완제품과 DIY 키트를 인증 제조사에서 구매하는 경로도 함께 제공한다.
- **학습과 추론 파이프라인 표준화.** 자체 데이터셋 포맷과 LeRobot 변환 도구, ACT policy 학습 예제, Dora 기반 추론 데이터플로와 policy server 계약을 문서로 고정했다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 OpenArm 2.0 팔

키 160~165cm 사람의 비율을 기준으로 삼은 인체 크기 설계다. 실용적인 도달 범위와 다루기 쉬운 관성 사이의 균형을 목표로 했다.

| 항목 | 값 |
|---|---|
| 자유도 | 팔 하나당 7자유도 |
| nominal payload | 4.1kg (최악 자세에서 1분 유지) |
| peak payload | 6.0kg (최악 자세로 3초 이동 후 1초 유지) |
| 관절 | QDD backdrivable, 전 축에 기계식 리미트 |
| 제어 버스 | CAN-FD |
| 구조재 | 알루미늄과 스테인리스강, MISUMI 프레임 베이스 |
| end-effector | 카메라를 내장한 소형 평행 그리퍼 |

payload에는 end-effector 무게가 포함된다. 1.5kg짜리 end-effector를 달면 nominal은 2.6kg, peak는 4.5kg으로 줄어든다.

지지 기둥은 MISUMI 알루미늄 프레임이라 치수를 조정하거나 카메라와 센서를 덧붙이기 쉽고, 베이스 플레이트에는 M6 탭이 일정 간격으로 뚫려 있어 책상에 직접 고정할 수 있다.

### 3.2 모터 구성

어깨에서 end-effector까지 관절마다 다른 모터를 배치해 payload와 크기를 함께 맞췄다. 한쪽만 지지되는 구간에는 크로스 롤러 베어링이 들어간 모터를 써서 강성과 정밀도를 확보했다. DM4340 계열은 QDD 모터가 아니지만 payload와 외형을 함께 만족시키려고 선택했다.

| 항목 | DM-J4310-2EC V1.1 | DM4340 계열 | DM-J8009P-2EC |
|---|---|---|---|
| 정격 전압 | 24V | 24V | 24V (24~48V 지원) |
| 정격 전류 | 2.5A | 2.5A | 20A |
| 최대 전류 | 7.5A | 8A | 50A |
| 정격 토크 | 3Nm | 9Nm | 20Nm |
| 최대 토크 | 7Nm | 27Nm | 40Nm |
| 정격 속도 | 120rpm | 36rpm | 24V 100rpm, 48V 200rpm |
| 무부하 최고 속도 | 200rpm | 52rpm | 24V 160rpm, 48V 320rpm |
| 감속비 | 10:1 | 40:1 | 9:1 |
| 외경 | 56mm | 57mm | 98mm |
| 높이 | 46mm | 53.3mm | 61.7mm |
| 무게 | 300g | 362g | 896g |

세 모터 모두 14비트 단회전 자기식 엔코더를 2개씩 갖고 CAN으로 통신한다.

### 3.3 그리퍼

구동 기구를 단순하게 만들어 전체 크기를 줄였다. 1.0 그리퍼보다 좁은 공간에 손을 넣기 쉽다. 카메라를 케이스 안에 넣어 grasping 도중의 손 안 시야를 직접 얻고, 손가락 형상은 안정적인 grasping과 시야 사각 최소화를 함께 노려 설계했다. 손가락 부품은 쉽게 교체할 수 있어 과제나 대상 물체에 맞춘 형상을 시험할 수 있다.

### 3.4 OpenArm Cell

robot foundation model의 성능을 비교하려면 팔 말고도 학습과 추론에 영향을 주는 요소를 모두 규격에 넣어야 한다는 것이 Cell의 전제다. 조명, 카메라, 보정 절차를 하나의 시스템으로 정의한다.

- MISUMI 등 기성품으로 구성한 외함과 전원계라 유지보수와 부품 조달이 쉽다.
- Z축을 상하로 조절해 작업물 높이에 맞춘다.
- 영역 센서 기반 침입 감지로 작업 중 사람이 들어오면 전원을 차단한다(reach-in stop).
- 영점 보정 지그가 그리퍼를 물리적으로 구속해 CAD가 정의한 각도로 맞춘다. 조립 오차와 부품 공차를 데이터에서 걷어내는 장치다.

한 대당 무게 약 100kg, 소비 전력 약 480W에 설치할 PC 전력이 더해진다. 문서는 설치 전에 건물 전기 용량과 바닥 하중, 반입 경로의 문 폭과 승강기 치수를 확인하라고 명시한다.

### 3.5 OpenArm KER

KER는 Kinematic Equivalent Replica의 약자로, OpenArm 2.0을 직관적으로 조작하기 위한 모터 없는 leader 팔이다. 관절에 자기식 엔코더와 베어링을 넣어 조작 저항을 줄였다.

- 관절 구조는 OpenArm 2.0과 정확히 같고 링크 길이만 70%로 줄여, 좌표 변환이나 retargeting 없이 1:1 동작 매핑이 성립한다.
- CFRP 파이프와 알루미늄 가공품과 수지 부품을 조합해 무게 1.7kg을 달성했다.
- 어깨에 메는 배낭형이라 도움 없이 30초 안에 착용할 수 있고, 배낭부를 접으면 일반 여행 가방에 들어간다.
- 전 축이 공통 엔코더 모듈을 쓴다. 하드웨어 리미트, 베어링, 자기식 엔코더, 드라이버를 한 몸체에 넣은 모듈이다.
- 엔코더 모듈은 개별 ID를 갖는 데이지 체인 연결을 지원해, 7+1 자유도 팔의 배선을 단순하게 유지한다.

KER는 2.0 제품군에 포함되지만 아직 출시되지 않았다. 설계 확정 후 CAD와 BOM을 공개할 예정이다.

### 3.6 teleoperation

leader에서 follower로 1:1로 전달하는 방식을 두 가지 제어 모드로 제공한다.

| 모드 | 신호 방향 | 장점 | 단점 | 적합한 과제 |
|---|---|---|---|---|
| unilateral | leader에서 follower로 위치 명령만 전달 | 단순하고 안정적이다 | 촉각 되먹임이 없어 과도한 힘을 주기 쉽다 | 자유 공간 조작, 접촉이 없는 빠른 작업 |
| bilateral | 힘을 양방향으로 주고받는다 | 조작자가 follower의 접촉을 느낀다 | 높은 control frequency와 신중한 gain 조정이 필요하다 | 접촉이 잦은 과제와 고품질 데이터 수집 |

두 모드 모두 `PeriodicTimerThread`를 상속한 클래스가 leader, follower, admin 세 스레드를 띄우는 구조를 쓴다. 제어 논리는 `Control` 클래스에 모여 있고 같은 클래스가 두 모드를 모두 지원한다.

관절마다 여섯 개의 제어와 마찰 파라미터를 둔다. Kp는 위치 제어 gain, Kd는 속도 제어 gain, Fc는 정지 마찰 수준, k는 마찰 전이의 급격함, Fv는 속도 비례 점성 마찰, Fo는 마찰 오프셋이다. 마찰을 보정할 때는 tanh 기반 모델을 쓴다.

```text
tau_f = Fc * tanh(k * dq) + Fv * dq + Fo
```

실행은 셸 스크립트로 한다. `./script/launch_bilateral.sh right_arm can0 can2`처럼 팔 방향과 leader, follower의 CAN 인터페이스를 인자로 준다. 생략하면 오른팔은 leader can0과 follower can2, 왼팔은 can1과 can3을 기본값으로 쓴다. 스크립트는 팔 방향을 검증하고 기본 CAN 인터페이스를 채운 뒤 xacro로 leader와 follower용 임시 URDF를 만들고 제어 바이너리를 실행한 다음 임시 파일을 정리한다.

문서가 경고로 못 박은 조건이 셋이다. 영점은 팔을 아래로 곧게 내린 자세이고 leader와 follower를 분리한 상태에서 각각 보정해야 한다. bilateral 제어는 500Hz 이상의 control frequency를 요구한다. gain 설정이 부적절하면 진동하거나 불안정해지므로 새 팔이나 새 부하에서는 신중히 조정해야 한다.

VR teleoperation은 별도 경로로 개발 중이다. Meta Quest 3의 손과 팔 동작을 end-effector로 매핑하며, 위치와 회전을 함께 옮기는 7자유도 제어와 손가락 사이 거리로 그리퍼를 여닫는 제스처 제어를 지원한다. TCP 스트리밍으로 약 20FPS에서 동작하고, 현재 프로토타입은 Isaac Lab 시뮬레이션에서만 확인되었다.

### 3.7 시뮬레이션

Isaac Lab 쪽은 `openarm_isaac_lab` 저장소로 공개되어 있고 NVIDIA의 Isaac Sim 5.1.0과 Isaac Lab 2.3.0 생태계에 정식 통합되었다. Python 3.11, Linux 환경을 기준으로 한다. 강화학습 기반 환경 네 개가 공개되어 있다.

- 도달(reaching)
- 큐브 들어올리기
- 서랍 열기
- OpenArm 양팔 도달

teleoperation 코드, imitation learning 코드, sim2real 코드는 공개 베타를 준비 중이라고 밝힌다.

MuJoCo 쪽은 `openarm_mujoco` 저장소의 MJCF 파일을 쓴다. `v1/openarm_bimanual.xml`을 simulate 창에 끌어다 놓으면 실행된다. MuJoCo 액추에이터는 토크 제어를 쓰기 때문에 제어 논리는 클라이언트 코드가 담당한다. MJCF는 시각용 geom 그룹(group 2)과 충돌용 geom 그룹(group 3)으로 나뉘고, 물리 계산에는 충돌 형상의 볼록 껍질이 쓰인다. MuJoCo를 모의 하드웨어 인터페이스로 삼는 ROS 2 브리지 패키지는 v1 출시 직후 공개 예정이다.

### 3.8 데이터셋 포맷

`openarm_dataset`은 pip으로 설치하는 Python 3.10 이상 패키지다. episode 하나가 디렉터리 하나이고 그 아래를 action, cameras, obs로 나눈다.

| 경로 | 내용 |
|---|---|
| `episodes/{id}/action/arms/{left,right}/qpos.parquet` | 관절 목표 위치 명령 |
| `episodes/{id}/action/lifter/elevation.parquet` | Cell 리프터 높이 명령 |
| `episodes/{id}/obs/arms/{left,right}/state.parquet` | 팔 상태 |
| `episodes/{id}/obs/lifter/elevation.parquet` | 리프터 상태 |
| `episodes/{id}/cameras/{ceiling,head_left,head_right,wrist_left,wrist_right}/*.jpeg` | 타임스탬프를 파일명으로 쓴 카메라 프레임 |
| `metadata.yaml` | episode 목록, 성공 여부, task 정보 |

API는 observation과 action을 신호 이름을 키로 하는 pandas DataFrame 사전으로 돌려준다. `arms/right/qpos`, `arms/right/qvel`, `arms/right/qtorque`, `lifter/elevation` 같은 키가 쓰이고, 한 팔의 action 열은 joint1부터 joint7까지와 gripper 여덟 개다. 카메라 프레임은 (600, 960, 3) 형태의 uint8 배열로 읽힌다. `dataset.sample(hz=30, episode_index=0)`은 observation과 action과 카메라 프레임을 같은 주기로 정렬해 policy가 한 timestep으로 받을 수 있게 만든다.

`openarm-dataset-convert` CLI가 LeRobot 데이터셋 v2.1과 v3.0으로 변환한다.

### 3.9 학습과 추론

학습 예제는 LeRobot의 ACT policy를 쓴다. 수집 데이터를 LeRobot v3.0 포맷으로 변환한 뒤 lerobot 0.6.1로 학습하며, 문서의 예제는 MuJoCo에서 모은 `enactic/openarm-2-cell-pick_up_cube_mujoco-lerobot` 데이터셋을 10,000 스텝 학습한다. 학습을 빠르게 하려고 ceiling과 head_right 카메라를 뺀 데이터셋이다.

추론은 학습된 policy를 policy server 프로세스로 띄우고 Dora 데이터플로가 로봇 런타임을 담당하는 구조다. policy server는 카메라와 관절 위치를 묶은 observation을 Arrow IPC 파일로 받아 모델을 실행하고 16차원 관절 위치의 action chunk를 JSON으로 돌려준다.

| 노드 | 역할 |
|---|---|
| dora timer | 250Hz(`millis/4`) 주기로 tick을 낸다 |
| observer | JPEG를 RGB로 바꾸고 양팔 상태를 이어 붙여 Arrow StructArray로 묶는다 |
| policy-server | `/dev/shm`의 Arrow IPC 파일과 소켓 JSON으로 추론 서버와 통신한다 |
| actions-executor | action을 30Hz에서 250Hz로 Hermite 보간하고 15Hz Biquad 저역 통과 필터를 건다 |
| 하드웨어 또는 MuJoCo | 양팔 OpenArm 2.0과 카메라 5대를 구동한다 |

policy server 계약은 새 모델을 붙일 때 구현해야 하는 인터페이스다. 요청은 `data_path`와 카메라 해상도가 담긴 metadata를 가진 JSON 한 줄로 오고, 응답은 `interval`(다음 위치까지의 나노초 간격), 선택 항목인 `cutoff_hz`(저역 통과 필터 차단 주파수), `positions`(길이 T의 16차원 위치 목록) 세 필드를 가진 JSON 한 줄이다. 16차원의 배열은 오른팔 7개, 오른쪽 그리퍼 1개, 왼팔 7개, 왼쪽 그리퍼 1개 순서다. 이번 tick에서 추론을 건너뛰려면 빈 `positions`를 돌려준다.

실행 방식은 디버깅용 로컬 policy server와 Docker 컨테이너 policy server 두 가지다. 문서의 예제는 MuJoCo 데이터로 40,000 스텝 학습한 `enactic/act-openarm-2-cell-pick_up_cube_mujoco` 모델을 쓴다.

### 3.10 제어 소프트웨어 계층

`openarm_can`은 리눅스 SocketCAN을 감싸 고수준 제어 애플리케이션과 저수준 모터 프로토콜을 잇는 C++ 라이브러리이며 Python 바인딩을 제공한다. 세 계층으로 나뉜다.

| 계층 | 구성 |
|---|---|
| `can/socket` | `OpenArm`(전체 조율), `ArmComponent`(다중 모터 협조), `GripperComponent`(그리퍼 논리를 가진 단일 모터) |
| `damiao_motor` | `DMDeviceCollection`(모터 그룹 기반 클래스), `Motor`, `DMCANDevice` |
| `canbus` | `CANSocket`, `CANDeviceCollection`, `CANDevice` |

모터 제어는 DAMIAO 프로토콜의 MIT 제어 모드를 쓴다. `MITParam`은 kp, kd, q, dq, tau 다섯 값을 담고, 상태 되먹임으로 위치와 속도와 토크와 온도를 받는다. 콜백 모드는 제어 응답용 `STATE`와 파라미터 조회용 `PARAM`으로 나뉜다. 모터 활성화나 파라미터 조회처럼 느린 동작에는 1,000~2,000마이크로초, 빠른 제어에는 300~500마이크로초의 타임아웃을 권장한다.

Dora 노드군은 로봇 제어, 데이터 수집, 브리지, 추론, 유틸리티, 모의 노드 여섯 가지다. 모의 노드(`dummy` 접두어)는 실제 기기 없이 데이터플로를 돌려볼 수 있게 해 CI와 개발에 쓰인다.

### 3.11 안전 지침

문서는 안전 요구사항 여섯 가지를 그림과 함께 제시한다. 평평하고 안정된 면에 나사나 클램프로 고정할 것, 동작 범위 안에 사람이나 물건이 들어가지 않게 할 것, 보안경을 포함한 보호구를 착용할 것, 지정된 payload 한도 안에서 쓸 것, 비상 정지 장치의 위치와 조작을 숙지할 것, 위험 요소를 기록하고 지속적으로 개선할 것이다.

backdrivability가 높다는 특성은 안전 측면에서 주의 항목이 된다. 비상 정지로 전원이 끊기면 들고 있던 부하가 빠르게 낙하한다.

유지보수 항목으로는 베이스와 관절 나사의 풀림, 기계식 리미트의 변형이나 파손, 관절의 이상 소음과 걸림, 배선과 커넥터 손상을 든다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

이 저장소는 성능 수치를 겨루는 자료가 아니라 하드웨어와 소프트웨어 규격을 공개하는 자료다. 문서가 제시하는 정량 값은 다음과 같다.

| 항목 | 값 |
|---|---|
| 자유도 | 팔 하나당 7 |
| payload | nominal 4.1kg, peak 6.0kg (end-effector 포함) |
| 양팔 시스템 가격 | 6,500 USD |
| Cell 무게와 소비 전력 | 약 100kg, 약 480W (PC 별도) |
| KER 무게 | 1.7kg, 링크 길이 비율 70% |
| bilateral control frequency | 500Hz 이상 |
| 추론 데이터플로 | tick 250Hz, action 출력 30Hz, Hermite 보간 후 250Hz |
| 카메라 | 5대, 프레임 600x960 |
| action 차원 | 16 (팔 7 + 그리퍼 1) x 2 |
| 공개 Isaac Lab 환경 | 4개 |
| 학습 예제 | ACT policy, MuJoCo 데이터 10,000 스텝(문서 예제)과 40,000 스텝(공개 모델) |

정확도와 반복 정밀도, 소비 전력에 관한 문서는 준비 중이라고 FAQ에 적혀 있다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- KER는 아직 출시되지 않았고 CAD와 BOM도 공개되지 않았다.
- 정확도와 반복 정밀도 수치가 공개되지 않아 성능 재현성 주장을 정량으로 검증할 수 없다.
- 이동 베이스 계획이 없다. 문서는 다른 프로젝트와의 통합을 권한다.
- VR teleoperation은 시뮬레이션 프로토타입 단계이고 실제 기기 연동은 예정 상태다.
- Isaac Lab 쪽 teleoperation과 imitation learning과 sim2real 코드가 아직 공개 베타 전이다.
- MuJoCo ROS 2 브리지 패키지는 v1 출시 이후로 미뤄져 있다.
- CAN 장치는 1.0 BOM에 실린 CAN-FD 모델만 검증되어 있고 그 밖의 장치는 예기치 않은 동작을 낼 수 있다.
- Cell은 무게와 전력 요구가 커서 설치 장소의 전기 용량, 바닥 하중, 반입 경로를 사전에 확인해야 한다.

## 6. 관련 연구 (Related Work)

- ACT는 이 저장소의 학습 예제가 그대로 쓰는 policy다. 양팔 조작에서 action chunking과 temporal ensembling을 세운 연구다.
- LeRobot은 OpenArm 데이터셋의 변환 대상 포맷이자 학습 도구다. `openarm-dataset-convert`가 v2.1과 v3.0을 지원한다.
- Genesis World와 RoboCasa는 물리 시뮬레이션과 대규모 과제 생성을 담당하는 쪽이고, OpenArm은 실제 기기와 그 기기를 재현 가능하게 만드는 환경 쪽이다.
- GR00T와 openpi는 policy 쪽 foundation model이고, OpenArm은 그 policy를 검증할 하드웨어와 평가 환경을 공급한다.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| QDD | Quasi-Direct Drive의 약어. 감속비를 낮게 잡아 모터의 힘을 관절에 거의 직접 전달하는 구동 방식 |
| backdrivability | 외력으로 관절을 밀었을 때 모터가 순순히 밀리는 정도. 접촉 안전과 bilateral 제어의 전제 |
| OpenArm Cell | 조명, 배경, 카메라 위치, 영점 보정을 규격화한 평가 환경 하드웨어 |
| KER (Kinematic Equivalent Replica) | 관절 구조는 같고 링크만 70%로 줄인 모터 없는 leader 팔 |
| reach-in stop | 영역 센서가 작업 공간 침입을 감지하면 전원을 차단하는 안전 기능 |
| 영점 보정 지그 | 그리퍼를 물리적으로 구속해 CAD 정의 각도로 맞추는 Cell의 전용 치구 |
| MIT 제어 모드 | kp, kd, q, dq, tau를 함께 보내 위치와 속도와 토크를 한 번에 지정하는 DAMIAO 모터 제어 방식 |
| MJCF | MuJoCo가 장면의 구성 요소를 기술하는 XML 파일 형식 |
| policy server 계약 | 새 모델을 붙일 때 구현해야 하는 observation 입력과 action 출력의 JSON 규약 |
| Dora 데이터플로 | 독립 프로세스 노드들이 Arrow 배열을 주고받도록 YAML로 배선한 실행 그래프 |

## 8. 그림 후보 (Figure Candidates)

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | OpenArm 2.0과 OpenArm Cell을 나란히 보여주는 대표 이미지 | manual | 별표 wiki 권장 (overview) |
| fig02 | 관절별 DAMIAO 모터 배치 | manual | 별표 wiki 권장 (hardware) |
| fig03 | 카메라를 내장한 2.0 그리퍼 | manual | 별표 wiki 권장 (hardware) |
| fig04 | OpenArm Cell 외형과 Z축 | manual | 별표 wiki 권장 (evaluation) |
| fig05 | KER와 OpenArm 2.0의 1:1 매핑 | manual | 별표 wiki 권장 (teleoperation) |
| fig06 | unilateral leader-follower 구성도 | manual | 별표 wiki 권장 (method) |
