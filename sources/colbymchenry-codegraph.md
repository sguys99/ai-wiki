---
title: "colbymchenry/codegraph"
type: repo
year: 2026
category: applications
raw_path: raw/repos/colbymchenry-codegraph.md
raw_filename: "colbymchenry-codegraph.md"
source_collection: external
tags: [code-intelligence, knowledge-graph, mcp, tree-sitter, sqlite, fts5, claude-code, cursor, codex, opencode, gemini-cli, dynamic-dispatch, static-analysis, multi-language, agent-tooling, local-first]
org: "colbymchenry"
repo: "codegraph"
url: "https://github.com/colbymchenry/codegraph"
license: "MIT"
---

## 한 줄 요약 (One-line Summary)

CodeGraph는 tree-sitter로 20개 이상 언어의 코드를 파싱해 symbol과 edge를 로컬 SQLite(FTS5) 그래프로 저장하고, MCP 서버로 Claude Code를 비롯한 8종 코딩 에이전트에 노출하는 local-first 코드 인텔리전스 CLI다. 7개 OSS 저장소 A/B 벤치마크에서 평균 16% 저렴, 토큰 47% 감소, 22% 단축, tool call 58% 감소를 보고한다.

## 1. 자료 정보 (Document Information)

- **저장소**: `colbymchenry/codegraph` (https://github.com/colbymchenry/codegraph)
- **npm 패키지**: `@colbymchenry/codegraph`
- **라이선스**: MIT (README 본문 "License" 절)
- **공식 문서 사이트**: https://colbymchenry.github.io/codegraph/
- **릴리스 상태**: README 머리에 "1.0 Released"를 표시하고, 기존 사용자에게 `codegraph upgrade`로 제자리 갱신을 안내한다.
- **호스팅 제품 예고**: PR마다 무엇을 테스트해야 하는지, 무엇이 깨질 수 있는지, 어떤 flow가 영향받는지를 알려주는 CodeGraph 플랫폼을 준비 중이며 getcodegraph.com에서 베타 대기자를 받는다.
- **자료의 성격**: 이 자료는 README 전문 스텁이다. 저장소 클론이 아니므로 소스 파일 구조, 테스트, 내부 함수 시그니처는 확인할 수 없다. README가 직접 언급하는 저장소 내 경로는 `src/mcp/server-instructions.ts`, `telemetry-worker/`, `TELEMETRY.md` 세 개뿐이다.

## 2. 주요 기여 (Key Contributions)

1. **에이전트가 소비하는 local-first 코드 인덱스.** Claude Code가 코드베이스를 탐색할 때 Explore 서브에이전트를 띄워 grep, glob, Read로 파일을 훑고 tool call마다 토큰을 쓴다는 관찰에서 출발한다. CodeGraph는 symbol 관계, call graph, 코드 구조를 미리 인덱싱해 두고 에이전트가 파일을 훑는 대신 그래프에 질의하게 만든다. 외부 API 호출, 임베딩, LLM 요약이 전혀 없고 데이터가 기기를 떠나지 않는다.

2. **20개 이상 언어의 tree-sitter 정적 추출.** TypeScript, JavaScript, Python, Go, Rust, Java, C#, PHP, Ruby, C, C++, Objective-C, Swift, Kotlin, Scala, Dart, Lua, Luau, R, Svelte, Vue, Astro, Liquid, Pascal/Delphi를 지원한다. 언어 지원은 파일 확장자로 자동 판정되므로 언어마다 설정할 것이 없다.

3. **17개 웹 프레임워크의 route에서 handler 연결.** 프레임워크 라우팅 파일을 인식해 `route` 노드를 만들고 `references` edge로 handler 클래스나 함수에 연결한다. view나 controller의 호출자를 물으면 그것을 묶는 URL 패턴이 함께 나온다.

4. **언어 경계를 넘는 dynamic dispatch 합성.** 정적 tree-sitter 추출은 언어 경계에서 멈춘다. CodeGraph는 Swift와 Objective-C 사이 자동 브리징, React Native legacy bridge와 TurboModules, native에서 JS로 가는 이벤트, Expo Modules, Fabric과 Paper view component를 이어 붙여 `trace`, `callers`, `callees`, `impact`가 경계를 넘어 끝까지 연결되게 한다.

5. **상시 최신 인덱스.** 네이티브 OS 파일 이벤트 감시자와 debounce된 auto-sync, per-file staleness banner, 접속 시점 catch-up 세 계층으로 인덱스를 코드와 맞춘다. README는 "인덱스는 절대 낡지 않으며 다시 실행할 것이 없다"고 표현한다.

6. **8종 에이전트 자동 연결 인스톨러.** `codegraph install` 한 번으로 Claude Code, Cursor, Codex CLI, opencode, Hermes Agent, Gemini CLI, Antigravity IDE, Kiro를 탐지해 각각의 MCP 서버 설정을 쓴다. `codegraph uninstall`이 그 설정을 정확히 되돌린다.

7. **측정된 A/B 벤치마크와 언어별 coverage 공개.** 7개 실제 OSS 저장소에서 에이전트가 아키텍처 질문에 답하는 비용을 CodeGraph 유무로 비교하고, 언어마다 벤치마크 저장소를 정해 cross-file coverage를 백분율로 공개한다. README는 잔여분이 정적 분석의 진짜 한계이지 분모를 조작해 감춘 것이 아니라고 밝힌다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 4단계 파이프라인

README의 "How It Works"는 네 단계를 제시한다.

| 단계 | 내용 |
|---|---|
| Extraction | tree-sitter가 소스를 AST로 파싱하고, 언어별 query가 노드(함수, 클래스, 메서드)와 edge(calls, imports, extends, implements)를 추출한다 |
| Storage | 전부 로컬 SQLite 데이터베이스 `.codegraph/codegraph.db`에 FTS5 전문 검색과 함께 저장한다 |
| Resolution | 추출 후 참조를 해소한다. 함수 호출에서 정의로, import에서 원본 파일로, 클래스 상속과 프레임워크 고유 패턴을 잇는다 |
| Auto-Sync | MCP 서버가 네이티브 OS 파일 이벤트로 프로젝트를 감시하고, 2초 정지 구간으로 debounce한 뒤 소스 파일만 걸러 증분 동기화한다 |

에이전트는 CodeGraph MCP 서버에 explore, search, callers, callees, impact, node를 호출하고, 서버는 그 아래의 SQLite 지식 그래프(symbols, edges, files, FTS5 전문 검색)를 조회한다.

### 3.2 설치와 에이전트 연결

설치는 세 단계이고 README는 1단계만으로는 에이전트가 연결되지 않는다는 점을 강조한다.

| 단계 | 명령 | 하는 일 |
|---|---|---|
| 1. CLI 설치 | `curl -fsSL .../install.sh \| sh` (macOS, Linux), `irm .../install.ps1 \| iex` (Windows), 또는 `npm i -g @colbymchenry/codegraph` | OS에 맞는 빌드를 받아 `codegraph`를 PATH에 올린다. Node.js가 없어도 되며 자체 runtime을 번들한다 |
| 2. 에이전트 연결 | `codegraph install` | 설치된 에이전트를 탐지해 각각에 MCP 서버를 연결한다. 이 단계가 실제 연결을 만든다 |
| 3. 프로젝트 초기화 | `codegraph init` | `.codegraph/` 디렉토리를 만들고 같은 단계에서 전체 그래프를 빌드한다 |

인스톨러는 PATH 설치를 바꾸지만 현재 셸은 건드리지 않으므로 2단계 전에 새 터미널을 열어야 한다. `npx @colbymchenry/codegraph`는 다운로드와 실행을 한 번에 한다. `codegraph upgrade`는 설치 방식(bundle, npm, npx)을 스스로 판별해 제자리에서 갱신하며 `--check`로 갱신 여부만 확인하거나 버전을 지정해 고정할 수 있다.

인스톨러가 하는 일은 다음과 같다.

- 설치된 에이전트를 자동 탐지해 어느 것을 설정할지 묻는다.
- `codegraph`를 PATH에 올릴지 묻는다. 에이전트가 MCP 서버를 띄우려면 필요하다.
- 설정을 모든 프로젝트에 적용할지 현재 프로젝트에만 적용할지 묻는다.
- 각 에이전트의 MCP 서버 설정을 쓰고, 에이전트 지시문 파일(`CLAUDE.md`, `AGENTS.md`, `GEMINI.md`)에 마커로 감싼 짧은 CodeGraph 절을 추가한다. MCP 서버의 자체 안내는 메인 에이전트에게만 도달하므로, 서브에이전트와 MCP를 쓰지 않는 환경은 이 절로 `codegraph explore`와 `codegraph node` CLI를 알게 된다.
- Claude Code가 대상이면 자동 허용 권한을 설정한다.

비대화 실행용 플래그는 다음과 같다.

| 플래그 | 값 | 기본값 |
|---|---|---|
| `--target` | `auto`, `all`, `none`, 또는 쉼표 목록(`claude,cursor,...`) | 대화형 질문 |
| `--location` | `global`, `local` | 대화형 질문 |
| `--yes` | 불리언 | 매 단계 질문 |
| `--no-permissions` | 불리언, Claude 자동 허용 목록을 건너뛴다 | 권한 설정 켬 |
| `--print-config <id>` | 에이전트 하나의 설정 조각만 출력하고 종료 | 없음 |

`codegraph uninstall`은 설정한 모든 에이전트에서 CodeGraph의 MCP 서버 설정, 지시문, 권한을 제거한다. 프로젝트 인덱스 `.codegraph/`는 남으며 `codegraph uninit`으로 프로젝트별로 지운다. `--target`으로 특정 에이전트만 제거하거나 `--yes`로 비대화 실행할 수 있다.

수동 설정 경로도 있다. `~/.claude.json`의 `mcpServers`에 `codegraph serve --mcp`를 stdio 타입으로 등록하고, 선택적으로 `~/.claude/settings.json`의 `permissions.allow`에 `mcp__codegraph__codegraph_*` 8개를 넣는다.

### 3.3 CLI 명령

| 명령 | 용도 |
|---|---|
| `codegraph` / `codegraph install` | 대화형 인스톨러 실행 |
| `codegraph uninstall` | 에이전트에서 CodeGraph 제거 |
| `codegraph init [path]` / `uninit [path]` | 프로젝트 초기화와 해제 |
| `codegraph index [path]` | 전체 인덱스 (`--force` 재인덱스, `--quiet`) |
| `codegraph sync [path]` | 증분 갱신 |
| `codegraph status [path]` | 통계와 인덱스 상태 표시 |
| `codegraph unlock [path]` | 인덱싱을 막는 낡은 lock 파일 제거 |
| `codegraph query <search>` | symbol 검색 (`--kind`, `--limit`, `--json`) |
| `codegraph explore <query>` | 관련 symbol의 소스와 call path를 한 번에 반환 (MCP `codegraph_explore`와 같은 출력) |
| `codegraph node <symbol\|file>` | symbol 하나의 소스와 호출자, 또는 파일을 줄 번호와 함께 읽기 |
| `codegraph files [path]` | 파일 구조 표시 (`--format`, `--filter`, `--max-depth`, `--json`) |
| `codegraph callers <symbol>` / `callees <symbol>` | 호출자와 피호출자 |
| `codegraph impact <symbol>` | symbol 변경의 영향 반경 (`--depth`, `--json`) |
| `codegraph affected [files...]` | 변경으로 영향받는 테스트 파일 탐색 |
| `codegraph daemon` | 백그라운드 데몬 관리 |
| `codegraph telemetry [on\|off]` | 익명 사용 통계 조회와 변경 |
| `codegraph upgrade [version]` | 최신 릴리스로 갱신 (`--check`, `--force`) |
| `codegraph version` / `help [command]` | 버전 출력, 도움말 |

`codegraph affected`는 import 의존성을 전이적으로 따라가 변경된 소스 파일이 영향을 주는 테스트 파일을 찾는다. 파일을 인자로 주거나 `git diff --name-only | codegraph affected --stdin`으로 파이프할 수 있다.

| 옵션 | 설명 | 기본값 |
|---|---|---|
| `--stdin` | 파일 목록을 표준 입력에서 읽는다 | `false` |
| `-d, --depth <n>` | 의존성 순회 최대 깊이 | `5` |
| `-f, --filter <glob>` | 테스트 파일을 식별할 사용자 glob | 자동 탐지 |
| `-j, --json` | JSON 출력 | `false` |
| `-q, --quiet` | 파일 경로만 출력 | `false` |

README는 이를 CI나 git hook에 붙이는 예시를 든다. `git diff --name-only HEAD`를 `codegraph affected --stdin --quiet`에 넘겨 결과가 비어 있지 않으면 그 파일만 `npx vitest run`으로 실행하는 방식이다.

### 3.4 MCP 도구 8종, 그중 4종만 노출

MCP 서버로 동작할 때 CodeGraph는 도구 4개만 목록에 올린다. 측정한 에이전트 행동에서 목록이 짧을수록 에이전트가 맞는 도구를 고르고 세션마다 컨텍스트를 아꼈기 때문이다.

| 도구 | 용도 |
|---|---|
| `codegraph_explore` | 기본 도구. "X는 어떻게 동작하는가", "X가 Y에 어떻게 도달하는가" 같은 flow 질문, 한 영역 조사까지 한 번의 호출로 답한다. 관련 symbol의 원문 소스를 파일별로 묶어 반환하고 관계도와 영향 반경을 함께 준다. grep이 따라갈 수 없는 dynamic dispatch(콜백, React 재렌더, interface에서 구현체로)를 드러낸다 |
| `codegraph_node` | symbol 하나의 전체 소스와 호출자, 피호출자 경로를 반환한다. 이름이 모호하면 오버로드를 전부 준다. 파일 경로를 주면 Read 도구처럼 파일 전체를 줄 번호와 함께 읽고(`offset`, `limit` 지원) 그 파일에 의존하는 대상을 덧붙인다 |
| `codegraph_search` | 코드베이스 전체에서 이름으로 symbol을 찾는다 |
| `codegraph_callers` | 함수의 모든 호출 지점을 반환한다. 콜백으로 등록된 자리를 포함하며, 같은 이름이 여럿이면 정의마다 절을 나눈다 |

나머지 4개(`codegraph_callees`, `codegraph_impact`, `codegraph_files`, `codegraph_status`)는 기능은 그대로 살아 있지만 기본 목록에서 빠져 있다. 평가 실행을 측정해 보니 에이전트가 이 도구들을 전혀 고르지 않거나 드물게만 골랐고, 그 정보가 이미 앞의 네 도구에 인라인으로 들어오기 때문이다. explore의 영향 반경 절, node의 의존 대상 안내, symbol 본문 자체가 피호출자 목록 역할을 한다. `CODEGRAPH_MCP_TOOLS` 환경 변수로 다시 켜거나 CLI 등가 명령을 쓸 수 있다.

인덱스가 없는 작업 공간에서는 서버가 스스로 비활성 상태임을 알리고 도구를 하나도 목록에 올리지 않는다. 인덱싱 여부는 사용자 결정으로 남는다.

### 3.5 에이전트에게 전달되는 사용 지침

MCP 서버는 사용 지침을 MCP `initialize` 응답에 실어 에이전트에게 자동으로 전달한다. 지침의 내용은 다음과 같다.

- 구조 관련 질문은 CodeGraph로 직접 답한다. CodeGraph가 곧 미리 만들어 둔 인덱스이므로 grep과 Read를 반복하는 것은 이미 한 일을 되풀이하는 것이다. 반환된 소스는 이미 읽은 것으로 취급한다.
- 의도에 따라 도구를 고른다. 거의 모든 경우 `codegraph_explore`를 쓰고, symbol 위치만 찾으면 `codegraph_search`, 모든 호출 지점이 필요하면 `codegraph_callers`, symbol 하나의 전체 소스와 호출자가 필요하거나 파일을 읽으려면 `codegraph_node`를 쓴다.
- 결과를 신뢰하고 grep으로 다시 검증하지 않는다. 편집 후에는 staleness banner를 확인한다.

README는 이 지침 원문이 `src/mcp/server-instructions.ts`이며 메인 에이전트에 대한 단일 진실 원천이라고 밝힌다. 서브에이전트와 MCP를 쓰지 않는 환경은 MCP 지침을 볼 수 없으므로, 인스톨러가 에이전트 지시문 파일에 네 줄짜리 마커 절을 따로 써서 CLI 등가 명령을 알린다.

### 3.6 auto-sync 3계층

에이전트가 `codegraph serve --mcp`를 띄우면 세 계층이 인덱스를 코드와 맞추고, 편집과 다음 동기화 사이의 짧은 구간에서 에이전트가 조용히 틀린 답을 받는 일을 막는다.

1. **debounce된 파일 감시자.** 네이티브 FSEvents, inotify, ReadDirectoryChangesW 감시자가 소스 파일의 생성, 수정, 삭제를 모두 잡아 debounce 구간 뒤에 재인덱싱을 건다. 기본값은 2000ms이고 `CODEGRAPH_WATCH_DEBOUNCE_MS`로 조절하되 100ms에서 60초 사이로 제한된다. 편집이 몰리면 하나의 동기화로 합쳐진다.
2. **파일 단위 staleness banner.** debounce 구간 동안, 아직 반영되지 않은 파일을 참조하게 될 MCP 도구 응답은 머리에 경고 배너를 붙여 그 파일 이름을 알리고 에이전트에게 직접 `Read`하라고 지시한다. 응답이 참조하지 않는 대기 파일은 짧은 꼬리말로 표시된다. Claude Code로 확인한 결과 에이전트가 "Reading the file directly for the live content"라고 말한 뒤 파일을 열었다.
3. **접속 시점 catch-up.** MCP 서버가 접속하거나 재접속하면 첫 질의에 답하기 전에 크기와 수정 시각, 내용 해시를 작업 트리와 대조한다. MCP 서버가 떠 있지 않은 동안 생긴 변경, 예를 들어 터미널에서 실행한 `git pull`, 다른 편집기의 수정, 종료된 이전 세션의 편집이 다음 세션 첫 tool call에서 흡수된다.

README는 흐름을 다음처럼 요약한다. 에이전트가 파일을 쓰면 100ms 안에 감시자가 반응하고, 기본 2초 debounce를 거쳐 동기화되며, 다음 질의부터 그 파일이 보인다. 상태는 MCP의 `codegraph_status`나 CLI `codegraph status`로 확인하고, 대기 중인 것이 있으면 파일 이름과 편집 경과 시간이 담긴 절이 표시된다.

수동 `codegraph sync`가 필요한 경우는 두 가지로 좁다. 감시자가 꺼져 있을 때(샌드박스 환경이거나 `CODEGRAPH_NO_DAEMON=1`), 그리고 에이전트 세션 밖에서 인덱스를 스크립트로 다룰 때다.

### 3.7 프레임워크 라우팅

CodeGraph는 웹 프레임워크 라우팅 파일을 탐지해 `route` 노드를 만들고 `references` edge로 handler에 연결한다.

| 프레임워크 | 인식하는 형태 |
|---|---|
| Django | `urls.py`의 `path()`, `re_path()`, `url()`, `include()` (클래스 기반 뷰 `.as_view()`, 점 표기 경로 포함) |
| Flask | `@app.route('/path', methods=[...])`, blueprint 라우트 |
| FastAPI | `@app.get(...)`, `@router.post(...)` 등 표준 메서드 전체 |
| Express | 미들웨어 체인을 포함한 `app.get(...)`, `router.post(...)` |
| NestJS | `@Controller`와 `@Get/@Post/...`, GraphQL `@Resolver`와 `@Query/@Mutation`, `@MessagePattern`, `@EventPattern`, `@SubscribeMessage` |
| Laravel | `Route::get()`, `Route::resource()`, `Controller@action`, 튜플 문법 |
| Drupal | `*.routing.yml` 라우트(`_controller`, `_form`, 엔티티 handler), `.module`/`.theme`/`.install`/`.inc`의 `hook_*` 구현 |
| Rails | `get '/x', to: 'users#index'`와 해시 로켓 문법 |
| Spring | 메서드의 `@GetMapping`, `@PostMapping`, `@RequestMapping` |
| Play | `conf/routes`의 `GET`, `POST` 등 verb 라우트에서 `Controller.method` 액션으로 (Scala와 Java) |
| Gin, chi, gorilla, mux | `r.GET(...)`, `router.HandleFunc(...)` |
| Axum, actix, Rocket | `.route("/x", get(handler))` |
| ASP.NET | 액션 메서드의 `[HttpGet("/x")]` 속성 |
| Vapor | `app.get("x", use: handler)` |
| React Router, SvelteKit | 라우트 컴포넌트 노드 |
| Vue Router, Nuxt | `pages/` 파일 기반 라우트, `server/api/` 엔드포인트, 라우트 미들웨어 |
| Astro | `src/pages/` 파일 기반 라우트 (`.astro` 페이지와 `.ts` 엔드포인트, `[param]`과 `[...rest]` 문법) |

### 3.8 iOS, React Native, Expo 혼합 브리징

실제 iOS와 React Native 코드베이스는 여러 언어에 걸쳐 있다. Swift 호출자가 자동 브리징된 Objective-C 선택자를 부르고, JS 파일이 React Native bridge로 네이티브 모듈에 들어가며, JSX 컴포넌트가 네이티브 view manager에 위임한다. 정적 tree-sitter 추출은 각 언어 경계에서 멈추므로 CodeGraph가 이를 이어 붙인다.

| 경계 | JS 또는 Swift 쪽 | 네이티브 쪽 | 잇는 방법 |
|---|---|---|---|
| Swift에서 ObjC | Swift `obj.foo(bar:)` | ObjC 선택자 `-fooWithBar:` | `@objc` 자동 브리징 규칙(init, property, protocol 형태 포함)과 Cocoa 전치사 접두사(`With`, `For`, `By`, `In`, `On`, `At` 등) |
| ObjC에서 Swift | ObjC `[obj fooWithBar:]` | Swift `@objc func foo(bar:)` | 역방향 브리지 이름 후보를 만들고 소스에서 `@objc` 노출을 검증한다 |
| RN legacy bridge | JS `NativeModules.X.fn(...)` | ObjC `RCT_EXPORT_METHOD`, `RCT_REMAP_METHOD`, Java/Kotlin `@ReactMethod` | 매크로와 어노테이션 선언을 파싱해 JS 이름에서 네이티브 메서드로 가는 지도를 만든다 |
| RN TurboModules | JS `import M from './NativeM'; M.fn(...)` | Codegen 명세에 대응하는 네이티브 구현 | `Native<X>.ts` 명세 인터페이스를 기준으로 삼는다 |
| RN 네이티브에서 JS 이벤트 | JS `new NativeEventEmitter(...).addListener('e', cb)` | ObjC `sendEventWithName:`, Swift `sendEvent(withName:)`, Java/Kotlin `.emit("e", ...)` | 이벤트 이름 리터럴을 키로 삼아 언어를 넘는 이벤트 채널을 합성한다 |
| Expo Modules | JS `requireNativeModule('X').fn(...)` | Swift 또는 Kotlin `Module { Name("X"); AsyncFunction("fn") { ... } }` | Expo DSL 리터럴을 파싱하고, 합성한 메서드 노드가 기존 이름 매칭으로 해소된다 |
| Fabric view component | JSX `<MyView prop={v}/>` | TS Codegen 명세와 네이티브 구현 클래스 | 명세를 `component` 노드로 만들고, 이름에 `View`, `ComponentView`, `Manager`, `ViewManager` 접미사를 붙이는 관례로 네이티브와 잇는다 |
| Paper view manager | JSX `<MyView prop={v}/>` | ObjC `RCT_EXPORT_VIEW_PROPERTY`, Java/Kotlin `@ReactProp` | Fabric과 같은 방식이며 Paper 시절 선언도 `component`와 `property` 노드를 만든다 |

각 브리지는 작은 저장소, 중간 저장소, 큰 저장소에서 검증했다.

| 브리지 | 작은 저장소 | 중간 저장소 | 큰 저장소 |
|---|---|---|---|
| Swift와 ObjC | Charts | realm-swift | Wikipedia-iOS |
| RN legacy bridge | AsyncStorage | react-native-svg | react-native-firebase |
| RN 네이티브에서 JS 이벤트 | RNGeolocation | 없음 | react-native-firebase |
| Expo Modules | expo-haptics | expo-camera | Expo SDK 7개 패키지 일괄 검증 |
| Fabric과 Paper view | react-native-segmented-control | react-native-screens | react-native-skia |

합성된 edge는 모두 `provenance:'heuristic'`으로 태그되고 `metadata.synthesizedBy`에 안정된 채널 이름이 들어간다. README가 예로 드는 채널명은 `swift-objc-bridge`, `rn-event-channel`, `fabric-native-impl`, `expo-module-extract` 네 개다. 에이전트는 이 태그로 어떤 hop이 어떤 경로로 그래프에 들어왔는지 한눈에 판단할 수 있다.

### 3.9 설정 없는 동작과 제외 규칙

CodeGraph에는 설정 파일이 없다. 언어 지원은 확장자로 자동 판정되므로 언어별로 연결할 것이 없다. 기본 제외 대상은 다음과 같다.

- **의존성, 빌드, 캐시 디렉토리**: `node_modules`, `vendor`, `dist`, `build`, `target`, `.venv`, `Pods`, `.next` 등 지원하는 모든 스택에 걸쳐 제외한다. `.gitignore`가 없어도 적용된다.
- **`.gitignore`에 든 것 전부**: git 저장소에서는 git을 통해, git이 아닌 프로젝트에서는 루트와 하위의 `.gitignore`를 직접 읽어 존중한다.
- **1MB를 넘는 파일**: 생성된 번들, 압축된 JS, 벤더 blob이 대상이다.

다른 것을 더 빼려면 `.gitignore`에 넣는다. 반대로 기본 제외된 디렉토리를 다시 넣으려면 `!vendor/`처럼 부정 패턴을 쓴다. 기본값이 일률적으로 적용되므로 의존성이나 빌드 디렉토리를 커밋했다고 해서 그래프에 들어오지는 않으며, `.gitignore` 부정 패턴이 명시적 편입 수단이다.

### 3.10 라이브러리 임베딩

npm 패키지가 프로그래밍 API를 다시 export하므로 `import`와 `require` 양쪽에서 `CodeGraph` 클래스가 해소된다. Electron 메인 프로세스처럼 앱에 내장하는 용도다. README 예제는 `CodeGraph.init()` 또는 `CodeGraph.open()`으로 프로젝트를 열고, `indexAll()`에 진행 콜백을 주며, `searchNodes()`, `getCallers()`, `buildContext()`, `getImpactRadius()`를 호출한 뒤 `watch()`, `unwatch()`, `close()`로 마무리하는 흐름을 보여준다. 하위 구성 요소로 `DatabaseConnection`, `QueryBuilder`, `getDatabasePath`, `initGrammars`, `loadGrammarsForLanguages`, `FileLock`이 같은 진입점에서 export된다.

임베딩 요구사항은 세 가지다. 첫째, npm에서 설치해야 플랫폼별 패키지가 함께 받아진다. 둘째, API가 사용자 runtime에서 돌기 때문에 내장 `node:sqlite`를 위해 Node 22.5 이상이 필요하다. Electron은 번들된 Node가 22.5 이상이면 해당한다. CLI와 MCP 서버는 자체 번들 runtime을 쓰므로 영향받지 않는다. 셋째, TypeScript 타입이 패키지에 포함되며 `@types/node`와 `skipLibCheck: true`를 유지하면 된다.

### 3.11 텔레메트리

CodeGraph는 익명 사용 통계를 수집한다. 어떤 도구와 명령이 쓰이는지, 어떤 언어가 인덱싱되는지를 모아 언어와 에이전트 지원의 우선순위를 정하는 데 쓴다. 코드, 경로, 파일이나 symbol 이름, 질의, IP 주소는 절대 수집하지 않는다. 사용량은 전송 전에 로컬에서 일별 합계로 집계되고, 수집 엔드포인트는 저장소의 `telemetry-worker/`에 공개된 코드이며 문서화된 필드 목록을 강제한다. 인스톨러가 처음에 묻고, 이후 `codegraph telemetry off`, `CODEGRAPH_TELEMETRY=0`, `DO_NOT_TRACK=1` 중 어느 것으로도 끌 수 있다. 전체 필드 목록은 `TELEMETRY.md`에 있다.

### 3.12 지원 플랫폼과 에이전트

릴리스마다 세 데스크톱 OS 모두에 대해 Intel/AMD(x64)와 ARM(arm64) 양쪽의 자체 완결 빌드를 낸다. Node runtime이 번들되어 컴파일할 것이 없다. Windows는 PowerShell 인스톨러나 npm, macOS와 Linux는 셸 인스톨러나 npm으로 설치한다.

인스톨러가 자동 탐지해 설정하는 에이전트는 Claude Code, Cursor, Codex CLI, opencode, Hermes Agent, Gemini CLI, Antigravity IDE, Kiro 8종이다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 7개 저장소 A/B 벤치마크

7개 언어에 걸친 7개 실제 OSS 코드베이스에서, 헤드리스 Claude Code가 아키텍처 질문 하나에 답하는 과정을 CodeGraph 유무로 비교했다. 각 칸은 각 조건에서 4회 실행한 중앙값 기준의 절감폭이다. 2026-06-02에 Opus 4.8과 현재 빌드로 재검증했으며 `codegraph_explore`가 기본 도구인 상태다.

평균은 16% 저렴, 토큰 47% 감소, 22% 단축, tool call 58% 감소다.

| 코드베이스 | 언어와 규모 | 비용 | 토큰 | 시간 | tool call |
|---|---|---|---|---|---|
| VS Code | TypeScript, 약 1만 개 파일 | 18% 저렴 | 64% 감소 | 11% 단축 | 81% 감소 |
| Excalidraw | TypeScript, 약 640개 | 동일 | 25% 감소 | 27% 단축 | 40% 감소 |
| Django | Python, 약 3천 개 | 8% 저렴 | 60% 감소 | 13% 단축 | 77% 감소 |
| Tokio | Rust, 약 790개 | 동일 | 38% 감소 | 18% 단축 | 57% 감소 |
| OkHttp | Java, 약 645개 | 25% 저렴 | 54% 감소 | 31% 단축 | 50% 감소 |
| Gin | Go, 약 110개 | 19% 저렴 | 23% 감소 | 24% 단축 | 44% 감소 |
| Alamofire | Swift, 약 110개 | 40% 저렴 | 64% 감소 | 33% 단축 | 58% 감소 |

작은 저장소, 중간 저장소, 큰 저장소를 가리지 않고 토큰, tool call, 실제 소요 시간이 모두 줄었고 파일 읽기는 거의 0에 가깝다. CodeGraph가 없는 조건에서는 에이전트가 예산의 상당 부분을 grep, find, Read 탐색에 쓴다. 비용은 어디서나 같거나 저렴한 수준을 유지하며, 절감폭은 작은 저장소(Alamofire, OkHttp)에서 가장 크고 응답이 무거운 저장소(Excalidraw, Tokio)에서 거의 같아진다. 후자에서 CodeGraph는 잦은 소규모 grep과 read 왕복을 몇 번의 큰 캐시 친화적 도구 응답으로 바꾸기 때문이다.

저장소별 절대 수치는 다음과 같다.

| 코드베이스 | 시간 (사용/미사용) | 파일 읽기 | grep과 bash | tool call | 총 토큰 | 비용 |
|---|---|---|---|---|---|---|
| VS Code | 1분 59초 / 2분 13초 | 0 / 9 | 0 / 11 | 4 / 21 | 64만 / 179만 | $0.68 / $0.83 |
| Excalidraw | 1분 32초 / 2분 6초 | 0 / 7 | 1 / 8 | 9 / 15 | 127만 / 169만 | $0.78 / $0.78 |
| Django | 1분 43초 / 1분 58초 | 0 / 9 | 0 / 5 | 3 / 13 | 55.9만 / 141만 | $0.57 / $0.62 |
| Tokio | 1분 55초 / 2분 20초 | 0 / 8 | 0 / 6 | 6 / 14 | 108만 / 173만 | $0.82 / $0.82 |
| OkHttp | 1분 1초 / 1분 29초 | 0 / 4 | 2 / 6 | 5 / 10 | 50.2만 / 110만 | $0.41 / $0.55 |
| Gin | 1분 14초 / 1분 37초 | 1 / 6 | 1 / 2 | 5 / 9 | 65.1만 / 84.7만 | $0.46 / $0.57 |
| Alamofire | 1분 35초 / 2분 21초 | 0 / 9 | 0 / 4 | 5 / 12 | 76.6만 / 210만 | $0.57 / $0.95 |

### 4.2 벤치마크 방법론

각 조건은 저장소를 대상으로 `claude -p`(Claude Opus 4.8)를 `--strict-mcp-config`와 함께 헤드리스로 실행한 것이다. 사용 조건은 CodeGraph MCP 서버를 켠 상태, 미사용 조건은 빈 MCP 설정이다. 내장 Read, Grep, Bash는 양쪽 모두 쓸 수 있다. 저장소마다 같은 질문을 쓰고 조건당 4회 실행해 중앙값을 보고한다. 비용은 실행의 `total_cost_usd`, 토큰은 처리된 총 토큰(캐시를 포함한 입력과 출력), 시간은 실제 소요 시간, tool call은 모델이 띄운 서브에이전트 내부를 포함한 모든 tool call이다. 저장소는 `--depth 1`로 클론했고 같은 CodeGraph 빌드로 인덱싱했다.

저장소별 질문은 다음과 같다.

| 코드베이스 | 질문 |
|---|---|
| VS Code | 확장 호스트가 메인 프로세스와 어떻게 통신하는가 |
| Excalidraw | Excalidraw는 캔버스 요소를 어떻게 렌더링하고 갱신하는가 |
| Django | Django ORM은 QuerySet에서 쿼리를 어떻게 만들고 실행하는가 |
| Tokio | tokio는 런타임에서 비동기 task를 어떻게 스케줄하고 실행하는가 |
| OkHttp | OkHttp는 인터셉터 체인을 통해 요청을 어떻게 처리하는가 |
| Gin | gin은 미들웨어 체인을 통해 요청을 어떻게 라우팅하는가 |
| Alamofire | Alamofire는 요청을 어떻게 만들고 보내고 검증하는가 |

README는 이 수치가 이전 Opus 4.7 검증보다 낮다는 점을 명시하고, 그 이유가 CodeGraph의 회귀가 아니라 미사용 조건의 기준선이 강해진 것이라고 설명한다. Opus 4.8은 큰 Explore 서브에이전트로 퍼져 나가는 대신 메인 스레드에서 효율적으로 grep과 read를 하기 때문이다. 저장소별 수치는 미사용 조건이 얼마나 헤매느냐에 따라 실행마다 움직인다. 4회 중앙값이 이를 완화하지만 꼬리는 남아서, 한 배치에서 Django의 미사용 조건이 $2.71과 14분을 기록한 사례가 있다.

승리 요인에 대한 README의 설명은 다음과 같다. 인덱스가 있으면 에이전트가 대개 `codegraph_explore` 한 번으로 관련 소스를 받아 곧장 답하고 멈추며 파일 읽기는 보통 0이다. 인덱스가 없으면 예산 대부분을 올바른 코드에 도달하기 전의 탐색(find, ls, grep)에 쓴다.

### 4.3 언어별 cross-file coverage

impact와 영향 반경 질의의 품질은 그 아래 의존성 그래프에 달려 있으므로, README는 coverage를 주장하지 않고 측정해 공개한다. fair coverage는 symbol을 가진 소스 파일 중 해소된 cross-file 의존 대상을 하나 이상 갖는 파일의 비율이다. 의존 대상은 그 파일을 import하거나 호출하거나 참조하거나 프레임워크 관례로 라우팅하는 것을 말한다. 언어마다 실제 벤치마크 저장소 하나를 정해 측정했다.

| 언어 | 벤치마크 저장소 | coverage |
|---|---|---|
| TypeScript, JavaScript | CodeGraph 자체 저장소 | 95.8% |
| Python | psf/requests | 100% |
| Go | gin-gonic/gin | 96.6% |
| Rust | BurntSushi/ripgrep | 86.7% |
| Java | google/gson | 93.3% |
| C# | jbogard/MediatR | 85.2% |
| PHP | guzzle/guzzle | 100% |
| Ruby | sidekiq/sidekiq | 100% |
| C | redis/redis | 92.2% |
| C++ | google/leveldb | 94.8% |
| Objective-C | SDWebImage | 91.6% |
| Swift | Alamofire | 95.3% |
| Kotlin | square/okhttp | 96.2% |
| Scala | gatling/gatling | 91.2% |
| Dart | flutter/packages | 92.4% |
| Svelte, SvelteKit | sveltejs/realworld | 100% |
| Vue, Nuxt | nuxt/movies | 93.5% |
| Astro | xingwangzhe/stalux | 93.0% |
| Lua | nvim-telescope/telescope.nvim | 84.2% |
| Luau | dphfox/Fusion | 92.2% |
| Liquid | Shopify/dawn | 73.8% |
| Pascal, Delphi | PascalCoin | 77.4% |

README는 잔여분이 언제나 정적 분석의 진짜 한계라고 밝힌다. 런타임 dynamic dispatch, 리플렉션과 의존성 주입 컨테이너, 프레임워크 관례로 정해지는 진입점, 벤더링된 서드파티 코드가 여기 해당하며, 분모를 조작해 감춘 것이 아니다.

### 4.4 프레임워크 라우팅 coverage

라우팅도 같은 방식으로 프레임워크마다 대표 앱 하나를 정해 검증했다. Express 100%, FastAPI 98%, Flask 100%, NestJS 96.8%, Gin 96.5%, Axum 100%, Rocket 93.8%, Vapor 100%, Laravel 92%, Rails 89.6%, React Router 100%다. 관례와 리플렉션에 크게 의존하는 프레임워크는 정적 분석의 정직한 상한에 머문다. ASP.NET 83.9%, Spring 83.3%, Drupal 78.9%, Play 76.3%, Django 74.1%다. SvelteKit, Vue와 Nuxt, Astro는 파일 기반 라우팅이라 페이지와 엔드포인트 coverage가 위 표의 언어별 수치(각각 100%, 93.5%, 93.0%)와 같다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **이 자료는 README 스텁이라 내부 구현 세부는 확인 불가.** 소스 파일 구조, 테스트 개수, 함수 시그니처, 상수 값, 변경 이력, 버전 번호는 README에 없으므로 이 요약이 다루지 않는다. README가 언급하는 저장소 내 경로는 `src/mcp/server-instructions.ts`, `telemetry-worker/`, `TELEMETRY.md` 세 개뿐이다.
- **직접 질의할 때만 효과가 있다.** README가 명시하는 가장 큰 조건이다. CodeGraph는 에이전트가 직접 질의할 때만 도움이 되므로, 지침이 탐색을 파일 읽는 서브에이전트에 위임하지 말고 직접 답하도록 유도한다. 그렇게 하지 않으면 서브에이전트가 어차피 파일을 읽고 CodeGraph는 순수한 부담이 된다.
- **정적 분석의 잔여 한계.** cross-file coverage의 미달분은 런타임 dynamic dispatch, 리플렉션과 의존성 주입 컨테이너, 프레임워크 관례로 정해지는 진입점, 벤더링된 서드파티 코드다. 관례에 크게 기대는 프레임워크(Django 74.1%, Play 76.3%, Drupal 78.9%)에서 라우팅 coverage가 가장 낮다.
- **합성 edge는 휴리스틱이다.** 언어 경계를 잇는 edge는 `provenance:'heuristic'`으로 표시되며 정적으로 증명된 관계가 아니다. `metadata.synthesizedBy`의 채널명이 그 출처를 남긴다.
- **Objective-C는 부분 지원.** 클래스, 프로토콜, 메서드, `@property`, `#import`, 메시지 전송을 다루지만 `.mm` Objective-C++ 파일은 불완전하게 파싱될 수 있다. 지원 언어 표에서 유일하게 부분 지원으로 표시된 언어다.
- **파일시스템에 따라 SQLite WAL이 켜지지 않는다.** 네트워크 공유나 WSL2의 `/mnt`에서 흔하며, 이 경우 읽기가 쓰기에 막힐 수 있다. `codegraph status`의 저널 표시가 `wal`이 아니면 프로젝트를 로컬 디스크로 옮겨야 한다.
- **Windows와 WSL이 한 체크아웃을 공유할 수 없다.** 백그라운드 서버 lock과 SQLite 인덱스가 그것을 쓴 OS에 묶이고, WSL2와 Windows 파일시스템 경계를 넘는 SQLite 잠금은 신뢰할 수 없다. 한쪽의 `CODEGRAPH_DIR`을 다른 이름으로 지정해 인덱스를 분리해야 한다. CodeGraph는 인덱싱과 감시에서 형제 `.codegraph-*` 디렉토리를 건너뛴다.
- **에이전트가 도구를 고르는 행동은 CodeGraph가 직접 바꿀 수 없다.** 도구를 8개에서 4개로 줄여 목록에 올린 결정 자체가 이 제약의 산물이다. 측정 결과 에이전트가 나머지 4개를 전혀 또는 거의 고르지 않았다.
- **호스팅 제품은 미출시.** PR 단위 영향 분석을 제공하는 CodeGraph 플랫폼은 대기자 명단 단계이며 README에 기능 명세가 없다.

## 6. 관련 연구 (Related Work)

- **tree-sitter**: 추출의 기반이 되는 incremental parser. 언어별 query로 노드와 edge를 뽑는다.
- **MCP (Model Context Protocol)**: Anthropic의 표준. CodeGraph는 `serve --mcp` 모드에서 stdio 서버로 동작하고 `initialize` 응답에 사용 지침을 실어 보낸다.
- **SQLite FTS5**: symbol 이름 전문 검색에 쓰는 SQLite 확장. 별도 검색 엔진이나 임베딩 인덱스를 두지 않는 이유다.
- **[[applications/garrytan-gbrain]]**: markdown 저장소를 파생 인덱스로 sync하는 에이전트 메모리 MCP. 에이전트가 read loop 대신 MCP 도구로 답을 받게 한다는 점에서 같은 계열이고, 대상이 markdown 지식이라는 점에서 다르다.
- **[[applications/lum1104-understand-anything]]**: 코드베이스를 다단계 LLM 파이프라인으로 분석해 지식 그래프와 대시보드를 만드는 onboarding 도구. 같은 문제 영역이지만 LLM이 파이프라인의 중심에 있다.
- **[[applications/safishamsi-graphify]]**: 폴더 하나를 지식 그래프 산출물 묶음으로 바꾸는 스킬. 입력 폴더 종류를 가리지 않는다.
- **[[applications/wlsdks-ontology-atlas]]**: 코드에서 뽑는 대신 사람과 에이전트가 Markdown으로 직접 쓰는 제품 capability ontology 워크벤치.
- **[[database/li-2026-beyond-semantic-similarity-rethinking-retrieval]]**: 임베딩 없이 에이전트가 grep과 bash로 원본 corpus를 직접 탐색하는 Direct Corpus Interaction. CodeGraph는 직접 탐색이되 대상이 미리 만든 그래프라는 점에서 상보적이다.

## 7. 용어집 (Glossary)

- **fair coverage**: symbol을 가진 소스 파일 중 해소된 cross-file 의존 대상을 하나 이상 갖는 파일의 비율. CodeGraph가 impact 질의의 품질을 재는 지표로 정의한 값이다.
- **staleness banner**: debounce 구간 동안 아직 반영되지 않은 파일을 참조할 때 MCP 응답 머리에 붙는 경고. 에이전트에게 그 파일만 직접 읽으라고 알린다.
- **catch-up sync**: MCP 서버가 접속하거나 재접속할 때 첫 질의 전에 크기와 수정 시각, 내용 해시를 작업 트리와 대조해 외부 편집을 흡수하는 단계.
- **provenance:'heuristic'**: 언어 경계를 잇느라 합성한 edge에 붙는 태그. 정적으로 증명된 관계와 구분된다.
- **metadata.synthesizedBy**: 합성 edge가 어느 채널에서 왔는지 담는 필드. `swift-objc-bridge`, `rn-event-channel`, `fabric-native-impl`, `expo-module-extract`가 README에 예시로 나온다.
- **route 노드**: 프레임워크 라우팅 파일에서 만들어져 `references` edge로 handler에 연결되는 노드 종류.
- **fair coverage의 잔여분**: 런타임 dynamic dispatch, 리플렉션과 의존성 주입, 프레임워크 관례 진입점, 벤더링된 코드. README가 정적 분석의 진짜 한계로 지목한 범주다.
