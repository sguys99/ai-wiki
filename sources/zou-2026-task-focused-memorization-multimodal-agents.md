---
title: "Task-Focused Memorization for Multimodal Agents"
type: paper
year: 2026
category: agents
raw_path: /Users/kmyu/Desktop/project/ai-wiki/raw/papers/zou-2026-task-focused-memorization-multimodal-agents.pdf
raw_filename: "zou-2026-task-focused-memorization-multimodal-agents.pdf"
source_collection: external
authors: "Tao Zou, Yichen He, Tian Qiu, Yuan Lin, Hang Li"
arxiv_id: "2605.31075"
url: "https://taskmem.github.io/"
tags: [taskmem, multimodal-agent, long-term-memory, episodic-memory, reinforcement-learning, gspo, dpo, adapter, online-learning, qwen3-vl, videomme, egolife, egotempo, mllm, bytedance, paper]
---

## 한 줄 요약 (One-line Summary)

**TaskMem**은 multimodal agent의 long-term memory 생성을 **"학습 가능한 memorization policy"**로 재정식화한 ByteDance Seed·Fudan의 프레임워크다. "어떤 정보를 기억할지(what to memorize)"라는 AI Frame Problem을 풀기 위해, (1) **Phase One — How to Memorize**: GSPO + 4중 reward(format / length / quality / **richness**)로 정확성·비중복·풍부함을 만족하는 episodic memory 생성 정책을 RL로 학습하고, (2) **Phase Two — What to Memorize**: 배포 후 최근 task ~10개의 sparse feedback을 reward model로 augment해 pairwise preference data를 만들고 단일 layer에 **2,048 파라미터 adapter**만 DPO로 fine-tune. Qwen3-VL-30B-A3B 위에서 streaming VQA로 재구성한 VideoMME / EgoLife / EgoTempo에서 base 대비 정확도 **+6.3 / +7.0 / +5.3%p** 향상, GPT-5.2·Gemini-2.5-Pro 등 closed-source 모델까지 일관 능가. 핵심 통찰: memory는 passive storage가 아니라 환경과 task에 적응하는 **active, goal-driven policy**이며, parametric adapter는 곧 *"per-task personalized memory"*.

## 1. 자료 정보 (Document Information)

- **제목**: Task-Focused Memorization for Multimodal Agents
- **저자**: Tao Zou¹*, Yichen He¹*, Tian Qiu¹·², Yuan Lin¹† (corresponding), Hang Li¹
  (*Equal contribution. ¹ByteDance Seed, ²Fudan University)
- **발표**: arXiv preprint (2605.31075v1, [cs.CV], 2026-05-29 / 2026-06-01)
- **PDF 경로**: `raw/papers/zou-2026-task-focused-memorization-multimodal-agents.pdf` (40 pages)
- **프로젝트 페이지**: https://taskmem.github.io/
- **기반 모델**: Qwen3-VL-30B-A3B
- **연락처**: linyuan.0@bytedance.com

## 2. 주요 기여 (Key Contributions)

1. **Memorization을 "policy"로 재정식화**: 기존 multimodal agent 메모리 연구가 prompt engineering이나 SFT로 고정 요약 단계를 두던 것을, **streaming multimodal input에서 어떤 정보를 저장할지를 자율적으로 결정하는 학습 가능한 policy** $\pi_\theta(m_t | q_t)$로 정의. *"memory is not passive storage but active, goal-driven process"*. 이는 AI Frame Problem(combinatorial explosion of relevance)에 대한 RL적 답.
2. **TaskMem two-phase 프레임워크**:
   - **Phase One (Pre-deployment, how to memorize)**: GSPO로 fundamental requirement(factual accuracy · non-redundancy · format · richness) 학습.
   - **Phase Two (Post-deployment, what to memorize)**: 환경 task feedback을 reward model로 augment하여 sparse한 task-level 신호를 dense pairwise preference로 변환, 2,048-dim adapter vector만 DPO로 업데이트.
3. **Phase One의 4-component reward + 안정화 기법**:
   - $r_{\text{mc}}(\tau) = r_{\text{fmt}} + r_{\text{len}} + r_{\text{qual}} + r_{\text{rich}}$.
   - 핵심 기여: **richness reward** — quality만 최적화하면 정책이 "짧고 정확하지만 빈약한" 출력으로 reward hack하므로, group 내 ranking 기반 richness 보상으로 풍부한 memory를 유도.
   - **NSR control**: 평균 reward 상승 후 음의 advantage 샘플(NSR)이 학습을 불안정하게 만드는 현상을 발견, $r_{\text{mc}}(\tau_i) < 0$일 때만 negative reinforce를 적용하는 단순한 기법으로 안정화 (식 6).
   - **Off-policy → On-policy 두 단계 history 학습**: Gemini-2.5-Pro로 history 합성 후 자기 자신의 history로 distribution gap 해소 (Algorithm 1, sliding-window K=5).
4. **Phase Two의 adapter 설계 통찰**:
   - 단일 transformer layer에 **additive vector** $h_o \leftarrow h_o + a$ 삽입 (2,048 파라미터, layer 22).
   - **adapter 방향은 10 step에서 거의 수렴**, 이후엔 norm만 증가 → "step-10 adapter를 norm 0.3으로 scaling"하는 **75% 학습 단축 acceleration**.
   - cross-task transfer 실험에서 **Object Recognition adapter만 Object Recognition task 성능을 향상** — Phase Two가 generic capability가 아닌 **task-specific focus**를 학습한다는 강한 증거 (Table 4).
   - adapter는 *"parametric personalized memory"*로 해석 가능, activation-space steering [2,9,40,53]과 동일한 직관(고차 행동이 활성화 공간의 linear direction).
5. **Streaming VQA benchmark 재구성**: VideoMME(short/medium 600 vid, 1,800 QA), EgoLife(500), EgoTempo(500)을 question type별로 group화하여 task stream으로 변환. 각 task의 첫 5개 질문은 Phase One memory로 답하고, 그 feedback으로 Phase Two 학습, 나머지 질문은 업데이트된 policy로 답하는 evaluation protocol 도입.
6. **SOTA 성능**:
   - Qwen3-VL-30B-A3B base 대비 정확도 **+6.3 (VideoMME), +7.0 (EgoLife), +5.3 (EgoTempo) %p**.
   - GPT-5.2 · Gemini-2.5-Pro · Gemini-1.5-Pro · M3-Agent · HippoMM · EgoGPT 모두 능가 (VideoMME · EgoLife). EgoTempo는 Acc.에서 GPT-5.2에 0.5p 차로 2위지만 **Precision은 능가**(63.2 vs 62.4) — 덜 환각하는 memory.
7. **Identity persistence를 입력에서 처리하는 단순화**: 기존 연구가 ASR/face tool 출력물을 별도 context로 prepend하는 것과 달리, **face bbox + global face ID + ASR subtitle 자체를 영상에 overlay**해 context를 짧게 유지.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 Problem Formulation

스트리밍 video segment $v_t$를 받아 episodic memory $m_t$를 생성. 정책은 sliding-window context $q_t = (v_{t-k+1:t}, m_{t-k+1:t-1})$에 조건화. 학습 목표:
$$\max_\theta \mathbb{E}_{\tau \sim \pi_\theta}[r(\tau)],\quad \tau = (v_{t-k+1:t}, m_{t-k+1:t})$$
이상적인 episodic memory: faithful(현재 클립에 충실) · coherent(이전 memory와 일관) · non-redundant · **useful for future tasks**.

### 3.2 Phase One: How to Memorize

**Algorithm**: GSPO (Group Sequence Policy Optimization).

각 입력 $q$에 대해 $G$개 trajectory $\tau_i = (q, m_{k,i})$를 rollout, group 내 reward normalization으로 advantage $\hat A_i$ 계산:
$$\hat A_i = \frac{r_{\text{mc}}(\tau_i) - \text{mean}(\{r_{\text{mc}}\})}{\text{std}(\{r_{\text{mc}}\})}$$

importance ratio $s_i(\theta) = (\pi_\theta(m_{k,i}|q) / \pi_{\theta_{\text{old}}}(m_{k,i}|q))^{1/|m_{k,i}|}$, GSPO 목적함수:
$$J_{\text{GSPO}}(\theta) = \mathbb{E}_q \frac{1}{G}\sum_i \min(s_i \hat A_i, \text{clip}(s_i, 1-\epsilon, 1+\epsilon) \hat A_i)$$

**4-component reward** $r_{\text{mc}}(\tau) = r_{\text{fmt}} + r_{\text{len}} + r_{\text{qual}} + r_{\text{rich}}$:

- $r_{\text{fmt}}$: 출력 포맷(ReAct 스타일 thinking → memory) 준수 여부. rule-based.
- $r_{\text{len}}$: 중간 reasoning이 지나치게 길면 페널티. rule-based.
- $r_{\text{qual}}$: accuracy · non-redundancy · style. Gemini-2.5-Flash + GPT-4o가 채점.
- $r_{\text{rich}}$: group 내 richness ranking 기반. GPT-4o로 ranking → scalar.

**NSR-controlled GSPO** (식 6): $r_{\text{mc}}(\tau_i) \ge 0$인 negative-advantage 샘플은 reinforce에서 제외하여 후반 학습 안정화.
$$J_{\text{GSPO}}(\theta) = \mathbb{E}_q \frac{1}{G}\left[\underbrace{\sum_{\hat A_i > 0} \min(\cdot)}_{\text{PSR}} + \underbrace{\sum_{\hat A_i < 0} \mathbb{I}(r_{\text{mc}} < 0) \min(\cdot)}_{\text{NSR (gated)}}\right]$$

**Two-stage history training**:

- *Off-policy history*: Gemini-2.5-Pro로 $m_{1:k-1}$ 합성 후 $m_k$만 GSPO 최적화.
- *On-policy history* (Algorithm 1): 현재 정책으로 history 생성, sliding window K=5. 각 인스턴스에 clip counter $c_j$를 두고 lower threshold($n_{\min}$) 미만이면 Extend, upper threshold($n_{\max}$) 초과면 Resample, 사이면 확률 $p$로 Extend/Resample. 326개 long video · 평균 25.15 clip/video로 학습.

### 3.3 Phase Two: What to Memorize

배포 환경에서 최근 $n$개 task로 정책을 주기적으로 갱신. 3가지 도전:

1. **Sparse feedback** (e.g., 5–10 questions)
2. **Catastrophic forgetting** (Phase One 능력 손상)
3. **Computational efficiency** (서빙 비용 영향 금지)

**Feedback Augmentation (reward model)**:

- 입력: example tasks + 두 candidate memory.
- 출력: 두 memory 중 더 task-relevant한 쪽 (또는 tie).
- 사전에 Phase One 정책으로 후보 memory rollout 데이터셋을 구축, 배포 시 reward model로 pairwise preference $(q, m_k^w, m_k^l)$ 생성.

**Adapter 구조** (식 4):
$$h_o \leftarrow h_o + a,\quad a \in \mathbb{R}^d,\quad d = 2{,}048$$

단일 layer에만 삽입(layer 22). backbone freeze.

**DPO 학습** (식 5):
$$\mathcal{L}_{\text{DPO}} = -\mathbb{E}\left[\log\sigma\left(\beta \log \frac{\pi_\theta(m^w)}{\pi_{\text{ref}}(m^w)} - \beta \log \frac{\pi_\theta(m^l)}{\pi_{\text{ref}}(m^l)}\right)\right]$$

$\pi_{\text{ref}}$ = Phase One 정책.

### 3.4 Identity Persistence (Multimodal-specific)

video segment 간 동일 인물 추적이 필요 — face bbox + global face ID + speaker-tagged ASR subtitle을 영상에 **overlay**하여 context로 짧게 처리. 기존 연구는 face/ASR 도구의 출력 텍스트를 별도 context로 prepend해 길어짐.

### 3.5 Adapter Acceleration

Phase Two training dynamics (Figure 4):

- accuracy, non-redundancy 안정.
- adapter norm은 학습 step에 따라 단조 증가.
- step-10과 step-40 adapter의 cosine similarity ≈ 0.8 → **방향은 일찍 수렴, 이후엔 norm 증가**.
- → step-10 adapter를 norm 0.3으로 scaling하면 step-40과 거의 동일 성능. **데이터·시간 ~75% 절감**.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 Main Results (Table 2)

| Method | VideoMME Acc / Cov / Prec | EgoLife Acc / Cov / Prec | EgoTempo Acc / Cov / Prec |
|---|---|---|---|
| EgoGPT | 44.3 / 58.7 / 75.5 | 19.2 / 28.2 / 68.1 | 15.0 / 33.5 / 44.9 |
| HippoMM | 48.9 / 66.6 / 73.5 | 30.4 / 43.4 / 70.0 | 15.8 / 30.8 / 51.1 |
| M3-Agent | 62.5 / 77.7 / 80.4 | 21.8 / 30.8 / 70.8 | 16.0 / 36.3 / 44.2 |
| Gemini-1.5-Pro | 55.3 / 65.9 / 83.9 | 39.4 / 51.6 / 76.4 | 19.7 / 34.3 / 57.4 |
| Gemini-2.5-Pro | 63.2 / 74.8 / 84.4 | 43.8 / 56.6 / 77.4 | 25.8 / 42.3 / 61.0 |
| GPT-5.2 | 67.3 / 80.8 / 83.3 | 34.8 / 48.2 / 72.2 | **32.1** / 51.4 / 62.4 |
| Qwen3-VL-30B-A3B (base) | 61.6 / 74.7 / 82.5 | 38.4 / 52.4 / 73.3 | 22.3 / 38.9 / 57.2 |
| **TaskMem** | **67.9** / 79.3 / **85.6** | **45.4** / 56.4 / **80.5** | 27.6 / 43.7 / **63.2** |

- base 대비 정확도 +6.3 / +7.0 / +5.3%p.
- VideoMME · EgoLife에서 모든 baseline 능가.
- EgoTempo는 GPT-5.2에 Acc. 0.5p 차로 2위지만 Precision은 능가 → **memory의 신뢰도가 더 높음**.

### 4.2 Phase Ablation (Table 3)

| Method | VideoMME Acc / Cov / Prec | EgoLife Acc / Cov / Prec | EgoTempo Acc / Cov / Prec |
|---|---|---|---|
| Qwen3-VL-30B-A3B | 61.6 / 74.7 / 82.5 | 38.4 / 52.4 / 73.3 | 22.3 / 38.9 / 57.2 |
| + Task Prompt | 64.2 / 77.3 / 83.0 | 40.0 / 51.0 / 78.4 | 24.5 / 42.9 / 57.1 |
| TaskMem Phase One | 64.4 / 75.4 / 85.3 | 39.6 / 51.0 / 77.6 | 23.7 / 37.5 / **63.3** |
| TaskMem (P1 + P2) | **67.9** / 79.3 / 85.6 | **45.4** / 56.4 / 80.5 | **27.6** / 43.7 / 63.2 |

- **Phase One만 해도 Precision 향상** (faithfulness 학습 효과).
- **Phase Two가 Accuracy의 주된 leverage** — task-relevant content 정렬.
- Task Prompt(프롬프트만으로 task 정보 주입) < Phase One < Phase Two → **parameter update가 prompting을 능가**.

### 4.3 Adapter Cross-task Transfer (Table 4) — task-specific focus 증거

Object Recognition VQA에 다른 task로 학습한 adapter 적용:

| Method | Acc | Cov | Prec |
|---|---|---|---|
| TaskMem Phase One | 65.7 | 74.7 | 87.9 |
| + Counting adapter | 65.0 | 74.0 | 87.8 |
| + OCR adapter | 65.0 | 75.7 | 85.9 |
| + Attribute adapter | 65.0 | 74.3 | 87.4 |
| **+ Object adapter** | **69.7** | **78.7** | **88.6** |

→ 자신의 task adapter만 성능 향상. **generic capability가 아닌 task-specific focus**.

### 4.4 Adapter Layer Ablation (Figure 5)

- shallow~middle layer (≤22)가 deep layer보다 효과적.
- 본 논문은 layer 22 사용.

### 4.5 Adapter vs Full-parameter (Table 1)

| Method | Acc | Non-redundancy | Loss / Tie / Win |
|---|---|---|---|
| TaskMem Phase One | 92.39 | 83.59 | 13.82 / 72.80 / 13.38 |
| + full-parameter | 91.29 | 78.21 | 2.00 / 58.00 / **40.00** |
| + 40-step adapter | 92.93 | 81.74 | 3.06 / 61.72 / 35.22 |
| + scaled adapter (10-step × 1.5) | 91.54 | 80.96 | 3.17 / 58.52 / 38.31 |

- full-parameter도 win ratio는 높지만 **Acc · non-redundancy 모두 하락** (catastrophic forgetting).
- adapter는 quality 보존하면서 win ratio 35.22% 달성.
- scaled 10-step adapter는 40-step과 거의 같음 → **데이터·시간 ~75% 절감**.

### 4.6 Phase One Reward Ablation (Figure 3)

- richness reward 없이 학습하면 reward 곡선은 더 안정/높지만 **memory length가 급격히 감소** → 정확하지만 빈약한 출력으로 reward hack (Table 15).
- richness reward는 풍부함을 보장하기 위한 필수 component.
- NSR control 없으면 후반 학습 불안정.

### 4.7 Qualitative Cases (Table 5)

Phase Two가 task에 맞춰 detail이 풍부해지는 패턴을 4가지 task에서 검증:

- *Object Recognition* (Case 1): bedding 색, 가구 종류, 액세서리 등 fine-grained object 추가.
- *Object Reasoning* (Case 2): 인물 외형(머리 길이/색, 시계, 셔츠 디테일) 추가.
- *Attribute Perception* (Case 3): 인물 의상·표정·정황 디테일 추가.
- *Counting* (Case 4): 동물 종류·색·수량 정보가 풍부해져 global count 정답 가능.

→ 동일 video도 task에 따라 **다르게 압축**됨. *"memory style shifts toward the question type"*.

## 5. 한계와 향후 과제 (Limitations and Future Work)

본문에 명시된 직접적 한계는 적지만 분석 시 다음이 보임:

- **EgoTempo Accuracy에서 GPT-5.2에 패배**: 저자는 GPT-5.2의 fine-grained activity 이해력이 우월하기 때문이라고 설명. 즉 base MLLM의 **video understanding 능력** 자체가 memory 품질의 천장.
- **Phase Two가 task당 adapter 학습 필요**: cross-task adapter가 도움되지 않는다는 점(Table 4)은 **장점이자 비용** — 새 task마다 ~10개 질문 + 학습이 요구되며, multi-task generalization은 미해결.
- **Reward model 의존**: $r_{\text{qual}}$ / $r_{\text{rich}}$ / Phase Two reward model이 GPT-4o · Gemini-Flash에 의존 → API 비용·재현성 이슈.
- **Streaming protocol의 평가 적합성**: VideoMME · EgoLife · EgoTempo의 question-type grouping이 실제 agent task의 stream 분포를 반영하는지 미검증.
- **K=5 sliding window 한계**: 더 긴 horizon에서 episodic memory를 어떻게 압축·소실시킬지는 본 논문 범위 밖.
- **Identity overlay의 한계**: face overlay가 ASR/face 도구의 한계(미검출·오라벨링)를 그대로 흡수.
- **Phase Two adapter direction 수렴이 빠른 이유 미분석**: cosine 0.8@step10은 흥미롭지만 왜 그런지(low-rank task structure?)는 후속 연구.

저자가 향후 방향으로 시사하는 것: semantic / visual memory로의 확장 (현재는 episodic 중심), agent-environment closed loop에서의 더 풍부한 reward.

## 6. 관련 연구 (Related Work)

### Long-term memory for multimodal agents

- **M3-Agent** [37]: prompt-template 기반 multimodal memory 프레임워크.
- **EgoLife / EgoGPT** [60]: egocentric video benchmark + 메모리 모델.
- **HippoMM** [35]: hippocampus 영감 multimodal memory.
- **Hierarchical/consolidated memory** [7, 36]: 메모리 통합·계층화.
- 공통 한계: memory generation을 **고정 단계**(prompt eng / SFT)로 다룸 → TaskMem이 학습 가능한 policy로 재정식화.

### Streaming MLLM / Embodied agents

- Qwen3-VL [3], GPT-5.2 [39], Gemini 1.5/2.5 Pro [12, 51]: base MLLM.
- Embodied agents [17, 52, 55, 61]: 환경 perception + 행동 결정.

### RL for generation

- **GSPO** [65, 66]: sequence-level reward의 group-normalized PO.
- **DPO** [44]: pairwise preference로 LLM 정렬.
- **PSR/NSR decomposition** [67]: positive/negative advantage 별 안정성 분석. 본 논문이 다중 reward 설정으로 확장 + NSR gating 도입.

### Activation steering / Adapter

- **Activation steering** [2, 9, 40, 53]: 단일 vector 추가로 LLM 행동 조향.
- **Linear representation hypothesis** [15, 42]: 고차 행동이 활성화 공간의 선형 방향.
- **Parameter-efficient tuning** [13, 28]: LoRA류 효율적 fine-tuning.
- TaskMem은 steering vector를 *학습*해서 **task-specific memory direction**으로 사용.

### Memory consolidation / error correction

- [10] memory error correction.
- [16, 23, 50] 메모리 저장 시스템.

## 7. 용어집 (Glossary)

- **Memorization policy $\pi_\theta(m_t|q_t)$**: streaming multimodal input에 대해 episodic memory를 생성하는 학습 가능한 정책. TaskMem의 핵심 추상화.
- **Episodic memory**: temporally ordered, event-centric memory. agent가 무엇이/어디서/언제 일어났는지 기록.
- **Phase One / Phase Two**: TaskMem의 두 학습 단계 — 각각 "how to memorize" (fundamental quality, pre-deploy) / "what to memorize" (task-relevant focus, post-deploy).
- **GSPO (Group Sequence Policy Optimization)**: group 내 정규화 advantage + sequence-level importance ratio로 안정적인 RL을 수행하는 알고리즘 ([65, 66]).
- **Richness reward $r_{\text{rich}}$**: group 내 ranking 기반 보상. quality만으로 reward hack(짧고 빈약한 출력)을 방지하기 위해 도입한 핵심 component.
- **NSR (Negative Sample Reinforce) gating**: $r_{\text{mc}}(\tau_i) < 0$일 때만 negative advantage 샘플을 학습에 사용 — 후반 학습 안정성을 위한 단순한 기법.
- **PSR (Positive Sample Reinforce)**: 양의 advantage 샘플의 reinforce 항.
- **Off-policy / On-policy history training**: Phase One의 두 sub-stage. 전자는 Gemini-2.5-Pro로 history 합성, 후자는 정책 자신으로 history 생성 → train/test distribution gap 해소.
- **Sliding window $K=5$**: 정책이 동시에 참조하는 최근 video clip 수 (10-second 단위).
- **Adapter vector $a \in \mathbb{R}^d, d=2{,}048$**: 단일 layer 출력에 더해지는 학습 가능한 vector. layer 22. TaskMem의 "parametric personalized memory".
- **DPO (Direct Preference Optimization)** [44]: pairwise preference로 정책을 직접 최적화하는 RL-free 알고리즘.
- **Feedback augmentation**: sparse한 task feedback(5~10 questions)을 reward model로 pairwise data로 변환해 학습 신호를 증폭.
- **Identity overlay**: face bbox/ID + speaker-tagged ASR subtitle을 영상 위에 그려 넣어 identity persistence 문제를 입력 단계에서 해소.
- **Streaming task / Streaming VQA**: VideoMME · EgoLife · EgoTempo의 QA를 question type별로 group화하여 task stream으로 재구성한 평가 프로토콜. agent는 영상을 순차 관찰, 영상 처리 후에만 질문 공개.
- **VideoMME / EgoLife / EgoTempo**: TaskMem이 사용한 세 가지 VQA benchmark. 각각 YouTube 다양체 / egocentric daily / egocentric temporal.
- **Coverage / Precision / Accuracy**: memory 평가 지표 — 각각 (질문에 답할 정보 포함 비율) / (그 중 정답 비율) / (전체 정답 비율).
- **Qwen3-VL-30B-A3B**: 본 논문이 사용한 base MLLM (Qwen3-VL의 30B mixture-of-experts variant).
- **Activation Steering**: 단일 vector를 layer activation에 더해 LLM 행동을 inference time에 조향하는 기법. TaskMem adapter의 이론적 정당화 ([2, 9, 40, 53, 15, 42]).
- **AI Frame Problem** [48]: combinatorial explosion 속에서 contextually relevant한 정보를 식별하는 문제. 본 논문은 "미래에 유용할 정보까지 식별"하는 *temporal* 확장으로 framing.
