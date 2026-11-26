# AI Wiki

AI 관련 기술자료(papers, repos, articles, reports, videos, books, lectures)를 저장·관리하는 개인 지식 베이스. [Karpathy의 LLM Wiki 패턴](https://gist.github.com/karpathy/1dd0294ef9567971c1e4348a90d69285)을 다중 자료 유형으로 확장한 구조다.

```
원본 자료 (raw/) → sources/*.md (LLM 요약) → wiki/{category}/*.md (최종 페이지)
```

**언어 정책 (Language Policy)**: `CLAUDE.md`의 지시문과 `sources/`·`wiki/`의 본문은 **한글**로 작성한다. 단, 식별자(YAML key, 카테고리명, 파일명 stem, 폴더명)와 기술 용어(RAG, Transformer, embedding, fine-tuning 등)는 **영문**으로 유지한다. 섹션 헤딩은 `## 요약`처럼 **한글 단독**으로 쓴다 (`## 요약 (Summary)` 식 영문 병기는 쓰지 않는다). 사용자와의 대화는 어느 언어로든 가능하다.

전문 용어의 canonical 표기는 도메인 용어집 `wiki/overviews/glossary-{physical-ai,agents,llms}.md`가 SSOT다. 용어집에 등재된 원어는 한글로 직역하지 않고(policy → "정책" ❌), 문서당 첫 등장 시 괄호 병기 없이 서술형 한글 풀이를 한 문장 둔다 (예: "control frequency는 로봇이 1초에 몇 번 새로운 action을 갱신하는지를 뜻한다"). 원어에는 조사를 그대로 붙인다("policy가 observation을 받아"). 용어집이 한글 canonical로 지정한 용어(임베딩, 토큰, 강화학습, 시연 데이터, 지시문 등)는 그 한글만 쓰되, 개념 번역어는 문서당 첫 등장 시 원어를 괄호 병기한다("시연 데이터(demonstration)"). 같은 문서에서 원어와 번역어를 섞어 쓰지 않는다. 준수 여부는 `scripts/lint_terms.py`가 검사한다.

---

## THE FOUR RULES (위반 금지)

이 네 가지 규칙이 시스템의 핵심이다. 환각(hallucination)을 막고 모든 주장이 추적 가능(traceable)하도록 보장한다.

1. **웹 검색 금지.** `WebSearch`, `WebFetch`로 빈틈을 메우지 않는다. 이 wiki의 존재 이유는 모든 답변이 우리가 실제로 보유한 자료에 근거한다는 점이다.
   - **예외 (자료 수집에 한함)**: 사용자가 *명시적으로* "이 URL의 본문을 `raw/articles/`에 저장해줘" 같은 자료 수집을 지시한 경우에만 원본을 가져올 수 있다. Q&A·overview 생성·wiki 갱신 등 **답변 흐름**에서는 절대 호출하지 않는다.
   - 이 예외의 승인된 수단은 **`scripts/fetch_article.py`** (또는 repo README 취득)다. `WebFetch`는 기사 수집에 쓰지 않는다. 요약기라서 원문 전문이 `raw/`에 남지 않는다.
2. **wiki를 먼저 참조한다.** `sources/`와 `wiki/`만이 진실의 원천(source of truth)이다.
   - `index.md`(약 95KB)는 통째로 Read하지 않는다. `grep`으로 키워드를 찾아 해당 줄만 본다.
3. **wiki가 충분하지 않으면 `raw/`의 원본을 다시 읽는다.** `raw/{type}/{stem}.{ext}`로 가서 더 많은 세부를 추출한 뒤 wiki를 갱신한다.
4. **wiki에 해당 주제 자료가 없으면 그렇다고 말한다.** 사용자에게 *"해당 주제에 대한 자료가 없습니다 — 원본 자료(PDF · URL · transcript 등)를 제공해 주세요"*라고 답한다. 임의로 보완하지 않는다.

이 규칙은 overview 페이지를 포함한 **모든** 응답에 적용된다: wiki에 존재하는 자료만 인용한다.

---

## Repository Structure

```
ai-wiki/
├── index.md          # 페이지 카탈로그 (grep으로만 조회)
├── raw/{type}/       # 원본 자료 (cp, never symlink). type = papers|repos|articles|reports|videos|books|lectures
│   └── {stem}-figures/   # Step 2.5 도식 아카이브 (불변 취급, repos는 없음)
├── sources/{stem}.md # 모든 자료의 LLM 요약 (flat, 한글). 이미지 임베드 ❌
├── wiki/             # 정제된 wiki 페이지 (한글), Obsidian Vault 루트
│   ├── assets/{stem}/    # curated figure 사본
│   └── {category}/       # database|llms|physical-ai|agents|evaluations|applications|etc|overviews
├── scripts/          # 수집·추출·lint 스크립트
└── site/             # 정적 사이트 빌드
```

---

## File Naming Convention

3-tier(`raw/`, `sources/`, `wiki/`)가 **동일한 stem**을 공유한다. 소문자, 특수문자 제거, 공백 → `-`, 연도 4자리.

| 유형 | stem 규칙 | 예시 |
|---|---|---|
| `papers` | `{first-author-lastname}-{year}-{first-5-title-words}` | `vaswani-2017-attention-is-all-you-need` |
| `repos` | `{org}-{repo-name}` (year 생략) | `langchain-ai-langgraph` |
| `articles` | `{author}-{year}-{first-5-title-words}` | `karpathy-2024-software-3-llms` |
| `reports` | `{org}-{year}-{first-5-title-words}` | `stanford-hai-2024-ai-index-report` |
| `videos` | `{channel}-{year}-{first-5-title-words}` | `3blue1brown-2024-but-what-is-gpt` |
| `books` | `{first-author-lastname}-{year}-{first-5-title-words}` | `raschka-2024-build-a-large-language-model` |
| `lectures` | `{instructor-or-org}-{year}-{course-name}` | `stanford-2024-cs336-llms` |

강의가 멀티파일이면 `raw/lectures/{stem}/`에, 챕터 분할 도서는 `raw/books/{stem}/ch{N}.pdf`로 묶는다.

---

## Content Types & Categories

자료 유형(`raw/` 하위 폴더)과 분류 카테고리(`wiki/` 하위 폴더)는 **독립적**이다.

| Wiki Category | 포함 내용 (예시) |
|---|---|
| `database` | Vector DB, RAG 인프라, embedding store |
| `llms` | 모델 아키텍처, pre-training, fine-tuning, foundation model |
| `physical-ai` | VLA, world model, robot learning, sim2real, 자율주행 |
| `agents` | Agentic 시스템, tool use, planning, LangGraph |
| `evaluations` | 평가 프레임워크(RAGAS, Braintrust), benchmark |
| `applications` | RAG 응용, 도메인 적용 사례, 제품 패턴 |
| `etc` | 미분류, 횡단(cross-cutting) 주제 |
| `overviews` | 다수 자료를 합성한 페이지 (지식이 계속 쌓이는 곳) |

분류 원칙: 주제가 아니라 **방법(method)** 을 기준으로 분류한다 (RAGAS로 평가한 RAG 사례 논문이면 `applications`보다 `evaluations`). "미래의 나에게 어느 카테고리에서 발견되어야 더 유용한가?"로 판단한다. 한 카테고리가 ~500개 파일을 넘으면 분할을 고려한다.

### physical-ai 분류와 태그

방법의 핵심에 물리 세계와의 상호작용(센서 입력, 액추에이터 출력, 시뮬레이터, 실체 로봇·차량)이 있으면 `physical-ai`로 보낸다. 물리 도메인을 소재로 삼되 방법이 순수 언어·검색이면 원래 카테고리를 유지한다 (RT-2, OpenVLA, Diffusion Policy → `physical-ai`, 로봇 매뉴얼 RAG 평가 → `evaluations`, 순수 VLM 아키텍처 → `llms` 유지 후 허브에서 상호 링크).

`wiki/physical-ai/` 페이지는 루트 태그 `physical-ai`와 아래에서 1~3개를 고른다. 목록에 없는 태그는 이 표에 먼저 추가한다 (표기는 하나만 허용).

| 묶음 | 태그 |
|---|---|
| 학습·제어 방법 | `vla` · `world-model` · `robot-learning` · `imitation-learning` · `rl-control` |
| 플랫폼·응용 | `manipulation` · `locomotion` · `humanoid` · `mobile-robot` · `autonomous-driving` · `drone` |
| 환경·인식 | `sim2real` · `simulator` · `3d-perception` · `spatial-reasoning` · `slam` · `teleoperation` |
| 자원·운영 | `robot-dataset` · `benchmark` · `edge-inference` · `hardware` · `safety` |

`wiki/physical-ai/`가 40페이지를 넘으면 하위 폴더 분할을 다시 검토한다.

---

## Adding New Material (6-step 파이프라인)

```
Step 1    raw/에 원본 복사
Step 2    텍스트 추출
Step 2.5  이미지 추출 → raw/{type}/{stem}-figures/      (도식 없으면 생략)
Step 3    sources/{stem}.md 작성 + figures 후보(curated: false) + "## 8. 그림 후보"
Step 3.5  사용자 confirm → 지정한 fig id만 curated: true
Step 4    wiki/{category}/{stem}.md 작성 + curated figure를 wiki/assets/{stem}/로 cp + index.md 갱신
```

담당과 정본 문서:

| 단계 | 담당 | 정본 |
|---|---|---|
| Step 1~2.5: papers, reports(PDF), books, lectures | `ingest-paper` 스킬 | 스킬 본문 |
| Step 1~2.5: articles, reports(웹) | `ingest-article` 스킬 | 스킬 본문 |
| Step 1~2.5: repos, videos | 전용 스킬 없음 | `docs/ingest-repos-videos.md` |
| Step 3~4: sources/wiki 작성 | `write-wiki` 스킬 | 스킬 본문 + `references/schema.md`(frontmatter, figures) + `references/templates.md`(본문 골격, index 문법) |

검증은 두 층이다. `.claude/hooks/wiki-lint-reminder.sh`가 저장 직후 `lint_terms.py`와 `lint_style.py`를 자동으로 돌리고, `write-wiki`의 완료 게이트가 `lint_links.py`, `lint_figures.py`, `audit_captions.py`, `lint_index.py`를 맡는다.

`index.md` 항목은 `- [[category/stem|표시 이름]]: 한 줄 설명 (YYYY, type)` 한 가지 문법만 쓴다 (200자 이내). 사이트 빌드(`site/lib/content.mjs`)와 `lint_index.py`가 이 문법에 의존하므로 바꾸면 둘을 함께 고친다.

wiki/sources 산문 문체는 `write-wiki` 스킬의 "6. wiki 교재 문체 가이드"가 정본이다. humanize 자동 윤문은 이 두 폴더에 적용하지 않는다 (사용자가 명시 요청할 때만).

---

## Raw File Management Rules

- **항상 복사(`cp`), 절대 symlink 금지.** `raw_path`는 반드시 `raw/` 내부를 가리키고, `raw_filename`은 `basename(raw_path)`와 일치해야 한다.
- frontmatter `type`(단수: paper/book/lecture)은 `raw/` 하위 폴더명(복수)과 대응해야 한다.
- 멀티파일 패키지는 `raw_path`가 디렉토리를 가리키고 `raw_filename`은 디렉토리명(`{stem}/`)이나 대표 파일명으로 적으며, 챕터 분할 도서는 source 파일별로 챕터 PDF를 가리킨다.
- `{stem}-figures/`는 raw의 일부로 불변 취급한다 (`figures.json`이 manifest). `extract_figures.py --force`는 **사람이 지시할 때만** 쓴다.

의존성은 `pyproject.toml`이 관리한다 (`uv venv .venv --python 3.12 && uv sync`). playwright는 시스템 Chrome을 쓰므로 `playwright install`이 필요 없다. videos 처리에는 `ffmpeg`가 필요하다.

---

## Knowledge Compounding

가장 가치 있는 페이지는 여러 자료를 합성하는 `wiki/overviews/` 페이지다. 좋은 답이 나오면 overview로 저장을 제안한다. wiki 열람에는 Obsidian(wiki 폴더를 Vault로)을 권장한다.

확신이 서지 않을 때는 rule #1을 따른다.
