---
title: "Open Knowledge Format (OKF)"
type: repo
year: 2026
category: etc
raw_path: raw/repos/google-okf/
raw_filename: "google-okf/"
source_collection: external
org: "GoogleCloudPlatform"
repo: "open-knowledge-format"
url: "https://github.com/GoogleCloudPlatform/open-knowledge-format"
license: "Apache-2.0 (LICENSE.md)"
spec_version: "0.2"
tags: [okf, knowledge-format, metadata, data-catalog, markdown, yaml-frontmatter, provenance, trust, attestation, bigquery, gemini, agent, visualizer]
---

## 한 줄 요약 (One-line Summary)

OKF(Open Knowledge Format)는 데이터와 시스템을 둘러싼 지식(메타데이터, 컨텍스트, 큐레이션된 통찰)을 YAML frontmatter가 달린 markdown 파일 디렉토리로 표현하는 벤더 중립 포맷이다. v0.2 명세는 provenance, trust, lifecycle, attestation을 frontmatter의 1급 항목으로 올려, 에이전트가 계속 고쳐 쓰는 지식 코퍼스를 별도 런타임 없이 신뢰할 수 있게 만드는 데 초점을 둔다. 저장소는 명세(`SPEC.md`)와 함께 생산 측 PoC인 reference agent와 소비 측 PoC인 visualizer를 동봉한다.

## 1. 자료 정보 (Document Information)

- 저장소: `GoogleCloudPlatform/open-knowledge-format`. raw에는 `README.md`(약 10KB)와 `SPEC.md`(약 38KB, OKF v0.2 명세 전문) 두 파일이 있다. 소스 코드, 테스트, bundle 산출물은 raw에 없다.
- 라이선스: frontmatter에는 Apache-2.0(LICENSE.md)으로 기록돼 있다. 그러나 README 본문에 라이선스 조항이 없고 raw에 `LICENSE.md`도 없어 현재 자료로는 검증할 수 없다.
- 핵심 산출물: `SPEC.md`(13개 절과 부록 A로 구성된 자기완결 명세), `reference_agent` 패키지(`enrich`와 `visualize` 두 서브커맨드), `bundles/`에 체크인된 bundle 4개(`ga4`, `stackoverflow`, `crypto_bitcoin`, `acme_retail`, 각각 `viz.html` 동봉), `samples/`의 recipe 3개(`ga4_merch_store`, `stackoverflow`, `crypto_bitcoin`).
- 기술 스택(README 기준): Python 3.13 가상환경, BigQuery(ADC 로그인과 과금 프로젝트 설정), Gemini(AI Studio의 `GEMINI_API_KEY` 또는 Vertex AI 환경변수 세 개), 시각화는 Cytoscape.js와 marked를 CDN에서 로드.
- 테스트 실행 명령은 `.venv/bin/pytest`다. 테스트 개수와 코드 구조는 raw에 기술이 없다.
- README는 저장소가 "primarily about the Open Knowledge Format"이라고 선언하고, reference agent를 "proof of concept demonstrating one way to produce OKF bundles automatically"로, visualizer를 "proof-of-concept consumer"로 규정한다.

## 2. 주요 기여 (Key Contributions)

1. 포맷 자체가 기여다. README는 "The format itself is the contribution"이라고 적고, 동봉된 agent와 visualizer는 생산과 소비 양단에서 포맷을 만질 수 있게 하는 장치라고 설명한다.
2. 최소 계약은 파일이다. 명세는 "If you can `cat` a file, you can read OKF; if you can `git clone` a repo, you can ship it"이라고 적는다. 스키마 레지스트리도 중앙 권위도 필수 도구도 없다.
3. 에이전트가 계속 쓰는 코퍼스를 전제로 한다. 명세 1절은 지식 코퍼스가 한 번 쓰이고 읽히는 자료가 아니라 에이전트가 지속적으로 작성하고 유지하는 자료가 되고 있다고 진단하고, 그때 소비자가 답을 얻어야 할 다섯 질문(provenance, trust, freshness, lifecycle, attestation)을 제시한다. v0.2는 이 가운데 provenance, trust, lifecycle, attestation을 1급 항목으로 만든다고 적는다.
4. 신뢰 점수 대신 신호를 기록한다. 점수는 주관적이고 소비자 사이에서 이식되지 않으며 낡는다는 이유로 저장하지 않는다. `sources` 항목마다 `author`, `usage_count`, `last_modified`라는 객관적 사실만 남기고 판단은 소비자에게 맡긴다. trust tier도 같은 방식으로 `verified`에서 유도할 뿐 저장하지 않는다.
5. Attested Computation은 새로 생긴 concept 타입이다. 수치의 의미만이 아니라 그 수치를 계산하는 승인된 방법까지 함께 실어, 소비자가 "에이전트가 즉석에서 지어낸 SQL이 아니라 승인된 계산이 실행됐다"를 결정적 코드로 확인하게 한다.
6. 소비는 관대하게 한다. optional 필드 누락, 모르는 `type` 값, 모르는 추가 키, 끊긴 cross-link, `index.md` 부재를 이유로 bundle을 거부해서는 안 된다(MUST NOT).
7. 생산과 소비 양단의 PoC를 동봉한다. reference agent는 BigQuery 메타데이터와 웹 문서에서 bundle을 만들고, `visualize` 서브커맨드는 bundle을 자기완결 HTML 한 장으로 렌더한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 목표와 비목표

명세 1절은 지식 표현이 갖춰야 할 성질을 네 가지로 든다. 도구 없이 사람이 읽을 수 있고(readable), 전용 SDK 없이 에이전트가 파싱할 수 있고(parseable), 버전 관리에서 diff가 되고(diffable), 도구와 조직과 시간을 넘어 이식된다(portable).

| 구분 | 항목 |
|---|---|
| 목표 1 | 생산자(사람, 에이전트, export 파이프라인)가 쓸 수 있는 범용 포맷 정의 |
| 목표 2 | 소비자(에이전트, UI, 검색 인덱스, 결정적 코드)가 읽고 순회하는 방법 안내 |
| 목표 3 | 시스템과 조직 사이의 지식 교환 촉진 |
| 목표 4 | 런타임을 규정하지 않으면서, 에이전트가 유지하는 코퍼스를 신뢰할 수 있게 하는 소수의 frontmatter 필드 표준화 |
| 비목표 1 | concept 타입의 고정 분류 체계 정의 |
| 비목표 2 | 저장, 서빙, 질의 인프라 규정 |
| 비목표 3 | 도메인 스키마(Avro, Protobuf, OpenAPI 등) 대체. OKF는 이들을 참조할 뿐 흡수하지 않는다 |
| 비목표 4 | executor와 attester가 가리키는 코드의 패키징이나 호출 표준. OKF는 인터페이스만 고정한다 |

README의 "Why OKF?" 절은 서비스가 소유하는 메타데이터 저장소와 대비해 이 선택이 주는 성질 9개를 나열한다. 사람과 에이전트가 읽을 수 있음, 즉시 버전 관리 가능, 이식성과 lock-in 없음, 구조와 비구조의 의도적 혼합, trust와 provenance와 freshness의 1급 취급, 최소 규정과 자유로운 확장, 기존 도구(Notion, Obsidian, MkDocs, Hugo, Jekyll)와의 결합, `index.md`를 통한 progressive disclosure, 트리가 아닌 그래프 형태다.

### 3.2 용어

| 용어 | 명세의 정의 |
|---|---|
| Knowledge Bundle (bundle) | 자기완결적이고 계층적인 지식 문서 모음. 배포 단위 |
| Concept | bundle 안 지식의 최소 단위. markdown 문서 하나. 테이블이나 API 같은 실체 자산도, 지표나 업무 프로세스 같은 추상 개념도 될 수 있다 |
| Concept ID | bundle 안 파일 경로에서 `.md`를 뗀 값 |
| Frontmatter | 파일 맨 위 `---`로 감싼 YAML 메타데이터 블록 |
| Body | frontmatter 이후의 전부 |
| Link | concept 사이의 표준 markdown 링크. 디렉토리 계층이 암시하는 부모와 자식 관계 너머의 관계를 표현한다 |
| Source | concept이 파생된 재료. bundle 외부일 수도 내부일 수도 있으며 `sources` 필드에 기록된다 |
| Provenance | concept이 파생된 source의 집합 |
| Credibility signal | source마다 붙는 객관적 사실(`author`, `usage_count`, `last_modified`). OKF는 신호를 기록하고 판정은 기록하지 않는다 |
| Actor | 누가 또는 무엇이 행위를 했는지 적는 문자열. 에이전트는 `<producer>/<version>`, 사람은 `human:<id>`, 자동 프로세스는 `process:<id>` |
| Trust tier | `verified` 필드에서 유도되는 단계. unverified, machine-confirmed, human-reviewed |
| Attested Computation | 값을 계산하는 승인된 방법을 담은 concept(`type: Attested Computation`). 소비자가 그 방법이 실행됐음을 확인하는 근거 |
| Executor | 계산을 실행하고 receipt를 돌려주는 실행 지침 또는 코드 |
| Receipt | 실행이 돌려주는 증거. `executor.receipt`가 형태를 정한다. 런타임 산출물이며 bundle에 저장하지 않는다 |
| Attester | receipt를 검사해 판정을 돌려주는 결정적(LLM 없음) 코드 |

### 3.3 bundle 구조와 예약 파일

bundle은 markdown 파일의 디렉토리 트리다. 디렉토리 구조는 도메인과 독립적이며 생산자가 지식에 맞게 자유롭게 짠다. 배포 형태는 git 저장소(이력, 귀속, diff를 제공하므로 권장), 디렉토리의 tarball이나 zip, 더 큰 저장소의 하위 디렉토리 세 가지가 허용된다(MAY).

예약된 파일명은 `index.md`(디렉토리 목록, 8절)와 `log.md`(갱신 이력, 9절) 둘뿐이다. 계층의 어느 위치에서든 정해진 의미를 가지며 concept 문서로 쓸 수 없다(MUST NOT). 나머지 모든 `.md`는 concept 문서다. 태그는 `tags` frontmatter 필드로 1급 개념이지만, 태그별로 문서를 모으는 별도 파일 포맷은 규정하지 않는다. 태그 열람 뷰가 필요한 소비자는 소비 시점에 frontmatter를 훑어 직접 합성한다.

### 3.4 concept 문서

모든 concept은 UTF-8 markdown 파일이고 YAML frontmatter 블록과 markdown 본문 두 부분으로 이루어진다.

| 키 | 구분 | 설명 |
|---|---|---|
| `type` | 필수 | concept의 종류를 나타내는 짧은 문자열. 소비자가 라우팅, 필터링, 표시에 쓴다. 예시 값은 `BigQuery Table`, `BigQuery Dataset`, `API Endpoint`, `Metric`, `Playbook`, `Reference`, `Attested Computation` |
| `title` | 권장 | 사람이 읽는 표시 이름. 없으면 소비자가 파일명에서 유도해도 된다(MAY) |
| `description` | 권장 | concept을 한 문장으로 요약. `index.md` 생성기, 검색 스니펫, 미리보기가 쓴다 |
| `resource` | 권장 | concept이 설명하는 실제 자산을 고유하게 가리키는 URI. 추상 개념에는 없다 |
| `tags` | 권장 | 횡단 분류용 짧은 문자열의 YAML 리스트 |
| provenance, trust, lifecycle 계열 | 선택 | 5절의 `sources`, `generated`, `verified`, `status`, `stale_after` |
| computation 계열 | 선택 | Attested Computation 타입의 `runtime`, `parameters`, `computation`, `executor`, `attester` |
| 기타 임의 키 | 확장 | 생산자는 어떤 키든 더할 수 있다(MAY). 소비자는 round-trip 시 모르는 키를 보존해야 하고(SHOULD) 모르는 필드를 이유로 문서를 거부해서는 안 된다(MUST NOT) |

`type`은 유일한 상시 필수 키이며 `type`만 가진 concept도 완전히 적합(conformant)하다. `type` 값은 중앙에 등록되지 않는다. 생산자는 설명적이고 자명한 값을 고르고(SHOULD) 소비자는 모르는 타입을 일반 concept으로 다루어 견뎌야 한다(MUST).

본문은 표준 markdown이다. 구조가 사람의 읽기와 에이전트의 retrieval 모두에 도움이 되므로, 자유 산문보다 헤딩, 목록, 표, 코드 펜스 같은 구조적 markdown을 권한다(SHOULD). 필수 본문 절은 없고 관용 헤딩 셋이 있다.

| 헤딩 | 용도 |
|---|---|
| `# Schema` | 자산의 컬럼이나 필드의 구조화된 설명 |
| `# Examples` | 구체적 사용 예시. 대개 코드 펜스 |
| `# Computation` | Attested Computation의 승인된 계산(10절) |

외부 source에 대한 주장별 귀속은 본문 인용 목록이 아니라 `sources` 항목에 연결된 markdown 각주로 한다. 명세는 예시로 `resource`가 있는 concept(`type: BigQuery Table`인 Customer Orders 문서, `# Schema` 표와 `# Joins` 절 포함)과 `resource`가 없는 concept(`type: Playbook`인 데이터 신선도 경보 대응 문서, `# Trigger`와 `# Steps` 절 포함)을 하나씩 든다.

### 3.5 provenance 계열 `sources`

5절의 세 계열(provenance, trust, lifecycle)은 "어디서 왔는가", "얼마나 믿을 것인가", "아직 현행인가"를 frontmatter만으로 답하게 만든다. 전부 optional이지만 부재 자체가 의미를 가진다. 검증되지 않은 concept은 검증된 것과 구별되지만 거부되지는 않는다. OKF의 모든 시각 값은 UTC 오프셋을 명시한 ISO 8601 datetime이다(예: `2026-06-30T14:00:00Z`).

`sources`는 concept이 파생된 재료를 기록한다.

| 항목 필드 | 필수 여부 | 설명 |
|---|---|---|
| `resource` | 항목 안에서 필수 | 소비자가 따라갈 수 있는 구체적 산출물(절대 URL, bundle 상대 경로, `references/` 하위 경로) 또는 따라갈 수 없는 모집단이나 범위 서술(예: `all queries in BigQuery project X`) |
| `id` | 선택 | 개별 주장을 귀속시키는 안정적 키. 본문이 이 source를 인용하면 있어야 한다(SHOULD) |
| `title` | 선택 | 사람이 읽는 라벨 |
| `author` | 선택 | source를 만든 주체. actor 규약을 따른다. 권위 신호 |
| `usage_count` | 선택 | `usage_window` 동안 `resource`가 얼마나 쓰였는지(대시보드 조회, 쿼리 실행, 페이지 읽기). 채택과 생존 신호. 단일 산출물이면 그 산출물의 실행 횟수, 범위 서술이면 그 범위 안에서 concept에 닿는 실행 횟수 |
| `last_modified` | 선택 | source 자체가 마지막으로 바뀐 시각. 최신성 신호. concept이 쓰인 시각인 `generated.at`과 구별된다 |

`usage_window`는 `sources`의 형제 키로 한 번 적어 모든 `usage_count`에 `{ from, to }` 구간을 부여한다. 개별 항목이 자기 `usage_window`를 가져 공유 값을 덮어써도 된다(MAY).

명세는 credibility score를 저장하지 않는 이유를 명시한다. 점수는 주관적이고 소비자 사이에서 이식되지 않으며 낡는다. 그래서 신뢰도는 trust tier와 같은 방식으로 신호에서 추론될 뿐 저장되지 않는다. `usage_count`에 대해서는 거친 신호라고 못 박는다. 살아 있는지 죽었는지, 자릿수가 어느 정도인지, 그 source 자신의 과거 이력과 비교해 어떤지 수준에서만 비교 가능하고, 종류가 다른 source 사이의 정밀한 순위로는 쓸 수 없다. 예약 쿼리의 실행 횟수와 사람이 일부러 본 대시보드 조회 수는 같은 무게가 아니기 때문이다. 소비자는 이를 생존과 추세로 읽어야 한다(SHOULD).

lineage는 별도 필드가 아니라 링크로 표현한다. `resource`가 같은 bundle의 다른 concept을 가리키면 파생 엣지는 이미 bundle 그래프에 있으므로, 소비자는 그 source의 `sources`로 재귀해 신뢰도를 전파시켜도 된다(MAY). 외부 말단 source는 자기 고유 신호만 갖는다. 명시적 외부 `derived_from`이나 데이터 lineage 같은 더 깊은 lineage는 v0.2 범위 밖이다.

주장별 귀속은 라벨이 `sources[].id`와 같은 markdown 각주로 한다. 명세 예시는 `The events_ table is sharded daily as events_YYYYMMDD.[^ga4-schema]`다. 각주 라벨이 `sources`로 들어가는 조인 키이고, 소비자는 각주 산문을 파싱하지 않고 일치하는 항목으로 귀속을 해석한다. 라벨을 위치(`sources[0]`)가 아니라 키로 두는 이유는 에이전트가 이 문서들을 끊임없이 다시 쓰기 때문이다. 목록 순서가 바뀌는 순간 위치 인덱스는 조용히 잘못 귀속되지만 안정적 `id`는 순서가 바뀌어도 같은 항목을 가리킨다.

### 3.6 trust 계열 `generated`와 `verified`

`generated`는 현재 내용이 어떻게 만들어졌는지, `verified`는 누가 또는 무엇이 그 내용을 source나 `resource`와 대조해 확인했는지 기록한다. 쓴 주체와 확인한 주체가 같을 이유가 없어서 둘을 분리한다.

| 키 | 설명 |
|---|---|
| `generated.by` | `generated` 안에서 필수. actor |
| `generated.at` | 내용의 마지막 의미 있는 변경 시각(ISO 8601). 최근 편집과 낡은 사실을 구별하는 데 쓴다 |
| `verified` | 확인 이벤트 목록. 각 항목은 `by`(actor)와 `at`(ISO 8601). 사람 승인과 야간 프로세스처럼 독립적 검사 여러 건을 담는다. "얼마나 최근인가"는 가장 늦은 `at`이다 |

`verified`는 `generated.at`과 독립적이다. 내용은 재확인 없이 바뀔 수 있고 사실은 재생성 없이 재확인될 수 있다. 확인 주체가 하나면 리스트 대시 없이 `{ by, at }` 매핑 하나로 적어도 되고(MAY), 소비자는 그 매핑을 1개짜리 리스트로 다루어야 한다(MUST).

trust tier는 소비자가 `verified`에서 유도한다.

| `verified` 상태 | trust tier |
|---|---|
| `verified` 키 없음 | unverified |
| `human:` 아닌 actor만 있음 | machine-confirmed |
| `human:<id>` actor 있음 | human-reviewed |

trust frontmatter가 없는 concept도 소비 가능하며 소비자는 거부해서는 안 된다(MUST NOT). trust tier는 권고 신호이지 접근 제어가 아니다.

### 3.7 lifecycle 계열 `status`와 `stale_after`

| `status` 값 | 의미 |
|---|---|
| `draft` | 아직 검토되지 않음. 불완전할 수 있음 |
| `stable` | 기본값. 소비 가능 |
| `deprecated` | 링크와 이력을 위해 유지하되 더 이상 현행이 아님 |

`status`가 없으면 `stable`이다. `stale_after`는 선택 키이며 절대 시각이다. concept은 `now >= stale_after`일 때 stale이다. 상대적 TTL이 아니라 절대 시각으로 두어야 신선도 판정이 "언제 읽었는가"를 참조하지 않는 단순 비교로 끝난다.

### 3.8 링크, 경로, `references/` 규약

concept 사이 링크는 표준 markdown 링크 두 형태를 지원한다. `/`로 시작해 bundle 루트 기준으로 해석되는 절대(bundle 상대) 형태가 권장인데, 문서가 하위 디렉토리 안에서 옮겨져도 안정적이기 때문이다(예: `[customers table](/tables/customers.md)`). 표준 상대 경로(예: `./other.md`)도 허용된다.

A에서 B로 가는 링크는 관계가 있다는 사실만 주장한다. 관계의 종류(부모와 자식, 참조, 조인, 의존)는 링크가 아니라 주변 산문이 전달한다. 그래프 뷰를 만드는 소비자는 보통 모든 링크를 타입 없는 관계의 방향 엣지로 다룬다. 소비자는 끊긴 링크를 견뎌야 한다(MUST). 대상이 bundle에 없는 링크는 잘못된 것이 아니라 아직 쓰이지 않은 지식일 수 있다.

| 경로 값 필드 | 위치 |
|---|---|
| `resource` | concept 최상위 |
| `sources[].resource` | provenance 항목. 범위 서술이면 경로가 아니다 |
| `computation` | Attested Computation |
| `executor.resource` | Attested Computation |
| `attester.resource` | Attested Computation |

각 경로 값 필드는 절대 URL, `/`로 시작하는 bundle 상대 경로, 상대 경로(예: `../computations/revenue.md`)를 받는다. `references/` 하위 디렉토리는 외부 자료, 실행 지침, 코드를 bundle 안의 1급 concept으로 미러링하는 관용 위치다. source, executor, attester가 흔히 여기를 가리킨다(예: `references/attesters/revenue.py`). 명명 규약이지 요구 사항은 아니다.

### 3.9 actor 규약

정체를 기록하는 필드(`generated.by`, `verified[].by`)는 하나의 actor 규약을 쓴다.

| 형식 | 대상 | 예시 |
|---|---|---|
| `<producer>/<version>` | 에이전트와 도구 | `reference_agent/gemini-2.5-pro` |
| `human:<id>` | 사람 | `human:ahormati` |
| `process:<id>` | 자동 프로세스 | `process:finance-nightly` |

trust를 분류하는 소비자는 `human:` 접두사로 판별하므로, 생산자는 손으로 쓰거나 사람이 확인한 내용에 이 접두사를 반드시 써야 한다(MUST).

### 3.10 `index.md`와 `log.md`

`index.md`는 bundle 루트를 포함한 어느 디렉토리에나 둘 수 있다(MAY). 디렉토리 내용을 열거해 progressive disclosure를 지원한다. progressive disclosure는 개별 문서를 열기 전에 사람이나 에이전트가 무엇이 있는지 먼저 보게 하는 설계다. index 파일은 frontmatter를 갖지 않는다. 유일한 예외로 bundle 루트 `index.md`는 `okf_version` 키를 실을 수 있다(MAY). 본문은 헤딩 아래 concept을 묶는 하나 이상의 절로 이루어지고, 각 항목은 `* [Title](relative-url) - short description` 형식이다. 항목에는 링크된 concept frontmatter의 `description`을 포함해야 한다(SHOULD). 생산자는 `index.md`를 자동 생성해도 되고 소비자는 없을 때 즉석에서 합성해도 된다(MAY).

`log.md`는 계층의 어느 위치에나 두어 그 범위의 변경 이력을 기록한다(MAY). 형식은 날짜별로 묶은 항목의 평면 목록이며 최신이 먼저 온다. 날짜 헤딩은 ISO 8601 `YYYY-MM-DD` 형식이어야 한다(MUST). 항목은 산문이고, 앞머리의 굵은 단어(`**Update**`, `**Creation**`, `**Deprecation**`)는 관례이지 요구 사항이 아니다.

### 3.11 Attested Computation

Attested Computation concept은 값이 무엇을 뜻하는지만이 아니라 그 값을 계산하는 승인된 방법을 담는다. provenance(5.1절)가 "이 주장은 어디서 왔는가"에 답한다면 attestation은 "이 수치는 우리가 정한 방식대로 만들어졌는가"에 답한다. OKF는 계산과 그것을 검사할 수단을 기록할 뿐 스스로 아무것도 실행하지 않는다.

승인된 계산은 `type: Attested Computation`인 독립 concept이다. 값이 필요한 concept(`Metric`, `BigQuery Table`)은 보통의 markdown 링크로 그 concept을 가리킨다. 독립 concept으로 두는 근거는 셋이다.

| 근거 | 설명 |
|---|---|
| `runtime`이 `parameters`의 의미를 정한다 | 같은 파라미터가 runtime에 따라 SQL 바인드 변수, dbt var, Python 인자가 된다. 둘을 한 frontmatter에 두어야 바인딩 의미가 자명하다 |
| 계산 하나에 소비자 여럿 | 같은 계산이 지표, 대시보드 concept, 리포트를 뒷받침한다. concept이면 한 번 참조하고 재사용한다 |
| trust 상태는 계산 단위다 | `verified`, `stale_after`, 단일 `attester`가 한 대상을 기술한다. 매출, 이익, 마진은 각각 따로 verify되고 attest되므로 frontmatter 하나에 항목 셋이 아니라 concept 셋이다 |

계약은 concept의 최상위 frontmatter다. 5절의 세 계열에 더해 다음 키를 갖는다.

| 키 | 필수 여부 | 설명 |
|---|---|---|
| `runtime` | 이 타입에서 필수 | 계산을 어떻게 실행하는지, 그래서 executor와 attester가 어떻게 해석하고 `parameters`가 무엇을 뜻하는지를 정하는 단일 필드. 예시 값은 `bigquery`, `postgres`, `dbt`, `python`, `Looker` |
| `parameters` | 선택 | 에이전트가 채워도 되는 타입 있는 이름 붙은 구멍의 목록. 항목마다 `{ name, type, required }`. 바인딩 의미는 `runtime`을 따른다 |
| `computation` | 선택 | 계산을 담은 파일 경로. 본문 인라인 펜스 대신 쓴다. 없으면 본문 `# Computation` 펜스가 계산이다 |
| `executor` | 선택 | `resource`는 실행 지침이나 코드를 가리키고 러너(에이전트 또는 결정적 소비자 코드)가 따른다. `receipt`는 실행이 반환해야 할 필드, 즉 attester가 검사할 증거를 선언한다(예: BigQuery `job_id`와 실제 실행된 SQL) |
| `attester` | 선택 | 결정적 검사. `resource`는 receipt를 받아 판정을 돌려주는 코드(LLM 없음)를 가리킨다. 소비자 쪽에서 실행되는 것을 전제한다 |

`resource` 뒤에 무엇이 있는지(스킬, 스크립트, 컨테이너)는 패키징 선택이다. OKF는 인터페이스를 고정하고 패키징은 규정하지 않는다. 명세 10.2절의 예시는 `runtime: bigquery`, `parameters`에 `year`(integer, required), `executor.resource: references/skills/run-on-bq.md`, `executor.receipt: [job_id, executed_sql, result]`, `attester.resource: references/attesters/revenue.py`, `verified: { by: human:ahormati, at: 2026-06-25T09:00:00Z }`, `stale_after: 2026-09-23T00:00:00Z`, `sources`에 매출 인식 규정 문서를 가진 "Revenue for fiscal year" concept이다. 본문 `# Computation`에는 `SELECT SUM(amount) AS revenue FROM finance.recognized_revenue WHERE fiscal_year = @year`가 있고, 그 아래 산문이 `[^rev-policy]` 각주로 규정 문서에 귀속된다.

계산은 두 방식 중 하나로 제공한다. 인라인 방식은 본문 `# Computation` 아래 코드 펜스 하나에 두며 계약과 함께 검토되는 짧은 계산에 맞는다. 파일 방식은 `computation`에 경로를 적고 본문 펜스를 생략하며, 길거나 생성된 계산 또는 OKF 외 도구와 공유하는 실제 파일에 맞는다(예: `computation: references/computations/lib/revenue.sql`).

에이전트는 선언된 `parameters`의 값만 줄 수 있고(MAY) 계산을 쓰거나 고쳐서는 안 된다(MUST NOT). `computation`에 파라미터 값을 바인딩해 실행 가능한 산출물을 만드는 일은 소비자 몫이고, attester는 같은 바인딩을 독립적으로 다시 유도해 실제 실행된 것과 비교한다. 비교 대상이 receipt가 담은 전개되고 컴파일된 산출물(`executed_sql`, `compiled_sql`)이므로, 다시 쓴 쿼리, 바꿔치기한 계산 파일, 변조된 의존성은 검사에 실패한다. 타입이 있는 파라미터 전용 표면이 "승인된 것이 실행됐는가"를 판단이 아니라 기계적 비교로 만든다.

문서 하나가 계산 하나인 경우는 드물다. 매출, 이익, 마진을 논하는 손익계산서 개요는 읽을 수 있는 concept 하나로 남고 수치마다 Attested Computation 하나씩을 링크한다. 명세 예시는 `type: Metric`인 Revenue concept이 `# Definition`에서 `[the revenue computation](../computations/revenue.md)`를 가리키는 형태다. 계산마다 concept이 따로 있으므로 매출은 신선한데 이익은 `stale_after`를 넘긴 상태가 가능하고 각각 자기 실행에 대해 attest한다. 같은 폴더에 모으는 것(`computations/` 폴더와 `index.md`)은 디렉토리 선택이지 frontmatter 선택이 아니다.

소비자 흐름은 명세가 informative로 표시한 6단계다. 아래의 런타임 산출물은 bundle에 저장되지 않는다.

| 단계 | 내용 |
|---|---|
| 1. Discover | `type: Attested Computation`으로 발견. `index.md`로 끌어올릴 수 있는 frontmatter 신호이며, 직접 도달하거나 이를 쓰는 concept의 링크를 따라 도달한다 |
| 2. Load | frontmatter에서 계약을, 본문(또는 `computation`이 가리키는 파일)에서 계산을 읽는다 |
| 3. Parameterize | 에이전트가 선언된 파라미터의 값을 준다 |
| 4. Execute | executor가 바인딩된 계산을 실행하고 `executor.receipt` 형태의 receipt를 돌려준다 |
| 5. Attest | 소비자가 receipt에 attester를 실행한다. provenance(실행된 계산이 에이전트가 쓴 SQL이 아니라 주장된 파라미터로 바인딩한 `computation`과 같은지)와 fidelity(표시된 값이 receipt의 권위 있는 source와 일치하는지, 에이전트 텍스트가 아니라 job id로 다시 읽어서)를 확인한다 |
| 6. Gate | 실패한 attestation은 표시를 거부한다. `now >= stale_after`이면 경고하거나 거부한다. 성공하면 판정(예: job 로그 링크)을 노출해 신뢰를 눈에 보이게 한다 |

`verified`와 attestation은 구별되며 둘 다 필요하다. `verified`는 정의가 여전히 규정과 맞는지 확인하는 문서 수준의 느린 절차이고 bundle에 기록된다. attestation은 한 번의 실행이 승인된 방식으로 값을 냈는지 확인하는 호출 단위의 런타임 절차이고 bundle에 저장되지 않는다. 정의가 낡은 concept도 깨끗하게 attest될 수 있고, 방금 verify된 정의도 실행마다 attestation이 필요하다.

### 3.12 적합성과 버전

bundle이 OKF v0.2에 적합(conformant)하려면 세 조건을 만족한다. 예약되지 않은 모든 `.md`가 파싱 가능한 YAML frontmatter 블록을 가진다. 모든 frontmatter 블록이 비어 있지 않은 `type`을 가진다. 예약 파일(`index.md`, `log.md`)이 있으면 8절과 9절의 구조를 따른다.

trust, lifecycle, provenance, computation 계열이 있으면 생산자는 5절부터 10절을 따라야 하고(SHOULD) 소비자에게는 다음 의무가 있다.

| 강도 | 소비자 의무 |
|---|---|
| MUST | 리스트 대시 없는 `verified` 매핑을 1개짜리 리스트로 취급한다 |
| MUST NOT | optional 계열이 없다는 이유로 concept을 거부하지 않는다 |
| SHOULD | trust tier와 staleness를 명세된 필드에서만 유도한다 |
| SHOULD | 실패한 attestation을 조용히 버리지 않고 드러낸다 |

나머지 제약은 소비자가 느슨한 권고로 취급해야 한다(SHOULD). 특히 optional frontmatter 필드 누락, 모르는 `type` 값, 모르는 추가 frontmatter 키, 끊긴 cross-link, `index.md` 부재를 이유로 bundle을 거부해서는 안 된다(MUST NOT).

버전은 `<major>.<minor>`로 매긴다. minor 상승은 하위 호환 추가(새 optional 필드, 새 관용 절 헤딩)이고 major 상승은 breaking change(필수 필드 이름 변경, 예약 파일명 변경)를 포함할 수 있다. bundle은 루트 `index.md`의 frontmatter 블록에 `okf_version: "0.2"`로 목표 버전을 선언할 수 있으며(MAY) 이곳이 `index.md`에 frontmatter가 허용되는 유일한 자리다. 선언된 버전을 모르는 소비자는 거부 대신 최선 소비를 시도해야 한다(SHOULD).

명세는 다음 항목을 의도적으로 후속 개정으로 미룬다고 적는다.

- 전체 런타임 프로토콜: receipt와 판정의 wire format, 실행을 둘러싼 attestation 수명주기
- attester의 ABI, 이식성, 샌드박싱. 서빙과 스킬에 관한 후속 작업과 함께 묶일 가능성이 크다고 적는다
- attestation 캐싱
- semantic layer 템플릿(Looker, dbt). attester의 비교가 SQL 동일성에서 모델과 바인딩 동일성으로 옮겨가는 경우

### 3.13 v0.1 대비 변경

v0.2는 v0.1을 대체하며 12절 기준으로 minor 상승이지만, v0.1 필드의 이름을 바꾸거나 퇴역시키는 의도적 breaking change 둘을 따로 밝힌다. v0.1 bundle은 아래 폴백으로 v0.2 소비자가 소비할 수 있다.

| 구분 | 변경 | 폴백 |
|---|---|---|
| breaking | `timestamp`가 `generated.at`으로 대체. 마지막 내용 변경은 `generated: { by, at }`에 기록 | `generated`가 없으면 소비자가 legacy `timestamp`로 폴백해도 된다(MAY) |
| breaking | 본문 `# Citations` 목록이 `sources`로 대체. provenance가 frontmatter로 이동 | 소비자는 `sources`를 읽어야 하고(SHOULD) v0.1 문서의 legacy `# Citations`를 계속 파싱해도 된다(MAY) |
| 추가 | 새 frontmatter 계열: `sources`와 항목별 신뢰도 신호(`author`, `usage_count`, `last_modified`)와 형제 키 `usage_window`, `generated`, `verified`, `status`, `stale_after` | 없으면 평범한 v0.1 concept |
| 추가 | 새 concept 타입 `Attested Computation`과 계산 키 `runtime`, `parameters`, `computation`, `executor`, `attester` | 없으면 평범한 v0.1 concept |
| 추가 | 새 관용 본문 헤딩 `# Computation` | 없으면 평범한 v0.1 concept |
| 추가 | `generated.by`와 `verified[].by`의 actor 규약 | 없으면 평범한 v0.1 concept |

bundle 구조, 예약 파일명, 필수 `type`, 권장 `title`, `description`, `resource`, `tags`, cross-linking, index 파일, log 파일, 관대한 적합성은 변경 없이 그대로 넘어왔다.

### 3.14 reference agent

README에 따르면 reference agent는 두 pass로 실행된다. BQ pass는 BigQuery 메타데이터만으로 source가 광고하는 concept마다 OKF 문서를 하나씩 쓴다. web pass는 LLM을 자체 크롤러로 쓴다. `--web-seed` 또는 `--web-seed-file`로 받은 seed URL 목록을 `fetch_url` 도구로 가져오고, 바깥으로 나가는 링크가 기존 concept의 권위 있는 문서처럼 보이는지에 따라 따라갈지 정한다. 가져온 페이지마다 에이전트는 (a) 기존 concept 문서 하나 이상을 보강, (b) 독립 `references/<slug>` 문서 신설, (c) 건너뛰기 중 하나를 고른다. `--web-max-pages` 상한과 동일 도메인 허용 호스트 필터(`--web-allowed-host`로 설정)는 도구 안쪽에서 강제되어 에이전트가 초과 실행할 수 없다. `--no-web`은 web pass를 건너뛴다.

| 명령 또는 옵션 | 의미 |
|---|---|
| `python3.13 -m venv .venv` 후 `.venv/bin/pip install --index-url https://pypi.org/simple/ -e .[dev]` | 설치 |
| `gcloud auth application-default login`, `gcloud config set project <id>` | BigQuery 자격 증명. 공개 데이터셋은 읽을 수 있지만 쿼리 바이트는 호출자 프로젝트에 과금된다 |
| `GEMINI_API_KEY` | AI Studio 경로의 Gemini 자격 증명 |
| `GOOGLE_GENAI_USE_VERTEXAI=true`, `GOOGLE_CLOUD_PROJECT=<id>`, `GOOGLE_CLOUD_LOCATION=<region>` | Vertex AI 경로의 Gemini 자격 증명 |
| `.venv/bin/python -m reference_agent enrich --source bq --dataset <project>.<dataset> --web-seed-file <path/to/seeds.txt> --out ./bundles/<name>` | 최소 실행. seed를 생략하거나 `--no-web`을 주면 BQ 전용 |
| `--concept <type>/<name>` | concept 하나만 반복 작업(예: `--concept tables/events_`). 반복 지정 가능 |
| `--web-seed`, `--web-seed-file` | web pass의 seed URL |
| `--web-max-pages` | web pass가 가져올 페이지 수 상한 |
| `--web-allowed-host` | 동일 도메인 허용 호스트 필터 설정 |
| `--no-web` | web pass 생략 |

### 3.15 visualizer

`visualize` 서브커맨드는 임의의 OKF bundle을 자기완결 인터랙티브 HTML 파일 하나로 렌더한다. 파일 하나이고 백엔드가 없으며 보는 쪽에 설치가 필요 없다. 최신 브라우저에서 열거나, 산출물로 공유하거나, 정적 파일 서버에 올리거나, 이 저장소처럼 bundle 옆에 커밋할 수 있다. README는 이 뷰어를 OKF의 PoC 소비자로, reference agent를 PoC 생산자로 대응시킨다.

| 화면 요소 | 내용 |
|---|---|
| force-directed 그래프 | bundle의 모든 concept. 노드 색은 타입별(datasets, tables, references 등), 방향 엣지는 본문 cross-link에서 뽑는다 |
| 상세 패널 | 선택한 concept의 frontmatter(description, resource 링크, tags)와 렌더된 본문. 내부 `[…](/path/to/concept.md)` 링크는 경로를 따라가지 않고 뷰어 안에서 이동하도록 재연결된다 |
| Cited by 백링크 | 링크 그래프의 역방향에서 계산한 목록 |
| 검색 상자 | title, concept id, tags에 매칭 |
| 타입 필터 | 타입별 표시 전환 |
| 레이아웃 전환 | cose, concentric, breadth-first, circle, grid |

| 플래그 | 기본값 | 설명 |
|---|---|---|
| `--bundle` | 필수 | bundle 루트 디렉토리 |
| `--out` | `<bundle>/viz.html` | 출력 HTML 경로 |
| `--name` | bundle 디렉토리명 | 뷰어 헤더에 표시할 이름 |

HTML은 bundle을 JSON blob으로 내장하고, 그래프에는 Cytoscape.js를, 브라우저 내 markdown 렌더링에는 marked를 쓰며 둘 다 CDN에서 로드한다. 데이터는 페이지 밖으로 나가지 않는다. bundle은 생성 시점에 한 번 파싱되어 파일에 직렬화된다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

정량 벤치마크는 없다. 명세와 PoC 저장소이므로 결과는 재현 가능한 bundle로 제시된다. 각 sample은 seed URL과 정확한 `enrich` 명령을 담은 recipe(`samples/<name>/`)와 그 recipe가 생성한 bundle(`bundles/<name>/`)의 짝이다.

| sample | 데이터 | README가 적은 시험 목적 | recipe | bundle |
|---|---|---|---|---|
| GA4 Google Merchandise Store | 공개 e-commerce 데이터셋. canonical GA4 BigQuery Export 문서 URL을 seed로 사용 | (기술 없음) | `samples/ga4_merch_store/README.md` | `bundles/ga4/` |
| Stack Overflow | 공개 데이터셋(Stack Exchange Data Dump의 미러). 커뮤니티의 canonical 스키마 참조를 seed로 사용 | 횡단 문서 페이지에서 여러 concept을 함께 보강 | `samples/stackoverflow/README.md` | `bundles/stackoverflow/` |
| Bitcoin (crypto) | `bitcoin-etl` 파이프라인의 공개 데이터셋(blocks, transactions, inputs, outputs) | 테이블 간 foreign key 관계를 산문으로 기술 | `samples/crypto_bitcoin/README.md` | `bundles/crypto_bitcoin/` |
| Acme Retail | (기술 없음) | (기술 없음) | (README에 recipe 없음) | `bundles/acme_retail/` |

명세 쪽 실증은 부록 A의 손익계산서 예제다. 매출과 매출총이익 두 수치를 담은 v0.1 단일 문서를 서술 concept 하나와 Attested Computation 둘로 나누는 v0.1에서 v0.2로의 마이그레이션이다. v0.1 형태는 두 수치를 한 `type: Metric` concept에 두고, SQL은 에이전트가 읽거나 무시하거나 다시 쓸 수 있는 산문 속 코드였으며, 인용은 `# Citations` 아래 평면 목록이고, 시각은 `timestamp: '2026-05-28T22:53:05+00:00'` 하나뿐이었다.

v0.2 형태의 디렉토리 배치는 `bundles/finance/` 아래 `metrics/income-statement.md`(Metric, 서술과 링크), `computations/revenue.md`(Attested Computation, bigquery), `computations/profit.md`(Attested Computation, dbt), `references/skills/run-on-bq.md`와 `run-dbt.md`, `references/attesters/sql-equality.py`와 `dbt-binding.py`다. `metrics/income-statement.md`는 `status: stable`, `generated`(reference_agent/gemini-2.5-pro, 2026-06-20), `verified`(human:ahormati, 2026-06-25), `stale_after: 2026-12-31`, `sources`에 FP&A 보고 핸드북(`fpa-handbook`)을 가지며, 본문은 두 계산을 링크하고 각주로 핸드북에 귀속한다. 명세는 이 문서에 대해 "trust는 이 문서가 아니라 링크한 대상에 산다"고 적는다.

| 항목 | `computations/revenue.md` | `computations/profit.md` |
|---|---|---|
| `runtime` | `bigquery` | `dbt` |
| `parameters` | `year`(integer, required) | `year`(integer, required), `segment`(string, required) |
| `executor.resource` | `references/skills/run-on-bq.md` | `references/skills/run-dbt.md` |
| `executor.receipt` | `[job_id, executed_sql, result]` | `[run_id, compiled_sql, result]` |
| `attester.resource` | `references/attesters/sql-equality.py` | `references/attesters/dbt-binding.py` |
| `generated` | `reference_agent/gemini-2.5-pro`, 2026-06-28T14:00:00Z | `reference_agent/gemini-2.5-pro`, 2026-06-14T14:00:00Z |
| `verified` | `human:ahormati`, 2026-06-25T09:00:00Z | `process:finance-nightly`, 2026-06-12T08:00:00Z |
| trust tier (유도) | human-reviewed | machine-confirmed |
| `stale_after` | 2026-12-31T00:00:00Z (신선) | 2026-06-15T00:00:00Z (경과) |
| `sources` | `rev-policy`(매출 인식 규정, author `team:finance-fpa`, last_modified 2026-04-02), `exec-rev-dash`(임원 매출 대시보드 `dashboards/exec-revenue`, author `team:finance-fpa`, usage_count 5000, last_modified 2026-06-18) | `cost-alloc`(원가 배분 기준) |
| `usage_window` | 2026-06-01부터 2026-06-30 | (없음) |
| `# Computation` | `SELECT SUM(amount) AS revenue FROM finance.recognized_revenue WHERE fiscal_year = @year` | `SELECT gross_profit FROM {{ ref('fct_income_statement') }} WHERE fiscal_year = {{ var('year') }} AND segment = {{ var('segment') }}` |

두 계산은 일부러 다른 상태에 놓여 있어 같은 소비자가 한 bundle 안에서 두 가지 다른 판정에 도달한다. 매출은 사람이 verify했고 신선하며 사용량 신호가 붙은 살아 있는 대시보드 source가 뒷받침한다. 매출총이익은 프로세스가 verify했고 `stale_after`를 넘겼다. 두 예시 모두 `generated.at`이 `verified.at`보다 늦어, 마지막 내용 변경 이후 재확인이 없었던 상태를 보여 준다. 이는 5.2절이 말하는 "내용은 재확인 없이 바뀔 수 있다"의 사례다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

명세 12절이 스스로 미뤘다고 밝힌 항목은 다음과 같다.

- 전체 런타임 프로토콜(receipt와 판정의 wire format, 실행을 둘러싼 attestation 수명주기)이 비어 있다. attestation은 현재 인터페이스 선언까지만 표준이다.
- attester의 ABI, 이식성, 샌드박싱이 미정이며 서빙과 스킬 관련 후속 작업과 함께 다뤄질 가능성이 크다고 적혀 있다. attester가 소비자 쪽에서 실행되는 것을 전제하면서 격리 규약은 아직 없다.
- attestation 캐싱이 미정이다.
- semantic layer 템플릿(Looker, dbt)이 미정이다. 비교 기준이 SQL 동일성에서 모델과 바인딩 동일성으로 옮겨가는 경우다.
- lineage는 링크로만 표현하며, 명시적 `derived_from`이나 데이터 lineage는 v0.2 범위 밖이라고 5.1절이 밝힌다.
- `usage_count`는 명세 스스로 거친 신호라고 못 박는다. 종류가 다른 source 사이의 정밀한 순위로는 쓸 수 없다.

자료 자체의 서술 불일치는 다음과 같다.

- README 상단은 "three ready-to-browse bundles"라고 적으면서 바로 아래에 bundle 4개(`ga4`, `stackoverflow`, `crypto_bitcoin`, `acme_retail`)를 나열한다. Samples 절의 recipe는 3개뿐이고 `acme_retail`의 recipe와 설명은 README에 없다.
- 명세 1절은 소비자의 질문을 다섯 개(provenance, trust, freshness, lifecycle, attestation)로 들면서, 바로 이어지는 문장에서 v0.2가 1급으로 만든 항목은 provenance, trust, lifecycle, attestation 넷이라고 적는다. freshness는 별도 계열 이름 없이 5.5절의 `stale_after`가 담당한다.
- 명세 13절은 v0.2가 12절 기준으로 minor 상승이라고 적으면서 동시에 의도적 breaking change 둘을 밝힌다. 12절의 정의상 breaking change는 major 상승이 포함할 수 있는 것이다. 명세는 이 예외를 "called out below because they rename or retire v0.1 fields"라고 설명한다.

현재 raw로 확인할 수 없는 항목은 다음과 같다.

- 라이선스. README 본문에 라이선스 조항이 없고 raw에 `LICENSE.md`가 없다. 저장소의 LICENSE 파일을 직접 확인해야 한다.
- 소스 코드 구조, 테스트 개수, `enrich`의 내부 프롬프트와 파싱 방식. raw는 README와 SPEC 두 파일뿐이다.
- BigQuery 외 `--source` 값의 지원 여부. README는 `--source bq`만 보여 준다.
- 저장소의 이전 위치나 v0.1 저장소와의 관계. README와 SPEC 어디에도 기술이 없다.
- 무결성 검사(끊긴 링크, 모르는 타입) 절차. 명세는 소비자가 이를 견뎌야 한다고만 적고 검사 방법은 규정하지 않는다.

## 6. 관련 연구 (Related Work)

README와 SPEC이 직접 언급하는 외부 시스템은 다음과 같다. 학술 논문 인용은 없다.

- 에이전트 프레임워크: Google ADK, LangChain, custom. README는 어느 프레임워크로 만든 에이전트든 OKF를 생산할 수 있다고 적는다.
- 기존 데이터 카탈로그: Dataplex, Unity Catalog, Collibra. README는 이들에서 나오는 export 파이프라인을 OKF 생산자의 한 예로 들고, "서비스가 소유하는 메타데이터 저장소"와 대비해 파일 기반의 장점을 설명한다.
- markdown과 YAML frontmatter를 이미 읽는 지식 도구: Obsidian, Notion, MkDocs, Hugo, Jekyll. README는 이들이 custom UI 없이 bundle을 열람, 편집, 렌더할 수 있다는 근거로 든다.
- 도메인 스키마: Avro, Protobuf, OpenAPI. 명세의 비목표 절이 대체 대상이 아니라 참조 대상이라고 명시한다.
- 계산 runtime: bigquery, postgres, dbt, python, Looker. 명세 10.2절의 `runtime` 예시 값이며, Looker와 dbt는 12절의 semantic layer 템플릿 유보 항목에도 등장한다.
- 시각화 라이브러리: Cytoscape.js, marked.

## 7. 용어집 (Glossary)

- **OKF (Open Knowledge Format)**: YAML frontmatter markdown 파일 디렉토리로 지식을 표현하는 벤더 중립 포맷. 현재 v0.2.
- **bundle (Knowledge Bundle)**: concept 문서를 담은 자기완결 디렉토리 트리. 배포 단위.
- **concept**: bundle 안 지식의 최소 단위인 markdown 문서 하나. concept ID는 bundle 내 경로에서 `.md`를 뗀 값.
- **provenance**: concept이 파생된 source의 집합. `sources` frontmatter에 기록된다.
- **credibility signal**: source마다 붙는 객관적 사실(`author`, `usage_count`, `last_modified`). OKF는 신호만 기록하고 점수는 저장하지 않는다.
- **actor**: 정체를 적는 규약. `<producer>/<version>`, `human:<id>`, `process:<id>`.
- **trust tier**: `verified`에서 유도되는 unverified, machine-confirmed, human-reviewed 세 단계. 저장되지 않는 권고 신호.
- **Attested Computation**: 값을 계산하는 승인된 방법을 담은 concept 타입. 소비자가 그 방법대로 계산됐는지 확인하는 근거.
- **executor**: 계산을 실행해 receipt를 돌려주는 실행 지침이나 코드.
- **receipt**: 실행이 남기는 증거. `executor.receipt`가 필드를 정하며 bundle에 저장하지 않는 런타임 산출물.
- **attester**: receipt를 검사해 판정을 내는 결정적 코드. LLM을 쓰지 않으며 소비자 쪽에서 실행된다.
- **attestation**: 한 번의 실행이 승인된 계산으로 값을 냈는지 확인하는 런타임 절차. 문서 수준 확인인 `verified`와 구별된다.
- **progressive disclosure**: bundle 전체를 컨텍스트에 올리지 않고 `index.md`로 계층을 한 단계씩 열어보게 하는 설계.
- **permissive consumption**: optional 누락, 모르는 타입, 끊긴 링크로 bundle을 거부하지 않는 원칙.
- **reference agent**: bundle을 자동 생산하는 PoC 에이전트. BQ pass와 web pass로 실행된다.
