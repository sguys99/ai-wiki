---
title: "Beyond the Prompt: Claude Code (설정, 메모리, 워크플로 실전 가이드, Arpan Patel 2026-05-26)"
type: article
year: 2026
category: agents
raw_path: raw/articles/patel-2026-beyond-the-prompt-claude-code.md
raw_filename: "patel-2026-beyond-the-prompt-claude-code.md"
source_collection: external
author: "Arpan Patel"
url: "https://arps18.github.io/posts/claude-code-mastery/"
publisher: "Arpan Patel Blog (arps18.github.io)"
publication_date: "2026-05-26"
tags: [claude-code, claude-md, claude-local-md, skills, subagents, mcp, plugins, slash-commands, plan-mode, rewind, goal, ralph-loop, worktree, obsidian, boris-cherny, cat-wu, anthropic, agentic-development, context-engineering]
---

## 한 줄 요약 (One-line Summary)

Arpan Patel이 2026-05-26 개인 블로그에 올린 Claude Code 실전 가이드로, 12개 절과 Closing Notes로 구성된다. 글 전체를 지탱하는 전환은 하나다. Claude Code를 터미널 안의 "dressed-up autocomplete"가 아니라 가드레일이 필요한 자율 에이전트로 다루라는 것이다. 그 위에서 핵심 원리 "give Claude a way to verify its own work"(Boris Cherny가 품질 2~3배 향상으로 지목)를 출발점으로 `.claude/` 디렉토리의 계층적 설정 구조, `CLAUDE.md`와 `CLAUDE.local.md` 작성법, 스킬, 서브에이전트, 플러그인, MCP, 잘 안 쓰이는 슬래시 커맨드 15종, Obsidian 3계층 메모리 워크플로까지 다룬다. Closing Notes가 밝히는 결론은 "Setup is the work. Execution is verification"이다. 디렉토리 레이아웃과 스킬, 서브에이전트, 플러그인, MCP를 갖추는 설정 작업이 프롬프트 문구 다듬기보다 효과가 크다는 뜻이다. 반복되는 실천 규칙은 다섯 가지다. 첫째, plan mode로 탐색과 계획을 먼저 하고 코드를 쓴다. 둘째, 실수할 때마다 "Update CLAUDE.md so you don't repeat this"로 룰을 축적한다(Boris Cherny가 "Compounding Engineering"으로 부른다). 셋째, 서브에이전트로 컨텍스트를 격리한다. 넷째, worktree 3~5개로 세션을 병렬화한다. 다섯째, verification 없이 성공을 주장하지 않는다. 마지막 절은 Anthropic 팀의 습관을 열세 항목으로 모았다. 인용 다수는 Boris Cherny와 Cat Wu의 공개 발언이고, 저자 본인의 1인칭 경험을 섞은 개인 정리 성격이다.

## 1. 자료 정보 (Document Information)

- **형식**: 개인 기술 블로그(GitHub Pages, arps18.github.io)에 실린 장문 실전 가이드
- **저자**: Arpan Patel(블로그 핸들 `arps18`). Claude Code 일상 사용 경험을 정리한 1인칭 가이드다
- **발행일**: 2026-05-26
- **URL**: <https://arps18.github.io/posts/claude-code-mastery/>
- **구성**: 번호가 붙은 12개 절과 Closing Notes. 표 4개, 코드/설정 예시 다수
- **성격**: 2차 자료다. Anthropic 공식 문서, Boris Cherny의 talk과 X 스레드, Cat Wu 발언, 커뮤니티 저장소(mattpocock/skills, VoltAgent/awesome-claude-code-subagents 등)를 종합해 재구성하고 저자 경험을 덧붙인 큐레이션 가이드다
- **시각 요소**: 본문에 도식이나 차트가 없다. 시각 정보는 디렉토리 트리와 설정 파일을 보여주는 코드 블록이 대신한다. 따라서 `figures` 키를 생략한다
- **면책 표기**: 저자가 말미에 "These are personal takeaways from how Claude Code gets used day to day, so your setup and mileage will look different"라고 적었다

## 2. 주요 기여 (Key Contributions)

1. **자율 에이전트 mental model 정립**. 프롬프트를 던지고 기다리는 챗봇이 아니라 가드레일이 필요한 자율 에이전트로 다루라는 전환이 글의 출발점이다. 핵심 원리는 "give Claude a way to verify its own work"다. verification 루프가 없으면 사용자가 유일한 피드백 신호이지만, 있으면 코드가 실제로 실행될 때까지 모델이 스스로 반복한다. Boris Cherny는 이 한 가지 조치를 품질 2~3배 향상으로 평가했다.

2. **네 가지 일상 패턴 제시**. explore와 plan을 거쳐 code로 가는 순서, plan mode를 설계 문서처럼 다루는 이중 검토, 설명 대신 정확한 참조를 넘기는 입력 방식, 라인 단위 페어 프로그래밍이 아닌 delegation이다. Cat Wu의 발언 "The model performs best if you treat it like an engineer you're delegating to, not a pair programmer you're guiding line by line"을 근거로 든다.

3. **`.claude/` 디렉토리를 계층적 설정 시스템으로 해부**. 2개 scope(저장소 안의 project `.claude/`와 커밋 대상, 사용자 홈의 global `~/.claude/`)를 나누고, 파일 9종의 commit 여부와 역할을 표로 정리한다. monorepo에서 `CLAUDE.md`가 cascade 로드되는 점, `rules/*.md`가 glob으로 path-gate된다는 점, 스킬이 commands보다 나은 이유(보조 파일 동거, `disable-model-invocation`, allowed-tools, agent override)를 든다.

4. **Boris식 `CLAUDE.md` 작성 철학**. 원칙은 두 가지다. 첫째, 짧게 쓴다. 판단 기준은 "Would removing this cause Claude to make a mistake?"이고, 아니면 잘라낸다. 파일은 지식 베이스가 아니라 가드레일이다. Boris는 한 달 동안 점점 정교한 컨텍스트 파일을 쓰다가 원래 틀로 돌아왔고, 정교한 버전이 측정 가능한 모든 면에서 더 나빴다고 말한다. 둘째, Claude가 스스로 룰을 쓰게 한다. Boris는 Claude를 "eerily good at writing rules for itself"라고 표현한다.

5. **Claude Code 팀의 실제 `CLAUDE.md` 공개**. 팀 전원이 주 수 회 기여하는 파일로, 내용은 bun 사용 강제, typecheck 커맨드, 단일 테스트 실행법, 파일 단위 lint, PR 생성 전 의례뿐이다. 스타일 취향과 코드베이스 투어, 상투적 문구가 없다. Boris는 PR 코멘트에 `@claude add to CLAUDE.md ...`를 달아 룰을 바로 커밋하게 하고, 이를 "Compounding Engineering"이라 부른다.

6. **`CLAUDE.local.md`를 PR 피드백 축적기로 사용**. gitignore 대상이고 기기를 떠나지 않는다. PR 리뷰 코멘트를 읽는 즉시 붙여넣으면 몇 주 만에 개인 룰 파일이 된다. 저자는 이 방식으로 자기 PR의 사소한 지적이 2주 안에 줄었다고 적는다. project 피드백 절과 개인 습관 절을 분리하고 몇 주 뒤 정리하라고 권고한다.

7. **스킬 심화**. 스킬은 폴더 하나가 슬래시 커맨드 하나이고, 안에 frontmatter와 지시문을 담은 `SKILL.md`가 있다. 강점 세 가지는 progressive disclosure(세션 시작 시 항목당 약 100토큰의 description만 읽는다), 폴더 단위 구성(`templates/`, 참조 문서, 스크립트 동거), inline shell(`!`로 시작하는 줄을 호출 시점에 실행해 출력을 프롬프트에 삽입)이다. Go HTTP handler 스킬 전문과 커뮤니티 저장소 카탈로그를 든다.

8. **커스텀 서브에이전트 설계**. `.claude/agents/*.md`에 frontmatter(name, description, tools, model)로 정의하며 컨텍스트 격리, 도구 권한 제한, 별도 blast radius를 얻는다. `/pr-review` 에이전트 전문을 예로 들고 세 가지 설계 선택을 설명한다. tools를 읽기 전용으로 고정한 이유, `model: opus`를 고른 이유, "Do NOT flag" 절이 출력을 쓸 만하게 만든다는 점이다.

9. **플러그인과 마켓플레이스**. 플러그인은 스킬, 훅, 서브에이전트, MCP 서버를 하나의 설치 단위로 묶는다. 첫날 설치 대상 네 가지는 `/code-review`, `/feature-dev`, language server plugin, `/security-guidance`다. 2026년 중반 기준 마켓플레이스 75곳 이상에 플러그인 1,000개 이상이 있다고 적는다.

10. **잘 안 쓰이는 커맨드 카탈로그 15종**. `/insights`부터 `--bare`까지 표로 정리하고, 일상적으로 손이 가는 둘을 따로 파고든다. `/compact`와 `/clear`의 차이, `/rewind`가 프롬프트마다 체크포인트를 남기고 세션을 넘어 유지된다는 점이다.

11. **`/goal`로 구현된 Ralph Loop**. 완료 조건을 걸면 조건이 참이 될 때까지 계속 시도하고, 중단 시도마다 transcript를 조건과 대조한다. 조건은 검증 가능하고 결정론적이어야 한다. `/loop`, `/schedule`, `Stop` 훅, auto mode와 결합한다.

12. **MCP와 Obsidian 3계층 메모리**. MCP는 코딩 에이전트를 시스템 인식 에이전트로 바꾸는 배선이라고 규정하고 실무용 서버 8종을 표로 든다. Obsidian vault를 hot, warm, cold 3계층 메모리로 운용하는 구체 절차를 제시하고, MCP를 전부 설치하지 말라고 경고한다.

13. **Anthropic 팀 습관 정리**. Boris Cherny, Cat Wu, Thariq를 포함한 팀의 일상 습관을 열세 항목으로 모았다. 원문은 개수를 "maybe a dozen habits"로 대략 표현한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### `.claude/` 2-scope 구조

project scope는 저장소 안의 `.claude/`에 있고 커밋해 팀이 공유한다. global scope는 `~/.claude/`에 있고 그 기기의 모든 프로젝트에 따라붙는다. mental model은 "project 파일은 프로젝트를 기술하고 global 파일은 사용자를 기술한다"다.

| 파일 | scope | commit | 역할 |
|---|---|---|---|
| `CLAUDE.md` | project와 global | 예 | 매 세션 로드되는 지시문 |
| `CLAUDE.local.md` | project 전용 | 아니오, gitignore | 개인 project 노트 |
| `settings.json` | project와 global | 예 | 권한, 훅, 환경 변수, 모델 기본값 |
| `settings.local.json` | project 전용 | 아니오, 자동 gitignore | 개인 override |
| `.mcp.json` | project 전용 | 예 | 팀 공유 MCP 서버 |
| `skills/<name>/SKILL.md` | project와 global | 예 | `/name`으로 호출하는 재사용 프롬프트 |
| `commands/*.md` | project와 global | 예 | 단일 파일 슬래시 커맨드 |
| `agents/*.md` | project와 global | 예 | 서브에이전트 정의 |
| `rules/*.md` | project와 global | 예 | 주제 한정 지시문, path-gate 가능 |

놓치기 쉬운 세 가지를 짚는다. `CLAUDE.md`는 cascade한다. monorepo에서 billing 서비스를 작업하면 `root/CLAUDE.md`와 `root/services/billing/CLAUDE.md`가 둘 다 로드된다. `rules/*.md`는 path-gate된다. migrations 폴더 전용 지침을 `CLAUDE.md`에 넣어 매 세션 부풀리지 말고 `.claude/rules/migrations.md`에 glob과 함께 둔다. 스킬이 commands보다 낫다. 둘 다 슬래시 커맨드를 등록하지만 스킬만 보조 파일, `disable-model-invocation`, allowed tools, agent override를 지원한다.

`claude project purge ~/path/to/repo --dry-run`으로 Claude가 그 프로젝트에 대해 보유한 로컬 상태를 확인할 수 있다. 노트북을 넘기기 전에 유용하다.

### `CLAUDE.md`에 넣을 것과 뺄 것

Claude Code 팀의 실제 파일은 개발 워크플로만 담는다. bun 사용 강제, `bun run typecheck`, 단일 스위트와 특정 파일 테스트 커맨드, 커밋 전 `bun run lint:file`, PR 생성 전 `bun run lint:claude && bun run test`다. 저자가 제시한 확장 템플릿은 Code style, Workflow, Architecture, Gotchas 네 절로 구성된다.

| 넣을 것 | 빼야 할 것 |
|---|---|
| Claude가 추측할 수 없는 빌드 커맨드 | 언어 표준 관례 |
| 실행 순서, 단일 테스트 호출법 | 파일별 코드베이스 설명 |
| PR 생성 전 의례 | 긴 튜토리얼 |
| 실제 실수에서 나온 Gotchas 항목 | API 문서 |
| 아키텍처 경계(모든 API 라우트가 지나는 미들웨어 등) | 자주 바뀌는 내용 |

Gotchas 절의 항목은 전부 실제 PR에서 Claude가 저지른 실수를 그 자리에서 기록한 것이다. 저자가 든 예는 `formatCurrency`가 USD를 가정한다는 사실을 모른 채 프랑스 사용자에게 USD 형식을 내보낸 경우다. `IMPORTANT`나 `YOU MUST` 같은 단어는 준수율을 높이지만, 무게를 유지하려면 아껴 쓴다. 파일을 짧게 유지하면서 필요할 때만 세부를 끌어오려면 `@path` import 문법을 쓴다.

참고할 만한 공개 `CLAUDE.md`로 네 곳을 든다. mattpocock/skills(스킬 작성과 테스트 관례), anthropics/claude-code-action(Anthropic 자체 저장소), hesreallyhim/awesome-claude-code(언어 생태계별 공개 파일 링크 모음), claudelog.com(스택별 커뮤니티 예시)이다.

### 스킬 frontmatter 키

`~/.claude/skills/summarize-changes/SKILL.md`에 description과 `!` + `git diff HEAD` 한 줄, 지시문만 넣어도 이후 모든 세션에 `/summarize-changes`가 나타난다. frontmatter가 지원하는 선택 키는 다음과 같다.

| 키 | 역할 |
|---|---|
| `name` | 스킬 이름 |
| `description` | 언제 이 스킬을 쓸지 |
| `disable-model-invocation` | true면 사용자가 직접 입력할 때만 실행한다 |
| `allowed-tools` | 허용 도구 목록(Read, Grep, Bash 등) |
| `agent` | 실행할 에이전트 지정(read-only 등) |

부작용이 있는 스킬에는 `disable-model-invocation: true`를 쓴다. `/ship`은 명시적으로 입력했을 때만 배포해야지, 모델이 관련 있다고 판단할 때 실행되어서는 안 된다.

Go HTTP handler 스킬 예시는 `SKILL.md`, `templates/handler.go.tmpl`, `examples/healthz.go`로 구성된다. Stack 절에 Go 1.22와 chi 라우터, 타입 안전 쿼리용 sqlc, 구조화 로깅용 zap, 테이블 주도 테스트용 testify를 적고, Gotchas 절에 `chi.URLParam`이 누락 파라미터에 에러가 아닌 빈 문자열을 반환한다는 점, `httperr.Wrap`이 로깅하지 않으므로 반환 전에 별도로 로깅해야 한다는 점, 인증 미들웨어가 `context.Value(authkey.User)`로 주입하므로 `*models.User`로 타입 단언해야 한다는 점, sqlc의 nullable 문자열 `pgtype.Text`는 `.String` 호출 전에 `.Valid`를 확인해야 한다는 점, 테스트가 실제 서버 대신 `httptest.NewRecorder`와 `httptest.NewRequest`를 써야 한다는 점을 적는다.

커뮤니티 스킬로는 mattpocock/skills(`npx skills@latest add mattpocock/skills`로 설치, `/grill-me`는 코드 작성 전에 계획을 인터뷰하고, `/tdd`는 red-green-refactor를 엄격히 강제하며, `/diagnose`는 재현, 최소화, 가설, 수정, 회귀 테스트 순서를 따른다), Jeffallan/claude-skills(`go-pro`, `python-pro`, `java-architect`, `typescript-pro`, `rust-engineer`, `sql-pro` 등 언어별 프로필 66종, 조합해서 쓴다), addyosmani/web-quality-skills를 든다. Anthropic 공식 스킬은 `/code-review`, `/simplify`, `/batch`, `/webapp-testing` 네 가지다.

### `/pr-review` 서브에이전트 설계

저자는 거의 배포될 뻔한 PR에서 null 체크 누락을 발견한 뒤 이 에이전트를 만들었다. frontmatter는 `tools: Read, Grep, Glob, Bash`와 `model: opus`를 지정하고, 본문은 Process, Flag, Do NOT flag, Output 네 절로 구성된다.

- **Process**: `git diff main...HEAD` 실행, `git log main..HEAD --oneline` 실행, diff 컨텍스트가 아닌 전체 파일 읽기, `CLAUDE.md`와 `CLAUDE.local.md`와 `.claude/rules/`에 대조
- **Flag**: 정확성 버그(off-by-one, null 처리, 에러 경로, race condition), 보안(injection, 인증 검사 누락, 코드 안의 비밀값), 새 로직의 테스트 누락, N+1 쿼리, 관례 위반
- **Do NOT flag**: 프로젝트 룰에 없는 스타일 취향, 동작하는 코드의 리팩터링 제안, 이 diff 바깥의 것
- **Output**: 심각도별(Critical, High, Medium, Low) 묶음, 파일과 라인과 이슈와 수정안, 마지막에 SHIP, FIX FIRST, REWORK 중 하나의 판정

설계 선택 세 가지가 있다. tools를 읽기 전용으로 고정한 것은 의도적이다. 코드를 고칠 수 있는 리뷰어는 문제를 보고하는 대신 스스로 고치는 쪽을 합리화하기 시작한다. `model: opus`를 고른 것은 사람 리뷰어보다 먼저 보안 버그를 잡는 값어치가 비용을 넘기 때문이다. "Do NOT flag" 절이 출력을 쓸 만하게 만든다. 없으면 변수 이름 같은 사소한 지적에 파묻힌다.

Claude Code 팀 자체 워크플로에서는 `build-validator`, `code-architect`, `code-simplifier`, `oncall-guide`, `verify-app`이 매일 실행된다. 커뮤니티가 자주 쓰는 에이전트는 `security-reviewer`, `test-writer`, `debugger`, `performance-auditor`, `migration-writer`, `release-notes-writer`다. 큐레이션 모음으로 VoltAgent/awesome-claude-code-subagents(에이전트 100종 이상)와 hesreallyhim/a-list-of-claude-code-agents를 든다. frontmatter에 `isolation: worktree`를 추가하면 서브에이전트를 자체 git worktree에서 실행하며, 마이그레이션을 수십 개 에이전트로 병렬화할 때 특히 효과가 크다.

### 플러그인 네 가지

- `/code-review`: 에이전트 4개를 병렬 실행한다. 둘은 `CLAUDE.md` 준수를 확인하고, 하나는 버그를 찾고, 하나는 git blame으로 맥락을 읽는다. 출력에 confidence 점수가 붙는다
- `/feature-dev`: 공식 마켓플레이스에서 설치 수가 가장 많은 스킬이다. 7단계로 requirements, exploration, architecture, implementation, testing, review, docs를 거친다
- **language server plugin**: 심볼 단위 탐색과 편집 시 진단을 세션에 연결한다. 팀이 일관되게 효과가 가장 큰 플러그인으로 지목한다
- `/security-guidance`: Anthropic 공식 보안 스킬로, 배포 전에 우려 사항을 드러낸다

플러그인 범주로 git 워크플로, 코드 인텔리전스(LSP), 문서 생성기, 테스팅, 브라우저 자동화(Playwright), 디자인 시스템(Figma), 관측성(Sentry, Datadog)을 든다.

### `/goal` 운영 규칙

`/goal`은 완료 조건을 걸고, 조건이 참이 될 때까지 계속 시도한다. 중단 시도마다 transcript를 조건과 대조하는 검사가 발동한다. 저자는 한 줄을 입력하고 노트북을 닫은 뒤 저녁을 먹고 돌아와 green PR을 받았다고 적는다.

```
/goal all tests in test/auth pass and the lint step is clean
/goal all integration tests in tests/api pass without flaking 3 runs in a row
/goal the OpenAPI spec validates and matches the actual response shapes
/goal docker compose up runs cleanly and the healthcheck endpoint returns 200
/goal coverage on src/billing/ is above 80% and all new tests are not placeholders
```

조건은 검증 가능하고 결정론적이어야 한다. 테스트 커맨드, CLI exit code, grep 가능한 파일 상태에 묶는다. "the code is good"이라고 쓰면 이미 실패한 것이라고 못박는다. 함께 쓰는 짝은 네 가지다. `/loop`은 일정 간격으로 반복해 백로그를 소진하고, `/schedule`은 클라우드에서 주기 실행하며, `Stop` 훅은 자체 테스트 스위트나 CI 엔드포인트를 게이트로 삼고, auto mode는 권한 확인 프롬프트를 없애 긴 goal이 멈추지 않게 한다.

### fan-out 마이그레이션 패턴

저자는 지난 분기에 컴포넌트 파일 약 2,000개를 이 방식으로 마이그레이션했다. 순서는 작업 목록 생성, 세 개를 손으로 sanity-check, 그 세 개가 깨끗하게 나올 때까지 프롬프트 조이기, 나머지 일괄 실행이다.

```
for file in $(cat files.txt); do
  claude -p "Migrate $file from React to Vue. Return OK or FAIL." \
    --allowedTools "Edit,Bash(git commit *)" \
    --bare
done
```

### Obsidian 3계층 메모리

Obsidian 플러그인 `obsidian-claude-code-mcp`를 설치하면 vault를 로컬 WebSocket(포트 22360)으로 노출하고 Claude Code가 스스로 찾아낸다. vault 루트에 `CLAUDE.md`를 두어 폴더 레이아웃을 알린다. 폴더는 `00-Inbox/`, `10-Daily/`, `20-Projects/`, `30-Decisions/`, `40-Atoms/`, `90-Archive/`로 나눈다.

| 계층 | 위치 | 메커니즘 |
|---|---|---|
| hot | `10-Daily/<today>.md` | 세션 종료 시 `Stop` 훅이 타임스탬프 항목을 자동 추가한다. 복사 붙여넣기가 없다 |
| warm | `20-Projects/<proj>/` | 세션 시작 시 프로젝트 README와 최근 세션 로그 2~3개를 먼저 읽는다. 2주치 컨텍스트를 약 30초에 되살린다 |
| cold | `30-Decisions/`와 `40-Atoms/` | 굳어진 아키텍처 결정을 ADR로 승격하고, 재사용 지식을 atom으로 정제해 wikilink로 잇는다 |

일상 프롬프트 예시로 "What is in my inbox? Summarize and suggest where each item belongs", "Check 30-Decisions/ for anything related to retry policies", "Read the last 3 session logs for billing-v2. Tell me where I left off"를 든다.

### 일상 워크플로

저자가 제시하는 상황별 기본 동작은 여덟 가지다. 아침에는 밤사이 서브에이전트와 예약 작업의 결과를 훑고 주 1회 `/insights`를 읽는다. 새 기능은 plan mode로 시작해 `Ctrl+G`로 계획을 편집한 뒤 구현하고 `/pr-review` 서브에이전트나 새 세션으로 검토한다. 버그는 손대기 전에 재현하고, `cat error.log | claude`로 에러를 넘겨 재현 실패 테스트를 먼저 작성한 뒤 그 테스트가 red가 되고 나서야 수정을 요청한다.

대량 변경에는 `/batch`를 쓴다. 원하는 바를 인터뷰한 뒤 각자 worktree를 가진 병렬 에이전트로 분산하고, 각 에이전트가 테스트를 실행하고 자체 PR을 연다. 낯선 코드는 서브에이전트에 맡겨 자체 context window에서 수십 개 파일을 훑게 하고 요약만 받는다. 코드 탐색에 20만 토큰 context window를 소진해 본 사람일수록 이 차이를 크게 느낀다고 적는다.

병렬 세션은 git worktree 3~5개에서 각각 Claude 세션을 실행하고 `claude agents` 에이전트 뷰를 control plane으로 삼는다. Writer/Reviewer 패턴은 세션 A가 구현하고 세션 B가 대화 이력 없는 새 컨텍스트에서 검토한 뒤, 검토 결과를 A로 되돌려 B가 더 지적하지 않을 때까지 반복한다. 논리적 덩어리를 끝낼 때마다 hint를 붙인 `/compact`를 실행해 컨텍스트가 탁해지기 전에 접는다.

저자는 verification 없이 성공을 주장하게 두지 말라고 못박는다. 테스트든 스크린샷이든 실제 커맨드 출력이든 증거가 있어야 하고, 믿고 넘어가는 지점이 나쁜 출력의 가장 큰 원천이라고 본다.

### Anthropic 팀 습관

원문은 개수를 "maybe a dozen habits"로 대략 적고 실제로는 열세 항목을 나열한다. 목록은 verification 수단 제공(Boris가 가장 자주 반복하는 지점), 거의 모든 작업에 Opus high 또는 xhigh effort 사용, 세션 3~5개 병렬 실행, 프로젝트별 노트 디렉토리 유지, `/techdebt` 커맨드 제작, 팀 공유 `CLAUDE.md` 주 수 회 편집, `Esc` 두 번 rewind, UI 변경 시 Playwright MCP, language server plugin 설치, `/voice` 프롬프트 입력, auto mode와 `/focus`와 `/goal` 결합, `Ctrl+G` 계획 편집, 새 코드베이스에 ASCII 다이어그램 요청이다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

정량 벤치마크가 없다. 실험 논문이 아니라 실천 가이드이고, 인용된 수치는 모두 2차 자료이거나 일화적이다.

| 수치 | 출처와 성격 |
|---|---|
| verification 루프가 품질을 2~3배 올린다 | Boris Cherny 발언. 원 출처 링크 없음 |
| `--bare`가 비대화형 startup을 최대 10배 빠르게 한다 | 커맨드 표의 설명. 측정 조건 없음 |
| `/voice` 말하기가 타이핑보다 3배 빠르다 | 팀 습관 절. 일반 통념 인용 |
| context rot이 1M 모델에서 30만~40만 토큰 부근에 나타난다 | Pro tip. `CLAUDE_CODE_AUTO_COMPACT_WINDOW=400000` 설정을 권고 |
| 마켓플레이스 75곳 이상에 플러그인 1,000개 이상 | 2026년 중반 기준 스냅샷 |
| Jeffallan/claude-skills 언어 프로필 66종 | 저장소 스냅샷 |
| VoltAgent 저장소 에이전트 100종 이상 | 저장소 스냅샷 |
| 저자가 컴포넌트 파일 약 2,000개를 fan-out으로 마이그레이션 | 1인칭 경험, 지난 분기 |
| `CLAUDE.local.md` 도입 2주 안에 PR 사소 지적이 줄었다 | 1인칭 경험, 측정치 없음 |

슬래시 커맨드, frontmatter 키, 환경 변수, 파일 경로 같은 기술적 세부는 재현 가능하다. 반면 품질 향상 수치는 출처가 없다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **출처 링크 부재**: Boris Cherny의 2~3배 향상과 Cat Wu 인용 같은 핵심 수치와 발언에 원 출처(영상 timestamp, X 스레드 링크)가 없다. Resources 절이 제시하는 것은 howborisusesclaudecode.com과 Anthropic blog뿐이다.
- **버전 의존성**: `/goal`, `/teleport`, `/voice`, `/schedule`, auto mode, `--bare`, `CLAUDE_CODE_AUTO_COMPACT_WINDOW`는 특정 Claude Code 버전 기능이라 빠르게 변할 수 있다. "Opus 4.7" 언급은 2026-05 시점 기준이다.
- **개인 경험 일반화 주의**: 저자의 1인칭 사례(컴포넌트 약 2,000개 마이그레이션, 포트 22360 Obsidian MCP)는 특정 설정을 전제한다. 저자 본인도 설정과 결과가 사람마다 다를 것이라고 면책 표기를 단다.
- **저장소 스냅샷 변동**: 플러그인 수, 마켓플레이스 수, 스킬 종수, 에이전트 종수는 시점 스냅샷이라 바뀐다.
- **비용 논의 부재**: `model: opus` 기본값과 세션 3~5개 병렬 실행은 토큰 비용을 크게 늘리는 선택인데, 글은 비용 대비 효과를 정량적으로 다루지 않는다.

## 6. 관련 연구 (Related Work)

- **본 wiki 내**:
  - [[etc/rahman-2026-a-practical-guide-to-becoming|A Practical Guide to Becoming an AI-Native Engineer]]. 조직과 팀 차원의 AI-native engineering 처방이다. 본 글의 도구 차원 실무 매뉴얼과 추상도가 다른 짝이며, 둘 다 context engineering, verification, 멀티에이전트 오케스트레이션, MCP를 핵심으로 공유한다.
  - [[agents/osmani-2026-loop-engineering|Loop Engineering]]. 같은 harness를 루프 설계 관점에서 다룬다.
  - [[agents/patel-2026-i-taught-myself-claude-code|I Taught Myself Claude Code]]. 같은 저자의 학습 과정 기록으로, 본 글이 정리한 설정 체계에 이르기까지의 경로를 담는다.
- **글이 인용한 외부 자료**(웹 검색 금지. 인용 사실만 기록):
  - Anthropic 공식 문서(code.claude.com/docs의 overview, claude-directory, best-practices, memory, skills, sub-agents, plugins, mcp, hooks), Anthropic blog "Best practices for Opus 4.7 with Claude Code"
  - howborisusesclaudecode.com, shanraisshan/claude-code-best-practice
  - mattpocock/skills, Jeffallan/claude-skills, addyosmani/web-quality-skills, Anthropic skills cookbook
  - VoltAgent/awesome-claude-code-subagents, hesreallyhim/a-list-of-claude-code-agents
  - Chat2AnyLLM/awesome-claude-plugins, claudemarketplaces.com
  - iansinnott/obsidian-claude-code-mcp, modelcontextprotocol/servers, claude.com/partners/mcp
  - anthropics/claude-code-action, hesreallyhim/awesome-claude-code, claudelog.com

## 7. 용어집 (Glossary)

- **plan mode**: `Shift+Tab`을 두 번 눌러 진입하는 읽기 전용 모드. Claude가 파일을 읽고 흐름을 추적해 계획을 제시하며, 사용자는 `Ctrl+G`로 편집한 뒤 실행한다.
- **Compounding Engineering**: 모든 PR 리뷰를 `CLAUDE.md` 개선으로 전환해 룰을 계속 쌓는 Boris Cherny의 실천. PR 코멘트에 `@claude add to CLAUDE.md ...`를 달아 룰을 바로 커밋하게 한다.
- **Ralph Loop**: `/goal`이 구현한, 완료 조건이 충족될 때까지 자율 반복하는 루프. 중단 시도마다 transcript를 조건과 대조한다.
- **`/compact`와 `/clear`의 차이**: `/compact`는 세션을 요약하는 손실 압축이고 hint로 무엇을 남길지 제어한다. `/clear`는 사용자가 직접 쓰는 새 브리프다. 전자는 실패한 시도를 컨텍스트 안에 묻어 모델이 다시 걸려 넘어지게 하고, 후자는 그것을 완전히 떼어 놓는다.
- **`/rewind`**: 프롬프트마다 체크포인트를 남기고 세션을 넘어 유지되는 되돌리기. 코드, 대화, 또는 둘 다를 복원한다. "that didn't work, try X"라고 입력하는 대신 실수 이전으로 되돌린 뒤 다시 프롬프트한다.
- **context rot**: 컨텍스트가 일정 토큰 수를 넘으면 품질이 저하되는 현상. 1M 모델 기준 30만~40만 토큰 부근에서 나타난다고 적고, 이른 compaction으로 대응하라고 권고한다.
- **blast radius**: 서브에이전트가 잘못 동작했을 때 영향이 미치는 범위. 도구 권한을 좁히면 이 범위가 줄어든다.
- **`isolation: worktree`**: 서브에이전트 frontmatter 키로, 에이전트를 자체 git worktree에서 실행시킨다.
- **auto mode**: 권한 확인 프롬프트를 없애 긴 goal 실행이 중간에 멈추지 않게 하는 모드.
