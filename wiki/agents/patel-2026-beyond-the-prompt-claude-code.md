---
title: "Beyond the Prompt: Claude Code (Arpan Patel, 2026-05-26)"
type: article
year: 2026
category: agents
raw_path: raw/articles/patel-2026-beyond-the-prompt-claude-code.md
raw_filename: "patel-2026-beyond-the-prompt-claude-code.md"
source_collection: external
source: patel-2026-beyond-the-prompt-claude-code.md
author: "Arpan Patel"
url: "https://arps18.github.io/posts/claude-code-mastery/"
publisher: "Arpan Patel Blog (arps18.github.io)"
publication_date: "2026-05-26"
tags: [claude-code, claude-md, claude-local-md, skills, subagents, mcp, plugins, slash-commands, plan-mode, rewind, goal, ralph-loop, worktree, obsidian, boris-cherny, cat-wu, anthropic, agentic-development, context-engineering]
---

## 요약

Arpan Patel이 2026년 5월 26일 개인 블로그에 올린 Claude Code 운용 가이드다. 번호가 붙은 12개 절과 Closing Notes로 구성되며, 설정 파일부터 서브에이전트와 MCP까지 실무 절차를 한 편에 모았다.

글의 결론은 마지막 문장에 있다. "Setup is the work. Execution is verification." 코드를 잘 쓰게 만드는 일의 대부분은 프롬프트 문구가 아니라 그 앞의 설정에 있고, 실행 단계에서 할 일은 결과를 검증하는 것이라는 뜻이다.

출발점이 되는 인식 전환도 하나다. Claude Code를 터미널 안의 "dressed-up autocomplete"가 아니라 가드레일이 필요한 자율 에이전트로 다루라는 것이다. 가드레일은 에이전트의 행동 범위를 제한하는 안전 장치를 뜻하며, 이 글에서는 설정 파일, 도구 권한, 완료 조건이 그 역할을 한다.

이 전환 위에서 작동하는 핵심 원리는 Boris Cherny가 반복한 한 문장이다. "give Claude a way to verify its own work." 모델에 자기 출력을 검증할 수단을 주라는 것이고, Boris는 이 한 가지 조치를 품질 2~3배 향상으로 평가했다.

이 페이지는 원문의 12개 절을 개념 순서로 다시 묶었다. 설정 계층을 먼저 세우고, 그 위에 스킬과 서브에이전트와 플러그인을 올린 뒤, 커맨드와 완료 조건 루프로 운용하고, MCP와 vault로 외부 상태를 연결하는 순서다.

## 배경

이 글은 Claude Code 사용자가 도구의 표면만 쓰다 멈춘다는 관찰에서 출발한다. 저자는 대부분이 `.claude/` 폴더를 열어 `CLAUDE.md` 하나를 보고 나간다고 적고, 그 아래에 계층적 설정 시스템이 있다는 점을 지적한다.

커맨드 쪽도 사정이 같다. 저자에 따르면 대부분이 `/clear`, `/compact`, `/init` 세 가지를 익힌 뒤 탐색을 멈추며, 실제 생산성이 숨어 있는 나머지 커맨드 표면은 거의 손대지 않는다.

두 관찰이 가리키는 결론은 같다. Claude Code의 산출물 품질은 프롬프트 문구가 아니라 설정 상태를 따라간다는 것이다. 저자는 이를 "The output tracks the configuration"으로 정리한다.

글은 실험 논문이 아니라 2차 자료 성격의 실천 가이드다. Anthropic 공식 문서, Boris Cherny의 talk과 X 스레드, Cat Wu 발언, 커뮤니티 저장소를 종합하고 저자 본인의 1인칭 경험을 덧붙였다. 저자도 말미에 설정과 결과가 사람마다 다를 것이라고 면책 표기를 단다.

## 핵심 개념

**verification 루프**는 모델이 자기 산출물을 스스로 검사할 수 있는 경로를 뜻한다. 이 경로가 없으면 사용자가 유일한 피드백 신호이므로 모델은 한 번 제안하고 멈춘다. 경로가 있으면 코드가 실제로 실행될 때까지 모델이 스스로 반복한다.

**plan mode**는 `Shift+Tab`을 두 번 눌러 진입하는 읽기 전용 모드다. 이 모드에서 Claude는 파일을 읽고 흐름을 추적해 계획을 제시하고, 사용자는 `Ctrl+G`로 그 계획을 에디터에서 편집한 뒤 실행으로 넘긴다. 계획은 아직 텍스트일 뿐이므로 코드가 되기 전에 손보는 편이 싸다.

**delegation**은 작업을 맡기는 패턴을 가리킨다. Cat Wu는 이를 라인 단위 페어 프로그래밍과 대비한다. "The model performs best if you treat it like an engineer you're delegating to, not a pair programmer you're guiding line by line." 앞에서 브리프를 명확히 쓰고 그다음은 맡기라는 뜻이다.

**progressive disclosure**는 필요한 시점에만 정보를 단계적으로 노출하는 설계다. 스킬은 세션 시작 시 항목당 약 100토큰의 description만 읽고, 실제 호출 시점에야 `SKILL.md` 전문과 보조 파일을 가져온다.

**context rot**은 컨텍스트가 일정 토큰 수를 넘으면 품질이 저하되는 현상을 뜻한다. 저자는 1M 모델 기준 30만~40만 토큰 부근에서 나타난다고 적고, 이른 compaction으로 대응하라고 권고한다. compaction은 길어진 대화 이력을 요약으로 접어 컨텍스트 한계 안에서 세션을 이어가는 처리다.

**blast radius**는 서브에이전트가 잘못 동작했을 때 영향이 미치는 범위다. 도구 권한을 좁게 잡으면 이 범위가 줄어들고, 그래서 리뷰 전용 에이전트에는 쓰기 도구를 주지 않는다.

## 방법

### 일상 패턴 네 가지

원문은 설정 이야기에 들어가기 전에 하루 단위 동작을 바꾸는 패턴 네 가지를 먼저 제시한다.

| 패턴 | 내용 |
|---|---|
| explore, plan, code | `Shift+Tab` 두 번으로 plan mode에 들어가 파일을 읽고 흐름을 추적하고 데이터 모델을 파악하게 한 뒤 계획을 받고 실행한다. 작은 수정에는 계획 단계를 생략하고, 변경이 파일 하나를 넘어서는 순간부터 쓴다 |
| plan mode를 설계 문서처럼 | Claude 하나가 계획을 쓰고, 새 세션의 다른 Claude가 staff engineer 관점으로 그 계획을 검토한다. 맥락 편향이 없어야 빈틈을 실제로 잡는다 |
| 설명하지 말고 참조하라 | "look at the auth module" 대신 `@src/auth/login.py`를 입력하고, 에러를 붙여넣는 대신 `cat error.log \| claude`로 넘긴다. 정확한 컨텍스트가 근사한 설명을 항상 앞선다 |
| 페어 프로그래밍이 아니라 delegation | 앞에서 브리프를 명확히 쓰고 그다음은 맡긴다 |

구현이 어긋나면 대응도 정해져 있다. 다시 plan mode로 돌아가 verification 단계를 계획 안에 넣은 채로 재계획한다.

### 설정 디렉토리 구조

`.claude/`는 두 개의 scope로 나뉜다. project scope는 저장소 안의 `.claude/`에 있고 커밋해서 팀이 공유한다. global scope는 `~/.claude/`에 있고 그 기기의 모든 프로젝트에 따라붙는다.

둘을 가르는 기준은 간단하다. project 파일은 프로젝트를 기술하고, global 파일은 사용자를 기술한다.

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

저자는 놓치기 쉬운 세 가지를 따로 짚는다.

첫째, `CLAUDE.md`는 cascade한다. monorepo에서 billing 서비스를 작업하면 `root/CLAUDE.md`와 `root/services/billing/CLAUDE.md`가 둘 다 로드된다. 폴더마다 관례가 갈리는 저장소에서 유용하다.

둘째, `rules/*.md`는 glob으로 path-gate된다. migrations 폴더에만 해당하는 지침을 `CLAUDE.md`에 넣으면 매 세션이 그만큼 무거워지므로, `.claude/rules/migrations.md`에 두고 경로 조건을 건다.

셋째, 스킬이 commands보다 낫다. `.claude/commands/*.md`와 `.claude/skills/<name>/SKILL.md`는 둘 다 슬래시 커맨드를 등록하지만, 보조 파일 동거와 `disable-model-invocation`과 allowed tools와 agent override는 스킬만 지원한다.

프로젝트에 대해 Claude가 보유한 로컬 상태를 확인하려면 `claude project purge ~/path/to/repo --dry-run`을 실행한다. 노트북을 넘기기 전에 확인해 두면 유용하다.

### CLAUDE.md 작성 원칙

`CLAUDE.md`는 매 세션 시작 시 로드되므로 잘못 쓰면 같은 실수가 반복된다. 저자는 Boris Cherny의 두 원칙만 지키면 나머지는 부수적이라고 본다.

첫 번째 원칙은 짧게 쓰는 것이다. 판단 기준은 한 줄씩 던지는 질문이다. "Would removing this cause Claude to make a mistake?" 아니라면 잘라낸다. 이 파일은 지식 베이스가 아니라 가드레일이기 때문이다.

이 원칙에는 실패 경험이 붙어 있다. Boris는 한 달 동안 점점 정교한 컨텍스트 파일을 쓰다가 원래 틀로 돌아왔고, 정교한 버전이 측정 가능한 모든 면에서 더 나빴다고 말한다.

두 번째 원칙은 Claude가 스스로 룰을 쓰게 하는 것이다. Claude가 무언가를 잘못하면 그때마다 "Update CLAUDE.md so you don't repeat this"라고 지시한다. Boris는 Claude를 자기 실패에서 룰을 뽑아내는 데 "eerily good"이라고 표현한다. 몇 주 하면 파일이 그 프로젝트가 쌓아 온 함정 목록이 되고, 그것도 모델이 잘 반응하는 문구로 쓰여 있다.

Claude Code 팀이 자기 저장소에 체크인해 둔 실제 파일이 이 원칙의 예시다. 팀 전원이 주 수 회 기여하며 내용은 개발 워크플로뿐이다. bun 사용 강제, `bun run typecheck`, 단일 스위트와 특정 파일 테스트 커맨드, 커밋 전 `bun run lint:file`, PR 생성 전 `bun run lint:claude && bun run test`가 전부다.

무엇이 없는지가 더 중요하다. 스타일 취향도 코드베이스 투어도 상투적 문구도 없다. 남은 것은 Claude가 추측할 수 없는 빌드 커맨드, 실행 순서, 단일 테스트 호출법, PR 생성 전 의례다.

| 넣을 것 | 빼야 할 것 |
|---|---|
| Claude가 추측할 수 없는 빌드 커맨드 | 언어 표준 관례 |
| 실행 순서와 단일 테스트 호출법 | 파일별 코드베이스 설명 |
| PR 생성 전 의례 | 긴 튜토리얼 |
| 실제 실수에서 나온 Gotchas 항목 | API 문서 |
| 아키텍처 경계, 예를 들어 모든 API 라우트가 지나는 미들웨어 | 자주 바뀌는 내용 |

저자가 제시한 확장 템플릿은 Code style, Workflow, Architecture, Gotchas 네 절을 둔다. 이 중 Gotchas 절이 핵심이다. 항목이 전부 실제 PR에서 Claude가 저지른 실수를 그 자리에서 기록한 것이기 때문이다.

저자가 드는 예가 구체적이다. `formatCurrency`가 USD를 가정한다는 사실을 모른 채 모델이 프랑스 사용자에게 USD 형식을 내보낸 경우다. 한 번 적어 두면 다시 일어나지 않는다.

세부 규칙도 몇 가지 있다. `IMPORTANT`나 `YOU MUST` 같은 단어는 준수율을 높이지만 무게를 유지하려면 아껴 쓴다. 파일을 짧게 유지하면서 필요할 때만 세부를 끌어오려면 `@path` import 문법을 쓴다.

Boris는 여기서 한 걸음 더 나간다. PR 코멘트에 `@claude add to CLAUDE.md to never use enums, always prefer literal unions` 형식으로 지시해 룰을 바로 커밋하게 한다. 리뷰어가 실수를 한 번 잡으면 Claude가 다시 반복하지 않는 구조이고, Boris는 이를 "Compounding Engineering"이라 부른다.

참고할 만한 공개 파일로는 네 곳을 든다. mattpocock/skills는 스킬 작성과 테스트 관례를, anthropics/claude-code-action은 Anthropic 자체 저장소의 운용을, hesreallyhim/awesome-claude-code는 언어 생태계별 공개 파일 링크 모음을, claudelog.com은 스택별 커뮤니티 예시를 담는다.

### CLAUDE.local.md 운용

`CLAUDE.local.md`는 `CLAUDE.md` 옆에 놓이고 같은 방식으로 로드되지만 기기를 떠나지 않는다. `.gitignore`에 바로 넣는다.

용도는 PR 피드백 축적이다. 리뷰어가 남긴 코멘트를 머릿속에 담아 두려 하지 말고 읽는 즉시 이 파일에 붙여넣는다. 몇 주 지나면 자신이 반복해서 받는 지적에 맞춰진 개인 룰 파일이 된다.

저자가 예로 든 항목은 두 종류로 나뉜다. 하나는 프로젝트 피드백이다. 새 SQS consumer는 같은 PR에 DLQ와 알람이 있어야 한다, null 반환 대신 `Optional<T>`를 쓴다, 새 엔드포인트 테스트에는 인증 실패 사례가 있어야 한다, 필드 3개 이상을 반환할 때는 평범한 dict 대신 named tuple을 쓴다 같은 것이다.

다른 하나는 자기 습관 교정이다. `console.log` 대신 프로젝트 로거를 쓴다, 엔드포인트를 추가하면 OpenAPI 명세를 갱신한다 같은 항목이다.

효과는 두 가지로 나타난다. Claude가 시키지 않아도 인증 실패 테스트를 포함하고 OpenAPI 명세를 갱신하며, 저자 기준으로 자기 PR의 사소한 지적이 2주 안에 줄었다.

운용 규칙은 두 가지다. 프로젝트 피드백 절과 개인 습관 절을 명확히 분리하는데, 섞어 두면 나중에 정리하기 어려워서다. 그리고 몇 주 뒤에 정리한다. 이미 몸에 밴 항목은 지우고, 파일에는 아직 흔들리는 것만 남긴다.

### 스킬

스킬은 재사용 가능한 프롬프트 묶음이 폴더 하나로 존재하는 형태다. 안에 frontmatter와 지시문을 담은 `SKILL.md`가 있고, 폴더 이름이 그대로 슬래시 커맨드가 된다. project scope는 `.claude/skills/`에, global scope는 `~/.claude/skills/`에 둔다.

가장 작은 예도 이미 제 몫을 한다. description 한 줄, `!` 뒤에 `git diff HEAD` 한 줄, 지시문 몇 줄을 `~/.claude/skills/summarize-changes/SKILL.md`에 저장하면 그 뒤 모든 세션에 `/summarize-changes`가 나타난다.

지시문 내용도 짧다. 변경을 두세 개 불릿으로 요약한 뒤 위험 요소를 나열하라고만 적는다. 에러 처리 누락, 하드코딩된 값, 갱신이 필요한 테스트가 그 대상이다.

| 강점 | 내용 |
|---|---|
| progressive disclosure | 세션 시작 시 항목당 약 100토큰의 description만 읽고, 스킬이 실제로 발동해야 `SKILL.md` 전문과 보조 파일을 가져온다 |
| 폴더 단위 구성 | `templates/` 디렉토리, 참조 문서, 스크립트를 `SKILL.md` 옆에 함께 둔다. `SKILL.md`는 진입점일 뿐이다 |
| inline shell | `!`로 시작하는 줄은 호출 시점에 실행되고 그 출력이 프롬프트에 그대로 삽입된다 |

frontmatter는 선택 키를 여럿 지원한다.

| 키 | 역할 |
|---|---|
| `name` | 스킬 이름 |
| `description` | 언제 이 스킬을 쓸지 |
| `disable-model-invocation` | true면 사용자가 직접 입력할 때만 실행한다 |
| `allowed-tools` | 허용 도구 목록, 예를 들어 Read, Grep, Bash |
| `agent` | 실행할 에이전트 지정, 예를 들어 read-only |

부작용이 있는 스킬에는 `disable-model-invocation: true`를 건다. `/ship`은 사용자가 명시적으로 입력했을 때만 배포해야지, 모델이 관련 있다고 판단할 때 실행되어서는 안 된다.

실전 예시로 제시된 Go HTTP handler 스킬은 `SKILL.md`와 `templates/handler.go.tmpl`과 `examples/healthz.go`로 구성된다. Stack 절에 Go 1.22와 chi 라우터, 타입 안전 쿼리용 sqlc, 구조화 로깅용 zap, 테이블 주도 테스트용 testify를 적는다.

이 스킬의 핵심은 Gotchas 절에 있다. 팀이 실제로 걸려 넘어진 지점만 모았기 때문이다.

| 함정 | 내용 |
|---|---|
| `chi.URLParam` | 누락 파라미터에 에러가 아닌 빈 문자열을 반환하므로 항상 확인해야 한다 |
| `httperr.Wrap` | 로깅을 하지 않으므로 반환 전에 `h.log.Error`로 따로 로깅한다 |
| 인증 미들웨어 | `context.Value(authkey.User)`로 주입하므로 `*models.User`로 타입 단언한다 |
| sqlc nullable 문자열 | `pgtype.Text`이므로 `.String` 호출 전에 `.Valid`를 확인한다 |
| 테스트 | 실제 서버 대신 `httptest.NewRecorder`와 `httptest.NewRequest`를 쓴다 |

이 스킬이 있으면 새로 합류한 개발자가 코드베이스를 뒤지지 않고도 첫날에 관례에 맞는 엔드포인트를 배포할 수 있다.

커뮤니티 스킬 저장소도 세 곳을 든다.

| 저장소 | 내용 |
|---|---|
| mattpocock/skills | `/grill-me`는 코드 작성 전에 계획을 인터뷰하고, `/tdd`는 red-green-refactor를 엄격히 강제하며, `/diagnose`는 재현, 최소화, 가설, 수정, 회귀 테스트 순서를 따른다. `npx skills@latest add mattpocock/skills`로 설치한다 |
| Jeffallan/claude-skills | `go-pro`, `python-pro`, `java-architect`, `typescript-pro`, `rust-engineer`, `sql-pro` 등 언어별 프로필 66종을 담는다. 조합해서 쓰며, Next.js 작업이면 `nextjs-developer`와 `typescript-pro`를 함께 부른다 |
| Anthropic 공식 | `/code-review`, `/simplify`, `/batch`, `/webapp-testing` 네 가지를 제공한다 |

저자의 운용 규칙은 두 줄이다. 하루에 한 번 넘게 하는 일이 있으면 스킬로 만든다. 그리고 스킬을 git에 커밋한다. 그러면 팀이 쌓은 관례가 저장소를 clone하는 것만으로 새 엔지니어에게 전달된다.

### 서브에이전트

서브에이전트는 격리된 컨텍스트와 제한된 도구 권한과 별도 blast radius를 가진 에이전트다. 파일 50개를 훑어도 메인 세션이 부풀지 않고 요약만 돌아온다.

정의는 `.claude/agents/`나 `~/.claude/agents/`에 마크다운 파일 하나를 두는 것으로 끝난다. frontmatter가 name, description, tools, model을 선언하면 계약이 완성된다.

저자는 거의 배포될 뻔한 PR에서 null 체크 누락을 발견한 뒤 `/pr-review` 에이전트를 만들었다. frontmatter는 `tools: Read, Grep, Glob, Bash`와 `model: opus`를 지정하고, 본문은 네 절로 나뉜다.

| 절 | 내용 |
|---|---|
| Process | `git diff main...HEAD` 실행, `git log main..HEAD --oneline` 실행, diff 컨텍스트가 아닌 전체 파일 읽기, `CLAUDE.md`와 `CLAUDE.local.md`와 `.claude/rules/`에 대조 |
| Flag | 정확성 버그(off-by-one, null 처리, 에러 경로, race condition), 보안(injection, 인증 검사 누락, 코드 안의 비밀값), 새 로직의 테스트 누락, N+1 쿼리, 관례 위반 |
| Do NOT flag | 프로젝트 룰에 없는 스타일 취향, 동작하는 코드의 리팩터링 제안, 이 diff 바깥의 것 |
| Output | 심각도별(Critical, High, Medium, Low) 묶음. 파일과 라인과 이슈와 수정안을 적고 마지막에 SHIP, FIX FIRST, REWORK 중 하나로 판정 |

호출은 세션에 "Have the pr-review agent look at my current branch."라고 입력하면 된다. 서브에이전트가 격리된 컨텍스트에서 작업하므로 메인 세션에 리뷰 잡담이 쌓이지 않는다.

설계 선택 세 가지가 이 에이전트의 성능을 만든다. 첫째, tools를 읽기 전용으로 고정한 것은 의도적이다. 코드를 고칠 수 있는 리뷰어는 문제를 보고하는 대신 스스로 고치는 쪽을 합리화하기 시작하기 때문이다.

둘째, `model: opus`를 고른 이유는 비용 판단이다. 사람 리뷰어보다 먼저 보안 버그를 잡는 값어치가 모델 비용을 넘는다고 본 것이다.

셋째, "Do NOT flag" 절이 출력을 실제로 쓸 만하게 만든다. 이 절이 없으면 변수 이름 같은 사소한 지적에 결과가 파묻힌다.

Claude Code 팀 자체 워크플로에서는 `build-validator`, `code-architect`, `code-simplifier`, `oncall-guide`, `verify-app`이 매일 실행된다. 커뮤니티가 반복해서 찾는 에이전트는 따로 있다.

| 에이전트 | 역할 |
|---|---|
| `security-reviewer` | injection, 인증, 비밀값, 안전하지 않은 역직렬화 |
| `test-writer` | 테스트를 생성하며 code-reviewer와 짝을 이뤄 루프를 돈다 |
| `debugger` | 실패하는 테스트를 근본 원인까지 추적한다 |
| `performance-auditor` | 흐름과 쿼리를 프로파일링한다 |
| `migration-writer` | 프로젝트 관례에 맞는 DB 마이그레이션을 생성한다 |
| `release-notes-writer` | 커밋 이력에서 변경 로그를 만든다 |

큐레이션 모음으로는 VoltAgent/awesome-claude-code-subagents가 에이전트 100종 이상을 범주별로 정리하고, hesreallyhim/a-list-of-claude-code-agents가 별도 목록을 유지한다.

두 가지 운용 요령이 붙는다. 에이전트를 이어 붙이면 세션 A가 구현한 뒤 "Use the code-reviewer subagent to check the work."로 검토를 넘길 수 있고, 리뷰어는 구현 편향이 없는 새 컨텍스트에서 평가한다. frontmatter에 `isolation: worktree`를 추가하면 서브에이전트가 자체 git worktree에서 실행되며, 마이그레이션을 수십 개 에이전트로 분산할 때 효과가 크다.

### 플러그인

플러그인은 스킬과 훅과 서브에이전트와 MCP 서버를 하나의 설치 단위로 묶는다. `/plugin`으로 마켓플레이스 브라우저를 열고, `/plugin marketplace add owner/repo`로 커뮤니티 마켓플레이스를 추가한다.

| 플러그인 | 내용 |
|---|---|
| `/code-review` | 에이전트 4개를 병렬 실행한다. 둘은 `CLAUDE.md` 준수를 확인하고, 하나는 버그를 찾고, 하나는 git blame으로 맥락을 읽는다. 출력에 confidence 점수가 붙어 신호가 유지된다 |
| `/feature-dev` | 공식 마켓플레이스에서 설치 수가 가장 많은 스킬이다. 기능 브리프를 넘기면 requirements, exploration, architecture, implementation, testing, review, docs 7단계를 거쳐 동작하는 코드를 낸다 |
| language server plugin | 심볼 단위 탐색과 편집 시 진단을 세션에 연결한다. 팀이 일관되게 효과가 가장 큰 플러그인으로 지목한다 |
| `/security-guidance` | Anthropic 공식 보안 스킬로, 배포 전에 우려 사항을 드러낸다 |

플러그인 범주로는 git 워크플로, 코드 인텔리전스(LSP), 문서 생성기, 테스팅, 브라우저 자동화(Playwright), 디자인 시스템(Figma), 관측성(Sentry, Datadog)을 든다. 2026년 중반 기준 마켓플레이스 75곳 이상에 플러그인 1,000개 이상이 있다.

저자는 온보딩 관점을 덧붙인다. 팀 공유 `.mcp.json`과 잘 고른 플러그인 몇 개가 있으면 새 엔지니어가 저장소를 clone한 지 몇 분 안에 일할 수 있으므로, 플러그인 선택을 온보딩 설계의 일부로 다루라는 것이다.

### 슬래시 커맨드

저자는 커맨드 표면 15종을 표로 정리한다.

| 커맨드 | 역할 |
|---|---|
| `/insights` | 사용 패턴을 분석한다. 한 달에 한 번 실행한다 |
| `/compact <hint>` | 세션을 압축한다. hint가 무엇을 남길지 정한다 |
| `/copy` | 마지막 응답을 복사한다. 코드 블록은 대화형 선택기로 고른다 |
| `/rewind` | 세션 전체의 되돌리기. 코드, 대화, 또는 둘 다를 복원한다 |
| `/btw` | 대화 이력에 남지 않는 곁가지 질문 |
| `/context` | 컨텍스트 사용량을 시각화한다 |
| `/export <file>` | 대화를 파일로 내보낸다 |
| `/branch` | 위험한 시도를 위해 세션을 분기한다 |
| `/batch` | worktree를 가로질러 병렬 에이전트로 작업을 분산한다 |
| `/loop <interval>` | 반복 실행을 예약한다. 최대 3일까지 가능하다 |
| `/schedule` | `/loop`의 클라우드 버전으로, 노트북을 닫아도 동작한다 |
| `/teleport` | 세션을 터미널과 웹 사이에서 옮긴다 |
| `/focus` | 중간 tool call을 감추고 최종 결과만 보여준다 |
| `/voice` | 음성 입력. Boris는 주로 말해서 코딩한다고 적는다 |
| `--bare` | 비대화형 `claude -p` 사용 시 startup을 최대 10배 빠르게 한다 |

이 중 매일 손이 가는 둘을 저자가 따로 파고든다.

`/compact`와 `/clear`의 갈림길은 다음 작업이 방금 한 일에 기대는지 여부다. 완전히 새 작업을 시작하면 `/clear`를 누르고 브리프를 손으로 새로 쓴다. 다음 작업이 방금 한 일에 이어진다면 무엇을 남길지 hint를 붙여 `/compact`를 실행한다.

둘의 성질이 다르기 때문에 구분이 중요하다. `/compact`는 세션에 대한 손실 있는 LLM 요약이고, `/clear`는 사용자가 의도를 담아 직접 쓴 브리프다. 전자는 실패한 시도를 컨텍스트 안에 묻어 모델이 다시 걸려 넘어지게 하고, 후자는 그것을 완전히 떼어 놓는다.

`/rewind`는 프롬프트마다 체크포인트를 남기고 그 체크포인트가 세션을 넘어 유지된다. 그래서 Claude가 잘못된 경로로 갔을 때 "that didn't work, try X"라고 입력하고 싶은 충동을 참아야 한다. 그렇게 쓰면 실패한 시도가 컨텍스트에 남아 모델이 계속 그것에 걸린다. 실수 이전으로 되돌린 뒤, 실패를 지켜보며 알게 된 내용을 담아 다시 프롬프트하는 편이 낫다.

두 가지 설정 요령도 붙는다. `!`를 셸 이스케이프로 쓰면 `!git status`나 `!npm test`가 즉시 실행되고 출력이 컨텍스트에 들어온다. 그리고 `CLAUDE_CODE_AUTO_COMPACT_WINDOW=400000`을 설정해 context rot이 시작되기 전에 compaction을 앞당긴다.

### 완료 조건 루프

`/goal`은 완료 조건을 걸고 그 조건이 참이 될 때까지 계속 시도하게 한다. 중단하려는 시도마다 transcript를 조건과 대조하는 검사가 발동한다. 저자는 한 줄을 입력하고 노트북을 닫은 뒤 저녁을 먹고 돌아와 green PR을 받았다고 적는다.

조건 작성이 이 커맨드의 전부다. 원문이 드는 예는 다음과 같다.

```
/goal all tests in test/auth pass and the lint step is clean
/goal all integration tests in tests/api pass without flaking 3 runs in a row
/goal the OpenAPI spec validates and matches the actual response shapes
/goal docker compose up runs cleanly and the healthcheck endpoint returns 200
/goal coverage on src/billing/ is above 80% and all new tests are not placeholders
```

공통점은 검증 가능하고 결정론적이라는 것이다. 테스트 커맨드, CLI exit code, grep 가능한 파일 상태에 조건을 묶는다. 반대로 "the code is good"이라고 쓰면 이미 실패한 것이라고 저자는 못박는다.

| 짝 | 역할 |
|---|---|
| `/loop` | 일정 간격으로 반복해 백로그를 소진한다 |
| `/schedule` | 클라우드에서 주기적으로 실행한다 |
| `Stop` 훅 | 자체 테스트 스위트나 CI 엔드포인트를 게이트로 삼는다 |
| auto mode | 권한 확인 프롬프트를 없애 긴 goal이 중간에 멈추지 않게 한다 |

저자가 제시하는 결합형은 `/goal`과 auto mode와 `/focus`를 함께 쓰는 것이다. 간결한 브리프를 쓰고 goal을 걸고 자리를 뜬 뒤 완성된 PR로 돌아오는 방식이며, Boris와 Cat Wu가 Opus 4.7에서 밀고 있는 워크플로라고 적는다.

대량 변경에는 fan-out 패턴을 쓴다. 순서는 작업 목록 생성, 세 개를 손으로 확인, 그 세 개가 깨끗하게 나올 때까지 프롬프트 조이기, 나머지 일괄 실행이다. 저자는 지난 분기에 컴포넌트 파일 약 2,000개를 이 방식으로 마이그레이션했다.

```
for file in $(cat files.txt); do
  claude -p "Migrate $file from React to Vue. Return OK or FAIL." \
    --allowedTools "Edit,Bash(git commit *)" \
    --bare
done
```

### 외부 시스템 연결

MCP는 코딩 에이전트를 시스템 인식 에이전트로 바꾸는 배선이다. MCP 서버가 외부 도구를 표준 계약으로 노출하면 Claude가 다른 도구와 똑같이 호출할 수 있다.

차이는 접근 범위에서 난다. MCP가 없으면 Claude는 파일을 읽고 커맨드를 실행한다. MCP가 있으면 Linear 티켓을 읽고, Postgres에 질의하고, Figma 컴포넌트를 열고, Sentry 스택 트레이스를 가져오고, Obsidian vault를 읽는다.

| MCP | 열리는 것 |
|---|---|
| GitHub | 저장소 관리, PR, 이슈, 코드 검색 |
| Context7 | 최신 라이브러리 문서. 프롬프트 끝에 `use context7`을 붙인다 |
| Sentry | 실제 에러 맥락, 스택 트레이스, breadcrumb |
| Linear | 티켓 읽기와 생성, 상태 갱신 |
| Playwright | 접근성 스냅샷 기반 브라우저 자동화 |
| Figma | 라이브 디자인 트리, auto-layout, 간격 토큰, 컴포넌트 참조 |
| Postgres / Supabase | 개발 DB 직접 질의 |
| Slack | 스레드 읽기, 논의 요약, 답변 초안 |

로컬 서버는 stdio로 통신하고, 벤더 호스팅 서버는 OAuth를 쓰는 HTTP로 통신한다. 후자는 `claude mcp add --transport http sentry https://mcp.sentry.dev/mcp` 형태로 등록한다. 팀 공유 서버는 프로젝트 루트의 `.mcp.json`에, 개인 서버는 `~/.claude.json`에 둔다.

저자는 절제를 강하게 권고한다. MCP를 하나 설치할 때마다 Claude가 추론해야 할 도구 목록이 늘어나고, 목록이 부풀면 판단 품질이 떨어지기 때문이다. 시작 조합으로 GitHub와 Context7, 그리고 도메인에 맞는 한두 개를 제안한다. 무언가 동작하지 않으면 Claude Code 안에서 `/mcp`를 실행해 활성 서버와 연결 상태를 먼저 확인한다.

### 3계층 메모리

Obsidian과 Claude Code의 결합은 vault를 세 계층 메모리로 다룰 때 효과가 난다. vault는 에이전트와 사람이 같이 읽고 쓰는 Markdown 파일 폴더를 뜻한다. 이 틀 없이 쓰면 "Claude가 내 파일을 읽을 수 있다" 수준에 머문다.

설치는 Obsidian 플러그인 `obsidian-claude-code-mcp`를 넣는 것으로 끝난다. vault를 로컬 WebSocket 포트 22360으로 노출하면 Claude Code가 스스로 찾아낸다. vault 루트에 `CLAUDE.md`를 두어 폴더 레이아웃을 알린다.

폴더는 `00-Inbox/`(원시 캡처), `10-Daily/`(하루 한 노트), `20-Projects/`(진행 중 프로젝트), `30-Decisions/`(프로젝트 횡단 ADR), `40-Atoms/`(연결된 재사용 지식), `90-Archive/`로 나눈다.

| 계층 | 위치 | 메커니즘 |
|---|---|---|
| hot | `10-Daily/<today>.md` | 세션이 끝날 때 `Stop` 훅이 타임스탬프 항목을 자동으로 덧붙인다. 복사 붙여넣기가 없다 |
| warm | `20-Projects/<proj>/` | 세션을 시작하면 Claude가 프로젝트 README와 최근 세션 로그 2~3개를 먼저 읽는다. 2주치 컨텍스트를 약 30초에 되살린다 |
| cold | `30-Decisions/`와 `40-Atoms/` | 굳어진 아키텍처 결정을 ADR로 승격하고, 재사용 지식을 atom으로 정제해 wikilink로 잇는다 |

일상적으로 쓰는 프롬프트로 세 가지를 든다. "What is in my inbox? Summarize and suggest where each item belongs", "Check 30-Decisions/ for anything related to retry policies", "Read the last 3 session logs for billing-v2. Tell me where I left off"이다.

### 상황별 워크플로

앞의 도구들을 하루 단위로 배치하면 다음과 같은 기본 동작이 나온다.

| 상황 | 동작 |
|---|---|
| 아침 | 밤사이 서브에이전트와 예약 작업이 처리한 결과를 훑는다. 주 1회 `/insights`를 실행해 읽는다 |
| 새 기능 | plan mode로 시작해 `Ctrl+G`로 계획을 다듬고 구현한 뒤, `/pr-review` 서브에이전트나 새 세션으로 검토한다 |
| 버그 | 손대기 전에 재현한다. `cat error.log \| claude`로 에러를 넘기고 재현 실패 테스트를 먼저 쓴다. 그 테스트가 red가 된 뒤에야 수정을 요청한다 |
| 마이그레이션과 대량 변경 | `/batch`를 쓴다. 원하는 바를 인터뷰한 뒤 각자 worktree를 가진 병렬 에이전트로 분산하고, 각 에이전트가 테스트를 실행하고 자체 PR을 연다 |
| 낯선 코드 | 서브에이전트에 맡긴다. 자체 context window에서 수십 개 파일을 훑고 요약을 돌려준다 |
| 병렬 세션 | git worktree 3~5개에서 각각 세션을 실행하고 `claude agents` 에이전트 뷰를 control plane으로 삼는다 |
| Writer/Reviewer | 세션 A가 구현하고 세션 B가 대화 이력 없는 새 컨텍스트에서 검토한다. 검토를 A로 되돌려 B가 더 지적하지 않을 때까지 반복한다 |
| 마일스톤 | 논리적 덩어리를 끝낼 때마다 남길 내용을 hint로 지정해 `/compact`를 실행한다 |

버그 절차에서 실패 테스트를 먼저 쓰라는 요구가 핵심이다. 저자는 이 단계를 건너뛴 수정은 정장을 입은 추측일 뿐이라고 적는다.

낯선 코드를 서브에이전트에 맡기는 이유도 컨텍스트 경제에 있다. 메인 세션이 어수선해지지 않는다는 이점은 코드 탐색에 20만 토큰 context window를 소진해 본 사람일수록 크게 느낀다.

이 모든 절차 위에 하나의 규칙이 놓인다. 증거 없이 성공을 주장하게 두지 않는 것이다. 테스트든 스크린샷이든 실제 커맨드 출력이든 근거가 있어야 하고, 저자는 믿고 넘어가는 지점이 나쁜 출력의 가장 큰 원천이라고 본다.

## 결과

이 글에는 정량 벤치마크가 없다. 실험 논문이 아니라 실천 가이드이므로 인용된 수치는 모두 2차 자료이거나 일화적이다. 따라서 아래 표는 결과가 아니라 주장의 근거 수준을 정리한 것으로 읽어야 한다.

| 수치 | 출처와 성격 |
|---|---|
| verification 루프가 품질을 2~3배 올린다 | Boris Cherny 발언. 원 출처 링크 없음 |
| `--bare`가 비대화형 startup을 최대 10배 빠르게 한다 | 커맨드 표의 설명. 측정 조건 없음 |
| `/voice` 말하기가 타이핑보다 3배 빠르다 | 팀 습관 절의 일반 통념 인용 |
| context rot이 1M 모델에서 30만~40만 토큰 부근에 나타난다 | Pro tip. `CLAUDE_CODE_AUTO_COMPACT_WINDOW=400000` 권고의 근거 |
| 마켓플레이스 75곳 이상에 플러그인 1,000개 이상 | 2026년 중반 기준 스냅샷 |
| Jeffallan/claude-skills 언어 프로필 66종 | 저장소 스냅샷 |
| VoltAgent 저장소 에이전트 100종 이상 | 저장소 스냅샷 |
| 컴포넌트 파일 약 2,000개를 fan-out으로 마이그레이션 | 저자 1인칭 경험, 지난 분기 |
| `CLAUDE.local.md` 도입 2주 안에 PR 사소 지적이 줄었다 | 저자 1인칭 경험, 측정치 없음 |

재현 가능성은 항목에 따라 갈린다. 슬래시 커맨드, frontmatter 키, 환경 변수, 파일 경로 같은 기술적 세부는 그대로 따라 할 수 있다. 반면 품질 향상 수치는 출처가 없어 검증할 수 없다.

마지막 절은 Anthropic 팀의 일상 습관을 모은다. 원문은 개수를 "maybe a dozen habits"로 대략 적고 실제로는 열세 항목을 나열한다.

| 습관 | 근거 |
|---|---|
| Claude에 자기 출력을 검증할 수단을 준다 | Boris가 가장 자주 반복하는 지점 |
| 거의 모든 작업에 Opus를 high 또는 xhigh effort로 쓴다 | 교정이 더 필요한 작은 모델이 결국 더 느리다 |
| 세션 3~5개를 병렬로 실행한다 | worktree가 checkout보다 낫다. `claude --worktree`나 데스크톱 앱을 쓰고 에이전트 뷰로 묶는다 |
| 프로젝트마다 노트 디렉토리를 두고 PR마다 갱신한다 | `CLAUDE.md`가 그 디렉토리를 가리키게 한다 |
| `/techdebt` 슬래시 커맨드를 만든다 | 세션 끝마다 실행해 중복 코드를 찾아 없앤다 |
| 팀 공유 `CLAUDE.md`를 주 수 회 편집한다 | 누군가 Claude의 실수를 볼 때마다 룰을 추가한다 |
| `Esc` 두 번으로 rewind를 연다 | 체크포인트와 짝지어 위험한 시도를 깨끗이 되돌린다 |
| UI 변경에는 Playwright MCP를 쓴다 | Boris는 웹 코드를 만질 때마다 Chrome 확장을 쓴다 |
| language server plugin을 설치한다 | 편집마다 타입 에러와 미사용 import를 잡는다 |
| 프롬프트 입력에 `/voice`를 쓴다 | 말하기가 타이핑보다 빠르고 프롬프트가 훨씬 상세해진다 |
| auto mode와 `/focus`와 `/goal`을 결합한다 | 간결한 브리프를 쓰고 goal을 걸고 자리를 뜬다 |
| `Ctrl+G`로 계획을 에디터에서 편집한다 | 대화창에 교정을 타이핑하는 것보다 빠르다 |
| 새 프로토콜과 코드베이스는 ASCII 다이어그램을 요청한다 | Boris가 낯선 코드를 빠르게 파악하는 방법 |

병렬 세션 항목에 저자의 반응이 붙어 있다. 팀은 이를 단일 최대 생산성 해제로 부르는데, 저자는 일주일 동안 저항한 뒤에야 동의했다고 적는다.

Closing Notes는 다섯 가지를 남긴다. `CLAUDE.md`는 계속 쌓이는 인프라이고, `CLAUDE.local.md`는 PR 피드백을 담는 그릇이며, 스킬은 재사용 가능한 전문성의 단위이고, 서브에이전트가 모든 것을 담은 프롬프트보다 낫고, 병렬 세션은 사람들이 가장 과소평가하는 해제다.

## 한계

**출처 링크가 없다.** Boris Cherny의 2~3배 향상과 Cat Wu 인용 같은 핵심 수치와 발언에 영상 timestamp나 X 스레드 링크가 붙어 있지 않다. Resources 절이 제시하는 것은 howborisusesclaudecode.com과 Anthropic blog 정도다.

**버전 의존성이 크다.** `/goal`, `/teleport`, `/voice`, `/schedule`, auto mode, `--bare`, `CLAUDE_CODE_AUTO_COMPACT_WINDOW`는 특정 Claude Code 버전 기능이라 빠르게 바뀔 수 있다. "Opus 4.7" 언급도 2026년 5월 시점 기준이다.

**개인 경험을 일반화하기 어렵다.** 컴포넌트 약 2,000개 마이그레이션과 포트 22360 Obsidian MCP 같은 1인칭 사례는 특정 설정을 전제한다. 저자 본인도 설정과 결과가 사람마다 다를 것이라고 면책 표기를 단다.

**저장소 수치가 스냅샷이다.** 플러그인 수, 마켓플레이스 수, 스킬 종수, 에이전트 종수는 시점에 따라 바뀐다.

**비용 논의가 없다.** `model: opus`를 기본으로 삼고 세션 3~5개를 병렬로 돌리는 선택은 토큰 비용을 크게 늘린다. 글은 이 비용 대비 효과를 정량적으로 다루지 않는다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| plan mode | `Shift+Tab` 두 번으로 진입하는 읽기 전용 모드. Claude가 파일을 읽고 계획을 제시하면 사용자가 `Ctrl+G`로 편집한 뒤 실행한다 |
| Compounding Engineering | 모든 PR 리뷰를 `CLAUDE.md` 개선으로 전환해 룰을 계속 쌓는 Boris Cherny의 실천. PR 코멘트의 `@claude add to CLAUDE.md ...`가 수단이다 |
| Ralph Loop | `/goal`이 구현한, 완료 조건이 충족될 때까지 자율 반복하는 루프. 중단 시도마다 transcript를 조건과 대조한다 |
| progressive disclosure | 필요한 시점에만 정보를 단계적으로 노출하는 설계. 스킬은 세션 시작 시 description만 읽고 발동 시점에 전문을 가져온다 |
| context rot | 컨텍스트가 일정 토큰 수를 넘으면 품질이 저하되는 현상. 1M 모델 기준 30만~40만 토큰 부근으로 적는다 |
| blast radius | 서브에이전트가 잘못 동작했을 때 영향이 미치는 범위. 도구 권한을 좁히면 줄어든다 |

## 관련 페이지

- [[agents/patel-2026-i-taught-myself-claude-code]]: 성이 같은 다른 저자 Manthan Patel이 Claude Code를 익힌 과정을 기록한 글이다. 본 페이지가 정리한 설정 체계와 같은 대상을 다룬다
- [[agents/osmani-2026-loop-engineering]]: 같은 harness를 루프 설계 관점에서 다룬다. harness는 모델을 감싸 도구와 검증과 상태를 제공하는 실행 환경을 뜻하며, 본 글이 그 구성 요소를 나열한다면 이 글은 구성 요소가 도는 순환 자체를 설계 대상으로 삼는다
- [[agents/thariq-2026-know-your-unknowns]]: Claude Code 팀 구성원이 쓴 글로, 본 글의 verification 규칙이 왜 필요한지를 모델의 인식 한계 쪽에서 설명한다
- [[agents/trq212-2026-a-field-guide-to-fable]]: 자율 실행 에이전트의 실전 운용 기록이다. 본 글의 `/goal`과 auto mode 조합이 다루는 무인 실행 구간과 문제 영역이 겹친다
- [[agents/google-2026-the-new-sdlc-with-vibe]]: 에이전트 기반 개발이 소프트웨어 수명주기 전체를 어떻게 바꾸는지를 다룬다. 본 글이 개인 도구 설정 차원이라면 이 글은 프로세스 차원이다
- [[etc/rahman-2026-a-practical-guide-to-becoming]]: 조직과 팀 차원의 AI-native engineering 처방이다. 본 글의 도구 차원 매뉴얼과 추상도가 다른 짝이며, 둘 다 context engineering과 verification과 멀티에이전트 오케스트레이션과 MCP를 공유한다
