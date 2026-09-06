# 콘텐츠 품질 확산 계획 (physical-ai 밖 전 카테고리)

작성일: 2026-09-06. 이 문서는 `temp-docs/ingest-upgrade-plan.md`의 "5. 후속 과제"를 실행 가능한 단계별 계획으로 구체화한 것이다. physical-ai 계획서와 같은 방식으로, 각 항목의 체크박스를 작업 완료 시점에 갱신하고 완료 시 실측 수치를 항목 서술에 병기한다.

## 1. 목적과 범위

physical-ai 카테고리는 ingest-upgrade-plan.md의 Phase 1~5로 wiki 76편과 대응 sources 77편이 교재식 기술문서체 기준(lint 0건, 압축비 1.95, 표 편당 9.7개)에 도달했다. 이 계획은 같은 기준을 나머지 카테고리로 확산한다.

작업 범위는 다음과 같다.

- 비-physical-ai wiki 135편(agents 61, applications 32, database 25, llms 10, evaluations 5, etc 2)의 전면 재작성과 같은 stem sources의 문체 정비 동반
- 고아 sources 5편(wiki 페이지 없는 sources)의 wiki 신규 작성
- overviews 9편(physical-ai-overview 제외) 재작성과 study_path 신설
- index.md 잔여 7개 절 축소 (200자 초과 101개 항목)
- figures caption 정비 670건 (배치별 동반 처리)
- frontmatter 100줄 초과 18편의 curated 축소
- 선행 도구 정비: lint_style.py 병기 헤딩 사각지대 수정, 용어집 3차 갱신, write-wiki 스킬 정합, lint 스크립트 `--category` 인자

## 2. 착수 기준선 (2026-09-06 Phase 0-2 재실측 확정)

2026-09-06 Phase 0-2 재실측 확정. 아래 수치는 Phase 0-1의 bilingual-heading 검출 수정과 Phase 0-5의 `--category` 인자가 반영된 스크립트로 다시 잰 값이고, 이후 각 배치 완료 게이트가 대조할 기준이다.

측정 정의는 `temp-docs/ingest-upgrade-plan.md` 5절 "측정 방법 주석"을 승계하고, 그 문서에 없던 항목은 여기서 새로 확정한다.

| 지표 | 정의 |
|---|---|
| 본문 글자 수 | frontmatter 종료 구분선 다음 줄부터 파일 끝까지, 마크업과 개행을 포함한 원문 문자 수 (5절 주석 4항 승계) |
| 압축비 | wiki 본문 글자 수를 같은 stem sources 본문 글자 수로 나눈 값 |
| 중앙값 | `statistics.median`. 표본이 짝수면 가운데 두 값의 평균 |
| 표 개수 | 본문 마크다운 표의 헤더 구분행 수. 코드 펜스 안은 제외 |
| 산문 글자 수 | 본문에서 표 줄, 이미지 임베드 줄, 캡션 줄, 코드 펜스를 뺀 문자 수 |
| index.md 항목 길이 | 불릿 한 줄의 `- ` 접두를 포함한 문자 수 |
| lint 건수 | 라인 단위 검출 건수. 한 줄에 규칙이 여럿 걸리면 각각 1건으로 센다 |

세 정의는 완료된 physical-ai 값으로 역검증했다. 표 개수 정의로 `wiki/physical-ai/` 76편을 세면 737개, 편당 9.70개가 나와 ingest-upgrade-plan.md의 9.7개와 일치한다. 본문 글자 수 정의로는 `brohan-2022-rt-1-robotics-transformer-for-real-world`의 wiki 9,602자와 sources 9,778자가 그대로 재현된다. index.md 항목 길이 정의로는 정비를 마친 Physical AI 절 76항목의 최댓값이 정확히 200자다.

### 2-1. lint 기준선 (확정)

수정된 lint 기준으로 저장소 전체는 lint_style error 9,202건, warning 212건이고 위반 파일은 284개다. 5-A가 기록한 error 8,313건과의 차이 889건은 전부 bilingual-heading 검출 수정분이다. warning 212건은 변동이 없다.

5-A의 "285개 파일"은 실측 284개다. Phase 0-1 이전 버전 스크립트를 현재 트리에 그대로 실행해도 284개가 나오므로, 검출 수정의 영향이 아니라 5-A의 기록 오차다.

lint_terms는 117건으로 5-A와 같다.

**표 1. 카테고리별 lint_style (rule 단위)**

| 카테고리 | middot | emdash | bilingual-heading | self-qa | speaker-intrusion | banned-vocab | k-number | connective-comma | no-table | error | warning | 계 | 위반 파일 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| agents | 1,733 | 1,473 | 358 | 2 | 3 | 52 | 31 | 1 | 5 | 3,569 | 89 | 3,658 | 126 |
| applications | 833 | 1,360 | 206 | 0 | 1 | 38 | 22 | 2 | 0 | 2,400 | 62 | 2,462 | 66 |
| database | 749 | 917 | 160 | 0 | 4 | 2 | 14 | 0 | 1 | 1,830 | 17 | 1,847 | 51 |
| llms | 262 | 130 | 62 | 1 | 0 | 8 | 4 | 0 | 6 | 455 | 18 | 473 | 21 |
| overviews | 158 | 197 | 68 | 0 | 1 | 7 | 4 | 0 | 0 | 424 | 11 | 435 | 10 |
| etc | 134 | 128 | 16 | 0 | 0 | 0 | 0 | 0 | 0 | 278 | 0 | 278 | 5 |
| evaluations | 135 | 75 | 36 | 0 | 0 | 13 | 0 | 0 | 2 | 246 | 15 | 261 | 11 |
| physical-ai | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| **합계** | **4,004** | **4,280** | **906** | **3** | **9** | **120** | **75** | **3** | **14** | **9,202** | **212** | **9,414** | **284** |

8개 카테고리의 rule별 합계는 `--all` 결과와 전 항목 일치한다. 위반 파일 열만 단순 합이 290개로 6개 많은데, index.md가 physical-ai를 뺀 7개 절에 각각 잡혀 중복 계상되기 때문이다. 실제 고유 파일은 284개다.

emdash 4,280건과 middot 4,004건이 error의 90.0%다. 재작성 판단이 필요한 것은 bilingual-heading 906건, speaker-intrusion 9건, self-qa 3건과 warning 212건이다.

**표 2. 카테고리별 lint_terms**

| 카테고리 | 경고 | 위반 파일 | sources : wiki | 상위 위반 용어 |
|---|---|---|---|---|
| agents | 61 | 31 | 39 : 22 | 워크플로우 49, 하위 에이전트 6, 사후학습 3, 사전학습 2, 도구 사용 1 |
| applications | 42 | 21 | 25 : 17 | 워크플로우 41, 미세 조정 1 |
| etc | 10 | 2 | 7 : 3 | 워크플로우 10 |
| database | 4 | 3 | 3 : 1 | 프롬프트 튜닝 3, 사전 학습 1 |
| llms | 0 | 0 | 0 : 0 | 없음 |
| evaluations | 0 | 0 | 0 : 0 | 없음 |
| overviews | 0 | 0 | 0 : 0 | 없음 |
| physical-ai | 0 | 0 | 0 : 0 | 없음 |
| **합계** | **117** | **57** | **74 : 43** | 워크플로우 100, 하위 에이전트 6, 프롬프트 튜닝 3, 사후학습 3, 사전학습 2, 미세 조정 1, 사전 학습 1, 도구 사용 1 |

카테고리별 합계 117건은 `--all` 결과와 일치한다. index.md에는 lint_terms 경고가 없다. llms와 evaluations, overviews의 0건은 정비가 끝나서가 아니라 glossary-agents의 `applies_to`가 그 카테고리를 덮지 않아서다 (2-4 참고).

**표 3. 경로별 분해**

| 카테고리 | 경로 | 검사 파일 | error | warning | lint_terms |
|---|---|---|---|---|---|
| agents | sources | 64 | 1,709 | 39 | 39 |
| agents | wiki | 61 | 1,745 | 48 | 22 |
| agents | index.md | 1 | 115 | 2 | 0 |
| applications | sources | 33 | 1,309 | 34 | 25 |
| applications | wiki | 32 | 1,044 | 27 | 17 |
| applications | index.md | 1 | 47 | 1 | 0 |
| database | sources | 25 | 932 | 7 | 3 |
| database | wiki | 25 | 868 | 10 | 1 |
| database | index.md | 1 | 30 | 0 | 0 |
| llms | sources | 10 | 231 | 7 | 0 |
| llms | wiki | 10 | 206 | 11 | 0 |
| llms | index.md | 1 | 18 | 0 | 0 |
| evaluations | sources | 5 | 112 | 6 | 0 |
| evaluations | wiki | 5 | 125 | 9 | 0 |
| evaluations | index.md | 1 | 9 | 0 | 0 |
| etc | sources | 2 | 156 | 0 | 7 |
| etc | wiki | 2 | 119 | 0 | 3 |
| etc | index.md | 1 | 3 | 0 | 0 |
| overviews | wiki | 9 | 401 | 11 | 0 |
| overviews | index.md | 1 | 23 | 0 | 0 |
| physical-ai | 전체 154 | 154 | 0 | 0 | 0 |
| **합계** | sources | 139 | **4,449** | **93** | **74** |
| **합계** | wiki | 144 | **4,508** | **116** | **43** |
| **합계** | index.md | 1 | **245** | **3** | **0** |

경로 합계는 `--all` 결과와 정확히 일치한다. lint_style은 error 4,449 + 4,508 + 245 = 9,202건, warning 93 + 116 + 3 = 212건이고, lint_terms는 74 + 43 = 117건이다.

index.md 행은 같은 파일 하나를 7개 절로 나눈 것이라 검사 파일 열의 1이 일곱 번 반복된다. 절별 error 합 115 + 47 + 30 + 18 + 9 + 3 + 23 = 245건이 무필터 실행값과 같아, 누락도 중복도 없이 분할됨을 확인했다.

physical-ai 행의 154개 파일은 `wiki/physical-ai` 76편, 대응 sources 77편, index.md의 Physical AI 절이다. `wiki/overviews/physical-ai-overview.md`는 frontmatter가 `category: overviews`라 표 3의 overviews wiki 9편과는 별도로 단독 실행해 0건을 확인했다 (6절 1항의 두 번째 게이트 명령).

5-A 표와의 대조에서 sources 여섯 줄과 index.md는 값이 그대로다. wiki 쪽만 bilingual-heading 재검출분만큼 늘었고, 늘어난 양은 카테고리별로 agents +358, applications +200, database +156, llms +62, evaluations +36, etc +15, overviews +62다. 총 889건으로 전 저장소 증가분과 일치한다.

### 2-2. 이번 조사의 보정치 (0-2 확정)

계획 수립 조사(2026-09-06)에서 5-A와 5-B가 놓친 사실 4건을 확인했고, Phase 0-2 재실측으로 전부 확정했다.

| 항목 | 5-A/5-B 기록 | 실측 보정 | 0-2 확정 | 원인 |
|---|---|---|---|---|
| bilingual-heading | 17건 | **906건** (미검출 889건) | 확정 (906건, 전량 wiki) | lint_style.py의 mask()가 라틴 괄호를 먼저 지운 뒤 헤딩을 검사하는 순서 결함 |
| figures caption 정비 대상 | 532건 | **670건** | 확정 (금지 기호 532, 영어 전용 157, 중복 19) | 금지 기호 532건에 더해 영어 전용 caption 157건이 빠짐 |
| figure 크롭 품질 잔여 약 23건 | stem 미상 | **단일 stem 23건**: `dnotitia-2026-akb-product-introduction` (fig01~23 전부 page-region) | 확정 (고아 sources 5편에 포함) | 이 stem은 wiki 페이지도 없는 고아 source라 크롭 재작업과 wiki 신설이 한 묶음 |
| pseudo action 표기 흔들림 | 19건 대 9건 | 21건 대 12건, **전량 physical-ai와 용어집 안** | 미재측정 (Phase 7-2 착수 시점에 재확인) | 확산 작업과 독립인 소형 작업으로 분리 (Phase 7-2) |

5-A 기록 중 이번에 새로 발견한 오차가 하나 더 있다. 위반 파일 수 "285개"는 실측 284개다 (2-1 참고).

### 2-3. 콘텐츠 실태 (비-physical-ai 135편)

| 지표 | 계획서 기록 | 0-2 실측 | physical-ai 완료치 |
|---|---|---|---|
| wiki가 sources보다 얇은 페이지 | 128편 / 135 (95%) | **동일** | 1편 / 76 (정상 판정) |
| 압축비 중앙값 (wiki 본문 / sources 본문) | 0.68 | **동일** (0.679) | 1.95 |
| wiki 본문 중앙값 | 5,326자 | **동일** | 14,156자 |
| 영문 병기 헤딩 (구식 IMRaD 골격) | 906개, 전 편 | **동일** | 0개 |
| `## 핵심 용어` 절 보유 | 0편 | **동일** | 76편 전부 |
| 표 0개 페이지 | 48편 | **동일** | 0편 |
| 표 편당 | 1.3개 | **1.44개** (135편 195개) | 9.70개 (76편 737개) |
| frontmatter 100줄 초과 | 18편 (최악 362줄/505줄 = 72%) | **18편** (최악 364줄/504줄 = 72%) | 7편 (전부 비중 14~23% 정상) |

여덟 지표 중 여섯이 계획서 기록과 같고 둘이 다르다.

표 편당은 1.3개가 아니라 1.44개다. 같은 정의로 카테고리별로 세면 agents 1.30개, applications 1.31개, database 2.12개, llms 1.10개, evaluations 0.40개, etc 4.00개이므로, 계획서의 1.3은 전체 값이 아니라 최대 카테고리인 agents의 값으로 보인다. 이 정의는 physical-ai 완료치 9.70개를 그대로 재현하므로 실측값을 확정치로 둔다.

frontmatter 최악 페이지는 `wiki/evaluations/xie-2024-osworld-benchmarking-multimodal-agents-for`로 동일하고 비중 72%도 같다. 절대 줄 수만 계획서 362줄/505줄과 실측 364줄/504줄로 다른데, 계획서가 frontmatter를 감싼 구분선 2줄을 빼고 세고 전체 줄에는 1을 더해 센 결과다. 대상 편수 18편은 같다.

카테고리별 압축비 중앙값도 계획서 기록과 전부 일치한다: agents 0.72, applications 0.67, database 0.59, llms 0.66, evaluations 0.73, etc 0.76. 전체 규모는 physical-ai Phase 4(73편)의 약 1.8배다.

카테고리별 실태를 함께 둔다.

| 카테고리 | 편수 | 얇은 페이지 | 압축비 중앙값 | 본문 중앙값 | 산문 중앙값 | 표 총수 | 표 편당 | 표 0개 | frontmatter 100줄 초과 |
|---|---|---|---|---|---|---|---|---|---|
| agents | 61 | 58 | 0.72 | 4,953자 | 4,010자 | 79 | 1.30 | 24 | 11 |
| applications | 32 | 29 | 0.67 | 5,347자 | 4,316자 | 42 | 1.31 | 10 | 0 |
| database | 25 | 25 | 0.59 | 6,116자 | 4,706자 | 53 | 2.12 | 5 | 1 |
| llms | 10 | 10 | 0.66 | 5,060자 | 3,882자 | 11 | 1.10 | 6 | 4 |
| evaluations | 5 | 4 | 0.73 | 6,019자 | 4,748자 | 2 | 0.40 | 3 | 2 |
| etc | 2 | 2 | 0.76 | 13,023자 | 9,139자 | 8 | 4.00 | 0 | 0 |
| **합계** | **135** | **128** | **0.68** | **5,326자** | **4,147자** | **195** | **1.44** | **48** | **18** |

sources보다 두껍던 7편은 전부 압축비 1.03에서 1.23 사이라 교재식 기준에는 못 미친다: `garrytan-gstack` 1.23, `cheahjs-free-llm-api-resources` 1.22, `google-2026-the-new-sdlc-with-vibe` 1.18, `liu-2026-rag-llm-wiki-or-gbrain` 1.08, `garrytan-gbrain-tutorials` 1.07, `shao-2024-assisting-in-writing-wikipedia-like-articles` 1.06, `xlang-ai-osworld` 1.03. 재작성 범위에서 제외하지 않는다.

### 2-4. 용어집과 도구 격차

- glossary-agents는 등재 36행으로 physical-ai(126행) 대비 커버 밀도가 3분의 1이다. `applies_to`가 `[agents, applications, evaluations, overviews, etc]`라 llms, database, physical-ai가 빠져 있어 "워크플로우" 같은 위반이 누수된다 (확장 시 새로 걸릴 위반은 계획 수립 때 약 5건으로 추정했으나 Phase 0-3 실측은 51건이다. 추정이 `워크플로우` 한 용어만 센 값이었고 `접지`, `온톨로지`, `도구 사용`, `리즈닝` 네 용어가 빠져 있었다. 51건 중 34건이 physical-ai다). glossary-llms는 36행에 `applies_to`가 전 카테고리, glossary-physical-ai는 126행에 `[physical-ai, overviews, etc]`다.
- write-wiki 스킬(v2.1.0)은 구조가 카테고리 중립이지만, §0 용어집 매핑 표가 스크립트 `applies_to`와 어긋나고 before/after 예시 3쌍이 전부 physical-ai다.
- 얇은 paper sources는 비-physical-ai에 2편뿐이다: `shao-2024-assisting-in-writing-wikipedia-like-articles`(5,637자), `gutierrez-2025-from-rag-to-memory-non`(5,633자). 해당 배치에서 40,000자 재추출 보강을 동반한다. agents의 article과 repo에 6,000자 미만 sources가 29편 있으나, article과 repo는 raw가 원문 전문이므로 재작성 subagent가 raw를 재독하는 경로로 해결한다 (별도 보강 없음).
- index.md 비-physical-ai 148항목 중 200자 초과 101개, error 245건이다. 절별로는 agents 61항목 중 56개(최장 926자), applications 32항목 중 18개(최장 587자), database 25항목 중 5개(최장 317자), llms 10항목 중 8개(최장 587자), overviews 13항목 중 8개(최장 418자), evaluations 5항목 중 4개(최장 258자), etc 2항목 중 2개(최장 493자)다. Physical AI 절 76항목은 최장 200자로 전량 기준 안이다. overviews 9편은 전부 study_path가 없고 error 401건이다 (5-A의 339건은 bilingual-heading 미검출 상태의 값이다).
- lint_style의 `collect_targets()`가 `wiki/overviews/glossary-*.md`를 파일 단위로 제외해, 용어집 3편의 병기 헤딩 12개가 검사 밖에 있다. 12개는 세 파일이 공유하는 같은 헤딩 4종이다: `## 표기 원칙 (Conventions)`, `## 용어 표 (Term Table)`, `## 신규 용어 추가 절차 (Growth Loop)`, `## 관련 페이지 (Related Pages)`. 제외를 통째로 풀면 병기 헤딩 12건 외에 middot 88건과 emdash 83건, banned-vocab 2건이 함께 걸리는데, 그 171건은 금지 표기 셀 구분자와 "검사 없음"을 뜻하는 대시로 규약이 요구하는 표기다. 처리 방침은 Phase 0-3에서 확정한다.

### 2-5. 고아 sources 5편

wiki 페이지가 없는 sources는 5편이고 계획 수립 조사의 목록과 같다. sources 216편, wiki stem 224개를 대조해 재확인했다.

| source stem | category | type | 처리 위치 |
|---|---|---|---|
| 9bow-2026-gstack-claude-code-virtual-team | agents | article | 배치 A6 |
| gpters-2026-yc-ai-agent-guide-gstack | agents | article | 배치 A6 |
| hada-2026-gstack-virtual-engineering-team | agents | article | 배치 A6 |
| dnotitia-2026-akb-product-introduction | applications | report | 배치 B2 (크롭 재작업 23건 동반) |
| 9bow-2026-world-action-model-rise | physical-ai | article | Phase 1-6 (sources는 정비 완료 상태) |

역방향으로 sources가 없는 wiki stem은 13개이고 전부 합성 페이지다: overviews 9편, physical-ai-overview 1편, glossary 3편. 대응 sources가 없는 것이 정상이므로 작업 대상이 아니다.

## 3. 확정 방향

사용자 확정 결정 (2026-09-06):

| 쟁점 | 결정 |
|---|---|
| 재작성 깊이 | 전면 재작성. physical-ai Phase 4와 동일한 교재식 재구성을 135편 전부에 적용 |
| 착수 순서 | 큰 것부터. agents, applications, database, llms, evaluations와 etc, overviews와 index 순 |
| 고아 sources | 5편 모두 wiki 신규 작성 |
| 게이트 | 파일럿 3편(agents 2, database 1) 후 사용자 리뷰, 승인 후 배치 진행 |

승계 규약 (physical-ai Phase 4~5에서 확립):

- 배치의 표준 작업 단위: subagent 1편 전담, sources와 raw를 재독해 교재식 재구성, 같은 stem sources의 문체 정비 동반. sources의 번호 붙은 영문 병기 헤딩은 기존 규약대로 유지한다.
- figures caption 한글 정비를 각 배치에서 그 stem 분량만큼 동반한다. physical-ai에서는 이를 Phase 5-2로 미뤘다가 2차 패스가 필요했으므로, 이번에는 배치 안에 포함한다.
- wiki frontmatter의 figures는 curated 항목만 복제한다 (비대 해소).
- raw/ frontmatter는 불변. `extract_figures.py --force`는 금지하며 재크롭은 검출기 좌표 재사용 방식으로 한다.
- sources `## 8. 그림 후보` 표의 `추천` 열은 Step 3의 LLM 추천 기록이므로 건드리지 않는다.
- 배치 진행 중 발견한 용어집 등재 후보는 등재하지 않고 누적만 하며, Phase 7-1에서 일괄 갱신한다 (rework 방지).
- 커밋 리듬: 배치당 4~6편, `:memo: docs: 배치 A1 재작성 (...)` 형식, 매 커밋에 이 계획서의 체크박스 갱신 동반. 스크립트 변경은 `:sparkles: feat:`.

## 4. 단계별 작업 계획과 진행 현황

### Phase 0. 선행 정비

진행 순서는 사용자 결정(2026-09-06)에 따라 **0-1 → 0-5 → 0-2 → 0-3 → 0-4**로 바꾼다. 0-2의 카테고리별 재실측과 0-3의 physical-ai 회귀 확인이 모두 카테고리 단위 실행을 반복하므로, `--category` 인자를 먼저 만들어 두는 편이 파일 목록 수동 조립을 없앤다. 항목 번호는 계획서 원본을 유지한다.

- [x] 0-1. lint_style.py bilingual-heading 검출 수정. 헤딩 검사만 라틴 괄호 마스킹 전 라인으로 수행한다 (인라인 코드만 마스킹한 별도 라인 사용). 기존 `is_wiki` 가드를 유지해 sources의 번호 병기 헤딩은 계속 면제한다. 회귀 확인 3종: (a) physical-ai 154개 파일 0건 유지, (b) sources 병기 헤딩 미검출, (c) index.md 절 헤딩 미검출
  - 완료 (2026-09-06). `mask()`가 마스킹 패턴 튜플을 인자로 받게 하고, 헤딩 검사만 `MASK_PATTERNS_HEADING`(인라인 코드만)으로 수행하도록 고쳤다. bilingual-heading 검출 17건에서 906건으로 (+889). 다른 8개 규칙은 전부 증감 0으로 부작용이 없다. 회귀 3종 전부 통과: (a) physical-ai 154개 파일(wiki 76, sources 77, physical-ai-overview 1) error 0 warning 0 유지, (b) sources 216개 파일의 병기 헤딩 1,937개가 `is_wiki` 가드로 전량 면제, (c) index.md 0건 (`is_wiki=False` 면제에 더해 절 헤딩에 한글이 없어 이중 면제).
  - 경로별 분해: agents 358, applications 206, database 160, overviews 68, llms 62, evaluations 36, etc 16, physical-ai 0 (144개 파일).
  - 부수 발견 2건: (1) `collect_targets()`가 `glossary-*.md`를 제외해 용어집 3편의 병기 헤딩 12개가 검사 밖에 있다 (중간점 구분자 때문의 제외가 헤딩까지 면제한 결과). (2) 일부 헤딩은 bilingual-heading과 emdash에 중복 계상된다 (예: `loop-engineering-cross-domain-overview.md:52`). 수정 작업량 산정 시 라인 단위 중복 제거가 필요하다.
- [x] 0-1b. 용어집 3편의 bilingual-heading 사각지대 해소 (계획 밖 신규 항목, 0-1의 부수 발견 (1)에서 파생). 0-3이 용어집을 편집하므로 그 앞에 둔다.
  - 완료 (2026-09-06). `lint_style.py`의 `collect_targets()`에서 `glossary-*.md` 파일 단위 제외를 없애고, `lint_file()`에 `is_glossary` 플래그를 두어 middot, emdash, banned-vocab **세 규칙만** 면제한다. 그 세 규칙은 용어집 규약이 요구하는 표기라 면제가 타당하지만(금지 표기 셀의 `·` 구분자, 검사 없음을 뜻하는 대시), 헤딩 규칙까지 함께 면제할 이유는 없었다. 구조 변경 없이 기존 `is_wiki`와 같은 형태의 지역 플래그와 조건절 3개로 처리했다. `lint_terms.py`의 제외는 유지한다 (용어집은 금지 표기를 리터럴로 나열하는 파일이라 용어 lint 대상이 되면 전량 오탐이다).
  - 용어집 3편의 헤딩 12개(4종 x 3파일)를 한글 단독으로 고쳤다: `## 표기 원칙`, `## 용어 표`, `## 신규 용어 추가 절차`, `## 관련 페이지`. 참조 의존성 3건은 모두 갱신 불필요였다. `lint_terms.py:161`의 용어 표 파서는 `"용어 표" in line` 부분 문자열 매칭이고, write-wiki 스킬과 용어집 본문의 절 이름 언급은 한글 부분이 그대로라 유효하다. frontmatter `title`은 헤딩 규칙 대상이 아니라 건드리지 않았다.
  - 기준선 순증 0 확인. 전 저장소 error 9,202건, warning 212건, bilingual-heading 906건, 위반 파일 284개가 변경 전후 완전 동일하다 (제외 해제로 12건이 들어오지만 같은 작업에서 고쳐 상쇄). lint_terms 117건 유지, 용어집 3편 자체는 0건, physical-ai 게이트 4개 명령 전부 exit 0.
  - 부수 확인: `--category overviews`의 error는 424건이고 이는 `wiki/overviews/` 경로 401건에 index.md의 Overviews 절 23건을 더한 값이다. 경로 기준 수치와 카테고리 기준 수치는 index.md 절 만큼 차이가 나므로 게이트에서 대조할 때 어느 기준인지 명시한다. 검사 파일 수는 용어집 3편이 들어와 11개에서 14개가 됐다.
- [x] 0-2. 수정된 lint로 전 저장소 기준선 재실측, 이 문서 2절 표를 확정치로 갱신
  - 완료 (2026-09-06). 2절 전체를 확정치로 다시 쓰고 5절 착수 열을 채웠다. 측정 정의 7종을 2절 머리에 명시하고 physical-ai 완료치로 역검증했다. 17개 지표가 계획서 기록과 일치했고 4개가 어긋나 실측으로 정정했다: lint_style 위반 파일 285개에서 284개, 표 편당 1.3개에서 1.44개(계획서 값은 전체가 아니라 agents 카테고리 값이었다), frontmatter 최악 362줄/505줄에서 364줄/504줄(구분선 계산 차이), overviews error 339건에서 401건(5-A는 bilingual-heading 미검출 상태 값이라 차이 62건이 재검출분).
  - 교차 검증 전부 통과. 8개 카테고리 lint 합계가 `--all`과 rule 단위까지 일치하고, 경로별 합계와 index.md 절별 합계도 일치한다. physical-ai 게이트 두 줄 모두 0건 유지.

- [ ] 0-3. 용어집 3차 갱신. (a) glossary-agents의 `applies_to`를 전 카테고리로 확장하고 새로 걸리는 위반 약 5건을 정리한 뒤 physical-ai 154개 파일 0건 재확인. (b) agents와 llms 도메인의 빈도 실측 스캔으로 등재 후보 표를 작성해 사용자 승인 후 등재한다 (등재 전 전 저장소 grep으로 신규 위반 건수를 사전 계량하는 Phase 5-1 방식)
  - (a) 완료 (2026-09-06). glossary-agents의 `applies_to`를 8개 전 카테고리로 확장했다. 확장 직후 lint_terms가 117건에서 168건으로 늘었고(신규 51건), 위반을 정리해 117건으로 복귀시켰다. 잔여 117건의 용어 구성도 기준선과 동일해 순수 치환임이 확인된다.
  - 신규 51건의 내역: `접지`에서 grounding 20건, `온톨로지`에서 ontology 13건, `도구 사용`에서 tool use 10건, `워크플로우`에서 워크플로 7건, `리즈닝` 1건. 24개 파일 53줄을 최소 수정으로 고쳤고 문단 재작성은 하지 않았다.
  - `리즈닝` 1건만 고치지 않았다. `sources/engiuniverse-2025-rt1-rt2-robotics-transformer-review.md:81`은 자동 자막이 오인식한 표기를 복원 실패 사례로 인용한 문장이라 바꾸면 뜻이 파괴된다. `lint-terms: ignore`를 사유와 함께 달았다.
  - 반쪽 번역 처리: `언어 접지`, `지각 접지`는 "언어 grounding"으로 두면 CLAUDE.md의 반쪽 번역 금지에 걸리므로 `language grounding`, `perceptual grounding`으로 원어 전체를 썼다.
  - glossary-agents의 ontology 행 비고가 "applies_to가 physical-ai를 제외하므로 충돌하지 않는다"고 적고 있어 확장으로 무효가 됐다. 같은 커밋에서 비고를 갱신했다. tool use 행 비고에는 로봇의 물리적 도구 사용도 원논문이 tool use로 쓰므로 함께 치환했다는 판단을 남겼다.
  - 회귀 확인 통과. physical-ai 게이트 4개 명령 전부 exit 0이고, 전 저장소 총계가 rule 단위까지 불변이다 (lint_style error 9,202, warning 212, 위반 파일 284, lint_terms 117).
  - 다른 용어집 `applies_to` 점검 결과는 변경 없음이다. glossary-llms는 이미 전 카테고리다. glossary-physical-ai의 3개 카테고리 한정은 누락이 아니라 의도된 설계로, 표기 원칙 절이 "정책, 행동, 관측 같은 단어가 다른 도메인에서 일반 의미로 쓰이는 것까지 막지 않기 위해서"라고 명시한다. 금지 표기 162종에 고빈도 일반어가 많아 확장하면 오탐이 폭증한다.
  - (b) 후보 표 작성 완료, **사용자 승인 대기**. `temp-docs/glossary-3rd-candidates.md`에 후보 23개를 계량과 함께 정리했다. 등재 권고 6행, 보류 8건, 기각 6건, 이관 1건, 관찰 2건. 모든 신규 위반 수치는 후보를 임시 등재하고 lint를 돌린 실측값이다.
- [ ] 0-4. write-wiki 스킬 v2.2. §0 용어집 매핑 표를 0-3 이후의 `applies_to`와 정합시킨다 (비-physical-ai 예시 추가는 파일럿 후 v2.2.1로 미룸)
- [x] 0-5. lint_terms.py와 lint_style.py에 `--category` 인자 추가. sources/가 flat 구조라 frontmatter `category:`로만 카테고리 판별이 가능하고, 배치 게이트에 "이 카테고리만 0건" 실행이 반복 필요하다. 기본 동작과 훅 JSON 출력은 불변
  - 완료 (2026-09-06). 두 스크립트에 동일 의미로 넣었다. `--category NAME` 반복 지정과 `--category a,b` 쉼표 구분을 모두 받고, `--all` 없이 단독으로 쓰면 전체 스캔 후 필터로 동작한다. 명시적 파일 목록과 함께 주면 그 목록을 필터한다. 필터 기준은 frontmatter `category:` 값이다.
  - index.md는 `category:` 키가 없지만 제외하지 않고 **해당 절의 라인 범위로 경고를 필터**해 포함한다. 배치 완료 게이트가 "index.md {카테고리} 절 축소"와 "`--category X` lint 0건"을 늘 짝으로 요구해서다. 무필터 248건(error 245)이 8개 절로 누락과 중복 없이 정확히 분할되는 것을 확인했다.
  - 기본 동작 불변 확인: 원본 스크립트(`git show HEAD:`)와 `--all --json`, `--all` 텍스트, 훅 호출 형태(`--json <단일파일>`) 세 경로 전부 IDENTICAL. 훅 JSON 스키마 무변경. `--category nonexistent`는 크래시 없이 exit 0, stdout은 순수 JSON을 유지하고 안내는 stderr로 낸다.
  - 부수 소득: `--category`가 기존 수동 조립보다 정확하다. `sources/joonan30-llm-wiki-labs.md`는 본문 116줄(README 안의 YAML 예시)에 `category: disease-genetics` 문자열이 있어 `grep -l '^category: ...'` 방식이 오분류하는데, `--category`는 frontmatter 파서를 쓰므로 실제 값 `applications`로 판정한다.
  - 의도적 편차 1건: 인자 없이 실행할 때의 usage 오류 문구를 "`--all 을 쓰세요`"에서 "`--all 또는 --category 를 쓰세요`"로 바꿨다 (stderr, exit 2). lint 결과 출력 경로가 아니다.
  - **주의 — physical-ai 게이트는 두 명령이다.** `wiki/overviews/physical-ai-overview.md`의 frontmatter는 `category: overviews`라서 `--category physical-ai`에 잡히지 않는다. 아래 6절 1항의 게이트 명령을 쓴다.

### Phase 1. 파일럿 (3편)과 게이트

- [ ] 1-1. agents paper 파일럿: `cemri-2025-why-do-multi-agent-llm-systems` (표와 분류체계가 많은 대표 난도)
- [ ] 1-2. agents article 파일럿: `osmani-2026-loop-engineering` (얇은 article sources를 raw 전문 재독으로 보강 없이 재작성하는 경로 검증)
- [ ] 1-3. database paper 파일럿: `edge-2024-from-local-to-global` (GraphRAG 원논문). repo 경로는 physical-ai 파일럿(hku-mars-fast-lio)에서 검증돼 생략
- [ ] 1-4. 사용자 리뷰 게이트 (승인 후 배치 진행)
- [ ] 1-5. write-wiki 스킬 v2.2.1. 파일럿 전후 발췌로 비-physical-ai before/after 예시 2~3쌍 추가
- [ ] 1-6. physical-ai 고아 `9bow-2026-world-action-model-rise` wiki 신설. physical-ai-overview 커버리지를 77편으로 갱신하고 index.md Physical AI 절에 항목을 신설한다 (sources는 Phase 5-7에서 정비 완료라 wiki 1편 작업)

### Phase 2. agents 배치 재작성 (A1~A12, 64편 = 기존 61 + 신규 3)

파일럿 2편(cemri-2025, osmani-2026-loop-engineering)은 소속 배치에서 제외한다. 실제 배치 작업량은 62편이다.

- [ ] A1 Agent Skills 표준 (5편): anthropic-2025-equipping-agents-for-the-real, agentskills-agentskills, agentskills-io-2026-agent-skills-overview, osmani-2026-agent-skills, hada-2026-agent-skills
- [ ] A2 스킬 최적화와 조합 (5편): microsoft-skillopt, yang-2026-skillopt-executive-strategy-for, zhao-2026-generative-skill-composition-for-llm, imbad0202-academic-research-skills, llmsresearch-paperbanana
- [ ] A3 Harness engineering (6편): lee-hoyeon-2026-harness-engineering, ai-boost-awesome-harness-engineering, walkinglabs-learn-harness-engineering, lin-2026-harness-updating-is-not-harness-benefit, seans-ai-stories-2026-agent-harness-loop-engineering, he-2026-agent-lightning-v1-0-towards-harnessed
- [ ] A4 Loop engineering (5편, 파일럿 1편 제외): runkle-2026-the-art-of-loop-engineering, movez-2026-loop-engineering-for-trading-agents, lee-jeongmin-2026-loop-engineering-claude-code, kang-2026-no-longer-prompting-claude, luis-carrijo-2026-claude-code-team-just-dropped
- [ ] A5 Claude Code 실전과 담론 (5편): patel-2026-beyond-the-prompt-claude-code, patel-2026-i-taught-myself-claude-code, trq212-2026-a-field-guide-to-fable, thariq-2026-know-your-unknowns, google-2026-the-new-sdlc-with-vibe
- [ ] A6 gstack과 Claude Code 응용 (6편, 신규 wiki 3편): garrytan-gstack, 9bow-2026-gstack-claude-code-virtual-team(신규), gpters-2026-yc-ai-agent-guide-gstack(신규), hada-2026-gstack-virtual-engineering-team(신규), donchitos-claude-code-game-studios, madslorentzen-ai-job-search
- [ ] A7 Headroom 컨텍스트 압축 (6편): headroomlabs-ai-headroom, tosea-2026-how-to-use-headroom-context, subratpati-2026-building-cost-efficient-agents-with, nedai-2026-headroom-token-compression-guide, 9bow-2026-headroom-ai-agent-context-compression, yongkyun-2026-cutting-llm-token-costs-with
- [ ] A8 Context engineering과 토큰 경제 (4편): anthropic-2025-effective-context-engineering-for-ai, zhang-2026-recursive-language-models, bai-2026-how-do-ai-agents-spend, bytebytego-2026-how-openai-built-its-data
- [ ] A9 에이전트 메모리 (5편): rasmussen-2025-zep-a-temporal-knowledge-graph, getzep-graphiti, zhou-2026-are-we-ready-for-an, qiao-2026-memory-intelligence-agent, zou-2026-task-focused-memorization-multimodal-agents
- [ ] A10 멀티에이전트와 자동 집필 (4편, 파일럿 1편 제외): lee-2026-the-agent-loop-a-survey, dennis-2026-compiling-agentic-workflows-into-llm, shao-2024-assisting-in-writing-wikipedia-like-articles(40,000자 재추출 보강 동반), stanford-oval-storm
- [ ] A11 CUA와 브라우저 에이전트 (5편): wang-2026-cua-gym-scaling-verifiable-training-environments, xlang-ai-cua-gym, xlangai-cua-gym-dataset, browser-use-browser-use, browser-use-browsercode
- [ ] A12 에이전트 인프라와 컨텍스트 자산 (6편): rodrigues-2026-mcp-server-architecture-patterns, block-buzz, stablyai-orca, google-labs-code-design-md, hall-2026-atlassians-design-md-is-here, theaxlabs-2026-company-brain-prompt-guide
- [ ] A-완료. index.md Agents 절 축소(64항목, 200자 이내, 구분자 `]]: ` 통일), `--category agents` lint 0건, physical-ai 회귀 확인, 카테고리 완료 계량 기록

### Phase 3. applications 배치 재작성 (B1~B7, 33편 = 기존 32 + 신규 1)

- [ ] B1 GBrain 코어 (6편): garrytan-gbrain, garrytan-gbrain-tutorials, xguru-2026-gbrain-open-source-personal-knowledge, tilnote-2026-gbrain-repository-core-summary, techwealth-hub-2026-garry-tan-gbrain-explained, vectorize-2026-gbrain-review-honest-assessment
- [ ] B2 AKB와 지식 베이스 비교 (6편, 신규 wiki 1편과 figure 재크롭 23건): dnotitia-akb, dnotitia-2026-akb-product-introduction(신규, page-region 23건을 좌표 재사용 방식으로 재크롭, `--force` 금지), kmyu-2026-akb-llmwiki-gbrain-comparison, gajjar-2026-gbrain-vs-computer-memory, liu-2026-rag-llm-wiki-or-gbrain, mantena-2026-hermes-gbrain-setup-vps
- [ ] B3 Karpathy LLM Wiki 패턴 (5편): datasciencedojo-2026-llm-wiki-by-andrej-karpathy, kmyu-2026-llm-wiki-pattern-synthesis, joonan30-llm-wiki-labs, dragon1086-llm-wiki, agricidaniel-claude-obsidian
- [ ] B4 Graphify (4편): safishamsi-graphify, graphify-labs-graphify, shamsi-2026-graphify-knowledge-graphs-for-ai, todaycode-2026-graphify-llm-token-reduction-wiki
- [ ] B5 코드 인텔리전스 도구 (3편): colbymchenry-codegraph, lum1104-understand-anything, wlsdks-ontology-atlas
- [ ] B6 OpenWiki (3편): langchain-ai-openwiki, sproul-2026-introducing-openwiki-an-open-source, 9bow-2026-openwiki-coding-agent-documentation
- [ ] B7 RAG 담론과 응용 카탈로그 (6편): alex-xu-2026-rag-vs-graph-rag-vs, pandey-2026-rag-is-no-longer-just, patel-2026-production-ai-app-seven-layers, shubhamsaboo-awesome-llm-apps, zhulinsen-daily-stock-analysis, cheahjs-free-llm-api-resources
- [ ] B-완료. index.md Applications 절 축소, `--category applications` lint 0건, physical-ai 회귀 확인, 계량 기록

### Phase 4. database 배치 재작성 (D1~D5, 25편)

파일럿 1편(edge-2024)은 소속 배치에서 제외한다. 실제 배치 작업량은 24편이다.

- [ ] D1 GraphRAG 트렁크 (5편, 파일럿 1편 제외): microsoft-graphrag, dsba-2025-graphrag-paper-review, guo-2025-lightrag-simple-and-fast, zhang-2026-leanrag-knowledge-graph-based-generation, dsba-2026-paper-review-graph-based-rag
- [ ] D2 멀티모달 RAG와 임베더 (5편): guo-2025-rag-anything-all-in-one-rag, hkuds-rag-anything, 9bow-2026-rag-anything-multimodal-rag-framework, startrail-org-pixelrag, shanbhogue-2026-gemini-embedding-2-native-multimodal
- [ ] D3 PageIndex와 vectorless (6편): vectifyai-pageindex, zhang-2025-pageindex-vectorless-reasoning-rag, geeksforgeeks-2026-vectorless-rag-pageindex, kalane-2026-pageindex-threw-out-vector-databases, sguys99-langchain-study-vectorless-rag, li-2026-beyond-semantic-similarity-rethinking-retrieval
- [ ] D4 retrieval 재고와 메모리, cookbook (5편): lumer-2025-rethinking-retrieval-from-traditional-retrieval, gutierrez-2025-from-rag-to-memory-non(40,000자 재추출 보강 동반), zhang-2026-your-embedding-model-is-smarter, athina-ai-rag-cookbooks, nirdiamant-rag-techniques
- [ ] D5 벡터 양자화 turbovec (3편): zandieh-2025-turboquant-online-vector-quantization-with, ryancodrai-turbovec(title 조합 판정 유지로 재검토 종결 기록), 9bow-2026-turbovec-turboquant-rust-vector-index
- [ ] D-완료. index.md Database 절 축소, `--category database` lint 0건, physical-ai 회귀 확인, 계량 기록

### Phase 5. llms, evaluations, etc 배치 재작성 (L1~L3, E1~E2, 17편)

- [ ] L1 생성 모델 기초 (4편, physical-ai action head 계보의 배경): lipman-2022-flow-matching-for-generative-modeling, rombach-2022-high-resolution-image-synthesis-with-latent, peebles-2022-scalable-diffusion-models-with-transformers, mentzer-2023-finite-scalar-quantization-vq-vae-made
- [ ] L2 Eagle과 VLM (3편, GR00T backbone 계보): chen-2025-eagle-25-boosting-long-context-post-training, nvlabs-eagle, cai-2026-vlm3-vision-language-models
- [ ] L3 모델 보안과 산업 소식 (3편): shumailov-2024-ununlearning-unlearning-is-not-sufficient, panfilov-2026-stealing-reasoning-traces-from-proprietary, 9bow-2026-gpt-5-6-sol-terra-luna
- [ ] E1 computer-use와 tool use 벤치마크 (3편): xie-2024-osworld-benchmarking-multimodal-agents-for(frontmatter 최악 362줄/505줄 해소), xlang-ai-osworld, bandi-2026-mcp-atlas-a-large-scale-benchmark-for
- [ ] E2 평가 실무와 횡단 주제 (4편): marker-inc-korea-autorag, kim-2026-ai-prd-eval-plan, rahman-2026-a-practical-guide-to-becoming, google-okf
- [ ] LE-완료. index.md LLMs, Evaluations, Etc 절 축소, 해당 카테고리 lint 0건, physical-ai 회귀 확인, 계량 기록

### Phase 6. overviews 재작성과 study_path (9편)

전 카테고리 배치 완료 후 착수한다. overview는 커버 자료의 재작성 결과(새 수치, 새 구조)와 신규 페이지 편입을 반영해야 하기 때문이다. 배치 진행 중 overview와의 일시 모순은 허용하고 이 계획서에 기록한다.

study_path 신설 판단 기준 (셋 중 둘 이상 충족 시 신설, 미충족은 역할 대응표 강화): (a) 커버 자료가 난이도와 선후 관계로 정렬된다, (b) 학습 트랙이 하나 이상 성립한다, (c) 커버 자료가 5편 이상이다.

- [ ] 6-1 커리큘럼형 5편 (study_path 신설): prompt-to-loop-engineering-evolution-overview, agent-harness-engineering-overview, agent-skills-overview, lightrag-family-graph-rag-overview, gbrain-ecosystem-overview
- [ ] 6-2 비교형 3편 (역할 대응표 강화): headroom-context-compression-overview, design-md-overview, loop-engineering-cross-domain-overview
- [ ] 6-3 gstack-ai-software-factory-overview: A6의 신규 3편 편입 후 재판정 (커버가 4편에서 7편이 되면 study_path 후보)
- [ ] 6-4 study_path 해석 검증: `site/build.mjs` 빌드 콘솔의 `[study]` 미해석 참조 0건 확인
- [ ] 6-5 index.md Overviews 절 축소, overviews lint 0건

### Phase 7. 검증과 마무리

- [ ] 7-1. 용어집 4차 일괄 갱신 (배치 중 누적 후보, 사용자 승인 게이트, 등재 전 전 저장소 grep 사전 계량)
- [ ] 7-2. pseudo-action 표기 통일. physical-ai 내 21건과 용어집 자체 혼용을 정리한다. canonical은 용어집 1차 갱신 때 등재된 하이픈 표기 `pseudo-action`을 권고
- [ ] 7-3. 전 저장소 계량 3열 대비 기록 (아래 5절 표)
- [ ] 7-4. 자동 메모리 갱신: physical-ai-lint-clean-state를 저장소 전체 clean-state로 승격
- [ ] 7-5. 후속 과제 기록 (남는 이월 항목을 이 문서 7절에 확정)

## 5. 검증과 계량

Phase 7-3에서 아래 표를 채운다. 착수 열은 Phase 0-2의 재실측(수정된 lint 기준, 2026-09-06 확정)이고, 최종 열은 Phase 7 완료 시점이다. 측정 정의는 2절 머리의 정의 표를 따른다.

| 지표 | 착수 (0-2 재실측) | 최종 |
|---|---|---|
| lint_style error (전 저장소) | 9,202건 | 목표 0건 |
| lint_style warning | 212건 | 목표 0건 |
| lint_terms 경고 | 117건 | 목표 0건 |
| bilingual-heading (wiki) | 906건 | 0건 (sources 번호 병기 헤딩 보존 확인 동반) |
| 중간점, em dash (본문) | 중간점 4,004건, em dash 4,280건 (발생 개수로는 9,805개와 4,510개) | 수식 곱셈 예외만 (건수와 위치 명기) |
| 표 0개 페이지 | 48편 | 0편 |
| 표 편당 (비-PAI) | 1.44개 (135편 195개) | physical-ai 완료치 9.70개 수준 |
| `## 핵심 용어` 절 보유 (비-PAI) | 0 / 135 | 135 / 135 |
| wiki가 sources보다 얇은 페이지 | 128편 | 0편 수렴 (예외는 사유 명기) |
| wiki 본문 중앙값 (비-PAI) | 5,326자 (산문 4,147자) | physical-ai 완료치 14,156자 수준 |
| figures caption 정비 대상 | 670건 (금지 기호 532, 영어 전용 157, 중복 19) | 0건 |
| frontmatter 100줄 초과 | 18편 (최악 364줄/504줄 = 72%) | 잔여는 curated 비중으로 정상 판정 |
| index.md 200자 초과 항목 | 101개 (비-physical-ai 148항목 중) | 0개 |
| 고아 sources | 5편 | 0편 |
| glossary-agents 등재 행 | 36행 | (3차, 4차 갱신 후 기록) |

착수 열의 lint 건수는 라인 단위 검출 건수라 수정 대상 라인 수보다 많다. 전 저장소 경고 9,414건은 고유 (파일, 라인) 8,042줄에 걸쳐 있고, 그중 1,344줄에 규칙이 둘 이상 걸린다. 가장 흔한 겹침은 middot과 emdash가 같은 줄에 함께 있는 1,212줄이다. error 규칙만 보면 9,202건이 7,934줄에 몰려 있고, middot과 emdash 8,284건은 7,045줄이다.

bilingual-heading 906건은 다른 규칙과 거의 겹치지 않는다. 906줄 중 26줄만 다른 규칙과 함께 잡히며 상대는 emdash 18줄, middot 6줄, banned-vocab 1줄, no-table 1줄이다. 헤딩 재작성 작업량은 실질적으로 906줄로 봐도 된다.

## 6. 리스크와 회귀 방지 수칙

1. **physical-ai 0건 회귀 방지.** 회귀 확인 지점을 3곳에 고정한다: 0-1 lint 수정 직후, 0-3 `applies_to` 확장 직후, 각 카테고리 완료 시. 매번 physical-ai 파일 세트(wiki 76, sources 77, physical-ai-overview, index.md 해당 절)에 두 lint를 실행해 0건을 확인한다. Phase 0-5 이후의 게이트 명령은 다음 두 줄이다 (overview는 frontmatter가 `category: overviews`라 `--category physical-ai`에 잡히지 않으므로 따로 건다).

```bash
python3 scripts/lint_style.py --category physical-ai --strict && python3 scripts/lint_terms.py --category physical-ai --strict
python3 scripts/lint_style.py wiki/overviews/physical-ai-overview.md --strict && python3 scripts/lint_terms.py wiki/overviews/physical-ai-overview.md --strict
```

첫 줄이 154개 파일(wiki/physical-ai 76, sources 77, index.md의 Physical AI 절)을 덮고 둘째 줄이 overview 1편을 덮는다. 신규 금지 표기 등재 전에는 반드시 전 저장소 grep으로 physical-ai 기존 문장이 걸리는지 사전 계량한다.
2. **훅 출력 잘림.** 위반이 수십에서 수백 건인 파일을 중간 저장하면 훅 출력이 "외 N건"으로 잘려 판단이 오염된다. 재작성 완료본을 한 번에 저장하고, lint는 파일 단위로 직접 실행하며, 훅 출력을 완료 신호로 쓰지 않는다.
3. **`extract_figures.py --force` 금지.** 디렉토리 전체 재검출은 레거시 id 대응을 깬다 (Phase 5-4 교훈). B2의 재크롭 23건은 검출기 좌표 재사용 방식으로 한다.
4. **sources 규약 보존.** 번호 붙은 영문 병기 헤딩 유지, raw/ frontmatter 불변, sources `## 8. 그림 후보` 표의 `추천` 열 불변.
5. **용어집 등재 타이밍.** 배치 중 발견 후보는 누적만 하고 Phase 7-1에서 일괄 등재한다 (완료분 rework 방지).
6. **index.md와 계획서의 직렬성.** 배치를 병렬 subagent로 진행하더라도 index.md와 이 계획서의 갱신은 오케스트레이터가 직렬로 커밋한다.

## 7. 후속 과제 (이 계획 범위 밖)

Phase 7-5에서 확정한다. 현재 예정된 이월 항목:

- raw/repos와 일부 raw/articles frontmatter의 금지 기호는 raw 불변 규약에 따라 계속 보존한다. 신규 ingest부터 새 규칙을 적용하고 소급하지 않는다.
