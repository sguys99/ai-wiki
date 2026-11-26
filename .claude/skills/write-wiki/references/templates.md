# sources/wiki 작성 템플릿

write-wiki 스킬의 정본 참조. Step 3 ~ Step 4의 본문 골격, 그림 후보 표, index.md 항목 문법을 담는다 (CLAUDE.md에서 분리, 2026-11).

## Step 3 — `sources/{stem}.md` 작성

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

## Step 3.5 — 사용자 confirm

사용자가 "fig01, fig02, tab01을 wiki에 넣어줘"처럼 지정하면, 에이전트는 `sources/{stem}.md` frontmatter에서 해당 id의 `curated: true`로 변경한다 (`wiki/{category}/{stem}.md`도 동일하게).

## Step 4 — `wiki/{category}/{stem}.md` 작성 + 이미지 사본 + `index.md` 갱신

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

### wiki 산문 문체

`wiki/` 와 `sources/` 의 한글 산문 규칙은 **`write-wiki` 스킬의 "6. wiki 교재 문체 가이드"가 정본**이다. 여기서 재서술하지 않는다. 교재식 전개, 하다체, 자문자답과 화자 개입 금지, 어휘 치환표, 중간점(`·`)과 em dash(`—`) 금지, 수치 표기, 상세도 목표가 모두 그 절에 있다.

기계 검사는 `scripts/lint_style.py` 와 `scripts/lint_terms.py` 가 맡고, `.claude/hooks/wiki-lint-reminder.sh` 가 Write/Edit 저장 직후 자동으로 돌려 위반이 있을 때만 알려준다.

humanize 자동 윤문은 이 두 폴더에 적용하지 않는다 (사용자가 명시 요청할 때만). 자동 윤문이 불릿과 표를 산문으로 녹여 wiki 품질을 떨어뜨린 전례가 있다.
