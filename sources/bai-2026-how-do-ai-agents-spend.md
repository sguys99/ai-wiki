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
    caption: "Figure 1: agentic coding은 code reasoning과 code chat보다 평균 토큰과 평균 비용이 훨씬 크고, 그 차이는 input 토큰 증가에서 온다"
    page: 1
    bbox_norm: [0.1918, 0.6562, 0.7938, 0.8087]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/bai-2026-how-do-ai-agents-spend/fig02.png
    raw: raw/papers/bai-2026-how-do-ai-agents-spend-figures/fig02.png
    caption: "Figure 2: 토큰 비용은 문제 사이에서도, 같은 문제의 반복 실행 사이에서도 분산이 크다 (가장 비싼 문제가 가장 싼 문제보다 약 700만 토큰 더 소비)"
    page: 4
    bbox_norm: [0.1662, 0.1003, 0.8333, 0.2955]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/bai-2026-how-do-ai-agents-spend/fig03.png
    raw: raw/papers/bai-2026-how-do-ai-agents-spend-figures/fig03.png
    caption: "Figure 3: 토큰을 많이 쓴 문제일수록 정확도가 낮고, 같은 문제 안에서는 정확도가 중간 비용에서 정점을 찍은 뒤 포화한다"
    page: 5
    bbox_norm: [0.1667, 0.1003, 0.8333, 0.293]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/bai-2026-how-do-ai-agents-spend/fig04.png
    raw: raw/papers/bai-2026-how-do-ai-agents-spend-figures/fig04.png
    caption: "Figure 4: 같은 문제에서 고비용 실행은 같은 파일을 반복해 보고 고치는 행동과 연관된다"
    page: 5
    bbox_norm: [0.1667, 0.3974, 0.8333, 0.5902]
    strategy: caption-region
    curated: false
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/bai-2026-how-do-ai-agents-spend/fig05.png
    raw: raw/papers/bai-2026-how-do-ai-agents-spend-figures/fig05.png
    caption: "Figure 5: 전문가가 매긴 난이도는 실제 토큰 소비의 약한 예측자다 (Kendall τb 0.32, 난이도 집단별 분포가 크게 겹친다)"
    page: 6
    bbox_norm: [0.1667, 0.1003, 0.8333, 0.2617]
    strategy: caption-region
    curated: false
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/bai-2026-how-do-ai-agents-spend/fig06.png
    raw: raw/papers/bai-2026-how-do-ai-agents-spend-figures/fig06.png
    caption: "Figure 6: 토큰 효율은 모델마다 크게 다르고, 공통 성공 subset과 공통 실패 subset 모두에서 모델 순위가 유지된다"
    page: 7
    bbox_norm: [0.1667, 0.1003, 0.8333, 0.3025]
    strategy: caption-region
    curated: true
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/bai-2026-how-do-ai-agents-spend/fig07.png
    raw: raw/papers/bai-2026-how-do-ai-agents-spend-figures/fig07.png
    caption: "Figure 7: 공통 성공 subset에서 모델별 파일 view 액션과 modify 액션의 전체 횟수 및 반복 횟수"
    page: 8
    bbox_norm: [0.2314, 0.1003, 0.7686, 0.3107]
    strategy: caption-region
    curated: false
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/bai-2026-how-do-ai-agents-spend/fig08.png
    raw: raw/papers/bai-2026-how-do-ai-agents-spend-figures/fig08.png
    caption: "Figure 8: 5개 phase(Setup, Explore, Fix, Validate, Closeout)별 토큰량과 달러 비용 분해"
    page: 9
    bbox_norm: [0.2293, 0.2468, 0.7707, 0.4337]
    strategy: caption-region
    curated: true
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/bai-2026-how-do-ai-agents-spend/fig09.png
    raw: raw/papers/bai-2026-how-do-ai-agents-spend-figures/fig09.png
    caption: "Figure 9: astropy-7336 trajectory의 round별 비용 분해 (cache read는 완만히 누적되고 비용 스파이크는 새 내용을 컨텍스트에 넣는 액션에서 발생)"
    page: 10
    bbox_norm: [0.1828, 0.1003, 0.8171, 0.2994]
    strategy: caption-region
    curated: false
  - id: fig10
    label: Figure 10
    kind: figure
    file: assets/bai-2026-how-do-ai-agents-spend/fig10.png
    raw: raw/papers/bai-2026-how-do-ai-agents-spend-figures/fig10.png
    caption: "Figure 10: 모델별 자기예측 상관(Pearson r)과 예측 오버헤드(실제 작업 비용 대비 예측 비용의 비율)"
    page: 11
    bbox_norm: [0.2056, 0.1003, 0.7428, 0.3058]
    strategy: caption-region
    curated: false
  - id: fig11
    label: Figure 11
    kind: figure
    file: assets/bai-2026-how-do-ai-agents-spend/fig11.png
    raw: raw/papers/bai-2026-how-do-ai-agents-spend-figures/fig11.png
    caption: "Figure 11: 예측 토큰과 실제 토큰의 산점도 (점선이 완전 보정선이며 모든 모델이 input과 output을 함께 과소추정)"
    page: 12
    bbox_norm: [0.1667, 0.1003, 0.8333, 0.2553]
    strategy: caption-region
    curated: true
  - id: fig12
    label: Figure 12
    kind: figure
    file: assets/bai-2026-how-do-ai-agents-spend/fig12.png
    raw: raw/papers/bai-2026-how-do-ai-agents-spend-figures/fig12.png
    caption: "Figure 12: output 토큰 기준 재분석 (Appendix A, 정확도 하락과 반복 파일 액션 증가가 input 결과와 같은 방향)"
    page: 16
    bbox_norm: [0.1661, 0.2712, 0.8358, 0.7153]
    strategy: caption-region
    curated: false
  - id: fig13
    label: Figure 13
    kind: figure
    file: assets/bai-2026-how-do-ai-agents-spend/fig13.png
    raw: raw/papers/bai-2026-how-do-ai-agents-spend-figures/fig13.png
    caption: "Figure 13: in-context 예시 없이 수행한 자기예측 (Appendix D, Sonnet-4.5와 GPT-5.2에서 과소추정이 그대로 유지)"
    page: 26
    bbox_norm: [0.1667, 0.3177, 0.8333, 0.4858]
    strategy: caption-region
    curated: false
  - id: tab01
    label: Table 1
    kind: table
    file: assets/bai-2026-how-do-ai-agents-spend/tab01.png
    raw: raw/papers/bai-2026-how-do-ai-agents-spend-figures/tab01.png
    caption: "Table 1: agent trajectory의 5개 phase 정의와 라운드 비중 (Sonnet-4.5 실행의 전체 라운드 기준)"
    page: 9
    bbox_norm: [0.2583, 0.265, 0.768, 0.4168]
    strategy: table-region
    curated: false
  - id: tab02
    label: Table 2
    kind: table
    file: assets/bai-2026-how-do-ai-agents-spend/tab02.png
    raw: raw/papers/bai-2026-how-do-ai-agents-spend-figures/tab02.png
    caption: "Table 2: Figure 9의 trajectory에서 뽑은 대표 라운드 6개를 지배 비용 유형별로 묶은 표"
    page: 10
    bbox_norm: [0.1725, 0.37, 0.8304, 0.4695]
    strategy: table-region
    curated: false
  - id: tab03
    label: Table 3
    kind: table
    file: assets/bai-2026-how-do-ai-agents-spend/tab03.png
    raw: raw/papers/bai-2026-how-do-ai-agents-spend-figures/tab03.png
    caption: "Table 3: in-context 예시 없는 자기예측의 상관 지표 (Appendix D, 예시를 준 본 설정보다 상관이 크게 낮다)"
    page: 26
    bbox_norm: [0.1662, 0.1352, 0.836, 0.2536]
    strategy: table-region
    curated: false
---

## 한 줄 요약 (One-line Summary)

SWE-bench Verified 500 문제를 OpenHands 위에서 8개 frontier LLM으로 각 4회 실행한 trajectory를 분석해, agentic coding의 비용이 input 토큰에서 나오는 구조, 토큰을 더 써도 정확도가 오르지 않는 양상, 모델별 효율 격차, 전문가 난이도와 실제 비용의 어긋남, 에이전트가 실행 전 자기 비용을 예측하지 못하고 체계적으로 과소추정하는 문제를 처음으로 체계적으로 규명한 논문이다.

## 1. 자료 정보 (Document Information)

- **제목**: How Do AI Agents Spend Your Money? Analyzing and Predicting Token Consumption in Agentic Coding Tasks
- **저자**: Longju Bai(U. Michigan), Zhemin Huang(Stanford, Microsoft AI), Xingyao Wang(All Hands AI), Jiao Sun(Google DeepMind), Rada Mihalcea(U. Michigan), Erik Brynjolfsson(Stanford), Alex Pentland(Stanford, MIT), Jiaxin Pei(Stanford, 교신저자)
- **arXiv**: 2604.22750v2 (2026-04-29, cs.CL). 본문 13페이지, 참고문헌 2페이지, 부록 A부터 D까지 11페이지로 총 26페이지.
- **실험 세팅**: OpenHands 에이전트 프레임워크와 SWE-bench Verified(실세계 GitHub 이슈 500 문제). 각 문제를 8개 모델로 4회 독립 실행. 모든 토큰 지표는 문제별 4회 평균값이다.
- **평가 모델(8종)**: Claude Sonnet-3.7, Sonnet-4, Sonnet-4.5, GPT-5, GPT-5.2, Qwen3-Coder-480B-A35B-Instruct, Kimi-K2, Gemini-3-Pro-Preview. 아키텍처, 학습 패러다임, 배포 형태가 서로 다르고 코딩 성능과 실행 안정성이 확보된 모델을 골랐다고 밝힌다.
- **공개**: 전체 실행 trajectory, inference log, 중간 산출물, 평가 결과, 메타데이터, 실험 파이프라인을 프로젝트 웹사이트에 공개한다.

## 2. 주요 기여 (Key Contributions)

1. **agentic coding 토큰 소비에 대한 최초의 대규모 실증 연구**. 실험에서 나온 전체 trajectory를 오픈소스로 공개해 후속 연구가 재현할 수 있게 했다.
2. 에이전트 토큰 소비 패턴을 정량 분석해 agent pricing과 모델 개발에 시사점을 제시한다.
3. **pre-execution 토큰 소비 예측 태스크를 정식화**하고 frontier 모델 8종을 벤치마크해, 실행 전 비용 추정에서 드러나는 근본적 역량 격차를 보인다.

핵심 발견 5가지를 논문은 다음과 같이 정리한다.

1. agentic 작업은 유일하게 비싸다. 단일 라운드 code reasoning 대비 3500배, 멀티라운드 code chat 대비 1200배 토큰을 쓴다(초록은 이를 1000배 규모로 요약한다). output이 아니라 **input 토큰**이 비용을 지배하며, token caching을 켜도 마찬가지다.
2. 토큰 사용은 변동이 크고 본질적으로 확률적이다. 같은 문제의 서로 다른 실행이 총 토큰에서 최대 30배까지 벌어진다. 그리고 토큰을 더 쓴다고 정확도가 오르지 않으며, 정확도는 중간 비용에서 정점을 찍고 그 위에서는 포화한다.
3. 모델별 효율 차이가 크다. 같은 문제 집합에서 Kimi-K2와 Claude Sonnet-4.5는 GPT-5보다 평균 150만 토큰 이상을 더 쓴다.
4. 전문가가 매긴 난이도는 실제 토큰 비용과 약하게만 일치한다(Kendall τb 0.32, 95% CI 0.25에서 0.38).
5. frontier 모델은 자기 토큰 사용량을 정확히 예측하지 못하고(상관 최고 0.39), 실제 비용을 **체계적으로 과소추정**한다.

논문이 출발점으로 삼는 문제 인식은 현행 코딩 에이전트 가격 정책에 대한 두 가지 비판이다. 첫째는 투명성 부재로, 사용자는 작업이 끝나기 전까지 최종 비용을 알 수 없다. 둘째는 완료 보장 부재로, 작업이 실패해도 토큰 비용은 그대로 청구된다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 데이터 수집

OpenHands로 SWE-bench Verified 500 문제를 8개 모델로 각 4회 실행했다. 각 문제에서 에이전트는 사람의 개입 없이 여러 라운드를 진행하며, 한 라운드는 LLM 응답, tool call, 실행으로 구성된다. 직전까지의 프롬프트와 완성 결과를 포함한 전체 대화 이력이 다음 라운드로 변경 없이 이어지는데, 이것이 agentic 작업에서 input 토큰이 폭증하는 구조적 원인이다.

구조화된 JSON trajectory를 파싱해 라운드마다 기록된 usage 정보에서 종류별 토큰 비용, 금전 비용, action type을 뽑았다. tool 사용과 파일 접근 패턴 같은 기능적 행동과 토큰 수준 동역학을 함께 포착하기 위한 설계다.

### 비용 계산 (Appendix B)

토큰 종류마다 단가가 달라 같은 총 토큰 수가 전혀 다른 금액이 된다. output 토큰이 가장 비싸고, 새 프롬프트를 처리하는 표준 input 토큰이 중간, 이미 처리한 컨텍스트를 재사용하는 cached input 토큰이 가장 싸다.

Anthropic처럼 캐시를 명시적으로 노출하는 제공자는 cache creation(나중에 재사용할 컨텍스트를 캐시에 기록)과 cache read(다음 라운드에서 할인 단가로 가져오기)로 나뉜다. 이 경우 라운드 비용은 네 항의 합이다.

```
Input_non-cached = Input_total - CacheRead
Cost_round = Input_non-cached x r_in + Output x r_out
           + CacheCreation x r_cache_create + CacheRead x r_cache_read
```

`r_cache_create`는 캐시 보존 기간에 따라 달라지는데 논문은 5분 write rate를 일관되게 썼다.

GPT-5 계열은 implicit caching을 쓴다. API가 cached input 토큰을 자동으로 보고하고 별도의 cache creation 항이 없다. 논문이 적은 공식 단가는 input 100만 토큰당 $1.250, cached input 100만 토큰당 $0.125, output 100만 토큰당 $10.000이다. 그런데 논문이 제시한 비용 식은 cached input을 base input 단가의 0.2배로 계산한다.

```
Input_non-cached = Input_total - CacheRead_implicit
Cost_round = Input_non-cached x r_in + CacheRead_implicit x 0.2 r_in + Output x r_out
```

여기서 단가표와 식이 어긋난다. $0.125는 $1.250의 0.1배인데 식은 0.2배를 쓴다. 논문 안에서 해소되지 않은 불일치이므로 GPT 계열의 절대 금액을 인용할 때는 유의해야 한다.

### 난이도 라벨 처리

SWE-bench Verified는 전문 개발자의 예상 소요 시간으로 난이도를 매긴 라벨을 제공한다("<15 min", "15 min – 1 hour", "1–4 hours", ">4 hours"). ">4 hours"에 3개 문제만 있어 "1–4 hours"와 합쳐 ">1 hour"로 보고했다. 결과적으로 세 집단이 된다.

### phase 분할

trajectory를 에이전트의 기능적 행동에 따라 다섯 단계로 나눴다. 각 단계의 라운드 비중은 Setup 9.98%, Explore 30.37%, Fix 33.53%, Validate 16.59%, Closeout 9.53%다. Fix와 Explore가 전체 라운드의 약 3분의 2를 차지한다. 이 phase 분석은 Claude Sonnet-4.5 실행 500건을 집계한 사례 연구다.

### self-prediction 태스크

실행 에이전트 자신을 예측기로 쓴다. 두 가지 실용적 이유를 든다. 첫째, 실행 에이전트는 비용을 좌우하는 정보(탐색할 저장소 구조, 호출할 tool, 투입할 planning 깊이)에 특권적으로 접근한다. 별도의 예측기는 이 컨텍스트를 처음부터 재구성해야 한다. 둘째, 추가 모델이나 학습 파이프라인, 인프라가 필요 없어 기존 시스템에 곧바로 결합할 수 있다.

에이전트는 tool 호출과 상호작용 능력을 그대로 유지한 채 저장소를 살펴보고 예비 명령을 실행하지만, 수정을 시도하는 대신 토큰 추정치를 내라는 지시를 받는다. fine-grained 프롬프트는 작업을 단계로 쪼개 input 토큰, output 토큰, 총비용을 따로 추정하게 하고, 사람이 작성한 worked example 1개를 in-context로 붙인다. 출력은 `predicted_input_tokens`, `predicted_output_tokens`, `predicted_total_tokens`, `confidence`(0에서 1), `breakdown_by_phase`를 담은 JSON이며 `finish` tool로 제출한다. 단위는 토큰 정수이고 100단위나 1000단위 반올림을 금지해 step size 1을 요구한다. 예산 제약 때문에 모델당 3회 독립 예측을 같은 500문제에 대해 수행했다.

평가 지표는 두 가지다. 예측 토큰과 실제 토큰 사이의 Pearson 상관, 그리고 실제 작업 비용 대비 예측 비용의 비율로 정의한 **오버헤드**다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 작업 유형별 비용 (Figure 1)

| 작업 유형 | 평균 토큰 | 평균 비용 | input/output 비율 |
|---|---|---|---|
| code reasoning (CRUXEval) | 1,190개 | $0.016 | 0.16 |
| code chat (Code-feedback ShareGPT) | 3,390개 | $0.023 | 1.33 |
| agentic coding (SWE-bench Verified) | 417만 개 | $1.857 | 153.85 |

agentic coding의 input/output 비율 153.85는 code chat의 1.33보다 100배 이상 크다. 여러 출처의 정보가 누적되고 같은 컨텍스트가 반복해서 모델에 들어가기 때문이며, caching을 켜도 비용 차이가 남는다.

### 변동성 (Figure 2)

- 문제 사이: 가장 비싼 문제가 가장 싼 문제보다 평균 약 700만 토큰을 더 쓴다. 고비용 문제일수록 실행 간 분산도 커서, 복잡한 작업에서 에이전트 행동이 더 불안정해진다.
- 같은 문제 반복: 모델별 최대 대비 최소 비용 비율은 평균 약 2배다. 토큰 기준으로 Sonnet-4.5가 약 1.45배로 가장 안정적이고 Sonnet-3.7이 약 3.6배로 가장 불안정하다. 다만 오차 막대가 커서 초록이 말하는 최대 30배는 이 평균이 아니라 분포 꼬리의 관측값이다.

### 비용과 정확도 (Figure 3, Figure 4)

문제 수준에서는 input 토큰을 많이 쓴 문제일수록 집단 정확도가 낮고, 이 패턴은 8개 모델에서 일관되다. 어려운 작업이 복잡해서 토큰을 더 쓴다는 해석이 자연스럽다. output 토큰으로 다시 계산해도 같은 경향이다(Appendix A).

같은 문제를 4회 실행한 뒤 비용 순으로 MinCost, LowerCost, UpperCost, MaxCost로 묶으면 정확도는 단조 증가하지 않는다. mixed-effects 회귀로 추정한 MinCost 대비 정확도 계수는 LowerCost +0.050, UpperCost +0.048, MaxCost +0.039이다. LowerCost와 UpperCost가 p<0.01, MaxCost가 p<0.05 수준으로 유의하다. 즉 최소 비용보다는 모두 낫지만 정점은 LowerCost이고 그 위로는 계수가 완만히 낮아진다. 본문과 Figure 3b 캡션은 이를 포화로, 서론은 최고 비용 구간의 하락으로 서술한다.

고비용 실패의 행동 원인으로 반복 파일 액션을 지목한다. MinCost 대비 반복 modify 계수는 LowerCost 0.98, UpperCost 1.88, MaxCost 3.63이고 반복 view 계수는 LowerCost 0.61, UpperCost 1.17, MaxCost 1.97이다. 두 지표 모두 UpperCost에서 p<0.01, MaxCost에서 p<0.001로 유의하다. 논문은 모든 고비용 실행이 중복 때문은 아니라고 한정하면서도, 이 패턴이 정확도와 비용의 역관계에 대한 구체적 행동 설명을 제공한다고 본다.

### 전문가 난이도와 실제 비용 (Figure 5)

Kendall τb 0.32(95% CI 0.25에서 0.38)로 순위 단조 연관은 통계적으로 실재하지만 완만하다. 분포가 크게 겹친다.

- "<15 min" 라벨 작업의 6.7%가 ">1 hour" 평균보다 더 많은 토큰을 썼다.
- ">1 hour" 라벨 작업의 11.1%가 "<15 min" 평균보다 더 적은 토큰을 썼다.
- 집단 평균은 "<15 min"이 약 180만 토큰, ">1 hour"가 약 300만 토큰 수준이다(Figure 5의 기준선 위치).

사람이 쉽다고 본 작업이 모델에게는 광범위한 추론과 탐색을 요구할 수 있고, 반대로 어려운 문제가 모델의 사전 지식이나 탐색 전략 덕에 효율적으로 풀릴 수 있다.

### 모델별 효율 (Figure 6, Figure 7)

Figure 6a에서 읽은 500문제 평균값은 다음과 같다. 토큰 예산이 큰 모델이 대체로 정확도가 높지만 이 교환 관계를 다루는 솜씨는 모델마다 크게 다르다.

| 모델 | 평균 총 토큰 | 평균 정확도 |
|---|---|---|
| GPT-5 | 약 1.0M | 약 0.60 |
| GPT-5.2 | 약 1.35M | 약 0.63 |
| Claude Sonnet-3.7 | 약 2.0M | 약 0.60 |
| Gemini-3-Pro-Preview | 약 2.2M | 약 0.59 |
| Qwen3-Coder-480B | 약 2.35M | 약 0.66 |
| Claude Sonnet-4 | 약 2.8M | 약 0.69 |
| Claude Sonnet-4.5 | 약 2.8M | 약 0.72 |
| Kimi-K2 | 약 3.25M | 약 0.55 |

GPT-5와 GPT-5.2는 낮은 비용으로 준수한 정확도를 낸다. Sonnet-4.5, Sonnet-4, Qwen3-Coder-480B는 고비용 구간에서 동작한다. Kimi-K2는 비용이 가장 크면서 정확도가 가장 낮은 outlier다.

모든 모델이 공통으로 성공한 subset(n=230)과 공통으로 실패한 subset(n=100)에서도 모델별 토큰 사용량의 상대 순위가 유지된다. 격차가 문제 난이도나 특정 모델이 더 어려운 문제를 맡은 탓이 아니라 모델의 행동 성향에서 온다는 근거다. 모든 모델이 실패 subset에서 토큰을 더 쓰지만 증가폭은 크게 다르다. GPT-5는 0.5M 미만으로 완만하게 오르고 Kimi-K2는 약 2M 늘어난다. 작업이 풀리지 않는다는 것을 알아채고 조기에 멈추는 장치가 없어 탐색과 재시도, 컨텍스트 재독을 계속하기 때문이라고 해석한다. 다만 Figure 6b에서 GPT-5.2의 증가폭은 약 1.1M으로 읽히므로, GPT-5와 GPT-5.2를 함께 0.5M 미만으로 묶은 본문 서술은 GPT-5에만 맞는다.

공통 성공 subset의 파일 액션 횟수는 다음과 같다(Figure 7).

| 모델 | view 전체 | view 반복 | modify 전체 | modify 반복 |
|---|---|---|---|---|
| Claude Sonnet-3.7 | 6.86 | 3.52 | 8.90 | 4.37 |
| Claude Sonnet-4 | 14.20 | 7.17 | 10.70 | 4.45 |
| Claude Sonnet-4.5 | 11.24 | 5.80 | 8.95 | 2.48 |
| Qwen3-Coder-480B | 15.42 | 7.93 | 10.20 | 3.18 |
| Gemini-3-Pro-Preview | 7.14 | 3.54 | 7.32 | 4.11 |
| Kimi-K2 | 15.27 | 7.92 | 14.02 | 7.05 |
| GPT-5 | 2.38 | 0.65 | 1.93 | 0.82 |
| GPT-5.2 | 3.18 | 1.10 | 2.00 | 0.87 |

토큰 효율이 좋은 GPT-5와 GPT-5.2는 파일 view와 modify 자체가 적고 반복도 적다. Qwen3-Coder-480B, Sonnet-4, Kimi-K2는 액션이 많고 view 액션의 약 절반이 같은 파일 반복이다(각각 51%, 50%, 52%). 다만 modify 반복 비율은 Kimi-K2 50%, Sonnet-4 42%, Qwen3-Coder-480B 31%로 갈리므로, 본문의 "약 50% 반복"은 view 쪽에 더 정확히 들어맞는다. 논문은 모델 효율이 액션 횟수만이 아니라 그 액션이 얼마나 효과적으로 수행되는지에 달려 있다고 정리한다.

### phase별 동역학 (Table 1, Figure 8)

| phase | 설명 | 라운드 비중 |
|---|---|---|
| Setup | 작업 계획, 환경 구성, 최초 재현 | 9.98% |
| Explore | 코드 검색, 파일 조사, 근본 원인 분석 | 30.37% |
| Fix | 코드 수정, 디버깅 반복, 패치 정제 | 33.53% |
| Validate | 테스트, 회귀 검사, 검증 | 16.59% |
| Closeout | 최종 확인, 정리, 요약 출력 | 9.53% |

토큰량으로 보면 cache-read input 토큰이 모든 phase에서 압도적 최대 범주다. Fix에서 약 100만 토큰, Validate 약 64만, Explore 약 54만, Closeout 약 42만, Setup 약 7.4만 수준이다. non-cached input과 cache creation은 서로 거의 붙어 움직이는데, 새로 들어온 컨텍스트가 대화에 진입하는 즉시 캐시된다는 해석과 맞는다. output 토큰은 절대량으로는 Fix에서 가장 크지만(약 8,500개), 같은 phase 안의 다른 범주와 비교한 상대 비중은 planning 생성이 몰린 Setup에서 가장 높다.

달러 비용으로 본 phase별 분해는 다음과 같다(Figure 8b에서 읽은 근사값, 단위 USD).

| phase | output | cache creation | non-cached input | cache read |
|---|---|---|---|---|
| Setup | 0.027 | 0.029 | 0.024 | 0.023 |
| Explore | 0.094 | 0.070 | 0.056 | 0.162 |
| Fix | 0.130 | 0.072 | 0.058 | 0.303 |
| Validate | 0.060 | 0.034 | 0.028 | 0.195 |
| Closeout | 0.038 | 0.017 | 0.014 | 0.125 |

output 토큰이 cache read보다 토큰당 약 80배 비싼데도 Explore부터 Closeout까지는 cache read가 최대 비용 항목이다. 누적된 컨텍스트의 물량이 단가 차이를 압도한다는 근거다. 단 Setup에서는 네 항목이 $0.023에서 $0.029 사이에 몰려 있고 cache read가 오히려 가장 작다. 따라서 "모든 phase에서 cache read가 지배적 비용"이라는 본문 서술은 Setup에 대해서는 Figure 8b와 맞지 않으며, Figure 8 캡션이 쓴 "input 토큰이 토큰량과 비용을 모두 지배한다"는 표현이 세 input 항목의 합계 기준으로 정확하다.

### round별 동역학 (Figure 9, Table 2)

astropy-7336 문제의 Sonnet-4.5 trajectory 31라운드를 사례로 분해했다. cache read 비용은 컨텍스트가 누적되며 완만히 증가해 라운드마다 비교적 안정적인 기준선을 만든다. 라운드 총비용은 단조 증가와 거리가 멀고, 스파이크는 컨텍스트에 새 내용을 들이는 특정 액션에서 발생한다. 저장소 탐색, 파일 생성, 테스트 실행, 최종 요약이 그런 액션이다.

| round | 지배 비용 유형 | tool | 액션 요약 |
|---|---|---|---|
| 1 | output | think | 이슈에 대한 계획과 추론 |
| 10 | non-cached input | file_editor (view + create) | 테스트 파일 읽고 재현 스크립트 생성 |
| 17 | output | file_editor (create) | 디버깅용 테스트 스크립트 작성 |
| 23 | non-cached input | terminal (pytest) + file_editor | 테스트 실행과 검증 스크립트 생성 |
| 28 | non-cached input | terminal (pytest + cleanup) | 테스트 실행과 파일 정리 |
| 31 | output | finish | 수정 내용 최종 요약 |

Figure 9에서 읽으면 라운드 비용은 최소 약 $0.004(3라운드)에서 최대 약 $0.027(28라운드) 사이에 분포한다. cache read 기준선은 1라운드 약 $0.001에서 30라운드 약 $0.011로 커진다. phase별 역할과도 맞아떨어진다. Setup에서는 추론과 계획이라 output이 비용을 주도하고, Explore에서 저장소 조사와 코드 읽기가 대량의 내용을 컨텍스트에 끌어오면서 input이 비용을 넘겨받는다. Fix, Validate, Closeout에서는 스크립트 생성과 코드 수정 때문에 output이 다시 올라오고 input은 테스트 결과와 실행 출력을 읽는 비용을 반영한다.

### self-prediction 결과 (Figure 10, Figure 11)

| 모델 | input 상관 r | output 상관 r | 오버헤드(예측 비용 / 작업 비용) |
|---|---|---|---|
| Claude Sonnet-3.7 | 0.24 | 0.21 | 2.29 |
| Claude Sonnet-4 | 0.28 | 0.33 | 2.09 |
| Claude Sonnet-4.5 | 0.34 | **0.39** | 0.32 |
| Qwen3-Coder-480B | 0.21 | 0.21 | 0.52 |
| Gemini-3-Pro-Preview | 0.05 | 0.04 | 0.36 |
| Kimi-K2 | **0.38** | 0.12 | 0.19 |
| GPT-5 | 0.26 | 0.32 | 0.47 |
| GPT-5.2 | 0.24 | 0.26 | 0.05 |

Claude Sonnet 계열은 세대가 올라갈수록 상관이 꾸준히 개선되어 Sonnet-4.5의 output 예측에서 0.39로 정점을 찍는다. GPT-5, GPT-5.2, Kimi-K2, Qwen3-Coder는 비슷한 수준이고 Gemini-3-Pro-Preview는 input과 output 모두에서 크게 뒤진다. input 예측이 output 예측보다 어렵다는 것이 논문의 서술인데, 표에서 Sonnet-4, Sonnet-4.5, GPT-5, GPT-5.2 네 모델이 그 방향이고 Sonnet-3.7과 Gemini-3-Pro-Preview는 차이가 0.01에서 0.03으로 미미하며 Kimi-K2는 input이 0.38로 오히려 훨씬 높다. Kimi-K2가 컨텍스트 팽창에 더 민감할 가능성을 논문은 언급한다.

오버헤드와 정확도는 단조 관계가 아니다. Sonnet-3.7과 Sonnet-4는 작업 비용의 2배가 넘는 비용을 예측에 쓰면서도 최고 상관을 얻지 못한다. Sonnet-4.5는 0.32배 비용으로 최고 상관을 내고 GPT-5.2는 오버헤드를 6% 아래로 줄이면서 중간 수준 상관을 유지한다.

방향성 문제가 더 심각하다. 모든 모델에서 대부분의 점이 완전 보정선 아래에 놓여, 실제로 필요한 토큰을 **일관되게 과소추정**한다. 편향은 input 토큰에서 특히 두드러진다. 실제 값이 수백만 단위로 커지는데도 예측은 낮은 구간에 눌려 있다.

### in-context 예시 제거 (Appendix D)

과소추정이 in-context 예시 때문에 생긴 anchoring인지 확인하려고 예시 없이 다시 실행했다. 대부분의 모델이 예시 없이는 토큰 추정 지시를 일관되게 따르지 못해, 지시를 계속 지킨 Sonnet-4.5와 GPT-5.2만 보고한다.

| 모델 | 토큰 종류 | 실제값 상관 | 절대오차와 작업 비용 상관 | 예측 비용과 작업 비용 상관 |
|---|---|---|---|---|
| Sonnet-4.5 | input | 0.1355 | 0.1155 | 0.1185 |
| Sonnet-4.5 | output | 0.1229 | -0.4563 | 0.1185 |
| GPT-5.2 | input | 0.1796 | 0.2243 | 0.2461 |
| GPT-5.2 | output | 0.2130 | 0.0822 | 0.2461 |

예시가 있는 본 설정(Sonnet-4.5 input 0.34, output 0.39, GPT-5.2 input 0.24, output 0.26)과 비교하면 상관이 절반 아래로 떨어진다. 과소추정은 사라지지 않고 오히려 심해진다. 따라서 하향 편향은 예시가 유도한 anchoring이 아니고, 예시는 보정을 개선하는 역할을 하며 long-horizon 토큰 성장을 예측하는 근본적 난이도는 그대로 남는다는 결론이다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **모델 범위**: 8개 frontier 모델은 기존 연구 기준으로 넓은 표본이지만 여전히 agentic 모델 지형의 일부다. 전체 실행 trajectory 수집이 연산 비용이 커서 포함 모델 수가 제약되었다. 관찰된 질적 패턴은 테스트한 모델 전반에서 일관되지만, 더 넓은 아키텍처와 에이전트 설계로 검증하면 일반성이 강화된다. 이를 위해 실험 파이프라인을 공개했다.
- **user transparency**: 정확한 point estimate는 현재 모델 수준에서 비현실적이다. 다만 고비용 작업을 가려내는 정도의 coarse 신호만으로도 제공자가 조기 경고를 보내거나 명시적 사용자 승인을 요구하거나 대안 실행 모드를 제안할 수 있다.
- **agent pricing**: 구독 모델은 사용량이 예측 가능하고 유계인 제품(ChatGPT 등)에서 작동한다. agentic 작업은 이 가정을 깨뜨려, 단순한 문제도 멀티스텝 추론과 tool use로 큰 토큰 예산을 소진할 수 있다. input 토큰의 변동이 크고 trajectory가 본질적으로 확률적이므로 순수 upfront pricing은 어렵고, 실행 전 추정이 더 신뢰할 만해질 때까지는 consumption-based pricing이 가장 현실적인 선택으로 남는다. budget-aware tool-use policy(Liu et al., 2025)처럼 런타임에서 토큰 제약을 강제하는 보완 장치가 비용 변동성을 줄일 수 있다.
- **self-prediction의 실용성**: 상관은 우연 수준을 넘지만 인스턴스 단위 정확 비용 추정에는 여전히 부족하다. 예측 자체가 지연과 오버헤드를 수반해, 대화형이나 시간 제약 환경에서는 정당화하기 어렵다. 정확성, 효율성, 실행과의 통합을 함께 달성하는 self-prediction은 열린 문제다.

## 6. 관련 연구 (Related Work)

- **agentic 프레임워크와 벤치마크**: OpenHands(Wang et al., 2025c), SWE-bench(Jimenez et al., 2024)와 SWE-bench Verified(Chowdhury et al., 2024), AgentBench(Liu et al., 2023b), RepoBench(Liu et al., 2023a), Voyager(Wang et al., 2023), CodeAct(Wang et al., 2024), Codex(OpenAI, 2025).
- **비교 대상 데이터셋**: code reasoning은 CRUXEval(Gu et al., 2024), code chat은 Code-feedback ShareGPT(Crystalcare AI, 2023).
- **토큰 분포와 가격**: Tokenomics(Salim et al., 2026), AgentTaxo의 멀티에이전트 토큰 분포 분석(Wang et al., 2025b), reasoning 모델의 price reversal 현상(Chen et al., 2026), 토큰 가격 최적화 논의(Kinde, 2024).
- **inverse test-time scaling**: Snell et al. 2024, Wu et al. 2025, Gema et al. 2025(inverse scaling in test-time compute), Zeng et al. 2025, Yang et al. 2025, OptimalThinkingBench(Aggarwal et al., 2025).
- **효율 지향 에이전트**: SWE-effi(Fan et al., 2025), Efficient Agents(Wang et al., 2025a), budget-aware tool-use(Liu et al., 2025).
- **자기 모델링과 보정**: Self-Refine(Madaan et al., 2023), 언어 모델의 보정을 다룬 "Language models (mostly) know what they know"(Kadavath et al., 2022).

## 7. 용어집 (Glossary)

- **agentic coding**: 에이전트가 저장소를 읽고 이슈를 추론하며 tool을 호출해 여러 라운드에 걸쳐 문제를 스스로 푸는 작업. 라운드마다 전체 대화 이력이 그대로 누적된다.
- **input/output ratio**: 입력 토큰 대 출력 토큰의 비율. agentic coding에서 컨텍스트 반복 주입 때문에 153.85까지 커진다.
- **cache read / cache creation**: prompt caching에서 이미 처리한 컨텍스트를 할인 단가로 재사용하는 것이 cache read, 나중에 재사용할 컨텍스트를 캐시에 기록하는 것이 cache creation. Anthropic 계열은 둘을 명시적으로 나누고 GPT-5 계열은 implicit caching으로 cached input만 보고한다.
- **inverse test-time scaling**: 추론 단계나 토큰을 더 써도 정확도가 오르지 않거나 오히려 떨어지는 현상.
- **self-prediction**: 실행 에이전트 자신이 실행 전에 자기 토큰 비용을 추정하는 태스크.
- **prediction overhead**: 실제 작업 비용 대비 예측 비용의 비율. 1을 넘으면 예측이 실행보다 비싸다.
- **shared success / shared failure subset**: 8개 모델이 모두 성공한 문제 집합(n=230)과 모두 실패한 문제 집합(n=100). 난이도를 통제해 모델 고유 효율을 비교한다.
- **Kendall τb**: 순위 상관 계수. 전문가 난이도와 실제 토큰 비용 사이에서 0.32로 약한 단조 연관을 보인다.
- **MinCost / LowerCost / UpperCost / MaxCost**: 같은 문제의 4회 실행을 비용 순으로 나눈 4분위 라벨. MinCost가 회귀의 기준 범주다.

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 1 | agentic, code reasoning, code chat 3패널 비교(토큰, 비용, 비율) | caption-region | ★ wiki 권장 (headline) |
| fig02 | 4 | 문제 간 및 실행 간 토큰 비용 고변동 | caption-region | ★ wiki 권장 (variability) |
| fig03 | 5 | 정확도는 중간 비용에서 정점(inverse scaling) | caption-region | ★ wiki 권장 (key finding) |
| fig04 | 5 | 고비용 실행의 반복 view와 modify | caption-region | (선택) |
| fig05 | 6 | 전문가 난이도의 약한 예측력 (Kendall τb 0.32) | caption-region | (선택) |
| fig06 | 7 | 모델별 토큰 효율과 정확도 교환 관계 | caption-region | ★ wiki 권장 (model efficiency) |
| fig07 | 8 | 파일 액션 전체 대비 반복 횟수 | caption-region | (선택) |
| fig08 | 9 | phase별 cache read 비중 | caption-region | ★ wiki 권장 (phase dynamics) |
| fig09 | 10 | round별 비용 스파이크 | caption-region | (선택) |
| fig10 | 11 | self-prediction 상관과 오버헤드 | caption-region | (선택) |
| fig11 | 12 | 체계적 과소추정 | caption-region | ★ wiki 권장 (prediction gap) |
| fig12 | 16 | output 토큰 재분석 (Appendix A) | caption-region | (선택) |
| fig13 | 26 | in-context 예시 없는 예측 (Appendix D) | caption-region | (선택) |
| tab01 | 9 | 5개 phase 정의와 라운드 비중 | table-region | (선택) |
| tab02 | 10 | 대표 라운드 6개의 지배 비용 유형 | table-region | (선택) |
| tab03 | 26 | 예시 없는 예측의 상관 지표 (Appendix D) | table-region | (선택) |
