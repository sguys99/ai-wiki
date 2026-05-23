---
title: "Memory Intelligence Agent"
type: paper
year: 2026
category: agents
raw_path: /Users/kmyu/Desktop/project/ai-wiki/raw/papers/qiao-2026-memory-intelligence-agent.pdf
raw_filename: "qiao-2026-memory-intelligence-agent.pdf"
source_collection: external
tags: [memory, deep-research-agent, reinforcement-learning, test-time-learning, multimodal, planner-executor, GRPO]
authors: "Jingyang Qiao, Weicheng Meng, Yu Cheng, Zhihang Lin, Zhizhong Zhang, Xin Tan, Jingyu Gong, Kun Shao, Yuan Xie"
arxiv_id: "2604.04503"
---

## 한 줄 요약 (One-line Summary)

Deep Research Agent용 메모리 프레임워크. **Manager-Planner-Executor 3-agent 구조**로 historical trajectory를 non-parametric memory(압축된 workflow 저장소) + parametric memory(Planner LoRA-style 학습)로 분리하고, GRPO 기반 two-stage alternating RL과 online test-time learning을 결합해 11개 벤치마크에서 SOTA(Qwen2.5-VL-7B 기반으로도 GPT-5.4·Gemini-3-Flash 추월).

## 1. 자료 정보 (Document Information)

- **저자**: Jingyang Qiao*, Weicheng Meng*, Yu Cheng, Zhihang Lin, Zhizhong Zhang†(corresponding), Xin Tan, Jingyu Gong, Kun Shao, Yuan Xie‡(project leader). ECNU(East China Normal University), 上海 Innovation Institute, HIT, 厦门大学, Shanghai AI Lab 협업.
- **arXiv**: 2604.04503v4, 2026-04-19
- **공개 자료**: Code https://github.com/ECNU-SII/MIA · Model https://huggingface.co/LightningCreeper/MIA · Dataset https://huggingface.co/datasets/LightningCreeper/MIA
- **에피그라프**: *"Never memorize something that you can look up."* — Albert Einstein (memory 압축 철학의 메타포)

## 2. 주요 기여 (Key Contributions)

1. **Manager-Planner-Executor architecture (3-agent decoupling)**. Memory Manager(non-parametric, frozen Qwen3-32B + memory buffer), Planner(parametric, Qwen3-8B, 학습 대상), Executor(operational, Qwen2.5-VL-7B, ReAct loop) 3개 역할 분리. 기존 long-context memory의 4가지 한계(attention dilution, noise, storage 폭발, retrieval cost) 모두 우회.
2. **Two-stage alternating RL paradigm (GRPO 기반)**. Stage 1: Planner freeze, Executor 학습 (tool calling + plan following). Stage 2: Executor freeze, Planner 학습 (memory 흡수 + plan 생성 + reflection). 두 agent가 서로의 출력에 적응.
3. **Continual test-time learning (TTL)**. 추론과 동시에 Planner parameter를 batch 단위로 online update. 일반 offline RL과 달리 multi-epoch rollout·pre-collected context 없이 exploration → feedback → memory 추출 → 파라미터 업데이트가 동시 진행.
4. **Bidirectional memory conversion loop**. Trajectory → (compressed workflow + image caption) → non-parametric memory → Planner retraining → parametric memory에 internalize → memory buffer 선택적 삭제. "메모리 폭발" 방지 + 핵심 정보 보존.
5. **Reviewer-Area Chair unsupervised judgment**. Ground-truth 없을 때 3명의 specialized reviewer(Reasoning & Logical Consistency / Information Sourcing & Credibility / Result Validity) + Area Chair가 peer review 형식으로 trajectory 품질 판정. "hallucinated objectivity" 회피.
6. **실험 결과**: 11개 벤치마크에서 (1) GPT-5.4 +9% LiveVQA, +6% HotpotQA. (2) Qwen2.5-VL-7B Executor 기준 평균 +31%, Qwen2.5-VL-32B를 18% 초과. (3) Unsupervised setting에서도 supervised에 근접, 3 epoch self-evolution으로 점진 향상(예: 59.6 → 61.1 → 61.7). (4) 기존 memory baseline(ReasoningBank, ExpeL, Memento) 대비 평균 +5%.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 3-stage Agent Loop

매 query마다 (1) **Memory Retrieval** → (2) **Collaborative Reasoning** → (3) **Experience Consolidation** 사이클.

**Memory Retrieval (Stage 1)**. Memory Manager가 이미지를 caption으로 변환(50단어 제한) → 텍스트 기반 hybrid scoring으로 메모리 유닛 검색:
- Semantic Similarity: question + caption embedding (sup-simcse-bert-base-uncased) cosine, αq=0.8 αc=0.2, min-max 정규화
- Value Reward: `s_i / (u_i+1)` (성공 횟수 / 사용 횟수+1)
- Frequency Reward: `1 / (u_i+1)` (long-tail 탐색 장려)
- 최종 score = 0.7·Sim + 0.3·Val + 0.3·Freq, **성공/실패 trajectory 모두** 검색(positive paradigm + negative constraint)

**Collaborative Reasoning (Stage 2)**.
- **Planner** (Cognitive Hub, Qwen3-8B): retrieved trajectories + 현재 question → CoT few-shot으로 step-by-step plan 생성
- **Executor** (Operational Terminal, Qwen2.5-VL-7B): plan에 따라 ReAct loop(`<think>` → `<tool_call>` → tool result → ...) 실행. 도구는 `search`(top-3 text passages from local wiki25 또는 Serper) + `web_image_to_image_search`(1회 호출 한정, Serper image API)
- **Reflect-Replan**: Executor가 candidate answer 생성 후 LLM Judger(Qwen3-32B) 평가. 오답이면 Planner가 1회에 한해 revised plan 생성

**Experience Consolidation (Stage 3)**.
- LLM Judger 평가 → trajectory를 success/fail 분류
- Memory Manager가 trajectory를 **structured workflow summary**로 압축(Qwen3-32B + 명시적 prompt): "Use visual search → identify location → text search to verify"식 abstract action pattern
- 새 메모리와 기존 메모리 간 semantic similarity 계산 → 높으면 교체, 없으면 신규 저장. value reward·frequency count 동시 업데이트
- 주기적으로 Planner를 현재 batch로 재학습 → 메모리 buffer 선택적 삭제 (episodic → parametric 변환)

### 3.2 Two-Stage Alternating RL (GRPO)

**Executor RL (Stage 1, Eq.1·2)**: Planner는 frozen server, Executor 학습.
- Reward: `r = 0.7·r_correctness + 0.2·r_tool + 0.1·r_format` (LLM Judger + 룰 기반)
- Token loss masking: tool/Planner가 만든 token은 학습 제외 (`I(y_{i,t})`)

**Planner RL (Stage 2, Eq.3·4)**: Executor는 frozen server, Planner 학습.
- Reward: `r = 0.7·r_correctness(final) + 0.2·r_correctness(intermediate) + 0.05·r_reflect + 0.05·r_format`
- Reflection reward: 첫 응답 맞고 reflect 안하면 +1, 첫 응답 틀리고 reflect 발동하면 +1 (불필요한 reflect 억제)

### 3.3 Test-Time Learning

**Non-parametric memory**: 매 batch마다 Planner가 G개 plan rollout → 각각 Executor 실행 → judger 평가 → success set에서 **최단 trajectory** 1개 + fail set에서 **랜덤 1개**를 contrastive pair로 압축 저장.

**Parametric memory**: 같은 rollout의 reward로 GRPO advantage 계산 → Planner 파라미터 online update. **non-parametric 추출과 파라미터 업데이트가 동시 수행**되어 cache miss 없이 streaming 가능.

**Meta Plan Memory + Router**: success/fail pair를 별도 메모리에 저장 → 다음 batch의 rollout 결과 중 Router(Memory Manager와 동일 LLM, 다른 prompt)가 최적 plan 선택. Label leakage 방지.

### 3.4 Unsupervised Self-Evolution (Reviewer-Area Chair)

Ground-truth 없을 때 4-agent peer review:
- **Reviewer 1 (R_L, Qwen3-32B)**: Reasoning & Logical Consistency — causal chain 평가
- **Reviewer 2 (R_C, Qwen3-32B)**: Information Sourcing & Credibility — hallucination·misattribution 검출
- **Reviewer 3 (R_V, Qwen3-32B)**: Result Validity — completeness·완료 상태
- **Area Chair (Qwen3-32B)**: 세 리뷰의 structured JSON을 meta-analysis (importance weight R_L 0.5 / R_C 0.3 / R_V 0.2), 최종 verdict는 단일 글자 "A"(correct) / "B"(incorrect)

3가지 장점: Dimensional Orthogonality (error bleeding 방지), Evidence-Based Accountability (evidence quote 의무), Conflict Resolution via Meta-Decision (단순 평균이 아닌 fatal flaw 우선).

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 Multimodal Benchmarks (Table 3)

| Model | FVQA-test | InfoSeek | SimpleVQA | LiveVQA | MMSearch | In-house 1 | In-house 2 |
|---|---|---|---|---|---|---|---|
| GPT-5.4 (direct) | 50.8 | 43.6 | 55.5 | 21.5 | 44.4 | 45.1 | 23.0 |
| Gemini-3-Flash (direct) | 69.3 | 69.0 | 73.7 | 26.0 | 69.0 | 52.5 | 25.5 |
| Qwen2.5-VL-32B+ReACT | 51.3 | 38.0 | 48.5 | 24.8 | 27.3 | 28.8 | 26.5 |
| MMSearch-R1 | 58.0 | 49.0 | 55.3 | 28.3 | 43.9 | 13.6 | 21.8 |
| Memento (prev SOTA memory) | 66.3 | 57.3 | 61.9 | 36.7 | 61.4 | 22.7 | 30.7 |
| **MIA (Ours)** | **69.6** | 65.5 | 64.9 | **43.1** | 62.6 | 31.8 | **37.7** |
| Unsupervised MIA | 65.1 | 64.3 | 63.3 | 40.1 | 60.2 | 29.8 | 31.1 |

- MIA가 모든 memory baseline을 평균 +5.5p 상회
- 전통 contextual memory(RAG, Mem0, A-Mem)는 No Memory(baseline)보다도 성능이 떨어짐 → **long context noise 가설 검증**
- 7B Executor로 거대 closed-source LLM(GPT-5.4, Gemini-2.5-Pro)를 추월

### 4.2 Text-Only Benchmarks (Table 4)

| Model | SimpleQA | 2Wiki | HotpotQA | GAIA |
|---|---|---|---|---|
| No Memory | 40.7 | 61.2 | 51.0 | 11.7 |
| Memento | 42.4 | 64.2 | 55.2 | 22.3 |
| **MIA (Ours)** | **47.7** | **71.8** | **63.5** | **31.1** |
| Unsupervised MIA | 46.6 | 71.6 | 61.7 | 30.1 |

- Memento 대비 평균 +7.5p, GAIA에서 +8.8p
- **Unsupervised MIA가 거의 모든 supervised baseline을 능가** (text-only)

### 4.3 Closed-Source Executor Generalization (Figure 8)

Planner만 학습, Executor는 API:
- GPT-5.4: LiveVQA +8.9, HotpotQA +6.4
- Gemini-3-Flash: +3.1 / +2.6
- Claude-Sonnet-4.6: +1.8 / +1.7
- "improvement margin이 base model 능력과 역상관" → MIA의 메모리·계획 보완이 약한 모델에 더 큰 도움

### 4.4 Ablation (Table 5·6)

Base(No Memory) → +Memory만 → +Plan만 → Memory for Planner → +Reflect → Trained Planner → +TTL 순으로 점진 상승. **"Only Memory" 단독은 오히려 성능 하락** (-0.4 multimodal): 메모리는 Executor가 아닌 **Planner의 contextual prior로 사용해야** 효과적.

### 4.5 Self-Evolution (Table 7, Unsupervised)

| Epoch | FVQA-test | LiveVQA | 2Wiki | HotpotQA |
|---|---|---|---|---|
| Base | 61.4 | 33.0 | 61.2 | 51.0 |
| epoch-1 | 65.1 | 40.1 | 71.6 | 61.7 |
| epoch-2 | 66.4 | 41.4 | 73.4 | 63.1 |
| epoch-3 | 67.1 | 41.8 | 74.7 | 63.2 |

같은 데이터셋을 반복 노출해도 monotonic 향상 → 누적 학습 검증.

### 4.6 Tool Call Analysis (Figure 9)

No-Memory는 tool call 자체가 매우 낮음(메모리 없으면 다중 턴 reasoning 능력 부족). RAG/Mem0/A-Mem은 long-context noise로 인해 효과적 tool 사용 실패. Memento·MIA처럼 **명시적 Planner를 메타 가이던스 위에 얹은 구조**가 가장 효과적.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **Reflect-Replan은 1회만 trigger** (계산 비용·무한 루프 방지). 진정한 multi-step reflection은 미해결.
- 현재 도구가 **`search` + `web_image_to_image_search` 2개로 제한**. code interpreter, browser navigation, file I/O 등 복잡한 도구 환경으로 확장 필요 (논문 conclusion에서 "더 복잡하고 동적인 환경 확장" 명시).
- Reviewer-AC unsupervised judgment는 Qwen3-32B 4개 인스턴스 필요 → **inference cost 부담**. 더 경량의 unsupervised 신호가 필요.
- TTL의 single-epoch online learning은 데이터 분포 shift에 취약할 수 있음. catastrophic forgetting 명시적 언급은 없으나 memory buffer 선택적 삭제 정책이 그 역할.
- Memento의 parametric retrieval optimization은 multimodal에 적용 어려워 non-parametric 버전만 비교(저자 자인).
- LiveVQA 평가에 사용한 데이터셋이 MMSearch-R1 보고본(3,602)과 다른 공개 버전(2,384) — 직접 비교 시 주의.

## 6. 관련 연구 (Related Work)

- **Deep Research Agents (학습 기반)**: DeepResearcher (Zheng et al., 2025), Search-R1 (Jin et al., 2025), MMSearch-R1 (Wu et al., 2025), DeepMMSearch-R1 (Narayan et al., 2025), WebWatcher (Geng et al., 2025), Deepeyes2 (Zheng et al., 2026)
- **Agent Memory (storage·관리)**: ReasoningBank (Ouyang et al., 2025), MemoryBank (Zhong et al., 2024), ExpeL (Zhao et al., 2024), Mem-α (Wang et al., 2025a), Memory-r1 (Yan et al., 2025), A-Mem (Xu et al., 2025), Agentic Memory (Yu et al., 2026), Mem0 (Chhikara et al., 2025)
- **Memory Fine-tuning**: Memento (Zhou et al., 2025) — frozen LLM + memory fine-tuning. MIA의 가장 직접적 비교군
- **Memory Evolution**: MemEvolve (Zhang et al., 2025b), Evo-Memory (Wei et al., 2025)
- **Long-context Memory**: InfLLM (Xiao et al., 2024), LM2 (Kang et al., 2025), MemAgent (Yu et al., 2025), G-memory (Zhang et al., 2025a)
- **RL Framework**: veRL (Sheng et al., 2025), GRPO (Shao et al., 2024 — DeepSeekMath)
- **Tool & ReAct**: ReAct (Yao et al., 2023), TALM (Parisi et al., 2022), API-Bank (Li et al., 2023), SciAgent (Ma et al., 2024)

## 7. 용어집 (Glossary)

- **DRA (Deep Research Agent)**: LLM reasoning + 외부 도구를 결합해 multi-hop 정보 검색 task를 처리하는 agent
- **GRPO (Group Relative Policy Optimization)**: DeepSeekMath에서 제안된 RL 알고리즘. group 내 reward를 mean·std로 정규화해 advantage 계산, value baseline 불필요. Memory Manager·Executor·Planner 모두 GRPO로 학습
- **Non-parametric memory**: Memory buffer에 저장된 명시적 trajectory/workflow (in-context contrastive learning용)
- **Parametric memory**: Planner LLM의 weight에 internalize된 latent knowledge
- **TTL (Test-Time Learning)**: 추론 batch와 동시에 parameter를 update하는 online learning paradigm. MIA의 핵심 기여
- **Meta Plan Memory**: TTL 중 success/fail plan을 contrastive pair로 저장하는 별도 memory
- **Router**: rollout 결과 중 최적 plan을 선택하는 LLM (Memory Manager와 LLM 공유, 다른 prompt)
- **ReAct loop**: Reason + Act 교차 패러다임. `<think>` → `<tool_call>` → tool result → ... 반복
- **Reflect-Replan**: Executor 결과가 오답이면 Planner가 1회 revise. MIA의 reflection 메커니즘
- **Reviewer-AC (Area Chair)**: 학회 peer review에서 영감을 받은 unsupervised judgment 구조. R_L(logic) + R_C(credibility) + R_V(validity) + AC(meta-decision)
- **Workflow summary**: trajectory를 "action purpose (input → output)" 형식의 추상 step으로 압축한 표현
- **Image caption**: 멀티모달 입력의 이미지를 50단어 텍스트로 요약 (메모리 검색 alignment용)
- **MATPO**: Multi-Agent Tool-integrated Policy Optimization (Mo et al., 2025). Planner 학습 데이터 mix
- **wiki25**: Karpukhin et al. 2020의 Wikipedia 25M passages dump. 로컬 text retriever 코퍼스
- **Serper**: 상용 image/text search API. 본 논문에서 image-to-image 및 일부 text 도구 백엔드로 사용
