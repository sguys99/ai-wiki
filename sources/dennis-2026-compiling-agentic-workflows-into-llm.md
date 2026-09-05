---
title: "Compiling Agentic Workflows into LLM Weights: Near-Frontier Quality at Two Orders of Magnitude Less Cost"
type: paper
year: 2026
category: agents
raw_path: raw/papers/dennis-2026-compiling-agentic-workflows-into-llm.pdf
raw_filename: "dennis-2026-compiling-agentic-workflows-into-llm.pdf"
source_collection: external
tags: [agent-compilation, subterranean-agent, fine-tuning, langgraph, in-context-prompting, qwen, procedural-knowledge, task-oriented-dialogue, full-fine-tuning, agents]
authors: "Simon Dennis, Rivaan Patil, Kevin Shabahang, Hao Guo"
arxiv_id: "2605.22502"
---

## 한 줄 요약 (One-line Summary)

i14·University of Melbourne 팀이 agent orchestration framework(LangGraph·CrewAI·Google ADK 등 290K+ stars)를 **단일 fine-tuned 모델로 컴파일**하는 *subterranean agent* 패러다임을 3개 도메인(Travel 14 nodes, Zoom 14 nodes, Insurance 55 nodes)에서 정량 검증. 8B 컴파일 모델이 in-context frontier(Claude Sonnet 4.5) 대비 **87–98% quality**, LangGraph orchestrator(~70× 큰 frontier) 대비 **동등 또는 우위**, 비용은 **128–462× 저렴**, 재컴파일은 **30–50분 CI/CD cycle**. "지속적 구조는 weights, 일시적 state는 prompt"라는 분업 원칙.

## 1. 자료 정보 (Document Information)

- **저자**: Simon Dennis(University of Melbourne·i14), Rivaan Patil(i14), Kevin Shabahang(i14), Hao Guo(i14)
- **arXiv**: 2605.22502v1, 2026-05-21 (cs.AI), preprint
- **선행 작업**: Dennis et al. [2026a] "In-context prompting obsoletes agent orchestration for procedural tasks" — orchestration → in-context 전환 논문 (본 논문이 후속). Dennis et al. [2026b] "Procedural knowledge is not low-rank: Why LoRA fails to internalize multi-step procedures" — LoRA가 절차 학습에 실패함을 보인 자매 논문.
- **핵심 용어**: *subterranean agent* (지하 에이전트 — 절차가 weight에 묻혀 있고, runtime에 user가 LLM과 직접 대화), *surface orchestration* (지표면 오케스트레이션 — 외부 orchestrator가 매 턴 prompt injection)

## 2. 주요 기여 (Key Contributions)

1. **3가지 채택 장벽의 정량 해체**. Quality·Cost·Flexibility 3축에서 "왜 컴파일을 안 하는가?"에 대한 통념을 실험으로 반박. (각 장벽이 통념보다 훨씬 작다는 결론)
2. **Same-model controlled comparison으로 컴파일 효과 분리**. Travel 도메인에서 Qwen 2.5 3B base를 두 가지 방식으로 동시 운용 — (A) subterranean(컴파일), (B) surface orchestration(같은 base + flowchart injection). 모델 capacity와 절차를 고정한 채 architecture만 바꿔 5개 metric 중 4개에서 컴파일이 p<0.001로 우위.
3. **3개 도메인 실증**: Travel booking(14 nodes·86 paths·3B Qwen 2.5), Zoom support(14 nodes·60 paths·8B Qwen3, product-specific knowledge), Insurance claims(**55 nodes·6 decision hubs·2,381 paths**, ~4× 복잡) — 절차 복잡도가 늘어날수록 비용 우위가 커짐을 입증.
4. **2축 비용 분해**: (a) self-hosted vLLM(A100 $2.50/hr) per-token cost ~65× 저렴, (b) constant-size prompt로 token volume 2–7× 절약 → 둘이 곱해져 128–462×.
5. **CI/CD-grade recompile**: data generation 15–30분(병렬 API) + fine-tuning(8×H200 BF16 데이터 병렬 10–15분) + eval(vLLM batched 5–15분) = **30–50분 전체 cycle**. 단일 A100에서도 3–4시간.
6. **Full fine-tuning 권고**: LoRA rank 16–128 실험은 자매 논문[2026b]에서 실패. *"Procedural internalization은 stylistic alignment보다 깊은 변화"*. 본 논문은 전부 full parameter update.
7. **Approach-agnostic LLM-as-judge + cross-judge robustness**. Claude Sonnet 4.5 judge + GPT-4.1 독립 judge로 self-preference bias 통제. GPT-4.1에서도 83–99% in-context quality로 정성적 결론 일관.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 Surface Orchestration vs. Subterranean Agent

**Surface (기존)**: User ↔ Orchestrator ↔ LLM. 매 턴 orchestrator가 node prompt 주입 + 출력 parsing + 다음 edge 라우팅.

**Subterranean (제안)**: 학습 시에만 orchestrator 사용(synthetic data 생성용), runtime은 User ↔ LLM. 절차는 weights에 컴파일됨. 추론 시 system prompt는 *"You are a helpful travel booking assistant"* 수준의 최소 instruction만.

### 3.2 Procedure as Directed Graph

`F = (N, E, n₀, T)`
- **N**: nodes (role: agent/user, prompt template)
- **E ⊆ N × N × C**: edges with optional conditions
- **n₀**: start node, **T**: terminal nodes (success / abandonment / escalation)

### 3.3 4-Step Compilation Pipeline

1. **Define procedure** — flowchart with nodes (turns) + edges (transitions)
2. **Generate synthetic conversations** — flowchart를 따라 path sampling, 각 node에서 Claude Sonnet 4.5가 prompt template + full conversation history 보고 다음 turn 생성. 한 conversation은 자연 대화처럼 보이며 절차 annotation 없음.
3. **Fine-tune LLM** — **full parameter updates** (LoRA 금지). 절차는 자연 대화 분포의 통계적 규칙으로 internalize.
4. **Deploy without orchestration** — runtime에 LLM이 self-orchestrate.

### 3.4 3 Domain Configurations

| 도메인 | nodes | paths | base | training | hardware | epochs |
|---|---|---|---|---|---|---|
| Travel booking | 14 (3 hubs) | 86 | Qwen 2.5 3B Instruct | 1,912/213 | RTX 5090 (AdamW 8-bit) | 20 (best @4) |
| Zoom support | 14 (parallel) | 60 | Qwen3-8B | 6,264 (8 seeds 42–49) | 8×A100 DeepSpeed ZeRO-3 | 10 (best @2) |
| Insurance claims | **55 (6 hubs, nested loops)** | **2,381** | Qwen3-8B | 2,700/300 | 8×A100 DeepSpeed ZeRO-3 | 20 (best @3) |

공통: LR 2e-5 cosine, effective batch size 16(Travel)/32(Zoom·Insurance), bf16 precision.

### 3.5 Evaluation Methodology

- **n = 200 scenarios per condition per domain**
- **Baselines**:
  - **LangGraph orchestrator** (Claude Sonnet 4.5, ~30K stars, ~70× larger than 3B). Each flowchart node = LangGraph graph node; decision hubs use LLM classifier for edge selection. Frontier-model 기준선.
  - **In-context baseline** (Claude Sonnet 4.5 + 전체 flowchart 직렬화 to system prompt → 자기 자신이 self-orchestrate). Frontier quality 상한.
- **Dynamic user simulation**: Claude Sonnet 4.5가 scenario variables(목적지·예산·성격·만족도 등) 받아 customer role-play. flowchart는 미공개.
- **LLM-as-judge**: Claude Sonnet 4.5 (primary) + GPT-4.1 (robustness check). 5개 metric × 1–5 scale:
  - **Task Success** — 절차를 올바른 terminal state까지 일관·정확하게 수행했는가
  - **Information Accuracy** — 사용자 입력을 정확히 사용·유지했는가
  - **Consistency** — 모순/반복질문 없이 state 유지했는가
  - **Graceful Handling** — 변경·모호·edge case 대응 (사용자 도전 없으면 max 3)
  - **Naturalness** — 숙련된 인간 에이전트 같은가
- **통계**: paired(Wilcoxon signed-rank) / unpaired(Mann-Whitney U), Cohen's d, bootstrap 95% CI(10,000 resamples), Holm-Bonferroni 보정.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 Quality

**Travel (3B same-model)** — 컴파일이 4/5 metric에서 p<0.001:

| Criterion | 3B Sub. | 3B Orch. | LG Orch. | In-Context |
|---|---|---|---|---|
| Task Success | 4.11 | 3.93 | 4.17 | **4.53** |
| Info. Accuracy | **4.75** | 4.69 | 4.21 | 4.64 |
| Consistency | 4.34 | 4.12 | 4.32 | **4.96** |
| Graceful Handling | 4.07 | 3.87 | 4.62 | **4.96** |
| Naturalness | 4.12 | 3.96 | 4.84 | **5.00** |

- 3B sub > 3B orch: Task(+0.18)·Consistency(+0.22)·Graceful(+0.20)·Naturalness(+0.17) 모두 p<0.001. Info accuracy는 +0.05 not significant.
- vs LG Orch(~70× 더 큼): Info accuracy 우위(4.75 vs 4.21), Graceful·Naturalness는 LG 우위.
- vs in-context: Info accuracy 102%, Graceful·Naturalness ~82% (격차의 정체) → 8B scaling 동기.

**Zoom (8B)** — graceful·naturalness 격차 해소:

| Criterion | 8B Sub. | LG Orch. | In-Context |
|---|---|---|---|
| Task Success | 4.50 | 4.62 | **4.92** |
| Info. Accuracy | 4.26 | 4.75 | **4.92** |
| Consistency | 4.42 | 4.55 | **5.00** |
| Graceful Handling | 4.62 | 4.52 | **5.00** |
| Naturalness | **4.87** | 4.64 | **5.00** |

- Graceful 92% (vs 82% in 3B), Naturalness 97% (vs 82% in 3B) — 격차 해소.
- 남은 격차는 Info accuracy(87%) — broad world knowledge가 bottleneck.
- LG 대비 Naturalness 우위(p<0.001), Info accuracy 열위(p<0.001).

**Insurance (8B, 55 nodes)** — 큰 절차에서도 성립:

| Criterion | In-Context | LG Orch. | 8B Sub. |
|---|---|---|---|
| Task Success | **4.78** | 4.42 | 4.47 |
| Info. Accuracy | **4.78** | 4.45 | 4.40 |
| Consistency | **4.82** | 4.39 | 4.51 |
| Graceful Handling | **4.96** | 4.38 | **4.81** |
| Naturalness | **5.00** | 4.58 | **4.92** |

- 8B sub vs LG Orch: Graceful(4.81 vs 4.38, p<0.001), Naturalness(4.92 vs 4.58, p<0.001), Consistency 우위.
- in-context의 92–98% 도달 → 55-node 복잡도에서도 compilation이 성립.

### 4.2 Cost

**Per-conversation inference cost** (Table 6):

| Domain | In-Context | LG Orch. | Subterranean | IC/Sub 배수 |
|---|---|---|---|---|
| Travel (14 nodes) | $0.133 | $0.077 | $0.0010 | **128×** |
| Zoom (14 nodes) | $0.103 | $0.054 | $0.0003 | **296×** |
| Insurance (55 nodes) | $0.327 | $0.174 | $0.0007 | **462×** |

비용 우위는 2축 곱:
- **Per-token**: vLLM A100 80GB($2.50/hr) batch 64에서 ~15K prefill tokens/s, ~3K decode tokens/s → $0.05/M input·$0.23/M output. Claude Sonnet 4.5($3/M·$15/M) 대비 **~65× 저렴**.
- **Token volume**: in-context는 매 턴 절차 직렬화 prompt(travel ~2×, insurance ~7× overhead). 컴파일은 constant-size prompt → volume 2–7× 절감.
- 두 factor 곱: 128× (travel) ~ 462× (insurance). 절차 복잡할수록 우위 증가.
- LG 대비도 77–249× cheaper.

**One-time compilation cost**: 데이터 생성 ~$40 + 학습 ~$10–40 = $50–80. 500 conversation에서 break-even, 10K+에서 per-conv 추가비용 <$0.01.

### 4.3 Efficiency & Failure Modes

**Wall-clock & failure rate** (Tables 4–5):

| 도메인 | Sub | LG Orch | In-Context | 실패율(Sub vs LG) |
|---|---|---|---|---|
| Travel (3B) | 69.4s / 22.6 turns | 64.9s / 16.5 | 55.5s / 16.4 | **5.5% vs 24.0%** |
| Zoom (8B) | **29.5s** / 13.6 | 52.1s / 14.7 | 36.0s / 12.7 | 11.0% vs 9.0% |
| Insurance (8B) | **43.2s** / 20.3 | 120.8s / 26.4 | 52.8s / 19.0 | **9.0% vs 17.0%** |

- Insurance에서 컴파일이 **2.8× 빠름** — orchestrator는 decision hub마다 API 호출.
- Travel orch 24% failure는 decision hub routing error. 컴파일은 by construction zero routing failure.
- 컴파일 모델은 "interview style" 학습(64% turns = exactly one question). Total word count는 도메인 간 ~1,200–1,400으로 동일 — 같은 정보를 다른 granularity로 분할.

### 4.4 Flexibility (Recompile Cycle)

| 단계 | 8×H200 | Single A100 80GB |
|---|---|---|
| Data generation (parallel API) | 15–30분 (rate limit 의존) | 동일 |
| Fine-tuning (10–12 epochs) | **10–15분** (BF16 데이터 병렬) | ~3시간 (8-bit AdamW) |
| Eval (vLLM batched 50 scenarios) | 5–15분 | 동일 |
| **Total** | **30–50분** | **3–4시간** |

CI/CD build와 동등한 sub-hour cycle. "deployment cycle, not paradigm shift".

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **Information accuracy bottleneck (Zoom 87%)**: broad world knowledge 한계. Domain knowledge가 더 분산되거나 longtail이면 8B로 부족할 가능성.
- **Frontier 격차 잔존 (Insurance 92–98%)**: in-context 상한과 2–13% 격차. 절대 품질 최우선 도메인에선 trade-off.
- **Recompile 가정**: 학습 데이터가 새 flowchart에 일관되게 재생성된다는 가정. 절차 변경이 잦거나 작은 hot-fix 패치가 필요한 경우 recompile cost가 누적.
- **단일 base family(Qwen 2.5/3) 검증**: 다른 base(Llama, Mistral 등) 일반화는 미검증.
- **High-stakes 도메인 미검증**: 의료·법률처럼 hallucination 비용이 높은 절차에서 compiled 모델의 routing-by-construction 우위가 어디까지 유지되는지 미확인.
- **자매 논문 의존**: LoRA 실패 결론은 Dennis et al. [2026b] 별도 논문. 본 paper 자체는 full FT만 보고.
- **외부 tool use 미검증**: 본 evaluation은 dialogue-only. API 호출·검색·코드 실행 등 tool use가 결합된 절차에서 컴파일이 성립하는지 후속 과제.

## 6. 관련 연구 (Related Work)

저자가 3 line으로 분류:

### Collapsing dialogue pipelines (단일 모델로 통합)
- **SimpleTOD** [Hosseini-Asl et al., NeurIPS 2020] — TOD의 understanding·action·response를 single sequence prediction으로. MultiWOZ SOTA.
- **AutoTOD** [Xu et al., ACL 2024] — autonomous action sequencing으로 확장. modular system의 error accumulation·poor generalization 문제 제기.

### Distilling agent reasoning from frontier models
- **FireAct** [Chen et al., 2023] — Llama2-7B를 GPT-4 ReAct trajectory로 fine-tune. HotpotQA +77%.
- **AgentTuning** [Zeng et al., ACL 2024] — Llama 2를 diverse agent interaction trajectory로 instruction-tune. 70B로 GPT-3.5-turbo와 match (unseen task).
- **Agent Lumos** [Yin et al., ACL 2024] — planning + grounding module 분리, open-source가 GPT agent 추월.

### Scaling to complex workflows
- **WorkflowLLM** [Fan et al., 2024] — 106K workflow samples · 1,503 APIs를 8B에 컴파일.
- **SynTOD** [Samarinas et al., 2024] — state transition graph로 synthetic TOD 생성 (본 논문의 flowchart-guided 접근과 가장 가까움).
- **Hsiao [2026]** — procedural knowledge를 hierarchical task network로 형식화.

### Agent framework failure 분석 (motivation)
- **Cemri et al. [2026]** — multi-agent LLM system의 14가지 failure mode 분류.
- **Zhu et al. [2026]** — cascading failure가 primary bottleneck.
- **Gupta [2026] ReliabilityBench** — 60% pass@1 agents가 25% consistency만 유지.
- **Dennis et al. [2026a]** — procedural task에서 in-context > orchestration (본 논문 직전 논문, 컴파일의 target ceiling 확립).

본 논문 차별점: (a) 컴파일 vs 오케스트레이션 비용 우위 정량화, (b) recompile cycle 측정, (c) **same-model orchestrated baseline + frontier-model baseline 동시 비교**로 컴파일 효과를 capacity 효과와 분리.

### 인프라
- **vLLM / PagedAttention** [Kwon et al., SOSP 2023] — self-hosted batched inference (비용 계산의 핵심).
- **LLM-Inference-Bench** [Patel et al., 2024] — 8B 모델 A100 throughput 벤치마크 (비용 계산 근거).
- **LangGraph** [LangChain, 2024], **CrewAI** [Moura, 2024], **Google ADK** [2026], **OpenAI Agents SDK** [2026], **Semantic Kernel** [Microsoft, 2026], **Strands** [AWS, 2026], **LlamaIndex Workflows** [2026] — 비교 대상 290K+ stars orchestration ecosystem.
- **LLM-as-judge** [Zheng et al., NeurIPS 2023] — MT-Bench. **Panickssery et al. [2024]** — judge self-preference bias (cross-judge 통제 motivation).

## 7. 용어집 (Glossary)

- **Subterranean agent** — 절차가 LLM weights에 컴파일되어 보이지 않는 곳(지하)에서 동작하는 agent. Runtime에 외부 orchestrator 없음.
- **Surface orchestration** — orchestrator가 user와 LLM 사이 지표면에 존재하면서 매 턴 prompt를 inject하고 출력을 parse.
- **Compilation** — 절차(flowchart)를 synthetic conversation으로 변환한 뒤 full fine-tuning으로 모델 weights에 internalize.
- **Procedure / Flowchart** — `F = (N, E, n₀, T)` directed graph. node = turn, edge = transition.
- **Decision hub** — 다중 outgoing edge를 가진 node. Surface orchestration에서 LLM classifier가 라우팅하는 지점이자 failure-prone area.
- **Procedural internalization** — 절차 구조를 통계적 규칙으로 weight에 흡수. 자매 논문[2026b]에 따르면 LoRA(rank 16–128)로는 도달 불가, full FT 필요.
- **In-context baseline** — 전체 flowchart를 직렬화해 system prompt에 넣고 frontier model이 self-orchestrate. Quality 상한이자 가장 비싼 baseline.
- **LangGraph orchestrator** — 본 논문 비교의 대표 surface orchestration framework. ~30K stars (2026-03 기준), Claude Sonnet 4.5로 운영.
- **Dynamic user simulation** — Claude Sonnet 4.5가 scenario variables 받아 customer role-play. flowchart 미공개.
- **LLM-as-judge** — Zheng et al. 2023의 평가 방법. 본 논문은 Claude judge + GPT-4.1 cross-judge로 self-preference bias 통제.
- **Full parameter updates (full FT)** — 모든 파라미터 학습 (LoRA·prefix 등 PEFT와 대비). 본 논문이 권고하는 컴파일 방식.
- **Recompile cycle** — 절차 변경 시 (1) 새 flowchart로 데이터 재생성 → (2) full fine-tuning → (3) eval. 8×H200에서 30–50분, A100 단독에서 3–4시간.
- **vLLM / PagedAttention** — Kwon et al. SOSP 2023의 LLM serving framework. Self-hosted batched inference로 per-token cost를 ~65× 절감하는 비용 우위의 인프라적 근거.
- **interview style** — 컴파일 모델이 학습 데이터에서 흡수한 한 턴 한 질문 패턴 (64% turns = exactly one question). LangGraph orchestrator는 template injection으로 multi-question turn 발생.
- **i14** — 저자 소속 표기. University of Melbourne 기반 연구 그룹으로 추정 (논문 내 별도 설명 없음).
