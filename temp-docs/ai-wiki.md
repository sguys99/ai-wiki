# AI Wiki: AI 기술자료를 위한 개인 지식 베이스

Claude Code(또는 OpenAI Codex)로 papers · repos · articles · reports · videos를 구조화하고 검색 가능한 wiki로 관리하는 방법론. 매일 새로운 모델·프레임워크·논문이 쏟아지는 환경에서 *복리로 쌓이는* 지식 베이스를 만들고 싶은 엔지니어·연구자를 위한 템플릿이다.

> **이것은 출발점 템플릿이다.** 카테고리·자료 유형·언어 정책을 자기 워크플로에 맞게 갈아끼우자. wiki는 *내 도메인*을 반영해야만 가치가 생긴다.

## The Four Rules — 시스템의 핵심 (The Heart of the System)

이 wiki의 존재 이유는 **환각(hallucination)을 막고 모든 답변이 실제 보유한 자료에 근거하도록** 강제하는 것이다. 이 네 가지 규칙이 없으면 wiki는 잘 차려입은 웹 검색기에 불과해진다.

1. **웹 검색 금지.** `CLAUDE.md`에서 `WebSearch`와 `WebFetch`를 명시적으로 금지한다.
2. **wiki를 먼저 참조한다.** `sources/`와 `wiki/`만이 진실의 원천(source of truth)이다.
3. **wiki가 충분하지 않으면 `raw/`의 원본을 다시 읽는다.** 더 많은 세부를 추출한 뒤 wiki를 갱신한다.
4. **wiki에 해당 자료가 없으면 그렇다고 말한다.** *"해당 주제에 대한 자료가 없습니다 — 원본 자료(PDF · URL · transcript 등)를 제공해 주세요"* 라고 답한다. 임의로 보완하지 않는다. "온라인에서 찾아보지" 않는다.

이 규칙은 overview 페이지를 포함한 **모든** 응답에 적용된다: wiki에 존재하는 자료만 인용한다.

## 개요 (The Concept)

[Karpathy의 LLM Wiki 패턴](https://gist.github.com/karpathy/1dd0294ef9567971c1e4348a90d69285)을 다중 자료 유형으로 확장한 구조다:

```
원본 자료 (raw/{papers|repos|articles|reports|videos}/)
    ↓ LLM 요약
sources/{stem}.md         (한글, 7개 표준 섹션)
    ↓ 정제 + 교차참조
wiki/{category}/{stem}.md (한글, [[wikilinks]])
    ↓ 합성
wiki/overviews/{topic}.md ← 지식이 복리로 쌓이는 곳
```

각 자료는 3-tier 파이프라인을 거친다:

1. **raw/{type}/**: 원본(immutable archive) — PDF · 레포 스냅샷 · article 본문 · report · 영상 transcript
2. **sources/**: LLM이 생성한 구조화 요약 (7개 표준 섹션)
3. **wiki/{category}/**: 교차 참조(`[[wikilinks]]`)를 가진 정제된 wiki 페이지

여러 자료를 합성하는 **overview 페이지**가 진짜 지식 복리가 일어나는 곳이다.

## 저장소 구조 (Repository Structure)

```
ai-wiki/
├── CLAUDE.md               # 4 Rules · 스키마 · 워크플로 (에이전트 운영 룰북)
├── index.md                # 페이지 카탈로그
├── raw/                    # 원본 자료 (cp, never symlink)
│   ├── papers/             # arXiv 등 논문 PDF
│   ├── repos/              # 주요 OSS 스냅샷 (langgraph, vllm, ragas 등)
│   ├── articles/           # 블로그·뉴스 (Karpathy, Lilian Weng, Sebastian Raschka 등)
│   ├── reports/            # 산업·리서치 리포트 (Stanford HAI, a16z, McKinsey 등)
│   └── videos/             # youtube 자료 (메타데이터 + transcript)
├── sources/                # LLM 요약 (flat, 한글)
│   └── {stem}.md
└── wiki/                   # 정제된 wiki 페이지 (한글)
    ├── database/           # Vector DB, RAG 인프라 (pgvector, Qdrant 등)
    ├── llms/               # 모델 아키텍처, pre-training, fine-tuning
    ├── agents/             # Agentic 시스템, tool use, planning
    ├── evaluations/        # 평가 프레임워크(RAGAS, Braintrust), benchmark
    ├── applications/       # RAG 응용, 도메인 적용 사례
    ├── etc/                # 미분류, 횡단(cross-cutting) 주제
    └── overviews/          # 합성(synthesis) 페이지
```

`raw/`의 하위 폴더(자료 유형, `type`)와 `wiki/`의 하위 폴더(분류, `category`)는 **독립적**이다. 같은 wiki 카테고리 안에 paper · repo · article이 함께 들어갈 수 있다 (예: `wiki/agents/`).

분류 원칙: **방법(method)** 을 기준으로 분류한다. RAGAS를 활용한 RAG 사례 논문이라면 `applications`보다 `evaluations`가 적절할 수 있다 — *"미래의 나에게 어느 카테고리에서 발견되어야 더 유용한가?"* 로 판단한다.

## 파일 명명 규칙 (Naming Convention)

3-tier(`raw/`, `sources/`, `wiki/`)는 **동일한 stem**을 공유한다.

공통 원칙:
- 소문자(lowercase), 특수문자 제거, 공백 → `-`
- 연도는 4자리
- consortium / 기관명 사용 가능 (예: `1000-genomes-project-2015-...`)

자료 유형별 stem 규칙:

| 유형 (type) | stem 규칙 | 예시 |
|---|---|---|
| `papers` | `{first-author-lastname}-{year}-{first-5-title-words}` | `vaswani-2017-attention-is-all-you-need` |
| `repos` | `{org}-{repo-name}` (활성 프로젝트 — year 생략) | `langchain-ai-langgraph` |
| `articles` | `{author}-{year}-{first-5-title-words}` | `karpathy-2024-software-3-llms` |
| `reports` | `{org}-{year}-{first-5-title-words}` | `stanford-hai-2024-ai-index-report` |
| `videos` | `{channel}-{year}-{first-5-title-words}` | `3blue1brown-2024-but-what-is-gpt` |

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

`wiki/{category}/{stem}.md`는 위에 더해 `source: {stem}.md` 키를 포함한다.

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

## 자료 추가하기 (Adding Material)

모든 자료는 4단계 파이프라인을 따른다. **Step 3 · Step 4는 공통**이고, Step 1(원본 수집)과 Step 2(텍스트 추출)만 유형별로 다르다.

### 공통 Step 3 — `sources/{stem}.md` 작성

frontmatter는 위 스키마를 따르고, 본문은 다음 한글 헤딩 7개로 구성한다 (영문 기술용어는 인라인 유지).

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

frontmatter에 `source: {stem}.md` 추가. 본문 헤딩 예시:

```markdown
## 요약 (Summary)
## 주요 기여 (Key Contributions)
## 방법론 및 아키텍처 (Methodology and Architecture)
## 결과 (Results)
## 관련 페이지 (Related Pages)
- [[category/page]] — 관계 설명
```

`index.md`에는 해당 카테고리 아래 한 줄 항목을 추가한다.

에이전트는 *"이 자료를 wiki에 추가해줘"* 라는 한 마디로 Step 1~4를 한 번에 수행한다.

---

### Papers (PDF)

**Step 1** — PDF를 `raw/papers/`에 복사 (symlink 금지).

**Step 2** — `pypdf`로 첫 ~15페이지, ~12,000자 추출 (LLM 요약에 충분):

```bash
pip3 install pypdf

python3 -c "
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

**Step 1** — `git clone --depth 1 <url> raw/repos/{org}-{repo}/` 으로 스냅샷을 만들거나, 핵심 문서(README · ARCHITECTURE · design docs)만 골라 복사한다.

**Step 2** — README + 디렉토리 트리 + 핵심 파일 헤더면 요약에 충분하다:

```bash
# 디렉토리 트리
find raw/repos/{org}-{repo} -type f -not -path '*/\.*' | head -50

# README 본문
cat raw/repos/{org}-{repo}/README.md
```

**비고**: `license` 키 작성 필수. 사용·인용 시 라이선스 조건을 준수한다.

### Articles

**Step 1** — 사용자가 본문을 직접 `raw/articles/{stem}.md`로 저장한다. **Rule #1(웹 검색 금지)** 에 따라 에이전트가 자동 fetch하지 않는다. 원본 URL은 frontmatter `url`에 기록한다.

**Step 2** — 저장된 `.md` 본문을 그대로 LLM 입력으로 사용한다.

### Reports

**Step 1** — PDF면 `raw/reports/`에 복사 (papers와 동일). 웹 페이지면 본문을 `.md`로 변환하여 저장한다 (변환 자체는 사용자가 수동 수행).

**Step 2** — PDF는 `pypdf`로 추출, `.md`는 그대로 사용.

### Videos

**Step 1** — youtube transcript(자막)를 사용자가 직접 `raw/videos/{stem}.md`로 저장한다. `yt-dlp` 같은 **로컬 도구**로 자막을 받는 것은 허용된다 (네트워크 fetch는 사용자가 수동 수행). 채널 · URL · duration 등 메타데이터는 frontmatter에 기록한다.

**Step 2** — transcript 본문을 그대로 LLM 입력으로 사용한다.

## Knowledge Tree Method

wiki가 실제로 자라나는 방식이다. *"논문 1,000편을 일단 다 ingest한 뒤에 검색"* 이 아니라, 진짜 질문에서 출발해 가지를 뻗어가는 방식이다.

```
Root: "RAG 시스템 평가 (RAG evaluation)"
├── 1차 wave: 직접 overview
│   ├── RAGAS 핵심 메트릭 (faithfulness, answer relevancy, context precision)
│   ├── LLM-as-judge 패턴과 한계
│   └── reference-free 평가 vs reference-based 평가
├── 2차 wave: 1차에서 파생된 깊은 가지
│   ├── RAG production observability (Braintrust, Phoenix 등)
│   └── retrieval 품질이 generation에 미치는 영향
└── 3차 wave: 횡단(cross-cutting) 주제
    ├── 평가-튜닝 피드백 루프
    └── eval set 큐레이션과 데이터 신선도
```

실제 흐름:

1. **질문한다** → 에이전트가 wiki를 검색 → 기존 자료로 답한다
2. **wiki가 충분하지 않으면** → 에이전트가 `raw/`의 원본을 다시 읽고(rule #3) → wiki를 갱신한다
3. **wiki에 자료가 없으면** → 에이전트가 그렇다고 말하고(rule #4) → 사용자가 원본을 제공한다
4. **좋은 답이 나오면 overview 페이지로 저장** — *"이걸 `wiki/overviews/`에 overview로 저장해줘"*

한 세션은 5–15개의 새 wiki 페이지 또는 갱신을 만들어야 한다. 시간이 흐르면 wiki는 검색 가능하고 상호 참조되는(`[[wikilinks]]`) 지식 그래프가 되어, 이후 대화는 그 위에서 점점 더 빨라진다.

## 확장 시점 (When to Scale Up)

필요해지기 전까지는 미루자. 두 가지 신호:

- **한 카테고리가 ~500개 파일을 넘어서면** → 분할한다. 분할 축은 *"X에 대해 읽고 싶을 때, 무엇을 일부러 제외하고 싶은가?"* 로 정한다.
- **전체 wiki가 ~500페이지를 넘어서면** → [QMD](https://qmd.ai)를 Claude Code MCP 서버로 설치한다. BM25 + semantic + LLM re-ranking 하이브리드, 완전 on-device. 그 규모가 되면 plain `grep`은 카테고리를 가로지르는 overview를 놓치기 시작한다.

이 임계 이하에서는 `index.md` + 에이전트 내장 검색이면 충분하다.

## CLAUDE.md의 핵심 규칙

상단 **The Four Rules**는 절대 양보 불가. 그 외 운영에서 자연스럽게 굳어진 규칙들:

```markdown
# 모든 wiki 본문은 한글 (RAG-friendly; 대화는 어떤 언어든 가능)
# 식별자(YAML key, 카테고리명, 파일명 stem, 폴더명)는 영문
# 기술 용어(RAG, Transformer, embedding, fine-tuning 등)는 영문 인라인
# raw/는 항상 cp, 절대 symlink 금지
# raw_path는 raw/ 내부를 가리키고, raw_filename은 basename과 일치
# type 키는 raw/의 하위 폴더명과 정확히 일치 (paper ↔ raw/papers/)
# 한 카테고리가 ~500개를 넘으면 분할 제안
# 분류는 주제(topic)가 아니라 방법(method) 기준
```

자세한 내용은 저장소의 `CLAUDE.md`를 참고하자 — 이 문서가 *왜·무엇을* 설명한다면, `CLAUDE.md`는 에이전트가 매 대화에서 따르는 *어떻게* 의 룰북이다.

## 시작하기 (Getting Started)

Claude Code와 Codex는 Mac · Linux · **Windows**(WSL2 불필요) 네이티브 인스톨러를 제공한다. 부트스트랩은 에이전트에게 맡기자.

1. **설치** — Claude Code 또는 Codex를 머신에 설치.
2. **저장소를 연다** — 이 저장소(`CLAUDE.md`가 이미 존재)에서 에이전트를 띄운다.
3. **다음 프롬프트를 붙여넣는다**:

   > 이 저장소의 `temp-docs/ai-wiki.md`와 `CLAUDE.md`를 읽고 다음을 수행해줘:
   > - `raw/{papers,repos,articles,reports,videos}/` 폴더 생성
   > - `wiki/{database,llms,agents,evaluations,applications,etc,overviews}/` 폴더 생성
   > - 비어 있는 `index.md` 카탈로그 초기화 (카테고리별 섹션 헤딩만)
   > - `pypdf`가 설치되어 있지 않으면 `pip3 install pypdf`
   > - The Four Rules는 verbatim 적용 — `WebSearch`/`WebFetch` 금지

4. **첫 자료 5–10개를 떨어뜨리고** *"이 자료들을 wiki에 추가해줘"* 라고 시킨다.
5. **질문한다.** 좋은 답에서 overview 페이지를 만든다.
6. **~500페이지를 넘기면 QMD를 추가한다.**

새로운 자료가 추가될수록 기존 자료와 `[[wikilinks]]` · overview 페이지를 통해 연결되며, wiki의 가치는 누적된다.

## Obsidian 권장 (Browsing with Obsidian)

에이전트는 ingest와 Q&A를 담당하지만, **읽고 탐색**할 때는 [Obsidian](https://obsidian.md/)이 최고의 동반자다. 무료 로컬 마크다운 에디터로 `[[wikilinks]]`, graph view, full-text search를 기본 지원한다.

1. [https://obsidian.md/](https://obsidian.md/) 에서 설치 (Mac · Windows · Linux 네이티브).
2. wiki 폴더를 **Obsidian Vault**로 연다 (`File → Open Vault as Folder`).
3. 얻는 것:
   - `[[wikilinks]]` 기반 그래프 뷰
   - 클릭으로 이동하는 교차 참조
   - 모든 wiki 페이지의 outline 뷰
   - Full-text 검색 + 태그 검색

시각적 탐색은 Obsidian, ingest · 질문 · overview 생성은 에이전트 — 두 도구는 깔끔하게 분업된다 (Obsidian은 파일을 읽기만 하므로 에이전트가 유지하는 구조와 충돌하지 않는다).

---

*Built with [Claude Code](https://claude.com/claude-code) (Anthropic) + [Codex](https://github.com/openai/codex) (OpenAI). Browsing with [Obsidian](https://obsidian.md/). Search with [QMD](https://qmd.ai). Karpathy의 원본 아이디어: [@karpathy/1dd0294ef9567971c1e4348a90d69285](https://gist.github.com/karpathy/1dd0294ef9567971c1e4348a90d69285).*
