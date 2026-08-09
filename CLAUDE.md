# AI Wiki

AI 관련 기술자료(papers, repos, articles, reports, videos, books, lectures)를 저장·관리하는 개인 지식 베이스. [Karpathy의 LLM Wiki 패턴](https://gist.github.com/karpathy/1dd0294ef9567971c1e4348a90d69285)을 다중 자료 유형으로 확장한 구조다.

```
원본 자료 (raw/) → sources/*.md (LLM 요약) → wiki/{category}/*.md (최종 페이지)
```

**언어 정책 (Language Policy)**: `CLAUDE.md`의 지시문과 `sources/`·`wiki/`의 본문은 **한글**로 작성한다. 단, 식별자(YAML key, 카테고리명, 파일명 stem, 폴더명)와 기술 용어(RAG, Transformer, embedding, fine-tuning 등)는 **영문**으로 유지한다. 섹션 헤딩은 `## 요약 (Summary)` 형식으로 한글 + 영문 병기를 권장한다. 사용자와의 대화는 어느 언어로든 가능하다.

전문 용어의 canonical 표기는 도메인 용어집 `wiki/overviews/glossary-{physical-ai,agents,llms}.md`가 SSOT다. 용어집에 등재된 원어는 한글로 직역하지 않고(policy → "정책" ❌), 문서당 첫 등장 시 괄호 병기 없이 서술형 한글 풀이를 한 문장 둔다 (예: "control frequency는 로봇이 1초에 몇 번 새로운 action을 갱신하는지를 뜻한다"). 원어에는 조사를 그대로 붙인다("policy가 observation을 받아"). 용어집이 한글 canonical로 지정한 용어(임베딩·토큰·강화학습 등)는 그 한글만 쓴다. 준수 여부는 `scripts/lint_terms.py`가 검사한다.

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
    └── overviews/          # 합성(synthesis) 페이지 — 지식이 복리로 쌓이는 곳
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
| `overviews` | 다수 자료를 합성한 페이지 (지식이 복리로 쌓이는 곳) |

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

- 전체 figure 후보를 frontmatter에 남기고 `curated: true`만 wiki 본문에 임베드 — 트레이서빌리티 유지.
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

Step 3~4(sources·wiki 작성)는 `write-wiki` 스킬을 사용한다. 스킬이 도메인 용어집 로드, 전문 용어 표기 규칙, 첫 등장 풀이 스타일, 작성 후 lint 검증을 담당한다.

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

### 공통 Step 3.5 — 사용자 confirm

사용자가 "fig01, fig02, tab01을 wiki에 넣어줘"처럼 지정하면, 에이전트는 `sources/{stem}.md` frontmatter에서 해당 id의 `curated: true`로 변경한다 (`wiki/{category}/{stem}.md`도 동일하게).

### 공통 Step 4 — `wiki/{category}/{stem}.md` 작성 + 이미지 사본 + `index.md` 갱신

front-matter에 `source: {stem}.md` 추가, sources의 `figures:` 리스트 복제 (curated 플래그 그대로 유지). 본문 헤딩 예시:

```markdown
## 요약 (Summary)
## 주요 기여 (Key Contributions)
## 방법론 및 아키텍처 (Methodology and Architecture)

![[assets/{stem}/fig02.png]]
*Figure 2: GraphRAG 인덱싱 파이프라인 (Edge 2024, p.4)*

## 결과 (Results)

![[assets/{stem}/fig03.png]]
*Figure 3: Podcast/News 코퍼스 벤치마크 (Edge 2024, Table 1)*

## 관련 페이지 (Related Pages)
- [[category/page]] — 관계 설명
```

큐레이션 사본 복사 (Step 4 마지막에 일괄):

```bash
mkdir -p wiki/assets/{stem}
# curated: true 인 figure만 cp (예시는 fig01, fig02, fig05)
cp raw/papers/{stem}-figures/fig01.png wiki/assets/{stem}/
cp raw/papers/{stem}-figures/fig02.png wiki/assets/{stem}/
cp raw/papers/{stem}-figures/fig05.png wiki/assets/{stem}/
```

`index.md`에는 해당 카테고리 아래 한 줄 항목을 추가한다.

> **Obsidian 임베드 syntax 주의**: `![[fig02]]` shortlink는 vault 내 동명 파일과 충돌 위험 → 항상 `![[assets/{stem}/figNN.png]]` 처럼 **상대경로 명시**로 통일한다. 캡션은 임베드 바로 아래 `*Figure N: ...*` 형식으로 한 줄 둔다.

#### wiki 산문 문체 가이드 (Prose Style — 생성 시점 적용)

`sources/`·`wiki/`의 한글 산문을 처음 쓸 때부터 아래를 지키면 후속 humanize 부담이 크게 준다. 목표는 **평이한 기술 문서 register** — 사람인 엔지니어가 블로그·문서에 쓰는 담백한 문장이다. (사후 교정은 humanize-korean `register: wiki`(strict)가 맡지만, 초안이 이미 꾸민 글이면 20~35% 손질로도 다 못 고친다.)

- **흔한 어휘 우선**: 잘 안 쓰는 문어체·문학체 어휘를 피한다. "포개다·결이 다르다·복리로 쌓인다·파고들다·손을 대는 통로·무게가 실린다·격차를 벌린다" → "겹친다·성격이 다르다·계속 쌓인다·깊이 본다·건드리는 경로·비중이 크다·차이를 키운다". 고를 때 "일반 기술 문서에서 쓰는 말인가?"를 자문.
- **기계적 병렬 회피**: "~하다면, ~는 ~한다" 대구, "(1)·(2)·(3)" 숫자 인덱싱, "첫째/둘째/셋째" 공식을 반복하지 않는다. 열거는 산문 흐름으로 녹인다.
- **명사 강조 볼드 절제**: 문장 속 개념어를 **볼드**로 강조하는 습관을 줄인다. 볼드는 표·헤딩·핵심어 1~2개에만.
- **콜론 부제 헤딩 회피**: "X: Y" 형식 헤딩을 반복하지 않는다. 짧은 평서 헤딩으로.
- **연결어미 뒤 쉼표 자제**: "-고, / -며, / -지만, / -어서," 직후 쉼표를 남발하지 않는다(AI 티 최상위 신호, C-11).
- **문단 흐름**: 모든 문단을 "요약 문장 → 부연" 틀로 열지 않는다. 일부 문단은 사례·수치·질문으로 시작해 리듬을 준다. 문두 접속사("또한·따라서·즉·나아가")는 최소화.
- **전문 용어 원어 유지**: 도메인 용어집(`wiki/overviews/glossary-*.md`) 등재 용어는 canonical 표기만 쓴다. 직역("정책·보상·관측·궤적")과 표기 흔들림("관측/관찰", "워크플로/워크플로우") 금지. 첫 등장 시 서술형 풀이 한 문장, 괄호 병기는 하지 않는다.
- **불변**: 사실·수치·고유명사·인용·YAML key·파일명·영문 기술용어(RAG·Transformer 등)·용어집 canonical 표기는 문체와 무관하게 그대로.

> 이 가이드는 안티-AI-티 규칙(`references/ai-tell-taxonomy.md`)의 부분집합을 생성 단계로 앞당긴 것이다. 완전 판정·교정은 humanize-korean strict가 수행한다.

---

### Papers (PDF)

**Step 1** — PDF를 `raw/papers/`에 복사 (symlink 금지).

**Step 2** — `pypdf`로 첫 ~15페이지, ~12,000자 추출 (LLM 요약에 충분):

> **환경**: 이 프로젝트는 Homebrew Python(PEP 668) 환경이라 `pip3 install pypdf`가 막힌다. 대신 프로젝트 `.venv`(uv로 생성, 부트스트랩에서 자동 수행)를 사용하고, PDF 추출은 `.venv/bin/python3`로 실행한다.

```bash
# 최초 1회 (이미 부트스트랩에서 수행됨)
# uv venv .venv --python python3
# uv pip install --python .venv/bin/python pypdf

.venv/bin/python3 -c "
import pypdf, sys
reader = pypdf.PdfReader(sys.argv[1])
text = ''
for page in reader.pages[:15]:
    t = page.extract_text()
    if t: text += t + '\n'
    if len(text) > 12000: break
print(text[:12000])
" "/path/to/paper.pdf"
```

**Step 2.5 (이미지 추출)** — `scripts/extract_figures.py`가 캡션을 앵커로 삼아 figure·table 영역만 잘라낸다. `--dry-run`으로 검출표를 먼저 보고, 추출한 뒤 오버레이로 확인하는 2단계다.

```bash
.venv/bin/python scripts/extract_figures.py <stem> --dry-run     # 검출표만
.venv/bin/python scripts/extract_figures.py <stem>               # 실제 추출
```

산출물은 `raw/papers/{stem}-figures/`에 들어간다. `figNN.png`·`tabNN.png`(300 DPI 크롭), `figures.json`(매니페스트), `_overlay/pNN.png`(검출 영역을 빨간 사각형으로 표시한 확인용 — git 추적 제외).

**id는 논문 라벨과 일치한다.** Figure 3 → `fig03`, Table 2 → `tab02`. IEEE식 로마 숫자(Table IV)도 `tab04`로 정규화한다. 그래서 예전처럼 `(paper Figure N)` 대응 주석을 손으로 달 필요가 없다.

검출은 캡션마다 폴백 사다리를 내려가고, 어디서 나왔는지는 `strategy`에 남는다.

| strategy | 뜻 |
|---|---|
| `caption-region` | 캡션에서 바깥으로 자라며 여백에서 멈춰 그래픽을 감쌌다 |
| `table-region` | 가로 괘선 뭉치 / `find_tables()` / 캡션에 붙은 텍스트 덩어리 |
| `column-band` | 그래픽을 못 찾아 캡션 위 여백 밴드를 통째로 잡았다 |
| `page-region` | 전부 실패 — 페이지 전체 |
| `manual` | `--bbox`로 사람이 지정했다 |

**확인과 보정** — 추출 후 `_overlay/pNN.png`를 열어 빨간 사각형이 도식을 제대로 감쌌는지 본다. `column-band`·`page-region`·`low_confidence`는 스크립트가 마지막에 "⚠ 확인 필요"로 짚어준다. 틀린 것만 0~1 정규화 좌표로 다시 자른다.

```bash
.venv/bin/python scripts/extract_figures.py <stem> --force \
    --bbox fig03=4:0.10,0.28,0.90,0.62
```

`--bbox`의 id가 검출 목록에 없으면 새 항목으로 추가된다 — 스크립트가 놓친 도식을 손으로 넣는 경로다.

| 옵션 | 뜻 |
|---|---|
| `--type` | `papers`(기본) · `reports` · `books` · `lectures` |
| `--dry-run` | 검출표만 출력하고 파일은 안 쓴다 |
| `--force` | 기존 `-figures/`를 덮어쓴다 (기본은 중단) |
| `--bbox ID=PAGE:x0,y0,x1,y1` | 수동 크롭. 반복 지정 가능 |
| `--overlay-only` | 오버레이만 다시 만든다 |
| `--page-shots` | 검출된 페이지의 전면 렌더도 `page-pNN.png`로 남긴다 |
| `--dpi` | 크롭 해상도 (기본 300) |

캡션이 `Figure N` 꼴이 아닌 자료(슬라이드 덱, 한글 제품 소개서 등)는 "캡션을 하나도 못 찾았다"로 멈춘다. 그때는 `--bbox`로 직접 지정하거나 사용자가 PNG를 수동 저장한다.

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

### Articles

**Step 1 (기본 경로)** — 사용자가 URL로 수집을 지시하면 `scripts/fetch_article.py`를 쓴다. Step 1·2·2.5를 한 번에 처리하고 거기서 멈춘다 — `sources/`·`wiki/`·`index.md`는 건드리지 않고 git commit도 하지 않는다. 자세한 절차는 `ingest-article` 스킬 참고.

```bash
.venv/bin/python scripts/fetch_article.py "<URL>" --dry-run            # stem 제안
.venv/bin/python scripts/fetch_article.py "<URL>" --stem <stem> --crop  # 실제 수집
```

추출은 무료 경로부터 내려가는 4단 사다리다: `jina`(r.jina.ai, 키 불필요) → `chrome`(로컬 Chrome) → `profile`(본인 로그인 세션, `--profile` 명시 시에만) → `firecrawl`(`FIRECRAWL_API_KEY` 있을 때만). 성공한 tier는 frontmatter `extractor_tier`에 기록된다. Jina 무료 티어는 rate limit이 잦아 chrome 폴백이 자주 발동하는데, 정상 동작이다.

**Step 1 (폴백)** — 사다리가 전부 막히면 사용자가 본문을 직접 `raw/articles/{stem}.md`로 저장한다. 원본 URL은 frontmatter `url`에 기록한다.

**Step 2** — 저장된 `.md` 본문을 그대로 LLM 입력으로 사용한다. 본문은 원문 그대로 두며 요약·번역·윤문하지 않는다. (`.claude/hooks/humanize-reminder.sh`는 `Write`/`Edit` 도구에만 걸리고 스크립트는 Bash로 파일을 쓰므로 발동하지 않는다 — 의도된 동작이다. `raw/`의 기사 본문은 원저자의 원문이라 윤문 대상이 아니다.)

**Step 2.5 (이미지)** — 스크립트가 세 가지를 함께 수집해 `raw/articles/{stem}-figures/`에 넣고 `figures.json` 매니페스트를 쓴다:

| 산출물 | strategy | 설명 |
|---|---|---|
| `figNN.{ext}` | `fetched` | 본문 `<img>` 원본 다운로드. 확장자는 `Content-Type`으로 판정 (URL 확장자는 신뢰하지 않는다) |
| `page-full.png` | `screenshot` | 전체 페이지 캡처. 6,000px 초과 시 상단만 남기고 절단 |
| `cropNN.png` | `crop` | `--crop` 지정 시 도식 영역별 캡처 |

사용자가 직접 PNG를 넣는 기존 방식도 그대로 유효하며, 이 경우 `strategy: manual`로 표기한다. 도식이 없는 article은 `figures:` 키를 생략한다.

### Reports

**Step 1** — PDF면 `raw/reports/`에 복사(papers와 동일). 웹 페이지면 본문을 `.md`로 변환하여 저장한다.

**Step 2** — PDF는 `pypdf`로 추출, `.md`는 그대로 사용.

**Step 2.5 (이미지 추출)** — PDF reports는 papers와 같은 스크립트에 `--type reports`만 붙인다.

```bash
.venv/bin/python scripts/extract_figures.py <stem> --type reports --dry-run
```

웹 reports(.md)는 articles와 동일하게 사용자 수동 저장.

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

### Books (PDF/EPUB)

**Step 1** — 도서 파일을 `raw/books/`에 복사. 단일 모드는 `raw/books/{stem}.pdf`, 챕터 분할 모드는 `raw/books/{stem}/{ch01.pdf, ch02.pdf, ...}`.

**Step 2** — 추출 전략은 두 모드 중 선택 (frontmatter의 `extraction_mode`에 기록):

- **`toc` (기본, 단일 source)**: 처음 5–10페이지에서 목차를 뽑은 뒤, 사용자가 지정한 핵심 챕터(또는 첫 1–2개 챕터)를 ~12,000자까지 `pypdf`로 추출. papers와 동일한 도구·환경 사용. 책 한 권 = `sources/{stem}.md` 한 개.
- **`chapters` (챕터 분할)**: 챕터별로 분할된 PDF 각각을 ~12,000자씩 추출하여 **챕터별 source 다수 생성** (`sources/{stem}-ch01.md`, `{stem}-ch02.md`, ...). wiki는 각 챕터를 별도 페이지로 둘 수도, 합쳐서 한 페이지로 둘 수도 있고, 책 전체에 대한 `wiki/overviews/{stem}-overview.md`를 별도로 작성하는 것이 권장된다.

```bash
# papers와 동일한 .venv/bin/python3 사용
.venv/bin/python3 -c "
import pypdf, sys
reader = pypdf.PdfReader(sys.argv[1])
text = ''
for page in reader.pages[:15]:
    t = page.extract_text()
    if t: text += t + '\n'
    if len(text) > 12000: break
print(text[:12000])
" "raw/books/{stem}.pdf"
```

**Step 2.5 (이미지 추출)** — `--type books`로 papers와 같은 스크립트를 쓴다. chapters 모드에서는 챕터별로 따로 부른다 — `raw/books/{stem}/ch01.pdf` → `raw/books/{stem}/ch01-figures/` 처럼 챕터 stem에 `-figures/` suffix가 붙는다. sources도 챕터별로 분리되므로 (`sources/{stem}-ch01.md` 등) figures 키도 챕터별 source에 들어간다.

> **분류 팁**: 책은 보통 한 카테고리에 들어가지만, 실무 도서(예: AI Engineering)는 여러 카테고리에 걸친다. 챕터 분할 모드에서는 챕터별로 다른 카테고리에 wiki 페이지를 두고, overview 페이지에서 묶는 것을 권장한다.

### Lectures (코스 패키지)

**Step 1** — 강의 자료를 `raw/lectures/{stem}/` 하위 폴더에 모은다. 일반적인 구성:

```
raw/lectures/karpathy-2023-zero-to-hero/
├── transcripts/         # 강의 자막 (.md)
├── slides/              # 슬라이드 PDF
├── notes/               # 보조 노트
└── code/                # 실습 코드 스냅샷
```

**Step 2** — 자료 종류별로 추출:

- 슬라이드 PDF → `pypdf` (papers와 동일)
- transcript/notes (.md) → 그대로 사용
- code → README + 디렉토리 트리 + 핵심 파일 헤더 (repos와 동일)

**Step 2.5 (이미지 추출)** — 슬라이드 PDF가 도식의 주된 출처다. `--type lectures`로 슬라이드 PDF에 적용한다 (경로: `raw/lectures/{stem}/slides/*.pdf` → `raw/lectures/{stem}-figures/`). 슬라이드는 캡션이 `Figure N` 꼴이 아닌 경우가 많아 "캡션을 못 찾았다"로 멈추기 쉽다 — 그때는 `--bbox`로 필요한 슬라이드 영역을 직접 지정한다. transcript에서 강조된 슬라이드 번호를 사용자가 큐레이션 시점에 알려준다.

`source: {stem}.md`는 코스 한 권 단위로 작성한다. 강의가 너무 길면 모듈/섹션 단위로 분할해 `sources/{stem}-mod{N}.md`로 만들 수 있다 (책의 chapters 모드와 동일).

> **video와의 구분**: 단일 영상(예: Karpathy의 단일 youtube 강연)은 `videos`로 충분. `lectures`는 슬라이드·노트·실습이 함께 있는 **코스 패키지**일 때 사용한다.

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
7. **트레이서빌리티**: 큐레이션에서 빠진 후보도 frontmatter에 `curated: false`로 남긴다 — 미래에 재선택 가능.
8. **자료에 도식 없음**: `figures:` 키 자체를 생략 (빈 리스트도 OK).

### 유형별 도구·전략 (요약표)

| 유형 | Step 2.5 도구 | 전략 | 자동/수동 |
|---|---|---|---|
| Papers / Reports(PDF) / Books / Lectures(slides) | `scripts/extract_figures.py` | caption-region · table-region → column-band → page-region | 자동 (오버레이 확인 + `--bbox` 보정) |
| Repos | `find` | in-place 후보 나열 | 자동 (큐레이션 수동) |
| Articles | `scripts/fetch_article.py` | 원본 img 다운로드 + 전체 스크린샷 + 도식 크롭 | 자동 (사용자 수동 저장도 유효) |
| Videos | `ffmpeg` | 사용자 timestamp + 키프레임 캡처 | 수동 timestamp |

상세 명령은 위 유형별 섹션의 "Step 2.5" 참조.

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

## Knowledge Compounding (지식 복리)

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
