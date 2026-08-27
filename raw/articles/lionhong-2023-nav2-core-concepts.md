---
title: "[Nav2] Nav2 주요 개념 정리"
type: article
year: 2023
category: physical-ai
raw_path: raw/articles/lionhong-2023-nav2-core-concepts.md
raw_filename: "lionhong-2023-nav2-core-concepts.md"
source_collection: external
author: "lionhong"
url: "https://developer-lionhong.tistory.com/84"
publisher: "developer-lionhong.tistory.com"
publication_date: "2023-08-25T08:41:22+09:00"
fetched_at: "2026-08-28T07:41:20+0900"
extractor_tier: "chrome"
tags: []
figures:
  - id: fig01
    file: assets/lionhong-2023-nav2-core-concepts/fig01.jpg
    raw: raw/articles/lionhong-2023-nav2-core-concepts-figures/fig01.jpg
    caption: "lifecycle이 활성화된 노드"
    strategy: fetched
    curated: false
  - id: fig02
    file: assets/lionhong-2023-nav2-core-concepts/fig02.jpg
    raw: raw/articles/lionhong-2023-nav2-core-concepts-figures/fig02.jpg
    caption: "lifecycle manager 예시"
    strategy: fetched
    curated: false
  - id: fig03
    file: assets/lionhong-2023-nav2-core-concepts/fig03.png
    raw: raw/articles/lionhong-2023-nav2-core-concepts-figures/fig03.png
    caption: "Nav2 Behavior Tree 구조 예시"
    strategy: fetched
    curated: false
  - id: fig04
    file: assets/lionhong-2023-nav2-core-concepts/fig04.png
    raw: raw/articles/lionhong-2023-nav2-core-concepts-figures/fig04.png
    caption: "BT navigator와 연동되는 다양한 server들"
    strategy: fetched
    curated: false
  - id: fig05
    file: assets/lionhong-2023-nav2-core-concepts/fig05.png
    raw: raw/articles/lionhong-2023-nav2-core-concepts-figures/fig05.png
    caption: "map에 표현된 costmap"
    strategy: fetched
    curated: false
  - id: fig06
    file: assets/lionhong-2023-nav2-core-concepts/fig06.png
    raw: raw/articles/lionhong-2023-nav2-core-concepts-figures/fig06.png
    caption: "최대 속도를 제한하는 코스트맵 필터"
    strategy: fetched
    curated: false
  - id: fig07
    file: assets/lionhong-2023-nav2-core-concepts/page-full.png
    raw: raw/articles/lionhong-2023-nav2-core-concepts-figures/page-full.png
    caption: "전체 페이지 스크린샷"
    strategy: screenshot
    curated: false
  - id: fig08
    file: assets/lionhong-2023-nav2-core-concepts/crop01.png
    raw: raw/articles/lionhong-2023-nav2-core-concepts-figures/crop01.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig09
    file: assets/lionhong-2023-nav2-core-concepts/crop02.png
    raw: raw/articles/lionhong-2023-nav2-core-concepts-figures/crop02.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig10
    file: assets/lionhong-2023-nav2-core-concepts/crop03.png
    raw: raw/articles/lionhong-2023-nav2-core-concepts-figures/crop03.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig11
    file: assets/lionhong-2023-nav2-core-concepts/crop04.png
    raw: raw/articles/lionhong-2023-nav2-core-concepts-figures/crop04.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig12
    file: assets/lionhong-2023-nav2-core-concepts/crop05.png
    raw: raw/articles/lionhong-2023-nav2-core-concepts-figures/crop05.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig13
    file: assets/lionhong-2023-nav2-core-concepts/crop06.png
    raw: raw/articles/lionhong-2023-nav2-core-concepts-figures/crop06.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig14
    file: assets/lionhong-2023-nav2-core-concepts/crop07.png
    raw: raw/articles/lionhong-2023-nav2-core-concepts-figures/crop07.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig15
    file: assets/lionhong-2023-nav2-core-concepts/crop08.png
    raw: raw/articles/lionhong-2023-nav2-core-concepts-figures/crop08.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig16
    file: assets/lionhong-2023-nav2-core-concepts/crop09.png
    raw: raw/articles/lionhong-2023-nav2-core-concepts-figures/crop09.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig17
    file: assets/lionhong-2023-nav2-core-concepts/crop10.png
    raw: raw/articles/lionhong-2023-nav2-core-concepts-figures/crop10.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig18
    file: assets/lionhong-2023-nav2-core-concepts/crop11.png
    raw: raw/articles/lionhong-2023-nav2-core-concepts-figures/crop11.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig19
    file: assets/lionhong-2023-nav2-core-concepts/crop12.png
    raw: raw/articles/lionhong-2023-nav2-core-concepts-figures/crop12.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
---

> 수집 메모 — `scripts/fetch_article.py` 가 사용자의 명시적 URL 지시에 따라 가져왔다 (CLAUDE.md rule #1 의 자료 수집 예외). 추출 tier: `chrome`. 본문은 원문 그대로이며 요약·번역·윤문하지 않았다.
> `category` 는 임시값이므로 Step 3 에서 확정할 것.

---



본격적으로 Nav2의 구성에 대해서 하나씩 살펴보기 앞서 Nav2의 주요 개념들에 대해서 정리하도록 하겠습니다. 

### ROS2

#### Action Server( 액션 서버)

액션 서버는 네비게이션(Navigation)과 같이 긴 작업을 수행하는 로봇 동작을 제어하는 핵심 개념입니다. 장시간 작업 상황에서 액션 서버는 클라이언트로부터 다른 프로세스나 스레드에서 장기간 실행되는 작업 요청을 수락하고 실행이 완료되면 최종 결과를 반환하며 해당 상태를 종료합니다.

작업이 완료될때까지 안정성을 위해 액션 서버는 클라이언트에게 feedback을 제공하는데, 이는 목표 지점까지의 각도, 성공 여부 등이 될 수 있습니다. 이러한 피드백과 최종 결과는 클라이언트에 callback을 등록함으로써 동시에 얻을 수 있습니다. 

Nav2에서 액션 서버는 NavigateToPose 액션 메시지를 통해 최상위 BT(행동 트리) 내비게이터와 통신하는 데 사용되며 BT Navigator가 차후 작은 액션 서버들과 통신하여, plan을 계산하고, 동작제어 및 복구를 수행하는데도 사용됩니다. 

네비게이션 작업을 수행하는 액션 서버와 클라이언트는 서로 액션 메시지 타입을 통해 효율적으로 작업을 요청하고 결과를 주고 받는데 이때 사용되는 여러가지 액션 타입은 nav2_msgs/action 네임스페이스 아래에 정의되어 있으며, 네비게이션 작업의 성격에 따라 다양한 액션 타입이 존재합니다. 

예를 들어 "NavigateToPose" 액션은 로봇을 특정 위치로 이동시키는 작업을 수행하는 액션인데, 해당 액션은 nav2_msgs/action/NavigateToPose 메시지 타입을 사용하며, 이 액션 서버와 클라이언트는 이 메시지 타입을 통해 작업을 요청하고 결과를 주고받습니다.

#### Lifecycle nodes and bond(생명 주기 노드와 본드)

Lifecycle node는 ROS 2에서 노드(Node)의 상태를 관리하기 위해 사용되는 개념입니다. 이를 통해 노드의 초기화, 활성화, 일시 중지, 종료 등과 같은 다양한 상태를 체계적으로 관리할 수 있게 해줍니다.

노드가 처음 시작되면 unconfigured 상태이며, ROS 네트워크 설정이나 parameter를 읽는 것을 포함하지 않는 단순 node 생성자만 처리합니다. 이후 launch 시스템이나 제공된 lifecycle manager에 의해 노드들은 configuration을 통해 inactive 상태로 전환해야 합니다. 그 후 activing 단계로 전환하면서 node가 비로소 activate 될 수 있습니다.

이 때 configure(노드를 생성할 때 필요한 상태), activate(노드가 실행될 때 필요한 상태), deactive(노드가 중지 될 때 필요한 상태) 등과 같은 노드의 상태를 Lifecycle이 관리하는 것이죠.

configuration 단계에서는 on_configure() 함수를 트리거하여 모든 파라미터, ROS 네트워킹 인터페이스, 안전 시스템의 경우 동적으로 할당된 모든 메모리를 설정합니다. 활성화 단계에서는 on_activate() 함수를 트리거하여 ROS 네트워킹 인터페이스를 활성화하고 프로그램에서 정보 처리를 시작하도록 모든 상태를 설정합니다.

노드가 종료될 때는 최종 상태에서 deactivating, cleaning up, shutting down 그리고 end 상태로 각각 전환됩니다. 각 단계에서 네트워크 인터페이스가 비활성화되고, 프로세스 종료 및 메모리 할당 해제가 실행됩니다.

이렇게 Lifecycle node는 정의된 lifecycle 상태에 따라 적절한 동작을 수행할 수 있도록 설계되며, 로봇 및 시스템의 제어 및 운영을 효율적으로 관리할 수 있게 해줍니다.

모든 ROS 시스템은 가능하면 이 lifecycle 노드를 사용하는 것이 권장되며 Nav2는 모든 서버에서 lifecycle node framework을 활용할 만큼 광범위하게 사용되고 있습니다.

Nav2에서는 LifecycleNodes의 wrapper인 nav2_util LifecycleNode를 사용합니다. 이 wrapper는 일반적인 애플리케이션을 위해 LifecycleNodes의 복잡한 부분을 대부분 래핑합니다. 또한 서버가 전환된 후에도 active 상태를 유지할 수 있도록 lifecycle manager를 위한 bond 연결도 포함되어 있습니다. 만약 서버가 충돌하는 경우 lifecycle manager에게 이를 알리고 시스템을 다운시켜 심각한 문제를 방지합니다. 

![lifecycle이 활성화된 노드](https://blog.kakaocdn.net/dna/bhUPSa/btsrTomFvQV/AAAAAAAAAAAAAAAAAAAAADOI7lK5rjJ4jZL2gBW33ZKZYjLBjlPDiVc02cVfJRce/img.jpg?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1788188399&allow_ip=&allow_referer=&signature=DSVrewiY35dcd1fHZla2zAVlVyE%3D)

Nav2의 lifecycle manager는 navigation stack의 startup, shutdown, reset, pause, resume을 제어하기 위해 lifecycle node의 상태를 변경하는 데 사용됩니다. 특정 navigation stack에서 요청된 제어를 수행하기 위해서 lifecycle manager가 lifecycle이 활성화된 노드(lifecycle을 이용해 관리할 수 있는 노드)들의 상태를 변경하는 것이죠. Lifecycle manager는 클라이언트가startup, shutdown, reset, pause, resume 기능을 호출할 수 있는 lifecycle_manager/manage_nodes 서비스를 제공합니다.

예를 들어 아래 그림과 같이 RVIZ에 의해 lifecycle manager의 manage_nodes service로부터 startup이 요청되면 lifecycle managers는 노드 목록에서 lifecycle이 활성화된 노드들(Node A, Node B, Node C)에 대해 configure()과 activate() 함수를 호출하게 됩니다.

![lifecycle manager 예시](https://blog.kakaocdn.net/dna/7EdzQ/btsrUoNt5pQ/AAAAAAAAAAAAAAAAAAAAAKrGi3h-a3OB5VjOFEv22FjCpmOPvBb4lRF4wgFC5EVH/img.jpg?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1788188399&allow_ip=&allow_referer=&signature=dvZg3S4mjPVeyttb%2BfEDvr4Vd7s%3D)

---

### Behavior Tree(행동 트리)

이전 ROS1에서의 move base와 비교해 가장 크게 달라진 점이 바로 Behavior Tree 부분입니다. 이름에서 알 수 있듯이 Behavior Tree는 Tree 구조로 여러 Node들이 나무 가지처럼 연결된 계층적 자료 구조입니다.

트리의 왼쪽부터 오른쪽으로 탐색하며 서로 의존성이 없는 노드들이 실행되는 형태입니다. 이는 수십 개의 state와 수백 개의 transition을 가질 수 있는 FSM과는 반대되는 개념입니다. 

축구를 하는 로봇을 만든다고 할 때 Behavior Tree를 사용하면 기초 요소와 같은 '킥', '걷기', '공으로 이동'과 같은 기본 요소를 생성하여 다양한 동작에 재사용하면서 복잡한 시스템을 보다 간단한게 만들 수 있습니다.

Nav2에서는 Behavior Tree library로 BehaviorTree CPP V3를 사용합니다. Nav2는 이 library에서 기본적으로 제공하는 node들도 사용하지만 대부분 자체적으로 만든 전용 custom node를 사용해 Behavior Tree를 구축했습니다. 새로운 기능을 추가하거나 아예 다른 기능을 구현하고 싶다면 직접 custom node plugin을 만들어 새로운 Behavior Tree 구조를 만들 수도 있습니다. 만들어준 node plugin을 bt_factory와 nav2_tree_node.xml에 등록만 해주면 Behavior Tree 구성에 사용할 수 있습니다.

![Nav2 Behavior Tree 구조 예시](https://blog.kakaocdn.net/dna/cB2a5z/btsr4XIdT7r/AAAAAAAAAAAAAAAAAAAAAPfAyJp6T4ObKXSqSX7PCTt5U2gLH9zXuw9-fSaakc6s/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1788188399&allow_ip=&allow_referer=&signature=mdPlOIou8MiXQqdIsVLrkIq%2BM14%3D)

Nav2에서 default 값으로 사용 중인 behavior tree 구조

---

### Navigation Servers

#### Planner, Controller, Smoother and Recovery Servers

Nav2의 네 가지 액션 서버는 Planner, Controller, Smoother 그리고 Recovery Server입니다. 이러한 액션 서버는 다양한 작업을 완료하기 위한 알고리즘 플러그인의 맵 데이터를 관리하고 제공하는데 사용되며, 알고리즘 플러그인이 출력을 계산하는 데 사용하는 환경 정보(맵 데이터, 장애물 위치, 목표 지점, 로봇의 상태 등)를 관리하는 역할을 수행합니다.

Planner, Controller 그리고 Smoother 서버는 런타임에 사용할 알고리즘의 names과 types로 구성됩니다. types는 등록된 플러그인 라이브러리 이름을 말하며 names는 작업의 별칭을 뜻합니다. 설정된 경로를 따르기 때문에 FollowPath라는 이름으로 사용되는 DWB 컨트롤러를 예로 들 수 있습니다. 이 경우 DWB에 대한 모든 매개변수(parameter)는 해당 네임스페이스에 배치됩니다(예: FollowPath.<param>).

Behavior Tree가 해당 BT 노드를 선택하면 action server를 호출하여 해당 작업을 처리합니다. 서버 내부의 action server callback은 특정 알고리즘에 매핑되는 이름(예: FollowPath)으로 선택한 알고리즘(DWB나 RPP 등)을 호출합니다. 이를 통해 사용자는 Behavior Tree에서 사용되는 알고리즘을 알고리즘 클래스로 추상화할 수 있는 것이죠.

![BT navigator와 연동되는 다양한 server들](https://blog.kakaocdn.net/dna/c74Pc2/btssabGMpPs/AAAAAAAAAAAAAAAAAAAAAPIr50NWhlpVOviDqoxJNtfoZMwvnEwNzkOd3LAcWcB_/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1788188399&allow_ip=&allow_referer=&signature=1jUxzohYkEZVwFu54RHiC%2BR1Kxc%3D)

#### Planner

Planner의 역할은 objective 함수를 완성하기 위해 경로를 계산하는 것입니다. Planner는 이를 위해 global environmental representation(전역 환경 표현 - 로봇이 전체 환경을 포괄적으로 표현한 것) 및 버퍼에 저장된 센서 데이터에 접근할 수 있습니다.

Planner는 다음과 같은 목적으로 사용할 수 있습니다:

- 목적지까지의 최단 경로 계산
- 완전한 coverage path(커버리지 경로 - 지정된 영역을 로봇이 효율적으로 탐색하고 모든 지점을 방문하는 경로) 계산
- sparse path(희소 경로 - 로봇의 이동 경로 중 미리 정의된 몇 가지 중요한 지점만을 포함하는 경로) 또는 predefined routes(미리 정의된 경로)를 따라 경로 계산

Nav2에서 Planner의 일반적인 역할은 현재 위치에서 목표 위치까지 유효하고 잠재적으로 최적일 수 있는 경로를 계산하는 것입니다. 하지만 Planner는 최적 경로 뿐만 아니라 로봇의 작업이나 특정 요구 사항에 맞는 다양한 계획과 경로도 지원합니다.

#### Controller

ROS 1에서 local planner라고 불렸던 Controller는 전역적으로 계산된 경로를 따르거나 로컬 작업을 완료하는 역할을 합니다. Controller는 local environmental representation(로컬 환경 표현 - 로봇이 현재 위치 주변의 작은 영역을 포현한 것)에 접근하여 기지(base)가 따라야 할 실행 가능한 제어 활동을 계산하려고 시도합니다. 많은 Controller는 로봇을 공간 앞으로 투영하고 각 업데이트마다 로컬에서 가능한 경로를 계산합니다. 

Controller는 다음과 같은 목적으로 사용할 수 있습니다:

- 경로 따라가기
- Odometric frame(좌표계)에서의 감지기를 사용하여 충전 스테이션에 도킹하는 작업
- 엘리베이터 탑승
- 도구와 상호작용하기

Nav2에서 Controller의 일반적인 역할은 global plan을 따르기 위한 유효한 control 활동을 계산하는 것입니다. 현재 Nav2에는 많은 종류의 Controller와 Local Planner가 존재하고 저마다의 목적에 따라 plugin으로 사용할 수 있습니다. 

#### Behaviors

Recovery Behaviors(복구 동작)은 하나 이상의 구성 요소가 고장나도 시스템이 중단 없이 계속 작동할 수 있도록 하는(내결함성 시스템) 주요 요소입니다. Recovery의 목표는 시스템의 알 수 없거나 잘못된 상태를 다루고 이러한 상황을 자율적으로 처리하는 것입니다. 예를 들어 인식 시스템에 결함이 발생하여 환경 표현이 가짜 장애물로 가득 차게 되는 경우가 있습니다. 이럴 때 로봇은 Clear Costmap Recovery(코스트맵 복구)를 활성화하여 로봇이 이동할 수 있게 해줍니다.

또 다른 예로는 동적 장애물이나 제어 불량으로 인해 로봇이 멈춘 경우를 들 수 있습니다. 이 때 로봇이 후진하거나 제자리에서 회전하는 것이 허용되는 경우, 로봇이 열악한 위치에서 자유 공간으로 이동하여 성공적으로 탐색할 수 있도록 합니다.

마지막으로, 완전히 실패한 경우 운영자에게 도움을 요청하기 위해 Recovery Behaviors(복구 동작)이 구현될 수 있습니다. 이 작업은 이메일, SMS, Slack, Matrix 등을 통해 이루어질 수 있습니다.

Behavior server는 단순히 Recovery Behaviors(복구 동작)을 실행하는 역할뿐만 아니라 다른 여러 Behavior들이 공유하는 비용이 큰 자원(costmap이나 tf buffer)에 접근하고 활용할 수 있는 환경을 제공합니다. 이로써 Behavior들은 Recovery 뿐만 아니라 다양한 작업을 수행하면서 필요한 자원을 효율적으로 활용할 수 있게 됩니다.

#### Smoothers

Planner가 탐색한 경로의 최적성 기준이 일반적으로 현실에 비해 낮습니다. 따라서 경로의 추가적인 개선이 도움이 되는 경우가 많습니다. 이러한 목적으로 도입된 Smoother(스무더)는 주로 경로의 울퉁불퉁함을 감소시키고 급격한 회전을 부드럽게 하며, 또한 전역 환경 표현에 액세스하여 장애물 및 high-cost area(고비용 영역)에서 더 멀리 이동하도록 하는 역할을 수행합니다. 

Nav2에서 Smoother의 일반적인 역할은 경로를 받아서 개선된 버전을 반환하는 것입니다. 그러나 입력 경로마다 개선 기준과 해당 개선 방법이 다양하기 때문에 이 서버에 등록할 수 있는 수많은 스무더를 위한 공간이 생성됩니다.

---

### State Estimation(상태 추정)

Navigation project에는 community standards에 따라 제공되어야 하는 2가지 주요 변환이 있습니다. 첫 번째 map -> odom 변환은 positioning system(localization, mapping, SLAM)에 의해 제공되며, 두 번째 odom -> base link 변환은 odometry system에 의해 제공됩니다. 

※ 참고
Navigation system을 사용하기 위해 로봇에 라이다를 사용할 필요는 없지만 Nav2는 라이다를 이용한 충돌 회피, localization, SLAM을 실행하기 위한 지침을 제공하며, 실제로 검증된 구현 방법을 지원합니다. 물론 아래에서 설명할 Standard만을 준수한다면 vision이나 depth 기반 위치 결정 시스템을 사용하고 충돌 회피를 위해 다른 센서를 사용하여 동일한 성과를 얻을 수 있습니다.

#### Standards

REP 105는 Navigation과 더 큰 ROS 에코시스템에 필요한 frame과 규약을 정의합니다. 이러한 규약은 커뮤니티에서 제공되는 풍부한 positioning, odometry 및 SLAM 프로젝트를 사용하기 위해서 항상 따라야 합니다.

REP-105를 간략히 설명하면 최소한 로봇에 대한 전체 map -> odom -> base link -> [sensor frames]을 포함하는 TF 트리를 구성해야 한다는 것입니다. TF2는 시간 변환 라이브러리로, ROS 2에서 time synchronized transformations(시간과 동기화된 변환)을 표현하고 얻기 위해 사용됩니다. Global positioning system(전역 위치 결정 시스템 - 예) GPS, SLAM, Motion Capture)은 최소한 map -> odom 변환을 제공하는 것이 역할이며, 그런 다음 odometry system은 odom -> base_link 변환을 제공하는 것이 역할입니다. base_link와 관련된 나머지 변환은 정적이어야 하며 URDF에 정의되어야 합니다.

#### Global Positioning: Localization and SLAM

위에서 언급했듯이 최소한 map -> odom 변환을 제공하는 것이 Global positioning system(GPS, SLAM, Motion Capture)의 역할입니다. Nav2는 static map(정적 지도)에서의 localization를 위해 파티클 필터를 기반으로 하는 Adaptive Monte-Carlo Localization(적응형 몬테카를로) 기법인 amcl을 제공합니다. 또한 위치 결정 및 static map(정적 지도)의 생성을 위해 SLAM Toolbox를 기본 SLAM 알고리즘으로 제공합니다.

#### Odometry

Odometry system의 역할은 odom -> base_link 변환을 제공하는 것입니다. Odometry는 라이더(LIDAR), 레이더(RADAR), 바퀴 엔코더, 시각 기반 위치 추정(VIO), 관성 측정 장치(IMU) 등 다양한 곳으로부터 얻을 수 있습니다. Odometry의 목표는 로봇의 움직임을 기반으로 부드럽고 연속적인 로컬 프레임을 제공하는 것입니다. Global positioning system은 odometry drift(점차적으로 발생하는 오차)를 고려하여 global frame(고정된 좌표계)을 기준으로 변환을 업데이트합니다.

Robot Localization은 이러한 퓨전을 위해 일반적으로 사용됩니다. 이는 다양한 유형의 N개의 센서를 사용하여 연속적이고 원활한 odometry를 TF와 topic으로 제공합니다. 일반적인 모바일 로봇 설정에서는 바퀴 인코더, IMU 및 비전의 odometry를 이러한 방식으로 결합하여 사용합니다. 부드러운 odometry 출력은 global position updates(전역 위치 업데이트) 간 로봇의 위치를 정확하게 업데이트하기 위해 사용될 수 있습니다.

---

### Environmental Representation(환경 표현)

Environmetal representation은 로봇이 자신의 주변 환경을 인식하는 방식을 의미합니다. 이것은 다양한 알고리즘과 데이터들의 정보를 단일 공간으로 결합하기 위한 central localization(중앙 로컬라이제이션) 역할도 합니다. 이 공간은 Controller, Planner, Recovery 등이 작업을 안전하고 효율적으로 수행하는 데 사용됩니다.

#### Costmaps and Layers(코스트맵과 레이어)

현재 사용되는 환경 표현은 Costmap(코스트맵)입니다. Costmap은 알려지지 않은 영역, 자유롭게 이동 가능한 영역, 점유된 영역, 팽창된 코스트로 구성된 일정한 2D 격자 그리드입니다. 이 코스트맵은 global plan(전역 경로 계획)을 위해 탐색되거나, local control efforts(로컬 제어 노력)을 계산하기 위해 샘플링되는 데 사용됩니다.

다양한 Costmap Layers(코스트맵 레이어)는 플러그인 형태로 구현되어 코스트맵에 정보를 버퍼링(저장)합니다. 여기에는 라이다, 레이더, 음파, 깊이, 이미지 등의 정보가 포함됩니다. Costmap Layers는 카메라나 깊이 센서를 사용하여 생성된 후 장애물을 감지하고 추적하여 충돌을 피할 수 있습니다. 또한 어떤 규칙이나 휴리스틱에 기반하여 기본 코스트맵을 알고리즘적으로 변경하는 데 사용될 수도 있습니다. 

![map에 표현된 costmap](https://blog.kakaocdn.net/dna/c0wQCv/btsr5ZtKKpe/AAAAAAAAAAAAAAAAAAAAACCrufuxR9y6q3ibehvb-xSMMI5Ip4d7ebytDUr7KDi0/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1788188399&allow_ip=&allow_referer=&signature=Suv%2FqIwoBN%2FutAp19BuFtFkzdPo%3D)

map에 표현된 global costmap과 local costmap

#### 

#### Costmap FIlters(코스트맵 필터)

지도 파일에 주석을 달아 어떤 위치에서 특정 동작이 발생하도록 하는 상황을 생각해봅시다. 주석/표시 예시로는 내부에서 피해야 할 영역을 나타내거나 표시된 픽셀 영역에서 최대 속도 제한하는 것을 예로 들 수 있습니다. 이 주석이 달린 영역을 "Filter Mask(필터 마스크)"라고 합니다. 필터 마스크의 주요 목표는 지도의 특정 영역에 일부 추가 기능이나 행동 변화를 표시할 수 있도록 하는 것입니다.

Costmap Filters(코스트맵 필터)는 필터 마스크에 주석이 달린 spatial-dependent behavioral changes(공간에 의존하는 동작 변경 사항 예) 특정 공간에서 최대 속도 제한)을 Nav2 스택에 적용하는 costmap layer-based approach(코스트맵 레이어 기반 접근 방식)입니다. 코스트맵 필터는 코스트맵 플러그인으로 구현됩니다. 이러한 플러그인은 필터 마스크에 표시된 공간 주석에 따라 코스트맵을 필터링하기 때문에 '필터'라고 불립니다. 필터링된 코스트맵을 만들고 주석이 달린 영역에서 로봇의 동작을 변경하기 위해 필터 플러그인은 필터 마스크에서 가져온 데이터를 읽습니다. 이 데이터는 필터 공간에서 피처 맵으로 선형적으로 변환됩니다. 이렇게 변환된 피처 맵을 map/costmap(지도/코스트맵)과 함께 사용하면 모든 센서 데이터와 robot coordinate filters(현재 로봇 좌표 필터)가 기본 코스트맵을 업데이트하고 로봇의 위치에 따라 로봇의 동작을 변경할 수 있습니다. 

코스트맵 필터를 사용하면 다음과 같은 기능을 만들 수 있습니다:

- 로봇이 절대 들어갈 수 없는 접근 금지/안전 구역
- 속도 제한 구역, 해당 영역에 진입하는 로봇의 최대 속도가 제한됨
- 산업 환경 및 창고에서 이동하는 로봇들을 위한 선호 레인

![최대 속도를 제한하는 코스트맵 필터](https://blog.kakaocdn.net/dna/w7DK9/btsr61xUXY5/AAAAAAAAAAAAAAAAAAAAAOGl0rUoq0v7ZoaAJPRbPpk8yRR8h-HsJPwo4FRCz_8m/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1788188399&allow_ip=&allow_referer=&signature=oY7cLHB%2By62xP9BLAKNRaQt%2Flhk%3D)

최대 속도를 제한하는 코스트맵 필터가 적용된 map, 분홍색 사각형이 속도를 제한하는 filter mask에 해당된다.

---

### Reference

● [https://navigation.ros.org/concepts/index.html](https://navigation.ros.org/concepts/index.html)

● [https://github.com/ros-planning/navigation2/tree/main/nav2_lifecycle_manager](https://github.com/ros-planning/navigation2/tree/main/nav2_lifecycle_manager)

