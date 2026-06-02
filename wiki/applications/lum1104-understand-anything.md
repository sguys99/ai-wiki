---
title: "Lum1104/Understand-Anything"
type: repo
year: 2026
category: applications
raw_path: /Users/kmyu/Desktop/project/ai-wiki/raw/repos/lum1104-understand-anything
raw_filename: "lum1104-understand-anything/"
source_collection: external
source: lum1104-understand-anything.md
tags: [code-understanding, knowledge-graph, multi-agent-pipeline, tree-sitter, llm-hybrid, claude-code-plugin, karpathy-llm-wiki, dashboard, incremental-analysis, monorepo]
org: "Lum1104"
repo: "Understand-Anything"
url: "https://github.com/Lum1104/Understand-Anything"
license: "MIT"
---

## 요약 (Summary)

Lum1104/Understand-Anything(v2.7.5, MIT)은 *"새 팀에 합류했는데 코드베이스가 20만 줄, 어디서 시작?"* 라는 onboarding 문제를 **multi-agent pipeline**으로 정공법으로 푼 OSS 도구다. `/understand` 명령이 7-phase 파이프라인(project-scanner → 1.5 compute-batches → file-analyzer × 5 concurrent → assemble-reviewer → architecture-analyzer → tour-builder → review → save)을 오케스트레이션해 `.understand-anything/knowledge-graph.json`(13 node type · 26 edge type · layer + guided tour)을 만들고, React Flow + Zustand + TailwindCSS v4 dashboard로 시각·탐색하게 한다.

핵심 설계 결정 셋: ① **tree-sitter(deterministic) + LLM(semantic) hybrid** — 구조적 사실은 결정론적, 자연어 의도는 LLM으로 분리. `web-tree-sitter`(WASM)을 native binding 대신 사용하는 이유는 darwin/arm64 + Node 24 호환성. ② **fingerprint 기반 incremental update** — `change-classifier.ts`로 STRUCTURAL vs COSMETIC 판단, 구조 변경 파일만 재분석. ③ **15개 플랫폼 지원** (Claude Code native + Cursor/VS Code Copilot auto-discovery + Codex/OpenCode/Gemini CLI/Hermes 등 install.sh symlink 스위처).

본 wiki 관점에서 가장 중요한 점: **Karpathy LLM Wiki 패턴 first-class 지원**. `/understand-knowledge` skill + `article-analyzer` agent + `parse-knowledge-base.py` 데터미니스틱 파서가 `index.md` + 다수 `.md` + 옵셔널 `raw/` + 옵셔널 `CLAUDE.md`/`AGENTS.md` 구조를 감지하고, wikilink(`[[target]]`)·frontmatter·heading·`index.md` 섹션을 정규식으로 추출한 뒤, LLM이 **explicit wikilink가 잡지 못한 implicit 관계만** 5종 edge(`builds_on` 0.8 · `contradicts` 0.9 · `exemplifies` 0.7 · `authored_by` 0.6 · `cites` 0.7)로 보완. 즉 이 `ai-wiki` 프로젝트의 자료 그래프를 그대로 시각화·탐색 가능. dashboard는 hierarchical dagre가 아니라 force-directed + Louvain community clustering으로 렌더링.

## 주요 기여 (Key Contributions)

1. **Multi-agent codebase comprehension pipeline의 production-grade reference implementation.** `/understand` SKILL.md(852 lines)이 7-phase orchestration을 표준화. file-analyzer는 *최대 5 concurrent*, 배치당 20-30 파일. 출력 파일명 규칙 `batch-<batchIndex>.json` / `batch-<batchIndex>-part-<k>.json`을 어기면 merge 스크립트가 *조용히 드롭*하는 운영 함정까지 명시.

2. **Tree-sitter + LLM 역할 분리 명문화.** `project-scanner`가 미리 해석한 `importMap`을 `file-analyzer` 배치에 `batchImportData`로 주입 — LLM이 import를 *재해석하지 않게* 강제. cross-batch edge 신뢰도 보강을 위해 `neighborMap`(외부 배치 이웃 파일의 export symbol 목록)도 함께 전달.

3. **표준화된 KnowledgeGraph 스키마**: 13 node type(file/function/class/module/concept/config/document/service/table/endpoint/pipeline/schema/resource) + 26 edge type(Structural/Behavioral/Data flow/Dependencies/Semantic/Infrastructure/Schema-Data 7 카테고리) + edge weight convention(`contains` 1.0 · `inherits/implements` 0.9 · `calls/exports/defines_schema` 0.8 · `imports/deploys/migrates` 0.7 · `depends_on/configures/triggers` 0.6 · `tested_by/documents/provisions/serves/routes` 0.5). `tested_by` 엣지는 always production→test 방향 — merge 스크립트가 LLM이 뒤집은 엣지를 자동 flip + 양쪽 prod/양쪽 test 엣지 드롭.

4. **Karpathy LLM Wiki를 first-class citizen으로.** `parse-knowledge-base.py`가 wikilink(`\[\[([^\]|]+)(?:\|([^\]]+))?\]\]`)와 `index.md` `## 섹션` 카테고리를 데터미니스틱하게 추출하고, `article-analyzer` agent는 5가지 implicit edge 타입(`builds_on`·`contradicts`·`exemplifies`·`authored_by`·`cites`)만 추출하도록 prompt 가이드. **이 ai-wiki에 그대로 적용 가능**.

5. **Incremental update + structural fingerprint.** `--auto-update` post-commit hook이 fingerprint 비교로 *바뀐 파일만* 재분석. `staleness.ts`가 노드별 stale 판정. **issue #152 가드**: Phase 7에서 fingerprint baseline 생성이 실패하면 `meta.json`을 *쓰지 않음* → 다음 incremental이 모든 파일을 STRUCTURAL로 분류해 매번 FULL_UPDATE로 escalate되는 회귀 방지.

6. **Localized output 전 파이프라인 침투.** `--language <iso639>` 플래그가 `outputLanguage`를 `config.json`에 영구 저장하고, 모든 agent prompt 끝에 `$LANGUAGE_DIRECTIVE`를 주입. 영향 범위: node summary/description/tag/title/languageNotes + dashboard UI + guided tour. `locales/ko.md` 같은 언어별 가이드 파일이 layer 이름과 tag convention을 별도 정의. **단, node type prefix · ID · edge type 이름은 영어 유지** (데이터 호환성 분리).

7. **15개 플랫폼 단일 코드베이스.**
   - 5개 `plugin.json`/`package.json` 동시 bump 강제(`.claude-plugin` + `.cursor-plugin` + `.copilot-plugin` + `understand-anything-plugin/.claude-plugin` + `understand-anything-plugin/package.json`)
   - **Agent frontmatter에서 `model` 필드 누락** — `inherit`이 Claude Code-only keyword였고 opencode가 이를 literal model id로 받아 `ProviderModelNotFoundError`로 거절했던 issue #167 대응
   - `install.sh` (Bash) / `install.ps1` (PowerShell) 양쪽 — `~/.understand-anything/repo`에 클론 + 플랫폼별 symlink 생성 + `--update` / `--uninstall <platform>` 지원

8. **팀 공유: graph as JSON commit.** `.understand-anything/knowledge-graph.json`을 git에 커밋 — 팀원은 파이프라인 없이 dashboard만 띄우면 됨. 10 MB+는 git-lfs. Reference 데모: `Lum1104/microservices-demo` fork(Go/Java/Python/Node).

## 방법론 및 아키텍처 (Methodology and Architecture)

### 7-Phase Pipeline

| Phase | Skill 구성 | 결정론 (Deterministic) | LLM (Semantic) |
|---|---|---|---|
| 0 | Pre-flight | git worktree redirect, plugin root 4-candidate fallback, language directive 파싱 | — |
| 0.5 | `.understandignore` 생성 + 사용자 confirm gate | `.gitignore` dedup + 빌트인 default 머지 | — |
| 1 | SCAN | `scan-project.mjs`(git ls-files / recursive walk + 언어/카테고리/lines) + `extract-import-map.mjs`(tree-sitter import 해석) | `project-scanner` agent가 README + manifest 읽고 narrative `name`/`description`/`frameworks`/`languages` 합성 |
| 1.5 | BATCH | `compute-batches.mjs`(import graph topology 기반 semantic batch, `--changed-files`로 incremental) | — |
| 2 | ANALYZE | `extract-structure.mjs`(tree-sitter + 비-코드 파일용 specialized parser) | `file-analyzer` agent 최대 5 concurrent — summary/tag/complexity/languageNotes + cross-batch edge 생성. **출력 파일명은 반드시 `batch-<N>.json` 또는 `batch-<N>-part-<k>.json`** — merge regex가 다른 이름은 silent drop. 머지: `merge-batch-graphs.py`(노드 ID 정규화 + complexity 정규화 + dangling edge 드롭 + `tested_by` 2-pass linker) |
| 3 | ASSEMBLE REVIEW | — | `assemble-reviewer` agent가 통합 그래프 검증 |
| 4 | ARCHITECTURE | `languages/<id>.md` + `frameworks/<id>.md` + `locales/<lang>.md` 컨텍스트 자동 합성 | `architecture-analyzer` agent가 layer 배정. 출력 normalize 5-step: envelope unwrap → field rename(`nodes`→`nodeIds`) → ID 합성(`layer:<kebab>`) → file path 변환 → dangling ref 드롭 |
| 5 | TOUR | — | `tour-builder` agent가 README + entry point에 정렬된 guided tour 생성 |
| 6 | REVIEW | **default**: inline Node.js validator(`ua-inline-validate.cjs`) — node id 중복 / edge dangling / file node가 layer에 속함 / tour ref 존재 등 검증 | `--review` 플래그 시 `graph-reviewer` agent (full LLM) |
| 7 | SAVE | `build-fingerprints.mjs`(tree-sitter 구조 해시 baseline). **이 단계 실패하면 `meta.json` 안 씀** (issue #152). intermediate cleanup하되 `scan-result.json`만 보존 (issue #293, ~157k tokens / 158s 절감) | — |

### Karpathy LLM Wiki 분석 분기 (`/understand-knowledge`)

- **Phase 1 DETECT**: `parse-knowledge-base.py` 실행. `has_index` + `md_count >= 3`이 primary signal. 부수 신호: `has_log`, `has_raw`, `has_schema`(`CLAUDE.md`/`AGENTS.md`). `wiki/` 하위 폴더 있으면 그것을 wiki root, 없으면 directory 자체.
- **Phase 2 SCAN (deterministic)**: 파서가 wikilink(`[[target]]` / `[[target|display]]`), frontmatter(`^---\n...\n---\n`), heading(`^#{1,6}\s+`), `index.md` 섹션(`^##\s+`), code block 언어 정규식으로 추출 → `article` 노드 + `source` 노드(`raw/`) + `topic` 노드(`index.md` 섹션) + `related` 엣지(wikilink) + `categorized_under` 엣지(섹션). `index.md`/`log.md`/`claude.md`/`agents.md`/`soul.md`는 infra로 분류 (article 아님).
- **Phase 3 ANALYZE**: `article-analyzer` agent를 배치당 10-15 articles, 동시 3 배치. *Anti-duplication rule*: "Do NOT duplicate wikilink edges. Your job is to find what the wikilinks missed." 5종 implicit edge만 허용: `builds_on`(0.8) · `contradicts`(0.9) · `exemplifies`(0.7) · `authored_by`(0.6) · `cites`(0.7). 배치당 ~5-15 entity / ~5-10 claim / ~10-20 edge 가이드라인.
- **Phase 4 MERGE**: `merge-knowledge-graph.py` — scan-manifest + analysis-batch들 결합, case-insensitive 이름으로 entity dedup, alias map으로 type 정규화, `index.md` 카테고리에서 layer 빌드, 섹션 순서로 tour 빌드.
- **Phase 5 SAVE**: dashboard는 **`kind: "knowledge"`** 시 force-directed layout + Louvain community clustering으로 자동 전환.

### Dashboard 디자인 (CLAUDE.md 명시)

- Dark luxury: 딥 블랙(`#0a0a0a`), gold/amber accent(`#d4a574`), DM Serif Display
- Graph-first: 75% graph + 360px right sidebar
- **ChatPanel/Monaco 없음** (의도적 단순화)
- Sidebar tabs: `Info`(persona-adaptive: ProjectOverview 기본 → NodeInfo on select → LearnPanel in Learn persona) + `Files`(구조 그래프 derived FileExplorer tree)
- Code viewer: `prism-react-renderer`, 하단 슬라이드 업 + expand→full-screen modal. 소스는 dev 서버 `/file-content.json` endpoint에서 fetch, **access token + 그래프-derived path allowlist gating**

## 결과 (Results)

본 저장소는 정량 벤치마크를 제공하지 않는다. 정성 신호:

- **15개 플랫폼 호환** (Claude Code, Cursor, VS Code+Copilot, Copilot CLI, Codex, OpenCode, OpenClaw, Antigravity, Gemini CLI, Pi Agent, Vibe CLI, Hermes, Cline, KIMI CLI, Trae)
- **7개 언어 README** (영어 + zh-CN/zh-TW/ja/ko/es/tr/ru) + `--language` 출력 i18n
- **Trendshift 등록** (`/repositories/23482`) + YouTube community walkthrough (Better Stack)
- Reference 데모: `Lum1104/microservices-demo` fork (GoogleCloudPlatform microservices-demo 기반)
- Live demo: `understand-anything.com/demo/`

**한계**: 그래프 품질·recall·edge correctness 정량 측정 부재. LLM 호출 비용이 코드베이스 크기에 비례(5 concurrent로 병렬화하지만 본질 한계). `article-analyzer`의 보수적 prompt("vague thematic similarity is not enough")가 wiki 자료에서 false negative에 편향 — 즉 *지식 복리의 가장 흥미로운 새 연결*을 놓칠 가능성. dashboard 보안 모델은 dev 서버 가정(production 호스팅 가이드 부재).

## 이 ai-wiki에의 시사점 (Implications for this ai-wiki)

1. **`/understand-knowledge`를 그대로 적용 가능.** 이 wiki는 `index.md` + 다수 `.md`(wiki/) + `raw/` + `CLAUDE.md` 구조이므로 `parse-knowledge-base.py`가 즉시 감지하고 article(`wiki/**/*.md`) + source(`raw/`) + topic(`index.md` 섹션) + wikilink(`[[overviews/...]]` 등) + 카테고리 엣지를 추출. **단 정규식 가정 확인 필요**: 이 wiki의 wikilink가 `[[category/stem|display]]` 형식인데 `WIKILINK_RE = \[\[([^\]|]+)(?:\|([^\]]+))?\]\]`는 `category/stem`을 그대로 target으로 가져갈 것 — wiki 구조와 호환됨.

2. **`tags` convention 충돌 가능성.** Understand-Anything이 `["entity"]`, `["claim"]` 같은 영문 tag를 자동 생성하는데, 이 wiki는 영문 식별자/한글 본문 정책이라 dashboard에서 보기에는 일관성 유지. 다만 `--language ko` 옵션은 `summary`/`description` 한글화만 영향 — type/ID/edge type은 영어 유지라는 분리가 본 wiki의 "식별자는 영문" 정책과 정확히 일치.

3. **Implicit edge 5종**(builds_on/contradicts/exemplifies/authored_by/cites)이 본 wiki의 `wiki/overviews/`(지식 복리) 페이지 생성 패턴과 직접 대응. 예: `overviews/lightrag-family-graph-rag-overview`에서 RAG-Anything이 LightRAG를 `builds_on`, LeanRAG가 LightRAG를 `builds_on`이라는 식의 명시적 edge가 wiki에서 시각화 가능.

4. **dashboard force-directed + Louvain clustering이 wiki의 "방법 기준 분류"를 검증할 수 있다.** category가 아닌 *content 기반* clustering이 다른 그룹을 그리면, CLAUDE.md의 "이 자료가 정말 이 카테고리에 있어야 하는가?" 의사 결정에 데이터 근거 제공.

## 관련 페이지 (Related Pages)

- [[applications/garrytan-gbrain|garrytan/gbrain (repo)]] — markdown-first agent memory + git=source of truth. Understand-Anything의 *graph-as-JSON commit* 패턴과 같은 가족 (gbrain은 agent memory, Understand-Anything은 코드 시각화).
- [[applications/liu-2026-rag-llm-wiki-or-gbrain|RAG, LLM Wiki, or GBrain?]] — Liu의 retrieve/compile/act 3-축 분류. Understand-Anything의 `/understand-knowledge`는 정확히 **compile** 축의 production 도구.
- [[database/vectifyai-pageindex|VectifyAI/PageIndex (repo)]] — vectorless + 구조 기반 retrieval. PageIndex가 *document hierarchical tree*라면 Understand-Anything은 *code knowledge graph*.
- [[database/hkuds-rag-anything|HKUDS/RAG-Anything (repo)]] — pluggable parser + ModalProcessor 패턴. 둘 다 "parser-driven extraction + LLM enrichment" 구조.
- [[agents/lee-hoyeon-2026-harness-engineering|Harness Engineering]] — Understand-Anything은 *team mode* + *generator/evaluator 분리*(`--review` 플래그)의 production 구현 예.
- [[agents/dennis-2026-compiling-agentic-workflows-into-llm|Compiling Agentic Workflows]] — Understand-Anything은 명확히 *surface orchestration* 진영. 향후 자체 agent를 weight로 컴파일하는 후속 가능성을 비교 가능.
- [[overviews/lightrag-family-graph-rag-overview|LightRAG 계열 Graph-based RAG]] — Understand-Anything의 `article-analyzer` 5종 implicit edge가 이런 overview 페이지를 데이터-driven으로 생성하기 위한 빌딩 블록.
- [[overviews/gbrain-ecosystem-overview|GBrain 생태계]] — gbrain의 "verification runbook"과 Understand-Anything의 inline Node.js validator(`ua-inline-validate.cjs`)는 *결정론적 검증* 같은 철학.
