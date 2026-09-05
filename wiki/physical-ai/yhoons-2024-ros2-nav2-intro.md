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
  - id: fig02
    kind: figure
    file: assets/yhoons-2024-ros2-nav2-intro/fig02.png
    raw: raw/articles/yhoons-2024-ros2-nav2-intro-figures/fig02.png
    caption: "Nav2 시스템 아키텍처. BT Navigator Server가 Controller, Planner, Behavior, Smoother, Route Server를 조율하고 출력이 Velocity Smoother와 Collision Monitor를 거쳐 로봇에 전달된다"
    strategy: fetched
    curated: true
---

## 요약

"[ROS2] Nav2란?"은 Nav2를 처음 접하는 사람을 위한 한국어 입문 글이다. Nav2를 "ROS 2를 기반으로 자율 주행 로봇의 경로 계획과 제어를 돕는 Navigation Stack"으로 정의한 뒤, 입문자가 처음 만나는 개념 다섯 가지와 핵심 기능 네 가지, 그리고 공식 아키텍처 다이어그램의 구성 요소를 차례로 훑는다.

이 페이지는 그 전개를 입문 관점으로 재구성한 것이다. 즉 Nav2를 처음 공부할 때 무엇을 어떤 순서로 알아야 하는지에 초점을 둔다. 개념의 세부 정의와 ROS 2 기반 구조는 [[physical-ai/lionhong-2023-nav2-core-concepts]]가 맡고, 공식 사양과 배포판별 지원 상태는 [[physical-ai/nav2-2026-official-documentation]]이 맡는다.

## 배경

자율 주행 로봇 소프트웨어는 지도 위에서 경로를 찾는 문제 하나로 끝나지 않는다. 목적지까지의 큰 경로를 세우는 일, 눈앞의 장애물을 피하는 일, 길이 막혔을 때 회복하는 일, 지도 안에서 자기 위치를 계속 추정하는 일이 함께 필요하다.

Nav2는 이 기능들을 각각 독립한 서버로 나누고 그 사이를 Behavior Tree로 조율하는 구조를 택했다. 따라서 Nav2를 이해한다는 것은 알고리즘 하나를 이해하는 일이 아니라, 여러 서버의 역할 분담과 조율 방식을 읽는 일에 가깝다.

Nav2의 출발점은 ROS 1의 Navigation Stack이다. 원문은 Nav2를 ROS 1 Navigation Stack을 계승하고 확장한 버전으로 소개하며, ROS 2의 장점을 활용해 성능과 유연성을 높였다고 설명한다. 사용 범위는 실내와 실외 환경 모두이고, 다양한 하드웨어와 센서를 지원한다.

입문 글로서 이 자료가 잡는 범위는 정의와 구성 요소 목록까지다. 설정 파일 작성이나 plugin 선택 같은 실행 단계는 다루지 않는다.

## 핵심 개념

원문이 가장 먼저 정리하는 것은 Nav2 문서에서 반복해 만나게 되는 용어 다섯 가지다. 이 다섯 가지의 역할 구분이 뒤에 나오는 아키텍처 다이어그램을 읽는 기준이 된다.

| 개념 | 맡는 일 | 하위 구분 |
|---|---|---|
| Behavior Tree | 로봇의 의사결정을 관리한다 | 작업을 노드로 구성해 병렬 또는 순차로 실행 |
| Planner | 목표 지점까지 이동할 경로를 계획한다 | global planner / local planner |
| Controller | 계획된 경로를 실제 이동으로 옮긴다 | PID, MPPI 등 제어 방식 |
| costmap | 로봇 주변 환경을 2D 격자로 표현한다 | global costmap / local costmap |
| localization | 지도 안에서 로봇의 위치를 추정한다 | AMCL 등 알고리즘 |

### Behavior Tree

Behavior Tree는 로봇의 의사결정을 트리 구조의 노드 조합으로 관리하는 제어 구조다. Nav2는 각 작업을 노드 형태로 구성해, 상황에 맞는 행동을 유연하게 고를 수 있게 한다.

원문이 드는 이점은 두 가지다.

- 복구 행동이나 경로 계획 같은 작업을 노드 단위로 나누어 처리한다.
- 여러 작업을 병렬 또는 순차로 실행할 수 있다.

즉 Behavior Tree는 특정 알고리즘이 아니라, 어떤 서버를 언제 부를지 정하는 조율 계층이다. 아키텍처 다이어그램에서 BT Navigator Server가 다른 서버들과 양방향 화살표로 이어져 있는 이유가 여기에 있다.

### Planner

Planner는 로봇이 목표 지점까지 이동할 경로를 계획하는 역할을 맡는다. 원문은 이를 두 가지로 나눈다.

- global planner는 로봇의 현재 위치에서 목적지까지의 전체 경로를 계산한다.
- local planner는 주변 장애물을 실시간으로 감지해 즉각적인 움직임을 계획한다.

이 둘의 차이는 보는 범위와 갱신 주기다. global planner는 넓은 범위를 한 번에 보고 큰 그림을 그리고, local planner는 좁은 범위를 자주 다시 보며 눈앞의 상황에 반응한다. Nav2는 여러 planner를 지원하므로 상황에 맞는 알고리즘을 고를 수 있다.

### Controller

Controller는 planner가 만든 경로를 로봇이 실제로 따라가도록 제어한다. 계획된 경로가 좌표의 나열이라면, Controller의 출력은 로봇에 보낼 속도와 방향 명령이다.

Nav2는 PID와 MPPI 같은 여러 제어 방식을 제공해 로봇이 매끄럽고 정확하게 경로를 따르게 한다. MPPI는 Model Predictive Path Integral의 약어로, 여러 후보 경로를 샘플링해 비용이 낮은 쪽으로 제어를 갱신하는 모델 예측 제어 방식이다.

### costmap

costmap은 로봇 주변 환경을 이동 가능 영역, 장애물, 팽창 비용으로 표현한 2D 격자 지도다. 로봇이 갈 수 있는 안전한 영역과 갈 수 없는 영역을 격자 단위 비용값으로 구분해 두기 때문에, planner와 controller가 같은 형식의 환경 정보를 공유할 수 있다.

costmap도 두 층으로 나뉜다. global costmap은 넓은 영역의 경로 계획을 담당하고, local costmap은 로봇 주변의 실시간 장애물 감지를 담당한다. 이 구분은 Planner와 Controller의 구분과 그대로 짝을 이룬다. 즉 Planner Server는 global costmap을, Controller Server는 local costmap을 참조한다.

### localization

localization은 로봇이 지도 안에서 자기 위치를 추정하는 문제다. Nav2에서는 필수 기능이며, AMCL 같은 알고리즘으로 실시간 추정을 수행한다. AMCL은 Adaptive Monte Carlo Localization의 약어로, 파티클 필터 기반 위치 추정 방법이다.

localization이 흔들리면 경로 계획 자체가 어긋난다. 계획한 경로가 옳아도 로봇이 자기 위치를 잘못 알면 엉뚱한 곳으로 이동하기 때문이다. 원문이 localization을 경로 계획의 전제 조건으로 설명하는 이유가 이것이다.

## 핵심 기능

앞 절의 다섯 가지가 구성 요소의 정의라면, 원문의 두 번째 절은 그 구성 요소들이 만들어내는 동작을 네 가지로 묶는다.

| 기능 | 내용 |
|---|---|
| 경로 계획 | global과 local 경로 계획으로 목적지까지 효율적이고 안전하게 이동한다. 장애물을 피하도록 실시간으로 갱신된다 |
| 복구 행동 | 장애물에 막히거나 예상하지 못한 상황에 놓였을 때 다시 경로를 찾아 정상 주행으로 돌아오게 한다 |
| Behavior Tree 기반 제어 | 상황에 맞는 행동을 순차 또는 병렬로 실행한다. 트리 구조라 확장이 쉽다 |
| 모듈형 구조 | 각 기능이 독립 모듈이라 필요에 맞게 확장하거나 수정할 수 있다. 다양한 하드웨어와 센서를 통합하기 쉽다 |

복구 행동(recovery behavior)은 입문 단계에서 중요한 항목이다. 원문이 드는 대표 예는 후진과 경로 재계획이다. 즉 Nav2는 경로 추종이 실패하는 상황을 예외가 아니라 정상 동작의 일부로 다루며, 이 처리를 Behavior Server라는 별도 서버에 맡긴다.

모듈형 구조는 나머지 세 기능이 서버 단위로 나뉘어 있는 이유를 설명한다. 각 기능이 독립 모듈이므로 사용자는 필요한 부분만 교체하거나 확장할 수 있다.

## 시스템 아키텍처

원문의 후반부는 공식 아키텍처 다이어그램을 싣고 그 구성 요소를 8개 항목으로 나눠 설명한다. 항목은 8개지만 Velocity Smoother와 Collision Monitor가 한 항목으로 묶여 있어, 실제로 등장하는 구성 요소는 9개다.

![[assets/yhoons-2024-ros2-nav2-intro/fig02.png]]
*Figure 1: Nav2 시스템 아키텍처. BT Navigator Server가 하위 서버들을 조율하고, 출력이 Velocity Smoother와 Collision Monitor를 거쳐 Robot Base에 전달된다 (yhoons 2024, 공식 다이어그램).*

### 다이어그램 읽는 순서

다이어그램은 세 부분으로 나눠 읽으면 구조가 드러난다.

1. 왼쪽 화살표는 Nav2로 들어오는 입력이다. BT, TF, map, Sensor Data 네 가지가 파란 상자 안으로 들어간다.
2. 가운데 파란 상자가 Nav2 본체다. 맨 위에 BT Navigator Server가 있고 그 아래에 Controller, Planner, Behavior, Smoother, Route Server가 놓인다.
3. 아래쪽 화살표는 출력 경로다. Controller Server의 출력이 Velocity Smoother와 Collision Monitor를 차례로 지나 Robot Base에 도달한다.

파란 상자 위에 점선으로 그려진 Waypoint Follower와 Autonomy System은 Nav2 바깥에서 목표를 넣어주는 상위 시스템이다. 오른쪽 위의 Lifecycle Manager는 데이터 흐름 화살표에 걸려 있지 않은데, 경로 계산에 참여하지 않고 서버들의 상태만 관리하기 때문이다.

각 서버 상자 안에는 작은 파란 블록이 함께 그려져 있다. Controller Server 안에는 Local Costmap이, Planner Server 안에는 Global Costmap이 들어 있고, Behavior Server와 Smoother Server 안에는 Costmap Subscription과 Footprint Subscription이 들어 있다. 즉 어떤 서버가 어떤 환경 정보를 참조하는지가 상자 안에 함께 표시되어 있다.

### 서버별 역할

| 구성 요소 | 역할 | 다이어그램에서의 위치 |
|---|---|---|
| BT Navigator Server | Behavior Tree로 여러 서버와 통신하며 목적지까지의 navigation 전체 과정을 관리한다. BT Plugins로 행동을 추가하거나 확장한다 | 맨 위. 위로는 상위 시스템, 아래로는 서버 네 종과 양방향 화살표로 이어진다 |
| Controller Server | 로봇의 실시간 제어를 담당한다. local costmap으로 주변 장애물을 인식해 속도와 방향을 정한다 | Sensor Data를 직접 받고, 출력이 아래 사슬로 내려간다 |
| Planner Server | global costmap으로 시작 지점부터 목표 지점까지의 전반적인 경로를 계획한다. 장기적으로 어떤 경로를 따를지 결정한다 | Controller Server 오른쪽에서 화살표로 이어진다 |
| Behavior Server | 경로를 찾지 못하거나 장애물에 막힌 상황에서 어떤 복구 행동을 할지 정의한다 | Costmap Subscription과 Footprint Subscription으로 환경 정보를 실시간 반영한다 |
| Smoother Server | 생성된 경로가 직선적이거나 각지지 않도록 매끄럽게 수정한다 | Behavior Server와 같은 두 구독을 두어 경로 수정 시 안전성을 유지한다 |
| Route Server | 복잡한 지도나 환경에서 더 고차원적인 경로 데이터를 처리해 경로 최적화를 돕는다 | Smoother Server 아래에 놓인다 |
| Velocity Smoother | 속도가 급격히 변하지 않도록 조절해 안정적인 주행을 만든다 | 파란 상자 바깥, 출력 사슬의 첫 단계 |
| Collision Monitor | 충돌하지 않도록 실시간으로 감시하고 방지한다 | Velocity Smoother 다음, Robot Base 직전 |
| Lifecycle Manager | 시스템 전반의 lifecycle을 관리한다. 각 서버의 상태를 확인하고 필요하면 재시작하거나 설정을 재구성한다 | 파란 상자 오른쪽 위, 데이터 흐름 화살표 바깥 |

서버 구성에는 두 가지 구도가 반복된다. 첫째, 경로를 만드는 쪽과 그 경로를 안전하게 내보내는 쪽이 분리되어 있다. Planner Server와 Controller Server가 경로와 속도를 만들면, Velocity Smoother와 Collision Monitor가 그 결과를 로봇에 전달하기 전에 한 번 더 다듬고 검사한다.

둘째, 환경 정보 참조가 서버마다 명시되어 있다. Controller Server는 local costmap을, Planner Server는 global costmap을 쓰며, Behavior Server와 Smoother Server는 costmap과 footprint를 구독한다. 따라서 costmap을 먼저 이해하면 서버 다섯 종의 입력을 한꺼번에 이해할 수 있다.

## Nav2 선택 근거

원문은 Nav2를 쓰는 이유를 네 가지로 든다.

| 근거 | 내용 |
|---|---|
| ROS 2 기반 | 분산 처리와 실시간 통신을 지원해 성능과 안정성을 높인다 |
| 유연성 | 다양한 하드웨어와 센서에 맞춰 커스터마이징할 수 있고 Behavior Tree라는 유연한 제어 구조를 제공한다 |
| 확장성 | 각 모듈을 수정하거나 확장해 자기 로봇에 맞는 자율 주행 시스템을 만들 수 있다 |
| 커뮤니티 지원 | ROS 오픈소스 커뮤니티에서 지속적인 업데이트와 지원을 받는다 |

네 항목 중 앞의 셋은 앞 절에서 본 구조와 직접 이어진다. ROS 2 기반이라는 점은 서버들이 별도 노드로 나뉘어 통신하는 이유이고, 유연성과 확장성은 모듈형 구조와 Behavior Tree의 결과다. 반면 커뮤니티 지원은 구조가 아니라 프로젝트 운영에 대한 근거다.

이 절에는 수치가 없다. 벤치마크나 실험 결과를 담은 글이 아니라 개념 소개 글이기 때문이다. 성능 비교가 필요하면 원 논문이나 공식 문서 쪽 자료를 참조해야 한다.

## 학습 순서

Nav2 입문은 이름과 역할을 먼저 익히고 그다음에 구조와 사양으로 내려가는 순서가 적합하다. 원문의 전개가 이미 그 순서를 따르므로, 이 페이지도 같은 순서를 유지한다.

1. 개념 다섯 가지의 역할 구분을 잡는다. 이 페이지의 "핵심 개념" 절이 그 범위다.
2. 아키텍처 다이어그램에서 서버 이름과 데이터 흐름을 확인한다. 서버 이름이 곧 기능 이름이므로 이름과 역할을 함께 익혀 둔다.
3. ROS 2 기반 구조로 내려간다. action server, lifecycle node, TF, costmap layer 구성은 [[physical-ai/lionhong-2023-nav2-core-concepts]]가 다룬다.
4. 공식 사양을 확인한다. 배포판별 지원 상태와 하위 문서 목차는 [[physical-ai/nav2-2026-official-documentation]]에 있다.
5. 코드로 내려간다. 패키지 구성과 라이선스는 [[physical-ai/ros-navigation-navigation2]]에서 확인한다.

## 한계

입문 글이라는 성격에서 오는 한계가 뚜렷하다.

- 각 개념을 정의 수준에서만 짚는다. 설정 방법, plugin 종류, 알고리즘 선택 기준은 다루지 않는다.
- ROS 2 기반 개념이 등장하지 않는다. action server, lifecycle node, TF를 설명하지 않으므로, 이 글만으로는 다이어그램의 화살표가 왜 action 인터페이스로 그려졌는지 알기 어렵다.
- 벤치마크나 실험 수치가 없다. Nav2를 쓰는 이유가 서술로만 제시되고 정량 근거는 붙지 않는다.
- Route Server처럼 비교적 최근에 추가된 구성 요소는 이름과 한 줄 설명에 그친다.
- costmap의 layer 구조와 filter 개념이 빠져 있다. 이 부분은 [[physical-ai/lionhong-2023-nav2-core-concepts]]가 보완한다.

이런 한계에도 이 글의 쓰임은 분명하다. Nav2 문서를 처음 열었을 때 마주치는 용어와 서버 이름의 지도를 한 화면 분량으로 제공하며, 그 지도가 있으면 공식 문서의 개별 페이지로 흩어지지 않고 순서대로 읽어 나갈 수 있다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| Nav2 | ROS 2의 navigation framework. ROS 1 Navigation Stack의 후속으로 경로 계획과 제어를 담당한다 |
| Behavior Tree | 로봇의 의사결정을 트리 구조의 노드 조합으로 관리하는 제어 구조. Nav2에서는 BT Navigator Server가 실행한다 |
| costmap | 로봇 주변 환경을 이동 가능 영역, 장애물, 팽창 비용으로 표현한 2D 격자 지도. global과 local 두 층으로 나뉜다 |
| localization | 로봇이 지도 안에서 자기 위치를 추정하는 문제. Nav2는 AMCL 같은 알고리즘을 쓴다 |
| AMCL | Adaptive Monte Carlo Localization. 파티클 필터 기반 위치 추정 알고리즘 |
| MPPI | Model Predictive Path Integral. 샘플링 기반 모델 예측 제어 방식의 controller |

## 관련 페이지

- [[physical-ai/lionhong-2023-nav2-core-concepts]]: 같은 Nav2 개념을 공식 문서의 Navigation Concepts 페이지 기준으로 더 깊게 다룬 한국어 해설이다. 이 페이지가 이름과 역할까지 잡아준다면, lionhong 페이지는 action server, lifecycle node, TF, costmap layer까지 내려간다.
- [[physical-ai/nav2-2026-official-documentation]]: Nav2 공식 문서 랜딩 페이지. 프로젝트의 자기 정의, 제공 기능 목록, ROS 2 배포판별 지원 상태 같은 1차 사양은 이 페이지가 정본이다.
- [[physical-ai/ros-navigation-navigation2]]: 소스 repo. 다이어그램의 서버 이름과 실제 패키지 이름이 거의 1:1로 대응하므로, 코드나 라이선스를 확인할 때 참고한다.
- [[overviews/physical-ai-overview]]: physical-ai 카테고리의 분류 뼈대와 학습 경로 허브.
