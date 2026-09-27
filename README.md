# AI Wiki: AI 기술자료를 위한 개인 지식 베이스

🌐 **웹사이트**: [sguys99.github.io/ai-wiki](https://sguys99.github.io/ai-wiki/). 웹과 모바일에서 전체 검색과 라이트/다크, 태그, 지식 그래프까지 둘러본다. 빌드 코드는 [`site/`](site/), 배포는 [GitHub Actions](.github/workflows/deploy.yml).

Claude Code(또는 OpenAI Codex)로 논문 · 레포 · 아티클 · 리포트 · 영상 · 도서 · 강의를 구조화해 검색 가능한 wiki로 관리하는 방법론이다. 매일 새 모델과 논문이 쏟아진다. 그 속에서도 지식이 복리로 쌓이기를 바라는 엔지니어와 연구자를 위한 템플릿이다. 자료 유형 7가지와 분류 카테고리 8가지가 기본값이다.

> **도메인 무관(domain-agnostic) 템플릿이다.** 예시는 AI 기술자료지만 구조와 규칙, 파이프라인은 어떤 도메인에도 옮겨 쓸 수 있다. 금융 리서치든 바이오 논문이든 법률 판례든 카테고리와 자료 유형, 언어 정책만 갈아끼우면 작동한다. 방법은 아래 [Customization (다른 도메인에 적용하기)](#customization-다른-도메인에-적용하기)에 있다.

## The Four Rules — 시스템의 심장

이 wiki가 존재하는 이유는 하나다. 환각(hallucination)을 막고 모든 답변이 실제 보유 자료에 근거하도록 강제한다. 이 네 규칙이 없으면 wiki는 잘 차려입은 웹 검색기에 지나지 않는다. **도메인이 바뀌어도 이 규칙만은 그대로 둔다.**

1. **웹 검색 금지.** `WebSearch`와 `WebFetch`로 빈틈을 메우지 않는다.
2. **wiki를 먼저 본다.** `sources/`와 `wiki/`만이 진실의 원천(source of truth)이다.
3. **wiki가 부족하면 `raw/`의 원본을 다시 읽는다.** 세부를 더 뽑아낸 뒤 wiki를 갱신한다.
4. **자료가 없으면 없다고 말한다.** *"해당 주제에 대한 자료가 없습니다 — 원본 자료(PDF · URL · transcript 등)를 제공해 주세요"*라고 답한다. 임의로 메우지 않고, "온라인에서 찾아보지"도 않는다.

overview 페이지를 포함해 모든 응답에 적용된다. wiki에 있는 자료만 인용한다.

**rule #1의 예외는 자료 수집 한 가지뿐이다.** 사용자가 "이 URL을 `raw/`에 저장해줘"처럼 명시적으로 수집을 지시한 경우에만 원본을 가져온다. 승인된 수단은 `scripts/fetch_article.py`와 repo README 취득이다. `WebFetch`는 기사 수집에 쓰지 않는다. 추출기가 아니라 요약기여서 원문 전문이 `raw/`에 남지 않고 "`raw/`는 원본 그대로의 불변 아카이브"라는 전제가 깨지기 때문이다. Q&A와 overview 작성, wiki 갱신 같은 **답변 흐름에서는 예외가 없다.**

## 3-tier 파이프라인

[Karpathy의 LLM Wiki 패턴](https://gist.github.com/karpathy/1dd0294ef9567971c1e4348a90d69285)을 여러 자료 유형으로 확장한 구조다.

```
원본 자료 (raw/{papers|repos|articles|reports|videos|books|lectures}/)
    ↓ 텍스트 + 이미지(도식) 추출
sources/{stem}.md         (한글 요약, 도식이 있으면 "그림 후보"까지)
    ↓ 정제 + 교차참조 + 큐레이션 도식 임베드
wiki/{category}/{stem}.md (한글, [[wikilinks]], ![[assets/...]])
    ↓ 합성
wiki/overviews/{topic}.md ← 지식이 복리로 쌓이는 곳
```

세 층은 같은 stem을 공유한다. `raw/`는 손대지 않는 불변 아카이브이고 항상 복사해서 넣는다(**cp, never symlink**). 도식도 같은 원칙을 따른다. `raw/{type}/{stem}-figures/`에는 검출된 후보를 전수 보관하고 사람이 고른 것만 `wiki/assets/{stem}/`로 사본을 옮긴다. 진짜 가치가 불어나는 곳은 여러 자료를 묶는 **overview 페이지**다.

## 저장소 구조

```
ai-wiki/
├── CLAUDE.md               # 4 Rules · 스키마 · 워크플로 (에이전트 운영 룰북)
├── DESIGN.md               # 웹사이트 시각 설계 정본
├── index.md                # 페이지 카탈로그
├── raw/                    # 원본 자료 (cp, never symlink)
│   ├── papers/             # 논문 PDF (+ {stem}-figures/ 도식 아카이브)
│   ├── repos/              # OSS README 스냅샷
│   ├── articles/           # 블로그·뉴스 (+ {stem}-figures/)
│   ├── reports/            # 산업·리서치 리포트
│   ├── videos/             # youtube 메타데이터 + transcript
│   ├── books/              # 도서 — 절차만 준비, 아직 자료 없음
│   └── lectures/           # 강의 코스 패키지 — 절차만 준비, 아직 자료 없음
├── sources/                # LLM 요약 (flat, 한글) — 이미지 임베드 ❌
├── wiki/                   # 정제된 wiki 페이지 (한글) — Obsidian Vault 루트
│   ├── assets/{stem}/      # 큐레이션 도식 사본
│   ├── database/           # Vector DB, RAG 인프라
│   ├── llms/               # 모델 아키텍처, pre-training, fine-tuning
│   ├── physical-ai/        # VLA, world model, robot learning, sim2real
│   ├── agents/             # Agentic 시스템, tool use, planning
│   ├── evaluations/        # 평가 프레임워크, benchmark
│   ├── applications/       # RAG 응용, 도메인 적용 사례
│   ├── etc/                # 미분류, 횡단 주제
│   └── overviews/          # 합성 페이지 + 도메인 용어집
├── scripts/                # 수집·추출 2종, lint 6종, 일회성 도구
├── .claude/skills/         # ingest-paper · ingest-article · write-wiki
├── .claude/hooks/          # 저장 시 lint 자동 실행
└── site/                   # 웹사이트 빌드 (커스텀 Node)
```

`raw/`의 폴더인 자료 유형과 `wiki/`의 폴더인 분류는 서로 독립적이다. 키 이름은 각각 `type`과 `category`다. 같은 카테고리에 논문과 레포, 아티클이 섞여 들어갈 수 있다.

분류 기준은 주제가 아니라 방법(method)이다. RAGAS로 RAG를 평가한 사례 논문이라면 `applications`보다 `evaluations`가 맞을 때가 있다. "미래의 내가 어느 카테고리에서 찾아야 더 유용할까?"가 유일한 잣대다. 물리 세계와의 상호작용(센서 입력, 액추에이터 출력, 시뮬레이터, 실체 로봇)이 방법의 핵심이면 `physical-ai`로 보낸다. 이 카테고리는 통제 태그 어휘를 따로 두는데 목록은 `CLAUDE.md`에 있다.

규모는 명령 두 개로 확인한다. `find wiki -name '*.md' | wc -l`로 페이지 수를, `cd site && npm run build`의 `[content]`와 `[tags]` 줄로 카테고리 분포와 태그 수를 본다.

## 자료 추가하기

```
Step 1    raw/에 원본 복사
Step 2    텍스트 추출
Step 2.5  이미지 추출 → raw/{type}/{stem}-figures/      (도식 없으면 생략)
Step 3    sources/{stem}.md 작성 + 그림 후보 표
Step 3.5  사용자 confirm — wiki에 넣을 도식 지정
Step 4    wiki/{category}/{stem}.md 작성 + 도식 사본 + index.md 갱신
```

에이전트는 "이 자료를 wiki에 추가해줘" 한마디로 끝까지 진행한다. Step 3.5가 사람이 개입하는 유일한 지점이다. 도식을 뽑은 자료라면 여기서 한 번 멈춰 어떤 그림을 넣을지 묻는다.

Step 1부터 2.5까지는 유형마다 다르고 Step 3과 4는 공통이다. 명령과 옵션은 스킬이 정본이다.

| 유형 | 담당 | 산출물 |
|---|---|---|
| papers | `ingest-paper` 스킬 | `raw/papers/{stem}.pdf`, `{stem}-figures/` |
| reports (PDF) | `ingest-paper --type reports` | `raw/reports/{stem}.pdf`, `{stem}-figures/` |
| books | `ingest-paper --type books` | `raw/books/{stem}.pdf` 또는 챕터 분할 |
| lectures | `ingest-paper --type lectures` | `raw/lectures/{stem}/`, `{stem}-figures/` |
| articles, reports (웹) | `ingest-article` 스킬 | `raw/articles/{stem}.md`, `{stem}-figures/` |
| repos | `CLAUDE.md`의 Repos 절차 | `raw/repos/{stem}.md` |
| videos | `CLAUDE.md`의 Videos 절차 | `raw/videos/{stem}.md`, `{stem}-figures/` |
| Step 3 ~ 4 (전 유형) | `write-wiki` 스킬 | `sources/{stem}.md`, `wiki/{category}/{stem}.md` |

`ingest-paper`는 페이지를 통째로 캡처하지 않고 캡션을 앵커로 삼아 도식 영역만 자른다. 검출이 틀리면 `--bbox`로 다시 자른다. `ingest-article`은 네 단계 추출 사다리(jina → chrome → 로그인 프로필 → firecrawl)로 본문 전문과 이미지를 가져온다.

## 작성 규칙의 정본 위치

문체와 용어 규칙의 정본은 `write-wiki` 스킬이고 스키마의 정본은 `CLAUDE.md`다. 여기서는 어긋나기 쉬운 다섯 가지만 짚는다.

- **wiki 본문 헤딩은 한글 단독이다.** 교재식 골격은 `## 요약` · `## 배경` · `## 핵심 개념` · `## 방법` · `## 결과` · `## 한계` · `## 핵심 용어` · `## 관련 페이지`다. 영문 병기(`## 요약 (Summary)`)는 쓰지 않는다.
- **sources는 반대로 번호와 영문 병기를 유지한다**(`## 3. 방법론 및 아키텍처 (Methodology and Architecture)`). 기존 파일과의 일관성 때문이며 병기 폐지는 wiki 본문에만 적용된다. 이 비대칭을 헷갈리면 수백 편이 한꺼번에 오편집된다.
- **전문 용어의 canonical 표기는 `wiki/overviews/glossary-{physical-ai,agents,llms}.md`가 SSOT다.** 용어집에 등재된 원어는 한글로 직역하지 않고 문서당 첫 등장 시 서술형 한글 풀이를 한 문장 둔다. 새 용어를 만나면 용어집에 행을 추가한다.
- **도식은 `curated: true` 항목만 wiki frontmatter로 복제한다.** 후보 전수는 sources frontmatter에 `curated: false`로 남아 나중에 다시 고를 수 있다. 이러면 트레이서빌리티는 유지되고 wiki frontmatter가 본문보다 커지는 일은 없다.
- **Obsidian 임베드는 항상 상대경로로 쓴다.** `![[figNN]]` shortlink는 vault 안 동명 파일과 충돌하므로 `![[assets/{stem}/figNN.png]]`로 적고 바로 아래에 `*Figure N: ...*` 캡션을 한 줄 둔다.

## index.md 카탈로그 계약

`index.md`는 카탈로그다. 항목 설명은 1~2문장, 200자 이내로 제한한다. 세부는 wiki 페이지가 담당한다.

```
- [[category/stem|표시 이름]]: 한 줄 설명 (YYYY, type)
```

문법은 이 한 가지만 쓴다. 구분자는 `]]: `이고 `type`은 paper, repo, article, report, video, book, lecture, overview 중 하나다.

이 줄은 `index.md` 머리의 문법 선언과 홈 카드를 만드는 `site/lib/content.mjs`, 작성 시점에 검사하는 `scripts/lint_index.py`가 함께 읽는다. 문법을 바꾸면 세 곳을 함께 고치고 `cd site && npm run build:strict`로 절별 카드 수를 확인한다. 구분자만 바꾸고 파서를 빼먹어 홈 카드가 거의 전멸한 적이 있다.

## 품질 게이트

검증은 저장 직후와 작성 완료 시 두 층으로 돌아간다.

- **저장 직후**: `.claude/hooks/wiki-lint-reminder.sh`가 `sources/`와 `wiki/`, `index.md`를 저장할 때 `lint_terms.py`(용어집 표기)와 `lint_style.py`(문체, 금지 기호)를 돌린다. 위반이 있을 때만 알려주고 작업을 막지는 않는다.
- **작성 완료 시**: `write-wiki` 스킬의 게이트가 `lint_links.py`(링크 해석), `lint_figures.py`(도식 정합), `audit_captions.py`(캡션), `lint_index.py`(카탈로그 문법)를 돌린다.

`README.md`와 `temp-docs/`는 lint 대상이 아니다. 문체 정책은 `wiki/`와 `sources/` 전용이다.

## 웹사이트

`site/`의 커스텀 Node 빌드가 `wiki/`와 `index.md`를 직접 읽어 정적 사이트를 만든다. 콘텐츠를 복제하지 않고 읽기만 한다.

라우트는 홈, wiki 페이지, `/tags/`, `/graph/`, `/about/`이다. 전체 검색은 Pagefind로 붙였고 카테고리와 태그로 패싯을 나눈다. 라이트/다크와 TOC, 관련 페이지 그래프, overview 학습 경로도 함께 넣었다. `main`에 푸시하면 Actions가 배포한다.

```bash
cd site && npm ci
npm run build:strict   # 카탈로그 가드까지 검사
npm run preview        # 빌드 + 검색 인덱스 + 로컬 서버
```

시각 설계의 정본은 [`DESIGN.md`](DESIGN.md), 기능 사양과 작업 이력은 [`temp-docs/web-design-plan.md`](temp-docs/web-design-plan.md)에 있다.

## 환경과 시작하기

Python 3.12와 [uv](https://github.com/astral-sh/uv)를 쓴다. 의존성은 `pyproject.toml`이 관리한다.

```bash
uv venv .venv --python 3.12
uv sync          # pypdf, pymupdf, playwright, beautifulsoup4, yt-dlp
```

`playwright`는 시스템에 설치된 Chrome을 그대로 구동하므로 `playwright install`은 필요 없다. `ffmpeg`는 영상 키프레임을 뽑을 때만 있으면 된다.

이 저장소를 그대로 쓰려면 이렇게 한다.

1. Claude Code 또는 Codex를 설치하고 이 저장소에서 에이전트를 띄운다.
2. 위 두 명령으로 `.venv`를 만든다.
3. 자료를 5~10개 떨어뜨리고 "이 자료들을 wiki에 추가해줘"라고 시킨다. 그다음 질문한다. 좋은 답이 나오면 "이걸 `wiki/overviews/`에 overview로 저장해줘"라고 한다.

빈 저장소에서 처음 세우거나 도메인을 갈아끼울 거라면 [`temp-docs/ai-wiki.md`](temp-docs/ai-wiki.md)의 부트스트랩 프롬프트를 쓴다.

## 지식이 자라는 방식

*"논문 1,000편을 다 ingest한 뒤 검색"*이 아니다. 진짜 질문에서 출발해 가지를 뻗는다. 질문하면 에이전트가 wiki를 검색해 답한다(rule #2). 부족하면 `raw/`를 다시 읽어 wiki를 갱신하고(rule #3) 자료가 없으면 없다고 말한다(rule #4). 좋은 답이 나올 때마다 overview로 저장한다.

뿌리 질문 하나에서 1차 wave(직접 overview), 2차 wave(파생된 깊은 가지), 3차 wave(횡단 주제)로 번져 나간다. 한 세션은 새 페이지나 갱신을 5~15개쯤 만들어야 한다. 시간이 쌓이면 wiki는 서로 연결된 지식 그래프가 된다. 이후 대화는 그 위에서 점점 빨라진다.

## Customization (다른 도메인에 적용하기)

무엇을 그대로 두고 무엇을 갈아끼울지를 나누는 게 요령이다.

**A. 바꾸지 않는 것**: 이 시스템이 지식 베이스로 작동하는 핵심 장치다.

- The Four Rules와 rule #1의 예외 범위
- 3-tier 파이프라인과 세 층이 같은 stem을 공유한다는 원칙
- 도식의 전수 아카이브와 큐레이션 사본 분리
- YAML 공통 키 8개: `title`, `type`, `year`, `category`, `raw_path`, `raw_filename`, `source_collection`, `tags`
- 명명 규칙의 *형식*: 소문자 + 하이픈 + 4자리 연도
- `raw/`는 항상 cp, 절대 symlink 금지

**B. 바꾸는 것**

| 항목 | 기본값 | 교체 예시 |
|---|---|---|
| `wiki/{category}/` 폴더 | database, llms, physical-ai, agents, evaluations, applications, etc, overviews | 도메인 분류로 교체 |
| `raw/{type}/` 폴더 | papers, repos, articles, reports, videos, books, lectures | `filings`, `cases`, `protocols` 등 |
| `category` 키의 enum | 위 카테고리 슬러그 | 위 폴더와 동기화 |
| 본문 언어 | 한글 | 청중에 맞게 |
| stem 양식 | `{first-author}-{year}-{first-5-words}` | 판례면 `{court}-{year}-{case-no}` |
| 분류 원칙 | 방법(method) 기준 | 이슈 · 기간 · 관할 · 약물군 등 |
| sources 표준 섹션 | 논문·기술 요약 헤딩 | 법률이면 사실관계 / 쟁점 / 판시 / 평석 |
| 용어집 | `glossary-{physical-ai,agents,llms}.md` | 도메인 용어집으로 교체 |

**C. 시나리오**

- **금융 리서치**: 카테고리를 `markets / instruments / strategies / regulations`로 바꾸고 유형에 `filings`와 `earnings-calls`를 더한다. stem은 `{ticker}-{year}-{form-type}`.
- **바이오·임상**: 카테고리는 `mechanisms / diseases / therapies / trials`. 유형에 `protocols`와 `guidelines`가 붙고 분류는 약물군과 적응증 기준으로 잡는다.
- **법률 판례**: 카테고리가 `civil / criminal / administrative / constitutional`이 되고 `cases`와 `statutes`가 유형으로 들어온다. 여기서는 sources 헤딩까지 함께 바꾼다.

**D. 교체 체크리스트**: 문서만 고치면 절반이다. 도구층도 도메인에 묶여 있다.

1. `CLAUDE.md`: 카테고리 표, stem 규칙, `category` enum, 통제 태그 어휘, 언어 정책 (Four Rules는 그대로)
2. `raw/`와 `wiki/`의 하위 폴더 이름
3. `index.md` 섹션 헤딩: `## Label (slug)` 형식을 유지한다. 사이트 빌드가 이 형식으로 절을 묶는다
4. `wiki/overviews/glossary-*.md`: `lint_terms.py`가 이 경로를 읽는다
5. `site/lib/domains.mjs`: 카테고리에서 도메인으로 가는 맵. 등록하지 않으면 기본 도메인이 된다
6. `site/lib/about.mjs`: About 본문은 자동 추출이 아니라 수기다. 카테고리를 바꾸면 여기도 고친다
7. `DESIGN.md`: 도메인 강조색을 늘리거나 줄일 때
8. `.github/workflows/deploy.yml`의 paths 필터
9. 이 README의 트리와 표
10. `cd site && npm run build:strict`로 절별 카드 수 확인

> 첫 교체는 카테고리 이름만 바꿔 자료 5~10개로 시험해 보자. 분류가 어색하면 다시 손본다.

## 읽기와 확장

읽고 탐색할 때는 [Obsidian](https://obsidian.md/)이 편하다. `wiki/` 폴더를 Vault로 열면 `[[wikilinks]]`와 graph view, 전체 검색을 그대로 쓸 수 있다. `wiki/assets/`의 도식도 본문에 임베드된 채 보인다. Obsidian은 파일을 읽기만 하므로 에이전트의 편집과 충돌하지 않는다.

확장은 필요해지기 전까지 미룬다. 한 카테고리가 ~500개를 넘으면 분할한다. `physical-ai`는 성격이 달라 40페이지에서 다시 본다. 전체가 ~500페이지를 넘으면 [QMD](https://qmd.ai)를 MCP 서버로 붙인다. 그 아래에서는 `index.md`와 에이전트 내장 검색으로 충분하다.

## 문서 지도

| 문서 | 역할 |
|---|---|
| `CLAUDE.md` | 에이전트가 매 대화에서 따르는 룰북. 스키마와 워크플로의 정본 |
| `.claude/skills/` | `ingest-paper` · `ingest-article` · `write-wiki` — 명령과 옵션의 정본 |
| `DESIGN.md` | 웹사이트 시각 설계 정본 |
| `temp-docs/ai-wiki.md` | 빈 저장소에서 이 템플릿을 처음 세울 때 읽는 부트스트랩 문서 |
| `temp-docs/web-design-plan.md` | 사이트 현행 사양과 작업 이력 |

이 README는 이 시스템이 무엇이고 왜 그렇게 하는지를 설명한다. 실제로 어떻게 하는지는 `CLAUDE.md`가 담는다.

---

*Built with [Claude Code](https://claude.com/claude-code) (Anthropic) + [Codex](https://github.com/openai/codex) (OpenAI). Browsing with [Obsidian](https://obsidian.md/). Search with [QMD](https://qmd.ai). Karpathy의 원본 아이디어: [@karpathy/1dd0294ef9567971c1e4348a90d69285](https://gist.github.com/karpathy/1dd0294ef9567971c1e4348a90d69285).*
