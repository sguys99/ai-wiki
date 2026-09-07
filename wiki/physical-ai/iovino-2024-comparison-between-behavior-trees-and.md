---
title: "Comparison between Behavior Trees and Finite State Machines"
type: paper
year: 2024
category: physical-ai
source: iovino-2024-comparison-between-behavior-trees-and.md
raw_path: raw/papers/iovino-2024-comparison-between-behavior-trees-and.pdf
raw_filename: "iovino-2024-comparison-between-behavior-trees-and.pdf"
source_collection: external
authors: "Matteo Iovino, Julian Förster, Pietro Falco, Jen Jen Chung, Roland Siegwart, Christian Smith (ABB Corporate Research, ETH Zürich, University of Padova, University of Queensland, KTH)"
arxiv_id: "2405.16137"
url: "https://arxiv.org/abs/2405.16137"
tags: [physical-ai, manipulation, mobile-robot]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/iovino-2024-comparison-between-behavior-trees-and/fig01.png
    raw: raw/papers/iovino-2024-comparison-between-behavior-trees-and-figures/fig01.png
    caption: "backchaining 방식의 planner가 자동 생성한 baseline Behavior Tree. 노드 14개와 엣지 13개로 이뤄진 mobile manipulation 과제 구조"
    page: 2
    bbox_norm: [0.0985, 0.0595, 0.478, 0.3095]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/iovino-2024-comparison-between-behavior-trees-and/fig02.png
    raw: raw/papers/iovino-2024-comparison-between-behavior-trees-and-figures/fig02.png
    caption: "동작을 순서대로 실행하는 sequential FSM. 노드 5개와 엣지 4개이며 실패하면 전체를 다시 시작해야 한다"
    page: 2
    bbox_norm: [0.582, 0.0595, 0.8414, 0.3176]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/iovino-2024-comparison-between-behavior-trees-and/fig04.png
    raw: raw/papers/iovino-2024-comparison-between-behavior-trees-and-figures/fig04.png
    caption: "SELECTOR 상태를 도입한 fault-tolerant FSM. 노드 6개와 엣지 18개로 반응성을 확보한 baseline"
    page: 4
    bbox_norm: [0.522, 0.0595, 0.9014, 0.3484]
    strategy: caption-region
    curated: true
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/iovino-2024-comparison-between-behavior-trees-and/fig06.png
    raw: raw/papers/iovino-2024-comparison-between-behavior-trees-and-figures/fig06.png
    caption: "Figure 5의 subtree와 똑같이 동작하도록 만든 HFSM. 같은 기능을 담는 데 훨씬 많은 요소가 필요하다"
    page: 5
    bbox_norm: [0.1284, 0.2826, 0.448, 0.9038]
    strategy: caption-region
    curated: true
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/iovino-2024-comparison-between-behavior-trees-and/fig07.png
    raw: raw/papers/iovino-2024-comparison-between-behavior-trees-and-figures/fig07.png
    caption: "BT에 노드를 추가하는 네 가지 사례와 이를 모두 합친 결과. 추가된 노드는 빨간색으로 표시했다"
    page: 6
    bbox_norm: [0.0502, 0.0624, 0.9498, 0.9176]
    strategy: manual
    curated: true
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/iovino-2024-comparison-between-behavior-trees-and/fig08.png
    raw: raw/papers/iovino-2024-comparison-between-behavior-trees-and-figures/fig08.png
    caption: "fault-tolerant FSM에 상태를 추가하는 네 가지 사례와 이를 모두 합친 결과. 추가된 요소는 자홍색으로 표시했다"
    page: 7
    bbox_norm: [0.0502, 0.0524, 0.9398, 0.9376]
    strategy: manual
    curated: true
  - id: fig16
    label: Figure 16
    kind: figure
    file: assets/iovino-2024-comparison-between-behavior-trees-and/fig16.png
    raw: raw/papers/iovino-2024-comparison-between-behavior-trees-and-figures/fig16.png
    caption: "실험 4 확장성 비교. 큐브 5개를 회수하는 과제에서 BT는 subtree를 접어 표현할 수 있지만 FSM은 transition이 폭증한다"
    page: 16
    bbox_norm: [0.0502, 0.3524, 0.9498, 0.9376]
    strategy: manual
    curated: true
  - id: fig18
    label: Figure 18
    kind: figure
    file: assets/iovino-2024-comparison-between-behavior-trees-and/fig18.png
    raw: raw/papers/iovino-2024-comparison-between-behavior-trees-and-figures/fig18.png
    caption: "ABB Mobile YuMi 플랫폼으로 수행한 실험 5의 실제 실행 장면 4컷"
    page: 18
    bbox_norm: [0.0602, 0.0524, 0.9298, 0.3176]
    strategy: manual
    curated: true
  - id: tab01
    label: Table I
    kind: table
    file: assets/iovino-2024-comparison-between-behavior-trees-and/tab01.png
    raw: raw/papers/iovino-2024-comparison-between-behavior-trees-and-figures/tab01.png
    caption: "세 가지 policy 표현의 지표별 상한 요약. 계산 복잡도, edit distance, 반응성 확보 비용, 요소 개수를 M에 대한 식으로 정리한 표"
    page: 5
    bbox_norm: [0.0602, 0.0504, 0.9298, 0.2526]
    strategy: manual
    curated: true
  - id: tab02
    label: Table II
    kind: table
    file: assets/iovino-2024-comparison-between-behavior-trees-and/tab02.png
    raw: raw/papers/iovino-2024-comparison-between-behavior-trees-and-figures/tab02.png
    caption: "네 가지 수정 시나리오에 대한 BT, FSM, HFSM의 graph edit distance 측정값"
    page: 8
    bbox_norm: [0.5052, 0.6554, 0.9148, 0.8256]
    strategy: manual
    curated: true
  - id: tab03
    label: Table III
    kind: table
    file: assets/iovino-2024-comparison-between-behavior-trees-and/tab03.png
    raw: raw/papers/iovino-2024-comparison-between-behavior-trees-and-figures/tab03.png
    caption: "개발 실험과 확장성 실험에서 측정한 cyclomatic complexity, edit distance, 요소 개수의 BT 대 FSM 비교"
    page: 14
    bbox_norm: [0.0602, 0.0504, 0.9298, 0.2776]
    strategy: manual
    curated: true
---

## 요약

이 논문은 로봇의 제어 흐름을 그림으로 표현하는 두 방식인 Behavior Tree와 Finite State Machine을 mobile manipulation 과제에서 정면으로 비교한다. Behavior Tree는 로봇의 의사결정을 트리 구조의 노드 조합으로 관리하는 제어 구조이고, Finite State Machine은 상태와 transition으로 제어 흐름을 표현하는 구조다. 두 방식의 우열은 오래 논의됐지만 대부분 이론적 증명이거나 추정이었고, 같은 로봇 과제를 같은 저수준 구현으로 풀어 놓고 비교한 사례는 없었다.

저자들은 모듈성(modularity), 반응성(reactivity), 가독성(readability), 설계 선택 네 측면에 각각 지표를 붙이고, 두 표현이 같은 skill 구현을 공유하도록 실험을 설계했다. 결론은 두 가지다. 과제를 푸는 동안의 로봇 동작은 어느 표현을 쓰든 사실상 같다. 그러나 과제가 복잡해질수록 구조를 유지보수하는 비용은 Behavior Tree 쪽이 뚜렷하게 낮아진다.

수치로 보면 차이가 분명하다. 큐브 하나를 회수하는 과제에 충전 동작을 추가할 때 두 표현 모두 편집 연산이 8회로 같다. 그런데 큐브 5개를 회수하는 과제로 규모를 키운 뒤 같은 동작을 추가하면 Behavior Tree는 여전히 6회지만 FSM은 26회가 필요하다. FSM에서 새 상태로 가는 transition 개수가 기존 상태 개수에 비례하기 때문이다.

## 배경

### 연구계와 산업계의 간극

산업 현장의 로봇은 사람과 공간을 공유하므로 예기치 못한 결과와 실패를 스스로 처리해야 한다. 고정된 동작 순서만 따르는 제어는 이런 환경에서 오작동으로 이어진다. 여기에 더해 새 과제로 빠르게 옮겨 갈 수 있어야 하므로 재사용 가능한 모듈 구조가 필요하고, 사람이 감시하고 디버깅할 수 있도록 구조가 읽혀야 한다.

Behavior Tree는 이 세 요구를 모두 만족한다고 알려져 있으며 연구계에서는 사실상 표준이 됐다. 반면 산업계는 여전히 Finite State Machine을 쓴다. 설계가 직관적이고 현장 활용 경험이 훨씬 오래 쌓여 있기 때문이다. 저자들은 이 간극의 원인을 증거 부족으로 본다. BT의 우위를 주장한 선행 연구는 이론적 증명이거나 특정 도메인의 추정에 머물렀고, 산업 엔지니어가 납득할 구체적 사례가 없었다.

### 무엇을 새로 하는가

이 논문은 같은 저자들의 ICRA 2023 논문을 확장한 것이다. 확장된 부분은 네 가지다.

- 모듈성만 다루던 비교에 반응성과 가독성을 추가했다.
- 모듈성 비교의 예시 개수를 늘렸다.
- BT처럼 동작하도록 설계된 Hierarchical FSM을 비교 대상에 포함했다.
- 제안한 지표를 구체적 사례에서 계산하고, 시뮬레이션 policy를 실제 로봇으로 옮겨 실행했다.

비교의 공정성을 위해 저자들은 저수준 skill 구현을 두 표현이 공유하게 했다. 이동, grasping, 인식 같은 기능은 하나의 API로 구현하고, 그 API를 감싸는 컨테이너만 BT의 behavior 또는 FSM의 상태로 바꿨다. 따라서 관찰된 차이는 policy 표현의 차이로만 설명된다. policy는 로봇이 현재 상황에서 어떤 동작을 실행할지 정하는 제어 규칙을 뜻한다. BT 구현에는 `py_trees`, FSM 구현에는 SMACH를 썼고 둘 다 Python 기반이며 ROS 호환이다.

## 핵심 개념

### Behavior Tree

Behavior Tree는 깊이 우선 전위 순회로 반복 실행되는 방향 트리다. tick은 루트에서 잎으로 흘러 각 노드를 실행시키는 신호를 뜻하고, BT는 매 주기마다 루트에서 다시 tick을 흘린다. 즉 이미 실행 중인 동작도 매 주기 상위 조건의 재평가를 받는다.

내부 노드는 control node이며 세 종류가 있다.

| control node | 동작 |
|---|---|
| Sequence | 자식을 순서대로 실행하고 모두 성공하면 성공, 하나라도 실패하면 실패를 반환한다 |
| Fallback (Selector) | 자식을 순서대로 실행하다 하나가 성공하면 성공, 모두 실패하면 실패를 반환한다 |
| Parallel | 자식을 동시에 실행하고 미리 정한 개수가 성공하면 성공을 반환한다 |

잎 노드는 execution node 또는 behavior라 부르며 두 종류다. Action 노드는 tick을 받으면 동작을 실행하고 Running, Success, Failure 중 하나를 반환한다. Condition 노드는 상태 확인만 하므로 Running 없이 즉시 Success 또는 Failure를 낸다.

Running 상태의 존재가 BT를 Decision Tree와 갈라놓는다. Decision Tree는 한 번의 평가로 결정이 끝나지만, BT는 Running을 통해 한 tick보다 긴 동작을 표현할 수 있다. 동시에 매 tick마다 트리 전체가 논리적으로 재평가되므로, 우선순위가 높은 동작이 필요해지면 실행 중인 동작이 중단된다.

모듈성은 BT의 구조에서 곧바로 나온다. 모든 노드가 같은 입력(tick)과 같은 반환값 집합을 갖기 때문에, 어떤 subtree든 그 자체로 하나의 BT다. 따라서 subtree를 떼어 다른 곳으로 옮기거나 따로 시험해도 나머지 구조가 영향을 받지 않는다.

![[assets/iovino-2024-comparison-between-behavior-trees-and/fig01.png]]
*Figure 1: backchaining planner가 자동 생성한 baseline BT. 큐브를 집어 배송 위치에 놓는 과제를 노드 14개와 엣지 13개로 표현한다 (Iovino 2024, p.2)*

### Finite State Machine

Finite State Machine은 상태 자동기계에서 나온 표현으로 상태와 transition으로 이뤄진다. transition은 한 상태에서 다른 상태로 실행이 넘어가는 연결을 말한다. 각 상태는 로봇 동작을 담은 컨트롤러이고, 그 동작이 환경에 일으킨 결과가 이벤트가 되어 다음 상태로 실행을 넘긴다.

FSM이 산업계에서 널리 쓰이는 이유는 두 가지다. 설계가 직관적이고 구현이 단순하며, PLC용 그래픽 프로그래밍 언어인 Sequential Function Chart를 포함하는 개념이라 제조 현장의 기존 도구와 이어지기 때문이다.

문제는 반응성과 모듈성이 서로 당긴다는 점이다. FSM이 반응형이 되려면 transition이 많아야 하는데, transition이 많아지면 상태를 추가하거나 제거할 때 처리할 연결이 함께 늘어나 모듈성과 확장성이 나빠진다.

저자들은 이 성질을 프로그래밍 언어의 GoTo 문에 비유한다. GoTo는 실행 흐름이 다른 곳으로 건너뛴 뒤 돌아오지 않는다. 반면 BT의 실행은 함수 호출에 가깝다. 흐름이 다른 곳으로 옮겨 가더라도 완료되면 호출 지점으로 복귀한다. Dijkstra가 GoTo를 해롭다고 지적한 논리가 로봇 제어 구조에도 적용된다는 것이 이 비유의 요지다.

![[assets/iovino-2024-comparison-between-behavior-trees-and/fig02.png]]
*Figure 2: 동작을 순서대로 실행하는 sequential FSM. 노드 5개와 엣지 4개로 가장 단순하지만 실패하면 FAILURE로 빠져 전체를 다시 시작해야 한다 (Iovino 2024, p.2)*

### 계층으로 쌓은 HFSM

FSM의 모듈성 문제를 완화하는 방법 중 하나는 상태를 논리적으로 묶어 계층을 만드는 것이다. 이것이 Hierarchical FSM이며 약어로 HFSM이라 쓴다. 재사용성은 나아지지만 상태를 넣고 빼기는 여전히 어렵고, 계층 자체를 사람이 손으로 만드는 경우가 많아 모듈성 문제가 안쪽 계층으로 옮겨 갈 뿐이다. 반응형 HFSM은 결국 완전 연결 그래프가 되기 쉽다.

선행 연구는 BT와 정확히 같게 동작하는 HFSM 설계를 제시했다. 모든 로봇 동작을 Running, Success, Failure 세 결과를 갖는 FSM으로 만들고, 그 FSM 두 개 이상을 다시 상위 FSM에 담아 Sequence 또는 Fallback 노드의 동작을 흉내 내는 방식이다. 구조를 강제했으므로 모듈성과 반응성은 BT와 같아진다. 대신 표현이 크게 부풀어 오른다.

병렬 합성으로 모듈성을 얻는 방법도 있다. 하위 과제별로 FSM을 따로 설계한 뒤 합성 연산으로 전체 FSM을 자동 생성하는 방식인데, 생성된 FSM의 상태 수가 하위 FSM 상태 수의 조합으로 늘어난다. 그래서 병렬 합성 FSM은 그림 대신 기호로 표현하는 경우가 많다.

![[assets/iovino-2024-comparison-between-behavior-trees-and/fig06.png]]
*Figure 6: 노드 4개짜리 BT subtree와 똑같이 동작하도록 만든 HFSM. 같은 기능을 담는 데 그림 한 페이지가 필요하다 (Iovino 2024, p.5)*

## 방법

### backchaining 기반 BT 생성

BT를 자동 생성하는 방법에는 Genetic Programming, Learning from Demonstration, planner 기반, 혼합 방식이 있다. 이 논문은 수렴 보장이 증명된 backchaining을 기본으로 삼는다.

backchaining은 목표에서 거꾸로 출발한다. 각 action은 pre-condition과 post-condition을 함께 정의해 두고, 목표 조건을 달성하는 action을 붙인 뒤 그 action의 미충족 pre-condition을 다시 같은 방식으로 확장한다. 이렇게 만들어진 BT는 Fallback과 Sequence가 번갈아 나타나는 구조가 되는데, 이는 좋은 설계 관행으로 권장되는 형태다.

### chattering 설계 함정

backchaining에서는 pre-condition의 확장 순서가 결과를 좌우한다. Figure 1의 BT에서 `Place cube2!`의 pre-condition인 `Robot-At delivery?`를 `Cube2 in Hand?`보다 먼저 확장하면 진동하는 컨트롤러가 만들어진다.

동작을 따라가면 이렇다. 로봇은 먼저 배송 위치로 이동하고, 그러면 `Robot-At delivery?`가 Success를 반환한다. 이어서 큐브를 집으러 `Move-To cube2!`를 실행하는데, 로봇이 움직이는 순간 `Robot-At delivery?`가 즉시 Failure로 바뀌어 `Move-To delivery!`가 다시 실행된다. 두 이동 동작이 서로를 무효화하며 무한히 반복되고, tick 횟수 제한이 없으면 이 진동은 끝나지 않는다. 저자들은 계획에서 action이 실행되는 순서와 pre-condition 확장 순서를 대조해 이 문제를 피한다.

같은 post-condition을 여러 action이 달성하는 경우에는 subtree 정렬 순서가 또 다른 설계 자유도가 된다. 실행 시간, 성공 확률, 사전 정의한 비용으로 정렬하는 방식이 권장되며, 실행 시점에 비용이 가장 낮은 subtree를 고르는 선행 연구도 있다.

### FSM의 세 가지 설계

FSM은 설계 자유도가 커서 같은 과제도 여러 형태로 그릴 수 있다. 논문은 세 가지를 구분한다.

| 설계 | 규모 | 성질 |
|---|---|---|
| sequential FSM | 노드 5개, 엣지 4개 | 동작 순서를 그대로 옮긴 형태. 반응성이 없고 실패하면 처음부터 다시 시작해야 한다 |
| fault-tolerant FSM | 노드 6개, 엣지 18개 | 모든 상태를 SELECTOR에 연결해 반응성을 확보한 설계 |
| HFSM | 계층 구조 | BT와 같은 모듈성과 반응성을 얻지만 요소 개수가 크게 늘어난다 |

sequential FSM이 반응하지 못하는 이유는 센서 피드백을 transition 조건으로만 쓰기 때문이다. 예상하지 못한 방해가 생기면 어떤 transition도 발생하지 않으므로 컨트롤러가 실패한다. 이는 feed-forward 제어에 해당한다.

fault-tolerant FSM은 SELECTOR 상태를 도입해 이 문제를 해결한다. SELECTOR는 실패한 실행이 모이는 지점으로, 로봇과 환경의 상태를 확인한 뒤 과제가 어디까지 진행됐는지 판단해 알맞은 상태로 실행을 다시 보낸다. 각 실행 상태에는 자기 자신으로 되돌아오는 Running transition을 둬서, 비동기 실행과 주기적 환경 감시를 전제로 실행 중인 동작을 중단할 수 있게 했다. planner가 FSM을 생성하는 경우 SELECTOR에서 특정 상태로 가는 transition은 그 상태의 pre-condition이 발동시킨다.

![[assets/iovino-2024-comparison-between-behavior-trees-and/fig04.png]]
*Figure 4: SELECTOR 상태를 도입한 fault-tolerant FSM. Running은 노란색, Success는 초록색, Failure는 빨간색 transition이다 (Iovino 2024, p.4)*

### 모듈성과 편집 복잡도

저자들은 네 가지 수정 시나리오를 정의하고 baseline BT와 baseline FSM에 각각 적용해 편집 비용을 쟀다.

1. 물체를 쥔 뒤 팔을 접어 이동에 적합한 자세로 만드는 동작 추가
2. 표준 이동이 실패했을 때 장애물에 더 가까이 접근하되 속도를 낮춘 안전 경로로 이동하는 대안 추가
3. mobile manipulation 과제가 끝난 뒤 docking station으로 이동하는 동작 추가
4. 배터리가 부족해지면 어느 시점에서든 충전하는 동작 추가

**BT의 편집 복잡도는 O(1)이다.** 노드를 추가하려면 부모 control node의 자식 목록에서 원하는 위치에 삽입하면 된다. BT에서 자식 노드끼리는 서로 연결돼 있지 않으므로 부모 노드에 접근한 뒤 삽입하는 것으로 작업이 끝난다. 제거도 같은 복잡도이고, subtree 단위로 다룰 때도 루트를 입력 노드로 보면 마찬가지다. 다만 Blackboard 변수를 쓰면 자식 사이에 숨은 연결이 생겨 이 성질이 깨지므로 권장되지 않는다.

특수한 경우로 subtree를 트리 앞이나 뒤에 덧붙이는 편집이 있다. 배터리가 부족해지는 즉시 충전하게 하려면 충전 subtree가 과제 subtree보다 높은 우선순위를 가져야 하므로, 새 Sequence 루트를 만들고 그 앞에 붙인다. docking처럼 과제 뒤에 오는 동작은 같은 루트의 뒤에 붙인다.

![[assets/iovino-2024-comparison-between-behavior-trees-and/fig07.png]]
*Figure 7: BT에 노드를 추가하는 네 가지 사례와 이를 모두 합친 결과 (e). 추가된 노드는 빨간색이며 기존 구조는 그대로 남는다 (Iovino 2024, p.6)*

**FSM의 편집 복잡도는 O(n)이다.** 상태를 추가하는 방식이 세 가지로 나뉘고 각각 처리가 다르다.

| 추가 방식 | 필요한 작업 |
|---|---|
| sequential state | 선행 상태와 후행 상태 사이의 transition을 지우고, 선행에서 신규로, 신규에서 후행으로 transition을 만든 뒤 SELECTOR와의 연결을 처리한다 |
| alternative state | 선행 상태의 FAILURE transition 목적지를 SELECTOR 대신 신규 상태로 바꾸고, 선행에서 후행으로 가던 transition을 복사해 신규 상태에도 붙인 뒤 신규 상태에서 SELECTOR로 가는 FAILURE transition을 추가한다 |
| connected state | 다른 모든 상태에서 신규 상태로 가는 transition을 추가하고 SELECTOR와의 연결을 처리한다 |

상태를 제거할 때는 그 상태를 드나드는 모든 transition을 지우고, 다른 상태의 결과 목록에서도 해당 상태를 빼야 한다. 모든 transition과 모든 상태를 순회하므로 O(2n)이다.

더 근본적인 문제는 전환 논리의 위치다. FSM에서 상태 전환 조건은 표현에 그려지지 않고 상태 내부 코드에 들어 있다. 따라서 fully connected 상태를 제거하려면 그 상태를 참조하는 모든 상태의 코드를 고쳐야 한다. 같은 명령 블록의 사본이 여러 곳에 흩어지는 구조는 오류의 원인이 된다. BT를 편집할 때는 부모 노드 하나만 있으면 되지만, FSM을 편집할 때는 모든 상태와 transition에 접근할 수 있어야 한다는 점이 두 표현의 결정적 차이다.

HFSM은 이 문제를 부분적으로 해결한다. 삽입 지점이 정해지면 일관성 검사가 해당 깊이에서만 이뤄지므로 복잡도가 O(k)로 줄어들고, k는 삽입 지점 부모 노드의 자식 개수다. 구조를 강제한 대가로 모듈성은 얻지만 가독성을 잃는 교환이다.

![[assets/iovino-2024-comparison-between-behavior-trees-and/fig08.png]]
*Figure 8: fault-tolerant FSM에 상태를 추가하는 네 가지 사례와 합산 결과 (e). 추가된 요소는 자홍색이며 (e)에서는 transition이 서로 교차한다 (Iovino 2024, p.7)*

우선순위 재배치에서도 차이가 드러난다. 비상시 로봇을 정지시키는 동작을 추가한 뒤 충전과 정지 중 무엇을 먼저 할지 바꾼다고 하자. BT는 tick이 왼쪽에서 오른쪽으로 흐르므로 루트의 자식 목록에서 subtree 순서만 바꾸면 된다. FSM에서는 우선순위가 transition 설계에 녹아 있어서, 모든 상태의 구현을 고쳐 `Recharge!`로 가는 transition이 `Shut Down!`보다 먼저 발동하게 만들고 `Shut Down!`에서 `Recharge!`로 가는 transition도 새로 만들어야 한다.

### 편집량의 정량화

편집 비용을 숫자로 옮기기 위해 저자들은 graph edit distance를 쓴다. graph edit distance는 한 그래프를 다른 그래프와 동형으로 만드는 데 필요한 최소 편집 연산 횟수이며 약어로 GED라 쓴다. 노드와 엣지의 추가, 제거, 치환이 편집 연산에 해당한다.

BT 전용 edit distance 정의가 이미 있지만 트리에만 적용되므로 FSM과 비교할 수 없다. 그래서 트리를 그래프의 특수한 경우로 보고 GED를 택했다. 계산에는 NetworkX 라이브러리를 썼다.

같은 동작 하나를 추가해도 표현마다 편집량이 다르다.

| 표현 | 노드 1개 추가 시 편집량 |
|---|---|
| BT | 2 (노드 자신과 부모로 가는 엣지 1개) |
| FSM | 5 이상. alternative state는 4. fully connected 상태면 4 + n |
| HFSM | Condition 3, Action 4, control node 5 |

HFSM의 GED는 구성 요소 차이의 함수로 정리된다. 조건 노드 수 차이를 Δc, action 노드 수 차이를 Δa, 내부 제어 노드 수 차이를 Δi라 할 때 `GED = 3Δc + 4Δa + 5Δi`다. 이 공식은 HFSM을 그래프로 옮기는 규칙에서 나온다. action 노드는 정점 1개와 엣지 3개를 기여하고, condition 노드는 Running을 반환하지 않으므로 엣지가 하나 적으며, control node는 첫 자식으로 가는 엣지가 더해져 엣지 4개를 기여한다. 여기에 실행 결과를 담는 상태 3개가 추가된다.

이 규칙으로 Figure 1의 BT를 HFSM으로 옮기면 Fallback 4개, Sequence 2개, Action 4개, Condition 4개에서 정점 17개와 엣지 44개가 나온다. 같은 내용을 BT로 그리면 노드 14개와 엣지 13개다.

네 시나리오에서 각 구조의 규모는 다음과 같다.

| 구조 | BT | FSM | HFSM |
|---|---|---|---|
| baseline | 노드 14, 엣지 13 | 노드 6, 엣지 18 | 정점 17, 엣지 44 |
| 팔 접기 추가 | 노드 17, 엣지 16 | 노드 7, 엣지 22 | 정점 20, 엣지 53 |
| Safe-Move-To 추가 | 노드 15, 엣지 14 | 노드 7, 엣지 21 | 정점 18, 엣지 47 |
| Dock 또는 충전 추가 | 노드 18, 엣지 17 | 노드 7, 엣지 22 또는 25 | 정점 21, 엣지 57 |

![[assets/iovino-2024-comparison-between-behavior-trees-and/tab02.png]]
*Table II: 네 가지 수정 시나리오에 대한 BT, FSM, HFSM의 graph edit distance (Iovino 2024, p.8)*

작은 baseline에서는 FSM의 GED가 BT보다 낮은 경우도 있다. 팔 접기 subtree 추가는 BT 6 대 FSM 5이고 Dock subtree 추가는 BT 8 대 FSM 5다. 반면 안전 이동 대안 추가는 BT 2 대 FSM 4로 BT가 낮다. HFSM은 네 시나리오 모두에서 12에서 17 사이로 두 표현보다 훨씬 크다.

여기서 주의할 점은 이 값들이 노드 6개짜리 작은 FSM을 기준으로 잰 것이라는 사실이다. FSM의 편집량은 기존 상태 개수에 의존하므로 baseline이 커지면 값이 급격히 늘어난다. 확장성 실험이 바로 그 지점을 보여준다.

### 반응성 확보 비용

논문은 반응형 제어 policy가 만족해야 할 조건을 두 가지로 정의한다.

1. 외부 개입이나 방해로 과제의 일부가 이미 수행됐거나 원상 복구됐다면, 로봇은 이미 끝난 단계를 건너뛰거나 되돌려진 단계를 다시 수행해야 한다.
2. 실행 중 더 높은 우선순위의 동작이 필요해지면 현재 동작을 중단하고 우선순위가 높은 동작을 먼저 실행해야 한다.

BT는 두 조건을 구조적으로 만족한다. 첫째 조건은 재귀적 tick에서 나온다. 배송 위치가 grasping 위치와 가까우면 두 번째 이동 조건이 이미 만족돼 있으므로 로봇은 이동을 건너뛰고 곧바로 놓기 동작으로 넘어간다. 루트가 Success를 반환한 뒤에도 tick은 계속되므로, 과제를 마친 뒤 사람이 큐브를 다른 테이블로 옮기면 새 위치를 아는 한 로봇이 다시 집으러 간다. 둘째 조건은 tick의 방향에서 나온다. 우선순위가 높은 subtree는 트리의 왼쪽 위에 놓이고 tick이 왼쪽에서 오른쪽으로 흐르므로, 배터리를 감시하는 조건이 Failure를 반환하는 즉시 실행 중인 동작이 중단되고 충전 동작으로 실행이 옮겨 간다.

FSM이 같은 수준의 반응성을 얻으려면 모든 상태를 서로 연결하거나 SELECTOR 설계를 도입해야 한다. 작은 문제에서는 감당할 수 있지만 과제가 복잡해지면 통제하기 어려워지고, 그 대가로 모듈성을 잃는다.

저자들은 이 대가를 Effort라는 지표로 정의한다. sequential 상태 개수를 Ms, fully connected 상태 개수를 Mfc라 할 때

`E(Ms, Mfc) = 3(Ms + 1) + Mfc[(Ms + Mfc - 1) + 3]`

이고, `M = Ms + Mfc`로 두면 다음과 같이 간단해진다.

`E(M, Mfc) = 3(M + 1) + Mfc(M - 1)`

각 항이 무엇을 세는지는 다음과 같다.

| 항 | 세는 작업 |
|---|---|
| 3 | SELECTOR 상태, 그 자기 transition, SUCCESS로 가는 transition 생성 |
| sequential 상태마다 3 | Running 자기 transition, 상태에서 SELECTOR로 가는 FAILURE transition, SELECTOR에서 상태로 돌아오는 transition |
| fully connected 상태마다 (Ms + Mfc - 1) + 3 | 다른 상태로 가던 기존 transition 제거, SELECTOR와의 연결 생성 |

Figure 2의 sequential FSM은 노드 5개와 엣지 4개이고 Figure 4의 반응형 FSM은 노드 6개와 엣지 18개다. 두 구조 사이의 변환에는 15회의 연산이 필요하다. BT와 HFSM은 구조상 이미 반응형이므로 노드 개수와 무관하게 Effort가 0이다.

### 가독성과 요소 개수

가독성은 사람이 구조만 보고 로봇 동작을 이해하고 디버깅할 수 있는 정도를 뜻하며 정량화가 어렵다. 저자들은 대신 구조에 나타나는 요소 개수를 세는 방식을 택했고, 이것이 엄밀한 의미의 지표가 아니라는 점을 논문이 명시한다. 과제 복잡도에 따라 구조 복잡도가 어떻게 늘어나는지 보여주는 지시자로만 쓴다.

Graphical Elements는 노드와 엣지를 모두 센 값이고, Active Elements는 사람이 직접 편집할 수 있는 요소만 센 값이다.

**BT의 경우** backchaining 결과에서는 action 노드 M개에 대해 조건 노드도 대략 M개다. 각 조건과 action의 짝을 묶는 Fallback 노드가 M개이고, Sequence 노드 개수는 확장이 필요한 action 수에 달렸지만 어림잡아 M/2개다. 따라서 노드 총수는 N = 3.5M이고 이것이 Active Elements가 된다. 엣지는 부모와 자식을 잇는 연결뿐이라 T = N - 1이므로 Graphical Elements는 S = 7M - 1이다.

**FSM의 경우** action 상태 M개에 SELECTOR를 더해 N = M + 1이다. transition은 다음과 같이 구성된다.

- 상태마다 Running 자기 transition 1개씩, 합계 N개
- action 상태마다 Failure transition 1개씩, 합계 M개
- SELECTOR에서 각 action 상태로 돌아오는 transition M개
- 각 상태에서 다음 상태로 가는 transition M개
- SELECTOR에서 결과 상태로 가는 transition 1개
- fully connected 상태가 있으면 `Tfc = Mfc(M - 1)`

이를 합하면 T = 4M + 2이고 결과 상태를 포함해 S = 5M + 4 + Tfc다. FSM에서는 노드와 transition이 모두 편집 대상이므로 Active Elements와 Graphical Elements가 같은 값이 된다. 이 점이 BT와 크게 다르다. BT에서는 엣지가 부모와 자식 관계를 나타낼 뿐이라 사람이 따로 편집할 대상이 아니다.

fully connected 그래프로 반응성을 구현하는 대안 설계는 상태마다 N - 1개의 transition을 가지므로 S = M(M - 1)이 되어 과제 규모의 제곱으로 늘어난다.

**HFSM의 경우** action M개, 조건 M개, Fallback M개, Sequence 0.5M개 구조에서 action은 요소 10개, 조건은 7개, control node는 8개를 기여한다. Graphical Elements를 셀 때는 IN 상태와 그 transition을 감안해 노드마다 2개를 더하고, 두 경우 모두 루트 결과 상태의 transition 3개를 뺀다.

### 지표 상한 종합

세 표현의 지표 상한을 모으면 다음 표가 된다.

| policy 표현 | 계산 복잡도 | Edit Distance | Effort | Graphical Elements | Active Elements |
|---|---|---|---|---|---|
| Backchained BT | O(1) | 2n* | 0 | 약 7M - 1 | 약 3.5M |
| Fault-Tolerant FSM | O(n) | f(n*, n) | 3(M + 1) + Tfc | 약 5M + 4 + Tfc | 약 5M + 4 + Tfc |
| HFSM | O(1) | kn* | 0 | 약 36M - 3 | 약 29M - 3 |

여기서 n은 BT에서는 노드 수, FSM에서는 상태와 transition을 합한 수다. n*은 편집 연산에서 수정해야 하는 노드 또는 상태 수, M은 BT에서는 action 노드 수, FSM에서는 상태 수다.

![[assets/iovino-2024-comparison-between-behavior-trees-and/tab01.png]]
*Table I: 세 가지 policy 표현의 지표별 상한. Tfc = Mfc(M - 1)이며 Mfc는 FSM의 fully connected 상태 개수다 (Iovino 2024, p.5)*

표에서 세 가지 관계를 읽을 수 있다. 첫째, BT와 HFSM은 계산 복잡도와 Effort가 같고 FSM만 다르다. 둘째, HFSM은 Graphical Elements가 BT의 다섯 배 수준이라 모듈성을 얻는 대신 가독성을 크게 잃는다. 셋째, FSM의 요소 개수에는 Tfc 항이 붙어 있어서 fully connected 상태가 하나만 생겨도 규모가 M에 비례해 커진다.

가독성에는 요소 개수로 환원되지 않는 측면도 있다. FSM은 현재 상태에서 갈 수 있는 다음 동작이 transition으로 명시되므로 운영자가 다음에 무엇이 일어날지 분명히 안다. 실행이 과거 이벤트에 의존하는 인과적 구조이기 때문이다. 반면 BT는 매 반복마다 루트에서 다시 시작하므로 어떤 동작이든 중단될 수 있고 실행 흐름이 트리의 다른 곳으로 이동할 수 있다. 이 방식에 적응하려면 운영자에게 더 많은 훈련이 필요하다. 선행 연구가 수정한 `py_trees`는 실행 중인 behavior를 노란색, 성공한 것을 초록색, 실패한 것을 빨간색으로 표시해 이 부담을 줄인다.

한편 트리 구조에서는 subtree를 노드 하나로 접어 세부를 감출 수 있다. FSM에서는 transition이 많아 같은 방식이 불가능하고, 계층으로 묶으려면 HFSM의 제약을 감수해야 한다.

### 대안 설계 논의

저자들은 FSM 쪽 반론도 함께 다룬다. 단순함과 가독성이 가장 중요하다면 BT로도 같은 feed-forward 제어를 만들 수 있다. Memory 노드(mSequence 또는 Sequence*)는 마지막으로 실행한 자식의 상태를 기억해 이미 성공한 자식을 다시 실행하지 않는다. 이 노드를 루트에 두면 open-loop BT가 되며, open-loop 실행은 한 번 정한 순서를 중간 피드백 없이 끝까지 내보내는 방식을 말한다. 이런 목적이라면 BT를 쓸 이점이 없다는 것이 선행 연구의 결론이다.

backchaining 대신 Genetic Programming으로 BT를 생성하면 더 압축된 구조가 나온다. 같은 action과 condition 집합으로 Genetic Programming을 실행하면 큐브로 이동하는 action을 조건 노드로 보호하는 BT가 학습되는데, 이 방식이 앞서 본 chattering을 피한다. 결과 BT는 노드 9개와 엣지 8개로, 대응하는 반응형 FSM의 노드 6개와 엣지 18개보다 단순하다. 반응성과 모듈성은 모든 BT가 공유하는 성질이므로 이 구조에서도 유지된다.

## 결과

### 실험 환경과 skill 구성

실험 과제는 RoboCup@Home 벤치마크의 Cleaning Up 과제를 변형한 것으로, 알려진 환경에 흩어진 물체를 모아 정해진 구역에 놓는 작업이다. 로봇은 이동하고 물체를 인식하고 manipulation을 수행한 뒤 지정 구역에 놓아야 한다.

시뮬레이션 로봇은 Clearpath Ridgeback 전방향 이동 베이스에 Franka Emika Panda 팔을 결합하고 Intel RealSense RGBD 카메라를 장착한 구성이다. 환경에는 fetch table 3개, delivery station, inspection table, recharge station이 배치돼 있다.

저수준 skill 구현은 다음과 같다.

| 구성 | 사용 도구 |
|---|---|
| 이동 | ROS Navigation Stack. 목표 자세는 환경 내 station과 테이블에 대응하는 고정 집합으로 제한 |
| 물체 인식 | AprilTag |
| 팔 경로 계획 | ROS MoveIt! |
| grasping 자세 계산 | Volumetric Grasping Network |
| skill 인터페이스 | ROS action server와 클라이언트. 초기화, 목표 전달, 실행 중 상태 감시, 목표 취소를 담당 |

정의된 action과 condition은 `Move-To!`, `Robot-At?`, `Pick!`, `In Hand?`, `Place!`, `Object-At?`, `Recharge!`, `Battery Lv?`, `Dock!`이고, 확장성 실험에는 `Search!`와 `Found?`가 추가된다. `Pick!`은 대상 물체 위 pre-grasp 자세로 팔을 옮긴 뒤 Volumetric Grasping Network로 grasping 자세를 계산하고, 성공하면 이동에 적합하도록 팔을 접는다. `Search!`는 테이블마다 하나씩 정해진 시점 5곳을 돌며 카메라로 마커를 찾는 동작이다.

### 실험 1 baseline

로봇이 fetch table 1의 큐브를 집어 delivery station으로 옮기는 과제다. 로봇은 방 중앙에서 출발하고 큐브 위치는 미리 알려져 있다.

sequential FSM은 모든 동작이 허용 오차 안에서 정확히 수행될 때만 과제를 완수한다. 실행 중 실패가 나면 과제를 초기화해야 한다. BT와 fault-tolerant FSM은 실패한 동작을 다시 시도하므로 이 제약이 없다. 여기에 더해 BT만 갖는 성질이 하나 더 있다. 루트에서 재귀적으로 tick되므로 과제를 완수한 뒤에도 계속 실행되고, 사람이 큐브를 다른 테이블로 옮기면 새 위치를 아는 한 다시 회수한다.

구조 규모는 BT가 노드 14개와 엣지 13개, FSM이 노드 6개와 엣지 18개다. FSM의 cyclomatic complexity는 14다. cyclomatic complexity는 결정 구조의 복잡도를 재는 지표로 `CC = a + s - n + 1`로 정의되며 a는 호, s는 종료 노드, n은 노드 수다. 단일 진입과 단일 종료로 변환한 BT는 이 값이 항상 1이라 모듈성이 최적이다.

### 실험 2 배터리 충전 시나리오

기존 과제에 충전 동작을 추가한다. BT에서는 새 Sequence 루트를 만들어 충전 subtree를 mobile manipulation subtree보다 앞에 배치한다. 필요한 기본 연산은 8회다. 루트를 포함한 노드 4개 생성, Fallback 노드에 잎 2개 추가, 충전 subtree와 기존 BT를 새 루트에 결합하는 작업이다. 결과 BT는 노드 18개와 엣지 17개이고 baseline 대비 edit distance는 8이다.

fault-tolerant FSM도 8회의 연산이 필요하다. 충전 상태와 Running transition 생성, 충전 상태에서 SELECTOR로 가는 transition 추가, 모든 상태에서 충전 상태로 가는 transition 추가다. 결과 FSM은 노드 7개와 엣지 25개, edit distance 8, cyclomatic complexity 20이다.

연산 횟수는 8회로 같지만 성격이 다르다. FSM 쪽 신규 transition 개수는 기존 상태 개수에 의존하는 반면 BT 쪽 연산 횟수는 트리 크기와 무관하다. 또한 FSM에서는 새 상태로의 transition을 유발하는 조건을 각 상태 내부 코드에 넣어야 한다. BT에서는 전환 논리가 표현 자체에 그려진다.

논문은 충전 동작이 배터리를 즉시 가득 채운다고 가정한다. 로봇이 충전소에 멈추면 작업자가 배터리를 교체하는 상황으로 정당화할 수 있다는 설명이다. 점진적으로 충전되는 상황이라면 더 급한 과제가 생겼을 때 충전을 선점하도록 subtree를 다르게 설계해야 하며, 그 구현 예시는 선행 연구에 있다.

동작 측면에서는 두 표현 모두 과제 실행이 동일하고, 배터리 잔량이 20% 아래로 떨어지면 충전을 수행한다.

### 실험 3 docking 시나리오

과제 종료 후 로봇이 지정 위치에 docking하는 동작을 추가한다. BT에서는 Sequence 루트가 이미 있으므로 세 단계로 끝난다. Fallback 노드와 조건, action을 만들고, control node에 잎 2개를 붙인 뒤, subtree를 루트에 덧붙인다. 트리의 나머지 부분은 이 추가에 영향을 받지 않는다. 결과는 노드 21개와 엣지 20개이고 실험 2 대비 edit distance는 6이다.

FSM에서는 신규 상태, Running transition, SELECTOR와 주고받는 transition을 만드는 데 더해 `Place` 상태에서 SUCCESS로 가던 transition을 제거하고 `Dock` 상태에서 결과로 가는 transition을 새로 만들어야 한다. 결과는 상태 8개와 transition 30개, edit distance 6, cyclomatic complexity 24다.

### 실험 4 확장성

앞의 실험은 물체 하나를 회수하는 과제라 구현과 프로그래밍 노력을 자세히 볼 수 있는 대신 모듈성의 이점이 충분히 드러나지 않는다. 그래서 로봇이 큐브 5개를 탐색해 회수한 뒤 docking하는 과제로 규모를 키웠다.

이 시점의 구조는 BT가 노드 77개와 엣지 76개, FSM이 노드 24개와 transition 90개다. 여기에 충전 동작을 추가하면 차이가 분명해진다.

| 표현 | 추가 전 | 추가 후 | Edit Distance |
|---|---|---|---|
| BT | 노드 77, 엣지 76 | 노드 80, 엣지 79 | 6 |
| FSM | 노드 24, transition 90 | 노드 25, transition 115 | 26 |

BT는 루트가 이미 있으므로 실험 3과 같은 6회로 끝난다. FSM은 기존 24개 상태 모두에서 충전 상태로 가는 transition을 만들어야 해서 26회가 필요하다. 같은 동작을 작은 과제에 추가할 때는 8회로 같았던 비용이, 과제 규모가 커지자 3배 이상으로 벌어진 것이다.

가독성 차이도 여기서 나타난다. BT에서는 각 큐브를 다루는 subtree를 `MoMa task 1!`부터 `MoMa task 5!`까지 노드 하나로 접어 그릴 수 있어서 전체 구조가 한눈에 들어온다. FSM에서는 transition을 생략해 그려야 겨우 읽히는 수준이 된다.

![[assets/iovino-2024-comparison-between-behavior-trees-and/fig16.png]]
*Figure 16: 확장성 실험의 BT (a)와 FSM (b). FSM 그림은 가독성을 위해 transition을 일부 생략한 것이다 (Iovino 2024, p.16)*

### 실험별 지표 종합

![[assets/iovino-2024-comparison-between-behavior-trees-and/tab03.png]]
*Table III: 개발 실험과 확장성 실험에서 측정한 지표. 괄호 안 숫자는 해당 추가가 요구한 편집 단계 수다 (Iovino 2024, p.14)*

| 실험 | 단계 | Cyclomatic Complexity (BT/FSM) | Edit Distance (BT/FSM) | Graphical Elements (BT/FSM) | Active Elements (BT/FSM) |
|---|---|---|---|---|---|
| Development | Baseline | 1 / 14 | - / - | 27 / 24 | 14 / 24 |
| Development | Recharge | 1 / 20 | 8 / 8 | 35 (+8) / 32 (+8) | 18 (+4) / 32 (+8) |
| Development | Docking | 1 / 24 | 6 / 8 | 41 (+6) / 38 (+6) | 21 (+3) / 38 (+6) |
| Scalability | Baseline | 1 / 68 | - / - | 153 / 114 | 77 / 114 |
| Scalability | Recharge | 1 / 92 | 6 / 26 | 159 (+6) / 140 (+26) | 80 (+3) / 140 (+26)|

BT의 cyclomatic complexity는 모든 단계에서 1로 유지되는 반면 FSM은 14에서 92까지 증가한다. 이는 BT의 모듈성이 구조 크기와 무관하다는 이론적 성질이 실제 측정에서도 그대로 나타난 것이다.

요소 개수는 두 지표를 나눠 봐야 한다. Graphical Elements만 보면 BT가 계속 많다. Development baseline에서 27개 대 24개이고 Scalability baseline에서도 153개 대 114개다. 그런데 Active Elements에서는 관계가 역전된다. Development baseline에서 14개 대 24개, Scalability baseline에서 77개 대 114개로 BT가 적다. 사람이 실제로 편집해야 하는 요소 수에서는 BT가 처음부터 유리하다는 뜻이다. BT의 엣지는 부모와 자식 관계를 나타낼 뿐이지만 FSM의 transition은 하나하나가 편집 대상이기 때문이다.

증가폭도 갈린다. Scalability에서 충전을 추가할 때 BT의 Active Elements는 3개 늘고 FSM은 26개 늘어난다.

### 실험 5 실제 로봇

실험 3과 동일한 policy를 실제 시스템에 옮겼다. 장소는 스웨덴 WARA Robotics 실험실이고 로봇은 ABB Mobile YuMi Research Platform이다. skill은 ROS2로 구현했으며 이동은 Nav2, 인식은 ArUco 마커, manipulation은 자체 ROS2 드라이버로 목표 자세를 컨트롤러에 전달하는 방식이다.

이 실험의 목적은 두 가지를 보이는 것이다. 첫째, policy는 과제 수준의 계획이므로 BT든 FSM이든 플랫폼에 무관하다. 플랫폼에 의존하는 것은 저수준 skill 구현뿐이다. 둘째, skill 구현이 같다면 BT로 제어하든 FSM으로 제어하든 로봇의 동작이 유사하다.

논문은 `Move-To` 동작의 의사 코드를 두 표현에서 나란히 제시해 차이를 드러낸다. `py_trees` API에서 BT의 behavior는 처음 tick될 때만 `initialise`가 불리고 이후에는 `update`가 불린다. `update`는 이동이 끝나지 않았으면 RUNNING, 성공하면 SUCCESS, 아니면 FAILURE를 반환할 뿐 다른 behavior에 대한 정보를 전혀 담지 않는다. 실행을 어느 자식으로 보낼지는 BT 구조의 control node가 결정한다.

FSM의 상태는 다르다. `execute`가 다른 상태로 전환될 때까지 주기적으로 불리는데, 그 안에 배터리 상태 확인이 들어가야 충전 상태로 넘어갈 수 있다. 이 확인은 FSM의 모든 상태에 반복해서 들어가야 하므로 구조가 복잡해질수록 유지가 어려워진다. 상태를 추가할 때 반환 상태와 다른 상태 사이의 transition 대응표를 함께 제공해야 한다는 부담도 여기서 나온다.

실행 순서는 이렇다. 로봇이 fetch station으로 이동해 물체를 집고, delivery station으로 향하던 중 배터리가 부족해져 충전을 우선 수행한 뒤, 과제를 재개해 물체를 놓고 inspection table에 docking한다. 배터리 소모는 시뮬레이션이고 충전은 즉시 이뤄지지만 논지에는 영향이 없다. 여기서도 두 표현 사이에 로봇 동작의 차이는 관찰되지 않았다.

![[assets/iovino-2024-comparison-between-behavior-trees-and/fig18.png]]
*Figure 18: ABB Mobile YuMi로 수행한 실험 5의 실행 장면. 물체 집기, 충전, 배송, docking 순서다 (Iovino 2024, p.18)*

## 한계

- **가독성 지표의 주관성.** 요소 개수 세기는 저자들 스스로 엄밀한 의미의 지표가 아니라고 밝힌 방법이다. 구조 복잡도가 과제 복잡도에 따라 어떻게 변하는지 보여주는 지시자로만 쓰인다.
- **Maintainability Index 제외.** 선행 연구가 쓴 Maintainability Index는 코드 줄 수, 주석 비율, Halstead volume에 의존해 구현 라이브러리의 영향을 크게 받는다고 보고 비교에서 제외했다. 따라서 소프트웨어 공학 관점의 유지보수성은 다루지 않는다.
- **충전 즉시 완료 가정.** 배터리가 순간적으로 가득 찬다는 가정 아래 실험했다. 점진적 충전에서는 우선순위 선점 설계가 필요하고 그 구조는 다르게 나온다.
- **BT의 학습 곡선.** control node의 동작 방식을 이해해야 동작 전환을 따라갈 수 있으므로 BT 쪽 진입 장벽이 높다. 통제된 환경의 짧은 과제라면 FSM이 구상과 구현 모두 더 쉽다는 점을 논문이 인정한다.
- **동작 자체는 동일하다.** 제안한 fault-tolerant FSM 설계를 쓰면 로봇의 실행 동작은 BT와 유사하다. 두 표현의 차이는 순수하게 설계와 유지보수 선택의 문제로 남는다.
- **과제 범위.** 실험은 단일 물체 회수와 큐브 5개 회수라는 mobile manipulation 과제에 한정된다. 다른 도메인이나 더 긴 long-horizon 과제로의 일반화는 검증되지 않았다.
- **자동 생성 의존.** BT 설계의 복잡도는 자동 생성 방법으로 완화할 수 있다고 제안하지만, 어떤 생성 방법이 어떤 과제에 적합한지는 이 논문의 범위 밖이다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| tick | BT의 루트에서 잎으로 흘러 각 노드를 실행시키는 신호. 매 주기 전체 트리가 다시 평가되므로 실행 중인 동작도 상위 조건의 영향을 받는다 |
| control node | BT의 내부 노드. Sequence, Fallback, Parallel 세 종류가 자식의 실행 순서와 성공 판정 규칙을 정한다 |
| SELECTOR 상태 | fault-tolerant FSM 설계에서 실패한 실행이 모이는 상태. 로봇과 환경을 확인해 과제가 어디까지 진행됐는지 판단하고 알맞은 상태로 실행을 되돌린다 |
| backchaining | 목표에서 거꾸로 출발해 pre-condition을 만족시키는 action을 붙여 나가며 BT를 생성하는 방법. 수렴 보장이 증명돼 있다 |
| chattering | pre-condition 확장 순서를 잘못 잡아 두 동작이 서로를 무효화하며 무한 반복되는 현상 |
| graph edit distance | 한 그래프를 다른 그래프와 동형으로 만드는 데 필요한 최소 편집 연산 횟수. 약어로 GED라 쓴다 |
| cyclomatic complexity | 결정 구조의 복잡도 지표로 `CC = a + s - n + 1`로 정의된다. 단일 진입과 단일 종료로 변환한 BT는 항상 1이다 |
| Effort | 이 논문이 정의한 반응성 비용 지표. sequential FSM을 반응형으로 바꾸는 데 필요한 편집 연산 횟수다 |

## 관련 페이지

- [[physical-ai/lionhong-2023-nav2-core-concepts]]: Nav2가 FSM 대신 Behavior Tree를 조율 계층으로 택한 이유를 다룬다. 이 논문이 정량화한 상황 분기 비용이 실제 프레임워크 설계에 어떻게 반영됐는지 볼 수 있다.
- [[physical-ai/nav2-2026-official-documentation]]: BT Navigator Server가 Behavior Tree를 해석해 task server들을 호출하는 구조. 이 논문의 BT 모듈성 논의가 실제 구현에서 plugin 교체 지점으로 나타난다.
- [[physical-ai/ros-navigation-navigation2]]: Nav2 저장소의 패키지 구성. Behavior Tree가 독립 서버들을 호출하는 실행 단위 경계를 확인할 수 있다.
- [[overviews/glossary-physical-ai]]: Behavior Tree, Finite State Machine, tick, graph edit distance의 canonical 표기.
- [[overviews/physical-ai-overview]]: physical-ai 도메인 허브.
