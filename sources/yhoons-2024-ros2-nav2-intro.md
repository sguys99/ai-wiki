---
title: "[ROS2] Nav2란?"
type: article
year: 2024
category: physical-ai
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

## 한 줄 요약 (One-line Summary)

Nav2를 처음 접하는 사람을 위한 한국어 입문 글이다. 주요 개념 다섯 가지(Behavior Tree·Planner·Controller·costmap·localization)와 시스템 아키텍처의 서버 8종을 빠르게 훑는다.

## 1. 자료 정보 (Document Information)

- 저자: yhoons (tistory 블로그), 2024-09-09 게시
- 분량이 짧은 개요 글이라 각 개념을 한두 문단으로만 다룬다. 세부는 [[physical-ai/lionhong-2023-nav2-core-concepts]]와 공식 문서 쪽이 깊다.

## 2. 주요 기여 (Key Contributions)

- Nav2를 "ROS 2 기반 자율 주행 로봇의 경로 계획·제어 Navigation Stack"으로 정의하고 ROS 1 Navigation Stack의 계승·확장이라는 위치를 잡아 준다.
- 입문자가 처음 만나는 용어 다섯 가지를 한 화면 분량으로 정리한다. Behavior Tree가 의사결정을 관리하고 Planner가 경로를 계산하며 Controller는 그 경로를 따라가는 제어를 맡는다. costmap은 환경을 2D 격자로 표현하고 localization은 위치를 추정한다. 이 역할 구분이 글의 뼈대다.
- 공식 아키텍처 다이어그램을 그대로 싣고 서버 8종의 역할을 항목별로 붙여 놓았다. 다이어그램 읽는 법을 익히기에 좋다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

전반부의 개념 정리는 Planner부터 시작한다. global과 local 두 갈래인데 global은 목적지까지의 전체 경로를 계산하고 local은 주변 장애물을 실시간 감지해 즉각적인 움직임을 계획한다. Controller는 PID·MPPI 같은 제어 방식으로 planner가 만든 경로를 실제 이동으로 옮긴다. costmap도 두 층이다. 넓은 영역의 경로 계획은 global costmap이 맡고 로봇 주변의 실시간 장애물 감지는 local costmap이 맡는다. localization은 AMCL 같은 알고리즘으로 실시간 위치를 추정한다.

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

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

벤치마크나 실험이 없는 개념 소개 글이다. Nav2를 쓰는 이유로는 네 가지를 든다. ROS 2 기반이라 처리를 분산하고 실시간으로 통신한다. 여기에 하드웨어·센서 커스터마이징 유연성, 모듈 확장성, 오픈소스 커뮤니티 지원이 더해진다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- 각 개념을 정의 수준에서만 짚는다. 설정 방법이나 plugin 종류, 알고리즘 선택 기준은 다루지 않는다.
- lifecycle·action server·TF 같은 ROS 2 쪽 기반 개념은 등장하지 않는다. 이 글만으로는 아키텍처 다이어그램의 화살표가 왜 action 인터페이스로 그려졌는지 알기 어렵다.

## 6. 관련 연구 (Related Work)

- [[physical-ai/lionhong-2023-nav2-core-concepts]] — 같은 주제를 공식 문서 개념 페이지 기준으로 훨씬 깊게 정리한 글
- [[physical-ai/nav2-2026-official-documentation]] — 공식 문서 랜딩 페이지
- [[physical-ai/ros-navigation-navigation2]] — 소스 repo

## 7. 용어집 (Glossary)

- **Nav2** — ROS 2의 navigation framework. ROS 1 Navigation Stack의 후속
- **costmap** — 로봇 주변 환경을 이동 가능 영역·장애물·팽창 비용으로 표현한 2D 격자 지도
- **AMCL** — Adaptive Monte Carlo Localization. 파티클 필터 기반 위치 추정 알고리즘
- **MPPI** — Model Predictive Path Integral. 샘플링 기반 모델 예측 제어 방식의 controller

## 8. 그림 후보 (Figure Candidates)

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | Nav2 로고 | fetched | 비권장 (로고) |
| fig02 | Nav2 시스템 아키텍처 (공식 다이어그램) | fetched | ★ wiki 권장 (architecture) |
| fig03 | 전체 페이지 스크린샷 | screenshot | 비권장 (fig02로 충분) |
| fig04~fig07 | 도식 영역 크롭 | crop | 비권장 (fig02 원본이 더 선명) |
