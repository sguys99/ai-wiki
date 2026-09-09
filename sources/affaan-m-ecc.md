---
title: "ECC: The agent harness performance optimization system"
type: repo
year: 2026
category: agents
raw_path: raw/repos/affaan-m-ecc.md
raw_filename: "affaan-m-ecc.md"
source_collection: external
org: "affaan-m"
repo: "ECC"
url: "https://github.com/affaan-m/ECC"
license: "MIT"
tags: [agents, harness, skill, hook, memory, security, claude-code]
figures:
  - id: fig01
    label: hero banner
    kind: figure
    file: assets/affaan-m-ecc/fig01.png
    raw: https://raw.githubusercontent.com/affaan-m/ECC/main/assets/hero.png
    caption: "v2.0.0 시점 카탈로그 카드. 스킬 261개, agent 64개, 명령 84개와 지원 harness 7종을 항목 이름과 함께 보여준다"
    strategy: manual
    curated: true
  - id: fig02
    label: plan canvas demo
    kind: figure
    file: assets/affaan-m-ecc/fig02.gif
    raw: https://raw.githubusercontent.com/affaan-m/ECC/main/docs/releases/2.1.0/assets/ecc-plan-canvas-demo.gif
    caption: "Plan Canvas 화면. 왼쪽에 렌더된 계획 문서와 Mermaid 다이어그램이 있고 오른쪽 레일에 계획 승인과 변경 요청 버튼, agent 대화 입력창이 있다 (애니메이션 GIF)"
    strategy: manual
    curated: true
  - id: fig03
    label: star history
    kind: figure
    file: assets/affaan-m-ecc/fig03.svg
    raw: https://raw.githubusercontent.com/affaan-m/ECC/main/assets/star-history-light.svg
    caption: "2026년 1월 18일부터 2월 7일까지 star 4만 개가 쌓인 초기 성장 곡선"
    strategy: manual
    curated: true
---

## 한 줄 요약 (One-line Summary)

ECC는 `plan → test → implement → review → verify → remember → improve` 순서의 엔지니어링 절차를 프롬프트가 아니라 설치물로 만들어 coding agent harness에 심는 MIT 라이선스 오픈소스이며, agent 68개, 스킬 286개, 명령 shim 94개, 훅 런타임, 규칙 팩, 메모리 vault, AgentShield 보안 스캐너를 하나의 플러그인으로 배포한다.

## 1. 자료 정보 (Document Information)

- URL: https://github.com/affaan-m/ECC
- 조직과 저장소: affaan-m / ECC. 유지 관리자는 Affaan Mustafa 단독이다
- 라이선스: MIT
- 주 언어: JavaScript. Shell, TypeScript, Python, Go, Java, Perl, Markdown 자산이 함께 들어 있다
- 저장소 생성 2026-01-18, 최종 push 2026-09-08, star 254,260, fork 38,104, watcher 1,289, open issue 184 (수집 시점 GitHub API 기준)
- 웹사이트 https://ecc.tools, 커뮤니티 Discord, GitHub App `ecc-tools`
- 배포 채널이 네 개로 나뉘고 식별자가 서로 다르다. GitHub 소스는 `affaan-m/ECC`, Claude 마켓플레이스와 플러그인 식별자는 `ecc@ecc`, npm 패키지는 `ecc-universal`과 `ecc-agentshield`, 호스팅 서비스는 GitHub App이다. 저장소는 이 불일치가 의도된 것이라고 명시한다. Anthropic 마켓플레이스 설치가 canonical 플러그인 식별자로 키를 잡기 때문에 도구 이름과 슬래시 명령 네임스페이스를 짧게 유지하려고 `ecc@ecc`를 쓴다
- npm 릴리스는 커밋 단위가 아니라 버전 태그 단위로 잘린다. 따라서 `ecc-universal`은 2.1, 2.2 같은 릴리스를 따라가고 `main`의 모든 push를 따라가지 않는다
- README는 13개 언어로 번역되어 있다 (영어, 포르투갈어, 간체 중국어, 번체 중국어, 일본어, 한국어, 튀르키예어, 러시아어, 베트남어, 태국어, 독일어, 스페인어, 우크라이나어)
- 저장소 문서는 README 외에 `the-shortform-guide.md`, `the-longform-guide.md`, `the-security-guide.md` 세 편의 가이드를 둔다. README는 "이 저장소는 원 코드이고 가이드가 설명을 담당한다"고 역할을 나눈다
- 저자 배경은 README의 Background 절에 있다. Claude Code 실험 배포 시점부터 사용했고, 2025년 9월 Anthropic x Forum Ventures 해커톤에서 우승했으며, zenith.chat을 agentic 워크플로만으로 구축했다고 밝힌다
- README 상단에 공식 배포 채널 외의 재업로드와 비공식 미러는 유지 관리도 검토도 되지 않으며 악성코드가 들어 있을 수 있다는 경고를 둔다

## 2. 주요 기여 (Key Contributions)

**절차를 설치물로 만든다.** ECC의 출발점은 "agent는 코드를 쓸 수 있지만 조율된 엔지니어링 시스템은 없다"는 진단이다. 계획, 테스트, 구현, 리뷰, verification, 기억, 개선의 순환을 매 프롬프트마다 다시 지시하는 대신 한 번 설치해 agent의 기본 동작으로 만든다. README가 내건 표어는 "context window를 최적화하고 나머지는 전부 영속화하라"이다.

**카탈로그 규모.** 설치 시 따라오는 구성 요소를 README 상단 표가 정리한다.

| 구성 요소 | 개수 | 제공하는 것 |
|---|---|---|
| Agents | 68개 | 계획, 리뷰, 빌드 복구, 보안, 아키텍처, 도메인 작업 |
| Skills | 286개 | TDD, 리서치, 보안, 문서, 프런트엔드, 데이터, ML, 운영 |
| Commands | 94개 | 스킬 우선 구조로 이행하는 동안 유지되는 진입점 |
| Hooks and memory | 런타임 | 강제, 세션 요약, 지속 학습, instinct, 컨텍스트 제어 |
| Rules | 선택 | 언어나 프로젝트 단위로 고르는 상시 로드 표준 |
| AgentShield | 포함 | 프롬프트, 훅, MCP 설정, 권한, 시크릿, agent 파일 스캔 |

**개념을 네 층으로 분리한다.** 스킬, agent, 규칙, 훅은 서로 다른 문제를 풀고 컨텍스트 소비 방식도 다르다. ECC는 이 분리를 저장소 전체가 커져도 매 세션에 전부 로드되지 않게 하는 수단으로 삼는다.

**하나의 저장소로 7개 이상 harness를 지원한다.** Claude Code를 기준 구현으로 두고 Codex, Cursor, OpenCode, Gemini, Zed, GitHub Copilot, Antigravity, Qwen, Hermes, OpenClaw, Kimi, CodeBuddy, JoyCode에 어댑터를 제공한다. 저장소 루트가 진실의 원천이고 각 어댑터는 같은 워크플로를 포장하거나 매핑할 뿐 별도 사본을 유지하지 않는다.

**선택 설치 아키텍처.** v1.9.0에서 매니페스트 기반 설치 파이프라인(`install-plan.js`, `install-apply.js`)과 SQLite 상태 저장소를 도입해 구성 요소 단위 설치와 증분 갱신, 안전한 제거를 가능하게 했다.

**지속 학습(instinct).** 세션에서 관찰된 패턴을 confidence 점수와 함께 instinct로 축적하고, SessionStart 시점에 관련도가 높은 것만 컨텍스트에 주입한다. instinct는 가져오기, 내보내기, 군집화를 통해 스킬로 승격할 수 있다.

**Unified Memory Vault.** Claude, Codex, Hermes, OpenClaw, Kimi를 비롯한 여러 harness가 하나의 로컬 Markdown 형식으로 지속 컨텍스트와 handoff를 공유한다.

**AgentShield.** agent 설정 자체를 공격 표면으로 보고 감사하는 별도 스캐너를 포함한다.

**토큰 최적화 지침.** 모델 선택, thinking 토큰 상한, autocompact 임계값, MCP 개수 관리를 수치와 함께 제시한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 네 층 개념 모델

| 개념 | 하는 일 | 컨텍스트 동작 |
|---|---|---|
| 스킬 | TDD, 보안 리뷰, 심층 리서치 같은 재사용 워크플로 | 과제가 필요로 할 때 로드된다 |
| Agent | 자기 컨텍스트와 도구 권한을 가진 범위 한정 작업자 | 계획, 구현, 리뷰를 서로 격리한다 |
| 규칙 | 프로젝트나 언어의 지속 표준 | 항상 로드되므로 선택적으로 설치한다 |
| 훅 | harness 이벤트에 반응하는 스크립트 | 모델 컨텍스트 바깥에서 실행된다 |
| Instinct | 실제 세션에서 학습된 패턴과 confidence 점수 | 관련될 때 회상된다 |

스킬이 canonical 워크플로 표면이고 `commands/`는 이행기의 호환 진입점이다. 은퇴한 짧은 이름 shim(`/tdd`, `/eval`, `/verify`, `/e2e`, `/orchestrate`)은 `legacy-command-shims/`로 옮겨 명시적으로 선택해야만 쓰도록 했다. 신규 워크플로 개발은 `skills/`에 먼저 들어간다.

### 3.2 저장소 구조

```text
ECC/
|-- agents/           # 68개 전문 서브에이전트
|-- skills/           # 필요 시 로드되는 재사용 워크플로
|-- commands/         # 유지되는 슬래시 명령 shim 94개
|-- rules/            # 선택 설치하는 공통과 언어별 표준
|-- hooks/            # 런타임 자동화와 강제
|-- scripts/          # 설치, 복구, 동기화, 오케스트레이션, 점검
|-- .claude-plugin/   # Claude Code 마켓플레이스 매니페스트
|-- .codex/           # Codex 참조 설정과 agent 역할
|-- .opencode/        # OpenCode 플러그인, 명령, 지시문
|-- .cursor/          # Cursor 규칙과 훅 어댑터
|-- docs/             # 공개 설치, 아키텍처, 운영 가이드
```

agent 목록은 계획과 리뷰 계열(`planner`, `architect`, `tdd-guide`, `code-reviewer`, `security-reviewer`, `build-error-resolver`, `e2e-runner`, `refactor-cleaner`, `doc-updater`, `docs-lookup`)과 언어별 리뷰 계열(`cpp-reviewer`, `fsharp-reviewer`, `go-reviewer`, `python-reviewer`, `typescript-reviewer`, `java-reviewer`, `kotlin-reviewer`, `rust-reviewer`, `database-reviewer`), 빌드 복구 계열(`cpp-build-resolver`, `go-build-resolver`, `java-build-resolver`, `kotlin-build-resolver`, `rust-build-resolver`, `pytorch-build-resolver`), 운영 계열(`chief-of-staff`, `loop-operator`, `harness-optimizer`, `mle-reviewer`, `harmonyos-app-resolver`)로 나뉜다.

스킬은 언어와 프레임워크 팩(`django-*`, `laravel-*`, `springboot-*`, `quarkus-*`, `golang-*`, `python-*`, `cpp-*`, `perl-*`, `swift-*`), 워크플로 팩(`tdd-workflow`, `security-review`, `eval-harness`, `verification-loop`, `search-first`, `iterative-retrieval`, `strategic-compact`, `autonomous-loops`), 학습 팩(`continuous-learning`, `continuous-learning-v2`, `skill-stocktake`), 사업과 콘텐츠 팩(`article-writing`, `content-engine`, `market-research`, `investor-materials`, `investor-outreach`, `frontend-slides`)으로 구성된다.

규칙은 `common/`에 언어 무관 원칙 8종(코딩 스타일, git 워크플로, 테스트, 성능, 패턴, 훅, agent, 보안)을 두고 그 아래 `typescript/`, `python/`, `golang/`, `swift/`, `php/`, `arkts/`로 나눈다. 규칙은 항상 로드되므로 필요한 언어 팩만 복사하라고 권고한다.

### 3.3 설치 경로

설치 방법이 여러 개이고, 같은 harness에 두 방법을 겹치면 스킬, 명령, 훅, 설정이 중복된다. README는 harness마다 하나만 고르라고 반복해 경고한다.

| 경로 | 명령 | 성격 |
|---|---|---|
| 유니버설 가이드 설치 | `npx ecc-universal setup` | 권장 기본값. 마켓플레이스와 모든 Claude 설치 scope를 먼저 조사한 뒤 설치, 갱신, scope 이동을 수행한다 |
| 멀티 harness 마법사 | `npx ecc-universal install --guided` | Claude Code, Codex, Kimi Code를 한 흐름에서 설정한다 |
| Claude 네이티브 플러그인 | `/plugin marketplace add ...` 후 `/plugin install ecc@ecc` | Claude Code가 파서를 소유하므로 ECC가 오류를 가로챌 수 없다 |
| 소스 체크아웃 설치 | `./install.sh --profile ... --target ...` | 프로파일과 대상 harness를 직접 지정한다 |
| 구성 요소 수동 복사 | `cp agents/*.md ~/.claude/agents/` 등 | 각 구성 요소는 완전히 독립적이다 |

Claude Code 플러그인은 `rules`를 배포할 수 없어 규칙 팩은 항상 별도로 복사해야 한다. `rules/common`에 실제로 쓰는 언어 팩 하나를 더하는 조합을 권장한다.

훅 런타임을 만들어내는 프로파일이나 모듈로 설치하면 명시적 결정을 요구한다. `--enable-hooks`나 `--no-hooks` 없이 실행하면 설치기가 훅이 무엇을 할 수 있는지 출력하고 아무것도 쓰기 전에 멈춘다.

상태 점검과 복구는 `list-installed`, `doctor`, `repair`, `uninstall --dry-run` 순서를 따르며, ECC는 자기 설치 상태에 기록된 파일만 제거하고 harness 디렉터리의 무관한 파일은 건드리지 않는다.

`node scripts/ecc.js consult "security reviews" --target claude`는 작업 설명을 받아 맞는 구성 요소, 관련 프로파일, 미리보기와 설치 명령을 돌려주는 자문 도구다.

### 3.4 훅 런타임 제어

훅 파일을 수정하지 않고 환경 변수로 강도를 조절한다.

| 환경 변수 | 기본값 | 하는 일 |
|---|---|---|
| `ECC_HOOK_PROFILE` | `standard` | `minimal`, `standard`, `strict` 중 강도를 고른다 |
| `ECC_DISABLED_HOOKS` | 없음 | 쉼표로 구분한 훅 ID를 비활성화한다 |
| `ECC_SESSION_START_MAX_CHARS` | 8000 | SessionStart가 주입하는 추가 컨텍스트 길이를 제한한다 |
| `ECC_SESSION_START_CONTEXT` | 켜짐 | `off`로 두면 추가 컨텍스트 주입을 완전히 끈다 |
| `ECC_SESSION_RETENTION_DAYS` | 30 | 세션 임시 파일 보존 기간. 0이나 off 계열 값이면 정리하지 않는다 |
| `ECC_MAX_INJECTED_INSTINCTS` | 6 | SessionStart가 주입하는 instinct 개수 상한 |
| `ECC_INSTINCT_CONFIDENCE_THRESHOLD` | 0.7 | 주입에 필요한 최소 confidence |
| `ECC_INSTINCT_RELEVANCE_RANKING` | on | confidence만이 아니라 프로젝트와 스택 관련도를 함께 반영해 순위를 매긴다 |
| `ECC_CONTEXT_MONITOR_COST_WARNINGS` | on | off로 두면 API 요금 추정 경고만 끄고 컨텍스트, 범위, 루프 경고는 남긴다 |
| `ECC_AGENT_DATA_HOME` | `~/.claude` | 세션 요약, 학습 스킬, 세션 별칭, 메트릭이 저장되는 루트 |

`ECC_AGENT_DATA_HOME`은 한 기기에서 Claude Code와 Cursor를 함께 쓸 때 두 환경이 서로의 세션 파일을 덮어쓰지 않게 하는 경계다. Cursor 설치 시 `sessionStart` 훅이 이 변수를 세션 전체에 주입하고, 변수가 없으면 훅 런타임이 `CURSOR_VERSION`이나 `CURSOR_PROJECT_DIR` 존재를 보고 `~/.cursor/ecc`를 기본값으로 삼는다.

### 3.5 크로스 harness 어댑터

Cursor 어댑터는 중복을 만들지 않는 방식을 택했다. Cursor는 Claude Code보다 훅 이벤트가 많아서(20개 대 8개), `.cursor/hooks/adapter.js`가 Cursor의 stdin JSON을 Claude Code 형식으로 변환한 뒤 기존 `scripts/hooks/*.js`를 그대로 재사용한다. Cursor 설치물은 훅 이벤트 15종, 훅 스크립트 16개, 규칙 34개(공통 9개와 언어별 25개), agent 48개를 포함하며 agent 파일은 사용자나 마켓플레이스 agent와 충돌하지 않도록 `ecc-` 접두사를 붙인다.

Codex는 저장소 루트를 가리키는 네이티브 마켓플레이스 플러그인이 현재 권장 경로다. `codex plugin marketplace add affaan-m/ECC` 다음에 `codex plugin add ecc@ecc`를 실행하고 `node scripts/codex/check-plugin-cache.js`로 캐시가 스킬과 MCP 설정, 자산을 해석할 수 있는지 확인한다. Codex는 Claude의 `user`, `project`, `local` scope 구분이 없고 활성 `CODEX_HOME`에 하나의 플러그인 상태만 저장한다. 네이티브 훅은 명시적 신뢰 결정을 요구하며 Claude의 훅 프로파일 네 종을 쓰지 않는다. 이전의 `scripts/sync-ecc-to-codex.sh` 복사 방식은 호환 목적으로만 남았고, 새 동기화 실행은 소유권 매니페스트를 기록해 사용자가 수정한 파일을 정리 과정에서 보존한다.

OpenCode는 플러그인 이벤트 20종 이상을 제공하며 Claude Code 훅과 대응한다.

| Claude Code 훅 | OpenCode 플러그인 이벤트 |
|---|---|
| PreToolUse | `tool.execute.before` |
| PostToolUse | `tool.execute.after` |
| Stop | `session.idle` |
| SessionStart | `session.created` |
| SessionEnd | `session.deleted` |

GitHub Copilot은 훅 시스템과 서브에이전트 API가 없어 지시문 층만 제공한다. `.github/copilot-instructions.md`가 상시 규칙을 담당하고 `.github/prompts/`에 `plan`, `tdd`, `security-review`, `build-fix`, `refactor` 프롬프트를 두며 `.vscode/settings.json`이 `chat.promptFiles`를 활성화한다.

루트 `AGENTS.md`가 범용 크로스 도구 파일이고 Claude Code, Cursor, Codex, OpenCode가 함께 읽는다. 다만 Cursor에는 루트 `AGENTS.md`를 설치하지 않는다. Cursor가 중첩된 `AGENTS.md`를 디렉터리 컨텍스트로 취급하기 때문에 ECC의 저장소 정체성이 호스트 프로젝트를 오염시키는 것을 막기 위해서다.

### 3.6 Unified Memory Vault

프로젝트와 팀 메모리는 `.ecc/memory/`, 사용자 메모리는 `~/.ecc/memory/`에 저장되며 형식은 `ecc.memory.v1` Markdown 문서다. 벤더 대화 기록을 복사하지 않는다.

```bash
ecc memory init --scope project
ecc memory handoff --from hermes --target codex --title "..." --body-file ./handoff.md
ecc memory search "authentication migration" --target-harness codex
ecc memory doctor
```

신뢰 경계를 명시적으로 그어 둔다. 메모리는 검토되지 않은 컨텍스트이지 실행 가능한 정책이 아니다. 프로젝트 메모리는 fail-closed `.gitignore`로 보호되고, 팀 scope는 사람이 검토하고 버전 관리하는 공유에만 쓴다. 커밋된 뒤에도 팀 메모리는 여전히 검토되지 않은 컨텍스트다. 메모리 본문은 `--stdin`이나 `--body-file`로만 받고 명령줄 값으로는 받지 않는다. 첫 릴리스는 모든 항목을 생성 전용으로 유지하며, 승인된 지식은 메모리 신뢰 등급을 바꾸는 대신 관리되는 프로젝트 문서로 승격한다. 일반 검색 회상은 활성 프로젝트와 팀 메모리만 반환하고 사용자 scope 회상은 명시적으로 요청해야 한다. agent는 회상한 본문을 실행 가능한 지시나 정책으로 취급해서는 안 된다.

스킬 전용, minimal, 수동, Claude 플러그인 설치는 메모리 vault 런타임을 `PATH`에 올리지 않으므로 `npm install -g ecc-universal`로 따로 설치해야 한다. 선택 사항인 `ecc-memory-mcp` stdio 서버가 같은 save, search, read, doctor 표면을 노출하지만 기본 활성화되지 않는다.

### 3.7 Plan Canvas

ECC 2.1의 대표 기능이다. agent가 계획을 쓰면 loopback 전용 브라우저 canvas로 연다. 사용자는 원하는 부분을 클릭해 번호가 붙은 주석을 달고, 옆 레일에서 대화하고, 계획 승인이나 변경 요청 버튼을 누른다. 그 판정이 `/plan`의 CONFIRM 게이트로 그대로 연결된다. Mermaid 다이어그램이 실시간 렌더되고 계획 파일을 편집하면 페이지가 다시 로드된다. 구현은 JSON으로 통신하는 일반 CLI(`ecc-plan-canvas`)라서 harness와 모델에 종속되지 않는다.

### 3.8 AgentShield

2026년 2월 Cerebral Valley와 Anthropic이 연 Claude Code 해커톤에서 만들어졌다. 테스트 1,282개, 커버리지 98%, 정적 분석 규칙 102개를 갖는다.

```bash
npx ecc-agentshield scan
npx ecc-agentshield scan --fix
npx ecc-agentshield scan --opus --stream
npx ecc-agentshield init
```

스캔 대상은 `CLAUDE.md`, `settings.json`, MCP 설정, 훅, agent 정의, 스킬이며 다섯 범주로 나뉜다. 시크릿 탐지(패턴 14종), 권한 감사, 훅 인젝션 분석, MCP 서버 위험도 프로파일링, agent 설정 검토다. `--opus` 플래그는 Claude Opus 4.6 agent 세 개를 red team, blue team, 감사관 파이프라인으로 실행한다. 공격자가 익스플로잇 체인을 찾고 방어자가 보호 수단을 평가하며 감사관이 둘을 종합해 우선순위가 매겨진 위험 평가를 만든다. 패턴 매칭이 아니라 적대적 추론이라는 점이 차별점이다. 출력 형식은 터미널(A에서 F까지 색상 등급), JSON, Markdown, HTML이며 치명적 발견이 있으면 종료 코드 2를 반환해 빌드 게이트로 쓸 수 있다.

ECC 본체에도 가드레일이 있다. GateGuard가 파괴적 셸 명령(`rm`, force 또는 경로 지정 `git checkout`, 파괴적 `find -exec` 포함)을 실행 전에 차단하고, 공급망 IOC 스캐너가 CI에서 실행된다.

### 3.9 TDD 워크플로

ECC가 내세우는 핵심 절차다.

```text
/ecc:plan "Add usage-based billing alerts"
  -> 계획을 확인하거나 편집한다
  -> tdd-workflow를 활성화한다
  -> 구현 전에 RED 증거를 확보한다
  -> GREEN이 될 때까지 구현한다
  -> 새 컨텍스트에서 리뷰한다
  -> 발견 사항을 회귀 테스트와 함께 수정한다
  -> 빌드, lint, 타입, 테스트를 verification한다
```

결과물은 코드만이 아니라 증거의 흔적이다. 계획, 실패하는 테스트, 통과하는 테스트, 리뷰 발견 사항, 최종 verification이 함께 남는다.

### 3.10 시스템 유무 대비

README는 ECC의 가치를 여섯 항목의 대비표로 제시한다.

| 시스템이 없을 때 | ECC가 있을 때 |
|---|---|
| 계획이 대화 기록 속으로 사라진다 | 구현 시작 전에 계획이 편집 가능한 산출물이 된다 |
| "TDD를 쓰세요"는 모델이 잊을 수 있는 지시다 | TDD가 RED에서 GREEN을 거쳐 REFACTOR로 가는 증거 기반 게이트 워크플로가 된다 |
| 같은 컨텍스트가 코드를 쓰고 또 리뷰한다 | 새 컨텍스트의 리뷰어가 회귀와 사각지대를 찾는다 |
| 기억이란 방대한 대화 기록을 저장하는 것이다 | 세션이 요약, instinct, 재사용 스킬로 정제된다 |
| 품질 점검이 리마인더에 의존한다 | 훅이 프롬프트 바깥에서 결정론적 검사를 강제한다 |
| agent 설정은 기본적으로 신뢰된다 | AgentShield가 harness 자체를 공격 표면으로 스캔한다 |

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 채택 지표

star 254,260개, fork 38,104개, watcher 1,289명이다. README에 포함된 star history 그래프는 2026년 1월 18일부터 2월 7일까지 3주 남짓 만에 star 4만 개가 쌓인 초기 구간을 보여준다. GitHub Trending Repository of the Day 배지와 star history 글로벌 순위 배지를 상단에 단다.

### 4.2 테스트 스위트 규모

릴리스마다 내부 테스트 수가 공개되며 꾸준히 늘어난다.

| 릴리스 | 내부 테스트 수 |
|---|---|
| v1.6.0 | 978개 |
| v1.7.0 | 992개 |
| v1.8.0 | 997개 |

AgentShield는 별도로 테스트 1,282개와 커버리지 98%, 정적 분석 규칙 102개를 보고한다. v1.9.0에서는 CI 강화 작업으로 테스트 실패 19건을 수정하고 카탈로그 개수 검사와 설치 매니페스트 검증을 추가했다.

### 4.3 토큰 최적화 권장값

README는 `~/.claude/settings.json`에 넣을 설정과 기대 효과를 수치로 제시한다.

| 설정 | 기본값 | 권장값 | 효과 |
|---|---|---|---|
| `model` | opus | sonnet | 비용 약 60% 감소. 코딩 과제의 80% 이상을 처리한다 |
| `MAX_THINKING_TOKENS` | 31,999 | 10,000 | 요청당 숨은 thinking 비용 약 70% 감소 |
| `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` | 95 | 50 | compaction을 더 일찍 수행해 긴 세션 품질을 높인다 |
| `ECC_CONTEXT_MONITOR_COST_WARNINGS` | on | 구독 사용자는 off | agent에게 노출되는 API 요금 추정 경고만 억제한다 |

깊은 아키텍처 추론이 필요할 때만 `/model opus`로 전환하라고 권한다.

### 4.4 컨텍스트 예산 수치

MCP 서버를 한꺼번에 켜지 말라고 경고한다. MCP 도구 설명이 20만 토큰 context window에서 토큰을 소비해 실사용 가능 범위를 약 7만 토큰까지 줄일 수 있다. 권장 상한은 프로젝트당 활성 MCP 10개 미만, 활성 도구 80개 미만이다. SessionStart 추가 컨텍스트는 기본 8,000자로 제한되며 로컬 모델이나 저컨텍스트 환경에서는 4,000자로 낮추거나 완전히 끌 수 있다.

MCP 비활성화 경로도 구분한다. Claude Code 런타임에서는 `/mcp`를 쓰고 그 선택은 `~/.claude.json`에 기록된다. `.claude/settings.json`과 `.claude/settings.local.json`은 이미 로드된 MCP 서버를 끄는 신뢰할 수 있는 수단이 아니다. `ECC_DISABLED_MCPS`는 설치와 동기화 흐름에서 ECC가 생성하는 MCP 설정을 걸러내는 필터이지 실시간 토글이 아니다.

Agent Teams는 여러 컨텍스트를 동시에 만들어 각 구성원이 독립적으로 토큰을 소비하므로 병렬성이 명확한 이득을 주는 작업에만 쓰라고 권고한다. 단순한 순차 작업에는 서브에이전트가 토큰 효율이 더 좋다.

### 4.5 전략적 compaction 판단 기준

`strategic-compact` 스킬은 컨텍스트 95%에서 자동 compaction이 걸리기를 기다리는 대신 논리적 분기점에서 `/compact`를 제안한다.

- compaction을 할 때: 리서치와 탐색을 마치고 구현에 들어가기 전, 마일스톤을 끝내고 다음을 시작하기 전, 디버깅을 끝내고 기능 작업으로 돌아가기 전, 실패한 접근을 접고 새 접근을 시도하기 전
- compaction을 하지 말아야 할 때: 구현 도중. 변수 이름, 파일 경로, 부분 상태를 잃는다

### 4.6 릴리스 이력

| 버전 | 시기 | 주요 내용 |
|---|---|---|
| v2.1 | 2026 | Plan Canvas, Kimi Code 설치 대상, Itô GPU 자체 호스팅 경로, Hermes와 OpenClaw 대상, Codex 내비게이션 가이드 |
| v2.0.0 | 2026-06 | control-pane substrate, worktree 수명 주기 서비스, `orch-*` 오케스트레이터 계열, Discord 커뮤니티 출범 |
| v2.0.0-rc.1 | 2026-04 | Tkinter 데스크톱 대시보드, 운영자 워크플로 확장, `ecc2/` Rust control-plane 프로토타입, 상태 스냅샷 |
| v1.9.0 | 2026-03 | 선택 설치 아키텍처, agent 6종 추가, SQLite 상태 저장소, 12개 언어 생태계 규칙, 한국어와 중국어 번역 |
| v1.8.0 | 2026-03 | harness 성능 시스템 표방, 훅 신뢰성 개선, 훅 런타임 제어 변수, `/harness-audit` 계열 명령, NanoClaw v2 |
| v1.7.0 | 2026-02 | Codex 앱과 CLI 지원, `frontend-slides` 스킬, 사업과 콘텐츠 스킬 5종 |
| v1.6.0 | 2026-02 | Codex CLI 지원, AgentShield 통합, GitHub 마켓플레이스 출시, 커뮤니티 PR 30건 이상 병합 |
| v1.4.0 | 2026-02 | 설치 마법사, PM2와 멀티에이전트 오케스트레이션 명령 6종, 다국어 규칙 구조, 중국어 번역 |
| v1.3.0 | 2026-02 | OpenCode 플러그인 지원, 네이티브 커스텀 도구 3종 |
| v1.2.0 | 2026-02 | Django와 Spring Boot 스킬, `/sessions`, instinct 기반 지속 학습 v2 |

## 5. 한계와 향후 과제 (Limitations and Future Work)

### 5.1 플랫폼별 결함

README가 이슈 번호와 함께 현재 결함을 공개한다.

| 플랫폼 | 상태 | 현재 제약 |
|---|---|---|
| Linux | 코어 지원 | 선택 기능이 Bash, Python, 공급자별 도구를 요구할 수 있다 |
| macOS | 코어 지원 | 독립 GAN 셸 경로가 시스템 Bash 3.2와 호환되지 않고 점수 파싱 결함이 있다 (#2674) |
| Windows + WSL | 코어 지원 | WSL은 Linux 경로를 따르지만 Windows 호스트 통합은 harness마다 다르다 |
| Windows 네이티브 | 제약 있는 지원 | 지속 학습 v2의 observer 데몬과 메모리 vault 쓰기에 미해결 결함이 있다 (#2489, #2626). 셸 기반 선택 기능은 Git Bash나 WSL을 요구하거나 사용할 수 없다 |

### 5.2 harness별 기능 격차

`stable`, `beta`, `experimental`, `instruction-only`는 마케팅 등급이 아니라 능력 진술이라고 명시한다.

| Harness | 상태 | 중요한 제약 |
|---|---|---|
| Claude Code | 안정 기준 구현 | 플러그인이 설치된 카탈로그를 모델에 광고하므로 컨텍스트 크기가 중요하면 선택 설치를 쓴다 |
| Codex | 지원되는 네이티브 플러그인 | 네이티브 훅이 명시적 신뢰 결정을 요구하고 Claude 훅 프로파일을 쓰지 않는다 |
| Cursor | 베타 프로젝트 어댑터 | agent 발견 동작이 Cursor 빌드마다 다르고 훅 집합이 동일하지 않다 (#2419) |
| OpenCode | 베타 빌드 플러그인 | 카탈로그의 부분집합만 배포하며 공급자와 모델을 사용자가 선택해야 한다 (#2617) |
| GitHub Copilot | 지시문 전용 | 훅, 런타임 agent, delegation, 네이티브 스킬 발견이 전혀 없다 |
| Gemini, Zed, Antigravity, Qwen, Hermes, OpenClaw, Kimi, CodeBuddy, JoyCode | 실험적 최소 어댑터 | 파일 배치와 지시문 이식만 검증되었고 Claude 수준 기능 동등성은 주장하지 않는다 |

### 5.3 중복 설치 위험

같은 harness에 두 방법을 겹치면 스킬, 명령, 훅, 설정이 중복되고 훅이 두 번 실행된다. 가장 흔한 원인은 Claude 플러그인을 설치한 뒤 `./install.sh --profile full`을 덧씌우는 것이다. 회복 절차는 플러그인 제거, `uninstall --dry-run` 실행, 수동 복사한 규칙 폴더 삭제, 하나의 경로로 재설치 순이다.

관련해 `.claude-plugin/plugin.json`에 `"hooks"` 필드를 추가하면 안 된다는 경고를 반복한다. Claude Code v2.1 이상은 설치된 플러그인의 `hooks/hooks.json`을 관례로 자동 로드하므로 명시 선언은 중복 감지 오류를 낸다. 이 문제는 저장소에서 수정과 되돌림이 반복되었고(#29, #52, #103), 지금은 회귀 테스트로 재발을 막는다.

### 5.4 카탈로그 수치의 내부 불일치

README 안에서 구성 요소 개수가 절마다 다르다. 상단 요약은 agent 68개와 스킬 286개, 첫 디렉터리 트리는 스킬 284개, 주석 카탈로그는 agent 67개, v2.0.0 절은 스킬 281개와 agent 67개를 적는다. README 대문 이미지는 v2.0.0 기준으로 스킬 261개, agent 64개, 명령 84개, 합계 409개를 표시해 또 다른 값을 보여준다. 릴리스 시점 차이로 보이지만 자료 하나 안에서 숫자가 갈리므로 인용할 때 출처 절을 함께 밝혀야 한다.

### 5.5 신뢰와 공급망

훅은 셸 명령을 실행할 수 있고 MCP 서버는 자격 증명을 보유할 수 있으며 프로젝트 지시문은 agent 컨텍스트로 들어간다. README는 이 셋을 모두 실행 가능한 설정으로 취급하라고 요구한다. 플러그인 설치 후 `hooks/hooks.json`을 `~/.claude/settings.json`으로 복사하면 훅이 두 번 실행되므로 금지한다. 취약점 보고는 공개 이슈가 아니라 `SECURITY.md`의 비공개 절차를 쓴다.

### 5.6 Itô 연동의 미완성

`ecc ito`는 별도로 설치된 canonical Itô 클라이언트에 위임하며 ECC가 두 번째 API 클라이언트를 유지하지 않는다. 그런데 `ito-compute-cli` 패키지는 아직 공개되지 않았고, 비공개 Itô 런타임 저장소에서 직접 빌드한 뒤 `ECC_ITO_CLI_EXECUTABLE`에 절대 경로를 지정해야 한다. `find`는 실제 인증 RFQ를 제출하지만 capacity를 예약하지는 않으며, 관리형 추론은 아직 가동되지 않았다. ECC는 견적 잠금, 구매, 워크로드, 추론 경로를 노출하지 않고 클라이언트가 없거나 호출이 실패했을 때 로컬 결과로 대체하지 않는다.

### 5.7 유지 관리 구조

단독 유지 관리자가 7개 harness에 주 단위로 배포하는 구조이며, 이를 가능하게 하는 재원이 스폰서와 ECC Pro 구독이라고 명시한다. OSS 부분은 MIT로 영구 무료이고 ECC Pro는 비공개 저장소를 위한 호스팅 GitHub App이다.

## 6. 관련 연구 (Related Work)

- ECC는 Anthropic이 정의한 Agent Skills 포맷(SKILL.md와 YAML frontmatter)을 그대로 사용하며 Claude Code, Codex, OpenCode에서 동일하게 동작한다고 밝힌다. 다만 `claude-api`, `frontend-design`, `skill-creator` 같은 canonical Anthropic 스킬은 의도적으로 재번들하지 않고 `anthropics/skills`에서 설치하라고 안내한다
- AgentShield는 별도 저장소 `affaan-m/agentshield`와 GitHub Action으로도 배포된다
- 저장소가 참조하는 외부 문서는 Anthropic의 LLM gateway 문서와 model configuration 문서다
- Context7은 Codex 설정에서 canonical 절 이름 `[mcp_servers.context7]`으로 통일하고 `@upstash/context7-mcp` 패키지를 실행한다
- 기본 MCP 서버 구성은 GitHub, Context7, Exa, Memory, Playwright, Sequential Thinking 6종이며 동기화 시 Supabase를 더해 7종이 된다

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| harness | 모델을 감싸 도구와 verification, 상태를 제공하는 실행 환경. ECC는 Claude Code, Codex, Cursor 등을 모두 harness로 부른다 |
| instinct | 실제 세션에서 추출된 패턴을 confidence 점수와 함께 저장한 단위. 임계값을 넘으면 SessionStart 시점에 컨텍스트로 주입되고, 군집화해 스킬로 승격할 수 있다 |
| Plan Canvas | agent가 만든 계획을 loopback 전용 브라우저 페이지로 열어 특정 구간에 주석을 달고 승인 판정을 내리는 리뷰 도구. 판정이 `/plan`의 CONFIRM 게이트로 연결된다 |
| Memory Vault | `ecc.memory.v1` Markdown 형식으로 여러 harness가 공유하는 로컬 지속 컨텍스트 저장소. 프로젝트, 팀, 사용자 scope로 나뉜다 |
| AgentShield | agent 설정 자체를 공격 표면으로 보고 시크릿, 권한, 훅 인젝션, MCP 위험, agent 정의를 스캔하는 도구 |
| GateGuard | 파괴적 셸 명령을 실행 전에 차단하는 ECC 내장 가드레일 |
| hook profile | `minimal`, `standard`, `strict` 세 등급으로 훅 강도를 조절하는 설정. 훅 파일을 수정하지 않고 환경 변수로 바꾼다 |
| selective install | 매니페스트와 상태 저장소를 기반으로 구성 요소 단위 설치와 증분 갱신, 안전한 제거를 수행하는 v1.9.0 설치 아키텍처 |
| legacy-command-shims | `/tdd`, `/eval` 같은 은퇴한 짧은 이름 명령을 보관해 명시적으로 선택할 때만 쓰게 한 디렉터리 |
| ecc@ecc | Claude 마켓플레이스와 플러그인 식별자. GitHub 저장소 이름(`affaan-m/ECC`), npm 패키지 이름(`ecc-universal`)과 의도적으로 다르다 |

## 8. 그림 후보 (Figure Candidates)

repo 유형이므로 자동 추출은 하지 않았고, README 본문이 참조하는 이미지의 GitHub URL을 후보로 기록했다. 배지, 스폰서 로고, 커뮤니티 아이콘, 가이드 표지 썸네일은 도식이 아니라 제외했다.

| id | 원본 경로 | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | `assets/hero.png` | "v2.0.0 시점 카탈로그 카드와 지원 harness 목록" | manual | ★ wiki 확정 |
| fig02 | `docs/releases/2.1.0/assets/ecc-plan-canvas-demo.gif` | "Plan Canvas에서 계획을 검토하고 주석을 달아 승인하는 실행 장면" | manual | ★ wiki 확정 (2.1의 대표 기능) |
| fig03 | `assets/star-history-light.svg` | "2026년 1월 18일부터 2월 7일까지 star 4만 개가 쌓인 초기 성장 곡선" | manual | ★ wiki 확정 (채택 속도의 근거) |
