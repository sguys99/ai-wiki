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

## 요약

OKF(Open Knowledge Format)는 데이터와 시스템을 둘러싼 지식을 YAML frontmatter가 달린 markdown 파일의 디렉토리로 표현하는 벤더 중립 포맷이다. 명세가 말하는 지식은 메타데이터와 컨텍스트, 그리고 큐레이션된 통찰을 아우른다. 스키마 레지스트리도 중앙 권위도 필수 도구도 없으며, 명세는 이 최소주의를 "`cat`으로 읽을 수 있으면 OKF를 읽는 것이고, `git clone`할 수 있으면 배포하는 것이다"라는 문장으로 요약한다.

v0.2 명세의 출발점은 지식 코퍼스가 사람이 한 번 쓰고 읽는 자료에서 에이전트가 계속 작성하고 유지하는 자료로 바뀌고 있다는 진단이다. 대부분의 concept이 기계가 만든 것이라면 소비자는 이 문서가 무엇에서 왔는지, 얼마나 믿을 수 있는지, 아직 사실인지, 현행 버전인지, 수치가 정해진 방식대로 계산됐는지를 물어야 한다. v0.2는 이 가운데 provenance, trust, lifecycle, attestation을 frontmatter의 1급 항목으로 올렸다.

저장소가 앞세우는 기여는 포맷 자체다. 동봉된 reference agent는 BigQuery 메타데이터와 웹 문서에서 bundle을 자동 생산하는 PoC이고, `visualize` 서브커맨드는 bundle을 자기완결 HTML 한 장으로 렌더하는 PoC 소비자다. README는 두 도구가 포맷을 생산과 소비 양단에서 만질 수 있게 하는 장치일 뿐이라고 명시한다.

이 페이지의 근거는 raw에 있는 `README.md`와 `SPEC.md` 두 파일이다. 소스 코드, 테스트, 체크인된 bundle 산출물은 raw에 없으므로 내부 구현은 다루지 않는다. 라이선스도 README 본문에 조항이 없어 frontmatter 값(Apache-2.0)을 현재 자료로는 검증할 수 없다.

## 배경

### 에이전트가 유지하는 코퍼스

명세 1절은 AI 에이전트를 위한 지식 표현 공간이 빠르게 진화하면서 서로 호환되지 않는 규약이 많이 생기고 있다고 진단한다. OKF는 지식이 널리 접근 가능한 기성 포맷으로 표현되어야 한다는 입장을 취하며, 그 포맷이 갖춰야 할 성질을 네 가지로 든다.

| 성질 | 뜻 |
|---|---|
| readable | 도구 없이 사람이 읽을 수 있다 |
| parseable | 전용 SDK 없이 에이전트가 파싱할 수 있다 |
| diffable | 버전 관리에서 줄 단위 diff가 된다 |
| portable | 도구, 조직, 시간을 넘어 이식된다 |

평범한 markdown과 frontmatter 규약으로는 부족한 지점이 있다. 코퍼스의 대부분을 에이전트가 쓰는 상황에서 소비자에게 필요한 질문이 다섯 가지인데, 기존 규약은 이 질문의 답을 1급 항목으로 만들지 않는다.

| 번호 | 질문 | 계열 |
|---|---|---|
| 1 | 이 문서는 무엇으로 만들어졌고 어떻게 검증됐는가 | provenance |
| 2 | 얼마나 믿어야 하는가 | trust |
| 3 | 아직 사실인가 | freshness |
| 4 | 현행 버전인가 | lifecycle |
| 5 | 이 수치는 우리가 정한 방식대로 만들어졌는가 | attestation |

명세는 이어서 v0.2가 provenance, trust, lifecycle, attestation을 1급으로 만들면서도 포맷을 최소 규정으로 유지한다고 적는다. freshness는 별도 계열 이름 없이 lifecycle 계열의 `stale_after`가 담당한다. 표준화 대상은 지식 코퍼스를 자기 기술적(self-describing)으로 만드는 데 필요한 소수의 구조 규약뿐이고, 그 너머는 전부 생산자에게 맡긴다.

### 목표와 비목표

| 구분 | 항목 |
|---|---|
| 목표 1 | 생산자(사람, 에이전트, export 파이프라인)가 쓸 수 있는 범용 포맷을 정의한다 |
| 목표 2 | 소비자(에이전트, UI, 검색 인덱스, 결정적 코드)가 읽고 순회하는 방법을 안내한다 |
| 목표 3 | 시스템과 조직 사이의 지식 교환을 촉진한다 |
| 목표 4 | 런타임을 규정하지 않으면서 에이전트가 유지하는 코퍼스를 신뢰할 수 있게 하는 소수의 frontmatter 필드를 표준화한다 |
| 비목표 1 | concept 타입의 고정 분류 체계를 정의하지 않는다 |
| 비목표 2 | 저장, 서빙, 질의 인프라를 규정하지 않는다 |
| 비목표 3 | 도메인 스키마(Avro, Protobuf, OpenAPI 등)를 대체하지 않는다. OKF는 이들을 참조할 뿐 흡수하지 않는다 |
| 비목표 4 | executor와 attester가 가리키는 코드의 패키징이나 호출 표준을 정하지 않는다. OKF는 인터페이스만 고정한다 |

비목표 1과 4는 이 포맷의 성격을 규정하는 결정이다. 타입 어휘를 중앙에 등록하지 않으므로 소비자는 모르는 타입을 만나는 것이 정상 상황이고, 계산 코드의 패키징을 규정하지 않으므로 같은 계약 아래 스킬, 스크립트, 컨테이너가 모두 놓일 수 있다.

### 파일 기반 선택이 주는 성질

README의 "Why OKF?" 절은 서비스가 소유하는 메타데이터 저장소와 대비해 평범한 markdown 디렉토리가 주는 성질 9개를 나열한다.

| 성질 | README의 설명 |
|---|---|
| 사람과 에이전트가 읽을 수 있다 | 독자와 내용 사이에 SDK나 질의 언어가 없다. 엔지니어는 concept을 `cat`하고 LLM은 그대로 컨텍스트에 넣는다 |
| 즉시 버전 관리된다 | bundle이 git에 산다. pull request, 줄 단위 diff, blame, 리뷰 워크플로가 그대로 동작해 지식 큐레이션이 평범한 소프트웨어 공학 활동이 된다 |
| 이식 가능하고 lock-in이 없다 | bundle은 디렉토리다. tarball로 보내고 어느 저장소에나 두고 어느 파일시스템에서나 마운트한다 |
| 구조와 비구조를 의도적으로 섞는다 | 질의, 필터, 인덱스에 쓸 소수 필드(`type`, `resource`, `tags`, `generated`, `status`)만 frontmatter에 두고, 사람과 LLM이 실제로 읽는 산문, 스키마, 예시 쿼리는 본문에 둔다 |
| trust, provenance, freshness가 1급이다 | 어디서 왔는지(`sources`와 source별 신뢰도 신호), 누가 만들고 확인했는지(`generated`, `verified`, 여기서 trust tier를 유도), 아직 현행인지(`status`, `stale_after`)를 질의 가능한 신호로 frontmatter에 둔다 |
| 최소 규정이며 자유롭게 확장된다 | 소수의 필수 키가 상호운용성을 보장하고, bundle은 임의의 추가 키와 본문 절을 실을 수 있다 |
| 기존 도구와 결합한다 | Notion, Obsidian, MkDocs, Hugo, Jekyll이 이미 markdown과 YAML frontmatter를 읽으므로 custom UI 없이 열람, 편집, 렌더가 된다 |
| progressive disclosure가 내장된다 | 자동 생성되는 `index.md`로 에이전트나 사람이 bundle 전체를 컨텍스트에 올리지 않고 계층을 한 단계씩 탐색한다 |
| 트리가 아니라 그래프다 | concept이 평범한 markdown 링크로 서로를 가리켜 디렉토리 배치가 암시하는 부모와 자식 관계보다 풍부한 관계를 표현한다 |

README는 이 아홉 성질의 총합을 "reference agent, 소비 에이전트, 사람이 소스 코드에서 이미 협업하는 방식 그대로 같은 산출물 위에서 협업하게 된다"고 정리한다.

## 핵심 개념

### 생산자와 소비자

OKF는 쓰는 쪽과 읽는 쪽을 생산자(producer)와 소비자(consumer)로 나누어 부른다. README는 어느 쪽에도 특정 도구를 전제하지 않는다는 점을 강조한다.

| 역할 | README가 든 예 |
|---|---|
| 생산자 | 손으로 쓰는 사람, 어느 프레임워크(Google ADK, LangChain, custom)로든 만든 에이전트, 기존 카탈로그(Dataplex, Unity Catalog, Collibra 등)의 export 파이프라인, 데이터베이스를 순회하는 스크립트 |
| 소비자 | 정적 파일 서버, 지식 관리 UI(Obsidian, Notion, MkDocs), 파일을 컨텍스트에 올리는 LLM, 검색 인덱스, 이 저장소에 동봉된 것 같은 그래프 뷰어 |

### bundle, concept, link

명세 2절은 열다섯 개 용어를 정의한다. 구조에 관한 용어를 먼저 보면 다음과 같다.

| 용어 | 정의 |
|---|---|
| Knowledge Bundle (bundle) | 자기완결적이고 계층적인 지식 문서 모음. 배포 단위 |
| Concept | bundle 안 지식의 최소 단위. markdown 문서 하나. 테이블이나 API 같은 실체 자산도, 지표나 업무 프로세스 같은 추상 개념도 될 수 있다 |
| Concept ID | bundle 안 파일 경로에서 `.md`를 뗀 값 |
| Frontmatter | 파일 맨 위 `---`로 감싼 YAML 메타데이터 블록 |
| Body | frontmatter 이후의 전부 |
| Link | concept 사이의 표준 markdown 링크. 디렉토리 계층이 암시하는 부모와 자식 관계 너머의 관계를 표현한다 |

concept는 bundle 안 지식의 최소 단위로 markdown 문서 하나에 해당한다. 예를 들어 `tables/orders.md`라는 파일은 concept ID가 `tables/orders`인 concept이고, 이 문서가 `/tables/customers.md`를 링크하면 두 concept 사이에 관계가 있다는 사실이 그래프에 기록된다.

### provenance, trust, attestation의 구분

v0.2의 핵심은 서로 다른 세 질문을 서로 다른 frontmatter 계열로 분리했다는 점이다. 셋을 구별하지 않으면 "출처가 믿을 만하다"와 "이 수치가 정확하다"가 뒤섞인다.

| 계열 | 답하는 질문 | 주요 필드 | 기록 위치 |
|---|---|---|---|
| provenance | 이 주장은 어디서 왔는가 | `sources`(항목별 `resource`, `id`, `author`, `usage_count`, `last_modified`), `usage_window` | bundle의 frontmatter |
| trust | 누가 썼고 누가 확인했는가 | `generated`, `verified` | bundle의 frontmatter |
| lifecycle | 현행 버전인가, 아직 신선한가 | `status`, `stale_after` | bundle의 frontmatter |
| attestation | 이 수치는 정해진 방식대로 계산됐는가 | Attested Computation의 `runtime`, `parameters`, `computation`, `executor`, `attester` | 계약은 bundle에, receipt와 판정은 런타임에만 |

나머지 용어는 이 구분을 뒷받침한다.

| 용어 | 정의 |
|---|---|
| Source | concept이 파생된 재료. bundle 외부일 수도 내부일 수도 있으며 `sources` 필드에 기록된다 |
| Provenance | concept이 파생된 source의 집합 |
| Credibility signal | source마다 붙는 객관적 사실(`author`, `usage_count`, `last_modified`). OKF는 신호를 기록하고 판정은 기록하지 않는다 |
| Actor | 누가 또는 무엇이 행위를 했는지 적는 문자열 |
| Trust tier | `verified` 필드에서 유도되는 단계. unverified, machine-confirmed, human-reviewed |
| Attested Computation | 값을 계산하는 승인된 방법을 담은 concept(`type: Attested Computation`) |
| Executor | 계산을 실행하고 receipt를 돌려주는 실행 지침 또는 코드 |
| Receipt | 실행이 돌려주는 증거. `executor.receipt`가 형태를 정한다. 런타임 산출물이며 bundle에 저장하지 않는다 |
| Attester | receipt를 검사해 판정을 돌려주는 결정적(LLM 없음) 코드 |

### 신호와 점수

OKF가 신뢰를 다루는 방식은 "신호를 기록하고 점수를 저장하지 않는다"는 원칙으로 압축된다. 명세는 credibility score를 저장하지 않는 이유를 세 가지로 든다. 점수는 주관적이고, 소비자 사이에서 이식되지 않으며, 시간이 지나면 낡는다. 그래서 source마다 누가 만들었는지, 얼마나 쓰이는지, 언제 바뀌었는지 같은 객관적 사실만 남기고, 그 사실을 어떻게 해석할지는 소비자가 정한다. trust tier도 같은 원칙을 따라 `verified` 필드에서 소비자가 유도할 뿐 어디에도 저장되지 않는다.

### progressive disclosure

progressive disclosure는 bundle 전체를 컨텍스트에 올리지 않고 계층을 한 단계씩 열어보게 하는 설계다. OKF에서는 각 디렉토리의 `index.md`가 이 역할을 맡는다. 사람이나 에이전트는 index를 읽어 그 디렉토리에 무엇이 있는지 먼저 파악한 뒤 필요한 문서만 연다.

## 방법

### bundle 구조와 배포

bundle은 markdown 파일의 디렉토리 트리다. 디렉토리 구조는 도메인과 독립적이며 생산자가 지식의 성격에 맞게 자유롭게 짠다. 명세가 보이는 배치 예시는 루트에 `index.md`, `log.md`, concept 파일이 놓이고 하위 디렉토리마다 다시 `index.md`와 concept 파일이 반복되는 구조다.

| 배포 형태 | 비고 |
|---|---|
| git 저장소 | 권장. 이력, 귀속, diff를 제공한다 |
| tarball 또는 zip | 디렉토리를 그대로 압축한다 |
| 더 큰 저장소의 하위 디렉토리 | 기존 코드 저장소 안에 둘 수 있다 |

예약된 파일명은 둘뿐이다. 계층의 어느 위치에서든 정해진 의미를 가지며 concept 문서로 쓸 수 없다(MUST NOT). 나머지 모든 `.md`는 concept 문서다.

| 파일명 | 용도 |
|---|---|
| `index.md` | 디렉토리 목록. progressive disclosure를 위한 장치 |
| `log.md` | 갱신 이력 |

태그는 `tags` frontmatter 필드로 1급 개념이지만 태그별로 문서를 모으는 별도 파일 포맷은 없다. 태그 열람 뷰가 필요한 소비자는 소비 시점에 frontmatter를 훑어 직접 합성한다. 즉 파일 포맷은 원천 데이터만 정하고 뷰는 소비자 몫이다.

### concept 문서의 frontmatter

모든 concept은 UTF-8 markdown 파일이고 YAML frontmatter 블록과 markdown 본문 두 부분으로 이루어진다. frontmatter 키는 필수, 권장, 선택 계열, 확장으로 나뉜다.

| 키 | 구분 | 설명 |
|---|---|---|
| `type` | 필수 | concept의 종류를 나타내는 짧은 문자열. 소비자가 라우팅, 필터링, 표시에 쓴다 |
| `title` | 권장 | 사람이 읽는 표시 이름. 없으면 소비자가 파일명에서 유도해도 된다(MAY) |
| `description` | 권장 | concept을 한 문장으로 요약. `index.md` 생성기, 검색 스니펫, 미리보기가 쓴다 |
| `resource` | 권장 | concept이 설명하는 실제 자산을 고유하게 가리키는 URI. 추상 개념에는 없다 |
| `tags` | 권장 | 횡단 분류용 짧은 문자열의 YAML 리스트 |
| `sources`, `generated`, `verified`, `status`, `stale_after` | 선택 | provenance, trust, lifecycle 계열 |
| `runtime`, `parameters`, `computation`, `executor`, `attester` | 선택 | Attested Computation 타입의 computation 계열 |
| 기타 임의 키 | 확장 | 생산자는 어떤 키든 더할 수 있다(MAY). 소비자는 round-trip 시 모르는 키를 보존해야 하고(SHOULD) 모르는 필드를 이유로 문서를 거부해서는 안 된다(MUST NOT) |

`type`은 유일한 상시 필수 키이며 `type`만 가진 concept도 완전히 적합(conformant)하다. 명세가 든 예시 값은 `BigQuery Table`, `BigQuery Dataset`, `API Endpoint`, `Metric`, `Playbook`, `Reference`, `Attested Computation`이다. 이 값들은 중앙에 등록되지 않는다. 생산자는 설명적이고 자명한 값을 고르고(SHOULD) 소비자는 모르는 타입을 일반 concept으로 다루어 견뎌야 한다(MUST). 따라서 어떤 조직이 `Kafka Topic`이라는 타입을 만들어 써도 다른 소비자는 그 문서를 거부하지 않고 일반 concept으로 표시한다.

### 본문 구조와 관용 헤딩

본문은 표준 markdown이다. 명세는 자유 산문보다 헤딩, 목록, 표, 코드 펜스 같은 구조적 markdown을 권한다(SHOULD). 구조가 사람의 읽기와 에이전트의 retrieval 모두에 도움이 되기 때문이다. 필수 본문 절은 없고 관용 헤딩 셋이 있다.

| 헤딩 | 용도 |
|---|---|
| `# Schema` | 자산의 컬럼이나 필드의 구조화된 설명 |
| `# Examples` | 구체적 사용 예시. 대개 코드 펜스 |
| `# Computation` | Attested Computation의 승인된 계산 |

명세는 두 종류의 concept 예시를 든다. 첫째는 `resource`가 있는 concept이다. `type: BigQuery Table`인 Customer Orders 문서는 `resource`에 BigQuery 콘솔 URL을 두고, `generated`에 `reference_agent/gemini-2.5-pro`를 적고, 본문 `# Schema` 표에 `order_id`, `customer_id`, `total_usd`, `placed_at` 네 컬럼을 두며 `customer_id` 설명에서 `/tables/customers.md`를 링크한다. 둘째는 `resource`가 없는 concept이다. `type: Playbook`인 데이터 신선도 경보 대응 문서는 `generated.by`가 `human:ahormati`이고 본문에 `# Trigger`와 `# Steps` 절을 둔다. 두 예시는 실체 자산과 추상 절차가 같은 골격을 공유한다는 점을 보여 준다.

첫째 예시의 전문은 다음과 같다. `resource`가 실제 BigQuery 테이블을 가리키고 본문의 `# Schema` 표와 `# Joins` 절이 다른 concept을 링크한다.

```markdown
---
type: BigQuery Table
title: Customer Orders
description: One row per completed customer order across all channels.
resource: https://console.cloud.google.com/bigquery?p=acme&d=sales&t=orders
tags: [sales, orders, revenue]
generated: { by: reference_agent/gemini-2.5-pro, at: 2026-05-28T14:30:00Z }
---

# Schema

| Column        | Type      | Description                              |
|---------------|-----------|------------------------------------------|
| `order_id`    | STRING    | Globally unique order identifier.        |
| `customer_id` | STRING    | Foreign key into [customers](/tables/customers.md). |
| `total_usd`   | NUMERIC   | Order total in US dollars.               |
| `placed_at`   | TIMESTAMP | When the customer submitted the order.   |

# Joins

Joined with [customers](/tables/customers.md) on `customer_id`.
```

둘째 예시는 `resource` 없이 사람이 쓴 절차 문서다. `generated.by`가 `human:ahormati`라서 이 문서를 확인하는 소비자는 actor 규약만으로 사람이 작성했음을 안다.

```markdown
---
type: Playbook
title: "Incident response: data freshness alert"
description: Steps to triage a freshness alert on the orders pipeline.
tags: [oncall, incident]
generated: { by: human:ahormati, at: 2026-04-12T09:00:00Z }
---

# Trigger

A freshness alert fires when `orders` lags more than 30 minutes behind its
expected SLA. See the [orders table](/tables/orders.md).

# Steps

1. Check the [ingestion job dashboard](https://example.com/dash).
2. ...
```

외부 source에 대한 주장별 귀속은 본문 인용 목록이 아니라 `sources` 항목에 연결된 markdown 각주로 한다. 이 방식은 provenance 절에서 다시 다룬다.

### provenance 기록

provenance, trust, lifecycle 세 계열은 "어디서 왔는가", "얼마나 믿을 것인가", "아직 현행인가"를 frontmatter만으로 답하게 만든다. 전부 optional이지만 부재 자체가 의미를 가진다. 검증되지 않은 concept은 검증된 것과 구별되지만 거부되지는 않는다. OKF의 모든 시각 값은 UTC 오프셋을 명시한 ISO 8601 datetime이며 예시는 `2026-06-30T14:00:00Z`다.

`sources`는 concept이 파생된 재료를 기록한다. 항목마다 다음 필드를 가진다.

| 필드 | 필수 여부 | 설명 |
|---|---|---|
| `resource` | 항목 안에서 필수 | 소비자가 따라갈 수 있는 구체적 산출물(절대 URL, bundle 상대 경로, `references/` 하위 경로) 또는 따라갈 수 없는 모집단이나 범위 서술(예: `all queries in BigQuery project X`) |
| `id` | 선택 | 개별 주장을 귀속시키는 안정적 키. 본문이 이 source를 인용하면 있어야 한다(SHOULD) |
| `title` | 선택 | 사람이 읽는 라벨 |
| `author` | 선택 | source를 만든 주체. actor 규약을 따른다 |
| `usage_count` | 선택 | `usage_window` 동안 `resource`가 얼마나 쓰였는지 |
| `last_modified` | 선택 | source 자체가 마지막으로 바뀐 시각 |

명세 예시는 `id: ga4-schema`, `resource`에 GA4 BigQuery Export 스키마 문서 URL, `author: team:ga4-docs`, `usage_count: 5000`, `last_modified: 2026-05-30T00:00:00Z`를 가진 항목 하나와, 형제 키 `usage_window: { from: 2026-06-01, to: 2026-06-30 }`다.

세 신뢰도 신호는 각각 다른 질문에 답한다.

| 신호 | 질문 | 해석 규칙 |
|---|---|---|
| `author` | 누가 만들었는가 | 권위 신호. actor 규약(`team:ga4-docs`처럼)으로 적는다 |
| `usage_count` | 얼마나 쓰이는가 | 채택과 생존 신호. 대시보드 조회, 쿼리 실행, 페이지 읽기 횟수. 단일 산출물이면 그 산출물의 실행 횟수, 범위 서술이면 그 범위 안에서 concept에 닿는 실행 횟수 |
| `last_modified` | 언제 바뀌었는가 | 최신성 신호. concept이 쓰인 시각인 `generated.at`과 구별된다 |

`usage_window`는 `sources`의 형제 키로 한 번 적어 모든 `usage_count`에 `{ from, to }` 구간을 부여한다. 개별 항목이 자기 `usage_window`를 가져 공유 값을 덮어써도 된다(MAY). 구간이 없는 사용 횟수는 의미가 없으므로 이 키가 `usage_count`의 전제가 된다.

`usage_count`는 명세 스스로 거친 신호라고 못 박는 값이다. 살아 있는지 죽었는지, 자릿수가 어느 정도인지, 그 source 자신의 과거 이력과 비교해 어떤지 수준에서만 비교할 수 있고, 종류가 다른 source 사이의 정밀한 순위로는 쓸 수 없다. 예약 쿼리의 실행 횟수와 사람이 일부러 본 대시보드 조회 수는 같은 무게가 아니기 때문이다. 따라서 소비자는 이 값을 생존과 추세로 읽어야 한다(SHOULD).

lineage는 별도 필드가 아니라 링크로 표현한다. `resource`가 같은 bundle의 다른 concept을 가리키면 파생 엣지는 이미 bundle 그래프에 있으므로, 소비자는 그 source의 `sources`로 재귀해 신뢰도를 전파시켜도 된다(MAY). 외부 말단 source는 자기 고유 신호만 갖는다. 명시적 외부 `derived_from`이나 데이터 lineage 같은 더 깊은 lineage는 v0.2 범위 밖이다.

주장별 귀속은 라벨이 `sources[].id`와 같은 markdown 각주로 한다. 명세 예시는 다음과 같다.

```markdown
The `events_` table is sharded daily as `events_YYYYMMDD`.[^ga4-schema]

[^ga4-schema]: GA4 BigQuery Export schema
```

각주 라벨이 `sources`로 들어가는 조인 키이고, 소비자는 각주 산문을 파싱하지 않고 일치하는 항목으로 귀속을 해석한다. 라벨을 위치(`sources[0]`)가 아니라 키로 두는 이유는 에이전트가 이 문서들을 끊임없이 다시 쓰기 때문이다. 목록 순서가 바뀌는 순간 위치 인덱스는 조용히 엉뚱한 source를 가리키지만, 안정적 `id`는 순서가 바뀌어도 같은 항목을 가리킨다.

### trust 기록

`generated`는 현재 내용이 어떻게 만들어졌는지, `verified`는 누가 또는 무엇이 그 내용을 source나 `resource`와 대조해 확인했는지 기록한다. 쓴 주체와 확인한 주체가 같을 이유가 없어서 둘을 분리한다. 예를 들어 에이전트가 문서를 쓰고 재무 담당자가 승인하는 경우 `generated.by`는 에이전트, `verified[].by`는 사람이 된다.

| 키 | 설명 |
|---|---|
| `generated.by` | `generated` 안에서 필수. actor |
| `generated.at` | 내용의 마지막 의미 있는 변경 시각(ISO 8601). 최근 편집과 낡은 사실을 구별하는 데 쓴다 |
| `verified` | 확인 이벤트 목록. 각 항목은 `by`(actor)와 `at`(ISO 8601). "얼마나 최근인가"는 가장 늦은 `at`이다 |

`verified`가 목록인 이유는 독립적 검사 여러 건을 담기 위해서다. 명세 예시는 `human:ahormati`의 승인(2026-06-25)과 `process:finance-nightly`의 야간 점검(2026-06-26) 두 항목이다.

```yaml
generated: { by: reference_agent/gemini-2.5-pro, at: 2026-06-20T22:53:05Z }
verified:
  - { by: human:ahormati, at: 2026-06-25T09:00:00Z }
  - { by: process:finance-nightly, at: 2026-06-26T02:00:00Z }
```

이 예시에서 concept은 에이전트가 6월 20일에 썼고, 사람이 6월 25일에, 야간 프로세스가 6월 26일에 각각 확인했다. "얼마나 최근에 확인됐는가"는 가장 늦은 6월 26일이고, trust tier는 `human:` actor가 있으므로 human-reviewed다. `verified`는 `generated.at`과 독립적이다. 내용은 재확인 없이 바뀔 수 있고 사실은 재생성 없이 재확인될 수 있다. 확인 주체가 하나면 리스트 대시 없이 `{ by, at }` 매핑 하나로 적어도 되고(MAY), 소비자는 그 매핑을 1개짜리 리스트로 다루어야 한다(MUST).

trust tier는 소비자가 `verified`에서 유도한다. 낮은 단계부터 높은 단계 순서다.

| `verified` 상태 | trust tier |
|---|---|
| `verified` 키 없음 | unverified |
| `human:` 아닌 actor만 있음 | machine-confirmed |
| `human:<id>` actor 있음 | human-reviewed |

trust frontmatter가 없는 concept도 소비 가능하며 소비자는 거부해서는 안 된다(MUST NOT). trust tier는 권고 신호이지 접근 제어가 아니다. 즉 unverified 문서를 숨길지 표시할지는 소비자의 결정이다.

### lifecycle 기록

| `status` 값 | 의미 |
|---|---|
| `draft` | 아직 검토되지 않음. 불완전할 수 있음 |
| `stable` | 기본값. 소비 가능 |
| `deprecated` | 링크와 이력을 위해 유지하되 더 이상 현행이 아님 |

`status`가 없으면 `stable`이다. `stale_after`는 선택 키이며 절대 시각이다. concept은 `now >= stale_after`일 때 stale이다. 상대적 TTL이 아니라 절대 시각으로 두는 이유는 신선도 판정을 "언제 읽었는가"와 무관한 단순 비교로 끝내기 위해서다. TTL이었다면 소비자가 문서를 읽은 시각과 생성 시각을 함께 알아야 하지만, 절대 시각이면 현재 시각과 한 번 비교하면 된다.

### 링크와 경로

concept 사이 링크는 표준 markdown 링크 두 형태를 지원한다.

| 형태 | 예시 | 비고 |
|---|---|---|
| 절대(bundle 상대) | `[customers table](/tables/customers.md)` | `/`로 시작해 bundle 루트 기준으로 해석. 문서가 하위 디렉토리 안에서 옮겨져도 안정적이라 권장 |
| 상대 | `[neighboring concept](./other.md)` | 표준 markdown 상대 경로 |

A에서 B로 가는 링크는 관계가 있다는 사실만 주장한다. 관계의 종류(부모와 자식, 참조, 조인, 의존)는 링크가 아니라 주변 산문이 전달한다. 그래서 그래프 뷰를 만드는 소비자는 보통 모든 링크를 타입 없는 관계의 방향 엣지로 다룬다. 소비자는 끊긴 링크를 견뎌야 한다(MUST). 대상이 bundle에 없는 링크는 잘못된 것이 아니라 아직 쓰이지 않은 지식일 수 있다.

경로나 URI를 값으로 갖는 필드는 다섯 개다.

| 필드 | 위치 |
|---|---|
| `resource` | concept 최상위 |
| `sources[].resource` | provenance 항목. 범위 서술이면 경로가 아니다 |
| `computation` | Attested Computation |
| `executor.resource` | Attested Computation |
| `attester.resource` | Attested Computation |

각 필드는 절대 URL, `/`로 시작하는 bundle 상대 경로, 상대 경로(예: `../computations/revenue.md`)를 받는다. `references/` 하위 디렉토리는 외부 자료, 실행 지침, 코드를 bundle 안의 1급 concept으로 미러링하는 관용 위치다. source, executor, attester가 흔히 여기를 가리키며 예시는 `references/attesters/revenue.py`다. 명명 규약이지 요구 사항은 아니다.

### actor 규약

정체를 기록하는 필드(`generated.by`, `verified[].by`)는 하나의 actor 규약을 쓴다.

| 형식 | 대상 | 예시 |
|---|---|---|
| `<producer>/<version>` | 에이전트와 도구 | `reference_agent/gemini-2.5-pro` |
| `human:<id>` | 사람 | `human:ahormati` |
| `process:<id>` | 자동 프로세스 | `process:finance-nightly` |

trust를 분류하는 소비자는 `human:` 접두사로 판별한다. 따라서 생산자는 손으로 쓰거나 사람이 확인한 내용에 이 접두사를 반드시 써야 한다(MUST). 접두사를 빠뜨리면 사람의 승인이 machine-confirmed로 강등되는 결과가 된다.

### index.md와 log.md

| 항목 | `index.md` | `log.md` |
|---|---|---|
| 위치 | bundle 루트를 포함한 어느 디렉토리(MAY) | 계층의 어느 위치(MAY) |
| 목적 | 디렉토리 내용 열거. progressive disclosure | 그 범위의 변경 이력 |
| frontmatter | 없음. 예외로 bundle 루트 `index.md`만 `okf_version` 키를 실을 수 있다(MAY) | 규정 없음 |
| 본문 형식 | 헤딩 아래 `* [Title](relative-url) - short description` 항목을 묶은 하나 이상의 절 | 날짜별로 묶은 항목의 평면 목록. 최신이 먼저 |
| 규칙 | 항목에 링크된 concept의 `description`을 포함해야 한다(SHOULD) | 날짜 헤딩은 ISO 8601 `YYYY-MM-DD`(MUST). 앞머리 굵은 단어(`**Update**`, `**Creation**`, `**Deprecation**`)는 관례 |
| 생성 | 생산자가 자동 생성해도 되고 소비자가 없을 때 즉석에서 합성해도 된다(MAY) | 규정 없음 |

`index.md`가 하위 디렉토리 항목(`* [Subdirectory](subdir/) - ...`)을 포함할 수 있으므로 소비자는 루트 index에서 시작해 한 단계씩 내려갈 수 있다. `log.md`의 예시는 `# Directory Update Log` 아래 `## 2026-05-22`와 `## 2026-05-15` 두 날짜 헤딩을 두고 각 항목이 관련 concept을 링크하는 형태다.

명세의 두 예시는 다음과 같다.

```markdown
# Section / Group Heading

* [Title 1](relative-url-1) - short description of item 1
* [Title 2](relative-url-2) - short description of item 2

# Another Section

* [Subdirectory](subdir/) - short description of the subdirectory
```

```markdown
# Directory Update Log

## 2026-05-22
* **Update**: Added a BigQuery table reference for [Customer Metrics](/tables/customer-metrics.md).
* **Creation**: Established the [Dataplex Playbook](/playbooks/dataplex.md).

## 2026-05-15
* **Initialization**: Created foundational directory structure.
```

index 항목의 설명 문구는 링크된 concept의 `description`에서 가져오므로, 생산자가 `description`을 충실히 쓰면 index는 자동으로 유용해진다. log는 사람이 읽는 산문이라 항목의 종류(Update, Creation, Initialization)를 굵은 단어로 앞세우는 관례만 있고 기계가 파싱할 구조는 정하지 않는다.

### Attested Computation

Attested Computation concept은 값이 무엇을 뜻하는지만이 아니라 그 값을 계산하는 승인된 방법을 담는다. 이 타입이 필요한 이유는 provenance만으로는 답할 수 없는 질문이 있기 때문이다. provenance는 "이 주장은 어디서 왔는가"에 답하고, attestation은 "이 수치는 우리가 정한 방식대로 만들어졌는가"에 답한다. 매출 정의의 출처가 재무 규정 문서라는 사실과 이번에 표시된 매출 수치가 그 정의대로 계산됐다는 사실은 별개다. OKF는 계산과 그것을 검사할 수단을 기록할 뿐 스스로 아무것도 실행하지 않는다.

#### 독립 concept으로 두는 근거

승인된 계산은 `type: Attested Computation`인 독립 concept이다. 값이 필요한 concept(`Metric`, `BigQuery Table`)은 보통의 markdown 링크로 그 concept을 가리킨다. 명세는 계산을 지표 문서 안에 넣지 않고 따로 두는 근거를 셋 든다.

| 근거 | 설명 |
|---|---|
| `runtime`이 `parameters`의 의미를 정한다 | 같은 파라미터가 runtime에 따라 SQL 바인드 변수, dbt var, Python 인자가 된다. 둘을 한 frontmatter에 두어야 바인딩 의미가 자명하다 |
| 계산 하나에 소비자 여럿 | 같은 계산이 지표, 대시보드 concept, 리포트를 뒷받침한다. concept이면 한 번 참조하고 재사용한다 |
| trust 상태는 계산 단위다 | `verified`, `stale_after`, 단일 `attester`가 한 대상을 기술한다. 매출, 이익, 마진은 각각 따로 verify되고 attest되므로 frontmatter 하나에 항목 셋이 아니라 concept 셋이다 |

#### 계약 필드

계약은 concept의 최상위 frontmatter다. provenance, trust, lifecycle 세 계열에 더해 다음 키를 갖는다.

| 키 | 필수 여부 | 설명 |
|---|---|---|
| `runtime` | 이 타입에서 필수 | 계산을 어떻게 실행하는지, 그래서 executor와 attester가 어떻게 해석하고 `parameters`가 무엇을 뜻하는지를 정하는 단일 필드. 예시 값은 `bigquery`, `postgres`, `dbt`, `python`, `Looker` |
| `parameters` | 선택 | 에이전트가 채워도 되는 타입 있는 이름 붙은 구멍의 목록. 항목마다 `{ name, type, required }`. 바인딩 의미는 `runtime`을 따른다 |
| `computation` | 선택 | 계산을 담은 파일 경로. 본문 인라인 펜스 대신 쓴다. 없으면 본문 `# Computation` 펜스가 계산이다 |
| `executor` | 선택 | `resource`는 실행 지침이나 코드를 가리키고 러너(에이전트 또는 결정적 소비자 코드)가 따른다. `receipt`는 실행이 반환해야 할 필드, 즉 attester가 검사할 증거를 선언한다 |
| `attester` | 선택 | 결정적 검사. `resource`는 receipt를 받아 판정을 돌려주는 코드(LLM 없음)를 가리킨다. 소비자 쪽에서 실행되는 것을 전제한다 |

`resource` 뒤에 무엇이 있는지는 패키징 선택이다. 스킬, 스크립트, 컨테이너 어느 것이든 될 수 있고 OKF는 인터페이스를 고정하고 패키징은 규정하지 않는다. 명세 10.2절의 예시는 다음과 같다.

```yaml
type: Attested Computation
title: Revenue for fiscal year
status: stable
runtime: bigquery
parameters:
  - { name: year, type: integer, required: true }
executor:
  resource: references/skills/run-on-bq.md
  receipt: [job_id, executed_sql, result]
attester:
  resource: references/attesters/revenue.py
generated: { by: reference_agent/gemini-2.5-pro, at: 2026-06-20T22:53:05Z }
verified: { by: human:ahormati, at: 2026-06-25T09:00:00Z }
stale_after: 2026-09-23T00:00:00Z
sources:
  - id: rev-policy
    resource: https://wiki.acme/finance/revenue-recognition
    title: Revenue recognition policy
```

본문 `# Computation`에는 `SELECT SUM(amount) AS revenue FROM finance.recognized_revenue WHERE fiscal_year = @year`가 있고, 그 아래 산문이 `[^rev-policy]` 각주로 매출 인식 규정 문서에 귀속된다. `@year`가 선언된 파라미터 `year`에 대응하는 BigQuery 바인드 변수이며, `runtime: bigquery`가 이 대응 규칙을 정한다.

#### 계산 제공 방식

| 방식 | 방법 | 적합한 경우 |
|---|---|---|
| 인라인 | 본문 `# Computation` 아래 코드 펜스 하나 | 계약과 함께 검토되는 짧은 계산 |
| 파일 | `computation`에 경로를 적고 본문 펜스 생략(예: `references/computations/lib/revenue.sql`) | 길거나 생성된 계산, 또는 OKF 외 도구와 공유하는 실제 파일 |

#### 에이전트의 권한 경계

에이전트는 선언된 `parameters`의 값만 줄 수 있고(MAY) 계산을 쓰거나 고쳐서는 안 된다(MUST NOT). `computation`에 파라미터 값을 바인딩해 실행 가능한 산출물을 만드는 일은 소비자 몫이고, attester는 같은 바인딩을 독립적으로 다시 유도해 실제 실행된 것과 비교한다.

이 비교가 성립하는 이유는 비교 대상이 receipt에 담긴 전개되고 컴파일된 산출물(`executed_sql`, `compiled_sql`)이기 때문이다. 다시 쓴 쿼리, 바꿔치기한 계산 파일, 변조된 의존성은 모두 실제 실행된 SQL을 바꾸므로 검사에 실패한다. 에이전트에게 열린 표면이 타입 있는 파라미터뿐이라서 "승인된 것이 실행됐는가"는 판단이 아니라 기계적 비교가 된다.

문서 하나가 계산 하나인 경우는 드물다. 매출, 이익, 마진을 논하는 손익계산서 개요는 읽을 수 있는 concept 하나로 남고 수치마다 Attested Computation 하나씩을 링크한다. 명세 예시는 `type: Metric`인 Revenue concept이 `# Definition`에서 `[the revenue computation](../computations/revenue.md)`를 가리키는 형태다. 계산마다 concept이 따로 있으므로 매출은 신선한데 이익은 `stale_after`를 넘긴 상태가 가능하고, 각각 자기 실행에 대해 attest한다. 같은 폴더에 모으는 것(`computations/` 폴더와 `index.md`)은 디렉토리 선택이지 frontmatter 선택이 아니다.

#### 소비자 흐름

명세 10.5절은 소비자가 Attested Computation을 쓰는 흐름을 6단계로 적되 informative(규범이 아닌 안내)로 표시한다. 아래의 런타임 산출물은 bundle에 저장되지 않는다.

| 단계 | 내용 |
|---|---|
| 1. Discover | `type: Attested Computation`으로 발견한다. `index.md`로 끌어올릴 수 있는 frontmatter 신호이며, 직접 도달하거나 이를 쓰는 concept의 링크를 따라 도달한다 |
| 2. Load | frontmatter에서 계약을, 본문(또는 `computation`이 가리키는 파일)에서 계산을 읽는다 |
| 3. Parameterize | 에이전트가 선언된 파라미터의 값을 준다 |
| 4. Execute | executor가 바인딩된 계산을 실행하고 `executor.receipt` 형태의 receipt를 돌려준다 |
| 5. Attest | 소비자가 receipt에 attester를 실행한다. provenance(실행된 계산이 에이전트가 쓴 SQL이 아니라 주장된 파라미터로 바인딩한 `computation`과 같은지)와 fidelity(표시된 값이 receipt의 권위 있는 source와 일치하는지, 에이전트 텍스트가 아니라 job id로 다시 읽어서)를 확인한다 |
| 6. Gate | 실패한 attestation은 표시를 거부한다. `now >= stale_after`이면 경고하거나 거부한다. 성공하면 판정(예: job 로그 링크)을 노출해 신뢰를 눈에 보이게 한다 |

5단계의 fidelity 검사가 중요하다. attester는 계산이 승인된 것인지만 보는 것이 아니라, 화면에 표시된 값이 에이전트의 텍스트가 아니라 job id로 다시 읽은 실제 결과와 일치하는지도 본다. 즉 승인된 SQL을 실행한 뒤 결과 숫자를 잘못 옮겨 적는 경우도 잡는다.

#### verified와 attestation의 구분

| 항목 | `verified` | attestation |
|---|---|---|
| 확인 대상 | 정의가 여전히 규정과 맞는가 | 한 번의 실행이 승인된 방식으로 값을 냈는가 |
| 수준 | 문서 수준 | 호출 단위 |
| 속도 | 느림 | 실행마다 |
| 기록 위치 | bundle에 기록 | 런타임에만 존재. bundle에 저장하지 않음 |

둘은 서로를 대체하지 않는다. 정의가 낡은 concept도 깨끗하게 attest될 수 있고, 방금 verify된 정의도 실행마다 attestation이 필요하다. 그래서 명세는 둘 다 필요하다고 적는다.

### 적합성 조건과 소비자 의무

bundle이 OKF v0.2에 적합하려면 세 조건을 만족한다.

| 번호 | 조건 |
|---|---|
| 1 | 예약되지 않은 모든 `.md`가 파싱 가능한 YAML frontmatter 블록을 가진다 |
| 2 | 모든 frontmatter 블록이 비어 있지 않은 `type`을 가진다 |
| 3 | 예약 파일(`index.md`, `log.md`)이 있으면 8절과 9절의 구조를 따른다 |

trust, lifecycle, provenance, computation 계열이 있으면 생산자는 5절부터 10절을 따라야 하고(SHOULD) 소비자에게는 다음 의무가 있다.

| 강도 | 소비자 의무 |
|---|---|
| MUST | 리스트 대시 없는 `verified` 매핑을 1개짜리 리스트로 취급한다 |
| MUST NOT | optional 계열이 없다는 이유로 concept을 거부하지 않는다 |
| SHOULD | trust tier와 staleness를 명세된 필드에서만 유도한다 |
| SHOULD | 실패한 attestation을 조용히 버리지 않고 드러낸다 |

나머지 제약은 소비자가 느슨한 권고로 취급해야 한다(SHOULD). 특히 다음 다섯 가지를 이유로 bundle을 거부해서는 안 된다(MUST NOT).

- optional frontmatter 필드 누락
- 모르는 `type` 값
- 모르는 추가 frontmatter 키
- 끊긴 cross-link
- `index.md` 부재

이 관대한 적합성 원칙은 포맷의 확장성과 짝을 이룬다. 생산자가 임의 키와 임의 타입을 쓸 수 있으려면 소비자가 그것을 이유로 거부하지 않아야 한다.

### 버전 규칙과 v0.1 변경

버전은 `<major>.<minor>`로 매긴다.

| 상승 종류 | 허용 변경 | 예 |
|---|---|---|
| minor | 하위 호환 추가 | 새 optional 필드, 새 관용 절 헤딩 |
| major | breaking change 포함 가능 | 필수 필드 이름 변경, 예약 파일명 변경 |

bundle은 루트 `index.md`의 frontmatter 블록에 `okf_version: "0.2"`로 목표 버전을 선언할 수 있으며(MAY) 이곳이 `index.md`에 frontmatter가 허용되는 유일한 자리다. 선언된 버전을 모르는 소비자는 거부 대신 최선 소비를 시도해야 한다(SHOULD).

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

### reference agent

README에 따르면 reference agent는 두 pass로 실행된다.

| pass | 입력 | 동작 |
|---|---|---|
| BQ pass | BigQuery 메타데이터 | source가 광고하는 concept마다 OKF 문서를 하나씩 쓴다 |
| web pass | `--web-seed` 또는 `--web-seed-file`로 받은 seed URL | LLM이 자체 크롤러가 되어 seed를 `fetch_url` 도구로 가져오고, 바깥으로 나가는 링크가 기존 concept의 권위 있는 문서처럼 보이는지에 따라 따라갈지 정한다 |

web pass에서 가져온 페이지마다 에이전트는 세 가지 중 하나를 고른다.

| 선택 | 결과 |
|---|---|
| (a) 보강 | 기존 concept 문서 하나 이상을 보강한다 |
| (b) 신설 | 독립 `references/<slug>` 문서를 만든다 |
| (c) 건너뛰기 | 아무것도 쓰지 않는다 |

`--web-max-pages` 상한과 동일 도메인 허용 호스트 필터는 도구 안쪽에서 강제된다. LLM의 판단이 아니라 도구가 한도를 지키므로 에이전트가 한도를 초과해 실행할 수 없다. `--no-web`은 web pass 전체를 건너뛴다.

설치와 자격 증명은 README의 Install과 Credentials 절이 정한다.

| 항목 | 내용 |
|---|---|
| 설치 | `python3.13 -m venv .venv` 후 `.venv/bin/pip install --index-url https://pypi.org/simple/ -e .[dev]` |
| BigQuery | `gcloud auth application-default login`과 과금 프로젝트 설정 `gcloud config set project <id>`. 공개 데이터셋은 읽을 수 있지만 쿼리 바이트는 호출자 프로젝트에 과금된다 |
| Gemini (AI Studio) | `GEMINI_API_KEY` 설정 |
| Gemini (Vertex AI) | `GOOGLE_GENAI_USE_VERTEXAI=true`, `GOOGLE_CLOUD_PROJECT=<id>`, `GOOGLE_CLOUD_LOCATION=<region>` |
| 테스트 | `.venv/bin/pytest` |

최소 실행은 BigQuery 데이터셋과 bundle 출력 디렉토리를 가리키는 것이다.

```
.venv/bin/python -m reference_agent enrich \
    --source bq \
    --dataset <project>.<dataset> \
    --web-seed-file <path/to/seeds.txt> \
    --out ./bundles/<name>
```

| 옵션 | 의미 |
|---|---|
| `--source bq` | BigQuery를 source로 쓴다. README에 다른 값은 나오지 않는다 |
| `--dataset <project>.<dataset>` | 대상 데이터셋 |
| `--out ./bundles/<name>` | bundle 출력 디렉토리 |
| `--web-seed`, `--web-seed-file` | web pass의 seed URL. 생략하면 BQ 전용으로 실행된다 |
| `--web-max-pages` | web pass가 가져올 페이지 수 상한 |
| `--web-allowed-host` | 동일 도메인 허용 호스트 필터 설정 |
| `--no-web` | web pass 생략 |
| `--concept <type>/<name>` | concept 하나만 반복 작업한다. 예시는 `--concept tables/events_`이고 반복 지정할 수 있다 |

### visualizer

`visualize` 서브커맨드는 임의의 OKF bundle을 자기완결 인터랙티브 HTML 파일 하나로 렌더한다. 파일 하나이고 백엔드가 없으며 보는 쪽에 설치가 필요 없다. 최신 브라우저에서 열거나, 산출물로 공유하거나, 정적 파일 서버에 올리거나, 이 저장소처럼 bundle 옆에 커밋할 수 있다. README는 이 뷰어를 OKF의 PoC 소비자로, reference agent를 PoC 생산자로 대응시키면서, OKF bundle은 markdown을 읽는 무엇으로든 소비될 수 있고 이 뷰어는 그 한 형태일 뿐이라고 덧붙인다.

| 화면 요소 | 내용 |
|---|---|
| force-directed 그래프 | bundle의 모든 concept. 노드 색은 타입별(datasets, tables, references 등), 방향 엣지는 본문 cross-link에서 뽑는다 |
| 상세 패널 | 선택한 concept의 frontmatter(description, resource 링크, tags)와 렌더된 본문. 내부 `[…](/path/to/concept.md)` 링크는 경로를 따라가지 않고 뷰어 안에서 이동하도록 재연결된다 |
| Cited by 백링크 | 링크 그래프의 역방향에서 계산한 목록 |
| 검색 상자 | title, concept id, tags에 매칭 |
| 타입 필터 | 타입별 표시 전환 |
| 레이아웃 전환 | cose, concentric, breadth-first, circle, grid |

생성 명령은 `.venv/bin/python -m reference_agent visualize --bundle ./bundles/<name>`이며 기본적으로 `bundles/<name>/viz.html`을 쓴다.

| 플래그 | 기본값 | 설명 |
|---|---|---|
| `--bundle` | 필수 | bundle 루트 디렉토리 |
| `--out` | `<bundle>/viz.html` | 출력 HTML 경로 |
| `--name` | bundle 디렉토리명 | 뷰어 헤더에 표시할 이름 |

README의 예시는 `--bundle ./bundles/crypto_bitcoin --out /tmp/btc.html --name "Bitcoin OKF"`로 출력 위치와 헤더를 바꾸는 경우다. HTML은 bundle을 JSON blob으로 내장하고, 그래프에는 Cytoscape.js를, 브라우저 내 markdown 렌더링에는 marked를 쓰며 둘 다 CDN에서 로드한다. bundle은 생성 시점에 한 번 파싱되어 파일에 직렬화되므로 데이터는 페이지 밖으로 나가지 않는다.

## 결과

### 동봉 bundle과 recipe

정량 벤치마크는 없다. 명세와 PoC 저장소이므로 결과는 재현 가능한 bundle로 제시된다. 각 sample은 seed URL과 정확한 `enrich` 명령을 담은 recipe(`samples/<name>/`)와 그 recipe가 생성한 bundle(`bundles/<name>/`)의 짝이다. recipe를 열면 재현할 수 있고 bundle을 열면 결과를 바로 볼 수 있다.

| sample | 데이터 | README가 적은 시험 목적 | recipe | bundle |
|---|---|---|---|---|
| GA4 Google Merchandise Store | 공개 e-commerce 데이터셋. canonical GA4 BigQuery Export 문서 URL을 seed로 사용 | (기술 없음) | `samples/ga4_merch_store/README.md` | `bundles/ga4/` |
| Stack Overflow | 공개 데이터셋(Stack Exchange Data Dump의 미러). 커뮤니티의 canonical 스키마 참조를 seed로 사용 | 횡단 문서 페이지에서 여러 concept을 함께 보강 | `samples/stackoverflow/README.md` | `bundles/stackoverflow/` |
| Bitcoin (crypto) | `bitcoin-etl` 파이프라인의 공개 데이터셋(blocks, transactions, inputs, outputs) | 테이블 간 foreign key 관계를 산문으로 기술 | `samples/crypto_bitcoin/README.md` | `bundles/crypto_bitcoin/` |
| Acme Retail | (기술 없음) | (기술 없음) | (README에 recipe 없음) | `bundles/acme_retail/` |

네 bundle 모두 `viz.html`이 함께 체크인되어 있다. Stack Overflow는 횡단 문서 페이지 하나에서 여러 concept을 함께 보강하는 경우를, Bitcoin은 blocks와 transactions처럼 테이블 사이의 foreign key 관계를 산문에 담는 경우를 시험한다.

### 부록 A 손익계산서 예제

명세 쪽 실증은 부록 A의 손익계산서 예제다. 매출과 매출총이익 두 수치를 담은 v0.1 단일 문서를 서술 concept 하나와 Attested Computation 둘로 나누는 v0.1에서 v0.2로의 마이그레이션이다.

v0.1 형태는 두 수치를 한 `type: Metric` concept에 두었다. SQL은 에이전트가 읽거나 무시하거나 다시 쓸 수 있는 산문 속 코드였고, 인용은 `# Citations` 아래 평면 목록(핸드북, 매출 인식 규정, 원가 배분 기준의 세 URL)이었으며, 시각은 `timestamp: '2026-05-28T22:53:05+00:00'` 하나뿐이었다. 즉 누가 썼는지, 누가 확인했는지, 언제 낡는지, 어떤 SQL이 승인된 것인지를 어디에서도 읽을 수 없었다.

v0.2 형태는 다섯 종류의 파일로 나뉜다.

| 경로 | 타입 | 역할 |
|---|---|---|
| `metrics/income-statement.md` | Metric | 서술하고 두 계산을 링크한다 |
| `computations/revenue.md` | Attested Computation (`runtime: bigquery`) | 매출 계산 |
| `computations/profit.md` | Attested Computation (`runtime: dbt`) | 매출총이익 계산 |
| `references/skills/run-on-bq.md`, `run-dbt.md` | executor 대상 | 실행 지침 |
| `references/attesters/sql-equality.py`, `dbt-binding.py` | attester 대상 | 결정적 검사 코드 |

`metrics/income-statement.md`는 `status: stable`, `generated`(reference_agent/gemini-2.5-pro, 2026-06-20), `verified`(human:ahormati, 2026-06-25), `stale_after: 2026-12-31`, `sources`에 FP&A 보고 핸드북(`fpa-handbook`)을 가지며, 본문은 두 계산을 링크하고 각주로 핸드북에 귀속한다. 명세는 이 문서에 대해 "trust는 이 문서가 아니라 링크한 대상에 산다"고 적는다. 서술 문서는 어느 수치도 직접 계산하지 않기 때문이다.

두 계산의 frontmatter는 다음과 같이 다르다.

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

두 계산은 일부러 다른 상태에 놓여 있어 같은 소비자가 한 bundle 안에서 두 가지 다른 판정에 도달한다. 매출은 사람이 verify했고 신선하며, 한 달에 5,000회 조회된 살아 있는 대시보드 source가 뒷받침한다. 매출총이익은 프로세스가 verify했고 `stale_after`를 넘겼으므로 6단계 흐름의 Gate 단계에서 경고나 거부 대상이 된다. receipt 필드도 runtime에 따라 다르다. BigQuery는 `job_id`와 `executed_sql`을, dbt는 `run_id`와 `compiled_sql`을 돌려주므로 attester도 각각 SQL 동일성과 dbt 바인딩을 검사하는 별개 코드다.

두 예시 모두 `generated.at`이 `verified.at`보다 늦다. 매출은 6월 25일에 사람이 확인한 뒤 6월 28일에 내용이 다시 바뀌었고, 매출총이익은 6월 12일 야간 점검 뒤 6월 14일에 바뀌었다. 이는 5.2절이 말하는 "내용은 재확인 없이 바뀔 수 있다"의 사례이며, `generated`와 `verified`를 분리해 둔 이유를 예제 안에서 보여 준다.

### 소비자 흐름의 적용

10.5절의 6단계를 부록 A의 두 계산에 적용하면 같은 소비자가 어디에서 다른 판정에 이르는지 드러난다. 아래 표의 값은 모두 부록 A의 frontmatter에서 가져온 것이다.

| 단계 | `computations/revenue.md` | `computations/profit.md` |
|---|---|---|
| 1. Discover | `type: Attested Computation`. `metrics/income-statement.md`의 `[revenue](../computations/revenue.md)` 링크로 도달 | 같은 문서의 `[gross profit](../computations/profit.md)` 링크로 도달 |
| 2. Load | 본문 `# Computation`의 BigQuery SQL | 본문 `# Computation`의 dbt 모델 SQL |
| 3. Parameterize | 에이전트가 `year` 값을 준다 | 에이전트가 `year`와 `segment` 값을 준다 |
| 4. Execute | `references/skills/run-on-bq.md`를 따라 실행. receipt는 `job_id`, `executed_sql`, `result` | `references/skills/run-dbt.md`를 따라 실행. receipt는 `run_id`, `compiled_sql`, `result` |
| 5. Attest | `references/attesters/sql-equality.py`가 `executed_sql`을 바인딩된 계산과 비교 | `references/attesters/dbt-binding.py`가 `compiled_sql`을 모델과 바인딩으로 비교 |
| 6. Gate | `stale_after`가 2026-12-31이라 신선. attestation이 통과하면 값과 판정을 표시 | `stale_after`가 2026-06-15라 경과. 경고하거나 거부 |

두 계산의 attester 파일명이 다른 이유는 12절의 유보 항목과 이어진다. BigQuery 쪽은 실행된 SQL과 승인된 SQL의 동일성을 보면 되지만, dbt 쪽은 `{{ ref() }}`와 `{{ var() }}`가 컴파일된 결과를 봐야 하므로 비교 기준이 모델과 바인딩의 동일성으로 옮겨간다. 명세는 이런 semantic layer 템플릿을 아직 표준화하지 않았다고 밝힌다.

## 한계

### 명세가 미룬 항목

명세 12절의 "Considered and deferred" 절이 의도적으로 후속 개정으로 미뤘다고 밝힌 항목은 다음과 같다.

- 전체 런타임 프로토콜. receipt와 판정의 wire format, 실행을 둘러싼 attestation 수명주기가 비어 있어 attestation은 현재 인터페이스 선언까지만 표준이다.
- attester의 ABI, 이식성, 샌드박싱. 서빙과 스킬 관련 후속 작업과 함께 다뤄질 가능성이 크다고 적혀 있다. attester가 소비자 쪽에서 실행되는 것을 전제하면서 격리 규약은 아직 없다.
- attestation 캐싱.
- semantic layer 템플릿(Looker, dbt). attester의 비교 기준이 SQL 동일성에서 모델과 바인딩 동일성으로 옮겨가는 경우다.

명세 본문이 범위 밖이라고 적은 항목도 있다. lineage는 링크로만 표현하며 명시적 `derived_from`이나 데이터 lineage는 v0.2 범위 밖이다(5.1절). `usage_count`는 거친 신호라서 종류가 다른 source 사이의 정밀한 순위로는 쓸 수 없다(5.1절).

### 자료 내부의 서술 불일치

- README 상단은 "three ready-to-browse bundles"라고 적으면서 바로 아래에 bundle 4개(`ga4`, `stackoverflow`, `crypto_bitcoin`, `acme_retail`)를 나열한다. Samples 절의 recipe는 3개뿐이고 `acme_retail`의 recipe와 설명은 README에 없다.
- 명세 1절은 소비자의 질문을 다섯 개(provenance, trust, freshness, lifecycle, attestation)로 들면서, 바로 이어지는 문장에서 v0.2가 1급으로 만든 항목은 provenance, trust, lifecycle, attestation 넷이라고 적는다. freshness는 별도 계열 이름 없이 5.5절의 `stale_after`가 담당한다.
- 명세 13절은 v0.2가 12절 기준으로 minor 상승이라고 적으면서 동시에 의도적 breaking change 둘을 밝힌다. 12절의 정의상 breaking change는 major 상승이 포함할 수 있는 것이다. 명세는 이 예외를 v0.1 필드의 이름을 바꾸거나 퇴역시키기 때문에 따로 밝힌다고 설명한다.

### 현재 자료로 확인할 수 없는 항목

- 라이선스. README 본문에 라이선스 조항이 없고 raw에 `LICENSE.md`가 없다. frontmatter의 Apache-2.0은 유지하되 저장소의 LICENSE 파일을 직접 확인해야 한다.
- 소스 코드 구조, 테스트 개수, `enrich`의 내부 프롬프트와 파싱 방식. raw는 README와 SPEC 두 파일뿐이다.
- BigQuery 외 `--source` 값의 지원 여부. README는 `--source bq`만 보여 준다.
- 저장소의 이전 위치나 v0.1 저장소와의 관계. README와 SPEC 어디에도 기술이 없다.
- 무결성 검사(끊긴 링크, 모르는 타입) 절차. 명세는 소비자가 이를 견뎌야 한다고만 적고 검사 방법은 규정하지 않는다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| bundle | concept 문서를 담은 자기완결 디렉토리 트리. 배포 단위 |
| concept | bundle 안 지식의 최소 단위인 markdown 문서 하나. concept ID는 bundle 내 경로에서 `.md`를 뗀 값 |
| credibility signal | source마다 붙는 객관적 사실(`author`, `usage_count`, `last_modified`). OKF는 신호만 기록하고 점수는 저장하지 않는다 |
| trust tier | `verified`에서 유도되는 unverified, machine-confirmed, human-reviewed 세 단계. 저장되지 않는 권고 신호 |
| Attested Computation | 값을 계산하는 승인된 방법을 담은 concept 타입. 소비자가 그 방법대로 계산됐는지 확인하는 근거 |
| attester | receipt를 검사해 판정을 내는 결정적 코드. LLM을 쓰지 않으며 소비자 쪽에서 실행된다 |

## 관련 페이지

- [[applications/wlsdks-ontology-atlas]]: markdown 폴더의 frontmatter를 그래프로 컴파일하고 backlink를 파생시키는 점이 OKF의 visualizer와 같다. 다만 Atlas는 종류와 관계 타입을 작은 고정 집합으로 두는 반면, OKF는 `type` 값을 중앙에 등록하지 않고 링크에 관계 종류를 두지 않는다.
- [[applications/kmyu-2026-akb-llmwiki-gbrain-comparison]]: 에이전트 메모리를 knowledge base로 다루는 세 시스템을 비교하면서 lifecycle 상태값, provenance 필드, stale 탐지를 운영 기능으로 제안한다. OKF의 `status`, `stale_after`, `sources`가 같은 문제를 파일 포맷 수준에서 다룬다.
- [[applications/kmyu-2026-llm-wiki-pattern-synthesis]]: LLM이 markdown과 frontmatter로 지식 베이스를 계속 갱신하는 LLM Wiki 패턴을 정리한다. OKF 명세가 전제하는 "에이전트가 지속적으로 유지하는 코퍼스"와 같은 대상을 다루지만, 두 자료가 서로를 언급하지는 않는다. 같은 계보로 보는 것은 이 wiki의 해석이다.
- [[overviews/glossary-agents]]: progressive disclosure, 스킬, 컨텍스트 등 이 페이지가 쓴 agents 도메인 용어의 표기 기준.
