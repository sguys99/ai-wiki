---
title: "What Is a Looped Transformer? Complete Guide to Recurrent Depth and OpenAI's Astra"
type: article
year: 2026
category: llms
raw_path: raw/articles/tosea-2026-what-is-a-looped-transformer.md
raw_filename: "tosea-2026-what-is-a-looped-transformer.md"
source_collection: external
author: "Tosea"
url: "https://tosea.ai/blog/looped-transformer-recurrent-depth-astra-guide"
publisher: "Tosea.ai Blog"
tags: [looped-transformer, recurrent-depth, cot-monitorability, ai-safety, gpt-6-astra]
figures:
  - id: fig01
    file: assets/tosea-2026-what-is-a-looped-transformer/fig01.png
    raw: raw/articles/tosea-2026-what-is-a-looped-transformer-figures/fig01.png
    caption: "OpenAI Path to Astra 공지 화면. Astra가 Preparedness Framework의 Critical 사이버보안 임계값에 도달한 첫 모델이라는 내용"
    strategy: fetched
    curated: false
  - id: fig02
    file: assets/tosea-2026-what-is-a-looped-transformer/page-full.png
    raw: raw/articles/tosea-2026-what-is-a-looped-transformer-figures/page-full.png
    caption: "Tosea 글 전체 페이지 스크린샷"
    strategy: screenshot
    curated: false
  - id: fig03
    file: assets/tosea-2026-what-is-a-looped-transformer/crop01.png
    raw: raw/articles/tosea-2026-what-is-a-looped-transformer-figures/crop01.png
    caption: "Tosea 글 화면 영역 크롭 01 (crop01.png)"
    strategy: crop
    curated: false
  - id: fig04
    file: assets/tosea-2026-what-is-a-looped-transformer/crop02.png
    raw: raw/articles/tosea-2026-what-is-a-looped-transformer-figures/crop02.png
    caption: "Tosea 글 화면 영역 크롭 02 (crop02.png)"
    strategy: crop
    curated: false
  - id: fig05
    file: assets/tosea-2026-what-is-a-looped-transformer/crop03.png
    raw: raw/articles/tosea-2026-what-is-a-looped-transformer-figures/crop03.png
    caption: "Tosea 글 화면 영역 크롭 03 (crop03.png)"
    strategy: crop
    curated: false
  - id: fig06
    file: assets/tosea-2026-what-is-a-looped-transformer/crop04.png
    raw: raw/articles/tosea-2026-what-is-a-looped-transformer-figures/crop04.png
    caption: "Tosea 글 화면 영역 크롭 04 (crop04.png)"
    strategy: crop
    curated: false
  - id: fig07
    file: assets/tosea-2026-what-is-a-looped-transformer/crop05.png
    raw: raw/articles/tosea-2026-what-is-a-looped-transformer-figures/crop05.png
    caption: "Tosea 글 화면 영역 크롭 05 (crop05.png)"
    strategy: crop
    curated: false
  - id: fig08
    file: assets/tosea-2026-what-is-a-looped-transformer/crop06.png
    raw: raw/articles/tosea-2026-what-is-a-looped-transformer-figures/crop06.png
    caption: "Tosea 글 화면 영역 크롭 06 (crop06.png)"
    strategy: crop
    curated: false
---

## 한 줄 요약 (One-line Summary)

Tosea.ai 블로그가 The Information의 "OpenAI Astra는 recurrent depth를 쓴다" 보도 직후 looped transformer의 원리, Huginn(Geiping 2025)의 반복 횟수별 벤치마크, 연구 계보, 프런티어 연구소의 동기, chain-of-thought monitorability 논쟁, Astra 관련 주장의 확인 여부를 정리한 가이드 글이다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 제목 | What Is a Looped Transformer? Complete Guide to Recurrent Depth and OpenAI's Astra |
| 저자 | Tosea (tosea.ai 블로그, 개인 저자명 없음) |
| 발행일 | 2026-09-02 |
| URL | https://tosea.ai/blog/looped-transformer-recurrent-depth-astra-guide |
| 수집 | 2026-10-19, `fetch_article.py` jina tier, 본문 약 2만 6천 자 |
| 비고 | 본문의 SVG 도식 2장(구조 비교도, 반복 횟수별 막대그래프)은 수집되지 않았고 OpenAI 공지 스크린샷 1장만 남았다. 마지막 절 하나는 자사 슬라이드 생성 서비스 홍보 성격이다 |

## 2. 주요 기여 (Key Contributions)

- looped transformer가 무엇인지, 연구가 실제로 보여 준 것이 무엇인지, Astra에 대해 무엇이 확인됐고 무엇이 보도나 추측인지를 분리해 정리한다.
- Huginn 3.5B의 반복 횟수 r = 1, 8, 16, 32별 벤치마크 수치와 동일 데이터 고정 깊이 baseline 대조 결과를 표로 제시한다.
- 2018~2025년 연구 계보(Universal Transformers, ALBERT, Coconut, Huginn, Mixture-of-Recursions, Ouro)를 정리한다.
- 2025년 7월 CoT monitorability 입장 논문의 "Novel architectures" 절을 인용해, Astra 보도가 안전 논쟁으로 번진 이유를 설명한다.
- Astra 관련 주장 10개를 확인, 보도, 추측, 미상으로 분류한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 보도와 반응

2026년 9월 1일 The Information은 OpenAI의 차기 모델 Astra가 recurrent depth를 쓴다고 보도했다. 토큰을 서로 다른 layer stack에 정확히 한 번 통과시키는 대신, hidden state를 같은 layer 묶음에 여러 번 돌린 뒤 다음 토큰을 낸다는 내용이다. 이 기사는 몇 시간 만에 AI 안전 논쟁이 됐다. looping이 추론의 일부를 읽을 수 있는 CoT 텍스트에서 읽을 수 없는 수치 latent 상태로 옮기기 때문이다.

| 인물 | 반응 |
|---|---|
| Steven Adler (전 OpenAI 안전 연구자) | "OpenAI가 AI 업계에 존재하는 몇 안 되는 레드라인 하나를 어기는 것으로 보인다" |
| Gary Marcus | "Red Alert" 제목의 글 |
| Jakub Pachocki (OpenAI 수석 과학자) | 보도가 혼란스럽다고 반박하고, Astra를 포함한 현재 최전선 모델의 계산 그래프 깊이가 GPT-4의 두 배 이내라고 밝혔다 |

글은 Astra를 GPT-5.6 Sol, Terra, Luna 계열 위에 있는 모델이자, 네트워크 형태가 공공 정책 문제가 된 첫 모델로 소개한다.

### 3.2 looped transformer의 정의

표준 Transformer는 서로 다른 layer의 stack이다. 64층 모델은 가중치 64세트를 갖고 모든 토큰이 64층을 정확히 한 번 지난다. 깊이는 학습 시점에 고정되며, 추론 시 직렬 계산을 늘리는 유일한 방법은 토큰을 더 생성하는 것, 즉 CoT다.

looped transformer(recurrent-depth transformer, recursive transformer)는 stack 일부를 반복 적용되는 공유 block 하나로 바꾼다. block을 4회 돌리면 4개 복사본 수준의 직렬 계산을 얻지만 가중치는 한 벌만 저장한다. 32회 돌리면 materialized depth는 32개 복사본으로 커지고 파라미터 수는 그대로다.

두 가지 결과가 따른다.

1. 연산량이 실행 시점의 조절 장치가 된다. 같은 checkpoint가 재학습 없이 반복 횟수만 바꿔 토큰당 계산을 늘리거나 줄인다. 모델이 아무것도 적지 않아도 되는 test-time compute scaling이다.
2. 추론이 말로 남지 않는다. 각 반복은 문장이 아니라 벡터인 hidden state를 다듬는다. CoT 모델에서는 직렬 추론의 모든 단계가 읽을 수 있는 토큰으로 투영돼야 하지만 looped 모델에서는 그 투영이 선택 사항이다.

글은 2번이 논쟁의 전부이고 1번이 매력의 전부라고 요약한다. CoT monitorability 입장 논문(arXiv 2507.11473)의 표현으로는, 표준 Transformer에서 "chain of thought는 정보가 뒤 layer에서 앞 layer로 흐를 수 있는 유일한 길"이며, 고정 토큰 수에서 가장 긴 정보 흐름은 CoT를 거쳐야 한다. looping은 텍스트로 드러나지 않는 두 번째 경로를 추가한다.

### 3.3 Huginn의 recurrent depth 구조

가장 명확한 공개 구현은 Geiping et al. "Scaling up Test-Time Compute with Latent Reasoning: A Recurrent Depth Approach"(ELLIS Institute Tübingen, University of Maryland, Lawrence Livermore National Laboratory)다. 3.5B 모델 Huginn은 세 그룹으로 나뉜다.

| 구성 | 역할 |
|---|---|
| Prelude (P) | 몇 개의 일반 transformer layer가 입력 토큰을 latent 공간에 임베딩한다 |
| Core (R) | 반복 block. 이전 latent 상태와 원래 임베딩 입력을 adapter 행렬로 연결해 transformer layer에 통과시켜 새 상태를 만든다. r회 적용한다 |
| Coda (C) | 마지막 latent 상태를 next-token 확률로 디코딩한다 |

두 설계 세부가 중요하다. core는 무작위 상태에서 시작하고, 원래 임베딩이 매 반복마다 다시 주입된다. 둘 다 "deep thinking" 문헌에서 온 장치로, 반복이 시작점과 무관한 정상 상태로 수렴하는 성질(path independence)을 유도해 recurrence를 안정시킨다. 이 장치가 없으면 공유 block 반복은 붕괴하거나 발산하기 쉽다.

논문은 recurrent depth를 세 번째 scaling 방향으로 본다. pre-training은 파라미터를, CoT는 토큰을, recurrent depth는 직렬 계산을 직접 늘린다. 저자들은 이 설계가 실제 파라미터보다 materialized 파라미터가 많은 "compute-heavy" 구조이며, 파라미터는 많고 계산은 가벼운 mixture-of-experts와 거울상이라고 적는다. 논문 인용: "recurrent-depth 구성은 추론 패턴 학습에 뛰어나고, MoE는 복잡한 정보의 저장과 검색에 뛰어나다." 글은 looping과 sparsity가 경쟁 관계가 아니라 보완 관계라고 강조한다.

### 3.4 프런티어 연구소의 동기

- CoT scaling은 비용이 누적된다. 추가 추론 단위마다 토큰을 직렬로 생성해야 하고, 이후 모든 토큰이 그 토큰을 attention으로 참조하며, KV cache에 보관해야 한다.
- latent recurrence는 추가 출력 토큰, context 증가, cache 부담 없이 직렬 깊이를 얻는다.
- looping하는 작은 모델이 looping하지 않는 큰 모델과 맞먹으면 replica당 가중치 적재 대역폭과 메모리가 줄어든다.
- 반복 횟수가 실행 시점 파라미터이므로 같은 checkpoint로 저가 티어와 고가 티어를 함께 제공할 수 있다.
- 능력 측면: Huginn 저자들은 모든 내부 추론을 말로 옮긴 다음 토큰 하나로 강제하는 것이 낭비로 보이며, 공간 추론이나 수치 직관처럼 말로 잘 표현되지 않는 계산이 있다고 본다. 논문 7절은 수치 추론 프롬프트에서 latent 상태가 한 점으로 수렴하지 않고 회전 궤적을 그리는 "orbiting" 현상을 기록한다.

### 3.5 CoT monitorability 논쟁

2025년 7월 OpenAI, Google DeepMind, Anthropic, UK AI Security Institute, METR, Apollo Research, Redwood Research 소속 연구자 41명이 "Chain of Thought Monitorability: A New and Fragile Opportunity for AI Safety"에 공동 서명했다. 현재 모델은 긴 추론을 텍스트로 외부화해야 하므로 의도를 들여다볼 창이 생기고, 그 창을 보호할 가치가 있다는 주장이다.

이 논문의 "Novel architectures" 소절은 연속 latent 공간에서 추론의 직렬 깊이를 늘리는 아키텍처 변화를 다루며 Coconut(Hao 2024)과 recurrent depth(Geiping 2025)를 이름으로 인용한다. 이런 latent reasoning 모델은 생각을 말로 꺼낼 필요가 없어 CoT의 안전 이점을 잃을 수 있다는 내용이다. 공저자에는 Mark Chen, David Farhi, Aleksander Mądry, Wojciech Zaremba, Bowen Baker, 그리고 Jakub Pachocki가 있다. Astra에 쓰였다고 보도된 아키텍처 계열이 13개월 전 OpenAI 수석 과학자가 서명한 논문에서 monitorability 위험으로 지목됐다는 점이 반발이 거셌던 이유다.

| 입장 | 요지 |
|---|---|
| Pachocki (9월 2일) | 혼란스러운 보도로 촉발된 unmonitorability 경쟁을 막고 싶다. Astra 포함 최전선 모델의 계산 그래프 깊이는 GPT-4의 두 배 이내다. OpenAI는 첫 reasoning model부터 CoT monitoring을 보존하고 활용해 왔다. 이 기법은 취약하고 아키텍처 변화와 무관한 이유로 나빠지는 추세다 |
| Geoffrey Irving (UK AISI) | 회로 깊이 제한으로 의미 있는 효과를 보려면 제한이 매우 낮아야 한다. 깊이가 수백 수준이면 가짜 제한이다. 오류율 없이 "CoT를 감시한다"고 말하는 것과 같다 |
| Irving 후속 | GPT-4의 두 배 이내라는 제한은 자신이 반박하던 시나리오보다 엄격하다고 인정했다 |

글의 평가는 다음과 같다. Pachocki의 답은 회피가 아니라 실질적 주장(반복 횟수 제한, GPT-4 수준의 총 직렬 깊이, 읽을 수 있는 CoT 보존)이다. 안전 커뮤니티의 반대는 looping 자체가 금지돼야 한다는 것이 아니라 "제한했다"는 말에 숫자가 붙어야 의미가 있다는 것이며, OpenAI는 숫자를 붙였지만 측정 근거는 공개하지 않았다.

monitorability 논문도 스스로 단서를 단다. 현재 형태의 CoT를 지키겠다는 강한 약속이 더 효과적인 안전 개입과 상충할 수 있고, CoT monitoring은 기존 안전 연구의 대체가 아니라 추가로만 써야 한다고 권한다. 논문이 제안한 중간 경로인 "추론의 일부 가시성을 유지하면서 latent 계산을 활용하는 하이브리드"가 OpenAI 설명대로라면 Astra가 하는 일과 비슷하다.

OpenAI의 9월 1일 "Path to Astra" 글은 Astra가 Preparedness Framework에서 Critical 사이버보안 임계값에 도달한 첫 모델이라고 밝히며, 잠재적 비정렬 행동을 빠르게 탐지하기 위해 추가 CoT monitoring과 함께 배포한다고 적는다. 글은 통제 장치와 아키텍처 추세가 반대 방향으로 당기고 있고 OpenAI가 둘을 동시에 운영한다고 지적한다.

### 3.6 슬라이드 생성과의 관계 (자사 홍보 절)

40쪽 보고서를 일관된 deck으로 바꾸는 일은 텍스트 길이 문제가 아니라 직렬 추론 문제이며, 현재는 그 비용을 CoT 토큰으로 낸다. latent recurrence는 이 비용을 줄일 수 있다. 반면 슬라이드 생성은 근거를 보고 고쳐야 하는 영역이므로 latent로 사라진 추론은 감사할 수 없다. 글은 Tosea.ai가 파싱, 개요, 슬라이드별 추론, 렌더링을 검사 가능한 단계로 분리해 둔다고 소개한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 Huginn 반복 횟수별 성능

같은 가중치와 같은 8,000억 토큰 학습에서 테스트 시 반복 횟수만 바꾼 결과다 (Geiping et al. Table 1, 2, 4).

| Benchmark | r = 1 | r = 8 | r = 16 | r = 32 |
|---|---|---|---|---|
| ARC-E | 34.89 | 65.11 | 69.49 | 69.91 |
| ARC-C | 24.06 | 35.15 | 37.71 | 38.23 |
| HellaSwag | 29.34 | 58.54 | 64.67 | 65.21 |
| MMLU | 23.60 | 25.29 | 31.25 | 31.38 |
| OpenBookQA | 26.80 | 35.40 | 37.60 | 38.80 |
| PiQA | 55.33 | 73.45 | 75.79 | 76.22 |
| SciQ | 47.1 | 92.10 | 93.90 | 93.50 |
| GSM8K CoT (flexible / strict) | 0.00 / 0.15 | 해당 없음 | 해당 없음 | 34.80 / 42.08 |

GSM8K CoT는 system prompt를 쓴 r = 32 결과다. 반복 1회에서는 대부분 과제가 무작위 수준이고 32회에서는 그럴듯한 소형 모델이 된다. 바뀐 것은 같은 block의 실행 횟수뿐이므로, latent recurrence가 실제 계산을 수행한다는 가장 깔끔한 증거라고 글은 평가한다.

### 4.2 두 가지 단서

- 포화와 불균등: r = 16에서 32로 연산을 두 배로 늘려도 ARC-E는 0.42점 오르고 SciQ는 오히려 떨어진다. 논문 Figure 1에 따르면 OpenBookQA 같은 쉬운 과제는 빨리 수렴하고 GSM8K는 계속 오른다. looping은 직렬 추론이 병목인 곳에서만 크게 효과가 있다.
- 데이터 품질 우위: Huginn r = 32는 ARC-E 69.91, MMLU 31.38이다. 4T 토큰의 정제 데이터로 학습한 OLMo-2-1124-7B는 82.79, 60.56이다. Huginn은 3.5B 파라미터와 0.8T 토큰에 비해 높은 성능을 내 대부분 지표에서 Pythia-12B를 이기고 HumanEval에서 OLMo-7B를 23.17 대 12.80으로 앞서지만, 데이터 scaling law를 뒤집지는 않는다.

### 4.3 고정 깊이 baseline 대조

Table 4는 같은 데이터와 설정으로 1,800억 토큰 학습한 recurrent 모델과 고정 깊이 baseline을 비교한다. recurrent 모델은 ARC-E 53.62 대 46.42, GSM8K CoT 9.02 대 1.82로 앞선다. 글은 학습 레시피가 아니라 아키텍처가 격차를 만들었다고 해석한다.

### 4.4 연구 계보

| 연도 | 연구 | 기여 |
|---|---|---|
| 2018 | Universal Transformers (Dehghani et al.) | 공유 transformer block 하나를 halting 장치와 함께 반복 적용한 최초의 weight-tied Transformer |
| 2019 | ALBERT | 압축 기법으로서의 cross-layer 파라미터 공유. 공유 block이 품질을 해치지 않음을 보였다 |
| 2024 | Coconut (Hao et al.) | 마지막 hidden state를 다음 입력 임베딩으로 되먹이는 "continuous thought". 한 경로에 고정하지 않고 너비 우선 탐색처럼 추론한다 |
| 2025 | Huginn (Geiping et al.) | 3.5B 파라미터, 8,000억 토큰으로 latent recurrence를 확장했다. Oak Ridge의 Frontier 슈퍼컴퓨터에서 학습했고 test-time loop scaling으로 약 50B materialized 파라미터 수준까지 보였다 |
| 2025 | Mixture-of-Recursions (Bae et al.) | 경량 router로 토큰마다 다른 recursion 깊이를 준다. 적응형 계산과 파라미터 공유를 한 프레임워크에 묶었다 |
| 2025 | Ouro / LoopLM (ByteDance et al.) | 7.7T 토큰으로 학습한 1.4B, 2.6B looped 모델 공개. entropy 정규화 목적함수로 깊이 배분을 학습하며 최대 12B 모델과 대등하다고 보고했다 |

Ouro는 Astra 보도에서 가장 많이 인용된 결과다. looping을 사후에 덧붙이지 않고 pre-training에 넣었으며, 이득의 원인을 원시 용량이 아니라 "우수한 지식 조작 능력"으로 설명한다. 학습된 exit 장치로 고정 횟수 대신 모델이 반복 길이를 정한다.

### 4.5 Astra 주장의 확인 상태

| 주장 | 상태 | 출처 |
|---|---|---|
| Astra는 OpenAI의 차기 모델이다 | 확인 | OpenAI Path to Astra, 2026-09-01 |
| Critical 사이버보안 임계값에 도달한 첫 모델이다 | 확인 | 같은 글 |
| ExploitBench 100%, 평가 중 zero-day 2건 발견 | 확인 | 같은 글 |
| 허용되지 않은 사이버 요청 거부율 91.5%(GPT-5.6 Sol 59%) | 확인 | 같은 글 |
| 추가 CoT monitoring과 함께 배포 | 확인 | 같은 글 |
| 계산 그래프 깊이가 GPT-4의 두 배 이내 | 확인(측정 근거 미공개) | Pachocki, 2026-09-02 |
| recurrent depth / looped layer 사용 | 보도, 공식 미확인 | The Information, 2026-09-01 |
| 읽을 수 있는 CoT 보존을 위해 loop 깊이를 의도적으로 제한 | 보도 | The Information의 익명 소식통 |
| Astra가 "GPT-6"이다 | 추측 | 공식 발표 없음 |
| 파라미터 수, 가격, 출시일 | 미상 | OpenAI는 "곧"이라고만 밝혔고 고급 사이버 기능은 알파 테스터로 제한 |

글은 OpenAI가 출시 시 system card를 공개하기로 했고, Pachocki의 답은 기법 자체가 아니라 그 함의를 반박한 것이라고 정리한다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- 글 작성 시점은 Astra 출시 전이다. 아키텍처 주장은 보도이며 system card 공개 전이다.
- looping은 가중치를 줄이지만 FLOPs를 반드시 줄이지는 않는다. block을 32회 돌리면 32 block 분량 연산이 든다. 절약은 같은 직렬 깊이를 얻으려고 CoT 토큰 수백 개를 생성하지 않는 데서 나온다.
- 반복 이득은 과제마다 다르고 포화한다. 대부분 벤치마크는 깊이 제한 과제가 아니다.
- Huginn과 Ouro는 소형 연구 모델이며 프런티어 시스템이 아니다.
- latent 추론은 감사할 수 없으므로 근거 추적이 중요한 응용에는 별도 검증 단계가 필요하다.

## 6. 관련 연구 (Related Work)

| 자료 | 비고 |
|---|---|
| Geiping et al. 2025 (arXiv 2502.05171) | Huginn, recurrent depth |
| Korbak et al. 2025 (arXiv 2507.11473) | CoT monitorability 입장 논문 |
| Zhu et al. 2025 (arXiv 2510.25741) | Ouro / LoopLM |
| Bae et al. 2025 (arXiv 2507.10524) | Mixture-of-Recursions |
| Hao et al. 2024 (arXiv 2412.06769) | Coconut |
| ALBERT (arXiv 1909.11942) | cross-layer 파라미터 공유 |
| OpenAI Path to Astra, Responding to the next frontier of critical cyber capabilities | Astra 공식 발표와 사이버 대응 |

공개 모델: ByteDance Ouro 1.4B와 2.6B(Hugging Face, Apache 2.0), Huginn-0125 checkpoint.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| recurrent depth | 깊이 방향으로 같은 block을 반복 적용해 직렬 계산을 늘리는 방식. looped transformer와 같은 뜻으로 쓴다 |
| materialized depth | 반복을 펼쳤을 때의 실제 계산 깊이. 저장된 layer 수보다 클 수 있다 |
| prelude / core / coda | Huginn의 세 구성 요소. 입력 임베딩, 반복 block, 출력 디코딩 |
| input injection | 매 반복마다 원래 입력 임베딩을 core에 다시 넣는 장치 |
| path independence | 반복이 시작 상태와 무관한 정상 상태로 수렴하는 성질 |
| orbiting | 수치 추론 프롬프트에서 latent 상태가 한 점이 아니라 회전 궤적을 그리는 현상 |
| CoT monitorability | CoT 텍스트로 모델의 의도를 감시할 수 있는 가능성. latent reasoning이 위협 요인으로 지목됐다 |

## 8. 그림 후보 (Figure Candidates)

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | OpenAI Path to Astra 공지 화면. Astra가 Preparedness Framework의 Critical 사이버보안 임계값에 도달한 첫 모델이라는 내용 | fetched | (선택) Astra 맥락 |
| fig02 | Tosea 글 전체 페이지 스크린샷 | screenshot | (아카이브용) |
| fig03 | Tosea 글 화면 영역 크롭 01 (crop01.png) | crop | (크롭, 원본 이미지와 중복) |
| fig04 | Tosea 글 화면 영역 크롭 02 (crop02.png) | crop | (크롭, 원본 이미지와 중복) |
| fig05 | Tosea 글 화면 영역 크롭 03 (crop03.png) | crop | (크롭, 원본 이미지와 중복) |
| fig06 | Tosea 글 화면 영역 크롭 04 (crop04.png) | crop | (크롭, 원본 이미지와 중복) |
| fig07 | Tosea 글 화면 영역 크롭 05 (crop05.png) | crop | (크롭, 원본 이미지와 중복) |
| fig08 | Tosea 글 화면 영역 크롭 06 (crop06.png) | crop | (크롭, 원본 이미지와 중복) |
