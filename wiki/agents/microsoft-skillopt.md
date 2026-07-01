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

## 요약 (Summary)

SkillOpt은 agent skill 문서를 얼어붙은(frozen) 모델의 학습 가능한 상태로 보고 딥러닝 옵티마이저처럼 훈련하는 Microsoft 오픈소스 프레임워크다. epoch·(mini-)batch size·learning rate·validation gate를 텍스트 공간에 대응시키면서도 모델 가중치는 손대지 않는다. 채점된 rollout은 별도의 optimizer 모델이 skill 문서에 대한 add/delete/replace 편집으로 바꾸고, held-out validation 점수가 엄격히 개선될 때만 그 편집을 확정한다. 배포 산출물은 300~2,000 토큰 규모의 `best_skill.md` 한 장뿐이라, 추론 시점에 모델 호출을 조금도 늘리지 않는다.

## 주요 기여 (Key Contributions)

- **skill 문서 = 학습 대상**: 손으로 만들거나 강력한 LLM이 한 번에 생성하거나 느슨한 self-revision으로 진화시키던 기존 방식과 달리, skill 문서 자체를 옵티마이저가 재현 가능하게 훈련하는 파라미터로 놓았다.
- **6단계 훈련 루프**: rollout → reflect → aggregate → select → update → evaluate.
- **안정화 3종 세트**: textual learning-rate budget, rejected-edit buffer, epoch 단위 slow/meta update가 skill 훈련이 발산하지 않도록 붙든다.
- **배포 비용 0**: 가중치를 그대로 둔 target 모델에 `best_skill.md`만 붙이므로 inference-time 모델 호출이 늘지 않는다.
- **다중 백엔드·벤치마크**: OpenAI / Azure / Claude / Qwen / MiniMax 백엔드, 6개 내장 벤치마크, WebUI 대시보드를 제공한다 (PyPI `skillopt` v0.1.0).

## 방법론 및 아키텍처 (Methodology and Architecture)

**훈련 루프.** rollout(현재 skill로 태스크 수행)에서 점수를 얻은 뒤 reflect(반성) → aggregate(신호 취합) → select(후보 편집 선별) → update(문서 편집 적용) → evaluate(held-out 검증) 순으로 돈다. 편집은 검증 점수가 엄격히 오를 때만 살아남는다. optimizer 모델은 single skill document에 **bounded** add / delete / replace 편집만 가해 한 스텝의 변화 폭을 통제한다. learning rate는 여기서 편집 예산(budget) 형태로 텍스트 공간에 나타난다.

**백엔드·벤치마크 확장.** 백엔드는 chat/exec target 단위(`openai_chat`, `claude_chat`, `codex_exec`, `claude_code_exec` 등)로 정의한다. 신규 백엔드는 `skillopt/model/<name>_backend.py` 모듈을 추가하고 라우터에 연결하면 된다. 벤치마크는 `dataloader.py`·`rollout.py`·seed skill `initial.md`를 담은 `skillopt/envs/<name>/` 패키지로 정의한다.

**SkillOpt-Sleep (preview).** 로컬 코딩 에이전트(Claude Code / Codex / Copilot)를 위한 야간 오프라인 self-evolution 동반 도구다. 과거 세션을 리뷰하고 반복 태스크를 replay한 뒤, 검증된 skill을 held-out gate 뒤에서 통합한다.

## 결과 (Results)

- **평가 격자**: 6개 벤치마크 × 7개 target 모델 × 3개 실행 harness(direct chat, Codex CLI, Claude Code CLI).
- **전면 우위**: 평가한 52개 (model, benchmark, harness) 셀 전부에서 best 또는 tied-best.
- **GPT-5.5 향상 폭**: no-skill 대비 평균 정확도가 direct chat +23.5점, Codex agentic loop +24.8점, Claude Code +19.1점.
- **전이성**: 최적화된 skill은 모델 규모를 넘나들고 Codex ↔ Claude Code harness 사이를 오가며, 추가 최적화 없이 인접 벤치마크로도 전이됐다.

> 세부 ablation·per-cell 결과와 한계 논의는 논문(arXiv:2605.23904)에 있고, 이 위키는 저장소 README 스냅샷에 근거한다.

## 관련 페이지 (Related Pages)

- [[agents/lin-2026-harness-updating-is-not-harness-benefit]] — self-evolving 에이전트의 이득을 base capability / harness-updating / harness-benefit로 분리한 연구. SkillOpt이 "skill 편집으로 얻는 harness-benefit"을 held-out gate로 통제하는 방식과 직접 맞닿는다.
- [[agents/dennis-2026-compiling-agentic-workflows-into-llm]] — orchestration을 **모델 가중치**로 컴파일하는 접근. SkillOpt은 정반대로 가중치를 얼리고 **텍스트 문서**만 훈련한다 — 대조 축.
- [[agents/osmani-2026-loop-engineering]] — skill을 loop의 한 요소로 보는 Loop Engineering. SkillOpt은 그 skill 요소를 자동 최적화 대상으로 끌어올린다.
- [[applications/garrytan-gbrain]] — markdown-first agent memory에 skill pack을 결합한 OSS. 2026-06-03 SkillOpt를 통합했다고 README에 명시.
- [[agents/patel-2026-beyond-the-prompt-claude-code]] — Claude Code의 skill·메모리 운영 매뉴얼. SkillOpt의 `claude_code_exec` harness와 SkillOpt-Sleep이 겨냥하는 실전 환경.
