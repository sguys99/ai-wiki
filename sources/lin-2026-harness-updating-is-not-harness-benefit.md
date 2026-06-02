---
title: "Harness Updating Is Not Harness Benefit: Disentangling Evolution Capabilities in Self-Evolving LLM Agents"
type: paper
year: 2026
category: agents
raw_path: /Users/kmyu/Desktop/project/ai-wiki/raw/papers/lin-2026-harness-updating-is-not-harness-benefit.pdf
raw_filename: "lin-2026-harness-updating-is-not-harness-benefit.pdf"
source_collection: external
tags: [harness-evolution, self-evolving-agents, agent-capabilities, skill-following, instruction-following, long-horizon, SWE-bench, MCP-Atlas, SkillsBench, claude-opus, qwen3, gpt-oss]
authors: "Minhua Lin, Juncheng Wu, Zijun Wang, Zhan Shi, Yisi Sang, Bing He, Zewen Liu, Tianxin Wei, Zongyu Wu, Zhiwei Zhang, Dakuo Wang, Xiang Zhang, Benoit Dumoulin, Cihang Xie, Yuyin Zhou, Suhang Wang, Hanqing Lu"
arxiv_id: "2605.30621"
---

## 한 줄 요약 (One-line Summary)

Self-evolving LLM agent의 효과를 **evolver의 harness-updating 능력**과 **agent의 harness-benefit 능력** 두 capability로 분해하고, 7개 LLM × 3개 agentic benchmark(SWE-bench Verified · MCP-Atlas · SkillsBench)로 측정한 controlled analysis. 핵심 결론은 (i) **harness-updating은 base capability와 flat** — Qwen3.5-9B 같은 9B 오픈모델 evolver도 Claude Opus 4.6과 procedurally isomorphic한 skill을 작성하고 동등한 gain을 만들고, (ii) **harness-benefit은 base capability에 non-monotonic** — mid-tier(GPT-OSS-120B 등)가 가장 많이 얻고 weak-tier는 두 가지 failure mode(harness activation failure / harness adherence failure)로 인해 거의 얻지 못한다. 결론: capability budget을 evolver가 아니라 task-solving agent에 투자하고, harness 호출과 long-horizon instruction following을 agent training의 first-class target으로 삼아야 한다.

## 1. 자료 정보 (Document Information)

- **저자**: Minhua Lin¹*, Juncheng Wu²*(공동 1저자), Zijun Wang², Zhan Shi³, Yisi Sang³, Bing He³, Zewen Liu⁴, Tianxin Wei⁵, Zongyu Wu¹, Zhiwei Zhang¹, Dakuo Wang⁶, Xiang Zhang¹, Benoit Dumoulin³, Cihang Xie², Yuyin Zhou², Suhang Wang¹, Hanqing Lu³
  - ¹Penn State University · ²UC Santa Cruz · ³Amazon · ⁴Emory University · ⁵UIUC · ⁶Northeastern University
  - 교신 이메일: `{mfl5681, szw494}@psu.edu`, `{jwu418}@ucsc.edu`, `{luhanqin}@amazon.com`
- **arXiv**: 2605.30621v1, 2026-05-28, cs.AI, 24 페이지(본문 11p + 부록)
- **벤치마크 3개**: SWE-bench Verified, MCP-Atlas, SkillsBench
- **모델 7개**: Claude {Opus 4.6, Sonnet 4.6, Haiku 4.5} · Qwen3-{235B-A22B, 32B} · Qwen3.5-9B · GPT-OSS-120B
- **공개**: 본문 abstract에 "Our source code is publicly available at here." (구체 URL은 본문 추출 텍스트에서 확인되지 않음)

## 2. 주요 기여 (Key Contributions)

1. **Harness self-evolution을 두 evaluation capability로 분해**. 기존 end-to-end 점수(post-evolution pass rate)는 (a) agent의 base capability, (b) evolver의 **harness-updating capability**(execution evidence로부터 useful harness update를 만드는 능력), (c) agent의 **harness-benefit capability**(updated harness로부터 이득을 얻는 능력)를 하나로 섞는다. 이 세 요소를 분리하는 metric을 formal하게 정의.
2. **Controlled grid 실험**. 7 LLM × 3 benchmark에서 agent와 evolver를 독립적으로 변화시켜 pairwise evolution gain $\Delta(f,e) = J_X(f, H^{(f,e)}_T) - M_{\text{base}}(f)$ 측정. anchor agent set $F^\star$ = {Opus 4.6, Sonnet 4.6, Qwen3-235B}로 evolver-side, anchor evolver set $E^\star$ = {Opus 4.6, Sonnet 4.6, Qwen3-235B}로 agent-side 분석.
3. **Finding 1: Harness-updating is flat in base capability**. evolver들 사이 $\Delta_{\text{update}}$ spread는 어느 벤치마크에서도 **최대 3.1pp**. SWE에서 Qwen3-235B가 8.2pp로 1위지만 MCP에서는 0.6pp로 꼴찌; SkillsBench에서는 **Qwen3.5-9B(3.8pp)가 Opus 4.6(2.3pp)와 Qwen3-235B(1.5pp)를 모두 능가**. evolver 사이에 dominant model이 없다.
4. **Case study: 9B evolver가 Opus와 procedurally isomorphic한 skill을 작성**. SkillsBench의 `flink-query` task에서 (i) no-evolver: agent가 FINISH-event filter를 빼먹어 0.67점, (ii) Qwen3.5-9B-updated skill 주입: 1.0점, (iii) Opus 4.6-updated skill 주입: 1.0점. 두 evolver가 만든 skill은 표현(verbosity, 길이 ~3,300자 vs ~3,800자)만 다를 뿐 step 순서·로직이 **procedurally isomorphic**.
5. **Finding 2: Harness-benefit is non-monotonic in base capability**. SWE에서 Qwen3-235B가 +19.3pp로 peak, 더 강한 Opus 4.6은 +2.6pp; MCP에서 GPT-OSS-120B가 +7.0pp peak, 양 끝은 작다. 약한 쪽(Qwen3-32B)은 headroom이 가장 큼에도 거의 얻지 못한다 — ceiling effect로 설명 불가.
6. **Weak-tier의 두 failure mode 진단** (SkillsBench, Table 2):
   - **Harness activation failure**: 약한 모델은 skill을 working context로 가져오지 못한다. Skill-Load Rate(SLR) = Qwen3-32B 0.251, GPT-OSS-120B 0.446, 강한 모델 ≈0.957. `threejs` 사례: Qwen3-32B가 `{"load_skill":"threejs", "analysis":..., "plan":...}` multi-key action을 emit → format gate가 strict single-key 기대 → parser error → skill body 영원히 컨텍스트 진입 실패.
   - **Harness adherence failure**: skill이 로드되어도 따르지 못한다. Harness-Following Rate(HFR) = Qwen3-32B 0.142 vs Opus 4.6 0.757. Qwen3-235B는 SLR=0.961(Opus와 동률)이지만 HFR=0.350 → activation과 adherence가 **별개의 capability**임을 깨끗이 분리. `pg-essay-to-audiobook` 사례: Qwen3-32B가 skill 본문을 읽고도 procedural guide가 아니라 ready-made script로 오해, 첫 시도(`python3 audiobook_script.py`) 실패 → fallback chain 무시 → silent give-up.
7. **Long-horizon adherence drift 정량화** (Table 3, phase-adherence judge): trajectory를 5 phase(harness_loaded · first_action · midpoint · pre_final · final_validation)로 분할, 각 phase 내 adherence score in [0,1]. drift (load→final):
   - Qwen3-32B: 0.52 → 0.13 (drift **-0.39**)
   - GPT-OSS-120B: 0.67 → 0.43 (drift -0.24)
   - Opus 4.6: 0.89 → 0.80 (drift -0.09)
   - 약한 모델은 단순히 load 시점에 잘못 읽는 게 아니라 **trajectory가 진행될수록 adherence가 누진적으로 무너진다**.
8. **세 design takeaways**:
   - (i) capability budget을 evolver가 아니라 task-solving agent에 투자하라. evolver 간 gap은 최대 3.1pp인 반면 agent base capability 차이는 36.0pp(MCP Opus vs Qwen3-235B)에 달한다.
   - (ii) harness 호출(invocation)을 first-class learned skill로 agent training에 굽어넣어라. 25% load rate → 96% gap이 huge bottleneck.
   - (iii) long-horizon instruction following을 두 번째 training target으로. drift -0.39 vs -0.09 (≈4× 차이).

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 Harness self-evolution 형식화

Agent를 $A_t = (f, H_t)$로 정의 — $f$는 frozen LLM backbone, $H_t$는 evolution step $t$의 외부 harness state(prompts, skills, memories, tools). $f$는 학습되지 않고 $H_t$의 editable 부분만 업데이트된다.

**Evolver** $e$는 이전 harness $H_{t-1}$과 execution evidence $D_t$로부터 update를 제안:

$$\Delta H_t = e(H_{t-1}, D_t), \quad H_t = \text{Apply}(H_{t-1}, \Delta H_t)$$

**Evolution protocol**은 iterative solve-evolve loop:
1. step $t$에 task batch $X_t$를 받음
2. agent $A_{t-1}$이 각 task $x$ 해결 → $(\tau_{t,x}, y_{t,x}) = \text{Solve}(A_{t-1}, x)$
3. execution evidence $D_t = \{(x, \tau_{t,x}, y_{t,x}) : x \in X_t\}$ 수집
4. evolver가 $H_t$ 생성
5. $T$ step 반복하여 final harness $H_T$ 산출

### 3.2 세 가지 capability metric

- **Base capability** $M_{\text{base}}(f) = J_X(f, H_0)$ — initial harness에서의 task-solving 성능
- **Pairwise evolution gain** $\Delta(f,e) = J_X(f, H^{(f,e)}_T) - M_{\text{base}}(f)$
- **Harness-updating capability**: $\Delta_{\text{update}}(e) = \frac{1}{|F^\star|}\sum_{f \in F^\star} \Delta(f,e)$ — anchor agent set 위 mean gain
- **Harness-benefit capability**: $\Delta_{\text{benefit}}(f) = \max_{e \in E^\star} \Delta(f,e)$ — anchor evolver set 위 max gain (best-case)

### 3.3 In-situ evaluation

각 task $x \in X_t$는 evidence가 $D_t$에 들어가기 **전** harness $H_{t-1}$ 아래에서 채점된다. 따라서 개별 task의 점수는 자기 자신이 만들어낸 harness update에 영향받지 않는다.

### 3.4 Implementation 고정

| 항목 | 설정 |
|---|---|
| Prompt template | 모든 agent·evolver 페어 공통 (Tab. 8/9/10/11) |
| Trajectory window | 모든 페어 동일 |
| 초기 harness $H_0$ | 벤치마크별 동일 |
| Task stream $X$ | 페어간 동일 |
| Evolution budget $\beta$, per-task turn limit | 동일 |
| Variable | **LLM backbone만** |

**Editable harness scope**:
- SWE-bench Verified: `skills/` 만
- SkillsBench: `skills/` 만
- MCP-Atlas: `skills/` + `prompts/system.md` + `memory/` (append-only JSONL)
- `tools/`는 모든 벤치마크에서 read-only

### 3.5 HFR (Harness-Following Rate) judge pipeline

SkillsBench의 adherence를 측정하기 위한 2-stage LLM judge:

**Stage 1: Locked Rubric Extraction** (Tab. 12). SKILL.md 본문에서 3–8개의 imperative instruction을 추출하여 JSON rubric으로 잠금:
```json
{
  "skill_id": "<skill folder name>",
  "instructions": [
    {"id": "step_1", "source_span": "<exact quote>", "text": "<imperative paraphrase>",
     "type": "required|conditional|optional", "trigger": null,
     "success_criteria": "...", "violation_criteria": "..."}
  ]
}
```

**Stage 2: Per-cell Adherence + Phase Classification** (Tab. 13). blinded trajectory(모델 토큰 Claude/Opus/Sonnet/Haiku/Qwen/GPT-OSS는 모두 `<MODEL>` 치환)에 rubric을 적용, 각 instruction별 verdict:
- `FOLLOWED` / `VIOLATED_COMMISSION` / `VIOLATED_OMISSION` / `REQUIRED_BUT_UNOBSERVED` / `NOT_APPLICABLE` / `INSUFFICIENT_EVIDENCE`
- violation은 `earliest_possible_turn`, `confirmed_turn`, `violation_type`(commission / omission / premature_stop / wrong_strategy)으로 timing 기록

**Phase-Adherence Judge** (Tab. 14). 5 phase(harness_loaded · first_action · midpoint · pre_final · final_validation)별 [0,1] adherence score → Table 3의 long-horizon drift 분석 근거.

### 3.6 SLR (Skill-Load Rate)

agent의 trajectory 중 **active**하게 skill을 컨텍스트로 로드한 trajectory 비율. format-gate를 통과하는 valid single-key load action이 있어야 카운트 — `threejs` 사례처럼 multi-key embedding은 invalid.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 데이터셋 통계 (Table 4)

| Substrate | $N_b$ | #Domains | 제공 리소스 |
|---|---|---|---|
| SWE-bench Verified | 500 | 12 repos | Codebase snapshot, issue description, hidden test suite |
| MCP-Atlas | 500 | 36 MCP servers | 220 tools shared across servers, 3–6 tool calls per task |
| SkillsBench | 86 | 11 task domains | Workspace files, deterministic verifier |

### 4.2 Harness-updating $\Delta_{\text{update}}$ (Figure 3, evolver 7개, agent anchor F⋆=3개)

| Evolver | SWE | MCP | SB |
|---|---|---|---|
| Opus 4.6 | 7.4 | 3.6 | 2.3 |
| Sonnet 4.6 | 7.4 | 2.6 | 1.2 |
| Haiku 4.5 | 8.0 | 2.3 | 2.7 |
| Qwen3-235B | 8.2 | 0.6 | 1.5 |
| Qwen3-32B | 7.8 | 2.3 | 0.7 |
| Qwen3.5-9B | 6.8 | 1.0 | **3.8** |
| GPT-OSS-120B | 5.9 | 1.9 | 1.5 |
| **spread (max − min)** | **2.3** | **3.0** | **3.1** |

- 어떤 벤치마크에서도 dominant evolver 없음, 최대 spread 3.1pp (MCP)
- Qwen3-235B는 SWE 1등(8.2)이지만 MCP 꼴찌(0.6) — reshuffling
- Qwen3.5-9B(가장 작은 모델)가 SB에서 1등(3.8) — model scale ≠ harness-updating

### 4.3 Within-agent spread vs between-agent gap (Figure 5, MCP)

- agent별로 7개 evolver의 post-evolution score plot. within-agent spread는 최대 **5.1pp** (Qwen3-235B 위에서)
- between-agent gap은 **36.0pp** (Opus 4.6 vs Qwen3-235B base capability)
- 최강 페어(약한 agent + 최선 evolver) vs 최약 페어(강한 agent + 최악 evolver) 비교에서도 강한 agent가 **18.6–35.2pp 우위**

> **결론**: post-evolution score는 agent 쪽에서 bottlenecked. evolver scale-up의 ROI는 작다.

### 4.4 Harness-benefit $\Delta_{\text{benefit}}$ (Table 1, evolver anchor E⋆=3개)

| Model | SWE Base | SWE Δ | MCP Base | MCP Δ | SB Base | SB Δ |
|---|---|---|---|---|---|---|
| Qwen3-32B | 3.6 | 4.4 | 3.6 | 1.0 | 0.0 | 5.8 |
| Qwen3-235B | 20.7 | **19.3** | 25.0 | 4.3 | 4.7 | 1.1 |
| GPT-OSS-120B | 26.2 | 15.8 | 28.0 | **7.0** | 0.0 | 7.0 |
| Haiku 4.5 | 66.0 | 2.4 | 42.4 | 3.6 | 5.8 | **15.1** |
| Sonnet 4.6 | 73.2 | 2.8 | 54.0 | 3.2 | 24.4 | 3.5 |
| Opus 4.6 | 74.2 | 2.6 | 61.0 | 3.6 | 25.6 | 5.8 |

- SWE: peak Qwen3-235B(+19.3), Opus +2.6 (ceiling), Qwen3-32B +4.4 (bottleneck)
- MCP: peak GPT-OSS-120B(+7.0), 양 끝 작음
- SB: peak Haiku 4.5(+15.1) — Haiku의 base 5.8 → 20.9
- non-monotonic 패턴 일관 — strong 쪽은 ceiling, weak 쪽은 different bottleneck

### 4.5 Activation·Adherence·Loaded-pass rate (Table 2, SkillsBench)

| Model | SLR (activate) | HFR (follow) | LPR (loaded-pass) |
|---|---|---|---|
| Qwen3-32B | 0.251 | 0.142 | 0.023 |
| GPT-OSS-120B | 0.446 | 0.442 | 0.040 |
| Haiku 4.5 | 0.794 | 0.600 | 0.099 |
| Qwen3-235B | **0.961** | 0.350 | 0.022 |
| Sonnet 4.6 | 0.959 | 0.730 | 0.145 |
| Opus 4.6 | 0.957 | **0.757** | **0.177** |

- 강한 모델 SLR ≈ 96%, 약한 모델 25%(Qwen3-32B) / 45%(GPT-OSS-120B)
- **Qwen3-235B는 SLR=0.961로 Opus 동률이지만 HFR=0.350, LPR=0.022** → activation 통과해도 adherence가 낮으면 점수도 낮음 — 두 capability가 별개임을 깨끗이 분리

### 4.6 Per-phase adherence drift (Table 3)

| Phase | Qwen3-32B (weak) | GPT-OSS (mid) | Opus 4.6 (strong) |
|---|---|---|---|
| Harness loaded | 0.52 | 0.67 | **0.89** |
| Mid turn | 0.22 | 0.48 | 0.79 |
| Final turn | 0.13 | 0.43 | 0.80 |
| **drift (load → final)** | **−0.39** | **−0.24** | **−0.09** |

- weak-tier는 long-horizon에서 adherence가 누진적으로 무너진다 (strong tier 대비 ≈4× 가파른 drop)

### 4.7 Case studies (Figures 4, 7)

**flink-query (SkillsBench, evolver 비교)**:
- No evolver: agent가 FINISH-event filter 누락, `jobInput` 파라미터를 pipeline에 연결 안 함, 미완성 job count 포함 → 0.67
- Qwen3.5-9B-updated skill (~3,300자): "session windows(10-min gap) keyed by jobID, SUBMIT(et==0) FINISH(et==4)로 completed jobs, output (jobId, count), batch-style: collect→sort→split into sessions→take max"
- Opus 4.6-updated skill (~3,800자): "10-min gap(600,000ms) key by jobId, SUBMIT(et==0) FINISH(et==4), KeyedProcessFunction + event-time timers 10min after last SUBMIT"
- 두 skill 모두 → 1.0 PASS. 표면적 verbosity와 implementation 디테일만 다르고 **procedural step 시퀀스 동일**.

**threejs (SkillsBench, harness activation failure)**:
- Skill `threejs`는 catalog에 listed
- Qwen3-235B: turn 0에서 `{"load_skill":"threejs"}` 단일키 emit → skill 본문 로드 → 1.0
- Qwen3-32B: `{"analysis":"...", "plan":"1. Load the threejs skill...", "load_skill":"threejs"}` multi-key, load_skill이 다른 키와 smuggled-in → format gate가 strict single-key를 요구 → parser error → **skill body가 영원히 컨텍스트 진입 못함** → 0.0

**pg-essay-to-audiobook (SkillsBench, harness adherence failure)**:
- Skill 본문은 fallback chain "kokoro → edge-tts → pyttsx3 → espeak → gTTS"를 procedural guide로 제시
- Qwen3-32B (FAIL 0.0):
  - T0: `{'load_skill':'pg-essay-audiobook'}` 성공
  - T1: skill 본문을 literal script로 오독, `python3 audiobook_script.py` 시도 → FileNotFoundError
  - T2–7: externally-managed pip install loop 실패
  - T8: `which espeak` √ → **fallback chain 건너뜀**
  - T10: `task_complete=true; "No TTS tools available"` → silent give-up
- GPT-OSS-120B (PASS 1.0):
  - T0–11: skill 없이 자기 TTS script 작성 시도
  - T12: `{"load_skill":"pg-essay-to-audiobook"}` emit → 본문 로드
  - T13: procedural guide로 읽음
  - T16: pyttsx3(첫 fallback) 시도
  - T17: apt-get espeak ffmpeg
  - T19: subprocess + espeak → matches body's fallback chain
  - T21: paulgraham URL 수정
  - T23: `audiobook.mp3` 통과

## 5. 한계와 향후 과제 (Limitations and Future Work)

저자가 명시한 한계:

- **Parametric fine-tuning, RL, hybrid adaptation은 평가 범위 밖**. weight update + harness update 결합의 capability decomposition은 follow-up.
- **Model set은 representative이나 exhaustive 아님**. 더 넓은 grid(family · scale · training recipe · cost)에서 capability 패턴이 어떻게 변하는지 추가 분석 필요.
- **Harness representation은 고정**: SWE/SB는 skills만, MCP는 skills+prompts+memory. tools 자체의 self-evolution(`tools/`)은 read-only로 제외 → 결과의 일반화는 editable scope에 의존.

함의되는 follow-up:
- Activation·Adherence 격차를 줄이는 **agent post-training recipe**(예: skill invocation을 reward로, long-horizon instruction following을 RL target으로)
- weak-tier가 evolver로서 활용 가치가 있는지 — 9B가 procedurally isomorphic skill을 만든다면 **추론 비용 절감용 evolver**로 배치 가능한가?
- evolver와 agent의 **role-specific training** 분리 가능성(agent는 harness-benefit, evolver는 harness-updating에 각각 최적화)

## 6. 관련 연구 (Related Work)

### 6.1 Harness engineering — harness가 담는 것

- **Prompts**: Zhou et al. 2022(human-level prompt engineers), Yao et al. 2022(ReAct), Yang et al. 2024b(SWE-agent), Pan et al. 2026
- **Tools**: Hou et al. 2025, Qin et al. 2024, Liu et al. 2025, Lin et al. 2025, 2026a
- **Memory**: Ouyang et al. 2025, Xu et al. 2026(A-Mem), Fang et al. 2026
- **Skills**: Li et al. 2026b(SkillsBench), Liu et al. 2026
- **Code-as-harness**: Ning et al. 2026, Lee et al. 2026
- 이들은 모두 harness representation에 초점. 본 논문은 capability 분석으로 보완.

### 6.2 Self-evolution of LLM agents — harness가 어떻게 업데이트되는가

- **Task-attempt level (early)**: Reflexion(Shinn et al. 2023, verbal self-reflection), Self-Refine(Madaan et al. 2023, iterative self-feedback), ExpeL(Zhao et al. 2024, natural-language insights)
- **Prompt-level**: PromptWizard(Agarwal et al. 2024), ACE(Zhang et al. 2025b, contextual playbooks), **GEPA**(Agrawal et al. 2026, trajectory-level reflection)
- **Memory-level**: EvolveR(Wu et al. 2025), MemEvolve(Zhang et al. 2025a), MemMA(Lin et al. 2026c), Evo-memory(Wei et al. 2025)
- **Skill/workflow-level**: Voyager(Wang et al. 2023, executable skills), AWM(Wang et al. 2024, induced workflows), **SkillRL**(Xia et al. 2026, recursive skill expansion via RL), **EvoSkill**(Alzubi et al. 2026), AutoSkill(Yang et al. 2026)
- **Tool-level**: Chen et al. 2025, Li et al. 2026a
- **Unified**: Zhou et al. 2026(externalization in LLM agents)

저자가 강조하는 본 논문의 보완점: 기존 evaluation은 "한 evolver + 한 agent + 한 benchmark"의 end-to-end gain만 보고 → base · updating · benefit 세 source를 conflate. 본 논문은 agent와 evolver를 **independently vary**하여 각 capability가 base와 얼마나 decouple되는지 측정.

### 6.3 벤치마크

- SWE-bench Verified (Jimenez et al. 2024)
- MCP-Atlas (Bandi et al. 2026)
- SkillsBench (Li et al. 2026b)
- TerminalBench (Merrill et al. 2026) — SkillsBench의 5-trial averaging 따라옴
- EngiBench (Zhou et al. 2025)

### 6.4 사용된 모델 카드/리포트

- Claude Opus 4.6 system card (Anthropic 2026a)
- Claude Sonnet 4.6 system card (Anthropic 2026b)
- Claude Haiku 4.5 system card (Anthropic 2025)
- Qwen3 technical report (Yang et al. 2025)
- Qwen3.5 (Qwen 2026)
- GPT-OSS model card (Agarwal et al. 2025, arXiv 2508.10925)

## 7. 용어집 (Glossary)

- **Harness**: 모델 파라미터 밖에서 agent의 reasoning · tool use · memory access · skill invocation을 매개하는 외부 인프라(prompts, skills, memories, tools, code).
- **Harness self-evolution**: 모델 weight는 fixed로 두고, execution evidence(trajectories, outputs, feedback)에 따라 harness만 반복적으로 갱신하는 setting.
- **Evolver**: 이전 harness $H_{t-1}$과 evidence $D_t$로부터 update $\Delta H_t$를 만드는 procedure. 본 논문에서는 LLM agent로 instantiate.
- **Base capability** $M_{\text{base}}$: initial harness $H_0$ 아래에서의 task-solving 성능. 같은 모델이 self-evolution 없이 얻는 baseline pass rate.
- **Harness-updating capability** $\Delta_{\text{update}}(e)$: evolver $e$가 anchor agent set $F^\star$ 위에서 만들어내는 mean pairwise gain. "이 evolver가 얼마나 유용한 update를 만드는가."
- **Harness-benefit capability** $\Delta_{\text{benefit}}(f)$: agent $f$가 anchor evolver set $E^\star$ 위에서 얻는 max pairwise gain. "이 agent가 (최선의 evolver와 짝지을 때) harness로 얼마나 이득을 보는가."
- **Pairwise evolution gain** $\Delta(f, e)$: 특정 (agent $f$, evolver $e$) 페어의 evolution 결과 pass rate에서 agent의 base를 뺀 값.
- **Skill-Load Rate (SLR)**: agent의 trajectory 중 적어도 한 skill을 컨텍스트로 valid하게 로드한 비율. activation 측정 metric.
- **Harness-Following Rate (HFR)**: skill-loaded trajectory 중 LLM judge가 "loaded skill의 guidance를 따랐다"고 판정한 비율. adherence 측정 metric.
- **Loaded-Pass Rate (LPR)**: skill-loaded trajectory의 pass rate. activation 이후 outcome.
- **Harness activation failure**: agent가 관련 harness artifact(예: skill)를 working context로 가져오지 못하는 실패 모드. `threejs` 사례처럼 invalid format(multi-key)으로 load action을 emit → format gate refuse → skill body가 컨텍스트에 진입 못함.
- **Harness adherence failure**: harness가 로드되었음에도 그 guidance를 따르지 못하는 실패 모드. `pg-essay-to-audiobook` 사례처럼 procedural guide를 literal script로 오해 → 첫 시도 실패 후 fallback chain 무시 → silent give-up.
- **Procedurally isomorphic**: 두 skill이 표현(verbosity, 길이, 실행 디테일)은 달라도 step 순서·조건·의도가 동일한 상태. Qwen3.5-9B와 Opus 4.6 evolver가 만든 `flink-query` skill 사이 관계.
- **In-situ evaluation**: task $x \in X_t$가 evidence $D_t$에 들어가기 **전** harness $H_{t-1}$ 아래에서 채점되는 평가 setting. 자기 자신이 만든 harness update에 의해 점수가 오염되지 않음.
- **Anchor set**: capability metric을 계산할 때 다른 한쪽을 고정하는 reference 모델 집합. 본 논문에서는 $F^\star = E^\star = $ {Opus 4.6, Sonnet 4.6, Qwen3-235B}.
- **Tier**: weak-tier (Qwen3-32B, Qwen3.5-9B) · mid-tier (GPT-OSS-120B, Haiku 4.5, Qwen3-235B) · strong-tier (Sonnet 4.6, Opus 4.6). base capability 기준의 거친 분류.
- **Drift (load → final)**: phase-adherence judge가 측정한 "harness loaded" phase 점수 − "final validation" phase 점수. weak-tier에서 −0.39, strong-tier에서 −0.09.
