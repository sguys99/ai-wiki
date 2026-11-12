---
title: "Decision Models in Hugging Face"
type: article
year: 2026
category: llms
raw_path: raw/articles/huggingface-2026-decision-models-in-hugging-face.md
raw_filename: "huggingface-2026-decision-models-in-hugging-face.md"
source_collection: external
author: "Aritra Roy Gosthipaty, Lysandre Debut, Pedro Cuenca, Tom Aarsen"
url: "https://huggingface.co/blog/decision"
publisher: "Hugging Face Blog"
publication_date: "2026-11-10"
tags: [decision-model, system-one-model, transformers, llama-cpp, structured-output, zero-shot-classification, confidence, primitive, jev, hugging-face]
figures:
  - id: fig01
    file: assets/huggingface-2026-decision-models-in-hugging-face/fig01.png
    raw: raw/articles/huggingface-2026-decision-models-in-hugging-face-figures/fig01.png
    caption: "decision model의 입력과 출력. 상태(고객 메시지)와 질문, 선택지 세 개가 모델에 들어가고 선택지별 확률(80%, 15%, 5%)이 나온다"
    strategy: fetched
    curated: true
  - id: fig02
    file: assets/huggingface-2026-decision-models-in-hugging-face/page-full.png
    raw: raw/articles/huggingface-2026-decision-models-in-hugging-face-figures/page-full.png
    caption: "블로그 원문 상단 6,000px 전체 페이지 스크린샷"
    strategy: screenshot
    curated: false
  - id: fig03
    file: assets/huggingface-2026-decision-models-in-hugging-face/crop01.png
    raw: raw/articles/huggingface-2026-decision-models-in-hugging-face-figures/crop01.png
    caption: "페이지 렌더에서 잘라 낸 decision model 입출력 도식 크롭본"
    strategy: crop
    curated: false
---

## 한 줄 요약 (One-line Summary)

Hugging Face가 decision model을 소개하고, transformers의 `DecisionPipeline`과 `/v1/systemone` 엔드포인트, llama.cpp 서빙, Hub의 `decision-model` 태그, `Trainer` 기반 fine-tuning까지 생태계 전반에 공통 인터페이스를 도입했다고 알리는 글이다. decision model은 텍스트를 생성하지 않고 상태와 질문, 허용된 답을 받아 타입이 정해진 결정과 확률을 반환한다.

## 1. 자료 정보 (Document Information)

- 제목: Decision Models in Hugging Face
- 저자: Aritra Roy Gosthipaty, Lysandre Debut, Pedro Cuenca, Tom Aarsen (페이지 상단 저자 표시 기준)
- 매체: Hugging Face Blog, 2026년 11월 10일 게시
- URL: https://huggingface.co/blog/decision
- 성격: 개념 해설과 라이브러리 기능 발표를 겸한 기술 블로그 글이다. 코드 예시가 대부분을 차지한다.
- 수집본: `scripts/fetch_article.py`(jina tier)로 본문 전문 27,472자를 수집했다. 원문 이미지는 도식 1장이다.
- 예시 모델: `autotrust/GEV-26B-Decide`(transformers 예시), `ggml-org/Kev-4B-GGUF`(llama.cpp 예시), `autotrust/JEV-9B`(fine-tuning 예시). 비교용 LLM으로 `ggml-org/gemma-4-e4b-it-GGUF:Q4_0`, zero-shot 분류기로 `facebook/bart-large-mnli`를 쓴다.

## 2. 주요 기여 (Key Contributions)

- decision model의 기본 인터페이스를 `State + Questions + Allowed Answers → Decisions + Probabilities`로 정리하고, 기존 분류 모델과 zero-shot 분류와의 차이를 표로 구분했다.
- 세 primitive(Choice, Score, Noul)와 `confidence` 값의 수식을 풀이했다.
- 명칭을 TypeSafe AI가 쓴 "System One model" 대신 "decision model"로 부르기로 했다고 밝혔다. 특정 인지 이론이 아니라 모델의 계산상 역할을 기술하는 이름이라는 이유다.
- Hugging Face의 목표를 "구현이 아니라 인터페이스의 통일"로 제시하고, 이를 위해 네 가지를 도입했다.
  - transformers: `DecisionPipeline`, `AutoModelForDecision`, `DecisionConfig`, `/v1/systemone` 서빙 엔드포인트
  - llama.cpp: 같은 `/v1/systemone` API로 GGUF decision model 서빙
  - Hub: `decision-model` 태그
  - 학습: `Trainer` 기반 fine-tuning 예시, TRL 지원 PR(huggingface/trl#8040, 작성 시점 미병합), Unsloth 레시피 안내

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 문제 설정

고객 지원 시스템이 "I was charged twice for my subscription. I need a refund today."라는 메시지를 받으면 담당 팀, 긴급도, 환불 요청 여부를 정해야 한다. LLM에 JSON으로 답하라고 요청하면 `team_to_handle: Billing`, `urgency: High`, `request_refund: true` 같은 결과를 얻을 수 있다. 글은 텍스트를 생성하지 않고 선택지 위의 확률 분포를 직접 반환하는 방식이 decision model의 핵심이라고 설명한다.

### 3.2 LLM만으로 처리할 때의 문제

| 문제 | 내용 |
|---|---|
| 스키마 미준수 | 명시적 지시가 있어도 잘못된 JSON, 예상하지 않은 키, 허용 범위 밖의 답을 낼 수 있다 |
| constrained decoding 비용 | Outlines, XGrammar가 단계마다 생성 가능한 토큰을 제한해 구조를 강제하지만 추가 연산이 든다 |
| 불필요한 생성 | 미리 정한 답 중 하나를 고르면 되는 문제에서 autoregressive 디코딩은 불필요한 작업이다 |

### 3.3 분류 모델, zero-shot 분류와의 비교

- 전통적 분류: classification head가 클래스마다 logit 하나를 내고 softmax로 확률을 만든다. 출력 클래스가 head에 고정되어 있어 Legal 같은 네 번째 부서를 추가하려면 head 수정, 데이터 수집, 재학습이 필요하다.
- zero-shot 분류: 후보 레이블을 추론 시점에 넘긴다. `facebook/bart-large-mnli`에 "My payment was deducted twice."를 넣으면 billing 0.847, sales 0.096, technical support 0.057이 나오고, legal을 추가하면 billing 0.819, sales 0.093, technical support 0.055, legal 0.033이 나온다. 흔한 구현은 NLI 모델로 각 레이블을 가설로 바꿔 entailment 정도를 잰다.
- decision model: 같은 상태에 대해 이름이 붙은 여러 질문을 서로 다른 답 타입으로 물을 수 있고, 인터페이스가 결정 위의 확률 분포를 중심으로 설계된다.

| 속성 | 분류 | zero-shot 분류 | decision model |
|---|---|---|---|
| 선택지 위의 확률 | 있음 | 있음 | 있음 |
| 추론 시점 레이블 정의 | 불가 | 가능 | 가능 |
| 타입이 다른 복수 질문 | 불가 | 불가 | 가능 |
| 순서 척도와 예/아니오 결정 | 과제별 구현 | 변형하면 가능 | 기본 primitive |

글은 decision model의 장점이 런타임 레이블이나 확률적 분류를 새로 발명한 데 있지 않고, 이 기능들을 일관된 인터페이스로 묶고 결정에 특화된 구조와 학습 절차를 붙일 여지를 만든 데 있다고 정리한다.

### 3.4 요청 구성

요청은 state와 questions 두 요소로 이루어진다. state는 모델이 평가할 정보로, 문자열, JSON 객체, 또는 omni-modal 모델이면 다른 모달리티일 수 있다. 예시 JSON은 `customer_message`, `subscription: "pro"`, `previous_tickets: 2`를 담는다. questions는 state에 대해 알고 싶은 것을 기술하며 각 질문은 `type`, `instructions`, `criteria`를 가진다.

### 3.5 세 primitive

| primitive | 의미 | 출력 | 예시 결과 |
|---|---|---|---|
| Choice | 여러 답 중 하나 선택 | `choice`, `confidence`, `probabilities` | billing 0.9983, technical 0.0010, sales 0.0007, confidence 0.9974 |
| Score | 순서 척도 평가 | `score`(기댓값), `legend`, `confidence`, `probabilities` | low 0.0149, medium 0.2648, high 0.7203, score 1.705, confidence 0.558 |
| Noul | 예/아니오 확률 | `noul`(참일 확률) | refund 0.9947 |

- Choice: 선택지마다 logit `z_i`를 내고 softmax `p_i = exp(z_i/T) / Σ exp(z_j)`로 확률을 만든 뒤 argmax를 고른다. 원문 수식은 분자에만 온도 `T`가 있다. 나머지 확률도 모델이 대안 사이에 믿음을 어떻게 나눴는지 알려 주므로 유용하다.
- Score: 수준 0(low), 1(medium), 2(high)의 분포에서 수준 인덱스의 기댓값 `E[X] = Σ i p_i`를 보고한다. 0(0.01) + 1(0.26) + 2(0.72) = 1.7이다. 1.7은 medium과 high 사이의 가상 수준을 고른 것이 아니라 분포의 기댓값이다.
- Noul: 이름은 Bernoulli에서 왔다. `Y ~ Bernoulli(p)`의 `p`를 반환하며 `noul: 0.92`면 예 0.92, 아니오 0.08이다. 모델이 이진 답을 무작위로 샘플링하지 않고 확률 파라미터 자체를 돌려주므로, 어떻게 행동할지는 애플리케이션이 정한다.

### 3.6 confidence

Choice와 Score는 `confidence`를 함께 반환한다. K개 선택지의 Choice에서 `C = (p_max - 1/K) / (1 - 1/K)`다.

- 균등 분포(`p_max = 1/K`)면 0이다.
- 한 선택지에 전부 몰리면(`p_max = 1`) 1이다.
- 최고 확률이 균등 분포 대비 클수록 높다.

원문 예시는 p_max 0.99, K=3에서 `C = (3 × 0.99 - 1) / 2 = 0.98`을 계산한다. 원문 문장은 "Billing had probability 0.80"이라고 적은 뒤 0.99로 계산하는데, 0.80은 도식(fig01)의 수치이고 계산은 코드 출력에 가깝다. Score 예시의 confidence 0.558에 대해서는 Score용 산식을 따로 제시하지 않는다.

### 3.7 Hugging Face 생태계 통합

글은 decision model마다 내부 구조가 다르다고 설명한다(스키마 전체를 함께 채점하는 head, LLM backbone 위의 별도 readout, edge 크기와 멀티모달 변형 등). 모델마다 인터페이스가 다르면 주변 도구가 모델별로 대응해야 하므로, 공통 인터페이스를 정하고 구현은 자유롭게 두는 것이 목표다.

1. transformers 서빙: `pipeline("decision", model=...)`이 `DecisionPipeline`을 만든다. 예시 출력은 `JevForDecision`, `bfloat16`, `cuda`, 입력 모달리티 text다. `DecisionConfig.from_pretrained`, `AutoModelForDecision.from_pretrained`로 설정과 모델을 불러온다. `pip install "transformers[serving]"` 후 `transformers serve`로 서버를 띄우면 `http://localhost:8000/v1/systemone`에 세 질문(department, urgency, refund)을 한 요청으로 보낼 수 있다. 응답 예시는 billing 0.9983, urgency score 1.753(confidence 0.629), refund 0.9953이며 `usage`는 input 148 토큰, output 0 토큰이다.
2. autoregressive 모델 호환: 같은 API가 호환되는 autoregressive 언어 모델에서도 동작한다. transformers가 결정 프롬프트를 만들고 답 레이블의 logit을 batched forward pass 한 번으로 평가해 softmax를 적용하며, 응답 텍스트는 생성하지 않는다. 따라서 새 모델을 학습하지 않고도 인터페이스를 시험할 수 있다.
3. llama.cpp 서빙: `llama serve -hf ggml-org/Kev-4B-GGUF`로 띄우면 기본 포트 9931에서 같은 `/v1/systemone` API를 제공한다. 서버가 모델을 정하므로 `model` 필드는 생략할 수 있다.
4. Hub: `decision-model` 태그로 호환 모델을 찾는다. decision model은 backbone을 공유할 필요가 없어 ModernBERT 같은 인코더 기반 모델과 큰 생성형 언어 모델 기반 모델이 함께 존재한다.
5. 학습: `autotrust/JEV-9B`를 지원 요청 라우팅(refund, shipping, technical)에 fine-tuning하는 예제를 싣는다.
   - 예제 6개는 각각 state와 questions로 된 결정 요청과 정답의 쌍이다.
   - `model.decision_config.prepare_inputs(request, tokenizer)`가 추론 때와 같은 방식으로 요청을 모델 입력으로 바꾼다. 입력에는 `marks`, `num_options`, `question_type_ids`(choice는 1), `labels`를 붙인다.
   - 모델이 선택지마다 logit 하나를 내므로 choice 질문은 선택지 위의 일반 cross-entropy 손실로 학습한다. `Trainer`의 `compute_loss`를 재정의한 `DecisionTrainer`를 쓴다.
   - 설정은 `max_steps=30`, 배치 크기 1, learning rate 1e-3, `remove_unused_columns=False`다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

글은 성능 벤치마크를 제시하지 않는다. 수치는 모두 예시 요청의 출력값이다.

| 예시 | 모델 | 결과 |
|---|---|---|
| Choice (department) | GEV-26B-Decide | billing 0.9983, confidence 0.9974 |
| Score (urgency, 단독 요청) | GEV-26B-Decide | score 1.705, confidence 0.558, 분포 0.015, 0.265, 0.720 |
| Score (urgency, 서버 3문항 요청) | GEV-26B-Decide | score 1.753, confidence 0.629, 분포 0.014, 0.219, 0.767 |
| Noul (refund) | GEV-26B-Decide | 0.9947 (단독), 0.9953 (서버) |
| zero-shot 3레이블 | bart-large-mnli | billing 0.847 |
| zero-shot 4레이블 | bart-large-mnli | billing 0.819, legal 0.033 |
| 서버 토큰 사용 | GEV-26B-Decide | input 148, output 0 |

같은 urgency 질문도 단독 요청과 세 질문 묶음 요청에서 확률이 조금 다르다(high 0.720 대 0.767). 글은 이 차이를 설명하지 않는다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- 정량 평가 부재: decision model과 LLM, zero-shot 분류기의 정확도, 속도, 보정을 비교한 결과가 없다.
- 수식과 예시의 불일치: softmax 수식의 온도 위치, confidence 예시의 0.80과 0.99 혼용, Score confidence 산식 미제시.
- 학습 도구 미완: TRL 지원은 작성 시점에 PR 단계다. 그래서 예제는 `compute_loss`를 직접 재정의한다.
- 생태계 초기 단계: 글 스스로 decision model을 "젊고 빠르게 움직이는 분야"로 규정한다.
- 결론에서 글은 decision model의 의미를 "분류가 새로워서가 아니라 결정과 확률을 소프트웨어의 일급 출력으로 만든다는 점"에 두고, 보정된 결정을 위한 특화 학습의 가능성을 언급한다.

## 6. 관련 연구 (Related Work)

- TypeSafe AI의 Jev 소개 글: System One model 명칭의 출처
- Outlines, XGrammar: constrained decoding 라이브러리
- Hugging Face zero-shot classification 과제, `facebook/bart-large-mnli`
- llama.cpp 측 발표 글(ggml-org, decision models in llama.cpp)
- Unsloth의 decision model 학습 레시피: Qwen 같은 생성형 LLM을 LoRA와 decision 채점 head로 fine-tuning
- ModernBERT 기반 decision model
- 저장소 내 관련 자료: [[llms/typesafe-ai-2026-introduction]], [[llms/hada-2026-jev-judgment-probability-model]], [[llms/nandhakishorm-laya]], [[evaluations/hightouch-2026-llm-judges-for-identity-resolution]]

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| decision model | 상태와 질문, 허용된 답을 받아 타입이 정해진 결정과 확률을 반환하는 모델. 텍스트를 생성하지 않는다 |
| System One model | TypeSafe AI가 Jev에 붙인 이름. 빠르고 직관적인 사고(System 1)에서 따왔다 |
| state | 모델이 평가할 입력 정보. 문자열, JSON, 다른 모달리티 |
| Choice | 여러 선택지 위의 확률 분포를 내는 primitive |
| Score | 순서 척도 분포의 기댓값을 내는 primitive |
| Noul | 예/아니오 질문의 참일 확률을 내는 primitive. Bernoulli에서 온 이름 |
| confidence | 최고 확률을 선택지 수로 정규화한 값. 균등 분포 0, 한 선택지 집중 1 |
| `/v1/systemone` | transformers와 llama.cpp가 공통으로 제공하는 decision 요청 엔드포인트 |
| `DecisionPipeline` | transformers의 decision 전용 pipeline 클래스 |

## 8. 그림 후보 (Figure Candidates)

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | decision model의 입력(상태, 질문, 선택지)과 선택지별 확률 출력 | fetched | ★ wiki 권장 (concept) |
| fig02 | 원문 전체 페이지 스크린샷 | screenshot | 아카이브용 |
| fig03 | fig01 도식의 페이지 렌더 크롭 | crop | fig01과 중복 |
