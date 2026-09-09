---
title: "OpenArm: A fully open-source humanoid arm for physical AI research and deployment in contact-rich environments"
type: repo
year: 2026
category: physical-ai
source: enactic-openarm.md
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

## 요약

OpenArm은 일본 Enactic이 공개한 7자유도 오픈소스 humanoid 팔이다. humanoid는 사람과 비슷한 몸 구조를 갖춰 사람용 공간과 도구를 그대로 쓰도록 만든 로봇을 말한다. CAD와 펌웨어와 제어 코드와 시뮬레이션 자산이 모두 공개되어 있고, 양팔 완제품 기준 가격은 6,500 USD다.

2.0에서 이 프로젝트의 범위는 팔 하나에서 세 가지 하드웨어로 넓어졌다. 팔 자체인 OpenArm 2.0, 조명과 카메라와 배경과 영점 보정을 규격화한 평가 환경 OpenArm Cell, 그리고 모터가 없는 leader 팔 OpenArm KER다. 세 가지를 함께 두는 이유는 데이터 수집과 학습과 평가를 같은 규격 위에서 반복하기 위해서다.

저장소 자체는 코드가 아니라 문서 사이트다. 실행 코드는 하드웨어 CAD, 로봇 기술 파일, CAN 라이브러리, ROS 2 통합, teleoperation, Isaac Lab, MuJoCo, 데이터셋, Dora 노드 아홉 개 저장소로 나뉘어 있고, `enactic/openarm`은 그 전체를 설명하는 허브다.

![[assets/enactic-openarm/fig01.png]]
*Figure 1: 왼쪽이 양팔 OpenArm 2.0, 오른쪽이 평가 환경 OpenArm Cell (enactic/openarm README)*

## 배경

로봇 foundation model 연구에서 "Model A가 Model B보다 낫다"는 주장은 두 모델이 같은 조건에서 평가되었을 때만 의미를 갖는다. 그런데 실제 기기 실험에서 조건을 맞추기는 어렵다. 조명과 배경과 카메라 위치가 연구실마다 다르고, 같은 기종의 팔이라도 조립 공차 때문에 영점이 미세하게 어긋난다.

OpenArm 2.0은 이 문제를 소프트웨어가 아니라 하드웨어로 푼다. 팔과 함께 평가 환경 전체를 제품으로 규격화해서, 세계 어디서 수행한 실험이든 같은 조건에서 재현되도록 만든다는 구상이다.

두 번째 배경은 접촉이 잦은 과제의 데이터 품질이다. 위치 명령만 흘려보내는 teleoperation으로는 조작자가 물체와의 접촉을 느끼지 못한다. teleoperation은 사람이 로봇을 원격으로 움직여 시연을 만드는 방식을 말한다. 힘을 양방향으로 주고받는 bilateral 방식을 기본 기능으로 둔 것은 접촉 정보가 담긴 시연 데이터(demonstration)를 모으기 위해서다.

세 번째 배경은 접근성이다. 연구용 humanoid 팔의 가격이 개인 연구자와 소규모 연구실의 진입을 막아 왔다. OpenArm은 CNC 가공품부터 3D 프린팅 케이스와 전기 배선까지 모든 부품을 구매하거나 제작할 수 있게 하고, CAD와 BOM을 공개하며, 인증 제조사를 통한 조립 완제품과 DIY 키트 구매 경로도 함께 제공한다.

## 핵심 개념

**QDD와 backdrivability.** QDD는 Quasi-Direct Drive의 약어로, 감속비를 낮게 잡아 모터의 힘을 관절에 거의 직접 전달하는 구동 방식이다. backdrivability는 외력으로 관절을 밀었을 때 모터가 순순히 밀리는 정도를 말한다. 이 두 성질이 있어야 사람이 로봇을 밀었을 때 로봇이 위험하게 버팅기지 않고, 조작자가 follower의 접촉을 손으로 느끼는 bilateral 제어도 성립한다.

**payload의 두 정의.** OpenArm은 payload를 두 조건으로 나눠 적는다. nominal payload는 가장 불리한 자세에서 1분 동안 들고 있을 수 있는 무게이고, peak payload는 팔을 내린 자세에서 가장 불리한 자세까지 3초에 걸쳐 옮긴 뒤 1초 유지하고 되돌아올 수 있는 무게다. 두 값 모두 end-effector 무게를 포함한다. end-effector는 로봇 팔 끝에서 물체와 접촉하는 부분을 가리킨다.

**leader와 follower.** teleoperation에서 사람이 직접 움직이는 쪽이 leader, 그 동작을 따라 하는 쪽이 follower다. OpenArm은 leader로 같은 기종의 팔을 쓰는 방식과 모터 없는 KER를 쓰는 방식을 모두 제공한다.

**control frequency.** control frequency는 로봇이 1초에 몇 번 새로운 action을 갱신하는지를 뜻한다. bilateral 제어가 500Hz 이상을 요구하는 것과 추론 데이터플로가 250Hz로 tick을 내는 것이 모두 이 값이다.

## 하드웨어

### OpenArm 2.0 팔

키 160~165cm 사람의 비율을 기준으로 삼은 인체 크기 설계다. 도달 범위와 관성 사이의 균형을 목표로 했고, 관성이 작아야 사람 곁에서 안전하고 반응이 빠르다는 판단이 깔려 있다.

| 항목 | 값 |
|---|---|
| 자유도 | 팔 하나당 7 |
| nominal payload | 4.1kg (최악 자세에서 1분 유지) |
| peak payload | 6.0kg (최악 자세로 3초 이동 후 1초 유지) |
| 관절 | QDD backdrivable, 전 축에 기계식 리미트 |
| 제어 버스 | CAN-FD |
| 구조재 | 알루미늄과 스테인리스강, MISUMI 프레임 베이스 |
| end-effector | 카메라를 내장한 소형 평행 그리퍼 |

payload에 end-effector가 포함된다는 점은 실제 설계에서 크게 작용한다. 문서의 예를 그대로 옮기면, 1.5kg짜리 end-effector를 달았을 때 실제로 다룰 수 있는 무게는 nominal 2.6kg, peak 4.5kg으로 줄어든다.

지지 기둥은 MISUMI 알루미늄 프레임이라 치수를 조정하거나 카메라와 센서를 덧붙이기 쉽다. 베이스 플레이트에는 M6 탭이 일정 간격으로 뚫려 있어 책상에 직접 고정할 수 있고, 각 관절에는 동작 범위를 제한하는 기계식 리미트가 들어간다.

### 모터 구성

어깨에서 end-effector까지 관절마다 다른 모터를 배치했다. 어깨 쪽에는 큰 토크가 필요하고 손목 쪽에는 가벼움이 중요하다는 요구를 각각 다른 모델로 맞춘 것이다. 한쪽만 지지되는 구간에는 크로스 롤러 베어링이 들어간 모터를 써서 강성과 정밀도를 확보했다.

![[assets/enactic-openarm/fig02.png]]
*Figure 2: 어깨에서 end-effector까지 관절별로 배치한 DAMIAO 모터 3종 (enactic/openarm, Hardware Motor)*

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

세 모터 모두 14비트 단회전 자기식 엔코더를 2개씩 갖고 CAN으로 통신한다. 감속비를 보면 설계 의도가 드러난다. 10:1과 9:1은 backdrivability를 살리는 낮은 감속비이고, 40:1인 DM4340 계열은 QDD 모터가 아니다. 문서는 이 선택을 payload와 외형을 함께 만족시키기 위한 절충으로 설명한다.

### 그리퍼

2.0 그리퍼의 설계 목표는 크기 축소, 손 안 시야 확보, 형상 교체 가능성 세 가지다.

- 구동 기구를 단순하게 만들어 전체 크기를 줄였다. 1.0 그리퍼보다 좁은 공간에 손을 넣기 쉽다.
- 카메라를 케이스 안에 넣어 grasping 도중의 손 안 시야를 직접 얻는다. grasping은 물체를 안정적으로 쥐는 동작을 말한다. 손가락 형상은 안정적인 grasping과 시야 사각 최소화를 함께 노려 설계했다.
- 손가락 부품을 쉽게 교체할 수 있어, 그리퍼 전체를 다시 설계하지 않고도 과제나 대상 물체에 맞춘 형상을 시험할 수 있다.

![[assets/enactic-openarm/fig03.png]]
*Figure 3: 카메라를 케이스 안에 넣고 손가락 부품을 교체할 수 있게 만든 2.0 그리퍼 (enactic/openarm, Hardware Gripper)*

### OpenArm Cell

Cell은 2.0에서 새로 나온 하드웨어이며, 팔이 아니라 팔을 둘러싼 환경을 규격화한다. 학습과 추론에 영향을 주는 조명과 카메라와 보정 절차를 하나의 시스템으로 정의하는 것이 목적이다.

| 구성 요소 | 역할 |
|---|---|
| MISUMI 기반 외함과 전원계 | 기성품으로 구성해 유지보수와 부품 조달을 쉽게 한다 |
| Z축 리프터 | 상하로 조절해 작업물 높이에 맞춘다 |
| reach-in stop | 영역 센서가 작업 공간 침입을 감지하면 전원을 차단한다 |
| 영점 보정 지그 | 그리퍼를 물리적으로 구속해 CAD가 정의한 각도로 맞춘다 |

영점 보정 지그는 재현성 관점에서 가장 중요한 부품이다. 조립 오차와 부품 공차는 개체마다 다르고 데이터에 그대로 실린다. 지그로 모든 자유도를 이상적인 각도에 물리적으로 구속하면 그 편차가 데이터에서 걷힌다.

설치에는 물리적 제약이 따른다. 한 대당 무게가 약 100kg, 소비 전력이 약 480W이고 여기에 PC 전력이 더해진다. 문서는 설치 전에 건물 전기 용량과 바닥 하중, 그리고 반입 경로의 문 폭과 승강기 치수를 확인하라고 명시한다.

![[assets/enactic-openarm/fig04.png]]
*Figure 4: MISUMI 프레임과 전원계로 짠 OpenArm Cell 외형 (enactic/openarm, Hardware OpenArm Cell)*

### OpenArm KER

KER는 Kinematic Equivalent Replica의 약자로, OpenArm 2.0을 조작하기 위한 모터 없는 leader 팔이다. 관절에 자기식 엔코더와 베어링만 넣어 조작 저항을 줄였고, 모터가 없으니 조작자가 무거운 팔을 억지로 움직일 일이 없다. 장시간 데이터 수집에서 피로를 줄이는 것이 목표다.

설계의 핵심은 관절 구조를 OpenArm 2.0과 정확히 일치시키고 링크 길이만 70%로 줄인 점이다. 관절 각도가 그대로 대응하므로 좌표 변환이나 retargeting 없이 1:1 매핑이 성립한다. retargeting은 사람 동작 데이터를 로봇 형상에 맞게 변환하는 과정을 말하는데, KER에서는 그 단계 자체가 필요 없다.

![[assets/enactic-openarm/fig05.png]]
*Figure 5: 링크 길이를 70%로 줄인 KER의 관절 각도가 OpenArm 2.0에 1:1로 전달되는 대응 관계 (enactic/openarm, Hardware OpenArm KER)*

| 항목 | 값 |
|---|---|
| 무게 | 1.7kg (CFRP 파이프, 알루미늄 가공품, 수지 부품 조합) |
| 착용 방식 | 어깨에 메는 배낭형, 도움 없이 30초 안에 착용 |
| 휴대성 | 배낭부를 접으면 일반 여행 가방에 들어간다 |
| 자유도 | 7+1 |
| 공개 상태 | 미출시, 설계 확정 후 CAD와 BOM 공개 예정 |

전 축이 공통 엔코더 모듈을 쓴다. 하드웨어 리미트, 베어링, 자기식 엔코더, 드라이버를 한 몸체에 넣은 모듈이며, 여러 방향에서 고정할 수 있어 장착 자유도가 높다. 모듈마다 개별 ID를 갖는 데이지 체인 연결을 지원하므로 7+1 자유도 팔의 배선이 단순해진다. 모듈을 잇는 프레임을 직접 설계하면 다른 형태의 입력 장치를 만드는 기반으로도 쓸 수 있다.

## teleoperation

### 두 가지 제어 모드

leader에서 follower로 1:1로 전달하는 방식을 두 모드로 제공한다.

| 모드 | 신호 방향 | 장점 | 단점 | 적합한 과제 |
|---|---|---|---|---|
| unilateral | leader에서 follower로 위치 명령만 전달 | 단순하고 안정적이다 | 촉각 되먹임이 없어 과도한 힘을 주기 쉽다 | 자유 공간 조작, 접촉이 없는 빠른 작업 |
| bilateral | 힘을 양방향으로 주고받는다 | 조작자가 follower의 접촉을 느낀다 | 높은 control frequency와 신중한 gain 조정이 필요하다 | 접촉이 잦은 과제와 고품질 데이터 수집 |

unilateral은 구조가 단순해 초기 시험과 자유 공간 동작에 적합하지만, 접촉 과제에서는 조작자가 힘을 가늠하지 못해 정렬이 어긋나기 쉽다. bilateral은 그 되먹임을 복원하는 대신 제어 부담을 가져간다.

![[assets/enactic-openarm/fig06.png]]
*Figure 6: leader의 위치 명령이 follower로 한 방향으로만 전달되는 unilateral 제어 구성 (enactic/openarm, Teleop Leader-Follower)*

### 제어 구현과 마찰 보정

두 모드는 같은 구현을 공유한다. `PeriodicTimerThread`를 상속한 클래스가 스레드 세 개를 띄우고, 제어 논리는 `Control` 클래스 하나에 모여 있다.

| 스레드 | 역할 |
|---|---|
| leader | leader 팔의 제어 논리 |
| follower | follower 팔의 제어 논리 |
| admin | 구성 요소 사이의 조율과 통신 |

관절마다 제어와 마찰 파라미터 여섯 개를 둔다.

| 이름 | 뜻 |
|---|---|
| Kp | 위치 제어 gain |
| Kd | 속도 제어 gain |
| Fc | 정지 마찰(Coulomb) 수준 |
| k | 마찰 전이의 급격함 |
| Fv | 속도에 비례하는 점성 마찰 |
| Fo | 마찰 오프셋 |

마찰을 보정할 때는 tanh 기반 모델을 쓴다.

```text
tau_f = Fc * tanh(k * dq) + Fv * dq + Fo
```

실행은 셸 스크립트로 한다. 팔 방향과 CAN 인터페이스를 인자로 준다.

```bash
cd openarm_teleop
./script/launch_bilateral.sh right_arm can0 can2
```

CAN 인터페이스를 생략하면 오른팔은 leader can0과 follower can2, 왼팔은 can1과 can3을 기본값으로 쓴다. 스크립트는 팔 방향을 검증하고 기본값을 채운 뒤 xacro로 leader와 follower용 임시 URDF를 만들고 제어 바이너리를 실행한 다음 임시 파일을 정리한다.

문서가 경고로 못 박은 조건이 셋이다.

- 영점은 팔을 아래로 곧게 내린 자세다. leader와 follower를 분리한 상태에서 각각 보정해야 한다.
- bilateral 제어는 500Hz 이상의 control frequency를 요구한다. 즉 1초에 500번 이상 제어 주기를 실시간으로 유지할 수 있는 시스템이어야 한다.
- gain 설정이 부적절하면 진동하거나 불안정해진다. 새 팔이나 새 부하에서는 신중히 조정해야 한다.

### VR teleoperation

VR 경로는 별도로 개발 중이다. Meta Quest 3의 손과 팔 동작을 end-effector로 매핑하며, 위치와 회전을 함께 옮기는 7자유도 제어와 손가락 사이 거리로 그리퍼를 여닫는 제스처 제어를 지원한다. TCP 스트리밍으로 약 20FPS에서 동작한다.

현재 프로토타입은 Isaac Lab 시뮬레이션에서만 확인되었다. 실제 기기 연동, IK와 VR 추적을 활용한 동작 retargeting 개선, 그리퍼 제어와 촉각 되먹임 개선이 예정 항목으로 적혀 있다.

## 시뮬레이션

### Isaac Lab

`openarm_isaac_lab` 저장소가 NVIDIA의 Isaac Sim 5.1.0과 Isaac Lab 2.3.0 생태계에 정식 통합되어 있다. Python 3.11과 Linux를 기준으로 하고 Apache-2.0으로 배포된다. 강화학습 기반 환경 네 개가 공개되어 있다.

- 도달(reaching)
- 큐브 들어올리기
- 서랍 열기
- OpenArm 양팔 도달

teleoperation 코드, imitation learning 코드, sim2real 코드는 공개 베타를 준비 중이다. imitation learning은 시연 데이터를 흉내 내 policy를 학습하는 방법이고, sim2real은 시뮬레이션에서 학습한 policy를 실제 기기로 옮기는 문제를 말한다.

### MuJoCo

`openarm_mujoco` 저장소는 MJCF 파일을 제공한다. MJCF는 MuJoCo가 장면의 구성 요소를 기술하는 XML 형식이다. MuJoCo 바이너리를 받아 simulate 창을 띄우고 `v1/openarm_bimanual.xml`을 끌어다 놓으면 양팔 모델이 뜬다.

MuJoCo 액추에이터는 토크 제어를 쓴다. 시뮬레이션이 더 현실에 가까워지는 대신 제어 논리는 클라이언트 코드가 담당해야 한다. MJCF는 시각용 geom 그룹(group 2)과 충돌용 geom 그룹(group 3)으로 나뉘고, 물리 계산에는 충돌 형상의 볼록 껍질이 쓰인다. MuJoCo를 모의 하드웨어 인터페이스로 삼는 ROS 2 브리지 패키지는 v1 출시 직후 공개 예정이다.

## 데이터에서 policy까지

### 데이터셋 포맷

`openarm_dataset`은 pip으로 설치하는 Python 3.10 이상 패키지다. episode 하나가 디렉터리 하나이고 그 아래를 action, cameras, obs로 나눈다. episode는 과제 시작부터 종료까지의 한 실행 단위를 말한다.

| 경로 | 내용 |
|---|---|
| `episodes/{id}/action/arms/{left,right}/qpos.parquet` | 관절 목표 위치 명령 |
| `episodes/{id}/action/lifter/elevation.parquet` | Cell 리프터 높이 명령 |
| `episodes/{id}/obs/arms/{left,right}/state.parquet` | 팔 상태 |
| `episodes/{id}/obs/lifter/elevation.parquet` | 리프터 상태 |
| `episodes/{id}/cameras/{ceiling,head_left,head_right,wrist_left,wrist_right}/*.jpeg` | 타임스탬프를 파일명으로 쓴 카메라 프레임 |
| `metadata.yaml` | episode 목록, 성공 여부, task 정보 |

API는 observation과 action을 신호 이름을 키로 하는 pandas DataFrame 사전으로 돌려준다. observation은 매 timestep에 policy가 받는 센서 입력이다. 키는 `arms/right/qpos`, `arms/right/qvel`, `arms/right/qtorque`, `lifter/elevation` 형태이고, 한 팔의 action 열은 joint1부터 joint7까지와 gripper 여덟 개다. 카메라 프레임은 (600, 960, 3) 형태의 uint8 배열로 읽힌다.

`dataset.sample(hz=30, episode_index=0)`은 observation과 action과 카메라 프레임을 같은 주기로 정렬한다. 원본이 신호마다 다른 시각에 기록되기 때문에, policy가 한 timestep으로 받으려면 이 정렬 단계가 필요하다.

변환 CLI `openarm-dataset-convert`가 LeRobot 데이터셋 v2.1과 v3.0을 모두 지원한다.

### 학습

학습 예제는 LeRobot의 ACT policy를 쓴다. 수집 데이터를 LeRobot v3.0 포맷으로 변환한 뒤 lerobot 0.6.1로 학습한다.

문서의 예제는 MuJoCo에서 모은 `enactic/openarm-2-cell-pick_up_cube_mujoco-lerobot` 데이터셋을 10,000 스텝 학습한다. 학습을 빠르게 하려고 ceiling과 head_right 카메라를 뺀 데이터셋이다. 사전 준비물로 ffmpeg, GPU 장비, 모델을 Hub에 올릴 경우 Hugging Face 계정을 든다.

```bash
lerobot-train \
  --dataset.repo_id=enactic/openarm-2-cell-pick_up_cube_mujoco-lerobot \
  --policy.type=act \
  --output_dir=outputs/train \
  --policy.device=cuda \
  --steps=10000
```

### 추론 데이터플로

추론은 학습된 policy를 policy server 프로세스로 띄우고 Dora 데이터플로가 로봇 런타임을 담당하는 구조다. policy server는 카메라와 관절 위치를 묶은 observation을 Arrow IPC 파일로 받아 모델을 실행하고 16차원 관절 위치의 action chunk를 JSON으로 돌려준다. action chunk는 policy가 한 번에 출력하는 여러 timestep 분량의 action 묶음이다.

| 노드 | 역할 |
|---|---|
| dora timer | 250Hz(`millis/4`) 주기로 tick을 낸다 |
| observer | JPEG를 RGB로 바꾸고 양팔 상태를 이어 붙여 Arrow StructArray로 묶는다 |
| policy-server | `/dev/shm`의 Arrow IPC 파일과 소켓 JSON으로 추론 서버와 통신한다 |
| actions-executor | action을 30Hz에서 250Hz로 Hermite 보간하고 15Hz Biquad 저역 통과 필터를 건다 |
| 하드웨어 또는 MuJoCo | 양팔 OpenArm 2.0과 카메라 5대를 구동한다 |

주파수 변환 단계가 이 구조의 핵심이다. 모델은 30Hz로 action을 내는데 로봇은 250Hz로 명령을 받는다. actions-executor가 그 사이를 Hermite 보간으로 메우고 저역 통과 필터로 다듬어, 모델의 낮은 출력 주기가 로봇의 거친 움직임으로 이어지지 않게 한다.

### policy server 계약

새 모델을 붙일 때 구현해야 하는 인터페이스는 소켓 JSON 한 줄씩의 요청과 응답이다. 요청에는 Arrow IPC 파일 경로 `data_path`와 카메라 해상도가 담긴 metadata가 온다.

응답 필드는 셋이다.

| 필드 | 형 | 뜻 |
|---|---|---|
| `interval` | 정수(나노초) | 다음 위치까지의 시간 간격. 30Hz면 약 33ms |
| `cutoff_hz` | 수, 선택 | 저역 통과 필터의 차단 주파수. 낮으면 부드럽고 높으면 반응이 빠르다 |
| `positions` | 길이 T의 목록 | 각 항목이 16개의 실수 |

16차원 배열의 순서는 오른팔 7개, 오른쪽 그리퍼 1개, 왼팔 7개, 왼쪽 그리퍼 1개다. 이번 tick에서 추론을 건너뛰려면 빈 `positions`를 돌려준다.

실행 방식은 디버깅용 로컬 policy server와 Docker 컨테이너 policy server 두 가지다. 문서의 예제는 MuJoCo 데이터로 40,000 스텝 학습한 `enactic/act-openarm-2-cell-pick_up_cube_mujoco` 모델을 쓴다.

## 제어 소프트웨어

### CAN 라이브러리

`openarm_can`은 리눅스 SocketCAN을 감싸 고수준 제어 애플리케이션과 저수준 모터 프로토콜을 잇는 C++ 라이브러리이며 Python 바인딩을 제공한다. 세 계층으로 나뉜다.

| 계층 | 구성 |
|---|---|
| `can/socket` | `OpenArm`(전체 조율), `ArmComponent`(다중 모터 협조), `GripperComponent`(그리퍼 논리를 가진 단일 모터) |
| `damiao_motor` | `DMDeviceCollection`(모터 그룹 기반 클래스), `Motor`, `DMCANDevice` |
| `canbus` | `CANSocket`, `CANDeviceCollection`, `CANDevice` |

모터 제어는 DAMIAO 프로토콜의 MIT 제어 모드를 쓴다. `MITParam`은 kp, kd, q, dq, tau 다섯 값을 담아 위치와 속도와 토크를 한 번에 지정하고, 상태 되먹임으로 위치와 속도와 토크와 온도가 돌아온다. 콜백 모드는 제어 응답용 `STATE`와 파라미터 조회용 `PARAM`으로 나뉜다.

사용 순서는 CAN 인터페이스로 `OpenArm`을 초기화하고, 모터 종류와 CAN ID를 등록하고, 모터를 활성화하며 콜백 모드를 정하고, MIT 파라미터나 고수준 명령으로 제어한 뒤, 받은 되먹임 프레임을 해석하는 다섯 단계다. 문서는 타임아웃을 동작 성격에 따라 나누라고 권한다. 모터 활성화나 파라미터 조회처럼 느린 동작에는 1,000~2,000마이크로초, 빠른 제어에는 300~500마이크로초다. 값이 부족하면 응답을 놓쳐 통신이 실패한다.

### Dora 노드군

Dora 노드는 각각 독립 프로세스이고 Arrow 배열을 주고받으며, YAML 하나가 배선을 정의한다. 노드는 여섯 가지로 묶인다.

| 묶음 | 노드 |
|---|---|
| 로봇 제어 | `dora-openarm`, `dora-openarm-ker`, `dora-openarm-cell-lifter`, `dora-openarm-kinematics` |
| 데이터 수집 | `dora-openarm-data-collection`, 웹 UI, `dora-openarm-dataset-recorder`, 이미지 분할 노드 |
| 브리지 | `dora-openarm-mujoco` |
| 추론 | `observer`, `inference-controller`, `actions-executor`, 로컬과 Docker policy server |
| 유틸리티 | `dora-openarm-quitter` |
| 모의 노드 | `dummy` 접두어를 가진 팔, KER, 리프터, 카메라, policy server 대체 노드 |

모의 노드는 실제 기기 없이 데이터플로를 시험하게 해주므로 CI와 데이터플로 개발에 쓰인다.

## 안전

문서는 안전 요구사항 여섯 가지를 그림과 함께 제시한다.

1. 평평하고 안정된 면에 나사나 클램프로 고정하고, 깨지기 쉬운 물건과 인화성 물질과 물기에서 떨어뜨리며, 사람이 자주 지나는 통로 근처를 피한다.
2. 동작 중에는 동작 범위 안에 신체나 물건이 들어가지 않게 한다. 접근할 때는 전원이 꺼진 것을 확인한다.
3. 보안경을 기본으로 착용하고 필요에 따라 안전화와 헬멧과 장갑을 착용한다.
4. 한 팔과 양팔의 payload 한도, 그리고 end-effector의 허용 하중을 넘기지 않는다.
5. 비상 정지 장치의 위치와 조작법을 숙지한다. 스위치는 팔에서 충분히 떨어진 안전한 위치에 설치한다.
6. 사용 중 발견한 위험 요소와 개선점을 기록하고 정기적으로 검토한다.

backdrivability가 높다는 특성이 안전에서는 주의 항목이 된다. 비상 정지로 전원이 끊기면 들고 있던 부하가 빠르게 낙하한다.

점검 항목으로는 베이스와 관절 나사의 풀림, 기계식 리미트의 변형이나 파손, 관절의 이상 소음과 걸림, 배선과 커넥터 손상을 든다. 기계식 리미트가 손상된 상태로 계속 쓰면 오작동 시 관절의 이상 동작을 막지 못한다.

## 저장소 구성

| 저장소 | 라이선스 | 역할 |
|---|---|---|
| `openarm_hardware` | CERN-OHL-S-2.0 | STL, STEP, Fusion 360 조립체를 포함한 CAD 전체 |
| `openarm_description` | Apache-2.0 | 시뮬레이션용 URDF와 xacro 로봇 기술 파일 |
| `openarm_can` | Apache-2.0 | 저수준 모터 통신을 담당하는 CAN 제어 라이브러리 |
| `openarm_ros2` | Apache-2.0 | ROS 2 통합 패키지와 노드, MoveIt 설정 |
| `openarm_teleop` | Apache-2.0 | unilateral과 bilateral 제어 패키지 |
| `openarm_isaac_lab` | Apache-2.0 | Isaac Lab 시뮬레이션 환경과 학습 과제 |
| `openarm_mujoco` | Apache-2.0 | MJCF 파일과 에셋 |
| `openarm_dataset` | Apache-2.0 | 데이터셋 포맷, 기록 도구, Python API |
| `dora-openarm` | Apache-2.0 | 데이터 수집과 추론과 teleoperation을 잇는 Dora 노드 |

하드웨어 CAD만 CERN-OHL-S-2.0인 점은 사용 조건이 다르다는 뜻이다. 이 라이선스는 강한 copyleft라서 설계를 변형해 배포할 때 같은 조건을 유지해야 한다.

## 수치 정리

이 저장소는 성능을 겨루는 자료가 아니라 규격을 공개하는 자료다. 문서가 제시하는 정량 값을 한곳에 모으면 다음과 같다.

| 항목 | 값 |
|---|---|
| 자유도 | 팔 하나당 7 |
| payload | nominal 4.1kg, peak 6.0kg (end-effector 포함) |
| 양팔 시스템 가격 | 6,500 USD |
| Cell 무게와 소비 전력 | 약 100kg, 약 480W (PC 별도) |
| KER 무게와 링크 비율 | 1.7kg, 70% |
| bilateral control frequency | 500Hz 이상 |
| 추론 데이터플로 | tick 250Hz, action 출력 30Hz, 보간 후 250Hz |
| 카메라 | 5대, 프레임 600x960 |
| action 차원 | 16 (팔 7 + 그리퍼 1) x 2 |
| 공개 Isaac Lab 환경 | 4개 |
| 학습 예제 | ACT policy, 10,000 스텝(문서 예제)과 40,000 스텝(공개 모델) |

## 한계

- KER는 아직 출시되지 않았고 CAD와 BOM도 공개되지 않았다. 2.0 제품군에서 teleoperation 피로를 줄이는 부분이 아직 비어 있다는 뜻이다.
- 정확도와 반복 정밀도, 소비 전력에 관한 문서가 준비 중이다. 재현 가능한 평가를 내세우지만 기기 자체의 재현 정밀도를 정량으로 확인할 자료는 아직 없다.
- 이동 베이스 계획이 없다. 문서는 다른 프로젝트와의 통합을 권한다.
- VR teleoperation은 시뮬레이션 프로토타입 단계이고 실제 기기 연동은 예정 상태다.
- Isaac Lab 쪽 teleoperation과 imitation learning과 sim2real 코드가 아직 공개 베타 전이다.
- MuJoCo ROS 2 브리지 패키지는 v1 출시 이후로 미뤄져 있다.
- CAN 장치는 1.0 BOM에 실린 CAN-FD 모델만 검증되어 있다. 그 밖의 장치는 예기치 않은 동작을 낼 수 있다고 문서가 경고한다.
- Cell은 무게와 전력 요구가 커서 개인 연구자가 도입하기 어렵다. 팔 자체의 접근성과 평가 환경의 접근성이 같지 않다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| QDD | 감속비를 낮게 잡아 모터의 힘을 관절에 거의 직접 전달하는 구동 방식 |
| backdrivability | 외력으로 관절을 밀었을 때 모터가 순순히 밀리는 정도. 접촉 안전과 bilateral 제어의 전제 |
| OpenArm Cell | 조명, 배경, 카메라 위치, 영점 보정을 규격화한 평가 환경 하드웨어 |
| KER | 관절 구조는 같고 링크만 70%로 줄인 모터 없는 leader 팔 |
| MIT 제어 모드 | kp, kd, q, dq, tau를 함께 보내 위치와 속도와 토크를 한 번에 지정하는 DAMIAO 모터 제어 방식 |
| policy server 계약 | 새 모델을 붙일 때 구현해야 하는 observation 입력과 action 출력의 JSON 규약 |

## 관련 페이지

- [[physical-ai/zhao-2023-learning-fine-grained-bimanual-manipulation]]: OpenArm 학습 예제가 그대로 쓰는 ACT policy의 원논문. 양팔 조작에서 action chunking을 세운 연구다.
- [[physical-ai/huggingface-lerobot]]: OpenArm 데이터셋의 변환 대상 포맷이자 학습 도구. `openarm-dataset-convert`가 v2.1과 v3.0을 지원한다.
- [[physical-ai/genesis-embodied-ai-genesis-world]]: 시뮬레이션 플랫폼 쪽 자료. OpenArm이 실제 기기와 평가 환경을 맡는다면 이 저장소는 물리 엔진과 렌더러를 맡는다.
- [[physical-ai/robocasa-robocasa]]: 시뮬레이션 장면과 과제를 대량으로 만드는 저장소. 평가 조건을 시뮬레이션에서 통일하는 접근과 대비해 읽을 자료다.
- [[physical-ai/nvidia-isaac-gr00t]]: policy 쪽 foundation model. OpenArm은 그 policy를 검증할 하드웨어를 공급하는 위치에 있다.
- [[physical-ai/physical-intelligence-openpi]]: 마찬가지로 policy 쪽 공개 모델군. 하드웨어와 policy가 어떻게 분업하는지 비교할 수 있다.
- [[physical-ai/strands-labs-robots]]: 자연어로 로봇을 제어하는 라이브러리. 시뮬레이션과 실제 기기를 같은 코드로 다룬다는 점에서 OpenArm 소프트웨어 계층과 겹친다.
- [[overviews/physical-ai-overview]]: physical-ai 카테고리 전체 지도.
- [[overviews/glossary-physical-ai]]: 이 페이지의 전문 용어 표기 기준.
