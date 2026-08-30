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

OKF(Open Knowledge Format)는 데이터·시스템을 둘러싼 지식을 YAML frontmatter가 달린 markdown 파일 디렉토리로 표현하는 벤더 중립 포맷이다. v0.2는 출처·신뢰·수명주기·attestation을 frontmatter의 1급 항목으로 올렸다. 에이전트가 계속 고쳐 쓰는 지식 코퍼스를 별도 런타임 없이 믿을 만한 상태로 유지하는 데 초점을 맞췄다.

## 1. 자료 정보 (Document Information)

- **저장소**: GoogleCloudPlatform/open-knowledge-format (Apache-2.0). 이전에는 `GoogleCloudPlatform/knowledge-catalog` 안의 `okf/` 하위 프로젝트였다. 이번에 독립 저장소로 분리되면서 명세도 v0.1 → v0.2로 올라갔다.
- **핵심 산출물**: `SPEC.md` (OKF v0.2, 자기완결 명세 — 13개 절 + 부록), `reference_agent` (생산자 PoC), `visualize` 서브커맨드 (소비자 PoC)
- **기술 스택**: Python 3.13, BigQuery 메타데이터, Gemini(AI Studio의 `GEMINI_API_KEY` 또는 Vertex AI), Cytoscape.js + marked (visualizer)
- **동봉 bundle**: `bundles/`에 GA4 e-commerce, Stack Overflow, Bitcoin, Acme Retail 네 개가 체크인되어 있고 각각 `viz.html`이 붙어 있다
- **명세 위치**: `raw/repos/google-okf/SPEC.md` (전문), README는 같은 폴더의 `README.md`

## 2. 주요 기여 (Key Contributions)

1. 저장소가 앞세우는 것은 OKF 포맷 자체다. reference agent와 visualizer는 생산·소비 양단에서 포맷을 만져보는 예시라고 명시된다.
2. *"cat 하면 읽을 수 있고, git clone 하면 배포할 수 있다."* 파일이 곧 최소 계약이다. 스키마 레지스트리도, 중앙 권위도, 필수 도구도 없다. bundle은 git 저장소·tarball·큰 저장소의 하위 디렉토리 어느 형태로도 배포된다.
3. v0.2의 방향 전환은 에이전트가 쓰는 코퍼스를 전제로 한다. 명세는 지식 코퍼스가 한 번 쓰이고 읽히는 데서 끝나지 않고 에이전트가 계속 고쳐 쓰고 유지한다는 관찰에서 출발한다. 그래서 소비자가 물어야 할 다섯 질문을 frontmatter가 받는다. 무엇으로부터 만들어졌나(provenance), 얼마나 믿을 수 있나(trust), 아직 사실인가(freshness), 현행 판인가(lifecycle), 우리가 정한 방식대로 계산된 수치인가(attestation).
4. 신뢰 점수는 저장하지 않고 신호만 남긴다. 점수가 주관적이고 소비자 사이에서 이식되지 않으며 금방 낡는다는 이유에서다. `sources` 항목마다 `author`·`usage_count`·`last_modified` 같은 객관적 사실만 기록하고 판단은 소비자에게 맡긴다. trust tier도 저장하지 않고 유도한다.
5. Attested Computation은 새로 생긴 개념 타입이다. 수치의 의미만이 아니라 그 수치를 계산하는 승인된 방법까지 함께 싣는다. 그래서 소비자가 "에이전트가 즉석에서 지어낸 SQL이 아니라 승인된 계산을 돌렸다"를 기계적으로 확인할 수 있다.
6. 소비자는 optional 필드 누락, 모르는 `type` 값, 모르는 추가 키, 끊긴 cross-link, `index.md` 부재를 이유로 bundle을 거부해서는 안 된다(MUST NOT). 관대한 소비가 원칙이다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 bundle과 개념 문서

bundle은 배포 단위가 되는 markdown 디렉토리 트리다. 그 안의 개념 문서 하나가 concept이고 concept ID는 bundle 안 파일 경로에서 `.md`를 뗀 값이다. 디렉토리 구조는 도메인과 무관하게 생산자가 마음대로 짠다.

`index.md`와 `log.md`, 예약된 이름은 이 둘뿐이다. 앞은 디렉토리 목록이고 뒤는 갱신 이력이며 둘 다 개념 문서로 쓸 수 없다. 나머지 모든 `.md`는 개념 문서다. tag별 모아보기 같은 뷰는 파일 포맷으로 규정하지 않는다. 필요하면 소비 시점에 frontmatter를 훑어 만들라고 넘긴다.

frontmatter에서 required는 `type` 하나뿐이라 `type`만 있는 문서도 완전히 conformant하다. `title`·`description`·`resource`·`tags`는 recommended다. `type` 값은 중앙에 등록되지 않으므로 소비자는 모르는 타입을 일반 개념으로 다루어야 한다. 생산자는 임의 키를 더 실을 수 있고 소비자는 모르는 키를 round-trip 시 보존해야 한다.

body는 표준 markdown이되 산문보다 구조(헤딩·목록·표·코드 펜스)를 권한다. 사람이 읽기에도 에이전트가 뽑아 쓰기에도 그편이 낫다는 이유다. 관용 헤딩은 `# Schema`·`# Examples`·`# Computation` 셋이다.

### 3.2 출처와 신뢰, 수명주기

v0.2가 새로 들여온 frontmatter 계열은 전부 optional이지만 부재 자체가 의미를 갖는다. 검증되지 않은 개념은 검증된 개념과 구별될 뿐 거부되지는 않는다. 모든 시각 값은 UTC 오프셋을 명시한 ISO 8601이다.

개념이 파생된 재료는 `sources`에 적는다. 항목마다 `resource`가 필수인데 소비자가 따라갈 수 있는 구체적 산출물(절대 URL, bundle 상대 경로, `references/` 하위 경로)이거나 따라갈 수 없는 범위 서술(`all queries in BigQuery project X` 같은)이다. `id`는 개별 주장을 귀속시킬 때 쓰는 안정적 키다. 신뢰도 신호로는 `author`(권위), `usage_count`(채택·생존), `last_modified`(최신성)를 둔다. `usage_count`는 `sources`의 형제 키인 `usage_window`의 `{from, to}` 구간을 전제로 읽는다. 명세는 이 값이 거친 신호라고 분명히 적어 두었다. 살아 있나 죽었나, 자릿수는 어느 정도인가, 그 소스 자신의 과거와 비교해 늘었나 정도로만 쓰면 된다. 예약된 쿼리 실행 횟수와 사람이 일부러 본 대시보드 조회 수는 같은 무게가 아니기 때문이다.

lineage는 별도 필드가 아니라 링크로 표현한다. `resource`가 같은 bundle의 다른 개념을 가리키면 파생 관계가 이미 그래프에 있으므로 소비자는 그 개념의 `sources`로 재귀해 신뢰도를 전파시킬 수 있다. 외부 말단 소스는 자기 신호만 갖는다. 명시적 `derived_from`이나 데이터 lineage는 v0.2 범위 밖이다.

에이전트가 이 문서들을 끊임없이 다시 쓰기 때문에 목록 순서가 바뀌는 순간 위치 인덱스(`sources[0]`)는 조용히 엉뚱한 소스를 가리키게 된다. 명세가 위치 인덱스 대신 키를 쓰는 이유로 적어 둔 것이 이 문제다. 개별 주장의 귀속은 markdown 각주로 한다. 각주 라벨이 `sources[].id`와 같은 값이라 소비자는 각주 산문을 파싱하지 않고 그 키로 항목을 찾는다.

`generated`와 `verified`는 따로 둔다. 쓴 주체와 확인한 주체가 같을 이유가 없어서다. `generated: {by, at}`에서 `by`는 필수이고 `at`은 내용이 마지막으로 의미 있게 바뀐 시점이다. `verified`는 확인 이벤트 목록이다. 사람 승인과 야간 프로세스 점검처럼 독립적인 검사를 여러 건 담을 수 있다. 항목이 하나면 리스트 대시 없이 매핑 하나로 적어도 된다. 소비자는 이를 1개짜리 리스트로 취급해야 한다.

`verified` 키가 아예 없으면 unverified다. `human:` 아닌 actor만 있으면 machine-confirmed, `human:<id>` actor가 있으면 human-reviewed다. trust tier는 이렇게 `verified`에서 유도될 뿐 어디에도 저장되지 않는다. 이 tier는 권고 신호이지 접근 제어가 아니다.

수명주기 쪽은 `status`(`draft`·`stable`·`deprecated`, 없으면 `stable`)와 `stale_after`다. `stale_after`는 상대적 TTL이 아니라 절대 시각이라서 신선도 판정이 "언제 읽었는가"를 끌어들이지 않는 단순 비교(`now >= stale_after`)로 끝난다.

에이전트·도구는 `<producer>/<version>`, 사람은 `human:<id>`, 자동 프로세스는 `process:<id>`다. 정체를 적는 필드는 이 actor 규약 하나를 공유한다. trust tier가 `human:` 접두사로 갈리므로 손으로 쓰거나 사람이 확인한 내용에는 이 접두사를 반드시 써야 한다.

### 3.3 링크와 index·log

개념 사이 링크는 표준 markdown 링크 두 형태를 쓴다. `/`로 시작하는 bundle 상대 경로가 권장인데 문서가 하위 디렉토리 안에서 옮겨져도 깨지지 않아서다. 링크는 관계가 있다는 사실만 주장하고 관계의 종류(부모/자식, 참조, 조인, 의존)는 주변 산문이 전달한다. 그래프 뷰를 만드는 소비자는 보통 이 링크를 전부 타입 없는 방향 엣지로 다룬다. 끊긴 링크가 곧 오류는 아니다. 아직 쓰이지 않은 지식일 수 있으므로 소비자가 견뎌야 한다.

`index.md`는 어느 디렉토리에나 놓을 수 있고 progressive disclosure를 위한 장치다. progressive disclosure는 bundle 전체를 컨텍스트에 올리지 않고 계층을 한 단계씩 열어보게 하는 설계를 말한다. index 파일에는 원칙적으로 frontmatter를 두지 않는다. 예외는 bundle 루트의 `index.md` 하나로, `okf_version` 키를 실을 수 있다. `log.md`는 ISO `YYYY-MM-DD` 날짜 헤딩 아래 최신순으로 변경을 쌓는다.

### 3.4 Attested Computation

provenance는 이 주장이 어디서 왔는지에 답한다. attestation은 이 수치가 우리가 정한 방식대로 나왔는지를 확인한다. OKF는 계산과 그 검사 수단을 기록할 뿐 아무것도 실행하지 않는다.

승인된 계산은 `type: Attested Computation`인 독립 개념으로 둔다. 값이 필요한 개념(Metric, BigQuery Table 등)은 평범한 markdown 링크로 그 개념을 가리킨다. 독립 개념으로 두는 근거는 셋이다. `runtime`이 `parameters`의 의미를 결정하므로(같은 파라미터가 SQL 바인드 변수가 되기도 하고 dbt var나 Python 인자가 되기도 한다) 둘을 한 frontmatter에 두어야 바인딩 규칙이 자명해진다. 같은 계산을 지표·대시보드·리포트가 함께 참조한다. 그리고 `verified`·`stale_after`·`attester` 같은 신뢰 상태는 계산 하나 단위라 매출·이익·마진은 각각 따로 검증되고 따로 attest된다.

계약은 frontmatter에 담긴다. `runtime`은 이 타입에서 필수다(`bigquery`·`postgres`·`dbt`·`python`·`Looker` 등). `parameters`는 에이전트가 채워도 되는 구멍을 `{name, type, required}`로 선언한다. 계산 본문은 body의 `# Computation` 코드 펜스에 인라인으로 두거나 `computation` 키에 파일 경로를 적는다. `executor`는 실행 방법(`resource`)과 실행이 반환해야 할 증거 필드(`receipt`, 예컨대 BigQuery `job_id`와 실제 실행된 SQL)를 선언한다. `attester`는 그 receipt를 검사해 판정을 내는 결정적 코드(LLM 없음)를 가리키며 소비자 쪽에서 도는 것을 전제한다. `resource` 뒤에 있는 것이 스킬이든 스크립트든 컨테이너든 패키징 선택이며 OKF는 인터페이스만 고정하고 패키징은 규정하지 않는다.

에이전트는 선언된 `parameters`에 값만 넣을 수 있고 계산 자체를 쓰거나 고쳐서는 안 된다. 값을 바인딩해 실행 가능한 산출물을 만드는 일은 소비자 몫이다. attester는 같은 바인딩을 독립적으로 다시 유도해 실제 실행된 것과 비교한다. 비교 대상이 receipt에 담긴 전개·컴파일된 산출물(`executed_sql`, `compiled_sql`)이라서 쿼리를 다시 쓰거나 계산 파일을 바꿔치기하거나 의존성을 건드리면 검사에 걸린다. 에이전트에게 열어 둔 표면이 파라미터뿐이라서 "승인된 것이 돌았는가"는 판단이 아니라 기계적 비교로 끝난다.

소비자 흐름은 명세가 informative로 표시한 6단계다. 소비자는 `type`으로 계산을 발견한다. 계약과 계산을 읽고 파라미터를 채운 뒤 executor로 실행해 receipt를 받는다. 그 receipt를 attester로 검사한다. 검사에 실패하면 표시를 거부하고 `stale_after`가 지났으면 경고하거나 거부한다. 성공하면 판정 결과(잡 로그 링크 등)를 노출해 신뢰를 눈에 보이게 한다. receipt와 판정은 런타임 산출물이고 bundle에 저장되지 않는다.

`verified`와 attestation은 서로를 대체하지 않는다. `verified`는 정의가 여전히 사내 규정과 맞는지 확인하는 문서 수준의 느린 절차이고 bundle에 남는다. 반대로 attestation은 호출 하나가 승인된 방식으로 값을 냈는지만 본다. 런타임 절차라 bundle에는 남지 않는다. 정의가 낡은 개념도 깨끗하게 attest될 수 있고 방금 검증된 정의도 실행마다 attest가 필요하다.

### 3.5 적합성과 버전

예약 파일이 아닌 모든 `.md`에는 파싱 가능한 YAML frontmatter가 있고 그 안의 `type`이 비어 있지 않다. `index.md`·`log.md`가 있다면 명세된 구조를 따른다. conformant bundle의 조건은 이 셋이 전부다. 나머지 제약은 소비자가 느슨한 권고로 취급해야 한다.

minor는 하위 호환 추가, major는 breaking change다. 버전 표기는 `<major>.<minor>` SemVer를 따른다. bundle은 루트 `index.md` frontmatter의 `okf_version: "0.2"`로 목표 버전을 선언할 수 있다. 모르는 버전을 만난 소비자는 거부 대신 최선 해석을 시도해야 한다.

v0.1 대비 breaking은 둘이다. `timestamp`가 `generated.at`으로 대체됐다. `generated`가 없으면 소비자가 legacy `timestamp`로 폴백해도 된다. body의 `# Citations` 목록은 frontmatter `sources`로 대체됐고 legacy 문서를 위해 계속 파싱해도 된다. 나머지는 전부 추가다. `sources` 계열과 신뢰도 신호, `generated`·`verified`, `status`·`stale_after`, Attested Computation 타입과 계산 키들, `# Computation` 헤딩, actor 규약이 여기 해당한다.

### 3.6 reference agent와 visualizer

reference agent는 두 pass로 돈다. BQ pass는 BigQuery 메타데이터만으로 소스가 광고하는 개념마다 문서를 하나씩 쓴다. web pass는 LLM 자신을 크롤러로 쓴다. `--web-seed`/`--web-seed-file`로 받은 seed URL을 `fetch_url` 도구로 가져온다. 밖으로 나가는 링크가 기존 개념의 권위 있는 문서처럼 보이는지 보고 따라갈지 정한다. 가져온 페이지마다 기존 문서 보강·`references/<slug>` 신설·skip 중 하나를 고른다. `--web-max-pages` 상한과 동일 도메인 허용 호스트 필터는 도구 안쪽에서 강제돼 에이전트가 폭주하지 못하게 막는다. `--no-web`로 web pass를 통째로 건너뛸 수 있다.

`visualize` 서브커맨드는 임의 bundle을 백엔드도 설치도 필요 없는 자기완결 HTML 한 장으로 렌더한다. 타입별 색상 노드와 body cross-link에서 뽑은 방향 엣지로 그린 force-directed 그래프, 선택한 개념의 frontmatter와 렌더된 body를 보여주는 패널, 링크 그래프를 역으로 계산한 "Cited by" 백링크, 검색 상자와 타입 필터, 레이아웃 전환(cose·concentric·breadth-first·circle·grid)을 갖는다. 패널에서는 내부 링크를 눌러도 뷰어 안에서 이동한다. bundle을 JSON blob으로 파일에 박아 넣고 Cytoscape.js와 marked를 CDN에서 불러오며 데이터는 페이지 밖으로 나가지 않는다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

정량 벤치마크는 없다. 명세와 PoC 저장소이므로 결과는 재현 가능한 bundle로 제시된다. `samples/<name>/`에 seed URL과 정확한 `enrich` 명령을 담은 recipe가 있고 `bundles/<name>/`에 그 recipe가 만든 산출물이 있다. GA4 머천다이즈 스토어는 GA4 BigQuery Export 공식 문서를 seed로 삼았다. Stack Overflow는 여러 개념을 한 문서에서 함께 보강하는 경우를, Bitcoin은 테이블 간 foreign key 관계를 산문으로 적는 경우를 각각 시험한다. v0.2에서 Acme Retail bundle이 하나 더 붙었다.

명세 쪽 결과는 부록 A의 income statement 예제다. 매출과 매출총이익 두 수치를 담은 v0.1 단일 문서를 서술 개념 하나와 Attested Computation 두 개로 쪼개는 마이그레이션이 여기 실려 있다. 두 계산은 일부러 다른 상태로 놓여 있다. 매출은 BigQuery SQL에 사람이 검증했고 아직 신선하며 사용량 신호가 붙은 대시보드 소스가 뒷받침한다. 매출총이익은 dbt 모델에 프로세스가 검증했고 `stale_after`를 넘겼다. 한 bundle 안에서 같은 소비자가 서로 다른 두 판정에 도달한다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- 명세가 0.2이고 여전히 초기 단계다. 스키마 레지스트리도 중앙 권위도 없어서 상호운용 부담은 소비자가 진다.
- 런타임 프로토콜이 비어 있다. receipt와 판정의 전송 형식, 실행을 둘러싼 attestation 수명주기가 다음 판으로 미뤄졌다. 지금 attestation은 인터페이스 선언까지만 표준이다.
- attester의 ABI·이식성·샌드박싱도 미정이며 서빙·스킬 관련 후속 작업과 함께 다루겠다고 적혀 있다. 소비자 쪽에서 남의 코드를 실행하는데 격리 규약이 없다.
- attestation 캐싱, 그리고 Looker·dbt 같은 semantic layer 템플릿(비교 기준이 SQL 동일성에서 모델·바인딩 동일성으로 옮겨간다)도 유보 목록에 있다.
- 신뢰도 판단을 소비자에게 넘긴 대가로 같은 bundle을 두 소비자가 다르게 평가할 여지가 남는다. `usage_count`는 명세 스스로 거친 신호라고 밝힌다.
- 생산 경로는 여전히 BigQuery + Gemini에 묶여 있다. 포맷은 벤더 중립이지만 참조 구현은 GCP 쪽에 치우쳐 있다.
- 끊긴 링크와 모르는 타입을 거부하지 않는 관대한 소비 원칙 때문에 무결성 검사는 소비자 몫으로 남는다.

## 6. 관련 연구 (Related Work)

- 이 ai-wiki 자체가 같은 계보다. markdown + YAML frontmatter, git 버전 관리, `index.md` 카탈로그, `[[wikilinks]]` 그래프까지 [Karpathy LLM Wiki 패턴](https://gist.github.com/karpathy/1dd0294ef9567971c1e4348a90d69285)을 다중 자료 유형으로 확장한 개인 지식 베이스다. OKF의 3-tier 대응물은 없지만 raw → sources → wiki 흐름이 provenance를 파일 구조로 유지하는 같은 동기를 공유한다.
- markdown + frontmatter를 이미 읽는 도구들: Obsidian, Notion, MkDocs, Hugo, Jekyll. 명세가 "custom UI 없이도 열람·편집·렌더된다"는 근거로 직접 든다.
- 기존 데이터 카탈로그: Dataplex, Unity Catalog, Collibra. export 파이프라인의 출처로 언급되며 서비스가 소유하는 메타데이터 저장소의 대안이라는 포지셔닝의 대비 대상이다.
- 도메인 스키마(Avro, Protobuf, OpenAPI)는 대체 대상이 아니라 참조 대상이라고 non-goal에 명시된다.

## 7. 용어집 (Glossary)

- **OKF (Open Knowledge Format)**: YAML frontmatter markdown 파일로 지식을 표현하는 벤더 중립 포맷. 현재 v0.2.
- **Knowledge Bundle**: 개념 문서를 담은 자기완결 디렉토리 하나. 배포 단위.
- **Concept**: bundle 안 지식의 최소 단위. markdown 문서 하나. concept ID는 bundle 내 경로에서 `.md`를 뗀 값.
- **Provenance**: 개념이 파생된 소스 집합. `sources` frontmatter에 기록된다.
- **Credibility signal**: `author`·`usage_count`·`last_modified`처럼 소스마다 붙는 객관적 사실. OKF는 신호만 남기고 점수는 저장하지 않는다.
- **Actor**: 정체를 적는 규약. `<producer>/<version>`·`human:<id>`·`process:<id>`.
- **Trust tier**: `verified`에서 유도되는 unverified / machine-confirmed / human-reviewed 세 단계. 저장되지 않고 권고 신호다.
- **Attested Computation**: 값을 계산하는 승인된 방법을 담은 개념 타입. 소비자가 그 방법대로 계산됐는지 확인하는 근거가 된다.
- **Executor / Receipt / Attester**: 계산을 실행하는 지침 또는 코드 / 실행이 남기는 증거(런타임 산출물, bundle에 저장 안 함) / receipt를 검사해 판정을 내는 결정적 코드.
- **Attestation**: 한 번의 실행이 승인된 계산으로 값을 냈는지 확인하는 런타임 절차. 문서 수준 확인인 `verified`와 구별된다.
- **Permissive consumption**: optional 누락·모르는 타입·끊긴 링크로 bundle을 거부하지 않는 원칙.
- **Reference agent**: bundle을 자동 생산하는 PoC 에이전트. BQ pass와 web pass로 돈다.
