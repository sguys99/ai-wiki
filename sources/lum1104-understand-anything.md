---
title: "Lum1104/Understand-Anything"
type: repo
year: 2026
category: applications
raw_path: /Users/kmyu/Desktop/project/ai-wiki/raw/repos/lum1104-understand-anything
raw_filename: "lum1104-understand-anything/"
source_collection: external
tags: [code-understanding, knowledge-graph, multi-agent-pipeline, tree-sitter, llm-hybrid, claude-code-plugin, karpathy-llm-wiki, dashboard, incremental-analysis, monorepo]
org: "Lum1104"
repo: "Understand-Anything"
url: "https://github.com/Lum1104/Understand-Anything"
license: "MIT"
---

## 한 줄 요약 (One-line Summary)

Understand-Anything은 임의의 codebase 혹은 Karpathy-pattern LLM wiki를 *multi-agent pipeline* (project-scanner → file-analyzer → architecture-analyzer → tour-builder → graph-reviewer)으로 분석해 `.understand-anything/knowledge-graph.json`(13 node type · 26 edge type)을 만들고 React Flow + Zustand + TailwindCSS v4 dashboard로 시각·탐색하게 해주는 Claude Code / Cursor / VS Code Copilot / Codex / Gemini CLI 멀티 플랫폼 OSS 플러그인(MIT, v2.7.5)으로, **tree-sitter(deterministic) + LLM(semantic) hybrid** 와 **incremental fingerprint-based update**가 핵심 설계 결정이다.

## 1. 자료 정보 (Document Information)

- **저장소**: `Lum1104/Understand-Anything` (https://github.com/Lum1104/Understand-Anything)
- **라이선스**: MIT License, Copyright (c) 2026 Yuxiang Lin
- **버전**: 2.7.5 (다섯 개 `plugin.json` / `package.json` 파일에 동일 버전 강제 동기화 — repo `CLAUDE.md`에 명시)
- **저자/유지보수자**: Lum1104 (Yuxiang Lin)
- **공식 채널**: 홈페이지 `understand-anything.com` · Live demo `understand-anything.com/demo/` · Discord (`pydat66RY`) · YouTube community walkthrough (Better Stack 채널)
- **다국어 README**: 영어 본문 + `READMEs/` 하위에 `zh-CN`·`zh-TW`·`ja-JP`·`ko-KR`·`es-ES`·`tr-TR`·`ru-RU` 7종
- **지원 플랫폼 (15개)**: Claude Code (native plugin marketplace) · Cursor (`.cursor-plugin/plugin.json` auto-discovery) · VS Code + GitHub Copilot v1.108+ (`.copilot-plugin/plugin.json`) · Copilot CLI · Codex · OpenCode · OpenClaw · Antigravity · Gemini CLI · Pi Agent · Vibe CLI · Hermes · Cline · KIMI CLI · Trae
- **설치 스크립트**: `install.sh`(bash, 263 lines) · `install.ps1`(PowerShell, 297 lines); `~/.understand-anything/repo`에 클론 + 플랫폼별 symlink 생성, `./install.sh --update` / `--uninstall <platform>` 지원
- **저장소 트레이드 마크**: Trendshift badge (`repositories/23482`)
- **모노레포 구조**: pnpm workspaces(`pnpm-workspace.yaml`), Node.js ≥22 · pnpm ≥10 강제. 루트 `package.json` + `understand-anything-plugin/` 안에 `packages/core`(공유 분석 엔진) + `packages/dashboard`(React Flow 대시보드) + `src/`(skill 소스) + `skills/`(8개 skill) + `agents/`(9개 agent)

## 2. 주요 기여 (Key Contributions)

1. **"새 팀에 합류했는데 코드베이스가 20만 줄"이라는 onboarding 문제를 multi-agent + knowledge graph로 정공법으로 푼 OSS 도구.** README의 thesis: *"The goal isn't a graph that wows you with how complex your codebase is — it's a graph that quietly teaches you how every piece fits together."* 단순 시각화가 아니라 *학습 순서*(guided tour)·*아키텍처 레이어*·*business domain*까지 함께 추출한다.

2. **Tree-sitter + LLM hybrid 분리를 명시적 설계 원칙으로 채택.** repo `CLAUDE.md`와 README 모두에서 두 역할을 분리 정의:
   - Tree-sitter(deterministic) → import/export/function/class/call site/inheritance 등 *구조적 사실*을 `importMap`으로 사전 해석해 file-analyzer에 주입. "same input → same output, every run"이 보장된다. **`web-tree-sitter` (WASM)** 사용. 이유: 네이티브 `tree-sitter` 바인딩이 darwin/arm64 + Node 24 환경에서 실패하기 때문 (`CLAUDE.md` "Gotchas" 섹션).
   - LLM(semantic) → 자연어 summary · tag · architectural layer 배정 · business domain mapping · guided tour · language concept callout 등 *의도(intent)*를 생성.

3. **Multi-agent pipeline 7-phase 표준화.** `/understand` skill (skills/understand/SKILL.md, 852 lines)이 다음 단계를 오케스트레이션:
   - **Phase 0**: Pre-flight — `PROJECT_ROOT` 해석, *git worktree redirect*(worktree는 ephemeral이라 `.understand-anything/`이 세션 종료 시 파괴됨, issue #133), plugin root 4단계 fallback resolution, language directive 파싱(`--language zh|ja|ko|...`)
   - **Phase 0.5**: `.understandignore` 생성(부재 시 `.gitignore` + 빌트인 default deduplication) 후 사용자 confirm gate
   - **Phase 1**: `project-scanner` agent — `scan-project.mjs`로 `git ls-files`(없으면 recursive walk) + 언어/카테고리 분류 + 라인 카운트 + `extract-import-map.mjs`로 import 사전 해석
   - **Phase 1.5**: `compute-batches.mjs` — semantic batch 계산(파일 수가 아니라 import graph topology 기반)
   - **Phase 2**: `file-analyzer` agent **최대 5개 동시(concurrent)**, 배치당 20-30 파일. `extract-structure.mjs`(tree-sitter)로 구조 추출 후 LLM이 summary·tag·complexity·languageNotes 합성. **출력 파일명 규칙이 critical**: `batch-<batchIndex>.json` 또는 `batch-<batchIndex>-part-<k>.json`만 merge 스크립트의 regex `batch-(\d+)(?:-part-(\d+))?\.json`에 매칭됨 — `batch-fused-8-13.json` 같은 fusion 출력은 *조용히 드롭*된다는 운영 함정이 SKILL.md에 명시
   - **Phase 3**: `assemble-reviewer` agent — 통합 그래프 검증
   - **Phase 4**: `architecture-analyzer` agent — `languages/<id>.md`(언어별 컨텍스트)와 `frameworks/<id>.md`(프레임워크별 컨텍스트), `locales/<lang>.md`(출력 언어 가이드) 합성 prompt로 layer 배정
   - **Phase 5**: `tour-builder` agent — README + entry point에 정렬된 guided learning tour 생성
   - **Phase 6**: REVIEW — default는 *deterministic inline validation*(Node.js one-liner `ua-inline-validate.cjs`), `--review` 플래그 시 LLM `graph-reviewer` 동원
   - **Phase 7**: SAVE — `knowledge-graph.json` 저장 + `build-fingerprints.mjs`로 구조 fingerprint 기준선 생성(이 단계 실패 시 `meta.json`을 *쓰지 않음*: 다음 incremental 실행이 모든 파일을 STRUCTURAL로 분류해 매번 FULL_UPDATE로 escalate되는 issue #152 회피). `scan-result.json`만 intermediate에 *보존*(issue #293 — 재실행 시 ~157k 토큰 / 158초 절감)

4. **Karpathy LLM Wiki 패턴 first-class 지원.** `/understand-knowledge` skill + `article-analyzer` agent + `parse-knowledge-base.py` 데터미니스틱 파서로, `index.md` + 다수 `.md` + 옵셔널 `raw/` + 옵셔널 schema(`CLAUDE.md`/`AGENTS.md`)의 **세 단(three-layer) 구조**를 감지하고 wikilink(`[[target]]` 및 `[[target|display]]`), frontmatter, heading, code block 언어, `index.md` 섹션 카테고리를 정규식으로 추출한 뒤, LLM agent가 **explicit wikilink로 잡히지 않은 implicit 관계**만 5가지 edge type(`builds_on` 0.8 · `contradicts` 0.9 · `exemplifies` 0.7 · `authored_by` 0.6 · `cites` 0.7)으로 보완하는 분업 구조. 한 배치당 article 10-15개, 동시 3 배치, 배치당 ~5-15 entity / ~5-10 claim / ~10-20 implicit edge 가이드라인이 agent prompt에 명시 (article-analyzer.md). 이 wiki 프로젝트(ai-wiki)의 직접적 분석 대상.

5. **Knowledge graph schema 표준화.** SKILL.md의 "Reference: KnowledgeGraph Schema" 섹션에 13 node type(file/function/class/module/concept/config/document/service/table/endpoint/pipeline/schema/resource) + 26 edge type(Structural: imports/exports/contains/inherits/implements; Behavioral: calls/subscribes/publishes/middleware; Data flow: reads_from/writes_to/transforms/validates; Dependencies: depends_on/tested_by/configures; Semantic: related/similar_to; Infrastructure: deploys/serves/provisions/triggers; Schema/Data: migrates/documents/routes/defines_schema)와 edge weight convention(contains 1.0 · inherits/implements 0.9 · calls/exports/defines_schema 0.8 · imports/deploys/migrates 0.7 · depends_on/configures/triggers 0.6 · tested_by/documents/provisions/serves/routes 0.5) 표화. `understand-chat` skill이 이 schema 위에서 Q&A 수행.

6. **Incremental update + structural fingerprint.** `/understand --auto-update` 시 post-commit hook이 fingerprint 비교로 *바뀐 파일만* 재분석. `change-classifier.ts`(STRUCTURAL vs COSMETIC), `fingerprint.ts`(tree-sitter 기반 구조 해시), `staleness.ts`(개별 노드 stale 판정)가 `packages/core/src/`에 분리. neighborMap이 변경되지 않은 파일의 full-graph batchIndex를 참조하기 때문에 cross-batch edge 유지 가능. **3,000 nodes fake graph generator** (`scripts/generate-large-graph.mjs`)로 성능 테스트.

7. **Localized output (i18n) 전 파이프라인 침투.** `--language <iso639>` 플래그가 `outputLanguage`를 `config.json`에 저장하고, 모든 agent prompt 끝에 `$LANGUAGE_DIRECTIVE`("Generate all textual content ... in **{language}**. Maintain technical accuracy while using natural, native-level phrasing.")를 주입. 영향 범위: node summary/description/tag/title/languageNotes/languageLesson + dashboard UI label·button·tooltip + guided tour. `locales/zh.md`/`ja.md`/`ko.md`가 layer name 번역과 tag naming convention 가이드 제공. **노드 type prefix와 ID, edge type 이름은 영어 유지** — 데이터 호환성 분리.

8. **Cross-platform plugin 단일 코드베이스 유지를 위한 trick들.**
   - **Agent frontmatter에서 `model` 필드 누락**(`inherit`이 Claude Code-only keyword였고 opencode가 이를 literal model id로 받아 `ProviderModelNotFoundError`로 거절했던 issue #167 대응)
   - **5개 plugin.json/package.json 동시 bump** 강제(`.claude-plugin` · `.cursor-plugin` · `.copilot-plugin` · `understand-anything-plugin/.claude-plugin` · `understand-anything-plugin/package.json`). `.claude-plugin/marketplace.json`은 `name`+`source`만 허용해서 version 미포함(추가 필드 입력 시 schema validation 실패)
   - **Dashboard import 규약**: core를 main entry로 import하지 말고 browser-safe subpath export(`./search`/`./types`/`./schema`)만 사용 — main entry는 Node.js 모듈을 끌어와 브라우저에서 깨지기 때문

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 디렉토리 구조 (실측, 389 파일)

```
lum1104-understand-anything/
├── README.md                         # 영문 메인 (15 KB)
├── CLAUDE.md                         # 프로젝트 운영 컨벤션(5.8 KB)
├── CONTRIBUTING.md
├── LICENSE                           # MIT
├── install.sh / install.ps1          # 15-platform installer
├── package.json / pnpm-workspace.yaml / pnpm-lock.yaml
├── .claude-plugin/{plugin.json, marketplace.json}
├── .cursor-plugin/plugin.json
├── .copilot-plugin/plugin.json
├── READMEs/                          # 7개 언어 번역 (zh-CN, zh-TW, ja, ko, es, tr, ru)
├── assets/{hero.png, overview.png}
├── docs/                             # 외부 문서
├── homepage/                         # Astro 기반 `understand-anything.com` 소스
├── scripts/generate-large-graph.mjs  # 3000 노드 fake graph 생성 (perf 테스트)
├── tests/                            # repo-root vitest 스위트 (skill 테스트가 여기)
└── understand-anything-plugin/       # 본체 플러그인
    ├── package.json (@understand-anything/skill, 2.7.5)
    ├── pnpm-workspace.yaml
    ├── .claude-plugin/plugin.json
    ├── agents/                       # 9개 agent
    │   ├── project-scanner.md
    │   ├── file-analyzer.md
    │   ├── architecture-analyzer.md
    │   ├── tour-builder.md
    │   ├── graph-reviewer.md
    │   ├── assemble-reviewer.md
    │   ├── domain-analyzer.md
    │   ├── article-analyzer.md
    │   └── knowledge-graph-guide.md
    ├── skills/                       # 8개 skill
    │   ├── understand/SKILL.md       (852 lines, 7-phase pipeline)
    │   │   + scan-project.mjs, extract-import-map.mjs,
    │   │   + compute-batches.mjs, extract-structure.mjs,
    │   │   + build-fingerprints.mjs,
    │   │   + merge-batch-graphs.py, merge-subdomain-graphs.py
    │   ├── understand-dashboard/SKILL.md
    │   ├── understand-chat/SKILL.md
    │   ├── understand-diff/SKILL.md
    │   ├── understand-explain/SKILL.md
    │   ├── understand-onboard/SKILL.md
    │   ├── understand-domain/SKILL.md
    │   │   + extract-domain-context.py
    │   └── understand-knowledge/SKILL.md
    │       + parse-knowledge-base.py
    │       + merge-knowledge-graph.py
    ├── hooks/{hooks.json, auto-update-prompt.md}
    ├── src/                          # TypeScript skill 소스
    │   ├── index.ts
    │   ├── context-builder.ts
    │   ├── diff-analyzer.ts
    │   ├── explain-builder.ts
    │   ├── onboard-builder.ts
    │   ├── understand-chat.ts
    │   └── __tests__/
    └── packages/
        ├── core/                     # 공유 분석 엔진 (@understand-anything/core)
        │   └── src/
        │       ├── index.ts
        │       ├── types.ts          # GraphNode/GraphEdge/KnowledgeGraph
        │       ├── schema.ts         # JSON Schema 검증
        │       ├── search.ts         # 그래프 검색 (browser-safe)
        │       ├── embedding-search.ts
        │       ├── fingerprint.ts    # tree-sitter 구조 해시
        │       ├── change-classifier.ts # STRUCTURAL vs COSMETIC
        │       ├── staleness.ts
        │       ├── ignore-filter.ts / ignore-generator.ts
        │       ├── languages/        # 30+ 언어 config (typescript.ts, python.ts, ...)
        │       │   ├── configs/      # 언어별 tree-sitter 설정
        │       │   └── frameworks/   # nextjs, vue, express, django, fastapi, ...
        │       ├── plugins/
        │       │   ├── extractors/   # python/typescript/go/java/cpp/csharp/php/ruby/rust extractor
        │       │   └── parsers/      # markdown-parser, shell-parser, ...
        │       ├── analyzer/
        │       └── persistence/
        └── dashboard/                # React + TS + Vite 대시보드
            └── src/
                ├── main.tsx, App.tsx
                ├── store.ts          # Zustand
                ├── components/, contexts/, hooks/, themes/, utils/
                └── locales/          # i18n (en/zh/zh-TW/ja/ko/ru)
```

### 3.2 핵심 데이터 객체: `KnowledgeGraph` JSON

`/understand` 출력 (`<PROJECT_ROOT>/.understand-anything/knowledge-graph.json`):

```json
{
  "version": "1.0.0",
  "project": {
    "name": "...",
    "description": "...",
    "languages": ["typescript", "..."],
    "frameworks": ["React", "..."],
    "analyzedAt": "<ISO8601>",
    "gitCommitHash": "..."
  },
  "nodes": [
    { "id": "file:src/App.tsx", "type": "file", "name": "App.tsx",
      "filePath": "src/App.tsx", "summary": "...", "tags": [...],
      "complexity": "moderate", "languageNotes": "..." }
  ],
  "edges": [
    { "source": "file:src/A.ts", "target": "file:src/B.ts",
      "type": "imports", "direction": "forward", "weight": 0.7 }
  ],
  "layers": [
    { "id": "layer:api", "name": "API", "description": "...",
      "nodeIds": ["file:src/api/route.ts", ...] }
  ],
  "tour": [
    { "order": 1, "title": "Project Overview",
      "description": "...", "nodeIds": ["document:README.md"],
      "languageLesson": "..." }
  ]
}
```

### 3.3 13 Node Type 표

| Type | ID Convention | 비고 |
|---|---|---|
| `file` | `file:<relative-path>` | 소스 코드 파일 |
| `function` | `function:<path>:<name>` | 함수/메서드 |
| `class` | `class:<path>:<name>` | 클래스/인터페이스/타입 |
| `module` | `module:<name>` | 논리적 모듈/패키지 |
| `concept` | `concept:<name>` | 추상 개념/패턴 |
| `config` | `config:<path>` | YAML/JSON/TOML/env |
| `document` | `document:<path>` | Markdown/RST/TXT |
| `service` | `service:<path>` | Dockerfile/K8s |
| `table` | `table:<path>:<name>` | DB 테이블/마이그레이션 |
| `endpoint` | `endpoint:<path>:<name>` | API 라우트 |
| `pipeline` | `pipeline:<path>` | CI/CD 설정 |
| `schema` | `schema:<path>` | GraphQL/Protobuf/Prisma |
| `resource` | `resource:<path>` | Terraform/CloudFormation |

`/understand-domain` 추가: `domain` · `flow` · `step`. `/understand-knowledge` 추가: `article` · `entity` · `topic` · `claim` · `source`.

### 3.4 26 Edge Type — weight convention

| Category | Types | Weight 예 |
|---|---|---|
| Structural | imports, exports, contains, inherits, implements | contains 1.0 · inherits/implements 0.9 · imports 0.7 |
| Behavioral | calls, subscribes, publishes, middleware | calls 0.8 |
| Data flow | reads_from, writes_to, transforms, validates | default 0.5 |
| Dependencies | depends_on, tested_by, configures | depends_on/configures 0.6 · tested_by 0.5 |
| Semantic | related, similar_to | default 0.5 |
| Infrastructure | deploys, serves, provisions, triggers | deploys 0.7 · triggers 0.6 · serves/provisions 0.5 |
| Schema/Data | migrates, documents, routes, defines_schema | migrates 0.7 · defines_schema 0.8 · documents/routes 0.5 |

`tested_by` 엣지는 **always production → test** 방향. merge 스크립트의 2-pass linker가 LLM이 뒤집어 emit한 엣지를 자동 flip하고, 양쪽이 test거나 양쪽이 prod인 엣지는 *드롭*한다. production 노드는 자동으로 `"tested"` tag 획득.

### 3.5 Agent 9종 책임 분담

| Agent | Skill에서 호출 | 책임 |
|---|---|---|
| `project-scanner` | `/understand` Phase 1 | 파일 인벤토리 + 언어/프레임워크 + importMap |
| `file-analyzer` | `/understand` Phase 2 | 배치당 GraphNode/Edge 생성 (5 concurrent) |
| `architecture-analyzer` | `/understand` Phase 4 | layer 배정 (디렉토리 트리 + 언어/프레임워크 컨텍스트 합성) |
| `tour-builder` | `/understand` Phase 5 | guided learning tour 생성 (README + entry point 정렬) |
| `graph-reviewer` | `/understand --review` Phase 6 | LLM 그래프 검증 (default는 deterministic Node script) |
| `assemble-reviewer` | `/understand` Phase 3 | merge 직후 통합 그래프 review |
| `domain-analyzer` | `/understand-domain` | business domain·flow·step 추출 |
| `article-analyzer` | `/understand-knowledge` Phase 3 | wiki article의 *implicit* 관계만 추출 (wikilink 중복 금지) |
| `knowledge-graph-guide` | dashboard chat | graph 구조 가이드 |

### 3.6 8개 Skill 명령

| Skill | 인자 | 효과 |
|---|---|---|
| `/understand` | `[path] [--full|--auto-update|--no-auto-update|--review|--language <lang>]` | 7-phase 분석 → `knowledge-graph.json` |
| `/understand-dashboard` | — | React Flow 대시보드 launch (`/understand` 직후 자동 실행) |
| `/understand-chat` | `[query]` | knowledge graph 기반 Q&A |
| `/understand-diff` | — | 현 git diff의 영향 분석 (그래프 위에서 ripple effect) |
| `/understand-explain` | `<file or function>` | 특정 파일/함수 deep-dive |
| `/understand-onboard` | — | 신규 팀원용 onboarding 가이드 생성 |
| `/understand-domain` | `[--full]` | business domain 그래프 (수평 flow 시각화) |
| `/understand-knowledge` | `<wiki-directory>` | Karpathy LLM wiki 분석 (force-directed layout) |

### 3.7 `parse-knowledge-base.py` — Karpathy LLM Wiki 감지 정규식

```python
WIKILINK_RE     = r"\[\[([^\]|]+)(?:\|([^\]]+))?\]\]"
FRONTMATTER_RE  = r"^---\s*\n(.*?)\n---\s*\n"  # DOTALL
CODE_BLOCK_RE   = r"```(\w*)"
HEADING_RE      = r"^(#{1,6})\s+(.+)$"          # MULTILINE
INDEX_SECTION_RE = r"^##\s+(.+)$"

INFRA_FILES = {"index.md", "log.md", "claude.md", "agents.md", "soul.md"}
```

감지 신호: `index.md` 존재 + 마크다운 파일 ≥ 3개가 primary signal. `wiki/` 하위 폴더가 있으면 그것을 wiki root로 채택, 없으면 directory 자체. `raw/` 디렉토리와 `CLAUDE.md`/`AGENTS.md` schema 파일은 부수 신호.

### 3.8 `article-analyzer` agent의 *anti-duplication* 규칙

scan 단계의 데터미니스틱 wikilink가 이미 `related` edge로 잡혀있기 때문에, LLM이 같은 관계를 다시 emit하지 않도록 명시:

> 1. **Do NOT duplicate wikilink edges.** The parse script already created `related` edges for every `[[wikilink]]`. Your job is to find what the wikilinks missed.
> 2. **Be conservative.** Only create edges with clear textual evidence. A vague thematic similarity is not enough.
> 3. **Deduplicate entities.** If the same person/tool appears in multiple articles, create the entity node once.
> 4. **Use existing IDs.** When creating edges to existing articles, use their exact `id` from the provided node list.
> 5. **Keep it small.** For a batch of 10-15 articles, expect ~5-15 entities, ~5-10 claims, and ~10-20 implicit edges. Don't over-extract.

Implicit edge 5종(`builds_on`/`contradicts`/`exemplifies`/`authored_by`/`cites`)만 허용.

### 3.9 Dashboard 디자인 결정 (`CLAUDE.md` 명시)

- Dark luxury theme: deep blacks(`#0a0a0a`), gold/amber accents(`#d4a574`), DM Serif Display typography
- Graph-first layout: 75% graph + 360px right sidebar
- ChatPanel / Monaco Editor 없음 (의도적 단순화)
- Sidebar tabs: `Info`(persona-adaptive: ProjectOverview 기본 → NodeInfo on select → LearnPanel in Learn persona) + `Files`(구조 그래프에서 파생된 FileExplorer tree)
- Code viewer: `prism-react-renderer` 기반, 파일 노드 클릭 시 하단에서 슬라이드 업, expand 버튼으로 full-screen modal. 소스 콘텐츠는 dev 서버의 `/file-content.json` endpoint에서 fetch — **access token + 그래프 derived path allowlist gating**
- Schema validation on graph load with error banner

### 3.10 팀 공유 패턴

> "The graph is just JSON — commit it once, and teammates skip the pipeline."

저장 권장 `.gitignore`:

```gitignore
.understand-anything/intermediate/
.understand-anything/diff-overlay.json
```

10 MB+ 그래프는 git-lfs:
```bash
git lfs install
git lfs track ".understand-anything/*.json"
```

샘플: README가 `Lum1104/microservices-demo` 포크(Go/Java/Python/Node, GoogleCloudPlatform microservices-demo)에 커밋된 graph를 reference로 인용.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

본 저장소는 **정량 벤치마크를 직접 제공하지 않는다.** 다음 정성 신호만 README/리포지토리에서 확인 가능:

- **다중 플랫폼 호환성 표(15개 플랫폼)**: Claude Code(native), Cursor(auto-discovery), VS Code+Copilot, Codex, OpenCode, Gemini CLI 등 — 모두 `install.sh` 또는 native 경로로 지원. `update`/`uninstall` 명령 포함.
- **다국어 (7개)** README + `--language` CLI 플래그.
- **Trendshift badge** (`/repositories/23482`) — 트렌드 등록 저장소.
- **Community walkthrough** by *Better Stack* (YouTube `VmIUXVlt7_I`).
- **Reference 데모 데이터셋**: GoogleCloudPlatform microservices-demo의 Lum1104 fork. Live demo는 `understand-anything.com/demo/`.
- **3,000 노드 fake graph generator** (`scripts/generate-large-graph.mjs`) — 대시보드 레이아웃 성능 회귀 테스트용 (production pipeline 미포함).

`/understand`의 토큰 비용은 SKILL.md의 issue 인용 ("paying ~157k tokens / ~158s per incremental run" — Phase 1 scan-result 재생성을 피하기 위한 issue #293)에서 *간접적으로* 드러난다: 한 번의 incremental 분석에 평균 수십초~수분, full 분석은 코드베이스 크기 비례.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **벤치마크 데이터 부재.** 그래프 품질, recall, edge correctness를 정량 측정한 결과는 저장소에 포함되지 않음. "graph-reviewer" agent와 deterministic inline validation이 *내부 일관성*만 검증한다. 다른 codebase comprehension 도구(Sourcegraph, Cursor codebase indexing 등)와의 비교 표 부재.
- **LLM 비용 의존성.** Phase 2(file-analyzer) batch당 LLM 호출이 코어 코스트. 5 concurrent로 병렬화하지만 코드베이스 크기에 비례 → 대형 monorepo에서는 `.understandignore`로 명시적 scoping이 필수(README가 직접 권장).
- **Claude Code 중심 설계의 잔재.** 15개 플랫폼 호환을 표방하지만 agent dispatch / skill / plugin 메타포 자체가 Claude Code/Anthropic 생태계 기반. 다른 플랫폼에서의 dispatch 의미론(병렬도, 비동기, retry 등) 일관성은 운영자 책임. 실제로 `model: "inherit"` issue #167은 opencode 호환을 위해 *frontmatter에서 model 필드를 누락*하는 우회를 채택.
- **graph schema 진화 비용.** 26 edge type + 13 node type + edge weight convention이 SKILL.md에 *문서*로만 존재 — `core/schema.ts`의 JSON Schema와 실제 file-analyzer agent prompt 사이의 drift가 검증되지 않으면 dangling reference나 type mismatch 발생 가능. merge 스크립트의 "dangling-edge dropper"가 safety net이지만, 본질적으로 *후처리 cleanup*에 의존.
- **Karpathy wiki 분석의 implicit-edge 보수성 한계.** `article-analyzer.md` rule은 "vague thematic similarity is not enough"이라 *false negative*에 편향. 예: 두 article이 같은 모델·같은 데이터셋·같은 핵심 발견을 다루더라도, 텍스트에 명시적 인용이 없으면 implicit edge 미생성. wiki의 "지식 복리" 가치는 이 implicit edge를 통한 새로운 발견에 있는데, 보수적 prompt가 그것을 제약.
- **Git worktree에서 영구 저장 불가.** issue #133 — worktree에서 `.understand-anything/`을 쓰면 세션 종료 시 파괴됨. SKILL.md가 worktree redirect 로직을 명시했지만, 우회 환경 변수(`UNDERSTAND_NO_WORKTREE_REDIRECT=1`)는 *worktree별 격리된 그래프*가 필요할 때 사용자가 직접 설정해야 함.
- **Phase 7 fingerprint 의존성**: issue #152 — fingerprint 생성이 실패하면 `meta.json`을 쓰지 않아야 한다는 "must succeed before" 가드가 있지만, 그래프 자체는 이미 저장된 상태가 되어 *partial state*가 발생.
- **dashboard 보안 모델의 단순성**: code viewer가 dev 서버의 `/file-content.json`에서 fetch + access token + path allowlist를 사용하지만 — production 배포(`.understand-anything/`을 팀에 커밋하는 패턴)에서 dashboard를 어떻게 호스팅할지에 대한 가이드는 README에 부재.
- **`/understand-knowledge`는 force-directed 레이아웃 고정** — code 그래프의 hierarchical dagre 레이아웃과 별개. wiki 자료가 *물리적 디렉토리 구조*(예: `wiki/{category}/`)와 *논리적 wikilink 그래프* 둘 다 강한 경우, hierarchical vs force-directed 중 어느 것이 더 적합한지 사용자가 선택 불가.

## 6. 관련 연구 (Related Work)

### 본 wiki 내부 직접 연결

- **Karpathy LLM Wiki 패턴** (이 ai-wiki 프로젝트의 foundation. `karpathy/442a6bf555914893e9891c11519de94f` gist + `karpathy/1dd0294ef9567971c1e4348a90d69285`). `/understand-knowledge` skill의 분석 대상이 정확히 이 wiki 같은 자료. 본 wiki에 별도 자료로 미수록.
- **wiki/applications/garrytan-gbrain** (`/applications/garrytan-gbrain`) — markdown-first AI agent memory + KG. Understand-Anything의 *knowledge-graph as JSON commit* 패턴은 gbrain의 *markdown=source of truth + git* 철학과 같은 가족. 차이: gbrain은 *agent의 메모리*, Understand-Anything은 *코드/지식의 시각화 도구*.
- **wiki/applications/liu-2026-rag-llm-wiki-or-gbrain** (`/applications/liu-2026-rag-llm-wiki-or-gbrain`) — Liu의 retrieve/compile/act 3-축 분류. Understand-Anything의 `/understand-knowledge`는 *compile* 축(LLM wiki를 compiled artifact로 보는 관점)의 production 도구다.
- **wiki/database/vectifyai-pageindex** (`/database/vectifyai-pageindex`) — vectorless RAG. Understand-Anything도 *vector embedding 없이* (실제로는 `embedding-search.ts`가 있지만 main path 아님) `core/search.ts`의 fuzzy + semantic 검색으로 retrieval. 비슷한 "구조 기반 retrieval" 모티프. PageIndex가 *document hierarchical tree*라면 Understand-Anything은 *code knowledge graph*.
- **wiki/database/hkuds-rag-anything** (`/database/hkuds-rag-anything`) — Multimodal RAG의 reference implementation. RAG-Anything이 *parser + ModalProcessor + 3-mode query*로 multimodal을 통합한다면 Understand-Anything은 *tree-sitter + LLM agent + 8 skill*로 codebase + wiki를 통합. 둘 다 "pluggable parser" 패턴.
- **wiki/agents/lee-hoyeon-2026-harness-engineering** (`/agents/lee-hoyeon-2026-harness-engineering`) — Harness Engineering의 6축 순환과 single/subagent/team mode 분류. Understand-Anything은 *team mode* 구현의 production 예시: project-scanner → file-analyzer × 5 concurrent → architecture-analyzer → tour-builder의 *generator/evaluator 분리*가 그대로 적용. `--review` 플래그가 그 분리를 옵션화한 형태.
- **wiki/agents/dennis-2026-compiling-agentic-workflows-into-llm** (`/agents/dennis-2026-compiling-agentic-workflows-into-llm`) — *surface orchestration vs subterranean compilation*. Understand-Anything은 명확히 *surface orchestration* 진영(9 agent + 8 skill + 7 phase pipeline 모두 prompt 단에서 운영). 향후 자체 agent를 compile해 비용 절감하는 후속작 가능성.

### 외부 참조 (본 wiki 미수록)

- **Tree-sitter** (Atom 팀, Max Brunsfeld 등). Understand-Anything이 `web-tree-sitter`(WASM) 사용. 35+ 언어 grammar 지원.
- **React Flow** + **Zustand** + **TailwindCSS v4** — dashboard 스택. force-directed + dagre 레이아웃 자체는 `elkjs` ELK 사용 (`elk-layout.test.ts` 존재).
- **graphology** + **graphology-communities-louvain** — `@understand-anything/skill` 의존성. Louvain community detection으로 wiki 그래프의 클러스터링.
- **Prism + `prism-react-renderer`** — dashboard 코드 뷰어.
- **Astro** — `homepage/` (understand-anything.com).
- **GoogleCloudPlatform/microservices-demo** — Lum1104 fork가 reference 데모 데이터셋.
- **FinanceBench** (Islam et al., arXiv 2311.11944) — 본 wiki vectifyai-pageindex source에 언급. Understand-Anything과 직접 관련 없음.

## 7. 용어집 (Glossary)

- **Understand-Anything plugin**: 단일 OSS 플러그인이 15개 AI 코딩 플랫폼(Claude Code, Cursor, VS Code+Copilot, Codex, Gemini CLI 등)에서 동작하도록 `.claude-plugin`/`.cursor-plugin`/`.copilot-plugin` 메타파일 동시 유지 + `install.sh` symlink 스위처로 호환성 달성.
- **KnowledgeGraph JSON**: `.understand-anything/knowledge-graph.json` 단일 파일. `{version, project, nodes[], edges[], layers[], tour[]}` 6-key. 그 파일을 *팀에 commit*하면 다른 사람은 분석 파이프라인 없이 dashboard만 띄우면 됨.
- **`.understand-anything/`**: 출력 디렉토리. 영구 산출물(`knowledge-graph.json`, `meta.json`, `config.json`, `.understandignore`, `scan-result.json`)과 일회성(`intermediate/`, `tmp/`, `diff-overlay.json`)이 공존. `.gitignore`에 `intermediate/`와 `diff-overlay.json`만 추가하는 convention.
- **importMap**: project-scanner가 사전 해석한 `{file → [imported files]}` 매핑. file-analyzer 배치에 `batchImportData`로 주입돼 LLM이 *import 재해석* 안 함. tree-sitter 결과의 결정론적 저장 매체.
- **neighborMap**: 배치 외부 이웃 파일의 export symbol 목록. file-analyzer가 cross-batch edge를 *high confidence*로 emit하기 위한 컨텍스트. import는 `batchImportData`(fully resolved)를, function call 같은 시그널은 `neighborMap`(symbol hint)을 사용.
- **fingerprint**: tree-sitter 기반 구조 해시. 같은 파일의 *코스메틱* 변경(공백/주석)은 fingerprint 불변, *구조적* 변경(함수 추가, 시그니처 변경)은 fingerprint 변화. `change-classifier.ts`가 STRUCTURAL vs COSMETIC을 판단해 STRUCTURAL일 때만 LLM 재분석. fingerprint baseline은 Phase 7에서 *반드시* 그래프 저장 직후 `meta.json` 쓰기 *전*에 생성되어야 함 (issue #152).
- **`/understand-knowledge`**: Karpathy LLM wiki 패턴(예: 이 ai-wiki) 전용. wikilink와 `index.md` 카테고리는 정규식으로 추출 후, `article-analyzer` LLM이 *implicit* 관계 5종(builds_on/contradicts/exemplifies/authored_by/cites)만 보완. dashboard는 hierarchical dagre 대신 force-directed layout + Louvain community clustering으로 렌더.
- **kind**: KnowledgeGraph의 `kind` 필드. `"code"`(default)와 `"knowledge"`(`/understand-knowledge`가 부여) 두 값. dashboard 레이아웃 선택의 결정자.
- **Persona-adaptive UI**: dashboard sidebar가 "junior dev / PM / power user" 페르소나에 따라 정보 밀도 자동 조정. Learn persona는 `LearnPanel`(language concept 강의)을 보여줌.
- **Guided tour**: README + entry point 기반으로 순서가 정해진 학습 단계. 각 step은 `{order, title, description, nodeIds, languageLesson?}`. tour-builder agent가 dependency 순서로 자동 정렬.
- **Worktree redirect**: `git worktree`는 ephemeral이라 `.understand-anything/`이 세션 종료 시 파괴되는 issue #133을 회피하기 위해 `/understand`가 자동으로 main repo root로 출력을 redirect. `UNDERSTAND_NO_WORKTREE_REDIRECT=1`로 무력화 가능.
- **`tested_by` linker**: merge 스크립트의 2-pass 규칙. Pass 1은 LLM이 잘못 뒤집은 edge를 in-place flip + 양쪽이 test/양쪽이 prod인 edge 드롭; Pass 2는 path convention(예: `__tests__/`, `*.test.ts`)으로 보완 페어링. production 노드는 자동으로 `"tested"` tag 획득.
- **language directive**: 모든 LLM agent prompt 끝에 주입되는 `$LANGUAGE_DIRECTIVE`. summary/description/tag/title/languageNotes/languageLesson을 지정 언어로 생성하되 기술 용어는 영어 유지 ("middleware", "hook", "barrel"). dashboard UI 라벨도 영향. `outputLanguage`는 `config.json`에 저장돼 incremental run에서도 일관성 유지.
- **`.understandignore`**: `.gitignore` 문법(globs/`#`/`!`/trailing `/`). `.gitignore`에서 deduplication된 후보 + 빌트인 default(`node_modules/`, `dist/`, `*.lock`, `*.min.js` 등)를 주석 처리 상태로 생성. 사용자가 *명시적으로 확인*해야 다음 phase 진행 (Phase 0.5 gate).
- **Trendshift**: GitHub 트렌딩 + 추천 큐레이션 서비스. Understand-Anything은 `/repositories/23482`로 등록.
