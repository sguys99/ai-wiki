---
title: "Harness Updating Is Not Harness Benefit: Disentangling Evolution Capabilities in Self-Evolving LLM Agents"
type: paper
year: 2026
category: agents
raw_path: raw/papers/lin-2026-harness-updating-is-not-harness-benefit.pdf
raw_filename: "lin-2026-harness-updating-is-not-harness-benefit.pdf"
source_collection: external
source: lin-2026-harness-updating-is-not-harness-benefit.md
authors: "Minhua Lin, Juncheng Wu, Zijun Wang, Zhan Shi, Yisi Sang, Bing He, Zewen Liu, Tianxin Wei, Zongyu Wu, Zhiwei Zhang, Dakuo Wang, Xiang Zhang, Benoit Dumoulin, Cihang Xie, Yuyin Zhou, Suhang Wang, Hanqing Lu"
arxiv_id: "2605.30621"
tags: [harness-evolution, self-evolving-agents, agent-capabilities, skill-following, instruction-following, long-horizon, SWE-bench, MCP-Atlas, SkillsBench, claude-opus, qwen3, gpt-oss]
---

## 요약 (Summary)

Penn State · UC Santa Cruz · Amazon · Emory · UIUC · Northeastern의 공동 연구(arXiv 2605.30621, 2026-05-28). Self-evolving LLM agent에서 **end-to-end pass rate가 섞고 있는 세 source — agent의 base capability, evolver의 harness-updating capability, agent의 harness-benefit capability —를 분리**하고 7개 LLM × 3개 agentic benchmark의 controlled grid로 측정.

핵심 결론은 두 가지 **decoupling**이다.

1. **Harness-updating은 base capability와 flat**. evolver 사이 $\Delta_{\text{update}}$ spread는 어느 벤치마크에서도 최대 **3.1pp**, dominant evolver가 없다. 가장 작은 **Qwen3.5-9B(9B 오픈)가 SkillsBench에서 1위(+3.8pp)** 로 Opus 4.6(+2.3pp)·Qwen3-235B(+1.5pp)를 모두 능가. 사례 분석에서 9B evolver가 작성한 `flink-query` skill은 Opus 4.6 evolver의 skill과 **procedurally isomorphic**(step 순서·조건 동일, verbosity·디테일만 다름).

2. **Harness-benefit은 base capability와 non-monotonic**. mid-tier가 가장 많이 얻고(SWE peak Qwen3-235B +19.3pp, MCP peak GPT-OSS-120B +7.0pp), strong-tier는 ceiling으로 작은 gain, weak-tier(Qwen3-32B)는 headroom이 가장 큼에도 거의 얻지 못한다. 약한 쪽의 bottleneck은 두 failure mode:
   - **Harness activation failure**: Qwen3-32B의 SLR=0.251(vs Opus 0.957). `threejs` 사례에서 multi-key load action을 emit → format gate가 strict single-key를 요구 → parser error → skill body가 컨텍스트 진입 못함.
   - **Harness adherence failure**: Qwen3-32B의 HFR=0.142(vs Opus 0.757). **Qwen3-235B는 SLR=0.961로 Opus와 동률이지만 HFR=0.350** → activation과 adherence가 별개의 capability임을 깨끗이 분리. `pg-essay-to-audiobook` 사례에서 skill을 로드하고도 procedural guide를 literal script로 오해, fallback chain 무시.

게다가 weak-tier의 adherence는 **trajectory가 진행될수록 누진적으로 무너진다**: phase-adherence drift는 Qwen3-32B −0.39, GPT-OSS −0.24, Opus −0.09 (≈4× 차이). 즉 약한 모델은 단순히 load 시점 misread가 아니라 long-horizon instruction following 자체가 약하다.

> **Design guidance**: capability budget을 **evolver가 아니라 task-solving agent**에 투자하고, agent training에 (i) **harness invocation을 first-class skill**로 굽어넣고 (ii) **long-horizon instruction following**을 두 번째 target으로 강화하라.

## 주요 기여 (Key Contributions)

1. **Capability 분해**. 기존 end-to-end gain을 (a) base capability $M_{\text{base}}(f)$, (b) harness-updating $\Delta_{\text{update}}(e)$, (c) harness-benefit $\Delta_{\text{benefit}}(f)$ 세 metric으로 분리하는 formal framework. anchor agent set $F^\star$로 evolver-side, anchor evolver set $E^\star$로 agent-side를 독립 분석.
2. **Controlled 7×3 grid**. agent와 evolver를 독립 변화시켜 pairwise gain $\Delta(f,e)$를 측정. prompt template · trajectory window · initial harness · task stream · evolution budget을 모두 고정하고 **LLM backbone만** 변수로.
3. **Finding 1 (flat updating)**: $\Delta_{\text{update}}$ spread 최대 3.1pp, model scale ≠ updating 품질. Qwen3.5-9B가 SkillsBench에서 1위.
4. **Finding 2 (non-monotonic benefit)**: mid-tier가 가장 큰 gain. weak-tier의 낮은 gain은 ceiling이 아니라 **활성화·준수 실패**.
5. **두 failure mode 정량화**: SLR(activation), HFR(adherence) 두 metric으로 분리. Qwen3-235B 사례(SLR≈Opus, HFR≪Opus)로 두 capability의 독립성 입증.
6. **Long-horizon drift 정량화**: 5-phase adherence judge로 weak-tier의 누진적 adherence 붕괴 측정.
7. **HFR judge pipeline 공개**: 2-stage rubric extraction + per-cell verdict + phase classification. blinded model token(`<MODEL>` 치환)으로 family bias 제거.
8. **세 design takeaway**: agent에 capability 투자 · harness invocation 학습 · long-horizon instruction following 강화.

## 방법론 및 아키텍처 (Methodology and Architecture)

### Harness self-evolution formalism

Agent $A_t = (f, H_t)$ — $f$ frozen, $H_t$만 evolution. Evolver $e$:
$$\Delta H_t = e(H_{t-1}, D_t), \quad H_t = \text{Apply}(H_{t-1}, \Delta H_t)$$

Iterative solve-evolve loop $T$ step:
1. agent $A_{t-1}$이 batch $X_t$ 해결
2. evidence $D_t = \{(x, \tau_{t,x}, y_{t,x})\}$ 수집
3. evolver가 $H_t$ 산출
4. $T$회 반복 → final $H_T$

### Capability metrics

- **Base**: $M_{\text{base}}(f) = J_X(f, H_0)$
- **Pairwise gain**: $\Delta(f,e) = J_X(f, H^{(f,e)}_T) - M_{\text{base}}(f)$
- **Harness-updating**: $\Delta_{\text{update}}(e) = \frac{1}{|F^\star|}\sum_{f \in F^\star} \Delta(f,e)$ (mean over anchor agents)
- **Harness-benefit**: $\Delta_{\text{benefit}}(f) = \max_{e \in E^\star} \Delta(f,e)$ (best-case over anchor evolvers)

### In-situ evaluation

각 task $x \in X_t$는 evidence가 $D_t$에 들어가기 **전** harness $H_{t-1}$ 아래에서 채점 → 자기가 만들어낸 update가 자기 점수에 영향 못 줌.

### Editable harness scope

| Benchmark | Editable | Notes |
|---|---|---|
| SWE-bench Verified | `skills/` | tools read-only |
| MCP-Atlas | `skills/`, `prompts/system.md`, `memory/` (append-only JSONL) | tools read-only |
| SkillsBench | `skills/` | initial harness는 empty skill set, evolution으로만 채워짐 |

### HFR pipeline (Tab. 12–14)

**Stage 1 — Rubric Extraction**: SKILL.md에서 3–8개 imperative instruction을 JSON으로 잠금:
```json
{"skill_id": "<folder>", "instructions": [
  {"id": "step_1", "source_span": "<exact quote>", "text": "<imperative>",
   "type": "required|conditional|optional", "trigger": null,
   "success_criteria": "...", "violation_criteria": "..."}
]}
```

**Stage 2 — Per-cell Verdict + Phase Classification**: blinded trajectory(`Claude/Opus/Sonnet/Haiku/Qwen/GPT-OSS` → `<MODEL>`)에 rubric 적용:
- Verdict: `FOLLOWED` / `VIOLATED_COMMISSION` / `VIOLATED_OMISSION` / `REQUIRED_BUT_UNOBSERVED` / `NOT_APPLICABLE` / `INSUFFICIENT_EVIDENCE`
- Violation timing: `earliest_possible_turn`, `confirmed_turn`, `violation_type` (commission / omission / premature_stop / wrong_strategy)

**Phase-Adherence Judge** (별도 call): 5 phase(`harness_loaded` / `first_action` / `midpoint` / `pre_final` / `final_validation`)별 [0,1] adherence score → long-horizon drift 분석.

### SLR / HFR / LPR

- **SLR**: trajectory 중 valid single-key `load_skill` action으로 skill을 로드한 비율 (activation 측정)
- **HFR**: skill-loaded trajectory 중 judge가 "skill guidance를 따랐다"고 판정한 비율 (adherence 측정)
- **LPR**: skill-loaded trajectory의 pass rate (outcome)

## 결과 (Results)

### 데이터셋 (Tab. 4)

| Substrate | Tasks | Domains | Resources |
|---|---|---|---|
| SWE-bench Verified | 500 | 12 Python repos | issue + codebase + hidden test suite |
| MCP-Atlas | 500 | 36 MCP servers | 220 tools, 3–6 tool calls / task |
| SkillsBench | 86 | 11 domains | workspace files + deterministic verifier |

### Harness-updating $\Delta_{\text{update}}$ (Fig. 3)

| Evolver | SWE | MCP | SB |
|---|---|---|---|
| Opus 4.6 | 7.4 | 3.6 | 2.3 |
| Sonnet 4.6 | 7.4 | 2.6 | 1.2 |
| Haiku 4.5 | 8.0 | 2.3 | 2.7 |
| Qwen3-235B | **8.2** | 0.6 | 1.5 |
| Qwen3-32B | 7.8 | 2.3 | 0.7 |
| Qwen3.5-9B | 6.8 | 1.0 | **3.8** |
| GPT-OSS-120B | 5.9 | 1.9 | 1.5 |
| **spread** | **2.3pp** | **3.0pp** | **3.1pp** |

→ dominant evolver 없음, 9B 모델이 SB 1위. **flat in base capability**.

### Harness-benefit $\Delta_{\text{benefit}}$ (Tab. 1)

| Model (tier) | SWE Base / Δ | MCP Base / Δ | SB Base / Δ |
|---|---|---|---|
| Qwen3-32B (weak) | 3.6 / **4.4** | 3.6 / 1.0 | 0.0 / 5.8 |
| Qwen3-235B (mid) | 20.7 / **19.3** | 25.0 / 4.3 | 4.7 / 1.1 |
| GPT-OSS-120B (mid) | 26.2 / 15.8 | 28.0 / **7.0** | 0.0 / 7.0 |
| Haiku 4.5 (mid-strong) | 66.0 / 2.4 | 42.4 / 3.6 | 5.8 / **15.1** |
| Sonnet 4.6 (strong) | 73.2 / 2.8 | 54.0 / 3.2 | 24.4 / 3.5 |
| Opus 4.6 (strong) | 74.2 / 2.6 | 61.0 / 3.6 | 25.6 / 5.8 |

→ **non-monotonic**. mid-tier가 peak, 양 끝이 작음.

### Within-agent vs between-agent (Fig. 5, MCP)

- within-agent spread: 최대 **5.1pp** (Qwen3-235B 위에서 7 evolver)
- between-agent gap: **36.0pp** (Opus 4.6 vs Qwen3-235B base)
- extreme pairing(약한 agent + 최선 evolver vs 강한 agent + 최악 evolver)에서도 강한 agent가 **18.6–35.2pp 우위**

→ post-evolution score는 **agent 쪽에서 bottlenecked**. evolver scale-up ROI 작음.

### Activation·Adherence (Tab. 2, SkillsBench)

| Model | SLR | HFR | LPR |
|---|---|---|---|
| Qwen3-32B | 0.251 | 0.142 | 0.023 |
| GPT-OSS-120B | 0.446 | 0.442 | 0.040 |
| Haiku 4.5 | 0.794 | 0.600 | 0.099 |
| Qwen3-235B | **0.961** | 0.350 | 0.022 |
| Sonnet 4.6 | 0.959 | 0.730 | 0.145 |
| Opus 4.6 | 0.957 | **0.757** | **0.177** |

**Qwen3-235B의 cleanest separation**: SLR=Opus와 동률, HFR과 LPR은 1/2 수준 → activation 통과 ≠ adherence 보장.

### Long-horizon drift (Tab. 3, 5-phase adherence)

| Phase | Qwen3-32B | GPT-OSS-120B | Opus 4.6 |
|---|---|---|---|
| Harness loaded | 0.52 | 0.67 | **0.89** |
| Mid turn | 0.22 | 0.48 | 0.79 |
| Final turn | 0.13 | 0.43 | 0.80 |
| **drift (load → final)** | **−0.39** | **−0.24** | **−0.09** |

→ weak-tier는 trajectory 진행에 따라 adherence가 ≈4× 가파르게 무너진다. 단발 misread가 아니라 **누진적 instruction-following 붕괴**.

### Case studies

**flink-query (Fig. 4)** — Opus 4.6 agent를 고정하고 evolver만 변화:
- No skill: FINISH-event filter 누락 → 0.67
- Qwen3.5-9B-updated skill (~3,300자): "session windows(10-min gap) keyed by jobID, SUBMIT=0/FINISH=4, output (jobId, count), batch-style"
- Opus 4.6-updated skill (~3,800자): "10-min gap(600,000ms) key by jobId, KeyedProcessFunction + event-time timers"
- 둘 다 1.0 PASS. **procedurally isomorphic** — step 순서·조건 동일, verbosity·구현 디테일만 다름.

**threejs (Fig. 7 left)** — activation failure:
- Qwen3-235B: `{"load_skill":"threejs"}` 단일키 → 1.0
- Qwen3-32B: `{"analysis":..., "plan":..., "load_skill":"threejs"}` multi-key → format gate refuse → skill body 영원히 컨텍스트 미진입 → 0.0

**pg-essay-to-audiobook (Fig. 7 right)** — adherence failure:
- Skill 본문은 fallback chain "kokoro → edge-tts → pyttsx3 → espeak → gTTS"를 procedural guide로 제시
- Qwen3-32B: T0 skill 로드 → T1 literal script로 오독, `python3 audiobook_script.py` FileNotFoundError → T2–7 pip install loop → T8 `which espeak` √이지만 fallback chain 건너뜀 → T10 `task_complete=true; "No TTS tools available"` silent give-up → 0.0
- GPT-OSS-120B: T0–11 skill 없이 자체 시도 → T12 skill 로드 → T13 procedural guide로 읽음 → T16 pyttsx3(첫 fallback) → T17 espeak/ffmpeg install → T19 subprocess+espeak로 fallback chain 일치 → T21 URL 수정 → T23 PASS

### 세 design takeaway

1. **Capability budget을 agent에 투자**. evolver 간 gap ≤3.1pp, agent 간 gap 36pp. evolver scaling은 ROI 작다.
2. **Harness invocation을 first-class skill로 학습**. Qwen3-32B 25% load rate vs strong-tier 96% → format-aware skill-loading 자체를 training target으로.
3. **Long-horizon instruction following 강화**. drift −0.39 vs −0.09 → trajectory 후반부까지 skill을 잊지 않는 능력을 RL/SFT로.

## 관련 페이지 (Related Pages)

- [[agents/lee-hoyeon-2026-harness-engineering|Harness Engineering (이호연, Team Attention)]] — 같은 "harness" 개념의 **prescriptive engineering** 관점. Lee는 *"모델 교체 5% < 하네스 설계 15%"* 라는 정성적 슬로건과 Claude Code 도구 매핑(skills, agents, hooks, MCP, CLAUDE.md 3-tier)을 제시했고, 본 논문은 그 주장의 **empirical foundation**을 제공한다 — within-agent spread 5.1pp vs between-agent gap 36pp가 정확히 Lee의 "harness가 model보다 큰 lever"라는 주장의 정량 증거. 다만 본 논문은 약한 모델에서 그 lever가 **활성화 실패로 인해 작동하지 않는다**는 caveat를 추가한다.
- [[agents/qiao-2026-memory-intelligence-agent|MIA (Memory Intelligence Agent)]] — non-parametric(workflow memory) ↔ parametric(Planner LoRA-style) 분리 + GRPO two-stage RL. 본 논문이 진단한 두 failure mode(activation/adherence)를 **parametric memory와 long-horizon adherence를 동시에 학습**하는 방식으로 회피하는 후속 방향. MIA의 *"메모리는 Executor가 아닌 Planner에 주입해야 한다"* ablation은 본 논문의 *"capability budget을 task-solving agent에 투자"* takeaway와 일치하지 않는 측면이 있어(MIA는 Planner=evolver에 학습, agent=Executor는 frozen) 비교 분석 필요.
- [[agents/dennis-2026-compiling-agentic-workflows-into-llm|Subterranean Agent (Dennis et al.)]] — *"persistent structure belongs in weights, transient state belongs in prompt"* 명제로 harness를 **모델 가중치로 컴파일**하는 대안 path. 본 논문이 측정한 "weak-tier가 harness invocation/adherence에 실패한다"는 발견은 Dennis 등의 *컴파일 패러다임*에 추가 동기를 제공한다 — invocation/adherence가 어렵다면 procedural structure를 weights로 옮기는 것이 한 해법.
- [[agents/zou-2026-task-focused-memorization-multimodal-agents|TaskMem (Zou et al.)]] — long-term memory를 **학습 가능한 memorization policy** $\pi_\theta(m_t|q_t)$로 재정식화하여 2,048-dim adapter vector로 흡수. 본 논문이 진단한 *adherence failure*에 대한 directly-relevant 대응: skill을 컨텍스트에 로드해서 따르게 하는 대신 model parameter에 task-focused로 흡수해 invocation/adherence 의존을 없앤다.
- [[applications/dnotitia-akb|AKB (dnotitia/AKB)]] — MCP-first agent knowledge base. 본 논문의 SLR/HFR 발견은 *"weak-tier agent를 AKB 같은 외부 store와 결합할 때 invocation을 학습시키지 않으면 store가 무용지물"* 이라는 운영 시사점을 더한다.
- [[applications/liu-2026-rag-llm-wiki-or-gbrain|RAG, LLM Wiki, or GBrain? (Liu)]] — *retrieve / compile / act* 3축 결정 프레임워크. "Fat Skills(act)" 축이 본 논문의 SkillsBench와 정확히 매핑. Liu의 "한 skill = 하나의 act recipe" 권고는 본 논문의 *procedural isomorphism* 관찰(9B와 Opus가 같은 recipe를 쓴다)과 호환.
