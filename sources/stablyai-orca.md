---
title: "Orca (stablyai) — The AI Orchestrator for 100x builders"
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

Claude Code·Codex·OpenCode·Pi 같은 CLI 코딩 에이전트 여러 개를 각자 독립된 git worktree에서 나란히 돌리고 한 화면에서 관리하는 stablyai의 데스크톱 오케스트레이터. macOS·Windows·Linux를 지원하고 모바일 컴패니언 앱까지 갖췄다.

## 1. 자료 정보 (Document Information)

- **Org / Repo**: `stablyai/orca`
- **제품명**: Orca — "The AI Orchestrator for 100x builders"
- **License**: MIT
- **플랫폼**: macOS, Windows, Linux (데스크톱) + iOS, Android (모바일 컴패니언)
- **공식 사이트**: onorca.dev
- **커뮤니티**: Discord, X(@orca_build), WeChat

## 2. 주요 기여 (Key Contributions)

1. **에이전트에 종속되지 않는 오케스트레이션**: 터미널에서 돌아가는 CLI 에이전트라면 뭐든 붙는다. Claude Code, Codex, Grok, Cursor CLI, GitHub Copilot CLI, OpenCode, Amp, Devin, Goose를 포함해 30여 종을 README에 명시했고 "+ any CLI agent"로 확장을 열어둔다.
2. **Parallel Worktrees**: 프롬프트 하나를 에이전트 다섯 개에 동시에 던지고 각자 독립된 git worktree에서 실행한 뒤 결과를 비교해 우승작만 merge하는 워크플로우를 핵심 모델로 삼는다.
3. **모바일 컴패니언**: iOS·Android 앱으로 에이전트 진행 상황을 폰에서 모니터링하고 후속 지시를 보낸다. 에이전트가 끝나면 알림이 온다.
4. **Design Mode**: 내장 Chromium 창에서 UI 요소를 클릭하면 HTML·CSS와 잘라낸 스크린샷이 그대로 에이전트 프롬프트에 들어간다.
5. **GitHub·Linear 네이티브 연동**: PR·이슈·프로젝트 보드를 앱 안에서 훑어본다. 태스크에서 바로 worktree를 열어 컨텍스트 전환 없이 리뷰한다.
6. **SSH Worktrees**: 사양 좋은 원격 서버에서 파일 편집·git·터미널을 그대로 쓰며 에이전트를 돌린다. 자동 재연결과 포트 포워딩을 함께 제공한다.
7. **Orca CLI**: 에이전트가 Orca 자체를 조작하도록 `orca worktree create`, `snapshot`, `click`, `fill` 같은 명령을 스크립팅할 수 있다.
8. **Diff 주석 및 되돌리기**: diff 라인 아무 데나 코멘트를 달아 에이전트에게 돌려보낸다. Orca를 벗어나지 않은 채 리뷰·수정·커밋까지 마친다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

Orca의 중심 모델은 worktree 단위 격리다. 프롬프트 하나를 여러 에이전트(또는 같은 에이전트 여러 인스턴스)에 팬아웃하되 각 실행을 독립된 git worktree에 배치해 서로의 작업 디렉토리를 건드리지 않게 한다. 이렇게 나온 결과를 나란히 비교한 뒤 원하는 브랜치만 merge하는 식으로 "여러 시도 중 최선을 고른다"는 흐름을 앱 차원에서 지원한다.

터미널은 WebGL 렌더링 기반의 Ghostty급 구현을 직접 붙였다. 무한 분할과 재시작 후에도 남는 scrollback을 갖췄다. 에디터는 VS Code 편집기를 자동저장과 함께 내장한다. 파일이나 이미지를 드래그해 바로 에이전트 프롬프트에 넣는다.

계정 전환 및 사용량 추적 기능은 Claude·Codex의 사용량과 rate-limit 리셋 시점을 보여준다. 재로그인 없이 계정을 바꿔가며 쓰게 해준다. Computer Use 기능은 필요할 때 에이전트가 데스크톱 앱과 화면 UI를 직접 조작하도록 열어준다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

README에는 정량 벤치마크가 없다. GitHub star 배지, 릴리스별 누적 다운로드 배지, star history 차트로 채택 지표를 대신 보여준다. 정확한 수치는 저장소 배지가 실시간으로 갱신하므로 이 문서에는 옮기지 않는다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **정량 데이터 부재**: 성능·정확도·비용 관련 벤치마크가 README에 없다. 오케스트레이션이 실제로 개발 속도를 얼마나 높이는지는 직접 확인해야 한다.
- **빠른 릴리스 주기**: "we ship daily, so this list is perpetually behind"라고 밝힌 만큼 README의 기능 목록이 실제 앱보다 뒤처져 있을 수 있다. 최신 기능은 GitHub Releases changelog를 봐야 한다.
- **원격 텔레메트리**: 익명 사용량 데이터를 수집한다. opt-out 절차는 별도 문서로 안내된다. 보안·프라이버시가 민감한 환경이라면 미리 확인해 두어야 한다.

## 6. 관련 연구 (Related Work)

- [[agents/walkinglabs-learn-harness-engineering]] — worktree·검증 장치 중심의 harness engineering 코스. Orca의 parallel worktree 모델과 같은 "worktree 격리" 축을 공유한다.
- [[agents/luis-carrijo-2026-claude-code-team-just-dropped]] — Claude Code의 dynamic workflow·subagent 오케스트레이션을 다룬 강좌. Orca는 이를 CLI 에이전트 전반으로 확장한 제품형 구현체로 볼 수 있다.
- [[agents/ai-boost-awesome-harness-engineering]] — harness를 모델과 분리된 공학 분야로 규정한 awesome-list. Orca는 그 목록이 다루는 "컨텍스트·도구·샌드박스" 축 중 멀티 에이전트 오케스트레이션 도구에 해당한다.

## 7. 용어집 (Glossary)

- **Worktree**: 하나의 git 저장소에서 여러 작업 디렉토리를 동시에 체크아웃하는 기능(`git worktree`). Orca는 각 에이전트 실행을 별도 worktree에 격리해 충돌 없이 병렬 실행한다.
- **CLI Agent**: 터미널에서 실행되는 코딩 에이전트(Claude Code, Codex 등). Orca는 이런 에이전트를 GUI로 감싸 관리한다.
- **Design Mode**: 브라우저에서 클릭한 UI 요소의 HTML·CSS·스크린샷을 자동으로 캡처해 에이전트 프롬프트에 주입하는 Orca 기능.
