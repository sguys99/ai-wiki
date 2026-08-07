---
name: ingest-article
version: "1.0.0"
description: URL 하나로 웹 기사·블로그·LinkedIn/X 포스트의 본문 전문과 이미지를 raw/articles/ 에 수집하는 스킬 (CLAUDE.md Articles Step 1 ~ 2.5). 트리거 — "이 URL 기사로 수집해줘", "이 링크 wiki에 넣어줘", "이 주소 ingest", "기사 가져와서 wiki 작성", "이 글 raw에 저장해줘", "URL 넣으면 기사랑 이미지 캡처해줘". WebFetch 로는 원문 전문이 남지 않으므로(요약기라서) 기사 수집에는 항상 이 스킬을 쓴다. PDF 논문·리포트·도서·강의 슬라이드는 해당 없음 — `ingest-paper` 를 쓸 것. 유튜브 자막·GitHub README 는 CLAUDE.md 의 videos/repos 절차를 따를 것.
---

# Article Ingest — URL → raw/articles/

`scripts/fetch_article.py` 를 감싸는 얇은 래퍼다. 추출 로직은 전부 스크립트에 있고, 이 문서는 **repo 규약과 인계 방식**만 다룬다.

## 이 스킬이 담당하는 범위

CLAUDE.md 의 Articles 파이프라인 중 **Step 1 ~ Step 2.5 까지만**이다.

```
Step 1    raw/articles/{stem}.md      ← 여기
Step 2    본문을 LLM 입력으로 사용      ← 여기
Step 2.5  {stem}-figures/ + figures.json ← 여기
──────────────────────────────────────
Step 3    sources/{stem}.md            ← 기존 대화형 흐름
Step 3.5  사용자 confirm → curated: true
Step 4    wiki/{category}/{stem}.md + index.md
```

스크립트는 `sources/`·`wiki/`·`index.md` 를 건드리지 않고 git commit 도 하지 않는다. Step 3 부터는 사람이 개입하는 기존 절차 그대로다.

## 왜 WebFetch 를 쓰지 않는가

`WebFetch` 는 추출기가 아니라 **요약기**다. 페이지를 가져와 작은 모델에 태운 뒤 그 모델의 답변을 돌려준다. 성공한 경우에도 원문 전문은 남지 않는다. `raw/` 가 "원본 그대로의 불변 아카이브"여야 한다는 3-tier 전제와 어긋난다. 기사 수집에는 쓰지 않는다.

## 사용법

```bash
# 1단계 — stem 제안 받기 (파일을 쓰지 않는다)
.venv/bin/python scripts/fetch_article.py "<URL>" --dry-run

# 2단계 — stem 을 확정해 실제 수집
.venv/bin/python scripts/fetch_article.py "<URL>" \
    --stem <stem> --author "<저자>" --category <category> --crop
```

`--stem` 없이 부르면 제안만 출력하고 멈춘다. 오분류를 막기 위한 의도적 설계다.

주요 옵션:

| 옵션 | 뜻 |
|---|---|
| `--stem` | 파일명 stem. 없으면 제안 후 종료 |
| `--author` | frontmatter `author`. 생략 시 도메인명 |
| `--year` | 생략 시 페이지 발행일에서 추론 |
| `--category` | Step 3 에서 확정 — 임시값 `etc` |
| `--crop` | 도식 영역별 크롭 추가 |
| `--shot none` | 전체 페이지 스크린샷 생략 |
| `--profile` | 본인 Chrome 로그인 세션 사용 (아래 참고) |
| `--tier` | 사다리 건너뛰고 특정 tier 강제 |
| `--dry-run` | 파일 안 쓰고 결과만 확인 |

## 추출 사다리

무료부터 내려가고, 실패한 tier 는 자동으로 다음으로 넘어간다. 어느 tier 에서 성공했는지는 frontmatter `extractor_tier` 에 남는다.

| tier | 수단 | 비고 |
|---|---|---|
| `jina` | r.jina.ai | 키 불필요. **무료 티어라 자주 429/403 이 난다** — 그때는 자동으로 chrome 으로 내려간다 |
| `chrome` | 로컬 Chrome (익명) | x.com·JS SPA·Cloudflare 경증. 기본 폴백 |
| `profile` | 로컬 Chrome (로그인) | `--profile` 을 직접 줄 때만 |
| `firecrawl` | Firecrawl API | `FIRECRAWL_API_KEY` 가 있을 때만 |

실패 판정 기준은 본문 1,200자 미만이거나 차단 시그니처(`Just a moment`, `Anonymous access ... blocked` 등) 검출이다.

**막혔을 때 순서**: 먼저 `--tier chrome` 을 명시해 재시도 → 그래도 안 되면 `--profile` → 그래도 안 되면 사용자에게 본문 수동 저장을 요청한다. Firecrawl 은 키가 있을 때만 거론한다.

### `--profile` 사용 시 주의

사용자의 실제 Chrome 로그인 세션이 필요한 경우(멤버 전용 Medium, 비공개 LinkedIn 등)에만 쓴다. **기본값은 꺼져 있고, 사용자가 명시적으로 요청할 때만 붙인다.** 스크립트는 프로필 원본을 잠그지 않도록 쿠키·로그인 정보를 임시 디렉터리로 복사해 쓰며, 자격증명을 외부로 전송하지 않는다.

## 수집 후 인계

스크립트가 마지막에 `## 8. 그림 후보` 표 초안을 출력한다. 이걸 그대로 `sources/{stem}.md` 에 옮기되, **캡션과 추천 마크는 실제 이미지를 보고 다시 쓴다** — 스크립트가 넣는 캡션은 alt 텍스트라 대개 부실하다.

`figures.json` 이 `{stem}-figures/` 에 함께 생성된다. article 경로에서 이 매니페스트가 생기는 건 이번이 처음이므로, 기존 자료에는 없다는 점을 감안한다.

## 수집 후 반드시 확인할 것

- **`category`** — 스크립트는 `etc` 를 임시로 넣는다. Step 3 에서 CLAUDE.md 의 분류 원칙(주제가 아니라 **방법** 기준)에 따라 확정한다.
- **`title`** — 사이트명 꼬리를 떼어내지만 완벽하지 않다. 원문과 대조한다.
- **`author`** — 도메인명이 그대로 들어갔으면 실제 저자로 고친다.
- **본문 앞뒤 잡음** — 렌더 방식에 따라 네비게이션·쿠키 배너가 섞일 수 있다. 명백한 잡음만 지우고 **본문은 손대지 않는다**.
- **이미지 누락** — 원본 이미지가 안 잡혔으면 `page-full.png` 나 `--crop` 산출물로 보완하거나, 사용자에게 수동 저장을 요청한다.

## 건드리면 안 되는 것

- **본문은 원문 그대로 둔다.** 요약·번역·윤문 금지. `raw/` 는 불변 아카이브다. (humanize 훅은 `Write`/`Edit` 도구에만 걸리고 스크립트는 Bash 로 쓰므로 발동하지 않는다 — 의도된 동작이다.)
- **git commit·push 하지 않는다.** 사용자가 명시적으로 지시할 때만.
- **기존 `{stem}.md` 를 덮어쓰지 않는다.** 스크립트가 존재를 감지하면 중단한다.
