---
title: "03-04. RT-2 - 모두의 로보틱스 - VLA 입문"
type: article
year: 2026
category: physical-ai
raw_path: raw/articles/jo-2026-rt-2-vla-primer.md
raw_filename: "jo-2026-rt-2-vla-primer.md"
source_collection: external
author: "조인령"
url: "https://wikidocs.net/366370"
publisher: "WikiDocs"
fetched_at: "2026-08-10T23:12:38+0900"
extractor_tier: "chrome"
tags: []
figures:
  - id: fig01
    file: assets/jo-2026-rt-2-vla-primer/fig01.png
    raw: raw/articles/jo-2026-rt-2-vla-primer-figures/fig01.png
    caption: "RT-2 개요 Figure 1"
    strategy: fetched
    curated: false
  - id: fig02
    file: assets/jo-2026-rt-2-vla-primer/fig02.png
    raw: raw/articles/jo-2026-rt-2-vla-primer-figures/fig02.png
    caption: "RT-2 일반화 시나리오 Figure 3"
    strategy: fetched
    curated: false
  - id: fig03
    file: assets/jo-2026-rt-2-vla-primer/fig03.png
    raw: raw/articles/jo-2026-rt-2-vla-primer-figures/fig03.png
    caption: "RT-2 일반화 결과 Figure 4"
    strategy: fetched
    curated: false
  - id: fig04
    file: assets/jo-2026-rt-2-vla-primer/fig04.png
    raw: raw/articles/jo-2026-rt-2-vla-primer-figures/fig04.png
    caption: "RT-2 Language Table 결과 Table 1"
    strategy: fetched
    curated: false
  - id: fig05
    file: assets/jo-2026-rt-2-vla-primer/fig05.png
    raw: raw/articles/jo-2026-rt-2-vla-primer-figures/fig05.png
    caption: "RT-2 emergent skill 예시 Figure 2"
    strategy: fetched
    curated: false
  - id: fig06
    file: assets/jo-2026-rt-2-vla-primer/fig06.png
    raw: raw/articles/jo-2026-rt-2-vla-primer-figures/fig06.png
    caption: "RT-2 모델 크기와 co-fine-tuning Figure 6"
    strategy: fetched
    curated: false
  - id: fig07
    file: assets/jo-2026-rt-2-vla-primer/fig07.png
    raw: raw/articles/jo-2026-rt-2-vla-primer-figures/fig07.png
    caption: "RT-2 Chain-of-Thought Figure 7"
    strategy: fetched
    curated: false
  - id: fig08
    file: assets/jo-2026-rt-2-vla-primer/fig08.png
    raw: raw/articles/jo-2026-rt-2-vla-primer-figures/fig08.png
    caption: "RT-2 emergent capability Figure 8"
    strategy: fetched
    curated: false
  - id: fig09
    file: assets/jo-2026-rt-2-vla-primer/fig09.png
    raw: raw/articles/jo-2026-rt-2-vla-primer-figures/fig09.png
    caption: "RT-2 emergent capability Table 3"
    strategy: fetched
    curated: false
  - id: fig10
    file: assets/jo-2026-rt-2-vla-primer/page-full.png
    raw: raw/articles/jo-2026-rt-2-vla-primer-figures/page-full.png
    caption: "전체 페이지 스크린샷"
    strategy: screenshot
    curated: false
---

> 수집 메모 — `scripts/fetch_article.py` 가 사용자의 명시적 URL 지시에 따라 가져왔다 (CLAUDE.md rule #1 의 자료 수집 예외). 추출 tier: `chrome`. 본문은 원문 그대로이며 요약·번역·윤문하지 않았다.
> `category` 는 임시값이므로 Step 3 에서 확정할 것.

---

## Ⅰ. 모델 등장 배경

### 1. RT-2 배경

RT-2는 이전의 RT-1 계열이 보여준 end-to-end 로봇 정책의 흐름을 이어받으면서도, 그 범위를 한 단계 더 확장한 모델입니다.

RT-1이 주로 로봇 데이터 안에서 시각 입력과 언어 명령을 행동으로 연결하는 데 초점을 맞췄다면, RT-2는 여기에 웹 규모의 vision-language 사전학습이 가진 시맨틱 이해와 추론 능력을 직접 연결하려고 시도합니다.

![RT-2 개요 Figure 1](https://static.wikidocs.net/images/page/366370/gh_d9f997ae5df1.png)

Figure 1은 이 아이디어를 가장 간결하게 보여주는 그림입니다.

그림의 왼쪽에는 두 종류의 데이터가 함께 놓입니다. 하나는 인터넷 규모의 vision-language 데이터이고, 다른 하나는 실제 로봇의 시각·언어·행동 데이터입니다.

가운데의 RT-2는 이 둘을 분리해서 다루지 않고, 같은 모델 안에서 함께 학습합니다. 그리고 오른쪽에서는 모델이 출력한 action token을 다시 실제 robot action으로 변환해 제어에 사용합니다.

이 방식은 복잡한 로봇 전용 모듈을 여러 개 추가하는 대신, 모델이 원래 잘하던 일인 토큰 예측이라는 틀을 그대로 유지한 채 행동 표현만 바꿉니다. 논문이 이 접근을 일종의 simple, general recipe처럼 제시하는 이유도 여기에 있습니다.

핵심은 새로운 아키텍처를 크게 발명했다기보다, 기존 비전·언어 모델의 표현 능력을 실제 행동으로 이어지게 만드는 연결 방식을 찾았다는 데 있습니다.

물론 여기서 중요한 점도 하나 있습니다.

이 모델이 웹에서 배운 지식을 그대로 로봇 skill로 바꾸는 것은 아닙니다. 집기, 놓기, 이동 같은 물리적 동작 자체는 여전히 로봇 데이터에서 배웁니다. 대신 웹 데이터에서 배운 것은 그 동작을 언제, 어디에, 어떤 대상에 써야 하는지를 더 넓게 이해하는 능력에 가깝습니다.

그래서 RT-2의 강점은 완전히 새로운 motion을 발명하는 데 있다기보다, 이미 배운 동작을 더 다양한 상황에 맞게 꺼내 쓰는 데 있습니다. 이 점이 뒤의 실험에서 novel object, symbol understanding, reasoning 같은 항목으로 이어집니다.

정리하면 RT-2의 핵심 아이디어는 “행동도 언어처럼 본다”는 데 있습니다.

이 발상 덕분에 비전·언어 모델의 시맨틱 이해와 로봇의 저수준 제어를 하나의 end-to-end 모델 안으로 묶을 수 있게 되었습니다. 그리고 이 지점이 이후 VLA 계열 연구들이 계속 이어지는 출발점이 됩니다.

## Ⅲ. 모델 구조

### 1. RT-2 모델 구조와 학습 방식

#### 1-1. 기존 VLM 기반 확장 구조

RT-2는 PaLI-X와 PaLM-E를 backbone으로 사용하며, 이미지와 텍스트를 처리하던 모델의 출력 공간에 로봇 action을 포함시키는 방식으로 확장합니다.

즉, RT-2-PaLI-X와 RT-2-PaLM-E는 각각의 VLM 위에 로봇 제어를 위한 출력 표현을 추가한 형태로 볼 수 있습니다.

#### 1-2. Backbone별 구현 차이

Backbone에 따라 action 표현을 연결하는 방식에는 차이가 있습니다.

이 차이는 동일한 개념이더라도 각 모델의 tokenizer 설계에 맞춰 구현이 조정됨을 보여줍니다.

RT-2-PaLI-X는 PaLI-X를 기반으로 만든 RT-2 버전으로, 5B와 55B 규모를 실험합니다.

기존 tokenizer가 1000 이하 정수 토큰을 포함하고 있어, 로봇 행동을 128, 91 같은 숫자표처럼 바로 붙여서 쓸 수 있습니다. 마치 번호가 이미 적힌 서랍에 값을 바로 넣는 느낌입니다. 그래서 action bin 값을 비교적 직접 매핑할 수 있습니다.

반면 RT-2-PaLM-E는 PaLM-E를 기반으로 만든 RT-2 버전으로, 12B 모델을 사용합니다.

PaLI-X처럼 정수를 바로 대응시킬 수 있는 토큰 체계가 없어, 원래 거의 안 쓰던 토큰 256개를 골라 “이제부터 너희는 행동 전용 번호표야” 하고 새로 역할을 줍니다. 즉 남는 서랍에 새 라벨을 붙여 action 전용으로 바꿔 쓰는 느낌입니다.

#### 1-3. Co-fine-tuning

RT-2는 학습 과정에서 웹 규모의 vision-language 데이터와 로봇 데이터를 함께 사용합니다.

사전학습된 VLM을 로봇 데이터만으로 미세조정할 경우, 기존에 학습한 시각적·시맨틱 표현이 약화될 수 있기 때문입니다.

논문에서는 이러한 방식을 co-fine-tuning이라 부르며, 웹 vision-language 데이터와 로봇 trajectory 데이터를 함께 학습해 로봇 action을 익히는 동안에도 사전학습에서 얻은 개념을 유지하도록 합니다.

실제로 robot-only fine-tuning보다 co-fine-tuning이 더 나은 일반화 성능을 보였습니다. 원래의 VLM 학습 데이터를 함께 유지함으로써 기존 개념을 덜 잊게 되기 때문입니다.

학습 시에는 배치 내에서 robot data의 sampling weight를 높여 두 데이터의 비율을 조정했으며, RT-2-PaLI-X는 robotics data를 약 50%, RT-2-PaLM-E는 약 66% 비중으로 포함합니다.

#### 1-4. Output constraint와 추론 인프라

추론 시에는 task에 따라 출력 가능한 토큰을 제한합니다.

- 로봇 제어 task -> action token만 생성
- 일반 vision-language task -> 자연어 전체 생성 가능

이를 통해 실행 불가능한 출력을 방지합니다.

또한 대형 모델을 실제 제어에 연결하기 위해 RT-2는 클라우드 기반 추론 구조를 사용합니다.

로봇은 네트워크를 통해 action을 받아 제어에 사용합니다.

- 55B 모델: 약 1–3 Hz
- 5B 모델: 약 5 Hz

RT-2의 구현은 다음 네 가지 요소로 정리할 수 있습니다.

- 기존 VLM 기반 확장 구조
- 연속 action의 이산화 표현
- 웹 + 로봇 데이터의 공동 학습
- 출력 제한 및 클라우드 추론 구조

이 조합을 통해 RT-2는 기존 모델을 유지하면서 로봇 제어까지 포함하는 형태로 확장됩니다.

## Ⅳ. 결과

### 1. 실험: RT-2는 무엇이 달라졌는가

RT-2의 실험은 단순히 “성능이 몇 퍼센트 올랐다”를 보여주는 데서 끝나지 않습니다.

논문은 크게 네 가지 질문을 던집니다.

- RT-2는 학습에 사용한 작업은 물론 새로운 물체, 배경, 환경에서도 잘 동작하는가
- 웹에서 학습한 지식이 실제 로봇 행동에까지 이어지면서 새로운 능력이 나타나는가
- 이런 일반화는 모델 크기나 학습 방식에 따라 어떻게 달라지는가
- 비전·언어 모델에서 자주 이야기되는 chain-of-thought가 로봇 행동에도 도움이 되는가

즉, RT-2의 실험은 단순 benchmark 비교가 아니라, VLA라는 발상이 실제로 어떤 변화를 만드는지를 여러 각도에서 확인하는 과정에 가깝습니다.

#### 1-1. 실험 설정

약 6,000개의 평가 trajectory를 사용하며, 7DoF 모바일 매니퓰레이터 환경에서 실험을 진행합니다.

학습에는 로봇 demonstration 데이터와 웹 규모 vision-language 데이터를 함께 사용합니다.

비교 대상 베이스라인 모델들은 RT-1, VC-1, R3M, MOO 등입니다.

- RT-1: 순수 로봇 정책 baseline
- VC-1 / R3M: 사전학습된 representation learning을 붙인 baseline
- MOO: 관심 객체만 추출한 VLM을 보조 perception 모듈처럼 쓰는 baseline
- RT-2: VLM 자체가 직접 action token을 생성하는 방식

#### 1-2. 일반화 성능

논문은 성능을 4가지로 나뉘어 평가합니다.

- seen task
- unseen object
- unseen background
- unseen environment

Figure 3은 이러한 평가가 실제로 어떤 상황을 의미하는지를 보여주고, Figure 4는 각 조건에서의 성능을 정량적으로 비교합니다.

![RT-2 일반화 시나리오 Figure 3](https://static.wikidocs.net/images/page/366370/gh_eaa4c7dcdbe5.png)

![RT-2 일반화 결과 Figure 4](https://static.wikidocs.net/images/page/366370/gh_a15b1a7c1115.png)

결과를 보면, seen task에서는 RT-1과 큰 차이가 없지만 unseen 조건에서는 성능 차이가 크게 벌어집니다.

RT-2는 novel object, background, environment에서 RT-1 및 MOO 대비 약 2배, 다른 baseline 대비 최대 6배까지 성능 향상을 보입니다.

즉, RT-2의 차이는 학습 범위 안이 아니라 분포 밖에서 더 명확하게 드러납니다.

#### 1-3. 다른 환경에서의 검증

![RT-2 Language Table 결과 Table 1](https://static.wikidocs.net/images/page/366370/gh_dd0674c7f94b.png)

Language Table 실험 환경에서도 유사한 경향이 나타납니다.

Table 1 기준으로 웹 사전학습 기반 표현이 특정 환경에 국한되지 않고 작동함을 보여줍니다.

- RT-2-PaLI-3B: 90±10
- RT-1: 74±13
- LAVA: 77±4

#### 1-4. Emergent capability

RT-2는 단순한 일반화를 넘어서 웹에서 학습한 개념을 행동으로 연결합니다.

Figure 2는 이러한 능력을 직관적으로 보여주는 대표적인 예시입니다.

![RT-2 emergent skill 예시 Figure 2](https://static.wikidocs.net/images/page/366370/gh_0195eedf1401.png)

##### 1-4-1. Symbol understanding

> move coke can to X

장면 속 문자 X를 식별해야 합니다. 이런 문자는 로봇 시연 데이터에 없더라도, 웹에서 이미지와 텍스트를 함께 보며 배운 기호 이해를 활용해 “어디가 X인지”를 찾고, 그다음 로봇 데이터에서 배운 pick-and-place 동작을 실행하는 방식입니다.

##### 1-4-2. Reasoning

> move banana to the sum of two plus one

단순 인식보다 한 단계 더 가서 “2+1=3”이라는 계산과 대응 위치 찾기가 들어갑니다.

즉 RT-2는 웹에서 배운 언어·수 개념을 이용해 “sum of two plus one”이 3을 뜻한다는 걸 해석하고, 그 숫자 위치로 바나나를 옮깁니다.

##### 1-4-3. Human recognition

> move coke can to Taylor Swift

사람 사진들 중에서 Taylor Swift가 누구인지 구분해야 합니다.

로봇이 사람을 새로 조작하는 법을 배운 게 아니라, 웹에서 학습한 인물, 얼굴, 이름 연결 지식을 써서 목표 인물을 찾고 그 위치로 캔을 옮기는 것입니다.

이 작업들은 로봇 데이터에 직접 포함되지 않았지만, RT-2는 기존 baseline보다 더 높은 성공률을 보입니다.

핵심은 새로운 동작을 배우는 것이 아니라, 기존 동작을 더 넓은 개념과 연결해 사용하는 것입니다.

#### 1-5. 모델 크기와 학습 방식

![RT-2 모델 크기와 co-fine-tuning Figure 6](https://static.wikidocs.net/images/page/366370/gh_386e8dcaabe6.png)

Figure 6은 성능에 영향을 주는 요소를 보여줍니다.

Figure 6(a)는 emergent skill 평가에서 RT-2와 baseline의 차이를 정량적으로 비교하고, Figure 6(b)는 모델 크기와 학습 방식이 generalization에 어떤 영향을 주는지 보여줍니다.

결론적으로 큰 모델을 아무 사전학습 없이 scratch로 학습하는 것은 잘 되지 않았습니다.

반면 사전학습된 모델을 로봇 데이터만으로 fine-tuning하는 것보다, 웹 데이터와 로봇 데이터를 함께 쓰는 co-fine-tuning이 더 잘 일반화했습니다.

논문은 이를 “기존 VLM 학습에서 얻은 개념을 잊지 않게 해준다”는 쪽으로 해석합니다.

또한 모델 크기가 클수록 성능이 향상됩니다.

즉, RT-2의 성능은 구조 자체보다 사전학습 + co-fine-tuning 조합에 크게 의존합니다.

#### 1-6. Chain-of-Thought 가능성

![RT-2 Chain-of-Thought Figure 7](https://static.wikidocs.net/images/page/366370/gh_de3eb7a22c4c.png)

논문은 action 앞에 자연어 계획을 생성하는 구조도 실험합니다.

PaLM-E 기반 RT-2 변형에 짧게 추가 학습을 해, action 앞에 자연어 “Plan” 단계를 넣는 방식을 실험합니다.

예를 들면 “Instruction … Plan … Action …” 같은 형식입니다.

```
Copy
"Bring me a drink" -> "Plan: pick '7up' can" -> action
```

논문은 이를 VQA 데이터의 자연어 추론과 manipulation 데이터의 action 생성을 이어 주는 다리처럼 설명합니다.

정량적 비교보다는 정성적 결과지만, 저자들은 이런 형식이 더 복잡한 지시를 다루는 데 도움이 될 수 있다고 봅니다.

즉, RT-2는 단지 vision-language model을 로봇에 붙인 사례가 아니라, 자연어 추론과 행동이 하나의 흐름으로 연결될 수 있음을 보여줍니다.

RT-2의 변화는 다음과 같이 요약됩니다.

- seen task에서는 큰 차이가 없지만
- unseen 환경에서는 성능이 크게 향상되고
- emergent capability에서는 개념 이해가 행동으로 이어집니다

### 2. RT-2의 핵심 결과: emergent capability

RT-2에서 가장 중요한 변화는 단순한 일반화 성능 향상이 아니라, 시맨틱 이해가 실제 행동 선택에 개입하기 시작했다는 점입니다.

여기서 말하는 시맨틱은 눈에 보이는 것의 뜻과 관계를 이해하는 능력을 의미합니다.

논문은 이를 창발 능력(emergent capability)으로 설명합니다.

여기서 말하는 창발 능력은 새로운 물리적 동작을 만들어내는 것이 아니라, 웹에서 학습한 개념과 관계를 바탕으로 이미 학습된 행동을 새로운 기준으로 선택하는 능력을 의미합니다.

Figure 8과 Table 3은 이 세 범주를 보다 구조적으로 보여주는 자료입니다.

![RT-2 emergent capability Figure 8](https://static.wikidocs.net/images/page/366370/gh_477758977923.png)

![RT-2 emergent capability Table 3](https://static.wikidocs.net/images/page/366370/gh_5723d755b058.png)

논문은 이를 symbol understanding, reasoning, human recognition으로 정리하고 있습니다.

#### 2-1. Symbol understanding

첫 번째는 기호와 상징을 행동으로 연결하는 능력입니다.

예를 들어

- “move coke can near 3”
- “place above star”

같은 지시는 단순한 물체 인식만으로는 수행할 수 없습니다.

모델은 숫자, 문자, 아이콘이 무엇을 의미하는지 이해하고, 그 위치를 장면 안에서 찾아 행동으로 연결해야 합니다.

이 범주는 RT-2가 단순한 시각 패턴이 아니라 추상적인 기호 체계를 행동 기준으로 사용할 수 있음을 보여줍니다.

#### 2-2. Reasoning

두 번째는 관계와 의미를 기반으로 한 선택 능력입니다.

여기에는 다양한 형태의 조건이 포함됩니다.

- 수학적 관계 -> “smallest number”, “three times two”
- 의미 기반 판단 -> “pick a healthy drink”, “sweet snack”
- 관계 이해 -> “move apple to cup with same color”
- 다국어 표현 -> 동일한 지시를 다른 언어로 수행

이 작업들은 단순한 object recognition을 넘어서, 장면과 언어의 관계를 해석한 뒤 그에 맞는 대상을 선택해야 합니다.

즉, RT-2는 “보이는 것을 그대로 따라 하는 수준”을 넘어 조건을 해석하고 그에 맞는 행동을 선택하는 단계로 이동합니다.

#### 2-3. Human recognition

세 번째는 사람에 대한 인식을 행동으로 연결하는 능력입니다.

예를 들어

- “person with glasses”
- “man with white hair”
- “Taylor Swift”

같은 지시는 단순한 객체 검출이 아니라, 특정 사람의 특징이나 identity를 구분한 뒤 그 위치로 행동을 이어야 합니다.

이 역시 로봇 demonstration에 직접 포함된 기술이라기보다, 웹에서 학습된 시각·언어 지식이 행동 선택에 반영된 결과로 볼 수 있습니다.

이 세 범주는 공통적으로 하나의 변화를 보여줍니다.

RT-2는 새로운 행동을 만들어낸 것이 아니라, 행동을 선택하는 기준 자체를 확장했습니다.

- 기존 -> 위치 기반 선택
- RT-2 -> 개념 기반 선택

즉, 로봇의 skill은 그대로지만, 그 skill을 언제 사용하는지는 더 이상 고정되어 있지 않습니다.

이 변화는 로봇 정책이 단순한 제어 시스템에서 벗어나, 의미를 이해하고 그에 맞게 행동을 선택하는 구조로 이동하고 있음을 보여줍니다.

## Ⅴ. 한계점

### 1. RT-2의 의미와 한계

#### 1-1. 의미 1: 로봇 정책의 범위 확장

RT-2의 첫 번째 의미는 로봇 정책의 학습 범위를 로봇 데이터 바깥으로 확장했다는 데 있습니다.

기존에는 로봇 정책이 주로 demonstration 안에서 시각 입력과 언어 지시를 행동으로 연결하는 구조였다면, RT-2는 웹 규모의 vision-language 사전학습에서 얻은 표현을 행동 예측 과정 안으로 직접 끌어옵니다.

이로써 로봇 정책은 더 이상 로봇 데이터만으로 닫힌 계가 아니라, 웹에서 학습된 시맨틱 지식을 함께 활용하는 구조로 바뀝니다.

이런 점에서 RT-2의 의미는 단순한 성능 향상보다, 로봇 정책을 구성하는 정보의 범위를 넓혔다는 데 있습니다.

#### 1-2. 의미 2: 데이터 양보다 표현의 성격과 학습 방식의 차이가 만든 일반화 성능

RT-2는 unseen object, unseen background, unseen environment 같은 분포 밖 조건에서 더 강한 성능을 보였고, emergent capability 평가에서도 웹에서 학습한 개념이 행동 선택에 반영될 수 있음을 보여줍니다.

또한 scratch 학습이나 robot-only fine-tuning보다 co-fine-tuning이 더 잘 작동했다는 결과는, RT-2의 일반화가 단순한 모델 크기 증가보다 사전학습된 시맨틱 표현을 유지하는 방식과 더 깊게 연결되어 있음을 시사합니다.

즉 RT-2는 로봇 일반화의 원인을 데이터 양이 아니라 표현의 성격과 학습 방식의 차이에서 설명하게 만든 사례라고 볼 수 있습니다.

#### 1-3. 의미 3: 복잡한 전용 구조 없이도 VLA 구현 가능성의 발견

RT-2는 기존 VLM의 토큰 예측 구조를 유지한 채 행동을 토큰 형태로 연결하고, 출력 제약과 co-fine-tuning을 통해 실제 제어 문제로 확장합니다.

다시 말해 RT-2의 중요성은 새로운 거대한 아키텍처를 제안했다기보다, 이미 강력한 비전·언어 모델을 비교적 단순한 방식으로 로봇 행동까지 확장할 수 있다는 구현 경로를 제시했다는 데 있습니다.

이 점에서 RT-2는 하나의 완성형 시스템이라기보다, 이후 VLA 계열 연구의 방법론적 출발점으로 이해할 수 있습니다.

#### 1-4. 한계 1: skill 자체는 확장되지 않음

RT-2의 가장 중요한 한계는 새로운 physical skill을 학습하지는 못한다는 점입니다.

웹 규모 pretraining이 시맨틱·시각적 일반화를 높여 주기는 했지만, 로봇이 수행할 수 있는 실제 동작은 여전히 로봇 데이터에 포함된 skill distribution에 제한됩니다.

즉, RT-2는 행동을 더 잘 “선택”하게 만들지만, 행동 자체를 새롭게 “생성”하지는 못합니다.

모델의 physical skill은 여전히 로봇 데이터에 포함된 skill distribution에 제한되어 있고, RT-2는 그 skill을 새로운 방식으로 배치하고 활용하는 쪽에 더 가깝습니다.

저자들은 이것이 현재 데이터셋이 skill 축에서 충분히 다양하지 않기 때문이라고 보고, 앞으로는 인간 비디오 같은 새로운 데이터 수집 방식이 도움이 될 수 있다고 제안합니다.

#### 1-5. 한계 2: 계산 비용과 실시간성

RT-2는 최대 55B 규모의 모델을 사용하며 실제 closed-loop control에 연결했고, 이를 클라우드 기반(multi-TPU)으로 서빙하는 구조를 사용합니다.

이 접근은 원리적으로는 작동하지만,

- 높은 계산 비용
- 낮은 제어 주파수 (1–3 Hz 수준)

와 같은 현실적인 제약을 동반합니다.

따라서 더 빠른 제어가 필요한 환경에서는 추론 속도와 비용이 병목이 될 수 있습니다.

논문은 이를 해결하기 위한 방향으로 quantization, distillation, 경량화, 더 저렴한 하드웨어에서의 실행 가능성 등을 제시합니다.

아직 범용화된 수준까지는 사용에 한계점을 보여줍니다.

#### 1-6. 한계 3: 모델 접근성과 생태계

RT-2와 같은 접근은 fine-tuning 가능한 대형 VLM이 필요합니다.

하지만 당시에는 이러한 모델들이 제한된 환경에서만 접근 가능하거나 proprietary하게 운영되는 경우가 많았습니다.

이로 인해 RT-2의 아이디어가 흥미롭더라도, 누구나 쉽게 재현하거나 확장하기는 어려운 구조였습니다.

즉, 기술적 가능성과 별개로 생태계 측면의 제약이 존재합니다.

그래서 저자들은 더 많은 open-source 모델과 fine-tuning API의 개방이 필요하다고 말합니다.

RT-2는 “로봇이 갑자기 사람처럼 추론하게 되었다”는 식의 과장을 보여주는 논문은 아닙니다.

오히려 로봇 정책이 웹에서 학습한 개념을 실제 행동 결정에 활용하기 시작했다는 점, 그리고 그 연결을 end-to-end 구조 안에서 실험적으로 증명했다는 점이 핵심입니다.

반대로 말하면, 현재 단계의 RT-2는 개념적 돌파구는 분명하지만, skill 다양성, 추론 비용, 모델 접근성 측면에서는 아직 초기 단계에 있었습니다.

그래서 RT-2는 이후 OpenVLA나 더 넓은 Physical AI 흐름의 연구 토대로 보게 됩니다.

## Ⅵ. 정리

### 1. 정리

RT-2는 로봇 행동을 텍스트 토큰처럼 다루면서, 웹에서 학습한 비전·언어 지식을 실제 로봇 제어에 연결했다는 점이 핵심입니다.

이 논문이 보여준 변화는 단순한 성능 개선이 아니라, 로봇 정책의 학습 범위를 로봇 데이터 바깥으로 넓혔다는 데 있습니다.

특히 의미 있었던 부분은, RT-2가 새로운 물체나 배경, 환경에서 더 잘 일반화했다는 점입니다.

그리고 숫자, 아이콘, 관계, 사람 같은 개념을 읽고 그것을 실제 행동 선택으로 이어가는 모습도 보여줬습니다.

즉, 로봇이 새로운 동작 자체를 배운 것은 아니지만, 이미 배운 동작을 더 넓은 맥락에서 쓸 수 있게 되었다는 점이 중요합니다.

하지만 physical skill 자체는 여전히 로봇 데이터의 범위에 묶여 있고, 큰 모델을 실제 제어에 쓰기 위한 비용도 큽니다. 또한 제한된 환경에서만 사용 가능한 모델로 접근성과 확장성이 낮습니다.

그래서 RT-2는 완성형이라기보다, 앞으로의 방향을 보여준 연구에 가깝습니다.

RT-1이 generalist policy의 가능성을 열었다면, RT-2는 그 다음 단계인 VLA 흐름의 출발점을 만든 연구라고 볼 수 있습니다.

## 그림 출처

- RT-2 개요 Figure 1 이미지
- RT-2 일반화 시나리오 Figure 3 이미지
- RT-2 일반화 결과 Figure 4 이미지
- RT-2 Language Table 결과 Table 1 이미지
- RT-2 emergent skill 예시 Figure 2 이미지
- RT-2 모델 크기와 co-fine-tuning Figure 6 이미지
- RT-2 Chain-of-Thought Figure 7 이미지
- RT-2 emergent capability Figure 8 이미지
- RT-2 emergent capability Table 3 이미지

## 참고문헌

- Brohan, A., Brown, N., Carbajal, J., Chebotar, Y., Chen, X., Choromanski, K., Ding, T., Driess, D., Dubey, A., Finn, C., Florence, P., Fu, C., Gonzalez Arenas, M., Gopalakrishnan, K., Han, K., Hausman, K., Hsu, J., Ichter, B., … Zitkovich, B. (2023). RT-2: Vision-Language-Action Models Transfer Web Knowledge to Robotic Control.
[https://arxiv.org/abs/2307.15818](https://arxiv.org/abs/2307.15818)
