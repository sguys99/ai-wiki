# AI Wiki

AI 관련 기술자료(papers, repos, articles, reports, videos, books, lectures)를 저장·관리하는 개인 지식 베이스. [Karpathy의 LLM Wiki 패턴](https://gist.github.com/karpathy/1dd0294ef9567971c1e4348a90d69285)을 다중 자료 유형으로 확장한 구조다.

```
원본 자료 (raw/) → sources/*.md (LLM 요약) → wiki/{category}/*.md (최종 페이지)
```

**언어 정책 (Language Policy)**: `CLAUDE.md`의 지시문과 `sources/`·`wiki/`의 본문은 **한글**로 작성한다. 단, 식별자(YAML key, 카테고리명, 파일명 stem, 폴더명)와 기술 용어(RAG, Transformer, embedding, fine-tuning 등)는 **영문**으로 유지한다. 섹션 헤딩은 `## 요약`처럼 **한글 단독**으로 쓴다 (`## 요약 (Summary)` 식 영문 병기는 쓰지 않는다 — 문서 골격이 영어 번역판처럼 읽히는 원인이었다). 사용자와의 대화는 어느 언어로든 가능하다.

전문 용어의 canonical 표기는 도메인 용어집 `wiki/overviews/glossary-{physical-ai,agents,llms}.md`가 SSOT다. 용어집에 등재된 원어는 한글로 직역하지 않고(policy → "정책" ❌), 문서당 첫 등장 시 괄호 병기 없이 서술형 한글 풀이를 한 문장 둔다 (예: "control frequency는 로봇이 1초에 몇 번 새로운 action을 갱신하는지를 뜻한다"). 원어에는 조사를 그대로 붙인다("policy가 observation을 받아"). 용어집이 한글 canonical로 지정한 용어(임베딩, 토큰, 강화학습, 시연 데이터, 지시문 등)는 그 한글만 쓰되, 개념 번역어(시연 데이터, 지시문처럼 원어를 옮긴 것)는 문서당 첫 등장 시 원어를 괄호 병기한다("시연 데이터(demonstration)"). 같은 문서에서 원어와 번역어를 섞어 쓰지 않는다. 준수 여부는 `scripts/lint_terms.py`가 검사한다.

---

## THE FOUR RULES (위반 금지)

이 네 가지 규칙이 시스템의 핵심이다. 환각(hallucination)을 막고 모든 주장이 추적 가능(traceable)하도록 보장한다.

1. **웹 검색 금지.** `WebSearch`, `WebFetch`로 빈틈을 메우지 않는다. 이 wiki의 존재 이유는 모든 답변이 우리가 실제로 보유한 자료에 근거한다는 점이다.
   - **예외 (자료 수집에 한함)**: 사용자가 *명시적으로* "이 URL의 본문을 `raw/articles/`에 저장해줘" 같은 자료 수집을 지시한 경우에만 원본을 가져올 수 있다. Q&A·overview 생성·wiki 갱신 등 **답변 흐름**에서는 절대 호출하지 않는다.
   - 이 예외의 승인된 수단은 **`scripts/fetch_article.py`** (또는 repo README 취득)다. `WebFetch`는 기사 수집에 쓰지 않는다 — 추출기가 아니라 요약기라서 원문 전문이 `raw/`에 남지 않고, 이는 "`raw/`는 원본 그대로의 불변 아카이브"라는 3-tier 전제와 어긋난다.
2. **wiki를 먼저 참조한다.** `sources/`와 `wiki/`만이 진실의 원천(source of truth)이다.
3. **wiki가 충분하지 않으면 `raw/`의 원본을 다시 읽는다.** `raw/{type}/{stem}.{ext}`로 가서 더 많은 세부를 추출한 뒤 wiki를 갱신한다.
4. **wiki에 해당 주제 자료가 없으면 그렇다고 말한다.** 사용자에게 *"해당 주제에 대한 자료가 없습니다 — 원본 자료(PDF · URL · transcript 등)를 제공해 주세요"*라고 답한다. 임의로 보완하지 않는다.

이 규칙은 overview 페이지를 포함한 **모든** 응답에 적용된다: wiki에 존재하는 자료만 인용한다.

---

## Repository Structure

```
ai-wiki/
├── CLAUDE.md               # 이 파일
├── index.md                # 페이지 카탈로그
├── raw/                    # 원본 자료 (cp, never symlink)
│   ├── papers/             # arXiv 등 논문 PDF
│   │   ├── {stem}.pdf
│   │   └── {stem}-figures/ # 정밀 크롭 아카이브 + _overlay/ 확인용 (Step 2.5)
│   ├── repos/              # 주요 OSS 스냅샷 (langgraph, vllm, ragas 등)
│   │   └── {org-repo}/     # repo 내 기존 assets/img/를 in-place 참조 (별도 -figures/ ❌)
│   ├── articles/           # 블로그·뉴스 (Karpathy, Lilian Weng, Sebastian Raschka 등)
│   │   ├── {stem}.md
│   │   └── {stem}-figures/ # 사용자가 수동 저장한 PNG (Step 2.5, 수동)
│   ├── reports/            # 산업/리서치 리포트 (Stanford HAI, a16z, McKinsey 등)
│   │   └── {stem}-figures/ # papers와 동일
│   ├── videos/             # youtube 자료 (메타데이터 + transcript)
│   │   ├── {stem}.md
│   │   └── {stem}-figures/ # ffmpeg 키프레임 캡처 (Step 2.5, 수동 timestamp)
│   ├── books/              # 도서 (Raschka, Huyen 등) — TOC + 핵심 챕터 추출
│   │   └── {stem}-figures/ # papers와 동일
│   └── lectures/           # 강의 코스 패키지 (slides + notes + code, 코스 단위 폴더)
│       └── {stem}-figures/ # 슬라이드 도식 추출
├── sources/                # 모든 자료의 LLM 요약 (flat, 한글) — 이미지 임베드 ❌, figure 후보 텍스트만
│   └── {stem}.md
└── wiki/                   # 정제된 wiki 페이지 (한글) — Obsidian Vault 루트
    ├── assets/             # 큐레이션 사본 (Step 4에서 curated figure만 cp)
    │   └── {stem}/
    ├── database/
    ├── llms/
    ├── physical-ai/         # VLA, world model, robot learning, sim2real — 물리 세계와 상호작용
    ├── agents/
    ├── evaluations/
    ├── applications/
    ├── etc/
    └── overviews/          # 합성(synthesis) 페이지 — 지식이 계속 쌓이는 곳
```

---

## File Naming Convention

3-tier(`raw/`, `sources/`, `wiki/`)가 **동일한 stem**을 공유한다. 공통 원칙:

- 소문자(lowercase), 특수문자 제거, 공백 → `-`
- 연도는 4자리
- consortium/기관명 사용 가능 (예: `1000-genomes-project-2015-...`)

자료 유형별 stem 규칙:

| 유형 | stem 규칙 | 예시 |
|---|---|---|
| `papers` | `{first-author-lastname}-{year}-{first-5-title-words}` | `vaswani-2017-attention-is-all-you-need` |
| `repos` | `{org}-{repo-name}` (활성 프로젝트 — year 생략) | `langchain-ai-langgraph` |
| `articles` | `{author}-{year}-{first-5-title-words}` | `karpathy-2024-software-3-llms` |
| `reports` | `{org}-{year}-{first-5-title-words}` | `stanford-hai-2024-ai-index-report` |
| `videos` | `{channel}-{year}-{first-5-title-words}` | `3blue1brown-2024-but-what-is-gpt` |
| `books` | `{first-author-lastname}-{year}-{first-5-title-words}` | `raschka-2024-build-a-large-language-model` |
| `lectures` | `{instructor-or-org}-{year}-{course-name}` | `karpathy-2023-zero-to-hero`, `stanford-2024-cs336-llms` |

> 강의가 멀티파일이면 `raw/lectures/{stem}/` 하위 폴더에 묶는다. 도서를 챕터 분할로 다루면 `raw/books/{stem}/ch{N}.pdf`로 묶는다.

---

## Content Types & Categories

자료 유형(`raw/`의 하위 폴더)과 분류 카테고리(`wiki/`의 하위 폴더)는 **독립적**이다. 동일한 wiki 카테고리 안에 여러 유형의 자료가 공존할 수 있다 (예: `wiki/agents/`에 논문·레포·블로그가 함께 들어갈 수 있다).

| Wiki Category | 포함 내용 (예시) |
|---|---|
| `database` | Vector DB, RAG 인프라, embedding store (pgvector, Qdrant, Weaviate 등) |
| `llms` | 모델 아키텍처, pre-training, fine-tuning, foundation model 논문 |
| `physical-ai` | VLA, world model, robot learning, sim2real, 자율주행 — 물리 세계와 상호작용하는 방법 |
| `agents` | Agentic 시스템, tool use, planning, LangGraph 등 |
| `evaluations` | 평가 프레임워크(RAGAS, Braintrust), benchmark |
| `applications` | RAG 응용, 도메인 적용 사례, 제품 패턴 |
| `etc` | 미분류, 횡단(cross-cutting) 주제 |
| `overviews` | 다수 자료를 합성한 페이지 (지식이 계속 쌓이는 곳) |

분류 원칙: **방법(method)** 을 기준으로 분류한다. 평가지표(RAGAS)를 활용한 RAG 사례 논문이라면 `applications`보다 `evaluations`로 가는 게 적절할 수 있다 — "미래의 나에게 어느 카테고리에서 발견되어야 더 유용한가?"로 판단한다.

한 카테고리가 ~500개 파일을 넘어서면 분할을 고려한다.

### physical-ai 분류 판단 규칙

방법의 핵심에 물리 세계와의 상호작용(센서 입력, 액추에이터 출력, 시뮬레이터, 실체 로봇·차량)이 있으면 `physical-ai`로 보낸다. 물리 도메인을 소재로 삼되 방법이 순수 언어·검색이면 원래 카테고리를 유지한다.

- RT-2, OpenVLA, Diffusion Policy → `physical-ai`
- 로봇 매뉴얼 RAG의 검색 성능 평가 → `evaluations`
- 순수 VLM 아키텍처 논문(VLM3 등) → `llms` 유지, physical-ai 허브에서 상호 링크

### physical-ai 통제 태그 어휘 (canonical tags)

`wiki/physical-ai/` 페이지는 도메인 루트 태그 `physical-ai`를 달고 아래에서 1~3개를 고른다.

| 묶음 | 태그 |
|---|---|
| 학습·제어 방법 | `vla` · `world-model` · `robot-learning` · `imitation-learning` · `rl-control` |
| 플랫폼·응용 | `manipulation` · `locomotion` · `humanoid` · `mobile-robot` · `autonomous-driving` · `drone` |
| 환경·인식 | `sim2real` · `simulator` · `3d-perception` · `spatial-reasoning` · `slam` · `teleoperation` |
| 자원·운영 | `robot-dataset` · `benchmark` · `edge-inference` · `hardware` · `safety` |

기존 태그 풀에는 `graph-rag`와 `graphrag`처럼 표기가 갈린 사례가 있다. 이 목록은 표기를 하나만 허용한다. 목록에 없는 태그를 쓰려면 이 표에 먼저 추가한다.

`wiki/physical-ai/`가 40페이지를 넘으면 하위 폴더로 나눌지 다시 검토한다. 다른 카테고리의 ~500개 기준보다 훨씬 이른 값인데, 성격이 다른 두 도메인이 한 저장소에 섞여 있어서다.

---

## YAML Frontmatter Schema

### 공통 키 (모든 유형 필수)

```yaml
title: "..."                           # 원어 그대로 (영문 자료는 영문)
type: paper | repo | article | report | video | book | lecture
year: YYYY
category: database | llms | physical-ai | agents | evaluations | applications | etc | overviews
raw_path: /full/path/to/raw/{type}/{stem}.{ext}
raw_filename: "{stem}.{ext}"
source_collection: external
tags: []
figures: []                            # 옵션 — 도식/차트 후보 (스키마는 아래 참고). 자료에 도식이 없으면 생략 가능
```

`wiki/{category}/{stem}.md` 파일은 위에 더해 `source: {stem}.md` 키를 포함한다.

### figures 키 스키마 (sources/wiki 공통, Step 2.5 이후 작성)

```yaml
figures:
  - id: fig02                                          # 논문 라벨과 일치 (Figure 2 → fig02, Table 2 → tab02)
    label: Figure 2                                    # 원본 라벨 그대로 (로마 숫자면 "Table IV")
    kind: figure                                       # figure | table
    file: assets/{stem}/fig02.png                      # wiki 루트 기준 상대경로 (Obsidian 임베드용)
    raw: raw/papers/{stem}-figures/fig02.png           # 원본(전수 아카이브) 경로
    caption: "GraphRAG 인덱싱 파이프라인"
    page: 4                                            # PDF만 (article/repo/video는 생략)
    bbox_norm: [0.104, 0.098, 0.909, 0.395]            # 0~1 정규화. --bbox 로 다시 자를 때 쓴다
    strategy: caption-region                           # 아래 표 참고
    low_confidence: true                               # 옵션 — 면적비가 커서 사람이 봐야 한다
    curated: true                                      # true → wiki 본문에 임베드, false → 아카이브에만 존재
```

- 전체 figure 후보는 **sources** frontmatter에 남기고, wiki frontmatter에는 `curated: true` 항목만 복제해 본문에 임베드한다 — 트레이서빌리티는 sources가 유지한다 (wiki frontmatter 비대화 방지).
- `strategy` 허용값: `caption-region` · `table-region` · `column-band` · `page-region` · `manual`(`--bbox` 지정) · `legacy-page-region`(마이그레이션 이전 전면 캡처) · `fetched`·`screenshot`·`crop`(articles) · `keyframe`(videos).
- `figures.json`에는 `bbox`(PDF point 좌표)·`dpi`·`area_frac`·`overlay` 키도 함께 들어간다. frontmatter에는 사람이 볼 것만 옮긴다.

### 유형별 추가 키

```yaml
# papers
authors: "..."
doi: "..."                             # 또는 arxiv_id: "2106.09685"

# repos
org: "langchain-ai"
repo: "langgraph"
url: "https://github.com/langchain-ai/langgraph"
license: "MIT"

# articles
author: "..."
url: "https://..."
publisher: "Karpathy Blog"             # 출처 매체

# reports
org: "Stanford HAI"
url: "https://..."

# videos
channel: "..."
url: "https://youtu.be/..."
duration: "1h23m"                      # 또는 ISO 8601 ("PT1H23M")

# books
authors: "..."
publisher: "..."
isbn: "..."
edition: "..."                         # 옵션
url: "..."                             # 출판사·저자 페이지
extraction_mode: "toc"                 # "toc" (기본, 단일 source) 또는 "chapters" (챕터 분할)

# lectures
instructor: "..."
institution: "..."                     # 또는 channel
course_code: "..."                     # 옵션 (예: CS336)
url: "..."
materials: ["slides", "notes", "code"] # 코스에 포함된 자료 종류
```

### study_path 키 스키마 (overview 페이지, 옵션)

overview 페이지는 읽는 순서를 frontmatter로 선언할 수 있다. 사이트 빌드가 각 `id`를 wiki 페이지로 해석해 번호가 붙은 단계 목록으로 렌더한다. 해석되지 않는 참조는 빌드 콘솔에 리포트하되 빌드를 실패시키지는 않는다.

```yaml
study_path:
  - id: physical-ai/{stem}                 # "category/stem" — wiki 페이지 id
    note: "왜 여기서 읽는지 한 줄"
    prereq: ["llms/{stem}"]                # 옵션 — 먼저 읽어야 할 페이지 id 목록
```

Obsidian에서는 frontmatter가 본문에 보이지 않는다. 그래서 같은 순서를 본문 `## 학습 경로` 섹션에 `[[wikilink]]` 목록으로 한 번 더 적는다. 사람이 읽는 쪽이 본문, 기계가 읽는 쪽이 frontmatter다.

트랙이 여럿이면 `## 학습 경로` 절 안에 `### A 트랙 VLA 계보`처럼 `###` 하위 헤딩을 두고 트랙마다 번호 목록을 적는다. frontmatter `study_path`는 그중 기본 트랙 하나, 즉 절에서 첫 번째로 나오는 번호 목록과 순서와 대상이 일치해야 한다. 사이트 빌드(`site/lib/markdown.mjs`의 `spliceStudyPath`)는 절 전체가 아니라 그 첫 번호 목록 블록만 단계 컴포넌트로 교체하므로 도입 문단, 다른 트랙, 곁길 표, 꼬리 안내 문단은 웹에서도 Obsidian과 같이 보인다. 첫 목록의 항목 수와 `study_path` 단계 수가 다르면 빌드 콘솔이 `[study] WARN`으로 알린다 (빌드는 실패하지 않는다).

---

## Adding New Material (유형별 6-step)

모든 자료는 다음 파이프라인을 따른다. **Step 3·3.5·4는 공통**이고, Step 1(원본 수집)·Step 2(텍스트 추출)·Step 2.5(이미지 추출)만 유형별로 다르다.

```
Step 1    raw/에 원본 복사
Step 2    텍스트 추출 (pypdf 등)
Step 2.5  이미지 추출 → raw/{type}/{stem}-figures/      (자료에 도식 없으면 생략)
Step 3    sources/{stem}.md 작성 + figures 후보 frontmatter + "## 8. 그림 후보" 섹션
Step 3.5  사용자 confirm — wiki에 넣을 fig ID 지정 → curated: true
Step 4    wiki/{category}/{stem}.md 작성 + curated figure를 wiki/assets/{stem}/로 cp + 본문 임베드 + index.md 갱신
```

Step 1~2.5(수집과 추출)는 `ingest-paper`와 `ingest-article` 스킬이, Step 3~4(sources와 wiki 작성)는 `write-wiki` 스킬이 담당한다. 어느 유형이 어느 스킬로 가는지는 아래 "유형별 Step 1 ~ 2.5 진입점" 표에 있다.

`write-wiki`는 도메인 용어집 로드, 전문 용어 표기 규칙, 교재식 구조와 문체 가이드, 작성 후 lint 검증을 담당한다. 검증은 두 층이다. `.claude/hooks/wiki-lint-reminder.sh`가 저장 직후 `lint_terms.py`와 `lint_style.py`를 자동으로 돌리고, 스킬의 완료 게이트가 `lint_links.py`, `lint_figures.py`, `audit_captions.py`, `lint_index.py` 넷을 맡는다.

### 공통 Step 3 — `sources/{stem}.md` 작성

front-matter는 위 스키마를 따르고 (Step 2.5에서 도식을 추출했다면 `figures:` 리스트 채움 — 이 단계에서는 모든 항목 `curated: false`), 본문은 다음 한글 헤딩으로 구성한다 (전문 용어 표기는 `write-wiki` 스킬과 도메인 용어집을 따른다).

```markdown
## 한 줄 요약 (One-line Summary)
## 1. 자료 정보 (Document Information)
## 2. 주요 기여 (Key Contributions)
## 3. 방법론 및 아키텍처 (Methodology and Architecture)
## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)
## 5. 한계와 향후 과제 (Limitations and Future Work)
## 6. 관련 연구 (Related Work)
## 7. 용어집 (Glossary)
## 8. 그림 후보 (Figure Candidates)        # Step 2.5에서 도식을 추출한 경우만
```

> sources 템플릿의 번호 붙은 병기 헤딩은 기존 파일 216개와의 일관성을 위해 유지한다. 병기 폐지는 wiki 본문 헤딩에 적용된다.

sources는 요약이지만 세부를 깎는 단계가 아니다. 실험 수치, ablation 결과, 한계의 세부 항목은 삭제하지 않고 보존한다. 중간점(`·`)과 em dash(`—`) 금지는 sources 본문에도 똑같이 적용된다.

"## 8. 그림 후보" 섹션은 사용자가 빠르게 큐레이션 결정을 내릴 수 있도록 LLM이 다음 형식으로 추천 마크를 단다 (sources는 이미지 임베드 ❌ — 텍스트 메타만):

```markdown
## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 1 | "GraphRAG 전체 아키텍처" | caption-region | ★ wiki 권장 (architecture) |
| fig02 | 4 | "Indexing pipeline 세부" | caption-region | ★ wiki 권장 (method) |
| tab01 | 7 | "Podcast/News 코퍼스 벤치마크" | table-region | ★ wiki 권장 (result) |
| fig04 | 11 | "Appendix 부수 다이어그램" | column-band | (확인 필요) |
```

스크립트가 이 표의 초안을 stdout으로 뽑아준다. 캡션은 원문 영어 그대로이므로, 옮길 때 실제 이미지를 보고 한글로 다시 쓴다. id가 논문 라벨과 일치하므로 `대응` 열 같은 수동 매핑은 필요 없다.

id 열은 한 행에 id 하나만 적는다. `fig04~fig07`이나 `fig08, fig09, fig10` 같은 범위 행과 병합 행은 `scripts/lint_figures.py`가 첫 셀 전체를 id로 읽어 candidate-table-mismatch로 잡는다 (2026-09 Phase 7-7에서 physical-ai sources 17편의 158건 중 대부분이 이 유형이었다). 같은 판정을 여러 id에 내리더라도 행을 나눈다.

### 공통 Step 3.5 — 사용자 confirm

사용자가 "fig01, fig02, tab01을 wiki에 넣어줘"처럼 지정하면, 에이전트는 `sources/{stem}.md` frontmatter에서 해당 id의 `curated: true`로 변경한다 (`wiki/{category}/{stem}.md`도 동일하게).

### 공통 Step 4 — `wiki/{category}/{stem}.md` 작성 + 이미지 사본 + `index.md` 갱신

front-matter에 `source: {stem}.md`를 추가하고, sources의 `figures:` 리스트에서 **`curated: true` 항목만** 옮긴다. 전수 후보 아카이브는 sources frontmatter가 이미 들고 있으므로 트레이서빌리티는 유지되고, wiki frontmatter가 본문보다 커지는 비대화를 막는다.

본문은 아래 교재식 골격을 기본으로 한다. 자료 성격에 따라 절을 더하거나 뺀다 (repo 소개면 "배경" 생략 가능, 해설 article이면 원문의 절 구성을 따라도 된다).

```markdown
## 요약

한두 문단. 이 자료가 무엇이고 왜 중요한지.

## 배경

이 자료가 풀려는 문제와 등장 맥락. 어떤 한계를 출발점으로 삼았는지.

## 핵심 개념

본문 이해에 필요한 용어를 서술형 문장으로 풀이한다. 개념 하나에 문단 하나.

## 방법

### 하위 주제마다 ### 절을 나눈다

항목 3개 이상 열거는 불릿으로, 비교와 분류는 표로 꺼낸다.

| 구성 요소 | 역할 |
|---|---|
| ... | ... |

![[assets/{stem}/fig02.png]]
*Figure 2: GraphRAG 인덱싱 파이프라인 (Edge 2024, p.4)*

## 결과

수치 비교는 표를 우선 사용하고, 표가 말하는 바를 산문 한두 문단으로 해석한다.

## 한계

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| ... | sources 용어집에서 3~6개 선별해 옮긴다 |

## 관련 페이지

- [[category/page]]: 관계 설명
```

큐레이션 사본 복사 (Step 4 마지막에 일괄):

```bash
mkdir -p wiki/assets/{stem}
# curated: true 인 figure만 cp (예시는 fig01, fig02, fig05)
cp raw/papers/{stem}-figures/fig01.png wiki/assets/{stem}/
cp raw/papers/{stem}-figures/fig02.png wiki/assets/{stem}/
cp raw/papers/{stem}-figures/fig05.png wiki/assets/{stem}/
```

`index.md`에는 해당 카테고리 아래 한 줄 항목을 추가한다. 항목 설명은 **1~2문장, 200자 이내**로 제한한다. 세부 내용은 wiki 페이지가 담당하고 index는 카탈로그 역할만 한다 (기존에 항목이 수백 자로 자라 두 번째 wiki가 되는 문제가 있었다).

항목은 아래 문법 한 가지만 쓴다. 사이트 빌드(`site/lib/content.mjs`)가 이 줄을 홈 카드로 바꾸고, `scripts/lint_index.py`가 write-wiki 게이트에서 같은 문법을 검사한다. 구분자나 꼬리 형식을 바꾸면 두 소비자를 함께 고치고 `cd site && npm run build:strict`로 절별 카드 수를 확인한다 (2026-09 구분자를 `]]: `로 바꾸면서 파서를 빠뜨려 홈 카드가 전부 사라진 일이 있었다. 배포 빌드는 이제 파싱 불가 항목이나 카드 0개 절이 있으면 실패한다).

```
- [[category/stem|표시 이름]]: 한 줄 설명 (YYYY, type)
```

`type`은 paper, repo, article, report, video, book, lecture, overview 중 하나다. 표시 이름은 생략할 수 있고 `]`를 포함할 수 있다.

> **Obsidian 임베드 syntax 주의**: `![[fig02]]` shortlink는 vault 내 동명 파일과 충돌 위험 → 항상 `![[assets/{stem}/figNN.png]]` 처럼 **상대경로 명시**로 통일한다. 캡션은 임베드 바로 아래 `*Figure N: ...*` 형식으로 한 줄 둔다.

#### wiki 산문 문체

`wiki/` 와 `sources/` 의 한글 산문 규칙은 **`write-wiki` 스킬의 "6. wiki 교재 문체 가이드"가 정본**이다. 여기서 재서술하지 않는다. 교재식 전개, 하다체, 자문자답과 화자 개입 금지, 어휘 치환표, 중간점(`·`)과 em dash(`—`) 금지, 수치 표기, 상세도 목표가 모두 그 절에 있다.

기계 검사는 `scripts/lint_style.py` 와 `scripts/lint_terms.py` 가 맡고, `.claude/hooks/wiki-lint-reminder.sh` 가 Write/Edit 저장 직후 자동으로 돌려 위반이 있을 때만 알려준다.

humanize 자동 윤문은 이 두 폴더에 적용하지 않는다 (사용자가 명시 요청할 때만). 자동 윤문이 불릿과 표를 산문으로 녹여 wiki 품질을 떨어뜨린 전례가 있다.

---

### 유형별 Step 1 ~ 2.5 진입점

Step 1(원본 수집), Step 2(텍스트 추출), Step 2.5(이미지 추출)은 자료 유형마다 절차가 다르다. 명령과 옵션은 아래 스킬이 정본이고, 여기서는 어디로 가는지만 적는다.

| 유형 | 담당 | 주요 산출물 |
|---|---|---|
| `papers` | `ingest-paper` 스킬 | `raw/papers/{stem}.pdf`, `{stem}-figures/` |
| `reports` (PDF) | `ingest-paper` 스킬 (`--type reports`) | `raw/reports/{stem}.pdf`, `{stem}-figures/` |
| `books` | `ingest-paper` 스킬 (`--type books`) | `raw/books/{stem}.pdf` 또는 `{stem}/ch{N}.pdf` |
| `lectures` | `ingest-paper` 스킬 (`--type lectures`) | `raw/lectures/{stem}/`, `{stem}-figures/` |
| `articles` | `ingest-article` 스킬 | `raw/articles/{stem}.md`, `{stem}-figures/` |
| `reports` (웹) | `ingest-article` 과 같이 다룬다 | `raw/reports/{stem}.md` |
| `repos` | 아래 절차 (전용 스킬 없음) | `raw/repos/{stem}.md` |
| `videos` | 아래 절차 (전용 스킬 없음) | `raw/videos/{stem}.md`, `{stem}-figures/` |

repos 와 videos 만 여기에 절차를 남긴다. 전용 스킬이 없고 분량이 짧아서다.

### Repos

**Step 1** — 사용자가 org/repo를 지정하면, 에이전트가 `WebFetch`로 README를 취득해 `raw/repos/{stem}.md`로 저장한다 (rule #1 예외: 사용자가 명시적으로 자료 수집을 지시한 경우에 한함).

- 취득 URL: `https://raw.githubusercontent.com/{org}/{repo}/main/README.md` (없으면 `/master/` 시도)
- 서브디렉토리 경우: `https://raw.githubusercontent.com/{org}/{repo}/main/{path}/README.md`

저장 형식:

```markdown
---
title: "..."
type: repo
year: YYYY
category: ...
raw_path: raw/repos/{stem}.md
raw_filename: "{stem}.md"
source_collection: external
org: "..."
repo: "..."
url: "https://github.com/{org}/{repo}"
license: "..."
tags: []
---

{README.md 전문}
```

**Step 2** — 저장된 `raw/repos/{stem}.md`를 그대로 LLM 입력으로 사용한다 (articles와 동일).

**Step 2.5 (이미지)** — repo 내 이미지는 자동 fetch하지 않는다. README 본문에 등장하는 이미지의 GitHub URL을 `figures:` frontmatter의 `raw` 필드에 기록하고 `strategy: manual`로 표기. 사용자가 필요한 이미지를 `wiki/assets/{stem}/`에 수동 저장.

**비고**: `license` 키 작성 필수. 사용/인용 시 라이선스 조건 준수.

### Videos

**Step 1** — youtube transcript(자막)를 사용자가 직접 `raw/videos/{stem}.md`로 저장한다. `yt-dlp` 등 **로컬 도구**로 자막을 받는 것은 허용된다 (네트워크 fetch는 사용자가 수동 수행). 채널·URL·duration 등 메타데이터는 frontmatter에 기록한다.

**Step 2** — transcript 본문을 그대로 LLM 입력으로 사용한다.

**Step 2.5 (키프레임 캡처)** — 슬라이드·차트가 등장하는 timestamp를 사용자가 transcript에서 지정 → `ffmpeg`로 프레임 1장씩 캡처해 `raw/videos/{stem}-figures/`에 저장.

> **환경**: 시스템에 `ffmpeg`가 필요하다 (`brew install ffmpeg` — 한 번만). 영상 파일(.mp4 등)은 `raw/videos/{stem}.mp4` 또는 사용자가 알려주는 외부 경로 사용 가능.

```bash
STEM="3blue1brown-2024-but-what-is-gpt"
VIDEO="/path/to/${STEM}.mp4"     # 또는 raw/videos/${STEM}.mp4
OUT="raw/videos/${STEM}-figures"
mkdir -p "$OUT"

# 사용자가 transcript에서 지정한 timestamp들로 캡처 (예: 03:12, 07:45, 12:30)
for TS in 03:12 07:45 12:30; do
  CLEAN=$(echo "$TS" | tr -d ':')
  ffmpeg -nostdin -hide_banner -loglevel error \
    -ss "$TS" -i "$VIDEO" -frames:v 1 -y "$OUT/frame-${CLEAN}.png"
done
```

자동 키프레임 검출(`-vf "select=eq(pict_type,I)"`)은 슬라이드 전환과 무관한 I-frame을 너무 많이 잡아 노이즈가 큼 → **수동 timestamp 권장**. sources의 `figures:` frontmatter에는 `strategy: keyframe`, `page` 대신 `timestamp` 키로 표기 (예: `timestamp: "03:12"`).

---

## Raw File Management Rules

- **항상 복사(`cp`), 절대 symlink 금지.** 외부 위치에서 `raw/` 안으로 실파일을 옮긴다.
- `raw_path`는 반드시 `raw/` 내부를 가리킨다. `~/Downloads/` 등 외부 경로는 금지.
- `raw_filename`은 `basename(raw_path)`와 정확히 일치해야 한다.
- `type` 키는 `raw/`의 하위 폴더명과 정확히 일치해야 한다 (예: `type: paper` ↔ `raw/papers/`, `type: book` ↔ `raw/books/`, `type: lecture` ↔ `raw/lectures/`). type은 단수형(paper/book/lecture), 폴더명은 복수형(papers/books/lectures).
- **멀티파일 패키지** (강의 코스, 챕터 분할 도서)의 경우 `raw_path`가 디렉토리(예: `raw/lectures/{stem}/`)를 가리키고, `raw_filename`은 디렉토리명(`{stem}/`) 또는 대표 파일명(`README.md` 등)으로 기록한다. 챕터 분할 도서는 source 파일별로 `raw_path`가 해당 챕터 PDF를 가리킨다.
- **`{stem}-figures/` 디렉토리는 raw의 일부로 불변 취급** (Step 2.5의 출력 아카이브). 사용자가 수동으로 추가/교체할 수 있지만, 자동 파이프라인이 사후 삭제·재생성하지 않는다 (`figures.json`이 source-of-truth manifest). `repos`만 예외 — repo 내 기존 `assets/`·`img/`를 in-place 참조하고 별도 `-figures/` 폴더를 만들지 않는다.
- 다만 `extract_figures.py --force`는 이 디렉토리를 통째로 다시 만든다. **사람이 지시할 때만 쓴다.** 2026-08 정밀 크롭 전환에서 `scripts/remap_figures.py`로 기존 19개 stem을 한 번 재생성했고, 그때 새 검출과 잇지 못한 항목은 `{stem}-figures/legacy/`에 옛 전면 캡처 그대로 남겼다.

---

## Image & Figure Handling

자료에 포함된 도식·다이어그램·차트를 wiki에 임베드하여 Obsidian 열람 시 시각 정보를 제공한다.

### 흐름 요약

```
Step 2.5  캡션 앵커 크롭  → raw/{type}/{stem}-figures/   (fig/tab + _overlay + figures.json)
          오버레이 확인   → 틀린 것만 --bbox 로 재크롭
Step 3    LLM 후보 추천  → sources/{stem}.md의 "## 8. 그림 후보" 섹션
Step 3.5  사용자 confirm → 해당 fig id의 curated: true
Step 4    큐레이션 사본  → wiki/assets/{stem}/ + 본문 ![[]] 임베드
```

### 핵심 원칙

1. **하이브리드 선별**: 자동 검출 + 사람의 오버레이 확인 + LLM 후보 + 사용자 확정. 자동 임베드 ❌.
2. **저장 분리**: `raw/{type}/{stem}-figures/`는 전수 아카이브, `wiki/assets/{stem}/`는 큐레이션 사본만 (Obsidian-friendly).
3. **PDF 추출 전략**: 캡션을 앵커로 삼는 `scripts/extract_figures.py`. 페이지 통째가 아니라 도식 영역만 자른다. 검출이 틀리면 `--bbox`로 고친다.
4. **id는 논문 라벨**: `fig03` = Figure 3, `tab02` = Table 2. 사람이 대응표를 손으로 만들 일이 없다.
5. **Obsidian 임베드**: `![[assets/{stem}/figNN.png]]` + 다음 줄에 `*Figure N: caption*`. shortlink(`![[figNN]]`)는 동명 충돌 위험 → 항상 상대경로.
6. **sources는 텍스트만**: `sources/`에는 이미지 임베드 ❌. `figures:` frontmatter + "## 8. 그림 후보" 텍스트 메타만.
7. **트레이서빌리티**: 큐레이션에서 빠진 후보도 **sources** frontmatter에 `curated: false`로 남긴다 — 미래에 재선택 가능. wiki frontmatter에는 curated 항목만 복제한다.
8. **자료에 도식 없음**: `figures:` 키 자체를 생략 (빈 리스트도 OK).

Step 2.5 의 유형별 도구와 실행 절차는 위 "유형별 Step 1 ~ 2.5 진입점" 표가 가리키는 스킬과 절을 따른다.

### 환경

의존성은 `pyproject.toml`이 관리한다. 최초 1회:

```bash
uv venv .venv --python 3.12
uv sync          # pypdf, pymupdf, playwright, beautifulsoup4, yt-dlp
```

`playwright`는 `channel="chrome"`으로 **시스템에 설치된 Chrome을 그대로 구동**하므로 `playwright install`(브라우저 ~150MB 다운로드)은 필요 없다.

```bash
brew install ffmpeg    # videos 처리 시점에만 (옵션)
```

---

## Knowledge Compounding

가장 가치 있는 페이지는 개별 자료 요약이 아니라, 여러 자료를 합성하는 `wiki/overviews/` 페이지다. 좋은 답이 나오면 저장하자:

> "이 내용을 `wiki/overviews/`에 overview 페이지로 저장해줘."

한 번의 대화는 5–15개의 새 wiki 페이지 또는 업데이트를 만들어내야 한다. 시간이 흐르면 wiki는 검색 가능하고 상호 참조되는(`[[wikilinks]]`) 지식 그래프가 되어, 이후 대화는 그 위에서 점점 더 빨라진다.

---

## Browsing with Obsidian

시각적 탐색을 위해 [Obsidian](https://obsidian.md/)(무료, Mac/Windows/Linux)을 설치하고 wiki 폴더를 Vault로 열면 좋다. `[[wikilinks]]`, graph view, full-text search를 기본 지원한다. 사용자가 wiki를 어떻게 읽느냐고 물으면 Obsidian을 권장하자 — Obsidian은 파일을 읽기만 하므로 에이전트의 편집 작업과 충돌하지 않는다.

---

## Design Principles

- **3-tier**: 원본 자료(immutable) → `sources/*.md` → `wiki/**/*.md`
- **언어 정책**: 지시문·본문은 한글, 식별자(YAML key·카테고리·파일명·폴더명)는 영문. 기술 용어는 영문 인라인. RAG 친화성 유지
- **Obsidian 호환**: `[[wikilinks]]`, plain markdown
- **일관된 YAML**: 모든 파일에 공통 키(`title`, `type`, `year`, `category`, `raw_path`, `raw_filename`, `source_collection`, `tags`) 필수
- **유형 ↔ 카테고리 독립**: `type`은 원본 유형(paper/repo/...), `category`는 wiki 분류 — 둘은 자유롭게 조합된다
- **방법 기준 분류**: 주제(topic)가 아니라 방법(method)으로 카테고리를 정한다
- **웹 검색 금지**: 위 rule #1

확신이 서지 않을 때는 rule #1을 따른다.
