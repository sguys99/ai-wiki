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
figures:
  - id: fig01
    label: Open Source vs Cloud
    kind: figure
    raw: https://github.com/firecrawl/firecrawl/blob/e6c2ffdf7072fe9ab72eefa59622454f7480e163/img/open-source-cloud.png
    caption: "공식 README의 자체 호스팅과 클라우드 비교 그림"
    strategy: manual
    curated: false
---

## 한 줄 요약 (One-line Summary)

Firecrawl은 웹페이지 한 장이나 사이트 전체를 Markdown으로 수집하는 도구다. 한 대에서 실행하는 Local, 웹 검색과 구조화 추출을 제공하는 Cloud, 작업 큐를 직접 운영하는 자체 호스팅 서버를 제공한다.

## 1. 자료 정보 (Document Information)

2026년 11월 22일 기준 `firecrawl/firecrawl`의 커밋 `e6c2ffdf7072`을 수집했다. 루트 README 전문은 `raw/repos/firecrawl-firecrawl.md`에 있다. 같은 리비전의 Local 및 Python SDK README, `SELF_HOST.md`, `docker-compose.yaml`은 `raw/repos/firecrawl-firecrawl/` 아래 원래 디렉터리 구조로 보관했다. 프로젝트의 기본 라이선스는 AGPL-3.0이며 SDK와 일부 UI 구성 요소에는 MIT가 적용된다.

## 2. 주요 기여 (Key Contributions)

| 사용자에게 필요한 것 | Firecrawl 작업 | 결과 |
|---|---|---|
| 아는 주소의 본문 | Scrape | 페이지 한 장의 Markdown과 메타데이터 |
| 문서 사이트의 여러 페이지 | Crawl | 시작 URL에서 링크를 따라 수집한 페이지별 문서 |
| 사이트에서 읽을 주소 선별 | Map, Batch Scrape | 먼저 URL을 찾고 선택한 주소만 일괄 수집 |
| 모르는 사이트에서 자료 조사 | Cloud Search | 검색 결과 목록. 수집 옵션을 주면 본문도 반환 |
| 비정형 자료에서 특정 항목 추출 | Cloud Agent | 조사 목표와 스키마를 받아 구조화한 결과 |

Local은 정적 HTML을 정리하며 JavaScript가 필요한 페이지는 설치된 Chrome 또는 Chromium으로 렌더링한다. PDF와 Office 문서도 로컬에서 읽는다. Cloud는 수집 후 페이지를 조작하는 Interact와 외부 데이터 서비스 모음인 Alexandria도 제공한다. README가 제시하는 Alexandria의 규모는 550개 이상 서비스, 인물 2억 5천만 명 이상, 기업 7,500만 곳 이상, 연구 논문 4,100만 편 이상이다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

| 방식 | 설치 또는 접속 | 실행 범위 |
|---|---|---|
| Local | Rust와 C 컴파일러를 준비하고 `cargo install firecrawl-local` | 실행 파일 하나로 수집한다. `serve`는 기본 포트 3002에서 v2 API를 제공한다. |
| Cloud | CLI로 단일 URL을 읽거나 `pip install firecrawl`로 Python SDK를 설치 | 호스팅된 API가 브라우저와 수집 작업을 운영한다. |
| 자체 호스팅 | 저장소 루트에서 Docker Compose로 구동 | API와 워커, Playwright, Redis, RabbitMQ, 기본 큐인 NuQ PostgreSQL을 운영한다. FoundationDB를 대체 큐로 선택할 수 있다. |

Local의 `crawl --limit 10 --out ./pages`는 최대 10페이지를 Markdown 파일로 저장한다. HTTP로 Crawl을 시작하면 작업 ID를 받고, Python SDK의 `crawl()`은 완료를 기다려 결과를 반환한다. MCP는 에이전트가 외부 도구를 연결하는 표준이다. Local의 MCP 연결에는 Node.js 22 이상이 필요하다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

Firecrawl은 Cloud의 웹 커버리지를 96%, 수백만 페이지에서 측정한 P95 지연을 3.4초로 보고한다. README에는 비교 도구별 측정값과 표본 선정 기준이 없다. Keyless의 월 1,000 무료 크레딧은 수집 시점의 안내이며 작업별 사용량에 따라 처리할 수 있는 페이지 수가 달라진다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- Local의 기본값은 단일 페이지를 자체적으로 읽지 못하면 Cloud에서 재시도한다. Cloud에 요청을 보내지 않으려면 `FIRECRAWL_CLOUD=off`를 설정한다. 웹 검색도 Cloud가 처리한다.
- Local의 Crawl과 Batch Scrape 작업은 메모리에 보관한다. 서버가 중지되면 작업이 사라지고, 실행 중에도 시작 후 1시간이 지나면 만료한다. Local에서 구조화 JSON이나 요약 형식을 요청하면 경고가 나온다.
- 자체 호스팅의 기본 Compose는 인증을 끈 상태로 시작한다. PostgreSQL, Redis, RabbitMQ의 영구 볼륨 설정과 백업은 운영자 몫이다. Alexandria는 Cloud에서만 제공한다.

## 6. 관련 연구 (Related Work)

이 위키의 `scripts/fetch_article.py`에는 단일 URL을 Markdown으로 읽는 세 가지 구현이 있다. Jina Reader 요청, Playwright로 렌더링한 HTML을 BeautifulSoup으로 정리하는 구현, Firecrawl의 `/v2/scrape` 호출이다. Firecrawl에서는 같은 인터페이스로 사이트 탐색과 일괄 수집까지 이어갈 수 있다. [[agents/browser-use-browser-use|Browser Use]]는 신청서 작성처럼 브라우저 안에서 마쳐야 하는 작업과 비교할 수 있다.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| Scrape | URL 한 개의 페이지에서 요청한 형식의 내용을 읽는 작업 |
| Map | 한 사이트에서 후보 URL을 찾는 작업 |
| Crawl | 시작 주소의 링크를 따라 여러 페이지의 내용을 수집하는 작업 |
| Batch Scrape | 호출자가 지정한 주소 목록의 내용을 한꺼번에 수집하는 작업 |
| Interact | 앞서 읽은 페이지의 식별자를 이용해 그 페이지에서 후속 조작을 수행하는 Cloud 기능 |

## 8. 그림 후보 (Figure Candidates)

| id | 원문 위치 | 내용 | 수집 방식 | 용도 |
|---|---|---|---|---|
| fig01 | README의 Self-hosting 절 | 자체 호스팅과 Cloud의 비교 | manual | 실행 방식 비교용 참고 그림 |
