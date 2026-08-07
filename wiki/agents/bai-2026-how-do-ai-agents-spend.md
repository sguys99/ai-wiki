---
title: "How Do AI Agents Spend Your Money? Analyzing and Predicting Token Consumption in Agentic Coding Tasks"
type: paper
year: 2026
category: agents
source: bai-2026-how-do-ai-agents-spend.md
raw_path: /Users/sguys99/Desktop/project/ai-wiki/raw/papers/bai-2026-how-do-ai-agents-spend.pdf
raw_filename: "bai-2026-how-do-ai-agents-spend.pdf"
source_collection: external
tags:
  - agentic-coding
  - token-consumption
  - token-efficiency
  - swe-bench
  - openhands
  - cost-prediction
  - prompt-caching
  - inverse-scaling
  - agent-pricing
authors: "Longju Bai, Zhemin Huang, Xingyao Wang, Jiao Sun, Rada Mihalcea, Erik Brynjolfsson, Alex Pentland, Jiaxin Pei"
arxiv_id: "2604.22750"
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/bai-2026-how-do-ai-agents-spend/fig01.png
    raw: raw/papers/bai-2026-how-do-ai-agents-spend-figures/fig01.png
    caption: "Figure 1: agentic coding vs. code reasoning vs. code chat — 평균 토큰 사용량·비용·input/output 비율 (agentic이 input 토큰 폭증으로 압도적)"
    page: 1
    bbox_norm: [0.1918, 0.6562, 0.7938, 0.8087]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/bai-2026-how-do-ai-agents-spend/fig02.png
    raw: raw/papers/bai-2026-how-do-ai-agents-spend-figures/fig02.png
    caption: "Figure 2: 토큰 비용은 문제 간·동일 문제 반복 실행 간 모두 큰 분산 (가장 비싼 문제가 가장 싼 문제보다 ~7M 토큰 더 소비)"
    page: 4
    bbox_norm: [0.1662, 0.1003, 0.8333, 0.2955]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/bai-2026-how-do-ai-agents-spend/fig03.png
    raw: raw/papers/bai-2026-how-do-ai-agents-spend-figures/fig03.png
    caption: "Figure 3: 토큰 많이 쓴 문제가 오히려 정확도 낮음 + 정확도는 중간 비용에서 정점 후 포화 (inverse test-time scaling)"
    page: 5
    bbox_norm: [0.1667, 0.1003, 0.8333, 0.293]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/bai-2026-how-do-ai-agents-spend/fig04.png
    raw: raw/papers/bai-2026-how-do-ai-agents-spend-figures/fig04.png
    caption: "Figure 4: 고비용 실행은 동일 파일에 대한 반복 view·modify와 연관 (비효율적 탐색이 컨텍스트 팽창)"
    page: 5
    bbox_norm: [0.1667, 0.3974, 0.8333, 0.5902]
    strategy: caption-region
    curated: false
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/bai-2026-how-do-ai-agents-spend/fig05.png
    raw: raw/papers/bai-2026-how-do-ai-agents-spend-figures/fig05.png
    caption: "Figure 5: 전문가 난이도 평가는 실제 토큰 소비의 약한 예측자 (Kendall τb=0.32, 분포 대폭 겹침)"
    page: 6
    bbox_norm: [0.1667, 0.1003, 0.8333, 0.2617]
    strategy: caption-region
    curated: false
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/bai-2026-how-do-ai-agents-spend/fig06.png
    raw: raw/papers/bai-2026-how-do-ai-agents-spend-figures/fig06.png
    caption: "Figure 6: 모델별 토큰 효율 차이 — success/failure subset 모두에서 순위 유지 (효율은 모델 고유 특성). GPT-5 최저비용, Kimi-K2 최고비용·최저정확도"
    page: 7
    bbox_norm: [0.1667, 0.1003, 0.8333, 0.3025]
    strategy: caption-region
    curated: true
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/bai-2026-how-do-ai-agents-spend/fig07.png
    raw: raw/papers/bai-2026-how-do-ai-agents-spend-figures/fig07.png
    caption: "Figure 7: 파일 view·modify 액션의 overall vs. repeated 횟수 — 저비용 모델(GPT-5)은 적고 반복 적음, 고비용 모델은 ~50% 반복"
    page: 8
    bbox_norm: [0.2314, 0.1003, 0.7686, 0.3107]
    strategy: caption-region
    curated: false
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/bai-2026-how-do-ai-agents-spend/fig08.png
    raw: raw/papers/bai-2026-how-do-ai-agents-spend-figures/fig08.png
    caption: "Figure 8: phase별(Setup·Explore·Fix·Validate·Closeout) 토큰량·비용 — cache-read input이 모든 단계에서 지배"
    page: 9
    bbox_norm: [0.2293, 0.2468, 0.7707, 0.4337]
    strategy: caption-region
    curated: true
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/bai-2026-how-do-ai-agents-spend/fig09.png
    raw: raw/papers/bai-2026-how-do-ai-agents-spend-figures/fig09.png
    caption: "Figure 9: round별 토큰-비용 동역학(astropy-7336) — cache-read는 안정적 누적, 비용 스파이크는 새 컨텍스트 주입 액션에서 발생"
    page: 10
    bbox_norm: [0.1828, 0.1003, 0.8171, 0.2994]
    strategy: caption-region
    curated: false
  - id: fig10
    label: Figure 10
    kind: figure
    file: assets/bai-2026-how-do-ai-agents-spend/fig10.png
    raw: raw/papers/bai-2026-how-do-ai-agents-spend-figures/fig10.png
    caption: "Figure 10: 자기예측 성능(Pearson r)과 오버헤드 — 최고 0.39, input 예측이 output보다 어려움"
    page: 11
    bbox_norm: [0.2056, 0.1003, 0.7428, 0.3058]
    strategy: caption-region
    curated: false
  - id: fig11
    label: Figure 11
    kind: figure
    file: assets/bai-2026-how-do-ai-agents-spend/fig11.png
    raw: raw/papers/bai-2026-how-do-ai-agents-spend-figures/fig11.png
    caption: "Figure 11: 예측 vs. 실제 토큰 사용량 — 모든 모델이 체계적으로 과소추정(대각선 아래), input에서 특히 심함"
    page: 12
    bbox_norm: [0.1667, 0.1003, 0.8333, 0.2553]
    strategy: caption-region
    curated: true
  - id: fig12
    label: Figure 12
    kind: figure
    file: assets/bai-2026-how-do-ai-agents-spend/fig12.png
    raw: raw/papers/bai-2026-how-do-ai-agents-spend-figures/fig12.png
    caption: "Figure 12: output-token 분석 (Appendix A) — input 결과와 동일 경향, 고비용에서 정확도 하락·반복 액션 증가"
    page: 16
    bbox_norm: [0.1661, 0.2712, 0.8358, 0.7153]
    strategy: caption-region
    curated: false
  - id: fig13
    label: Figure 13
    kind: figure
    file: assets/bai-2026-how-do-ai-agents-spend/fig13.png
    raw: raw/papers/bai-2026-how-do-ai-agents-spend-figures/fig13.png
    caption: "Figure 13: in-context 예시 없는 자기예측 (Appendix D) — 과소추정 지속·심화, 상관 크게 저하"
    page: 26
    bbox_norm: [0.1667, 0.3177, 0.8333, 0.4858]
    strategy: caption-region
    curated: false
  - id: tab01
    label: Table 1
    kind: table
    file: assets/bai-2026-how-do-ai-agents-spend/tab01.png
    raw: raw/papers/bai-2026-how-do-ai-agents-spend-figures/tab01.png
    caption: "Table 1: Phases of agent trajectories. Percentages are computed over all rounds across Sonnet-4.5 runs."
    page: 9
    bbox_norm: [0.2583, 0.265, 0.768, 0.4168]
    strategy: table-region
    curated: false
  - id: tab02
    label: Table 2
    kind: table
    file: assets/bai-2026-how-do-ai-agents-spend/tab02.png
    raw: raw/papers/bai-2026-how-do-ai-agents-spend-figures/tab02.png
    caption: "Table 2: Six representative rounds from the trajectory in Figure 9 , grouped by their dominant cost source. Input-heavy rounds are driven by new content returned from tool calls; output- heavy rounds are driven by the agent’s own reasoning and generation."
    page: 10
    bbox_norm: [0.1725, 0.37, 0.8304, 0.4695]
    strategy: table-region
    curated: false
  - id: tab03
    label: Table 3
    kind: table
    file: assets/bai-2026-how-do-ai-agents-spend/tab03.png
    raw: raw/papers/bai-2026-how-do-ai-agents-spend-figures/tab03.png
    caption: "Table 3 further shows that correlation with real token usage degrades substantially without the in-context example. These results indicate that the downward bias is not caused by example-induced anchoring; instead, the demonstration improves calibration, while the underlying difficulty of anticipati"
    page: 26
    bbox_norm: [0.1662, 0.1352, 0.836, 0.2536]
    strategy: table-region
    curated: false
---

## 요약 (Summary)

AI 에이전트는 대체 돈을 어디에 쓰는가. 이 논문은 SWE-bench Verified 500 문제를 OpenHands 위에서 8개 frontier LLM으로 각 4회 돌린 trajectory를 뜯어보며 그 질문에 처음으로 체계적인 답을 낸다. 답은 셋으로 갈린다. 하나, agentic coding은 유독 비싸고 그 비용은 output이 아니라 **input 토큰**에서 나온다. 둘, 토큰을 더 쓴다고 정답률이 오르지는 않아서 정확도는 중간 비용에서 정점을 찍고 포화한다. 셋, 에이전트에게 실행 전에 자기 비용을 예측하게 시키면 상관은 최고 0.39에 그치고 하나같이 실제보다 적게 부른다.

## 주요 기여 (Key Contributions)

- **최초의 대규모 agentic 토큰 소비 실증 연구** — 전체 trajectory를 오픈소스로 공개.
- 에이전트가 토큰을 어떻게 쓰는지 그 패턴을 짚어, 가격 설계와 모델 개발에 곧장 시사점을 준다.
- **pre-execution self-prediction 태스크를 정식화**하고 frontier 모델로 벤치마크해, 실행 전 비용 추정에서 드러나는 근본적 역량 격차를 보인다.

## 방법론 및 아키텍처 (Methodology and Architecture)

OpenHands를 기본 에이전트 프레임워크로 삼고 SWE-bench Verified 500 문제를 8개 모델(Claude Sonnet-3.7/4/4.5, GPT-5, GPT-5.2, Qwen3-Coder-480B, Kimi-K2, Gemini-3-Pro)로 각각 4회씩 독립 실행한다. 매 라운드 LLM 응답, tool call, 실행이 이어지는데 **직전까지의 대화 이력이 통째로 다음 라운드에 다시 쌓인다** — 이것이 agentic input이 폭증하는 구조적 원인이다. trajectory JSON에서 종류별 토큰과 금전 비용, action type을 파싱한다.

![[assets/bai-2026-how-do-ai-agents-spend/fig01.png]]
*Figure 1: agentic coding은 code reasoning 대비 3500×, code chat 대비 1200× 토큰을 소비하며 그 차이는 input 토큰이 만든다 (Bai 2026, p.1)*

비용은 토큰 종류마다 단가가 다르다는 점을 반영해 계산한다. Claude류는 non-cached input·output·cache creation·cache read 4종을 저마다의 단가로 합산하고, GPT-5류는 implicit caching으로 cached input을 base input의 0.2배로 과금한다. self-prediction 태스크에서는 실행 에이전트 자신을 예측기로 삼는다. 에이전트는 repo를 탐색하되 fix 대신 단계별 토큰 추정치를 JSON으로 `finish`하고, 프롬프트에는 사람이 작성한 worked example 하나를 넣는다.

## 결과 (Results)

**agentic은 왜 비싼가.** 평균 토큰은 code reasoning 1.19k → code chat 3.39k → agentic **4.17M**, 평균 비용은 $0.016 → $0.023 → **$1.857**, input/output 비율은 0.16 → 1.33 → **153.85**로 뛴다. 같은 컨텍스트가 매 라운드 다시 먹히면서 caching을 켜도 비용이 압도적이다.

![[assets/bai-2026-how-do-ai-agents-spend/fig02.png]]
*Figure 2: 가장 비싼 문제가 가장 싼 문제보다 ~7M 토큰 더 들고, 동일 문제 반복 실행도 최대·최소 비용이 ~2× 벌어진다 (Bai 2026, p.4)*

**더 쓴다고 더 맞히지 않는다.** 정확도는 MinCost에서 LowerCost로 넘어갈 때 잠깐 오른 뒤 포화하고, 고비용 구간에서는 오히려 떨어진다. 비용을 많이 쓴 실패 실행일수록 같은 파일을 반복해서 보고 고치는 패턴이 두드러진다. 비효율적 탐색이 컨텍스트만 부풀리는 셈이다.

![[assets/bai-2026-how-do-ai-agents-spend/fig03.png]]
*Figure 3: 토큰을 많이 쓴 문제일수록 정확도가 낮고, 동일 문제 안에서도 정확도는 중간 비용에서 정점을 찍는다 — inverse test-time scaling (Bai 2026, p.5)*

**효율은 모델 고유 특성이다.** GPT-5·GPT-5.2는 저비용·고정확도이고, Kimi-K2는 최고비용·최저정확도의 outlier다. 모든 모델이 공통으로 성공한 문제(n=230)든 공통으로 실패한 문제(n=100)든 모델 간 토큰 순위는 그대로 유지된다. 결국 비용을 가르는 건 문제 난이도가 아니라 모델의 행동이다. Kimi-K2와 Sonnet-4.5는 같은 작업을 두고 GPT-5보다 평균 150만+ 토큰을 더 쓴다.

![[assets/bai-2026-how-do-ai-agents-spend/fig06.png]]
*Figure 6: success·failure subset 모두에서 모델 순위가 유지되어, 토큰 효율이 문제가 아니라 모델의 고유 특성임을 보여준다 (Bai 2026, p.7)*

**phase별로는 cache-read가 지배한다.** trajectory를 Setup·Explore·Fix·Validate·Closeout 5단계로 나누면(Fix와 Explore가 라운드의 ~2/3을 차지한다), 어느 단계에서든 cache-read input 토큰이 raw 토큰량도 달러 비용도 모두 압도한다. output이 토큰당 ~80× 비싸도 누적된 컨텍스트의 물량이 그만큼 크기 때문이다. round 단위로 보면 cache-read는 안정적 baseline으로 깔리고, 비용 스파이크는 새 컨텍스트를 밀어 넣는 액션, 즉 repo 탐색·파일 생성·테스트 실행·최종 요약에서 터진다.

![[assets/bai-2026-how-do-ai-agents-spend/fig08.png]]
*Figure 8: 모든 phase에서 cache-read input 토큰이 토큰량과 비용을 지배한다 (Bai 2026, p.9)*

**에이전트는 자기 비용을 못 맞힌다.** 자기예측 상관은 최고 0.39(Sonnet-4.5 output)에 그치고, input은 output보다 예측이 늘 더 어렵다. 예측에 드는 오버헤드는 대개 실제 작업 비용의 절반 미만인데, Sonnet-3.7과 4는 2×를 쓰고도 상관이 낮다. 무엇보다 **모든 모델이 실제 토큰을 과소추정**하며 특히 input에서 심하다. in-context 예시를 빼면 과소추정은 더 심해진다. 편향의 원인이 예시 anchoring이 아니라 long-horizon 토큰 성장 자체를 내다보기 어렵다는 데 있다는 뜻이다.

![[assets/bai-2026-how-do-ai-agents-spend/fig11.png]]
*Figure 11: 예측 점들이 대각선 아래로 쏠려, 모든 모델이 토큰 사용을 체계적으로 과소추정함을 보여준다 (Bai 2026, p.12)*

## 시사점 (Implications)

정확한 point estimate는 아직 무리지만, 고비용 태스크를 가려내는 coarse 신호만 있어도 조기 경고나 명시적 승인, 대안 실행모드는 붙일 수 있다. input 토큰이 워낙 들쭉날쭉하고 확률적이라 upfront pricing은 어렵다. budget-aware tool-use policy처럼 런타임에서 토큰을 제약하는 장치가 나오기 전까지는 consumption-based pricing이 당분간 가장 현실적이다.

## 관련 페이지 (Related Pages)

- [[agents/lin-2026-harness-updating-is-not-harness-benefit|Harness Updating Is Not Harness Benefit]] — 에이전트 역량 예산을 어디 투입할지 통제 실험으로 따진 연구. "토큰을 더 쓴다고 이득이 아니다"라는 문제의식이 겹친다.
- [[agents/dennis-2026-compiling-agentic-workflows-into-llm|Compiling Agentic Workflows into LLM Weights]] — surface orchestration을 가중치로 컴파일해 라운드 누적 input을 줄이려는 접근. 이 논문이 지목한 input 폭증 문제의 한 대안.
