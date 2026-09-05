---
title: "NAV2 - Nav2 Docs"
type: article
year: 2026
category: physical-ai
source: nav2-2026-official-documentation.md
raw_path: raw/articles/nav2-2026-official-documentation.md
raw_filename: "nav2-2026-official-documentation.md"
source_collection: external
author: "Open Navigation LLC"
url: "https://docs.nav2.org/rolling/"
publisher: "docs.nav2.org"
tags: [physical-ai, mobile-robot]
figures:
  - id: fig05
    kind: figure
    file: assets/nav2-2026-official-documentation/crop04.png
    raw: raw/articles/nav2-2026-official-documentation-figures/crop04.png
    caption: "Nav2 공식 아키텍처 다이어그램. BT Navigator Server가 Controller, Planner, Behavior, Smoother, Route 서버를 조율한다"
    strategy: crop
    curated: true
---

## 요약

Nav2 공식 문서 사이트(docs.nav2.org)의 rolling 버전 랜딩 페이지다. Nav2 프로젝트가 스스로를 어떻게 규정하는지, 어떤 기능을 제공하는지, 전체 시스템이 어떤 서버들로 구성되는지, ROS 2 배포판마다 지원 수준이 어떻게 다른지를 한 화면에 모아 둔다. 발행 조직은 Open Navigation LLC로 Nav2의 리더십과 유지보수를 맡는다.

이 페이지가 Nav2에 대한 1차 출처다. 저장소에는 Nav2를 다루는 한국어 해설 글과 소스 저장소 페이지가 함께 있지만, 공식 정의와 아키텍처 다이어그램, 배포판 지원 상태의 근거는 이 문서에 있다. 다만 랜딩 페이지 한 장이므로 개별 알고리즘의 설정값 같은 세부는 하위 문서로 넘어가야 한다. 따라서 이 페이지는 하위 문서로 가는 경로까지 함께 정리한다.

## 배경

Nav2는 ROS 1 시대의 ROS Navigation Stack을 이어받은 후속 프로젝트다. 공식 소개는 Nav2를 "ROS Navigation Stack의 전문 지원 후속작"으로 규정하고, 자율주행 차량을 움직이는 것과 같은 종류의 기술을 모바일 로봇과 수상 로봇에 맞게 규모를 낮추고 최적화해 다시 만든 결과라고 설명한다.

프로젝트가 내세우는 성숙도 근거는 채택 규모와 계보 두 가지다. 전 세계 300개 이상의 기업이 쓰는 production-grade framework이라는 점, 그리고 15년의 유산 위에 구축했다는 점이다. 랜딩 페이지에는 정량 지표가 없어서 이 두 문구가 성숙도를 나타내는 유일한 근거다.

적용 범위를 좁히지 않는 것도 이 프로젝트의 출발점이다. 거의 모든 종류의 로봇 kinematics와 dynamics, 임의의 형상과 크기, 실내와 실외, 임의의 센서 구성을 지원한다고 밝힌다. 여기서 dynamics는 상태가 action에 따라 어떻게 변하는지를 규정하는 규칙을 말한다.

과제 유형도 A 지점에서 B 지점으로 옮겨 가는 것에 한정하지 않는다. 예를 들어 중간 pose를 거치는 이동, 물체 추종, 지정한 영역의 모든 지점을 방문하는 complete coverage navigation 같은 유형을 함께 표현할 수 있다.

기능 범위는 perception, planning, control, localization, visualization, behavior를 포괄한다. localization은 로봇이 지도 안에서 자기 위치를 추정하는 문제를 말한다. 이 요소들이 이어져 센서 데이터와 의미 정보로부터 환경 모델을 계산하고, 환경을 통과하는 경로를 동적으로 산출하며, 실행 가능한 모터 명령을 만들고, 장애물을 회피하고, 상위 수준의 로봇 behavior를 구성한다.

## 핵심 개념

Behavior Tree는 로봇의 의사결정을 트리 구조의 노드 조합으로 관리하는 제어 구조다. Nav2는 이 구조를 조율 계층으로 삼아 독립적인 여러 서버를 조건과 순서에 따라 호출한다. 약어로 BT라고 쓴다.

task server는 경로 계산, 제어 명령 산출, behavior 실행처럼 navigation 관련 작업 하나를 맡는 독립 서버다. 서버들은 Behavior Tree와 직접 결합되지 않고 action server나 service 같은 ROS 인터페이스로 통신한다. action server는 오래 걸리는 작업을 요청받아 실행하며 중간 feedback과 최종 결과를 돌려주는 ROS 2 통신 방식이다.

plugin은 서버 안에서 실제 알고리즘을 담당하는 교체 가능한 구현이다. 하나의 task server가 controller, planner, behavior용 plugin을 여러 개 보유할 수 있다. 즉 같은 서버 구성을 유지한 채 상황에 맞는 plugin을 골라 서로 다른 navigation 동작을 만든다.

costmap은 로봇 주변 환경을 이동 가능 영역과 장애물, 팽창 비용으로 표현한 2D 격자 지도다. Nav2는 이 표현을 두 층으로 나눠 쓰는데, 전체 경로 계획이 참조하는 global costmap과 주행 중 회피에 쓰이는 local costmap이다.

lifecycle node는 configure와 activate 같은 상태 전이를 명시적으로 관리하는 ROS 2 노드다. Nav2의 서버들이 이 형태로 구현되어 있고 전이를 한꺼번에 총괄하는 주체가 Lifecycle Manager다.

## 아키텍처

### 전체 구조

![[assets/nav2-2026-official-documentation/crop04.png]]
*Figure 1: Nav2 공식 아키텍처 다이어그램. 파란 영역이 Nav2 코어이고 점선 상자는 코어 바깥의 연계 구성 요소다 (Open Navigation 2026).*

다이어그램은 세 층으로 읽힌다. 위쪽 점선 상자는 Nav2를 호출하는 상위 계층이고, 가운데 파란 영역이 Nav2 코어 서버들이며, 아래쪽 점선 상자는 속도 명령이 로봇에 도달하기까지 거치는 후처리 경로다. 왼쪽에서 들어오는 네 개의 화살표가 코어로 공급되는 입력이다.

### 코어 서버

BT Navigator Server가 코어 최상단에 놓이고 나머지 서버와 양방향 화살표로 연결된다. 즉 조율은 BT Navigator Server가 맡고 개별 작업은 아래쪽 서버들이 수행한다.

| 서버 | 역할 | 다이어그램에 표시된 내부 구성 |
|---|---|---|
| BT Navigator Server | Behavior Tree를 해석해 아래 서버들을 호출하는 조율 계층 | BT Plugins |
| Controller Server | 경로를 따라가는 제어 명령을 산출하고 주행 중 충돌을 회피 | Local Costmap |
| Planner Server | 목표 지점까지의 전체 경로를 계획 | Global Costmap |
| Behavior Server | 실패나 사람 개입 같은 상황에서 사전 정의 behavior를 실행 | Costmap Sub., Footprint Sub. |
| Smoother Server | 계획된 경로를 더 연속적이고 매끄럽게 다듬음 | Costmap Sub., Footprint Sub. |
| Route Server | 코어 서버로 표시되지만 랜딩 페이지 본문에 역할 설명이 없음 | 표시 없음 |
| Lifecycle Manager | 서버들의 lifecycle 상태 전이와 watchdog을 관리 | 표시 없음 |

costmap을 직접 보유하는 서버와 구독만 하는 서버가 나뉜다. Controller Server와 Planner Server는 각각 Local Costmap과 Global Costmap을 자기 안에 두는 반면, Behavior Server와 Smoother Server는 costmap과 footprint를 구독하는 형태로 표시된다.

### 입력 인터페이스

코어 왼쪽 경계로 네 종류의 입력이 들어온다.

| 입력 | 다이어그램상 연결 |
|---|---|
| BT | 최상단의 BT Navigator Server로 들어간다 |
| TF | 좌표 변환 정보가 코어로 들어간다 |
| map | 지도 정보가 코어로 들어간다 |
| Sensor Data | 화살표 두 개로 들어가 Local Costmap과 Global Costmap 쪽으로 이어진다 |

센서 데이터가 두 줄로 그려진 것은 두 costmap이 각자 센서 입력을 받아 환경 모델을 갱신한다는 뜻이다. 즉 전체 경로 계획과 주행 중 회피가 같은 원본 센서 스트림을 서로 다른 해상도와 범위로 소비한다.

### 코어 바깥 구성 요소

다이어그램은 파란 영역 바깥에 점선 상자를 둬서 Nav2 코어와 그 주변을 구분한다.

| 구성 요소 | 위치 | 역할 |
|---|---|---|
| Waypoint Follower | 코어 위쪽 | waypoint를 순서대로 이어 하나의 임무로 실행 |
| Autonomy System | 코어 위쪽 | Nav2에 과제를 내리는 상위 자율 시스템 |
| Velocity Smoother | 코어 아래쪽 | 출력 속도를 다듬어 명령의 동적 실행 가능성을 보장 |
| Collision Monitor | 코어 아래쪽 | 원시 센서 데이터로 충돌 임박 상황을 감시 |
| Robot Base | 코어 아래쪽 | 최종 속도 명령을 받는 로봇 구동부 |

출력 경로는 한 줄로 이어진다. Controller Server에서 나온 속도 명령이 Velocity Smoother와 Collision Monitor를 차례로 지나 Robot Base에 도달한다. 즉 Nav2가 계산한 명령이 로봇에 그대로 전달되지 않고 평활화와 안전 감시를 한 번씩 거친다.

### 조율 방식

Nav2의 유연성은 두 개의 교체 지점에서 나온다. 첫째는 Behavior Tree 자체다. 로봇 하나가 여러 개의 Behavior Tree를 갖고 과제 유형에 따라 바꿔 쓸 수 있으므로, 같은 서버 구성으로 성격이 다른 임무를 수행한다. 둘째는 plugin이다. 하나의 task server가 controller, planner, behavior용 plugin을 여러 개 보유하고 상황에 맞는 것을 선택해 문맥에 따라 달라지는 navigation 동작을 만든다.

## 제공 기능

랜딩 페이지는 Nav2가 제공하는 도구를 14개 항목으로 나열하고 마지막에 "그 외 더 있다"를 덧붙인다. 성격에 따라 묶으면 다음과 같다.

| 묶음 | 기능 |
|---|---|
| 지도와 위치 | 지도 로드, 서빙, 저장 / 주어진 지도 위에서의 localization (초기 지도는 SLAM이 제공) |
| 경로 | 대형 로봇에서도 기구학적으로 실행 가능한 전체 경로 계획 / 경로 추종 제어와 동적 충돌 회피 / 경로를 더 연속적이고 매끄럽게 만드는 smoothing |
| 환경 인식 | 센서 데이터를 세계의 환경 모델로 변환 / 원시 센서 데이터로 충돌 임박 상황과 위험 상황을 감시 |
| 행동 구성 | Behavior Tree로 복잡하고 커스터마이즈 가능한 로봇 behavior 구성 / 실패나 사람 개입 상황에서 실행할 사전 정의 behavior |
| 임무 실행 | 임무를 이루는 waypoint를 순서대로 추종 |
| 시스템 운영 | 서버 프로그램의 lifecycle 관리와 watchdog / 커스텀 알고리즘과 behavior를 위한 동적 plugin 로딩 |
| 외부 인터페이스 | Nav2와 내부 task server를 파이썬답게 다루는 Python3 API / 명령의 동적 실행 가능성을 보장하는 출력 속도 smoother |

이 목록에는 알고리즘 이름이 없다. 랜딩 페이지는 시작용 plugin 묶음을 함께 제공한다고 밝히고, 흔한 behavior와 로봇 플랫폼 유형을 아우르는 알고리즘이 포함된다고 서술한 뒤 전체 목록을 Navigation Plugins 문서로 넘긴다. 따라서 어떤 planner와 controller를 고를 수 있는지는 이 페이지가 아니라 해당 하위 문서에서 확인해야 한다.

## 지원 배포판

Nav2는 여러 ROS 2 배포판에서 쓸 수 있고 배포판마다 지원 수준이 다르다. 랜딩 페이지는 이를 네 단계로 표시한다.

| ROS 2 배포판 | 지원 상태 |
|---|---|
| Rolling Ridley | Development |
| Lyrical Lynx | Active Support |
| Kilted Kaiju | Maintained |
| Jazzy Jalisco | Active Support |
| Iron Irwini | End of Life |
| Humble Hawksbill | Maintained |
| Galactic Geochelone | End of Life |

7개 배포판 중 Active Support는 Lyrical Lynx와 Jazzy Jalisco 두 개, Maintained는 Kilted Kaiju와 Humble Hawksbill 두 개다. 반면 Iron Irwini와 Galactic Geochelone은 End of Life이므로 새로 시작하는 프로젝트가 선택할 대상이 아니다. Rolling Ridley는 Development 상태인데, rolling은 ROS 2의 개발 최전선 배포판이라서 정식 배포판이 여기서 주기적으로 갈라져 나온다. 이 문서 자체가 rolling 버전이라는 점도 함께 고려해야 한다.

## 문서 구성과 시작 경로

랜딩 페이지는 하위 문서의 목차를 겸한다. 왼쪽 사이드바가 제공하는 구성은 다음과 같다.

| 묶음 | 하위 문서 |
|---|---|
| Getting Started | Quickstart, Build and Install, Dev Container, Navigation Concepts, Nav2 Behavior Trees |
| Tutorials | Plugin Tutorials, General Tutorials |
| Configuration & Development | First-Time Robot Setup Guide, Navigation Plugins, Configuration Guide, Tuning Guide, Simple Commander API, Migration Guides, API Docs |
| Community | Getting Involved, Maintainer Docs, Roadmaps, ROSCon Talks |
| About & Contact | Related Projects, Citations |

본문 상단은 세 개의 진입 버튼으로 시작 경로를 좁혀 준다.

- Get Started: Getting Started 문서로 이동한다. 처음 설치하고 실행해 보는 경로다.
- Concepts: Navigation Concepts 문서로 이동한다. 아키텍처와 용어를 먼저 이해하려는 경로다.
- First-Time Setup: First-Time Robot Setup Guide로 이동한다. 자기 로봇에 Nav2를 처음 올리는 경로다.

설정과 튜닝은 Configuration & Development 묶음이 담당한다. Configuration Guide가 파라미터를, Tuning Guide가 성능 조정을, Navigation Plugins가 선택 가능한 알고리즘 목록을, Simple Commander API가 파이썬 인터페이스를, Migration Guides가 배포판 사이의 이전을 다룬다. 문서 상단에는 배포판 선택기가 있어 다른 버전의 문서로 전환할 수 있고 저장소 링크는 ros-navigation/navigation2를 가리킨다.

## 프로젝트 운영

Open Navigation LLC가 프로젝트를 이끌고 Nav2 관련 전문 서비스도 제공한다. 랜딩 페이지는 서비스가 필요하면 info@opennav.org로 연락하라고 안내한다.

스폰서는 등급별로 표시된다.

| 등급 | 스폰서 |
|---|---|
| Platinum | Dexory |
| Gold | NVIDIA, Polymath Robotics, AMD |
| Silver | StereoLabs, 3Laws, Stær |
| Friends of Nav2 | BOPA Precision Agriculture, Botronics |

인용 요청도 명시한다. navigation framework나 이 저장소의 알고리즘, 거기서 얻은 아이디어를 사용하면 논문에 인용해 달라고 요구하며 Citations 문서로 연결한다. 실제 인용 대상 논문 목록은 이 랜딩 페이지가 아니라 저장소 README와 Citations 문서에 있다.

## 한계

랜딩 페이지 한 장이라는 성격에서 오는 제약이 뚜렷하다.

- 개념 설명과 설정법, plugin 목록 같은 실질 내용은 모두 하위 문서에 있다. 이 페이지가 제공하는 것은 정의와 기능 목록, 아키텍처 다이어그램, 배포판 상태, 그리고 목차다.
- 아키텍처 다이어그램은 서버 구성과 데이터 흐름을 보여주지만 각 서버가 어떤 알고리즘을 쓰는지, 어떤 파라미터를 노출하는지는 담지 않는다.
- Route Server는 다이어그램에만 등장하고 본문에 설명이 없다. 역할을 알려면 별도 문서를 확인해야 한다.
- 정량 평가가 없다. 성능 근거로 제시되는 것은 300개 이상 기업의 채택과 15년의 계보라는 서술뿐이다.
- rolling 버전 문서라서 내용이 계속 바뀐다. 이 페이지가 근거로 삼는 것은 2026년 8월 28일 수집본이다.

수집 자체의 한계도 하나 있다. 본문 텍스트만 추출한 단계에서는 아키텍처 다이어그램이 누락되어 "임베드할 도식이 없다"고 기록되어 있었다. 2026년 9월 재작성 때 수집된 이미지를 다시 판독해 다이어그램을 찾아 본 페이지에 반영했다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| task server | 경로 계산, 제어 명령 산출, behavior 실행 등 navigation 작업 하나를 맡는 독립 서버. Behavior Tree가 조율한다 |
| Behavior Tree | 로봇의 의사결정을 트리 구조의 노드 조합으로 관리하는 제어 구조. 약어는 BT |
| costmap | 이동 가능 영역과 장애물, 팽창 비용을 담은 2D 격자 지도. global과 local 두 층으로 쓴다 |
| complete coverage navigation | 지정한 영역의 모든 지점을 방문하는 과제 유형. 청소나 방제 로봇이 대표 사례다 |
| lifecycle node | configure와 activate 같은 상태 전이를 명시적으로 관리하는 ROS 2 노드. Lifecycle Manager가 전이를 총괄한다 |
| rolling | ROS 2의 개발 최전선 배포판. 정식 배포판이 여기서 주기적으로 갈라져 나온다 |

## 관련 페이지

- [[physical-ai/ros-navigation-navigation2]]: Nav2 소스 저장소 페이지. 이 문서가 프로젝트의 공식 정의와 아키텍처를 담당한다면, 저장소 페이지는 코드 구성과 빌드, 인용 논문 목록을 담당한다.
- [[physical-ai/lionhong-2023-nav2-core-concepts]]: Nav2 주요 개념을 한국어로 정리한 해설 글. 공식 Navigation Concepts 문서의 내용을 상당 부분 옮겨 놓았으므로 개념을 더 깊게 읽고 싶을 때 이어서 본다.
- [[physical-ai/yhoons-2024-ros2-nav2-intro]]: Nav2 한국어 입문 글. 처음 접하는 독자가 공식 문서보다 먼저 읽기 좋은 진입점이다.
- [[overviews/physical-ai-overview]]: physical-ai 카테고리의 분류 뼈대와 학습 경로 허브.
