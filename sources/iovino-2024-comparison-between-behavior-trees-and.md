---
title: "Comparison between Behavior Trees and Finite State Machines"
type: paper
year: 2024
category: physical-ai
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
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/iovino-2024-comparison-between-behavior-trees-and/fig03.png
    raw: raw/papers/iovino-2024-comparison-between-behavior-trees-and-figures/fig03.png
    caption: "pre-condition 확장 순서를 잘못 잡아 chattering이 발생하는 backchained BT"
    page: 4
    bbox_norm: [0.0985, 0.0595, 0.478, 0.2868]
    strategy: caption-region
    curated: false
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
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/iovino-2024-comparison-between-behavior-trees-and/fig05.png
    raw: raw/papers/iovino-2024-comparison-between-behavior-trees-and-figures/fig05.png
    caption: "Sequence와 Fallback 노드로 이뤄진 최소 규모의 BT subtree 예시"
    page: 4
    bbox_norm: [0.5821, 0.3889, 0.8414, 0.5359]
    strategy: caption-region
    curated: false
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
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/iovino-2024-comparison-between-behavior-trees-and/fig09.png
    raw: raw/papers/iovino-2024-comparison-between-behavior-trees-and-figures/fig09.png
    caption: "높은 우선순위 동작을 추가할 때의 비교. BT는 다른 동작을 건드리지 않지만 FSM은 연결 상태가 늘어 구조가 복잡해진다"
    page: 10
    bbox_norm: [0.0502, 0.0474, 0.9298, 0.6226]
    strategy: manual
    curated: false
  - id: fig10
    label: Figure 10
    kind: figure
    file: assets/iovino-2024-comparison-between-behavior-trees-and/fig10.png
    raw: raw/papers/iovino-2024-comparison-between-behavior-trees-and-figures/fig10.png
    caption: "sequential 상태 4개와 fully connected 상태 1개로 이뤄진 비반응형 FSM"
    page: 11
    bbox_norm: [0.0984, 0.0595, 0.4782, 0.3027]
    strategy: caption-region
    curated: false
  - id: fig11
    label: Figure 11
    kind: figure
    file: assets/iovino-2024-comparison-between-behavior-trees-and/fig11.png
    raw: raw/papers/iovino-2024-comparison-between-behavior-trees-and-figures/fig11.png
    caption: "Figure 10을 반응형으로 바꾼 FSM. 빨간 요소와 파란 요소가 각각 sequential 상태와 fully connected 상태를 처리하는 작업이다"
    page: 11
    bbox_norm: [0.0784, 0.3129, 0.498, 0.529]
    strategy: caption-region
    curated: false
  - id: fig12
    label: Figure 12
    kind: figure
    file: assets/iovino-2024-comparison-between-behavior-trees-and/fig12.png
    raw: raw/papers/iovino-2024-comparison-between-behavior-trees-and-figures/fig12.png
    caption: "Memory Sequence 노드를 루트로 삼아 open-loop 제어를 구현한 BT"
    page: 12
    bbox_norm: [0.522, 0.0596, 0.9016, 0.1432]
    strategy: caption-region
    curated: false
  - id: fig13
    label: Figure 13
    kind: figure
    file: assets/iovino-2024-comparison-between-behavior-trees-and/fig13.png
    raw: raw/papers/iovino-2024-comparison-between-behavior-trees-and-figures/fig13.png
    caption: "Genetic Programming이 생성할 법한 BT. backchaining 결과보다 더 압축된 구조다"
    page: 12
    bbox_norm: [0.522, 0.1688, 0.9016, 0.3264]
    strategy: caption-region
    curated: false
  - id: fig14
    label: Figure 14
    kind: figure
    file: assets/iovino-2024-comparison-between-behavior-trees-and/fig14.png
    raw: raw/papers/iovino-2024-comparison-between-behavior-trees-and-figures/fig14.png
    caption: "Gazebo 시뮬레이터에 구성한 실험 환경. fetch table 3개, delivery station, inspection table, recharge station이 배치돼 있다"
    page: 13
    bbox_norm: [0.0784, 0.0595, 0.498, 0.3541]
    strategy: caption-region
    curated: false
  - id: fig15
    label: Figure 15
    kind: figure
    file: assets/iovino-2024-comparison-between-behavior-trees-and/fig15.png
    raw: raw/papers/iovino-2024-comparison-between-behavior-trees-and-figures/fig15.png
    caption: "실험 3에서 docking 동작까지 추가한 BT와 FSM의 최종 구조"
    page: 16
    bbox_norm: [0.0784, 0.0757, 0.9215, 0.3125]
    strategy: caption-region
    curated: false
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
  - id: fig17
    label: Figure 17
    kind: figure
    file: assets/iovino-2024-comparison-between-behavior-trees-and/fig17.png
    raw: raw/papers/iovino-2024-comparison-between-behavior-trees-and-figures/fig17.png
    caption: "WARA Robotics 실험실 도면과 실험 5에서 로봇이 이동한 경로"
    page: 17
    bbox_norm: [0.0784, 0.0595, 0.4986, 0.4092]
    strategy: caption-region
    curated: false
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

## 한 줄 요약 (One-line Summary)

Behavior Tree와 Finite State Machine을 mobile manipulation 과제에서 모듈성(modularity), 반응성(reactivity), 가독성(readability), 설계 측면으로 비교하고, 계산 복잡도와 graph edit distance 같은 공통 지표로 정량화해 과제가 복잡해질수록 BT 쪽 유지보수 비용이 낮아진다는 것을 시뮬레이션과 실제 로봇에서 확인한 논문이다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 제목 | Comparison between Behavior Trees and Finite State Machines |
| 저자 | Matteo Iovino, Julian Förster, Pietro Falco, Jen Jen Chung, Roland Siegwart, Christian Smith |
| 소속 | ABB Corporate Research(스웨덴 Västerås), ETH Zürich Autonomous Systems Lab, University of Padova, University of Queensland, KTH |
| 발표 | arXiv 2405.16137v1, 2024년 5월 25일. IEEE 투고본 |
| 분야 | cs.RO, 로봇 제어 구조, 산업용 collaborative robotics |
| 선행 연구 | 같은 저자들의 ICRA 2023 논문 "On the programming effort required to generate Behavior Trees and Finite State Machines for robotic applications"의 확장판 |
| 구현 | BT는 `py_trees`, FSM은 SMACH. 둘 다 Python 기반이며 ROS 호환이다 |
| 공개 자료 | 비교 실험 코드 저장소(`ethz-asl/bt_fsm_comparison`)와 실행 영상 |

이 논문이 겨냥하는 독자는 산업 현장의 로봇 엔지니어다. 연구계에서는 BT가 사실상 표준으로 자리 잡았지만, 산업계는 여전히 FSM을 쓴다. 저자들은 그 이유를 "BT가 낫다는 주장이 이론적이거나 추측에 머물렀고, 실제 로봇 과제에서의 구체적 증거가 부족했다"는 데서 찾는다.

## 2. 주요 기여 (Key Contributions)

1. **동일 조건 비교 설계.** 저수준 skill 구현을 BT와 FSM이 공유하고, 그 skill을 감싸는 컨테이너만 BT의 behavior 또는 FSM의 상태로 바꿔 비교했다. 따라서 관찰된 차이는 policy 표현의 차이로만 설명된다.
2. **네 가지 성질에 대한 지표 제안.** 모듈성은 편집 연산의 계산 복잡도와 graph edit distance로, 반응성은 순차 FSM을 반응형으로 바꾸는 데 드는 연산 횟수(Effort)로, 가독성은 구조에 나타나는 요소 개수로 측정했다. 설계 선택은 정량화 대신 대안 설계 논의로 다뤘다.
3. **HFSM까지 포함한 3자 비교.** 선행 연구에서 "BT처럼 동작하도록 만든 Hierarchical FSM"이 제안됐으므로, 이 설계도 비교 대상에 넣어 모듈성과 반응성은 BT와 같지만 가독성 비용이 크다는 것을 수치로 보였다.
4. **상한 공식 도출.** action 개수 M에 대한 요소 개수와 편집 비용을 표로 정리해, 과제가 커질 때 두 표현이 어떻게 갈리는지 예측 가능한 형태로 제시했다(Table I).
5. **시뮬레이션 4종과 실제 로봇 1종의 실험.** Gazebo에서 baseline, recharge, docking, scalability 실험을 수행하고, WARA Robotics 실험실의 ABB Mobile YuMi로 동일 policy를 옮겨 실행했다.

선행 ICRA 2023 논문 대비 확장된 부분은 네 가지다. 모듈성 외에 반응성과 가독성을 추가했고, 모듈성 비교 예시를 늘렸으며, HFSM을 비교에 포함했고, 지표를 구체적 사례에서 계산하고 실제 로봇으로 옮겼다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 두 policy 표현의 정의

policy는 로봇이 현재 상황에서 어떤 동작을 실행할지 정하는 제어 규칙을 말한다. 이 논문은 그 규칙을 그림으로 표현하는 두 가지 방식을 비교한다.

**Behavior Tree**는 깊이 우선 전위 순회로 반복 실행되는 방향 트리다. tick은 루트에서 아래로 내려가며 각 노드를 실행시키는 신호를 뜻하고, BT는 매 주기마다 루트부터 다시 tick을 흘린다. 내부 노드는 control node이고 종류는 세 가지다.

| control node | 동작 |
|---|---|
| Sequence | 자식을 순서대로 실행하고 모두 성공하면 성공, 하나라도 실패하면 실패를 반환한다 |
| Fallback(Selector) | 자식을 순서대로 실행하다 하나가 성공하면 성공, 모두 실패하면 실패를 반환한다 |
| Parallel | 자식을 동시에 실행하고 미리 정한 개수가 성공하면 성공을 반환한다 |

잎 노드는 execution node 또는 behavior이며 Action 노드와 Condition 노드로 나뉜다. Action 노드는 실행 중이면 Running, 끝났으면 Success 또는 Failure를 반환하고, Condition 노드는 상태 확인만 하므로 Running 없이 즉시 Success 또는 Failure를 낸다. Running 상태가 있어서 BT는 한 tick보다 긴 동작을 표현할 수 있고, 이 점이 Decision Tree와의 결정적 차이다.

**Finite State Machine**은 상태와 transition으로 이뤄진다. transition은 한 상태에서 다른 상태로 실행이 넘어가는 연결을 말한다. 각 상태는 로봇 동작을 담은 컨트롤러이고, 동작의 결과가 이벤트를 일으켜 다음 상태로 실행을 넘긴다. FSM은 PLC용 그래픽 프로그래밍 언어인 Sequential Function Chart를 포함하는 개념이라 산업계에 널리 퍼져 있다.

저자들은 FSM의 실행 방식을 초기 프로그래밍 언어의 GoTo 문에, BT의 실행 방식을 함수 호출에 비유한다. GoTo는 실행 흐름이 다른 곳으로 건너뛴 뒤 돌아오지 않지만, 함수 호출은 끝나면 호출 지점으로 복귀한다. Dijkstra가 GoTo를 해롭다고 지적한 논리가 로봇 제어 구조에도 적용된다는 것이 이 비유의 요지다.

### 3.2 FSM의 세 가지 설계 대안

FSM은 설계 자유도가 커서 같은 과제도 여러 형태로 그릴 수 있다. 논문은 세 가지를 구분한다.

1. **sequential FSM**(Figure 2). 동작 순서를 그대로 옮긴 형태다. 노드 5개와 엣지 4개로 가장 단순하지만 반응성이 없다. 실행 중 방해가 생기면 transition이 발생하지 않아 컨트롤러가 실패하고, 복구하려면 처음부터 다시 시작해야 한다. 센서 피드백을 transition 조건으로만 쓰므로 feed-forward 제어에 해당한다.
2. **fault-tolerant FSM**(Figure 4). 모든 상태를 SELECTOR 상태에 연결한 설계다. SELECTOR는 실패한 실행이 돌아오는 지점으로, 로봇과 환경의 상태를 확인한 뒤 과제가 어디까지 진행됐는지 판단해 알맞은 상태로 실행을 다시 보낸다. 각 실행 상태에는 자기 자신으로 되돌아오는 Running transition을 둬서 비동기 실행과 주기적 환경 감시를 전제로 동작을 중단할 수 있게 했다. 노드 6개와 엣지 18개다.
3. **HFSM**(Figure 6). 선행 연구가 제안한 설계로, 모든 로봇 동작을 Running, Success, Failure 세 결과를 갖는 FSM으로 만들고 이를 다시 상위 FSM에 담아 Sequence 또는 Fallback 노드의 동작을 흉내 낸다. 구조를 강제했으므로 모듈성과 반응성은 BT와 같아지지만, 노드 4개짜리 subtree(Figure 5)를 옮기는 데 그림 한 페이지가 필요할 만큼 요소가 늘어난다.

### 3.3 backchaining과 chattering 문제

BT를 자동 생성하는 방법에는 Genetic Programming, Learning from Demonstration, planner, 혼합 방식이 있다. 이 논문은 수렴 보장이 증명된 backchaining을 기본으로 삼는다. backchaining은 목표에서 출발해 그 조건을 만족시키는 action을 붙이고, 그 action의 미충족 pre-condition을 다시 같은 방식으로 확장하는 절차다. 결과적으로 Fallback과 Sequence가 번갈아 나타나는 구조가 만들어지는데, 이는 좋은 설계 관행으로 권장되는 형태다.

다만 pre-condition의 확장 순서가 결과를 좌우한다. Figure 3은 `Place cube2!`의 pre-condition인 `Robot-At delivery?`를 `Cube2 in Hand?`보다 먼저 확장했을 때 생기는 구조다. 로봇은 먼저 배송 위치로 이동하고, 그러면 `Robot-At delivery?`가 Success를 반환한다. 이어서 큐브를 집으러 이동하는 순간 `Robot-At delivery?`가 즉시 Failure로 바뀌어 `Move-To delivery!`가 다시 실행된다. 이 진동은 tick 횟수 제한이 없으면 무한히 이어진다. 저자들은 계획에서 action이 실행되는 순서와 pre-condition 확장 순서를 대조해 이 문제를 피한다.

같은 post-condition을 여러 action이 달성하는 경우에는 subtree 정렬 순서가 또 다른 설계 자유도가 된다. 실행 시간, 성공 확률, 사전 정의한 비용으로 정렬하는 방식이 권장되며, 실행 시점에 비용이 가장 낮은 subtree를 고르는 선행 연구도 있다.

### 3.4 모듈성 측정

저자들은 네 가지 수정 시나리오를 정의하고 baseline인 Figure 1(BT)과 Figure 4(FSM)에 각각 적용했다.

1. 물체를 쥔 뒤 팔을 접어 이동에 적합한 자세로 만드는 동작 추가
2. 표준 이동 동작이 실패했을 때 장애물에 더 가까이 접근하되 속도를 낮춘 안전 경로로 이동하는 대안 추가
3. mobile manipulation 과제가 끝난 뒤 docking station으로 이동하는 동작 추가
4. 배터리가 부족해지면 어느 시점에서든 충전하는 동작 추가

**BT의 편집 복잡도는 O(1)이다.** 노드를 추가하려면 부모 control node의 자식 목록에서 원하는 위치에 삽입하면 된다. BT에서 자식 노드끼리는 서로 연결돼 있지 않으므로 부모 노드에 접근한 뒤 삽입하는 것으로 끝난다. 제거도 같은 복잡도이며, subtree 단위로 다뤄도 루트를 입력 노드로 보면 마찬가지다. 다만 Blackboard 변수를 쓰면 이 성질이 깨지므로 권장되지 않는다.

**FSM의 편집 복잡도는 O(n)이다.** 상태 추가 방식은 세 가지로 나뉜다.

| 추가 방식 | 필요한 작업 |
|---|---|
| sequential state | 선행 상태와 후행 상태 사이의 transition을 지우고, 선행에서 신규로, 신규에서 후행으로 transition을 만든 뒤 SELECTOR와의 연결을 처리한다 |
| alternative state | 선행 상태의 FAILURE transition 목적지를 SELECTOR 대신 신규 상태로 바꾸고, 선행에서 후행으로 가던 transition을 복사해 신규 상태에도 붙인 뒤 신규 상태에서 SELECTOR로 가는 FAILURE transition을 추가한다 |
| connected state | 다른 모든 상태에서 신규 상태로 가는 transition을 추가하고 SELECTOR와의 연결을 처리한다 |

상태를 제거할 때는 그 상태를 드나드는 모든 transition을 지우고, 다른 상태의 결과 목록에서도 해당 상태를 빼야 한다. 모든 transition과 모든 상태를 순회하므로 O(2n)이다. 더 중요한 문제는 FSM의 전환 논리가 표현이 아니라 상태 내부 코드에 들어 있다는 점이다. fully connected 상태를 제거하려면 그 상태를 참조하는 모든 상태의 코드를 고쳐야 한다.

HFSM은 이 문제를 부분적으로 해결한다. 삽입 지점이 정해지면 일관성 검사가 해당 깊이에서만 이뤄지므로 복잡도는 O(k)이고, k는 삽입 지점 부모 노드의 자식 개수다. 구조를 강제한 대가로 모듈성은 얻지만 가독성을 잃는다.

### 3.5 graph edit distance

편집량을 수치화하기 위해 저자들은 graph edit distance를 쓴다. GED는 그래프 g1을 g2와 동형으로 만드는 데 필요한 최소 편집 연산 횟수로 정의되며, 노드와 엣지의 추가, 제거, 치환이 편집 연산에 해당한다. BT 전용 edit distance 정의는 트리에만 적용되므로 FSM과 비교할 수 없어서, 트리를 그래프의 특수한 경우로 보고 GED를 택했다. 계산에는 NetworkX 라이브러리를 썼다.

각 표현에서 노드 하나가 만들어내는 편집량은 다음과 같이 다르다.

| 표현 | 노드 1개 추가 시 편집량 |
|---|---|
| BT | 2 (노드 자신과 부모로 가는 엣지 1개) |
| FSM | 5 이상 (alternative state는 4). fully connected 상태면 4 + n |
| HFSM | Condition 3, Action 4, control node 5 |

HFSM의 GED는 구성 요소 차이의 함수로 정리된다. 조건 노드 수 차이를 Δc, action 노드 수 차이를 Δa, 내부 제어 노드 수 차이를 Δi라 할 때 `GED = 3Δc + 4Δa + 5Δi`다. 이 공식은 HFSM 그래프 변환 규칙에서 나온다. action 노드는 정점 1개와 엣지 3개, condition 노드는 Running이 없어 엣지 2개, control node는 첫 자식으로 가는 엣지가 더해져 엣지 4개를 기여하고, 실행 결과를 담는 상태 3개가 추가된다.

이 규칙으로 Figure 1의 BT를 HFSM으로 옮기면 Fallback 4개, Sequence 2개, Action 4개, Condition 4개에서 정점 17개와 엣지 44개가 나온다.

### 3.6 반응성 측정

논문은 반응형 제어 policy가 만족해야 할 조건을 두 가지로 정의한다.

1. 외부 개입이나 방해로 과제의 일부가 이미 수행됐거나 원상 복구됐다면, 로봇은 이미 끝난 단계를 건너뛰거나 되돌려진 단계를 다시 수행해야 한다.
2. 실행 중 더 높은 우선순위의 동작이 필요해지면(배터리 충전 등) 현재 동작을 중단하고 우선순위가 높은 동작을 먼저 실행해야 한다.

BT는 두 조건을 구조적으로 만족한다. 루트가 Success를 반환한 뒤에도 계속 tick되므로, 과제 완료 후 사람이 큐브를 다른 테이블로 옮기면 로봇이 다시 집으러 간다. 우선순위가 높은 subtree는 트리의 왼쪽 위에 놓이고, tick이 왼쪽에서 오른쪽으로 흐르므로 배터리 감시 조건이 Failure를 반환하는 즉시 실행 중인 동작이 중단되고 충전 동작으로 넘어간다.

FSM이 같은 수준의 반응성을 얻으려면 모든 상태를 서로 연결하거나 SELECTOR 설계를 도입해야 한다. 저자들은 그 비용을 Effort라는 지표로 정의한다. sequential 상태 개수를 Ms, fully connected 상태 개수를 Mfc라 할 때

`E(Ms, Mfc) = 3(Ms + 1) + Mfc[(Ms + Mfc - 1) + 3]`

이고, `M = Ms + Mfc`로 두면

`E(M, Mfc) = 3(M + 1) + Mfc(M - 1)`

로 정리된다. 각 항의 의미는 다음과 같다. SELECTOR 상태와 그 자기 transition, SUCCESS로 가는 transition을 만드는 데 3회. 각 sequential 상태마다 Running 자기 transition, 상태에서 SELECTOR로 가는 FAILURE transition, SELECTOR에서 상태로 돌아오는 transition을 만드는 데 3회씩. 각 fully connected 상태마다 기존 transition을 제거하는 데 (Ms + Mfc - 1)회, SELECTOR 연결에 3회.

Figure 2의 sequential FSM은 노드 5개와 엣지 4개이고 Figure 4의 반응형 FSM은 노드 6개와 엣지 18개다. 변환에는 15회의 연산이 필요하다. BT와 HFSM은 구조상 이미 반응형이므로 노드 개수와 무관하게 Effort가 0이다.

### 3.7 가독성 측정

가독성은 사람이 구조만 보고 로봇 동작을 이해하고 디버깅할 수 있는 정도를 뜻하며 정량화가 어렵다. 저자들은 대신 구조에 나타나는 요소 개수를 세는 방식을 택했다. 이것이 엄밀한 지표는 아니라는 점을 논문이 명시하며, 과제 복잡도에 따라 구조 복잡도가 어떻게 늘어나는지 보여주는 용도로 쓴다.

Graphical Elements는 노드와 엣지를 모두 센 값이고, Active Elements는 사람이 직접 조작할 수 있는 요소만 센 값이다.

**BT의 경우** action 노드 M개에 대해 조건 노드도 대략 M개, 각 짝을 묶는 Fallback 노드도 M개, Sequence 노드는 대략 M/2개다. 따라서 노드 총수는 N = 3.5M이고 이것이 Active Elements가 된다. 엣지는 T = N - 1이므로 Graphical Elements는 S = N + T = 7M - 1이다.

**FSM의 경우** action 상태 M개에 SELECTOR를 더해 N = M + 1이다. transition은 상태별 Running 자기 transition N개, action 상태별 Failure transition M개, SELECTOR에서 각 상태로 돌아오는 transition M개, 각 상태에서 다음 상태로 가는 transition M개, SELECTOR에서 결과로 가는 transition 1개다. fully connected 상태가 있으면 `Tfc = Mfc(M - 1)`이 더해진다. 이를 합하면 T = 4M + 2이고 결과 상태를 포함해 S = 5M + 4 + Tfc다. FSM에서는 노드와 transition이 모두 편집 대상이므로 Active Elements와 Graphical Elements가 같다.

fully connected 그래프로 반응성을 구현하는 대안 설계는 상태마다 N - 1개의 transition을 가지므로 S = M(M - 1)이 되어 과제 규모의 제곱으로 늘어난다.

**HFSM의 경우** action M개, 조건 M개, Fallback M개, Sequence 0.5M개 구조에서 action은 요소 10개, 조건은 7개, control node는 8개를 기여한다. Graphical Elements를 셀 때는 IN 상태와 그 transition을 감안해 노드마다 2개를 더하고, 두 경우 모두 루트 결과 상태의 transition 3개를 뺀다.

세 표현의 지표 상한을 모으면 Table I이 된다.

| policy 표현 | 계산 복잡도 | Edit Distance | Effort | Graphical Elements | Active Elements |
|---|---|---|---|---|---|
| Backchained BT | O(1) | 2n* | 0 | 약 7M - 1 | 약 3.5M |
| Fault-Tolerant FSM | O(n) | f(n*, n) | 3(M + 1) + Tfc | 약 5M + 4 + Tfc | 약 5M + 4 + Tfc |
| HFSM | O(1) | kn* | 0 | 약 36M - 3 | 약 29M - 3 |

여기서 n은 BT에서는 노드 수, FSM에서는 상태와 transition을 합한 수다. n*은 편집 연산에서 수정해야 하는 노드 또는 상태 수, M은 BT에서는 action 노드 수, FSM에서는 상태 수다.

가독성에는 요소 개수로 환원되지 않는 측면도 있다. FSM은 현재 상태에서 갈 수 있는 다음 동작이 transition으로 명시되므로 운영자가 다음에 무엇이 일어날지 분명히 안다. 실행이 과거 이벤트에 의존하는 인과적 구조이기 때문이다. 반면 BT는 매 반복마다 루트에서 다시 시작하므로 어떤 동작이든 중단되고 실행 흐름이 트리의 다른 곳으로 이동할 수 있어, 운영자에게 더 많은 훈련이 필요하다. 선행 연구가 수정한 `py_trees`는 실행 중인 behavior를 노란색, 성공을 초록색, 실패를 빨간색으로 표시해 이 부담을 줄인다.

한편 트리 구조에서는 subtree를 노드 하나로 접어 세부를 감출 수 있다(Figure 16a). FSM에서는 transition이 많아 같은 방식이 불가능하고, 계층으로 묶으려면 HFSM의 제약을 감수해야 한다.

### 3.8 대안 설계 논의

저자들은 FSM 편을 드는 반론도 함께 다룬다. 단순함과 가독성이 가장 중요하다면 BT로도 같은 feed-forward 제어를 만들 수 있다. Memory 노드(mSequence 또는 Sequence*)를 쓰면 이미 성공한 자식을 다시 실행하지 않으므로 Figure 12 같은 open-loop BT가 된다. 이런 목적이라면 BT를 쓸 이점이 없다는 것이 선행 연구의 결론이다.

backchaining 대신 Genetic Programming으로 BT를 생성하면 더 압축된 구조가 나온다. 같은 action과 condition 집합으로 GP를 돌리면 Figure 13 같은 BT가 만들어지는데, 큐브로 이동하는 action을 조건 노드로 보호해 chattering을 피하는 방식을 학습한다. 이 BT는 노드 9개와 엣지 8개로, 대응하는 반응형 FSM의 노드 6개와 엣지 18개보다 단순하다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 실험 환경과 skill 구성

실험 과제는 RoboCup@Home 벤치마크의 Cleaning Up 과제를 변형한 것으로, 알려진 환경에 흩어진 물체를 모아 정해진 구역에 놓는 작업이다. 시뮬레이션 로봇은 Clearpath Ridgeback 전방향 이동 베이스에 Franka Emika Panda 팔을 결합하고 Intel RealSense RGBD 카메라를 장착한 구성이다.

저수준 skill 구현은 다음과 같다.

| 구성 | 사용 도구 |
|---|---|
| 이동 | ROS Navigation Stack. 목표 자세는 환경 내 station과 테이블에 대응하는 고정 집합으로 제한 |
| 물체 인식 | AprilTag |
| 팔 경로 계획 | ROS MoveIt! |
| grasping 자세 계산 | Volumetric Grasping Network |
| skill 인터페이스 | ROS action server와 클라이언트. 초기화, 목표 전달, 실행 중 상태 감시, 목표 취소를 담당 |

정의된 action과 condition은 `Move-To!`, `Robot-At?`, `Pick!`, `In Hand?`, `Place!`, `Object-At?`, `Recharge!`, `Battery Lv?`, `Dock!`이고, 확장성 실험에는 `Search!`와 `Found?`가 추가된다. `Pick!`은 대상 물체 위 pre-grasp 자세로 팔을 옮긴 뒤 VGN으로 grasping 자세를 계산하고, 성공하면 이동에 적합하도록 팔을 접는다.

### 4.2 실험 1 baseline

로봇이 fetch table 1의 큐브를 집어 delivery station으로 옮기는 과제다. 큐브 위치는 미리 알려져 있다.

sequential FSM은 모든 동작이 허용 오차 안에서 정확히 수행될 때만 과제를 완수하고, 실행 중 실패가 나면 과제를 초기화해야 한다. BT와 fault-tolerant FSM은 실패한 동작을 다시 시도한다. 여기에 더해 BT는 루트에서 재귀적으로 tick되므로 과제를 완수한 뒤에도 계속 실행되고, 사람이 큐브를 다른 테이블로 옮기면 새 위치를 아는 한 다시 회수한다.

구조 규모는 BT가 노드 14개와 엣지 13개, FSM이 노드 6개와 엣지 18개이며 FSM의 cyclomatic complexity는 14다.

### 4.3 실험 2 배터리 충전 시나리오

기존 과제에 충전 동작을 추가한다. BT에서는 새 Sequence 루트를 만들어 충전 subtree를 mobile manipulation subtree보다 앞에 배치한다. 필요한 기본 연산은 8회로, 루트를 포함한 노드 4개 생성, Fallback 노드에 잎 2개 추가, 충전 subtree와 기존 BT를 새 루트에 결합하는 작업이다. 결과 BT는 노드 18개와 엣지 17개이고 baseline 대비 ED는 8이다.

fault-tolerant FSM도 8회의 연산이 필요하다. 충전 상태와 Running transition 생성, 충전 상태에서 SELECTOR로 가는 transition 추가, 모든 상태에서 충전 상태로 가는 transition 추가다. 결과 FSM은 노드 7개와 엣지 25개, ED 8, cyclomatic complexity 20이다.

연산 횟수는 8회로 같지만 성격이 다르다. FSM 쪽 신규 transition 개수는 기존 노드 수에 의존하는 반면 BT 쪽 연산 횟수는 트리 크기와 무관하다. 또한 FSM에서는 새 상태로의 transition을 유발하는 조건을 각 상태 내부 코드에 넣어야 한다. BT에서는 전환 논리가 표현 자체에 명시된다.

논문은 충전 동작이 배터리를 즉시 가득 채운다고 가정한다. 로봇이 충전소에 멈추면 작업자가 배터리를 교체하는 상황으로 정당화할 수 있다는 설명이다. 점진적으로 충전되는 상황이라면 더 급한 과제가 생겼을 때 충전을 선점하도록 subtree를 다르게 설계해야 하며, 그 구현 예시는 선행 연구에 있다.

동작 측면에서는 두 표현 모두 과제 실행이 동일하고, 배터리 잔량이 20% 아래로 떨어지면 충전을 수행한다.

### 4.4 실험 3 docking 시나리오

과제 종료 후 로봇이 지정 위치에 docking하는 동작을 추가한다. BT에서는 Sequence 루트가 이미 있으므로 Fallback 노드와 조건, action을 만들고, control node에 잎 2개를 붙인 뒤 subtree를 루트에 덧붙이면 된다. 트리의 나머지 부분은 영향을 받지 않는다. 결과는 노드 21개와 엣지 20개, 실험 2 대비 ED 6이다.

FSM에서는 신규 상태, Running transition, SELECTOR와 주고받는 transition을 만드는 데 더해 `Place` 상태에서 SUCCESS로 가던 transition을 제거하고 `Dock` 상태에서 결과로 가는 transition을 새로 만들어야 한다. 결과는 상태 8개와 transition 30개, ED 6, cyclomatic complexity 24다.

### 4.5 실험 4 확장성

로봇이 큐브 5개를 탐색해 회수한 뒤 docking하는 과제로 규모를 키웠다. 이 시점의 구조는 BT가 노드 77개와 엣지 76개, FSM이 노드 24개와 transition 90개다.

여기에 충전 동작을 추가하면 차이가 분명해진다. BT는 루트가 이미 있으므로 실험 3과 같은 ED 6이고 최종 구조는 노드 80개와 엣지 79개다. FSM은 모든 상태에서 충전 상태로 가는 transition을 만들어야 해서 ED가 26이고 최종 구조는 노드 25개와 transition 115개다.

### 4.6 전체 지표 요약

| 실험 | 단계 | Cyclomatic Complexity (BT/FSM) | Edit Distance (BT/FSM) | Graphical Elements (BT/FSM) | Active Elements (BT/FSM) |
|---|---|---|---|---|---|
| Development | Baseline | 1 / 14 | - / - | 27 / 24 | 14 / 24 |
| Development | Recharge | 1 / 20 | 8 / 8 | 35 (+8) / 32 (+8) | 18 (+4) / 32 (+8) |
| Development | Docking | 1 / 24 | 6 / 8 | 41 (+6) / 38 (+6) | 21 (+3) / 38 (+6) |
| Scalability | Baseline | 1 / 68 | - / - | 153 / 114 | 77 / 114 |
| Scalability | Recharge | 1 / 92 | 6 / 26 | 159 (+6) / 140 (+26) | 80 (+3) / 140 (+26) |

BT의 cyclomatic complexity는 모든 단계에서 1로 유지되는 반면 FSM은 14에서 92까지 늘어난다. 요소 개수만 보면 작은 과제에서는 FSM이 오히려 적다. Development baseline에서 BT의 Graphical Elements는 27개로 FSM의 24개보다 많다. 그러나 Scalability baseline에서는 BT 153개 대 FSM 114개로 격차가 좁혀지지 않는 대신, Active Elements가 BT 77개 대 FSM 114개로 역전된다. 사람이 실제로 편집해야 하는 요소 수에서 BT가 유리해진다는 뜻이다.

네 가지 수정 시나리오에 대한 graph edit distance는 다음과 같다.

| 수정 시나리오 | BT | FSM | HFSM |
|---|---|---|---|
| 팔 접기 subtree 추가 | 6 | 5 | 12 |
| Safe-Move-To 동작 추가 | 2 | 4 | 4 |
| Dock subtree 추가 | 8 | 5 | 17 |
| 배터리 충전 subtree 추가 | 8 | 8 | 17 |

작은 baseline에서는 FSM의 GED가 BT보다 낮은 경우도 있다. 팔 접기와 Dock 추가가 그렇다. 그러나 HFSM은 모든 시나리오에서 두 표현보다 크게 높고, FSM의 값은 baseline이 커질수록 급격히 증가한다. 실험 4가 그 지점을 보여준다.

### 4.7 실험 5 실제 로봇

실험 3과 동일한 policy를 실제 시스템에 옮겼다. 장소는 WARA Robotics 실험실이고 로봇은 ABB Mobile YuMi Research Platform이다. skill은 ROS2로 구현했으며 이동은 Nav2, 인식은 ArUco 마커, manipulation은 자체 ROS2 드라이버로 목표 자세를 컨트롤러에 전달하는 방식이다.

이 실험의 목적은 두 가지다. 첫째, policy는 과제 수준의 계획이므로 BT든 FSM이든 플랫폼에 무관하며 플랫폼에 의존하는 것은 저수준 skill 구현뿐이다. 둘째, skill 구현이 같다면 BT로 제어하든 FSM으로 제어하든 로봇의 동작이 유사하다.

논문은 `Move-To` 동작의 의사 코드를 두 표현에서 나란히 제시한다. `py_trees` API에서 BT의 behavior는 처음 tick될 때만 `initialise`가 불리고 이후에는 `update`가 불린다. `update`는 이동이 끝나지 않았으면 RUNNING, 성공하면 SUCCESS, 아니면 FAILURE를 반환한다. 즉 다른 behavior에 대한 정보를 전혀 담지 않는다. FSM의 상태는 `execute`가 다른 상태로 전환될 때까지 주기적으로 불리는데, 그 안에 배터리 상태 확인이 들어가야 충전 상태로 넘어갈 수 있다. 이 확인은 FSM의 모든 상태에 반복해서 넣어야 하므로 복잡도가 커질수록 유지가 어려워진다.

실행 순서는 fetch station으로 이동해 물체를 집고, delivery station으로 향하던 중 배터리가 부족해져 충전을 우선 수행한 뒤, 과제를 재개해 물체를 놓고 inspection table에 docking하는 것이다. 배터리 소모는 시뮬레이션이고 충전은 즉시 이뤄진다. 여기서도 두 표현 사이에 로봇 동작의 차이는 없다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **가독성 지표의 주관성.** 요소 개수 세기는 저자들 스스로 "엄밀한 의미의 지표는 아니다"라고 밝힌 방법이다. 구조 복잡도가 과제 복잡도에 따라 어떻게 변하는지 보여주는 지시자로만 쓰인다.
- **Maintainability Index 제외.** 선행 연구가 쓴 MI는 코드 줄 수, 주석 비율, Halstead volume에 의존해 구현 라이브러리의 영향을 크게 받는다고 보고 비교에서 제외했다. 따라서 소프트웨어 공학 관점의 유지보수성은 다루지 않는다.
- **충전 즉시 완료 가정.** 배터리가 순간적으로 가득 찬다는 가정 아래 실험했다. 점진적 충전에서는 우선순위 선점 설계가 필요하고 그 구조는 다르게 나온다.
- **BT의 학습 곡선.** control node의 동작 방식을 이해해야 동작 전환을 따라갈 수 있으므로 BT 쪽 진입 장벽이 높다. 통제된 환경의 짧은 과제라면 FSM이 구상과 구현 모두 더 쉽다는 점을 논문이 인정한다.
- **동작 자체는 동일하다.** 제안한 fault-tolerant FSM 설계를 쓰면 로봇의 실행 동작은 BT와 유사하다. 두 표현의 차이는 순수하게 설계와 유지보수 선택의 문제로 남는다.
- **과제 범위.** 실험은 단일 물체 회수와 큐브 5개 회수라는 mobile manipulation 과제에 한정된다. 다른 도메인이나 더 긴 long-horizon 과제로의 일반화는 검증되지 않았다.
- **자동 생성 의존.** BT 설계의 복잡도는 자동 생성 방법으로 완화할 수 있다고 제안하지만, 어떤 생성 방법이 어떤 과제에 적합한지는 이 논문의 범위 밖이다.

## 6. 관련 연구 (Related Work)

| 구분 | 내용 |
|---|---|
| BT 서베이 | Iovino 외 2022. 로보틱스와 AI 분야의 BT 연구를 정리한 survey로, 이 논문의 배경 |
| BT 평가 지표 | Gugliermo 외 2024. BT 평가 지표를 다룬 후속 연구로, 더 깊은 지표 분석을 원하는 독자에게 안내된다 |
| 직접 선행 연구 | Iovino 외 ICRA 2023. 프로그래밍 노력 관점의 BT와 FSM 비교로, 이 논문이 확장한 대상 |
| 이론적 비교 | Colledanchise & Ögren의 교재와 후속 논문. BT가 FSM을 모듈화한다는 것을 이론적으로 증명하고, BT처럼 동작하는 HFSM 설계를 제시했다 |
| 표현력 비교 | BT와 Decision Tree, Teleo-reactive Program, FSM의 비교. FSM은 내부 변수와 과거 결정에 접근할 수 있어 표현력이 더 크고, BT는 매 입력마다 루트에서 재시작하므로 반응성과 가독성이 낫다는 결론 |
| 모듈성 형식화 | 반응형 제어 구조의 모듈성을 형식화하고 cyclomatic complexity를 도입한 연구. CC는 `CC = a + s - n + 1`로 정의되며 여기서 a는 호(arc), s는 sink, n은 노드 수다. 단일 진입과 단일 종료로 변환한 BT는 CC가 1이라 모듈성이 최적이다 |
| UAV 임무 | Klöckner. UAV 임무 제어에 BT를 쓰는 방안을 제시하며 FSM 대비 이점을 추정했다 |
| 자율주행 비교 | 자율주행 도메인에서 CC와 Maintainability Index로 두 표현을 비교한 연구. 이 논문은 CC 정의가 부정확하고 MI는 라이브러리 의존적이라고 보아 다른 방식을 택했다 |
| 게임 도메인 | Mario AI 벤치마크에서 노드 수와 reward function으로 비교한 연구. 생성 방법이 서로 달라 공정한 비교는 아니지만, 복잡도가 BT는 선형, FSM은 제곱 이상으로 증가한다는 결론을 이 논문이 인용한다 |
| 혼합 설계 | BT의 일부 노드를 FSM으로 만들거나, 반대로 FSM의 상태를 BT로 만드는 설계들. 상위를 FSM으로 두면 사람이 모드 전환을 통제하기 쉽고, 실제 동작 구현은 BT의 모듈성이 유리하다는 관찰 |
| Stack-of-Tasks 결합 | 우선순위가 있는 목표를 등식과 부등식 제약으로 동시에 만족시키는 제어 패러다임과 BT의 결합. 국소 최소값 회피에 흔히 쓰이던 FSM 대신 BT를 써서 반응성과 재사용성 한계를 해결했다는 주장 |
| BT 자동 생성 | Genetic Programming, Learning from Demonstration, planner 기반 생성과 혼합 방식. backchaining 계열은 수렴 보장이 증명돼 있다 |
| 거리 지표 도구 | 트리 전용 edit distance 정의와 graph edit distance 정의, 계산에 쓴 NetworkX 라이브러리 |
| 저수준 구성 요소 | RoboCup@Home 벤치마크, Volumetric Grasping Network |

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| Behavior Tree (BT) | 로봇 의사결정을 트리 노드 조합으로 표현하는 제어 구조. 루트에서 tick이 흘러 내려가며 매 주기 전체가 다시 평가된다 |
| Finite State Machine (FSM) | 상태와 transition으로 제어를 표현하는 구조. 각 상태가 로봇 동작을 담고 결과 이벤트가 다음 상태를 결정한다 |
| HFSM | Hierarchical FSM. 동작을 Running, Success, Failure 결과를 갖는 FSM으로 감싸 계층으로 쌓아 BT의 동작을 흉내 내는 설계 |
| tick | BT의 루트에서 잎으로 흘러 각 노드를 실행시키는 신호. 실행 중인 동작도 매 tick마다 상위 조건 재평가의 영향을 받는다 |
| control node | BT의 내부 노드. Sequence, Fallback, Parallel 세 종류가 자식의 실행 순서와 성공 판정 규칙을 정한다 |
| Running | BT 노드가 반환하는 세 가지 상태 중 하나로, 동작이 한 tick보다 길게 이어지고 있음을 뜻한다 |
| SELECTOR 상태 | fault-tolerant FSM 설계에서 실패한 실행이 모이는 상태. 로봇과 환경을 확인해 과제가 어디까지 진행됐는지 판단해 알맞은 상태로 실행을 되돌린다 |
| backchaining | 목표에서 거꾸로 출발해 pre-condition을 만족시키는 action을 붙여 나가며 BT를 생성하는 방법. 수렴 보장이 증명돼 있다 |
| chattering | pre-condition 확장 순서를 잘못 잡아 두 동작이 서로를 무효화하며 무한 반복되는 현상 |
| graph edit distance (GED) | 한 그래프를 다른 그래프와 동형으로 만드는 데 필요한 최소 편집 연산 횟수 |
| cyclomatic complexity (CC) | 결정 구조의 복잡도 지표로 `CC = a + s - n + 1`로 정의된다. 단일 진입과 단일 종료로 변환한 BT는 항상 1이다 |
| Effort | 이 논문이 정의한 반응성 비용 지표. sequential FSM을 반응형으로 바꾸는 데 필요한 편집 연산 횟수 |
| Graphical Elements / Active Elements | 구조에 그려진 모든 요소 개수와 사람이 편집할 수 있는 요소 개수. 가독성 비교에 쓰인다 |
| Memory Sequence | 이미 성공한 자식을 다시 실행하지 않는 Sequence 변형. BT로 open-loop 제어를 만들 때 쓴다 |
| VGN | Volumetric Grasping Network. 형상 기반으로 grasping 자세를 계산하는 방법으로 `Pick!` skill에 쓰였다 |

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 2 | backchaining planner가 생성한 baseline BT | caption-region | 별표 wiki 권장 (architecture) |
| fig02 | 2 | 순차 실행 FSM baseline | caption-region | 별표 wiki 권장 (architecture) |
| fig03 | 4 | chattering이 발생하는 BT | caption-region | 별표 wiki 권장 (설계 함정) |
| fig04 | 4 | SELECTOR를 둔 fault-tolerant FSM | caption-region | 별표 wiki 권장 (method) |
| fig05 | 4 | 최소 BT subtree 예시 | caption-region | 별표 wiki 권장 (fig06과 짝) |
| fig06 | 5 | 같은 동작의 HFSM | caption-region | 별표 wiki 권장 (가독성 대비) |
| fig07 | 6 | BT 노드 추가 4사례와 합산 결과 | manual | 별표 wiki 권장 (modularity) |
| fig08 | 7 | FSM 상태 추가 4사례와 합산 결과 | manual | 별표 wiki 권장 (modularity) |
| fig09 | 10 | 우선순위 동작 추가 비교 | manual | (확인 필요) |
| fig10 | 11 | 비반응형 FSM (Ms 4, Mfc 1) | caption-region | (확인 필요) |
| fig11 | 11 | 반응형으로 바꾼 FSM | caption-region | (확인 필요) |
| fig12 | 12 | Memory Sequence 기반 open-loop BT | caption-region | (확인 필요) |
| fig13 | 12 | Genetic Programming이 생성할 BT | caption-region | (확인 필요) |
| fig14 | 13 | Gazebo 시뮬레이션 환경 | caption-region | 별표 wiki 권장 (experiment) |
| fig15 | 16 | 실험 3의 BT와 FSM | caption-region | (확인 필요) |
| fig16 | 16 | 확장성 실험의 BT와 FSM | manual | 별표 wiki 권장 (핵심 결과) |
| fig17 | 17 | WARA Robotics 실험실 도면과 이동 경로 | caption-region | (확인 필요) |
| fig18 | 18 | ABB Mobile YuMi 실행 장면 | manual | 별표 wiki 권장 (real robot) |
| tab01 | 5 | 지표별 상한 요약 | manual | 별표 wiki 권장 (result) |
| tab02 | 8 | 수정 시나리오별 GED | manual | 별표 wiki 권장 (result) |
| tab03 | 14 | 실험별 지표 측정값 | manual | 별표 wiki 권장 (result) |
