---
title: "SkillOpt: Executive Strategy for Self-Evolving Agent Skills"
type: paper
year: 2026
category: agents
source: yang-2026-skillopt-executive-strategy-for.md
raw_path: raw/papers/yang-2026-skillopt-executive-strategy-for.pdf
raw_filename: "yang-2026-skillopt-executive-strategy-for.pdf"
source_collection: external
authors: "Yifan Yang, Ziyang Gong, Weiquan Huang, Qihao Yang, Ziwei Zhou, Zisu Huang, Yan Li, Xuemei Gao, Qi Dai, Bei Liu, Kai Qiu, Yuqing Yang, Dongdong Chen, Xue Yang, Chong Luo"
arxiv_id: "2605.23904"
tags: [agent-skills, self-evolving, text-space-optimization, prompt-optimization, held-out-gate, claude-code, codex, benchmark]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/yang-2026-skillopt-executive-strategy-for/fig01.png
    raw: raw/papers/yang-2026-skillopt-executive-strategy-for-figures/fig01.png
    caption: "Figure 1 — SkillOpt 개요. Skill Space를 손실 지형으로 그려 bounded skill edits(안정)와 ad hoc updates(불안정)를 대비하고, held-out selection gate가 검증 개선 편집만 수용함을 보인다. 우측 표는 딥러닝 ↔ 텍스트공간 최적화 유추(parameter↔skill document, learning rate↔edit budget 등)."
    page: 2
    bbox_norm: [0.0, 0.0103, 0.9877, 0.355]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/yang-2026-skillopt-executive-strategy-for/fig03.png
    raw: raw/papers/yang-2026-skillopt-executive-strategy-for-figures/fig03.png
    caption: "Figure 3 — epoch checkpoint별 train rollout / selection best / unseen test 성능 추이 (SpreadsheetBench·SearchQA·LiveMath). validation gate가 일반화되는 checkpoint를 고르는지 보여준다."
    page: 12
    bbox_norm: [0.1351, 0.0669, 0.865, 0.2938]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/yang-2026-skillopt-executive-strategy-for/fig04.png
    raw: raw/papers/yang-2026-skillopt-executive-strategy-for-figures/fig04.png
    caption: "(오탐: 실제 도식 아님) p.14의 Table 5(optimizer strength) + Table 6(compactness·edit economy·cost/pt) 표 페이지. 본문 'shown in Figure 4.' 상호참조에 캡션 정규식이 매칭됨."
    page: 15
    bbox_norm: [0.1139, 0.0672, 0.8861, 0.2595]
    strategy: caption-region
    curated: false
  - id: tab01
    label: Table 1
    kind: table
    file: assets/yang-2026-skillopt-executive-strategy-for/tab01.png
    raw: raw/papers/yang-2026-skillopt-executive-strategy-for-figures/tab01.png
    caption: "Table 1 Main results on held-out test splits. Scores are percentages; within each model–harness block, bold marks the best measured entry and underlining marks the second-best entry for each benchmark. Blue cells denote SkillOpt , and small green/red subscripts show the absolute change relative to t"
    page: 7
    bbox_norm: [0.1042, 0.0675, 0.8976, 0.8539]
    strategy: table-region
    curated: false
  - id: tab02
    label: Table 2
    kind: table
    file: assets/yang-2026-skillopt-executive-strategy-for/tab02.png
    raw: raw/papers/yang-2026-skillopt-executive-strategy-for-figures/tab02.png
    caption: "Table 2 Hyperparameter analysis for the text optimizer. Each panel changes one scalar or scheduling factor from the default setting unless noted. Panel (a) fixes the split to 4 : 1 : 5 train/selection/test; the 1-example, 20%, 40%, and 80% rows use subsets of the training partition, and the 100% row"
    page: 8
    bbox_norm: [0.1122, 0.0759, 0.8847, 0.2296]
    strategy: table-region
    curated: false
  - id: tab03
    label: Table 3
    kind: table
    file: assets/yang-2026-skillopt-executive-strategy-for/tab03.png
    raw: raw/papers/yang-2026-skillopt-executive-strategy-for-figures/tab03.png
    caption: "Table 3 Component ablations for learning-rate form, rejected buffer, and epoch-wise slow/meta update. Light-blue rows mark the default setting within each component group; the learning-rate group uses the default lr=4 setting. Bold values mark the best measured result within that group and benchmark"
    page: 8
    bbox_norm: [0.1351, 0.2993, 0.8649, 0.4385]
    strategy: table-region
    curated: false
  - id: tab04
    label: Table 4
    kind: table
    file: assets/yang-2026-skillopt-executive-strategy-for/tab04.png
    raw: raw/papers/yang-2026-skillopt-executive-strategy-for-figures/tab04.png
    caption: "Table 4 Transfer of optimized skills across three axes. (a) Cross-model : a skill optimized for the source model is deployed on the target model. (b) Cross-harness : a skill trained inside the source harness is evaluated inside the target harness, all on GPT–5.5. (c) Cross-benchmark : the source ben"
    page: 9
    bbox_norm: [0.1235, 0.0676, 0.8765, 0.3834]
    strategy: table-region
    curated: false
  - id: tab05
    label: Table 5
    kind: table
    file: assets/yang-2026-skillopt-executive-strategy-for/tab05.png
    raw: raw/papers/yang-2026-skillopt-executive-strategy-for-figures/tab05.png
    caption: "Table 5 Effect of optimizer strength. Each (benchmark, target) pair is optimized either by a strong frontier optimizer (GPT–5.5, bolded) or by a target-matched optimizer that shares the target model; everything else in the SkillOpt loop is held fixed. Gains over the target’s no-skill baseline are sh"
    page: 14
    bbox_norm: [0.1381, 0.0675, 0.8619, 0.1632]
    strategy: table-region
    curated: false
  - id: tab06
    label: Table 6
    kind: table
    file: assets/yang-2026-skillopt-executive-strategy-for/tab06.png
    raw: raw/papers/yang-2026-skillopt-executive-strategy-for-figures/tab06.png
    caption: "Table 6 Cost and edit economy of the GPT–5.5 / GPT–5.5 (student / teacher) skill runs. Initial and final best_skill.md lengths are in tokens; Edits is the number of accepted bounded updates; Cost / pt is training tokens per absolute test-point gain. One representative learned rule per benchmark is s"
    page: 14
    bbox_norm: [0.214, 0.247, 0.786, 0.3612]
    strategy: table-region
    curated: false
  - id: fig02
    label: (legacy)
    kind: figure
    file: assets/yang-2026-skillopt-executive-strategy-for/fig02.png
    raw: raw/papers/yang-2026-skillopt-executive-strategy-for-figures/legacy/fig02.png
    caption: "Figure 2 — SkillOpt 파이프라인. rollout batch → minibatch reflection(성공/실패) → add/delete/replace 편집 → batch-level merge → edit budget 랭킹/클립 → validation gate → best_skill.md. 하단은 epoch-wise slow/meta update(improvements·regressions·persistent failures·stable successes)."
    page: 4
    bbox_norm: [0.0, 0.0, 1.0, 1.0]
    strategy: legacy-page-region
    low_confidence: true
    curated: true
  - id: fig05
    label: (legacy)
    kind: figure
    file: assets/yang-2026-skillopt-executive-strategy-for/fig05.png
    raw: raw/papers/yang-2026-skillopt-executive-strategy-for-figures/legacy/fig05.png
    caption: "Figure 4 — benchmark별 대표 학습 규칙 1개씩(SearchQA·SpreadsheetBench·OfficeQA·DocVQA·LiveMath·ALFWorld). best_skill.md에서 그대로 발췌한, instance-specific이 아닌 procedural 규칙들."
    page: 15
    bbox_norm: [0.0, 0.0, 1.0, 1.0]
    strategy: legacy-page-region
    low_confidence: true
    curated: true
---

# SkillOpt: Executive Strategy for Self-Evolving Agent Skills

## 요약 (Summary)

SkillOpt은 frozen agent의 skill 문서를 딥러닝 옵티마이저의 규율로 훈련한다. Microsoft 등이 내놓은 첫 체계적 controllable text-space optimizer다. 별도 optimizer 모델이 채점된 rollout을 bounded add/delete/replace 편집으로 바꾸고, held-out validation gate가 검증 점수를 엄격히 올리는 편집만 받아들인다. 가중치는 얼린 채로 300~2,000 토큰짜리 `best_skill.md` 한 장만 배포하니, 추론 시점의 모델 호출도 늘지 않는다. 6개 벤치마크 × 7개 target 모델 × 3개 harness(direct chat·Codex·Claude Code), 즉 **52개 셀 전부에서 best/tied-best**를 기록했다.

![[assets/yang-2026-skillopt-executive-strategy-for/fig01.png]]
*Figure 1: SkillOpt 개요 — Skill Space 손실 지형에서 bounded edits(안정)와 ad hoc updates(불안정)를 대비하고, held-out gate가 검증 개선 편집만 수용한다. 우측은 딥러닝 ↔ 텍스트공간 최적화 유추 (Yang 2026, p.2)*

## 핵심 아이디어 (Core Idea)

딥러닝 유추는 장식이 아니라 작동 원리다. rollout·reflection batch 크기가 편집 증거의 noise를 조절하고, textual learning rate와 schedule은 한 skill 버전이 이전 버전에서 얼마나 벗어날지 통제한다. held-out gate가 validation을 맡고, epoch-wise slow/meta update가 momentum처럼 안정적 편집 방향을 epoch 너머로 나른다. 관건은 이 안정성이다. 연속된 개정이 너무 멀리, 또는 일관되지 않게 움직이면 거부·수용 편집 이력이 최적화 신호로서 의미를 잃는다. bounded·validation-gated 갱신 덕분에 각 개정이 직전 버전과 충분히 가까워, 이후 optimizer 호출이 무엇이 도왔고 무엇이 실패했으며 무엇을 지켜야 하는지 학습한다.

| 딥러닝 | → | SkillOpt (텍스트 공간) |
|---|---|---|
| parameter | → | skill document |
| gradient direction | → | trajectory 기반 edit direction |
| learning rate | → | edit budget `L_t` |
| validation check | → | held-out selection gate |
| stable training setting | → | batch / minibatch / schedule / gate |

## 방법론 및 아키텍처 (Methodology and Architecture)

skill `s`는 실행 전 에이전트 context에 삽입되는 자연어 정책이다(direct-chat은 prepend, tool-use harness는 persistent procedural memory). frozen 모델 `M`, harness `h`, task `x`에 대해 실행하면 trajectory `τ`와 점수 `r∈[0,1]`이 나온다. train/selection/test 3-split을 쓰고, test는 최종 보고에만 쓴다.

![[assets/yang-2026-skillopt-executive-strategy-for/fig02.png]]
*Figure 2: SkillOpt 파이프라인 — frozen 모델이 현재 skill로 rollout batch를 실행하고, optimizer가 성공/실패 minibatch를 reflect해 bounded 편집을 제안·병합·랭킹한 뒤 held-out gate를 통과한 후보만 수용한다. 하단은 epoch 경계의 slow/meta update (Yang 2026, p.4)*

- **Forward (rollout evidence)**: 현재 skill로 batch를 실행해 채점된 trajectory를 모은다. 작은 batch는 빠르지만 noisy하고, 큰 batch는 반복 패턴을 더 드러낸다.
- **Backward (minibatch reflection)**: trajectory를 실패/성공으로 나눠 minibatch로 묶는다. 실패 minibatch는 교정 규칙을, 성공 minibatch는 유지 규칙을 제안하고, 실패 교정을 우선해 위계적으로 병합한다.
- **Bounded update**: edit budget `L_t`가 스텝당 최대 편집 수를 정한다. 병합된 편집을 기대 효용으로 랭킹해 상위 `L_t`개로 clip하는데, 무제한 rewrite가 부르는 규칙 삭제·상충·overfit을 막는다.
- **Validation gate + rejected-edit buffer**: selection 점수를 **엄격히** 넘는 후보만 수용한다(동점 거부로 silent drift 방지). 거부 편집은 epoch-local buffer에 남아 negative feedback으로 재사용되며, 추론 비용을 늘리지 않는다.
- **Epoch-wise slow/meta update**: epoch 경계에서 종단 비교로 보호 필드에 longitudinal 지침을 쓴다(gate 통과 필수). optimizer 전용 meta skill은 배포본에 실리지 않아, 배포 skill은 compact하게 유지된다.

## 결과 (Results)

- **52/52 셀 best/tied-best.** no-skill·human·one-shot LLM·Trace2Skill·TextGrad·GEPA·EvoSkill을 모든 모델에서 앞선다.
- **GPT–5.5 direct chat**: 6-벤치마크 평균 58.8→82.3(**+23.5점**)이고, 셀별 oracle 베이스라인(76.9) 대비도 +5.4점이다. SpreadsheetBench 41.8→80.7, OfficeQA 33.1→72.1의 상승 폭이 특히 크다.
- **harness 내부**: Codex +24.8, Claude Code +19.1(모두 GPT–5.5, no-skill 대비). 모델당 평균 약 +17.6점이고, 작고 약한 모델일수록 상대 이득이 크다.
- **전이**: cross-harness가 가장 강해 SpreadsheetBench Codex→Claude Code가 **+59.7점**이다. cross-model·cross-benchmark도 모두 양의 전이를 보인다.

![[assets/yang-2026-skillopt-executive-strategy-for/fig03.png]]
*Figure 3: epoch checkpoint별 train rollout / selection best / unseen test 성능 추이. validation selection이 고른 checkpoint가 test 일반화와 대체로 정렬된다 (Yang 2026, p.12)*

**경제성.** 최종 `best_skill.md`는 379~1,995 토큰(중앙값 ~920)이고, 채택 편집은 **1~4개**(중앙값 2.5)뿐이다. LiveMath +29.3점, OfficeQA +39.0점이 각각 **단 1개** 편집에서 나오는데, validation gate가 실제로 걸러내고 있다는 직접 증거다. 학습된 규칙은 특정 인스턴스가 아니라 절차(procedural)를 담는다.

![[assets/yang-2026-skillopt-executive-strategy-for/fig05.png]]
*Figure 4: benchmark별 대표 학습 규칙 — best_skill.md에서 그대로 발췌. 답 포맷 제약·증거 바인딩·검색 프론티어 규율 등, frontier 모델이 zero-shot으로는 적용하지 않는 절차를 담는다 (Yang 2026, p.15)*

## 한계 (Limitations)

- 채점 trajectory와 held-out split에 의존하므로 자동 verifier·exact-match가 있는 태스크에 가장 잘 맞는다. open-ended 도메인은 더 강한 평가가 필요하다.
- 배포본은 compact하지만 훈련에는 rollout·optimizer 비용이 들어, one-off 태스크에는 덜 유리하다.
- 단일 skill이라 이질적 도메인에는 부족할 수 있고, 학습 skill이 훈련 분포 heuristic을 담을 수 있어 전이 전에 held-out 평가가 필요하다.

## 관련 페이지 (Related Pages)

- [[agents/microsoft-skillopt]] — 같은 프로젝트의 OSS 구현체(repo). PyPI `skillopt`, WebUI, SkillOpt-Sleep 등 배포·운영 측면을 담는다. 이 논문이 방법·ablation·결과의 원전.
- [[agents/lin-2026-harness-updating-is-not-harness-benefit]] — self-evolving 에이전트의 이득을 base capability / harness-updating / harness-benefit로 분리. SkillOpt이 held-out gate로 harness-benefit을 통제하는 지점과 직접 맞닿는다.
- [[agents/dennis-2026-compiling-agentic-workflows-into-llm]] — orchestration을 **가중치**로 컴파일하는 정반대 접근. SkillOpt은 가중치를 얼리고 **텍스트 문서**만 훈련한다 — 대조 축.
- [[agents/osmani-2026-loop-engineering]] — skill을 loop의 한 요소로 보는 Loop Engineering. SkillOpt은 그 skill 요소를 딥러닝식 최적화 대상으로 끌어올린다.
- [[applications/garrytan-gbrain]] — skill pack을 결합한 markdown-first agent memory. 2026-06-03 SkillOpt를 통합.

