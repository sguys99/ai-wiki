---
title: "colbymchenry/codegraph"
type: repo
year: 2026
category: applications
raw_path: raw/repos/colbymchenry-codegraph.md
raw_filename: "colbymchenry-codegraph.md"
source_collection: external
tags: [code-intelligence, knowledge-graph, mcp, tree-sitter, sqlite, fts5, claude-code, cursor, codex, opencode, gemini-cli, dynamic-dispatch, callback-synthesizer, static-analysis, multi-language, agent-tooling]
org: "colbymchenry"
repo: "codegraph"
url: "https://github.com/colbymchenry/codegraph"
license: "MIT"
version: "0.9.8 (cloned 2026-06-02)"
---

## 한 줄 요약 (One-line Summary)

CodeGraph는 tree-sitter로 20+ 언어의 코드를 파싱해 symbol·edge·file을 SQLite(FTS5) knowledge graph로 저장하고, MCP 서버를 통해 Claude Code·Cursor·Codex CLI·opencode·Hermes Agent·Gemini CLI·Antigravity IDE·Kiro 8종 코딩 에이전트에게 `search · context · trace · callers · callees · impact · node · explore · files · status` 10개 도구로 노출하는 **로컬-퍼스트 코드 인텔리전스 라이브러리·CLI·MCP 서버**로, 7개 OSS 벤치마크(Opus 4.8, n=4 median)에서 **25% cheaper · 57% fewer tokens · 23% faster · 62% fewer tool calls**를 보고했다.

## 1. 자료 정보 (Document Information)

- **저장소**: `colbymchenry/codegraph` (https://github.com/colbymchenry/codegraph)
- **npm**: `@colbymchenry/codegraph` (thin shim + per-platform packages, Node 자체 번들)
- **버전**: `0.9.8` (`package.json`, 2026-06-01 release)
- **라이선스**: MIT License, Copyright (c) 2026 Colby Mchenry
- **공식 사이트**: https://colbymchenry.github.io/codegraph/
- **설치 경로**: `curl -fsSL .../install.sh | sh` (mac/Linux), `irm .../install.ps1 | iex` (Windows), `npx @colbymchenry/codegraph`, `npm i -g @colbymchenry/codegraph`. **Node.js 불필요** — 자체 runtime 번들. 라이브러리 임베딩 모드만 Node 22.5+ 필요 (built-in `node:sqlite`).
- **핵심 진입점**:
  - `src/index.ts` — public `CodeGraph` 클래스 (`init`/`open`/`indexAll`/`sync`/`searchNodes`/`getCallers`/`getCallees`/`getImpactRadius`/`buildContext`/`watch`/`unwatch`/`close`)
  - `src/bin/codegraph.ts` — CLI (commander 기반) subcommands: `install`, `uninstall`, `init`, `uninit`, `index`, `sync`, `status`, `query`, `files`, `context`, `callers`, `callees`, `impact`, `affected`, `serve --mcp`
  - `src/mcp/server-instructions.ts` — MCP `initialize` 응답으로 보내는 agent 지침의 **단일 진실 원천** (issue #529; 더 이상 `CLAUDE.md`/`AGENTS.md`/`.cursor/rules/codegraph.mdc` 등에 중복 instructions block을 쓰지 않음)
  - `src/db/schema.sql` — nodes/edges/files 테이블 + FTS5 인덱스
- **벤치마크 코퍼스**: VS Code(TS, ~10k), Excalidraw(TS, ~640), Django(Python, ~3k), Tokio(Rust, ~790), OkHttp(Java, ~645), Gin(Go, ~110), Alamofire(Swift, ~110). 모두 `claude -p` Opus 4.8 헤드리스, `--strict-mcp-config`, n=4 median, **2026-05-29 재검증**.

## 2. 주요 기여 (Key Contributions)

1. **로컬-퍼스트 code-intelligence MCP 서버.** Anthropic 외부 API 호출·임베딩·LLM 요약 없이, tree-sitter 정적 추출 + SQLite WAL + FTS5만으로 코딩 에이전트가 "이 함수가 어디서 호출되는가/이 변경의 영향 반경/X에서 Y로 도달하는 경로" 같은 **구조·플로우 질문**을 grep/Read 루프 없이 답하도록 한다. 100% 로컬, no API keys, `node_modules`·`vendor`·`dist`·`.gitignore` 자동 제외.
2. **20+ 언어 트리시터 추출.** TypeScript/JavaScript/Python/Go/Rust/Java/C#/PHP/Ruby/C/C++/Objective-C/Swift/Kotlin/Scala/Dart/Lua/Luau/Svelte/Vue/Liquid/Pascal·Delphi. `src/extraction/languages/` 디렉토리에 언어별 파일 하나씩. WASM 그래머는 `src/extraction/wasm/`에 번들, `parse-worker.ts`로 무거운 파싱을 별 thread offload.
3. **14+ 웹 프레임워크 route → handler 매핑.** `src/resolution/frameworks/`에 Django(`path/re_path/include`, CBV `.as_view()`), Flask, FastAPI, Express, NestJS(`@Controller`+`@Get/@Post`, GraphQL `@Resolver`, `@MessagePattern`, `@SubscribeMessage`), Laravel, Drupal(`*.routing.yml` + `hook_*` impls), Rails, Spring, Gin/chi/gorilla/mux, Axum/actix/Rocket, ASP.NET, Vapor, React Router, SvelteKit, Vue/Nuxt, Cargo workspaces. `route` 노드와 `references` edge로 URL pattern ↔ handler 연결.
4. **Dynamic-dispatch synthesis — flow가 graph에 end-to-end로 존재하도록.** Static tree-sitter는 콜백·옵저버·EventEmitter·React re-render 같은 indirect call을 놓치기 때문에 flow가 끊겨 agent가 grep/Read로 복원해야 한다. CodeGraph의 `src/resolution/callback-synthesizer.ts`가 **whole-graph pass**로 다음 채널을 합성한다 (모두 `provenance:'heuristic'` + `metadata.synthesizedBy:<channel>` 태그):
   - **Field observer**: `Scene.onUpdate(cb)` + `for(cb of cbs) cb()` → `triggerUpdate → triggerRender` edge
   - **EventEmitter**: `on('e', fn)` ↔ `emit('e')`
   - **React re-render**: `setState` → `render`
   - **JSX child**: parent `render` → child component
   - **Swift closure-collection dispatch** (Alamofire 패턴): `validators.write{$0.append(v)}` ↔ `validators.forEach{$0()}`, element-invoke `$0(`/`it(` 게이트로 precision 확보
   - **Django ORM descriptor** (named attribute는 resolver): `self._iterable_class(self)` → `ModelIterable.__iter__`
5. **Mixed iOS / React Native / Expo bridging.** Swift↔ObjC 자동 브리징(`@objc` exposure, `RCT_EXPORT_METHOD` selector 매핑, Cocoa preposition prefix `With/For/By/...`), RN legacy bridge(`NativeModules.X.fn` ↔ `RCT_EXPORT_METHOD` / `@ReactMethod`), RN TurboModules(Codegen `Native<X>.ts` spec ground truth), RN native→JS events(`sendEventWithName` ↔ `NativeEventEmitter.addListener`), Expo Modules(`Module { Name("X"); AsyncFunction("fn"){...} }`), Fabric/Paper view components(JSX ↔ ObjC `RCT_EXPORT_VIEW_PROPERTY` / `@ReactProp`).
6. **Adaptive explore budget.** `src/mcp/tools.ts::getExploreBudget(fileCount)`이 repo 크기에 따라 explore call 수를 `<500→1, <5000→2, <15000→3, <25000→4, ≥25000→5`로 스케일링하고, `getExploreOutputBudget`이 per-call chars/files/per-file을 함께 키운다. **"larger tier must never get smaller `maxCharsPerFile` than a smaller tier"** invariant로 god-file repo(예: Excalidraw `App.tsx` 415 KB)에서 explore 응답이 file의 <1%만 반환해 Read 폴백을 유발하는 회귀를 방지.
7. **다중 에이전트 인스톨러 — 한 파일로 새 agent 추가.** `src/installer/targets/`에 `claude.ts`·`cursor.ts`·`codex.ts`·`opencode.ts`·`hermes.ts`·`gemini.ts`·`antigravity.ts`·`kiro.ts`. 각 타깃은 자체 config 파일 위치와 JSON/TOML/JSONC writer를 소유. **새 agent 추가 비용 = 한 파일 + registry entry**. opencode `.jsonc`는 `jsonc-parser`로 surgical edit해 사용자 주석·포맷 유지. Codex `mcp_servers.codegraph` TOML은 hand-rolled serializer로 sibling table과 `[[array_of_tables]]` 보존. `<!-- CODEGRAPH_START -->` / `<!-- CODEGRAPH_END -->` 마커는 0.9.7부터 **strip-only**(issue #529 — server-instructions와 instructions file 중복 제거).
8. **공식 벤치마크(2026-05-29 Opus 4.8 재검증).** 7개 OSS 레포 × n=4 median, with-vs-without CodeGraph headless A/B:

   | Codebase | Lang | Cost | Tokens | Time | Tool calls |
   |---|---|---|---|---|---|
   | VS Code (~10k) | TS | 33% cheaper | 70% fewer | 27% faster | 80% fewer |
   | Excalidraw (~640) | TS | 27% cheaper | 61% fewer | 26% faster | 70% fewer |
   | Django (~3k) | Python | 23% cheaper | 70% fewer | 28% faster | 77% fewer |
   | Tokio (~790) | Rust | 35% cheaper | 70% fewer | 37% faster | 79% fewer |
   | OkHttp (~645) | Java | 11% cheaper | 48% fewer | 26% faster | 70% fewer |
   | Gin (~110) | Go | 15% cheaper | 35% fewer | 9% faster | 47% fewer |
   | Alamofire (~110) | Swift | 28% cheaper | 46% fewer | 7% faster | 13% fewer |
   | **평균** | — | **25%** | **57%** | **23%** | **62%** |

   메커니즘은 cache-hit이 아니라 **"훨씬 더 작은 누적 컨텍스트 위에서 훨씬 더 적은 turn"** — without 암의 막대한 토큰 볼륨은 대부분 cheap cache-read여서 토큰 절감(57%)이 비용 절감(35%)보다 크게 보이는 이유. **per-turn assistant usage를 직접 합산**해야 정확 (`result.usage`는 last-turn만 — 현 Claude Code).

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 디렉토리 구조 (실측, src 123개 / __tests__ 59개 파일)

```
colbymchenry-codegraph/
├── package.json                  # name=@colbymchenry/codegraph, v0.9.8, MIT
├── src/
│   ├── index.ts                  # public CodeGraph 클래스 (모든 layer wiring)
│   ├── types.ts                  # NodeKind / EdgeKind 단일 진실 원천
│   ├── bin/
│   │   ├── codegraph.ts          # CLI (commander) — install/init/index/sync/...
│   │   ├── uninstall.ts          # npm preuninstall hook
│   │   └── node-version-check.ts # Node 25.x hard exit
│   ├── db/
│   │   ├── schema.sql            # nodes/edges/files + FTS5
│   │   ├── sqlite-adapter.ts     # better-sqlite3 native ↔ node-sqlite3-wasm fallback
│   │   ├── migrations.ts         # 스키마 버전 추적
│   │   └── queries.ts            # prepared statement QueryBuilder
│   ├── extraction/
│   │   ├── tree-sitter.ts        # 메인 wrapper; visitFunctionBody가 named nested fn 추출
│   │   ├── parse-worker.ts       # 무거운 파싱 off-main-thread
│   │   ├── languages/            # 19개 언어 (typescript/javascript/python/go/rust/java/csharp/php/ruby/c-cpp/objc/swift/kotlin/scala/dart/lua/luau/pascal)
│   │   ├── vue-extractor.ts      # SFC: <script> + <script setup> 분리 추출
│   │   ├── mybatis-extractor.ts  # XML mapper → Java mapper interface 링크
│   │   ├── generated-detection.ts # protobuf/gRPC stub/mocks를 검색·trace에서 deprioritize
│   │   └── wasm/                 # tree-sitter-wasms 그래머 번들
│   ├── resolution/
│   │   ├── index.ts              # ReferenceResolver — resolveAndPersistBatched 끝에 synthesizeCallbackEdges()
│   │   ├── callback-synthesizer.ts # 동적-디스패치 합성 (field observer + EventEmitter + closureCollectionEdges)
│   │   ├── import-resolver.ts    # path-aliases.ts (tsconfig paths + cargo workspace globs) 사용
│   │   ├── name-matcher.ts       # 이름 기반 휴리스틱 매칭
│   │   ├── go-module.ts          # go.mod 인식
│   │   ├── swift-objc-bridge.ts  # Swift↔ObjC selector/property/init 매핑
│   │   └── frameworks/           # 21개 framework resolver (express/fastapi/django/flask/laravel/rails/spring/nestjs/gin/...)
│   ├── graph/
│   │   ├── traversal.ts          # GraphTraverser — BFS/DFS, impact radius, path finding
│   │   └── queries.ts            # GraphQueryManager 상위 질의
│   ├── context/
│   │   ├── index.ts              # ContextBuilder
│   │   └── formatter.ts          # markdown / JSON 출력
│   ├── search/
│   │   ├── query-parser.ts       # FTS5 쿼리 파서
│   │   └── query-utils.ts
│   ├── sync/
│   │   ├── watcher.ts            # 네이티브 FSEvents/inotify/RDCW + debounce
│   │   ├── watch-policy.ts       # 필터 정책
│   │   ├── git-hooks.ts          # post-commit/post-checkout 보조
│   │   └── worktree.ts           # git worktree mismatch 감지
│   ├── mcp/
│   │   ├── daemon.ts             # daemon entrypoint
│   │   ├── engine.ts             # CodeGraph chain lazy load
│   │   ├── transport.ts          # MCP transport
│   │   ├── tools.ts              # 10개 도구 정의 + getExploreBudget/getExploreOutputBudget
│   │   ├── server-instructions.ts # initialize 응답 — agent 지침 SSOT
│   │   ├── session.ts
│   │   └── proxy.ts
│   ├── installer/
│   │   ├── index.ts              # install/uninstall orchestrator
│   │   ├── config-writer.ts
│   │   ├── instructions-template.ts # CODEGRAPH_START/END 마커만 export (body 제거 — issue #529)
│   │   └── targets/              # claude/cursor/codex/opencode/hermes/gemini/antigravity/kiro 8종 + registry.ts + toml.ts (hand-rolled)
│   └── ui/                       # shimmer-progress.ts, shimmer-worker.ts (CLI UI)
├── __tests__/                    # 59 vitest 파일 — installer-targets.test.ts (~47 parameterized contract tests) 등
├── scripts/                      # build-bundle.sh, pack-npm.sh, prepare-release.mjs, extract-release-notes.mjs, npm-shim.js, npm-sdk.js
├── docs/
│   ├── design/
│   │   ├── dynamic-dispatch-coverage-playbook.md   # 최상위 playbook (resolver vs synthesizer)
│   │   ├── callback-edge-synthesis.md              # 콜백 synthesizer 설계
│   │   ├── mixed-ios-and-react-native-bridging.md  # iOS/RN bridging 설계
│   │   └── adaptive-explore-sizing.md
│   ├── benchmarks/
│   │   ├── codegraph-ab-matrix.md
│   │   ├── call-sequence-analysis.md               # cache-hit이 아닌 turn 감소가 메커니즘임을 증명
│   │   └── answer-directly-vs-explore-agent.md     # main-session context scale-invariant 입증
│   ├── plans/2026-04-24-framework-resolver-extract.md
│   └── SEARCH_QUALITY_LOOP.md
├── site/                         # Astro 기반 공식 문서 사이트 (colbymchenry.github.io/codegraph/)
├── BUNDLING.md
├── CHANGELOG.md                  # Keep a Changelog + sentence-case sections (New Features / Fixes)
├── CLAUDE.md                     # 29KB — house rules, retrieval 성능 가이드, cross-platform 검증
├── install.sh / install.ps1      # Node 미설치 환경용 셸 인스톨러
└── LICENSE                       # MIT, (c) 2026 Colby Mchenry
```

### 3.2 4-layer 파이프라인

```
files
  ↓ ExtractionOrchestrator (tree-sitter, language-specific queries)
nodes + edges + files (SQLite + FTS5)
  ↓ ReferenceResolver (import-resolver + name-matcher + frameworks/*)
  ↓ callback-synthesizer (whole-graph pass at end of resolveAndPersistBatched)
GraphQueryManager / GraphTraverser (callers, callees, impact, path)
  ↓ ContextBuilder
markdown / JSON for MCP tool response
```

### 3.3 NodeKind / EdgeKind (`src/types.ts`)

추출기와 리졸버 모두 **정확히 이 문자열**을 사용해야 한다 — `src/types.ts`가 단일 진실 원천.

- **NodeKind** (22종): `file`, `module`, `class`, `struct`, `interface`, `trait`, `protocol`, `function`, `method`, `property`, `field`, `variable`, `constant`, `enum`, `enum_member`, `type_alias`, `namespace`, `parameter`, `import`, `export`, `route`, `component`.
- **EdgeKind** (12종): `contains`, `calls`, `imports`, `exports`, `extends`, `implements`, `references`, `type_of`, `returns`, `instantiates`, `overrides`, `decorates`.

### 3.4 MCP 도구 10종 (`src/mcp/tools.ts`)

| 도구 | 용도 (intent 기반) |
|---|---|
| `codegraph_search` | 이름으로 심볼 찾기 (kind/location/signature 반환) |
| `codegraph_context` | 한 영역의 task context build — search + node + callers + callees 합성 (PRIMARY) |
| `codegraph_trace` | "X→Y 흐름" 한 콜로 — hop body inline + dynamic-dispatch hop(callback/React/JSX) 자동 follow |
| `codegraph_callers` | 호출자 |
| `codegraph_callees` | 피호출자 |
| `codegraph_impact` | 변경 영향 반경 |
| `codegraph_node` | 단일 심볼 상세 (source 옵션) — container kind(class/struct/...)는 structural outline로 응답해 컨텍스트 절약 |
| `codegraph_explore` | 여러 심볼 source를 파일별로 묶어 반환 + relationship map. Adaptive output budget |
| `codegraph_files` | 인덱스된 파일 구조 |
| `codegraph_status` | 인덱스 헬스/통계, pending sync 파일 목록 |

상수: `MAX_OUTPUT_LENGTH=15000` chars, `MAX_INPUT_LENGTH=10000`, `MAX_PATH_LENGTH=4096` — 적대적 거대 입력 방어용.

### 3.5 Auto-sync 3계층

`codegraph serve --mcp`가 시작되면 다음 3계층으로 인덱스가 코드와 동기화된다:

1. **File watcher with debounced auto-sync** — 네이티브 FSEvents/inotify/ReadDirectoryChangesW가 create/modify/delete를 캐치, debounce 기본 `2000ms` (`CODEGRAPH_WATCH_DEBOUNCE_MS`, clamp `[100ms, 60s]`). 버스트 편집은 하나의 sync로 collapse.
2. **Per-file staleness banner** — debounce window 동안 MCP 도구 응답이 pending 파일을 참조하면 응답 머리에 `⚠️` 배너 prepend, "Read 직접" 지시. 응답에 안 나타나는 pending 파일은 footer로 노출. Claude Code에서 실측: "Reading the file directly for the live content" 멘트 후 Read 실행 확인.
3. **Connect-time catch-up** — MCP 서버 (재)연결 시 첫 쿼리 전에 `(size, mtime)` + content-hash reconciliation을 실행. 외부 편집(다른 에디터의 변경, `git pull`, 이전 세션 종료 후 편집)을 다음 세션 첫 도구 콜에서 흡수.

### 3.6 데이터베이스 백엔드

`src/db/sqlite-adapter.ts`는 3가지 백엔드를 우선순위로 시도:

1. **Node 22.5+ built-in `node:sqlite`** — CodeGraph가 자체 번들한 Node runtime은 이를 사용 (자동, WAL 모드). 동시 읽기는 writer를 블록하지 않음.
2. **`better-sqlite3` 네이티브** — 사용자 Node 환경에서 임베딩할 때.
3. **`node-sqlite3-wasm` 폴백** — 네이티브 빌드 실패 시 transparent fallback (slow path). `codegraph status`가 어떤 backend가 살아있는지 + journal 모드를 표시.

> `database is locked` 트러블슈팅: WAL이 활성화 안 된 파일시스템(네트워크 공유, WSL2 `/mnt`)에서 발생. 로컬 디스크로 프로젝트 이동을 권장.

### 3.7 "도구를 에이전트에 맞춰라 — 에이전트를 바꾸려 하지 마라" (설계 철학)

CodeGraph의 `CLAUDE.md`는 retrieval 성능 회귀를 막기 위한 핵심 원칙으로 다음을 못 박는다:

- **레버 = sufficiency + coverage, NOT prompting/tool descriptions.** MCP `initialize` instructions(`server-instructions.ts`)와 tool description은 *low-salience* 채널이라, 변경해도 에이전트의 tool *choice*나 query style을 안정적으로 이동시키지 못함. trace-first steering을 server-instructions에 3가지 wording variant로 포팅한 실험은 CLI `--append-system-prompt`가 달성한 것을 *재현하지 못했고* wall-clock baseline 대비 *회귀*했다. 새 도구 추가는 더 나쁨(에이전트가 거의 안 고름 — 심지어 `trace`도 under-pick).
- **무엇이 동작하는가** — "agent already calls"하는 도구로 더 많은 것을 처리하게 만들기:
  - **Sufficiency**: `codegraph_trace`가 각 hop의 body + destination의 callees를 inline해서 한 번의 trace로 flow 조사가 끝나도록.
  - **Explore-flow**: `codegraph_explore`의 query를 symbol 이름의 정밀한 bag(qualified `Class.method` 포함)로 받아, **synthesized edge를 타고 named symbol들 사이의 call path를 찾아 응답 머리에 둠** (`buildFlowFromNamedSymbols`: segment/co-naming disambiguation, ≤1 unnamed bridge로 god-function fan-out wander 방지).
- **무엇이 실패하는가** — fuzzy-input 도구에 정밀 답을 fold-in. `codegraph_context`는 description을 받지 symbol을 안 받으므로 flow의 endpoint를 disambiguate 못 해 *wrong feature*를 surface. **Precise output needs precise input.**
- **남은 레버 = coverage**. 새 dynamic-dispatch synthesizer로 static 연결되는 flow를 늘리면 explore-flow/`trace`가 자동 surface, agent 변화 불필요. 현재 frontier는 reactive/reconciler runtime(Halo `ReactiveExtensionClient`, MediatR, Vue Proxy) — 거기서는 nothing surfaces(올바름 — silent beats wrong).
- **Partial coverage is WORSE than none.** 한 boundary를 bridge하지만 다음을 안 하면 에이전트가 그 hop을 drill+Read해 마무리. **항상 end-to-end로 close하고 재측정.** Excalidraw에서 react-render만 추가하면 reads가 5–7로 *증가*; jsx-child까지 완성해야 0–1로 떨어짐.

### 3.8 Validation methodology (모든 새 언어/프레임워크 필수)

각 **language × framework**마다 **small/medium/large 실제 레포 × ≥3 flow prompt**:

1. **Canonical flow 선정** — 그 프레임워크의 정답 flow (state→render, request→handler→view, query→SQL, action→reducer→store…).
2. **Deterministic probes** (`scripts/agent-eval/probe-{trace,node,context,explore}.mjs`) — `trace(from,to)` end-to-end, no break; `select count(*) from nodes` 안정(재인덱스 전후); synthesized-edge precision spot-check (`where provenance='heuristic'`).
3. **Agent A/B** (`scripts/agent-eval/run-all.sh <repo> "<Q>"`) — with-vs-without, **≥2 runs/arm**(run-to-run 분산이 큼 — n=1 결론 금지). duration·total tool calls·Read·Grep 기록. forced-Read-0 sufficiency 증명을 위한 block-read hook 옵션.
4. **Pass bar** — normal flow 질문이 repo의 explore-call budget 내에서 **~0 Read/Grep**, without-codegraph 대비 *더 빠르고*, control repo regression 없음. `docs/design/dynamic-dispatch-coverage-playbook.md`의 coverage matrix에 수치 기록.

### 3.9 Worked example — Excalidraw (TS/React, medium 643 files)

질문: *"how does updating an element re-render the canvas on screen?"* (3개 React boundary 가로지름: observer callback, `setState`→`render`, JSX child).

| Stage | duration | Read | Grep | codegraph |
|---|---|---|---|---|
| Without codegraph | 115–139s | 9–10 | 10–11 | 0 |
| Broken (explore-budget 회귀) | 131–139s | 5–10 | 3–5 | 6–14 |
| Fixed (budget + msgs + synthesis) | 64–112s | 0–2 | 2–4 | 3–**10** |
| **+ trace-first steering** | **51–74s** | **0–2** | 0–4 | **3–4** |

검증: `trace(mutateElement, renderStaticScene)`이 **6 hops**로 3 boundary 가로지름(`mutateElement → triggerUpdate → [callback] triggerRender → [react-render] render → [jsx] StaticCanvas → renderStaticScene`), 각 hop이 source + wiring site inline. Node count 9,289 안정, **1 callback + 46 react-render + 280 jsx-render synthesized edge** (no explosion, precision-checked).

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

- **2026-05-29 Opus 4.8 재검증**: 평균 25% cheaper · 57% fewer tokens · 23% faster · 62% fewer tool calls (위 2번 표). Opus 4.7 이전 검증보다 절감폭이 *작다* — CodeGraph 회귀가 아니라 **without 암의 native baseline이 강해진** 것: Opus 4.8은 main thread에서 efficient grep/Read를 하고 거대한 Explore-subagent sweep으로 fan out 안 함.
- **Main-session context scale-invariant** (`docs/benchmarks/answer-directly-vs-explore-agent.md`, 2026-05-24 Opus, n=3, 인터랙티브 TUI):
  - Excalidraw(643): WITH cg main 49–51k, WITHOUT 26–48k (Explore agent 2/3 spawn) — WITHOUT은 reads 6–25.
  - VS Code(~10.7k, 16×): WITH cg main **47k**(Excalidraw와 동일), WITHOUT 29–54k(Explore 2/3 spawn, reads 6–26).
  - 결론: CodeGraph는 retrieval이 targeted + explore payload가 budget-capped이라 16× 큰 레포에서 main context가 *ballooning 안 함*. delegation-for-hygiene 어드밴티지는 scale에서도 marginal.
- **6/6 WITH-codegraph 런(양 레포)에서 Claude Code가 한 번도 Explore agent를 spawn 안 했다** — 메인 세션에서 직접 답함. "the Explore agents use codegraph" 통념을 반박.
- **메커니즘 = cache-hit가 아니라 turn 감소** (`docs/benchmarks/call-sequence-analysis.md`): 토큰 절감(57%)이 비용 절감(35%)보다 크게 나오는 이유는 without 암의 거대 토큰이 *대부분 cheap cache-read*이기 때문. 진짜 win은 turn 수와 누적 컨텍스트 크기.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **Reactive/reconciler runtime은 frontier.** Halo `ReactiveExtensionClient`, MediatR, Vue Proxy처럼 static edge 자체가 없는 flow는 nothing surfaces. CLAUDE.md는 이를 "silent beats wrong"이라 명시하고 의도적으로 uncovered로 둠.
- **Def-use / data-flow는 추적하지 않음.** Excalidraw의 잔여 reads/greps은 모두 `canvasNonce`(로컬 prop) 같은 nonce data-flow — 로컬 변수마다 추적하면 graph가 폭발해 의도적 미커버.
- **`provenance:'heuristic'` synthesized edge는 정밀도가 깨질 수 있다.** 그래서 모든 합성 edge는 `metadata.synthesizedBy:'<channel>'`로 채널명 태그 (예: `swift-objc-bridge`, `rn-event-channel`, `fabric-native-impl`, `expo-module-extract`) → trace/node trail/context call-paths에 inline 표시되어 에이전트가 hop의 기원을 한눈에 판단.
- **에이전트의 tool choice는 호스트 모델 개선에 의존.** CodeGraph가 직접 못 바꿈 — 새 도구는 거의 안 고름, "better examples" 시도는 회귀. Opus 4.8 → 4.9 같은 baseline 강화가 자연 reward.
- **Cross-platform 검증의 비용**: dev는 macOS, Linux는 Docker(`FROM node:22-bookworm` + `docker run --rm --init` — zombie-reaping PID 1이 process-lifecycle test에 load-bearing), Windows는 Parallels VM + SSH(`.parallels` 파일 gitignored, sshd 세션은 winget 설치 후 stale PATH를 registry에서 refresh 필요). 알려진 Windows 사전 실패: `security.test.ts > Session marker symlink resistance`(privilege 필요), `mcp-initialize.test.ts`/`mcp-roots.test.ts` afterEach `EPERM`(Windows file-locking).
- **Node 25.x hard exit** (`src/bin/node-version-check.ts`) — 호환성 이슈로 의도적 제한. `engines.node`: `>=20.0.0 <25.0.0` (CLAUDE.md는 18.0.0 명시하나 package.json은 20.0.0; 라이브러리 임베딩은 22.5+ 필요).

## 6. 관련 연구 (Related Work)

- **Karpathy LLM Wiki 패턴** — 이 wiki의 모태(`CLAUDE.md` 참조). CodeGraph는 코드용 등가물: "텍스트 corpus의 [[wikilinks]] 그래프" ↔ "코드 corpus의 symbol-edge SQLite 그래프", 둘 다 grep/Read 루프를 정제된 lookup으로 대체.
- **Garrytan Gbrain** — markdown-first agent memory MCP. CodeGraph(static code intelligence MCP)와 *동일 패턴의 sibling*: 둘 다 "agent가 read-loop 대신 MCP tool로 답을 끌어가게" 만든다. [[applications/garrytan-gbrain]] 참조.
- **Direct Corpus Interaction (DCI)** — embedding 없이 agent가 grep/bash로 raw corpus 직접 탐색하는 패러다임(이 wiki의 `wiki/database/li-2026-beyond-semantic-similarity-rethinking-retrieval`). CodeGraph는 *상보적* — DCI가 일반 텍스트 corpus에서 "agent가 직접 탐색"이라면, CodeGraph는 "agent가 직접 탐색하되 *pre-indexed graph*에 대고 — grep이 못 따라가는 dynamic dispatch까지" 라는 입장.
- **tree-sitter** — Atom/GitHub 발 incremental parser. CodeGraph 추출의 기반. WASM 그래머는 `tree-sitter-wasms` npm 패키지로 번들.
- **MCP (Model Context Protocol)** — Anthropic 표준. CodeGraph는 `stdio` transport로 `serve --mcp` 모드, `initialize` 응답에 `server-instructions.ts` 본문을 실어 보냄.
- **Compiling Agentic Workflows into LLM Weights** ([[agents/dennis-2026-compiling-agentic-workflows-into-llm]]) — LangGraph orchestration을 fine-tuned 단일 모델로 컴파일. CodeGraph는 *반대 축*: orchestration이 아니라 *retrieval/context*를 외부 인덱스로 옮겨 모델 weights/prompt를 안 건드림. "persistent structure belongs in weights"와 "persistent structure belongs in a graph"의 차이.

## 7. 용어집 (Glossary)

- **MCP (Model Context Protocol)** — Anthropic의 표준 프로토콜. 에이전트가 외부 도구·리소스를 호출하는 stdio/websocket 기반 RPC. CodeGraph는 `serve --mcp`로 stdio 서버를 띄움.
- **tree-sitter** — incremental parser, language-agnostic. 각 언어는 wasm grammar로 제공.
- **FTS5** — SQLite의 full-text search 확장. CodeGraph는 symbol name index에 사용.
- **NodeKind / EdgeKind** — `src/types.ts`에 정의된 enum. 모든 extractor/resolver가 동일 문자열을 써야 함.
- **Provenance** — edge의 출처 태그. `'heuristic'`은 dynamic-dispatch synthesizer가 만든 edge, `null`/static은 tree-sitter 직접 추출. `metadata.synthesizedBy`가 채널명을 담음.
- **Synthesizer vs Resolver** — synthesizer는 *named ref가 없는* indirect call(`cb()` 익명)을 whole-graph pass로 correlate해 edge 합성; resolver는 *named ref가 있는* attribute/descriptor 디스패치(django `_iterable_class`)를 `claimsReference` + `resolve()`로 처리. 둘 다 dynamic dispatch coverage의 두 축.
- **Closure-collection dispatch** — `coll.forEach { $0() }` 패턴. Swift Alamofire `validators`처럼 클로저를 collection에 쌓고 나중에 iterate해 invoke. element-invoke(`$0(`/`it(`) gate로 정밀도 확보.
- **god-file repo** — Excalidraw의 `App.tsx`처럼 한 파일이 415 KB 이상 차지하는 코드베이스. Adaptive explore output budget의 monotonicity invariant가 보호.
- **catch-up sync** — MCP 서버 (재)연결 시 `(size, mtime)` + content-hash reconciliation으로 외부 편집을 흡수하는 단계.
- **staleness banner** — debounce window 동안 pending 파일을 참조하면 응답 머리에 prepend되는 `⚠️` 경고. 에이전트는 그 파일만 Read하고 나머지는 CodeGraph 결과 신뢰.
- **explore budget** — `getExploreBudget(fileCount)`이 결정하는 call 수 (1–5). `getExploreOutputBudget`이 per-call chars/files/per-file 결정. tier monotonic invariant.
- **Adaptive explore** (0.9.8 신규) — `codegraph_explore`가 file count 대신 *answer* 크기에 맞춰 응답. flow path 위 메서드는 full body, off-path는 1-line signature로 collapse. `CODEGRAPH_ADAPTIVE_EXPLORE=0`로 disable.
- **CODEGRAPH_START / CODEGRAPH_END** — `instructions-template.ts`가 export하는 두 마커. 0.9.7부터 strip-only — installer가 기존 instructions block을 *제거*만 함(중복 instructions issue #529).
- **provenance:'heuristic' 태그 채널명** — `swift-objc-bridge`, `rn-event-channel`, `fabric-native-impl`, `expo-module-extract`, `callback`, `event-emitter`, `react-render`, `jsx-render`, `closure-collection`, `django-orm`.
