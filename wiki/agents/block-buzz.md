---
title: "Buzz — A workspace where humans and agents build together, on a relay you own"
type: repo
year: 2026
category: agents
source: block-buzz.md
raw_path: raw/repos/block-buzz.md
raw_filename: "block-buzz.md"
source_collection: external
org: "block"
repo: "buzz"
url: "https://github.com/block/buzz"
license: "Apache-2.0"
fetched_at: "2026-08-29T14:16:48+0900"
tags: [nostr, relay, self-hosted, multi-agent, acp, mcp, agent-identity, audit-log, workflow, git-events, rust, tauri, block, buzz-cli, event-sourcing]
figures:
  - id: fig01
    label: channel-thread
    kind: figure
    file: assets/block-buzz/fig01.png
    raw: https://raw.githubusercontent.com/block/buzz/main/docs/assets/screenshots/channel-thread.png
    caption: "릴리스 계획을 놓고 사람과 에이전트가 같은 채널 스레드에서 주고받는 화면 (README 히어로 이미지)"
    strategy: manual
    curated: true
  - id: fig02
    label: channel-agents
    kind: figure
    file: assets/block-buzz/fig02.png
    raw: https://raw.githubusercontent.com/block/buzz/main/docs/assets/screenshots/channel-agents.png
    caption: "엔지니어링 채널의 멤버 목록에 에이전트가 사람과 나란히 올라와 있는 화면"
    strategy: manual
    curated: true
  - id: fig03
    label: create-channel
    kind: figure
    file: assets/block-buzz/fig03.png
    raw: https://raw.githubusercontent.com/block/buzz/main/docs/assets/screenshots/create-channel.png
    caption: "채널 추가 다이얼로그 — 검색·필터와 참여/생성 목록"
    strategy: manual
    curated: false
  - id: fig04
    label: media-comments
    kind: figure
    file: assets/block-buzz/fig04.png
    raw: https://raw.githubusercontent.com/block/buzz/main/docs/assets/screenshots/media-comments.png
    caption: "재생 중인 영상의 특정 프레임에 댓글을 고정한 미디어 화면"
    strategy: manual
    curated: false
---

## 요약 (Summary)

Buzz는 Block이 Apache-2.0으로 공개한 self-host 워크스페이스다. 사람과 AI 에이전트가 같은 채널에 들어가고, 메시지·반응·워크플로 단계·리뷰 승인·git 이벤트가 전부 Nostr relay 위의 서명된 이벤트 하나의 로그에 쌓인다. 작성자가 사람이든 프로세스든 이벤트의 형식도, identity 모델도, 감사 기록도 같다.

겉보기는 팀 채팅 도구인데 속은 이벤트 로그다. README의 표현을 빌리면 "취향이 있는 이벤트 로그와 의심스러울 만큼 많은 Rust crate"다.

![[assets/block-buzz/fig01.png]]
*채널 스레드에서 사람과 에이전트가 릴리스 계획을 함께 다듬는 화면 (block/buzz README)*

## 주요 기여 (Key Contributions)

에이전트를 봇이 아니라 멤버로 다룬다는 설계가 중심 주장이다. 에이전트는 자기 키페어와 자기 채널 멤버십, 자기 audit trail을 갖고, 권한은 permission flag가 아니라 identity 단위로 잘린다 — 사람 동료의 권한을 자르는 방식과 같다. 그래서 채널에 에이전트를 추가하는 절차가 사람을 초대하는 절차와 같은 모양이다.

![[assets/block-buzz/fig02.png]]
*엔지니어링 채널 멤버로 올라온 에이전트. 봇 연동이 아니라 멤버십이다 (block/buzz README)*

두 번째는 이벤트 로그 하나로 합친 점이다. 대화, 패치, CI 결과, 리뷰 승인, 워크플로 실행이 모두 같은 종류의 signed event라서 한 번의 검색으로 함께 걸린다. 팀이 지금 채팅·포지·봇·CI 대시보드·릴리스 도구·검색 인덱스와 그 사이의 glue 코드로 흉내 내는 일을 substrate 하나로 하겠다는 것이 README가 밝힌 내기다.

세 번째는 에이전트의 행동 범위다. 저장소를 열고 패치를 보내고 코드를 리뷰하고 워크플로를 돌리고 canvas를 편집하고 다른 에이전트를 오케스트레이션하고 음성 huddle에 들어오고 채널을 만들어 필요한 사람을 부르는 일까지, 사람 멤버가 쓰는 표면을 그대로 쓴다. 에이전트용 진입로는 JSON in / JSON out CLI(`buzz-cli`)와 ACP harness(`buzz-acp`)다. harness는 모델을 감싸 도구·검증·상태를 제공하는 실행 환경을 뜻하는데, 여기서는 Goose·Codex·Claude Code를 relay에 붙이는 어댑터 층이다.

## 방법론 및 아키텍처 (Methodology and Architecture)

클라이언트 셋이 relay 하나를 바라본다. Tauri + React 데스크톱 앱, `buzz-acp`를 거쳐 들어오는 AI 에이전트, 그리고 CLI와 스크립트다. relay 뒤에는 Postgres(이벤트 저장 + 전문 검색), Redis(pub/sub·presence·typing), S3/MinIO(Blossom 미디어)가 붙고 진실의 원천은 relay 한 곳이다.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                             Clients                                     │
│  Human client         AI agent              CLI / scripts               │
│  (Buzz desktop)       (Goose, Codex, ...)   (buzz-cli, agents)          │
│       │               ┌──────────────┐               │                  │
│       │               │  buzz-acp    │               │                  │
│       │               │  (ACP ↔ MCP) │               │                  │
│       │               └──────┬───────┘               │                  │
└───────┼──────────────────────┼───────────────────────┼──────────────────┘
        │ WebSocket            │ WS + REST             │ WS + REST
        ▼                      ▼                       ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                          buzz-relay                                     │
│  NIP-01 · NIP-42 auth · channel/DM/media/workflow/git REST · audit log  │
└───┬──────────────────────────┬──────────────────────────┬───────────────┘
    │                          │                          │
 ┌──▼───────────┐       ┌──────▼──────┐           ┌───────▼─────┐
 │   Postgres   │       │    Redis    │           │   S3/MinIO  │
 │ (events +    │       │  (pub/sub)  │           │  (Blossom)  │
 │  FTS search) │       └─────────────┘           └─────────────┘
 └──────────────┘
```
*README의 아키텍처 도해 (ASCII 원문 그대로)*

워크스페이스 경계는 community다. 사용자가 URL로 도달하는 워크스페이스가 community이고, 지금 배포되는 단일 relay 구성에서는 relay URL 하나가 community 하나를 고른다. 호스팅 사업자가 여러 도메인으로 여러 community를 서빙해도 클라이언트 쪽 규칙은 그대로여서, URL이 워크스페이스를 결정하고 그 URL 아래에서 관측 가능한 상태는 전부 community-local이다. 멀티 커뮤니티 모드는 테넌트가 볼 수 있는 행, 캐시 키, 검색 문서, 워크플로 상태, 미디어 메타데이터, git 저장소 포인터, audit 체인을 host에서 유도한 community로 scope한다. Postgres·Redis·오브젝트 스토리지를 공유하는 것은 구현 세부일 뿐 사용자에게 보이는 전역 워크스페이스가 아니라는 게 README의 못박음이다.

Rust 워크스페이스는 역할별 crate로 쪼개져 있다.

| 묶음 | crate |
|---|---|
| 코어 프로토콜 | `buzz-core` (I/O 없는 타입, NIP-01 필터, Schnorr 검증) · `buzz-relay` (Axum WS + REST) |
| 서비스 | `buzz-db` · `buzz-auth` (NIP-42/98 Schnorr 인증, rate limiting) · `buzz-pubsub` · `buzz-search` (Postgres FTS) · `buzz-audit` (hash-chain 로그) |
| 에이전트 표면 | `buzz-cli` · `buzz-acp` · `buzz-agent` · `buzz-dev-mcp` (shell·파일 편집 도구) · `buzz-workflow` (YAML 자동화) · `buzz-persona` |
| git·페어링 | `git-sign-nostr` · `git-credential-nostr` · `buzz-pair-relay` · `buzz-pairing-cli` |
| 공용·툴링 | `buzz-sdk` (타입 이벤트 빌더) · `buzz-media` · `buzz-admin` · `buzz-test-client` |

워크플로는 YAML로 쓰고 메시지·반응·스케줄·webhook이 트리거가 된다. README가 든 예를 보면 태그가 붙으면 워크플로가 뜨고, 에이전트가 프로젝트 채널의 병합된 PR을 읽어 릴리스 노트 초안을 올리고, 사람이 👍 반응을 남기면 배포가 나간다. 반응 하나가 승인 신호로 쓰이고 그 단계 전부가 서명돼 검색된다. 브랜치를 열면 채널이 생기고 패치는 NIP-34 이벤트로 들어오며 CI 결과와 병합 결정이 같은 방에 남는다는 시나리오도 같은 원리다.

개발 환경은 Hermit으로 툴체인을 고정하거나 Rust 1.88+ · Node 24+ · pnpm 10+ · `just`를 직접 갖춘다. `just setup && just build` 뒤 `just dev`면 relay와 데스크톱 앱이 함께 뜨고 relay는 `ws://localhost:3000`에 붙는다. 에이전트를 붙일 때는 `BUZZ_PRIVATE_KEY`를 주고 `buzz-cli`를 쓴다. 단일 노드나 VPS relay는 루트 `docker-compose.yml`이 아니라 `deploy/compose/`의 프로덕션 번들을 쓰라고 안내한다.

## 결과 (Results)

저장소에 성능 수치는 없다. 대신 README가 기능을 성숙도 3단으로 갈라 놓은 표가 사실상의 상태 보고다.

| 상태 | 항목 |
|---|---|
| 동작함 | relay · 채널 · 스레드 · DM · canvas · 미디어 · 검색 · audit log / 데스크톱 앱(Tauri + React) / `buzz-cli` + ACP harness(Goose·Codex·Claude Code) / YAML 워크플로 / NIP-34 git 이벤트 / git 호스팅 백엔드 |
| 연결 중 | 모바일 클라이언트(Flutter iOS·Android) / 워크플로 승인 게이트 / huddle 생명주기 이벤트 |
| 의견만 있고 코드는 없음 | relay 간 web-of-trust 평판 / push 알림 / culture 기능 |

배포 경로는 넷으로 갈린다. 앱만 써 보려면 릴리스 바이너리(macOS Apple Silicon·Intel dmg, Linux AppImage·deb, Windows 미서명 exe)를 받고, 서버 관리 없이 팀 relay를 원하면 Railway 원클릭 배포를 쓴다. 소스 빌드가 self-host 개발 경로이고, Block 직원에게는 OSS 릴리스 대신 사내 relay와 에이전트 프로바이더에 미리 연결된 내부 빌드(`squareup/buzz-releases`)를 쓰라고 안내한다. 윈도우에서는 에이전트의 shell 도구가 bash 위에서 돌기 때문에 Git for Windows가 필요하고, 다른 셸을 쓰려면 `BUZZ_SHELL`로 경로를 준다.

## 한계 (Limitations)

README가 스스로 "끝나지 않았다"고 적는다. 세 번째 열을 두고는 컴플라이언스 계획을 아직 여기에 걸지 말라는 주석까지 달아 놨다.

워크플로 승인 게이트는 인프라만 있고 접착 코드가 미완이라 사람이 끼어드는 통제점이 아직 완성되지 않았다. 윈도우 빌드는 코드 서명이 없어 SmartScreen 경고를 사용자가 넘겨야 한다. 모바일은 붙는 중이고 push 알림은 계획 단계다.

평가 축의 공백도 크다. 자체 벤치마크나 사용 규모 수치가 없어 "일곱 개 탭이 하던 일을 substrate 하나로"라는 주장은 설계 서술 수준에 머문다. 멀티 커뮤니티 격리도 어느 상태를 community로 scope하는지는 규정하지만 검증 결과는 README에 없다. Block 내부가 사내 빌드를 쓴다는 안내를 감안하면, 실전에서 검증된 구성과 외부에서 세울 수 있는 구성이 같지 않을 수 있다.

이 페이지의 근거는 README 한 장이다. 시스템 설계와 kind 범위, 서브시스템 경계는 ARCHITECTURE.md에, 장기 방향은 VISION 4종에 있는데 둘 다 아직 `raw/`에 없다.

## 관련 페이지 (Related Pages)

- [[agents/ai-boost-awesome-harness-engineering]] — harness를 모델과 분리된 공학 분야로 규정한 큐레이션. Buzz의 `buzz-acp`·`buzz-cli`가 그 harness 층에 해당한다
- [[agents/rodrigues-2026-mcp-server-architecture-patterns]] — MCP 서버 설계 패턴. `buzz-dev-mcp`가 shell·파일 편집 도구를 MCP로 내는 자리와 겹친다
- [[agents/cemri-2025-why-do-multi-agent-llm-systems]] — 멀티에이전트 시스템의 실패 유형 분석. Buzz는 프레임워크 API 대신 채널 멤버십과 이벤트 로그로 협업을 구성한다는 점에서 다른 해법이다
- [[agents/zhou-2026-are-we-ready-for-an]] — 에이전트 memory 시스템 서베이. Buzz의 프로젝트 기억은 별도 memory 계층이 아니라 검색 가능한 이벤트 로그 자체다
- [[agents/lee-2026-the-agent-loop-a-survey]] — agent loop 서베이. harness·스킬·평가 기둥이 Buzz의 에이전트 표면과 대응된다
