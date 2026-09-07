---
title: "Recursive Language Models"
type: paper
year: 2026
category: agents
raw_path: raw/papers/zhang-2026-recursive-language-models.pdf
raw_filename: "zhang-2026-recursive-language-models.pdf"
source_collection: external
tags: [long-context, inference-time-scaling, repl, recursive-sub-calls, agents, llm-scaffold, gpt-5, qwen3-coder, code-act, claude-code, oolong, browsecomp, fine-tuning, post-training, mit-csail]
authors: "Alex L. Zhang, Tim Kraska, Omar Khattab"
arxiv_id: "2512.24601"
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/zhang-2026-recursive-language-models/fig01.png
    raw: raw/papers/zhang-2026-recursive-language-models-figures/fig01.png
    caption: "GPT-5와 RLM(GPT-5, depth=1)의 입력 길이별 점수 비교. S-NIAH는 양쪽 모두 100%를 유지하지만 OOLONG과 OOLONG-Pairs에서는 GPT-5만 크게 하락한다"
    page: 1
    bbox_norm: [0.1828, 0.5744, 0.8172, 0.7189]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/zhang-2026-recursive-language-models/fig02.png
    raw: raw/papers/zhang-2026-recursive-language-models-figures/fig02.png
    caption: "RLM 아키텍처. 입력 prompt는 REPL 환경 E의 변수로 적재되고 root LM에는 직접 전달되지 않는다. LM은 코드로 prompt를 나누고 llm_query로 sub-LM을 호출한다"
    page: 2
    bbox_norm: [0.2475, 0.2783, 0.7524, 0.5713]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/zhang-2026-recursive-language-models/fig03.png
    raw: raw/papers/zhang-2026-recursive-language-models-figures/fig03.png
    caption: "(a) RLM trajectory를 distillation한 RLM-Qwen3-8B의 벤치마크 4종 점수. (b) MRCRv2에서 6만 4천 토큰, needle 2개 split으로 RL 학습한 결과가 100만 토큰, needle 8개 split으로 일반화되는 과정"
    page: 8
    bbox_norm: [0.1667, 0.2247, 0.8333, 0.3605]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/zhang-2026-recursive-language-models/fig04.png
    raw: raw/papers/zhang-2026-recursive-language-models-figures/fig04.png
    caption: "(a) OOLONG에서 system prompt의 in-context 예시에 따라 달라지는 RLM(GPT-5)의 첫 decomposition 유형 분포. (b) syntax error를 하나 이상 포함한 trajectory 비율을 GPT-5와 Qwen3-Coder로 비교한 결과"
    page: 8
    bbox_norm: [0.1667, 0.6175, 0.8333, 0.7708]
    strategy: caption-region
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/zhang-2026-recursive-language-models/fig05.png
    raw: raw/papers/zhang-2026-recursive-language-models-figures/fig05.png
    caption: "RLM-Qwen3-8B 학습에 쓴 LongBenchPro trajectory의 필터링 전후 통계. 위는 trajectory당 턴 수 분포, 아래는 턴당 입력과 출력 토큰 수 분포다"
    page: 16
    bbox_norm: [0.1667, 0.518, 0.8333, 0.7449]
    strategy: caption-region
    curated: true
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/zhang-2026-recursive-language-models/fig06.png
    raw: raw/papers/zhang-2026-recursive-language-models-figures/fig06.png
    caption: "RLM-Qwen3-8B의 평균 runtime을 학습 전 RLM(Qwen3-8B)과 비교한 결과. 벤치마크 4종에서 3.2배부터 9.6배까지 빨라진다"
    page: 17
    bbox_norm: [0.2637, 0.0833, 0.7363, 0.2668]
    strategy: caption-region
    curated: true
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/zhang-2026-recursive-language-models/fig07.png
    raw: raw/papers/zhang-2026-recursive-language-models-figures/fig07.png
    caption: "BrowseComp-Plus에서 컨텍스트 문서 수를 10개부터 1000개까지 늘렸을 때의 정답률(왼쪽)과 질의당 평균 API 비용(오른쪽)"
    page: 30
    bbox_norm: [0.1667, 0.4801, 0.8333, 0.7056]
    strategy: caption-region
    curated: true
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/zhang-2026-recursive-language-models/fig08.png
    raw: raw/papers/zhang-2026-recursive-language-models-figures/fig08.png
    caption: "RLM trajectory에서 반복 관찰된 세 가지 패턴. (a) 코드로 컨텍스트를 탐색하고 걸러낸다. (b) 큰 컨텍스트의 추론을 sub-LM 호출로 위임한다. (c) sub-LM 출력을 이어 붙여 긴 복합 출력을 만든다"
    page: 31
    bbox_norm: [0.1731, 0.1763, 0.8269, 0.4657]
    strategy: caption-region
    curated: true
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/zhang-2026-recursive-language-models/fig09.png
    raw: raw/papers/zhang-2026-recursive-language-models-figures/fig09.png
    caption: "RLM(depth=1)과 각 baseline의 task 단위 승패 비교. 초록은 RLM만 정답, 회색은 양쪽 정답, 빨강은 baseline만 정답인 task 수다"
    page: 40
    bbox_norm: [0.1667, 0.2013, 0.8333, 0.4097]
    strategy: caption-region
    curated: true
  - id: fig10
    label: Figure 10
    kind: figure
    file: assets/zhang-2026-recursive-language-models/fig10.png
    raw: raw/papers/zhang-2026-recursive-language-models-figures/fig10.png
    caption: "task별 평균 sub-call 횟수를 정답 rollout과 오답 rollout으로 나눠 모델 4종에서 비교한 결과"
    page: 40
    bbox_norm: [0.1667, 0.5766, 0.8333, 0.7568]
    strategy: caption-region
    curated: true
  - id: fig11
    label: Figure 11
    kind: figure
    file: assets/zhang-2026-recursive-language-models/fig11.png
    raw: raw/papers/zhang-2026-recursive-language-models-figures/fig11.png
    caption: "RLM과 baseline의 총 API 비용을 25, 50, 75, 95 percentile로 표시한 그래프. 중앙값은 비슷하거나 더 낮지만 꼬리 구간에서 크게 오른다"
    page: 41
    bbox_norm: [0.1667, 0.2033, 0.8333, 0.4469]
    strategy: caption-region
    curated: false
  - id: fig12
    label: Figure 12
    kind: figure
    file: assets/zhang-2026-recursive-language-models/fig12.png
    raw: raw/papers/zhang-2026-recursive-language-models-figures/fig12.png
    caption: "GPT-5 기반 방법들의 runtime을 벤치마크 4종에서 25, 50, 75, 95 percentile로 나눠 표시한 그래프"
    page: 41
    bbox_norm: [0.199, 0.5051, 0.801, 0.7898]
    strategy: caption-region
    curated: false
  - id: fig13
    label: Figure 13
    kind: figure
    file: assets/zhang-2026-recursive-language-models/fig13.png
    raw: raw/papers/zhang-2026-recursive-language-models-figures/fig13.png
    caption: "Qwen3-Coder-480B-A35B-Instruct 기반 방법들의 runtime을 벤치마크 4종에서 25, 50, 75, 95 percentile로 나눠 표시한 그래프"
    page: 42
    bbox_norm: [0.199, 0.0835, 0.801, 0.3682]
    strategy: caption-region
    curated: false
  - id: fig14
    label: Figure 14
    kind: figure
    file: assets/zhang-2026-recursive-language-models/fig14.png
    raw: raw/papers/zhang-2026-recursive-language-models-figures/fig14.png
    caption: "GPT-5 기반 방법들의 task별 API 비용 히스토그램. OOLONG, OOLONG-Pairs, CodeQA, BrowseComp+ 1000문서를 함께 담았다"
    page: 42
    bbox_norm: [0.1667, 0.4136, 0.8333, 0.8801]
    strategy: caption-region
    curated: false
  - id: fig15
    label: Figure 15
    kind: figure
    file: assets/zhang-2026-recursive-language-models/fig15.png
    raw: raw/papers/zhang-2026-recursive-language-models-figures/fig15.png
    caption: "Qwen3-Coder-480B 기반 방법들의 task별 API 비용 히스토그램. 같은 벤치마크 4종을 함께 담았다"
    page: 43
    bbox_norm: [0.1667, 0.101, 0.8333, 0.5624]
    strategy: caption-region
    curated: false
  - id: fig16
    label: Figure 16
    kind: figure
    file: assets/zhang-2026-recursive-language-models/fig16.png
    raw: raw/papers/zhang-2026-recursive-language-models-figures/fig16.png
    caption: "Figure 1의 길이별 실행에 들어간 task당 평균 API 비용을 달러로 표시한 그래프"
    page: 43
    bbox_norm: [0.1667, 0.6291, 0.8334, 0.8764]
    strategy: caption-region
    curated: false
  - id: tab01
    label: Table 1
    kind: table
    file: assets/zhang-2026-recursive-language-models/tab01.png
    raw: raw/papers/zhang-2026-recursive-language-models-figures/tab01.png
    caption: "복잡도가 다른 long-context 벤치마크 4종에서 방법별 성능을 비교한 표. 회색 숫자는 task당 평균 API 비용과 표준편차이고 별표는 입력 컨텍스트 한계에 걸린 실행을 뜻한다"
    page: 6
    bbox_norm: [0.1667, 0.3146, 0.8334, 0.697]
    strategy: table-region
    curated: false
  - id: tab02
    label: Table 2
    kind: table
    file: assets/zhang-2026-recursive-language-models/tab02.png
    raw: raw/papers/zhang-2026-recursive-language-models-figures/tab02.png
    caption: "LongCoT-mini 정답률. GPT-5.2 base와 RLM(GPT-5.2, depth=1), 그리고 decomposition hint를 더한 RLM을 비교한다"
    page: 7
    bbox_norm: [0.1667, 0.6548, 0.8333, 0.729]
    strategy: table-region
    curated: false
  - id: tab03
    label: Table 3
    kind: table
    file: assets/zhang-2026-recursive-language-models/tab03.png
    raw: raw/papers/zhang-2026-recursive-language-models-figures/tab03.png
    caption: "LongCoT-mini에서 GPT-5.2 base에 decomposition hint만 준 경우의 정답률. MATH split은 오르지만 전체 점수는 내려간다"
    page: 24
    bbox_norm: [0.1662, 0.4534, 0.8333, 0.5807]
    strategy: table-region
    curated: false
---

## 한 줄 요약 (One-line Summary)

MIT CSAIL이 2026-05-11 arXiv에 공개한 **Recursive Language Models (RLM)** 추론 패러다임. 임의 길이 prompt를 LLM context window에 직접 넣지 않고 **외부 환경(REPL)의 변수**로 offload한 뒤, root LLM이 코드를 생성해 prompt를 symbolic하게 탐색하고 분할하며 재귀 sub-LM을 호출한다. GPT-5와 Qwen3-Coder-480B 기준으로 100만에서 1000만 토큰이 넘는 입력을 처리하며, long-context 벤치마크 4종(S-NIAH, BrowseComp-Plus, OOLONG, OOLONG-Pairs)에서 base LM 대비 최대 2배, 그리고 GPT-5 기준 중앙값으로 compaction 대비 26%, sub-call을 갖춘 CodeAct 대비 130%, Claude Code 대비 13% 우위를 기록한다. trajectory 1,000개 distillation으로 학습한 RLM-Qwen3-8B는 학습 전 RLM(Qwen3-8B) 대비 중앙값 28.3% 향상되고 3개 task에서 vanilla GPT-5를 넘어선다.

## 1. 자료 정보 (Document Information)

- **저자**: Alex L. Zhang, Tim Kraska, Omar Khattab (모두 MIT CSAIL). Correspondence는 altzhang@mit.edu, okhattab@mit.edu.
- **arXiv**: 2512.24601v3, 2026-05-11 (cs.AI). Preprint.
- **공개 코드**: https://github.com/alexzhang13/rlm
- **연구 라인**: 제1저자군이 인용하는 compaction 계열에는 Khattab, Potts, Zaharia의 Baleen(NeurIPS 2021, condensed retrieval), OpenHands의 context condensation(Smith 2025), OpenAI Codex CLI(2025), ReSum(Wu 2025)이 함께 놓인다. 논문은 이 계열이 "prompt 앞부분의 어떤 세부는 안전하게 잊어도 된다"는 전제를 깔고 있다는 점을 문제로 지목한다.
- **포지셔닝**: "모델 아키텍처를 바꾸거나 재학습해 context window 자체를 늘리는 방향"(Press 2022의 linear bias 기반 길이 외삽, Gu 2022의 S4, Munkhdalai 2024의 Infini-attention)과 직교하는 **inference-time scaffold** 라인이다. compaction과 sub-agent delegation(Anthropic 2025의 Claude Code subagents, Sentient AI 2025의 ROMA, THREAD, Context Folding)을 동시에 능가하는 표현력을 주장한다.
- **이론적 동기**: reasoning model이 vanilla Transformer보다 표현력이 높다는 Merrill and Sabharwal(2024)의 결과를 끌어와, RLM도 같은 방식으로 inference-time 표현력을 넓히는 수단이라고 위치시킨다.

## 2. 주요 기여 (Key Contributions)

1. **Recursive Language Models (RLM) 패러다임 정의 (Algorithm 1)**. 임의 길이 prompt P를 REPL 환경 E의 변수로 저장하고, root LM M에게는 P의 **상수 크기 메타데이터(길이, 짧은 prefix, 접근 방법)만** 보여준 채 코드 생성으로 P를 조작하고 sub-LLM을 호출하게 한다. 세 가지 설계가 핵심이다. (1) prompt를 컨텍스트에 직접 넣지 않고 symbolic handle로만 준다. (2) `Finish` action이 없어서 최종 출력도 REPL 변수에서 가져오므로 출력 길이가 M의 한도에 묶이지 않는다. (3) **symbolic recursion**으로 코드 안에서 Ω(|P|) 또는 Ω(|P|²)개의 sub-LM 호출을 프로그램적으로 launch할 수 있다. 겉보기에 비슷하지만 표현력이 훨씬 낮은 Algorithm 2를 나란히 놓고 3개 design flaw를 명시한다.
2. **long-context 벤치마크 4종에서 RLM의 우위 실증 (Table 1)**. S-NIAH(RULER의 single needle split, 50 task, O(1) 검색), BrowseComp-Plus 1000문서(150 task, 600만에서 1100만 토큰 규모의 multi-hop QA), OOLONG trec_coarse(50 task, O(N) semantic aggregation), OOLONG-Pairs(20 task, O(N²) pairwise 열거, 본 논문 신규 제안), LongBench-v2 CodeQA(코드 저장소 이해 multi-choice)로 구성했다. RLM(GPT-5, depth=1)은 base GPT-5 대비 OOLONG에서 44.0%에서 56.0%로, OOLONG-Pairs에서 0.1%에서 58.0%로 올라간다.
3. **compaction과 coding agent 대비 우위 정량화**. RLM(GPT-5, depth=1)을 기준으로 4개 task의 상대 향상률 중앙값을 재면 compaction agent 대비 26%, sub-call을 갖춘 CodeAct 대비 130%, context offloading을 쓰는 Claude Code 대비 13%다. 비용은 base LM과 같은 자릿수이며, 중앙값에서는 RLM이 더 싸고 평균에서는 outlier trajectory 때문에 조금 높다.
4. **입력 길이와 task 복잡도의 상호작용 분석 (Figure 1)**. 입력 길이를 2^13에서 2^20 토큰까지 키우면 GPT-5는 O(N)과 O(N²) task에서 빠르게 떨어지지만 RLM은 완만하게 내려간다. base 모델의 effective context window가 task 복잡도에 의존한다는 가설을 검증한다.
5. **LongCoT-mini reasoning task로 확장 (Table 2)**. long-context와 무관한 multi-step reasoning 벤치마크에서도 RLM(GPT-5.2, depth=1)이 base 38.7%에서 50.6%로 오르고, decomposition hint를 더하면 65.6%가 되어 전체 상대 향상 69.5%를 기록한다. LOGIC과 CHESS split은 99%다.
6. **RLM-Qwen3-8B post-training (Appendix A)**. Qwen3-Coder-480B-A35B의 RLM trajectory를 LongBenchPro에서 수집하고 필터링한 뒤 Qwen3-8B에 distillation했다. 평가 벤치마크 4종에서 학습 전 RLM(Qwen3-8B) 대비 중앙값 28.3% 향상, runtime 3.2배에서 9.6배 가속을 얻었다. prime-rl로 batch 64, 300 step, 48 H100 hours가 들었다. **RLM 학습을 root model의 REPL 조작 능력과 sub-call 판단 능력 학습으로 환원**할 수 있다는 것이 핵심 인사이트다.
7. **MRCRv2 길이 일반화 실험 (Figure 3b)**. Qwen3-4B-Instruct-0527을 3만 2천에서 6만 4천 토큰, needle 2개 split에서 RLVR로 150 step만 학습했더니 100만 토큰, needle 8개 split으로 일반화됐다. 100만 토큰 context window를 가진 frontier 모델 Gemini 3.1 Pro의 같은 split 점수를 큰 폭으로 넘어선다.
8. **OOLONG-Pairs 신규 벤치마크 (Appendix D.1)**. trec_coarse 라벨을 기반으로 만든 20개 task다. 단순 개수 세기(집합의 포함배제 원리)로 풀리지 않게, 조건을 만족하는 모든 pair를 명시적으로 출력하도록 설계했다. 정보 밀도와 출력 길이가 동시에 요구되는 quadratic complexity task이며 F1으로 채점한다.
9. **decomposition 분석 (Figure 4)**. RLM의 첫 task decomposition 시도가 전체 성능에 크게 영향을 준다. system prompt에 in-context decomposition 예시를 넣으면 성능과 decomposition 정확도가 함께 오르고, 예시가 실제 task와 무관해도 효과가 있다. Qwen3-Coder는 GPT-5보다 syntax error가 훨씬 많고 정답 rollout에서도 마찬가지여서, recursion depth를 올리면 오히려 평균 성능이 내려간다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 RLM의 형식적 정의 (Algorithm 1)

base neural LM M과 그 최대 컨텍스트 K가 주어졌을 때, RLM은 M 위에 올라가는 inference-time scaffold다.

- 입력: 임의 길이 prompt P ∈ Σ*
- 출력: 응답 Y ∈ Σ*
- 목표: **unbounded input** (|P| ≫ K), **unbounded output**, **unbounded semantic horizon** (Ω(|P|) 또는 Ω(|P|²)만큼의 semantic work)

```
state ← InitREPL(prompt=P)              # P가 변수로 저장됨
state ← AddFunction(state, sub_RLM_M)   # sub-RLM 호출 함수 주입
hist ← [Metadata(state)]                # P 길이, prefix 등 상수 크기 메타만
while True:
    code ← LLM_M(hist)
    (state, stdout) ← REPL(state, code)
    hist ← hist ∥ code ∥ Metadata(stdout)   # stdout도 메타만 누적
    if state[Final] is set:
        return state[Final]
```

핵심은 `hist`에 **stdout의 메타데이터만** 붙는다는 점이다. 논문 각주 2가 이 설계의 비용을 명시한다. 턴마다 c 토큰으로 잘라내면 root iteration은 최대 K/c개로 제한되지만, 각 iteration이 임의 개수의 sub-call을 launch할 수 있다. 저자들은 root horizon 자체를 변수로 옮기면 이 제한도 없앨 수 있으나 재귀 층마다 iteration을 제한하는 편이 실용적이라고 적는다.

### 3.2 잘못된 설계(Algorithm 2)와의 대조

Algorithm 2도 sub-call, 외부 객체, 코드 실행을 모두 지원한다. 차이는 prompt와 중간값이 어디에 사는지, 그리고 재귀가 어디서 일어나는지에 있다.

| Algorithm 2의 Flaw | 문제 | RLM의 해결 |
|---|---|---|
| **Flaw #1** prompt P를 `hist`에 직접 넣는다 | 입력이 M의 K로 제한되고 compaction 같은 heuristic에 의존하게 된다. Search action으로 외부 데이터를 읽을 수 있어도 사용자 입력에 대해서는 여전히 유한하다 | P를 REPL 변수로 offload하고 root LM에는 메타만 준다 |
| **Flaw #2** `Finish(value)` action으로 출력한다 | 출력도 M의 context window보다 길어질 수 없다 | `Final` 변수를 REPL에서 가져오므로 출력 길이 제한이 없다 |
| **Flaw #3** code action과 sub-LLM action이 분리돼 있다 | sub-LLM을 코드 안에서 호출할 수 없어서, 명시적으로 말로 풀어낸 몇 개의 작업만 위임할 수 있다 | sub-LLM을 Python 모듈로 노출해 loop나 comprehension 안에서 Ω(|P|²)개까지 호출할 수 있다 |

Flaw #3을 저자들은 가장 중요한 차이로 꼽는다. 기존 self-delegation 방식이 sub-call을 autoregressive하게 말로 풀어내도록 설계돼 있어서 base LM의 출력 길이에 묶인다는 진단이다.

### 3.3 RLM 구현

| 구성 요소 | 구현 |
|---|---|
| 실행 환경 | Python REPL. sub-LM과 sub-RLM을 포함한 모든 도구가 모듈로 노출된다 |
| 초기 prompt | REPL 변수 `context`에 문자열로 저장된다 |
| sub-LM 호출 | `llm_query(prompt)`. 단순 요약, 추출, 청크 단위 질의 응답용 |
| sub-RLM 호출 | `rlm_query(context, query)`. 그 자체로 chunking이나 다단 추론이 필요한 복잡한 sub-task용. 최대 depth에 도달하면 `llm_query`로 자동 fallback한다 |
| stdout 처리 | 컨텍스트가 빠르게 차는 것을 막기 위해 잘라낸다 |
| 종료 신호 | `FINAL(answer)`로 답을 직접 주거나 `FINAL_VAR(variable_name)`로 REPL 변수를 반환한다 |
| recursion depth | 0은 sub-call 없이 REPL만, 1은 sub-LM 호출까지, 1보다 크면 sub-RLM 호출까지 허용한다 |
| 표기 | `RLM(model, depth=N)` 형식을 쓰고, 명시하지 않으면 depth=1이다 |
| 모델 조합 | GPT-5 실험에서 root LM은 GPT-5, 재귀 sub-LM은 GPT-5-mini다. 능력과 재귀 비용의 균형을 맞춘 선택이라고 적는다 |

### 3.4 시스템 프롬프트 (Appendix C)

방법마다 task와 무관한 고정 prompt 하나를 쓴다. RLM prompt는 REPL 환경 안내, `llm_query` 사용법, 그리고 chunking 전략을 보여주는 코드 예시(문자열 앞부분 훑기, 책을 절 단위로 순회하기, 문서 리스트를 10등분해 청크마다 질의하기, Markdown 헤더로 쪼개기)로 구성된다. 모델별 차이는 다음과 같다.

| 변형 | 차이 |
|---|---|
| GPT-5 (depth=1) | 기준 prompt. sub-LM이 약 50만 문자를 담을 수 있다고 안내하고 sub-LM 하나에 문서 10개를 넣는 전략을 예시로 든다 |
| Qwen3-Coder-480B-A35B | 맨 앞에 `llm_query` 남용 경고 한 줄을 추가한다. 호출당 약 20만 문자를 목표로 batch하라고 지시하며, 1000줄이면 개별 1000회가 아니라 5줄씩 묶어 200회를 부르라고 예시를 든다. 이 문장이 없으면 모든 것에 sub-call을 걸어 기본 task에도 수천 회 호출이 발생한다 |
| depth > 1 | `rlm_query(context, query)` 함수 설명과 `llm_query`와의 선택 기준을 추가한다 |
| Qwen3-8B (depth=1) | context window가 GPT-5의 272K에서 3만 2천 토큰으로 줄어든 만큼 조정한다. sub-LM 한도를 약 10만 문자로 낮추고, 청크 예시를 10,000자에서 1,000자로 줄이고, sub-LM 하나에 문서 2개에서 3개를 넣으라고 바꾼다 |
| REPL only (depth=0) | `llm_query` 설명을 빼고 regex로 관련 절을 찾아 buffer에 모으는 예시로 대체한다 |

### 3.5 평가 task 4종과 복잡도 설계

저자들은 effective context window를 task와 떼어놓고 이해할 수 없다는 가설에서 출발한다. 그래서 프롬프트 길이에 따라 처리 복잡도가 다르게 자라는 task들을 골랐다.

| task | 규모 | 복잡도 | 채점 | 출처 |
|---|---|---|---|---|
| S-NIAH | 50 task | O(1). needle 크기가 길이와 무관하게 고정된다 | 정답률 | RULER (Hsieh 2024) |
| LongBench-v2 CodeQA | 입력 23K에서 4.2M 토큰 | 코드베이스의 정해진 파일 수를 추론해야 하는 multi-choice | 정답률 | LongBench-v2 (Bai 2025) |
| BrowseComp-Plus (1000문서) | 150 task, 입력 600만에서 1100만 토큰 | 문서 여러 개를 이어 붙이는 multi-hop. 필요한 문서 수는 상수지만 S-NIAH보다 어렵다 | 정답률 | BrowseComp-Plus (Chen 2025) |
| OOLONG trec_coarse | 50 task, 입력 131K 토큰 | O(N). 거의 모든 항목의 semantic label이 답에 관여한다 | 정답률 | OOLONG (Bertsch 2025) |
| OOLONG-Pairs | 20 task, 입력 32K 토큰 | O(N²). 조건을 만족하는 모든 pair를 출력해야 한다 | F1 | 본 논문 신규 |

OOLONG-Pairs의 컨텍스트 길이는 1,024에서 1,048,576까지 11개 지점으로 만들어져 있다. task는 6개 라벨(description and abstract concept, entity, human being, numeric value, location, abbreviation)을 semantics로 판정한 뒤 조건에 맞는 user ID pair를 전부 열거하는 형식이다. 앞쪽 10개는 두 사용자에게 같은 조건을 걸고, 뒤쪽 10개는 두 사용자에게 서로 다른 조건을 걸어 난도를 올린다. 일부 task는 날짜 조건까지 덧붙인다.

### 3.6 비교 대상 baseline

| baseline | 구성 |
|---|---|
| Base Model | system prompt 없이 컨텍스트를 그대로 넣는다 |
| CodeAct (+BM25) | ReAct loop 안에서 코드를 실행하는 CodeAct(Wang 2024)에 BM25 retriever를 붙였다. BrowseComp+ 외의 task는 색인할 대상이 없거나 이미 컨텍스트에 들어가므로 retriever를 뺀 변형을 쓴다 |
| CodeAct (+sub-calls) | REPL 안에 sub-call 도구를 둔 변형. RLM과 달리 사용자 prompt를 코드 환경으로 offload하지 않고 모델에 직접 넣는다 |
| Compaction agent | 컨텍스트가 찰 때마다 요약해 이어가는 agent. 단일 문서가 창을 넘으면 그 문서를 청크로 나눠 반복 압축한다. GPT-5 실험에서는 비용 때문에 압축은 GPT-5-nano가, 최종 답변은 GPT-5가 담당한다 |
| OpenCode | 코딩 agent. 컨텍스트를 파일로 offload하는 변형과 초기 prompt로 직접 넣는 변형을 모두 평가한다 |
| Claude Code | 대응 모델과 함께 설계된 closed-source agent라서 Claude Opus 4.1 + Claude Code v2.0.0으로 평가한다. 메인 결과의 GPT-5와 출시 시점이 비슷한 버전이다 |

비용은 GPT-5는 OpenAI, Qwen3 계열은 Fireworks, Claude Opus 4.1은 Anthropic 단가로 계산했다.

### 3.7 RLM-Qwen3-8B 학습 레시피 (Appendix A)

핵심 가설은 "RLM trajectory가 정교해 보이는 이유는 재귀지만, leaf sub-call은 사실 범용 LLM 요청이고 어려운 부분은 root로 동작하는 법을 배우는 것"이라는 진단이다. 그래서 root 능력만 겨냥해 학습을 단순화했다.

1. **trajectory 수집**: RLM(Qwen3-Coder-480B-A35B)을 LongBenchPro 영어 task 750개에 적용해 candidate trajectory 2,250개를 얻었다.
2. **1차 필터링**: 점수가 정확히 0인 것과 1턴에서 끝난 것을 제거해 1,072개로 줄였다.
3. **턴 분할**: root iteration 하나를 SFT sample 하나로 분리했다. 입력은 그 시점까지의 전체 history, 출력은 root LM이 그 턴에 낸 출력이다.
4. **2차 필터링과 template 교정**: Qwen3-8B의 컨텍스트 한도(약 10만 문자로 근사)를 넘는 턴을 제거하고, RLM 지시를 어긴 template 실수를 프로그램적으로 고쳤다. 전체 턴의 16%가 `FINAL`을 잘못 썼고 13%가 REPL 변수를 `FINAL_VAR` 없이 최종 답으로 불렀다. 이 교정 단계가 distillation 결과 품질을 크게 끌어올렸다.
5. **학습**: prime-rl 라이브러리로 batch 64, 300 step, 48 H100 hours.
6. **MRCRv2 RL 실험**: Qwen3-4B-Instruct-0527을 3만 2천에서 6만 4천 토큰, needle 2개 split에서 RLVR로 150 step 학습했다. batch 128, example당 rollout 4개, 턴당 최대 출력 4,096 토큰, RLM iteration 최대 20회다. 50 step마다 51만 2천에서 100만 토큰, needle 8개 split으로 평가했다. Prime Intellect의 호스팅 학습 플랫폼 Lab에서 돌렸다.

Figure 5의 trajectory 통계는 필터링의 효과를 수치로 보여준다.

| 지표 | 필터링 전 | 필터링 후 |
|---|---|---|
| trajectory 수 | 2,241 | 953 |
| trajectory당 턴 수 | 평균 5.33, 표준편차 1.68 | 평균 4.96, 표준편차 1.74 |
| SFT sample(턴) 수 | 11,950 | 4,724 |
| 턴당 입력 토큰 | 9,734 ± 7,518 | 7,941 ± 5,057 |
| 턴당 출력 토큰 | 1,032 ± 738 | 910 ± 701 |

논문 본문이 "1,000개 샘플"이라고 부르는 것은 최종 953개 trajectory를 반올림한 값이다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 Table 1, 메인 결과

괄호 안은 task당 평균 API 비용과 표준편차다. 별표는 입력 컨텍스트 한계에 걸린 실행이 섞여 있다는 뜻이고, N/A는 비용을 집계하지 않은 실행이다. 0이 아닌 점수는 최소 소수 첫째 자리까지 반올림했다.

GPT-5 블록(RLM의 sub-call은 GPT-5-mini):

| Method | CodeQA (23K~4.2M) | BrowseComp+ (6M~11M) | OOLONG (131K) | OOLONG-Pairs (32K) |
|---|---|---|---|---|
| Base Model | 24.0* ($0.13±$0.07) | 0.0* (N/A) | 44.0 ($0.14±$0.02) | 0.1 ($0.16±$0.10) |
| CodeAct (+BM25) | 22.0* ($0.06±$0.08) | 51.0 ($0.71±$1.20) | 38.0 ($0.61±$1.06) | 24.7 ($0.75±$0.43) |
| CodeAct (+sub-calls) | 24.0* ($0.06±$0.08) | 0.0* (N/A) | 40.0 ($0.85±$1.27) | 28.4 ($1.11±$0.62) |
| Compaction agent | 58.0 ($1.31±$1.46) | 70.5 ($0.57±$0.10) | 46.0 ($0.13±$0.01) | 0.1 ($0.13±$0.09) |
| OpenCode | 18.0* (N/A) | 0.0* (N/A) | 32.0 (N/A) | 3.1 (N/A) |
| OpenCode (+context offloading) | 64.0 (N/A) | **94.0** (N/A) | 52.0 (N/A) | 4.8 (N/A) |
| **RLM (depth=0)** | 58.0 ($0.18±$0.56) | 88.0 ($0.44±$0.90) | 36.0 ($0.37±$0.42) | 43.9 ($0.69±$1.16) |
| **RLM (depth=1)** | 62.0 ($0.11±$0.10) | 91.3 ($0.99±$1.22) | 56.0 ($0.43±$0.85) | 58.0 ($0.33±$0.20) |
| **RLM (depth=2)** | **66.0** ($0.15±$0.30) | 92.0 ($0.55±$0.69) | 56.5 ($1.10±$3.25) | 65.5 ($0.33±$0.44) |
| **RLM (depth=3)** | 58.0 ($0.15±$0.27) | 92.0 ($0.51±$0.54) | **58.0** ($0.51±$0.54) | **76.0** ($0.39±$0.32) |

Qwen3-Coder-480B-A35B 블록:

| Method | CodeQA | BrowseComp+ | OOLONG | OOLONG-Pairs |
|---|---|---|---|---|
| Base Model | 20.0* ($0.13±$0.08) | 0.0* (N/A) | 36.0 ($0.06±$0.00) | 0.1 ($0.05±$0.01) |
| CodeAct (+BM25) | 24.0* ($0.17±$0.08) | 12.7 ($0.39±$0.50) | 38.0 ($1.51±$1.09) | 0.3 ($1.54±$0.35) |
| CodeAct (+sub-calls) | 26.0* ($0.28±$0.30) | 0.0* (N/A) | 32.0 ($1.83±$1.14) | 0.1 ($1.49±$0.46) |
| Compaction agent | 50.0 ($1.26±$1.50) | 38.0 ($8.98±$2.12) | 44.1 ($0.15±$0.01) | 0.31 ($0.05±$0.00) |
| OpenCode | 12.0* (N/A) | 0.0* (N/A) | 36.0 (N/A) | 0.0 (N/A) |
| OpenCode (+context offloading) | 40.0 (N/A) | 58.0 (N/A) | 24.0 (N/A) | 2.1 (N/A) |
| **RLM (depth=0)** | **66.0** ($0.18±$0.58) | 46.0 ($0.82±$0.69) | 43.5 ($0.32±$0.13) | 17.3 ($1.77±$1.23) |
| **RLM (depth=1)** | 56.0 ($0.92±$1.23) | 44.7 ($0.84±$0.63) | **48.0** ($0.61±$0.49) | **23.1** ($1.02±$0.52) |
| **RLM (depth=2)** | 54.0 ($1.88±$3.30) | 68.0 ($1.05±$0.67) | 26.0 ($1.03±$1.65) | 19.0 ($1.61±$0.99) |
| **RLM (depth=3)** | 44.0 ($1.65±$1.63) | **68.7** ($1.10±$0.80) | 32.0 ($0.80±$1.03) | 21.1 ($1.67±$1.21) |

Claude Opus 4.1 블록:

| Method | CodeQA | BrowseComp+ | OOLONG | OOLONG-Pairs |
|---|---|---|---|---|
| Claude Code | 12.0* ($2.03±$0.57) | 0.0* (N/A) | 40.2 ($3.43±$1.60) | 0.1 ($6.75±$3.57) |
| Claude Code (+context offloading) | 62.0 ($1.25±$0.54) | 84.0 ($2.03±$1.49) | 48.0 ($0.98±$0.55) | 6.5 ($2.99±$1.16) |

세 블록의 주요 결과는 다음과 같다.

- **OOLONG-Pairs에서 두 base 모델 모두 0.1%**로 사실상 실패한다. compaction agent도 GPT-5에서 0.1%, Qwen3-Coder에서 0.31%로 나아지지 않는다. RLM만 58.0%와 23.1%로 올라간다.
- **BrowseComp+에서 OpenCode (+context offloading)이 94.0%로 RLM보다 높다.** CodeQA에서도 64.0%로 RLM(depth=1)의 62.0%를 앞선다. 논문 초록이 median 비교 대상으로 compaction, CodeAct, Claude Code만 드는 것과 대비되는 지점이다.
- **GPT-5는 depth를 올리면 대체로 오르지만 CodeQA만 depth=3에서 58.0%로 내려간다.** Qwen3-Coder는 depth=2와 3에서 syntax error 전파로 성능이 내려간다.
- **Qwen3-Coder의 CodeQA는 sub-call이 없는 depth=0이 66.0%로 가장 높다.** 논문은 sub-call 있는 모든 변형을 앞선다고 명시한다.
- **Qwen3-Coder의 compaction agent가 BrowseComp+에서 $8.98로 가장 비싸다.** GPT-5 쪽 $0.57보다 약 15배다. GPT-5 쪽은 압축을 GPT-5-nano에 맡겼기 때문이며, 20개 무작위 샘플에서 GPT-5와 GPT-5-nano의 압축 성능이 비슷하다는 것을 확인했다고 적는다.

초록이 제시하는 중앙값 수치는 RLM(GPT-5, depth=1)을 기준으로 4개 task의 상대 향상률을 구해 중앙값을 취한 값이다.

| 비교 대상 | CodeQA | BrowseComp+ | OOLONG | OOLONG-Pairs | 중앙값 |
|---|---|---|---|---|---|
| Compaction agent | +6.9% | +29.5% | +21.7% | 매우 큼 | 약 26% |
| CodeAct (+sub-calls) | +158% | 매우 큼 | +40% | +104% | 약 130% |
| Claude Code (+offloading) | 0% | +8.7% | +16.7% | 매우 큼 | 약 13% |
| OpenCode (+offloading) | -3.1% | -2.9% | +7.7% | 매우 큼 | 약 +2% |

### 4.2 Figure 1, 입력 길이와 복잡도의 상호작용

Figure 1은 GPT-5와 RLM(GPT-5, depth=1)을 같은 축에서 비교한다. GPT-5의 context window는 272K 토큰이라서 52만 4천과 100만 토큰 지점은 base 모델로 실행할 수 없다.

| 입력 길이 | GPT-5 S-NIAH | GPT-5 OOLONG | GPT-5 OOLONG-Pairs | RLM S-NIAH | RLM OOLONG | RLM OOLONG-Pairs |
|---|---|---|---|---|---|---|
| 8,192 | 100% | 약 92% | 약 81% | 100% | 약 85% | 약 74% |
| 16,384 | 100% | 약 77% | 약 57% | 100% | 약 76% | 약 60% |
| 32,768 | 100% | 약 49% | 약 4% | 100% | 약 64% | 약 58% |
| 65,536 | 100% | 약 45% | 약 1% | 100% | 약 61% | 약 61% |
| 131,072 | 100% | 약 44% | 약 1% | 100% | 약 56% | 약 67% |
| 262,144 | 100% | 약 31% | 약 2% | 100% | 약 50% | 약 57% |
| 524,288 | 실행 불가 | 실행 불가 | 실행 불가 | 100% | 약 51% | 약 55% |
| 1,048,576 | 실행 불가 | 실행 불가 | 실행 불가 | 100% | 약 45% | 약 49% |

- **S-NIAH는 양쪽 모두 100%다.** needle 크기가 길이와 무관하게 고정되므로 길이만으로는 성능이 내려가지 않는다.
- **OOLONG에서 GPT-5는 8,192 토큰의 약 92%에서 262,144 토큰의 약 31%까지 내려간다.** 0%가 되지는 않는다.
- **OOLONG-Pairs에서 GPT-5는 32,768 토큰부터 5% 미만으로 떨어진다.** quadratic complexity가 훨씬 짧은 길이에서 한계를 드러낸다.
- **짧은 입력에서는 base가 더 낫다.** 8,192와 16,384 토큰의 OOLONG에서는 GPT-5가 RLM보다 높다. 논문은 2^14를 넘는 길이부터 RLM이 일관되게 앞선다고 적는다.
- RLM의 비용은 task 복잡도에 비례해 늘지만 GPT-5와 같은 자릿수에 머문다(Figure 16).

### 4.3 논문이 제시하는 관찰 6가지

| 관찰 | 내용 |
|---|---|
| 1 | RLM은 1000만 토큰 이상 규모로 확장되며 base LM과 기존 task-agnostic scaffold를 최대 2배까지 앞선다. BrowseComp+에서 GPT-5-mini가 600만에서 1100만 입력 토큰을 그대로 읽는다고 가정한 선형 외삽 비용은 $1.50에서 $2.75인데, RLM(GPT-5, depth=1)의 평균 비용은 $0.99이면서 compaction과 retrieval baseline을 29% 넘게 앞선다 |
| 2 | REPL은 긴 입력을 다루는 데 필수이고, 재귀 sub-call은 정보 밀도가 높은 입력에서 큰 이득을 준다. depth=0과 코딩 agent도 컨텍스트 한도를 넘어설 수는 있으나, OOLONG처럼 줄 단위 semantic 변환이 필요한 task에서는 sub-call이 없으면 키워드 heuristic에 의존하게 된다 |
| 3 | LM 성능은 입력 길이와 문제 복잡도의 함수로 내려가고 RLM은 그 기울기가 완만하다. Goldman 2025의 관찰과 일치한다 |
| 4 | RLM의 추론 비용은 다른 방법과 비슷하며 어떤 경우에는 base LM 호출 수준이다. 중앙값 실행은 base보다 싸지만 답을 찾지 못해 헤매는 outlier trajectory 때문에 평균은 더 비싸다 |
| 5 | long-context를 넘어 긴 reasoning에도 쓸 수 있다. LongCoT-mini에서 base 대비 전체 69.5% 향상을 기록한다 |
| 6 | 한 도메인에서 RLM을 학습시키면 다른 도메인의 RLM 성능과 효율이 함께 오르고, 길이 일반화도 나타난다 |

### 4.4 비용과 runtime

- **비용 분포**: Figure 11의 percentile 그래프에서 RLM은 50 percentile에서 비슷하거나 더 낮지만 꼬리 구간에서 크게 오른다. Figure 14와 15의 히스토그램도 RLM 비용이 두 모델 모두에서 long-tail이고 분산이 크다는 것을 보여준다.
- **runtime의 한계**: Figure 12와 13의 95 percentile은 매우 긴 runtime을 보인다. 원인은 sub-LLM 호출이 전부 blocking이자 sequential이라는 구현 선택이며, 이런 경우가 드물어서 timeout 로직으로 조기 종료할 수 있다고 적는다.
- **해석 유보**: 저자들은 runtime 수치가 사용 머신, API 요청 지연, LM 호출의 비동기성 같은 구현 세부에 크게 의존하므로 비용 수치와 달리 조심해서 읽어야 한다고 명시한다.

### 4.5 LongCoT-mini, long-context와 무관한 reasoning

LongCoT-mini(Motwani 2026)는 서로 의존하는 하위 문제로 구성된 compositional 문제를 다루는 벤치마크다. 논문에 보고된 최고 모델 GPT-5.2를 비교 대상으로 썼다.

| Model | Overall | MATH | CHEM | CS | LOGIC | CHESS |
|---|---|---|---|---|---|---|
| GPT-5.2 base | 38.7 | 26.0 | 37.0 | 40.4 | 53.6 | 36.6 |
| RLM(GPT-5.2, depth=1) | 50.6 | 5.6 | 50.0 | 11.0 | 86.7 | 93.0 |
| RLM(GPT-5.2, depth=1) + decomposition hints | **65.6** | 32.0 | 52.0 | 46.0 | **99.0** | **99.0** |

hint가 없으면 MATH(5.6)와 CS(11.0)에서 base보다 크게 낮다. 분해 방향을 잡지 못하는 경우다. hint를 더하면 전체 65.6%로 모든 domain에서 base를 넘어서고, 전체 상대 향상은 69.5%다.

같은 hint를 GPT-5.2 base에 직접 주면 결과가 갈린다(Table 3).

| Model | Overall | MATH | CHEM | CS | LOGIC | CHESS |
|---|---|---|---|---|---|---|
| GPT-5.2 base | 38.7 | 26.0 | 37.0 | 40.4 | 53.6 | 36.6 |
| GPT-5.2 base + decomposition hints | 28.6 | **37.0** | 27.0 | 32.0 | 19.1 | 30.0 |

MATH만 26.0에서 37.0으로 오르고 나머지는 모두 내려간다. LOGIC은 53.6에서 19.1로 가장 크게 하락한다. 저자들의 해석은 hint를 실행 가능하게 만드는 것이 REPL의 하위 문제 격리라는 것이다. 표준 chain-of-thought 방식으로는 분해를 지시받아도 프로그램적 task에서 혼란에 빠진다.

이 실험만 구현이 다르다. Table 1 평가에 쓴 구현을 fork한 Prime Intellect의 `rlm-harness`를 써서 샌드박스 기반으로 처리량을 올렸고, 최종 답 판정 방식도 다르다. sub-call 함수도 `llm_query`가 아니라 여러 노드를 병렬로 던지는 `llm_batch`이며, 답은 `/task/answer.txt` 파일에 쓴다.

decomposition hint는 `<env_tips>` 블록으로 붙는 긴 메타 가이드다. 요지는 다음과 같다.

- 조율만 하고 직접 풀지 않는다. REPL 안에서 더 깊이 생각하려고만 하면 0%에 가깝다.
- 1턴에서 `llm_batch` 한 번으로 문제를 self-contained 노드의 DAG(id, 원문 그대로의 question, deps, 최종 조립 방법, cycle 목록)로 추출한다. 이 턴에서는 아무것도 풀지 않는다.
- deps가 모두 채워진 ready 노드를 매 턴 하나의 `llm_batch`로 병렬 처리한다. 각 sub-prompt는 전역 문제를 보지 못하므로 부모의 검증된 값을 원문 그대로 넣는다.
- 검증된 답만 dict에 memoize한다. dict에 없으면 존재하지 않는 것으로 취급하고, 앞 턴의 변수나 자기 생각 속 숫자를 믿지 않는다.
- 자식이 값을 쓰기 전에 반드시 검증한다. 다른 표현으로 다시 던져 두 답이 일치할 때만 받아들이거나, 부호와 범위 같은 타당성 검사를 한다.
- root의 계산은 dict 조회, 문자열 포맷, 정합성 검사로만 한다. Python이 열거하거나 풀거나 시뮬레이션하려 하면 중단하고 `llm_batch`에 넘긴다.

### 4.6 RLM-Qwen3-8B post-training 결과 (Figure 3a)

Figure 3(a)는 세 계열을 나란히 놓는다. 회색은 RLM scaffold 없는 base Qwen3-8B, 파랑은 학습 전 RLM(Qwen3-8B), 빗금은 post-training한 RLM-Qwen3-8B다.

| Benchmark | base Qwen3-8B | RLM(Qwen3-8B) | RLM-Qwen3-8B | 상대 향상 |
|---|---|---|---|---|
| CodeQA | 4.00 | 26.00 | 32.00 | +23.1% |
| BrowseComp+ | 0.00 | 2.00 | 14.00 | +600% |
| OOLONG | 0.00 | 24.00 | 32.04 | +33.5% |
| OOLONG-Pairs | 0.07 | 4.26 | 5.17 | +21.4% |

논문이 말하는 중앙값 28.3%는 이 상대 향상 4개의 중앙값이다. 비교 기준은 base Qwen3-8B가 아니라 **학습 전 RLM(Qwen3-8B)**이다.

vanilla GPT-5(Table 1의 base 행)와 비교하면 RLM-Qwen3-8B가 CodeQA 32.00 대 24.0, BrowseComp+ 14.00 대 0.0, OOLONG-Pairs 5.17 대 0.1로 3개 task에서 앞선다. OOLONG만 32.04 대 44.0으로 뒤진다. 초록의 "3개 long-context task에서 vanilla GPT-5의 품질에 근접한다"는 문장이 가리키는 지점이다.

runtime도 함께 개선된다(Figure 6). 단위는 task당 평균 초다.

| Benchmark | RLM(Qwen3-8B) | RLM-Qwen3-8B | 감소율 | 배수 |
|---|---|---|---|---|
| CodeQA | 272 | 86 | 68% | 3.2배 |
| BrowseComp+ | 341 | 101 | 70% | 3.4배 |
| OOLONG | 12,449 | 1,649 | 87% | 7.5배 |
| OOLONG-Pairs | 5,113 | 532 | 90% | 9.6배 |

저자들은 이 가속을 판단 품질 향상과 실수 감소의 결과로 설명한다.

### 4.7 MRCRv2 길이 일반화 (Figure 3b)

Qwen3-4B-Instruct-0527을 짧은 split에서만 RL 학습하고 긴 split으로 평가한 결과다. y축은 MRCRv2 점수(0에서 1)다.

| 학습 step | train reward (6만 4천 토큰, needle 2개) | eval reward (100만 토큰, needle 8개) |
|---|---|---|
| 0 | 약 0.08 | 약 0.04 |
| 50 | 약 0.37 | 약 0.25 |
| 100 | 약 0.87 | 약 0.89 |
| 150 | 약 1.0 | 약 0.98 |

같은 그래프에 100만 토큰 context window를 가진 Gemini 3.1 Pro의 같은 split 점수가 점선(약 0.26)으로 그려져 있다. 50 step 근처에서 그 선과 만나고 100 step 이후로는 크게 넘어선다. 짧은 split의 학습 신호만으로 긴 split이 함께 올라간다는 점이 이 실험의 요지다.

### 4.8 RLM trajectory의 공통 패턴 (Figure 8, Appendix E)

Figure 8은 세 가지 패턴을 실제 코드 화면으로 보여준다.

- **(a) 코드로 컨텍스트를 탐색하고 걸러낸다.** `find_snippets(keyword, window=200, max_hits=10)` 같은 함수를 정의해 청크마다 키워드 위치를 찾고 주변 window를 잘라낸다. 화면의 키워드 목록은 `dinengdeng`, `pinakbet`, `bagoong`, `Agoo`, `La Union`, `festival`이다. 실행 시간은 0.158초다.
- **(b) 큰 컨텍스트의 추론을 sub-LM 호출로 위임한다.** `process_batch(questions_batch)`가 질문 여러 개를 한 prompt로 묶어 6개 카테고리 분류를 요청하고 `llm_query` 한 번으로 처리한다. root LM은 결과만 받는다.
- **(c) sub-LM 출력을 이어 붙여 긴 복합 출력을 만든다.** pair 리스트를 문자열로 포맷해 `"\n".join`으로 합치고 `FINAL_VAR(final_result)`로 반환한다. 화면의 출력은 최종 결과에 pair 10,731개가 담겼음을 보여준다. 단일 LM 출력으로는 만들 수 없는 길이다.

Appendix E는 개별 trajectory 4건을 단계별로 기술한다.

| 사례 | 대상 | 비용 | 요지 |
|---|---|---|---|
| E.1 | RLM(GPT-5), BrowseComp-Plus Query 74 | $0.079 | 1000개 문서(약 830만 토큰)에서 regex로 먼저 탐색한다. 모델이 사전 지식으로 검색어를 고르면서 prompt의 `beauty pageant`, `festival` 같은 키워드도 함께 찾는다. 6번 청크에서 단서를 찾아 sub-LM을 호출하고, 답을 변수 `answer6`에 저장하면서 출력도 한다. 확인용 sub-LM 호출 2회를 더 거쳐 정답을 반환한다 |
| E.2 | RLM(Qwen3-Coder), OOLONG-Pairs Query 3 | $1.12 | 실패 사례다. 1턴에서 sub-LM 분류와 코드로 정답 pair를 이미 변수에 만들어 놓는다. 그런데 `FINAL_VAR()` 반환이 받아들여지지 않자 검증을 반복하고, Step 5부터 11까지 같은 과정을 5회 다시 수행한다. 마지막에는 변수에 쌓아둔 답을 쓰지 않고 root LM이 직접 생성한 오답을 반환한다 |
| E.3 | RLM(Qwen3-Coder), OOLONG Query 212 | $0.38 | 분류 함수를 줄마다 sub-LM 호출로 정의해 전체 컨텍스트에 적용하면서 수천 회 재귀 호출이 발생한다. 정답에는 도달했지만 훨씬 적은 sub-call로도 풀 수 있었다고 적는다 |
| E.4 | RLM(GPT-5), CodeQA Query 44 | $0.27 | 90만 토큰 코드베이스를 부분으로 나눠 sub-LM에 단서를 묻고, 모은 단서를 별도 sub-call로 종합해 정답 선택지 1을 고른다. 정보 밀도가 낮은 task에서는 분할과 재귀 질의가 통한다는 예시다 |

두 모델의 코드 출력 습관도 다르다. Qwen3-Coder는 한 턴에 여러 코드 블록을 내놓고, GPT-5는 더 반복적으로 한 블록씩 내놓는다.

### 4.9 첫 decomposition과 syntax error (Figure 4)

Figure 4(a)는 OOLONG에서 system prompt의 in-context 예시를 바꿔가며 첫 decomposition 시도를 네 유형으로 분류한 결과다. 막대의 가로 길이는 rollout 개수다.

| system prompt | 첫 decomposition 정확 + 정답 | 첫 decomposition 부정확(문법은 유효) | 첫 decomposition 정확, sub-call 실패 |
|---|---|---|---|
| in-context 예시 없음 | 정답 쪽 10 | 정답 쪽 11, 오답 쪽 21 | 오답 쪽 3 |
| 올바른 in-context 예시 1개 | 정답 쪽 11 | 정답 쪽 10, 오답 쪽 15 | 오답 쪽 3 |
| 명시적 in-context 예시 | 정답 쪽 30 | 사실상 없음 | 오답 쪽 16, 정답 쪽 3 |

예시를 명시적으로 주면 "첫 decomposition이 부정확"한 rollout이 거의 사라지고 정답 rollout이 30개로 늘어난다. 남는 실패는 분해는 맞지만 sub-call이 실패한 경우로 성격이 바뀐다. 논문은 RLM이 처음 잘못 분해해도 자주 회복하지만 첫 시도가 전체 성능에 중요하다고 정리하며, 예시가 실제 task와 무관해도 효과가 있다고 적는다.

Figure 4(b)는 syntax error를 하나 이상 포함한 trajectory 비율이다.

| Task | GPT-5 정답 | GPT-5 오답 | Qwen3-Coder 정답 | Qwen3-Coder 오답 |
|---|---|---|---|---|
| CodeQA | 약 20% | 약 10% | 약 15% | 약 28% |
| BrowseComp+ | 약 18% | 약 23% | 약 48% | 약 34% |
| OOLONG | 약 10% | 약 27% | 약 71% | 약 61% |
| OOLONG-Pairs | 약 31% | 약 50% | 100% | 100% |

Qwen3-Coder는 정답 trajectory에서도 syntax error가 많고, OOLONG-Pairs에서는 정답과 오답 모두 100%다. sub-RLM 호출이 이 문제를 하위 호출로 전파하기 때문에 recursion depth를 올리면 평균 성능이 내려간다는 것이 저자들의 설명이다.

### 4.10 task 단위 승패 (Figure 9)

최소 한 방법이 정답을 낸 task만 모아 RLM(depth=1)과 baseline을 짝지어 세었다. 초록은 RLM만 정답, 회색은 양쪽 정답, 빨강은 baseline만 정답이다.

RLM(GPT-5) 기준:

| 비교 대상 | OOLONG | OOLONG-Pairs | CodeQA | BrowseComp+ |
|---|---|---|---|---|
| Base Model | 7 / 21 / 1 | 14 / 0 / 0 | 24 / 7 / 5 | 137 / 0 / 0 |
| RLM (no sub-calls) | 11 / 17 / 1 | 6 / 8 / 3 | 10 / 21 / 8 | 소수 / 125 / 소수 |
| Compaction agent | 6 / 22 / 1 | 14 / 0 / 0 | 9 / 22 / 7 | 38 / 99 / 소수 |
| CodeAct (+BM25) | 9 / 19 / 0 | 12 / 2 / 2 | 24 / 7 / 4 | 67 / 70 / 소수 |
| CodeAct (+sub-calls) | 8 / 20 / 0 | 12 / 2 / 0 | 23 / 8 / 4 | 137 / 0 / 0 |

RLM(Qwen3-Coder) 기준:

| 비교 대상 | OOLONG | OOLONG-Pairs | CodeQA | BrowseComp+ |
|---|---|---|---|---|
| Base Model | 12 / 12 / 6 | 4 / 0 / 0 | 20 / 8 / 소수 | 67 / 0 / 0 |
| RLM (no sub-calls) | 10 / 14 / 8 | 2 / 2 / 0 | 7 / 21 / 12 | 33 / 34 / 35 |
| Compaction agent | 10 / 14 / 8 | 4 / 0 / 0 | 10 / 18 / 7 | 37 / 30 / 27 |
| CodeAct (+BM25) | 12 / 12 / 7 | 4 / 0 / 0 | 20 / 8 / 4 | 54 / 13 / 소수 |
| CodeAct (+sub-calls) | 13 / 11 / 5 | 4 / 0 / 0 | 18 / 10 / 소수 | 67 / 0 / 0 |

논문의 표현은 "RLM이 baseline과 같은 task를 풀고 그보다 더 많은 task를 푸는 경향이며, 특히 GPT-5에서 그렇다"다. Qwen3-Coder에서는 빨강 막대가 상당하다. CodeQA에서 sub-call 없는 RLM이 12 대 7로 앞서고, BrowseComp+에서는 33 대 34 대 35로 거의 대등하다.

### 4.11 sub-call 사용량의 모델별 차이 (Figure 10)

trajectory당 평균 sub-call 횟수를 정답과 오답으로 나눈 결과다. 형식은 정답 / 오답이다.

| Task | GPT-5 | Qwen3-Coder | Qwen3-8B | Qwen3-8B-RLM |
|---|---|---|---|---|
| CodeQA | 1.5 / 3.4 | 2.2 / 2.4 | 2.9 / 14.0 | 1.5 / 3.3 |
| BrowseComp+ | 56 / 38 | 2 / 8 | 7.5 / 11 | 0.7 / 3.4 |
| OOLONG | 12 / 25 | 535 / 89 | 78 / 243 | 199 / 121 |
| OOLONG-Pairs | 53 / 2 | 170 / 59 | 24 / 51 | 3 / 89 |

논문이 짚는 세 가지는 다음과 같다.

- GPT-5는 BrowseComp-Plus에서 다른 어떤 모델보다 sub-call을 많이 쓴다.
- Qwen3-Coder는 OOLONG 정답 rollout에서 평균 약 500회를 쓴다. 같은 task의 GPT-5보다 훨씬 많다.
- Qwen3-8B는 특히 오답 trajectory에서 sub-call을 더 많이 쓴다. 오답이 더 많은 sub-call을 쓰는 경향은 모든 모델에서 나타나는 것이 아니다. GPT-5의 BrowseComp+와 OOLONG-Pairs, Qwen3-Coder의 OOLONG과 OOLONG-Pairs는 정답 쪽이 더 많다.

### 4.12 BrowseComp+ 문서 수 스케일링 (Figure 7, Appendix D.2)

150개 task 중 20개를 뽑아 컨텍스트 문서 수를 10개, 50개, 100개, 1000개로 늘려가며 측정했다. base LM이 컨텍스트를 처리하지 못하는 구간을 보이기 위해 baseline 2개를 추가했다. GPT-5 + pre-query BM25는 미리 검색한 문서만 넣는 방식이고, ReAct + BM25는 코드 환경 없이 검색만 반복하는 CodeAct 변형이다.

| 문서 수 | GPT-5 | GPT-5 (truncated) | GPT-5 + pre-query BM25 | ReAct + BM25 | RLM(GPT-5) | RLM(GPT-5) sub-call 없음 |
|---|---|---|---|---|---|---|
| 10 | 100% | 100% | 100% | 100% | 100% | 100% |
| 50 | 45% | 94% | 100% | 80% | 95% | 94% |
| 100 | 5% | 85% | 70% | 70% | 95% | 95% |
| 1000 | 0% | 30% | 35% | 60% | **100%** | 90% |

질의당 평균 API 비용은 1000문서에서 ReAct + BM25가 약 $2.06으로 가장 높고, RLM(GPT-5)이 약 $0.99, 나머지 세 방법이 약 $0.37이다. 논문은 문서 수가 100개를 넘으면 iterative 방법(RLM, ReAct)만 쓸 만한 성능을 유지한다고 정리한다. 1000문서에서 완전한 성능을 유지하는 것은 RLM(GPT-5)뿐이며, sub-call 없는 변형도 90%를 지킨다. RLM의 비용은 log-linear로 늘고, GPT-5가 무한한 context window를 가졌다고 가정한 외삽 비용보다 싸다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

### 5.1 명시된 한계

- **평가 범위**: 더 어렵고 자연스러운 long-context 처리 task로의 확장, 그리고 RLM에 가드레일을 구현하는 최선의 방법이 모두 미탐구 상태라고 적는다.
- **복잡도 증가**: LLM 위에 추론 layer를 더하면서 sub-call 비용 폭증 같은 의도치 않은 부작용이 생길 수 있다. 비동기 sub-call과 sandbox REPL이 runtime과 비용을 줄일 수 있지만 복잡도를 더 키운다.
- **학습 규모**: 실험은 기존 frontier 모델 위에서 이루어졌고, 네이티브 학습은 Qwen3-8B 규모의 초기 증거뿐이다.

### 5.2 부정적 결과 (Appendix B)

YOLOv3(Redmon and Farhadi 2018)의 서술 방식을 따라 실패한 시도를 그대로 적은 절이다.

| 시도 | 결과 |
|---|---|
| 하나의 RLM system prompt를 모든 모델에 쓰기 | GPT-5용으로 쓴 prompt를 Qwen3-Coder에 그대로 적용하면 원하지 않는 trajectory가 나온다. sub-call 남용을 막는 문장 한 줄을 추가해야 했다 |
| 코딩 능력이 부족한 모델 쓰기 | REPL 환경에서 컨텍스트를 다루는 능력이 전제라서 Qwen3-8B 같은 작은 모델은 어려워한다 |
| 출력 토큰 한도가 작은 thinking 모델 쓰기 | Qwen3-235B-A22B도 시도했다. base 모델 대비로는 전반적으로 개선됐고 OOLONG은 30%에서 38%로 올랐다. 그래도 메인 결과보다 격차가 작은 이유는 thinking 토큰이 개별 LM 호출의 최대 출력 한도를 넘어 여러 trajectory가 중단됐기 때문이다 |
| 비동기 없이 sub-call 실행 | 모든 sub-LM 질의를 blocking, sequential로 구현해 base 모델과 비교했을 때 특히 느렸다. 견고한 구현으로 해소할 수 있다고 본다 |
| `FINAL`과 `FINAL_VAR` 태그로 종료 판정 | 구조화 출력이 성능을 떨어뜨린다는 직관과 비슷하게 모델이 이상한 판단을 한다. 계획을 최종 답으로 출력하는 사례가 있었다. 최소한의 안전 장치를 넣었으나 네이티브 학습으로 근본적으로 피해야 할 문제로 본다 |

### 5.3 향후 방향

- **네이티브 RLM 학습의 확장**: 본 논문은 sample 1,000개와 8B 모델에 그쳤다. 모델 크기, 예제 수와 다양성, rollout 수를 키우고 가능하면 on-policy와 online으로 가는 것이 필요하다고 적는다. RLM 학습을 "다음 세대 language model system의 새로운 scale axis"로 다룰 수 있기를 기대한다.
- **reasoning으로의 재해석**: RLM trajectory를 reasoning의 한 형태(OpenAI o1 2024, DeepSeek-R1 2025)로 보고 STaR(Zelikman 2022)와 Quiet-STaR(Zelikman 2024) 방식으로 기존 모델을 bootstrap할 수 있다는 가설을 제시한다.

## 6. 관련 연구 (Related Work)

### 6.1 Long-Context LM Systems (두 직교 방향)

| 방향 | 대표 작업 | RLM과의 관계 |
|---|---|---|
| 아키텍처 변경과 재학습 | Press 2022(linear bias 기반 길이 외삽), Gu 2022(S4), Munkhdalai 2024(Infini-attention) | 직교한다. RLM은 scaffold 쪽이다 |
| lossy 컨텍스트 관리 | Chen 2023(Walking down the memory maze), Wu 2025(ReSum), Smith 2025(OpenHands context condensation), Khattab 2021(Baleen) | RLM이 정면 비교하는 대상이다. 세부 정보 손실이 문제다 |
| 명시적 메모리 계층 | Packer 2024(MemGPT), Chhikara 2025(Mem0), Zhang 2025(G-memory), Yu 2025(MemAgent) | RLM은 context window 관리를 전부 LM 자신에게 맡기는 implicit 방식이다 |
| task 특화 inference-time 방법 | Wu 2021, Chang 2024(BooookScore) | 대부분 task-specific이라서 task-agnostic을 목표로 하는 RLM과 다르다 |

### 6.2 sub-LM 호출을 통한 task decomposition

| 작업 | 차별점 |
|---|---|
| ViperGPT (Surís 2023, ICCV) | Python program 생성으로 visual reasoning을 수행한다 |
| THREAD (Schroeder 2025) | recursive spawning. sub-call을 autoregressive하게 말로 풀어낸다 |
| ReDel (Zhu 2024) | LLM 기반 recursive multi-agent toolkit |
| Context Folding (Sun 2025) | long-horizon agent의 컨텍스트 폴딩 |
| AgentFold (Ye 2025) | long-horizon web agent의 proactive 컨텍스트 관리 |
| ROMA (Sentient AI 2025) | open-source meta-agent의 재귀 구조 |
| DisCIPL (Grand 2025) | self-steering LM. sub-LM 호출을 담은 프로그램을 만들지만 단일 step 생성이라 생성 실수에서 회복할 수 없다 |
| 멀티에이전트 일반 (Guo 2024 survey, Anthropic 2025 subagents) | LM 호출 위치를 사람이 설계한 워크플로가 정한다 |
| **RLM (본 논문)** | **prompt를 환경 변수로 두고, REPL의 실행 피드백으로 재귀를 반복 정련한다.** 위 방법들은 base LM 길이를 넘는 입력을 다룰 수 없다 |

### 6.3 reasoning 라인과의 접점

- OpenAI o1 (2024), DeepSeek-R1 (2025): RLM trajectory를 reasoning의 한 형태로 해석하는 근거로 인용한다.
- STaR (Zelikman 2022), Quiet-STaR (Zelikman 2024): 기존 모델을 bootstrap하는 방법론으로 인용한다.
- Merrill and Sabharwal (2024): chain-of-thought를 갖춘 Transformer의 표현력이 vanilla보다 높다는 결과. RLM을 inference-time 표현력 확장으로 위치시키는 이론적 근거다.

## 7. 용어집 (Glossary)

- **RLM (Recursive Language Model)**: prompt를 REPL 환경 변수로 두고 LM이 코드로 그 변수를 조작하며 재귀 sub-call하는 추론 패러다임
- **REPL (Read-Eval-Print Loop)**: Python 대화형 실행 환경. RLM의 외부 환경 E의 구체적 구현이다
- **Symbolic handle**: prompt를 컨텍스트에 복사하지 않고 변수 이름으로만 참조하게 하는 설계
- **Symbolic recursion**: 코드 안에서 loop나 comprehension을 통해 sub-LM을 프로그램적으로 호출하는 것. 자연어로 풀어 말하는(verbalized) sub-call과 대조된다
- **Context rot** (Hong 2025): 입력이 길어질수록 LLM 품질이 단조롭게 내려가는 현상
- **Effective context window** (Hsieh 2024의 RULER, Goldman 2025): 명목 한도가 아니라 task 복잡도에 따라 달라지는 실질적 처리 한계
- **CodeAct** (Wang 2024): ReAct loop 안에 코드 실행 action을 둔 agent. RLM과 가장 가까운 비교 baseline이다
- **OOLONG-Pairs**: 본 논문 제안. OOLONG trec_coarse의 quadratic 변형으로 조건을 만족하는 모든 pair를 출력하게 강제한다
- **S-NIAH**: RULER의 single needle-in-the-haystack split
- **BrowseComp-Plus** (Chen 2025): DeepResearch 계열 multi-hop QA 벤치마크. 1000문서 코퍼스와 함께 쓴다
- **LongCoT-mini** (Motwani 2026): 서로 의존하는 하위 문제로 이루어진 long-horizon 추론 벤치마크
- **MRCRv2** (Vodrahalli 2024): 코퍼스에서 특정 본문의 등장 횟수를 세고 재현해야 하는 합성 long-context task
- **LongBenchPro** (Chen 2026): RLM-Qwen3-8B의 학습 trajectory를 수집한 이중언어 long-context 벤치마크
- **FINAL / FINAL_VAR**: RLM의 종료 태그. 답을 직접 넣거나 REPL 변수를 참조한다
- **llm_query / rlm_query / llm_batch**: RLM이 REPL에서 부르는 sub-call 함수. 각각 단일 sub-LM 호출, sub-RLM 호출, 병렬 batch 호출이다
- **Recursion depth**: 0은 sub-call 없음, 1은 sub-LM만, 1보다 크면 sub-RLM까지 허용
- **RLVR (reinforcement learning with verifiable rewards)**: 정답 여부를 기계로 검증할 수 있는 보상으로 강화학습하는 방식. MRCRv2 실험에 썼다

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 1 | GPT-5와 RLM(GPT-5, depth=1)의 입력 길이별 점수 비교 | caption-region | ★★★ wiki 권장 (headline) |
| fig02 | 2 | RLM 아키텍처 다이어그램 | caption-region | ★★★ wiki 권장 (architecture) |
| fig03 | 8 | RLM-Qwen3-8B post-training과 MRCRv2 길이 일반화 | caption-region | ★★ wiki 권장 (training) |
| fig04 | 8 | 첫 decomposition 분포와 syntax error 비율 | caption-region | ★ wiki 권장 (analysis) |
| fig05 | 16 | LongBenchPro trajectory 통계 (필터링 전후) | caption-region | (선택) |
| fig06 | 17 | 학습된 RLM의 runtime 가속 | caption-region | (선택) |
| fig07 | 30 | BrowseComp+ 문서 수 스케일링 | caption-region | ★★ wiki 권장 (scaling) |
| fig08 | 31 | RLM trajectory의 세 가지 패턴 | caption-region | ★★★ wiki 권장 (behavior) |
| fig09 | 40 | RLM과 baseline의 task 단위 승패 | caption-region | (선택) |
| fig10 | 40 | 모델별 sub-call 횟수 | caption-region | ★ wiki 권장 (analysis) |
| fig11 | 41 | API 비용 percentile 비교 | caption-region | (확인 필요) |
| fig12 | 41 | GPT-5 계열 runtime percentile | caption-region | (확인 필요) |
| fig13 | 42 | Qwen3-Coder 계열 runtime percentile | caption-region | (확인 필요) |
| fig14 | 42 | GPT-5 계열 API 비용 히스토그램 | caption-region | (확인 필요) |
| fig15 | 43 | Qwen3-Coder 계열 API 비용 히스토그램 | caption-region | (확인 필요) |
| fig16 | 43 | Figure 1 실행의 task당 API 비용 | caption-region | (확인 필요) |
| tab01 | 6 | 벤치마크 4종 방법별 성능 비교표 | table-region | (본문 표로 재작성해 대체) |
| tab02 | 7 | LongCoT-mini 정답률 | table-region | (본문 표로 재작성해 대체) |
| tab03 | 24 | GPT-5.2 base에 hint만 준 경우의 정답률 | table-region | (본문 표로 재작성해 대체) |

> id는 논문 라벨과 일치한다. Figure 3은 `fig03`, Table 2는 `tab02`다. 2026-08 정밀 크롭 전환 이전에는 이 표의 id가 frontmatter와 한 칸씩 어긋나 있었고 strategy도 전량 `page-region`으로 적혀 있었다. 재작성 시점에 `figures.json`을 기준으로 맞췄다.
