---
title: "Know Your Body: A Harness for Direct and Self-Improving Robot Control with VLMs"
type: paper
year: 2026
category: physical-ai
raw_path: raw/papers/lou-2026-know-your-body-a-harness.pdf
raw_filename: "lou-2026-know-your-body-a-harness.pdf"
source_collection: external
authors: "Zeyu Lou, Yanhong Zeng, Yong Wang, Chenyang Si (교신저자 Chenyang Si). Nanjing University, Ant Group, Zhejiang University"
arxiv_id: "2609.28530"
url: "https://loule0-0.github.io/KnowBody/"
tags: [physical-ai, manipulation, robot-learning, spatial-reasoning]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/lou-2026-know-your-body-a-harness/fig01.png
    raw: raw/papers/lou-2026-know-your-body-a-harness-figures/fig01.png
    caption: "화이트보드 낱말 퍼즐을 풀라는 지시문을 받은 로봇. VLM은 무엇을 쓸지 알아보지만 로봇이 받는 명령은 end-effector pose이고 실제로 글씨가 써지는 곳은 쥐고 있는 마커 끝이다"
    page: 1
    bbox_norm: [0.5002, 0.2424, 0.9198, 0.4976]
    strategy: manual
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/lou-2026-know-your-body-a-harness/fig02.png
    raw: raw/papers/lou-2026-know-your-body-a-harness-figures/fig02.png
    caption: "KnowBody 전체 구조. 결정 컨텍스트와 body model을 VLM이 질의하고, 실행 결과는 Observe에서 Record와 Check를 거쳐 Update로 현재 상태만 되돌아온다. 아래 보라색 경로는 검증을 통과한 body와 규칙만 다음 episode로 넘기는 별도 갱신 경로다"
    page: 2
    bbox_norm: [0.0758, 0.0326, 1.0, 0.5003]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/lou-2026-know-your-body-a-harness/fig03.png
    raw: raw/papers/lou-2026-know-your-body-a-harness-figures/fig03.png
    caption: "body model이 노출하는 세 가지 관계. (a) 로봇이 실제로 움직인 양과 wrist 이미지에서 고정 지형지물이 밀린 양의 대응, (b) 명령 좌표계에서 실제로 작용하는 마커 끝으로의 변환, (c) 끝점만 푼 경로와 중간 waypoint까지 확인한 경로의 차이"
    page: 4
    bbox_norm: [0.0, 0.0833, 0.9142, 0.3403]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/lou-2026-know-your-body-a-harness/fig04.png
    raw: raw/papers/lou-2026-know-your-body-a-harness-figures/fig04.png
    caption: "실험 장비 구성. Franka Research 3 팔에 Robotiq 2F-85 그리퍼를 달고, 손목에 ZED Mini를, 작업대 양쪽 거치대에 ZED 2i 두 대를 배치했다"
    page: 7
    bbox_norm: [0.5177, 0.0879, 0.9107, 0.2974]
    strategy: caption-region
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/lou-2026-know-your-body-a-harness/fig05.png
    raw: raw/papers/lou-2026-know-your-body-a-harness-figures/fig05.png
    caption: "네 과제의 실행 장면과 두 평가 결과. 왼쪽은 오리 넣기와 사과 밀기와 글씨 쓰기와 물 붓기의 진행 사진, 오른쪽 위는 연속 성공 5회 동안의 reasoning round 추이, 오른쪽 아래는 고정 예산 32회 시행의 전체 결과표다"
    page: 8
    bbox_norm: [0.0858, 0.0833, 0.9143, 0.478]
    strategy: caption-region
    curated: true
  - id: tab01
    label: Table 1
    kind: table
    file: assets/lou-2026-know-your-body-a-harness/tab01.png
    raw: raw/papers/lou-2026-know-your-body-a-harness-figures/tab01.png
    caption: "DROID 설정에서 학습한 policy 두 종과의 과제별 성공 횟수 비교. KnowBody는 네 과제 모두에서 성공했고 두 policy는 오리 넣기에 편중됐다"
    page: 8
    bbox_norm: [0.5533, 0.6382, 0.8695, 0.7217]
    strategy: table-region
    curated: false
  - id: taba1
    label: Table A1
    kind: table
    file: assets/lou-2026-know-your-body-a-harness/taba1.png
    raw: raw/papers/lou-2026-know-your-body-a-harness-figures/taba1.png
    caption: "harness가 구분하는 네 가지 시계. 모델 호출과 상호작용과 episode와 과제 계약이 각각 언제 하나씩 넘어가는지를 정의한다"
    page: 12
    bbox_norm: [0.0858, 0.3611, 0.9169, 0.5705]
    strategy: table-region
    curated: false
  - id: taba2
    label: Table A2
    kind: table
    file: assets/lou-2026-know-your-body-a-harness/taba2.png
    raw: raw/papers/lou-2026-know-your-body-a-harness-figures/taba2.png
    caption: "구성 요소별 권한 경계. 컨텍스트 컴파일러와 VLM planner와 body 질의 층과 executor와 verifier와 갱신 파이프라인이 각각 무엇을 읽고 무엇을 만들며 무엇은 할 수 없는지를 적었다"
    page: 13
    bbox_norm: [0.0858, 0.1291, 0.8981, 0.2727]
    strategy: table-region
    curated: false
  - id: tabb1
    label: Table B1
    kind: table
    file: assets/lou-2026-know-your-body-a-harness/tabb1.png
    raw: raw/papers/lou-2026-know-your-body-a-harness-figures/tabb1.png
    caption: "네 저장소의 표현 계약. E와 B와 M과 K가 각각 무엇을 담고 누가 언제 쓰며 모델에게 어떤 형태로 보이고 언제 무효가 되는지를 대조한다"
    page: 14
    bbox_norm: [0.0858, 0.1103, 0.9142, 0.4428]
    strategy: table-region
    curated: false
  - id: tabb2
    label: Table B2
    kind: table
    file: assets/lou-2026-know-your-body-a-harness/tabb2.png
    raw: raw/papers/lou-2026-know-your-body-a-harness-figures/tabb2.png
    caption: "planner가 고를 수 있는 네 가지 선택지와 각각에 필수인 항목. motion과 observe와 done과 give_up이 서로 다른 필드를 요구한다"
    page: 14
    bbox_norm: [0.5086, 0.7442, 0.9142, 0.8969]
    strategy: table-region
    curated: false
  - id: tabc1
    label: Table C1
    kind: table
    file: assets/lou-2026-know-your-body-a-harness/tabc1.png
    raw: raw/papers/lou-2026-know-your-body-a-harness-figures/tabc1.png
    caption: "planner 호출 한 번에 들어가는 18개 텍스트 블록의 직렬화 순서. 각 블록의 수명과 역할을 상주와 갱신과 누적으로 나눠 적었다"
    page: 16
    bbox_norm: [0.0858, 0.1291, 0.9142, 0.4111]
    strategy: table-region
    curated: false
  - id: tabc2
    label: Table C2
    kind: table
    file: assets/lou-2026-know-your-body-a-harness/tabc2.png
    raw: raw/papers/lou-2026-know-your-body-a-harness-figures/tabc2.png
    caption: "세 모델 역할이 받는 입력 상한. planner와 reviewer와 assistant의 텍스트 분량과 이미지 접근 한도를 정리했다"
    page: 17
    bbox_norm: [0.0702, 0.1104, 0.5098, 0.2876]
    strategy: manual
    curated: false
---

## 한 줄 요약 (One-line Summary)

가중치를 얼린 범용 VLM 옆에 로봇 신체의 기하 관계를 명시적이고 질의(query) 가능하며 수정 가능한 형태로 붙인 harness로, 과제 한 번과 무관한 trajectory 하나로 초기화한 뒤 상호작용 증거로 신체 추정을 고치고 그 추정에 의존하던 경험 규칙을 다시 검증해 재사용한다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 제목 | Know Your Body: A Harness for Direct and Self-Improving Robot Control with VLMs |
| 저자 | Zeyu Lou, Yanhong Zeng, Yong Wang, Chenyang Si (교신저자 Chenyang Si) |
| 소속 | Nanjing University, Ant Group, Zhejiang University |
| arXiv | 2609.28530v1 (2026년 9월 22일), cs.RO, 19페이지 |
| 프로젝트 페이지 | https://loule0-0.github.io/KnowBody/ |
| 실험 플랫폼 | Franka Research 3 팔, Robotiq 2F-85 그리퍼, ZED Mini 손목 카메라, ZED 2i 두 대 |
| 사용 모델 | GPT6 (high reasoning effort, 가중치 고정) |

## 2. 주요 기여 (Key Contributions)

저자들이 내세우는 기여는 네 가지로 정리된다.

첫째, 부분적이고 질의 가능한 body model을 제안한다. 여기서 body model은 로봇의 움직임과 기능 부위의 기하가 실제 물리 효과를 어떻게 만들어내는지를 적어 둔 저장소다. 완전한 dynamics 모델을 가정하지 않고 증거가 뒷받침하는 관계만 노출하며, 뒷받침 범위 밖의 질의에는 값 대신 unknown을 돌려준다.

둘째, 과제와 무관한 trajectory 하나로 이 모델을 초기화한다. 해당 trajectory는 빵을 집어 바구니에 넣는 동작이며, 평가 과제의 동작 순서를 따라 하도록 시키는 시연 데이터(demonstration)가 아니라 로봇이 움직인 양과 그때 보인 이미지 변화의 짝을 공급하는 용도다.

셋째, 의존성을 따라가는 갱신 절차를 제시한다. 신체 기하 추정이 바뀌면 관찰된 결과 자체는 그대로여도 그 결과를 해석하던 조건이 달라지므로, 바뀐 성분에 의존하던 규칙을 원본 증거에서 다시 계산하고 독립 검증을 통과할 때까지 사용을 보류한다.

넷째, 실제 로봇 네 과제에서 두 가지 방식으로 평가한다. 고정 예산 32회 시행에서 완수율이 75%로 native Codex harness의 25%보다 높았고, 영구 갱신을 켠 연속 상호작용에서는 첫 성공과 다섯 번째 성공 사이에 reasoning round가 29%에서 53%까지 줄었다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 문제 설정과 인터페이스

모델과 tool이 결정을 내리는 매 시점 i에서 범용 VLM은 지시문 ℓ과 현재 이미지와 가용한 depth를 담은 observation o_t, 측정된 pose T_t = (R_t, p_t), 그리퍼 상태, 가용한 관절 피드백을 받는다. 여기서 depth는 카메라가 각 화소까지의 거리를 측정한 값이다. 인덱스 t는 새 observation이 들어오거나 물리적 전이가 일어날 때만 올라가고, 읽기 전용 질의로는 올라가지 않는다.

출력 u_i는 질의, observation 요청, 동작 제안, 종료 요청 중 하나다. 동작 제안은 직교 좌표 구간의 묶음 A_t와 선택적인 그리퍼 명령으로 이뤄지고, 로컬 executor가 기구학과 타이밍을 풀어 실제로 움직인 양을 기록한다.

인터페이스는 다음과 같이 적힌다.

```
u_i ~ π_θ(ℓ, o_t, R(B_k, K_k; o_t), M_t)
```

R은 적용 가능한 증거를 꺼내 오는 검색 함수이고 모델 가중치 θ는 고정이다. 적응은 B_k와 K_k를 바꿀 뿐 VLM을 바꾸지 않는다.

### 3.2 네 개의 저장소

KnowBody는 기록의 성격에 따라 네 저장소를 나눈다. 나누는 기준은 누가 쓸 수 있는가, 얼마나 오래 유효한가, 재사용 전에 무엇을 확인해야 하는가다.

| 기호 | 담는 내용 | 쓰기 주체와 수명 | 무효화 조건 |
|---|---|---|---|
| E | 불변 observation, 요청과 계획과 실제 동작, 실행 영수증, 결과, 리뷰, 원본 해시 | 런타임과 tool이 이벤트를 덧붙이며 episode를 넘겨 남는다 | 다시 쓰지 않는다. 나중 해석은 새 기록을 덧붙이고 원본을 인용한다 |
| B | 버전이 붙은 구성 C, 영구 기능 기하 G, 국소 반응 R, 지원 범위 D, 출처와 검증 V | 추정기가 후보를 내고 검증과 공표를 거쳐 다음 episode부터 활성화된다 | 구성 불일치, 지원 범위 밖, 성분 반박, 미공표 후보 |
| M | 현재 장면 관계, 부착 리비전, task progress, 가설, 반대 증거, 대기 중인 시험 | 센서 근거 갱신과 출처가 확인된 모델 제안. episode마다 새로 만든다 | 물체와 카메라와 그리퍼와 신체와 부착이 바뀌면 그에 의존하는 claim만 낡는다 |
| K | 조건부 action과 효과 규칙, 범위, 결과, 반례, 출처, 신체 의존 성분 | 학습 파이프라인이 독립 검증 후 공표하고 호환되는 episode에서 유지된다 | 조건이 거짓이거나 unknown, 의존 성분 변경, 구성 불일치, 반대 증거 |

이 분리가 실무에서 갖는 뜻은 마커를 쥔 상황에서 드러난다. 그리퍼 손가락의 영구 기하는 G에 속하고, 쥔 지점에서 펜 끝까지의 관계는 M의 부착 항목에 속한다. 둘 다 기능 부위 질의에 쓰이지만 다시 쥐면 부착만 무효가 되고 손가락 모델은 그대로 남는다.

### 3.3 body model의 구성과 초기화

버전이 붙은 body는 다음과 같이 적는다.

```
B_k = (C_k, G_k, R_k, D_k, V_k)
```

C_k는 물리적 구성과 선언된 kinematic chain과 카메라 취득 모드를 식별하고, G_k는 영구 기능 기하를, R_k는 식별 가능한 국소 움직임과 이미지 반응을, D_k는 지원되는 동작 범위를, V_k는 출처와 검증 기록을 담는다. 질의 결과에는 좌표계와 단위와 뒷받침 근거와 가용한 불확실성이 함께 붙는다.

초기화는 연속 촬영된 off-task episode 하나로 이뤄진다. 연속한 두 pose에 대해 초기 end-effector 좌표계에서의 실제 이동량은 다음과 같다.

```
d_m^eef = R_m^T (p_{m+1} - p_m)
```

이 이동량을 직전과 직후의 실제 observation과 짝지어 B_0의 식별 가능한 관계를 채운다. 각 성분은 자신이 seed trajectory에서 왔는지, 선언된 하드웨어 사양에서 왔는지, 독립 측정에서 왔는지, 이후 상호작용에서 왔는지를 기록한다.

국소 시각 반응은 손목 카메라가 강체로 고정돼 있고 장면의 점이 정지해 있으며 이동이 거의 순수 병진일 때 다음 관계를 만족한다.

```
Z'(ξ' - ξ) ≈ J_B(ξ) d^eef
```

Z'는 이동 후 observation의 광학 depth이고 J_B(ξ)는 2×3 반응 행렬이다. 부록 E.1은 이 행렬을 다음 형태로 매개화한다.

```
J_B(u, v) = [ -a + u·c ; -b + v·c ],  a, b, c ∈ R^{1×3}
```

계수는 카메라 내부 파라미터와 강체 장착 관계를 함께 흡수한다. 대응점 일관성 검사를 먼저 거친 뒤 여기 실린 병진 부분 공간 안에서 최소제곱으로 적합하며, 물리적 전이마다 같은 가중치를 주어 이미지 추적점이 많은 구간이 적합을 지배하지 않게 한다.

### 3.4 세 가지 질의 종류

모델은 추정기 내부나 body 원장 전체를 받지 않는다. 현재 observation과 episode pin에 묶인 관계 하나만 물어본다.

| 질의 이름 | 무엇을 묻는가 | 반환값 |
|---|---|---|
| `image_direction` | 손목 이미지에서 원하는 방향으로 밀려면 로봇을 어느 쪽으로 옮겨야 하는가 | 여기 실린 반응 부분 공간 안의 단위 병진 방향 |
| `active_part_relation` | 영구 기하와 현재 부착을 합쳐 실제로 작용하는 끝점이 어디인가 | 기능 부위 위치와 목표까지의 축 방향 간격과 측면 어긋남 |
| `motion_feasibility` | 목표 pose에 닿을 수 있는가, 그리고 가는 길이 이어지는가 | 끝점 도달 가능성과 경로 실현 가능성을 따로 보고 |

방향 질의는 원하는 이미지 방향 s에 대해 다음을 푼다.

```
d_0 = U [ J_B(ξ) U ]^† s,   d̂_base = R_t · d_0 / ||d_0||_2
```

U의 열은 여기 실린 병진 부분 공간의 정규직교 기저이고 †는 pseudoinverse다. 양의 depth는 이미지 변위의 크기만 바꾸고 방향은 바꾸지 않으므로 이 질의는 미래 depth를 필요로 하지 않는다. 이동 거리와 자세는 VLM이 과제와 현재 observation을 보고 정하며, 질의는 policy가 아니라 움직임 관계만 공급한다.

기능 목표를 제어 목표로 바꾸는 질의는 기능 부위 j의 위치를 다음으로 계산한다.

```
x_j = p_t + R_t r_j(g_t)
```

g_t는 그리퍼 상태이고 r_j는 B_pin과 현재 부착이 정하는 end-effector 좌표계 오프셋이다. 목표 x_o와 단위 접근 방향 n이 주어지면 다음 두 값을 구분해 돌려준다.

```
δ = x_o - x_j,   h = n^T δ,   e_⊥ = ||(I - n n^T) δ||_2
```

축 방향 간격 h는 목표에 다가가는 정도를, 측면 어긋남 e_⊥는 목표에 맞춰 정렬된 정도를 가리킨다. VLM이 원하는 부위 위치 x*_j와 자세 R*와 그리퍼 상태 g*를 고르면 실제로 보낼 제어 목표는 다음이 된다.

```
p* = x*_j - R* r_j(g*)
```

명령을 받는 원점과 효과를 내는 부위 사이의 오프셋을 이 식이 보정한다. 모서리나 면으로 상호작용하는 경우에는 점 하나가 아니라 그에 맞는 기하를 쓴다.

전신 경로 질의는 목표 pose를 먼저 풀고 그 사이 경로를 따로 평가한다. 제안된 구간마다 위치는 선형으로, 자세는 쿼터니언 보간으로 표본을 뽑고 각 pose를 직전 관절 해에서 출발해 풀어 전체 팔 경로를 확인한다. 끝점 도달 가능성과 경로 연속 가능성을 분리해 보고하며, 후자가 거부되면 처음 실패한 단계를 함께 알린다. 측정되지 않은 장면이나 부착 여유는 unknown으로 남는다.

### 3.5 실행 권한의 경계

질의 결과가 곧 실행 허가는 아니다. 발송 직전에 executor가 역기구학과 관절 한계와 workspace와 모델링된 self-collision과 retiming을 새 텔레메트리로 다시 확인하므로, 앞선 질의가 뒤의 거부를 뒤집을 수 없다. 고정된 동작 제약 S는 신체 학습으로 바뀌지 않는다.

부록 A2는 구성 요소별 권한을 표로 못 박는다. 컨텍스트 컴파일러는 모델 입력 하나만 만들고 action이나 body 수정이나 규칙 공표를 허가하지 않는다. 얼린 VLM planner는 구조화된 선택 하나와 상태 갱신 제안만 내놓고 하드웨어 실행이나 활성 B와 K 쓰기를 허가하지 않는다. body 질의 층은 출처가 붙은 수치 관계를 내놓되 안전이나 실행을 허가하지 않는다. executor와 고정 게이트 S는 계획된 동작과 실제 동작과 거부 상태를 내놓되 과제 성공이나 재사용 가능한 지식을 판정하지 않는다.

### 3.6 네 개의 시계

모델이나 tool의 교환을 그대로 물리 시행 횟수로 세면 추론과 감지와 증거 수집이 뒤섞인다. 그래서 harness는 네 가지 인덱스를 나눈다.

| 시계 | 하나 올라가는 시점 |
|---|---|
| Call i | 모델 역할이 호출될 때. planner와 verifier와 선택적 evidence assistant를 따로 계산한다 |
| Interaction t | 새 observation이 잡히거나 요청된 action이 발송되고 실제로 실행된 앞부분이 관찰될 때. 읽기 전용 질의로는 올라가지 않는다 |
| Episode e | 새 물리 증거 묶음이 시작될 때. 프로세스 재시작이나 일시 정지만으로는 새 묶음이 되지 않는다 |
| Task τ | 새 과제 계약이 목표와 성공 기준과 진단 범위와 자원 계산을 확정할 때 |

episode는 시작 시점에 (B_e, K_e)를 고정한다. 반박된 질의 결과나 규칙은 즉시 보류할 수 있지만 교체 버전은 episode 경계에서만 공표된다. 한 episode가 자기 앞선 action을 해석하던 좌표계를 도중에 바꾸지 못하게 막는 장치다.

### 3.7 증거 해석과 현재 상태 갱신

실패한 상호작용의 원인은 단계마다 다르다. KnowBody는 요청한 동작이 실제로 일어났는가, 관찰된 반응이 뒷받침되는 body model과 맞는가, 의도한 효과가 나타났는가를 각각 다른 증거로 묻는다. 거부된 요청은 실행 가능성 문제이고, 대응점이 믿을 만한 실제 동작은 R을 시험하며, 독립적인 기하 측정은 G를 알려주고, 정해진 효과 관찰 구간에서 본 결과는 K의 조건부 지식을 뒷받침한다.

occlusion이나 관찰되지 않은 결과는 "효과 없음"이 아니라 unknown으로 남는다. 여기서 occlusion은 물체나 팔이 시야를 가려 해당 부위를 볼 수 없는 상태를 말한다.

새 observation은 M의 장면과 부착과 진행 추정을 갱신하되 과거 action의 직후 관찰을 대체하지 않는다. 시야가 좋아져 더 잘 보이게 된 것은 정보이지 로봇이 물체 상태를 바꿨다는 증거가 아니다.

핵심 결과는 별도 컨텍스트에서 확인한다. 쥐고 놓는 전이, 제안된 이정표, 진전이 계속 없는 상태, 모순, 완료 선언이 별도 verifier 호출을 부른다. verifier는 고정된 기준과 관련 observation과 실제 동작과 미해결 반대 증거를 받되 planner가 스스로 성공했다고 적은 서술은 받지 않는다. 판정은 확인 대상 사건으로 범위가 한정되므로 쥔 것을 확인했다고 과제 전체가 확인되지는 않는다.

### 3.8 조건부 규칙 학습

재사용 가능한 경험은 어떤 조건이 action의 결과를 갈라놓는지를 명시한다. 상호작용 e에서 event 시점 구성과 부착을 써서 특징 ϕ(e; B_k)를 뽑는다. 결과는 두 가지 이진 사건만 다룬다. 쥔 뒤에 놓쳤는가, 그리고 접근 후 선택한 대상 영역이 눈에 띄게 이동하지 않았는가다. 후자는 측정된 이동에 관한 것이며 접촉이 없었다거나 회전이 없었다는 뜻이 아니다.

발견 단계는 유한한 임계값 분할을 비교하고 각 분기의 결과 확률을 다음으로 추정한다.

```
p̂_b = (n_b^+ + 1) / (n_b + 2)
```

n_b는 뒷받침하는 묶음 수이고 n_b^+는 해당 결과가 나온 횟수로, 과제 성공 횟수가 아니다. 후보는 해당 특징을 뺀 같은 맥락 예측기보다 Brier loss를 낮춰야 하고, 그다음 규칙을 얼린 상태로 독립 검증을 통과해야 한다. 결과 측정은 외부 시점 observation에서 12초 고정 구간으로 이뤄진다.

### 3.9 의존성을 따라가는 갱신

신체 추정을 고치면 과거 경험의 조건이 달라진다. 같은 물리 구성에서 손가락 끝 오프셋이 Δr_j만큼 보정되고 기록된 pose와 목표와 접근 방향을 고정하면 축 방향 간격의 변화는 다음과 같다.

```
Δh = -n^T R_t Δr_j
```

관찰된 물체 이동은 그대로지만 재구성한 손가락 끝과 목표 사이 간격은 달라진다. 옛 간격을 조건으로 삼던 규칙은 같은 상호작용을 다른 분기로 보내게 되므로, body를 고치면서 규칙을 그대로 두면 같은 증거에 대한 서로 다른 해석이 섞인다.

그래서 규칙 r이 쓰는 body 성분 D_r과 바뀐 성분 ΔD에 대해 다음이 성립하면 재검증을 요구한다.

```
D_r ∩ ΔD ≠ ∅
```

harness는 원본 발견 증거에서 영향받은 특징만 다시 계산하고 수치 조건을 다시 적합시킨다. 특징과 결과와 맥락 범위는 그대로 두고 임계값과 지원 구간과 통계만 바꾼다. 이렇게 만든 수정 후보는 새 body 아래에서 독립 검증을 통과하기 전까지 보류되며, 다시 측정할 증거가 부족하면 그대로 보류로 남는다.

부록 D.2는 한 기록에 대해 네 층이 어떻게 갈리는지 정리한다. 기록된 이벤트 자체는 불변이고, 신체에 의존하는 측정값은 보정된 B 아래에서 다시 계산될 수 있으며, 규칙 배정은 바뀔 수 있고, 재사용 자격은 새 독립 검증 블록을 통과할 때까지 유보된다. 설치나 카메라 모드 변경은 소급 변환 대상이 아니라 새 구성이 되고, 다시 쥐는 것은 M의 부착 리비전만 바꾼다.

### 3.10 모델 입력 구성

planner의 입력은 늘어나는 대화 기록이 아니라 호출 직전에 구조화된 상태에서 컴파일된다. 이미지는 observation 식별자와 카메라 역할과 촬영 시각과 내용 해시를 달아 따로 붙인다. 컴파일러는 프롬프트 12,000자를 목표로 하고 24,000자와 이미지 10장을 상한으로 강제하며, 필수 현재 증거와 미해결 위험이 들어가지 못하면 그것들을 빼는 대신 컴파일을 명시적으로 실패시킨다.

| 역할 | 텍스트 한도 | 이미지와 증거 접근 |
|---|---|---|
| planner | 12,000자 목표, 24,000자 상한 | 이미지 최대 10장, 인덱싱된 아카이브 질의 |
| reviewer | 48,000자 상한 | 이미지 최대 10장, 호출당 아카이브 읽기 6회 |
| assistant | 12,000자 상한 | 등록된 텍스트 기록 6건, 이미지 없음 |

텍스트 블록은 18개가 정해진 순서로 직렬화된다. 앞쪽 1번과 2번은 제어 계약과 손목 방향 메모리를, 3번에서 8번은 장비와 컨트롤러와 단위와 실행 한계와 반응 범위와 쥐기 시도 이력을, 9번과 10번은 과제와 현재 장면을, 11번은 측정된 현재 신체 상태를, 12번에서 14번은 선택된 누적 증거와 최근 인과 기억과 모순을, 15번에서 17번은 효율 목표와 모드와 출력 요구 사항을, 18번은 기준과 남은 자원과 활성 위험과 이어달리기 보고와 body pin과 보류된 규칙을 담는다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 실험 설정

Franka Research 3 팔에 Robotiq 2F-85 그리퍼를 달고 ZED Mini로 손목 시점을, ZED 2i 두 대로 작업대의 제3자 시점을 얻는다. 두 방법 모두 GPT6를 high reasoning effort로 쓰고 가중치는 고정한다.

네 과제는 신체 지식의 서로 다른 측면을 건드린다. 노란 오리를 종이 상자에 넣기, 사과를 흰 종이 영역으로 밀기, 마커를 쥐고 숫자 쓰기, 생수병에서 빈 병으로 물 붓기다. 각각의 reasoning round 상한은 30, 30, 80, 100이다. 여기서 reasoning round는 상호작용 루프에서 모델이 결정을 한 번 내리는 단위이며 로봇 동작 구간 하나가 아니다.

두 방법 모두 매 시도 전에 물체 위치를 무작위로 다시 배치한다. 예산을 넘기거나 물체를 떨어뜨린 뒤처럼 자율적으로 이어갈 수 없게 되면 실패로 센다.

### 4.2 고정 예산 비교

비교 대상 Direct는 기본 Codex agent loop를 그대로 쓰며 자체 상호작용 기록 관리와 자동 compaction을 갖는다. KnowBody는 빵을 집어 바구니에 넣는 off-task trajectory 하나로 초기화하고 연속 학습을 끈다. 각 시행은 같은 초기화에서 출발하며 앞선 시행의 갱신을 물려받지 않는다. 방법과 과제마다 4회씩 총 32회를 돌렸다.

| 과제 | 상한 | Native Codex 성공 | KnowBody 성공 |
|---|---|---|---|
| 오리 넣기 | 30 | 1/4 | 4/4 |
| 사과 밀기 | 30 | 2/4 | 3/4 |
| 글씨 쓰기 | 80 | 1/4 | 3/4 |
| 물 붓기 | 100 | 0/4 | 2/4 |
| 전체 | | 4/16 | 12/16 |

성공한 시행의 평균 reasoning round는 오리 넣기 27.0에서 15.3으로, 사과 밀기 25.0에서 20.7로, 글씨 쓰기 69.0에서 45.3으로 줄어 17%에서 44% 사이의 감소폭을 보였다. 물 붓기는 Direct가 한 번도 완주하지 못해 KnowBody의 평균 67.0과 짝지을 대조값이 없다. 이 평균들은 모두 성공한 시행에 한정된 값이다.

### 4.3 DROID로 학습한 policy와의 비교

같은 로봇과 같은 과제 정의와 같은 성공 기준에서 π0.5-DROID와 π0-DROID를 추가로 평가했다. 두 체크포인트는 과제별 적응 없이 제공된 상태 그대로 쓰고 과제마다 20회씩 시험했다.

| 방법 | 오리 넣기 | 사과 밀기 | 글씨 쓰기 | 물 붓기 |
|---|---|---|---|---|
| KnowBody | 4/4 | 3/4 | 3/4 | 2/4 |
| π0.5-DROID | 19/20 | 2/20 | 0/20 | 0/20 |
| π0-DROID | 18/20 | 0/20 | 0/20 | 0/20 |

두 policy는 오리 넣기에서 강하게 동작하고 사과 밀기에서는 π0.5-DROID만 일부 성공했으며, 글씨 쓰기와 물 붓기는 둘 다 한 번도 완수하지 못했다. KnowBody는 네 과제 모두에서 성공을 기록했다.

### 4.4 연속 상호작용

body 지식과 경험의 영구 갱신을 켠 두 번째 규약에서는 과제마다 성공 5회가 기록될 때까지 시도하고 다음 과제로 넘어간다. 지식은 시도 사이와 과제 사이 모두에서 유지되고, 성공 사이에 낀 실패 시도도 갱신에 기여하며, 고정되는 것은 모델 가중치뿐이다. 매 시도마다 물체 배치를 다시 무작위로 잡는다.

| 과제 | 첫 성공 | 다섯 번째 성공 | 감소폭 |
|---|---|---|---|
| 오리 넣기 | 17 | 10 | 41.2% |
| 사과 밀기 | 19 | 9 | 52.6% |
| 글씨 쓰기 | 45 | 32 | 28.9% |
| 물 붓기 | 71 | 48 | 32.4% |

가로축은 총 시도 횟수가 아니라 성공한 시행의 순번이다. 글씨 쓰기는 단조롭게 줄지 않고 네 번째 30에서 다섯 번째 32로 다시 올라갔다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

논문에는 별도의 한계 절이나 향후 과제 절이 없고, Discussion 절이 평가 해석의 범위를 제한하는 형태로 서술한다. 본문에서 확인되는 제약은 다음과 같다.

**평가 규모.** 로봇 한 대, 과제 네 개, 방법과 과제 조건마다 4회 시행이다. DROID policy 비교만 과제당 20회이고 KnowBody 쪽 수치는 앞의 고정 예산 4회를 그대로 가져온 값이라 시행 수가 서로 다르다.

**조건부 지표.** reasoning round 평균과 연속 상호작용 곡선은 모두 성공한 시행에 한정해 계산한다. 전체 시행의 완수율은 고정 예산 규약에서 따로 보고한다. 물 붓기는 대조군이 완주하지 못해 round 비교 자체가 성립하지 않는다.

**단조롭지 않은 개선.** 글씨 쓰기는 마지막 구간에서 round가 다시 늘어난다.

**표현의 부분성.** body model은 완전한 dynamics 모델이 아니라 식별 가능한 관계만 노출한다. 지원 범위 밖의 질의는 값 대신 unknown을 돌려주고, 측정되지 않은 장면이나 부착 여유도 unknown으로 남는다.

**verifier의 독립성 범위.** planner와 verifier가 같은 VLM을 공유할 수 있으므로 이 분리는 추론이 가려진 것이지 센서가 독립된 것이 아니다. 그래서 재사용 가능한 body와 지식의 갱신은 모델 판정이 아니라 측정 기반 검증이 관장한다.

**구성 변경의 비가역성.** 설치나 카메라 모드가 바뀌면 새 구성이 되고 그 기하는 과거 observation에 소급 적용되지 않는다. 다시 측정할 증거가 없는 규칙은 보류 상태로 남는다.

## 6. 관련 연구 (Related Work)

논문은 관련 연구를 다섯 가지로 나눈다.

**범용 모델을 의사결정자로 쓰는 계열.** SayCan은 언어 모델의 제안을 skill value 추정으로 grounding하고, PaLM-E는 연속 센서 observation을 학습된 embodied 언어 모델에 넣는다. Code as Policies는 perception과 제어 API 위에서 프로그램을 생성하고, CaP-X는 primitive 추상화와 visual grounding과 실행 피드백이 코딩 에이전트의 manipulation에 어떻게 작용하는지 살핀다. PIVOT은 이미지 공간 action을 반복 선택하고, VLMPC는 VLM이 제안한 시퀀스를 예측 제어 루프에서 쓴다. 더 가까운 선행 연구로 Show-Harness는 이산 의미 동작 단위를 국소 action으로 해석하고, Agent as Policy는 보정된 observation과 기하 질의와 런타임 프로그램으로 동작을 만들고 고치며, GPT-Policy는 시연 데이터와 목표 이미지와 상호작용 이력과 실행 피드백을 고정된 VLM의 컨텍스트로 모은다.

**학습된 visuomotor policy와 VLA 계열.** Diffusion Policy는 로봇 시연 데이터에서 다봉 action 시퀀스를 배우고, RT-1은 모델과 데이터 규모가 다중 과제 실제 로봇 policy에 미치는 영향을 다룬다. RT-2는 VLM을 로봇 trajectory와 웹 데이터로 co-fine-tuning하며 action을 토큰으로 적고, OpenVLA는 pre-training된 적응 가능한 VLA를 공개한다. Reflective VLA는 observation과 action과 결과의 이력을 조건으로 받는 action expert를 학습하고, Harness VLA는 VLA를 얼린 채 재시도 가능한 접촉 primitive로 두고 실행 기억으로 고정 primitive 라이브러리의 작동 범위를 긋는다. KnowBody는 이들과 달리 범용 VLM을 harness로 연결해 로봇을 제어하므로, 비교 실험도 학습된 VLA가 아니라 같은 VLM 조건의 harness끼리 맞췄다.

**명시적 기하와 시연 조건 전이 계열.** Task and motion planning은 과제 수준 선택과 연속 기하 제약을 함께 푼다. foundation model과 결합한 계열로 VoxPoser는 3D value map을, ReKep는 관계형 keypoint 제약을, CoPa는 쥘 부위와 쥔 뒤 pose 제약을, RoboPoint는 이미지 공간 affordance 점을 만든다. 시연을 쓰는 쪽으로는 KAT와 RoboPrompt가 in-context action 예측을, Vid2Robot이 사람 영상과 로봇 trajectory 짝을, XSkill이 embodiment를 넘는 skill 원형을, UMI가 손에 든 그리퍼 시연과 상대 action trajectory와 지연 정합을 쓴다. KnowBody의 off-task trajectory는 새 과제의 동작 순서를 규정하지 않고 뒷받침되는 움직임 대응과 기능 부위 증거와 카메라 맥락만 공급한다는 점이 다르다.

**신체 모델과 자기 관찰 계열.** 연속 self-modeling은 형태 손상 이후의 복구를 가능하게 했고, 자기 지각 연구는 주어진 기구학 모델 없이 신체 도식을 복원했다. 이후 모델들은 action과 감각 데이터에서 순방향 거동을 배우거나 pose 조건부 occupancy로 계획과 손상 탐지를 수행한다. HumanCLAW는 시뮬레이션 1인칭 과제에서 VLM의 신체 추론을 살피며 action 결정과 균형 및 모터 추종 실패를 분리한다. KnowBody의 신체 표현은 이들과 달리 부분적이며 뒷받침되는 이동 방향과 기능 점과 임시 도구 기하와 관찰 맥락만 담는다.

**경험과 메모리와 변화 아래의 유효성 계열.** Inner Monologue는 observation과 성공 피드백을 언어 모델 planning에 넣고, REFLECT는 다중 감각 이력을 요약해 실패를 설명한다. Reflexion은 언어 피드백을 남기고 ExpeL은 앞선 과제에서 뽑은 통찰을 검색한다. RoboCat은 자체 생성 trajectory를 이후 학습에 넣고, PhysMem은 상호작용 가설을 재사용 전에 검증한다. ASPIRE는 실행 기록에서 실패를 진단하고 재실행으로 수정을 검증해 재사용 가능한 수정을 skill library에 모은다. KnowBody가 이들과 갈라지는 지점은 메모리나 검증 루프의 존재 자체가 아니라, 신체 기하를 고치면 변하지 않은 과거 상호작용에서 추론되던 조건이 달라진다는 의존 관계를 다룬다는 점이다.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| KnowBody | 얼린 VLM에 질의 가능한 body model을 붙여 직접 로봇을 제어하는 harness의 이름 |
| body model (B) | action에 필요한 신체 관계를 버전을 붙여 담는 저장소. 구성, 영구 기능 기하, 국소 반응, 지원 범위, 출처와 검증 다섯 성분으로 이뤄진다 |
| off-task trajectory | 평가 과제와 무관한 연속 episode 하나. 움직인 양과 이미지 변화의 짝을 공급해 B_0를 채운다 |
| functional geometry (G) | 그리퍼 손가락처럼 영구적인 기능 부위의 기하. 임시 부착과 달리 다시 쥐어도 무효가 되지 않는다 |
| local visual response (R) | 실제 이동량과 손목 이미지 변위를 잇는 2×3 행렬. 방향 질의의 근거다 |
| active tip | 명령을 받는 좌표계 원점이 아니라 실제로 효과를 내는 끝점. 쥔 마커의 펜 끝이 그 예다 |
| working state (M) | 현재 장면과 부착 리비전과 task progress를 담는 episode 단위 상태. 매 episode 새로 만든다 |
| knowledge (K) | 조건과 action과 효과를 잇는 검증된 규칙 묶음. 각 규칙은 자신이 의존하는 body 성분을 함께 적는다 |
| evidence (E) | observation과 요청 및 실제 동작과 결과 판정을 담는 불변 기록. 다시 쓰지 않고 새 해석을 덧붙인다 |
| dependency-aware revision | 바뀐 body 성분에 의존하는 규칙을 원본 증거에서 다시 계산하고 독립 검증 전까지 보류하는 절차 |
| evidence reviewer | planner와 다른 컨텍스트에서 고정된 기준으로만 판정하는 역할. PASS, NEEDS_WORK, BLOCKED 셋 중 하나를 낸다 |
| reasoning round | 상호작용 루프에서 모델이 결정을 한 번 내리는 단위. 로봇 동작 구간 하나와 다르다 |
| effect window | 결과를 측정하는 고정 시간 구간. 이 논문에서는 외부 시점 observation 기준 12초다 |
| validation block | 검증 전에 미리 등록해 둔 시행 묶음. 거부되거나 중단되거나 관찰되지 않은 시행도 자리를 소모한다 |

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 1 | "과제를 안다고 몸을 아는 것은 아니다" | manual | ★ wiki 권장 (motivation) |
| fig02 | 2 | "KnowBody 전체 구조와 두 가지 갱신 경로" | caption-region | ★ wiki 권장 (architecture) |
| fig03 | 4 | "body model이 노출하는 세 가지 관계" | caption-region | ★ wiki 권장 (method) |
| fig04 | 7 | "실제 로봇 실험 장비 구성" | caption-region | ★ wiki 권장 (setup) |
| fig05 | 8 | "네 과제 실행 장면과 두 규약의 결과" | caption-region | ★ wiki 권장 (result) |
| tab01 | 8 | "DROID 학습 policy와의 과제별 성공 비교" | table-region | (마크다운 표로 대체) |
| taba1 | 12 | "harness가 구분하는 네 가지 시계" | table-region | (마크다운 표로 대체) |
| taba2 | 13 | "구성 요소별 권한 경계" | table-region | (마크다운 표로 대체) |
| tabb1 | 14 | "네 저장소의 표현 계약" | table-region | (마크다운 표로 대체) |
| tabb2 | 14 | "planner 선택지별 필수 항목" | table-region | (확인 필요) |
| tabc1 | 16 | "planner 호출의 텍스트 블록 18개 순서" | table-region | (확인 필요) |
| tabc2 | 17 | "세 모델 역할이 받는 입력 상한" | manual | (마크다운 표로 대체) |
