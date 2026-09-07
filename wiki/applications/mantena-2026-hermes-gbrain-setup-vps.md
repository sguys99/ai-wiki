---
title: "Hermes + GBrain: A Complete Setup Guide"
type: article
year: 2026
category: applications
raw_path: raw/articles/mantena-2026-hermes-gbrain-setup-vps.md
raw_filename: "mantena-2026-hermes-gbrain-setup-vps.md"
source: mantena-2026-hermes-gbrain-setup-vps.md
source_collection: external
author: "Sudhir Mantena"
url: "https://escvelocity.com/hermes-gbrain-setup-vps/"
publisher: "escvelocity.com"
publication_date: "2026-05-06"
updated: "2026-05-15"
tags: [gbrain, hermes, tutorial, vps, aws, ec2, ubuntu, bun, pglite, cron, x-twitter, oauth-pkce, ngrok-bypass]
---

## 요약

Sudhir Mantena가 자신의 AWS EC2 VPS에 GBrain을 설치하고 X(Twitter) 활동까지 자동으로 모아 넣기까지의 과정을 4부로 나누어 적은 운영 가이드다. 다루는 범위는 설치, 콘텐츠 ingest, 본인 게시물과 리포스트 수집, likes 수집이다.

이 글의 성격은 개념 소개가 아니라 절차 기록에 가깝다. 각 단계마다 실행할 명령, 확인 방법, 실패했을 때 나타나는 증상이 함께 적혀 있고, 저자가 실제로 겪은 두 가지 실패(PATH 누락과 slug 불일치)가 별도 항목으로 남아 있다.

전체를 관통하는 목표는 비용이다. 저자는 X API의 월 200달러 Basic tier와 터널링 서비스 ngrok의 월 8달러를 모두 쓰지 않고 같은 결과를 얻는 구성을 제시한다. 전자는 pay-per-use 크레딧으로, 후자는 VPS가 이미 가진 public IP로 대체한다.

## 배경

### GBrain이 맡는 역할

GBrain은 Garry Tan이 만든 오픈소스 개인 지식 시스템이다. 본문은 Garry Tan을 Y Combinator의 President이자 CEO로 소개한다.

이 시스템이 겨냥하는 자리는 대화가 끝나면 내용을 잃어버리는 챗봇의 반대편이다. AI 에이전트가 계속 읽고 쓰는 지속적 메모리 층으로 동작하며, 새 자료가 더해질수록 내용이 누적되는 구조화된 markdown 페이지를 유지한다. 본문은 이 구조가 Andrej Karpathy의 LLM Wiki 패턴과 맞닿는다고 설명한다.

본문이 나열한 GBrain의 핵심 능력은 다섯 가지다.

- 기사, PDF, 트윗, 이메일, 대화록의 ingest
- 타입이 지정된 개체 관계를 갖는 knowledge graph 구축
- vector 검색과 keyword 검색과 graph traversal을 결합한 hybrid search
- 자동 유지보수 주기를 통한 자기 관리
- 새 정보가 들어올 때마다 이어지는 지속적 개선

### 이 가이드가 전제하는 환경

이 글은 빈 서버에서 시작하지 않는다. Hermes Agent가 이미 실행 중인 VPS를 출발점으로 삼고, 그 위에 GBrain을 더하는 순서로 진행한다.

| 항목 | 요구 사항 |
|---|---|
| 서버 | AWS EC2 VPS, t3.medium 인스턴스 권장 |
| 운영체제 | Ubuntu 24 |
| 에이전트 | Hermes Agent가 설치돼 동작 중인 상태 |
| 사용자 역량 | 터미널 사용 경험 |
| 외부 계정 | X 개발자 계정, 개인 용도라면 무료 티어로 충분 |

Hermes는 이 구성에서 실행 주체를 맡는다. 사용자가 자연어로 지시하면 스킬을 읽고, 콘텐츠를 가져와 처리한 다음, 결과 markdown을 brain 저장소에 쓴다. 본문은 Hermes의 제작 주체나 내부 구조를 설명하지 않으므로, 이 페이지도 그 범위 안에서만 서술한다.

### 두 가지 지출을 피하는 구성

저자가 서두에서 밝힌 목표는 스스로 개선되고 항상 켜져 있는 개인 지식 베이스를 만들되, X API에 월 200달러를 내지 않고 ngrok에 월 8달러를 내지 않는 것이다. 4부 구성 중 3부와 4부가 이 목표를 각각 담당한다.

| 지출 항목 | 원래 비용 | 이 구성의 대체 수단 |
|---|---|---|
| X API Basic tier | 월 200달러 | pay-per-use 크레딧, 리소스 1건당 0.001달러 |
| ngrok | 월 8달러 | VPS가 이미 가진 public IP를 OAuth callback 호스트로 사용 |

Basic tier를 피하는 이유는 가격만이 아니다. 본문은 이 티어가 미국 밖에서는 구매할 수 없다는 점을 함께 지적한다. 따라서 미국 외 사용자에게 pay-per-use 크레딧은 선택지가 아니라 유일한 경로다.

## 핵심 개념

### brain repo와 gbrain repo의 분리

이 가이드에서 가장 먼저 강조되는 규칙은 디렉토리 두 개를 섞지 않는 것이다. 저자는 GBrain 코드가 들어 있는 `~/gbrain`을 brain repo로 쓰지 말라고 명시한다.

| 디렉토리 | 담는 것 | 만드는 방법 |
|---|---|---|
| `~/gbrain` | GBrain 코드 자체 | 저장소 clone |
| `~/brain` | 사용자의 지식 데이터 | 디렉토리 생성 후 `git init`과 빈 commit |

brain repo를 빈 commit으로 시작하는 이유는 sync 명령이 git 저장소를 대상으로 동작하기 때문이다. 첫 commit이 없으면 저장소로서 아직 성립하지 않은 상태가 된다.

### non-interactive shell과 PATH

Hermes가 명령을 실행하는 방식이 이 셋업의 첫 번째 함정을 만든다. Hermes는 명령을 non-interactive shell로 spawn하는데, 이 shell은 사용자의 대화형 셸 설정을 그대로 물려받지 않는다.

그래서 `~/.bashrc`에만 Bun 경로를 넣으면 사람이 직접 실행할 때는 성공하지만 Hermes가 실행할 때는 명령을 찾지 못한다. 해결책은 로그인 셸이 읽는 `~/.profile`에 경로를 추가하는 것이다. 저자는 이 단계에 "Critical" 표시를 달았다.

### slug와 파일 경로의 일치

두 번째 함정은 Hermes가 하위 디렉토리에 파일을 쓸 때 나타난다. 예를 들어 Hermes가 `~/brain/notes/article.md`를 만들면, 그 파일 frontmatter의 `slug` 값이 경로와 어긋날 수 있다.

본문은 slug 불일치가 sync 실패를 일으킨다고 못 박는다. 대응 방법은 두 가지이며 둘 중 하나만 적용하면 된다.

| 방법 | 처리 | 결과 |
|---|---|---|
| slug 줄 삭제 | frontmatter에서 `slug:` 줄을 지운다 | GBrain이 파일 경로에서 slug를 유도한다 |
| 경로와 맞춘 값 지정 | `slug: notes/article`처럼 하위 디렉토리를 포함해 적는다 | 값과 경로가 일치한다 |

### 토큰 세 종류의 역할

X 연동에는 성격이 다른 토큰이 등장한다. 3부는 앱 권한만으로 충분하지만, 4부에서 다루는 likes는 사용자 컨텍스트 권한을 요구하기 때문에 토큰이 늘어난다.

| 토큰 | 권한 범위 | GBrain config 저장 키 |
|---|---|---|
| Bearer Token | 앱 권한. 본인 게시물과 리포스트 조회에 사용 | `secrets.X_BEARER_TOKEN` |
| user access token | 사용자 컨텍스트 권한. likes 조회에 필요 | `secrets.X_USER_ACCESS_TOKEN` |
| refresh token | 액세스 토큰이 만료됐을 때 재발급에 사용 | `secrets.X_USER_REFRESH_TOKEN` |

시크릿을 별도 env 파일이 아니라 GBrain config에 넣는 것이 이 가이드의 일관된 선택이다. cron 항목이 실행 시점에 `gbrain config get`으로 값을 읽어 환경 변수로 주입하므로, 평문 설정 파일을 따로 관리할 필요가 없다.

## 방법

### 1부 GBrain 설치

설치는 일곱 단계이며, 각 단계마다 확인 명령이 따로 지정돼 있다. 확인 명령이 기대한 값을 돌려주지 않으면 다음 단계로 넘어가지 않는 구성이다.

| 단계 | 하는 일 | 확인 방법 |
|---|---|---|
| 1 | Bun 설치 | `which bun`이 `/home/ubuntu/.bun/bin/bun`을 반환 |
| 2 | 저장소 clone과 의존성 설치, 전역 링크 | `gbrain --version`이 `gbrain 0.22.x`를 반환 |
| 3 | `~/.profile`에 Bun 경로 추가 | `bash -c 'which gbrain'`이 절대 경로를 반환 |
| 4 | brain repo 생성 | `~/brain`에 빈 commit이 존재 |
| 5 | GBrain 초기화 | PGLite 기본값으로 초기화 완료 |
| 6 | 5분 주기 sync cron 등록 | `~/brain/sync.log`에 기록이 쌓임 |
| 7 | 헬스체크 실행 | `gbrain doctor` 통과 |

1단계와 2단계의 명령은 다음과 같다.

```bash
curl -fsSL https://bun.sh/install | bash
source ~/.bashrc
which bun  # /home/ubuntu/.bun/bin/bun

git clone https://github.com/garrytan/gbrain ~/gbrain
cd ~/gbrain
bun install
bun link
gbrain --version  # gbrain 0.22.x
```

3단계가 앞서 설명한 PATH 문제를 해결하는 자리다. `~/.profile`에 경로를 더한 뒤 Hermes와 같은 방식으로 조회해 확인한다.

```bash
echo 'export PATH="$HOME/.bun/bin:$PATH"' >> ~/.profile
source ~/.profile
bash -c 'which gbrain'  # /home/ubuntu/.bun/bin/gbrain
```

4단계와 5단계는 데이터가 쌓일 저장소를 코드와 분리해 만든다. `gbrain init`은 별도 지정이 없으면 PGLite를 선택하며, 본문은 이 엔진이 서버를 요구하지 않고 설정도 필요 없다는 점을 언급한다.

```bash
mkdir ~/brain
cd ~/brain
git init
git commit --allow-empty -m "init brain repo"
gbrain init
```

6단계는 brain 저장소의 변경을 GBrain 데이터베이스에 반영하는 cron을 건다. 주기는 5분이고, 실행 결과는 로그 파일에 누적된다.

```bash
*/5 * * * * /home/ubuntu/.bun/bin/gbrain sync --repo /home/ubuntu/brain >> /home/ubuntu/brain/sync.log 2>&1
```

### 2부 콘텐츠 ingest

저자는 이 부분에서 자신이 처음에 잘못 이해했던 내용을 그대로 적는다. README를 읽고 문서를 직접 markdown으로 변환해 수동으로 ingest해야 한다고 판단했고, 그 방식으로 시간을 썼다는 것이다.

이후 방향을 바꾼 계기는 실행 주체를 다시 본 데 있다. 서버에는 이미 파일을 읽고 쓸 수 있는 Hermes가 있으므로, 변환과 ingest를 사람이 아니라 Hermes에게 맡기는 편이 낫다고 판단했다.

바뀐 흐름은 여섯 단계로 진행된다.

| 순서 | 주체 | 하는 일 |
|---|---|---|
| 1 | 사용자 | Hermes에게 ingest를 지시한다 |
| 2 | Hermes | ingest 스킬을 읽는다 |
| 3 | Hermes | 콘텐츠를 가져와 처리한다 |
| 4 | Hermes | `~/brain/`에 markdown을 쓴다 |
| 5 | cron | 5분마다 sync를 실행한다 |
| 6 | GBrain | 들어온 내용을 색인한다 |

사용자가 실제로 보내는 지시는 한 문장이다. 본문이 제시한 형태는 "Ingest this PDF: [URL or file path]. Write the brain page to ~/brain/"이며, 대상이 URL이든 로컬 파일 경로든 같은 형식을 쓴다.

이 흐름에서 사람이 직접 처리하는 일은 지시 한 줄뿐이다. 나머지 다섯 단계는 Hermes와 cron과 GBrain이 나눠 맡는다.

앞서 설명한 slug 불일치가 발생하면 실패 기록이 파일에 쌓인다. 원인을 고친 뒤 다음 두 줄로 실패 목록을 비우고 다시 sync한다.

```bash
> ~/.gbrain/sync-failures.jsonl
gbrain sync --repo ~/brain --skip-failed
```

### 3부 본인 게시물과 리포스트 수집

3부는 X에서 자신의 게시물과 리포스트를 가져와 brain에 넣는 경로를 만든다. 준비물은 세 가지다.

| 준비물 | 설명 |
|---|---|
| X 개발자 계정 | 개인 게시물 수집에는 무료 티어로 충분하다 |
| Bearer Token | X 개발자 포털에서 발급받는다 |
| 크레딧 | 리소스 1건당 0.001달러이며, 25달러 충전과 auto-recharge 설정을 권한다 |

첫 단계는 토큰을 GBrain config에 저장하는 것이고, 두 번째는 API 호출에 필요한 숫자 사용자 ID를 조회하는 것이다. 핸들 문자열이 아니라 숫자 ID가 필요하다는 점이 이 단계의 요지다.

```bash
gbrain config set secrets.X_BEARER_TOKEN "your_token_here"

export X_BEARER_TOKEN=$(gbrain config get secrets.X_BEARER_TOKEN | tr -d '[:space:]')
curl -sf -H "Authorization: Bearer $X_BEARER_TOKEN" \
  "https://api.x.com/2/users/by/username/YOUR_HANDLE" | python3 -m json.tool
```

세 번째 단계에서 collector 제작을 Hermes에게 위임한다. 저자는 Hermes CLI에 보낸 지시문을 그대로 공개하는데, 그 안에 담긴 항목은 다음과 같다.

| 항목 | 전달한 내용 |
|---|---|
| X 핸들 | 본인 핸들 |
| 숫자 사용자 ID | 앞 단계에서 조회한 값 |
| 토큰 위치 | `X_BEARER_TOKEN`이 gbrain config에 이미 저장돼 있다는 사실 |
| brain repo | `~/brain` |
| 수집 대상 | 본인 게시물, likes, 리포스트만 |
| keyword 검색 | 구성하지 않는다 |
| 북마크 | 당분간 제외한다 |
| cron 배치 | 기존 cron과 실행 시각이 겹치지 않게 배치한다 |
| 후처리 | 첫 수집이 끝나면 트윗을 brain 페이지로 gbrain에 ingest한다 |

지시문의 구성은 위임의 성격을 보여준다. 값(핸들, ID, 경로)과 범위 제한(대상, 제외 항목)과 후처리를 함께 넘겨서, Hermes가 스스로 결정할 여지를 좁힌 형태다.

collector가 등록되는 cron 항목은 실행 시점에 토큰을 읽어 환경 변수로 넘기고, 출력은 별도 로그 파일에 쌓는다.

```bash
13,43 * * * * X_BEARER_TOKEN=$(/home/ubuntu/.bun/bin/gbrain config get secrets.X_BEARER_TOKEN) /usr/bin/python3 /home/ubuntu/.gbrain/integrations/x-to-brain/x_to_brain.py >> /home/ubuntu/.gbrain/integrations/x-to-brain/collector.log 2>&1
```

마지막 단계는 일정 조정이다. 처음 설정한 30분 간격은 개인 용도에 과하고 API 크레딧을 불필요하게 소모하므로 하루 두 번으로 줄인다.

| 시점 | cron 표현 | 하루 실행 횟수 | 평가 |
|---|---|---|---|
| 최초 설정 | `13,43 * * * *` | 48회 | 개인 용도에 과하고 크레딧을 소모한다 |
| 조정 후 | `0 8,20 * * *` | 2회 | 개인 용도에 충분하다 |

동작 확인은 cron을 기다리지 않고 스크립트를 직접 실행해서 한다. 이때 반환되는 JSON이 수집 결과를 요약한다.

```bash
export X_BEARER_TOKEN=$(gbrain config get secrets.X_BEARER_TOKEN | tr -d '[:space:]')
python3 /home/ubuntu/.gbrain/integrations/x-to-brain/x_to_brain.py
# {"own_total": 399, "likes_total": 0, "own_new": 7}
```

### 4부 OAuth 2.0으로 likes 수집

3부까지의 구성으로는 likes를 가져올 수 없다. X의 liked_tweets 엔드포인트가 앱 권한이 아니라 OAuth 2.0 사용자 컨텍스트를 요구하기 때문이다.

일반적인 해결책은 로컬에서 OAuth 흐름을 돌리기 위해 ngrok 같은 터널링 서비스로 공개 callback 주소를 만드는 것이다. 저자는 그럴 필요가 없다고 지적한다. AWS VPS는 이미 public IP를 가지고 있으므로 그 주소를 callback 호스트로 직접 쓰면 된다.

전체 절차는 다섯 단계이며, 포트를 열고 닫는 두 단계가 앞뒤를 감싼다.

| 단계 | 하는 일 | 위치 |
|---|---|---|
| 1 | OAuth 2.0 활성화와 callback URL 등록 | X 개발자 포털의 User authentication settings |
| 2 | 8000 포트 인바운드 규칙 추가 | AWS 콘솔의 EC2 Security Groups |
| 3 | PKCE 스크립트 실행과 토큰 저장 | VPS와 노트북 브라우저 |
| 4 | collector가 likes에 사용자 토큰을 쓰도록 수정 | VPS |
| 5 | 8000 포트 인바운드 규칙 삭제 | AWS 콘솔의 EC2 Security Groups |

1단계에서 등록하는 callback URL은 `http://YOUR_VPS_IP:8000/callback` 형식이며, 같은 화면에서 Client ID와 Client Secret을 확보한다. 2단계의 보안 그룹 규칙은 Custom TCP, 포트 8000, 소스 0.0.0.0/0으로 추가한다. 저자는 이 포트가 한 번만 필요하니 절차가 끝나면 닫으라고 강조한다.

3단계에서는 PKCE 스크립트 작성을 다시 Hermes에게 맡긴다. 스크립트 위치는 `~/x-oauth.py`이고, Client ID와 Client Secret과 callback URL과 scope를 함께 넘긴다.

| scope | 용도 |
|---|---|
| `tweet.read` | 게시물 읽기 |
| `users.read` | 사용자 정보 읽기 |
| `like.read` | likes 읽기 |
| `offline.access` | refresh token 발급 |

스크립트는 8000 포트에서 callback을 기다리다가 받은 토큰을 `gbrain config`의 사용자 토큰 키와 refresh 토큰 키에 저장한다. 실행 순서에서 주의할 점은 브라우저를 여는 위치다. 스크립트는 VPS에서 실행하되, 출력된 인증 URL은 노트북 브라우저에서 연다. 승인하면 X가 VPS IP로 redirect하고, VPS에서 대기 중이던 스크립트가 그 요청을 받아 토큰을 저장한다.

```bash
python3 ~/x-oauth.py
```

4단계는 collector가 likes를 가져올 때 사용자 액세스 토큰을 쓰도록 고치는 작업이다. 토큰은 gbrain config에서 읽으며, 401 응답이 오면 refresh 토큰으로 갱신한 뒤 새 토큰을 다시 저장하는 처리를 넣는다. 본문은 `offline.access` scope로 받은 refresh token이 만료되지 않는다고 인용한다.

### 완성된 구성

네 부분이 모두 연결되면 데이터는 한 방향으로 흐른다. X 활동이 collector를 거쳐 markdown 파일이 되고, sync가 그것을 데이터베이스에 반영하며, Hermes가 응답할 때 그 데이터베이스를 조회한다.

```
X 활동
  ↓ (매일 08시와 20시)
x_to_brain.py collector
  ├── Bearer token → 본인 게시물과 리포스트
  └── OAuth 2.0 token → likes (자동 갱신)
  ↓
~/brain/ markdown 파일
  ↓ (5분마다)
gbrain sync cron
  ↓
GBrain 데이터베이스 (PGLite)
  ↓
Hermes agent가 brain을 조회
  → 모든 응답에 전체 컨텍스트 반영
```

운영 상태에서 남는 crontab 항목은 두 줄뿐이다. 하나는 5분 주기 sync이고 다른 하나는 하루 두 번 실행되는 collector다.

```bash
# GBrain sync, 5분마다
*/5 * * * * /home/ubuntu/.bun/bin/gbrain sync --repo /home/ubuntu/brain >> /home/ubuntu/brain/sync.log 2>&1

# X collector, 매일 08시와 20시
0 8,20 * * * X_BEARER_TOKEN=$(/home/ubuntu/.bun/bin/gbrain config get secrets.X_BEARER_TOKEN) /usr/bin/python3 /home/ubuntu/.gbrain/integrations/x-to-brain/x_to_brain.py >> /home/ubuntu/.gbrain/integrations/x-to-brain/collector.log 2>&1
```

### 실패 지점 정리

본문 곳곳에 흩어진 실패 사례를 한자리에 모으면 다음과 같다. 네 항목 모두 저자가 직접 겪었거나 본문이 경고로 남긴 것이다.

| 증상 | 원인 | 대응 |
|---|---|---|
| Hermes가 `gbrain` 명령을 찾지 못한다 | non-interactive shell이 PATH를 상속하지 않는다 | `~/.profile`에 Bun 경로를 추가한다 |
| sync 실패가 계속 쌓인다 | frontmatter의 slug와 파일 경로가 어긋난다 | slug 줄을 지우거나 경로에 맞춘 뒤 실패 목록을 비우고 `--skip-failed`로 재시도한다 |
| likes 수집이 0건에 머문다 | Bearer Token만으로는 liked_tweets에 접근할 수 없다 | OAuth 2.0 사용자 컨텍스트 토큰을 발급받는다 |
| API 크레딧이 빠르게 줄어든다 | 30분 간격 폴링이 개인 용도에 과하다 | 하루 두 번으로 일정을 조정한다 |

## 결과

이 글은 정량 벤치마크를 제시하지 않는다. 운영 가이드 성격이라 검색 품질이나 지연 시간 측정은 범위 밖이다.

대신 확인 가능한 산출물 두 가지가 남는다. 첫째는 collector를 직접 실행했을 때 돌아오는 JSON이다. `{"own_total": 399, "likes_total": 0, "own_new": 7}`은 본인 게시물 399건을 확인했고 그중 신규가 7건이며, OAuth를 설정하기 전이라 likes는 0건이라는 뜻이다. 둘째는 `gbrain --version`이 반환한 `gbrain 0.22.x`로, 이 문서가 작성된 시점의 버전을 알려준다.

비용 측면의 결과는 서두의 목표와 그대로 맞물린다. 월 208달러가 나갈 자리를 25달러 크레딧 충전 하나로 대체했고, 크레딧은 리소스 1건당 0.001달러씩 소모된다.

| 항목 | 대체 전 | 대체 후 |
|---|---|---|
| X API 접근 | Basic tier 월 200달러 | pay-per-use 크레딧 25달러 충전 |
| OAuth callback 호스트 | ngrok 월 8달러 | VPS public IP, 추가 비용 없음 |

## 한계

- **raw가 원문 전문이 아니다**. 이 저장소에 보관된 raw는 원본 웹 페이지를 WebFetch로 뽑은 본문 디지스트이며, 파일 머리말이 일부 문장을 모델이 발췌하고 재구성했을 수 있다고 밝힌다. 명령어와 cron 항목과 JSON 출력은 코드 블록으로 보존돼 신뢰도가 높지만, 서술 문장은 원문 표현과 다를 수 있다.
- **버전 시차**. 문서는 `gbrain 0.22.x`를 기준으로 쓰였다. GBrain 저장소는 이후에도 갱신되므로 명령 구성이 달라질 수 있으며, 실행 시점의 README를 먼저 확인해야 한다. 현재 버전이 무엇인지는 이 자료가 밝히지 않는다.
- **OAuth 절차 동안의 포트 노출**. 8000 포트를 0.0.0.0/0으로 여는 시간이 짧더라도 공개 노출 구간이 생긴다. 본문은 절차가 끝나면 포트를 닫으라고 안내할 뿐, state 검증 같은 PKCE 세부 항목은 다루지 않는다.
- **refresh token 영속성 가정**. `offline.access`가 만료되지 않는 refresh token을 준다는 서술은 X의 정책에 의존한다. 정책이 바뀌면 이 전제도 함께 바뀐다.
- **단일 운영자 전제**. 하나의 VPS와 한 사람의 계정을 전제로 한다. 팀 공유나 여러 대의 기기에서 접근하는 구성은 다루지 않는다.

다루지 않는 항목을 따로 모으면 이 가이드의 경계가 분명해진다.

| 범위 밖 항목 | 참고할 곳 |
|---|---|
| 임베딩 제공자 선택과 검색 품질 튜닝 | [[applications/garrytan-gbrain]] |
| brain 스키마 설계와 페이지 배치 규칙 | [[applications/techwealth-hub-2026-garry-tan-gbrain-explained]] |
| 팀 단위 공유 구성 | [[applications/garrytan-gbrain-tutorials]] |
| 백업과 복구 절차 | 이 자료와 연결된 다른 자료 모두 다루지 않음 |

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| Hermes Agent | 이 가이드가 전제로 삼는 에이전트 플랫폼. 스킬을 읽고 콘텐츠를 가져와 처리한 뒤 markdown을 쓰는 실행 주체다 |
| PGLite | `gbrain init`이 선택하는 기본 엔진. 본문은 서버가 필요 없고 별도 설정이 없다는 점만 언급한다 |
| brain repo와 gbrain repo | 전자는 사용자 데이터가 쌓이는 `~/brain`, 후자는 코드가 있는 `~/gbrain`이다. 섞어 쓰지 말라고 본문이 못 박는다 |
| slug | 페이지 frontmatter 필드. 하위 디렉토리에 페이지를 쓰면 값이 경로와 일치해야 sync가 성공한다 |
| PKCE | OAuth 2.0의 확장. client secret을 안전하게 보관하기 어려운 클라이언트에서 인증 코드 교환을 보호한다 |
| offline.access scope | X OAuth 2.0에서 refresh token 발급을 여는 scope. 본문은 이 토큰이 만료되지 않는다고 인용한다 |

## 관련 페이지

- [[applications/garrytan-gbrain]]: 이 가이드가 설치하고 운영하는 시스템의 공식 저장소 문서다. 설계 사상과 엔진 선택지가 여기에 있다.
- [[applications/garrytan-gbrain-tutorials]]: 같은 저장소의 공식 튜토리얼 모음으로 개인 brain과 회사 brain 셋업을 다룬다. 이 페이지는 그와 달리 AWS EC2 VPS와 Hermes 조합이라는 특정 배포 경로를 담당한다.
- [[applications/gajjar-2026-gbrain-vs-computer-memory]]: GBrain을 manual ingestion으로 규정한 비교 자료다. 이 가이드의 Hermes 위임 패턴은 그 규정이 도구 조합에 따라 달라진다는 점을 보여준다.
- [[applications/vectorize-2026-gbrain-review-honest-assessment]]: 30분 설치와 단일 운영자 범위라는 평가를 담은 리뷰다. 이 페이지의 실제 절차와 대조해 읽을 수 있다.
- [[applications/techwealth-hub-2026-garry-tan-gbrain-explained]]: sync가 실제로 동작했는지 확인하는 verification runbook을 강조한 자료다. 이 가이드의 `gbrain doctor`와 로그 확인이 같은 목적을 갖는다.
