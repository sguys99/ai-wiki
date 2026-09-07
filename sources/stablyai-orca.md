---
title: "Orca (stablyai): The AI Orchestrator for 100x builders"
type: repo
year: 2026
category: agents
raw_path: raw/repos/stablyai-orca.md
raw_filename: "stablyai-orca.md"
source_collection: external
org: "stablyai"
repo: "orca"
url: "https://github.com/stablyai/orca"
license: "MIT"
tags: [ai-orchestrator, coding-agents, git-worktree, claude-code, codex, opencode, desktop-app, cli, mobile-companion, ssh, repo, oss]
---
## 한 줄 요약 (One-line Summary)

Orca는 Codex, Claude Code, OpenCode, Pi 같은 CLI 코딩 에이전트를 각자 독립된 git worktree에서 나란히 실행하고 한 곳에서 추적하는 stablyai의 데스크톱 오케스트레이터다. macOS와 Windows와 Linux 데스크톱 빌드에 iOS와 Android 모바일 컴패니언 앱이 딸려 있으며 MIT 라이선스로 공개됐다.

## 1. 자료 정보 (Document Information)

수집한 자료는 저장소 루트 README 전문이다. 기능 카탈로그, 지원 에이전트 목록, 설치 경로, 커뮤니티 채널, 라이선스로 구성된 제품 소개형 문서이며 코드 구조나 API 레퍼런스는 담고 있지 않다. 각 기능 항목은 본문 대신 `onorca.dev/docs` 아래 문서 링크로 세부를 넘긴다.

| 항목 | 값 |
|---|---|
| Org / Repo | `stablyai/orca` |
| 제품 표어 | "The AI Orchestrator for 100x builders" |
| License | MIT |
| 데스크톱 플랫폼 | macOS, Windows, Linux |
| 모바일 플랫폼 | iOS, Android |
| 공식 사이트 | onorca.dev |
| 커뮤니티 채널 | Discord, X(@orca_build), WeChat |
| README 번역 | Español, Português, 中文, 日本語, 한국어 5개 언어 |

README 상단 배지는 6종이다. GitHub star 수, 전체 릴리스 누적 다운로드 수, 라이선스, Discord, X, 지원 플랫폼 표기가 붙는다.

## 2. 주요 기여 (Key Contributions)

README의 Features 절은 독립 항목 9개를 소제목으로 세우고, 그 뒤 "Also in the box" 목록에 5개를 덧붙인다. 명시된 기능은 모두 14개다.

| 기능 | README 서술 | 문서 경로 |
|---|---|---|
| Mobile Companion | 폰에서 에이전트를 모니터링하고 방향을 지시한다. 에이전트가 끝나면 알림을 받고 어디서든 후속 지시를 보낸다 | `/docs/mobile` |
| Parallel Worktrees | 프롬프트 하나를 에이전트 5개에 팬아웃하고 각자 격리된 git worktree에서 실행한 뒤, 결과를 비교해 가장 좋은 것을 merge한다 | `/docs/model/worktrees` |
| Terminal Splits | WebGL 렌더링을 쓰는 Ghostty급 터미널로, 분할 개수 제한이 없고 재시작 후에도 scrollback이 남는다 | `/docs/terminal` |
| Design Mode | 실제 Chromium 창에서 UI 요소를 클릭하면 그 요소의 HTML과 CSS, 잘라낸 스크린샷이 에이전트 프롬프트로 곧장 전달된다 | `/docs/browser/design-mode` |
| GitHub & Linear, Native | PR과 이슈와 프로젝트 보드를 앱 안에서 열람하고, 태스크에서 바로 worktree를 열어 컨텍스트 전환 없이 리뷰한다 | `/docs/review/linear` |
| SSH Worktrees | 사양이 좋은 원격 장비에서 파일 편집과 git과 터미널을 그대로 쓰며 에이전트를 실행한다. 자동 재연결과 포트 포워딩이 포함된다 | `/docs/ssh` |
| Annotate AI Diffs | diff의 어느 줄에나 코멘트를 달아 에이전트로 되돌려 보낸다. 리뷰와 수정과 커밋을 Orca 안에서 마친다 | `/docs/review/annotate-ai-diff` |
| Drag Files to Agents | 모든 위치에 자동저장이 적용되는 VS Code 편집기를 쓰고, 파일이나 이미지를 끌어다 에이전트 프롬프트에 바로 넣는다 | `/docs/editing/file-explorer` |
| Orca CLI | 에이전트가 Orca 자체를 조작한다. `orca worktree create`와 `snapshot`, `click`, `fill`로 워크플로를 스크립팅한다 | `/docs/cli/overview` |
| Quick open | worktree와 파일과 에이전트와 명령과 저장소 컨텍스트를 한 번에 검색한다 | `/docs/model/quick-open` |
| Account switcher & usage tracking | Claude와 Codex의 사용량과 rate-limit 리셋 시점을 확인하고, 재로그인 없이 계정을 교체한다 | `/docs/agents/usage-tracking` |
| Rich repo previews | Markdown과 이미지와 PDF와 저장소 문서를 작업 공간에서 미리 본다 | `/docs/editing/markdown` |
| Computer Use | 실제 상호작용이 필요한 워크플로에서 에이전트가 데스크톱 앱과 화면에 보이는 UI를 조작하게 허용한다 | `/docs/cli/computer-use` |
| Notifications and unread state | 에이전트가 끝났거나 개입이 필요한 시점을 알리고, 스레드를 읽지 않음으로 표시해 나중에 되돌아온다 | `/docs/notifications` |

기여를 성격으로 묶으면 네 가지다. 첫째, 에이전트 종류를 가리지 않는 오케스트레이션이다. 터미널에서 실행되는 CLI 에이전트라면 원칙적으로 전부 대상이 된다고 명시하고, 이름을 밝힌 에이전트 29종에 "+ any CLI agent"를 덧붙여 확장을 열어 둔다.

둘째, worktree 단위 병렬 실행이다. 프롬프트 하나를 여러 에이전트에 동시에 전달하고 결과를 비교해 하나만 merge하는 흐름을 제품의 중심 모델로 삼는다.

셋째, 리뷰와 편집과 브라우저와 원격 실행을 한 앱 안에 모은 통합 작업 환경이다. GitHub와 Linear 연동, diff 주석, VS Code 편집기, Chromium 기반 Design Mode, SSH worktree가 여기 해당한다.

넷째, 데스크톱 밖으로의 확장이다. 모바일 컴패니언 앱이 실행 상황을 폰으로 옮기고, Orca CLI는 에이전트가 Orca를 조작하는 역방향 경로를 만든다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

README는 내부 구현을 설명하지 않고 사용 모델만 제시한다. 중심에 놓인 것은 worktree 단위 격리다. 프롬프트 하나를 여러 에이전트에 팬아웃하되 각 실행을 독립된 git worktree에 배치해 서로의 작업 디렉토리를 침범하지 않게 한다. 그다음 결과를 나란히 비교하고 원하는 브랜치만 merge한다. 여러 시도 중 하나를 고르는 과정 전체를 앱 안에서 처리한다는 설계다.

이 모델을 뒷받침하는 작업 환경은 네 가지로 나뉜다.

| 계층 | 구성 요소 | README가 밝힌 특성 |
|---|---|---|
| 실행 | 터미널, worktree | WebGL 렌더링 터미널, 분할 개수 제한 없음, 재시작 후에도 유지되는 scrollback |
| 편집 | VS Code 편집기, 저장소 미리보기 | 모든 위치 자동저장, Markdown과 이미지와 PDF 미리보기, 드래그로 프롬프트 주입 |
| 검토 | GitHub, Linear, diff 주석 | 앱 안에서 PR과 이슈와 보드 열람, 태스크에서 worktree 직접 열기, diff 줄 단위 코멘트 |
| 확장 | SSH, 모바일, Orca CLI, Computer Use | 원격 장비 실행과 자동 재연결과 포트 포워딩, 폰에서의 모니터링, 명령 스크립팅, 화면 UI 조작 |

Orca CLI는 방향이 반대인 인터페이스다. 사람이 GUI로 에이전트를 다루는 것과 별개로, 에이전트가 명령을 호출해 Orca를 조작한다. README가 이름을 밝힌 명령은 `orca worktree create`, `snapshot`, `click`, `fill` 4개이며 워크플로 전체를 스크립팅하는 용도로 소개된다. 헤드리스 Linux 서버에서는 `orca serve`로 구동하고 별도 가이드 문서를 참고하게 안내한다.

계정 전환과 사용량 추적은 여러 에이전트를 동시에 쓰는 상황에서 나오는 제약을 다룬다. Claude와 Codex의 사용량과 rate-limit 리셋 시점을 표시하고, 재로그인 절차 없이 계정을 교체하게 한다.

### 지원 에이전트 범위

README는 "any CLI agent"를 원칙으로 걸고, 터미널에서 실행되면 Orca에서도 실행된다고 서술한다. 이름을 밝힌 에이전트는 29종이다.

| 묶음 | 에이전트 |
|---|---|
| 주요 벤더 계열 | Claude Code, Codex, Grok, Cursor, GitHub Copilot, Kimi, Qwen Code, Mistral Vibe, MiMo Code |
| 오픈소스 및 독립 프로젝트 | OpenCode, OpenClaude, Cline, Continue, Goose, Charm, Codebuff, Kilocode, oh-my-pi, Pi |
| 상용 에이전트 제품 | Devin, Amp, Auggie, Droid, Kiro, Rovo Dev, Antigravity, Autohand Code, Command Code, Hermes Agent |

묶음은 이 문서에서 읽기 편하도록 나눈 것이고 README는 구분 없이 한 줄로 나열한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

README에는 정량 벤치마크가 없다. 성능이나 정확도나 비용을 비교한 수치, 오케스트레이션의 효과를 측정한 실험이 모두 빠져 있다.

채택 지표를 대신하는 것은 상단 배지다. GitHub star 수와 전체 릴리스 누적 다운로드 수 배지가 실시간으로 갱신되므로 특정 시점의 수치는 이 문서에 옮기지 않는다.

정성 근거로 남는 것은 지원 에이전트 범위와 릴리스 속도다. 29종을 명시한 목록은 통합 대상의 폭을 보여주고, 매일 배포한다는 서술과 changelog를 실제 기능 목록으로 지목한 대목은 개발 속도를 보여준다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

| 한계 | 내용 | 확인 방법 |
|---|---|---|
| 정량 데이터 부재 | 성능과 정확도와 비용을 잴 벤치마크가 README에 없다. 오케스트레이션이 개발 속도를 얼마나 높이는지 판단할 근거가 문서 안에 없다 | 도입 환경에서 직접 측정 |
| 문서와 실제의 격차 | "we ship daily, so this list is perpetually behind"라고 밝혀, 기능 목록이 실제 앱보다 뒤처져 있음을 저자가 인정한다 | GitHub Releases changelog |
| 원격 텔레메트리 | 익명 사용량 데이터를 수집한다. 수집 범위와 opt-out 절차는 README 본문이 아니라 별도 문서로 넘긴다 | `/docs/telemetry` |
| 내부 구조 미공개 | 제품 소개형 README라서 아키텍처와 API와 확장 지점을 알 수 없다. 에이전트를 어떤 규약으로 붙이는지도 본문에 없다 | CONTRIBUTING.md와 소스 코드 |

지원 에이전트 목록의 성격도 한계로 볼 여지가 있다. "터미널에서 실행되면 Orca에서도 실행된다"는 원칙은 통합 비용이 낮다는 뜻이지만, 각 에이전트가 어느 수준까지 통합되는지는 서술되지 않는다. 목록에 이름이 있다는 사실과 기능 전체가 동작한다는 것은 다른 문제로 남는다.

## 6. 관련 연구 (Related Work)

- [[agents/osmani-2026-loop-engineering]]: worktree를 병렬 실행 에이전트 사이의 파일 충돌 차단 장치로 규정하고, 저장소 이력은 공유하되 작업 디렉토리는 분리된다는 점을 설명한 글이다. Orca의 Parallel Worktrees가 전제로 삼는 성질과 같다.
- [[agents/lee-hoyeon-2026-harness-engineering]]: worktree 격리를 되돌릴 수 있는 환경을 만드는 세 장치 중 하나로 다룬다. 실행 후에 피해 범위를 제한하는 위치에 놓인다는 서술이 Orca의 격리 모델과 겹친다.
- [[agents/patel-2026-beyond-the-prompt-claude-code]]: Claude Code에서 `isolation: worktree`로 서브에이전트를 자체 worktree에서 실행하는 방법과, worktree를 가로질러 작업을 분산하는 `/batch` 명령을 다룬다. Orca가 앱 계층에서 제공하는 것을 단일 에이전트의 설정으로 구현한 사례에 해당한다.
- [[agents/browser-use-browsercode]]: Orca가 지원 목록에 올린 OpenCode를 fork해 만든 코딩 에이전트다. 같은 상류 프로젝트를 오케스트레이션 쪽과 fork 쪽에서 각각 다룬 사례가 된다.
- [[agents/magnitudedev-magnitude]]: 브라우저 에이전트 프레임워크를 다룬 페이지로, harness의 아래쪽 계층을 담당한다. 해당 페이지가 Orca를 harness 위쪽 계층으로 지목한다.
- [[agents/ai-boost-awesome-harness-engineering]]: harness engineering을 컨텍스트 전달과 도구 인터페이스와 verification 루프와 샌드박스를 설계하는 분야로 규정한 awesome-list다. Orca의 worktree 격리는 그 가운데 환경 격리 항목에 해당하는 도구다.
- [[agents/luis-carrijo-2026-claude-code-team-just-dropped]]: Claude Code의 dynamic workflow와 서브에이전트 구성을 다룬 강좌다. 오케스트레이션을 단일 에이전트 안에서 다루는 접근과, Orca처럼 여러 에이전트 위에서 다루는 접근을 대비해 읽을 수 있다.

## 7. 용어집 (Glossary)

- **Orca**: stablyai가 MIT 라이선스로 공개한 데스크톱 AI 오케스트레이터. 여러 CLI 코딩 에이전트를 각자의 git worktree에서 실행하고 한 곳에서 추적한다.
- **Parallel Worktrees**: 프롬프트 하나를 에이전트 여러 개에 팬아웃하고 각 실행을 격리된 git worktree에 배치한 뒤 결과를 비교해 하나만 merge하는 Orca의 중심 사용 모델.
- **Design Mode**: 실제 Chromium 창에서 클릭한 UI 요소의 HTML과 CSS와 잘라낸 스크린샷을 에이전트 프롬프트로 전달하는 Orca 기능.
- **Orca CLI**: 에이전트가 Orca 자체를 조작하도록 제공되는 명령 인터페이스. `orca worktree create`, `snapshot`, `click`, `fill` 4개 명령이 README에 명시됐다.
- **Mobile Companion**: 데스크톱 앱과 페어링해 폰에서 에이전트 진행 상황을 확인하고 후속 지시를 보내는 iOS와 Android 앱.
