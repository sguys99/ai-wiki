# frontmatter 스키마와 figure 규약

write-wiki 스킬의 정본 참조. sources/wiki frontmatter와 figure 처리 규칙을 담는다 (CLAUDE.md에서 분리, 2026-11).

## 공통 키 (모든 유형 필수)

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

## figures 키 스키마 (sources/wiki 공통, Step 2.5 이후 작성)

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

## 유형별 추가 키

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

## study_path 키 스키마 (overview 페이지, 옵션)

overview 페이지는 읽는 순서를 frontmatter로 선언할 수 있다. 사이트 빌드가 각 `id`를 wiki 페이지로 해석해 번호가 붙은 단계 목록으로 렌더한다. 해석되지 않는 참조는 빌드 콘솔에 리포트하되 빌드를 실패시키지는 않는다.

```yaml
study_path:
  - id: physical-ai/{stem}                 # "category/stem" — wiki 페이지 id
    note: "왜 여기서 읽는지 한 줄"
    prereq: ["llms/{stem}"]                # 옵션 — 먼저 읽어야 할 페이지 id 목록
```

Obsidian에서는 frontmatter가 본문에 보이지 않는다. 그래서 같은 순서를 본문 `## 학습 경로` 섹션에 `[[wikilink]]` 목록으로 한 번 더 적는다. 사람이 읽는 쪽이 본문, 기계가 읽는 쪽이 frontmatter다.

트랙이 여럿이면 `## 학습 경로` 절 안에 `### A 트랙 VLA 계보`처럼 `###` 하위 헤딩을 두고 트랙마다 번호 목록을 적는다. frontmatter `study_path`는 그중 기본 트랙 하나, 즉 절에서 첫 번째로 나오는 번호 목록과 순서와 대상이 일치해야 한다. 사이트 빌드(`site/lib/markdown.mjs`의 `spliceStudyPath`)는 절 전체가 아니라 그 첫 번호 목록 블록만 단계 컴포넌트로 교체하므로 도입 문단, 다른 트랙, 곁길 표, 꼬리 안내 문단은 웹에서도 Obsidian과 같이 보인다. 첫 목록의 항목 수와 `study_path` 단계 수가 다르면 빌드 콘솔이 `[study] WARN`으로 알린다 (빌드는 실패하지 않는다).


## figure 처리 원칙

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
