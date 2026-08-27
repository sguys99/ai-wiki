---
title: "Nav2 (ROS 2 Navigation Stack)"
type: repo
year: 2018
category: physical-ai
raw_path: raw/repos/ros-navigation-navigation2.md
raw_filename: "ros-navigation-navigation2.md"
source_collection: external
org: "ros-navigation"
repo: "navigation2"
url: "https://github.com/ros-navigation/navigation2"
license: "LGPL-2.1-or-later / Apache-2.0 (per-package mixed)"
tags: [physical-ai, mobile-robot]
figures:
  - id: fig01
    kind: figure
    file: assets/ros-navigation-navigation2/nav2_logo.png
    raw: https://raw.githubusercontent.com/ros-navigation/navigation2/main/doc/nav2_logo.png
    caption: "Nav2 로고"
    strategy: manual
    curated: false
  - id: fig02
    kind: figure
    file: assets/ros-navigation-navigation2/sponsors_oct_2025.png
    raw: https://raw.githubusercontent.com/ros-navigation/navigation2/main/doc/sponsors_oct_2025.png
    caption: "2025-10 기준 스폰서 로고 모음"
    strategy: manual
    curated: false
---

## 한 줄 요약 (One-line Summary)

ROS 2 navigation framework Nav2의 소스 repo다. README에는 문서 링크 목차와 스폰서, 인용 논문 5편, 40개 가까운 구성 패키지의 빌드 상태 표가 들어 있다. 패키지 지도와 학술 계보를 확인할 때 본다.

## 1. 자료 정보 (Document Information)

- org/repo: ros-navigation/navigation2 (2018-05 생성, 구 ros-planning/navigation2)
- 라이선스: 패키지별 혼합 — LGPL-2.1-or-later와 Apache-2.0이 섞여 있다. 코드를 인용하거나 재사용할 때는 해당 패키지의 라이선스를 개별 확인해야 한다
- 유지보수: Open Navigation LLC (Steve Macenski 주도)
- README 본문은 실질 설명 대신 docs.nav2.org로 가는 링크 목차 역할을 한다

## 2. 주요 기여 (Key Contributions)

- Nav2의 학술 인용 계보가 README에 정리되어 있다. framework 전체를 인용할 때는 Marathon 2 논문(IROS 2020)을 쓴다. 알고리즘 분석은 ROS 2 모바일 로봇 알고리즘 서베이(RAS 2023)다. Smac Planner(Hybrid A*·State Lattice·2D)에는 Cost-Aware Kinematically Feasible Planning(IEEE RA-P 2026), Regulated Pure Pursuit controller에는 Autonomous Robots 2023 논문이 붙는다. VSLAM 비교는 IROS 2021 논문을 안내한다.
- 빌드 상태 표가 사실상의 패키지 카탈로그다. humble·jazzy·lyrical 배포판별로 각 패키지의 소스·데비안 빌드 상태를 나열한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

빌드 표에 나온 패키지를 기능 묶음으로 정리했다.

| 묶음 | 패키지 |
|---|---|
| 조율·수명 관리 | nav2_bt_navigator, nav2_behavior_tree, nav2_lifecycle_manager, nav2_bringup |
| 경로 계획 | nav2_planner, nav2_navfn_planner, nav2_smac_planner, nav2_theta_star_planner, nav2_route |
| 제어 | nav2_controller, nav2_dwb_controller, nav2_mppi_controller, nav2_regulated_pure_pursuit, nav2_graceful_controller, nav2_rotation_shim_controller |
| 환경 표현 | nav2_costmap_2d, nav2_voxel_grid, nav2_map_server |
| localization | nav2_amcl |
| 안전·후처리 | nav2_collision_monitor, nav2_velocity_smoother, nav2_smoother, nav2_constrained_smoother |
| 복구·미션 | nav2_behaviors, nav2_waypoint_follower |
| 도킹·추종 | nav2_docking(opennav_docking 계열), nav2_following |
| 개발 지원 | nav2_simple_commander(Python3 API), nav2_rviz_plugins, nav2_loopback_sim, nav2_system_tests, nav2_msgs, nav2_util, nav2_core, nav2_common, nav2_ros_common |

서버 하나가 패키지 하나로 떨어지는 구조라 [[physical-ai/yhoons-2024-ros2-nav2-intro]]의 아키텍처 다이어그램에 나오는 서버 이름과 패키지 이름이 거의 1:1로 대응한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

README 자체에는 벤치마크가 없다. 속도·경로 품질 같은 성능 주장은 인용 논문 쪽에 있다. 특히 Marathon 2와 Smac Planner 논문이다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- README 스냅샷만으로는 각 패키지의 알고리즘 세부나 설정법을 알 수 없다. 필요하면 docs.nav2.org의 해당 페이지나 인용 논문 PDF를 추가로 수집한다.
- 배포판 지원 상태는 계속 바뀐다. 이 스냅샷은 2026-08 기준이다. 최신 상태는 [[physical-ai/nav2-2026-official-documentation]]의 배포판 표와 repo를 재확인해야 한다.

## 6. 관련 연구 (Related Work)

- [[physical-ai/nav2-2026-official-documentation]] — 공식 문서 랜딩 페이지
- [[physical-ai/yhoons-2024-ros2-nav2-intro]] · [[physical-ai/lionhong-2023-nav2-core-concepts]] — 한국어 해설 글
- 인용 논문 5편 (미수집): Marathon 2 (arXiv:2003.00368), ROS 2 알고리즘 서베이 (arXiv:2307.15236), Smac Planner (arXiv:2401.13078), Regulated Pure Pursuit (arXiv:2305.20026), VSLAM 비교 (arXiv:2107.07589)

## 7. 용어집 (Glossary)

- **Smac Planner** — Hybrid A*·State Lattice·2D A*를 묶은 Nav2의 기구학 인지 planner 패키지
- **Regulated Pure Pursuit (RPP)** — 곡률·충돌 위험에 따라 속도를 조절하는 pure pursuit 변형 controller
- **simple commander** — Nav2 task server들을 Python3로 다루는 API 패키지
- **loopback sim** — 물리 시뮬레이터 없이 odometry를 되먹여 navigation을 시험하는 경량 시뮬레이터

## 8. 그림 후보 (Figure Candidates)

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | Nav2 로고 | manual (GitHub URL) | 비권장 (로고) |
| fig02 | 스폰서 로고 모음 | manual (GitHub URL) | 비권장 |

repo 내 이미지는 로고·스폰서뿐이라 wiki 임베드 후보가 없다. 아키텍처 도식은 [[physical-ai/yhoons-2024-ros2-nav2-intro]] fig02를 쓴다.
