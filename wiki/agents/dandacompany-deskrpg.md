---
title: "DeskRPG"
type: repo
year: 2026
category: agents
raw_path: raw/repos/dandacompany-deskrpg.md
raw_filename: "dandacompany-deskrpg.md"
source: dandacompany-deskrpg.md
source_collection: external
org: "dandacompany"
repo: "deskrpg"
url: "https://github.com/dandacompany/deskrpg"
license: "Sustainable Use License 1.0"
tags: [multi-agent, hermes-agent, virtual-office, kanban, cron, self-hosted, threejs, repo, oss]
figures:
  - id: fig01
    label: "DeskRPG home screen"
    kind: figure
    file: assets/dandacompany-deskrpg/fig01.png
    raw: https://raw.githubusercontent.com/dandacompany/deskrpg/master/public/readme/home-screenshot.png
    caption: "DeskRPG 첫 화면. 왼쪽에 로그인 폼, 오른쪽에 아이소메트릭 3D 오피스 거리가 보인다"
    strategy: manual
    curated: true
---

## 요약

DeskRPG는 Hermes Agent의 profile을 3D 가상 오피스 속 AI 직원으로 표현하는 self-hosted 웹 애플리케이션이다. profile은 Hermes 안에서 독립된 설정과 인증 키를 갖는 에이전트 단위를 말한다. DeskRPG는 profile 하나를 NPC 캐릭터 하나에 묶어, 책상에 앉아 일하고, 멘션하면 답하고, 회의에서 발언권을 주고받고, kanban 카드를 처리하는 직원으로 보여 준다.

이 저장소의 특징은 에이전트 런타임을 직접 포함하지 않는다는 점이다. DeskRPG는 사용자가 이미 운영 중인 Hermes gateway에 주소와 키로 연결하는 UI 층이다. 따라서 기존 Hermes 사용자는 profile을 옮기지 않고 그대로 오피스에 배치한다. 여러 사람이 같은 오피스에 동시에 들어올 수 있어, 사람 팀과 에이전트 팀이 한 공간을 공유하는 형태가 된다.

![[assets/dandacompany-deskrpg/fig01.png]]
*Figure 1: DeskRPG 첫 화면. 왼쪽에 로그인 폼, 오른쪽에 아이소메트릭 3D 오피스 거리가 보인다 (dandacompany/deskrpg README)*

| 항목 | 내용 |
|---|---|
| 저장소 | `dandacompany/deskrpg` (개발사 Dante Labs) |
| 버전 | `v2026.1007.1`, 최신 커밋 740b3b7345e4 (2026-10-07) |
| 주 언어와 스택 | TypeScript, Next.js, three.js, GLB 3D 모델, PostgreSQL 또는 SQLite |
| 배포 | npm 패키지 `deskrpg`, GHCR 이미지 `ghcr.io/dandacompany/deskrpg`, Hostinger one-click |
| UI 언어 | 한국어, 영어, 일본어, 중국어 |
| 지표 (수집 시점) | star 171, fork 110 |
| 웹사이트 | https://deskrpg.com |
| 라이선스 | Sustainable Use License 1.0 (비상업과 내부 업무 용도) |

## 배경

에이전트를 여러 개 운영하면 각 에이전트가 무엇을 하고 있는지 파악하기 어려워진다. 대화는 채팅 창에, 작업 목록은 kanban 보드에, 정기 작업은 cron 설정에 흩어져 있고, 에이전트마다 모델과 성격 설정도 따로 관리해야 한다. DeskRPG는 이 정보를 하나의 공간 메타포로 모은다. 에이전트는 직원, 작업 공간은 오피스, 협업은 회의와 보고로 표현된다.

DeskRPG가 연결 대상으로 삼는 Hermes Agent는 NousResearch가 공개한 에이전트 런타임이다. Hermes는 profile, gateway API 서버, kanban, cron을 이미 갖추고 있다. DeskRPG는 이 기능들을 다시 구현하지 않는다. 카드와 스케줄의 소유권은 Hermes에 그대로 두고, DeskRPG는 그것을 조회하고 조작하는 화면과 알림 경로만 제공한다. README가 "nothing to migrate"를 강조하는 이유가 이 설계에 있다.

## 핵심 개념

Hermes gateway는 Hermes Agent가 외부 요청을 받는 API 서버다. DeskRPG의 AI NPC, 작업 자동화, AI 회의는 모두 이 gateway를 거쳐 실행된다. gateway URL과 토큰은 환경 변수가 아니라 앱 안의 `My Gateways` 페이지에 등록하는 데이터다.

listener owner key는 gateway listener를 소유한 profile의 `API_SERVER_KEY`를 뜻한다. Hermes 설정은 머신 단위로 하나지만 인증은 profile 단위라, profile마다 키가 따로 있다. DeskRPG에는 반드시 이 owner key를 줘야 한다.

AI NPC는 Hermes profile 하나에 묶여 채널에 배치된 AI 직원 캐릭터다. 해고하지 않고도 다른 profile로 다시 묶을 수 있고, 사용자와의 1:1 대화는 캐릭터별로 저장된다.

`SOUL.md`는 Hermes profile의 성격과 지시를 담는 파일이다. DeskRPG는 이 파일을 웹에서 편집하게 해 주므로, 터미널 없이 NPC의 성향을 바꿀 수 있다.

deskrpg-hermes-plugin은 kanban, 이벤트 스트림, cron route를 Hermes gateway에 붙이는 동반 플러그인이다. 대화 기능은 이 플러그인 없이도 동작하지만 업무 도구 기능은 플러그인이 있어야 한다.

## 방법

### 시스템 구성

DeskRPG는 두 층으로 나뉜다. 오피스 UI와 서버로 이루어진 DeskRPG 애플리케이션이 한 층이고, 에이전트 실행을 맡는 외부 Hermes gateway가 다른 층이다.

| 층 | 구성 요소 | 역할 |
|---|---|---|
| DeskRPG 애플리케이션 | Next.js 서버, three.js 렌더러, PostgreSQL 또는 SQLite | 캐릭터, 채널, 맵, 대화 기록, 회의록, 사용자와 권한 관리 |
| Hermes gateway | Hermes Agent API 서버와 profile | 에이전트 응답 생성, tool call 실행, kanban 카드와 cron 작업 소유 |
| 동반 플러그인 | deskrpg-hermes-plugin | kanban, 이벤트 스트림, cron route와 카드 승인 정책 제공 |

오피스 레이아웃은 코드로 조립하고, three.js 렌더러는 버전이 붙은 GLB 가구, 건축, 캐릭터 모델과 직접 제작한 PBR 표면 텍스처를 쓴다. 즉 맵 데이터와 3D 자산은 버전 관리되는 정적 자산이다.

### 여섯 가지 기본 개념

README의 "How DeskRPG Works" 절은 시스템을 여섯 개념으로 설명한다. 사용자가 오피스에 들어와 에이전트와 일하는 흐름은 캐릭터 생성, 채널 입장, NPC 고용, 업무 배정 순서로 이어진다.

| 개념 | 동작 방식 |
|---|---|
| Characters | 모든 사용자는 3D 캐릭터로 입장한다. 50종의 완성형 GLB 오피스 외형 중 하나를 고르고, 같은 GLB가 맵, 명단(roster), 회의실에서 공유된다. 채널 입장 전 캐릭터 생성이 필수다 |
| Channels | 채널은 공유 오피스 공간이다. 접근과 그룹 규칙에 따라 공개 또는 제한 채널이 되고, 맵은 맵 템플릿에서 만든다 |
| AI NPCs | 채널 안에 배치되며 Hermes profile 하나에 묶인다. 메뉴에서 호출, 돌려보내기, 편집, 초기화, 해고를 할 수 있다. 1:1 대화는 서버 재시작 후에도 남는다 |
| Kanban and Reports | 채널의 Hermes profile에 카드를 배정한다. 카드와 실행은 Hermes가 소유한다. 완료된 최상위 카드와 차단된 카드는 카드 링크와 함께 오피스 채팅에 구조화된 알림으로 올라온다 |
| Meetings | 모든 맵에 회의 공간이 있다. AI 회의는 채널 단위이며 채널의 Hermes gateway가 오케스트레이션한다. 회의록은 저장되어 헤더에서 열람한다 |
| Schedules | NPC별 Hermes cron 작업을 DeskRPG에 복사하지 않고 그대로 관리한다. 완료된 실행 결과는 스케줄을 만든 오피스 방에 올라온다 |

### 오피스와 캐릭터

캐릭터 외형은 50종이다. CC0 라이선스의 Quaternius 3D 모델을 베이스로 삼아 완성형 캐릭터로 다시 만들었고, 외형 하나가 GLB 파일 하나다. 사용자와 NPC가 같은 외형 풀을 공유한다.

오피스 환경은 다섯 종이 큐레이션되어 있다.

- 무역회사 (trading company)
- 에이전시 (agency)
- 테크 스타트업 (tech startup)
- 임원 공간 (executive suite)
- 출판사 (publisher)

### NPC 고용과 설정

NPC를 고용하면 Hermes profile 하나가 그 NPC에 묶인다. 고용 마법사에서는 NPC별로 다음 항목을 고른다.

| 설정 | 내용 |
|---|---|
| 모델과 provider | provider는 모델 API를 제공하는 회사나 서비스 단위를 말한다. 마법사는 Hermes의 `hermes model`과 같은 provider 목록을 같은 순서로 보여 준다 |
| toolset | NPC가 쓸 수 있는 도구 묶음 |
| reasoning effort | 응답 전에 추론에 들이는 노력 수준 |
| `SOUL.md` | NPC의 성격과 지시 |

`v2026.1007.1`에서 provider 목록이 정비됐다. 각 provider가 한 번씩만 나타나고(이전에는 Nebius Token Factory와 Meta Model API가 alias마다 반복됐다), OpenRouter, Mixture of Agents, 사용자 정의 endpoint가 추가됐다. 이미 쓸 수 있는 provider는 목록 위쪽에 놓이고, OpenRouter API 키는 마법사 안에서 바로 입력한다.

### 대화와 응답 수명주기

대화는 두 종류의 방에서 이루어진다. 오피스 방에서는 멘션으로 특정 직원 한 명에게 말을 걸고, 그룹 방에는 NPC를 초대해 여럿이 함께 대화한다.

DeskRPG는 에이전트 응답이 어느 단계에 있는지를 화면에 표시한다. 응답 하나는 다음 상태를 거친다.

| 상태 | 의미 |
|---|---|
| queued | 요청이 대기열에 들어간 상태 |
| thinking | 에이전트가 응답을 준비하는 상태 |
| streaming | 응답 텍스트가 실시간으로 전송되는 상태 |
| complete | 정상 완료 |
| failed | 실패 |
| cancelled | 취소 |

이와 함께 에이전트가 지금 어떤 도구를 쓰고 있는지도 표시된다. 따라서 사용자는 응답이 늦을 때 대기 중인지, 도구를 실행 중인지 구분할 수 있다.

### 회의 모드

회의 모드는 별도의 회의실 디자인을 불러오지 않고, 라이브 맵의 회의 공간을 확대해 고정한다. 원래 방과 캐릭터가 그대로 유지되는 것이 특징이다.

- 카메라와 참가자 사이에 있는 벽은 흐리게 처리된다.
- 카메라는 현재 발언자를 자동으로 따라가고, 수동 회전도 가능하다.
- floor control은 회의에서 발언권을 한 참가자에게 주고 넘기는 제어를 말한다. 손들기 기능과 함께 제공된다.
- 회의록은 저장되어 헤더에서 볼 수 있고 내보낼 수 있다.

AI 회의는 채널 단위로 동작하며, 채널에 연결된 Hermes gateway가 여러 에이전트의 발언 순서를 오케스트레이션한다.

### kanban과 보고

kanban 카드는 Hermes가 소유한다. DeskRPG는 채널의 Hermes profile에 카드를 배정하고, 카드가 다음 단계를 지나는 과정을 추적한다.

| 단계 | 의미 |
|---|---|
| planning | 계획 수립 |
| running | 실행 중 |
| blocked | 차단되어 진행 불가 |
| review | 검토 대기 |
| completion | 완료 |

완료된 최상위 카드와 차단된 카드는 오피스 채팅에 카드 링크가 포함된 구조화된 알림으로 올라온다. 사용자는 NPC 메뉴에서 "호출"을 골라 NPC를 자기 캐릭터 옆으로 불러 작업을 논의한다. README가 "Call them over and read their completion reports in office chat"이라고 요약하는 흐름이다.

### 카드 승인 정책

플러그인 0.27.0부터 카드 승인 정책이 capability `review_hooks_v1`로 제공된다. 이 정책은 Hermes core를 수정하지 않고, 문서화된 Hermes 훅과 플러그인 자체 저장소만으로 강제된다. 훅은 특정 이벤트 시점에 실행되는 사용자 정의 코드를 말한다.

정책 규칙은 세 가지다.

1. 구현자는 자기 카드를 스스로 완료할 수 없다.
2. 사람의 승인을 기다리는 카드는 담당자 없이 `review` 상태에 머문다.
3. 리뷰어는 자기가 한 작업을 승인하지 않는다.

이 capability가 없는 gateway에서는 카드가 정책 없이 만들어지고, 보드는 해당 카드가 승인 없이 완료된다고 표시한다. 업스트림 Hermes를 패키지 매니저로 설치한 경우에는 kanban worker가 시작되도록 `HERMES_BIN`을 Hermes 실행 파일로 지정해야 한다. Linux에서는 설정 마법사가 이를 처리하고, 그 외에는 gateway 페이지가 명령을 보여 준다. 이전에 Dante Labs 호환 패치로 Hermes core를 수정해 쓴 경우에는 플러그인 저장소의 이전 절차를 따른다.

### 스케줄

스케줄 기능은 NPC별 Hermes cron 작업을 DeskRPG에서 관리한다. 스케줄을 DeskRPG 쪽 데이터베이스에 복사하지 않고 Hermes에 둔 채 조작한다.

- blueprint로 자주 쓰는 스케줄을 빠르게 만든다.
- 작업을 일시정지, 재개, 즉시 실행한다.
- 최근 실행 이력을 조회한다.
- 완료된 실행 결과는 스케줄을 만든 오피스 방에 구조화된 메시지로 올라온다.

### Hermes 연결 절차

연결 전에 Hermes Agent API 서버에서 두 값을 확인한다. 하나는 gateway가 listen하는 base URL(예: `http://127.0.0.1:8642`)이고, 다른 하나는 listener owner key다.

owner key가 필요한 이유는 route 구조에 있다. kanban, cron, 이벤트 스트림은 접두어 없는 route에 있고, Hermes는 이 route를 owner key로만 인증한다. 보조 profile의 키로도 대화는 되지만 보드와 스케줄은 모두 `plugin_unauthorized`로 실패한다. 화면은 이 원인을 알려 주지 않으므로, 연결 단계에서 키를 정확히 고르는 것이 중요하다.

연결은 네 단계로 진행된다.

| 단계 | 위치 | 내용 |
|---|---|---|
| 1. gateway 등록 | 우측 상단 메뉴의 `My Gateways` → `New gateway` | Display name, Hermes Gateway URL, Token(owner key)을 입력하고 연결 테스트를 실행한다. 실패하면 원인 메시지가 나오므로 설정을 바꾸기 전에 읽는다 |
| 2. profile 추가 | 같은 페이지 | gateway 하나가 여러 profile을 서빙하고 NPC는 profile에 묶이므로, gateway 등록만으로는 부족하다 |
| 3. 채널에 연결 | 채널의 `Settings -> Channel Settings -> AI Connection` | 저장된 gateway를 고르고 테스트 후 저장한다. 헤더 배지가 `AI Connected`로 바뀐다 |
| 4. 플러그인 설치 | gateway 호스트의 셸 | `deskrpg-hermes-plugin`을 설치하고 enable한 뒤 gateway를 재시작한다 |

플러그인 설치는 특정 커밋으로 고정한 명령을 쓴다.

```bash
hermes plugins install https://github.com/dandacompany/deskrpg-hermes-plugin --ref c9b4880121c08331cc780fb08259cb6352e8ea5d
hermes plugins enable deskrpg
# 이후 gateway를 재시작한다 (route는 시작 시점에만 붙는다)
```

`enable`은 선택 사항이 아니다. 이 단계를 빼면 설치가 성공해도 모든 플러그인 route가 404를 반환한다. 플러그인이 없거나 낡았으면 DeskRPG의 보드와 스케줄 화면이 같은 한 줄 명령을 보여 준다. 네 단계를 마치면 NPC를 고용할 수 있다.

### 플러그인 업그레이드

이미 설치된 플러그인 위에 `install`을 다시 실행하면 "already exists"로 실패하고 옛 버전이 계속 동작한다. 따라서 다음 순서로 교체한다.

```bash
hermes plugins disable deskrpg
hermes plugins install https://github.com/dandacompany/deskrpg-hermes-plugin --ref c9b4880121c08331cc780fb08259cb6352e8ea5d --force
hermes plugins enable deskrpg
hermes gateway restart
```

각 단계에는 이유가 있다.

| 단계 | 생략하면 생기는 문제 |
|---|---|
| disable 먼저 | Hermes는 스크립트나 비대화형 셸에서 enable 상태의 플러그인을 교체하지 않고 옛 버전을 남긴다 |
| enable | 교체된 플러그인은 disable 상태로 남아 모든 route가 404를 반환한다. 이 단계가 플러그인 의존성도 준비한다 |
| gateway restart | route는 시작 시점에만 붙으므로 재시작 전까지 새 버전이 응답하지 않는다 |
| 루트 Hermes home에서 실행 | `-p <profile>`로 설치한 플러그인은 DeskRPG가 대화하는 루트 listener에 붙지 않는다 |

결과는 `hermes plugins list`에서 `deskrpg`가 `enabled` 상태인지로 확인한다. README의 이 절은 기대 버전을 0.30.x로 적고 있다.

### 설치 옵션

README는 여섯 가지 설치 경로를 제시한다. 빠른 시작에는 SQLite를, 장기 운영과 다중 사용자 환경에는 PostgreSQL을 권한다.

| 옵션 | 데이터베이스 | 명령 요지 | 접속 주소 | 용도 |
|---|---|---|---|---|
| 1. npm | SQLite (`~/.deskrpg/data/deskrpg.db`) | `npx deskrpg init`, `npx deskrpg start` | localhost:3000 | 저장소 없이 설치형 앱으로 쓰는 가장 간단한 경로 |
| 2. 로컬 PostgreSQL | PostgreSQL | clone, `npm install`, `.env.example`을 `.env.local`로 복사, `npm run setup`, `npm run dev` | localhost:3000 | 저장소에서 전체 앱을 직접 실행 |
| 3. 로컬 SQLite | SQLite (`data/deskrpg.db`) | clone, `npm install`, `npm run setup:lite`, `npm run dev` | localhost:3000 | 빠른 시작 |
| 4. Docker PostgreSQL | PostgreSQL | `.env.docker`에 `JWT_SECRET`, `POSTGRES_PASSWORD` 생성 후 `docker/docker-compose.external.yml` | localhost:3102 | 다중 사용자, 내구성 있는 DB |
| 5. Docker SQLite | SQLite | `.env.lite`에 `JWT_SECRET` 생성 후 `docker/docker-compose.lite.yml` | localhost:3102 | 단일 머신의 가장 단순한 구성 |
| 6. Docker와 Hermes | DeskRPG 기본 | `.env.hermes`에 `HERMES_API_KEY`와 모델 provider 키 후 `docker/docker-compose.hermes.yml` | localhost:3102 | VPS와 HTTPS 없이 오피스와 gateway를 한 머신에서 실행 |

옵션별 주의 사항은 다음과 같다.

- **npm**: 변경 가능한 상태는 `~/.deskrpg/` 아래 `.env.local`, `data/deskrpg.db`, `uploads/`, `logs/`에 저장된다. npm `2026.9.18`과 `2026.9.19`는 `node_modules` 아래에 설치하면 `Cannot find module '@/db'` 오류로 시작하지 못하므로 `2026.9.20` 이후를 쓴다. 이 사고 이후 릴리스 파이프라인은 레지스트리에서 설치한 패키지를 실제로 부팅해 본 뒤 릴리스를 공지한다.
- **Docker 공통**: `-f docker/docker-compose.external.yml` 같은 compose 파일 지정을 `down`과 `logs`를 포함해 매번 붙인다. 저장소 루트의 `docker-compose.yml`은 Hostinger one-click 스택이라 HTTP 포트를 열지 않고 `COOKIE_SECURE` 기본값이 `true`다. 그대로 `docker compose up`을 하면 접속할 포트가 없고, HTTP에서는 브라우저가 로그인 쿠키를 버린다.
- **이미지**: 공개 이미지는 GHCR의 `ghcr.io/dandacompany/deskrpg`이며 기본 태그는 `latest`다. `DESKRPG_IMAGE`에 릴리스 태그를 지정해 버전을 고정한다. 예전 Docker Hub 이미지는 `2026.9.19`에서 멈춘 레거시다.
- **Docker와 Hermes**: 포트는 `127.0.0.1`에만 묶인다. 앱에서 gateway URL `http://hermes:8642`와 `HERMES_API_KEY` 값을 토큰으로 등록한다. 플러그인은 자동으로 설치되고 enable된다. OpenRouter, OpenAI, Anthropic 중 하나의 모델 provider 키가 없으면 gateway가 시작하지 않는다. `HERMES_DASHBOARD_PASSWORD`를 지정하면 Hermes 대시보드가 localhost:9119에 열린다. 플러그인을 갱신할 때는 `up -d --force-recreate hermes`로 Hermes 서비스를 다시 만들어야 하며, 일반 `up -d`는 실행 중인 gateway를 옛 플러그인에 그대로 둔다.

### Hostinger 배포

README 상단은 VPS 하나에서 오피스와 Hermes Agent를 상시 운영하는 Hostinger 경로를 안내한다. 경로는 VPS 보유 여부에 따라 둘로 나뉜다.

| 상황 | 절차 |
|---|---|
| 새 VPS | Hostinger one-click 카탈로그에서 DeskRPG를 고른다. KVM 2 이상, 메모리 8GB를 권장한다 |
| 기존 VPS | Docker Manager에 compose URL을 불러와 배포한다. 이어서 "Enable HTTPS for Docker projects" 배너에서 Traefik을 배포하고, DeskRPG 프로젝트 환경에 `TRAEFIK_HOST=srvNNNNNN.hstgr.cloud`를 직접 추가한 뒤 다시 배포한다 |

Traefik이 오피스의 HTTPS 주소를 만들어 주며, `TRAEFIK_HOST`는 자동으로 채워지지 않는다. 이미 Hostinger에서 운영 중이라면 compose 파일을 한 번 교체해야 한다. Hostinger의 Update는 새 compose 파일을 읽지 않으므로, Hermes 플러그인을 설치하는 부분이 처음 설정한 날의 상태로 남기 때문이다. compose 파일에 `plugin-pin`이 없으면 배포 문서의 네 단계 교체 절차를 따르며 데이터는 유지된다.

### 환경 변수

gateway URL과 토큰은 환경 변수가 아니다. 환경 변수로 다루는 값은 다음과 같다.

| 변수 | 의미 |
|---|---|
| `JWT_SECRET` | 인증 서명 키. 운영 환경에서는 반드시 실제 값을 지정한다 |
| `POSTGRES_PASSWORD` | PostgreSQL Docker 구성의 DB 비밀번호 |
| `DESKRPG_LOCAL_DISCOVERY_ENABLED` | 선택. loopback gateway가 호스트의 `~/.hermes/profiles`를 읽게 한다. 기본 꺼짐 |
| `DESKRPG_HOST_SETUP_ENABLED` | 선택. 로컬과 SSH gateway 설정 마법사는 기본적으로 `system_admin`에게 열려 있으며 `0`이면 끈다 |
| `DESKRPG_FEEDBACK_URL` | 선택. 설문과 비공개 버그 리포트의 수신처. 빈 값이면 둘 다 끄고, 자체 수집기를 가리킬 수도 있다 |

### 외부로 전송하는 데이터

DeskRPG는 오피스, 직원, 대화에 관한 정보를 외부로 보내지 않는다. 브라우저에서 나갈 수 있는 데이터는 선택형 두 가지뿐이다.

| 항목 | 노출 조건 | 담기는 내용 |
|---|---|---|
| 사용 설문 | 맵 체류 약 30분 후, 30일에 최대 1회. Send를 눌러야 전송되고 "Don't ask again"으로 영구히 끈다 | 답변, 앱 버전, UI 언어, 중복 판별용 무작위 설치 ID |
| 비공개 버그 리포트 | 메뉴의 Report a bug에서 공개 GitHub issue 대신 선택 | 입력 내용, 선택 연락처, 버전, 브라우저, 화면 크기, 최근 오류 줄. 각 항목은 전송 전에 보여 주고 체크 해제할 수 있다 |

설문이 뜰 때 브라우저는 먼저 같은 서버에서 질문을 `GET /v1/survey`로 받아 온다. 이 요청은 식별자를 담지 않지만 사용자 IP에서 서버로 도달한다. 두 데이터는 DeskRPG 관리자가 운영하는 `https://feedback.deskrpg.com`으로 가며, 서버는 rate limit용으로 IP의 salted hash만 저장하고 주소 자체는 저장하지 않는다. 별도로 맵은 새 버전 표시를 위해 DeskRPG 서버를 거쳐 GitHub API에서 star 수와 최신 릴리스를 조회하는데, 이때도 식별자는 보내지 않는다.

### 접근 제어

초대 코드가 있어도 로그인은 필수다. 초대 코드는 채널 접근을 돕는 수단일 뿐 익명 접근 토큰이 아니다. 채널은 그룹과 역할 기반 접근 규칙으로 공개 또는 제한 상태가 되며, 호스트 설정 마법사는 `system_admin` 역할에 열린다.

## 결과

README는 에이전트 협업 품질이나 성능에 관한 정량 평가를 제시하지 않는다. 확인할 수 있는 수치는 제품 사양과 운영 설정이다.

| 항목 | 값 |
|---|---|
| 캐릭터 외형 | 50종 (외형당 GLB 하나) |
| 오피스 환경 | 5종 |
| UI 언어 | 4개 |
| 설치 경로 | 6가지 |
| 기본 포트 | npm과 로컬 실행 3000, Docker 3102, Hermes gateway 8642, Hermes 대시보드 9119 |
| Hostinger 권장 사양 | KVM 2 이상, 메모리 8GB |
| 요구 플러그인 버전 | 0.31.1 (`v2026.1007.1` 기준) |
| 승인 정책 도입 | 플러그인 0.27.0 |
| 설문 노출 조건 | 맵 체류 약 30분, 30일에 최대 1회 |

이 수치는 DeskRPG가 연구용 프로토타입보다 배포형 제품에 가깝다는 점을 보여 준다. npm, GHCR, Hostinger 세 경로로 배포되고, 릴리스 파이프라인이 설치 후 부팅 검사를 수행하며, 플러그인 버전을 커밋 해시로 고정한다.

## 한계

- **Hermes 전용**: 에이전트 런타임을 포함하지 않으며, README는 Hermes gateway 외의 런타임 연결 방법을 다루지 않는다.
- **플러그인 의존 기능**: kanban, 이벤트 스트림, cron은 gateway 호스트에 플러그인을 설치하고 enable해야 동작한다. 업그레이드 순서를 어기면 옛 버전이 남거나 route가 404를 반환한다.
- **키 혼동의 진단 어려움**: owner key 대신 보조 profile 키를 쓰면 보드와 스케줄이 `plugin_unauthorized`로 실패하지만 화면은 원인을 알려 주지 않는다.
- **승인 정책의 조건부 적용**: `review_hooks_v1` capability가 없는 gateway에서는 카드가 승인 없이 완료된다.
- **배포 함정**: 루트 `docker-compose.yml`은 Hostinger 전용이라 로컬에서 그대로 쓰면 접속할 수 없다. Hostinger의 Update는 compose 파일을 다시 읽지 않아 한 번의 수동 교체가 필요하다.
- **버전 표기 불일치**: 상단 버전 노트는 plugin 0.31.1을 요구하지만 업그레이드 확인 절차는 0.30.x를 기대값으로 적는다.
- **라이선스 제약**: Sustainable Use License는 자체 내부 업무, 비상업, 개인 용도만 허용하고 무상 비상업 배포만 허용한다. 타인을 위한 관리형 서비스 운영은 금지되므로 OSI 기준 오픈소스가 아니다.
- **정량 평가 부재**: 공간 메타포가 멀티에이전트 운영 효율을 얼마나 높이는지에 대한 측정은 없다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| Hermes gateway | Hermes Agent의 API 서버. DeskRPG가 대화, 회의, kanban, cron을 요청하는 대상 |
| listener owner key | gateway listener를 소유한 profile의 `API_SERVER_KEY`. kanban, cron, 이벤트 스트림 route 인증에 필요하다 |
| AI NPC | Hermes profile 하나에 묶여 오피스에 배치된 AI 직원 캐릭터 |
| deskrpg-hermes-plugin | kanban, 이벤트 스트림, cron route와 승인 정책을 gateway에 붙이는 Hermes 플러그인 |
| `review_hooks_v1` | 구현자 자기 완료 금지와 사람 승인 대기를 강제하는 카드 승인 정책 capability |
| floor control | 회의에서 발언권을 한 참가자에게 주고 넘기는 제어 |

## 관련 페이지

- [[applications/mantena-2026-hermes-gbrain-setup-vps]]: Hermes Agent가 실행 중인 VPS에 GBrain을 더하는 설정 가이드. DeskRPG의 Hostinger 경로와 같은 Hermes 상시 운영 환경을 다룬다.
- [[agents/stablyai-orca]]: 여러 코딩 에이전트를 한 화면에서 조율하는 오케스트레이터. DeskRPG와 같이 멀티에이전트 작업을 시각적으로 관리하는 도구다.
