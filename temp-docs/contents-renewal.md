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
- [ ] A4 Loop engineering (5편, 파일럿 1편 제외): runkle-2026-the-art-of-loop-engineering, movez-2026-loop-engineering-for-trading-agents, lee-jeongmin-2026-loop-engineering-claude-code, kang-2026-no-longer-prompting-claude, luis-carrijo-2026-claude-code-team-just-dropped
- [ ] A5 Claude Code 실전과 담론 (5편): patel-2026-beyond-the-prompt-claude-code, patel-2026-i-taught-myself-claude-code, trq212-2026-a-field-guide-to-fable, thariq-2026-know-your-unknowns, google-2026-the-new-sdlc-with-vibe
- [ ] A6 gstack과 Claude Code 응용 (6편, 신규 wiki 3편): garrytan-gstack, 9bow-2026-gstack-claude-code-virtual-team(신규), gpters-2026-yc-ai-agent-guide-gstack(신규), hada-2026-gstack-virtual-engineering-team(신규), donchitos-claude-code-game-studios, madslorentzen-ai-job-search
- [ ] A7 Headroom 컨텍스트 압축 (6편): headroomlabs-ai-headroom, tosea-2026-how-to-use-headroom-context, subratpati-2026-building-cost-efficient-agents-with, nedai-2026-headroom-token-compression-guide, 9bow-2026-headroom-ai-agent-context-compression, yongkyun-2026-cutting-llm-token-costs-with
- [ ] A8 Context engineering과 토큰 경제 (4편): anthropic-2025-effective-context-engineering-for-ai, zhang-2026-recursive-language-models, bai-2026-how-do-ai-agents-spend, bytebytego-2026-how-openai-built-its-data
- [ ] A9 에이전트 메모리 (5편): rasmussen-2025-zep-a-temporal-knowledge-graph, getzep-graphiti, zhou-2026-are-we-ready-for-an, qiao-2026-memory-intelligence-agent, zou-2026-task-focused-memorization-multimodal-agents
- [ ] A10 멀티에이전트와 자동 집필 (4편, 파일럿 1편 제외): lee-2026-the-agent-loop-a-survey, dennis-2026-compiling-agentic-workflows-into-llm, shao-2024-assisting-in-writing-wikipedia-like-articles(40,000자 재추출 보강 동반), stanford-oval-storm
- [ ] A11 CUA와 브라우저 에이전트 (5편): wang-2026-cua-gym-scaling-verifiable-training-environments, xlang-ai-cua-gym, xlangai-cua-gym-dataset, browser-use-browser-use, browser-use-browsercode
- [ ] A12 에이전트 인프라와 컨텍스트 자산 (6편): rodrigues-2026-mcp-server-architecture-patterns, block-buzz, stablyai-orca, google-labs-code-design-md, hall-2026-atlassians-design-md-is-here, theaxlabs-2026-company-brain-prompt-guide
- [ ] A13 세션 중 편입분 (1편): magnitudedev-magnitude (압축비 1.05로 기준 미달. mattpocock-skills는 1.33에 표 15개로 기준 안이라 제외하고 index.md 항목 점검만 한다)
- [ ] A-완료. index.md Agents 절 축소(66항목, 200자 이내, 구분자 `]]: ` 통일), `--category agents` lint 0건, physical-ai 회귀 확인, 카테고리 완료 계량 기록

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
