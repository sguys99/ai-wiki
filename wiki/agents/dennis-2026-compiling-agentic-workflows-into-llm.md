---
title: "Compiling Agentic Workflows into LLM Weights"
type: paper
year: 2026
category: agents
raw_path: /Users/kmyu/Desktop/project/ai-wiki/raw/papers/dennis-2026-compiling-agentic-workflows-into-llm.pdf
raw_filename: "dennis-2026-compiling-agentic-workflows-into-llm.pdf"
source: dennis-2026-compiling-agentic-workflows-into-llm.md
source_collection: external
tags: [agent-compilation, subterranean-agent, fine-tuning, langgraph, in-context-prompting, qwen, procedural-knowledge, task-oriented-dialogue, full-fine-tuning, agents]
authors: "Simon Dennis, Rivaan Patil, Kevin Shabahang, Hao Guo"
arxiv_id: "2605.22502"
---

## 요약 (Summary)

i14·University of Melbourne 팀이 LangGraph·CrewAI·Google ADK·OpenAI Agents SDK·Semantic Kernel·Strands·LlamaIndex 등 **290K+ stars의 agent orchestration framework**를 단일 fine-tuned 모델로 컴파일하는 *subterranean agent* 패러다임을 3개 도메인 — Travel booking(14 nodes·3B Qwen 2.5)·Zoom support(14 nodes·8B Qwen3)·**Insurance claims(55 nodes·6 decision hubs·2,381 paths·8B Qwen3)** — 에서 정량 검증.

핵심 결과는 세 가지 채택 장벽이 통념보다 훨씬 작다는 것:

- **Quality**: 8B 컴파일 모델이 in-context frontier(Claude Sonnet 4.5) 대비 **87–98%**, LangGraph orchestrator(~70× 큰 frontier) 대비 동등 또는 우위. Travel 도메인 **same-model controlled comparison**에서 Qwen 2.5 3B base를 두 architecture로 동시 운용한 결과, 컴파일이 5개 metric 중 4개에서 같은 base의 surface orchestration을 **p<0.001**로 이김. Travel(5.5% vs 24.0%)·Insurance(9.0% vs 17.0%) failure rate는 LangGraph 대비 절반 이하.
- **Cost**: per-conversation **128–462× 저렴**. 2축 곱: (a) vLLM A100 80GB self-hosted ~65×/token cheaper, (b) constant-size prompt로 token volume 2–7× 절감. **절차가 복잡해질수록 우위가 커진다** (Travel 128× → Insurance 462×).
- **Flexibility**: recompile = **30–50분 CI/CD cycle** (8×H200), 단일 A100에서도 3–4시간. "deployment cycle, not paradigm shift".

저자의 결론: *"persistent structure belongs in the weights, transient state belongs in the prompt."* 지속적인 절차 지식은 weight에, 일시적 state는 prompt에 둔다는 분업.

> **선행/자매 논문**: 본 논문은 Dennis et al. [2026a] "in-context prompting > orchestration"의 후속이고, LoRA(rank 16–128)가 절차 학습에 실패함을 보인 Dennis et al. [2026b]가 *full fine-tuning만 사용*하는 결정의 근거.

## 주요 기여 (Key Contributions)

1. **3가지 장벽의 정량 해체** — Quality·Cost·Flexibility 통념을 실험으로 반박. 각 장벽이 작다는 결론.
2. **Same-model controlled comparison** — Qwen 2.5 3B를 컴파일 vs surface orchestration으로 동시 운용 → architecture 단독 효과 분리. Task·Consistency·Graceful·Naturalness 모두 p<0.001로 컴파일 우위.
3. **3개 도메인 실증** — 14 nodes(Travel·Zoom) → **55 nodes·6 hubs·2,381 paths(Insurance)** 확장. 절차 복잡도와 함께 비용 우위 증가.
4. **2축 비용 분해** — per-token(self-hosted vLLM) 65× + token volume(constant prompt) 2–7× = 128–462×.
5. **CI/CD-grade recompile** — data gen 15–30분 + FT 10–15분(8×H200) + eval 5–15분 = 30–50분.
6. **Full FT 권고** — *"Procedural internalization은 stylistic alignment보다 깊은 변화"*. 자매 논문 [2026b]이 LoRA rank 16–128 실패를 보였고, 본 논문은 전부 full parameter update.
7. **Cross-judge robustness** — Claude judge + GPT-4.1 judge로 self-preference bias 통제, GPT-4.1에서도 83–99% in-context quality로 정성 결론 일관.

## 방법론 및 아키텍처 (Methodology and Architecture)

### Subterranean vs Surface 아키텍처

| 구분 | Surface (기존) | Subterranean (제안) |
|---|---|---|
| Runtime topology | User ↔ Orchestrator ↔ LLM | User ↔ LLM |
| Procedure 위치 | External orchestrator(또는 매 턴 prompt) | LLM weights |
| Per-turn 동작 | Prompt injection + output parsing + edge routing | LLM이 자연 대화 생성 |
| Orchestrator 역할 | Runtime 전부 | **학습 데이터 생성에만** 사용 |
| System prompt | 전체 flowchart 직렬화 (in-context) 또는 node template (LangGraph) | "You are a helpful X assistant" 수준 |

### 4-Step Compilation Pipeline

1. **Procedure 정의** — flowchart `F = (N, E, n₀, T)`. N = nodes(role: agent/user + prompt template), E = edges (with optional conditions), n₀ = start, T = terminals(success·abandonment·escalation).
2. **Synthetic conversation 생성** — flowchart의 path를 sampling + 각 node에서 Claude Sonnet 4.5가 prompt template + history 보고 turn 생성. 출력은 절차 annotation 없는 자연 대화.
3. **Full fine-tuning** — 모든 파라미터 업데이트. AdamW LR 2e-5 cosine, bf16. LoRA는 자매 논문[2026b]에서 실패함을 근거로 배제.
4. **Deploy without orchestration** — runtime은 LLM 단독.

### 3 도메인 설정

| 도메인 | nodes | paths | base model | training data | hardware | best epoch |
|---|---|---|---|---|---|---|
| Travel booking | 14 (3 hubs) | 86 | Qwen 2.5 3B Instruct | 1,912 train · 213 eval | RTX 5090 (AdamW 8-bit) | 4 (of 20) |
| Zoom support | 14 (parallel) | 60 | Qwen3-8B | 6,264 (8 seeds 42–49 concat) | 8×A100 DeepSpeed ZeRO-3 | 2 (of 10) |
| Insurance claims | **55 (6 hubs, nested)** | **2,381** | Qwen3-8B | 2,700 train · 300 eval | 8×A100 DeepSpeed ZeRO-3 | 3 (of 20) |

### Evaluation Methodology

- **n = 200 scenarios/condition/domain** (총 6 conditions × 3 domains = 1,800+ 대화)
- **Baselines**:
  - **LangGraph orchestrator** (Claude Sonnet 4.5, ~30K stars, ~70× 큰 frontier). 각 flowchart node = LangGraph graph node, decision hub는 LLM classifier가 edge 선택. *Dennis et al. [2026a]에서 평가된 동일 system.*
  - **In-context baseline** (Claude Sonnet 4.5 + 전체 flowchart serialize → system prompt). Quality 상한.
- **Dynamic user simulation** — Claude Sonnet 4.5가 scenario variables(목적지·예산·성격 등) 받아 customer role-play. flowchart 미공개.
- **5개 LLM-as-judge metrics**: Task Success / Information Accuracy / Consistency / Graceful Handling (사용자 도전 없으면 max 3) / Naturalness — 각 1–5 scale + 행동 anchor.
- **통계**: paired Wilcoxon / unpaired Mann-Whitney U, Cohen's d, bootstrap 95% CI (10,000 resamples), **Holm-Bonferroni 보정** (5 metric × pairwise comparison).
- **Self-preference 통제**: Claude judge + GPT-4.1 cross-judge. 정성 결론(컴파일이 same-model orch 이김 + in-context 상한) 동일.

## 결과 (Results)

### Quality

**Travel (3B same-model controlled)**:

| Criterion | 3B Sub. | 3B Orch. | LG Orch. | In-Context |
|---|---|---|---|---|
| Task Success | 4.11 | 3.93 | 4.17 | **4.53** |
| Info. Accuracy | **4.75** | 4.69 | 4.21 | 4.64 |
| Consistency | 4.34 | 4.12 | 4.32 | **4.96** |
| Graceful Handling | 4.07 | 3.87 | 4.62 | **4.96** |
| Naturalness | 4.12 | 3.96 | 4.84 | **5.00** |

- **3B sub > 3B orch**: Task(+0.18)·Consistency(+0.22)·Graceful(+0.20)·Naturalness(+0.17) p<0.001
- vs LG Orch(~70× 큰): Info accuracy 우위, Graceful·Naturalness LG 우위 (3B capacity 한계)
- in-context 대비: Info 102%, Graceful·Naturalness ~82% → 8B 확장 동기

**Zoom (8B)** — graceful·naturalness 격차 해소: 8B sub는 in-context 대비 graceful 92%·naturalness 97% (3B의 82%에서 크게 개선). LG 대비 naturalness 우위(p<0.001), info accuracy 열위(broad world knowledge bottleneck).

**Insurance (8B, 55 nodes)** — 복잡 절차에서도 in-context의 **92–98%** 도달:

| Criterion | In-Context | LG Orch. | 8B Sub. |
|---|---|---|---|
| Task Success | **4.78** | 4.42 | 4.47 |
| Info. Accuracy | **4.78** | 4.45 | 4.40 |
| Consistency | **4.82** | 4.39 | 4.51 |
| Graceful Handling | **4.96** | 4.38 | **4.81** |
| Naturalness | **5.00** | 4.58 | **4.92** |

8B sub가 LG orch 대비 Graceful(p<0.001)·Naturalness(p<0.001)·Consistency 우위 — 큰 절차일수록 routing failure가 누적되는 LG의 약점이 노출.

### Cost (per-conversation)

| Domain | In-Context | LG Orch. | Subterranean | IC/Sub |
|---|---|---|---|---|
| Travel (14 nodes) | $0.133 | $0.077 | $0.0010 | **128×** |
| Zoom (14 nodes) | $0.103 | $0.054 | $0.0003 | **296×** |
| Insurance (55 nodes) | $0.327 | $0.174 | $0.0007 | **462×** |

- **Per-token**: vLLM A100 80GB $2.50/hr, batch 64에서 ~15K prefill·~3K decode tokens/s → ~$0.05/M input·$0.23/M output. Claude Sonnet 4.5($3/M·$15/M) 대비 **~65×**.
- **Token volume**: in-context는 매 턴 절차 직렬화(travel ~2× → insurance ~7× overhead). 컴파일은 constant.
- One-time compilation: ~$50–80, break-even 500 conversation, 10K+에서 per-conv 추가비용 <$0.01.

### Efficiency & Failure

| 도메인 | Sub wall-clock | LG | In-Context | Sub failure | LG failure |
|---|---|---|---|---|---|
| Travel (3B) | 69.4s / 22.6 turns | 64.9s / 16.5 | 55.5s / 16.4 | 5.5% | **24.0%** |
| Zoom (8B) | **29.5s** / 13.6 | 52.1s / 14.7 | 36.0s / 12.7 | 11.0% | 9.0% |
| Insurance (8B) | **43.2s** / 20.3 | 120.8s / 26.4 | 52.8s / 19.0 | 9.0% | **17.0%** |

- Insurance에서 컴파일이 **2.8× 빠름** (orchestrator는 hub마다 API call).
- Travel orch 24% failure는 hub routing error — 컴파일은 by construction zero routing failure.
- 컴파일 모델은 **interview style**(64% turns = exactly one question)로 conversation을 분할; total word count(~1,200–1,400)는 동일.

### Flexibility (Recompile)

| 단계 | 8×H200 | Single A100 80GB |
|---|---|---|
| Data generation | 15–30분 (병렬 API) | 동일 |
| Fine-tuning | **10–15분** (BF16 데이터 병렬) | ~3시간 (8-bit AdamW) |
| Eval (vLLM batched) | 5–15분 | 동일 |
| **Total** | **30–50분** | **3–4시간** |

## 시사점 (Implications)

- **개인 wiki·서비스에 직접 적용 가능한 가이드라인**:
  - 절차가 안정되고 conversation volume이 500+이면 컴파일이 in-context보다 거의 항상 경제적.
  - LoRA는 절차 학습에 부적합 — full FT 예산 확보가 전제.
  - **Procedure 복잡도가 클수록 비용 우위가 커진다** — 55-node Insurance에서 462×.
- **Three structural advantages of compilation** (저자 분석): (1) full procedure holistic reasoning, (2) zero routing failure by construction, (3) unconstrained natural style (template injection 없음). 이 세 가지가 70× capacity gap을 보상.
- **"Persistent structure belongs in weights, transient state belongs in prompt"** — 이 분업 원칙은 RAG·tool use 설계에도 적용 가능한 일반화 가능한 frame.

## 관련 페이지 (Related Pages)

- [[agents/qiao-2026-memory-intelligence-agent]] — Manager-Planner-Executor 3-agent decoupling + non-parametric ↔ parametric memory conversion. Dennis와 정반대 방향: 외부 orchestration을 분해해 정교화 (3 agent로 분업). 두 논문 모두 *"무엇을 weight에 internalize하고 무엇을 외부에 둘 것인가"*의 동일한 질문을 푸는 다른 답.
- [[agents/lee-hoyeon-2026-harness-engineering]] — *"모델 교체 5%보다 하네스 설계 15% 개선이 현실적"* 명제와 Dennis의 *"하네스를 weight로 흡수해 모델 자체가 하네스가 되게 한다"* 명제의 대비. Harness Engineering이 surface orchestration의 정교화 전략이라면, 본 논문은 그 전략의 한계를 컴파일로 우회.
- [[database/li-2026-beyond-semantic-similarity-rethinking-retrieval]] — DCI도 "infrastructure를 모델 내부로 흡수"하는 동일 철학 (embedding/index → grep/bash). 절차(Dennis) ↔ 검색(DCI)에서 공통적으로 *"외부 컴포넌트 → 모델 capability로 흡수"* 패턴.
