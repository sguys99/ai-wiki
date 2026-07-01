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

SkillOpt은 agent skill 문서를 얼어붙은(frozen) 모델의 학습 가능한 상태로 보고, 딥러닝 옵티마이저처럼 epoch·batch·learning rate·validation gate를 갖춰 훈련하는 Microsoft 오픈소스 프레임워크다. 모델 가중치는 건드리지 않고 배포 시 추론 비용도 늘리지 않는다.

## 1. 자료 정보 (Document Information)

- **저장소**: microsoft/SkillOpt (MIT License)
- **논문**: arXiv:2605.23904 (Yang et al., 2026)
- **패키지**: PyPI `skillopt` v0.1.0 (2026-06-02 공개), Python 3.10+
- **프로젝트 페이지 / 데모**: microsoft.github.io/SkillOpt, YouTube 데모 영상 제공
- **핵심 아이디어**: skill document(`best_skill.md`)를 "학습 대상 파라미터"로 삼는다. 별도의 optimizer 모델이 채점된 rollout을 add/delete/replace 편집으로 바꾸고, held-out validation 점수가 엄격히 개선될 때만 그 편집을 받아들인다.

## 2. 주요 기여 (Key Contributions)

- **skill을 학습 상태로 재정의**: 예전에는 skill을 손으로 만들거나 강력한 LLM이 한 번에 생성하거나 느슨한 self-revision으로 진화시켰다. SkillOpt은 skill 문서 자체를 옵티마이저가 재현 가능하게 훈련하는 대상으로 놓았다.
- **훈련 루프**: rollout → reflect → aggregate → select → update → evaluate 6단계 루프를 갖춘다.
- **안정화 장치**: textual learning-rate budget, rejected-edit buffer, epoch 단위 slow/meta update로 skill 훈련을 안정시킨다. 가중치 최적화의 재현성 규율을 텍스트 공간으로 옮긴 셈이다.
- **배포 효율**: 산출물은 300~2,000 토큰 규모의 `best_skill.md` 한 장이며, 바뀌지 않은 target 모델에 그대로 붙는다. 배포 시점의 추가 모델 호출은 **0회**다.
- **다중 백엔드·벤치마크**: OpenAI / Azure / Claude / Qwen / MiniMax 백엔드, 6개 내장 벤치마크, WebUI 대시보드를 갖췄다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

- **훈련 루프 구성**: rollout(현재 skill로 태스크 수행) → reflect(채점 결과 반성) → aggregate(신호 취합) → select(후보 편집 선별) → update(skill 문서 편집 적용) → evaluate(held-out 검증). 검증 점수가 엄격히 오를 때만 편집을 확정한다.
- **편집 연산**: optimizer 모델이 single skill document에 bounded add / delete / replace 편집을 가한다. 편집 폭을 제한(bounded)해 급격한 발산을 막는다.
- **하이퍼파라미터 대응**: epoch, (mini-)batch size, learning rate에 대응하는 텍스트 공간 개념을 둔다. learning rate는 편집 예산(budget) 형태로 나타난다.
- **백엔드 추상화**: 백엔드는 chat/exec target 단위(`openai_chat`, `claude_chat`, `qwen_chat`, `minimax_chat`, `codex_exec`, `claude_code_exec`)로 정의한다. 신규 백엔드를 추가하려면 `skillopt/model/<name>_backend.py` 모듈을 만들고 `common.py`·`backend_config.py`에 등록한 뒤 `__init__.py` 라우터에 연결한다.
- **벤치마크 추상화**: 벤치마크는 `skillopt/envs/<name>/` 패키지(`dataloader.py`, `rollout.py`, seed skill `initial.md`)로 정의한다. 가장 단순한 참고 예시가 `searchqa` 환경이다.
- **SkillOpt-Sleep (preview)**: 로컬 코딩 에이전트(Claude Code / Codex / Copilot)를 위한 야간 오프라인 self-evolution 도구다. 과거 세션을 리뷰하고 반복 태스크를 replay한 뒤, 검증된 skill을 held-out gate 뒤에서 통합한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

- **평가 범위**: 6개 벤치마크 × 7개 target 모델 × 3개 실행 harness(direct chat, Codex CLI, Claude Code CLI).
- **전면 우위**: 평가한 52개 (model, benchmark, harness) 셀 전부에서 best 또는 tied-best를 기록했다.
- **GPT-5.5 기준 향상 폭**: no-skill 대비 평균 정확도가 direct chat +23.5점, Codex agentic loop 내부 +24.8점, Claude Code 내부 +19.1점 올랐다.
- **전이성(transfer)**: 최적화된 skill 산출물이 모델 규모를 넘나들고, Codex ↔ Claude Code harness 사이를 넘나들며, 추가 최적화 없이 인접 벤치마크로도 전이됐다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- README는 개요 중심이라, ablation·per-cell 세부 결과와 한계 논의는 논문(arXiv:2605.23904)으로 넘긴다. 저장소만으로는 실패 사례나 비용 한계를 판단하기 어렵다.
- SkillOpt-Sleep은 아직 preview 단계다. 결과·사용법은 `docs/sleep/README.md`에 있으나 이 raw 스냅샷에는 담기지 않았다.

## 6. 관련 연구 (Related Work)

- 대비 대상: hand-crafted skill, 강력 LLM의 one-shot 생성, 느슨한 self-revision 기반 skill 진화.
- 통합 사례: gbrain, gbrain-evals, darwin-skill 프로젝트가 SkillOpt를 통합했다(2026-06-03).
- 개념적 인접: prompt optimization, agentic loop 자기개선, agent skill(Claude Code 등의 skill 문서 패턴).

## 7. 용어집 (Glossary)

- **skill document**: 에이전트에게 주입하는 텍스트 지침 문서. SkillOpt에서는 이것이 학습 대상(trainable state)이다.
- **frozen agent**: 가중치를 고정한 채 skill 문서만 바꾸는 대상 모델.
- **held-out validation gate**: 편집 후보를 받아들일지 결정하는, 훈련에 쓰지 않은 검증 집합 기준.
- **rejected-edit buffer**: 거부된 편집을 모아 재발산을 억제하는 버퍼.
- **textual learning rate**: 한 스텝에서 허용하는 편집 폭(예산)을 텍스트 공간으로 표현한 개념.
- **harness**: skill이 실행되는 실행 환경(direct chat, Codex CLI, Claude Code CLI).
- **rollout**: 현재 skill로 태스크를 실제 수행해 점수를 얻는 과정.
