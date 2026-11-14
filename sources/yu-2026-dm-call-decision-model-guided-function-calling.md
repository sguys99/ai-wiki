---
title: "DM-Call: Decision-Model-Guided Function Calling with Cumulative Verification Feedback"
type: paper
year: 2026
category: agents
raw_path: raw/papers/yu-2026-dm-call-decision-model-guided-function-calling.pdf
raw_filename: "yu-2026-dm-call-decision-model-guided-function-calling.pdf"
source_collection: external
authors: "Minhyeong Yu, Wonduk Seo, Seunghyun Lee"
arxiv_id: "2611.10977"
url: "https://arxiv.org/abs/2611.10977"
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
  - id: tab01
    label: Table 1
    kind: table
    file: assets/yu-2026-dm-call-decision-model-guided-function-calling/tab01.png
    raw: raw/papers/yu-2026-dm-call-decision-model-guided-function-calling-figures/tab01.png
    caption: "네 generator에서 function calling 방법별 BFCL, API-Bank 정확도와 추론 비용(USD) 비교"
    page: 3
    bbox_norm: [0.1734, 0.169, 0.8266, 0.3295]
    strategy: table-region
    curated: false
  - id: tab02
    label: Table 2
    kind: table
    file: assets/yu-2026-dm-call-decision-model-guided-function-calling/tab02.png
    raw: raw/papers/yu-2026-dm-call-decision-model-guided-function-calling-figures/tab02.png
    caption: "검증 항목과 이력 방식의 ablation (gpt-5-nano, Jev, BFCL)"
    page: 3
    bbox_norm: [0.5097, 0.4185, 0.9222, 0.4982]
    strategy: table-region
    curated: false
  - id: tab03
    label: Table 3
    kind: table
    file: assets/yu-2026-dm-call-decision-model-guided-function-calling/tab03.png
    raw: raw/papers/yu-2026-dm-call-decision-model-guided-function-calling-figures/tab03.png
    caption: "Numeric, Text, Hybrid feedback 표현의 BFCL 정확도 비교"
    page: 3
    bbox_norm: [0.5108, 0.6022, 0.9209, 0.7019]
    strategy: table-region
    curated: false
  - id: tab04
    label: Table 4
    kind: table
    file: assets/yu-2026-dm-call-decision-model-guided-function-calling/tab04.png
    raw: raw/papers/yu-2026-dm-call-decision-model-guided-function-calling-figures/tab04.png
    caption: "DM-Call의 repair trajectory 사례 네 가지 (함수 교정, 인자 교정, no call 전환, 여러 번의 repair)"
    page: 4
    bbox_norm: [0.5094, 0.169, 0.9219, 0.3811]
    strategy: table-region
    curated: false
---

## 한 줄 요약 (One-line Summary)

DM-Call은 LLM이 제안한 function call 후보를 로컬 schema check와 별도의 decision model로 검증하고, 거부된 후보와 그 검증 신호를 누적해 확률과 언어 레이블을 함께 담은 Hybrid feedback으로 generator에 되돌려 다시 고치게 하는 프레임워크다. BFCL에서 네 generator 모두 가장 높은 정확도를 냈고, gpt-5-nano에서는 Direct 대비 10.5%p 올랐다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 제목 | DM-Call: Decision-Model-Guided Function Calling with Cumulative Verification Feedback |
| 저자 | Minhyeong Yu (Enhans), Wonduk Seo (University College London), Seunghyun Lee (Enhans, 교신저자). 앞의 두 저자는 공동 1저자 |
| 공개 | arXiv:2611.10977v1 [cs.IR], 2026년 11월 7일. ACM 형식 4쪽 short paper |
| 코드 | github.com/gogoymh/decision-model-guided-function-calling (MIT, 저장소 요약은 `sources/gogoymh-decision-model-guided-function-calling.md`) |
| 키워드 | function calling, decision model, evaluation, in-context learning |

## 2. 주요 기여 (Key Contributions)

function calling은 LLM이 자연어 요청을 구조화된 함수 호출로 바꿔 외부 도구와 API를 쓰게 하는 인터페이스다. 논문은 문법적으로 유효한 호출도 함수 선택이 틀리거나 인자가 요청과 어긋나 의미상 틀릴 수 있다는 점에서 출발한다.

1. **decision-model-guided function calling 프레임워크**: schema 검증과, 함수 선택 및 인자 정확성을 따로 묻는 decision model 검증을 결합한다.
2. **누적 feedback 메커니즘**: 거부된 호출과 그 검증 신호를 버리지 않고 이력으로 보존해 반복 수정에 쓴다.
3. **Hybrid 검증 feedback 표현**: 숫자 확률과 언어 정확성 레이블을 함께 generator에 전달한다.

논문이 지적하는 기존 접근의 한계는 세 가지다.

- 문법 제약과 schema 검증만으로는 함수 선택과 인자가 사용자 의도와 맞는지 판정할 수 없다.
- 일반적인 self-refinement와 멀티에이전트 방식은 추론 비용이 늘지만, 함수 선택 오류와 인자 생성 오류를 명시적으로 구분하지 않는다.
- 최신 feedback 하나에만 의존하는 수정 전략은 이전 시도의 검증 신호를 놓친다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 과제 정의

사용자 요청 x와 schema가 붙은 함수 집합 F가 주어지면 시스템은 다음 action 하나를 반환한다. 반환값은 함수 f ∈ F와 인자 a로 된 호출 c = (f, a)이거나 호출 없음(c = ∅)이다. 요청에는 이전 대화 턴이 포함될 수 있다. 정답은 벤치마크 reference와 일치하는 경우, 즉 기대한 함수와 허용 가능한 인자 값이거나, 호출이 기대되지 않을 때 호출 없음이다.

틀리는 방식은 세 가지로 정의한다.

| 오류 유형 | 내용 |
|---|---|
| 호출 여부 오류 | 호출이 필요 없는데 호출하거나, 필요한데 호출하지 않는다 |
| 함수 선택 오류 | 다른 함수를 고른다 |
| 인자 오류 | 인자가 틀리거나 빠진다 |

schema가 유효한 틀린 호출도 의도하지 않은 외부 action을 일으킬 수 있으므로, DM-Call은 도구 실행 feedback 없이 실행 전에 후보를 검증하고 수정한다.

### 3.2 decision model 검증

DM-Call은 후보를 제안하는 LLM generator G와 후보를 검증하는 decision model D를 분리한다. 반복 t에서 generator는 요청, 함수 schema, 거부된 후보와 feedback의 이력 H_t를 조건으로 후보 c_t를 만든다. decision model은 c_t에 대해 예/아니오 질문 두 개를 던지고 각각 "예"일 확률 p_f, p_a ∈ [0, 1]을 반환한다.

- c_t = G(H_t, x, F), p_f = D_f(x, F, c_t), p_a = D_a(x, F, c_t) (Eq. 1)
- **함수 질문 D_f**: 선택된 함수가 요청과 맞는지, 또는 repair 중 제안된 no call 후보라면 호출하지 않는 것이 적절한지 판정한다.
- **인자 질문 D_a**: 필요한 값이 있는지, 요청이 그 값을 뒷받침하는지, 올바른 파라미터에 배정됐는지 판정한다.
- no call 후보는 인자 검증을 건너뛰고 p_a = ⊥(null)로 둔다. 인자가 빠졌더라도 파싱 가능한 호출은 두 판정을 모두 받는다.
- 예외로, 최초 후보 c_0가 파싱 가능한 no call이면 검증과 repair 없이 그대로 반환하고 unverified로 표시한다. 파싱할 수 없는 출력은 no call로 취급하지 않는다.

### 3.3 수락 규칙과 누적 repair

후보는 schema check와, 해당하는 모든 decision model 질문을 통과할 때만 수락된다.

- schema check S(c_t)는 후보가 읽을 수 있고, F 안의 함수를 지명하고, 모든 필수 인자를 선언된 타입으로 채웠을 때 참이다.
- 묻지 않은 질문(no call의 인자 질문, 읽을 수 없는 후보의 모든 질문)은 점수가 ⊥이다.
- 판정 V(p)는 p ≠ ⊥이고 p ≥ 0.5일 때만 참이다.
- 수락 조건 A_t (Eq. 2): no call이면 S(c_t) ∧ V(p_f), 그 밖에는 S(c_t) ∧ V(p_f) ∧ V(p_a).
- schema check에 실패한 읽을 수 있는 후보도 D가 판정하므로, feedback에는 schema 오류와 decision model 판정이 함께 담긴다.

후보가 거부되고 repair 횟수가 남아 있으면(t < r) generator에 수정 후보 c_{t+1} = G(H_{t+1}, x, F)를 요청한다. 이력 H_t는 단계 t 이전에 거부된 후보를 오래된 순서로 나열하고 각각 feedback d_i를 붙인다 (Eq. 3).

- H_t = [(c_0, d_0), ..., (c_{t-1}, d_{t-1})]
- d_i = (Φ(p_f), Φ(p_a), V(p_f), V(p_a), S(c_i))
- Φ는 검증 점수를 generator에 전달하는 feedback 표현이고, 나머지 항목은 이진 판정과 오류 메시지를 포함한 schema 검증 결과다.
- generator는 이 기록을 "실행되지 않음"으로 명시해 원래 요청과 함께 받는다. 반면 decision model은 현재 후보만 요청과 함수 schema에 비추어 평가한다.
- 첫 번째로 수락된 후보를 반환하고, repair budget 안에 통과한 후보가 없으면 최초 후보 c_0로 되돌아간다.

### 3.4 Hybrid feedback

기본 표현인 Hybrid는 각 확률에 언어 레이블을 짝지운다 (Eq. 4).

- Φ(p) = (p, L_k(p)), Φ(⊥) = (⊥, ⊥), k(p) = min(⌊5p⌋ + 1, 5)
- 레이블 L은 very likely incorrect, likely incorrect, uncertain, likely correct, very likely correct 다섯 개다. 폭 0.2의 확률 구간에 p가 커지는 순서로 대응하고, p = 1은 마지막 구간에 넣는다.
- 표현은 generator에 주는 feedback에만 영향을 준다. 수락 판정은 계속 숫자 확률과 V로 한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 실험 설정

| 항목 | 내용 |
|---|---|
| BFCL | single-turn Python 3,035 사례. 호출이 기대되지 않는 irrelevance 사례 포함. 공식 AST 지표로 채점. 호출 여부만 보는 live-relevance 16 사례는 제외 |
| API-Bank | first-call 테스트 156 사례, 고정된 53개 API 카탈로그. API를 실행하지 않고 함수명과 타입 정규화한 인자의 exact match로 채점. no call 부정 사례 없음 |
| generator | gpt-5-nano, gpt-5.4-mini, claude-sonnet-5.5, gemma-4 31B instruction-tuned. 지원되는 곳은 reasoning effort를 none으로 두고 thinking mode를 켜지 않음 |
| decision model | 호스팅형 Jev(jev-1.13.0), open-weight 27B PPLX Decider v1.1 |
| DM-Call 설정 | 함수와 인자 분리 검증, 임계값 0.5, repair 최대 3회(r* = 3) |
| 보고 | 세 번 실행 평균 정확도(%), 총 추론 비용(USD) |

baseline은 두 범주 네 가지다. Self-Refine, PF-FC, DM-Call은 같은 Direct 최초 예측에서 시작하고, MAD-FC는 텍스트로 표현된 tool call도 인식한다.

| 범주 | 방법 | 설명 |
|---|---|---|
| Direct Generation | Direct | 최초 예측을 그대로 반환 |
| Direct Generation | Self-Refine | 자기 생성 비평으로 최대 3라운드 수정 |
| Multi-Agent | MAD-FC | 에이전트 3개가 1라운드 토론 후 다수결 |
| Multi-Agent | PF-FC | LLM reviewer가 최대 3라운드 수정 (Reinforced Agent) |

### 4.2 주요 결과 (Table 1)

BFCL 정확도(%), r* = 3, 세 번 실행 평균 (표준편차 0.00~2.89).

| generator | Direct | Self-Refine | MAD-FC | PF-FC | DM-Call (Jev) | DM-Call (PPLX) |
|---|---:|---:|---:|---:|---:|---:|
| gpt-5-nano | 64.12 | 69.45 | 63.53 | 74.54 | 74.63 | 74.24 |
| gpt-5.4-mini | 81.59 | 81.27 | 81.10 | 81.79 | 82.54 | 82.20 |
| claude-sonnet-5.5 | 88.25 | 88.43 | 85.22 | 86.45 | 88.56 | 88.46 |
| gemma-4-31b-it | 86.67 | 86.69 | 84.91 | 84.85 | 86.91 | 86.88 |

API-Bank 정확도(%).

| generator | Direct | Self-Refine | MAD-FC | PF-FC | DM-Call (Jev) | DM-Call (PPLX) |
|---|---:|---:|---:|---:|---:|---:|
| gpt-5-nano | 61.32 | 58.55 | 66.03 | 70.09 | 64.32 | 64.53 |
| gpt-5.4-mini | 80.13 | 79.91 | 80.98 | 76.71 | 80.13 | 80.13 |
| claude-sonnet-5.5 | 86.97 | 87.39 | 81.62 | 83.12 | 87.39 | 87.39 |
| gemma-4-31b-it | 81.41 | 81.41 | 82.48 | 77.56 | 81.62 | 81.41 |

총 추론 비용(USD). gemma-4-31b-it와 PPLX는 로컬 추론이라 가격을 매기지 않았다.

| generator | Direct | Self-Refine | MAD-FC | PF-FC | DM-Call (Jev) |
|---|---:|---:|---:|---:|---:|
| gpt-5-nano | 0.167 | 0.762 | 1.493 | 5.903 | 0.525 |
| gpt-5.4-mini | 2.146 | 9.591 | 16.501 | 6.750 | 2.783 |
| claude-sonnet-5.5 | 12.598 | 56.184 | 95.244 | 18.686 | 13.988 |

- DM-Call은 BFCL에서 네 generator 모두 가장 높은 정확도를 냈고, gpt-5-nano에서 Direct 대비 10.5%p 올랐다.
- 기존 refinement와 멀티에이전트 baseline은 개선이 일관되지 않았고 추론 비용이 더 컸다.
- API-Bank에서는 개선 폭이 작았다. DM-Call은 경쟁력 있는 결과를 냈지만 일부 generator에서는 baseline이 더 높았다.
- 논문은 DM-Call이 검증에 실패한 후보만 선택적으로 수정하므로, 특히 약한 generator에서 정확도와 비용의 균형이 좋다고 결론짓는다.

### 4.3 검증 항목과 이력의 ablation (Table 2)

gpt-5-nano, Jev, BFCL, r = 3, 세 번 실행 평균 ± 표준편차.

| 방법 | Call (%) | Func. (%) | Args. (%) |
|---|---:|---:|---:|
| Direct | 64.11 ± 0.31 | 75.11 ± 0.29 | 81.27 ± 0.14 |
| DM-Call-Function (함수 질문만) | 73.12 ± 0.46 | 83.84 ± 0.52 | 81.78 ± 0.07 |
| DM-Call-Argument (인자 질문만) | 73.61 ± 0.33 | 83.73 ± 0.52 | 82.64 ± 0.38 |
| DM-Call-Latest (최근 거부만 보존) | 73.05 ± 0.24 | 83.61 ± 0.22 | 82.05 ± 0.16 |
| DM-Call (기본) | 74.32 ± 0.22 | 84.80 ± 0.26 | 82.18 ± 0.13 |

- 모든 변형이 Direct보다 8.9~10.2%p 높았다.
- 전체 DM-Call이 call 정확도가 가장 높고 표준편차도 작았다. 인자 정확도는 DM-Call-Argument가 가장 높았다.
- 최근 feedback만 쓰면 call 정확도가 1.3%p 떨어져, 이전 검증 feedback을 보존하는 효과를 보여준다.
- 원문 표는 두 번째와 세 번째 변형을 모두 "(iii)"으로 표기했다. 본문은 (ii) DM-Call-Argument로 부른다.

### 4.4 feedback 표현 비교 (Table 3)

BFCL 정확도(%), 세 번 실행 평균 (표준편차 0.02~0.54).

| generator | Jev Numeric | Jev Text | Jev Hybrid | PPLX Numeric | PPLX Text | PPLX Hybrid |
|---|---:|---:|---:|---:|---:|---:|
| gpt-5-nano | 74.20 | 74.14 | 74.63 | 73.95 | 73.68 | 74.24 |
| gpt-5.4-mini | 82.45 | 82.47 | 82.54 | 82.22 | 82.26 | 82.20 |
| claude-sonnet-5.5 | 88.53 | 88.57 | 88.56 | 88.45 | 88.46 | 88.46 |
| gemma-4-31b-it | 86.93 | 86.91 | 86.91 | 86.89 | 86.91 | 86.88 |
| 평균 | 83.03 | 83.02 | 83.16 | 82.88 | 82.83 | 82.95 |

- Hybrid는 repair가 잦은 gpt-5-nano(Jev 24%, PPLX 21%)에서 개선이 가장 컸다. Numeric보다 0.3~0.4%p, Text보다 0.5~0.6%p 높았다.
- repair 비율이 1~6%인 나머지 generator에서는 세 표현의 차이가 0.1%p 이내였다.
- Hybrid는 두 decision model 모두에서 평균이 가장 높아 기본 표현으로 채택했다.

### 4.5 repair budget (Figure 2)

- r을 3에서 10으로 늘리면 정확도는 1.8%p만 오르지만 p95 latency는 9.7초에서 24.3초로 늘었다.
- r = 3에서 DM-Call의 평균 latency는 4.0초로, Direct 2.6초, PF-FC 6.1초, MAD-FC 10.5초와 비교된다.
- r*는 elbow 방식 기준 r* = argmax_{r∈R}(정규화 정확도 − 정규화 요청 수)로 고른다. R = {1, 2, 3, 5, 7, 10}이고, 정규화는 (X_r − X_1)/(X_10 − X_1)이다. 결과는 r* = 3이다.
- r = 5로 늘리면 정확도가 0.9%p 더 오르지만 요청 수가 16% 늘고 p95 latency가 42% 길어진다.

### 4.6 사례 연구 (Table 4)

Jev, r* = 3에서의 repair trajectory 네 개.

| 사례 | generator, 벤치마크 | 경과 |
|---|---|---|
| (a) 함수 교정 | claude-sonnet-5.5, BFCL "how to cook sikhae" | t=0 HNA_WQA_search (p_f 0.37, p_a 0.94) 거부 → t=1 cookbook_search_recipe(keyword="sikhae") (0.93, 0.95) 수락 |
| (b) 인자 값 교정 | gpt-5.4-mini, BFCL 평점 4 초과 이탈리아 식당 | t=0 rating=5 (0.94, 0.19) 거부 → t=1 rating=4 (0.96, 0.57) 수락 |
| (c) no call 전환 | gpt-5-nano, BFCL 중국어 "머스크는 누구인가", 세금 계산기만 제공 | t=0 calculate_tax (0.03, 0.12) 거부 → t=1 텍스트 답변 no call (0.97, 인자 검증 생략) 수락 |
| (d) 여러 번의 repair | gpt-5-nano, API-Bank 계정 삭제 대화 | CheckToken(token="") 두 번, DeleteAccount(token="") 거부 → t=3 GetUserToken(username="foo", password="bar") (0.84, 0.96) 수락 |

## 5. 한계와 향후 과제 (Limitations and Future Work)

논문 본문은 별도 한계 절을 두지 않는다. 결과 서술에서 읽히는 제약은 다음과 같다.

- API-Bank에서는 개선이 제한적이고 일부 generator에서 PF-FC나 MAD-FC가 더 높다.
- 강한 generator(claude-sonnet-5.5, gemma-4-31b-it)에서는 Direct 대비 개선이 0.2~0.3%p 수준이다. repair 비율 자체가 1~6%로 낮다.
- repair budget을 키우면 정확도는 완만히 오르지만 꼬리 latency가 빠르게 늘어난다.
- 평가는 BFCL single-turn과 API-Bank first-call에 한정되며 도구 실행 결과를 쓰지 않는다.

저장소 README는 여기에 더해 decision model 오판 가능성, held-out split 없이 정한 임계값과 r*, BFCL의 annotation 오류, end-to-end 실행 성공 미측정을 한계로 명시한다 (`sources/gogoymh-decision-model-guided-function-calling.md`).

## 6. 관련 연구 (Related Work)

| 연구 | 관계 |
|---|---|
| Self-Refine (Madaan 2023) | 모델 자신의 feedback으로 출력을 수정. baseline |
| Multi-agent debate (Du 2023) | 여러 에이전트의 토론. MAD-FC baseline의 기반 |
| Reinforced Agent (Ta 2026) | 별도 reviewer의 추론 시점 feedback. PF-FC baseline |
| ToolVerifier (Mekala 2024) | 도구 선택과 파라미터 생성에 self-verification 적용. 가장 가까운 선행 연구 |
| BFCL (Patil 2025) | 평가 벤치마크 |
| API-Bank (Li 2023) | 평가 벤치마크 |
| Toolformer (Schick 2023) | LLM tool use의 기반 연구 |
| Jev (TypeSafe AI) | 기본 decision model. [[llms/typesafe-ai-2026-introduction]], [[llms/huggingface-2026-decision-models-in-hugging-face]] |

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| DM-Call | Decision-Model-Guided Function Calling. generator와 decision model을 분리해 후보 호출을 검증하고 누적 feedback으로 수정하는 프레임워크 |
| decision model | 상태와 예/아니오 질문을 받아 "예"일 확률을 반환하는 모델. 설명 텍스트를 생성하지 않는다 |
| generator | 후보 function call을 제안하는 LLM |
| 함수 질문 / 인자 질문 (D_f / D_a) | 함수 선택이 맞는지, 인자가 맞는지를 각각 묻는 decision model 질문 |
| schema check (S) | 후보가 읽을 수 있고, 존재하는 함수를 지명하고, 필수 인자를 선언 타입으로 채웠는지 보는 로컬 검사 |
| 누적 이력 (H_t) | 거부된 후보와 feedback을 오래된 순서로 쌓은 기록 |
| Hybrid feedback | 확률과 다섯 단계 언어 레이블을 함께 전달하는 feedback 표현 |
| repair budget (r) | 최초 후보 이후 허용하는 수정 횟수. 기본값 r* = 3 |

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 1 | 기존 방식과 DM-Call의 흐름 비교 | caption-region | ★ wiki 권장 (architecture) |
| fig02 | 4 | repair budget에 따른 정확도와 latency | caption-region | ★ wiki 권장 (result) |
| tab01 | 3 | 방법별 BFCL, API-Bank 정확도와 비용 | table-region | 마크다운 표로 대체 |
| tab02 | 3 | 검증 항목과 이력 ablation | table-region | 마크다운 표로 대체 |
| tab03 | 3 | feedback 표현 비교 | table-region | 마크다운 표로 대체 |
| tab04 | 4 | repair trajectory 사례 네 가지 | table-region | 마크다운 표로 대체 |
