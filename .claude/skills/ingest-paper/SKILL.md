---
name: ingest-paper
version: "1.0.0"
description: PDF 논문·리포트·도서·강의 슬라이드에서 본문과 figure·table 도식을 raw/ 에 수집하는 스킬 (CLAUDE.md Papers/Reports/Books/Lectures Step 2 ~ 2.5). 트리거 — "이 논문 ingest", "PDF 도식 뽑아줘", "figure 추출해줘", "이 논문 wiki에 넣어줘", "표도 잘라줘", "도식 다시 잘라줘", "크롭이 이상해". 페이지를 통째로 렌더하지 않고 캡션을 앵커로 도식 영역만 자른다. 웹 기사·블로그 URL 수집은 해당 없음 — `ingest-article` 을 쓸 것. 유튜브 자막·GitHub README 는 CLAUDE.md 의 videos/repos 절차를 따를 것.
---

# Paper Ingest — PDF → raw/{type}/

`scripts/extract_figures.py` 를 감싸는 얇은 래퍼다. 검출 로직은 전부 스크립트에 있고, 이 문서는 **repo 규약과 확인 절차**만 다룬다.

## 이 스킬이 담당하는 범위

CLAUDE.md 의 PDF 계열 파이프라인 중 **Step 2 ~ Step 2.5 까지만**이다. Step 1(파일을 `raw/{type}/` 로 복사)은 사람이 한다.

```
Step 1    raw/{type}/{stem}.pdf        ← 사람이 cp
Step 2    pypdf 로 본문 추출            ← 여기
Step 2.5  {stem}-figures/ + figures.json ← 여기
──────────────────────────────────────
Step 3    sources/{stem}.md            ← 기존 대화형 흐름
Step 3.5  사용자 confirm → curated: true
Step 4    wiki/{category}/{stem}.md + index.md
```

스크립트는 `sources/`·`wiki/`·`index.md` 를 건드리지 않고 git commit 도 하지 않는다.

## 왜 페이지 통째가 아닌가

예전 파이프라인은 캡션이 발견된 **페이지 전체**를 200 DPI 로 렌더했다. 그래서 Obsidian 에서 "논문 도식"이라고 열면 A4 스캔 한 장이 떴다. 게다가 dedupe 키가 `(페이지, 그림번호)` 라 한 페이지가 여러 번 저장됐고(195장 중 39장이 바이트 동일), 캡션 정규식이 본문 속 "Figure 2. The model is able to…" 같은 문장까지 잡아 id 와 실제 그림 번호가 어긋났다.

지금은 캡션을 앵커로 삼아 인접 영역만 자른다. pdffigures2 와 같은 발상인데, JVM 없이 `pymupdf` 만으로 돌아간다.

## 사용법

```bash
# 1단계 — 검출표만 보고 (파일을 쓰지 않는다)
.venv/bin/python scripts/extract_figures.py <stem> --dry-run

# 2단계 — 실제 추출
.venv/bin/python scripts/extract_figures.py <stem>
```

`--dry-run` 을 먼저 도는 이유는 검출 개수와 면적비가 논문의 실제 그림·표 개수와 맞는지 눈으로 확인하기 위해서다. 개수가 크게 어긋나면 캡션 형식이 특이한 문서다.

주요 옵션:

| 옵션 | 뜻 |
|---|---|
| `--type` | `papers`(기본) · `reports` · `books` · `lectures` |
| `--dry-run` | 검출표만 출력하고 파일은 안 쓴다 |
| `--force` | 기존 `-figures/` 를 덮어쓴다. 없으면 중단한다 |
| `--bbox ID=PAGE:x0,y0,x1,y1` | 수동 크롭. 0~1 정규화 좌표. 반복 지정 가능 |
| `--overlay-only` | 오버레이만 다시 만든다 |
| `--page-shots` | 검출된 페이지의 전면 렌더도 `page-pNN.png` 로 남긴다 |
| `--dpi` | 크롭 해상도 (기본 300) |

## id 는 논문 라벨과 같다

`fig03` 은 논문의 Figure 3 이고 `tab02` 는 Table 2 다. IEEE 식 로마 숫자(Table IV)도 `tab04` 로 정규화한다. 부록 번호(Figure A1)는 `figa1` 로 남는다.

예전에는 id 가 검출 순번이라 사람이 캡션에 `(paper Figure 3)` 을 병기하고 sources 표에 `대응` 열을 붙여 보정해야 했다. **이제 그 수작업은 하지 않는다.**

## 폴백 사다리

캡션마다 아래 순서로 내려가고, 어디서 나왔는지는 `strategy` 에 남는다.

| strategy | 뜻 | 신뢰도 |
|---|---|---|
| `caption-region` | 캡션에서 바깥으로 자라며 여백에서 멈춰 그래픽을 감쌌다 | 높음 |
| `table-region` | 가로 괘선 뭉치 → `find_tables()` → 캡션에 붙은 텍스트 덩어리 | 높음 |
| `column-band` | 그래픽을 못 찾아 캡션 위 여백 밴드를 통째로 잡았다 | **확인 필요** |
| `page-region` | 전부 실패 — 페이지 전체 | **확인 필요** |
| `manual` | `--bbox` 로 사람이 지정했다 | — |

## 추출 후 반드시 할 것 — 오버레이 확인

`{stem}-figures/_overlay/pNN.png` 는 검출 영역을 빨간 사각형, 캡션을 파란 사각형으로 표시한 페이지 렌더다. **Read 도구로 열어 눈으로 확인하고 사용자에게 보고한다.**

스크립트가 마지막에 `⚠ 확인 필요: ...` 로 의심 항목을 짚어준다. 그것부터 본다. 틀린 것만 다시 자른다.

```bash
.venv/bin/python scripts/extract_figures.py <stem> --force \
    --bbox fig03=4:0.10,0.28,0.90,0.62 \
    --bbox tab02=7:0.12,0.55,0.88,0.74
```

좌표는 페이지 왼쪽 위가 `(0,0)`, 오른쪽 아래가 `(1,1)` 이다. 오버레이 PNG 에서 대략의 비율을 읽어 넣으면 된다. `--bbox` 의 id 가 검출 목록에 없으면 새 항목으로 추가되므로, 스크립트가 아예 놓친 도식도 이 경로로 넣는다.

오버레이는 `.gitignore` 로 추적에서 빠져 있다. 지워도 `--overlay-only` 로 다시 만든다.

## 캡션을 못 찾는 자료

`"✗ 캡션을 하나도 못 찾았다"` 로 멈추면 그 문서에는 `Figure N` 꼴 캡션이 없다는 뜻이다. 슬라이드 덱, 한글 제품 소개서, 스캔 PDF 가 여기 해당한다. 억지로 정규식을 넓히지 말고 둘 중 하나로 간다.

- 필요한 도식의 위치를 `--bbox` 로 직접 지정한다
- 사용자에게 PNG 수동 저장을 요청한다 (`strategy: manual`)

## 수집 후 인계

스크립트가 마지막에 `## 8. 그림 후보` 표 초안을 출력한다. 이걸 `sources/{stem}.md` 로 옮기되, **캡션은 실제 이미지를 보고 한글로 다시 쓴다** — 스크립트가 넣는 캡션은 논문 원문 영어 그대로다.

Step 2(본문 추출)는 CLAUDE.md 의 `pypdf` 스니펫을 그대로 쓴다. 첫 ~15페이지, ~12,000자면 요약에 충분하다.

## 건드리면 안 되는 것

- **`raw/` 의 PDF 는 수정하지 않는다.** 오버레이도 메모리상에서만 그리고 원본에 저장하지 않는다.
- **`--force` 는 사람이 지시할 때만.** 기존 `-figures/` 를 통째로 지우고 다시 만든다.
- **git commit·push 하지 않는다.** 사용자가 명시적으로 지시할 때만.
- **`sources/`·`wiki/`·`index.md` 는 Step 3 부터.** 이 스킬의 범위 밖이다.

## 기존 자료를 옮길 때

`scripts/remap_figures.py` 는 2026-08 정밀 크롭 전환에 쓴 일회성 마이그레이션 도구다. 기존 stem 을 재추출하면서 사람이 쓴 한글 캡션과 `curated` 플래그를 새 id 로 옮긴다. 평상시 ingest 에는 쓰지 않는다.
