---
title: "classifier.dev: Zero-shot text classification over plain HTTP"
type: repo
year: 2026
category: applications
raw_path: raw/repos/mrmps-classifier-dev.md
raw_filename: "mrmps-classifier-dev.md"
source_collection: external
org: "mrmps"
repo: "classifier-dev"
url: "https://github.com/mrmps/classifier-dev"
license: "MIT"
tags: [classifier-dev, zero-shot, text-classification, typesafe-ai, jev, system-one-model, cloudflare-workers, durable-object, mcp, agent-skill, calibration, multi-label, rate-limiting, analytics-engine, repo]
---

## 한 줄 요약 (One-line Summary)

API 키도 가입도 없이 URL만으로 zero-shot 텍스트 분류를 제공하는 Cloudflare Worker 단일 서비스로, 생성 모델 대신 TypeSafe의 Jev라는 decision model을 호출해 라벨과 보정된 신뢰도를 한 번에 돌려준다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 저장소 | `mrmps/classifier-dev` |
| 서비스 | https://classifier.dev |
| 라이선스 | MIT |
| 주 언어 | TypeScript |
| 생성 시점 | 2026-08 |
| 구성 | Cloudflare Worker 1개, npm CLI 1개(`classifier-dev`), MCP 서버, agent skill |
| 저장소 주제 | api, classification, cli, cloudflare-workers, llm, mcp, text-classification, zero-shot |

README 전문이 원본이며 이미지나 도식은 포함되어 있지 않다.

## 2. 주요 기여 (Key Contributions)

**인증 없는 URL 호출을 분류 인터페이스로 삼았다.** 경로에 라벨 집합과 텍스트를 넣으면 응답 본문이 라벨 한 단어다. 질의(query) 문자열 형태도 같은 호출로 취급한다.

```
curl https://classifier.dev/spam,not+spam/Win+a+free+iPhone
spam

curl "https://classifier.dev/?labels=spam,not+spam&text=Win+a+free+iPhone"
spam
```

**생성 모델을 decision model로 교체하고 그 차이를 세 가지 기능으로 환산했다.** 두 tier 모두 TypeSafe의 Jev가 답한다. Jev는 텍스트를 생성하는 대신 state와 타입이 정해진 질문을 받아 선택지별 보정 확률을 약 150ms에 돌려주는 모델이다. 이 형태 덕분에 요청당 1,000건 입력, 의미 있는 신뢰도, 단일 호출 multi-label 세 가지가 가능해졌다.

**신뢰도를 escalation 기준으로 쓰는 tier를 정의했다.** `tier: "smart"`는 단일 라벨 응답 중 신뢰도 0.7 미만인 것만 빠른 추론 모델에 다시 묻고 교체하며, 교체된 항목에 `escalated: true`를 표시한다. 이전 LLM 구현의 logprob 기반 신뢰도로는 이 분기 자체가 성립하지 않았다.

**운영 신호를 제품의 일부로 만들었다.** 15분 주기 알림, 일일 요약 메일, 요청당 원가 계측, 키 기반 가명화가 모두 Worker 안에 들어 있다. 특히 Jev가 응답하지 않고 fallback 체인이 조용히 대신 답하는 상황을 별도 조건으로 감시한다.

**에이전트가 스스로 발견하고 신고할 수 있는 표면을 붙였다.** OpenAPI 문서, `llms.txt`, RFC 8615 well-known 경로의 agent skill, feedback.now 프로토콜 구현이 모두 같은 도메인에서 제공된다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 모듈 구성

| 모듈 | 책임 |
|---|---|
| `src/index.ts` | 라우팅, HTTP 검증, quota, tier와 모델 선택, smart escalation, LLM fallback 체인, 응답 형식화 |
| `src/jev.ts` | Jev 질문과 응답, 공유 batch 예산과 복구, gateway 또는 직접 전송, provider 검증 |
| `src/dimensions.ts` | dimension 정의와 입력-dimension 결정을 Jev 질문으로 옮기고 되돌리는 매핑 |
| `src/query.ts` | GET 질의 형식, 오류가 제안하는 URL 생성 |
| `src/limiter.ts` | Durable Object 기반 IP별 rate limiting |
| `src/report.ts` | Analytics Engine SQL 결과를 Resend로 보내는 일일 요약, 모델 fallback 표시 |
| `src/alerts.ts` | 15분 주기 점검, 이상이 있을 때만 메일 발송 |
| `src/feedback.ts` | feedback.now 프로토콜 기반 에이전트 신고 수신 |
| `src/privacy.ts` | 키를 섞은 가명 처리, 보관된 값이 호출자를 가리키지 않게 함 |
| `src/cost.ts` | provider 자체 정산에 근거한 요청당 상위 지출 계측 |
| `src/docs.ts` / `src/home.ts` / `src/ui.ts` | 평문 문서, 브라우저용 렌더링, 공통 표현 |
| `cli/` | npm에 `classifier-dev`로 배포되는 `classify` 명령 |
| `eval/` | 벤치마크, 수치를 인용하기 전에 `eval/README.md`를 읽도록 안내 |

의존성은 esbuild 외에 빌드 단계가 없고 데이터베이스도 프레임워크도 쓰지 않는다. 뉴스레터 기능만 별도로 Postgres를 사용한다.

### 3.2 Jev 호출과 batch 구성

state는 `{id, text}` 배열이고 입력마다 자기 질문을 갖는다. 따라서 batch 전체가 상위 호출 한 번으로 끝난다.

문서화된 한도는 요청당 6만 4천 토큰이며, `jev.ts`는 그보다 보수적인 예산으로 묶은 뒤 만들어진 요청들을 8개씩 동시에 보낸다.

question group은 복구가 함께 묶어 두는 요청의 최소 단위다. 일반 분류에서는 입력 하나의 질문들이, dimension 분류에서는 결정 하나가 여기에 해당한다. batch 준비 단계는 공유되는 입력 텍스트를 한 번만 계산하고 두 provider의 예산을 함께 확인하며, dimension의 경우 quota를 차감하기 전에 수행된다.

### 3.3 tier와 fallback 체인

| tier | 동작 | 한도 |
|---|---|---|
| fast | Jev 응답을 그대로 반환 | 분당 3,000건, 일당 20,000건 |
| smart | 신뢰도 0.7 미만 단일 라벨 응답만 추론 모델에 재질의 후 교체 | 분당 200건, 일당 2,000건 |
| multi-label | tier를 무시하고 Jev 결과만 사용 | fast와 동일 |

Jev를 쓸 수 없을 때는 `index.ts`의 LLM 체인이 대신 답하되 입력 20건으로 제한된다. 입력마다 호출이 하나씩 필요하기 때문이다.

fallback이 작동했다는 사실은 일일 요약에 `FALLBACK` 표시로 남는다. 이전 구현에서 주 모델이 상위 서비스에서 목록 제외된 뒤 백업 모델이 몇 주 동안 F1 0.546으로 조용히 서빙된 일이 있었고, 그 사건이 이 표시를 만든 계기다.

### 3.4 multi-label과 multi-dimension

multi-label은 라벨마다 예/아니오 질문을 하나씩 만들고, 0.7 이상인 라벨을 가능성이 높은 순으로 전체 점수 맵과 함께 반환한다.

`POST /v1/classify`는 `items`와 `dimensions`도 받는다. 아래처럼 dimension마다 라벨 집합과 선택적 지시문(instructions)을 줄 수 있다.

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

`results[i].dimensions[name]`마다 라벨, 신뢰도, 점수, 모델, 지연 시간이 따로 붙는다. Jev는 item과 dimension을 가로지르는 질문 사이에서 state를 공유해 양쪽 컨텍스트 한도를 함께 채운다.

smart escalation은 필드 단위로 일어나며 교체 시 원래 점수를 지운다. Jev를 쓸 수 없으면 dimension도 20건까지만 fallback한다. API는 dimension 20개와 결정 1,000건까지 받고 결정 하나마다 quota를 차감한다. `classify_dimensions` MCP tool이 같은 경로를 쓴다.

### 3.5 rate limiting

IP별 계수는 Durable Object 안에서 분류 건수 기준으로 이뤄진다. 저자는 두 가지 대안을 시도한 뒤 기각했다고 적는다.

- Cloudflare의 기본 `ratelimit` 바인딩은 등록은 되지만 차감되지 않았다. 한도 60에 대해 70번 호출했는데 전부 `success: true`를 반환했다.
- KV는 edge에 캐시되고 최종 일관성만 보장하므로, 방금 기록한 카운터가 다음 읽기에서 보이지 않았다. 모든 요청이 `remaining: 59`를 봤다.

Durable Object는 단일 스레드이며 강한 일관성을 보장한다. 최초 한도 분당 60건으로 검증했을 때 75건 요청이 200 응답 60건과 429 응답 15건으로 갈렸다.

### 3.6 관측과 개인정보

요청마다 Analytics Engine 데이터포인트가 하나씩 기록된다. tier, 라벨 집합 지문, 국가, 상태, 건수, 지연 시간이 들어가고 요청 텍스트는 저장되지 않는다.

원가도 함께 기록한다. OpenRouter는 요청하면 호출 요금을 반환하고, Jev는 자신이 보고한 입력 토큰 수로 과금된다. 누적치는 `double3` 열에 쌓이며, 이 열은 출시 이후에 추가되어 그 배포 이전 기록에서는 0으로 읽힌다.

가명화는 두 열을 대상으로 한다. 과거에 호출자를 가리키던 IP 주소와 소문자로 합친 라벨 집합이 모두 키를 섞은 해시로 바뀌었다. 호출자 해시에는 UTC 날짜가 함께 들어가므로 7일이나 30일 단위의 고유 호출자 수는 실제로는 호출자-일 수다.

`PRIVACY_SALT`는 32바이트 난수로 설정한다. 회전시키면 모든 지문이 다시 번호를 받아 회전 구간에서 고유 수가 중복 계수된다. 값이 없으면 `ADMIN_SIGNING_KEY`, `REPORT_KEY`, isolate별 난수 순으로 대체하는데, 키 없는 해시는 IPv4 주소나 흔한 라벨 집합에 대해 몇 초 만에 역산되기 때문이다.

### 3.7 알림

별도 cron이 15분마다 실행되고 아무 문제가 없으면 침묵한다. 조치가 따르는 조건만 감시한다는 원칙 아래, Jev 키 거부, Jev 무응답과 조용한 fallback, 5xx 비율, smart tier escalation 실패, 평균 지연 시간, 직전 하루 대비 지출 급증, 트래픽 중단을 본다. 4xx는 `/wp-admin`을 찾는 스캐너이므로 무시한다.

Jev 잔액 감시는 우회 방식을 쓴다. TypeSafe는 잔액 조회 endpoint를 공개하지 않고 API가 `/v1/systemone`과 `/v1/models` 둘뿐이므로, 점검 과정이 15분마다 키로 `/v1/models`를 호출해 TypeSafe가 돌려준 상태를 그대로 보고한다. 401, 402, 403은 각각 크레딧 소진, 폐기, 오류 키를 뜻할 수 있는데 어느 쪽인지 추측하지 않고 TypeSafe의 메시지를 인용해 중대 알림을 올린다. 트래픽을 기다리지 않고 먼저 찔러 보기 때문에 호출자가 fallback 체인을 만나기 전에 발동하고, Analytics Engine이 죽어 있어도 동작한다.

각 조건은 시작할 때 한 번, 지속되는 동안 6시간마다, 해소될 때 한 번 메일을 보낸다. 상태는 KV의 `alert:` 아래 저장되고 임계값은 `src/alerts.ts` 상단의 `T` 객체에 모여 있다.

Jev provider 시도 기록은 `JEV_AE`를 통해 `classifier_jev_attempts`에 따로 쌓인다. 복구된 실패, 재시도, gateway 냉각 건너뛰기가 포함되며, provider별 상태와 사유와 건수와 평균 지연 시간이 보고서에 들어간다. 한 provider에서 시도 3건 이상이 실패하고 실패율이 5%를 넘으면 경고한다.

### 3.8 문서와 배포

`curl classifier.dev`는 평문을 출력하고 브라우저는 `Accept: text/html`로 같은 문서의 렌더링본을 받는다. 두 응답 모두 요청 시점에 `DOCS`와 `BENCHMARK` 상수에서 생성되므로 내용이 갈라질 수 없고, `?format=text`로 평문을 강제할 수 있으며 `Vary: accept`가 붙는다.

`main`에 병합하면 배포된다. 워크플로는 타입 검사, Worker와 CLI 테스트, `wrangler deploy`를 거친 뒤 실제 서비스에 `/v1/health`와 분류 요청 하나를 보낸다. 따라서 깨진 Worker를 올린 배포는 사용자 터미널이 아니라 CI에서 실패한다.

`wrangler.toml`은 gitignore 대상이며 계정별 값인 `account_id`와 `STATS` KV 네임스페이스 id만 담는다. 나머지 cron, 바인딩, 마이그레이션은 추적되는 `wrangler.example.toml`에 있다. CI에는 `wrangler.toml`이 없으므로 `.github/render-wrangler.mjs`가 예시 파일과 저장소 시크릿 세 개로 생성한다. 그 결과 예시 파일이 배포 형태의 사본이 아니라 배포 형태 자체가 된다.

시크릿은 `wrangler secret put`으로 Worker에 올라가며 스크립트 번들에 들어가지 않는다. 비교는 `src/secrets.ts`의 `secretEquals`로 하고 `===`를 쓰지 않는데, 일반 비교는 첫 번째 틀린 바이트에서 반환해 추측이 어디까지 맞았는지 알려주기 때문이다.

### 3.9 에이전트 표면

| 표면 | 경로 | 내용 |
|---|---|---|
| OpenAPI | `GET /openapi.json`, `/.well-known/openapi.json` | OpenAPI 3.1 |
| 에이전트 인덱스 | `GET /llms.txt` | robots.txt에서 연결되는 짧은 인덱스 |
| 벤치마크 | `GET /benchmark` | 측정된 정확도, 비용, 지연 시간 |
| agent skill | `GET /skill.md`, `/.well-known/agent-skills/index.json` | RFC 8615 well-known 발견, schema v0.2.0 |
| 신고 접수 | `/.well-known/agent-feedback.json`, `/api/v1/*` | feedback.now 프로토콜 schema 1.1 |

skill은 `npx skills add https://classifier.dev`로 설치하며 저장소를 거치지 않는다. 인덱스가 artifact의 sha256을 담아야 하고 둘이 어긋나면 설치가 불가능해지므로, `src/skill.ts`가 실제로 서빙하는 바이트를 isolate마다 한 번 해싱한다. 따라서 `SKILL.md`만 고치면 되고 다른 곳을 함께 갱신할 필요가 없다.

skill이 가르치는 내용은 API 홍보 문구가 놓치는 지점이다. 호출자는 이미 모델이라서 눈에 보이는 것은 무엇이든 분류할 수 있고, 따라서 외부 호출을 하는 이유는 능력이 아니라 컨텍스트에 있다. 검색 결과 40건을 다 읽지 않고 6건으로 줄이는 상황이 그 예다.

신고 접수는 분류기나 Analytics Engine을 호출하지 않는다. 그 둘이 고장났다는 신고가 도착하는 곳이므로 둘이 죽어도 작동해야 하기 때문이다. 접수된 신고는 `REPORT_TO`로 메일 발송되고 KV에 90일 보관된다. 도메인, 표면, 범주, 제목이 같은 반복 신고는 저장하고 중복으로 확인해 주되 메일을 다시 보내지 않아, 반복 호출하는 에이전트 하나가 받은 편지함을 채우지 못한다. 시간당 예산은 IP당 100건이고 잔여량은 모든 접수증에 담긴다. `quality_score`는 신고의 완성도에 대한 결정론적 함수여서 에이전트가 규칙을 읽고 다음 신고를 더 낫게 쓸 수 있다.

### 3.10 뉴스레터

가입 요청은 즉시 저장되지 않는다. `POST /subscribe`는 Resend로 확인 메일을 보내고 `202 {"ok":true,"status":"pending_confirmation"}`을 반환하며, 메일로 받은 토큰을 `POST /subscribe/confirm`에 제출해야 비로소 기록된다. GET은 양식만 렌더링하므로 메일 스캐너가 구독을 확정시킬 수 없다.

토큰은 `NEWSLETTER_CONFIRMATION_SECRET`으로 서명하고 24시간 안에 만료되며 가입 응답에 포함되지 않는다. 서명 키를 회전하면 발급된 링크가 무효가 된다.

구독자 표는 메일 주소, 유입 경로, 가입과 확인과 해지 날짜, 선택한 로드맵 항목(`wants text[]`), 더 빠른 추론을 골랐을 때의 요청 지연 시간, 내부 id를 담는다. IP, 요청 id, 분류 트래픽은 담지 않는다.

로드맵 문구는 `src/newsletter.ts`의 `ROADMAP` 상수 하나다. 평문 문서, 렌더링된 양식, `index.md`가 모두 이 상수를 읽으므로 로드맵 변경이 세 곳에 동시에 반영되거나 어디에도 반영되지 않는다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 처리량

400건 뉴스 헤드라인을 종단 간 650ms에 분류했다. 100건을 한 요청에 묶었을 때의 점수는 한 건씩 따로 보냈을 때와 같았다.

### 4.2 신뢰도 보정

| 모델 | 조건 | 실제 정답률 |
|---|---|---|
| Jev | 6지선다 감정 400건, 신뢰도 0.9 이상 | 82% |
| Jev | 6지선다 감정 400건, 신뢰도 0.5 미만 | 29% |
| 이전 LLM | 뉴스 항목의 87%가 0.9 이상으로 분류됨 | 68% |

이전 구현의 logprob 기반 신뢰도는 대부분의 응답을 높은 값에 몰아넣었고 그 구간의 실제 정답률도 낮았다. 반면 Jev의 신뢰도는 구간마다 정답률이 크게 갈려 분기 기준으로 쓸 수 있다.

### 4.3 smart tier에 쓸 모델 선택

Jev가 확신하지 못한 항목만 골라 여러 모델에 다시 물은 결과다.

| 재질의 모델 | 뉴스 주제 | 감정 | 비고 |
|---|---|---|---|
| Jev 단독 | 87.5% | 61.8% | 기준 |
| deepseek-v4-flash, qwen3.7-flash, mercury-2.5 | 개선 없음 | 개선 없음 | Jev보다 낫지 않았다 |
| gemini-3.8-flash | 90.0% | 63.7% | 채택된 체인 |
| claude-fable-5.1 | 72.3% | 90.7% | 약 3배 비용 |

frontier 모델의 수치가 두 데이터셋에서 반대 방향으로 갈리며, 가격 대비 이득 판단을 위해 `/benchmark`에 수치를 공개해 둔다.

### 4.4 multi-label

| 구현 | F1 | 지연 시간 |
|---|---|---|
| Jev 단일 호출 | 0.887 | 230ms |
| 이전 sweep-and-verify LLM 캐스케이드 | 0.799 | 1.5초 |

Jev 후보를 추론 모델로 다시 판정하는 방식은 F1을 떨어뜨렸고 23초가 걸렸다. 그래서 multi-label은 tier 설정을 무시한다.

### 4.5 평가 실행

```
npm run bench                 # multi-label 7개 사례, Jev와 OpenRouter 모델 비교
npm run single -- --dataset emotion --backend jev
npm run single -- --dataset ag_news --backend openrouter:qwen/qwen3.7-flash
python3 eval/escalate.py --dataset emotion
```

`single.py`는 AG News와 dair-ai/emotion 테스트 행을 처음 실행할 때 받아 두고 원시 결과를 `eval/data/results/`에 캐시한다. 덕분에 `escalate.py`가 여러 backend 결과를 다시 비용을 들이지 않고 조합할 수 있다.

### 4.6 라이브 테스트

`npm run test:e2e`는 Node 22.18 이상에서 실제 운영 API를 상대로 돈다. mock 없이 진짜 HTTP와 모델을 호출하므로 추론 비용이 발생하고 일반 quota를 차감한다.

검사 항목은 300건 결정 batch의 정확한 결정과 순서, 필드별 허용 라벨과 확률 분포, 실제 smart escalation, provider 점수 보존, 별칭, 검증 오류, MCP, OpenAPI, 구버전 호출이다. 응답은 `unknown`으로 시작해 검증을 거친 뒤에야 타입이 붙은 행렬이 된다. smart 테스트는 실제 escalation이 일어나야 통과하므로, 모든 고정 입력이 확신으로 바뀌는 모델 변화는 조용히 건너뛰이지 않고 테스트 실패로 드러난다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

**상위 서비스 의존.** 두 tier 모두 TypeSafe의 Jev에 의존한다. Jev를 쓸 수 없을 때의 LLM fallback은 입력 20건이 상한이라 1,000건 batch를 대신할 수 없다.

**gateway 경로가 현재 꺼져 있다.** Vercel AI Gateway가 9월 19일에 429를 반복 반환한 뒤 `AI_GATEWAY_DISABLED = "true"`로 두어 운영이 TypeSafe를 직접 호출한다. gateway 키는 남겨 두었고, 복구하려면 용량을 확인한 뒤 변수를 `"false"`로 바꿔 배포하고 provider 시도 기록과 라이브 테스트를 다시 확인해야 한다.

**Cloudflare 관리형 robots.txt를 덮어쓸 수 없다.** 영역을 추가하면서 AI Crawl Control이 켜졌고, GPTBot, ClaudeBot, CCBot, Google-Extended, Bytespider, Amazonbot, meta-externalagent를 막는 관리형 블록이 앞에 붙는다. Worker 자신의 robots.txt는 그 뒤에 이어 붙을 뿐 무효화하지 못한다. 이는 학습 크롤러를 막는 것이고 실행 시점의 API 호출자는 영향을 받지 않지만, 문서가 이후 모델 학습 데이터에 들어가지 못하므로 발견 가능성에는 불리하게 작용한다. 대시보드의 토글은 눌러도 상태가 유지되지 않아 요금제 수준 변경이나 지원 문의가 필요할 것으로 본다.

**Analytics Engine SQL의 제약.** Cloudflare가 제공하는 것은 좁은 ClickHouse 부분집합이라 `uniq()`도 `SELECT DISTINCT`도 없고 `SELECT col ... GROUP BY col` 형태도 거부된다. 고유 수는 `SELECT col, count() ... GROUP BY col`으로 구한 뒤 반환된 행 수를 세는 방식으로 우회하며, 질의 하나가 실패해도 보고서 전체가 비지 않도록 각 질의를 격리한다.

**DNS 연결에 수동 단계가 남는다.** 도메인은 Porkbun에, Worker는 Cloudflare에 있다. Worker 사용자 지정 도메인은 영역이 Cloudflare에 있어야 하는데 보유한 API 토큰에 `zone.create` 권한이 없어, 대시보드에서 도메인을 추가하는 한 단계는 사람이 해야 한다. 이후는 `finish-dns.sh`가 할당된 네임서버를 읽어 Porkbun API로 지정하고 Worker를 apex와 `www`에 연결한다.

**운영자 전용 키의 범위.** `AGENT_API_KEY`는 기존의 미과금 분류 경로를 쓰고 `ENTERPRISE_API_KEY`를 대체하지 않으며, 비공개 보고서나 관리 기능에는 권한을 주지 않는다. 공개 클라이언트에 넣지 말라는 단서가 붙어 있다.

## 6. 관련 연구 (Related Work)

- **TypeSafe AI Jev.** 이 저장소가 호출하는 모델이다. state와 타입이 정해진 질문을 받아 보정 확률을 반환하는 System One model이며, 공식 문서는 Choice, Score, Noul 세 primitive를 제시한다.
- **feedback.now.** 에이전트가 서비스에 문제를 보고하는 프로토콜이다. 이 저장소는 schema 1.1을 구현했다.
- **MCP.** `classify_dimensions`를 포함한 tool을 MCP 서버로 노출한다.
- **agent skills.** RFC 8615 well-known 경로에서 schema v0.2.0 인덱스와 함께 skill artifact를 배포한다.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| decision model | 텍스트를 생성하지 않고 타입이 정해진 판단과 확률을 반환하는 모델 범주. Jev가 이 범주의 구현체다 |
| state | Jev에 넘기는 평가 대상 묶음. 이 저장소에서는 `{id, text}` 배열이다 |
| question group | 복구가 함께 묶어 두는 요청의 최소 단위. 일반 분류는 입력 하나의 질문들, dimension 분류는 결정 하나다 |
| tier | 요청이 고르는 처리 등급. `fast`는 Jev 응답 그대로, `smart`는 낮은 신뢰도 응답만 재질의한다 |
| escalation | 신뢰도가 기준 미만인 응답을 다른 모델에 다시 물어 교체하는 처리. 교체된 항목에 `escalated: true`가 붙는다 |
| dimension | 같은 입력을 서로 다른 라벨 집합으로 동시에 분류하는 필드. 요청당 20개까지 지정한다 |
| Durable Object | Cloudflare가 제공하는 단일 스레드, 강한 일관성 실행 단위. IP별 rate limiting 카운터에 쓴다 |
| caller-day | 호출자 해시에 UTC 날짜가 섞여 있어 기간 집계 시 실제로 세어지는 단위 |
| sweep-and-verify | 후보를 넓게 훑은 뒤 각각을 다시 확인하는 이전 multi-label LLM 캐스케이드 방식 |
