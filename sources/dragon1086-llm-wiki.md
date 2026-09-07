---
title: "LLM Wiki: Karpathy LLM Knowledge Base 패턴의 한국어 레퍼런스 구현"
type: repo
year: 2026
category: applications
raw_path: raw/repos/dragon1086-llm-wiki.md
raw_filename: "dragon1086-llm-wiki.md"
source_collection: external
org: "dragon1086"
repo: "llm-wiki"
url: "https://github.com/dragon1086/llm-wiki"
license: "(미명시)"
tags:
  - llm-wiki
  - karpathy-pattern
  - obsidian
  - claude-code
  - claude-cli
  - agents-md
  - knowledge-base
  - ingest-query-lint
  - wikilink
  - mermaid
  - marp
  - matplotlib
  - discord-bot
  - launchd
  - macos
  - korean
---

## 한 줄 요약 (One-line Summary)

Andrej Karpathy의 LLM Knowledge Base 패턴을 Claude Code CLI와 Obsidian vault 위에서 구현한 한국어 저장소다. `raw/`에 마크다운을 저장하면 `./wiki ingest`가 요약, 개념, 인물과 도구 페이지를 만들고 `[[wikilink]]`로 연결한다. `./wiki query`는 wiki를 탐색해 텍스트, Marp 슬라이드, Mermaid 다이어그램, matplotlib 차트 중 하나로 답을 산출하고, `./wiki lint`는 dead link, orphan, index 불일치를 점검한다. `./wiki watch`와 macOS launchd가 `raw/` 감시를 상시화하며, Discord 봇이 같은 기능을 채팅 명령으로 노출한다. README는 Phase 6단계 완료와 BFS 1홉 확장 기반 query 개선을 함께 기록한다.

## 1. 자료 정보 (Document Information)

- **Repo**: `dragon1086/llm-wiki` (https://github.com/dragon1086/llm-wiki)
- **라이선스**: README 본문에 라이선스 표기가 없다. 사용, 인용, 재배포 전에 저자 의사 확인이 필요하다.
- **보유 자료의 범위**: `raw/repos/dragon1086-llm-wiki.md`는 **README 한 편의 스텁**이다. 2026-06-17 커밋 `0507ad0`이 `raw/repos/`의 전체 클론을 README 스텁으로 경량화하면서 `AGENTS.md`, `config.yaml`, `requirements.txt`, `scripts/` 하위 Python 파일과 셸 스크립트가 저장소에서 빠졌다. 따라서 **함수명, 파일 줄 수, 내부 알고리즘, frontmatter 스키마 같은 구현 세부는 현재 자료로 확인할 수 없다.** 이 요약은 README 본문이 명시한 내용만 근거로 삼는다.
- **언어**: 한국어. README 본문, 표, 안내 문구가 모두 한국어다.
- **필요 조건**: Python 3.10 이상, Claude Code CLI, Obsidian.
- **출처 헌사**: README 첫 부분과 끝 "참고" 절이 Karpathy의 원문 gist를 링크한다. 링크 주소는 `https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f`이며, 저장소 안의 다른 자료가 인용하는 gist 주소와 표기가 갈리는 지점이다.
- **README가 언급하는 저장소 파일**: `AGENTS.md`(wiki 스키마와 LLM 운영 규칙), `CLAUDE.md`(Claude Code 세션 가이드), `config.yaml`(경로와 설정), `requirements.txt`, `wiki` 실행 파일, `scripts/setup.py`, `scripts/setup_vault.sh`, `scripts/setup_launchd.sh`, `scripts/ingest_trends.sh`. 파일이 있다는 사실만 확인되고 내용은 확인되지 않는다.
- **이미지**: README가 `assets/images/hero-banner.jpg`, `assets/images/architecture.jpg`, `assets/images/query-improvement.jpg` 세 장을 임베드한다. 이 저장소에는 사본이 없어 `figures:` 키를 생략한다.

> **이 자료가 ai-wiki에 들어오는 이유**: [[applications/agricidaniel-claude-obsidian]], [[applications/joonan30-llm-wiki-labs]], [[applications/datasciencedojo-2026-llm-wiki-by-andrej-karpathy]]에 이어, 본 자료는 같은 Karpathy 패턴을 **한국어 CLI 저장소**로 구현한 사례다. Obsidian vault를 데이터 저장소로 두고 Claude Code CLI를 컴파일러로 쓰는 구성은 우리 ai-wiki 저장소의 3단 구조와 비교 대상이 된다.

## 2. 주요 기여 (Key Contributions)

1. **투입에서 답변까지를 5단계 파이프라인으로 명세** ("작동 방식" 표). 소스 투입은 Obsidian Web Clipper, 복사 붙여넣기, last30days 트렌드 수집 세 경로로 `raw/`에 마크다운을 남긴다. AI 컴파일 단계에서 Claude가 소스를 읽어 개념, 인물, 요약 페이지를 생성하고 `[[wikilink]]`로 연결한다. Obsidian은 Graph View 탐색과 Marp 슬라이드 미리보기를 담당한다. Query는 자연어 질문을 받아 wiki를 탐색하고 마크다운, 슬라이드, 차트를 출력한다. Findings 단계는 가치 있는 답변을 `wiki/findings/`에 자동 파일링한다.

2. **명령 3개로 압축한 CLI 표면**. `ingest`, `query`, `lint`가 핵심이고 `watch`, `status`, `discord`가 보조한다. `./wiki ingest`는 인자 없이 부르면 `raw/`의 미처리 파일을 전부 처리하고, 파일 경로를 주면 단일 파일만 처리한다.

3. **소스 1개당 생성되는 페이지 유형을 세 가지로 고정**. `wiki/summaries/`는 소스 요약, `wiki/concepts/`는 소스에서 언급된 개념 아티클, `wiki/entities/`는 인물, 도구, 조직 페이지다. 여기에 query가 만드는 `wiki/findings/`가 더해진다.

4. **출력 포맷을 플래그 하나로 분기**. `./wiki query`는 기본이 텍스트이고, `--slides`는 Marp 슬라이드, `--diagram`은 Mermaid 다이어그램, `--chart`는 matplotlib PNG를 만든다. `--archive`를 붙이면 결과가 wiki에 자동 편입된다. 플래그는 조합할 수 있어 `--diagram --archive` 같은 사용이 README 예시에 나온다.

5. **lint를 3개 수준으로 분리**. 기본 `./wiki lint`는 dead link, orphan, index 불일치를 탐지한다. `--fix`는 자동 수정 가능한 항목만 고친다. `--deep`은 LLM으로 페이지 사이의 모순을 탐지하며 README가 "느림"이라고 명시한다.

6. **BFS 그래프 탐색으로 query 검색 단계를 개선**. 기존 방식은 질문 키워드와 slug 이름만 비교했고, 그래서 `"트랜스포머 어텐션"` 질문이 `attention-is-all-you-need` 페이지와 매칭되지 않는 사례가 생겼다. 개선안은 3단계다. 첫째, 키워드 매칭으로 slug 이름 기준 시드 10개를 고른다. 둘째, 시드 페이지의 `[[wikilink]]`를 따라 1홉 이웃 페이지를 추가한다. 셋째, wikilink가 많은 허브 페이지를 우선해 정렬하고 토큰 예산 18,000자 안에 들어갈 만큼만 담는다. README는 wiki가 50페이지를 넘어갈수록 효과가 체감된다고 적는다.

7. **개선 로드맵 v2까지 완료 표기**. v1은 BFS 1홉 확장, 연결도 정렬, 토큰 예산이고 v2는 slug 매칭을 full-text 본문 스캔으로 교체하는 작업이다. v2의 가중치는 slug 3배, 본문 빈도 1배다. 두 항목 모두 완료로 표시되어 있다.

8. **last30days 스킬로 트렌드를 자동 수집**. Reddit, X/Twitter, Hacker News의 최근 30일 트렌드를 Claude Code 세션에서 `/last30days LLM 최신 트렌드 --deep`으로 모으고, 터미널에서 `bash scripts/ingest_trends.sh`로 vault에 인제스트한다. `--all`은 오늘 생성된 결과 전체를 처리하고 `--copy-only`는 복사만 한다. README는 결과를 그대로 넣지 말고 핵심 3개에서 5개 항목만 남겨 정리한 뒤 인제스트하라고 권고한다.

9. **Discord 봇 연동으로 접근 경로를 채팅까지 확장**. `!query`, `!ingest`, `!status` 세 명령을 지원하고, `!query`에는 `--diagram`, `--chart`, `--archive` 플래그를 그대로 붙일 수 있다. 차트는 PNG 이미지로 전송된다. 설정은 Discord Developer Portal에서 봇을 만들고 토큰을 `.env`에 넣은 뒤 OAuth2 bot scope로 Send Messages와 Attach Files 권한을 주는 3단계다. `DISCORD_CHANNEL_IDS`로 동작 채널을 제한할 수 있다.

10. **launchd 상시 실행을 두 경로로 제공**. Discord 봇은 `~/Library/LaunchAgents/com.llmwiki.discord.plist`를 직접 작성해 `launchctl load`로 등록하고, `raw/` 감시는 `bash scripts/setup_launchd.sh` 한 줄로 등록한다. 둘 다 로그를 `/tmp` 아래에 남기며 해제 명령이 함께 제공된다.

11. **운영 철학을 문서에 명시**. "많이 넣는 게 아니라 잘 넣는 게 목적"이라는 기준 아래 wiki 규모별 체감 품질, 소스 품질 기준, 핵심 습관 세 절을 README가 직접 다룬다. 코드 사용법과 별개로 운영 규범을 문서 자산으로 둔 점이 이 저장소의 특징이다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 파이프라인 5단계

README "작동 방식" 절의 표를 그대로 옮기면 다음과 같다.

| 단계 | 내용 |
|---|---|
| 소스 투입 | Web Clipper, 복사 붙여넣기, last30days 트렌드 수집으로 `raw/`에 마크다운 저장 |
| AI 컴파일 | Claude가 소스를 읽고 개념, 인물, 요약 페이지를 자동 생성하고 `[[wikilink]]`로 연결 |
| Obsidian | Graph View로 지식 그래프 탐색, Marp 슬라이드 미리보기 |
| Query | 자연어 질문을 받아 wiki를 탐색하고 마크다운, 슬라이드, 차트로 출력 |
| Findings | 가치 있는 답변을 `wiki/findings/`에 자동 파일링 |

사람이 하는 일은 자료 투입과 질문 두 가지이고 나머지는 Claude가 처리한다는 것이 README의 설명이다.

### 3.2 설치와 부트스트랩

설치는 세 단계다.

1. 저장소를 클론하고 가상환경을 만든 뒤 `pip install -r requirements.txt`로 의존성을 설치한다. `chmod +x wiki`로 실행 권한을 주고 `python3 scripts/setup.py`가 vault 경로 설정과 디렉토리 생성을 처리한다. 원한다면 `alias wiki="/path/to/llm-wiki/wiki"`를 셸 설정에 추가해 전역 명령으로 쓴다.
2. `bash scripts/setup_vault.sh`로 vault 디렉토리를 초기화하고, Obsidian에서 Open folder as vault로 `obsidian-vault/llm-wiki/`를 연다. `config.yaml`의 `vault_path` 값이 이 경로를 가리켜야 한다.
3. 아무 마크다운 파일을 `raw/`에 넣고 `./wiki ingest`를 실행한 뒤 `./wiki status`로 결과를 확인한다.

`scripts/setup.py`와 `scripts/setup_vault.sh`가 모두 디렉토리 생성을 언급해 역할이 겹쳐 보이지만, README는 둘의 경계를 구분해 설명하지 않는다.

### 3.3 명령별 표면

| 명령 | 형태 | 동작 |
|---|---|---|
| ingest | `./wiki ingest` | `raw/`의 미처리 파일 전체 처리 (기본값) |
| ingest | `./wiki ingest raw/article.md` | 지정한 단일 파일만 처리 |
| watch | `./wiki watch` | `raw/`를 감시해 자동 ingest |
| query | `./wiki query "질문"` | wiki 탐색 후 텍스트 답변 |
| query | `--slides` | Marp 슬라이드 산출 |
| query | `--diagram` | Mermaid 다이어그램 산출 |
| query | `--chart` | matplotlib PNG 산출 |
| query | `--archive` | 결과를 wiki에 자동 편입 |
| lint | `./wiki lint` | dead link, orphan, index 불일치 탐지 |
| lint | `--fix` | 자동 수정 가능한 항목 수정 |
| lint | `--deep` | LLM으로 모순 탐지 (느림) |
| status | `./wiki status` | wiki 현황 요약 |
| discord | `./wiki discord` | Discord 봇 실행 |

### 3.4 Query 검색 단계의 개선

README는 개선 전후를 나란히 서술한다. 기존 방식은 질문 키워드를 slug 이름하고만 비교했다. 그래서 `"트랜스포머 어텐션"`이라는 질문이 `attention-is-all-you-need`라는 slug를 만나면 겹치는 단어가 없어 매칭에 실패했다.

개선안은 3단계 전략이다.

| 단계 | 처리 | 산출 |
|---|---|---|
| 1. 키워드 매칭 | slug 이름 기준으로 후보를 고른다 | 시드 10개 |
| 2. BFS 1홉 확장 | 시드 페이지의 `[[wikilink]]`를 따라 이웃을 추가한다 | 시드 + 1홉 이웃 |
| 3. 연결도 정렬 | wikilink가 많은 허브 페이지를 우선한다 | 토큰 예산 18,000자 안의 컨텍스트 |

효과가 규모에 따라 달라진다는 점도 함께 적혀 있다.

| wiki 규모 | 체감 |
|---|---|
| 약 50페이지 이하 | slug 매칭의 한계가 거의 드러나지 않음 |
| 50페이지에서 150페이지 | query miss가 가끔 발생 |
| 150페이지 초과 | BFS 개선 효과가 뚜렷 |

개선 로드맵 절은 여기서 한 단계 더 나간다. v2는 slug 매칭 자체를 full-text 본문 스캔으로 교체하며 slug에 3배, 본문 빈도에 1배 가중치를 준다. v1과 v2 모두 완료 상태다.

### 3.5 트렌드 수집 경로

last30days 스킬이 Reddit, X/Twitter, Hacker News의 최근 30일 트렌드를 모은다. 실행은 두 곳으로 나뉜다. Claude Code 세션에서 `/last30days LLM 최신 트렌드 --deep`을 부르고, 터미널에서 `bash scripts/ingest_trends.sh`로 vault에 인제스트한다. 인제스트 스크립트는 `--all`(오늘 생성 전체)과 `--copy-only`(복사만) 두 플래그를 받는다.

README는 여기에 품질 경고를 붙인다. last30days 결과를 그대로 넣지 말고 핵심 3개에서 5개 항목만 남긴 뒤 인제스트하라는 것이다.

### 3.6 Obsidian 플러그인 통합

| 플러그인 | 용도 | 설치 |
|---|---|---|
| Web Clipper | 웹 페이지를 `raw/`에 저장 | Chrome, Firefox 브라우저 확장 |
| Marp Slides | `--slides` 결과 미리보기 | Community Plugins에서 검색 |

Web Clipper는 Vault를 `llm-wiki`로, Default location을 `raw/`로 설정한다. 이 설정 하나로 브라우저에서 클리핑한 글이 곧바로 감시 대상 폴더에 떨어진다.

### 3.7 Discord 봇

| 명령 | 설명 |
|---|---|
| `!query <질문>` | wiki 탐색 후 답변 |
| `!query <질문> --diagram` | Mermaid 다이어그램 |
| `!query <질문> --chart` | 차트 PNG 이미지 전송 |
| `!query <질문> --archive` | 결과를 wiki에 자동 편입 |
| `!ingest` | `raw/` 미처리 파일 전체 ingest |
| `!status` | wiki 현황 요약 |

설정 순서는 Discord Developer Portal에서 봇을 만들고, Bot Token을 `.env`에 저장하고(`cp .env.example .env` 후 `DISCORD_TOKEN` 편집), OAuth2 bot scope로 Send Messages와 Attach Files 권한을 주어 서버에 초대하는 것이다. 실행은 `./wiki discord`이며 `DISCORD_CHANNEL_IDS`로 동작 채널을 제한할 수 있다.

### 3.8 launchd 상시 실행

Discord 봇은 plist를 직접 작성한다. README가 제시한 `~/Library/LaunchAgents/com.llmwiki.discord.plist`는 `ProgramArguments`에 `wiki discord`를 넣고, `WorkingDirectory`에 저장소 경로를 지정하며, `EnvironmentVariables`에 `DISCORD_TOKEN`을 직접 넣는다. `RunAtLoad`와 `KeepAlive`가 모두 true이고 표준 출력과 표준 오류를 `/tmp/llm-wiki-discord.log`로 보낸다. 등록은 `launchctl load`, 해제는 `launchctl unload`다. README는 `KeepAlive: true` 때문에 봇이 예기치 않게 종료되어도 자동 재시작된다고 설명한다.

`raw/` 감시는 스크립트가 대신한다. `bash scripts/setup_launchd.sh`가 등록, `--remove`가 해제이고 로그는 `/tmp/llm-wiki-watch.log`에 쌓인다. plist 내용은 README에 나오지 않는다.

### 3.9 운영 철학

README는 "많이 넣는 게 아니라 잘 넣는 게 목적"을 운영 기준으로 제시한다.

소스 품질 기준은 두 목록으로 나뉜다.

- **넣어야 할 것**: 논문, 공식 문서, 심층 분석, 반복 참조하는 자료
- **넣지 말아야 할 것**: 단순 뉴스, 요약만 있는 슬라이드, "언젠간 읽겠지" 하고 미뤄 둔 자료

핵심 습관은 세 가지다. 자료를 넣은 직후 바로 query해 기존 지식과 비교하고, 2주에 한 번 `./wiki lint --fix`를 돌리며, 도메인을 3개로 좁혀 넓게 말고 깊게 쌓는다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

- **Phase 현황**: README의 표가 6단계를 모두 완료로 표시한다.

| Phase | 내용 | 상태 |
|---|---|---|
| 1 | 디렉토리 구조, AGENTS.md, vault 네임스페이스 | 완료 |
| 2 | Ingest 파이프라인 | 완료 |
| 3 | Query 엔진 (text, slides, diagram, chart) | 완료 |
| 4 | Lint (dead link, orphan, 모순 탐지) | 완료 |
| 5 | CLI, 설정, 플러그인 가이드 | 완료 |
| 6 | BFS 컨텍스트 확장과 토큰 예산 | 완료 |

- **개선 로드맵**: v1(BFS 1홉 확장, 연결도 정렬, 토큰 예산)과 v2(full-text 본문 스캔으로 slug 매칭 교체, slug 3배와 본문 빈도 1배 가중치) 모두 완료.
- **출력 포맷 4종**: 텍스트 마크다운, Marp 슬라이드, Mermaid 다이어그램, matplotlib 차트.
- **CLI 명령 6종**: `ingest`, `query`, `watch`, `lint`, `status`, `discord`.
- **Discord 명령 3종**: `!query`, `!ingest`, `!status`.
- **lint 검사 3종 + 심층 1종**: dead link, orphan, index 불일치에 `--deep`의 모순 탐지가 더해진다.
- **wiki 페이지 유형 4종**: `summaries/`, `concepts/`, `entities/`, `findings/`.
- **토큰 예산**: query 컨텍스트 18,000자.
- **검색 시드 수**: 키워드 매칭 단계에서 10개.
- **정량 벤치마크 부재**: 처리 시간, 토큰 사용량, 검색 정확도 같은 측정치는 README에 없다. 규모별 체감 품질 표가 유일한 정성 기준이다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

1. **자료 범위의 한계**. 우리가 보유한 원본은 README 한 편이다. 2026-06-17 커밋 `0507ad0`이 전체 클론을 스텁으로 경량화하면서 `AGENTS.md`, `config.yaml`, `requirements.txt`, `scripts/` 하위 코드가 사라졌다. 그래서 프롬프트 구조, 응답 파싱 방식, frontmatter 스키마, slug 생성 규칙, 코드 규모 같은 내부 구현 세부는 확인할 수 없다. 이 절 아래의 한계는 README가 명시했거나 README의 서술에서 직접 따라 나오는 것만 담는다.

2. **라이선스 미표기**. README 본문 어디에도 라이선스 안내가 없다. fork, 인용, 재배포 전에 저자 의사를 확인해야 한다. 우리 wiki가 기록한 형제 구현들이 대부분 라이선스를 명시한 것과 대비된다.

3. **Claude Code CLI 의존**. 필요 조건에 Claude Code CLI가 들어 있어 인증과 요금이 사용자에게 전가된다. 자체 LLM API 키 관리를 없앤 대신 실행 환경 요구가 커진다.

4. **자동 실행 경로의 권한 노출**. `./wiki watch`와 launchd 등록은 사람의 확인 없이 파일 생성과 LLM 호출이 이어지는 경로다. README는 이 경로에 대한 sandbox 가드나 권한 검토 절차를 다루지 않는다. Discord 봇 plist는 `EnvironmentVariables`에 `DISCORD_TOKEN`을 평문으로 넣도록 안내하므로, plist 파일 자체가 자격 증명 보관 위치가 된다.

5. **검색 정밀도의 원리적 한계**. 개선 후에도 검색은 slug 이름 매칭, wikilink 1홉 확장, 본문 빈도 세 가지에 기댄다. 임베딩이나 의미 유사도를 쓰지 않으므로 표현이 다른 동의어 질문은 여전히 놓칠 수 있다. README가 든 예시 자체가 이 취약점의 사례다.

6. **컨텍스트 예산의 상한**. 토큰 예산 18,000자 안에서만 페이지를 담는다. wiki가 커질수록 담기지 못하는 페이지 비율이 늘어나며, README는 이 절단이 어떤 기준으로 이뤄지는지 연결도 정렬 외에는 설명하지 않는다.

7. **모순 탐지의 비용**. `--deep`은 LLM 호출이라 느리다고 README가 직접 적는다. 어떤 규모까지 실용적인지, 얼마나 자주 돌려야 하는지는 제시되지 않는다.

8. **macOS 종속**. 상시 실행 안내가 launchd와 plist 한정이다. Linux의 systemd나 Windows의 작업 스케줄러 대응 안내가 없다.

9. **품질 관리를 사람 규범에 위임**. 소스 품질 기준과 핵심 습관은 자동 검사가 아니라 문서상의 권고다. last30days 결과를 3개에서 5개로 추리라는 지침도 사람이 매번 수행해야 한다. `lint --fix`의 자동 수정 범위 역시 "자동 수정 가능한 항목"이라고만 되어 있어 경계가 불분명하다.

10. **규모 기준의 내적 불일치**. BFS 절은 "wiki가 50페이지를 넘어갈수록 효과가 체감된다"고 적지만, 바로 아래 규모별 표는 50페이지에서 150페이지 구간을 "query miss가 가끔 발생"으로, 150페이지 초과를 "BFS 개선 효과 뚜렷"으로 나눈다. 두 서술의 기준선이 어긋난다.

## 6. 관련 연구 (Related Work)

- **Karpathy LLM Knowledge Base 패턴**: 이 저장소의 출발점이다. README 첫 부분과 "참고" 절이 gist를 링크한다. 우리 wiki의 [[applications/datasciencedojo-2026-llm-wiki-by-andrej-karpathy]]가 같은 패턴을 영문 입문 가이드로 다룬다.
- **[[applications/agricidaniel-claude-obsidian]]**: 같은 패턴을 Claude Code 통합 형태로 구현한 영문 저장소. 본 자료가 셸에서 부르는 CLI라면 그 자료는 Claude Code 안에서 동작한다.
- **[[applications/joonan30-llm-wiki-labs]]**: 같은 패턴을 한국어로 운영한 실측 케이스 스터디. 본 자료가 도구와 사용법의 명세라면 그 자료는 운영 기록이다.
- **[[applications/kmyu-2026-llm-wiki-pattern-synthesis]]**: Karpathy 패턴을 한국어로 종합 정리한 자체 페이지.
- **[[applications/kmyu-2026-akb-llmwiki-gbrain-comparison]]**: 여러 구현체를 비교한 자체 보고서.
- **Obsidian Web Clipper**: 웹 페이지를 vault로 캡처하는 공식 브라우저 확장. 본 자료의 소스 투입 경로 가운데 하나다.
- **Marp**: 마크다운을 슬라이드로 렌더링하는 도구. `--slides` 출력의 뷰어 역할을 한다.
- **Mermaid**: 텍스트로 다이어그램을 정의하는 표기법. `--diagram` 출력의 형식이다.
- **matplotlib**: `--chart` 출력이 PNG를 만드는 데 쓰인다.
- **last30days 스킬**: Reddit, X/Twitter, Hacker News의 최근 30일 트렌드를 수집하는 외부 스킬. 저장소가 소스 공급원으로 연동한다.
- **launchd**: macOS의 데몬 관리자. `RunAtLoad`와 `KeepAlive`를 묶어 상시 실행을 만든다.

## 7. 용어집 (Glossary)

- **Karpathy LLM Knowledge Base 패턴**: Andrej Karpathy가 gist로 공개한 운영 패턴. LLM이 원자료를 읽어 wiki를 자동으로 만들고 사람은 투입과 질문만 담당한다.
- **vault**: Obsidian이 하나의 wiki로 인식하는 폴더. `config.yaml`의 `vault_path`가 가리키는 대상이다.
- **wikilink**: `[[slug]]` 형태의 Obsidian 페이지 간 링크. Graph View에 그대로 시각화된다.
- **slug**: 페이지를 가리키는 짧은 식별자. 검색 1단계가 이 이름을 질문 키워드와 비교한다.
- **ingest**: `raw/`의 마크다운을 읽어 wiki 페이지로 컴파일하는 단계.
- **query**: 자연어 질문으로 wiki를 탐색해 답을 만드는 단계. 출력 형식을 플래그로 고른다.
- **lint**: dead link, orphan, index 불일치를 점검하는 단계. `--deep`은 LLM 모순 탐지를 추가한다.
- **watch**: `raw/`를 감시해 새 파일이 생기면 자동으로 ingest를 실행하는 모드.
- **finding**: query 답변을 `wiki/findings/`에 파일링한 페이지. 이후 query가 컨텍스트로 흡수한다.
- **BFS 1홉 확장**: 검색 시드 페이지의 wikilink를 한 단계만 따라가 이웃 페이지를 컨텍스트에 넣는 방식.
- **연결도 정렬**: wikilink가 많은 허브 페이지를 컨텍스트에 우선 담는 순서 결정 방식.
- **토큰 예산**: query 컨텍스트에 담을 수 있는 분량 상한. 이 저장소는 18,000자로 둔다.
- **Marp**: `marp` 문법으로 마크다운을 슬라이드로 만드는 도구.
- **last30days**: Reddit, X/Twitter, Hacker News의 최근 30일 트렌드를 모으는 외부 스킬.
- **launchd**: macOS의 데몬 관리자. plist 파일로 로그인 시 자동 시작과 비정상 종료 후 재시작을 설정한다.
