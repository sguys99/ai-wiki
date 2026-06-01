---
title: "TaskMem: Task-Focused Memorization for Multimodal Agents"
type: paper
year: 2026
category: agents
raw_path: /Users/kmyu/Desktop/project/ai-wiki/raw/papers/zou-2026-task-focused-memorization-multimodal-agents.pdf
raw_filename: "zou-2026-task-focused-memorization-multimodal-agents.pdf"
source: zou-2026-task-focused-memorization-multimodal-agents.md
source_collection: external
authors: "Tao Zou, Yichen He, Tian Qiu, Yuan Lin, Hang Li"
arxiv_id: "2605.31075"
url: "https://taskmem.github.io/"
tags: [taskmem, multimodal-agent, long-term-memory, episodic-memory, reinforcement-learning, gspo, dpo, adapter, online-learning, qwen3-vl, videomme, egolife, egotempo, mllm, bytedance, paper]
---

## 요약 (Summary)

ByteDance Seed·Fudan University가 2026-05-29 arXiv에 공개한, multimodal agent의 long-term memory 생성을 **"학습 가능한 memorization policy"**로 재정식화한 프레임워크. 기존 multimodal memory 연구(M3-Agent · HippoMM · EgoGPT 등)가 memory 생성을 prompt 또는 SFT의 **고정 단계**로 다룬 것에 반해, TaskMem은 streaming multimodal input에서 "**무엇을 기억할지(what to memorize)**"를 자율적으로 결정하는 policy $\pi_\theta(m_t|q_t)$를 RL로 학습한다. 이는 AI Frame Problem(combinatorial explosion of relevance)을 *temporal*로 확장한 framing — "현재 무엇이 관련 있는가"뿐 아니라 "**미래에 무엇이 유용할까**"까지 결정.

**Two-phase 구조**:

- **Phase One — How to Memorize (pre-deploy)**: GSPO + 4중 reward(format / length / quality / **richness**)로 정확성·비중복·풍부함을 만족하는 episodic memory 정책을 raw video만으로 학습. richness reward 없이 quality만 보면 정책이 "짧고 정확하지만 빈약한" 출력으로 **reward hack** → group-ranking 기반 richness reward로 풍부함을 강제. 추가로 후반 학습 불안정성 해결을 위해 **NSR gating** 기법 ($r_{\text{mc}}<0$인 negative advantage만 reinforce)을 도입.
- **Phase Two — What to Memorize (post-deploy)**: 환경에서 받은 ~10개 task의 **sparse feedback**을 reward model로 augment해 pairwise preference $(q, m^w, m^l)$ 생성 → 단일 layer(layer 22)에 **2,048-dim adapter vector** $h_o \leftarrow h_o + a$만 DPO로 fine-tune. **adapter 방향은 step-10에서 cosine 0.8까지 수렴**, 이후엔 norm만 증가 → step-10 adapter를 norm 0.3으로 scaling하면 step-40과 동등 → **데이터·시간 ~75% 절감**.

Qwen3-VL-30B-A3B 위에서 VideoMME · EgoLife · EgoTempo를 question-type별 task stream으로 재구성해 평가. **base 대비 정확도 +6.3 / +7.0 / +5.3%p, GPT-5.2 · Gemini-2.5-Pro 등 closed-source 모델도 일관 능가**(EgoTempo Acc만 GPT-5.2에 0.5p 차로 2위지만 Precision은 능가). 결정적 ablation: Object Recognition task에 Counting/OCR/Attribute adapter를 끼우면 **모두 성능 하락하고 Object adapter만 향상** → Phase Two가 generic capability가 아닌 **task-specific focus**를 학습한다는 강한 증거.

핵심 철학: *memory is not passive storage but active, goal-driven process*. adapter는 곧 *"parametric personalized memory"*이며 activation-space steering([2,9,40,53])과 동일한 직관(고차 행동 = 활성화 공간의 선형 방향)을 *학습된 방향*으로 구현.

## 주요 기여 (Key Contributions)

1. **Memorization을 policy로 재정식화**: prompt eng / SFT의 고정 요약 단계 → **streaming 입력에서 자율적으로 무엇을 저장할지 결정하는 학습 가능한 정책**. AI Frame Problem의 temporal 확장.
2. **TaskMem two-phase 프레임워크**: pre-deploy *how* + post-deploy *what*. 전자는 fundamental quality, 후자는 environment-adaptive focus.
3. **Phase One의 richness reward + NSR gating**:
   - 4중 reward $r_{\text{mc}} = r_{\text{fmt}} + r_{\text{len}} + r_{\text{qual}} + r_{\text{rich}}$.
   - group-내 ranking 기반 richness가 *"accurate but vacuous"* hack 방지.
   - $r_{\text{mc}}<0$일 때만 NSR을 적용해 후반 학습 안정화 (식 6, [67] 확장).
4. **Off-policy → On-policy two-stage history training**: Gemini-2.5-Pro로 history 합성 후 정책 자신의 history로 distribution gap 해소 (Algorithm 1, sliding window K=5, clip counter Extend/Resample).
5. **Phase Two adapter 통찰**:
   - 단일 layer · 2,048 파라미터 · backbone freeze로 catastrophic forgetting 차단.
   - **adapter 방향 조기 수렴** → 75% 학습 단축 acceleration.
   - **cross-task transfer 실패** = task-specific focus 학습의 증거 (Table 4).
   - adapter = "parametric personalized memory" 해석, activation steering ([2,9,40,53])의 학습 버전.
6. **Streaming VQA benchmark 재구성**: VideoMME(600 vid·1,800 QA) · EgoLife(500) · EgoTempo(500)을 question-type별 task stream으로 변환, 첫 5개 질문으로 Phase Two 학습 → 나머지 평가하는 **online evaluation protocol** 도입.
7. **SOTA**: base +6.3/+7.0/+5.3%p. closed-source frontier 모델(GPT-5.2 · Gemini-2.5-Pro)도 일관 능가.
8. **Identity overlay**: face bbox + global face ID + speaker-tagged ASR subtitle을 영상 자체에 overlay → 기존 방식(텍스트 prepend)보다 context 짧게 유지하면서 identity persistence 해결.

## 방법론 및 아키텍처 (Methodology and Architecture)

### Problem Formulation

스트리밍 video segment $v_t$를 받아 episodic memory $m_t$를 생성. 정책은 sliding-window context $q_t = (v_{t-k+1:t}, m_{t-k+1:t-1})$에 조건화. 목표:
$$\max_\theta \mathbb{E}_{\tau \sim \pi_\theta}[r(\tau)],\quad \tau = (v_{t-k+1:t}, m_{t-k+1:t}),\quad K=5$$

이상적 episodic memory: **faithful · coherent · non-redundant · useful for future tasks**.

### Phase One: How to Memorize (GSPO)

각 입력 $q$에 대해 $G$개 trajectory rollout → group 내 reward normalization으로 advantage:
$$\hat A_i = \frac{r_{\text{mc}}(\tau_i) - \text{mean}}{\text{std}}$$

importance ratio $s_i(\theta) = (\pi_\theta / \pi_{\theta_{\text{old}}})^{1/|m_{k,i}|}$, GSPO 목적:
$$J = \mathbb{E}_q \frac{1}{G}\sum_i \min(s_i \hat A_i, \text{clip}(s_i, 1\pm\epsilon) \hat A_i)$$

**4-component reward**:

| Reward | 정의 | 측정 |
|---|---|---|
| $r_{\text{fmt}}$ | ReAct 형식(thinking → memory) 준수 | rule-based |
| $r_{\text{len}}$ | 과도하게 긴 reasoning에 페널티 | rule-based |
| $r_{\text{qual}}$ | accuracy · non-redundancy · style | Gemini-2.5-Flash + GPT-4o |
| $r_{\text{rich}}$ | group-내 richness ranking → scalar | GPT-4o |

**NSR-controlled GSPO** (식 6, 후반 학습 안정화):
$$J = \mathbb{E}_q \frac{1}{G}\left[\sum_{\hat A_i>0}\min(\cdot) + \sum_{\hat A_i<0}\mathbb{I}(r_{\text{mc}}<0)\min(\cdot)\right]$$

→ 평균 reward가 충분히 높아진 후의 음의 advantage는 노이즈가 되므로 reward 자체가 음일 때만 적용.

**Two-stage history training** (Algorithm 1):

- *Off-policy*: Gemini-2.5-Pro가 $m_{1:k-1}$ 합성, 정책이 $m_k$만 학습.
- *On-policy*: 현재 정책이 history 생성 → train/test distribution gap 해소. clip counter $c_j$로 lower/upper threshold 기반 Extend/Resample 균형 유지, sliding window K=5. 326 long video × 평균 25.15 clip.

### Phase Two: What to Memorize (DPO on adapter)

**3가지 도전**: (1) sparse feedback(~10 questions), (2) catastrophic forgetting, (3) computational efficiency.

**Feedback augmentation**: example tasks + 두 candidate memory를 입력받는 reward model이 task-relevance를 판정 → pairwise preference data $(q, m^w, m^l)$ 생성. Phase One 정책으로 사전에 rollout 캐시 구축.

**Adapter** (식 4):
$$h_o \leftarrow h_o + a,\quad a \in \mathbb{R}^{2{,}048},\quad \text{layer 22}$$

backbone freeze.

**DPO 학습** (식 5):
$$\mathcal{L} = -\mathbb{E}\left[\log\sigma\left(\beta\log\frac{\pi_\theta(m^w)}{\pi_{\text{ref}}(m^w)} - \beta\log\frac{\pi_\theta(m^l)}{\pi_{\text{ref}}(m^l)}\right)\right]$$

$\pi_{\text{ref}}$ = Phase One 정책.

### Adapter Acceleration

- step-10 adapter direction과 step-40 adapter direction의 cosine similarity ≈ **0.8**.
- 이후엔 norm만 증가 → **step-10 adapter × scaling(norm 0.3)** = step-40과 동등.
- **데이터·시간 ~75% 절감**.

### Identity Overlay

face bbox + global face ID + speaker-tagged ASR subtitle을 video frame에 그려넣어 입력 단계에서 identity 일관성 확보. 기존 방식(face/ASR 도구 출력을 text context로 prepend)보다 context 길이 감소.

## 결과 (Results)

### Main Results (Table 2 발췌, Acc / Prec)

| Method | VideoMME Acc / Prec | EgoLife Acc / Prec | EgoTempo Acc / Prec |
|---|---|---|---|
| Qwen3-VL-30B-A3B (base) | 61.6 / 82.5 | 38.4 / 73.3 | 22.3 / 57.2 |
| Gemini-2.5-Pro | 63.2 / 84.4 | 43.8 / 77.4 | 25.8 / 61.0 |
| GPT-5.2 | 67.3 / 83.3 | 34.8 / 72.2 | **32.1** / 62.4 |
| M3-Agent | 62.5 / 80.4 | 21.8 / 70.8 | 16.0 / 44.2 |
| **TaskMem** | **67.9 / 85.6** | **45.4 / 80.5** | 27.6 / **63.2** |

- base 대비 **+6.3 / +7.0 / +5.3%p**.
- VideoMME · EgoLife에서 모든 baseline 능가.
- EgoTempo Acc는 GPT-5.2에 0.5p 패배지만 Precision은 능가 — **덜 환각하는 memory**.

### Phase Ablation (Table 3)

| Method | VideoMME Acc | EgoLife Acc | EgoTempo Acc |
|---|---|---|---|
| Qwen3-VL-30B-A3B | 61.6 | 38.4 | 22.3 |
| + Task Prompt (프롬프트만) | 64.2 | 40.0 | 24.5 |
| Phase One only | 64.4 | 39.6 | 23.7 |
| Phase One + Phase Two | **67.9** | **45.4** | **27.6** |

- **Phase One만 해도 Precision 향상** (faithfulness 학습).
- **Phase Two가 Accuracy의 주된 leverage** (task-relevant content 정렬).
- Task Prompt < Phase One < Phase Two → **parameter update가 prompting을 능가**.

### Cross-task Adapter Transfer (Table 4) — task-specific focus 증거

Object Recognition task에 다른 adapter 적용:

| Adapter | Acc |
|---|---|
| Phase One (no adapter) | 65.7 |
| Counting | 65.0 ↓ |
| OCR | 65.0 ↓ |
| Attribute | 65.0 ↓ |
| **Object** | **69.7** ↑ |

→ 자기 task adapter만 향상. **generic capability ≠ task-specific focus**.

### Adapter vs Full-parameter (Table 1)

| Method | Acc | Non-redund. | Win |
|---|---|---|---|
| Phase One | 92.39 | 83.59 | 13.38 |
| + full-parameter | 91.29 ↓ | 78.21 ↓ | 40.00 |
| + 40-step adapter | 92.93 | 81.74 | 35.22 |
| + scaled 10-step adapter | 91.54 | 80.96 | 38.31 |

- full-parameter는 win은 높지만 Acc·non-redundancy 하락 = **catastrophic forgetting**.
- adapter는 quality 보존 + win 35–38% — 안전한 trade-off.
- scaled 10-step ≈ 40-step → **~75% 학습 절감 가능**.

### Phase One Reward Ablation (Figure 3, Table 15)

- richness reward 제거 → reward 곡선은 더 안정·높지만 **memory length 급감 + 빈약한 출력** = reward hack.
- NSR control 제거 → 후반 학습 불안정.

### Qualitative Cases (Table 5)

Phase Two가 task에 따라 다르게 압축:

- *Object Recognition*: 침대 색·가구·디테일 추가.
- *Object Reasoning*: 인물 외형(머리·시계·셔츠) 추가.
- *Attribute Perception*: 의상·표정 디테일.
- *Counting*: 동물 종류·색·수량.

같은 5분 video도 task별로 4,620 token 짜리 detailed 메모리로 다르게 만들어짐.

## 관련 페이지 (Related Pages)

- [[agents/qiao-2026-memory-intelligence-agent|Memory Intelligence Agent (MIA)]] — 가장 직접적 비교. MIA는 **3-agent decoupling + workflow memory(non-parametric) ↔ Planner weight(parametric) bidirectional loop + GRPO two-stage**로, TaskMem은 **단일 MLLM에 memorization policy**로 단순화. 두 논문 모두 (a) memory를 *active goal-driven process*로 보고 (b) parametric memory(MIA의 Planner weight ≈ TaskMem의 adapter) 개념을 공유하지만, MIA는 trajectory-level workflow 압축에 초점, TaskMem은 streaming perception의 episodic memory 자체에 초점. *"메모리는 어디에 집어넣어야 하는가"* 질문에 대한 두 방향 — MIA는 Planner, TaskMem은 perception-level. 두 접근 모두 prompt-only baseline 대비 우위라는 결과를 공유.
- [[agents/dennis-2026-compiling-agentic-workflows-into-llm|Compiling Agentic Workflows into LLM Weights (Subterranean Agent)]] — TaskMem과 가장 깊은 철학적 공명. Subterranean Agent의 *"persistent structure belongs in weights, transient state belongs in prompt"*가 TaskMem에서는 *"task-relevant focus belongs in adapter weights, current observation belongs in context"*로 재현. 둘 다 framework/prompt 수준에서 해결 안 되는 문제(orchestration → fine-tuning, memory selection → policy RL)를 모델 파라미터로 **컴파일**.
- [[agents/lee-hoyeon-2026-harness-engineering|Harness Engineering]] — 에이전트 성능이 모델보다 하네스에 좌우된다는 관점에서, TaskMem은 *"메모리 생성 단계 자체를 학습 가능한 하네스 component로 만든 사례"*. Generator/Evaluator 분리(richness reward의 group ranking) · TTL(test-time learning, Phase Two의 환경 feedback)이 매핑됨.

## 비판적 코멘트 (Critical Notes)

- **EgoTempo Accuracy 패배의 의미**: TaskMem이 GPT-5.2에 0.5p 차로 진 이유를 저자가 *base MLLM(Qwen3-VL-30B)의 fine-grained activity 이해 한계*로 설명. memory policy는 perception ceiling 너머로 올라갈 수 없음 — base model 교체로 추가 향상 여지.
- **Adapter cost ↔ generalization trade-off**: cross-task transfer 실패는 *task-specific focus*의 증거이자, **새 task마다 ~10 question + 학습이 필요**하다는 비용. multi-task adapter나 task router는 후속 연구.
- **Reward model 의존**: $r_{\text{qual}}/r_{\text{rich}}$, Phase Two pairwise judge가 GPT-4o · Gemini-Flash. **API 비용 + 재현성 + judge bias**가 모두 문제.
- **Adapter direction 조기 수렴의 이유 미설명**: cosine 0.8@step10은 흥미롭지만 *왜* 그런지(task가 low-rank로 표현되는가? activation manifold의 구조 때문인가?)는 분석 부재. 후속 연구의 흥미로운 단서.
- **Streaming 평가 프로토콜의 사실성**: 같은 question-type을 묶어 task stream을 만드는 가정이 실제 deployment에서의 task 분포와 얼마나 일치할지는 미검증. 실세계 robot/agent log를 사용한 추가 평가가 필요.
- **K=5 sliding window**: 더 긴 horizon(시간/일 단위)에서 memory를 어떻게 압축·소실시킬지는 본 논문 범위 밖. MIA의 workflow 압축 메커니즘과 결합 여지.
- **Identity overlay의 한계**: face overlay는 face/ASR detector의 한계를 그대로 상속(occlusion, misalignment, speaker confusion).
