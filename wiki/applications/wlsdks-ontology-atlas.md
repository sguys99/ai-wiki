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
  - claude-code
figures:
  - id: fig01
    file: assets/wlsdks-ontology-atlas/topology-overview.png
    raw: https://raw.githubusercontent.com/wlsdks/ontology-atlas/main/docs/assets/readme/topology-overview.png
    caption: "Storefront 예제 vault를 연 Map 화면. 가운데 Online Store 프로젝트 노드에 도메인들이 붙고, 오른쪽 inspector가 kind와 최근 변경, code evidence 미측정 상태, contains 9를 보여 준다"
    strategy: manual
    curated: true
  - id: fig03
    file: assets/wlsdks-ontology-atlas/agent-connect.png
    raw: https://raw.githubusercontent.com/wlsdks/ontology-atlas/main/docs/assets/readme/agent-connect.png
    caption: "Agents 화면. 이 컴퓨터에서 찾은 코딩 에이전트 3종과 나머지 36종 목록, 그리고 선택한 폴더에 한정된 3단계 MCP 연결 흐름"
    strategy: manual
    curated: true
  - id: fig04
    file: assets/wlsdks-ontology-atlas/topology-focus.png
    raw: https://raw.githubusercontent.com/wlsdks/ontology-atlas/main/docs/assets/readme/topology-focus.png
    caption: "Orders 도메인을 선택한 Map. 무관한 개념은 흐려지고 관련 노드만 남으며, 오른쪽 inspector가 contains 14, used by 2, leans on 3, belongs to 1로 관계를 종류별로 센다"
    strategy: manual
    curated: true
  - id: fig06
    file: assets/wlsdks-ontology-atlas/relation-review.png
    raw: https://raw.githubusercontent.com/wlsdks/ontology-atlas/main/docs/assets/readme/relation-review.png
    caption: "쓰기 직전의 관계 리뷰. From capabilities/order-cancel, Relation depends_on, To capabilities/refund와 그 이유, 그리고 실제로 바뀔 dependencies와 relation_notes 필드가 그대로 보인다"
    strategy: manual
    curated: true
  - id: fig07
    file: assets/wlsdks-ontology-atlas/history-review.png
    raw: https://raw.githubusercontent.com/wlsdks/ontology-atlas/main/docs/assets/readme/history-review.png
    caption: "History 화면. 왼쪽은 상대 시각으로 늘어놓은 변경 목록이고 오른쪽은 아직 저장하지 않은 capabilities/order-cancel의 Markdown diff다. dependencies 한 줄이 바뀌고 relation_notes가 늘었다"
    strategy: manual
    curated: true
---

## 요약

Ontology Atlas는 코드베이스가 무엇을 만들고 왜 그런 경계를 갖는지를 저장소 안의 Markdown 폴더 하나로 유지하는 로컬 워크벤치다. wlsdks가 MIT로 공개했고, macOS 서명 앱과 Windows 미서명 베타, 정적 웹앱, 소스 체크아웃의 CLI로 배포된다.

Markdown 파일 하나가 그래프의 노드 하나가 된다. frontmatter가 자기 종류와 무엇을 가리키는지 선언하고, Atlas는 그 폴더를 읽어 그래프로 컴파일한다. 종류와 관계 타입이 작은 고정 집합이기 때문에 폴더는 읽을 수 있는 데서 그치지 않고 계산 가능해진다.

계산 가능해진 폴더는 일반 노트 도구가 답하지 못하는 질문을 받는다. 이 노드를 바꾸면 무엇이 깨지는지, 어느 capability의 영향 범위가 어디까지인지, 두 대상을 잇는 경로가 무엇인지, 무엇이 끊겼고 무엇이 낡았는지를 묻는다.

읽는 쪽이 둘이라는 점이 이 제품의 설계 전제다. 코딩 에이전트는 MCP로 그 질문을 던지고, 사람은 같은 답을 map으로 읽는다. 에이전트가 쓴 것은 전부 Markdown 파일의 한 줄로 떨어지므로 최종 판정은 git diff가 한다.

![[assets/wlsdks-ontology-atlas/topology-overview.png]]
*Figure 1: Storefront 예제 vault를 연 Map 화면. 가운데 Online Store 프로젝트 노드에 도메인들이 붙어 있고, 오른쪽 inspector가 kind와 최근 변경 시점, code evidence 미측정 상태, contains 9를 보여 준다 (wlsdks 2026, README).*

## 배경

소스 코드는 시스템이 어떻게 작동하는지 보여 준다. 그러나 그 코드가 어느 제품 capability를 위한 것인지, 경계가 왜 거기 그어졌는지, 무엇을 바꾸면 어디가 영향을 받는지는 대개 코드에 남지 않는다.

이 빈틈을 메우는 기존 수단은 둘 다 오래가지 못한다는 것이 README의 출발점이다. 사람만 쓰는 위키는 쓰인 그 주에 낡고, 에이전트만 쓰는 저장소는 판단할 사람이 없어 드리프트한다.

Atlas는 두 독자가 같은 층을 함께 읽고 쓰게 만들고 중재자를 git diff로 둔다. 사람이 파일과 diff로 판단하고, 에이전트는 MCP로 같은 그래프를 질의하고 갱신한다.

변경 전에 이 답을 열어 두는 것이 사용 시나리오다. 사람과 에이전트가 같은 지점에서 출발하도록 코드가 무엇을 위한 것인지, 어디서 시작할지, 무엇을 더 건드리는지, 무엇을 확인해야 하는지를 함께 본다. 그 답은 경계가 정해져 있다. 관찰된 capability 목록을 전수로 취급하지 않고, 뒷받침되지 않는 범위는 눈에 보이는 불확실성으로 남긴다.

### 배포와 상태

README가 스스로 못박는 조건이 둘 있다. 지금까지 나온 모든 공개 빌드는 prerelease이고, vault 포맷은 v2.0-rc로 공개 의견을 받는 RFC 상태다.

| 형태 | 상태 |
|---|---|
| macOS 앱 | Developer ID 서명과 notarize를 마쳤다. 컴파일된 MCP 서버를 자기 번들 안에 담는다 |
| Windows x64 | 의도적으로 서명하지 않은 퍼블릭 베타. 같은 로컬 폴더와 MCP 표면을 갖되 서명만 없다 |
| 호스팅 웹앱 | 정적 export. File System Access API로 로컬 폴더를 열며 설치가 필요 없다 |
| Linux와 그 외 | 패키지 빌드가 없다. 브라우저 앱이나 소스 체크아웃의 CLI와 MCP 서버로 실행한다 |

릴리스 권위는 README가 아니라 다운로드 페이지다. 그 페이지가 현재 게시된 태그, 실제 파일 크기, 체크섬, 플랫폼, 서명 상태를 생성된 기록으로 렌더한다. README는 태그도 체크섬도 복사하지 않는데, 오래된 문서가 사람들이 곧 설치할 파일과 어긋나지 않게 하려는 의도적 설계다.

앱 안의 업데이터는 가장 최근 비초안 GitHub Release에서 준비한 Pages 매니페스트를 읽으며 release candidate도 포함한다. 다만 어떤 아카이브든 설치 전에 번들된 업데이터 서명 검사를 통과해야 한다.

## 핵심 개념

### vault

vault는 에이전트와 사람이 같이 읽고 쓰는 Markdown 파일 폴더를 뜻한다. Atlas에서 vault는 그래프로 컴파일되는 대상이자 유일한 저장소다. 앱을 폴더에 겨누면 그 자리에서 읽고 쓴다. import 단계도, 미리 만들어 둘 인덱스도, 계정도 없다.

파일 하나가 노드 하나다. frontmatter는 기계가 읽는 레코드이고 본문은 사람이 판단하는 설명이다.

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

Issues access and refresh tokens for authenticated users.
```

### 다섯 kind와 척추

ontology는 도메인의 개체 종류와 관계 타입을 고정된 집합으로 정의한 구조다. Atlas의 고정 집합은 사람이 직접 쓸 수 있는 다섯 kind이고, 여기에 reader 전용 예약 kind가 하나 더 있다.

| kind | 역할 |
|---|---|
| `project` | 최상위 루트. 런타임이 여기서 containment 그래프를 따라가 커버리지를 파생시킨다 |
| `domain` | 제품의 영역 구분. Storefront 예제에서는 주문, 재고, 결제, 배송 같은 단위다 |
| `capability` | 제품이 실제로 제공하는 기능 단위. 코드 증거가 붙는 주된 자리다 |
| `element` | capability를 구현하는 역할 노드 |
| `document` | 다섯 번째 authorable kind. 척추 어디에든 붙는 개념을 서술한다 |

비즈니스에서 코드로 내려가는 척추는 일부러 작게 잡았다.

```text
project
└── domain
    └── capability
        └── element
```

모든 심볼을 색인하는 것이 목표가 아니다. 사람이나 에이전트가 capability를 이해하고 영향을 추적하고 올바른 증명을 실행하는 데 도움이 될 때 소스 산출물이 노드 자격을 얻는다. README는 이 원칙을 "curated, not exhaustive"로 요약한다.

### slug와 uid와 path

세 식별자의 역할이 갈린다. 이 구분이 vault를 쓸 때 가장 먼저 익혀야 하는 문법이다.

| 필드 | 가리키는 대상 | 성격 |
|---|---|---|
| `uid` | 노드 자신 | 영구 정체성. 이름이 바뀌어도 유지된다 |
| `slug` | 노드 자신 | 읽을 수 있는 현재 주소. 변할 수 있다 |
| `path` | 소스 코드 | 파일 경로 증거. 노드가 아니라 코드를 가리킨다 |

path는 코드를 가리키고 slug는 노드를 가리킨다. 둘을 섞는 것이 가장 흔한 첫 실수이고, `validate` 명령이 dangling reference로 잡아낸다.

저장소 루트 디렉토리도 유효한 명시 경로다. 리뷰를 거친 `path:` 값이 `src`나 `generate` 같은 디렉토리여도 소스 receipt와 finalization에 참여한다. 다만 임의의 관계 slug가 파일 증거가 되지는 않는다.

### typed 관계

관계 데이터베이스도, 동기화 단계도 없다. 선언하는 Markdown 파일이 frontmatter 한 줄을 갖고 있으면 Atlas가 vault를 읽을 때 엣지와 backlink를 파생시킨다.

```yaml
---
slug: capabilities/vault-live-updates
kind: capability
domain: domains/local-vault-management
dependencies:
  - capabilities/topology-canvas-render   # directed: this depends on that
relates:
  - capabilities/mcp-conflict-guard       # symmetric: read these together
---
```

| 관계 | 방향 | 읽는 법 |
|---|---|---|
| `dependencies` | 방향이 있다 | 이 노드가 저 노드에 의존한다 |
| `relates` | 대칭이다 | 두 노드를 함께 읽어야 한다 |

방향 있는 관계와 대칭 관계를 분리해 둔 이유는 map이 유사성을 인과로 바꾸지 않게 하려는 것이다. 함께 읽어야 하는 개념이라는 사실만으로 한쪽이 다른 쪽의 원인이 되지는 않는다.

containment는 구조 층이지 천장이 아니다. 의미 관계는 도메인과 가지를 넘나들 수 있다. 구현 증거는 노드의 path와 본문에 있고, 별도의 `evidence` 관계를 만들어 두지 않았다.

### blast radius

blast radius는 한 노드를 바꿀 때 파급이 닿는 범위를 뜻한다. Atlas는 승인된 의존 선언만 따라가고, 폴더 구조를 인과적 확신으로 바꾸지 않는다.

여기서 Atlas가 취하는 태도가 이 제품의 성격을 잘 보여 준다. 모르는 것을 모른다고 출력에 적는다.

```console
$ node $ATLAS/cli/src/index.mjs blast-radius capabilities/mcp-server docs/ontology --depth 2
capabilities/mcp-server — blast radius (depth 2, incoming)
  risk unknown · 1 node · 1 relation · 0 cross-domain

impact certainty unknown · declared 1 · rationale 0 · source-backed 0
Counts below follow declared depends_on only. Use reachability/subgraph for structure;
do not read unknown as low risk.
```

출력 마지막 두 줄이 사용 지침이다. 여기 세는 값은 선언된 `depends_on`만 따른다는 것, 구조를 보려면 reachability나 subgraph를 쓰라는 것, 그리고 `unknown`을 낮은 위험으로 읽지 말라는 것이다.

import에 대한 태도도 같다. 리뷰를 거친 정확한 element import는 직접 소스 의존 하나를 뒷받침할 수 있다. 그러나 런타임 영향, 역방향 영향, 전이 영향, 비즈니스 영향은 별도 증거 없이는 unknown으로 남는다.

### 로컬 우선 설계

local-first는 데이터 원본을 사용자 디스크에 두고 서버 없이 동작하는 설계를 뜻한다. Atlas는 이 원칙을 여섯 항목으로 명시한다.

| 항목 | 내용 |
|---|---|
| 디스크가 데이터베이스다 | frontmatter가 그래프이고 확정된 쓰기는 사용자가 고른 폴더로 되돌아간다. 다른 저장소가 없다 |
| git이 이력이다 | diff는 사람이 읽을 수 있는 상태로 유지되고, 이력과 스냅샷은 vault 범위로 묶인다 |
| 백엔드가 없다 | 계정도 텔레메트리도 없다. 웹앱은 정적 export이고 데스크톱 앱은 공개 업데이터 매니페스트를 하루 한 번 확인할 뿐이다 |
| 입구는 둘, 폴더는 하나 | 웹앱은 File System Access API로, 데스크톱 앱은 Tauri 브리지로 같은 폴더를 열고 같은 vault를 워크스페이스로 유지한다 |
| Tauri 셸은 사일로가 아니다 | MCP와 CLI가 선택된 폴더를 그대로 읽는다. 앱이 폴더를 사설 저장소로 옮기지 않는다 |
| MCP 서버는 파일이다 | 앱 번들 안에 놓여 있고 앱을 닫아도 동작한다. 에이전트가 직접 실행하기 때문이다 |

이 여섯 항목이 앞서 본 세 설계와 맞물린다. 저장소가 사용자 디스크이기 때문에 판정을 git diff에 맡길 수 있고, 서버가 없기 때문에 MCP 서버를 데몬이 아니라 파일로 둘 수 있다.

## 방법

### 폴더를 여는 것으로 시작한다

앱의 첫 질문은 폴더다. Markdown 디렉토리를 가리키면 그 자리에서 읽는다. README의 모든 스크린샷이 쓰는 예제 vault는 저장소의 `samples/storefront`이며, 온라인 스토어를 제품, 재고, 주문, 결제, 배송, 회원, 마케팅, 지원으로 서술하고 각 도메인 안에 capability와 그 capability가 다루는 대상을 둔다.

README는 이 예제의 노드 개수를 본문에 적지 않는다. 누가 노드를 추가할 때마다 값이 달라지기 때문이고, 현재 수치가 필요하면 `overview` 명령으로 직접 세라고 안내한다. 문서가 낡은 수치를 들고 있지 않게 하려는 원칙이 여기서도 반복된다.

Docs 화면은 캔버스를 뺀 같은 폴더다. 여기서 할 수 있는 일은 넷이다.

- Markdown 미리 보기와 편집
- 그래프가 되는 frontmatter 확인
- backlink 따라가기
- map의 같은 개념으로 돌아가기

동기화할 사본이 따로 없다는 점이 이 화면의 전제다.

### 에이전트를 연결한다

Atlas는 이 컴퓨터에 이미 설치된 코딩 에이전트를 찾아낸다. 지원하는 것들은 map 옆에서 바로 열 수 있고, MCP 설정은 선택한 폴더 범위로 묶인다.

![[assets/wlsdks-ontology-atlas/agent-connect.png]]
*Figure 2: Agents 화면. 이 컴퓨터에서 찾은 코딩 에이전트 3종을 먼저 보여 주고 나머지 36종은 접어 둔다. 아래쪽이 선택한 폴더에 한정된 3단계 MCP 연결 흐름이다 (wlsdks 2026, README).*

연결 절차는 세 단계이고, 마지막 단계가 이 설계의 요점이다.

| 단계 | 하는 일 | 이 단계가 막는 것 |
|---|---|---|
| 1. 연결 버튼 | 어느 폴더와 어느 클라이언트 설정을 바꿀지 먼저 보여 주고, 확인하면 없는 연결 파일만 만든다 | 사용자가 모르는 사이에 설정이 바뀌는 것 |
| 2. 에이전트 재시작 | 에이전트를 자기 저장소에서 다시 시작한다 | 옛 프로세스가 새 설정을 모르는 것 |
| 3. 연결 증명 | `mcp-verify`가 번들된 서버를 실제로 띄워 활성 vault를 읽고 결과나 실패를 보고한다 | 파일이 있다는 사실을 살아 있는 연결로 착각하는 것 |

생성되는 파일은 눈으로 확인할 수 있는 평문이다. Claude Code, Cursor, Codex를 비롯한 지원 클라이언트는 직접 설정 경로를 받고, 다른 MCP 클라이언트는 생성된 스니펫을 쓴다.

번들된 서버는 현재 읽기와 쓰기 표면을 `tools/list`로 알린다. 도구별 계약은 저장소의 `mcp/README.md`가 문서화하고, `mcp-verify`가 살아 있는 목록을 증명한다.

서버는 stdio로 말한다. 에이전트가 필요할 때 시작하고 끝나면 종료되며, 포트를 열지 않고 네트워크 요청도 하지 않는다. 코딩 에이전트 자신은 사용자가 요청할 때만 자기 제공자와 통신한다.

데스크톱 앱이 시작할 수 있는 코딩 에이전트 목록은 ACP registry의 커밋된 스냅샷이지 런타임 fetch가 아니다. 앱이 오프라인에서도 쓸 수 있고 사용자가 요청하지 않은 연결을 열지 않게 하려는 선택이다. 갱신은 `pnpm acp:registry`, 낡았는지 검사는 `pnpm acp:registry:check`이며, 이 저장소가 실제로 측정한 런타임만 `verified` 표시를 받는다.

### map을 읽는다

노드를 고르면 무관한 것들이 흐려진다. 노드를 inspector 뒤로 숨기지 않은 채 레코드가 열리므로 같은 사실이 두 독자에게 동시에 쓰인다. 사람에게는 시각적 위계로, 에이전트에게는 typed parent와 evidence로 읽힌다.

![[assets/wlsdks-ontology-atlas/topology-focus.png]]
*Figure 3: Orders 도메인을 선택한 Map. 무관한 개념은 흐려지고 관련 노드만 남는다. 오른쪽 inspector는 관계를 종류별로 세어 contains 14, used by 2, leans on 3, belongs to 1로 보여 준다 (wlsdks 2026, README).*

map을 좁히는 수단은 둘이고 성격이 다르다. Recent changes는 프로젝트와 도메인 맥락을 유지하면서 최근 변경으로 범위를 좁힌다. Footprints는 사용자가 개념을 연 순서를 기록한다. 둘 다 로컬 파일과 세션 증거를 보는 뷰이지 호스팅된 활동 추정이 아니다.

공간 해석은 셋으로 나눠 두고 섞지 않는다.

| 뷰 | 배치 기준 |
|---|---|
| Flat | 평범한 2D map |
| Dome | containment 층을 깊이에 배치한다 |
| Cloud | 관계가 세 좌표를 모두 정한다 |

뷰를 바꿔도 그래프는 바뀌지 않는다. 보는 방식과 데이터를 분리해 둔 것이다.

### 리뷰를 거친 architecture에 맞춰 계획한다

architecture는 ontology 위에 올린 또 하나의 층이 아니라 별도 계약이다. 리뷰를 거친 `architecture-profile/v1` 문서가 네 가지를 선언한다.

- 구현 역할
- 범위를 정한 경로
- 허용 의존 방향
- 그 규칙이 관장하는 import 사용

`inspect_architecture`와 `architecture` CLI가 이 선언을 사용 이력이 붙은 현재 소스 import와 대조한다. 결과는 셋 중 하나다.

| 판정 | 뜻 |
|---|---|
| `conforms` | 선언한 의도와 현재 소스가 맞는다 |
| `violated` | 선언한 의도를 현재 소스가 어긴다 |
| `unknown` | 판정할 근거가 없다 |

커버리지나 import 사용이 unknown인 상태를 초록으로 표시하지 않는다는 규칙이 blast radius와 같은 자리에서 반복된다.

화면 쪽에서는 Living Blueprint가 Understand에서 Plan을 거쳐 Verify로 이동하는 동안 역할 순서를 유지한다. Plan이 `architectureChangePlan:v1` handoff를 복사하면 연결된 에이전트가 편집 전후로 `inspect_architecture`를 실행한다. 소스 체크아웃에서의 정확한 대체 명령은 아래와 같다.

```console
node cli/src/index.mjs architecture . --vault docs/ontology --profile atlas-web --json
```

Feature-Sliced Design, Hexagonal, Clean Architecture, MVP 같은 패턴 이름은 리뷰를 거친 선언이다. Atlas는 소스 증거에서 적합성을 도출하며, 폴더 이름을 보고 유행하는 라벨을 추론하지 않는다.

Architecture 화면은 기존 기능에 더해 놓은 것이라 기존 Git 목적지와 변경 배지, 키보드 경로는 그대로 남는다.

### 관계를 노드 옆에서 리뷰한다

선택한 노드에서 관계 하나를 고쳐 쓸 수 있다. Atlas는 먼저 map 위에 방향이 보이는 미리보기를 띄우고, 그다음 source와 타입과 target과 이유와 실제로 바뀔 frontmatter 필드를 압축해 보여 준다.

![[assets/wlsdks-ontology-atlas/relation-review.png]]
*Figure 4: 쓰기 직전의 관계 리뷰. From capabilities/order-cancel, Relation depends_on, To capabilities/refund와 그 이유가 위에 서고, 아래에 실제로 바뀔 dependencies 배열과 relation_notes가 그대로 보인다 (wlsdks 2026, README).*

Markdown 파일이 바뀌는 유일한 지점은 확정 버튼이다. 편집으로 돌아가거나 취소하면 아무것도 바뀌지 않는다.

에이전트가 관계를 추가하려 할 때는 dry-run이 먼저 판정을 낸다.

```console
$ node $ATLAS/cli/src/index.mjs relate capabilities/return-request capabilities/refund dependencies ./storefront --dry-run

capabilities/return-request --dependencies--> capabilities/refund
  verdict matches_existing_schema · exists no
  schema  capability --dependencies--> capability
  pattern count 51 · resolved 51 · external 0 · unresolved 0
  recommendation safe_to_add · No exact or inverse edge found; capability --dependencies--> capability is an existing schema pattern.

nearby schema patterns
  3 · capability --dependencies--> capability (count 51)
  2 · capability --relates--> capability (count 12)
  1 · capability --elements--> element (count 54)
  1 · capability --domain--> domain (count 49)
  1 · domain --capabilities--> capability (count 49)

dry-run would write dependencies on capabilities/return-request → capabilities/refund (no file changed)
```

출력은 판정과 근거를 함께 낸다. `verdict`가 기존 스키마와 일치하는지 알려 주고, `pattern count`가 그 모양이 vault에서 몇 번 쓰였는지 센다. 예시의 엣지는 capability 사이의 `dependencies` 형태라 51회 선례가 있고, 그래서 `safe_to_add` 권고가 나왔다. `nearby schema patterns`는 가까운 다른 모양들을 순위와 함께 보여 준다.

vault가 한 번도 쓴 적 없는 모양이라면 판정이 `new_schema_pattern`으로 바뀌고 권고는 검토 요청이 된다. 드리프트하는 에이전트가 쓰고 난 다음이 아니라 쓰기 전에 눈에 띈다는 것이 이 판정의 요점이다.

### 변경을 읽고 나서 기록한다

사람이 썼든 map 편집기가 썼든 CLI나 MCP 에이전트가 썼든, 모든 변경은 History에 diff로 먼저 선다. 읽고 나서야 이력이 된다.

![[assets/wlsdks-ontology-atlas/history-review.png]]
*Figure 5: History 화면. 왼쪽은 상대 시각으로 늘어놓은 변경 목록이고, 오른쪽은 아직 저장하지 않은 capabilities/order-cancel의 Markdown diff다. dependencies 한 줄이 바뀌고 relation_notes가 늘었다 (wlsdks 2026, README).*

git은 vault 범위로 묶인다. 사용자가 고른 폴더 밖의 파일은 건드리지 않으며, 화면이 그 사실을 명시한다.

### 그래프 건강도를 관리한다

Insights는 그래프 건강도를 작업 대기열로 바꾼다. 무엇이 끊겼고 낡았고 증거가 없는지, 다음에 어떤 보수를 할지 보여 준다.

Composition은 두 가지 균형을 본다. 폴더가 kind 사이에서 균형 잡혀 있는지, 그리고 각 도메인의 capability가 구현 element로 뒷받침되는지다. 모든 수치는 같은 컴파일 그래프에서 갈라져 나온다.

Projects 화면은 손으로 유지하는 값이 하나도 없다. frontmatter에 `project:` 키 자체가 없고, 런타임이 각 `project` 루트에서 containment 그래프를 따라가 문서들이 서로를 어떻게 링크했는지로 커버리지를 파생시킨다.

### 워크벤치 화면과 진입 경로

일곱 화면과 두 프로그램 표면이 모두 같은 Markdown 폴더 하나를 읽는다.

| 표면 | 역할 |
|---|---|
| Map | 그래프를 시각적으로 읽고 노드를 선택한다 |
| Architecture | 리뷰된 프로필과 현재 소스 import를 대조한다 |
| Docs | 캔버스 없이 Markdown과 frontmatter를 다룬다 |
| Insights | 건강도와 구성을 작업 대기열로 바꾼다 |
| Projects | containment 그래프에서 커버리지를 파생시킨다 |
| Agents | 코딩 에이전트를 찾고 MCP 연결을 만든다 |
| History | 변경을 diff로 먼저 보여 준 뒤 기록한다 |
| MCP | 화면을 건너뛰고 같은 파일을 typed 도구로 다룬다 |
| CLI | 커넥터를 붙일 수 없는 세션에 같은 권한을 준다 |

설치 앱이 전체 워크벤치다. 호스팅 웹앱은 설치 없는 입구이면서, 네이티브 브리지를 쓸 수 없는 환경에서 두 번째 선택지가 되는 워크벤치다.

### 에이전트가 받는 것

MCP 도구는 stdio JSON-RPC 위에서 typed 표면으로 제공된다. 답이 typed라는 점이 값이다. 에이전트가 그 답을 바로 다음 동작의 입력으로 쓸 수 있기 때문이다.

| 제공 항목 | 내용 |
|---|---|
| 집중된 컨텍스트 | 저장소를 통째로 쏟아 붓는 대신 brief가 프로젝트, 도메인, 증거, 영향 경계, 첫 도구, 중단 조건을 준다 |
| typed 답을 내는 그래프 질의 | paths와 reachability는 구조를 설명하고, blast radius는 선언된 의존만 따르며 자격과 완전성을 정직하게 보고한다 |
| 리뷰를 통과하는 쓰기 | 분석은 기본적으로 부작용이 없다. 파일을 지우거나 덮어쓰는 동작은 dry-run이 먼저이고, 이름 변경은 backlink를 함께 고치며, mtime 가드가 동시 편집을 보호한다 |
| MCP 없이도 같은 권한 | CLI가 커넥터를 붙일 수 없는 세션에 같은 로컬 폴더를 연다 |

그래프 데이터베이스나 호스팅 메모리는 이 경로 어디에도 개입하지 않는다.

CLI가 담당하는 동작은 scaffold, validate, dry-run 쓰기, 범위를 제한한 순회, blast radius, 커밋 preflight, vault 범위 git 스냅샷, agent handoff다.

scaffold한 vault는 agent skills를 함께 갖고 온다. `init`이 review, grow, absorb 절차를 vault에 써 두므로 연결된 코딩 에이전트가 추가 설정 없이 명령 메뉴에서 찾는다.

### 소스에서 실행하기

설치 앱이 없는 환경을 위한 대체 경로다. Node.js 24와 pnpm이 필요하고, README는 도구를 기술 대상 프로젝트 밖에 두라고 명시한다.

```bash
git clone https://github.com/wlsdks/ontology-atlas ~/tools/ontology-atlas
cd ~/tools/ontology-atlas && pnpm install
pnpm --dir mcp install   # mcp/ carries its own lockfile — the line above skips it
ATLAS=~/tools/ontology-atlas/cli/src/index.mjs

cd /path/to/your/repo

node $ATLAS init ./ontology
node $ATLAS index . --vault ./ontology
node $ATLAS index . --vault ./ontology --apply
node $ATLAS agent-brief ./ontology
```

| 명령 | 역할 |
|---|---|
| `pnpm install`과 `pnpm --dir mcp install` | 둘 다 필요하다. `mcp/`가 자기 lockfile을 갖고 있어 pull할 때마다 두 번째 명령을 다시 실행해야 한다 |
| `init` | 사용자 저장소 안에 vault를 만들고 에이전트 설정을 생성한다 |
| `index` | 기본적으로 분석만 한다 |
| `index --apply` | 명시적 쓰기 경계다 |
| `agent-brief` | 사람이나 코딩 에이전트에게 줄 압축 시작 패킷을 만든다 |
| `mcp-verify` | 실제 서버 프로세스와 vault 계약을 증명한다 |

`init`은 Atlas 클론 안이 아니라 사용자 저장소에서 실행해야 한다. 클론에는 Atlas 자신의 vault를 가리키는 `.mcp.json`이 이미 커밋돼 있고 `init`이 그것을 덮어쓰기를 거부한다. 이 경고를 무시하면 에이전트가 사용자 ontology 대신 Atlas의 ontology를 조용히 답하게 된다.

커밋된 `.mcp.json`은 `chrome-devtools`도 선언한다. `chrome-devtools-mcp`를 버전 고정해 `--isolated --no-usage-statistics --redact-network-headers`로 실행하며, `.claude/agents/`의 디자인과 craft 리뷰 좌석이 렌더된 기하와 계산된 스타일을 이것으로 측정한다. 없으면 디자인 게이트를 실행할 수 없다. 좌석이 요청할 때만 Chrome 인스턴스가 시작되고, 이 파일이 선언하지 않은 서버 이름을 좌석이 부르면 `pnpm agents:check`가 실패한다.

### 변경 검증

저장소 인식 게이트 선택기가 시작점이자 pull request 직전에 마지막으로 실행하는 명령이다.

| 명령 | 역할 |
|---|---|
| `pnpm checks:changed` | 바꾼 파일에 맞는 집중 검사를 고른다 |
| `pnpm docs:language` | Markdown 변경에 포함된다 |
| `pnpm source:language` | 소스, 테스트, 설정, 과거 프로토타입 변경에 포함된다 |
| `pnpm knip` | JavaScript와 TypeScript의 죽은 파일, export, 타입을 프론트엔드와 스크립트, CLI, MCP 범위에서 평가한다 |
| `pnpm docs-vault:resolve-conflicts` | 원장 파일 충돌을 의미 단위로 복구한다 |

두 언어 게이트는 영어 canonical 산문과 주석이 퇴행하지 않게 지키면서, typed 한국어 로케일 데이터와 런타임 문자열은 보존한다.

동시에 작업하는 worktree 둘이 변경 이력과 결정 원장에 각각 유효한 레코드를 앞에 붙이면 커밋된 docs-vault 미러도 함께 충돌한다. 충돌한 경로가 그 원장과 생성 산출물뿐이면 JSON을 손으로 고치거나 한쪽을 고르는 대신 복구 명령을 쓴다. 이 명령이 보장하는 것은 넷이다.

- 이전 이력을 한 바이트도 잃지 않는다
- 완결된 새 날짜 레코드만 합친다
- 파생 파일을 다시 만든다
- 관련 없는 충돌은 거부한다

`knip`은 저장소 전체 진단이며 명시적 예외 원장과 축소 전용 래칫을 갖는다. 설정 힌트와 빈 subject 레인은 설정 오류로 실패한다. 파일과 의존성과 순환 발견은 통과를 막는다. 코드를 다시 쓰지는 않는다.

브랜드 픽셀이나 마스코트 모션을 바꾼 변경은 별도 검사를 더 실행한다. 팔레트와 연속성 계약 테스트를 vitest로 돌리고, 렌더된 모션 검사를 playwright로 실행한다.

```bash
pnpm exec vitest run tests/contract/mascot-palette-boundary.contract.test.ts tests/contract/mascot-motion.contract.test.ts
pnpm exec playwright test tests/e2e/agent-mascot-presence.spec.ts
```

게이트의 전체 기준은 저장소의 `docs/DEVELOPMENT-CHECKS.md`가 갖고 있다. 캔버스 성능과 가독성, 명암비, 브라우저 계측은 `docs/MAP-TESTABILITY.md`가 담당한다. 작업 흐름 자체는 `CONTRIBUTING.md`가 설명한다.

### 기여와 문서 지도

README가 가장 값진 제보로 꼽는 것은 기능 요청이 아니다. Atlas를 실제 저장소에 겨눠 보고 제안된 의미나 에이전트 handoff나 검증이 어디서 부족한지를 보여 주는 보고다.

외부 pull request는 fork에서 온다. README는 이것을 형식이 아니라 보안 경계로 규정한다. 저장소 안에서 작업하는 사람과 AI 에이전트 모두에게 `AGENTS.md`가 정본 안내다.

문서는 목적별로 세 묶음이다.

| 묶음 | 문서 |
|---|---|
| 제품 사용 | hosted guide, 기능 목록, MCP 설정, CLI 레퍼런스 |
| vault 모델링 | 무엇이 노드가 되는가, 관계 가이드, v2 명세, 품질 권한 지도 |
| 이해와 기여 | 제품 방향, 근거 문서, 아키텍처, 보안, 결정 원장 |

## 결과

repo 자료라 성능 수치는 없다. README가 내놓는 것은 포지셔닝 비교와 ontology 품질 계약이다.

### 포지셔닝 비교

README는 로컬 Markdown과 git diff와 MCP를 그 자체로는 기본 조건으로 규정한다. Basic Memory 같은 MCP 연동 노트 도구가 이미 그 셋을 제공하고, 호스팅 graph-memory 제품은 데이터베이스 안에서 typed 순회를 제공한다.

| 기준 | Notes with MCP | Hosted graph memory | Ontology Atlas |
|---|---|---|---|
| 저장소 | 내가 소유한 Markdown | 벤더 데이터베이스 | 내가 소유한 Markdown |
| 구조 | 자유 형식 노트와 링크 | 벤더가 정한 타입 | project, domain, capability, element, document와 typed 관계 |
| 그래프 질의 | 노트 순회 | 그래프 엔진 | blast radius, reachability, cycles, paths, centrality, health |
| 코드 기반 증거 | 손으로 작성 | 코퍼스 인제스트 | 범위를 제한한 읽기 전용 제안, 승인 전에는 아무것도 반영되지 않음 |
| 사람이 쓰는 면 | 노트 앱 | 벤더 콘솔 | 로컬 Map, Architecture, Docs, Insights, Projects, Agents와 맥락 History |

Atlas가 주장하는 자리는 세 열의 중간이 아니다. 사람이 읽는 로컬 vault에 제품 ontology와 워크벤치를 결합해 사람과 에이전트가 같은 사실을 판단하게 하는 자리다. 에이전트가 대화를 기억하기만 하면 되는 상황이면 노트 도구가 가볍다는 점도 README가 함께 적는다.

Atlas가 결합한 표준 출구도 이 비교에 들어간다. JSON-LD와 GraphML이 같은 결정적 컴파일 산출물에서 나오므로 rdflib, Protégé, Gephi, Cytoscape, NetworkX, Neo4j에서 별도 변환기 없이 열린다.

### ontology 품질 계약

품질 계약은 수치 목표가 아니라 판정 기준이다. README가 아홉 항목을 든다.

| 항목 | 규칙 |
|---|---|
| 노드 상한 | vault 전체나 프로젝트 단위의 상한이 없다. 노드 수는 관찰값이지 통과 조건이 아니다 |
| 직접 fan-out | 리뷰 신호이지 한계가 아니다. 자식들이 해소되고 서로 다른 역할을 이름 붙이고 출처가 분명하면 넓은 허브도 옳다 |
| bridge 노드 | 하나의 공유 행동을 이름 붙이고, 형제들과 다르고, 실제로 자식을 재부모화할 때만 자기 층을 얻는다. 개수만으로는 정당화되지 않는다 |
| analyzer 한계 | evidence packet의 한계이지 그래프의 한계가 아니다. 언어 어댑터는 제안 하나를 읽을 만하게 유지할 뿐, ontology 크기나 노드의 관계 수를 제한하지 않는다 |
| uid와 slug | uid는 영구 정체성, slug는 읽을 수 있는 현재 주소다. 소스 위치는 `path:` 증거에 속한다 |
| 외부 필드 시험 | 격리한다. 일반화한 측정치는 Atlas를 개선할 수 있지만 시험 저장소의 ontology를 제품의 dogfood 그래프에 병합하지 않는다 |
| 자격 판정 권한 | 평가자가 스스로 쓰지 않는다. 한 사람이 source를 가린 작업 전에 정확한 CQ 집합을 승인하고, 구성 주체와 분리돼 있으며, 합쳐진 계획을 수용한다. CQ 실패는 그 요청 전에 막는다 |
| import의 범위 | 소스 구조를 증명하지 완전한 영향을 증명하지 않는다. 런타임, 역방향, 전이, 비즈니스 영향은 별도 증거 없이 unknown이다 |
| 저장소 루트 경로 | `src`나 `generate` 같은 리뷰된 디렉토리 경로도 유효하다. 다만 임의의 관계 slug가 파일 증거가 되지는 않는다 |

아홉 항목을 관통하는 하나의 태도가 있다. 수를 세어 통과시키지 않고, 근거가 있는지로 판정한다는 것이다. 노드가 몇 개인지도, 자식이 몇 개 달렸는지도 그 자체로는 합격이나 불합격의 이유가 되지 못한다.

### 같은 문제 영역의 네 도구

이 wiki에는 코드베이스를 그래프로 다루는 도구가 넷 있다. 네 도구의 차이를 같은 기준으로 세우면 Atlas의 자리가 분명해진다.

| 기준 | Ontology Atlas | [[applications/colbymchenry-codegraph]] | [[applications/lum1104-understand-anything]] | [[applications/safishamsi-graphify]] |
|---|---|---|---|---|
| 그래프의 원본 | 사람이 쓴 Markdown vault | 소스 코드 | 소스 코드 | 임의 폴더의 코드, 문서, 이미지 |
| 노드가 생기는 방식 | 사람과 에이전트가 리뷰를 거쳐 쓴다 | tree-sitter 정적 추출이 자동으로 만든다 | 7단계 multi-agent 파이프라인이 만든다 | `/graphify` 한 번의 실행이 만든다 |
| 저장 형식 | Markdown 파일 그 자체 | SQLite와 FTS5 | `knowledge-graph.json` | `graphify-out/`의 그래프와 문서 묶음 |
| 답하는 질문 | 이 코드가 어느 capability를 위한 것인가, 바꾸기 전에 무엇을 확인하는가 | 심볼이 어디 있고 무엇이 호출하는가 | 처음 보는 코드베이스를 어디부터 읽는가 | 자료 사이의 의외의 연결은 무엇인가 |
| 완전성 | curated. 전수 색인이 목표가 아니다 | 전수 색인을 지향한다 | 전수 분석을 지향한다 | 폴더 전수를 읽는다 |
| 갱신 방식 | 사람이 편집하고 git diff로 판정한다 | 다시 색인한다 | fingerprint 기반 증분 재분석 | 다시 실행한다 |
| 불확실성 표기 | `unknown`을 초록으로 칠하지 않는다 | 합성 엣지에 heuristic provenance를 붙인다 | 엣지 타입별 가중치를 둔다 | 엣지마다 EXTRACTED, INFERRED, AMBIGUOUS를 붙인다 |

세 도구가 코드에서 그래프를 뽑는 방향이라면 Atlas는 반대 방향이다. 사람이 먼저 의미를 쓰고, 코드는 그 의미를 뒷받침하는 증거로 붙는다. README가 CodeGraph를 대체 대상이 아니라 역할이 다른 이웃으로 명시한 이유가 여기 있다. 심볼이 어디 있는지는 코드 인덱스가 답하고, 그 심볼이 왜 중요한지는 Atlas가 답한다.

## 한계

- **모든 공개 빌드가 prerelease다.** release candidate가 최종 빌드와 같은 서명, notarize, 설치, 업데이트, 호스팅 다운로드 검사를 통과하긴 하지만 아직 널리 실행된 적이 없다.
- **Windows 베타는 형식적 위험이 아니다.** SmartScreen이 알 수 없는 게시자로 경고할 수 있고, 관리되는 업무용 PC는 설치를 아예 거부할 수 있다.
- **Linux를 비롯한 나머지 플랫폼에 패키지 빌드가 없다.** 같은 vault를 쓰되 화면이 줄어든다.
- **웹과 데스크톱이 같은 화면을 약속하지 않는다.** git 이력과 오프라인 작업은 데스크톱 능력이다. 웹은 File System Access 핸들을 IndexedDB에 기억해 브라우저 권한이 유지되는 동안 복원하지만, git이나 네이티브 브리지를 실행할 수 없다. 이것은 백로그가 아니라 경계 선언이다.
- **vault 포맷 v2.0-rc는 kill criterion을 달고 있다.** 저장소의 계약 테스트가 이미 강제하는 동작을 문서화한 RFC이고, 명시된 피드백 기간 안에 외부 참여가 없으면 표준화 트랙을 조용히 유지하는 대신 접는다.
- **npm에 없다.** `npx ontology-atlas`는 404이고 앞으로의 기능도 아니다.
- **서드파티 플러그인 런타임을 두지 않는다.** 확장은 MCP 도구, agent skills, 사용자 vault 안의 파일로만 일어난다.
- **RDF, OWL, SKOS, SHACL 구현이 아니다.** Markdown vault는 RDF 직렬화가 아니고, validator는 SHACL 프로세서가 아니며, 질의 엔진은 reasoner가 아니다. 저장된 관계는 선언된 주장이지 entailment가 아니고, 없는 관계는 눈에 보이는 빈틈이지 부정 사실이 아니다.
- **코드 인덱스가 아니다.** grep, language server, AST 인덱스, CodeGraph가 답하는 자리를 대체하지 않는다.
- **일반 목적 ontology 편집기가 아니다.** 코드베이스와 무관한 지식 관리는 더 일반적인 도구의 몫이다.
- **서비스가 아니다.** 백엔드도 계정도 텔레메트리도 데몬도 포트도 없다. 데스크톱 앱은 공개 업데이터 매니페스트를 하루 한 번 자동으로 확인하고, Atlas는 vault 내용을 업로드하지 않는다.
- **이 페이지의 근거는 README 하나다.** raw 자료가 저장소 클론이 아니라 README 스냅샷이라, 명세와 기능 목록과 결정 원장의 내부 세부는 확인할 수 없다. 스크린샷도 제품 여정을 보여 주지 릴리스 가용성을 보여 주지 않는다는 점을 README가 직접 명시한다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| vault | Atlas가 그래프로 컴파일하는 Markdown 폴더. 파일 하나가 노드 하나 |
| authorable node kind | 사람이 직접 쓸 수 있는 다섯 종류인 `project`, `domain`, `capability`, `element`, `document`. 이와 별도로 reader 전용 예약 kind가 있다 |
| blast radius | 한 노드를 바꿀 때 선언된 의존을 따라 파급이 닿는 범위. 선언되지 않은 영향은 unknown으로 남는다 |
| schema pattern verdict | 새 엣지가 vault에 이미 있는 모양인지 판정한 결과. 선례가 있으면 `matches_existing_schema`, 없으면 `new_schema_pattern`이다 |
| architecture-profile/v1 | 구현 역할, 범위 경로, 허용 의존 방향을 선언한 리뷰 문서. ontology와 별도 계약이다 |
| dogfood vault | Atlas가 자기 자신을 기술한 `docs/ontology/` vault. live demo가 여는 대상 |

## 관련 페이지

- [[applications/colbymchenry-codegraph]]: tree-sitter로 코드 심볼 그래프를 만드는 MCP 서버. README가 CodeGraph를 대체 대상이 아니라 역할이 다른 이웃으로 명시했다
- [[applications/lum1104-understand-anything]]: 코드베이스를 multi-agent 파이프라인으로 분석해 knowledge graph와 투어를 만든다. 분석 산출물이 그래프인 쪽이고, Atlas는 사람이 쓰고 리뷰하는 vault가 원본인 쪽이다
- [[applications/safishamsi-graphify]]: 임의 폴더를 knowledge graph로 컴파일하는 스킬. 엣지마다 발견인지 추론인지 라벨을 붙이는 점이 Atlas의 unknown 표기와 같은 계열이다
- [[applications/graphify-labs-graphify]]: 같은 graphify의 다른 저장소 스냅샷
- [[applications/langchain-ai-openwiki]]: 코드베이스 문서를 에이전트를 위해 자동으로 만들고 갱신하는 CLI. 자동 생성과 큐레이션이라는 기준에서 Atlas의 반대편이다
- [[applications/agricidaniel-claude-obsidian]]: Markdown vault와 Obsidian 위에 에이전트 스킬을 결합한 구현체. vault 형식이 고정된 그래프 스키마인지 자유 노트인지가 갈리는 지점이다
- [[applications/dnotitia-akb]]: Git bare repo와 PostgreSQL 위에 올린 MCP-first 지식베이스. 디스크가 곧 데이터베이스인 Atlas와 저장 전략이 대비된다
- [[agents/getzep-graphiti]]: 비교표의 hosted graph memory 자리에 대응하는 오픈소스 엔진. typed 순회를 데이터베이스에서 제공한다
- [[applications/kmyu-2026-akb-llmwiki-gbrain-comparison]]: AKB와 llmwiki와 GBrain을 여섯 기준으로 채점한 비교 리포트
- [[applications/liu-2026-rag-llm-wiki-or-gbrain]]: 에이전트가 하는 일을 기준으로 RAG와 LLM Wiki와 Fat Skills를 가르는 결정 프레임워크
- [[applications/dragon1086-llm-wiki]]: Karpathy LLM Wiki 패턴의 한국어 구현. 사람과 에이전트가 같은 Markdown을 함께 쓰는 계보의 이웃이다
- [[applications/joonan30-llm-wiki-labs]]: 같은 계보의 또 다른 구현
