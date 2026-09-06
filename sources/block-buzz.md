---
title: "Buzz: A workspace where humans and agents build together, on a relay you own"
type: repo
year: 2026
category: agents
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

## 한 줄 요약 (One-line Summary)

Block이 공개한 self-host 워크스페이스로, 사람과 AI 에이전트가 같은 채널에 멤버로 들어간다. 메시지·반응·워크플로 단계·리뷰 승인·git 이벤트가 전부 Nostr relay 위의 서명된 이벤트 하나의 로그에 쌓이고, 작성자가 사람이든 프로세스든 형식과 감사 기록이 같다.

## 1. 자료 정보 (Document Information)

- 저장소: https://github.com/block/buzz
- 조직: Block, Inc. · 라이선스 Apache-2.0 · 주 언어 Rust
- 생성 2026년 3월 6일 · 최종 push 2026년 8월 29일 · star 31,325 · fork 3,999 (수집 시점)
- 원본: `raw/repos/block-buzz.md` (README 전문)
- README가 가리키는 부속 문서 VISION.md · VISION_SOVEREIGN.md · VISION_PROJECTS.md · VISION_AGENT.md · ARCHITECTURE.md · TESTING.md는 이번 수집 범위 밖이다

## 2. 주요 기여 (Key Contributions)

에이전트를 봇이 아니라 멤버로 다룬다는 설계가 이 저장소의 중심 주장이다. 에이전트는 자기 키페어와 자기 채널 멤버십, 자기 audit trail을 갖고, 권한은 permission flag가 아니라 identity 단위로 잘린다 — 사람 동료의 권한을 자르는 방식과 같다. README는 이를 "agents are members, not bots"로, 반대편을 "haunted cron jobs"로 부른다.

두 번째는 하나의 이벤트 로그다. 대화, 패치, CI 결과, 리뷰 승인, 워크플로 실행이 모두 같은 종류의 signed event라서 한 번의 검색으로 함께 걸린다. 팀이 지금 채팅·포지·봇·CI 대시보드·릴리스 도구·검색 인덱스와 그 사이를 잇는 glue 코드로 흉내 내는 일을 substrate 하나로 하겠다는 것이 README가 밝힌 내기다.

세 번째는 에이전트가 방 안에서 말만 하는 게 아니라 워크스페이스를 운영한다는 점이다. 저장소를 열고 패치를 보내고 코드를 리뷰하고 워크플로를 돌리고 canvas를 편집하고 다른 에이전트를 오케스트레이션하고 음성 huddle에 들어오고 채널을 만들어 필요한 사람을 부르는 것까지, 사람 멤버가 쓰는 표면을 그대로 쓴다.

기술 축에서는 Nostr 프로토콜을 그대로 얹은 self-host relay라는 선택이 핵심이다. NIP-01 이벤트·필터, NIP-42 인증, NIP-34 git 이벤트를 쓰고, 에이전트용 인터페이스로 JSON in / JSON out CLI(`buzz-cli`)와 ACP harness(`buzz-acp`)를 함께 낸다. harness는 모델을 감싸 도구·검증·상태를 제공하는 실행 환경을 뜻하는데, 여기서는 Goose·Codex·Claude Code를 relay에 붙이는 어댑터 층이다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

클라이언트는 셋이다. Tauri + React 데스크톱 앱, `buzz-acp`를 거쳐 들어오는 AI 에이전트, 그리고 `buzz-cli`와 스크립트. 셋 다 WebSocket과 REST로 `buzz-relay` 하나를 바라보고, relay 뒤에 Postgres(이벤트 저장 + 전문 검색), Redis(pub/sub·presence·typing), S3/MinIO(Blossom 미디어)가 붙는다. 진실의 원천은 relay 한 곳이다.

워크스페이스 경계는 community라는 단위로 잡는다. 사용자가 URL로 도달하는 워크스페이스가 community이고, 지금 배포되는 단일 relay 구성에서는 relay URL 하나가 community 하나를 고른다. 호스팅 사업자가 여러 도메인·서브도메인으로 여러 community를 서빙하더라도 클라이언트 쪽 규칙은 그대로여서, URL이 워크스페이스를 결정하고 그 URL 아래에서 관측 가능한 상태는 전부 community-local이다. 멀티 커뮤니티 모드에서는 테넌트가 볼 수 있는 행, 캐시 키, 검색 문서, 워크플로 상태, 미디어 메타데이터, git 저장소 포인터, audit 체인을 host에서 유도한 community로 scope한다. Postgres·Redis·오브젝트 스토리지를 공유하는 것은 구현 세부일 뿐 사용자에게 보이는 전역 워크스페이스가 아니라는 게 README의 표현이다.

Rust 워크스페이스는 역할별 crate로 쪼개져 있다.

| 묶음 | crate |
|---|---|
| 코어 프로토콜 | `buzz-core` (I/O 없는 타입, NIP-01 필터, Schnorr 검증) · `buzz-relay` (Axum WS + REST) |
| 서비스 | `buzz-db` · `buzz-auth` (NIP-42/98 Schnorr 인증, rate limiting) · `buzz-pubsub` · `buzz-search` (Postgres FTS) · `buzz-audit` (hash-chain 로그) |
| 에이전트 표면 | `buzz-cli` · `buzz-acp` · `buzz-agent` · `buzz-dev-mcp` (shell·파일 편집 도구) · `buzz-workflow` (YAML 자동화) · `buzz-persona` |
| git·페어링 | `git-sign-nostr` · `git-credential-nostr` · `buzz-pair-relay` · `buzz-pairing-cli` |
| 공용·툴링 | `buzz-sdk` (타입 이벤트 빌더) · `buzz-media` · `buzz-admin` · `buzz-test-client` |

워크플로는 YAML로 쓰고 메시지·반응·스케줄·webhook 네 가지가 트리거가 된다. README의 예시 시나리오에서는 태그가 붙으면 워크플로가 뜨고, 에이전트가 프로젝트 채널의 병합된 PR을 읽어 릴리스 노트를 초안 잡아 올리고, 사람이 👍 반응을 남기면 배포가 나간다. 반응 하나가 승인 신호로 쓰이고 그 단계 전부가 서명돼 검색된다.

개발 환경은 Hermit으로 툴체인을 고정하거나 Rust 1.88+ · Node 24+ · pnpm 10+ · `just`를 직접 갖춘다. `just setup && just build` 뒤 `just dev`면 relay와 데스크톱 앱이 함께 뜨고 relay는 `ws://localhost:3000`에 붙는다. 에이전트를 붙일 때는 `BUZZ_PRIVATE_KEY`를 주고 `buzz-cli`를 쓴다. 단일 노드나 VPS relay는 루트 `docker-compose.yml`이 아니라 `deploy/compose/`의 프로덕션 번들(Postgres·Redis·MinIO에 Caddy/TLS 선택)을 쓰라고 못박는다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

저장소 자체에 성능 수치는 없다. 대신 README가 기능을 성숙도 3단으로 갈라 놓은 표가 사실상의 상태 보고다.

| 상태 | 항목 |
|---|---|
| 동작함 | relay · 채널 · 스레드 · DM · canvas · 미디어 · 검색 · audit log / 데스크톱 앱(Tauri + React) / `buzz-cli` + ACP harness(Goose·Codex·Claude Code) / YAML 워크플로 / NIP-34 git 이벤트 / git 호스팅 백엔드 |
| 연결 중 | 모바일 클라이언트(Flutter iOS·Android) / 워크플로 승인 게이트(인프라는 있고 접착 코드가 남음) / huddle 생명주기 이벤트 |
| 의견만 있고 코드는 없음 | relay 간 web-of-trust 평판 / push 알림 / culture 기능 |

배포 경로는 넷으로 갈린다. 앱만 써 보려는 사람은 릴리스 바이너리(macOS Apple Silicon·Intel dmg, Linux AppImage·deb, Windows 미서명 exe)를 받고, 서버 관리 없이 팀 relay를 원하면 Railway 원클릭 배포를 쓴다. 직접 빌드하는 경로가 self-host 개발 경로이고, Block 직원에게는 OSS 릴리스 대신 사내 relay와 에이전트 프로바이더에 미리 연결된 내부 빌드(`squareup/buzz-releases`)를 쓰라고 안내한다.

윈도우에서는 에이전트의 shell 도구가 bash 위에서 돌기 때문에 Git for Windows가 따라오는 Git Bash를 요구한다. 다른 bash 호환 셸을 쓰려면 `BUZZ_SHELL`로 경로를 주면 되고, 그러면 에이전트의 도구 설명이 활성 셸에 맞춰 자동으로 바뀐다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

README가 스스로 "끝나지 않았다"고 적고, 무엇이 되고 무엇이 안 되는지 말하겠다고 덧붙인다. 위 표의 세 번째 열을 두고는 컴플라이언스 계획을 아직 여기에 걸지 말라는 주석까지 달아 놨다.

구체적으로 걸리는 지점은 몇 가지다. 워크플로 승인 게이트는 인프라만 있고 접착 코드가 미완이라 사람이 끼어드는 통제점이 아직 완성되지 않았다. 윈도우 빌드는 코드 서명이 없어 SmartScreen 경고를 사용자가 직접 넘겨야 한다. 모바일은 아직 붙는 중이고 push 알림은 계획 단계다.

평가 축의 공백도 크다. 자체 벤치마크나 사용 규모 수치가 없어서 "일곱 개 탭이 하던 일을 substrate 하나로"라는 주장은 설계 서술 수준에 머문다. 멀티 커뮤니티 격리도 어느 상태를 community로 scope하는지는 문서로 규정하지만 검증 결과는 README에 없다.

OSS 배포판과 사내 배포판이 갈려 있는 점도 읽을 때 감안해야 한다. Block 내부는 사내 relay·에이전트 프로바이더에 미리 물린 빌드를 쓰므로, 실전에서 검증된 구성과 외부에서 세울 수 있는 구성이 같지 않을 수 있다.

마지막으로 이번 수집은 README 한 장이다. 시스템 설계와 kind 범위, 서브시스템 경계는 ARCHITECTURE.md에, 장기 방향은 VISION 4종에 있는데 둘 다 아직 `raw/`에 없다.

## 6. 관련 연구 (Related Work)

ACP harness가 Goose·Codex·Claude Code를 relay에 붙이고 `buzz-dev-mcp`가 shell·파일 편집 도구를 MCP로 낸다는 점에서, wiki의 harness engineering·agent skills 계열 자료와 같은 층을 다룬다. 다만 그쪽 자료들이 에이전트 한 대를 감싸는 실행 환경을 다루는 데 비해 Buzz는 여러 에이전트와 사람이 공유하는 협업 substrate 쪽으로 한 칸 올라가 있다.

멀티에이전트 오케스트레이션을 다루는 자료들과도 겹치는데, Buzz는 오케스트레이션을 프레임워크 API가 아니라 채널 멤버십과 이벤트 로그로 구현한다는 점이 다르다. 에이전트 memory를 다루는 자료들과 견주면, Buzz의 프로젝트 기억은 별도 memory 계층이 아니라 검색 가능한 이벤트 로그 자체다.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| Nostr | 서명된 이벤트를 relay가 중계하는 분산 프로토콜. Buzz는 이 위에 워크스페이스를 얹었다 |
| relay | Nostr에서 이벤트를 받아 저장·중계하는 서버. Buzz에서는 `buzz-relay`가 유일한 진실의 원천이다 |
| NIP-01 / NIP-42 / NIP-98 / NIP-34 | Nostr 표준 문서 번호. 각각 기본 이벤트·필터, 인증, HTTP 인증, git 패치·저장소 이벤트를 규정한다 |
| community | URL로 도달하는 워크스페이스 단위. 단일 relay 구성에서는 relay URL 하나가 community 하나다 |
| Blossom | Nostr 계열의 미디어 저장 규약. Buzz는 S3/MinIO 위에 이 방식으로 미디어를 둔다 |
| ACP | 에이전트를 외부 도구·환경에 연결하는 프로토콜. `buzz-acp`가 ACP와 MCP 사이를 잇는다 |
| Schnorr 서명 | Nostr 이벤트 서명에 쓰이는 방식. `buzz-core`가 검증을 담당한다 |
| hash-chain audit log | 각 기록이 이전 기록의 해시를 물고 이어지는 감사 로그. 사후 변조가 드러난다 |
| huddle | 채널 안에서 바로 여는 음성 대화. 에이전트도 참여 대상이다 |
| canvas | 채널에 붙는 공동 편집 문서 면. 에이전트가 사람과 같은 방식으로 편집한다 |
| Hermit | Cash App이 만든 툴체인 고정 도구. Buzz는 `bin/activate-hermit`으로 개발 도구 버전을 묶는다 |
| Tauri | Rust 백엔드에 웹 프런트엔드를 얹어 데스크톱 앱을 만드는 프레임워크 |

## 8. 그림 후보 (Figure Candidates)

repo 자료라 이미지를 자동 수집하지 않았다. 아래는 README에 임베드된 스크린샷 넷이고, `raw` 필드에 GitHub 원본 URL을 적어 두었다. 필요한 것만 사용자가 `wiki/assets/block-buzz/`에 받아 두면 된다.

| id | 파일 | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | channel-thread.png | "사람과 에이전트가 릴리스 계획을 주고받는 채널 스레드" | manual | ★ wiki 권장 (제품 전경) |
| fig02 | channel-agents.png | "에이전트가 사람과 나란히 채널 멤버로 올라온 화면" | manual | ★ wiki 권장 (핵심 주장) |
| fig03 | create-channel.png | "채널 추가 다이얼로그" | manual | (확인 필요 — 일반적 UI) |
| fig04 | media-comments.png | "영상 프레임에 고정된 댓글" | manual | (확인 필요 — 부가 기능) |

README의 아키텍처 도해는 이미지가 아니라 ASCII 블록이라 위 목록에 넣지 않았다. wiki 본문에는 코드 블록으로 그대로 옮기는 편이 낫다.
