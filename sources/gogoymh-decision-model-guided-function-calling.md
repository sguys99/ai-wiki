---
title: "decision-model-guided-function-calling"
type: repo
year: 2026
category: agents
raw_path: raw/repos/gogoymh-decision-model-guided-function-calling.md
raw_filename: "gogoymh-decision-model-guided-function-calling.md"
source_collection: external
org: "gogoymh"
repo: "decision-model-guided-function-calling"
url: "https://github.com/gogoymh/decision-model-guided-function-calling"
license: "MIT"
tags: [function-calling, tool-use, decision-model, verification, jev, sdk]
figures:
  - id: fig01
    label: "DM-Call hero"
    kind: figure
    file: assets/yu-2026-dm-call-decision-model-guided-function-calling/repo-fig01.png
    raw: https://raw.githubusercontent.com/gogoymh/decision-model-guided-function-calling/main/docs/assets/dm-call-hero.png
    caption: "README 대표 이미지. 유리 카드 후보들이 링을 향해 이동하고 거부된 카드는 뒤로 말려 궤적을 남기며 한 장만 통과한다"
    strategy: manual
    curated: false
  - id: fig02
    label: "Figure 1 (paper)"
    kind: figure
    file: assets/yu-2026-dm-call-decision-model-guided-function-calling/repo-fig02.png
    raw: https://raw.githubusercontent.com/gogoymh/decision-model-guided-function-calling/main/docs/assets/dm-call-figure1.png
    caption: "논문 Figure 1과 같은 기존 방식과 DM-Call의 흐름 비교. 논문 크롭(fig01)으로 대체한다"
    strategy: manual
    curated: false
  - id: fig03
    label: "Figure 2 (paper)"
    kind: figure
    file: assets/yu-2026-dm-call-decision-model-guided-function-calling/repo-fig03.png
    raw: https://raw.githubusercontent.com/gogoymh/decision-model-guided-function-calling/main/docs/assets/dm-call-figure2.png
    caption: "논문 Figure 2와 같은 repair budget별 정확도와 요청 시간 그래프. 논문 크롭(fig02)으로 대체한다"
    strategy: manual
    curated: false
---

## 한 줄 요약 (One-line Summary)

DM-Call 논문(arXiv:2611.10977)의 공식 구현 저장소다. Python 참조 구현과 TypeScript, Go, Rust, Java 구현을 함께 제공하며, 모든 구현이 공유 conformance suite로 논문 실험과 바이트 단위로 같은 요청을 보내는지 검사한다. 기존 에이전트를 유지한 채 tool call만 검사하는 `verify()` 진입점도 있다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 저장소 | github.com/gogoymh/decision-model-guided-function-calling |
| 생성 | 2026년 11월 8일 |
| 라이선스 | MIT |
| 언어 | Python 3.11+ (`src/dmcall`, 참조 구현), TypeScript/JavaScript (Node 18+), Go 1.22+, Rust 1.85+, Java/Kotlin 17+ |
| 의존성 | Python 라이브러리는 `httpx`와 `jsonschema`만 쓴다 |
| 배포 | PyPI, npm, crates.io, Maven Central 미등록. 저장소에서 직접 설치 |
| 후원 | Pseudo Lab No-More-Slops 그룹 활동으로 만들었고 Enhans가 후원했다 |
| 논문 요약 | [[agents/yu-2026-dm-call-decision-model-guided-function-calling]] |

## 2. 주요 기여 (Key Contributions)

- 논문 방법을 다섯 언어 라이브러리로 공개하고, 기본값을 논문 설정과 일치시켰다.
- `spec/conformance/paper_parity.json`의 14개 시나리오로 generator 프롬프트, 수정 요청, decision model 요청이 논문 실험 코드와 바이트 단위로 같은지 검사한다.
- 논문의 ablation 변형과 feedback 표현을 생성자 옵션 하나로 재현할 수 있게 했다.
- 기존 에이전트를 바꾸지 않고 OpenAI, Anthropic, Google SDK의 tool call 객체를 그대로 검사하는 `dmcall.verify()`를 제공한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 README가 설명하는 동작

README는 "어떤 tool call이 실행되기 전에 두 가지를 묻는다. 맞는 함수인가, 맞는 인자인가"로 방법을 소개한다. JSON schema는 잘못된 함수 선택, 아무도 주지 않은 값의 기입, 해당 도구가 없는데 호출하는 경우를 모두 통과시키므로 모델과 코드 사이에 decision model을 둔다는 설명이다.

다섯 단계는 논문 2절을 그대로 따른다.

1. **Propose**: generator가 요청, 함수 schema, 거부 이력 H_t로 후보 c_t를 제안한다.
2. **Verify**: 로컬 schema check S(c_t)와 decision model의 함수 질문 D_f, (호출일 때) 인자 질문 D_a.
3. **Accept**: S(c_t)가 참이고 물은 질문이 모두 0.5 이상이면 수락한다.
4. **Repair**: 거부된 후보와 feedback d_t를 H에 넣는다. generator는 이를 오래된 순서로 "실행되지 않음" 표시와 함께, 바뀌지 않은 원래 요청 앞에서 읽는다. decision model은 요청, schema, 현재 후보만 본다.
5. **Return**: 첫 수락 후보를 반환한다. c_0~c_r 중 수락된 것이 없으면 c_0를 반환한다. 파싱 가능한 최초 no call은 검증 없이 반환하고 unverified로 표시한다.

Hybrid feedback의 다섯 레이블 구간은 very likely incorrect(0.2 미만), likely incorrect, uncertain, likely correct, very likely correct다. 검증과 repair 동안 아무것도 실행하지 않으며, `call()`은 결정만 반환하고 `run()`은 수락된 호출만 실행한다.

### 3.2 사용법

```python
import dmcall

def get_weather(city: str, unit: str = "celsius") -> dict:
    """Current weather for a city."""
    return {"city": city, "temp": 12, "unit": unit}

agent = dmcall.DMCall("openai:gpt-5-nano", tools=[get_weather], reasoning_effort="none")
result = agent.run("Do I need a jacket in Seoul tonight?")
result.call; result.accepted; result.output; result.repairs  # repairs는 0~3
```

- `run()`은 최종 호출이 수락됐을 때만 실행한다. `call()`은 실행만 빼고 모두 수행해 실행 여부를 호출자가 정한다.
- 환경 변수 `TYPESAFE_API_KEY`(기본 decision model Jev)와 모델 provider 키를 설정한다.
- 도구는 일반 Python 함수를 그대로 쓴다. 타입 힌트에서 파라미터 타입을, Google/NumPy/Sphinx docstring에서 설명을, 시그니처에서 기본값을 얻는다. OpenAI 형식 schema dict도 받는다.
- `dmcall.schema_of(fn)`은 전송할 schema를 보여 주고, `dmcall.check_schema(tools, calls)`는 schema check S만 실행한다.
- `run()`에는 동기 Python 함수가 필요하다. async 함수나 함수가 없는 도구는 요청 전에 예외를 낸다. schema 안의 `$ref`는 그 schema 내부를 가리켜야 한다.

### 3.3 provider와 decision model

generator는 `"provider:model"` 문자열이나 provider 객체로 지정한다.

| provider | spec | 키 |
|---|---|---|
| OpenAI | `openai:<model>` | `OPENAI_API_KEY` |
| Anthropic | `anthropic:<model>` | `ANTHROPIC_API_KEY` |
| Google Gemini | `gemini:<model>` | `GEMINI_API_KEY` 또는 `GOOGLE_API_KEY` |
| Meta Model API (Muse) | `meta:<model>` | `MODEL_API_KEY` |
| xAI Grok | `xai:<model>` | `XAI_API_KEY` |
| Azure OpenAI | `azure:<deployment>` | `AZURE_OPENAI_API_KEY`, `AZURE_OPENAI_ENDPOINT` |
| OpenRouter | `openrouter:<model>` | `OPENROUTER_API_KEY` |
| OpenAI 호환 서버 (vLLM, Ollama, LM Studio) | `dmcall.OpenAICompatible` | 선택 |

- provider 객체는 `max_output_tokens`(기본 4,096), `temperature`, `system_prompt`, `timeout`, `max_retries`, `headers`를 받는다. 잘리거나 필터링되거나 거부된 응답은 읽을 수 없는 후보로 처리한다.
- Meta Muse 모델은 `reasoning_effort="none"`을 거부하고 `tool_choice="auto"`만 받는다. 논문에서는 평가하지 않았다.

decision model은 세 가지 선택지가 있다.

| decision model | 내용 |
|---|---|
| `dmcall.Jev` | TypeSafe의 호스팅 decision model. 논문은 `jev-1.13.0` 사용. `threshold`가 두 질문에 공통 적용되고 `function_threshold`, `arguments_threshold`로 개별 지정 |
| `dmcall.PPLXDecider` | open-weight Perplexity Decider v1.1 27B를 자체 서버에서 구동. 논문은 특정 revision을 BF16으로 체크포인트 자체 추론 서버에서 실행 |
| 사용자 정의 | `dmcall.DecisionModel`을 상속해 `ask(state, questions)`가 질문별 "예" 확률을 반환하게 구현 |

두 decision model 모두 대화, 함수 schema, 후보만 보며 reference 답은 보내지 않는다.

### 3.4 verify

```python
verdict = dmcall.verify(messages, response.choices[0].message.tool_calls, tools)
if verdict:
    execute(...)
else:
    print(verdict.function_probability, verdict.arguments_probability, verdict.schema_errors)
```

`verify`는 이전 tool call과 tool result를 포함한 대화와 제안된 호출을 받는다. plain dict나 OpenAI, Anthropic, Google SDK 객체를 그대로 받는다. `verdict.feedback`은 repair에 쓸 feedback 기록이다. LangChain, OpenAI Agents SDK, 자체 loop 모두 이 경로로 붙인다.

### 3.5 옵션과 논문 변형 대응

| 옵션 | 기본값 | 의미 |
|---|---|---|
| `decision_model` | Jev | 검증 모델 |
| `threshold` | 0.5 | 두 질문의 통과 기준 |
| `max_repairs` | 3 | r, 최초 후보 이후 repair 횟수 |
| `checks` | `"both"` | `"function"` 또는 `"arguments"`면 해당 질문만으로 수락 |
| `history` | `"cumulative"` | `"latest"`면 최근 거부 후보만 보여 줌 |
| `feedback` | `"hybrid"` | `"numeric"` 또는 `"text"` |
| `on_exhaustion` | `"first"` | 수락 없을 때 c_0 반환 (`"last"`는 마지막 repair) |
| `preserve_initial_no_call` | True | 읽을 수 있는 최초 no call을 검증 없이 반환 |
| `execute_unverified` | False | True면 수락 없이도 `run()`이 최종 후보 실행 |

| 논문 | 옵션 |
|---|---|
| DM-Call | 기본값 |
| DM-Call-Function | `checks="function"` |
| DM-Call-Argument | `checks="arguments"` |
| DM-Call-Latest | `history="latest"` |
| Numeric, Text, Hybrid feedback | `feedback="numeric" / "text" / "hybrid"` |

`checks`를 하나로 좁혀도 decision model은 논문 실행과 같이 두 질문에 모두 답하고 둘 다 사용량이 발생한다. `acall`, `arun`, `averify`는 같은 단계를 worker thread에서 실행한다. 논문의 baseline(Self-Refine, MAD-FC, PF-FC)은 실험 코드에만 있고 라이브러리에는 없다.

결과 객체는 `calls`, `call`, `accepted`, `initial_no_call_preserved`, `exhausted`, `repairs`, `final_attempt`, `text`, `executed`, `output`, `attempts`, `probabilities`, `usage`, `latency_s`, `trace` 필드를 가진다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

README는 논문 수치를 그대로 옮기고 몇 가지 해석을 더한다. 표 자체는 [[agents/yu-2026-dm-call-decision-model-guided-function-calling]] 4절과 같다.

- BFCL에서 DM-Call(Jev)은 Direct 대비 gpt-5-nano 10.5%p, gpt-5.4-mini 0.9%p, claude-sonnet-5.5 0.3%p, gemma-4-31b-it 0.2%p 올랐다. PPLX Decider는 Jev와 0.4%p 이내였다.
- API-Bank에서 DM-Call은 claude-sonnet-5.5에서만 1위 또는 동률이었다. 동률이 많은 이유는 공유된 최초 답에 있다. gpt-5-nano를 제외하면 decision model이 156 사례 중 실행당 0~6 사례만 거부해 대부분 최초 답을 그대로 반환했다.
- 비용은 Direct 대비 gpt-5-nano 3.1배, gpt-5.4-mini 1.3배, claude-sonnet-5.5 1.1배였다. Self-Refine은 DM-Call의 1.5~4.0배, PF-FC는 1.3~11배, MAD-FC는 3~7배였다.
- Table 2 실행은 보관된 trajectory를 재생해 Direct가 64.11%로 Table 1(64.12%)과 조금 다르다. Args.는 함수가 맞았을 때의 인자 정확도다.
- gemma-4-31b-it는 FP8로 vLLM에서 로컬 구동했다.

repair budget별 수치 (gpt-5-nano, BFCL, Jev, 세 번 실행을 10회 repair까지 이어 r마다 자름).

| r | 1 | 2 | 3 (기본) | 5 | 7 | 10 |
|---|---:|---:|---:|---:|---:|---:|
| call 정확도 (%) | 71.84 | 73.61 | 74.63 | 75.57 | 75.99 | 76.38 |
| 요청 시간 합 평균 (초) | 3.43 | 3.75 | 4.03 | 4.53 | 5.00 | 5.68 |
| 요청 시간 합 p95 (초) | 6.06 | 7.77 | 9.69 | 13.76 | 17.88 | 24.32 |

방법별 평균 요청 시간 합은 Direct 2.56초, MAD-FC 10.49초, PF-FC 5.58~6.90초, DM-Call 3.43~5.68초다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **단계당 결정 하나**: `call()`과 `run()`은 텍스트 메시지를 받으므로 이전 tool result는 텍스트로 넘겨야 한다. `verify()`는 tool call과 tool result 메시지를 받는다. 병렬 tool call은 아직 지원하지 않는다.
- **decision model 오판**: 수락된 호출이 틀릴 수 있고 맞는 호출이 거부될 수 있다.
- **비용과 latency**: 후보마다 generator 요청 1회와 decision model 요청 1회가 든다. repair 3회면 각각 최대 4회다.
- **근거 범위**: generator 4개, decision model 2개, 주로 영어 요청, BFCL single-turn과 API-Bank first call만 평가했다. 임계값, fallback 규칙, 레이블 구간, r*는 held-out split 없이 이 벤치마크에서 골랐다. BFCL에는 알려진 annotation 오류가 있다. end-to-end 실행 성공은 측정하지 않았다.
- 실험 러너, baseline 구현, 원시 실행 기록은 저장소에 포함되지 않는다.

FAQ는 decision model이 LLM-as-a-Judge와 다른 점으로, 설명이나 추론을 쓰지 않고 고정된 예/아니오 질문 두 개에 확률로만 답하며 로컬 schema check를 함께 쓴다는 점을 든다.

## 6. 관련 연구 (Related Work)

| 자료 | 관계 |
|---|---|
| [[agents/yu-2026-dm-call-decision-model-guided-function-calling]] | 이 저장소가 구현한 논문 |
| [[llms/typesafe-ai-2026-introduction]] | 기본 decision model Jev의 공식 소개 |
| [[llms/huggingface-2026-decision-models-in-hugging-face]] | decision model 인터페이스의 Hugging Face 표준화 |

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| `dmcall.DMCall` | generator, 도구, decision model을 묶은 클라이언트. `call()`과 `run()` 제공 |
| `dmcall.verify` | 외부 프레임워크가 만든 tool call을 실행 전에 검사하는 함수 |
| conformance suite | 다섯 구현이 같은 요청을 보내는지 검사하는 공유 테스트 (`spec/`) |
| paper parity | 논문 실험 코드에서 기록한 14개 요청 시나리오와의 바이트 단위 일치 |
| `on_exhaustion` | repair budget 소진 시 반환할 후보를 정하는 옵션 |

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | - | README 대표 이미지 | manual | (장식, 제외) |
| fig02 | - | 논문 Figure 1과 동일 | manual | 논문 크롭으로 대체 |
| fig03 | - | 논문 Figure 2와 동일 | manual | 논문 크롭으로 대체 |
