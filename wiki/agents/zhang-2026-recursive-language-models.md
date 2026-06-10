---
title: "Recursive Language Models (RLM)"
type: paper
year: 2026
category: agents
raw_path: /Users/kmyu/Desktop/project/ai-wiki/raw/papers/zhang-2026-recursive-language-models.pdf
raw_filename: "zhang-2026-recursive-language-models.pdf"
source: zhang-2026-recursive-language-models.md
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
    curated: true
  - id: fig02
    file: assets/zhang-2026-recursive-language-models/fig02.png
    raw: raw/papers/zhang-2026-recursive-language-models-figures/fig02.png
    caption: "Figure 2 — RLM 전체 아키텍처 다이어그램 (REPL 환경 E + 재귀 sub-LM 호출)"
    page: 2
    strategy: page-region
    curated: true
  - id: fig08
    file: assets/zhang-2026-recursive-language-models/fig08.png
    raw: raw/papers/zhang-2026-recursive-language-models-figures/fig08.png
    caption: "Figure 3 — (a) RLM-Qwen3-8B 파인튜닝 결과, (b) MRCRv2 길이 일반화 (64k 2-needle 학습 → 1M 8-needle 평가)"
    page: 8
    strategy: page-region
    curated: true
  - id: fig09
    file: assets/zhang-2026-recursive-language-models/fig09.png
    raw: raw/papers/zhang-2026-recursive-language-models-figures/fig09.png
    caption: "Figure 4 — (a) OOLONG에서 RLM(GPT-5)의 첫 decomposition 시도 분포, (b) RLM 트래젝토리의 syntax error 비율"
    page: 8
    strategy: page-region
    curated: true
  - id: fig10
    file: assets/zhang-2026-recursive-language-models/fig10.png
    raw: raw/papers/zhang-2026-recursive-language-models-figures/fig10.png
    caption: "Figure 5 — LongBenchPro RLM trajectory 통계 (필터링 전후)"
    page: 16
    strategy: page-region
    curated: true
  - id: fig12
    file: assets/zhang-2026-recursive-language-models/fig12.png
    raw: raw/papers/zhang-2026-recursive-language-models-figures/fig12.png
    caption: "Figure 6 — 파인튜닝된 RLM-Qwen3-8B의 runtime 효율 (3~9.6× 가속)"
    page: 17
    strategy: page-region
    curated: true
  - id: fig13
    file: assets/zhang-2026-recursive-language-models/fig13.png
    raw: raw/papers/zhang-2026-recursive-language-models-figures/fig13.png
    caption: "Figure 7 — BrowseComp-Plus 문서 수에 따른 RLM·base·CodeAct·ReAct 성능·비용 (10~1000 docs)"
    page: 30
    strategy: page-region
    curated: true
  - id: fig14
    file: assets/zhang-2026-recursive-language-models/fig14.png
    raw: raw/papers/zhang-2026-recursive-language-models-figures/fig14.png
    caption: "Figure 8 — RLM 트래젝토리의 3가지 공통 패턴 (regex 필터, 재귀 sub-call decomposition, output stitching)"
    page: 31
    strategy: page-region
    curated: true
  - id: fig15
    file: assets/zhang-2026-recursive-language-models/fig15.png
    raw: raw/papers/zhang-2026-recursive-language-models-figures/fig15.png
    caption: "Figure 9 — RLM(depth=1) vs 다른 baseline의 task-level win/tie/loss 비교"
    page: 40
    strategy: page-region
    curated: true
  - id: fig16
    file: assets/zhang-2026-recursive-language-models/fig16.png
    raw: raw/papers/zhang-2026-recursive-language-models-figures/fig16.png
    caption: "Figure 10 — task별 sub-call 횟수 (correct vs incorrect, model별)"
    page: 40
    strategy: page-region
    curated: true
---

## 요약 (Summary)

MIT CSAIL의 Alex L. Zhang·Tim Kraska·Omar Khattab이 2026-05-11 arXiv에 공개한 **Recursive Language Models (RLM)** 추론 패러다임. 임의 길이의 prompt를 LLM 컨텍스트 윈도우에 직접 밀어 넣는 대신 **Python REPL 환경의 변수**로 offload하고, root LLM은 prompt의 메타데이터(길이·prefix)만 본 채 코드를 생성해 prompt를 symbolically 탐색·분할하거나 재귀 sub-LM을 호출한다. context window가 늘어나도 무너지지 않는 inference-time scaffold가 핵심.

![[assets/zhang-2026-recursive-language-models/fig01.png]]
*Figure 1: 동일한 GPT-5를 base로 썼을 때 입력 길이(2^13~2^20 토큰)와 task 복잡도(S-NIAH O(1) → OOLONG O(N) → OOLONG-Pairs O(N²))에 따라 base는 빠르게 0%로 무너지지만, RLM(GPT-5, depth=1)은 컨텍스트 한계(272K)를 넘은 1M 토큰까지 50%대를 유지한다 (Zhang 2026, p.1).*

핵심 비교 결과:
- **OOLONG-Pairs**(quadratic complexity, 페어 출력 강제)에서 base GPT-5·Qwen3-Coder는 모두 0.1%로 catastrophic failure — RLM(GPT-5, depth=3)은 76%, RLM(Qwen3-Coder, depth=1)도 23%.
- BrowseComp-Plus(6~11M 토큰, 1000 docs)에서 base GPT-5는 컨텍스트 초과로 0% — RLM(GPT-5, depth=1)이 91.3%, compaction agent 대비 +29%p.
- compaction(median +26%), CodeAct+sub-calls(+130%), Claude Code+context offloading(+13%)을 GPT-5 기준으로 동시에 능가하고, 비용은 base LM과 같은 자릿수.
- 1,000 trajectory distillation으로 학습한 **RLM-Qwen3-8B**가 base Qwen3-8B 대비 median +28.3%, 일부 task에서 vanilla GPT-5에 근접.

## 주요 기여 (Key Contributions)

1. **RLM 형식 정의 (Algorithm 1)**. prompt P를 REPL 변수로 두고, root LM은 P의 상수 크기 메타만 보면서 코드를 생성해 P를 조작하거나 sub-LM을 호출한다. `Final` 변수가 set되면 종료. 출력도 REPL 변수에서 가져오므로 출력 길이가 base LM의 컨텍스트에 묶이지 않는다.
2. **잘못된 설계와의 명시적 대조 (Algorithm 2)**. (1) prompt를 history에 직접 넣는 Flaw, (2) `Finish` action으로 출력하는 Flaw, (3) code와 sub-LLM action을 분리해 프로그램적 호출이 불가능한 Flaw. CodeAct·ReAct류 기존 scaffold가 모두 이 셋에 걸린다.
3. **벤치마크 4종에서 long-context 우위 실증**. S-NIAH(O(1) 검색), BrowseComp-Plus(multi-hop QA over 1K docs), OOLONG(O(N) semantic aggregation), 신규 OOLONG-Pairs(O(N²) pairwise enumeration). 정보 밀도가 높을수록 격차가 폭발.
4. **LongCoT-mini reasoning task로 확장**. long-context와 무관한 multi-step reasoning(MATH·CHEM·CS·LOGIC·CHESS)에서도 RLM(GPT-5.2, depth=1)이 base 38.7% → 50.6%, decomposition hint를 추가하면 65.6%까지 — LOGIC·CHESS는 99%.
5. **RLM-Qwen3-8B 사후학습 (1,000 trajectories, 48 H100 hours)**. Qwen3-Coder-480B-A35B trajectory를 distillation, 4개 평가에서 median +28.3%·runtime 3~9.6× 가속. "RLM root LM은 결국 reasoning model이므로 root만 잘 학습해도 충분하다"는 시사점.
6. **MRCRv2 길이 일반화**. Qwen3-4B-Instruct-0527을 64k/2-needle split에서 RLVR 150 step만 학습 → 1M/8-needle split으로 일반화 (Gemini 3.1 Pro 1M 수준 근접).

## 방법론 및 아키텍처 (Methodology and Architecture)

### RLM의 형식 정의

base neural LM M의 최대 컨텍스트 K가 주어졌을 때, RLM은 M 위의 inference-time scaffold다. 임의 길이 prompt P ∈ Σ\*을 받아 응답 Y ∈ Σ\*을 돌려주되, **unbounded input(|P| ≫ K)·unbounded output·Ω(|P|²) semantic horizon**을 목표로 한다.

![[assets/zhang-2026-recursive-language-models/fig02.png]]
*Figure 2: RLM은 prompt를 환경 E의 변수로 저장하고 (왼쪽 녹색 박스), 메타데이터만 root LM에 보여준다. LM은 `print(prompt[:100])`, `prompt.split("Chapter 2")` 같은 코드로 prompt를 탐색·분할하며, `llm_query("In Chapter 1, find...")`로 sub-RLM을 launch한다 (오른쪽 파란 박스). Final 변수에 답이 set되면 종료 (Zhang 2026, p.2).*

알고리즘은 6줄짜리 의사코드로 정리된다 (Algorithm 1).

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

핵심 절제점은 `hist`에 stdout의 **메타만** 붙는다. root iteration이 K/c 이내로 묶이지만, 각 iteration이 임의 개수의 sub-call을 launch할 수 있어 Ω(|P|²) 작업이 자연스럽게 수행된다.

### 잘못된 설계 (Algorithm 2)와의 3가지 design flaw

저자들은 RLM과 "비슷해 보이는" Algorithm 2를 나란히 제시하며 3개 design choice의 차이를 명시한다.

| Algorithm 2의 Flaw | RLM의 해결 |
|---|---|
| **Flaw #1** prompt P를 history에 직접 넣음 → K로 제한 + compaction 의존 | P를 REPL 변수로 offload, root LM은 메타만 봄 |
| **Flaw #2** `Finish(value)` action으로 출력 → 출력도 K로 제한 | `Final` 변수를 REPL에서 가져옴, 출력 무한대 |
| **Flaw #3** code action과 sub-LLM action이 분리됨 → sub-LLM을 코드 안에서 호출 불가, autoregressive로만 verbalize | sub-LLM이 Python 모듈로 노출 → loop·comprehension 안에서 Ω(|P|²) 호출 가능 |

이 세 가지가 CodeAct·ReAct·THREAD·Context Folding·AgentFold 같은 prior work가 RLM 수준의 표현력에 도달하지 못한 이유다.

### 구현 디테일

- **언어**: Python REPL. `llm_query(prompt)`가 sub-LM, `rlm_query(context, query)`가 sub-RLM (재귀 depth>1용).
- **종료 신호**: `FINAL(answer)` 또는 `FINAL_VAR(variable_name)`. 후자는 REPL 변수로 출력 → 컨텍스트 한계 초과 출력 가능.
- **recursion depth**: 0(sub-call 없음, REPL만) / 1(sub-LM만) / >1(sub-RLM, sub-call이 또 sub-call).
- **System prompt** (Appendix C): in-context decomposition 예시 3개(책 챕터 순회, 다중 문서 chunking, Markdown 헤더 분할)가 결정적. Qwen3-Coder는 "sub-call 너무 많이 쓰지 말라" 1줄을 추가하지 않으면 수천 개 호출로 폭발한다. Qwen3-8B는 32k 컨텍스트에 맞춰 chunk size를 1/10로 축소.

## 결과 (Results)

### Table 1: 4개 long-context task에서의 정량 비교

| Method | CodeQA<br>(23K-4.2M) | BrowseComp+<br>(6M-11M) | OOLONG<br>(131K) | OOLONG-Pairs<br>(32K) |
|---|---|---|---|---|
| GPT-5 base | 24.0\* | 0.0\* | 44.0 | 0.1 |
| CodeAct (+BM25) | 22.0\* | 51.0 | 38.0 | 24.7 |
| Compaction agent | 58.0 | 70.5 | 46.0 | 0.1 |
| OpenCode (+offloading) | 64.0 | 94.0 | 52.0 | 4.8 |
| Claude Code (+offloading) | 62.0 | 84.0 | 48.0 | 6.5 |
| **RLM(GPT-5, d=0)** | 58.0 | 88.0 | 36.0 | 43.9 |
| **RLM(GPT-5, d=1)** | 62.0 | 91.3 | 56.0 | 58.0 |
| **RLM(GPT-5, d=2)** | 66.0 | 92.0 | 56.5 | 65.5 |
| **RLM(GPT-5, d=3)** | 58.0 | 92.0 | 58.0 | **76.0** |
| Qwen3-Coder base | 20.0\* | 0.0\* | 36.0 | 0.1 |
| RLM(Qwen3-Coder, d=1) | 56.0 | 44.7 | 48.0 | 23.1 |
| RLM(Qwen3-Coder, d=3) | 44.0 | 68.7 | 32.0 | 21.1 |

\*: 컨텍스트 한계 초과 trajectory 포함. GPT-5는 depth↑에 따라 단조 향상하지만, Qwen3-Coder는 depth=2~3에서 syntax error 전파로 성능이 깎인다.

### BrowseComp-Plus에서 문서 수에 따른 스케일링

![[assets/zhang-2026-recursive-language-models/fig13.png]]
*Figure 7: 문서 수를 10 → 1000으로 늘리면 GPT-5 base·CodeAct·Pre-query BM25는 100 docs부터 모두 무너지지만, RLM(GPT-5)만 1000 docs에서 100%를 유지한다. 비용도 RLM이 log-linear로 완만하게 증가 (Zhang 2026, p.30).*

### LongCoT-mini reasoning (long-context와 무관한 multi-step task)

| Model | Overall | MATH | CHEM | CS | LOGIC | CHESS |
|---|---|---|---|---|---|---|
| GPT-5.2 base | 38.7 | 26.0 | 37.0 | 40.4 | 53.6 | 36.6 |
| RLM(GPT-5.2, d=1) | 50.6 | 5.6 | 50.0 | 11.0 | 86.7 | 93.0 |
| RLM + decomp hints | **65.6** | 32.0 | 52.0 | 46.0 | **99.0** | **99.0** |

decomposition hint를 GPT-5.2 base에 직접 주면 오히려 28.6%로 떨어진다(Table 3) — REPL/isolation이 hint를 실행 가능하게 만드는 핵심 매개체다.

### RLM-Qwen3-8B 사후학습

![[assets/zhang-2026-recursive-language-models/fig08.png]]
*Figure 3: (a) RLM-Qwen3-8B (post-trained, 빗금)는 base Qwen3-8B의 RLM(파랑) 대비 4개 task에서 모두 크게 향상. CodeQA 4 → 26, OOLONG 0 → 24. (b) MRCRv2 64k/2-needle split에서 RL training만으로 1M/8-needle split으로 일반화 — Gemini 3.1 Pro(점선) 수준에 도달 (Zhang 2026, p.8).*

![[assets/zhang-2026-recursive-language-models/fig12.png]]
*Figure 6: 학습된 RLM-Qwen3-8B는 runtime도 3.2× ~ 9.6× 빨라진다 — sub-call 횟수와 mistake가 모두 줄어든 결과 (Zhang 2026, p.17).*

학습 레시피는 단순하다 (Appendix A).
1. Qwen3-Coder-480B-A35B로 LongBenchPro 750 task에서 RLM 트래젝토리 2,250개 수집
2. 0점·1턴 제거 → 1,072개로 필터링
3. 각 root iteration을 별도 SFT sample (input=full history, output=root LM 출력)
4. Qwen3-8B 100k char 초과 + FINAL template 오류(16%·13%) 패치
5. prime-rl, batch 64, 300 step, 48 H100 hours

핵심 가설: **"RLM root LM은 결국 reasoning model이고, leaf sub-call은 일반 LLM 요청이다 → root만 잘 학습해도 충분"**. 이 가정이 맞다면 RLM 학습은 일반 reasoning 학습으로 환원되어 작은 모델로도 빠르게 가능하다.

![[assets/zhang-2026-recursive-language-models/fig10.png]]
*Figure 5: LongBenchPro에서 수집한 RLM 트래젝토리의 필터링 전후 통계 — 턴 수 분포(상)와 turn당 토큰 수(하). 필터링 후 평균 5턴, 8k input·900 output 토큰 수준으로 다듬어졌다 (Zhang 2026, p.16).*

## RLM 트래젝토리 분석 (RLM Trajectory Analysis)

### 3가지 공통 행동 패턴

![[assets/zhang-2026-recursive-language-models/fig14.png]]
*Figure 8: RLM이 task를 풀 때 보이는 3가지 공통 패턴. (a) regex 코드로 키워드 매칭 후 window snippet 추출, (b) 6개 카테고리 분류를 sub-LM에 위임하고 root는 결과만 보관, (c) sub-LM 결과를 dict로 stitch해 단일 LM 컨텍스트로는 불가능한 출력 길이 생성 (Zhang 2026, p.31).*

### Decomposition 선택의 영향

![[assets/zhang-2026-recursive-language-models/fig09.png]]
*Figure 4: (a) RLM(GPT-5)의 첫 task decomposition 시도 분포 — in-context 예시 1개만 추가해도 correct rollout이 11개 → 30개로 늘고, 예시가 task와 무관해도 효과적이다. (b) RLM(Qwen3-Coder) 트래젝토리는 GPT-5보다 syntax error가 압도적으로 많고, correct rollout에서도 마찬가지다 — Qwen3-Coder가 depth↑에서 성능이 깎이는 원인 (Zhang 2026, p.8).*

### Sub-call 사용량 — model별 행태 차이

![[assets/zhang-2026-recursive-language-models/fig16.png]]
*Figure 10: task별 평균 sub-call 횟수 (correct vs incorrect). Qwen3-Coder는 OOLONG에서 correct rollout 510회 — GPT-5(30회)의 17배. "everything에 sub-call" 경향이 강하고, incorrect rollout이 일반적으로 더 많은 sub-call을 쓴다(헤맴) (Zhang 2026, p.40).*

### RLM의 task-level 우위

![[assets/zhang-2026-recursive-language-models/fig15.png]]
*Figure 9: GPT-5·Qwen3-Coder 각각에 대해 RLM(depth=1) vs 다른 baseline의 task-level win/tie/loss. GPT-5에서는 RLM이 모든 baseline을 큰 차이로 앞선다 (Zhang 2026, p.40).*

## 한계와 향후 과제 (Limitations and Future Work)

저자들이 명시한 한계:
- **평가 부족**: 자연스러운 long-context task로의 확장과 guardrail mechanism이 미탐구
- **복잡도**: 모든 sub-call이 blocking/sequential → async + sandboxed REPL 필요. sub-call cost explosion 위험도 존재
- **FINAL tag brittleness**: 모델이 plan을 FINAL에 넣거나, FINAL과 FINAL_VAR을 혼동하는 등 structured-output-스러운 이상 행동. native RLM 학습으로 해결 기대
- **코딩 능력 부족 모델은 부적합**: Qwen3-8B base가 어려워한 이유
- **출력 토큰 한도 작은 thinking 모델 부적합**: Qwen3-235B-A22B는 thinking이 max output 초과로 자주 실패

향후 방향은 **native RLM 학습의 scale-up** (8B distillation을 넘어 on-policy RL + 더 큰 모델 + 더 다양한 도메인). 저자들은 RLM trajectory를 STaR/Quiet-STaR 스타일의 self-bootstrap 가능한 reasoning 형식으로 해석한다.

## 관련 페이지 (Related Pages)

- [[agents/lin-2026-harness-updating-is-not-harness-benefit]] — Anthropic이 harness(scaffold)를 업데이트하면서 발생하는 평가 불일치 문제. RLM은 harness 측 변화가 base LM 능력에 미치는 영향의 극단적 사례
- [[agents/dennis-2026-compiling-agentic-workflows-into-llm]] — agentic workflow를 LLM으로 컴파일하는 정반대 방향(RLM은 LLM이 workflow를 동적 생성)
- [[agents/patel-2026-beyond-the-prompt-claude-code]] — Claude Code의 dynamic workflow 디자인. RLM이 Table 1에서 정량 비교하는 baseline
- [[agents/qiao-2026-memory-intelligence-agent]] — non-parametric memory + Planner-Executor 구조. RLM과 직교 — RLM은 prompt를 환경 변수화, MIA는 memory를 환경 변수화
- [[agents/zou-2026-task-focused-memorization-multimodal-agents]] — multimodal agent에서의 task-focused memorization. RLM과 비슷하게 컨텍스트 압축이 아닌 외부화 방향
