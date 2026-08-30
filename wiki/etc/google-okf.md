---
title: "Open Knowledge Format (OKF)"
type: repo
year: 2026
category: etc
source: google-okf.md
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

## 요약 (Summary)

OKF는 데이터와 시스템을 둘러싼 지식을 YAML frontmatter가 달린 markdown 파일 디렉토리로 표현하는 벤더 중립 포맷이다. 여기서 지식은 메타데이터와 문맥, 큐레이션된 통찰을 아우르는 말이다. 스키마 레지스트리도 중앙 권위도 필수 도구도 없다. *"cat 하면 읽을 수 있고, git clone 하면 배포할 수 있다."*

v0.2에서 방향이 한 번 꺾였다. 출발점은 지식 코퍼스가 한 번 쓰이고 읽히면 끝나는 자료가 아니라 에이전트가 계속 쓰고 유지하는 자료라는 관찰이다. 그렇게 굴러가는 코퍼스라면 소비자가 답을 얻어야 할 질문이 다섯 개다. 무엇으로 만들어졌는지(provenance), 얼마나 믿을 만한지(trust)가 그중 둘이다. 나머지는 아직 사실인지(freshness), 현행 판인지(lifecycle), 우리가 정한 방식대로 계산된 수치인지(attestation)다. 이 다섯이 v0.2에서 frontmatter의 1급 항목으로 올라왔다.

기여는 여전히 포맷 자체다. 동봉된 reference agent와 visualizer는 생산·소비 양단에서 포맷을 만져보라고 붙인 PoC다. 저장소의 자리는 달라졌다. v0.1 시절에는 `GoogleCloudPlatform/knowledge-catalog`의 하위 프로젝트였는데 v0.2에서 독립 저장소(Apache-2.0)로 분리됐다.

## 주요 기여 (Key Contributions)

- 최소 계약은 파일 하나다. bundle이 디렉토리 하나라서 git 저장소로도, tarball로도, 큰 저장소의 하위 폴더로도 배포된다. pull request도 line diff도 blame도 그냥 동작하니 지식 큐레이션이 평범한 소프트웨어 작업이 된다.
- 신뢰 점수는 저장하지 않는다. 주관적인 데다 소비자 사이에서 이식되지 않고 금방 낡기 때문이다. 대신 소스마다 `author`·`usage_count`·`last_modified`처럼 누가 봐도 같은 값만 남기고 판단은 소비자에게 맡긴다. trust tier도 저장하지 않고 `verified`에서 유도한다.
- Attested Computation은 수치의 의미와 함께 그 수치를 계산하는 승인된 방법까지 싣는다. 소비자는 에이전트가 즉석에서 지어낸 SQL 대신 승인된 계산이 돌았음을 기계적으로 확인할 수 있다.
- 구조와 비구조를 일부러 섞는다. query·filter·index를 걸 소수 필드만 frontmatter로 올리고 사람과 LLM이 실제로 읽는 산문·스키마·예시 쿼리는 body에 남긴다.
- 소비는 관대하게 한다. optional 필드가 없거나 모르는 `type` 값이 나왔거나 모르는 추가 키가 있거나 cross-link가 끊겼거나 `index.md`가 없어도 소비자가 bundle을 거부해서는 안 된다(MUST NOT).

## 포맷 구조 (Format Structure)

markdown 디렉토리 트리 하나가 bundle이고 배포도 이 단위로 한다. 그 안의 문서 하나하나가 concept이며 concept ID는 bundle 안 경로에서 `.md`를 뗀 값이다. 이름이 예약된 파일은 `index.md`(디렉토리 목록)와 `log.md`(갱신 이력) 둘뿐이고 나머지 `.md`는 전부 개념 문서다.

required 필드가 `type` 하나여서 `type`만 달린 문서도 완전히 conformant하다. `title`·`description`·`resource`·`tags`는 recommended다. `type` 값을 중앙에 등록하지 않으니 소비자는 모르는 타입도 일반 개념으로 다뤄야 한다. 임의 키는 더 실을 수 있고 소비자는 모르는 키를 round-trip 시 보존해야 한다. body는 표준 markdown이되 산문보다 헤딩·표·코드 펜스 같은 구조를 권한다. 관용 헤딩으로는 `# Schema`·`# Examples`·`# Computation` 셋이 있다.

개념 사이 링크에는 `/`로 시작하는 bundle 상대 경로를 권장한다. 문서가 하위 디렉토리 안에서 옮겨져도 깨지지 않아서다. 링크가 주장하는 것은 관계가 있다는 사실에 그치고 관계의 종류는 주변 산문이 전달한다. 그래프 뷰를 만드는 소비자가 링크를 대개 타입 없는 방향 엣지로만 다루는 이유도 여기 있다. 끊긴 링크라고 오류는 아니다. 아직 쓰이지 않은 지식일 수 있다.

bundle 전체를 컨텍스트에 올리지 않고 계층을 한 단계씩 열어보게 하는 설계를 progressive disclosure라고 한다. `index.md`가 그 장치다. index 파일에는 frontmatter를 두지 않으며 예외로 루트 `index.md`에만 `okf_version`을 실을 수 있다.

## 출처·신뢰·수명주기 (Provenance, Trust, Lifecycle)

v0.2가 들여온 계열은 전부 optional이다. 그래도 필드가 없다는 사실 자체가 의미를 갖는다. 검증되지 않은 개념은 검증된 개념과 구별은 되지만 거부되지는 않는다. 시각 값은 예외 없이 UTC 오프셋을 명시한 ISO 8601로 적는다.

`sources`에는 개념이 파생된 재료를 적는다. 항목마다 `resource`가 필수인데 소비자가 따라갈 수 있는 구체적 산출물(URL, bundle 상대 경로)이거나 따라갈 수 없는 범위 서술(`all queries in BigQuery project X` 같은)이다. 신뢰도 신호 `author`·`usage_count`·`last_modified`도 여기 붙는다. `usage_count`는 형제 키 `usage_window`의 `{from, to}` 구간을 전제로 읽는다. 명세에도 이 값이 거친 신호라고 적혀 있다. 예약 쿼리의 실행 횟수와 사람이 일부러 본 대시보드 조회 수는 무게가 같을 수 없다. 살아 있나 죽었나와 자릿수, 그 소스 자신의 추세 정도로만 쓰라는 뜻이다.

lineage에는 별도 필드가 없다. 링크가 그 역할을 대신한다. `resource`가 같은 bundle의 다른 개념을 가리키면 파생 관계는 이미 그래프 안에 있으므로 소비자가 그 개념의 `sources`로 재귀하면 된다. 개별 주장의 귀속은 각주 라벨을 `sources[].id`와 맞추는 방식이다. 위치 인덱스(`sources[0]`) 대신 키를 쓰는 이유도 명세에 적혀 있다. 에이전트가 이 문서들을 끊임없이 다시 쓰기 때문에 목록 순서가 바뀌는 순간 위치 인덱스는 조용히 엉뚱한 소스를 가리킨다.

`generated`와 `verified`는 따로 둔다. 쓴 주체와 확인한 주체가 같을 이유가 없어서다. `generated: {by, at}`에서 `at`은 내용이 마지막으로 의미 있게 바뀐 시점을 가리킨다. `verified`는 확인 이벤트 목록이라 사람 승인과 야간 프로세스 점검이 함께 들어간다. 정체를 적는 방식은 actor 규약 하나로 통일돼 있어서 에이전트·도구는 `<producer>/<version>`, 사람은 `human:<id>`, 자동 프로세스는 `process:<id>`로 쓴다.

trust tier는 어디에도 저장하지 않고 `verified`에서 유도한다.

| `verified` 상태 | trust tier |
|---|---|
| 키 없음 | unverified |
| `human:` 아닌 actor만 | machine-confirmed |
| `human:<id>` actor 포함 | human-reviewed |

수명주기는 `status`(`draft`·`stable`·`deprecated`, 없으면 `stable`)와 `stale_after`가 맡는다. `stale_after`가 상대적 TTL이 아니라 절대 시각이라서 신선도 판정에 읽은 시점이 끼어들지 않는다. `now >= stale_after` 비교 한 번이면 끝이다.

## Attested Computation

provenance는 이 주장이 어디서 왔는지를 다룬다. attestation에서 묻는 것은 이 수치가 우리가 정한 방식대로 나왔는지다. OKF는 계산과 이를 검사할 수단을 기록해 둘 뿐 아무것도 실행하지 않는다.

승인된 계산은 `type: Attested Computation`인 독립 개념으로 둔다. 값이 필요한 Metric이나 BigQuery Table은 평범한 markdown 링크로 이 개념을 가리킨다. 굳이 떼어 놓는 근거는 셋이다. `runtime`이 `parameters`의 의미를 결정하니(같은 파라미터가 SQL 바인드 변수일 수도, dbt var일 수도, Python 인자일 수도 있다) 둘을 한 frontmatter에 두어야 바인딩 규칙이 자명해진다. 같은 계산을 지표·대시보드·리포트가 함께 참조한다. `verified`·`stale_after`·`attester` 같은 신뢰 상태는 계산 하나 단위라 매출·이익·마진이 각각 따로 검증되고 따로 attest된다.

계약은 frontmatter에 담긴다. 이 타입의 필수 키는 `runtime` 하나이고 `parameters`는 에이전트가 채워도 되는 구멍을 `{name, type, required}`로 선언한다. 계산 본문은 body의 `# Computation` 코드 펜스에 두거나 `computation` 키에 파일 경로로 둔다. `executor`가 선언하는 것은 실행 방법과 실행이 반환해야 할 증거 필드 `receipt`인데, BigQuery `job_id`와 실제 실행된 SQL 같은 값이 여기 들어간다. `attester`는 그 receipt를 검사해 판정을 내는 결정적 코드(LLM 없음)를 가리키며 이 코드가 소비자 쪽에서 도는 것을 전제한다.

```yaml
type: Attested Computation
runtime: bigquery
parameters:
  - { name: year, type: integer, required: true }
executor:
  resource: references/skills/run-on-bq.md
  receipt: [job_id, executed_sql, result]
attester:
  resource: references/attesters/revenue.py
verified: { by: human:ahormati, at: 2026-06-25T09:00:00Z }
stale_after: 2026-09-23T00:00:00Z
```

에이전트는 선언된 파라미터에 값만 넣을 수 있고 계산 자체를 쓰거나 고쳐서는 안 된다. 값을 바인딩해 실행 가능한 산출물을 만드는 일은 소비자 몫이다. attester는 같은 바인딩을 독립적으로 다시 유도해 실제 실행된 것과 비교한다. 비교 대상이 receipt에 담긴 전개·컴파일된 산출물(`executed_sql`, `compiled_sql`)이라서 쿼리를 다시 쓰거나 계산 파일을 바꿔치기하거나 의존성을 건드리면 검사에 걸린다. 열어 둔 표면이 파라미터로 한정돼 있어 승인된 것이 돌았는지가 판단의 문제가 아니라 기계가 그대로 비교하는 일이 된다.

`verified`와 attestation은 서로를 대체하지 않는다. `verified`는 정의가 아직 사내 규정과 맞는지 보는 문서 수준의 느린 절차이고 bundle에 남는다. 한 번의 실행이 승인된 방식으로 값을 냈는지 확인하는 attestation은 호출 단위의 런타임 절차이고 남지 않는다. 정의가 낡았어도 attest는 깨끗하게 통과할 수 있다. 반대로 방금 검증한 정의라도 실행할 때마다 다시 attest해야 한다.

## 두 개의 PoC (Reference Agent · Visualizer)

reference agent는 두 pass로 돈다. BQ pass는 BigQuery 메타데이터만 가지고 개념마다 문서를 하나씩 쓴다. web pass는 LLM 자신을 크롤러로 삼는다. seed URL을 `fetch_url` 도구로 가져온 다음 밖으로 나가는 링크가 기존 개념의 권위 있는 문서처럼 보이는지 보고 따라갈지 정한다. 가져온 페이지마다 기존 문서 보강·`references/<slug>` 신설·skip 중 하나를 고른다. 폭주는 도구 안쪽에서 막는다. `--web-max-pages` 상한과 동일 도메인 허용 호스트 필터가 거기서 강제되며 `--no-web`로 web pass를 건너뛴다.

`visualize` 서브커맨드는 임의 bundle을 백엔드도 설치도 없는 자기완결 HTML 한 장으로 렌더한다. 화면에 들어가는 것은 타입별 색상 노드와 body cross-link에서 뽑은 방향 엣지로 그린 force-directed 그래프, frontmatter와 렌더된 body를 보여주는 패널, 링크 그래프를 역으로 계산한 "Cited by" 백링크, 그리고 검색·타입 필터·레이아웃 전환이다. bundle은 JSON blob으로 파일에 박고 Cytoscape.js와 marked는 CDN에서 부른다. 데이터가 페이지 밖으로 나가는 일은 없다.

## 결과 (Results)

`samples/<name>/`에 seed URL과 정확한 `enrich` 명령이 있고 `bundles/<name>/`에는 그 recipe가 만든 bundle이 있다. 정량 벤치마크는 없다. recipe와 산출물을 이렇게 짝지어 재현 경로를 대신 보인다. GA4 머천다이즈 스토어, Stack Overflow(여러 개념을 한 문서에서 함께 보강), Bitcoin(테이블 간 foreign key 관계를 산문으로)이 그 목록이다. v0.2에서는 Acme Retail이 하나 더 붙었다.

명세 쪽 실증은 부록 A의 income statement 예제다. 두 수치를 담은 v0.1 단일 문서를 서술 개념 하나와 Attested Computation 두 개로 쪼개는 마이그레이션인데 두 계산의 상태를 일부러 다르게 잡아 뒀다. 매출은 BigQuery SQL에 사람이 검증했고 아직 신선하며 사용량 신호가 붙은 대시보드 소스가 뒷받침한다. dbt 모델을 쓰는 매출총이익은 프로세스가 검증했고 `stale_after`를 넘겼다. 한 bundle을 읽는 같은 소비자가 서로 다른 두 판정을 내리게 된다.

## v0.1에서 달라진 것 (Changes from v0.1)

`timestamp`가 `generated.at`으로 대체됐다(소비자는 `generated`가 없을 때 legacy `timestamp`로 폴백해도 된다). body의 `# Citations` 목록도 frontmatter `sources`로 대체됐고 legacy 문서를 위해 계속 파싱해도 된다. breaking은 이 둘뿐이다. 나머지는 전부 추가다. `sources` 계열과 신뢰도 신호, `generated`·`verified`, `status`·`stale_after`, Attested Computation 타입과 계산 키들, `# Computation` 헤딩, actor 규약이 새로 들어왔다. bundle 구조·예약 파일명·required `type`·cross-linking·관대한 conformance는 그대로 넘어왔다.

## 한계 (Limitations)

- 런타임 프로토콜이 비어 있다. receipt와 판정을 어떤 형식으로 주고받을지, 실행을 둘러싼 attestation 수명주기를 어떻게 잡을지가 다음 판으로 미뤄졌다. attestation은 지금 인터페이스 선언까지만 표준이다.
- attester의 ABI·이식성·샌드박싱도 미정이고 서빙·스킬 관련 후속 작업과 함께 다뤄질 예정이다. 소비자 쪽에서 남의 코드를 돌리는 구조인데 격리 규약이 없다.
- attestation 캐싱과 Looker·dbt 같은 semantic layer 템플릿도 유보 목록에 올라 있다. 템플릿은 비교 기준이 SQL 동일성에서 모델·바인딩 동일성으로 옮겨가는 경우다.

신뢰도 판단을 소비자에게 넘겼으니 같은 bundle을 두 소비자가 다르게 평가할 여지가 남는다. `usage_count`가 거친 신호라는 말은 명세에도 적혀 있다. 끊긴 링크와 모르는 타입을 거부하지 않기로 한 대가로 무결성 검사도 소비자 몫이 된다.

포맷은 벤더 중립이지만 참조 구현이 GCP 쪽에 치우쳐 있고 생산 경로도 여전히 BigQuery + Gemini에 묶여 있다.

## 관련 페이지 (Related Pages)

- 이 ai-wiki 자체가 OKF와 같은 계보다. markdown + YAML frontmatter, git 버전 관리, Obsidian 친화, `index.md` 카탈로그, `[[wikilinks]]` 그래프까지 [Karpathy LLM Wiki 패턴](https://gist.github.com/karpathy/1dd0294ef9567971c1e4348a90d69285)을 다중 자료 유형으로 확장한 결과다. raw → sources → wiki의 3-tier도 provenance를 파일 구조로 유지하려는 같은 동기에서 나왔다.
- [[applications/dragon1086-llm-wiki]] · [[applications/joonan30-llm-wiki-labs]] · [[applications/agricidaniel-claude-obsidian]] — 같은 Karpathy 위키 패턴 계열. OKF는 이들을 데이터 카탈로그와 에이전트 소비로 일반화하고 규칙을 명세로 적어 둔 판이다.
- [[applications/wlsdks-ontology-atlas]] — 지식을 ontology로 고정해 그래프로 다루는 접근. OKF는 반대로 타입 어휘를 중앙에 등록하지 않고 생산자에게 맡긴다.
