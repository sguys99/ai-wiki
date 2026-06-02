---
title: "graphify: any input (code, docs, papers, images, videos) to knowledge graph (Safi Shamsi, GitHub repo)"
type: repo
year: 2026
category: applications
raw_path: /Users/kmyu/Desktop/project/ai-wiki/raw/repos/safishamsi-graphify
raw_filename: "safishamsi-graphify/"
source_collection: external
org: "safishamsi"
repo: "graphify"
url: "https://github.com/safishamsi/graphify"
license: "MIT"
tags: [knowledge-graph, code-knowledge-graph, agent-skill, claude-code, codex, cursor, mcp, tree-sitter, leiden, graphrag, repo, oss, yc-s26]
---

## 한 줄 요약 (One-line Summary)

**Safi Shamsi/graphify**(PyPI 패키지 `graphifyy`, MIT, Y Combinator S26)는 임의의 폴더(코드 33언어 + 문서 + PDF + 이미지 + 비디오)를 **deterministic AST(tree-sitter) + LLM semantic + Leiden community detection** 3-pass 파이프라인으로 단일 NetworkX 그래프(`graph.json` + `graph.html` + `GRAPH_REPORT.md`)로 컴파일해, Claude Code · Codex · Cursor 등 21+ AI 어시스턴트가 `/graphify` 스킬로 grep 대신 query하게 만드는 *코드/지식 그래프 + 에이전트 스킬* 제품이다.

## 1. 자료 정보 (Document Information)

- **Org / Repo**: `safishamsi/graphify` (Safi Shamsi 개인, Y Combinator S26 — README 배지)
- **License**: MIT (Copyright (c) 2026 Safi Shamsi)
- **PyPI**: `graphifyy` (double-y, Python ≥ 3.10) — CLI 명령은 여전히 `graphify`. README에 *"다른 graphify* 패키지는 비계열"* 명시
- **Active branch**: `v8` (개발 활성), CI는 `v8` 기준
- **Latest version (snapshot)**: 0.8.28 (2026-06-01 릴리스) — Kilo Code 통합, Dart extractor 현대화, `tree-sitter-dm` 옵셔널화 등
- **Sister product**: [Penpax](https://graphifylabs.ai) — graphify 위에 얹은 "always-on" 레이어 (meetings + browser history + emails + files + code, on-device). 무료 트라이얼 대기자 명단 운영 중.
- **Companion content**: 저자의 책 *The Memory Layer* (Gumroad), [@graphifyy](https://x.com/graphifyy) X 계정, GitHub Sponsors.
- **Snapshot**: `git clone --depth 1` (2026-06-02 시점, `main` 브랜치). 269 파일, 약 31K LoC (`graphify/*.py`만 32 파일).
- **상위 디렉토리**:
  - `graphify/` — 메인 패키지 (32 Python 모듈 + 19개 IDE/skill 마크다운: `skill.md`, `skill-aider.md`, `skill-amp.md`, `skill-claw.md`, `skill-codex.md`, `skill-copilot.md`, `skill-devin.md`, `skill-droid.md`, `skill-kilo.md`, `skill-kiro.md`, `skill-opencode.md`, `skill-pi.md`, `skill-trae.md`, `skill-vscode.md`, `skill-windows.md`, `command-kilo.md`)
  - `tests/` — 73 pytest 파일 (모듈 1개당 1개 + fixture). `bench_extract.py` 성능 벤치마크 포함
  - `docs/` — `how-it-works.md`, `logo-icon.svg`, 32+ 언어 번역 README (`translations/README.zh-CN.md` 등 — 한국어 포함)
  - `worked/` — 워크드 예제 5개 (`example`, `httpx`, `karpathy-repos`, `mixed-corpus`, `rsl-siege-manager`). 각각 `raw/` 원본 + `review.md` 솔직한 평가 + 실제 `GRAPH_REPORT.md` 출력
  - `ARCHITECTURE.md`, `AGENTS.md`, `CHANGELOG.md`, `SECURITY.md`, `pyproject.toml`, `uv.lock`

## 2. 주요 기여 (Key Contributions)

1. **"`/graphify` 스킬" 추상화 — 21+ AI 어시스턴트 단일 인터페이스**: 동일한 `/graphify .` 명령이 Claude Code · Codex · OpenCode · Kilo Code · Cursor · Gemini CLI · GitHub Copilot CLI · VS Code Copilot Chat · Aider · Amp · OpenClaw · Factory Droid · Trae · Hermes · Kimi Code · Kiro · Pi · Devin CLI · Google Antigravity에서 동작. `graphify install --platform <X>`로 플랫폼별 스킬·hook·persistent instruction 파일을 자동 배포한다 (`CLAUDE.md` + PreToolUse hook on Claude Code, `AGENTS.md` + `.codex/hooks.json` on Codex, `.cursor/rules/graphify.mdc` `alwaysApply:true` on Cursor 등).
2. **3-Pass 추출 파이프라인 (cost-aware)**: ① **Pass 1** (free) — tree-sitter AST로 33 언어 코드 구조(class·function·import·call-graph·inline `# NOTE:` `# WHY:` `# HACK:` 주석) **로컬 추출, LLM 호출 0**. SQL은 별도로 table·view·FK·JOIN을 결정적으로 추출. ② **Pass 2** (local) — 비디오/오디오를 `faster-whisper`로 로컬 전사. 전사 prompt가 *지금까지의 god node*로 seed되어 도메인 vocabulary를 흡수. ③ **Pass 3** (LLM, paid) — 문서·PDF·이미지·transcript를 Claude(또는 Gemini/Kimi/OpenAI/DeepSeek/Bedrock/Ollama/`claude-cli`) 서브에이전트가 병렬 처리, JSON fragment를 머지. **코드만 있는 corpus에선 Pass 3 자체가 스킵**되어 비용 0.
3. **세 가지 등급의 confidence label + INFERRED `confidence_score` 리브릭**: `EXTRACTED`(1.0, import/call 등 명시적) · `INFERRED`(0.55–0.95, discrete rubric: 0.95 near-certain → 0.55 speculative) · `AMBIGUOUS`(GRAPH_REPORT.md에 human review 플래그). 인과 추론을 hallucinate하지 않고 *"무엇이 발견된 것 vs 무엇이 추측된 것인지"*를 사용자가 항상 알도록 설계.
4. **Embedding-free graph-only RAG**: Leiden 커뮤니티 탐지([Traag et al., 2019](https://www.nature.com/articles/s41598-019-41695-z))로 god node·community 구조를 만든다. **별도 vector DB·embedding 단계가 없다** — Claude가 추출한 `semantically_similar_to` 엣지가 이미 그래프에 있으므로 그래프 구조 자체가 similarity signal. cluster 결과는 `--resolution`(granularity)·`--exclude-hubs`(p99 utility hub 배제)·`--no-label`(`Community N` placeholder 유지)로 튜닝.
5. **3개 출력 + 다중 export 형식**: 단일 빌드에서 **(i) `graph.html`** (브라우저, 클릭/필터/검색), **(ii) `GRAPH_REPORT.md`** (god nodes·surprising connections·"why" 노드·suggested 4–5 questions·confidence tags), **(iii) `graph.json`** (NetworkX node-link, 재사용 가능). 추가로 `--obsidian`(vault), `--graphml`(Gephi/yEd), `--neo4j`(cypher.txt + `--neo4j-push bolt://...`), `--svg`(Notion/GitHub 임베드), `--wiki`(community별 markdown article + `index.md`), `graphify export callflow-html`(Mermaid 아키텍처 다이어그램).
6. **Cross-repo "global graph"**: `graphify global add graphify-out/graph.json myrepo`로 여러 프로젝트 그래프를 `~/.graphify/global.json`에 등록. 노드마다 `repo` 속성이 있어 origin별 필터링 가능. `graphify clone <github-url>` + `graphify merge-graphs`로 여러 GitHub repo를 단일 cross-repo 그래프로 합칠 수 있고, `~/.graphify/repos/<owner>/<repo>`에 캐싱되어 반복 실행시 재사용.
7. **PR triage 기능**: `graphify prs` 명령이 CI 상태 · review 상태 · worktree 매핑 + **graph impact**까지 한 화면에. `--triage`로 AI가 review queue를 우선순위 정렬(어떤 backend든 자동 검출), `--conflicts`로 동일 graph community에 변경이 몰린 PR들을 식별해 merge order 위험을 사전 경고. `--worktrees`로 worktree → branch → PR 매핑.
8. **운영 부속 기능 (제품 grade)**: SHA256 content-hash 캐시(`graphify-out/cache/`, 미변경 파일 0-cost 스킵), `ProcessPoolExecutor` 코드 추출 병렬화(84-파일 corpus에서 sequential 대비 1.66×), git post-commit + post-checkout hook(`graphify hook install`, AST-only 자동 재빌드, **graph.json union merge driver**로 두 개발자 동시 commit시 conflict 자동 해소), `graphify watch ./src` 파일 변경 감시 자동 동기화, `graphify-out/`을 git commit하는 팀 워크플로 (manifest.json·cost.json만 gitignore), MCP stdio 서버(`python -m graphify.serve graph.json` → `query_graph`·`get_node`·`get_neighbors`·`shortest_path`·`list_prs`·`get_pr_impact`·`triage_prs` 노출).
9. **Headless / CI 추출 모드**: `graphify extract`는 IDE 세션과 독립적으로 동작. 자동 backend 검출 (priority: Gemini → Kimi → Claude → OpenAI → DeepSeek → Bedrock → Ollama). **Data residency**: `--backend ollama`(전부 로컬) 또는 `--backend bedrock`(AWS IAM, API key 불필요). 커스텀 OpenAI-호환 provider도 `graphify provider add`로 등록 가능 (NVIDIA NIM, vLLM, OpenRouter, Together, LiteLLM 등).
10. **`worked/` 디렉토리: 정직한 평가 데이터**: 저자가 실제 corpus 5개에 graphify를 돌리고 `review.md`에 "무엇이 맞고 무엇이 틀렸는지"를 적은 contribution 패턴 권장. 외부 기여자에게도 "real corpus + honest review"가 최우선 contribution이라고 명시.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 파이프라인 (ARCHITECTURE.md)

```
detect()  →  extract()  →  build_graph()  →  cluster()  →  analyze()  →  report()  →  export()
```

각 단계는 **자기 모듈의 단일 함수**이고, plain Python dict + NetworkX 그래프로만 통신. `graphify-out/` 밖에는 부수 효과 없음.

```
[Files in any folder]
   ↓ detect.collect_files(root) — 확장자/.graphifyignore로 필터
[Path[]]
   ↓ extract.extract(path) — dispatch by suffix
  ├─ Code (.py .ts .go .rs ...) → tree-sitter AST → nodes + edges + INFERRED call graph
  ├─ Docs/PDF/Image/Transcript  → LLM subagent(Claude/Gemini/...) → nodes + edges + hyperedges
  └─ Video/Audio (.mp4 .mp3 ...) → faster-whisper transcript (seed = god nodes) → 다시 doc 경로
[{nodes, edges, hyperedges?}, ...]
   ↓ validate.validate_extraction() — JSON 스키마 강제
   ↓ build.build_graph() — NetworkX 그래프로 머지
[nx.Graph]
   ↓ cluster.cluster() — Leiden 알고리즘 (community attribute 부착)
   ↓ analyze.analyze() — god_nodes + surprising_connections + suggest_questions
[Analysis dict + Graph]
   ↓ report.render_report() → GRAPH_REPORT.md
   ↓ export.to_json/to_html/to_svg/to_canvas + wiki.to_wiki
graphify-out/{graph.json, graph.html, GRAPH_REPORT.md, [vault/], [wiki/], ...}
```

### Extraction 출력 스키마 (ARCHITECTURE.md)

```json
{
  "nodes": [
    {"id": "unique_string", "label": "human name", "source_file": "path", "source_location": "L42"}
  ],
  "edges": [
    {"source": "id_a", "target": "id_b", "relation": "calls|imports|uses|...",
     "confidence": "EXTRACTED|INFERRED|AMBIGUOUS", "confidence_score": 0.85,
     "source_file": "path"}
  ]
}
```

Hyperedge(3+ 노드를 연결하는 group relation)는 `G.graph["hyperedges"]`에 저장. NetworkX node-link format이 최종 직렬화.

### 핵심 모듈 (`graphify/`, 32 파일 / 약 31K LoC)

| 모듈 | 라인 수 | 역할 |
|---|---:|---|
| `__main__.py` | — | CLI entry. UTF-8 reconfigure (Windows 콘솔 cp 충돌 회피) + 명령 dispatch |
| `detect.py` | — | `collect_files(root)` + `CODE_EXTENSIONS` + `.graphifyignore` 처리. `os.walk`를 lexicographic sort하여 **결정적 graph.json** 보장 (#1090) |
| `extract.py` | — | 언어별 dispatch + tree-sitter AST → nodes/edges. 새 언어는 `extract_<lang>(path)` 추가 + suffix 등록 + `CODE_EXTENSIONS` + tree-sitter pkg를 `pyproject.toml`에 |
| `symbol_resolution.py` | 538 | cross-file symbol resolution(JS/TS `import`, Python `from … import`, Lua `require` 도트→경로 변환 등) |
| `build.py` | — | extraction list → `nx.Graph`. `build_from_json(...)` 재호출 가능 |
| `cluster.py` | — | Leiden community + `score_all`/`cohesion_score`. `--resolution`/`--exclude-hubs` 옵션 |
| `analyze.py` | — | `god_nodes`(high-degree), `surprising_connections`(cross-community + cross-language family 매핑), `suggest_questions` |
| `report.py` | — | `GRAPH_REPORT.md` 생성. `find_import_cycles` (Johnson's algorithm, file-level 사이클 탐지) 결과 포함 |
| `export.py` | — | `to_json`, `to_html`(interactive viz), `to_svg`, `to_canvas`(Obsidian) |
| `wiki.py` | 282 | community별 markdown article + `index.md` 생성 (`--wiki`) |
| `callflow_html.py` | — | Mermaid 아키텍처 / call-flow HTML 생성 (`graphify export callflow-html`) |
| `tree_html.py` | 582 | interactive HTML tree view |
| `serve.py` | 993 | **MCP stdio 서버**. `query_graph` · `get_node` · `get_neighbors` · `shortest_path` · `list_prs` · `get_pr_impact` · `triage_prs` |
| `mcp_ingest.py` | — | `.mcp.json` · `claude_desktop_config.json` 파싱 → MCP 서버 노드 + 패키지 ref + env var 요구사항 추출 |
| `transcribe.py` | 184 | `faster-whisper` 비디오/오디오 전사 (god-node seed) |
| `ingest.py` | — | `/graphify add <url>` — paper PDF (arXiv 등) · YouTube URL · 일반 URL fetch → corpus dir 저장 |
| `cache.py` | — | SHA256 content-hash 캐시. `check_semantic_cache` / `save_semantic_cache` |
| `security.py` | 336 | `validate_url`(http/https only) + `_NoFileRedirectHandler`(file:// redirect 차단) + `safe_fetch[_text]`(size cap + timeout) + `validate_graph_path`(`graphify-out/` 내부 강제) + `sanitize_label`(control char strip + 256 char cap + HTML escape) |
| `validate.py` | 72 | extraction JSON 스키마 강제 (build 전에 raise) |
| `dedup.py` | — | LLM tiebreaker 가능 (`--dedup-llm`) |
| `semantic_cleanup.py` | 319 | 추출된 의미 노드 정리 |
| `watch.py` | 883 | 파일 시스템 감시. `_WATCHED_EXTENSIONS` |
| `hooks.py` | — | git post-commit + post-checkout hook 설치 + **graph.json union merge driver** (#1059 pending lock-queue 포함) |
| `prs.py` | — | GitHub PR 대시보드 + triage + conflict detection |
| `affected.py` | — | 변경된 파일이 영향을 미치는 그래프 community 산출 |
| `manifest.py` | — | `manifest.json` mtime 기반 incremental |
| `global_graph.py` | — | `~/.graphify/global.json` cross-repo 그래프 |
| `multigraph_compat.py` | — | DiGraph/MultiGraph 호환 |
| `google_workspace.py` | — | `.gdoc` `.gsheet` `.gslides` `gws` CLI 경유 export |
| `llm.py` | — | backend abstraction (Claude/Gemini/Kimi/OpenAI/DeepSeek/Ollama/Bedrock/`claude-cli`). `~/.graphify/providers.json`로 OpenAI-호환 커스텀 provider 등록 (#1084) |
| `scip_ingest.py` | — | SCIP(Sourcegraph Code Intelligence Protocol) ingest 보조 |
| `diagnostics.py` | — | 진단 |
| `benchmark.py` | — | corpus vs subgraph 토큰 비교 |

### Confidence 등급

| Label | 의미 | confidence_score |
|---|---|---|
| `EXTRACTED` | 소스에 명시 (import, 직접 call) | 1.0 (고정) |
| `INFERRED` | 합리적 추론 | 0.55–0.95 (rubric) |
| `AMBIGUOUS` | 불확실, human review 플래그 | — |

INFERRED rubric: 0.95 near-certain(explicit cross-file reference + plausible target 단일) / 0.85 강한 증거(naming + context align) / 0.75 합리적(contextual but not explicit) / 0.65 약한 증거(naming similarity only) / 0.55 speculative.

### 핵심 명령 (`README.md` Full command reference)

```bash
/graphify .                                  # 현재 디렉토리 전체 파이프라인
/graphify <path> --mode deep                 # 더 aggressive한 INFERRED extraction
/graphify <path> --update                    # 변경된 파일만 재추출 (incremental)
/graphify <path> --cluster-only              # 재추출 없이 cluster만
/graphify <path> --cluster-only --resolution 1.5     # 더 granular community
/graphify <path> --cluster-only --exclude-hubs 99    # p99 utility hub 제외
/graphify <path> --wiki                      # community별 markdown wiki + index.md
/graphify <path> --watch                     # 파일 변경 감시 자동 재빌드
/graphify <path> --mcp                       # MCP stdio 서버

/graphify add https://arxiv.org/abs/1706.03762   # paper fetch → corpus + 그래프
/graphify add <youtube-url>                       # transcribe → corpus + 그래프

/graphify query "what connects auth to the database?"
/graphify path "UserService" "DatabasePool"  # shortest path
/graphify explain "RateLimiter"

graphify clone https://github.com/karpathy/nanoGPT  # ~/.graphify/repos/<owner>/<repo>
graphify merge-graphs a.json b.json --out merged.json
graphify global add graphify-out/graph.json myrepo  # cross-repo 등록

graphify prs                # PR 대시보드: CI + review + worktree + graph impact
graphify prs --triage       # AI ranking (backend 자동 검출)
graphify prs --conflicts    # 동일 community 변경 PR 식별 → merge order 위험

graphify hook install       # post-commit AST-only 재빌드 + union merge driver
graphify export callflow-html  # Mermaid 아키텍처 다이어그램

graphify extract ./docs --backend ollama --token-budget 4000
GRAPHIFY_OLLAMA_NUM_CTX=8192 graphify extract ./docs --backend ollama
```

### 지원 언어 / 파일 종류

| Type | Extensions / 비고 |
|---|---|
| **Code (33)** | `.py .ts .js .jsx .tsx .mjs .go .rs .java .c .cpp .h .hpp .rb .cs .kt .scala .php .swift .lua .luau .zig .ps1 .ex .exs .m .mm .jl .vue .svelte .astro .groovy .gradle .dart .v .sv .svh .sql .f .f90 .f95 .f03 .f08 .pas .pp .dpr .dpk .lpr .inc .dfm .lfm .lpk .sh .bash .json .dm .dme .dmi .dmm .dmf .sln .csproj .fsproj .vbproj .razor .cshtml`. BYOND DreamMaker `.dm`/`.dme` AST는 `[dm]` extra 필요 (Windows wheel만 있어 #1104부터 옵셔널) |
| **MCP configs** | `.mcp.json`, `mcp.json`, `mcp_servers.json`, `claude_desktop_config.json` — 서버 노드 + 패키지 ref + env var 요구사항 |
| **Docs** | `.md .mdx .qmd .html .txt .rst .yaml .yml` |
| **Office** | `.docx .xlsx` (`[office]` extra) |
| **Google Workspace** | `.gdoc .gsheet .gslides` opt-in (`--google-workspace` + `gws` auth + `[google]`) |
| **PDFs** | `.pdf` (`[pdf]` extra: `pypdf` + `markdownify`) |
| **Images** | `.png .jpg .webp .gif` |
| **Video/Audio** | `.mp4 .mov .mp3 .wav` 등 (`[video]` extra: `faster-whisper` + `yt-dlp`) |
| **YouTube/URL** | 임의 video URL |

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 토큰 절감 (docs/how-it-works.md "Token benchmark")

저자가 직접 측정한 corpus별 query당 토큰 절감:

| Corpus | 파일 수 | 절감 |
|---|---:|---|
| **Karpathy repos + 5 papers + 4 images (mixed)** | 52 | **71.5×** |
| graphify source + Transformer paper | 4 | **5.4×** |
| httpx (synthetic Python library) | 6 | ~1× |

저자 해설: *"6 파일은 이미 context window에 들어가므로 그래프 가치는 압축이 아니라 구조적 명료성. 52 파일에서는 절감이 빠르게 복리(compound)된다."* `worked/` 디렉토리에 raw input + 실제 `GRAPH_REPORT.md`/`graph.json` 출력이 있어 재현 가능.

### 성능

- **Parallel AST extraction**: 84 코드 파일 corpus에서 `ProcessPoolExecutor`로 sequential 대비 **약 1.66×** 단축 (Python GIL bypass).
- **SHA256 캐시**: 미변경 파일은 0-cost 스킵 (`graphify-out/cache/`).
- **Determinism**: `detect()`의 lexicographic sort로 first-writer-wins node ID 결정이 안정화되고 Leiden community 개수도 동일 corpus에서 동일 (#1090).
- **community ID stability**: 동일 grouping이면 community ID도 같도록 `(-size, sorted node IDs)` total order (#1090 follow-up). 이전엔 sparse graph에서 community diff가 churn 큼.

### 운영 / 커뮤니티

- **버전**: 0.8.x 활성 개발 중 (2026-06-01 0.8.28). 활성 브랜치 `v8`. **거의 매일 릴리스**: CHANGELOG 4일치(0.8.25–0.8.28)만 봐도 약 25개 PR 머지.
- **테스트**: 73 pytest 파일 (모듈 1개당 ~1개 — `test_extract.py`, `test_pascal.py`, `test_dart.py`, `test_dotnet.py`, `test_hypergraph.py`, `test_multigraph_diagnostics.py` 등). 모두 pure unit test, 네트워크 호출 없고 fs side effect는 `tmp_path` 한정.
- **다국어**: 32 언어 README 번역(한국어 `README.ko-KR.md` 포함, 추가로 ZH-CN, JA-JP, DE, FR, ES, HI, BR-PT, RU, AR, IT, PL, NL, TR, UK, VI, ID, SV, EL, RO, CS, FI, DA, NO, HU, TH, UZ, ZH-TW, FIL, PL, SK 등 다수).
- **Y Combinator S26 + 자체 책**: *The Memory Layer* (Gumroad). 단순 OSS가 아닌 회사 제품 라인의 핵심 인프라.

### 보안 / Privacy 약속

- **코드 파일**: 100% 로컬 처리 (tree-sitter). 외부로 안 나감.
- **비디오/오디오**: 100% 로컬 (faster-whisper).
- **문서·PDF·이미지**: LLM 호출 — IDE 세션 내 모델 사용 (graphify가 API key 안 가짐) 또는 headless `graphify extract`는 사용자가 설정한 backend API key/`claude` CLI 구독 사용. **No telemetry, no usage tracking, no analytics.**
- **Data residency**: `--backend ollama`(전부 로컬) 또는 `--backend bedrock`(AWS IAM, API key 불필요). Kimi(`MOONSHOT_API_KEY`)는 Moonshot AI (중국).
- **Security 모듈** (`graphify/security.py`, 336 LoC): URL whitelist + file:// redirect 차단 + size/timeout cap + 그래프 경로 jail + 라벨 sanitize.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **첫 build의 LLM 비용**: 코드 only면 0이지만 문서·PDF·이미지가 있으면 Pass 3가 token을 소모. 책정 모델은 사용자의 backend key (graphify가 비용 인입 안 함). 절감은 *반복 query에서* 발생하므로 대규모 corpus 1회 빌드에는 선투자.
- **Graph HTML 5,000 노드 한계**: 브라우저 렌더가 무거워짐. 저자 권고는 `--no-viz`로 HTML 스킵 + JSON 직접 query.
- **Ollama VRAM**: KV-cache window auto-size가 GPU에 너무 클 수 있음. `GRAPHIFY_OLLAMA_NUM_CTX=8192` + `--token-budget 4000` 수동 조정 권장. `GRAPHIFY_OLLAMA_KEEP_ALIVE=0`로 chunk마다 모델 unload 가능.
- **Refactor 후 ghost 노드**: 파일 삭제 후 `--update` 시 옛 노드 잔존. `--force`(또는 `GRAPHIFY_FORCE=1`)로 더 작은 그래프도 덮어쓰기. ghost duplicate(AST/semantic ID 불일치)는 `graphify extract . --force`로 정리.
- **`pip install graphifyy` Mac/Windows 함정**: PATH 문제 + skill이 `graphify-out/.graphify_python`에서 Python 해소 → `ModuleNotFoundError: No module named 'graphify'` 가능. 저자는 `uv tool install` 또는 `pipx install`을 강하게 권장.
- **CHANGELOG의 빈도 높은 fix가 시사하는 안정성 트레이드오프**: 0.8.25–0.8.28(4일) 만 봐도 JS arrow callback phantom god-node(#1077), Markdown fenced block orphan(#1077), `pnpm-workspace.yaml` IndexError(#1083), anchored `.graphifyignore` 매칭(#1087), Windows console UnicodeEncodeError(#992), `Path.glob('.')` Py3.10 크래시(#1083) 등 *얇은 엣지 케이스 누적 수정*이 활발. 활발한 개발의 신호이자 *production-grade 성숙 진행 중*의 신호. semantic vs AST node ID ghost(#1033, #1096) 같은 근본적 정합성 이슈도 최근 수정.
- **`tree-sitter-dm` 비-Windows 컴파일 부담**: 0.8.28부터 `[dm]` 옵셔널화로 default install이 C toolchain 없어도 성공 (#1104). 기존 DreamMaker 사용자는 `graphifyy[dm]` 재설치 필요.
- **공식 PyPI 이름 혼동**: `graphifyy`(double-y)가 공식. README에서 *"다른 graphify* 패키지는 비계열"* 강조. squatter 위험 존재.
- **macOS HFS+/APFS 대소문자**: 테스트 fixture `sample.f90` + `sample.F90` 동시 존재 불가 (case-insensitive FS). Linux/Docker에서만 Fortran 양쪽 테스트 동시 가능.
- **자체 보고된 graph quality 한계** (`worked/*/review.md` 패턴): 저자 자신이 "graph가 무엇을 맞고 무엇을 틀렸는지"를 corpus별로 문서화. 외부 기여자에게도 이 패턴 권장 → graph quality의 객관적 측정/벤치마크는 진행 중.

## 6. 관련 연구 (Related Work)

### Wiki 내부 직접 비교 대상

- [[applications/garrytan-gbrain]] — **가장 가까운 비교군**. Garry Tan의 GBrain은 markdown-first agent memory + Postgres/pgvector hybrid retrieval + zero-LLM typed-edge KG + git-commit-driven sync. graphify와 GBrain 비교:
  - **공통**: 둘 다 *"agent memory = markdown source of truth + 자동 빌드 KG"* 패러다임, git-driven workflow, plain-text first.
  - **차이**: GBrain은 *개인 knowledge brain*(skill pack 43개 + Minions durable job queue + dream cycle)에 초점. graphify는 *코드 + 임의 corpus의 knowledge graph 빌더*에 초점 (33 언어 AST + Leiden community + 21 IDE 통합 + PR triage). 같은 패턴의 두 직교 제품.
- [[applications/liu-2026-rag-llm-wiki-or-gbrain|Liu (Medium): RAG vs LLM Wiki vs GBrain]] — Liu의 3-축 분류(retrieve/compile/act)에서 graphify는 *retrieve(graph) + compile(GRAPH_REPORT.md/wiki)*이 결합된 형태. *act*는 IDE 통합으로 위임.
- [[applications/vectorize-2026-gbrain-review-honest-assessment|Vectorize 10-dim scorecard]] — graphify에도 적용 가능한 평가 프레임. graphify는 multi-language·multi-IDE 측면에서 GBrain보다 폭이 넓지만, dream cycle 같은 *능동 compounding* 메커니즘이 약함.

### Wiki 내부 (RAG / KG 인프라)

- [[database/guo-2025-lightrag-simple-and-fast]] — LightRAG. graph-based RAG의 핵심 ancestor. dual-level keyword retrieval은 graphify에는 없지만 community-based traversal은 유사 정신.
- [[database/zhang-2026-leanrag-knowledge-graph-based-generation]] — LeanRAG. hierarchical KG + LCA retrieval. graphify는 Leiden flat community에 머무름.
- [[database/guo-2025-rag-anything-all-in-one-rag]] / [[database/hkuds-rag-anything]] — RAG-Anything. multimodal RAG (PDF + image + table + equation). graphify는 이미지/비디오를 다루지만 *modality별 entity extraction* 수준은 RAG-Anything이 더 정교 (`ImageModalProcessor` 등).
- [[overviews/lightrag-family-graph-rag-overview]] — graph-based RAG 계열 overview. graphify는 이 계열의 *제품화/agent-skill 축* 확장.
- [[database/li-2026-beyond-semantic-similarity-rethinking-retrieval|DCI]] — Direct Corpus Interaction. *agent가 raw corpus를 grep으로 직접 검색*하자는 주장. **graphify의 정확한 반대 명제** — graphify는 *"grep 대신 query"* 슬로건. 두 접근의 비교가 흥미로움 (corpus 크기 / 도메인 / agent 능력에 따라 trade-off).

### Wiki 외부 (graphify 자체가 의존/언급)

- **tree-sitter**: AST 추출의 백본. 33+ 언어 grammar 패키지에 의존.
- **Leiden algorithm**: Traag et al., *Nature Scientific Reports* 2019. embedding-free community detection.
- **faster-whisper + yt-dlp**: 비디오/오디오 로컬 전사.
- **NetworkX**: 그래프 표현 + node-link 직렬화.
- **Whisker/MCP stdio**: `python -m graphify.serve`로 그래프를 agent에 노출.
- **Penpax** ([graphifylabs.ai](https://graphifylabs.ai)) — graphify 기반 always-on 레이어 (meetings + browser + emails + files + code, on-device). 같은 회사 next-step 제품.
- **Karpathy LLM Wiki gist** ([1dd0294ef9567971c1e4348a90d69285](https://gist.github.com/karpathy/1dd0294ef9567971c1e4348a90d69285)) — 본 ai-wiki 프로젝트의 출발점. graphify는 *karpathy-style LLM Wiki를 자동으로 빌드해주는 도구*에 가깝다 (특히 `--wiki` 모드).

## 7. 용어집 (Glossary)

- **/graphify (skill)**: AI 어시스턴트가 호출하는 슬래시 명령. 21+ 플랫폼(Claude Code · Codex · Cursor · OpenCode · Kilo · Gemini CLI · Copilot · Aider · OpenClaw · Droid · Trae · Hermes · Kimi · Kiro · Pi · Devin · Antigravity 등)에서 동일 인터페이스. PowerShell에서는 leading `/`가 경로 구분자라 `graphify .`로 호출.
- **3-Pass extraction**: Pass 1(tree-sitter AST 코드, free) → Pass 2(faster-whisper 비디오/오디오, local) → Pass 3(Claude/Gemini/Kimi/... 서브에이전트 문서/PDF/이미지, paid). 코드 only corpus는 Pass 3 skip → 0 비용.
- **Confidence label / score**: `EXTRACTED`(명시, 1.0) / `INFERRED`(추론, 0.55–0.95 rubric) / `AMBIGUOUS`(불확실, review 플래그). hallucination 방지의 핵심.
- **God node**: 그래프에서 가장 연결도가 높은 노드. 모든 흐름이 통과하는 hub 개념(예: `RateLimiter`, `UserService`). god node는 community detection의 자연스러운 anchor이고 transcript prompt seed로도 사용됨.
- **Surprising connection**: 서로 다른 파일·모듈 사이의 의외성 높은 엣지. `analyze.surprising_connections`가 cross-community + cross-language family로 ranking.
- **Hyperedge**: 3+ 노드를 동시 연결하는 group relation. `G.graph["hyperedges"]`에 별도 저장.
- **Leiden community**: 그래프 클러스터링 알고리즘 (Traag et al., 2019). embedding 없이 엣지 밀도만으로 community 식별. `--resolution`(granularity) + `--exclude-hubs`(p99 utility hub 제외).
- **god node seed (transcript)**: faster-whisper 전사 시 *지금까지의 god node*를 prompt seed로 넣어 도메인 vocabulary를 흡수 → 도메인 전문 용어의 ASR 정확도 향상.
- **`graphify-out/`**: 모든 빌드 산출물 디렉토리. `graph.json` · `graph.html` · `GRAPH_REPORT.md` · `cache/` · `manifest.json` · `cost.json` · `.graphify_python` 등. team 워크플로는 `graphify-out/`을 git commit하고 `manifest.json` + `cost.json`만 gitignore.
- **`.graphifyignore`**: `.gitignore` 동일 문법(anchored `/`, negation `!`, glob). 0.8.26부터 anchored 패턴이 같은 이름의 다른 디렉토리에 잘못 매치되던 버그 수정 (#1087).
- **Global graph**: `~/.graphify/global.json`. `graphify global add` 로 여러 프로젝트의 그래프를 등록 → 노드의 `repo` 속성으로 origin 필터링.
- **Cross-repo graph**: `graphify clone <url>` + `graphify merge-graphs a.json b.json --out merged.json`. `~/.graphify/repos/<owner>/<repo>` 캐싱.
- **PR triage**: `graphify prs --triage`. CI + review + worktree + graph impact + AI ranking을 한 화면에. `--conflicts`로 동일 community 변경 PR 사전 경고.
- **Confidence rubric (INFERRED)**: 0.95 near-certain / 0.85 강한 증거 / 0.75 합리적 / 0.65 약함 / 0.55 speculative. 임의의 수치가 아닌 discrete 5단계.
- **MCP stdio 서버**: `python -m graphify.serve graph.json` → `query_graph`·`get_node`·`get_neighbors`·`shortest_path`·`list_prs`·`get_pr_impact`·`triage_prs` 노출. Kimi 등 MCP 지원 어시스턴트에 등록 가능.
- **CLAUDE.md hook (Claude Code 전용)**: `graphify claude install` 시 CLAUDE.md + PreToolUse hook 설치. search-style tool call 직전에 hook이 발화해 "graph query를 먼저 시도해" 가이드 주입.
- **Cursor `.cursor/rules/graphify.mdc`**: `alwaysApply: true`로 매 conversation에 자동 포함 (hook 불필요).
- **Penpax**: graphify 위에 얹은 회사 제품 (meetings + browser + emails + files + code의 always-on 그래프, on-device). [graphifylabs.ai](https://graphifylabs.ai).
- **graphifyy (PyPI)**: double-y 공식 패키지명. CLI는 그대로 `graphify`. *graphify* 단일 y는 비계열 squatter 가능.
