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
publication_date: "2024-09-09T11:37:48+09:00"
fetched_at: "2026-08-28T07:41:01+0900"
extractor_tier: "chrome"
tags: []
figures:
  - id: fig01
    file: assets/yhoons-2024-ros2-nav2-intro/fig01.png
    raw: raw/articles/yhoons-2024-ros2-nav2-intro-figures/fig01.png
    caption: ""
    strategy: fetched
    curated: false
  - id: fig02
    file: assets/yhoons-2024-ros2-nav2-intro/fig02.png
    raw: raw/articles/yhoons-2024-ros2-nav2-intro-figures/fig02.png
    caption: ""
    strategy: fetched
    curated: false
  - id: fig03
    file: assets/yhoons-2024-ros2-nav2-intro/page-full.png
    raw: raw/articles/yhoons-2024-ros2-nav2-intro-figures/page-full.png
    caption: "전체 페이지 스크린샷"
    strategy: screenshot
    curated: false
  - id: fig04
    file: assets/yhoons-2024-ros2-nav2-intro/crop01.png
    raw: raw/articles/yhoons-2024-ros2-nav2-intro-figures/crop01.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig05
    file: assets/yhoons-2024-ros2-nav2-intro/crop02.png
    raw: raw/articles/yhoons-2024-ros2-nav2-intro-figures/crop02.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig06
    file: assets/yhoons-2024-ros2-nav2-intro/crop03.png
    raw: raw/articles/yhoons-2024-ros2-nav2-intro-figures/crop03.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig07
    file: assets/yhoons-2024-ros2-nav2-intro/crop04.png
    raw: raw/articles/yhoons-2024-ros2-nav2-intro-figures/crop04.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
---

> 수집 메모 — `scripts/fetch_article.py` 가 사용자의 명시적 URL 지시에 따라 가져왔다 (CLAUDE.md rule #1 의 자료 수집 예외). 추출 tier: `chrome`. 본문은 원문 그대로이며 요약·번역·윤문하지 않았다.
> `category` 는 임시값이므로 Step 3 에서 확정할 것.

---

## 

![](https://blog.kakaocdn.net/dna/xnU9v/btsJvSXQjaB/AAAAAAAAAAAAAAAAAAAAAM8Lc0LC2U185pwNuKdFskac8f6FbGMYGkBR7s32E7me/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1788188399&allow_ip=&allow_referer=&signature=OfG15Qel3l38VPfAuTyHrUb3LHg%3D)

## Nav2란?

Nav2 (Navigation 2)는 ROS 2를 기반으로 자율 주행 로봇의 경로 계획 및 제어를 돕는 Navigation Stack입니다.

Nav2는 ROS1의 Navigation Stack을 계승 및 확장한 버전으로, ROS 2의 장점을 적극 활용하여 더 나은 성능과 유연성을 제공합니다. Nav2는 실내, 실외 환경 모두에서 사용 가능하며, 다양한 하드웨어와 센서를 지원합니다.

### 1. Nav2의 주요 개념

#### 1.1 Behavior Tree

Behavior Tree (행동 트리)는 Nav2의 의사결정 프로세스를 관리하는 중요한 개념입니다. 이는 Nav2가 로봇의 행동을 유연하게 제어할 수 있도록 돕는 트리 구조입니다. Behavior Tree는 로봇이 다양한 상황에 맞춰 최적의 행동을 선택할 수 있도록 각 작업을 노드 형태로 구성합니다.

- 복구 행동이나 경로 계획 같은 작업을 나누어 처리
- 여러 작업을 병렬 또는 순차적으로 실행 가능

#### 1.2 Planner

Planner는 로봇이 목표 지점까지 이동할 경로를 계획하는 역할을 합니다. 이때 두 가지 계획이 존재합니다:

- Global Planner: 로봇의 현재 위치에서 목적지까지의 전체적인 경로를 계산.
- Local Planner: 로봇의 주변 장애물을 실시간으로 감지하고, 로봇의 즉각적인 움직임을 계획.

Nav2는 다양한 플래너를 지원하며, 상황에 맞게 적절한 알고리즘을 선택할 수 있습니다.

#### 1.3 Controller

Controller는 플래너가 생성한 경로를 바탕으로, 로봇이 실제로 이동할 수 있도록 제어합니다. Nav2는 PID, MPPI와 같은 다양한 제어 방식을 제공하여 로봇이 매끄럽고 정확하게 경로를 따르도록 합니다.

#### 1.4 Costmap

Nav2의 Costmap은 로봇 주변 환경을 2D 그리드로 표현하는데 사용됩니다. Costmap은 로봇이 이동할 수 있는 안전한 영역과 장애물을 정의하는 중요한 도구입니다. 이 Costmap은 Global Costmap과 Local Costmap으로 나뉘며, 각각 넓은 영역의 경로 계획과 로봇 주변의 실시간 장애물 감지를 담당합니다.

#### 1.5 Localization

Localization은 로봇이 환경 내에서 자신의 위치를 추정하는 과정입니다. 이는 Nav2의 필수 기능 중 하나로, AMCL(Adaptive Monte Carlo Localization)과 같은 알고리즘을 사용하여 실시간으로 위치를 추정합니다. Localization은 경로 계획이 올바르게 이루어지기 위해 중요한 역할을 합니다.

---

### 2. Nav2의 핵심 기능

#### 2.1 경로 계획

Nav2는 글로벌 및 로컬 경로 계획을 통해 로봇이 목적지까지 효율적이고 안전하게 이동할 수 있도록 지원합니다. 다양한 경로 계획 알고리즘을 사용하여 로봇의 주행 경로를 계산하며, 실시간으로 장애물을 피할 수 있도록 지속적으로 업데이트됩니다.

#### 2.2 복구 행동

로봇이 이동 중 장애물에 막히거나 예상치 못한 상황에 직면했을 때, Nav2는 복구 행동(Recovery Behaviors)을 통해 로봇이 다시 경로를 찾고 정상적으로 움직일 수 있도록 돕습니다. 후진, 경로 재계획 등이 대표적인 복구 행동입니다.

#### 2.3 행동 트리 기반 제어

Behavior Tree는 Nav2에서 로봇의 다양한 행동을 관리하는 중요한 요소입니다. 상황에 맞는 행동을 순차적으로 또는 병렬로 실행할 수 있으며, 트리 구조를 통해 유연하고 확장 가능한 제어가 가능합니다.

#### 2.4 모듈형 구조

Nav2는 각 기능이 독립적인 모듈로 구성되어 있어, 사용자는 필요에 맞게 기능을 확장하거나 수정할 수 있습니다. 또한, 다양한 하드웨어와 센서를 지원하여 로봇 시스템에 쉽게 통합할 수 있습니다.

---

### 3. Nav2를 사용하는 이유

- ROS 2 기반: Nav2는 ROS 2의 분산 처리 및 실시간 통신을 지원하여 더 나은 성능과 안정성을 제공
- 유연성: 다양한 하드웨어와 센서에 맞춰 쉽게 커스터마이징할 수 있으며, Behavior Tree와 같은 유연한 제어 구조를 제공
- 확장성: 사용자는 각 모듈을 쉽게 수정하거나 확장할 수 있어, 자신만의 자율 주행 로봇 시스템 구축 가능
- 커뮤니티 지원: Nav2는 ROS의 활발한 오픈소스 커뮤니티에서 지속적인 업데이트와 지원

### 4. Nav2 시스템 아키텍처

![](https://blog.kakaocdn.net/dna/bLcMNY/btsJucwM0Lo/AAAAAAAAAAAAAAAAAAAAAH4jesNJtX9sHS031SGM7PiHfiW8KcpP9mgL0PvaXFwa/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1788188399&allow_ip=&allow_referer=&signature=UMwvNWQMjdHCS8bGFDtNe0SpXQE%3D)

### 1. BT Navigator Server

- BT: Behavior Tree를 의미하며, Nav2에서 로봇의 행동을 관리하는 요소
- BT Navigator Server: Behavior Tree를 사용해 다양한 서버들과 통신하여 로봇이 목적지까지 이동할 수 있도록 전체 네비게이션 과정을 관리
- BT Plugins: 추가적인 행동을 정의하거나 확장

### 2. Controller Server

- Controller Server: 주로 로봇의 실시간 제어를 담당.
여기서 Local Costmap을 사용해 로봇 주변의 실시간 장애물을 인식하고, 이를 바탕으로 로봇의 속도나 방향을 제어.

### 3. Planner Server

- Planner Server: Global Costmap을 사용해 로봇의 시작 지점부터 목표 지점까지의 전반적인 경로를 계획.
이는 로봇이 장기적으로 어떤 경로를 따라 이동할지 결정하는 데 사용.

### 4. Behavior Server

- Behavior Server: 특정 상황에서 로봇이 어떻게 행동할지를 정의하는 서버. 예를 들어, 로봇이 경로를 찾지 못하거나 장애물에 막힌 경우 어떤 복구 행동을 할지 결정.
- Costmap Subscription과 Footprint Subscription을 사용하여 실시간으로 환경 정보를 받아 행동을 수정.

### 5. Smoother Server

- Smoother Server: 경로 계획이나 제어 과정에서 생성된 경로를 매끄럽게 수정하는 역할. 경로가 직선적이거나 각이 지지 않도록 최적화.
- 이 서버는 Costmap과 Footprint 정보를 구독하여 경로 수정 시 안전성을 유지.

### 6. Route Server

- Route Server: 로봇이 이동할 때 더 고차원적인 경로 데이터를 처리. 이는 복잡한 지도나 환경에서의 경로 최적화를 도움.

### 7. Velocity Smoother & Collision Monitor

- Velocity Smoother: 로봇의 속도를 부드럽게 조절하는 역할. 
이는 경로를 따르면서 로봇이 급격하게 속도가 변하지 않도록 조정하여, 안정적인 주행을 가능하게 함.
- Collision Monitor: 로봇이 장애물에 부딪히지 않도록 실시간으로 모니터링하며, 충돌을 방지. 

### 8. Lifecycle Manager

- Lifecycle Manager: 시스템 전반의 lifecycle를 관리. 각 서버의 상태를 확인하고, 필요한 경우 시스템을 재시작하거나 설정을 재구성. 이를 통해 안정적인 시스템 동작을 보장.
