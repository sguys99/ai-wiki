---
title: "Recursive Language Models"
type: paper
year: 2026
category: agents
raw_path: /Users/kmyu/Desktop/project/ai-wiki/raw/papers/zhang-2026-recursive-language-models.pdf
raw_filename: "zhang-2026-recursive-language-models.pdf"
source_collection: external
tags: [long-context, inference-time-scaling, repl, recursive-sub-calls, agents, llm-scaffold, gpt-5, qwen3-coder, code-act, claude-code, oolong, browsecomp, fine-tuning, post-training, mit-csail]
authors: "Alex L. Zhang, Tim Kraska, Omar Khattab"
arxiv_id: "2512.24601"
figures:
  - id: fig01
    file: assets/zhang-2026-recursive-language-models/fig01.png
    raw: raw/papers/zhang-2026-recursive-language-models-figures/fig01.png
    caption: "Figure 1 — GPT-5 vs RLM(GPT-5, depth=1) 길이·복잡도 스케일링 (S-NIAH/OOLONG/OOLONG-Pairs, 2^13~2^20 토큰)"
    page: 1
    strategy: page-region
    curated: false
  - id: fig02
    file: assets/zhang-2026-recursive-language-models/fig02.png
    raw: raw/papers/zhang-2026-recursive-language-models-figures/fig02.png
    caption: "Figure 2 — RLM 전체 아키텍처 다이어그램 (REPL 환경 E + 재귀 sub-LM 호출)"
    page: 2
    strategy: page-region
    curated: false
  - id: fig08
    file: assets/zhang-2026-recursive-language-models/fig08.png
    raw: raw/papers/zhang-2026-recursive-language-models-figures/fig08.png
    caption: "Figure 3 — (a) RLM-Qwen3-8B 파인튜닝 결과 (4개 벤치마크), (b) MRCRv2 길이 일반화 (64k 2-needle 학습 → 1M 8-needle 평가)"
    page: 8
    strategy: page-region
    curated: false
  - id: fig09
    file: assets/zhang-2026-recursive-language-models/fig09.png
    raw: raw/papers/zhang-2026-recursive-language-models-figures/fig09.png
    caption: "Figure 4 — (a) OOLONG에서 RLM(GPT-5)의 첫 decomposition 시도 분포, (b) RLM 트래젝토리의 syntax error 비율"
    page: 8
    strategy: page-region
    curated: false
  - id: fig12
    file: assets/zhang-2026-recursive-language-models/fig12.png
    raw: raw/papers/zhang-2026-recursive-language-models-figures/fig12.png
    caption: "Figure 6 — 파인튜닝된 RLM-Qwen3-8B의 runtime 효율 (3~9.6× 가속)"
    page: 17
    strategy: page-region
    curated: false
  - id: fig13
    file: assets/zhang-2026-recursive-language-models/fig13.png
    raw: raw/papers/zhang-2026-recursive-language-models-figures/fig13.png
    caption: "Figure 7 — BrowseComp-Plus 문서 수에 따른 RLM·base·CodeAct·ReAct 성능·비용 (10~1000 docs)"
    page: 30
    strategy: page-region
    curated: false
  - id: fig14
    file: assets/zhang-2026-recursive-language-models/fig14.png
    raw: raw/papers/zhang-2026-recursive-language-models-figures/fig14.png
    caption: "Figure 8 — RLM 트래젝토리의 3가지 공통 패턴 (regex 필터, 재귀 sub-call decomposition, output stitching)"
    page: 31
    strategy: page-region
    curated: false
  - id: fig15
    file: assets/zhang-2026-recursive-language-models/fig15.png
    raw: raw/papers/zhang-2026-recursive-language-models-figures/fig15.png
    caption: "Figure 9 — RLM(depth=1) vs 다른 baseline의 task-level win/tie/loss 비교"
    page: 40
    strategy: page-region
    curated: false
  - id: fig16
    file: assets/zhang-2026-recursive-language-models/fig16.png
    raw: raw/papers/zhang-2026-recursive-language-models-figures/fig16.png
    caption: "Figure 10 — task별 sub-call 횟수 (correct vs incorrect, model별)"
    page: 40
    strategy: page-region
    curated: false
---

## 한 줄 요약 (One-line Summary)

MIT CSAIL이 2026-05-11 arXiv에 공개한 **Recursive Language Models (RLM)** 추론 패러다임. 임의 길이 prompt를 LLM 컨텍스트 윈도우에 직접 넣지 않고 **외부 환경(REPL)의 변수**로 offload한 뒤, root LLM이 코드를 생성해 prompt를 **symbolically 탐색·분할·재귀 sub-LM 호출**한다. GPT-5·Qwen3-Coder-480B 기준 1M~10M+ 토큰 입력을 처리하며 4개 long-context 벤치마크(S-NIAH·BrowseComp+·OOLONG·OOLONG-Pairs)에서 base LM 대비 최대 2배, Claude Code/OpenCode/compaction agent 대비 평균 13~130% 우위. 1,000 trajectory distillation으로 학습한 RLM-Qwen3-8B는 base Qwen3-8B 대비 +28% (median) 향상, 일부 task에서 vanilla GPT-5에 근접한다.

## 1. 자료 정보 (Document Information)

- **저자**: Alex L. Zhang, Tim Kraska, Omar Khattab (모두 MIT CSAIL). Correspondence: altzhang@mit.edu, okhattab@mit.edu.
- **arXiv**: 2512.24601v3, 2026-05-11 (cs.AI). Preprint.
- **공개 코드**: https://github.com/alexzhang13/rlm
- **연구 라인**: Khattab 라인의 long-context 처리 후속작 — Baleen(NeurIPS 2021, condensed retrieval), DSPy, compaction의 한계를 정면 비판한다. Kraska는 system/DB 배경(MIT DB lab).
- **포지셔닝**: "context window를 늘리는 architecture 작업"(Press et al. 2022, Gu et al. S4 2022, Munkhdalai et al. Infini-attention 2024)과 직교하는 **inference-time scaffold** 라인. compaction(OpenAI Codex CLI, OpenHands, Claude Code 압축)과 sub-agent delegation(THREAD, ReDel, Context Folding, AgentFold)을 동시에 능가하는 표현력을 주장한다.

## 2. 주요 기여 (Key Contributions)

1. **Recursive Language Models (RLM) 패러다임 정의 (Algorithm 1)**. 임의 길이 prompt P를 REPL 환경 E의 변수로 저장하고, root LM M에게는 P의 **메타데이터(길이·prefix)만** 보여준 채 코드 생성으로 P를 조작·sub-LLM 호출하게 한다. (1) prompt를 컨텍스트에 직접 넣지 않음 — symbolic handle, (2) `Finish` action 없음 — 최종 출력도 REPL 변수에서 가져옴 (출력 길이 무한대), (3) **symbolic recursion** — 코드 안에서 Ω(|P|) 또는 Ω(|P|²)개의 sub-LM 호출을 프로그램적으로 launch. Algorithm 2(잘못된 설계)와 정면 대조해 3개 design flaw를 명시한다 (Figure 2).
2. **4개 long-context 벤치마크에서 RLM의 우위 실증 (Table 1)**. S-NIAH(50 tasks, O(1) 검색), BrowseComp-Plus 1K docs(150 tasks, multi-hop QA over 6~11M 토큰), OOLONG trec_coarse(50 tasks, O(N) semantic aggregation), OOLONG-Pairs(20 tasks, O(N²) pairwise — 신규 제안). RLM(GPT-5, depth=1)이 base GPT-5 대비 OOLONG +28%, OOLONG-Pairs +57.9p (0.1% → 58%) 등 정보-밀집 task에서 격차가 폭발한다.
3. **Compaction·Coding agent 대비 우위 정량화**. GPT-5 기준 median으로 compaction 대비 +26%, CodeAct(+sub-calls) 대비 +130%, Claude Code(+context offloading) 대비 +13%. 비용은 base LM과 동급(median은 RLM이 더 싸고, mean은 outlier 트래젝토리 때문에 약간 높다).
4. **Context length × task complexity scaling 분석 (Figure 1)**. 입력 길이 2^13~2^20 토큰에서 GPT-5는 OOLONG/OOLONG-Pairs에서 빠르게 0%로 붕괴하지만, RLM은 1M 토큰까지 50% 이상 유지한다. base 모델의 effective context window가 task complexity에 의존한다는 가설을 검증한다.
5. **LongCoT-mini reasoning task로 확장 (Table 2)**. long-context와 무관한 multi-step reasoning benchmark에서도 RLM(GPT-5.2, depth=1)이 base 38.7% → 50.6%, decomposition hint 추가 시 65.6% (특히 LOGIC 99%·CHESS 99%). RLM을 reasoning graph traversal에 쓸 수 있음을 시사한다.
6. **RLM-Qwen3-8B 사후학습 (Appendix A)**. Qwen3-Coder-480B-A35B의 RLM trajectory 1,000개를 LongBenchPro에서 수집·필터링한 뒤 Qwen3-8B에 distillation. 4개 평가 벤치마크에서 base Qwen3-8B 대비 median +28.3%, runtime 3~9.6× 가속. prime-rl + 48 H100 hours. **RLM 학습은 root model의 REPL 조작·sub-call 결정 능력 학습으로 환원** → 작은 모델로도 빠르게 가능하다는 핵심 인사이트.
7. **MRCRv2 길이 일반화 실험 (Figure 3b)**. Qwen3-4B-Instruct-0527을 64k/2-needle split에서 RLVR로 150 step만 학습 → 1M/8-needle split으로 일반화. Gemini 3.1 Pro(1M context frontier) 수준에 근접한다.
8. **OOLONG-Pairs 신규 벤치마크 (Appendix D.1)**. trec_coarse 기반 20개 task. 단순 count(set 포함-배제 원리)로 푸는 게 아니라 모든 pair를 명시적으로 출력해야 한다 → 정보-밀집 + long-output이 동시에 요구되는 quadratic complexity task. F1 평가.
9. **Decomposition 분석 (Figure 4)**. RLM의 첫 task decomposition 시도가 전체 성능에 결정적이다. in-context decomposition 예시 1개만 추가해도 OOLONG 성능·decomposition 정확도가 동시에 오른다(예시가 task와 무관해도 효과). Qwen3-Coder는 GPT-5보다 syntax error가 압도적으로 많고(특히 correct rollout에서도), 그래서 depth 증가가 오히려 성능을 깎는다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 RLM의 형식적 정의 (Algorithm 1)

base neural LM M의 최대 컨텍스트 K가 주어졌을 때, RLM은 M 위의 inference-time scaffold다.

- 입력: 임의 길이 prompt P ∈ Σ*
- 출력: 응답 Y ∈ Σ*
- 목표: **unbounded input** (|P| ≫ K), **unbounded output**, **unbounded semantic horizon** (Ω(|P|) 또는 Ω(|P|²) semantic work)

```
state ← InitREPL(prompt=P)              # P가 변수로 저장됨
state ← AddFunction(state, sub_RLM_M)   # sub-RLM 호출 함수 주입
hist ← [Metadata(state)]                # P 길이·prefix 등 상수 크기 메타만
while True:
    code ← LLM_M(hist)
    (state, stdout) ← REPL(state, code)
    hist ← hist ∥ code ∥ Metadata(stdout)   # stdout도 메타만 누적
    if state[Final] is set:
        return state[Final]
```

핵심: `hist`에 **stdout의 메타데이터만** 붙는다 → K/c개의 root iteration이 최대치(c는 turn당 토큰 trim), 각 iteration이 임의 개수 sub-call을 launch.

### 3.2 잘못된 설계(Algorithm 2)와의 대조 — RLM의 3가지 design choice

| Algorithm 2의 Flaw | RLM의 해결 |
|---|---|
| **Flaw #1**: prompt P를 history에 직접 넣음 → K로 제한 + compaction 의존 | P를 REPL 변수로 offload, root LM은 메타만 봄 |
| **Flaw #2**: `Finish(value)` action으로 출력 → 출력도 K로 제한 | `Final` 변수를 REPL에서 가져옴, 출력 무한대 |
| **Flaw #3**: code action과 sub-LLM action이 분리됨 → sub-LLM을 코드 안에서 호출 불가, autoregressive로만 verbalize | sub-LLM이 Python 모듈로 노출 → loop·comprehension 안에서 Ω(|P|²) 호출 가능 |

### 3.3 RLM 구현

- **Python REPL**: 모든 도구(sub-LM, sub-RLM)가 모듈로 노출
- **초기 prompt**: REPL 변수 `context`로 저장
- **출력 truncation**: stdout이 컨텍스트 overflow 방지
- **Final 결정**: `FINAL(answer)` 또는 `FINAL_VAR(variable_name)` 태그로 종료
- **Recursion depth**: 0(no sub-calls) / 1(sub-LM 호출만) / >1(sub-RLM 호출 — sub-call 안에서 또 sub-call)
- **Notation**: `RLM(GPT-5, depth=2)` 식 표기, 기본은 depth=1

### 3.4 시스템 프롬프트 (Appendix C)

GPT-5용 프롬프트: REPL 환경 안내 + `llm_query` 함수 사용법 + 3개 in-context decomposition 예시(책 챕터 순회, 다중 문서 chunking, Markdown 헤더 분할). Qwen3-Coder용은 "sub-call을 너무 많이 쓰지 말라"는 경고 1줄을 추가한다(없으면 수천 개 sub-call로 폭발). Qwen3-8B용은 32k 컨텍스트에 맞춰 chunk size를 1/10로 축소한다.

### 3.5 RLM-Qwen3-8B 학습 레시피 (Appendix A)

1. **Trajectory 수집**: RLM(Qwen3-Coder-480B-A35B)을 LongBenchPro 750 영어 task에 적용 → 2,250 candidate trajectories
2. **필터링**: 점수 0 제거 + 1턴 only 제거 → 1,072개
3. **턴 분할**: 각 root iteration을 별도 SFT sample로 (input=full history, output=root LM 출력)
4. **추가 필터**: Qwen3-8B 컨텍스트(100k char) 초과 제거 + RLM template 오류 패치 (FINAL/FINAL_VAR 16%·13% 오류)
5. **학습**: prime-rl, batch 64, 300 steps, 48 H100 hours
6. **MRCRv2 RL 실험**: Qwen3-4B-Instruct-0527을 32k-64k/2-needle에서 RLVR 150 step, batch 128, 4 rollout/example. max output 4096 tok/turn, max RLM iter 20. 50 step마다 1M/8-needle 평가.

핵심 가설: "RLM root LM은 결국 reasoning model이고, leaf sub-call은 일반 LLM 요청이다 → root만 잘 학습해도 충분하다".

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 Table 1 — 메인 결과 (4개 task, GPT-5 / Qwen3-Coder-480B / Claude Opus 4.1)

| Model | CodeQA (23K-4.2M) | BrowseComp+ (6M-11M) | OOLONG (131K) | OOLONG-Pairs (32K) |
|---|---|---|---|---|
| **GPT-5 base** | 24.0* | 0.0* (over limit) | 44.0 | 0.1 |
| CodeAct (+BM25) | 22.0* | 51.0 | 38.0 | 24.7 |
| Compaction agent | 58.0 | 70.5 | 46.0 | 0.1 |
| OpenCode (+offloading) | 64.0 | 94.0 | 52.0 | 4.8 |
| Claude Code (+offloading) | 62.0 | 84.0 | 48.0 | 6.5 |
| **RLM(GPT-5, depth=0)** | 58.0 | 88.0 | 36.0 | 43.9 |
| **RLM(GPT-5, depth=1)** | 62.0 | 91.3 | 56.0 | **58.0** |
| **RLM(GPT-5, depth=2)** | 66.0 | 92.0 | 56.5 | 65.5 |
| **RLM(GPT-5, depth=3)** | 58.0 | 92.0 | **58.0** | **76.0** |
| **Qwen3-Coder base** | 20.0* | 0.0* | 36.0 | 0.1 |
| RLM(Qwen3-Coder, d=1) | 56.0 | 44.7 | 48.0 | 23.1 |
| RLM(Qwen3-Coder, d=3) | 44.0 | 68.7 | 32.0 | 21.1 |

- `*`표시는 컨텍스트 한계 초과 trajectory 포함.
- **OOLONG-Pairs에서 GPT-5/Qwen3-Coder base는 0.1%**(quadratic complexity에서 catastrophic failure) → RLM이 58%/23%로 견인.
- **GPT-5는 depth↑에 따라 단조 향상**, Qwen3-Coder는 depth=2~3에서 syntax error 전파로 성능 저하 (Figure 4b 참조).

### 4.2 Figure 1 — Length × Complexity scaling

- S-NIAH (O(1) 검색): GPT-5도 1M까지 100% 유지, RLM도 100% 유지
- OOLONG (O(N)): GPT-5는 8K에서 80% → 262K에서 0%, RLM은 1M까지 50%+
- OOLONG-Pairs (O(N²)): GPT-5는 16K부터 5% 미만, RLM은 1M까지 50%+
- 빨간 영역(262K+): GPT-5 컨텍스트 한계 초과, RLM은 정상 처리

### 4.3 Cost analysis (Figure 11 quartiles)

- median에서 RLM이 base LM보다 cheaper (특히 GPT-5)
- 95th percentile에서 outlier로 sharp 증가 — RLM이 답을 못 찾고 헤매는 case
- BrowseComp+ 6-11M 토큰을 GPT-5-mini로 ingest 시 linearly extrapolate된 비용 $1.50-$2.75 vs RLM(GPT-5) $0.99 → RLM이 retrieval/compaction 대비 29% 우위

### 4.4 LongCoT-mini reasoning (Table 2)

LongCoT-mini는 long-horizon reasoning benchmark(MATH·CHEM·CS·LOGIC·CHESS). 단순 thinking-harder로는 0% 근처에 머문다.

| Model | Overall | MATH | CHEM | CS | LOGIC | CHESS |
|---|---|---|---|---|---|---|
| GPT-5.2 base | 38.7 | 26.0 | 37.0 | 40.4 | 53.6 | 36.6 |
| RLM(GPT-5.2, d=1) | 50.6 | 5.6 | 50.0 | 11.0 | 86.7 | 93.0 |
| RLM(GPT-5.2, d=1) + decomp hints | **65.6** | 32.0 | 52.0 | 46.0 | **99.0** | **99.0** |

- decomposition hint 없이는 MATH·CS에서 base보다 떨어진다(분해 방향을 못 잡음)
- GPT-5.2 base에 decomp hint만 줘도 28.6%로 오히려 떨어진다(Table 3) → RLM의 REPL/isolation이 hint를 실행 가능하게 만드는 핵심
- decomp hint는 `<env_tips>` 형식의 긴 메타 가이드 ("Orchestrate; don't solve. Memoize verified answers in dict. Verify before propagate. Dispatch ALL ready nodes in ONE llm_batch.")

### 4.5 RLM-Qwen3-8B 결과 (Figure 3a)

| Benchmark | Qwen3-8B (RLM) | RLM-Qwen3-8B (post-trained) |
|---|---|---|
| CodeQA | 4.00 | 26.00 |
| BrowseComp+ | 2.00 | 14.00 |
| OOLONG | 0.00 | 24.00 |
| OOLONG-Pairs | 0.07 (1/15) | 4.26 |
| (참고: GPT-5 vanilla) | — | 32.00 (CodeQA), 32.04 (OOLONG) 수준에 근접 |

runtime은 3.2× ~ 9.6× 빨라진다 (Figure 6).

### 4.6 RLM 트래젝토리 분석 (Figure 8, Appendix E)

RLM이 보이는 3가지 공통 패턴:
- (a) **regex 코드로 context probing**: 키워드("dinengdeng", "festival", "beauty pageant") 검색 + window snippet 추출
- (b) **재귀 sub-LM 호출로 decomposition**: 6개 카테고리(numeric/entity/location/...) 분류를 sub-LM에 위임, root는 결과만 보관
- (c) **sub-LM output stitching**: long-output task에서 sub-LM 결과를 dict로 모아 최종 `FINAL_VAR` 변수를 구성 → 단일 LM 컨텍스트로는 불가능한 출력 길이를 생성

### 4.7 Sub-call 사용량 차이 (Figure 10)

| Task | GPT-5 (correct/incorrect) | Qwen3-Coder | Qwen3-8B | RLM-Qwen3-8B |
|---|---|---|---|---|
| CodeQA | 2 / 2 | 3 / 3 | 3 / 4 | 1 / 14 |
| BrowseComp+ | 55 / 38 | 5 / 5 | 9 / 9 | 4 / 2 |
| OOLONG | 30 / 25 | 510 / 90 | 100 / 240 | 220 / 130 |
| OOLONG-Pairs | 50 / 175 | 165 / 60 | 30 / 20 | 0 / 90 |

- Qwen3-Coder는 OOLONG에서 correct rollout 510회 sub-call(GPT-5의 17×) — "everything 호출" 경향
- 대체로 incorrect rollout이 더 많은 sub-call을 쓴다 → 헤맴

## 5. 한계와 향후 과제 (Limitations and Future Work)

### 5.1 명시된 한계

- **평가 부족**: 자연스러운 long-context task로 확장하지 못했고, guardrail mechanism도 미탐구
- **복잡도 증가**: LLM 위에 새 추론 layer를 더하면서 sub-call cost explosion 가능성. 현 구현은 모든 sub-call이 **blocking/sequential** → asynchrony + sandboxed REPL 필요
- **FINAL tag brittleness**: structured output처럼 모델이 plan을 FINAL에 그대로 넣는 등 이상 행동. trained native RLM이 해결 방향

### 5.2 Negative results (Appendix B)

- **단일 system prompt를 모든 모델에 쓰면 망함**: Qwen3-Coder 전용 1줄 경고 필수
- **코딩 능력 부족 모델은 RLM에 부적합**: Qwen3-8B base가 어려워한 이유
- **출력 토큰 한도 작은 thinking 모델 부적합**: Qwen3-235B-A22B는 thinking이 max output 초과로 자주 실패
- **async 부재 → 느림**: 모든 sub-call 순차 실행
- **FINAL vs FINAL_VAR 혼동**: 구조적 출력처럼 모델이 헷갈림

### 5.3 향후 방향

- **Native RLM 학습**: 본 논문은 distillation 1,000 sample · 8B 모델만 다뤘다. 더 크게 + on-policy RL로 확장하면 "reasoning model의 새 scale axis"가 된다
- **STaR/Quiet-STaR 스타일 self-bootstrap**: RLM trajectory를 reasoning trace로 재해석

## 6. 관련 연구 (Related Work)

### 6.1 Long-Context LM Systems (두 직교 방향)

| 방향 | 대표 작업 | RLM과의 관계 |
|---|---|---|
| **Architecture/retraining**: 모델 자체를 long-context로 | ALiBi (Press 2022), S4 (Gu 2022), Infini-attention (Munkhdalai 2024) | 직교 — RLM은 scaffold |
| **Lossy compaction**: 컨텍스트 압축 | ReSum (Wu 2025), Walking down the memory maze (Chen 2023) | RLM이 정면 비교 — 정보 손실 문제 |
| **Memory hierarchy**: 명시적 메모리 계층 | MemGPT (Packer 2024), Mem0 (Chhikara 2025), G-memory (Zhang 2025) | RLM은 implicit — LM이 직접 관리 |

### 6.2 Task Decomposition through sub-LM calls

| 작업 | 차별점 |
|---|---|
| ViperGPT (Surís 2023, ICCV) | Python program 생성 + visual reasoning, 단일 step |
| THREAD (Schroeder 2025) | Recursive spawning, autoregressive verbalize |
| ReDel (Zhu 2024) | LLM-powered recursive multi-agent toolkit |
| Context Folding (Sun 2025) | Long-horizon agent의 컨텍스트 폴딩 |
| AgentFold (Ye 2025) | Long-horizon web agent, proactive context mgmt |
| DisCIPL (Grand 2025) | Self-steering LM, single-step program, no recovery |
| **RLM (this work)** | **prompt를 환경 변수로 + REPL 실행 피드백 기반 iterative refinement** |

### 6.3 Reasoning 라인과의 접점

- OpenAI o1 (2024), DeepSeek-R1 (2025) — RLM trajectory를 "reasoning"의 한 형태로 해석
- STaR (Zelikman 2022), Quiet-STaR (Zelikman 2024) — bootstrap 방법론

## 7. 용어집 (Glossary)

- **RLM (Recursive Language Model)**: prompt를 REPL 환경 변수로 두고 LLM이 코드로 조작·재귀 sub-call 하는 inference paradigm
- **REPL (Read-Eval-Print Loop)**: Python 대화형 실행 환경. RLM의 외부 환경 E의 구체화
- **Symbolic handle**: prompt를 직접 컨텍스트에 넣지 않고 변수명으로만 참조하게 하는 설계
- **Symbolic recursion**: 코드 안에서 sub-LM을 프로그램적으로(loop/comprehension) 호출하는 것. 자연어로 "verbalized" sub-call과 대조
- **Context rot** (Hong 2025): 입력이 길어질수록 LLM 성능이 단조 저하하는 현상
- **Effective context window** (Hsieh RULER 2024, Goldman 2025): task complexity에 따라 달라지는 실질적 한계
- **Compaction**: 컨텍스트 한도 초과 시 요약·truncation으로 압축. ReSum·OpenHands·Claude Code의 기본 전략
- **CodeAct** (Wang 2024): ReAct loop 안에서 코드 실행 action을 가진 agent. RLM과 가장 가까운 비교 baseline
- **OOLONG-Pairs**: 본 논문 제안. OOLONG의 quadratic 변형 — pair 출력 강제
- **S-NIAH**: RULER의 single needle-in-the-haystack split
- **BrowseComp-Plus** (Chen 2025): DeepResearch 멀티홉 QA + 1000 문서 코퍼스
- **LongCoT-mini** (Motwani 2026): long-horizon CoT reasoning benchmark
- **FINAL / FINAL_VAR**: RLM의 종료 태그. 직접 답 / REPL 변수 참조
- **Recursion depth**: 0(no sub-call) / 1(sub-LM only) / >1(sub-RLM, sub-call이 또 sub-call)

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 1 | Figure 1 - GPT-5 vs RLM length × complexity scaling | page-region | ★★★ wiki 권장 (headline) |
| fig02 | 2 | Figure 2 - RLM 아키텍처 다이어그램 | page-region | ★★★ wiki 권장 (architecture) |
| fig08 | 8 | Figure 3 - RLM-Qwen3-8B 파인튜닝 + MRCRv2 length generalization | page-region | ★★ wiki 권장 (training) |
| fig09 | 8 | Figure 4 - decomposition 분포 + syntax error | page-region | ★ wiki 권장 (analysis) |
| fig12 | 17 | Figure 6 - 학습된 RLM runtime 가속 | page-region | (선택) |
| fig13 | 30 | Figure 7 - BrowseComp+ doc count scaling | page-region | ★★ wiki 권장 (scaling) |
| fig14 | 31 | Figure 8 - RLM 트래젝토리 3패턴 (regex / sub-call / stitching) | page-region | ★★★ wiki 권장 (behavior) |
| fig15 | 40 | Figure 9 - RLM vs baseline task-level win/tie/loss | page-region | (선택) |
| fig16 | 40 | Figure 10 - sub-call 횟수 모델별 | page-region | ★ wiki 권장 (analysis) |
| fig10 | 16 | Figure 5 - LongBenchPro RLM trajectory 통계 (필터링 전후) | page-region | (선택) |

> 참고: pymupdf 자동 추출이 본문 내 "Figure N" **참조 문장**도 페이지째 캡처해 fig03·04·05·06·07·11·17·24는 실제 figure가 아닌 본문 페이지(중복)다. 큐레이션 후보에서 제외.
