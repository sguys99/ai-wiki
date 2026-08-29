---
title: "Ontology Atlas"
type: repo
year: 2026
category: applications
raw_path: raw/repos/wlsdks-ontology-atlas.md
raw_filename: "wlsdks-ontology-atlas.md"
source: wlsdks-ontology-atlas.md
source_collection: external
org: "wlsdks"
repo: "ontology-atlas"
url: "https://github.com/wlsdks/ontology-atlas"
license: "MIT"
tags:
  - ontology
  - codebase-ontology
  - knowledge-graph
  - mcp
  - local-first
  - markdown-vault
  - coding-agent
  - blast-radius
  - architecture-conformance
  - tauri
  - obsidian
  - claude-code
figures:
  - id: fig01
    file: assets/wlsdks-ontology-atlas/topology-overview.png
    raw: https://raw.githubusercontent.com/wlsdks/ontology-atlas/main/docs/assets/readme/topology-overview.png
    caption: "Storefront 예제 vault를 프로젝트 허브로 연 macOS 앱. 도메인과 관계, 그리고 도메인별 capability·element 개수를 나열한 INDEX"
    strategy: manual
    curated: false
  - id: fig02
    file: assets/wlsdks-ontology-atlas/docs-workspace.png
    raw: https://raw.githubusercontent.com/wlsdks/ontology-atlas/main/docs/assets/readme/docs-workspace.png
    caption: "Docs 작업 공간 — vault 트리, capability 문서 하나, frontmatter 요약, 출처 날짜, backlink, 그리고 map의 같은 노드로 돌아가는 링크"
    strategy: manual
    curated: false
  - id: fig03
    file: assets/wlsdks-ontology-atlas/agent-connect.png
    raw: https://raw.githubusercontent.com/wlsdks/ontology-atlas/main/docs/assets/readme/agent-connect.png
    caption: "Agents 화면 — 이 컴퓨터에서 발견된 코딩 에이전트, 대화·연결 점검, 선택한 폴더에 한정된 3단계 MCP 연결 흐름"
    strategy: manual
    curated: false
  - id: fig04
    file: assets/wlsdks-ontology-atlas/topology-focus.png
    raw: https://raw.githubusercontent.com/wlsdks/ontology-atlas/main/docs/assets/readme/topology-focus.png
    caption: "Cart Session을 선택한 map — 무관한 개념은 흐려지고 typed parent 관계만 남으며, 오른쪽 inspector가 Ask agent·Edit·More·evidence를 연다"
    strategy: manual
    curated: false
  - id: fig05
    file: assets/wlsdks-ontology-atlas/three-dimensional-views.png
    raw: https://raw.githubusercontent.com/wlsdks/ontology-atlas/main/docs/assets/readme/three-dimensional-views.png
    caption: "3D 뷰 선택기 — 평면 map인 Flat, containment를 깊이로 세우는 Dome, 관계가 세 축을 정하는 Cloud"
    strategy: manual
    curated: false
  - id: fig06
    file: assets/wlsdks-ontology-atlas/relation-review.png
    raw: https://raw.githubusercontent.com/wlsdks/ontology-atlas/main/docs/assets/readme/relation-review.png
    caption: "map 옆의 관계 리뷰 — source, 관계 타입, target, 이유, 그리고 쓰기 확정 전에 바뀔 dependencies·relation notes 필드"
    strategy: manual
    curated: false
  - id: fig07
    file: assets/wlsdks-ontology-atlas/history-review.png
    raw: https://raw.githubusercontent.com/wlsdks/ontology-atlas/main/docs/assets/readme/history-review.png
    caption: "History 화면 — 커밋되지 않은 개념 변경 하나, 그 Markdown diff, 현지 시각 커밋 시간, 명시적 커밋 동작"
    strategy: manual
    curated: false
  - id: fig08
    file: assets/wlsdks-ontology-atlas/graph-insights.png
    raw: https://raw.githubusercontent.com/wlsdks/ontology-atlas/main/docs/assets/readme/graph-insights.png
    caption: "Insights 구성 화면 — 개념·관계 총계, kind 분포, 그래프 건강도, 도메인별 capability 대 element 막대"
    strategy: manual
    curated: false
  - id: fig09
    file: assets/wlsdks-ontology-atlas/projects-coverage.png
    raw: https://raw.githubusercontent.com/wlsdks/ontology-atlas/main/docs/assets/readme/projects-coverage.png
    caption: "Projects 화면 — Storefront 프로젝트의 파생 총계, 9개 도메인 구성 행, 최근 활동, 상세와 map으로 돌아가는 경로"
    strategy: manual
    curated: false
---

## 요약 (Summary)

소스 코드는 시스템이 어떻게 도는지 보여 주지만, 그 코드가 어느 제품 capability를 위한 것인지, 경계가 왜 거기 그어졌는지, 무엇을 바꾸면 어디가 흔들리는지는 대개 남기지 않는다. Ontology Atlas는 그 답을 코드 옆의 Markdown 폴더에 두는 로컬 워크벤치다.

파일 하나가 노드 하나이고, frontmatter가 자기 종류와 무엇을 가리키는지 선언한다. 종류와 관계 타입이 작은 고정 집합이라 폴더는 읽을 수 있는 데서 그치지 않고 계산 가능해진다. Atlas는 이걸 그래프로 컴파일해 노트 도구가 답하지 못하는 질문을 받는다. 이걸 바꾸면 뭐가 깨지는지, blast radius가 어디까지인지, 두 대상을 잇는 경로가 무엇인지, 무엇이 끊겼고 낡았는지.

읽는 쪽이 둘이라는 게 이 제품의 축이다. 에이전트는 MCP로 그 질문을 던지고 사람은 같은 답을 map으로 읽는다. 에이전트가 쓴 것은 전부 Markdown 파일의 한 줄로 떨어지므로 판정은 git diff가 한다. README가 "사람만 쓰는 위키는 쓰인 그 주에 썩고, 에이전트만 쓰는 저장소는 판단할 사람이 없어 드리프트한다"고 적은 자리가 그 지점이다.

## 주요 기여 (Key Contributions)

- **Markdown 폴더가 데이터베이스 전체다.** 폴더를 겨누면 그 자리에서 읽고 쓴다. import 단계도, 만들어 둘 인덱스도, 계정도 없다.
- **authorable node kind가 다섯 개로 고정돼 있다.** `project`·`domain`·`capability`·`element`·`document`. 고정 집합이 계산 가능성의 전제다.
- **typed 그래프 질의.** blast radius, reachability, cycles, paths, centrality, health. 그래프 데이터베이스나 호스팅 메모리는 끼지 않는다.
- **MCP over stdio와 CLI가 같은 권한을 갖는다.** 커넥터를 붙일 수 없는 세션도 CLI로 같은 폴더를 다룬다.
- **architecture는 ontology 위의 또 다른 층이 아니라 별도 계약이다.** `architecture-profile/v1` 문서가 구현 역할·경로·허용 의존 방향을 선언하고 CLI가 현재 소스 import와 대조해 `conforms`·`violated`·`unknown`을 낸다.
- **JSON-LD와 GraphML로 나간다.** 같은 결정적 컴파일 산출물에서 떨어져 나오므로 rdflib·Protégé·Gephi·Cytoscape·NetworkX·Neo4j에서 자체 변환기 없이 열린다.
- **scaffold한 vault가 agent skills를 들고 온다.** `init`이 review·grow·absorb 절차를 vault에 써 두므로 연결된 에이전트가 추가 설정 없이 명령 메뉴에서 찾는다.

## 방법론 및 아키텍처 (Methodology and Architecture)

### vault의 문법

vault는 Atlas가 그래프로 컴파일하는 Markdown 폴더를 가리킨다. frontmatter가 기계가 읽는 레코드, 본문이 사람이 판단하는 설명이다.

```yaml
---
uid: 71890f3e-7b5d-4c0a-8f14-123456789abc
slug: capabilities/token-issue
kind: capability
title: Token issue
domain: domains/auth
path: src/auth/token-service.ts          # a path — code evidence
elements:
  - elements/jwt-signer                  # a slug — an implementation-role node
dependencies:
  - capabilities/session-refresh  # a slug — another node
---
```

먼저 익힐 구분은 하나다. path는 코드를 가리키고 slug는 노드를 가리킨다. 둘을 섞는 게 가장 흔한 첫 실수이고 `validate`가 dangling reference로 잡는다. uid는 영구 정체성, slug는 읽을 수 있는 현재 주소로 역할이 갈리며 소스 위치는 `path:` 증거에 속한다.

비즈니스에서 코드로 내려가는 척추는 일부러 작다.

```text
project
└── domain
    └── capability
        └── element
```

`document`가 다섯 번째 kind로 이 척추 어디에든 붙는 개념을 서술한다. 구현 증거는 노드의 path와 본문에 있고 별도의 `evidence` 관계를 만들지 않았다. 모든 심볼을 색인하는 게 목표가 아니라, 사람이나 에이전트가 capability를 이해하고 영향을 추적하고 올바른 증명을 돌리는 데 도움이 될 때 소스 산출물이 노드 자격을 얻는다.

### 관계는 선언한 파일이 소유한다

관계 데이터베이스도 동기화 단계도 없다. 선언하는 파일이 frontmatter 한 줄을 갖고 있으면 Atlas가 vault를 읽을 때 엣지와 backlink를 파생시킨다. `dependencies`는 방향이 있고 `relates`는 대칭이라 map이 유사성을 인과로 바꾸지 않는다. containment는 구조 층이지 천장이 아니어서 의미 관계는 도메인과 가지를 넘나든다.

### 쓰기 전에 판정이 먼저 나온다

에이전트가 관계를 하나 추가하려 하면 dry-run이 먼저 스키마 패턴을 판정한다.

```console
$ node $ATLAS/cli/src/index.mjs relate capabilities/return-request capabilities/refund dependencies ./storefront --dry-run

capabilities/return-request --dependencies--> capabilities/refund
  verdict matches_existing_schema · exists no
  schema  capability --dependencies--> capability
  pattern count 51 · resolved 51 · external 0 · unresolved 0
  recommendation safe_to_add · No exact or inverse edge found; capability --dependencies--> capability is an existing schema pattern.
```

vault가 한 번도 써 본 적 없는 모양이면 `new_schema_pattern · review_new_schema`로 돌아온다. 드리프트하는 에이전트가 쓰고 난 뒤가 아니라 쓰기 전에 눈에 띈다는 게 이 판정의 값이다.

### 모르는 것을 초록으로 칠하지 않는다

blast radius는 한 노드를 바꿀 때 파급이 닿는 범위를 뜻한다. Atlas는 승인된 의존 선언만 따라가고 폴더 구조를 인과적 확신으로 바꾸지 않는다.

```console
$ node $ATLAS/cli/src/index.mjs blast-radius capabilities/mcp-server docs/ontology --depth 2
capabilities/mcp-server — blast radius (depth 2, incoming)
  risk unknown · 1 node · 1 relation · 0 cross-domain

impact certainty unknown · declared 1 · rationale 0 · source-backed 0
Counts below follow declared depends_on only. Use reachability/subgraph for structure;
do not read unknown as low risk.
```

`unknown`을 낮은 위험으로 읽지 말라는 경고가 출력 안에 박혀 있다. architecture 검사도 커버리지나 import 사용이 unknown인 상태를 초록으로 표시하지 않는다. 리뷰를 거친 정확한 element import는 직접 소스 의존 하나까지 뒷받침하고, 런타임·역방향·전이·비즈니스 영향은 별도 증거 없이 unknown으로 남는다.

### 화면과 에이전트 연결

Map, Architecture, Docs, Insights, Projects, Agents, Git History가 모두 같은 폴더를 읽는다. 노드를 고르면 무관한 것이 흐려지고 노드를 inspector 뒤로 숨기지 않은 채 레코드가 열린다. 공간 해석은 Flat·Dome·Cloud 셋으로 갈라 두고 섞지 않으며, 뷰를 바꿔도 그래프는 그대로다. Projects 화면은 손으로 유지하는 값이 하나도 없다. frontmatter에 `project:` 키가 없고 런타임이 containment 그래프를 걸어 커버리지를 파생시킨다.

MCP 연결은 경로를 먼저 보여 주고, 확인하면 없는 파일만 만들고, 마지막에 `mcp-verify`로 실제 서버 프로세스와 vault 계약을 증명하는 순서다. 파일이 있다는 사실을 살아 있는 연결로 제시하지 않는다는 원칙이 이 3단계에 걸려 있다. 서버는 stdio로 말해서 에이전트가 필요할 때 띄우고 끝나면 사라지며, 포트를 열지 않고 네트워크 요청도 하지 않는다.

## 결과 (Results)

repo라 성능 수치는 없다. README가 내놓는 건 포지셔닝 비교표다.

| | Notes with MCP | Hosted graph memory | Ontology Atlas |
|---|---|---|---|
| 저장소 | 내가 소유한 Markdown | 벤더 데이터베이스 | 내가 소유한 Markdown |
| 구조 | 자유 형식 노트와 링크 | 벤더가 정한 타입 | project → domain → capability → element, document, typed 관계 |
| 그래프 질의 | 노트 순회 | 그래프 엔진 | blast radius, reachability, cycles, paths, centrality, health |
| 코드 기반 증거 | 손으로 작성 | 코퍼스 인제스트 | 읽기 전용 제안, 승인 전에는 아무것도 반영되지 않음 |
| 사람이 쓰는 면 | 노트 앱 | 벤더 콘솔 | 로컬 Map·Architecture·Docs·Insights·Projects·Agents·History |

에이전트가 대화를 기억하기만 하면 되면 노트 도구가 가볍고, Atlas는 코드가 구현하는 제품을 모델링하는 쪽이라는 게 README의 선 긋기다.

품질 계약도 수치가 아니라 판정 기준이다. vault 전체나 프로젝트 단위 노드 상한은 없고 노드 수는 관찰값이지 통과 조건이 아니다. 직접 fan-out은 리뷰 신호이지 한계가 아니어서, 자식들이 해소되고 서로 다른 역할을 이름 붙이고 출처가 분명하면 넓은 허브도 옳다. bridge 노드는 하나의 공유 행동을 이름 붙이고 형제와 다르고 실제로 자식을 재부모화할 때만 자기 층을 얻으며, 개수만으로는 정당화되지 않는다.

## 한계 (Limitations)

- 지금까지 나온 모든 공개 빌드가 prerelease다. release candidate가 최종 빌드와 같은 서명·notarize·설치·업데이트 검사를 통과하긴 해도 아직 널리 돌려 본 적이 없다.
- Windows x64는 의도적으로 서명하지 않은 공개 베타다. SmartScreen이 경고할 수 있고 관리되는 업무용 PC는 설치를 거부할 수 있다.
- Linux를 비롯한 나머지 플랫폼에 패키지 빌드가 없다. 브라우저 앱이나 소스 체크아웃의 CLI·MCP 서버로 돌린다.
- 웹과 데스크톱이 같은 화면을 약속하지 않는다. git 이력과 오프라인 작업은 데스크톱 능력이고 웹은 File System Access 핸들을 IndexedDB에 기억하지만 git이나 네이티브 브리지를 돌릴 수 없다. 백로그가 아니라 경계 선언이다.
- vault 포맷 v2.0-rc는 kill criterion을 달고 있다. 명시된 피드백 기간에 외부 참여가 없으면 표준화 트랙을 접는다.
- npm에 없다. `npx ontology-atlas`는 404이고 앞으로의 기능도 아니다.
- 서드파티 플러그인 런타임을 두지 않는다. 확장은 MCP 도구, agent skills, 내 vault 안의 파일로만 일어난다.
- RDF·OWL·SKOS·SHACL 구현이 아니다. Markdown vault는 RDF 직렬화가 아니고 validator는 SHACL 프로세서가 아니며 질의 엔진은 reasoner가 아니다. 저장된 관계는 선언된 주장이지 entailment가 아니고, 없는 관계는 눈에 보이는 빈틈이지 부정 사실이 아니다.
- 코드 인덱스가 아니다. grep·language server·AST 인덱스·CodeGraph가 심볼의 위치와 호출자를 답하는 자리를 대체하지 않는다.
- 일반 목적 ontology 편집기가 아니다. 코드베이스에서 출발하므로 코드베이스와 무관한 지식 관리는 다른 도구의 몫이다.

## 관련 페이지 (Related Pages)

- [[applications/colbymchenry-codegraph]] — tree-sitter로 코드 심볼 그래프를 만드는 MCP 서버. README가 CodeGraph를 대체 대상이 아니라 역할이 다른 이웃으로 명시했다. 심볼이 어디 있는지는 CodeGraph, 왜 중요한지는 Atlas
- [[applications/lum1104-understand-anything]] — 코드베이스를 파이프라인으로 분석해 knowledge graph와 투어를 만든다. 분석 산출물이 그래프인 쪽이고, Atlas는 사람이 손으로 쓰고 리뷰하는 vault가 원본인 쪽
- [[applications/langchain-ai-openwiki]] — 코드베이스 문서를 에이전트를 위해 자동 생성·갱신한다. 자동 생성과 큐레이션이라는 축에서 Atlas의 반대편
- [[applications/agricidaniel-claude-obsidian]] — Markdown vault와 Obsidian 위에 에이전트 스킬을 얹은 구현체. vault 형식이 그래프 스키마인지 자유 노트인지가 갈리는 지점
- [[applications/dnotitia-akb]] — MCP-first agent knowledge base. Postgres와 vector store를 두는 쪽이라 "디스크가 곧 데이터베이스"인 Atlas와 저장소 전략이 대비된다
- [[applications/safishamsi-graphify]] · [[applications/graphify-labs-graphify]] — 임의 폴더를 knowledge graph로 컴파일한다. 컴파일 대상이 코드 자체인지, 사람이 쓴 ontology인지가 다르다
- [[agents/getzep-graphiti]] — 비교표의 "hosted graph memory" 자리에 대응하는 오픈소스 엔진. typed 순회를 데이터베이스에서 제공한다
- [[applications/kmyu-2026-akb-llmwiki-gbrain-comparison]] — AKB·llmwiki·GBrain을 6축으로 채점한 비교 리포트. Atlas를 같은 축에 올려 볼 때 참고
- [[applications/liu-2026-rag-llm-wiki-or-gbrain]] — 에이전트의 job으로 RAG·LLM Wiki·Fat Skills를 가르는 결정 프레임워크
- [[applications/dragon1086-llm-wiki]] · [[applications/joonan30-llm-wiki-labs]] — Karpathy LLM Wiki 패턴의 한국어 실측 구현. 사람과 에이전트가 같은 Markdown을 함께 쓰는 계보의 이웃
