---
title: "The Agent Loop: A Survey of Control Strategies, Skills, and Harnesses for LLM Agents"
type: paper
year: 2026
category: agents
raw_path: raw/papers/lee-2026-the-agent-loop-a-survey.pdf
raw_filename: "lee-2026-the-agent-loop-a-survey.pdf"
source_collection: external
source: lee-2026-the-agent-loop-a-survey.md
authors: "Jungseob Lee (Korea University), Chanjun Park (Soongsil University, 교신저자)"
url: "https://github.com/js-lee-AI/awesome-agent-loop-papers"
tags: [agents, agent-loop, harness, skills, agentic-rl, context-engineering, evaluation, prompt-injection, survey, react, reflexion, alfworld]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/lee-2026-the-agent-loop-a-survey/fig01.png
    raw: raw/papers/lee-2026-the-agent-loop-a-survey-figures/fig01.png
    caption: "arXiv 월간 논문 수로 본 두 방향 — 위쪽은 externalize(harness·verification·스킬), 아래쪽은 internalize(trained loop·agentic RL). 가운데 hand-designed agent loop 띠는 얇게 유지된다"
    page: 4
    bbox_norm: [0.0999, 0.0759, 0.9001, 0.3741]
    strategy: manual
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/lee-2026-the-agent-loop-a-survey/fig02.png
    raw: raw/papers/lee-2026-the-agent-loop-a-survey-figures/fig02.png
    caption: "perceive–reason–act 순환과 이 서베이가 고정하는 세 용어의 위치 — harness(점선)가 루프를 돌리고, policy는 reason 단계에서 호출되며, 스킬 라이브러리는 컨텍스트 조립 지점에서만 들어온다"
    page: 6
    bbox_norm: [0.2444, 0.0843, 0.7556, 0.2921]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/lee-2026-the-agent-loop-a-survey/fig03.png
    raw: raw/papers/lee-2026-the-agent-loop-a-survey-figures/fig03.png
    caption: "서베이 전체 지도 — 7개 기둥(loop paradigm·mechanics·trained loop·스킬·harness·evaluation·safety)과 각 기둥 하단의 반증 결과 띠"
    page: 9
    bbox_norm: [0.1179, 0.0842, 0.8772, 0.8558]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/lee-2026-the-agent-loop-a-survey/fig04.png
    raw: raw/papers/lee-2026-the-agent-loop-a-survey-figures/fig04.png
    caption: "loop zoo — ReAct·ReWOO·Reflexion·LATS·trained loop·adaptive/async 여섯 가지 루프 모양을 하나의 공통 기호로 그린 비교도"
    page: 11
    bbox_norm: [0.1186, 0.0964, 0.8792, 0.3928]
    strategy: caption-region
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/lee-2026-the-agent-loop-a-survey/fig05.png
    raw: raw/papers/lee-2026-the-agent-loop-a-survey-figures/fig05.png
    caption: "E3 예산 스윕 — ReAct step cap K는 오목하게 오르고 Reflexion retry budget R은 R≈2에서 평평해진다. 어느 쪽도 큰 상수를 보상하지 않는다"
    page: 15
    bbox_norm: [0.109, 0.0838, 0.891, 0.3029]
    strategy: caption-region
    curated: true
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/lee-2026-the-agent-loop-a-survey/fig06.png
    raw: raw/papers/lee-2026-the-agent-loop-a-survey-figures/fig06.png
    caption: "스킬 수명주기 7단계(acquire→represent→store→retrieve→select→compose→govern). 각 단계 위에 대표 시스템, 아래에 그 단계의 실패 모드, 하단 점선 레인에 공급망 공격 지점"
    page: 20
    bbox_norm: [0.1244, 0.0841, 0.8812, 0.3253]
    strategy: caption-region
    curated: true
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/lee-2026-the-agent-loop-a-survey/fig07.png
    raw: raw/papers/lee-2026-the-agent-loop-a-survey-figures/fig07.png
    caption: "E2 비용–정확도 프런티어 — ReWOO는 싸지만 20%에서 막히고, Reflexion은 정확하지만 비싸며, ReAct가 효율 프런티어에 놓인다"
    page: 29
    bbox_norm: [0.1394, 0.0838, 0.8606, 0.3491]
    strategy: caption-region
    curated: true
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/lee-2026-the-agent-loop-a-survey/fig08.png
    raw: raw/papers/lee-2026-the-agent-loop-a-survey-figures/fig08.png
    caption: "성공 1건당 토큰으로 다시 그린 같은 실험 — 시도당 최저가 루프와 성공당 최저가 루프가 다르고, 14B에서 순위가 뒤집힌다"
    page: 30
    bbox_norm: [0.1623, 0.2823, 0.8377, 0.5385]
    strategy: caption-region
    curated: false
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/lee-2026-the-agent-loop-a-survey/fig09.png
    raw: raw/papers/lee-2026-the-agent-loop-a-survey-figures/fig09.png
    caption: "E5 스킬 오염 실험 3패널 — (a) 정상 스킬 5개와 경쟁하면 오염 스킬이 무력화되고, (b) 경쟁을 없애면 hijack이 32B에서 62%까지 오르며, (c) 같은 라이브러리가 정상일 때는 실제로 사용된다"
    page: 36
    bbox_norm: [0.0899, 0.0759, 0.9001, 0.3251]
    strategy: manual
    curated: true
  - id: tab01
    label: Table 1
    kind: table
    file: assets/lee-2026-the-agent-loop-a-survey/tab01.png
    raw: raw/papers/lee-2026-the-agent-loop-a-survey-figures/tab01.png
    caption: "기존 서베이 10편이 7개 축을 얼마나 다뤘는지 — loop paradigm·mechanics·trained loop·harness 축이 가장 비어 있다"
    page: 10
    bbox_norm: [0.1729, 0.1624, 0.8271, 0.4023]
    strategy: table-region
    curated: false
  - id: tab02
    label: Table 2
    kind: table
    file: assets/lee-2026-the-agent-loop-a-survey/tab02.png
    raw: raw/papers/lee-2026-the-agent-loop-a-survey-figures/tab02.png
    caption: "5개 loop paradigm을 설계 공간으로 정리 — 각 topology의 전제, 비용, 전제가 깨질 때의 실패 모드"
    page: 10
    bbox_norm: [0.1399, 0.4679, 0.8401, 0.7021]
    strategy: manual
    curated: true
  - id: tab03
    label: Table 3
    kind: table
    file: assets/lee-2026-the-agent-loop-a-survey/tab03.png
    raw: raw/papers/lee-2026-the-agent-loop-a-survey-figures/tab03.png
    caption: "4개 loop 제어 메커니즘(termination·verification·컨텍스트 관리·recovery)의 자체 생성 방식 대 외부 근거 방식, 그리고 남는 잔여 실패"
    page: 14
    bbox_norm: [0.1736, 0.1483, 0.8268, 0.3368]
    strategy: table-region
    curated: true
  - id: tab04
    label: Table 4
    kind: table
    file: assets/lee-2026-the-agent-loop-a-survey/tab04.png
    raw: raw/papers/lee-2026-the-agent-loop-a-survey-figures/tab04.png
    caption: "실무를 규정하는 오픈소스 프레임워크·코딩 harness 18종과 GitHub star 수 (2026-07-10 기준)"
    page: 27
    bbox_norm: [0.1772, 0.2481, 0.8253, 0.8057]
    strategy: table-region
    curated: false
  - id: tab05
    label: Table 5
    kind: table
    file: assets/lee-2026-the-agent-loop-a-survey/tab05.png
    raw: raw/papers/lee-2026-the-agent-loop-a-survey-figures/tab05.png
    caption: "스킬 라이브러리·MCP 레지스트리·프롬프트 코퍼스 9종. 상위 항목 대부분이 논문 없는 저장소다"
    page: 28
    bbox_norm: [0.1254, 0.1483, 0.8772, 0.4351]
    strategy: table-region
    curated: false
  - id: tab06
    label: Table 6
    kind: table
    file: assets/lee-2026-the-agent-loop-a-survey/tab06.png
    raw: raw/papers/lee-2026-the-agent-loop-a-survey-figures/tab06.png
    caption: "E2 결과 — ALFWorld 50 task에서 ReAct·ReWOO·Reflexion × Qwen2.5-Instruct 5개 규모의 성공률과 task당 평균 토큰"
    page: 30
    bbox_norm: [0.2849, 0.1559, 0.7251, 0.2791]
    strategy: manual
    curated: true
  - id: tab07
    label: Table 7
    kind: table
    file: assets/lee-2026-the-agent-loop-a-survey/tab07.png
    raw: raw/papers/lee-2026-the-agent-loop-a-survey-figures/tab07.png
    caption: "E4 스킬 ablation — 7B는 매칭 스킬로 +12점 오르고 step이 줄지만, 14B는 전체 라이브러리를 넣으면 오히려 4점 떨어진다"
    page: 31
    bbox_norm: [0.2429, 0.1629, 0.7501, 0.3031]
    strategy: manual
    curated: true
  - id: tab08
    label: Table 8
    kind: table
    file: assets/lee-2026-the-agent-loop-a-survey/tab08.png
    raw: raw/papers/lee-2026-the-agent-loop-a-survey-figures/tab08.png
    caption: "루프 방어의 4개 층(model-level·system-level·런타임 모니터·공급망)과 각 층이 실제로 보장하는 것, 다음 층에 넘기는 잔여 위험"
    page: 33
    bbox_norm: [0.1638, 0.1341, 0.8387, 0.3357]
    strategy: table-region
    curated: true
  - id: tab09
    label: Table 9
    kind: table
    file: assets/lee-2026-the-agent-loop-a-survey/tab09.png
    raw: raw/papers/lee-2026-the-agent-loop-a-survey-figures/tab09.png
    caption: "E5 스킬 오염 수치 — 위는 정상 스킬과 경쟁하는 현실적 배치(put-ASR ≤1/45), 아래는 경쟁을 없앤 상한 실험(31~62%)"
    page: 35
    bbox_norm: [0.2082, 0.2335, 0.7919, 0.472]
    strategy: table-region
    curated: true
---

## 요약 (Summary)

LLM 에이전트의 분석 단위를 모델에서 그 모델이 도는 agent loop로 옮겨 정리한 서베이다. agent loop는 관측하고 판단하고 행동하고 다시 관측하기를 종료 조건까지 반복하는 제어 순환을 말한다. 실무가 신경 쓰는 비용·신뢰성·안전을 결정하는 쪽은 모델이 아니라 이 루프라는 게 출발 전제다. 비용은 매 step·매 반성·매 rollout이 토큰으로 청구되니 루프의 성질이고 신뢰성도 step당 오류 확률이 trajectory를 따라 누적되므로 루프의 성질이다. 안전 역시 마찬가지다. 주입된 명령을 실제 부작용으로 만드는 주체가 루프이기 때문이다.

관통하는 주장은 이렇다. 루프는 지금 가중치 안으로 내재화되는 방향과 스킬·harness로 외부화되는 방향으로 동시에 당겨지고 있다. 둘은 경쟁 관계가 아니다. 부분적으로 서로 바꿔 넣을 수 있는 같은 제어 구조의 두 구현이다. 그래서 질문도 "어느 쪽이 이기나"에서 "루프를 누가 소유하는가"로 옮겨간다.

![[assets/lee-2026-the-agent-loop-a-survey/fig01.png]]
*Figure 1: arXiv 월간 논문 수로 읽은 두 방향. 위쪽은 externalize(harness·verification·스킬), 아래쪽은 internalize(trained loop·agentic RL)이고 가운데 hand-designed agent loop 띠는 얇게 유지된다 (Lee 2026, p.4)*

서베이 대부분이 긍정 결과만 모으는 데 비해 이 논문은 반증 결과를 같은 비중으로 다룬다. 저자들이 직접 돌린 소규모 통제 실험 네 건(E2~E5)으로 그 반증을 실측한 점도 다르다.

## 주요 기여 (Key Contributions)

세 용어를 형식적으로 고정하는 데서 시작한다. loop는 추상 제어 구조, harness는 그 구조를 실제로 구현한 코드와 인프라, 스킬은 에피소드를 건너 살아남는 이름 붙은 재사용 절차다. 여기서 "에이전트의 역량은 모델·harness·스킬이 함께 만든다"는 명제가 따라 나온다. 모델 대 scaffold 귀속 문제가 이 명제로 눈에 보이게 된다.

![[assets/lee-2026-the-agent-loop-a-survey/fig02.png]]
*Figure 2: perceive–reason–act 순환과 세 용어의 위치. harness(점선)가 루프를 돌리고 policy는 reason 단계에서 호출되며 스킬 라이브러리는 컨텍스트 조립 지점에서만 들어온다 (Lee 2026, p.6)*

나머지 기여는 넷이다. loop-first taxonomy는 프레임워크 대신 제어 전략으로 문헌을 나눈다. 스킬은 tool use나 memory 항목에 녹이지 않고 acquire부터 govern까지 7단계 수명주기로 펼친 1급 주제가 된다. harness도 연구 대상으로 세운다. 모델을 고정하고 주변 코드만 바꿔도 벤치마크 헤드라인이 수십 점 움직이므로 2026년의 harness는 신뢰성의 1차 설계면이라는 주장이다. 마지막으로 ALFWorld 50 task 위에서 loop 모양·예산·스킬 라이브러리·오염 스킬을 각각 하나씩만 바꿔 측정한 통제 실험 네 건을 붙였다.

![[assets/lee-2026-the-agent-loop-a-survey/fig03.png]]
*Figure 3: 서베이 전체 지도. 7개 기둥(loop paradigm·mechanics·trained loop·스킬·harness·evaluation·safety) 아래마다 그 기둥의 반증 결과가 점선 띠로 달려 있다 (Lee 2026, p.9)*

## 방법론 및 아키텍처 (Methodology and Architecture)

### 루프의 몸통 — Algorithm 1

harness는 모델을 감싸 컨텍스트를 조립하고 도구·환경 접근을 중개하며 멈출 시점을 정하는 코드다. 모델의 forward pass가 아닌 모든 일은 harness에서 일어난다. policy는 매 turn observation을 받아 다음 action을 정하는 함수로, 여기서는 모델 가중치를 가리킨다.

```
input: goal g, policy π, skill library S, harness H
ctx ← H.init(g)
repeat
    o   ← H.perceive()                  # 환경·도구에서 관측
    ctx ← H.assemble(ctx, o, S)         # 스킬을 검색해 컨텍스트에 끼워 넣음
    a   ← π(ctx)                        # reason — policy 호출 1회
    if H.stop(a) then break             # 멈춤 게이트는 harness 소유
    r   ← H.act(a)                      # 환경·도구에 실행
    ctx ← H.observe(ctx, a, r)
return H.finalize(ctx)
```

policy는 turn당 정확히 한 번 불리고 나머지는 전부 harness 몫이다. 스킬 라이브러리는 컨텍스트 조립 지점에서만 개입한다. 루프를 고정한 채 그것이 어디 사는지만 바꾸는 이 구도가 내재화와 외부화를 같은 저울에 올리는 장치다.

### 다섯 가지 loop paradigm

루프 모양은 환경에 대한 베팅이다. 더 복잡한 topology는 각자의 전제가 성립할 때만 값을 하고 전제가 깨지면 토큰·지연·새 실패 모드로 청구된다.

![[assets/lee-2026-the-agent-loop-a-survey/fig04.png]]
*Figure 4: loop zoo. ReAct·ReWOO·Reflexion·LATS·trained loop·adaptive/async 여섯 가지 루프 모양을 하나의 공통 기호로 그렸다 (Lee 2026, p.11)*

- **Interleaved**(ReAct). 모든 action 앞에 추론을 끼워 넣어 가장 최신 관측에 판단을 붙들어 맨다. 다만 ReAct 자신의 ablation에서 HotpotQA·Fever 같은 지식 추론 과제는 관측이 무의미할 때 chain-of-thought 단독보다 못했다. 이후 분석은 ReAct의 이득이 interleaving이 아니라 예시–질의 유사도와 근사 retrieval을 따라간다고 지적한다.
- **Plan-then-execute**(ReWOO·LLMCompiler). 관측 전에 계획을 확정하고 재관측 없이 실행한다. 프롬프트에서 중간 관측이 빠지니 토큰이 몇 배 줄고 계획이 의존 구조를 드러내므로 DAG로 컴파일해 병렬 호출도 가능하다. 대가는 중간 반응성 상실이다.
- **Reflective**(Reflexion·Self-Refine·CRITIC). 실패를 언어 반성으로 바꿔 저장하고 에피소드를 통째로 재시도한다.
- **Search-in-environment**(LATS·Agent Q·ToT). 단일 trajectory를 버리고 분기·평가·되돌리기를 한다. 행동이 싸고 되돌릴 수 있으며 value function을 믿을 수 있을 때만 성립한다.
- **Adaptive/hybrid + async**. 어떤 모양을 돌릴지 런타임에 고른다. 어려움이 "루프 고르기"에서 "고르는 신호를 믿기"로 옮겨갈 뿐이라는 단서가 붙는다.

![[assets/lee-2026-the-agent-loop-a-survey/tab02.png]]
*Table 2: 다섯 paradigm을 설계 공간으로 정리한 표. 각 topology의 전제, 비용, 전제가 깨질 때의 실패 모드 (Lee 2026, p.10)*

### 루프를 지배하는 네 가지 mechanics

모양과 무관하게 어떤 루프에나 붙는 제어 장치를 넷으로 본다. 관통하는 긴장은 하나다. 멈춤·검증·복구 신호를 모델이 스스로 만들면 싸고 확장되지만 믿을 수 없고 게이밍당한다. 밖에서 근거를 대면 믿을 만한 대신 비용·지연·잔여 취약성을 문다.

termination은 고정 step 수나 정적 토큰 상한 대신 budget forcing, 확신도 기반 조기 종료, 난이도별 compute 배분으로 옮겨가고 있다. verification 쪽에서는 자체 비판이 근본적으로 불안정하다. 외부 신호 없는 자기 교정은 맞은 답을 자주 망가뜨리고 LLM은 자기 후보 출력들을 판별하는 일을 생성하는 일보다 더 잘하지 못한다. 컨텍스트 관리는 어느 쪽으로 가도 잃는다. 다 넣으면 context rot가 오고 compaction·eviction은 정작 나중에 필요한 사실을 조용히 지운다. recovery는 실제로 존재하는 게 거의 없다. 주류 코딩 에이전트는 잘해야 파일 단위 stash를 하고 프로세스 상태는 버린다.

![[assets/lee-2026-the-agent-loop-a-survey/tab03.png]]
*Table 3: 네 mechanics의 자체 생성 방식과 외부 근거 방식, 외부화해도 남는 잔여 실패 (Lee 2026, p.14)*

### 루프를 가중치로 흡수하는 trained loop

결과 보상만 주는 multi-turn RL로 루프 제어를 policy 안에 넣는 방향이다. 검색 시점을 배우는 Search-R1, 코드 인터프리터 호출을 배우는 ReTool, 실제 웹 검색에 붙인 DeepResearcher, 소프트웨어 진화 데이터에 규칙 기반 유사도 reward를 쓴 SWE-RL이 대표다. 결과에만 붙는 reward는 step별 신호를 못 주고 프록시로서 게이밍 가능하다. 긴 sparse-reward trajectory의 credit assignment가 불안정해 multi-turn RL이 자기 강화적 반복으로 좁아지는 Echo Trap이 생긴다. StarPO-S 같은 안정화는 붕괴를 늦출 뿐 없애지 못한다. 병목은 알고리즘이 아니라 reward를 대량으로 뱉어 줄 실행 가능한 환경 쪽에 있다.

가장 무거운 반증은 RLVR가 pass@1 샘플링 효율은 올리지만 추론 경계 자체는 넓히지 못한다는 분석이다. 큰 pass@k에서는 base 모델이 RL로 학습된 후손을 추월한다. 학습이 base가 이미 찾을 수 있던 해에 확률 질량을 몰아줬을 뿐이라는 뜻이다.

### 스킬 수명주기

스킬은 이름이 붙고 저장되고 검색되며 조합되는 절차 지식이다. Voyager의 스킬은 실행 가능한 Python 함수이고 Anthropic의 Agent Skills는 Markdown 지시문·스크립트·리소스를 담은 폴더이며 경험 학습기의 스킬은 성공·실패 trajectory를 비교해 뽑은 자연어 통찰이다. 코드·문서·메모리라는 서로 다른 자료형을 하나로 합칠 방법은 없고 남는 공통점은 기능적이다.

![[assets/lee-2026-the-agent-loop-a-survey/fig06.png]]
*Figure 6: 스킬 수명주기 7단계(acquire→represent→store→retrieve→select→compose→govern). 각 단계 위에 대표 시스템, 아래에 그 단계의 실패 모드, 하단 점선 레인에 공급망 공격 지점이 놓인다 (Lee 2026, p.20)*

평평한 라이브러리는 규모를 감당하지 못하고 무관한 스킬을 더하면 성능이 떨어진다. retrieval은 hard negative에 취약해서 병목이 recall에서 incorporation으로 옮겨간다. 올바른 스킬을 찾아 왔는데도 임베딩이 의미상 구분되지 않아 엉뚱한 걸 부르고, 여러 스킬 본문을 한꺼번에 밀어 넣으면 프롬프트 과부하와 절차 혼동이 생긴다. `SKILL.md`의 progressive disclosure는 front-matter만 retrieval 경쟁에 노출하는 방식으로 이 부담을 던다. 위의 간섭·오선택 실패는 정확히 front-matter가 본문끼리를 구별해 주지 못해 생긴다.

배포 가능한 스킬은 그대로 공급망 공격면이 된다. 서드파티 메타데이터를 자동으로 신뢰하는 discovery 프로토콜에서는 도구 설명에 숨긴 악성 지시가 시스템이 쓴 것처럼 모델에 닿는다. 지시를 더 잘 따르는 모델일수록 더 취약했고 안전 튜닝은 아주 일부만 거부했다. 에이전트가 스스로 쌓은 메모리도 표적이 되어, 검색 메모리의 1% 미만을 오염시켜도 공격 성공률이 80%를 넘는다.

## 결과 (Results)

### E2 — 루프 모양의 비용–정확도 프런티어

ALFWorld `valid_unseen` 50 task, 최대 30 step, greedy decoding, harness·프롬프트·과제·step 예산을 고정하고 loop 모양과 base 모델만 바꿨다. 모델은 Qwen2.5-Instruct 1.5B~32B.

![[assets/lee-2026-the-agent-loop-a-survey/tab06.png]]
*Table 6: E2 결과. 세 루프 × 다섯 규모의 성공률과 task당 평균 토큰 (Lee 2026, p.30)*

![[assets/lee-2026-the-agent-loop-a-survey/fig07.png]]
*Figure 7: 같은 수치를 비용–정확도 평면에 놓은 그림. ReWOO는 싸지만 막히고 Reflexion은 정확하지만 비싸며 ReAct가 효율 프런티어에 놓인다 (Lee 2026, p.29)*

지배하는 루프는 없다. ReWOO는 task당 약 130토큰으로 압도적으로 싸지만 관측 없이 계획하는 모양 탓에 성공률이 20% 근처에서 막힌다. Reflexion은 3B 이상 모든 규모에서 최고 정확도(14B 76%)를 내지만 토큰으로 값을 치른다. ReAct는 14B에서 토큰 466으로 70%를 내며 효율 프런티어에 놓인다. 50 task의 95% 이항 구간이 ±13점쯤이므로 큰 규모의 6점·2점 차이는 순위로 읽을 수 없다. 프런티어 위 세 자리로 봐야 한다.

1.5B에서는 모든 루프가 2%(50개 중 1개)로 무너지고 특히 Reflexion은 그 2%에 4477토큰을 쓴다. 자기 비판을 실행에 옮길 힘이 없는 모델이 고칠 수 없는 실패를 계속 되씹기 때문이다.

성공 1건당 토큰으로 다시 charge하면 순위가 뒤집힌다. ReWOO는 시도당으로는 모든 규모에서 가장 싸지만 성공률이 12~20% 대를 못 벗어나므로, ReAct 신뢰성이 70%를 넘는 14B부터는 ReAct가 성공당 최저가가 된다(약 0.65k 대 ReWOO 1.1k).

### E3 — 예산 스윕

![[assets/lee-2026-the-agent-loop-a-survey/fig05.png]]
*Figure 5: ReAct step cap K는 오목하게 오르고 Reflexion retry budget R은 R≈2에서 평평해진다. 오른쪽은 두 손잡이를 비용 공간에 함께 놓은 그림 (Lee 2026, p.15)*

K를 올리면 성공률은 계속 오르지만 오목하다. 7B는 8→56%, 14B는 10→78%, 32B는 14→80%로 오르는데 step당 한계 이득은 낮은 K에서 약 2점이던 것이 K=50에서 1점 아래로 떨어지고 토큰은 선형으로 는다. R은 다르게 움직여서 평평해진다. 7B는 R=2와 R=3 모두 68%인데 task당 토큰은 1420에서 1829로 오른다. 여기서 나오는 결론은 권장 상수가 아니라 상수 자체에 대한 반박이다. 옳은 예산은 입력에 따라 달라진다.

### E4 — 스킬 ablation

분리된 split(`valid_seen`)에서 모델 자신의 성공한 ReAct trajectory로부터 스킬 라이브러리를 사람 라벨 없이 뽑아낸 뒤, base 모델을 고정한 채 세 조건을 비교했다.

![[assets/lee-2026-the-agent-loop-a-survey/tab07.png]]
*Table 7: E4 결과. 7B는 매칭 스킬로 +12점 오르고 step이 줄지만 14B는 전체 라이브러리를 넣으면 오히려 4점 떨어진다 (Lee 2026, p.31)*

여유가 있는 7B에서는 과제에 맞는 스킬 하나가 성공률을 38%에서 50%로 올리면서 환경 step(23.1→19.3)과 완성 토큰(635→550)을 동시에 줄인다. 천장에 가까운 14B에서는 매칭 스킬이 성공률을 전혀 바꾸지 못하고 전체 라이브러리는 70%를 66%로 떨어뜨린다. 병목이 recall이 아니라 incorporation이라는 앞 절의 진단이 그대로 재현된다. 비용이 준다는 주장은 step과 완성 토큰에만 해당한다. 주입한 라이브러리는 task당 15~24k의 프롬프트 토큰 추가금을 만든다.

### E5 — 스킬 오염

E4의 같은 라이브러리를 공격면으로 바꿨다. 악성 스킬이 들어가는 자리는 시스템이 쓴 스킬 메타데이터, 즉 프롬프트에서 가장 신뢰받는 위치다. 사용자 콘텐츠 자리가 아니다.

![[assets/lee-2026-the-agent-loop-a-survey/fig09.png]]
*Figure 9: (a) 정상 스킬 5개와 경쟁하면 오염 스킬이 무력화되고, (b) 경쟁을 없애면 hijack이 32B에서 62%까지 오르며, (c) 같은 라이브러리가 정상일 때는 실제로 사용된다 (Lee 2026, p.36)*

![[assets/lee-2026-the-agent-loop-a-survey/tab09.png]]
*Table 9: E5 수치. 위는 정상 스킬과 경쟁하는 현실적 배치, 아래는 경쟁을 없앤 상한 실험 (Lee 2026, p.35)*

정상적이고 과제에 맞는 스킬 5개와 나란히 놓인 배치에서는 충돌하는 오염 스킬이 확실히 무력화된다. redirect·additive 어느 쪽도 1/45를 넘지 않고 32B는 모든 칸에서 0/45다. 정상 과제 성공률은 유지될 뿐 아니라 규모에 따라 올라가므로(ReAct 53/69/82%) 못 움직여서 안 당한 게 아니다.

그 보호가 무엇에 기대고 있었는지는 경쟁을 없애면 드러난다. 정상 스킬 5개를 빼고 redirect 오염만 유일한 스킬로 제공하자 hijack이 7B 14/45(31%), 14B 15/45(33%), 32B 28/45(62%)로 뛴다. 지시를 가장 충실히 따르는 32B가 가장 취약해지고 공격 아래 과제 성공률도 82→22%로 무너진다. 두 조건의 유일한 차이가 경쟁하는 정상 스킬의 제거이므로, 현실 배치에서의 보호는 목표에 붙들린 거부가 아니라 정상 컨텍스트가 오염을 희석하고 닻을 내려 준 결과다. 다만 이 공격은 목표와 정면으로 충돌하도록 설계돼 hijack이 성공률 붕괴로 스스로 드러난다. 과제와 무관하게 조용히 곁다리 부작용을 일으키는 유형은 E5가 다루지 않았다고 저자들이 명시한다.

### 평가와 안전에 대한 주장

agent loop 점수를 단일 스칼라로 요약하면 안 된다. 튜플이 맞는 단위다. 공개되었거나 ablation 가능한 harness, 비용–정확도 파레토 위치, pass^k 신뢰성 분포, 타당성 감사가 그 성분이다. frontier 모델을 고정하고 harness만 바꿔도 모델을 갈아 끼울 때보다 큰 성능 변동과 순위 역전이 나온다. 가장 많이 인용되는 벤치마크의 진전 일부는 추론이 아니라 암기여서 학습 분포 밖 저장소에서는 최고 점수가 급락한다.

![[assets/lee-2026-the-agent-loop-a-survey/tab08.png]]
*Table 8: 루프 방어의 네 층과 각 층이 실제로 보장하는 것, 다음 층에 넘기는 잔여 위험 (Lee 2026, p.33)*

안전 쪽 결론은 어느 한 층도 혼자 루프를 지키지 못한다는 것이다. model-level 강건성은 주입을 줄이되 없애지 못한다. capability·least-privilege·격리 같은 결정론적 통제는 완전히 오염된 모델 앞에서도 버티지만 정책 언어가 표현할 수 있는 것까지만 막으며 측정 가능한 효용세를 문다. 런타임 모니터는 폭발 반경을 줄이는 대신 자기가 감시하는 그 주입 가능성을 그대로 물려받는다.

## 한계 (Limitations)

E2~E5는 모두 벤치마크 하나(ALFWorld), 모델 계열 하나(Qwen2.5-Instruct), 50 task, greedy decoding이다. 50 task의 이항 구간이 ±13점쯤이라 대부분의 차이에서는 임계값을 못 믿고 방향만 신뢰할 수 있다. E3의 step 스윕은 ALFWorld의 자연스러운 15~25 step 지평 위쪽으로는 구조상 바뀔 게 없다. E4는 같은 환경 안의 재사용이라 스킬의 본래 약속인 환경 간 전이를 재지 못한다. E5의 상한 조건은 ReAct 한 가지 루프로만 쓸었다.

열린 문제로는 루프의 소유권과 책임 소재, 장기 지평의 신뢰성(pass^k가 대략 p^k로 감쇠하므로 pass@1 60%인 에이전트도 pass^8에서 25% 아래로 무너질 수 있다), 스킬 거버넌스의 공백, 평가 표준화, 비용과 안전이 자율성에 함께 묶여 커지는 공진화를 든다.

## 관련 페이지 (Related Pages)

- [[agents/lin-2026-harness-updating-is-not-harness-benefit]] — harness self-evolution을 evolver와 agent 두 능력으로 쪼갠 통제 실험. 이 서베이 §7의 harness 논지를 한 단계 더 깊이 검증한다
- [[agents/cemri-2025-why-do-multi-agent-llm-systems]] — 이 서베이가 멀티에이전트 회의론의 근거로 인용하는 MAST 실패 분류
- [[agents/dennis-2026-compiling-agentic-workflows-into-llm]] — §5 loop internalization을 극단까지 밀어 workflow를 가중치로 컴파일한 사례
- [[agents/zhou-2026-are-we-ready-for-an]] — §4.4 컨텍스트 관리의 no-free-lunch를 12개 메모리 시스템 벤치마크로 실측한 짝 자료
- [[agents/bai-2026-how-do-ai-agents-spend]] — §8.4 per-loop cost accounting을 SWE-bench 토큰 경제로 확장한 연구
- [[agents/yang-2026-skillopt-executive-strategy-for]] — §6 스킬을 학습 가능한 상태로 보고 text-space optimizer로 훈련하는 접근
- [[agents/zhao-2026-generative-skill-composition-for-llm]] — §6.3 retrieve–select–compose 병목을 정면으로 다루는 후속 연구
- [[agents/anthropic-2025-effective-context-engineering-for-ai]] — §4.4·§7.4가 근거로 삼는 context engineering 원전
- [[agents/anthropic-2025-equipping-agents-for-the-real]] — §6이 산업 표준으로 지목하는 Agent Skills·SKILL.md 발표
- [[agents/osmani-2026-loop-engineering]] — 같은 전환을 실무 관점에서 loop engineering으로 부르는 에세이
- [[evaluations/bandi-2026-mcp-atlas-a-large-scale-benchmark-for]] — agent loop의 정지 조건을 실측한 벤치마크. 상위 모델의 조기 종료가 최대 42.8%로 나타나 loop 설계 문제를 수치로 보여준다
