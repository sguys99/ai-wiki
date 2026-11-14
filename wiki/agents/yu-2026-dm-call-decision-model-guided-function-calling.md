---
title: "DM-Call: Decision-Model-Guided Function Calling with Cumulative Verification Feedback"
type: paper
year: 2026
category: agents
source: yu-2026-dm-call-decision-model-guided-function-calling.md
sources:
  - yu-2026-dm-call-decision-model-guided-function-calling.md
  - gogoymh-decision-model-guided-function-calling.md
raw_path: raw/papers/yu-2026-dm-call-decision-model-guided-function-calling.pdf
raw_filename: "yu-2026-dm-call-decision-model-guided-function-calling.pdf"
source_collection: external
authors: "Minhyeong Yu, Wonduk Seo, Seunghyun Lee"
arxiv_id: "2611.10977"
url: "https://arxiv.org/abs/2611.10977"
repo_url: "https://github.com/gogoymh/decision-model-guided-function-calling"
license: "MIT"
tags: [function-calling, tool-use, decision-model, verification, self-refinement, jev, bfcl]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/yu-2026-dm-call-decision-model-guided-function-calling/fig01.png
    raw: raw/papers/yu-2026-dm-call-decision-model-guided-function-calling-figures/fig01.png
    caption: "기존 function calling 방식과 DM-Call의 비교. (a) 기존 방식은 schema check나 self-review만 거쳐 도시를 잘못 넣은 호출(London)을 그대로 반환한다. (b) DM-Call은 decision model이 function selection(0.94)과 call arguments(0.19)를 따로 채점하고, 거부된 후보를 누적 이력에 쌓아 Hybrid feedback과 함께 LLM에 되돌려 올바른 도시(Paris)로 고친다"
    page: 1
    bbox_norm: [0.5097, 0.2225, 0.9219, 0.541]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/yu-2026-dm-call-decision-model-guided-function-calling/fig02.png
    raw: raw/papers/yu-2026-dm-call-decision-model-guided-function-calling-figures/fig02.png
    caption: "repair budget r에 따른 DM-Call의 변화 (gpt-5-nano, BFCL, Jev). (a) call 정확도, (b) 사례당 요청 시간 합의 평균과 p95, (c) baseline과의 시간 비교. 점선은 선택된 r* = 3"
    page: 4
    bbox_norm: [0.0781, 0.0981, 0.4903, 0.1994]
    strategy: caption-region
    curated: true
---

## 요약

DM-Call(Decision-Model-Guided Function Calling)은 LLM이 제안한 함수 호출을 실행하기 전에 검증하고, 틀린 호출을 고치게 하는 프레임워크다. Enhans와 University College London 연구진이 2026년 11월 arXiv에 4쪽 short paper로 공개했고(arXiv:2611.10977), 같은 저자들이 MIT 라이선스의 공식 구현 저장소를 함께 공개했다. 이 페이지는 논문과 저장소를 한 곳에 정리한다.

function calling은 LLM이 자연어 요청을 함수 이름과 구조화된 인자로 바꿔 외부 도구와 API를 호출하게 하는 인터페이스다. DM-Call은 여기에 세 장치를 결합한다. 로컬 schema check, 함수 선택과 인자 정확성을 따로 묻는 decision model 검증, 그리고 거부된 후보를 누적해 확률과 언어 레이블로 되돌려 주는 Hybrid feedback이다.

결과는 BFCL 벤치마크에서 네 generator 모두 가장 높은 정확도였다. 가장 작은 gpt-5-nano에서는 Direct 생성 대비 10.5%p 올랐고, 추론 비용은 Self-Refine이나 멀티에이전트 baseline보다 낮았다. 반면 API-Bank와 강한 generator에서는 개선 폭이 작았다.

## 배경

### 문법적으로 맞지만 의미가 틀린 호출

function calling의 오류는 형식 오류만이 아니다. 논문이 출발점으로 삼는 문제는 JSON schema를 통과하는 호출도 의미상 틀릴 수 있다는 점이다. 저장소 README는 이를 세 사례로 설명한다.

- 모델이 엉뚱한 함수를 고른다.
- 아무도 주지 않은 값을 인자에 채운다.
- 해당하는 도구가 없는데도 도구를 호출한다.

세 경우 모두 JSON schema 검사를 통과한다. Figure 1의 예시가 이 상황을 보여 준다. "파리 날씨"를 물었는데 모델이 `weather(city="London")`을 내면, 함수 이름과 인자 타입이 모두 맞으므로 schema check는 이 호출을 통과시킨다.

이런 호출은 실행되는 순간 의도하지 않은 외부 action을 일으킬 수 있다. 따라서 DM-Call은 도구를 실제로 실행해 결과를 보는 대신, 실행 전에 후보를 검증하고 고치는 방식을 택한다.

### 기존 접근의 한계

선행 연구는 검증과 반복 수정으로 신뢰도를 높이려 했다.

| 접근 | 방식 |
|---|---|
| Self-Refine | 모델이 스스로 생성한 feedback으로 출력을 수정한다 |
| Multi-agent debate | 여러 에이전트가 토론하고 결과를 합친다 |
| Reinforced Agent | 별도 reviewer가 추론 시점에 feedback을 준다 |
| ToolVerifier | 도구 선택과 파라미터 생성에 self-verification을 적용한다. DM-Call과 가장 가깝다 |

논문은 이 계열에 남은 한계를 세 가지로 정리한다.

1. 문법 제약과 schema 검증만으로는 함수 선택과 인자가 사용자 의도와 맞는지 판정할 수 없다.
2. 일반적인 self-refinement와 멀티에이전트 방식은 추론 비용을 늘리지만, 함수 선택 오류와 인자 생성 오류를 구분하지 않는다.
3. 가장 최근의 feedback만 쓰는 수정 전략은 이전 시도에서 얻은 검증 신호를 버린다.

DM-Call의 세 구성 요소는 이 세 한계에 하나씩 대응한다. 분리 검증은 1번과 2번에, 누적 이력은 3번에 대응하고, Hybrid feedback은 누적된 신호를 generator가 쓰기 좋은 형태로 바꾼다.

## 핵심 개념

decision model은 상태와 예/아니오 질문을 받아 "예"일 확률을 반환하는 모델을 말한다. 설명이나 추론 텍스트를 생성하지 않고 확률 하나만 돌려준다는 점이 LLM-as-a-Judge와 다르다. 저장소 FAQ도 이 차이를 강조한다. DM-Call의 기본 decision model은 TypeSafe AI의 Jev(`jev-1.13.0`)이고, 대안으로 open-weight 27B 모델인 PPLX Decider v1.1을 쓴다.

generator는 후보 function call을 제안하는 LLM이다. DM-Call은 제안하는 모델과 검증하는 모델을 분리한다. 따라서 generator가 자기 출력을 스스로 평가하는 self-refinement와 구조가 다르다.

schema check는 후보가 읽을 수 있는 형식인지, 존재하는 함수를 지명하는지, 필수 인자를 선언된 타입으로 모두 채웠는지 보는 로컬 검사다. 모델 호출 없이 실행되며, 형식 오류를 잡는 첫 관문 역할을 한다.

repair는 거부된 후보를 generator가 다시 고쳐 새 후보를 내는 한 번의 수정 단계다. repair budget r은 최초 후보 이후 허용하는 수정 횟수이고, 논문의 기본값은 r* = 3이다. 즉 최초 후보까지 포함해 최대 네 후보를 본다.

ablation은 구성 요소를 하나씩 빼거나 바꿔 각 요소의 기여를 재는 실험이다. 논문은 검증 질문 종류, 이력 보존 방식, feedback 표현, repair budget을 각각 바꿔 ablation을 수행한다.

![[assets/yu-2026-dm-call-decision-model-guided-function-calling/fig01.png]]
*Figure 1: 기존 방식과 DM-Call의 흐름 비교. 기존 방식은 도시가 틀린 호출을 그대로 반환하고, DM-Call은 인자 점수 0.19로 거부한 뒤 누적 feedback으로 올바른 도시로 고친다 (Yu 2026, p.1)*

## 방법

### 과제 정의

DM-Call이 푸는 과제는 다음 action 하나를 고르는 일이다. 사용자 요청 x와 schema가 붙은 함수 집합 F가 주어지면, 시스템은 함수 f ∈ F와 인자 a로 된 호출 c = (f, a)를 반환하거나 호출 없음(c = ∅)을 반환한다. 요청에는 이전 대화 턴이 포함될 수 있다.

정답 기준은 벤치마크 reference와의 일치다. 기대한 함수와 허용 가능한 인자 값을 냈거나, 호출이 기대되지 않을 때 호출하지 않았으면 맞다. 틀리는 방식은 세 가지로 나뉜다.

| 오류 유형 | 내용 | 예시 |
|---|---|---|
| 호출 여부 오류 | 필요 없는데 호출하거나, 필요한데 호출하지 않는다 | 세금 계산기만 있는데 인물 질문에 `calculate_tax`를 호출 |
| 함수 선택 오류 | 다른 함수를 고른다 | 요리법 질문에 웹 검색 함수를 호출 |
| 인자 오류 | 인자가 틀리거나 빠진다 | "평점 4 초과"를 `rating=5`로 기입 |

예시 열은 모두 논문의 사례 연구(Table 4)에서 가져왔다. DM-Call은 도구 실행 결과를 feedback으로 쓰지 않는다. 검증과 수정 내내 어떤 도구도 실행하지 않는다.

### decision model의 두 질문

decision model은 후보 하나에 예/아니오 질문 두 개를 던진다. 반복 t에서 generator가 후보 c_t를 만들면, decision model은 함수 질문과 인자 질문에 대해 각각 "예"일 확률 p_f와 p_a를 반환한다.

- c_t = G(H_t, x, F)
- p_f = D_f(x, F, c_t)
- p_a = D_a(x, F, c_t)

여기서 H_t는 거부된 후보와 feedback의 이력이다. 두 질문이 보는 내용은 다르다.

| 질문 | 판정 내용 | 생략 조건 |
|---|---|---|
| 함수 질문 D_f | 고른 함수가 요청과 맞는가. repair 중 나온 no call이면 호출하지 않는 것이 적절한가 | 읽을 수 없는 후보 |
| 인자 질문 D_a | 필요한 값이 있는가, 요청이 그 값을 뒷받침하는가, 올바른 파라미터에 배정됐는가 | no call 후보, 읽을 수 없는 후보 |

생략된 질문의 점수는 null 값 ⊥로 둔다. 인자가 빠졌더라도 파싱 가능한 호출은 두 판정을 모두 받는다.

예외 규칙이 두 가지 있다. 첫째, 최초 후보 c_0가 파싱 가능한 no call이면 검증과 repair 없이 그대로 반환하고 unverified로 표시한다. 둘째, 파싱할 수 없는 출력은 no call로 취급하지 않는다. 즉 모델이 형식을 깨뜨린 출력을 "호출 안 함"으로 잘못 해석하지 않는다.

decision model은 대화, 함수 schema, 현재 후보만 본다. reference 답은 보내지 않으며, 이전에 거부된 후보와 그 점수도 보지 않는다.

### 수락 규칙

후보는 schema check와, 해당하는 decision model 질문을 모두 통과할 때만 수락된다. 판정 V(p)는 p가 ⊥가 아니고 0.5 이상일 때만 참이다. 수락 조건은 후보 종류에 따라 갈린다.

| 후보 종류 | 수락 조건 |
|---|---|
| no call | S(c_t) ∧ V(p_f) |
| 함수 호출 | S(c_t) ∧ V(p_f) ∧ V(p_a) |

schema check S(c_t)는 후보가 읽을 수 있고, F 안의 함수를 지명하고, 모든 필수 인자를 선언된 타입으로 채웠을 때 참이다. 중요한 설계는 schema check에 실패한 후보도 읽을 수 있으면 decision model이 판정한다는 점이다. 따라서 거부된 후보의 feedback에는 schema 오류 메시지와 decision model 점수가 함께 담긴다.

### 누적 repair

거부된 후보는 버리지 않고 이력에 쌓는다. 후보가 거부되고 repair 횟수가 남아 있으면(t < r), DM-Call은 generator에 수정 후보 c_{t+1}을 요청한다. 이때 이력 H_t는 단계 t 이전에 거부된 후보를 오래된 순서로 나열하고 각각 feedback d_i를 붙인다.

- H_t = [(c_0, d_0), ..., (c_{t-1}, d_{t-1})]
- d_i = (Φ(p_f), Φ(p_a), V(p_f), V(p_a), S(c_i))

feedback d_i의 다섯 항목은 다음과 같다.

| 항목 | 내용 |
|---|---|
| Φ(p_f), Φ(p_a) | 두 확률을 feedback 표현 Φ로 변환한 값 |
| V(p_f), V(p_a) | 두 질문의 통과 여부 |
| S(c_i) | schema 검증 결과와 오류 메시지 |

generator는 이 기록을 "실행되지 않음"이라는 표시와 함께 받는다. 저장소 README에 따르면 이력은 바뀌지 않은 원래 요청 앞에 놓인다. 결과적으로 generator와 decision model이 보는 정보는 비대칭이다. generator는 과거의 실패 전체를 보고, decision model은 현재 후보만 본다.

루프의 종료 규칙은 단순하다. 첫 번째로 수락된 후보를 반환하고, repair budget 안에 수락된 후보가 없으면 최초 후보 c_0로 되돌아간다. 마지막 repair 결과가 아니라 c_0를 반환하는 이유는 논문에 명시되지 않았지만, 저장소의 `on_exhaustion` 옵션으로 마지막 repair 결과를 반환하도록 바꿀 수 있다.

### Hybrid feedback

Hybrid feedback은 확률 숫자에 언어 레이블을 짝지어 generator에 전달하는 표현이다. 기본 표현 Φ는 다음과 같다.

- Φ(p) = (p, L_k(p)), Φ(⊥) = (⊥, ⊥)
- k(p) = min(⌊5p⌋ + 1, 5)

레이블 다섯 개는 폭 0.2의 확률 구간에 대응한다. p = 1은 마지막 구간에 넣는다.

| 구간 | 레이블 |
|---|---|
| 0.0 이상 0.2 미만 | very likely incorrect |
| 0.2 이상 0.4 미만 | likely incorrect |
| 0.4 이상 0.6 미만 | uncertain |
| 0.6 이상 0.8 미만 | likely correct |
| 0.8 이상 1.0 이하 | very likely correct |

표현 방식은 generator가 받는 feedback에만 영향을 준다. 수락 판정은 언제나 숫자 확률과 임계값 0.5로 한다. 그래서 0.57로 수락된 후보도 레이블은 uncertain이 된다. 사례 (b)의 수정 후보가 여기에 해당한다.

### 전체 흐름

DM-Call의 한 요청 처리는 다섯 단계로 정리된다. 저장소 README의 단계 이름을 따른다.

1. **Propose**: generator가 요청, 함수 schema, 이력으로 후보를 제안한다.
2. **Verify**: schema check를 실행하고 decision model이 함수 질문과 (호출이면) 인자 질문에 답한다.
3. **Accept**: schema check가 참이고 물은 질문이 모두 0.5 이상이면 수락한다.
4. **Repair**: 거부되면 후보와 feedback을 이력에 넣고 1단계를 다시 수행한다.
5. **Return**: 첫 수락 후보를 반환하고, 없으면 c_0를 반환한다.

후보마다 generator 요청 1회와 decision model 요청 1회가 든다. 따라서 r = 3이면 최악의 경우 각각 4회씩 요청한다. 반면 최초 후보가 바로 수락되면 decision model 요청 1회만 추가된다. 강한 generator일수록 repair가 드물어 추가 비용이 작은 이유가 여기에 있다.

## 실험 설정

### 벤치마크와 지표

평가는 두 벤치마크에서 수행했다.

| 벤치마크 | 구성 | 채점 |
|---|---|---|
| BFCL | single-turn Python 3,035 사례. 호출이 기대되지 않는 irrelevance 사례 포함. 호출 여부만 보는 live-relevance 16 사례는 제외 | 공식 AST 지표 |
| API-Bank (first call) | 테스트 156 사례, 고정된 53개 API 카탈로그. no call 부정 사례 없음 | 함수명과 타입 정규화한 인자의 exact match. API는 실행하지 않음 |

API-Bank에 no call 사례가 없다는 점은 결과 해석에 중요하다. 호출 여부 판단 능력이 BFCL에서만 측정되기 때문이다.

### 모델과 baseline

generator는 성격이 다른 네 모델을 썼다.

| generator | 비고 |
|---|---|
| gpt-5-nano | API |
| gpt-5.4-mini | API |
| claude-sonnet-5.5 | API |
| gemma-4-31b-it | open-weight, FP8로 vLLM에서 로컬 구동 |

지원되는 모델은 reasoning effort를 none으로 두고 thinking mode를 켜지 않았다. decision model은 호스팅형 Jev(`jev-1.13.0`)와 open-weight PPLX Decider v1.1 27B 두 개다. 저장소에 따르면 PPLX Decider는 특정 revision을 BF16으로 체크포인트 자체 추론 서버에서 실행했다.

baseline은 두 범주 네 가지다.

| 범주 | 방법 | 설정 |
|---|---|---|
| Direct Generation | Direct | 최초 예측을 그대로 반환 |
| Direct Generation | Self-Refine | 자기 생성 비평으로 최대 3라운드 수정 |
| Multi-Agent | MAD-FC | 에이전트 3개가 1라운드 토론 후 다수결 |
| Multi-Agent | PF-FC | LLM reviewer가 최대 3라운드 수정 |

MAD-FC를 제외한 모든 방법은 같은 Direct 최초 예측에서 시작한다. MAD-FC는 텍스트로 표현된 tool call도 인식한다. DM-Call은 함수와 인자 분리 검증, 임계값 0.5, repair 최대 3회로 설정했다. 모든 수치는 세 번 실행한 평균이다.

## 결과

### 주요 결과

BFCL에서 DM-Call은 네 generator 모두 가장 높은 정확도를 냈다. Table 1의 BFCL 정확도(%)는 다음과 같다 (r* = 3, 표준편차 0.00~2.89).

| generator | Direct | Self-Refine | MAD-FC | PF-FC | DM-Call (Jev) | DM-Call (PPLX) |
|---|---:|---:|---:|---:|---:|---:|
| gpt-5-nano | 64.12 | 69.45 | 63.53 | 74.54 | **74.63** | 74.24 |
| gpt-5.4-mini | 81.59 | 81.27 | 81.10 | 81.79 | **82.54** | 82.20 |
| claude-sonnet-5.5 | 88.25 | 88.43 | 85.22 | 86.45 | **88.56** | 88.46 |
| gemma-4-31b-it | 86.67 | 86.69 | 84.91 | 84.85 | **86.91** | 86.88 |

개선 폭은 generator 성능에 반비례한다. Direct 대비 gpt-5-nano는 10.5%p, gpt-5.4-mini는 0.9%p, claude-sonnet-5.5는 0.3%p, gemma-4-31b-it는 0.2%p 올랐다. PPLX Decider를 쓴 결과는 Jev와 0.4%p 이내였다. 즉 open-weight decision model로 바꿔도 성능이 거의 유지된다.

baseline은 일관되지 않았다. PF-FC는 gpt-5-nano에서 74.54%로 DM-Call에 근접했지만, claude-sonnet-5.5와 gemma-4-31b-it에서는 Direct보다 낮았다. MAD-FC는 네 generator 모두에서 Direct보다 낮았다. 논문은 기존 refinement와 멀티에이전트 baseline이 개선이 일관되지 않고 추론 비용도 더 크다고 정리한다.

### API-Bank 결과

API-Bank에서는 개선이 제한적이었다.

| generator | Direct | Self-Refine | MAD-FC | PF-FC | DM-Call (Jev) | DM-Call (PPLX) |
|---|---:|---:|---:|---:|---:|---:|
| gpt-5-nano | 61.32 | 58.55 | 66.03 | **70.09** | 64.32 | 64.53 |
| gpt-5.4-mini | 80.13 | 79.91 | **80.98** | 76.71 | 80.13 | 80.13 |
| claude-sonnet-5.5 | 86.97 | **87.39** | 81.62 | 83.12 | **87.39** | **87.39** |
| gemma-4-31b-it | 81.41 | 81.41 | **82.48** | 77.56 | 81.62 | 81.41 |

DM-Call이 1위 또는 동률인 경우는 claude-sonnet-5.5뿐이었다. gpt-5-nano에서는 PF-FC가, gpt-5.4-mini와 gemma-4-31b-it에서는 MAD-FC가 가장 높았다.

저장소 README는 동률이 많은 이유를 공유된 최초 답에서 찾는다. gpt-5-nano를 제외하면 decision model이 156 사례 중 실행당 0~6 사례만 거부해, DM-Call이 대부분 최초 답을 그대로 반환했다. 즉 API-Bank에서는 decision model이 최초 답의 오류를 많이 잡아내지 못했다.

### 비용

DM-Call은 baseline보다 비용이 낮았다. 아래는 BFCL 3,035 사례 1회 실행의 정가 기준 추론 비용(USD)이다. 로컬 추론(gemma-4-31b-it, PPLX Decider)은 가격을 매기지 않았다.

| generator | Direct | Self-Refine | MAD-FC | PF-FC | DM-Call (Jev) |
|---|---:|---:|---:|---:|---:|
| gpt-5-nano | 0.167 | 0.762 | 1.493 | 5.903 | 0.525 |
| gpt-5.4-mini | 2.146 | 9.591 | 16.501 | 6.750 | 2.783 |
| claude-sonnet-5.5 | 12.598 | 56.184 | 95.244 | 18.686 | 13.988 |

저장소 README가 계산한 배율은 다음과 같다.

| 비교 | 배율 |
|---|---|
| DM-Call (Jev) / Direct | gpt-5-nano 3.1배, gpt-5.4-mini 1.3배, claude-sonnet-5.5 1.1배 |
| Self-Refine / DM-Call | 1.5~4.0배 |
| PF-FC / DM-Call | 1.3~11배 |
| MAD-FC / DM-Call | 3~7배 |

gpt-5-nano에서 PF-FC는 DM-Call과 정확도가 비슷하지만 비용은 약 11배다. 논문은 DM-Call이 검증에 실패한 후보만 선택적으로 수정하기 때문에, 특히 약한 generator에서 정확도와 비용의 균형이 좋다고 결론짓는다.

### 검증 항목과 이력의 ablation

분리 검증과 누적 이력은 모두 기여한다. Table 2는 gpt-5-nano, Jev, BFCL, r = 3에서 세 변형을 비교한다. Func.는 함수 선택 정확도, Args.는 함수가 맞았을 때의 인자 정확도다.

| 방법 | 설명 | Call (%) | Func. (%) | Args. (%) |
|---|---|---:|---:|---:|
| Direct | 최초 예측 | 64.11 ± 0.31 | 75.11 ± 0.29 | 81.27 ± 0.14 |
| DM-Call-Function | 함수 질문만으로 수락 | 73.12 ± 0.46 | 83.84 ± 0.52 | 81.78 ± 0.07 |
| DM-Call-Argument | 인자 질문만으로 수락 | 73.61 ± 0.33 | 83.73 ± 0.52 | **82.64 ± 0.38** |
| DM-Call-Latest | 최근 거부만 보존 | 73.05 ± 0.24 | 83.61 ± 0.22 | 82.05 ± 0.16 |
| DM-Call | 기본 | **74.32 ± 0.22** | **84.80 ± 0.26** | 82.18 ± 0.13 |

모든 변형이 Direct보다 8.9~10.2%p 높았다. 즉 검증 질문 하나만 써도 개선 효과의 대부분을 얻는다. 두 질문을 모두 요구하는 기본 DM-Call은 call 정확도가 가장 높고 표준편차도 작았다. 인자 정확도는 DM-Call-Argument가 가장 높았다.

누적 이력의 효과는 DM-Call-Latest와의 차이로 드러난다. 최근 거부 후보만 보여 주면 call 정확도가 1.3%p 떨어진다. 사례 (d)처럼 같은 실수를 반복하는 generator에는 과거 실패 전체를 보여 주는 편이 낫다는 근거다.

이 표의 Direct(64.11%)는 Table 1(64.12%)과 조금 다르다. 저장소에 따르면 Table 2 실행은 보관된 trajectory를 재생했기 때문이다. trajectory는 한 요청에서 나온 후보, 판정, feedback의 실행 기록 전체를 말한다. 원문 표는 두 번째와 세 번째 변형을 모두 "(iii)"으로 표기했지만, 본문은 DM-Call-Argument를 (ii)로 부른다.

### feedback 표현 비교

Hybrid는 두 decision model 모두에서 평균이 가장 높았다. Table 3은 세 표현을 비교한다. Numeric은 확률만, Text는 언어 레이블만, Hybrid는 둘 다 전달한다.

| generator | Jev Numeric | Jev Text | Jev Hybrid | PPLX Numeric | PPLX Text | PPLX Hybrid |
|---|---:|---:|---:|---:|---:|---:|
| gpt-5-nano | 74.20 | 74.14 | 74.63 | 73.95 | 73.68 | 74.24 |
| gpt-5.4-mini | 82.45 | 82.47 | 82.54 | 82.22 | 82.26 | 82.20 |
| claude-sonnet-5.5 | 88.53 | 88.57 | 88.56 | 88.45 | 88.46 | 88.46 |
| gemma-4-31b-it | 86.93 | 86.91 | 86.91 | 86.89 | 86.91 | 86.88 |
| 평균 | 83.03 | 83.02 | **83.16** | 82.88 | 82.83 | **82.95** |

차이는 repair 빈도에 따라 갈린다. gpt-5-nano는 Jev로 24%, PPLX로 21%의 사례에서 repair가 일어났고, 여기서 Hybrid는 Numeric보다 0.3~0.4%p, Text보다 0.5~0.6%p 높았다. 반면 repair 비율이 1~6%인 나머지 generator에서는 세 표현의 차이가 0.1%p 이내였다. repair가 드물면 feedback 표현이 결과에 영향을 줄 기회 자체가 적다.

### repair budget

repair budget은 3에서 정확도와 latency가 균형을 이룬다. Figure 2는 gpt-5-nano, BFCL, Jev에서 세 번 실행을 10회 repair까지 이어 r마다 자른 결과다.

![[assets/yu-2026-dm-call-decision-model-guided-function-calling/fig02.png]]
*Figure 2: repair budget r에 따른 call 정확도, 요청 시간 합의 평균과 p95, 방법별 시간 비교. 점선은 선택된 r* = 3이다 (Yu 2026, p.4)*

| r | 1 | 2 | 3 (기본) | 5 | 7 | 10 |
|---|---:|---:|---:|---:|---:|---:|
| call 정확도 (%) | 71.84 | 73.61 | 74.63 | 75.57 | 75.99 | 76.38 |
| 요청 시간 합 평균 (초) | 3.43 | 3.75 | 4.03 | 4.53 | 5.00 | 5.68 |
| 요청 시간 합 p95 (초) | 6.06 | 7.77 | 9.69 | 13.76 | 17.88 | 24.32 |

r을 3에서 10으로 늘리면 정확도는 1.8%p만 오르지만, p95 latency는 9.7초에서 24.3초로 2.5배 늘었다. 같은 구간에서 평균 시간은 4.03초에서 5.68초로 완만하게 늘어, 비용 증가가 꼬리 latency에 집중된다.

r*는 elbow 방식으로 골랐다. 기준식은 r* = argmax_{r∈R}(정규화 정확도 − 정규화 사례당 요청 수)이고, R = {1, 2, 3, 5, 7, 10}, 정규화는 (X_r − X_1)/(X_10 − X_1)이다. 결과는 r* = 3이다. r = 5로 늘리면 정확도가 0.9%p 더 오르지만 요청 수가 16% 늘고 p95 latency가 42% 길어진다.

r = 3에서 방법별 평균 시간은 다음과 같다.

| 방법 | 사례당 평균 시간 (초) |
|---|---:|
| Direct | 2.6 |
| DM-Call | 4.0 |
| PF-FC | 6.1 |
| MAD-FC | 10.5 |

DM-Call은 Direct보다 1.4초 느리지만 PF-FC와 MAD-FC보다 빠르다. 저장소 README에 따르면 r을 1에서 10까지 바꿔도 PF-FC는 5.58~6.90초, DM-Call은 3.43~5.68초 범위에 있다.

### 사례 연구

Table 4의 네 사례는 decision model 점수가 수정 방향을 어떻게 안내하는지 보여 준다. 모두 Jev, r* = 3 설정이다.

| 사례 | 설정 | 거부된 후보 (p_f, p_a) | 수락된 후보 (p_f, p_a) |
|---|---|---|---|
| (a) 함수 교정 | claude-sonnet-5.5, BFCL "how to cook sikhae" | `HNA_WQA_search(keyword="how to make sikhae Korean sweet rice drink recipe")` (0.37, 0.94) | `cookbook_search_recipe(keyword="sikhae")` (0.93, 0.95) |
| (b) 인자 값 교정 | gpt-5.4-mini, BFCL "평점 4 초과, 신용카드 결제 가능한 뉴욕 이탈리아 식당" | `restaurant_search(..., rating=5)` (0.94, 0.19) | `restaurant_search(..., rating=4)` (0.96, 0.57) |
| (c) no call 전환 | gpt-5-nano, BFCL 중국어 "머스크는 누구인가", 세금 계산기만 제공 | `calculate_tax(filing_status="single", income=0)` (0.03, 0.12) | 텍스트로 답하는 no call (0.97, 인자 질문 생략) |
| (d) 여러 번의 repair | gpt-5-nano, API-Bank 계정 삭제 대화 | `CheckToken(token="")` 두 번 (0.28, 0.07), (0.33, 0.06), `DeleteAccount(token="")` (0.43, 0.06) | `GetUserToken(username="foo", password="bar")` (0.84, 0.96) |

사례마다 점수가 오류 위치를 가리킨다.

- (a)에서는 함수 질문만 실패했다. 모델은 keyword를 유지한 채 웹 검색 도구에서 요리법 도구로 바꿨다.
- (b)에서는 인자 질문만 실패했다. 모델은 최소 평점을 요청대로 4로 낮췄다. 수정 후보는 0.57로 통과했고 Hybrid 레이블은 uncertain이다.
- (c)에서는 두 점수가 모두 0에 가까웠다. 모델은 도구를 부르지 않고 텍스트로 답하는 쪽으로 바꿨다.
- (d)에서 모델은 빈 token으로 `CheckToken`을 두 번 부르고, 그 token으로 계정 삭제까지 시도했다. 세 번째 repair에서야 사용자 자격 증명으로 token을 요청하는 올바른 호출에 도달했다.

(d)는 누적 이력이 필요한 이유를 보여 준다. 같은 후보를 반복하는 동안에도 이전 실패 기록이 남아 있어, 결국 다른 함수로 방향을 바꿀 수 있었다.

## 구현 저장소

### 구성과 설치

공식 저장소는 다섯 언어 구현을 제공한다. Python 구현이 참조 구현이고, 나머지 구현은 공유 conformance suite로 같은 요청을 보내는지 검사한다.

| 언어 | 위치 | 요구 사항 |
|---|---|---|
| Python | `src/dmcall` | Python 3.11+ |
| TypeScript/JavaScript | `typescript/` | Node 18+ |
| Go | `go/` | Go 1.22+ |
| Rust | `rust/` | Rust 1.85+ |
| Java/Kotlin | `java/` | Java 17+ |

패키지는 아직 PyPI, npm, crates.io, Maven Central에 등록되지 않았고 저장소에서 직접 설치한다. Python 라이브러리의 의존성은 `httpx`와 `jsonschema` 두 개뿐이다. 실행하려면 기본 decision model Jev용 `TYPESAFE_API_KEY`와 모델 provider 키를 환경 변수로 설정한다. 저장소는 Pseudo Lab의 No-More-Slops 그룹 활동으로 만들었고 Enhans가 후원했다.

### 기본 사용법

`DMCall` 클라이언트는 generator, 도구, decision model을 묶는다.

```python
import dmcall

def get_weather(city: str, unit: str = "celsius") -> dict:
    """Current weather for a city."""
    return {"city": city, "temp": 12, "unit": unit}

agent = dmcall.DMCall("openai:gpt-5-nano", tools=[get_weather], reasoning_effort="none")
result = agent.run("Do I need a jacket in Seoul tonight?")
```

두 진입점의 차이는 실행 여부다.

| 메서드 | 동작 |
|---|---|
| `run()` | 최종 호출이 수락됐을 때만 도구를 실행하고 결과를 `output`에 담는다 |
| `call()` | 실행만 빼고 모두 수행한다. 수락 여부를 보고 호출자가 실행을 결정한다 |
| `acall`, `arun`, `averify` | 같은 단계를 worker thread에서 실행하는 async 버전 |

도구는 일반 Python 함수를 그대로 쓴다. 타입 힌트에서 파라미터 타입을, Google, NumPy, Sphinx 형식 docstring에서 설명을, 시그니처에서 기본값을 읽는다. OpenAI 형식 schema dict도 받는다. `dmcall.schema_of(fn)`은 전송할 schema를 보여 주고, `dmcall.check_schema(tools, calls)`는 schema check만 따로 실행한다.

### provider와 decision model 선택

generator는 `"openai:gpt-5-nano"` 같은 `provider:model` 문자열로 지정한다. 지원 provider는 OpenAI, Anthropic, Google Gemini, Meta Model API(Muse), xAI Grok, Azure OpenAI, OpenRouter이고, vLLM, Ollama, LM Studio 같은 OpenAI 호환 서버는 `dmcall.OpenAICompatible`로 붙인다. 잘리거나 필터링되거나 거부된 응답은 읽을 수 없는 후보로 처리한다.

decision model은 세 가지 중 고른다.

| 선택지 | 내용 |
|---|---|
| `dmcall.Jev` | TypeSafe의 호스팅 모델. `threshold`가 두 질문에 공통 적용되고 `function_threshold`, `arguments_threshold`로 따로 지정할 수 있다 |
| `dmcall.PPLXDecider` | open-weight Perplexity Decider v1.1 27B를 자체 서버에서 구동한다 |
| 사용자 정의 | `dmcall.DecisionModel`을 상속해 `ask(state, questions)`가 질문별 "예" 확률을 반환하게 구현한다 |

### 기존 에이전트에 붙이는 verify

`dmcall.verify()`는 에이전트 구조를 바꾸지 않고 검증만 추가하는 진입점이다. 이전 tool call과 tool result를 포함한 대화, 제안된 tool call, 도구 목록을 받아 판정을 돌려준다. OpenAI, Anthropic, Google SDK의 메시지와 tool call 객체를 그대로 받는다.

```python
verdict = dmcall.verify(messages, response.choices[0].message.tool_calls, tools)
if verdict:
    execute(response.choices[0].message.tool_calls)
else:
    print(verdict.function_probability, verdict.arguments_probability, verdict.schema_errors)
```

`verdict.feedback`에는 DM-Call이 repair에 쓸 feedback 기록이 담긴다. 따라서 LangChain, OpenAI Agents SDK, 자체 agent loop 어디서든 실행 직전에 이 함수를 삽입하면 DM-Call의 검증 단계만 가져다 쓸 수 있다.

### 옵션과 논문 변형의 대응

생성자 옵션의 기본값은 논문 설정과 같고, 논문의 ablation 변형은 옵션 하나로 재현된다.

| 옵션 | 기본값 | 다른 값 | 대응하는 논문 변형 |
|---|---|---|---|
| `checks` | `"both"` | `"function"`, `"arguments"` | DM-Call-Function, DM-Call-Argument |
| `history` | `"cumulative"` | `"latest"` | DM-Call-Latest |
| `feedback` | `"hybrid"` | `"numeric"`, `"text"` | Table 3의 세 표현 |
| `max_repairs` | 3 | 정수 | repair budget r |
| `threshold` | 0.5 | 실수 | 수락 임계값 |
| `on_exhaustion` | `"first"` | `"last"` | 소진 시 c_0 대신 마지막 repair 반환 |
| `preserve_initial_no_call` | True | False | 최초 no call 예외 규칙 |
| `execute_unverified` | False | True | 수락 없이도 `run()`이 최종 후보 실행 |

`checks`를 하나로 좁혀도 decision model은 논문 실행과 같이 두 질문에 모두 답하고, 두 질문 모두 사용량이 발생한다. 결과 객체는 `accepted`, `repairs`, `exhausted`, `attempts`, `probabilities`, `usage`, `latency_s`, `trace` 등의 필드로 판정 과정 전체를 노출한다.

### 논문 재현성

저장소는 실험 코드 대신 요청 일치를 검사하는 방식으로 재현성을 보장한다. `spec/conformance/paper_parity.json`은 논문 표를 만든 코드에서 기록한 14개 시나리오를 담는다. 다섯 구현 모두 generator 프롬프트, 수정 요청, decision model 요청이 이 기록과 바이트 단위로 같은지 테스트한다. 반면 실험 러너, baseline 구현(Self-Refine, MAD-FC, PF-FC), 원시 실행 기록은 저장소에 포함되지 않는다.

## 한계

논문 본문에는 별도 한계 절이 없고, 저장소 README가 한계를 명시적으로 정리한다.

| 한계 | 내용 |
|---|---|
| 단계당 결정 하나 | 한 번에 호출 하나 또는 no call만 결정한다. 병렬 tool call은 지원하지 않는다. `call()`과 `run()`은 텍스트 메시지만 받으므로 이전 tool result는 텍스트로 넘겨야 한다 |
| decision model 오판 | 수락된 호출이 틀릴 수 있고 맞는 호출이 거부될 수 있다 |
| 비용과 latency | 후보마다 generator와 decision model 요청이 1회씩 든다. repair 3회면 각각 최대 4회다 |
| 근거 범위 | generator 4개, decision model 2개, 주로 영어 요청, BFCL single-turn과 API-Bank first call만 평가했다 |
| 하이퍼파라미터 선택 | 임계값, fallback 규칙, 레이블 구간, r*를 held-out split 없이 평가 벤치마크에서 골랐다 |
| 평가 데이터 | BFCL에는 알려진 annotation 오류가 있다 |
| 측정 범위 | end-to-end 실행 성공은 측정하지 않았다 |

결과에서 읽히는 제약도 있다. 강한 generator에서는 repair 비율이 1~6%에 그쳐 Direct 대비 개선이 0.2~0.3%p 수준이다. API-Bank에서는 decision model이 최초 답을 거의 거부하지 않아 PF-FC나 MAD-FC보다 낮은 경우가 있었다. 따라서 DM-Call의 이점은 실수가 잦은 작은 generator를 낮은 비용으로 보완하는 경우에 가장 분명하다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| DM-Call | generator와 decision model을 분리해 후보 함수 호출을 검증하고 누적 feedback으로 수정하는 프레임워크 |
| decision model | 상태와 예/아니오 질문을 받아 "예"일 확률만 반환하는 모델. 설명 텍스트를 생성하지 않는다 |
| 함수 질문 / 인자 질문 | 함수 선택이 맞는지, 인자가 맞는지를 각각 묻는 decision model 질문 (D_f, D_a) |
| 누적 이력 | 거부된 후보와 feedback을 오래된 순서로 쌓아 generator에 전달하는 기록 (H_t) |
| Hybrid feedback | 확률과 다섯 단계 언어 레이블을 함께 전달하는 feedback 표현 |
| repair budget | 최초 후보 이후 허용하는 수정 횟수. 기본값 r* = 3 |

## 관련 페이지

- [[llms/typesafe-ai-2026-introduction]]: DM-Call의 기본 decision model인 Jev의 공식 소개
- [[llms/huggingface-2026-decision-models-in-hugging-face]]: decision model 인터페이스가 Hugging Face 표준 라이브러리로 들어간 과정
- [[llms/nandhakishorm-laya]]: decision model 인터페이스의 공개 구현
- [[agents/lee-2026-the-agent-loop-a-survey]]: tool call 검증 단계가 놓이는 agent loop의 제어 전략 정리
