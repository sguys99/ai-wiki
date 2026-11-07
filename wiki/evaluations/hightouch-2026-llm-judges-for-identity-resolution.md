---
title: "LLM Judges for Identity Resolution at 4x Lower Cost"
type: article
year: 2026
category: evaluations
source: hightouch-2026-llm-judges-for-identity-resolution.md
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

## 요약

이 글은 고객 데이터 플랫폼 기업 Hightouch가 identity resolution 결과를 채점하는 문제에 LLM-as-a-Judge를 적용한 실험 보고다. LLM-as-a-Judge는 사람 대신 LLM이 다른 시스템의 출력을 채점하게 하는 평가 방식이다. 여기서 채점 대상은 IDR 엔진이 만든 identity이고, 판정할 질문은 "이 identity에 실제로 여러 사람이 섞였는가"다.

비교 대상은 두 계열이다. 하나는 Claude Opus 5.5, Gemini 3.1 Pro, GPT-6 Sol 같은 프런티어 모델이고, 다른 하나는 조건이 참일 확신도를 0~1 점수로 반환하는 decision model인 Jev와 GPT-6 Luna(Decisions API)다. decision model은 단독으로 88.8~97.3%의 정확도를 내며, identity 1,000개당 $0.05~$0.10로 프런티어 모델보다 최대 90배 저렴하고 10배 이상 빠르다.

글의 핵심 발견은 보정(calibration)의 차이가 하이브리드 구성의 성패를 가른다는 점이다. 보정은 모델이 낸 확신도가 실제 정답률과 맞는 성질을 말한다. Jev는 단독 정확도가 Luna보다 낮지만 확신도가 잘 보정되어 있어, 불확실한 사례만 Opus에 넘기는 구성으로 Opus 단독과 같은 수준의 정확도를 4배 이상 낮은 비용으로 낸다. 반면 Luna는 틀릴 때도 확신하는 경향이 있어 같은 구성에서 이득이 작다.

![[assets/hightouch-2026-llm-judges-for-identity-resolution/fig01.svg]]
*Figure 1: 평가 모델별 파레토 프런티어. 가로축은 identity 1,000개당 비용, 세로축은 over-merging 탐지 정확도이며, 하이브리드 두 구성이 단독 모델보다 왼쪽 위(더 싸고 더 정확한 위치)에 놓인다 (Hightouch 2026, 원문 이미지)*

## 배경

### identity resolution 문제

identity resolution(IDR)은 여러 출처의 데이터 레코드를 실제 사람 단위의 identity로 묶는 과정이다. 글은 이를 형식적으로 정의한다. 레코드 집합 `D`가 주어지면 identity 집합 `I`와 대응 `m(D)->I`를 정하되, 다음 세 조건을 만족해야 한다.

- 각 레코드 `d ∈ D`는 하나의 identity `i ∈ I`에 대응한다.
- 각 `i`는 실세계의 정확히 한 사람에 대응한다.
- 서로 다른 두 `i`가 같은 사람에 대응하지 않는다.

IDR은 고객 대상 아웃리치, 개인화, 분석을 하려는 회사의 기반 작업이다. 예를 들어 한 고객의 구매 기록을 하나의 identity로 묶지 못하면 그 고객의 생애 가치를 계산할 수 없다.

원문 예시에서 IDR은 아래 네 레코드를 `Alice`라는 identity 하나로 묶어야 한다. 로열티 레코드 두 개와 거래 레코드 두 개가 이메일, 집 주소, 배송 주소를 부분적으로 공유하며, 마지막 레코드는 이름이 비어 있다.

| 레코드 | 이름 | 이메일 | 집 주소 | 배송 주소 |
|---|---|---|---|---|
| `loyalty_record_1` | Alice | alice@alice.com | 없음 | 없음 |
| `loyalty_record_2` | Alice | 없음 | 123 Main St | 없음 |
| `transaction_record_1` | Alice | 없음 | 없음 | 123 Main St |
| `transaction_record_2` | (null) | alice@alice.com | 없음 | Store Pickup |

### 데이터 오류와 over-merging

실제 데이터에서 IDR은 매우 어렵다. 여러 사람이 이메일을 공유하고, 사람이 이사하며, 입력 오류가 섞인다. 같은 표면 차이가 오류일 수도 있고 다른 사람이라는 증거일 수도 있다는 점이 핵심 난점이다. 글이 든 오류 유형은 아래와 같다.

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

IDR의 가장 흔하고 문제가 큰 실패는 over-merging이다. over-merging은 identity 하나가 실세계의 여러 사람에 대응하는 오류를 말한다. 예를 들어 "Robert"와 "Bob"을 별칭으로 보고 합쳤는데 실제로는 형제 두 명이었다면 over-merge가 생긴다.

### 정답 없는 평가와 사람 검토의 한계

over-merging을 측정하기 어려운 이유는 실제 데이터에 정답이 없기 때문이다. 병합 후 참조할 정답이 있다면 그 정답으로 매칭하면 되므로 IDR 자체가 필요 없다. 따라서 팀은 IDR이 제대로 동작하는지 판단하는 데 몇 달을 쓰기도 한다.

identity당 이메일 수를 세는 식의 휴리스틱으로 over-merge의 통계적 징후를 볼 수는 있다. 그러나 최종 판단은 출력 identity를 표본 추출해 사람이 직접 검토하는 방식에 의존한다. 글은 identity `i`에 대응하는 레코드 집합을 `Dᵢ`로 두고, IDR이 성공했다면 어떤 `Dᵢ`에서도 한 사람의 증거만 나와야 한다고 정리한다.

사람 검토에는 두 가지 한계가 있다.

| 한계 | 내용 |
|---|---|
| 속도 | 시간당 약 50개 identity를 검토한다 |
| 표본 크기 | 건강한 그래프에서 over-merge는 드물고, 드문 비율을 정밀하게 추정하려면 많은 표본이 필요하다. over-merge 비율 오차를 ±1% 이내로 줄이려면 1,000개 넘는 표본이 필요하다 |

두 한계를 합치면 정밀한 추정 한 번에 사람 작업 20시간 이상이 든다는 뜻이다 (1,000개를 시간당 50개로 나눈 값).

### LLM judge가 바꾸는 반복 주기

글의 출발점은 사람이 identity를 검사하는 작업을 LLM이 그대로 흉내 낼 수 있다는 직관이다. LLM이 사람 수준의 정확도로 identity를 판정한다면 원하는 만큼 병렬로 띄울 수 있고, 10만 개 identity 표본도 몇 초 안에 평가할 수 있다.

이 변화는 IDR 설정을 고치는 반복 주기를 바꾼다. 아래 루프에서 LLM judge가 정확도 추정을 빠르게 제공하면, 설정을 바꾸고 다시 확인하는 한 바퀴가 몇 달에서 훨씬 짧은 시간으로 줄어든다. 글은 설정 초기 작업뿐 아니라 이후 유지 보수도 쉬워진다고 본다.

![[assets/hightouch-2026-llm-judges-for-identity-resolution/fig02.svg]]
*Figure 2: IDR 설정 반복 루프. 원본 레코드가 IDR 엔진을 거쳐 identity가 되고, LLM judge의 정확도 추정이 기준에 못 미치면 설정을 바꿔 다시 실행한다 (Hightouch 2026, 원문 이미지)*

## 핵심 개념

decision model은 특정 조건이 참일 확신도를 0~1 점수로 반환하는 언어 모델 계열이다. 글에서는 TypeSafe AI의 Jev와 OpenAI의 GPT-6 Luna(Decisions API)를 가리킨다. 문장을 생성하지 않고 확률 하나를 내므로 프런티어 모델보다 훨씬 빠르고 저렴하다.

cutoff는 decision model의 확신도를 이진 판정으로 바꾸는 기준값이다. 확신도가 cutoff 이상이면 over-merge로, 미만이면 한 사람으로 판정한다. cutoff를 올리면 over-merge 판정이 줄어든다.

false positive와 false negative는 over-merge 판정을 양성으로 놓고 센 두 종류의 오류다. 이 글의 그래프에서 cutoff를 올릴수록 false positive가 줄고 false negative가 늘어나는 방향이 이 정의와 일치한다.

| 오류 | 실제 | 판정 | IDR 평가에 미치는 영향 |
|---|---|---|---|
| false positive | 한 사람 | over-merge | over-merge 비율을 실제보다 높게 추정한다 |
| false negative | over-merge | 한 사람 | over-merge 비율을 실제보다 낮게 추정한다 |

보정은 확신도와 실제 정답률이 맞는 성질이다. 잘 보정된 모델이 70%라고 답한 사례들은 실제로 약 70%가 맞다. 그 결과 잘 보정된 모델의 오류는 50% 근처에 몰리고, 0%나 100%에 가까운 극단값에서는 드물다. 반대로 과신하는 모델은 90~100%라고 답하고도 자주 틀린다.

하이브리드 평가 구성은 decision model이 먼저 판정하고, 확신도가 불확실 구간에 든 identity만 프런티어 모델에 넘기는 2단 구조다. 이 구조가 동작하려면 "확신도가 애매하면 틀릴 가능성이 높다"는 전제가 성립해야 하고, 이 전제가 곧 보정이다. 따라서 이 글에서 보정은 부수 지표가 아니라 시스템 설계의 전제 조건이다.

## 방법

### 벤치마크 구성

벤치마크 데이터는 University of Washington의 Institute for Health Metrics and Evaluation이 만든 pseudopeople로 생성했다. pseudopeople은 가상의 미국 도시를 시뮬레이션하고 여러 출처 형식으로 주민 레코드를 만드는 도구다. Hightouch는 여기에 현실적인 데이터 오류를 추가로 주입했다.

| 항목 | 내용 |
|---|---|
| 기록 출처 | 10년마다 하는 census, 가구 조사 2종, 급여 프로그램 WIC, Social Security, W-2와 1040 세금 양식 |
| 기간 | 2020~2040년 |
| 첫 테스트 | identity 1,000개. 절반은 노이즈가 섞인 한 사람, 절반은 over-merge |
| 어려운 테스트 | 같은 도시와 같은 노이즈 종류로 까다로운 사례만 구성. 원문은 크기를 밝히지 않으며, 확신도 차트(Figure 8, Figure 9)의 구간 합계는 940~941개 |

### 어려운 테스트의 함정

첫 테스트에서 Luna가 프런티어 모델에 거의 근접하자, 글은 프런티어 모델이 앞서 나갈 수 있는지 보려고 난이도를 올렸다. 어려운 테스트는 모델을 속이도록 두 종류의 사례로 구성했다.

1. 오타 사례: 실제로는 한 사람인데 생년월일이나 이름 같은 중요한 필드가 레코드마다 다르다. 판정자가 오류를 다른 사람의 증거로 오해하면 false positive가 생긴다.
2. 매우 비슷한 사람의 over-merge: 쌍둥이, 아버지와 같은 이름을 쓰는 아들(junior와 senior), 동명이인 등이다. 판정자가 차이를 오류로 너그럽게 넘기면 false negative가 생긴다.

원문은 쉬운 over-merge와 어려운 over-merge 예시를 하나씩 보여 준다. 쉬운 예시는 Daniel Z Gardner와 Jenna K Gardner의 레코드가 섞인 경우다.

| 출처 | 이름 | 생년월일 | 주소 |
|---|---|---|---|
| Census | Daniel Z Gardner | 06/02/1990 | 11648 main street |
| W-2 | Daniel Z Gardner | 없음 | 11648 main street |
| 1040 tax form | Jenna K Gardner | 없음 | 8203 west farwell avenue |
| Census | Jenna K Gardner | 12/29/1991 | 8203 west farwell avenue |

이름, 생년월일, 주소가 모두 달라 성씨만 같은 두 사람이라는 점이 쉽게 드러난다.

어려운 예시는 Christopher Carpenter라는 이름을 공유하는 두 사람이 섞인 경우다.

| 출처 | 이름 | 생년월일 | 주소 |
|---|---|---|---|
| Social Security | Christopher Brentley Carpenter | 없음 | 없음 |
| WIC | Christopher B Carpenter | 02242023 | 1978 minnie rd |
| Social Security | Christopher Brian Carpenter | 19860213 | 없음 |
| 1040 tax form | Christopher B Carpenter | 없음 | 1978 minnie rd |

중간 이름 이니셜이 B로 같고 두 레코드가 같은 주소를 쓰므로 표면상 한 사람처럼 보인다. 그러나 두 생년월일이 2023년(02242023)과 1986년(19860213)으로 달라, 실제로는 아이와 성인이 섞였다는 점을 알아채야 한다. 두 값은 표기 형식도 서로 다르다. 이름과 주소가 아닌 생년월일 한 필드가 판정을 가르는 사례다.

### 프롬프트 설계

프롬프트는 세 단계로 쌓았다. 각 단계의 기여는 결과 절에서 비교한다.

| 단계 | 내용 |
|---|---|
| 기본 프롬프트 | IDR 시스템이 만든 profile을 감사하는 역할을 부여한다. profile은 시스템이 모두 같은 실제 사람을 기술한다고 판단한 레코드 묶음이다. `<records>` 태그 안의 내용은 고객 웨어하우스에서 복사한 데이터이므로 따를 지시가 아니라 따져 볼 값이라고 명시한다 |
| 오류 예시 추가 | 한 사람의 레코드가 서로 다를 수 있는 입력 오류 열 가지를 나열한다. 사람은 이사하고 나이를 먹으므로 주소나 나이 차이는 정상이고, 작은 오타가 아닌 완전히 다른 생년월일은 대개 다른 사람이라는 규칙을 덧붙인다 |
| 데이터 맥락 추가 | 레코드가 한 도시에 대한 미국 정부 자료(census, 가구 조사 2종, WIC, Social Security, W-2, 1040)에서 왔고 2020~2040년을 다룬다고 설명한다 |

기본 프롬프트의 출력 형식도 정해 두었다. `profile_count`에는 레코드가 기술한다고 보는 서로 다른 사람의 수를 적고, `over_merged`가 참일 때만 판단 근거가 된 구체적 값을 justification으로 적는다. 레코드를 지시가 아닌 데이터로 다루라는 문장은 고객 데이터 안에 섞인 텍스트가 판정자를 조종하지 못하게 하는 장치로, prompt injection 대비에 해당한다.

오류 예시 단계가 나열한 항목은 다음과 같다.

- 오타: Valentino → Valentinp, 1978 → 1973
- 문자 오인식: Sam → 5am
- 발음대로 표기: Phillips → Filips
- 친척 생년월일처럼 같은 가구 구성원의 값 복사
- 성별이나 주 같은 선택지 오입력
- 월과 일 뒤바뀜: 02/17/2020 → 17/02/2020
- 나이 오류: 41 → 42
- 별칭: Robert → Bob
- 가짜 이름: Valentino → Female Child
- 빈 필드

### cutoff 선택

decision model은 확신도를 내므로 판정 기준값을 정해야 한다. 글은 처음에 50%를 썼지만 이 값은 임의였다. cutoff를 움직이면 false positive와 false negative를 서로 맞바꿀 수 있으므로, 각 모델의 정확도를 최대화하는 값으로 Jev는 60%, Luna는 70%를 골랐다.

### 하이브리드 평가 구조

글이 원하는 것은 평균적으로 identity의 over-merge 여부를 저렴하게 판정하는 능력이며, 한 모델에만 의존할 필요는 없다. 저렴한 모델이 잘 보정되어 있다면 일부 identity만 비싼 모델에 넘겨 두 번째 의견을 받으면 된다.

![[assets/hightouch-2026-llm-judges-for-identity-resolution/fig10.svg]]
*Figure 10: 하이브리드 평가 구조. decision model의 확신도가 불확실 구간에 들면 LLM으로 보내고, 구간 아래는 한 사람으로, 구간 위는 over-merge로 그대로 받아들인다 (Hightouch 2026, 원문 이미지)*

모든 identity를 decision model이 먼저 판정하고, 확신도 위치에 따라 처리를 나눈다.

| 확신도 위치 | 처리 |
|---|---|
| 불확실 구간 아래 | 한 사람으로 받아들인다 |
| 불확실 구간 안 | Claude Opus 5.5에 넘겨 다시 판정한다 |
| 불확실 구간 위 | over-merge로 받아들인다 |

구간 경계(예: 30~90%)를 넓히면 Opus로 가는 비율과 비용이 함께 늘고, 좁히면 둘 다 줄어든다. 글은 실험 전에 Luna는 과신 경향 때문에 이 구성의 이득이 작고 Jev는 이득을 크게 볼 것이라고 예상했다.

## 결과

### 프롬프트 단계별 효과

모든 모델에서 가장 큰 개선은 오류 예시를 추가한 단계에서 나왔다. 데이터 맥락은 프런티어 모델에 최대 1%p를 더했고 decision model에는 도움이 되지 않았다. 글은 decision model이 실제로 추론하지 않으므로 기초 맥락 정보가 도움이 되지 않는다고 추측한다. 일관성을 위해 이후 실험은 모든 모델에 전체 프롬프트를 썼다.

![[assets/hightouch-2026-llm-judges-for-identity-resolution/fig03.png]]
*Figure 3: 프롬프트 단계별 정확도. 기본 프롬프트, 오류 예시 추가, 데이터 맥락 추가의 세 단계에서 다섯 모델의 정확도 변화를 그렸고 cutoff는 50%다 (Hightouch 2026, 원문 이미지)*

원문은 단계별 수치를 차트로만 제시한다. 아래 표의 앞 두 열은 Figure 3을 판독한 근사값이고, 마지막 열은 본문 결과표의 값이다.

| 모델 | 기본 프롬프트 | 오류 예시 추가 | 데이터 맥락 추가 |
|---|---|---|---|
| Claude Opus 5.5 | 약 97.3% | 약 98.5% | 99.0% |
| Gemini 3.1 Pro | 약 97.2% | 약 98.4% | 98.3% |
| GPT-6 Sol | 약 94.4% | 약 97.3% | 98.3% |
| GPT-6 Luna | 약 92.1% | 약 97.7% | 97.3% |
| Jev | 약 90.5% | 약 95.5% | 95.6% |

decision model 두 개는 오류 예시 단계에서 약 5%p 이상 올라 상승 폭이 가장 컸다. 기본 프롬프트에서는 판정자가 오타와 별칭을 다른 사람의 증거로 오해하기 쉽고, 오류 예시 목록이 그 오해를 직접 교정한다. 반면 Luna는 데이터 맥락 단계에서 오히려 약간 내려갔다.

### 첫 테스트 결과

최종 프롬프트와 cutoff 50%로 첫 테스트를 실행한 결과는 다음과 같다.

| 모델 | 정확도 | false positive | false negative | identity당 시간 | 1,000개당 비용 |
|---|---|---|---|---|---|
| Claude Opus 5.5 | 99.0% | 3 | 7 | 2.2초 | $3.86 |
| Gemini 3.1 Pro | 98.3% | 10 | 7 | 4.2초 | $4.48 |
| GPT-6 Sol | 98.3% | 14 | 3 | 2.1초 | $2.50 |
| GPT-6 Luna (Decisions API) | 97.3% | 17 | 10 | 0.17초 | $0.10 |
| Jev | 95.6% | 31 | 13 | 0.15초 | $0.05 |

Opus가 가장 정확하지만 decision model과의 격차는 Luna 1.7%p, Jev 3.4%p다. 반면 비용은 Jev가 Gemini 3.1 Pro의 약 1/90이고, 시간은 decision model이 프런티어 모델보다 10배 이상 짧다. 첫 테스트만 보면 Luna는 프런티어 모델에 근접한 정확도를 아주 작은 비용으로 낸다.

### cutoff 조정 결과

cutoff가 결과에 미치는 영향은 Jev에서 크고 Luna에서 작다.

![[assets/hightouch-2026-llm-judges-for-identity-resolution/fig04.png]]
*Figure 4: cutoff에 따른 false positive(파랑)와 false negative(검정) 수. 왼쪽 Jev는 cutoff를 올리면 false negative가 급증하고, 오른쪽 GPT-6 Luna는 두 곡선이 거의 평탄하다 (Hightouch 2026, 원문 이미지)*

Jev는 cutoff를 90%까지 올리면 false negative가 약 155건으로 늘고 false positive는 약 3건으로 줄어든다. 즉 Jev의 확신도가 0~1 사이에 넓게 퍼져 있어 기준값을 옮기면 판정이 많이 바뀐다. Luna는 같은 범위에서 두 값이 모두 약 30건 아래에 머문다. Luna의 확신도가 양 끝에 몰려 있어 기준값을 옮겨도 판정이 거의 바뀌지 않기 때문이다.

정확도를 최대화하는 cutoff를 적용한 결과는 다음과 같다. 프런티어 모델 세 개는 cutoff와 무관하므로 첫 테스트 결과와 같다.

| 모델 | 정확도 | false positive | false negative | identity당 시간 | 1,000개당 비용 |
|---|---|---|---|---|---|
| GPT-6 Luna (70% cutoff) | 97.3% | 14 | 13 | 0.17초 | $0.10 |
| Jev (60% cutoff) | 95.7% | 22 | 21 | 0.15초 | $0.05 |

Luna는 정확도가 그대로이고 오류 구성만 바뀌었다. Jev는 0.1%p 올랐고 false positive와 false negative가 균형을 이뤘다.

### 어려운 테스트에서 드러난 격차

어려운 테스트에서는 프런티어 모델과 Luna 사이에 분명한 격차가 생겼다. 또한 첫 테스트에서 Jev를 앞섰던 Luna가 Jev와 같은 수준으로 내려왔다.

![[assets/hightouch-2026-llm-judges-for-identity-resolution/fig05.svg]]
*Figure 5: 첫 테스트(회색)와 어려운 테스트(파랑)의 모델별 정확도. 어려운 테스트에서 Opus는 95.1%, Luna는 88.8%, Jev는 89.1%다 (Hightouch 2026, 원문 이미지)*

| 모델 | 첫 테스트 정확도 | 어려운 테스트 정확도 | 하락 폭 |
|---|---|---|---|
| Claude Opus 5.5 | 99.0% | 95.1% | 3.9%p |
| Gemini 3.1 Pro | 98.3% | 92.1% | 6.2%p |
| GPT-6 Sol | 98.3% | 89.2% | 9.1%p |
| GPT-6 Luna (70% cutoff) | 97.3% | 88.8% | 8.5%p |
| Jev (60% cutoff) | 95.7% | 89.1% | 6.6%p |

Opus의 하락 폭이 가장 작아, 까다로운 사례에서 프런티어 모델 가운데서도 Opus의 우위가 커진다. Gemini 3.1 Pro와 GPT-6 Sol의 어려운 테스트 정확도는 Figure 5에만 있고 본문 표에는 없다. 특히 GPT-6 Sol(89.2%)은 decision model과 거의 같은 수준까지 내려와, 프런티어 모델이라고 해서 모두 어려운 사례에 강하지는 않다는 점을 보여 준다.

### 확신도 구간별 오류 분포

글은 Jev와 Luna가 틀리고 큰 모델이 맞힌 사례를 조사하다 두 모델의 보정 차이를 발견했다. 아래 차트는 decision model이 over-merge라고 본 확률을 10% 구간으로 나누고, 구간마다 그 모델의 오류 수(파랑)와 같은 구간 identity에서 Opus가 틀린 수(회색)를 나란히 보여 준다. 가로축 아래 숫자는 구간에 속한 identity 수다. 회색 막대를 모두 더하면 Opus의 전체 오류 수(첫 테스트 10건, 어려운 테스트 46건)와 같다.

먼저 첫 테스트의 두 모델을 비교한다.

![[assets/hightouch-2026-llm-judges-for-identity-resolution/fig06.png]]
*Figure 6: 첫 테스트에서 Jev 확신도 구간별 Jev 오류 수와 같은 구간에서 Opus가 틀린 수. Jev의 오류는 40~60% 구간에 몰려 있다 (Hightouch 2026, 원문 이미지)*

![[assets/hightouch-2026-llm-judges-for-identity-resolution/fig07.png]]
*Figure 7: 첫 테스트에서 Luna 확신도 구간별 Luna 오류 수와 같은 구간에서 Opus가 틀린 수. 오류가 가장 많은 구간이 90~100%다 (Hightouch 2026, 원문 이미지)*

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
| 합계 | 999 | 44 | 999 | 27 |

Jev의 오류는 50% 근처에 몰려 있어 잘 보정된 모델에서 기대하는 모습이다. 예를 들어 50~60% 구간에서는 17개 중 9개를 틀렸지만 0~20% 구간 382개에서는 하나도 틀리지 않았다. 반면 Luna는 전체 오류가 27건으로 더 적은데도 90~100% 구간에서 가장 많은 8건을 틀렸다. Luna는 identity 999개 중 939개를 0~10% 또는 90~100%로 분류해, 확신도를 양 끝에 몰아넣는다.

다음은 어려운 테스트다.

![[assets/hightouch-2026-llm-judges-for-identity-resolution/fig08.png]]
*Figure 8: 어려운 테스트에서 Jev 확신도 구간별 오류 수. 오류가 60~90% 구간으로 이동했지만 90~100% 구간 오류는 1건이다 (Hightouch 2026, 원문 이미지)*

![[assets/hightouch-2026-llm-judges-for-identity-resolution/fig09.png]]
*Figure 9: 어려운 테스트에서 Luna 확신도 구간별 오류 수. 90~100% 구간에서만 62건이 틀려 과신이 두드러진다 (Hightouch 2026, 원문 이미지)*

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
| 합계 | 940 | 108 | 941 | 105 |

어려운 테스트에서 Jev의 확신도는 잘못된 방향으로 높아졌다. 오류가 50% 근처에서 60~90% 구간으로 이동했기 때문이다. 그래도 90~100% 구간 오류는 135개 중 1건뿐이라 보정은 여전히 Luna보다 훨씬 낫다. Luna는 over-merge를 찾았다고 극단적으로 과신해, 90~100% 구간 441개 중 62건을 틀렸다. 같은 구간에서 Opus도 28건을 틀렸으므로 이 구간에는 어려운 사례가 몰려 있다.

### 하이브리드 구성 결과

첫 테스트에서 Jev를 먼저 실행하고 지정 구간의 identity만 Opus로 보낸 결과는 다음과 같다.

| Opus로 보낸 구간 | 보낸 비율 | 정확도 | false positive | false negative | identity당 시간 | 1,000개당 비용 |
|---|---|---|---|---|---|---|
| 없음 (Jev 단독) | 0% | 95.6% | 31 | 13 | 0.15초 | $0.05 |
| 50~80% | 7% | 97.5% | 9 | 16 | 0.30초 | $0.31 |
| 50~90% | 17% | 97.9% | 5 | 16 | 0.52초 | $0.71 |
| 30~90% | 22% | 98.8% | 5 | 7 | 0.63초 | $0.88 |
| 10~90% | 40% | 98.8% | 5 | 7 | 1.02초 | $1.58 |
| 10~100% | 74% | 99.0% | 3 | 7 | 1.79초 | $2.92 |
| 전체 (Opus 단독) | 100% | 99.0% | 3 | 7 | 2.2초 | $3.86 |

Luna를 먼저 실행한 결과는 다음과 같다.

| Opus로 보낸 구간 | 보낸 비율 | 정확도 | false positive | false negative | identity당 시간 | 1,000개당 비용 |
|---|---|---|---|---|---|---|
| 없음 (Luna 단독) | 0% | 97.3% | 17 | 10 | 0.17초 | $0.10 |
| 50~80% | 1% | 97.5% | 14 | 11 | 0.19초 | $0.13 |
| 50~90% | 3% | 97.9% | 9 | 12 | 0.23초 | $0.20 |
| 30~90% | 4% | 98.1% | 9 | 10 | 0.25초 | $0.24 |
| 10~90% | 6% | 98.5% | 9 | 6 | 0.30초 | $0.33 |
| 10~100% | 54% | 98.9% | 3 | 8 | 1.36초 | $2.19 |
| 전체 (Opus 단독) | 100% | 99.0% | 3 | 7 | 2.2초 | $3.86 |

두 표는 보정 차이가 어떻게 비용 구조로 이어지는지 보여 준다. Jev는 30~90% 구간만 Opus에 넘겨도(22%) 정확도가 98.8%로 오르고, 구간을 10~90%로 넓혀도 더 오르지 않는다. 즉 Jev의 오류 대부분이 이미 30~90% 구간 안에 있다. 첫 테스트 차트로 계산하면 Jev 오류 44건 중 40건이 이 구간에 속한다.

Luna는 같은 구간 설정에서도 Opus로 넘기는 비율이 훨씬 작다 (30~90%에서 Jev 22%, Luna 4%). 확신도가 양 끝에 몰려 있어 불확실 구간에 드는 identity 자체가 적기 때문이다. 글이 대표 설정으로 고른 10~90% 구간에서 Luna 하이브리드는 6%만 넘겨 98.5%를 냈다. Jev 하이브리드(98.8%)가 정확도에서 앞서고 Opus 단독(99.0%)에 거의 닿지만, 비슷한 성능에 비해 Luna 하이브리드($0.33)보다 비용($0.88)이 높다.

### 어려운 테스트의 하이브리드 결과

어려운 테스트에서 두 하이브리드 구성의 차이가 분명해진다.

| 구성 | 첫 테스트 정확도 | 첫 테스트 1,000개당 비용 | 어려운 테스트 정확도 | 어려운 테스트 1,000개당 비용 |
|---|---|---|---|---|
| Claude Opus 5.5 단독 | 99.0% | $3.86 | 95.1% | $5.39 |
| Jev, 30~90%를 Opus로 | 98.8% | $0.88 | 95.3% | $2.94 |
| Luna, 10~90%를 Opus로 | 98.5% | $0.33 | 91.6% | $1.15 |

하이브리드 Jev(95.3%)는 어려운 테스트에서 Opus 단독(95.1%)을 넘어섰고, 하이브리드 Luna(91.6%)는 Opus보다 3.5%p 낮았다. 글은 이 차이를 보정으로 설명한다. Jev는 harness나 프롬프트를 전혀 바꾸지 않아도 어려운 데이터에서 더 많은 사례를 불확실 구간에 놓아 Opus로 보낸다.

Figure 8의 구간 합계로 계산하면 어려운 테스트에서 Jev의 30~90% 구간에 든 identity는 940개 중 503개(약 54%)로, 첫 테스트의 22%보다 훨씬 많다. Jev 오류 108건 중 106건도 이 구간에 있다. 반면 Luna의 10~90% 구간은 어려운 사례가 몰린 90~100% 구간을 넘기지 않으므로, 그 구간의 오류 62건이 Opus의 검토를 받지 못하고 그대로 남는다.

결과적으로 하이브리드 Jev는 데이터가 어려워지면 지출을 자동으로 늘려 정확도를 유지한다. 어려운 테스트의 비용 $2.94는 첫 테스트의 $0.88보다 크지만 여전히 Opus 단독($5.39)보다 저렴하다. Luna는 단독 성능이 더 좋아 보이지만 과신 때문에 하이브리드에서 평범한 성능에 머문다.

### 최종 결과 요약

| 테스트 | 설정 | 정확도 | identity당 시간 | 1,000개당 비용 |
|---|---|---|---|---|
| 첫 테스트 | Claude Opus 5.5 | 99.0% | 2.2초 | $3.86 |
| 첫 테스트 | Jev 단독 (60% cutoff) | 95.7% | 0.15초 | $0.05 |
| 첫 테스트 | GPT-6 Luna 단독 (70% cutoff) | 97.3% | 0.17초 | $0.10 |
| 첫 테스트 | 하이브리드 Jev | 98.8% | 0.63초 | $0.88 |
| 첫 테스트 | 하이브리드 Luna | 98.5% | 0.30초 | $0.33 |
| 어려운 테스트 | Claude Opus 5.5 | 95.1% | 2.6초 | $5.39 |
| 어려운 테스트 | Jev 단독 (60% cutoff) | 89.1% | 0.15초 | $0.06 |
| 어려운 테스트 | GPT-6 Luna 단독 (70% cutoff) | 88.8% | 0.20초 | $0.12 |
| 어려운 테스트 | 하이브리드 Jev | 95.3% | 1.56초 | $2.94 |
| 어려운 테스트 | 하이브리드 Luna | 91.6% | 0.70초 | $1.15 |

제목의 "4x lower cost"는 첫 테스트에서 하이브리드 Jev($0.88)와 Opus 단독($3.86)의 비용 비율인 약 4.4배에 해당한다. 어려운 테스트에서는 같은 비율이 약 1.8배($2.94 대 $5.39)로 줄어든다. 두 비율은 원문 표의 값으로 계산한 것이며, 절감 폭이 데이터 난이도에 따라 달라진다는 점을 보여 준다.

### 글의 결론

글의 결론은 다섯 가지로 정리된다.

- 보정이 중요하다. Luna는 단독으로 더 낫지만 과신 때문에 어려운 데이터에서 실패한다.
- 하이브리드 방식은 분명히 유용하며, 글은 이 도메인에만 유용한 것이 아닐 것이라고 추측한다.
- 실제 identity가 얼마나 까다로울지 미리 알 수 없으므로, 필요할 때 지출을 늘리는 하이브리드 Jev가 가치 있다. 글은 추가 비용을 감수할 만하다고 판단한다.
- 비용에 더 민감하거나 판정할 사례가 쉽다는 것을 안다면 하이브리드 Luna를 고를 수 있다.
- 하이브리드 Jev도 cutoff 구간을 좁혀 두 번째 의견을 받는 사례를 줄이면, 정확도를 조금 내주고 비용을 낮출 수 있다.

## 한계

### 글이 밝힌 한계와 후속 과제

- 모델 비용과 지연은 Hightouch 환경에서 관찰한 값이며 달라질 수 있다.
- decision model은 어려운 벤치마크에서 Opus보다 약 6%p 낮다. 프런티어 모델이 여전히 더 정확하다.
- under-merging은 다루지 않았다. under-merging은 한 사람이 여러 identity로 나뉘는 반대 방향의 오류이며 후속 글에서 다룰 예정이다.
- 독점 API(Jev, GPT-6 Luna)에 의존한다. open-weight decision model로 바꿨을 때 성능이 얼마나 떨어지는지는 후속 과제로 남겼다.

### 실험 구성에서 읽히는 제약

아래 항목은 글이 한계로 적지 않았지만 원문의 실험 설명에서 확인되는 조건이다. 결과를 다른 환경에 옮길 때 고려해야 한다.

- 벤치마크가 합성 데이터다. pseudopeople로 만든 가상 도시의 미국 정부 자료 형식 레코드이며, 도입부 예시로 든 로열티와 거래 레코드 형식은 벤치마크에 쓰이지 않았다.
- 테스트 규모가 작다. 첫 테스트는 1,000개, 어려운 테스트는 차트 기준 약 940개다. 첫 테스트에서 1%p는 identity 10개에 해당하므로 0.1~0.5%p 차이는 몇 건의 차이다.
- over-merge 비율이 운영 환경과 다르다. 첫 테스트는 절반을 over-merge로 구성했지만, 글은 건강한 그래프에서 over-merge가 드물다고 적는다.
- 설정을 같은 테스트에서 골랐다. cutoff(Jev 60%, Luna 70%)는 같은 테스트에서 정확도를 최대화하는 값이고, 하이브리드 구간도 같은 테스트의 결과표에서 골랐다. 별도 검증 세트를 썼다는 서술은 없다.
- 프롬프트 단계별 정확도는 차트로만 제시되어 정확한 수치를 알 수 없다 (결과 절의 단계별 표는 판독 근사값).

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| identity resolution (IDR) | 여러 출처의 데이터 레코드를 실제 사람 단위의 identity로 묶는 과정 |
| over-merging | identity 하나가 실세계의 여러 사람에 대응하는 오류. IDR에서 가장 흔하고 문제가 큰 실패다 |
| decision model | 특정 조건이 참일 확신도를 0~1 점수로 반환하는 언어 모델 계열. 이 글에서는 Jev와 GPT-6 Luna(Decisions API) |
| cutoff | decision model의 확신도를 over-merge 판정으로 바꾸는 기준값. Jev 60%, Luna 70%를 골랐다 |
| 보정 | 모델이 낸 확신도가 실제 정답률과 맞는 성질. 잘 보정된 모델은 50% 근처에서 주로 틀린다 |
| 하이브리드 평가 구성 | decision model이 먼저 판정하고 불확실 구간의 identity만 프런티어 모델에 넘기는 2단 구조 |

## 관련 페이지

- [[llms/hada-2026-jev-judgment-probability-model]]: 이 글이 쓴 Jev와 그 학습 목표인 보정된 확률(RLCD)을 소개하는 자료. 이 글은 그 보정이 실제 평가 파이프라인에서 어떤 차이를 내는지 보여 주는 사례에 해당한다.
- [[llms/typesafe-ai-2026-introduction]]: Jev의 공식 문서 도입부. Noul처럼 참과 거짓 사이의 확률을 반환하는 질문 타입이 이 글의 over-merge 판정 형태와 같다.
- [[llms/9bow-2026-gpt-5-6-sol-terra-luna]]: Sol, Terra, Luna 천체 이름 라인업의 직전 세대(GPT-5.6) 소개. 이 글의 GPT-6 Sol과 GPT-6 Luna가 같은 이름 체계를 쓴다.
- [[evaluations/kim-2026-ai-prd-eval-plan]]: 규칙 기반 평가, LLM-as-a-Judge, 사람 평가를 쌓는 평가 피라미드를 다룬다. 이 글은 그 중간층을 비용과 보정 측면에서 구체화한 사례다.
