---
title: "Introduction - TypeSafe AI"
type: article
year: 2026
category: llms
raw_path: raw/articles/typesafe-ai-2026-introduction.md
raw_filename: "typesafe-ai-2026-introduction.md"
source_collection: external
author: "TypeSafe AI"
url: "https://docs.typesafe.ai/introduction"
publisher: "TypeSafe AI Docs"
tags: [typesafe-ai, jev, system-one-model, structured-output, confidence, primitive, api-design]
figures:
  - id: fig01
    file: assets/typesafe-ai-2026-introduction/page-full.png
    raw: raw/articles/typesafe-ai-2026-introduction-figures/page-full.png
    caption: "TypeSafe AI 공식 문서 도입부 전체 페이지 스크린샷"
    strategy: screenshot
    curated: false
---

## 한 줄 요약 (One-line Summary)

TypeSafe AI 공식 문서의 도입부로, 첫 System One model인 Jev를 "상태와 타입이 정해진 질문을 보내면 코드가 바로 쓸 수 있는 구조화된 답을 돌려주는 모델"로 정의한다. Choice, Score, Noul 세 가지 primitive를 소개하고, 질문을 원자 단위로 쪼갠 뒤 결과를 코드에서 조합하라는 설계 지침을 예시와 함께 제시한다.

## 1. 자료 정보 (Document Information)

| 항목 | 값 |
|---|---|
| 매체 | TypeSafe AI 공식 문서 (docs.typesafe.ai) |
| 페이지 | Introduction |
| 성격 | 제품 문서 도입부 |
| 분량 | 약 3,300자 |

제품 발표와 커뮤니티 반응은 [[llms/hada-2026-jev-judgment-probability-model]]에 별도로 정리되어 있다.

## 2. 주요 기여 (Key Contributions)

### 2.1 문제 정의

LLM은 사람이 읽을 텍스트를 만들도록 설계되었다. 그래서 코드가 소비할 판단을 모델에게 맡기면 불일치가 생긴다. 텍스트 생성 시스템에 구조화된 결정을 억지로 출력하게 한 뒤, 그 결과를 다시 코드가 의존할 수 있는 형태로 파싱해야 한다는 것이다.

### 2.2 Jev의 위치

Jev는 TypeSafe의 대표 모델이자 첫 System One model이다. System One model은 소프트웨어가 곧바로 쓸 수 있는 빠르고 구조화된 결정을 내리도록 만들어졌다. Jev는 타입이 정해진 질문을 상태에 대해 평가하고 구조화된 결과를 그대로 반환한다. 텍스트 생성도 파싱도 없다.

반환값은 코드가 분기하고 정렬하고 라우팅할 수 있는 타입이 정해진 값과 확률 분포다. Choice와 Score는 신뢰도도 함께 반환하므로, 코드가 그 답을 실행에 옮길지 여부와 방식을 신뢰도로 결정할 수 있다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 세 가지 primitive

TypeSafe는 세 가지 AI primitive를 제공한다. 소프트웨어 primitive와 마찬가지로 모듈화되어 있고 조합 가능하며 구조화되어 있고 신뢰할 수 있으며 빠르다고 설명한다. 각각 다른 타입의 질문을 던지고 다른 타입의 답을 돌려준다.

| 질문 타입 | 목적 | 반환값 |
|---|---|---|
| Choice | 목록에서 하나를 고른다 | choice, probabilities, confidence |
| Score | 상태를 rubric으로 채점한다 | score, probabilities, confidence |
| Noul | 이 진술이 참인가 | noul (0에서 1 사이) |

### 3.2 한 번의 호출에서 병렬 평가

세 가지 질문 타입은 한 번의 API 호출 안에서 섞어 쓸 수 있다. 모든 질문은 같은 상태에 대해 한꺼번에 병렬로, 그리고 서로 격리된 채 평가된다.

그 결과 질문을 추가해도 응답 시간이 거의 바뀌지 않는다. 각 질문이 독립적으로 평가되므로 질문을 늘려도 context-rot이 생기지 않는다.

### 3.3 원자적 질문과 코드에서의 조합

System One model은 각 질문이 잘 한정된 하나만 묻는 경우에 가장 잘 동작한다. 문서는 질문 하나를 "충분한 맥락이 주어졌을 때 지식이 풍부한 사람이 몇 초 만에 내릴 수 있는 직관적 판단"으로 비유한다.

묻고 싶은 질문이 확장된 추론을 요구하거나 여러 독립 요인을 저울질해야 한다면 분해하라고 권한다. 각 요인을 별도의 질문으로 묻고 결과를 코드의 로직으로 합치는 방식이다. 이렇게 하면 개별 평가가 신뢰할 만한 수준으로 유지되고, 차원별 가중치를 어떻게 줄지를 전적으로 통제할 수 있다.

예시는 스타트업 피치 평가다.

| 방식 | 구성 |
|---|---|
| 권장하지 않음 | "이 스타트업 피치를 평가하라"는 질문 하나 |
| 권장 | 시장 규모, 기술적 실현 가능성, 차별화를 각각 질문한 뒤 자체 공식으로 점수를 합산 |

분해했을 때의 이점은 유지보수에서 드러난다. 우선순위가 바뀌면 프롬프트를 다시 쓰는 대신 코드의 계수 하나만 바꾸면 된다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

이 페이지는 도입부라서 벤치마크 수치를 싣지 않는다. 정량 비교는 제품 발표 글과 워크플로 평가 사이트가 담당한다.

문서가 제시하는 정성적 주장은 두 가지다. 첫째, 질문을 추가해도 응답 시간이 거의 변하지 않는다. 둘째, 질문이 서로 격리되어 평가되므로 질문 수가 늘어도 context-rot이 발생하지 않는다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- 도입부 문서라서 모델 아키텍처, 학습 방법, 가격, 지연 시간을 다루지 않는다. 해당 내용은 다른 문서 페이지와 발표 글에 있다.
- 확장된 추론이 필요한 질문은 Jev 단독으로 처리하지 않고 분해를 전제한다. 분해 설계의 부담은 사용자 코드가 진다.
- 신뢰도를 어떻게 임계값으로 쓸지는 별도의 Confidence 페이지로 위임한다.
- Noul만 신뢰도를 반환하지 않는다. 0에서 1 사이 값 자체가 확률이기 때문으로 보이나, 이 페이지는 그 이유를 설명하지 않는다.

문서는 이어지는 읽기 순서를 다음과 같이 제시한다.

| 다음 페이지 | 다루는 내용 |
|---|---|
| Quick Start | 바로 시작하는 데 필요한 전부 |
| AI Primer | TypeSafe가 생성된 텍스트 대신 보정된 결정을 위해 모델을 학습시키는 이유 |
| Primitives (Questions) | 질문 정의, Choice와 Score와 Noul 중 선택, 여러 질문 동시 요청 |
| Confidence | TypeSafe가 확실성을 보고하는 방식과 아키텍처 수준의 활용 |
| Patterns | TypeSafe로 시스템을 만드는 공통 패턴 |

## 6. 관련 연구 (Related Work)

- [[llms/hada-2026-jev-judgment-probability-model]]: 같은 제품의 발표 요약과 커뮤니티 토론. 가격, 속도, 평가 설계, 반론을 담는다.
- [[llms/9bow-2026-gpt-5-6-sol-terra-luna]]: 비교 대상으로 등장하는 GPT-5.6 라인업의 한국어 소개.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| System One model | 소프트웨어가 곧바로 쓸 수 있는 빠르고 구조화된 결정을 내리도록 만든 모델 범주 |
| state | 모델이 질문을 평가할 대상으로 함께 보내는 비정형 또는 구조화된 상태 데이터 |
| Choice | 주어진 목록에서 하나를 고르게 하는 질문 타입. choice와 probabilities와 confidence를 반환한다 |
| Score | 상태를 rubric으로 채점하게 하는 질문 타입. score와 probabilities와 confidence를 반환한다 |
| Noul | 진술의 참 여부를 0에서 1 사이 값으로 묻는 질문 타입 |
| context-rot | 컨텍스트가 길어지거나 누적되면서 모델의 판단 품질이 떨어지는 현상 |

## 8. 그림 후보 (Figure Candidates)

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | TypeSafe AI 공식 문서 도입부 전체 페이지 스크린샷 | screenshot | (확인 필요, 도식 아님) |
