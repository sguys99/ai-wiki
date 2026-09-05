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
    caption: "lifecycle이 활성화된 노드들과 nav2_lifecycle_manager의 연결 구조"
    strategy: fetched
    curated: true
  - id: fig02
    kind: figure
    file: assets/lionhong-2023-nav2-core-concepts/fig02.jpg
    raw: raw/articles/lionhong-2023-nav2-core-concepts-figures/fig02.jpg
    caption: "RViz가 manage_nodes 서비스로 startup을 요청했을 때 lifecycle manager가 노드들을 configure하고 activate하는 순서"
    strategy: fetched
    curated: true
  - id: fig03
    kind: figure
    file: assets/lionhong-2023-nav2-core-concepts/fig03.png
    raw: raw/articles/lionhong-2023-nav2-core-concepts-figures/fig03.png
    caption: "Nav2 기본 Behavior Tree 구조. NavigateWithReplanning 시퀀스와 RecoveryFallback 분기"
    strategy: fetched
    curated: true
  - id: fig04
    kind: figure
    file: assets/lionhong-2023-nav2-core-concepts/fig04.png
    raw: raw/articles/lionhong-2023-nav2-core-concepts-figures/fig04.png
    caption: "BT Navigator Server와 Recovery, Controller, Planner Server의 관계. 각 서버가 plugin과 costmap을 포함한다"
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
    caption: "최대 속도를 제한하는 costmap filter. 분홍 사각형이 filter mask 영역"
    strategy: fetched
    curated: true
---

## 요약

Nav2 공식 문서의 Navigation Concepts 페이지를 한국어로 옮기고 재구성한 개념 해설이다. ROS 2 통신 방식인 action server와 lifecycle node에서 출발해 Behavior Tree, navigation server 네 종류, 상태 추정, 환경 표현까지 여섯 묶음을 차례로 다룬다.

이 글의 특징은 설명 순서가 아래에서 위로 간다는 점이다. Nav2 고유 아키텍처를 먼저 그리지 않고 ROS 2 기반 개념을 깔아 둔 다음 그 위에 Nav2 구성 요소를 쌓아 올린다. 따라서 아키텍처 다이어그램만 봐서는 드러나지 않는 "서버들이 왜 action 인터페이스로 통신하는가"가 이 순서에서 설명된다.

원문은 공식 문서를 사실상 번역하고 재구성한 수준이라 개념 커버리지가 넓다. 반면 2023년 8월 글이라 이후 추가된 구성 요소는 다루지 않으므로, 최신 구성과 각 plugin의 세부는 [[physical-ai/nav2-2026-official-documentation]]으로 넘긴다.

## 배경

Nav2가 여러 서버로 나뉜 구조를 갖는 이유는 navigation이 짧게 끝나지 않는 작업이기 때문이다. 목적지까지 이동하는 동작은 수 초에서 수 분까지 이어지고, 그동안 경로를 다시 계산하거나 장애물을 피하거나 실패를 복구해야 한다.

요청 한 번에 응답 한 번으로 끝나는 통신 방식으로는 이런 작업을 다루기 어렵다. 진행 상황을 중간에 알 수 없고 도중에 취소할 수도 없기 때문이다. ROS 2의 action server가 필요해지는 지점이 여기다.

여러 서버가 함께 동작한다는 사실은 또 다른 문제를 만든다. 어떤 서버가 아직 준비되지 않았는데 다른 서버가 먼저 일을 시작하면 시스템이 어긋나고, 서버 하나가 죽어도 나머지가 그대로 동작하면 로봇이 위험해진다. lifecycle node와 bond는 이 시작 순서와 장애 감지를 담당하는 장치다.

마지막 문제는 상황 분기다. 경로 계산 실패, 경로 추종 실패, 목표 갱신처럼 처리해야 할 경우가 늘어나면 유한 상태 기계(FSM)는 상태 수십 개와 전이 수백 개로 늘어난다. Nav2가 ROS 1의 move_base와 가장 크게 달라진 부분인 Behavior Tree가 이 문제에 대한 답이다.

## 전체 구조

원문은 Nav2 개념을 여섯 묶음으로 나눈다. 각 묶음이 어떤 질문에 답하는지를 먼저 잡아 두면 이후 절이 읽기 쉬워진다.

| 묶음 | 답하는 질문 | 해당 구성 요소 |
|---|---|---|
| action server | 오래 걸리는 작업을 어떻게 요청하고 중간 상황을 어떻게 받는가 | nav2_msgs/action, NavigateToPose |
| lifecycle node와 bond | 여러 서버를 어떤 순서로 켜고 장애를 어떻게 감지하는가 | nav2_util LifecycleNode, nav2_lifecycle_manager |
| Behavior Tree | 상황에 따른 분기를 어떻게 관리하는가 | BehaviorTree.CPP V3, BT Navigator Server |
| navigation server | 경로 계산과 추종과 복구를 누가 맡는가 | Planner, Controller, Smoother, Behavior Server |
| 상태 추정 | 로봇이 지도 안에서 자기 위치를 어떻게 아는가 | REP-105 TF 트리, amcl, SLAM Toolbox, Robot Localization |
| 환경 표현 | 주변 환경을 어떤 자료 구조로 담는가 | costmap, costmap layer, costmap filter |

## 핵심 개념

### action server

action server는 오래 걸리는 작업을 요청받아 실행하며 feedback과 최종 결과를 돌려주는 ROS 2 통신 방식이다. 클라이언트가 보낸 장기 실행 요청을 다른 프로세스나 스레드에서 수행하고, 실행이 완료되면 최종 결과를 반환한 뒤 해당 상태를 종료한다.

작업이 끝날 때까지 클라이언트가 아무 정보 없이 기다리지 않도록 action server는 중간에 feedback을 보낸다. feedback에 담기는 내용은 목표 지점까지의 각도나 성공 여부 같은 정보다. 클라이언트는 callback을 등록해 이 feedback과 최종 결과를 함께 받는다.

Nav2에서 action server는 두 층위에서 쓰인다. 바깥쪽에서는 NavigateToPose action 메시지로 최상위 BT navigator와 통신하고, 안쪽에서는 BT navigator가 다시 더 작은 action server들을 호출해 경로 계산과 동작 제어와 복구를 시킨다. 즉 같은 통신 방식이 사용자와 시스템 사이에도, 시스템 내부의 서버들 사이에도 쓰인다.

작업 성격에 따른 여러 action 타입은 nav2_msgs/action 네임스페이스 아래에 정의되어 있다. 예를 들어 로봇을 특정 위치로 옮기는 NavigateToPose action은 nav2_msgs/action/NavigateToPose 메시지 타입을 쓰며, 서버와 클라이언트는 이 타입을 통해 작업을 요청하고 결과를 주고받는다.

### lifecycle node와 bond

lifecycle node는 configure와 activate 같은 상태 전이를 명시적으로 관리하는 ROS 2 노드다. 초기화, 활성화, 일시 중지, 종료 같은 상태를 임의의 순서에 맡기지 않고 정해진 전이로 묶어 체계적으로 관리한다.

노드는 생성 직후 unconfigured 상태에 있다. 이 상태에서는 ROS 네트워크 설정이나 파라미터 읽기를 포함하지 않는 단순 생성자만 처리된다. 이후 launch 시스템이나 lifecycle manager가 configuration을 걸어 inactive로 옮기고, 다시 activating 단계를 거쳐야 노드가 비로소 동작한다.

| 단계 | 도달 상태 | 그 단계에서 하는 일 |
|---|---|---|
| 노드 생성 | unconfigured | 단순 생성자만 처리한다. ROS 네트워크 설정과 파라미터 읽기는 하지 않는다 |
| configuration | inactive | on_configure()를 트리거해 모든 파라미터와 ROS 네트워킹 인터페이스를 설정하고, 안전 시스템의 경우 동적으로 할당하는 메모리까지 확보한다 |
| activating | active | on_activate()를 트리거해 ROS 네트워킹 인터페이스를 활성화하고 정보 처리를 시작할 상태를 만든다 |
| deactivating, cleaning up, shutting down, end | 종료 경로 | 네트워크 인터페이스 비활성화, 프로세스 종료, 메모리 할당 해제가 단계별로 실행된다 |

모든 ROS 시스템은 가능하면 lifecycle node를 쓰는 것이 권장된다. Nav2는 모든 서버가 이 framework을 활용할 만큼 광범위하게 적용한 사례다. 다만 표준 LifecycleNode를 그대로 쓰지 않고 nav2_util의 LifecycleNode wrapper를 쓰는데, 일반적인 애플리케이션에는 필요 없는 복잡한 부분을 wrapper가 대신 감싸 주기 때문이다.

이 wrapper에는 bond 연결이 함께 들어 있다. bond는 서버와 lifecycle manager 사이의 생존 확인 연결로, 서버가 전이를 마친 뒤에도 active 상태를 유지하는지 확인한다. 따라서 서버가 충돌하면 lifecycle manager가 이를 알아채고 시스템을 내려 더 심각한 문제를 막는다.

### lifecycle manager

lifecycle manager는 navigation stack 전체의 시작과 종료를 한 곳에서 통제하는 노드다. amcl, map_server, planner_server처럼 lifecycle이 활성화된 노드들에 lifecycle client로 연결해 그 상태를 바꾼다.

![[assets/lionhong-2023-nav2-core-concepts/fig01.jpg]]
*Figure 1: lifecycle이 활성화된 노드들과 nav2_lifecycle_manager의 연결 구조. manager는 외부에서 service 요청을 받고, 각 노드에는 lifecycle client로 붙는다 (lionhong 2023).*

외부 인터페이스는 lifecycle_manager/manage_nodes 서비스 하나로 통일되어 있다. 클라이언트는 이 서비스로 startup, shutdown, reset, pause, resume 다섯 기능을 호출하고, lifecycle manager는 요청받은 제어를 수행하기 위해 관리 대상 노드들의 상태를 바꾼다.

![[assets/lionhong-2023-nav2-core-concepts/fig02.jpg]]
*Figure 2: RViz가 manage_nodes 서비스로 startup을 요청했을 때의 호출 순서. lifecycle manager가 Node A, B, C에 configure를 모두 보낸 뒤 activate를 다시 차례로 보낸다 (lionhong 2023).*

startup 요청의 처리 순서가 이 구조를 잘 보여 준다. 사용자가 RViz에서 startup 버튼을 누르면 RViz가 manage_nodes 서비스로 startup을 요청하고, lifecycle manager는 노드 목록에 있는 Node A와 Node B와 Node C에 대해 configure()와 activate()를 호출한다. 이때 노드마다 configure와 activate를 붙여 처리하지 않고 세 노드의 configure를 먼저 끝낸 다음 activate 단계로 넘어간다. 즉 모든 노드가 설정을 마친 상태에서 동시에 활성화되므로, 아직 준비되지 않은 서버에 다른 서버가 요청을 보내는 상황이 생기지 않는다.

## Behavior Tree 기반 의사결정

### FSM과의 차이

Behavior Tree는 로봇의 의사결정을 트리 구조의 노드 조합으로 관리하는 제어 구조다. 이름 그대로 여러 노드가 나무 가지처럼 연결된 계층 자료 구조이고, 트리를 왼쪽에서 오른쪽으로 탐색하며 서로 의존성이 없는 노드들이 실행된다.

이 방식은 상태 수십 개와 전이 수백 개까지 늘어날 수 있는 FSM과 반대되는 개념이다. 원문은 축구하는 로봇을 예로 든다. Behavior Tree를 쓰면 '킥'과 '걷기'와 '공으로 이동' 같은 기본 요소를 만들어 여러 동작에 재사용하면서 복잡한 시스템을 더 간단하게 구성할 수 있다.

### 기본 트리 구조

Nav2가 기본값으로 쓰는 트리는 두 부분으로 나뉜다. 정상 경로를 담당하는 NavigateWithReplanning 시퀀스와 복구를 담당하는 RecoveryFallback 분기다.

![[assets/lionhong-2023-nav2-core-concepts/fig03.png]]
*Figure 3: Nav2 기본 Behavior Tree 구조. 왼쪽 NavigateWithReplanning이 경로 계산과 추종을 담당하고, 오른쪽 RecoveryFallback이 복구 동작을 담당한다 (lionhong 2023).*

| 노드 | 종류 | 설정값 | 하는 일 |
|---|---|---|---|
| NavigateRecovery | RecoveryNode | number_of_retries 6 | 최상위 노드. 정상 경로가 실패하면 복구 분기로 넘기고 전체를 최대 6회까지 재시도한다 |
| NavigateWithReplanning | PipelineSequence | 없음 | 경로 계산과 경로 추종을 이어 실행하며 주기적으로 다시 계획한다 |
| RateController | RateController | hz 1.0 | 하위의 경로 계산을 1초에 한 번으로 제한한다 |
| ComputePathToPose | RecoveryNode + Action | number_of_retries 1, planner_id GridBased | 목표까지의 경로를 계산한다. 실패하면 global costmap을 비우고 한 번 재시도한다 |
| FollowPath | RecoveryNode + Action | number_of_retries 1, controller_id FollowPath | 계산된 경로를 추종한다. 실패하면 local costmap을 비우고 한 번 재시도한다 |
| RecoveryFallback | ReactiveFallback | 없음 | GoalUpdated 조건을 먼저 확인하고, 목표가 갱신되지 않았으면 복구 동작으로 넘어간다 |
| RecoveryActions | SequenceStar | 없음 | 복구 동작들을 정해진 순서대로 하나씩 실행한다 |
| ClearEntireCostmap | Action | service_name에 local 또는 global costmap 지정 | 지정된 costmap을 통째로 비운다 |
| Spin | Action | spin_dist 1.57 | 제자리에서 1.57 rad, 즉 90도만큼 회전한다 |
| Wait | Action | wait_duration 5 | 5초 동안 대기한다 |

이 트리가 보여 주는 복구 설계는 두 겹이다. 안쪽에서는 경로 계산과 경로 추종이 각각 자기 RecoveryNode를 갖고 관련된 costmap만 비운 뒤 한 번 재시도한다. 그래도 실패하면 바깥의 RecoveryFallback으로 넘어가 두 costmap을 모두 비우고 제자리 회전과 대기까지 순서대로 시도하며, 최상위 NavigateRecovery가 이 전체를 최대 6회까지 반복한다.

### custom node plugin

Nav2는 Behavior Tree 라이브러리로 BehaviorTree.CPP V3를 쓴다. 라이브러리가 기본 제공하는 노드도 쓰지만 트리의 대부분은 Nav2가 직접 만든 전용 custom node로 채워져 있다.

새 기능을 추가하거나 아예 다른 동작을 구현하려면 custom node plugin을 직접 만들어 새로운 트리 구조를 구성하면 된다. 만든 plugin을 bt_factory와 nav2_tree_node.xml에 등록하는 것만으로 Behavior Tree 구성에 쓸 수 있다.

## navigation server 네 종류

Nav2의 네 가지 action server는 Planner, Controller, Smoother, Recovery Server다. 이 서버들은 여러 작업을 완료하기 위한 알고리즘 plugin에 지도 데이터를 관리해 제공하고, plugin이 출력을 계산할 때 쓰는 환경 정보를 관리한다. 여기서 환경 정보란 지도 데이터, 장애물 위치, 목표 지점, 로봇의 상태를 말한다.

![[assets/lionhong-2023-nav2-core-concepts/fig04.png]]
*Figure 4: BT Navigator Server와 Recovery, Controller, Planner Server의 관계. 각 서버가 자기 plugin 묶음과 costmap을 포함하고, BT Navigator Server는 Behavior Tree XML과 Behavior Tree Plugins를 갖는다 (lionhong 2023).*

| 서버 | 접근하는 환경 표현 | 주요 용도 |
|---|---|---|
| Planner Server | global environmental representation과 버퍼에 저장된 센서 데이터 | 목적지까지의 최단 경로, coverage path, sparse path나 predefined route를 따르는 경로 계산 |
| Controller Server | local environmental representation | 경로 추종, odometric frame의 감지기를 쓴 충전 스테이션 도킹, 엘리베이터 탑승, 도구와의 상호작용 |
| Behavior Server | costmap과 tf buffer 같은 비용이 큰 공유 자원 | costmap 비우기, 후진과 제자리 회전, 운영자 호출 |
| Smoother Server | global environmental representation | 경로의 울퉁불퉁함 감소, 급격한 회전 완화, 고비용 영역에서의 이격 |

### Planner

Planner의 역할은 objective 함수를 완성하기 위해 경로를 계산하는 것이다. 이를 위해 global environmental representation, 즉 로봇이 전체 환경을 포괄적으로 표현한 자료와 버퍼에 저장된 센서 데이터에 접근한다.

Planner가 계산하는 것이 최단 경로만은 아니다. 원문은 세 가지 용도를 나란히 든다.

- 목적지까지의 최단 경로 계산
- 지정된 영역의 모든 지점을 효율적으로 방문하는 coverage path 계산
- 미리 정의된 몇 개의 중요 지점만 포함하는 sparse path나 predefined route를 따르는 경로 계산

따라서 Nav2에서 Planner의 일반적인 역할은 현재 위치에서 목표 위치까지 유효하고 잠재적으로 최적인 경로를 계산하는 것이지만, 로봇의 작업이나 요구 사항에 맞는 다른 형태의 계획도 지원한다.

### Controller

Controller는 ROS 1에서 local planner라고 불리던 구성 요소로, 전역적으로 계산된 경로를 따르거나 로컬 작업을 완료하는 역할을 한다. local environmental representation, 즉 로봇이 현재 위치 주변의 작은 영역을 표현한 자료에 접근해 base가 따라야 할 실행 가능한 제어 활동을 계산한다.

많은 Controller가 로봇을 공간 앞쪽으로 투영해 매 갱신마다 로컬에서 가능한 경로를 계산하는 방식으로 동작한다. 용도는 단순한 경로 추종에 그치지 않는다.

- 경로 따라가기
- odometric frame의 감지기를 사용해 충전 스테이션에 도킹하기
- 엘리베이터 탑승
- 도구와 상호작용하기

Nav2에는 여러 종류의 Controller와 local planner가 이미 들어 있고, 목적에 따라 plugin으로 골라 쓸 수 있다.

### Behavior Server

recovery behavior는 하나 이상의 구성 요소가 고장 나도 시스템이 중단 없이 계속 동작하게 하는 내결함성의 핵심 요소다. 목표는 시스템의 알 수 없거나 잘못된 상태를 자율적으로 처리하는 것이다.

원문은 세 가지 상황을 순서대로 든다. 첫째, 인식 시스템에 결함이 생겨 환경 표현이 가짜 장애물로 가득 차면 Clear Costmap Recovery를 실행해 로봇이 다시 이동할 수 있게 만든다. 둘째, 동적 장애물이나 제어 불량으로 로봇이 멈추면 후진하거나 제자리에서 회전해 열악한 위치에서 자유 공간으로 빠져나온다. 셋째, 완전히 실패한 경우에는 이메일이나 SMS나 Slack이나 Matrix로 운영자에게 도움을 요청한다.

Behavior server의 역할은 recovery behavior 실행에서 끝나지 않는다. costmap이나 tf buffer처럼 비용이 큰 자원을 여러 behavior가 공유해 쓸 수 있는 환경도 함께 제공한다. 따라서 behavior들은 복구뿐 아니라 다양한 작업을 수행하면서 필요한 자원을 효율적으로 쓸 수 있다.

### Smoother

Smoother가 도입된 이유는 Planner가 탐색한 경로의 최적성 기준이 현실에 비해 대체로 낮기 때문이다. 계산된 경로를 그대로 쓰기보다 한 번 더 개선하는 편이 도움이 되는 경우가 많다.

Smoother는 경로의 울퉁불퉁함을 줄이고 급격한 회전을 부드럽게 만든다. 또한 global environmental representation에 접근해 장애물과 고비용 영역에서 더 멀리 떨어지도록 경로를 옮긴다.

Nav2에서 Smoother의 일반적인 역할은 경로를 받아 개선된 버전을 반환하는 것이다. 다만 입력 경로마다 개선 기준과 개선 방법이 달라지므로, 이 서버에는 여러 종류의 smoother를 등록할 수 있는 여지가 열려 있다.

### plugin의 name과 type

Planner와 Controller와 Smoother 서버는 런타임에 쓸 알고리즘을 names와 types 두 항목으로 설정한다. 이 두 항목을 분리한 덕분에 Behavior Tree가 구체적인 알고리즘 이름을 몰라도 된다.

| 설정 항목 | 뜻 | 예시 |
|---|---|---|
| type | 등록된 plugin 라이브러리 이름 | DWB, RPP |
| name | 그 작업에 붙인 별칭 | FollowPath |
| name.<param> | 해당 별칭의 네임스페이스에 놓이는 파라미터 | FollowPath.<param> |

설정된 경로를 따르기 때문에 FollowPath라는 이름으로 쓰이는 DWB controller가 대표적인 예다. 이 경우 DWB의 모든 파라미터는 FollowPath.<param> 형태로 해당 네임스페이스에 놓인다.

호출 흐름은 다음과 같다. Behavior Tree가 해당 BT 노드를 고르면 action server를 호출해 작업을 넘기고, 서버 내부의 action server callback은 FollowPath 같은 이름에 매핑된 알고리즘, 즉 DWB나 RPP를 호출한다. 따라서 사용자는 Behavior Tree에서 쓰이는 알고리즘을 알고리즘 클래스 수준으로 추상화할 수 있고, 트리를 고치지 않고 설정만 바꿔 알고리즘을 교체할 수 있다.

## 상태 추정과 좌표 변환

### REP-105 규약

navigation 프로젝트에서 커뮤니티 표준에 따라 반드시 제공해야 하는 변환은 두 가지다. map에서 odom으로 가는 변환은 positioning system이 제공하고, odom에서 base_link로 가는 변환은 odometry system이 제공한다.

REP-105는 navigation과 더 큰 ROS 생태계에 필요한 frame과 규약을 정의한 문서다. 커뮤니티가 제공하는 풍부한 positioning, odometry, SLAM 프로젝트를 쓰려면 이 규약을 항상 따라야 한다.

요구 사항을 간략히 줄이면 최소한 map에서 odom과 base_link를 거쳐 sensor frame까지 이어지는 TF 트리를 구성해야 한다는 것이다. 이 트리를 다루는 도구가 TF2인데, TF2는 ROS 2에서 시간과 동기화된 변환을 표현하고 조회하기 위해 쓰는 시간 변환 라이브러리다.

| 변환 | 제공 주체 | 대표 구현 | 성격 |
|---|---|---|---|
| map → odom | global positioning system | amcl, SLAM Toolbox, GPS, Motion Capture | 누적된 odometry 오차를 고려해 global frame 기준으로 변환을 갱신한다 |
| odom → base_link | odometry system | 바퀴 인코더, IMU, VIO, LiDAR, RADAR | 로봇의 움직임에 기반해 부드럽고 연속적인 local frame을 제공한다 |
| base_link → sensor frames | URDF | 정적 변환 | 로봇 구조상 고정된 관계라 값이 변하지 않는다 |

### global positioning

global positioning system의 역할은 최소한 map에서 odom으로 가는 변환을 제공하는 것이다. GPS와 SLAM과 Motion Capture가 여기에 해당한다.

Nav2는 정적 지도에서의 localization을 위해 amcl을 제공한다. amcl은 파티클 필터를 기반으로 하는 Adaptive Monte-Carlo Localization 기법이다. 또한 위치 결정과 정적 지도 생성을 위해 SLAM Toolbox를 기본 SLAM 알고리즘으로 제공한다.

### odometry

odometry는 바퀴나 IMU 등으로 이동량을 누적해 로봇의 상대 위치를 추정하는 방법이다. 원천은 LiDAR, RADAR, 바퀴 인코더, VIO, IMU 등 다양하며, 목표는 로봇의 움직임에 기반한 부드럽고 연속적인 local frame을 제공하는 것이다.

odometry에는 시간이 갈수록 오차가 쌓인다. global positioning system이 이 odometry drift를 고려해 global frame 기준으로 변환을 갱신하는 이유가 여기에 있다.

여러 원천을 합칠 때는 Robot Localization이 일반적으로 쓰인다. 서로 다른 유형의 센서 N개를 써서 연속적이고 매끄러운 odometry를 TF와 topic으로 함께 내보낸다. 일반적인 모바일 로봇 구성에서는 바퀴 인코더와 IMU와 비전의 odometry를 이런 방식으로 결합하며, 이렇게 얻은 부드러운 odometry 출력은 global position update 사이의 로봇 위치를 정확하게 갱신하는 데 쓰인다.

### 라이다 없는 구성

원문은 navigation에 라이다가 필수는 아니라는 실무 참고를 덧붙인다. Nav2가 라이다를 이용한 충돌 회피와 localization과 SLAM에 대해 지침과 실제로 검증된 구현을 제공하는 것은 사실이다.

반면 REP-105 표준만 준수한다면 다른 구성도 가능하다. vision이나 depth 기반 위치 결정 시스템을 쓰고 충돌 회피에는 또 다른 센서를 써도 동일한 성과를 얻을 수 있다. 즉 Nav2가 요구하는 것은 특정 센서가 아니라 TF 트리 규약이다.

## 환경 표현

환경 표현(environmental representation)은 로봇이 자신의 주변 환경을 인식하는 방식을 뜻한다. 여러 알고리즘과 데이터의 정보를 하나의 공간으로 결합하는 자리이기도 해서, Controller와 Planner와 recovery behavior가 이 공간을 함께 쓰며 작업을 안전하고 효율적으로 수행한다.

### costmap과 layer

현재 쓰이는 환경 표현의 구현은 costmap이다. costmap은 로봇 주변 환경을 이동 가능 영역과 장애물과 팽창 비용으로 표현한 2D 격자 지도다.

| 격자 값의 종류 | 뜻 |
|---|---|
| 알려지지 않은 영역 | 아직 정보가 들어오지 않은 셀 |
| 자유롭게 이동 가능한 영역 | 로봇이 지나갈 수 있는 셀 |
| 점유된 영역 | 장애물이 차지한 셀 |
| 팽창된 비용 | 점유 영역 주변으로 비용을 넓혀 둔 값 |

이 격자는 두 방향으로 쓰인다. global plan을 위해 탐색되기도 하고, local 제어량을 계산하기 위해 샘플링되기도 한다.

costmap layer는 plugin 형태로 구현되어 costmap에 정보를 버퍼링한다. 라이다, 레이더, 음파, 깊이, 이미지 정보가 여기에 포함된다. 카메라나 깊이 센서로 만든 layer가 장애물을 감지하고 추적해 충돌을 피하게 하며, 어떤 규칙이나 휴리스틱에 기반해 기본 costmap을 알고리즘적으로 바꾸는 데도 쓰인다.

![[assets/lionhong-2023-nav2-core-concepts/fig05.png]]
*Figure 5: map 위에 겹쳐 그린 global costmap과 local costmap. 바깥의 넓은 영역이 global costmap이고, 로봇 주변의 사각형 영역이 실시간 센서 정보로 갱신되는 local costmap이다 (lionhong 2023).*

### costmap filter

costmap filter는 지도 파일에 붙인 주석을 읽어 특정 위치에서 특정 동작이 일어나게 만드는 costmap layer 기반 접근이다. 주석이 달린 영역을 filter mask라고 부른다.

filter mask의 주요 목표는 지도의 특정 영역에 추가 기능이나 동작 변화를 표시하는 것이다. 예를 들어 내부에서 피해야 할 영역을 표시하거나, 표시된 픽셀 영역에서 최대 속도를 제한하는 식이다.

동작 과정은 두 단계다. filter plugin이 filter mask에서 데이터를 읽어 filter 공간에서 feature map으로 선형 변환하고, 변환된 feature map을 지도나 costmap과 함께 써서 모든 센서 데이터와 로봇 좌표 filter가 기본 costmap을 갱신하게 만든다. 결과적으로 로봇의 위치에 따라 동작이 달라진다.

| 기능 | filter mask가 표시하는 것 | 로봇 동작 |
|---|---|---|
| 접근 금지 구역과 안전 구역 | 로봇이 절대 들어갈 수 없는 영역 | 해당 영역에 진입하지 않는다 |
| 속도 제한 구역 | 최대 속도를 낮출 영역 | 진입하면 최대 속도가 제한된다 |
| 선호 레인 | 산업 환경과 창고에서 이동 로봇이 따라야 할 레인 | 지정된 레인을 따라 이동한다 |

![[assets/lionhong-2023-nav2-core-concepts/fig06.png]]
*Figure 6: 최대 속도를 제한하는 costmap filter가 적용된 map. 분홍색 사각형이 속도를 제한하는 filter mask 영역이다 (lionhong 2023).*

## 한계

개념 정리 글이라 실험이나 벤치마크 수치는 없다. 각 구성 요소의 성능 비교나 파라미터 튜닝 지침은 이 글의 범위 밖이므로, 실제 설정 값은 공식 문서와 소스 repo에서 확인해야 한다.

2023년 8월에 쓰인 글이라 이후 추가된 Route Server, docking 계열 패키지, MPPI controller 같은 구성 요소는 다루지 않는다. 최신 구성은 [[physical-ai/nav2-2026-official-documentation]]과 [[physical-ai/ros-navigation-navigation2]]로 보완해야 한다.

공식 문서의 재구성이라 각 plugin의 알고리즘 내부까지는 들어가지 않는다. DWB의 trajectory 샘플링이나 Smac의 Hybrid A\* 같은 내용은 이름만 언급되거나 아예 등장하지 않는다.

본문과 그림 사이에 범위 차이도 있다. 본문은 navigation server를 네 가지로 설명하지만 인용된 서버 관계 그림에는 BT Navigator Server와 Recovery, Controller, Planner Server만 나오고 Smoother Server는 빠져 있다. 그림은 Smoother 도입 이전 구성을 반영한 것으로 보인다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| action server | 오래 걸리는 작업을 요청받아 실행하며 feedback과 최종 결과를 돌려주는 ROS 2 통신 방식. Nav2는 사용자와의 통신과 서버 사이 통신에 모두 쓴다 |
| lifecycle node | configure와 activate 같은 상태 전이를 명시적으로 관리하는 ROS 2 노드. Nav2는 모든 서버에 nav2_util LifecycleNode wrapper를 적용했다 |
| bond | 서버와 lifecycle manager 사이의 생존 확인 연결. 서버가 충돌하면 manager가 알아채고 시스템을 안전하게 내린다 |
| REP-105 | map에서 odom과 base_link를 거쳐 sensor frame까지 이어지는 TF 트리 규약을 정한 ROS 표준 문서 |
| filter mask | 지도에 주석을 달아 진입 금지나 속도 제한 같은 영역별 동작 변화를 표시한 파일 |
| costmap | 로봇 주변 환경을 이동 가능 영역과 장애물과 팽창 비용으로 표현한 2D 격자 지도. global과 local 두 층으로 쓴다 |

## 관련 페이지

- [[physical-ai/nav2-2026-official-documentation]]: 이 글의 원 출처인 공식 문서. 최신 구성 요소와 각 plugin의 세부 설정은 그 페이지가 담당한다.
- [[physical-ai/yhoons-2024-ros2-nav2-intro]]: 같은 주제를 더 짧게 다룬 한국어 입문 글. 공식 아키텍처 다이어그램과 함께 보면 좋다.
- [[physical-ai/ros-navigation-navigation2]]: Nav2 소스 repo. 이 글이 언급하는 nav2_lifecycle_manager와 nav2_msgs 같은 패키지의 실제 구성을 확인할 수 있다.
- [[overviews/physical-ai-overview]]: physical-ai 카테고리의 분류 뼈대와 학습 경로 허브.
