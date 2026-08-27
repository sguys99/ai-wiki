---
title: "[ROS2] Nav2란?"
type: article
year: 2024
category: physical-ai
source: yhoons-2024-ros2-nav2-intro.md
raw_path: raw/articles/yhoons-2024-ros2-nav2-intro.md
raw_filename: "yhoons-2024-ros2-nav2-intro.md"
source_collection: external
author: "yhoons"
url: "https://yhoons.tistory.com/101"
publisher: "yhoons.tistory.com"
tags: [physical-ai, mobile-robot]
figures:
  - id: fig01
    kind: figure
    file: assets/yhoons-2024-ros2-nav2-intro/fig01.png
    raw: raw/articles/yhoons-2024-ros2-nav2-intro-figures/fig01.png
    caption: "Nav2 로고 (Open Navigation)"
    strategy: fetched
    curated: false
  - id: fig02
    kind: figure
    file: assets/yhoons-2024-ros2-nav2-intro/fig02.png
    raw: raw/articles/yhoons-2024-ros2-nav2-intro-figures/fig02.png
    caption: "Nav2 시스템 아키텍처 — BT Navigator Server가 Controller·Planner·Behavior·Smoother·Route Server를 조율하고, 출력이 Velocity Smoother와 Collision Monitor를 거쳐 로봇에 전달된다"
    strategy: fetched
    curated: true
  - id: fig03
    kind: figure
    file: assets/yhoons-2024-ros2-nav2-intro/page-full.png
    raw: raw/articles/yhoons-2024-ros2-nav2-intro-figures/page-full.png
    caption: "전체 페이지 스크린샷"
    strategy: screenshot
    curated: false
  - id: fig04
    kind: figure
    file: assets/yhoons-2024-ros2-nav2-intro/crop01.png
    raw: raw/articles/yhoons-2024-ros2-nav2-intro-figures/crop01.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig05
    kind: figure
    file: assets/yhoons-2024-ros2-nav2-intro/crop02.png
    raw: raw/articles/yhoons-2024-ros2-nav2-intro-figures/crop02.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig06
    kind: figure
    file: assets/yhoons-2024-ros2-nav2-intro/crop03.png
    raw: raw/articles/yhoons-2024-ros2-nav2-intro-figures/crop03.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig07
    kind: figure
    file: assets/yhoons-2024-ros2-nav2-intro/crop04.png
    raw: raw/articles/yhoons-2024-ros2-nav2-intro-figures/crop04.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
---

## 요약 (Summary)

Nav2를 처음 접하는 사람을 위한 한국어 입문 글이다. 주요 개념 다섯 가지(Behavior Tree·Planner·Controller·costmap·localization)와 시스템 아키텍처의 서버 8종을 빠르게 훑는다. Nav2는 ROS 2 기반 자율 주행 로봇의 경로 계획·제어 Navigation Stack이고, ROS 1 Navigation Stack을 계승·확장한 프로젝트다.

## 주요 기여 (Key Contributions)

- 입문자가 처음 만나는 용어 다섯 가지를 한 화면 분량으로 정리한다. Behavior Tree가 의사결정을 관리하고 Planner가 경로를 계산하며 Controller는 그 경로를 따라가는 제어를 맡는다. costmap은 환경을 2D 격자로 표현하고 localization은 위치를 추정한다. 이 역할 구분이 글의 뼈대다.
- 공식 아키텍처 다이어그램을 그대로 싣고 서버 8종의 역할을 항목별로 붙여 놓았다. 다이어그램 읽는 법을 익히기에 좋다.
- 세부는 [[physical-ai/lionhong-2023-nav2-core-concepts]]와 공식 문서 쪽이 깊다.

## 방법론 및 아키텍처 (Methodology and Architecture)

전반부의 개념 정리는 Planner부터 시작한다. global과 local 두 갈래인데 global은 목적지까지의 전체 경로를 계산하고 local은 주변 장애물을 실시간 감지해 즉각적인 움직임을 계획한다. Controller는 PID·MPPI 같은 제어 방식으로 planner가 만든 경로를 실제 이동으로 옮긴다. costmap도 두 층이다. 넓은 영역의 경로 계획은 global costmap이 맡고 로봇 주변의 실시간 장애물 감지는 local costmap이 맡는다. localization은 AMCL 같은 알고리즘으로 실시간 위치를 추정한다.

![[assets/yhoons-2024-ros2-nav2-intro/fig02.png]]
*Figure: Nav2 시스템 아키텍처 — BT Navigator Server가 하위 서버들을 조율하고 출력이 Velocity Smoother·Collision Monitor를 거쳐 로봇에 전달된다 (yhoons 2024, 공식 다이어그램)*

후반부에서는 아키텍처를 서버 단위로 나눠 본다.

| 서버 | 역할 |
|---|---|
| BT Navigator Server | Behavior Tree로 여러 서버와 통신하며 전체 navigation 과정을 관리. BT Plugin으로 확장 |
| Controller Server | local costmap으로 주변 장애물을 인식해 속도·방향을 실시간 제어 |
| Planner Server | global costmap으로 시작점부터 목표점까지 경로를 계획 |
| Behavior Server | 경로를 못 찾거나 막혔을 때의 복구 행동을 정의. costmap·footprint 구독으로 환경 정보를 반영 |
| Smoother Server | 생성된 경로의 각진 부분을 매끄럽게 수정 |
| Route Server | 복잡한 지도에서 더 고차원적인 경로 데이터를 처리 |
| Velocity Smoother | 급격한 속도 변화를 막아 안정적인 주행을 만든다 |
| Collision Monitor | 충돌을 실시간 감시·방지 |
| Lifecycle Manager | 각 서버의 상태를 확인하고 재시작·재구성을 관리 |

## 결과 (Results)

벤치마크나 실험이 없는 개념 소개 글이다. Nav2를 쓰는 이유로는 네 가지를 든다. ROS 2 기반이라 처리를 분산하고 실시간으로 통신한다. 여기에 하드웨어·센서 커스터마이징 유연성, 모듈 확장성, 오픈소스 커뮤니티 지원이 더해진다.

각 개념을 정의 수준에서만 짚는 글이라 설정 방법이나 plugin 종류, 알고리즘 선택 기준은 다루지 않는다. lifecycle·action server·TF 같은 ROS 2 쪽 기반 개념도 등장하지 않는다.

## 관련 페이지 (Related Pages)

- [[physical-ai/lionhong-2023-nav2-core-concepts]] — 같은 주제를 공식 문서 개념 페이지 기준으로 훨씬 깊게 정리한 글
- [[physical-ai/nav2-2026-official-documentation]] — 공식 문서 랜딩 페이지
- [[physical-ai/ros-navigation-navigation2]] — 소스 repo. 서버 이름과 패키지 이름이 거의 1:1로 대응한다
