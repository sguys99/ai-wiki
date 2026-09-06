---
title: "SkillOpt: Executive Strategy for Self-Evolving Agent Skills"
type: paper
year: 2026
category: agents
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
    caption: "Figure 1: SkillOpt 개요. 왼쪽은 Skill Space를 검증 오차 지형으로 그려 bounded skill edits(파란 경로, 안정적이고 통제된 최적화)와 ad hoc updates(회색 점선, 큰 의미 도약과 불안정한 갱신)를 대비한다. held-out selection gate가 검증 점수를 개선하는 편집만 수용하고 거부된 편집은 붉은 점선으로 옆길로 빠진다. 오른쪽 표는 딥러닝에서 텍스트 공간 최적화로 옮긴 대응 관계를 정리한다."
    page: 2
    bbox_norm: [0.0, 0.0103, 0.9877, 0.355]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/yang-2026-skillopt-executive-strategy-for/fig03.png
    raw: raw/papers/yang-2026-skillopt-executive-strategy-for-figures/fig03.png
    caption: "Figure 3: epoch checkpoint별 성능 추이. SpreadsheetBench, SearchQA, LiveMath 세 벤치마크에서 train rollout, selection best, unseen test 점수를 함께 그렸다. selection이 고른 checkpoint가 test 일반화와 대체로 같은 방향으로 움직인다."
    page: 12
    bbox_norm: [0.1351, 0.0669, 0.865, 0.2938]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/yang-2026-skillopt-executive-strategy-for/fig04.png
    raw: raw/papers/yang-2026-skillopt-executive-strategy-for-figures/fig04.png
    caption: "Figure 4: 벤치마크별 대표 학습 규칙 6개. GPT-5.5를 학생과 optimizer로 함께 쓴 실행의 최종 best_skill.md에서 그대로 발췌했다. 특정 문제나 파일, 개체를 지목하지 않는 절차 규칙이라는 점이 핵심이다."
    page: 15
    bbox_norm: [0.1139, 0.0672, 0.8861, 0.2595]
    strategy: caption-region
    curated: true
  - id: tab01
    label: Table 1
    kind: table
    file: assets/yang-2026-skillopt-executive-strategy-for/tab01.png
    raw: raw/papers/yang-2026-skillopt-executive-strategy-for-figures/tab01.png
    caption: "Table 1: held-out test split 메인 결과. 7개 target 모델과 3개 실행 harness에서 no skill, human skill, one-shot LLM skill, Trace2Skill, TextGrad, GEPA, EvoSkill과 SkillOpt를 비교한다. 점수는 백분율이고 아래 첨자는 같은 블록의 no skill 대비 변화량이다."
    page: 7
    bbox_norm: [0.1042, 0.0675, 0.8976, 0.8539]
    strategy: table-region
    curated: false
  - id: tab02
    label: Table 2
    kind: table
    file: assets/yang-2026-skillopt-executive-strategy-for/tab02.png
    raw: raw/papers/yang-2026-skillopt-executive-strategy-for-figures/tab02.png
    caption: "Table 2: 텍스트 optimizer 하이퍼파라미터 분석 6개 패널. 학습 데이터 노출 비율, reflection minibatch 크기, rollout batch 크기, textual learning rate, learning rate 스케줄러, slow update 샘플 수를 하나씩 바꿔 SearchQA, SpreadsheetBench, LiveMath 점수를 비교한다."
    page: 8
    bbox_norm: [0.1122, 0.0759, 0.8847, 0.2296]
    strategy: table-region
    curated: false
  - id: tab03
    label: Table 3
    kind: table
    file: assets/yang-2026-skillopt-executive-strategy-for/tab03.png
    raw: raw/papers/yang-2026-skillopt-executive-strategy-for-figures/tab03.png
    caption: "Table 3: 컴포넌트 ablation. learning rate 형태, rejected buffer, epoch 단위 slow/meta update를 각각 제거하거나 바꿨을 때의 점수 변화를 담는다. 옅은 파란 행이 각 묶음의 기본 설정이다."
    page: 8
    bbox_norm: [0.1351, 0.2993, 0.8649, 0.4385]
    strategy: table-region
    curated: false
  - id: tab04
    label: Table 4
    kind: table
    file: assets/yang-2026-skillopt-executive-strategy-for/tab04.png
    raw: raw/papers/yang-2026-skillopt-executive-strategy-for-figures/tab04.png
    caption: "Table 4: 최적화된 skill의 전이 실험 세 종류. (a) cross-model은 source 모델용 skill을 다른 target 모델에 배포하고, (b) cross-harness는 Codex와 Claude Code 사이에서 교차 평가하며, (c) cross-benchmark는 OlympiadBench skill을 Omni-MATH에 적용한다."
    page: 9
    bbox_norm: [0.1235, 0.0676, 0.8765, 0.3834]
    strategy: table-region
    curated: false
  - id: tab05
    label: Table 5
    kind: table
    file: assets/yang-2026-skillopt-executive-strategy-for/tab05.png
    raw: raw/papers/yang-2026-skillopt-executive-strategy-for-figures/tab05.png
    caption: "Table 5: optimizer 강도 효과. 같은 벤치마크와 target 조합을 강한 frontier optimizer(GPT-5.5)와 target과 같은 모델을 쓰는 optimizer로 각각 최적화하고, SkillOpt 루프의 나머지 설정은 고정했다."
    page: 14
    bbox_norm: [0.1381, 0.0675, 0.8619, 0.1632]
    strategy: table-region
    curated: false
  - id: tab06
    label: Table 6
    kind: table
    file: assets/yang-2026-skillopt-executive-strategy-for/tab06.png
    raw: raw/papers/yang-2026-skillopt-executive-strategy-for-figures/tab06.png
    caption: "Table 6: 학습 skill의 비용과 편집 경제성. GPT-5.5를 학생과 optimizer로 함께 쓴 실행에서 best_skill.md의 초기와 최종 토큰 길이, 채택된 편집 수, 총 훈련 토큰, test 1%p 상승당 훈련 토큰을 정리한다."
    page: 14
    bbox_norm: [0.214, 0.247, 0.786, 0.3612]
    strategy: table-region
    curated: false
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/yang-2026-skillopt-executive-strategy-for/fig02.png
    raw: raw/papers/yang-2026-skillopt-executive-strategy-for-figures/legacy/fig02.png
    caption: "Figure 2: SkillOpt 파이프라인. train split의 rollout batch를 minibatch K개로 나눠 optimizer 모델이 각각 최대 L개의 원자적 편집을 제안하고, batch-level merge가 중복과 충돌을 정리한 뒤 edit budget으로 랭킹과 clip을 거쳐 candidate skill을 만든다. validation gate가 수용하면 best_skill.md가 갱신되고 거부되면 rejected-edit buffer로 들어간다. 아래 영역은 epoch 경계에서 실행되는 slow/meta update다."
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
    caption: "Figure 4가 실린 15쪽 전면 캡처. 2026-08 정밀 크롭 전환 이전의 legacy 이미지이며, 같은 도식의 정밀 크롭은 fig04다."
    page: 15
    bbox_norm: [0.0, 0.0, 1.0, 1.0]
    strategy: legacy-page-region
    low_confidence: true
    curated: false
---
## 한 줄 요약 (One-line Summary)

SkillOpt은 frozen agent의 skill 문서를 딥러닝 옵티마이저의 규율로 훈련하는, 저자들이 아는 한 최초의 체계적 controllable text-space optimizer다. 별도 optimizer 모델이 채점된 rollout을 bounded add/delete/replace 편집으로 바꾸고, held-out validation gate가 검증 점수를 엄격히 올리는 편집만 수용한다. 그래서 가중치를 고정한 채로 6개 벤치마크와 7개 모델, 3개 harness가 만드는 52개 셀 전부에서 best 또는 tied-best를 달성한다.

## 1. 자료 정보 (Document Information)

- **제목**: SkillOpt: Executive Strategy for Self-Evolving Agent Skills
- **저자**: Yifan Yang, Ziyang Gong, Weiquan Huang, Qihao Yang 등 15인 (Microsoft, Shanghai Jiao Tong Univ., Tongji Univ., Fudan Univ.)
- **출처**: arXiv:2605.23904v2 (2026-05-25), cs.AI, 27쪽. Code: https://aka.ms/SkillOpt
- **문제의식**: frontier 모델이 도구와 파일, verifier를 갖춘 다단계 harness로 배포되면서 도메인 적응은 가중치나 프롬프트를 넘어선다. 에이전트가 증거를 모으고 도구를 부르고 도메인 관례를 따르고 출력을 포맷하는 절차 자체를 개선해야 한다. skill 문서가 이 절차 적응의 자연스러운 인터페이스인데, 지금까지는 손으로 쓰거나 one-shot으로 생성하거나 느슨하게 통제된 self-revision으로 진화시켰다. 그래서 어느 쪽도 skill에 대한 딥러닝 옵티마이저처럼 동작하지 못했고, 시작점 대비 신뢰할 만한 개선도 보장하지 못했다.

## 2. 주요 기여 (Key Contributions)

- **skill을 external state로 정식화**: agent-skill 학습을 외부 자연어 상태에 대한 최적화로 정의하고, rollout batch, reflection minibatch, add/delete/replace 편집, textual learning rate, 스케줄, held-out acceptance, rejected-edit buffer, epoch 단위 slow/meta update를 갖춘 harness-agnostic 옵티마이저 SkillOpt을 제안한다.
- **광범위한 실증**: 6개 벤치마크와 7개 target 모델, 3개 harness에서 **52개 셀 중 52개가 best 또는 tied-best**다. no-skill, human-skill, one-shot LLM-skill, 프롬프트 최적화(TextGrad, GEPA), skill 진화(Trace2Skill, EvoSkill) 베이스라인을 모든 모델에서 능가한다.
- **전이성 검증과 ablation**: cross-model, cross-harness, cross-benchmark 세 방향 전이 실험과 컴포넌트 ablation으로, 배포 산출물이 300~2,000 토큰 수준으로 compact하고 재사용 가능하며 가중치 갱신 없이 배포됨을 보인다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

**문제 설정.** skill `s`는 실행 전 에이전트 context에 삽입되는 자연어 정책이다. direct-chat에서는 system 또는 developer 지시에 prepend하고, tool-use harness에서는 persistent procedural memory가 된다. frozen target 모델 `M`, harness `h`, task `x`에 대해 실행은 trajectory `τ`와 스칼라 점수 `r∈[0,1]`을 낸다. `D_tr`이 경험을 공급하고 `D_sel`이 갱신을 통과시키거나 거부하며 `D_test`는 최종 보고에만 쓰고 그전까지 잠가 둔다. optimizer 상태는 현재 skill, 검증을 통과한 best skill, skill 해시 캐시, epoch-local rejected-step buffer, 옵션인 slow/meta-update 상태를 담는다. 내보내는 것은 best accepted skill 하나뿐이고 파일명은 `best_skill.md`다.

**딥러닝 유추.** parameter는 skill document, gradient direction은 trajectory에서 유도한 edit direction, learning rate는 edit budget `L_t`, validation check는 held-out selection gate, stable training setting은 batch와 minibatch와 스케줄과 gate에 대응한다. 이 유추는 장식이 아니라 동작 원리다. batch 크기가 편집 증거의 noise를 조절하고, textual learning rate와 스케줄은 한 skill 버전이 이전 버전에서 얼마나 멀어질 수 있는지 통제하며, slow/meta update가 momentum처럼 안정적 편집 방향을 epoch 너머로 전달한다. 연속된 개정이 너무 멀리 또는 일관되지 않게 움직이면 거부와 수용 이력이 최적화 신호로서 의미를 잃기 때문에 이 안정성이 필요하다.

**Forward pass (rollout evidence).** 매 스텝 target 모델이 현재 skill로 `D_tr`의 rollout batch를 실행하고, harness가 task 메타데이터, 메시지, tool call, 관찰, 명령 출력, 최종 답, verifier 피드백에 벤치마크별 context(spreadsheet preview, 문서 참조, 압축 실행 trace)를 더해 기록한다. 작은 batch는 빠르지만 noisy하고 큰 batch는 반복 패턴을 더 드러낸다. accumulation을 쓰면 여러 batch를 따로 reflect한 뒤 하나의 갱신으로 병합해 실행 처리량과 갱신 빈도를 분리할 수 있다.

**Backward pass (minibatch reflection).** optimizer 모델이 trajectory를 실패와 성공으로 분리하고 각 그룹을 reflection minibatch로 나눈다. 단일 trajectory는 일화적 수정을 낳지만 minibatch는 재사용 가능한 절차적 오류를 드러낸다. 계속 엉뚱한 소스를 검색하거나 잘못된 포맷으로 답을 쓰거나 tool 결과를 검증하지 않는 패턴이 그 예다. 실패 minibatch는 교정 규칙을, 성공 minibatch는 유지 규칙을 제안한다. 병합은 위계적이다. 두 계열을 각각 통합한 뒤 실패 교정에 우선순위를 두고 합치면서 중복과 상충, 예시 특정적 제안을 걸러낸다.

**Bounded text updates.** learning rate의 대응물은 edit budget `L_t`, 즉 스텝 `t`에서 적용되는 최대 편집 수다. 집계 후 optimizer 모델이 편집 풀을 기대 효용으로 랭킹해 상위 `L_t`개로 clip한다. 무제한 rewrite는 유용한 규칙을 지우거나 상충 지시를 삽입하거나 국소 실패에 overfit하기 쉬운데, bounded update는 연속성을 지키면서 새 절차를 습득하게 한다. 스케줄은 constant, linear, cosine, autonomous를 지원하고 기본 cosine은 큰 편집으로 시작해 작은 통합 스텝으로 감쇠한다. patch mode의 편집 연산은 `append`, `insert_after`, `replace`, `delete` 네 가지다. 병합된 편집마다 `support_count`(지지한 원본 patch 수)와 `source_type`(failure 또는 success)이 기록되어, 랭킹이 독립 분석과 위계 병합을 모두 통과한 편집을 선호한다. rewrite mode에서는 선택된 제안이 skill 전체 rewrite의 조건이 된다. 스텝 단위 편집은 보호된 slow-update 필드를 덮어쓰지 못한다.

**Validation gate와 rejected-edit buffer.** 모든 후보 skill을 `D_sel`에서 같은 frozen 모델과 harness로 평가한다. 현재 selection 점수를 **엄격히(strictly greater)** 넘으면 새 현재 skill이 되고 best도 넘으면 `best_skill.md`가 된다. 동점을 거부하므로 배포 skill이 조용히 표류하지 않는다. 이 gate가 reflection을 무조건적 self-editing이 아니라 propose-and-test 최적화로 바꾼다. 텍스트로 그럴듯한 진단도 실제 target 모델에는 해로울 수 있기 때문이다. 거부된 편집과 그것이 유발한 점수 하락, 관찰된 실패 패턴은 epoch-local buffer에 기록되어 같은 epoch의 이후 reflection이 실패 편집을 반복하지 않게 한다. 이 negative feedback은 훈련 중에만 작동하고 추론 비용을 늘리지 않는다. 매 스텝은 편집별 accept 또는 skip 상태를 담은 `edit_apply_report.json`을 남기므로 `best_skill.md`의 모든 변경 출처를 사후에 복원할 수 있다.

**Epoch 단위 slow/meta update.** epoch 종료 시 같은 학습 항목을 이전 epoch skill과 현재 skill로 각각 실행해 improvements(이전 실패에서 현재 성공), regressions(이전 성공에서 현재 실패), persistent failures(둘 다 실패), stable successes(둘 다 성공)로 분류한다. optimizer는 보호된 slow-update 필드에 간결한 종단(longitudinal) 지침 블록을 쓰고 이 후보도 같은 validation gate를 통과해야 한다. 보호 영역은 `SLOW_UPDATE_START`와 `SLOW_UPDATE_END` 마크업으로 구분되며, 스텝 단위 프롬프트는 이 영역을 건드리지 못하고 epoch 경계 프로세스만 다음 경계에서 다시 쓸 수 있다. meta skill은 optimizer 쪽에만 존재한다. 어떤 편집이 도왔고 거부됐고 어떤 실패가 지속됐는지를 요약해 이후 optimizer 프롬프트에 prepend하며 배포 skill에는 실리지 않는다. 이 분리 덕분에 배포본은 compact하게 남고 훈련은 풍부한 편집 이력의 이득을 본다.

**Harness-agnostic 배포.** 경량 adapter가 train과 평가 batch를 구성하고 skill을 context에 주입하고 native harness를 실행해 채점된 trajectory를 돌려준다.

| harness | 실행 방식 |
|---|---|
| direct chat | 단일 chat completion 호출. skill을 system 프롬프트에 prepend한다 |
| Codex | `codex` CLI를 workspace-write sandbox에서 구동한다. skill을 task별 `SKILL.md`로 렌더하고 압축 실행 trace `codex_trace_summary.txt`를 teacher reflection context에 넣어, optimizer가 최종 답이 아니라 에이전트의 실제 행동에서 배우게 한다 |
| Claude Code | `claude` CLI로 같은 workspace 계약을 미러링한다 |

세 모드가 동일한 `best_skill.md` 포맷을 소비하며, 이것이 cross-harness 전이 실험이 성립하는 근거다.

**최적화 절차와 프롬프트 계약 (부록 A, C).** Algorithm 1의 상태 변수는 현재 skill `s_cur`, best skill `s_best`, selection 점수 캐시 `C`, 스텝 buffer `B`, optimizer 쪽 meta skill `m_meta`다. candidate skill의 해시가 캐시에 있으면 재평가하지 않고 캐시 점수를 재사용해 rollout 비용을 줄인다. slow update와 optimizer memory는 두 번째 epoch부터 작동한다. optimizer는 JSON 출력을 요구하는 8개 프롬프트 계약(`analyst_error.md`, `analyst_success.md`, `merge_failure.md`, `merge_success.md`, `merge_final.md`, `ranking.md`, `slow_update.md`, `meta_skill.md`)으로 구성된다. 파싱과 필터링, 적용, 검증을 사람 개입 없이 자동화하기 위한 설계다. 랭킹 기준은 우선순위 순서로 systematic impact(여러 task에 걸친 반복 실패를 다루는 편집이 최상위), complementarity(기존 skill의 빈틈을 채우는 편집), generality(특정 질문 유형이나 개체에 묶이지 않은 일반 원칙), actionability(구체적 지침) 네 가지다. 구현이 따르는 설계 원칙 다섯 가지는 task 실행 모델 고정, 수용 전 selection split 평가, minibatch 분석의 위계적 병합, learning rate 대응물로서의 edit budget, 배포 skill의 경량성과 optimizer meta skill 분리다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

**실험 설정.** 벤치마크는 SearchQA(추출형 QA, 단일 라운드), SpreadsheetBench(최대 30 턴, 실제 openpyxl/pandas 런타임, 기본 `mode=multi`), OfficeQA(멀티턴 tool 루프, 최대 24회 tool call), DocVQA(멀티모달 문서 추론), LiveMathematicianBench(수학 다지선다, 표에서 LiveMath), ALFWorld(episode당 최대 50 스텝의 persistent embodied 상호작용) 6종이다. target 모델은 GPT-5.5, 5.4, 5.4-mini, 5.4-nano, 5.2와 Qwen3.5-4B, Qwen3.6-35B-A3B 7종이다. 각 벤치마크의 native evaluator로 hard score 또는 exact-match accuracy를 held-out test split에서 보고한다. dataset 기반 실행은 같은 dataset seed(`split_seed=42`)에서 유도한 결정적 분할을 쓰고, selection split은 후보 편집의 수용과 거부에만 쓴다. 따라서 보고 수치는 validation-set fit이 아니라 일반화를 측정한다. 분할 비율은 논문 안에서 두 값이 엇갈린다. 부록 C는 벤치마크별 분할이 명시되지 않으면 2:1:7을 기본으로 쓴다고 두 번 적는데, Table 2 패널 (a)의 캡션은 같은 ablation의 분할을 4:1:5로 적는다.

기본 optimizer 설정은 epoch 4회, rollout batch 스텝당 40, reflection minibatch 8(analyst worker 16개 병렬, merge batch 8), textual learning rate `L_t=4`에 cosine 감쇠와 floor 2, held-out gating(동점 거부), epoch당 20개 task를 샘플링하는 slow update, optimizer 쪽 meta skill, `patch` edit mode(대안은 `rewrite_from_suggestions`), rejected-edit buffer다. teacher reflection은 minibatch당 최대 3회 정련 라운드를 허용하고, teacher와 student의 reasoning effort는 모두 medium이다. 학습 풀이 좁은 벤치마크는 gate와 스케줄러, slow/meta update 기계를 그대로 두고 batch만 조정한다. LiveMathematicianBench는 epoch당 학습 항목 35개에 rollout batch 200을, ALFWorld는 학습 task 39개에 selection 환경 140개와 test 환경 134개를 쓴다.

베이스라인 7종은 no skill(벤치마크 기본 system 프롬프트), human skill(벤치마크별 전문가 작성), one-shot LLM skill(GPT-5.5가 한 번 생성하고 갱신하지 않음), Trace2Skill(trajectory 수준 skill distillation), TextGrad(gradient 방식 자연어 프롬프트 최적화), GEPA(Pareto reflective prompt evolution), EvoSkill(실패 분석 기반 skill 폴더 진화)이다. 모두 같은 target 모델과 같은 held-out test split, 같은 scorer를 쓰므로 비교는 적응 절차의 선택만 분리한다.

**메인 결과 (Table 1).** (target 모델, 벤치마크, harness) 셀 하나를 비교 단위로 보고 7개 베이스라인 중 셀별 최강을 경쟁자로 삼으면 SkillOpt은 **52개 셀 중 52개**에서 최선 또는 동률이다.
- **GPT-5.5 direct chat**: SearchQA 77.7%에서 87.3%, SpreadsheetBench 41.8%에서 80.7%, OfficeQA 33.1%에서 72.1%, DocVQA 78.8%에서 91.2%, LiveMath 37.6%에서 66.9%, ALFWorld 83.6%에서 95.5%. 6개 벤치마크 평균은 58.8%에서 82.3%로 **+23.5%p**이고, 셀마다 6개 경쟁 방법 중 최선을 고른 oracle 베이스라인(76.9%) 대비도 **+5.4%p**다. 상승 폭은 no-skill이 이미 천장에 가까운 SearchQA의 9.6%p에서 SpreadsheetBench 38.9%p와 OfficeQA 39.0%p까지 걸쳐 있다.
- **모델별 평균 향상**: GPT-5.4 +12.7%p, 5.4-mini +15.4%p, 5.4-nano +26.7%p, 5.2 +16.6%p, Qwen3.5-4B +19.2%p, Qwen3.6-35B-A3B +9.1%p로 모델당 평균 약 **+17.6%p**다. 작고 약한 모델이 상대적으로 가장 큰 이득을 본다. GPT-5.4-nano는 DocVQA가 30.8%에서 80.2%로 약 2.6배, ALFWorld가 34.3%에서 69.4%로 약 2.0배가 된다. Qwen3.5-4B는 SpreadsheetBench가 9.3%에서 23.9%로 약 2.6배다.
- **harness 내부**: Codex에서 GPT-5.5가 5개 벤치마크 평균 +24.8%p(EvoSkill 대비 +14.0%p), Claude Code에서 +19.1%p(EvoSkill 대비 +3.2%p)다. EvoSkill 자체도 Claude Code 5개 평균을 57.8%에서 73.7%로 올리지만 Codex SearchQA에서는 81.8%에서 61.4%로 하락한다. ALFWorld는 표준 Codex와 Claude Code adapter가 persistent embodied 상호작용을 표현하지 못해 harness 표에서 비웠다.
- **대안 설명 검토**: 프롬프트 길이 효과가 아니다. human skill은 이미 145~516 토큰이고 one-shot LLM skill보다 긴 경우가 많은데도 모든 direct-chat 모델 행에서 밀린다. 특정 skill 포맷 활용도 아니다. Codex SpreadsheetBench에서 EvoSkill이 이미 27.5%를 67.5%로 올렸는데 SkillOpt은 여기에 17.5%p를 더해 85.0%에 이른다.

**Ablation (Table 2, Table 3, Figure 3).** GPT-5.5를 target과 optimizer로 함께 써서 진행했다. 이득은 값 스윕에 둔감하고 컴포넌트 유무에 민감하다.
- 학습 데이터 노출량(패널 a): 절차형 벤치마크가 증거량에 보상한다. 1개 예시에서 100%로 갈 때 SpreadsheetBench 47.5%에서 78.0%, LiveMath 59.1%에서 70.5%다. SearchQA는 20%부터 84~86%로 포화한다.
- reflection minibatch 크기(패널 b, 1에서 32): SearchQA 85.9~87.1%, SpreadsheetBench 75.4~77.9%. 기본값 8이 세 벤치마크 모두 최상위 또는 그 근처다.
- rollout batch 크기(패널 c, 8에서 full epoch): SearchQA 85.1~87.2%, SpreadsheetBench 75.0~77.5%.
- textual learning rate(패널 d, 1/2/4/8/16): `L_t=4`가 86.5/78.2/56.5%, LiveMath 최고는 `L_t=8`의 66.9%, 다섯 설정 전체 최저도 SearchQA 85.5%에 그친다.
- 스케줄러(패널 e): constant 87.3/80.7/62.1%, cosine 87.1/77.5/61.3%, linear 87.2/72.9/62.9%. 기본값 cosine보다 constant가 SpreadsheetBench에서 3.2%p 높다.
- slow update 샘플 수(패널 f): 기본값 20이 87.1/77.5/61.3%이고 5, 10, 40은 ±2.7%p 안에 있다.
- 컴포넌트 제거(Table 3, SearchQA/SpreadsheetBench/LiveMath 순): 기본 `lr=4`는 87.1/77.5/61.3%다. dynamic lr은 85.8/71.8/54.0%, "without lr"(무제한 rewrite)는 84.6/75.7/57.3%다. rejected buffer 제거는 각각 1.6%p, 4.6%p, 2.4%p 하락으로 배포 장치가 아니라 기본 루프의 안정화 장치임을 보인다. meta skill만 제거하면 85.1/75.7/58.1%, meta skill과 slow update를 동시에 제거하면 SpreadsheetBench가 77.5%에서 55.0%로 **22.5%p** 하락해 ablation 전체 최대 저하가 된다. 이 벤치마크에서 특히 치명적인 이유는 장기 증거 흐름과, 국소 편집이 지속적 절차 교훈을 덮어쓰지 못하게 하는 보호 영역 계약이 함께 사라지기 때문이다.
- Figure 3은 epoch를 따라 validation checkpoint가 held-out test 성능을 추적함을 보여, gate가 selection split에만 맞는 skill이 아니라 일반화되는 skill을 고르는 경향을 확인한다.

**전이 (Table 4).** cross-model 4건 전부 양의 전이다. SpreadsheetBench는 GPT-5.4에서 5.4-mini로 +9.4%p(36.1%에서 45.5%), 5.4-nano로 +3.0%p(23.5%에서 26.5%)이고, LiveMath는 5.4-mini로 +4.5%p(14.7%에서 19.2%), 5.4-nano로 +5.6%p(23.2%에서 28.8%)다. LiveMath 5.4-nano에서는 전이본 28.8%가 in-domain 참조값 27.2%를 넘어서 학습된 절차 일부가 target 모델과 무관함을 시사한다. SpreadsheetBench 5.4-mini는 in-domain 이득의 82%(+11.4%p 중 +9.4%p)를 회복하며 어느 행도 target의 no-skill 기준선 아래로 내려가지 않는다.

cross-harness가 가장 뚜렷한 배포 신호다. SpreadsheetBench는 Codex에서 Claude Code로 **+59.7%p**(22.1%에서 81.8%, in-domain 참조값 80.4%를 살짝 넘는다), 반대 방향으로 +43.6%p(27.5%에서 71.1%)다. LiveMath는 Codex에서 Claude Code로 +1.6%p(40.8%에서 42.4%), 반대 방향으로 +12.8%p(35.2%에서 48.0%)다. 두 harness가 서로 다른 tool과 파일 API, 명령 표면을 노출하는데도 양의 전이가 나오므로, 학습된 규칙이 harness 특정 명령 레시피가 아니라 workbook 수준 절차(구조 우선 검사, 수식 인식 검증, static value 기록)를 담고 있을 가능성이 있다.

cross-benchmark는 source와 target이 넓은 과제 계열(수학)만 공유하는 가장 엄격한 조건이다. OlympiadBench에서 Omni-MATH 방향으로 GPT-5.4 +3.7%p(56.6%에서 60.3%), 5.4-mini +1.8%p(34.8%에서 36.6%), 5.4-nano +1.3%p(38.8%에서 40.1%)다. 값은 작지만 부호가 일관되게 양이다.

**Optimizer 강도 (Table 5).** optimizer는 오프라인 훈련에만 실행되고 배포에는 호출되지 않으므로 optimizer 선택은 training-time 레버다. 강한 frontier optimizer(GPT-5.5)가 검사한 네 셀 모두에서 더 큰 이득을 낸다. SpreadsheetBench는 GPT-5.4-mini에서 +11.4%p 대 +7.1%p, 5.4-nano에서 +19.0%p 대 +11.9%p이고, SearchQA는 5.4-mini에서 +4.3%p 대 +2.4%p, 5.4-nano에서 +19.0%p 대 +14.1%p다. 저자들은 이 단조성이 bounded edit와 validation gate 덕분이라고 본다. gate가 없으면 강한 optimizer가 더 크지만 해로운 rewrite를 밀어 넣을 수도 있다. 동시에 target과 같은 optimizer도 강한 optimizer 이득의 **56~74%**를 회복한다. SkillOpt이 강한 teacher에서 약한 student로 가는 distillation 파이프라인이 아니라 최적화 루프 자체가 실질 가치를 더한다는 근거다.

**학습 skill의 경제성 (Table 6, Figure 4).** GPT-5.5를 student와 optimizer로 함께 쓴 실행의 산출물 계량이다.

| 벤치마크 | 초기 (토큰) | 최종 (토큰) | 채택 편집 | 총 훈련 토큰 | test 1%p당 훈련 토큰 |
|---|---|---|---|---|---|
| SearchQA | 16 | 857 | 4 | 2억 1,380만 | 3,790만 |
| SpreadsheetBench | 224 | 1,995 | 4 | 2,140만 | 60만 |
| OfficeQA | 145 | 883 | 1 | 2,080만 | 110만 |
| DocVQA | 81 | 959 | 3 | 1억 8,820만 | 4,640만 |
| LiveMath | 154 | 379 | 1 | 2,320만 | 360만 |
| ALFWorld | 516 | 1,321 | 2 | 5,930만 | 1,590만 |

최종 skill은 379 토큰에서 1,995 토큰이고 중앙값은 약 920 토큰이다. 가장 긴 것도 현대 frontier 모델의 통상적 system 프롬프트 예산보다 훨씬 아래이고 가장 짧은 것은 한 화면에 들어간다. 초기에서 최종으로의 증가율은 2.5배에서 53배까지 갈리지만(초기 skill이 한 줄인지 한 문단인지에 따른다) 절대 토큰 수가 작아 실무자가 배포 산출물을 몇 분 안에 읽고 감사하고 편집할 수 있다.

채택 편집은 1개에서 4개(중앙값 2.5)뿐이다. LiveMath의 +29.3%p와 OfficeQA의 +39.0%p는 각각 **단 1개** 편집에서 나왔다. validation gate가 실제로 작동한다는 직접 증거로, optimizer는 epoch당 훨씬 많은 편집을 제안하지만 소수만 held-out 검사를 통과한다. 나머지는 rejected-edit buffer에 담기고 target 모델에는 닿지 않는다. 훈련 비용은 두 영역으로 갈린다. rollout이 짧고 값싼 절차형(SpreadsheetBench, OfficeQA, LiveMath)은 test 1%p당 60만~360만 토큰인데 절대 이득은 오히려 이 세 벤치마크가 가장 크다. trajectory가 길거나 멀티모달 context가 풍부한 SearchQA(3,790만)와 DocVQA(4,640만)는 1%p당 비용이 한 자릿수 배 이상 크다. 이 비용은 훈련 시점에 한 번만 지불하고, export 이후 `best_skill.md`는 optimizer 호출도 가중치 갱신도 추가하지 않는다.

Figure 4의 학습 규칙은 instance-specific이 아니라 procedural이다. 어느 규칙도 특정 질문이나 파일, 개체를 지목하지 않으면서 frontier 모델이 zero-shot으로 적용하지 않는 규율을 담는다. 답 포맷 제약(OfficeQA, LiveMath), 특정 시각 영역으로의 증거 바인딩(DocVQA), workbook 구조 우선 추론(SpreadsheetBench), 검색 프론티어 규율(ALFWorld), canonical entity 선택(SearchQA)이다.

**정성적 skill 진화 (4.5절).** 두 사례 모두 SkillOpt은 초기 skill을 무관한 프롬프트로 교체하지 않는다. 채택 편집이 rollout에서 관찰된 반복 실패 모드 주변에 compact한 절차 제약을 덧붙인다.

| 사례 | 초기 skill | 채택 편집이 더한 것 | 대표 실행의 held-out test |
|---|---|---|---|
| ALFWorld (student GPT-5.4-nano, teacher GPT-5.5) | 대상 물체를 찾고 집어서 필요하면 변형한 뒤 목적지에 놓는 일반 가정 계획 | 정확한 물체 이름 매칭(mug, cup, pan, pot을 서로 대체하지 않음), visited-location 메모리, destination 메모리, pick-two 진행 락, 직접 완료 규칙(다음 하위 목표를 완료할 수 있으면 재확인 대신 그 행동을 실행) | 49.3%에서 74.6% |
| SpreadsheetBench (student와 optimizer 모두 GPT-5.5) | Python spreadsheet 라이브러리를 쓰고 무관한 workbook 내용을 보존하라는 일반 지침 | preview 대신 실제 workbook 검사, 여러 시트에 걸친 헤더와 대상 범위 탐색, lookup 전 키와 셀 타입 정규화, 구조 편집 중 서식 보존, 수식형 지시에서 evaluated static value 기록(INDEX/MATCH나 XLOOKUP을 언급해도 채점기가 셀 값을 읽으므로), 빈 결과 셀을 포함한 전체 대상 범위 채우기, helper 계산을 Python에 유지, 저장한 workbook을 다시 열어 경계 행과 남은 공백 확인 | 40.4%에서 78.9% |

ALFWorld 사례는 skill이 일반적 탐색과 변형, 배치 전략에서 물체 동일성과 탐색 메모리, 진행 락, 루프 차단기를 갖춘 유한 상태 실행 정책으로 진화하는 과정이다. SpreadsheetBench 사례는 같은 흐름을 workbook 검증 정책의 형태로 보여준다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **검증 신호 의존**: 채점된 trajectory와 held-out selection split에 의존하므로, 자동 verifier나 exact-match 지표, 실행 가능한 검사처럼 신뢰할 만한 피드백이 있는 태스크에 가장 직접적으로 적용된다. 성공이 주관적이거나 다차원이거나 판정 비용이 큰 open-ended 도메인에서는 validation gate가 더 강한 human 또는 model 기반 평가를 요구할 수 있다.
- **훈련 비용**: 배포 산출물은 compact한 `best_skill.md` 하나지만 skill 훈련에는 추가 rollout 연산과 optimizer 모델 호출이 든다. 같은 skill을 재사용하면 상각되지만 one-off 태스크에는 덜 매력적이다.
- **단일 skill 설계**: 큰 skill library를 키우거나 가중치를 바꾸는 대신 이식 가능한 단일 skill을 의도적으로 최적화한다. 배포는 단순해지지만 서로 무관한 절차를 여럿 요구하는 이질적 도메인에는 부족할 수 있다.
- **분포 의존 heuristic**: 최적화된 skill이 훈련 분포의 도메인 heuristic을 담을 수 있어, 상당히 다른 모델이나 harness, 태스크로 옮기기 전에는 신중한 held-out 평가가 필요하다.
- **향후 방향**: 도메인 사이에 인프라를 공유하는 skill library, optimizer 쪽 meta skill의 벤치마크 간 재사용, open-ended 태스크를 위한 reward-free 또는 preference 기반 validation gate, 최적화된 skill을 target 모델로 self-distillation하는 경로(가중치 수준 적응으로 가는 징검다리)를 든다.

## 6. 관련 연구 (Related Work)

- **프롬프트 auto-tuning과 에이전트 구성 탐색**: GEPA는 trajectory 피드백이 reflective prompt evolution을 이끌 수 있고 여러 언어 에이전트 태스크에서 강화학습을 능가함을 보였다. ABSTRAL과 EvoTest는 이 아이디어를 단일 프롬프트에서 멀티에이전트 설계 문서와 test-time 에이전트 시스템 진화로 확장하며 gradient나 fine-tuning을 쓰지 않는다. 이들은 언어 산출물을 최적화 대상으로 다뤄 실행 피드백을 직접 활용하지만 주로 프롬프트나 시스템 설계, 전체 config를 겨냥한다. SkillOpt은 대신 훈련하고 검증하고 export하고 재사용할 수 있는 persistent skill 문서를 최적화한다.
- **skill 구성과 skill 진화**: SkillsBench와 agentic skills에 대한 SoK는 skill을 재사용 가능한 절차 지식으로 규정하고 tool 정책과 적용 조건, 실행 루틴, 보조 자원을 다룬다. 선행 시스템들은 lifelong 경험이나 trajectory 교훈, skill 지식베이스, 이질적 도메인 자원에서 skill을 구성하고(Trace2Skill, SkillFoundry, AutoSkill, SkillX, Memp), 실패 분석과 생성 및 평가 및 개정 루프, 공진화하는 generator와 verifier, 집단적 갱신, 강화학습으로 정련한다(EvoSkill, SkillForge, EvoSkills, SkillClaw, SkillRL). 이 연구들이 skill 발견과 저장소 성장, 공유, 진화 탐색, 정책 최적화를 강조하는 데 비해 SkillOpt은 더 좁은 문제를 다룬다. trajectory batch, reflection minibatch, textual learning rate, validation gate, rejected-edit buffer, slow/meta update 같은 딥러닝식 통제로 compact한 도메인 skill 하나를 훈련하는 문제다.
- **trajectory reflection 계보**: Reflexion과 Self-Refine이 상류에 있고, TextGrad가 자연어 differentiation 개념을 제시했다.

## 7. 용어집 (Glossary)

- **skill document**: 에이전트 context에 삽입되는 자연어 정책. SkillOpt의 학습 대상인 external state다.
- **frozen target model (M)**: 가중치를 고정한 채 skill로만 적응되는 실행 모델. 논문의 student에 해당한다.
- **optimizer model**: rollout 증거로 skill 편집을 제안하고 병합하고 랭킹하는 별도 frontier 모델. 논문의 teacher에 해당하며 배포에는 참여하지 않는다.
- **edit budget (L_t)**: 스텝당 최대 편집 수. textual learning rate의 대응물이다.
- **held-out selection gate**: `D_sel`에서 selection 점수를 엄격히 올리는 후보만 수용하는 검증 관문. 동점은 거부한다.
- **rejected-edit buffer**: 거부된 편집과 관찰된 실패 패턴을 담아 같은 epoch의 이후 reflection에 negative feedback으로 재사용하는 epoch-local 버퍼.
- **slow update**: epoch 경계에서 종단 비교로 갱신하는 보호 필드 지침. `SLOW_UPDATE_START`와 `SLOW_UPDATE_END`로 구분되며 스텝 단위 편집이 덮어쓸 수 없다.
- **meta skill**: optimizer 전용 메모리. 어떤 편집이 도왔고 거부됐고 실패가 지속됐는지를 요약해 이후 optimizer 프롬프트에 prepend하며 배포본에는 실리지 않는다.
- **best_skill.md**: 배포되는 최종 산출물. 300~2,000 토큰 범위의 compact skill 문서다.
- **edit_apply_report.json**: 스텝마다 편집별 accept 또는 skip 상태를 남기는 감사 기록.

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 2 | "Figure 1: SkillOpt 개요 (Skill Space 손실 지형과 텍스트 공간 최적화 유추 표)" | caption-region | ★ wiki 권장 (architecture/overview) |
| fig02 | 4 | "Figure 2: SkillOpt 파이프라인 (rollout에서 reflection, merge, gate를 거쳐 best_skill.md까지, 그리고 slow/meta update)" | legacy-page-region | ★ wiki 권장 (method) |
| fig04 | 15 | "Figure 4: 벤치마크별 대표 학습 규칙 6개 (procedural rules 정밀 크롭)" | caption-region | ★ wiki 권장 (learned skill 예시) |
| fig03 | 12 | "Figure 3: epoch checkpoint별 train, selection, test 성능 추이" | caption-region | (선택) result trend |
| fig05 | 15 | "Figure 4가 실린 15쪽 전면 캡처 (fig04의 legacy 중복)" | legacy-page-region | (확인 필요) fig04로 대체됨 |
| tab01 | 7 | "Table 1: 52개 셀 메인 결과" | table-region | (선택) 결과 표 |
| tab02 | 8 | "Table 2: 하이퍼파라미터 6개 패널" | table-region | (선택) ablation 표 |
| tab03 | 8 | "Table 3: 컴포넌트 ablation" | table-region | (선택) ablation 표 |
| tab04 | 9 | "Table 4: 전이 실험 세 종류" | table-region | (선택) 결과 표 |
| tab05 | 14 | "Table 5: optimizer 강도 효과" | table-region | (선택) 결과 표 |
| tab06 | 14 | "Table 6: 비용과 편집 경제성" | table-region | (선택) 결과 표 |
