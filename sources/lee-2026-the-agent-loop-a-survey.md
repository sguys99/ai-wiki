---
title: "The Agent Loop: A Survey of Control Strategies, Skills, and Harnesses for LLM Agents"
type: paper
year: 2026
category: agents
raw_path: /home/sguys99/project/ai-wiki/raw/papers/lee-2026-the-agent-loop-a-survey.pdf
raw_filename: "lee-2026-the-agent-loop-a-survey.pdf"
source_collection: external
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

## 한 줄 요약 (One-line Summary)

LLM 에이전트의 분석 단위를 모델에서 그 모델이 도는 agent loop로 옮겨 정리한 서베이. 실무가 신경 쓰는 비용·신뢰성·안전을 결정하는 쪽은 모델이 아니라 루프라는 전제 아래, 루프 모양(paradigm), 루프를 지배하는 제어 장치(mechanics), 루프를 가중치로 흡수하는 trained loop, 루프 밖으로 빼낸 스킬과 harness, 그리고 이를 재는 평가와 안전 문제를 7개 기둥으로 묶는다. 관통하는 주장은 이렇다. 루프는 지금 가중치 안으로 내재화되는 방향과 스킬·harness로 외부화되는 방향으로 동시에 당겨지고 있다. 둘은 경쟁 관계가 아니다. 부분적으로 서로 바꿔 넣을 수 있는 같은 제어 구조의 두 구현이다. 그래서 질문도 "어느 쪽이 이기나"에서 "루프를 누가 소유하는가"로 옮겨간다. 서베이 대부분이 긍정 결과만 모으는 데 비해 반증 결과에 같은 무게를 주고 저자들이 직접 돌린 소규모 통제 실험 네 건(E2~E5)으로 그 반증을 실측한다.

## 1. 자료 정보 (Document Information)

- **저자**: Jungseob Lee(고려대학교), Chanjun Park(숭실대학교, 교신저자)
- **연락처**: `omanma1928@korea.ac.kr`, `chanjun.park@ssu.ac.kr`
- **분량**: 59페이지(본문 39p + 부록 A·B + 참고문헌 약 19p)
- **배포본**: SSRN 배포 PDF(`ssrn-7186738.pdf`). 본문에 arXiv ID나 DOI는 적혀 있지 않다
- **동반 저장소**: `https://github.com/js-lee-AI/awesome-agent-loop-papers`. 인용 논문을 절 단위로 색인하고 §7의 오픈소스 산출물을 함께 정리한다고 밝힌다
- **키워드**: large language models, autonomous agents, agent loop, control strategies, agent skills, tool use, verification, agent harness, evaluation, survey
- **커버리지**: 2022년 ReAct부터 2026년 중반까지. 절마다 "Recent developments (2026)" 문단을 따로 두어 최신 흐름을 몰아 정리한다

## 2. 주요 기여 (Key Contributions)

1. 분석 단위를 모델에서 루프로 옮긴다. agent loop는 관측하고 판단하고 행동하고 다시 관측하기를 종료 조건까지 반복하는 제어 순환을 말한다. 비용은 매 step·매 반성·매 rollout이 토큰으로 청구되니 루프의 성질이다. 신뢰성도 step당 오류 확률이 trajectory를 따라 누적되므로 루프의 성질이다. 안전 역시 마찬가지다. 주입된 명령을 실제 부작용으로 만드는 주체가 루프이기 때문이다. 모델·프레임워크·응용 도메인 중심으로 짠 서베이는 이 세 성질을 같은 저울에 올리지 못한다. 여기서 출발한다.
2. 세 용어를 형식적으로 고정한다. loop(추상 제어 구조), harness(그 구조를 실제로 구현한 코드와 인프라), 스킬(에피소드를 건너 살아남는 이름 붙은 재사용 절차). 여기서 "에이전트의 역량은 모델·harness·스킬이 함께 만든다"는 명제가 따라 나온다. 모델 대 scaffold 귀속 문제가 이 명제로 눈에 보이게 된다.
3. loop-first taxonomy는 프레임워크 대신 제어 전략으로 문헌을 나눈다. loop paradigm 5종(§3), 어떤 루프에나 붙는 mechanics 4종(§4), 이를 가중치로 흡수하는 trained loop(§5).
4. 스킬을 1급 주제로 다룬다(§6). 기존 서베이가 tool use나 memory 항목에 녹여 없애는 스킬을 acquire부터 govern까지 7단계 수명주기로 펼친다. 학계 계보(Voyager·ExpeL·AWM·ReasoningBank)와 산업 표준(SKILL.md·MCP)이 한 축에 함께 놓인다.
5. harness도 연구 대상으로 세운다(§7). 모델을 고정하고 주변 코드만 바꿔도 벤치마크 헤드라인이 수십 점 움직인다. 2026년의 harness는 신뢰성의 1차 설계면이라는 주장이다.
6. 반증 결과에 같은 지면을 준다. 외부 신호 없는 자기 교정이 정답을 오히려 망가뜨린다는 결과, 정교한 에이전트가 단순 파이프라인에 밀린다는 결과, 루프를 길게 돌릴수록 신뢰성 비용이 붙는다는 결과, 평가에서 harness가 교란 변수로 작동한다는 결과가 각 기둥의 마무리에 놓인다.
7. 마지막으로 통제 실험 네 건을 직접 돌렸다. ALFWorld 50 task 위에서 loop 모양·예산·스킬 라이브러리·오염 스킬을 각각 하나씩만 바꿔 측정한다(E2 비용–정확도, E3 예산 스윕, E4 스킬 ablation, E5 스킬 오염). 인용만 하지 않고 자기 주장을 자기 축에서 재현해 본 점이 이 논문의 차별점이다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 세 용어와 Algorithm 1

harness는 모델을 감싸 컨텍스트를 조립하고 도구·환경 접근을 중개하며 멈출 시점을 정하는 코드다. 모델의 forward pass가 아닌 모든 일은 harness에서 일어난다. policy는 매 turn observation을 받아 다음 action을 정하는 함수로, 여기서는 모델 가중치를 가리킨다. 논문이 제시하는 한 에피소드의 의사코드는 이렇게 읽힌다.

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

policy는 turn당 정확히 한 번 불리고 나머지는 전부 harness 몫이다. 스킬 라이브러리는 컨텍스트 조립 지점에서만 개입한다. §3은 이 루프의 몸통을 바꾸고 §5는 루프를 π 안으로 접어 넣으며 §7은 H의 구체적 구현을 다룬다. 루프를 고정한 채 그것이 어디 사는지만 바꾸는 이 구도가 내재화와 외부화를 같은 저울에 올리는 장치다.

### 3.2 다섯 가지 loop paradigm

루프 모양은 환경에 대한 베팅이다. 더 복잡한 topology는 각자의 전제가 성립할 때만 값을 하고 전제가 깨지면 토큰·지연·새 실패 모드로 청구된다.

- **Interleaved**(ReAct). 모든 action 앞에 추론을 끼워 넣어 가장 최신 관측에 판단을 붙들어 맨다. 다만 ReAct 자신의 ablation에서 HotpotQA·Fever 같은 지식 추론 과제는 관측이 무의미할 때 chain-of-thought 단독보다 못했다. 이후 분석은 ReAct의 이득이 interleaving이 아니라 예시–질의 유사도와 근사 retrieval을 따라간다고 지적한다.
- **Plan-then-execute**(ReWOO·LLMCompiler). 관측 전에 계획을 확정하고 재관측 없이 실행한다. 프롬프트에서 중간 관측이 빠지니 토큰이 몇 배 줄고 계획이 의존 구조를 드러내므로 DAG로 컴파일해 병렬 호출도 가능하다. 대가는 중간 반응성 상실이다.
- **Reflective**(Reflexion·Self-Refine·CRITIC). 실패를 언어 반성으로 바꿔 저장하고 에피소드를 통째로 재시도한다.
- **Search-in-environment**(LATS·Agent Q·ToT). 단일 trajectory를 버리고 분기·평가·되돌리기를 한다. 행동이 싸고 되돌릴 수 있으며 value function을 믿을 수 있을 때만 성립한다.
- **Adaptive/hybrid + async**(AdaPlanner·learn-when-to-plan·async tool use). 어떤 모양을 돌릴지 런타임에 고른다. 어려움이 "루프 고르기"에서 "고르는 신호를 믿기"로 옮겨갈 뿐이라는 단서가 붙는다.

### 3.3 루프를 지배하는 네 가지 mechanics

모양과 무관하게 어떤 루프에나 붙는 제어 장치를 넷으로 본다. 관통하는 긴장은 하나다. 멈춤·검증·복구 신호를 모델이 스스로 만들면 싸고 확장되지만 믿을 수 없고 게이밍당한다. 밖에서 근거를 대면 믿을 만한 대신 비용·지연·잔여 취약성을 문다.

termination은 고정 step 수나 정적 토큰 상한 대신 budget forcing, 확신도 기반 조기 종료, 난이도별 compute 배분으로 옮겨가고 있다. verification 쪽에서는 자체 비판이 근본적으로 불안정하다. 외부 신호 없는 자기 교정은 맞은 답을 자주 망가뜨리고 LLM은 자기 후보 출력들을 판별하는 일을 생성하는 일보다 더 잘하지 못한다. 그래서 process reward model·단위 테스트 게이트·generative verifier·LLM judge 같은 외부 검증기를 들여오는데 이들 각각에 문서화된 악용 경로가 있다. 컨텍스트 관리는 어느 쪽으로 가도 잃는다. 다 넣으면 긴 창의 중간이 실질적으로 유실되는 context rot가 오고 compaction·eviction은 정작 나중에 필요한 사실을 조용히 지운다. recovery는 실제로 존재하는 게 거의 없다. 주류 코딩 에이전트는 잘해야 파일 단위 stash를 하고 프로세스 상태는 버리므로 복구는 사실상 처음부터 다시 하기다.

### 3.4 루프를 가중치로 흡수하는 trained loop

결과 보상만 주는 multi-turn RL로 루프 제어를 policy 안에 넣는 방향이다. 검색 시점을 배우는 Search-R1, 코드 인터프리터 호출을 배우는 ReTool, 실제 웹 검색에 붙여 계획–교차검증–반성을 창발시킨 DeepResearcher, 실제 소프트웨어 진화 데이터에 규칙 기반 유사도 reward를 쓴 SWE-RL이 대표다. 문제는 세 가지로 정리된다. 결과에만 붙는 reward는 step별 신호를 못 주고 프록시로서 게이밍 가능하다. 긴 sparse-reward trajectory의 credit assignment가 불안정해 multi-turn RL이 자기 강화적 반복으로 좁아지는 Echo Trap이 생긴다. StarPO-S 같은 안정화는 붕괴를 늦출 뿐 없애지 못한다. 그리고 병목은 알고리즘이 아니라 reward를 대량으로 뱉어 줄 실행 가능한 환경 쪽에 있다.

가장 무거운 반증은 RLVR가 pass@1 샘플링 효율은 올리지만 추론 경계 자체는 넓히지 못한다는 분석이다. 큰 pass@k에서는 base 모델이 RL로 학습된 후손을 추월한다. 학습이 base가 이미 찾을 수 있던 해에 확률 질량을 몰아줬을 뿐이라는 뜻이다. 저자들의 판정은 "알려진 능력의 강력한 압축기이지 새 루프 제어 능력의 생성기는 아직 아니다"이다.

### 3.5 루프 밖으로 빼낸 스킬

스킬은 이름이 붙고 저장되고 검색되며 조합되는 절차 지식이다. 논문은 이 정의가 표현 수준에서 통일되지 않는다는 사실을 덮지 않는다. Voyager의 스킬은 실행 가능한 Python 함수다. Anthropic의 Agent Skills는 Markdown 지시문·스크립트·리소스를 담은 폴더이고 경험 학습기의 스킬은 성공·실패 trajectory를 비교해 뽑은 자연어 통찰이다. 코드·문서·메모리라는 서로 다른 자료형을 하나로 합칠 방법은 없고 남는 공통점은 기능적이다.

취득 단계보다 그 다음 단계에서 대부분 깨진다. 평평한 라이브러리는 규모를 감당하지 못하고 무관한 스킬을 더하면 성능이 떨어진다. retrieval은 hard negative에 취약해서 병목이 recall에서 incorporation으로 옮겨간다. 올바른 스킬을 찾아 왔는데도 임베딩이 의미상 구분되지 않아 엉뚱한 걸 부르고, 여러 스킬 본문을 한꺼번에 밀어 넣으면 프롬프트 과부하와 절차 혼동이 생긴다. 그래서 recall 중심 벤치마크는 실제 과제 효용을 체계적으로 과대평가한다.

산업 관행이 가장 빨리 퍼뜨린 표현은 디스크 위의 파일이다. `SKILL.md`의 YAML front-matter(name·한 줄 description·트리거 조건)만 retriever가 읽어 관련성을 판단하고 절차 본문은 선택된 뒤에야 컨텍스트로 올라오는 progressive disclosure 구조다. 라이브러리가 커져도 모든 스킬의 전문이 프롬프트를 잠식하지 않게 막는 장치다. 위의 간섭·오선택 실패는 정확히 front-matter가 본문끼리를 구별해 주지 못해 생긴다.

서드파티 메타데이터를 자동으로 신뢰하는 discovery 프로토콜에서는 도구 설명에 숨긴 악성 지시가 시스템이 쓴 것처럼 모델에 닿는다. 배포 가능한 스킬은 그대로 공급망 공격면이 된다. 실제 MCP 서버 수백 개를 상대로 한 벤치마크에서 오염된 메타데이터가 다수 사례에서 성공했다. 지시를 더 잘 따르는 모델일수록 더 취약했고 안전 튜닝은 아주 일부만 거부했다. 에이전트가 스스로 쌓은 메모리도 표적이 되어, 검색 메모리의 1% 미만을 오염시켜도 공격 성공률이 80%를 넘는다.

### 3.6 harness와 오케스트레이션

가장 낮은 층은 모델과 컴퓨터 사이 인터페이스다. SWE-agent는 이 인터페이스를 사람 대신 모델에 맞춰 설계하면(명령 집합 압축, 린트된 피드백, 반영 전 편집 검증) base 모델을 갈아 끼울 때보다 성공률이 더 오른다고 결론짓는다. 그 위에 오케스트레이션이 있는데 논문은 여기서 편을 든다. 과제를 푸는 선에서 가장 덜 agentic한 지점에 제어를 두라는 쪽이다. 무거운 오케스트레이션은 새는 추상화와 숨은 제어 흐름을 만들어 자기 값을 못 하는 경우가 잦다는 관찰을 근거로 든다.

멀티에이전트 논쟁은 이 절에서 가장 날 선 대목이다. 한쪽은 서브에이전트마다 격리된 컨텍스트를 주고 병렬 탐색하게 하는 설계가 넓고 읽기 중심인 과제에서 통한다고 보고한다. 다른 쪽은 신뢰할 만한 에이전트에 단일 작성자를 둔 연속된 공유 컨텍스트가 필요하며 컨텍스트를 에이전트 경계로 쪼개는 지점이 바로 시스템이 깨지는 곳이라고 반박한다. 멀티에이전트 실패 분류 연구가 조정·명세 붕괴가 광범위함을 문서화한 만큼, 병렬화 가능한 독립 작업에는 방어할 만하지만 공유 상태를 건드리는 행동에는 잘 계측된 단일 루프가 낫다는 쪽으로 정리한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 E2 루프 모양의 비용–정확도 프런티어

ALFWorld `valid_unseen` 50 task, 최대 30 step, greedy decoding, harness·프롬프트·과제·step 예산을 고정하고 loop 모양과 base 모델만 바꿨다. 모델은 Qwen2.5-Instruct 1.5B~32B.

| 규모 | ReAct 성공/토큰 | ReWOO 성공/토큰 | Reflexion 성공/토큰 |
|---|---|---|---|
| 1.5B | 2% / 2025 | 2% / 129 | 2% / 4477 |
| 3B | 24% / 734 | 10% / 139 | 38% / 1396 |
| 7B | 38% / 635 | 20% / 152 | 62% / 1056 |
| 14B | 70% / 466 | 12% / 138 | 76% / 695 |
| 32B | 72% / 465 | 12% / 126 | 74% / 733 |

지배하는 루프는 없다. ReWOO는 task당 약 130토큰으로 압도적으로 싸지만 관측 없이 계획하는 모양 탓에 성공률이 20% 근처에서 막힌다. Reflexion은 3B 이상 모든 규모에서 최고 정확도(14B 76%)를 내지만 토큰으로 값을 치른다. ReAct는 효율 프런티어에 놓여 14B에서 토큰 466으로 70%를 낸다. Reflexion의 695토큰·76%에 6점 뒤지는 대신 1.4~1.5배 싸다. 50 task의 95% 이항 구간이 ±13점쯤이므로 큰 규모의 6점·2점 차이는 순위로 읽을 수 없다. 프런티어 위 세 자리로 봐야 한다.

1.5B에서는 모든 루프가 2%(50개 중 1개)로 무너진다. 특히 Reflexion은 그 2%에 4477토큰을 쓴다. 자기 비판을 실행에 옮길 힘이 없는 모델이 고칠 수 없는 실패를 계속 되씹기 때문이다. 루프의 가치는 규모에 따라 달라진다.

같은 실험을 성공 1건당 토큰으로 다시 charge하면 순위가 뒤집힌다. ReWOO는 시도당으로는 모든 규모에서 가장 싸지만 성공당으로는 7B까지만 싸고(3B에서 약 1.4k 대 ReAct 3.1k), 성공률이 12~20% 대를 못 벗어나므로 ReAct 신뢰성이 70%를 넘는 14B부터는 ReAct가 성공당 최저가가 된다(약 0.65k 대 ReWOO 1.1k). 시도당 최저가 루프와 성공당 최저가 루프는 서로 다른 루프이고 규모에 따라 승자도 바뀐다.

### 4.2 E3 예산 스윕

같은 50 task에서 harness가 노출하는 두 손잡이만 쓸었다. ReAct step cap K ∈ {5,10,20,30,50}, Reflexion retry budget R ∈ {0,1,2,3}, 모델은 7B·14B·32B.

K를 올리면 성공률은 계속 오르지만 오목하다. 7B는 8→56%, 14B는 10→78%, 32B는 14→80%로 오른다. step당 한계 이득은 낮은 K에서 약 2점이던 것이 K=50에서 1점 아래로 떨어지고 토큰은 선형으로 는다. 14B와 32B는 K=20을 넘으면 거의 겹쳐서, 32B가 step을 더 써도 14B와 벌어지지 않는다.

R은 다르게 움직여서 평평해진다. 7B는 R=2와 R=3 모두 68%인데 task당 토큰은 1420에서 1829로 오르고 14B는 86→88%, 32B는 80→84%에 그친다. R≈2를 넘기면 선형 토큰 추가금을 내고 정확도는 거의 못 산다. 여기서 나오는 결론은 권장 상수가 아니라 상수 자체에 대한 반박이다. 옳은 예산은 입력에 따라 달라진다.

### 4.3 E4 스킬 ablation

분리된 split(`valid_seen`)에서 모델 자신의 성공한 ReAct trajectory로부터 스킬 라이브러리를 사람 라벨 없이 뽑아낸 뒤, base 모델을 고정한 채 세 조건을 비교했다.

| 규모 | 조건 | 성공률 | 평균 step | 완성 토큰 | 프롬프트 토큰 |
|---|---|---|---|---|---|
| 7B | 스킬 없음 | 38% | 23.1 | 635 | – |
| 7B | 매칭 스킬만 | 50% | 19.3 | 550 | 17.8k |
| 7B | 전체 라이브러리 | 52% | 19.7 | 561 | 23.5k |
| 14B | 스킬 없음 | 70% | 17.1 | 466 | – |
| 14B | 매칭 스킬만 | 70% | 16.4 | 458 | 15.0k |
| 14B | 전체 라이브러리 | 66% | 16.9 | 465 | 19.6k |

여유가 있는 7B에서는 과제에 맞는 스킬 하나가 성공률을 12점 올리면서 환경 step과 완성 토큰을 동시에 줄인다. 천장에 가까운 14B에서는 매칭 스킬이 성공률을 전혀 바꾸지 못하고 전체 라이브러리는 오히려 4점 떨어뜨린다. §6이 말한 간섭이 그대로 재현된 것으로, 병목은 recall이 아니라 incorporation이다. 정직한 단서도 두 개 붙는다. 비용이 준다는 주장은 step과 완성 토큰에만 해당하고 주입한 라이브러리가 task당 15~24k의 프롬프트 토큰 추가금을 만든다. 그리고 이건 같은 환경 안에서의 재사용이라 이 절이 "사실상 측정된 적 없다"고 지적한 환경 간 전이는 여전히 미측정이다.

### 4.4 E5 스킬 오염

E4의 같은 라이브러리를 공격면으로 바꿨다. 악성 스킬이 들어가는 자리는 시스템이 쓴 스킬 메타데이터, 즉 프롬프트에서 가장 신뢰받는 위치다. 사용자 콘텐츠 자리가 아니다. 지표는 의도 수준 hijack 감시자로, 45개 적격 task 중 모델 의도가 "물건을 garbagecan에 넣는" action을 한 번이라도 내는 에피소드 비율이다. 정상 조건은 모든 규모에서 정확히 0/45로 오탐이 없다.

정상적이고 과제에 맞는 스킬 5개와 나란히 놓인 현실적 배치에서는 충돌하는 오염 스킬이 확실히 무력화된다. redirect·additive 어느 쪽도 어느 규모·어느 루프에서도 1/45를 넘지 않고 32B는 모든 칸에서 0/45로 완전히 깨끗하다. 정상 과제 성공률은 유지될 뿐 아니라 규모에 따라 올라간다(ReAct 53/69/82%, Reflexion 64/80/89%). 즉 못 움직여서 안 당한 게 아니다. 이 구간에서는 능력 기울기가 없고 가장 유능한 모델이 가장 덜 당한다.

그 보호가 무엇에 기대고 있었는지는 경쟁을 없애면 드러난다. 정상 스킬 5개를 빼고 redirect 오염만 유일한 스킬로 제공하자 hijack이 7B 14/45(31%), 14B 15/45(33%), 32B 28/45(62%)로 뛴다. 능력 기울기가 나타나서 지시를 가장 충실히 따르는 32B가 가장 취약해진다. 공격 아래 과제 성공률도 53→38%, 69→36%, 82→22%로 능력에 비례해 무너진다. 두 조건의 유일한 차이가 경쟁하는 정상 스킬의 제거이므로 현실 배치에서의 보호는 목표에 단단히 붙들린 거부가 아니라 정상 컨텍스트가 오염을 희석하고 닻을 내려 준 결과다.

저자들은 자기 결과에 두 개의 추를 단다. 32B 상한 62%도 선행 연구가 보고한 거의 보편적 성공에는 못 미친다. 그리고 이 공격은 목표와 정면으로 충돌하도록 설계돼 hijack이 과제 성공률 붕괴로 스스로 드러난다. 과제와 무관하게 조용히 곁다리 부작용을 일으키는 유형(보고서는 정상 작성하면서 키를 유출하는 식)은 목표가 닻이 되어 주지 못하고 성공률에도 흔적을 남기지 않는다. 그 유형은 E5가 다루지 않았다고 명시한다.

### 4.5 평가에 대한 주장

agent loop 점수를 단일 스칼라로 요약하면 안 된다. 튜플이 맞는 단위다. 공개되었거나 ablation 가능한 harness, 비용–정확도 파레토 위치, pass^k 신뢰성 분포, 그리고 타당성 감사가 그 성분이다. 근거는 셋이다. frontier 모델을 고정하고 harness만 바꿔도 모델을 갈아 끼울 때보다 큰 성능 변동과 순위 역전이 나온다. 가장 많이 인용되는 벤치마크의 진전 일부는 추론이 아니라 암기여서 학습 분포 밖 저장소에서는 최고 점수가 급락한다. 그리고 과제·reward 설계 버그 탓에 에이전트 능력이 상대적으로 최대 100%까지 잘못 추정된다는 감사 결과가 있다. pass^k는 k번 독립 시행이 모두 성공해야 하는 지표로, 어려운 장기 과제에서 0으로 붕괴하며 데모 가능한 pass@1과 배포 가능한 신뢰성 사이의 간극을 드러낸다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

저자들이 직접 붙인 실험 한계가 분명하다. E2~E5는 모두 벤치마크 하나(ALFWorld), 모델 계열 하나(Qwen2.5-Instruct), 50 task, greedy decoding이다. 50 task의 이항 구간이 ±13점쯤이라 대부분의 차이에서는 임계값을 못 믿고 방향만 신뢰할 수 있다. E3의 step 스윕은 ALFWorld의 자연스러운 15~25 step 지평 위쪽으로는 구조상 바뀔 게 없다. E4는 같은 환경 안의 재사용이라 스킬의 본래 약속인 환경 간 전이를 재지 못한다. E5의 상한 조건은 ReAct 한 가지 루프로만 쓸었다.

논문이 남겨 둔 열린 문제는 다섯이다. 첫 번째는 루프를 누가 소유하는가다. 능력이 가중치·harness·서드파티 스킬에 흩어졌을 때 책임 소재를 정하는 문제다. 장기 지평의 신뢰성도 열려 있다. pass^k가 대략 p^k로 감쇠하므로 pass@1이 60%를 넘는 에이전트도 pass^8에서 25% 아래로 무너질 수 있다. 여기에 장기 실패 대부분이 모델 품질이 아니라 오케스트레이션에서 온다는 관찰이 겹친다. 스킬 거버넌스는 비어 있다. 패키지 매니저가 코드를 다스리는 방식의 레지스트리·서명·출처·리뷰 체계가 스킬에는 아직 없다. 표준화와 재현 가능한 평가에서는 프로토콜부터 표준으로 굳고 보안·의미 명세가 뒤처지며 공유 프로토콜 하나는 공격면도 함께 표준으로 만든다는 지적이 붙는다. 마지막은 비용을 의식한 설계와 안전–능력 공진화다. 도구 호출·지평·자율성을 늘리면 능력과 함께 토큰 비용과 공격면이 같은 보폭으로 커지고 비용을 줄이려는 압력과 pass^k 신뢰성은 서로를 당긴다.

## 6. 관련 연구 (Related Work)

- **선행 서베이와의 차별**: Xi 2023, Wang 2023b, Sumers 2023, Huang 2024, Masterman 2024, Zhang 2025b, Fang 2025, Yehudai 2025, Plaat 2025, Zhou 2026a 열 편을 7개 축으로 채점한 결과, 기존 서베이는 loop paradigm·loop mechanics·trained loop·harness 축에서 가장 얇다(tab01).
- **루프 모양의 원전**: ReAct(Yao 2022), ReWOO(Xu 2023), LLMCompiler(Kim 2023), Reflexion(Shinn 2023), Self-Refine(Madaan 2023), CRITIC(Gou 2023), LATS(Zhou 2024a), Tree-of-Thoughts(Yao 2023a).
- **자기 교정 반증 계보**: Huang 2023(외부 신호 없는 자기 교정의 성능 저하), Kamoi 2024(자기 교정 문헌 비판적 서베이), Jiang 2024(자기 후보 판별 실패).
- **trained loop**: Search-R1(Jin 2025), ReTool(Feng 2025a), DeepResearcher(Zheng 2025b), SWE-RL(Wei 2025), RAGEN/StarPO(Wang 2025e), GiGPO(Feng 2025b), ARPO(Dong 2025), SWE-Gym(Pan 2024), Chain-of-Agents(Li 2025b), 그리고 pass@k 경계 반증(Yue 2025).
- **스킬 계보**: Voyager(Wang 2023a), CodeAct(Wang 2024b), ExpeL(Zhao 2023), Agent Workflow Memory(Wang 2024c), ReasoningBank(Ouyang 2025), Agent Skills·SKILL.md(Anthropic 2025f), MCP(Anthropic 2024c), Gorilla(Patil 2024).
- **harness**: SWE-agent ACI(Yang 2024a), OpenHands(Wang 2024a), building effective agents(Anthropic 2024a), context engineering(Anthropic 2025e), 멀티에이전트 반대론(Yan 2025), 멀티에이전트 실패 분류(Cemri 2025), compound AI systems(Zaharia 2024).
- **평가**: SWE-bench(Jimenez 2023), WebArena(Zhou 2024b), OSWorld(Xie 2024), τ-bench(Yao 2024), AI Agents That Matter(Kapoor 2024), harness 미공개 비교의 오도 가능성(Zhang 2026j), SWE-bench 암기 논증(Liang 2025), agentic benchmark 체크리스트(Zhu 2025b).
- **안전**: 간접 프롬프트 주입(Greshake 2023), InjecAgent(Zhan 2024), AgentDojo(Debenedetti 2024), instruction hierarchy(Wallace 2024), CaMeL(Debenedetti 2025), Progent(Shi 2025), MCPTox(Wang 2025a), AgentPoison(Chen 2024e), ETDI(Bhatt 2025).

이 wiki 안에서는 [[agents/lin-2026-harness-updating-is-not-harness-benefit]], [[agents/cemri-2025-why-do-multi-agent-llm-systems]], [[agents/dennis-2026-compiling-agentic-workflows-into-llm]], [[agents/zhou-2026-are-we-ready-for-an]], [[agents/bai-2026-how-do-ai-agents-spend]], [[agents/yang-2026-skillopt-executive-strategy-for]], [[agents/zhao-2026-generative-skill-composition-for-llm]]가 이 서베이의 개별 기둥을 각각 깊게 파는 자료다.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| internalize / externalize | 루프 제어 능력을 가중치 안으로 넣는 방향(agentic RL)과 밖으로 빼는 방향(스킬·harness). 이 서베이의 두 축 |
| loop paradigm | 추론·행동·관측을 어떤 순서로 놓고 trajectory를 어떻게 분기시키는지, 즉 루프의 모양 |
| loop mechanics | 모양과 무관하게 어떤 루프에나 붙는 제어 장치 — termination, verification, 컨텍스트 관리, recovery |
| Echo Trap | multi-turn RL이 반복적이고 자기 강화적인 추론으로 좁아지며 붕괴하는 특징적 실패(RAGEN이 명명) |
| library drift | 스킬 라이브러리가 무제한으로 커지며 retrieval 품질이 조용히 떨어지는 2026년 명명 실패 모드 |
| incorporation | 올바른 스킬을 검색해 오고도 실제로 쓰지 못하는 단계. recall과 구분되는 진짜 병목 |
| pass^k | k번 독립 시행이 모두 성공해야 인정하는 신뢰성 지표. pass@k와 반대 방향으로 엄격하다 |
| put-ASR | E5의 의도 수준 hijack 감시자. 45개 적격 task 중 garbagecan 투기 action을 한 번이라도 낸 에피소드 비율 |
| exec-ASR | 그중 환경이 실제로 받아들인 부분집합. 물건이 이미 제자리에 놓였으면 환경이 거부하므로 intent보다 낮다 |
| delivery salience | 오염 스킬이 얼마나 도드라진 위치에 단독으로 놓이는지. E5가 두 조건을 가르는 축으로 지목한 변수 |
| harness confound | 보고된 에이전트 점수가 모델과 미공개 harness의 합성 측정이라 귀속이 불가능해지는 평가 문제 |
| governance decay | in-loop 컨텍스트 compaction이 안전 제약을 조용히 떨어뜨리는 2026년 보고 현상 |

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 4 | arXiv 월간 논문 수로 본 internalize·externalize 두 방향의 성장 | manual | ★ wiki 권장 (thesis) |
| fig02 | 6 | perceive–reason–act 순환과 harness·policy·스킬 라이브러리의 위치 | caption-region | ★ wiki 권장 (definition) |
| fig03 | 9 | 서베이 전체 지도 — 7개 기둥과 각 기둥의 반증 결과 | caption-region | ★ wiki 권장 (taxonomy) |
| fig04 | 11 | loop zoo — 여섯 가지 루프 모양 비교도 | caption-region | ★ wiki 권장 (method) |
| fig05 | 15 | E3 예산 스윕 — step cap은 오목, retry budget은 평평 | caption-region | ★ wiki 권장 (result) |
| fig06 | 20 | 스킬 수명주기 7단계와 단계별 실패 모드·공급망 공격 지점 | caption-region | ★ wiki 권장 (method) |
| fig07 | 29 | E2 비용–정확도 프런티어 | caption-region | ★ wiki 권장 (result) |
| fig08 | 30 | 성공 1건당 토큰으로 다시 그린 순위 역전 | caption-region | (확인 필요 — fig07과 중복 여지) |
| fig09 | 36 | E5 스킬 오염 3패널 | manual | ★ wiki 권장 (result) |
| tab01 | 10 | 선행 서베이 10편의 7축 커버리지 채점 | table-region | (확인 필요 — 차별점 근거) |
| tab02 | 10 | 5개 loop paradigm 설계 공간 — 전제·비용·실패 모드 | manual | ★ wiki 권장 (taxonomy) |
| tab03 | 14 | 4개 loop mechanics의 자체 생성 대 외부 근거 대조 | table-region | ★ wiki 권장 (taxonomy) |
| tab04 | 27 | 오픈소스 프레임워크·코딩 harness 18종과 star 수 | table-region | (확인 필요 — 실무 레퍼런스) |
| tab05 | 28 | 스킬 라이브러리·MCP 레지스트리 9종 | table-region | (확인 필요) |
| tab06 | 30 | E2 결과 수치표 | manual | ★ wiki 권장 (result) |
| tab07 | 31 | E4 스킬 ablation 수치표 | manual | ★ wiki 권장 (result) |
| tab08 | 33 | 안전 4개 층의 보장과 잔여 위험 | table-region | ★ wiki 권장 (taxonomy) |
| tab09 | 35 | E5 스킬 오염 수치표 | table-region | ★ wiki 권장 (result) |
