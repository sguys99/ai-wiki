---
title: "Firecrawl"
type: repo
year: 2026
category: applications
raw_path: raw/repos/firecrawl-firecrawl.md
raw_filename: "firecrawl-firecrawl.md"
source_collection: external
org: "firecrawl"
repo: "firecrawl"
url: "https://github.com/firecrawl/firecrawl"
revision: "e6c2ffdf7072fe9ab72eefa59622454f7480e163"
license: "AGPL-3.0 (SDKs and some UI components: MIT)"
tags: [web-scraping, web-crawling, rag, mcp]
source: firecrawl-firecrawl.md
---

## 요약

Firecrawl은 웹에 있는 자료를 애플리케이션에서 읽을 수 있는 문서로 바꾼다. 제품 매뉴얼 한 장의 본문이 필요하면 URL 하나를 넘기고 Markdown을 받는다. 매뉴얼 전체를 검색 대상으로 삼으려면 시작 주소와 페이지 수 상한을 주고 링크를 따라가게 한다. 수집할 주소조차 모를 때는 Cloud에서 검색어로 출발할 수 있다.

별도 서버 없이 문서 몇 장을 파일로 저장할 때는 **Firecrawl Local**이 가장 간단하다. 설치 없이 한 번 시험하거나 검색 결과의 본문까지 한 요청으로 받으려면 **Firecrawl Cloud**를 쓴다. 팀이 자체 인프라에서 워커와 작업 큐까지 관리해야 한다면 저장소의 Docker Compose 구성이 출발점이다.

## 용도에 따른 수집 방법

| 하고 싶은 일 | 가지고 있는 입력 | 작업과 산출물 |
|---|---|---|
| 특정 문서를 모델에 읽히기 | 페이지 URL 한 개 | Scrape가 메뉴와 바닥글을 정리한 본문을 Markdown으로 반환한다. |
| 제품 문서로 질문에 답하는 서비스 만들기 | 문서 사이트의 시작 주소 | Crawl이 링크를 따라가며 페이지별 문서를 모은다. 애플리케이션에서 각 본문과 출처를 함께 저장한다. |
| 제품 소개 사이트에서 가격 페이지 찾기 | 사이트 주소와 `pricing` 같은 단어 | Map으로 후보 URL을 좁힌 뒤 필요한 주소만 읽는다. |
| 이미 고른 여러 문서를 한 번에 갱신하기 | 확정한 URL 목록 | Batch Scrape가 지정한 주소의 문서를 일괄 반환한다. |
| 여러 사이트에 흩어진 자료 조사하기 | 주제나 검색어 | Cloud Search에 본문 수집 옵션을 주면 검색 결과와 Markdown을 함께 받는다. |
| 조사 결과를 정해진 필드로 받기 | 조사 목표와 스키마 | Cloud Agent에 회사 창업자 조사와 이름, 직책 필드를 지정하면 그 구조로 결과를 받는다. |

문서 기반 RAG에서 Firecrawl이 맡는 일은 원본 수집이다. RAG는 질문과 관련된 자료를 검색하고 그 자료를 근거로 답을 생성하는 방식이다. 예를 들어 API 문서를 수집할 때는 제목과 본문을 Markdown으로 남기고 페이지 URL을 함께 보관한다. 이후 문서를 검색 단위로 나누고 인덱스를 만드는 과정은 답변 서비스에서 설계한다. 답변에 출처 링크를 표시할 수 있는 것도 이때 본문과 주소를 함께 보관했기 때문이다.

## 유사 도구와 비교한 장점

| 비교 대상 | 그 도구가 적합한 경우 | Firecrawl을 선택할 이유 |
|---|---|---|
| Jina Reader | 이미 정한 URL 하나를 읽을 때. 이 위키의 수집기는 `r.jina.ai/` 뒤에 주소를 붙여 Markdown을 받는다. | 문서 한 장에서 사이트 단위로 범위가 커지면 같은 클라이언트에서 Map으로 주소를 찾거나 Crawl로 본문까지 수집할 수 있다. |
| Playwright와 BeautifulSoup 조합 | 클릭할 요소와 본문 선택 규칙을 사이트별로 세밀하게 정해야 할 때 | 여러 사이트에 공통으로 적용할 본문 추출이 목적이면 렌더링, 본문 선택, Markdown 변환 코드를 각각 작성할 필요가 없다. |
| Browser Use | 에이전트가 브라우저를 열어 신청서를 채우는 등 화면 안에서 과제를 마쳐야 할 때 | 결과물이 문서 묶음이면 시작 주소, 페이지 수, 출력 형식을 직접 지정할 수 있다. 각 페이지로 이동하는 절차를 에이전트에게 지시할 필요가 없다. |

이 위키의 기사 수집 스크립트가 앞의 두 비교를 구체적으로 보여 준다. Chrome 경로에서는 Playwright로 HTML을 얻고 BeautifulSoup에서 본문 후보를 고른 다음 별도 함수가 Markdown으로 변환한다. Firecrawl 경로가 하는 일은 URL과 출력 형식을 `/v2/scrape`에 보내고 응답의 `data.markdown`과 제목을 읽는 것이다. 자동 모드는 Jina Reader부터 시도하며 Firecrawl 키가 설정돼 있으면 마지막에 Firecrawl을 시도한다. 한 페이지에서 두 도구가 같은 결과물을 낼 수 있어도 사이트 전체를 수집할 때 필요한 코드는 달라진다. [기사 수집기 구현](https://github.com/sguys99/ai-wiki/blob/1f8808ac523b64e5bfc6776c5f13ba8ed445ef60/scripts/fetch_article.py)

브라우저 조작과 데이터 수집을 섞어야 하는 경우도 있다. 처음 읽은 페이지에서 검색창을 조작한 뒤 결과를 확인하는 작업에는 Cloud의 Interact가 대응한다. Scrape 응답의 `metadata.scrape_id`를 다음 요청에 넘기므로 어느 페이지에서 조작을 이어갈지 지정할 수 있다. 반면 이미 주소가 정해진 페이지 10장의 본문이 목적이라면 Batch Scrape 한 번으로 작업을 표현할 수 있다.

## 설치와 첫 실행

### 한 페이지를 바로 읽는 방법

Node.js와 `npx`가 있는 터미널에서는 아래 한 줄로 공식 Cloud CLI를 시험할 수 있다. CLI가 Firecrawl의 서버에 수집을 요청하고 터미널에 페이지 내용을 출력한다. 개인 장비에 브라우저나 데이터베이스를 준비할 필요가 없다.

```bash
npx -y firecrawl-cli@latest scrape https://firecrawl.dev
```

README는 Keyless 방식으로 가입이나 API 키 없이 월 1,000크레딧을 제공한다고 안내한다. 이 수치는 2026년 11월 수집 시점의 사용 조건이다. 크레딧은 작업별 사용량을 세는 단위이므로 수집 가능한 문서 수를 월 1,000페이지로 가정해서는 안 된다.

### 로컬 실행 파일 설치

Rust의 패키지 관리자인 Cargo와 C 컴파일러를 준비한다. macOS에서는 Xcode 명령줄 도구를, Debian이나 Ubuntu에서는 `build-essential`을 사용한다. 다음 명령은 Local을 설치하고 정적 페이지 한 장을 Markdown으로 출력한다.

```bash
cargo install firecrawl-local
firecrawl-local --version
FIRECRAWL_CLOUD=off firecrawl-local scrape https://example.com --markdown
```

Local은 기본적으로 페이지를 로컬에서 읽고 정리한다. JavaScript 실행 뒤에 본문이 나타나는 페이지는 컴퓨터에 설치된 Chrome이나 Chromium으로 렌더링한다. 브라우저가 없어도 정적 페이지는 읽을 수 있고, 브라우저가 필요했던 페이지에는 경고가 붙는다. PDF와 Office 문서도 로컬에서 파싱한다.

`FIRECRAWL_CLOUD=off`는 단일 페이지 수집 실패 시 Cloud에서 재시도하는 기본 동작을 끈다. 기본값인 `auto`에서 Cloud가 본문을 가져오면 결과에 `"source": "firecrawl-cloud"`가 표시된다. 원격 검색만 허용하려면 값을 `search`로 지정한다. 이 설정은 원본 사이트에 접속하는 것과 Firecrawl의 서버에 요청을 넘기는 것을 구분한다.

### 자체 호스팅 서버 설치

여러 워커와 작업 큐를 함께 운영하려면 Docker와 Docker Compose를 준비한다. 다음은 이 문서에서 확인한 버전으로 서버를 시작하고 로컬 인터페이스에만 API 포트를 여는 예다. Local의 `serve`도 기본 포트 3002를 사용하므로 두 방식 중 하나를 실행한다.

```bash
git clone https://github.com/firecrawl/firecrawl.git
cd firecrawl
git checkout --detach e6c2ffdf7072fe9ab72eefa59622454f7480e163
PORT=127.0.0.1:3002 docker compose up --build -d
docker compose ps
```

API 서비스가 준비되면 다음 요청으로 확인한다. 응답에서 `success`가 참이고 `data.markdown`에 페이지 본문이 있으면 브라우저나 SDK를 추가로 연결하기 전에 수집 경로부터 확인한 셈이다.

```bash
curl --fail-with-body http://127.0.0.1:3002/v2/scrape \
  -H 'Content-Type: application/json' \
  -d '{"url":"https://example.com","formats":["markdown"]}'
```

기본 구성에는 API와 워커 외에 브라우저용 Playwright 서비스, Redis, RabbitMQ, NuQ PostgreSQL이 포함된다. 큐의 기본 저장소는 PostgreSQL이며 FoundationDB도 대체 구성으로 제공한다. 기본 API는 인증 없이 실행되고 Compose 파일은 PostgreSQL, Redis, RabbitMQ에 영구 볼륨을 정의하지 않는다. 공유 서버에서는 접근 제어와 데이터 보존 방식을 운영자가 구성해야 한다. [해당 버전의 자체 호스팅 안내](https://github.com/firecrawl/firecrawl/blob/e6c2ffdf7072fe9ab72eefa59622454f7480e163/SELF_HOST.md)

## 작업별 사용 예시

### 문서 사이트를 파일로 보관하기

링크 목록을 먼저 살피면 수집 범위를 정하기 쉽다. 첫 명령은 주소에 `pricing`이 포함된 후보를 찾는다. 두 번째 명령은 문서 사이트를 출발점으로 최대 10페이지까지 읽고 `./pages` 아래에 페이지마다 Markdown 파일 하나를 만든다.

```bash
firecrawl-local map https://firecrawl.dev --search pricing
firecrawl-local crawl https://docs.firecrawl.dev --limit 10 --out ./pages
```

Map은 URL 목록만 반환하므로 본문이 필요할 때는 Scrape나 Crawl로 이어간다. Crawl의 `--limit`은 페이지 수 상한이고 `--max-depth`는 시작 페이지에서 링크를 몇 단계까지 따라갈지 정한다. 특정 경로만 필요하면 `--include`와 `--exclude`로 경로 패턴을 지정할 수도 있다. 반대로 입력 URL이 이미 확정돼 있으면 링크를 새로 탐색하는 대신 Batch Scrape에 목록을 넘긴다.

### 파이썬에서 문서와 출처 읽기

Local을 실행하는 첫 번째 터미널에서 아래와 같이 v2 API를 연다. 기본 주소는 `127.0.0.1:3002`이며 로컬 수집에는 키가 필요 없다.

```bash
FIRECRAWL_CLOUD=off firecrawl-local serve
```

두 번째 터미널의 Python 환경에 공식 SDK를 설치한다. SDK는 실행 중인 서버에 요청을 보내는 클라이언트다.

```bash
python -m pip install firecrawl
```

다음 예시는 공개 문서에서 최대 3페이지를 읽고 각 페이지의 출처와 본문 앞부분을 출력한다. HTTP API에 직접 Crawl을 요청하면 첫 응답은 작업 ID다. SDK의 `crawl()`은 그 ID로 상태를 조회하고 완료된 문서 목록을 반환하므로 결과를 바로 순회할 수 있다.

```python
from firecrawl import Firecrawl

app = Firecrawl(api_url="http://localhost:3002")
job = app.crawl("https://docs.firecrawl.dev", limit=3)

for doc in job.data:
    if doc.metadata:
        print(doc.metadata.source_url)
    print((doc.markdown or "")[:200])
```

Local 서버는 Crawl과 Batch Scrape 작업을 메모리에 보관한다. 작업은 시작한 지 1시간이 지나거나 서버가 중지되면 사라진다. 나중에도 읽어야 하는 본문은 응답을 받았을 때 저장한다. 완료를 기다리는 동안 다른 일을 해야 하면 SDK의 `start_crawl()`로 ID를 받아 두고 `get_crawl_status()`로 진행 상황을 조회할 수 있다.

### 클라우드에서 검색 결과의 본문까지 읽기

제품의 변경 기록을 찾는 상황에서는 문서 주소를 일일이 지정하기 어렵다. Cloud Search에는 검색어와 결과 수를 넘기고, `scrape_options`에서 Markdown도 요청한다. 다음 예시는 공식 SDK가 설치돼 있고 Firecrawl 계정에서 발급받은 키를 `FIRECRAWL_API_KEY` 환경 변수에 설정한 경우다.

```python
import os
from firecrawl import Firecrawl
from firecrawl.types import ScrapeOptions
from firecrawl.v2.types import Document

app = Firecrawl(api_key=os.environ["FIRECRAWL_API_KEY"])
results = app.search(
    "Firecrawl changelog",
    limit=3,
    scrape_options=ScrapeOptions(formats=["markdown"]),
)
for page in results.web or []:
    if isinstance(page, Document):
        if page.metadata:
            print(page.metadata.source_url, page.metadata.title)
        print((page.markdown or "")[:200])
    else:
        print(page.url, page.title)
```

검색 결과의 제목과 주소만 필요하면 `scrape_options`를 생략한다. 검색에서 나아가 특정 필드를 채우는 일이 목적이면 Cloud Agent에 조사 목표와 스키마를 줄 수 있다. README의 창업자 조사 예시는 창업자마다 이름과 선택적 직책 필드를 지정한다. Alexandria는 웹페이지 외부의 데이터 서비스까지 검색 대상으로 넓히며, Local에서 연결할 때도 Cloud 로그인이 필요하다.

### 에이전트에 연결하기

MCP는 에이전트가 외부 도구를 일정한 방식으로 찾아 호출할 수 있게 하는 표준이다. Node.js 22 이상이 설치된 환경에서 아래 명령으로 Cursor에 적용할 설정을 미리 보고 등록한다. 등록 후 Cursor를 다시 시작하면 문서를 읽고 사이트를 탐색하는 기능을 에이전트에서 사용할 수 있다.

```bash
firecrawl-local init --agent cursor --dry-run
firecrawl-local init --agent cursor
```

Local은 수정 전 설정 파일을 백업한다. 대상을 지정하지 않은 `init`은 Codex, Claude Code 등 컴퓨터에서 발견한 지원 클라이언트 모두에 등록한다. 등록 후에도 실제 실행 위치는 도구에 따라 다르다. Scrape와 Crawl은 로컬에서 시작하지만 웹 검색과 Alexandria 요청은 Cloud로 간다.

## 성능 수치와 적용 한계

프로젝트가 Cloud에 대해 보고한 수치는 웹 커버리지 96%와 수백만 페이지에서 측정한 P95 지연 3.4초다. P95는 측정된 요청 중 95%가 그 시간 안에 끝났다는 뜻이다. README는 사이트별 성공 조건이나 Jina Reader, Playwright와 같은 입력으로 비교한 결과를 싣지 않았다. 특정 문서 사이트에서의 속도나 누락률을 판단하려면 그 사이트를 대상으로 측정해야 한다.

Local의 기본 출력은 Markdown, HTML, 원본 HTML, 링크다. 표의 특정 항목을 스키마에 맞춘 JSON으로 받거나 페이지 요약을 요청하는 작업은 Cloud에서 지원한다. Local에서는 두 형식을 요청해도 경고와 함께 건너뛴다. 이때 SDK가 돌려주는 JSON 응답 안에 `markdown` 필드가 있다는 사실과 본문에서 스키마에 따라 값을 추출하는 기능은 구별해야 한다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| Scrape | 페이지 한 장을 읽고 본문을 원하는 형식으로 반환하는 작업 |
| Map | 한 사이트에서 읽을 수 있는 후보 URL을 찾는 작업 |
| Crawl | 시작 페이지에서 링크를 따라가며 여러 문서를 수집하는 작업 |
| Batch Scrape | 미리 지정한 URL 목록을 일괄 수집하는 작업 |
| Interact | 앞선 Scrape에서 받은 페이지 식별자로 클릭이나 검색 같은 조작을 이어가는 기능 |

## 관련 페이지

- [[agents/browser-use-browser-use|Browser Use]]는 브라우저 안에서 입력과 클릭을 수행해 과제를 마치는 예를 다룬다.
- [[database/startrail-org-pixelrag|PixelRAG]]는 표와 차트의 시각적 배치가 중요한 자료를 스크린샷으로 수집해 검색하는 방식을 설명한다.
