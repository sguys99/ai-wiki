---
title: "graphify (Safi Shamsi) — Any input → knowledge graph + /graphify skill across 21+ AI assistants"
type: repo
year: 2026
category: applications
raw_path: raw/repos/safishamsi-graphify.md
raw_filename: "safishamsi-graphify.md"
source_collection: external
source: safishamsi-graphify.md
org: "safishamsi"
repo: "graphify"
url: "https://github.com/safishamsi/graphify"
license: "MIT"
tags: [knowledge-graph, code-knowledge-graph, agent-skill, claude-code, codex, cursor, mcp, tree-sitter, leiden, graphrag, repo, oss, yc-s26]
---

## 요약 (Summary)

**Safi Shamsi/graphify**(PyPI `graphifyy`, MIT, Y Combinator S26, 0.8.28 @ 2026-06-01)는 임의의 폴더(코드 33언어 + 문서 + PDF + 이미지 + 비디오)를 **deterministic AST(tree-sitter) + LLM semantic + Leiden community detection**의 3-pass 파이프라인으로 단일 NetworkX 그래프(`graph.json` + interactive `graph.html` + plain-language `GRAPH_REPORT.md`)로 컴파일한다. 동일한 `/graphify .` 명령이 Claude Code · Codex · OpenCode · Kilo · Cursor · Gemini CLI · GitHub Copilot · Aider · Amp · OpenClaw · Factory Droid · Trae · Hermes · Kimi Code · Kiro · Pi · Devin · Google Antigravity 등 **21+ AI 어시스턴트**에서 동작하며, 각 플랫폼별 hook/persistent instruction이 자동 설치되어 *"grep 대신 그래프 query를 먼저 시도"*하도록 어시스턴트를 유도한다. 출력은 confidence label(`EXTRACTED`/`INFERRED`(0.55–0.95)/`AMBIGUOUS`)로 *발견된 사실 vs 추론된 사실*을 항상 구분한다. Mixed corpus(Karpathy repos + 5 papers + 4 images, 52 파일)에서 query당 **71.5× 토큰 절감** 자체 측정. 같은 회사의 next-step 제품 [Penpax](https://graphifylabs.ai)는 이 그래프 엔진을 meetings·browser·emails·files·code의 always-on 레이어로 확장한다.

## 주요 기여 (Key Contributions)

1. **단일 `/graphify` 스킬 = 21+ AI 어시스턴트**: `graphify install --platform <X>`가 플랫폼별 스킬·hook·persistent instruction을 자동 배포. Claude Code는 `CLAUDE.md` + PreToolUse hook, Codex는 `AGENTS.md` + `.codex/hooks.json`, Cursor는 `.cursor/rules/graphify.mdc` `alwaysApply:true`, Kilo는 native `.kilo` plugin (`tool.execute.before`). 모든 경로가 같은 메시지 — *search-style tool call 직전에 그래프 query를 먼저 시도하도록 어시스턴트에 nudge*.
2. **3-Pass cost-aware 추출**: Pass 1 (free) tree-sitter AST, 코드 33언어 + SQL 결정적 추출 / Pass 2 (local, free) `faster-whisper` 비디오·오디오 (전사 prompt가 *지금까지의 god node*로 seed) / Pass 3 (paid) Claude/Gemini/Kimi/OpenAI/DeepSeek/Bedrock/Ollama/`claude-cli` 서브에이전트가 문서·PDF·이미지·transcript 병렬 처리. **코드 only corpus는 Pass 3 자체가 스킵되어 LLM 비용 0**.
3. **Confidence 등급 + INFERRED rubric**: `EXTRACTED`(1.0, import/call 명시) · `INFERRED`(0.95 near-certain → 0.55 speculative 5단계 discrete rubric) · `AMBIGUOUS`(GRAPH_REPORT.md에 human review 플래그). 어떤 엣지가 *발견*이고 어떤 엣지가 *추론*인지를 사용자가 항상 알게 만드는 hallucination 방지 설계.
4. **Embedding-free graph RAG**: Leiden community detection으로 god node + community 구조 생성. 별도 vector DB·embedding 단계 없음 — Claude가 추출한 `semantically_similar_to` 엣지가 이미 그래프에 있어 그래프 구조 자체가 similarity signal. `--resolution` granularity, `--exclude-hubs 99`로 utility super-hub 배제 가능.
5. **3개 출력 + 다중 export**: 단일 빌드에서 (i) `graph.html`(브라우저 클릭·필터·검색), (ii) `GRAPH_REPORT.md`(god nodes + surprising connections + "why" 노드 + suggested 4–5 questions), (iii) `graph.json`(NetworkX node-link, 재사용). 추가로 Obsidian vault, GraphML(Gephi/yEd), Neo4j cypher + `--neo4j-push bolt://...`, SVG, `--wiki`(community별 markdown article + index.md), `graphify export callflow-html`(Mermaid 아키텍처 다이어그램).
6. **Cross-repo "global graph"**: `graphify clone <github-url>` + `graphify merge-graphs` + `graphify global add ... myrepo`로 여러 프로젝트 그래프를 `~/.graphify/global.json`에 등록. 노드의 `repo` 속성으로 origin별 필터링. monorepo는 각 sub-path별 `graphify extract`로 따로 빌드 후 merge.
7. **PR triage + impact 분석**: `graphify prs`는 CI · review · worktree 매핑 + **graph impact**까지 한 화면. `--triage`로 AI ranking(backend 자동 검출), `--conflicts`로 동일 graph community에 변경이 몰린 PR을 사전 경고 → merge order 위험 가시화. `--worktrees`로 worktree → branch → PR.
8. **운영 grade 부속**: SHA256 content-hash 캐시(0-cost 미변경 스킵), `ProcessPoolExecutor` 코드 추출 1.66× 단축, git post-commit + post-checkout hook(`graphify hook install`, AST-only 재빌드 + **graph.json union merge driver**로 두 dev 동시 commit conflict 자동 해소), `graphify watch ./src`, MCP stdio 서버(`python -m graphify.serve` → `query_graph`/`get_node`/`get_neighbors`/`shortest_path`/`list_prs`/`get_pr_impact`/`triage_prs`).
9. **결정성 (determinism) 의도적 보장**: `detect()`가 `os.walk`를 lexicographic sort(#1090) → first-writer-wins node ID 안정 → Leiden community 개수 동일. community ID도 `(-size, sorted node IDs)` total order(#1090 follow-up)로 reproducible diff 가능. `graphify-out/`을 git commit해 팀 워크플로에 자연스럽게 녹임.
10. **`worked/` 디렉토리 = 정직한 평가 패턴**: 저자가 실제 corpus 5개(`example`, `httpx`, `karpathy-repos`, `mixed-corpus`, `rsl-siege-manager`)에 graphify를 돌리고 `review.md`에 *"무엇이 맞고 무엇이 틀렸는지"* 적어둠. 외부 기여자에게도 "real corpus + honest review"가 최우선 contribution이라고 명시.

## 방법론 및 아키텍처 (Methodology and Architecture)

### 7-단계 단방향 파이프라인 (ARCHITECTURE.md)

```
detect()  →  extract()  →  build_graph()  →  cluster()  →  analyze()  →  report()  →  export()
```

각 단계가 자기 모듈의 단일 함수. plain dict + `nx.Graph`로만 통신. side effect는 `graphify-out/` 안에만.

```
[Files]
   ↓ detect.collect_files() — 확장자 + .graphifyignore + lexicographic sort
[Path[]]
   ↓ extract.extract() — dispatch by suffix
  ├─ Code 33언어            → tree-sitter AST + INFERRED call graph
  ├─ Docs / PDF / Image     → LLM 서브에이전트 (Claude/Gemini/...)
  └─ Video / Audio          → faster-whisper transcript (seed = god nodes) → docs 경로
[{nodes, edges, hyperedges?}, ...]
   ↓ validate.validate_extraction()  — JSON 스키마 강제
   ↓ build.build_graph()             — nx.Graph로 머지
   ↓ cluster.cluster()               — Leiden algorithm
   ↓ analyze.analyze()               — god_nodes + surprising_connections + suggest_questions
   ↓ report.render_report()          → GRAPH_REPORT.md
   ↓ export                          → graph.json + graph.html + [vault/] + [wiki/]
graphify-out/
```

### 출력 스키마 (`validate.py`가 강제)

```json
{
  "nodes": [{"id": "...", "label": "...", "source_file": "...", "source_location": "L42"}],
  "edges": [{"source": "id_a", "target": "id_b", "relation": "calls|imports|uses|...",
             "confidence": "EXTRACTED|INFERRED|AMBIGUOUS", "confidence_score": 0.85,
             "source_file": "..."}]
}
```

Hyperedge(3+ 노드 group relation)는 `G.graph["hyperedges"]`. NetworkX node-link가 최종 직렬화.

### 핵심 모듈 (`graphify/`, 32 파일 / 약 31K LoC)

| 모듈 | 역할 |
|---|---|
| `detect.py` | `collect_files` + `.graphifyignore`. lexicographic sort로 결정성 보장 (#1090) |
| `extract.py` | 언어별 dispatch. 새 언어는 `extract_<lang>(path)` + suffix 등록 + tree-sitter dep |
| `symbol_resolution.py` (538) | cross-file symbol resolution (JS/TS import, Python `from … import`, Lua `require` dot→path 등) |
| `build.py` | extraction list → `nx.Graph` |
| `cluster.py` | Leiden community + `--resolution` + `--exclude-hubs` |
| `analyze.py` | `god_nodes`, `surprising_connections`(cross-community + cross-language family), `suggest_questions` |
| `report.py` | `GRAPH_REPORT.md` + `find_import_cycles`(Johnson's algorithm) |
| `export.py` + `wiki.py`(282) + `callflow_html.py` + `tree_html.py`(582) | JSON / HTML / SVG / Obsidian canvas / wiki article / Mermaid 다이어그램 |
| `serve.py` (993) | **MCP stdio 서버**. 7 tool 노출 |
| `mcp_ingest.py` | `.mcp.json` 등 → 서버 노드 + 패키지 ref + env var 요구 |
| `transcribe.py` (184) | `faster-whisper` (god-node seed) |
| `ingest.py` | `/graphify add <url>` — paper PDF / YouTube / 일반 URL |
| `cache.py` | SHA256 content hash 캐시 |
| `security.py` (336) | URL whitelist + file:// 차단 + size/timeout cap + 그래프 경로 jail + label sanitize |
| `validate.py` (72) | extraction JSON 스키마 |
| `dedup.py`, `semantic_cleanup.py`(319) | 중복/정리 (`--dedup-llm`) |
| `watch.py` (883), `hooks.py` | 파일 watch + git hook + graph.json union merge driver (#1059) |
| `prs.py`, `affected.py` | PR triage + community 영향 |
| `manifest.py`, `global_graph.py`, `multigraph_compat.py` | incremental + cross-repo + DiGraph/MultiGraph |
| `google_workspace.py` | `.gdoc`/`.gsheet`/`.gslides` `gws` 경유 |
| `llm.py` | backend abstraction + custom OpenAI-호환 provider (`~/.graphify/providers.json`, #1084) |

### 자주 쓰는 명령

```bash
/graphify .                               # 전체 파이프라인
/graphify <path> --update                  # 변경 파일만 incremental
/graphify <path> --cluster-only --resolution 1.5
/graphify <path> --wiki                    # community별 markdown wiki
/graphify <path> --watch                   # 자동 재빌드
/graphify <path> --mcp                     # MCP stdio 서버

/graphify add https://arxiv.org/abs/1706.03762
/graphify query "what connects auth to the database?"
/graphify path "UserService" "DatabasePool"
/graphify explain "RateLimiter"

graphify clone https://github.com/karpathy/nanoGPT
graphify merge-graphs a.json b.json --out merged.json
graphify global add graphify-out/graph.json myrepo

graphify prs --triage      # AI ranking
graphify prs --conflicts   # 동일 community 변경 PR

graphify hook install      # post-commit 재빌드 + union merge driver
graphify export callflow-html
graphify extract ./docs --backend ollama   # data residency = 로컬
```

### 지원 입력

| Type | 확장자 / 비고 |
|---|---|
| **Code (33)** | `.py .ts .js .jsx .tsx .mjs .go .rs .java .c .cpp .h .hpp .rb .cs .kt .scala .php .swift .lua .luau .zig .ps1 .ex .exs .m .mm .jl .vue .svelte .astro .groovy .gradle .dart .v .sv .svh .sql .f .f90 .f95 .pas .pp .dpr .lpr .sh .bash .json .dm .dme .razor .cshtml ...` (BYOND DreamMaker는 #1104부터 `[dm]` 옵셔널) |
| **MCP configs** | `.mcp.json`, `claude_desktop_config.json` 등 — 서버 노드 + 패키지 ref + env var |
| **Docs / PDF / Image / Office / Google Workspace / Video** | `.md .pdf .docx .xlsx .gdoc .gsheet .png .mp4 .mp3 ...` (extras 별도) |

## 결과 (Results)

### 토큰 절감 (저자 측정, `worked/`로 재현 가능)

| Corpus | 파일 | query당 절감 |
|---|---:|---:|
| **Karpathy repos + 5 papers + 4 images (mixed)** | 52 | **71.5×** |
| graphify source + Transformer paper | 4 | 5.4× |
| httpx (synthetic Python library) | 6 | ~1× |

저자 해석: *"6 파일은 이미 context window에 들어가므로 그래프 가치는 압축이 아니라 구조적 명료성. 52 파일에서 절감이 복리(compound)된다."*

### 성능 / 결정성

- **Parallel AST**: 84 코드 파일에서 sequential 대비 ~**1.66×** (Python GIL bypass via `ProcessPoolExecutor`).
- **SHA256 캐시**: 미변경 파일 0-cost 스킵.
- **Determinism**: 동일 corpus → 동일 `graph.json` (lexicographic sort + total-order community ID).

### 운영 / 커뮤니티

- **활발한 개발**: 0.8.25 → 0.8.28 (4일, 2026-05-29 ~ 2026-06-01) **약 25 PR 머지**. JS arrow callback phantom god-node, Markdown fenced block orphan, `pnpm-workspace.yaml` IndexError, anchored `.graphifyignore` 매칭, Windows Unicode 등 *thin edge case 정밀화 단계*.
- **Y Combinator S26 + 책** *The Memory Layer* (Gumroad). 단순 OSS가 아닌 회사 제품 라인의 핵심 인프라.
- **32+ 언어 README** (한국어 포함).
- **73 pytest 파일** (모듈당 ~1개). 모두 pure unit, 네트워크 없음, fs side effect는 `tmp_path`.

### Privacy / Data residency

- 코드 100% 로컬 (tree-sitter), 비디오/오디오 100% 로컬 (faster-whisper).
- 문서/PDF/이미지만 LLM 호출 — IDE 세션 모델 또는 사용자 backend.
- `--backend ollama`(전부 로컬) 또는 `--backend bedrock`(AWS IAM, API key 불필요).
- **No telemetry, no usage tracking, no analytics**.

## 관련 페이지 (Related Pages)

- [[applications/shamsi-2026-graphify-knowledge-graphs-for-ai|Graphify — Knowledge Graphs for AI Coding Assistants (graphify.net/kr 랜딩 페이지)]] — 같은 프로젝트의 **공식 한국어 랜딩 페이지**(article 타입). 본 repo 페이지가 모듈·언어·플랫폼 매트릭스를 망라하는 반면, 랜딩 페이지는 71.5× 토큰 절감의 마케팅 서사와 핵심 capability 6종을 압축해 보여 준다. 도구 소개·온보딩 용도로는 랜딩 페이지, 코드 단위 깊이가 필요할 땐 본 페이지.
- [[applications/garrytan-gbrain|garrytan/gbrain (repo)]] — **가장 가까운 비교군**. 둘 다 *"agent memory = markdown source of truth + 자동 빌드 KG + git-driven workflow"* 패러다임. **차이**: GBrain은 개인 knowledge brain(43 skill pack + Minions durable queue + dream cycle) 중심, graphify는 *코드 + 임의 corpus의 knowledge graph 빌더*에 33 언어 AST + 21 IDE 통합 + PR triage로 폭이 넓다. 같은 패턴의 두 직교 제품.
- [[applications/liu-2026-rag-llm-wiki-or-gbrain|RAG, LLM Wiki, or GBrain? (Liu, Medium)]] — Liu의 3-축 분류(retrieve/compile/act)에서 graphify는 **retrieve(graph) + compile(`GRAPH_REPORT.md`/`--wiki`)** 결합 + **act는 IDE 통합으로 위임**. 2026 convergence 예측("retrieve + compile + act가 단일 knowledge OS로")의 한 구체예.
- [[applications/vectorize-2026-gbrain-review-honest-assessment|GBrain Honest Assessment (Vectorize)]] — GBrain용 10-dim scorecard. graphify에도 적용 가능 — multi-language·multi-IDE 폭은 graphify가 우월하지만 *dream cycle* 같은 능동 compounding 메커니즘은 약함.
- [[applications/gajjar-2026-gbrain-vs-computer-memory|GBrain vs DevRev Computer Memory]] — "memory that compounds beats memory that just retrieves" 명제. graphify 또한 *반복 query에서* 토큰 절감이 복리로 쌓이는 구조.
- [[database/li-2026-beyond-semantic-similarity-rethinking-retrieval|DCI — Direct Corpus Interaction]] — **graphify의 정확한 반대 명제**. DCI는 *embedding/index 없이 agent가 grep으로 raw corpus 직접 검색*하자고 주장. graphify는 *"grep 대신 query"* 슬로건. corpus 크기·도메인·agent 능력에 따른 trade-off가 흥미로움(코드만 있는 작은 repo는 DCI가 유리, mixed 52-파일 corpus는 graphify가 71.5× 우위).
- [[database/guo-2025-lightrag-simple-and-fast|LightRAG]] — graph-based RAG의 핵심 ancestor. dual-level keyword retrieval은 graphify에 없지만 community-based traversal은 유사 정신.
- [[database/hkuds-rag-anything|HKUDS/RAG-Anything (repo)]] — multimodal RAG (이미지 + 표 + 수식의 modality별 entity extraction). graphify도 이미지/비디오를 다루지만 *modality별 entity extraction* 정교함은 RAG-Anything이 우위.
- [[overviews/lightrag-family-graph-rag-overview|LightRAG 계열 Graph-based RAG]] — graphify는 이 계열의 **제품화 + agent-skill 축** 확장으로 위치 지을 수 있음. LightRAG·LeanRAG가 *연구 알고리즘*, RAG-Anything이 *modality 확장*이라면, graphify는 *AI 어시스턴트 통합 + 코드 도메인* 확장.
- [[overviews/gbrain-ecosystem-overview|GBrain 생태계]] — agent memory 제품 계보(Karpathy LLM Wiki gist + Bush memex). graphify는 같은 계보의 *코드/임의 corpus 축* 형제 제품. ai-wiki 본 프로젝트 자체가 Karpathy gist 출발이며 graphify `--wiki` 모드는 *그 위키를 자동 빌드해주는 도구*에 해당.
