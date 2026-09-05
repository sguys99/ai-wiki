---
title: "Nav2 (ROS 2 Navigation Stack)"
type: repo
year: 2018
category: physical-ai
source: ros-navigation-navigation2.md
raw_path: raw/repos/ros-navigation-navigation2.md
raw_filename: "ros-navigation-navigation2.md"
source_collection: external
org: "ros-navigation"
repo: "navigation2"
url: "https://github.com/ros-navigation/navigation2"
license: "LGPL-2.1-or-later / Apache-2.0 (per-package mixed)"
tags: [physical-ai, mobile-robot]
---

## 요약

ROS 2 navigation framework Nav2의 공식 소스 저장소다. 2018년 5월에 만들어졌고 이전 경로는 ros-planning/navigation2였다. 유지보수는 Open Navigation LLC가 맡으며 Steve Macenski가 프로젝트를 이끈다.

README는 설명 문서가 아니라 진입점 목록이다. 본문은 docs.nav2.org로 가는 링크 목차, 스폰서 소개, 인용 논문 5편의 BibTeX, 그리고 39행짜리 빌드 상태 표로 이루어져 있다. 알고리즘 설명이나 설정 예제는 들어 있지 않다.

따라서 이 페이지는 저장소 자체를 다룬다. 어떤 패키지가 들어 있고, 어느 배포판에서 빌드되며, 어떻게 인용하고 어떻게 기여하는지가 대상이다. Nav2가 무엇을 하는 framework인지와 아키텍처 사양은 [[physical-ai/nav2-2026-official-documentation]]이 1차 출처다.

## 저장소 구성

빌드 상태 표가 사실상의 패키지 카탈로그다. 표는 39행이며 맨 위의 navigation2는 나머지를 한꺼번에 설치하기 위한 metapackage이므로, 실제 기능 패키지는 38개다.

패키지 경계가 곧 실행 단위의 경계다. Nav2는 경로 계획과 제어, 복구 동작을 각각 독립 서버로 띄우고 Behavior Tree가 그 서버들을 호출하는 구조를 쓴다. Behavior Tree는 로봇의 의사결정을 트리 구조의 노드 조합으로 관리하는 제어 구조다. 서버 하나가 패키지 하나로 떨어지므로 [[physical-ai/yhoons-2024-ros2-nav2-intro]]의 아키텍처 다이어그램에 나오는 서버 이름과 여기 패키지 이름이 거의 1:1로 대응한다.

### 기능별 패키지 구성

README는 각 패키지가 무엇을 하는지 한 줄도 설명하지 않는다. 아래 묶음은 패키지 이름과 Nav2의 서버 구조를 근거로 정리한 것이며, 개별 패키지의 실제 역할은 문서 사이트에서 확인해야 한다.

| 묶음 | 패키지 | 개수 |
|---|---|---|
| 조율과 수명 관리 | nav2_bt_navigator, nav2_behavior_tree, nav2_lifecycle_manager, nav2_bringup | 4 |
| 경로 계획 | nav2_planner, nav2_navfn_planner, nav2_smac_planner, nav2_theta_star_planner, nav2_route | 5 |
| 경로 추종 제어 | nav2_controller, nav2_dwb_controller, nav2_mppi_controller, nav2_regulated_pure_pursuit, nav2_graceful_controller, nav2_rotation_shim_controller | 6 |
| 환경 표현 | nav2_costmap_2d, nav2_voxel_grid, nav2_map_server | 3 |
| localization | nav2_amcl | 1 |
| 안전과 후처리 | nav2_collision_monitor, nav2_velocity_smoother, nav2_smoother, nav2_constrained_smoother | 4 |
| 복구와 미션 | nav2_behaviors, nav2_waypoint_follower | 2 |
| 도킹과 추종 | nav2_docking, nav2_docking_bt, nav2_docking_core, nav2_following | 4 |
| 공통 인터페이스와 유틸리티 | nav2_core, nav2_common, nav2_ros_common, nav2_util, nav2_msgs | 5 |
| 개발과 시험 지원 | nav2_simple_commander, nav2_rviz_plugins, nav2_loopback_sim, nav2_system_tests | 4 |

경로 계획과 제어에 패키지가 가장 많이 배정되어 있다. 계획 쪽 5개와 제어 쪽 6개를 합치면 기능 패키지 38개 중 11개로, 전체의 약 30%에 해당한다. 즉 이 저장소가 가장 두껍게 다루는 문제는 "어디로 갈 것인가"와 "그 경로를 어떻게 따라갈 것인가"다.

환경 표현 묶음은 그 사이를 잇는다. nav2_costmap_2d가 센서 데이터를 costmap으로 바꾸고, 계획과 제어가 함께 그 지도를 읽는다. costmap은 로봇 주변 환경을 이동 가능 영역과 장애물, 팽창 비용으로 표현한 2D 격자 지도다.

localization 묶음에는 패키지가 하나뿐이다. localization은 로봇이 지도 안에서 자기 위치를 추정하는 문제를 말하며, 저장소는 nav2_amcl 한 패키지로 이를 담당한다.

복구와 미션 묶음의 nav2_waypoint_follower는 여러 목표 지점을 순서대로 지나가게 한다. waypoint는 경로를 이루는 중간 목표 지점이다. 같은 묶음의 nav2_behaviors는 이름 그대로 사전 정의된 동작들을 담는다.

### 릴리스 이름이 다른 패키지

저장소 안의 디렉토리 이름과 build farm이 실제로 릴리스하는 패키지 이름이 다섯 곳에서 다르다. build farm은 ROS가 배포판별로 소스와 바이너리 패키지를 자동 빌드하는 공용 인프라다.

| README 표의 이름 | 릴리스 패키지 이름 |
|---|---|
| nav2_docking | opennav_docking |
| nav2_docking_bt | opennav_docking_bt |
| nav2_docking_core | opennav_docking_core |
| nav2_following | opennav_following |
| nav2_regulated_pure_pursuit | nav2_regulated_pure_pursuit_controller |

이 차이는 실제 작업에서 문제를 일으킬 수 있다. apt로 설치하거나 package.xml의 의존성에 적을 때는 오른쪽 이름을 써야 하는데, README 표만 보고 왼쪽 이름을 적으면 패키지를 찾지 못한다. 도킹과 추종 관련 네 패키지는 opennav 접두사로, Regulated Pure Pursuit는 뒤에 controller가 붙은 이름으로 릴리스된다.

## 빌드와 설치

### 문서 진입점

README는 빌드 절차를 본문에 담지 않고 전부 외부 문서로 넘긴다. 링크 목차는 11개 항목에 15개 대상을 담고 있으며, 용도별로 나누면 다음과 같다.

| 목적 | 링크 대상 |
|---|---|
| 개념 이해와 첫 실행 | Concepts, Getting Started |
| 처음 설정 | First Time Setup Guide |
| 배포판 지원 상태 확인 | ROS Distribution Statuses |
| 소스 빌드와 컨테이너 | Build & Install, Docker Containers (GitHub Container Registry) |
| 사용 튜토리얼 | General Tutorials |
| plugin 개발 튜토리얼 | Algorithm Developer Tutorials |
| 파라미터 설정 | Configuration Guide |
| 제공 plugin 목록 | Navigation Plugins |
| 코드 레퍼런스 | API Docs (api.nav2.org) |
| 발표 자료와 인용 | ROSCon Talks, Citations |
| 버전 이전 | Migration Guides |
| 기여 절차 | Contribute |

소스를 직접 빌드하지 않는 경로도 준비되어 있다. README는 Build & Install 문서 옆에 GitHub Container Registry의 navigation2 컨테이너 이미지 링크를 나란히 두어, 환경 구성 없이 바로 실행하는 선택지를 제시한다.

### 배포판별 빌드 상태

빌드 표는 배포판 3개에 각각 Source와 Debian 두 열을 둬서 패키지당 6개 상태를 보여준다. Source는 소스 빌드 job이고 Debian은 amd64 바이너리 패키지 job이다. job URL에 각 배포판이 대상으로 삼는 Ubuntu 코드명이 드러난다.

| ROS 2 배포판 | 대상 Ubuntu | 소스 job 접두사 | 바이너리 job 접두사 |
|---|---|---|---|
| humble | Jammy | Hsrc_uj | Hbin_uj64 |
| jazzy | Noble | Jsrc_un | Jbin_un64 |
| lyrical | Resolute | Lsrc_ur | Lbin_ur64 |

이 스냅샷 시점에 저장소가 바이너리로 릴리스하는 배포판은 humble, jazzy, lyrical 세 가지다. 표에 열이 없는 배포판을 쓴다면 소스 빌드로 확인해야 하며, 배포판별 지원 등급은 [[physical-ai/nav2-2026-official-documentation]]의 배포판 표가 정리한다.

### 배포판 지원이 제한된 패키지

39행 중 36행은 여섯 칸이 모두 채워져 있다. 나머지 세 패키지만 일부 칸이 N/A로 비어 있으며, 최신 배포판에서만 릴리스된다는 뜻이다.

| 패키지 | humble | jazzy | lyrical |
|---|---|---|---|
| nav2_loopback_sim | N/A | 빌드됨 | 빌드됨 |
| nav2_following | N/A | N/A | 빌드됨 |
| nav2_ros_common | N/A | N/A | 빌드됨 |

세 패키지 모두 humble에는 없다. 따라서 humble 기반으로 작업한다면 loopback 방식의 경량 시험 환경, 추종 서버, 공통 ROS 유틸리티를 저장소에서 받을 수 없다고 보고 계획을 세워야 한다. 반대로 lyrical은 39개 패키지 전부를 갖춘 유일한 배포판이다.

## 인용 지침

README에서 가장 실질적인 정보는 인용 안내다. 저장소는 framework 전체를 쓸 때와 개별 알고리즘을 쓸 때 인용해야 할 논문을 따로 지정한다.

| 인용 대상 | 논문 | 발표처와 연도 | README의 arXiv 링크 |
|---|---|---|---|
| framework 전체 | The Marathon 2: A Navigation System | IROS 2020 | 2003.00368 |
| Nav2의 알고리즘 또는 그 분석 | From the desks of ROS maintainers: A survey of modern & capable mobile robotics algorithms in the robot operating system 2 | Robotics and Autonomous Systems 2023 | 2307.15236 |
| Smac Planner (Hybrid A*, State Lattice, 2D) | Cost-Aware Kinematically Feasible Planning for Mobile and Surface Robotics | IEEE Robotics and Automation Practice 2026 | 2401.13078 |
| Regulated Pure Pursuit controller | Regulated Pure Pursuit for Robot Path Tracking | Autonomous Robots 2023 | 2305.20026 |
| VSLAM 비교 | A Comparison of Modern General-Purpose Visual SLAM Approaches | IROS 2021 | 2107.07589 |

인용 단위가 알고리즘별로 쪼개져 있다는 점이 중요하다. Nav2의 특정 planner나 controller를 논문에서 쓸 때는 framework 인용만으로 충분하지 않고, 해당 알고리즘 논문을 함께 적어야 한다.

저자 구성을 보면 다섯 편 모두 Steve Macenski가 들어간다. Marathon 2는 Macenski, Martín, White, Ginés Clavero가 함께 썼고, 서베이는 Macenski, Moore, Lu, Merzlyakov, Ferguson이 저자다. Smac Planner 논문은 Macenski, Booker, Wallace, Fischer, Regulated Pure Pursuit 논문은 Macenski, Singh, Martin, Gines가 썼으며, VSLAM 비교는 Merzlyakov와 Macenski의 공저다.

BibTeX 항목 다섯 개 중 원문 링크를 담은 것은 Marathon 2와 VSLAM 비교 두 편뿐이다. 나머지 세 편은 저널이나 학회 정보만 적혀 있어 원문을 따로 찾아야 한다. 다섯 편 모두 이 저장소에는 수집되어 있지 않다.

## 프로젝트 운영과 기여

운영 주체가 README에 명시되어 있다. Open Navigation LLC가 프로젝트 리더십과 유지보수, 개발, 지원 서비스를 커뮤니티에 제공한다고 적혀 있으며, 상용 지원이 필요하면 info@opennav.org로 문의하도록 안내한다.

커뮤니티 창구는 문서 사이트와 Slack 워크스페이스 두 가지다. README는 Slack 초대 링크가 만료됐을 수 있으니 동작하지 않으면 유지보수자에게 재활성화를 요청하라고 덧붙인다. 기여 절차 자체는 문서 사이트의 Contribute 페이지가 담당하며, README는 링크만 둔다.

### 스폰서

저장소가 전문 유지보수 체제를 지킬 수 있는 재원은 스폰서다. README는 7개 회사를 소개하며 각각 한 문장씩 사업 영역을 붙여 놓았다.

| 스폰서 | README의 소개 |
|---|---|
| Dexory | 창고 디지털 트윈으로 재고 인사이트를 제공하는 로보틱스와 AI 물류 솔루션 |
| Nvidia | 로보틱스, 자율주행, 데이터센터, 게이밍을 구동하는 GPU와 AI 기술 |
| AMD | 임베디드 SoC, FPGA, Ryzen CPU, Radeon GPU로 로봇과 자율 시스템을 지원하는 고성능 적응형 컴퓨팅 |
| Polymath Robotics | 산업용 차량을 위한 안전 필수 navigation 시스템 |
| Stereolabs | ZED 스테레오 카메라와 neural depth부터 SLAM, 3D 물체 추적까지 잇는 비전 파이프라인 |
| 3Laws Robotics | 동적 충돌 회피 솔루션 Supervisor ROS와 Pro |
| Staer | 새 환경을 매핑하고 공간을 이해하며 이동을 계획하는 모바일 로봇 자율성 |

스폰서 구성은 Nav2의 응용 영역과 겹친다. 창고 물류와 산업 차량 같은 수요 쪽, 컴퓨팅 플랫폼과 센서 같은 공급 쪽이 함께 들어 있어, 이 framework이 상용 모바일 로봇의 배치 단계에서 쓰인다는 점을 보여준다.

### 지속적 통합

README 최상단에는 상태 배지 3개가 있다. 저장소의 품질 관리 경로가 여기서 드러난다.

| 배지 | 대상 |
|---|---|
| GitHub Actions | CI 이미지 갱신 workflow (update_ci_image.yaml) |
| Codecov | main 브랜치의 코드 커버리지 |
| CircleCI | main 브랜치의 빌드 |

코드 커버리지와 빌드가 main 브랜치 기준으로 상시 측정된다. 여기에 앞의 build farm 표가 더해져, 개발 중 상태와 배포판별 릴리스 가능 여부를 저장소 첫 화면에서 함께 확인할 수 있다.

## 라이선스

이 저장소의 라이선스는 패키지별로 섞여 있다. 수집 시점에 기록된 값은 LGPL-2.1-or-later와 Apache-2.0의 혼합이다. README 본문에는 라이선스 절이 없으므로 코드를 인용하거나 재사용할 때는 해당 패키지의 라이선스 파일을 개별 확인해야 한다.

LGPL과 Apache-2.0은 조건이 다르다. 따라서 상용 제품에 코드를 포함할 계획이라면 어떤 패키지를 가져오는지에 따라 검토 결과가 달라진다. 저장소 단위나 묶음 단위가 아니라 실제로 링크하는 패키지 단위로 확인하는 편이 안전하다.

## 한계

- README가 링크 목차라서 알고리즘 세부, 파라미터 설정법, 빌드 명령이 본문에 없다. 필요하면 docs.nav2.org의 해당 페이지나 인용 논문을 추가로 수집해야 한다.
- 벤치마크가 없다. 속도나 경로 품질 같은 성능 주장은 Marathon 2와 Smac Planner 논문이 담당하며, 두 논문 모두 이 저장소에 수집되어 있지 않다.
- 빌드 표는 스냅샷이다. 이 페이지의 근거는 2026년 8월 28일에 받은 README이며 배포판 지원 상태는 계속 바뀐다. 최신 상태는 [[physical-ai/nav2-2026-official-documentation]]의 배포판 표와 저장소를 다시 확인해야 한다.
- 패키지 기능 묶음은 README가 준 정보가 아니라 이름을 근거로 한 정리다. 경계가 애매한 패키지는 문서 사이트로 확인해야 한다.
- 저장소 안 이미지가 로고와 스폰서 배너뿐이라 wiki에 임베드할 아키텍처 도식이 없다. 공식 다이어그램은 [[physical-ai/yhoons-2024-ros2-nav2-intro]]의 fig02를 쓴다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| metapackage | 자체 기능 코드 없이 다른 패키지들을 의존성으로 묶어 한 번에 설치하게 해주는 ROS 패키지. 빌드 표 첫 행의 navigation2가 여기 해당한다 |
| build farm | ROS가 배포판별로 소스와 바이너리 패키지를 자동 빌드하는 공용 인프라. build.ros2.org의 job 상태가 README 빌드 표의 내용이다 |
| Smac Planner | Hybrid A*, State Lattice, 2D A*를 묶은 Nav2의 기구학 인지 planner 패키지 |
| Regulated Pure Pursuit | 곡률과 충돌 위험에 따라 속도를 조절하는 pure pursuit 변형 controller. 약어 RPP |
| simple commander | Nav2의 task server들을 Python3로 다루는 API 패키지 |
| loopback sim | 물리 시뮬레이터 없이 odometry를 되먹여 navigation을 시험하는 경량 시뮬레이터. odometry는 바퀴나 IMU로 이동량을 누적해 로봇의 상대 위치를 추정하는 방법이다 |

## 관련 페이지

- [[physical-ai/nav2-2026-official-documentation]]: 공식 문서 랜딩 페이지. Nav2의 기능 목록과 아키텍처, 배포판 지원 등급의 1차 출처다.
- [[physical-ai/yhoons-2024-ros2-nav2-intro]]: 한국어 입문 해설. 공식 아키텍처 다이어그램이 fig02로 실려 있다.
- [[physical-ai/lionhong-2023-nav2-core-concepts]]: Nav2 핵심 개념의 한국어 정리. costmap과 Behavior Tree의 개념 설명을 여기서 본다.
- [[overviews/physical-ai-overview]]: physical-ai 카테고리의 분류 뼈대와 학습 경로 허브.
