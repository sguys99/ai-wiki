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
| caption 정비 대상 | frontmatter `figures[].caption` 중 금지 기호를 쓰거나, 한글이 한 글자도 없거나, 같은 파일 안에서 중복된 것. 고유 (파일, 줄) 수로 센다. `scripts/audit_captions.py`가 계량한다 |

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
| figures caption 정비 대상 | 532건 | **670건** | Phase 1-7 재확정 (착수 700건: 금지 기호 532, 영어 전용 157, 중복 36) | 금지 기호 532건에 더해 영어 전용 caption 157건이 빠짐. 0-2의 670건과 차이 30건은 중복 정의 차이다. 금지 기호와 영어 전용은 두 측정이 정확히 일치하고, 중복만 19건 대 36건으로 갈린다. `scripts/audit_captions.py`의 정의(같은 파일 안 동일 문자열 전 occurrence)를 확정치로 둔다 |
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

- [x] 0-3. 용어집 3차 갱신. (a) glossary-agents의 `applies_to`를 전 카테고리로 확장하고 새로 걸리는 위반 약 5건을 정리한 뒤 physical-ai 154개 파일 0건 재확인. (b) agents와 llms 도메인의 빈도 실측 스캔으로 등재 후보 표를 작성해 사용자 승인 후 등재한다 (등재 전 전 저장소 grep으로 신규 위반 건수를 사전 계량하는 Phase 5-1 방식)
  - (a) 완료 (2026-09-06). glossary-agents의 `applies_to`를 8개 전 카테고리로 확장했다. 확장 직후 lint_terms가 117건에서 168건으로 늘었고(신규 51건), 위반을 정리해 117건으로 복귀시켰다. 잔여 117건의 용어 구성도 기준선과 동일해 순수 치환임이 확인된다.
  - 신규 51건의 내역: `접지`에서 grounding 20건, `온톨로지`에서 ontology 13건, `도구 사용`에서 tool use 10건, `워크플로우`에서 워크플로 7건, `리즈닝` 1건. 24개 파일 53줄을 최소 수정으로 고쳤고 문단 재작성은 하지 않았다.
  - `리즈닝` 1건만 고치지 않았다. `sources/engiuniverse-2025-rt1-rt2-robotics-transformer-review.md:81`은 자동 자막이 오인식한 표기를 복원 실패 사례로 인용한 문장이라 바꾸면 뜻이 파괴된다. `lint-terms: ignore`를 사유와 함께 달았다.
  - 반쪽 번역 처리: `언어 접지`, `지각 접지`는 "언어 grounding"으로 두면 CLAUDE.md의 반쪽 번역 금지에 걸리므로 `language grounding`, `perceptual grounding`으로 원어 전체를 썼다.
  - glossary-agents의 ontology 행 비고가 "applies_to가 physical-ai를 제외하므로 충돌하지 않는다"고 적고 있어 확장으로 무효가 됐다. 같은 커밋에서 비고를 갱신했다. tool use 행 비고에는 로봇의 물리적 도구 사용도 원논문이 tool use로 쓰므로 함께 치환했다는 판단을 남겼다.
  - 회귀 확인 통과. physical-ai 게이트 4개 명령 전부 exit 0이고, 전 저장소 총계가 rule 단위까지 불변이다 (lint_style error 9,202, warning 212, 위반 파일 284, lint_terms 117).
  - 다른 용어집 `applies_to` 점검 결과는 변경 없음이다. glossary-llms는 이미 전 카테고리다. glossary-physical-ai의 3개 카테고리 한정은 누락이 아니라 의도된 설계로, 표기 원칙 절이 "정책, 행동, 관측 같은 단어가 다른 도메인에서 일반 의미로 쓰이는 것까지 막지 않기 위해서"라고 명시한다. 금지 표기 162종에 고빈도 일반어가 많아 확장하면 오탐이 폭증한다.
  - (b) 후보 표 작성 완료. `temp-docs/glossary-3rd-candidates.md`에 후보 23개를 계량과 함께 정리했다. 조사 결과는 등재 권고 6행, 보류 8건, 기각 6건, 이관 1건, 관찰 2건이었다. 모든 신규 위반 수치는 후보를 임시 등재하고 lint를 돌린 실측값이다.
  - (b) 사용자 승인 (2026-09-06): 등재 권고 6행 등재하되 위반 정리는 physical-ai만 즉시 하고 비-physical-ai는 배치가 흡수한다, `파인튜닝`은 fine-tuning 원어로 등재하여 기존 병용 허용 정책을 반전한다, `query`는 Phase 7-1로 이관한다.
  - (b) 완료 (2026-09-06). 7행을 등재했다. glossary-agents에 4행(harness와 context engineering, multi-agent는 기존 행의 금지 표기 칸 보강, tool call과 reranking은 신규 행), glossary-llms에 2행(backbone 신규, fine-tuning 보강). 등재 행 수는 agents 36에서 38로, llms 36에서 37로 늘었고 physical-ai 126은 유지다.
  - (b) reranking을 glossary-agents에 둔 근거는 database 전용 용어집이 없고 기존 glossary-agents가 이미 retrieval, ontology, distractor 같은 검색 계열 용어를 호스팅하기 때문이다. (a)의 `applies_to` 확장으로 database 카테고리도 덮는다.
  - (b) fine-tuning 정책 반전은 표기 원칙 절이 아니라 해당 행의 비고 칸에 있었다. 비고를 반전 사실과 근거 수치(원어 624회 대 음차 48회)로 다시 쓰고, 파생형 `코파인튜닝`이 co-fine-tuning 행의 원어를 쓴다는 방침을 함께 남겼다. glossary-llms의 다른 병용 허용 2건(scaling law, next-token prediction)은 별개 정책이라 건드리지 않았다.
  - (b) physical-ai 위반 43건을 11개 파일에서 정리했다. `파인튜닝` 29건, `백본` 11건, `멀티 에이전트` 3건이다. 어형은 저장소 기존 관례를 따라 접미를 유지하는 치환으로 했다.
  - (b) `lint-terms: ignore` 1건. `sources/engiuniverse-2025-rt1-rt2-robotics-transformer-review.md:102`는 한 줄에 우리 산문의 `파인튜닝`과 자동 자막 오인식 표기 `"코파인튜닝"` 인용이 함께 있다. 앞은 치환하고 뒤는 보존해야 해서 사유를 붙인 ignore를 달았다. (a)의 81행 `리즈닝` 처리와 같은 판단이다.
  - (b) 검증 통과. physical-ai 게이트 4개 명령 exit 0, lint_style 총계 불변(error 9,202, warning 212, 위반 파일 284), 용어 표 파싱 정상, `SUBSTRING_EXCEPTIONS` 추가 불필요 재확인(등재 8개 표기 전부 부분 문자열 충돌 0건).
  - (b) **lint_terms 기준선이 117건에서 270건으로 올랐다.** 3차 등재분 196건 중 physical-ai 43건을 정리해 153건이 배치 흡수 대상으로 남는다. 카테고리별로 agents 122, applications 55, database 50, overviews 18, evaluations 13, etc 12, llms 0, physical-ai 0이다. 착수 시 0건이던 overviews와 evaluations가 깨진 것은 3차 등재분이 그 카테고리에 실제로 존재했기 때문이다.
  - (b) Phase 7-1 이관 2건: `query`(질의 220건 대 쿼리 123건 대 원어 278건, canonical 방향 결정 선행 필요, `질의` 금지 시 `품질의` 20건과 `질의응답` 17건이 부분 문자열로 걸림), `rollout`(방향은 16대 1로 명확하나 13건이 physical-ai이고 도메인상 glossary-physical-ai 소관). 재검토 시 재조사 없이 쓸 수 있도록 계량을 후보 문서 6절에 남겼다.
- [x] 0-4. write-wiki 스킬 v2.2. §0 용어집 매핑 표를 0-3 이후의 `applies_to`와 정합시킨다 (비-physical-ai 예시 추가는 파일럿 후 v2.2.1로 미룸)
  - 완료 (2026-09-06). `.claude/skills/write-wiki/SKILL.md`을 v2.2.0으로 올렸다 (136줄에서 140줄, 순증 4줄). §0 매핑 표를 4행에서 2행으로 줄여 실제 `applies_to`와 일치시켰다. physical-ai와 overviews, etc는 용어집 세 개 전부를 로드하고 나머지 다섯 카테고리는 glossary-agents와 glossary-llms 두 개를 로드한다. 8개 카테고리 전수 역인덱스 대조로 누락과 중복 0을 확인했다.
  - 구 표의 오류 3종이 해소됐다. physical-ai 행이 glossary-agents를 누락했고, agents와 applications 행이 database를 누락했으며, llms 행이 glossary-agents를 "에이전트 논의 시"라는 조건부로 잘못 안내하고 있었다. glossary-physical-ai가 세 카테고리로 한정된 이유(고빈도 일반어 오탐 방지)를 표 아래 각주로 남겼다.
  - Phase 0의 다른 변경도 반영했다. §5에 `--category` 안내 한 문장, §4 성장 루프에 용어집이 lint 대상에 들어왔다는 문단(면제 3종은 규약대로 유지되고 헤딩 등 나머지는 적용된다), §5 체크리스트 헤딩 항목에 lint가 검사한다는 사실을 넣었다. fine-tuning 정책 반전은 스킬 본문에 파인튜닝과 병용 허용 언급이 0건이라 반영할 자리가 없었다.
  - 스킬 자체의 문체도 정리했다. 제목과 §0, §2 헤딩의 em dash를 괄호로, 본문 4곳의 중간점을 "와/과"로 바꿨다. 잔존 5건은 전부 의도적이다. 금지 기호를 지칭하는 인라인 코드 3건, 위반을 보여주는 before 인용문 1건, frontmatter `description` 1건이다. description은 스킬 트리거 매칭용 기계 문자열이고 형제 스킬(ingest-paper, ingest-article)이 같은 형식이라 단독 변경은 일관성을 깬다.
  - before/after 예시 3쌍은 인용문 본문을 바이트 단위로 보존했다. 비-physical-ai 예시 추가는 계획대로 Phase 1-5의 v2.2.1 소관이다.
  - 유지보수 결합 1건 기록: CLAUDE.md는 용어집과 카테고리의 매핑을 기술하지 않으므로 SSOT는 `applies_to` 값 자체이고 스킬 §0은 사본이다. `applies_to`를 바꾸는 작업은 §0 갱신을 반드시 동반한다.
- [x] 0-5. lint_terms.py와 lint_style.py에 `--category` 인자 추가. sources/가 flat 구조라 frontmatter `category:`로만 카테고리 판별이 가능하고, 배치 게이트에 "이 카테고리만 0건" 실행이 반복 필요하다. 기본 동작과 훅 JSON 출력은 불변
  - 완료 (2026-09-06). 두 스크립트에 동일 의미로 넣었다. `--category NAME` 반복 지정과 `--category a,b` 쉼표 구분을 모두 받고, `--all` 없이 단독으로 쓰면 전체 스캔 후 필터로 동작한다. 명시적 파일 목록과 함께 주면 그 목록을 필터한다. 필터 기준은 frontmatter `category:` 값이다.
  - index.md는 `category:` 키가 없지만 제외하지 않고 **해당 절의 라인 범위로 경고를 필터**해 포함한다. 배치 완료 게이트가 "index.md {카테고리} 절 축소"와 "`--category X` lint 0건"을 늘 짝으로 요구해서다. 무필터 248건(error 245)이 8개 절로 누락과 중복 없이 정확히 분할되는 것을 확인했다.
  - 기본 동작 불변 확인: 원본 스크립트(`git show HEAD:`)와 `--all --json`, `--all` 텍스트, 훅 호출 형태(`--json <단일파일>`) 세 경로 전부 IDENTICAL. 훅 JSON 스키마 무변경. `--category nonexistent`는 크래시 없이 exit 0, stdout은 순수 JSON을 유지하고 안내는 stderr로 낸다.
  - 부수 소득: `--category`가 기존 수동 조립보다 정확하다. `sources/joonan30-llm-wiki-labs.md`는 본문 116줄(README 안의 YAML 예시)에 `category: disease-genetics` 문자열이 있어 `grep -l '^category: ...'` 방식이 오분류하는데, `--category`는 frontmatter 파서를 쓰므로 실제 값 `applications`로 판정한다.
  - 의도적 편차 1건: 인자 없이 실행할 때의 usage 오류 문구를 "`--all 을 쓰세요`"에서 "`--all 또는 --category 를 쓰세요`"로 바꿨다 (stderr, exit 2). lint 결과 출력 경로가 아니다.
  - **주의 — physical-ai 게이트는 두 명령이다.** `wiki/overviews/physical-ai-overview.md`의 frontmatter는 `category: overviews`라서 `--category physical-ai`에 잡히지 않는다. 아래 6절 1항의 게이트 명령을 쓴다.

### Phase 1. 파일럿 (3편)과 게이트

- [x] 1-1. agents paper 파일럿: `cemri-2025-why-do-multi-agent-llm-systems` (표와 분류체계가 많은 대표 난도)
  - 완료 (2026-09-06). wiki 본문 6,702자에서 19,938자로, 표 1개에서 16개로 늘었다. 압축비는 0.65에서 1.85가 되어 physical-ai 완료치 중앙값 1.95에 근접한다. sources도 문체 정비로 10,269자에서 10,761자, 표 4개에서 6개가 됐다. lint_style, lint_terms, audit_captions 세 검사 전부 0건이고 physical-ai 게이트 2줄도 exit 0이다.
  - wiki frontmatter를 243줄에서 94줄로 줄였다 (figures 항목 22개에서 curated 7개). sources frontmatter는 22개 전량을 유지해 트레이서빌리티를 보존한다. frontmatter 100줄 초과 18편 중 1편이 해소됐다.
  - caption 정비 18건 완료. tab01에서 tab09까지의 영어 전용 caption을 sources와 wiki 양쪽에서 한글로 다시 썼다. fig05와 fig08의 `false positive (Figure 5 텍스트 참조)` 같은 검출 오탐 표기도 서술형으로 고쳤다.
  - legacy id 충돌을 해소했다. frontmatter에 `label: (legacy)`인 fig07과 fig11이 정상 검출분과 같은 id로 들어가 `file:` 경로가 서로 다른 두 이미지를 같은 이름으로 가리키고 있었다. 실제로 `wiki/assets/`에는 정상 크롭이 아니라 legacy 전면 캡처가 들어가 있었다 (바이트 크기 대조로 확인). id를 `legacy-fig07`, `legacy-fig11`로 분리하고 `file`과 `raw` 경로를 정합시킨 뒤 assets를 다시 복사했다.
  - index.md 항목을 573자에서 194자로 줄이고 구분자를 `]]: `로 통일했다.
  - 용어집 등재 후보 8건 누적 (등재하지 않음, Phase 7-1 소관): topology, trace, annotator, taxonomy, failure mode, theory of mind, verifier, Cohen's kappa. `trace`는 glossary-agents의 기존 `trajectory` 행과 역할이 겹쳐 정리가 필요하다.
  - 부수 발견 3건. (1) sources `## 8. 그림 후보` 표의 id가 2026-08 정밀 크롭 전환 이전 순번을 그대로 쓰고 있어 frontmatter와 어긋난다. `remap_figures.py`가 frontmatter만 갱신하고 본문 표를 손대지 않은 결과로 보이며, 해당 절을 가진 sources 112편에 같은 문제가 남아 있을 수 있다. 배치마다 그 stem 분량을 함께 고친다. (2) `HUMANIZE-SUMMARY` 주석 블록이 저장소에 10개 파일 남아 있고 그 안의 금지 기호가 lint error로 잡힌다. `sources/`와 `wiki/`는 humanize 제외 대상이라 남을 이유가 없으므로 배치에서 함께 제거한다. (3) 원 논문 Appendix F의 본문 수치와 Figure 9 막대값이 어긋난다 (1.56배 대 2.57배). wiki `## 한계` 절에 사실만 기록했다.
- [x] 1-2. agents article 파일럿: `osmani-2026-loop-engineering` (얇은 article sources를 raw 전문 재독으로 보강 없이 재작성하는 경로 검증)
  - 완료 (2026-09-06). **검증 결론: 경로가 성립한다.** sources를 재추출하지 않고 raw 원문 전문(약 700단어)만 재독해 wiki 산문을 5,158자에서 7,326자로 늘렸고, 증가분은 수사가 아니라 원문에 있으나 sources가 압축하며 버린 세부다. wiki 본문 6,694자에서 9,061자, 표 2개에서 4개, 압축비 0.85에서 1.27이다.
  - raw 재독으로 복원한 세부는 10항목이다. 자율 시스템의 네 가지 책임, 전통적 워크플로의 세 동작, worktree 격리가 막는 범위가 동시 편집의 기계적 실패로 한정된다는 단서, 커넥터의 경계가 파일시스템이라는 정의, 두 번째 서브에이전트의 평가 기준, 도구 중립성 대비, 구조적 사고 요구, comfortable passivity의 구체 서술, 면책 고지, 저자의 절 단위 전개 구조(표 하나로 뭉쳐 있던 것을 7개 절로 복원)다.
  - 반대 방향 소득도 있다. sources와 wiki가 함께 적고 있던 "스킬이 토큰 낭비를 제거한다"는 주장이 raw에 없어(원문은 재유도 반복 제거만 말한다) 양쪽에서 정정했다. **raw 재독은 누락 복원뿐 아니라 근거 없는 주장 검출에도 쓰인다.**
  - sources 본문은 7,834자에서 7,158자로 줄었다. 금지 기호를 쓴 병기 글로스와 중복 서술을 걷어낸 결과이고 실질 내용은 유지된다 (diff 67줄 추가 68줄 삭제로 거의 줄 단위 치환).
  - 깨진 wikilink 1건을 고쳤다. sources와 wiki가 `[[agents/rahman-2026-a-practical-guide-to-becoming]]`을 링크했으나 실제 페이지는 `wiki/etc/`에 있다. `## 관련 페이지`의 링크 10개를 전수 실재 확인했다.
  - lint_style, lint_terms, audit_captions 세 검사 전부 0건. index.md 항목 288자에서 189자. figures가 없는 자료라 `figures:` 키와 `## 8. 그림 후보` 절을 만들지 않았다 (규약대로).
  - 용어집 등재 후보 5건 누적: verification distance, persistent state, comprehension debt, worktree, connector. `comfortable passivity`와 `control structure inversion`은 자료 고유 표현이라 파일별 `## 7. 용어집`에 남겼다.
  - 개선 제안 3건 (Phase 7-5 후속 과제 후보). (1) wikilink 해석 여부를 검사하는 lint가 없어 category 이동 시 backlink가 조용히 깨진다. (2) `lint_style.py`의 금지 어휘 검사가 부분집합만 기계화돼 `축`, `포개다` 같은 표현은 자체 검토로만 잡힌다. `평가 축`, `N개 축`, `~ 축으로` 같은 좁은 패턴은 오탐 없이 기계화할 수 있다. (3) index.md 200자 게이트 측정 시 `grep -n`의 행번호 접두가 길이에 섞이므로 `grep -h`로 재야 한다.
- [x] 1-3. database paper 파일럿: `edge-2024-from-local-to-global` (GraphRAG 원논문). repo 경로는 physical-ai 파일럿(hku-mars-fast-lio)에서 검증돼 생략
  - 완료 (2026-09-06). 착수 시 압축비 0.46으로 파일럿 3편 중 가장 심했다. wiki 본문 6,491자에서 19,171자, 표 1개에서 15개, 압축비 1.19가 됐다. sources도 부록 수치(Table 4 전문, Appendix G 통계)를 보강해 13,978자에서 16,073자로 늘었다. lint 3종 전부 0건이고 physical-ai 게이트도 exit 0이다.
  - **Step 2.5와 Step 3 사이의 누락을 처음으로 확인했다.** 이 stem은 크롭 10개와 `figures.json`이 이미 있는데 sources와 wiki 어느 쪽에도 `figures:` frontmatter가 없고 `## 8. 그림 후보` 절도 없었다. sources에 후보 10개 전량을 스키마대로 기록하고(18줄에서 119줄), 8절 표를 신설하고, wiki에는 curated 4개만 복제했다(16줄에서 57줄). caption 10개는 크롭 이미지를 직접 열고 PDF 본문을 대조해 한글로 새로 썼다.
  - curated 4개는 fig01(파이프라인 전체 구조), fig03(chunk 크기와 self-reflection별 entity 검출), fig04(Leiden community 계층), fig02(승률 행렬)다. tab01에서 tab06까지 6개는 수치를 마크다운 표로 그대로 옮길 수 있어 이미지 대신 본문 표로 재현했다.
  - index.md 항목을 192자로 다시 쓰고 구분자를 `]]: `로 통일했다. `## 관련 페이지` 링크 8개는 전수 실재 확인했다.
  - 용어집 등재 후보 누적: 표기 흔들림 실측 3건(chunk 영문 59 대 청크 5, community 영문 38 대 커뮤니티 9, entity 영문 56 대 엔티티 8, 전부 영문 canonical 제안)과 graph RAG 도메인 신규 후보(sensemaking, query-focused summarization, community detection, modularity, map-reduce answering, graph index, gleaning, comprehensiveness와 diversity, empowerment, directness).
  - **부수 발견 (전 저장소 확인 완료): 같은 Step 2.5와 Step 3 누락이 13개 stem에 더 있다.** 크롭 이미지는 있는데 sources에 `figures:` 키가 없는 stem이다. database 6편(guo-2025-lightrag 15개, guo-2025-rag-anything 18개, li-2026-beyond-semantic-similarity 13개, shanbhogue-2026-gemini-embedding-2 11개, zhang-2026-leanrag 6개, zhang-2026-your-embedding-model 10개), agents 4편(dennis-2026-compiling 14개, lin-2026-harness-updating 23개, qiao-2026-memory-intelligence 17개, zou-2026-task-focused 30개), llms 2편(cai-2026-vlm3 7개, shumailov-2024-ununlearning 2개), applications 1편(kmyu-2026-akb-llmwiki-gbrain, 디렉토리는 있으나 이미지 0개)이다. 해당 배치에서 edge-2024와 같은 방식으로 처리한다.
  - **부수 발견: 고아 figures 디렉토리 1건.** `raw/papers/2511.18177v1-figures/`가 stem 규약이 아니라 arXiv id로 이름 붙어 있고 대응 sources가 없다. arXiv 2511.18177은 `lumer-2025-rethinking-retrieval-from-traditional-retrieval`이므로 배치 D4에서 stem 규약 이름으로 옮기고 frontmatter를 붙인다. 디렉토리 이동은 사람 지시가 있을 때만 하는 raw 변경이라 이번에는 기록만 한다.
  - 개선 제안 2건. (1) `-figures/`가 있는데 같은 stem sources에 `figures:` 키가 없는 상태를 잡는 lint(`lint_figures.py`)가 없어 이번 누락 14건이 조용히 남아 있었다. Phase 7-5 후속 과제 후보. (2) fig02 크롭이 `caption-region` 검출에서 Podcast 블록 제목 행과 열 헤더 일부를 놓쳤다. `--bbox fig02=10:...`로 재크롭할 여지가 있으나 raw 불변 규약에 따라 이번에는 캡션에 상단이 Podcast, 하단이 News임을 명시하는 것으로 대신했다.
  - 1차 게이트 기준을 확정한다: **재작성 후 sources 본문 기준**이다. sources 문체 정비로 본문이 늘면 게이트도 함께 올라간다. 이번에는 16,073자 기준으로 19,171자를 통과시켰다.
- [x] 1-4. 사용자 리뷰 게이트 (승인 후 배치 진행)
  - **승인 (2026-09-06).** 파일럿 3편의 재작성 품질을 승인하고 Phase 2 배치로 진행한다. 파일럿에서 확립한 규약을 배치 표준으로 굳힌다: wiki frontmatter는 curated 항목만 복제, caption 한글 정비, index.md 항목 200자 이내와 `]]: ` 구분자, raw 전문 재독으로 sources 누락분 복원.
  - 파일럿 3편 종합. 압축비는 0.65에서 1.85, 0.85에서 1.27, 0.46에서 1.19가 됐고 세 편 평균 1.44다 (착수 평균 0.65). 표는 4개에서 35개, wiki 본문 합계 19,887자에서 48,170자다. lint 3종 전부 0건이고 physical-ai 회귀 게이트도 유지된다. 전 저장소 지표는 lint_style error 9,202건에서 8,949건, lint_terms 270건에서 264건, caption 정비 대상 700건에서 682건으로 내려갔다.
  - 유형별 경로 3종이 전부 검증됐다. paper 경로는 PDF 부록 수치까지 표로 꺼내면 압축비 1.8대에 도달한다. article 경로는 sources 재추출 없이 raw 전문 재독만으로 산문 42% 증가를 만들고, 부수적으로 raw에 없는 주장을 검출하는 효과도 있다. figures 경로는 curated만 복제하는 규약이 frontmatter 243줄을 94줄로 줄인다.
  - **사용자 결정 2건.** (1) 계획 밖 문제 3건(figures 누락 14 stem, 그림 후보 표 id 불일치, HUMANIZE 잔재 10파일)은 별도 phase를 만들지 않고 각 배치가 그 stem 분량만큼 흡수한다. (2) 파일럿이 제안한 lint 도구 확장 3종을 배치 착수 전에 만든다 (아래 1-7 신설).
- [x] 1-5. write-wiki 스킬 v2.2.1. 파일럿 전후 발췌로 비-physical-ai before/after 예시 2~3쌍 추가
  - 완료 (2026-09-06). 140줄에서 169줄로 순증 29줄이다 (상한 30줄 이내). 기존 예시 3쌍의 인용문 본문은 바이트 단위로 보존했다. `git diff -U0`의 hunk 헤더가 구 65행에서 95행 구간을 하나도 건드리지 않고, 편집 전 스냅샷에서 같은 구간을 재추출한 diff도 0이다.
  - 예시 2쌍을 추가했다. 예시 4는 줄글에 묻힌 열거를 표로 꺼내는 교정(osmani-2026, agents)이고, 예시 5는 영문 병기 헤딩을 한글 단독 명사형으로 바꾸는 교정(osmani-2026 2행과 edge-2024 1행, agents와 database)이다. 전후 텍스트는 전부 파일럿 커밋 diff에서 뽑았고 after는 최종 파일에 실재함을 확인했다. 기존 3쌍이 다루던 압축 줄글 풀이, 화자 개입 제거, 수치 서술과 겹치지 않고 카테고리도 physical-ai에서 agents와 database로 벌렸다.
  - 예시 5에 운영 관찰 한 줄을 붙였다. 병기를 떼면서 절을 나누는 경우가 많은데, 헤딩 하나가 여러 주제를 담고 있었다는 신호라서 이름만 바꾸면 절 안의 압축이 남는다.
  - 파일럿 운영 지식 4항목을 본문에 반영했다. 1차 게이트가 재작성 후 sources 기준이라는 점은 §2 작업 순서 5번에, `audit_captions.py`는 §5 lint 블록에, figures 백필 절차는 §2 작업 순서 직후 신설 단락에, 관련 페이지 wikilink 실재 확인은 §5 체크리스트에 넣었다.
  - 판단 2건. (1) raw 재독의 무근거 주장 검출은 §2 예시가 아니라 작업 순서 2번에 넣었다. 문체 교정이 아니라 raw 대조로만 잡히는 다른 실패 유형이고, 작업 순서 2번이 독자가 실제로 행동하는 지점이다. (2) frontmatter 비대는 §5 체크리스트의 기존 항목에 근거와 실측치(243줄에서 94줄)만 괄호로 붙여 순증 0줄로 처리했다.
  - 부수 수정 1건. §2의 `"그쪽이 정본이다"`가 CLAUDE.md 문체 가이드의 "이쪽/그쪽 금지"를 스스로 어기고 있어 `"CLAUDE.md가 정본이다"`로 고쳤다. 스킬 파일의 lint_style warning이 4건에서 3건이 됐다. 남은 error 7건과 warning 3건은 전부 금지 패턴을 가르치려고 인용한 줄이고, 금지 기호 11회도 지정된 의도적 예외 5줄 안이다.
- [x] 1-6. physical-ai 고아 `9bow-2026-world-action-model-rise` wiki 신설. physical-ai-overview 커버리지를 77편으로 갱신하고 index.md Physical AI 절에 항목을 신설한다 (sources는 Phase 5-7에서 정비 완료라 wiki 1편 작업)
  - 완료 (2026-09-06). wiki 본문 18,064자, 산문 13,227자, 표 8개다. sources 본문 4,108자의 4.4배로, sources가 정비 완료 상태라 게이트가 낮게 걸리는 문제를 raw 전문 재독으로 넘어섰다 (1-2 파일럿이 검증한 경로). frontmatter 53줄에 curated 6개만 넣었다. `wiki/physical-ai/`가 76편에서 77편이 됐고 고아 sources는 5편에서 4편으로 줄었다.
  - **physical-ai 회귀 없음.** `--category physical-ai` 검사 파일이 154개에서 155개로 늘고 error 0 warning 0을 유지한다. overview 게이트도 exit 0이다.
  - raw 재독으로 복원한 세부 18항목. UniPi 사전 비용 근거(약 167 ZFLOP), LingBot-VA 구조, GR-1 계보, DreamZero backbone, RoboArena 4개 모델 점수, CALVIN 기준선, 연산량 6행 전체와 7.4배 격차, 비용이 벌어지는 이유(video 토큰 시퀀스가 약 10배 길다), 인프라 장벽, 추론 속도 590에서 800ms 대 Pi-0.5 약 190ms, Veo 3.1 실패 양상, action-as-image 세부, latent 계보, hybrid 4종, RFFM 경로, Zhang et al. 비교, 저자의 성격 고지, 관련 글 실제 개수다.
  - physical-ai-overview는 단순 숫자 치환 8곳 외에 재집계가 필요한 곳이 8건이었다. 태그 사용 횟수(vla 52에서 53, robot-learning 39에서 40, world-model 14에서 15), 태그 분포 비율(68%에서 69%), 자료 유형 article 31에서 32, 연도 2026년 31에서 32, 한국어 자료 20에서 21과 PyTorch KR 2편에서 3편, 클러스터 표의 "서베이와 그 해설" 10에서 11과 구성 내역, 분할 검토 표의 "world model과 생성" 7에서 8, `## 서베이 열 편` 제목이 `열한 편`으로다. 전 항목을 스크립트로 재집계해 검산했다.
  - 태그 상한 통계는 분자가 바뀌지 않았다. 태그 개수 히스토그램이 {2:7, 3:4, 4:46, 5:19}이고 새 페이지가 4개 버킷에 들어가 19/77 = 24.7%로 여전히 25%다.
  - 숫자만 고치지 않고 본문 세 곳에 실제 언급을 넣었다. B 트랙 3번 항목의 한국어판 링크, 서베이 표의 행, 클러스터 표의 구성 내역이다.
  - **sources 6절의 사실 오류를 정정했다** (오케스트레이터 직접 수정). "글 끝의 PyTorch KR 관련 글 4건"이 실제로는 7건이고(NVIDIA Cosmos 3, Isaac GR00T, Gemini Robotics, SmolVLA, Helix, Gemini Robotics ER 1.6, gWorld), 그중 Helix는 `9bow-2025-helix-generalist-humanoid-vla`로 이미 이 wiki에 있다. raw 원문 686행에서 710행을 근거로 확인했다. 정정하지 않으면 새 wiki 페이지의 정확한 서술과 sources가 서로 모순된다.
  - 문체 보정 1건 (오케스트레이터 직접 수정). `한국어 판`을 `한국어판`으로 붙여 썼다. CLAUDE.md 어휘 치환표가 분리형 `판`을 금지하고 `joonan30-llm-wiki-labs`가 이미 붙임꼴을 쓴다. index.md 항목의 `위 Reuss 2026`이라는 위치 참조도 페이지 이름 참조로 바꿨다 (index 순서가 바뀌면 깨지는 서술이다).
  - 용어집 등재 후보 9건 누적: WAM(world-action model), joint prediction, inverse dynamics 단독형, representation-only, action-as-image, latent plan, video backbone, ZFLOP, RoboArena. 기존 `Inverse Dynamics Model`, `latent`, `backbone` 세 행이 복합어만 잡고 단독형이나 다른 복합어를 놓치는 문제를 함께 검토한다.
  - 재사용할 패턴 1건. 번역 표기 대조표에서 `정책`, `월드 모델` 같은 금지 표기를 인용해야 할 때, 행마다 `lint-terms: ignore`를 다는 대신 인라인 코드(백틱)로 감싼다. 두 lint 모두 인라인 코드를 마스킹하고 "표기 자체를 인용한다"는 의미도 코드 스팬이 정확하다.
  - 개선 제안 2건. (1) `lint_style.py --strict`가 error에만 exit 1을 내고 warning에는 0을 낸다(스크립트 353행). 게이트를 `--strict`로 잠그려면 warning도 비영 종료로 올릴지 결정이 필요하다. (2) 한 raw 아카이브를 두 wiki 페이지가 공유하면 `wiki/assets/`에 같은 이미지가 stem별로 이중 저장된다 (이번 6장 약 630KB). 규약상 맞지만 사례가 늘면 공유 규칙이 필요하다.
- [x] 1-7. lint 도구 확장 3종 (계획 밖 신규 항목, 파일럿 제안과 사용자 결정 2026-09-06). 배치 착수 전에 만들어 품질 게이트를 촘촘히 한다. 기존 두 스크립트의 기본 동작과 훅 JSON 출력은 불변으로 유지하고, `--category`와 `--strict`, `--json` 인자 규약을 승계한다
  - 완료 (2026-09-06). 세 작업 모두 착수 실측까지 마쳤다. 위반 정리는 이번 범위가 아니고 배치가 흡수한다 (physical-ai 0건 유지를 위한 2건만 예외로 고쳤다).
  - **불변 검증 통과.** `lint_terms.py`는 `--all`, `--all --json`, 훅 형태 세 경로 전부 바이트 단위 동일하다. `lint_style.py`는 신규 `axis-misuse` 94건 외에 추가도 삭제도 0이고, 요약행의 warning 206건이 300건으로 바뀐 것이 유일한 차이다. error 8,949건과 검사 파일 446개, 해당 파일 278개는 불변이다. physical-ai 게이트 2줄 모두 exit 0이고 신규 두 스크립트도 `--category physical-ai --strict`가 exit 0이다.
  - (a) 완료. `scripts/lint_figures.py`가 stem 219개를 검사해 error 222건, warning 2건을 낸다. rule은 `figures-missing` 12건(error), `wiki-uncurated-figure` 210건(error), `empty-figures-dir` 1건, `orphan-figures-dir` 1건이고 `curated-mismatch`와 파일 실재 rule은 0건이다.
  - (a) **예상치 14건과의 차이는 스크립트가 아니라 계획서 기록이 원인이다.** 284행이 나열한 13 stem에 이미 `kmyu-2026-akb-llmwiki-gbrain-comparison`(이미지 0장)이 포함돼 있는데 그것을 다시 따로 세어 14를 만들었다. 실제 구성은 크롭 있는 누락 12건 + 빈 디렉토리 1건 + 고아 1건 = 디렉토리 단위 14건이고, 카테고리 분해(database 6, agents 4, llms 2, applications 1)는 기록과 일치한다.
  - (a) **`wiki-uncurated-figure` 210건이 새 발견이다.** wiki frontmatter에 `curated: false` 항목이 남아 있는 것으로, 계획서 2-3절의 "frontmatter 100줄 초과 18편"을 rule 단위로 계량한 값이다. agents 109, llms 41, evaluations 32, database 24, applications 4다.
  - (a) 오탐 억제 3건을 규약 근거로 넣었다. `type: repo`는 `-figures/`를 만들지 않고 in-place 참조하므로 `raw:` 실재 검사에서 제외한다(118건 → 0건). `raw:`가 http(s) URL이면 건너뛴다(repos 절 규약). wiki figures의 `from_source:` 키가 있으면 sources 대조에서 뺀다(`reuss-2026`의 kr05에서 kr22 6건이 `9bow-2026-world-action-model-rise`에서 빌려온 도식이다).
  - (b) 완료. `scripts/lint_links.py`가 파일 446개를 검사해 error 1건, warning 153건을 낸다. rule은 `link-unresolved` 1건(error), `bare-wikilink` 143건, `link-outside-vault` 4건, `bare-link-unresolved` 6건이다. 이미지 임베드 544개는 전부 해석돼 `embed-missing` 0건이다.
  - (b) 개발 중 오탐 61건을 잡아 고쳤다. 마크다운 표 안에서 `|`가 `\|`로 이스케이프되는 별칭 링크 57건이 `wiki/overviews/physical-ai-overview.md` 한 파일을 통째로 미해석으로 만들고 있었고, `[[sources/...]]` 같은 Vault 밖 참조 4건은 파일이 실재하므로 별도 warning rule로 분리했다.
  - (b) **진짜 깨진 링크 2건 중 1건을 고쳤다** (오케스트레이터 직접 수정). `wiki/applications/shamsi-2026-graphify-knowledge-graphs-for-ai.md:101`의 `[[applications/dsba-2026-paper-review-graph-based-rag]]`가 카테고리 오기였다. 실제 페이지가 `wiki/database/`에 있어 판단 여지 없는 버그라 즉시 고쳤다. 남은 1건 `sources/datasciencedojo-2026-llm-wiki-by-andrej-karpathy.md:74`의 `[[applications/karpathy-2024-software-3-llms]]`는 저장소 어디에도 없는 페이지이고 본문도 "확인 필요"라 적고 있어 배치 B3의 판단 사항으로 남긴다.
  - (b) `bare-wikilink` 143건(sources 129, wiki 14)은 전부 실재 페이지로 풀리지만 `[[category/stem]]` 규약을 지키지 않은 것이다. 배치가 흡수한다.
  - (c) 완료. `axis-misuse` rule을 신설했다(warning). 전 저장소 94건이고 agents 50, applications 18, overviews 10, database 8, llms 4, evaluations 3, etc 1, **physical-ai 0**이다. sources 47, wiki 41, index.md 6이다.
  - (c) 초기 패턴이 physical-ai에서 8건을 잡았다. 6건은 오탐이라 패턴을 좁혔다. 앞 문맥 없이 `축으로`를 잡는 패턴이 pixel shuffle의 "채널 축으로 접어", OBB의 "잘못된 축으로 잡으면" 같은 진짜 좌표축 용례를 잡았는데, CLAUDE.md가 좌표축 의미는 허용하는 자리다. 나머지 2건은 진짜 위반이라 고쳤다: `sources/9bow-2026-world-action-model-rise.md:215`의 `세 축` (같은 파일 fig05 caption이 이미 "세 가지 기준"이라 표기가 어긋나 있었다), `sources/amin-2025-pistar06-a-vla-that-learns.md:268`의 `관련 연구의 한 축`.
  - (c) 94건의 매치 문자열 전수 집계는 `두 축` 27, `세 축` 26, `다섯 축` 11, `6개 축` 10, `네 축` 5, `평가 축` 4, `설계 축` 4, `한 축` 3 등이고 좌표와 회전, 채널, x와 y와 z가 앞에 붙은 건은 0건이다. `압축`, `구축`, `좌표축`, `축소`는 전부 통과한다.
  - (c) `banned-vocab`에 합치지 않고 별도 rule로 뒀다. `RE_BANNED_VOCAB`은 문맥을 안 보는 리터럴 묶음이고 그 위 주석이 "판/축/벌/기둥은 오탐이 커서 가이드로만 관리"라고 축을 명시적으로 배제한 자리다. 축은 앞 문맥을 봐야 하는 다른 종류의 규칙이고, rule을 나눠야 훅 JSON과 배치 보고에서 신규 94건을 기존 어휘 backlog와 섞지 않고 추적할 수 있다.
  - **훅 연동 판단: (c)는 자동 연동됐고 (a)(b)는 지금 붙이지 않는다.** `axis-misuse`는 `lint_style.py`의 기존 warning 경로를 타므로 훅 스크립트와 `settings.json`을 고칠 필요가 없다. (a)(b)를 지금 붙이지 않는 이유는 지연이 아니라(각 0.03초에서 0.04초로 기존과 같다) 두 가지다. 첫째, 두 스크립트가 배치가 앞으로 처리할 대형 backlog를 들고 있어(`wiki-uncurated-figure` 210, `bare-wikilink` 143) 파일 하나를 저장해도 방금 한 편집과 무관한 경고가 매번 뜨고, 훅 메시지가 상위 10건에서 잘려 정작 새 위반이 밀려난다. 둘째, 두 검사가 edit-local이 아니다. `lint_figures`는 한 stem의 sources와 wiki, raw를 함께 대조해 Step 4 진행 중 정상적인 과도기 불일치를 잡고, `lint_links`는 링크 대상 페이지를 아직 안 만든 시점의 저장에서 error를 낸다. 배치가 backlog를 0으로 내린 뒤 Phase 7에서 다시 판단한다.

- [x] 1-8. lint 도구 확장 4종째: `lint_figures.py`에 `candidate-table-mismatch` 규칙 신설 (계획 밖 신규 항목, A8 배치의 제안에서 파생). sources 본문 `## 8. 그림 후보` 표의 id 열과 frontmatter `figures[].id`를 대조한다
  - 완료 (2026-09-07). **8절 표 id 밀림이 A2, A5, A8에서 4개 stem 연속으로 나왔고 매번 담당 subagent가 수동으로 발견했다.** 남은 배치에 figures 보유 stem이 많아 기계 검사로 돌리는 편이 확실하다. `audit_captions.py`는 frontmatter caption만 보고 8절 표를 보지 않아 이 결함이 계속 통과했다.
  - 구현은 새 함수 `parse_candidate_table()`과 `lint_stem()` 안의 대조 블록이다. 표의 첫 열을 id로 보고 헤더 행과 구분 행을 건너뛴다. 세 가지를 잡는다: 표에 있는 id가 frontmatter에 없는 경우(유령 행이거나 밀림), frontmatter에 있는 id가 표에 없는 경우, 표 안의 id 중복이다. severity는 기존 `curated-mismatch`와 같은 warning으로 뒀다.
  - **기본 동작 불변 확인.** error 총계 171건이 패치 전후 동일하고(신규 규칙은 warning 전용), `--json`과 파일 단위 호출 경로가 그대로다. 계획서 6절 1항의 physical-ai 게이트 두 명령은 `lint_style`과 `lint_terms`라 영향이 없고 둘 다 exit 0을 유지한다. `lint_figures.py`는 Phase 1-7 판단에 따라 훅에 붙지 않은 상태라 훅 영향도 없다.
  - **착수 실측 272건, 27개 stem.** 카테고리 분해는 physical-ai 158건(16 stem), agents 이하 비-physical-ai 114건(11 stem)이다.
  - 규칙 정확성을 완료본으로 역검증했다. A2와 A5, A8에서 8절 표를 고친 7개 stem(zhang-2026, bai-2026, yang-2026, zhao-2026, google-sdlc, lin-2026, he-2026)과 파일럿 edge-2024가 전부 0건이다.
  - **파일럿 1-1이 예고한 문제가 physical-ai에 그대로 남아 있음이 확인됐다.** 파일럿은 "해당 절을 가진 sources 112편에 같은 문제가 남아 있을 수 있다"고 적었고 실제로 `brohan-2022-rt-1`은 frontmatter에 id 26개(fig01~13, tab01~13)가 있는데 8절 표에는 10개만 있고 그중 `fig17`과 `fig22`는 frontmatter에 존재하지 않는다. 2026-08 정밀 크롭 전환 이전 순번 잔재다. 오탐이 아니다.
  - **physical-ai 158건의 처리는 Phase 2 범위 밖이다.** physical-ai는 ingest-upgrade-plan Phase 1~5로 완료 선언된 카테고리인데, 그 완료 시점에는 `lint_figures.py`가 없었고 `audit_captions.py`가 8절 표를 검사하지 않아 이 결함이 드러날 경로가 없었다. **처리 방침은 사용자 결정 사항으로 남긴다** (Phase 7-5 후보). 비-physical-ai 114건은 각 배치가 그 stem 분량만큼 흡수한다.

### Phase 2. agents 배치 재작성 (A1~A13, 66편 = 기존 63 + 신규 3)

파일럿 2편(cemri-2025, osmani-2026-loop-engineering)은 소속 배치에서 제외한다. 실제 배치 작업량은 64편이다.

**착수 기준선 갱신 (2026-09-06).** Phase 1 진행 중 다른 경로로 agents wiki 2편이 추가돼 61편에서 63편이 됐다. `magnitudedev-magnitude`(repo)와 `mattpocock-skills`(repo)이고 둘 다 이미 lint 0건에 표를 각각 11개와 15개 갖춘 새 기준 산출물이다. 압축비는 mattpocock 1.33, magnitude 1.05다. mattpocock은 기준 안이라 재작성 대상에서 빼고, magnitude는 2-3절이 정한 판정(압축비 1.03에서 1.23 구간은 교재식 기준 미달로 보고 범위에 넣는다)에 따라 배치 A13에 넣는다. index.md Agents 절 항목 수도 64개에서 66개가 된다.

- [x] A1 Agent Skills 표준 (5편): anthropic-2025-equipping-agents-for-the-real, agentskills-agentskills, agentskills-io-2026-agent-skills-overview, osmani-2026-agent-skills, hada-2026-agent-skills
  - 완료 (2026-09-07). 5편 전부 게이트를 통과했다. wiki 본문 합계 10,920자에서 41,048자로 3.76배가 됐고 표는 4개에서 34개다. 압축비 중앙값 0.65에서 1.60, 최소값 0.56에서 1.46이다. 편별로는 anthropic-2025 0.93에서 1.46, agentskills-agentskills 0.72에서 1.71, agentskills-io 0.65에서 1.47, osmani-2026-agent-skills 0.61에서 1.60, hada-2026 0.56에서 1.84다.
  - sources도 문체 정비로 합계 15,713자에서 25,642자, 표 4개에서 15개가 됐다. 번호 붙은 영문 병기 헤딩은 규약대로 유지했다.
  - lint 4종 0건. 10개 파일에 lint_style error 0 warning 0, lint_terms 0, audit_captions 0, lint_links error 0 warning 0이다. lint_figures도 A1 stem 위반 0건이다. `lint-style: ignore`와 `lint-terms: ignore` 예외는 한 건도 쓰지 않았다.
  - 카테고리 총계 감소: agents error 3,394건에서 3,198건(-196), warning 139건에서 133건(-6), 위반 파일 122개에서 112개(-10), lint_terms 116건에서 115건(-1)이다. physical-ai 회귀 게이트 두 줄 모두 exit 0을 유지한다.
  - caption 정비 6건. anthropic-2025의 fig01에서 fig06까지 전량을 크롭 이미지와 원문을 대조해 한글로 다시 썼고 영어 전용 2건과 중간점 1건을 해소했다. 본문 캡션의 `Figure N` 번호가 fig id와 어긋나 있던 것(fig04를 Figure 3으로, fig03을 Figure 4로 부르던 오기)도 함께 맞췄다. sources 8절 표의 `추천` 열은 diff로 불변을 확인했다.
  - **raw 재독이 무근거 주장 15건을 잡았다.** 파일럿 1-2가 검증한 경로가 배치에서도 그대로 작동한다. 대표 사례는 anthropic-2025의 "오픈 표준으로 공개됐다"(원문은 네 곳 지원만 말한다), agentskills-io의 "헬스케어"(42개 클라이언트 목록에 없다)와 "40여 개"(실측 42개), osmani-2026-agent-skills의 면책 고지와 저자 소속(자매 자료 osmani-2026-loop-engineering의 raw에서 잘못 전이됐다), agentskills-agentskills의 "코드보다 문서에 무게가 실린 저장소"(비중 근거 없음)다.
  - index.md 5항목을 303, 223, 241, 313, 238자에서 200, 165, 191, 186, 176자로 줄이고 구분자를 `]]: `로 통일했다. Agents 절 200자 초과는 55개에서 50개가 됐다.
  - 용어집 등재 후보 8건 누적 (등재하지 않음, Phase 7-1 소관): procedural knowledge, trigger, cross-vendor, skills-compatible agent, exit criteria, checkpoint, anti-rationalization table, slash command. `deterministic`은 "결정적 증거" 같은 일반어 용법이 섞여 금지 표기 등재에 반대 의견이 붙었다.
  - 부수 발견 2건. (1) `wiki/overviews/agent-skills-overview.md`가 미정비 상태다. `## 축 1 —` 같은 헤딩에 em dash와 축 오용, `## 개괄 (Overview)` 병기 헤딩, "한 문장으로 줄이면" 화자 개입이 남아 있다. Phase 6 소관이다. (2) 슬래시 커맨드 개수가 자료 간에 어긋난다. hada-2026은 7개, osmani-2026-agent-skills는 단계별 매핑 6개를 적고 나머지 하나의 정체는 두 자료 어디에도 없다. 양쪽 wiki에 미확인 사항으로 명시했다.
- [x] A2 스킬 최적화와 조합 (5편): microsoft-skillopt, yang-2026-skillopt-executive-strategy-for, zhao-2026-generative-skill-composition-for-llm, imbad0202-academic-research-skills, llmsresearch-paperbanana
  - 완료 (2026-09-07). wiki 본문 합계 24,068자에서 105,517자로 4.38배가 됐고 표는 2개에서 81개다. 압축비 중앙값 0.62에서 1.45, 최소값 0.56에서 1.30이다. 편별로는 microsoft-skillopt 0.84에서 1.40, yang-2026 0.56에서 1.45, zhao-2026 0.62에서 1.47, imbad0202 0.60에서 1.30, paperbanana 0.85에서 1.45다.
  - sources도 합계 37,346자에서 74,181자, 표 3개에서 31개가 됐다. zhao-2026은 12,053자에서 21,206자로 늘어 1차 게이트가 함께 올라갔고 wiki가 31,243자로 그것을 넘었다. 게이트가 재작성 후 sources 기준이라는 파일럿 1-3의 확정이 실제로 작동한 사례다.
  - lint 5종 0건. 10개 파일에 lint_style error 0 warning 0, lint_terms 0, audit_captions 0, lint_links 0, lint_figures 0이다.
  - 카테고리 총계 감소: agents error 3,198건에서 2,988건(-210), warning 133건에서 117건(-16), 위반 파일 112개에서 102개(-10), lint_terms 115건에서 109건(-6)이다. physical-ai 회귀 게이트 두 줄 모두 exit 0을 유지한다.
  - caption 정비 44건 (yang-2026 22건, zhao-2026 22건). 금지 기호 20건과 영어 전용 24건이고 크롭 이미지를 전부 열어 PDF 본문과 대조해 한글로 다시 썼다. sources frontmatter, wiki frontmatter, sources 8절 표 caption 열 세 곳을 같은 문구로 통일했다.
  - **`wiki-uncurated-figure` 15건 해소** (210건에서 195건). yang-2026 wiki frontmatter가 126줄에서 55줄로(curated 4개), zhao-2026이 155줄에서 75줄로(curated 5개) 줄었다. sources는 11개와 13개 전량을 유지해 트레이서빌리티를 보존한다.
  - raw 재독이 무근거 주장 33건을 잡았다. 대표 사례는 microsoft-skillopt의 "배포 비용 0"(raw는 추가 모델 호출 0회만 말하고 300에서 2,000 토큰의 컨텍스트 비용은 별개다), paperbanana의 provider 가격 귀속 오류(이미지당 0.134달러는 gemini-3-pro-image-preview 값인데 VLM인 gemini-2.5-flash에 붙어 있었다), imbad0202의 star 수 38,333과 생성일(raw에 언급 자체가 없다), zhao-2026의 gold-skill 상한 혼동(45.3%는 oracle retrieval 44.0%를 넘고 curated gold 51.1%에는 5.8%p 못 미친다)이다.
  - **파일럿 1-1이 예고한 8절 표 id 불일치가 zhao-2026에서 실제로 확인됐다.** 표가 fig01에서 fig08까지로 한 칸씩 밀려 있고 존재하지 않는 "false positive" 행까지 있었다. 13행으로 맞추고 page와 strategy도 frontmatter 값으로 정정했으며 `추천` 열은 그대로 옮겼다.
  - **legacy figure 중복 curated 1건을 해소했다.** yang-2026의 `fig04`가 frontmatter에 "오탐, 실제 도식 아님"으로 적혀 있었으나 크롭을 열어 보니 정상 검출된 Figure 4였고(`figures.json`도 `caption-region`, `area_frac` 0.148, `low_confidence: false`), legacy 전면 캡처 `fig05`와 같은 도식이 둘 다 curated였다. 정밀 크롭을 올리고 legacy를 내렸다. 저장소 전수 확인 결과 legacy 항목이 curated인 stem은 cemri-2025(파일럿 1-1에서 해소)와 yang-2026 둘뿐이라 확산 위험은 없다.
  - index.md 5항목을 413, 551, 510, 306, 402자에서 166, 189, 190, 162, 180자로 줄였다. Agents 절 200자 초과는 50개에서 45개가 됐다.
  - 용어집 등재 후보 12건 누적 (Phase 7-1 소관): rollout(Phase 0-3 이관분과 중복), ablation, cardinality, provider, 매니페스트, caption, VLM-as-a-Judge, backend, sycophancy, human-in-the-loop, provenance, 닫힌 어휘. 별도 판단 항목으로 **skill 복합어 예외 방침**이 있다. glossary-agents의 canonical은 음차 "스킬"인데 skill library, skill composition, skill sequence처럼 복합어 전체가 용어 체계인 논문에서는 음차화가 "스킬 library" 같은 반쪽 번역을 만든다. A2 5편은 복합어에 한해 원어 skill로 통일했고 금지 표기 열이 비어 lint는 통과한다. 용어집에 이 예외를 명문화할지 결정이 필요하다.
  - 부수 발견 2건. (1) 논문 자체의 내적 수치 모순 5건을 확인해 wiki에 유보 문구로 기록했다. yang-2026은 분할 비율(부록 C 2:1:7 대 Table 2(a) 캡션 4:1:5)과 DocVQA, ALFWorld 배수 서술이 표 수치와 어긋나고, zhao-2026은 Table 3과 Table 4의 본문 델타가 표 값과 다르며 Table 6의 LLM-judge 행이 Table 1과 어긋난다. 전부 표 수치를 기준으로 삼았다. (2) `lint_style.py`의 `RE_BANNED_VOCAB`이 CLAUDE.md 어휘 치환표의 부분집합이라 얹다, 끼우다, 무너지다, 판, 벌, 기둥은 기계 검사를 통과한다. 파일럿 1-2의 개선 제안 (2)와 같은 지적이고 이번에 paperbanana의 "바로 얹도록", "바꿔 끼운다"가 실제로 lint를 통과하고 있었다. Phase 7-5 후속 과제 후보다.
- [x] A3 Harness engineering (6편): lee-hoyeon-2026-harness-engineering, ai-boost-awesome-harness-engineering, walkinglabs-learn-harness-engineering, lin-2026-harness-updating-is-not-harness-benefit, seans-ai-stories-2026-agent-harness-loop-engineering, he-2026-agent-lightning-v1-0-towards-harnessed
  - 완료 (2026-09-07). wiki 본문 합계 38,326자에서 128,687자로 3.36배가 됐고 표는 15개에서 109개다. 압축비 중앙값 0.69에서 1.26, 최소값 0.46에서 1.10이다. 편별로는 lee-hoyeon 0.46에서 1.22, awesome-harness 0.61에서 1.75, walkinglabs 0.76에서 1.41, lin-2026 0.65에서 1.10, seans-ai-stories 0.74에서 1.30, he-2026 0.77에서 1.15다.
  - sources도 합계 60,352자에서 104,163자, 표 14개에서 70개가 됐다. lin-2026은 18,694자에서 31,451자, he-2026은 10,201자에서 21,379자로 늘어 두 편 모두 게이트가 크게 올라갔고 그만큼 압축비가 1.1대에 머물렀다. 실험 수치를 깎아 목표에 맞추지 않는다는 원칙에 따라 1차 게이트 통과로 마감했다.
  - lint 5종 0건. 12개 파일에 lint_style error 0 warning 0, lint_terms 0, audit_captions 0, lint_links 0, lint_figures 0이다.
  - 카테고리 총계 감소: agents error 2,988건에서 2,591건(-397), warning 117건에서 103건(-14), 위반 파일 102개에서 90개(-12), lint_terms 109건에서 85건(-24)이다. physical-ai 회귀 게이트 두 줄 모두 exit 0을 유지한다.
  - **figures 백필 1건 완료.** lin-2026의 크롭 23장을 sources frontmatter에 전량 `curated: false`로 기록하고 `## 8. 그림 후보` 절을 신설했다(frontmatter 12줄에서 243줄). curated 5개(fig01 self-evolution 순환 구조, fig02 두 발견 요약, fig04 procedural isomorphism 사례, fig06 비단조 곡선, fig07 실패 모드 trajectory)를 wiki에 복제했고 수치 표 tab02에서 tab07까지는 파일럿 edge-2024 방식대로 이미지 대신 본문 마크다운 표로 재현했다. `figures-missing`이 12건에서 11건이 됐다.
  - caption 정비 20건 (he-2026, 전부 금지 기호). `wiki-uncurated-figure`도 he-2026에서 7건 해소해 195건에서 188건이 됐다 (wiki frontmatter 144줄에서 74줄).
  - raw 재독이 무근거 주장 약 36건을 잡았다. 대표 사례는 walkinglabs의 "harness 유무"(raw는 harness quality만 말한다), awesome-harness의 항목 수 393개(목차 최상위 8줄을 포함한 grep 값이고 실측 385개다), lee-hoyeon의 "3개월 후 30%에서 85%"(개선 추이가 아니라 같은 시점의 두 프로젝트 비교값이다)와 "Lewis et al. 2020의 RAG 흐름"(raw에 RAG 언급 자체가 없다), he-2026의 "2025년 원본 논문을 전면 재작성한 후속 버전"(논문은 소프트웨어 재구현을 말한다), lin-2026의 저자 명시 한계 3개(논문 6절은 2개만 명시하고 나머지는 부록에서 파생한 관찰이다)다.
  - **텍스트 레이어가 없는 PDF를 처음 만났다.** `raw/articles/lee-hoyeon-2026-harness-engineering.pdf`는 54페이지 전부가 이미지이고 pypdf와 pymupdf 모두 0자를 낸다(tesseract 미설치). Read 도구로 54페이지를 이미지로 판독해 재독했고 그 결과 슬라이드 2장이 sources에 통째로 빠져 있었음을 확인했다. 이 경로는 압축비 0.46을 1.22로, 표 6개를 36개로 올렸다. 슬라이드 deck 형태의 PDF에 재사용할 수 있는 방법이다. 다만 판독 신뢰도 주의 1건이 남는다(16페이지 훅 라벨 "Stop(일지)"는 확정 텍스트가 아니다).
  - **크롭 결함 1건 기록.** lin-2026의 `tab01`은 캡션 영역만 잡히고 표 본문이 `fig06` 크롭에 함께 들어가 있다. `caption-region` 폴백이 인접 요소를 삼킨 사례다. `--force` 금지 수칙에 따라 재크롭하지 않고 caption과 8절 표에 사실을 명기했다. `fig06`은 반대로 Table 1까지 함께 담겨 정보량이 늘었다.
  - index.md 6항목을 204, 249, 406, 264, 328, 718자에서 172, 188, 200, 195, 189, 197자로 줄였다. Agents 절 200자 초과는 45개에서 39개가 됐다.
  - 용어집 등재 후보 24건 누적 (Phase 7-1 소관): overreach, AGENTS.md, design primitive, meta-harness, prompt injection, lucky pass, agent run, working memory, tracing, eval, latency, consolidation, rollout, advantage, retokenization, collocated, idempotent, Sprint Contract, AI Slop, Ralph Loop, harness self-evolution, evolver, base capability, adherence. **A2의 skill 복합어 예외와 같은 성격의 판단이 memory에서도 나왔다.** glossary-agents의 canonical은 음차 "메모리"인데 episodic memory, working memory 같은 복합어는 원어라서 한 문서에 섞으면 원어와 번역어 혼용이 된다. A3의 video 편은 전부 원어 memory로 통일했다. Phase 7-1에서 skill과 memory 두 건을 같은 방침으로 처리한다.
  - 부수 발견 3건. (1) 자료 자체의 결함 4건을 확인해 문서에 명기했다. awesome-harness는 상단 Contents 목차에 Production Infrastructure 절 16개 항목이 누락돼 목차만 따라 읽으면 운영 자료를 통째로 놓친다. walkinglabs README는 15개 언어를 선언하고 14개만 나열한다. lee-hoyeon deck은 `.dev/`의 정의가 14페이지와 15페이지에서 다르다. lin-2026은 회귀 셀 17개(evolver 9, agent 8)를 본문에서 다루지 않는데 `Δ_benefit`이 max 집계라 최종 표에서 하락이 보이지 않는 구조 때문이다. (2) seans-ai-stories transcript의 자동 자막 오인식 3건을 새로 판정했다(Superbase는 Supabase, Deep Seek은 DeepSeek, 첫 문장 "Everyone's John"은 도입 인사말 오인식). 기존 4건과 합쳐 sources 1절에 판정 근거와 함께 표로 정리했다. (3) **A3 6편이 전부 harness engineering 주제라 overviews 합성 페이지의 소재가 갖춰졌다.** lin-2026이 그 계열의 유일한 정량 근거이고 "harness evolution이 언제 역효과를 내는가"가 후보 주제다. `wiki/overviews/agent-harness-engineering-overview.md`가 이미 있으므로 Phase 6에서 재작성할 때 이 6편을 반영한다.
- [x] A4 Loop engineering (5편, 파일럿 1편 제외): runkle-2026-the-art-of-loop-engineering, movez-2026-loop-engineering-for-trading-agents, lee-jeongmin-2026-loop-engineering-claude-code, kang-2026-no-longer-prompting-claude, luis-carrijo-2026-claude-code-team-just-dropped
  - 완료 (2026-09-07). wiki 본문 합계 27,143자에서 74,135자로 2.73배가 됐고 표는 3개에서 59개다. 압축비 중앙값 0.84에서 1.28, 최소값 0.66에서 1.14다. 편별로는 runkle 0.85에서 1.28, movez 0.84에서 1.27, lee-jeongmin 0.66에서 1.14, kang 0.74에서 2.15, luis-carrijo 0.88에서 1.47이다.
  - sources는 합계 34,982자에서 54,148자, 표 5개에서 31개가 됐다. 다만 두 편은 **줄었다**. lee-jeongmin이 12,247자에서 8,189자, kang이 무근거 서술을 덜어낸 뒤 표 신설로 3,195자에서 3,609자다.
  - lint 5종 0건. 10개 파일에 lint_style error 0 warning 0, lint_terms 0, audit_captions 0, lint_links 0, lint_figures 0이다.
  - 카테고리 총계 감소: agents error 2,591건에서 2,176건(-415), warning 103건에서 99건(-4), 위반 파일 90개에서 80개(-10), lint_terms 85건에서 75건(-10)이다. physical-ai 회귀 게이트 두 줄 모두 exit 0을 유지한다.
  - caption 정비 36건 (runkle 16건, movez 20건, 전부 금지 기호). `wiki-uncurated-figure`는 movez에서 5건 해소해 188건에서 183건이 됐다 (wiki frontmatter 75줄에서 45줄).
  - **sources가 raw보다 큰 두 편에서 창작 서술을 걷어냈다.** 이 배치의 가장 중요한 산출물이다. lee-jeongmin은 raw 3,230자에 sources 12,247자였고, HUMANIZE 블록 1,417자를 뺀 **약 2,640자가 raw 대조로 잘라낸 창작**이었다. 패턴 표의 `적용 사례` 열 전체, 다섯 building block의 역할 설명 5줄, 존재하지 않는 리다이렉트 URL, "WebFetch 기준 21시간 전" 같은 도구 출력을 자료 사실로 승격한 서술, 계정 성격 추정이 포함된다. kang은 약 900자를 삭제했고 세 가지 리스크의 정의 전량과 "3대 부채"라는 명명 오류가 주된 항목이다. 게이트가 정비 후 sources 기준이라 두 편 모두 게이트가 내려간 채로 통과했다.
  - **raw 자체가 원문 전문이 아닌 사례를 처음 확인했다.** `raw/articles/kang-2026-no-longer-prompting-claude.md`는 LinkedIn 차단으로 WebFetch가 돌려준 요약본이다. CLAUDE.md가 "WebFetch는 기사 수집에 쓰지 않는다"고 못박은 이유가 그대로 나타난 경우이고, 그 결과 sources가 요약본에 없는 내용을 채워 넣고 있었다. raw 불변 규약에 따라 파일은 건드리지 않고 wiki와 sources에 "수집본은 이름만 전한다"는 근거 범위를 명시했다. 재수집 여부는 Phase 7-5 판단 사항이다.
  - raw 재독이 무근거 주장 약 25건을 잡았다. 대표 사례는 luis-carrijo의 "중개 수수료 1만 달러 절감"(원문은 절감 항목을 특정하지 않는다)과 "처음으로 공개적으로 시각화"(최초 주장 없음), runkle의 저자 귀속 오류("저자의 표현으로는"이 실제로는 `Industry leaders characterize`다)와 hedge 소실(`potentially the most critical`을 단정으로 옮겼다), movez의 five-beat 오정의(sources가 raw 마지막 단락의 3-loop 순환과 fig01의 다섯 박자를 혼동했다)다.
  - **movez에서 자료 자체의 자기모순을 발견했다.** fig08 한 화면에 마케팅 카드(+366.15%, Sharpe 6.28)와 실제 Studio 실행 결과(+7.61%, Sharpe 0.68)가 함께 있다. 저자가 배포 판단 지표로 내세운 Sharpe에서 약 8배 차이다. 기존 wiki는 카드 수치만 인용해 이 모순을 놓치고 있었고 결과 절과 한계 절 양쪽에 반영했다.
  - **교차 자료 모순 1건을 기록했다** (오케스트레이터 직접 수정). Peter Steinberger의 소속이 `raw/articles/osmani-2026-loop-engineering.md`에서는 Anthropic, `raw/articles/lee-jeongmin-2026-loop-engineering-claude-code.md`에서는 OpenClaw다. 우리 두 페이지는 각자 자기 raw를 정확히 반영한 것이라 어느 쪽도 오기가 아니다. 웹 검색 금지 규칙상 외부 확인을 하지 않고, 파일럿 완료본 `osmani-2026-loop-engineering`의 wiki와 sources에 두 원자료가 어긋난다는 사실과 각 페이지가 자기 원문을 따른다는 방침을 적었다. 두 파일 lint 3종 재검증 0건이다.
  - **자동 자막 오인식 10건을 새로 판정했다** (luis-carrijo). cloud와 clot와 claw code는 Claude Code, CloudMD는 CLAUDE.md, enthropic은 Anthropic, Vortex AI는 Vertex AI, 3JS와 Canon은 three.js와 Cannon, beat는 Vite, mpm run과 sf read file은 npm run과 fs.readFile, quadify는 claudify다. 판정 보류 3건은 한계 절에 불확실성으로 남겼다. A3의 seans-ai-stories 7건과 같은 방식이다.
  - index.md 5항목을 295, 371, 349, 288, 366자에서 179, 157, 193, 199, 196자로 줄였다. Agents 절 200자 초과는 39개에서 34개가 됐다.
  - 용어집 등재 후보 12건 누적 (Phase 7-1 소관): RLM, dynamic workflow, KV cache hit, grader, trace, heartbeat, rubric, permission fatigue, plan mode와 auto mode, messages array, verifier gate, regime. **`sub-agent` 표기 실태 점검 항목이 추가됐다.** 이미 등재된 용어인데 금지 표기가 "하위 에이전트"뿐이라 lint가 원어 사용을 잡지 않고, `wiki/agents/` 전체에서 원어 45회 대 서브에이전트 30회로 갈려 있다. A2의 skill, A3의 memory와 함께 복합어와 canonical 방향을 한 번에 정리한다.
  - 부수 발견 2건. (1) `wiki/overviews/prompt-to-loop-engineering-evolution-overview.md`의 4단계 표에서 harness 단계 attribution("Mitchell Hashimoto, 2026-02")이 **kang-2026 요약본 한 건에만 근거한다.** `wiki/agents/lee-hoyeon-2026-harness-engineering`에는 Hashimoto 언급이 0건이고 overview 자신도 각주에서 "이 배열은 kang-2026을 따랐다"고 밝힌다. Phase 6에서 overview를 재작성할 때 교차 검증 미완 표시를 단다. (2) `measure.py`의 본문 글자 수 정의(frontmatter 다음부터 파일 끝까지)가 `HUMANIZE-SUMMARY` 주석 블록도 세므로, 그 블록이 남아 있는 stem은 착수 압축비가 실제보다 높게 잡힌다. lee-jeongmin에서 1,417자가 그 경우였다. 착수 기준선과 완료 계량을 같은 정의로 재는 한 게이트 판정에는 영향이 없다.
- [x] A5 Claude Code 실전과 담론 (5편): patel-2026-beyond-the-prompt-claude-code, patel-2026-i-taught-myself-claude-code, trq212-2026-a-field-guide-to-fable, thariq-2026-know-your-unknowns, google-2026-the-new-sdlc-with-vibe
  - 완료 (2026-09-07). wiki 본문 합계 28,242자에서 91,854자로 3.25배가 됐고 표는 5개에서 63개다. 압축비 중앙값 0.71에서 1.40, 최소값 0.54에서 1.30이다. 편별로는 patel-beyond 0.54에서 1.30, patel-taught 0.60에서 1.98, trq212 0.78에서 1.32, thariq 0.71에서 1.65, google-sdlc 1.18에서 1.40이다.
  - sources는 합계 34,999자에서 64,670자, 표 5개에서 20개가 됐다.
  - lint 5종 0건. 10개 파일에 lint_style error 0 warning 0, lint_terms 0, audit_captions 0, lint_links 0, lint_figures 0이다.
  - 카테고리 총계 감소: agents error 2,176건에서 1,761건(-415), warning 99건에서 92건(-7), 위반 파일 80개에서 70개(-10), lint_terms 75건에서 41건(-34)이다. physical-ai 회귀 게이트 두 줄 모두 exit 0을 유지한다.
  - caption 정비 20건 (google-sdlc, 금지 기호 20건과 영어 전용 6건). `wiki-uncurated-figure`는 2건 해소해 183건에서 181건이 됐다.
  - **8절 표 id 밀림이 두 번째로 확인됐다.** google-sdlc의 표가 fig03 이후 한 칸씩 밀려 fig03이 Table 1을, fig04가 Figure 3을 가리키고 있었고 존재하지 않는 fig10(Snippet 1) 행까지 있었다. A2의 zhao-2026과 같은 양상이다. 10행 전부를 frontmatter id와 page에 맞춰 재작성했고 `추천` 열은 매핑을 따라 원값을 보존했다. figures 절을 가진 sources 전편에 같은 점검이 필요하다.
  - raw 재독이 무근거 주장 약 27건을 잡았다. 대표 사례는 patel-beyond의 "mattpocock/skills 100k+ stars"(raw에 star 수가 없다)와 "27분 분량"(읽기 시간 표기 없음), patel-taught의 "학습 자료 25개"(저자 소제목 합계는 21개다), trq212의 "알프레드 코집스키의 지도는 영토가 아니다에서 차용"과 "Rumsfeld 매트릭스를 빌려"(원문은 각각 "an old lesson"과 "I tend to break it down in 4 ways"라고만 적는다), google-sdlc의 Deloitte 30~35%(본문 인용이 아니라 endnote에만 있다)다.
  - **원문 자체의 내적 불일치 3건을 google-sdlc에서 확인해 기록했다.** p.11이 "five parts" 뒤에 다섯 항목을 열거하고 다음 문장에서 "These four parts"라고 적는다. METR 인용의 본문 상첨자 8과 실제 목록 번호 10이 어긋난다. p.47 결론이 자기 framework로 드는 "ambient, workflow, autonomous agent taxonomy"를 본문이 전개하지 않는다.
  - index.md 5항목을 198, 362, 307, 286, 360자에서 195, 175, 189, 196, 165자로 줄였다. Agents 절 200자 초과는 34개에서 30개가 됐다.
  - **lint 사각지대 2종을 계량했다** (배치 보고에서 파생, 오케스트레이터 직접 측정).
    - **(1) frontmatter `title:`의 금지 기호 16건 (8 stem 곱하기 2파일).** `lint_style.py`가 frontmatter를 검사하지 않아 통과한다. CLAUDE.md는 em dash를 "제목과 본문 모두" 금지하므로 위반이다. 해당 stem은 `thariq-2026-know-your-unknowns`(A5에서 해소), `headroomlabs-ai-headroom`(A7), `theaxlabs-2026-company-brain-prompt-guide`(A12), `dnotitia-akb`, `patel-2026-production-ai-app-seven-layers`, `shamsi-2026-graphify-knowledge-graphs-for-ai`, `xguru-2026-gbrain-open-source-personal-knowledge`(applications 배치), `9bow-2026-gpt-5-6-sol-terra-luna`(llms 배치)다. 각 배치가 그 stem 분량을 흡수하고, 원어 제목 보존과 금지 기호 사이의 처리 방침은 A4의 kang-2026 선례를 따른다(원문의 실제 구분자를 확인해 쓰고, 없으면 괄호나 콜론으로 바꾼다). lint 확장은 Phase 7-5 후속 과제 후보다.
    - **(2) `raw/articles/` 79편 중 18편(23%)이 WebFetch로 수집됐다.** CLAUDE.md가 명시적으로 배제한 경로다("추출기가 아니라 요약기라서 원문 전문이 raw에 남지 않는다"). A4의 kang-2026과 A5의 thariq-2026이 실제로 요약본이었고, 그 결과 sources가 요약본에 없는 내용을 채워 넣고 있었다. 반면 patel-beyond는 WebFetch 수집인데도 본문이 절 단위로 온전해 실질 손실이 확인되지 않았다. 즉 18편이 전부 손상된 것은 아니고 편차가 있다. 목록은 alex-xu-2026-rag-vs-graph-rag-vs, tosea-2026-how-to-use-headroom-context, kang-2026-no-longer-prompting-claude, gajjar-2026-gbrain-vs-computer-memory, geeksforgeeks-2026-vectorless-rag-pageindex, mantena-2026-hermes-gbrain-setup-vps, kalane-2026-pageindex-threw-out-vector-databases, nedai-2026-headroom-token-compression-guide, 9bow-2026-headroom-ai-agent-context-compression, patel-2026-beyond-the-prompt-claude-code, runkle-2026-the-art-of-loop-engineering, subratpati-2026-building-cost-efficient-agents-with, thariq-2026-know-your-unknowns, xguru-2026-gbrain-open-source-personal-knowledge, 9bow-2026-gpt-5-6-sol-terra-luna, tilnote-2026-gbrain-repository-core-summary, vectorize-2026-gbrain-review-honest-assessment, yongkyun-2026-cutting-llm-token-costs-with다. raw 불변 규약에 따라 배치는 근거 범위를 명시하는 선에서 처리하고, **재수집 여부는 Phase 7-5에서 판단한다.** 그중 8편이 A7의 Headroom 묶음과 B 배치의 gbrain 묶음에 몰려 있어 해당 배치에서 손상 여부를 우선 확인한다.
    - 부수로 **수집 도구 메모가 자료 사실로 승격된 사례**를 patel-beyond에서 확인했다. raw 상단 ingest 메모의 "LobeHub 아이콘, Apache 2.0"이 sources에 자료 내용으로 올라가 있었다. raw 상단 메모 블록 점검을 남은 배치의 대조 항목에 넣는다.
  - 용어집 등재 후보 10건 누적 (Phase 7-1 소관): artifact, edge case, blast radius, context rot, plan mode, LM judge, trajectory evaluation과 output evaluation, CapEx와 OpEx, sycophancy 재확인. **`glossary-agents.md`의 "스킬" 행 첫 등장 풀이 예문이 "에이전트에 얹는 지침 패키지"로 CLAUDE.md 금지 동사 "얹다"를 쓴다.** 용어집은 banned-vocab 면제라 lint를 통과하지만 작성자가 예문을 본문에 옮기면 위반이 된다. Phase 7-1에서 함께 고친다.
  - 부수 발견 2건. (1) 저자 동일인 단정 2건을 정정했다. `thariq-2026-know-your-unknowns`와 `trq212-2026-a-field-guide-to-fable`이 같은 저자라는 서술은 두 자료 어디에도 근거가 없어 "확정되지 않는다"로 바꿨고, `patel-2026-i-taught-myself-claude-code`의 Manthan Patel과 `patel-2026-beyond-the-prompt-claude-code`의 Arpan Patel을 "동명이인"이라 적던 것은 "성이 같은 다른 저자"로 고쳤다. (2) **미수집 1차 자료 목록이 드러났다.** patel-taught가 큐레이션한 원 논문 5편(ReAct, Toolformer, Chain-of-Thought Prompting, Reflexion, Generative Agents)이 저장소에 한 편도 없고 여러 페이지가 인용만 하고 있다. 공식 Claude Code repo, Claude Agent SDK, Claude Cookbooks도 미수집이다. Phase 7-5의 수집 후보 목록으로 남긴다.
- [x] A6 gstack과 Claude Code 응용 (6편, 신규 wiki 3편): garrytan-gstack, 9bow-2026-gstack-claude-code-virtual-team(신규), gpters-2026-yc-ai-agent-guide-gstack(신규), hada-2026-gstack-virtual-engineering-team(신규), donchitos-claude-code-game-studios, madslorentzen-ai-job-search
  - 완료 (2026-09-07). 기존 3편은 wiki 본문 11,195자에서 43,251자가 됐고 신규 3편이 26,446자를 더해 배치 합계 69,697자다. 표는 1개에서 76개다. 압축비 중앙값 2.05, 최소값 1.38이다. 편별로는 garrytan-gstack 1.23에서 1.89, donchitos 0.80에서 1.40, madslorentzen 0.74에서 1.38이고 신규 3편은 9bow 2.21, gpters 2.28, hada 3.41이다.
  - sources는 합계 17,358자에서 40,312자, 표 0개에서 21개가 됐다. `sources/gpters-2026-yc-ai-agent-guide-gstack.md`에는 템플릿 필수 절인 `## 7. 용어집`이 아예 없어 신설했다.
  - **고아 sources가 5편에서 1편이 됐다.** Phase 1-6이 physical-ai 1편을, 이 배치가 agents 3편을 해소했다. 잔여 1편은 `dnotitia-2026-akb-product-introduction`이고 배치 B2 소관이다.
  - lint 3종 0건 (12개 파일). A6에는 figures를 가진 stem이 없어 audit_captions와 lint_figures는 해당 없다.
  - 카테고리 총계 감소: agents error 1,761건에서 1,623건(-138), warning 92건에서 87건(-5), 위반 파일 70개에서 61개(-9), lint_terms 41건에서 24건(-17)이다. 신규 3편이 검사 대상에 들어와 파일 수가 130개에서 133개가 됐는데도 총계는 줄었다. physical-ai 회귀 게이트 두 줄 모두 exit 0을 유지한다.
  - index.md Agents 절이 63항목에서 **66항목**이 됐다(신규 3편을 1차 자료 garrytan-gstack 바로 뒤에 삽입). 200자 초과는 30개에서 28개다. 계획서가 예고한 66항목에 도달했다.
  - **새 실패 유형을 발견했다: cross-source 무출처 유입.** `wiki/agents/garrytan-gstack.md`가 설치 절차, 텔레메트리 수집 범위, 명령어 11종, 콜드 스타트 수치를 서술하고 있었는데 **그 stem의 raw에는 하나도 없었다.** 전부 형제 raw(9bow, gpters, hada)에서 온 것이고 출처 표기가 없었다. 지금까지 나온 무근거 주장(창작, 수치 오류, hedge 소실)과 달리 **내용 자체는 이 저장소 안에 근거가 있지만 어느 자료의 것인지가 지워진** 형태다. 삭제가 아니라 명시 귀속으로 전환했고(문장 안에 wikilink로 출처를 밝힌다), 명령어 카탈로그는 9bow와 gpters 페이지로 위임했다. 남은 배치의 대조 항목에 이 유형을 추가한다.
  - **`raw/repos/garrytan-gstack.md`가 README 전문이 아니라 WebFetch 요약본이다** (raw 80행의 자체 비고). 저장소 전체를 세면 `raw/repos/` 59편 중 2편이 해당한다: `garrytan-gstack`, `garrytan-gbrain-tutorials`. A5가 계량한 `raw/articles/` 18편과 성격이 같다.
    - **규약 자체에 긴장이 있다.** CLAUDE.md의 Repos Step 1은 "에이전트가 `WebFetch`로 README를 취득해 저장한다"고 지정하는데, 같은 문서의 THE FOUR RULES #1과 Articles 절은 "`WebFetch`는 기사 수집에 쓰지 않는다 (추출기가 아니라 요약기라서 원문 전문이 raw에 남지 않고, 이는 raw가 원본 그대로의 불변 아카이브라는 3-tier 전제와 어긋난다)"고 못박는다. 같은 이유가 repo README에도 그대로 적용되는데 Repos 절만 예외로 남아 있다. **규약 정합은 사용자 판단이 필요한 사안이라 Phase 7-5로 넘긴다.** 이 배치는 raw 불변 규약을 지켜 파일을 건드리지 않고 근거 범위를 명시하는 선에서 처리했다.
  - raw 재독이 무근거 주장 약 24건을 잡았다. 수치 오류가 특히 많았다. 9bow의 "명령어 28개, 스프린트 7단계 그룹"은 원문이 소개문에서 28가지라 말하지만 본문에 이름이 나오는 것은 22개이고 실제 하위 그룹은 5개다. donchitos는 배지 수치와 본문 나열이 세 곳에서 어긋나 병기 처리했다(에이전트 49 대 48, 스킬 73 대 72, 규칙 11 대 8. Tier 3는 22개라 적혀 있으나 실측 23개). madslorentzen은 확장 커맨드를 9개라 적고 10개를 나열했고 "PDF 렌더링이 그만큼의 토큰을 다시 소비한다"가 원문의 `some of those savings`를 단정으로 바꾼 것이었다. hada는 `/codex`라는 명령어 표기가 그 자료에 없는데 sources가 붙여 놓고 있었다.
  - **`wiki/overviews/gstack-ai-software-factory-overview.md`를 4행 손봤다** (오케스트레이터 직접 수정). 15에서 17행의 `[[sources/...]]` 3건을 신규 wiki 페이지를 가리키는 `[[agents/...]]`로 바꿨다. 신규 3편이 이번에 생겨 비로소 가능해진 정정이고, `link-outside-vault`가 4건에서 1건이 됐다(잔여 1건은 `dnotitia-akb`, B2 소관). 42행의 "전체 28개 명령어를 7단계에 매핑"은 위 실측과 어긋나 "5개 그룹으로 정리, 원문은 28가지라 소개하지만 실제로 이름이 나오는 것은 22개"로 고쳤다. 네 행 모두 lint 위반 0건이고, 같은 파일에 남은 error 22건과 warning 3건은 Phase 6 재작성 소관이다.
  - 용어집 등재 후보 11건 누적 (Phase 7-1 소관): software factory, headless, 슬래시 명령어, daemon, opinionated, telemetry, escalation, quality gate, system of record, deal-breaker, canary. **`slash command`의 canonical 방향 결정이 필요하다.** 저장소 안에서 "슬래시 커맨드"와 "슬래시 명령어"가 갈리고 raw는 커맨드, `wiki/agents/garrytan-gstack.md`는 명령어를 쓴다. A4에서 이관한 `sub-agent` 표기 실태 점검과 같은 성격의 항목이다.
  - 부수 발견 2건. (1) A6 배치 안에서 4개 gstack 페이지의 역할 분담이 자연스럽게 갈렸다. garrytan-gstack은 설계 의도와 실행 요건, 9bow는 명령어 카탈로그, gpters는 브라우저 QA 스택 내부 수치와 FAQ, hada는 대상 사용자와 커뮤니티 반응이다. 각 페이지의 `## 관련 페이지` 설명문에 이 차이를 한 줄씩 적어 독자가 어디로 갈지 고르게 했다. 중복 서술을 막는 방식이라 다른 클러스터(A3 harness 6편, A7 Headroom 6편)에도 적용할 만하다. (2) 자료 자체의 결함 2건을 기록했다. madslorentzen README는 compile-and-inspect를 본문에서 Step 5라 부르지만 번호 목록에서는 6번이고, `/scrape`만 커맨드 정의 파일 없이 스킬로 구현된 비대칭이 있다.
- [x] A7 Headroom 컨텍스트 압축 (6편): headroomlabs-ai-headroom, tosea-2026-how-to-use-headroom-context, subratpati-2026-building-cost-efficient-agents-with, nedai-2026-headroom-token-compression-guide, 9bow-2026-headroom-ai-agent-context-compression, yongkyun-2026-cutting-llm-token-costs-with
  - 완료 (2026-09-07). wiki 본문 합계 17,349자에서 70,103자로 4.04배가 됐고 표는 6개에서 66개다. 압축비 중앙값 0.77에서 1.58, 최소값 0.52에서 1.39다. 편별로는 headroomlabs 0.52에서 1.39, tosea 0.83에서 1.60, subratpati 0.75에서 1.79, nedai 0.70에서 1.56, 9bow 0.79에서 2.86, yongkyun 0.81에서 1.40이다.
  - sources는 합계 24,891자에서 44,377자, 표 7개에서 19개가 됐다.
  - lint 5종 0건 (12개 파일). caption 정비 10건(yongkyun). `wiki-uncurated-figure`는 headroomlabs에서 2건 해소해 181건에서 179건이 됐다 (wiki frontmatter 44줄에서 31줄, curated 0개라 `figures:` 키 자체를 생략).
  - 카테고리 총계 감소: agents error 1,623건에서 1,417건(-206), warning 87건에서 75건(-12), 위반 파일 61개에서 49개(-12), lint_terms 24건에서 20건(-4)이다. physical-ai 회귀 게이트 두 줄 모두 exit 0을 유지한다.
  - index.md 6항목을 261, 229, 264, 207, 186, 353자에서 186, 179, 191, 177, 184, 196자로 줄였다. Agents 절 200자 초과는 28개에서 23개다.
  - **A5가 지적한 WebFetch 수집 문제를 실제로 검증한 배치다.** 6편 중 5편이 WebFetch 수집분이었고, 담당자들이 각각 독립으로 판정한 결과 **네 편(tosea, subratpati, nedai, 9bow)은 요약본, 한 편(yongkyun)은 원문 전문**이었다. A5의 patel-beyond가 WebFetch 수집인데도 온전했던 것과 같은 편차다. 판정 근거는 수집 도구 메모의 자기 신고, 절 제목의 언어 불일치(한국어 글인데 영문 헤딩 골격), 직접 인용과 코드 블록의 소실, 원문 표기 읽기 시간과 실제 분량의 불일치, 마크다운 링크의 평문화다. 각 페이지의 `## 한계`에 "수집본이 전하는 범위"를 명시했다.
  - **판정 표지를 하나 확보했다: `extractor_tier` 키 부재.** `scripts/fetch_article.py`는 성공한 추출 tier를 frontmatter에 반드시 기록하므로, 이 키가 없으면 스크립트 경로를 타지 않은 것이다. `raw/articles/` 79편 중 32편이 이 키를 갖고 47편이 없다. **다만 47편이 전부 WebFetch는 아니다.** CLAUDE.md가 승인한 폴백인 사용자 수동 저장분도 이 키가 없다. WebFetch 메모로 자기 신고한 18편이 확정 대상이고 나머지 29편은 성격 미상이다. Phase 7-5에서 재수집 범위를 정할 때 이 두 수치를 구분해 쓴다.
  - **A6에서 발견한 cross-source 무출처 유입이 이 배치에서도 확인됐다.** 4편에서 9건이 나왔고 전부 삭제가 아니라 문장 안 wikilink 명시 귀속으로 전환했다. nedai 3건(Tejas 이름, Windows 경로 검증 서술, Cursor proxy 권고의 성격), subratpati 3건(60~95% 절감률, KV 캐시 prefix 서술, 구성 요소 대응), tosea 2건(ContentRouter 등 구현 클래스명 2곳), headroomlabs 1건(문서 사이트 주소)이다. 9bow는 0건이었다. **1차 자료 페이지가 해설 페이지에서 사실을 빌려 온 사례(headroomlabs)도 있어, 오염 방향이 한쪽이 아니다.**
  - 무근거 주장 정정에서 새 유형이 두 가지 더 나왔다.
    - **(1) 원문 표가 이미지라서 수치가 복원되지 않은 경우.** yongkyun 원문은 표 5개를 전부 이미지로 게시해 raw 텍스트에 마크다운 표가 0개다. 그 결과 기존 wiki의 재생 결과표 12셀 중 8셀이 틀려 있었다(headroom 비용이 2.07달러가 아니라 25.61달러, 합계가 3.7달러가 아니라 34.12달러 등. 3.7달러는 지출 비중 3.7%와 혼동된 것으로 보인다). 크롭 이미지를 열어 전면 교체했고 새 값은 내부 검산이 맞는다. **이미지 표를 가진 자료는 크롭을 열지 않으면 수치가 복원되지 않는다.**
    - **(2) 누락 방향의 오류.** 9bow는 창작이 아니라 반대로 raw에 실재하는 핵심 수치(60~95% 절감)가 sources와 wiki 양쪽에서 빠져 있었다. 대조는 양방향으로 해야 한다.
  - 완전 무근거 서술 1건을 저장소 전체 grep으로 확정해 삭제했다. headroomlabs의 "대시보드 달러 절감이 LiteLLM 의존이라 Python 3.14+에서 0달러로 고정된다"는 서술은 `raw/` 어디에도 3.14와 LiteLLM 조합이 없다. raw에 실재하는 Python 3.13+ `VERIFY_X509_STRICT` 항목으로 대체했다.
  - **절감률 표기 일관성을 배치 종료 시 점검했다** (오케스트레이터 직접 확인). 6편이 40~90%, 60~95%, 60~90%, 10~99% 등 서로 다른 값을 쓰는데, 전수 확인 결과 **전부 각자 자기 자료의 값이고 다른 자료의 값을 인용할 때는 wikilink 귀속이 붙어 있다.** subratpati는 "이 글은 40~90%로 적는데 저장소 README는 60~95%를 표제로 내세운다"고 차이 자체를 서술하고, 9bow는 저장소 표의 최저 행 47%가 자기 글의 하한보다 낮다는 대조를 적는다. 수정 불필요로 판정했다.
  - frontmatter `title:` 금지 기호가 16건에서 12건이 됐다 (headroomlabs 2건 해소. raw README H1이 실제로 em dash를 쓰는데 CLAUDE.md 제목 규정이 우선하므로 콜론으로 치환했다). 잔여 6 stem은 A12와 applications, llms 배치 소관이다.
  - 용어집 등재 후보 12건 누적 (Phase 7-1 소관): proxy, prefix cache, operational context, context compression layer, counterfactual, cache alignment, context optimization layer, 가역 압축, content-aware 압축, prompt caching과 cache_read와 cache_create, tool result와 tool output, replay. **`lint_terms`의 `tool use` 금지 표기 "도구 사용"이 일반어 용법을 오탐한다는 보고가 있다** ("Read 도구 사용이 많다"처럼 개념어가 아닌 자리에서 걸린다). MEMORY의 `glossary-banned-term-check`와 같은 유형이라 Phase 7-1에서 지침 전환을 검토한다.
  - 부수 발견 2건. (1) A6의 gstack과 마찬가지로 6편의 역할 분담을 명시해 중복 서술을 막았다. headroomlabs가 스펙과 설치와 라이선스, tosea가 사용법, subratpati가 비용 관점, nedai가 연동 절차, 9bow가 한국어 소개, yongkyun이 독립 실측이다. 각 페이지의 `## 관련 페이지` 설명문에 담당을 한 줄씩 적었다. (2) `wiki/overviews/headroom-context-compression-overview.md`가 이 6편을 합성한 개괄인데 영문 병기 헤딩과 금지 기호가 남아 있고 `SmartCrusher` 같은 구현 클래스명을 인용한다. 6편이 전부 바뀌었으므로 Phase 6 재작성 때 수치 대조표와 링크 설명을 다시 맞춘다. **rtk와 caveman은 이 저장소에 1차 자료가 없어 yongkyun이 유일한 근거다.**
- [x] A8 Context engineering과 토큰 경제 (4편): anthropic-2025-effective-context-engineering-for-ai, zhang-2026-recursive-language-models, bai-2026-how-do-ai-agents-spend, bytebytego-2026-how-openai-built-its-data
  - 완료 (2026-09-07). wiki 본문 합계 24,181자에서 107,566자로 4.45배가 됐고 표는 8개에서 107개다. 압축비 중앙값 0.65에서 1.40, 최소값 0.60에서 1.38이다. 편별로는 anthropic 0.69에서 1.38, zhang 0.69에서 1.40, bai 0.60에서 1.43, bytebytego 0.61에서 1.39다. **4편뿐인 배치인데 표 107개로 지금까지 배치 중 가장 많다.**
  - sources는 합계 36,986자에서 76,706자, 표 15개에서 55개가 됐다.
  - lint 5종 0건 (8개 파일).
  - 카테고리 총계 감소: agents error 1,417건에서 1,168건(-249), warning 75건에서 61건(-14), 위반 파일 49개에서 41개(-8), lint_terms 20건에서 13건(-7)이다. physical-ai 회귀 게이트 두 줄 모두 exit 0을 유지한다.
  - **caption 70건 정비** (zhang 38, bai 28, anthropic 4). 배치 단위 최대다. `wiki-uncurated-figure`는 19건 해소해 179건에서 160건이 됐다 (zhang frontmatter 204줄에서 114줄, bai 183줄에서 83줄).
  - index.md 4항목을 361, 323, 412, 361자에서 197, 145, 188, 191자로 줄였다. Agents 절 200자 초과는 23개에서 19개다.
  - **8절 표 id 밀림이 두 편에서 더 나왔다. 누적 4 stem이다** (A2 zhao-2026, A5 google-sdlc, A8 zhang-2026과 bai-2026). zhang은 fig08부터 8행이 밀리고 strategy 19행 전부가 remap 이전 값 `page-region`으로 남아 있었으며 존재하지 않는 fig17과 fig24를 언급하는 legacy 각주까지 있었다. bai는 유령 행 1건 때문에 그 뒤 12행이 밀리고 tab01에서 tab03까지 3행이 통째로 빠져 있었다. **이 반복은 도구로 잡아야 한다** (아래 1-8 참고).
  - **이미지 전용 그래프 오독이 이 배치 최대 산출물이다.** zhang-2026의 Figure 3a는 계열을 한 칸씩 밀려 읽어 base 값이 RLM 열에, RLM 값이 post-training 열에 들어가 있었고, 그 결과 "GPT-5 vanilla 32.00에 근접"이라는 **날조된 비교**가 생겼다(32.00은 GPT-5가 아니라 RLM-Qwen3-8B 자신의 값이고, 실제로는 RLM이 3개 task에서 GPT-5를 앞선다). Figure 10 표는 12칸 중 10칸이 틀렸고 "GPT-5의 17배"는 실제 약 44배였다. Figure 1의 성능 곡선도 "80%에서 0%"가 실제로는 "약 92%에서 약 31%"였다. A7의 yongkyun(12셀 중 8셀 오류)에 이어 **이미지로만 존재하는 수치는 크롭을 열지 않으면 복원되지 않는다는 점이 재확인됐다.**
  - 원문 자체의 내적 불일치도 계속 나온다. bai-2026은 세 건이다. 본문이 GPT-5.2의 실패 subset 증가폭을 0.5M 미만이라 적지만 Figure 6b는 약 1.1M이고, "모든 phase에서 cache read가 지배적"이라 적지만 Figure 8b의 Setup은 cache read가 최소이며, Appendix B.2가 cached input을 0.2배라 적지만 같은 절 단가표는 0.1배다. 그림 참조 번호도 3절에서 두 곳 밀려 있다. zhang-2026은 Observation 1의 28.4%가 Table 1 반올림값으로는 27.3%다. bytebytego는 사내 사용자 수가 도입부 약 4,000명과 support 절 5,500명으로 갈린다. 전부 표 수치를 기준으로 삼고 불일치를 wiki에 명시했다.
  - %와 %p, 절대 향상과 상대 향상의 혼동을 두 편에서 정정했다. zhang의 "compaction agent 대비 +29%p"는 91.3 대 70.5로 절대 20.8%p이고 논문의 29%는 상대 향상률이었다. 초록의 26%, 130%, 13%도 전부 상대 향상률 중앙값임을 계산으로 확인해 표로 명시했다.
  - **누락 방향 오류가 이 배치에서도 다수 나왔다.** anthropic은 Pokémon 사례의 "메모리 구조에 관한 어떤 프롬프트도 없이"라는 창발 조건이 양쪽에서 빠져 있었는데, 그 조건이 없으면 사례의 논점 자체가 사라진다. zhang은 OpenCode(+context offloading)가 두 벤치마크에서 RLM을 앞선다는 사실과 depth=0이 최고인 경우가 빠져 있었다. bytebytego는 `user_id` 두 테이블 예시, 재현 가능성 주장 절, 접근 경로 4가지, 의존 그래프 규모 `O(100k)`가 전부 빠져 있었다. bai는 Table 1에서 3까지와 Appendix B, C, D 전체가 빠져 있었다.
  - hedge 소실 정정 5건 (anthropic). "가장 흔한 실패는"이 원문 `One of the most common failure modes`이고, "모든 크기의 window가 문제를 겪는다"는 원문의 조건절 `at least for situations where the strongest agent performance is desired`를 통째로 잃은 것이었다.
  - cross-source 무출처 유입 4건 (zhang 3건, bytebytego 1건). zhang은 PDF 전문 검색으로 0회인 "DSPy", 논문에 없는 저자 소속 기술, 논문이 명칭을 쓰지 않는 "ALiBi"를 삭제했고 정당한 인용(OpenHands)은 형태를 명시해 유지했다. bytebytego는 인용 부호로 감싸 원문 표현처럼 제시한 조어를 삭제했다.
  - **lint 사각지대 3종을 새로 계량했다.**
    - **(1) 영문 canonical 표기가 검사되지 않는다.** `glossary-agents`는 `서브에이전트`와 `멀티에이전트`를 canonical로 두고 금지 표기는 `하위 에이전트`뿐이라, 본문에 영문 `sub-agent`와 `multi-agent`가 남아도 lint를 통과한다. A4에서 이관한 `sub-agent` 표기 실태 점검(원어 45회 대 서브에이전트 30회)과 같은 사안이다.
    - **(2) 대소문자가 검사되지 않는다.** `Transformer`가 canonical인데 소문자 `transformer`가 통과한다.
    - **(3) `raw_path` 절대경로.** `raw/` 16편의 frontmatter가 옛 macOS 절대경로(`/Users/kmyu/Desktop/...`)를 갖고 있다. **다만 `sources/`와 `wiki/`는 0건이라 3-tier의 실사용 경로는 깨끗하다.** raw frontmatter는 불변 규약 대상이므로 기록만 한다.
    - 부수로 `lint_style.py`의 `RE_K_NUMBER`가 소문자 `k`만 잡아 `131K` 같은 대문자 표기가 통과한다는 점, `lint_terms`가 일반어 `증류`를 distillation 금지 표기로 오탐한다는 점도 보고됐다.
  - 용어집 등재 후보 15건 누적 (Phase 7-1 소관): context rot, attention budget, right altitude, just-in-time context, tool result clearing, context assembly, grain, authoritative source, prompt caching, self-prediction, inverse test-time scaling, context offloading, symbolic recursion, RLVR, rollout. `trajectory` 행은 현재 "지침만"인데 원어가 표준이라 보강 후보다.
- [x] A9 에이전트 메모리 (5편): rasmussen-2025-zep-a-temporal-knowledge-graph, getzep-graphiti, zhou-2026-are-we-ready-for-an, qiao-2026-memory-intelligence-agent, zou-2026-task-focused-memorization-multimodal-agents
  - 완료 (2026-09-07). wiki 본문 합계 35,664자에서 157,579자로 4.42배가 됐고 표는 10개에서 147개다. **Phase 2 배치 중 wiki 본문 합계와 표 개수 모두 최대다.** 압축비 중앙값 0.74에서 1.41, 최소값 0.63에서 1.23이다. 편별로는 rasmussen 0.63에서 1.40, getzep-graphiti 0.74에서 1.45, zhou 0.83에서 1.48, qiao 0.79에서 1.41, zou 0.70에서 1.23이다.
  - sources는 합계 48,129자에서 114,786자, 표 9개에서 65개가 됐다.
  - lint 5종 0건 (10개 파일).
  - 카테고리 총계 감소: agents error 1,168건에서 884건(-284), warning 61건에서 47건(-14), 위반 파일 41개에서 31개(-10), lint_terms 13건에서 9건(-4)이다. physical-ai 회귀 게이트 두 줄 모두 exit 0을 유지한다.
  - **figures 백필 2건 완료 (47장).** qiao-2026이 17장(sources frontmatter 12줄에서 183줄), zou-2026이 30장(13줄에서 315줄)이다. **zou-2026은 저장소 최대 백필 대상이었다.** `figures-missing`이 11건에서 9건이 됐다. `wiki-uncurated-figure`도 zhou-2026의 7건을 포함해 160건에서 153건이 됐다 (zhou frontmatter 184줄에서 104줄, qiao 74줄, zou 75줄).
  - caption 정비 36건 (zhou 30, rasmussen 6) + 백필 신규 작성 47건. `candidate-table-mismatch`는 5편 전부 0건을 유지한다.
  - index.md 5항목을 189, 180, 294, 238, 480자에서 200, 175, 192, 151, 168자로 줄였다. Agents 절 200자 초과는 19개에서 16개다.
  - **누락 방향 오류가 이 배치에서 가장 크게 나왔다.** rasmussen은 2.3절 Communities 전체(label propagation을 택한 근거, 증분 확장 방식, 완전 재계산과의 점진적 괴리)와 검색 형식화, 결론부 후속 방향 5가지가 양쪽에서 통째로 빠져 있었다. zhou는 "전통 데이터베이스 워크로드와 다른 점" 절과 유지 모듈의 네 번째 계열이 없었다. getzep-graphiti는 Zep 대 Graphiti 8행 비교표, REST 서비스, Azure OpenAI 지원, cross-encoder 계층이 빠져 있었다. qiao는 Table 7 상위 3행과 in-domain/out-of-domain 구분, 학습 하이퍼파라미터 전체가 없었다. zou는 5.2절 Test-Time Training 관련 연구가 아예 없었다.
  - 무근거 주장 정정에서 특히 심한 것 세 건. qiao의 "Planner LoRA-style 학습"은 **LoRA가 논문에 한 번도 나오지 않는다**(GRPO 전체 파라미터 학습이다). zou의 "EgoTempo에서 GPT-5.2에 0.5p 차 2위"는 표 실측이 4.5%p로 **9배 과소**였다. rasmussen의 "두 벤치마크에서 MemGPT를 앞선다"는 LongMemEval에서 MemGPT 실행이 실패해 비교가 성립하지 않는 것이었다.
  - **논문 자체의 내적 불일치가 12건 나왔다.** rasmussen 4건(검색 개수 20개 대 10개, Table 3 Delta 열의 분모가 행마다 다름, 상대 향상 18.5% 대 표 계산 18.3%, single-session-user 행이 두 모델 완전 동일), qiao 2건(Only Memory의 멀티모달 평균을 -0.4 하락이라 적지만 Table 5 계산은 +0.40%p 상승이고 실제 하락은 텍스트 전용 -0.68%p, TTL 증분 두 값이 뒤바뀜), zhou 3건(관찰 번호에 O3이 없고 O1이 두 번, 유지 하위 연산 수 3개 대 4개, Figure 1 패널 라벨이 Table 1 계열 구분과 어긋남), zou 3건(abstract의 6.3%와 부록의 6.3 points, 부록 Table 15가 제안 방법을 TaskMem이 아니라 FOMO로 적음, baseline 이름 HippoMem 대 HippoMM)이다. 전부 표 수치를 기준으로 삼고 wiki에 명시했다.
  - **`memory` 표기 규칙이 세 담당자에게서 같은 답으로 수렴했다.** 셋 다 독립으로 `glossary-agents.md`의 `memory` 행 비고("시스템 구성 요소는 메모리")와 `episodic memory` 행 비고("procedural, semantic memory도 원어")를 합성해 **단일어와 한글 합성어는 음차 "메모리", 영어 수식어가 붙은 등재형 복합어는 원어**로 통일했다. A3에서 올라온 Phase 7-1 판단 항목의 답이 나온 것이다. 제안된 문구는 `memory` 행 비고에 "영어 수식어가 붙은 복합어는 원어 단위로 쓴다(non-parametric memory, long-context memory 등). 단일어와 한글 수식어 결합형은 메모리"를 추가하는 것이다. A2의 skill 복합어 예외와 함께 Phase 7-1에서 같은 방침으로 처리한다.
  - **크롭 결함 4건을 새로 기록했다** (전부 `--force` 금지 수칙에 따라 재크롭하지 않고 표기만 했다). zhou-2026의 `fig03`은 bbox가 `tab01`의 상위집합이라 크롭 안에 Table 1 전체와 본문 2열이 들어 있고 실제 Figure 3은 오른쪽 아래 25%뿐이다. curated로 두면 wiki에 Table 1이 두 번 렌더되므로 `curated: false`와 `low_confidence: true`로 내리고 재크롭 좌표 `--bbox fig03=4:0.485,0.305,0.910,0.470`을 8절 표 아래에 남겼다. zou-2026은 `tab05`가 캡션과 질문 목록까지만 잡아 비교 대상인 메모리 본문을 놓쳤고(멀티페이지 표에서 caption-region이 첫 페이지 상단만 잡는 패턴), `tab21`의 bbox가 `tab20`과 **완전히 동일**하다(같은 논문 안에서 caption-region 폴백이 중복 배정을 낸 사례). A3의 lin-2026 `tab01`과 합쳐 크롭 결함 누적 4건이고, `extract_figures.py`의 caption-region 폴백 점검이 Phase 7-5 후보다.
  - 용어집 등재 후보 14건 누적 (Phase 7-1 소관): provenance, bi-temporal, context graph, cross-encoder, precision과 recall, IQR, non-parametric memory와 parametric memory, test-time training, Reflect-Replan, workload(워크로드), taxonomy, consolidation, eviction, adapter, reward hacking. `precision`은 "정밀도"가 일반어 용법을 가져 등재 전 grep 확인이 필요하다 (MEMORY의 `glossary-banned-term-check` 지침).
  - 부수 발견 2건. (1) **평가 수치의 답변 모델 민감도가 정량으로 드러났다.** zou-2026의 Table 14는 같은 메모리로 Accuracy가 61.6에서 68.9까지 달라짐을 보인다. 메모리 벤치마크 비교 시 답변 생성 모델 고정이 필수라는 뜻이고, 같은 배치의 zhou-2026이 다루는 통합 벤치마크 설계 문제와 직접 맞물린다. Phase 6의 overview 소재다. (2) A9의 5편이 논문 3편과 repo 1편, survey 1편으로 역할이 갈려 A6과 A7처럼 분담을 명시했다. rasmussen이 방법과 벤치마크, getzep-graphiti가 구현과 설치, zhou가 통합 비교, qiao와 zou가 각각 학습 기반 접근이다. 양방향 위임 문구를 서로 맞췄다.
- [x] A10 멀티에이전트와 자동 집필 (4편, 파일럿 1편 제외): lee-2026-the-agent-loop-a-survey, dennis-2026-compiling-agentic-workflows-into-llm, shao-2024-assisting-in-writing-wikipedia-like-articles(40,000자 재추출 보강 동반), stanford-oval-storm
  - 완료 (2026-09-07). wiki 본문 합계 29,997자에서 116,751자로 3.89배가 됐고 표는 7개에서 129개다. 압축비 중앙값 0.70에서 1.40, 최소값 0.66에서 1.12다. 편별로는 lee-2026 0.67에서 1.45, dennis-2026 0.66에서 1.38, shao-2024 1.06에서 1.12, stanford-oval-storm 0.72에서 1.42다.
  - sources는 합계 41,176자에서 86,270자, 표 12개에서 61개가 됐다.
  - lint 5종 0건 (8개 파일).
  - 카테고리 총계 감소: agents error 884건에서 570건(-314), warning 47건에서 31건(-16), 위반 파일 31개에서 23개(-8), lint_terms 9건에서 4건(-5)이다. physical-ai 회귀 게이트 두 줄 모두 exit 0을 유지한다.
  - **계획서가 지정한 40,000자 재추출 보강을 완료했다** (shao-2024). sources 본문이 5,637자에서 19,145자로 3.4배가 됐고 표는 1개에서 19개다. 40,000자 상한이 참고문헌 구간(11쪽)에서 걸려 부록(13~27쪽)을 별도 추출해 합쳤다. 새로 담은 것은 Table 1 선행 연구 비교, FreshWiki 구축 절차와 Table 7 통계, heading soft recall 계산식 전문, Table 3 GPT-3.5 설정 6행, DSPy Signature 7종, Prometheus 운용 세부, Figure 6 오류 분포 7종, Table 6 human evaluation 전량, Krippendorff's Alpha 5개 값, 편집자 모집 세부와 IRB, Ethics Statement다. 계획서 2-4절이 지목한 얇은 paper sources 2편 중 하나가 해소됐다 (잔여 1편 `gutierrez-2025-from-rag-to-memory-non`은 database 배치 소관).
  - **figures 백필 1건 완료** (dennis-2026, 14장). sources frontmatter 12줄에서 155줄, `## 8. 그림 후보` 절 신설. `figures-missing`이 9건에서 8건이 됐다. `wiki-uncurated-figure`도 153건에서 132건으로 21건 줄었다 (lee frontmatter 194줄에서 126줄, shao 204줄에서 34줄, dennis wiki 54줄).
  - caption 정비 68건 (lee 34, shao 34. shao는 영어 전용이 30건이었다) + 백필 신규 14건.
  - **새 lint 규칙 `candidate-table-mismatch`가 첫 배치에서 값을 냈다.** shao-2024의 8절 표는 4행뿐이었고 그중 하나는 존재하지 않는 `fig10`이었다. 실제 19개 id 전량으로 재작성해 17건을 해소했다. 전 저장소 272건에서 255건이 됐다. 1-8에서 이 규칙을 만든 판단이 실제 결함 검출로 확인됐다.
  - 무근거 주장 정정에서 특히 중요한 것 세 건. shao-2024는 **Verifiability가 개선되지 않았다는 사실**(STORM 3.80 대 oRAG 3.85, ≥4 비율 양쪽 67.5% 동일)이 양쪽에서 빠져 있었고, 루브릭 5항목 중 p<0.05를 만족한 것이 Organization(0.005) 하나뿐인데 그 조건이 누락돼 있었다. 또 "미지원 문장의 주 원인"으로 적힌 두 유형은 Figure 6에서 합계 25%뿐이고 최대 슬라이스는 Lack Citation 47%였다. lee-2026은 tab04 caption의 "18종"이 실제 19행이었다.
  - **논문 내적 불일치 9건을 기록했다.** dennis-2026이 7건(본표와 부록의 소수 둘째 자리 3건, 4.1절 서술과 Table 7 유의성 표기, 청구 유형 이름이 본문과 Figure 4에서 다름, 부록 C 주장과 Table 10 값의 반례 2건), lee-2026이 2건(코퍼스 문단이 문헌 7개를 열거하면서 스윕 횟수는 8번, 통제 실험 번호가 E2에서 시작하고 E1이 없음)이다.
  - **크롭 결함 4건을 새로 기록했다** (전부 재크롭 없이 좌표만 남겼다). dennis-2026의 `tab03`은 `tab02`와, `tab08`은 `tab07`과 **바이트 단위로 동일**해 실제 Table 3과 Table 8을 못 잡았다. shao-2024의 `tab04`와 `tab05`도 bbox와 파일 크기가 동일하고 Table 4 영역은 어느 크롭에도 없다. A3과 A9의 4건과 합쳐 누적 8건이고 **`extract_figures.py`의 caption-region 폴백이 인접 캡션에 같은 영역을 배정하는 패턴이 반복 확인됐다.** Phase 7-5 후보다.
  - `<!-- HUMANIZE-SUMMARY -->` 잔재가 8개 파일에서 7개가 됐다 (shao-2024 해소). 잔여 7개는 applications와 database 배치 소관이다.
  - index.md 4항목을 219, 222, 294, 565자에서 193, 195, 144, 185자로 줄였다. Agents 절 200자 초과는 16개에서 12개다.
  - 용어집 등재 후보 16건 누적 (Phase 7-1 소관): mind map, discourse, moderator, pre-writing, sensemaking, citation recall과 citation precision, subterranean agent, surface orchestration, decision hub, state tracking, task-oriented dialogue, library drift, incorporation, delivery salience, pass^k, defense-in-depth. **A2에서 확정한 skill 복합어 규칙이 실제로 적용됐다.** lee-2026이 "스킬 라이브러리" 음차를 7회 쓰고 있었는데 같은 주제의 yang-2026과 zhao-2026이 원어 `skill library`를 쓰므로 원어로 통일했다. 단일어 "스킬"은 canonical 음차를 유지한다.
  - **`axis-misuse` 오탐을 수정했다** (lee-2026 보고에서 파생). `RE_AXIS_MISUSE`의 숫자어 패턴이 "무제**한 축**적"을 "한 축"으로 잡고 있었다. 숫자어 뒤 `축`이 축적, 축소, 축약, 축구로 이어지면 검출하지 않도록 오른쪽 배제를 넣었다. 왼쪽 한글 음절 배제도 시도했으나 진짜 위반 2건("가장 부정확한 축에 든다"는 축을 부류 의미로 쓴 실제 위반)을 함께 죽여 되돌렸다. 회귀 13케이스를 통과하고(진짜 위반 5종 검출 유지, 오탐 8종 차단) 전 저장소 검출 54건은 불변이라 순수 예방 효과다. **이 스크립트 변경은 규약과 달리 A10 문서 커밋(`36d9203`)에 함께 들어갔다** (`git add -A`가 먼저 stage했다). 이력을 다시 쓰지 않고 사실만 기록한다.
  - 부수 발견 1건. `raw/papers/lee-2026-the-agent-loop-a-survey-figures/figures.json`의 `curated` 필드가 18항목 전부 `false`다. 실제 큐레이션 상태는 sources frontmatter가 들고 `lint_figures.py`도 frontmatter를 기준으로 판정하므로 기능 문제는 없지만, 매니페스트와 frontmatter가 다른 값을 들고 있는 구조다 (raw 불변 규약에 따라 손대지 않았다).
- [x] A11 CUA와 브라우저 에이전트 (5편): wang-2026-cua-gym-scaling-verifiable-training-environments, xlang-ai-cua-gym, xlangai-cua-gym-dataset, browser-use-browser-use, browser-use-browsercode
  - 완료 (2026-09-07). wiki 본문 합계 26,443자에서 111,193자로 4.20배가 됐고 표는 5개에서 130개다. 압축비 중앙값 0.68에서 1.43, 최소값 0.65에서 1.41이다. 편별로는 wang-2026 0.76에서 1.53, xlang-ai-cua-gym 0.65에서 1.41, cua-gym-dataset 0.68에서 1.48, browser-use 0.67에서 1.42, browsercode 0.86에서 1.43이다. **wang-2026은 wiki 본문 52,847자에 표 60개로 Phase 2 단일 페이지 최대다.**
  - sources는 합계 35,849자에서 75,334자, 표 14개에서 70개가 됐다.
  - lint 5종 0건 (10개 파일).
  - 카테고리 총계 감소: agents error 570건에서 352건(-218), warning 31건에서 12건(-19), 위반 파일 23개에서 13개(-10)이다. lint_terms는 4건을 유지한다. physical-ai 회귀 게이트 두 줄 모두 exit 0을 유지한다.
  - `wiki-uncurated-figure`가 132건에서 113건으로 19건 줄었다 (wang frontmatter 245줄에서 104줄, xlang-ai-cua-gym 40줄에서 15줄로 `figures:` 키 자체 제거).
  - caption 정비 22건 (wang-2026). index.md 5항목을 375, 223, 220, 926, 704자에서 185, 153, 170, 174, 165자로 줄였다. Agents 절 200자 초과는 12개에서 **7개**다.
  - **`candidate-table-mismatch` 14건을 해소했다** (wang-2026, 242건으로 감소). 밀림의 실제 양상은 A10의 shao-2024와 달랐다. 표가 `fig01`에서 `tab01`까지 11행을 적고 **`tab02`부터 `tab13`까지 12개를 한 행으로 압축**해 두어, lint가 그 압축 행을 유령 id로 잡고 frontmatter의 12개를 미등재로 잡은 것이다. 23행 전량으로 재작성했고 부록 표 12개는 `추천` 열에 "본문에 표로 옮김"으로 실제 반영 위치를 표기했다.
  - **cross-source 무출처 유입이 이 배치에서 가장 많이 나왔다 (13건).** xlang-ai-cua-gym 6건이 한 편 최다다. GSPO 학습, 10,910 task, 홍콩대 XLANG Lab 소속, `SKILL.md`, "프로그램 방식 커버리지 최대"가 전부 그 저장소 raw에 없는데 서술돼 있었다. browsercode 4건(OSWorld 실패의 grounding 비중, Cloud v4 성적, BU Bench 구성, "고정된 agent loop의 기성품"), cua-gym-dataset 3건(32,112 검증 튜플, 환경 110개, 행정 검토 서술)이다. **전부 삭제가 아니라 문장 안 wikilink 명시 귀속으로 전환했다.** 같은 프로젝트를 논문, 구현, 데이터셋 세 페이지로 나눠 다루는 클러스터에서 이 유형이 집중된다는 것이 A6의 gstack, A7의 Headroom에 이어 세 번째로 확인됐다.
  - 사실 오류 정정 중 중요한 것 세 건. xlang-ai-cua-gym은 **세 에이전트 구성이 틀려 있었다** (raw의 Generator, Discriminator, Orchestrator 대신 `task-gen`을 넣고 Orchestrator를 빠뜨렸다). wang-2026은 "OSWorld-Verified 72.6%로 오픈소스 최고 성적"이라 단정했으나 논문은 "at their respective scales"라는 규모 조건을 달고 있고 같은 표에서 **Kimi-K2.6이 73.1로 더 높다**. browsercode는 raw에 없는 GitHub API 조회값(TypeScript, 생성일, 푸시일)과 존재하지 않는 저장소 설명 문구를 담고 있었다.
  - **star 수 서술은 이번엔 근거가 있었다.** browser-use의 11만 1,981개는 raw Appendix A의 GitHub API JSON에 실재한다(A3에서 star 수가 raw에 없는데 적혀 있던 사례와 반대다). 표기만 한국식 단위와 수집 시점 명시로 고쳤고, 근거 없는 최상급 "이 계열에서 가장 널리 쓰이는"은 양쪽에서 삭제했다.
  - **논문 내적 불일치 21건을 wang-2026 한 편에서 기록했다.** A9의 12건, A10의 9건을 넘는 최다다. 코퍼스 총량 32,112 대 32,122, advantage 정의가 본문 식과 부록 설정에서 다름, Figure 7 캡션의 "상대 순서 보존"이 그림과 어긋남, Figure 5 캡션이 최대 이득으로 지목한 `vs_code`가 실제로는 +0.0%p로 최소, mock 앱 수 94 대 Table 3 열거 98개, **"앱당 검증 튜플 1,000개 이상" 하드 제약이 산술상 불가능**(110 곱하기 1,000이 11만으로 32,112를 크게 넘는다), 환경 스케일링 결론이 설계상 미검증(비교 조건이 빠져 있다) 등이다. 전부 표 수치를 기준으로 삼고 wiki에 별도 절로 기록했다.
  - 이미지 표 셀 오류 2건도 정정했다 (A8형). Figure 6c의 Open 열에서 InfiniteWeb과 UltraCUA가 `No★`(공개 약속했으나 미공개)인데 양쪽 문서가 "부분"으로 적고 있었다.
  - **크롭 결함은 이번 배치에서 0건이다.** wang-2026의 23장을 `md5sum | uniq -d -w32`로 검사해 중복 배정이 없음을 확인했다. A10에서 확립한 검사 방법이 정상 stem에서도 작동한다.
  - 부수 발견 2건. (1) **세 페이지의 규모 수치가 서로 다른 것이 정상이다.** 논문 Table 9의 "released corpus"는 32,110(합계 오차 포함)이고 HF 배포판은 10,910 task다. 논문의 released는 계획된 전체 코퍼스를 뜻해 실제 배포분과 다르므로 어느 페이지도 정정 대상이 아니지만, index나 overview에서 규모를 언급할 때 32,112(논문)와 10,910(현재 배포분)을 구분해야 한다. (2) `xlangai-cua-gym-dataset`의 frontmatter tags에 **physical-ai 통제 태그 어휘인 `robot-dataset`**이 잘못 들어 있었다. 이 데이터셋에 로봇은 없다. HF 카드가 실제 선언한 태그로 교체했다.
  - 용어집 등재 후보 15건 누적 (Phase 7-1 소관): materialize, RLVR, computer-use agent, state injection, session isolation, information barrier, golden state와 golden patch, primitive, vendoring, reasoning effort, open-weight, provider prefix, stealth, 텔레메트리, reward hacking. **RLVR은 이 배치 3편이 전부 쓰는데 두 용어집 어디에도 없다.** `glossary-llms.md`의 RLHF 행과 짝으로 등재하는 것이 제안됐다.
- [x] A12 에이전트 인프라와 컨텍스트 자산 (6편): rodrigues-2026-mcp-server-architecture-patterns, block-buzz, stablyai-orca, google-labs-code-design-md, hall-2026-atlassians-design-md-is-here, theaxlabs-2026-company-brain-prompt-guide
  - 완료 (2026-09-07). wiki 본문 합계 29,671자에서 112,248자로 3.78배가 됐고 표는 10개에서 140개다. 압축비 중앙값 0.80에서 1.41, 최소값 0.57에서 1.24다. 편별로는 rodrigues 0.61에서 1.40, block-buzz 0.94에서 1.24, stablyai-orca 0.95에서 1.51, google-code-design-md 0.82에서 1.66, hall-2026 0.57에서 1.42, theaxlabs 0.77에서 1.40이다.
  - sources는 합계 39,363자에서 79,062자, 표 14개에서 86개가 됐다.
  - lint 5종 0건 (12개 파일).
  - **카테고리 총계가 사실상 0에 도달했다. agents error 352건에서 1건, warning 12건에서 0건, 위반 파일 13개에서 1개, lint_terms 4건에서 0건이다.** 잔여 error 1건은 `index.md:161`의 `mattpocock-skills` 항목이 em dash 구분자를 쓰는 것이고, 계획서가 A13에서 "index.md 항목 점검만" 하도록 배정한 stem이다. physical-ai 회귀 게이트 두 줄 모두 exit 0을 유지한다.
  - caption 정비 20건 (rodrigues 10, theaxlabs 8, block-buzz 2). `candidate-table-mismatch`가 242건에서 232건, `wiki-uncurated-figure`가 113건에서 101건이 됐다 (rodrigues frontmatter 73줄에서 37줄, theaxlabs 58줄에서 15줄, block-buzz 49줄에서 33줄).
  - index.md 6항목을 348, 375, 404, 294, 392, 495자에서 197, 177, 191, 153, 160, 137자로 줄였다. **Agents 절 200자 초과가 7개에서 1개**가 됐고 잔여 1건은 A13 대상인 `magnitudedev-magnitude`다.
  - frontmatter `title:` 금지 기호가 12건에서 10건이 됐다 (theaxlabs 2건 해소. 원문 렌더링을 확인해 실제 구분자가 em dash임을 판정하고 A5의 thariq, A7의 headroomlabs 선례대로 콜론으로 교체했다).
  - **caption 중복 6건의 원인을 규명했다** (theaxlabs). `figures.json`의 초기 caption이 7장 중 5장에서 `"도식 영역 크롭"` 한 문구였고, 착수 sources와 wiki가 이를 부분 정비하다가 `"관련 글 카드 썸네일"` 한 문구를 fig05, fig06, fig07 세 항목에 복제해 파일당 3건, 두 파일 합쳐 6건이 됐다. 크롭을 직접 열어 7장 전부 서로 다른 caption으로 다시 썼다.
  - **cross-source 무출처 유입의 새 하위 유형 두 가지가 나왔다.** 지금까지는 다른 자료의 사실을 출처 없이 가져오는 형태였는데, 이번에는 (1) **다른 페이지가 무엇을 말하는지를 지어낸 오귀속**과 (2) **의미 방향이 뒤집힌 인용**이 확인됐다.
    - (1) `stablyai-orca`의 관련 페이지 설명이 `walkinglabs-learn-harness-engineering`을 "worktree 중심 코스"로 소개했으나 **그 페이지에 worktree 언급이 0건**이다. 실제 내용은 harness 5개 하위 시스템이다. 두 번째 건도 `ai-boost-awesome-harness-engineering`에 없는 절을 근거로 삼고 있었다. **저장소 전수 점검 결과 이 오귀속은 orca 한 편으로 국한된다** (walkinglabs를 링크하는 다른 5개 페이지는 5개 하위 시스템 코스로 정확히 서술한다).
    - (2) `google-labs-code-design-md`가 형제 페이지 수치를 "DESIGN.md는 컨텍스트를 약 30% **점유**한다"로 인용했으나 원표는 "약 30%만 **확보**한다"(MCP는 약 80%)였다. 값은 같고 뜻이 반대라 수치 대조만으로는 잡히지 않는다. 양쪽을 고치고 wikilink 귀속과 "이 저장소가 제시한 수치가 아니다"라는 단서를 남겼다.
  - 무근거 수치 정정에서 심한 것 세 건. block-buzz의 "star 31,325, fork 3,999, 생성 2026년 3월 6일"은 raw에 **전무**하고(README에 저장소 통계 자체가 없다) "최종 push 2026-08-29"는 frontmatter `fetched_at`을 저장소 사실로 승격한 것이었다. google-code-design-md는 존재하지 않는 `examples/` 3종과 "Bun 기반", "2026-04 생성", Stitch 문서 링크를 담고 있었다. stablyai-orca는 "30여 종"이 실측 29종이고 존재하지 않는 star history 차트를 서술했다.
  - hall-2026에서 **attribution 세 주체를 분리했다.** Google의 규격, Atlassian의 자기 보고 실측, 저자의 판단이 섞여 서술돼 있었다. 또 "MCP나 Skill이 토큰도 시간도 정확도도 낫다"는 단정이 표와 어긋났다(ADS Skill 443만이 No context 420만보다 크다). 비교 기준을 "DESIGN.md 대비"로 한정하고 역전을 별도 행으로 넣었다.
  - **원문에 도식이 있는데 "없다"고 적힌 사례를 처음 확인했다** (theaxlabs). HTML과 SVG로 그려진 정보 도식 2개가 실재하는데 `<img>`가 아니라서 `fetch_article.py`가 개별 파일로 수집하지 못하고 `page-full.png` 안에만 남아 있었다. 내용을 wiki 표와 산문으로 재구성하고 재수집이 필요할 경우의 도식 위치(page-full.png 기준 y 좌표)를 기록했다.
  - 크롭 결함 2건을 새로 기록했다 (rodrigues의 `tab01`은 페이지 양단을 잡아 Table II와 본문 산문까지 들어왔고, `tab03`은 세로 범위가 짧아 데이터 5행 중 4행이 잘렸다). 재크롭 좌표를 8절 아래에 남겼고 `--force`는 쓰지 않았다. theaxlabs의 `crop01`과 `crop02`는 md5가 동일한 중복 파일이다. **누적 크롭 결함 12건이다.**
  - **`lint_figures.py`의 8절 파서 제약을 수정했다** (rodrigues 보고에서 파생, 별도 커밋). 8절 안에 재크롭 좌표 표를 두면 그 표의 첫 열이 figure id로 읽혀 오탐이 났다. 첫 표 블록이 끝나는 빈 줄에서 파싱을 멈추도록 고쳤고 전 저장소 검출 수치는 불변이다. 1-8에서 만든 규칙이 실사용에서 드러낸 두 번째 개선점이다.
  - 용어집 등재 후보 20건 누적 (Phase 7-1 소관): 팬아웃, worktree, slop, design token, theming, truncation, ACP, substrate, audit trail, MCP, primitive, composite tool, retrieval-over-tools, sanitize, namespace, structured error content, Cohen's kappa, negative constraint, normative value, DESIGN.md. **판단이 필요한 항목 둘.** `audit trail`은 원어 9회 대 "감사 추적" 9회로 정확히 반반 갈려 있어 방향 결정이 필요하다. `design token`은 LLM `토큰`(canonical)과 동형 충돌해 A12에서 두 편이 각자 안내 문단을 따로 두어야 했다. 파일 규약명(`AGENTS.md`, `DESIGN.md`, `CLAUDE.md`)은 한 행으로 묶어 "원어 유지" 지침으로 등재하는 안이 제안됐다.
  - 부수 발견 1건. `raw/repos/google-okf`가 파일이 아니라 디렉토리다(`google-okf/SPEC.md` 포함). `raw/repos/`의 다른 항목이 모두 단일 `.md`인 것과 달라, 멀티파일 패키지의 `raw_path`와 `raw_filename` 규약 적용을 확인할 필요가 있다. 해당 stem 담당 배치나 Phase 7-5 소관이다.
- [x] A13 세션 중 편입분 (1편): magnitudedev-magnitude (압축비 1.05로 기준 미달. mattpocock-skills는 1.33에 표 15개로 기준 안이라 제외하고 index.md 항목 점검만 한다)
  - 완료 (2026-09-07). magnitudedev-magnitude의 wiki 본문이 15,164자에서 38,154자, 표가 11개에서 37개, 압축비가 1.05에서 1.40이 됐다. sources도 14,469자에서 27,318자, 표 10개에서 20개다. lint 5종 0건이고 착수 시점의 0건 상태를 깨지 않았다. raw README가 71,406자(Appendix A에서 H까지 verbatim 포함)로 압축률 5:1이었고 CLI 명령 20개, ICN 빌드 명령 14개, projection 13종, crate 13개 등을 표로 복원했다.
  - **"harness 9종"은 실측이 맞았다.** `onboarding.md` 표 9행과 `docs/get-started.mdx` 열거가 일치한다. README와 FAQ는 외부 8개만 열거하고 내장 harness를 별도 문장으로 언급하므로 "외부 8 더하기 자체 1"임을 wiki 요약에 명시했다. star 3,437과 fork 247도 raw Appendix A의 GitHub API JSON에 실재해 A12의 block-buzz와 반대 결과였다. 다만 `pushed_at`이 수집일과 같은 날이라 sources에 그 사실을 적고 wiki에서는 push 날짜 주장을 쓰지 않았다.
  - 오귀속 점검에서 1건을 고쳤다. 관련 페이지 5편을 전부 열어 대조한 결과 `ai-boost-awesome-harness-engineering` 항목이 "harness 연결 개념의 배경"이라는 근거 없는 인과를 붙이고 있어 실제 내용(자료 385개를 문제 단위로 분류, CC0)으로 교체했다. cross-source 무출처 유입과 의미 방향 역전은 0건이었다.
  - **부수 요청 판정: `raw/repos/`의 WebFetch 요약본 2편을 확정했다.** `garrytan-gstack.md`(3,209자)는 README 마크다운 구조가 없는 3인칭 영문 digest이고, `garrytan-gbrain-tutorials.md`(6,988자)는 스스로 "WebFetch로 수집한 5개 문서 요약"이라 적고 "마지막 두 파일은 verbatim 재현이 거부되어 상세 요약으로 대체"까지 명시한다. A6과 A11 배치가 각각 조사 범위 밖이라 남긴 항목이 여기서 마무리됐다.
  - `mattpocock-skills`는 계획서대로 재작성하지 않고 index.md 항목만 정리했다 (오케스트레이터 직접 수정). em dash 구분자를 `]]: `로 바꿨고 180자에서 179자다. 스킬 25개와 MIT 라이선스는 wiki 페이지와 sources frontmatter에서 근거를 확인했다. **이 한 줄이 `--category agents`의 마지막 lint error였다.**
- [x] A-완료. index.md Agents 절 축소(66항목, 200자 이내, 구분자 `]]: ` 통일), `--category agents` lint 0건, physical-ai 회귀 확인, 카테고리 완료 계량 기록
  - 완료 (2026-09-07). 네 게이트 전부 통과했다.
  - **게이트 1: index.md Agents 절.** 66항목, 200자 초과 0개, 금지 기호 0개, 구분자 미통일 0개다. 착수 시점은 66항목 중 200자 초과 55개였다 (신규 3편 추가 전 63항목 중 56개).
  - **게이트 2: `--category agents` lint 0건.** 검사 파일 133개(wiki 66, sources 66, index.md Agents 절)에 `lint_style` error 0 warning 0, `lint_terms` 0건이다. `--strict` 두 명령 모두 exit 0이다. **착수 기준선은 error 3,569건, warning 89건, lint_terms 122건, 위반 파일 126개였다.**
  - **게이트 3: physical-ai 회귀 없음.** 계획서 6절 1항의 두 명령 모두 exit 0이고, 검사 파일이 154개에서 **167개**로 늘었는데도(다른 세션이 Phase 2 진행 중 physical-ai 자료 5편을 새로 ingest했다) error 0 warning 0을 유지한다.
  - **게이트 4: 카테고리 완료 계량.** 아래 표가 physical-ai 완료치와 대조한 값이다.

| 지표 | agents 착수 | agents 완료 | physical-ai 완료치 |
|---|---|---|---|
| 편수 | 61 | 66 (신규 3, 세션 중 편입 2) | 77 |
| sources보다 얇은 페이지 | 58 / 61 | **0 / 66** | 1 / 76 |
| 압축비 중앙값 | 0.72 | **1.42** | 1.95 |
| 압축비 최소 | 미기록 | 1.10 | 미기록 |
| wiki 본문 중앙값 | 4,953자 | **17,227자** | 14,156자 |
| wiki 산문 중앙값 | 4,010자 | 10,395자 | 미기록 |
| 표 총수 | 79 | **1,213** | 737 |
| 표 편당 | 1.30 | **18.38** | 9.70 |
| 표 0개 페이지 | 24 | **0** | 0 |
| `## 핵심 용어` 절 보유 | 0 / 61 | **66 / 66** | 76 / 76 |
| frontmatter 100줄 초과 | 11 | 4 (전부 정상 판정) | 7 (전부 정상 판정) |
| lint_style error | 3,569 | **0** | 0 |
| lint_style warning | 89 | **0** | 0 |
| lint_terms | 122 | **0** | 0 |
| index.md 200자 초과 | 55 / 66 | **0 / 66** | 0 / 76 |

  - **본문 중앙값과 표 편당은 physical-ai 완료치를 넘어섰다.** 표 편당 18.38개는 physical-ai 9.70개의 1.9배다. 배치가 진행되며 "표로 꺼낸다"는 지시가 누적 학습된 결과로 보인다. 압축비 중앙값 1.42는 physical-ai 1.95에 못 미치는데, sources도 함께 보강해 게이트가 계속 올라간 구조 때문이다 (sources 본문 합계가 배치별로 2배에서 4배가 됐다).
  - frontmatter 100줄 초과 잔여 4편은 전부 정상 판정이다. `lee-2026`(126줄, 전체의 14%), `zhang-2026`(114줄, 13%), `zhou-2026`(104줄, 15%), `wang-2026`(104줄, 9%)이고 네 편 모두 `curated: false`가 0건이다. physical-ai 완료치의 정상 범위(14~23%)와 같은 성격이다.
  - 압축비 최소 3편도 사유가 분명하다. `lin-2026`(1.10)은 sources를 18,694자에서 31,451자로 보강했고, `shao-2024`(1.12)는 계획서 지정 40,000자 재추출로 5,637자에서 19,145자가 됐으며, `lee-jeongmin`(1.14)은 창작 서술 2,640자를 삭제한 뒤의 값이다. 세 편 모두 게이트가 올라간 쪽이거나 부풀린 내용을 걷어낸 쪽이다.
  - **전 저장소 잔여 지표 (Phase 3 이후 소관).** lint_style error 5,555건, warning 161건, lint_terms 148건, lint_links error 1건과 warning 130건이다. `lint_figures`는 error 109건(`figures-missing` 8, `wiki-uncurated-figure` 101)과 warning 234건(`candidate-table-mismatch` 232)이다. `HUMANIZE-SUMMARY` 잔재 7파일과 frontmatter `title:` 금지 기호 10건도 남아 있고 전부 비-agents 카테고리다.
  - **Phase 2 누적 산출물.** wiki 본문 합계가 착수 약 30만 자에서 **약 118만 자**가 됐고(13개 배치 합산) 표는 76개에서 1,213개다. caption 정비 약 300건, figures 백필 4 stem 84장(lin 23, qiao 17, zou 30, dennis 14), `wiki-uncurated-figure` 210건에서 101건, `figures-missing` 12건에서 8건, 고아 sources 5편에서 1편이다. raw 재독으로 잡은 무근거 주장이 **약 250건**이고 논문 자체의 내적 불일치 기록이 **약 60건**이다.

### Phase 3. applications 배치 재작성 (B1~B7, 33편 = 기존 32 + 신규 1)

- [x] B1 GBrain 코어 (6편): garrytan-gbrain, garrytan-gbrain-tutorials, xguru-2026-gbrain-open-source-personal-knowledge, tilnote-2026-gbrain-repository-core-summary, techwealth-hub-2026-garry-tan-gbrain-explained, vectorize-2026-gbrain-review-honest-assessment
  - 완료 (2026-09-07). 6편 전부 게이트를 통과했다. wiki 본문 합계 19,492자에서 72,959자로 3.74배가 됐고 표는 4개에서 78개다. 압축비 중앙값 0.54에서 1.33, 최소값 0.42에서 1.30이다. 편별로는 garrytan-gbrain 0.51에서 1.32, garrytan-gbrain-tutorials 1.07에서 1.34, xguru-2026 0.56에서 1.54, tilnote-2026 0.75에서 1.52, techwealth-hub-2026 0.49에서 1.30, vectorize-2026 0.42에서 1.32다. 얇은 페이지 5편에서 0편, 표 0개 페이지 3편에서 0편이다.
  - sources도 문체 정비로 합계 35,080자에서 54,243자, 표 3개에서 24개가 됐다. 번호 붙은 영문 병기 헤딩은 규약대로 유지했다.
  - lint 5종 0건. 12개 파일에 lint_style error 0 warning 0, lint_terms 0, audit_captions 0, lint_links error 0 warning 0, lint_figures 0이다. `lint-style: ignore`와 `lint-terms: ignore` 예외는 6편 전부 한 건도 쓰지 않았다.
  - 카테고리 총계 감소: applications error 2,400건에서 2,087건(-313), warning 80건에서 65건(-15), 위반 파일 66개에서 54개(-12), lint_terms 55건에서 53건(-2)이다. physical-ai 회귀 게이트 두 줄 모두 exit 0을 유지한다.
  - **raw 재독이 무근거 주장 80건을 잡았다.** 배치 6편 중 트렁크 `garrytan-gbrain` 한 편이 32건으로 Phase 2 최대 배치급이다. 원인은 시점 격차다. sources는 v0.36.x 클론(2026-05-22) 기준으로 쓰였는데 `raw/repos/garrytan-gbrain.md`는 v0.41.x 시점 README 수집본이고, 그 사이 서술이 2차 자료(Vectorize 리뷰, 해설 영상)에서 역류해 있었다.
  - 대표 사례 5건. (1) 운영 규모 수치가 raw와 정반대였다. "17,888 pages / 4,383 people / 723 companies / 21 cron jobs"로 적혀 있었으나 raw 첫 단락은 146,646 페이지, 24,585명, 5,339개 회사, cron job 66개이고 "12 days"는 raw 어디에도 없다. (2) 설치 방법이 뒤집혀 있었다. `bun install -g github:garrytan/gbrain`을 "postinstall hook이 막혀 실패하는 footgun"으로 적었으나 raw는 그것을 표준 설치 명령으로 권장한다. (3) ZeroEntropy 성능표 전량(442ms 대 973ms, $0.05/M 대 $0.13, 20쿼리 11승 등)이 raw에 없다. (4) vectorize-2026의 부호 오류. 양쪽이 "graph 끄면 -31.4 P@5pp"로 적었으나 raw는 "+31.4 points P@5"로 graph 있는 쪽이 높다. (5) techwealth-hub-2026의 "GBrain 출시 6일 뒤"와 "가장 이른 해설"이 둘 다 raw에 근거가 없다. 전자는 raw에 공개 일자 자체가 없다.
  - caption 정비는 해당 없음이다. B1 6편 전부 `figures:` 키와 `-figures/` 디렉토리가 없다.
  - index.md 6항목을 181, 168, 183, 191, 172, 164자에서 195, 180, 178, 198, 195, 200자로 다시 쓰고 구분자를 `]]: `로 통일했다. 여섯 항목 모두 착수 시점부터 200자 이내였으므로 Applications 절 200자 초과 18개는 변동이 없다 (나머지 배치 소관).
  - **사용자 결정 2건 (2026-09-07).** (1) B2의 `dnotitia-2026-akb-product-introduction` figure 재크롭 23건을 **생략**한다. 조사 결과 이 자료는 23쪽 슬라이드 덱이고 크롭 23장은 슬라이드 1장씩을 300 DPI(2666x1500)로 전면 렌더한 것이다. 논문에서 `page-region`은 검출 실패를 뜻하지만 슬라이드 덱에서는 슬라이드가 곧 도식 단위라 정상 출력이다. 텍스트만 있는 슬라이드가 다수이고(fig05 등), 도식이 있는 슬라이드도 제목 줄이 도식의 의미를 담아 잘라내면 정보가 줄어든다. 2-2절의 "figure 크롭 품질 잔여 약 23건"은 `strategy` 라벨만 보고 판정한 값이므로 여기서 정정한다. B2는 그 시간을 큐레이션 판단과 caption 23건 한글 정비에 쓴다. (2) frontmatter `title:`의 금지 기호는 **sources와 wiki만 정규화하고 raw는 보존**한다. CLAUDE.md의 "em dash 전면 금지(제목과 본문 모두)"와 "title은 원어 그대로"가 충돌하는 자리인데, 원제 정보는 sources `## 1. 자료 정보`에 인라인 코드로 남겨 손실을 막는다. 대상은 전 저장소 5개 stem이고 그중 4개가 applications다: xguru-2026(B1 처리 완료), dnotitia-akb(B2), shamsi-2026-graphify(B4), patel-2026(B7). 남은 1개는 llms의 중간점 사례로 Phase 5 소관이다.
  - 오케스트레이터 직접 처리 1건. xguru-2026의 title을 `GBrain — 오픈소스 개인 지식 베이스`에서 `GBrain: 오픈소스 개인 지식 베이스`로 바꾸고 sources 1절에 원제를 인라인 코드로 기록했다. 인라인 코드는 두 lint가 모두 마스킹하므로 금지 기호를 인용하는 표준 수단이다 (Phase 1-6에서 확립).
  - 용어집 등재 후보 20건 누적 (등재하지 않음, Phase 7-1 소관): MCP(Model Context Protocol, 두 용어집 모두 미등재로 grep 0건), system of record, source of truth, contract-first, single source of truth, opinionated software, hybrid search, hybrid retrieval, RRF, chunking, multi-query expansion, incremental sync, skill pack, schema pack, gap analysis, job queue, boost, soft delete, backfill, entity, derived index, multi-tenant과 multi-operator, personal brain, temporal reasoning, self-contained HTML, backlink. `compounding`은 CLAUDE.md가 이미 "지식 복리"로 쓰고 있어 등재 시 표기 충돌 판정이 필요하다.
  - 자료 자체의 내적 모순 4건을 wiki에 기록했다. (1) `garrytan-gbrain-tutorials`의 비용 표는 항목 상한을 더하면 $630인데 같은 표의 합계가 $100에서 $150이다. (2) raw README가 reranker 기본 적용 범위를 두 곳에서 다르게 적는다. (3) 같은 README가 기본 페이지 타입 개수를 15종과 24종, 22종으로 세 번 다르게 적는다. (4) `techwealth-hub-2026`의 영상 자막이 도메인을 앞부분 conductora.com, 끝부분 Conducto.com으로 다르게 표기한다.
  - **부수 발견 2건 (Phase 7-5 후보).** (1) `raw/` frontmatter의 `raw_path`가 다른 머신의 절대경로(`/Users/kmyu/Desktop/project/ai-wiki/...`)인 파일이 최소 2개 있다(`raw/videos/techwealth-hub-...`, `raw/articles/vectorize-2026-...`). CLAUDE.md의 "`raw_path`는 반드시 `raw/` 내부를 가리킨다" 규약과 어긋나지만 raw 불변이라 손대지 않았다. 저장소 전수 조사가 필요하다. (2) `raw/articles/vectorize-2026-gbrain-review-honest-assessment.md`는 머리에 "WebFetch로 추출한 본문 다이제스트이고 일부 문장은 모델이 발췌, 재구성했을 수 있다"는 고지를 달고 있다. CLAUDE.md는 기사 수집에 WebFetch를 금하고 `fetch_article.py`를 승인 수단으로 지정하므로 문장 단위 인용 검증이 불가능한 상태다. 재수집 후보로 남긴다.
  - 다음 배치로 넘길 확인 사항 1건. 트렁크 재작성으로 옛 수치가 걷혔으므로, 다른 GBrain 페이지(`gajjar-2026-gbrain-vs-computer-memory` 등)가 인용한 17,888 pages 계열 수치가 각자의 raw에 실재하는지 B2에서 교차 확인한다.
- [x] B2 AKB와 지식 베이스 비교 (6편, 신규 wiki 1편과 figure 재크롭 23건): dnotitia-akb, dnotitia-2026-akb-product-introduction(신규, page-region 23건을 좌표 재사용 방식으로 재크롭, `--force` 금지), kmyu-2026-akb-llmwiki-gbrain-comparison, gajjar-2026-gbrain-vs-computer-memory, liu-2026-rag-llm-wiki-or-gbrain, mantena-2026-hermes-gbrain-setup-vps
  - 완료 (2026-09-07). 6편 전부 게이트를 통과했다. wiki 본문 합계 38,538자에서 108,793자로 2.82배가 됐고(신규 1편 포함) 표는 9개에서 94개다. 압축비 중앙값 0.66에서 1.36, 최소값 0.46에서 1.30이다. 편별로는 dnotitia-akb 0.78에서 1.30, dnotitia-2026-akb 신규 작성 1.38, kmyu-2026 0.66에서 1.39, gajjar-2026 0.60에서 1.35, liu-2026 1.08에서 1.30, mantena-2026 0.46에서 1.50이다. 얇은 페이지 4편에서 0편, 표 0개 페이지 2편에서 0편이다.
  - **고아 sources가 0편이 됐다.** `dnotitia-2026-akb-product-introduction` wiki를 신규 작성해 계획서 2-5절의 5편이 전부 해소됐다. 본문 22,694자, 산문 14,350자, 표 25개, frontmatter 98줄(curated 12항목)이고 sources 16,413자를 넘어 1차 게이트를 통과한다.
  - sources도 문체 정비로 합계 49,820자에서 80,104자, 표 5개에서 52개가 됐다.
  - lint 5종 0건. 12개 파일에 lint_style error 0 warning 0, lint_terms 0, audit_captions 0, lint_links error 0 warning 0, lint_figures 0이다. 예외 주석은 6편 전부 한 건도 쓰지 않았다.
  - 카테고리 총계 감소: applications error 2,087건에서 1,507건(-580), warning 65건에서 49건(-16), 위반 파일 54개에서 43개(-11), lint_terms 53건에서 46건(-7)이다. 검사 파일은 신규 wiki 1편으로 66개에서 67개가 됐다. `lint_figures --category applications`는 warning 17건에서 0건이 됐고 error 4건은 B5의 `wlsdks-ontology-atlas` 소관이다. physical-ai 회귀 게이트 두 줄 모두 exit 0을 유지한다.
  - **raw 재독이 무근거 주장 81건을 잡았다.** 편별로 dnotitia-akb 37건, liu-2026 8건, gajjar-2026 9건, mantena-2026 8건, kmyu-2026 7건, dnotitia-2026-akb 12건이다.
  - **구조적 원인을 규명했다. 커밋 `0507ad0`(2026-06-17)이 `raw/repos/`의 전체 클론 14개를 README 스텁으로 경량화하면서(185MB에서 344KB) sources와 wiki 28개 파일의 `raw_path`와 `raw_filename`만 갱신하고 본문을 재검증하지 않았다.** 그래서 그 stem들은 지금은 존재하지 않는 근거(`CHANGELOG.md`, 테스트 스크립트, `eval/` 결과, 소스 파일 경로, 커밋 해시)에 기댄 서술을 그대로 안고 있다. 영향 stem은 13개이고 applications 8편(`agricidaniel-claude-obsidian` B3, `colbymchenry-codegraph` B5, `dnotitia-akb` B2 완료, `dragon1086-llm-wiki` B3, `garrytan-gbrain` B1 완료, `joonan30-llm-wiki-labs` B3, `lum1104-understand-anything` B5, `safishamsi-graphify` B4), database 4편(`athina-ai-rag-cookbooks` D4, `hkuds-rag-anything` D2, `ryancodrai-turbovec` D5, `vectifyai-pageindex` D3), evaluations 1편(`marker-inc-korea-autorag` E2)이다. **agents는 0편이라 완료된 Phase 2에 회귀 위험이 없다.** 무근거 주장 최대 2건(garrytan-gbrain 32건, dnotitia-akb 37건)이 둘 다 이 목록의 stem이었던 것이 우연이 아니다. 남은 배치의 subagent가 자동으로 점검하도록 배치 공통 브리프에 부록으로 넣었다.
  - 대표 정정 5건. (1) **`dnotitia-akb`의 라이선스가 통째로 틀렸다.** "PolyForm Noncommercial 1.0, 비영리만 무료"로 적혀 있었으나 README 본문은 BUSL-1.1이고 Named Seat 100석 미만이면 상업 프로덕션도 무료이며 각 버전 4년 뒤 Apache 2.0으로 자동 전환된다. npm 프록시는 MIT다. (2) 같은 페이지의 "임베딩 endpoint는 필수 외부 의존"이 정반대였다. README는 not strictly required라 적고 endpoint가 없으면 pgvector와 qdrant가 BM25 전용으로 degrade한다고 명시한다. (3) `mantena-2026`이 Hermes 제작 주체를 Garry Tan으로 귀속했으나 raw는 밝히지 않고 저장소 README는 `openclawagents/hermes`로 링크한다. (4) 같은 페이지의 Supabase 실패 모드가 `garrytan-gbrain` raw에서 흘러들어온 서술이었다. 이 raw에는 Supabase가 한 번도 나오지 않는다. (5) `liu-2026`이 "Karpathy LLM Wiki v2"를 Karpathy 작업으로 적었으나 raw는 community extensions라고 적는다.
  - **2차 자료 역류를 대규모로 걷어냈다.** `dnotitia-akb` wiki 본문의 절반가량이 짝 자료인 제품 소개 deck의 내용이었고 **다른 stem의 figure 8장을 임베드**하고 있었다. Collector, Gardener, 21일 무인 운영, 9-Vault, XDR 절과 "deck이 더한 5가지" 표까지 전량 제거했다. wiki frontmatter가 74줄에서 15줄이 된 원인이고, 착수 caption 정비 8건도 이 제거로 함께 해소됐다. deck 내용은 신규 작성한 `dnotitia-2026-akb-product-introduction`이 온전히 담는다.
  - **GBrain 운영 규모 수치 교차 확인 완료.** B1이 트렁크에서 발견한 옛 수치(17,888 페이지 / 4,383명 / 723개 회사)는 `gajjar-2026`과 `liu-2026`의 raw에 **실재한다**. 정정 대상이 아니라 인용 시점 값이므로 두 페이지 모두 인용 시점을 명시하고 README 현재 값(146,646 / 24,585 / 5,339 / cron 66 / curated skill 43)을 한계 절에 병기해 대조 가능하게 했다. `kmyu-2026`은 GBrain 운영 규모를 전혀 인용하지 않아 정정 대상이 없었다.
  - caption 정비 23건. `dnotitia-2026-akb-product-introduction`의 crop 23장을 전부 열어 PDF와 대조하고 한글로 다시 썼다. 금지 기호 23건이 0건이 됐다. figure 큐레이션은 착수 8장에서 12장으로 늘렸다. 추가한 4장은 fig04(벡터 검색의 두 약점 대비), fig16(생산자와 소비자 구조도), fig18(Slack 대화가 정책 문서가 되는 흐름), fig20(보안 로그 8종 허브 원형도)이고, 표지 4장과 목차, 마무리는 도식이 없어 제외했다.
  - **사용자 결정 이행 2건.** (1) figure 재크롭 23건은 생략했다. 판정 근거는 B1 기록에 있다. `extract_figures.py`를 실행하지 않았고 `strategy: page-region` 값도 그대로 뒀다. (2) `raw/reports/kmyu-2026-akb-llmwiki-gbrain-comparison-figures/`를 삭제했다. 담당 subagent가 PDF 6페이지 전문을 확인한 결과 도식이 한 장도 없어 이미지 0장은 추출 실패가 아니라 대상 부재였다. `empty-figures-dir`가 전 저장소 0건이 됐다.
  - 오케스트레이터 직접 처리 3건. (1) 신규 wiki 생성 후 `kmyu-2026`과 `dnotitia-akb`의 `## 관련 페이지`에 상호 링크를 추가했다 (작성 시점에는 대상 파일이 없어 담당 subagent가 링크할 수 없었다). (2) `liu-2026`의 index 제안 문구가 202자로 상한을 넘어 183자로 줄였다. (3) `scripts/lint_figures.py`의 `parse_candidate_table()`이 8절 표 id 셀의 마크다운 강조를 벗기지 않아 `**fig06**` 같은 표기에서 `candidate-table-mismatch` 오탐을 냈다. B2에서 16건이 그 원인이었다. `.strip("*_`")`로 정규화했고 전 저장소 총계는 불변이다.
  - index.md 5항목을 193, 265, 179, 209, 198자에서 197, 200, 197, 183, 200자로 다시 쓰고 신규 1항목(196자)을 `dnotitia-akb` 뒤에 넣었다. Applications 절이 32항목에서 33항목이 됐고 200자 초과는 18개에서 16개가 됐다.
  - HUMANIZE 잔재 3파일 제거 (`kmyu-2026` sources 45줄, `liu-2026` wiki 41줄, `dnotitia-2026-akb` sources). 전 저장소 잔재가 7파일에서 4파일이 됐고 남은 4파일은 `agricidaniel-claude-obsidian`(B3)과 `todaycode-2026-graphify`(B4)의 sources와 wiki다.
  - 용어집 등재 후보 24건 누적 (Phase 7-1 소관): hybrid retrieval, dense와 sparse, transport, fallback, driver, shared memory substrate, memory operations, publish layer, proactive agent, compounding, resolver, chunk와 chunking, idempotent, signal-detector, knowledge operating system, two-way sync, multi-tenant, ingest와 ingestion, knowledge graph, slug, cron, PKCE, redaction, HITL, on-premise, XDR.
  - 자료 자체의 내적 모순 4건을 기록했다. (1) 제품 소개 deck의 3장 제목과 22쪽은 탐색 경로를 다섯 가지로 적지만 6쪽 도식은 네 가지만 나열하고 다섯 번째가 자료 어디에도 없다. (2) 같은 deck의 Collector 6개 소스와 19쪽 실시간 흐름의 6개 소스가 다른데 관계 설명이 없다. (3) deck 원본에 오탈자 6건이 있다("안 보변", "SGL", "구조회해", "관라하고", "Valut", "ABK"). (4) `dnotitia-akb`의 raw frontmatter `license:` 값(PolyForm Noncommercial 1.0)이 같은 파일이 감싼 README 본문(BUSL-1.1)과 모순된다. **raw frontmatter 정정 여부는 사용자 판단 사항으로 남긴다** (raw 불변 규약과 충돌하고, 같은 성격의 문제가 다른 스텁 stem에도 있을 수 있다).
  - **B3 확인 사항 1건.** `kmyu-2026`의 raw가 인용한 Karpathy llm-wiki gist는 `442a6bf555914893e9891c11519de94f`인데 CLAUDE.md 서두가 밝힌 ai-wiki 원형 gist는 `1dd0294ef9567971c1e4348a90d69285`로 서로 다른 문서다. B3의 `kmyu-2026-llm-wiki-pattern-synthesis`와 `datasciencedojo-2026-llm-wiki-by-andrej-karpathy`가 둘을 같은 것으로 취급하고 있는지 확인한다.
- [x] B3 Karpathy LLM Wiki 패턴 (5편): datasciencedojo-2026-llm-wiki-by-andrej-karpathy, kmyu-2026-llm-wiki-pattern-synthesis, joonan30-llm-wiki-labs, dragon1086-llm-wiki, agricidaniel-claude-obsidian
  - 완료 (2026-09-07). 5편 전부 게이트를 통과했다. wiki 본문 합계 38,615자에서 85,772자로 2.22배가 됐고 표는 7개에서 87개다. 압축비 중앙값 0.52에서 1.32, 최소값 0.38에서 1.31이다. 편별로는 datasciencedojo-2026 0.58에서 1.39, kmyu-2026 0.52에서 1.32, joonan30 0.38에서 1.33, dragon1086 0.40에서 1.32, agricidaniel 0.63에서 1.31이다. 얇은 페이지 5편에서 0편, 표 0개 페이지 1편에서 0편이다.
  - **sources 본문 합계는 76,933자에서 64,542자로 줄었다.** 문체 정비가 아니라 stale claim 삭제 결과다. 표는 4개에서 34개로 늘어 구조화는 함께 올라갔다. 근거 없는 서술을 남겨 분량을 유지하지 않는다는 원칙을 따른 값이고, 1차 게이트도 함께 낮아지므로 wiki가 짧아지는 것 자체는 실패가 아니다.
  - lint 5종 0건. 10개 파일에 lint_style error 0 warning 0, lint_terms 0, audit_captions 0, lint_links error 0 warning 0, lint_figures 0이다. 예외 주석은 5편 전부 한 건도 쓰지 않았다.
  - 카테고리 총계 감소: applications error 1,507건에서 960건(-547), warning 49건에서 37건(-12), 위반 파일 43개에서 33개(-10), lint_terms 46건에서 21건(-25)이다. physical-ai 회귀 게이트 두 줄 모두 exit 0을 유지한다.
  - **전 저장소 `link-unresolved`가 0건이 됐다.** `sources/datasciencedojo-2026-llm-wiki-by-andrej-karpathy.md:74`의 `[[applications/karpathy-2024-software-3-llms]]`는 저장소에 없는 페이지였고 raw에 software 3.0 언급 자체가 없어 항목째 삭제했다. Phase 1-7(b)가 남긴 마지막 error다.
  - **raw 재독이 무근거 주장 197건을 잡았다.** 편별로 joonan30 62건, dragon1086 61건, agricidaniel 30건, kmyu-2026 25건, datasciencedojo-2026 19건이다. 배치 5편 중 3편이 스텁 전환 stem이고 그 셋이 153건으로 78%를 차지한다.
  - **스텁 전환 피해의 규모를 예고하는 지표를 찾았다: `sources 바이트 / raw 바이트` 비율.** joonan30은 5.6배로 13개 stem 중 최댓값이고 실제로 무근거 주장 62건이 나왔다. dragon1086 2.3배 61건, dnotitia-akb 1.3배 37건, garrytan-gbrain 0.7배 32건이다. **비율 2배 초과를 고위험으로 본다.** 잔여 고위험은 `safishamsi-graphify` 4.0배(B4)와 `lum1104-understand-anything` 2.0배(B5)이고, 저위험은 `hkuds-rag-anything` 0.2배(D2)와 `colbymchenry-codegraph` 0.7배(B5)다. 배치 공통 브리프 부록에 표로 넣었다.
  - 대표 정정 5건. (1) **`dragon1086`의 `claude --dangerously-skip-permissions` 자동 실행 서술이 raw에 0회 등장한다.** sources 기여 2번과 한계 2번, wiki 기여 1번, index.md 항목이 전부 이 문구에 기대고 있었다. 삭제하고 실제 근거가 있는 위험(Discord 봇 plist가 토큰을 평문 저장하도록 안내한다)으로 대체했다. (2) 같은 stem의 코드 줄 수(1,228줄 등)와 함수명 더하기 행번호 15개가 삭제된 클론 파일의 값이었다. (3) **`kmyu-2026`에 날조된 Karpathy 인용문이 있었다** ("RAG rereads the same books for every exam, never learning the material."). raw grep 0회로 확인하고 항목째 삭제했다. (4) `agricidaniel`의 Compass 자기평가 7축과 잠금 구현 세부 4건, v1.9.1과 v1.9.2 hardening 서술 전체가 사라진 감사 문서에 근거하고 있었다. (5) `joonan30`은 sources 14,701자가 사실상 전부 삭제된 `evolution/index.html`(4,355줄)에 근거해 정량 지표 22건과 방법론 12건이 통째로 빠졌다.
  - **새 발견: raw frontmatter의 `tags:`도 stale하다.** joonan30은 tags 16개 중 11개(`karpathy-pattern`, `paper-monitor`, `agents-md` 등)가 현재 README 본문에 근거가 없다. 삭제된 클론을 보고 생성된 태그이기 때문이다. raw는 불변이라 두고 sources와 wiki의 tags만 근거 있는 8개로 교체했다. 다른 스텁 stem도 같은 점검이 필요해 브리프 부록에 넣었다.
  - **Karpathy gist ID 문제를 증거로 판정하고 사용자 결정을 받았다.** 저장소가 두 ID를 쓰는데 `442a6bf555914893e9891c11519de94f`는 raw 4개 파일(`kmyu-2026-llm-wiki-pattern-synthesis`, `agricidaniel-claude-obsidian`, `dragon1086-llm-wiki`, `lum1104-understand-anything`)이 직접 싣고 있고, `1dd0294ef9567971c1e4348a90d69285`는 **raw 근거가 0건**으로 CLAUDE.md 서두와 README.md, temp-docs, sources 일부에만 나온다. 웹 검색은 rule #1로 금지되어 어느 gist가 실재하는지 확인할 수 없다. **사용자 결정 (2026-09-07): sources 쪽 근거 없는 인용만 정정하고 CLAUDE.md는 유지한다.** `sources/garrytan-gbrain.md:247`을 오케스트레이터가 직접 고쳐 gist 주소를 빼고 "이 저장소의 `CLAUDE.md`가 원형으로 밝힌 패턴이며 GBrain의 raw README는 특정 gist 주소를 인용하지 않는다"로 귀속을 명시했다. 잔여 3곳은 `sources/safishamsi-graphify.md:269`(B4), `sources/lum1104-understand-anything.md:334`(B5, 두 ID를 함께 적고 있다), `sources/google-okf.md:120`과 `wiki/etc/google-okf.md:118`(Phase 5의 E2)이고 각 배치가 처리한다. `datasciencedojo-2026`의 raw는 gist ID를 아예 인용하지 않아 어느 쪽도 쓰지 않고 "원문이 URL이나 ID를 제시하지 않아 대조가 불가능하다"를 한계에 명시했다.
  - caption 정비 5건 (`agricidaniel`, 전량 영어 전용에 금지 기호 포함). 같은 stem에서 figure 후보 3건(fig04에서 fig06, DragonScale SVG)이 삭제된 클론의 `wiki/meta/`에만 있던 파일이라 후보에서 제거하고 사유를 sources 8절에 남겼다. 잔여 5건의 `raw:` 경로도 삭제된 클론 경로에서 README가 적는 저장소 내부 상대경로로 정정했다.
  - HUMANIZE 잔재 2파일 제거(`agricidaniel` sources 50줄과 wiki 44줄). 전 저장소 잔재가 4파일에서 2파일이 됐고 남은 것은 `todaycode-2026-graphify-llm-token-reduction-wiki`의 sources와 wiki로 B4 소관이다.
  - 라이선스 확인 3건 전부 불일치 없음. `joonan30`과 `agricidaniel`은 raw frontmatter와 README 본문이 모두 MIT로 일치하고, `dragon1086`은 양쪽 모두 미명시다. 다만 `dragon1086`의 기존 서술 "LICENSE 파일 없음"은 README 스텁으로 확인할 수 없는 단정이라 "README 본문에 라이선스 표기가 없다"로 정정했다.
  - index.md 5항목을 187, 200, 374, 317, 390자에서 195, 176, 185, 198, 199자로 줄이고 구분자를 `]]: `로 통일했다. Applications 절 200자 초과는 16개에서 13개가 됐다. `dragon1086` 항목은 `--dangerously-skip-permissions`와 `1,228줄` 두 stale claim을 담고 있어 내용 자체도 다시 썼다.
  - 오케스트레이터 직접 처리 1건 추가. `sources/garrytan-gbrain.md`의 "복리로 쌓는"을 "계속 쌓아 가는"으로 고쳤다. CLAUDE.md 문체 가이드가 지목한 표현인데 `lint_style.py`의 `RE_BANNED_VOCAB`이 부분집합만 기계화해 통과하고 있었다 (Phase 1-2 개선 제안 (2)와 A2 부수 발견 (2)가 같은 지적이다).
  - 용어집 등재 후보 22건 누적 (Phase 7-1 소관): entity page, compilation step, wiki-links, orphan page(한글 "고아 페이지" 제안과 원어 제안이 갈린다), linting, stateless와 stateful, bookkeeping, lossy compression, model collapse, hot cache, hybrid retrieval, contextual retrieval, contextual prefix, advisory lock, transport, wikilink, slug, Marp, Mermaid, Graph View. `compounding`은 B1과 B2에서도 올라온 후보이고 CLAUDE.md 문체 가이드가 "복리로 쌓인다"를 피하라고 지목한 것과 충돌해 판정이 필요하다.
  - 자료 자체의 내적 모순 5건을 기록했다. (1) `datasciencedojo`의 유지보수 프롬프트가 "9-항목"이라 적고 바로 옆에 5개만 나열한다. (2) `kmyu-2026`의 raw는 unclejobs-ai 역자 주석을 "10가지"로 소개하나 9항목만 발췌하고, "9-항목 Lint 프롬프트"의 코드 블록에는 7항목이 들어 있다. (3) `dragon1086`의 BFS 절은 "50페이지를 넘어갈수록 효과가 체감된다"고 쓰지만 바로 아래 표는 150페이지 초과를 효과 뚜렷으로 나눈다. (4) 같은 stem의 빠른 시작 1단계와 2단계가 역할이 겹치는데 경계 설명이 없다. (5) `kmyu-2026` raw의 8.1에서 8.3절이 취소선으로 남아 있으나 같은 사실이 11.2에서 11.3절에 취소선 없이 나와 지위가 미결이다.
  - 부수 발견 1건. `dragon1086`의 **raw 스텁이 삭제된 클론의 README보다 최신이다** (구 261줄, 현 361줄). Discord 봇, BFS 개선, last30days, Phase 6이 그 사이에 추가됐고, 기존 sources의 "Phase 5단계 마감" 서술이 구버전 README에서 온 것이라 지금은 사실이 아니게 됐다. 스텁 전환이 정보를 잃기만 한 것이 아니라 일부는 갱신했다는 뜻이므로, 남은 스텁 stem에서도 "sources가 raw보다 오래된 판을 보고 있을 가능성"을 함께 본다.
- [x] B4 Graphify (4편): safishamsi-graphify, graphify-labs-graphify, shamsi-2026-graphify-knowledge-graphs-for-ai, todaycode-2026-graphify-llm-token-reduction-wiki
  - 완료 (2026-09-07). 4편 전부 게이트를 통과했다. wiki 본문 합계 29,765자에서 59,315자로 1.99배가 됐고 표는 10개에서 54개다. 압축비 중앙값 0.73에서 1.31, 최소값 0.54에서 1.30이다. 편별로는 safishamsi 0.54에서 1.31, graphify-labs 0.68에서 1.32, shamsi-2026 0.78에서 1.30, todaycode-2026 0.86에서 1.30이다. 얇은 페이지 4편에서 0편이다.
  - sources 본문 합계는 45,073자에서 45,438자로 거의 같다. `safishamsi`가 stale claim 삭제로 24,004자에서 10,380자(57% 축소)가 된 것을 나머지 3편의 raw 재독 보강이 상쇄한 결과다. 표는 12개에서 36개가 됐다.
  - lint 5종 0건. 8개 파일에 lint_style error 0 warning 0, lint_terms 0, audit_captions 0, lint_links error 0 warning 0, lint_figures 0이다. 예외 주석은 4편 전부 한 건도 쓰지 않았다.
  - 카테고리 총계 감소: applications error 960건에서 661건(-299), warning 37건에서 23건(-14), 위반 파일 33개에서 25개(-8), lint_terms 21건에서 8건(-13)이다. physical-ai 회귀 게이트 두 줄 모두 exit 0을 유지한다.
  - **전 저장소 `HUMANIZE-SUMMARY` 잔재가 0파일이 됐다.** 파일럿 1-1이 10파일로 보고한 뒤 배치마다 흡수해 온 backlog가 여기서 끝났다. 마지막 2파일은 `todaycode-2026`의 sources와 wiki였다.
  - **raw 재독이 무근거 주장 133건을 잡았다.** 편별로 safishamsi 64건, graphify-labs 29건, todaycode-2026 25건, shamsi-2026 15건이다.
  - **B3이 세운 예측 지표가 적중했다.** `safishamsi-graphify`는 `sources 바이트 / raw 바이트` 4.0배로 잔여 stem 중 최고 위험이었고 실제로 64건이 나와 joonan30의 62건을 넘었다. `git show --stat 0507ad0`은 이 stem에서 262개 파일 155,900줄이 삭제됐음을 보여 준다. 지표를 남은 배치와 Phase 4, 5에 계속 쓴다.
  - 대표 정정 5건. (1) **`safishamsi`의 "21+ AI 어시스턴트"가 통째로 무근거다.** raw README 첫 문장은 "A Claude Code skill"이고 Codex, Cursor, Kilo, Gemini CLI 어느 것도 등장하지 않는다. 플랫폼별 hook 자동 배포 서술과 `graphify install --platform` 명령도 함께 삭제했다. (2) 같은 stem의 버전과 브랜치가 정반대였다. sources는 활성 브랜치 v8과 0.8.28(2026-06-01)을 적었으나 현재 raw의 CI 배지와 설치 URL은 모두 v1을 가리킨다. (3) 없는 명령 8종(`graphify prs --triage`, `clone`, `merge-graphs`, `export callflow-html` 등)과 Penpax, The Memory Layer 책, YC S26 배지가 raw에 없다. (4) `todaycode-2026`의 "657배를 실측했다"는 발표자가 도구에 되물어 받은 자기 보고값이다. 측정 조건(legalize-kr 특허법 폴더, 특정 질의, 쿼리 시점 한정, 초기 구축 비용 별도)을 표로 명시했다. (5) `shamsi-2026`의 "335배"는 raw에 없는 계산값이고 "검증된 토큰 절감 효과"도 제3자 검증이 아니라 제품 페이지의 자체 보고다.
  - **결정적 발견: `safishamsi-graphify`와 `graphify-labs-graphify`의 raw 본문이 바이트 단위로 동일하다** (각 7,071자, frontmatter만 다르다). 그런데 `graphify-labs`의 sources와 wiki는 "v0.8.28에서 v0.9.15로의 변경 내역"이라는 **존재하지 않는 대조**를 페이지 전체의 골격으로 삼고 있었다. 버전 번호, "85.1k stars", "Commits 1,093", "www.graphify.com 공식 도메인", "Y Combinator S26 이후 회사 단위 제품"이 전부 raw에 없다(grep 0건). 대조표를 "확인되는 차이는 소유 주체 표기뿐"으로 다시 세우고 한계 절에 사유를 명시했다. **두 stem의 통합 여부는 사용자 판단 사항으로 남긴다.**
  - `graphify-labs-graphify`는 스텁 전환 목록 밖인데도 같은 유형의 오염이 있었다. `git log`상 커밋 `f148a6b`(2026-07-16)로 처음부터 README 스텁으로 ingest됐는데 **커밋 메시지 자체가 "85.1k stars, www.graphify.com"을 담고 있다.** ingest 시점에 raw 밖 정보가 sources로 흘러든 사례이므로, stale claim은 스텁 전환만이 아니라 ingest 절차 일반의 문제이기도 하다.
  - 오케스트레이터 직접 처리 1건. 두 subagent가 `yc-s26` 태그를 서로 다르게 판단했다(safishamsi는 제거, graphify-labs는 표기 통일을 이유로 유지). 두 raw의 README 본문이 동일하고 그 본문에 YC S26 근거가 없으므로 `graphify-labs`의 sources와 wiki에서도 제거해 11개에서 10개로 맞췄다.
  - 라이선스 확인 2건. `safishamsi`는 raw frontmatter가 MIT인데 README 본문에 라이선스 문구가 없어 충돌은 아니고, "frontmatter가 기록한 값이며 본문에는 문구가 없다"로 출처를 명시했다. 삭제된 LICENSE 파일에서 온 "Copyright (c) 2026 Safi Shamsi"는 뺐다. `graphify-labs`도 같은 상태다.
  - `shamsi-2026`의 title을 `Graphify — Knowledge Graphs for AI Coding Assistants`에서 `Graphify: Knowledge Graphs for AI Coding Assistants`로 정규화하고 원제를 sources 1절에 인라인 코드로 기록했다 (사용자 결정 이행). frontmatter title 금지 기호는 5개 stem 중 3개가 해소됐고 잔여는 `patel-2026`(B7)과 llms의 `9bow-2026-gpt-5-6-sol-terra-luna`(Phase 5)다.
  - index.md 4항목을 176, 221, 228, 244자에서 175, 193, 188, 198자로 다시 썼다. Applications 절 200자 초과는 13개에서 10개가 됐다. 네 항목 모두 stale claim을 담고 있었다: safishamsi는 "YC S26", "3-pass", "21개 넘는 어시스턴트" 세 건, graphify-labs는 "85.1k stars"와 "www.graphify.com", todaycode-2026은 "657배 토큰 절감을 실측"이라는 오기다.
  - 용어집 등재 후보 12건 누적 (Phase 7-1 소관): god node, surprising connection, community detection(빈도 실측 원어 32 대 직역 8), knowledge graph(원어 138 대 직역 70, 다른 실측에서는 한글 72 대 영문 102로 갈려 판정 필요), modularity(원어 19 대 응집도 10), tree-sitter(원어 91), cross-file, AST, MCP, telemetry, call-graph pass, citation mining.
  - 자료 자체의 내적 모순 5건을 기록했다. (1) `todaycode-2026`의 지원 언어 수가 도입부 20개 이상, extract 절 23개 이상으로 갈린다. (2) 같은 자료의 처리 속도가 요약에서 "1,000개 5분", 표에서 "200개 5분, 1,000개 8분"이다. (3) 292 곱하기 657은 191,844라 "20만 토큰" 비교 기준과 정확히 맞지 않는다. (4) 영상 제목은 정확도 향상을 내세우지만 수치 근거는 토큰 쪽에만 있다. (5) `graphify-labs`의 README는 "no server, runs entirely locally"라 적지만 문서와 논문, 이미지 추출은 Claude 호출에 의존한다.
  - 부수 발견 2건. (1) `todaycode-2026`의 자동 자막 오인식 카탈로그를 한계 절에 남겼다 (God Node를 "간드", Louvain을 "루베인", vis.js를 "bj.js", `.env`를 "DMV", resolution을 "세상도"). 무리한 교정 대신 불확실성을 명시하는 방식이다. (2) `raw/videos/todaycode-2026-...`의 `raw_path`도 macOS 절대경로다. B1에서 시작한 집계에 더해 raw 16개 파일이 같은 상태이고 raw 불변이라 미수정이다.
- [x] B5 코드 인텔리전스 도구 (3편): colbymchenry-codegraph, lum1104-understand-anything, wlsdks-ontology-atlas
  - 완료 (2026-09-07). 3편 전부 게이트를 통과했다. wiki 본문 합계 32,798자에서 69,916자로 2.13배가 됐고 표는 5개에서 48개다. 압축비 중앙값 0.52에서 1.31, 최소값 0.42에서 1.30이다. 편별로는 colbymchenry 0.52에서 1.30, lum1104 0.42에서 1.32, wlsdks 0.79에서 1.31이다. 얇은 페이지 3편에서 0편이다.
  - sources 본문 합계는 62,689자에서 53,523자로 줄었다. `lum1104`가 stale claim 삭제로 27,774자에서 12,556자(55% 축소)가 된 것이 주된 원인이고, `colbymchenry`와 `wlsdks`는 raw 재독 보강으로 늘었다. 표는 10개에서 26개가 됐다.
  - lint 5종 0건. 6개 파일에 lint_style error 0 warning 0, lint_terms 0, audit_captions 0, lint_links error 0 warning 0, lint_figures 0이다. 예외 주석은 3편 전부 한 건도 쓰지 않았다.
  - 카테고리 총계 감소: applications error 661건에서 394건(-267), warning 23건에서 8건(-15), 위반 파일 25개에서 19개(-6)다. lint_terms는 8건으로 변동이 없고 잔여 4파일은 B6과 B7 소관이다. physical-ai 회귀 게이트 두 줄 모두 exit 0을 유지한다.
  - **`lint_figures --category applications`가 error 0건이 됐다.** 착수 4건은 전부 `wlsdks-ontology-atlas`의 `wiki-uncurated-figure`였다. wiki frontmatter가 82줄에서 57줄로 줄었고 applications 카테고리의 figures가 전부 정리됐다.
  - **raw 재독이 무근거 주장 120건을 잡았다.** 편별로 lum1104 64건, colbymchenry 48건, wlsdks 8건이다. `sources 바이트 / raw 바이트` 예측이 세 편 모두 맞았다. lum1104는 2.0배로 고위험이었고 64건, wlsdks는 0.62배로 저위험이었고 8건이다.
  - 대표 정정 4건. (1) **`colbymchenry`의 벤치마크 헤드라인이 전부 틀렸다.** sources와 wiki가 6곳에서 "25% cheaper, 57% fewer tokens, 23% faster, 62% fewer tool calls"를 적었으나 raw는 16%, 47%, 22%, 58%다. 7행짜리 저장소별 표는 28개 셀이 전부 달랐고 재검증 날짜도 2026-05-29가 아니라 2026-06-02다. (2) 같은 stem이 **존재하지 않는 MCP 도구 2종**(`codegraph_context`를 PRIMARY로 표기, `codegraph_trace`)을 아키텍처의 중심으로 서술하고 있었다. raw는 8종 중 4종만 노출하고 Primary는 `explore`다. 그 두 도구 위에 세워진 "설계 철학" 절을 통째로 제거했다. (3) `lum1104`의 "7-phase pipeline", "13 node type과 26 edge type 스키마", "implicit edge 5종", "정규식 추출"이 전부 무근거였다. (4) `wlsdks`의 caption 3건이 금지 기호가 아니라 내용 자체가 틀렸다.
  - **스텁 전환의 성격을 다시 규정해야 한다. 커밋 `0507ad0`은 경량화만 한 것이 아니라 자료를 다른 버전으로 바꿨다.** `colbymchenry`의 경우 클론은 v0.9.8 시점이었는데 WebFetch로 새로 받은 README는 1.0 판이다. 도구 구성이 10종에서 8종(4종 노출)으로 바뀐 것이 그 사이의 실제 설계 변경으로 보인다. B3의 `dragon1086`에서도 같은 방향(스텁이 구 클론보다 최신)이 확인됐다. 따라서 스텁 stem의 sources는 **없어진 근거에 기댄 서술**과 **낡은 판을 보고 쓴 서술** 두 종류를 함께 안고 있다.
  - **새 절차 지침 (브리프 부록 2로 반영): repo stem의 caption은 이미지를 열어 대조한다.** `wlsdks`에서 업스트림 README의 alt text가 자기 스크린샷보다 낡은 사례가 나왔다. "Cart Session을 선택한 map"이라 적힌 그림의 실제 화면은 Orders 도메인이었고, "INDEX 패널"이라 적힌 그림에서는 그 패널이 접혀 있었다. repo 유형은 `-figures/`를 만들지 않고 저장소 내 이미지를 in-place 참조하므로 caption 근거가 alt text뿐인 경우가 많다.
  - figure 큐레이션 판단 1건. `wlsdks`의 `curated: false` 4건(fig02, fig05, fig08, fig09)을 wiki frontmatter에서 제거했다. 승격은 물리적으로 불가능했다. 네 파일이 로컬 어디에도 없고 `raw:` 필드의 GitHub URL에서 받으려면 웹 fetch가 필요해 rule #1에 걸린다. 내용상으로도 본문 표가 이미 같은 것을 다룬다. sources에는 9건 전량을 유지하고 8절 말미에 "로컬 사본이 없으니 필요해지면 raw URL에서 받아 사본을 만든 뒤 승격하라"는 경로를 명시했다.
  - tags 정정 3건. `lum1104`의 `monorepo`를 `multi-platform`으로 교체(README의 monorepo는 분석 대상 코드베이스의 속성이지 이 저장소의 속성이 아니다), `wlsdks`의 `obsidian` 제거(Atlas는 자체 Tauri 워크벤치이고 Obsidian 연동이 없다), `colbymchenry`의 `callback-synthesizer` 제거 후 `local-first` 추가(README 헤드라인 "100% Local" 근거).
  - gist ID 정정 1건. `sources/lum1104-understand-anything.md:334`가 두 ID를 함께 적고 있어 raw 근거가 0건인 `1dd0294ef9567971c1e4348a90d69285`를 빼고 raw가 실제로 링크하는 `442a6bf555914893e9891c11519de94f`만 남겼다. 사용자 결정 대상 4곳 중 3곳이 처리됐고 잔여는 `sources/google-okf.md:120`과 `wiki/etc/google-okf.md:118`로 Phase 5의 E2 소관이다.
  - 오케스트레이터 직접 처리 1건. `sources/agricidaniel-claude-obsidian.md:290`(B3 완료분)이 lum1104를 "7단계 파이프라인으로 코드베이스를 지식 그래프로 변환한다"고 소개하고 있었다. B5에서 그 주장이 무근거로 판정됐으므로 "코드베이스를 지식 그래프로 바꿔 대화형 대시보드로 탐색하게 한다"로 정정했다. **무근거 주장이 한 stem 안에 머물지 않고 교차 참조로 퍼진다는 것을 보여 주는 사례**이므로, 배치 완료 후에도 그 stem을 언급하는 다른 페이지를 grep으로 확인하는 절차가 필요하다.
  - index.md 3항목을 218, 175, 587자에서 184, 186, 193자로 다시 썼다. Applications 절 200자 초과는 10개에서 8개가 됐다. `colbymchenry` 항목과 `lum1104` 항목("7단계 파이프라인")도 stale claim을 담고 있어 내용을 다시 썼다.
  - 용어집 등재 후보 10건 누적 (Phase 7-1 소관): fair coverage, provenance(`safishamsi-graphify`의 EXTRACTED와 INFERRED, AMBIGUOUS와 같은 개념이라 배치 공통 용어 후보), debounce, frontmatter, backlink, blast radius, dry-run, knowledge graph(실측이 영문 149 대 한글 79로 갈리나 "지식 그래프"가 일반 서술로 쓰이는 자리가 많아 금지 표기 등재보다 지침 권고), community clustering, force-directed layout.
  - 자료 자체의 내적 모순 3건을 기록했다. (1) `lum1104`의 README 본문은 `/understand`가 에이전트 5개를 조율한다고 적는데 바로 아래 표는 7행이다. (2) 같은 README의 번역이 7종인데 `--language`가 받는 값에는 `es`와 `tr`이 없다. (3) `wlsdks`의 frontmatter 키와 CLI 인자는 `dependencies`인데 관계 리뷰 UI와 blast-radius 출력은 같은 관계를 `depends_on`으로 부른다.
  - 부수 발견 2건. (1) `lum1104`의 저장소가 `Egonex-AI/Understand-Anything`으로 이전됐고 README의 설치 명령과 라이선스 링크가 전부 새 주소를 가리킨다. stem은 옛 주소 기준이다. **stem 변경 여부는 사용자 판단 사항으로 남긴다** (3-tier가 stem을 공유하므로 변경 비용이 크다). (2) `colbymchenry`의 기존 sources 자체에 내적 모순이 있었다. 2.8절 표는 평균 비용 절감을 25%로 적었는데 같은 절 본문은 35%를 근거로 메커니즘을 설명했다. 두 값 모두 raw의 16%와 다르므로 클론 시절에도 수치가 어긋나 있었다는 뜻이다.
- [x] B6 OpenWiki (3편): langchain-ai-openwiki, sproul-2026-introducing-openwiki-an-open-source, 9bow-2026-openwiki-coding-agent-documentation
  - 완료 (2026-09-07). 3편 전부 게이트를 통과했다. wiki 본문 합계 6,077자에서 23,450자로 3.86배가 됐고 표는 0개에서 27개다. 압축비 중앙값 0.68에서 1.51, 최소값 0.58에서 1.39다. 편별로는 langchain-ai-openwiki 0.58에서 1.51, sproul-2026 0.68에서 1.60, 9bow-2026 0.72에서 1.39다.
  - **배치 성격이 앞의 다섯과 달랐다.** 3편이 전부 착수 시점 본문 2,400자 미만에 표 0개로 applications에서 가장 얇은 페이지들이었고, raw도 4.4KB에서 5.2KB로 작다. 삭제가 아니라 "지어내지 않으면서 되살리기"가 관건이었고 배치 증가율 3.86배는 Phase 3 최대다.
  - raw가 작은 자료의 분량 확보 수단 세 가지가 다시 확인됐다 (B1의 `tilnote-2026`에서 확립한 경로다). (a) raw가 나열만 한 항목을 표로 전개, (b) raw가 쓴 전문 용어의 개념 풀이, (c) 같은 문제 영역의 다른 wiki 페이지와 대조한 위치 서술이다. 세 편 모두 표 8개에서 11개를 세웠고 raw에 없는 기능이나 아키텍처는 만들지 않았다.
  - 다만 산문 중앙값 4,753자는 CLAUDE.md의 article 기준선(5,000자에서 12,000자)에 못 미친다. raw의 실재 정보량이 상한이므로 1차 게이트 통과 선에서 마감했고, 이는 계획서 3절이 정한 "1차 게이트가 목표 범위와 충돌하면 1차 게이트를 따른다"는 규약대로다.
  - sources도 합계 9,376자에서 15,610자, 표 0개에서 7개가 됐다.
  - lint 5종 0건. 6개 파일에 lint_style error 0 warning 0, lint_terms 0, audit_captions 0, lint_links error 0 warning 0, lint_figures 0이다. 예외 주석은 3편 전부 한 건도 쓰지 않았다.
  - 카테고리 총계 감소: applications error 394건에서 298건(-96), warning 8건에서 3건(-5), 위반 파일 19개에서 13개(-6)다. lint_terms는 8건에서 7건이고 잔여 3파일은 B7 소관이다. physical-ai 회귀 게이트 exit 0을 유지한다.
  - **raw 재독이 무근거 주장 26건을 잡았다.** 편별로 langchain-ai-openwiki 12건, 9bow-2026 7건, sproul-2026 7건이다(sproul은 초안 자체검증에서 되돌린 4건이 별도다).
  - **이 배치에서 나온 유형은 "출처 승격"이다.** 스텁 전환 stem처럼 근거가 사라진 것이 아니라, **블로그나 2차 자료의 서술을 README 사실로 승격**한 경우다. `langchain-ai-openwiki`의 "DeepAgents 기반", "git diff 증분 갱신", "하루 한 번 PR 자동 생성"이 전부 README가 아니라 출시 블로그 출처인데 README 근거처럼 적혀 있었다. 정정 방식은 삭제가 아니라 출처를 밝혀 재배치하는 것이었다.
  - 대표 정정 4건. (1) `9bow-2026`의 sources와 wiki가 그 글을 "원문 README와 출시 블로그를 정리한 글"로 소개했으나 **raw는 출처를 밝히지 않고 오히려 GPT 모델로 정리한 2차 자료라고 적는다.** 자료의 성격 규정 자체가 틀렸다. (2) 같은 stem의 "GLM 5.2, Kimi K2.6, Sonnet 5는 미리 정의돼 있다"가 전체 목록으로 읽혔으나 raw는 "같은 모델"로 예시를 표시한다. (3) `sproul-2026`의 "자동 PR을 사람이 리뷰하는 전제"는 raw에 OpenWiki가 PR을 만든다는 서술 자체가 없다. raw의 PR 언급은 "개발자 PR이 잦으면 문서가 낡는다"는 문제 서술뿐이다. (4) 같은 stem에서 raw의 `most coding agents already read files like ...`가 "코딩 에이전트는 이미 AGENTS.md와 CLAUDE.md를 읽지만"이라는 단정문이 돼 있었다. `most`와 예시 표시가 탈락한 사례다.
  - **라이선스 문제의 세 번째 유형이 나왔다.** `langchain-ai-openwiki`는 raw frontmatter가 MIT인데 **README 본문에 라이선스 절 자체가 없고** 9bow의 한국어 기사만 MIT라고 적는다. B2의 `dnotitia-akb`는 frontmatter 값과 본문이 충돌하는 유형이었고, B3와 B4의 여러 stem은 일치하는 유형이었다. 이번은 근거 부재 유형이므로 frontmatter 키는 스키마상 유지하되 "frontmatter가 기록한 값이며 README 본문에는 문구가 없다"로 출처를 명시했다.
  - tags 정정 1건. `langchain-ai-openwiki`의 `langgraph`를 제거했다. 어느 자료에도 근거가 없고 9bow 기사의 LangGraph 언급은 조직 소개 문맥이다. `9bow-2026`의 tags 12개는 전부 raw 본문에 근거가 있어 유지했다.
  - index.md 3항목을 261, 250, 190자에서 186, 188, 195자로 다시 썼다. Applications 절 200자 초과는 8개에서 6개가 됐다. `langchain-ai-openwiki` 항목도 "DeepAgents 기반, git diff 증분 갱신, MIT"를 README 사실처럼 단정하고 있어 내용을 다시 썼다.
  - 용어집 등재 후보 6건 누적 (Phase 7-1 소관): inference provider(원어 유지 제안과 "추론 제공자" 번역어 제안이 갈린다. 일반어 "제공자" 오탐 우려로 금지 표기 없이 지침만 권고), base URL, gateway, instruction file(번역어 "지시 파일" 제안, 첫 등장 원어 병기), provider, tracing. `AGENTS.md`와 `CLAUDE.md`는 파일명이라 표기 흔들림이 없으나 "에이전트 진입 지시 파일"이라는 개념 설명을 용어집에 두면 여러 페이지가 재사용할 수 있다는 제안이 함께 올라왔다.
  - 부수 발견 3건. (1) `sproul-2026`의 raw에는 정량 근거가 하나도 없다. 수치 표현이 "몇 분 안에"와 "수백 개 파일" 둘뿐이고 측정 조건이 없어 wiki에 사실과 주장을 가르는 표 두 개를 세웠다. (2) 같은 raw가 같은 대상을 두 단위로 센다("수백 페이지의 저장소 문서"와 "위키가 수백 개 파일에 걸친다"). 절별로 원문 단위를 살려 분리했다. (3) `langchain-ai-openwiki`의 README 상단에 `static/openwiki.png`가 있으나 로컬 사본이 없어 figures 작업을 하지 않았다. B5의 `wlsdks` 판단과 같은 근거로, 웹 fetch는 rule #1 위반이다.
  - 향후 수집 후보 3건이 나왔다. `9bow-2026`의 raw가 "더 읽어보기"로 든 4개 중 이 wiki에 페이지가 있는 것은 Understand-Anything 하나뿐이고 DeepWiki-Open, Tutorial-Codebase-Knowledge, Wrinkl은 미수집이다.
- [x] B7 RAG 담론과 응용 카탈로그 (6편): alex-xu-2026-rag-vs-graph-rag-vs, pandey-2026-rag-is-no-longer-just, patel-2026-production-ai-app-seven-layers, shubhamsaboo-awesome-llm-apps, zhulinsen-daily-stock-analysis, cheahjs-free-llm-api-resources
  - 완료 (2026-09-07). 6편 전부 게이트를 통과했다. wiki 본문 합계 25,226자에서 75,073자로 2.98배가 됐고 표는 7개에서 72개다. 압축비 중앙값 0.85에서 1.50, 최소값 0.75에서 1.34다. 편별로는 alex-xu 0.89에서 1.43, pandey 1.00에서 1.61, patel 0.75에서 1.56, shubhamsaboo 0.75에서 1.44, zhulinsen 0.80에서 1.34, cheahjs 1.22에서 1.68이다. 얇은 페이지 4편에서 0편, 표 0개 페이지 1편에서 0편이다.
  - sources도 합계 28,067자에서 50,187자, 표 0개에서 29개가 됐다.
  - **`cheahjs`의 산문이 957자에서 7,837자로 8.2배가 돼 Phase 3 최대 회복이다.** 표를 줄이지 않고 2개에서 12개로 함께 늘리며 달성했다. 착수 시점 본문 3,394자 중 2,437자가 표와 마크업이라 표는 있는데 해석하는 산문이 없던 상태였다.
  - lint 5종 0건. 12개 파일에 lint_style error 0 warning 0, lint_terms 0, audit_captions 0, lint_links error 0 warning 0, lint_figures 0이다. 예외 주석은 6편 전부 한 건도 쓰지 않았다.
  - **subagent 2편이 API 오류로 중단돼 재시작했다.** `pandey`는 sources 재작성을 마치고 wiki 착수 직전에 끊겨 그 상태(lint 0건, 8개 절 완비)를 이어받게 했고, `zhulinsen`은 파일 변경이 전혀 없어 처음부터 다시 돌렸다. 중단 시점 파일 상태를 확인하고 범위를 좁혀 재발주하는 절차가 유효했다.
  - **raw 재독이 무근거 주장 85건을 잡았다.** 편별로 pandey 약 30건, shubhamsaboo 17건, alex-xu 11건, cheahjs 11건, patel 8건, zhulinsen 8건이다.
  - **새 유형: 인접 페이지의 벤치마크 수치를 이 페이지의 근거처럼 복제.** `pandey`의 wiki가 BrowseComp-Plus 80.0% 대 69.0%, LeanRAG redundancy 46% 감소, MSCOCO 62.9, ViDoRe V2 64.9, MTEB Multilingual 69.9 등 12건을 본문에 싣고 있었으나 raw 3.0KB 포스트에는 수치가 하나도 없다. 전량 삭제하고 "수치는 각 페이지가 담당한다"고 명시한 뒤 링크만 걸었다. 짧은 LinkedIn 포스트 계열의 공통 위험으로 보인다.
  - **날조된 대응표 1건.** 같은 stem이 "Support chatbot은 Hybrid와 CRAG", "Legal research는 Hybrid와 Graph와 CRAG" 같은 5행 매핑표를 두고 **표 바로 아래 인용문으로 "원문에는 없다"고 자백하면서 표는 그대로 두고 있었다.** raw는 다섯 use case와 다섯 아키텍처를 나란히 놓기만 하고 대응을 제시하지 않는다.
  - **중대 정정: GraphRAG 원논문 오귀속 3건.** `alex-xu`의 sources와 wiki가 "local과 global 이원 구조는 Microsoft GraphRAG 원논문의 핵심 설계와 정확히 일치한다"고 세 곳에서 적었으나 틀렸다. `wiki/database/edge-2024-from-local-to-global.md`에는 "local search"가 한 번도 나오지 않고, 원논문은 community summary와 map-reduce 단일 질의 모드만 다룬다. local과 global 이원 구성은 공식 구현체(`wiki/database/microsoft-graphrag.md`) 기능이다. global 경로만 원논문에 귀속하고 local 경로는 구현체로 정정했다. **오케스트레이터가 이 사실을 진행 중이던 `pandey` subagent에 전달해 같은 기준으로 점검하게 했고, 그쪽에서도 `edge-2024`를 "GraphRAG의 원형"이라 부르던 표현을 정정했다. Phase 4의 D1에서 database 쪽 서술을 재확인한다.**
  - 대표 정정 4건 추가. (1) `shubhamsaboo`의 "15개 최상위 카테고리 폴더"는 15가 목차 분류이고 실제 디렉토리는 10개다. 링크 105건을 집계해 대응표를 신설했다. (2) 같은 stem의 "대부분 템플릿은 Python과 Streamlit UI로 돌아간다"는 raw에서 streamlit이 Quick Start 명령 한 줄에만 나온다. (3) `zhulinsen`의 "A-shares는 중국 본토 증권거래소에 상장된 위안화 표시 주식"이라는 정의가 README에 없는 외부 지식이었다. (4) `cheahjs`의 "커뮤니티가 PR로 지속 갱신한다"는 raw에 PR, 기여, 갱신 절차 언급이 전혀 없다.
  - **저자 오귀속 1건과 Phase 2 완료분 정정.** `patel-2026`의 wiki가 `agents/patel-2026-beyond-the-prompt-claude-code`를 "같은 저자군의 글"로 적었으나 그 글의 저자는 Arpan Patel이고 이 글은 Manthan Patel이다. 오케스트레이터가 저장소 전수 확인 결과 frontmatter의 `author` 값은 세 stem 모두 정확했고 본문 서술만 틀렸다. 반대 방향(`i-taught-myself`에서 `beyond-the-prompt`)은 이미 "성이 같은 다른 저자"로 정확히 적고 있었으므로, 틀린 쪽인 `beyond-the-prompt`의 sources와 wiki 두 파일을 직접 정정했다. agents 카테고리는 lint 0건을 유지한다.
  - **지표 운용 보정: figure를 가진 stem에는 `sources 바이트 / raw 바이트` 비율을 보수적으로 적용한다.** `patel-2026`(2.3배)과 `alex-xu`(3.2배) 둘 다 비율이 높았으나 원인의 상당 부분이 과잉 부연이 아니라 **도해가 본문보다 정보 밀도가 높은데 텍스트 바이트만 세었기 때문**이었다. `patel-2026`의 fig01은 40여 개 파일 경로와 8개 주석을 담고, `alex-xu`의 fig01에는 본문에 없는 항목이 6종 있다(Planning agent와 Evaluator agent 이름, direct query 우회, MCP servers, mapping call, 저평가 필터링). 두 편 모두 도해 판독 내용을 반영해 sources가 오히려 늘었다.
  - caption 정비 2건 (`patel-2026` fig01, `alex-xu` fig01). 둘 다 이미지를 직접 열어 대조했고 금지 기호뿐 아니라 사실 오류를 함께 고쳤다. `patel-2026`은 "7개 레이어"를 8개 묶음으로, "색으로 구분"을 `.claude/` 한 묶음만 강조로 정정했다. B5에서 확립한 "repo stem의 caption은 이미지를 열어 대조한다" 지침이 article 유형에도 그대로 적용됐다.
  - sources `## 8. 그림 후보` 절 신설 2건 (`patel-2026`, `alex-xu`). `figures:` 키가 있는데 8절이 없던 규약 위반이다.
  - `patel-2026`의 title을 `A production AI app isn't picking the right model — the seven layers nobody talks about`에서 em dash를 뺀 형태로 정규화했다. **이로써 applications의 frontmatter title 금지 기호가 전부 해소됐고, 전 저장소 잔여는 llms의 `9bow-2026-gpt-5-6-sol-terra-luna` 한 stem(sources와 wiki 2파일, 중간점)뿐이다** (Phase 5 소관).
  - tags 정정 4건. `shubhamsaboo`의 `streamlit` 제거와 `generative-ui` 추가, `cheahjs`의 `cost-optimization`을 `trial-credit`으로 교체, `pandey`의 `mental-model` 제거다. `patel-2026`의 `harness`는 raw에 단어가 없으나 도해 주석 `AI agent context: rules, hooks, skills, subagents`가 용어집 정의와 1대1로 대응해 색인어로 유지하되 본문에서 저자 주장으로 귀속하는 문장은 제거했다. `zhulinsen`과 `alex-xu`의 tags는 전량 근거가 확인돼 변경이 없다.
  - **`lint-terms: ignore` 1건이 불필요해져 사라졌다.** index.md의 `cheahjs` 항목이 "데이터 정책" 표현 때문에 physical-ai 용어집의 policy 금지 표기에 걸려 ignore 주석을 달고 있었는데, 새 문구가 "이용 조건"을 쓰면서 주석 없이 통과한다.
  - index.md 6항목을 283, 217, 285, 300, 253, 208자에서 186, 194, 194, 199, 170, 185자로 다시 썼다. **Applications 절 33항목이 전부 200자 이내가 됐다** (최장 200자).
  - 용어집 등재 후보 23건 누적 (Phase 7-1 소관): community report, chunk, vector database(표기 3분 실측: "벡터 DB" 8회, "vector database" 5회, "벡터 데이터베이스" 1회), self-correction, GraphRAG(322회) 대 Graph RAG(55회) 대 graph-based RAG(22회) 표기 분열, fallback(59회) 대 폴백(37회), design space, retrieval architecture, grading, RLS, migration, regression, quota, rate limit, provider와 inference provider, free tier, AI gateway, provider-agnostic, always-on agent, generative UI, webhook, backtest.
  - 자료 자체의 내적 모순 8건을 기록했다. `patel-2026`의 `autonomy`와 `Anatomy`, `./claude/`와 `.claude/`, 본문 7개 레이어와 도해 8개 묶음. `shubhamsaboo`의 "Runs in 3 commands"와 네 줄짜리 Quick Start, 같은 이름 템플릿의 이중 경로 2쌍. `cheahjs`의 Modal이 매월 재지급인데 일회성 trial 묶음에 있고 HuggingFace와 Vercel은 금액 표기인데 무료 묶음에 있는 분류 기준 불일치.
  - 부수 발견 3건. (1) `zhulinsen`의 README 권장 프로바이더 링크에 `share_code`, `aff`, `ref`, `utm_source` 추천 파라미터가 붙어 있고 두 곳은 Sponsors 절에 배너로도 노출된다. 권장 순서를 중립적 기술 평가로만 읽기 어렵다는 점을 wiki에 명시했다. (2) 같은 stem은 브리프가 적은 4개 시장이 아니라 한국(`005930.KS`)과 대만(`2330.TW`)까지 6개 시장을 지원한다. (3) `shubhamsaboo`의 raw는 Headroom을 "API 비용 50~90% 절감"으로 적는데 `wiki/overviews/headroom-context-compression-overview.md`는 "토큰 60~95% 절감"으로 적는다. 기준이 다른 값이므로 Phase 6에서 overview 쪽 출처를 재확인한다.
  - **Phase 4 확인 사항 2건.** (1) `wiki/database/lumer-2025-rethinking-retrieval-from-traditional-retrieval.md:85`에 bare wikilink 3개가 있고 같은 파일 199행은 정상 형식이라 파일 내부에서도 갈린다. (2) 같은 파일 102행의 "corrective RAG(Yan 2024)"와 "BM25" 표기가 `pandey`에 흘러든 근거의 출처로 보인다. 그 페이지에서는 논문 본문 근거가 있을 수 있으므로 D4에서 확인한다.
- [x] B-완료. index.md Applications 절 축소, `--category applications` lint 0건, physical-ai 회귀 확인, 계량 기록
  - 완료 (2026-09-08, 배치 작업은 2026-09-07). 네 게이트를 전부 통과했다.
  - **게이트 1: index.md Applications 절 축소.** 33항목 전부 200자 이내이고 최장이 정확히 200자다. 착수 시점 32항목 중 18개가 200자를 넘었고 최장이 587자였다. 구분자도 전량 `]]: `로 통일했다.
  - **게이트 2: `--category applications` lint 0건.** 검사 파일 67개에 lint_style error 0 warning 0, lint_terms 0, lint_figures error 0 warning 0이다. `lint-style: ignore`와 `lint-terms: ignore` 예외는 33편 어디에도 없고, index.md 항목에 있던 기존 ignore 1건도 문구 개선으로 사라졌다.
  - **게이트 3: physical-ai 회귀 없음.** 6절 1항의 두 명령 모두 exit 0이다.
  - **게이트 4: 카테고리 완료 계량.** 아래 표가 physical-ai 완료치와 대조한 값이다.

| 지표 | applications 착수 | applications 완료 | physical-ai 완료치 |
|---|---|---|---|
| 편수 | 32 | 33 (신규 1) | 77 |
| sources보다 얇은 페이지 | 29 / 32 | **0 / 33** | 1 / 76 |
| 압축비 중앙값 | 0.67 | **1.34** | 1.95 |
| 압축비 최소 | 0.38 | **1.30** | 미기록 |
| wiki 본문 중앙값 | 5,344자 | **13,588자** | 14,156자 |
| wiki 산문 중앙값 | 4,313자 | **8,083자** | 미기록 |
| wiki 본문 합계 | 190,511자 | **495,520자** | 미기록 |
| 표 총수 | 42 | **460** | 737 |
| 표 편당 | 1.31 | **13.94** | 9.70 |
| 표 0개 페이지 | 10 | **0** | 0 |
| `## 핵심 용어` 절 보유 | 0 / 32 | **33 / 33** | 76 / 76 |
| frontmatter 100줄 초과 | 0 | **0** | 7 (전부 정상 판정) |
| lint_style error | 2,400 | **0** | 0 |
| lint_style warning | 80 | **0** | 0 |
| lint_terms | 55 | **0** | 0 |
| lint_figures error | 4 | **0** | 미기록 |
| index.md 200자 초과 | 18 / 32 | **0 / 33** | 0 / 76 |

  - **표 편당 13.94개는 physical-ai 완료치 9.70개의 1.44배**이고 Phase 2 agents의 18.38개보다는 낮다. 본문 중앙값 13,588자는 physical-ai 14,156자에 근접한다. 압축비 중앙값 1.34는 physical-ai 1.95에 못 미치는데, agents(1.42)와 같은 구조적 이유다. sources도 함께 보강해 게이트가 계속 올라갔고, 여기에 더해 **applications 고유의 사정으로 sources가 오히려 줄어든 stem이 여럿 있다** (stale claim 삭제분이 보강분보다 큰 경우다). sources 본문 합계는 307,038자에서 363,670자로 늘었다.
  - **Phase 3 누적 산출물.** wiki 본문 합계가 190,511자에서 495,520자로 2.60배가 됐고(7개 배치 합산) 표는 42개에서 460개다. sources는 307,038자에서 363,670자, 표 34개에서 208개다. 고아 sources 1편을 신규 wiki로 해소했고, caption 정비 약 50건, figure 큐레이션 조정 2 stem(dnotitia-2026-akb 8장에서 12장, wlsdks 4건 제거), `wiki-uncurated-figure` 4건에서 0건, `candidate-table-mismatch` 16건에서 0건, `empty-figures-dir` 1건에서 0건이다.
  - **raw 재독으로 잡은 무근거 주장이 722건이다.** 배치별로 B1 80건, B2 81건, B3 197건, B4 133건, B5 120건, B6 26건, B7 85건이다. Phase 2 agents 64편의 약 250건과 비교하면 편당 21.9건 대 3.9건으로 5.6배다. **applications가 유독 오염이 심했던 이유는 아래 세 구조적 원인으로 규명됐다.**
  - **원인 1: 커밋 `0507ad0`(2026-06-17)의 repo 스텁 전환.** `raw/repos/`의 전체 클론 14개를 README 스텁으로 경량화하면서(185MB에서 344KB) sources와 wiki 28개 파일의 `raw_path`와 `raw_filename`만 갱신하고 본문을 재검증하지 않았다. 영향 stem 13개 중 applications가 8편으로 가장 많고, database 4편(D2, D3, D4, D5)과 evaluations 1편(E2)이 Phase 4와 5에 남아 있다. agents는 0편이라 Phase 2 완료분에 회귀 위험이 없다. 이 8편에서만 무근거 주장 약 340건이 나와 Phase 3 전체의 47%를 차지한다.
  - **원인 1의 성격 규정 정정: 스텁 전환은 경량화가 아니라 자료 교체였다.** `colbymchenry-codegraph`는 클론이 v0.9.8 시점인데 새로 받은 README가 1.0 판이고 도구 구성이 10종에서 8종으로 바뀌었다. `dragon1086-llm-wiki`도 스텁(361줄)이 삭제된 클론 README(261줄)보다 최신이다. 따라서 스텁 stem의 sources는 **없어진 근거에 기댄 서술**과 **낡은 판을 보고 쓴 서술** 두 종류를 함께 안고 있다.
  - **원인 2: ingest 시점의 raw 밖 정보 유입.** 스텁 전환 목록 밖인 `graphify-labs-graphify`도 "85.1k stars"와 "www.graphify.com"이 raw에 없었고, **ingest 커밋 `f148a6b`의 메시지 자체가 그 수치를 담고 있다.** 수집 절차가 raw에 없는 정보를 sources에 넣는 경로가 있었다는 뜻이다.
  - **원인 3: 짧은 자료의 과잉 부연과 인접 페이지 수치 복제.** raw가 3KB 안팎인 LinkedIn 포스트 계열(`alex-xu`, `pandey`, `patel`)에서 일반 지식 부연과 인접 페이지 벤치마크 수치 복제가 나왔다. `pandey` 한 편에서만 인접 논문 수치 12건을 일괄 삭제했다.
  - **도구 개선 2건.** (1) `scripts/lint_figures.py`의 `parse_candidate_table()`이 8절 표 id 셀의 마크다운 강조를 벗기지 않아 `**fig06**` 표기에서 `candidate-table-mismatch` 오탐 16건을 냈다. `.strip("*_`")`로 정규화했고 전 저장소 총계는 불변이다. (2) 배치 공통 브리프에 부록 두 개를 신설했다. 스텁 stem 목록과 `sources 바이트 / raw 바이트` 위험 지표 표, 그리고 repo stem의 caption을 이미지로 대조하는 절차다.
  - **새 예측 지표를 확립했다: `sources 바이트 / raw 바이트`.** 실측 대응이 safishamsi 4.0배 64건, joonan30 5.6배 62건, lum1104 2.0배 64건, dragon1086 2.3배 61건, dnotitia-akb 1.3배 37건, garrytan-gbrain 0.7배 32건, wlsdks 0.62배 8건이다. **2배 초과를 고위험으로 본다.** 다만 figure를 가진 stem은 도해의 정보 밀도가 텍스트 바이트에 반영되지 않으므로 보수적으로 적용한다(`patel-2026` 2.3배와 `alex-xu` 3.2배가 그 사례다). Phase 4와 5의 잔여 스텁 stem 비율은 athina-ai-rag-cookbooks 1.1배, marker-inc-korea-autorag 1.1배, ryancodrai-turbovec 0.9배, vectifyai-pageindex 0.8배, hkuds-rag-anything 0.2배로 전부 저위험 대역이다.
  - **저장소 backlog 3종을 완결했다.** `HUMANIZE-SUMMARY` 잔재가 전 저장소 0파일이 됐고(파일럿 1-1의 10파일이 출발점이며 마지막 4파일이 전부 applications에 있었다), `lint_links`의 `link-unresolved`가 전 저장소 0건이 됐으며(Phase 1-7(b)가 남긴 마지막 1건이 B3의 `datasciencedojo-2026`이었다), frontmatter `title` 금지 기호가 applications에서 전량 해소돼 전 저장소 잔여가 llms 1 stem(2파일)뿐이다.
  - **사용자 결정 4건을 이행했다.** (1) `dnotitia-2026-akb-product-introduction`의 figure 재크롭 23건 생략(23쪽 슬라이드 덱이라 page-region이 정상 출력이라는 판정), (2) frontmatter `title` 금지 기호는 sources와 wiki만 정규화하고 raw는 보존(원제는 인라인 코드로 sources 1절에 기록), (3) `raw/reports/kmyu-2026-akb-llmwiki-gbrain-comparison-figures/` 삭제(PDF 6페이지에 도식이 0장이라 이미지 0장은 추출 실패가 아니라 대상 부재), (4) Karpathy gist ID는 sources 쪽 근거 없는 인용만 정정하고 CLAUDE.md는 유지(raw 근거가 `442a6bf` 4건 대 `1dd0294` 0건이나 웹 확인이 rule #1로 금지되어 실재 여부는 판정 불가).
  - **사용자 판단 사항 3건을 남긴다.** (1) `raw/repos/dnotitia-akb.md` frontmatter의 `license: "PolyForm Noncommercial 1.0"`이 같은 파일이 감싼 README 본문(BUSL-1.1)과 모순된다. raw 불변 규약과 충돌하고 같은 성격의 문제가 다른 스텁 stem에도 있을 수 있다. (2) `safishamsi-graphify`와 `graphify-labs-graphify`의 raw 본문이 바이트 단위로 동일하다(각 7,071자). 두 stem은 실질적으로 같은 자료의 중복 수집이고, 지금은 양쪽을 남기고 "확인되는 차이는 소유 주체 표기뿐"이라고 명시해 뒀다. (3) `lum1104-understand-anything`의 저장소가 `Egonex-AI/Understand-Anything`으로 이전됐고 README의 설치 명령과 라이선스 링크가 전부 새 주소를 가리킨다. stem은 옛 주소 기준이고 3-tier가 stem을 공유하므로 변경 비용이 크다.
  - **Phase 4와 5로 넘기는 확인 사항 4건.** (1) **GraphRAG 원논문 오귀속을 D1에서 재확인한다.** `edge-2024`에 "local search"가 0회이고 원논문은 community summary와 map-reduce 단일 모드만 다루므로, local과 global 이원 구성을 원논문에 귀속하는 서술이 database 페이지에 남아 있는지 본다. (2) `wiki/database/lumer-2025-rethinking-retrieval-from-traditional-retrieval.md:85`의 bare wikilink 3개와 102행의 "corrective RAG(Yan 2024)", "BM25" 표기 근거를 D4에서 확인한다. (3) 스텁 stem 5편(database 4, evaluations 1)에 부록 절차를 적용한다. (4) `sources/google-okf.md:120`과 `wiki/etc/google-okf.md:118`의 gist ID `1dd0294`를 E2에서 정정한다.
  - **전 저장소 잔여 지표 (Phase 4 이후 소관).** lint_style error 3,155건, warning 81건, lint_terms 93건이다. `lint_links`는 error 0건에 warning 116건(`bare-wikilink` 계열), `lint_figures`는 error 116건과 warning 217건이다. 착수 시점 전 저장소 error 9,202건에서 3,155건으로 65.7% 줄었다.
  - 부수 관찰 1건. Phase 3 진행 중 다른 세션이 physical-ai 자료 7편을 새로 ingest해 저장소 전체 고아 sources가 0편에서 7편이 됐다. **전부 physical-ai이고 applications는 0편을 유지한다.** 계획서 2-5절이 지정한 5편은 Phase 1-6과 B2로 전량 해소됐다.

### Phase 4. database 배치 재작성 (D1~D5, 25편)

파일럿 1편(edge-2024)은 소속 배치에서 제외한다. 실제 배치 작업량은 24편이다.

- [x] D1 GraphRAG 트렁크 (5편, 파일럿 1편 제외): microsoft-graphrag, dsba-2025-graphrag-paper-review, guo-2025-lightrag-simple-and-fast, zhang-2026-leanrag-knowledge-graph-based-generation, dsba-2026-paper-review-graph-based-rag
  - 완료 (2026-09-08). 5편 전부 게이트를 통과했다. wiki 본문 합계 23,909자에서 110,623자로 4.63배가 됐고 표는 8개에서 124개다. 압축비 중앙값 0.51에서 1.31, 최소값 0.395에서 1.172다. 편별로는 microsoft-graphrag 0.51에서 1.45, dsba-2025 0.395에서 1.172, guo-2025-lightrag 0.46에서 1.306, zhang-2026-leanrag 0.51에서 1.307, dsba-2026 0.58에서 1.302다. 얇은 페이지 5편에서 0편, 표 0개 페이지 2편에서 0편이다.
  - sources도 문체 정비로 합계 49,098자에서 86,243자, 표 6개에서 70개가 됐다. 번호 붙은 영문 병기 헤딩은 규약대로 유지했다.
  - lint 5종 0건. 10개 파일에 lint_style error 0 warning 0, lint_terms 0, lint_links error 0 warning 0, lint_figures 0, audit_captions 0이다. `lint-style: ignore`와 `lint-terms: ignore` 예외는 5편 전부 한 건도 쓰지 않았다.
  - 카테고리 총계 감소: database error 1,752건에서 1,408건(-344), warning 19건에서 14건(-5), 위반 파일 49개에서 39개(-10), lint_terms 50건에서 45건(-5), lint_links warning 62건에서 53건(-9), lint_figures error 30건에서 28건(-2)이다. 회귀 게이트 네 줄(physical-ai 2줄, agents, applications) 모두 exit 0이다.
  - figures 백필 21장. `guo-2025-lightrag`(15장, curated 5)와 `zhang-2026-leanrag`(6장, curated 3)의 `figures-missing`을 해소했고 크롭 PNG를 전부 열어 caption을 한글로 새로 썼다. 논문의 Table은 이미지 임베드 대신 본문 마크다운 표로 옮겼다. `figures-missing`이 6건에서 4건이 됐다.
  - **Phase 3 이월 확인 사항 (1) GraphRAG 원논문 오귀속을 종결했다.** 원논문 PDF 26쪽 전문(89,667자)을 직접 검색한 결과 `local search`가 0회, `global search`는 6회인데 전부 실험 조건 C0에서 C3을 묶어 부르는 이름이며, `community summar`가 34회다. 원논문의 질의 방식은 community summary 기반 map-reduce 단일 모드이고, local과 global 이원 구성은 `microsoft/graphrag` 구현체가 도입한 것이다. 5편 중 3편에서 오귀속을 찾아 정정했다(`microsoft-graphrag`, `guo-2025-lightrag`, `zhang-2026-leanrag`). `dsba-2025`와 `dsba-2026`은 우리 쪽에도 자료 쪽에도 오귀속이 없었고, `dsba-2025` 발표 자료는 슬라이드 42에서 "본문에서 소개되는 내용보다 실제 코드는 더 많은 과정"이라며 DRIFT를 예로 들어 논문과 구현체를 명시적으로 분리한다.
  - **LeanRAG 논문 자체가 같은 오귀속을 한다.** 본문이 "GraphRAG (Edge et al. 2024) ... We use its local search mode"라고 적는다. 삭제하지 않고 wiki에 등장 횟수 표와 함께 기록했고, Table 1의 GraphRAG 수치가 원논문 성능이 아니라 구현체 한 모드의 성능이라는 해석 주의를 붙였다.
  - **raw 재독이 무근거 주장 54건을 잡았다.** 편별로 dsba-2026 15건, zhang-2026-leanrag 13건, microsoft-graphrag 10건, dsba-2025 8건, guo-2025-lightrag 8건이다. 편당 10.8건으로 Phase 3 applications의 21.9건보다 낮고 Phase 2 agents의 3.9건보다 높다.
  - 대표 정정 5건. (1) **`dsba-2026`이 HiRAG를 HippoRAG로 오독하고 있었다.** 자막의 "하이래그"(LeanRAG RQ1 문맥 2회)를 다른 절의 "히포렉그"와 섞었고, 슬라이드 38은 "HiRAG 를 포함하여 계층적 그래프 활용 시 더 효과적"이라 적는다. HippoRAG는 계층 방법론도 아니다. (2) 같은 stem의 평가 모델이 Qwen-2.5-14B로 적혀 있었으나 슬라이드 39는 Qwen3-14B다. `Raptor`, `MuSiQue`, `Leiden`, `Microsoft`는 자막과 슬라이드 45장 전체에 0회다. (3) **`microsoft-graphrag`의 "공식 reference 구현체"가 정반대였다.** README는 "the provided code serves as a demonstration and is not an officially supported Microsoft offering"이라 적는다. (4) **`zhang-2026-leanrag`의 GitHub URL이 근거 없는 정보였다.** PDF 8쪽 전문에 "github", "KnowledgeXLab", "code is available"이 0회이고 PDF 링크 주석도 0개라 frontmatter `url:`과 본문 "오픈소스" 서술을 삭제하고 한계 절에 코드 공개 정보 부재로 기록했다. (5) `guo-2025-lightrag`의 "메모리 GraphRAG 대비 우수"는 Table 7의 `Final Storage Space`(디스크 39.5MB 대 286.7MB)라 "최종 저장 공간"으로 정정했다.
  - **인접 페이지 수치 복제를 3건 확인했다.** `dsba-2025`의 "graspologic"은 `edge-2024`에서, `zhang-2026-leanrag`의 "UltraDomain 18 도메인 428 원소"와 "GMM-BIC"는 `dsba-2026`에서 흘러든 것이다. 428이라는 수는 `guo-2025-lightrag`의 raw에 "428 college textbooks"로 실재하므로 그 stem에서는 "대학 교재 428권"으로 정정해 보존했고, LeanRAG raw에는 없어 삭제했다. BIC도 세미나 자료가 유일한 출처임을 명시했다.
  - **자료 자체의 내적 모순 20건을 wiki에 기록했다.** 대표는 (1) LeanRAG 본문이 "summarized in Table 2" 뒤에 "The data in Table 3 clearly shows"로 이어지고 Table 2의 Mix Comprehensiveness win rate가 51.5% + 48.6% = 100.1%인 것, (2) LightRAG의 community report 토큰 수가 검색 분석에서 평균 1,000, 증분 갱신 분석에서 약 5,000으로 갈리고 Table 9의 질의와 답변이 서로 다른 주제인 것, (3) `dsba-2025` 슬라이드 40 제목이 "Python Packages"인데 나열 4항목에 Python 패키지가 없는 것이다. `dsba-2026`은 자동 자막 오인식 12건 대조표를 별도로 실었다.
  - **크롭 결함 3건을 기록만 했다** (`--force` 금지 규약 준수). `guo-2025-lightrag`의 `tab06.png`가 `tab05.png`와 bbox는 물론 바이트 크기까지 동일한 중복 크롭이고 tab01과 tab02는 상하가 잘렸다. `zhang-2026-leanrag`의 `tab02.png`는 caption 앵커는 Table 2인데 실제로는 7쪽 하단 전체 너비를 잡아 왼쪽 단 본문과 Table 3이 담겼다. 세 건 모두 해당 Table을 본문 마크다운 표로 전량 이관해 정보 손실은 없고 `curated: false`로 뒀다. 향후 `--bbox` 수동 재지정 후보다.
  - 오케스트레이터 직접 처리 2건. (1) `dsba-2025`의 sources 표가 0개여서 담당 subagent에게 보완을 지시했다. "sources는 서술형 유지"로 판단했으나 그 규약은 번호 붙은 영문 병기 헤딩에만 해당하고, CLAUDE.md 문체 가이드 머리가 "`sources/`와 `wiki/`의 한글은 처음 쓸 때부터 아래를 지킨다"고 명시하며 그 안의 구조 요소 항목이 3개 이상 열거를 표로 꺼내라고 요구한다. 표 22개가 됐고 본문이 18,746자에서 21,107자로 늘어 압축비가 1.319에서 1.172로 내려갔다. 5절의 "1차 게이트가 목표 범위에 우선한다"는 규정에 따라 그대로 뒀다. (2) index.md 5항목을 다시 쓰고 구분자를 `]]: `로 통일했다.
  - index.md 5항목을 174, 174, 142, 148, 174자에서 173, 184, 194, 194, 186자로 다시 썼다. `microsoft-graphrag`의 "공식 구현체"와 `dsba-2026` 별칭의 중간점을 함께 고쳤다. 다섯 항목 모두 착수 시점부터 200자 이내였으므로 Database 절 200자 초과 5개는 변동이 없다 (D3, D4, D5 소관).
  - 용어집 등재 후보 17건 누적 (등재하지 않음, Phase 7-1 소관): knowledge graph, community, community detection, community summary, indexing, graph retrieval, seed entity, LLM-as-judge, semantic island, lowest common ancestor(LCA), entity, chunk, aggregation, gleaning parameter, key-value indexing, dual-level retrieval, query(질의와 쿼리 표기 흔들림, Phase 7-1의 기존 이관 항목과 같은 사안).
  - **Phase 6(overviews)으로 넘기는 정정 3건.** `wiki/overviews/lightrag-family-graph-rag-overview.md`가 (1) 382행에서 `microsoft/graphrag`를 "공식 reference implementation"이라 적는데 README가 명시적으로 부정하는 표현이고, (2) 185행과 357행과 387행이 이 저장소 어느 raw에도 근거가 없는 `KnowledgeXLab/LeanRAG` URL을 참조하며, (3) "HiRAG, HippoRAG, CausalRAG, HugRAG 등 wiki 외부"라고 적는데 HippoRAG 2에 해당하는 `database/gutierrez-2025-from-rag-to-memory-non`이 실재한다. 같은 파일 280행의 귀속 서술과 187행 DRIFT 행은 정확하다.
  - **사용자 판단 후보 2건.** (1) `dsba-2026`의 보조 자료 `raw/papers/dsba-2026-paper-review-graph-based-rag.pdf`(45장 슬라이드)에 도해가 풍부한데 `-figures/`가 없다. 신규 추출 후보이고, Phase 3 B1과 B2의 슬라이드 덱 재크롭 생략 결정과는 성격이 다르다(그때는 기존 크롭의 재크롭). (2) `dsba-2025`의 frontmatter `url:`이 발표 자료 출처가 아니라 `https://github.com/microsoft/graphrag`를 가리킨다. PDF 43쪽 전문과 링크 주석 6개를 전수 확인했으나 실제 출처 URL을 찾지 못해 유지하고 그 사실을 명시했다.
  - 부수 처리 1건. `dsba-2026`의 sources와 wiki frontmatter `supplementary_raw_path`가 다른 머신의 절대경로(`/Users/kmyu/...`)여서 저장소 상대경로로 고쳤다. `raw/videos/` 쪽 같은 값은 raw 불변 규약에 따라 손대지 않았다 (Phase 3 B1의 부수 발견과 같은 사안).
- [x] D2 멀티모달 RAG와 임베더 (5편): guo-2025-rag-anything-all-in-one-rag, hkuds-rag-anything, 9bow-2026-rag-anything-multimodal-rag-framework, startrail-org-pixelrag, shanbhogue-2026-gemini-embedding-2-native-multimodal
  - 완료 (2026-09-08). 5편 전부 게이트를 통과했다. wiki 본문 합계 27,407자에서 93,509자로 3.41배가 됐고 표는 12개에서 100개다. 압축비 중앙값 0.63에서 1.33, 최소값 0.53에서 1.302다. 편별로는 guo-2025-rag-anything 0.53에서 1.329, hkuds-rag-anything 0.64에서 1.334, 9bow-2026 0.63에서 1.609, startrail-org-pixelrag 0.87에서 1.316, shanbhogue-2026 0.64에서 1.302다. 얇은 페이지 5편에서 0편이다.
  - sources도 문체 정비로 합계 42,986자에서 69,402자, 표 17개에서 59개가 됐다. `9bow-2026`만 6,954자에서 6,827자로 줄었는데 무근거 주장 10건 삭제분이 raw 근거 있는 복원분보다 컸기 때문이다 (Phase 3 applications에서 확인된 정상 패턴).
  - lint 5종 0건. 10개 파일에 lint_style error 0 warning 0, lint_terms 0, lint_links error 0 warning 0, lint_figures 0, audit_captions 0이다. 예외 주석은 5편 전부 한 건도 쓰지 않았다.
  - 카테고리 총계 감소: database error 1,408건에서 1,118건(-290), warning 14건에서 9건(-5), 위반 파일 39개에서 29개(-10), lint_terms 45건에서 18건(-27), lint_figures error 28건에서 26건(-2)이다. 회귀 게이트 네 줄 모두 exit 0이다.
  - figures 백필 30장. `guo-2025-rag-anything`(18장, curated 5), `shanbhogue-2026`(11장, curated 3), `hkuds-rag-anything`(README 이미지 1장, GitHub URL과 `strategy: manual`로 기록, curated 0)이다. `figures-missing`이 4건에서 2건이 됐고 잔여 2건은 D3과 D4 소관이다.
  - **raw 재독이 무근거 주장 61건을 잡았다.** 편별로 hkuds-rag-anything 27건, shanbhogue-2026 11건, 9bow-2026 10건, guo-2025-rag-anything 7건, startrail-org-pixelrag 6건이다. 편당 12.2건으로 D1의 10.8건보다 높다.
  - **저장소와 논문의 관계가 역전돼 있었다.** index.md와 wiki가 `hkuds-rag-anything`을 "RAG-Anything 논문의 reference 구현체"라고 적었으나 README에 `reference implementation`이 0회이고, News 2025.10은 반대로 논문을 "the technical report of RAG-Anything"으로 규정한다. 저장소가 2025.07에 이미 star 1,000개였고 보고서가 2025.10이므로 근거상 저장소가 선행이고 논문이 그 기술 보고서다. D1의 `microsoft-graphrag` "공식 구현체"와 같은 유형이라 관계 서술을 제거했다.
  - **`hkuds-rag-anything` 한 편에서만 무근거 27건이 나왔다.** 스텁 전환으로 사라진 것은 `LICENSE`, `pyproject.toml`, `raganything/` 19개 모듈(`parser.py` 2,660줄 등), `examples/` 13개, `docs/` 6편, `reproduce/` 4개, `tests/` 3개다. 그래서 (a) 벤치마크 수치 전량(DocBench 63.4%, MMLongBench 42.8%, MMGraphRAG 61.0, LightRAG 58.4와 ablation)이 README에 0회인 논문 페이지 복제였고, (b) 모듈과 클래스 표 전체(`QueryMixin`, `ProcessorMixin`, `register_parser`, `CircuitBreaker` 등)가 raw에 0회였으며, (c) "23 pytest 파일"과 "19 모듈 약 2.5K LoC"는 삭제된 클론 기준으로도 틀렸다(`parser.py` 한 파일이 2,660줄이다). (d) `aquery_vlm_enhanced()`를 세 번째 질의 메서드로 적었으나 README는 `aquery(q, mode="hybrid", vlm_enhanced=True)` 인자로 문서화한다.
  - **스텁 stem은 라이선스 검증이 불가능하다는 사실을 확인했다.** `hkuds-rag-anything`의 README 본문에 라이선스 조항이 0회이고, `grep -i "licen|MIT|copyright"`의 유일한 히트가 수집 시 붙인 frontmatter `license: "MIT"` 한 줄이다. 원 근거인 `LICENSE` 파일 21줄이 `0507ad0`에서 삭제됐다. Phase 3의 `dnotitia-akb`처럼 값이 모순된 것이 아니라 검증 자체가 불가한 경우라, frontmatter 값을 유지하고 wiki 한계 절에 사실을 기록했다.
  - **README가 클론보다 나중 판인 사례를 다시 확인했다.** `hkuds-rag-anything`의 News 2026.06 항목(LightRAG가 RAG-Anything을 native integration)은 기존 sources와 wiki 어디에도 없던 새 정보이고 통합 방향이 역전된 내용이다. Phase 3이 규정한 "스텁 전환은 경량화가 아니라 자료 교체"의 추가 사례다.
  - 대표 정정 5건. (1) `9bow-2026`의 `MinerU`, `GPT-4o-mini`, `belongs_to`, `NER + relation extraction`, `cosine top-k`, `Dereferencing`, `Multi-Signal Fusion`이 raw 7,982바이트에 문자열조차 0회였다. **구 sources 용어집이 "글에서는 명시 안 됨; 원 논문 기준"이라고 스스로 밝히면서도 등재해 둔 항목이 있었다.** (2) `shanbhogue-2026`의 "MTEB Code v1에서 voyage-code-3(78.5)를 압도"에서 78.5는 voyage-code-3의 CoIR 값이고 MTEB Code 값은 논문이 미보고(‡)다. (3) 같은 stem의 "전 task 그룹 1위"가 틀렸다. Table 2 기준 9개 유형 중 Instruction Retrieval(2.9 대 voyage-3.5의 6.5), Pair Classification(83.2 대 선행 83.6), STS(79.4 동률) 세 곳이 1위가 아니다. (4) 같은 stem의 합성 데이터 +15.81은 "이전 Gemini Embedding 모델 대비" 총 상승폭이고 합성 데이터 단독 기여는 73.0에서 86.3의 13.3점이다. 저자 소속도 저자 줄은 Google이고 Google DeepMind는 저작권 줄에만 나오며, 기여자는 60여 명이 아니라 Core 83명과 Leadership 6명을 합한 89명이다. (5) `startrail-org-pixelrag`의 "소규모 인덱스 빌드는 Apple M-series에서 약 3분"은 샘플 PDF 한 개 워크스루에 붙은 값을 일반화한 것이었다.
  - **자료 자체의 내적 모순 17건을 wiki에 기록했다.** 대표는 (1) `shanbhogue-2026`의 Table 1과 Figure 3/Table 6 지표 불일치 5건(YouCook2 52.5 대 55.9가 최대)과 MMTEB 과제 유형이 본문 10개 대 Table 2의 9행인 것, (2) `guo-2025-rag-anything`의 Table 1 평균 66페이지 대 Table 5 유형별 가중평균 61.0페이지, (3) `9bow-2026`의 DocBench 뉴스 66.3%를 굵게 표기해 최고값처럼 제시하지만 같은 글의 ablation 표에서 `w/o Reranker`가 68.6인 것이다.
  - **크롭 결함 3건을 기록만 했다** (`--force` 금지 규약 준수). `guo-2025-rag-anything`의 `tab01`은 캡션 줄 상단이 잘렸고 `fig10`은 상단에 Figure 9 캡션 꼬리가 혼입했다. `shanbhogue-2026`의 `tab03`은 페이지 면적 63%를 잡아 §4.3 본문을 담고 정작 Table 3이 하단에 걸려 잘렸다. 세 건 모두 해당 Table을 본문 마크다운 표로 이관해 정보 손실이 없고 `curated: false`로 뒀다. **두 stem 모두 중복 크롭은 0건**이다(md5 전수 대조). D1의 LightRAG 중복 크롭과는 다른 유형이다.
  - 오케스트레이터 직접 처리 2건. (1) **repo stem의 `figures[].raw`가 실재하지 않는 로컬 경로를 가리키는 문제를 전수 조사했다.** 스텁 전환으로 클론이 사라져 `raw/repos/{stem}/docs/...` 경로가 남았는데, CLAUDE.md Repos Step 2.5는 이 필드에 GitHub URL을 기록하도록 규정한다. 전 저장소 3 stem 20건이고 `startrail-org-pixelrag` 4건은 `raw.githubusercontent.com` URL로 직접 고쳤다. 잔여는 `ryancodrai-turbovec` 7건(D5)과 `marker-inc-korea-autorag` 12건(Phase 5 E2)이다. (2) `shanbhogue-2026`의 index 제안 문안이 211자로 상한을 넘어 198자로 줄였다. stem이 51자라 wikilink 접두부만 88자를 쓰는 항목이다.
  - index.md 5항목을 155, 145, 166, 249, 163자에서 190, 195, 160, 199, 198자로 다시 쓰고 구분자를 `]]: `로 통일했다. `hkuds-rag-anything`의 "reference 구현체"와 `shanbhogue-2026`의 `파인튜닝`과 `Google DeepMind`를 함께 고쳤다. Database 절 200자 초과가 5개에서 4개가 됐고(`startrail-org-pixelrag` 250자 해소) 잔여는 D3 1개와 D4 3개다.
  - 용어집 등재 후보 20건 누적 (Phase 7-1 소관): multimodal RAG, modality, content list, atomic content unit, anchor node, dual-graph construction, dereferencing, multi-signal fusion, architectural fragmentation, late-fusion(dual-tower), native multimodal embedding, hard negative, in-batch negative, contrastive learning, mean pooling, model soup, MRL(Matryoshka Representation Learning), zero-shot, screenshot tile, visual search.
  - **사용자 판단 후보 1건.** 스텁 stem은 `LICENSE` 파일이 사라져 라이선스 검증이 불가하다. CLAUDE.md Repos Step 1에 `LICENSE` 동반 수집 절차를 추가할지 검토가 필요하다. 잔여 스텁 stem 3편(D3 `vectifyai-pageindex`, D4 `athina-ai-rag-cookbooks`, D5 `ryancodrai-turbovec`)과 Phase 5의 `marker-inc-korea-autorag`에 같은 위험이 있다.
- [x] D3 PageIndex와 vectorless (6편): vectifyai-pageindex, zhang-2025-pageindex-vectorless-reasoning-rag, geeksforgeeks-2026-vectorless-rag-pageindex, kalane-2026-pageindex-threw-out-vector-databases, sguys99-langchain-study-vectorless-rag, li-2026-beyond-semantic-similarity-rethinking-retrieval
  - 완료 (2026-09-08). 6편 전부 게이트를 통과했다. wiki 본문 합계 47,300자에서 117,344자로 2.48배가 됐고 표는 15개에서 119개다. 압축비 중앙값 0.59에서 1.31, 최소값 0.444에서 1.299다. 편별로는 vectifyai-pageindex 0.59에서 1.306, zhang-2025 0.54에서 1.306, geeksforgeeks-2026 0.815에서 1.555, kalane-2026 0.444에서 1.307, sguys99 0.516에서 1.301, li-2026 0.824에서 1.299다. 얇은 페이지 6편에서 0편이다.
  - sources는 합계 76,951자에서 87,592자, 표 16개에서 60개가 됐다. `sguys99`만 17,819자에서 13,415자로 줄었는데 스텁 전환으로 사라진 근거에 기댄 서술을 걷어낸 결과이고 부록 A가 예고한 정상 축소다.
  - lint 5종 0건. 12개 파일에 lint_style error 0 warning 0, lint_terms 0, lint_links error 0 warning 0, lint_figures 0, audit_captions 0이다. 예외 주석은 6편 전부 한 건도 쓰지 않았다.
  - 카테고리 총계 감소: database error 1,118건에서 629건(-489), warning 9건에서 5건(-4), 위반 파일 29개에서 17개(-12), lint_terms 18건에서 17건(-1), lint_links warning 53건에서 14건(-39), lint_figures error 26건에서 25건(-1)이다. **bare-wikilink가 이 배치에 몰려 있어 52건에서 13건이 됐다.** 회귀 게이트 네 줄 모두 exit 0이다.
  - figures 백필 18장. `li-2026`(13장, curated 5)과 `vectifyai-pageindex`(README 이미지 5장, 원격 URL과 `strategy: manual`, curated 0)다. `figures-missing`이 2건에서 1건이 됐고 잔여 1건은 D4 소관이다.
  - **raw 재독이 무근거 주장 111건을 잡았다.** 편별로 `sguys99` 40건 이상, `vectifyai-pageindex` 36건, `geeksforgeeks-2026` 13건, `li-2026` 9건, `zhang-2025` 7건, `kalane-2026` 6건이다. 편당 18.5건으로 D1의 10.8건과 D2의 12.2건보다 높고 Phase 3 applications의 21.9건에 근접한다.
  - **Phase 3 이월 확인 사항 (2) `lumer-2025`의 bare wikilink와 표기 근거는 D4 소관으로 남는다.** D3에서는 계열 5편의 bare-wikilink 39건을 전량 해소했다.
  - **`FinanceBench 98.7%`의 정체를 규명했다. 이것이 이 배치의 최대 산출이다.** 이 수치는 PageIndex의 것이 아니라 **Mafin 2.5**(PageIndex를 retrieval 층으로 쓰는 VectifyAI의 금융 에이전트 제품)의 것이다. PageIndex 팀 소개글(`zhang-2025`)에는 정확도 수치가 하나도 없고, 그 글의 숫자는 chunk 크기(512 또는 1000 토큰), 사례 페이지(75~82, 77), 예시 트리 인덱스가 전부다. 수치가 실재하는 raw는 두 곳뿐이다: `raw/repos/vectifyai-pageindex.md`의 L86과 L244, `raw/articles/kalane-2026-...md`의 L33과 L308이며 근거로 제시되는 `github.com/VectifyAI/Mafin2.5-FinanceBench`와 `vectify.ai/blog/Mafin2.5`는 둘 다 VectifyAI 자산이다. **공급자 자체 보고이고 독립 재검증이 없다.**
  - **`kalane-2026`의 저자 본인이 대상을 일관되게 적지 않는다.** L18(제목)과 L33은 "PageIndex가 98.7%를 달성"이라 쓰고 L308과 L314는 같은 수치를 Mafin 2.5 행에 귀속한다. 저자가 밝힌 것은 벤치마크(FinanceBench, SEC 10-K/10-Q/8-K), 커버리지(100%), 비교 대상(vector RAG 약 50%, GPT-4o 약 31%, Perplexity 약 45%)이고, **밝히지 않은 것은 수치의 출처(인용도 링크도 없다), 측정 주체, 독립 재검증 여부**다. 저자의 "약 49%p 향상" 계산은 기준선 50%에서만 성립하는데 같은 글이 기준선을 30~50%로 흔들리게 적는다. 저자 자신의 부정확이므로 삭제하지 않고 한계 절에 기록했다.
  - **인용 시 병기 조건 세 가지를 두 파일에 명문화했다**: 대상은 Mafin 2.5, 공급자 자체 발표, 독립 재검증 없음. 세 조건을 못 적는 자리에서는 수치를 뺀다. 실제로 `## 관련 페이지`의 한 줄 설명과 index.md 항목에서 조건 없는 인용을 제거했다. 오케스트레이터가 배치 중간에 이 사실을 나머지 4편 담당 subagent에 전파했다.
  - **날조된 인용이 2건 나왔다.** (1) `vectifyai-pageindex` wiki가 이탤릭 따옴표로 README 인용이라 제시한 *"PageIndex currently enables reasoning-based RAG within a single document by default."*가 raw grep 0회이고, README는 오히려 반대로 PageIndex File System이 "an entire corpus, not just a single document"를 다룬다고 적는다. (2) `kalane-2026` sources가 저자 부제로 인용한 "How VectifyAI's reasoning-based retrieval is quietly dismantling..."이 raw에 존재하지 않는다. `li-2026`에서는 Figure 1에 없는 표 행(`BM25 + retriever-agent | GPT-5.2 | ~42`)이 날조돼 있었고, `sguys99`에서는 README 인용으로 표기된 7행 비교표가 실재하지 않아 실재하는 3행으로 교체했다.
  - **스텁 stem 목록이 13개가 아니라 14개임을 확인했다.** `sguys99-langchain-study-vectorless-rag` 담당 subagent가 스스로 `git show --stat 0507ad0`을 실행해 이 stem도 대상임을 발견했다(16개 파일 6,709줄 삭제: `tree.py` 386줄, `retriever.py` 603줄, `main.py` 197줄, 노트북 1,381줄, `document_tree.json` 414줄, `workflow.png`, `img/2.png` 등). 원인은 오케스트레이터의 추출 오류다. **`git show --stat`이 긴 경로를 `...`으로 줄이기 때문에** 가장 긴 이름이 목록에서 빠졌다. 정확한 목록은 `git show --name-only --format="" 0507ad0 | grep "^raw/repos/"`로 얻고, 카테고리별로 applications 8, **database 5**, evaluations 1이다. 배치 공통 브리프와 자동 메모리를 같은 날 정정했다.
  - **스텁 오염이 repo stem 밖으로 번진 것을 확인했다.** article 유형인 `geeksforgeeks-2026`이 `pageindex/retrieve.py`의 함수 시그니처와 `page_index.py`의 "40+ 함수"처럼 `0507ad0` 이전 클론에만 있던 서술을 담고 있었다. 그 내용은 현재 OSS README에도 없다. 스텁 전환의 영향 범위가 14개 stem에 그치지 않고 **같은 제품을 다룬 다른 유형 페이지로 확산**됐다는 뜻이다. Phase 5와 6에서 스텁 stem을 고칠 때 같은 제품의 article과 video 페이지도 함께 점검한다.
  - 대표 정정 5건. (1) `vectifyai-pageindex`의 모듈, 클래스, 함수 이름 40개 이상(`page_index.py`, `retrieve.py`, `PageIndexClient`, `md_to_tree`, `toc_transformer` 등)이 전부 raw 0회였고, sources 3.1절 디렉토리 트리에는 "(실측)" 표기까지 붙어 있었으나 근거는 삭제된 클론이었다. (2) 같은 stem이 `if_add_doc_description` 기본값을 "no"로 적었으나 README CLI 목록은 `default: yes`다. (3) `geeksforgeeks-2026`이 `BrowseComp-Plus 80.0%`(li-2026 수치)와 `redundancy 46% 감소`(LeanRAG 수치)를 인접 페이지에서 복제하고 있었다. (4) `li-2026`의 `accuracy 51.1 → 37.5`에서 51.1이 51쪽 PDF 어디에도 없다. Figure 5 실측은 82.7%에서 69.1%, 43.0%이고 본문은 40만 건에서 37.5%라 적어 본문과 그림이 서로 다르다. (5) 같은 stem의 "latency 2배, cost 2배"는 10만에서 20만 구간에만 성립하고 40만에서는 latency 11.6배, cost 2.9배다.
  - **자료 자체의 내적 모순 24건을 wiki에 기록했다.** 대표는 (1) `geeksforgeeks-2026`의 Step 6에서 `get_tree`로 받은 `tree` 변수가 Step 8에서 10까지 한 번도 쓰이지 않아 글의 표제 주장(트리 탐색)과 실습 코드의 실제 경로가 어긋나는 것, (2) `li-2026`의 가장 강한 baseline이 세 곳에서 다른 것(4.2절은 GPT-5+Qwen3의 71.7%, A.2절은 o3, Figure 1의 최고는 Claude Sonnet 4.6의 69.0%이고 71.7% 점 자체가 그림에 없다), (3) `zhang-2025`의 노드 스키마(`name`/`description`/`metadata`/`sub_nodes`)와 바로 아래 예시(`title`/`summary`/`start_index`/`end_index`)가 필드를 공유하지 않는 것이다.
  - **크롭 결함 1건을 기록만 했다.** `li-2026`의 `fig05`는 caption 앵커가 10쪽 전체를 잡아(면적비 0.386) 차트 외에 Table 4 전체와 RQ2 후반부, RQ3 문단, Table 5 상단이 함께 들어갔다. 해당 데이터를 본문 표로 전량 이관하고 `curated: false`로 뒀다. 13장 md5 전수 대조로 중복 크롭은 0건임을 확인했다.
  - **"reference 구현체" 오표기가 3연속으로 확인됐다.** D1의 `microsoft-graphrag`("공식 구현체", README가 명시적으로 부정), D2의 `hkuds-rag-anything`("reference 구현체", README는 논문을 저장소의 기술 보고서로 규정), D3의 `vectifyai-pageindex`("reference 구현체", README는 Self-host 경로로 놓고 standard PDF parsing만 쓴다는 제약을 세 곳에서 반복)다. 개별 실수가 아니라 repo 페이지 작성 관행의 패턴으로 보이므로 D-완료 게이트에서 잔여 repo stem을 전수 점검한다.
  - 오케스트레이터 직접 처리 3건. (1) `98.7%` 사실을 배치 진행 중 나머지 4편 담당 subagent에 전파했다. (2) 스텁 목록 오류를 발견해 배치 공통 브리프와 자동 메모리 `repo-stub-stale-claims`를 정정하고 정확한 추출 명령을 남겼다. (3) index 제안 문안 3건이 200자를 넘어 줄였다(`li-2026` 225자에서 197자, `sguys99` 203자에서 196자, `kalane-2026` 214자에서 192자).
  - index.md 6항목을 157, 187, 174, 185, 266, 167자에서 182, 184, 189, 192, 196, 197자로 다시 쓰고 구분자를 `]]: `로 통일했다. `vectifyai-pageindex`의 "reference 구현체", `kalane-2026`의 "IBM 엔지니어"(근거가 저자 본인의 Medium byline뿐이고 글은 IBM 결과물이 아니다), `sguys99`의 중간점 나열을 함께 고쳤다. Database 절 200자 초과가 4개에서 3개가 됐고(`sguys99` 266자 해소) 잔여는 전부 D4 소관이다.
  - 용어집 등재 후보 22건 누적 (Phase 7-1 소관): vectorless RAG, reasoning-based RAG, reasoning-based retrieval, tree structure index, tree search, in-context index, in-document reference, hard chunking, chunk와 chunking, top-k, multi-hop retrieval, hierarchical chunking, corpus, localization, retrieval interface resolution, snippet, gold document, indexing과 index. **`vectorless RAG`는 재작성 중 실제로 원어와 음차("벡터리스 RAG") 혼용이 발생한 용어라 등재 우선순위가 높다.** `coverage`는 glossary-agents에 claim 채점 문맥으로 등재돼 있는데 `li-2026`은 retrieval 문맥으로 쓰므로 비고 보강 검토가 필요하다.
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

- [ ] 7-1. 용어집 4차 일괄 갱신 (배치 중 누적 후보, 사용자 승인 게이트, 등재 전 전 저장소 grep 사전 계량). Phase 0-3(b)에서 이관한 2건을 포함한다: `query`(canonical 방향 결정 선행, `질의` 금지 시 `품질의` 20건과 `질의응답` 17건이 부분 문자열로 걸려 `SUBSTRING_EXCEPTIONS` 3항 추가 필요), `rollout`(glossary-physical-ai 소관, physical-ai 13건). 계량은 `temp-docs/glossary-3rd-candidates.md` 6절에 남겨 재조사 없이 쓴다. `applies_to`를 바꾸면 write-wiki 스킬 §0 매핑 표도 같은 커밋에서 갱신한다 (§0은 `applies_to`의 사본이다)
- [ ] 7-2. pseudo-action 표기 통일. physical-ai 내 21건과 용어집 자체 혼용을 정리한다. canonical은 용어집 1차 갱신 때 등재된 하이픈 표기 `pseudo-action`을 권고
- [ ] 7-3. 전 저장소 계량 3열 대비 기록 (아래 5절 표)
- [ ] 7-4. 자동 메모리 갱신: physical-ai-lint-clean-state를 저장소 전체 clean-state로 승격
- [ ] 7-5. 후속 과제 기록 (남는 이월 항목을 이 문서 7절에 확정)

## 5. 검증과 계량

Phase 7-3에서 아래 표를 채운다. 착수 열은 Phase 0-2의 재실측(수정된 lint 기준, 2026-09-06 확정)이고, 최종 열은 Phase 7 완료 시점이다. 측정 정의는 2절 머리의 정의 표를 따른다.

| 지표 | 착수 (0-2 재실측) | 최종 |
|---|---|---|
| lint_style error (전 저장소) | 9,202건 | 목표 0건 |
| lint_style warning | 212건 (Phase 1-7의 `axis-misuse` 신설로 306건이 된다. 파일럿 3편 해소분을 빼면 현재 300건) | 목표 0건 |
| lint_terms 경고 | 270건 (0-2 재실측은 117건, Phase 0-3 용어집 3차 등재로 +153건) | 목표 0건 |
| bilingual-heading (wiki) | 906건 | 0건 (sources 번호 병기 헤딩 보존 확인 동반) |
| 중간점, em dash (본문) | 중간점 4,004건, em dash 4,280건 (발생 개수로는 9,805개와 4,510개) | 수식 곱셈 예외만 (건수와 위치 명기) |
| 표 0개 페이지 | 48편 | 0편 |
| 표 편당 (비-PAI) | 1.44개 (135편 195개) | physical-ai 완료치 9.70개 수준 |
| `## 핵심 용어` 절 보유 (비-PAI) | 0 / 135 | 135 / 135 |
| wiki가 sources보다 얇은 페이지 | 128편 | 0편 수렴 (예외는 사유 명기) |
| wiki 본문 중앙값 (비-PAI) | 5,326자 (산문 4,147자) | physical-ai 완료치 14,156자 수준 |
| figures caption 정비 대상 | 682건 (금지 기호 532, 영어 전용 139, 중복 36. 착수 원측은 700건이고 파일럿 3편이 18건을 해소했다) | 0건 |
| wiki-uncurated-figure (Phase 1-7 신설) | 210건 (agents 109, llms 41, evaluations 32, database 24, applications 4) | 0건 |
| figures-missing (Phase 1-7 신설) | 12건 (database 6, agents 4, llms 2) | 0건 |
| bare-wikilink (Phase 1-7 신설) | 143건 (sources 129, wiki 14) | 0건 |
| link-unresolved (Phase 1-7 신설) | 1건 (`applications/karpathy-2024-software-3-llms`, 배치 B3 판단) | 0건 |
| axis-misuse (Phase 1-7 신설) | 94건 (agents 50, applications 18, overviews 10, database 8, llms 4, evaluations 3, etc 1, physical-ai 0) | 0건 |
| frontmatter 100줄 초과 | 18편 (최악 364줄/504줄 = 72%) | 잔여는 curated 비중으로 정상 판정 |
| index.md 200자 초과 항목 | 101개 (비-physical-ai 148항목 중) | 0개 |
| 고아 sources | 5편 (Phase 1-6 완료로 4편) | 0편 |
| glossary-agents 등재 행 | 36행 | (3차, 4차 갱신 후 기록) |

착수 열의 lint 건수는 라인 단위 검출 건수라 수정 대상 라인 수보다 많다. 전 저장소 경고 9,414건은 고유 (파일, 라인) 8,042줄에 걸쳐 있고, 그중 1,344줄에 규칙이 둘 이상 걸린다. 가장 흔한 겹침은 middot과 emdash가 같은 줄에 함께 있는 1,212줄이다. error 규칙만 보면 9,202건이 7,934줄에 몰려 있고, middot과 emdash 8,284건은 7,045줄이다.

lint_terms 착수 열은 Phase 0-3 완료 시점 값이다. Phase 0-2 재실측 당시에는 117건이었으나, 0-3의 용어집 3차 등재 7행이 신규 위반 196건을 드러냈고 그중 physical-ai 43건만 즉시 정리해 270건이 됐다. 남은 153건은 Phase 2에서 5까지의 배치가 페이지를 재작성하며 흡수한다. 카테고리별 착수값은 agents 122, applications 55, database 50, overviews 18, evaluations 13, etc 12, llms 0, physical-ai 0이다.

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
