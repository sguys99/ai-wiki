---
title: "Hermes + GBrain: A Complete Setup Guide"
type: article
year: 2026
category: applications
raw_path: raw/articles/mantena-2026-hermes-gbrain-setup-vps.md
raw_filename: "mantena-2026-hermes-gbrain-setup-vps.md"
source_collection: external
author: "Sudhir Mantena"
url: "https://escvelocity.com/hermes-gbrain-setup-vps/"
publisher: "escvelocity.com"
publication_date: "2026-05-06"
updated: "2026-05-15"
tags: [gbrain, hermes, tutorial, vps, aws, ec2, ubuntu, bun, pglite, cron, x-twitter, oauth-pkce, ngrok-bypass]
---

## 한 줄 요약 (One-line Summary)

Sudhir Mantena가 Hermes Agent가 이미 올라간 AWS EC2 VPS 위에 GBrain을 설치하는 절차, Hermes에게 콘텐츠 ingest를 위임하는 패턴, X(Twitter)의 월 200달러 Basic tier와 월 8달러 ngrok을 모두 쓰지 않고 본인 게시물과 리포스트와 likes를 수집하는 방법까지를 4부 구성으로 적은 운영 가이드다.

## 1. 자료 정보 (Document Information)

- **저자**: Sudhir Mantena
- **매체**: escvelocity.com, Artificial Intelligence 카테고리
- **URL**: <https://escvelocity.com/hermes-gbrain-setup-vps/>
- **게시와 갱신**: 2026-05-06 게시, 2026-05-15 갱신
- **전제 환경**: AWS EC2 t3.medium 권장, Ubuntu 24, Hermes Agent 사전 설치
- **목적 인용**: "a self-improving, always-on personal knowledge base that ingests my blog articles, X activity (posts, articles, likes), news articles from the web, research reports and documents; all without paying \$200/mo for X API or \$8/mo for ngrok."
- **자료 성격**: 원본 웹 페이지를 WebFetch로 추출한 본문 디지스트가 raw에 저장돼 있다. raw 파일 머리말이 밝히듯 일부 문장은 모델이 발췌하고 재구성한 결과이므로, 인용문 외의 서술은 원문 그대로가 아닐 수 있다.
- **같은 매체의 관련 글 목록**: Hermes로 잠재 고객을 찾아 Google Sheets에 저장하는 사례, Google Sheets를 쓰는 WordPress 문의 양식, Slack과 WhatsApp 대화를 Hermes와 GBrain 장기 메모리에 저장하기, Hermes와 Notion과 GBrain 셋업 가이드, AWS EC2 위의 Hermes AI Agent, AWS VPS 위의 Hermes AI Agent 셋업, Size Is Not a Moat.

## 2. 주요 기여 (Key Contributions)

1. **PATH 문제와 해결책**. Hermes는 명령을 non-interactive shell로 spawn하기 때문에 `~/.bashrc`에만 경로를 넣으면 `bun`과 `gbrain`을 찾지 못한다. `~/.profile`에 `export PATH="$HOME/.bun/bin:$PATH"`를 추가한 다음 `bash -c 'which gbrain'`이 `/home/ubuntu/.bun/bin/gbrain`을 반환하는지로 확인한다. 저자가 이 단계에 "Critical" 표시를 달았다.
2. **brain repo와 GBrain 코드 디렉토리의 분리**. `~/gbrain`은 코드이고 `~/brain`이 데이터다. 저자는 `~/gbrain`을 brain repo로 쓰지 말라고 명시한다. brain repo는 `git init` 이후 빈 commit으로 시작한다.
3. **PGLite 기본값과 5분 주기 sync cron**.
   ```bash
   */5 * * * * /home/ubuntu/.bun/bin/gbrain sync --repo /home/ubuntu/brain >> /home/ubuntu/brain/sync.log 2>&1
   ```
4. **수동 변환이 아니라 Hermes 위임으로 전환한 ingest 경험**. 저자는 README를 처음 읽고 문서를 직접 markdown으로 바꿔 수동으로 ingest해야 한다고 이해했고, 그렇게 시간을 썼다고 적는다. 이후 Hermes에게 파일을 ingest하고 markdown을 자동 생성하게 하는 편이 낫겠다고 판단해 방식을 바꿨다. 실제 지시문은 "Ingest this PDF: [URL or file path]. Write the brain page to ~/brain/" 형태다.
5. **slug와 경로 불일치 트러블슈팅**. Hermes가 하위 디렉토리에 파일을 쓰면 frontmatter의 `slug` 값이 경로와 맞아야 sync가 성공한다. `slug:` 줄을 지워 GBrain이 경로에서 유도하게 하거나, `slug: notes/article`처럼 하위 디렉토리를 포함해 적는다. 불일치는 sync 실패를 일으키며, `~/.gbrain/sync-failures.jsonl`을 비운 뒤 `gbrain sync --repo ~/brain --skip-failed`로 정리한다.
6. **X Basic tier 우회**. 월 200달러 Basic tier는 미국 밖에서 구매할 수 없으므로 리소스 1건당 0.001달러인 pay-per-use credits 모델을 쓴다. 저자는 25달러 충전으로 시작하고 auto-recharge를 켜라고 권한다.
7. **시크릿을 GBrain config에 저장**. 별도 env 파일을 두지 않고 `gbrain config set secrets.X_BEARER_TOKEN "..."`으로 저장한 뒤, cron이 그 값을 읽어 Python 스크립트에 주입한다. 사용자 숫자 ID는 다음으로 조회한다.
   ```bash
   curl -sf -H "Authorization: Bearer $X_BEARER_TOKEN" \
     "https://api.x.com/2/users/by/username/YOUR_HANDLE" | python3 -m json.tool
   ```
8. **VPS public IP를 OAuth callback으로 쓰는 ngrok 우회**. X의 liked_tweets 엔드포인트는 OAuth 2.0 사용자 컨텍스트를 요구한다. 저자는 AWS VPS가 이미 public IP를 가지고 있으니 그것을 그대로 쓰라고 제안한다. callback URL을 `http://YOUR_VPS_IP:8000/callback`으로 지정한 다음 EC2 Security Group에서 8000 포트를 연다. Hermes가 만든 PKCE 스크립트를 실행해 토큰을 받은 뒤 곧바로 포트를 닫는다. `offline.access` scope가 만료되지 않는 refresh token을 준다고 인용한다.
9. **운영 cron 튜닝**. 처음 설정한 30분 간격은 개인 용도에 과하고 API 크레딧을 불필요하게 소모하므로, 하루 두 번인 `0 8,20 * * *`로 조정한다.
10. **전체 구성 다이어그램과 crontab 요약**. X 활동을 하루 두 번 수집하는 collector, 5분마다 실행되는 sync, PGLite 데이터베이스, 그것을 조회하는 Hermes까지의 경로를 한 그림으로 제시한다. crontab 항목 두 줄은 따로 모아 준다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 GBrain 소개 부분

본문은 GBrain을 Garry Tan이 만든 오픈소스 개인 지식 시스템으로 소개한다. Garry Tan의 직함은 Y Combinator President이자 CEO로 적혀 있다. 상태를 유지하지 않는 챗봇 대신 AI 에이전트의 지속적 메모리 층으로 동작하며, 새 자료가 더해질수록 내용이 누적되는 구조화된 markdown 페이지를 유지한다는 점에서 Andrej Karpathy의 LLM Wiki 패턴과 맞닿는다고 서술한다.

본문이 나열한 핵심 능력은 다섯 가지다.

- 기사, PDF, 트윗, 이메일, 대화록의 ingest
- 타입이 지정된 개체 관계를 갖는 knowledge graph 구축
- vector 검색과 keyword 검색과 graph traversal을 결합한 hybrid search
- 자동 유지보수 주기를 통한 자기 관리
- 새 정보에 따른 지속적 개선

### 3.2 4부 구성

- **1부 GBrain 설치**. Bun 설치, 저장소 clone, `bun install`과 `bun link`, PATH 수정, brain repo 분리, `gbrain init`, 5분 cron 등록, `gbrain doctor` 순서다.
- **2부 콘텐츠 ingest**. 사용자 지시에서 색인까지 여섯 단계다. 사용자가 Hermes에게 ingest를 지시한다. Hermes가 ingest 스킬을 읽는다. Hermes가 콘텐츠를 가져와 처리한다. Hermes가 `~/brain/`에 markdown을 쓴다. cron이 5분마다 sync한다. GBrain이 색인한다.
- **3부 X 본인 게시물과 리포스트**. Bearer Token 저장, 숫자 사용자 ID 조회, Hermes에게 collector 제작 위임, cron 등록과 일정 조정 순서다.
- **4부 X likes**. OAuth 2.0 PKCE로 사용자 컨텍스트 토큰을 얻어 likes까지 수집 범위를 넓힌다.

### 3.3 collector 제작을 위임할 때 Hermes에게 준 지시 항목

저자가 Hermes CLI에 그대로 보냈다고 밝힌 지시문은 다음 항목을 담는다. X 핸들, X 숫자 사용자 ID, `X_BEARER_TOKEN`이 이미 gbrain config에 저장돼 있다는 사실, brain repo 위치가 `~/brain`이라는 사실, 수집 대상은 본인 게시물과 likes와 리포스트만이라는 제한, keyword 검색은 구성하지 말 것, 북마크는 당분간 제외, 기존 cron과 시간이 겹치지 않게 배치할 것, 첫 수집이 끝나면 트윗을 brain 페이지로 gbrain에 ingest할 것.

collector가 등록되는 cron 항목은 다음과 같다.

```bash
13,43 * * * * X_BEARER_TOKEN=$(/home/ubuntu/.bun/bin/gbrain config get secrets.X_BEARER_TOKEN) /usr/bin/python3 /home/ubuntu/.gbrain/integrations/x-to-brain/x_to_brain.py >> /home/ubuntu/.gbrain/integrations/x-to-brain/collector.log 2>&1
```

### 3.4 OAuth 2.0 PKCE 절차

X 개발자 포털의 User authentication settings에서 OAuth 2.0을 켜고 callback URL을 `http://YOUR_VPS_IP:8000/callback`으로 지정한 뒤 Client ID와 Client Secret을 확보한다. AWS 콘솔의 EC2 Security Groups에서 Custom TCP, 포트 8000, 소스 0.0.0.0/0으로 인바운드 규칙을 추가한다. 저자는 이 포트가 한 번만 필요하니 OAuth 절차가 끝나면 닫으라고 강조한다.

Hermes에게 `~/x-oauth.py` 위치에 PKCE 스크립트를 만들게 한 뒤 Client ID와 Client Secret과 callback URL과 scope를 넘긴다. scope는 `tweet.read`, `users.read`, `like.read`, `offline.access`다. 스크립트는 8000 포트에서 callback을 기다리다가 받은 토큰을 `gbrain config`의 `secrets.X_USER_ACCESS_TOKEN`과 `secrets.X_USER_REFRESH_TOKEN`에 저장한다.

VPS에서 `python3 ~/x-oauth.py`를 실행한다. 출력된 URL은 VPS가 아니라 노트북 브라우저에서 연다. 승인하면 X가 VPS IP로 redirect하고 스크립트가 토큰을 받아 저장한다. 이후 collector가 likes에는 사용자 액세스 토큰을 쓰도록 고친다. 토큰은 gbrain config에서 읽으며, 401 응답이 오면 `X_USER_REFRESH_TOKEN`으로 갱신한 뒤 새 토큰을 다시 저장한다. 마지막으로 8000 포트 인바운드 규칙을 삭제한다.

### 3.5 최종 구성과 crontab

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

crontab에는 5분 주기 sync 한 줄과 08시와 20시 collector 한 줄, 모두 두 항목이 남는다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

정량 벤치마크는 없다. 운영 가이드 성격의 글이라 검색 품질이나 지연 시간 측정은 제시되지 않는다.

본문이 제시한 확인 가능한 산출물은 다음 두 가지다.

- `python3 x_to_brain.py`를 직접 실행했을 때 반환되는 JSON: `{"own_total": 399, "likes_total": 0, "own_new": 7}`. 본인 게시물 399건을 확인했고 그중 신규가 7건이며, OAuth를 설정하기 전이라 likes는 0건이다.
- `gbrain --version`이 반환하는 `gbrain 0.22.x`. 가이드 작성 시점의 GBrain 계열 버전을 알려준다.

비용 측면에서는 X Basic tier 월 200달러와 ngrok 월 8달러를 모두 지출하지 않는다. 대신 pay-per-use 크레딧에 25달러를 충전하는 구성으로 대체한다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **raw가 원문 전문이 아니다**. 저장된 raw는 WebFetch 디지스트이며 일부 문장이 재구성됐을 수 있다고 파일 머리말이 밝힌다. 명령어와 cron 항목과 JSON 출력은 코드 블록으로 남아 있어 신뢰도가 높지만, 서술 문장은 원문 표현과 다를 수 있다.
- **버전 시차**. `gbrain 0.22.x` 기준으로 쓰인 문서다. GBrain 저장소는 이후에도 갱신되므로 명령 구성이 달라질 수 있다. 따라서 실행 시점의 README를 우선 확인해야 한다. 이 raw는 현재 버전이 무엇인지 밝히지 않는다.
- **OAuth 동안의 포트 노출**. 8000 포트를 0.0.0.0/0으로 여는 시간이 짧더라도 공개 노출 구간이 생긴다. 본문은 포트를 닫으라고만 안내하고 state 검증 같은 PKCE 세부 항목은 다루지 않는다.
- **refresh token의 영속성 가정**. `offline.access`가 만료되지 않는 refresh token을 준다고 인용하지만, 이는 X의 정책에 의존하는 사실이라 정책이 바뀌면 함께 바뀐다.
- **단일 운영자 전제**. 하나의 VPS와 한 사람의 계정을 전제로 한다. 팀 공유나 여러 대의 기기에서 접근하는 구성은 다루지 않는다.
- **다루지 않는 범위**. 임베딩 제공자 선택, brain 스키마 설계, 검색 품질 튜닝, 백업과 복구는 이 글의 범위 밖이다.

## 6. 관련 연구 (Related Work)

- [[applications/garrytan-gbrain]]. 이 가이드가 설치하고 운영하는 시스템의 공식 저장소 문서다.
- [[applications/garrytan-gbrain-tutorials]]. 같은 저장소의 공식 튜토리얼 모음으로, 개인 brain과 회사 brain 셋업 절차를 담는다. 이 글은 그와 달리 AWS EC2 VPS와 Hermes 조합이라는 특정 배포 경로를 다룬다.
- [[applications/gajjar-2026-gbrain-vs-computer-memory]]. GBrain을 manual ingestion으로 규정한 비교 자료다. 이 가이드의 Hermes 위임 패턴은 그 규정이 도구 조합에 따라 달라진다는 점을 보여준다.
- [[applications/vectorize-2026-gbrain-review-honest-assessment]]. 30분 설치와 단일 운영자 범위라는 평가를 담은 리뷰로, 이 가이드의 실제 절차와 대조할 수 있다.
- [[applications/techwealth-hub-2026-garry-tan-gbrain-explained]]. sync가 실제로 동작했는지 확인하는 verification runbook을 강조한 자료로, 이 가이드의 `gbrain doctor`와 sync 로그 확인이 같은 목적을 갖는다.
- **Andrej Karpathy의 LLM Wiki 패턴**. 본문이 GBrain의 개념적 뿌리로 직접 언급한다.

## 7. 용어집 (Glossary)

- **Hermes Agent**: 이 가이드가 전제로 삼는 에이전트 플랫폼이다. VPS에 미리 설치돼 있어야 한다. 스킬을 읽고 콘텐츠를 가져와 처리한 뒤 markdown을 쓰는 실행 주체다. 본문은 Hermes의 제작 주체나 내부 구조를 설명하지 않는다.
- **PGLite**: `gbrain init`이 선택하는 기본 엔진이다. 본문은 서버가 필요 없고 별도 설정이 없다는 점만 언급한다.
- **brain repo와 gbrain repo**: brain repo는 사용자 데이터가 쌓이는 `~/brain`이며 gbrain repo는 코드가 있는 `~/gbrain`이다. 둘을 섞지 말라고 본문이 못 박는다.
- **slug**: 페이지 frontmatter 필드다. 하위 디렉토리에 페이지를 쓰면 값이 경로와 일치해야 sync가 성공한다.
- **PKCE (Proof Key for Code Exchange)**: OAuth 2.0의 확장으로, client secret을 안전하게 보관하기 어려운 클라이언트에서 인증 코드 교환을 보호한다.
- **offline.access scope**: X OAuth 2.0에서 refresh token 발급을 여는 scope다. 본문은 이 scope로 받은 refresh token이 만료되지 않는다고 인용한다.
- **Bearer Token과 user access token**: 전자는 앱 권한으로 공개 데이터를 읽으며 후자는 사용자 컨텍스트 권한을 갖는다. likes처럼 개인 데이터에 접근하는 엔드포인트는 후자를 요구한다.
