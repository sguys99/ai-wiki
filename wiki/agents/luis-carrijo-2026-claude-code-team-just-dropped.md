---
title: "Claude Code team just dropped a free course on loop engineering with Fable 5"
type: video
year: 2026
category: agents
raw_path: raw/videos/luis-carrijo-2026-claude-code-team-just-dropped.md
raw_filename: "luis-carrijo-2026-claude-code-team-just-dropped.md"
source_collection: external
source: luis-carrijo-2026-claude-code-team-just-dropped.md
channel: "Luis Carrijo"
url: "https://www.youtube.com/watch?v=RjLlIC9InDI"
duration: "1:01:05"
tags: [claude-code, agentic-loop, dynamic-workflow, auto-mode, permissions, skills, fable-5, vertex-ai]
---

## 요약 (Summary)

Claude Code harness의 내부 동작 원리부터 permissions, skills, auto mode, dynamic workflow까지 실제 데모와 함께 설명한 1시간 강좌. Anthropic의 Lydia Haley("Avocoder")와 CS Dojo의 YK Sugi(Claude Code Tips 저장소 저자)가 출연해 각각 설계 의도와 실전 운영 팁을 설명한다.

## 주요 기여 (Key Contributions)

- Claude Code harness의 prompt 조립 과정을 처음으로 공개적으로 시각화
- Auto mode 설계 철학(permission fatigue 해결, classifier 기반 판단)을 Anthropic이 직접 설명
- Dynamic workflow 기능 첫 데모 — JavaScript 파일로 결정론적 subagent 오케스트레이션
- Intent-driven development 개념을 실제 3D slingshot 게임 빌드로 구현

## Harness와 agentic loop

모델은 stateless다. 매 호출마다 harness가 tool schemas, system prompt, 환경 정보, CLAUDE.md 내용, skills 목록, 대화 이력을 하나의 큰 request로 조립해 API에 보낸다. 모델은 직접 파일을 읽거나 명령을 실행하지 못한다. tool call을 harness에 넘기면 harness가 실행한다.

```
입력 → harness가 prompt 조립 → API 호출 → 모델이 tool call 반환 → harness 실행 → tool result 추가 → 재조립 → 반복
```

Skills 목록은 이름·설명만 첫 메시지에 포함된다(progressive disclosure). 사용자가 호출해야 본문이 로드된다.

## Permissions 계층

`claude_settings.json`으로 tool call의 허용·거부·질문을 제어한다. 계층은 enterprise > user > project 순으로 상위가 우선한다. `/fewer-permission-prompts` 슬래시 커맨드는 기존 transcript를 분석해 자주 허용한 tool call을 자동으로 allowlist에 추가한다.

## Auto mode

기존 방식의 두 극단을 보완한다. 전면 ask 방식은 permission fatigue(계속 묻다 보면 사용자가 무감각해짐)를 유발한다. 반대로 `--dangerously-skip-permissions`는 위험하다. Auto mode는 두 방식 사이에서 classifier로 tool call의 위험도를 실시간 판단해 위험한 것만 묻는다. prompt injection에도 강하고 사용자가 명시적으로 요청한 작업(예: "이 폴더 삭제해")은 묻지 않는다.

활성화: `export CLAUDE_CODE_ENABLE_AUTO_MODE=1`

Google Cloud Agent Platform에서는 기본 비활성화이므로 환경변수를 직접 설정해야 한다.

## Skills

반복 수행 절차를 markdown 파일에 저장한 것. `/skill-creator` 내장 커맨드로 인터랙티브하게 생성. frontmatter로 모델 고정(`model: sonnet`), 사용자 전용 slash command(`disable_model_invocation: true`), 모델 전용(`user_invocable: false`), 인자 전달(`{{args}}`) 등을 제어한다.

Lydia 노트: 두 키(`disable_model_invocation` / `user_invocable`)가 서로 반대 방향이라 직관적이지 않다 — 추후 단일 키로 통합 예정.

## Dynamic workflow

자연어로 "use a dynamic workflow"를 프롬프트에 포함하면, Claude가 JavaScript 파일을 생성해 subagent 오케스트레이션을 결정론적으로 수행한다. build·integration·review·verify 같은 phase로 나뉜다. 같은 phase 내 subagent들은 병렬 실행된다.

YK Sugi 시연에서 `/workflows`로 확인한 구조 예시 (slingshot 게임 리빌드):
- Build phase (병렬): build-engine, build-UI, build-audio, build-levels-haptics
- Integration phase
- Review phase
- Verify phase

`S`를 눌러 저장하면 slash command로 재실행 가능. 저장된 JS 파일을 직접 편집해 특정 subagent의 모델을 바꿀 수도 있다(예: 단순 빌드 작업은 Sonnet으로 교체).

Fable 5는 모델 크기가 커 응답이 느리다는 점은 데모에서도 언급됐다.

## Intent-driven development

YK Sugi가 강조한 개념. 어떻게 만들지(how)보다 무엇을 만들지(what)를 명확히 표현하는 방식. 모르는 부분은 먼저 묻고 알면 바로 지시한다. 음성 입력이 타이핑보다 의도를 더 빠르게 전달하는 경향이 있다.

Lydia Haley: "소프트웨어 엔지니어의 역할이 점점 product manager에 가까워지고 있다. 코드 문법보다 architecture·feature·한계를 이해하는 게 더 중요해졌다."

## 실전 관찰

수치 벤치마크는 없으나, 눈에 띄는 사례 두 가지가 있다.

- Lydia: Claude Code로 PR에 코드 리뷰 봇을 연동하면 CI 실패나 팀원 코멘트 발생 시 자동으로 수정 후 push — 팀 전체가 "loop 밖"에 있어도 CI가 green 상태를 유지.
- YK Sugi: 부동산 구매 시 Claude Code로 realtor 이메일 목록을 추출해 직접 연락, 중개 수수료 $10,000 절감.

## 관련 페이지 (Related Pages)

- [[agents/osmani-2026-loop-engineering|Loop Engineering (Addy Osmani)]] — loop 구조 설계 원칙, automations·worktrees·skills·connectors·sub-agents 5+1 요소
- [[agents/lee-jeongmin-2026-loop-engineering-claude-code|Loop Engineering · Claude Code · RLM (Jeongmin Lee)]] — dynamic workflow 설계 의도를 RLM 이론과 연결
- [[agents/kang-2026-no-longer-prompting-claude|더 이상 Claude를 프롬프팅하지 않습니다 (Sujin Kang)]] — Prompt → Context → Harness → Loop 4단계 전환 개요
- [[agents/lee-hoyeon-2026-harness-engineering|Harness Engineering (Team Attention)]] — harness 개념과 6축 순환을 Claude Code 사례로 엮은 한국어 자료
- [[agents/anthropic-2025-effective-context-engineering-for-ai|Context Engineering (Anthropic)]] — harness가 조립하는 context의 설계 원칙
