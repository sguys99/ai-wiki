---
title: "LLM Judges for Identity Resolution at 4x Lower Cost"
type: article
year: 2026
category: evaluations
raw_path: raw/articles/hightouch-2026-llm-judges-for-identity-resolution.md
raw_filename: "hightouch-2026-llm-judges-for-identity-resolution.md"
source_collection: external
author: "Albert Jin"
url: "https://hightouch.com/blog/llm-judges-identity-resolution"
publisher: "Hightouch Blog"
publication_date: "2026-11-04"
tags: [llm-as-a-judge, identity-resolution, over-merging, calibration, decision-model, jev, gpt-6-luna, model-cascade, cost-accuracy-tradeoff, hightouch]
figures:
  - id: fig01
    file: assets/hightouch-2026-llm-judges-for-identity-resolution/fig01.svg
    raw: raw/articles/hightouch-2026-llm-judges-for-identity-resolution-figures/fig01.svg
    caption: "평가 모델별 파레토 프런티어. 가로축은 identity 1,000개당 비용, 세로축은 over-merging 탐지 정확도이며 하이브리드 두 구성이 단독 모델보다 왼쪽 위에 놓인다"
    strategy: fetched
    curated: true
  - id: fig02
    file: assets/hightouch-2026-llm-judges-for-identity-resolution/fig02.svg
    raw: raw/articles/hightouch-2026-llm-judges-for-identity-resolution-figures/fig02.svg
    caption: "IDR 설정 반복 루프. 원본 레코드가 IDR 엔진을 거쳐 identity가 되고, LLM judge의 정확도 추정이 기준에 못 미치면 설정을 바꿔 다시 실행한다"
    strategy: fetched
    curated: true
  - id: fig03
    file: assets/hightouch-2026-llm-judges-for-identity-resolution/fig03.png
    raw: raw/articles/hightouch-2026-llm-judges-for-identity-resolution-figures/fig03.png
    caption: "프롬프트 단계별 정확도. 기본 프롬프트, 오류 예시 추가, 데이터 맥락 추가의 세 단계에서 다섯 모델의 정확도 변화를 그렸고 cutoff는 50%다"
    strategy: fetched
    curated: true
  - id: fig04
    file: assets/hightouch-2026-llm-judges-for-identity-resolution/fig04.png
    raw: raw/articles/hightouch-2026-llm-judges-for-identity-resolution-figures/fig04.png
    caption: "cutoff에 따른 false positive와 false negative 수. 왼쪽 Jev는 cutoff를 올리면 false negative가 급증하고, 오른쪽 GPT-6 Luna는 두 곡선이 거의 평탄하다"
    strategy: fetched
    curated: true
  - id: fig05
    file: assets/hightouch-2026-llm-judges-for-identity-resolution/fig05.svg
    raw: raw/articles/hightouch-2026-llm-judges-for-identity-resolution-figures/fig05.svg
    caption: "첫 테스트와 어려운 테스트의 모델별 정확도 막대그래프. 어려운 테스트에서 Opus는 95.1%, Luna는 88.8%, Jev는 89.1%다"
    strategy: fetched
    curated: true
  - id: fig06
    file: assets/hightouch-2026-llm-judges-for-identity-resolution/fig06.png
    raw: raw/articles/hightouch-2026-llm-judges-for-identity-resolution-figures/fig06.png
    caption: "첫 테스트에서 Jev 확신도 구간별 Jev 오류 수와 같은 구간에서 Opus가 틀린 수. Jev의 오류는 40~60% 구간에 몰려 있다"
    strategy: fetched
    curated: true
  - id: fig07
    file: assets/hightouch-2026-llm-judges-for-identity-resolution/fig07.png
    raw: raw/articles/hightouch-2026-llm-judges-for-identity-resolution-figures/fig07.png
    caption: "첫 테스트에서 Luna 확신도 구간별 Luna 오류 수와 같은 구간에서 Opus가 틀린 수. 오류가 가장 많은 구간이 90~100%다"
    strategy: fetched
    curated: true
  - id: fig08
    file: assets/hightouch-2026-llm-judges-for-identity-resolution/fig08.png
    raw: raw/articles/hightouch-2026-llm-judges-for-identity-resolution-figures/fig08.png
    caption: "어려운 테스트에서 Jev 확신도 구간별 오류 수. 오류가 60~90% 구간으로 이동했지만 90~100% 구간 오류는 1건이다"
    strategy: fetched
    curated: true
  - id: fig09
    file: assets/hightouch-2026-llm-judges-for-identity-resolution/fig09.png
    raw: raw/articles/hightouch-2026-llm-judges-for-identity-resolution-figures/fig09.png
    caption: "어려운 테스트에서 Luna 확신도 구간별 오류 수. 90~100% 구간에서만 62건이 틀려 과신이 두드러진다"
    strategy: fetched
    curated: true
  - id: fig10
    file: assets/hightouch-2026-llm-judges-for-identity-resolution/fig10.svg
    raw: raw/articles/hightouch-2026-llm-judges-for-identity-resolution-figures/fig10.svg
    caption: "하이브리드 평가 구조. decision model의 확신도가 불확실 구간에 들면 LLM으로 보내고, 구간 아래는 한 사람으로, 구간 위는 over-merge로 그대로 받아들인다"
    strategy: fetched
    curated: true
---

## 한 줄 요약 (One-line Summary)

Hightouch가 identity resolution 결과에서 over-merging을 채점하는 LLM-as-a-Judge를 실험한 글이다. 확률을 반환하는 decision model(Jev, GPT-6 Luna)은 단독으로 88.8~97.3%의 정확도를 내고, 보정(calibration)이 잘된 Jev의 불확실 구간만 Claude Opus 5.5에 넘기는 하이브리드 구성은 Opus 단독과 같은 수준의 정확도를 4배 이상 낮은 비용으로 낸다.

## 1. 자료 정보 (Document Information)

- 제목: LLM Judges for Identity Resolution at 4x Lower Cost
- 저자: Albert Jin (페이지 구조화 데이터의 author 필드 기준)
- 매체: Hightouch Blog, 2026년 11월 4일 게시
- URL: https://hightouch.com/blog/llm-judges-identity-resolution
- 성격: 고객 데이터 플랫폼 기업 Hightouch의 엔지니어링 블로그 글이다. 자사가 반복해서 마주치는 문제(identity resolution 결과 채점)에 LLM과 decision model을 적용한 내부 실험 보고다.
- 수집본: `scripts/fetch_article.py`(jina tier)로 본문 전문 17,999자를 수집했다. 원문 이미지 10장 가운데 PNG 6장은 스크립트가, SVG 4장(파레토 차트, IDR 루프, 어려운 테스트 막대그래프, 하이브리드 구조도)은 원문 CDN에서 별도로 받아 아카이브했다.
- 면책: 글 말미에 테스트 데이터는 pseudopeople로 생성했으며 실제 인물은 없고, 모델 비용과 지연은 자사 환경에서 관찰한 값이라 달라질 수 있다고 밝힌다.
- 예고: 후속 글에서 under-merging을 다루고, 독점 API 대신 open-weight decision model로 바꿨을 때 성능이 얼마나 떨어지는지 살펴볼 예정이라고 적는다.

## 2. 주요 기여 (Key Contributions)

- identity resolution(IDR) 결과의 over-merging을 사람 대신 LLM이 판정하게 하는 문제를 정의하고, pseudopeople로 만든 1,000개 identity 벤치마크(절반은 노이즈가 섞인 한 사람, 절반은 over-merge)에서 프런티어 모델 3종과 decision model 2종을 비교했다.
- 프롬프트 구성 요소별 기여를 분리해, 오류 예시 목록이 모든 모델에서 가장 큰 개선을 낸다는 점을 보였다.
- 확률을 반환하는 decision model의 cutoff 선택이 모델마다 결과에 미치는 영향이 다르다는 점(Jev는 크고 Luna는 작다)을 수치로 보였다.
- 쌍둥이, 부자, 동명이인처럼 까다로운 사례만 모은 어려운 테스트를 따로 만들어, 쉬운 테스트에서는 드러나지 않던 프런티어 모델과 decision model의 격차를 확인했다.
- 확신도 구간별 오류 분포로 두 decision model의 보정 차이를 보이고, 보정이 잘된 Jev가 불확실 구간만 Opus에 넘기는 하이브리드 구성에서 Luna보다 유리하다는 결론을 냈다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 문제 정의

글은 identity resolution을 데이터를 실제 사람에게 대응시키는 과정으로 정의한다. 데이터 레코드 집합 `D`가 있을 때 identity 집합 `I`와 대응 `m(D)->I`를 정해야 하며, 조건은 세 가지다.

- 각 레코드 `d ∈ D`는 하나의 identity `i ∈ I`에 대응한다.
- 각 `i`는 실세계의 정확히 한 사람에 대응한다.
- 서로 다른 두 `i`가 같은 사람에 대응하지 않는다.

이 작업은 고객 대상 아웃리치, 개인화, 분석을 하려는 모든 회사의 기반이다. 예를 들어 한 고객의 구매를 하나의 identity로 묶지 못하면 그 고객의 생애 가치를 알 수 없다.

원문 예시에서 IDR은 아래 네 레코드를 `Alice`라는 identity 하나로 묶어야 한다.

| 레코드 | 이름 | 이메일 | 집 주소 | 배송 주소 |
|---|---|---|---|---|
| `loyalty_record_1` | Alice | alice@alice.com | 없음 | 없음 |
| `loyalty_record_2` | Alice | 없음 | 123 Main St | 없음 |
| `transaction_record_1` | Alice | 없음 | 없음 | 123 Main St |
| `transaction_record_2` | (null) | alice@alice.com | 없음 | Store Pickup |

### 3.2 IDR이 어려운 이유

실제로는 여러 사람이 이메일을 공유하고, 주소를 옮기고, 데이터에 오류가 섞인다. 글이 든 오류 유형은 다음과 같다.

| 오류 유형 | 예시 | 다른 해석 가능성 |
|---|---|---|
| 오타 | Valentino → Valentinp | 다른 성씨 |
| 문자 오인식 | Sam → 5am | 쓰레기 값 또는 사용자 이름 |
| 발음대로 표기 | Phillips → Filips | 다른 가족 |
| 월과 일 뒤바뀜 | 02/17/2020 → 17/02/2020 | 파싱되지 않는 생년월일 |
| 친척 값 복사 | 아이 레코드에 부모 생년월일 | 아이 이름을 가진 성인 |
| 별칭 | Robert → Bob | 형제 두 명 |
| 자리표시 이름 | Valentino → Female Child | 쓸모 있는 정보 없음 |
| 빈 필드 | Mendoza → (blank) | 누구든 가능 |

가장 흔하고 문제가 큰 실패는 over-merging이다. over-merging은 identity 하나가 실세계의 여러 사람에 대응하는 오류를 말한다.

### 3.3 over-merging 탐지의 어려움

실제 데이터에는 병합 후 참조할 정답이 없다. 정답이 있다면 그것으로 매칭하면 되므로 IDR 자체가 필요 없다. 따라서 IDR 알고리즘의 정확도를 평가하기 어렵고, 팀이 IDR이 제대로 동작하는지 판단하는 데 몇 달을 쓰기도 한다.

identity당 이메일 수를 세는 식의 휴리스틱으로 over-merge의 통계적 징후를 볼 수는 있지만, 결국은 출력 identity를 표본 추출해 사람이 직접 검토해야 한다. 글은 identity `i`에 대응하는 레코드 집합을 `Dᵢ`로 정의하고, IDR이 성공했다면 어떤 `Dᵢ`에서도 한 사람의 증거만 나와야 한다고 본다.

사람 검토의 한계는 두 가지다.

- 속도가 느리다. 시간당 약 50개 identity를 검토한다.
- 표본이 작으면 over-merge 비율 추정이 부정확하다. 건강한 그래프에서 over-merge는 드물고, 드문 비율을 정밀하게 추정하려면 예상보다 많은 표본이 필요하다. over-merge 비율 오차를 ±1% 이내로 줄이려면 1,000개 넘는 표본이 필요하다.

LLM이 사람과 같은 정확도로 identity를 판정할 수 있다면 원하는 만큼 병렬로 띄워 채점할 수 있다. 글은 10만 개 identity 표본을 몇 초 안에 평가할 수 있고, IDR 설정의 반복 주기가 빨라지며 유지 보수도 쉬워진다고 본다 (fig02의 루프).

### 3.4 decision model

글이 특히 주목하는 대상은 Jev와 GPT-6 Luna(Decisions API)다. 두 모델은 특정 조건이 참일 확신도를 0~1 사이 점수로 반환하는 새로운 계열의 언어 모델이며, 현재의 프런티어 모델보다 훨씬 빠르고 저렴하다. 글은 이 계열을 decision model이라 부른다.

### 3.5 벤치마크 구성

- 생성 도구: University of Washington의 Institute for Health Metrics and Evaluation이 만든 pseudopeople. 가상의 미국 도시를 시뮬레이션하고 여러 출처에서 주민 레코드를 생성한다. Hightouch는 여기에 현실적인 데이터 오류를 추가했다.
- 기록 출처: 10년마다 하는 census, 가구 조사 2종, 급여 프로그램 WIC, Social Security, W-2와 1040 세금 양식. 기간은 2020~2040년이다.
- 첫 테스트: identity 1,000개. 절반은 노이즈가 섞인 한 사람, 절반은 over-merge다.
- 어려운 테스트: 같은 도시와 같은 종류의 노이즈를 쓰되 까다로운 사례만 모았다. 원문은 크기를 밝히지 않으며, 확신도 구간별 차트(fig08, fig09)의 구간 합계는 940~941개다.

어려운 테스트는 두 종류의 함정으로 구성한다.

1. 오타: 실제로는 한 사람인데 생년월일이나 이름 같은 중요한 필드가 레코드마다 다르다.
2. 매우 비슷한 사람의 over-merge: 쌍둥이, 아버지와 같은 이름의 아들(junior와 senior), 동명이인 등이다.

원문이 든 쉬운 over-merge 예시는 Daniel Z Gardner(1990-06-02생, 11648 main street)와 Jenna K Gardner(1991-12-29생, 8203 west farwell avenue)의 레코드가 섞인 경우로, 이름과 주소가 모두 달라 구분이 쉽다. 어려운 예시는 Christopher Brentley Carpenter, Christopher B Carpenter(WIC, 생년월일 02242023, 1978 minnie rd), Christopher Brian Carpenter(Social Security, 생년월일 19860213), Christopher B Carpenter(1040, 1978 minnie rd)가 섞인 경우다. 중간 이름 이니셜이 같고 주소가 겹쳐, 2023년생 아이와 1986년생 성인이 섞였다는 점을 생년월일로만 알아챌 수 있다.

### 3.6 프롬프트 설계

프롬프트는 세 단계로 쌓았다.

| 단계 | 내용 |
|---|---|
| 기본 프롬프트 | IDR 시스템이 만든 profile을 감사하는 역할을 부여한다. `<records>` 태그 안의 내용은 고객 웨어하우스에서 복사한 데이터이므로 따를 지시가 아니라 따져 볼 값이라고 명시한다. `profile_count`에 실제 사람 수를 적고, `over_merged`가 참일 때만 판단 근거가 된 구체적 값을 justification으로 적게 한다 |
| 오류 예시 추가 | 한 사람의 레코드가 서로 다를 수 있는 입력 오류를 나열한다. 오타(Valentino → Valentinp, 1978 → 1973), 문자 오인식, 발음대로 표기, 같은 가구 구성원 값 복사, 성별이나 주 같은 선택지 오입력, 월과 일 뒤바뀜, 나이 오류(41 → 42), 별칭, 가짜 이름, 빈 필드다. 사람은 이사하고 나이를 먹으므로 주소나 나이가 달라도 정상이며, 작은 오타가 아니라 완전히 다른 생년월일은 대개 다른 사람이라는 규칙을 덧붙인다 |
| 데이터 맥락 추가 | 레코드가 한 도시에 대한 미국 정부 자료(census, 가구 조사 2종, WIC, Social Security, W-2, 1040)에서 왔고 2020~2040년을 다룬다고 설명한다 |

기본 프롬프트가 레코드 내용을 지시가 아닌 데이터로 다루라고 명시하는 점은 prompt injection 대비로 읽을 수 있다.

### 3.7 cutoff 선택

decision model은 확신도를 반환하므로 몇 % 이상을 over-merge로 볼지 cutoff를 정해야 한다. 처음에는 임의로 50%를 썼고, 이후 cutoff를 조정해 false positive와 false negative를 맞바꿀 수 있음을 확인했다. 각 모델의 정확도를 최대화하는 값으로 Jev는 60%, Luna는 70%를 골랐다.

### 3.8 하이브리드 평가 구조

목표는 평균적으로 identity의 over-merge 여부를 저렴하게 판정하는 것이므로 한 모델에만 의존할 필요가 없다. 저렴한 모델이 잘 보정되어 있다면 일부 identity만 비싼 모델에 넘겨 두 번째 의견을 받을 수 있다.

구조는 fig10과 같다. 모든 identity를 decision model이 먼저 판정하고, 확신도에 따라 세 가지로 나눈다.

| 확신도 위치 | 처리 |
|---|---|
| 불확실 구간 아래 | 한 사람으로 받아들인다 |
| 불확실 구간 안 | LLM(Claude Opus 5.5)에 넘겨 다시 판정한다 |
| 불확실 구간 위 | over-merge로 받아들인다 |

글은 Luna가 과신하는 경향이 있어 이 구성의 이득이 작을 것이고, Jev는 이득을 크게 볼 것이라고 예상한 뒤 실험했다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 프롬프트 단계별 효과

모든 모델에서 가장 큰 개선은 오류 예시를 추가했을 때 나왔다. 데이터 맥락은 프런티어 모델에 최대 1%p를 더했고 decision model에는 도움이 되지 않았다. 글은 decision model이 실제로 추론하지 않기 때문에 기초 맥락이 도움이 되지 않는다고 추측한다. 일관성을 위해 모든 모델에 전체 프롬프트를 썼다.

fig03을 판독한 근사값은 다음과 같다 (cutoff 50%, 마지막 열은 본문 표 값).

| 모델 | 기본 프롬프트 | 오류 예시 추가 | 데이터 맥락 추가 |
|---|---|---|---|
| Claude Opus 5.5 | 약 97.3% | 약 98.5% | 99.0% |
| Gemini 3.1 Pro | 약 97.2% | 약 98.4% | 98.3% |
| GPT-6 Sol | 약 94.4% | 약 97.3% | 98.3% |
| GPT-6 Luna | 약 92.1% | 약 97.7% | 97.3% |
| Jev | 약 90.5% | 약 95.5% | 95.6% |

decision model 두 개는 오류 예시 단계에서 약 5%p 이상 올랐고, Luna는 데이터 맥락 단계에서 오히려 약간 내려갔다.

### 4.2 첫 테스트 결과 (최종 프롬프트, cutoff 50%)

| 모델 | 정확도 | false positive | false negative | identity당 시간 | 1,000개당 비용 |
|---|---|---|---|---|---|
| Claude Opus 5.5 | 99.0% | 3 | 7 | 2.2초 | $3.86 |
| Gemini 3.1 Pro | 98.3% | 10 | 7 | 4.2초 | $4.48 |
| GPT-6 Sol | 98.3% | 14 | 3 | 2.1초 | $2.50 |
| GPT-6 Luna (Decisions API) | 97.3% | 17 | 10 | 0.17초 | $0.10 |
| Jev | 95.6% | 31 | 13 | 0.15초 | $0.05 |

### 4.3 cutoff 조정 결과

cutoff의 영향은 Jev에서 크고 Luna에서 작다 (fig04). Jev는 cutoff를 90%까지 올리면 false negative가 약 155건으로 급증하고 false positive는 약 3건으로 줄어든다. Luna는 같은 범위에서 두 값이 모두 약 30건 아래에 머문다.

| 모델 | 정확도 | false positive | false negative | identity당 시간 | 1,000개당 비용 |
|---|---|---|---|---|---|
| GPT-6 Luna (70% cutoff) | 97.3% | 14 | 13 | 0.17초 | $0.10 |
| Jev (60% cutoff) | 95.7% | 22 | 21 | 0.15초 | $0.05 |

프런티어 모델 세 개의 값은 4.2절과 같다. Luna는 정확도가 그대로이고 오류 구성만 바뀌었으며, Jev는 0.1%p 올랐다.

### 4.4 어려운 테스트에서의 격차

어려운 테스트에서는 프런티어 모델과 Luna 사이에 분명한 격차가 생겼고, 첫 테스트에서 앞섰던 Luna가 Jev와 같은 수준으로 내려왔다 (fig05).

| 모델 | 첫 테스트 정확도 | 어려운 테스트 정확도 | 하락 폭 |
|---|---|---|---|
| Claude Opus 5.5 | 99.0% | 95.1% | 3.9%p |
| Gemini 3.1 Pro | 98.3% | 92.1% | 6.2%p |
| GPT-6 Sol | 98.3% | 89.2% | 9.1%p |
| GPT-6 Luna (70% cutoff) | 97.3% | 88.8% | 8.5%p |
| Jev (60% cutoff) | 95.7% | 89.1% | 6.6%p |

Gemini 3.1 Pro와 GPT-6 Sol의 어려운 테스트 정확도는 fig05에만 있고 본문 표에는 없다. GPT-6 Sol(89.2%)은 decision model과 거의 같은 수준까지 내려왔다.

### 4.5 확신도 구간별 오류 분포

글은 Jev와 Luna가 틀리고 큰 모델이 맞힌 사례를 조사하다 보정 차이를 발견했다. 차트(fig06~fig09)는 decision model이 over-merge라고 본 확률을 10% 구간으로 나누고, 구간마다 그 모델의 오류 수와 같은 구간 identity에서 Opus가 틀린 수를 나란히 보여 준다. 구간 아래 숫자는 해당 구간의 identity 수다.

첫 테스트 (cutoff 50% 기준, 오류 합계는 Jev 44건, Luna 27건, Opus 10건):

| 구간 | Jev identity 수 | Jev 오류 | Luna identity 수 | Luna 오류 |
|---|---|---|---|---|
| 0~10% | 256 | 0 | 459 | 1 |
| 10~20% | 126 | 0 | 19 | 4 |
| 20~30% | 54 | 1 | 6 | 2 |
| 30~40% | 27 | 4 | 6 | 1 |
| 40~50% | 19 | 8 | 3 | 2 |
| 50~60% | 17 | 9 | 2 | 1 |
| 60~70% | 21 | 6 | 4 | 2 |
| 70~80% | 29 | 7 | 2 | 1 |
| 80~90% | 103 | 6 | 18 | 5 |
| 90~100% | 347 | 3 | 480 | 8 |

Jev의 오류는 50% 근처에 몰려 있어 잘 보정된 모델에서 기대하는 모습이다. 반면 Luna는 오류 수가 훨씬 적은데도 90~100% 구간에서 가장 많이 틀려 과신 경향을 보인다. Luna는 identity 대부분을 0~10% 또는 90~100%로 극단에 몰아넣는다.

어려운 테스트 (오류 합계는 Jev 108건, Luna 105건, Opus 46건):

| 구간 | Jev identity 수 | Jev 오류 | Luna identity 수 | Luna 오류 |
|---|---|---|---|---|
| 0~10% | 129 | 0 | 320 | 0 |
| 10~20% | 116 | 1 | 62 | 3 |
| 20~30% | 57 | 0 | 21 | 6 |
| 30~40% | 42 | 2 | 10 | 4 |
| 40~50% | 59 | 10 | 12 | 4 |
| 50~60% | 47 | 13 | 8 | 4 |
| 60~70% | 44 | 25 | 8 | 2 |
| 70~80% | 92 | 28 | 19 | 7 |
| 80~90% | 219 | 28 | 40 | 13 |
| 90~100% | 135 | 1 | 441 | 62 |

어려운 테스트에서 Jev의 확신도는 잘못된 방향으로 높아졌지만(오류가 60~90% 구간으로 이동) 보정은 여전히 Luna보다 훨씬 낫다. Luna는 over-merge를 찾았다고 극단적으로 과신하며 90~100% 구간에서만 62건을 틀렸다. 같은 구간에서 Opus도 28건을 틀려, 이 구간에는 어려운 사례가 몰려 있다.

### 4.6 하이브리드 구성 결과 (첫 테스트)

Jev를 먼저 실행하고 지정 구간의 identity만 Opus로 보낸 결과:

| Opus로 보낸 구간 | 보낸 비율 | 정확도 | false positive | false negative | identity당 시간 | 1,000개당 비용 |
|---|---|---|---|---|---|---|
| 없음 (Jev 단독) | 0% | 95.6% | 31 | 13 | 0.15초 | $0.05 |
| 50~80% | 7% | 97.5% | 9 | 16 | 0.30초 | $0.31 |
| 50~90% | 17% | 97.9% | 5 | 16 | 0.52초 | $0.71 |
| 30~90% | 22% | 98.8% | 5 | 7 | 0.63초 | $0.88 |
| 10~90% | 40% | 98.8% | 5 | 7 | 1.02초 | $1.58 |
| 10~100% | 74% | 99.0% | 3 | 7 | 1.79초 | $2.92 |
| 전체 (Opus 단독) | 100% | 99.0% | 3 | 7 | 2.2초 | $3.86 |

Luna를 먼저 실행한 결과:

| Opus로 보낸 구간 | 보낸 비율 | 정확도 | false positive | false negative | identity당 시간 | 1,000개당 비용 |
|---|---|---|---|---|---|---|
| 없음 (Luna 단독) | 0% | 97.3% | 17 | 10 | 0.17초 | $0.10 |
| 50~80% | 1% | 97.5% | 14 | 11 | 0.19초 | $0.13 |
| 50~90% | 3% | 97.9% | 9 | 12 | 0.23초 | $0.20 |
| 30~90% | 4% | 98.1% | 9 | 10 | 0.25초 | $0.24 |
| 10~90% | 6% | 98.5% | 9 | 6 | 0.30초 | $0.33 |
| 10~100% | 54% | 98.9% | 3 | 8 | 1.36초 | $2.19 |
| 전체 (Opus 단독) | 100% | 99.0% | 3 | 7 | 2.2초 | $3.86 |

글은 Jev는 30~90%, Luna는 10~90% 구간을 대표 설정으로 골랐다. Jev 하이브리드(98.8%)는 Luna 하이브리드(98.5%)를 앞서고 Opus 단독(99.0%)에 거의 닿지만, 비슷한 성능에 비해 Luna 하이브리드보다 비싸다. Luna는 확신도가 극단에 몰려 같은 구간 설정에서도 Opus로 넘기는 비율이 Jev보다 훨씬 작다 (30~90%에서 Jev 22%, Luna 4%).

### 4.7 하이브리드 구성 결과 (어려운 테스트)

| 구성 | 첫 테스트 정확도 | 첫 테스트 1,000개당 비용 | 어려운 테스트 정확도 | 어려운 테스트 1,000개당 비용 |
|---|---|---|---|---|
| Claude Opus 5.5 단독 | 99.0% | $3.86 | 95.1% | $5.39 |
| Jev, 30~90%를 Opus로 | 98.8% | $0.88 | 95.3% | $2.94 |
| Luna, 10~90%를 Opus로 | 98.5% | $0.33 | 91.6% | $1.15 |

어려운 테스트에서는 하이브리드 Jev(95.3%)가 Opus 단독(95.1%)을 넘어섰고, 하이브리드 Luna(91.6%)는 Opus 단독보다 3.5%p, 하이브리드 Jev보다 3.7%p 낮았다. Jev는 보정이 잘되어 있어 harness나 프롬프트를 바꾸지 않아도 어려운 데이터에서 더 많은 사례를 Opus로 보낸다. fig08의 구간 합계로 계산하면 어려운 테스트에서 30~90% 구간에 든 identity는 940개 중 503개(약 54%)로, 첫 테스트의 22%보다 훨씬 많다. 비용은 늘지만 필요할 때 지출을 자동으로 늘려 정확도를 유지하는 시스템이며, 여전히 Opus 단독보다 저렴하다. Luna는 단독으로는 더 나아 보이지만 과신 때문에 하이브리드에서 평범한 성능에 머문다.

### 4.8 최종 요약표

| 설정 | 정확도 | identity당 시간 | 1,000개당 비용 |
|---|---|---|---|
| 첫 테스트, Claude Opus 5.5 | 99.0% | 2.2초 | $3.86 |
| 첫 테스트, Jev 단독 (60%) | 95.7% | 0.15초 | $0.05 |
| 첫 테스트, Luna 단독 (70%) | 97.3% | 0.17초 | $0.10 |
| 첫 테스트, 하이브리드 Jev | 98.8% | 0.63초 | $0.88 |
| 첫 테스트, 하이브리드 Luna | 98.5% | 0.30초 | $0.33 |
| 어려운 테스트, Claude Opus 5.5 | 95.1% | 2.6초 | $5.39 |
| 어려운 테스트, Jev 단독 (60%) | 89.1% | 0.15초 | $0.06 |
| 어려운 테스트, Luna 단독 (70%) | 88.8% | 0.20초 | $0.12 |
| 어려운 테스트, 하이브리드 Jev | 95.3% | 1.56초 | $2.94 |
| 어려운 테스트, 하이브리드 Luna | 91.6% | 0.70초 | $1.15 |

제목의 "4x lower cost"는 첫 테스트에서 하이브리드 Jev($0.88)와 Opus 단독($3.86)의 비용 비율(약 4.4배)에 해당한다. 어려운 테스트에서는 같은 비율이 약 1.8배($2.94 대 $5.39)로 줄어든다. 두 비율은 표의 값으로 계산한 것이다.

### 4.9 글이 정리한 결론

- Luna는 단독으로 Jev보다 낫지만, 어려운 사례에서는 격차가 사라진다.
- Jev의 확신도가 더 잘 보정되어 있다. Jev의 실수 대부분은 낮은 확신도에서, Luna의 실수 대부분은 높은 확신도에서 나온다. 이 차이 때문에 하이브리드 harness에서 Jev가 Luna보다 낫다.
- 프런티어 모델은 여전히 decision model보다 정확하다.
- decision model은 단독으로 최대 90배 저렴하고 10배 이상 빠르다. identity 1,000개당 $0.05~$0.10, 응답은 약 0.15초지만 어려운 벤치마크에서 Opus보다 약 6%p 낮다.
- 실제 identity가 얼마나 까다로울지 미리 알 수 없으므로, 필요할 때 지출을 늘리는 하이브리드 Jev가 가치 있다. 비용에 더 민감하거나 쉬운 사례만 판정한다면 하이브리드 Luna를 고를 수 있고, 하이브리드 Jev도 cutoff 구간을 좁혀 정확도를 조금 내주고 비용을 낮출 수 있다.
- 하이브리드 방식은 이 도메인에만 유용한 것이 아닐 것이라고 추측한다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

### 5.1 글이 밝힌 한계와 후속 과제

- 비용과 지연은 Hightouch 환경에서 관찰한 값이며 달라질 수 있다.
- decision model은 어려운 벤치마크에서 Opus보다 약 6%p 낮다. 프런티어 모델이 여전히 더 정확하다.
- under-merging(한 사람이 여러 identity로 쪼개지는 오류)은 다루지 않았고 후속 글로 미뤘다.
- 독점 API(Jev, GPT-6 Luna)에 의존한다. open-weight decision model로 바꿨을 때의 성능 저하는 후속 과제로 남겼다.

### 5.2 실험 구성에서 읽히는 제약

아래 항목은 글이 직접 한계로 적지 않았지만 원문의 실험 설명에서 확인되는 조건이다.

- 벤치마크가 합성 데이터다. pseudopeople로 만든 가상 도시의 미국 정부 자료 형식 레코드이며, 도입부 예시로 든 로열티와 거래 레코드 형식은 벤치마크에 쓰이지 않았다.
- 첫 테스트는 1,000개, 어려운 테스트는 차트 기준 약 940개다. 첫 테스트에서 1%p는 identity 10개에 해당하므로 0.1~0.5%p 차이는 몇 건의 차이다.
- 첫 테스트는 절반을 over-merge로 구성했지만, 글은 건강한 그래프에서 over-merge가 드물다고 적는다. 즉 벤치마크의 over-merge 비율은 운영 환경보다 훨씬 높다.
- cutoff(Jev 60%, Luna 70%)는 같은 테스트에서 정확도를 최대화하는 값으로 골랐고, 하이브리드 구간도 같은 테스트의 결과표에서 골랐다. 별도 검증 세트를 썼다는 서술은 없다.
- 프롬프트 단계별 정확도는 차트로만 제시되어 정확한 수치를 알 수 없다 (4.1절 표는 판독 근사값).

## 6. 관련 연구 (Related Work)

- Jev: TypeSafe AI의 System One model. 보정된 확률을 목표로 학습한 decision model이며, 원문은 소개 글(typesafe.ai/blog/introducing-system-one-models-and-jev)을 링크한다. wiki의 [[llms/hada-2026-jev-judgment-probability-model]]과 [[llms/typesafe-ai-2026-introduction]]이 같은 모델을 다룬다.
- GPT-6 Luna, Decisions API: OpenAI의 판단 전용 API로, 원문은 developers.openai.com의 decisions 가이드를 링크한다. 이 저장소에는 해당 가이드 자료가 없다. 같은 천체 이름 라인업의 직전 세대는 [[llms/9bow-2026-gpt-5-6-sol-terra-luna]]가 다룬다.
- pseudopeople: University of Washington IHME의 합성 인구 레코드 생성 도구.
- LLM-as-a-Judge 일반론과 평가 계층 설계는 [[evaluations/kim-2026-ai-prd-eval-plan]]이 다룬다.

## 7. 용어집 (Glossary)

- identity resolution (IDR): 여러 출처의 데이터 레코드를 실제 사람 단위의 identity로 묶는 과정.
- identity: IDR이 만든 단위. 실세계의 정확히 한 사람에 대응해야 한다.
- over-merging: identity 하나가 실세계의 여러 사람에 대응하는 오류. IDR에서 가장 흔하고 문제가 큰 실패다.
- under-merging: 한 사람이 여러 identity로 나뉘는 반대 방향의 오류. 이 글은 다루지 않는다.
- decision model: 특정 조건이 참일 확신도를 0~1 점수로 반환하는 언어 모델 계열. 글에서는 Jev와 GPT-6 Luna(Decisions API)를 가리킨다.
- cutoff: decision model의 확신도를 over-merge 판정으로 바꾸는 기준값. 글은 Jev 60%, Luna 70%를 골랐다.
- 보정(calibration): 모델이 낸 확신도가 실제 정답률과 맞는 성질. 잘 보정된 모델은 50% 근처에서 많이 틀리고 극단값에서는 드물게 틀린다.
- 하이브리드 평가 구성: decision model이 먼저 판정하고 불확실 구간의 identity만 프런티어 모델에 넘기는 2단 구조.
- pseudopeople: 가상 도시 주민의 레코드를 여러 출처 형식으로 생성하고 노이즈를 주입하는 합성 데이터 도구.

## 8. 그림 후보 (Figure Candidates)

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | 평가 모델별 파레토 프런티어 (비용 대 정확도) | fetched | ★ wiki 권장 (result, 요약 도식) |
| fig02 | IDR 설정 반복 루프와 LLM judge의 위치 | fetched | ★ wiki 권장 (background) |
| fig03 | 프롬프트 단계별 정확도 꺾은선 | fetched | ★ wiki 권장 (method) |
| fig04 | cutoff에 따른 false positive와 false negative | fetched | ★ wiki 권장 (result) |
| fig05 | 첫 테스트와 어려운 테스트 정확도 막대 | fetched | ★ wiki 권장 (result, 본문에 없는 수치) |
| fig06 | 첫 테스트 Jev 확신도 구간별 오류 | fetched | ★ wiki 권장 (calibration) |
| fig07 | 첫 테스트 Luna 확신도 구간별 오류 | fetched | ★ wiki 권장 (calibration) |
| fig08 | 어려운 테스트 Jev 확신도 구간별 오류 | fetched | ★ wiki 권장 (calibration) |
| fig09 | 어려운 테스트 Luna 확신도 구간별 오류 | fetched | ★ wiki 권장 (calibration) |
| fig10 | 하이브리드 평가 구조도 | fetched | ★ wiki 권장 (method) |

> 메모: fig01, fig02, fig05, fig10은 원문이 SVG로 실은 도식이라 스크립트 다운로드에서 빠졌고, 원문 CDN에서 SVG 원본을 받아 아카이브했다. fig05는 Gemini 3.1 Pro(92.1%)와 GPT-6 Sol(89.2%)의 어려운 테스트 정확도를 담은 유일한 근거다. fig06~fig09의 구간별 수치는 4.5절 표로 옮겼다.
