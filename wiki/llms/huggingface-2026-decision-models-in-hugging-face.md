---
title: "Decision Models in Hugging Face"
type: article
year: 2026
category: llms
source: huggingface-2026-decision-models-in-hugging-face.md
raw_path: raw/articles/huggingface-2026-decision-models-in-hugging-face.md
raw_filename: "huggingface-2026-decision-models-in-hugging-face.md"
source_collection: external
author: "Aritra Roy Gosthipaty, Lysandre Debut, Pedro Cuenca, Tom Aarsen"
url: "https://huggingface.co/blog/decision"
publisher: "Hugging Face Blog"
tags: [decision-model, system-one-model, transformers, llama-cpp, structured-output, zero-shot-classification, confidence, primitive, jev, hugging-face]
figures:
  - id: fig01
    file: assets/huggingface-2026-decision-models-in-hugging-face/fig01.png
    raw: raw/articles/huggingface-2026-decision-models-in-hugging-face-figures/fig01.png
    caption: "decision model의 입력과 출력. 상태(고객 메시지)와 질문, 선택지 세 개가 모델에 들어가고 선택지별 확률(80%, 15%, 5%)이 나온다"
    strategy: fetched
    curated: true
---

## 요약

이 글은 Hugging Face가 2026년 11월 10일 블로그에 게시한 decision model 해설이자 생태계 통합 발표다. decision model은 상태(state)와 질문, 허용된 답을 받아 타입이 정해진 결정과 확률을 반환하는 모델을 말한다. 텍스트를 한 토큰씩 생성하지 않고, 애플리케이션이 이미 이해하는 답들에 확률을 배정한다.

글은 두 부분으로 구성된다. 앞부분은 decision model이 LLM의 JSON 출력, 전통적 분류 모델, zero-shot 분류와 어떻게 다른지 설명하고 세 가지 primitive(Choice, Score, Noul)와 `confidence` 값의 수식을 풀이한다. primitive는 더 작은 단위로 나누지 않고 조합의 재료로 쓰는 기본 구성 요소를 뜻한다.

뒷부분은 Hugging Face가 도입한 지원 기능을 소개한다. transformers의 `DecisionPipeline`과 `/v1/systemone` 엔드포인트, llama.cpp의 같은 API 지원, Hub의 `decision-model` 태그, `Trainer` 기반 fine-tuning 예제가 포함된다. 핵심 방침은 모델 내부 구현은 자유롭게 두고 요청과 응답의 인터페이스만 통일하는 것이다.

저장소 안에서 이 글은 TypeSafe AI의 Jev 소개([[llms/typesafe-ai-2026-introduction]])와 공개 구현 Laya([[llms/nandhakishorm-laya]])를 잇는 위치에 있다. Jev가 시작한 인터페이스가 Hugging Face 표준 라이브러리로 들어간 시점을 기록한 자료다.

## 배경

### 텍스트 생성이 필요 없는 문제

LLM은 질문 답변, 코드 작성, 추론처럼 텍스트를 생성하는 작업에 강하다. 하지만 글은 모든 문제가 텍스트 생성을 요구하지는 않는다는 데서 출발한다.

원문의 예시는 고객 지원 시스템이다. 시스템이 "I was charged twice for my subscription. I need a refund today."라는 메시지를 받으면 세 가지를 정해야 한다.

- 어느 팀이 요청을 처리할지
- 요청이 얼마나 긴급한지
- 고객이 환불을 요청하는지

LLM(예시는 `gemma-4-e4b-it` GGUF 4비트 양자화 모델)에 이 세 질문을 JSON으로 답하라고 하면, 모델은 추론 텍스트를 생성한 뒤 아래와 같은 결과를 낸다.

| 키 | 값 |
|---|---|
| `team_to_handle` | Billing |
| `urgency` | High |
| `request_refund` | true |

결과 자체는 맞지만, 세 개의 짧은 결정을 얻으려고 긴 텍스트를 생성한 셈이다. 글은 모델이 선택지를 직접 평가해 확률 분포를 돌려주면 텍스트 생성 없이 같은 결정을 얻을 수 있다고 제안한다.

### LLM으로 모든 것을 처리할 때의 문제

많은 애플리케이션이 이미 LLM에 JSON 출력을 요청하는 방식으로 분류, 라우팅 같은 구조화 작업을 처리한다. 글은 이 방식의 문제를 세 가지로 정리한다.

| 문제 | 설명 |
|---|---|
| 스키마 미준수 | 명시적 지시가 있어도 잘못된 JSON을 내거나, 예상하지 않은 키를 넣거나, 허용 범위 밖의 답을 낼 수 있다 |
| constrained decoding의 비용 | Outlines, XGrammar 같은 라이브러리는 각 단계에서 생성 가능한 토큰을 제한해 문법이나 JSON 스키마를 강제한다. 구조는 보장되지만 추가 연산이 든다 |
| 불필요한 생성 | LLM은 열린 생성을 위해 설계됐다. 미리 정한 답 중 하나를 고르기만 하면 되는 문제에서 autoregressive 디코딩은 불필요한 작업이다 |

constrained decoding은 디코딩 단계마다 문법에 맞지 않는 토큰을 후보에서 제외해 출력 형식을 강제하는 기법이다. 첫 번째 문제는 해결하지만 생성 자체를 없애지는 못한다. decision model은 세 번째 문제, 즉 생성 자체를 생략하는 쪽으로 접근한다.

### 명칭의 정리

TypeSafe AI는 Jev를 발표하며 "System One model"이라는 이름을 썼다. 이 이름은 빠르고 직관적인 사고(System 1)와 느리고 숙고하는 사고(System 2)의 구분에서 따왔다.

글은 커뮤니티가 "decision model"이라는 용어로 수렴했다고 밝힌다. 특정 인지 이론을 빌리지 않고 모델의 계산상 역할을 기술하는 이름이라는 이유다. 저자들은 X(구 Twitter) 투표로 명칭 의견을 모았고, 글 전체에서 decision model로 부른다. 다만 엔드포인트 이름 `/v1/systemone`에는 옛 명칭이 남아 있다.

## 핵심 개념

### decision model의 기본 인터페이스

decision model은 입력 컨텍스트(state)를 받아, 미리 정의된 가능한 답(primitive로 표현되는 선택지)과 함께 주어진 질문을 평가하고, 구조화된 결정과 확률을 반환한다. 글은 이 인터페이스를 한 줄로 정리한다.

```
State + Questions + Allowed Answers → Decisions + Probabilities
```

모델에 답을 토큰 단위로 생성하라고 요청하는 대신, 애플리케이션이 이미 이해하는 답들에 확률을 배정하라고 요청하는 구조다. 따라서 출력은 항상 허용된 답 중 하나이며, 파싱 실패나 범위 밖 답이 원리적으로 발생하지 않는다.

![[assets/huggingface-2026-decision-models-in-hugging-face/fig01.png]]
*Figure 1: decision model의 입력과 출력. 상태(고객 메시지)와 질문, 선택지 세 개가 모델에 들어가고 선택지별 확률(80%, 15%, 5%)이 나온다 (Hugging Face 2026)*

도식에서 상태는 고객 메시지이고, 질문은 "어느 팀이 처리해야 하는가"이며, 선택지는 Payments and Refunds, Bugs and Tech Issues, Pricing and Subscription 세 개다. 모델은 각 선택지에 80%, 15%, 5%의 확률을 배정한다. 이 수치는 개념 설명용이며, 뒤의 코드 예시 출력(billing 0.998)과는 다르다.

### 첫 코드 예시

transformers에서 decision model은 `pipeline("decision", ...)`으로 부른다. 예시 모델은 `autotrust/GEV-26B-Decide`이고, 요청은 state 문자열과 questions 사전으로 구성된다.

| 요청 필드 | 예시 값 |
|---|---|
| `state` | "I was charged twice for my order and want a refund." |
| 질문 이름 | `department` |
| `type` | `choice` |
| `instructions` | "Which team should handle this?" |
| `criteria` | billing: Payments and refunds, technical: Bugs and technical issues, sales: Pricing and subscriptions |

응답은 `choice: billing`, `confidence: 0.9974`, 그리고 billing 0.9983, technical 0.0010, sales 0.0007의 확률 분포다. 텍스트는 한 토큰도 생성되지 않는다.

## 방법

### 분류 모델과 zero-shot 분류와의 차이

decision model을 이해하려면 가까운 두 접근을 먼저 보는 것이 유용하다.

**전통적 분류.** 고객 지원 요청을 Billing, Technical support, Sales 세 부서로 보내는 분류기를 학습한다고 하자. 분류 모델은 입력에서 미리 정한 레이블 집합으로 가는 대응을 예시 데이터로 학습한다. classification head가 클래스마다 logit 하나를 내고, softmax가 이를 확률 분포로 바꾼다.

이 방식의 한계는 출력 클래스가 classification head에 고정된다는 점이다. Legal이라는 네 번째 부서를 추가해도 기존 분류기는 대응하는 출력 클래스를 자동으로 얻지 못한다. head를 수정하고, 학습 데이터를 모으고, 모델을 재학습하거나 조정해야 한다.

**zero-shot 분류.** zero-shot은 해당 과제의 예시를 하나도 보여 주지 않고 지시만으로 과제를 풀게 하는 설정이다. zero-shot 분류는 후보 레이블을 추론 시점에 넘겨 위 한계의 상당 부분을 해결한다. 원문의 예시는 `facebook/bart-large-mnli`다.

| 후보 레이블 | billing | sales | technical support | legal |
|---|---|---|---|---|
| 3개 | 0.847 | 0.096 | 0.057 | 없음 |
| 4개 (legal 추가) | 0.819 | 0.093 | 0.055 | 0.033 |

입력은 "My payment was deducted twice."이고, 레이블을 요청마다 바꿀 수 있다. legal을 추가해도 재학습 없이 바로 확률이 나온다. 흔한 구현은 자연어 추론(NLI)용으로 학습한 모델을 쓴다. 각 후보 레이블을 가설 문장으로 바꾸고, 입력이 그 가설을 얼마나 강하게 함의하는지 잰다. 글은 이 방식이 이미 decision model과 꽤 비슷하다고 인정한다.

**decision model이 다른 점.** decision model은 입력을 범주 하나에 배정하는 데서 더 나아간다. 같은 state에 대해 이름이 붙은 여러 질문을 서로 다른 답 타입으로 물을 수 있다. 답 타입은 대안 중 선택(choice), 순서 척도 채점(score), 진술이 참일 확률 추정(noul) 세 가지다. 또한 인터페이스 자체가 가능한 결정 위의 확률 분포를 중심으로 설계된다.

| 속성 | 분류 | zero-shot 분류 | decision model |
|---|---|---|---|
| 선택지 위의 확률 | 있음 | 있음 | 있음 |
| 추론 시점 레이블 정의 | 불가 | 가능 | 가능 |
| 타입이 다른 복수 질문 | 불가 | 불가 | 가능 |
| 순서 척도와 예/아니오 결정 | 과제별 구현 | 변형하면 가능 | 기본 primitive |

글은 decision model의 장점을 신중하게 한정한다. 런타임 레이블이나 확률적 분류를 새로 발명한 것이 아니라, 이 기능들을 일관된 인터페이스로 조직했다는 데 있다. 그리고 그 인터페이스 뒤에 결정에 특화된 구조와 학습 절차를 둘 수 있다는 가능성을 연다.

### 요청의 두 구성 요소

decision model 요청은 state와 questions 두 요소로 이루어진다.

state는 모델이 평가할 정보다. 형식은 세 가지가 가능하다.

- 문자열
- 구조화된 JSON 객체
- 지원하는 omni-modal 모델이면 다른 모달리티

모달리티는 텍스트, 이미지, 음성처럼 모델이 다루는 입력이나 출력의 종류를 말한다. 원문의 JSON 예시는 아래 세 필드를 담는다.

| 필드 | 값 |
|---|---|
| `customer_message` | "I was charged twice. Please refund me today." |
| `subscription` | "pro" |
| `previous_tickets` | 2 |

questions는 state에 대해 알고 싶은 것을 기술한다. 각 질문은 이름을 키로 가지며, `type`(primitive 종류), `instructions`(질문 문장), `criteria`(선택지나 척도)를 담는다. 한 요청에 여러 질문을 넣을 수 있다.

### Choice

Choice는 가장 직관적이고 전통적 분류에 가장 가까운 primitive다. 여러 답 중 하나를 고른다. "이 고객 요청을 어느 부서가 처리해야 하는가"라는 질문에 Billing, Technical support, Sales 세 선택지를 주는 경우가 해당한다.

모델은 선택지마다 logit `z_i`를 하나씩 낸다. K개 선택지의 logit `z_1, ..., z_K`에 softmax를 적용해 확률을 얻는다. 원문 수식은 `p_i = exp(z_i / T) / Σ_{j=1..K} exp(z_j)`로, 분자에만 온도 `T`가 적혀 있다. 일반적인 temperature softmax는 분모에도 `T`를 두므로 원문 표기의 누락으로 보인다.

확률의 합은 1이고, 모델은 확률이 가장 큰 선택지 `argmax_i p_i`를 고른다. 원문의 예시 분포는 아래와 같다.

| 선택지 | 확률 |
|---|---|
| Billing | 0.998 |
| Technical support | 0.001 |
| Sales | 0.001 |

선택 결과는 Billing이지만 나머지 확률도 쓸모가 있다. 모델이 대안 사이에 믿음을 어떻게 나눴는지 알려 주기 때문이다. 예를 들어 두 선택지의 확률이 비슷하면 애플리케이션은 사람에게 넘기는 등 다른 처리를 할 수 있다.

### Score

Score는 순서가 있는 척도 위에서 무언가를 평가한다. Choice는 서로 구별되는 대안이 여럿일 때 적합하지만, 긴급도처럼 크기 순서가 있는 값에는 Score가 맞다.

원문 예시는 "이 고객 요청은 얼마나 긴급한가"라는 질문에 세 수준을 둔다.

| 수준 | 의미 | 예시 확률 |
|---|---|---|
| 0 | low | 0.0149 |
| 1 | medium | 0.2648 |
| 2 | high | 0.7203 |

`criteria`에는 `["low", "medium", "high"]` 목록을 넘기고, 응답은 `legend`로 인덱스와 이름의 대응을 돌려준다.

Score primitive는 가장 확률이 높은 수준 하나만 돌려주지 않고, 수준 인덱스의 기댓값을 계산한다. 수준을 나타내는 확률변수를 X라 하면 `E[X] = Σ_{i=0..K-1} i × p_i`다. 반올림한 분포로 계산하면 `0 × 0.01 + 1 × 0.26 + 2 × 0.72 = 1.7`이고, 실제 출력은 `score: 1.705`다.

1.7이라는 값은 모델이 medium과 high 사이의 가상 수준을 골랐다는 뜻이 아니다. 확률 분포의 기댓값이 1.7이라는 뜻이다. 즉 high 쪽으로 크게 기울었지만 medium의 가능성도 무시할 수 없다는 정보를 하나의 연속값에 담는다.

### Noul

Noul은 이진 질문을 표현하는 primitive이며, 이름은 Bernoulli에서 왔다. "고객이 환불을 요청하는가"처럼 예/아니오로 답하는 질문에 쓴다. 선택지 목록을 정의하지 않고 `instructions`만 넘긴다.

모델은 답이 참일 확률을 반환한다. 이진 결과 Y가 `Y ~ Bernoulli(p)`를 따른다고 보면 `P(Y=1) = p`, `P(Y=0) = 1 - p`이고, 모델이 돌려주는 값이 `p`다. 예를 들어 `noul: 0.92`는 예에 0.92, 아니오에 0.08을 배정한다는 뜻이다. 원문의 환불 예시 출력은 0.9947이다.

모델은 이진 답을 무작위로 샘플링하지 않는다. 확률 파라미터 자체를 돌려주고, 그 값으로 어떻게 행동할지는 애플리케이션이 정한다. 예를 들어 0.9 이상이면 자동 환불 절차로, 0.5~0.9면 사람 검토로 보내는 식의 cutoff 설계가 가능하다.

### confidence

Choice와 Score는 확률 분포와 함께 `confidence` 필드를 반환한다. 분포에 답이 여럿 있을 때 모델의 믿음이 얼마나 한쪽에 몰려 있는지를 한 숫자로 요약하는 값이다.

K개 선택지의 Choice에서 confidence는 `C = (p_max - 1/K) / (1 - 1/K)`다. `p_max`는 가장 큰 예측 확률이다. 이 식의 성질은 세 가지다.

| 분포 | p_max | confidence | 해석 |
|---|---|---|---|
| 균등 분포 | 1/K | 0 | 모든 선택지가 같은 가능성 |
| 한 선택지에 집중 | 1 | 1 | 완전한 확신 |
| 그 사이 | 1/K < p_max < 1 | 0~1 | 균등 분포 대비 최고 확률이 클수록 높다 |

원문 예시는 K=3, p_max=0.99를 넣어 `C = (3 × 0.99 - 1) / 2 = 0.98`을 계산한다. 최고 확률은 0.99인데 confidence는 0.98로, 선택지 수로 정규화한 결과다. 같은 0.99라도 선택지가 2개면 confidence는 0.98, 10개면 약 0.989가 되어, 선택지가 많을수록 같은 확률이 더 높은 확신을 뜻한다.

원문에는 두 가지 불일치가 있다. 문장은 "Billing had probability 0.80"이라고 쓴 뒤 0.99로 계산하는데, 0.80은 Figure 1 도식의 수치다. 또한 Score 예시의 confidence 0.558을 언급하지만 Score용 산식은 제시하지 않는다. Choice 식을 Score 분포(p_max 0.7203, K=3)에 그대로 적용하면 0.580이 되어 0.558과 맞지 않으므로, Score는 다른 정의를 쓰는 것으로 보인다.

### Hugging Face 생태계의 공통 인터페이스

decision model은 아직 젊고 빠르게 변하는 분야다. 글은 모델마다 내부 결정 방식이 다르다고 설명한다.

- 스키마 전체를 함께 채점하는 head
- LLM backbone 위에 별도 readout을 둔 구조
- edge 크기 모델과 멀티모달 변형

backbone은 상위 head가 결합되는 pre-training된 특징 추출 본체를 뜻한다. 이 다양성은 건강한 신호지만 비용이 따른다. 모델마다 인터페이스가 다르면 주변 도구 모두가 모델별로 대응해야 한다.

Hugging Face의 목표는 공통 구현을 강제하지 않고 공통 인터페이스에 합의하는 것이다. 모델은 같은 state와 questions를 받고 같은 타입의 결정을 돌려주기만 하면 내부를 어떻게 구성해도 된다. 이 계약이 생기면 나머지 생태계는 한 번만 구현하면 된다.

| 구성 요소 | 계약이 주는 이점 |
|---|---|
| 추론 엔진(llama.cpp 등) | 같은 API로 어떤 decision model이든 서빙한다 |
| Hub | 모델을 일관되게 패키징하고 노출한다 |
| 학습 도구 | 개별 구조 대신 공유 primitive를 대상으로 한다 |

### transformers 서빙

transformers는 `DecisionPipeline`, `AutoModelForDecision`, `DecisionConfig` 세 클래스를 새로 지원한다. 구조는 기존 pipeline과 모델 클래스를 따르되 decision model에 맞춰 만들었다. `pipeline("decision", model="autotrust/GEV-26B-Decide")`를 출력하면 모델 클래스 `JevForDecision`, dtype `bfloat16`, 장치 `cuda`, 입력 모달리티 `text`가 표시된다. 설정과 모델은 `DecisionConfig.from_pretrained`, `AutoModelForDecision.from_pretrained`로 불러온다.

서버로 쓰려면 `pip install "transformers[serving]"`로 serving 의존성을 설치하고 `transformers serve`를 실행한다. 그러면 `http://localhost:8000/v1/systemone` 엔드포인트가 열린다. 원문은 한 요청에 세 질문을 함께 보내는 예시를 싣는다.

| 질문 | type | 응답 |
|---|---|---|
| `department` | choice | billing 0.9983, confidence 0.9974 |
| `urgency` | score | score 1.753, confidence 0.629, 분포 0.014, 0.219, 0.767 |
| `refund` | noul | 0.9953 |

응답의 `usage`는 input 148 토큰, output 0 토큰이다. 출력 토큰이 0이라는 점이 decision model의 성격을 그대로 보여 준다. 세 결정을 얻는 데 생성이 전혀 없다.

같은 urgency 질문이 단독 요청에서는 score 1.705, confidence 0.558이었는데 세 질문 묶음에서는 1.753, 0.629로 조금 다르다. 글은 이 차이를 설명하지 않는다. 같은 state에 대한 질문이 함께 처리되면서 입력 구성이 달라졌을 가능성이 있지만 원문 근거는 없다.

### autoregressive 모델에서의 동작

글이 별도로 강조하는 세부는 위 API가 호환되는 autoregressive 언어 모델에서도 동작한다는 점이다. transformers가 결정용 프롬프트를 구성하고, 답 레이블들의 logit을 batched forward pass 한 번으로 평가한 뒤 softmax를 적용한다. 응답 텍스트는 생성하지 않는다.

따라서 새 decision model을 학습하지 않고도 기존 생성형 모델로 decision 인터페이스를 시험해 볼 수 있다. 인터페이스와 구현을 분리한다는 방침이 실제로 작동하는 사례다.

### llama.cpp 서빙

llama.cpp도 같은 `/v1/systemone` API로 decision model을 지원한다(ggml-org의 별도 블로그 글이 있다). Hub의 GGUF decision model은 `llama serve -hf ggml-org/Kev-4B-GGUF`로 띄운다. 기본 포트는 9931이다.

요청은 `http://localhost:9931/v1/systemone`으로 보내며 state와 questions는 transformers 예시와 동일하다. 서버가 모델을 이미 정하므로 `model` 필드는 생략할 수 있다. 글은 이 서빙 방식의 유용한 성질을 인터페이스 호환성으로 꼽는다. 같은 요청 JSON을 엔진만 바꿔 보낼 수 있다.

### Hub의 decision-model 태그

Hugging Face는 호환 모델을 찾을 수 있도록 `decision-model` 태그를 도입했다. decision model은 backbone이나 구조를 하나로 공유하지 않아도 되므로 태그가 특히 유용하다. 생태계에는 ModernBERT 같은 인코더 기반 모델과 큰 생성형 언어 모델에서 파생된 모델이 함께 있다.

### fine-tuning

decision model은 transformers에 통합되어 있으므로 `Trainer` API로 fine-tuning할 수 있다. fine-tuning은 pre-training된 모델을 특정 과제 데이터로 더 학습시키는 단계다. 원문은 `autotrust/JEV-9B`를 지원 요청 라우팅에 맞추는 작은 예제를 싣는다.

학습 예제는 6개이고, 레이블은 세 가지다.

| 레이블 | 설명 | 예시 문장 |
|---|---|---|
| refund | Billing issues and refunds | "I was charged twice. Please refund me.", "I want my money back." |
| shipping | Orders and deliveries | "My package has not arrived.", "Where is my delivery?" |
| technical | Software and account issues | "The application crashes when I open it.", "I cannot log into my account." |

예제가 보여 주는 요점은 세 가지다.

- 각 학습 예제는 결정 요청(state와 questions)과 정답의 쌍이다.
- `model.decision_config.prepare_inputs(request, tokenizer)`가 요청을 모델 입력으로 바꾼다. 추론 때와 같은 변환이므로 학습과 추론의 입력 형식이 어긋나지 않는다. 변환 결과에 `marks`, `num_options`(선택지 수), `question_type_ids`(choice는 1), `labels`(정답 선택지 인덱스)를 붙인다.
- 모델이 선택지마다 logit 하나를 내므로 choice 질문은 선택지 위의 일반 cross-entropy 손실로 학습한다. 이를 위해 `Trainer`의 `compute_loss`를 재정의한 `DecisionTrainer`를 만든다.

학습 설정은 아래와 같다.

| 설정 | 값 |
|---|---|
| `max_steps` | 30 |
| `per_device_train_batch_size` | 1 |
| `learning_rate` | 1e-3 |
| `logging_steps` | 5 |
| `save_strategy` | no |
| `remove_unused_columns` | False |
| `data_collator` | 배치의 첫 원소를 그대로 반환 |

원문도 이 예제를 의도적으로 작게 만든 장난감 예제라고 밝힌다. TRL에도 decision model 학습 지원이 들어올 예정이며(huggingface/trl#8040), 그러면 이런 배관 코드를 직접 쓰지 않아도 된다. 다만 작성 시점에 PR은 열려 있는 상태다.

생성형 LLM을 decision model로 바꾸려면 Unsloth의 레시피를 참고할 수 있다. Qwen 같은 모델을 LoRA와 decision 채점 head로 fine-tuning하는 방법이다. LoRA는 저랭크 행렬만 학습해 fine-tuning 비용을 줄이는 기법이다.

## 결과

이 글은 정확도, 속도, 보정을 비교한 벤치마크를 싣지 않는다. 등장하는 수치는 모두 예시 요청의 출력값이다.

| 예시 | 모델 | 결과 |
|---|---|---|
| Choice (department) | GEV-26B-Decide | billing 0.9983, confidence 0.9974 |
| Score (urgency, 단독 요청) | GEV-26B-Decide | score 1.705, confidence 0.558 |
| Score (urgency, 세 질문 묶음) | GEV-26B-Decide | score 1.753, confidence 0.629 |
| Noul (refund) | GEV-26B-Decide | 0.9947 (단독), 0.9953 (묶음) |
| zero-shot 3레이블 | bart-large-mnli | billing 0.847 |
| zero-shot 4레이블 | bart-large-mnli | billing 0.819, legal 0.033 |
| 서버 토큰 사용량 | GEV-26B-Decide | input 148, output 0 |

같은 billing 판정이라도 zero-shot 분류기는 0.82~0.85, decision model은 0.998의 확률을 낸다. 다만 두 결과는 입력 문장과 레이블 설명이 다르므로 직접 비교할 수 있는 수치는 아니다. decision model의 실제 성능과 보정을 판단하려면 [[evaluations/hightouch-2026-llm-judges-for-identity-resolution]] 같은 별도 평가 자료를 참고해야 한다.

글의 결론은 decision model의 의의를 두 문장으로 정리한다. 분류가 새로워서가 아니라 결정과 확률을 소프트웨어의 일급 출력으로 만든다는 점이 중요하다. 전통적 분류기는 이미 확률을 내고 zero-shot 분류기는 이미 런타임 범주를 허용하지만, decision model은 이 아이디어들을 여러 질문 primitive, 생성 없는 채점, 신뢰할 만하고 보정된 결정을 위한 특화 학습 가능성과 함께 타입이 정해진 인터페이스로 묶는다.

## 한계

| 한계 | 내용 |
|---|---|
| 정량 평가 부재 | decision model과 LLM, zero-shot 분류기의 정확도, 지연, 보정을 비교한 결과가 없다 |
| 수식 표기 오류 | softmax 수식의 분자에만 온도 `T`가 있다 |
| 예시 수치 혼용 | confidence 예시가 0.80과 0.99를 섞어 쓴다 |
| Score confidence 정의 누락 | 0.558이라는 값만 제시하고 산식은 없다. Choice 식을 적용하면 0.580이 된다 |
| 묶음 요청 차이 미설명 | 같은 질문이 단독과 묶음 요청에서 다른 확률을 내는 이유를 설명하지 않는다 |
| 학습 도구 미완 | TRL 지원은 작성 시점에 PR 단계라 예제가 손실 함수를 직접 재정의한다 |
| 생태계 초기 | 글 스스로 decision model을 젊고 빠르게 움직이는 분야로 규정한다 |

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| decision model | 상태와 질문, 허용된 답을 받아 타입이 정해진 결정과 확률을 반환하는 모델. 텍스트를 생성하지 않는다 |
| System One model | TypeSafe AI가 Jev에 붙인 원래 이름. Hugging Face는 decision model로 부른다 |
| Choice | 여러 선택지 위의 확률 분포와 argmax 선택을 내는 primitive |
| Score | 순서 척도 분포의 기댓값을 내는 primitive |
| Noul | 예/아니오 질문의 참일 확률을 내는 primitive. 이름은 Bernoulli에서 왔다 |
| confidence | 최고 확률을 선택지 수로 정규화한 값. 균등 분포면 0, 한 선택지 집중이면 1 |
| `/v1/systemone` | transformers와 llama.cpp가 공통으로 제공하는 decision 요청 엔드포인트 |

## 관련 페이지

- [[llms/typesafe-ai-2026-introduction]]: Jev와 세 primitive의 원 출처. 이 글이 표준화한 인터페이스의 원형
- [[llms/hada-2026-jev-judgment-probability-model]]: Jev 발표 요약과 커뮤니티 토론
- [[llms/nandhakishorm-laya]]: 같은 인터페이스를 공개 가중치로 구현한 non-autoregressive decision model
- [[evaluations/hightouch-2026-llm-judges-for-identity-resolution]]: decision model(Jev, GPT-6 Luna)을 실제 평가 과제에 적용해 정확도와 보정을 비교한 사례
