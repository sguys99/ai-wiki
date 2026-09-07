---
title: "Ontology Atlas"
type: repo
year: 2026
category: applications
raw_path: raw/repos/wlsdks-ontology-atlas.md
raw_filename: "wlsdks-ontology-atlas.md"
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
  - id: fig02
    file: assets/wlsdks-ontology-atlas/docs-workspace.png
    raw: https://raw.githubusercontent.com/wlsdks/ontology-atlas/main/docs/assets/readme/docs-workspace.png
    caption: "Docs 작업 공간. vault 트리와 capability 문서 하나, frontmatter 요약, 출처 날짜, backlink, map의 같은 노드로 돌아가는 링크"
    strategy: manual
    curated: false
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
  - id: fig05
    file: assets/wlsdks-ontology-atlas/three-dimensional-views.png
    raw: https://raw.githubusercontent.com/wlsdks/ontology-atlas/main/docs/assets/readme/three-dimensional-views.png
    caption: "3D 뷰 선택기. 평면 map인 Flat, containment 구조를 깊이로 세우는 Dome, 관계가 근접도를 정하는 Cloud"
    strategy: manual
    curated: false
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
  - id: fig08
    file: assets/wlsdks-ontology-atlas/graph-insights.png
    raw: https://raw.githubusercontent.com/wlsdks/ontology-atlas/main/docs/assets/readme/graph-insights.png
    caption: "Insights 구성 화면. 개념과 관계 총계, kind 분포, 그래프 건강도, 선택한 폴더에서 파생한 도메인별 capability 대 element 막대"
    strategy: manual
    curated: false
  - id: fig09
    file: assets/wlsdks-ontology-atlas/projects-coverage.png
    raw: https://raw.githubusercontent.com/wlsdks/ontology-atlas/main/docs/assets/readme/projects-coverage.png
    caption: "Projects 화면. Storefront 프로젝트의 파생 총계, 9개 도메인 구성 행, 최근 활동, 상세와 map으로 돌아가는 경로"
    strategy: manual
    curated: false
---

## 한 줄 요약 (One-line Summary)

Ontology Atlas는 코드베이스가 무엇을 만들고 왜 그 경계를 갖는지, 그리고 어디를 바꾸면 무엇이 영향을 받는지를 저장소 안의 Markdown 폴더 하나로 유지하는 로컬 워크벤치다. 사람은 파일과 git diff로 판단하고 코딩 에이전트는 MCP로 같은 그래프를 읽고 쓴다.

## 1. 자료 정보 (Document Information)

- **저장소**: [wlsdks/ontology-atlas](https://github.com/wlsdks/ontology-atlas)
- **라이선스**: MIT. README 본문의 License 절과 raw frontmatter의 `license:` 값이 일치한다
- **런타임**: Node.js 24와 pnpm (소스 체크아웃 기준). `mcp/`가 별도 lockfile을 갖고 있어 `pnpm --dir mcp install`을 따로 실행해야 하고, pull할 때마다 다시 실행해야 한다
- **배포 형태**: macOS 앱(Developer ID 서명과 notarize 완료), Windows x64 미서명 퍼블릭 베타, 정적 export된 호스팅 웹앱, 소스 체크아웃의 CLI와 MCP 서버
- **번들 구성**: 데스크톱 다운로드 두 종 모두 앱과 컴파일된 MCP 서버를 함께 담는다. npm 패키지는 없다
- **문서와 데모**: [hosted guide](https://wlsdks.github.io/ontology-atlas/en/guide/), [live demo](https://wlsdks.github.io/ontology-atlas/en/topology/). live demo가 여는 대상은 Atlas 자신을 기술한 `docs/ontology/` vault다

README가 스스로 못박는 조건이 둘 있다. 지금까지 나온 모든 공개 빌드는 prerelease이고, vault 포맷은 v2.0-rc로 공개 의견을 받는 RFC 상태다.

릴리스 권위는 README가 아니라 다운로드 페이지다. 그 페이지가 현재 게시된 태그, 실제 파일 크기, 체크섬, 플랫폼, 서명 상태를 생성된 기록으로 렌더한다. README는 태그도 체크섬도 복사하지 않는데, 오래된 문서가 사람들이 곧 설치할 파일과 어긋나지 않게 하려는 의도적 설계다. GitHub Releases가 두 번째 직접 출처다.

앱 안의 업데이터는 가장 최근 비초안 GitHub Release에서 준비한 Pages 매니페스트를 읽으며 release candidate도 포함한다. 다만 어떤 아카이브든 설치 전에 번들된 업데이터 서명 검사를 통과해야 한다.

## 2. 주요 기여 (Key Contributions)

- **Markdown 폴더가 데이터베이스 전체다.** 앱을 폴더에 겨누면 그 자리에서 읽고 쓴다. import 단계도, 만들어 둘 인덱스도, 계정도 없다.
- **authorable node kind가 다섯 개로 고정돼 있다.** `project`, `domain`, `capability`, `element`, `document`. 여기에 reader 전용 예약 kind가 하나 더 있다. 종류와 관계 타입이 작은 고정 집합이라 폴더가 읽기 가능한 데 그치지 않고 계산 가능해진다.
- **노트 도구가 답하지 못하는 질문에 답한다.** 이걸 바꾸면 무엇이 깨지는지, 이 capability의 blast radius가 어디까지인지, 두 대상을 잇는 경로가 무엇인지, 무엇이 끊겼고 무엇이 낡았는지.
- **MCP over stdio와 CLI가 같은 권한을 갖는다.** 커넥터를 붙일 수 없는 세션도 CLI로 같은 폴더를 다룬다. CLI가 담당하는 동작은 scaffold, validate, dry-run 쓰기, 범위를 제한한 순회, blast radius, 커밋 preflight, vault 범위 git 스냅샷, agent handoff다.
- **architecture는 별도 계약이다.** 리뷰를 거친 `architecture-profile/v1` 문서가 구현 역할, 범위를 정한 경로, 허용 의존 방향, 그리고 그 규칙이 관장하는 import 사용을 선언한다. `inspect_architecture`와 `architecture` CLI가 사용 이력이 붙은 현재 소스 import와 대조해 `conforms`, `violated`, `unknown` 중 하나를 돌려준다.
- **표준 그래프 포맷으로 나간다.** JSON-LD와 GraphML이 같은 결정적 컴파일 산출물에서 나오므로 rdflib, Protégé, Gephi, Cytoscape, NetworkX, Neo4j에서 별도 변환기 없이 열린다.
- **scaffold한 vault가 agent skills를 함께 갖고 온다.** `init`이 review, grow, absorb 절차를 vault에 써 두므로 연결된 코딩 에이전트가 추가 설정 없이 명령 메뉴에서 찾는다.
- **호스팅 웹앱이 설치 없는 입구다.** 정적 export가 File System Access API로 로컬 폴더를 연다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### vault, 파일 하나가 노드 하나

vault는 Atlas가 그래프로 읽어 들이는 Markdown 폴더를 가리킨다. 파일 하나가 노드 하나이고, frontmatter가 기계가 읽는 레코드, 본문이 사람이 판단하는 설명이다.

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

여기서 먼저 익힐 구분은 하나다. path는 코드를 가리키고 slug는 노드를 가리킨다. 둘을 섞는 것이 가장 흔한 첫 실수이고 `validate`가 dangling reference로 잡아낸다. uid와 slug도 역할이 다르다. uid는 영구 정체성이고 slug는 읽을 수 있는 현재 주소이며, 소스 위치는 `path:` 증거에 속한다.

저장소 루트 디렉토리도 유효한 명시 경로다. 리뷰를 거친 `path:` 값이 `src`나 `generate` 같은 디렉토리여도 소스 receipt와 finalization에 참여한다. 다만 임의의 관계 slug가 파일 증거가 되지는 않는다.

비즈니스에서 코드로 내려가는 척추는 일부러 작게 잡았다.

```text
project
└── domain
    └── capability
        └── element
```

`document`가 다섯 번째 authorable kind로, 이 척추 어디에든 붙는 개념을 서술한다. typed 관계가 의존, 연관, 포함, 서술의 의미를 더한다. 구현 증거는 노드의 path와 본문에 있지 별도의 `evidence` 관계를 만들어 두지 않았다. 모든 심볼을 색인하는 것이 목표가 아니라, 사람이나 에이전트가 capability를 이해하고 영향을 추적하고 올바른 증명을 실행하는 데 도움이 될 때 소스 산출물이 노드 자격을 얻는다. README는 이 원칙을 "curated, not exhaustive"로 요약한다.

### 관계는 선언한 파일이 소유한다

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

`dependencies`는 방향이 있고 `relates`는 대칭이라, map이 유사성을 인과로 바꾸지 않는다. containment는 구조 층이지 천장이 아니어서 의미 관계는 도메인과 가지를 넘나들 수 있다.

### 쓰기 전에 스키마 패턴을 판정한다

에이전트가 관계를 하나 추가하려 할 때 dry-run이 먼저 판정을 낸다. README의 예시는 이런 모양이다.

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

출력은 판정과 근거를 함께 낸다. `verdict`가 기존 스키마와 일치하는지 알려 주고, `pattern count`가 그 모양이 vault에서 몇 번 쓰였는지 센다. 예시에서는 capability 사이의 `dependencies` 엣지가 51회 쓰인 형태라 `safe_to_add` 권고가 나왔다. `nearby schema patterns` 목록은 가까운 다른 모양들을 함께 보여 준다.

vault가 한 번도 써 본 적 없는 모양을 만들 엣지라면 판정이 `new_schema_pattern`으로, 권고가 `review_new_schema`로 바뀌어 돌아온다. 드리프트하는 에이전트가 쓰고 난 다음이 아니라 쓰기 전에 눈에 띈다는 것이 이 판정의 요점이다.

### blast radius는 모르는 것을 모른다고 말한다

blast radius는 한 노드를 바꿀 때 파급이 닿는 범위를 뜻한다. Atlas는 승인된 의존 선언만 따라가고 폴더 구조를 인과적 확신으로 바꾸지 않는다.

```console
$ node $ATLAS/cli/src/index.mjs blast-radius capabilities/mcp-server docs/ontology --depth 2
capabilities/mcp-server — blast radius (depth 2, incoming)
  risk unknown · 1 node · 1 relation · 0 cross-domain

impact certainty unknown · declared 1 · rationale 0 · source-backed 0
Counts below follow declared depends_on only. Use reachability/subgraph for structure;
do not read unknown as low risk.
```

`unknown`을 낮은 위험으로 읽지 말라는 문장이 출력 안에 들어 있다. 구조를 보려면 reachability나 subgraph를 쓰라는 안내도 함께 나온다. 커버리지나 import 사용이 unknown인 상태를 초록으로 칠하지 않는 것은 architecture 검사도 마찬가지다.

### 워크벤치 화면

Map, Architecture, Docs, Insights, Projects, Agents, 그리고 맥락에 따라 열리는 History가 모두 같은 폴더 하나를 읽는다. MCP와 CLI는 화면을 건너뛰고 같은 파일을 직접 다룬다.

노드를 고르면 무관한 것들이 흐려지고, 노드를 inspector 뒤로 숨기지 않은 채 레코드가 열린다. 같은 사실이 사람에게는 시각적 위계로, 에이전트에게는 typed parent와 evidence로 동시에 쓰인다.

map을 좁히는 수단은 둘이다. Recent changes가 프로젝트와 도메인 맥락을 유지하면서 최근 변경으로 범위를 좁히고, Footprints는 개념을 연 순서를 기록한다. 둘 다 로컬 파일과 세션 증거를 보는 뷰이지 호스팅된 활동 추정이 아니다.

공간 해석은 셋으로 나눠 두고 섞지 않는다. Flat은 평범한 2D map, Dome은 containment 층을 깊이에 배치, Cloud는 관계가 세 좌표를 모두 정한다. 뷰를 바꿔도 그래프는 바뀌지 않는다.

Docs는 캔버스를 뺀 같은 폴더다. 여기서 할 수 있는 일은 넷이다.

- Markdown 미리 보기와 편집
- 그래프가 되는 frontmatter 확인
- backlink 따라가기
- map의 같은 개념으로 돌아가기

동기화할 사본이 따로 없다는 점이 이 화면의 전제다.

Architecture는 Ontology Map과 분리해 뒀다. Living Blueprint가 Understand에서 Plan을 거쳐 Verify로 이동하는 동안 역할 순서를 유지하고, Plan이 `architectureChangePlan:v1` handoff를 복사하면 연결된 에이전트가 편집 전후로 `inspect_architecture`를 실행한다. 소스 체크아웃에서의 정확한 대체 명령은 아래와 같다.

```console
node cli/src/index.mjs architecture . --vault docs/ontology --profile atlas-web --json
```

Feature-Sliced Design, Hexagonal, Clean Architecture, MVP 같은 패턴 이름은 리뷰를 거친 선언이지 폴더 이름에서 추론한 유행 라벨이 아니다. Architecture 화면은 기존 기능에 더해 놓은 것이라, 기존 Git 목적지와 변경 배지, 키보드 경로는 그대로 남는다.

Insights는 그래프 건강도를 작업 대기열로 바꾼다. 무엇이 끊겼고 낡았고 증거가 없는지, 다음에 어떤 보수를 할지 보여 준다. Composition은 폴더가 kind 사이에서 균형 잡혀 있는지, 그리고 각 도메인의 capability가 구현 element로 뒷받침되는지 보여 준다. 모든 수치는 같은 컴파일 그래프에서 갈라져 나온다.

Projects 화면은 손으로 유지하는 값이 하나도 없다. frontmatter에 `project:` 키가 없고, 런타임이 각 `project` 루트에서 containment 그래프를 따라가 문서들이 서로를 어떻게 링크했는지로 커버리지를 파생시킨다.

git은 vault 범위로 묶인다. 사용자가 고른 폴더 밖의 파일은 건드리지 않으며, 화면이 그 사실을 명시한다.

### 에이전트 연결

Atlas는 이 컴퓨터에 이미 설치된 코딩 에이전트를 찾아내고, 지원하는 것들은 map 옆에서 열 수 있게 하며, MCP 설정을 선택한 폴더 범위로 묶는다. 연결 절차는 세 단계다.

| 단계 | 하는 일 |
|---|---|
| 1. 연결 버튼 | 어느 폴더와 어느 클라이언트 설정을 바꿀지 먼저 보여 주고, 확인하면 없는 연결 파일만 만든다. 생성되는 파일은 눈으로 확인할 수 있는 평문이다 |
| 2. 에이전트 재시작 | 에이전트를 자기 저장소에서 다시 띄운다 |
| 3. 연결 증명 | `mcp-verify` 검사가 번들된 MCP 서버를 실제로 띄워 활성 vault를 읽고 실제 결과나 실패를 보고한다 |

파일이 있다는 사실을 살아 있는 연결로 제시하지 않는다는 원칙이 이 3단계에 걸려 있다.

Claude Code, Cursor, Codex를 비롯한 지원 클라이언트는 직접 설정 경로를 받고, 다른 MCP 클라이언트는 생성된 스니펫을 쓴다. 번들된 서버는 현재 읽기와 쓰기 표면을 `tools/list`로 알리며, 도구별 계약은 저장소의 `mcp/README.md`가 문서화한다.

서버는 stdio로 말한다. 에이전트가 필요할 때 띄우고 끝나면 사라지며, 포트를 열지 않고 네트워크 요청도 하지 않는다. 코딩 에이전트 자신은 사용자가 요청할 때만 자기 제공자와 통신한다.

데스크톱 앱의 Tauri 셸은 셸이지 사일로가 아니라서, MCP와 CLI는 선택된 폴더를 그대로 읽고 앱이 폴더를 사설 저장소로 옮기지 않는다. 번들된 MCP 서버도 서비스가 아니라 파일이다. 앱 번들 안에 놓여 있고 앱을 닫아도 동작하는데, 에이전트가 직접 실행하기 때문이다.

데스크톱 앱이 띄울 수 있는 코딩 에이전트 목록은 ACP registry의 커밋된 스냅샷이지 런타임 fetch가 아니다. 앱이 오프라인에서도 쓸 수 있고 사용자가 요청하지 않은 연결을 열지 않게 하려는 선택이다. 스냅샷 갱신은 `pnpm acp:registry`, 낡았는지 검사는 `pnpm acp:registry:check`이며, 이 저장소가 실제로 측정한 런타임만 `verified` 표시를 받는다.

### 소스에서 실행하기

설치 앱이 없는 환경을 위한 대체 경로다. README는 도구를 기술 대상 프로젝트 밖에 두라고 명시한다.

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

`index`는 기본적으로 분석만 하고 `--apply`가 명시적 쓰기 경계다. `init`은 Atlas 클론 안이 아니라 사용자 저장소에서 실행해야 한다. 클론에는 Atlas 자신의 vault를 가리키는 `.mcp.json`이 이미 커밋돼 있고 `init`이 그것을 덮어쓰기를 거부하는데, 이 경고를 무시하면 에이전트가 사용자 ontology 대신 Atlas의 ontology를 조용히 답하게 된다.

커밋된 `.mcp.json`은 `chrome-devtools`도 선언한다. `chrome-devtools-mcp`를 버전 고정해 `--isolated --no-usage-statistics --redact-network-headers`로 실행하며, `.claude/agents/`의 디자인과 craft 리뷰 좌석이 렌더된 기하와 계산된 스타일을 이것으로 측정한다. 없으면 디자인 게이트를 실행할 수 없다. 좌석이 요청할 때만 Chrome 인스턴스가 뜨고, 이 파일이 선언하지 않은 서버 이름을 좌석이 부르면 `pnpm agents:check`가 실패한다.

### 변경 검증

저장소 인식 게이트 선택기 `pnpm checks:changed`가 시작점이자 pull request 직전에 마지막으로 실행하는 명령이다. 바꾼 파일에 맞는 집중 검사를 골라 준다.

| 명령 | 역할 |
|---|---|
| `pnpm checks:changed` | 변경 파일에 맞는 검사를 고른다 |
| `pnpm docs:language` | Markdown 변경에 포함된다 |
| `pnpm source:language` | 소스, 테스트, 설정, 과거 프로토타입 변경에 포함된다 |
| `pnpm knip` | JavaScript와 TypeScript의 죽은 파일, export, 타입을 프론트엔드와 스크립트, CLI, MCP 범위에서 평가한다 |
| `pnpm docs-vault:resolve-conflicts` | 원장 파일 충돌을 의미 단위로 복구한다 |

`docs:language`와 `source:language`는 영어 canonical 산문과 주석이 퇴행하지 않게 지키면서, typed 한국어 로케일 데이터와 런타임 문자열은 보존한다.

동시에 작업하는 worktree 둘이 `docs/CHANGELOG.md`나 `docs/DECISIONS.md`에 각각 유효한 레코드를 앞에 붙이면 커밋된 docs-vault 미러도 함께 충돌한다. 충돌한 경로가 그 원장과 생성 산출물뿐이면 JSON을 손으로 고치거나 한쪽을 고르는 대신 `pnpm docs-vault:resolve-conflicts`를 쓴다. 이 명령이 보장하는 것은 넷이다.

- 이전 이력을 한 바이트도 잃지 않는다
- 완결된 새 날짜 레코드만 합친다
- 파생 파일을 다시 만든다
- 관련 없는 충돌은 거부한다

`knip`은 저장소 전체 진단이며 명시적 예외 원장과 축소 전용 export 및 타입 래칫을 갖는다. 설정 힌트와 빈 subject 레인은 설정 오류로 실패하고, 파일과 의존성과 순환 발견은 통과를 막는다. 코드를 다시 쓰지는 않는다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

repo라 성능 수치는 없고, README가 제시하는 것은 포지셔닝 비교표와 품질 계약이다.

| 기준 | Notes with MCP | Hosted graph memory | Ontology Atlas |
|---|---|---|---|
| 저장소 | 내가 소유한 Markdown | 벤더 데이터베이스 | 내가 소유한 Markdown |
| 구조 | 자유 형식 노트와 링크 | 벤더가 정한 타입 | project, domain, capability, element, document와 typed 관계 |
| 그래프 질의 | 노트 순회 | 그래프 엔진 | blast radius, reachability, cycles, paths, centrality, health |
| 코드 기반 증거 | 손으로 작성 | 코퍼스 인제스트 | 범위를 제한한 읽기 전용 제안, 승인 전에는 아무것도 반영되지 않음 |
| 사람이 쓰는 면 | 노트 앱 | 벤더 콘솔 | 로컬 Map, Architecture, Docs, Insights, Projects, Agents와 맥락 History |

에이전트가 대화를 기억하기만 하면 되는 상황이면 노트 도구가 가볍고, Atlas는 코드가 구현하는 제품을 모델링하는 쪽이라는 것이 README의 선 긋기다. 논거와 출처는 저장소의 `docs/FOUNDATIONS.md`에 있다.

품질 계약도 수치보다 판정 기준에 가깝다. README는 아홉 항목을 든다.

| 항목 | 규칙 |
|---|---|
| 노드 상한 | vault 전체나 프로젝트 단위의 노드 상한은 없다. 노드 수는 관찰값이지 통과 조건이 아니다 |
| 직접 fan-out | 리뷰 신호이지 한계가 아니다. 자식들이 해소되고 서로 다른 역할을 이름 붙이고 출처가 분명하면 넓은 허브도 옳다 |
| bridge 노드 | 하나의 공유 행동을 이름 붙이고, 형제들과 다르고, 실제로 자식을 재부모화할 때만 자기 층을 얻는다. 개수만으로는 정당화되지 않는다 |
| analyzer 한계 | evidence packet의 한계이지 그래프의 한계가 아니다. 언어 어댑터는 제안 하나를 읽을 만하게 유지할 뿐, ontology 크기나 노드의 관계 수를 제한하지 않는다 |
| uid와 slug | uid는 영구 정체성, slug는 읽을 수 있는 현재 주소다. 소스 위치는 `path:` 증거에 속한다 |
| 외부 필드 시험 | 격리한다. 일반화한 측정치는 Atlas를 개선할 수 있지만 시험 저장소의 ontology를 제품의 dogfood 그래프에 병합하지 않는다 |
| 자격 판정 권한 | 평가자가 스스로 쓰지 않는다. 한 사람이 source를 가린 작업 전에 정확한 CQ 집합을 승인하고, 구성 주체와 분리돼 있으며, 합쳐진 계획을 수용한다. CQ 실패는 그 요청 전에 막는다. 선언된 provenance는 여전히 신원 인증이 아니다 |
| import의 범위 | import는 소스 구조를 증명하지 완전한 영향을 증명하지 않는다. 리뷰를 거친 정확한 element import는 직접 소스 의존 하나를 뒷받침할 수 있지만, 런타임과 역방향과 전이와 비즈니스 영향은 별도 증거 없이 unknown으로 남는다 |
| 저장소 루트 경로 | `src`나 `generate` 같은 리뷰된 디렉토리 경로도 유효하다. 다만 임의의 관계 slug가 파일 증거가 되지는 않는다 |

각 규칙의 권한과 검증 경로는 저장소의 `docs/ONTOLOGY-QUALITY.md`에 있고, 실무 판정 기준은 `docs/guide/what-becomes-a-node.md`가 담는다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **모든 공개 빌드가 prerelease다.** release candidate가 최종 빌드와 같은 서명, notarize, 설치, 업데이트, 호스팅 다운로드 검사를 통과하긴 하지만 아직 널리 실행된 적이 없다.
- **Windows 베타는 형식적 위험이 아니다.** 의도적으로 서명하지 않은 공개 베타라 SmartScreen이 알 수 없는 게시자로 경고할 수 있고, 관리되는 업무용 PC는 설치를 아예 거부할 수 있다. macOS와 같은 로컬 폴더와 MCP 표면을 갖되 서명만 없다.
- **Linux를 비롯한 나머지 플랫폼에 패키지 빌드가 없다.** 브라우저 앱이나 소스 체크아웃의 CLI와 MCP 서버로 실행한다. 같은 vault에 화면만 줄어든다.
- **웹과 데스크톱이 같은 화면을 약속하지 않는다.** git 이력과 오프라인 작업은 데스크톱 능력이고, 웹은 File System Access 핸들을 IndexedDB에 기억해 브라우저 권한이 유지되는 동안 복원하지만 git이나 네이티브 브리지를 실행할 수 없다. 이것은 백로그가 아니라 경계 선언이다.
- **vault 포맷 v2.0-rc는 kill criterion을 달고 있다.** 이 저장소의 계약 테스트가 이미 강제하는 동작을 문서화한 RFC이고, 명시된 피드백 기간 안에 외부 참여가 없으면 표준화 트랙을 조용히 유지하는 대신 접는다.
- **npm에 없다.** `npx ontology-atlas`는 404이고 앞으로의 기능도 아니다. 데스크톱 번들이 컴파일된 서버를 갖고 있고 나머지는 소스 체크아웃에서 실행된다.
- **서드파티 플러그인 런타임을 두지 않는다.** 확장은 MCP 도구, agent skills, 사용자 vault 안의 파일로만 일어난다. `git diff`가 실행 전에 보여 줄 수 있는 것들이다.
- **RDF, OWL, SKOS, SHACL 구현이 아니다.** export가 제한된 그래프 형태를 내보내긴 해도 Markdown vault는 RDF 직렬화가 아니고, validator는 SHACL 프로세서가 아니며, 질의 엔진은 reasoner가 아니다. 저장된 관계는 선언된 주장이지 entailment가 아니고, 없는 관계는 눈에 보이는 빈틈이지 부정 사실이 아니다. 이 경계는 명세 5.2절에 적혀 있다.
- **코드 인덱스가 아니다.** grep, language server, AST 인덱스, CodeGraph가 심볼이 어디 있고 무엇이 호출하는지 답하는 자리를 대체하지 않는다. Atlas는 그 산출물이 왜 중요한지, 어느 capability를 위한 것인지, 바꾸기 전에 무엇을 확인해야 하는지를 답한다.
- **일반 목적 ontology 편집기가 아니다.** 코드베이스에서 출발하므로 코드베이스와 무관한 지식 관리는 더 일반적인 도구의 몫이다.
- **서비스가 아니다.** 백엔드도 계정도 텔레메트리도 데몬도 포트도 없다. 데스크톱 앱은 공개 업데이터 매니페스트를 하루 한 번 자동으로 확인하고, Atlas는 vault 내용을 업로드하지 않는다.
- **README 하나가 근거의 전부다.** 이 자료는 저장소 클론이 아니라 README 스냅샷이라, 명세와 기능 목록과 결정 원장의 세부 내용은 확인할 수 없다. 화면 스크린샷은 제품 여정을 보여 주지 릴리스 가용성을 보여 주지 않는다는 점도 README가 직접 명시한다.

## 6. 관련 연구 (Related Work)

README가 직접 든 비교 대상은 셋이다. [Basic Memory](https://github.com/basicmachines-co/basic-memory) 같은 MCP 연동 노트 도구는 로컬 Markdown, git diff, MCP를 이미 제공하고, 호스팅 graph-memory 제품은 데이터베이스 안에서 typed 순회를 제공한다. Atlas는 사람이 읽는 로컬 vault에 제품 ontology와 워크벤치를 결합해 사람과 에이전트가 같은 사실을 판단하게 하는 쪽으로 자리를 잡는다. README는 로컬 Markdown과 git diff와 MCP를 그 자체로는 기본 조건으로 규정한다.

코드 인덱스 계열(grep, language server, AST 인덱스, CodeGraph)과는 대체가 아니라 역할 분담으로 선을 긋는다. Atlas가 답하는 것은 어떤 구조적 질문을 던질 가치가 있는지다.

위키와 에이전트 메모리 양쪽과도 선을 긋는다. README의 표현으로 사람만 쓰는 위키는 쓰인 그 주에 낡고, 에이전트만 쓰는 저장소는 판단할 사람이 없어 드리프트한다. Atlas는 두 독자가 함께 읽고 쓰는 한 층이고 중재자는 git diff다.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| vault | Atlas가 그래프로 컴파일하는 Markdown 폴더. 파일 하나가 노드 하나 |
| authorable node kind | 사람이 직접 쓸 수 있는 다섯 종류인 `project`, `domain`, `capability`, `element`, `document`. 이와 별도로 reader 전용 예약 kind가 있다 |
| slug와 uid와 path | slug는 읽을 수 있는 현재 주소, uid는 영구 정체성, path는 코드 증거를 가리키는 파일 경로 |
| blast radius | 한 노드를 바꿀 때 선언된 의존을 따라 파급이 닿는 범위. 선언되지 않은 영향은 unknown으로 남는다 |
| schema pattern verdict | 새 엣지가 vault에 이미 있는 모양인지 판정한 결과. `matches_existing_schema`와 `new_schema_pattern` 두 값이 있다 |
| architecture-profile/v1 | 구현 역할, 범위 경로, 허용 의존 방향을 선언한 리뷰 문서. ontology와 별도 계약이다 |
| Living Blueprint | Understand에서 Plan을 거쳐 Verify로 이동하는 동안 역할 순서를 유지하는 architecture 화면 |
| mcp-verify | 번들된 MCP 서버를 실제로 띄워 활성 vault와 계약을 확인하는 CLI 점검 |
| agent-brief | 사람이나 코딩 에이전트에게 프로젝트, 도메인, 증거, 영향 경계, 첫 도구, 중단 조건을 담아 건네는 압축 패킷 |
| dogfood vault | Atlas가 자기 자신을 기술한 `docs/ontology/` vault. live demo가 여는 대상 |
| Footprints | 사용자가 개념을 연 순서를 기록하는 로컬 세션 증거 |
| CQ | competency question의 약어. source를 가린 작업 전에 승인받는 질문 집합이며, 실패하면 요청 자체를 막는다 |

## 8. 그림 후보 (Figure Candidates)

repo라 자동 추출을 실행하지 않았다. 아래는 README 본문이 임베드한 제품 스크린샷 목록이고 전부 `strategy: manual`이며, `raw`는 GitHub 원본 URL을 가리킨다. ★ 표시한 다섯(fig01, fig03, fig04, fig06, fig07)은 큐레이션을 거쳐 `curated: true`로 wiki 본문에 들어갔고 나머지 넷은 이 아카이브에만 남는다.

| id | 파일 | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | topology-overview.png | Storefront vault를 연 Map과 프로젝트 inspector | manual | ★ wiki 권장 (overview) |
| fig02 | docs-workspace.png | Docs 작업 공간의 frontmatter, backlink, map 왕복 | manual | (선택) |
| fig03 | agent-connect.png | Agents 화면의 3단계 MCP 연결 흐름 | manual | ★ wiki 권장 (method) |
| fig04 | topology-focus.png | 노드 선택 시 초점 이동과 inspector | manual | ★ wiki 권장 (method) |
| fig05 | three-dimensional-views.png | Flat, Dome, Cloud 3D 뷰 선택기 | manual | (선택) |
| fig06 | relation-review.png | 관계 쓰기 확정 전 리뷰 화면 | manual | ★ wiki 권장 (method) |
| fig07 | history-review.png | 커밋 전 Markdown diff 리뷰 | manual | ★ wiki 권장 (method) |
| fig08 | graph-insights.png | Insights 그래프 건강도와 구성 | manual | (선택) |
| fig09 | projects-coverage.png | Projects 커버리지 파생 화면 | manual | (선택) |

큐레이션에서 제외한 넷은 로컬 사본이 없다. `wiki/assets/wlsdks-ontology-atlas/`에는 curated 다섯 장만 있고, 나머지는 `raw` 열의 GitHub URL이 유일한 출처다. 나중에 필요해지면 그 URL에서 받아 사본을 만든 뒤 `curated: true`로 올린다.
