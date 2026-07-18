---
title: "Orca (stablyai) — The AI Orchestrator for 100x builders"
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
## 요약 (Summary)

Orca는 Claude Code·Codex·OpenCode·Pi 같은 CLI 코딩 에이전트 여러 개를 각자 독립된 git worktree에서 나란히 돌리고 한 화면에서 관리하는 stablyai의 데스크톱 오케스트레이터다. macOS·Windows·Linux를 지원하고 iOS·Android 모바일 컴패니언 앱까지 갖췄다. MIT 라이선스 오픈소스.

## 주요 기여 (Key Contributions)

1. 에이전트 종류를 가리지 않는다. 터미널에서 돌아가는 CLI 에이전트라면 뭐든 붙는다. Claude Code, Codex, Grok, Cursor CLI, GitHub Copilot CLI, OpenCode, Amp, Devin, Goose를 포함해 30여 종을 README에 명시했고 "+ any CLI agent"로 확장을 열어둔다.
2. **Parallel Worktrees** — 프롬프트 하나를 에이전트 다섯 개에 동시에 던진다. 각자 독립된 git worktree에서 실행한 뒤 결과를 비교해 우승작만 merge하는 워크플로우를 핵심 모델로 삼는다.
3. 모바일 컴패니언으로 에이전트 진행 상황을 iOS·Android 앱에서 모니터링하고 후속 지시를 보낸다. 에이전트가 끝나면 알림이 온다.
4. **Design Mode** — 내장 Chromium 창에서 UI 요소를 클릭하면 HTML·CSS와 잘라낸 스크린샷이 그대로 에이전트 프롬프트에 들어간다.
5. GitHub·Linear가 네이티브로 연동된다. PR·이슈·프로젝트 보드를 앱 안에서 훑어보고, 태스크에서 바로 worktree를 열어 컨텍스트 전환 없이 리뷰한다.
6. **SSH Worktrees** — 사양 좋은 원격 서버에서 파일 편집·git·터미널을 그대로 쓰며 에이전트를 돌린다. 연결이 끊기면 자동으로 다시 붙고 포트 포워딩도 함께 이뤄진다.
7. **Orca CLI** — 에이전트가 Orca 자체를 조작하도록 `orca worktree create`, `snapshot`, `click`, `fill` 같은 명령을 스크립팅한다.
8. diff 라인 아무 데나 코멘트를 달아 에이전트에게 되돌려 보낸다. Orca를 벗어나지 않은 채 리뷰·수정·커밋까지 마친다.

## 방법론 및 아키텍처 (Methodology and Architecture)

Orca의 중심 모델은 worktree 단위 격리다. 프롬프트 하나를 여러 에이전트(또는 같은 에이전트 여러 인스턴스)에 팬아웃하되 각 실행을 독립된 git worktree에 배치해 서로의 작업 디렉토리를 건드리지 않게 한다. 이렇게 나온 결과를 나란히 비교한 뒤 원하는 브랜치만 merge한다. "여러 시도 중 최선을 고른다"는 흐름 전체를 앱 안에서 처리한다.

터미널은 WebGL 렌더링 기반의 Ghostty급 구현을 직접 붙였다. 무한 분할과 재시작 후에도 남는 scrollback을 갖췄다. 에디터는 VS Code 편집기를 자동저장과 함께 내장해 파일이나 이미지를 드래그하면 바로 에이전트 프롬프트에 넣는다.

계정 전환·사용량 추적 기능에서는 Claude·Codex의 사용량과 rate-limit 리셋 시점을 확인하고, 재로그인 없이 계정을 바꿔 쓸 수 있다. Computer Use는 필요할 때 에이전트가 데스크톱 앱과 화면 UI를 직접 조작하도록 허용한다.

## 지원 에이전트 (Supported Agents)

터미널에서 실행되는 CLI 에이전트라면 원칙적으로 전부 붙는다. README에 명시된 목록:

Claude Code · Codex · Grok · Cursor · GitHub Copilot · OpenCode · MiMo Code · Amp · OpenClaude · Antigravity · Pi · oh-my-pi · Hermes Agent · Devin · Goose · Auggie · Autohand Code · Charm · Cline · Codebuff · Command Code · Continue · Droid · Kilocode · Kimi · Kiro · Mistral Vibe · Qwen Code · Rovo Dev

## 설치 (Install)

- 데스크톱(macOS·Windows·Linux): [onorca.dev/download](https://onorca.dev/download), Homebrew(`brew install --cask stablyai/orca/orca`), AUR(`yay -S stably-orca-bin`)
- 모바일: iOS App Store / TestFlight, Android APK
- 헤드리스 Linux 서버는 `orca serve` 명령으로 구동

## 한계 (Limitations)

- 성능·정확도·비용을 잴 벤치마크가 README에 없다. 오케스트레이션이 실제로 개발 속도를 얼마나 높이는지는 직접 벤치마크로 확인해야 한다.
- 릴리스 주기가 빠르다. README도 "we ship daily, so this list is perpetually behind"라고 밝힌 만큼 기능 목록이 실제 앱보다 뒤처져 있을 수 있어, 최신 기능은 GitHub Releases changelog를 봐야 한다.
- 원격 텔레메트리로 익명 사용량 데이터를 수집한다. opt-out 절차는 별도 문서로 안내되니, 보안·프라이버시가 민감한 환경이라면 미리 확인해 두는 게 좋다.

## 관련 페이지 (Related Pages)

- [[agents/walkinglabs-learn-harness-engineering]] — worktree·검증 장치 중심의 harness engineering 코스. Orca의 parallel worktree 모델과 같은 "worktree 격리" 축을 공유한다.
- [[agents/luis-carrijo-2026-claude-code-team-just-dropped]] — Claude Code의 dynamic workflow·subagent 오케스트레이션을 다룬 강좌. Orca는 이를 CLI 에이전트 전반으로 확장한 제품형 구현체로 볼 수 있다.
- [[agents/ai-boost-awesome-harness-engineering]] — harness를 모델과 분리된 공학 분야로 규정한 awesome-list. Orca는 그 목록이 다루는 "컨텍스트·도구·샌드박스" 축 중 멀티 에이전트 오케스트레이션 도구에 해당한다.
