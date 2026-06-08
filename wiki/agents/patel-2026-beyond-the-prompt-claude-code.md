---
title: "Beyond the Prompt: Claude Code (Arpan Patel, 2026-05-26)"
type: article
year: 2026
category: agents
raw_path: /home/sguys99/project/ai-wiki/raw/articles/patel-2026-beyond-the-prompt-claude-code.md
raw_filename: "patel-2026-beyond-the-prompt-claude-code.md"
source_collection: external
source: patel-2026-beyond-the-prompt-claude-code.md
author: "Arpan Patel"
url: "https://arps18.github.io/posts/claude-code-mastery/"
publisher: "Arpan Patel Blog (arps18.github.io)"
publication_date: "2026-05-26"
tags: [claude-code, claude-md, claude-local-md, skills, subagents, mcp, plugins, slash-commands, plan-mode, rewind, goal, ralph-loop, worktree, obsidian, boris-cherny, cat-wu, anthropic, agentic-development, context-engineering]
---

## 요약 (Summary)

Arpan Patel이 2026-05-26 개인 블로그에 올린 27분 분량 Claude Code 실전 가이드. 글 전체를 관통하는 mental shift는 하나다 — *"Claude Code를 터미널 속 dressed-up autocomplete가 아니라 guardrail이 필요한 programmable agent로 다뤄라"*. 그 위에서 핵심 원리 **give Claude a way to verify its own work**(Boris Cherny가 2~3x 품질 향상으로 지목)를 시작으로 `.claude/` 디렉토리의 계층적 config, `CLAUDE.md`/`CLAUDE.local.md` 작성법, Skills·Subagents·Plugins·MCP, underused 슬래시 커맨드(`/goal`·`/rewind`·`/compact`·`/batch`·`/voice`), Obsidian 3-tier 메모리까지 망라한다.

글을 관통하는 thesis는 *"프롬프트가 아니라 설정이 진짜 일(setup is the work)"* 이다 — 디렉토리 레이아웃·skill·subagent·plugin·MCP를 갖추는 infra 작업이 prompt engineering보다 leverage가 크다. 반복되는 실천 규칙은 이렇다. (1) **plan mode로 explore→plan→code**(`Shift+Tab` 2회, 멀티파일 변경 시 필수, `Ctrl+G`로 플랜 편집), (2) 실수할 때마다 *"Update CLAUDE.md so you don't repeat this"* 로 룰을 복리로 쌓기 — Boris가 **"Compounding Engineering"**으로 부르는 패턴, (3) **subagent로 context isolation**(대량 파일 탐색을 메인 세션 오염 없이), (4) **3~5개 worktree 병렬 세션**(Boris·Cat Wu가 단일 최대 productivity unlock으로 지목), (5) **verification 없이 success 주장 금지**(*"trust-then-verify gap이 bad output의 최대 원천"*).

Anthropic 팀(Boris Cherny·Cat Wu·Thariq)의 실제 습관 12가지를 따로 정리하는데, 그 정점은 *"auto mode + `/focus` + `/goal` 로 brief 쓰고 walk away → finished PR로 복귀"*(Opus 4.7 권장)다.

> **2차 자료 주의**: Boris Cherny의 *"2~3x"*·Cat Wu 인용 같은 핵심 수치·발언에는 원 출처(영상·X 스레드 timestamp)가 거의 없고, resource로 명시된 것은 "How Boris Uses Claude Code"와 Anthropic blog뿐이다. `/goal`·`/teleport`·`/voice`·`--bare`·`CLAUDE_CODE_AUTO_COMPACT_WINDOW` 등은 특정 버전 기능이라 바뀔 수 있다(Opus 4.7은 2026-05 시점 기준). 저자 1인칭 사례(약 2,000개 컴포넌트 React→Vue 마이그레이션, port 22360 Obsidian MCP)는 특정 셋업을 전제로 하며, 저자 본인도 *"your setup and mileage will look different"* 라고 못박는다.

## 주요 기여 (Key Contributions)

1. **"programmable agent" mental model** — *"casual user는 첫 제안을 받아 dressed-up autocomplete로 쓰지만, 나는 programmable agent로 운영한다"*. 검증 루프가 없으면 사용자가 유일한 feedback signal이지만, 있으면 Claude가 코드가 돌 때까지 iterate한다(Boris Cherny: 2~3x 품질).
2. **`.claude/` 계층적 config 해부** — project(`.claude/`, committed)/global(`~/.claude/`) 2 scope, 파일별 commit 표, monorepo `CLAUDE.md` cascade, `rules/*.md` path-gating, *"skills > commands"*.
3. **Boris식 `CLAUDE.md`** — 짧게(*"이 줄을 지우면 Claude가 실수하나? 아니면 잘라라"*) + Claude가 스스로 룰 작성. Claude Code 팀 실제 파일(bun 워크플로우만, style 취향 없음) + `@claude add to CLAUDE.md ...` = **Compounding Engineering**.
4. **`CLAUDE.local.md`** — gitignore. PR 리뷰 코멘트를 즉시 개인 룰로 쌓는다(*"리뷰어가 free training data를 준다"*), project/personal 섹션 분리 + 주기적 prune.
5. **Skills 심화** — progressive disclosure(description ~100토큰만 상시 로드) · 폴더 단위(templates 동거) · inline shell(`!`). 커뮤니티 레포 + Anthropic 공식 skill 카탈로그.
6. **Custom Subagent** — `.claude/agents/*.md`, isolated context + scoped permission. `/pr-review` 예시(read-only tools 의도 — *"패치 가능한 리뷰어는 self-fix를 rationalize"*, "Do NOT flag" 섹션이 출력을 usable하게), `isolation: worktree` 병렬화.
7. **Plugins & Marketplace** — `/code-review`·`/feature-dev`·Language server plugin(팀이 highest-leverage 지목)·`/security-guidance`.
8. **Underused 커맨드** — `/insights`·`/compact`·`/rewind`·`/batch`·`/loop`·`/schedule`·`/teleport`·`/focus`·`/voice`·`--bare`. `/compact`(lossy 요약) vs `/clear`(직접 brief) 구분.
9. **`/goal` = built-in Ralph Loop** — verifiable·deterministic 조건이 충족될 때까지 자율 grind. auto mode·`/loop`·`/schedule`·`Stop` hook와 결합.
10. **MCP + Obsidian 3-tier 메모리** — MCP = *"coding agent를 system-aware로 만드는 wire"*. vault를 hot(daily log, Stop hook 자동 append)/warm(project note)/cold(ADR + atom) 3-tier로 운용, *"MCP를 다 깔지 마라 — tool list 비대화가 decision quality를 해친다"*.

## 방법론 및 워크플로우 (Methodology & Workflow)

### `.claude/` 2-scope 구조

| 파일 | scope | commit | 역할 |
|---|---|---|---|
| `CLAUDE.md` | project + global | O | 매 세션 로드 instruction |
| `CLAUDE.local.md` | project only | X (gitignore) | 개인 노트 |
| `settings.json` | project + global | O | permission·hook·env·model |
| `.mcp.json` | project only | O | 팀 공유 MCP |
| `skills/<name>/SKILL.md` | project + global | O | `/name` 호출 prompt |
| `agents/*.md` | project + global | O | subagent 정의 |
| `rules/*.md` | project + global | O | topic-scoped, path-gate 가능 |

- **Mental model**: project 파일 = 프로젝트를 기술, global 파일 = 나를 기술.

### 일상 워크플로우 (저자 권고)

- **새 기능**: plan mode → `Ctrl+G`로 플랜 편집 → 구현 → `/pr-review` subagent 또는 fresh 세션 리뷰.
- **버그**: 재현 먼저 → `cat error.log | claude` 로 파이프 → 실패 테스트 작성 → red 확인 후 fix(*"이 단계를 건너뛴 fix는 양복 입은 추측"*).
- **마이그레이션/대량 변경**: `/batch` — 인터뷰 후 worktree별 병렬 에이전트로 fan-out, 각자 테스트 + PR. 저자는 약 2,000개 컴포넌트 React→Vue를 이 패턴으로 처리.
- **Writer/Reviewer 패턴**: 세션 A 구현 → 세션 B가 fresh context로 리뷰 → 리뷰를 A로 복사 → B가 더 불평 안 할 때까지 반복.

### `/goal` 운영 규칙 (Ralph Loop)

```
/goal all integration tests in tests/api pass without flaking 3 runs in a row
/goal docker compose up runs cleanly and the healthcheck endpoint returns 200
/goal coverage on src/billing/ is above 80% and all new tests are not placeholders
```

조건은 **검증 가능·결정론적**이어야 한다(테스트 통과·CLI exit code·grep 가능한 file state). *"'the code is good'는 이미 진 것"*.

### Obsidian 3-tier 메모리

| tier | 위치 | 메커니즘 |
|---|---|---|
| **Hot** | `10-Daily/<today>.md` | 세션 종료 시 `Stop` hook가 timestamp 엔트리 자동 append |
| **Warm** | `20-Projects/<proj>/` | 세션 시작 시 README + 최근 2~3 session log를 먼저 읽음 |
| **Cold** | `30-Decisions/`(ADR) · `40-Atoms/`(wikilink) | 정착된 결정을 ADR로 승격, 재사용 지식을 atom으로 distill |

`obsidian-claude-code-mcp`가 vault를 local WebSocket(port 22360)으로 노출하고, vault 루트의 `CLAUDE.md`가 폴더 레이아웃을 알린다.

## Anthropic 팀 습관 12선 (Tips From the Team)

verify loop(Boris의 최다 반복 포인트) · Opus high/xhigh effort 기본 · 3~5 병렬 worktree 세션(*"단일 최대 productivity unlock"*) · per-project notes 디렉토리 · `/techdebt` 커맨드 · 팀 공유 `CLAUDE.md` 주 수회 갱신 · `Esc` 2회 rewind · UI는 Playwright MCP · language server plugin · `/voice`(말하기 3x 빠름) · auto + `/focus` + `/goal` · `Ctrl+G` 플랜 편집 · 새 코드베이스는 ASCII diagram 요청.

## 관련 페이지 (Related Pages)

- [[etc/rahman-2026-a-practical-guide-to-becoming]] — Shah Rahman(Meta Ads)의 AI-Native Engineer 가이드. 본 글이 *Claude Code 단일 도구의 설정·운영* 매뉴얼이라면, Rahman 글은 *조직/팀 차원* 처방이다(ADLC·4 Core Practices·security guardrails). 둘은 같은 "engineer → orchestrator" 패러다임을 추상도만 달리해 다루며, context engineering·verification·multi-agent orchestration·MCP를 공통 핵심으로 공유한다.
