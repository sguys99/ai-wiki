---
title: "Claude Code team just dropped a free course on loop engineering with Fable 5"
type: video
year: 2026
category: agents
raw_path: raw/videos/luis-carrijo-2026-claude-code-team-just-dropped.md
raw_filename: "luis-carrijo-2026-claude-code-team-just-dropped.md"
source_collection: external
channel: "Luis Carrijo"
url: "https://www.youtube.com/watch?v=RjLlIC9InDI"
duration: "1:01:05"
tags: [claude-code, agentic-loop, dynamic-workflow, auto-mode, permissions, skills, fable-5, vertex-ai]
---

## 한 줄 요약 (One-line Summary)

Claude Code의 내부 동작 원리(harness·agentic loop)부터 permissions, skills, auto mode, dynamic workflow까지 실제 데모와 함께 설명한 1시간 강좌. Anthropic의 Lydia Haley와 CS Dojo의 YK Sugi가 출연.

## 1. 자료 정보 (Document Information)

- **채널**: Luis Carrijo
- **출연**: Lydia Haley (Anthropic, "Avocoder"), YK Sugi (CS Dojo, Claude Code Tips 저자)
- **업로드**: 2026-07-09
- **길이**: 1:01:05
- **플랫폼**: Google Cloud Agent Platform 데모 포함

## 2. 주요 기여 (Key Contributions)

- Claude Code harness의 prompt 조립 과정을 처음으로 공개적으로 시각화
- Auto mode의 설계 철학(permission fatigue 해결, classifier 기반 판단)을 Anthropic이 직접 설명
- Dynamic workflow 기능 첫 데모 — JavaScript 파일로 결정론적 subagent 오케스트레이션
- Intent-driven development 개념을 실제 3D slingshot 게임 빌드로 구현

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### Harness와 agentic loop

모델은 stateless다. 매 호출마다 harness가 tool schemas, system prompt, 환경 정보, CLAUDE.md 내용, skills 목록, 대화 이력을 하나의 큰 request로 조립해 API에 보낸다. 모델은 직접 파일을 읽거나 명령을 실행하지 못한다. tool call을 harness에 넘기면 harness가 실행한다.

```
입력 → harness가 prompt 조립 → API 호출 → 모델이 tool call 반환 → harness 실행 → tool result 추가 → 재조립 → 반복
```

### Permissions 계층

`claude_settings.json`으로 tool call의 허용·거부·질문을 제어한다. 계층은 enterprise > user > project 순으로 상위가 우선한다. `/fewer-permission-prompts` 슬래시 커맨드는 기존 transcript를 분석해 자주 허용한 tool call을 자동으로 allowlist에 추가한다.

### Auto mode

기존 방식의 두 극단을 보완한다. 전면 ask 방식은 permission fatigue(계속 묻다 보면 사용자가 무감각해짐)를 유발한다. 반대로 `--dangerously-skip-permissions`는 위험하다. Auto mode는 두 방식 사이에서 classifier로 tool call의 위험도를 실시간 판단해 위험한 것만 묻는다. prompt injection에도 강하고 사용자가 명시적으로 요청한 작업(예: "이 폴더 삭제해")은 묻지 않는다.

활성화: `export CLAUDE_CODE_ENABLE_AUTO_MODE=1`

### Skills

반복 수행 절차를 markdown 파일에 저장한 것. `/skill-creator` 내장 커맨드로 인터랙티브하게 생성. frontmatter로 모델 고정(`model: sonnet`), 사용자 전용 slash command(`disable_model_invocation: true`), 모델 전용(`user_invocable: false`), 인자 전달(`{{args}}`) 등을 제어한다.

### Dynamic workflow

새 기능. 자연어로 "use a dynamic workflow"를 프롬프트에 포함하면, Claude가 JavaScript 파일을 생성해 subagent 오케스트레이션을 결정론적으로 수행한다. build·integration·review·verify 같은 phase로 나뉜다. 같은 phase 내 subagent들은 병렬 실행된다. `/workflows` 커맨드로 실행 내역 확인, `S`를 눌러 저장하면 slash command로 재실행 가능.

YK Sugi의 시연에서 `/workflows`로 확인한 구조 예시:
- Build phase (병렬): build-engine, build-UI, build-audio, build-levels-haptics
- Integration phase
- Review phase
- Verify phase

### Google Cloud Vertex AI 통합

`/setup-vertex` wizard로 설정. Opus 4.6, Fable 5 모델 접근 가능. agent platform에서는 auto mode가 기본 비활성화 → 환경변수로 수동 활성화 필요.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

수치 벤치마크는 없으나, 실전 관찰 두 가지가 눈에 띈다.

- Lydia Haley: Claude Code로 PR에 코드 리뷰 봇을 연동하면 CI 실패나 팀원 코멘트 발생 시 자동으로 수정 후 push — 팀 전체가 "loop 밖"에 있어도 CI가 green 상태를 유지한다고 설명.
- YK Sugi: 부동산 구매 시 Claude Code로 realtor 이메일 목록을 추출해 직접 연락, 중개 수수료 $10,000 절감.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- Dynamic workflow는 비결정론적 요소(Claude가 생성하는 JS 파일의 내용이 매번 다를 수 있음)가 존재. 저장된 workflow를 재사용할 때는 결정론적.
- Fable 5는 모델 크기가 커 응답이 느리다고 Lydia가 언급.
- Auto mode는 agent platform에서 기본 비활성화. 별도 환경변수 설정 필요.
- skills의 `disable_model_invocation`과 `user_invocable` 두 frontmatter 키가 서로 반대 방향이라 직관적이지 않다고 Lydia가 인정 — 추후 단일 키로 통합 예정.

## 6. 관련 연구 (Related Work)

- YK Sugi의 Claude Code Tips 저장소 — 커뮤니티 팁 8,000+ 스타
- Claude Code 공식 문서 (tool schemas, permissions, skills)
- Claude Design (디자인·프레젠테이션 생성 도구, research preview)
- Claude co-work — 비개발 업무(이메일, 캘린더, 파일 관리)용 harness, 내부적으로는 Claude Code 런타임 사용

## 7. 용어집 (Glossary)

| 용어 | 설명 |
|---|---|
| harness | Claude Code의 실행 환경. API 호출, tool 실행, 상태 관리를 담당 |
| agentic loop | 모델 호출 → tool call → 실행 → 결과 추가 → 재호출의 반복 사이클 |
| auto mode | classifier 기반 permission 판단 모드. 위험한 tool call만 사용자에게 묻는다 |
| permission fatigue | 계속 묻는 permission 방식에 익숙해져 사용자가 확인 없이 허용하는 현상 |
| dynamic workflow | Claude가 생성한 JS 파일로 subagent를 결정론적으로 오케스트레이션하는 기능 |
| intent-driven development | 어떻게 만들지(how)보다 무엇을 만들지(what)를 명확히 표현하는 개발 방식 |
| skill | 반복 절차를 저장한 markdown 파일. slash command 또는 model-invocable로 실행 |
| Fable 5 | Anthropic의 대형 모델(데모에서 사용). Vertex AI에서 접근 가능 |
| Claude Design | 프롬프트 기반 디자인·슬라이드 생성 도구, research preview |
| Claude co-work | 비개발 업무용 Claude 인터페이스, Claude Code 런타임 기반 |
