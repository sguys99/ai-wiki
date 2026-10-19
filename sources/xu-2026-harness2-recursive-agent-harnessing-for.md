---
title: "Harness^2: Recursive Agent Harnessing for an Open World"
type: paper
year: 2026
category: agents
raw_path: raw/papers/xu-2026-harness2-recursive-agent-harnessing-for.pdf
raw_filename: "xu-2026-harness2-recursive-agent-harnessing-for.pdf"
source_collection: external
authors: "Ruiyao Xu, Yanfei Chen, Zhongying CuiZhu, Bhavana Dalvi Mishra, Yifei Ming, Han Yu, Rujun Han, Chen-Yu Lee, Tomas Pfister"
arxiv_id: "2610.14224"
doi: "10.48550/arXiv.2610.14224"
tags: [harness-evolution, recursive-self-improvement, test-time-adaptation, self-evolving-agents, workbuddy-bench, jobbench, harvey-lab]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/xu-2026-harness2-recursive-agent-harnessing-for/fig01.png
    raw: raw/papers/xu-2026-harness2-recursive-agent-harnessing-for-figures/fig01.png
    caption: "전체 성능. 왼쪽은 Gemini 3.5 Flash와 OpenCode 조합의 WorkBuddy-Bench 도메인별 점수로 병렬 recursion(k=5)이 세 도메인 모두에서 Meta-Harness를 앞선다. 오른쪽은 WB-code에서 예산 k가 커질수록 점수가 오르는 곡선이다"
    page: 1
    bbox_norm: [0.0947, 0.5364, 0.9053, 0.739]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/xu-2026-harness2-recursive-agent-harnessing-for/fig02.png
    raw: raw/papers/xu-2026-harness2-recursive-agent-harnessing-for-figures/fig02.png
    caption: "Harness²의 편집 가능한 구성 요소 8개를 런타임 역할(컨텍스트 구성, 도구 인터페이스, 오케스트레이션, 미들웨어)별로 묶은 도식"
    page: 3
    bbox_norm: [0.0947, 0.0939, 0.9053, 0.308]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/xu-2026-harness2-recursive-agent-harnessing-for/fig03.png
    raw: raw/papers/xu-2026-harness2-recursive-agent-harnessing-for-figures/fig03.png
    caption: "Harness² 파이프라인. 작업 수준 recursion은 Agent Executor, Harness Editor, Candidate Probes, Harness Composer를 거쳐 최종 harness를 만들고, harnessing 수준 recursion은 Experience Reflector가 improvement harness를 갱신한 뒤 다음 작업으로 넘어간다"
    page: 5
    bbox_norm: [0.0429, 0.0851, 0.9296, 0.286]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/xu-2026-harness2-recursive-agent-harnessing-for/fig04.png
    raw: raw/papers/xu-2026-harness2-recursive-agent-harnessing-for-figures/fig04.png
    caption: "작업 수준 recursion의 두 형태. (a) 병렬은 invariant 후보와 domain 후보 k개씩을 probe한 뒤 독립적으로 합성하고, (b) 순차는 정제된 harness와 누적 증거를 다음 단계로 넘긴다"
    page: 6
    bbox_norm: [0.0947, 0.0939, 0.9049, 0.2469]
    strategy: caption-region
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/xu-2026-harness2-recursive-agent-harnessing-for/fig05.png
    raw: raw/papers/xu-2026-harness2-recursive-agent-harnessing-for-figures/fig05.png
    caption: "작업 수준 recursion의 효과. WB-code와 WB-office에서 예산 k를 1에서 5로 늘릴 때 병렬과 순차 Harness², ReasoningBank, Harness Scaling, Best-of-k base의 점수 변화"
    page: 9
    bbox_norm: [0.3714, 0.6267, 0.9053, 0.7799]
    strategy: caption-region
    curated: true
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/xu-2026-harness2-recursive-agent-harnessing-for/fig06.png
    raw: raw/papers/xu-2026-harness2-recursive-agent-harnessing-for-figures/fig06.png
    caption: "JobBench와 WorkBuddy-Bench에서 작업당 총 연산량(백만 토큰, 로그 축)과 base 대비 점수 이득의 관계. Harness² 두 설정이 경험적 Pareto 경계 위에 놓인다"
    page: 10
    bbox_norm: [0.3714, 0.2379, 0.9053, 0.3966]
    strategy: caption-region
    curated: false
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/xu-2026-harness2-recursive-agent-harnessing-for/fig07.png
    raw: raw/papers/xu-2026-harness2-recursive-agent-harnessing-for-figures/fig07.png
    caption: "harnessing 수준 recursion 분석. 왼쪽은 실행 없이 직접 편집할 때 library 유무와 누적 예산(k=1, k=5)에 따른 점수, 오른쪽은 JobBench에서 쌓은 library를 WorkBuddy-Bench로 옮긴 결과"
    page: 11
    bbox_norm: [0.3714, 0.1365, 0.9053, 0.273]
    strategy: caption-region
    curated: true
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/xu-2026-harness2-recursive-agent-harnessing-for/fig08.png
    raw: raw/papers/xu-2026-harness2-recursive-agent-harnessing-for-figures/fig08.png
    caption: "같은 모델을 실행자와 편집자로 함께 쓴 결과. OpenCode, k=2에서 GLM-5부터 Claude Opus 5까지 모델 5종의 세 벤치마크 base 대비 점수"
    page: 11
    bbox_norm: [0.0899, 0.6829, 0.9051, 0.8621]
    strategy: manual
    curated: false
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/xu-2026-harness2-recursive-agent-harnessing-for/fig09.png
    raw: raw/papers/xu-2026-harness2-recursive-agent-harnessing-for-figures/fig09.png
    caption: "JobBench 사례 연구. base trajectory의 실패 두 가지(파일 간 수치 대조 누락, 작성 후 재확인 누락)와 테스트 시점에 작성된 가드레일, 스킬, 스크립트, tool guidance 편집, 그리고 43.1점에서 77.8점으로 오른 재실행 결과"
    page: 12
    bbox_norm: [0.0947, 0.0939, 0.9053, 0.3794]
    strategy: caption-region
    curated: true
  - id: fig10
    label: Figure 10
    kind: figure
    file: assets/xu-2026-harness2-recursive-agent-harnessing-for/fig10.png
    raw: raw/papers/xu-2026-harness2-recursive-agent-harnessing-for-figures/fig10.png
    caption: "library 출처와 편집 분포. 왼쪽은 수정된 구성 요소 파일 중 library에서 재사용, 변형, 신규 작성된 비율이고 오른쪽은 편집이 구성 요소 8개에 나뉜 비율이다"
    page: 23
    bbox_norm: [0.0947, 0.6434, 0.9053, 0.8157]
    strategy: caption-region
    curated: false
  - id: fig11
    label: Figure 11
    kind: figure
    file: assets/xu-2026-harness2-recursive-agent-harnessing-for/fig11.png
    raw: raw/papers/xu-2026-harness2-recursive-agent-harnessing-for-figures/fig11.png
    caption: "Leave-one-out 재실행. 스트림이 끝난 뒤 각 작업을 자기 library 항목을 뺀 채 다시 실행한 점수와 원래 온라인 실행(k=1) 점수의 비교"
    page: 24
    bbox_norm: [0.0947, 0.2073, 0.9053, 0.386]
    strategy: caption-region
    curated: false
  - id: fig12
    label: Figure 12
    kind: figure
    file: assets/xu-2026-harness2-recursive-agent-harnessing-for/fig12.png
    raw: raw/papers/xu-2026-harness2-recursive-agent-harnessing-for-figures/fig12.png
    caption: "모델 간 전이. Gemini 3.5 Flash용으로 정제한 harness를 수정 없이 GLM-5, Gemini 3.7 Flash, Claude Opus 4.8에 적용한 WorkBuddy-Bench 결과"
    page: 24
    bbox_norm: [0.0947, 0.2073, 0.9053, 0.6955]
    strategy: caption-region
    curated: false
  - id: fig13
    label: Figure 13
    kind: figure
    file: assets/xu-2026-harness2-recursive-agent-harnessing-for/fig13.png
    raw: raw/papers/xu-2026-harness2-recursive-agent-harnessing-for-figures/fig13.png
    caption: "상용 harness와의 비교. 수정하지 않은 CodeBuddy, OpenCode, Codex, Claude Code와 OpenCode에서 출발한 Harness²(k=5)의 WorkBuddy-Bench 도메인별 점수"
    page: 25
    bbox_norm: [0.0947, 0.4162, 0.9053, 0.5903]
    strategy: caption-region
    curated: false
  - id: fig14
    label: Figure 14
    kind: figure
    file: assets/xu-2026-harness2-recursive-agent-harnessing-for/fig14.png
    raw: raw/papers/xu-2026-harness2-recursive-agent-harnessing-for-figures/fig14.png
    caption: "recursive harnessing의 실패 사례 9건. 맹목 선택이 약한 후보를 고른 경우, 편집 자체가 후보 풀의 상한을 막은 경우, 편집과 선택 어느 쪽도 원인이 아닌 경우로 나눴다"
    page: 26
    bbox_norm: [0.1299, 0.1429, 0.8701, 0.7551]
    strategy: manual
    curated: true
  - id: fig15
    label: Figure 15
    kind: figure
    file: assets/xu-2026-harness2-recursive-agent-harnessing-for/fig15.png
    raw: raw/papers/xu-2026-harness2-recursive-agent-harnessing-for-figures/fig15.png
    caption: "WorkBuddy-Bench Code 사례. 참조 실행이 tool call을 일반 텍스트로 출력해 아무것도 실행하지 않았고, 가짜 호출을 금지하는 tool guidance 편집 하나로 60.0점이 100.0점이 됐다"
    page: 27
    bbox_norm: [0.0947, 0.1526, 0.9053, 0.3274]
    strategy: caption-region
    curated: false
  - id: fig16
    label: Figure 16
    kind: figure
    file: assets/xu-2026-harness2-recursive-agent-harnessing-for/fig16.png
    raw: raw/papers/xu-2026-harness2-recursive-agent-harnessing-for-figures/fig16.png
    caption: "WorkBuddy-Bench Office 사례. 집계 단위를 잘못 잡은 참조 실행에 집계 단위와 파생 필드를 고정하는 스킬과 입력을 읽기 전용으로 다루는 가드레일을 더해 23.6점이 100.0점이 됐다"
    page: 27
    bbox_norm: [0.0947, 0.3725, 0.9053, 0.5857]
    strategy: caption-region
    curated: false
  - id: fig17
    label: Figure 17
    kind: figure
    file: assets/xu-2026-harness2-recursive-agent-harnessing-for/fig17.png
    raw: raw/papers/xu-2026-harness2-recursive-agent-harnessing-for-figures/fig17.png
    caption: "WorkBuddy-Bench Web 사례. 첫 렌더링 시점에 페이지 상태가 고정되는 문제를 상태 재계산 스킬, 오프라인 열람 확인 스크립트, 네트워크 의존 금지 가드레일로 고쳐 64.0점이 100.0점이 됐다"
    page: 28
    bbox_norm: [0.0947, 0.0939, 0.9053, 0.3655]
    strategy: caption-region
    curated: false
  - id: fig18
    label: Figure 18
    kind: figure
    file: assets/xu-2026-harness2-recursive-agent-harnessing-for/fig18.png
    raw: raw/papers/xu-2026-harness2-recursive-agent-harnessing-for-figures/fig18.png
    caption: "LAB 중재(arbitration) 사례. 수정 표시가 Word 변경 추적 층에만 남아 텍스트로 읽으면 사라지는 문제를 본문 문자 서식(취소선과 굵게)으로 남기는 스킬과 그 스킬을 부르는 가드레일로 고쳐 44.4점이 94.5점이 됐다"
    page: 28
    bbox_norm: [0.0947, 0.4268, 0.9053, 0.6324]
    strategy: caption-region
    curated: false
  - id: fig19
    label: Figure 19
    kind: figure
    file: assets/xu-2026-harness2-recursive-agent-harnessing-for/fig19.png
    raw: raw/papers/xu-2026-harness2-recursive-agent-harnessing-for-figures/fig19.png
    caption: "JobBench 사회과학 연구 보조 사례. Claude Opus 5가 실행자와 편집자를 겸하며 구성 요소 8개를 모두 작성했고, 산출물 없이 tool call이 쌓이면 경고를 덧붙이는 plugin 등으로 72.0점이 100.0점이 됐다"
    page: 29
    bbox_norm: [0.0947, 0.0939, 0.9053, 0.3343]
    strategy: caption-region
    curated: false
  - id: tab01
    label: Table 1
    kind: table
    file: assets/xu-2026-harness2-recursive-agent-harnessing-for/tab01.png
    raw: raw/papers/xu-2026-harness2-recursive-agent-harnessing-for-figures/tab01.png
    caption: "WorkBuddy-Bench 주요 결과. 실행자 2종(Gemini 3.5 Flash, GLM-5)과 초기 harness 2종(OpenCode, Codex)에서 도메인별 점수와 실행 단계 수를 baseline 4종과 비교한다"
    page: 8
    bbox_norm: [0.0932, 0.1705, 0.9084, 0.9279]
    strategy: table-region
    curated: true
  - id: tab02
    label: Table 2
    kind: table
    file: assets/xu-2026-harness2-recursive-agent-harnessing-for/tab02.png
    raw: raw/papers/xu-2026-harness2-recursive-agent-harnessing-for-figures/tab02.png
    caption: "JobBench와 LAB 주요 결과. 같은 네 설정에서 JobBench 점수와 LAB Partial 통과율, 실행 단계 수를 비교한다"
    page: 9
    bbox_norm: [0.0899, 0.1479, 0.9051, 0.4351]
    strategy: manual
    curated: true
  - id: tab03
    label: Table 3
    kind: table
    file: assets/xu-2026-harness2-recursive-agent-harnessing-for/tab03.png
    raw: raw/papers/xu-2026-harness2-recursive-agent-harnessing-for-figures/tab03.png
    caption: "WorkBuddy-Bench와 JobBench ablation. library, scoping, composition을 각각 뺀 결과"
    page: 10
    bbox_norm: [0.5389, 0.5507, 0.9037, 0.6496]
    strategy: table-region
    curated: false
  - id: tab04
    label: Table 4
    kind: table
    file: assets/xu-2026-harness2-recursive-agent-harnessing-for/tab04.png
    raw: raw/papers/xu-2026-harness2-recursive-agent-harnessing-for-figures/tab04.png
    caption: "harness 개선 방법 28종을 대상, 단계, 정답 레이블 사용, 스트리밍, 스케일링, improver 갱신 여섯 기준으로 비교한 표"
    page: 19
    bbox_norm: [0.0938, 0.1706, 0.9079, 0.9279]
    strategy: table-region
    curated: false
  - id: tab05
    label: Table 5
    kind: table
    file: assets/xu-2026-harness2-recursive-agent-harnessing-for/tab05.png
    raw: raw/papers/xu-2026-harness2-recursive-agent-harnessing-for-figures/tab05.png
    caption: "Harness² harness의 구성 요소 8개를 그룹, 파일 경로, 활성화 시점, 정의로 정리한 표"
    page: 22
    bbox_norm: [0.0947, 0.174, 0.9053, 0.9279]
    strategy: table-region
    curated: false
  - id: tab06
    label: Table 6
    kind: table
    file: assets/xu-2026-harness2-recursive-agent-harnessing-for/tab06.png
    raw: raw/papers/xu-2026-harness2-recursive-agent-harnessing-for-figures/tab06.png
    caption: "WorkBuddy-Bench에서 정제된 harness의 프롬프트 계열, 스킬, 스크립트를 각각 제거했을 때의 점수"
    page: 23
    bbox_norm: [0.094, 0.3625, 0.9056, 0.7649]
    strategy: table-region
    curated: false
  - id: tab07
    label: Table 7
    kind: table
    file: assets/xu-2026-harness2-recursive-agent-harnessing-for/tab07.png
    raw: raw/papers/xu-2026-harness2-recursive-agent-harnessing-for-figures/tab07.png
    caption: "작업당 평균 tool call 수와 tool 오류율. WorkBuddy-Bench, JobBench, LAB의 base harness와 Harness² 비교"
    page: 25
    bbox_norm: [0.1757, 0.195, 0.8243, 0.2777]
    strategy: table-region
    curated: false
---

## 한 줄 요약 (One-line Summary)

Harness²는 모델 가중치를 고정한 채, 정답이나 verifier 없이 실행 증거끼리의 대조(Propose, Probe, Compose)로 현재 작업의 execution harness를 고치고, 그 개선 과정에서 얻은 harness와 교훈을 improvement harness의 library에 쌓아 다음 작업의 개선을 돕는 2단 recursion 프레임워크다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 제목 | Harness^2: Recursive Agent Harnessing for an Open World |
| 저자 | Ruiyao Xu(Northwestern University, Google Cloud AI Research 인턴 중 수행), Yanfei Chen, Zhongying CuiZhu, Bhavana Dalvi Mishra, Yifei Ming, Han Yu, Rujun Han, Chen-Yu Lee, Tomas Pfister(Google Cloud AI Research) |
| 공개 | arXiv 2610.14224v1 (2026-10-09 제출, 표지 날짜 2026-10-12), cs.AI, CC BY 4.0 |
| 분량 | 37쪽 (본문 13쪽, 부록 A~H) |
| 코드 | github.com/google-research/harness2 (Apache-2.0) |
| 웹 | harness2.github.io |

## 2. 주요 기여 (Key Contributions)

논문은 기여를 세 가지로 정리한다.

1. **Recursive agent harnessing**: 현재 execution harness를 고치는 일과, 그 개선 과정 자체에서 배워 다음 harnessing을 이끄는 일을 하나의 틀로 묶는다. harnessing은 고정된 base model을 둘러싼 런타임 scaffold를 최적화해 그 모델이 자율 에이전트로 동작하게 하는 과정을 가리키는 저자들의 용어다.
2. **정답 피드백 없는 작업 수준 recursion**: 대조형 Propose, Probe, Compose 단계를 제안하고, 이를 병렬 recursion과 순차 recursion 두 방식으로 확장한다.
3. **실험 결과**: 벤치마크 3종, 실행자와 harness 조합 4가지에서 일관된 이득을 보인다. 같은 모델이 실행자와 편집자를 겸하는 설정도 포함한다.

출발점이 된 문제의식은 두 가지다. 첫째, 개방형 작업(open-world task)은 harness 설계 시점에 보지 못한 것이라 정답 레이블이나 믿을 만한 verifier가 없다. 둘째, 한 작업에 맞춘 harness 편집은 다음 작업의 개선을 자동으로 돕지 않으며, 지나치게 맞춤화된 execution harness를 그대로 물려받으면 작업 분포가 바뀔 때 잡음 섞인 개선이 이어진다. 저자들은 대신 "어떤 약점을 어떻게 진단했고, 어떤 변경을 시험했고, 실행이 무엇을 보여 줬는가"라는 개선 과정의 경험이 재사용 가치가 높다고 보고, 중심 질문을 "recursive self-improvement가 현재 harness와 미래 harness를 개선하는 방법을 동시에 개선할 수 있는가"로 세운다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 harness 구성과 설정

모델 M은 파라미터가 고정돼 있다. harness H=(c1, ..., cK)는 편집 가능한 구성 요소 K개로 이뤄지며, M과 합쳐져 가중치 변경 없이 에이전트 A(M, H)를 이룬다. execution harness는 AHE(Lin et al., 2026)의 파일 단위 분해를 따르되 구성 요소를 하나 더해 K=8로 둔다. 각 구성 요소는 런타임에 파일로 마운트되므로 편집 하나는 곧 diff 하나다.

| 그룹 | 구성 요소 | 파일 | 활성화 시점 | 정의 |
|---|---|---|---|---|
| 컨텍스트 구성 | C1 System prompt | `systemprompt.md` | 매 호출 | 모든 작업에 적용되는 페르소나와 최상위 절차 |
| 컨텍스트 구성 | C2 Guardrails | `guardrails.md` | 매 호출 | 작업이나 도구와 무관하게 유지되는 강한 제약 |
| 컨텍스트 구성 | C3 Memory | `LongTermMEMORY.md` | 매 호출 | 한 도메인의 작업들에 걸쳐 유지되는 지속적 도메인 사실 |
| 컨텍스트 구성 | C6 Skills | `skills/<n>/SKILL.md`, `skills/<n>/scripts/*` | skill tool 호출 시 | 호출될 때만 컨텍스트에 실리는 전문 절차. 필요 없는 작업에서는 비용이 0이다 |
| 도구 인터페이스 | C4 Tool guidance | `tool_descriptions/tool_guidance.md` | 매 호출 | 기존 도구 각각을 언제 어떻게 쓸지 |
| 도구 인터페이스 | C7 Scripts | `scripts/<name>.py` | bash로 실행 | 토큰 단위 추론 대신 실행되는 새 결정적 기능 |
| 오케스트레이션 | C5 Subagents | `sub_agents/<n>/AGENT.md` | task tool | 자기 context window에서 일하고 결과만 돌려주는 위임 작업자. 추론 컨텍스트를 추가하는 유일한 구성 요소 |
| 미들웨어 제어 | C8 Plugin | `plugin/<name>.ts` | tool loop 내부 | tool call과 턴 경계를 감싸는 훅. 행동을 지시하지 않고 강제한다 |

평가 설정은 정답이나 레이블된 검증 피드백이 없는 개방형 작업 N개의 스트림 q1, ..., qN이다. 각 작업은 공통 execution harness H0에서 출발하며, 파이프라인은 최종 산출물을 내기 전 정해진 예산 안에서 현재 작업을 다시 실행할 수 있다.

### 3.2 정의

recursive self-improvement(RSI)는 실행 결과와 내부 성찰을 자기 자신에 대한 지속적 변경으로 바꾸고, 그 변경이 이후 개선의 생성, 평가, 보존 방식에도 영향을 주는 능력이다(Duan et al., 2026). 변경 대상은 모델 가중치(self-rewarding LM), 개선 프로그램(STOP), 에이전트 코드(Darwin Gödel Machine) 등이며, harness도 대상이 될 수 있다(Agent = Model + Harness, Weng 2026).

> 정의: recursive agent harnessing은 두 recursive 갱신을 결합한다. 작업 수준 recursion은 생성된 harness와 실행 증거로 현재 execution harness를 정제하고, harnessing 수준 recursion은 각 작업 뒤 채택된 harness와 개선 경험으로 이 정제를 이끄는 improvement harness를 갱신한다.

execution harness는 개선 대상 시스템이고 improvement harness는 그것을 개선하는 메커니즘이다. improvement harness는 작업 수준 recursion 동안 고정되고, 작업이 끝난 뒤 harness improvement library를 통해 갱신된다.

### 3.3 대조형 개선 단계 (Propose, Probe, Compose)

실행 기록 e=(τ, y)는 trajectory τ와 산출물 y로 이뤄진다. 개선 연산 Φ는 현재 execution harness H와 작업 로컬 실행 및 개선 이력 E에 적용된다.

(H′, e′, ξ) = Φ(q_t, H, E; R_t)   (식 1)

출력은 후속 harness H′, 그 실행 기록 e′, 단계 기록 ξ(참조 실행, 후보 harness와 probe, 합성 결정, 후속 실행)이다. improvement harness R_t는 작업 내내 고정이다.

| 단계 | 하는 일 | 핵심 원칙 |
|---|---|---|
| Propose | 참조 실행 e0를 얻은 뒤 작업, 현재 harness, 참조, 이력, library를 조건으로 후보 두 개를 만든다. invariant 후보는 계획, tool use, 컨텍스트 관리, delegation처럼 도메인을 넘어 반복될 에이전트 결함을 겨냥하고, domain 후보는 현재 도메인이나 환경의 지식, 절차, 제약을 겨냥한다 | 참조 실행은 harness가 어떻게 동작하는지 보여 줄 뿐 산출물이 맞는지는 말해 주지 않는다. library의 구성 요소를 재사용하거나 변형할 수 있으나 작업 고유 사실은 현재 증거로 재확인한다 |
| Probe | 각 후보를 같은 작업, 같은 모델과 환경 설정으로 실행하고 trajectory와 산출물을 참조 실행과 비교해 behavioral contrast를 얻는다 | contrast는 편집이 겨냥한 결함을 완화했는지, 관련 행동을 그대로 뒀는지, 회귀를 일으켰는지에 대한 증거다. 실행 확률성과 모델 공통 편향 때문에 정답 검증으로 쓰지 않고 합성의 근거로만 쓴다 |
| Compose | 참조, 후보 harness, 현재 harness 대비 diff, 모든 작업 로컬 증거를 읽고 후속 H′를 만든다 | 지지받는 변경 병합, 충돌 편집 수정, 후보 하나 채택, 현재 harness 유지 중 선택한다. 각 결정은 기대 점수 상승이 아니라 구체적 관찰에 묶인다. 합성된 harness를 실행해 e′를 얻고 결정과 증거를 ξ에 기록한다 |

### 3.4 병렬 recursion과 순차 recursion

양의 정수 k가 탐색 예산을 정한다. 병렬에서는 범위(scope)당 후보 k개와 합성 k개, 순차에서는 연쇄 단계 k개다.

| 형태 | 절차 | 계보 |
|---|---|---|
| 병렬 recursion | 현재 harness의 참조 실행 k개를 모으고, invariant 후보 k개와 domain 후보 k개를 독립적으로 제안하고 probe한다. 참조 실행 집합 B와 후보 풀 P(후보 harness와 실행 기록의 쌍)를 독립 합성 세션 k개가 각각 전부 받아 H′_j = Compose_j(q_t, H, B, P; R_t), j = 1, ..., k (식 2)를 만들고 각각 실행한다 | RSA(recursive self-aggregation, Venkatraman et al., 2025)의 집계 원리를 추론 출력이 아니라 실행 가능한 harness와 그 행동 결과에 적용한다. 구현은 population 갱신 1회이며 k는 깊이가 아니라 폭을 정한다 |
| 순차 recursion | H(0)=H0에서 시작해 대조 단계 k개를 잇는다. (H(r), e(r), ξ(r)) = Φ(q_t, H(r-1), E(r-1); R_t), r = 1, ..., k (식 3). 초기 이력은 base 실행 k개이며 단계마다 ξ(r)가 추가된다 | Self-Refine(Madaan et al., 2023)의 반복 정제를 execution harness에 적용한다. 뒤 단계는 앞 단계의 변경을 유지, 수정, 교정할 수 있다 |

**최종 선택**: k>1이면 agentic selector가 익명화된 산출물을 작업 요청과 원자료에 대조해 기존 출력 하나를 고른다. selector는 출력을 만든 harness를 보지 못하고 새 내용을 합성하지 않는다. 그 출력에 대응하는 harness를 H★_t로 표기하며, 별표는 검증된 최적이 아니라 채택을 뜻한다. k=1이면 두 형태 모두 기본 대조 단계로 줄고 선택을 건너뛴다.

### 3.5 harnessing 수준 recursion

| 단계 | 내용 |
|---|---|
| 개선 과정 성찰 | 산출물 반환 뒤 전체 개선 기록 D_t(참조 실행, 후보와 probe, 합성 결정, 선택 결과)를 검토해 어떤 변경이 어떤 조건에서 관찰된 결함을 해결했고 어떤 결과를 냈는지 교훈을 뽑는다. 교훈은 실행 contrast가 뒷받침할 때만 남긴다. 출력이 선택됐다는 사실만으로는 전이 가능성이 성립하지 않는다 |
| improvement harness 갱신 | R_{t+1} = Update(R_t, H★_t, D_t) (식 4). library 항목 하나는 실행 가능한 harness 전체와 적용 상황, 교훈, 근거를 적은 `EXPERIENCE.md`로 이뤄지고, 인덱스로 이후 세션이 관련 항목을 필요할 때 찾아본다. 증거가 부족하면 새 경험 항목을 추가하지 않는다 |
| 이후 개선에서 재사용 | 다음 작업은 다시 공통 H0에서 출발하지만 정제는 갱신된 R_{t+1}이 이끈다. 이전 구성 요소는 자동 상속되지 않고 Propose에서 선택적으로 재사용, 변형된다. 누적 경험은 Probe와 Compose에도 영향을 준다. 모델 가중치, 단계별 지시, 결정 규칙은 고정되고 library만 변한다 |

### 3.6 구현 세부 (부록 D)

- 실행자: 고정된 모델을 상용 코딩 에이전트 안에 둔다. 초기 harness는 그 에이전트의 기본 설정에 벤치마크 참조 지시를 더한 것이다. OpenCode에서는 표의 구성 요소 트리가 편집 표면이고, Codex에서는 매 호출 텍스트가 `AGENTS.md`에 있고 나머지는 같다. 기본 harness의 매 호출 파일은 벤치마크 지시 외에 비어 있고, 필요 시 로드되는 디렉토리는 레버 이름만 적은 placeholder를 둔다. placeholder가 있어야 편집자가 그 구성 요소의 존재를 안다. rollout은 모델 턴 200회, 3,600초 상한이며(WorkBuddy-Bench는 컨테이너 타임아웃을 벤치마크 기본값의 두 배로) 다른 작업의 메모리 없이 실행된다.
- 역할: 편집자와 selector는 Claude Opus 4.8이 OpenCode 아래 high reasoning effort의 agentic 세션으로 수행한다. 증거는 프롬프트에 인라인하지 않고 작업 디렉토리의 파일로 넘긴다. 채점 판정, rubric, 점수가 든 디렉토리는 guard가 넘기지 않는다. 유효하지 않은 트리(trigger 문장 없는 스킬, 컴파일 안 되는 스크립트, 스킬이 부르지만 포함하지 않은 helper)를 내면 validator 메시지와 함께 한 번 재시도하고, 다시 실패하면 시작 트리를 물려받고 fallback을 기록한다.
- library: 벤치마크 도메인마다 library 디렉토리가 따로 있고, 도메인 안에서는 작업이 순서대로 실행되며 앞선 항목만 읽는다. 항목은 채택된 트리 전체와 `EXPERIENCE.md`(왜 그 harness가 골랐고 어떤 반복 약점을 다뤘는지)이며 인덱스가 전 항목을 나열한다. 실행 가능한 구성 요소는 산문 요약이 아니라 그대로 보존된다.

### 3.7 단계별 프롬프트 (부록 H)

모든 improver 세션은 agentic이며 `context/` 디렉토리의 작업, 현재 harness, trajectory, 산출물, library를 읽는다. 어떤 프롬프트도 rubric, 점수, 채점자를 언급하지 않고, 각 프롬프트가 그런 것이 컨텍스트에 없다고 명시한다.

| 프롬프트 | 역할 | 주요 지시 |
|---|---|---|
| 1. Harness Editor (invariant) | 에이전트가 어떻게 일하는가(INV) 담당 | 워크플로의 가장 이른 이탈을 고치고 실패를 가장 싼 구성 요소에 매칭한다. tool 오류는 원인 구분과 한 번의 fallback, 반복 작업은 스크립트, 좁은 다단계 절차는 trigger를 둔 스킬, 명확한 산문이 반복적으로 무시될 때만 방어용 plugin, 일반 순서 문제는 짧은 매 호출 지침. 작업 공간에서 검증된 사실(파일 간 key 대응, 단위 등)은 절차가 아니라 사실 그대로 적는다 |
| 2. Harness Editor (domain) | 실무자가 아는 것(DOM) 담당 | 분석 동작, artifact 계약, 결정 규칙을 점검 가능한 규칙으로 만든다. 트리거가 있는 도메인 지식은 스킬이 기본 위치다. 권위, 식별자, 표준, 인용을 지어내지 않는다 |
| 3. Composer (병렬) | 최종 harness 합성 | base rollout k개는 한 분포의 표본이므로 집합으로 읽는다. 1/k에서만 보인 결함은 잡음이다. 후보는 rollout이 하나뿐이라 결과 하나는 약한 증거다. 산출물을 못 낸 rollout과 연관된 편집은 위험으로 취급한다. MERGE, ADOPT ONE, KEEP_BASE 중 고르며 KEEP_BASE도 정당한 답이다 |
| 4. Composer (순차) | 병렬 프롬프트와 네 구절만 다르다 | 정제된 harness와 누적 증거를 다음 단계로 넘긴다 |
| 5. Terminal aggregator | n개 실행 상태 중 맹목 선택 | 후보 id는 무작위다. 수정되지 않은 harness의 출력을 고르는 것도 정상이다. 판단 순서는 DELIVERY(요청한 산출물이 경로, 형식대로 있는가), CONFORMANCE(요청한 것만 있는가, 추가 열이나 시트는 일탈), FIDELITY(`context/source/` 대조) 순이다 |
| 6. Experience Reflector | 편집 귀속과 library 항목 1개 작성 | 채택된 후보만이 증거가 아니다. 후보마다 base 대비 diff를 떠 구성 요소별로 helped, hurt, no observed effect, confounded 판정을 단다. 여러 구성 요소를 한꺼번에 바꿨거나 rollout 하나만 근거면 confounded를 우선한다. 전이 가능한 교훈은 최대 1개만 쓰고 근거가 없으면 NO_ENTRY를 쓴다 |

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 실험 설정

| 벤치마크 | 구성 | 평가 |
|---|---|---|
| WorkBuddy-Bench (Tencent) | Code 80개(역할 5종), Web 70개(범주 7종), Office 50개. 범주별로 절반씩 나눠 test 절반(40, 35, 25개)을 보고 | 컨테이너 안 복합 verifier(숨은 테스트, 파일과 구조 검사, LLM/VLM 판정 항목, 판정 모델 Gemini 3.5 Flash). 통과한 검사 비율이 점수 |
| JobBench | 직업 도메인 7종의 전문 작업 65개. 31/34 고정 분할의 test 34개 | Claude Opus 4.8이 가중 rubric으로 채점. rubric은 실행자, 편집자, selector 누구에게도 보이지 않는다 |
| LAB (Harvey Legal Agent Benchmark) | 실무 분야 24개, 작업 유형 4개(analyse, draft, review, research)의 법률 작업 1,251개. Niklaus(2026)의 분할로 100개 test, 24개 dev | Claude Sonnet 4.6 판정, 기준별 통과율(Partial) 보고 |

- 실행자: Gemini 3.5 Flash, GLM-5. 초기 harness: OpenCode, Codex. 조합 4가지.
- 기본 편집자: Claude Opus 4.8 (OpenCode 아래).
- 주 표는 k=1 단일 단계, "+ Recursion"은 k=5 병렬 recursion의 평균 변화량.
- library는 벤치마크 스트림마다 빈 상태로 시작해 작업마다 갱신된다. 결과는 작업 순서를 섞은 독립 스트림 3회의 평균과 표준편차. #Steps는 실행자 세션의 모델 턴 수.

| baseline | 내용 |
|---|---|
| Base harness | 초기 harness 그대로 |
| ReasoningBank | harness 고정. 같은 도메인의 가장 유사한 과거 작업 메모리 항목(최대 3개, gemini-embedding-001)을 프롬프트 앞에 붙이고, 작업 뒤 답 없는 self-judge가 성공 여부를 표시해 trajectory에서 항목을 최대 3개 distillation으로 뽑는다. k>1이면 memory-aware test-time scaling 사용 |
| Meta-Harness† | 오프라인 방법. training 분할로 harness 코드를 탐색해 최선을 배포한다. WorkBuddy-Bench와 JobBench는 training 절반, LAB는 dev 24개를 탐색 집합으로 반복 10회, 반복당 후보 2개, 작업당 반복 실행 3회, margin 0.01 |
| Harness Scaling | 작업마다 독립적으로 추가 추론 예산을 harness 수정에 쓴다. base rollout 1회 뒤 k번 수정 세션과 재실행. 범위 분리, 집계, library 없음 |
| Best-of-k | base harness를 k번 실행하고 같은 selector가 고른다 |

### 4.2 WorkBuddy-Bench 결과 (Table 1, Score, 괄호는 표준편차)

| 실행자 | 초기 harness | 방법 | Code | Web | Office | 평균 | 평균 #Steps |
|---|---|---|---|---|---|---|---|
| Gemini 3.5 Flash | OpenCode | Base | 73.4 (3.6) | 69.9 (4.2) | 74.0 (2.2) | 72.4 (0.9) | 25.4 |
| | | ReasoningBank | 72.6 | 70.7 | 76.8 | 73.4 | 24.9 |
| | | Meta-Harness† | 75.5 | 75.1 | 78.6 | 76.4 | 28.8 |
| | | Harness Scaling | 74.0 | 74.0 | 77.9 | 75.3 | 22.3 |
| | | Harness² | 76.5 (1.3) | 76.4 (4.5) | 79.5 (3.1) | 77.5 (2.5) | 21.9 |
| | | + Recursion | +4.3 | +1.9 | +3.9 | +3.3 | -0.8 |
| Gemini 3.5 Flash | Codex | Base | 74.0 | 72.5 | 77.0 | 74.5 | 28.3 |
| | | ReasoningBank | 73.5 | 65.7 | 78.4 | 72.5 | 29.2 |
| | | Meta-Harness† | 74.6 | 67.8 | 77.6 | 73.3 | 28.6 |
| | | Harness Scaling | 75.5 | 69.3 | 76.7 | 73.8 | 30.0 |
| | | Harness² | 79.4 | 74.7 | 78.5 | 77.5 | 23.9 |
| | | + Recursion | +1.6 | +2.6 | +4.3 | +2.9 | -0.2 |
| GLM-5 | OpenCode | Base | 58.4 | 59.2 | 75.1 | 64.2 | 13.5 |
| | | ReasoningBank | 63.3 | 61.4 | 72.0 | 65.6 | 14.4 |
| | | Meta-Harness† | 69.0 | 61.9 | 78.1 | 69.7 | 15.3 |
| | | Harness Scaling | 60.3 | 63.4 | 79.8 | 67.8 | 12.6 |
| | | Harness² | 77.1 | 69.1 | 80.8 | 75.7 | 13.7 |
| | | + Recursion | +4.8 | +5.3 | +1.7 | +3.9 | -2.7 |
| GLM-5 | Codex | Base | 56.8 | 59.6 | 76.9 | 64.4 | 23.3 |
| | | ReasoningBank | 50.2 | 66.3 | 75.8 | 64.1 | 21.1 |
| | | Meta-Harness† | 76.8 | 67.8 | 77.9 | 74.2 | 29.7 |
| | | Harness Scaling | 49.5 | 60.9 | 78.2 | 62.9 | 21.7 |
| | | Harness² | 74.9 | 70.0 | 81.1 | 75.3 | 21.3 |
| | | + Recursion | +2.3 | +3.3 | +3.2 | +3.0 | -1.3 |

### 4.3 JobBench와 LAB 결과 (Table 2)

| 실행자 | 방법 | OpenCode JobBench | OpenCode LAB Partial | Codex JobBench | Codex LAB Partial |
|---|---|---|---|---|---|
| Gemini 3.5 Flash | Base | 31.5 | 79.9 | 33.9 | 71.6 |
| | ReasoningBank | 30.8 | 77.3 | 30.2 | 74.8 |
| | Meta-Harness† | 35.8 | 81.6 | 34.8 | 76.5 |
| | Harness Scaling | 32.9 | 78.9 | 33.6 | 67.9 |
| | Harness² | 36.0 | 81.9 | 35.3 | 75.6 |
| | + Recursion | +3.0 | +2.6 | +4.2 | +2.9 |
| GLM-5 | Base | 20.6 | 59.6 | 23.6 | 58.1 |
| | ReasoningBank | 20.7 | 71.3 | 22.8 | 63.8 |
| | Meta-Harness† | 20.9 | 60.0 | 23.9 | 59.0 |
| | Harness Scaling | 19.3 | 67.8 | 17.5 | 63.7 |
| | Harness² | 24.2 | 71.4 | 24.8 | 65.9 |
| | + Recursion | +4.2 | +6.7 | +3.1 | +4.8 |

#Steps(OpenCode 기준 JobBench/LAB): Gemini Base 63.6/29.0, Harness² 69.3/33.0. GLM-5 Base 20.0/13.6, Harness² 23.6/15.8. Codex 기준: Gemini Base 53.6/49.8, Harness² 54.5/44.2. GLM-5 Base 22.3/16.5, Harness² 25.3/22.3.

### 4.4 주요 관찰

- 단일 단계가 네 설정 모두에서 두 실행자를 개선한다. WorkBuddy-Bench에서 GLM-5와 OpenCode 조합의 평균이 11.5점(64.2에서 75.7) 올라 이 벤치마크 최대 단일 단계 이득이다. JobBench 최대 이득은 4.5점(Gemini, OpenCode), LAB Partial 최대 이득은 11.8%p(GLM-5, OpenCode, 59.6%에서 71.4%)다.
- ReasoningBank는 코딩 작업에서 base보다 최대 6.6점 낮다(GLM-5, Codex, Code 56.8에서 50.2). Harness Scaling은 벤치마크와 설정 쌍 12개 중 7개에서 base보다 낮다.
- Harness²는 WorkBuddy-Bench 평균과 JobBench 점수에서 네 설정 모두 baseline을 앞선다. LAB Partial에서는 Gemini와 Codex 조합에서 Meta-Harness(76.5%)가 Harness²(75.6%)보다 높다.
- 약한 실행자가 WorkBuddy-Bench와 LAB에서 더 큰 절대 이득을 얻는다. 단일 단계 뒤 GLM-5가 OpenCode 75.7, Codex 75.3으로 각 설정의 base Gemini(72.4, 74.5)를 넘는다. 즉 개선된 harness를 쓴 약한 모델이 원래 harness를 쓴 강한 모델을 앞설 수 있다. JobBench에서는 반대로 Gemini가 4.5점과 1.4점, GLM-5가 3.6점과 1.2점을 얻는다.
- k=5 병렬 recursion은 단일 단계 대비 WorkBuddy-Bench 2.9~3.9점, JobBench 3.0~4.2점, LAB Partial 2.6~6.7%p를 더한다. JobBench에서 OpenCode와 Codex 사이 초기 격차(Gemini 2.4점, GLM-5 3.0점)는 둘 다 0.5점으로 줄었다. WorkBuddy-Bench에서 Gemini 격차는 2.1점에서 0.4점으로 줄었으나 GLM-5 격차는 0.2점에서 1.3점으로 커졌다. 따라서 recursion이 초기 harness 간 격차를 일률적으로 좁히지는 않는다.

### 4.5 분석 (4절)

**예산 효과 (Figure 5)**: WB-code와 WB-office에서 병렬과 순차 모두 k=1에서 5까지 단조 증가한다. 병렬은 Code 76.5에서 80.8, Office 79.5에서 83.4로 오른다. ReasoningBank는 등락하고 Harness Scaling은 k=2에서 3으로 갈 때 두 도메인 모두 하락한다. k=2의 Harness² 두 형태가 k=5의 모든 baseline보다 높다. k=5에서는 병렬이 순차보다 높고, k=2 Code에서는 순차가 높다. 테스트 시점 탐색 증가만으로는 성능 향상이 보장되지 않는다.

**연산 대비 성능 (Figure 6)**: 최종 산출물 제출 전 사용한 모든 토큰(실행과 개선 비용 포함)을 센다. Harness² 두 설정이 경험적 Pareto 경계에 놓인다. Gemini와 OpenCode에서 k를 1에서 5로 늘리면 base 대비 이득이 JobBench 4.5점에서 7.5점, WorkBuddy-Bench 5.1점에서 8.4점으로 커진다. Meta-Harness는 k=5 Harness²보다 연산을 더 쓰고 성능은 낮다.

**Ablation (Table 3, Gemini 3.5 Flash, OpenCode, k=1)**:

| 설정 | WorkBuddy | JobBench | 설명 |
|---|---|---|---|
| Harness² | 77.5 | 36.0 | 전체 |
| w/o library | 74.4 (-3.1) | 34.2 (-1.8) | 작업마다 개선하되 library를 읽지도 쓰지도 않는다 |
| w/o scoping | 74.6 (-2.9) | 32.3 (-3.7) | invariant와 domain 편집자 대신 범위 없는 일반 편집자 2개. 후보 수와 예산은 같다 |
| w/o composition | 75.9 (-1.6) | 34.1 (-1.9) | 후보 둘을 probe한 뒤 합성 없이 증거가 지지하는 쪽을 반환 |

**harnessing 수준 recursion (Figure 7)**: 참조 실행, 후보 probe, library 없이 base execution harness를 직접 고치면 Code 73.4에서 63.2, Web 69.9에서 65.0으로 떨어진다. k=1로 쌓은 library를 쓰면 base 수준으로 회복되고(Code 73.8, Web 72.6, Office 77.5. 이 조건에서 library 없음의 Office는 77.1로 base 74.0보다 높다), k=5로 쌓은 library는 Code, Web, Office에서 0.9, 4.4, 5.1점 이득을 준다(74.3, 74.3, 79.1). 즉 작업 수준 탐색이 클수록 이후 probe 없이도 harnessing이 좋아진다. JobBench에서 만든 library는 WorkBuddy-Bench 단일 단계를 0.6, 0.5, 2.9점 개선한다(77.1, 76.9, 82.4). 자기 항목을 뺀 leave-one-out 재실행은 WorkBuddy-Bench 1.9점(77.5에서 79.4), JobBench 1.7점(36.0에서 37.7) 이득이다. 이 재실행은 이후 작업의 경험도 볼 수 있으므로 온라인 이득 추정이 아니라 오프라인 재사용 분석이다.

**같은 모델이 실행자와 편집자 (Figure 8, OpenCode, k=2)**: GLM-5부터 Claude Opus 5까지 5개 모델 모두 모든 벤치마크에서 개선된다. Opus 5는 WorkBuddy-Bench, JobBench, LAB에서 3.3, 5.5, 3.0점, GLM-5는 LAB에서 13.7점 오른다. 그림의 세부 수치: WorkBuddy-Bench GLM-5 64.2에서 68.3, 3.5 Flash 72.4에서 78.3, 3.7 Flash 78.3에서 80.4, Opus 4.8 76.6에서 80.7, Opus 5 78.9에서 82.2. harness 정제가 더 강한 편집자에 의존하지 않는다는 근거다.

**사례 (Figure 9, JobBench Producers task1, Gemini 3.5 Flash, OpenCode)**: base 점수 43.1. trajectory를 보면 지식 부족이 아니라 절차 실패였다. 원본 파일들 사이 수치를 대조하지 않았고, 작성한 출력을 다시 열어 확인하지 않았다. invariant 개입은 가드레일(모든 입력을 `scripts/inspect_inputs.py`로 목록화, 수치를 권위 있는 원본까지 추적, 끝내기 전 `scripts/verify_outputs.py`로 산출 파일 재확인, "파일이 존재한다는 확인은 내용이 맞다는 확인이 아니다")과 스크립트로 들어갔고, domain 개입은 일정, 장소, 인력, 예산 파일 대조 절차를 담은 스킬(4,942B)과 숫자 문자열("$50", "1,200") 처리법을 담은 tool guidance(645B)로 들어갔다. Composer가 네 편집을 모두 유지했고 재실행은 77.8점(+34.7점)을 얻었다.

### 4.6 부록 E 추가 분석

**구성 요소 기여 (Table 6, Gemini 3.5 Flash, OpenCode, k=5)**: 정제된 harness에서 구성 요소 묶음을 빼고 개선 없이 재평가한다.

| 설정 | Code | Web | Office | 평균 |
|---|---|---|---|---|
| Base harness | 73.4 | 69.9 | 74.0 | 72.4 |
| Harness² (full) | 80.8 | 78.3 | 83.4 | 80.8 |
| w/o prompt 계열 | 78.8 | 76.0 | 83.1 | 79.3 |
| w/o skills | 77.2 | 71.4 | 77.9 | 75.5 |
| w/o scripts | 79.3 | 76.0 | 76.0 | 77.1 |

스킬 제거가 Code와 Web에서 가장 큰 손실(3.6점, 6.9점), 스크립트 제거가 Office에서 가장 큰 손실(7.4점)이다. 평균 손실은 스킬 5.3점, 스크립트 3.7점, 프롬프트 계열 1.5점이며, 제거한 harness도 모두 base보다 높다. 효과가 가산적이라는 증거는 아니다.

**library 재사용 (Figure 10)**: 수정된 파일 중 library 출처가 있는 비율은 LAB와 WB-office 22%, JobBench 47%다. 라인의 절반 이상을 항목에서 그대로 가져온 파일은 2~10%뿐이라 복사보다 변형이 흔하다. 스킬과 스크립트가 각 벤치마크 편집의 약 절반을 차지한다.

**모델 간 전이 (Figure 12)**: Gemini 3.5 Flash용 harness를 그대로 GLM-5, Gemini 3.7 Flash, Claude Opus 4.8에 적용하면 세 모델 모두 Code와 Office가 오른다. GLM-5 Code 17.3점(58.5에서 75.8), Gemini 3.7 Flash Code 0.3점과 Office 6.4점, Opus 4.8 2.6점과 1.1점이다.

**tool 사용 신뢰성 (Table 7, k=1)**:

| 벤치마크 | Base tool call | Harness² tool call | Base 오류율 | Harness² 오류율 |
|---|---|---|---|---|
| WorkBuddy-Bench | 20.0 | 17.8 (-11.0%) | 0.8% | 0.5% (-37.5%) |
| JobBench | 27.4 | 32.8 (+19.7%) | 14.4% | 9.1% (-36.8%) |
| LAB | 20.8 | 25.2 (+21.2%) | 2.0% | 1.6% (-20.0%) |

오류율은 세 벤치마크 모두 떨어지고, 호출 수는 WorkBuddy-Bench에서 줄고 JobBench와 LAB에서 는다. 정제가 실행을 짧게 만들지 않고도 성능을 높일 수 있다는 뜻이다.

**상용 harness 비교 (Figure 13)**: Gemini 3.5 Flash를 수정하지 않은 CodeBuddy, OpenCode, Codex, Claude Code에 넣으면 어느 harness도 모든 도메인에서 1위가 아니다(Claude Code는 Code 76.2와 Office 78.5, Codex는 Web 72.5로 가장 높다). OpenCode에서 출발한 Harness²(k=5)는 가장 강한 고정 harness를 Code, Web, Office에서 4.6, 5.8, 4.9점 앞서고, 출발 harness 대비로는 7.4, 8.4, 9.4점 높다. 단 정제에는 테스트 시점 연산이 추가로 든다.

**실패 분석 (Figure 14)**: 참조보다 낮아진 9건을 세 범주로 나눈다.

| 범주 | 사례 | 점수 변화 | 원인 |
|---|---|---|---|
| 맹목 선택이 약한 후보를 고름 | WB-code python_port | 96에서 55 (-41) | 95, 85, 85, 80, 55점 후보 중 "가장 완전하고 평이한 구현"이라며 55점을 고름 |
| | WB-web ui-state-rebuild | 100에서 70 (-30) | 다섯 중 넷이 100점인데 다섯째를 고름. 정적 검사 1개가 결정 |
| | LAB tax transfer pricing | 54에서 26 (-28) | 기준은 coverage를 보상하는데 selector는 precision을 우선 |
| 편집 자체가 후보 풀 상한을 막음 | WB-code header injection | 50에서 42 (-8) | "key는 이름 그대로 저장, 고치지 말 것" 규칙을 후보 넷이 모두 물려받음. 참조는 소문자화가 정답 |
| | WB-code validator cache | 75에서 64 (-11) | id() 기반 캐시면 충분하다는 가정. 편집자가 쓴 검사 스크립트는 편집자의 가정을 잡지 못함 |
| | LAB tax notice of deficiency | 83에서 81 (-2) | 채점 불가능한 기본 trajectory에서 distillation으로 얻은 사전 판단이 규칙이 됨 |
| 편집도 선택도 아님 | JobBench web administrators | 31에서 24 (-7) | 전부 아니면 전무인 기준 하나에서의 샘플링 변동 |
| | WB-web particle boundary | 44에서 10 (-34) | 판정 세션 3개가 판정 없이 끝나 실패로 집계. harness 결함이 아닌 judge 장애 |
| | JobBench court clerks | 16에서 8 (-8) | PDF 양식 작성 스킬은 작동했으나 그 PDF를 읽는 기준이 없었고 132단계 중 85단계를 소비 |

정량적으로는 선택 실패(WB-code에서 95점 대신 55점 출력 선택, LAB에서 범위 축소로 54에서 26), 잘못된 전제의 후보 간 전파(2~11점 손실), 결과 변동성과 판정 누락이 있다. 저자들은 coverage와 precision을 균형 잡는 선택, 공유된 가정을 시험하는 probe, 편집 효과와 결과 변동을 구분하는 반복 실행을 개선 방향으로 든다.

**정성 사례 (Figure 15~19)**:

| 사례 | 진단 | 편집 | 점수 |
|---|---|---|---|
| WB Code router matching | tool call을 일반 텍스트로 써서 아무것도 실행되지 않음 | tool guidance(1,023B)에 가짜 호출 금지 | 60.0에서 100.0 |
| WB Office channel-period-compare | 집계 단위 오류, 채널 행 key 불일치 | 스킬(4,478B)로 집계 단위와 파생 필드 고정, 가드레일(1,415B)로 입력 읽기 전용과 정제 규칙 선적용 | 23.6에서 100.0 |
| WB Web | 첫 렌더 시점 상태 고정으로 재매핑과 내보내기가 낡음 | 상태 재계산 스킬, 오프라인 열람 확인 스크립트, 네트워크 의존 금지 가드레일 | 64.0에서 100.0 |
| LAB arbitration procedural order | 수정 표시가 Word 변경 추적 층에 있어 텍스트 변환 시 사라짐 | 스킬(4,851B)로 삭제는 취소선, 삽입은 굵게 본문 서식 기록, 가드레일(156B)로 redline 작업 시 스킬 로드 | 44.4에서 94.5 |
| JobBench social science RA task3 (Claude Opus 5가 실행자와 편집자 겸임) | 연구가 예산을 다 써서 마감 직전까지 파일 미작성 | 8개 구성 요소 전부 작성. plugin(3,262B)은 산출물 없이 tool call 25회가 쌓이면 tool 결과에 경고를 덧붙이고("지시는 건너뛸 수 있지만 tool 결과에 붙은 줄은 그렇지 않다"), 서브에이전트(3,795B)는 자기 컨텍스트에서 인용 가능한 작은 표만 반환, 메모리(2,696B)는 도메인 지속 사실 | 72.0에서 100.0 |

## 5. 한계와 향후 과제 (Limitations and Future Work)

**한계 (부록 F)**

- 정제 비용: 제안, probe, 합성에 추가 실행과 편집자 세션이 든다. 예산을 늘리면 추론 비용이 는다. 병렬 세션은 자원이 있으면 지연을 줄이지만 추가 연산 자체는 없애지 못한다. 실험은 제한된 예산 범위의 trade-off를 보였을 뿐 보편적 최적 배분을 정하지 않는다.
- 실행 기반 피드백: 정답 감독 없이 behavioral contrast와 모델 판단에 의존한다. 이 신호는 실행 변동성과 모델 공통 편향에 민감하고, 정확성이나 다른 작업으로의 전이를 보장하지 않는다.

**향후 방향 (부록 G)**

- improvement harness 관리: 현재는 단순 인덱스 library다. 커지면 겹치는 구성 요소 통합, 낡은 경험 수정, 현재 작업과 증거에 맞춘 retrieval 정제가 필요하다.
- 적응형 recursion: 현재는 recursion 형태와 예산을 미리 정한다. 작업 난이도와 사전 경험 관련성에 따라 탐색을 배분하거나, 추가 probe가 새 증거를 거의 내지 않으면 멈추는 방식이 가능하다.

## 6. 관련 연구 (Related Work)

| 계열 | 대표 방법 | Harness²와의 차이 |
|---|---|---|
| recursive self-improvement | Self-Refine, Reflexion, STOP, Darwin Gödel Machine, Hyperagents, MetaSkill-Evolve, MCE | 효용, 벤치마크, 검증 기반 최적화다. Harness²는 정답 피드백이나 완료 작업 재방문 없이 배포 작업 스트림에서 개선이 누적되는 방식을 다룬다 |
| 오프라인 harness 최적화 | DSPy, GEPA, ADAS, AFlow, Meta-Harness, AHE, AI4AI, DarwinX, HarnessX, HarnessCompass, HSI | 고정 training 작업과 평가 피드백으로 후보를 탐색한다. 배포 중 처음 만난 요구는 반영하지 못한다 |
| 오프라인과 테스트 시점 병행 | MemoHarness, Harness-R1, JIT-Agent, Recuris | 오프라인 준비(진단 경험 bank, 편집자 학습)를 거친다 |
| 온라인 방법 | ReasoningBank, HyperSkill, RHI(pairwise 출력 판정), Harness Scaling, TTHE(실행 유래 proxy, 배치 간 harness 전달), Evo-Harness, Adaptive Auto-Harness(지연된 결과 피드백), Continual Harness(연속 에피소드 내), HCL | Harness²는 Label 없음, 스트리밍, 스케일링 연구, improver 갱신 네 조건을 모두 갖춘 유일한 행으로 표기된다 (Table 4) |

Table 4의 비교 기준은 대상(Object), 단계(Stage: Offline, Both, Online), Label(외부 정답 감독), Streaming(작업 또는 배치 단위 한 번 통과 갱신, 완료 작업 재실행 금지), Scaling(명시적 테스트 시점 스케일링 연구), Improver Update(실행 artifact를 넘어 편집 지침이나 편집자 파라미터의 지속 갱신) 여섯 가지다. 저자들은 차별점이 스트리밍, 경험 재사용, improver 갱신 각각이 아니라 두 harness의 레이블 없는 작업 스트림 정제와 작업 수준 탐색에서 배우는 것을 결합한 데 있다고 적는다.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| harnessing | 고정된 base model 주위의 런타임 scaffold를 최적화해 그 모델이 자율 에이전트로 동작하게 하는 과정 |
| recursive agent harnessing | execution harness 정제(작업 수준)와 improvement harness 갱신(harnessing 수준)을 결합한 recursion |
| execution harness | 작업을 실제로 실행하는 harness. 구성 요소 8개(C1~C8)를 파일로 가진다 |
| improvement harness | harness 정제를 이끄는 메커니즘. 작업 중 고정되고 작업 뒤 library로 갱신된다 |
| harness improvement library | 채택된 harness 전체와 `EXPERIENCE.md`를 항목으로 쌓는 도메인별 디렉토리와 인덱스 |
| Propose, Probe, Compose | 후보 제안, 같은 조건 실행과 대조, 증거 기반 합성으로 이뤄진 대조형 개선 단계 |
| behavioral contrast | 후보 실행과 참조 실행의 trajectory와 산출물 차이. 정답 검증이 아니라 합성 근거로 쓴다 |
| invariant 후보 / domain 후보 | 도메인을 넘어 반복되는 에이전트 결함을 겨냥한 후보와 현재 도메인의 지식, 절차, 제약을 겨냥한 후보 |
| 병렬 / 순차 recursion | 후보 풀을 넓게 탐색해 독립 합성하는 방식과 정제 결과를 다음 단계로 넘겨 깊게 다듬는 방식 |
| H★_t | 최종 선택으로 채택된 harness. 별표는 검증된 최적이 아니라 채택을 뜻한다 |
| Partial | LAB의 기준별 통과율 |

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 1 | 전체 성능 막대와 예산 곡선 | caption-region | ★ wiki 권장 (result) |
| fig02 | 3 | 구성 요소 8개와 런타임 역할 | caption-region | ★ wiki 권장 (architecture) |
| fig03 | 5 | Harness² 파이프라인 | caption-region | ★ wiki 권장 (method) |
| fig04 | 6 | 병렬과 순차 recursion | caption-region | ★ wiki 권장 (method) |
| fig05 | 9 | 예산 k에 따른 점수 | caption-region | ★ wiki 권장 (result) |
| fig06 | 10 | 연산 대비 이득과 Pareto 경계 | caption-region | (선택) |
| fig07 | 11 | harnessing 수준 recursion과 library 전이 | caption-region | ★ wiki 권장 (result) |
| fig08 | 11 | 같은 모델이 실행자와 편집자 | manual | (선택) |
| fig09 | 12 | JobBench 사례 연구 | caption-region | ★ wiki 권장 (case) |
| fig10 | 23 | library 출처와 편집 분포 | caption-region | (선택) |
| fig11 | 24 | Leave-one-out 재실행 | caption-region | (선택) |
| fig12 | 24 | 모델 간 전이 | caption-region | (선택) |
| fig13 | 25 | 상용 harness 비교 | caption-region | (선택) |
| fig14 | 26 | 실패 사례 9건 | manual | ★ wiki 권장 (limitation) |
| fig15 | 27 | WB Code 사례 | caption-region | (선택) |
| fig16 | 27 | WB Office 사례 | caption-region | (선택) |
| fig17 | 28 | WB Web 사례 | caption-region | (선택) |
| fig18 | 28 | LAB 중재 사례 | caption-region | (선택) |
| fig19 | 29 | JobBench 8개 구성 요소 사례 | caption-region | (선택) |
| tab01 | 8 | WorkBuddy-Bench 주요 결과 | table-region | ★ wiki 권장 (result) |
| tab02 | 9 | JobBench와 LAB 주요 결과 | manual | ★ wiki 권장 (result) |
| tab03 | 10 | ablation | table-region | (본문 표로 대체) |
| tab04 | 19 | harness 개선 방법 비교 | table-region | (선택) |
| tab05 | 22 | 구성 요소 8개 정의 | table-region | (본문 표로 대체) |
| tab06 | 23 | 구성 요소 제거 결과 | table-region | (본문 표로 대체) |
| tab07 | 25 | tool call 수와 오류율 | table-region | (본문 표로 대체) |
