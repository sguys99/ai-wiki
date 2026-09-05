---
title: "Generative Skill Composition for LLM Agents"
type: paper
year: 2026
category: agents
source: zhao-2026-generative-skill-composition-for-llm.md
raw_path: raw/papers/zhao-2026-generative-skill-composition-for-llm.pdf
raw_filename: "zhao-2026-generative-skill-composition-for-llm.pdf"
source_collection: external
tags:
  - skill-composition
  - llm-agents
  - agent-skills
  - structured-prediction
  - skill-library
  - autoregressive-decoder
  - retrieval-augmented-decoding
  - skillsbench
  - tf-idf
  - tool-use
authors: "Xinyu Zhao, Zhen Tan, Vaishnav Tadiparthi, Nakul Agarwal, Kwonjoon Lee, Ehsan Moradi Pari, Hossein Nourkhiz Mahjoub, Tianlong Chen"
arxiv_id: "2606.32025"
url: "https://skill-composer.github.io/"
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/zhao-2026-generative-skill-composition-for-llm/fig01.png
    raw: raw/papers/zhao-2026-generative-skill-composition-for-llm-figures/fig01.png
    caption: "Figure 1: (A) 대형 skill library가 만드는 composition bottleneck (B) direct reasoning·retrieval vs. SkillComposer의 ordered executable plan (C) 더 나은 plan이 더 높은 task success로 이어짐"
    page: 2
    bbox_norm: [0.0808, 0.0771, 1.0, 0.2659]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/zhao-2026-generative-skill-composition-for-llm/fig02.png
    raw: raw/papers/zhao-2026-generative-skill-composition-for-llm-figures/fig02.png
    caption: "Figure 2: 196-skill library에서 task+environment를 받아 순서 있는 skill index 시퀀스 (s104, s184, s55 → nws-flood-thresholds, usgs-data-download, flood-detection)를 예측하는 구체 예시"
    page: 4
    bbox_norm: [0.0951, 0.0773, 0.8802, 0.2845]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/zhao-2026-generative-skill-composition-for-llm/fig03.png
    raw: raw/papers/zhao-2026-generative-skill-composition-for-llm-figures/fig03.png
    caption: "Figure 3: SkillComposer 3-컴포넌트 개요 — (A) frozen text encoder (B) auxiliary cardinality·set head를 단 autoregressive decoder (C) retrieval prior를 fuse하는 retrieval-augmented decoding"
    page: 5
    bbox_norm: [0.1205, 0.0771, 0.8549, 0.399]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/zhao-2026-generative-skill-composition-for-llm/fig04.png
    raw: raw/papers/zhao-2026-generative-skill-composition-for-llm-figures/fig04.png
    caption: "Figure 4: gold cardinality k별 Set F1 (in-distribution). SkillComposer가 k=1 버킷(over-emission이 가장 크게 벌 받는 구간)에서 우세해 macro-avg 최고"
    page: 8
    bbox_norm: [0.4778, 0.6184, 0.8945, 0.8355]
    strategy: caption-region
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/zhao-2026-generative-skill-composition-for-llm/fig05.png
    raw: raw/papers/zhao-2026-generative-skill-composition-for-llm-figures/fig05.png
    caption: "Figure 5: (a) α·β decoding-weight 민감도 격자 (bowl-shaped) (b) trainable params vs. 정확도 — SkillComposer Pareto-optimal (~154× 적은 파라미터) (c) inference latency vs. 정확도"
    page: 10
    bbox_norm: [0.0808, 0.0771, 0.8945, 0.2774]
    strategy: caption-region
    curated: true
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/zhao-2026-generative-skill-composition-for-llm/fig06.png
    raw: raw/papers/zhao-2026-generative-skill-composition-for-llm-figures/fig06.png
    caption: "Figure 6: single-skill synthesis 프롬프트 (Gemini 2.5 Flash) — 호출당 5개 task, skill 이름 직접 언급 금지 (Appendix B)"
    page: 16
    bbox_norm: [0.0808, 0.2751, 0.8945, 0.7552]
    strategy: caption-region
    curated: false
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/zhao-2026-generative-skill-composition-for-llm/fig07.png
    raw: raw/papers/zhao-2026-generative-skill-composition-for-llm-figures/fig07.png
    caption: "Figure 7: multi-skill synthesis 프롬프트 (Gemini 2.5 Pro) — dependency edge에서 유래한 ordering 제약을 verbatim 주입 (Appendix B)"
    page: 17
    bbox_norm: [0.0808, 0.2877, 0.8945, 0.7426]
    strategy: caption-region
    curated: false
  - id: tab01
    label: Table 1
    kind: table
    file: assets/zhao-2026-generative-skill-composition-for-llm/tab01.png
    raw: raw/papers/zhao-2026-generative-skill-composition-for-llm-figures/tab01.png
    caption: "Table 1: Skill prediction quality (%). Left: in-distribution synthetic test ( n =494 ). Right: real-task holdout ( n =65 ); trained models are retrained on the real-task-removed partition. Best non-oracle result in bold ; second best underlined ; oracle- cardinality retrievers (in italics ) are repo"
    page: 9
    bbox_norm: [0.0808, 0.1297, 0.8945, 0.4543]
    strategy: table-region
    curated: false
  - id: tab02
    label: Table 2
    kind: table
    file: assets/zhao-2026-generative-skill-composition-for-llm/tab02.png
    raw: raw/papers/zhao-2026-generative-skill-composition-for-llm-figures/tab02.png
    caption: "Table 2: Downstream task performance on SkillsBench. Pass rate follows the paper-binary protocol, Tok. is the average input prompt tokens per non-errored trial. Best non-oracle result in bold ; second best underlined."
    page: 9
    bbox_norm: [0.4818, 0.6917, 0.8945, 0.8548]
    strategy: table-region
    curated: false
  - id: tab03
    label: Table 3
    kind: table
    file: assets/zhao-2026-generative-skill-composition-for-llm/tab03.png
    raw: raw/papers/zhao-2026-generative-skill-composition-for-llm-figures/tab03.png
    caption: "Table 3: Model component ablation."
    page: 10
    bbox_norm: [0.597, 0.5013, 0.8945, 0.6413]
    strategy: table-region
    curated: false
  - id: tab04
    label: Table 4
    kind: table
    file: assets/zhao-2026-generative-skill-composition-for-llm/tab04.png
    raw: raw/papers/zhao-2026-generative-skill-composition-for-llm-figures/tab04.png
    caption: "Table 4: Decode-time retrieval prior ablation."
    page: 10
    bbox_norm: [0.6196, 0.7994, 0.8281, 0.9082]
    strategy: table-region
    curated: false
  - id: tab05
    label: Table 5
    kind: table
    file: assets/zhao-2026-generative-skill-composition-for-llm/tab05.png
    raw: raw/papers/zhao-2026-generative-skill-composition-for-llm-figures/tab05.png
    caption: "Table 5: Skill dependency graph used for grounding multi-skill synthesis."
    page: 15
    bbox_norm: [0.3042, 0.1627, 0.6711, 0.2686]
    strategy: table-region
    curated: false
  - id: tab06
    label: Table 6
    kind: table
    file: assets/zhao-2026-generative-skill-composition-for-llm/tab06.png
    raw: raw/papers/zhao-2026-generative-skill-composition-for-llm-figures/tab06.png
    caption: "Table 6: Per-layer Set F1 on the synthetic test split (%, deterministic baselines only). Trained-model rows are omitted because the per-layer canonical predictions were not saved with matching record IDs; rerunning inference on the canonical checkpoints is left to a future revision."
    page: 19
    bbox_norm: [0.1247, 0.5088, 0.8506, 0.6598]
    strategy: table-region
    curated: false
---

## 요약 (Summary)

에이전트에게 skill library를 쥐여 주면 곧바로 다음 병목이 생긴다. library가 커질수록 성능을 가르는 것은 "무엇을 obtaining하느냐"가 아니라 "무엇을 composing하느냐"다. 이 논문은 그 선택을 **어떤 skill을, 몇 개, 어떤 순서로**라는 세 축이 얽힌 결정으로 보고, 셋을 떼어 놓아선 안 된다고 못 박는다. retrieval은 순서 없는 subset만 내놓고, 에이전트에게 전체 library를 던지는 방식은 명시적 plan 없이 실행 trace에 결정을 묻어 버린다. 둘 다 세 축 중 일부를 놓친다.

그 대안이 **SkillComposer**다. skill 구성을 닫힌 어휘(library 인덱스 + STOP) 위의 **task-conditioned skill sequence prediction**으로 정식화하고, frozen encoder에 작은 autoregressive decoder를 붙여 subset·cardinality·ordering을 한 번의 디코딩으로 함께 뽑는다. 학습 파라미터는 ~3.9M에 불과하지만, SkillsBench에서 GPT-5.2-Codex와 Gemini-3-Pro-Preview의 pass rate를 no-skill 대비 +23.1 / +18.2 pp 끌어올리고, retrieval을 앞서며 gold-skill retrieval 상한에 근접한다. 그것도 skill 조건 가운데 가장 적은 prompt 토큰으로.

![[assets/zhao-2026-generative-skill-composition-for-llm/fig01.png]]
*Figure 1: 대형 skill library의 composition bottleneck(A)과, direct reasoning·retrieval이 놓치는 구조를 ordered executable plan으로 메우는 SkillComposer(B), 더 나은 plan이 더 높은 task success로 이어지는 관계(C) (Zhao 2026, p.2)*

## 주요 기여 (Key Contributions)

- **structured skill composition 정식화** — inference-time의 skill 사용을 고정 library 위의 구조적 예측으로 규정한다. 출력 plan이 subset·count·order 세 축을 동시에 결정하며, 이 셋은 나눌 수 없다는 것이 핵심 주장이다.
- **실제 library 기반 데이터셋** — real task-composition seed에서 skill dependency graph(196 노드, dependency edge 658 + workflow edge 266 = 924 edge)를 만들고, layered synthesis로 single-skill·multi-skill dependency-aware 감독 신호를 합성한다.
- **SkillComposer** — skill 인덱스 위의 constrained autoregressive decoder로, 생성되는 원소가 항상 실행 가능한 library skill에 대응한다(닫힌 어휘). 예측한 plan을 그대로 다운스트림 에이전트에 로드할 수 있다.
- **두 프로덕션 코딩 에이전트에서 검증** — {Codex, Gemini}에서 SkillsBench pass rate를 {+23.1, +18.2} pp 높여 retrieval을 앞서고 gold-skill 상한에 근접하되, prompt 토큰은 오히려 적게 쓴다.

## 문제 정식화 (Task-conditioned Skill Sequence Prediction)

task 설명 x, 환경 context c, skill library S={s₁,…,s_K}(K=196)가 주어지면, 모델이 STOP으로 끝나는 가변 길이 skill 인덱스 시퀀스를 예측한다. STOP 위치가 곧 skill 개수이고, 예측된 skill은 그 순서대로 에이전트 context에 로드된다. 한 번의 예측으로 "어느 skill을 쓸지(subset)·몇 개 쓸지(count)·어떤 순서로 쓸지(order)"를 함께 푸는 셈이다. skill은 tool(atomic API call)이나 일회성 plan과 달리 task·세션을 가로질러 지속되는 재사용 절차 지식이고, progressive disclosure로 시작 시점엔 compact 메타데이터만 로드했다가 예측이 끝난 뒤 full instruction을 편다.

![[assets/zhao-2026-generative-skill-composition-for-llm/fig02.png]]
*Figure 2: Michigan USGS 홍수 탐지 task를 받아 (s104, s184, s55) = (nws-flood-thresholds, usgs-data-download, flood-detection) 순서를 예측하는 구체 예시 (Zhao 2026, p.4)*

## 방법론 및 아키텍처 (Methodology and Architecture)

SkillComposer는 세 컴포넌트로 이뤄진다. **frozen text encoder**(Qwen3-Embedding-0.6B)가 직렬화된 프롬프트를 task 벡터로 매핑하고, **constrained autoregressive decoder**(3-layer·256-dim·4-head)가 skill 메타데이터에 cross-attention하며 인덱스가 아니라 자연어 설명으로 후보를 구분한다. AR head가 ordering을 전담하고, 여기에 두 auxiliary head가 붙는다. **cardinality head**는 skill 개수를 직접 예측해 STOP과 독립적인 length 신호를 주고, **set head**는 각 skill을 task와 독립 채점해 위치와 무관하게 모든 관련 skill에 gradient를 흘린다.

![[assets/zhao-2026-generative-skill-composition-for-llm/fig03.png]]
*Figure 3: frozen encoder + AR decoder + auxiliary head + retrieval-augmented decoding으로 이뤄진 SkillComposer 개요 (Zhao 2026, p.5)*

세 번째 축은 **retrieval-augmented decoding**이다. skill library가 heavy-tailed라 학습 표현만으론 꼬리 skill을 잘 못 가른다. 그런데 각 출력 인덱스가 고정 메타데이터 문서에 대응하므로, task당 한 번 계산해 둔 relevance score를 모든 디코딩 스텝에서 거의 공짜로 재사용할 수 있다. 그래서 contextual logit에 TF-IDF relevance(α=1.0)와 set-membership(β=0.5) prior를 더한다. 단 STOP logit에는 이 prior를 더하지 않아, 종료는 AR stop logit이 제어한다.

학습 데이터는 9,872개 레코드다. SkillBench의 real anchor 65개에, skill 이름을 직접 언급하지 않는 single-skill synthetic 2,880개(Gemini 2.5 Flash)와 2~5 skill을 엮는 multi-skill synthetic 6,927개(Gemini 2.5 Pro)를 더했다. multi-skill 조합은 196-노드 dependency graph에서 dependency edge(I/O type이 겹치는 hard data-flow 순서)와 workflow edge(trajectory 공출현에서 온 경험적 순서)를 65:35로 샘플링해 만든다.

## 결과 (Results)

**composition 품질.** in-distribution test(n=494)에서 Set F1 73.9로, SFT(600M)를 +2.8 pp, LLM-judge를 +12.9 pp 앞서는데 파라미터는 ~154× 적다(3.9M). 진짜 차이는 distribution shift에서 벌어진다. real-task holdout(n=65, synthetic만 학습)에서 SFT가 27.5 pp 급락하는 동안 SkillComposer는 11 pp만 떨어져 **+19.3 pp** 격차를 낸다. SFT는 synthetic 템플릿 분포를 외웠을 뿐 기댈 prior가 없는 반면, frozen retrieval-tuned encoder에 작은 specialist decoder를 얹은 구성은 전이 편향을 공급하기 때문이다.

![[assets/zhao-2026-generative-skill-composition-for-llm/fig04.png]]
*Figure 4: gold cardinality k별 Set F1. SkillComposer의 우위가 k=1(over-emission이 가장 벌 받는 구간)에 집중돼 macro-avg가 가장 높다 (Zhao 2026, p.8)*

**다운스트림 task success.** SkillsBench 75개 task를 두 에이전트로 돌린 결과, No Skills와 Gold Skills 사이에 약 +25 pp의 headroom이 있다. library를 통째로 주입하는 All Skills는 이 여백을 조금밖에 못 메우면서 Codex 프롬프트를 1.27M 토큰까지 부풀린다. context를 쏟아붓는 것만으론 안 된다는 뜻이다. SkillComposer는 oracle 레이블 없이 calibrated ordered shortlist를 예측해 45.3 / 44.0 pass rate에 도달한다. 두 retrieval baseline을 앞서고 Retrieval(oracle)을 매치하거나 넘어서면서, skill 조건 가운데 가장 적은 프롬프트 예산(1.03M Codex 토큰)으로 headroom의 약 80%를 닫는다.

| Skill 조건 | Codex Pass ↑ | Codex Tok ↓ | Gemini Pass ↑ | Gemini Tok ↓ |
|---|---|---|---|---|
| *Gold Skills* (상한) | *51.1* | *1.12M* | *48.4* | *1.18M* |
| No Skills | 22.2 | 0.94M | 25.8 | 0.99M |
| All Skills | 29.3 | 1.27M | 38.7 | 1.33M |
| Retrieval (top-3) | 44.0 | 1.09M | 41.8 | 1.14M |
| **SkillComposer** | **45.3** | **1.03M** | **44.0** | **1.08M** |

**효율.** decode-time prior로는 sparse가 dense를 이긴다. TF-IDF 73.9 > BM25 70.0 > Qwen3-Embedding 68.8 > no prior 67.5. 196개의 짧고 구문적으로 특이한 skill 이름에는 token-level overlap이 고정밀이기 때문이다. 단 task 표현에는 dense Qwen3-Embedding이 여전히 낫다 — 그래서 둘의 강점을 합쳐 쓴다. (α,β) 격자는 bowl-shaped이라 hand-tuning이 fragile하지 않고, SkillComposer는 SFT와 같은 latency class에서 ~154× 적은 파라미터·~25× 적은 compute로 Pareto-optimal에 앉는다.

![[assets/zhao-2026-generative-skill-composition-for-llm/fig05.png]]
*Figure 5: α·β 민감도 격자(a)와 파라미터·정확도(b)·latency·정확도(c) 프런티어. SkillComposer가 predicted-k 방법 중 Pareto-optimal (Zhao 2026, p.10)*

## 케이스 스터디 & 한계 (Case Studies & Limitations)

Appendix의 세 사례가 pass-rate 격차의 출처를 가른다. **adaptive-cruise-control**에서는 top-3 retrieval이 핵심 imc-tuning-rules를 잘라 실패하고 gold조차 무용한 I/O skill을 묶어 0.33에 그치는데, SkillComposer는 gold에서 벗어나 그 핵심 skill을 넣어 1.00을 낸다. gold key로 회귀하는 게 아니라 실제 유용한 skill을 식별한다는 뜻이다. **exoplanet-detection-period**에서는 최소 recipe가 중복 estimator를 얹은 gold(0.00)를 이겨, 작고 잘 고른 집합이 큰 curated 집합을 앞선다.

반대 방향의 약점도 분명하다. **lean4-proof** 같은 long-chain task에서는 SkillComposer의 shortlist가 한 슬롯 부족해지는 **short-sequence bias**가 나타난다. synthetic 코퍼스가 ≤3-skill 조합에 치우친 탓으로, long-sequence 학습 레코드 구축이 가장 실현 가능한 개선점이다. 그 밖에 text-only task와 code 지향 library에 국한된 범위, small-LM·embedding backbone에서 물려받은 특성도 future work로 남는다.

## 관련 페이지 (Related Pages)

- [[agents/yang-2026-skillopt-executive-strategy-for|SkillOpt (paper, Yang 2026)]] — skill 문서를 frozen agent의 학습 상태로 보고 편집·검증으로 훈련하는 text-space optimizer. 이쪽이 skill 내용을 *만들고 다듬는다면*, SkillComposer는 고정된 library에서 *무엇을·몇 개·어떤 순서로 고르는가*를 푼다 — orthogonal한 두 문제.
- [[agents/microsoft-skillopt|SkillOpt (Microsoft, repo)]] — 위 논문의 원전 프레임워크. best_skill.md 산출이라는 skill-creation 축과 대비되는 skill-composition 축.
- [[agents/hada-2026-agent-skills|Agent Skills (GeekNews)]] · [[agents/osmani-2026-agent-skills|Agent Skills (Addy Osmani)]] — open Agent Skills 표준과 progressive disclosure를 다룬 실무 자료. 이 논문이 전제로 삼는 skill 정의(메타데이터+절차)의 배경.
- [[agents/rodrigues-2026-mcp-server-architecture-patterns|MCP Server Architecture Patterns]] — context당 tool이 10~15개를 넘으면 선택 정확도가 90% 아래로 떨어진다는 프로덕션 관찰. "다 던지면 오히려 나빠진다"는 All Skills 결과와 같은 병목을 tool 층위에서 짚는다.
- [[agents/bai-2026-how-do-ai-agents-spend|How Do AI Agents Spend Your Money? (Bai et al.)]] — context를 부풀리면 토큰만 폭증하고 정확도는 오르지 않는다는 실증. SkillComposer가 최소 프롬프트로 headroom을 닫는 동기와 맞닿는다.
