---
title: "SkillOpt: Executive Strategy for Self-Evolving Agent Skills"
type: repo
year: 2026
category: agents
source: microsoft-skillopt.md
raw_path: raw/repos/microsoft-skillopt.md
raw_filename: "microsoft-skillopt.md"
source_collection: external
org: "microsoft"
repo: "SkillOpt"
url: "https://github.com/microsoft/SkillOpt"
license: "MIT"
tags: [agent-skills, self-evolving, prompt-optimization, agentic-loop, claude-code, codex, benchmark]
---

# SkillOpt: Executive Strategy for Self-Evolving Agent Skills

## 요약

SkillOpt은 agent skill 문서를 학습 대상 파라미터로 놓고 딥러닝 옵티마이저의 규율로 훈련하는 Microsoft의 오픈소스 프레임워크다. 모델 가중치는 고정한 채 텍스트 문서만 바꾸므로, 훈련이 끝난 뒤 배포되는 것은 `best_skill.md` 한 장뿐이다.

훈련은 채점된 rollout에서 시작한다. 별도의 optimizer 모델이 그 실행 기록을 단일 skill 문서에 대한 add, delete, replace 편집으로 바꾸고, 훈련에 쓰지 않은 held-out 검증 점수를 엄격히 개선하는 후보만 수용한다. 즉 편집 하나하나가 검증 관문을 통과해야 살아남는다.

성능은 6개 벤치마크와 7개 target 모델, 3개 실행 harness를 조합한 52개 평가 셀 전부에서 best 또는 tied-best로 보고됐다. GPT-5.5에서는 skill이 없을 때와 비교해 평균 정확도가 direct chat 기준 23.5점 올랐다.

이 페이지는 저장소 README 스냅샷에 근거한다. 방법의 세부와 ablation, per-cell 결과는 같은 프로젝트의 논문 페이지가 담당한다.

## 배경

README가 문제로 지목하는 것은 agent skill을 만드는 기존 방식이다. 지금의 agent skill은 대체로 사람이 손으로 작성하거나, 강력한 LLM이 한 번에 생성하거나, 느슨하게 통제된 self-revision으로 진화한다.

세 방식에는 공통된 약점이 두 가지 있다. 첫째, 어느 것도 skill 자체에 대해 딥러닝 옵티마이저처럼 동작하지 않는다. 둘째, 피드백을 받더라도 출발점 대비 신뢰할 만하게 개선된다는 보장이 없다.

SkillOpt의 출발점은 이 약점을 가중치 최적화의 규율로 보완하는 것이다. 가중치 공간의 최적화가 재현 가능한 이유는 epoch, batch size, learning rate, validation처럼 학습을 통제하는 장치가 갖춰져 있어서다. SkillOpt은 그 장치를 텍스트 공간으로 옮기되, 모델 가중치 자체는 바꾸지 않는다.

## 핵심 개념

frozen agent는 가중치를 고정한 채 skill 문서만 바꾸는 대상 에이전트를 뜻한다. 학습되는 것은 모델이 아니라 모델 앞에 놓이는 텍스트다.

skill document는 에이전트에 주입하는 텍스트 지침 문서다. SkillOpt은 이 문서를 학습 대상 상태(trainable state)로 본다. 딥러닝에서 가중치가 차지하는 자리를 텍스트 문서가 대신한다는 뜻이다.

rollout은 현재 skill로 태스크를 실제 수행해 점수를 얻는 실행 단위다. 채점된 rollout이 다음 편집의 근거가 되므로, 딥러닝의 forward pass에 해당하는 자리에 놓인다.

harness는 skill이 실제로 실행되는 환경을 뜻한다. SkillOpt의 평가에서는 direct chat, Codex CLI, Claude Code CLI 세 가지가 쓰였다. 같은 skill 문서라도 어느 harness 안에서 실행되느냐에 따라 성적이 달라지므로, harness는 평가 조건의 하나로 다뤄진다.

held-out validation gate는 편집 후보의 수용 여부를 정하는 관문이다. 훈련에 쓰지 않은 검증 집합의 점수를 기준으로 삼고, 그 점수를 엄격히 개선할 때만 편집을 확정한다.

이 개념들은 딥러닝의 구성 요소와 하나씩 대응한다.

| 딥러닝 개념 | SkillOpt의 텍스트 공간 대응 | README의 근거 |
|---|---|---|
| 학습 파라미터 | skill 문서 | skill 문서를 frozen agent의 학습 대상 상태로 다룬다고 명시 |
| 가중치 갱신 | bounded add / delete / replace 편집 | 단일 skill 문서에 가하는 편집 연산으로 명시 |
| learning rate | textual learning-rate budget | 안정화 장치의 하나로 명시 |
| validation | held-out validation gate | 편집 수용 조건으로 명시 |
| epoch | epoch 단위 slow/meta update | 안정화 장치의 하나로 명시 |
| (mini-)batch size | rollout 묶음 크기 | 부제에만 등장하고 세부는 논문으로 넘어간다 |

## 방법

### 훈련 루프

훈련 루프는 rollout, reflect, aggregate, select, update, evaluate 6단계로 구성된다. README는 단계 이름과 루프 전체의 동작만 밝히고 단계별 세부는 논문과 프로젝트 페이지의 시각 설명으로 넘긴다.

| 순서 | 단계 | README가 밝힌 근거 |
|---|---|---|
| 1 | rollout | 채점된 rollout이 편집의 입력이 된다 |
| 2 | reflect | 이름만 명시 |
| 3 | aggregate | 이름만 명시 |
| 4 | select | 이름만 명시 |
| 5 | update | 단일 skill 문서에 bounded add / delete / replace 편집을 적용한다 |
| 6 | evaluate | held-out validation 점수를 엄격히 개선할 때만 편집을 수용한다 |

루프를 실행하는 주체가 둘로 나뉜다는 점이 중요하다. rollout을 수행하는 것은 가중치가 고정된 target 모델이고, 그 결과를 편집으로 바꾸는 것은 별도의 optimizer 모델이다. 학습 대상과 학습 주체를 분리했기 때문에 target 모델을 전혀 건드리지 않고도 성능을 끌어올릴 수 있다.

### 편집 연산과 수용 조건

optimizer 모델이 가할 수 있는 편집은 add, delete, replace 세 가지다. 이 편집은 bounded, 즉 한계가 정해진 형태로만 적용된다. README는 bounded라는 성질만 밝히고 예산을 어떻게 산정하는지는 논문으로 넘긴다.

수용 조건은 단순하다. 후보 편집은 held-out validation 점수를 엄격히 개선할 때만 받아들여진다. "엄격히"라는 조건 때문에 점수가 같은 편집은 통과하지 못하며, 개선이 확인되지 않은 변경이 skill 문서에 남지 않는다.

### 안정화 장치

skill 훈련을 안정시키는 장치로 README는 세 가지를 든다.

| 장치 | README 설명 |
|---|---|
| textual learning-rate budget | learning rate를 텍스트 공간의 편집 예산 형태로 표현한다 |
| rejected-edit buffer | 거부된 편집 후보를 모아 두는 버퍼다 |
| epoch 단위 slow/meta update | epoch 경계에서 수행하는 느린 갱신이다 |

README는 세 장치가 함께 훈련을 안정시킨다고만 적고, 각 장치의 기여도를 나누어 제시하지는 않는다. 기여도 분해는 논문의 ablation이 담당한다.

이 세 장치가 붙어도 배포 시점의 추가 모델 호출은 0회로 유지된다. 안정화가 훈련 단계에서만 작동하고, 배포되는 산출물에는 optimizer 관련 구성이 남지 않기 때문이다.

## 프레임워크 구조

### 백엔드

백엔드는 chat 또는 exec target 하나를 뜻한다. chat 계열은 모델 API를 직접 호출하고, exec 계열은 CLI 형태의 코딩 에이전트를 실행한다. README가 예시로 드는 목록은 다음과 같다.

| backend id | 종류 | 대상 |
|---|---|---|
| `openai_chat` | chat | OpenAI 계열 모델 |
| `claude_chat` | chat | Claude 계열 모델 |
| `qwen_chat` | chat | Qwen 계열 모델 |
| `minimax_chat` | chat | MiniMax 계열 모델 |
| `codex_exec` | exec | Codex CLI |
| `claude_code_exec` | exec | Claude Code CLI |

이 목록은 예시이며 전부는 아니다. v0.1.0 릴리스 공지는 지원 대상으로 OpenAI, Azure, Claude, Qwen, MiniMax를 든다.

### 벤치마크 환경

벤치마크 하나는 `skillopt/envs/<name>/` 패키지 하나에 대응한다. 패키지는 `dataloader.py`로 데이터를 읽고, `rollout.py`로 실행과 채점을 수행하며, `initial.md`로 훈련의 출발점이 되는 seed skill을 제공한다. 이 seed skill이 옵티마이저가 편집을 시작하는 초기값에 해당한다.

가장 단순한 참고 구현은 `skillopt/envs/searchqa/`다. v0.1.0에는 벤치마크 6개가 내장돼 있다.

### 확장 지점

새 모델이나 새 태스크를 붙이는 경로가 명시적으로 나뉘어 있다.

| 확장 대상 | 추가할 파일 | 등록 위치 | 계약 문서 | 참고 템플릿 |
|---|---|---|---|---|
| 백엔드 | `skillopt/model/<name>_backend.py` | `skillopt/model/common.py`, `backend_config.py`, `skillopt/model/__init__.py` 라우터 | `docs/guide/new-backend.md` | `qwen_backend.py`, `minimax_backend.py` |
| 벤치마크 | `skillopt/envs/<name>/` 패키지 | 패키지 구성 자체가 등록 | `docs/guide/new-benchmark.md` | `skillopt/envs/searchqa/` |

백엔드 추가가 세 자리에 손을 대야 하는 반면 벤치마크 추가는 디렉터리 하나로 끝난다. 백엔드는 라우터를 거쳐 호출되는 구조라 등록 지점이 분산돼 있다.

### WebUI 대시보드

훈련 과정을 모니터링하는 대시보드가 선택 설치로 제공된다.

```bash
pip install -e ".[webui]"
python -m skillopt_webui.app
```

| 플래그 | 기본값 | 설명 |
|---|---|---|
| `--port` | 7860 | 서버 포트 |
| `--host` | `0.0.0.0` | 바인드 주소 |
| `--share` | off | 공개 Gradio share 링크 생성 |

`--share`는 기본적으로 꺼져 있다. 켜면 외부에서 접근 가능한 링크가 만들어지므로 훈련 로그를 공개하게 되는 셈이라, 기본값이 off인 편이 안전하다.

## 결과

평가는 6개 벤치마크, 7개 target 모델, 3개 실행 harness의 조합으로 이뤄졌다. harness는 direct chat, Codex CLI, Claude Code CLI다. 조합 가능한 경우의 수가 전부 채워진 것은 아니며, 실제 평가된 것은 52개 (model, benchmark, harness) 셀이다. SkillOpt은 이 52개 셀 전부에서 best 또는 tied-best를 기록했다.

GPT-5.5 기준 향상 폭은 skill을 주지 않은 상태와 비교한 평균 정확도의 절대 점수 차이다.

| harness | 향상 폭 |
|---|---|
| direct chat | +23.5점 |
| Codex agentic loop 내부 | +24.8점 |
| Claude Code 내부 | +19.1점 |

세 harness 모두에서 두 자리 점수의 향상이 나왔고, 그중 Codex agentic loop 내부가 가장 컸다. 이미 도구를 쓰는 에이전트 안에서도 skill 문서를 최적화하면 추가 이득이 남는다는 뜻이다.

전이성도 보고됐다. 최적화된 skill 산출물은 추가 최적화 없이 모델 규모를 가로질러 전이되고, Codex와 Claude Code harness 사이에서도 전이되며, 인접 벤치마크로도 전이된다. 한 번 훈련한 skill을 다른 환경에 재사용할 여지가 있다는 의미다.

## 배포와 생태계

### 설치와 배포 형태

패키지는 PyPI에 `skillopt`로 올라가 있고 Python 3.10 이상을 요구한다.

```bash
pip install skillopt
```

배포되는 산출물은 `best_skill.md` 한 장이다. README는 그 길이를 일반적으로 300~2,000 토큰이라고 밝히고, 바뀌지 않은 target 모델에 그대로 적용된다고 적는다. 모델을 교체하거나 재학습할 필요가 없으므로 도입 비용이 파일 하나를 배치하는 수준으로 낮아진다.

설치 절차, 데이터 준비, 훈련과 평가 명령, 전체 설정 레퍼런스, 프레임워크 내부 구조는 GitHub Pages의 재현 문서(Documentation & Reproduction Guide)가 담당한다. README는 개요만 제공한다.

### SkillOpt-Sleep

2026-06-15 공개된 preview 단계 도구다. 로컬 코딩 에이전트를 위한 야간 오프라인 self-evolution 동반 도구로, 대상은 Claude Code, Codex, Copilot이다.

동작은 세 가지로 요약된다. 과거 세션을 리뷰하고, 반복되는 태스크를 replay하며, 검증된 skill을 held-out gate 뒤에서 통합한다. 본 훈련 루프와 마찬가지로 검증 관문을 통과한 것만 반영하는 구조다. 정의와 사용법, 결과는 `docs/sleep/README.md`에 있으며 이 저장소 스냅샷에는 포함되지 않았다.

### 릴리스 연혁

| 시점 | 내용 |
|---|---|
| 2026-06-02 | v0.1.0 PyPI 공개. 전체 훈련 루프, 다중 백엔드 지원, 6개 내장 벤치마크, WebUI 대시보드 포함 |
| 2026-06-03 | gbrain, gbrain-evals, darwin-skill이 SkillOpt을 통합 |
| 2026-06-15 | SkillOpt-Sleep preview 공개 |

세 건의 공지가 2주 안에 이어졌고, 릴리스 다음 날 외부 프로젝트 통합이 보고됐다. 라이선스는 MIT라 통합과 재배포에 제약이 적다.

## 한계

README는 개요 문서라서 판단에 필요한 근거가 대부분 논문에 있다. ablation, per-cell 결과, 한계 논의가 모두 논문(arXiv:2605.23904)으로 넘어가므로, 저장소 스냅샷만으로는 실패 사례나 훈련 비용을 판단할 수 없다.

"추가 모델 호출 0회"는 호출 횟수에 대한 진술이다. `best_skill.md`가 컨텍스트에 삽입되면서 소모하는 토큰 비용은 별개이며 README는 이를 다루지 않는다. 300~2,000 토큰이 매 요청의 컨텍스트에 더해지는 만큼, 호출 수가 늘지 않는 것과 비용이 늘지 않는 것은 구분해서 읽어야 한다.

훈련 자체의 비용도 수치로 제시되지 않는다. rollout 실행과 optimizer 모델 호출이 반복되는 구조이므로 훈련 단계의 비용은 적지 않을 것으로 보이지만, README에는 근거가 없다.

SkillOpt-Sleep은 preview 단계이며 관련 문서가 이 스냅샷에 포함되지 않아 완성도를 평가할 수 없다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| skill document | 에이전트에 주입하는 텍스트 지침 문서. SkillOpt에서는 이것이 학습 대상 상태다 |
| frozen agent | 가중치를 고정한 채 skill 문서만 바꾸는 대상 에이전트 |
| `best_skill.md` | 훈련이 끝난 뒤 배포되는 산출물 파일. 일반적으로 300~2,000 토큰이다 |
| held-out validation gate | 훈련에 쓰지 않은 검증 집합의 점수로 편집 후보의 수용 여부를 정하는 관문 |
| textual learning-rate budget | learning rate를 텍스트 공간의 편집 예산으로 옮긴 개념 |
| harness | skill이 실제로 실행되는 환경. direct chat, Codex CLI, Claude Code CLI가 평가에 쓰였다 |

## 관련 페이지

- [[agents/yang-2026-skillopt-executive-strategy-for]]: 같은 프로젝트의 논문. README가 넘기는 방법 세부와 ablation, per-cell 결과의 원전이다.
- [[agents/lin-2026-harness-updating-is-not-harness-benefit]]: self-evolving 에이전트의 이득을 base capability, harness-updating, harness-benefit로 분리한 연구. SkillOpt이 held-out gate로 편집의 이득을 통제하는 지점과 맞닿는다.
- [[agents/dennis-2026-compiling-agentic-workflows-into-llm]]: 오케스트레이션을 모델 가중치로 컴파일하는 접근. 가중치를 고정하고 텍스트 문서만 훈련하는 SkillOpt과 대비된다.
- [[agents/osmani-2026-loop-engineering]]: skill을 loop의 한 구성 요소로 보는 관점. SkillOpt은 그 구성 요소를 자동 최적화 대상으로 삼는다.
- [[applications/garrytan-gbrain]]: markdown 파일을 원본으로 삼는 에이전트 메모리 시스템. SkillOpt README의 2026-06-03 공지가 gbrain의 통합 사실을 밝힌다.
- [[agents/patel-2026-beyond-the-prompt-claude-code]]: Claude Code의 skill과 메모리 운영 매뉴얼. SkillOpt의 `claude_code_exec` 백엔드와 SkillOpt-Sleep이 대상으로 삼는 환경이다.
