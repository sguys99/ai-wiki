---
title: "Beyond the Prompt: Claude Code — 설정·메모리·워크플로우 마스터리 실전 가이드 (Arpan Patel, 2026-05-26)"
type: article
year: 2026
category: agents
raw_path: /home/sguys99/project/ai-wiki/raw/articles/patel-2026-beyond-the-prompt-claude-code.md
raw_filename: "patel-2026-beyond-the-prompt-claude-code.md"
source_collection: external
author: "Arpan Patel"
url: "https://arps18.github.io/posts/claude-code-mastery/"
publisher: "Arpan Patel Blog (arps18.github.io)"
publication_date: "2026-05-26"
tags: [claude-code, claude-md, claude-local-md, skills, subagents, mcp, plugins, slash-commands, plan-mode, rewind, goal, ralph-loop, worktree, obsidian, boris-cherny, cat-wu, anthropic, agentic-development, context-engineering]
---

## 한 줄 요약 (One-line Summary)

개인 블로그(arps18.github.io) 2026-05-26 long-form 가이드(27분 분량) — Arpan Patel이 *"Claude Code를 터미널 속 dressed-up autocomplete가 아니라 guardrail이 필요한 programmable agent로 다루라"*는 한 가지 mental shift를 축으로 삼아, 핵심 원리(**give Claude a way to verify its own work** — Boris Cherny가 2~3x 품질 향상으로 지목)부터 `.claude/` 디렉토리의 계층적 config 구조, `CLAUDE.md`/`CLAUDE.local.md` 작성법, Skills·Subagents·Plugins·MCP, 그리고 underused 슬래시 커맨드(`/goal`·`/rewind`·`/compact`·`/batch`·`/voice` 등)와 Obsidian 3-tier 메모리 워크플로우까지 망라한다. 일관된 thesis는 *"프롬프트가 아니라 설정이 진짜 일(setup is the work)"* — 디렉토리 레이아웃·skill·subagent·plugin·MCP를 갖추는 infra 작업이 prompt engineering보다 leverage가 크다는 것이다. 반복되는 실천 규칙은 (1) **plan mode로 explore→plan→code** (`Shift+Tab` 2회, 멀티파일 변경 시 필수), (2) *"실수할 때마다 'Update CLAUDE.md so you don't repeat this'"* 로 룰을 복리로 축적("Compounding Engineering"), (3) **subagent로 context isolation**(50개 파일 탐색을 메인 세션 오염 없이), (4) **3~5개 worktree 병렬 세션**(Boris/Cat Wu가 단일 최대 productivity unlock으로 지목), (5) **verification 없이 success 주장 금지**다. Anthropic 팀(Boris Cherny·Cat Wu·Thariq)의 실제 습관 12가지를 별도로 정리했다. 인용 다수는 Boris Cherny와 Cat Wu의 공개 발언이며, 저자 본인의 1인칭 경험(약 2,000개 컴포넌트 React→Vue 마이그레이션 등)을 섞은 personal takeaway 성격이다.

## 1. 자료 정보 (Document Information)

- **형식**: 개인 기술 블로그(GitHub Pages, arps18.github.io)의 long-form 실전 가이드, ~27분 분량
- **저자**: **Arpan Patel** (블로그 핸들 `arps18`) — Claude Code 일상 사용 경험을 정리한 1인칭 가이드, 연락처 arpanpatel.contact@gmail.com
- **발행일**: **2026-05-26**
- **URL**: <https://arps18.github.io/posts/claude-code-mastery/>
- **분량/성격**: 12개 섹션 + Closing Notes. 코드/커맨드 예시 다수(ASCII), 표 다수. **2차 자료** 성격 — Anthropic 공식 문서·Boris Cherny의 talk/X 스레드·Cat Wu 발언·커뮤니티 레포(mattpocock/skills, awesome-claude-code-subagents 등)를 종합·재구성하고 저자 경험을 덧댄 큐레이션 가이드다.
- **시각 요소**: Claude Code 아이콘(LobeHub, Apache 2.0) 1점 + ASCII 코드 예시. 별도 도식/차트는 없어 `figures` 키를 생략한다.
- **본 wiki 내 인접 자료**: [[etc/rahman-2026-a-practical-guide-to-becoming|Shah Rahman의 AI-Native Engineer 가이드]]가 *조직/팀 차원*의 AI-native engineering 처방(ADLC·4 Core Practices·security guardrails)이라면, 본 글은 *Claude Code 단일 도구의 설정/운영 차원* 실무 매뉴얼이다 — 둘은 같은 "engineer → orchestrator" 패러다임의 추상도가 다른 짝이다.

## 2. 주요 기여 (Key Contributions)

1. **"programmable agent" mental model 정립** — *"casual user는 프롬프트를 치고 첫 제안을 받아 dressed-up autocomplete로 다루지만, 나는 programmable agent로 운영한다"*. 핵심 원리는 **give Claude a way to verify its own work**(Boris Cherny, 2~3x 품질 향상)다. 검증 루프가 없으면 사용자가 유일한 feedback signal이지만, 있으면 Claude가 코드가 실제로 돌 때까지 iterate한다.
2. **`.claude/` 디렉토리를 계층적 config 시스템으로 해부** — 2개 scope(project `.claude/` committed / global `~/.claude/`), 파일별 commit 여부 표(`CLAUDE.md`·`CLAUDE.local.md`·`settings.json`·`.mcp.json`·`skills/`·`commands/`·`agents/`·`rules/`), monorepo `CLAUDE.md` cascade, `rules/*.md` path-gating(glob), *"skills가 commands보다 낫다"*(supporting file·`disable-model-invocation`·allowed-tools·agent override 지원).
3. **Boris식 `CLAUDE.md` 작성 철학** — 두 원칙: (a) **짧게** (*"이 줄을 지우면 Claude가 실수하는가? 아니면 잘라라"* — knowledge base가 아니라 guardrail), (b) **Claude가 스스로 룰을 쓰게** (*"Update CLAUDE.md so you don't repeat this"*). Claude Code 팀의 실제 `CLAUDE.md`(주 수회 갱신, bun 워크플로우·typecheck·single-test·pre-PR ritual만, style 취향·코드베이스 투어 없음) + `@claude add to CLAUDE.md ...` PR 코멘트 = **"Compounding Engineering"**. `@path` import로 파일을 분할한다.
4. **`CLAUDE.local.md` = PR 피드백 daily driver** — gitignore, PR 리뷰 코멘트를 즉시 붙여넣어 개인 룰 파일로 축적한다. project-specific 섹션과 personal habit 섹션을 분리하고 수주 후 prune하라고 권고한다. *"리뷰어가 free training data를 주는 셈"*.
5. **Skills 심화** — 폴더 = 슬래시 커맨드, `SKILL.md` = frontmatter + instructions. 3대 강점: **progressive disclosure**(세션 시작 시 description ~100토큰만, 발화 시 전체 로드), **폴더 단위**(templates/·reference·script 동거), **inline shell**(`!` 라인 invocation 시 실행 후 출력 splice). Go HTTP handler 실전 skill 예시 + 커뮤니티 레포(mattpocock/skills `/grill-me`·`/tdd`·`/diagnose`, Jeffallan/claude-skills 66종, Anthropic 공식 `/code-review`·`/simplify`·`/batch`·`/webapp-testing`).
6. **Custom Subagent 설계** — `.claude/agents/*.md`, frontmatter(name·description·tools·model)로 isolated context + scoped permission + 별도 blast radius. `/pr-review` 에이전트 실전 예시(read-only tools 의도적 선택 — *"패치 가능한 리뷰어는 flag 대신 self-fix를 rationalize"* · `model: opus` · "Do NOT flag" 섹션이 출력을 usable하게). 커뮤니티 에이전트(security-reviewer·test-writer·debugger 등) + `isolation: worktree`로 병렬 마이그레이션.
7. **Plugins & Marketplace** — skills·hooks·subagents·MCP를 한 단위로 번들, `/plugin`·`/plugin marketplace add owner/repo`. day-one: `/code-review`(4 병렬 에이전트, confidence-scored)·`/feature-dev`(공식 마켓 최다 설치, 7 phase)·**Language server plugin**(팀이 highest-leverage로 지목)·`/security-guidance`.
8. **Underused 커맨드 카탈로그** — `/insights`·`/compact <hint>`·`/copy`·`/rewind`·`/btw`·`/context`·`/export`·`/branch`·`/batch`·`/loop`·`/schedule`·`/teleport`·`/focus`·`/voice`·`--bare`(non-interactive 최대 10x 빠른 startup). `/compact`(lossy LLM 요약) vs `/clear`(직접 작성 brief) 구분, `/rewind`(프롬프트마다 체크포인트, 세션 횡단) — *"that didn't work, try X 대신 rewind 후 재프롬프트"*.
9. **`/goal` = built-in Ralph Loop** — completion condition을 걸면 충족될 때까지 grind, 중단 시도마다 transcript 대조 검사. *"verifiable·deterministic한 조건을(테스트 통과·CLI exit code·grep 가능한 file state) — 'the code is good'는 이미 진 것"*. `/loop`·`/schedule`·`Stop` hook·**auto mode**와 결합한다. *"auto mode + `/focus` + `/goal` = brief 쓰고 walk away, finished PR로 복귀"*(Opus 4.7 권장 워크플로우).
10. **MCP as power tools + Obsidian 3-tier 워크플로우** — MCP = *"coding agent를 system-aware agent로 만드는 wire"*(GitHub·Context7·Sentry·Linear·Playwright·Figma·Postgres/Supabase·Slack). `.mcp.json`(팀) / `~/.claude.json`(개인), HTTP+OAuth(`claude mcp add --transport http ...`). Obsidian vault를 **hot(daily session log, Stop hook로 자동 append) / warm(project note, 세션 시작 시 최근 3개 로그 읽기) / cold(decision ADR + atom + wikilink)** 3-tier 메모리로 운용한다. *"MCP를 다 깔지 마라 — tool list 비대화가 decision quality를 해친다"*.
11. **Anthropic 팀 습관 12선** — verify loop · Opus high/xhigh effort 기본 · 3~5 병렬 worktree 세션 · per-project notes 디렉토리 · `/techdebt` 커맨드 · 팀 공유 `CLAUDE.md` 주 수회 갱신 · `Esc` 2회 rewind · UI는 Playwright MCP · language server plugin · `/voice`(말하기 3x 빠름) · auto+`/focus`+`/goal` · `Ctrl+G` 플랜 편집 · 새 코드베이스는 ASCII diagram 요청.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### `.claude/` 2-scope 구조

| 파일 | scope | commit | 역할 |
|---|---|---|---|
| `CLAUDE.md` | project + global | O | 매 세션 로드되는 instruction |
| `CLAUDE.local.md` | project only | X (gitignore) | 개인 project 노트 |
| `settings.json` | project + global | O | permission·hook·env·model 기본값 |
| `settings.local.json` | project only | X | 개인 override |
| `.mcp.json` | project only | O | 팀 공유 MCP 서버 |
| `skills/<name>/SKILL.md` | project + global | O | `/name`으로 호출하는 재사용 prompt |
| `commands/*.md` | project + global | O | 단일 파일 슬래시 커맨드 |
| `agents/*.md` | project + global | O | subagent 정의 |
| `rules/*.md` | project + global | O | topic-scoped instruction, path-gate 가능 |

- **Mental model**: project 파일 = 프로젝트를 기술, global 파일 = 나(사용자)를 기술.
- monorepo에서 `root/CLAUDE.md`와 `root/services/billing/CLAUDE.md`가 둘 다 cascade 로드.
- `rules/*.md`는 glob으로 path-gate — migrations 전용 가이드를 매 세션 `CLAUDE.md`로 bloat시키지 말 것.

### `/goal` 운영 규칙 (Ralph Loop)

```
/goal all tests in test/auth pass and the lint step is clean
/goal all integration tests in tests/api pass without flaking 3 runs in a row
/goal docker compose up runs cleanly and the healthcheck endpoint returns 200
/goal coverage on src/billing/ is above 80% and all new tests are not placeholders
```

조건은 **검증 가능·결정론적**이어야 한다 — 테스트 커맨드/CLI exit code/grep 가능한 file state에 묶을 것.

### Fan-out 마이그레이션 패턴 (저자 1인칭 사례: ~2,000개 컴포넌트 React→Vue)

```
for file in $(cat files.txt); do
  claude -p "Migrate $file from React to Vue. Return OK or FAIL." \
    --allowedTools "Edit,Bash(git commit *)" \
    --bare
done
```

task list 먼저 생성 → 3개 수동 sanity-check로 프롬프트 tighten → 나머지 unleash.

### Obsidian 3-tier 메모리

| tier | 위치 | 메커니즘 |
|---|---|---|
| **Hot** | `10-Daily/<today>.md` | 세션 종료 시 `Stop` hook가 timestamp 엔트리 자동 append |
| **Warm** | `20-Projects/<proj>/` | 세션 시작 시 README + 최근 2~3 session log를 먼저 읽음(2주 context를 ~30초 재수화) |
| **Cold** | `30-Decisions/`(ADR) · `40-Atoms/`(wikilink) | 정착된 아키텍처 결정을 ADR로 승격, 재사용 지식을 atom으로 distill |

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

- **정량 벤치마크 없음** — 본 글은 실험 논문이 아니라 실천 가이드다. 인용된 수치는 모두 2차/일화적이다:
  - *"검증 루프 = 2~3x 품질 향상"* (Boris Cherny, 출처 링크 없음)
  - *"`--bare`로 non-interactive startup 최대 10x"*
  - *"`/voice` 말하기가 타이핑보다 3x 빠름"*
  - *"context rot이 1M 모델에서 300~400k 토큰 부근 발생"* → `CLAUDE_CODE_AUTO_COMPACT_WINDOW=400000` 권고
  - *"mattpocock/skills 100k+ stars"*, *"plugins 1,000+ across 75+ marketplaces (2026 중반 기준)"*
  - 저자 1인칭: *"~2,000개 컴포넌트 마이그레이션을 fan-out으로 처리"*, *"`/pr-review` 에이전트를 미스된 null check 사건 후 제작"*
- **검증 가능성**: 슬래시 커맨드·frontmatter 키·환경변수·파일 경로 등 기술적 세부는 재현 가능하나, 품질 향상 수치는 출처가 없다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **출처 링크 부재**: Boris Cherny의 *"2~3x"*·Cat Wu 인용 등 핵심 수치/발언에 원 출처(talk 영상·X 스레드 timestamp)가 거의 없다 — "How Boris Uses Claude Code"(howborisusesclaudecode.com)와 Anthropic blog만 resource로 명시한다.
- **버전 의존성**: `/goal`·`/teleport`·`/voice`·auto mode·`--bare`·`CLAUDE_CODE_AUTO_COMPACT_WINDOW` 등은 특정 Claude Code 버전 기능이라 빠르게 변할 수 있다. *"Opus 4.7"* 명시는 2026-05 시점 기준이다.
- **개인 경험 일반화 주의**: 저자의 1인칭 사례(2,000 컴포넌트 마이그레이션, port 22360 Obsidian MCP 등)는 특정 셋업을 전제한다 — 저자 본인도 *"your setup and mileage will look different"* 라고 disclaimer를 단다.
- **커뮤니티 레포 star/plugin 수치**는 시점 snapshot이라 변동한다.

## 6. 관련 연구 (Related Work)

- **본 wiki 내**:
  - [[etc/rahman-2026-a-practical-guide-to-becoming|A Practical Guide to Becoming an AI-Native Engineer]] — 조직/팀 차원 AI-native engineering(ADLC·4 Core Practices·security). 본 글의 도구-차원 실무 매뉴얼과 추상도가 다른 짝이다. 둘 다 context engineering·verification·multi-agent orchestration·MCP를 핵심으로 공유한다.
- **글이 인용한 외부 자료**(웹 검색 금지 — 인용 사실만 기록):
  - Anthropic 공식 docs(code.claude.com/docs), Anthropic blog "Best practices for Opus 4.7 with Claude Code"
  - howborisusesclaudecode.com (Boris Cherny X 스레드 집성)
  - mattpocock/skills, Jeffallan/claude-skills, addyosmani/web-quality-skills, Anthropic skills cookbook
  - VoltAgent/awesome-claude-code-subagents, hesreallyhim/a-list-of-claude-code-agents
  - Chat2AnyLLM/awesome-claude-plugins, claudemarketplaces.com
  - iansinnott/obsidian-claude-code-mcp, modelcontextprotocol/servers

## 7. 용어집 (Glossary)

- **plan mode** — `Shift+Tab` 2회로 진입하는 read-only 모드. Claude가 파일을 읽고 흐름을 추적해 플랜을 제시, 사용자가 `Ctrl+G`로 편집 후 실행.
- **Compounding Engineering** — 모든 PR 리뷰를 `CLAUDE.md` 개선으로 전환해 룰을 복리로 축적하는 Boris Cherny의 실천(`@claude add to CLAUDE.md ...`).
- **progressive disclosure** — 세션 시작 시 skill의 description(~100토큰)만 로드하고, 실제 발화 시점에 `SKILL.md` 전체와 helper 파일을 로드하는 메커니즘.
- **Ralph Loop** — `/goal`이 구현한, completion condition이 충족될 때까지 자율 반복하는 루프. 중단 시도마다 transcript를 조건과 대조.
- **subagent** — `.claude/agents/*.md`로 정의되는 isolated context·scoped permission 에이전트. 메인 세션 오염 없이 대량 파일 탐색/리뷰.
- **MCP (Model Context Protocol)** — 외부 시스템(DB·디자인·에러추적·노트)의 tool을 표준 contract로 Claude에 노출하는 프로토콜. *"USB-C for AI"* 비유(Rahman 글).
- **worktree 병렬 세션** — 3~5개 git worktree 각각에 독립 Claude 세션을 띄우는 패턴. `claude --worktree` / agent view(`claude agents`)가 control plane.
- **`/compact` vs `/clear`** — 전자는 lossy LLM 세션 요약(hint로 생존 내용 제어), 후자는 사용자가 직접 쓰는 fresh brief.
- **context rot** — 컨텍스트가 일정 토큰(1M 모델 기준 ~300~400k)을 넘으면 품질이 저하되는 현상. early compaction으로 대응.
