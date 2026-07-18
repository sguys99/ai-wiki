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

`Donchitos/Claude-Code-Game-Studios`는 Claude Code 세션 하나를 게임 개발 스튜디오 조직으로 바꾸는 템플릿이다. 49개 에이전트를 director·department lead·specialist 3단계 계층으로 묶고 73개 슬래시 커맨드와 12개 훅, 11개 경로 기반 코딩 규칙으로 기획부터 출시까지 스튜디오급 품질 게이트를 흉내 낸다.

## 1. 자료 정보 (Document Information)

- **저장소**: `Donchitos/Claude-Code-Game-Studios` (https://github.com/Donchitos/Claude-Code-Game-Studios)
- **라이선스**: MIT
- **구성 규모**: 에이전트 49개, 스킬(슬래시 커맨드) 73개, 훅 12개, 경로 기반 규칙 11개, 문서 템플릿 41개
- **엔진 지원**: Godot 4(`godot-specialist`), Unity(`unity-specialist`), Unreal Engine 5(`unreal-specialist`) 3개 엔진별 전문 에이전트 세트를 제공하며 프로젝트에 맞는 세트만 골라 쓴다
- **요구 환경**: Git, Claude Code CLI, 선택적으로 훅 검증용 `jq`와 JSON 검증용 Python 3(둘 다 없어도 훅은 검증만 건너뛰고 나머지는 그대로 동작한다)

## 2. 주요 기여 (Key Contributions)

- 에이전트를 3단계 스튜디오 계층으로 나눈다. Tier 1 director(Opus 모델, creative-director·technical-director·producer)가 비전을 지키고 Tier 2 department lead(Sonnet, game-designer·lead-programmer·art-director 등 8개 부서장)가 도메인을 소유하며 Tier 3 specialist(Sonnet/Haiku, gameplay-programmer·ai-programmer·qa-tester 등 22개)가 실무를 맡는다. 실제 스튜디오의 조직도를 에이전트 위임 관계로 그대로 옮겼다.
- 오토파일럿이 아니라 협업 프로토콜이다. 모든 에이전트가 "질문 → 2~4개 옵션 제시 → 사용자 결정 → 초안 제시 → 승인" 5단계를 따르도록 강제한다. 도메인 밖 파일은 명시적 위임 없이 건드리지 않는 domain boundary 규칙도 함께 둔다.
- 자동 훅은 12개다. `validate-commit.sh`는 `git commit` 실행 직전에 하드코딩된 값·TODO 포맷·JSON 유효성·GDD 필수 섹션을 검사하고 `validate-push.sh`는 보호된 브랜치에 push하는 것을 경고하며 `validate-assets.sh`는 `assets/` 하위 파일의 네이밍 규칙과 JSON 구조를 검증한다. 관련 없는 명령·경로에서는 즉시 종료(exit 0)해 성능에 영향을 주지 않는다.
- 경로 기반 코딩 규칙은 11개다. `src/gameplay/**`는 데이터 주도 값과 delta time 사용을 요구하고 `src/core/**`는 hot path에서 zero-allocation과 thread safety를 요구하며 `src/networking/**`는 server-authoritative·버전 관리된 메시지를 요구하는 식으로, 파일이 어디 있느냐에 따라 다른 표준이 자동 적용된다.
- 리뷰 강도는 3단계로 나뉜다. `full`(모든 director 게이트 통과), `lean`(단계별 게이트만), `solo`(게이트 없음) 중 하나를 `/start` 시점에 고르거나 `production/review-mode.txt`에서 바꿀 수 있고 스킬 실행마다 `--review solo`로 그때그때 덮어쓸 수도 있다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

진입점은 `/start`다. 사용자가 아이디어가 전혀 없는 상태인지, 막연한 컨셉만 있는지, 이미 명확한 설계가 있는지, 기존 작업물이 있는지를 묻고 그에 맞는 워크플로우로 안내한다. 아무것도 가정하지 않는다. 바로 원하는 스킬을 아는 경우 `/brainstorm`(아이디어 탐색)·`/setup-engine godot 4.6`(엔진 설정)·`/project-stage-detect`(기존 프로젝트 분석)로 곧장 진입할 수도 있다.

에이전트 조정은 다섯 원칙을 따른다. director가 lead에게, lead가 specialist에게 업무를 내려보내는 것이 vertical delegation이다. 같은 tier끼리는 자문만 하고 구속력 있는 결정은 못 내리는데, 이것이 horizontal consultation이다. 이견이 생기면 공유 상위(디자인은 creative-director, 기술은 technical-director)로 올라가 conflict resolution으로 풀고 부서 간 변경은 producer가 조율하는 change propagation으로 처리한다. 마지막 domain boundary는 명시적 위임 없이는 도메인 밖 파일을 건드리지 않는 원칙이다.

73개 스킬은 워크플로우 전 단계를 덮는다. 온보딩(`/start`·`/adopt`)에서 시작해 게임 디자인(`/brainstorm`·`/design-system`·`/propagate-design-change`), 아트·에셋(`/art-bible`·`/asset-audit`), 아키텍처(`/create-architecture`·`/architecture-review`)를 거친다. 이어 스토리·스프린트(`/create-epics`·`/dev-story`·`/story-done`), 리뷰·분석(`/design-review`·`/balance-check`·`/security-audit`), QA(`/qa-plan`·`/regression-suite`·`/skill-test`)로 넘어간다. 프로덕션(`/milestone-review`·`/bug-triage`)과 릴리스(`/release-checklist`·`/hotfix`)를 지나, 여러 에이전트가 한 기능에 동시 투입되는 팀 오케스트레이션(`/team-combat`·`/team-ui`·`/team-live-ops` 등 9개)까지 아우른다.

`design/gdd/**` 규칙이 요구하는 "필수 8섹션"이나 `tests/**`의 네이밍·커버리지 규칙처럼, 규칙은 파일이 놓인 경로만으로 자동 판별되고 별도 설정 없이 즉시 적용된다. 디자인 철학은 MDA Framework(Mechanics-Dynamics-Aesthetics), Self-Determination Theory, Flow State Design, Bartle Player Types, Verification-Driven Development 다섯 축을 근거로 든다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

이 저장소는 정량 벤치마크 대신 구성 규모(에이전트 49·스킬 73·훅 12·규칙 11·템플릿 41)와 검증 메커니즘 자체를 결과물로 제시한다. Windows 10 + Git Bash가 1차 개발·테스트 환경이며 모든 훅이 POSIX 호환 패턴(`grep -E`, `grep -P` 아님)을 쓰고 도구 부재 시 폴백을 갖춰 macOS·Linux에서도 동작하도록 설계했다고 밝힌다. 다만 Windows toast 알림(`notify.sh`)은 PowerShell 전용이라 다른 플랫폼에서는 no-op이고 크로스플랫폼 검증은 진행 중이라고 명시한다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- Windows를 우선 검증했다. 1차 개발·테스트가 Windows 10 + Git Bash에서 이뤄져 macOS·Linux 동작은 POSIX 호환 패턴에 의존한 추정이며 플랫폼별 깨짐은 이슈로 리포트하라고 안내한다.
- 데스크톱 알림은 일부 플랫폼에서 지원되지 않는다. `notify.sh` 훅이 PowerShell 기반이라 Windows 밖에서는 알림이 아예 동작하지 않는다.
- 템플릿이라 초기 커스터마이징이 필요하다. 에이전트·스킬·규칙·훅 전부가 프로젝트에 맞춰 추가·삭제·수정되는 것을 전제로 하므로 그대로 쓰기보다는 도메인에 맞는 조정이 따라야 한다.
- 협업 프로토콜에는 오버헤드가 있다. 모든 에이전트가 질문·옵션 제시·승인 절차를 거치도록 강제해 완전 자동화된 빠른 반복보다는 사용자 개입이 잦은 흐름을 전제로 한다(리뷰 강도를 `solo`로 낮추면 완화 가능).

## 6. 관련 연구 (Related Work)

- **엔진별 전문 에이전트**: Godot 4·Unity·Unreal Engine 5 각각에 대해 하위 전문 에이전트(GDScript/Shaders, DOTS/ECS/Addressables, GAS/Blueprints/Replication 등)를 별도로 묶어 제공한다.
- **업그레이드 경로**: 이전 버전 템플릿 사용자를 위한 `UPGRADING.md`에서 버전 간 변경점과 파일별 덮어쓰기·수동 병합 여부를 안내한다.
- 이 wiki 내 **관련 페이지**는 아래 섹션 참고.

## 7. 용어집 (Glossary)

- **studio hierarchy**: director(Opus)·department lead(Sonnet)·specialist(Sonnet/Haiku) 3단계로 에이전트를 나눈 이 저장소의 조직 모델. 실제 게임 스튜디오의 의사결정 구조를 위임 관계로 옮긴 것이다.
- **vertical / horizontal delegation**: 상위 tier가 하위 tier에 업무를 내려보내는 수직 위임과, 같은 tier끼리 자문만 주고받고 구속력 있는 결정은 내리지 못하는 수평 협의를 구분하는 원칙.
- **path-scoped rules**: 파일 경로만으로 어떤 코딩 표준을 적용할지 자동 판별하는 규칙. 예를 들어 `src/core/**`는 zero-allocation을, `src/ui/**`는 접근성 요건을 요구한다.
- **review intensity**: `full`(모든 director 게이트)·`lean`(단계 게이트만)·`solo`(게이트 없음) 세 단계로 조절하는 리뷰 강도. 프로젝트 규모나 개발 단계에 맞춰 게이트 개수를 조절한다.
- **verification-driven development**: 구현보다 테스트를 먼저 작성해 검증 가능성을 앞세우는 설계 철학. 이 저장소가 근거로 드는 5개 디자인 철학 중 하나다.
