# AI Wiki: 초기 설계와 부트스트랩

## 이 문서의 위치

이 문서는 템플릿을 처음 세우는 사람을 위한 지시서다. 아직 아무것도 없는 상태에서 "무엇을 어떤 순서로 만들 것인가"를 자체 완결적으로 담는다. 저장소가 선 뒤의 운영 지도는 `README.md`에, 규칙과 스키마의 정본은 `CLAUDE.md`에, 명령과 옵션의 정본은 `.claude/skills/`의 세 스킬에 있다.

템플릿 저장소를 클론했다면 `CLAUDE.md`가 이미 있다. 그 경우 이 문서와 `CLAUDE.md`를 함께 읽히면 된다. 맨손으로 시작한다면 이 문서가 그 역할까지 대신한다.

같은 폴더의 `ai-wiki-primitive.md`는 최초 버전을 보관한 사본이다. 기록용이므로 고치지 않는다.

## 무엇을 만드는가

[Karpathy의 LLM Wiki 패턴](https://gist.github.com/karpathy/1dd0294ef9567971c1e4348a90d69285)을 여러 자료 유형으로 확장한 개인 지식 베이스다. 자료 하나를 세 층에 걸쳐 다듬는다.

```
원본 자료 (raw/{papers|repos|articles|reports|videos|books|lectures}/)
    ↓ 텍스트 + 이미지(도식) 추출
sources/{stem}.md         (한글 요약, 도식이 있으면 "그림 후보"까지)
    ↓ 정제 + 교차참조 + 큐레이션 도식 임베드
wiki/{category}/{stem}.md (한글, [[wikilinks]], ![[assets/...]])
    ↓ 합성
wiki/overviews/{topic}.md ← 지식이 복리로 쌓이는 곳
```

세 층은 같은 stem을 공유한다. 그래서 어느 층에서 출발해도 짝을 찾을 수 있다. `raw/`는 손대지 않는 불변 아카이브다. 외부에서 파일을 넣을 때는 항상 복사한다(**cp, never symlink**).

자료 유형은 7가지(papers, repos, articles, reports, videos, books, lectures), 분류 카테고리는 8가지(database, llms, physical-ai, agents, evaluations, applications, etc, overviews)가 기본값이다. 둘은 서로 독립적이라 같은 카테고리에 논문과 레포, 아티클이 섞여 들어갈 수 있다.

분류는 주제가 아니라 방법(method)을 기준으로 한다. *"미래의 내가 어느 카테고리에서 찾아야 더 유용할까?"* 가 판단의 잣대다.

여러 자료를 묶는 **overview 페이지**에서 가치가 복리로 불어난다. 개별 요약은 그 재료다.

## The Four Rules

이 네 규칙이 시스템의 핵심이다. 환각(hallucination)을 막고 모든 답변이 실제 보유 자료에 근거하도록 강제한다. 도메인을 바꿔도 이 규칙은 그대로 둔다.

1. **웹 검색 금지.** `WebSearch`와 `WebFetch`로 빈틈을 메우지 않는다.
2. **wiki를 먼저 본다.** `sources/`와 `wiki/`만이 진실의 원천(source of truth)이다.
3. **wiki가 부족하면 `raw/`의 원본을 다시 읽는다.** 세부를 더 뽑아낸 뒤 wiki를 갱신한다.
4. **자료가 없으면 없다고 말한다.** *"해당 주제에 대한 자료가 없습니다 — 원본 자료(PDF · URL · transcript 등)를 제공해 주세요"*라고 답한다. 임의로 메우지 않는다.

overview 페이지를 포함해 모든 응답에 적용된다.

예외는 자료 수집 하나뿐이다. 사용자가 명시적으로 수집을 지시한 경우에만 원본을 가져온다. 승인된 수단은 `scripts/fetch_article.py`와 repo README 취득이다. `WebFetch`는 기사 수집에 쓰지 않는다. 추출기가 아니라 요약기라서 원문 전문이 `raw/`에 남지 않고 불변 아카이브라는 전제가 깨진다. 답변 흐름에서는 예외가 없다.

## 목표 디렉토리 구조

```
ai-wiki/
├── CLAUDE.md               # 4 Rules · 스키마 · 워크플로 (에이전트 룰북)
├── README.md               # 운영 지도
├── index.md                # 페이지 카탈로그
├── pyproject.toml           # python 의존성
├── raw/                    # 원본 자료 (cp, never symlink)
│   ├── papers/             #   {stem}.pdf + {stem}-figures/
│   ├── repos/              #   {stem}.md (README 스냅샷)
│   ├── articles/           #   {stem}.md + {stem}-figures/
│   ├── reports/            #   PDF 또는 웹 본문
│   ├── videos/             #   메타데이터 + transcript
│   ├── books/              #   {stem}.pdf 또는 {stem}/ch{N}.pdf
│   └── lectures/           #   {stem}/ (slides + notes + code)
├── sources/                # LLM 요약 (flat, 한글) — 이미지 임베드 ❌
│   └── {stem}.md
├── wiki/                   # 정제된 페이지 (한글) — Obsidian Vault 루트
│   ├── assets/{stem}/      #   큐레이션 도식 사본
│   ├── database/  llms/  physical-ai/  agents/
│   ├── evaluations/  applications/  etc/
│   └── overviews/          #   합성 페이지 + 도메인 용어집
├── scripts/                # 수집·추출 2종 + lint 6종 (+ 일회성 도구)
├── .claude/
│   ├── skills/             # ingest-paper · ingest-article · write-wiki
│   └── hooks/              # 저장 시 lint 자동 실행
└── site/                   # (선택) 웹사이트 빌드
```

`{stem}-figures/`는 `raw/`의 일부로 **불변** 취급한다. 자동 파이프라인이 사후에 지우거나 다시 만들지 않는다. `repos`만 예외로, repo 안의 기존 `assets/`나 `img/`를 그대로 참조하고 별도 폴더를 만들지 않는다.

## 명명 규칙

어느 층에서나 stem은 같다. 공통 원칙은 소문자, 특수문자 제거, 공백은 `-`, 연도는 4자리다. 기관명이나 컨소시엄 이름도 쓸 수 있다.

| 유형 | stem 규칙 | 예시 |
|---|---|---|
| `papers` | `{first-author-lastname}-{year}-{first-5-title-words}` | `vaswani-2017-attention-is-all-you-need` |
| `repos` | `{org}-{repo-name}` (활성 프로젝트라 연도 생략) | `langchain-ai-langgraph` |
| `articles` | `{author}-{year}-{first-5-title-words}` | `karpathy-2024-software-3-llms` |
| `reports` | `{org}-{year}-{first-5-title-words}` | `stanford-hai-2024-ai-index-report` |
| `videos` | `{channel}-{year}-{first-5-title-words}` | `3blue1brown-2024-but-what-is-gpt` |
| `books` | `{first-author-lastname}-{year}-{first-5-title-words}` | `raschka-2024-build-a-large-language-model` |
| `lectures` | `{instructor-or-org}-{year}-{course-name}` | `stanford-2024-cs336-llms` |

강의가 멀티파일이면 `raw/lectures/{stem}/` 하위에 모은다. 도서를 챕터로 나누면 `raw/books/{stem}/ch{N}.pdf`로 묶는다. 이때 `raw_path`는 디렉토리를 가리킨다.

## frontmatter 스키마

모든 파일에 공통 키 8개가 들어간다.

```yaml
title: "..."                 # 원어 그대로
type: paper | repo | article | report | video | book | lecture
year: YYYY
category: database | llms | physical-ai | agents | evaluations | applications | etc | overviews
raw_path: raw/{type}/{stem}.{ext}
raw_filename: "{stem}.{ext}"
source_collection: external
tags: []
```

`type`은 `raw/`의 폴더명과 정확히 대응한다(단수형 `paper` ↔ 복수형 `papers`). `raw_path`는 반드시 `raw/` 내부를 가리키고 `raw_filename`은 그 basename과 일치한다. `wiki/{category}/{stem}.md`는 여기에 `source: {stem}.md`를 더한다.

유형별로 키가 더 붙는다. papers는 `authors`와 `doi` 또는 `arxiv_id`, repos는 `org`·`repo`·`url`·`license`, articles는 `author`·`url`·`publisher`, reports는 `org`·`url`, videos는 `channel`·`url`·`duration`, books는 `publisher`·`isbn`·`extraction_mode`, lectures는 `instructor`·`institution`·`materials`다.

도식을 뽑았다면 `figures` 리스트를 채운다.

```yaml
figures:
  - id: fig02                                    # 원본 라벨과 일치 (Figure 2 → fig02, Table 2 → tab02)
    label: Figure 2
    kind: figure                                 # figure | table
    file: assets/{stem}/fig02.png                # wiki 루트 기준 (Obsidian 임베드용)
    raw: raw/papers/{stem}-figures/fig02.png     # 전수 아카이브 경로
    caption: "인덱싱 파이프라인"
    page: 4                                      # PDF만
    bbox_norm: [0.10, 0.10, 0.91, 0.40]          # 0~1 정규화. 다시 자를 때 쓴다
    strategy: caption-region                     # caption-region | table-region | column-band |
                                                 # page-region | manual | fetched | screenshot |
                                                 # crop | keyframe
    curated: true                                # true → wiki 본문에 임베드
```

id는 원본 라벨과 똑같이 붙인다. 그러면 사람이 대응표를 손으로 만들 일이 없다. 후보 전체는 sources frontmatter에 남기고 wiki frontmatter에는 `curated: true` 항목만 복제한다. 트레이서빌리티는 sources가 지킨다. wiki frontmatter는 본문보다 커지지 않는다.

overview 페이지는 읽는 순서를 `study_path`로 선언할 수 있다. `id`(= `category/stem`)와 `note`, 선택적으로 `prereq`를 담은 목록이다. 같은 순서를 본문 `## 학습 경로` 절에 `[[wikilink]]` 번호 목록으로 한 번 더 적는다. 본문은 사람이 읽고 frontmatter는 기계가 읽는다.

## 6-step 파이프라인

```
Step 1    raw/에 원본 복사
Step 2    텍스트 추출
Step 2.5  이미지 추출 → raw/{type}/{stem}-figures/      (도식 없으면 생략)
Step 3    sources/{stem}.md 작성 + 그림 후보 표
Step 3.5  사용자 confirm — wiki에 넣을 도식 지정
Step 4    wiki/{category}/{stem}.md 작성 + 도식 사본 + index.md 갱신
```

Step 1부터 2.5까지는 유형마다 다르고 Step 3과 4는 공통이다. 사람이 손을 대는 단계는 Step 3.5뿐이다.

**Step 3.** sources 작성. 본문은 다음 헤딩으로 구성한다. 여기는 번호와 영문 병기를 유지한다.

```markdown
## 한 줄 요약 (One-line Summary)
## 1. 자료 정보 (Document Information)
## 2. 주요 기여 (Key Contributions)
## 3. 방법론 및 아키텍처 (Methodology and Architecture)
## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)
## 5. 한계와 향후 과제 (Limitations and Future Work)
## 6. 관련 연구 (Related Work)
## 7. 용어집 (Glossary)
## 8. 그림 후보 (Figure Candidates)        # 도식을 뽑은 경우만
```

sources는 요약이지만 세부를 깎는 단계가 아니다. 실험 수치와 ablation 결과, 한계의 세부 항목을 보존한다. 8절에는 `id | page | caption | strategy | 추천` 표로 후보를 정리하고 어떤 것을 wiki에 넣을지 추천 마크를 단다. **한 행에 id 하나만** 적는다. `fig04~fig07` 같은 범위 행은 lint가 오류로 잡는다.

**Step 3.5 사용자 확인.** 사용자가 "fig01, fig02, tab01 넣어줘"라고 지정하면 해당 id를 `curated: true`로 바꾼다.

**Step 4.** wiki 작성. 본문 헤딩은 **한글 단독**이고 교재식 골격을 따른다. sources와 달리 영문 병기를 쓰지 않는다.

```markdown
## 요약        ## 배경     ## 핵심 개념   ## 방법
## 결과        ## 한계     ## 핵심 용어   ## 관련 페이지
```

압축하지 않고 풀어 쓴다. 항목 3개 이상은 불릿으로, 비교와 분류는 표로 꺼낸다. 도식은 `![[assets/{stem}/figNN.png]]`로 임베드하고 바로 아래 `*Figure N: 캡션*`을 한 줄 둔다. shortlink는 vault 안 동명 파일과 충돌하니 항상 상대경로로 쓴다. 마지막으로 `curated: true` 도식만 `wiki/assets/{stem}/`로 복사하고 `index.md`에 한 줄을 추가한다.

`index.md` 항목 문법은 하나뿐이다. 설명은 1~2문장, 200자 이내로 제한한다.

```
- [[category/stem|표시 이름]]: 한 줄 설명 (YYYY, type)
```

구분자는 `]]: `이고 `type`은 paper, repo, article, report, video, book, lecture, overview 중 하나다. 이 줄은 문법 선언과 사이트 빌드의 카드 파서, 카탈로그 lint가 함께 읽는다. 문법을 바꾸면 세 곳을 같이 고친다.

## 유형별 수집 진입점

| 유형 | 담당 | 산출물 |
|---|---|---|
| papers, reports(PDF), books, lectures | `ingest-paper` 스킬 | `raw/{type}/{stem}.pdf`, `{stem}-figures/` |
| articles, reports(웹) | `ingest-article` 스킬 | `raw/articles/{stem}.md`, `{stem}-figures/` |
| repos | 에이전트가 README 취득 | `raw/repos/{stem}.md` |
| videos | 사용자가 transcript 저장 | `raw/videos/{stem}.md`, `{stem}-figures/` |
| Step 3 ~ 4 (전 유형) | `write-wiki` 스킬 | `sources/`, `wiki/`, `index.md` |

`ingest-paper`는 페이지를 통째로 렌더하지 않고 캡션을 앵커로 삼아 도식 영역만 자른다. 검출이 어긋나면 오버레이 이미지를 보고 좌표를 지정해 다시 자른다. 이 설계는 자동 검출을 끝까지 믿지 않는다.

`ingest-article`은 추출 사다리 네 단계(jina → 익명 Chrome → 로그인 프로필 → firecrawl)를 차례로 시도해 본문 전문과 이미지를 가져온다.

repos는 `raw.githubusercontent.com`에서 README를 받아 frontmatter를 씌워 한 파일로 저장한다. `license` 키를 반드시 적는다. repo 안의 이미지는 자동으로 가져오지 않고 URL만 기록해 둔다.

videos는 사용자가 transcript를 저장한다. `yt-dlp` 같은 로컬 도구로 자막을 받는 건 괜찮다. 슬라이드가 나오는 timestamp를 지정하면 `ffmpeg`로 프레임을 한 장씩 잡는다. 자동 키프레임 검출은 노이즈가 커서 수동 지정을 권한다.

## 품질 장치

용어집과 lint, 훅이 서로를 보완한다.

**용어집.** `wiki/overviews/glossary-{도메인}.md`가 전문 용어 표기의 SSOT다. `원어 | canonical 표기 | 금지 표기 | 첫 등장 풀이 예문 | 비고` 표 하나로 시작한다. 등재된 원어는 한글로 직역하지 않는다. 문서당 첫 등장 시 서술형 한글 풀이를 한 문장 둔다. 한글 canonical로 정한 용어는 그 한글만 쓴다. 자료를 넣을 때마다 새 용어를 행으로 추가한다. 그 행이 늘어난 만큼 wiki도 자란다.

**lint 6종.** `lint_terms`(용어집 표기), `lint_style`(문체와 금지 기호), `lint_links`(링크 해석), `lint_figures`(도식 정합), `audit_captions`(캡션), `lint_index`(카탈로그 문법). 표준 라이브러리만 쓰게 만들어 가상환경 없이도 돌아가게 한다.

**훅.** `sources/`와 `wiki/`, `index.md`를 저장한 직후 앞의 두 lint를 자동으로 돌리고 위반이 있을 때만 알려준다. 작업을 막지는 않는다. 나머지 네 개는 `write-wiki` 스킬의 완료 게이트가 맡는다.

`README.md`나 `temp-docs/`에 lint를 돌리면 오탐만 난다. 적용 범위는 `wiki/`와 `sources/`, `index.md`다.

## 환경 준비

Python 3.12와 [uv](https://github.com/astral-sh/uv)를 쓴다. 의존성은 다섯 개다. `pypdf`(텍스트 추출), `pymupdf`(도식 크롭), `playwright`(웹 기사 수집), `beautifulsoup4`(HTML 파싱), `yt-dlp`(자막).

`playwright`는 시스템에 설치된 Chrome을 구동하도록 설정하므로 브라우저를 따로 내려받지 않는다. `ffmpeg`는 영상 키프레임을 뽑을 때만 필요하다.

## 부트스트랩 프롬프트

한 덩어리로 주면 에이전트가 아직 없는 스킬과 스크립트를 상상해서 만들어 버린다. 그래서 세 블록으로 나눠 준다.

**블록 A. 스캐폴딩**

```text
이 저장소의 temp-docs/ai-wiki.md 를 읽고 (CLAUDE.md 가 있으면 함께) 아래를 순서대로 수행해줘.

1. 폴더 생성
   raw/{papers,repos,articles,reports,videos,books,lectures}/
   wiki/{database,llms,physical-ai,agents,evaluations,applications,etc,overviews}/
   wiki/assets/ , sources/ , scripts/ , temp-docs/
2. index.md 초기화
   - 8개 카테고리 절 헤딩만 두고 항목은 비운다.
     헤딩 형식은 "## Database (database)" 처럼 표시 이름과 괄호 안 slug 를 함께 적는다
     (사이트 빌드가 이 형식으로 절을 묶는다).
   - 문서 머리에 카탈로그 한 줄 문법을 코드펜스로 적어 둔다.
     - [[category/stem|표시 이름]]: 한 줄 설명 (YYYY, type)
   - 구분자는 "]]: " 하나만 쓴다. type 은 paper, repo, article, report, video, book,
     lecture, overview 중 하나이고, 한 줄은 200자 이내로 둔다.
3. 파이썬 환경
   uv venv .venv --python 3.12
   pyproject.toml 의 requires-python 은 >=3.12, 의존성은
     pypdf, pymupdf, playwright, beautifulsoup4, yt-dlp 다섯 개.
   uv sync
   playwright 는 시스템 Chrome 을 구동하게 설정한다 — playwright install 은 하지 않는다.
   ffmpeg 는 영상을 다룰 때만 설치한다 (옵션).
4. 도메인 용어집 생성
   wiki/overviews/glossary-{도메인}.md 를 도메인마다 하나씩 만든다.
   각 파일은 표 하나로 시작한다:
     | 원어 | canonical 표기 | 금지 표기 | 첫 등장 풀이 예문 | 비고 |
   이 파일들이 전문 용어 표기의 SSOT 다.
5. 규칙 적용
   THE FOUR RULES 를 그대로 적용한다. Q&A, overview 작성, wiki 갱신 흐름에서는
   WebSearch 와 WebFetch 를 호출하지 않는다. 자료 수집은 내가 명시적으로 지시할 때만 하고,
   그때도 승인된 수단(scripts/fetch_article.py, repo README 취득)만 쓴다.
6. 끝나면 만든 폴더와 파일 목록, uv sync 결과만 보고해줘. 자료는 아직 넣지 않는다.
```

**블록 B. 도구층**

```text
이어서 도구층을 세운다. 템플릿 저장소에서 복사할 수 있으면 복사가 우선이고,
없을 때만 최소 버전을 만든다. 없는 도구를 상상해서 쓰지 않는다.

1. 스킬 (.claude/skills/)
   ingest-paper    PDF 계열(papers, reports, books, lectures) Step 1 ~ 2.5
                   — 캡션을 앵커로 도식 영역만 크롭, 오버레이로 검출 확인
   ingest-article  URL 계열(articles) Step 1 ~ 2.5 — 본문 전문과 이미지 수집
   write-wiki      Step 3 ~ 4 — 용어집 선로드, 교재식 골격, 문체 가이드, 완료 게이트
   템플릿에 .claude/skills/ 가 있으면 그대로 복사한다. 없으면 이 문서의
   "6-step 파이프라인" 절을 스킬 본문으로 옮겨 최소 버전을 만든다.
2. 스크립트 (scripts/)
   extract_figures.py   캡션 앵커 크롭 + 좌표 재지정
   fetch_article.py     기사 본문과 이미지 수집
   lint_terms.py  lint_style.py  lint_links.py  lint_figures.py
   lint_index.py  audit_captions.py
   복사가 원칙이다. 처음부터 만들 거면 lint_index.py 와 lint_links.py 를 먼저 만든다
   (카탈로그 문법과 링크 해석이 가장 먼저 깨지는 곳이다). lint 는 표준 라이브러리만 쓴다.
3. 훅 (.claude/hooks/)
   sources/ , wiki/ , index.md 를 저장할 때 lint_terms 와 lint_style 을 돌리고
   위반이 있을 때만 경고를 주입한다. 비차단으로 둔다.
   이 lint 들은 wiki 와 sources 전용이다. README 나 temp-docs 에는 적용하지 않는다.
4. 확인
   lint_index.py --all 이 에러 0 으로 끝나는지,
   sources/ 파일을 한 번 저장했을 때 훅이 반응하는지 본다.
```

**블록 C. 첫 자료**

```text
raw/papers/ 에 PDF 한 편을 두고 "이 논문 ingest 해줘" 라고 지시한다.
Step 3.5 에서 wiki 에 넣을 도식 id 를 묻는 지점에서 한 번 멈춘다.
답을 주면 Step 4 까지 이어서 끝낸다.
끝나면 sources/{stem}.md , wiki/{category}/{stem}.md , wiki/assets/{stem}/ ,
index.md 한 줄이 생겼는지 확인한다.
```

## 첫 주 운영 루틴

자료를 5~10개 넣고 질문해 본다. 에이전트가 wiki를 검색해 답한다. 부족하면 `raw/`를 다시 읽어 보강하고 없으면 없다고 말한다. 좋은 답이 나오면 *"이걸 `wiki/overviews/`에 overview로 저장해줘"* 라고 한다.

한 세션은 새 페이지나 갱신을 5~15개쯤 만들어야 한다. *"논문 1,000편을 다 넣은 뒤 검색"* 은 순서가 거꾸로다. 실제 질문에서 출발해 가지를 뻗는다. 그 질문에 직접 답하는 overview가 1차 wave, 거기서 파생된 깊은 가지가 2차 wave, 카테고리를 가로지르는 주제가 3차 wave다.

첫 주에는 분류가 자연스러운지, 용어집이 자라고 있는지, lint가 0으로 끝나는지 본다.

## 나중에 붙이는 것

- **Obsidian.** `wiki/` 폴더를 Vault로 열면 `[[wikilinks]]`와 graph view, 전체 검색을 그대로 쓸 수 있다. 파일을 읽기만 하므로 에이전트의 편집과 충돌하지 않는다.
- **웹사이트.** `site/`의 정적 빌드로 웹과 모바일에서 읽는다. 시각 설계는 `DESIGN.md`, 사양과 이력은 `temp-docs/web-design-plan.md`에 있다. 페이지가 어느 정도 쌓인 뒤에 붙이는 게 좋다.
- **검색 강화.** 전체가 ~500페이지를 넘으면 `grep`이 카테고리를 가로지르는 overview를 놓치기 시작한다. 그 규모에서는 [QMD](https://qmd.ai)를 MCP 서버로 붙인다.
- **도메인 교체.** 카테고리와 자료 유형, 용어집을 갈아끼우는 절차는 `README.md`의 Customization 절에 있다. The Four Rules는 그대로 둔다.

---

*Built with [Claude Code](https://claude.com/claude-code) (Anthropic) + [Codex](https://github.com/openai/codex) (OpenAI). Browsing with [Obsidian](https://obsidian.md/). Search with [QMD](https://qmd.ai). Karpathy의 원본 아이디어: [@karpathy/1dd0294ef9567971c1e4348a90d69285](https://gist.github.com/karpathy/1dd0294ef9567971c1e4348a90d69285).*
