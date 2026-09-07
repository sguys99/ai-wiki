---
title: "From Dialogue to Execution: Mixture-of-Agents Assisted Interactive Planning for Behavior Tree-Based Long-Horizon Robot Execution"
type: paper
year: 2026
category: physical-ai
raw_path: raw/papers/suzuki-2026-from-dialogue-to-execution-mixture-of-agents.pdf
raw_filename: "suzuki-2026-from-dialogue-to-execution-mixture-of-agents.pdf"
source_collection: external
authors: "Kanata Suzuki, Kazuki Hori, Haruka Miyoshi, Shuhei Kurita, Tetsuya Ogata (Waseda University, National Institute of Informatics, SOKENDAI)"
arxiv_id: "2603.01113"
url: "https://arxiv.org/abs/2603.01113"
tags: [physical-ai, manipulation, imitation-learning, robot-learning]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/suzuki-2026-from-dialogue-to-execution-mixture-of-agents/fig01.png
    raw: raw/papers/suzuki-2026-from-dialogue-to-execution-mixture-of-agents-figures/fig01.png
    caption: "제안 프레임워크의 전체 흐름. 지시문을 BT로 바꾸고 불확실성 분석으로 질문을 뽑은 뒤 세 expert agent와 사람이 차례로 답한다"
    page: 2
    bbox_norm: [0.1202, 0.0557, 0.8798, 0.3445]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/suzuki-2026-from-dialogue-to-execution-mixture-of-agents/fig02.png
    raw: raw/papers/suzuki-2026-from-dialogue-to-execution-mixture-of-agents-figures/fig02.png
    caption: "세 expert agent의 프롬프트 설계. Prerequisites 블록이 각 agent가 답할 수 있는 범위를 정한다"
    page: 3
    bbox_norm: [0.5033, 0.0572, 0.9198, 0.4538]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/suzuki-2026-from-dialogue-to-execution-mixture-of-agents/fig03.png
    raw: raw/papers/suzuki-2026-from-dialogue-to-execution-mixture-of-agents-figures/fig03.png
    caption: "생성된 BT의 일부. Repeat, RetryUntilSuccessful, Selector가 반복과 재시도, 폴백을 표현한다"
    page: 4
    bbox_norm: [0.0784, 0.1864, 0.498, 0.3524]
    strategy: caption-region
    curated: false
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/suzuki-2026-from-dialogue-to-execution-mixture-of-agents/fig04.png
    raw: raw/papers/suzuki-2026-from-dialogue-to-execution-mixture-of-agents-figures/fig04.png
    caption: "스무디 과제에서 생성된 BT와 질의응답 예시. 로봇 기능 질문은 Robot Expert가, 사용자 선호 질문은 사람이 답했다"
    page: 6
    bbox_norm: [0.1098, 0.0557, 0.8898, 0.4176]
    strategy: caption-region
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/suzuki-2026-from-dialogue-to-execution-mixture-of-agents/fig05.png
    raw: raw/papers/suzuki-2026-from-dialogue-to-execution-mixture-of-agents-figures/fig05.png
    caption: "생성된 BT를 따라 실제 로봇이 수행한 동작 순서. action node에 따라 π0.5와 Diffusion Policy를 바꿔 가며 실행한다"
    page: 6
    bbox_norm: [0.1231, 0.4504, 0.8698, 0.7284]
    strategy: caption-region
    curated: true
  - id: tab01
    label: Table I
    kind: table
    file: assets/suzuki-2026-from-dialogue-to-execution-mixture-of-agents/tab01.png
    raw: raw/papers/suzuki-2026-from-dialogue-to-execution-mixture-of-agents-figures/tab01.png
    caption: "멀티에이전트 LLM 구조 비교. abstention 유무와 사람의 역할에서 제안 방식이 다르다"
    page: 4
    bbox_norm: [0.1212, 0.0675, 0.8788, 0.1754]
    strategy: table-region
    curated: true
  - id: tab02
    label: Table II
    kind: table
    file: assets/suzuki-2026-from-dialogue-to-execution-mixture-of-agents/tab02.png
    raw: raw/papers/suzuki-2026-from-dialogue-to-execution-mixture-of-agents-figures/tab02.png
    caption: "MoA 없이 만든 BT 대비 정규화 Tree Edit Distance. 값이 작을수록 구조가 비슷하다"
    page: 5
    bbox_norm: [0.5435, 0.0672, 0.8801, 0.1631]
    strategy: table-region
    curated: false
  - id: tab03
    label: Table III
    kind: table
    file: assets/suzuki-2026-from-dialogue-to-execution-mixture-of-agents/tab03.png
    raw: raw/papers/suzuki-2026-from-dialogue-to-execution-mixture-of-agents-figures/tab03.png
    caption: "MoA 없이 만든 BT 대비 노드 임베딩 유사도. 값이 클수록 의미가 비슷하다"
    page: 5
    bbox_norm: [0.5332, 0.1554, 0.8918, 0.2596]
    strategy: manual
    curated: false
  - id: tab04
    label: Table IV
    kind: table
    file: assets/suzuki-2026-from-dialogue-to-execution-mixture-of-agents/tab04.png
    raw: raw/papers/suzuki-2026-from-dialogue-to-execution-mixture-of-agents-figures/tab04.png
    caption: "동작별 성공률을 10회 시행으로 잰 결과. 좁게 학습한 모델이 모든 동작에서 가장 높았다"
    page: 5
    bbox_norm: [0.5461, 0.7871, 0.8774, 0.9064]
    strategy: table-region
    curated: true
  - id: tab05
    label: Table V
    kind: table
    file: assets/suzuki-2026-from-dialogue-to-execution-mixture-of-agents/tab05.png
    raw: raw/papers/suzuki-2026-from-dialogue-to-execution-mixture-of-agents-figures/tab05.png
    caption: "실패 모드와 적용 한계, 완화 방향을 함께 정리한 표"
    page: 8
    bbox_norm: [0.1075, 0.0662, 0.8925, 0.2056]
    strategy: table-region
    curated: true
---

## 한 줄 요약 (One-line Summary)

LLM planner가 대화 중 던지는 확인 질문의 약 27%를 Mixture-of-Agents 기반 대리 응답이 처리하고, 완성된 계획을 Behavior Tree로 표현해 각 action node에 imitation learning policy를 묶어 실제 dual-arm 로봇에서 long-horizon 과제를 실행한 논문이다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 제목 | From Dialogue to Execution: Mixture-of-Agents Assisted Interactive Planning for Behavior Tree-Based Long-Horizon Robot Execution |
| 저자 | Kanata Suzuki, Kazuki Hori, Haruka Miyoshi, Shuhei Kurita, Tetsuya Ogata |
| 소속 | Waseda University, National Institute of Informatics (NII), NII Research and Development Center for Large Language Models, SOKENDAI |
| arXiv | 2603.01113v3 (cs.RO, 2026-08-28) |
| 분량 | 본문 8쪽, figure 5개, table 5개 |
| 지원 | JST CRONOS Japan, Grant Number JPMJCS24K6 |
| 형식 | IEEE 학회 논문 형식 |

논문 말미에 저자들은 원고의 언어 교정과 압축에 Claude를 사용했고 연구 아이디어, 실험 데이터, figure, 결과 생성에는 쓰지 않았다고 밝혔다.

## 2. 주요 기여 (Key Contributions)

논문이 스스로 꼽는 기여는 세 가지다.

1. **abstention 기반 delegation cascade 정식화.** 각 agent는 자신의 prerequisite description이 보장하는 질문만 답하고 나머지는 그대로 다음으로 넘긴다. 질문 집합이 서로 겹치지 않게 분할되므로 답변 융합이나 중재 단계가 필요 없고, 사람이 마지막 단계에 놓여 모든 질문이 해소된다.
2. **기존 멀티에이전트 구조와의 설계 대비.** layered MoA, multi-agent debate, self-consistency는 중복된 의견을 하나로 합치는 구조이며 abstention 개념도, 사람에게 넘기는 경로도 없다. Table I이 이 차이를 항목별로 대조한다.
3. **action node와 imitation learning policy의 결합.** 생성된 BT의 각 action node에 개별 policy를 묶어 실제 dual-arm 로봇에서 long-horizon 과제를 실행하고, 실패 모드와 적용 한계를 분석했다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 문제 설정

Interactive task planning은 LLM이 사용자에게 질문을 던져 빠진 정보를 채우는 계획 방식이다. 사전에 상세한 과제 명세를 프롬프트에 넣지 않아도 되지만 두 가지 문제를 남긴다.

- LLM planner가 던지는 질문에 사람이 전부 답해야 하므로 시간과 인지 부담이 크다. 특히 long-horizon 과제에서 부담이 커진다.
- 표 형태의 계획 표현은 과제가 복잡해질수록 길어지고 관리하기 어려워진다. language-conditioned imitation learning과 VLA 모델도 한 번에 몇 개의 지시문(instruction)만 받을 수 있고, subtask 분해를 학습 과정에 포함한 π0.5조차 토큰 길이의 제약을 받는다.

첫 번째 문제에는 Mixture-of-Agents(MoA)를 대화에 넣어 일반 지식으로 답할 수 있는 질문을 agent에게 위임하고, 두 번째 문제에는 Behavior Tree를 계획 표현으로 채택한다.

### 3.2 전체 흐름

Figure 1이 흐름을 보여준다. 순서는 다음과 같다.

1. LLM planner가 자연어 지시문에서 BT를 생성한다.
2. planner가 그 BT의 불확실성을 분석해 실행에 필요하지만 지시문에 없는 정보를 확인 질문으로 만든다. 이 절차는 Hori et al.의 선행 연구를 따른다.
3. 질문이 세 expert agent를 차례로 거치고, 남은 질문은 사람이 답한다.
4. 답변으로 BT를 갱신하고, BT가 모호하지 않을 때까지 2번부터 반복한다.
5. 확정된 BT의 각 action node에 policy를 묶어 실제 로봇에서 실행한다.

산출물은 조건 분기와 재시도 구조를 포함한 XML 형식의 BT다.

### 3.3 abstention 기반 delegation cascade

한 번의 대화 턴을 기준으로 정식화한다. planner가 만든 확인 질문 집합을 `Q`, cascade 순서대로 놓인 agent를 `e1, ..., eK`라 하고, agent `ek`는 자신이 사용할 수 있는 지식을 적은 prerequisite description `Pk`를 가진다.

각 agent는 두 함수로 규정된다. answerability predicate `αk`는 질문 `q`를 `Pk`만으로 답할 수 있으면 1, 아니면 0을 반환한다. answer function `ak`는 `αk = 1`인 질문에만 적용된다. `R0 = Q`에서 시작해 agent `ek`는 잔여 집합 `Rk-1`을 받아 두 부분으로 나눈다.

```
Sk = { q in Rk-1 | αk(q) = 1 }
Rk = Rk-1 \ Sk
Ak = { (q, ak(q)) | q in Sk }
```

마지막 잔여 집합 `RK`는 사람에게 가고 사람이 `AH`를 공급한다. 계획 갱신에 쓰이는 답변 집합은 `A = A1 ∪ ... ∪ AK ∪ AH`다. `Sk`가 `Rk-1`의 부분집합이고 `Rk`가 그 여집합이므로 `S1, ..., SK, RK`는 서로 겹치지 않으면서 `Q` 전체를 덮는다. 모든 질문이 정확히 한 번 답해지고, 그래서 투표나 가중치, 중재 단계가 프레임워크에 등장하지 않는다.

proxy ratio는 사람 개입 없이 해소된 질문의 비율이다.

```
ρ = 1 - |RK| / |Q|
```

이 구조에서 두 가지 성질이 따라 나온다.

| 성질 | 내용 |
|---|---|
| coverage 보장 | 사람이 cascade의 마지막 원소이므로 agent들이 아무리 보수적으로 답을 미뤄도 `RK`는 반드시 해소된다 |
| 비용 상한 | 한 턴당 LLM 호출이 최대 `K`회이며 `Rk`가 비면 조기 종료한다. layered MoA는 proposer 수 × layer 수 + 1회가 든다 |

대가도 명시한다. 앞선 agent의 답변은 다른 agent의 교차 검증을 받지 않는다.

### 3.4 공통 #Process 템플릿

세 agent 모두 프롬프트에 같은 `#Process` 템플릿을 포함한다. 출력을 세 부분으로 강제한다.

1. **답변 가능성 분석.** 주어진 질문에 답할 수 있는지 판단해 출력한다.
2. **답변.** 답할 수 있는 질문에만 답하고, 질문 라벨을 접두어로 붙인다.
3. **미답변 질문 출력.** 답하지 않은 텍스트를 그대로 출력한다.

세 부분은 앞 절의 수식과 그대로 대응한다. (a)는 `Rk-1`에 대해 `αk`를 평가하고, (b)는 `Ak`를 내보내며, (c)는 잔여 `Rk`를 다음 agent를 위해 원문 그대로 복제한다. agent는 확신이 없는 질문에는 답하지 말라는 지시를 함께 받으므로 `αk`가 abstention 쪽으로 치우친다.

### 3.5 세 expert agent 설계

Figure 2가 실제 배포된 프롬프트를 보여준다. 세 agent는 하나의 예시 구성이며 프레임워크가 특정 구성에 묶여 있지 않다.

| agent | 담당 범위 | abstention 조건 |
|---|---|---|
| Robot Expert | 로봇의 동작 능력, 실행 가능한 동작, 센서 구성 | 로봇 기능 명세 밖의 질문 |
| Task Domain Expert | 과제 고유의 절차 지식. 실험 1은 바텐딩, 실험 2는 스무디 제조 | 매뉴얼로 판단할 수 없고 현장 환경에 좌우되는 질문 |
| Commonsense Expert | 일상 수준의 상식 판단 | 과제 맥락 의존도가 높거나 모호한 판단이 필요한 질문 |

세 프롬프트에 공통으로 들어가는 문장은 "확신이 없는 질문에는 답하지 말라", "답하지 않은 질문은 사람이 답한다"이다. Robot Expert의 `#Prerequisites`에는 바텐더 로봇이며 바퀴로 자유롭게 이동하는 mobile manipulator라는 기능 명세가 들어가고, Task Domain Expert에는 셰이커와 글라스의 위치 같은 바텐더 매뉴얼이 들어간다.

논문은 대리 응답의 목적을 사람의 입력을 대체하는 것이 아니라, 매뉴얼이나 일반 지식으로 추론할 수 있는 질문과 사용자가 오히려 모를 법한 질문을 흡수하는 것이라고 못 박는다.

### 3.6 BT 스키마

생성된 트리는 BehaviorTree.CPP v4 XML 스키마를 따른다(`BTCPP_format="4"`). planner는 시스템 프롬프트로 다음 어휘만 쓰도록 제한되므로 후처리 없이 실행 엔진에 적재된다.

| 분류 | 노드 |
|---|---|
| control node | Sequence, Selector, Parallel |
| decorator | Repeat(num_cycles), RetryUntilSuccessful(num_attempts), Delay(delay_msec) |
| leaf | Action, Condition. 각각 primitive나 술어 이름을 담은 ID와 사람이 읽는 name을 가진다 |

Figure 3이 반복, 검증, 재시도, 폴백이라는 네 관용 구조를 한 조각에 담아 보여준다. `Repeat`가 사용자가 지정한 수량을 실현하고, 각 Action 뒤의 Condition이 결과를 검증하며, `RetryUntilSuccessful`이 실패를 재실행하고, `Selector`가 작업자 호출로 넘어간다.

### 3.7 policy 바인딩과 condition node 판정

각 action node에 개별 imitation learning 모델을 배정한다. 사용한 모델은 Diffusion Policy와 π0.5이고, 물리 동작이 없는 노드에는 모델을 붙이지 않는다.

condition node는 실행 시점에 VLM이 판정한다. VLM은 직전 action node의 실행 직전과 직후 이미지를 받아 노드 ID가 지시하는 술어에 대해 이진 판정을 낸다. 예를 들어 `IsStrawberryInBlender`가 성립하면 SUCCESS, 아니면 FAILURE를 반환한다. 이 판정이 주변 제어 흐름을 움직인다. 각 action은 검증용 condition과 짝을 이뤄 `num_attempts="3"`인 `RetryUntilSuccessful` 안에 놓이고, 세 번 모두 실패하면 바깥 `Selector`가 `InformStaffProblem`으로 넘어간다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 실험 1: 생성된 BT의 정량 평가

대리 응답 유무에 따라 생성된 BT의 구조적, 의미적 유사도를 비교한다. 설계는 내부 통제 방식이다. baseline 조건을 자기 자신과 비교해 생성기 고유의 변동 폭을 먼저 확정하고, 제안 조건은 외부 정답이 아니라 그 변동 폭과 견준다.

과제는 칵테일 제조이고 LLM에 주어진 지시문은 "Make a cocktail" 한 문장뿐이다. 대화형 계획이 이 문장을 칵테일 종류(마르가리타), 재료(테킬라, 라임 주스, 오렌지 리큐어), 절차(계량, 따르기, 섞기, 서빙)로 구체화해야 한다. 절차도 도구도 처음에 주어지지 않으므로 대화 없이는 실행 가능한 BT를 만들 수 없다.

| 항목 | 설정 |
|---|---|
| 조건 | MoA 없음(모든 질문을 사람이 답함), MoA 있음(cascade가 답하고 나머지를 사람이 답함) |
| 생성 횟수 | 조건당 3회, 총 BT 6개 |
| LLM | Gemini 2.0 Flash, temperature 1.0 |

temperature를 1.0으로 둔 이유는 확률적 생성 조건에서 비교하기 위해서다.

**지표 1: 정규화 Tree Edit Distance.** Tree Edit Distance는 한 트리를 다른 트리로 바꾸는 데 필요한 노드 삽입, 삭제, 치환의 최소 횟수다. Zhang과 Shasha의 정의에 Li와 Zhang의 정규화를 적용해 삼각 부등식이 성립하지 않는 경우를 처리한다.

```
d_N-TED(T1, T2) = 2 × TED(T1, T2) / ( α(|T1| + |T2|) + TED(T1, T2) )
```

`|T|`는 노드 수, `α`는 최대 편집 비용이며 여기서는 모든 연산에 1을 준다. 값은 0에서 1 사이이고 작을수록 유사하다.

**지표 2: 노드 임베딩 유사도.** 각 노드를 자연어로 표현하고 Sentence-BERT로 임베딩한다. 한 BT의 각 노드에 대해 상대 BT의 모든 노드와의 코사인 유사도 최댓값을 취하고 노드 전체에 대해 평균한다. 값은 0에서 1 사이이고 클수록 유사하며 두 인자에 대해 비대칭이다.

**대리 응답 비율.** 대화 로그에서 BT 하나당 평균 37개의 확인 질문이 생성됐다. 그중 평균 10개를 MoA 대리 응답이 답해 `ρ ≈ 0.27`이었다. 나머지는 terminal fallback으로 사람에게 갔고 미해결로 남은 질문은 없다.

**표 II: 정규화 Tree Edit Distance (낮을수록 유사).**

| | A | B | C | 평균 |
|---|---|---|---|---|
| MoA 없음 A | - | 0.807 | 0.817 | |
| MoA 없음 B | 0.807 | - | 0.776 | 0.800 |
| MoA 없음 C | 0.817 | 0.776 | - | |
| MoA 있음 A' | 0.813 | 0.774 | 0.808 | |
| MoA 있음 B' | 0.828 | 0.750 | 0.762 | 0.812 |
| MoA 있음 C' | 0.812 | 0.875 | 0.887 | |

핵심 비교는 독립된 두 방법 사이가 아니라 조건과 생성기 자신의 변동 폭 사이다. baseline을 반복 생성하기만 해도 서로 다른 세 쌍에서 이미 0.800 ± 0.021만큼 벌어진다. 제안 조건과 baseline 사이의 아홉 쌍은 0.812 ± 0.047이다. 두 평균의 차이 0.012는 두 분포 중 어느 쪽의 표준편차보다도 작다. 즉 대리 응답이 생성 결과를 옮기는 정도가 baseline 생성기를 다시 실행하는 것보다 크지 않다.

**표 III: 노드 임베딩 유사도 (높을수록 유사).**

| | A | B | C | 평균 |
|---|---|---|---|---|
| MoA 없음 A | - | 0.640 | 0.595 | |
| MoA 없음 B | 0.736 | - | 0.618 | 0.664 |
| MoA 없음 C | 0.731 | 0.666 | - | |
| MoA 있음 A' | 0.757 | 0.726 | 0.664 | |
| MoA 있음 B' | 0.724 | 0.677 | 0.674 | 0.697 |
| MoA 있음 C' | 0.701 | 0.657 | 0.692 | |

baseline 내부가 0.664, baseline 대 제안이 0.697로 제안 조건이 근소하게 더 유사하다. 두 지표 모두 제안 BT를 baseline의 생성 변동 폭 안에 놓는다.

### 4.2 실험 2: 실제 로봇에서의 long-horizon 실행

생성된 BT가 실제 환경에서 실행 가능한 계획으로 기능하는지 확인하기 위해 tabletop dual-arm 로봇 ALOHA에서 스무디 제조 과제를 수행했다. 과일 개수 같은 사용자 선호를 대화로 얻어 반영해야 하는 과제다.

과제 구성은 다섯 단계다.

1. 여러 종류의 과일(딸기, 바나나, 키위)을 블렌더에 넣는다.
2. 블렌더 뚜껑을 닫는다.
3. 블렌더 스위치를 켠다.
4. 대기한다.
5. 블렌더 스위치를 끈다.

과일은 모형이고 자율 동작 중에는 안전을 위해 블렌더에 전원을 넣지 않으므로 실제로 갈리지는 않는다.

**데이터 수집.** teleoperation으로 30 fps에 기록했다. RealSense 카메라 3대(머리 위 1대, 손목마다 1대, 640×480 해상도)를 썼고 action space는 7자유도 팔 두 개의 14차원 관절 구성이다. 시연 데이터(demonstration) 수량은 다음과 같다.

| subtask | 수량 |
|---|---|
| (i) 딸기 넣기 | 400개 |
| (i) 바나나 넣기 | 300개 |
| (i) 키위 넣기 | 300개 |
| (ii) 뚜껑 닫기 | 200개 |
| (iii) 스위치 켜기 | 200개 |
| (v) 스위치 끄기 | 200개 |

**학습 설정.** Diffusion Policy는 subtask마다 따로 학습했고, π0.5는 과일 데이터 세 종류를 함께 학습한 단일 모델을 두고 추론 시점에 해당 action node의 지시문으로 조건을 준다. 배치 크기는 π0.5가 64, Diffusion Policy가 16이다. Diffusion Policy는 20만 회 반복 학습했고, π0.5는 40만 회까지 학습한 뒤 action node별로 체크포인트를 골라 딸기는 40만 회, 바나나와 키위는 20만 회 지점을 썼다. 추론 시 π0.5는 bfloat16으로 denoising 10단계를 돌며 action node마다 20초의 실행 예산을 받는다. 나머지 학습과 추론 파라미터는 LeRobot 라이브러리 기본값을 따랐다. 이 실험의 대화형 계획에는 계획 안정성을 우선해 Gemini 2.5 Flash를 temperature 0으로 썼다.

**계획 결과.** 두 번째 계획 반복에서 완결된 트리를 얻었다. 생성 과정에서 확인 질문 5개가 나왔고 그중 2개를 Robot Expert가 답했다. Task Domain Expert와 Commonsense Expert는 하나도 답하지 않았고 나머지 3개가 사람에게 돌아가 `ρ = 0.4`였다. 사람에게 간 세 질문은 딸기 개수, 바나나 개수, 블렌딩 시간으로 모두 사용자 선호에 해당한다.

**표 IV: 동작별 성공률 (10회 시행).**

| 동작 | (a) Diffusion Policy, subtask별 학습 | (b) π0.5, subtask (i)만 | (c) π0.5, 전체 subtask |
|---|---|---|---|
| 딸기 넣기 | 0/10 | 3/10 | 0/10 |
| 바나나 넣기 | 0/10 | 6/10 | 6/10 |
| 키위 넣기 | 0/10 | 6/10 | 2/10 |
| 블렌더 뚜껑 닫기 | 7/10 | 해당 없음 | 0/10 |
| 블렌더 스위치 켜기 | 10/10 | 해당 없음 | 1/10 |
| 블렌더 스위치 끄기 | 10/10 | 해당 없음 | 2/10 |

모든 동작에서 범위를 좁게 잡은 모델이 가장 좋았다. 블렌더 조작은 subtask별로 학습한 Diffusion Policy가, 과일 넣기는 subtask (i)로 제한한 π0.5가 앞섰다. 과일 넣기에서 π0.5가 유리한 것은 pre-training 데이터에 탁상 위 manipulation이 포함된 덕으로 보인다. 전체 동작을 한 모델로 학습한 π0.5는 여러 동작에서 성능이 크게 하락했고, 이는 여기서의 multi-task 학습에 훨씬 많은 시연 데이터가 필요함을 뜻한다. 따라서 배포 구성은 과일 넣기에 subtask (i) 학습 π0.5, 나머지 동작에 Diffusion Policy를 쓰는 조합이다.

**실행 결과.** Figure 5가 실행 순서를 보여준다. 시스템은 필요한 동작에 따라 모델과 VLA 프롬프트를 바꿔 가며 과제를 처음부터 끝까지 완수했다. 과일 grasping 실패는 재시도 구조가 다시 실행했고, 사용자가 지정한 반복 횟수는 `Repeat` decorator가 실현했으며 과제가 중단되지 않았다. 재시도는 표 IV의 시행별 성공률보다 실질 완수율을 끌어올렸지만, 각 subtask의 고유 정확도가 여전히 제약 요인이다.

### 4.3 horizon amplification 계산

시행이 독립이라고 가정하면, 시행별 성공률이 `p`인 노드는 `RetryUntilSuccessful` 3회에서 `1 - (1 - p)^3`의 확률로 성공한다. 표 IV의 수치를 Figure 4의 트리에 적용하면 end-to-end 성공률 추정치가 약 0.34다. 이 값은 딸기 넣기 두 번(`p = 0.30`)이 지배한다. 반복 횟수가 지수로 들어가므로 딸기를 6개 요구하면 트리 전체는 약 0.06으로 떨어진다.

재시도를 늘려도 이 격차는 메워지지 않는다. 6회로 늘려도 해당 노드는 0.88까지만 오른다. 다만 트리가 명시적이므로 실행 전에 곱을 계산할 수 있고, 기준선 아래인 노드를 `InformStaffProblem` 폴백으로 올려 조용한 실패를 피할 수 있다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

### 5.1 실패 모드와 적용 한계 (표 V)

논문은 실패 모드를 여섯 가지로 정리한다. 두 가지 설계 성질이 이 목록을 가능하게 한다. action node마다 policy가 하나씩 붙으므로 실패의 책임 노드를 지목할 수 있고, cascade의 끝에 사람이 있고 트리에 `InformStaffProblem`이 있으므로 모든 모드에 정의된 동작이 존재한다.

| 실패 모드 | 근거 | 한계 조건 | 완화 방향 |
|---|---|---|---|
| 형태가 변하는 물체의 grasping 실패 | 최고 성능 모델에서도 딸기 3/10, Diffusion Policy는 세 과일 모두 0/10 | pose와 형태의 변동성이 큼 | 물체 변동성에 따라 시연 데이터를 배분 |
| 과제 간 간섭 | co-training한 π0.5의 뚜껑 0/10, 스위치 1~2/10 | 이질적인 subtask를 하나의 policy가 담당 | 시연 데이터 예산이 맞을 때만 범위를 넓힘 |
| horizon amplification | end-to-end 성공률 추정치 약 0.34 | 약한 노드가 포함된 긴 시퀀스 | 계획 시점에 추정하고 약한 노드를 상위로 escalate |
| 검증되지 않은 대리 응답 | 질문당 agent 하나, second opinion 없음 | `Pk`가 낡거나 틀림 | `Pk`를 기계가 읽을 수 있는 플랫폼 명세에 근거시킴 |
| 선호 질문에 대한 과잉 응답 | 실험 2에서는 확인되지 않음 | 사실 질문과 선호 질문의 경계가 겹침 | BT 생성 전에 일괄 확인 |
| condition node 오판 | 별도로 평가하지 않음 | 시각적으로 모호하거나 가려진 술어 | 불확실하면 FAILURE를 반환해 오류를 제한 |

manipulation 쪽 두 모드에 대해 논문은 한계 조건이 모델 계열이 아니라 물체 변동성이라고 본다. 같은 모델이 형태가 고정된 블렌더 조작에서는 안정적으로 동작했기 때문이다. 이 진단은 policy 아키텍처가 아니라 시연 데이터 집합을 지목하므로 다루기 쉽다. co-training한 π0.5가 시연 데이터가 가장 적은 subtask에서 크게 하락한 것도 용량 부족이 아니라 간섭으로 해석한다.

대화 쪽 위험은 방향이 비대칭이다. 지나치게 보수적인 abstention은 cascade를 사람이 전부 답하는 baseline 쪽으로 되돌릴 뿐이고 `ρ`만 낮아진다. 반대로 agent가 선호 질문에 답해 사용자를 조용히 덮어쓰는 쪽이 해로운 모드다. 실험 2에서 사람에게 돌아간 세 질문이 정확히 선호 질문이었다는 점을 저자들은 abstention 우선 지시의 효과로 보되 보장은 아니라고 적는다.

검증 쪽에서는 오판의 비용이 비대칭이다. 잘못된 FAILURE는 폴백 전까지 남은 재시도 예산만 소모하지만, 잘못된 SUCCESS는 만족되지 않은 선행 조건 위에서 트리를 진행시키고 그 손해에 상한이 없다. 그래서 불확실할 때 FAILURE를 반환하도록 설계했다.

### 5.2 구조적 한계

- **cascade 순서가 고정이고 수작업이다.** 분할이 겹치지 않으므로 융합은 필요 없지만 고정 순서는 실질적인 제약이다. 비용이 `K`에 선형으로 늘어나므로 전문가 풀이 커지면 라우팅 단계가 필요하다. 라우팅은 어떤 `αk`를 평가할지를 바꿀 뿐 분할의 비겹침 성질은 유지한다. second opinion도 사실 질문에 한해 같은 조건에서 복원할 수 있다.
- **계획이 offline이다.** BT는 실행 전에 확정되므로 예상하지 못한 상황은 이미 트리에 있는 구조로만 처리된다. 저자들은 실패한 노드에서 subtree를 다시 생성하는 방향을 완화책으로 제시한다.
- **일반화 정도가 구성 요소마다 다르다.** BT 스키마, Algorithm 1, `#Process` 템플릿은 과제와 무관하며 두 실험에서 그대로 재사용됐다. 도메인마다 새로 써야 하는 것은 각 `Pk`, action node와 policy의 결합, 시연 데이터다. 두 실험 모두 음료 제조라 도메인 간 재사용이 아니라 도메인 내 재사용이다.
- **시연 데이터가 비용을 지배한다.** 새 과제는 계획 쪽으로는 싸고 manipulation 쪽으로는 비싸다. 비용이 가장 낮았던 자리는 π0.5가 pre-training 데이터의 탁상 manipulation을 활용할 수 있던 지점이므로, 새 도메인으로 가는 경로로는 더 넓은 pre-training이 유력하다.

### 5.3 향후 과제

논문이 밝힌 후속 방향은 세 가지다. MoA 프레임워크를 더 넓은 과제 도메인으로 확장하는 것, 전문가 풀 크기에 따라 cascade 비용이 늘지 않도록 agent 자동 선택을 도입하는 것, 현재 end-to-end 성능을 제약하는 노드별 policy를 개선하는 것이다.

## 6. 관련 연구 (Related Work)

### 6.1 LLM 기반 로봇 과제 계획

실행 전에 계획을 만드는 offline planning과 실행 중에 계획을 고치는 online planning으로 나뉜다. SayCan은 강화학습을 통해 언어 지시문을 동작에 grounding하고, DELTA는 scene graph로 실현 가능성을 높인다. 계층적 또는 단계적 계획으로 BT를 생성하는 연구, 중간 단계에 고전 planner를 결합하는 연구도 있다. 이들은 사람의 의도를 직접 반영하지만 상세한 과제 명세를 프롬프트에 미리 써 넣어야 해서 도메인 지식이 없는 사용자에게는 현실적이지 않다.

### 6.2 interactive task planning

LLM이 질문을 던져 빠진 정보를 대화로 채운다. Ren et al.은 지시문과 시각 observation에서 계획 불확실성을 추정해 선택적으로 질문을 만든다. Hori et al.은 LLM이 자기 계획의 불확실성을 분석해 불확실하다고 판단한 구간에 대해 교정 질문을 만들게 한다. 장점은 상세한 과제 서술 없이 필요한 정보만 얻는다는 점이다.

문제는 planner가 중복된 질문을 많이 던진다는 것이다. 논문은 스크램블드 에그 과제에서 "어떤 종류의 달걀을 쓸 것인가"를 묻는 사례를 든다. 또한 검증이 주로 짧은 실제 로봇 과제에 머물러 있어 이런 계획이 long-horizon 실행을 얼마나 지탱하는지 불확실하다.

### 6.3 멀티에이전트 LLM 구조

Table I이 대조하는 네 가지 계열이다.

| 구조 | 출력 결합 방식 | abstention | 턴당 LLM 호출 | 사람의 역할 |
|---|---|---|---|---|
| self-consistency | 샘플에 대한 다수결 | 없음 | 샘플 N개 | 없음 |
| multi-agent debate | 반복적인 상호 비평 | 없음 | N × 라운드 수 | 없음 |
| layered MoA | aggregator LLM이 제안을 종합 | 없음 | proposer 수 × layer 수 + 1 | 없음 |
| 역할 기반 agent (MetaGPT, CAMEL) | 역할별 메시지 전달 | 없음 | 과제 의존 | 없음 |
| 제안 방식 | 불필요 (겹치지 않는 분할) | 있음 | `K` 이하 (조기 종료) | terminal fallback |

네 계열은 모두 모든 agent가 답한 뒤 중복을 하나로 줄이는 구조이며, 단 하나의 정답이 존재하고 그것을 자율적으로 만들어야 하는 상황을 겨냥한다. 저자들은 interactive planning이 그런 성질을 갖지 않는다고 지적한다. 확인 질문의 상당 부분이 사용자 의도에 관한 것이라 외부 정답이 없고, 자율적으로 답하면 사용자를 조용히 덮어쓰게 된다. 그래서 반대 규약을 택한다. prerequisite가 보장하는 것만 답하고 나머지는 미루며 잔여를 위임하고 마지막에 사람에게 돌려준다. 중복을 해소하는 대신 애초에 만들지 않는다.

### 6.4 BT 생성

언어 지시문에서 BT를 합성하거나 확장하는 선행 연구가 있으나 대체로 기호 수준의 동작에서 멈춘다. 이 논문은 각 action node를 구체적인 imitation learning policy에 묶어 실제 dual-arm 로봇에서 트리를 실행하므로, 재시도와 폴백 구조가 실제 실행 실패에 대해 작동한다.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| Mixture-of-Agents (MoA) | 여러 LLM agent를 조합해 하나의 응답을 만드는 구조. 원 논문은 proposer를 계층으로 쌓고 aggregator가 종합하지만, 이 논문은 abstention과 위임으로 재해석한다 |
| abstention | agent가 답할 수 없다고 판단해 응답을 미루고 질문을 그대로 다음 단계로 넘기는 선택 |
| delegation cascade | agent를 일렬로 놓고 잔여 질문을 차례로 넘기는 구조. 마지막 원소가 사람이다 |
| prerequisite description | agent가 사용할 수 있는 지식의 범위를 적은 프롬프트 블록. 기호로는 `Pk` |
| answerability predicate | 질문을 `Pk`만으로 답할 수 있는지 판정하는 함수. 기호로는 `αk` |
| terminal fallback | cascade의 마지막에 놓인 사람. 남은 질문을 모두 받으므로 coverage가 보장된다 |
| proxy ratio | 사람 개입 없이 해소된 질문의 비율. 기호로는 `ρ` |
| Tree Edit Distance | 한 트리를 다른 트리로 바꾸는 데 필요한 노드 삽입, 삭제, 치환의 최소 횟수 |
| horizon amplification | 노드별 성공률이 곱으로 누적되어 시퀀스가 길어질수록 end-to-end 성공률이 급격히 낮아지는 현상 |
| BehaviorTree.CPP | BT 실행 엔진 라이브러리. v4 XML 스키마를 계획 산출 형식으로 썼다 |
| InformStaffProblem | 재시도가 모두 실패했을 때 작업자에게 알리는 폴백 action node |

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 2 | 제안 프레임워크의 전체 흐름도 | caption-region | ★ wiki 권장 (architecture) |
| fig02 | 3 | 세 expert agent의 프롬프트 설계 | caption-region | ★ wiki 권장 (method) |
| fig03 | 4 | 생성된 BT 조각 XML | caption-region | 본문 코드 블록으로 대체 |
| fig04 | 6 | 스무디 과제 BT와 질의응답 예시 | caption-region | ★ wiki 권장 (method) |
| fig05 | 6 | 실제 로봇 실행 순서 | caption-region | ★ wiki 권장 (result) |
| tab01 | 4 | 멀티에이전트 LLM 구조 비교 | table-region | ★ wiki 권장 (comparison) |
| tab02 | 5 | 정규화 Tree Edit Distance | table-region | 본문 표로 대체 |
| tab03 | 5 | 노드 임베딩 유사도 | table-region | 본문 표로 대체 |
| tab04 | 5 | 동작별 성공률 | table-region | ★ wiki 권장 (result) |
| tab05 | 8 | 실패 모드와 적용 한계 | table-region | ★ wiki 권장 (analysis) |
