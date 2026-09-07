---
title: "ReAcTree: Hierarchical LLM Agent Trees with Control Flow for Long-Horizon Task Planning"
type: paper
year: 2026
category: physical-ai
raw_path: raw/papers/choi-2026-reactree-hierarchical-llm-agent-trees.pdf
raw_filename: "choi-2026-reactree-hierarchical-llm-agent-trees.pdf"
source_collection: external
authors: "Jae-Woo Choi, Hyungmin Kim, Hyobin Ong, Youngwoo Yoon, Minsu Jang, Dohyung Kim, Jaehong Kim (ETRI, UST)"
arxiv_id: "2511.02424"
url: "https://arxiv.org/abs/2511.02424"
tags: [physical-ai, manipulation, simulator, benchmark]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/choi-2026-reactree-hierarchical-llm-agent-trees/fig01.png
    raw: raw/papers/choi-2026-reactree-hierarchical-llm-agent-trees-figures/fig01.png
    caption: "푸딩과 주스를 커피 테이블로 옮기라는 지시문에서 자라난 agent tree와 agent node 3의 실행 trajectory, 두 메모리와의 연결"
    page: 2
    bbox_norm: [0.0781, 0.0981, 0.9219, 0.3378]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/choi-2026-reactree-hierarchical-llm-agent-trees/fig02.png
    raw: raw/papers/choi-2026-reactree-hierarchical-llm-agent-trees-figures/fig02.png
    caption: "agent node의 세 가지 실행 분기(reasoning, acting, expanding)와 control flow node의 자식 선택 구조"
    page: 3
    bbox_norm: [0.1605, 0.0981, 0.8395, 0.2736]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/choi-2026-reactree-hierarchical-llm-agent-trees/fig03.png
    raw: raw/papers/choi-2026-reactree-hierarchical-llm-agent-trees-figures/fig03.png
    caption: "Qwen 2.5 72B로 실행한 WAH-NL 성공 사례. 단계별 시뮬레이터 화면과 완성된 트리, 각 node의 subgoal 목록"
    page: 6
    bbox_norm: [0.1193, 0.0978, 0.8808, 0.5272]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/choi-2026-reactree-hierarchical-llm-agent-trees/fig04.png
    raw: raw/papers/choi-2026-reactree-hierarchical-llm-agent-trees-figures/fig04.png
    caption: "실패 39건을 Ambiguous, Execution, Search, Expand 네 범주와 하위 범주로 나눈 분포"
    page: 8
    bbox_norm: [0.5494, 0.0981, 0.8822, 0.2584]
    strategy: caption-region
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/choi-2026-reactree-hierarchical-llm-agent-trees/fig05.png
    raw: raw/papers/choi-2026-reactree-hierarchical-llm-agent-trees-figures/fig05.png
    caption: "같은 과제에서 ReAct+WM이 kitchen 1을 벗어나지 못해 실패한 WAH-NL 사례"
    page: 17
    bbox_norm: [0.0781, 0.1021, 0.9144, 0.7513]
    strategy: caption-region
    curated: false
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/choi-2026-reactree-hierarchical-llm-agent-trees/fig06.png
    raw: raw/papers/choi-2026-reactree-hierarchical-llm-agent-trees-figures/fig06.png
    caption: "LLaMA 3.1 70B로 실행한 ALFRED 성공 사례. 감자를 자르고 데운 뒤 냉장고에 넣는 네 subgoal 분해"
    page: 23
    bbox_norm: [0.1605, 0.1492, 0.8395, 0.8484]
    strategy: caption-region
    curated: false
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/choi-2026-reactree-hierarchical-llm-agent-trees/fig07.png
    raw: raw/papers/choi-2026-reactree-hierarchical-llm-agent-trees-figures/fig07.png
    caption: "같은 ALFRED 과제에서 ReAct+WM이 가열 단계를 건너뛰어 실패한 사례"
    page: 24
    bbox_norm: [0.1605, 0.1294, 0.8395, 0.4706]
    strategy: caption-region
    curated: false
  - id: tab01
    label: Table 1
    kind: table
    file: assets/choi-2026-reactree-hierarchical-llm-agent-trees/tab01.png
    raw: raw/papers/choi-2026-reactree-hierarchical-llm-agent-trees-figures/tab01.png
    caption: "WAH-NL에서 7개 LLM에 대한 baseline 5종과 제안 방식 2종의 GSR과 SSR 비교"
    page: 5
    bbox_norm: [0.0781, 0.1413, 0.9235, 0.2982]
    strategy: table-region
    curated: true
  - id: tab02
    label: Table 2
    kind: table
    file: assets/choi-2026-reactree-hierarchical-llm-agent-trees/tab02.png
    raw: raw/papers/choi-2026-reactree-hierarchical-llm-agent-trees-figures/tab02.png
    caption: "ALFRED의 valid-seen과 valid-unseen 분할에서 ReAct+WM과 ReAcTree+WM의 GSR 비교"
    page: 6
    bbox_norm: [0.5135, 0.6308, 0.9181, 0.7519]
    strategy: table-region
    curated: false
  - id: tab03
    label: Table 3
    kind: table
    file: assets/choi-2026-reactree-hierarchical-llm-agent-trees/tab03.png
    raw: raw/papers/choi-2026-reactree-hierarchical-llm-agent-trees-figures/tab03.png
    caption: "episodic memory와 working memory를 켜고 끈 네 조합의 성능. Qwen 2.5 7B와 72B 대비"
    page: 7
    bbox_norm: [0.2321, 0.1413, 0.7679, 0.3178]
    strategy: table-region
    curated: true
  - id: tab04
    label: Table 4
    kind: table
    file: assets/choi-2026-reactree-hierarchical-llm-agent-trees/tab04.png
    raw: raw/papers/choi-2026-reactree-hierarchical-llm-agent-trees-figures/tab04.png
    caption: "control flow 종류를 all, seq+fb, seq로 줄여 가며 잰 성능 변화"
    page: 7
    bbox_norm: [0.5097, 0.365, 0.9253, 0.4781]
    strategy: table-region
    curated: false
  - id: tab05
    label: Table 5
    kind: table
    file: assets/choi-2026-reactree-hierarchical-llm-agent-trees/tab05.png
    raw: raw/papers/choi-2026-reactree-hierarchical-llm-agent-trees-figures/tab05.png
    caption: "모든 설정이 공통으로 성공한 19개 과제에서 잰 평균 실행 시간과 decision step 수"
    page: 8
    bbox_norm: [0.0789, 0.1413, 0.4895, 0.2236]
    strategy: table-region
    curated: false
  - id: tab06
    label: Table 6
    kind: table
    file: assets/choi-2026-reactree-hierarchical-llm-agent-trees/tab06.png
    raw: raw/papers/choi-2026-reactree-hierarchical-llm-agent-trees-figures/tab06.png
    caption: "decision 한 번당 최대 입력 토큰과 평균 입출력 토큰 사용량"
    page: 8
    bbox_norm: [0.0652, 0.2444, 0.4968, 0.3356]
    strategy: manual
    curated: false
  - id: tab07
    label: Table 7
    kind: table
    file: assets/choi-2026-reactree-hierarchical-llm-agent-trees/tab07.png
    raw: raw/papers/choi-2026-reactree-hierarchical-llm-agent-trees-figures/tab07.png
    caption: "지시문과 goal condition이 어긋났던 WAH-NL 테스트 4개 과제의 수정 전후 대조"
    page: 12
    bbox_norm: [0.127, 0.6477, 0.8694, 0.8854]
    strategy: table-region
    curated: false
  - id: tab08
    label: Table 8
    kind: table
    file: assets/choi-2026-reactree-hierarchical-llm-agent-trees/tab08.png
    raw: raw/papers/choi-2026-reactree-hierarchical-llm-agent-trees-figures/tab08.png
    caption: "VirtualHome에서 action 종류별로 돌아오는 텍스트 observation 예시"
    page: 13
    bbox_norm: [0.0781, 0.3105, 0.9233, 0.5668]
    strategy: table-region
    curated: false
  - id: tab09
    label: Table 9
    kind: table
    file: assets/choi-2026-reactree-hierarchical-llm-agent-trees/tab09.png
    raw: raw/papers/choi-2026-reactree-hierarchical-llm-agent-trees-figures/tab09.png
    caption: "AI2THOR에서 action 종류별로 돌아오는 텍스트 observation 예시"
    page: 13
    bbox_norm: [0.0781, 0.6109, 0.9233, 0.8856]
    strategy: table-region
    curated: false
  - id: tab10
    label: Table 10
    kind: table
    file: assets/choi-2026-reactree-hierarchical-llm-agent-trees/tab10.png
    raw: raw/papers/choi-2026-reactree-hierarchical-llm-agent-trees-figures/tab10.png
    caption: "실험에 사용한 7개 언어 모델의 HuggingFace 식별자와 크기"
    page: 14
    bbox_norm: [0.2895, 0.467, 0.7105, 0.6274]
    strategy: table-region
    curated: false
---

## 한 줄 요약 (One-line Summary)

long-horizon 가사 과제를 하나의 긴 trajectory로 풀던 ReAct 방식을 버리고, subgoal 하나를 맡은 LLM agent node를 Behavior Tree식 control flow node로 엮은 트리를 실행 중에 키워 가며, WAH-NL에서 Qwen 2.5 72B 기준 goal 성공률을 31%에서 61%로 끌어올린 논문이다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 제목 | ReAcTree: Hierarchical LLM Agent Trees with Control Flow for Long-Horizon Task Planning |
| 저자 | Jae-Woo Choi, Hyungmin Kim, Hyobin Ong, Youngwoo Yoon, Minsu Jang, Dohyung Kim, Jaehong Kim |
| 소속 | ETRI(한국전자통신연구원), UST(과학기술연합대학원대학교), 대전 |
| arXiv | 2511.02424v2 (cs.AI, 2026-02-10) |
| 학회 | AAMAS 2026 (Paphos, Cyprus, 2026-05-25 ~ 29) |
| 분량 | 전체 24쪽(본문 8쪽, 참고문헌 2쪽, 부록 14쪽), figure 7개, table 10개 |
| 코드 | https://github.com/Choi-JaeWoo/ReAcTree.git |
| 라이선스 | Creative Commons Attribution International 4.0 |
| 지원 | IITP(RS-2024-00336738 40%, RS-2022-II220951 40%), NST(GTL25041-000 20%) |

제1저자 Jae-Woo Choi는 이 논문이 평가 기반으로 삼는 LoTa-Bench(ICLR 2024)의 제1저자이기도 하다. 즉 자신이 만든 벤치마크를 partial observability 설정으로 확장해 새 방법을 검증한 구조다.

## 2. 주요 기여 (Key Contributions)

논문이 스스로 꼽는 기여는 세 가지다.

1. **agent tree 기반 계층적 planning 프레임워크.** primitive action 위에 탐색 트리를 세우는 대신, subgoal 공간에서 agent tree를 실행 도중에 키운다. 각 agent node는 자기 subgoal만 책임지고, control flow node가 자식들의 실행 순서와 성패 전파 방식을 정한다.
2. **상호 보완적인 두 메모리 시스템.** episodic memory는 subgoal 단위 과거 경험을 저장해 각 agent node의 in-context learning 예시를 공급한다. working memory는 공유 칠판처럼 동작해 실행 중 관찰한 이동 가능 물체의 위치를 node 사이에 전달한다.
3. **partial observability로 확장한 LoTa-Bench 실험.** WAH-NL과 ALFRED 두 환경에서 baseline 5종과 LLM 7종을 교차한 대규모 비교, 메모리와 control flow ablation, 계산 비용 분석, 실패 사례 39건 분류를 함께 제시한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 문제 설정과 기존 방식의 한계

agentic planning은 자연어 목표 `g`를 달성하기 위해 매 시점 다음 action을 고르는 순차 의사결정 문제로 정식화된다. 시점 `t`에서 agent는 컨텍스트 `c_t = (o_1, a_1, o_2, a_2, ..., a_{t-1}, o_t)`를 가지고 다음 action `a_t`를 만든다. 여기서 `o_i`는 시점 `i`의 observation이고 `a_i`는 그때의 action이다. observation은 policy가 매 시점 받는 입력을 뜻하고, action은 policy가 내놓는 실행 명령을 뜻한다.

논문이 지적하는 기존 방식의 한계는 두 가지다.

| 계열 | 대표 방법 | 한계 |
|---|---|---|
| 단일 trajectory 계열 | ReAct, Reflexion, AdaPlanner, DEPS | 여러 subgoal의 과거 결정과 observation이 하나의 trajectory에 엉켜 쌓인다. 컨텍스트가 길어질수록 환각과 논리 오류 위험이 커진다 |
| 다중 추론 경로 계열 | Tree of Thoughts, LLM-MCTS, ToolChain*, Tree-Planner | 여러 경로를 시뮬레이션하고 이전 상태로 되돌릴 수 있다고 가정한다. 사과를 자르는 것처럼 되돌릴 수 없는 action이 있고 환경이 부분적으로만 보이는 현실에서는 성립하기 어렵다 |

trajectory는 세션 하나의 실행 기록 전체를 뜻한다. 첫 번째 계열의 문제는 Liu 등이 보고한 lost in the middle 현상과 직결된다. 컨텍스트 중간에 놓인 정보를 모델이 잘 활용하지 못하므로, 하나의 긴 기록에 모든 subgoal을 담을수록 앞부분의 결정이 흐려진다.

ReAcTree는 두 계열의 가정을 모두 피한다. 되돌리기를 요구하지 않고, 대신 문제를 의미적으로 분리된 subgoal로 쪼개 각각에 좁은 컨텍스트를 준다. 논문은 이 설계를 Least-to-Most prompting을 정적 추론에서 동적 agentic planning으로 확장한 것이라고 설명한다.

### 3.2 출발점이 되는 ReAct

ReAct는 추론과 action 실행을 번갈아 놓는 방식이다. action policy는 `a_t ~ p_LLM(· | P, g, c_t)`로 정의되고, `P = (P_sys, P_ic)`는 시스템 프롬프트와 in-context 예시로 이루어진 초기 프롬프트다.

핵심은 확장된 action space다. `Â_t = A_t ∪ L`에서 `A_t`는 시점 `t`에 실행 가능한 스킬 집합이고 `L`은 추론 문장을 담는 언어 공간이다. action space는 agent가 낼 수 있는 action의 집합을 뜻한다. `a_t`가 `A_t`에 속하면 실제로 실행하고 환경에서 텍스트 observation을 받는다. `a_t`가 `L`에 속하면 생각에 해당하므로 새 observation이 오지 않는다(`o_{t+1} = ϕ`).

### 3.3 agent node의 실행

ReAcTree의 agent node `n`은 ReAct를 그대로 확장한다. 각 node는 자연어 subgoal `g^n`을 하나 맡고, 자기만의 컨텍스트 `c^n_t`를 유지하며, `a^n_t ~ p_LLM(· | P^n, g^n, c^n_t)`로 다음 action을 뽑는다. 초기 프롬프트 `P^n = (P_sys, P^n_ic)`에서 in-context 예시 `P^n_ic`가 node마다 다르다는 점이 ReAct와의 첫 번째 차이다.

두 번째 차이는 action space가 한 번 더 넓어진다는 점이다.

```
Â^n_t = A^n_t ∪ L ∪ E
```

| 부분 공간 | 의미 | 예시 |
|---|---|---|
| `A^n_t` | 시점 `t`에 실행 가능한 스킬 | `pick up apple 1` |
| `L` | 자기 추론을 적는 언어 공간 | `Think: I need to recall the location of the pudding` |
| `E = F × L` | 트리를 넓히는 expand 공간. `F`는 control flow 종류, `L`은 subgoal을 적는 언어 공간 | `Expand: fallback, [find pudding in kitchen 1, find pudding in living room 1]` |

expand action은 `a^n_t = (f^n, [g^n_1, ..., g^n_K])` 형태다. 이 action이 나오면 node `n`은 타입 `f^n`인 control flow node를 자식으로 붙이고, 생성된 subgoal 각각을 맡을 agent node를 그 손자로 붙인다. 그다음 control flow node를 실행하고 결과를 기다린다.

agent node는 세 조건 중 하나에서 종료한다.

- `done`을 생성하면 성공을 반환한다.
- `failure`를 생성하면 실패를 반환한다.
- 최대 decision 횟수에 도달하면 실패를 반환한다.

decision 횟수는 트리 전체에서 누적된다. 부모가 자식에게 현재 카운트를 넘기고 자식이 쓴 만큼 더해서 돌려주므로, 트리가 아무리 넓어져도 총 LLM 호출 수에 상한이 걸린다.

### 3.4 control flow node의 세 종류

control flow node는 Behavior Tree 원리를 따른다. Behavior Tree는 로봇 제어에서 과제 실행 순서와 실패 처리를 트리 구조로 표현하는 형식이다. ReAcTree는 세 종류를 지원한다.

| 종류 | 기호 | 실행 방식 | 성공 조건 |
|---|---|---|---|
| sequence | → | 자식을 순서대로 실행하고 하나라도 실패하면 즉시 중단한다 | 자식 전부 성공 |
| fallback | ? | 자식을 순서대로 실행하다 하나가 성공하면 즉시 반환한다 | 자식 중 하나 이상 성공 |
| parallel | ⇒ | 조기 종료 없이 자식을 모두 실행한 뒤 결과를 집계한다 | 집계 policy에 따라 결정. 논문은 다수결을 채택 |

용도가 서로 다르다. sequence는 순서 의존이 있는 단계에 쓰고(칼을 집은 뒤에 자른다), fallback은 여러 후보를 차례로 시도하는 탐색에 쓰며(부엌에 없으면 거실을 본다), parallel은 서로 독립인 subgoal에 쓴다(물건 두 개를 각각 다른 곳에 놓는다).

### 3.5 실행 알고리즘

부록 A가 의사코드 두 개를 제시한다. planning은 최상위 목표 `g`를 맡은 단일 agent node `n_0`에서 `ExecAgentNode(n_0, D_init = 0)`으로 시작한다.

`ExecAgentNode`는 다음 순서로 동작한다.

1. episodic memory에서 in-context 예시 `P^n_ic`를 검색해 프롬프트를 초기화한다.
2. 현재 observation으로 컨텍스트를 초기화한다.
3. 종료 조건을 만날 때까지 LLM에서 action을 뽑고 decision 카운트를 1 증가시킨다.
4. action이 `done`이면 성공, `failure`이거나 카운트가 상한에 닿으면 실패를 반환한다.
5. action이 실행 가능한 스킬이면 환경과 상호작용해 observation을 받고 컨텍스트에 덧붙인다.
6. action이 추론이면 observation 자리를 비운 채 컨텍스트에만 덧붙인다.
7. action이 expand면 control flow node와 자식 agent node들을 만들고 `ExecCtrlFlowNode`로 넘어간다.

`ExecCtrlFlowNode`는 타입에 따라 자식 `ExecAgentNode`를 호출하고 decision 카운트를 이어받아 갱신한 뒤, sequence는 첫 실패에서, fallback은 첫 성공에서 즉시 반환하며, parallel은 전부 실행한 후 집계한다.

### 3.6 episodic memory

episodic memory는 개별 경험 단위로 저장되는 메모리 층이다. ReAcTree는 최종적으로 성공한 과제 실행에 참여한 agent node들의 trajectory를 저장한다. 개별 node가 자기 subgoal을 완수하지 못했더라도 전체 과제가 성공했다면 그 node의 기록도 남는다.

저장 단위가 subgoal이라는 점이 ReAct와 대비된다. ReAct는 "푸딩과 주스를 커피 테이블로 가져와라"라는 과제 하나에 대해 긴 trajectory 한 건을 남긴다. ReAcTree는 "푸딩을 찾아 집어라", "주스를 찾아 집어라"처럼 목적이 뚜렷하고 짧은 trajectory 여러 건을 남긴다. 검색 단위가 잘게 나뉘므로 현재 subgoal에 더 정확히 대응하는 예시를 가져올 수 있다.

각 경험은 세 원소로 이루어진 튜플 `(t_e, v_e, s_e)`로 기록된다.

| 원소 | 내용 |
|---|---|
| `t_e` | `(g_e, o_e_1, a_e_1, ..., o_e_T, a_e_T)` 형태의 전체 텍스트 trajectory |
| `v_e` | Sentence-BERT 같은 pre-training된 인코더로 계산한 subgoal의 문장 임베딩 |
| `s_e` | `success`, `failure`, `expand` 중 하나인 node 종료 상태 |

검색은 코사인 유사도로 한다. agent node는 자기 subgoal `g^n`을 임베딩해 `v_n`을 만들고 `sim(v_n, v_e) = (v_n · v_e) / (||v_n|| ||v_e||)`를 계산한 뒤 상위 `k`개를 가져온다. `k`는 토큰 예산이 정한다. 유사도가 같은 경험이 여럿이면 세 종료 상태에 균등하게 배분해 표본을 뽑아 다양성을 확보한다.

부트스트랩 절차도 명시되어 있다. 사람이 소수의 trajectory를 수동으로 만들어 in-context 예시로 쓰고, 그 상태로 학습 세트를 실행해 성공한 실행만 메모리에 축적한다. 즉 사람이 만든 씨앗에서 시작해 자기 실행으로 늘려 가는 구조다.

### 3.7 working memory

working memory는 하나의 ReAcTree 실행 안에서 모든 agent node가 공유하는 저장소다. 논문의 구현은 이동 가능한 물체의 위치 추적에 집중한다. 같은 물건을 여러 node가 중복해서 찾아다니는 낭비를 줄이고, 위치를 지어내는 환각을 억제하는 것이 목적이다.

두 가지 방식으로 agent node에 연결된다.

1. **recall 스킬 추가.** 실행 가능한 스킬 집합 `A^n_t`에 `recall location of <movable object>`가 추가된다. 이 action은 환경을 탐색하지 않고 working memory만 조회한다.
2. **자동 갱신.** agent가 상호작용 중 이동 가능한 물체를 관찰하면 자동으로 기록된다. 예를 들어 냉장고를 열어 주스를 보면 주스가 냉장고 안에 있다는 사실이 즉시 반영된다.

구현은 가벼운 파이썬 딕셔너리다. 물체 클래스를 키로, 관찰된 인스턴스와 그 위치(ID, 방, 놓인 가구)의 목록을 값으로 가진다. 논문은 `recall location`을 Toolformer 계열의 tool use 개념을 확장한 특수 도구형 action으로 규정한다.

두 메모리의 역할 분담은 다음과 같이 정리된다.

| 구분 | episodic memory | working memory |
|---|---|---|
| 생존 범위 | 실행 사이를 넘어 누적된다 | 한 번의 실행 안에서만 유지된다 |
| 저장 내용 | subgoal 단위 trajectory와 종료 상태 | 이동 가능 물체의 최신 위치 |
| 접근 방법 | 프롬프트 구성 시점의 임베딩 검색 | 실행 중 `recall location` 스킬 호출 |
| 기여하는 능력 | in-context learning 품질 | node 사이의 상황 공유 |

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 실험 설정

평가는 LoTa-Bench의 프로토콜을 따른다. 두 데이터셋과 시뮬레이터 쌍을 쓰되, 원래 설정을 partial observability로 확장했다. partial observability는 agent가 환경 전체가 아니라 현재 위치에서 보이는 것만 알 수 있는 상황을 뜻한다.

| 항목 | WAH-NL + VirtualHome | ALFRED + AI2THOR |
|---|---|---|
| 역할 | 주 실험 | 보완 검증 |
| 과제 성격 | long-horizon, 여러 방, 여러 subgoal | 상대적으로 짧고 단일 방, 단일 목표 |
| 규모 | 학습 250개, 테스트 100개, 5개 범주 | 7개 과제 유형, 학습 세트 2만 1천 개 |
| primitive action | 6종(go to, pick up, put down, open, close, turn on) | 8종(위 6종 + turn off, slice) |
| 평가 분할 | 테스트 100개 | valid-seen, valid-unseen |

partial observability 구현은 규칙 기반 observation 생성기다. 매 action 뒤에 현재 방에서 보이는 물체와 가구를 텍스트로 알려주되 닫힌 용기 안의 물건은 제외한다. 모든 물체에 클래스와 인스턴스 식별자가 붙어 `pick up apple 1`처럼 정확히 지목할 수 있다.

LoTa-Bench에서 빠져 있던 ALFRED의 pick and place two objects 과제를 인스턴스 식별자를 넣어 되살렸다. WAH-NL 테스트 과제 중 지시문과 goal condition이 어긋난 4건은 부록 B.1에서 수정 내역을 공개하고 수정본으로 평가했다. 예를 들어 goal condition은 커피 테이블인데 지시문이 부엌 테이블을 가리키던 4번 과제가 여기 해당한다.

평가 지표는 두 가지다.

| 지표 | 정의 | 적용 |
|---|---|---|
| goal success rate (GSR) | 전체 목표를 달성한 과제의 비율 | WAH-NL, ALFRED |
| subgoal success rate (SSR) | 완료한 subgoal 수를 전체 subgoal 수로 나눈 비율 | WAH-NL만. ALFRED에는 명시적 subgoal 정의가 없다 |

구현 세부는 fine-tuning 없는 few-shot in-context learning 설정이다. 검색된 예시의 총 길이는 5천 토큰을 넘지 않게 제한했고, decision 상한은 WAH-NL 200회, ALFRED 100회다. 텍스트 생성에는 Guidance 라이브러리를 썼으며 자유 생성은 temperature 0.0, acting action과 control flow 종류 선택은 constrained generation으로 결정론적으로 골랐다.

episodic memory 부트스트랩은 LLaMA 3.1 70B로 수행했다. WAH-NL은 과제 유형당 수동 trajectory 1건을 만들어 학습 세트 전체를 실행했고, ALFRED은 유형당 3건을 만들되 학습 세트가 커서 유형당 최대 100건의 성공 trajectory만 저장했다.

### 4.2 비교 대상

baseline은 5종이다.

| baseline | 방식 |
|---|---|
| ZSP | 초기 환경 설명만 보고 전체 계획을 한 번에 재귀 생성한다. 중간 observation을 받지 못한다 |
| Tree-Planner (N=25) | 계획 후보 25개를 샘플링해 action tree를 만들고, 실행 시점 observation으로 그 안에서 고른다 |
| Tree-Planner (N=50) | 계획 후보를 50개로 늘린 설정 |
| ReAct | 추론과 action을 번갈아 놓는 단일 trajectory 방식 |
| ReAct+WM | ReAct에 working memory를 결합한 변형 |

ZSP와 Tree-Planner에는 불리함을 줄이는 보정을 넣었다. 초기에 모든 방과 물체, 가구를 담은 전역 환경 정보를 주고, `pick up`과 `put down`에서 인스턴스 식별자를 생략할 수 있게 제약을 완화했다.

### 4.3 WAH-NL 주요 결과

7개 LLM(LLaMA 3.1 8B와 70B, Qwen 2.5 7B와 72B, Mistral 7B, Gemma 2 9B, Phi-4-reasoning-plus 14B)에서 측정한 결과가 Table 1이다.

| 방법 | LLaMA 3.1 8B | LLaMA 3.1 70B | Qwen 2.5 7B | Qwen 2.5 72B | Mistral 7B | Gemma 2 9B | Phi-4-RP 14B |
|---|---|---|---|---|---|---|---|
| ZSP | 1.00 / 13.03 | 0.00 / 14.42 | 0.00 / 8.98 | 0.00 / 14.22 | 0.00 / 11.65 | 1.00 / 13.87 | 0.00 / 17.90 |
| Tree-Planner (N=25) | 1.00 / 17.00 | 2.00 / 16.72 | 6.00 / 22.23 | 6.00 / 32.41 | 1.00 / 20.43 | 2.00 / 17.58 | 3.00 / 17.52 |
| Tree-Planner (N=50) | 4.00 / 21.85 | 4.00 / 23.43 | 8.00 / 28.10 | 9.00 / 36.03 | 6.00 / 23.63 | 3.00 / 23.30 | 4.00 / 20.40 |
| ReAct | 8.00 / 34.25 | 30.00 / 57.05 | 10.00 / 31.82 | 26.00 / 51.38 | 6.00 / 28.18 | 9.00 / 37.20 | 33.00 / 48.13 |
| ReAct+WM | 16.00 / 42.65 | 33.00 / 63.15 | 13.00 / 39.73 | 31.00 / 54.05 | 9.00 / 31.95 | 11.00 / 39.93 | 33.00 / 51.28 |
| ReAcTree | 21.00 / 51.98 | 32.00 / 60.58 | 18.00 / 50.20 | 48.00 / 75.13 | 11.00 / 37.92 | 26.00 / 60.43 | 49.00 / 67.47 |
| ReAcTree+WM | 30.00 / 60.77 | 58.00 / 79.27 | 37.00 / 59.63 | 61.00 / 79.58 | 15.00 / 49.57 | 38.00 / 67.08 | 49.00 / 69.30 |

각 칸은 GSR / SSR (%) 순서다. 결과에서 확인되는 경향은 네 가지다.

1. **ZSP는 partial observability에서 사실상 동작하지 않는다.** 7개 모델 중 5개에서 GSR이 0%다. 계획을 한 번에 만들고 중간 관찰로 수정하지 못하는 구조의 한계다.
2. **Tree-Planner의 개선 폭은 제한적이다.** 후보를 25개에서 50개로 늘려도 GSR이 최대 9%에 머문다. 논문은 이유를 탐색 공간 크기로 설명한다. 전형적인 부엌에는 kitchen table, kitchen counter, fridge가 여러 개 있고 dishwasher까지 있어서, 어느 가구에 목표 물체가 있는지 모른 채 계획을 샘플링하면 유효한 계획이 나오지 않는다. 샘플링한 계획이 전부 실패하면 복구 경로도 없다.
3. **계층 구조 자체가 큰 폭의 개선을 만든다.** working memory 없이 비교해도 ReAcTree가 ReAct를 대부분의 모델에서 앞선다. Qwen 2.5 72B에서 26%에서 48%로, Gemma 2 9B에서 9%에서 26%로 올랐다.
4. **작은 모델이 큰 모델의 baseline을 넘어선다.** Qwen 2.5 7B의 ReAcTree+WM은 GSR 37%로, Qwen 2.5 72B의 ReAct+WM(31%)과 LLaMA 3.1 70B의 ReAct+WM(33%)을 모두 앞선다.

가장 크게 인용되는 수치는 Qwen 2.5 72B의 비교다. ReAcTree+WM이 GSR 61%를 기록해 ReAct+WM의 31%를 거의 두 배로 앞섰고, SSR도 54.05%에서 79.58%로 올랐다.

작은 모델이 강해지는 이유로 논문은 두 가지를 든다. 첫째, 과제를 단순한 subgoal로 쪼개면 누적되는 trajectory가 한 번에 하나의 subgoal만 담게 된다. 둘째, subgoal 단위 예시는 과제 단위 예시보다 현재 상황에 더 직접적으로 대응한다.

Figure 3이 성공 사례를 보여준다. "커피 테이블에 와인과 주스가 있게 하라"는 과제를 ReAcTree+WM은 와인 옮기기와 주스 옮기기 두 subgoal로 나누고 parallel로 실행했다. 와인을 찾을 때는 fallback으로 부엌, 거실, 침실을 차례로 탐색해 침실에서 찾아냈다. 같은 과제에서 ReAct+WM은 kitchen 1을 벗어나지 못해 실패했고 그 기록이 부록 F의 Figure 5에 있다.

### 4.4 ALFRED 결과

짧은 과제에서도 이득이 유지되는지 확인한 실험이다.

| 분할 | 방법 | LLaMA 3.1 8B | LLaMA 3.1 70B | Qwen 2.5 7B | Qwen 2.5 72B | Phi-4-RP 14B |
|---|---|---|---|---|---|---|
| valid-seen | ReAct+WM | 21.22 | 33.31 | 16.83 | 37.07 | 31.71 |
| valid-seen | ReAcTree+WM | 25.85 | 40.00 | 20.98 | 40.85 | 35.12 |
| valid-unseen | ReAct+WM | 19.61 | 32.40 | 16.81 | 39.10 | 29.72 |
| valid-unseen | ReAcTree+WM | 26.19 | 37.03 | 25.09 | 39.83 | 36.18 |

수치는 GSR (%)이다. 모든 모델과 모든 분할에서 ReAcTree+WM이 앞선다. valid-unseen에서 LLaMA 3.1 8B는 6.58%p, 70B는 4.63%p 올랐다. 학습에서 보지 못한 환경에서도 개선이 유지된다는 점이 일반화 근거로 제시된다.

정성적 차이도 보고된다. "익힌 감자 조각을 냉장고에 넣어라"라는 지시문에서 두 방법 모두 감자를 자르지만, ReAct+WM은 가열 단계를 건너뛰고 그대로 냉장고에 넣는다. ReAcTree+WM은 sequence control flow node로 네 subgoal(칼 찾아 집기, 감자 자르고 집기, 감자 익히고 집기, 냉장고에 넣기)로 분해해 전자레인지로 데운 뒤 넣는다.

### 4.5 메모리 ablation

Qwen 2.5 7B와 72B에서 episodic memory(EM)와 working memory(WM)를 켜고 끈 네 조합을 비교했다. EM을 끈 설정에서는 학습 과제 하나를 무작위로 골라 그 수동 trajectory를 모든 테스트 과제에 고정 in-context 예시로 준다. ReAcTree의 경우 그 과제에 참여한 모든 agent node의 trajectory를 하나로 이어 붙여 단일 예시로 만든다.

| 방법 | EM, WM | Qwen 2.5 7B GSR | Qwen 2.5 7B SSR | Qwen 2.5 72B GSR | Qwen 2.5 72B SSR |
|---|---|---|---|---|---|
| ReAct | 없음, 없음 | 7.00 | 22.82 | 13.00 | 35.75 |
| ReAct | 없음, 있음 | 6.00 (-1.00) | 19.53 (-3.29) | 18.00 (+5.00) | 44.33 (+8.58) |
| ReAct | 있음, 없음 | 10.00 (+3.00) | 31.82 (+9.00) | 26.00 (+13.00) | 51.38 (+15.63) |
| ReAct | 있음, 있음 | 13.00 (+6.00) | 39.73 (+16.91) | 31.00 (+18.00) | 54.05 (+18.30) |
| ReAcTree | 없음, 없음 | 2.00 | 9.32 | 31.00 | 56.82 |
| ReAcTree | 없음, 있음 | 1.00 (-1.00) | 7.45 (-1.87) | 47.00 (+16.00) | 64.72 (+7.90) |
| ReAcTree | 있음, 없음 | 18.00 (+16.00) | 50.20 (+40.88) | 48.00 (+17.00) | 75.13 (+18.31) |
| ReAcTree | 있음, 있음 | 37.00 (+35.00) | 59.63 (+50.31) | 61.00 (+30.00) | 79.58 (+22.76) |

괄호 안은 메모리를 모두 끈 설정 대비 변화량이다. 논문은 세 가지를 결론으로 제시한다.

**두 메모리는 상호 보완적이다.** 어느 하나만 켜도 대체로 성능이 오르지만 둘을 함께 켤 때 가장 높다. EM은 의미적으로 관련된 깨끗한 예시를 공급하고 WM은 과제와 관련된 observation을 유지한다.

**EM이 없으면 모델 크기가 결정적이다.** 7B 모델에서는 WM만 켠 설정이 아무것도 켜지 않은 설정보다 오히려 낮다. EM이 없으면 고정된, 그리고 현재 과제와 어긋날 수 있는 예시 하나만 받는데, 여기에 `recall location of <object>` 스킬까지 추가되면 예시로 뒷받침되지 않는 복잡도가 늘어난다. 추론 여력이 적은 작은 모델이 이를 감당하지 못한다. 72B 모델에서는 같은 상황에서도 ReAcTree의 GSR이 16%p 오른다.

**같은 이유로 두 방법의 우열이 모델 크기에서 뒤집힌다.** EM이 없을 때 7B에서는 ReAcTree(2%)가 ReAct(7%)보다 낮다. 여러 층위가 섞인 복잡한 예시를 작은 모델이 해석하지 못하고, ReAct의 평평한 프롬프트 구조가 따라가기 쉽기 때문이다. 72B에서는 반대로 ReAcTree가 31%로 ReAct의 13%를 18%p 앞서고, WM만 켠 설정에서는 47% 대 18%로 29%p 차이가 난다.

메모리 없이도 72B ReAcTree가 72B ReAct를 18%p 앞선다는 사실이 계층 분해 자체의 가치를 뒷받침하는 근거로 제시된다.

### 4.6 control flow ablation

control flow 종류를 줄여 가며 성능을 측정했다. 설정마다 과제 유형당 수동 trajectory 1건을 새로 만들고 LLaMA 3.1 70B로 episodic memory를 다시 부트스트랩했다.

| 설정 | LLaMA 3.1 8B | LLaMA 3.1 70B | Qwen 2.5 7B | Qwen 2.5 72B |
|---|---|---|---|---|
| all (sequence + fallback + parallel) | 30.00 / 60.77 | 58.00 / 79.27 | 37.00 / 59.63 | 61.00 / 79.58 |
| seq+fb | 28.00 / 58.77 | 58.00 / 78.52 | 38.00 / 54.83 | 61.00 / 79.08 |
| seq | 18.00 / 45.65 | 36.00 / 61.17 | 15.00 / 32.18 | 46.00 / 63.22 |

각 칸은 GSR / SSR (%)이다. all이 대체로 가장 높고 seq+fb가 비슷한 수준을 유지한다. sequence만 남기면 큰 폭으로 하락한다. LLaMA 3.1 70B는 58%에서 36%로, Qwen 2.5 7B는 37%에서 15%로 떨어진다. fallback이 담당하던 실패 복구와 순차 탐색이 사라진 영향이 지배적이며, parallel의 추가 기여는 상대적으로 작다.

### 4.7 계산 비용

LLaMA 3.1 기반 세 설정을 모든 설정이 공통으로 성공한 19개 과제에서 비교했다. 하드웨어는 H100 GPU 2대와 H200 GPU 1대로 동일하게 맞췄다.

| 설정 | 평균 실행 시간 (초) | 평균 decision 수 | GSR / SSR (%) |
|---|---|---|---|
| ReAct+WM (70B) | 109.1 | 60.1 | 33 / 62.15 |
| ReAcTree+WM (70B) | 198.6 | 75.2 | 58 / 79.27 |
| ReAcTree+WM (8B) | 69.9 | 78.0 | 30 / 60.77 |

같은 70B 크기에서 ReAcTree+WM은 실행 시간이 약 1.8배 길지만 GSR이 25%p 높다. 시간 증가의 원인은 decision 한 번의 비용이 아니라 decision 횟수가 늘어난 데 있다. 8B 설정은 70B ReAct+WM과 비슷한 성능을 실행 시간 69.9초에 달성해, 자원이 제한된 환경에서의 효율을 보여준다.

토큰 사용량은 GPU 메모리 수요의 대리 지표로 측정했다.

| 설정 | 최대 입력 토큰 | 평균 입력 토큰 | 평균 출력 토큰 |
|---|---|---|---|
| ReAct+WM (70B) | 8,316 | 5,359.45 (±904.83) | 16.07 (±1.95) |
| ReAcTree+WM (70B) | 6,977 | 5,362.66 (±109.06) | 17.83 (±1.50) |
| ReAcTree+WM (8B) | 7,173 | 5,390.12 (±125.72) | 17.68 (±1.73) |

decision 한 번당 평균 사용량은 세 설정이 비슷하다. 차이는 최댓값과 분산에서 나타난다. ReAct+WM의 최대 입력 토큰이 8,316으로 가장 크고 표준편차도 ±904.83으로 가장 넓다. ReAcTree는 각 agent node가 국소 subgoal만 처리하므로 입력 길이가 좁은 범위 안에 머문다. 최대 GPU 메모리 수요를 예측하기 쉽다는 뜻이다.

### 4.8 실패 사례 분석

Qwen 2.5 72B로 실행한 ReAcTree+WM의 WAH-NL 실패 39건을 네 범주로 분류했다.

| 범주 | 건수 | 하위 범주 | 원인 |
|---|---|---|---|
| Search | 13 | PlanFail 6, SameRm 3, Revisit 2, UnnecExp 2 | partial observability 아래에서의 탐색 한계. 불완전한 탐색, 같은 방 안에서의 국소 반복, 불필요한 재방문 |
| Execution | 12 | Confusion 8, Repeat 2, Skipping 2 | 주로 LLM 환각. 물체 혼동, 무관한 action 반복, 목표 누락 |
| Ambiguous | 10 | 없음 | "음료 2개를 달라"처럼 모호한 지시문이 물체 종류나 위치를 특정하지 못하게 만든다 |
| Expand | 4 | Missing 2, Wrong 2 | 잘못된 subgoal 분해. subgoal이 빠지거나 틀린 것이 생성된다 |

Search가 가장 많다는 점에서 논문은 더 강한 fallback과 탐색 전략이 필요하다고 본다. Ambiguous는 사용자에게 되묻는 확인 대화로, Execution은 환각 억제로 접근해야 한다고 제시한다. Expand는 건수가 가장 적지만 복잡한 상황에서 subgoal을 사후에 고치는 기능이 필요함을 시사한다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

논문이 결론에서 직접 밝힌 한계는 네 가지다.

| 한계 | 내용 |
|---|---|
| LLM 환각 | 물체를 혼동하거나 존재하지 않는 상태를 가정하는 오류가 남아 있다. 실패 39건 중 Execution 12건의 주된 원인이다 |
| 실패 인식 능력 부족 | agent node가 자기 subgoal이 실패했음을 스스로 판정하는 능력이 제한적이다 |
| subgoal 수정 불가 | 잘못 확장된 subgoal을 사후에 고치는 기제가 없다. 한번 만들어진 하위 트리는 그대로 실행된다 |
| 지시문 모호성 처리 부재 | 모호한 지시문에 되묻는 확인 대화가 없어 Ambiguous 10건이 그대로 실패로 남는다 |

향후 과제로는 환각 완화, subgoal 교정, 확인 대화 지원 세 가지를 제시한다.

실험 설계에서 읽히는 추가 제약도 있다. 평가가 두 시뮬레이터에 한정되어 실제 로봇 실험이 없고, primitive action이 이름으로 주어져 저수준 제어와 인식은 다루지 않는다. observation도 시뮬레이터의 정답 상태에서 규칙 기반으로 생성한 텍스트라 실제 센서 입력의 잡음을 반영하지 않는다.

## 6. 관련 연구 (Related Work)

논문은 관련 연구를 세 묶음으로 나눈다.

**LLM 기반 embodied agent.** 초기 연구는 추가 학습 없이 LLM이 중간 수준 action 열을 생성할 수 있음을 보였다(SayCan, Language Models as Zero-Shot Planners, LLM-Planner). 이후 코드 기반 계획 생성(Code as Policies, ProgPrompt), 고전 agent 구조의 확장(BDI agent), 환경 피드백과 도구 결합(Inner Monologue, Socratic Models, Chameleon, HuggingGPT)으로 확장됐다. ReAct는 명시적 중간 추론을 프롬프트로 유도했고 Reflexion은 반복적 자기 개선을 적용했다.

**LLM 기반 계층적 task planning.** AdaPlanner와 DEPS는 2단계 계층을 채택해 전체 계획과 다음 단계 결정을 환경 피드백으로 함께 다듬는다. 고전적 task and motion planning을 LLM 추론으로 안내하는 연구와, Behavior Tree나 hierarchical task network 같은 구조화된 형식으로 action을 조직하는 연구도 있다. ReAcTree가 이들과 다른 점은 미리 정한 구조나 도메인 전용 루틴에 묶이지 않고 실행 중에 동적으로 subgoal을 확장한다는 것이다.

**LLM 기반 트리 탐색 planning.** Self-Consistency, Tree of Thoughts, Graph of Thoughts, RAP 계열이 여러 추론 경로를 펼쳐 비교한다. agentic planning으로 확장한 사례로 LLM-MCTS(Monte Carlo Tree Search), ToolChain*(A* 탐색), Tree-Planner(계획 경로를 독립 샘플링해 action tree로 병합)가 있다. 이들은 시뮬레이터에서 이전 상태로 되돌릴 수 있다고 가정한다. ReAcTree는 탐색 기반 탐사를 agent 사이의 조율로 대체해 이 가정을 없앤다.

ReAcTree는 Behavior Tree의 제어 구조를 빌리되 트리를 미리 설계하지 않고 LLM agent가 실행 중에 키우게 만든 방법이라는 점에서 세 묶음 모두와 구분된다.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| agent tree | ReAcTree가 실행 중에 만드는 트리. agent node와 control flow node가 번갈아 놓이며, primitive action이 아니라 subgoal 공간에서 자란다 |
| agent node | subgoal 하나를 맡은 LLM 기반 planner. reasoning, acting, expanding 중 하나를 매 시점 고른다 |
| control flow node | Behavior Tree에서 빌려온 조율 node. sequence, fallback, parallel 세 종류가 자식 agent node의 실행 순서와 성패 전파를 정한다 |
| expand action | agent node가 현재 subgoal이 너무 복잡하다고 판단할 때 내는 action. control flow 종류와 새 subgoal 목록을 함께 생성한다 |
| episodic memory (EM) | 성공한 실행에 참여한 agent node들의 subgoal 단위 trajectory 저장소. 문장 임베딩 코사인 유사도로 in-context 예시를 검색한다 |
| working memory (WM) | 한 번의 실행 안에서 모든 agent node가 공유하는 칠판. 이동 가능 물체의 최신 위치를 담고 `recall location of` 스킬로 조회한다 |
| decision cap | 트리 전체에서 누적되는 LLM 호출 상한. WAH-NL은 200회, ALFRED은 100회다 |
| GSR / SSR | goal success rate는 전체 목표를 달성한 과제의 비율, subgoal success rate는 완료한 subgoal의 비율이다 |
| WAH-NL | Watch-And-Help를 자연어 지시문으로 확장한 데이터셋. VirtualHome 시뮬레이터에서 여러 방에 걸친 long-horizon 가사 과제를 다룬다 |
| LoTa-Bench | 언어 기반 task planner를 평가하는 벤치마크. 이 논문은 여기에 partial observability를 추가해 사용한다 |

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 2 | agent tree 생성 예시와 agent node 3의 trajectory, 두 메모리 연결 | caption-region | ★ wiki 권장 (architecture) |
| fig02 | 3 | agent node 실행과 control flow node 실행 구조 | caption-region | ★ wiki 권장 (method) |
| fig03 | 6 | WAH-NL 성공 사례의 단계별 화면과 트리 구조 | caption-region | ★ wiki 권장 (qualitative) |
| fig04 | 8 | 실패 39건의 네 범주와 하위 범주 분포 | caption-region | ★ wiki 권장 (analysis) |
| fig05 | 17 | WAH-NL에서 ReAct+WM이 실패한 사례 | caption-region | (부록, 선택) |
| fig06 | 23 | ALFRED에서 ReAcTree+WM이 성공한 사례 | caption-region | (부록, 선택) |
| fig07 | 24 | ALFRED에서 ReAct+WM이 실패한 사례 | caption-region | (부록, 선택) |
| tab01 | 5 | WAH-NL 주요 결과. baseline 5종과 제안 2종, LLM 7개 | table-region | ★ wiki 권장 (result) |
| tab02 | 6 | ALFRED valid-seen과 valid-unseen GSR 비교 | table-region | ★ wiki 권장 (result) |
| tab03 | 7 | 메모리 ablation 네 조합 | table-region | ★ wiki 권장 (ablation) |
| tab04 | 7 | control flow ablation | table-region | ★ wiki 권장 (ablation) |
| tab05 | 8 | 실행 시간과 decision 수 비교 | table-region | (본문 표로 대체 가능) |
| tab06 | 8 | decision당 토큰 사용량 | table-region | (본문 표로 대체 가능) |
| tab07 | 12 | WAH-NL 테스트 과제 지시문 수정 내역 | table-region | (부록, 선택) |
| tab08 | 13 | VirtualHome action-observation 쌍 예시 | table-region | (부록, 선택) |
| tab09 | 13 | AI2THOR action-observation 쌍 예시 | table-region | (부록, 선택) |
| tab10 | 14 | 실험에 사용한 언어 모델 목록 | table-region | (부록, 선택) |
