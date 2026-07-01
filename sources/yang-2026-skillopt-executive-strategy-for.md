---
title: "SkillOpt: Executive Strategy for Self-Evolving Agent Skills"
type: paper
year: 2026
category: agents
raw_path: /home/sguys99/project/ai-wiki/raw/papers/yang-2026-skillopt-executive-strategy-for.pdf
raw_filename: "yang-2026-skillopt-executive-strategy-for.pdf"
source_collection: external
authors: "Yifan Yang, Ziyang Gong, Weiquan Huang, Qihao Yang, Ziwei Zhou, Zisu Huang, Yan Li, Xuemei Gao, Qi Dai, Bei Liu, Kai Qiu, Yuqing Yang, Dongdong Chen, Xue Yang, Chong Luo"
arxiv_id: "2605.23904"
tags: [agent-skills, self-evolving, text-space-optimization, prompt-optimization, held-out-gate, claude-code, codex, benchmark]
figures:
  - id: fig01
    file: assets/yang-2026-skillopt-executive-strategy-for/fig01.png
    raw: raw/papers/yang-2026-skillopt-executive-strategy-for-figures/fig01.png
    page: 2
    caption: "Figure 1 — SkillOpt 개요. Skill Space를 손실 지형으로 그려 bounded skill edits(안정)와 ad hoc updates(불안정)를 대비하고, held-out selection gate가 검증 개선 편집만 수용함을 보인다. 우측 표는 딥러닝 ↔ 텍스트공간 최적화 유추(parameter↔skill document, learning rate↔edit budget 등)."
    strategy: page-region
    curated: true
  - id: fig02
    file: assets/yang-2026-skillopt-executive-strategy-for/fig02.png
    raw: raw/papers/yang-2026-skillopt-executive-strategy-for-figures/fig02.png
    page: 4
    caption: "Figure 2 — SkillOpt 파이프라인. rollout batch → minibatch reflection(성공/실패) → add/delete/replace 편집 → batch-level merge → edit budget 랭킹/클립 → validation gate → best_skill.md. 하단은 epoch-wise slow/meta update(improvements·regressions·persistent failures·stable successes)."
    strategy: page-region
    curated: true
  - id: fig03
    file: assets/yang-2026-skillopt-executive-strategy-for/fig03.png
    raw: raw/papers/yang-2026-skillopt-executive-strategy-for-figures/fig03.png
    page: 12
    caption: "Figure 3 — epoch checkpoint별 train rollout / selection best / unseen test 성능 추이 (SpreadsheetBench·SearchQA·LiveMath). validation gate가 일반화되는 checkpoint를 고르는지 보여준다."
    strategy: page-region
    curated: true
  - id: fig04
    file: assets/yang-2026-skillopt-executive-strategy-for/fig04.png
    raw: raw/papers/yang-2026-skillopt-executive-strategy-for-figures/fig04.png
    page: 14
    caption: "(오탐: 실제 도식 아님) p.14의 Table 5(optimizer strength) + Table 6(compactness·edit economy·cost/pt) 표 페이지. 본문 'shown in Figure 4.' 상호참조에 캡션 정규식이 매칭됨."
    strategy: page-region
    curated: false
  - id: fig05
    file: assets/yang-2026-skillopt-executive-strategy-for/fig05.png
    raw: raw/papers/yang-2026-skillopt-executive-strategy-for-figures/fig05.png
    page: 15
    caption: "Figure 4 — benchmark별 대표 학습 규칙 1개씩(SearchQA·SpreadsheetBench·OfficeQA·DocVQA·LiveMath·ALFWorld). best_skill.md에서 그대로 발췌한, instance-specific이 아닌 procedural 규칙들."
    strategy: page-region
    curated: true
---

## 한 줄 요약 (One-line Summary)

SkillOpt은 frozen agent의 skill 문서를 딥러닝 옵티마이저의 규율로 훈련하는 최초의 체계적 controllable text-space optimizer다. 별도 optimizer 모델이 채점된 rollout을 bounded add/delete/replace 편집으로 바꾸고, held-out validation gate가 검증 점수를 엄격히 올리는 편집만 수용한다. 그래서 가중치는 얼린 채로 6개 벤치마크 × 7개 모델 × 3개 harness의 52개 셀 전부에서 best/tied-best를 달성한다.

## 1. 자료 정보 (Document Information)

- **제목**: SkillOpt: Executive Strategy for Self-Evolving Agent Skills
- **저자**: Yifan Yang·Ziyang Gong·Weiquan Huang·Qihao Yang 등 15인 (Microsoft, Shanghai Jiao Tong Univ., Tongji Univ., Fudan Univ.)
- **출처**: arXiv:2605.23904v2 (2026-05-25), cs.AI. Code: https://aka.ms/SkillOpt
- **문제의식**: frontier 모델이 tool·file·verifier를 갖춘 다단계 harness로 배포되면서, 도메인 적응은 가중치·prompt를 넘어 "에이전트가 증거를 모으고 도구를 부르고 관례를 따르고 출력을 포맷하는 절차(procedure)"의 개선을 요구한다. skill 문서가 이 절차 적응의 자연스러운 인터페이스인데, 지금까지는 손으로 쓰거나 one-shot으로 생성하거나 느슨한 self-revision으로 진화시켰다. 그러다 보니 옵티마이저처럼 동작하지 못했고, 시작점 대비 신뢰할 만한 개선도 보장하지 못했다.

## 2. 주요 기여 (Key Contributions)

- **skill을 external state로 정식화**: agent-skill 학습을 "외부 자연어 상태에 대한 최적화"로 정의하고, rollout batch·reflection minibatch·add/delete/replace 편집·textual learning rate·schedule·held-out acceptance·rejected-edit buffer·epoch-wise slow/meta update를 갖춘 harness-agnostic 옵티마이저 SkillOpt을 제안한다.
- **광범위한 실증**: 6개 벤치마크 × 7개 target 모델 × 3개 harness에서 **52/52 셀 best/tied-best**. no-skill·human-skill·one-shot LLM-skill·prompt 최적화(TextGrad, GEPA)·skill 진화(Trace2Skill, EvoSkill) 베이스라인을 모든 모델에서 능가한다.
- **전이성 검증 + ablation**: cross-model·cross-harness·cross-benchmark 세 축 전이 실험과 컴포넌트 ablation으로, 배포 산출물이 compact(300~2,000 토큰)하고 재사용 가능하며 가중치 갱신 없이 배포됨을 보인다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

**문제 설정.** skill `s`는 실행 전 에이전트 context에 삽입되는 자연어 정책이다. direct-chat에서는 system/developer 지시에 prepend하고, tool-use harness에서는 persistent procedural memory가 된다. frozen target 모델 `M`, harness `h`, task `x`에 대해 실행은 trajectory `τ`와 스칼라 점수 `r∈[0,1]`을 낸다. train/selection/test 3-split을 쓰는데, train으로 후보 skill을 생성하고 selection으로 최적을 고른 뒤 test는 최종 보고에만 쓴다.

**Forward pass (rollout evidence).** 매 스텝 target 모델이 현재 skill로 `D_tr`에서 rollout batch를 실행하고, harness가 메시지·tool call·관찰·명령 출력·verifier 피드백 등을 기록한다. 작은 batch는 빠르지만 noisy하고, 큰 batch는 반복 패턴을 더 드러낸다. accumulation(여러 batch를 따로 reflect한 뒤 병합)도 지원한다.

**Backward pass (minibatch reflection).** optimizer 모델이 trajectory를 실패/성공으로 나눠 reflection minibatch로 묶는다. 단일 trajectory는 일화적 수정을 낳지만, minibatch는 재사용 가능한 절차적 오류(엉뚱한 소스 검색, 잘못된 출력 포맷, tool 결과 미검증)를 드러낸다. 실패 minibatch는 교정 규칙을, 성공 minibatch는 유지 규칙을 제안한다. 제안은 실패/성공별로 위계적으로 병합되며, 실패 교정에 우선순위를 둔다.

**Bounded text updates (textual learning rate).** 핵심은 edit budget `L_t` — 스텝 `t`에서 적용 가능한 최대 편집 수다. 병합된 편집 풀을 기대 효용으로 랭킹해 상위 `L_t`개로 clip한다. 이것이 ad hoc rewriting과의 결정적 차이다. 무제한 rewrite는 유용한 규칙을 지우거나 상충 지시를 넣거나 국소 실패에 overfit하기 쉽다. constant/linear/cosine/autonomous 스케줄을 지원하며, 기본 cosine은 큰 편집으로 시작해 작은 통합 스텝으로 감쇠한다. patch mode(append/insert/replace/delete)와 rewrite mode를 둔다. 스텝 편집은 보호된 slow-update 필드를 덮어쓰지 못한다.

**Validation gate + rejected-edit buffer.** 모든 후보 skill을 `D_sel`에서 같은 frozen 모델·harness로 평가한다. 현재 selection 점수를 **엄격히(strictly greater)** 넘으면 현재 skill이 되고, best도 넘으면 `best_skill.md`가 된다(동점은 거부 → silent drift 방지). 거부된 편집과 관찰된 실패 패턴은 epoch-local buffer에 저장되어, 같은 epoch의 이후 reflection이 실패 편집 반복을 피하고 미해결 실패에 집중하게 한다. 이 negative feedback은 추론 비용을 늘리지 않는다.

**Epoch-wise slow/meta update.** epoch 종료 시 같은 학습 항목을 이전 epoch skill과 현재 skill로 실행해 improvements·regressions·persistent failures·stable successes로 분류한다. optimizer는 보호된 slow-update 필드에 종단적(longitudinal) 지침 블록을 쓰고, 이 후보도 validation gate를 통과해야 한다. meta skill은 optimizer 쪽에만 존재하며(어떤 편집이 도왔는지·거부됐는지·실패했는지 요약) 배포 skill에는 실리지 않는다. 이렇게 관심사를 분리해 배포본은 compact하게 유지하고, 훈련은 풍부한 편집 이력의 이득을 본다.

**Harness-agnostic 배포.** 경량 adapter가 배치를 구성하고 skill을 주입하고 native harness를 돌려 채점된 trajectory를 돌려준다. 같은 옵티마이저가 direct QA·spreadsheet·문서추론·멀티모달 QA·embodied·Codex/Claude Code 실행 루프에 모두 동작한다. Codex harness는 `codex` CLI를 workspace-write sandbox에서 구동하며, skill을 per-task `SKILL.md`로 렌더하고 `codex_trace_summary.txt`를 teacher reflection에 넣는다. Claude Code harness는 `claude` CLI로 같은 계약을 미러링한다. 세 모드 모두 동일한 `best_skill.md` 포맷을 소비한다 → cross-harness 전이의 근거.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

**메인 결과 (Table 1).** 벤치마크: SearchQA·SpreadsheetBench·OfficeQA·DocVQA·LiveMathematicianBench·ALFWorld. 모델: GPT–5.5/5.4/5.4-mini/5.4-nano/5.2, Qwen3.5–4B, Qwen3.6–35B-A3B.
- **52/52 셀 best/tied-best.**
- **GPT–5.5 direct chat**: SearchQA 77.7→87.3, SpreadsheetBench 41.8→80.7, OfficeQA 33.1→72.1, DocVQA 78.8→91.2, LiveMath 37.6→66.9, ALFWorld 83.6→95.5. 6-벤치마크 평균 58.8→82.3 (**+23.5점**), 셀별 최강 베이스라인(oracle 76.9) 대비도 **+5.4점**.
- **모델별 평균 향상**: GPT–5.4 +12.7, 5.4-mini +15.4, 5.4-nano +26.7, 5.2 +16.6, Qwen3.5–4B +19.2, Qwen3.6–35B-A3B +9.1 (모델당 평균 약 **+17.6점**). 작고 약한 모델일수록 상대 이득이 크다(5.4-nano는 DocVQA 거의 2배, ALFWorld 3배).
- **harness 내부**: Codex에서 GPT–5.5 +24.8(EvoSkill 대비 +14.0), Claude Code에서 +19.1(EvoSkill 대비 +3.2). ALFWorld는 embodied 상호작용 특성상 harness 표에서 제외했다.

**Ablation (Table 2·3, Fig 3).** 이득은 rollout batch·reflection minibatch·LR schedule의 정확한 값에는 둔감하지만(대부분 ±1.5점 밴드), bounded text-space learning·validation gating·rejected-edit feedback·epoch-wise slow/meta update의 유무에는 민감하다. "without lr"(무제한 rewrite)는 84.6/75.7/57.3으로 떨어진다. rejected buffer를 제거하면 −1.6/−4.6/−2.4점. meta skill과 slow update를 동시에 제거하면 SpreadsheetBench가 77.5→55.0(**−22.5점**, 최대 저하). Fig 3은 validation checkpoint가 held-out test와 잘 정렬됨을 확인해 준다.

**전이 (Table 4).** cross-model 4개 전부 양의 전이를 보인다(LiveMath 5.4-nano는 전이본 28.8 > in-domain 27.2). cross-harness가 가장 강한 신호로, SpreadsheetBench Codex→Claude Code **+59.7점**(22.1→81.8), 반대 방향 +43.6. cross-benchmark(OlympiadBench→Omni-MATH)는 모든 규모에서 양의 전이(+3.7/+1.8/+1.3).

**Optimizer 강도 (Table 5).** optimizer는 오프라인 훈련에만 쓰이고 배포에는 안 쓰이므로, optimizer 선택은 training-time 레버다. 강한 optimizer(GPT–5.5)가 모든 셀에서 더 큰 이득을 낸다. target-matched optimizer도 강한 옵티마이저 이득의 56~74%를 회복한다 → distillation 파이프라인이 아니라 최적화 루프 자체가 실질 기여라는 뜻이다.

**학습 skill의 경제성 (Table 6, Fig 4).** 최종 `best_skill.md`는 379(LiveMath)~1,995(SpreadsheetBench) 토큰, 중앙값 약 920이다. 채택 편집은 **1~4개**(중앙값 2.5)로, LiveMath +29.3점과 OfficeQA +39.0점이 각각 **단 1개** 편집에서 나왔다(validation gate가 실제로 작동한다는 직접 증거). cost/pt는 절차형(0.6~3.6M 토큰/점)과 장문·멀티모달(SearchQA 37.9M, DocVQA 46.4M)로 갈린다. Fig 4의 학습 규칙은 instance-specific이 아닌 procedural이다(예: SpreadsheetBench "구조·수식 먼저 검사 후 평가된 static value를 전체 범위에 기록").

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **검증 신호 의존**: 채점 trajectory와 held-out selection split에 의존하므로, 자동 verifier·exact-match·실행 체크 등 신뢰 가능한 피드백이 있는 태스크에 가장 적합하다. 성공이 주관적·다차원이고 판정 비용이 큰 open-ended 도메인은 더 강한 human/model 평가가 필요하다.
- **훈련 비용**: 배포본은 compact하지만 훈련에는 추가 rollout 연산과 optimizer 호출이 든다. 재사용하면 상각되나 one-off 태스크에는 덜 매력적이다.
- **단일 skill**: 큰 skill library나 가중치 변경 대신 이식 가능한 단일 skill을 최적화한다 — 배포는 단순해지지만 이질적 도메인에는 부족할 수 있다.
- **분포 의존 heuristic**: 학습 skill이 훈련 분포의 도메인 heuristic을 담을 수 있어, 크게 다른 모델·harness·태스크로 옮기기 전에 held-out 평가가 필요하다.
- **Outlook**: skill library 인프라 공유, optimizer meta skill 재사용, reward-free/preference validation gate, 최적화 skill을 target 모델로 self-distillation(가중치 적응으로 가는 징검다리).

## 6. 관련 연구 (Related Work)

- **Prompt auto-tuning / config 탐색**: GEPA(reflective prompt evolution, RL 능가), ABSTRAL·EvoTest(multi-agent design·test-time system 진화). 이들은 prompt·시스템·config를 대상으로 하지만, SkillOpt은 학습·검증·export·재사용 가능한 persistent skill 문서를 최적화한다.
- **Skill 구성·진화**: SkillsBench·SoK(agentic skills), Trace2Skill·EvoSkill·SkillForge·AutoSkill·SkillX·Memp 등. 이들은 skill 발견·저장소 성장·공유·진화 탐색·정책 최적화를 강조한다. SkillOpt은 더 좁은 문제 — 딥러닝식 통제(batch·minibatch·textual LR·gate·buffer·slow/meta)로 compact 도메인 skill 하나를 훈련한다.
- **Trajectory reflection 계보**: Reflexion, Self-Refine.

## 7. 용어집 (Glossary)

- **skill document**: 에이전트 context에 삽입되는 자연어 정책. SkillOpt의 학습 대상(external state).
- **frozen target model (M)**: 가중치를 고정한 채 skill로만 적응되는 실행 모델.
- **optimizer model**: rollout 증거로 skill 편집을 제안·병합·랭킹하는 별도 frontier 모델. 배포엔 불참.
- **edit budget (L_t)**: 스텝당 최대 편집 수. textual learning rate에 대응.
- **held-out selection gate**: `D_sel`에서 selection 점수를 엄격히 올리는 후보만 수용하는 검증 관문.
- **rejected-edit buffer**: 거부된 편집·실패 패턴을 담아 negative feedback으로 재사용하는 epoch-local 버퍼.
- **slow/meta update**: epoch 경계에서 종단 비교로 쓰는 보호 필드 지침(slow) + optimizer 전용 메모리(meta).
- **harness**: skill이 실행되는 환경(direct chat, Codex CLI, Claude Code CLI).
- **best_skill.md**: 배포되는 최종 산출물. 300~2,000 토큰의 compact skill 문서.

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 2 | "Figure 1 — SkillOpt 개요 (Skill Space 손실지형 + 딥러닝↔텍스트 최적화 유추 표)" | page-region | ★ wiki 권장 (architecture/overview) |
| fig02 | 4 | "Figure 2 — SkillOpt 파이프라인 (rollout→reflection→merge→gate→best_skill.md + slow/meta)" | page-region | ★ wiki 권장 (method) |
| fig05 | 15 | "Figure 4 — benchmark별 대표 학습 규칙 예시 (procedural rules)" | page-region | ★ wiki 권장 (learned skill 예시) |
| fig03 | 12 | "Figure 3 — epoch checkpoint별 train/selection/test 성능 추이" | page-region | (선택) result trend |
| fig04 | 14 | "(오탐) Table 5 optimizer strength + Table 6 cost·edit economy 표 페이지" | page-region | (선택) 결과 표 — 실제 도식 아님 |

