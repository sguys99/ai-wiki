---
title: "Memory Intelligence Agent (MIA)"
type: paper
year: 2026
category: agents
raw_path: raw/papers/qiao-2026-memory-intelligence-agent.pdf
raw_filename: "qiao-2026-memory-intelligence-agent.pdf"
source: qiao-2026-memory-intelligence-agent.md
source_collection: external
tags: [memory, deep-research-agent, reinforcement-learning, test-time-learning, multimodal, planner-executor, GRPO, agents]
authors: "Jingyang Qiao, Weicheng Meng, Yu Cheng, Zhihang Lin, Zhizhong Zhang, Xin Tan, Jingyu Gong, Kun Shao, Yuan Xie"
arxiv_id: "2604.04503"
---

## 요약 (Summary)

ECNU·Shanghai Innovation Institute·HIT 컨소시엄이 2026-04-19 arXiv에 공개한 **Manager-Planner-Executor 3-agent 메모리 프레임워크**. Deep Research Agent에서 기존 long-context memory(RAG, Mem0, A-Mem 등)가 (1) attention dilution, (2) noise, (3) storage 폭발, (4) retrieval cost 폭증의 4가지 한계를 보인다는 문제 의식에서 출발해, historical trajectory를 **두 종류의 메모리**로 분리한다.

- **Non-parametric memory**: Memory Manager(Qwen3-32B + buffer)가 trajectory를 "Use visual search → identify event → text search to verify" 식 **structured workflow**로 압축 저장. 이미지는 50단어 caption으로 변환.
- **Parametric memory**: Planner(Qwen3-8B)가 RL로 학습되어 historical pattern을 weight에 internalize.

두 메모리는 **bidirectional conversion loop**로 연결된다: trajectory → workflow → Planner 재학습 → memory buffer 선택적 삭제. "memory가 무한히 자라는 문제"를 컴파일 단계(workflow 압축)와 런타임 단계(weight internalize)에서 동시에 해결.

훈련은 **GRPO 기반 two-stage alternating RL**(Stage 1: Executor 학습 with frozen Planner, Stage 2: Planner 학습 with frozen Executor) + **online test-time learning**(batch마다 exploration과 동시에 Planner 파라미터 업데이트, multi-epoch rollout 없이). Unsupervised setting에서는 학회 peer review를 모사한 **Reviewer-Area Chair** 구조(R_L logic / R_C credibility / R_V validity + AC meta-decision)로 ground-truth 없이도 자체 평가·자체 진화 가능.

핵심 비교 결과:
- 7B Executor 기반 MIA가 GPT-4o, Gemini-2.5-Pro, 일부 dataset에서 GPT-5.4를 추월
- Qwen2.5-VL-7B Executor + MIA가 Qwen2.5-VL-32B+ReACT 대비 평균 **+18p**
- Memento(이전 memory SOTA) 대비 평균 **+5.5p (multimodal), +7.5p (text-only)**
- Unsupervised MIA가 거의 모든 supervised baseline을 능가 (text-only 4 dataset 중 3개)
- 3 epoch self-evolution으로 monotonic 향상 (예: HotpotQA 51.0 → 61.7 → 63.1 → 63.2)

## 주요 기여 (Key Contributions)

1. **3-agent decoupling**: 기존 monolithic agent를 Memory Manager(누가 무엇을 기억할지) + Planner(무엇을 할지) + Executor(어떻게 할지)로 분리. 각 역할이 독립적으로 학습·교체 가능.
2. **Bidirectional memory conversion loop**: episodic(non-parametric) ↔ semantic(parametric) 변환 사이클로 메모리 폭발 방지. "Never memorize something that you can look up" (Einstein epigraph) 철학을 구조에 박아넣음.
3. **Two-stage alternating GRPO**: Planner와 Executor를 동시에 학습하면 reward attribution 모호. 번갈아 freeze하며 학습하면 각자가 상대의 출력 분포에 적응.
4. **Test-Time Learning**: offline RL과 달리 추론과 동시에 batch online update. multi-epoch 불필요 → cache miss 없이 streaming.
5. **Reviewer-Area Chair**: monolithic LLM-as-judge의 "hallucinated objectivity" 우회. dimensional orthogonality + evidence-based accountability + meta-decision으로 fatal flaw 우선 판정.

## 방법론 및 아키텍처 (Methodology and Architecture)

### 3-Stage Agent Loop

```
[Query] → Memory Retrieval → Collaborative Reasoning → Experience Consolidation → [Answer + 갱신된 memory]
                ↑                                                        |
                └────────────────── parametric/non-parametric update ───┘
```

**Memory Retrieval**. Image → 50-word caption (sup-simcse-bert-base-uncased로 embedding). Hybrid scoring:
- `Score = 0.7·Sim + 0.3·Val + 0.3·Freq`
  - `Sim = 0.8·sim(question) + 0.2·sim(caption)`, min-max 정규화
  - `Val = s_i / (u_i+1)` — 성공률 prior
  - `Freq = 1 / (u_i+1)` — long-tail 탐색

**Critical**: 성공 trajectory(positive paradigm)뿐 아니라 **실패 trajectory(negative constraint)도 함께 검색**해서 Planner에게 contrastive context로 제공.

**Collaborative Reasoning**.
- Planner: retrieved trajectories를 few-shot CoT로 활용 → step-by-step plan
- Executor: plan을 ReAct loop로 실행 (`<think>` → `<tool_call>` → tool result → ...). 도구는 `search`(top-3 passages) + `web_image_to_image_search`(1회 한정)
- Reflect-Replan: 1회 한정 reflection. Planner가 Executor의 trajectory를 평가하고 "yes"(replan)/"no" 결정

**Experience Consolidation**.
- Workflow extraction prompt로 trajectory 압축 (Qwen3-32B):
  ```
  Example: "1. Use visual search to generate candidate locations
            2. Use text search to narrow hypothesis
            3. Verify with specific query"
  ```
- 유사 메모리 있으면 교체, 없으면 신규 저장 + value/frequency 카운터 업데이트

### Two-Stage Alternating RL (GRPO)

| Stage | Trainable | Frozen | Reward |
|---|---|---|---|
| 1 | Executor | Planner | 0.7·correct + 0.2·tool + 0.1·format |
| 2 | Planner | Executor | 0.7·correct(final) + 0.2·correct(intermediate) + 0.05·reflect + 0.05·format |

`reflect` reward는 "필요할 때만 reflect"를 유도: 첫 응답 맞고 reflect 안하면 +1, 첫 응답 틀리고 reflect 발동하면 +1, 그 외 0. 무분별한 reflection을 패널티.

**Token loss masking** `I(y_{i,t})`: tool/Planner가 생성한 token은 Executor 학습에서 제외, vice versa.

### Test-Time Learning

```
Batch arrives → Planner generates G rollout plans →
  Executor runs each → Judger evaluates →
    success set: 최단 trajectory → workflow 압축 → non-parametric memory
    fail set: 랜덤 1개 → workflow 압축 → non-parametric memory
  All rollouts → reward → GRPO advantage → Planner parameter update
  Pair (best_success, random_fail) → Meta Plan Memory
Next batch → Router uses Meta Plan Memory to select best plan
```

**핵심**: parameter update와 memory extraction이 **동시 진행**. cache miss 없이 streaming 가능한 online paradigm.

### Reviewer-Area Chair (Unsupervised)

| Reviewer | 역할 | Importance |
|---|---|---|
| R_L (Logic) | reasoning chain 평가 — 단계 간 인과 관계 | 0.5 |
| R_C (Credibility) | retrieved content 이해도 + hallucination 검출 | 0.3 |
| R_V (Validity) | 응답 완전성 + 완료 상태 | 0.2 |
| Area Chair | 세 리뷰의 structured JSON 종합 → "A"(correct) / "B"(incorrect) | — |

전체 평균이 아닌 **fatal flaw 우선** 메타 결정. 한 reviewer라도 critical issue 발견 시 reject 가능.

## 결과 (Results)

### Multimodal (Table 3)

| Model | FVQA-test | LiveVQA | MMSearch | In-house 1 |
|---|---|---|---|---|
| GPT-5.4 (direct) | 50.8 | 21.5 | 44.4 | 45.1 |
| Gemini-3-Flash (direct) | 69.3 | 26.0 | 69.0 | 52.5 |
| MMSearch-R1 (7B) | 58.0 | 28.3 | 43.9 | 13.6 |
| Memento (prev memory SOTA) | 66.3 | 36.7 | 61.4 | 22.7 |
| **MIA (Ours, 7B Executor)** | **69.6** | **43.1** | 62.6 | 31.8 |
| Unsupervised MIA | 65.1 | 40.1 | 60.2 | 29.8 |

In-house 1(과학 도메인 QA, 295개) · In-house 2(news multi-hop, 505개): 도메인 특화 dataset에서 baseline 대비 격차가 더 크게 벌어짐 (In-house 1: Memento 22.7 → MIA 31.8, +9.1p).

### Text-only (Table 4)

| Model | SimpleQA | 2Wiki | HotpotQA | GAIA |
|---|---|---|---|---|
| Memento | 42.4 | 64.2 | 55.2 | 22.3 |
| **MIA** | **47.7** | **71.8** | **63.5** | **31.1** |
| Unsupervised MIA | 46.6 | 71.6 | 61.7 | 30.1 |

GAIA(general AI assistant 벤치마크)에서 **+8.8p**는 대형 격차. Unsupervised MIA가 거의 supervised에 수렴.

### Closed-Source Generalization (Figure 8)

Planner만 학습한 채로 GPT-5.4·Gemini-3-Flash·Claude-Sonnet-4.6를 Executor로 swap:
- GPT-5.4 +8.9 LiveVQA / +6.4 HotpotQA
- Gemini-3-Flash +3.1 / +2.6
- Claude-Sonnet-4.6 +1.8 / +1.7

**Improvement margin이 base 능력에 반비례** → MIA의 메모리·계획 보완이 약한 모델에 더 큰 효용.

### Ablation (Table 5·6) — 핵심 인사이트

| Configuration | Multimodal avg | Text-only avg |
|---|---|---|
| Base (No Memory) | baseline | baseline |
| Only Memory (Executor에 직접 inject) | **-0.4** | -0.5 |
| Only Plan | +2.5 | +4.3 |
| Memory for Planner | +3.5 | +4.15 |
| + Reflect | +3.93 | +7.43 |
| Trained Planner | +6.3 | +9.2 |
| + TTL (full MIA) | **+8.94** | **+12.38** |

> **Critical finding**: "Only Memory"로 메모리를 Executor에 직접 주입하면 **오히려 성능 하락**. 메모리는 Executor의 prompt를 늘리지 말고 **Planner의 contextual prior**로만 써야 한다. 이는 RAG/Mem0/A-Mem이 No Memory baseline보다도 떨어지는 이유를 설명한다.

### Self-Evolution (Table 7, Unsupervised, 3 epochs)

HotpotQA: 51.0 → 61.7 → 63.1 → 63.2  
LiveVQA: 33.0 → 40.1 → 41.4 → 41.8

같은 dataset 반복 노출에도 monotonic 향상 → 누적 학습 검증. epoch-3에서 향상 둔화 → saturation 신호.

## 의미와 위치 (Significance)

**메모리 종속 deep research의 새 baseline**. 기존 long-context memory family(RAG·Mem0·A-Mem)의 한계가 실증적으로 드러나면서, **메모리는 정보 보관소가 아니라 reasoning 가이드**라는 패러다임이 명확해졌다. MIA가 보여준 핵심 통찰:

1. **메모리는 Executor가 아닌 Planner에 주입한다** (Only Memory ablation의 -0.4 결과)
2. **압축이 곧 품질이다** (verbose trajectory → structured workflow + image caption)
3. **success만이 아니라 fail trajectory도 명시적으로 활용한다** (negative constraint as contrastive prior)
4. **메모리 폭발은 parametric 변환으로 해결한다** (Planner retraining + buffer clearing)
5. **추론과 학습의 분리는 인위적이다** (TTL의 online paradigm)

[[applications/garrytan-gbrain|GBrain]]·[[applications/liu-2026-rag-llm-wiki-or-gbrain|Liu의 3-축 분류]]의 "agent memory" 논의에 정량적·구조적 답안을 제시한다는 점에서 중요.

## 관련 페이지 (Related Pages)

- [[applications/garrytan-gbrain|GBrain (Garry Tan)]] — markdown-first agent memory의 실용/엔지니어링 관점. MIA가 RL-trained Planner로 자동화한 것을 GBrain은 git markdown + skill pack의 수동 큐레이션으로 푼다. 두 시스템 모두 "compression > retrieval"이라는 동일 thesis
- [[applications/liu-2026-rag-llm-wiki-or-gbrain|RAG, LLM Wiki, or GBrain? (Liu)]] — retrieve/compile/act 3-축. MIA는 **retrieve+act**를 동시에 다루면서 RL로 compile까지 internalize. Liu가 예언한 "single knowledge OS" 방향
- [[database/li-2026-beyond-semantic-similarity-rethinking-retrieval|DCI (Direct Corpus Interaction)]] — embedding/index 없이 agent가 grep으로 직접 검색. MIA는 hybrid retrieval(sim + value + freq)를 쓰지만 두 논문 모두 "단순 semantic similarity는 부족하다"는 입장 공유
- [[database/zhang-2026-leanrag-knowledge-graph-based-generation|LeanRAG]] — hierarchical KG + LCA retrieval. MIA의 workflow 압축과 비슷하게 "abstract level"을 만드는 발상, 단 LeanRAG는 그래프 구조에, MIA는 episodic trajectory 압축에 집중
- [[overviews/gbrain-ecosystem-overview|GBrain 생태계 overview]] — 산업계의 markdown-first agent memory와 학계의 RL-trained memory가 어떻게 수렴하는지 비교할 때 함께 참조
- [[overviews/lightrag-family-graph-rag-overview|LightRAG family]] — KG 기반 memory 계보. MIA는 KG 대신 trajectory 압축을 선택했다는 점에서 대조군
