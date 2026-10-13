---
title: "DeskRPG"
type: repo
year: 2026
category: agents
raw_path: raw/repos/dandacompany-deskrpg.md
raw_filename: "dandacompany-deskrpg.md"
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
  - id: fig02
    label: "Morning Commute"
    kind: figure
    file: assets/dandacompany-deskrpg/fig02.gif
    raw: https://raw.githubusercontent.com/dandacompany/deskrpg/master/public/readme/deskrpg-home-commute.gif
    caption: "3D 오피스로 출근하는 캐릭터들의 아침 장면 애니메이션"
    strategy: manual
    curated: false
  - id: fig03
    label: "Call Them Over to Report"
    kind: figure
    file: assets/dandacompany-deskrpg/fig03.gif
    raw: https://raw.githubusercontent.com/dandacompany/deskrpg/master/public/readme/deskrpg-walk-report.gif
    caption: "호출받은 AI NPC가 사용자 캐릭터 옆으로 걸어와 보고하는 장면 애니메이션"
    strategy: manual
    curated: false
  - id: fig04
    label: "Live Small Talk"
    kind: figure
    file: assets/dandacompany-deskrpg/fig04.gif
    raw: https://raw.githubusercontent.com/dandacompany/deskrpg/master/public/readme/deskrpg-small-talk.gif
    caption: "오피스 안에서 캐릭터들이 실시간으로 잡담하는 장면 애니메이션"
    strategy: manual
    curated: false
  - id: fig05
    label: "Agent Meeting"
    kind: figure
    file: assets/dandacompany-deskrpg/fig05.gif
    raw: https://raw.githubusercontent.com/dandacompany/deskrpg/master/public/readme/deskrpg-ai-meeting.gif
    caption: "회의 공간에서 AI NPC들이 회의를 진행하는 장면 애니메이션"
    strategy: manual
    curated: false
---

## 한 줄 요약 (One-line Summary)

DeskRPG는 Hermes Agent의 profile을 3D 가상 오피스의 AI 직원(NPC)으로 바꿔 주는 self-hosted 웹 애플리케이션이다. 에이전트 런타임을 직접 포함하지 않고 사용자가 이미 운영 중인 Hermes gateway에 붙어, 대화, 회의, kanban 카드, cron 작업을 오피스 화면과 채팅으로 다룬다. 라이선스는 비상업과 내부 업무 용도만 허용하는 Sustainable Use License 1.0이다.

## 1. 자료 정보 (Document Information)

- **Org / Repo**: `dandacompany/deskrpg` (개발사 Dante Labs)
- **README 표제**: "DeskRPG", 부제 "3D miniature virtual office for AI agents"
- **기본 브랜치**: master, 최신 커밋 740b3b7345e4 (2026-10-07)
- **버전**: `v2026.1007.1`. 고용 마법사의 AI 모델 단계가 Hermes의 `hermes model`과 같은 provider 목록을 같은 순서로 보여 주도록 바뀌었고, plugin 0.31.1을 요구한다
- **저장소 지표 (수집 시점)**: star 171, fork 110, 주 언어 TypeScript, 생성 2026-03-26
- **웹사이트**: https://deskrpg.com
- **배포 형태**: npm 패키지 `deskrpg`, GHCR 이미지 `ghcr.io/dandacompany/deskrpg`, Hostinger one-click 카탈로그
- **기술 스택 (README와 topics 기준)**: Next.js, three.js 렌더러, GLB 3D 모델, PostgreSQL 또는 SQLite(drizzle 설정 파일 두 개)
- **지원 언어**: 한국어, 영어, 일본어, 중국어
- **라이선스**: Sustainable Use License 1.0. 자체 내부 업무, 비상업, 개인 용도로만 사용과 수정을 허용하고, 다른 사람에게 관리형 서비스로 운영하는 것은 허용하지 않는다. 호스팅 사업자는 "Infrastructure Provider Permission"에 따라 고객 소유 서버에 설치하는 one-click 설치기를 제공할 수 있다
- **수집 범위**: 최상위 README.md 전문 (`raw/repos/dandacompany-deskrpg.md`)

## 2. 주요 기여 (Key Contributions)

1. **에이전트 profile을 공간 속 직원으로 표현**: Hermes Agent의 profile 하나를 NPC 하나에 묶어, 책상에 앉아 일하고 호출하면 걸어와 보고하는 캐릭터로 시각화한다.
2. **런타임 비포함, gateway 부착 구조**: 에이전트 런타임을 번들하지 않고 기존 Hermes gateway에 주소와 키로 연결한다. 기존 Hermes 사용자는 profile을 옮기지 않고 그대로 쓴다.
3. **업무 도구 통합**: Hermes가 소유한 kanban 카드와 cron 작업을 DeskRPG 화면에서 관리하고, 완료와 차단 알림을 오피스 채팅에 구조화된 메시지로 올린다.
4. **회의 모드**: 오피스 맵의 회의 공간에서 발언권 제어, 손들기, 회의록 내보내기를 지원하고, 카메라가 현재 발언자를 따라간다.
5. **멀티플레이어**: 여러 사람이 같은 오피스에 동시에 들어오고, 그룹과 역할 기반 접근 제어를 둔다.
6. **여섯 가지 설치 경로**: npm, 로컬 PostgreSQL, 로컬 SQLite, Docker PostgreSQL, Docker SQLite, Docker로 Hermes까지 함께 띄우는 구성을 제공한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 전체 구조

DeskRPG는 웹 애플리케이션(오피스 UI와 서버)과 외부 Hermes gateway로 나뉜다. AI NPC, 작업 자동화, AI 회의는 모두 Hermes gateway를 거쳐 실행된다. gateway URL과 토큰은 환경 변수가 아니라 앱 안의 `My Gateways` 페이지에 등록하고, 채널 설정의 AI Connection에서 채널에 연결한다.

kanban, 이벤트 스트림, cron은 gateway 호스트에 별도 플러그인 `deskrpg-hermes-plugin`이 있어야 동작한다. 대화만 쓰려면 플러그인이 필요 없다.

### 3.2 핵심 개념 여섯 가지

README의 "How DeskRPG Works" 절은 다음 여섯 개념으로 시스템을 설명한다.

| 개념 | 내용 |
|---|---|
| Characters | 모든 사용자는 3D 캐릭터로 입장한다. 50종의 완성형 GLB 오피스 외형 중 하나를 고르며, 같은 GLB가 맵, 명단(roster), 회의실에서 공유된다. 채널에 들어가기 전 캐릭터 생성이 필수다 |
| Channels | 채널은 공유 오피스 공간이다. 접근과 그룹 규칙에 따라 공개 또는 제한 채널이 되고, 맵은 맵 템플릿에서 만든다 |
| AI NPCs | NPC는 채널 안에 살며 Hermes profile 하나에 묶인다. 해고하지 않고 다른 profile로 다시 묶을 수 있다. 1:1 대화는 캐릭터별로 저장되어 서버 재시작 후에도 남는다. 메뉴에서 호출, 돌려보내기, 편집, 초기화, 해고가 가능하다 |
| Kanban and Reports | 채널의 Hermes profile에 kanban 카드를 배정한다. 카드와 실행은 Hermes가 소유한다. planning, running, blocked, review, completion 단계를 추적하고, 완료된 최상위 카드와 차단된 카드는 카드 링크와 함께 오피스 채팅에 구조화된 알림을 올린다 |
| Meetings | 모든 오피스 맵에 회의 공간이 있다. 회의 모드는 별도 방을 불러오지 않고 라이브 맵의 해당 영역을 확대해 고정한다. AI 회의는 채널 단위이며 채널의 Hermes gateway가 오케스트레이션한다. 회의록은 저장되어 헤더에서 볼 수 있다 |
| Schedules | NPC별 Hermes cron 작업을 DeskRPG에 복사하지 않고 그대로 관리한다. 일시정지, 재개, 즉시 실행, 최근 실행 이력 조회, blueprint 기반 생성이 가능하고, 완료된 실행 결과는 스케줄을 만든 오피스 방에 올라간다 |

### 3.3 기능 목록 ("What You Can Do")

- 50종의 스타일화된 오피스 외형(CC0 Quaternius 베이스를 완성형 캐릭터로 재구성)을 사용자와 NPC 모두에 적용한다. 외형 하나가 GLB 하나다.
- three.js로 렌더링하는 3D 오피스를 걸어 다닌다. 환경은 무역회사, 에이전시, 테크 스타트업, 임원 공간, 출판사 다섯 종이다.
- Hermes gateway를 주소로 등록하거나, 설정 마법사가 로컬 또는 SSH로 접근 가능한 Hermes 설치를 찾아 플러그인을 확인하고 profile을 등록하게 한다.
- Hermes profile에 묶인 NPC를 고용하고, 웹에서 `SOUL.md`를 편집하며, NPC별로 모델, provider, toolset, reasoning effort를 고른다.
- 오피스 방에서 멘션으로 특정 직원에게 말을 걸고, NPC를 초대한 그룹 방을 연다. 응답 수명주기(queued, thinking, streaming, complete, failed, cancelled)와 에이전트가 지금 쓰고 있는 도구가 화면에 보인다.
- 회의 모드는 원래 방과 캐릭터를 유지한 채 카메라를 가리는 벽을 흐리게 하고 현재 발언자를 따라간다. 발언권 제어(floor control), 손들기, 회의록 내보내기를 지원한다.
- Hermes 소유 kanban 카드를 planning부터 실행, 리뷰, 완료까지 추적한다.
- NPC별 Hermes cron 작업을 blueprint로 만들고, 일시정지, 재개, 즉시 실행, 이력 조회를 하며 결과를 오피스 채팅으로 받는다.
- 여러 사람과 오피스를 공유한다 (멀티플레이어, 그룹, 역할 기반 접근).

### 3.4 Hermes 연결 절차

연결 전에 Hermes Agent API 서버에서 두 값을 확인한다.

- gateway가 listen하는 base URL (예: `http://127.0.0.1:8642`)
- listener owner key, 즉 listener를 소유한 profile의 `API_SERVER_KEY`

Hermes 설정은 머신 단위지만 인증은 profile 단위라 profile마다 키가 따로 있다. DeskRPG에는 owner key를 줘야 한다. kanban, cron, 이벤트 스트림은 접두어 없는 route에 있고 Hermes가 이 route를 owner key로만 인증하기 때문이다. 보조 profile의 키로도 대화는 되지만 보드와 스케줄은 모두 `plugin_unauthorized`로 실패하며 화면은 원인을 알려 주지 않는다.

| 단계 | 위치 | 내용 |
|---|---|---|
| 1. gateway 등록 | 우측 상단 메뉴의 `My Gateways` → `New gateway` | Display name, Hermes Gateway URL, Token(owner key)을 입력하고 연결 테스트를 실행한다. 실패 시 원인 메시지를 보여 준다 |
| 2. profile 추가 | 같은 페이지 | NPC는 profile에 묶이므로 gateway 등록만으로는 부족하다. profile마다 자체 키가 있다 |
| 3. 채널에 연결 | 채널의 `Settings -> Channel Settings -> AI Connection` | 저장된 gateway를 고르고 테스트 후 저장한다. 헤더 배지가 `AI Connected`로 바뀐다 |
| 4. 플러그인 설치 | gateway 호스트의 셸 | kanban과 cron용 `deskrpg-hermes-plugin`을 설치하고 enable한 뒤 gateway를 재시작한다 |

플러그인 설치 명령은 특정 커밋으로 고정된다.

```bash
hermes plugins install https://github.com/dandacompany/deskrpg-hermes-plugin --ref c9b4880121c08331cc780fb08259cb6352e8ea5d
hermes plugins enable deskrpg
# restart the gateway — routes are attached only at startup
```

`enable`을 빼면 설치가 성공해도 모든 플러그인 route가 404를 반환한다. 플러그인이 없거나 낡았으면 DeskRPG의 보드와 스케줄 화면이 같은 한 줄 명령을 보여 준다.

### 3.5 플러그인 업그레이드 규칙

기존 플러그인 위에 `install`을 다시 실행하면 "already exists"로 실패하고 옛 버전이 계속 동작한다. 따라서 disable, `--force` install, enable, `hermes gateway restart` 순서로 교체한다.

- 먼저 disable한다. Hermes는 스크립트나 비대화형 셸에서 enable 상태의 플러그인을 교체하지 않고 옛 버전을 남긴다.
- enable을 생략하지 않는다. 교체된 플러그인은 disable 상태로 남고, 이 단계가 의존성도 준비한다.
- route는 시작 시점에만 붙으므로 gateway를 재시작해야 새 버전이 응답한다.
- 루트(기본) Hermes home에서 실행한다. `-p <profile>`로 설치한 플러그인은 DeskRPG가 대화하는 루트 listener에 붙지 않는다.
- `hermes plugins list`에서 `deskrpg`가 `enabled`, 버전 0.30.x로 보이는지 확인한다.

### 3.6 승인 정책 (review_hooks_v1)

플러그인 0.27.0부터 카드 승인 정책(capability `review_hooks_v1`)을 Hermes core 수정 없이 문서화된 Hermes 훅과 플러그인 자체 저장소로 강제한다.

- 구현자는 자기 카드를 스스로 완료할 수 없다.
- 사람의 승인을 기다리는 카드는 담당자 없이 `review` 상태에 머문다.
- 리뷰어는 자기가 한 작업을 승인하지 않는다.

이 capability가 없는 gateway는 정책 없이 카드를 만들고, 보드는 해당 카드가 승인 없이 완료된다고 표시한다. 업스트림의 패키지 매니저 설치에서는 kanban worker가 시작되도록 `HERMES_BIN`을 Hermes 실행 파일로 지정해야 한다 (Linux에서는 설정 마법사가 처리한다). 이전의 Dante Labs 호환 패치를 썼다면 플러그인 저장소의 이전 절차를 따른다.

### 3.7 설치 옵션

| 옵션 | 데이터베이스 | 명령 요지 | 접속 주소 | 용도 |
|---|---|---|---|---|
| 1. npm | SQLite (`~/.deskrpg/data/deskrpg.db`) | `npx deskrpg init`, `npx deskrpg start` | localhost:3000 | 저장소를 받지 않고 설치형 앱으로 쓰는 가장 간단한 경로 |
| 2. 로컬 PostgreSQL | PostgreSQL | clone, `npm install`, `.env.local` 복사, `npm run setup`, `npm run dev` | localhost:3000 | 저장소에서 전체 앱을 직접 실행 |
| 3. 로컬 SQLite | SQLite (`data/deskrpg.db`) | clone, `npm install`, `npm run setup:lite`, `npm run dev` | localhost:3000 | 빠른 시작 |
| 4. Docker PostgreSQL | PostgreSQL | `.env.docker`에 `JWT_SECRET`, `POSTGRES_PASSWORD` 생성 후 `docker/docker-compose.external.yml` | localhost:3102 | 다중 사용자나 내구성 있는 DB |
| 5. Docker SQLite | SQLite | `.env.lite`에 `JWT_SECRET` 생성 후 `docker/docker-compose.lite.yml` | localhost:3102 | 단일 머신의 가장 단순한 구성 |
| 6. Docker + Hermes | (DeskRPG 기본) | `.env.hermes`에 `HERMES_API_KEY`와 모델 provider 키 후 `docker/docker-compose.hermes.yml` | localhost:3102 | VPS와 HTTPS 없이 오피스와 Hermes gateway를 한 머신에서 함께 실행 |

세부 사항은 다음과 같다.

- npm 런타임은 변경 가능한 상태를 `~/.deskrpg/` 아래(`.env.local`, `data/deskrpg.db`, `uploads/`, `logs/`)에 둔다. npm `2026.9.18`과 `2026.9.19`는 `node_modules` 아래에 설치하면 `Cannot find module '@/db'`로 시작하지 못하므로 `2026.9.20` 이후를 쓴다. 이후 릴리스 파이프라인은 레지스트리에서 설치한 패키지를 실제로 부팅해 본 뒤 공지한다.
- Docker 옵션은 `-f docker/docker-compose.external.yml`을 `down`과 `logs`를 포함해 매번 지정한다. 저장소 루트의 `docker-compose.yml`은 Hostinger one-click 스택이라 HTTP 포트를 열지 않고 `COOKIE_SECURE` 기본값이 `true`여서, 그대로 `docker compose up`을 하면 접속할 곳이 없고 HTTP에서는 브라우저가 로그인 쿠키를 버린다.
- 공개 이미지는 GHCR에 있고 기본 태그는 `latest`다. `DESKRPG_IMAGE`로 릴리스 태그를 고정할 수 있다. 예전 Docker Hub 이미지는 `2026.9.19`에서 멈춘 레거시다.
- 옵션 6은 포트를 `127.0.0.1`에만 묶는다. gateway URL은 `http://hermes:8642`, 토큰은 `HERMES_API_KEY` 값이다. 플러그인은 자동 설치되고 enable된다. 모델 provider 키(OpenRouter, OpenAI, Anthropic 중 하나)가 없으면 gateway가 시작하지 않는다. `HERMES_DASHBOARD_PASSWORD`를 지정하면 Hermes 대시보드가 localhost:9119에 열린다. 플러그인 갱신은 `up -d --force-recreate hermes`로 Hermes 서비스를 다시 만들어야 하고, 일반 `up -d`는 옛 플러그인을 유지한다.
- README는 빠른 시작에는 SQLite를, 장기 운영에는 PostgreSQL을 권한다.

### 3.8 Hostinger 배포

README 상단은 VPS 하나에서 오피스와 Hermes Agent를 상시 운영하는 Hostinger 경로를 안내한다.

- 새 VPS: Hostinger one-click 카탈로그에서 DeskRPG를 고른다. KVM 2 이상, 8GB 메모리를 권장한다.
- 기존 VPS: Docker Manager에 compose URL을 불러온다. 배포 후 "Enable HTTPS for Docker projects" 배너에서 Traefik을 배포하고, DeskRPG 프로젝트 환경에 `TRAEFIK_HOST=srvNNNNNN.hstgr.cloud`를 직접 추가해 다시 배포해야 HTTPS 주소가 생긴다.
- 기존 Hostinger 사용자는 compose 파일을 한 번 교체해야 한다. Update는 새 compose 파일을 읽지 않으므로 Hermes 플러그인 설치 부분이 처음 설정한 날의 상태로 남는다. compose에 `plugin-pin`이 없으면 네 단계 교체 절차를 따르며 데이터는 유지된다.

### 3.9 환경 변수

| 변수 | 의미 |
|---|---|
| `JWT_SECRET` | 인증 서명 키. 운영 환경에서는 반드시 실제 값을 지정한다 |
| `POSTGRES_PASSWORD` | PostgreSQL Docker 구성 |
| `DESKRPG_LOCAL_DISCOVERY_ENABLED` | 선택. loopback gateway가 호스트의 `~/.hermes/profiles`를 읽게 한다. 기본 꺼짐 |
| `DESKRPG_HOST_SETUP_ENABLED` | 선택. 로컬과 SSH gateway 설정 마법사는 기본적으로 `system_admin`에게 열려 있고 `0`이면 끈다 |
| `DESKRPG_FEEDBACK_URL` | 선택. 설문과 비공개 버그 리포트의 수신처. 빈 값이면 둘 다 끈다 |

### 3.10 외부로 전송하는 데이터

DeskRPG는 오피스, 직원, 대화에 관한 정보를 보내지 않는다. 브라우저에서 나갈 수 있는 것은 선택형 두 가지다.

- **사용 설문**: 맵에서 약 30분을 보내면 짧은 설문이 뜬다 (30일에 최대 1회). Send를 눌러야 전송되고 "Don't ask again"으로 영구히 끌 수 있다. 응답에는 답변, 앱 버전, UI 언어, 중복 판별용 무작위 설치 ID가 담긴다. 설문 질문은 식별자 없는 `GET /v1/survey`로 먼저 받아 온다.
- **비공개 버그 리포트**: 메뉴의 Report a bug에서 공개 GitHub issue와 비공개 리포트 중 고른다. 비공개 리포트는 입력 내용, 선택 연락처, 버전, 브라우저, 화면 크기, 최근 오류 줄을 담고 각각 전송 전에 보여 주며 체크 해제할 수 있다.

두 데이터는 관리자가 운영하는 `https://feedback.deskrpg.com`으로 가며, 서버는 rate limit용으로 IP의 salted hash만 저장한다. 맵은 새 버전 표시를 위해 DeskRPG 서버를 거쳐 GitHub API에서 star 수와 최신 릴리스를 조회하며 식별자는 보내지 않는다.

### 3.11 제품 노트

- 초대 코드가 있어도 로그인이 필요하다. 초대 코드는 채널 접근 보조 수단이지 익명 접근 토큰이 아니다.
- 오피스 레이아웃은 코드로 조립하고, three.js 렌더러는 버전이 붙은 GLB 가구, 건축, 캐릭터 모델과 직접 제작한 PBR 표면 텍스처를 쓴다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

README는 정량 벤치마크를 제시하지 않는다. 확인 가능한 운영 수치와 사양은 다음과 같다.

| 항목 | 값 |
|---|---|
| 캐릭터 외형 | 50종 (GLB 하나씩) |
| 오피스 환경 | 5종 |
| UI 언어 | 4개 (한국어, 영어, 일본어, 중국어) |
| 설치 경로 | 6가지 |
| 기본 포트 | npm과 로컬 3000, Docker 3102, Hermes gateway 8642, Hermes 대시보드 9119 |
| Hostinger 권장 사양 | KVM 2 이상, 메모리 8GB |
| 요구 플러그인 버전 | 0.31.1 (README 본문의 확인 절차는 0.30.x로 적혀 있다) |
| 설문 노출 조건 | 맵 체류 약 30분, 30일에 최대 1회 |

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **Hermes 전용**: 에이전트 런타임을 번들하지 않으며 Hermes gateway 외의 런타임 연결은 README에 없다.
- **플러그인 의존 기능**: kanban, 이벤트 스트림, cron은 gateway 호스트에 플러그인을 설치하고 enable해야 동작한다. 설치 순서(disable, force install, enable, restart)를 어기면 옛 버전이 남거나 404가 난다.
- **키 혼동 위험**: owner key 대신 보조 profile 키를 쓰면 보드와 스케줄이 `plugin_unauthorized`로 실패하지만 화면은 원인을 표시하지 않는다.
- **승인 정책의 조건부 적용**: `review_hooks_v1`이 없는 gateway에서는 카드가 승인 없이 완료된다.
- **배포 함정**: 루트 `docker-compose.yml`은 Hostinger 전용이라 로컬에서 그대로 쓰면 접속할 수 없다. Hostinger의 Update는 compose 파일을 다시 읽지 않는다.
- **버전 표기 불일치**: 상단 버전 노트는 plugin 0.31.1을 요구하지만 업그레이드 확인 절차는 0.30.x를 기대값으로 적는다.
- **라이선스 제약**: Sustainable Use License라 OSI 오픈소스가 아니며, 타인에게 관리형 서비스로 운영할 수 없다.
- **정량 평가 부재**: 에이전트 협업 품질이나 성능에 관한 측정은 제시하지 않는다.

## 6. 관련 연구 (Related Work)

- **Hermes Agent (NousResearch)**: DeskRPG가 연결하는 에이전트 런타임. profile, gateway, kanban, cron을 제공한다.
- **deskrpg-hermes-plugin**: kanban, 이벤트 스트림, cron route와 승인 정책을 Hermes gateway에 붙이는 동반 플러그인.
- [[applications/mantena-2026-hermes-gbrain-setup-vps]]: Hermes Agent가 실행 중인 VPS에 GBrain을 더하는 설정 가이드. 같은 Hermes 운영 환경을 다룬다.
- [[agents/stablyai-orca]]: 여러 코딩 에이전트를 한 화면에서 조율하는 오케스트레이터. DeskRPG와 같이 멀티에이전트 작업을 시각적으로 관리하는 도구다.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| Hermes gateway | Hermes Agent의 API 서버. DeskRPG가 대화, 회의, kanban, cron을 요청하는 대상이다 |
| profile (Hermes) | Hermes 안의 에이전트 단위. 자체 `API_SERVER_KEY`를 가지며 NPC 하나가 profile 하나에 묶인다 |
| listener owner key | gateway listener를 소유한 profile의 `API_SERVER_KEY`. kanban, cron, 이벤트 스트림 route 인증에 필요하다 |
| AI NPC | Hermes profile에 묶여 오피스에 배치된 AI 직원 캐릭터 |
| `SOUL.md` | NPC의 성격과 지시를 담은 Hermes profile 파일. DeskRPG 웹에서 편집한다 |
| deskrpg-hermes-plugin | kanban, 이벤트 스트림, cron route를 gateway에 붙이는 Hermes 플러그인 |
| `review_hooks_v1` | 플러그인 0.27.0부터 제공하는 카드 승인 정책 capability |
| floor control | 회의에서 발언권을 한 참가자에게 주고 넘기는 제어 |
| blueprint (스케줄) | 자주 쓰는 cron 스케줄을 빠르게 만드는 템플릿 |

## 8. 그림 후보 (Figure Candidates)

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | "DeskRPG 첫 화면. 왼쪽에 로그인 폼, 오른쪽에 아이소메트릭 3D 오피스 거리가 보인다" | manual | ★ wiki 권장 (overview) |
| fig02 | "3D 오피스로 출근하는 캐릭터들의 아침 장면 애니메이션" | manual | (GIF 약 9.2MB, 보류) |
| fig03 | "호출받은 AI NPC가 사용자 캐릭터 옆으로 걸어와 보고하는 장면 애니메이션" | manual | (GIF 약 5.6MB, 보류) |
| fig04 | "오피스 안에서 캐릭터들이 실시간으로 잡담하는 장면 애니메이션" | manual | (GIF 약 7.9MB, 보류) |
| fig05 | "회의 공간에서 AI NPC들이 회의를 진행하는 장면 애니메이션" | manual | (GIF 약 8.8MB, 보류) |

repos는 이미지를 자동으로 받아오지 않는다. fig01은 README 상단 스크린샷(PNG, 약 0.6MB)으로 제품 외형을 한 장에 보여 주므로 `raw` URL에서 받아 `wiki/assets/dandacompany-deskrpg/`에 저장하고 wiki에 임베드했다. fig02부터 fig05는 각각 5MB를 넘는 GIF라 저장소 용량을 고려해 URL만 기록하고 curated: false로 남겼다.
