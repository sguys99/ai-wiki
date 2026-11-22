---
title: "TASTE, 토스의 추천 파운데이션 플랫폼"
type: article
year: 2026
category: applications
raw_path: raw/articles/park-2026-taste-toss-recommendation-foundation-platform.md
raw_filename: "park-2026-taste-toss-recommendation-foundation-platform.md"
source_collection: external
author: "박재휘, 김찬우, 백영민, 김소정"
url: "https://toss.tech/article/taste"
publisher: "toss.tech"
publication_date: "2026-11-09"
fetched_at: "2026-11-22T13:21:19+0900"
extractor_tier: "chrome"
tags: []
figures:
  - id: fig01
    file: assets/park-2026-taste-toss-recommendation-foundation-platform/fig01.png
    raw: raw/articles/park-2026-taste-toss-recommendation-foundation-platform-figures/fig01.png
    caption: ""
    strategy: fetched
    curated: false
  - id: fig02
    file: assets/park-2026-taste-toss-recommendation-foundation-platform/fig02.png
    raw: raw/articles/park-2026-taste-toss-recommendation-foundation-platform-figures/fig02.png
    caption: ""
    strategy: fetched
    curated: false
  - id: fig03
    file: assets/park-2026-taste-toss-recommendation-foundation-platform/fig03.png
    raw: raw/articles/park-2026-taste-toss-recommendation-foundation-platform-figures/fig03.png
    caption: ""
    strategy: fetched
    curated: false
  - id: fig04
    file: assets/park-2026-taste-toss-recommendation-foundation-platform/fig04.png
    raw: raw/articles/park-2026-taste-toss-recommendation-foundation-platform-figures/fig04.png
    caption: ""
    strategy: fetched
    curated: false
  - id: fig05
    file: assets/park-2026-taste-toss-recommendation-foundation-platform/fig05.png
    raw: raw/articles/park-2026-taste-toss-recommendation-foundation-platform-figures/fig05.png
    caption: ""
    strategy: fetched
    curated: false
  - id: fig06
    file: assets/park-2026-taste-toss-recommendation-foundation-platform/fig06.png
    raw: raw/articles/park-2026-taste-toss-recommendation-foundation-platform-figures/fig06.png
    caption: ""
    strategy: fetched
    curated: false
  - id: fig07
    file: assets/park-2026-taste-toss-recommendation-foundation-platform/fig07.png
    raw: raw/articles/park-2026-taste-toss-recommendation-foundation-platform-figures/fig07.png
    caption: ""
    strategy: fetched
    curated: false
  - id: fig08
    file: assets/park-2026-taste-toss-recommendation-foundation-platform/fig08.png
    raw: raw/articles/park-2026-taste-toss-recommendation-foundation-platform-figures/fig08.png
    caption: ""
    strategy: fetched
    curated: false
  - id: fig09
    file: assets/park-2026-taste-toss-recommendation-foundation-platform/fig09.png
    raw: raw/articles/park-2026-taste-toss-recommendation-foundation-platform-figures/fig09.png
    caption: ""
    strategy: fetched
    curated: false
  - id: fig10
    file: assets/park-2026-taste-toss-recommendation-foundation-platform/fig10.png
    raw: raw/articles/park-2026-taste-toss-recommendation-foundation-platform-figures/fig10.png
    caption: ""
    strategy: fetched
    curated: false
  - id: fig11
    file: assets/park-2026-taste-toss-recommendation-foundation-platform/fig11.png
    raw: raw/articles/park-2026-taste-toss-recommendation-foundation-platform-figures/fig11.png
    caption: ""
    strategy: fetched
    curated: false
  - id: fig12
    file: assets/park-2026-taste-toss-recommendation-foundation-platform/fig12.png
    raw: raw/articles/park-2026-taste-toss-recommendation-foundation-platform-figures/fig12.png
    caption: ""
    strategy: fetched
    curated: false
---

> 수집 메모 — `scripts/fetch_article.py` 가 사용자의 명시적 URL 지시에 따라 가져왔다 (CLAUDE.md rule #1 의 자료 수집 예외). 추출 tier: `chrome`. 본문은 원문 그대로이며 요약·번역·윤문하지 않았다.
> `category` 는 임시값이므로 Step 3 에서 확정할 것.

---

금융 상품에 관심이 있는 사람을 찾는 모델, 푸시를 클릭할 사람을 찾는 모델, 좋아할 미니앱을 추천하는 모델. 풀어야 할 문제는 다르지만, 이해해야 하는 대상은 모두 같은 토스의 사용자입니다. 토스에 쌓이는 방대하고 서로 다른 데이터를 충분히 학습하여 배운 내용을 여러 추천 문제에 활용할 수는 없을까요?

TASTE(Toss Automated Standard Targeting Engine)는 이 질문에서 시작했습니다. 사용자의 다양한 행동을 함께 예측하고, 그 과정에서 배운 ‘사용자 표현’을 다른 서비스 모델에 전달하고자 했습니다. 여러 서비스의 온오프라인 실험에서 이 표현이 예측에 도움이 된다는 것까지 확인했습니다.

![](https://static.toss.im/ipd-tcs/toss_core/live/d7d286fe-a836-45f2-9a6b-f089debb3abb/image.png)

이 글에서는 여러 행동을 함께 학습하고, 그 과정에서 얻은 사용자 표현을 다른 추천 모델에 전달하며, 이를 다시 개선하는 과정을 소개합니다. 한 번 배운 사용자 정보를 여러 추천 문제에 활용하는 것, 이것이 저희가 생각하는 추천 파운데이션 모델의 출발점입니다.

## 같은 사용자를 모델마다 다시 배우고 있었습니다

토스에는 금융중개, 광고, 쇼핑, 결제, Apps in Toss 등 여러 서비스가 있습니다. 서비스가 늘어날수록 클릭, 구매, 전환 등을 예측하는 모델도 늘어납니다.

모델마다 목표는 달라도 사용하는 사용자 정보는 겹치는 부분이 많습니다. 나이와 같은 속성, 앱에서 이용한 기능, 소비 이력 등이 대표적입니다. 각 모델은 이 정보를 자신의 예측에 필요한 형태로 가공하고 학습합니다. 같은 정보를 모델마다 따로 준비하고 학습하면서 중복 작업이 생겼습니다.

![](https://static.toss.im/ipd-tcs/toss_core/live/7700b6b4-3b27-4732-8fae-03b1c9baeb86/image.png)

데이터를 충분히 활용하는 일도 쉽지 않았습니다. 토스는 월간 활성 사용자(MAU)가 2천만 명을 넘어, 주요 서버 로그만 해도 하루에 수십억 건 이상 쌓입니다. 사용자 한 명을 이해하기 위해 살펴봐야 할 정보도 방대합니다.

데이터의 성격도 제각각입니다. 마이데이터는 수십 개의 API를 통해 들어오며, 데이터마다 수집 시점과 정보를 확보할 수 있는 사용자 범위가 다릅니다. 외부 앱 이용 정보를 담은 MMP 데이터는 이벤트가 지나치게 많거나, 반대로 너무 적기도 합니다. 서버 로그와 마이데이터, MMP 데이터는 활용하고 분석할 수 있는 동의 조건도 모두 다릅니다.

결국 각 모델은 예측 문제를 풀기에 앞서, 이 방대하고 서로 다른 데이터를 어떻게 모으고 학습할지부터 해결해야 했습니다. 서비스별 예측 모델은 응답 시간 등 서비스가 요구하는 수준(SLA)을 맞춰야 해서 상대적으로 크기가 작습니다. 이런 제약 아래에서 개별 모델이 방대한 정보를 충분히 학습하기는 쉽지 않습니다. 그래서 서비스 중인 모델들이 예측에 도움이 되는 사용자 정보를 놓치고 있을 수 있다는 가설을 세웠습니다.

## 모델을 합치는 것만으로는 성능이 좋아지지 않았습니다

> “ 여러 모델에 필요한 사용자 표현을 한 번에 학습하고, 그 결과를 여러 목적에 활용할 수 있을까? ”

![](https://static.toss.im/ipd-tcs/toss_core/live/3d77b45e-3621-470d-a6be-bcea9747181c/image.png)

먼저 주요 앱이벤트를 동시에 예측하는 멀티태스크 학습을 시도했습니다. 사용자 정보를 예측에 필요한 표현으로 바꾸는 인코더(Encoder)를 공유하고, 그 뒤에 결제나 특정 서비스 이용 등 과제별 예측을 담당하는 헤드(Head)를 붙이는 방식입니다.

같은 정보를 받아도 과제마다 필요한 부분은 다릅니다. 과제별로 필요한 정보를 다르게 조합할 수 있도록, 처음에는 MMoE(Multi-gate Mixture-of-Experts) 구조를 시도했습니다.

![](https://static.toss.im/ipd-tcs/toss_core/live/40ff9432-cd6d-49a0-a7cb-3076587bdf35/image.png)

빠르게 가능성을 살펴보기 위해 초기에는 학습 사용자를 100만 명으로 줄였습니다. 사용자 수를 줄인 영향을 살펴볼 수 있도록, 기존 모델에 사용하던 LightGBM도 100만 명 규모로 학습했습니다. 같은 사용자 수로 학습한 두 모델을 비교했을 때, MMoE의 성능(AUROC)은 과제별로 따로 학습한 LightGBM보다 낮았습니다. 이 결과만으로는 여러 과제를 함께 학습하는 방식의 이점을 확인하기 어려웠습니다.

## 학습 데이터와 모델을 확장하자 성능이 올랐습니다

하지만 저희는 다른 가설을 세웠습니다. “한 모델이 여러 행동을 동시에 예측하려면, 각 행동을 따로 학습할 때보다 더 많은 데이터가 필요한 것 아닐까?” 공동학습 자체의 한계로 결론짓기 전에, 더 많은 사용자와 더 풍부한 행동 정보를 학습해보기로 했습니다.

우선 학습 대상을 100만 명에서 학습에 사용할 수 있는 전체 사용자로 넓혔습니다. 사용자 요약 정보도 기존 1,000여 개에서 2,000개 이상으로 늘렸습니다. 요약 정보에 담기지 않은 행동의 흐름도 배울 수 있도록, 최근 앱이벤트 시퀀스를 Causal Transformer로 읽고 압축했습니다.

늘어난 입력에 맞춰 모델 구조도 개선했습니다. 요약 정보를 처리하는 인코더에는 DCN-V2를, 과제별 예측을 담당하는 부분에는 PLE(Progressive Layered Extraction)를 사용했습니다.

![](https://static.toss.im/ipd-tcs/toss_core/live/f96d09a3-6903-44b2-8c88-f81aeb8e7b60/image.png)

학습 사용자 규모와 입력 피처, 모델 구조를 확대한 뒤에는 기존 모델의 성능을 넘어설 수 있었습니다. 공통 앱이벤트 예측에서 Macro Recall@5k의 상대 개선율은 약 35.1%입니다. 초기의 낮은 성능을 공동학습의 한계로 받아들이지 않고 가설을 세워 실험한 결과입니다.

사용자 요약 정보를 2,000개 이상 사용하면서 새로운 의문도 생겼습니다. 요약 정보가 충분하다면 시퀀스 모듈은 없어도 되지 않을까요? 이를 확인하기 위해 시퀀스 모듈을 제거한 별도 실험을 진행했고, Macro Recall@5k가 상대적으로 7.6% 낮아지는 것을 확인했습니다. 많은 요약 정보를 사용하더라도, 시퀀스를 직접 학습하면 예측에 도움이 된다는 정보를 추가로 얻었습니다.

## 소비까지 함께 배우며 목적에 맞는 구조를 찾았습니다

![](https://static.toss.im/ipd-tcs/toss_core/live/592ccfd2-2289-444f-a968-5590f297b3d1/image.png)

앱이벤트 공동학습의 성과를 바탕으로, 주요 소비 이벤트까지 학습 범위를 넓혔습니다. 앱이벤트 시퀀스가 요약 정보를 보완했던 것처럼, 소비도 이력을 직접 학습하면 도움이 될 것이라고 생각했습니다. 그래서 미래 소비를 예측하는 과제와 함께, 브랜드·카테고리 등의 소비 시퀀스를 읽는 인코더를 추가했습니다.

하지만 한 모델에서 모두 학습하자 과제별 성과가 달라졌습니다. 소비 예측은 기존 개별 모델보다 좋아졌지만, 앱이벤트의 Macro Recall@5k는 앱이벤트만 한 번에 학습했을 때보다 낮아졌습니다.

앱이벤트와 소비는 행동의 성격도, 정답 데이터가 들어오는 시점도 크게 달랐습니다. 두 목적을 예측하는 데 필요한 표현과 학습 방식도 다를 수 있었습니다. 그래서 각 목적에 맞는 표현을 따로 학습하면 성능을 개선할 수 있을 것이라는 가설을 세웠습니다.

입력 정보는 함께 활용하되, 앱이벤트와 소비를 예측하는 모델은 인코더부터 따로 학습했습니다. 두 모델 모두 앱이벤트 이력, 소비 이력, 사용자 요약 정보를 받으며, 각 모델 안에서는 여전히 여러 앱이벤트 또는 소비 과제를 함께 학습합니다. 모델별로 구조를 탐색하고 최적화해, 각 목적에 맞는 학습 방식을 찾았습니다.

![](https://static.toss.im/ipd-tcs/toss_core/live/5c98987a-6d02-48b3-9086-f4cd69b64c3c/image.png)

목적을 나누고 각 모델의 구조와 학습 방법을 개선한 결과, 앱이벤트의 Macro Recall@5k는 단일 모델 TASTE보다 8.7% 높아졌습니다. 소비 예측은 같은 지표에서 기존 모델 대비 브랜드 33.9%, 중분류 111%, 소분류 65.8% 개선됐습니다. 여러 과제를 함께 학습하는 이점을 살리면서도, 목적에 맞게 모델을 나누고 최적화해 각 서비스에 필요한 성능을 확보할 수 있었습니다.

## 학습한 모델을 실제 운영에 연결했습니다

TASTE가 제공하는 결과물은 크게 두 가지입니다. 하나는 모델이 직접 계산한 행동별 예측 확률이고, 다른 하나는 학습한 사용자 정보를 담은 임베딩입니다. 먼저 예측 확률을 실제 운영에 활용한 사례를 소개하겠습니다.

![](https://static.toss.im/ipd-tcs/toss_core/live/123a619a-6a86-42aa-a088-e79ab7ccdd18/image.png)

우선 여러 과제를 함께 학습하면서 개별 모델마다 반복하던 데이터 준비·학습·추론 작업을 통합하고, 중복되는 인프라 사용과 운영 부담을 줄였습니다. 이렇게 생성한 확률값은 목표 행동을 할 가능성이 높은 사용자를 찾는 데 활용했습니다.

토스에서 IM(Intelligence Manager)은 홈 상단 배너를 노출하고 푸시, SMS·LMS, 브랜드톡을 발송하는 통합 메시지 발송 허브입니다. 캠페인 담당자가 많은 시간을 쓰는 일 중 하나는 ‘누구에게 보낼까’를 정하는 것이었습니다. 같은 푸시라도 목표에 따라 어떤 행동 이력을 보고, 어떤 조건을 조합해 발송 대상을 고를지 매번 판단해야 했습니다.

TASTE는 주요 앱이벤트가 발생할 확률을 사용자별로 예측합니다. 이 예측값을 활용해 IM에 ‘Auto Targeting’ 기능을 도입했습니다. 담당자가 캠페인의 목표 이벤트와 발송할 인원수를 고르면, IM이 그 행동을 할 가능성이 높은 사용자부터 발송합니다. 캠페인마다 타깃 조건을 직접 설계하던 부담을 덜 수 있었습니다.

![](https://static.toss.im/ipd-tcs/toss_core/live/676a91ad-ca99-471e-b7af-ebc46d89ed75/image.png)

발송 대상을 고르는 과정은 간편해졌습니다. 실제 캠페인의 반응은 어땠을까요? Auto Targeting 도입 후 두 달 동안의 푸시 캠페인을 살펴보니, 일반 캠페인과 Auto Targeting 캠페인의 클릭률(CTR)은 각각 4.39%와 5.19%였습니다. 발송 대비 전환율(CTCVR)은 각각 0.25%와 2.70%였습니다. 서로 다른 캠페인에 대해 집계한 수치이므로 이 차이를 모델만의 효과로 해석할 수는 없지만, Auto Targeting이 운영 편의뿐만 아니라 충분히 효과적인 타기팅 기능을 제공한다고 평가하고 있습니다.

기존 개별 타기팅 모델과의 직접 비교한 온라인 실험에서도 성과가 있었습니다. 금융 상품군 1의 LMS 발송 테스트에서는 발송 수가 약 35% 줄면서도, 전환 건수는 약 40% 늘었습니다. 금융 상품군 2의 토스 홈 상단 배너 테스트에서는 기존 모델로만 선정한 사용자와 TASTE 모델로만 선정한 사용자를 비교했습니다. 이 비교에서 TASTE 쪽 클릭률은 1.72배, 최종 전환율은 4.75배였습니다.

## 함께 배운 지식을 다른 추천에도 전달할 수 있을까요?

앞선 타기팅에서는 TASTE가 예측한 목표 행동의 발생 확률로 발송 대상을 골랐습니다. 이번에는 여러 과제를 배우며 얻은 사용자 표현을 다른 서비스 모델에 전달하고자 했습니다. 이 표현은 TASTE가 직접 예측하도록 학습하지 않은 푸시 클릭이나 미니앱 선택에도 도움이 될까요?

가장 먼저 떠올릴 수 있는 방법은 TASTE에 새 예측 헤드를 붙이고 함께 학습하는 것입니다. 하지만 새 헤드의 학습 신호는 공통 인코더까지 전달됩니다. 새 과제를 잘 풀도록 학습하는 동안 기존 과제의 예측도 바뀔 수 있고, 영향을 받는 과제를 다시 평가해야 합니다. 새 문제가 생길 때마다 이 과정을 반복하는 방식은 운영하기 어려웠습니다.

사용자 임베딩은 사용자 정보를 숫자 벡터로 담은 표현입니다. 저희는 TASTE에서 추출한 임베딩을 다른 서비스 모델의 입력 피처로 제공했습니다. 서비스 모델을 학습할 때 TASTE의 가중치는 함께 갱신하지 않았습니다. 이처럼 임베딩을 받아 자신의 예측 문제를 푸는 모델을 다운스트림(Downstream) 모델이라고 부릅니다.

![](https://static.toss.im/ipd-tcs/toss_core/live/4adf9b90-1ef9-4cc1-9217-e2b8cc557971/image.png)

먼저 토스 홈 배너와 푸시의 클릭·전환을 예측하는 마케팅·CRM 모델들에서 효과를 확인했습니다. 기존 피처에 TASTE 임베딩을 추가하자, 오프라인 평가에서 8개 모델 모두 AUROC가 높아졌습니다. TASTE가 배운 사용자 정보가 추가적인 정보를 전달하여 예측에 도움이 된 것입니다.

쇼핑과 광고의 예측 모델에서도 오프라인 성능이 좋아졌습니다. 아래 수치는 각 대조군 대비 상대 변화율입니다. AUROC는 높을수록, 예측 손실인 NE(Normalized Entropy)는 낮을수록 좋습니다.

쇼핑에서는 최신 행동을 반영한 TASTE 임베딩을 추가하자, 구매 전환 예측 모델이 함께 학습하는 관심·장바구니 추가·구매 세 목적에서 모두 성능이 좋아졌습니다. 기존 운영 모델과 비교한 결과는 다음과 같습니다.

| 예측 과제 | AUROC 증가율 | NE 감소율 |
| --- | --- | --- |
| 관심 | 0.50% | 3.24% |
| 장바구니 추가 | 0.66% | 1.50% |
| 구매 | 0.27% | 0.54% |

광고에서도 여러 예측 모델의 성능이 좋아졌습니다. 각 모델의 대조군과 비교한 결과입니다.

| 예측 모델 | AUROC 증가율 | NE 감소율 |
| --- | --- | --- |
| 통합 클릭률 예측 | 0.15% | 0.27% |
| LightGBM 기반 클릭률 예측 | 0.12% | 5.15% |
| 리워드 광고 | 2.29% | 1.62% |
| 비리워드 광고 | 0.21% | 0.14% |

미니앱 추천에서는 온라인 A/B 테스트로 실제 사용자 반응을 확인했습니다. TASTE 임베딩을 활용한 모델은 두 지면 모두에서 기존 모델보다 높은 클릭률을 보였습니다.

| 추천 지면 | 기존모델 CTR | TASTE 임베딩 활용 CTR | 상대 증가율 |
| --- | --- | --- | --- |
| 전체 탭 | 1.56% | 2.77% | 약 77% |
| 최근 더보기 · 이런 건 어때요 | 3.51% | 10.85% | 약 209% |

전체 탭 실험을 자세히 살펴보니, 미니앱 이용 이력이 적은 사용자에게서도 개선이 나타났습니다. 최근 28일 동안 미니앱을 이용하지 않은 사용자에게 비앱테크 미니앱을 추천했을 때, TASTE 임베딩을 사용한 모델의 클릭률은 공통 사용자 피처를 사용한 모델보다 약 2.5배 높았습니다. 해당 서비스의 이용 이력만으로는 알기 어려웠던 관심사를 토스 전반의 정보를 학습한 임베딩이 보완하고, 도메인을 넘어 사용자에 대한 지식을 전달할 수 있음을 보여준 결과입니다.

## 더 빠른 검증, 더 빠른 임베딩 개선

![](https://static.toss.im/ipd-tcs/toss_core/live/93977f3a-39d7-4258-aed1-13d341e7ee7e/image.png)

여러 도메인에서 TASTE 임베딩의 효용을 확인한 뒤에는, 이 효과를 더 넓은 영역으로 전달하고 싶었습니다. 그러려면 임베딩을 개선할 때마다 어떤 서비스에서 얼마나 도움이 되는지 빠르게 확인할 수 있어야 했습니다.

TASTE 자체의 예측 성능만으로는 그 답을 알기 어렵습니다. 새 임베딩을 각 서비스팀에 전달하고, 서비스 모델을 다시 학습해 평가해야 했습니다. 실제 사용자 반응을 확인하려면 온라인 실험도 필요했습니다. 여러 팀의 시간과 실험 자원이 필요한 만큼, 피드백을 받기까지 오래 걸렸습니다.

그래서 서비스의 예측 문제를 재현한 평가용 프록시 모델을 만들고, 같은 조건에서 임베딩 후보를 비교할 수 있도록 했습니다. 이렇게 전이 효과를 미리 살펴보는 도구가 TASTE Bench입니다.

새 임베딩 후보가 나오면 TASTE Bench에서 어떤 과제의 성능이 좋아지고 떨어졌는지 살펴봅니다. 이 결과를 다음 학습에 반영하면서, 서비스별 온라인 실험을 기다리는 동안에도 다음 아이디어를 실험하고 있습니다.

## 여러 서비스가 함께 쓰는 사용자 표현을 향해

TASTE 임베딩을 기존 피처에 더했을 때는 대부분의 실험에서 성능이 좋아졌습니다. 공동학습으로 얻은 사용자 정보가 여러 서비스의 예측에 도움이 된다는 뜻입니다. 하지만 기존 피처를 임베딩으로 대체하는 실험에서는 아직 일관된 우위를 확인하지 못했습니다. 각 서비스가 직접 준비하던 공통 피처를 임베딩이 충분히 대신할 수 있을지는 계속 풀어야 할 문제입니다.

![](https://static.toss.im/ipd-tcs/toss_core/live/d8951ac8-6b43-41c0-a916-b48e08aa90a5/image.png)

지금은 더 다양한 서비스의 예측에 도움이 되는 임베딩을 만드는 데 집중하고 있습니다. 이를 위해 광고, 쇼핑, 금융 거래 등 TASTE가 아직 충분히 활용하지 못한 정보로 학습 범위를 넓히고 있습니다. 핵심 도메인에서는 사용자 임베딩과 함께 학습한 아이템 임베딩, 사용자와 아이템의 상호작용 모듈까지 전달하기 위한 준비와 오프라인 실험도 진행하고 있습니다.

임베딩을 어떻게 제공해야 서비스 모델이 더 잘 활용할 수 있는지도 분석하고 있습니다. 임베딩을 만드는 모델이 바뀌면 벡터의 좌표와 분포도 달라질 수 있습니다. 그래서 모델 갱신 주기, 표준화와 좌표 정렬 같은 후처리, 날짜별 임베딩을 서비스 모델의 학습 데이터에 연결하는 방식을 비교하고 있습니다. TASTE가 배운 정보가 실제 서비스의 성능으로 이어지도록 하기 위해서입니다.

궁극적으로 저희는 TASTE가 토스의 공통 사용자 정보를 학습하고, 여러 서비스가 함께 활용하는 기반이 되기를 바랍니다. 앱에서의 행동과 소비를 비롯한 다양한 정보를 임베딩에 담아 광고, 쇼핑, 금융중개, 결제 등 여러 도메인에 제공하는 것입니다. 각 서비스가 사용자 피처를 하나씩 고르고, 추가하거나 제거하며 성능을 비교하는 부담을 최소화하고 싶습니다. 서비스팀은 TASTE가 제공하는 표현을 바탕으로 자신의 서비스에 필요한 정보와 예측 문제에 집중할 수 있을 것입니다.

이를 위해 더 넓은 데이터를 학습하고, TASTE Bench에서 임베딩의 추가 효과와 기존 피처를 대체하는 능력을 함께 검증하며 발전시켜 나가려 합니다. 지금까지는 공동학습과 지식 전이의 초기 성과를 확인하고, 이를 반복해서 개선할 기반도 마련했습니다. 이제 이 초석 위에서 토스 추천 파운데이션 모델이 궁극적 목표를 달성할 수 있도록 TASTE 플랫폼을 계속 발전시키려 합니다.

[SLASH Live](https://www.youtube.com/embed/b-6ZgPmz4x8)

TASTE의 개발 과정과 주요 실험 결과를 지난 SLASH Live 발표 영상에서도 만나보세요.

### References

- Jiaqi Ma et al. (2018). [Modeling Task Relationships in Multi-task Learning with Multi-gate Mixture-of-Experts](https://doi.org/10.1145/3219819.3220007). KDD 2018. — MMoE
- Ruoxi Wang et al. (2021). [DCN V2: Improved Deep & Cross Network and Practical Lessons for Web-scale Learning to Rank Systems](https://arxiv.org/abs/2008.13535). WWW 2021. — DCN V2
- Hongyan Tang et al. (2020). [Progressive Layered Extraction (PLE): A Novel Multi-Task Learning (MTL) Model for Personalized Recommendations](https://doi.org/10.1145/3383313.3412236). RecSys 2020. — PLE
- Liang Luo et al. (2025). [Meta Lattice: Model Space Redesign for Cost-Effective Industry-Scale Ads Recommendations](https://arxiv.org/abs/2512.09200). arXiv:2512.09200.
- Shangyu Zhang et al. (2025). [Large Foundation Model for Ads Recommendation](https://arxiv.org/abs/2508.14948). arXiv:2508.14948.
