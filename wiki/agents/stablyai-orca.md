---
title: "Orca (stablyai): The AI Orchestrator for 100x builders"
type: repo
year: 2026
category: agents
raw_path: raw/repos/stablyai-orca.md
raw_filename: "stablyai-orca.md"
source_collection: external
source: stablyai-orca.md
org: "stablyai"
repo: "orca"
url: "https://github.com/stablyai/orca"
license: "MIT"
tags: [ai-orchestrator, coding-agents, git-worktree, claude-code, codex, opencode, desktop-app, cli, mobile-companion, ssh, repo, oss]
---
## 요약

Orca는 여러 CLI 코딩 에이전트를 각자 독립된 git worktree에서 동시에 실행하고 한 곳에서 추적하는 데스크톱 애플리케이션이다. stablyai가 MIT 라이선스로 공개했고, README는 스스로를 "The AI Orchestrator for 100x builders"로 소개하며 Codex와 Claude Code와 OpenCode와 Pi를 나란히 실행하는 화면을 첫 이미지로 내세운다.

이 저장소가 다루는 대상은 에이전트 자체가 아니라 에이전트를 감싸는 실행 환경이다. 모델이나 프롬프트를 제공하지 않고, 이미 존재하는 CLI 에이전트를 실행하고 격리하고 비교하는 계층만 담당한다. 그래서 지원 범위도 특정 벤더가 아니라 "터미널에서 실행되면 Orca에서도 실행된다"는 조건으로 규정된다.

이 페이지는 저장소 README가 밝힌 것, 즉 사용 모델과 기능 카탈로그와 지원 에이전트 범위와 설치 경로와 라이선스를 다룬다. README는 제품 소개형 문서이므로 내부 아키텍처와 API 레퍼런스는 다루지 않는다. 기능마다 `onorca.dev/docs` 아래 문서로 세부를 넘기는 구조여서, 본문에서 확인할 수 있는 것은 각 기능의 존재와 한 줄 정의까지다.

## 핵심 개념

**worktree**는 하나의 git 저장소에서 여러 작업 디렉토리를 동시에 체크아웃하는 기능이다. 저장소 이력은 공유하면서 파일이 놓이는 디렉토리만 분리하므로, 서로 다른 브랜치를 같은 저장소에서 동시에 열어 둘 수 있다. Orca는 이 성질을 에이전트 격리 수단으로 쓴다.

오케스트레이션은 여러 에이전트와 도구의 실행을 조율하는 계층을 뜻한다. Orca의 오케스트레이션 대상은 서브에이전트가 아니라 각각 독립된 프로세스로 실행되는 완성품 에이전트다. 한 에이전트 안에서 작업을 위임하는 것과는 층이 다르다.

팬아웃은 하나의 입력을 여러 실행 주체에 동시에 뿌리는 방식을 말한다. Orca의 기본 사용 모델은 프롬프트 하나를 에이전트 5개에 팬아웃하는 것이다.

CLI 에이전트는 터미널에서 실행되는 코딩 에이전트를 가리킨다. Claude Code와 Codex처럼 명령줄에서 구동되고 표준 입출력으로 상호작용하는 도구가 여기 해당한다. Orca가 연결할 수 있는 대상의 조건이 바로 이 형태다.

Computer Use는 에이전트가 데스크톱 앱과 화면에 보이는 UI를 직접 조작하는 기능이다. Orca는 실제 상호작용이 필요한 워크플로에서만 이 기능을 허용한다고 서술한다.

## 병렬 worktree 실행 모델

Orca의 중심 사용 모델은 여러 시도를 동시에 만들고 그중 하나를 고르는 것이다. README는 이 흐름을 한 문장으로 규정한다. 프롬프트 하나를 에이전트 5개에 팬아웃하고, 각자 격리된 git worktree에서 실행한 뒤, 결과를 비교해 가장 좋은 것을 merge한다.

이 모델이 성립하는 이유는 worktree의 성질에 있다. 각 에이전트가 별도 작업 디렉토리를 받으므로 같은 파일을 동시에 수정해도 서로를 침범하지 않는다. 동시에 저장소 이력은 공유되므로 나중에 결과를 브랜치 단위로 비교하고 하나만 merge할 수 있다. 격리와 비교가 동시에 가능하다는 점이 이 방식의 핵심이다.

| 단계 | 하는 일 | Orca가 담당하는 부분 |
|---|---|---|
| 팬아웃 | 프롬프트 하나를 여러 에이전트에 동시에 전달한다 | 에이전트 실행과 프롬프트 배포 |
| 격리 | 각 실행을 독립된 git worktree에 배치한다 | worktree 생성과 에이전트 배정 |
| 추적 | 진행 상황을 한 곳에서 확인한다 | 통합 화면, 알림, 읽지 않음 상태 |
| 비교 | 결과 diff를 나란히 검토한다 | diff 뷰어와 줄 단위 주석 |
| 선택 | 채택할 브랜치만 merge한다 | 앱 안에서의 리뷰와 커밋 |

주의할 점은 팬아웃 대상이 서로 다른 에이전트일 수도 있고 같은 에이전트의 여러 인스턴스일 수도 있다는 것이다. README는 어느 쪽을 전제하지 않고 "다섯 개 에이전트"로만 서술한다. 따라서 이 모델은 도구 비교와 시도 반복 양쪽에 쓸 수 있는 구조로 읽힌다.

## 작업 환경

Orca는 worktree 실행을 둘러싼 편집과 검토 도구를 한 앱 안에 모은다. README의 기능 목록 가운데 절반 이상이 이 통합 작업 환경에 관한 것이다.

### 터미널과 편집기

터미널과 편집기는 각각 기존 도구의 수준을 기준으로 소개된다. 터미널은 WebGL 렌더링을 쓰는 Ghostty급 구현으로 서술되고, 편집기는 VS Code의 편집기라고 명시된다. 두 항목 모두 구현 출처보다 동작 특성을 강조한다.

| 구성 요소 | 특성 | 의미 |
|---|---|---|
| 터미널 | WebGL 렌더링 | 화면 갱신을 GPU에 맡겨 출력이 많아도 렌더링 부담이 작다 |
| 터미널 | 분할 개수 제한 없음 | 에이전트 수만큼 터미널을 열어도 창 구성이 막히지 않는다 |
| 터미널 | 재시작 후 유지되는 scrollback | 앱을 닫았다 열어도 이전 실행 로그가 남는다 |
| 편집기 | 모든 위치 자동저장 | 에이전트가 파일을 읽는 시점과 사람이 편집한 시점이 어긋나지 않는다 |
| 편집기 | 드래그 주입 | 파일이나 이미지를 끌어다 놓으면 에이전트 프롬프트에 그대로 들어간다 |

scrollback이 재시작을 넘어 남는다는 점은 병렬 실행 환경에서 실용적인 의미가 있다. 에이전트 5개를 동시에 실행한 세션의 출력이 앱 재시작으로 사라지면 어느 시도가 무엇을 했는지 되짚을 수 없기 때문이다.

### 저장소 열람과 검색

저장소 미리보기 기능은 Markdown과 이미지와 PDF와 저장소 문서를 작업 공간 안에서 열어 본다. 문서를 확인하려고 앱을 벗어나지 않게 하려는 기능이다.

검색은 quick open이 담당한다. 검색 대상이 파일에 한정되지 않고 worktree와 파일과 에이전트와 명령과 저장소 컨텍스트를 한 번에 검색한다. worktree가 여러 개 열려 있는 상태에서는 검색 범위 자체가 worktree를 가로질러야 하므로, 이 기능은 병렬 실행 모델의 부속 요소로 볼 수 있다.

### 브라우저 연동

Design Mode는 UI 작업의 컨텍스트 전달을 자동화한다. 실제 Chromium 창에서 UI 요소를 클릭하면 그 요소의 HTML과 CSS, 그리고 잘라낸 스크린샷이 에이전트 프롬프트로 곧장 전달된다. 사람이 "이 버튼의 여백을 줄여 달라"를 글로 설명하는 대신, 대상 요소의 코드와 화면 이미지를 함께 넘기는 방식이다.

Computer Use는 브라우저 밖으로 범위를 넓힌다. 필요할 때 에이전트가 데스크톱 앱과 화면에 보이는 UI를 조작하게 허용한다. README는 이 기능을 상시 동작이 아니라 실제 상호작용이 필요한 워크플로에 한정된 선택 사항으로 서술한다.

### 리뷰 연동

리뷰 쪽에는 두 가지 기능이 있다. 하나는 외부 이슈 트래커 연동이고, 다른 하나는 diff 주석이다.

GitHub와 Linear는 네이티브로 연동되어 PR과 이슈와 프로젝트 보드를 앱 안에서 열람한다. 열람 자체보다 중요한 것은 태스크에서 바로 worktree를 열 수 있다는 점이다. README는 이 동작의 효과를 컨텍스트 전환 없는 리뷰로 표현한다.

diff 주석은 검토 결과를 에이전트로 되돌리는 경로다. diff의 어느 줄에나 코멘트를 달아 에이전트에게 보내고, 리뷰와 수정과 커밋을 Orca 안에서 마친다. 사람의 검토 의견이 별도 채널을 거치지 않고 실행 중인 에이전트로 직접 흘러가는 구성이다.

## 원격과 모바일로의 확장

Orca는 실행 위치와 조작 위치를 각각 데스크톱 밖으로 넓힌다. 실행 위치를 넓히는 것이 SSH worktree이고, 조작 위치를 넓히는 것이 모바일 컴패니언이다.

### SSH worktree

SSH worktree는 사양이 좋은 원격 장비에서 에이전트를 실행하면서도 로컬과 같은 작업 경험을 유지하게 한다. 파일 편집과 git과 터미널을 그대로 쓸 수 있고, 자동 재연결과 포트 포워딩이 함께 제공된다.

자동 재연결과 포트 포워딩이 명시된 이유는 원격 실행의 두 가지 실무 제약과 대응한다. 에이전트 실행은 길게 이어지므로 연결이 한 번 끊겼을 때 세션이 사라지면 안 되고, 원격에서 띄운 개발 서버를 로컬 브라우저로 확인해야 하기 때문이다.

### 헤드리스 서버 구동

화면이 없는 Linux 서버에서는 `orca serve`로 구동한다. README는 이 경로에 별도 가이드 문서를 연결해 두었다. 데스크톱 앱이 전제인 제품이지만 서버 상주 형태의 사용도 지원 범위에 들어 있다는 뜻이다.

### 모바일 컴패니언

모바일 앱은 독립 실행이 아니라 데스크톱 앱과 페어링해 동작한다. 담당 범위는 모니터링과 후속 지시 두 가지다.

| 동작 | 내용 |
|---|---|
| 모니터링 | 에이전트 진행 상황을 폰에서 확인한다 |
| 알림 | 에이전트가 끝나면 알림을 받는다 |
| 후속 지시 | 어디서든 후속 지시를 보내 방향을 조정한다 |

이 구성은 앞의 병렬 실행 모델과 이어진다. 에이전트를 여러 개 띄워 놓고 끝날 때까지 기다리는 시간이 생기므로, 그 대기를 책상 앞에서 하지 않게 하는 것이 모바일 앱의 역할이다.

## Orca CLI와 역방향 조작

Orca CLI는 사람이 아니라 에이전트를 사용자로 두는 인터페이스다. GUI로 사람이 에이전트를 조작하는 것과 반대로, 에이전트가 명령을 호출해 Orca를 조작한다. README는 이 기능을 워크플로 전체를 스크립팅하는 수단으로 소개한다.

| 명령 | README가 밝힌 용도 |
|---|---|
| `orca worktree create` | worktree를 새로 만든다 |
| `snapshot` | 화면이나 상태를 캡처한다 |
| `click` | UI 요소를 클릭한다 |
| `fill` | 입력 필드를 채운다 |

명령 4개의 성격을 보면 worktree 관리 하나와 화면 조작 셋으로 나뉜다. 다만 README는 명령 이름과 스크립팅 용도만 밝히고 인자와 반환값은 문서로 넘기므로, 각 명령의 정확한 동작 범위는 본문에서 확인할 수 없다.

## 다중 에이전트 운영 보조

에이전트를 여러 개 동시에 쓰면 실행 자체와 무관한 제약이 생긴다. 사용량 한도와 알림 관리가 그것이고, Orca는 두 항목에 각각 기능을 둔다.

계정 전환과 사용량 추적은 한도 문제를 다룬다. Claude와 Codex의 사용량과 rate-limit 리셋 시점을 표시하고, 재로그인 절차 없이 계정을 교체하게 한다. 에이전트 5개를 동시에 실행하면 단일 계정 한도에 먼저 닿기 때문에, 한도 상태를 보이게 만들고 계정을 바꿀 수 있게 하는 것이 병렬 실행의 전제 조건이 된다.

알림과 읽지 않음 상태는 주의 배분 문제를 다룬다. 에이전트가 끝났거나 개입이 필요한 시점을 알리고, 스레드를 읽지 않음으로 표시해 나중에 되돌아오게 한다. 동시 실행이 많아질 때 어느 것을 아직 확인하지 않았는지 표시할 수단이 필요하다는 인식이 깔려 있다.

## 기능과 공식 문서 대응

README의 Features 절은 독립 항목 9개를 소제목으로 세우고, 그 뒤 "Also in the box" 목록에 5개를 덧붙인다. 명시된 기능은 모두 14개이며 각각 공식 문서 경로를 함께 밝힌다.

| 기능 | 담당 영역 | 문서 경로 |
|---|---|---|
| Mobile Companion | 모바일 모니터링과 후속 지시 | `/docs/mobile` |
| Parallel Worktrees | 팬아웃 실행과 격리와 merge | `/docs/model/worktrees` |
| Terminal Splits | 터미널 렌더링과 분할과 scrollback | `/docs/terminal` |
| Design Mode | 브라우저 요소를 프롬프트로 전달 | `/docs/browser/design-mode` |
| GitHub & Linear, Native | PR과 이슈와 보드 열람, 태스크에서 worktree 열기 | `/docs/review/linear` |
| SSH Worktrees | 원격 장비 실행, 자동 재연결, 포트 포워딩 | `/docs/ssh` |
| Annotate AI Diffs | diff 줄 단위 주석을 에이전트로 반환 | `/docs/review/annotate-ai-diff` |
| Drag Files to Agents | VS Code 편집기와 드래그 주입 | `/docs/editing/file-explorer` |
| Orca CLI | 에이전트의 Orca 조작과 워크플로 스크립팅 | `/docs/cli/overview` |
| Quick open | worktree와 파일과 에이전트와 명령 통합 검색 | `/docs/model/quick-open` |
| Account switcher & usage tracking | 사용량과 rate-limit 표시, 계정 교체 | `/docs/agents/usage-tracking` |
| Rich repo previews | Markdown과 이미지와 PDF 미리보기 | `/docs/editing/markdown` |
| Computer Use | 데스크톱 앱과 화면 UI 조작 | `/docs/cli/computer-use` |
| Notifications and unread state | 완료 알림과 읽지 않음 표시 | `/docs/notifications` |

목록 끝에는 "And many, many more"가 붙고, 매일 배포하기 때문에 이 목록이 항상 뒤처져 있으며 실제 기능 목록은 changelog라고 밝힌다. 기능 카탈로그를 문서가 아니라 릴리스 이력에 위임한 셈이다.

## 지원 에이전트

지원 범위는 벤더 목록이 아니라 실행 형태로 규정된다. README의 문장은 "터미널에서 실행되면 Orca에서도 실행된다"이며, 이 조건을 만족하는 모든 CLI 에이전트가 대상이 된다. 그 위에 이름을 밝힌 에이전트가 29종이고 마지막에 "+ any CLI agent"가 붙는다.

| 묶음 | 에이전트 |
|---|---|
| 주요 벤더 계열 | Claude Code, Codex, Grok, Cursor, GitHub Copilot, Kimi, Qwen Code, Mistral Vibe, MiMo Code |
| 오픈소스와 독립 프로젝트 | OpenCode, OpenClaude, Cline, Continue, Goose, Charm, Codebuff, Kilocode, oh-my-pi, Pi |
| 상용 에이전트 제품 | Devin, Amp, Auggie, Droid, Kiro, Rovo Dev, Antigravity, Autohand Code, Command Code, Hermes Agent |

묶음은 이 페이지에서 읽기 편하도록 나눈 것이고 README는 구분 없이 한 줄로 나열한다. 목록에 이름이 있다는 사실과 각 에이전트가 어느 수준까지 통합되는지는 별개 문제로 남는다. README가 통합 깊이를 항목별로 밝히지 않기 때문이다.

## 설치

### 데스크톱 배포물

배포물은 플랫폼별로 나뉘며 최신 릴리스에서 직접 받을 수 있다. macOS는 칩 종류에 따라 파일이 갈린다.

| 대상 | 파일 |
|---|---|
| macOS Apple Silicon | `orca-macos-arm64.dmg` |
| macOS Intel | `orca-macos-x64.dmg` |
| Windows | `orca-windows-setup.exe` |
| Linux | `orca-linux.AppImage` |

공식 배포 페이지는 `onorca.dev/download`이고, 전체 빌드 목록은 GitHub Releases에서 확인한다.

### 패키지 관리자

macOS와 Arch Linux는 패키지 관리자 설치를 지원한다.

```bash
# macOS (Homebrew)
brew install --cask stablyai/orca/orca

# Arch Linux (AUR)
yay -S stably-orca-bin
```

AUR에는 두 패키지가 있다. `stably-orca-bin`은 미리 빌드된 바이너리를 설치하고, `stably-orca-git`은 소스에서 직접 빌드한다.

### 모바일 설치

모바일 앱은 데스크톱 앱과 페어링해 사용한다.

| 플랫폼 | 경로 |
|---|---|
| iOS | App Store 또는 TestFlight |
| Android | 릴리스 태그 `mobile-android-v0.0.31`에 첨부된 APK 0.0.31 |

Android가 스토어 배포 대신 APK 직접 배포를 쓰고 버전이 0.0.31이라는 점에서, 모바일 쪽은 데스크톱보다 이른 단계로 볼 수 있다.

## 저장소 운영

### 릴리스와 문서 정책

저장소의 문서 정책은 명시적이다. README는 기능 목록이 항상 실제 앱보다 뒤처져 있다고 밝히고 changelog를 실제 기능 목록으로 지목한다. 매일 배포한다는 서술이 이 정책의 근거다. 따라서 최신 상태를 확인하려면 README가 아니라 GitHub Releases를 봐야 한다.

### 커뮤니티와 피드백 경로

채널은 용도별로 나뉘어 있다.

| 채널 | 용도 |
|---|---|
| Discord | 커뮤니티 참여 |
| X(@orca_build) | 업데이트와 공지 |
| WeChat | 중국어권 커뮤니티. 첫 번째 그룹은 정원이 찼고 두 번째 그룹이 열려 있다 |
| GitHub Issues | 기능 요청 |
| 텔레메트리 문서 | 수집하는 익명 사용량 데이터의 범위와 opt-out 절차 |

기여 절차는 `.github/CONTRIBUTING.md`가 안내한다. README는 로컬 실행과 기여 방법을 이 문서로 넘긴다.

### 라이선스와 빌드 서명

라이선스는 MIT이고 README는 제품을 무료 오픈소스로 규정한다. Windows 빌드의 코드 서명은 SignPath.io가 후원하고 인증서는 SignPath Foundation이 발급한다. 오픈소스 데스크톱 앱이 서명 없이 배포될 때 발생하는 설치 경고를 외부 후원으로 해결한 구성이다.

## 한계

| 한계 | 내용 | 확인 방법 |
|---|---|---|
| 정량 데이터 부재 | 성능과 정확도와 비용을 잴 벤치마크가 README에 없다. 오케스트레이션이 개발 속도를 얼마나 높이는지 판단할 근거가 문서 안에 없다 | 도입 환경에서 직접 측정 |
| 문서와 실제의 격차 | 기능 목록이 실제 앱보다 뒤처져 있음을 저자가 직접 인정한다 | GitHub Releases changelog |
| 원격 텔레메트리 | 익명 사용량 데이터를 수집하며 수집 범위와 opt-out 절차를 별도 문서로 넘긴다 | 공식 텔레메트리 문서 |
| 내부 구조 미공개 | 제품 소개형 README라서 아키텍처와 API와 확장 지점을 알 수 없다. 에이전트를 어떤 규약으로 붙이는지도 본문에 없다 | CONTRIBUTING.md와 소스 코드 |
| 통합 깊이 불명 | 지원 목록에 이름만 있고 에이전트별로 어느 기능까지 동작하는지는 서술되지 않는다 | 각 에이전트로 직접 확인 |

채택 지표도 문서 안에서는 확인되지 않는다. README 상단에 GitHub star 수와 전체 릴리스 누적 다운로드 수 배지가 있지만 실시간으로 갱신되는 값이므로, 특정 시점의 수치를 이 페이지에 고정해 적을 수 없다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| worktree | 하나의 git 저장소에서 여러 작업 디렉토리를 동시에 체크아웃하는 기능. 저장소 이력은 공유하고 작업 디렉토리만 분리한다 |
| Parallel Worktrees | 프롬프트 하나를 에이전트 여러 개에 팬아웃하고 각 실행을 격리된 worktree에 배치한 뒤 결과를 비교해 하나만 merge하는 Orca의 중심 사용 모델 |
| Design Mode | 실제 Chromium 창에서 클릭한 UI 요소의 HTML과 CSS와 잘라낸 스크린샷을 에이전트 프롬프트로 전달하는 기능 |
| Orca CLI | 에이전트가 Orca 자체를 조작하도록 제공되는 명령 인터페이스. `orca worktree create`, `snapshot`, `click`, `fill` 4개가 README에 명시됐다 |
| Mobile Companion | 데스크톱 앱과 페어링해 폰에서 진행 상황을 확인하고 후속 지시를 보내는 iOS와 Android 앱 |

## 관련 페이지

- [[agents/osmani-2026-loop-engineering]]: worktree를 병렬 실행 에이전트 사이의 파일 충돌 차단 장치로 규정하고, 저장소 이력은 공유하되 작업 디렉토리는 분리된다고 설명한다. Orca의 Parallel Worktrees가 전제로 삼는 성질과 같다
- [[agents/lee-hoyeon-2026-harness-engineering]]: worktree 격리를 되돌릴 수 있는 환경을 만드는 세 장치 중 하나로 다루며, 실행 후에 피해 범위를 제한하는 위치에 놓인다고 서술한다
- [[agents/patel-2026-beyond-the-prompt-claude-code]]: Claude Code에서 `isolation: worktree`로 서브에이전트를 자체 worktree에서 실행하는 설정과, worktree를 가로질러 작업을 분산하는 `/batch` 명령을 다룬다. Orca가 앱 계층에서 제공하는 것을 단일 에이전트의 설정으로 구현한 사례다
- [[agents/browser-use-browsercode]]: Orca가 지원 목록에 올린 OpenCode를 fork해 만든 코딩 에이전트다. 같은 상류 프로젝트를 오케스트레이션 쪽과 fork 쪽에서 각각 다룬 사례가 된다
- [[agents/magnitudedev-magnitude]]: 브라우저 에이전트 프레임워크를 다룬 페이지로, 해당 페이지가 Orca를 harness 위쪽 계층으로 지목한다
- [[agents/ai-boost-awesome-harness-engineering]]: harness engineering을 컨텍스트 전달과 도구 인터페이스와 verification 루프와 샌드박스를 설계하는 분야로 규정한 awesome-list다. Orca의 worktree 격리는 그 가운데 환경 격리 항목에 해당하는 도구다
- [[agents/luis-carrijo-2026-claude-code-team-just-dropped]]: Claude Code의 dynamic workflow와 서브에이전트 구성을 다룬 강좌다. 오케스트레이션을 단일 에이전트 안에서 다루는 접근과, Orca처럼 여러 에이전트 위에서 다루는 접근을 대비해 읽을 수 있다
