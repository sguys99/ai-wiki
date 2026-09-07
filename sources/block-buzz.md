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
    caption: "채널 추가 다이얼로그에서 검색과 필터로 참여하거나 만들 채널을 고르는 화면"
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

Block이 공개한 self-host 워크스페이스로, 사람과 AI 에이전트가 같은 채널에 멤버로 들어간다. 메시지, 반응, 워크플로 단계, 리뷰 승인, git 이벤트가 전부 Nostr relay 위의 서명된 이벤트 하나의 로그에 쌓이고, 작성자가 사람이든 프로세스든 이벤트의 형식과 identity 모델과 감사 기록이 같다.

## 1. 자료 정보 (Document Information)

- 저장소: https://github.com/block/buzz
- 조직: Block, Inc. / 라이선스 Apache-2.0 / 주 언어 Rust
- 원본: `raw/repos/block-buzz.md` (README 전문, 약 1만 5천자)
- 수집 시점: 2026-08-29 (frontmatter `fetched_at`). README 본문에는 star 수, fork 수, 커밋 이력 같은 저장소 통계가 실려 있지 않다

README가 가리키는 부속 문서는 여덟 종이고, 이번 수집 범위 밖이다. 문서 성격은 README의 링크 문구가 밝힌 그대로다.

| 문서 | 다루는 내용 |
|---|---|
| `VISION.md`, `VISION_SOVEREIGN.md`, `VISION_PROJECTS.md`, `VISION_AGENT.md` | 네 종의 vision 문서. README는 성숙도 표의 미구현 열을 두고 "이 문서들이 그 긴 버전"이라고 안내한다 |
| `ARCHITECTURE.md` | 시스템 설계, Nostr kind 범위, 서브시스템 경계 |
| `TESTING.md` | 멀티에이전트 E2E 테스트 스위트 |
| `RELEASING.md` | 릴리스 절차 |
| `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`, `GOVERNANCE.md` | 기여, 행동 규범, 보안, 거버넌스 정책 |

## 2. 주요 기여 (Key Contributions)

에이전트를 봇이 아니라 멤버로 다룬다는 설계가 이 저장소의 중심 주장이다. 에이전트는 자기 키페어와 자기 채널 멤버십, 자기 audit trail을 갖고, 권한은 permission flag가 아니라 identity 단위로 잘린다. 사람 동료의 권한을 잘라 주는 방식과 같은 절차다. README는 이를 "agents are members, not bots"로, 반대편을 "haunted cron jobs"로 부른다.

두 번째는 하나의 이벤트 로그다. 대화, 패치, CI 결과, 리뷰 승인, 워크플로 실행이 모두 같은 종류의 signed event라서 한 번의 검색으로 함께 걸린다. 팀이 지금 채팅, 포지, 봇, CI 대시보드, 릴리스 도구, 검색 인덱스와 그 사이를 잇는 glue 코드로 흉내 내는 일을 substrate 하나로 하겠다는 것이 README가 밝힌 내기다. README의 표현으로는 "서로를 아는 척하는 일곱 개 탭 대신 substrate 하나"다.

세 번째는 에이전트가 방 안에서 말만 하는 게 아니라 워크스페이스를 운영한다는 점이다. 저장소를 열고 패치를 보내고 코드를 리뷰하고 워크플로를 실행하고 canvas를 편집하고 다른 에이전트를 오케스트레이션하고 음성 huddle에 들어오고 채널을 만들어 필요한 사람을 부르는 것까지, 사람 멤버가 쓰는 표면을 그대로 쓴다. README는 이를 "사람 동료와 같은 affordance, 같은 audit trail, 다른 키페어"로 정리한다.

기술 측면에서는 Nostr 프로토콜을 그대로 채택한 self-host relay라는 선택이 핵심이다. NIP-01 이벤트와 필터, NIP-42/98 인증, NIP-34 git 이벤트를 쓰고, 에이전트용 인터페이스로 JSON in / JSON out CLI(`buzz-cli`)와 ACP harness(`buzz-acp`)를 함께 낸다. harness는 모델을 감싸 도구와 검증과 상태를 제공하는 실행 환경을 뜻하는데, 여기서는 Goose, Codex, Claude Code를 relay에 붙이는 어댑터 층이다.

README가 "Buzz에서 하는 일"로 든 다섯 항목이 위 주장을 사용자 관점으로 번역한 목록이다.

| 사용 방식 | README가 든 설명 |
|---|---|
| 근거가 붙은 답을 프로젝트에 묻는다 | 에이전트가 6개월치 이력을 검색해 인상이 아니라 스레드를 직접 올린다 |
| 저장소 전권을 주지 않고 버그 triage를 맡긴다 | 에이전트가 자기 키와 자기 채널 멤버십과 자기 audit trail을 갖고, permission flag가 아니라 identity로 범위가 잘린다 |
| feature 브랜치를 방으로 바꾼다 | 패치, CI, 리뷰, 병합 결정이 한 채널에 모여 채널이 코드의 존재 이유를 담은 기록이 된다 |
| 대화와 패치와 워크플로 실행과 승인을 한곳에서 검색한다 | 넷이 모두 같은 종류의 이벤트여서 가능하다 |
| 에이전트가 방에서 말만 하지 않고 워크스페이스를 운영한다 | 채널, canvas, 워크플로, huddle에서 사람과 같은 표면을 쓴다 |

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

클라이언트는 셋이다. Tauri + React 데스크톱 앱, `buzz-acp`를 거쳐 들어오는 AI 에이전트(Goose, Codex 등), 그리고 `buzz-cli`와 스크립트다. 데스크톱 앱은 WebSocket으로, 나머지 둘은 WebSocket과 REST로 `buzz-relay` 하나를 바라본다. relay는 NIP-01 처리, NIP-42 인증, 채널과 DM과 미디어와 워크플로와 git용 REST, audit log를 담당한다.

relay 뒤에는 저장 계층 셋이 붙고, 진실의 원천은 relay 한 곳이다.

| 계층 | 담당 |
|---|---|
| Postgres | 이벤트 저장과 전문 검색(FTS) |
| Redis | pub/sub, presence, typing 표시 |
| S3 / MinIO | Blossom 규약에 따른 미디어 저장 |

### community 경계

워크스페이스 경계는 community라는 단위로 잡는다. 사용자가 URL로 도달하는 워크스페이스가 community이고, URL이 워크스페이스를 결정한다는 규칙은 배포 형태와 무관하게 유지된다.

| 배포 형태 | community 대응 |
|---|---|
| 기본 self-host (지금 배포되는 단일 relay 구성) | relay URL 하나가 community 하나를 고른다 |
| 호스팅 멀티테넌트 | 사업자가 여러 도메인이나 서브도메인 뒤로 여러 community를 서빙하지만, 클라이언트 쪽 규칙은 그대로다. 백엔드가 Postgres와 Redis와 오브젝트 스토리지를 공유해도 community의 의미론적 경계는 유지된다 |

멀티 커뮤니티 모드에서 community 단위로 scope되는 상태는 일곱 종이다. host에서 유도한 community가 scope 기준이 된다.

| scope 대상 | 성격 |
|---|---|
| 테넌트가 볼 수 있는 행 | 데이터베이스 레코드 |
| 캐시 키 | Redis 키 공간 |
| 검색 문서 | Postgres FTS 인덱스 |
| 워크플로 상태 | 실행 중인 자동화의 상태 |
| 미디어 메타데이터 | Blossom 저장소의 메타 |
| git 저장소 포인터 | NIP-34 저장소 참조 |
| audit 체인 | hash-chain 감사 로그 |

Postgres와 Redis와 오브젝트 스토리지를 공유하는 것은 구현 세부일 뿐 사용자에게 보이는 전역 워크스페이스가 아니라는 게 README의 서술이다.

### crate 구성

Rust 워크스페이스는 21개 crate를 여섯 묶음으로 나눈다. README의 crate map 절이 정리한 구분과 설명 그대로다.

| 묶음 | crate |
|---|---|
| 코어 프로토콜 (2개) | `buzz-core` (I/O 없는 타입, NIP-01 필터, Schnorr 검증), `buzz-relay` (Axum 기반 WebSocket + REST) |
| 서비스 (5개) | `buzz-db` (Postgres), `buzz-auth` (NIP-42/98 Schnorr 인증, rate limiting), `buzz-pubsub` (Redis, presence, typing), `buzz-search` (Postgres FTS), `buzz-audit` (hash-chain 로그) |
| 에이전트 표면 (6개) | `buzz-cli` (에이전트 우선 CLI, JSON in / JSON out), `buzz-acp` (Goose/Codex/Claude Code용 ACP harness), `buzz-agent` (ACP 에이전트), `buzz-dev-mcp` (shell과 파일 편집 도구), `buzz-workflow` (YAML 자동화), `buzz-persona` (에이전트 persona 팩) |
| git과 페어링 (4개) | `git-sign-nostr`, `git-credential-nostr` (nostr 서명 git), `buzz-pair-relay`, `buzz-pairing-cli` (relay 페어링) |
| 공용 (2개) | `buzz-sdk` (타입 이벤트 빌더), `buzz-media` (Blossom/S3) |
| 툴링 (2개) | `buzz-admin` (관리자 CLI), `buzz-test-client` (E2E) |

### 워크플로와 시나리오

워크플로는 YAML로 쓰고 트리거는 네 가지다.

| 트리거 | 발동 조건 |
|---|---|
| message | 채널에 메시지가 올라올 때 |
| reaction | 메시지에 반응이 붙을 때 |
| schedule | 정해진 일정에 |
| webhook | 외부 HTTP 호출로 |

README는 이 구조가 어떻게 쓰이는지를 세 가지 시나리오로 보여 준다.

| 시나리오 | 흐름 |
|---|---|
| 사고 이력 조회 | 새벽 2시에 "이 오류를 전에 본 적 있나"라고 묻는다. 채널을 지켜보던 에이전트가 6개월치 이력에서 스레드와 근본 원인과 수정 내역을 올리고, 마지막으로 배포한 사람을 호출할지 제안한다. 질문과 답과 근거가 모두 채널에 남는다 |
| 브랜치가 방이 된다 | feature 브랜치를 열면 채널이 생긴다. 패치는 NIP-34 이벤트로 들어오고 CI가 결과를 올리고 에이전트가 1차 리뷰를 하고 동료들이 관심 있는 부분에 반응을 남긴다. 병합 결정이 근거와 같은 방에 남는다 |
| 릴리스가 스스로 작성된다 | 태그가 붙으면 워크플로가 발동한다. 에이전트가 프로젝트 채널의 병합된 PR을 읽어 릴리스 노트를 초안 잡아 올리고, 사람 리뷰를 받아 👍 반응이 달리면 배포가 나간다. 모든 단계가 서명되고 검색된다 |

세 번째 시나리오에서 반응 하나가 승인 신호로 쓰인다는 점이 identity 단위 설계의 실제 용례다.

### 개발 환경과 명령

빌드에는 Docker와 Hermit이 필요하고, Hermit 대신 툴체인을 직접 갖출 수도 있다. Hermit은 Cash App이 만든 툴체인 고정 도구로, `. ./bin/activate-hermit`을 실행하면 필요한 도구가 첫 사용 시점에 자동으로 내려온다.

| 요구 사항 | 비고 |
|---|---|
| Docker | 필수 |
| Hermit | 권장 경로. 툴체인 버전을 고정한다 |
| Rust 1.88+, Node 24+, pnpm 10+, `just` | Hermit을 쓰지 않을 때 직접 갖춘다 |

최초 준비는 `just setup && just build`다. `just setup`은 `just bootstrap`을 자동으로 실행해 필요하면 `.env.example`을 `.env`로 복사하고, Hermit으로 도구를 내려받고, Docker 서비스와 마이그레이션을 시작한다. 이후 매일 쓰는 명령은 `just dev`이고 relay와 데스크톱 앱이 함께 뜬다. relay는 `ws://localhost:3000`에 붙는다. relay 로그와 Vite 출력을 분리하려면 한쪽 터미널에서 `just relay`, 다른 쪽에서 `just desktop-dev`를 쓴다.

| 명령 | 역할 |
|---|---|
| `just setup` | Docker, 마이그레이션, 데스크톱 의존성 준비 |
| `just relay` | relay 실행 |
| `just dev` | 데스크톱 앱 실행 |
| `just build` | Rust 워크스페이스 빌드 |
| `just check` | fmt, clippy, 데스크톱 체크 |
| `just test-unit` | 인프라 없이 도는 단위 테스트 |
| `just test` | 전체 스위트 (필요하면 서비스를 먼저 시작한다) |
| `just ci` | CI가 실행하는 전체 항목 |
| `just reset` | 데이터를 지우고 다시 만든다 |

환경 변수는 기본값만으로 로컬 개발이 되고, 필요하면 `.env`로 덮어쓴다. 전체 목록은 `.env.example`에 있다. README가 본문에서 직접 언급하는 변수는 셋이다.

| 변수 | 용도 |
|---|---|
| `BUZZ_RELAY_URL` | 앱이 붙을 relay를 바꾼다. 기본값은 `ws://localhost:3000`이고, 앱 안에서 relay를 전환할 수도 있다 |
| `BUZZ_PRIVATE_KEY` | 에이전트를 붙일 때 준다. 함께 쓰는 `buzz-cli`는 LLM tool call을 염두에 두고 JSON in / JSON out으로 설계됐다 |
| `BUZZ_SHELL` | 윈도우에서 Git Bash 대신 다른 bash 호환 셸을 쓸 때 경로를 지정한다 |

단일 노드나 VPS relay는 루트 `docker-compose.yml`이 아니라 `deploy/compose/`의 프로덕션 번들을 쓰라고 안내한다. 이 번들은 `docker compose`에 Postgres, Redis, MinIO를 묶고 Caddy와 TLS를 선택할 수 있게 한다. 루트 `docker-compose.yml`은 일상 개발 전용이라고 명시한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

저장소 자체에 성능 수치는 없다. 대신 README가 기능을 성숙도 3단으로 갈라 놓은 표가 사실상의 상태 보고다.

| 상태 | 항목 (개수) |
|---|---|
| 동작함 | relay와 채널과 스레드와 DM과 canvas와 미디어와 검색과 audit log / 데스크톱 앱(Tauri + React) / `buzz-cli`(에이전트 우선, JSON in / JSON out)와 ACP harness(Goose, Codex, Claude Code) / YAML 워크플로(message, reaction, schedule, webhook 트리거) / NIP-34 git 이벤트(패치, 저장소 공지, 상태) / git 호스팅 백엔드 (6항목) |
| 연결 중 | 모바일 클라이언트(Flutter iOS와 Android) / 워크플로 승인 게이트(인프라는 있고 접착 코드가 남음) / huddle 생명주기 이벤트 (3항목) |
| 의견만 있고 코드는 없음 | relay 간 web-of-trust 평판 / push 알림 / culture 기능 (3항목) |

세 번째 열에는 컴플라이언스 계획을 아직 여기에 걸지 말라는 주석이 붙어 있고, 대신 vision 문서를 읽으라고 안내한다.

### 배포 경로

README는 사용자 유형별로 넷을 제시한다.

| 경로 | 대상과 방법 |
|---|---|
| 앱만 써 본다 | 최신 릴리스에서 패키지 빌드를 받는다. 기본값은 `ws://localhost:3000`이므로 relay가 없으면 소스 빌드로 하나 세워야 한다 |
| 자체 호스팅 relay를 둔다 | 서버 관리 없이 팀 relay를 원하면 Railway 원클릭 배포를 쓴다. 상세는 Block 엔지니어링 블로그의 relay 운영 글에 있다 |
| Block 직원이다 | 소스 빌드도 OSS 릴리스도 쓰지 말고 내부 빌드를 쓰라고 안내한다. 사내 relay와 에이전트 프로바이더에 미리 연결돼 있어 설정할 것이 없고, `squareup/buzz-releases`의 릴리스에서 받는다 |
| 소스에서 빌드해 실행한다 | 개발자와 self-host 경로다. Quick start 절이 이 경로를 다룬다 |

릴리스 바이너리는 네 플랫폼이다.

| 플랫폼 | 파일 |
|---|---|
| macOS (Apple Silicon) | `Buzz_<version>_aarch64.dmg` |
| macOS (Intel) | `Buzz_<version>_x64.dmg` |
| Linux (x86_64) | `Buzz_<version>_amd64.AppImage` 또는 `Buzz_<version>_amd64.deb` |
| Windows (x64) | `Buzz_<version>_x64-setup_alpha-unsigned.exe` |

macOS에서 어느 파일을 받을지는 Apple 메뉴의 이 Mac에 관하여에서 확인한다. "Chip: Apple"이면 Apple Silicon, "Processor: Intel"이면 Intel이다. Windows 빌드는 코드 서명이 없어 첫 실행에서 SmartScreen이 경고를 띄운다. 추가 정보를 누른 뒤 실행을 선택해 넘긴다.

### 윈도우 요구 사항

에이전트의 shell 도구는 명령을 bash에서 실행한다. macOS와 Linux에는 이미 있지만 윈도우에는 없으므로 Git for Windows를 설치해야 한다. buzz가 런타임에 찾는 것은 이 패키지에 딸려 오는 Git Bash다. 다른 bash 호환 셸을 쓰려면 `BUZZ_SHELL`로 경로를 주면 되고, 그러면 에이전트의 도구 설명이 활성 셸에 맞춰 자동으로 바뀐다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

README가 스스로 "끝나지 않았다"고 적고, 무엇이 되고 무엇이 안 되는지 말하겠다고 덧붙인다. 성숙도 표의 세 번째 열을 두고는 컴플라이언스 계획을 아직 여기에 걸지 말라는 주석까지 달아 놨다.

구체적으로 걸리는 지점은 몇 가지다. 워크플로 승인 게이트는 인프라만 있고 접착 코드가 미완이라 사람이 개입하는 통제점이 아직 완성되지 않았다. 윈도우 빌드는 코드 서명이 없어 SmartScreen 경고를 사용자가 직접 넘겨야 하고, 파일명에 `alpha-unsigned`가 붙어 있다는 점도 성숙도를 보여 준다. 모바일은 아직 붙는 중이고 push 알림은 계획 단계다.

평가 근거의 공백도 크다. 자체 벤치마크나 사용 규모 수치가 없어서 "일곱 개 탭이 하던 일을 substrate 하나로"라는 주장은 설계 서술 수준에 머문다. 멀티 커뮤니티 격리도 어느 상태를 community로 scope하는지는 문서로 규정하지만 검증 결과는 README에 없다.

OSS 배포판과 사내 배포판이 갈려 있는 점도 읽을 때 감안해야 한다. Block 내부는 사내 relay와 에이전트 프로바이더에 미리 연결된 빌드를 쓰므로, 실전에서 검증된 구성과 외부에서 세울 수 있는 구성이 같지 않을 수 있다.

README는 오해를 미리 차단하는 절을 따로 두어 셋을 부인한다.

| 부인 항목 | README의 서술 |
|---|---|
| 블록체인이 아니다 | 서명된 이벤트는 모두에게 기념 코인을 사게 하지 않아도 유용하다 |
| AI 대체 계획이 아니다 | 사람이 루프 안에 남고 에이전트가 방 안에 남을 때 가장 잘 동작한다 |
| 완성되지 않았다 | 무엇이 되고 무엇이 안 되는지 밝히겠다고 적는다 |

같은 절이 밝히는 긍정 정의는 "사람과 에이전트와 워크플로와 git 이벤트와 프로젝트 메모리가 협력하는 relay 하나"이고, 대체하려는 탭들을 넘어 자라날 수 있는 워크스페이스의 시작이라고 표현한다.

마지막으로 이번 수집은 README 한 장이다. 시스템 설계와 kind 범위, 서브시스템 경계는 `ARCHITECTURE.md`에, 장기 방향은 vision 문서 4종에, 멀티에이전트 E2E 테스트 구성은 `TESTING.md`에 있는데 모두 아직 `raw/`에 없다.

## 6. 관련 연구 (Related Work)

harness 계열 자료와 같은 층을 다룬다. [[agents/ai-boost-awesome-harness-engineering]]은 harness를 모델과 분리된 공학 분야로 규정하는데, Buzz의 `buzz-acp`와 `buzz-cli`가 그 harness 층에 해당한다. 다만 그 큐레이션이 에이전트 한 대를 감싸는 실행 환경을 다루는 데 비해 Buzz는 여러 에이전트와 사람이 공유하는 협업 substrate 쪽으로 한 칸 올라가 있다. [[agents/rodrigues-2026-mcp-server-architecture-patterns]]가 정리한 MCP 서버 설계 패턴은 `buzz-dev-mcp`가 shell과 파일 편집 도구를 MCP로 내는 자리와 겹친다.

멀티에이전트 협업을 다루는 자료와도 겹친다. [[agents/cemri-2025-why-do-multi-agent-llm-systems]]는 멀티에이전트 시스템의 실패 유형을 분류하는데, Buzz는 오케스트레이션을 프레임워크 API가 아니라 채널 멤버십과 이벤트 로그로 구현한다는 점이 다른 해법이다. [[agents/lee-2026-the-agent-loop-a-survey]]가 정리한 agent loop의 구성 요소는 Buzz의 에이전트 표면과 대응된다.

에이전트 메모리를 다루는 자료와 견주면 저장 위치가 다르다. [[agents/zhou-2026-are-we-ready-for-an]]이 서베이한 메모리 시스템들은 별도 계층을 두는데, Buzz의 프로젝트 메모리는 검색 가능한 이벤트 로그 자체다.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| Nostr | 서명된 이벤트를 relay가 중계하는 분산 프로토콜. Buzz는 이 프로토콜 위에 워크스페이스를 구축했다 |
| relay | Nostr에서 이벤트를 받아 저장하고 중계하는 서버. Buzz에서는 `buzz-relay`가 유일한 진실의 원천이다 |
| NIP-01 / NIP-42 / NIP-98 / NIP-34 | Nostr 표준 문서 번호. 각각 기본 이벤트와 필터, 인증, HTTP 인증, git 패치와 저장소 이벤트를 규정한다 |
| community | URL로 도달하는 워크스페이스 단위. 단일 relay 구성에서는 relay URL 하나가 community 하나다 |
| Blossom | Nostr 계열의 미디어 저장 규약. Buzz는 S3 또는 MinIO 위에 이 방식으로 미디어를 둔다 |
| ACP | 에이전트를 외부 도구와 환경에 연결하는 프로토콜. `buzz-acp`가 ACP와 MCP 사이를 잇는다 |
| Schnorr 서명 | Nostr 이벤트 서명에 쓰이는 방식. `buzz-core`가 검증을 담당한다 |
| hash-chain audit log | 각 기록이 이전 기록의 해시를 물고 이어지는 감사 로그. 사후 변조가 드러난다 |
| huddle | 채널 안에서 바로 여는 음성 대화. 에이전트도 참여 대상이다 |
| canvas | 채널에 붙는 공동 편집 문서 면. 에이전트가 사람과 같은 방식으로 편집한다 |
| Hermit | Cash App이 만든 툴체인 고정 도구. Buzz는 `bin/activate-hermit`으로 개발 도구 버전을 묶는다 |
| Tauri | Rust 백엔드에 웹 프런트엔드를 결합해 데스크톱 앱을 만드는 프레임워크 |
| substrate | 여러 도구가 각자 들고 있던 상태를 하나로 받치는 공통 기반. README가 자기 위치를 설명할 때 쓰는 단어다 |

## 8. 그림 후보 (Figure Candidates)

repo 자료라 이미지를 자동 수집하지 않았다. 아래는 README에 임베드된 스크린샷 넷이고, `raw` 필드에 GitHub 원본 URL을 적어 두었다. 필요한 것만 사용자가 `wiki/assets/block-buzz/`에 받아 두면 된다.

| id | 파일 | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | channel-thread.png | "릴리스 계획을 놓고 사람과 에이전트가 같은 채널 스레드에서 주고받는 화면 (README 히어로 이미지)" | manual | ★ wiki 권장 (제품 전경) |
| fig02 | channel-agents.png | "엔지니어링 채널의 멤버 목록에 에이전트가 사람과 나란히 올라와 있는 화면" | manual | ★ wiki 권장 (핵심 주장) |
| fig03 | create-channel.png | "채널 추가 다이얼로그에서 검색과 필터로 참여하거나 만들 채널을 고르는 화면" | manual | (확인 필요, 일반적 UI) |
| fig04 | media-comments.png | "재생 중인 영상의 특정 프레임에 댓글을 고정한 미디어 화면" | manual | (확인 필요, 부가 기능) |

README의 아키텍처 도해는 이미지가 아니라 ASCII 블록이라 위 목록에 넣지 않았다. wiki 본문에는 코드 블록으로 그대로 옮기는 편이 낫다.
