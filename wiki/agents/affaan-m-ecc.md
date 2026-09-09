---
title: "ECC: The agent harness performance optimization system"
type: repo
year: 2026
category: agents
source: affaan-m-ecc.md
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

## 요약

ECC는 coding agent가 따라야 할 엔지니어링 절차를 프롬프트가 아니라 설치물로 만드는 MIT 라이선스 오픈소스다. 계획을 세우고, 테스트를 먼저 쓰고, 구현하고, 새 컨텍스트에서 리뷰하고, verification하고, 기억하고, 반복된 성공을 재사용 가능한 스킬로 바꾸는 순환을 한 번 설치해 agent의 기본 동작으로 만든다.

배포물에는 agent 68개, 스킬 286개, 명령 shim 94개, 훅 런타임, 언어별 규칙 팩, 여러 harness가 공유하는 메모리 vault, agent 설정을 감사하는 AgentShield 스캐너가 들어 있다. Claude Code를 기준 구현으로 삼고 Codex, Cursor, OpenCode, GitHub Copilot을 비롯한 10여 종의 harness에 어댑터를 제공한다.

2026년 1월 18일에 공개되어 수집 시점 기준 star 254,260개와 fork 38,104개를 기록했다. 단독 유지 관리자가 스폰서와 유료 GitHub App 수익으로 개발을 이어가는 구조다.

배포 채널이 네 가지로 나뉘고 식별자도 서로 다르다. GitHub 소스는 `affaan-m/ECC`, Claude 마켓플레이스와 플러그인 식별자는 `ecc@ecc`, npm 패키지는 `ecc-universal`과 `ecc-agentshield`, 호스팅 서비스는 GitHub App `ecc-tools`다. 저장소는 이 불일치가 의도된 것이라고 밝힌다. Anthropic 마켓플레이스 설치가 canonical 플러그인 식별자를 기준으로 키를 잡기 때문에, 도구 이름과 슬래시 명령 네임스페이스를 검증기가 받아들일 만큼 짧게 유지하려고 `ecc@ecc`를 쓴다. npm 릴리스는 커밋 단위가 아니라 버전 태그 단위로 잘리므로 `ecc-universal`은 2.1이나 2.2 같은 릴리스를 따라가고 `main`의 모든 push를 반영하지 않는다.

저장소 자체는 원 코드이고 설명은 별도 가이드 세 편이 담당한다. `the-shortform-guide.md`가 설치와 첫날 사용, `the-longform-guide.md`가 컨텍스트 경제와 메모리, 평가, 병렬 agent, `the-security-guide.md`가 프롬프트 인젝션과 훅, MCP, AgentShield를 다룬다. README는 13개 언어로 번역되어 있다.

## 배경

agent가 코드를 쓸 수 있게 된 뒤에도 작업 품질은 매번 사람이 프롬프트에 적어 넣는 절차에 의존했다. ECC의 문제 인식은 여기서 출발한다. "TDD를 지키세요"는 모델이 잊을 수 있는 지시이고, 계획은 대화 기록 속으로 사라지며, 코드를 작성한 컨텍스트가 그대로 자기 코드를 리뷰한다.

같은 절차를 모든 프롬프트에서 다시 세우는 대신 한 번 설치하자는 것이 ECC의 제안이다. 저장소가 내건 표어는 "context window를 최적화하고 나머지는 전부 영속화하라"이다. 유한한 컨텍스트에는 지금 필요한 것만 두고, 계획과 리뷰 결과와 학습된 패턴은 파일 시스템에 남겨 다음 세션이 다시 읽게 한다.

ECC는 시스템의 유무를 여섯 항목으로 대비한다.

| 시스템이 없을 때 | ECC가 있을 때 |
|---|---|
| 계획이 대화 기록 속으로 사라진다 | 구현 시작 전에 계획이 편집 가능한 산출물이 된다 |
| "TDD를 쓰세요"는 모델이 잊을 수 있는 지시다 | TDD가 RED에서 GREEN을 거쳐 REFACTOR로 가는 증거 기반 게이트 워크플로가 된다 |
| 같은 컨텍스트가 코드를 쓰고 또 리뷰한다 | 새 컨텍스트의 리뷰어가 회귀와 사각지대를 찾는다 |
| 기억이란 방대한 대화 기록을 저장하는 것이다 | 세션이 요약, instinct, 재사용 스킬로 정제된다 |
| 품질 점검이 리마인더에 의존한다 | 훅이 프롬프트 바깥에서 결정론적 검사를 강제한다 |
| agent 설정은 기본적으로 신뢰된다 | AgentShield가 harness 자체를 공격 표면으로 스캔한다 |

## 핵심 개념

harness는 모델을 감싸 도구와 verification, 상태를 제공하는 실행 환경을 뜻한다. ECC는 Claude Code, Codex, Cursor, OpenCode를 모두 harness로 부르고, 자신을 특정 모델의 확장이 아니라 harness 위에 설치되는 시스템으로 정의한다.

ECC가 설치하는 구성 요소는 다섯 종류이고, 서로 다른 문제를 풀며 컨텍스트를 소비하는 방식도 다르다. 이 분리가 저장소 규모가 커져도 매 세션에 전부 로드되지 않게 하는 장치다.

| 개념 | 하는 일 | 컨텍스트 동작 |
|---|---|---|
| 스킬 | TDD, 보안 리뷰, 심층 리서치 같은 재사용 워크플로 | 과제가 필요로 할 때 로드된다 |
| Agent | 자기 컨텍스트와 도구 권한을 가진 범위 한정 작업자 | 계획, 구현, 리뷰를 서로 격리한다 |
| 규칙 | 프로젝트나 언어의 지속 표준 | 항상 로드되므로 선택적으로 설치한다 |
| 훅 | harness 이벤트에 반응하는 스크립트 | 모델 컨텍스트 바깥에서 실행된다 |
| Instinct | 실제 세션에서 학습된 패턴과 confidence 점수 | 관련될 때 회상된다 |

이 가운데 instinct가 ECC 고유의 개념이다. instinct는 실제 세션에서 추출한 패턴을 confidence 점수와 함께 저장한 단위를 말한다. 세션이 끝날 때 훅이 패턴을 뽑아 기록하고, SessionStart 시점에 confidence가 임계값을 넘는 것만 컨텍스트로 주입한다. 축적된 instinct는 서로 묶어 정식 스킬로 승격할 수 있다.

컨텍스트 소비 관점에서 규칙과 스킬의 차이가 중요하다. 규칙은 항상 로드되므로 하나를 추가할 때마다 모든 세션의 컨텍스트가 줄어든다. 반면 스킬은 과제가 필요로 할 때만 읽히므로 286개를 설치해도 평소 컨텍스트에는 부담을 주지 않는다. ECC가 규칙만은 "실제로 쓰는 언어 팩 하나만 고르라"고 반복해 권고하는 이유가 여기에 있다.

스킬이 canonical 워크플로 표면이고 슬래시 명령은 이행기의 호환 진입점이다. 은퇴한 짧은 이름 명령(`/tdd`, `/eval`, `/verify`, `/e2e`, `/orchestrate`)은 `legacy-command-shims/`로 옮겨 명시적으로 선택해야만 쓰이도록 분리했다. 신규 워크플로 개발은 `skills/`에 먼저 들어간다.

## 방법

### 카탈로그 구성

저장소 루트가 진실의 원천이고, 각 harness 어댑터는 같은 워크플로를 포장하거나 매핑할 뿐 별도 사본을 유지하지 않는다.

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
```

![[assets/affaan-m-ecc/fig01.png]]
*Figure 1: v2.0.0 시점 카탈로그 카드. 스킬 261개, agent 64개, 명령 84개와 지원 harness 7종을 항목 이름과 함께 보여준다 (affaan-m/ECC 2026)*

agent 68개는 역할별로 나뉜다. 계획과 리뷰를 맡는 `planner`, `architect`, `tdd-guide`, `code-reviewer`, `security-reviewer`가 중심이고, 언어별 리뷰어(`go-reviewer`, `python-reviewer`, `typescript-reviewer`, `java-reviewer`, `kotlin-reviewer`, `rust-reviewer`, `cpp-reviewer`, `fsharp-reviewer`, `database-reviewer`)와 빌드 복구 담당(`go-build-resolver`, `java-build-resolver`, `rust-build-resolver`, `pytorch-build-resolver` 등)이 붙는다. 운영 계열에는 `chief-of-staff`, `loop-operator`, `harness-optimizer`, `mle-reviewer`가 있다.

스킬 286개는 언어와 프레임워크 팩(`django-*`, `laravel-*`, `springboot-*`, `quarkus-*`, `golang-*`, `python-*`), 워크플로 팩(`tdd-workflow`, `security-review`, `eval-harness`, `verification-loop`, `search-first`, `iterative-retrieval`, `strategic-compact`, `autonomous-loops`), 학습 팩(`continuous-learning-v2`, `skill-stocktake`), 사업과 콘텐츠 팩(`article-writing`, `market-research`, `investor-materials`, `frontend-slides`)으로 묶인다.

규칙은 `common/` 아래에 언어 무관 원칙 8종을 두고 그 옆에 `typescript/`, `python/`, `golang/`, `swift/`, `php/`, `arkts/`를 나란히 둔다. 공통 원칙은 코딩 스타일, git 워크플로, 테스트, 성능, 패턴, 훅, agent 위임, 보안이다.

### 작업별 진입점

전체 카탈로그를 훑는 대신 지금 하려는 일에서 시작하라는 것이 사용 안내의 기조다.

| 하려는 일 | 시작 지점 |
|---|---|
| 기능을 만든다 | `/ecc:plan "기능 설명"` 다음에 `tdd-workflow` |
| 버그를 고친다 | 재현하는 실패 테스트를 먼저 쓰고 `tdd-workflow` |
| 새로 쓴 코드를 리뷰한다 | `/code-review`로 새 컨텍스트 리뷰 |
| 빌드를 복구한다 | `/build-fix` |
| 코드베이스를 정리한다 | `/refactor-clean` |
| 컨텍스트 압박을 확인한다 | `/context-budget` |
| 긴 세션을 마무리한다 | `/save-session` 또는 `/learn-eval` |
| 나중에 이어서 한다 | `/resume-session` |
| agent 설정을 감사한다 | `/security-scan` |

플러그인으로 설치하면 명령이 `/ecc:plan`처럼 네임스페이스가 붙은 형태로 노출되고, 수동 설치는 `/plan` 같은 짧은 호환 형태를 함께 제공할 수 있다. 어느 쪽이 설치되었는지는 `/plugin list ecc@ecc`로 확인한다.

각 진입점 뒤에는 담당 agent가 있다. `/ecc:plan`은 `planner`, `tdd-workflow`는 `tdd-guide`, `/code-review`는 `code-reviewer`, `/build-fix`는 `build-error-resolver`, `/security-scan`은 `security-reviewer`가 맡는다. `database-reviewer`처럼 자동 위임되는 agent도 있고, `typescript-reviewer`와 `fsharp-reviewer`처럼 직접 호출해야 하는 agent도 있다.

### 설치 경로와 중복 방지

설치 방법이 여럿이고, 그중 하나만 고르는 것이 사용 전제다.

| 경로 | 명령 | 성격 |
|---|---|---|
| 유니버설 가이드 설치 | `npx ecc-universal setup` | 권장 기본값. 마켓플레이스와 모든 Claude 설치 scope를 조사한 뒤 설치, 갱신, scope 이동을 수행한다 |
| 멀티 harness 마법사 | `npx ecc-universal install --guided` | Claude Code, Codex, Kimi Code를 한 흐름에서 설정한다 |
| Claude 네이티브 플러그인 | `/plugin install ecc@ecc` | Claude Code가 파서를 소유해 ECC가 오류를 가로챌 수 없다 |
| 소스 체크아웃 설치 | `./install.sh --profile ... --target ...` | 프로파일과 대상 harness를 직접 지정한다 |
| 구성 요소 수동 복사 | `cp agents/*.md ~/.claude/agents/` | 각 구성 요소는 완전히 독립적이다 |

같은 harness에 두 방법을 겹치면 스킬, 명령, 훅, 설정이 중복되고 훅이 두 번 실행된다. 반면 서로 다른 harness에 각각 한 번씩 설치하는 것은 문제가 없다. 가장 흔한 사고는 Claude 플러그인을 설치한 뒤 `./install.sh --profile full`을 덧씌우는 경우다.

Claude Code 플러그인은 규칙을 배포할 수 없다는 제약이 있어서, 규칙 팩만은 어느 경로로 설치하든 별도로 복사해야 한다.

```bash
mkdir -p ~/.claude/rules/ecc
cp -R rules/common ~/.claude/rules/ecc/
cp -R rules/typescript ~/.claude/rules/ecc/
```

훅 런타임을 만들어내는 프로파일로 설치하면 설치기가 명시적 결정을 요구한다. `--enable-hooks`나 `--no-hooks` 없이 실행하면 훅이 무엇을 할 수 있는지 출력한 뒤 아무것도 쓰지 않고 멈춘다. 훅이 셸 명령을 실행할 수 있다는 사실을 사용자가 인지한 상태에서만 설치되게 하려는 설계다.

v1.9.0부터는 매니페스트 기반 선택 설치가 들어갔다. `install-plan.js`와 `install-apply.js`가 설치 계획을 먼저 만들고 SQLite 상태 저장소가 무엇이 설치되었는지 기록하므로, 증분 갱신과 안전한 제거가 가능하다. 제거 시 ECC는 자기 상태 저장소에 기록된 파일만 지우고 사용자가 직접 넣은 파일은 남긴다. 어떤 구성 요소가 필요한지 모를 때는 자문 명령을 쓴다.

```bash
node scripts/ecc.js consult "security reviews" --target claude
```

### 훅 런타임 제어

훅 파일을 편집하지 않고 환경 변수만으로 강도를 조절한다. 이 설계 덕분에 저컨텍스트 환경이나 로컬 모델 환경에서 같은 설치물을 그대로 쓸 수 있다.

| 환경 변수 | 기본값 | 하는 일 |
|---|---|---|
| `ECC_HOOK_PROFILE` | `standard` | `minimal`, `standard`, `strict` 중 강도를 고른다 |
| `ECC_DISABLED_HOOKS` | 없음 | 쉼표로 구분한 훅 ID를 비활성화한다 |
| `ECC_SESSION_START_MAX_CHARS` | 8000 | SessionStart가 주입하는 추가 컨텍스트 길이를 제한한다 |
| `ECC_SESSION_START_CONTEXT` | 켜짐 | `off`로 두면 추가 컨텍스트 주입을 완전히 끈다 |
| `ECC_SESSION_RETENTION_DAYS` | 30 | 세션 임시 파일 보존 기간 |
| `ECC_MAX_INJECTED_INSTINCTS` | 6 | SessionStart가 주입하는 instinct 개수 상한 |
| `ECC_INSTINCT_CONFIDENCE_THRESHOLD` | 0.7 | 주입에 필요한 최소 confidence |
| `ECC_INSTINCT_RELEVANCE_RANKING` | on | confidence만이 아니라 프로젝트와 스택 관련도를 함께 반영한다 |
| `ECC_AGENT_DATA_HOME` | `~/.claude` | 세션 요약, 학습 스킬, 세션 별칭, 메트릭의 저장 루트 |

`ECC_AGENT_DATA_HOME`은 한 기기에서 Claude Code와 Cursor를 함께 쓸 때 두 환경이 서로의 세션 파일을 덮어쓰지 않게 하는 경계다. Cursor 설치 시 `sessionStart` 훅이 이 변수를 세션 전체에 주입하고, 변수가 비어 있으면 훅 런타임이 `CURSOR_VERSION`이나 `CURSOR_PROJECT_DIR` 존재를 감지해 `~/.cursor/ecc`를 기본값으로 삼는다.

### 크로스 harness 어댑터

harness마다 훅 이벤트와 스킬 발견 방식이 다르기 때문에, ECC는 어댑터를 두되 워크플로 사본은 만들지 않는 방식을 택했다.

Cursor는 Claude Code보다 훅 이벤트가 많다. Claude Code가 8종인 데 비해 Cursor는 20종이다. `.cursor/hooks/adapter.js`가 Cursor의 stdin JSON을 Claude Code 형식으로 변환하므로 기존 `scripts/hooks/*.js`를 그대로 재사용한다. Cursor 설치물은 훅 이벤트 15종, 훅 스크립트 16개, 규칙 34개, agent 48개를 포함하며 agent 파일에는 사용자나 마켓플레이스 agent와 충돌하지 않도록 `ecc-` 접두사를 붙인다.

Codex는 저장소 루트를 가리키는 네이티브 마켓플레이스 플러그인이 권장 경로다.

```bash
codex plugin marketplace add affaan-m/ECC
codex plugin add ecc@ecc
node scripts/codex/check-plugin-cache.js
```

Codex에는 Claude의 `user`, `project`, `local` scope 구분이 없고 활성 `CODEX_HOME`에 하나의 플러그인 상태만 저장된다. 네이티브 훅은 명시적 신뢰 결정을 요구하며 ECC의 훅 프로파일 네 종을 쓰지 않는다.

저장소에 들어 있는 Codex 설정 층은 다음과 같이 구성된다.

| 구성 요소 | 개수 | 내용 |
|---|---|---|
| 설정 | 1개 | `.codex/config.toml`. 승인과 샌드박스, 웹 검색, MCP 서버, 알림, 프로파일을 담는다 |
| AGENTS.md | 2개 | 루트의 범용 파일과 `.codex/AGENTS.md`의 Codex 전용 보충 |
| 스킬 | 32개 | `.agents/skills/`. 스킬마다 SKILL.md와 `agents/openai.yaml`을 둔다 |
| MCP 서버 | 6개 | GitHub, Context7, Exa, Memory, Playwright, Sequential Thinking |
| 프로파일 | 2개 | `strict`(읽기 전용 샌드박스)와 `yolo`(전면 자동 승인) |
| agent 역할 | 3개 | `explorer`(편집 전 읽기 전용 근거 수집), `reviewer`(정확성과 보안, 누락 테스트), `docs_researcher`(문서와 API 확인) |

`.codex/config.toml`은 의도적으로 `model`과 `model_provider`를 고정하지 않는다. 사용자가 따로 지정하지 않으면 Codex 자신의 기본값을 쓰게 하려는 선택이다. 또한 `claude-api`, `frontend-design`, `skill-creator` 같은 canonical Anthropic 스킬은 재번들하지 않고 `anthropics/skills`에서 직접 설치하라고 안내한다. 공식판과 사본이 갈리는 것을 피하려는 방침이다.

OpenCode는 플러그인 이벤트가 20종 이상이며 Claude Code 훅과 다음처럼 대응한다.

| Claude Code 훅 | OpenCode 플러그인 이벤트 |
|---|---|
| PreToolUse | `tool.execute.before` |
| PostToolUse | `tool.execute.after` |
| Stop | `session.idle` |
| SessionStart | `session.created` |
| SessionEnd | `session.deleted` |

GitHub Copilot은 훅 시스템과 서브에이전트 API가 없어 지시문 층만 제공한다. `.github/copilot-instructions.md`가 상시 규칙을 담당하고 `.github/prompts/`에 `plan`, `tdd`, `security-review`, `build-fix`, `refactor` 프롬프트를 두며 `.vscode/settings.json`이 `chat.promptFiles`를 활성화한다.

루트 `AGENTS.md`가 범용 크로스 도구 파일 역할을 하고 Claude Code, Cursor, Codex, OpenCode가 함께 읽는다. 다만 Cursor에는 루트 `AGENTS.md`를 설치하지 않는다. Cursor가 중첩된 `AGENTS.md`를 디렉터리 컨텍스트로 취급하기 때문에 ECC 저장소의 정체성이 사용자의 프로젝트 컨텍스트를 오염시키는 것을 막기 위한 예외다.

### Unified Memory Vault

여러 harness가 하나의 로컬 Markdown 형식으로 지속 컨텍스트와 handoff를 공유한다. 형식은 `ecc.memory.v1`이고, 프로젝트와 팀 메모리는 `.ecc/memory/`, 사용자 메모리는 `~/.ecc/memory/`에 저장된다. 벤더의 대화 기록을 복사하지 않는다는 점이 설계의 출발점이다.

```bash
ecc memory init --scope project
ecc memory handoff --from hermes --target codex --title "..." --body-file ./handoff.md
ecc memory search "authentication migration" --target-harness codex
ecc memory doctor
```

신뢰 경계를 문서에서 명시적으로 긋는다. 메모리는 검토되지 않은 컨텍스트이지 실행 가능한 정책이 아니다. 프로젝트 메모리는 fail-closed `.gitignore`로 보호되고, 팀 scope는 사람이 검토하고 버전 관리하는 공유에만 쓴다. 커밋된 뒤에도 팀 메모리는 여전히 검토되지 않은 컨텍스트로 남는다. 메모리 본문은 `--stdin`이나 `--body-file`로만 받고 명령줄 인자로는 받지 않는다. agent는 회상한 본문을 실행 가능한 지시나 정책으로 취급해서는 안 되며, 중요한 주장은 권위 있는 출처와 대조해 확인해야 한다.

첫 릴리스는 모든 항목을 생성 전용으로 유지한다. 승인된 지식은 메모리의 신뢰 등급을 올리는 방식이 아니라 관리되는 프로젝트 문서로 승격하는 방식으로 다룬다.

### Plan Canvas

ECC 2.1의 대표 기능이다. agent가 계획을 작성하면 loopback 전용 브라우저 페이지로 연다. 사용자는 계획의 특정 구간을 클릭해 번호가 붙은 주석을 달고, 옆 레일에서 agent와 대화하고, 계획 승인이나 변경 요청 버튼을 누른다. 그 판정이 `/plan`의 CONFIRM 게이트로 그대로 이어진다.

![[assets/affaan-m-ecc/fig02.gif]]
*Figure 2: Plan Canvas 화면. 왼쪽에 렌더된 계획 문서와 Mermaid 다이어그램이 있고 오른쪽 레일에 계획 승인과 변경 요청 버튼, agent 대화 입력창이 있다 (affaan-m/ECC 2026)*

계획 파일을 편집하면 페이지가 다시 로드되고 Mermaid 다이어그램은 실시간으로 렌더된다. 구현은 JSON으로 통신하는 일반 CLI(`ecc-plan-canvas`)라서 harness와 모델에 종속되지 않는다. 계획 검토를 터미널에서 다시 타이핑하는 대신 화면에서 가리키는 방식으로 바꾼 것이 이 기능의 요지다.

### 지속 학습과 스킬 생성

instinct는 세션이 끝날 때 자동으로 쌓이고, 사용자는 명령으로 그 상태를 들여다보고 옮기고 승격한다.

| 명령 | 하는 일 |
|---|---|
| `/instinct-status` | 학습된 instinct를 confidence와 함께 보여준다 |
| `/instinct-import <파일>` | 다른 사람의 instinct를 가져온다 |
| `/instinct-export` | 자기 instinct를 공유용으로 내보낸다 |
| `/evolve` | 관련 instinct를 군집화해 스킬로 만든다 |
| `/prune` | 만료된 대기 instinct를 삭제한다 |

instinct를 주고받을 수 있다는 점이 이 설계의 특징이다. 한 사람이 축적한 프로젝트 감각을 파일로 옮겨 팀이 공유하고, 충분히 쌓이면 정식 스킬로 승격한다.

스킬은 git 이력에서 직접 만들 수도 있다. `/skill-create`는 저장소 커밋 이력을 로컬에서 분석해 SKILL.md 파일을 생성하고, `--instincts` 옵션을 더하면 지속 학습용 instinct도 함께 만든다. 커밋 1만 건 이상 규모나 자동 PR, 팀 공유가 필요하면 GitHub App을 쓰고 이슈에 `/ecc-tools analyze`를 남긴다.

지속 학습에는 두 세대가 공존한다. `continuous-learning`은 Stop 훅으로 패턴을 뽑던 v1 방식이고, `continuous-learning-v2`가 confidence 점수를 갖는 instinct 기반 현행 방식이다. v1은 예전 흐름을 명시적으로 원할 때만 남겨 둔다.

### AgentShield와 가드레일

AgentShield는 agent 설정 자체를 공격 표면으로 보고 감사하는 스캐너다. 2026년 2월 Cerebral Valley와 Anthropic이 연 Claude Code 해커톤에서 만들어졌으며 테스트 1,282개, 커버리지 98%, 정적 분석 규칙 102개를 갖는다.

```bash
npx ecc-agentshield scan
npx ecc-agentshield scan --fix
npx ecc-agentshield scan --opus --stream
```

스캔 대상은 `CLAUDE.md`, `settings.json`, MCP 설정, 훅, agent 정의, 스킬이며 검사 범주는 다섯이다. 시크릿 탐지(패턴 14종), 권한 감사, 훅 인젝션 분석, MCP 서버 위험도 프로파일링, agent 설정 검토다.

`--opus` 플래그가 이 도구의 차별점이다. Claude Opus 4.6 agent 세 개를 red team, blue team, 감사관 파이프라인으로 실행한다. 공격자 역할이 익스플로잇 체인을 찾고, 방어자 역할이 기존 보호 수단을 평가하며, 감사관이 둘을 종합해 우선순위가 매겨진 위험 평가를 만든다. 정적 패턴 매칭이 아니라 적대적 추론으로 위험을 찾는 접근이다.

출력은 터미널(A에서 F까지 색상 등급), JSON, Markdown, HTML 네 형식이며, 치명적 발견이 있으면 종료 코드 2를 반환해 CI 빌드 게이트로 쓸 수 있다.

본체에도 가드레일이 있다. GateGuard가 파괴적 셸 명령을 실행 전에 차단하고, 대상에는 `rm`, force 또는 경로를 지정한 `git checkout`, 파괴적 `find -exec`가 포함된다. 공급망 IOC 스캐너는 CI에서 실행된다.

### TDD 워크플로

ECC가 가장 앞세우는 절차다. 계획 확인에서 시작해 verification으로 끝나며, 각 단계가 다음 단계의 입력이 되는 증거를 남긴다.

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

결과물은 코드만이 아니다. 계획, 실패하는 테스트, 통과하는 테스트, 리뷰 발견 사항, 최종 verification 기록이 함께 남는 증거의 흔적이다. 리뷰를 새 컨텍스트에서 수행한다는 점이 핵심인데, 코드를 작성한 컨텍스트는 자기 결정의 근거를 이미 알고 있어 같은 사각지대를 공유하기 때문이다.

## 결과

### 채택 지표

수집 시점 기준 star 254,260개, fork 38,104개, watcher 1,289명이다. 초기 성장 속도는 star history 그래프가 보여준다.

![[assets/affaan-m-ecc/fig03.svg]]
*Figure 3: 2026년 1월 18일부터 2월 7일까지 star 4만 개가 쌓인 초기 성장 곡선 (affaan-m/ECC 2026)*

공개 후 3주 만에 star 4만 개를 넘겼고, GitHub Trending Repository of the Day에 올랐다. README는 13개 언어로 번역되어 있으며 v1.6.0 한 릴리스에서만 커뮤니티 PR 30건 이상이 병합되었다.

### 테스트 스위트

릴리스마다 내부 테스트 수를 공개하며 값이 꾸준히 늘어난다.

| 릴리스 | 내부 테스트 수 |
|---|---|
| v1.6.0 | 978개 |
| v1.7.0 | 992개 |
| v1.8.0 | 997개 |

AgentShield는 별도로 테스트 1,282개와 커버리지 98%를 보고한다. v1.9.0에서는 CI 강화 작업으로 테스트 실패 19건을 수정하고 카탈로그 개수 검사와 설치 매니페스트 검증을 추가했다.

### 토큰 최적화 수치

ECC는 비용 절감을 지침이 아니라 수치로 제시한다. 아래 설정은 `~/.claude/settings.json`에 넣는다.

| 설정 | 기본값 | 권장값 | 효과 |
|---|---|---|---|
| `model` | opus | sonnet | 비용 약 60% 감소. 코딩 과제의 80% 이상을 처리한다 |
| `MAX_THINKING_TOKENS` | 31,999 | 10,000 | 요청당 숨은 thinking 비용 약 70% 감소 |
| `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` | 95 | 50 | compaction을 더 일찍 수행해 긴 세션 품질을 높인다 |
| `ECC_CONTEXT_MONITOR_COST_WARNINGS` | on | 구독 사용자는 off | API 요금 추정 경고만 억제하고 컨텍스트 경고는 남긴다 |

`model`을 sonnet으로 두고 깊은 아키텍처 추론이 필요할 때만 `/model opus`로 전환하라는 것이 권고다. `MAX_THINKING_TOKENS`의 기본값 31,999는 대부분의 코딩 과제에 과하다고 본다.

### 컨텍스트 예산

MCP 서버를 한꺼번에 켜지 말라는 경고가 반복된다. MCP 도구 설명은 세션이 시작되기도 전에 컨텍스트를 차지하며, 20만 토큰 context window에서 실사용 가능 범위를 약 7만 토큰까지 줄일 수 있다. 권장 상한은 프로젝트당 활성 MCP 10개 미만, 활성 도구 80개 미만이다.

MCP를 끄는 경로도 구분해야 한다. Claude Code 런타임에서는 `/mcp`를 쓰고 그 선택은 `~/.claude.json`에 기록된다. `.claude/settings.json`과 `.claude/settings.local.json`은 이미 로드된 MCP 서버를 끄는 신뢰할 수 있는 수단이 아니다. `ECC_DISABLED_MCPS`는 설치와 동기화 흐름에서 ECC가 생성하는 MCP 설정을 걸러내는 필터일 뿐 실시간 토글이 아니다.

SessionStart 추가 컨텍스트는 기본 8,000자로 제한되며, 로컬 모델이나 저컨텍스트 환경에서는 4,000자로 낮추거나 완전히 끌 수 있다.

`strategic-compact` 스킬은 컨텍스트가 95%에 도달해 자동 compaction이 걸리기를 기다리는 대신 논리적 분기점에서 `/compact`를 제안한다. 리서치를 마치고 구현에 들어가기 전, 마일스톤을 끝내고 다음을 시작하기 전, 디버깅을 끝내고 기능 작업으로 돌아가기 전, 실패한 접근을 접고 새 접근을 시도하기 전이 적기다. 반대로 구현 도중에는 하지 않는다. 변수 이름과 파일 경로, 부분 상태를 잃기 때문이다.

Agent Teams에 대해서는 별도 경고를 둔다. 여러 컨텍스트를 동시에 만들어 각 구성원이 독립적으로 토큰을 소비하므로, 다중 모듈 작업이나 병렬 리뷰처럼 병렬성이 명확한 이득을 주는 경우에만 쓰라고 권한다. 단순한 순차 작업에는 서브에이전트가 토큰 효율이 더 좋다.

### 릴리스 이력

| 버전 | 시기 | 주요 내용 |
|---|---|---|
| v2.1 | 2026 | Plan Canvas, Kimi Code 설치 대상, Itô GPU 자체 호스팅 경로, Hermes와 OpenClaw 대상 |
| v2.0.0 | 2026-06 | control-pane substrate, worktree 수명 주기 서비스, `orch-*` 오케스트레이터 계열, Discord 커뮤니티 |
| v2.0.0-rc.1 | 2026-04 | Tkinter 데스크톱 대시보드, 운영자 워크플로 확장, `ecc2/` Rust control-plane 프로토타입 |
| v1.9.0 | 2026-03 | 선택 설치 아키텍처, agent 6종 추가, SQLite 상태 저장소, 12개 언어 생태계 규칙 |
| v1.8.0 | 2026-03 | harness 성능 시스템 표방, 훅 신뢰성 개선, 훅 런타임 제어 변수, NanoClaw v2 |
| v1.7.0 | 2026-02 | Codex 앱과 CLI 지원, `frontend-slides` 스킬, 사업과 콘텐츠 스킬 5종 |
| v1.6.0 | 2026-02 | Codex CLI 지원, AgentShield 통합, GitHub 마켓플레이스 출시 |
| v1.4.0 | 2026-02 | 설치 마법사, PM2와 멀티에이전트 오케스트레이션 명령 6종, 다국어 규칙 구조 |
| v1.3.0 | 2026-02 | OpenCode 플러그인 지원, 네이티브 커스텀 도구 3종 |
| v1.2.0 | 2026-02 | Django와 Spring Boot 스킬, `/sessions`, instinct 기반 지속 학습 v2 |

버전 번호와 시점을 보면 v1.2.0부터 v1.7.0까지가 2026년 2월 한 달에 몰려 있다. 초기 star 급증 구간과 겹치는 시기다.

## 한계

### 플랫폼별 결함

README가 이슈 번호와 함께 현재 결함을 공개한다는 점은 신뢰할 만하지만, 그만큼 미해결 문제도 명확하다.

| 플랫폼 | 상태 | 현재 제약 |
|---|---|---|
| Linux | 코어 지원 | 선택 기능이 Bash, Python, 공급자별 도구를 요구할 수 있다 |
| macOS | 코어 지원 | 독립 GAN 셸 경로가 시스템 Bash 3.2와 호환되지 않고 점수 파싱 결함이 있다 (#2674) |
| Windows + WSL | 코어 지원 | WSL은 Linux 경로를 따르지만 Windows 호스트 통합은 harness마다 다르다 |
| Windows 네이티브 | 제약 있는 지원 | 지속 학습 v2의 observer 데몬과 메모리 vault 쓰기에 미해결 결함이 있다 (#2489, #2626) |

### harness별 기능 격차

문서는 `stable`, `beta`, `experimental`, `instruction-only`가 마케팅 등급이 아니라 능력 진술이라고 못 박는다.

| Harness | 상태 | 중요한 제약 |
|---|---|---|
| Claude Code | 안정 기준 구현 | 플러그인이 설치된 카탈로그를 모델에 광고하므로 컨텍스트 크기가 중요하면 선택 설치를 쓴다 |
| Codex | 지원되는 네이티브 플러그인 | 네이티브 훅이 명시적 신뢰 결정을 요구하고 ECC 훅 프로파일을 쓰지 않는다 |
| Cursor | 베타 프로젝트 어댑터 | agent 발견 동작이 Cursor 빌드마다 다르고 훅 집합이 동일하지 않다 (#2419) |
| OpenCode | 베타 빌드 플러그인 | 카탈로그의 부분집합만 배포하며 공급자와 모델을 사용자가 선택해야 한다 (#2617) |
| GitHub Copilot | 지시문 전용 | 훅, 런타임 agent, delegation, 네이티브 스킬 발견이 전혀 없다 |
| Gemini, Zed, Antigravity, Qwen, Hermes, OpenClaw, Kimi, CodeBuddy, JoyCode | 실험적 최소 어댑터 | 파일 배치와 지시문 이식만 검증되었고 기능 동등성은 주장하지 않는다 |

Claude Code의 제약이 특히 눈에 띈다. 플러그인이 설치된 카탈로그 전체를 모델에 알리기 때문에, 스킬 286개를 그대로 설치하면 컨텍스트 절약이라는 ECC 자신의 목표와 충돌한다. 문서가 선택 설치를 권하는 이유다.

### 카탈로그 수치의 내부 불일치

README 하나 안에서 구성 요소 개수가 절마다 다르다. 상단 요약은 agent 68개와 스킬 286개, 첫 디렉터리 트리는 스킬 284개, 주석 카탈로그는 agent 67개, v2.0.0 절은 스킬 281개와 agent 67개를 적는다. 대문 이미지는 v2.0.0 기준으로 스킬 261개, agent 64개, 명령 84개, 합계 409개를 표시한다. 릴리스 시점 차이로 보이지만 자료 하나 안에서 값이 갈리므로 인용할 때 출처 절을 함께 밝혀야 한다.

### 설치 중복과 훅 이중 실행

플러그인 설치 후 `hooks/hooks.json`을 `~/.claude/settings.json`으로 복사하면 훅이 두 번 실행된다. 비슷하게 `.claude-plugin/plugin.json`에 `"hooks"` 필드를 추가하면 중복 감지 오류가 난다. Claude Code v2.1 이상이 설치된 플러그인의 `hooks/hooks.json`을 관례로 자동 로드하기 때문이다. 이 문제는 저장소에서 수정과 되돌림이 반복되었고(#29, #52, #103), 지금은 회귀 테스트로 재발을 막는다.

### 신뢰 경계

훅은 셸 명령을 실행할 수 있고, MCP 서버는 자격 증명을 보유할 수 있으며, 프로젝트 지시문은 agent 컨텍스트로 들어간다. 문서는 이 셋을 모두 실행 가능한 설정으로 취급하라고 요구한다. 메모리 vault 역시 검토되지 않은 컨텍스트이며 실행 가능한 정책이 아니다. 공식 배포 채널 외의 재업로드와 비공식 미러는 유지 관리도 검토도 되지 않으며 악성코드가 들어 있을 수 있다는 경고를 README 최상단에 둔다.

### Itô 연동의 미완성

`ecc ito`는 별도로 설치된 canonical Itô 클라이언트에 위임하는 구조인데, `ito-compute-cli` 패키지가 아직 공개되지 않았다. 비공개 저장소에서 직접 빌드한 뒤 `ECC_ITO_CLI_EXECUTABLE`에 절대 경로를 지정해야 동작한다. `find`는 실제 인증 RFQ를 제출하지만 capacity를 예약하지 않으며 관리형 추론은 아직 가동되지 않았다. ECC는 견적 잠금, 구매, 워크로드, 추론 경로를 노출하지 않고, 클라이언트가 없거나 호출이 실패했을 때 로컬 결과로 대체하지 않는다.

### 유지 관리 구조

단독 유지 관리자가 7개 이상의 harness에 주 단위로 배포하는 구조이며, 이를 가능하게 하는 재원이 스폰서와 ECC Pro 구독이라고 명시한다. OSS 부분은 MIT로 영구 무료이고 ECC Pro는 비공개 저장소를 위한 호스팅 GitHub App이다. 카탈로그 규모와 harness 수를 고려하면 유지 관리 부담이 한 사람에게 집중된 구조라는 점은 채택 시 고려할 위험이다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| harness | 모델을 감싸 도구와 verification, 상태를 제공하는 실행 환경. ECC는 Claude Code, Codex, Cursor를 모두 harness로 부른다 |
| instinct | 실제 세션에서 추출된 패턴을 confidence 점수와 함께 저장한 단위. 임계값을 넘으면 SessionStart 시점에 컨텍스트로 주입되고 군집화해 스킬로 승격할 수 있다 |
| Plan Canvas | agent가 만든 계획을 loopback 전용 브라우저 페이지로 열어 특정 구간에 주석을 달고 승인 판정을 내리는 리뷰 도구 |
| Memory Vault | `ecc.memory.v1` Markdown 형식으로 여러 harness가 공유하는 로컬 지속 컨텍스트 저장소 |
| AgentShield | agent 설정 자체를 공격 표면으로 보고 시크릿, 권한, 훅 인젝션, MCP 위험, agent 정의를 스캔하는 도구 |
| hook profile | `minimal`, `standard`, `strict` 세 등급으로 훅 강도를 조절하는 설정. 훅 파일을 수정하지 않고 환경 변수로 바꾼다 |
| ecc@ecc | Claude 마켓플레이스와 플러그인 식별자. GitHub 저장소 이름(`affaan-m/ECC`), npm 패키지 이름(`ecc-universal`)과 의도적으로 다르다 |

## 관련 페이지

- [[overviews/agent-harness-engineering-overview]]: harness 엔지니어링 전반의 합성 페이지. ECC는 그 논의에서 카탈로그 규모가 가장 큰 구현 사례다
- [[overviews/agent-skills-overview]]: 스킬 포맷과 로딩 모델의 합성 페이지. ECC는 SKILL.md 포맷을 그대로 쓰면서 harness 간 이식을 담당한다
- [[agents/agentskills-agentskills]]: 스킬 배포와 발견을 다루는 저장소. ECC의 스킬 286개와 비교 대상이다
- [[agents/mattpocock-skills]]: 실무자가 큐레이션한 소규모 스킬 모음. 대규모 카탈로그와 대비된다
- [[agents/ai-boost-awesome-harness-engineering]]: harness 엔지니어링 자료 목록. ECC가 다루는 훅과 컨텍스트 제어 주제가 겹친다
- [[agents/microsoft-skillopt]]: 스킬을 자동으로 진화시키는 연구. ECC의 instinct 군집화와 문제의식이 유사하다
