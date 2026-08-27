---
title: "[Nav2] Nav2 주요 개념 정리"
type: article
year: 2023
category: physical-ai
source: lionhong-2023-nav2-core-concepts.md
raw_path: raw/articles/lionhong-2023-nav2-core-concepts.md
raw_filename: "lionhong-2023-nav2-core-concepts.md"
source_collection: external
author: "lionhong"
url: "https://developer-lionhong.tistory.com/84"
publisher: "developer-lionhong.tistory.com"
tags: [physical-ai, mobile-robot, slam]
figures:
  - id: fig01
    kind: figure
    file: assets/lionhong-2023-nav2-core-concepts/fig01.jpg
    raw: raw/articles/lionhong-2023-nav2-core-concepts-figures/fig01.jpg
    caption: "lifecycle이 활성화된 노드의 상태 전환 다이어그램"
    strategy: fetched
    curated: false
  - id: fig02
    kind: figure
    file: assets/lionhong-2023-nav2-core-concepts/fig02.jpg
    raw: raw/articles/lionhong-2023-nav2-core-concepts-figures/fig02.jpg
    caption: "RVIZ가 manage_nodes 서비스로 startup을 요청하면 lifecycle manager가 노드들을 configure·activate하는 예시"
    strategy: fetched
    curated: false
  - id: fig03
    kind: figure
    file: assets/lionhong-2023-nav2-core-concepts/fig03.png
    raw: raw/articles/lionhong-2023-nav2-core-concepts-figures/fig03.png
    caption: "Nav2 기본 Behavior Tree 구조 — NavigateWithReplanning 시퀀스와 RecoveryFallback 분기"
    strategy: fetched
    curated: true
  - id: fig04
    kind: figure
    file: assets/lionhong-2023-nav2-core-concepts/fig04.png
    raw: raw/articles/lionhong-2023-nav2-core-concepts-figures/fig04.png
    caption: "BT Navigator Server와 Recovery·Controller·Planner Server의 관계 — 각 서버가 plugin과 costmap을 품는다"
    strategy: fetched
    curated: true
  - id: fig05
    kind: figure
    file: assets/lionhong-2023-nav2-core-concepts/fig05.png
    raw: raw/articles/lionhong-2023-nav2-core-concepts-figures/fig05.png
    caption: "map 위에 겹쳐 그린 global costmap과 local costmap (RViz)"
    strategy: fetched
    curated: true
  - id: fig06
    kind: figure
    file: assets/lionhong-2023-nav2-core-concepts/fig06.png
    raw: raw/articles/lionhong-2023-nav2-core-concepts-figures/fig06.png
    caption: "최대 속도를 제한하는 costmap filter — 분홍 사각형이 filter mask 영역"
    strategy: fetched
    curated: false
  - id: fig07
    kind: figure
    file: assets/lionhong-2023-nav2-core-concepts/page-full.png
    raw: raw/articles/lionhong-2023-nav2-core-concepts-figures/page-full.png
    caption: "전체 페이지 스크린샷"
    strategy: screenshot
    curated: false
  - id: fig08
    kind: figure
    file: assets/lionhong-2023-nav2-core-concepts/crop01.png
    raw: raw/articles/lionhong-2023-nav2-core-concepts-figures/crop01.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig09
    kind: figure
    file: assets/lionhong-2023-nav2-core-concepts/crop02.png
    raw: raw/articles/lionhong-2023-nav2-core-concepts-figures/crop02.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig10
    kind: figure
    file: assets/lionhong-2023-nav2-core-concepts/crop03.png
    raw: raw/articles/lionhong-2023-nav2-core-concepts-figures/crop03.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig11
    kind: figure
    file: assets/lionhong-2023-nav2-core-concepts/crop04.png
    raw: raw/articles/lionhong-2023-nav2-core-concepts-figures/crop04.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig12
    kind: figure
    file: assets/lionhong-2023-nav2-core-concepts/crop05.png
    raw: raw/articles/lionhong-2023-nav2-core-concepts-figures/crop05.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig13
    kind: figure
    file: assets/lionhong-2023-nav2-core-concepts/crop06.png
    raw: raw/articles/lionhong-2023-nav2-core-concepts-figures/crop06.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig14
    kind: figure
    file: assets/lionhong-2023-nav2-core-concepts/crop07.png
    raw: raw/articles/lionhong-2023-nav2-core-concepts-figures/crop07.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig15
    kind: figure
    file: assets/lionhong-2023-nav2-core-concepts/crop08.png
    raw: raw/articles/lionhong-2023-nav2-core-concepts-figures/crop08.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig16
    kind: figure
    file: assets/lionhong-2023-nav2-core-concepts/crop09.png
    raw: raw/articles/lionhong-2023-nav2-core-concepts-figures/crop09.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig17
    kind: figure
    file: assets/lionhong-2023-nav2-core-concepts/crop10.png
    raw: raw/articles/lionhong-2023-nav2-core-concepts-figures/crop10.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig18
    kind: figure
    file: assets/lionhong-2023-nav2-core-concepts/crop11.png
    raw: raw/articles/lionhong-2023-nav2-core-concepts-figures/crop11.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig19
    kind: figure
    file: assets/lionhong-2023-nav2-core-concepts/crop12.png
    raw: raw/articles/lionhong-2023-nav2-core-concepts-figures/crop12.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
---

## 요약 (Summary)

공식 문서의 Navigation Concepts 페이지를 따라 Nav2의 기반 개념을 한국어로 정리한 글이다. 여섯 묶음으로 나눠 다룬다. action server, lifecycle node와 bond, Behavior Tree, navigation server 4종, state estimation(REP-105·TF), 환경 표현(costmap·layer·filter)이다. 공식 문서를 사실상 번역·재구성한 수준이라 개념 커버리지가 넓다.

## 주요 기여 (Key Contributions)

- 설명 순서가 아래에서 위로 간다. ROS 2 기반 개념인 action server와 lifecycle node부터 시작해 그 위에 Nav2 아키텍처를 쌓아 올린다. 다이어그램만 봐서는 안 보이던 "왜 서버들이 action 인터페이스로 통신하는가"가 이 순서에서 풀린다.
- Behavior Tree를 FSM과 대비시킨다. FSM은 state 수십 개와 transition 수백 개로 불어난다. 그 대신 트리를 왼쪽에서 오른쪽으로 탐색하며 '킥'·'걷기'·'공으로 이동' 같은 기본 요소를 재사용해 복잡한 시스템을 만든다는 설명이다.
- state estimation을 REP-105 표준의 TF 변환 두 개(map→odom, odom→base_link)로 정리한다. 어느 시스템이 어느 변환을 제공해야 하는지가 명확해서 localization·odometry 구성 요소를 배치할 때 기준이 된다.

## 방법론 및 아키텍처 (Methodology and Architecture)

action server는 navigation처럼 오래 걸리는 작업을 다루는 ROS 2 통신 방식이다. 클라이언트 요청을 받아 장기 실행 작업을 수행하고 feedback을 중간중간 돌려준다. Nav2에서는 NavigateToPose action 메시지로 최상위 BT navigator와 통신한다. BT navigator는 다시 작은 action server들을 호출해 경로 계산·제어·복구를 시킨다. action 타입은 nav2_msgs/action 네임스페이스에 모여 있다.

lifecycle node는 노드의 초기화·활성화·중지·종료 상태를 체계적으로 관리하는 ROS 2 개념이다. unconfigured에서 시작해 configure 단계를 거쳐 inactive가 된다. configure 단계에서는 on_configure()가 파라미터와 네트워킹 인터페이스, 메모리를 설정하며 여기서 activate 단계까지 거쳐야 비로소 동작한다. Nav2는 모든 서버가 nav2_util LifecycleNode wrapper를 쓴다. 이 wrapper에 포함된 bond 연결은 서버가 충돌하면 lifecycle manager에 알려 시스템을 내려버리는 안전장치다. lifecycle manager는 manage_nodes 서비스로 startup·shutdown·reset·pause·resume을 받아 노드들의 상태를 바꾼다.

Behavior Tree는 ROS 1 move_base와 가장 크게 달라진 부분이다. Nav2는 BehaviorTree.CPP V3 라이브러리 위에 자체 custom node를 얹어 트리를 구성한다. 새 node plugin을 bt_factory와 nav2_tree_node.xml에 등록하면 트리 구조를 바꿀 수 있다.

![[assets/lionhong-2023-nav2-core-concepts/fig03.png]]
*Figure: Nav2 기본 Behavior Tree 구조 — NavigateWithReplanning 시퀀스와 RecoveryFallback 분기 (lionhong 2023)*

navigation server는 네 가지다. Planner는 global 환경 표현에 접근해 목적지까지의 경로를 계산하는데 최단 경로만이 아니라 coverage path나 predefined route도 다룬다. Controller는 ROS 1의 local planner에 해당한다. local 환경 표현으로 실행 가능한 제어를 계산해 경로 추종·도킹·엘리베이터 탑승 같은 로컬 작업을 처리한다. Behavior server가 맡는 쪽은 recovery behavior다. 인식 오류로 가짜 장애물이 가득 차면 costmap을 비운다. 로봇이 끼이면 후진하거나 회전해 빠져나온다. 그래도 완전히 실패하면 이메일·SMS·Slack으로 운영자를 부르는 식이다. Smoother는 planner 출력의 울퉁불퉁함과 급격한 회전을 다듬고 고비용 영역에서 더 멀어지게 경로를 개선한다. 서버마다 여러 알고리즘 plugin을 name과 type으로 등록해 둔다. name은 별칭이고 type은 라이브러리다. BT 노드가 FollowPath 같은 이름으로 호출하면 매핑된 알고리즘(DWB·RPP 등)이 실행된다.

![[assets/lionhong-2023-nav2-core-concepts/fig04.png]]
*Figure: BT Navigator Server와 Recovery·Controller·Planner Server의 관계 — 각 서버가 plugin과 costmap을 품는다 (lionhong 2023)*

state estimation은 REP-105 표준을 따른다. map→odom 변환은 positioning system(AMCL 같은 localization, SLAM Toolbox, motion capture)이 제공하고 odom→base_link 변환은 odometry system이 제공한다. odometry는 바퀴 인코더·IMU·VIO 등 여러 원천에서 오는데 Robot Localization 패키지로 N개 센서를 융합해 부드럽고 연속적인 출력을 만드는 구성이 일반적이다. base_link 아래 센서 frame들은 정적 변환으로 URDF에 정의한다.

환경 표현의 현재 구현은 costmap이다. 미지 영역·자유 영역·점유 영역·팽창 비용으로 이루어진 2D 격자이고 costmap layer plugin이 라이다·레이더·깊이 카메라 등의 데이터를 버퍼링해 격자를 갱신한다. costmap filter는 지도에 주석을 단 filter mask로 공간 의존적 동작 변화를 만드는 layer 기반 접근이다. 접근 금지 구역, 속도 제한 구역, 창고의 선호 레인 같은 기능이 여기서 나온다.

![[assets/lionhong-2023-nav2-core-concepts/fig05.png]]
*Figure: map 위에 겹쳐 그린 global costmap과 local costmap, RViz 시각화 (lionhong 2023)*

## 결과 (Results)

개념 정리 글이라 실험·벤치마크는 없다. 라이다 없이도 REP-105 표준만 지키면 vision·depth 기반 위치 추정으로 같은 구성이 가능하다는 실무 참고가 붙어 있다.

2023년 글이라 이후 추가된 Route Server, docking 계열 패키지, MPPI controller 같은 구성 요소는 다루지 않는다. 최신 구성은 공식 문서와 repo로 보완해야 한다.

## 관련 페이지 (Related Pages)

- [[physical-ai/yhoons-2024-ros2-nav2-intro]] — 같은 주제의 더 짧은 입문 글. 공식 아키텍처 다이어그램 임베드
- [[physical-ai/nav2-2026-official-documentation]] — 이 글의 원 출처인 공식 문서
- [[physical-ai/ros-navigation-navigation2]] — 소스 repo. 글이 언급하는 nav2_lifecycle_manager 등 패키지 목록이 있다
