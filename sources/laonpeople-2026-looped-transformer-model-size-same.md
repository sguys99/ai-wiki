---
title: "Looped Transformer: 모델 크기는 그대로, 생각은 더 깊게"
type: article
year: 2026
category: llms
raw_path: raw/articles/laonpeople-2026-looped-transformer-model-size-same.md
raw_filename: "laonpeople-2026-looped-transformer-model-size-same.md"
source_collection: external
author: "라온피플(LaonPeople)"
url: "https://laonpeople.com/blog/looped-transformer-%eb%aa%a8%eb%8d%b8-%ed%81%ac%ea%b8%b0%eb%8a%94-%ea%b7%b8%eb%8c%80%eb%a1%9c-%ec%83%9d%ea%b0%81%ec%9d%80-%eb%8d%94-%ea%b9%8a%ea%b2%8c/"
publisher: "LaonPeople Blog (laonpeople.com)"
tags: [looped-transformer, recurrent-depth, adaptive-computation, edge-inference]
figures:
  - id: fig01
    file: assets/laonpeople-2026-looped-transformer-model-size-same/fig01.png
    raw: raw/articles/laonpeople-2026-looped-transformer-model-size-same-figures/fig01.png
    caption: "라온피플 글 표지 배너"
    strategy: fetched
    curated: false
  - id: fig02
    file: assets/raschka-2026-gpt-6-astra-looped-transformers-and/lp-fig02.jpg
    raw: raw/articles/laonpeople-2026-looped-transformer-model-size-same-figures/fig02.jpg
    caption: "일반 Transformer는 서로 다른 6개 층을 한 번씩 지나고 looped transformer는 같은 가중치의 블록 1개를 6회 반복한다 (원문 그림 1)"
    strategy: fetched
    curated: true
  - id: fig03
    file: assets/raschka-2026-gpt-6-astra-looped-transformers-and/lp-fig03.jpg
    raw: raw/articles/laonpeople-2026-looped-transformer-model-size-same-figures/fig03.jpg
    caption: "생각할 시간을 늘리는 세 방법. 파라미터는 저장 용량, latent step은 내부 계산, 출력 토큰은 말로 꺼낸 추론 (원문 그림 2)"
    strategy: fetched
    curated: true
  - id: fig04
    file: assets/laonpeople-2026-looped-transformer-model-size-same/fig04.jpg
    raw: raw/articles/laonpeople-2026-looped-transformer-model-size-same-figures/fig04.jpg
    caption: "Prelude, 공유 core R의 반복, Coda로 이어지는 looped transformer 구조"
    strategy: fetched
    curated: false
  - id: fig05
    file: assets/laonpeople-2026-looped-transformer-model-size-same/fig05.jpg
    raw: raw/articles/laonpeople-2026-looped-transformer-model-size-same-figures/fig05.jpg
    caption: "전통적인 RNN과 looped transformer의 반복 대상, 방향, 역할, 횟수 비교표 (원문 표 1)"
    strategy: fetched
    curated: false
  - id: fig06
    file: assets/laonpeople-2026-looped-transformer-model-size-same/fig06.jpg
    raw: raw/articles/laonpeople-2026-looped-transformer-model-size-same-figures/fig06.jpg
    caption: "적응형 계산 깊이 개념. 쉬운 토큰은 2회, 중간 토큰은 4회, 어려운 토큰은 7회에서 멈춘다 (원문 그림 3)"
    strategy: fetched
    curated: false
  - id: fig07
    file: assets/raschka-2026-gpt-6-astra-looped-transformers-and/lp-fig07.jpg
    raw: raw/articles/laonpeople-2026-looped-transformer-model-size-same-figures/fig07.jpg
    caption: "활용 상황별 기대 이점과 고려할 한계 비교표 (원문 표 2)"
    strategy: fetched
    curated: true
  - id: fig08
    file: assets/laonpeople-2026-looped-transformer-model-size-same/page-full.png
    raw: raw/articles/laonpeople-2026-looped-transformer-model-size-same-figures/page-full.png
    caption: "라온피플 글 전체 페이지 스크린샷"
    strategy: screenshot
    curated: false
  - id: fig09
    file: assets/laonpeople-2026-looped-transformer-model-size-same/crop01.png
    raw: raw/articles/laonpeople-2026-looped-transformer-model-size-same-figures/crop01.png
    caption: "라온피플 글 화면 영역 크롭 01 (crop01.png)"
    strategy: crop
    curated: false
  - id: fig10
    file: assets/laonpeople-2026-looped-transformer-model-size-same/crop02.png
    raw: raw/articles/laonpeople-2026-looped-transformer-model-size-same-figures/crop02.png
    caption: "라온피플 글 화면 영역 크롭 02 (crop02.png)"
    strategy: crop
    curated: false
  - id: fig11
    file: assets/laonpeople-2026-looped-transformer-model-size-same/crop03.png
    raw: raw/articles/laonpeople-2026-looped-transformer-model-size-same-figures/crop03.png
    caption: "라온피플 글 화면 영역 크롭 03 (crop03.png)"
    strategy: crop
    curated: false
  - id: fig12
    file: assets/laonpeople-2026-looped-transformer-model-size-same/crop04.png
    raw: raw/articles/laonpeople-2026-looped-transformer-model-size-same-figures/crop04.png
    caption: "라온피플 글 화면 영역 크롭 04 (crop04.png)"
    strategy: crop
    curated: false
  - id: fig13
    file: assets/laonpeople-2026-looped-transformer-model-size-same/crop05.png
    raw: raw/articles/laonpeople-2026-looped-transformer-model-size-same-figures/crop05.png
    caption: "라온피플 글 화면 영역 크롭 05 (crop05.png)"
    strategy: crop
    curated: false
  - id: fig14
    file: assets/laonpeople-2026-looped-transformer-model-size-same/crop06.png
    raw: raw/articles/laonpeople-2026-looped-transformer-model-size-same-figures/crop06.png
    caption: "라온피플 글 화면 영역 크롭 06 (crop06.png)"
    strategy: crop
    curated: false
  - id: fig15
    file: assets/laonpeople-2026-looped-transformer-model-size-same/crop07.png
    raw: raw/articles/laonpeople-2026-looped-transformer-model-size-same-figures/crop07.png
    caption: "라온피플 글 화면 영역 크롭 07 (crop07.png)"
    strategy: crop
    curated: false
  - id: fig16
    file: assets/laonpeople-2026-looped-transformer-model-size-same/crop08.png
    raw: raw/articles/laonpeople-2026-looped-transformer-model-size-same-figures/crop08.png
    caption: "라온피플 글 화면 영역 크롭 08 (crop08.png)"
    strategy: crop
    curated: false
  - id: fig17
    file: assets/laonpeople-2026-looped-transformer-model-size-same/crop09.png
    raw: raw/articles/laonpeople-2026-looped-transformer-model-size-same-figures/crop09.png
    caption: "라온피플 글 화면 영역 크롭 09 (crop09.png)"
    strategy: crop
    curated: false
  - id: fig18
    file: assets/laonpeople-2026-looped-transformer-model-size-same/crop10.png
    raw: raw/articles/laonpeople-2026-looped-transformer-model-size-same-figures/crop10.png
    caption: "라온피플 글 화면 영역 크롭 10 (crop10.png)"
    strategy: crop
    curated: false
  - id: fig19
    file: assets/laonpeople-2026-looped-transformer-model-size-same/crop11.png
    raw: raw/articles/laonpeople-2026-looped-transformer-model-size-same-figures/crop11.png
    caption: "라온피플 글 화면 영역 크롭 11 (crop11.png)"
    strategy: crop
    curated: false
  - id: fig20
    file: assets/laonpeople-2026-looped-transformer-model-size-same/crop12.png
    raw: raw/articles/laonpeople-2026-looped-transformer-model-size-same-figures/crop12.png
    caption: "라온피플 글 화면 영역 크롭 12 (crop12.png)"
    strategy: crop
    curated: false
  - id: fig21
    file: assets/laonpeople-2026-looped-transformer-model-size-same/crop13.png
    raw: raw/articles/laonpeople-2026-looped-transformer-model-size-same-figures/crop13.png
    caption: "라온피플 글 화면 영역 크롭 13 (crop13.png)"
    strategy: crop
    curated: false
  - id: fig22
    file: assets/laonpeople-2026-looped-transformer-model-size-same/crop14.png
    raw: raw/articles/laonpeople-2026-looped-transformer-model-size-same-figures/crop14.png
    caption: "라온피플 글 화면 영역 크롭 14 (crop14.png)"
    strategy: crop
    curated: false
---

## 한 줄 요약 (One-line Summary)

라온피플 블로그가 looped transformer를 한국어로 풀어 쓴 해설로, 생각할 시간을 늘리는 세 방법(파라미터, 내부 반복, 출력 추론 토큰)을 구분하고 prelude, core, coda 구조와 RNN, CoT와의 차이, Ouro와 Huginn의 결과, 적응형 계산 깊이, 엣지와 온디바이스 관점의 장단점과 적용 영역을 정리한다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 제목 | Looped Transformer: 모델 크기는 그대로, 생각은 더 깊게 |
| 저자 | 라온피플(LaonPeople) 블로그, 개인 저자명 없음 |
| 발행일 | 2026-09-11 |
| URL | https://laonpeople.com/blog/looped-transformer-모델-크기는-그대로-생각은-더-깊게/ |
| 수집 | 2026-10-19, `fetch_article.py` jina tier, 본문 약 1만 4천 자 |
| 비고 | 원문은 한국어 글이며 Insight 분류다. 그림 3장과 표 2장이 이미지로 들어 있다 |

글은 12개 절로 구성된다. 쉬운 문제와 어려운 문제의 시간 배분 비유에서 시작해, 생각할 시간의 세 가지 의미, 반복 대상, RNN과 CoT 비교, 반복의 이득과 비용, 적응형 계산, 엣지 장치 관점, 적용 영역, 결론 순으로 전개한다.

## 2. 주요 기여 (Key Contributions)

- 테스트 시간 연산을 늘리는 방법을 파라미터 수(모델 크기), 내부 반복 횟수(looped transformer), 출력 추론 토큰 수(CoT) 세 가지로 구분하고 서로 같은 자원이 아님을 강조한다.
- prelude, core, coda 구조를 식 e = P(x), s_i = R(e, s_{i-1}), p = C(s_r)로 설명하고 입력 재주입(input injection)의 역할을 풀이한다.
- RNN과 looped transformer의 차이를 반복 대상, 방향, 역할, 횟수 네 항목의 표로 비교한다.
- CoT의 가시성과 latent 반복의 불가시성이 모두 검증의 전부가 아니라는 주의를 단다.
- Ouro와 Huginn 결과를 "더 많이 기억한 것이 아니라 아는 것을 더 잘 조합한 것"으로 해석한다.
- 적응형 계산 깊이(adaptive depth)의 종료 기준 네 가지와 한계를 정리한다.
- 엣지 장치 평가 체크리스트 6개 항목과 활용 상황별 이점과 한계 표를 제시한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 문제 제기

사람은 쉬운 문제에 1초, 어려운 문제에 1분을 쓰지만, 일반 Transformer는 질문 난도와 무관하게 토큰 하나를 만드는 계산 깊이가 같다. 최근 LLM은 테스트 시간 연산(test-time compute)을 늘려 추론 능력을 올리는 방향으로 가고 있으며, 지금까지 확실한 해법은 모델을 키우는 것과 답 전에 생각을 길게 말하게 하는 것(OpenAI o 시리즈, DeepSeek-R1의 CoT)이었다. CoT는 효과가 분명하지만 글이 길어지는 만큼 비용과 응답 시간이 늘고, 더 생각하려면 반드시 문장으로 꺼내야 한다는 제약이 있다. looped transformer는 같은 신경망 block을 반복 사용해 내부 계산을 깊게 만든다.

### 3.2 생각할 시간의 세 가지 의미

| 방법 | 늘리는 것 | 특징 |
|---|---|---|
| 모델 크기 | 파라미터 수 | 더 많은 패턴과 복잡한 변환을 학습한다. 질문 후 생각할 시간을 늘리기보다 처음부터 큰 두뇌를 준비하는 쪽이며 모델 파일과 메모리가 함께 커진다 |
| 내부 계산 단계 | 반복 횟수 | looped transformer의 방식. 같은 핵심 block을 여러 번 통과시키며 내부 표현을 다듬는다. 파라미터 수는 그대로이고 계산이 늘어난다 |
| 중간 추론 생성 | 출력 추론 토큰 수 | CoT와 reasoning model의 방식. 중간 과정을 토큰으로 생성하고 그 내용을 바탕으로 다음 추론을 잇는다. 응답 시간과 비용이 증가한다 |

여기서 "정해진 깊이"는 총 계산량이 아니라 토큰 하나를 처리하는 신경망의 기본 깊이를 뜻한다. 답을 길게 쓰면 그 깊이를 여러 번 반복하는 것이지 한 번의 깊이가 깊어지는 것은 아니다. 따라서 "추론 문장을 열 개 생성했으니 신경망이 열 배 깊어진 것과 같다"고 계산할 수 없다. 글의 요약은 "파라미터 수는 모델 크기를, CoT는 생각을 말로 풀어내는 시간을, looped transformer는 말로 꺼내기 전 내부에서 되풀이하는 계산을 늘린다"이다.

### 3.3 반복의 대상과 구조

looped transformer가 반복하는 것은 입력 문장이나 이미 생성한 단어가 아니라 모델 내부의 잠재 표현(latent representation)이다.

| 구성 | 역할 | 식 |
|---|---|---|
| Prelude | 입력 토큰을 내부 표현으로 바꾼다 | e = P(x) |
| Core | 문맥과 조건을 반영해 표현을 다듬는다. r회 반복한다 | s_i = R(e, s_{i-1}) |
| Coda | 마지막 표현으로 다음 토큰 확률을 계산한다 | p = C(s_r) |

같은 R의 가중치를 계속 재사용하므로 r을 늘려도 파라미터 수는 늘지 않는다. 글은 이를 가중치 공유(weight tying)라고 부른다. 직관적 비유로 첫 반복은 문제 조건 파악, 두 번째는 조건 연결과 풀이 시도, 세 번째는 풀이 정제를 든다. 다만 실제 반복마다 이런 역할이 정해진 것은 아니며, 앞선 계산 결과를 바탕으로 다음 계산을 잇는다는 점에서 같은 문제를 처음부터 다시 푸는 것과 다르다.

매 반복마다 원래 입력 표현 e가 함께 들어가는 입력 재주입(input injection)이 없으면 반복을 거듭하는 동안 모델이 무엇을 풀고 있었는지 잃어버리기 쉽다.

깊이 방향 반복은 새 발상이 아니다. 2018년 Universal Transformer도 같은 block으로 내부 표현을 반복 갱신하고 Adaptive Computation Time(ACT)으로 위치마다 계산 단계를 조절했다. 최근 recurrent-depth 모델과 LoopLM은 이 발상을 decoder-only 언어모델과 대규모 pre-training에 적용한다. 핵심은 파라미터를 늘리지 않고 테스트 시점의 반복 횟수, 즉 계산 깊이를 조절하는 것이다.

### 3.4 RNN과의 차이

| 구분 | 전통적인 RNN | looped transformer |
|---|---|---|
| 반복하는 대상 | 이전 상태와 다음 토큰 | 문맥을 담은 잠재 표현 |
| 반복 방향 | 토큰의 시간, 위치 방향 | 신경망의 깊이 방향 |
| 반복의 역할 | 토큰을 순서대로 읽으며 상태 갱신 | 같은 표현을 한 단계 더 정제 |
| 반복 횟수 | 주로 입력 길이에 따라 결정 | 계산 예산이나 종료 조건에 따라 결정 |

looped transformer는 첫 반복에서 토큰 사이 관계를 정리하고 이후 반복에서 같은 문맥을 다시 검토한다. 깊이가 순환하므로 recurrent-depth 모델이라고 부른다.

### 3.5 CoT와의 차이

CoT는 중간 과정을 텍스트로 먼저 생성한다. 후속 도구가 읽을 수 있고 사람이 검토할 단서가 생기지만, 텍스트는 모델 내부 상태 전체가 아니며 긴 추론 토큰은 지연 시간과 컨텍스트 사용량을 늘린다. looped transformer는 중간 과정을 문장으로 만들지 않아 말로 표현하기 어려운 정보까지 활용할 수 있지만, 계산 과정이 수치 내부 상태에만 남아 사람이 직접 읽을 수 없다.

글의 주의 사항: CoT가 보인다고 실제 인과적 추론 과정을 그대로 공개하는 것은 아니고, 잠재 반복이 보이지 않는다고 검증이 불가능한 것도 아니다. 외부 근거 검색, 도구 실행 기록, 테스트, 제약 검사 같은 별도 검증층이 필요하다.

### 3.6 적응형 계산 깊이

모든 문제와 토큰에 같은 반복이 필요하지는 않다. "대한민국의 수도는?" 같은 질문에 많은 반복은 비효율적이고, 문장 안에서도 조사나 문장부호는 쉽게 결정되지만 계산 결과나 핵심 결론은 더 많은 검토가 필요하다. 모든 토큰에 16회 같은 고정 횟수를 적용하면 쉬운 토큰에도 불필요한 연산이 생긴다.

adaptive depth는 반복마다 계속할 필요가 있는지 판단해 충분하면 멈춘다. 모델은 정답을 직접 알 수 없으므로 내부 상태의 안정도로 판단한다.

- 반복 전후의 다음 토큰 확률이 거의 달라지지 않는가
- 가장 가능성이 높은 토큰이 여러 번 반복해도 그대로인가
- 잠재 표현이 더 이상 크게 변하지 않는가
- 별도로 학습된 종료 장치가 멈춰도 된다고 판단하는가

원문 그림 3의 예에서 쉬운 토큰은 2회, 중간 토큰은 4회, 어려운 토큰은 7회에서 멈춘다. 다만 내부 상태 안정이 정답 확정을 뜻하지는 않는다. 틀린 답으로 빠르게 수렴할 수도 있고 올바른 답을 찾는 동안 상태가 계속 변할 수도 있다. 기준이 느슨하면 너무 일찍 멈추고 엄격하면 불필요한 반복이 늘어나므로 최소, 최대 반복 횟수와 종료 기준을 함께 설정해야 한다.

Universal Transformer는 학습된 종료 장치 ACT를 썼다. Huginn 공개 구현도 출력 분포의 KL 변화나 최유력 토큰의 안정성으로 토큰별 반복 횟수를 조절하는 기능을 제공하지만, 이는 충분히 학습된 완성형 기능이라기보다 학습 후 종료 규칙을 적용한 개념증명에 가깝고 다양한 과제에서의 안정성은 더 검증이 필요하다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 모델 크기와 계산 깊이의 분리

일반 Transformer에서 32층을 64층으로 만들면 층마다 별도 가중치가 필요해 파라미터 수, 모델 파일, 메모리가 함께 커진다. looped transformer는 core 하나를 여덟 번 통과해 계산을 여덟 단계 깊게 하면서 core 여덟 개를 저장하지 않는다. 같은 계산 깊이를 더 적은 저장 파라미터로 구현할 가능성이 있어 메모리가 제한된 엣지와 온디바이스 AI에서 매력적이다.

### 4.2 Ouro와 Huginn

- Ouro 1.4B와 2.6B는 연구진이 평가한 여러 벤치마크에서 최대 12B 비교 모델과 비슷한 결과를 보였다. 통제 실험에서 이 성능은 더 많은 지식을 저장해서가 아니라 학습한 지식을 여러 단계에 걸쳐 조합하고 활용하는 능력이 좋아져서인 것으로 나타났다. 글의 풀이: 12B만큼 많이 기억하게 된 것이 아니라 아는 내용을 반복해 검토하고 조합해 일부 문제에서 비슷한 답을 낸 것이다.
- Huginn(3.5B 개념증명 모델)은 일부 추론 벤치마크에서 core 반복을 늘릴수록 성능이 올랐고, 공개 모델에서는 대략 64단계 부근까지 개선이 관찰됐다. 학습 후에도 반복 횟수로 성능을 조절할 수 있다는 가능성이다.
- 2.6B가 12B와 비슷하다면 혁신인가에 대한 글의 답은 "조건부로 그렇다"다. 저장 공간과 파라미터 메모리를 크게 줄이면서 성능을 유지하기 때문이다.

### 4.3 비용

저장할 가중치는 줄지만 core를 반복 실행하는 만큼 연산량과 응답 시간이 늘어난다. 반복이 원래 없는 지식을 만들어 주지도 않으므로 폭넓은 사실 지식이 필요한 문제에서는 큰 모델이 유리할 수 있다. 글이 요약한 교환 관계는 "더 많은 파라미터를 저장하는 대신 더 많은 계산 시간을 쓴다"이다. 파라미터를 줄여도 성능이 유지되고, 추가 계산 시간이 허용 범위 안이며, 연구 결과가 실제 업무에서 재현된다면 충분히 혁신적일 수 있다.

### 4.4 엣지와 온디바이스

엣지 장치에서는 모델이 메모리에 들어가는지가 첫 관문인 경우가 많다. 가중치 공유는 같은 유효 깊이를 서로 다른 층으로 구현하는 모델보다 저장 용량과 파라미터 메모리를 줄일 가능성이 있고, 반복 횟수를 장치의 전력과 지연 예산에 맞출 수 있어 제품군 설계에 유리하다.

다만 "가중치를 한 번 읽어 여러 번 재사용하므로 공짜에 가깝다"는 표현은 과하다. core 전체가 온칩 캐시에 들어가지 않으면 반복마다 메모리 계층에서 가중치를 다시 가져올 수 있고, 실제 이득은 칩의 캐시, 메모리 대역폭, 연산 집약도, 커널 최적화에 달려 있다. 엣지 평가 체크리스트는 다음 6개다.

1. 모델 파일과 실행 메모리
2. 목표 정확도까지 필요한 평균, 최대 반복 수
3. 첫 토큰 지연과 토큰 처리량
4. 전력과 발열
5. 반복 종료의 안정성
6. 기존 런타임의 지원 여부

### 4.5 적용 영역

| 활용 상황 | 기대할 수 있는 이점 | 고려해야 할 한계 |
|---|---|---|
| 수학 계산, 논리 추론, 여러 조건을 만족해야 하는 문제 | 같은 core를 반복하며 조건을 단계적으로 검토하고 내부 표현을 다듬는다 | 반복을 늘린다고 항상 좋아지지 않으며 과제별 적절한 반복 횟수를 찾아야 한다 |
| 메모리가 제한된 엣지, 온디바이스 환경 | 적은 파라미터로 계산 깊이를 확보해 모델 파일과 가중치 메모리를 줄일 가능성 | 반복이 늘면 응답 시간, 연산량, 전력 소비가 증가할 수 있다 |
| 성능이 다른 여러 장치에 하나의 모델을 적용 | 저사양에서는 적게, 고사양에서는 많이 반복해 품질과 속도 균형을 조절한다 | 반복에 따른 향상이 장치와 과제마다 달라 실제 하드웨어에서 검증해야 한다 |
| 사실 확인이나 최신 정보가 필요한 질문 | 이미 아는 정보를 더 잘 조합하는 데 일부 도움 | 모델에 없는 사실은 반복해도 생기지 않으므로 검색이나 RAG가 더 직접적이다 |
| 감사, 규제, 의료와 안전 판정처럼 근거 확인이 중요한 분야 | 어려운 판단에 더 많은 내부 계산을 배분한다 | 잠재 상태는 사람이 읽는 설명이 아니므로 출처, 도구 실행 기록, 검증 절차가 별도로 필요하다 |

## 5. 한계와 향후 과제 (Limitations and Future Work)

- looped transformer는 큰 모델, CoT, 검색, tool use를 대체하는 만능 해법이 아니다. 반복은 새 지식을 주입하지 않고, 지연 시간과 처리량 비용을 치르며, 잠재 상태는 사람이 읽는 근거가 아니다.
- Ouro와 Huginn은 연구 단계 결과이며 비교 모델, 데이터, 벤치마크가 달라 상용 시스템의 우위를 곧바로 뜻하지 않는다.
- 적응형 종료 기준의 범용 안정성은 아직 검증이 부족하다.
- 글의 결론: looped transformer는 "작은 모델이 큰 모델을 공짜로 이기는 기술"이 아니라 제한된 파라미터 예산 안에서 필요한 문제에 계산을 더 배분하려는 설계 선택이다. 메모리는 작지만 연산 여유가 있는 엣지 장치에서는 파라미터 대신 시간을 쓰는 교환이 합리적일 수 있다. 다음 단계는 논문 속 최고 점수가 아니라 실제 목표 장치에서 정확도, 지연, 전력 곡선을 그리는 일이다.

## 6. 관련 연구 (Related Work)

| 자료 | 글에서의 역할 |
|---|---|
| Universal Transformer (2018) | 깊이 방향 반복과 ACT의 원조 |
| Huginn (recurrent depth, Geiping 2025) | prelude, core, coda 구조와 반복 scaling, KL 기반 종료 |
| Ouro / LoopLM | 1.4B와 2.6B로 최대 12B와 비슷한 결과 |
| OpenAI o 시리즈, DeepSeek-R1 | CoT 방식 추론 모델의 예 |

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| 가중치 공유(weight tying) | 반복되는 core의 가중치를 모든 반복에서 재사용하는 것 |
| 입력 재주입(input injection) | 매 반복마다 원래 입력 표현 e를 core에 함께 넣는 장치 |
| 적응형 계산 깊이(adaptive depth) | 반복마다 계속할지 판단해 토큰별로 반복 횟수를 다르게 하는 방식 |
| Adaptive Computation Time (ACT) | Universal Transformer가 쓴 학습된 종료 장치 |
| recurrent-depth 모델 | 깊이 방향으로 계산이 순환하는 모델. looped transformer의 다른 이름 |

## 8. 그림 후보 (Figure Candidates)

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | 라온피플 글 표지 배너 | fetched | (제외) 표지 |
| fig02 | 일반 Transformer는 서로 다른 6개 층을 한 번씩 지나고 looped transformer는 같은 가중치의 블록 1개를 6회 반복한다 (원문 그림 1) | fetched | ★ wiki 권장 (concept) |
| fig03 | 생각할 시간을 늘리는 세 방법. 파라미터는 저장 용량, latent step은 내부 계산, 출력 토큰은 말로 꺼낸 추론 (원문 그림 2) | fetched | ★ wiki 권장 (concept) |
| fig04 | Prelude, 공유 core R의 반복, Coda로 이어지는 looped transformer 구조 | fetched | (fig13과 유사) |
| fig05 | 전통적인 RNN과 looped transformer의 반복 대상, 방향, 역할, 횟수 비교표 (원문 표 1) | fetched | (본문 표로 대체) |
| fig06 | 적응형 계산 깊이 개념. 쉬운 토큰은 2회, 중간 토큰은 4회, 어려운 토큰은 7회에서 멈춘다 (원문 그림 3) | fetched | (Raschka fig07과 유사) |
| fig07 | 활용 상황별 기대 이점과 고려할 한계 비교표 (원문 표 2) | fetched | ★ wiki 권장 (application) |
| fig08 | 라온피플 글 전체 페이지 스크린샷 | screenshot | (아카이브용) |
| fig09 | 라온피플 글 화면 영역 크롭 01 (crop01.png) | crop | (크롭, 원본 이미지와 중복) |
| fig10 | 라온피플 글 화면 영역 크롭 02 (crop02.png) | crop | (크롭, 원본 이미지와 중복) |
| fig11 | 라온피플 글 화면 영역 크롭 03 (crop03.png) | crop | (크롭, 원본 이미지와 중복) |
| fig12 | 라온피플 글 화면 영역 크롭 04 (crop04.png) | crop | (크롭, 원본 이미지와 중복) |
| fig13 | 라온피플 글 화면 영역 크롭 05 (crop05.png) | crop | (크롭, 원본 이미지와 중복) |
| fig14 | 라온피플 글 화면 영역 크롭 06 (crop06.png) | crop | (크롭, 원본 이미지와 중복) |
| fig15 | 라온피플 글 화면 영역 크롭 07 (crop07.png) | crop | (크롭, 원본 이미지와 중복) |
| fig16 | 라온피플 글 화면 영역 크롭 08 (crop08.png) | crop | (크롭, 원본 이미지와 중복) |
| fig17 | 라온피플 글 화면 영역 크롭 09 (crop09.png) | crop | (크롭, 원본 이미지와 중복) |
| fig18 | 라온피플 글 화면 영역 크롭 10 (crop10.png) | crop | (크롭, 원본 이미지와 중복) |
| fig19 | 라온피플 글 화면 영역 크롭 11 (crop11.png) | crop | (크롭, 원본 이미지와 중복) |
| fig20 | 라온피플 글 화면 영역 크롭 12 (crop12.png) | crop | (크롭, 원본 이미지와 중복) |
| fig21 | 라온피플 글 화면 영역 크롭 13 (crop13.png) | crop | (크롭, 원본 이미지와 중복) |
| fig22 | 라온피플 글 화면 영역 크롭 14 (crop14.png) | crop | (크롭, 원본 이미지와 중복) |
