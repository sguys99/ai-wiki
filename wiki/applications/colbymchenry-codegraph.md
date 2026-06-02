---
title: "colbymchenry/codegraph"
type: repo
year: 2026
category: applications
raw_path: /Users/kmyu/Desktop/project/ai-wiki/raw/repos/colbymchenry-codegraph
raw_filename: "colbymchenry-codegraph/"
source: colbymchenry-codegraph.md
source_collection: external
tags: [code-intelligence, knowledge-graph, mcp, tree-sitter, sqlite, fts5, claude-code, cursor, codex, opencode, gemini-cli, dynamic-dispatch, callback-synthesizer, static-analysis, multi-language, agent-tooling]
org: "colbymchenry"
repo: "codegraph"
url: "https://github.com/colbymchenry/codegraph"
license: "MIT"
version: "0.9.8 (cloned 2026-06-02)"
---

## 요약 (Summary)

**CodeGraph**는 tree-sitter로 20+ 언어의 코드를 정적 추출해 symbol·edge·file을 **SQLite + FTS5 knowledge graph**로 저장하고, **MCP 서버**를 통해 Claude Code · Cursor · Codex CLI · opencode · Hermes Agent · Gemini CLI · Antigravity IDE · Kiro 8종 코딩 에이전트에게 `search · context · trace · callers · callees · impact · node · explore · files · status` 10개 도구로 노출하는 **로컬-퍼스트 코드 인텔리전스 라이브러리·CLI·MCP 서버**(MIT, Colby Mchenry, npm `@colbymchenry/codegraph` v0.9.8)다.

공식 벤치마크(7 OSS repo × Opus 4.8 headless × n=4 median, 2026-05-29 재검증)는 평균 **25% cheaper · 57% fewer tokens · 23% faster · 62% fewer tool calls**, 그리고 같은 팀의 인터랙티브 A/B(2026-05-24, n=3)는 **main-session context가 16× 큰 레포에서도 ~47k로 scale-invariant**임을 보고한다. 100% 로컬 — API key·외부 호출·임베딩·LLM 요약 없음, Node 자체 번들이라 사용자 Node 설치도 불필요.

같은 wiki의 [[applications/garrytan-gbrain|Garrytan Gbrain]](markdown-first agent memory MCP)과 **같은 패턴의 sibling**: 둘 다 "에이전트가 read-loop 대신 MCP 도구로 답을 끌어가게" 만드는 *agent-consumed MCP server*. Gbrain은 markdown 지식, CodeGraph는 코드 그래프.

## 주요 기여 (Key Contributions)

1. **로컬-퍼스트 code-intelligence MCP 서버.** Anthropic 외부 호출·임베딩 없이 tree-sitter + SQLite WAL + FTS5만으로 코딩 에이전트가 "이 함수가 어디서 호출되는가 / 변경의 영향 반경 / X에서 Y로 도달하는 경로" 같은 **구조·플로우 질문**을 grep/Read 루프 없이 답한다. `node_modules`·`vendor`·`dist`·`.gitignore` 자동 제외, 1 MB 초과 파일 스킵.

2. **20+ 언어 트리시터 추출.** TS/JS/Python/Go/Rust/Java/C#/PHP/Ruby/C/C++/Objective-C/Swift/Kotlin/Scala/Dart/Lua/Luau/Svelte/Vue/Liquid/Pascal·Delphi. `src/extraction/languages/`에 19개 언어 파일. WASM 그래머는 `src/extraction/wasm/`. 무거운 파싱은 `parse-worker.ts`로 off-main-thread.

3. **14+ 웹 프레임워크 route → handler 매핑.** `src/resolution/frameworks/`에 Django(`path/re_path/include` + CBV), Flask, FastAPI, Express, NestJS(`@Controller`+`@Get/@Post`, GraphQL `@Resolver`, `@MessagePattern`, `@SubscribeMessage`), Laravel, Drupal(`*.routing.yml` + `hook_*`), Rails, Spring, Gin/chi/gorilla/mux, Axum/actix/Rocket, ASP.NET, Vapor, React Router, SvelteKit, Vue/Nuxt, Cargo workspaces. `route` 노드 + `references` edge로 URL pattern ↔ handler 연결.

4. **Dynamic-dispatch synthesis — flow가 graph에 end-to-end로 존재.** Static tree-sitter는 콜백·옵저버·EventEmitter·React re-render 같은 indirect call을 놓치기 때문에 flow가 끊겨 agent가 grep/Read로 복원해야 한다. `src/resolution/callback-synthesizer.ts`가 **whole-graph pass**로 다음 채널을 합성한다 (모두 `provenance:'heuristic'` + `metadata.synthesizedBy:<channel>` 태그):
   - **Field observer**: `Scene.onUpdate(cb)` + `for(cb of cbs) cb()` → `triggerUpdate → triggerRender`
   - **EventEmitter**: `on('e', fn)` ↔ `emit('e')`
   - **React re-render**: `setState` → `render`
   - **JSX child**: parent `render` → child component
   - **Swift closure-collection dispatch** (Alamofire): `validators.write{$0.append(v)}` ↔ `validators.forEach{$0()}` — element-invoke 게이트로 precision
   - **Django ORM descriptor** (named attribute는 resolver): `self._iterable_class(self)` → `ModelIterable.__iter__`

5. **Mixed iOS / React Native / Expo bridging.** Swift↔ObjC 자동 브리징(`@objc` exposure, selector 매핑, Cocoa preposition prefix), RN legacy bridge(`NativeModules.X.fn` ↔ `RCT_EXPORT_METHOD`/`@ReactMethod`), RN TurboModules(Codegen `Native<X>.ts` spec ground truth), RN native→JS events(`sendEventWithName` ↔ `NativeEventEmitter.addListener`), Expo Modules(`Module { Name("X"); AsyncFunction("fn"){...} }`), Fabric/Paper view components(JSX ↔ `RCT_EXPORT_VIEW_PROPERTY`/`@ReactProp`). small/medium/large 실측: Charts·realm-swift·Wikipedia-iOS · AsyncStorage·react-native-svg·react-native-firebase · expo-haptics·expo-camera·expo SDK 7-package sweep 등.

6. **Adaptive explore budget.** `getExploreBudget(fileCount)`: `<500→1, <5000→2, <15000→3, <25000→4, ≥25000→5`. `getExploreOutputBudget`이 per-call chars/files/per-file을 함께 키우며 **"larger tier must never get smaller `maxCharsPerFile` than a smaller tier"** invariant로 god-file repo(Excalidraw `App.tsx` 415 KB)에서 explore가 file의 <1%만 반환해 Read 폴백을 유발하는 회귀 차단.

7. **다중 에이전트 인스톨러 — 한 파일로 새 agent 추가.** `src/installer/targets/`에 `claude.ts`·`cursor.ts`·`codex.ts`·`opencode.ts`·`hermes.ts`·`gemini.ts`·`antigravity.ts`·`kiro.ts`. 각 타깃은 자체 config 위치 + JSON/TOML/JSONC writer 소유. opencode `.jsonc`는 `jsonc-parser` surgical edit(사용자 주석 유지), Codex TOML은 hand-rolled serializer(sibling table·`[[array_of_tables]]` 보존). 0.9.7부터 `<!-- CODEGRAPH_START -->`/`<!-- CODEGRAPH_END -->` 마커는 **strip-only**(server-instructions가 instructions의 SSOT — issue #529).

8. **벤치마크 (2026-05-29 Opus 4.8 재검증, n=4 median).**

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

## 방법론 및 아키텍처 (Methodology and Architecture)

### 4-layer 파이프라인

```
files
  ↓ ExtractionOrchestrator (tree-sitter)
nodes + edges + files  (SQLite WAL + FTS5)
  ↓ ReferenceResolver (import + name-matcher + frameworks/*)
  ↓ callback-synthesizer (whole-graph pass, resolveAndPersistBatched 끝)
GraphQueryManager / GraphTraverser
  ↓ ContextBuilder (markdown / JSON)
MCP tool response
```

`src/index.ts`의 `CodeGraph` 클래스가 모든 layer를 wire하고 public API(`init`/`open`/`indexAll`/`sync`/`searchNodes`/`getCallers`/`getCallees`/`getImpactRadius`/`buildContext`/`watch`/`unwatch`/`close`)를 노출. 라이브러리 임베딩(Electron 등)은 사용자 runtime이라 Node 22.5+ 필요(built-in `node:sqlite`). CLI/MCP는 자체 번들 runtime이라 어디서나 동작.

### NodeKind / EdgeKind (`src/types.ts`)

추출기·리졸버 모두 정확히 이 문자열을 써야 함 (단일 진실 원천):

- **NodeKind (22)**: `file`, `module`, `class`, `struct`, `interface`, `trait`, `protocol`, `function`, `method`, `property`, `field`, `variable`, `constant`, `enum`, `enum_member`, `type_alias`, `namespace`, `parameter`, `import`, `export`, `route`, `component`.
- **EdgeKind (12)**: `contains`, `calls`, `imports`, `exports`, `extends`, `implements`, `references`, `type_of`, `returns`, `instantiates`, `overrides`, `decorates`.

### MCP 도구 10종 — intent 기반 선택

| 도구 | 용도 |
|---|---|
| `codegraph_search` | 이름으로 심볼 찾기 (kind/location/signature) |
| `codegraph_context` | 한 영역의 task context build — search+node+callers+callees 합성 (PRIMARY) |
| `codegraph_trace` | "X→Y 흐름" 한 콜 — hop body inline + dynamic-dispatch hop(callback/React/JSX) 자동 follow |
| `codegraph_callers` | 호출자 |
| `codegraph_callees` | 피호출자 |
| `codegraph_impact` | 변경 영향 반경 |
| `codegraph_node` | 단일 심볼 상세 (container kind는 structural outline로 절약) |
| `codegraph_explore` | 여러 심볼 source를 파일별로 묶어 반환 + relationship map. Adaptive output budget |
| `codegraph_files` | 인덱스된 파일 구조 |
| `codegraph_status` | 인덱스 헬스/통계, pending sync 목록 |

방어 상수: `MAX_OUTPUT_LENGTH=15000` / `MAX_INPUT_LENGTH=10000` / `MAX_PATH_LENGTH=4096`.

### Auto-sync 3계층

1. **File watcher with debounced auto-sync** — 네이티브 FSEvents/inotify/RDCW + debounce `2000ms`(env `CODEGRAPH_WATCH_DEBOUNCE_MS`, clamp `[100ms, 60s]`). 버스트 편집은 하나의 sync로 collapse.
2. **Per-file staleness banner** — debounce window 동안 MCP 응답이 pending 파일 참조하면 `⚠️` 배너 prepend, "Read 직접" 지시. 응답에 없는 pending은 footer. Claude Code에서 "Reading the file directly for the live content" 실측.
3. **Connect-time catch-up** — (재)연결 시 첫 쿼리 전에 `(size, mtime)` + content-hash reconciliation. 외부 편집(다른 에디터, `git pull`, 이전 세션) 흡수.

### "도구를 에이전트에 맞춰라" — 설계 철학

CodeGraph의 `CLAUDE.md`는 retrieval 회귀 방지를 위해 다음을 못 박는다:

- **레버 = sufficiency + coverage, NOT prompting.** `server-instructions.ts`와 tool description은 *low-salience* — 변경해도 에이전트의 tool *choice*나 query style을 안정적으로 이동시키지 못함. trace-first steering 3 wording variant 실험은 CLI `--append-system-prompt`가 달성한 것을 *재현 못 했고* baseline 대비 *회귀*. 새 도구 추가는 더 나쁨(under-pick).
- **무엇이 동작 (해야 함)**: agent가 이미 호출하는 도구로 더 처리하기. `codegraph_trace`가 각 hop body + destination callees를 inline해 1콜로 끝나도록 (*sufficiency*); `codegraph_explore`의 query를 symbol 이름의 정밀한 bag(qualified `Class.method`)으로 받아 synthesized edge를 타고 call path를 응답 머리에 두기 (`buildFlowFromNamedSymbols`, ≤1 unnamed bridge로 god-function wander 방지 — *explore-flow*).
- **무엇이 실패**: fuzzy-input 도구(`codegraph_context`)에 정밀 답을 fold-in. **Precise output needs precise input.**
- **남은 레버 = coverage**. 새 synthesizer로 정적 연결되는 flow를 늘리면 explore-flow/`trace`가 자동 surface. 현재 frontier는 reactive/reconciler runtime(Halo `ReactiveExtensionClient`, MediatR, Vue Proxy) — 거기서는 *silent beats wrong*.
- **Partial coverage is WORSE than none.** 한 boundary만 bridge하면 그 hop을 drill+Read해 마무리 — Excalidraw에서 react-render만 추가하면 reads가 5–7로 *증가*; jsx-child까지 close해야 0–1로 떨어짐.

### Validation methodology (새 언어/프레임워크 필수)

각 language × framework × small/medium/large × ≥3 prompt:

1. Canonical flow 선정(state→render, request→handler→view, query→SQL, action→reducer→store…).
2. Deterministic probes (`scripts/agent-eval/probe-{trace,node,context,explore}.mjs`): `trace(from,to)` no break, node count 안정, synthesized-edge precision spot-check.
3. Agent A/B (`scripts/agent-eval/run-all.sh`): with-vs-without, **≥2 runs/arm** (n=1 결론 금지), duration·tool calls·Read·Grep 기록.
4. Pass bar: explore-budget 내에서 ~0 Read/Grep, without 대비 더 빠름, control repo 회귀 없음. `docs/design/dynamic-dispatch-coverage-playbook.md` matrix에 수치 기록.

### Worked example — Excalidraw (TS/React, medium 643 files)

질문: *"how does updating an element re-render the canvas on screen?"* (3 React boundary).

| Stage | duration | Read | Grep | codegraph |
|---|---|---|---|---|
| Without codegraph | 115–139s | 9–10 | 10–11 | 0 |
| Broken (explore-budget 회귀) | 131–139s | 5–10 | 3–5 | 6–14 |
| Fixed (budget + msgs + synthesis) | 64–112s | 0–2 | 2–4 | 3–10 |
| **+ trace-first steering** | **51–74s** | **0–2** | 0–4 | **3–4** |

`trace(mutateElement, renderStaticScene)`이 **6 hops**로 `mutateElement → triggerUpdate → [callback] triggerRender → [react-render] render → [jsx] StaticCanvas → renderStaticScene`. Node count 9,289 안정, **1 callback + 46 react-render + 280 jsx-render synthesized edge** (no explosion, precision-checked).

## 결과 (Results)

- **공식 7-repo 벤치마크 평균 25% cheaper · 57% fewer tokens · 23% faster · 62% fewer tool calls.** Opus 4.8 native baseline이 4.7보다 강해진 만큼 절감폭은 *작아진* 것이지 CodeGraph 회귀 아님 — 4.8은 main thread에서 efficient grep/Read를 하고 거대 Explore-subagent fan-out을 안 함.

- **Main-session context scale-invariant.** Excalidraw(643)와 VS Code(~10.7k, 16×)에서 WITH-cg main context 둘 다 ~47–51k. retrieval이 targeted + explore가 budget-capped이라 ballooning 없음. WITHOUT은 Excalidraw 26–48k, VS Code 29–54k이지만 reads 6–26 + Explore agent spawn 2/3.

- **WITH-codegraph 6/6 runs에서 Claude Code가 Explore agent를 한 번도 spawn 안 했다.** "Explore agents use codegraph" 통념을 반박. 메인 세션 직접 답이 모든 스케일에서 승.

- **메커니즘 = turn 감소이지 cache-hit이 아님.** 토큰 절감(57%)이 비용 절감(35%)보다 크게 보이는 이유는 without 거대 토큰이 *대부분 cheap cache-read*이기 때문. 진짜 win은 turn 수와 누적 컨텍스트.

- **버전 0.9.8(2026-06-01)** 신규: `codegraph init`이 기본 `-i` 인덱스 빌드(#483); Go Gin middleware chain end-to-end trace; Swift deferred-validation flow(Alamofire 패턴) end-to-end; `codegraph_explore` *answer*-sized(이전 file count 기반에서 변경, god-file repo 한 응답에 모든 phase 보존); embedded library 모드 복원(`require`/`import` 둘 다 `CodeGraph` 클래스 + `DatabaseConnection`·`QueryBuilder`·`initGrammars`·`FileLock` building block resolve, #354).

## 관련 페이지 (Related Pages)

- [[applications/garrytan-gbrain]] — markdown-first agent memory MCP. CodeGraph와 *같은 패턴의 sibling*: 둘 다 "에이전트가 read-loop 대신 MCP 도구로 답을 끌어가게" 만드는 agent-consumed MCP server. Gbrain은 markdown 지식 corpus, CodeGraph는 코드 graph.
- [[database/li-2026-beyond-semantic-similarity-rethinking-retrieval]] — Direct Corpus Interaction (DCI). embedding 없이 agent가 grep/bash로 raw corpus 직접 탐색. CodeGraph는 *상보적* — agent가 직접 탐색하되 *pre-indexed graph*에 대고 (grep이 못 따라가는 dynamic dispatch까지).
- [[agents/dennis-2026-compiling-agentic-workflows-into-llm]] — agentic workflow를 모델 weights로 컴파일. CodeGraph는 *반대 축*: orchestration이 아니라 *retrieval/context*를 외부 인덱스로 옮겨 weights/prompt를 안 건드림. "persistent structure belongs in weights" vs "persistent structure belongs in a graph".
- [[agents/lee-hoyeon-2026-harness-engineering]] — Harness Engineering deck. CodeGraph는 harness 6축(구조 → 맥락 → 계획 → 실행 → 검증 → 개선) 중 **맥락(context)** 축을 코드용으로 채우는 도구.
