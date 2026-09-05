---
title: "How Do AI Agents Spend Your Money? Analyzing and Predicting Token Consumption in Agentic Coding Tasks"
type: paper
year: 2026
category: agents
raw_path: raw/papers/bai-2026-how-do-ai-agents-spend.pdf
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

## 한 줄 요약 (One-line Summary)

SWE-bench Verified에서 8개 frontier LLM의 agentic coding trajectory를 분석한 논문. agentic 작업이 왜 이렇게 비싼지(input 토큰이 1000× 규모로 지배), 토큰을 더 써도 정확도가 오르지 않는 이유(중간 비용에서 정점), 모델과 전문가 난이도가 실제 비용과 어긋나는 양상, 에이전트가 실행 전 자기 토큰 비용을 예측하지 못하고 체계적으로 과소추정하는 문제를 처음으로 체계적으로 규명했다.

## 1. 자료 정보 (Document Information)

- **제목**: How Do AI Agents Spend Your Money? Analyzing and Predicting Token Consumption in Agentic Coding Tasks
- **저자**: Longju Bai(U. Michigan), Zhemin Huang, Xingyao Wang(All Hands AI), Jiao Sun(Google DeepMind), Rada Mihalcea, Erik Brynjolfsson, Alex Pentland, Jiaxin Pei(Stanford 외)
- **arXiv**: 2604.22750v2 (2026-04-29, cs.CL)
- **실험 세팅**: OpenHands 에이전트 프레임워크 + SWE-bench Verified(실세계 GitHub 이슈 500 문제). 각 문제를 8개 모델 × 4회 독립 실행. 모든 토큰 지표는 4회 평균.
- **평가 모델(8종)**: Claude Sonnet-3.7 / Sonnet-4 / Sonnet-4.5, GPT-5, GPT-5.2, Qwen3-Coder-480B-A35B-Instruct, Kimi-K2, Gemini-3-Pro.
- **공개**: 전체 trajectory·inference log·중간 산출·평가 결과·메타데이터를 오픈소스로 공개.

## 2. 주요 기여 (Key Contributions)

1. **최초의 대규모 agentic coding 토큰 소비 실증 연구** — 전 trajectory 공개.
2. 에이전트 토큰 소비 패턴에 대한 통찰(가격·모델 개발에 시사).
3. **pre-execution 토큰 소비 예측(self-prediction) 태스크를 정식화**하고 frontier 모델을 벤치마크 — 실행 전 비용 추정의 근본적 역량 격차를 드러냄.

핵심 발견 5가지:
- (1) agentic 작업은 유일하게 비싸다: code reasoning 대비 **3500×**, code chat 대비 **1200×** 토큰. **input 토큰**이 비용을 지배(caching 켜도).
- (2) 토큰 사용은 고변동·본질적 확률적: 동일 문제 재실행이 최대 **30×** 차이. 더 많은 토큰 ≠ 더 높은 정확도(중간 비용에서 정점).
- (3) 모델 효율 큰 차이: Kimi-K2·Sonnet-4.5는 동일 작업에서 GPT-5보다 평균 **150만+ 토큰** 더 소비.
- (4) 전문가 난이도 평가는 실제 비용과 약하게만 일치(Kendall τb=0.32).
- (5) frontier 모델은 자기 토큰 사용을 정확히 예측 못함(상관 최고 0.39)·**체계적 과소추정**.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

- **데이터 수집**: OpenHands로 SWE-bench Verified 500 문제 × 8모델 × 4런. 각 라운드에서 LLM이 응답→tool call→실행, 전체 대화 이력이 다음 라운드로 변경 없이 누적(agentic의 input 폭증 원인).
- **fine-grained 지표**: 구조화 JSON trajectory에서 per-type 토큰 비용, 금전 비용, action type을 파싱.
- **phase 분할(5단계)**: Setup(9.98%) · Explore(30.37%) · Fix(33.53%) · Validate(16.59%) · Closeout(9.53%). Fix+Explore가 전체 라운드의 ~2/3.
- **비용 계산(Appendix B)**: Claude류(explicit caching)는 non-cached input·output·cache creation·cache read 4종을 개별 단가로 합산(`Cost = Input_nc·r_in + Output·r_out + CacheCreation·r_cc + CacheRead·r_cr`). GPT-5류(implicit cache)는 cached input을 base input의 0.2배로 과금. cache creation은 5분 write rate 사용.
- **self-prediction 태스크**: 실행 에이전트 자신을 예측기로 쓴다(privileged access를 얻고 추가 인프라도 필요 없다). 에이전트는 repo 탐색과 예비 명령 실행까지만 하고, fix 대신 토큰 추정치를 JSON으로 `finish`한다. fine-grained 프롬프트는 단계별 input/output/총비용 분해에 human-written worked example 1개를 붙였다. 모델당 3회 독립 예측했고, 예측-실제 Pearson 상관과 예측 오버헤드(예측비용/실제비용)로 평가한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

**토큰 소비 패턴**
- Figure 1: 평균 토큰 code reasoning 1.19k → code chat 3.39k → agentic **4.17M**. 평균 비용 $0.016 → $0.023 → **$1.857**. input/output 비율 0.16 → 1.33 → **153.85**.
- 변동성: 문제 간 가장 비싼 문제가 가장 싼 문제보다 ~7M 토큰↑. 동일 문제 반복 실행 최대·최소 비용 비율 ~2×.
- inverse scaling: 정확도는 MinCost→LowerCost로 소폭 상승 후 포화(고비용에서 하락). 고비용 실패 실행은 동일 파일 반복 view·modify 급증(비효율 탐색).
- 전문가 난이도: "<15분" 태스크의 6.7%가 평균 ">1시간" 태스크보다 더 소비, ">1시간"의 11.1%가 평균 "<15분"보다 적게 소비.

**모델 효율**
- GPT-5·GPT-5.2가 저비용·고정확도. Sonnet-4.5·Sonnet-4·Qwen3-Coder-480B는 고비용 영역. Kimi-K2는 최고비용·최저정확도 outlier.
- shared success(n=230)·shared failure(n=100) 모두에서 모델 토큰 순위 유지 → 효율은 문제 난이도가 아니라 모델 고유 행동.
- 실패 subset에서 토큰 증가폭: GPT-5류 <0.5M, Kimi-K2 ~2M(조기 종료 실패). 고비용 모델은 파일 액션의 ~50%가 반복.

**phase/round 동역학(Sonnet-4.5 case study)**
- cache-read input 토큰이 모든 phase에서 raw 토큰·달러 비용 모두 지배(output이 토큰당 ~80× 비싸도 누적 컨텍스트 volume이 압도).
- round별: cache-read는 안정적 baseline로 누적, 비용 스파이크는 새 컨텍스트 주입 액션(repo 탐색·파일 생성·테스트 실행·최종 요약)에서 발생.

**self-prediction**
- 상관 최고 0.39(Sonnet-4.5 output). input 예측이 output보다 일관되게 어려움(Kimi-K2만 input 0.38로 예외). Gemini-3-Pro는 하위.
- 오버헤드: 대부분 실제 작업 비용의 절반 미만. Sonnet-3.7·4는 2× 초과 쓰고도 상관 낮음. Sonnet-4.5는 0.32× 비용에 최고 상관, GPT-5.2는 오버헤드 <6%.
- **모든 모델이 과소추정**(대부분 점이 대각선 아래), input에서 특히 심각. in-context 예시 제거 시 과소추정 심화·상관 저하(Appendix D) → 편향은 예시 anchoring이 아니라 long-horizon 토큰 성장 예측의 본질적 난이도.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **모델 범위**: 8개 frontier 모델은 넓은 표본이나 여전히 일부. full trajectory 수집이 비싸 확장 제약.
- **user transparency**: 정확한 point estimate는 아직 비현실적이지만, 고비용 태스크를 가려내는 정도의 coarse 신호만으로도 조기 경고, 명시적 승인, 대안 실행모드 트리거는 가능하다.
- **agent pricing**: input 토큰이 크게 출렁이고 확률적이라 upfront pricing이 어렵고, 당분간은 consumption-based pricing이 현실적이다. budget-aware tool-use policy(Liu et al., 2025)처럼 런타임에서 토큰을 제약하는 방식이 보완책이 된다.
- 정확·효율·실행 통합된 self-prediction은 open problem.

## 6. 관련 연구 (Related Work)

- **agentic 프레임워크·벤치**: OpenHands(Wang 2025c), SWE-bench(Jimenez 2024)·SWE-bench Verified(Chowdhury 2024), AgentBench, Voyager, CodeAct.
- **토큰 분포·가격**: Tokenomics(Salim 2026), AgentTaxo 멀티에이전트 토큰 분포(Wang 2025b), price reversal in reasoning models(Chen 2026).
- **inverse test-time scaling**: Snell 2024, Wu 2025, Gema 2025(inverse scaling in test-time compute), Zeng 2025, Yang 2025, OptimalThinkingBench(Aggarwal 2025).
- **효율 에이전트**: SWE-effi(Fan 2025), Efficient Agents(Wang 2025a), budget-aware tool-use(Liu 2025).
- **self-modeling**: Self-Refine(Madaan 2023), LM calibration "models (mostly) know what they know"(Kadavath 2022).

## 7. 용어집 (Glossary)

- **agentic coding**: 에이전트가 repo를 읽고 이슈를 추론하며 tool을 호출해 여러 라운드에 걸쳐 문제를 스스로 푸는 작업. 라운드마다 전체 대화 이력이 쌓인다.
- **input/output ratio**: 입력 토큰 대 출력 토큰 비율. agentic에서 컨텍스트 반복 주입으로 153.85까지 폭증.
- **cache read / cache creation**: prompt caching에서 이미 처리된 컨텍스트를 재사용(저단가)·최초 기록(중간 단가). Anthropic류는 명시적 분리, GPT류는 implicit(cached=0.2×input).
- **inverse test-time scaling**: 추론/토큰을 더 써도 정확도가 오르지 않거나 오히려 떨어지는 현상.
- **self-prediction**: 실행 에이전트 자신이 실행 전에 자기 토큰 비용을 추정하는 태스크.
- **shared success/failure subset**: 모든 모델이 공통으로 성공(n=230)·실패(n=100)한 문제 집합. 난이도를 통제해 모델 고유 효율을 비교.
- **Kendall τb**: 순위 상관 계수. 전문가 난이도-실제 토큰 비용 간 0.32(약한 단조 연관).

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 1 | agentic vs reasoning vs chat 3-패널 비교(토큰·비용·비율) | page-region | ★ wiki 권장 (headline) |
| fig02 | 3 | 본문 참조 텍스트 | page-region | (제외, false positive) |
| fig03 | 4 | 문제·런 간 토큰 비용 고변동 | page-region | ★ wiki 권장 (variability) |
| fig04 | 5 | 정확도는 중간 비용에서 정점(inverse scaling) | page-region | ★ wiki 권장 (key finding) |
| fig05 | 5 | 고비용 실행 = 반복 view/modify | page-region | (선택) |
| fig06 | 6 | 전문가 난이도 약한 예측자 (τb=0.32) | page-region | (선택) |
| fig07 | 7 | 모델별 토큰 효율·정확도 trade-off | page-region | ★ wiki 권장 (model efficiency) |
| fig08 | 8 | 파일 액션 overall vs repeated | page-region | (선택) |
| fig09 | 9 | phase별 cache-read 지배 | page-region | ★ wiki 권장 (phase dynamics) |
| fig11 | 10 | round별 비용 스파이크 | page-region | (선택) |
| fig12 | 11 | self-prediction 상관·오버헤드 | page-region | (선택) |
| fig13 | 12 | 체계적 과소추정 | page-region | ★ wiki 권장 (prediction gap) |
| fig14 | 16 | output-token 분석 (Appendix A) | page-region | (선택) |
| fig15 | 26 | in-context 예시 없는 예측 (Appendix D) | page-region | (선택) |
