# 용어집 4차 갱신 등재 후보 (Phase 7-1 계량 단계)

작성일: 2026-09-17. `temp-docs/contents-renewal.md` Phase 7-1(용어집 4차 일괄 갱신)의 계량 단계 산출물이다. Phase 1~6 배치 기록에 "용어집 등재 후보 N건 누적 (Phase 7-1 소관)" 꼴로 흩어진 39개 줄에서 후보를 전부 뽑아 정규화하고, `temp-docs/glossary-3rd-candidates.md`(이하 3차 문서)가 확립한 방법으로 빈도를 실측했다. 3차 6-2절이 이관한 `query`와 `rollout`, 6-1절이 "배치 진행 중 재검토"로 남긴 보류 6건(baseline, modality, corpus, indexing, sandbox, knowledge graph)도 재계량했다.

후보 풀 규모는 다음과 같다.

| 항목 | 값 |
|---|---|
| 후보 줄 | 39줄 (파일럿 1-1, 1-2, 1-3, 1-6과 배치 A1~A12, B1~B7, D1~D5, L1~L3, E1~E2, Phase 5 종합, 6-1~6-3) |
| 고유 후보 | 428종 (중복 병합 후. 기존 행 점검 항목 7건과 3차 보류 재계량 2건 포함) |
| 계량한 한글 표기 후보 | 1,000여 종 (후보당 1~7종) |
| 2절 표에 올린 후보 | 73종 (등재 권고 31, 방향 결정 17, 보류 5, 지침만 13, 기존 행 보강과 조치 불요 7) |
| 3차에서 기각 확정이라 재조사하지 않은 후보 | checkpoint, adapter, 툴(tool result의 "툴 결과"), 멀티모달(multimodal RAG), 캐시(KV cache), 추적(tracing, state tracking), 분할(chunking의 번역어) |

**승인 결과와 실행 내역은 8절에 기록한다.** 2절 표의 `권고` 열은 승인 전 조사 결과 그대로 둔다.

## 1. 측정 방법

3차 문서 1절의 방법을 그대로 승계한다.

- 대상은 `scripts/lint_terms.py`의 `collect_targets`와 같다. `sources/*.md`, `wiki/**/*.md`, `index.md`에서 용어집 3편을 뺀 문서다.
- 라인 선별도 lint와 같다. frontmatter, 코드 펜스, 인라인 코드, wikilink, URL, 라틴 괄호 병기를 `lint_terms.mask`로 마스킹하고, `lint_terms: false` 파일과 `lint-terms: ignore` 줄, `off/on` 블록을 제외했다.
- **직역 출현**과 **등재 시 신규 위반**은 한글 표기를 리터럴 부분 문자열로 찾아 라인당 1건으로 센 값이다. `lint_file`에 합성 용어집을 넘겨 얻은 값과 대조해 8개 표기(롤아웃, 지식 그래프, 모달리티, 코퍼스, 질의, 디노이징, 오토인코더, physical-ai 범위 롤아웃)에서 건수와 파일 수가 정확히 일치함을 확인했다.
- **physical-ai 영향**은 신규 위반 중 `wiki/physical-ai/` 경로와 frontmatter가 `category: physical-ai`인 sources를 합한 값이다.
- **오탐 위험**은 매치를 품은 최대 한글 어절을 뽑아 매치가 어절 첫머리가 아닌 경우를 센 값이다. 조사 결합형과 접두사 파생형(재인덱싱, 재색인)은 오탐이 아니다.

이번 조사에서 달라진 점은 다음 네 가지다.

1. **스냅샷 기준.** 조사 중 다른 세션이 physical-ai 자료(Gemini Robotics, OmniVLA, GR-3 등)를 ingest하고 있어 대상 파일 수가 실행마다 바뀌었다(505, 508, 509). 내부 일관성을 위해 커밋된 HEAD `35034c9`(2026-09-17 21:16)를 `git archive`로 떠서 그 위에서 쟀다. 대상은 505개 문서, 130,155개 검사 라인이다. 3차 문서 시점(438개)보다 67개 늘었다. 실행 단계는 같은 스크립트를 live 저장소에 다시 실행해 재측정한다.
2. **원어 출현은 단어 경계 정규식으로 셌다.** `query`가 `querying`이나 `subquery`에 걸리지 않도록 앞뒤가 영숫자가 아닌 위치만 세고, 공백과 하이픈은 서로 바꿔 쓸 수 있게 했다(`sub-agent`, `subagent`). 마스킹은 한글 표기와 같은 규칙을 적용했으므로 "시연 데이터(demonstration)" 꼴 괄호 병기는 원어 출현에서 빠진다. 즉 원어 출현은 원어를 주 표기로 쓴 라인 수다.
3. **도메인 배정은 `applies_to`를 확인한 뒤 정했다.** glossary-agents와 glossary-llms는 8개 전 카테고리에 적용되지만 **glossary-physical-ai는 `physical-ai`, `overviews`, `etc` 세 카테고리에만 적용된다.** 따라서 physical-ai 용어집에 넣은 금지 표기는 llms, agents, database 파일을 잡지 않는다. 이 문서의 도메인 열은 그 사실을 반영해, 전 카테고리에서 잡아야 하는 용어는 agents나 llms 용어집으로 배정했다. database와 evaluations, applications 도메인은 별도 용어집이 없어 retrieval과 reranking 행이 있는 glossary-agents에 배정했다.
4. **스크립트를 남겼다.** 스크래치 `measure_lib.py`(공통 라이브러리), `candidates.py`(후보 풀 428종), `measure.py`(전수 계량, `results.json`과 `results.tsv` 생성), `detail.py`(철자 분열, 카테고리 분포, 문맥 샘플), `tally.py`(등재 권고 합계와 선택지 비용). `AIWIKI_ROOT` 환경 변수로 스냅샷과 live 저장소를 바꿔 실행한다.

## 2. 후보 표

직역 출현과 원어 출현은 라인 수 / 파일 수다. 금지 표기 후보가 둘 이상이면 각각 적었고, 용어집 셀에 옮길 때는 규약대로 `·`로 잇는다. 등재 시 신규 위반은 도메인 열의 용어집에 넣었을 때 lint가 새로 보고할 건수다.

### 2-1. 등재 권고 (신규 행 27, 기존 행 보강 1, 3절 방향 확정 전제 3)

| # | 원어 | 제안 canonical | 금지 표기 후보 | 직역 출현 | 원어 출현 | 등재 시 신규 위반 | physical-ai 영향 | 오탐 위험 | 도메인 | 권고 |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | trace | trace | 트레이스 | 10 / 7 | 272 / 39 | 10건 / 7파일 | 0건 | 없음 | agents | **등재.** 원어가 27대 1이다. 기존 `trajectory` 행(세션 실행 기록 전체)과 역할이 겹치므로 비고에 "trace는 실행 기록의 개별 이벤트 열, trajectory는 세션 단위"로 관계를 적는다. `tracing`도 원어 지침으로 같은 행에 두되, "트레이싱" 17건 / 6파일은 원어 25건과 1.5대 1이고 "레이트레이싱" 2건이 부분 문자열로 걸려 금지 표기에서 뺀다 |
| 2 | artifact | artifact | 아티팩트 | 21 / 6 | 81 / 17 | 21건 / 6파일 | 0건 | 없음 ("산출물" 408건은 일반어라 후보에서 제외) | agents | **등재.** 원어가 4대 1이고 6개 파일에 몰려 있다 |
| 3 | worktree | worktree | 작업 트리, 워크트리 | 작업 트리 6 / 4, 워크트리 0 | 95 / 28 | 6건 / 4파일 | 0건 | 없음 | agents | **등재.** 원어가 16대 1이다. 워크트리는 0건이지만 음차 재발 방지용으로 함께 넣는다 |
| 4 | prompt injection | prompt injection | 프롬프트 주입, 프롬프트 인젝션 | 6 / 5, 1 / 1 | 58 / 17 | 7건 / 6파일 | 0건 | 없음 | llms | **등재.** A3, L3, E2 세 배치가 올렸다. jailbreak 지침 행(54번)과 짝으로 둔다 |
| 5 | eval | eval | 이밸 | 4 / 2 | 235 / 44 | 4건 / 2파일 | 0건 | 없음 | agents | **등재.** kim-2026 한 편이 "이밸"로 소개한 음차다. 일반 서술 "평가"는 허용한다는 지침을 비고에 둔다 |
| 6 | hybrid search | hybrid search | 하이브리드 검색 | 25 / 9 | 88 / 25 | 25건 / 9파일 | 0건 | 없음 | agents | **등재.** 반쪽 번역이고 원어가 3.5대 1이다. hybrid retrieval도 같은 행에서 원어로 둔다 |
| 7 | vector database | vector database | 벡터 데이터베이스, 벡터 DB | 22 / 8, 12 / 4 | 97 / 30 (vector database 35, vector DB 40) | 34건 / 11파일 | 0건 | 없음 | agents | **등재.** B7 실측(벡터 DB 8, vector database 5, 벡터 데이터베이스 1)보다 커졌다. 영문 약칭 vector DB는 허용을 비고에 적는다 |
| 8 | chunk / chunking | chunk / chunking | 청크, 청킹 | 100 / 29, 20 / 8 | chunk 694 / 134, chunking 227 / 70 | 120건 / 33파일 | 1건 (wiki 1) | 없음 | agents | **등재 (대량, 사용자 확인).** 파일럿 1-3부터 7개 배치가 올린 후보이고 원어가 7대 1이다. 위반 120건이 이번 후보 중 두 번째로 크다 |
| 9 | entity | entity | 엔티티 | 172 / 26 | 551 / 59 | 172건 / 26파일 | 0건 | 없음 ("개체"는 일반어라 제외) | agents | **등재 (최대 비용, 사용자 확인).** 원어가 3.2대 1이고 zep(65건), graphiti(22건), rag-anything(25건)에 집중돼 있다. 이번 후보 중 위반이 가장 크다 |
| 10 | community (GraphRAG) | community | 커뮤니티 감지, 커뮤니티 탐지, 커뮤니티 요약 | 15 / 2, 3 / 3, 8 / 5 | community 394 / 58, community detection 41 / 14, community report와 summary 106 / 17 | 26건 / 9파일 | 0건 | 없음 (단독 "커뮤니티" 315건 / 131파일은 오픈소스 커뮤니티 등 일반어라 복합어만 금지) | agents | **등재.** 감지와 탐지 두 번역이 경합하는 전형적 흔들림이다. 단독형은 지침만 |
| 11 | multi-hop | multi-hop | 다중 홉, 멀티홉 | 22 / 4, 8 / 4 | 68 / 29 | 30건 / 8파일 | 0건 | 없음 | agents | **등재.** 두 한글 표기가 파일별로 갈려 있고 원어가 2.3대 1이다 |
| 12 | top-k | top-k | 상위 k, 상위 K | 15 / 11, 2 / 2 | 58 / 26 | 17건 / 13파일 | 1건 (wiki 1) | 없음 | agents | **등재.** 반쪽 번역이다. 원어가 3.4대 1 |
| 13 | LLM-as-a-Judge | LLM-as-a-Judge | LLM 평가자, LLM 심판, VLM 심판, LM 심판 | 2 / 2, 0, 4 / 2, 4 / 2 | 64 / 29 | 10건 / 4파일 | 0건 | 없음 | agents | **등재.** VLM-as-a-Judge와 LM judge를 같은 행의 변형으로 묶는다. 영문 철자 통일(LLM-as-judge 25, LLM-as-a-Judge 24, LLM-as-a-judge 15)은 3절 18번 |
| 14 | codebook | codebook | 코드북 | 31 / 6 | 149 / 17 | 31건 / 6파일 | 0건 | 없음 | llms | **등재.** 원어가 4.8대 1이고 turbovec 계열 3편과 rombach에 몰려 있다. codebook collapse도 원어 |
| 15 | autoencoder | autoencoder | 오토인코더 | 11 / 3 | 50 / 11 | 11건 / 3파일 | 1건 (sources 1) | 없음 | llms | **등재.** L1 배치 안에서 mentzer(오토인코더)와 rombach(autoencoder)가 갈린 사례다 |
| 16 | diffusion model | diffusion model | 확산 모델, 디퓨전 모델 | 6 / 3, 0 | 84 / 11 | 6건 / 3파일 | 6건 (sources 5, wiki 1) | 없음 ("확산" 단독은 일반어라 복합어만) | llms | **등재.** 원어가 14대 1이다. 위반 전량이 physical-ai 3편이지만 6줄이라 감당 가능하다 |
| 17 | denoising | denoising | 디노이징 | 19 / 3 | 89 / 39 | 19건 / 3파일 | 19건 (wiki 15, sources 4) | 없음 | llms | **등재.** 원어가 4.7대 1이다. 위반 19건이 전부 physical-ai(reuss-2026 두 파일, 9bow WAM)라 rework가 필요하다. "잡음 제거"와 "노이즈 제거"는 일반 서술로 허용 |
| 18 | ablation | ablation | 어블레이션, 애블레이션, 절제 실험 | 9 / 2, 0, 1 / 1 | 391 / 148 | 10건 / 3파일 | 1건 (sources 1) | 없음 | llms | **등재.** CLAUDE.md 언어 정책이 원어 canonical 예시로 드는 용어인데 어느 용어집에도 없다. 원어 391건 대 음차 9건 |
| 19 | recall | recall | 재현율, 회복률 | 11 / 10, 3 / 1 | 290 / 61 | 14건 / 11파일 | 0건 | 없음 | llms | **등재.** D5가 실제 혼용(회복률)을 겪은 용어다. 원어가 21대 1. 짝인 precision은 "정밀도" 124건 중 62건이 physical-ai의 일반어 용법(제어 정밀도 등)이라 지침만 둔다(56번) |
| 20 | hidden state | hidden state | 은닉 상태 | 2 / 2 | 56 / 12 | 2건 / 2파일 | 2건 (wiki 1, sources 1) | 없음 | llms | **등재.** 소량이지만 원어가 28대 1로 방향이 명확하고 비용이 2줄이다 |
| 21 | vectorless RAG | vectorless RAG | 벡터리스 | 2 / 2 | 81 / 18 | 2건 / 2파일 | 0건 | 없음 | agents | **등재.** D3가 재작성 중 실제 혼용을 겪어 우선순위를 높게 매긴 용어다. 잔존 2줄 |
| 22 | design token | design token | 디자인 토큰 | 1 / 1 | 27 / 5 | 1건 / 1파일 | 0건 | 없음 | agents | **등재.** 금지 표기 비용은 1줄이고 행의 가치는 규약 명시에 있다. 6-2가 발견한 "두 커버 페이지 규약 반대"(hall은 원어, google-labs는 "토큰"으로 줄이고 LLM 토큰을 "컨텍스트 토큰"으로 구분)를 비고로 정리한다. 3절 20번 |
| 23 | cache read / cache write | cache read / cache write | 캐시 읽기, 캐시 쓰기 | 3 / 3, 3 / 2 | 30 / 5, 22 / 5 | 6건 / 3파일 | 0건 | 없음 | llms | **등재.** API 필드명 `cache_read`는 코드 스팬으로 쓴다는 지침을 비고에 둔다. prompt caching은 지침 행(64번)으로 함께 둔다 |
| 24 | primitive (소프트웨어) | primitive | 프리미티브 | 4 / 2 | 216 / 60 | 4건 / 2파일 | 0건 | 없음 | agents | **등재.** physical-ai 용어집의 primitive 행(motion primitive, 금지 원시 동작과 기본 동작)은 llms와 agents 파일에 적용되지 않는다. 소프트웨어 primitive용 행을 agents에 둔다 |
| 25 | provider | provider | 프로바이더 | 76 / 7 | 298 / 42 | 76건 / 7파일 | 0건 | 없음 ("제공자" 107건 / 35파일과 "공급자" 27건은 일반어라 지침) | agents | **등재 (대량, 사용자 확인).** cheahjs(57건)와 zhulinsen(14건) 두 stem에 집중돼 있다. inference provider는 같은 행의 비고로 원어 권장(44번) |
| 26 | rollout | rollout | 롤아웃 | 18 / 9 | 523 / 76 | 18건 / 9파일 (physical-ai 용어집에만 넣으면 13건 / 7파일) | 13건 (wiki 3, sources 10) | 없음 | llms (physical-ai 행은 지침 유지) | **등재.** 3차 이관분. 3차 계량(14건 / 8파일)에서 agents 카테고리 bytebytego 5건이 늘었다. physical-ai 용어집은 `applies_to` 밖이라 이 5건을 못 잡으므로 배치는 3절 24번 |
| 27 | pairwise | pairwise | 페어와이즈, 쌍대 비교 | 8 / 3, 8 / 2 | 41 / 18 | 16건 / 5파일 | 0건 | 없음 ("쌍별" 7건 / 7파일은 자연스러운 번역이고 physical-ai 4건이라 지침) | llms | **등재.** 6-1 실측(21대 7)을 확인했다. dennis-2026의 "쌍대 비교"는 pairwise comparison의 오역이라(쌍대는 duality) 단독 "쌍대"가 아니라 "쌍대 비교"만 금지한다 |
| 28 | skill (기존 행 보강) | 스킬 (단독), skill library 등 복합어는 원어 | 스킬 라이브러리, 스킬 팩 | 12 / 6, 15 / 12 | skill library 80 / 14, skill pack 31 / 10 | 27건 / 18파일 | 4건 (wiki 2, sources 2) | 없음 | agents | **기존 행 보강.** A2가 정한 복합어 예외(단독 스킬은 음차, skill library와 skill composition과 skill sequence와 skill pack은 원어)를 비고에 명문화하고 금지 표기 칸을 채운다. A10이 lee-2026을 정리한 뒤에도 rahman, roboclaw, lin에 12건이 남았다. 예문 "에이전트에 얹는 지침 패키지다"의 금지 동사 "얹다"를 "에이전트에 결합하는"으로 고친다 |
| 29 | comprehension debt | 3절 11번 | 이해 부채 | 7 / 4 | 10 / 5 | 7건 / 4파일 | 0건 | 없음 | agents | **방향 확정 후 등재.** 데이터는 원어 쪽(10대 7). 3절 11번 |
| 30 | software factory | 3절 9번 | 소프트웨어 팩토리 | 10 / 5 | 13 / 7 | 10건 / 5파일 | 0건 | 없음 | agents | **방향 확정 후 등재.** 6-3 실측(13대 11)과 같다. 3절 9번 |
| 31 | compounding | 3절 12번 | 복리 | 20 / 6 (누적되는 메모리 5 / 2 별도) | 36 / 12 (compounding error 54건 제외) | 20건 / 6파일 | 0건 | 없음 | agents | **방향 확정 후 등재.** CLAUDE.md의 "지식 복리"와 문체 가이드의 "복리로 쌓인다" 회피 지시가 충돌한다. 3절 12번 |

### 2-2. 방향 결정 필요 (3절에서 선택지와 비용을 적는다)

| # | 원어 | 제안 canonical | 금지 표기 후보 | 직역 출현 | 원어 출현 | 등재 시 신규 위반 | physical-ai 영향 | 오탐 위험 | 도메인 | 권고 |
|---|---|---|---|---|---|---|---|---|---|---|
| 32 | query | 미정 | 쿼리 (또는 질의와 쿼리) | 질의 1,071 / 199 (예외 3항 적용 시 1,025 / 175), 쿼리 203 / 55 | 435 / 94 | 쿼리만 203건 / 55파일. 둘 다 1,228건 / 192파일 | 질의 68건, 쿼리 0건 | **질의 높음.** 품질의 43건, 성질의 4건, 물질의 1건이 부분 문자열로 걸린다. 별개 개념 질의응답 52건 / 40파일도 걸린다. 쿼리는 충돌 0 | agents (database) | **방향 결정.** 3차 계량(질의 220, 쿼리 123, 원어 278)에서 질의가 4.9배로 늘어 저장소 다수 표기가 됐다. 3절 1번 |
| 33 | knowledge graph | 미정 | 지식 그래프, 지식그래프 | 164 / 37, 2 / 2 | 231 / 57 | 166건 / 39파일 | 0건 | 없음 | agents (database) | **방향 결정.** 3차(28대 79)에서 한글이 5.9배 늘어 1.4대 1로 좁혀졌다. 3절 2번 |
| 34 | indexing / index | 미정 | 색인 (또는 인덱싱과 인덱스) | 인덱싱 223 / 60, 색인 166 / 61, 인덱스 473 / 121 | indexing 192 / 74, index 137 / 62 | 색인 금지 시 164건 / 59파일 (예외 "검색인" 적용) | 14건 | 색인은 "검색인지" 2건이 걸려 예외 1항 필요. 재색인 1건과 재인덱싱 9건은 파생형이라 진짜 위반 | agents (database) | **방향 결정.** 인덱스는 음차가 3.5대 1로 정착했고 인덱싱과 색인은 대등하다. 3절 3번 |
| 35 | sandbox | 샌드박스 (음차) 권고 | (없음) | 57 / 24 | 40 / 25 | 원어 canonical 선택 시 57건 / 24파일 | 0건 | 없음 | agents | **방향 결정.** 3차(25대 26)에서 음차가 앞섰다. 3절 4번 |
| 36 | baseline | 미정 | 베이스라인, 기준선 | 74 / 28, 181 / 91 | 531 / 127 | 둘 다 255건 / 115파일. 베이스라인만 74건 / 28파일 | 둘 다 118건, 베이스라인만 47건 | 없음 | llms | **방향 결정.** 원어가 2대 1로 우세하나 physical-ai rework가 크다. 3절 5번 |
| 37 | modality | 미정 | 모달리티 | 125 / 29 | 155 / 39 | 125건 / 29파일 | 50건 | 없음 | llms | **방향 결정.** 3차(48대 147)에서 음차가 2.6배 늘어 1.2대 1이 됐다. 3절 6번 |
| 38 | corpus | 코퍼스 (음차) 권고 | (없음) | 346 / 88 | 226 / 41 | 원어 canonical 선택 시 346건 / 88파일 | 30건 | 없음 | llms | **방향 결정.** 3차(98대 161)에서 방향이 뒤집혔다. 3절 7번 |
| 39 | slash command | 미정 | 슬래시 명령어와 슬래시 명령 (또는 슬래시 커맨드) | 슬래시 커맨드 70 / 19, 슬래시 명령어 36 / 13, 슬래시 명령(단독) 15 / 13 | 0 | 커맨드 canonical이면 51건 / 26파일, 명령어 canonical이면 70건 / 19파일 | 0건 | 없음 | agents | **방향 결정.** 원어를 쓰는 파일이 없고 두 한글 표기가 파일 집합을 나눠 갖는다(겹치는 파일은 index.md뿐). 3절 8번 |
| 40 | counterfactual | 미정 | 반사실 | 13 / 9 (반사실적 1 포함) | 12 / 5 | 13건 / 9파일 | 6건 (wiki 4, sources 2) | 없음 | agents | **방향 결정.** 정확히 반반이다. 3절 10번 |
| 41 | source of truth | 미정 | 진실의 원천, 진실 원천, 진실 공급원 | 12 / 8, 9 / 8, 7 / 2 (단일 진실 원천 2, 단일 진실 공급원 7 포함) | 33 / 15 (SSOT 포함) | 셋 다 28건 / 18파일. 변형만(진실 원천, 진실 공급원) 16건 / 10파일 | 2건 | 없음 | agents (applications) | **방향 결정.** CLAUDE.md 자체가 "진실의 원천(source of truth)" 병기를 쓴다. 3절 13번 |
| 42 | audit trail | 감사 추적 (번역어) 권고 | (없음) | 감사 추적 22 / 8, 감사 기록 16 / 15, 감사 로그 31 / 12 | 6 / 2 (audit log 8 / 4 별도) | 원어 canonical 선택 시 22건 / 8파일 | 0건 | 없음 | agents | **방향 결정.** A12 실측(9대 9)에서 번역어가 3.7대 1로 앞섰다. 3절 14번 |
| 43 | orphan page | 미정 | 고아 페이지 | 13 / 4 | 8 / 4 | 13건 / 4파일 | 0건 | 없음 | agents (applications) | **방향 결정.** B3가 한글 제안과 원어 제안으로 갈린 항목이다. 3절 15번 |
| 44 | inference provider | inference provider | (없음) | 추론 제공자 10 / 2 | 17 / 4 | 해당 없음 | 0건 | "제공자" 일반어 | agents | **지침만.** B6 권고대로 provider 행(25번) 비고에 원어 권장을 적는다. 추론 제공자 10건은 9bow-2026-openwiki 한 stem이다 |
| 45 | telemetry | 텔레메트리 (음차) 권고 | (없음) | 48 / 23 | 7 / 5 | 원어 canonical 선택 시 48건 / 23파일 | 0건 | 없음 | agents | **방향 결정.** 6-3의 우려대로 원어 51건 중 산문은 7건뿐이고 나머지는 코드 식별자와 URL이었다. 3절 16번 |
| 46 | LLM-as-a-Judge 영문 철자 | 미정 | LLM-as-judge, LLM-as-a-judge (영문 리터럴) | (영문) LLM-as-judge 25 / 14, LLM-as-a-judge 15 / 9 | LLM-as-a-Judge 24 / 7 | 두 변형 금지 시 40건 / 23파일 | 0건 | 없음 (frontmatter 태그 `llm-as-judge`는 검사 밖) | agents | **방향 결정.** 세 철자가 대등하다. 3절 18번 |
| 47 | GraphRAG 영문 철자 | GraphRAG (Microsoft 시스템), graph-based RAG (일반 범주) | (없음) | 그래프 기반 RAG 14 / 7, 그래프 RAG 4 / 2 | GraphRAG 347 / 45, Graph RAG 51 / 7, graph-based RAG 11 / 6 | 해당 없음 | 0건 | 의미 분기 (graph-based RAG는 고유명이 아니라 범주) | agents (database) | **지침만.** B7이 표기 분열로 본 세 형태 중 graph-based RAG는 다른 개념이다. Graph RAG 51건은 alex-xu 등 7파일인데 원문 제목 인용이 섞여 있어 금지보다 지침이 맞다. 3절 19번 |
| 48 | instruction file | 미정 | 지시문 파일, 지침 파일 (canonical 지시 파일) | 지시 파일 30 / 7, 지시문 파일 9 / 7, 지침 파일 5 / 2 | 0 | 14건 / 9파일 | 0건 | 없음 | agents | **방향 결정.** 원어 0건이라 한글 canonical이 맞다. 세 표기 중 어느 것인지가 남는다. 3절 21번 |

### 2-3. 보류

| # | 원어 | 제안 canonical | 금지 표기 후보 | 직역 출현 | 원어 출현 | 등재 시 신규 위반 | physical-ai 영향 | 오탐 위험 | 도메인 | 권고 |
|---|---|---|---|---|---|---|---|---|---|---|
| 49 | fallback | fallback | 폴백 | 45 / 25 (대체 경로 10 / 9 별도) | 87 / 23 | 45건 / 25파일 | 11건 (suzuki-2026 두 파일 10건) | 없음 | agents | **보류.** 원어가 2대 1이지만 25개 파일에 흩어져 있고 physical-ai 11건이다. 음차가 한국어 개발 문서에서 정착한 편이라 3차 corpus와 같은 판단 |
| 50 | headless | headless | 헤드리스 | 23 / 10 | 39 / 23 | 23건 / 10파일 | 7건 (wiki 3, sources 4) | 없음 | agents | **보류.** E1이 금지를 제안했으나 1.7대 1이고 physical-ai 7건이 시뮬레이터 headless 모드 문맥이다 |
| 51 | topology | topology | 토폴로지 | 16 / 6 | 32 / 8 | 16건 / 6파일 | 0건 | 없음 | agents | **보류.** 2대 1로 결정적이지 않다. 비용은 낮아 사용자가 원하면 등재 가능 |
| 52 | rubric | rubric | 루브릭 | 19 / 6 | 37 / 14 | 19건 / 6파일 | 0건 | 없음 | agents (evaluations) | **보류.** 2대 1이고 음차가 교육 분야에서 정착한 표기다 |
| 53 | contrastive learning | contrastive learning | 대조 학습, 대조학습 | 6 / 5, 5 / 2 | 22 / 6 | 11건 / 7파일 | 8건 | 없음 | llms | **보류.** 원어 2대 1이지만 위반의 73%가 physical-ai다. D4 실측(원어 8파일 대 대조 학습 5파일)과 같다 |

### 2-4. 지침만 (금지 표기 없이 원어 유지 또는 canonical 확정 행)

| # | 원어 | 제안 canonical | 금지 표기 후보 | 직역 출현 | 원어 출현 | 등재 시 신규 위반 | physical-ai 영향 | 오탐 위험 | 도메인 | 권고 |
|---|---|---|---|---|---|---|---|---|---|---|
| 54 | RLVR | RLVR | (없음) | 검증 가능한 보상 0 | 38 / 15 | 해당 없음 | 0 | 해당 없음 | llms | **지침만.** A11 제안대로 RLHF 행 아래에 약어 그대로 행을 둔다. 한글 표기가 0건이라 금지 표기는 비운다 |
| 55 | MCP | MCP | (없음) | 모델 컨텍스트 프로토콜 0 | 789 / 116 | 해당 없음 | 0 | 해당 없음 | agents | **지침만.** B1이 "두 용어집 모두 미등재"로 지적했다. 저장소 최다 출현 약어라 행 자체는 필요하다 |
| 56 | precision | precision | (없음) | 정밀도 124 / 72 | 129 / 43 | (등재 시 124건) | 62건 | **높음.** physical-ai 62건이 제어 정밀도, timestamp 정밀도 같은 일반어 용법이다 | llms | **지침만.** A9의 grep 확인 요구를 이행했다. recall 행(19번) 비고에 "precision은 원어 권장, 정밀도는 일반어 용법 때문에 검사 없음"으로 적는다 |
| 57 | jailbreak | jailbreak | (없음) | 탈옥 0 | 44 / 8 | 해당 없음 | 0 | 해당 없음 | llms | **지침만.** prompt injection 행과 짝 |
| 58 | classifier-free guidance | classifier-free guidance | (없음) | 0 | 84 / 18 | 해당 없음 | 0 | 해당 없음 | llms | **지침만.** 약어 CFG 병용. L1 반복 등장 용어 |
| 59 | zero-shot | zero-shot | (없음) | 제로샷 2 / 1 | 207 / 76 | 해당 없음 | 2 | 해당 없음 | llms | **지침만.** 원어 정착 |
| 60 | reasoning trace | reasoning trace | (없음) | 추론 흔적 3 / 3, 추론 기록 10 / 2 | 44 / 5 | 해당 없음 | 2 | "추론 기록"은 일반 서술 | llms | **지침만.** L3 제안대로 복합어 원어 유지. reasoning 행(canonical 추론)과 충돌하지 않도록 "복합어는 원어"를 그 행 비고에도 적는다 |
| 61 | taxonomy | taxonomy | (없음) | 분류 체계 18 / 15, 분류체계 17 / 3 | 83 / 29 | (등재 시 35건) | 10 | **중간.** "분류 체계"는 일반 서술로도 쓰인다 | agents | **지침만.** 1-1과 A9가 올렸다. 논문 자체의 taxonomy를 가리킬 때 원어 권장 |
| 62 | verifier, verifier gate | verifier | (없음) | 검증기 6 / 6, 검증자 9 / 3, 검증 게이트 13 / 6 | 69 / 17, 28 / 4 | (등재 시 28건) | 2 | "검증자"는 사람 검증자와 겹친다 | agents | **지침만.** verification 행이 "검증" 병용을 허용하므로 같은 계열로 둔다 |
| 63 | provenance | provenance | (없음) | 출처 추적 13 / 8 | 66 / 20 | (등재 시 13건) | 3 | "출처"와 "계보"(296건)는 일반어 | agents | **지침만.** 네 배치(A2, A9, B5, E2)가 올렸다. 원어 권장, 일반 서술 "출처"는 허용 |
| 64 | prompt caching | prompt caching | (없음) | 프롬프트 캐싱 7 / 4, 프롬프트 캐시 2 / 2 | 8 / 5 | (등재 시 9건) | 0 | 없음 | llms | **지침만.** 대등해 방향이 없다. cache read 행(23번)과 묶어 "API 기능명은 원어" 지침 |
| 65 | manifest | 매니페스트 (음차) | (없음) | 53 / 26 | 19 / 10 | 해당 없음 | 2 | 없음 | agents | **지침만.** A2가 한글로 적은 대로 음차가 2.8대 1로 정착했다. 원어를 금지하면 `manifest.json` 같은 산문 언급을 오탐한다 |
| 66 | regression test | 회귀 테스트 (번역어) | (없음) | 36 / 13 | regression test 0 (regression 단독 30 / 14) | 해당 없음 | 0 | 없음 | agents (evaluations) | **조치 불요.** E2의 한글 canonical 제안이 이미 저장소 표기와 같다. 행을 두려면 지침만 |

### 2-5. 기존 행 보강과 조치 불요

| # | 원어 | 제안 canonical | 금지 표기 후보 | 직역 출현 | 원어 출현 | 등재 시 신규 위반 | physical-ai 영향 | 오탐 위험 | 도메인 | 권고 |
|---|---|---|---|---|---|---|---|---|---|---|
| 67 | flow matching | flow matching | (기존) 플로우 매칭, 흐름 정합 | 0 | 384 / 90 | 해당 없음 | 0 | 해당 없음 | physical-ai (llms 이관 검토) | **기존 행 정리.** glossary-physical-ai 70행과 114행에 같은 원어 행이 두 개 있고 금지 표기 순서와 예문이 다르다. 하나로 합친다. L1(llms) 파일은 `applies_to` 밖이지만 한글 표기가 0건이라 llms로 옮겨도 비용이 없다 |
| 68 | sub-agent | 서브에이전트 (기존) | (기존) 하위 에이전트 | 서브에이전트 267 / 63, 하위 에이전트 0 | sub-agent 4 / 4, subagent 16 / 9 | 해당 없음 | 0 | 원어 잔존 20건은 Osmani의 구성 요소명 "Sub-agents", 저장소명 awesome-claude-code-subagents, gbrain의 durable subagent 기능명 | agents | **기존 행 보강 (비고만).** A4가 본 "wiki/agents 원어 45 대 서브에이전트 30"은 배치 후 267 대 20으로 canonical이 정착했다. 남은 원어는 고유명이라 금지 표기에 넣지 않는다 |
| 69 | memory 복합어 | 메모리 (단독), episodic memory 등 복합어 원어 | (기존 episodic memory 행에 일화 기억) | 작업 기억 2 / 2, 절차 기억 2 / 2 | 127 / 26 | 해당 없음 | 0 | 없음 | agents | **기존 행 보강 (비고 명문화).** A3가 요구한 skill과 같은 복합어 방침을 memory 행 비고에 적는다. 위반은 이미 0에 가깝다 |
| 70 | trajectory (agents) | trajectory | (없음) | 궤적 21 / 15 (physical-ai 밖) | 948 / 159 | (등재 시 21건) | 0 | **높음.** 잔존 21건은 입자 궤적(lipman), 공의 궤적(luis-carrijo), 손실 곡선의 궤적(zou) 같은 일반어 | agents | **지침 유지.** A8이 보강 후보로 올렸으나 잔존이 일반어라 3차 판단이 그대로 맞다 |
| 71 | coverage | coverage | (없음) | 해당 없음 | 해당 없음 | 해당 없음 | 0 | 해당 없음 | agents | **비고 보강.** D3 지적대로 li-2026의 retrieval coverage 문맥을 비고에 추가한다 |
| 72 | tool use | tool use (기존) | (기존) 도구 사용 | 도구 사용 0 (ignore 마커가 붙은 줄도 0) | 89 / 48 | 해당 없음 | 0 | A7이 보고한 "Read 도구 사용이 많다" 꼴 오탐은 현재 본문에 없다 | agents | **조치 불요.** 재작성이 표현을 바꿔 해소했다. 지침 전환은 근거 데이터가 없어 보류 |
| 73 | advantage, test-time training, latent, inverse dynamics, video backbone, meta-harness, attention budget | (기존 행) | (기존) | 전부 0 | advantage 146, test-time training 11, latent 569, inverse dynamics 87 | 해당 없음 | 0 | 해당 없음 | physical-ai, llms | **조치 불요.** 1-6과 A3, A8, A9가 "기존 행이 복합어만 잡는다"거나 "`applies_to` 밖"이라고 우려한 항목인데 실측상 한글 표기가 0건이다. 비디오 백본과 메타 하네스와 어텐션 예산은 3차의 백본과 하네스와 어텐션 금지가 이미 덮는다 |

## 3. 방향 결정 필요 후보 (사용자 질문용)

각 항목에 데이터가 가리키는 방향, 선택지, 비용을 적는다. 비용은 스냅샷 실측이다.

### 3-1. query (32번)

- **데이터.** 질의 1,071건 / 199파일, query 435건 / 94파일, 쿼리 203건 / 55파일. 3차(220, 278, 123)에서 질의가 4.9배로 늘어 저장소 다수 표기가 됐다. Phase 6-1 기록(wiki 808회 대 query 333회)과 같은 방향이다. 카테고리별로는 질의가 database 477, applications 294, agents 153, physical-ai 84이고 쿼리는 database 85, agents 64, applications 43이다. 한 파일 안에서 질의와 쿼리를 함께 쓰는 파일이 40개, 질의와 query를 함께 쓰는 파일이 68개다.
- **선택지 A: canonical 질의(번역어), 금지 쿼리.** 신규 위반 203건 / 55파일, physical-ai 0건. `SUBSTRING_EXCEPTIONS` 추가 불필요(쿼리 충돌 어절 0). 질의응답 52건은 영향 없음. 원어 query와의 문서 내 혼용(68파일)은 lint가 못 잡으므로 "첫 등장 시 원어 병기 후 질의만 쓴다" 지침으로 처리한다.
- **선택지 B: canonical 원어 query, 금지 질의와 쿼리.** 신규 위반 1,228건 / 192파일, physical-ai 68건. `SUBSTRING_EXCEPTIONS`에 품질의, 성질의, 물질의 3항 필수. 별개 개념 질의응답 52건 / 40파일은 예외로 덮이지 않아 "질의응답"을 예외 단어로 추가하거나 QA로 바꿔야 한다.
- **선택지 C: canonical 쿼리(음차).** 질의 금지 비용이 B와 같아 이점이 없다.
- **권고.** A. 비용이 B의 6분의 1이고 physical-ai rework가 0이다. 3차가 "등재하지 않는 편이 낫다"고 본 질의 금지를 피한다.

### 3-2. knowledge graph (33번)

- **데이터.** 원어 231건 / 57파일, 지식 그래프 164건 / 37파일. 1.4대 1로 원어가 근소하게 앞선다. 한글은 database 85, applications 59, overviews 18에 있고 physical-ai 0. B4가 본 두 실측(138대 70, 72대 102)이 갈린 이유는 범위 차이였고, 전 저장소 기준은 원어 우세다.
- **선택지 A: 원어 canonical, 금지 지식 그래프와 지식그래프.** 166건 / 39파일. 전부 완료 카테고리(database, applications, overviews)라 즉시 정리가 필요하다.
- **선택지 B: 지침만.** "지식 그래프"를 표준 번역으로 인정하고 문서당 하나만 쓰도록 지침. 비용 0.
- **권고.** B. B5의 판단("지식 그래프가 일반 서술로 쓰이는 자리가 많다")과 같고, 강화학습을 한글 canonical로 둔 선례가 있다. A를 택하면 이번 후보 중 세 번째로 큰 rework다.

### 3-3. indexing, index (34번)

- **데이터.** 인덱스 473건 / 121파일 대 index 137건(3.5대 1, 음차 정착). 인덱싱 223건 / 60파일, 색인 166건 / 61파일, indexing 192건 / 74파일로 세 표기가 대등하다. 3차(68, 28, 60)에서 인덱싱 3.3배, 색인 5.9배 증가.
- **선택지 A: 음차 canonical(인덱스, 인덱싱), 금지 색인.** 164건 / 59파일, physical-ai 14건. `SUBSTRING_EXCEPTIONS`에 `"색인": ["검색인"]` 1항 필요("검색인지" 2건). 재색인 1건은 파생형이라 진짜 위반.
- **선택지 B: 원어 canonical.** 인덱싱, 인덱스, 색인 금지로 약 860건. 비현실적.
- **선택지 C: 지침만.** 비용 0이지만 인덱싱과 색인의 분열이 계속된다.
- **권고.** A. 인덱스가 이미 음차로 정착했으므로 인덱싱도 음차가 일관된다. rework 164건은 database(73)와 applications(34), agents(34)에 흩어져 있다.

### 3-4. sandbox (35번)

- **데이터.** 샌드박스 57건 / 24파일, 원어 40건 / 25파일. 3차(25대 26)에서 음차가 2.3배 늘었다. physical-ai 0.
- **선택지 A: 음차 canonical 샌드박스, 지침 행.** 비용 0. 원어 40건은 지침으로 정리.
- **선택지 B: 원어 canonical, 금지 샌드박스.** 57건 / 24파일.
- **권고.** A. 정착 방향을 따른다.

### 3-5. baseline (36번)

- **데이터.** 원어 531건 / 127파일, 기준선 181건 / 91파일, 베이스라인 74건 / 28파일. 원어가 한글 합계의 2배다. physical-ai는 원어 174, 기준선 71, 베이스라인 47.
- **선택지 A: 원어 canonical, 금지 기준선과 베이스라인.** 255건 / 115파일, physical-ai 118건. "수평 기준선"(그래프 서술) 같은 일반어 용법이 섞인다.
- **선택지 B: 원어 canonical, 금지 베이스라인만.** 74건 / 28파일, physical-ai 47건. 기준선은 표준 번역으로 허용(지침).
- **선택지 C: 지침만.** 비용 0.
- **권고.** C 또는 B. A는 physical-ai 118건이 이번 등재 권고 전체(48건)의 2.5배다. B도 physical-ai가 63%다.

### 3-6. modality (37번)

- **데이터.** 원어 155건 / 39파일, 모달리티 125건 / 29파일. 3차(147대 48)에서 음차가 2.6배 늘어 1.2대 1. 음차는 database 65(rag-anything 계열 61), physical-ai 50.
- **선택지 A: 원어 canonical, 금지 모달리티.** 125건 / 29파일, physical-ai 50건.
- **선택지 B: 음차 canonical 모달리티, 지침 행.** 비용 0. 원어 155건은 지침으로 정리.
- **선택지 C: 보류 유지.** 세 번째 보류가 되고 그 사이 분열이 커진다(3차 이후 2.6배).
- **권고.** 사용자 결정. 데이터는 방향을 주지 않는다. 배치 재작성(D2)이 음차를 대량으로 쓴 점을 보면 작성자의 자연스러운 선택은 음차다.

### 3-7. corpus (38번)

- **데이터.** 코퍼스 346건 / 88파일, 원어 226건 / 41파일. 3차(98대 161)에서 방향이 뒤집혔다. 음차는 applications 104, agents 104, database 79, physical-ai 30.
- **선택지 A: 음차 canonical 코퍼스, 지침 행.** 비용 0.
- **선택지 B: 원어 canonical, 금지 코퍼스.** 346건 / 88파일, physical-ai 30건.
- **권고.** A. 3차가 "음차도 정착한 편"이라고 본 그대로다. 말뭉치는 0건이라 금지 표기에 넣을 필요가 없다.

### 3-8. slash command (39번)

- **데이터.** 원어 0건. 슬래시 커맨드 70건 / 19파일, 슬래시 명령어 36건 / 13파일, 슬래시 명령(어가 없는 단독형) 15건 / 13파일. 두 표기를 함께 쓰는 파일은 index.md뿐이고, 명령어 계열은 gstack 5편과 i-have-adhd, agricidaniel에, 커맨드 계열은 agent skills와 loop engineering, Claude Code 담론 12편에 있다.
- **선택지 A: canonical 슬래시 커맨드, 금지 슬래시 명령(명령어 포함).** 51건 / 26파일. A6이 garrytan-gstack을 명령어로 통일한 결정을 뒤집는다.
- **선택지 B: canonical 슬래시 명령어, 금지 슬래시 커맨드.** 70건 / 19파일. 단독 "슬래시 명령" 15건은 별도 지침.
- **권고.** A. 다수 표기이고 파일 수도 적다. 다만 A6 결정과 반대이므로 사용자 확인이 필요하다.

### 3-9. software factory (30번)

- **데이터.** 원어 13건 / 7파일, 소프트웨어 팩토리 10건 / 5파일. 전부 gstack 클러스터(4편과 overview 1편)다. 원어 13건 중 8건은 핵심 용어 표나 정의 문장이라 이미 원어를 canonical처럼 쓴다.
- **선택지 A: 원어, 금지 소프트웨어 팩토리.** 10건 / 5파일. **선택지 B: 음차.** 13건 / 7파일.
- **권고.** A. 6-3의 "확산 전에 고정" 취지와 같고 비용이 더 작다.

### 3-10. counterfactual (40번)

- **데이터.** 원어 12건 / 5파일, 반사실 13건 / 9파일. physical-ai가 양쪽 6건씩이다. yongkyun은 "반사실(counterfactual)" 병기를 쓰고 headroom과 nvidia는 원어를 쓴다.
- **선택지 A: 원어, 금지 반사실.** 13건 / 9파일, physical-ai 6건(4파일). **선택지 B: 번역어 반사실, 첫 등장 원어 병기.** 원어 12건을 수동 정리, lint 검사 없음.
- **권고.** B. 반사실은 국내 학술 표기로 정착했고 CLAUDE.md의 번역어 canonical 패턴(첫 등장 병기)에 맞다. A를 택하면 physical-ai 4파일이 rework다.

### 3-11. comprehension debt (29번)

- **데이터.** 원어 10건 / 5파일(osmani, 두 overview), 이해 부채 7건 / 4파일(kang, 두 overview). 두 overview가 양쪽을 다 쓴다.
- **선택지 A: 원어, 금지 이해 부채.** 7건 / 4파일. **선택지 B: 번역어.** 10건 수동 정리.
- **권고.** A. 원저자 osmani의 용어이고 kang은 해설이다.

### 3-12. compounding (31번)

- **데이터.** compounding(compounding error 제외) 36건 / 12파일, 복리 20건 / 6파일, "누적되는 메모리" 5건 / 2파일. CLAUDE.md의 절 제목이 "Knowledge Compounding (지식 복리)"이고, 같은 문서의 문체 가이드는 "복리로 쌓인다"를 문학체 어휘로 지목한다.
- **선택지 A: 원어 compounding, 금지 복리.** 20건 / 6파일. CLAUDE.md는 lint 대상이 아니라 절 제목은 그대로 둘 수 있으나 표기 정합을 위해 함께 고치는 편이 낫다.
- **선택지 B: 지침만.** 비용 0. 문체 가이드와의 충돌은 남는다.
- **권고.** A. 문체 가이드가 이미 복리 표현을 피하라고 했으므로 금지 표기 등재가 가이드와 일치한다.

### 3-13. source of truth (41번)

- **데이터.** 원어 33건 / 15파일(SSOT 포함), 진실의 원천 12건 / 8파일, 진실 원천 9건 / 8파일, 진실 공급원 7건 / 2파일(단일 진실 공급원 포함). CLAUDE.md는 "진실의 원천(source of truth)" 병기를 쓴다.
- **선택지 A: 원어 canonical, 금지 셋 다.** 28건 / 18파일, physical-ai 2건. **선택지 B: 번역어 진실의 원천 canonical(CLAUDE.md 관례), 금지 변형 두 개(진실 원천, 진실 공급원).** 16건 / 10파일, physical-ai 0. 원어 33건은 지침.
- **권고.** B. CLAUDE.md 관례를 따르면서 변형 분열만 막는다.

### 3-14. audit trail (42번)

- **데이터.** 감사 추적 22건 / 8파일, 원어 6건 / 2파일(block-buzz만). 감사 로그 31건과 감사 기록 16건은 audit log(원어 8건)의 번역이라 별개다.
- **권고.** 번역어 감사 추적 canonical, 지침만. A12가 본 9대 9는 이후 배치에서 번역어로 기울었다.

### 3-15. orphan page (43번)

- **데이터.** 고아 페이지 13건 / 4파일(kmyu 합성, agricidaniel), 원어 8건 / 4파일(datasciencedojo, liu). 같은 주제(LLM Wiki 패턴)의 파일이 반씩 갈렸다.
- **선택지 A: 원어, 금지 고아 페이지.** 13건 / 4파일. **선택지 B: 번역어 고아 페이지, 첫 등장 병기.** 8건 수동.
- **권고.** B. Karpathy 원문의 "orphan page"를 옮긴 자연스러운 번역이고 lint 오탐 위험이 없다. 어느 쪽이든 비용은 10건 안팎이다.

### 3-16. telemetry (45번)

- **데이터.** 텔레메트리 48건 / 23파일, 원어 산문 7건 / 5파일. 6-3의 51대 27은 코드 식별자와 URL을 포함한 값이었고 마스킹 후 원어는 7건이다.
- **권고.** 음차 canonical 텔레메트리, 지침 행. 비용 0.

### 3-17. entity, chunk, provider 대량 3행 (9, 8, 25번)

세 행은 방향이 명확하지만 위반이 368건 / 59파일이라 이번 등재 권고 762건의 48%를 차지한다. 등재 권고 나머지 28행은 394건 / 128파일이다. 3차처럼 등재는 하되 정리를 나눠 실행할지, 세 행을 다음 차수로 미룰지 사용자 결정이 필요하다. 세 행 모두 physical-ai 영향은 1건(청크)뿐이다.

### 3-18. LLM-as-a-Judge 영문 철자 (46번)

- **데이터.** LLM-as-judge 25건 / 14파일, LLM-as-a-Judge 24건 / 7파일, LLM-as-a-judge 15건 / 9파일. seans-ai-stories의 frontmatter 태그 `llm-as-judge`는 검사 밖이다.
- **선택지 A: canonical LLM-as-a-Judge(원 논문 Zheng 2023 표기), 금지 영문 리터럴 두 개.** 40건 / 23파일. lint는 영문 리터럴도 부분 문자열로 검사하므로 가능하다(physical-ai 용어집의 demonstration 금지가 선례). **선택지 B: canonical LLM-as-judge.** 39건 / 16파일. **선택지 C: 지침만.**
- **권고.** A 또는 C. 어느 쪽이든 13번 행의 canonical 칸에 철자를 하나로 적는다.

### 3-19. GraphRAG 영문 철자 (47번)

- **데이터.** GraphRAG 347건 / 45파일, Graph RAG 51건 / 7파일, graph-based RAG 11건 / 6파일, 그래프 기반 RAG 14건 / 7파일. graph-based RAG와 그래프 기반 RAG는 Microsoft 시스템이 아니라 범주를 가리킨다.
- **권고.** 지침만. "GraphRAG는 Microsoft 시스템 고유명, 범주는 graph-based RAG"를 비고로 두고 "Graph RAG" 51건은 원문 제목 인용(alex-xu)이 섞여 있어 금지하지 않는다.

### 3-20. design token 규약 (22번)

- **데이터.** 원어 27건 / 5파일, 디자인 토큰 1건. 6-2가 본 규약 반대는 hall(원어 유지)과 google-labs("토큰"으로 줄이고 LLM 쪽을 "컨텍스트 토큰")다.
- **권고.** 원어 design token을 canonical로 두고 "토큰으로 줄이지 않는다, LLM 토큰과 같은 문서에 있으면 design token 전체 표기"를 비고에 적는다. google-labs 페이지는 정리 대상이다(줄인 "토큰" 사례는 lint로 못 잡으므로 수동).

### 3-21. instruction file (48번)

- **데이터.** 원어 0건. 지시 파일 30건 / 7파일(openwiki 3편), 지시문 파일 9건 / 7파일, 지침 파일 5건 / 2파일. physical-ai 용어집의 instruction 행은 canonical이 "지시문"이지만 `applies_to` 밖이라 agents 파일을 구속하지 않는다.
- **선택지 A: canonical 지시 파일(B6 제안, 다수), 금지 지시문 파일과 지침 파일.** 14건 / 9파일. **선택지 B: canonical 지시문 파일(instruction 행과 일관).** 35건 / 9파일.
- **권고.** A. B6이 함께 제안한 "AGENTS.md와 CLAUDE.md는 에이전트 진입 지시 파일" 개념 설명을 같은 행 예문으로 둔다.

### 3-22. rollout 배치 (26번)

- **데이터.** 롤아웃 18건 / 9파일 중 physical-ai 13건 / 7파일, agents(bytebytego) 5건 / 2파일. physical-ai 용어집은 agents 파일에 적용되지 않는다.
- **선택지 A: physical-ai 행에 금지 롤아웃 추가.** 13건 / 7파일, 5건 미검출. **선택지 B: llms 용어집에 rollout 행 신설(금지 롤아웃), physical-ai 행은 지침 유지.** 18건 / 9파일. physical-ai 파일은 llms 행으로 1회만 경고된다.
- **권고.** B. 같은 금지 표기를 두 용어집에 넣으면 physical-ai 파일에서 경고가 두 번 나므로 physical-ai 행의 금지 칸은 비워 둔다.

### 3-23. 기타 소량 방향 항목

| 항목 | 데이터 | 권고 |
|---|---|---|
| 팬아웃 (A12) | 팬아웃 16 / 4 (dnotitia-akb, stablyai-orca), fan-out 14 / 8 | 대등. 5절에 두고 이번에는 손대지 않는다 |
| skill pack 영문 철자 (6-1) | skill pack 27 / 8, skillpack 4 / 2 (garrytan 원문 표기) | 28번 행 비고에 "skill pack(띄어쓰기), 원문 인용은 그대로"로 적는다 |
| late interaction 하이픈 (D4) | late interaction 37 / 3, late-interaction 1 / 1 | D4 실측(2파일 대 3파일)과 달리 띄어쓰기가 압도한다. 지침 불요 |
| pseudo-action (7-2 소관) | pseudo-action 9 / 5, pseudo action 14 / 3 | 7-2가 다룬다. 이 문서에서는 기록만 |
| precision과 recall 비대칭 | recall 등재(19번), precision 지침만(56번) | 정밀도의 일반어 용법(physical-ai 62건) 때문이다. recall 행 비고에 사유를 남긴다 |

## 4. 요약

- **등재 권고 31행** (2-1절 1~31번): 신규 위반 합계 762건, 고유 대상 파일 161개, physical-ai 영향 48건 / 19파일. 이 중 3행(29~31번)은 3절 방향 확정을 전제로 하며 37건 / 15파일이다. 나머지 28행은 725건 / 152파일이고, 그중 대량 3행(entity, chunk와 chunking, provider)이 368건 / 59파일, 소량 25행이 357건 / 118파일이다. physical-ai 48건은 denoising 19, rollout 13, diffusion model 6, skill 복합어 4, hidden state 2, 나머지 4건이다.
- **방향 결정 17건** (2-2절 32~48번): query, knowledge graph, indexing, sandbox, baseline, modality, corpus, slash command, counterfactual, source of truth, audit trail, orphan page, telemetry, LLM-as-a-Judge 철자, GraphRAG 철자, instruction file, inference provider(지침 권고). 3절이 선택지와 비용을 적었다. 이 중 음차나 번역어 canonical을 권고한 것(sandbox, corpus, audit trail, telemetry, knowledge graph 지침, counterfactual, orphan page, source of truth)은 등재해도 신규 위반이 0 또는 16건이다.
- **보류 5건** (2-3절 49~53번): fallback, headless, topology, rubric, contrastive learning. 방향이 2대 1 안팎이거나 physical-ai 비중이 크다.
- **지침만 13건** (2-4절 54~66번): RLVR, MCP, precision, jailbreak, classifier-free guidance, zero-shot, reasoning trace, taxonomy, verifier, provenance, prompt caching, manifest, regression test(조치 불요).
- **기존 행 보강과 조치 불요 7건** (2-5절 67~73번): flow matching 중복 행 정리, sub-agent 비고, memory 복합어 비고, trajectory 지침 유지, coverage 비고, tool use 조치 불요, physical-ai 행의 `applies_to` 밖 우려 항목은 실측 0건.
- **기각** (5절): 428종 중 표에 오르지 않은 355종. 한글 표기 0건 168종, 1~2건 49종, 일반어 오탐, 음차나 번역어가 이미 정착해 조치가 불필요한 것, 대등해 방향이 없는 것.

등재 권고 31행을 모두 반영하면 스냅샷 기준 `lint_terms --all`은 0건에서 762건이 된다. 3차와 달리 흡수할 배치가 남아 있지 않으므로 등재와 같은 작업에서 정리해야 한다. physical-ai 게이트는 48건이 새로 걸린다.

## 5. 기각 후보와 사유 (재검토 방지용)

3차 4절의 기각은 그대로 유지하고 재조사하지 않았다(툴, 어댑터, 평가자, 스캐폴딩, 에이전틱, 임베더, 환경, 데이터셋, 배포, 파이프라인, 정확도, 분할, 추적, 어휘, 지시 따르기, 위임, 서빙, 체크포인트, 프롬프팅, 토큰화, 멀티모달, 캐시, 손실 함수, 목적 함수, 정규화, 수렴, 활성화, 학습률, 배치 크기, 토큰 예산, 최근접 이웃, 희소성). 이번 후보 줄에 다시 오른 checkpoint(A1), adapter(A9), 툴 결과(A7), 멀티모달 RAG(D2), 캐시(A4), 추적(A3, A10), 분할(chunking)은 "3차에서 기각 확정"으로 처리했다. 에이전틱은 재계량 결과 5건 / 5파일로 3차(4건)와 같다.

이번에 새로 기각한 후보는 다음과 같다.

| 분류 | 후보 | 기각 사유 |
|---|---|---|
| 절대량 부족 (한글 표기 0건, 168종) | theory of mind, Cohen's kappa, verification distance, query-focused summarization, map-reduce answering, gleaning, directness, world-action model, inverse dynamics 단독형, action-as-image, latent plan, video backbone, anti-rationalization table, cardinality, design primitive, meta-harness, lucky pass, advantage, retokenization, collocated, idempotent, Sprint Contract, slop, Ralph Loop, evolver, RLM, heartbeat, permission fatigue, plan mode, messages array, context rot, trajectory evaluation, CapEx, opinionated, deal-breaker, prefix cache, context optimization layer, attention budget, just-in-time, tool result clearing, self-prediction, inverse test-time scaling, context offloading, symbolic recursion, context graph, cross-encoder, test-time training, reward hacking, mind map, citation recall, citation precision, subterranean agent, surface orchestration, decision hub, library drift, delivery salience, pass^k, defense-in-depth, computer-use agent, golden patch, provider prefix, theming, ACP, composite tool, structured error content, normative value, AGENTS.md와 DESIGN.md와 CLAUDE.md, RRF, schema pack, soft delete, backfill, sparse retrieval, shared memory substrate, memory operations, publish layer, proactive agent, signal-detector, knowledge operating system, cron, PKCE, XDR, hot cache, contextual prefix, advisory lock, Marp, Mermaid, tree-sitter, cross-file, AST, citation mining, fair coverage, debounce, community clustering, force-directed layout, RLS, provider-agnostic, always-on agent, generative UI, seed entity, semantic island, key-value indexing, content list, atomic content unit, anchor node, dereferencing, multi-signal fusion, architectural fragmentation, late-fusion, dual-tower, native multimodal embedding, hard negative, in-batch negative, mean pooling, model soup, MRL, visual search, in-context index, hard chunking, hierarchical chunking, retrieval interface resolution, Personalized PageRank, OpenIE, phrase node, passage node, reset probability, recognition memory, multi-vector, data-oblivious, codebook collapse, Lloyd-Max, product quantization, latent 복합어(llms 범위), optimal transport, score matching, continuous normalizing flow, NFE, STE, super-resolution, rate-distortion, information-first sampling, image tiling, context parallelism, length-balanced packing, Parallel Box Decoding, metric depth, pixel correspondence, expert vision model, ununlearning, impermissible knowledge, forget set, prefill, AEAD, refusal training, accessibility tree, Set-of-Mark, cross-server orchestration, agent swarm, capability-reliability gap, discovery, context pointer, live zone, hill climbing, Diff-Aware | 대응 한글 표기가 저장소에 0건이라 흔들림 자체가 없다. 원어만 쓰이고 있으므로 등재해도 지침 행일 뿐이다. 이 가운데 배치 기록이 금지 표기를 명시한 image tiling(이미지 타일링), context parallelism(컨텍스트 병렬화), accessibility tree(접근성 트리), Set-of-Mark(마크 집합), computer-use agent(컴퓨터 사용 에이전트)도 실측 0건이다 |
| 절대량 부족 (한글 1~2건, 49종) | persistent state, joint prediction, overreach, consolidation, output evaluation, system of record, canary, operational context, context compression layer, bi-temporal, IQR, parametric memory, pre-writing, task-oriented dialogue, session isolation, information barrier, retrieval-over-tools, gap analysis, boost, self-contained HTML, wikilink, contextual retrieval, call graph, dry-run, base URL, grading, webhook, lowest common ancestor, dual-level retrieval, reasoning-based RAG, late interaction, patchify, timestep, mixture-of-encoders, camera pose, focal length, camera intrinsics, PII, execution-based evaluation, reference trajectory, score fusion, on-demand, golden state, sensemaking(의미 구성 4) | 등재 가치가 낮다. reference trajectory는 LE 종합이 우선순위를 높게 매겼으나 재작성이 "참조 궤적"을 이미 없앴고 잔존은 "참조 trajectory" 1건이다 |
| 일반어 오탐 | 산출물(artifact), 제공자와 공급자(provider), 계보와 출처(provenance), 지연 시간(latency), 사람 개입(human-in-the-loop, 46건 중 physical-ai 24), 종료 조건(exit criteria), 결정적과 결정론적(deterministic, A1 의견대로), 정밀도(precision), 다양성(diversity), 커뮤니티 단독형, 모듈성(modularity, physical-ai 35건이 모듈 설계 의미), 정화(sanitize, "안정화" 39건), 살균(sanitize, physical-ai 로봇 문맥), 체제(regime, "운영체제" 22건), 재생과 재실행(replay), 편입(incorporation), 구체화(materialize), 잔여와 잔차(residual), 왜곡(distortion), 절단(truncation), 상태 유지(stateful), 통합(consolidation), 집계와 집약(aggregation), 관문(gateway), 적재와 수집(ingestion), 입도(grain, "타입도"와 "개입도"), 린트와 린팅(linting, "스프린트" 35건과 "프린팅" 13건), 트레이싱(tracing, "레이트레이싱"), 기질(substrate, "대기질"), 방출과 축출(eviction), 진행자와 사회자(moderator), 분류 체계(taxonomy), 실패 유형과 실패 모드(failure mode, 212건), 절차 지식(procedural knowledge), 시간 추론(temporal reasoning, "실시간 추론"), 손실 압축("무손실 압축" 7건은 파생형이나 lossy compression 원어가 1건뿐) | 부분 문자열 검사가 일반 문장을 잡거나, 한글이 표준 번역이라 원어 출현이 오히려 적다 |
| 음차나 번역어가 이미 정착 (조치 불요) | 매니페스트(53대 19), 텔레메트리(48대 7), 데몬(44대 0), 백엔드(183대 161), 워크로드(98대 6), 마이그레이션(76대 23), 백테스트(44대 0), 트리거(84대 18), 드라이버(48대 6), 스니펫(36대 18), 캡션(158, CLAUDE.md 표기), 회귀 테스트(36대 0), 손실 압축(29대 1), 모델 붕괴(11대 1), 데이터 혼합(27대 0), 닫힌 어휘(11대 0), 가역 압축(10대 0), 증분 동기화(11대 0), 다중 쿼리 확장(11대 1), 계약 우선(11대 2), 트리 탐색(33대 14), 설계 공간(39대 15), 벡터 유사도(23대 10), 조건화(111대 58), 벡터장(22, physical-ai 22), 무료 티어(13대 0), 스크린샷 타일(8대 3), 온프레미스와 온프렘(17대 0), 감사 추적(3절 14번), 슬래시 커맨드(3절 8번), 지시 파일(3절 21번) | 한글이 원어보다 많다. 방향이 반대라 등재하면 다수를 소수에 맞추는 정리가 된다. 이 가운데 A2가 한글로 적은 매니페스트와 닫힌 어휘, A7의 가역 압축, A12의 팬아웃과 텔레메트리는 계획서의 표기가 곧 저장소 canonical이다 |
| 대등 (방향 없음) | 커넥터(35대 34), 엣지 케이스(23대 19), 팬아웃(16대 14), 캐시 정렬(7대 9), 프롬프트 캐싱(7대 8), 파생 인덱스(12대 10), 의외의 연결과 뜻밖의 연결(15대 19), 자기 교정과 자가 교정(15대 4, 두 한글 표기 분열), 그래프 검색과 그래프 탐색(27대 19), 검증기와 검증자(15대 69, 일반어 겹침), 채점기와 채점자(35대 31), 게이트웨이(25대 93, 원어 대부분이 AI Gateway 제품명), 쌍별(7대 41, physical-ai 4) | 데이터가 방향을 주지 않거나 원어 다수가 고유명이다. 자기 교정과 자가 교정 분열은 소량이라 지침 없이 둔다 |
| 의미 분기 | localization(D3의 문서 내 위치 특정 대 physical-ai 행의 SLAM localization, 한글 표기 21건이 위치 파악, 국소화, 지역화로 갈리나 전부 일반 서술), primitive(physical-ai motion primitive 대 소프트웨어 primitive는 별도 행으로 해결, 24번), proxy(네트워크 프록시 음차 80건 대 proxy metric 원어), 쌍대 단독형(duality 대 pairwise 오역, 후자만 "쌍대 비교"로 금지) | 기계 검사가 문맥을 구분하지 못한다 |

## 6. `SUBSTRING_EXCEPTIONS` 추가 제안

**등재 권고 31행에는 추가가 필요 없다.** 31행의 금지 표기 49종 모두 매치 앞에 다른 형태소가 붙은 어절이 0건이다.

방향 결정 후보를 등재할 경우에만 다음이 필요하다.

| 조건 | 필요한 예외 |
|---|---|
| 3절 3번에서 색인을 금지하는 경우 | `"색인": ["검색인"]` (실측 2건, "검색인지" 꼴). 재색인 1건은 re-indexing이므로 예외가 아니라 진짜 위반이다 |
| 3절 1번에서 선택지 B(질의 금지)를 택하는 경우 | `"질의": ["품질의", "성질의", "물질의"]` (실측 43건, 4건, 1건). 3차 계량(20건, 1건, 1건)에서 품질의가 2배 늘었다. 별개 개념 질의응답 52건 / 40파일은 "질의응답"을 예외 단어로 추가해야 덮이는데, 이 문서는 선택지 A(쿼리만 금지)를 권고하므로 둘 다 불필요하다 |
| 트레이싱을 금지 표기로 넣는 경우 (권고하지 않음) | `"트레이싱": ["레이트레이싱"]` (실측 2건, ray tracing) |

다음은 예외로 등재하지 **않는다**. 접두사가 붙은 파생형이라 진짜 위반이다 (3차 5절 판정 승계).

- 재인덱싱 9건, 재색인 1건 (3절 3번 등재 시)
- 서브에이전트 실행 (agent run의 "에이전트 실행" 5건. 다만 이 후보 자체가 일반어라 기각)

다음 후보는 예외를 두어야만 성립하므로 기각했다. 예외가 여러 항 필요하다는 점 자체가 기각 근거다 (3차의 툴과 같은 판단).

- 린트: 스프린트 35건, 프리프린트 5건
- 린팅: 프린팅 13건
- 체제: 운영체제 22건
- 정화: 안정화 39건

## 7. 등재 시 함께 고쳐야 할 것

1. **위반 정리 대상.** 등재 권고 31행을 모두 반영하면 161개 파일에 762건이다. physical-ai는 19개 파일 48건이고 denoising(reuss-2026 sources와 wiki, 9bow-2026-world-action-model-rise) 19건과 rollout 7파일 13건이 대부분이다. 3차와 달리 흡수할 배치가 없으므로 등재 커밋에서 정리하거나, 대량 3행(entity, chunk, provider)을 분리해 별도 커밋으로 나눈다. `index.md`도 대상이다(슬래시 명령어 1건, 프로바이더 1건).
2. **`applies_to`와 write-wiki 스킬 §0.** 이 문서는 physical-ai 용어집의 `applies_to`를 바꾸지 않는 안을 권고한다(전 카테고리에서 잡아야 하는 rollout, primitive는 llms와 agents에 행을 둔다). 따라서 write-wiki 스킬 §0의 매핑 표(`applies_to`의 사본)는 갱신할 필요가 없다. 사용자가 physical-ai `applies_to` 확장을 택하면 §0 표를 같은 커밋에서 고친다.
3. **용어집 자체 결함.** 계량 중 발견한 세 가지를 같은 작업에서 고친다. (a) glossary-physical-ai의 flow matching 행 중복(70행과 114행). (b) glossary-agents 예문의 CLAUDE.md 금지 동사 세 곳: skill 행 "에이전트에 얹는", loop engineering 행 "에이전트를 도는 루프", local-first 행 "서버 없이 도는 설계". 용어집은 lint_style 면제라 통과하지만 작성자가 예문을 본문에 옮기면 위반이 된다(A5 지적). (c) 3차 등재 행의 비고가 "2026-09 3차 갱신"으로 적혀 있으므로 이번 행은 "2026-09 4차 갱신"으로 통일한다.
4. **CLAUDE.md.** compounding에서 선택지 A를 택하면 "Knowledge Compounding (지식 복리)" 절 제목과 본문의 "복리로 쌓이는" 표현이 용어집과 어긋난다. CLAUDE.md는 lint 대상이 아니지만 SSOT 정합을 위해 함께 고친다. slash command에서 선택지 A를 택하면 A6이 garrytan-gstack에 적용한 명령어 표기를 되돌린다.
5. **lint_terms.py.** 3절 3번 색인 금지 시 `SUBSTRING_EXCEPTIONS`에 1항 추가. 그 외 등재 권고 31행은 스크립트 변경이 없다.
6. **영문 리터럴 금지 표기.** 3절 18번 선택지 A(LLM-as-judge 금지)를 택하면 금지 표기 칸에 영문이 들어간다. lint는 리터럴 부분 문자열이라 동작하지만, 용어집 표기 원칙 절에 "영문 철자 변형도 금지 표기로 둘 수 있다"를 한 줄 추가해 규약을 명시한다.
7. **재측정.** 실행 단계는 스크래치의 `measure.py`와 `tally.py`를 `AIWIKI_ROOT=/home/sguys99/project/ai-wiki`로 실행해 live 저장소에서 다시 잰다. 조사 중 다른 세션이 physical-ai 자료 10여 편을 ingest하고 있었으므로 physical-ai 영향은 스냅샷보다 커질 수 있다.
8. **physical-ai-overview의 용어집 수치.** 7-7이 고치기로 한 "147개 용어"는 실측 155행이고, 이번 등재로 다시 바뀐다. 7-7과 순서를 맞춘다.

## 8. 승인 결과와 실행 내역 (2026-09-17 승인, 2026-09-18 Stage A 실행)

사용자 승인으로 **신규 57행을 등재하고 기존 7행을 보강**했다(agents 36행, llms 21행, physical-ai는 중복 행 병합으로 1행 감소). 이 절은 등재 단계(Stage A)의 기록이다. Stage A는 용어집 3편, `scripts/lint_terms.py`, 이 문서의 8절만 수정했고 위반 정리는 Stage B가 병렬로 수행한다. 아래 수치는 전부 live 저장소(533개 검사 파일)에서 `lint_terms.py --all`로 실측한 값이며, 1절의 스냅샷(505개)보다 physical-ai 자료가 늘어난 상태다.

### 8-1. 승인 내용

| 항목 | 승인 |
|---|---|
| 2-1 등재 권고 31행 | 전부 등재. 대량 3행(entity, chunk와 chunking, provider) 포함 |
| 2-2 방향 결정 17건 | 3절 각 항의 권고를 전부 수용. 세부는 8-3 |
| 2-3 보류 5건 (fallback, headless, topology, rubric, contrastive learning) | 등재하지 않음 |
| 2-4 지침만 13건 | 금지 표기 없는 지침 행으로 등재. regression test는 조치 불요라 제외해 12행 |
| 2-5 기존 행 보강 7건 | 반영. flow matching 중복 행은 하나로 병합 |
| 7절 3(b) 예문 금지 동사 | skill 행 "얹는"을 "결합하는"으로, loop engineering 행 "도는 루프"를 "실행하는 루프"로, local-first 행 "도는 설계"를 "실행되는 설계"로 교체 |
| 7절 3(c) 비고 통일 | 이번 등재 행과 보강 행의 비고를 "2026-09 4차 갱신"으로 통일하고 실측 수치를 남김 |
| 7절 6 영문 리터럴 규약 | glossary-agents 표기 원칙 절에 "금지 표기 칸에는 영문 철자 변형도 둘 수 있다" 문단 추가 |
| 7절 4 CLAUDE.md "복리" 정합 | 오케스트레이터가 직접 처리. Stage A는 건드리지 않음 |
| 7절 2 `applies_to` | 변경 없음. write-wiki 스킬 §0도 갱신하지 않음 |

### 8-2. 후보별 처분

신규 위반 실측은 등재 직후 live 저장소 값(건수 / 파일 수)이다. 금지 표기가 둘 이상인 행은 파일 수를 합집합으로 셌다.

| # | 후보 | 처분 | 등재 위치 | 행 성격 | 신규 위반 실측 | 비고 |
|---|---|---|---|---|---|---|
| 1 | trace | 등재 | glossary-agents (trajectory 아래) | 신규 행, 금지 트레이스 | 10건 / 7파일 | trajectory 행 비고에 trace 상호 참조 추가. 트레이싱은 레이트레이싱 충돌로 금지 칸에서 제외 |
| 2 | artifact | 등재 | glossary-agents (hook 아래) | 신규 행, 금지 아티팩트 | 21건 / 6파일 | |
| 3 | worktree | 등재 | glossary-agents (artifact 아래) | 신규 행, 금지 작업 트리와 워크트리 | 6건 / 4파일 | 워크트리 0건 |
| 4 | prompt injection | 등재 | glossary-llms (RLVR 아래) | 신규 행, 금지 프롬프트 주입과 프롬프트 인젝션 | 7건 / 6파일 | jailbreak 지침 행과 짝 |
| 5 | eval | 등재 | glossary-agents (hallucination 아래) | 신규 행, 금지 이밸 | 4건 / 2파일 | |
| 6 | hybrid search | 등재 | glossary-agents (reranking 아래) | 신규 행, 금지 하이브리드 검색 | 25건 / 9파일 | |
| 7 | vector database | 등재 | glossary-agents (hybrid search 아래) | 신규 행, 금지 벡터 데이터베이스와 벡터 DB | 34건 / 11파일 | vector DB 약칭 허용 |
| 8 | chunk / chunking | 등재 | glossary-agents (vector database 아래) | 신규 행, 금지 청크와 청킹 | 120건 / 33파일 (physical-ai 1건) | physical-ai 파일에서는 action chunking 계열 행과 이중 경고 가능성을 비고에 명시 |
| 9 | entity | 등재 | glossary-agents (multi-hop 아래) | 신규 행, 금지 엔티티 | 172건 / 26파일 | 이번 등재 중 최대 |
| 10 | community (GraphRAG) | 등재 | glossary-agents (knowledge graph 아래) | 신규 행, 금지 커뮤니티 감지, 탐지, 요약 | 26건 / 9파일 | |
| 11 | multi-hop | 등재 | glossary-agents (top-k 아래) | 신규 행, 금지 다중 홉과 멀티홉 | 30건 / 8파일 | |
| 12 | top-k | 등재 | glossary-agents (query 아래) | 신규 행, 금지 상위 k와 상위 K | 17건 / 13파일 (physical-ai 1건) | |
| 13 | LLM-as-a-Judge | 등재 | glossary-agents (eval 아래) | 신규 행, 금지 LLM 평가자, LM 심판, LLM-as-judge, LLM-as-a-judge | 한글 6건 / 4파일, 영문 40건 / 23파일 | "LM 심판"이 LLM 심판과 VLM 심판을 부분 문자열로 함께 잡으므로 셋을 하나로 줄였다(이중 경고 방지). 영문 변형은 8-3 18번 |
| 14 | codebook | 등재 | glossary-llms (autoencoder 아래) | 신규 행, 금지 코드북 | 31건 / 6파일 | |
| 15 | autoencoder | 등재 | glossary-llms (encoder / decoder 아래) | 신규 행, 금지 오토인코더 | 11건 / 3파일 (physical-ai 1건) | |
| 16 | diffusion model | 등재 | glossary-llms (transformer 아래) | 신규 행, 금지 확산 모델과 디퓨전 모델 | 7건 / 4파일 (전량 physical-ai) | 스냅샷 6건에서 1건 증가 |
| 17 | denoising | 등재 | glossary-llms (diffusion model 아래) | 신규 행, 금지 디노이징 | 38건 / 5파일 (전량 physical-ai) | 스냅샷 19건의 2배. 조사 이후 ingest된 physical-ai 자료가 음차를 썼다 |
| 18 | ablation | 등재 | glossary-llms (benchmark 아래) | 신규 행, 금지 어블레이션, 애블레이션, 절제 실험 | 10건 / 3파일 (physical-ai 1건) | |
| 19 | recall | 등재 | glossary-llms (baseline 아래) | 신규 행, 금지 재현율과 회복률 | 14건 / 11파일 | precision 비대칭 사유를 비고에 기록 |
| 20 | hidden state | 등재 | glossary-llms (codebook 아래) | 신규 행, 금지 은닉 상태 | 2건 / 2파일 (전량 physical-ai) | |
| 21 | vectorless RAG | 등재 | glossary-agents (GraphRAG 아래) | 신규 행, 금지 벡터리스 | 2건 / 2파일 | |
| 22 | design token | 등재 | glossary-agents (primitive 아래) | 신규 행, 금지 디자인 토큰 | 1건 / 1파일 | "토큰"으로 줄이지 않는 규약을 비고에 명시 |
| 23 | cache read / cache write | 등재 | glossary-llms (inference 아래) | 신규 행, 금지 캐시 읽기와 캐시 쓰기 | 6건 / 3파일 | prompt caching 지침 행과 짝 |
| 24 | primitive (소프트웨어) | 등재 | glossary-agents (worktree 아래) | 신규 행, 금지 프리미티브 | 4건 / 2파일 | |
| 25 | provider | 등재 | glossary-agents (sandbox 아래) | 신규 행, 금지 프로바이더 | 76건 / 7파일 | inference provider 원어 권장을 비고에 기록(44번 흡수) |
| 26 | rollout | 등재 | glossary-llms (speculative decoding 아래) | 신규 행, 금지 롤아웃 | 18건 / 9파일 (physical-ai 13건 / 7파일) | physical-ai 행의 금지 칸은 비운 채 유지(8-3 22번) |
| 27 | pairwise | 등재 | glossary-llms (precision 아래) | 신규 행, 금지 페어와이즈와 쌍대 비교 | 16건 / 5파일 | |
| 28 | skill (기존 행 보강) | 보강 | glossary-agents | 금지 칸에 스킬 라이브러리와 스킬 팩 추가, 예문 "얹는" 교체, 복합어 방침과 skill pack 철자 비고 | 27건 / 18파일 (physical-ai 4건) | |
| 29 | comprehension debt | 등재 | glossary-agents (software factory 아래) | 신규 행, 금지 이해 부채 | 7건 / 4파일 | 8-3 11번 |
| 30 | software factory | 등재 | glossary-agents (compounding 아래) | 신규 행, 금지 소프트웨어 팩토리 | 10건 / 5파일 | 8-3 9번 |
| 31 | compounding | 등재 | glossary-agents (loop engineering 아래) | 신규 행, 금지 복리 | 20건 / 6파일 | 8-3 12번. compounding error 별개 개념을 비고에 명시 |
| 32 | query | 등재 | glossary-agents (indexing 아래) | 신규 행, canonical 질의, 금지 쿼리 | 203건 / 55파일 | 8-3 1번 |
| 33 | knowledge graph | 등재 (지침) | glossary-agents (entity 아래) | 신규 지침 행 | 0건 | 8-3 2번 |
| 34 | indexing / index | 등재 | glossary-agents (chunk 아래) | 신규 행, canonical 인덱싱과 인덱스, 금지 색인 | 164건 / 59파일 (physical-ai 14건 / 6파일) | 8-3 3번. SUBSTRING_EXCEPTIONS 1항 추가 |
| 35 | sandbox | 등재 (지침) | glossary-agents (harness 아래) | 신규 지침 행, canonical 샌드박스 | 0건 | 8-3 4번 |
| 36 | baseline | 등재 (지침) | glossary-llms (ablation 아래) | 신규 지침 행, canonical baseline | 0건 | 8-3 5번 |
| 37 | modality | 등재 (지침) | glossary-llms (MLLM 아래) | 신규 지침 행, canonical 모달리티 | 0건 | 8-3 6번 |
| 38 | corpus | 등재 (지침) | glossary-llms (tokenizer 아래) | 신규 지침 행, canonical 코퍼스 | 0건 | 8-3 7번 |
| 39 | slash command | 등재 | glossary-agents (skill 아래) | 신규 행, canonical 슬래시 커맨드, 금지 슬래시 명령 | 51건 / 26파일 | 8-3 8번 |
| 40 | counterfactual | 등재 (지침) | glossary-agents (reasoning 아래) | 신규 행, canonical 반사실, 첫 등장 병기 | 0건 | 8-3 10번 |
| 41 | source of truth | 등재 | glossary-agents (orphan page 아래) | 신규 행, canonical 진실의 원천, 금지 진실 원천과 진실 공급원 | 16건 / 10파일 | 8-3 13번 |
| 42 | audit trail | 등재 (지침) | glossary-agents (provenance 아래) | 신규 지침 행, canonical 감사 추적 | 0건 | 8-3 14번 |
| 43 | orphan page | 등재 (지침) | glossary-agents (local-first 아래) | 신규 행, canonical 고아 페이지, 첫 등장 병기 | 0건 | 8-3 15번 |
| 44 | inference provider | 비고 흡수 | provider 행 비고 | 행 없음 | 해당 없음 | |
| 45 | telemetry | 등재 (지침) | glossary-agents (trace 아래) | 신규 지침 행, canonical 텔레메트리 | 0건 | 8-3 16번 |
| 46 | LLM-as-a-Judge 영문 철자 | 등재 | 13번 행의 금지 칸 | 금지 LLM-as-judge, LLM-as-a-judge | 40건 / 23파일 | 8-3 18번 |
| 47 | GraphRAG 영문 철자 | 등재 (지침) | glossary-agents (community 아래) | 신규 지침 행 | 0건 | 8-3 19번 |
| 48 | instruction file | 등재 | glossary-agents (slash command 아래) | 신규 행, canonical 지시 파일, 금지 지시문 파일과 지침 파일 | 14건 / 9파일 | 8-3 21번 |
| 49~53 | fallback, headless, topology, rubric, contrastive learning | 보류 유지 | 없음 | 없음 | 해당 없음 | 2-3 사유 그대로 |
| 54 | RLVR | 등재 (지침) | glossary-llms (RLHF 아래) | 신규 지침 행 | 0건 | |
| 55 | MCP | 등재 (지침) | glossary-agents (function calling 아래) | 신규 지침 행 | 0건 | |
| 56 | precision | 등재 (지침) | glossary-llms (recall 아래) | 신규 지침 행 | 0건 | recall 행 비고에도 비대칭 사유 기록 |
| 57 | jailbreak | 등재 (지침) | glossary-llms (prompt injection 아래) | 신규 지침 행 | 0건 | |
| 58 | classifier-free guidance | 등재 (지침) | glossary-llms (denoising 아래) | 신규 지침 행 | 0건 | |
| 59 | zero-shot | 등재 (지침) | glossary-llms (in-context learning 아래) | 신규 지침 행 | 0건 | |
| 60 | reasoning trace | 등재 (지침) | glossary-llms (zero-shot 아래) | 신규 지침 행 | 0건 | glossary-agents reasoning 행 비고에 "복합어는 원어" 추가 |
| 61 | taxonomy | 등재 (지침) | glossary-agents (ontology 아래) | 신규 지침 행 | 0건 | |
| 62 | verifier | 등재 (지침) | glossary-agents (verification 아래) | 신규 지침 행 | 0건 | |
| 63 | provenance | 등재 (지침) | glossary-agents (delegation 아래) | 신규 지침 행 | 0건 | |
| 64 | prompt caching | 등재 (지침) | glossary-llms (cache read 아래) | 신규 지침 행 | 0건 | |
| 65 | manifest | 등재 (지침) | glossary-agents (source of truth 아래) | 신규 지침 행, canonical 매니페스트 | 0건 | |
| 66 | regression test | 조치 불요 | 없음 | 없음 | 해당 없음 | 저장소 표기와 이미 같다 |
| 67 | flow matching 중복 행 | 병합 | glossary-physical-ai | 70행을 남기고 114행을 삭제. 예문은 70행 것, 비고는 두 행을 합침 | 0건 | llms 이관은 승인 범위 밖이라 하지 않았다 |
| 68 | sub-agent | 비고 보강 | glossary-agents | 267 대 20 정착과 고유명 잔존 사유 기록 | 해당 없음 | |
| 69 | memory 복합어 | 비고 보강 | glossary-agents memory 행 | 단독 memory만 메모리, 복합어는 원어 명문화 | 해당 없음 | |
| 70 | trajectory (agents) | 지침 유지 | glossary-agents | 4차 재계량 결과와 trace 상호 참조를 비고에 추가 | 해당 없음 | |
| 71 | coverage | 비고 보강 | glossary-agents | li-2026 retrieval coverage 문맥 추가 | 해당 없음 | |
| 72 | tool use | 조치 불요 | 없음 | 없음 | 해당 없음 | |
| 73 | advantage 등 7종 | 조치 불요 | 없음 | 없음 | 해당 없음 | |

### 8-3. 방향 결정 17건 처분

| 3절 | 후보 | 채택 선택지 | 실행 내용 | 실측 |
|---|---|---|---|---|
| 3-1 | query | A | canonical 질의(번역어), 금지 쿼리. 비고에 "첫 등장 시 원어 병기 후 질의만 쓴다", 질의응답은 별개 개념 | 203건 / 55파일. 쿼리 앞에 다른 형태소가 붙은 어절 0건 |
| 3-2 | knowledge graph | B | 지침 행. 지식 그래프는 표준 번역으로 병용 허용, 문서당 하나. 지식그래프(붙여쓰기)는 지침으로만 금지 | 0건 |
| 3-3 | indexing / index | A | canonical 인덱싱과 인덱스, 금지 색인. `SUBSTRING_EXCEPTIONS`에 "색인": ["검색인"] 추가 | 164건 / 59파일. 예외로 걸러진 오탐 2건("한 번의 top-k 검색인 반면", zhang-2025 sources와 wiki). 재색인 1건과 "3색인 교차검증" 1건은 진짜 위반 |
| 3-4 | sandbox | A | canonical 샌드박스 지침 행 | 0건 |
| 3-5 | baseline | C | 원어 canonical 지침 행. 기준선은 표준 번역 허용, 베이스라인은 원어 권장 지침 | 0건 |
| 3-6 | modality | B | canonical 모달리티 지침 행 | 0건 |
| 3-7 | corpus | A | canonical 코퍼스 지침 행 | 0건 |
| 3-8 | slash command | A | canonical 슬래시 커맨드, 금지 슬래시 명령 한 종만. "슬래시 명령어"를 부분 문자열로 품는 것을 확인했고 두 종을 다 넣으면 명령어 줄에서 이중 경고가 나므로 한 종만 넣었다 | 51건 / 26파일 (index.md 3건 포함) |
| 3-9 | software factory | A | 원어, 금지 소프트웨어 팩토리 | 10건 / 5파일 |
| 3-10 | counterfactual | B | canonical 반사실, 첫 등장 원어 병기, 금지 표기 없음 | 0건 |
| 3-11 | comprehension debt | A | 원어, 금지 이해 부채 | 7건 / 4파일 |
| 3-12 | compounding | A | 원어, 금지 복리. compounding error(glossary-physical-ai)는 별개 개념으로 비고에 명시 | 20건 / 6파일. 복리 앞에 다른 형태소가 붙은 어절 0건 (복리후생 등 없음). 20건 전부 compounding 의미 |
| 3-13 | source of truth | B | canonical 진실의 원천, 금지 진실 원천과 진실 공급원 | 16건 / 10파일. "진실의 원천"은 "진실 원천"을 부분 문자열로 품지 않음을 코드로 확인(`'진실 원천' in '진실의 원천'`은 False) |
| 3-14 | audit trail | 권고 | canonical 감사 추적 지침 행 | 0건 |
| 3-15 | orphan page | B | canonical 고아 페이지, 첫 등장 병기 | 0건 |
| 3-16 | telemetry | 권고 | canonical 텔레메트리 지침 행 | 0건 |
| 3-17 | 대량 3행 | 등재 | entity, chunk와 chunking, provider 전부 등재 | 368건 / 59파일 (스냅샷과 동일) |
| 3-18 | LLM-as-a-Judge 영문 철자 | A | canonical LLM-as-a-Judge, 금지 LLM-as-judge와 LLM-as-a-judge. `lint_file`의 `masked.find(banned)`는 Python `str.find`라 대소문자를 구분한다. canonical 줄에서 두 금지 표기의 find 결과가 -1임을 확인했으므로 두 종 모두 금지 칸에 넣었다 | 40건 / 23파일 |
| 3-19 | GraphRAG 영문 철자 | 지침 | GraphRAG 지침 행. 고유명은 GraphRAG, 범주는 graph-based RAG, Graph RAG는 원문 인용이라 금지하지 않음 | 0건 |
| 3-20 | design token | 권고 | 원어 canonical, 비고에 "토큰으로 줄이지 않는다, LLM 토큰과 같은 문서면 전체 표기" 규약 | 1건 / 1파일 |
| 3-21 | instruction file | A | canonical 지시 파일, 금지 지시문 파일과 지침 파일. AGENTS.md와 CLAUDE.md 개념 설명을 예문에 둠 | 14건 / 9파일 |
| 3-22 | rollout | B | glossary-llms에 rollout 행 신설(금지 롤아웃). glossary-physical-ai rollout 행은 금지 칸을 비운 채 유지 | 18건 / 9파일. physical-ai 13건 / 7파일은 llms 행으로 1회씩만 경고됨 |
| 3-23 | 기타 소량 | 표대로 | skill pack 철자와 skillpack 원문 인용 예외를 skill 행 비고에, precision과 recall 비대칭 사유를 recall 행 비고에 기록. 팬아웃, late interaction, pseudo-action은 손대지 않음 | 해당 없음 |

### 8-4. `SUBSTRING_EXCEPTIONS` 변경

`"색인": ["검색인"]` 1항을 추가했다. 주석에는 검색(search)과 어미 "인"의 결합이라는 형태소 분석과 실제 예문 "한 번의 top-k 검색인 반면"을 적었다. 6절이 적은 "검색인지" 꼴은 저장소에 없고, 실제 2건은 zhang-2025-pageindex sources와 wiki의 "한 번의 top-k 검색인 반면"이다. 예외 단어 "검색인"이 두 문맥을 다 덮으므로 동작은 같다. `validate_substring_exceptions`는 경고 없이 통과했다(`--all` 실행 시 stderr에 `[lint_terms]` 경고 0줄).

그 밖의 예외는 추가하지 않았다. 등재한 금지 표기 56종(agents 38종, llms 18종) 전부에 대해 lint 대상 라인에서 매치 앞에 한글이나 라틴 문자가 붙은 어절을 뽑았고, 결과는 다음 세 가지뿐이었다.

- 색인: 검색인 2건(예외 처리), 재색인 1건(파생형, 진짜 위반)
- LM 심판: VLM 심판 4건(의도된 포괄 매치)
- 그 외 54종: 0건

따라서 금지 칸에서 뺀 항목은 없다. 다만 등재 전에 미리 조정한 것이 둘 있다. (a) "슬래시 명령어"는 "슬래시 명령"이 품으므로 금지 칸에 넣지 않았다. (b) "LLM 심판"과 "VLM 심판"은 "LM 심판"이 품으므로 "LM 심판" 한 종으로 줄였다. 둘 다 이중 경고를 막기 위한 조치이며 검출 범위는 같다.

### 8-5. 등재 직후 실측

| 지표 | 등재 전 (2026-09-18 live) | 등재 직후 | 위반 정리 후 |
|---|---|---|---|
| lint_terms `--all` | 0건 / 533파일 | **1,266건 / 225파일** | **0건 / 533파일** |
| physical-ai (frontmatter 기준) | 0건 | **82건 / 28파일** | **0건** |
| physical-ai 게이트 (`--category physical-ai`, index.md 절 포함) | 0건 | **83건 / 29파일** (index.md:125 색인 1건 포함) | **0건** (lint_style 게이트도 0건) |
| glossary-agents 등재 행 | 41행 (금지 28종) | **77행 (금지 66종)** | 77행 |
| glossary-llms 등재 행 | 38행 (금지 34종) | **59행 (금지 52종)** | 59행 |
| glossary-physical-ai 등재 행 | 155행 (금지 213종) | **154행 (금지 213종)** | 154행 |
| lint_links (용어집 3편) | error 0, warning 0 | error 0, warning 0 | error 0, warning 0 |

카테고리별 분포(파일 frontmatter `category:` 기준, index.md는 별도)는 다음과 같다. 스크래치 `stageA-violations.txt`(파일, 라인, 금지 표기, canonical, 용어집, 카테고리)와 `stageA-summary.txt`(카테고리별과 금지 표기별과 파일별 집계)가 Stage B의 분할 입력이다.

| 카테고리 | 건수 | 파일 수 | 주요 금지 표기 |
|---|---|---|---|
| database | 381 | 42 | 엔티티, 쿼리, 색인, 청크 |
| agents | 380 | 83 | 쿼리, 슬래시 명령, 색인, 청크, 프로바이더 |
| applications | 322 | 47 | 프로바이더, 색인, 쿼리, 엔티티 |
| physical-ai | 82 | 28 | 디노이징 38, 색인 14, 롤아웃 13, 확산 모델 7, 스킬 라이브러리 4, 은닉 상태 2, 상위 K 1, 오토인코더 1, 절제 실험 1, 청크 1 |
| llms | 45 | 8 | 코드북, 오토인코더 |
| overviews | 21 | 7 | |
| etc | 15 | 4 | |
| index.md | 11 | 1 | 색인 4, 슬래시 명령 3, 쿼리 1, 스킬 팩 1, 청크 1, 프로바이더 1 |
| evaluations | 9 | 5 | |
| 합계 | 1,266 | 225 | sources 516, wiki 739, index.md 11 |

금지 표기별 상위는 쿼리 203, 엔티티 172, 색인 164, 청크 100, 프로바이더 76, 슬래시 명령 51, 디노이징 38, 코드북 31, 하이브리드 검색 25, LLM-as-judge 25다. 파일별 상위는 rasmussen-2025-zep wiki 48건, sguys99-langchain-study-vectorless-rag wiki 34건, cheahjs-free-llm-api-resources wiki 32건이다.

스냅샷(4절)과의 차이는 다음과 같다.

- 등재 권고 31행 합계: 스냅샷 762건 / 161파일에서 live 778건 / 164파일. physical-ai 영향은 48건에서 68건. 증가분은 디노이징 19건(reuss-2026 두 파일 외에 jo-2026-groot-n1-vla-primer, 9bow-2026-physics-aware-generation 등 조사 이후 ingest된 자료)과 확산 모델 1건이다.
- 방향 결정 항목 합계: 488건 / 139파일, physical-ai 14건(전부 색인).
- 대량 3행(entity, chunk와 chunking, provider): 368건 / 59파일로 스냅샷과 같다.

Stage B가 알아 둘 점 세 가지를 남긴다.

1. 쿼리 203건 중 "SQL 쿼리" 5건과 "Cypher 쿼리" 6건은 데이터베이스 질의어 문맥이다. 규약상 "SQL 질의"로 바꾸거나 코드 스팬으로 감싸야 하며, 원어 query로 되돌리면 질의 canonical과 문서 내 혼용이 된다.
2. "다중 쿼리 확장" 6건은 5절이 "정착"으로 분류한 표기였으나 쿼리 금지로 함께 걸린다. "다중 질의 확장"으로 바꾼다.
3. physical-ai의 청크 1건은 glossary-physical-ai의 action chunk 계열 행과 같은 줄에서 이중 경고가 날 수 있다. 한 줄을 고치면 둘 다 사라진다.

### 8-6. 위반 정리 실행 내역 (Stage B, 2026-09-18)

카테고리별 병렬 subagent 5개가 정리했다 (database 42파일, agents 83파일, applications 49파일, physical-ai와 llms와 evaluations와 etc 46파일, overviews 7파일과 index.md). 편집 파일은 sources와 wiki와 index.md 합계 **234개**, diff는 1,355줄 삽입과 1,297줄 삭제이고 frontmatter는 전부 HEAD와 동일하다. 정리 후 여섯 lint 중 `lint_terms --all --strict`와 `lint_style --all --strict`가 exit 0이고, `lint_links`(bare-wikilink 35건), `lint_index`(entry-length 16건), `lint_figures`(164건), `audit_captions`(중복 30건)는 착수 시점 값 그대로다 (전부 7-7 소관). 사이트 `build:strict`는 exit 0, 카탈로그 274항목이 wiki 페이지 274와 일치한다.

치환 규모는 lint 줄 수 1,266건이지만 한 줄 복수 출현을 세면 약 1,650건이다 (database 407, agents 455, applications 348, physical-ai 외 약 160, overviews와 index 34, 지침 행 혼용 정리와 병기 추가 별도). 금지 표기별로는 쿼리 약 230, 엔티티 약 230, 색인 약 180, 청크 약 110, 프로바이더 약 85, 슬래시 명령 약 55, 디노이징 44가 상위다.

`lint-terms: ignore` 마커는 **12줄**에 새로 붙였고 전부 한국어 원문 직접 인용이다 (raw 대조 완료): hada gstack sources와 wiki의 GeekNews 인용 "오픈소스 소프트웨어 팩토리" 2줄, kim-2026 wiki의 "이밸" 표기 인용 1줄, prompt-to-loop overview의 Kang 한국어 이름 제시 문장 1줄, dnotitia wiki의 PDF 인용 "낡은 색인이 옛 답을 주는" 1줄, kmyu akb 비교 wiki의 표 라벨 인용 "엔티티 확장 제한적" 1줄, sguys99 vectorless-rag sources와 wiki의 README 인용 "벡터리스 RAG는" 2줄, 9bow turbovec sources의 원문 헤딩과 표기 지적 문장 3줄, dsba-2026 sources의 슬라이드 인용 1줄. 저장소 전체 마커 보유 파일은 16개다.

번역어 canonical의 첫 등장 원어 병기는 "질의(query)" 약 50개 문서, "진실의 원천(source of truth)" 6개 문서, "지시 파일(instruction file)" 6개 문서에 붙였다. 원어 canonical의 서술형 풀이 문장은 3곳(cheahjs provider, alex-xu vector database, todaycode entity)에만 추가했고 나머지는 문서가 이미 설명하고 있거나 부수 언급이라 넣지 않았다.

지침 행 혼용 정리는 스크래치 `mixed_notation.py`로 잡은 25파일에서 시작했고, 정규식 `\b`가 조사 붙은 어절을 놓치는 결함을 고쳐 재실행한 뒤 5건(shamsi sources의 지식 그래프, langchain-ai-openwiki의 knowledge graph, sguys99 vectorless-rag의 코퍼스, hou-2026과 cui-2025의 모달리티)을 오케스트레이터가 직접 정리했다. 재실행 잔여 11건은 전부 정당한 예외다: "Graph RAG"는 원논문 제목과 alex-xu 포스트의 3분류 명칭 인용, "Karpathy mixed corpus"는 raw 예제 제목 고유명, ginwind의 modality는 파일명 `modality.json`, hirose의 modality는 기법명(randomized modality fusion, modality dropout, modality masking)이다.

**Stage B가 드러낸 금지 표기의 다른 뜻 5종**은 용어집 비고에 지침으로 보강했다. (1) "프롬프트 주입"이 공격이 아니라 훅이 프롬프트를 넣는다는 뜻인 5건은 동사형이나 "프롬프트 삽입"으로 풀었다 (prompt injection 행). (2) "롤아웃"이 RL rollout이 아니라 배포(release rollout)인 bytebytego 5건은 원어로 통일하고 배포 의미도 원어로 쓴다고 비고에 적었다 (rollout 행). (3) "커뮤니티 요약"이 GraphRAG community가 아니라 "한국 커뮤니티가 쓴 요약"인 osmani 2건은 "한국 커뮤니티의 요약"으로 풀었다 (community 행). (4) "청크"가 RAG chunk가 아니라 SSE 스트리밍 chunk인 magnitude 3건은 같은 원어라 chunk로 두었다 (chunk 행). (5) "재현율"이 recall이 아니라 bug reproduction rate인 mattpocock 1건은 "재현 비율"로 바꿨다 (recall 행).

lint 사각지대 2건도 확인했다. `RE_LATIN_PAREN`이 "(LLM-as-judge)" 같은 라틴 괄호를 병기로 보고 마스킹해 ai-boost 두 파일의 금지 표기를 놓쳤고, 코드 펜스 안에 작성한 한글 텍스트(ASCII 다이어그램, 디렉토리 트리 주석)는 검사 밖이다. 두 경우 6줄은 문서 내 혼용을 없애려고 함께 고쳤다. 스크립트 수정은 하지 않았다 (Phase 7-5 후속 과제 후보).

Stage B가 남긴 것: (a) query 원어와 질의의 문서 내 혼용은 lint가 잡지 않으며 database 약 25파일과 lightrag overview 등에 기존부터 있다. 이번에 쿼리를 치환한 파일에는 조사 붙은 단독 query가 남지 않았고, 잔존은 query-to-triple, global sensemaking query 같은 기법명이다. (b) frontmatter `figures[].caption`의 금지 표기 3건(li-2026 "다중 홉", ryancodrai-turbovec "쿼리당")은 lint 검사 밖이라 두었다. (c) reuss-2026 wiki 149행 "diffusion 모델"은 반쪽 번역이나 위반 줄이 아니라 두었다. (d) A6이 "슬래시 명령어"로 통일했던 gstack 5편은 이번 승인으로 "슬래시 커맨드"가 됐다.

