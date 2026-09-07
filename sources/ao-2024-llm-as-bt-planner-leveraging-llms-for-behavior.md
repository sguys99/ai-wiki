---
title: "LLM-as-BT-Planner: Leveraging LLMs for Behavior Tree Generation in Robot Task Planning"
type: paper
year: 2024
category: physical-ai
raw_path: raw/papers/ao-2024-llm-as-bt-planner-leveraging-llms-for-behavior.pdf
raw_filename: "ao-2024-llm-as-bt-planner-leveraging-llms-for-behavior.pdf"
source_collection: external
authors: "Jicong Ao, Fan Wu, Yansong Wu, Abdalla Swikir, Sami Haddadin (Munich Institute of Robotics and Machine Intelligence, Technical University of Munich; Mohamed Bin Zayed University of Artificial Intelligence)"
arxiv_id: "2409.10444"
url: "https://arxiv.org/abs/2409.10444"
tags: [physical-ai, manipulation, robot-learning]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/ao-2024-llm-as-bt-planner-leveraging-llms-for-behavior/fig01.png
    raw: raw/papers/ao-2024-llm-as-bt-planner-leveraging-llms-for-behavior-figures/fig01.png
    caption: "LLM-as-BT-Planner 전체 구조. 왼쪽은 사용자 지시문과 장면 정보를 받아 LLM이 BT를 내놓는 개념 개요이고, 오른쪽은 high-level 과제 분해, mid-level BT 생성, low-level 실행으로 이어지는 워크플로다"
    page: 1
    bbox_norm: [0.1404, 0.1706, 0.8596, 0.4655]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/ao-2024-llm-as-bt-planner-leveraging-llms-for-behavior/fig02.png
    raw: raw/papers/ao-2024-llm-as-bt-planner-leveraging-llms-for-behavior-figures/fig02.png
    caption: "제안된 네 가지 in-context learning 방법의 워크플로. (a) one-step, (b) iterative, (c) human-in-the-loop, (d) recursive이며 빨간 점선이 Figure 1의 어느 부분을 대체하는지 표시한다"
    page: 3
    bbox_norm: [0.0787, 0.2608, 0.5, 0.6093]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/ao-2024-llm-as-bt-planner-leveraging-llms-for-behavior/fig03.png
    raw: raw/papers/ao-2024-llm-as-bt-planner-leveraging-llms-for-behavior-figures/fig03.png
    caption: "fine-tuning 평가에 쓴 두 과제 유형의 예시. (a) action 하나를 unit tree로 옮기는 과제, (b) 조립 목표 하나를 통째로 BT로 만드는 과제다"
    page: 4
    bbox_norm: [0.0807, 0.2282, 0.498, 0.387]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/ao-2024-llm-as-bt-planner-leveraging-llms-for-behavior/fig04.png
    raw: raw/papers/ao-2024-llm-as-bt-planner-leveraging-llms-for-behavior-figures/fig04.png
    caption: "실험 장비 구성. Franka Panda 로봇 팔, Leverage 도구 큐브 4종, Siemens Robot Assembly Challenge의 기어세트가 함께 놓여 있다"
    page: 4
    bbox_norm: [0.0787, 0.6462, 0.4999, 0.8431]
    strategy: caption-region
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/ao-2024-llm-as-bt-planner-leveraging-llms-for-behavior/fig05.png
    raw: raw/papers/ao-2024-llm-as-bt-planner-leveraging-llms-for-behavior-figures/fig05.png
    caption: "기어세트 조립의 실제 로봇 실행 장면. 생성된 BT와 그에 대응하는 action 순서를 번호로 이어 놓았고 실행된 action node는 초록색으로 칠했다"
    page: 6
    bbox_norm: [0.1198, 0.0753, 0.8801, 0.3588]
    strategy: caption-region
    curated: true
  - id: tab01
    label: Table I
    kind: table
    file: assets/ao-2024-llm-as-bt-planner-leveraging-llms-for-behavior/tab01.png
    raw: raw/papers/ao-2024-llm-as-bt-planner-leveraging-llms-for-behavior-figures/tab01.png
    caption: "GPT-4로 실행한 네 가지 in-context learning 방법의 성능 비교. 성공률, 논리 일관성, 실행 가능성, 생성 시간, 토큰 소비량을 나란히 놓았다"
    page: 5
    bbox_norm: [0.0682, 0.388, 0.487, 0.5]
    strategy: manual
    curated: false
  - id: tab02
    label: Table II
    kind: table
    file: assets/ao-2024-llm-as-bt-planner-leveraging-llms-for-behavior/tab02.png
    raw: raw/papers/ao-2024-llm-as-bt-planner-leveraging-llms-for-behavior-figures/tab02.png
    caption: "unit tree 과제와 one-step 과제에서 pre-training 상태 모델과 fine-tuning 모델의 BT 생성 성능 비교"
    page: 5
    bbox_norm: [0.5, 0.343, 0.9213, 0.5214]
    strategy: table-region
    curated: false
---

## 한 줄 요약 (One-line Summary)

로봇 조립 과제의 계획을 LLM이 곧바로 실행 가능한 Behavior Tree로 내놓게 하는 프레임워크로, 네 가지 in-context learning 방법과 소형 모델 fine-tuning을 같은 지표로 비교한 뒤 실제 Franka 로봇에서 검증했다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 제목 | LLM-as-BT-Planner: Leveraging LLMs for Behavior Tree Generation in Robot Task Planning |
| 저자 | Jicong Ao, Fan Wu(교신저자), Yansong Wu, Abdalla Swikir, Sami Haddadin |
| 소속 | Munich Institute of Robotics and Machine Intelligence(MIRMI), Technical University of Munich / Mohamed Bin Zayed University of Artificial Intelligence |
| arXiv | 2409.10444 (v1 2024년 9월, v3 2025년 6월) |
| 분야 | cs.RO |
| 코드 | https://github.com/ProNeverFake/kios |
| 분량 | 본문 7쪽, Figure 5개와 Table 2개 |

## 2. 주요 기여 (Key Contributions)

논문은 기여를 세 가지로 정리한다.

1. LLM으로 완전히 실행 가능한 BT를 생성하는 프레임워크를 세우고 평가 지표를 함께 제시했다. 파이프라인은 지시문(instruction)에서 subgoal 시퀀스를 뽑는 과제 분해, subgoal을 파라미터가 채워진 task plan으로 바꾸는 변환, task plan에서 BT를 만드는 생성의 세 단계다.
2. BT 생성 성능을 높이는 in-context learning 방법 네 가지를 제안하고, 여기에 더해 supervised fine-tuning을 적용했다.
3. 제안 방법들을 같은 지표로 비교했다. human-in-the-loop 방법이 다른 in-context learning 방법을 앞섰고, fine-tuning은 생성물의 실행 가능성을 높이지만 GPT-4보다 작은 모델의 BT 생성 성공률은 거의 끌어올리지 못했다.

기존 연구와의 차이는 LLM의 역할에 있다. 선행 연구에서 LLM은 사람의 지시문을 task specification으로 옮기고 BT 확장 알고리즘을 초기화하는 데 주로 쓰였다. 이 논문은 LLM이 BT 자체를 직접 만들어내게 한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 문제 정식화

과제 계획 문제를 튜플 (O, P, C, R, A, T, I, G, t)로 정의한다.

| 기호 | 뜻 |
|---|---|
| O | 환경에 있는 모든 물체의 집합 |
| P | 물체의 property. 물체의 affordance와 가용성을 알려준다 |
| C | 물체 사이의 constraint. action으로 바뀌지 않는다 |
| R | 물체 사이의 relation. action이 바꿀 수 있다 |
| A | 환경 상태를 바꿀 수 있는 실행 가능한 action의 집합 |
| T | transition 모델. T: S × A → S |
| I, G | 초기 상태와 목표 상태 |
| t | 목표 상태 대신 agent가 받는 자연어 과제 서술 |

상태 s는 모든 property, constraint, relation에 값을 지정한 것이고 S는 그 모든 조합의 집합이다. agent는 목표 상태 g를 직접 받지 않고 자연어 서술 t만 받는다. O, P, C, R, A, I가 주어진 상태에서, 실행하면 상태를 I에서 G로 옮기는 BT를 만드는 것이 과제다.

### 3.2 3계층 프레임워크

프레임워크는 high-level, mid-level, low-level의 세 계층으로 나뉜다.

- **high-level**: 사용자 지시문을 LLM 기반 assembly planner가 받아 과제를 분해하고 subgoal 시퀀스를 만든다. 필요한 task knowledge는 자연어로 제공한다.
- **mid-level**: LLM 기반 BT generator가 subgoal 시퀀스를 계획 목표로 받는다. BT 정의와 subtree 구조는 Colledanchise 2019의 비동기 BT 방식을 따른다. 생성 과정에서 robot action과 world predicate 지식을 참조하는데, 이 지식은 PDDL과 비슷한 형식에 자연어 설명을 덧붙여 적어 둔다. world state는 RDF와 비슷한 형식으로 표현한다.
- **low-level**: robot interface가 생성된 BT를 적재해 실행하며, world model이 world state와 물체의 공간 정보를 제공한다.

BT 생성과 실행 사이에는 두 종류의 피드백이 들어갈 수 있다. 사람의 피드백은 실행 중 BT를 다시 계획하는 데 쓰이고, 시뮬레이션 피드백은 실행 전에 BT를 미리 고치는 데 쓰인다. skill library가 실행기에 다양한 로봇 action을 제공한다. semantic router는 사용자 입력과 예시 입력 사이의 임베딩 거리를 계산해 워크플로의 분기를 정한다.

### 3.3 네 가지 in-context learning 방법

**Scheme 1 - one-step generation**: 상류 모듈에서 온 조립 subgoal 하나에 대해 LLM 기반 BT generator가 BT 전체를 한 번에 만든다. 초기 상태, subgoal, action과 BT에 대한 지식이 입력이다. 생성된 BT는 곧바로 robot executor로 넘어가고 결과가 상류의 plan updater로 돌아온다. 실행이 실패하면 FAILURE 신호가 전달되어 plan 갱신을 막고 직전 조립 단계를 다시 계획하게 한다.

**Scheme 2 - iterative generation**: BT 시뮬레이션 결과로 BT를 고쳐 다시 만든다. BT 전체를 만드는 과정은 Scheme 1과 같다. 생성된 BT를 시뮬레이터가 실행하는데, 모든 action node가 최종적으로 SUCCESS를 반환한다고 가정한 채 실행 결과만 돌려준다. FAILURE가 나오면(주로 구조 오류나 논리 불일치 때문이다) 시뮬레이터가 미리 정의된 실패 사유를 제공하고 generator가 그것을 참고해 새 BT를 만든다.

**Scheme 3 - human-in-the-loop generation**: 사람의 피드백 단계를 두어 BT 수정과 개선에 정확한 제안을 넣는다. 먼저 sequential planner가 상류 action 단계에 대해 자연어 설명이 붙은 bullet plan을 만들고, 그것이 BT 생성 모듈로 넘어가 생성을 안내한다. BT 생성 이후에 사용자 피드백 단계가 한 번 있고, BT 실행 이후에도 같은 단계가 한 번 더 있다. 사용자 피드백을 통해 새로운 자연어 지식을 계획 중에 투입할 수 있다는 점이 특징이다. 예를 들어 도구와 물체의 호환 관계가 바뀌면 LLM이 그 새 입력을 우선해 BT를 만들고, knowledge base를 고치지 않고도 재계획이 가능하다.

**Scheme 4 - recursive generation**: 알고리즘이 BT 생성 과정을 안내한다. 전체 생성을 MakePlan, MakeTree, PredictState의 세 가지 LLM 호출 단계로 나누고 이들을 재귀적으로 불러 완전한 BT를 만든다. MakePlan은 현재 만족되지 않은 조건을 채울 action sequence를 만든다. MakeTree는 그 action sequence의 첫 action에 대한 subtree를 만들어 만족되지 않은 condition node를 대체한다. PredictState는 새 subtree 실행 이후의 world state를 예측해 다음 계획을 위해 갱신한다.

Algorithm 1은 이 확장 과정을 다음과 같이 적는다. node list의 각 node에 대해 목표를 얻고, 직전 상태에서 그 목표까지의 plan을 만든다. plan이 비어 있지 않으면 상태를 예측해 갱신하고, plan의 마지막 action으로 subtree를 만든 뒤, 그 subtree의 condition 자식들을 새 node list로 삼아 재귀 호출한다. plan이 비어 있으면 상태를 그대로 넘긴다.

### 3.4 fine-tuning용 과제 두 유형

**unit-tree generation 과제**: recursive generation 방법의 하위 과제다. action 하나와 전체 action 정의, BT 구조 요구사항이 주어지면 LLM이 그 action을 대응하는 precondition과 action node를 갖춘 unit BT로 옮긴다. LLM의 구조적 출력 능력과 in-context learning 능력을 평가한다.

**one-step generation 과제**: one-step generation 방법에서 온 과제다. 초기 상태, 목표 서술, 필요한 지식이 주어지면 실행 후 목표 상태에 도달하는 BT 형태의 task plan 전체를 만든다. 구조적 출력 능력과 in-context learning 능력에 더해 추론 능력까지 평가한다. sub-BT로 표현된 action들 사이의 의존 관계와 중첩 관계를 다뤄야 하기 때문이다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 실험 구성

7자유도 Franka Emika Panda 로봇 팔 하나에 operation space control을 적용했다. 토크는 Cartesian adaptive force-impedance controller가 계산하고, Franka Control Interface(FCI)로 전달한다. BT의 action을 실행할 때는 action의 컨텍스트를 skill base라는 별도 제어 소프트웨어가 받아 미리 정의된 skill로 대응시킨다. 비동기 BT 구현에는 PyTrees와 WebSocket을 썼다. world model은 자체 구현한 relation graph와 Neo4j를 합쳐 world state 관리와 시각화를 담당한다.

use case는 Siemens Robotic Assembly Challenge의 기어세트다. gear base 하나, shaft 세 개, gear 세 개로 이뤄져 있고, shaft를 gearbase에 조립한 뒤 각 gear를 대응하는 shaft에 삽입해 맞물리게 하는 것이 과제다. gearbase에 고정되는 두 번째 shaft는 나사 결합이 필요하도록 변형해 로봇이 써야 하는 skill 종류를 늘렸다. 도구 큐브는 손끝 형상에 따라 parallelgripper, clampgripper, outwardgripper, inwardgripper로 나뉜다.

상태 표현에 쓴 항목은 다음과 같다.

| 집합 | 항목 |
|---|---|
| property P | isEmpty |
| constraint C | canManipulate, isInsertable |
| relation R | isInsertedTo, Hold |
| object O | left_hand, shaft1~3, gearbase_hole1~3, gear1~3, defaultgripper, clampgripper, inwardgripper 등 |
| action A | insert, screw, place, put_down, change_tool, pick_up |

Furniture Assembly Benchmark의 의자와 램프 use case로도 실험했다. lamp_base, lamp_bulb, chair_leg, chair_seat 같은 물체로 의자와 램프를 조립하는 과제다.

### 4.2 평가 지표

| 약어 | 지표 | 뜻 |
|---|---|---|
| SR | Success Rate | 생성된 BT가 실행 가능하고 논리적으로 일관되며 목표 상태에 도달할 때만 성공으로 센다 |
| LC | Logical Coherence | BT 내부의 실행 순서가 precondition 위반 없이 대응 action sequence와 일치하는지 본다 |
| Exec | Executability | BT가 규정된 형식을 따라 실행될 수 있는지 본다 |
| GD | Generation Duration | BT 하나를 만드는 데 걸린 시간(초) |
| TC | Token Consumption | BT 하나를 만드는 데 쓴 토큰 수 |

### 4.3 in-context learning 결과

GPT-4로 실행한 네 방법의 결과는 다음과 같다(과제 17개 기준).

| 방법 | SR | LC | Exec | GD(초) | TC |
|---|---|---|---|---|---|
| One-step | 12/17 | 12/17 | 17/17 | 49.11 | 5074.96 |
| Iterative | 12/17 | 12/17 | 17/17 | 48.52 | 7770.13 |
| Human-in-the-loop | 16/17 | 16/17 | 17/17 | 85.02 | 7483.34 |
| Recursive | 13/17 | 17/17 | 13/17 | 231.04 | 50229.96 |

관찰 사항은 네 가지다.

- **GPT-4는 BT 생성에서 좋은 in-context learning 능력과 구조적 출력 능력을 보인다.** 실행 가능성은 recursive에서 13/17, 나머지 세 방법에서 17/17이다. 논리 일관성과 성공률도 최저 12/17로 절반을 넘는다. one-step은 실행 가능성이 완벽하고 성공률은 12/17인데, 실패 사례 대부분은 트리 깊이가 부족하거나 잘 정의된 action이 없어서 생긴 것이다.
- **구체적이지 않은 시뮬레이션 피드백은 성능을 개선하지 못한다.** iterative는 one-step 대비 이점을 보이지 않았다. 테스트 사례에서 두 방법이 만든 BT가 모두 실행 가능해, 미리 정의된 비구체적 실패 사유를 활용할 여지가 없었기 때문이다.
- **구체적이고 방향이 분명한 사용자 피드백은 성능을 크게 끌어올린다.** human-in-the-loop은 논리 일관성이 16/17로 one-step의 12/17보다 높고, 실행 가능성도 17/17로 recursive의 13/17보다 높다. 대신 평균 생성 시간이 85.02초, 토큰 소비가 7483.34로 늘어난다.
- **알고리즘 안내는 성능을 높이지만 구조적 출력이 불안정해지고 자원 소비가 커진다.** recursive는 논리 일관성 17/17로 네 방법 중 가장 높지만 생성 시간 231.04초, 토큰 소비 50229.96으로 가장 많은 자원을 쓴다. 실행 가능성은 13/17로 가장 낮은데, 재귀 호출이 LLM 생성 능력의 불안정성을 증폭시키기 때문이다.

저자들은 human-in-the-loop이 성공률과 효율의 균형에서 앞선다고 정리한다. recursive는 시간과 토큰을 많이 쓰지만 논리적으로 일관된 BT를 만드는 능력이 뛰어나, GPT-4 대신 Llama-2-13B 같은 소형 fine-tuning 모델을 로컬에 두고 쓸 때 더 유용할 수 있다고 본다.

### 4.4 fine-tuning 결과

fine-tuning 대상은 Mistral-7B와 Llama2-13B-chat 두 오픈소스 모델이며, 파라미터 규모가 더 큰 경우를 보이려고 GPT-3.5도 함께 fine-tuning했다. unit-tree 과제의 학습 데이터는 recursive generation 방법의 roll-out 기록에서, one-step 과제의 학습 데이터는 one-step generation 방법에서 모았다. Mistral-7B와 Llama2-13B-chat은 Llama-factory 프레임워크로 학습했다.

| 과제 유형 | 모델 | epoch | learning rate |
|---|---|---|---|
| unit tree | Mistral-7B, Llama2-13B-chat | 10 | 1 × 10⁻⁴ |
| one-step | Mistral-7B, Llama2-13B-chat | 15 | 5 × 10⁻⁵ |
| unit tree | GPT-3.5 | 3 | learning rate multiplier 0.05 |
| one-step | GPT-3.5 | 10 | learning rate multiplier 0.05 |

학습 후 성능은 furniture assembly benchmark의 의자와 램프 use case에서 모은 데이터로 검증했다.

| 과제 유형 | 모델 | fine-tuning | SR | LC | Exec | GD(초) | TC |
|---|---|---|---|---|---|---|---|
| Unit tree | GPT-4 | No | - | 10/10 | 10/10 | 14.45 | 2229.00 |
| Unit tree | GPT-3.5 | No | - | 10/10 | 10/10 | 6.07 | 2220.20 |
| Unit tree | GPT-3.5 | Yes | - | 10/10 | 10/10 | 6.17 | 2214.00 |
| Unit tree | Mistral-7B | No | - | 3/10 | 7/10 | 14.64 | 1993.00 |
| Unit tree | Mistral-7B | Yes | - | 9/10 | 10/10 | 14.35 | 1920.30 |
| Unit tree | Llama-13B-chat | No | - | 5/10 | 6/10 | 16.30 | 2142.80 |
| Unit tree | Llama-13B-chat | Yes | - | 9/10 | 10/10 | 17.56 | 1964.60 |
| One-step | GPT-4 | No | 9/10 | 10/10 | 10/10 | 45.48 | 4515.00 |
| One-step | GPT-3.5 | No | 1/10 | 1/10 | 2/10 | 11.30 | 4352.00 |
| One-step | GPT-3.5 | Yes | 1/10 | 1/10 | 9/10 | 10.79 | 4184.00 |
| One-step | Mistral-7B | No | 0/10 | 0/10 | 0/10 | 25.54 | 4139.40 |
| One-step | Mistral-7B | Yes | 0/10 | 0/10 | 8/10 | 24.60 | 4157.80 |
| One-step | Llama-13B-chat | No | 0/10 | 0/10 | 5/10 | 26.45 | 4227.30 |
| One-step | Llama-13B-chat | Yes | 1/10 | 1/10 | 9/10 | 25.72 | 4168.30 |

unit tree 과제의 성공률은 평가하지 않았다. unit tree 생성 과제가 상태와 무관해 단독으로 평가할 수 없기 때문이다.

결과 해석은 세 가지다.

- **pre-training된 대형 모델이 복잡한 과제에서 소형 모델을 앞선다.** GPT-4는 두 과제 유형의 모든 지표에서 우수하다. 반면 GPT-3.5, Llama-13B-chat, Mistral-7B는 unit tree 과제에서는 좋은 결과를 내지만 one-step 과제에서 크게 뒤진다. fine-tuning 전 GPT-3.5는 논리 일관성 1/10, 실행 가능성 2/10으로 GPT-4의 10/10과 차이가 크고, fine-tuning 전 Llama-13B-chat은 실행 가능성 5/10으로 Mistral-7B의 0/10보다 낫다.
- **fine-tuning은 구조적 출력 생성과 in-context learning 성능을 크게 높인다.** unit tree 과제에서 Llama2-13B-chat과 Mistral-7B는 논리 일관성이 각각 5/10과 3/10에서 둘 다 9/10으로, 실행 가능성이 6/10과 7/10에서 둘 다 10/10으로 올라갔다. one-step 과제에서도 실행 가능성이 각각 5/10에서 9/10으로, 0/10에서 8/10으로 올라갔다.
- **fine-tuning을 해도 소형 LLM은 추론이 필요한 복잡한 BT 생성 과제에서 부진하다.** one-step 과제에서 Llama2-13B-chat, Mistral-7B, GPT-3.5는 fine-tuning 이후에도 논리 일관성이 0/10 또는 1/10에 머물렀다. 저자들은 파라미터 규모의 한계와 one-step 과제 학습 데이터의 부족을 이유로 든다.

### 4.5 실제 로봇 검증

검증에는 human-in-the-loop 방법을 썼다. 성능이 가장 좋고 사람 피드백 덕분에 실험 진행이 수월하다는 이유다. 상류 subgoal은 `insert gear1 into shaft1`이며, 생성된 BT는 다음 action sequence와 같은 의미를 갖는다.

1. `put_down(left_hand, parallelgripper, shaft3)`
2. `change_tool(left_hand, parallelgripper, clampgripper)`
3. `pick_up(left_hand, clampgripper, gear1)`
4. `insert(left_hand, clampgripper, gear1, shaft1)`

초기 상태에서 `left_hand`는 `parallelgripper`를 들고 있고 그 그리퍼가 `shaft3`을 쥐고 있다. precondition이 만족되어 action (1)이 먼저 실행되며 조건 `is_empty(parallelgripper)`를 만족시킨다. 이어서 action (2)가 도구를 `parallelgripper`에서 `clampgripper`로 바꿔 조건 `hold(left_hand, clampgripper)`를 만족시키고 action (3)이 시작된다. 그 후 action (4)의 precondition인 `hold(left_hand, clampgripper)`와 `hold(clampgripper, gear1)`가 모두 만족되어 실행이 끝나면 계획 목표 `is_inserted_to(gear1, shaft1)`가 달성되고 BT가 SUCCESS를 반환한다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

논문이 밝힌 한계는 세 가지다.

- recursive generation 방법은 자원 소비가 커서 추가 개선이 필요하다.
- fine-tuning은 파라미터가 적은 LLM의 BT 생성 추론 능력을 높이는 데 효과가 제한적이었다. 모델 파라미터 수의 한계와 학습 데이터 부족을 가능한 이유로 든다.
- 단계 수가 많은 task plan을 BT로 표현하는 것 자체가 어렵다. 깊게 중첩된 단계가 이어지면 node 사이에 충돌이 생길 수 있다. 저자들의 high-level 과제 분해가 subgoal마다 포함되는 단계 수를 줄여 이 문제를 어느 정도 완화했지만, 프레임워크를 더 넓게 적용하려면 추가 연구가 필요하다.

## 6. 관련 연구 (Related Work)

**로봇 분야의 고전적 계획**: 기호 표현에 기반하며 PDDL이 가장 널리 쓰이는 도메인 언어다. 닫힌 세계 가정 아래 초기 상태에서 목표 상태로 가는 action sequence를 탐색 알고리즘으로 만든다. 이산 기호 공간의 계획과 연속 기하 공간의 샘플링을 결합하려는 시도도 있었다. 그러나 상태 공간의 복잡도가 지수적으로 늘어나 대규모 적용은 제한적이고, 방대한 도메인 지식이 필요하며 생성된 plan이 open-loop이라 long-horizon 과제에서 성능이 떨어진다.

**로봇 분야의 Behavior Tree**: 실시간 반응과 모듈식 시스템 개발을 함께 담는 제어 구조다. 상태가 드러나지 않는 트리 구조, 수정의 유연성, 좋은 해석 가능성 덕분에 task plan 표현으로 자리 잡았다. Colledanchise 2019 이후 조건 의존성, 성공 신뢰도, 반응성, 논리적 형식 검증 방향으로 연구가 이어졌고, 유전 프로그래밍, 문법 프로그래밍, value function 기반 policy로 유효한 BT를 생성하려는 시도도 있었다. 그러나 BT 활용은 여전히 사전 정의와 사전 프로그래밍에 크게 의존하고, 구조에 명시적으로 정의된 상황에만 반응할 수 있다.

**LLM 기반 로봇 과제 계획**: 완전한 문제 서술 생성과 world state 추적으로 계획 과정을 보조하는 연구, 과제 이해를 위한 지시문 grounding, policy 선택, 제어 명령 생성에 LLM을 쓰는 연구가 있었다. 다만 이들이 만드는 task plan은 대부분 action sequence다. LLM으로 BT 형태의 task plan을 직접 생성하는 프레임워크는 아직 없었고, 로봇 조립 과제에서 LLM의 BT 생성 능력도 종합적으로 조사되지 않았다.

주요 인용: PDDL(McDermott 1998), BT 서베이(Iovino 2022), BT와 FSM의 프로그래밍 노력 비교(Iovino 2023), blended reactive planning(Colledanchise 2019), ProgPrompt(Singh 2023), PaLM-E(Driess 2023), chain-of-thought(Wei), Tree of Thoughts(Yao 2023), LLM-BT(Zhou 2024), Llama-factory(2024).

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| LLM-as-BT-Planner | 이 논문이 제안한 프레임워크 이름. LLM을 BT 생성기로 두고 조립 과제 계획을 세운다 |
| unit tree | action 하나에 대응하는 최소 단위 BT. precondition condition node와 action node로 이뤄진다 |
| one-step generation | subgoal 하나에 대한 BT 전체를 LLM 호출 한 번으로 만드는 방법 |
| iterative generation | 시뮬레이터가 돌려준 실패 사유를 참고해 BT를 다시 만드는 방법 |
| human-in-the-loop generation | bullet plan 생성과 사용자 피드백 단계를 넣어 BT를 고치는 방법 |
| recursive generation | MakePlan, MakeTree, PredictState 세 호출을 재귀적으로 반복해 BT를 확장하는 방법 |
| MakePlan / MakeTree / PredictState | recursive generation의 세 단계. 각각 action sequence 생성, subtree 생성, 실행 후 상태 예측을 맡는다 |
| bullet plan | human-in-the-loop 방법에서 sequential planner가 만드는 자연어 설명이 붙은 단계 목록 |
| skill base | BT의 action 컨텍스트를 미리 정의된 로봇 skill로 대응시키는 제어 소프트웨어 |
| semantic router | 사용자 입력과 예시 입력의 임베딩 거리로 워크플로 분기를 정하는 장치 |
| Logical Coherence (LC) | BT 내부 실행 순서가 precondition 위반 없이 대응 action sequence와 일치하는 정도 |
| Executability (Exec) | 생성된 BT가 규정 형식을 따라 실행될 수 있는 정도 |
| Siemens Robot Assembly Challenge | 실험에 쓴 기어세트 조립 과제의 출처가 되는 산업 조립 챌린지 |

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 1 | 프레임워크 전체 구조와 3계층 워크플로 | caption-region | ★ wiki 권장 (architecture) |
| fig02 | 3 | 네 가지 in-context learning 방법의 워크플로 | caption-region | ★ wiki 권장 (method) |
| fig03 | 4 | fine-tuning 과제 두 유형의 예시 | caption-region | ★ wiki 권장 (method) |
| fig04 | 4 | Franka Panda와 기어세트 실험 장비 구성 | caption-region | (확인 필요) |
| fig05 | 6 | 실제 로봇 조립 실행 장면과 대응 BT | caption-region | ★ wiki 권장 (result) |
| tab01 | 5 | 네 in-context learning 방법의 성능 비교 | manual | ★ wiki 권장 (result) |
| tab02 | 5 | pre-training 모델과 fine-tuning 모델 비교 | table-region | ★ wiki 권장 (result) |
