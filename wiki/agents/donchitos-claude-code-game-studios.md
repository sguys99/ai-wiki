---
title: "Donchitos/Claude-Code-Game-Studios"
type: repo
year: 2026
category: agents
raw_path: raw/repos/donchitos-claude-code-game-studios.md
raw_filename: "donchitos-claude-code-game-studios.md"
source_collection: external
source: donchitos-claude-code-game-studios.md
org: "Donchitos"
repo: "Claude-Code-Game-Studios"
url: "https://github.com/Donchitos/Claude-Code-Game-Studios"
license: "MIT"
tags: [claude-code, agent-workflow, game-development, subagent, skills, hooks, template]
---

## 요약

`Donchitos/Claude-Code-Game-Studios`는 Claude Code 세션 하나에 게임 개발 스튜디오의 조직 구조를 입히는 MIT 라이선스 템플릿이다. 저장소를 clone하면 에이전트 정의, 슬래시 커맨드, 훅 스크립트, 경로 기반 코딩 규칙, 문서 템플릿이 `.claude/` 아래에 한꺼번에 들어온다.

핵심 발상은 범용 어시스턴트 하나를 역할이 나뉜 전문 에이전트 집단으로 대체하는 것이다. 비전을 지키는 director, 도메인을 소유하는 department lead, 실무를 수행하는 specialist 3계층으로 나누고 계층 사이의 위임과 escalation 경로를 미리 정의한다. 여기에 커밋 직전 검증과 파일 경로별 코딩 표준을 훅과 규칙 파일로 함께 배치해, 기획부터 출시까지의 단계마다 담당자와 품질 게이트가 놓이도록 만든다.

주목할 점은 이 템플릿이 자동화를 목표로 하지 않는다는 것이다. 모든 에이전트가 질문하고 선택지를 제시하고 사용자 승인을 받은 뒤에야 파일을 쓴다. 속도가 아니라 규율을 얻으려는 도구다.

## 배경

AI와 단독으로 게임을 만들 때 부족한 것은 모델의 능력이 아니라 구조다. README의 "Why This Exists" 절은 채팅 세션 하나가 가진 결손을 네 가지로 짚는다. 매직 넘버를 하드코딩해도 막는 장치가 없고, 설계 문서를 건너뛰어도 지적하는 주체가 없다. 스파게티 코드를 써도 경고가 없으며, QA 통과 절차와 디자인 리뷰도 없다. 무엇보다 "이 구현이 게임의 비전에 맞는가"를 묻는 사람이 없다.

실제 게임 스튜디오는 이 결손을 조직으로 해결한다. creative director가 비전 일관성을 책임지고 lead가 도메인 결정을 소유하며 QA가 별도 게이트로 존재한다. 이 저장소는 그 조직 구조를 에이전트 정의와 위임 규칙으로 옮긴다.

README가 밝히는 결과는 통제권의 이동이 아니라 유지다. 사용자는 여전히 모든 결정을 내리되, 올바른 질문을 던지고 실수를 조기에 잡아내며 프로젝트를 브레인스토밍부터 출시까지 정리된 상태로 유지하는 팀을 얻는다.

배포 규모는 다음과 같다. README 배지가 밝히는 수치와, 본문 목록에서 이름으로 확인되는 수치를 함께 적는다.

| 구성 요소 | README 배지 | 본문에 이름이 실린 수 | 내용 |
|---|---|---|---|
| Agents | 49 | 48 | 디자인, 프로그래밍, 아트, 오디오, 내러티브, QA, 프로덕션 전반의 서브에이전트 |
| Skills | 73 | 72 | 워크플로 단계별 슬래시 커맨드 |
| Hooks | 12 | 12 | 커밋, push, 에셋 변경, 세션 수명주기, 감사 추적, 결손 탐지 검증 |
| Rules | 11 | 8 | 파일 경로에 따라 자동 적용되는 코딩 표준 |
| Templates | 41 | 0 | GDD, UX 명세, ADR, 스프린트 계획, HUD 설계, 접근성 문서 서식 |

## 핵심 개념

서브에이전트는 상위 에이전트가 위임한 작업을 자기 컨텍스트에서 수행하는 별도 실행 단위다. 이 저장소에서는 서브에이전트 하나가 곧 스튜디오의 직책 하나에 대응하며, `.claude/agents/` 아래에 Markdown 본문과 YAML frontmatter를 결합한 파일로 정의된다. 직책마다 책임 범위와 escalation 경로, 통과해야 할 품질 게이트가 파일 안에 적혀 있다.

스킬은 특정 작업 절차를 담아 에이전트가 실행하는 지침 패키지를 말한다. Claude Code에서는 `/`로 시작하는 슬래시 커맨드로 노출되며, 이 템플릿은 `.claude/skills/` 아래에 스킬 하나당 하위 디렉토리 하나를 둔다. `/design-system`이나 `/story-done`처럼 워크플로의 한 단계를 그대로 이름으로 삼는다.

훅은 특정 이벤트 시점에 끼어들어 실행되는 사용자 정의 코드다. 이 저장소의 훅은 전부 bash 스크립트이며 커밋 직전, 파일 수정 직후, 세션 시작과 종료 같은 시점에 걸린다. 모델이 훅을 호출하는 것이 아니라 Claude Code 런타임이 자동으로 실행하므로, 모델이 규칙을 잊어도 검증은 남는다.

경로 기반 규칙은 파일이 놓인 디렉토리만으로 어떤 코딩 표준을 적용할지 결정하는 방식이다. 같은 프로젝트 안에서도 `src/core/`의 코드와 `prototypes/`의 코드가 서로 다른 기준을 받는다. 사용자가 매번 "이 파일에는 이런 규칙을 적용해 줘"라고 지시할 필요가 없다는 점이 이 방식의 실익이다.

품질 게이트는 다음 단계로 넘어가기 전에 통과해야 하는 검사 지점이다. 이 템플릿에서는 director 승인, 단계 게이트, 훅 검증 세 층위로 존재하며, 사용자가 리뷰 강도 설정으로 몇 개를 켤지 고른다.

## 방법

### 스튜디오 계층

에이전트는 3계층으로 나뉘고 계층마다 배정된 모델이 다르다. 상위 계층일수록 판단의 파급 범위가 넓어 더 큰 모델을 쓴다.

| 계층 | 모델 | 역할 | 소속 에이전트 |
|---|---|---|---|
| Tier 1 Directors | Opus | 비전 수호 | `creative-director`, `technical-director`, `producer` |
| Tier 2 Department Leads | Sonnet | 도메인 소유 | `game-designer`, `lead-programmer`, `art-director`, `audio-director`, `narrative-director`, `qa-lead`, `release-manager`, `localization-lead` |
| Tier 3 Specialists | Sonnet 또는 Haiku | 실무 수행 | `gameplay-programmer`, `engine-programmer`, `ai-programmer`, `network-programmer`, `tools-programmer`, `ui-programmer`, `systems-designer`, `level-designer`, `economy-designer`, `technical-artist`, `sound-designer`, `writer`, `world-builder`, `ux-designer`, `prototyper`, `performance-analyst`, `devops-engineer`, `analytics-engineer`, `security-engineer`, `qa-tester`, `accessibility-specialist`, `live-ops-designer`, `community-manager` |

계층별 개수는 director 3개, department lead 8개, specialist 23개로 합계 34개다. 이름을 훑으면 조직도의 성격이 드러난다. `economy-designer`와 `live-ops-designer`처럼 라이브 서비스 게임에 필요한 직책, `accessibility-specialist`와 `localization-lead`처럼 출시 요건에 대응하는 직책이 함께 들어 있다. 개인 개발자가 혼자 감당하기 어려운 역할일수록 별도 에이전트로 분리해 둔 배치다.

모델 배정에는 비용 설계가 들어 있다. 파급 범위가 넓은 비전 판단만 Opus에 맡기고 실무는 Sonnet과 Haiku로 내려, 세션 전체를 큰 모델로 채우지 않는다.

### 엔진별 전문 에이전트 세트

엔진 전문 에이전트는 위 34개와 별개로 세 세트가 저장소에 함께 들어 있다. 사용자가 프로젝트에 맞는 세트를 고르고 나머지는 지우거나 그대로 두면 된다. 어느 세트도 쓰지 않는 선택지도 열려 있다.

| 엔진 | lead 에이전트 | 하위 전문가 |
|---|---|---|
| Godot 4 | `godot-specialist` | GDScript, Shaders, GDExtension |
| Unity | `unity-specialist` | DOTS/ECS, Shaders/VFX, Addressables, UI Toolkit |
| Unreal Engine 5 | `unreal-specialist` | GAS, Blueprints, Replication, UMG/CommonUI |

세 세트를 합하면 lead 3개와 하위 전문가 11개로 14개다. 계층 목록의 34개와 더하면 48개가 되어, 배지가 밝히는 49개와 1개 차이가 난다. 하위 전문가의 분해 방식이 엔진마다 다른 점도 눈에 띈다. Godot는 언어와 셰이더와 네이티브 확장으로 나뉘고, Unreal은 GAS와 Replication처럼 프레임워크 하위 시스템 단위로 나뉜다.

### 에이전트 조정 원칙

에이전트가 여럿이면 누가 무엇을 결정하는지가 곧 설계 문제가 된다. 이 템플릿은 상호작용을 다섯 가지 원칙으로 규정한다.

| 원칙 | 내용 |
|---|---|
| Vertical delegation | director가 lead에게, lead가 specialist에게 작업을 위임한다 |
| Horizontal consultation | 같은 계층끼리 자문은 할 수 있지만 도메인을 넘는 구속력 있는 결정은 내리지 못한다 |
| Conflict resolution | 이견은 공유 상위로 올라간다. 디자인은 `creative-director`, 기술은 `technical-director`가 받는다 |
| Change propagation | 부서를 넘나드는 변경은 `producer`가 조율한다 |
| Domain boundaries | 명시적 위임 없이는 자기 도메인 밖 파일을 수정하지 않는다 |

이 다섯 가지는 서로 맞물려 하나의 통제 구조를 이룬다. Vertical delegation이 작업의 흐름 방향을 정하고, Horizontal consultation이 같은 계층에서의 월권을 막는다. 두 원칙만으로는 교착이 생길 수 있으므로 Conflict resolution이 결정권을 위로 올려 풀고, Change propagation이 부서 경계를 넘는 변경의 단일 조율자를 지정한다.

Domain boundaries는 이 가운데 가장 실무적인 규칙이다. 여러 에이전트가 한 저장소를 공유할 때 흔한 실패는 담당이 아닌 에이전트가 파일을 고쳐 놓는 것인데, 이 원칙이 그 경로를 차단한다. `/team-combat`처럼 여러 에이전트를 한 기능에 함께 투입하는 스킬이 성립하려면 이런 경계 규칙이 먼저 있어야 한다.

### 협업 프로토콜

조정 원칙이 에이전트 사이의 관계를 정한다면, 협업 프로토콜은 에이전트와 사용자 사이의 관계를 정한다. README는 이 템플릿이 auto-pilot 시스템이 아니라고 명시하고 모든 에이전트에 5단계 절차를 강제한다.

| 단계 | 내용 |
|---|---|
| Ask | 해결책을 제안하기 전에 먼저 질문한다 |
| Present options | 장단점을 붙인 선택지를 2~4개 보여 준다 |
| You decide | 결정은 항상 사용자가 내린다 |
| Draft | 확정 전에 작업물을 먼저 보여 준다 |
| Approve | 사용자 승인 없이는 아무것도 기록되지 않는다 |

이 절차의 의도는 통제권 유지다. README는 에이전트가 제공하는 것이 구조와 전문성이지 자율성이 아니라고 못 박는다. 선택지를 2~4개로 제한한 것도 같은 맥락이다. 하나만 제시하면 사용자가 검토 없이 수락하기 쉽고, 다섯 개 넘게 제시하면 결정 자체가 부담이 된다.

이 설계에는 대가가 따른다. 승인 지점이 늘어날수록 사용자 개입 횟수도 늘어난다. 뒤에서 다룰 리뷰 강도 설정이 그 부담을 조절하는 장치다.

### 슬래시 커맨드 카탈로그

Claude Code에서 `/`를 입력하면 스킬 목록이 나타난다. README는 72개를 12개 묶음으로 나눠 제시하며, 묶음 이름 자체가 게임 개발 워크플로의 단계를 따라간다.

| 묶음 | 커맨드 | 개수 |
|---|---|---|
| Onboarding & Navigation | `/start` `/help` `/project-stage-detect` `/setup-engine` `/adopt` | 5 |
| Game Design | `/brainstorm` `/map-systems` `/design-system` `/quick-design` `/review-all-gdds` `/propagate-design-change` | 6 |
| Art & Assets | `/art-bible` `/asset-spec` `/asset-audit` | 3 |
| UX & Interface Design | `/ux-design` `/ux-review` | 2 |
| Architecture | `/create-architecture` `/architecture-decision` `/architecture-review` `/create-control-manifest` | 4 |
| Stories & Sprints | `/create-epics` `/create-stories` `/dev-story` `/sprint-plan` `/sprint-status` `/story-readiness` `/story-done` `/estimate` | 8 |
| Reviews & Analysis | `/design-review` `/code-review` `/balance-check` `/content-audit` `/scope-check` `/perf-profile` `/tech-debt` `/gate-check` `/consistency-check` `/security-audit` | 10 |
| QA & Testing | `/qa-plan` `/smoke-check` `/soak-test` `/regression-suite` `/test-setup` `/test-helpers` `/test-evidence-review` `/test-flakiness` `/skill-test` `/skill-improve` | 10 |
| Production | `/milestone-review` `/retrospective` `/bug-report` `/bug-triage` `/reverse-document` `/playtest-report` | 6 |
| Release | `/release-checklist` `/launch-checklist` `/changelog` `/patch-notes` `/hotfix` `/day-one-patch` | 6 |
| Creative & Content | `/prototype` `/onboard` `/localize` | 3 |
| Team Orchestration | `/team-combat` `/team-narrative` `/team-ui` `/team-release` `/team-polish` `/team-audio` `/team-level` `/team-live-ops` `/team-qa` | 9 |

분포에는 이 템플릿의 무게중심이 드러난다. Reviews & Analysis와 QA & Testing이 각각 10개로 가장 크고, 두 묶음을 합치면 20개로 전체의 4분의 1을 넘는다. 설계와 구현보다 검사에 커맨드를 더 많이 배정한 셈이다.

Team Orchestration 묶음은 성격이 다르다. 나머지 커맨드가 단계 하나를 실행한다면, `/team-combat`이나 `/team-live-ops`는 여러 에이전트를 단일 기능에 함께 투입한다. 전투 시스템 하나를 만들 때 systems-designer와 gameplay-programmer와 qa-tester를 동시에 부르는 식이다.

`/skill-test`와 `/skill-improve`가 QA 묶음에 들어 있는 점도 특기할 만하다. 게임 코드뿐 아니라 이 템플릿 자체의 스킬 정의도 검사 대상으로 두었다는 뜻이다.

기존 프로젝트를 나중에 편입하는 경로도 커맨드로 마련되어 있다. `/project-stage-detect`가 현재 프로젝트가 어느 단계에 있는지 판정하고, `/adopt`가 템플릿 구조로 편입하며, `/reverse-document`가 이미 작성된 코드에서 문서를 역으로 만들어 낸다. 설계 문서 없이 코드부터 쓴 프로젝트를 이 워크플로에 올리려면 문서를 먼저 채워야 하는데, 그 공백을 메우는 커맨드다.

### 훅과 권한 규칙

훅 12개는 세션마다 자동으로 실행된다. 트리거 시점을 보면 세 묶음으로 나뉜다. 커밋과 push와 파일 수정 같은 도구 실행 시점에 걸리는 검증 훅, 세션 시작과 종료와 compaction 전후에 걸리는 상태 관리 훅, 서브에이전트 생성과 종료에 걸리는 감사 추적 훅이다.

| 훅 | 트리거 | 동작 |
|---|---|---|
| `validate-commit.sh` | PreToolUse (Bash) | 하드코딩된 값, TODO 형식, JSON 유효성, 설계 문서 섹션을 검사한다. 명령이 `git commit`이 아니면 즉시 종료한다 |
| `validate-push.sh` | PreToolUse (Bash) | 보호된 브랜치로 push하면 경고한다. 명령이 `git push`가 아니면 즉시 종료한다 |
| `validate-assets.sh` | PostToolUse (Write/Edit) | 네이밍 규칙과 JSON 구조를 검증한다. 파일이 `assets/` 밖이면 즉시 종료한다 |
| `session-start.sh` | 세션 시작 | 현재 브랜치와 최근 커밋을 보여 준다 |
| `detect-gaps.sh` | 세션 시작 | 새 프로젝트를 감지해 `/start`를 제안하고, 코드나 프로토타입이 있는데 설계 문서가 없으면 지적한다 |
| `pre-compact.sh` | compaction 직전 | 세션 진행 노트를 보존한다 |
| `post-compact.sh` | compaction 직후 | `active.md`에서 세션 상태를 복원하도록 Claude에게 상기시킨다 |
| `notify.sh` | 알림 이벤트 | PowerShell로 Windows toast 알림을 띄운다 |
| `session-stop.sh` | 세션 종료 | `active.md`를 세션 로그로 보관하고 git 활동을 기록한다 |
| `log-agent.sh` | 에이전트 생성 | 감사 추적을 시작하며 서브에이전트 호출을 기록한다 |
| `log-agent-stop.sh` | 에이전트 종료 | 감사 추적을 마감하며 서브에이전트 기록을 완결한다 |
| `validate-skill-change.sh` | PostToolUse (Write/Edit) | `.claude/skills/` 변경 후 `/skill-test` 실행을 권고한다 |

`pre-compact.sh`와 `post-compact.sh`는 컨텍스트 관리 장치다. compaction은 길어진 대화 이력을 요약으로 접어 context 한계 안에서 세션을 이어가는 처리를 말한다. 요약 과정에서 진행 상황이 유실되기 쉬우므로, 접기 직전에 노트를 파일로 남기고 접은 직후에 그 파일에서 상태를 복원하도록 짝을 이뤄 배치했다.

`log-agent.sh`와 `log-agent-stop.sh`도 짝으로 동작해 어떤 서브에이전트가 언제 실행되고 끝났는지 기록을 남긴다. 에이전트 49개가 서로 위임하는 구조에서는 실행 이력이 없으면 결과를 사후에 추적할 수 없다.

`session-start.sh`와 `session-stop.sh`도 한 쌍을 이룬다. 세션을 열 때 현재 브랜치와 최근 커밋을 보여 주어 이전 작업 맥락을 되살리고, 닫을 때 `active.md`를 세션 로그로 보관하며 git 활동을 기록한다. `detect-gaps.sh`는 세션 시작에 함께 걸려 결손을 찾는다. 새 프로젝트면 `/start`를 제안하고, 코드나 프로토타입은 있는데 설계 문서가 없으면 그 공백을 지적한다.

README는 `validate-commit.sh`와 `validate-assets.sh`, `validate-skill-change.sh` 세 개가 모든 Bash와 Write tool call에서 실행된다는 점을 별도 주석으로 설명한다. 관련 없는 명령이나 경로면 곧바로 exit 0으로 끝나므로 정상 동작이며 성능 문제가 아니라고 밝힌다. 훅을 처음 쓰는 사용자가 로그에서 훅 이름을 반복해 보고 오작동으로 오해하는 것을 막으려는 설명이다.

훅과 별개로 `.claude/settings.json`의 권한 규칙이 도구 실행 범위를 제한한다. 안전한 작업은 자동 허용하고 위험한 작업은 차단하는 방식이다.

| 구분 | 예시 |
|---|---|
| 자동 허용 | git status 확인, 테스트 실행 |
| 차단 | force push, `rm -rf`, `.env` 파일 읽기 |

### 경로 기반 코딩 규칙

코딩 표준은 파일 위치에 따라 자동으로 적용된다. 별도 설정이 없어도 파일을 편집하는 순간 해당 경로의 규칙이 붙는다.

| 경로 | 요구 사항 |
|---|---|
| `src/gameplay/**` | 데이터 주도 값, delta time 사용, UI 참조 금지 |
| `src/core/**` | hot path에서 할당 없음, thread safety, API 안정성 |
| `src/ai/**` | 성능 예산, 디버깅 가능성, 데이터 주도 파라미터 |
| `src/networking/**` | server-authoritative, 버전 관리된 메시지, 보안 |
| `src/ui/**` | 게임 상태를 소유하지 않음, 지역화 대응, 접근성 |
| `design/gdd/**` | 필수 8개 섹션, 수식 형식, 엣지 케이스 |
| `tests/**` | 테스트 네이밍, 커버리지 요건, fixture 패턴 |
| `prototypes/**` | 완화된 표준, README 필수, 가설 문서화 |

이 표는 게임 개발에서 반복되는 실패 유형을 그대로 반영한다. `src/gameplay/**`의 delta time 요구는 프레임률에 따라 게임 속도가 달라지는 문제를, UI 참조 금지는 게임 로직과 화면 표현이 얽히는 문제를 겨냥한다. `src/core/**`의 hot path 할당 금지는 가비지 컬렉션으로 인한 프레임 끊김을 막기 위한 것이다.

`src/networking/**`의 server-authoritative 요구는 클라이언트가 게임 상태를 스스로 결정하지 못하게 만드는 원칙으로, 멀티플레이어 치팅 대응의 기본이다. `src/ui/**`가 게임 상태를 소유하지 않도록 요구하는 것도 같은 성격의 분리다.

`prototypes/**`가 완화된 표준을 받는 점이 이 설계의 균형추다. 모든 경로에 같은 강도를 적용하면 빠른 실험이 불가능해지므로, 버리는 코드를 두는 자리를 따로 만들고 대신 가설 문서화를 요구한다. 디렉토리 구조에서도 `prototypes/`는 `src/`와 격리되어 있다.

### 리뷰 강도

품질 게이트를 항상 최대로 켜 두면 개인 개발자에게는 부담이 된다. 이 템플릿은 게이트 개수를 세 단계 값으로 노출한다.

| 값 | 게이트 |
|---|---|
| `full` | 모든 director 게이트를 통과한다 |
| `lean` | 단계 게이트만 통과한다 |
| `solo` | 게이트가 없다 |

설정 시점은 `/start` 실행 중이며, 이후에는 `production/review-mode.txt`를 편집해 바꾼다. 어느 스킬에든 `--review solo`를 붙이면 그 실행에서만 덮어쓸 수 있다. 프로젝트 전반은 `lean`으로 두고 급한 핫픽스만 `solo`로 처리하는 식의 운용이 가능하다.

리뷰 강도를 낮춰도 협업 프로토콜의 5단계는 남는다. 게이트는 director 승인 절차이고 프로토콜은 사용자 승인 절차라서 층위가 다르다.

게이트의 상태는 커맨드로도 확인된다. Reviews & Analysis 묶음의 `/gate-check`가 현재 통과 여부를 점검하고, Stories & Sprints 묶음의 `/story-readiness`가 작업 하나가 착수 가능한 상태인지 판정한다. 리뷰 강도 설정이 어떤 검사를 켤지 정한다면 이 두 커맨드는 그 결과를 조회하는 쪽이다.

## 사용 흐름

### 설치와 진입점

요구 환경은 Git과 Claude Code CLI다. `jq`와 Python 3는 권장 사항이며, 훅 검증과 JSON 검증에 쓰인다. 둘 다 없어도 훅은 검증만 건너뛰고 나머지는 그대로 동작한다.

| 항목 | 필수 여부 | 용도 |
|---|---|---|
| Git | 필수 | 저장소 clone과 버전 관리 |
| Claude Code CLI | 필수 | `npm install -g @anthropic-ai/claude-code` |
| `jq` | 권장 | 훅의 JSON 처리 |
| Python 3 | 권장 | JSON 유효성 검증 |

설치는 세 단계다.

```bash
git clone https://github.com/Donchitos/Claude-Code-Game-Studios.git my-game
cd my-game
claude
```

세션을 열고 `/start`를 실행하면 시스템이 사용자의 현재 지점을 먼저 묻는다. 아이디어가 전혀 없는 상태, 막연한 컨셉만 있는 상태, 명확한 설계가 있는 상태, 이미 진행한 작업물이 있는 상태 넷 중 하나를 고르면 그에 맞는 워크플로로 안내한다. README는 이 지점에 "No assumptions"라고 적어 사전 가정을 두지 않음을 강조한다.

필요한 스킬을 이미 아는 사용자는 진입점을 건너뛸 수 있다. `/brainstorm`으로 아이디어를 탐색하거나, `/setup-engine godot 4.6`처럼 엔진과 버전을 지정하거나, `/project-stage-detect`로 기존 프로젝트를 분석하는 경로가 열려 있다. 마지막 경로는 이 템플릿을 진행 중인 프로젝트에 나중에 도입할 때 쓰인다.

이전 버전 템플릿을 쓰던 사용자를 위해 `UPGRADING.md`가 단계별 마이그레이션 절차를 제공한다. 버전 간 변경점, 덮어써도 되는 파일과 수동 병합이 필요한 파일 구분을 함께 안내한다.

### 디렉토리 구조

템플릿이 만드는 구조는 설정 영역인 `.claude/`와 프로젝트 영역으로 나뉜다.

| 경로 | 내용 |
|---|---|
| `CLAUDE.md` | 마스터 설정 |
| `.claude/settings.json` | 훅, 권한, 안전 규칙 |
| `.claude/agents/` | 에이전트 정의 49개. Markdown 본문에 YAML frontmatter를 붙인 형식 |
| `.claude/skills/` | 슬래시 커맨드 73개. 스킬 하나당 하위 디렉토리 하나 |
| `.claude/hooks/` | 훅 스크립트 12개. bash로 작성되었고 크로스플랫폼을 지향한다 |
| `.claude/rules/` | 경로 기반 코딩 표준 11개 |
| `.claude/statusline.sh` | 상태 표시줄 스크립트. 컨텍스트 사용률, 모델, 단계, epic 경로를 보여 준다 |
| `.claude/docs/workflow-catalog.yaml` | 7단계 파이프라인 정의. `/help`가 읽는다 |
| `.claude/docs/templates/` | 문서 템플릿 41개 |
| `src/` | 게임 소스 코드 |
| `assets/` | 아트, 오디오, VFX, 셰이더, 데이터 파일 |
| `design/` | GDD, 내러티브 문서, 레벨 디자인 |
| `docs/` | 기술 문서와 ADR |
| `tests/` | 유닛, 통합, 성능, 플레이테스트 테스트 스위트 |
| `tools/` | 빌드와 파이프라인 도구 |
| `prototypes/` | 버리는 프로토타입. `src/`에서 격리된다 |
| `production/` | 스프린트 계획, 마일스톤, 릴리스 추적 |

프로젝트 영역의 디렉토리 이름은 경로 기반 규칙의 대상과 일치한다. `src/`와 `design/gdd/`와 `tests/`와 `prototypes/`가 모두 규칙 표에 등장하므로, 구조를 그대로 따르는 것만으로 규칙이 자동으로 걸린다.

두 파일은 사용자에게 직접 보이는 산출물이라 따로 볼 만하다. `statusline.sh`는 컨텍스트 사용률과 현재 모델, 진행 단계, epic 경로를 상태 표시줄에 표시해 세션 상태를 한눈에 알려 준다. `workflow-catalog.yaml`은 7단계 파이프라인 정의를 담고 있으며 `/help`가 이 파일을 읽어 사용자에게 다음 단계를 안내한다.

### 커스터마이징

README는 이것이 잠긴 프레임워크가 아니라 템플릿임을 명시하고 변경 경로를 여섯 가지로 제시한다.

| 대상 | 변경 방법 |
|---|---|
| 에이전트 | 필요 없는 정의 파일을 삭제하고 도메인에 맞는 에이전트를 추가한다 |
| 에이전트 프롬프트 | 동작을 조정하고 프로젝트 고유 지식을 넣는다 |
| 스킬 | 팀 프로세스에 맞게 워크플로를 수정한다 |
| 규칙 | 프로젝트 디렉토리 구조에 맞는 경로 기반 규칙을 신설한다 |
| 훅 | 검증 강도를 조정하거나 검사를 추가한다 |
| 엔진 | Godot, Unity, Unreal 중 하나를 고르거나 아무것도 쓰지 않는다 |

이 목록이 시사하는 사용법은 그대로 쓰는 것이 아니라 깎아 쓰는 것이다. 2D 인디 게임에 `network-programmer`와 `live-ops-designer`가 필요하지 않듯, 프로젝트마다 남길 에이전트가 다르다.

## 설계 근거

README는 이 템플릿이 전문 게임 개발 실무에 기반한다고 밝히며 다섯 가지 이론을 근거로 든다.

| 이론 | 적용 지점 |
|---|---|
| MDA Framework | Mechanics, Dynamics, Aesthetics로 나눠 게임 디자인을 분석한다 |
| Self-Determination Theory | Autonomy, Competence, Relatedness로 플레이어 동기를 다룬다 |
| Flow State Design | 도전과 숙련의 균형으로 몰입을 설계한다 |
| Bartle Player Types | 대상 플레이어를 정하고 검증한다 |
| Verification-Driven Development | 테스트를 먼저 쓰고 구현을 뒤에 둔다 |

앞의 네 가지는 게임 디자인 이론이고 마지막 하나는 개발 방법론이다. MDA Framework와 Bartle Player Types는 `/design-system`과 `/balance-check` 같은 디자인 커맨드의 판단 기준으로 쓰이고, Verification-Driven Development는 `tests/**` 규칙과 QA 묶음 커맨드 10개로 구현에 반영된다. 이론을 문서에만 적어 두지 않고 커맨드와 규칙으로 옮긴 점이 이 저장소의 특징이다.

## 결과

이 저장소는 정량 벤치마크나 사용자 수치를 제시하지 않는다. 제시하는 것은 구성 규모와 검증 메커니즘 자체다. README에는 성능 비교표도, 채택 사례도, 개발 기간 단축 수치도 없다.

플랫폼 지원 상황은 명시적으로 밝힌다. 1차 개발과 테스트는 Windows 10과 Git Bash 조합에서 이뤄졌다. 모든 훅이 POSIX 호환 패턴을 쓰고 도구가 없을 때의 폴백을 갖추고 있어 macOS와 Linux에서도 동작할 것으로 본다. POSIX 호환이란 `grep -E`를 쓰고 `grep -P`는 쓰지 않는다는 뜻으로, 후자는 GNU grep에만 있어 macOS 기본 환경에서 실패한다.

README의 표현은 "should run"이라는 추정형이며 단정하지 않는다. 크로스플랫폼 테스트가 진행 중이고 플랫폼별 문제는 이슈로 등록해 달라고 요청한다.

`notify.sh` 훅만은 예외로 못 박는다. Windows toast 알림을 PowerShell로 띄우므로 다른 플랫폼에서는 no-op이며, macOS와 Linux의 데스크톱 알림은 아직 연결되지 않았다고 명시한다.

README는 이 프로젝트가 무료 오픈소스임을 명시하고, 시간을 아꼈거나 게임 출시에 도움이 되었다면 후원을 고려해 달라고 덧붙인다. 프로젝트 운영 창구는 GitHub Discussions와 Issues 두 곳이다. 전자는 질문과 아이디어와 제작 사례 공유에, 후자는 버그 리포트와 기능 요청에 쓴다. 후원 경로는 Buy Me a Coffee(일회성)와 GitHub Sponsors(정기) 두 가지이며, 후원금이 스킬 유지보수와 에이전트 추가, Claude Code 및 엔진 API 변경 대응, 커뮤니티 이슈 대응에 쓰인다고 밝힌다.

## 한계

**Windows 우선 검증.** macOS와 Linux 동작은 POSIX 호환 패턴에 의존한 추정이며 실제 검증은 진행 중이다. 저장소 자체가 이 점을 먼저 밝히고 있으므로 감춰진 위험이라기보다는 공개된 미완 항목에 가깝다.

**데스크톱 알림 미지원.** `notify.sh`가 PowerShell 기반이라 Windows 밖에서는 알림이 동작하지 않는다. 장시간 실행되는 작업의 완료를 알림으로 받으려는 사용자는 직접 대체 훅을 작성해야 한다.

**템플릿 특성상 초기 조정 필요.** 에이전트와 스킬과 규칙과 훅 전부가 프로젝트에 맞춰 추가되고 삭제되고 수정되는 것을 전제로 한다. 도입 직후 그대로 쓰기보다 프로젝트 규모와 장르에 맞춰 덜어내는 작업이 선행되어야 한다.

**협업 프로토콜의 오버헤드.** 모든 에이전트가 질문과 선택지 제시와 승인 절차를 거치므로 완전 자동화된 빠른 반복과는 성격이 다르다. 리뷰 강도를 `solo`로 낮추면 director 게이트는 사라지지만 5단계 프로토콜 자체는 남는다.

**문서와 구성 수치의 불일치.** 배지가 밝히는 에이전트 49개와 스킬 73개와 규칙 11개는 본문에 이름이 실린 48개와 72개와 8개보다 크다. README만으로는 차이의 원인을 확인할 수 없으므로, 실제 구성을 알려면 저장소의 `.claude/` 디렉토리를 직접 확인해야 한다.

**검증 대상의 범위.** 훅이 검사하는 것은 하드코딩된 값, TODO 형식, JSON 유효성, 문서 섹션 존재 여부, 파일 네이밍처럼 정적으로 판정 가능한 항목이다. 게임 밸런스나 재미 같은 판단은 자동 검증 대상이 아니라 director 게이트와 사용자 승인에 남는다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| studio hierarchy | director(Opus), department lead(Sonnet), specialist(Sonnet 또는 Haiku) 3계층으로 에이전트를 나눈 조직 모델 |
| vertical delegation | 상위 계층이 하위 계층에 작업을 내려보내는 수직 위임. 같은 계층끼리 자문만 주고받는 horizontal consultation과 짝을 이룬다 |
| path-scoped rules | 파일 경로만으로 어떤 코딩 표준을 적용할지 자동 판별하는 규칙 |
| review intensity | `full`, `lean`, `solo` 세 단계로 조절하는 리뷰 강도. 통과해야 하는 게이트 개수가 달라진다 |
| collaboration protocol | 모든 에이전트가 따르는 Ask, Present options, You decide, Draft, Approve 5단계 절차 |
| verification-driven development | 구현보다 테스트를 먼저 작성해 검증 가능성을 앞세우는 설계 철학 |

## 관련 페이지

- [[agents/garrytan-gstack]]: 슬래시 커맨드로 역할별 전문가를 불러 스프린트 규율을 세우는 같은 패턴의 소프트웨어 개발 버전
- [[agents/madslorentzen-ai-job-search]]: 동일한 Claude Code 커맨드와 서브에이전트 조합을 구직 자동화 도메인에 적용한 사례. drafter와 reviewer 2단계 구조와 비교할 만하다
- [[agents/walkinglabs-learn-harness-engineering]]: Instructions, State, Verification, Scope, Lifecycle 다섯 가지로 harness를 정의하는 코스. 이 저장소의 훅과 규칙과 리뷰 게이트를 harness 어휘로 다시 읽을 때 참고할 만하다
- [[agents/luis-carrijo-2026-claude-code-team-just-dropped]]: Claude Code의 서브에이전트와 훅 기능 자체를 다루는 자료
