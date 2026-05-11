# AI Wiki

AI 관련 기술자료(papers, repos, articles, reports, videos)를 저장·관리하는 개인 지식 베이스. [Karpathy의 LLM Wiki 패턴](https://gist.github.com/karpathy/1dd0294ef9567971c1e4348a90d69285)을 다중 자료 유형으로 확장한 구조다.

```
원본 자료 (raw/) → sources/*.md (LLM 요약) → wiki/{category}/*.md (최종 페이지)
```

**언어 정책 (Language Policy)**: `CLAUDE.md`의 지시문과 `sources/`·`wiki/`의 본문은 **한글**로 작성한다. 단, 식별자(YAML key, 카테고리명, 파일명 stem, 폴더명)와 기술 용어(RAG, Transformer, embedding, fine-tuning 등)는 **영문**으로 유지한다. 섹션 헤딩은 `## 요약 (Summary)` 형식으로 한글 + 영문 병기를 권장한다. 사용자와의 대화는 어느 언어로든 가능하다.

---

## THE FOUR RULES (위반 금지)

이 네 가지 규칙이 시스템의 핵심이다. 환각(hallucination)을 막고 모든 주장이 추적 가능(traceable)하도록 보장한다.

1. **웹 검색 금지.** `WebSearch`, `WebFetch`로 빈틈을 메우지 않는다. 이 wiki의 존재 이유는 모든 답변이 우리가 실제로 보유한 자료에 근거한다는 점이다.
   - **예외 (자료 수집에 한함)**: 사용자가 *명시적으로* "이 URL의 본문을 `raw/articles/`에 저장해줘" 같은 자료 수집을 지시한 경우에만 `WebFetch`를 사용해 원본을 가져올 수 있다. Q&A·overview 생성·wiki 갱신 등 **답변 흐름**에서는 절대 호출하지 않는다.
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
│   ├── repos/              # 주요 OSS 스냅샷 (langgraph, vllm, ragas 등)
│   ├── articles/           # 블로그·뉴스 (Karpathy, Lilian Weng, Sebastian Raschka 등)
│   ├── reports/            # 산업/리서치 리포트 (Stanford HAI, a16z, McKinsey 등)
│   └── videos/             # youtube 자료 (메타데이터 + transcript)
├── sources/                # 모든 자료의 LLM 요약 (flat, 한글)
│   └── {stem}.md
└── wiki/                   # 정제된 wiki 페이지 (한글)
    ├── database/
    ├── llms/
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

---

## Content Types & Categories

자료 유형(`raw/`의 하위 폴더)과 분류 카테고리(`wiki/`의 하위 폴더)는 **독립적**이다. 동일한 wiki 카테고리 안에 여러 유형의 자료가 공존할 수 있다 (예: `wiki/agents/`에 논문·레포·블로그가 함께 들어갈 수 있다).

| Wiki Category | 포함 내용 (예시) |
|---|---|
| `database` | Vector DB, RAG 인프라, embedding store (pgvector, Qdrant, Weaviate 등) |
| `llms` | 모델 아키텍처, pre-training, fine-tuning, foundation model 논문 |
| `agents` | Agentic 시스템, tool use, planning, LangGraph 등 |
| `evaluations` | 평가 프레임워크(RAGAS, Braintrust), benchmark |
| `applications` | RAG 응용, 도메인 적용 사례, 제품 패턴 |
| `etc` | 미분류, 횡단(cross-cutting) 주제 |
| `overviews` | 다수 자료를 합성한 페이지 (지식이 복리로 쌓이는 곳) |

분류 원칙: **방법(method)** 을 기준으로 분류한다. 평가지표(RAGAS)를 활용한 RAG 사례 논문이라면 `applications`보다 `evaluations`로 가는 게 적절할 수 있다 — "미래의 나에게 어느 카테고리에서 발견되어야 더 유용한가?"로 판단한다.

한 카테고리가 ~500개 파일을 넘어서면 분할을 고려한다.

---

## YAML Frontmatter Schema

### 공통 키 (모든 유형 필수)

```yaml
title: "..."                           # 원어 그대로 (영문 자료는 영문)
type: paper | repo | article | report | video
year: YYYY
category: database | llms | agents | evaluations | applications | etc
raw_path: /full/path/to/raw/{type}/{stem}.{ext}
raw_filename: "{stem}.{ext}"
source_collection: external
tags: []
```

`wiki/{category}/{stem}.md` 파일은 위에 더해 `source: {stem}.md` 키를 포함한다.

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
```

---

## Adding New Material (유형별 4-step)

모든 자료는 4단계 파이프라인을 따른다. **Step 3·Step 4는 공통**이고, Step 1(원본 수집)과 Step 2(텍스트 추출)만 유형별로 다르다.

### 공통 Step 3 — `sources/{stem}.md` 작성

front-matter는 위 스키마를 따르고, 본문은 다음 한글 헤딩 7개로 구성한다 (영문 기술용어는 인라인 유지).

```markdown
## 한 줄 요약 (One-line Summary)
## 1. 자료 정보 (Document Information)
## 2. 주요 기여 (Key Contributions)
## 3. 방법론 및 아키텍처 (Methodology and Architecture)
## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)
## 5. 한계와 향후 과제 (Limitations and Future Work)
## 6. 관련 연구 (Related Work)
## 7. 용어집 (Glossary)
```

### 공통 Step 4 — `wiki/{category}/{stem}.md` 작성 + `index.md` 갱신

front-matter에 `source: {stem}.md` 추가. 본문 헤딩 예시:

```markdown
## 요약 (Summary)
## 주요 기여 (Key Contributions)
## 방법론 및 아키텍처 (Methodology and Architecture)
## 결과 (Results)
## 관련 페이지 (Related Pages)
- [[category/page]] — 관계 설명
```

`index.md`에는 해당 카테고리 아래 한 줄 항목을 추가한다.

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

### Repos

**Step 1** — `git clone --depth 1 <url> raw/repos/{org}-{repo}/` 으로 스냅샷을 만들거나, 핵심 문서(README, ARCHITECTURE, design docs)만 골라 복사한다.

**Step 2** — README + 디렉토리 트리 + 핵심 파일 헤더 정도면 요약에 충분하다:

```bash
# 디렉토리 트리
find raw/repos/{org}-{repo} -type f -not -path '*/\.*' | head -50

# README 본문
cat raw/repos/{org}-{repo}/README.md
```

**비고**: `license` 키 작성 필수. 사용/인용 시 라이선스 조건 준수.

### Articles

**Step 1** — 사용자가 본문을 직접 `raw/articles/{stem}.md`로 저장한다. **rule #1(웹 검색 금지)** 에 따라 에이전트가 자동으로 fetch하지 않는다. 원본 URL은 frontmatter `url`에 기록한다.

**Step 2** — 저장된 `.md` 본문을 그대로 LLM 입력으로 사용한다.

### Reports

**Step 1** — PDF면 `raw/reports/`에 복사(papers와 동일). 웹 페이지면 본문을 `.md`로 변환하여 저장한다.

**Step 2** — PDF는 `pypdf`로 추출, `.md`는 그대로 사용.

### Videos

**Step 1** — youtube transcript(자막)를 사용자가 직접 `raw/videos/{stem}.md`로 저장한다. `yt-dlp` 등 **로컬 도구**로 자막을 받는 것은 허용된다 (네트워크 fetch는 사용자가 수동 수행). 채널·URL·duration 등 메타데이터는 frontmatter에 기록한다.

**Step 2** — transcript 본문을 그대로 LLM 입력으로 사용한다.

---

## Raw File Management Rules

- **항상 복사(`cp`), 절대 symlink 금지.** 외부 위치에서 `raw/` 안으로 실파일을 옮긴다.
- `raw_path`는 반드시 `raw/` 내부를 가리킨다. `~/Downloads/` 등 외부 경로는 금지.
- `raw_filename`은 `basename(raw_path)`와 정확히 일치해야 한다.
- `type` 키는 `raw/`의 하위 폴더명과 정확히 일치해야 한다 (예: `type: paper` ↔ `raw/papers/`).

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
