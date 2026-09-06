---
title: "SkillOpt: Executive Strategy for Self-Evolving Agent Skills"
type: repo
year: 2026
category: agents
raw_path: raw/repos/microsoft-skillopt.md
raw_filename: "microsoft-skillopt.md"
source_collection: external
org: "microsoft"
repo: "SkillOpt"
url: "https://github.com/microsoft/SkillOpt"
license: "MIT"
tags: [agent-skills, self-evolving, prompt-optimization, agentic-loop, claude-code, codex, benchmark]
---

## 한 줄 요약 (One-line Summary)

SkillOpt은 agent skill 문서를 가중치가 고정된 에이전트의 학습 가능한 상태로 놓고, epoch, (mini-)batch size, learning rate, validation gate를 갖춘 딥러닝 옵티마이저의 규율로 훈련하는 Microsoft 오픈소스 프레임워크다. 모델 가중치는 바꾸지 않으며, 배포 시점에 추가되는 모델 호출도 없다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 저장소 | microsoft/SkillOpt |
| 라이선스 | MIT |
| 패키지 | PyPI `skillopt` v0.1.0 (2026-06-02 공개), `pip install skillopt` |
| 요구 환경 | Python 3.10 이상 |
| 논문 | arXiv:2605.23904 (Yang et al., 2026) |
| 프로젝트 페이지 | microsoft.github.io/SkillOpt |
| 재현 문서 | Documentation & Reproduction Guide (microsoft.github.io/SkillOpt/docs/guideline.html) |
| 데모 영상 | youtu.be/JUBMDTCiM0M |

핵심 아이디어는 skill 문서를 학습 대상 상태(trainable state)로 삼는 것이다. 별도의 optimizer 모델이 채점된 rollout을 단일 skill 문서에 대한 bounded add / delete / replace 편집으로 바꾸고, held-out validation 점수를 엄격히 개선하는 후보 편집만 수용한다.

배포되는 산출물은 이와 구분되는 `best_skill.md` 한 장이다. README는 그 길이를 일반적으로 300~2,000 토큰이라고 밝히고, 바뀌지 않은 target 모델에 그대로 적용된다고 적는다.

README 자체는 개요 문서다. 설치, 데이터 준비, 훈련과 평가 명령, 전체 설정 레퍼런스, 프레임워크 내부 구조는 GitHub Pages의 재현 문서로 넘긴다.

## 2. 주요 기여 (Key Contributions)

- **skill을 학습 대상 상태로 재정의**: README는 지금의 agent skill이 대체로 손으로 작성되거나, 강력한 LLM이 한 번에 생성하거나, 느슨하게 통제된 self-revision으로 진화한다고 적는다. 세 방식 모두 skill 자체에 대해 딥러닝 옵티마이저처럼 동작하지 않으며, 피드백을 받아 출발점 대비 신뢰할 만하게 개선된다는 보장도 없다는 것이 문제 제기다.
- **가중치 최적화의 규율을 텍스트 공간으로 이전**: SkillOpt은 skill 문서를 가중치 최적화가 재현 가능하도록 만들어 준 규율로 훈련한다.
- **6단계 훈련 루프**: rollout, reflect, aggregate, select, update, evaluate 순서로 구성된다.
- **안정화 장치 3종**: textual learning-rate budget, rejected-edit buffer, epoch 단위 slow/meta update가 skill 훈련을 안정시킨다.
- **배포 시점 추가 모델 호출 0회**: 훈련이 끝난 뒤에는 `best_skill.md` 한 장만 배포하므로 추론 시점에 모델 호출이 늘지 않는다.
- **다중 백엔드와 벤치마크**: v0.1.0에 전체 훈련 루프, OpenAI / Azure / Claude / Qwen / MiniMax 백엔드 지원, 6개 내장 벤치마크, WebUI 대시보드가 포함됐다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 훈련 루프

README가 밝히는 것은 단계 이름과 루프 전체의 동작이다. 별도의 optimizer 모델이 채점된 rollout을 bounded 편집으로 바꾸고, held-out validation 점수를 엄격히 개선하는 후보만 수용한다. 단계별 세부 동작은 논문과 프로젝트 페이지의 시각 설명으로 넘긴다.

| 순서 | 단계 | README가 밝힌 근거 |
|---|---|---|
| 1 | rollout | 채점된 rollout이 편집의 입력이 된다 |
| 2 | reflect | 이름만 명시 |
| 3 | aggregate | 이름만 명시 |
| 4 | select | 이름만 명시 |
| 5 | update | 단일 skill 문서에 bounded add / delete / replace 편집을 적용한다 |
| 6 | evaluate | held-out validation 점수를 엄격히 개선할 때만 편집을 수용한다 |

편집 연산은 add, delete, replace 세 가지이며 bounded로 제한된다. README는 "bounded"라는 성질만 밝히고 예산의 구체적 산정 방식은 논문으로 넘긴다.

### 안정화 장치

| 장치 | README 설명 |
|---|---|
| textual learning-rate budget | learning rate를 텍스트 공간의 편집 예산 형태로 표현한다 |
| rejected-edit buffer | 거부된 편집 후보를 모아 두는 버퍼다 |
| epoch 단위 slow/meta update | epoch 경계에서 수행하는 느린 갱신이다 |

세 장치가 함께 skill 훈련을 안정시키면서 배포 시점의 추가 모델 호출을 0회로 유지한다. README는 개별 장치의 기여도를 나누어 제시하지 않는다.

### 백엔드 추상화

백엔드는 chat 또는 exec target 하나를 뜻한다. README가 예시로 드는 목록은 다음과 같다.

| backend id | 종류 | 대상 |
|---|---|---|
| `openai_chat` | chat | OpenAI 계열 모델 |
| `claude_chat` | chat | Claude 계열 모델 |
| `qwen_chat` | chat | Qwen 계열 모델 |
| `minimax_chat` | chat | MiniMax 계열 모델 |
| `codex_exec` | exec | Codex CLI |
| `claude_code_exec` | exec | Claude Code CLI |

신규 백엔드 추가 절차는 세 단계다. `skillopt/model/<name>_backend.py` 모듈을 만들고, `skillopt/model/common.py`와 `backend_config.py`에 등록한 뒤, `skillopt/model/__init__.py`의 라우터에 연결한다. 전체 계약은 `docs/guide/new-backend.md`에 있으며, `qwen_backend.py`와 `minimax_backend.py`가 참고 템플릿으로 지목된다.

### 벤치마크 추상화

벤치마크 하나는 `skillopt/envs/<name>/` 패키지 하나다. 패키지는 `dataloader.py`, `rollout.py`, seed skill인 `initial.md` 세 파일로 구성한다. 전체 계약은 `docs/guide/new-benchmark.md`에 있고, 가장 단순한 참고 구현은 `skillopt/envs/searchqa/`다.

### WebUI 대시보드

모니터링 대시보드는 선택 설치다.

```bash
pip install -e ".[webui]"
python -m skillopt_webui.app
```

| 플래그 | 기본값 | 설명 |
|---|---|---|
| `--port` | 7860 | 서버 포트 |
| `--host` | `0.0.0.0` | 바인드 주소 |
| `--share` | off | 공개 Gradio share 링크 생성 |

### SkillOpt-Sleep (preview)

2026-06-15 공개된 preview 단계 도구다. 로컬 코딩 에이전트(Claude Code, Codex, Copilot)를 위한 야간 오프라인 self-evolution 동반 도구로, 과거 세션을 리뷰하고 반복 태스크를 replay한 뒤 검증된 skill을 held-out gate 뒤에서 통합한다. 정의와 사용법, 결과는 `docs/sleep/README.md`에 있다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

- **평가 범위**: 6개 벤치마크, 7개 target 모델, 3개 실행 harness(direct chat, Codex CLI, Claude Code CLI). 실제 평가된 조합은 52개 (model, benchmark, harness) 셀이다.
- **전면 우위**: 52개 셀 전부에서 best 또는 tied-best를 기록했다.
- **GPT-5.5 기준 향상 폭**: no-skill 대비 평균 정확도의 절대 점수 상승이다.

| harness | 향상 폭 |
|---|---|
| direct chat | +23.5점 |
| Codex agentic loop 내부 | +24.8점 |
| Claude Code 내부 | +19.1점 |

- **전이성(transfer)**: 최적화된 skill 산출물이 추가 최적화 없이 모델 규모를 가로질러 전이되고, Codex와 Claude Code harness 사이에서도 전이되며, 인접 벤치마크로도 전이된다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- README는 개요 중심이라 ablation, per-cell 결과, 한계 논의를 논문(arXiv:2605.23904)으로 넘긴다. 저장소 스냅샷만으로는 실패 사례나 훈련 비용을 판단할 수 없다.
- 설치, 데이터 준비, 훈련과 평가 명령, 설정 레퍼런스, 프레임워크 내부 구조도 GitHub Pages의 재현 문서에 있어 이 스냅샷에 담기지 않았다.
- SkillOpt-Sleep은 preview 단계이며, 그 결과와 사용법을 담은 `docs/sleep/README.md`도 이 스냅샷에 포함되지 않았다.
- "추가 모델 호출 0회"는 호출 횟수에 대한 진술이다. `best_skill.md`가 컨텍스트에 삽입되면서 소모하는 토큰 비용은 별개이며, README는 이를 다루지 않는다.
- 훈련 자체의 비용, 즉 rollout과 optimizer 모델 호출에 드는 비용은 README에 수치로 제시되지 않는다.

## 6. 관련 연구 (Related Work)

- **대비 대상**: README가 명시한 세 가지 기존 방식은 hand-crafted skill, 강력한 LLM의 one-shot 생성, 느슨하게 통제된 self-revision이다.
- **생태계 통합**: 2026-06-03 공지에 따르면 gbrain, gbrain-evals, darwin-skill이 SkillOpt을 통합했다. gbrain-evals 쪽 벤치마크 기록은 `docs/benchmarks/2026-06-03-skillopt.md` 경로로 링크된다.
- **인용 정보**: Yang et al., "Skillopt: Executive strategy for self-evolving agent skills", arXiv preprint 2605.23904 (2026). 제1저자는 Yifan Yang이다.
- **개념적 인접**: prompt optimization, agentic loop의 자기 개선, Claude Code 계열의 agent skill 문서 패턴.

## 7. 용어집 (Glossary)

- **skill document**: 에이전트에 주입하는 텍스트 지침 문서. SkillOpt에서는 이것이 학습 대상 상태다.
- **frozen agent**: 가중치를 고정한 채 skill 문서만 바꾸는 대상 에이전트.
- **`best_skill.md`**: 훈련이 끝난 뒤 배포되는 산출물 파일. 일반적으로 300~2,000 토큰이다.
- **held-out validation gate**: 훈련에 쓰지 않은 검증 집합의 점수로 편집 후보의 수용 여부를 정하는 관문.
- **rejected-edit buffer**: 거부된 편집 후보를 모아 두는 버퍼.
- **textual learning-rate budget**: learning rate를 텍스트 공간의 편집 예산으로 옮긴 개념.
- **backend**: SkillOpt이 다루는 chat 또는 exec target 하나.
- **harness**: skill이 실제로 실행되는 환경. direct chat, Codex CLI, Claude Code CLI 세 가지가 평가에 쓰였다.
- **rollout**: 현재 skill로 태스크를 수행해 점수를 얻는 실행 단위.
