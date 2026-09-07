---
title: "Donchitos/Claude-Code-Game-Studios"
type: repo
year: 2026
category: agents
raw_path: raw/repos/donchitos-claude-code-game-studios.md
raw_filename: "donchitos-claude-code-game-studios.md"
source_collection: external
org: "Donchitos"
repo: "Claude-Code-Game-Studios"
url: "https://github.com/Donchitos/Claude-Code-Game-Studios"
license: "MIT"
tags: [claude-code, agent-workflow, game-development, subagent, skills, hooks, template]
---

## 한 줄 요약 (One-line Summary)

`Donchitos/Claude-Code-Game-Studios`는 Claude Code 세션 하나에 게임 스튜디오의 조직 구조를 입히는 MIT 라이선스 템플릿이다. 에이전트를 director, department lead, specialist 3계층으로 나누고 슬래시 커맨드와 훅, 경로 기반 코딩 규칙을 함께 배포해 기획부터 출시까지의 단계마다 담당자와 품질 게이트를 배치한다.

## 1. 자료 정보 (Document Information)

- **저장소**: `Donchitos/Claude-Code-Game-Studios` (https://github.com/Donchitos/Claude-Code-Game-Studios)
- **라이선스**: MIT
- **자료 형태**: GitHub README 전문. 코드 본문이 아니라 템플릿 사용 안내 문서다
- **요구 환경**: Git과 Claude Code CLI(`npm install -g @anthropic-ai/claude-code`)가 필수다. 훅 검증용 `jq`와 JSON 검증용 Python 3는 권장 사항이며, 없으면 훅이 검증만 건너뛰고 나머지는 그대로 동작한다
- **엔진 지원**: Godot 4, Unity, Unreal Engine 5 세 엔진의 전문 에이전트 세트를 모두 담고 있으며 사용자가 프로젝트에 맞는 세트만 골라 쓰거나 전부 쓰지 않을 수 있다

README가 배지와 표로 밝히는 구성 규모는 다음과 같다. 배지 수치와 본문에 이름이 실린 항목 수가 어긋나는 곳이 있어 함께 적는다.

| 구성 요소 | README 표기 | 본문에 이름이 실린 수 | 설명 |
|---|---|---|---|
| Agents | 49 | 48 | 디자인, 프로그래밍, 아트, 오디오, 내러티브, QA, 프로덕션 전반의 서브에이전트 |
| Skills | 73 | 72 | 워크플로 단계별 슬래시 커맨드 |
| Hooks | 12 | 12 | 커밋, push, 에셋 변경, 세션 수명주기, 에이전트 감사 추적, 결손 탐지 자동 검증 |
| Rules | 11 | 8 | 파일 경로에 따라 적용되는 코딩 표준 |
| Templates | 41 | 0 | GDD, UX 명세, ADR, 스프린트 계획, HUD 설계, 접근성 문서 템플릿 |

에이전트 48개는 계층 목록의 34개(director 3, department lead 8, specialist 23)와 엔진 표의 14개(엔진별 lead 3, 하위 전문가 11)를 더한 값이다. 배지의 49와 1개 차이가 나며, README 본문만으로는 나머지 1개가 무엇인지 확인되지 않는다. 슬래시 커맨드와 규칙도 마찬가지로 배지 수치가 본문 목록보다 크다.

## 2. 주요 기여 (Key Contributions)

- **에이전트를 스튜디오 조직도로 배치한다.** director가 비전을 지키고 department lead가 도메인을 소유하며 specialist가 실무를 맡는 3계층 구조를 두고, 각 에이전트에 책임 범위와 escalation 경로, 품질 게이트를 정의했다.
- **자율 실행이 아니라 협업 프로토콜을 강제한다.** 모든 에이전트가 질문, 2~4개 선택지 제시, 사용자 결정, 초안 제시, 승인의 5단계를 거친다. README는 이를 "auto-pilot이 아니다"라고 못 박고 사용자의 승인 없이는 아무것도 기록되지 않는다고 명시한다.
- **훅 12개로 검증을 자동화한다.** 커밋과 push 직전, 에셋 파일 수정 직후, 세션 시작과 종료, compaction 전후, 서브에이전트 실행 시점마다 스크립트가 걸린다. 관련 없는 명령이나 경로에서는 즉시 exit 0으로 빠져나가도록 설계했다.
- **코딩 표준을 파일 경로에 묶는다.** 별도 설정 없이 파일이 놓인 디렉토리만으로 어떤 표준을 적용할지 결정한다. `src/core/**`와 `src/ui/**`가 서로 다른 요건을 받는 식이다.
- **리뷰 강도를 조절 가능한 값으로 노출한다.** `full`, `lean`, `solo` 세 단계 중 하나를 고르면 통과해야 하는 게이트 개수가 달라진다.
- **템플릿임을 전제로 커스터마이징 경로를 안내한다.** 에이전트 추가와 삭제, 프롬프트 수정, 스킬 변경, 규칙 신설, 훅 강도 조정, 엔진 선택을 모두 사용자 몫으로 열어 둔다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 문제 설정

README의 "Why This Exists" 절은 이 템플릿이 대응하려는 상황을 AI와 단독으로 게임을 만들 때의 구조 부재로 규정한다. 채팅 세션 하나에는 매직 넘버 하드코딩을 막는 장치가 없고 설계 문서를 건너뛰어도 지적하는 주체가 없다. QA 통과 절차도, 디자인 리뷰도, 이 구현이 게임의 비전에 맞는지 묻는 사람도 없다.

해결 방식은 범용 어시스턴트 하나를 전문 에이전트 49개로 대체하는 것이다. README가 밝히는 결과는 사용자가 여전히 모든 결정을 내리되, 올바른 질문을 던지고 실수를 조기에 잡아내며 프로젝트를 브레인스토밍부터 출시까지 정리된 상태로 유지하는 팀을 얻는다는 것이다.

### 3.2 스튜디오 계층

에이전트는 3계층으로 나뉘고 계층마다 사용하는 모델이 다르다.

| 계층 | 모델 | 역할 | 소속 에이전트 |
|---|---|---|---|
| Tier 1 Directors | Opus | 비전 수호 | `creative-director`, `technical-director`, `producer` |
| Tier 2 Department Leads | Sonnet | 도메인 소유 | `game-designer`, `lead-programmer`, `art-director`, `audio-director`, `narrative-director`, `qa-lead`, `release-manager`, `localization-lead` |
| Tier 3 Specialists | Sonnet 또는 Haiku | 실무 수행 | `gameplay-programmer`, `engine-programmer`, `ai-programmer`, `network-programmer`, `tools-programmer`, `ui-programmer`, `systems-designer`, `level-designer`, `economy-designer`, `technical-artist`, `sound-designer`, `writer`, `world-builder`, `ux-designer`, `prototyper`, `performance-analyst`, `devops-engineer`, `analytics-engineer`, `security-engineer`, `qa-tester`, `accessibility-specialist`, `live-ops-designer`, `community-manager` |

계층별 개수는 director 3개, department lead 8개, specialist 23개로 합계 34개다.

엔진 전문 에이전트는 이 34개와 별개로 세 세트가 준비되어 있다.

| 엔진 | lead 에이전트 | 하위 전문가 |
|---|---|---|
| Godot 4 | `godot-specialist` | GDScript, Shaders, GDExtension |
| Unity | `unity-specialist` | DOTS/ECS, Shaders/VFX, Addressables, UI Toolkit |
| Unreal Engine 5 | `unreal-specialist` | GAS, Blueprints, Replication, UMG/CommonUI |

### 3.3 에이전트 조정 원칙

에이전트 사이의 상호작용은 다섯 가지 원칙으로 규정된다.

| 원칙 | 내용 |
|---|---|
| Vertical delegation | director가 lead에게, lead가 specialist에게 작업을 위임한다 |
| Horizontal consultation | 같은 계층끼리는 자문할 수 있지만 도메인을 넘는 구속력 있는 결정은 내리지 못한다 |
| Conflict resolution | 이견은 공유 상위로 올라간다. 디자인은 `creative-director`, 기술은 `technical-director`가 받는다 |
| Change propagation | 부서를 넘나드는 변경은 `producer`가 조율한다 |
| Domain boundaries | 명시적 위임 없이는 자기 도메인 밖 파일을 수정하지 않는다 |

협업 프로토콜은 별도의 5단계로 규정된다. 첫째 Ask 단계에서 에이전트가 해결책을 제안하기 전에 질문한다. 둘째 Present options 단계에서 장단점을 붙인 선택지 2~4개를 보여 준다. 셋째 You decide 단계에서 결정은 항상 사용자가 내린다. 넷째 Draft 단계에서 확정 전에 작업물을 먼저 보여 준다. 다섯째 Approve 단계에서 사용자 승인 없이는 아무것도 기록되지 않는다.

### 3.4 슬래시 커맨드 카탈로그

Claude Code에서 `/`를 입력하면 스킬 목록이 뜬다. README는 이를 12개 묶음으로 나눠 제시한다.

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

Team Orchestration 묶음은 여러 에이전트를 단일 기능에 함께 투입하는 용도라고 README가 따로 설명한다.

### 3.5 진입점과 설치

설치 절차는 세 단계다. 저장소를 clone하거나 GitHub 템플릿으로 쓰고, `claude`로 세션을 열고, `/start`를 실행한다.

```bash
git clone https://github.com/Donchitos/Claude-Code-Game-Studios.git my-game
cd my-game
claude
```

`/start`는 사용자가 어느 지점에 있는지 먼저 묻는다. 아이디어가 전혀 없는 상태, 막연한 컨셉만 있는 상태, 명확한 설계가 있는 상태, 이미 진행한 작업물이 있는 상태 넷 중 하나를 고르면 그에 맞는 워크플로로 안내한다. README는 이 지점에서 "No assumptions"라고 적어 사전 가정을 두지 않음을 강조한다.

필요한 스킬을 이미 아는 경우 `/brainstorm`으로 아이디어를 탐색하거나 `/setup-engine godot 4.6`으로 엔진을 지정하거나 `/project-stage-detect`로 기존 프로젝트를 분석하는 경로로 곧장 들어갈 수 있다.

이전 버전 템플릿을 쓰던 사용자를 위해 `UPGRADING.md`가 단계별 마이그레이션 절차와 버전 간 변경점, 덮어써도 되는 파일과 수동 병합이 필요한 파일 구분을 제공한다.

### 3.6 디렉토리 구조

템플릿이 만드는 디렉토리 구조는 설정 영역과 프로젝트 영역으로 나뉜다.

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

### 3.7 훅 12개

훅은 세션마다 자동으로 실행된다. README가 트리거와 동작을 표로 밝힌 12개는 다음과 같다.

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
| `log-agent.sh` | 에이전트 생성 | 감사 추적 시작. 서브에이전트 호출을 기록한다 |
| `log-agent-stop.sh` | 에이전트 종료 | 감사 추적 종료. 서브에이전트 기록을 완결한다 |
| `validate-skill-change.sh` | PostToolUse (Write/Edit) | `.claude/skills/` 변경 후 `/skill-test` 실행을 권고한다 |

README는 `validate-commit.sh`, `validate-assets.sh`, `validate-skill-change.sh` 세 개가 모든 Bash와 Write tool call에서 실행되었다가 관련 없는 명령이나 경로면 곧바로 exit 0으로 끝난다는 점을 별도 주석으로 설명하고, 이것이 정상 동작이며 성능 문제가 아니라고 밝힌다.

`settings.json`의 권한 규칙은 안전한 작업을 자동 허용하고 위험한 작업을 차단한다. 자동 허용 예시로 git status 확인과 테스트 실행을, 차단 예시로 force push와 `rm -rf`, `.env` 파일 읽기를 든다.

### 3.8 경로 기반 규칙

코딩 표준은 파일 위치에 따라 자동으로 적용된다. README가 표로 밝힌 8개는 다음과 같다.

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

### 3.9 디자인 철학

README는 이 템플릿이 전문 게임 개발 실무에 기반한다고 밝히며 다섯 가지를 근거로 든다.

| 이론 | 적용 지점 |
|---|---|
| MDA Framework | Mechanics, Dynamics, Aesthetics 분석을 게임 디자인에 쓴다 |
| Self-Determination Theory | Autonomy, Competence, Relatedness로 플레이어 동기를 다룬다 |
| Flow State Design | 도전과 숙련의 균형으로 몰입을 설계한다 |
| Bartle Player Types | 대상 플레이어를 정하고 검증한다 |
| Verification-Driven Development | 테스트를 먼저 쓰고 구현을 뒤에 둔다 |

### 3.10 커스터마이징과 리뷰 강도

README는 이것이 잠긴 프레임워크가 아니라 템플릿임을 명시하고 여섯 가지 변경 경로를 든다. 필요 없는 에이전트 파일을 삭제하거나 도메인에 맞는 에이전트를 추가할 수 있다. 에이전트 프롬프트를 수정해 프로젝트 지식을 넣을 수 있다. 스킬을 팀 프로세스에 맞게 조정할 수 있다. 프로젝트 디렉토리 구조에 맞는 경로 기반 규칙을 새로 만들 수 있다. 훅의 검증 강도를 조정하거나 검사를 추가할 수 있다. Godot, Unity, Unreal 중 하나를 고르거나 아무것도 쓰지 않을 수 있다.

리뷰 강도는 세 단계로 노출된다.

| 값 | 게이트 |
|---|---|
| `full` | 모든 director 게이트를 통과한다 |
| `lean` | 단계 게이트만 통과한다 |
| `solo` | 게이트가 없다 |

설정 시점은 `/start` 실행 중이며, 이후에는 `production/review-mode.txt`를 편집해 바꾼다. 개별 실행에서는 어느 스킬에든 `--review solo`를 붙여 그때만 덮어쓸 수 있다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

README는 정량 벤치마크나 사용자 수치를 제시하지 않는다. 제시하는 것은 구성 규모와 검증 메커니즘 자체다.

플랫폼 지원 상황은 다음과 같이 밝힌다. 1차 개발과 테스트는 Windows 10과 Git Bash 조합에서 이뤄졌다. 모든 훅이 POSIX 호환 패턴을 쓰고(`grep -E`를 쓰고 `grep -P`는 쓰지 않는다) 도구가 없을 때의 폴백을 갖추고 있어 macOS와 Linux에서도 동작할 것으로 본다. README의 서술은 "should run"이라는 추정 표현이다.

`notify.sh` 훅은 Windows toast 알림을 PowerShell로 띄우므로 다른 플랫폼에서는 no-op이며, macOS와 Linux의 데스크톱 알림은 아직 연결되지 않았다고 명시한다. 크로스플랫폼 테스트는 진행 중이고 플랫폼별 문제는 이슈로 등록해 달라고 요청한다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **Windows 우선 검증.** macOS와 Linux 동작은 POSIX 호환 패턴에 의존한 추정이며 실제 검증은 진행 중이다.
- **데스크톱 알림 미지원.** `notify.sh`가 PowerShell 기반이라 Windows 밖에서는 알림이 동작하지 않는다.
- **템플릿 특성상 초기 조정 필요.** 에이전트, 스킬, 규칙, 훅 전부가 프로젝트에 맞춰 추가되고 삭제되고 수정되는 것을 전제로 한다.
- **협업 프로토콜의 오버헤드.** 모든 에이전트가 질문과 선택지 제시와 승인 절차를 거치므로 완전 자동화된 빠른 반복과는 성격이 다르다. 리뷰 강도를 `solo`로 낮추면 게이트는 줄지만 5단계 프로토콜 자체는 남는다.
- **문서와 구성 수치의 불일치.** 배지가 밝히는 에이전트 49개, 스킬 73개, 규칙 11개와 본문에 이름이 실린 48개, 72개, 8개가 어긋난다. README만으로는 차이의 원인을 확인할 수 없다.

## 6. 관련 연구 (Related Work)

- **엔진별 전문 에이전트 세트**: Godot 4, Unity, Unreal Engine 5 각각에 lead 에이전트와 하위 전문가를 묶어 제공한다. 세 세트가 저장소에 함께 들어 있고 사용자가 선택한다.
- **업그레이드 경로**: `UPGRADING.md`가 버전 간 변경점과 파일별 덮어쓰기 가능 여부를 안내한다.
- **커뮤니티와 후원**: GitHub Discussions를 질문과 사례 공유 창구로, Issues를 버그 리포트와 기능 요청 창구로 쓴다. Buy Me a Coffee(일회성)와 GitHub Sponsors(정기) 두 후원 경로가 있으며, 후원금은 스킬 유지보수와 에이전트 추가, Claude Code 및 엔진 API 변경 대응, 커뮤니티 이슈 대응에 쓰인다고 밝힌다.
- 이 wiki 내 **관련 페이지**는 wiki 문서의 해당 절을 참고한다.

## 7. 용어집 (Glossary)

- **studio hierarchy**: director(Opus), department lead(Sonnet), specialist(Sonnet 또는 Haiku) 3계층으로 에이전트를 나눈 이 저장소의 조직 모델. 실제 게임 스튜디오의 의사결정 구조를 위임 관계로 옮긴 것이다.
- **vertical delegation / horizontal consultation**: 상위 계층이 하위 계층에 작업을 내려보내는 수직 위임과, 같은 계층끼리 자문만 주고받고 도메인을 넘는 구속력 있는 결정은 내리지 못하는 수평 협의를 구분하는 원칙.
- **path-scoped rules**: 파일 경로만으로 어떤 코딩 표준을 적용할지 자동 판별하는 규칙. `src/core/**`는 hot path 할당 금지를, `src/ui/**`는 접근성을 요구한다.
- **review intensity**: `full`, `lean`, `solo` 세 단계로 조절하는 리뷰 강도. 통과해야 하는 게이트 개수가 달라진다.
- **collaboration protocol**: 모든 에이전트가 따르는 Ask, Present options, You decide, Draft, Approve 5단계 절차. 자율 실행을 막고 사용자 승인을 필수로 만든다.
- **verification-driven development**: 구현보다 테스트를 먼저 작성해 검증 가능성을 앞세우는 설계 철학. 이 저장소가 근거로 드는 다섯 가지 디자인 철학 중 하나다.
