# Phase 6 배치 공통 브리프 (overviews 재작성)

오케스트레이터가 subagent에게 주는 공통 지시문이다. 담당 페이지 지시는 프롬프트에 따로 온다.

## 0. 절대 규칙

1. **웹 검색 금지.** `WebSearch`, `WebFetch`를 쓰지 않는다. 근거는 저장소 안에만 있다: `wiki/`, `sources/`, `raw/`.
2. **overview는 커버 자료가 근거다.** overview에 적는 모든 주장은 커버하는 wiki 페이지나 그 sources, 필요하면 그 raw에서 확인된 것이어야 한다. 확인되지 않으면 삭제하거나 "이 저장소 자료로는 확인할 수 없다"로 한계 절에 적는다.
3. **cross-source 무출처 유입 금지.** 자료 A의 사실을 자료 B 설명에 출처 없이 섞지 않는다. 저장소 안에 근거가 있더라도 어느 자료의 것인지 문장 안 wikilink로 밝힌다.
4. `raw/` 파일은 수정하지 않는다. `index.md`도 수정하지 않는다 (오케스트레이터가 직렬로 갱신한다). git commit도 하지 않는다.
5. 커버 자료 외의 다른 wiki 페이지는 수정하지 않는다. 오류를 발견하면 고치지 말고 보고한다.

## 1. 작업 순서

1. `CLAUDE.md`의 "wiki 교재 문체 가이드"와 Step 4 골격을 읽는다.
2. 용어집 3종을 전부 읽는다 (overviews는 `applies_to`가 셋 다이다): `wiki/overviews/glossary-physical-ai.md`, `glossary-agents.md`, `glossary-llms.md`.
3. `.claude/skills/write-wiki/SKILL.md`를 읽는다.
4. 담당 overview 페이지 현재본을 읽는다.
5. **커버하는 wiki 페이지 전부를 읽는다.** Phase 2~5에서 전면 재작성되어 수치와 구조가 바뀌었다. 기존 overview의 수치, 인용, 구조 서술이 지금 wiki 페이지와 일치하는지 한 줄씩 대조한다.
6. 필요하면 해당 `sources/{stem}.md`와 `raw/`까지 내려가 확인한다.
7. 재작성하고 lint 게이트를 통과시킨다.

## 2. 무근거 주장 대조 (Phase 2~5에서 반복 검출된 유형)

overview 본문의 주장을 커버 wiki 페이지와 대조할 때 아래를 중점 점검한다.

| 유형 | 설명 |
|---|---|
| 낡은 수치 | 재작성으로 값이 바뀌었거나 출처가 다른 모델 값으로 밝혀진 수치 |
| cross-source 무출처 유입 | 자료 A의 사실을 자료 B 설명에 출처 없이 섞음 |
| 권위 주장 | "공식 구현체", "official"이 원자료에 없는데 붙임 |
| 게재 학회 주장 | arXiv 본문에 없는 학회 채택 표기 |
| hedge 소실 | 원자료의 조건과 한정을 떼고 단정으로 옮김 |
| 저자 한계로 위장된 우리 평가 | 저자가 말하지 않은 한계를 저자 주장처럼 적음 |
| 일반화 | 한 모델, 한 조건의 값을 전체 경향으로 확대 |

발견 건수와 내용을 최종 보고에 유형별로 적는다.

## 3. overview 특유의 작성 기준

- overview는 대응 `sources/{stem}.md`가 없다. 분량 1차 게이트("sources보다 길 것")는 적용되지 않는다. 대신 **합성 가치**로 판단한다: 개별 페이지를 읽어서는 얻을 수 없는 비교, 계보, 역할 분담, 합의와 불일치가 본문에 있어야 한다.
- **개별 자료 요약을 나열하지 않는다.** 자료별 요약은 해당 wiki 페이지가 담당한다. overview는 겹치는 주장, 갈리는 주장, 읽는 순서, 어디로 가야 하는지를 담는다.
- frontmatter `sources:` 키에 커버 자료의 sources 파일명을 전부 적는다 (`{stem}.md` 형식). 키가 없으면 신설한다. `source_collection: synthesis`로 둔다.
- 본문 표를 적극 쓴다. 최소 기준은 **자료 역할 대응표 1개 + 비교표 1개 이상**이다.
- `## 관련 페이지`에는 커버 자료 전부를 `[[category/stem|표시 이름]]: 역할 한 줄` 형식으로 둔다. 링크는 반드시 `category/stem` 형식이다 (bare wikilink 금지).
- `## 한계` 절에 이 overview 자체의 한계를 적는다 (커버 범위 밖, 1차 자료가 없어 한 자료에만 의존하는 부분, 자기 보고 수치 등).
- `## 핵심 용어` 표를 둔다 (3~6개).

## 4. study_path (6-1 담당 페이지만)

frontmatter에 선언하고 본문 `## 학습 경로` 절에 같은 순서를 번호 목록 wikilink로 한 번 더 적는다. 둘의 순서와 대상이 어긋나면 안 된다.

```yaml
study_path:
  - id: category/stem          # 실재하는 wiki 페이지 id. 확장자 없음
    note: "왜 여기서 읽는지 한 줄"
    prereq: ["category/stem"]  # 옵션
```

- `id`는 `site/lib/content.mjs`가 wiki 페이지로 해석한다. 오타가 있으면 빌드 콘솔 `[study]`에 미해석 참조로 찍힌다.
- 단계 수는 커버 자료 수를 넘지 않는다. 커버 밖 페이지를 단계로 넣지 않는다.
- `note`는 "이 단계에서 무엇을 얻는가"를 적는다. 자료 제목 반복이 아니다.
- 본문 `## 학습 경로`의 각 항목은 `1. [[category/stem|표시 이름]]. 설명 문장.` 형식으로 쓴다 (`wiki/overviews/physical-ai-overview.md`가 정본 예시다).

## 5. 완료 게이트 (전부 0건이어야 한다)

```bash
python3 scripts/lint_style.py wiki/overviews/{stem}.md --strict
python3 scripts/lint_terms.py wiki/overviews/{stem}.md --strict
python3 scripts/lint_links.py wiki/overviews/{stem}.md
python3 scripts/audit_captions.py wiki/overviews/{stem}.md     # figures 키가 있을 때만
```

`lint_style`은 error와 warning 둘 다 0이다 (`axis-misuse`가 warning). `lint_links`는 `bare-wikilink` warning까지 0이다.

회귀 확인 (담당 페이지 저장 후 1회):

```bash
python3 scripts/lint_style.py --category physical-ai --strict && python3 scripts/lint_terms.py --category physical-ai --strict
```

## 6. 자주 걸리는 lint 항목

- 중간점(`·`)과 em dash(`—`) 전면 금지. 제목(`title:`)도 본문도 마찬가지다. 단 `raw/` frontmatter는 불변이라 건드리지 않는다.
- 헤딩 영문 병기 금지 (`## 요약 (Summary)` ❌, `## 학습 경로` ⭕). 콜론 부제 형식도 피한다.
- `축` 오용 (warning). "세 축", "평가 축" → "세 가지", "평가 항목", "측면".
- 금지 어휘: 판, 벌, 갈래, 기둥, 돌다/돌리다, 이쪽/그쪽, 차선, 실+명사 조어(실기기, 실데이터), 무너지다, 급락하다, 파괴적이다, 버티다, 긁다, 건지다, 얹다, 끼우다, 따지다.
- 화자 개입 금지: "한 줄로 말하면", "정리하면", "표에서 읽을 수 있는 것은", "~쪽 결론은 분명하다".
- 자문자답 금지: "왜 ~일까?".
- 용어집 금지 표기 (자주 걸리는 것): `하네스` → `harness`, `백본` → `backbone`. 작업 전 용어집 3종을 읽어 확인한다.
- 큰 수는 한국식 단위 (130k ❌ → 13만 개), 수치에 단위를 붙이고 %와 %p를 구분한다.

## 7. 최종 보고 형식

오케스트레이터에게 아래를 그대로 담아 보고한다 (파일 덤프 금지).

1. **실측 전후.** 총자수, 산문 자수, 표 개수, h2/h3 개수, wikilink 개수.
2. **구조 변경.** 절 구성이 어떻게 바뀌었는지.
3. **무근거 주장 검출.** 2절 유형별 건수와 내용 (각 건에 원문 서술과 정정 내용).
4. **study_path** (해당 시). 단계 수, 각 단계 id, prereq 구조, 본문 동기화 확인 여부.
5. **lint 결과.** 5절 명령별 exit 상태와 잔여 건수.
6. **index.md 제안 문안.** `- [[overviews/{stem}|표시 이름]]: 설명 (2026, overview)` 한 줄. `- ` 포함 **200자 이내**이고 중간점과 em dash가 없어야 한다. 오케스트레이터가 그대로 붙여넣는다.
7. **용어집 등재 후보.** 원어, 제안 표기, 저장소 내 표기 실태 (Phase 7-1 소관이라 등재는 하지 않는다).
8. **다른 페이지에서 발견한 오류.** 고치지 말고 파일과 행 번호, 내용만 보고한다.
9. **사용자 확인 필요 사항.**
