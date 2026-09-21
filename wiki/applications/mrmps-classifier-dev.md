---
title: "classifier.dev: Zero-shot text classification over plain HTTP"
type: repo
year: 2026
category: applications
source: mrmps-classifier-dev.md
raw_path: raw/repos/mrmps-classifier-dev.md
raw_filename: "mrmps-classifier-dev.md"
source_collection: external
org: "mrmps"
repo: "classifier-dev"
url: "https://github.com/mrmps/classifier-dev"
license: "MIT"
tags: [classifier-dev, zero-shot, text-classification, typesafe-ai, jev, system-one-model, cloudflare-workers, durable-object, mcp, agent-skill, calibration, multi-label, rate-limiting, analytics-engine, repo]
---

## 요약

classifier.dev는 API 키도 가입도 없이 URL 하나로 텍스트 분류를 제공하는 서비스이며, 이 저장소는 그 서비스 전체를 담은 Cloudflare Worker 코드다. 요청 경로에 라벨 집합과 분류할 텍스트를 넣으면 응답 본문으로 라벨 한 단어가 돌아온다.

이 저장소가 흥미로운 지점은 분류를 푸는 방식에 있다. 생성 모델에게 라벨을 말하게 하는 대신 TypeSafe의 Jev를 호출한다. Jev는 텍스트를 만들지 않고 타입이 정해진 판단과 보정된 확률을 반환하는 decision model이다. README는 이 교체가 이전 LLM 구현으로는 불가능했던 세 가지 기능을 열어 줬다고 적고, 각각에 측정 수치를 붙인다.

나머지 절반은 운영 코드다. IP별 rate limiting, 요청당 원가 계측, 키를 섞은 가명화, 15분 주기 알림, 에이전트가 스스로 문제를 신고하는 endpoint가 같은 Worker 안에 들어 있다. 그래서 이 저장소는 분류 API의 예제인 동시에 상위 모델 하나에 의존하는 작은 서비스를 어떻게 운영하는지에 대한 사례이기도 하다.

## 배경

zero-shot 분류는 해당 과제의 예시를 하나도 보여 주지 않고 라벨 이름과 지시만으로 분류하게 하는 설정이다. LLM이 등장한 뒤 이 설정은 프롬프트 한 줄로 구현할 수 있게 됐다. 라벨 목록과 텍스트를 프롬프트에 넣고 모델이 뱉은 문자열을 라벨로 읽으면 된다.

문제는 그 다음에 생긴다. 모델이 돌려준 것은 자유 문자열이므로 코드가 쓰려면 파싱과 검증이 필요하고, 그 답을 얼마나 믿을지에 대한 정보는 따로 얻기 어렵다. 흔히 쓰이는 우회책은 생성 토큰의 logprob을 신뢰도로 읽는 것인데, README는 그 값이 실제 정답률과 어긋난다는 측정치를 제시한다. 이전 구현에서 뉴스 항목의 87%가 신뢰도 0.9 이상으로 분류됐지만 그 구간의 실제 정답률은 68%였다.

처리량에도 같은 성격의 한계가 있다. 생성 모델에게 분류를 시키면 입력 하나에 호출 하나가 필요하다. 1,000건을 분류하려면 호출도 1,000번이고, 이를 묶으려는 시도는 모델이 출력 순서를 흐트러뜨릴 위험을 떠안는다.

TypeSafe의 Jev는 이 두 문제를 모델 형태 자체로 겨냥한 모델이다. state와 타입이 정해진 질문을 받아 선택지별 보정 확률을 약 150ms에 반환하며, 보정은 모델이 낸 확률값이 실제 정답률과 일치하도록 맞추는 성질을 말한다. classifier.dev는 이 모델을 분류 API의 뒷단으로 쓰면 무엇이 달라지는지를 실제 트래픽 위에서 보여 준다.

## 핵심 개념

decision model은 텍스트를 생성하지 않고 타입이 정해진 판단과 확률을 반환하는 모델 범주를 말한다. 응답이 문자열이 아니라 값이므로 파싱 단계가 사라지고 확률을 그대로 분기 조건으로 쓸 수 있다.

state는 Jev에 넘기는 평가 대상 묶음이다. 이 저장소에서는 `{id, text}` 배열이며, 배열 안의 입력마다 자기 질문이 붙는다.

question group은 복구가 함께 묶어 두는 요청의 최소 단위다. 일반 분류에서는 입력 하나에 딸린 질문들이 한 group이고, dimension 분류에서는 결정 하나가 한 group이다. batch가 한도를 넘으면 이 경계를 따라 쪼갠다.

escalation은 신뢰도가 기준 미만인 응답을 다른 모델에 다시 물어 교체하는 처리다. classifier.dev에서 이 기준은 0.7이고, 교체된 항목에는 `escalated: true`가 붙는다.

dimension은 같은 입력을 서로 다른 라벨 집합으로 동시에 분류하는 필드다. 고객 문의 하나를 담당 팀과 긴급도와 종류로 한꺼번에 나누는 경우가 여기에 해당한다.

Durable Object는 Cloudflare가 제공하는 단일 스레드 실행 단위로, 강한 일관성을 보장한다. 이 저장소는 IP별 요청 계수를 여기에 둔다.

## 방법

### API 표면

호출 형태는 두 가지이고 둘 다 같은 처리로 들어간다. 경로 형식은 URL을 그대로 읽을 수 있어 문서 없이도 따라 할 수 있고, 질의(query) 문자열 형식은 프로그래밍 언어의 HTTP 클라이언트에서 다루기 편하다.

```
curl https://classifier.dev/spam,not+spam/Win+a+free+iPhone
spam

curl "https://classifier.dev/?labels=spam,not+spam&text=Win+a+free+iPhone"
spam
```

같은 호출을 명령줄 도구로도 할 수 있다. `cli/`는 `classifier-dev`라는 별도 npm 패키지이며 의존성이 없는 Node 파일 하나로 되어 있다. 자체 CHANGELOG와 semver를 갖고, `npm run release`가 `cli-v<version>` 태그를 붙이면 GitHub Actions가 배포한다.

```
npm i -g classifier-dev
classify bug,feature,praise < feedback.txt
```

서비스 전체는 Worker 하나다. 데이터베이스도 프레임워크도 없고 빌드 단계는 esbuild 하나뿐이다. 뉴스레터 기능만 예외로 Postgres를 쓴다.

### 모듈 구성

| 모듈 | 책임 |
|---|---|
| `src/index.ts` | 라우팅, HTTP 검증, quota, tier와 모델 선택, smart escalation, LLM fallback 체인, 응답 형식화 |
| `src/jev.ts` | Jev 질문과 응답, 공유 batch 예산과 복구, gateway 또는 직접 전송, provider 검증 |
| `src/dimensions.ts` | dimension 정의와 입력-dimension 결정을 Jev 질문으로 옮기고 되돌리는 매핑 |
| `src/query.ts` | GET 질의 형식과 오류가 제안하는 URL 생성 |
| `src/limiter.ts` | Durable Object 기반 IP별 rate limiting |
| `src/report.ts` | Analytics Engine 집계를 Resend로 보내는 일일 요약 |
| `src/alerts.ts` | 15분 주기 점검과 이상 발생 시 메일 발송 |
| `src/feedback.ts` | feedback.now 프로토콜 기반 에이전트 신고 수신 |
| `src/privacy.ts` | 키를 섞은 가명 처리 |
| `src/cost.ts` | provider 정산에 근거한 요청당 지출 계측 |
| `src/docs.ts`, `src/home.ts`, `src/ui.ts` | 평문 문서, 브라우저용 렌더링, 공통 표현 |

분류 경로만 보면 세 모듈로 좁혀진다. `index.ts`가 HTTP 층과 모델 선택을 맡고, `jev.ts`가 Jev와의 통신을 맡고, `dimensions.ts`가 다차원 요청을 Jev 질문으로 번역한다. 일반 분류와 dimension 분류가 같은 batch 모듈을 공유한다.

### Jev 호출과 batch 구성

Jev의 state가 배열이고 입력마다 자기 질문을 갖기 때문에, 요청 하나에 담긴 입력 전체가 상위 호출 한 번으로 처리된다. 입력 수만큼 호출이 늘어나지 않는다는 점이 이 설계의 출발점이다.

문서화된 한도는 요청당 6만 4천 토큰이다. `jev.ts`는 그보다 보수적인 예산으로 입력을 묶고, 묶어서 만들어진 요청들을 8개씩 동시에 보낸다.

batch 준비 단계는 세 가지를 함께 처리한다. 여러 질문이 공유하는 입력 텍스트를 한 번만 계산하고, 두 provider의 예산을 각각 확인하며, dimension 요청이면 quota를 차감하기 전에 이 계산을 끝낸다. 실행 단계는 동시 요청 수를 제한하고 한도를 넘는 batch를 question group 경계에서 쪼갠다.

### tier와 fallback 체인

tier는 요청이 고르는 처리 등급이다. 기본값인 fast는 Jev 응답을 그대로 반환하고, smart는 낮은 신뢰도 응답만 골라 다시 묻는다.

| tier | 동작 | 분당 한도 | 일당 한도 |
|---|---|---|---|
| fast | Jev 응답을 그대로 반환한다 | 3,000건 | 20,000건 |
| smart | 신뢰도 0.7 미만 단일 라벨 응답을 추론 모델에 재질의해 교체한다 | 200건 | 2,000건 |
| multi-label | tier 설정을 무시하고 Jev 결과만 쓴다 | 3,000건 | 20,000건 |

smart가 바꾸는 것은 낮은 신뢰도 응답뿐이고 나머지 동작은 그대로다. 이 분기가 성립하려면 신뢰도가 실제 정답률과 이어져 있어야 하며, 그 조건이 충족되는지를 README가 수치로 보인다.

Jev를 쓸 수 없을 때는 `index.ts`에 남아 있는 LLM 체인이 대신 답한다. 다만 입력 20건이 상한인데, 이 방식은 입력마다 호출이 하나씩 필요하기 때문이다.

fallback이 작동했다는 사실은 일일 요약에 `FALLBACK` 표시로 남는다. 이 표시가 생긴 계기는 실제 사고다. 이전 구현에서 주 모델이 상위 서비스의 제공 목록에서 빠졌고, 백업 모델이 몇 주 동안 F1 0.546으로 조용히 서빙했는데 그 사실을 알리는 장치가 없었다.

### multi-label

multi-label은 라벨마다 예 또는 아니오 질문을 하나씩 만든다. 0.7 이상인 라벨을 가능성이 높은 순으로 돌려주고 전체 점수 맵을 함께 싣는다.

이 방식은 이전 구현인 sweep-and-verify LLM 캐스케이드를 대체했다. 후보를 넓게 훑은 뒤 각각을 다시 확인하던 두 단계가 질문 여러 개를 한 번에 묻는 한 단계로 접혔다.

### multi-dimension 분류

`POST /v1/classify`는 `items`와 `dimensions`도 받는다. dimension마다 라벨 집합을 배열로 주거나, 아래 `urgency`처럼 지시문(instructions)을 덧붙인 객체로 줄 수 있다.

```json
{
  "items": ["Checkout charges me twice"],
  "dimensions": {
    "team": ["billing", "identity", "platform"],
    "urgency": {
      "labels": ["immediate", "normal", "low"],
      "instructions": "Active financial harm is immediate."
    },
    "kind": ["bug", "request", "question"]
  }
}
```

응답에서 `results[i].dimensions[name]`마다 라벨, 신뢰도, 점수, 모델, 지연 시간이 따로 붙는다. Jev는 item과 dimension을 가로지르는 질문들 사이에서 state를 공유하므로, 같은 문의 텍스트를 세 번 보내지 않고도 세 dimension을 함께 채운다.

| 항목 | 규칙 |
|---|---|
| dimension 수 | 요청당 20개까지 |
| 결정 수 | 요청당 1,000건까지, 결정 하나마다 quota 차감 |
| smart escalation | 필드 단위로 일어나며 교체 시 원래 점수를 지운다 |
| Jev 불가 시 | dimension도 20건까지만 fallback한다 |
| MCP | `classify_dimensions` tool이 같은 경로를 쓴다 |

### rate limiting

IP별 계수는 Durable Object 안에서 분류 건수 기준으로 이뤄진다. 저자는 여기에 이르기 전에 두 가지를 시도했다가 기각한 과정을 기록해 뒀다.

- Cloudflare의 기본 `ratelimit` 바인딩은 등록은 되지만 차감되지 않았다. 한도 60에 대해 70번 호출했는데 전부 `success: true`를 반환했다.
- KV는 edge에 캐시되고 최종 일관성만 보장한다. 방금 기록한 카운터가 다음 읽기에 보이지 않아 모든 요청이 `remaining: 59`를 봤다.

Durable Object는 단일 스레드이며 강한 일관성을 보장하므로 카운터에 필요한 성질을 갖춘다. 최초 한도인 분당 60건으로 검증했을 때 75건 요청이 200 응답 60건과 429 응답 15건으로 갈렸다.

### 관측과 원가 계측

요청마다 Analytics Engine 데이터포인트가 하나씩 기록된다. 기록되는 값은 tier, 라벨 집합 지문, 국가, 상태, 건수, 지연 시간이며 요청 텍스트는 저장되지 않는다.

원가도 같은 자리에서 잰다. OpenRouter는 요청하면 호출 요금을 반환하고, Jev는 자신이 보고한 입력 토큰 수로 과금된다. 누적치는 `double3` 열에 쌓이는데, 이 열이 출시 이후 추가되었기 때문에 그 배포 이전 기록에서는 0으로 읽힌다.

Analytics Engine의 SQL은 좁은 ClickHouse 부분집합이라 집계 방식에 제약이 있다. 고유 수를 세는 `uniq()`도 `SELECT DISTINCT`도 없고 `SELECT col ... GROUP BY col` 형태도 거부된다. 그래서 고유 수는 `SELECT col, count() ... GROUP BY col`으로 구한 뒤 반환된 행 수를 세는 방식으로 우회하며, 질의 하나가 실패해도 보고서 전체가 비지 않도록 각 질의를 격리한다.

### 개인정보 가명화

과거에 호출자를 가리키던 두 열이 있었다. IP 주소와, 소문자로 합친 라벨 집합이다. 라벨 집합은 표현이 사람마다 달라 사실상 식별자 역할을 했다.

두 열 모두 키를 섞은 해시로 바뀌었다. 그래서 집계는 여전히 고유 호출자 수와 고유 분류기 수를 세지만, 값에서 주소나 문구를 되읽을 수는 없다. 호출자 해시에는 UTC 날짜가 함께 들어가 값이 매일 바뀌므로, 7일이나 30일 단위의 고유 호출자 수는 실제로는 호출자-일 수로 읽어야 한다.

키는 `PRIVACY_SALT`에 32바이트 난수로 둔다. 회전시키면 모든 지문이 다시 번호를 받아 회전 구간에서 고유 수가 중복 계수된다. 값이 없으면 `ADMIN_SIGNING_KEY`, `REPORT_KEY`, isolate별 난수 순으로 대체하는데, 키 없는 해시는 IPv4 주소나 흔한 라벨 집합에 대해 몇 초 만에 역산되기 때문이다.

### 알림

별도 cron이 15분마다 실행되고 아무 문제가 없으면 침묵한다. 감시 대상을 고른 기준은 조치가 따르는 조건만 본다는 것이다.

| 조건 | 감시 이유 |
|---|---|
| Jev 키 거부 | 크레딧 소진이나 키 폐기 |
| Jev 무응답 | fallback 체인이 조용히 대신 답하는 상황 |
| 5xx 비율 | 서비스 자체 오류 |
| smart escalation 실패 | `OPENROUTER_API_KEY` 소진이 이 형태로 나타난다 |
| 평균 지연 시간 | 상위 서비스 지연 |
| 직전 하루 대비 지출 급증 | 비용 사고 |
| 트래픽 중단 | 라우팅이나 DNS 장애 |

4xx는 감시하지 않는다. `/wp-admin`을 찾는 스캐너가 대부분이고 조치할 것이 없기 때문이다.

잔액 감시는 우회 방식을 쓴다. TypeSafe는 잔액 조회 endpoint를 공개하지 않고 API가 `/v1/systemone`과 `/v1/models` 둘뿐이라 읽을 숫자가 없다. 그래서 점검 과정이 15분마다 키로 `/v1/models`를 호출하고 TypeSafe가 돌려준 상태를 그대로 보고한다. 401, 402, 403은 각각 크레딧 소진, 폐기, 오류 키를 뜻할 수 있는데 어느 쪽인지 추측하지 않고 TypeSafe의 메시지를 인용해 중대 알림을 올린다.

이 방식에는 부수 효과가 두 가지 있다. 트래픽을 기다리지 않고 먼저 찔러 보므로 조용한 시간대에도 호출자가 fallback 체인을 만나기 전에 발동하고, Analytics Engine이 죽어 있어도 동작한다.

각 조건은 시작할 때 한 번, 지속되는 동안 6시간마다, 해소될 때 한 번 메일을 보낸다. 상태는 KV의 `alert:` 아래 저장되고 임계값은 `src/alerts.ts` 상단의 `T` 객체에 모여 있다.

Jev provider 시도 기록은 `JEV_AE`를 통해 `classifier_jev_attempts`에 따로 쌓인다. 복구된 실패, 재시도, gateway 냉각 건너뛰기가 포함되며 provider별 상태와 사유와 건수와 평균 지연 시간이 보고서에 들어간다. 한 provider에서 시도 3건 이상이 실패하고 실패율이 5%를 넘으면 경고한다.

점검과 요약은 수동으로도 볼 수 있다. 인증은 헤더로만 받는데, 질의 문자열은 접근 로그와 브라우저 기록과 다음 클릭의 Referer 헤더에 남기 때문에 `?key=` 방식을 없앴다.

```
curl -H "authorization: Bearer $REPORT_KEY" https://classifier.dev/alerts
curl -H "authorization: Bearer $REPORT_KEY" "https://classifier.dev/alerts?demo=1&send=1"
curl -H "authorization: Bearer $REPORT_KEY" https://classifier.dev/report
```

첫 줄은 발송이나 상태 변경 없이 미리 보고, 둘째 줄은 실제 경로로 표본 메일을 보내 전달이 되는지 확인하며, 셋째 줄은 일일 요약을 미리 본다.

### 문서와 배포

`curl classifier.dev`는 평문을 출력하고 브라우저는 `Accept: text/html`로 같은 문서의 렌더링본을 받는다. 두 응답 모두 요청 시점에 `DOCS`와 `BENCHMARK` 상수에서 생성되므로 내용이 갈라질 수 없다. `?format=text`로 평문을 강제할 수 있고 두 응답 모두 `Vary: accept`를 단다.

`main`에 병합하면 배포된다. 워크플로는 타입 검사, Worker와 CLI 테스트, `wrangler deploy`를 차례로 수행한 뒤 실제 서비스에 `/v1/health`와 분류 요청 하나를 보낸다. 이 마지막 확인 덕분에 깨진 Worker를 올린 배포는 사용자 터미널이 아니라 CI에서 실패한다.

설정 파일은 한 가지 원칙으로 갈라 둔다. 계정마다 다른 값만 추적 대상에서 빼고 나머지는 저장소에 남긴다.

| 파일 | 추적 | 내용 |
|---|---|---|
| `wrangler.toml` | gitignore 대상 | `account_id`와 `STATS` KV 네임스페이스 id |
| `wrangler.example.toml` | 추적됨 | cron, 바인딩, 마이그레이션 등 배포 형태 전체 |

CI에는 `wrangler.toml`이 없으므로 `.github/render-wrangler.mjs`가 예시 파일과 저장소 시크릿 세 개로 생성한다. 그 결과 예시 파일이 배포 형태의 사본이 아니라 배포 형태 자체가 된다. `wrangler.toml`만 고치고 예시를 두면 CI는 옛 설정을 계속 배포한다.

시크릿은 `wrangler secret put`으로 Worker에 올라가며 스크립트 번들에 들어가지 않는다. Worker가 읽는 값은 `TYPESAFE_API_KEY`, `AI_GATEWAY_API_KEY`, `OPENROUTER_API_KEY`, `CONTEXT_API_KEY`, `RESEND_API_KEY`, `CF_ANALYTICS_TOKEN`, `REPORT_KEY`, `PRIVACY_SALT`이며 전체 목록은 `src/index.ts`의 `Env` 인터페이스에 있다.

시크릿 비교는 `src/secrets.ts`의 `secretEquals`로 하고 `===`를 쓰지 않는다. 일반 비교는 첫 번째 틀린 바이트에서 반환하므로 호출자에게 추측이 어디까지 맞았는지 알려주기 때문이다.

### 에이전트 발견 표면

이 서비스는 사람뿐 아니라 에이전트가 스스로 찾아 쓰도록 여러 표면을 노출한다.

| 표면 | 경로 | 내용 |
|---|---|---|
| OpenAPI | `GET /openapi.json`, `/.well-known/openapi.json` | OpenAPI 3.1 문서 |
| 에이전트 인덱스 | `GET /llms.txt` | robots.txt에서 연결되는 짧은 인덱스 |
| 벤치마크 | `GET /benchmark` | 측정된 정확도, 비용, 지연 시간 |
| agent skill | `GET /skill.md`, `/.well-known/agent-skills/index.json` | RFC 8615 well-known 발견, schema v0.2.0 |
| 신고 접수 | `/.well-known/agent-feedback.json`, `/api/v1/*` | feedback.now 프로토콜 schema 1.1 |

앞의 세 표면은 `GET /`의 세 번째 문단에서 연결되므로 랜딩 문서를 읽은 에이전트가 바로 찾는다.

skill은 `npx skills add https://classifier.dev`로 설치하며 저장소를 거치지 않는다. 설치가 성립하려면 인덱스가 artifact의 sha256을 담아야 하고 둘이 어긋나면 skill을 설치할 수 없다. 나중의 수정이 조용히 무효화할 다이제스트를 커밋해 두는 대신, `src/skill.ts`가 실제로 서빙하는 바이트를 isolate마다 한 번 해싱한다. 따라서 `SKILL.md`만 고치면 되고 다른 곳을 함께 갱신할 필요가 없다.

skill이 가르치는 내용은 API 홍보 문구가 놓치는 지점이다. 호출자는 이미 모델이라서 눈에 보이는 것은 무엇이든 분류할 수 있고, 따라서 외부 호출을 하는 이유는 능력이 아니라 컨텍스트에 있다. 검색 결과 40건을 전부 읽지 않고 6건으로 줄이는 상황이 그 예다.

skill 문서는 테스트에서 어렵게 확인한 두 가지도 함께 적는다. 하나는 Cloudflare가 Python 표준 라이브러리 `urllib`의 User-Agent를 Worker에 닿기 전에 403으로 막는다는 점이라 예제가 User-Agent를 명시한다. 다른 하나는 필터에게 "확실하지 않으면 남겨라"라고 지시해야 한다는 점이다. 열 개 스니펫 연구 필터에서 이 지시가 유지된 신호를 6개 중 4개에서 6개 중 6개로 올렸고 잡음은 늘지 않았다. 반면 "관련 있을 수도 있음"이라는 세 번째 라벨을 추가하는 방식은 효과가 없었다.

### 신고 접수

신고 접수는 feedback.now 프로토콜 schema 1.1을 구현한다. 이 프로토콜을 아는 에이전트는 별도 안내 없이도 문제를 보고할 수 있다.

| endpoint | 용도 |
|---|---|
| `GET /.well-known/agent-feedback.json` | 이 호스트가 받는 형식 |
| `GET /api/v1/policy` | 범주, 심각도, 한도 |
| `POST /api/v1/feedback` | 구조화된 전체 신고 |
| `POST /api/v1/observations` | 더 가벼운 신호 |
| `POST /api/v1/feedback/{id}/attachments` | 나중에 증거 추가 |
| `GET /api/v1/receipts/{id}` | 접수 여부와 신고 품질 확인 |

이 경로는 분류기도 Analytics Engine도 호출하지 않는다. 그 둘이 고장났다는 신고가 도착하는 곳이므로 둘이 죽어도 작동해야 하기 때문이다.

접수된 신고는 `REPORT_TO`로 메일 발송되고 KV에 90일 보관된다. 도메인, 표면, 범주, 제목이 같은 반복 신고는 저장하고 중복으로 확인해 주되 메일을 다시 보내지 않는다. 반복 호출하는 에이전트 하나가 받은 편지함을 채우는 상황을 막기 위해서다. 시간당 예산은 IP당 100건이고 잔여량은 모든 접수증에 담긴다.

`quality_score`는 신고의 완성도에 대한 결정론적 함수다. 값을 내는 규칙이 공개되어 있으므로 에이전트가 규칙을 읽고 다음 신고를 더 낫게 쓸 수 있다.

### 뉴스레터

가입 요청은 즉시 저장되지 않는다. `POST /subscribe`는 Resend로 확인 메일을 보내고 `202 {"ok":true,"status":"pending_confirmation"}`을 반환하며, 메일로 받은 토큰을 `POST /subscribe/confirm`에 제출해야 비로소 기록된다. GET은 양식만 렌더링하므로 메일 스캐너가 구독을 확정시킬 수 없다.

토큰은 `NEWSLETTER_CONFIRMATION_SECRET`으로 서명하고 24시간 안에 만료되며 가입 응답에 포함되지 않는다. 서명 키를 회전하면 발급된 링크가 무효가 된다.

구독자 표는 메일 주소, 유입 경로, 가입과 확인과 해지 날짜, 선택한 로드맵 항목, 더 빠른 추론을 골랐을 때의 요청 지연 시간, 내부 id를 담는다. IP, 요청 id, 분류 트래픽은 담지 않는다.

로드맵 문구는 `src/newsletter.ts`의 `ROADMAP` 상수 하나다. 평문 문서, 렌더링된 양식, `index.md`가 모두 이 상수를 읽으므로 로드맵 변경이 세 곳에 동시에 반영되거나 어디에도 반영되지 않는다.

## 결과

### 처리량

400건 뉴스 헤드라인을 종단 간 650ms에 분류했다. 묶어 보내는 것이 품질을 해치지 않는지도 함께 확인했는데, 100건을 한 요청에 묶었을 때의 점수가 한 건씩 따로 보냈을 때와 같았다.

### 신뢰도 보정

6지선다 감정 데이터 400건에서 신뢰도 구간별 실제 정답률을 잰 결과다.

| 모델 | 조건 | 실제 정답률 |
|---|---|---|
| Jev | 신뢰도 0.9 이상 | 82% |
| Jev | 신뢰도 0.5 미만 | 29% |
| 이전 LLM | 뉴스 항목의 87%가 0.9 이상으로 분류됨 | 68% |

두 모델의 차이는 값의 높낮이가 아니라 값이 구간을 나누는지에 있다. Jev는 높은 구간과 낮은 구간의 정답률이 82%와 29%로 크게 갈리므로 어느 응답을 다시 물을지 고를 수 있다. 이전 구현은 응답 대부분을 높은 값에 몰아넣었고 그 구간의 정답률도 68%에 그쳐 고를 근거가 되지 못했다.

### escalation에 쓸 모델 선택

smart tier가 재질의할 모델은 전체 정확도가 아니라 Jev가 확신하지 못한 항목에서의 정확도로 골랐다.

| 재질의 모델 | 뉴스 주제 | 감정 | 비고 |
|---|---|---|---|
| Jev 단독 | 87.5% | 61.8% | 비교 기준 |
| deepseek-v4-flash, qwen3.7-flash, mercury-2.5 | 개선 없음 | 개선 없음 | Jev보다 낫지 않았다 |
| gemini-3.8-flash | 90.0% | 63.7% | 채택된 체인 |
| claude-fable-5.1 | 72.3% | 90.7% | 약 3배 비용 |

빠른 모델 세 개는 Jev가 어려워한 항목에서 Jev보다 나은 답을 내지 못했다. gemini-3.8-flash만 두 데이터셋에서 각각 2.5%p와 1.9%p를 더해 체인으로 채택됐다.

frontier 모델인 claude-fable-5.1의 수치는 두 데이터셋에서 반대 방향으로 갈린다. 뉴스 주제는 Jev 단독보다 15.2%p 낮고 감정은 28.9%p 높다. 저자는 이 교환이 언젠가 가치 있어 보일 수 있다고 보고 수치를 `/benchmark`에 공개해 둔다.

### multi-label

| 구현 | F1 | 지연 시간 |
|---|---|---|
| Jev 단일 호출 | 0.887 | 230ms |
| sweep-and-verify LLM 캐스케이드 | 0.799 | 1.5초 |

7개 사례로 이뤄진 평가 집합에서 F1이 0.088 올랐고 지연 시간은 약 6분의 1로 줄었다.

multi-label에 smart tier를 적용하는 방안도 시험했지만 채택하지 않았다. Jev 후보를 추론 모델로 다시 판정하면 F1이 떨어졌고 23초가 걸렸다. 그래서 multi-label은 tier 설정을 아예 무시한다.

### 평가 재현

벤치마크는 저장소 안에서 직접 돌려 볼 수 있다.

```
npm run bench                 # multi-label 7개 사례, Jev와 OpenRouter 모델 비교
npm run single -- --dataset emotion --backend jev
npm run single -- --dataset ag_news --backend openrouter:qwen/qwen3.7-flash
python3 eval/escalate.py --dataset emotion
```

`single.py`는 AG News와 dair-ai/emotion 테스트 행을 처음 실행할 때 내려받고 원시 결과를 `eval/data/results/`에 캐시한다. 덕분에 `escalate.py`가 여러 backend 결과를 다시 비용을 들이지 않고 조합할 수 있다. README는 수치를 인용하기 전에 `eval/README.md`의 단서를 읽으라고 적는다.

### 라이브 테스트

`npm run test:e2e`는 Node 22.18 이상에서 실제 운영 API를 상대로 실행된다. fetch도 추론도 흉내 내지 않고 진짜 HTTP와 모델을 호출하므로 추론 비용이 발생하고 일반 quota를 차감한다.

검사 항목은 300건 결정 batch의 정확한 결정과 순서, 필드별 허용 라벨과 확률 분포, 실제 smart escalation, provider 점수 보존, 별칭, 검증 오류, MCP, OpenAPI, 구버전 호출이다. 응답은 `unknown`으로 시작해 검증을 거친 뒤에야 타입이 붙은 행렬이 된다.

smart 테스트에는 조건이 하나 더 붙는다. 실제 escalation이 일어나야 통과하므로, 모든 고정 입력이 확신으로 바뀌는 모델 변화는 조용히 건너뛰어지지 않고 테스트 실패로 드러난다.

## 한계

**상위 서비스 의존이 설계의 중심에 있다.** 두 tier 모두 Jev가 답하고, Jev를 쓸 수 없을 때의 LLM fallback은 입력 20건이 상한이다. 1,000건 batch라는 대표 기능은 대체 경로가 없다.

**gateway 경로가 현재 꺼져 있다.** Vercel AI Gateway가 9월 19일에 429를 반복 반환한 뒤 `AI_GATEWAY_DISABLED = "true"`로 두어 운영이 TypeSafe를 직접 호출한다. gateway 키는 남겨 두었고, 복구하려면 용량을 확인한 뒤 변수를 `"false"`로 바꿔 배포하고 provider 시도 기록과 라이브 테스트를 다시 확인해야 한다.

**Cloudflare 관리형 robots.txt를 덮어쓸 수 없다.** 영역을 추가하면서 AI Crawl Control이 켜졌고 GPTBot, ClaudeBot, CCBot, Google-Extended, Bytespider, Amazonbot, meta-externalagent를 막는 관리형 블록이 앞에 붙는다. Worker 자신의 robots.txt는 그 뒤에 이어 붙을 뿐 무효화하지 못한다. 이는 학습 크롤러를 막는 것이고 실행 시점의 API 호출자는 영향을 받지 않지만, 문서가 이후 모델 학습 데이터에 들어가지 못하므로 발견 가능성에는 불리하게 작용한다. 대시보드의 토글은 눌러도 상태가 유지되지 않아 요금제 수준 변경이나 지원 문의가 필요할 것으로 본다.

**관측 집계에 우회가 필요하다.** Analytics Engine SQL의 제약 때문에 고유 수를 직접 셀 수 없고, `double3` 열은 추가 이전 기록에서 0으로 읽힌다. 가명화로 얻은 고유 호출자 수도 엄밀히는 호출자-일 수다.

**DNS 연결에 수동 단계가 남는다.** 도메인은 Porkbun에, Worker는 Cloudflare에 있다. Worker 사용자 지정 도메인은 영역이 Cloudflare에 있어야 하는데 보유한 API 토큰에 `zone.create` 권한이 없어, 대시보드에서 도메인을 추가하는 한 단계는 사람이 해야 한다. 이후는 `finish-dns.sh`가 할당된 네임서버를 읽어 Porkbun API로 지정하고 Worker를 apex와 `www`에 연결한다.

**운영자 전용 키의 범위가 좁다.** `AGENT_API_KEY`는 기존의 미과금 분류 경로를 쓰고 `ENTERPRISE_API_KEY`를 대체하지 않으며, 비공개 보고서나 관리 기능에는 권한을 주지 않는다. 공개 클라이언트에 넣지 말라는 단서가 붙어 있다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| decision model | 텍스트를 생성하지 않고 타입이 정해진 판단과 확률을 반환하는 모델 범주. Jev가 이 범주의 구현체다 |
| state | Jev에 넘기는 평가 대상 묶음. 이 저장소에서는 `{id, text}` 배열이다 |
| question group | 복구가 함께 묶어 두는 요청의 최소 단위. 일반 분류는 입력 하나의 질문들, dimension 분류는 결정 하나다 |
| tier | 요청이 고르는 처리 등급. fast는 Jev 응답 그대로, smart는 낮은 신뢰도 응답만 재질의한다 |
| escalation | 신뢰도가 기준 미만인 응답을 다른 모델에 다시 물어 교체하는 처리 |
| dimension | 같은 입력을 서로 다른 라벨 집합으로 동시에 분류하는 필드 |
| caller-day | 호출자 해시에 UTC 날짜가 섞여 있어 기간 집계 시 실제로 세어지는 단위 |

## 관련 페이지

- [[llms/typesafe-ai-2026-introduction]]: 이 저장소가 호출하는 Jev의 공식 문서 도입부. Choice, Score, Noul 세 primitive와 질문을 원자 단위로 쪼개라는 설계 지침을 다룬다
- [[llms/hada-2026-jev-judgment-probability-model]]: Jev 공개를 요약하고 국내외 반응을 덧붙인 자료. 가격과 속도 수치, 보정 주장에 대한 논쟁이 정리되어 있다
- [[agents/agentskills-io-2026-agent-skills-overview]]: agent skill 형식과 배포 경로를 다룬다. classifier.dev가 well-known 경로로 skill을 직접 서빙하는 방식과 비교해 읽을 수 있다
- [[applications/cheahjs-free-llm-api-resources]]: OpenRouter를 비롯한 provider의 무료 한도를 정리한 자료. fallback 체인과 escalation 모델 선택의 비용 맥락을 준다
