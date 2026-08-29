---
title: "claude-obsidian: Self-Organizing AI Second Brain for Obsidian + Claude Code"
type: repo
year: 2026
category: applications
raw_path: raw/repos/agricidaniel-claude-obsidian.md
raw_filename: "agricidaniel-claude-obsidian.md"
source_collection: external
org: "AgriciDaniel"
repo: "claude-obsidian"
url: "https://github.com/AgriciDaniel/claude-obsidian"
license: "MIT"
tags:
  - obsidian
  - claude-code
  - claude-code-plugin
  - llm-wiki
  - karpathy-pattern
  - knowledge-base
  - second-brain
  - pkm
  - methodology-modes
  - hybrid-retrieval
  - multi-writer-safety
  - agent-skills
figures:
  - id: fig01
    file: assets/agricidaniel-claude-obsidian/vault-flow.svg
    raw: raw/repos/agricidaniel-claude-obsidian/assets/diagrams/vault-flow.svg
    caption: "Vault flow — sources land in .raw/, /wiki-ingest agent produces entity/concept/source pages, updates index·log·hot cache; /wiki-query reads cache → index → pages in order."
    strategy: manual
    curated: true
  - id: fig02
    file: assets/agricidaniel-claude-obsidian/multi-writer-locking.svg
    raw: raw/repos/agricidaniel-claude-obsidian/assets/diagrams/multi-writer-locking.svg
    caption: "Multi-writer safety (v1.7+) — per-file advisory lock via wiki-lock.sh. Two parallel writers attempt the same page; one is granted, the other retries on the next pass. PostToolUse auto-commit defers while locks are held."
    strategy: manual
    curated: true
  - id: fig03
    file: assets/agricidaniel-claude-obsidian/hybrid-retrieval.svg
    raw: raw/repos/agricidaniel-claude-obsidian/assets/diagrams/hybrid-retrieval.svg
    caption: "Hybrid retrieval (v1.7+, opt-in) — query feeds BM25 sparse + optional contextual-prefix Anthropic API call; both feed cosine rerank via local ollama. +32pp top-1 vs v1.6 baseline (50-query benchmark)."
    strategy: manual
    curated: true
  - id: fig04
    file: assets/agricidaniel-claude-obsidian/dragonscale-mechanism-overview.svg
    raw: raw/repos/agricidaniel-claude-obsidian/wiki/meta/dragonscale-mechanism-overview.svg
    caption: "DragonScale Memory mechanism overview — optional opt-in extension (log folds, deterministic page addresses, semantic tiling lint, boundary-first autoresearch)."
    strategy: manual
    curated: false
  - id: fig05
    file: assets/agricidaniel-claude-obsidian/dragonscale-frontier-graph.svg
    raw: raw/repos/agricidaniel-claude-obsidian/wiki/meta/dragonscale-frontier-graph.svg
    caption: "DragonScale frontier graph — boundary-first autoresearch picks the vault's epistemic frontier (gap-adjacent pages) as research targets."
    strategy: manual
    curated: false
  - id: fig06
    file: assets/agricidaniel-claude-obsidian/dragonscale-6-test-flow.svg
    raw: raw/repos/agricidaniel-claude-obsidian/wiki/meta/dragonscale-6-test-flow.svg
    caption: "DragonScale 6-step test flow — tiling lint pipeline for chunk-boundary validation via ollama."
    strategy: manual
    curated: false
  - id: fig07
    file: assets/agricidaniel-claude-obsidian/image-example-graph-view.png
    raw: raw/repos/agricidaniel-claude-obsidian/wiki/meta/image-example-graph-view.png
    caption: "Obsidian graph view — color-coded nodes (blue=concepts, green=sources, purple=entities) of a populated claude-obsidian knowledge graph."
    strategy: manual
    curated: false
  - id: fig08
    file: assets/agricidaniel-claude-obsidian/image-example-wiki-map-view.png
    raw: raw/repos/agricidaniel-claude-obsidian/wiki/meta/image-example-wiki-map-view.png
    caption: "Wiki Map canvas — visual hub linking domain pages, concepts, entities."
    strategy: manual
    curated: false
---

## 한 줄 요약 (One-line Summary)

Daniel Agrici가 만든 Claude Code 플러그인 겸 Obsidian vault. Karpathy의 LLM Wiki 패턴을 두 환경(Claude Code 스킬 15개 + Obsidian vault 구조)에 정착시켜, 소스를 떨구면 자동으로 정리되고 질문하면 페이지를 인용해 답하는 자기조직 PKM을 표준화한 reference 구현체다.

## 1. 자료 정보 (Document Information)

- **저장소**: [`AgriciDaniel/claude-obsidian`](https://github.com/AgriciDaniel/claude-obsidian)
- **저자**: Daniel Agrici (`agricidaniel.com`)
- **라이선스**: MIT
- **최신 버전 / 릴리스**: `v1.9.2` (2026-05-27, 2026-05-28 release)
- **블로그 deep dive**: [I Turned Obsidian Into a Self-Organizing AI Brain](https://agricidaniel.com/blog/claude-obsidian-ai-second-brain)
- **계보**: [Andrej Karpathy의 LLM Wiki gist (442a6bf)](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)를 명시적으로 계승. 본 ai-wiki도 같은 계보에 놓여 있어 직접 비교 대상이다.
- **공식 동반 프로젝트**: [`claude-canvas`](https://github.com/AgriciDaniel/claude-canvas)(시각 canvas 오케스트레이션), [`claude-seo`](https://github.com/AgriciDaniel/claude-seo), [`claude-ads`](https://github.com/AgriciDaniel/claude-ads), [`best-practices`](https://github.com/AgriciDaniel/best-practices)(six-cut + agent kernel)
- **두 가지 배포 트랙**: ① 공개 OSS (이 저장소, 권장) ② AI Marketing Hub Pro 미러(`AI-Marketing-Hub/claude-obsidian`, 개발 중 기능 조기 접근). 코어는 동일 MIT.

저장소 통계 (필자 ingest 시점):

- 총 파일 약 211개 (`.git` 제외)
- 최상위 디렉토리: `skills/`(15개), `agents/`(3개), `commands/`(4개), `scripts/`(12개), `tests/`(9개), `bin/`(5개), `_templates/`(5개), `wiki/`(seed vault), `docs/`(가이드 + 감사 + 릴리스 노트), `assets/diagrams/`(아키텍처 SVG 3종), `.claude-plugin/`(plugin manifest), `.obsidian/`(plugin·CSS·workspace), `.vault-meta/`(transport·mode·counter)

## 2. 주요 기여 (Key Contributions)

이 저장소의 핵심 기여는 Karpathy LLM Wiki를 누가 와도 2분 안에 가동시킬 수 있는 형태로 구체화한 점이다. 세부 기여는 다음 6개로 정리된다.

1. **Claude Code 스킬 15개로 LLM Wiki 워크플로우를 모듈화**
   - 오케스트레이터: `wiki`
   - 소스 인제스트: `wiki-ingest`, `save`, `autoresearch`, `defuddle`
   - 질의/유지: `wiki-query`, `wiki-lint`, `wiki-fold`, `wiki-retrieve`
   - Obsidian 통합: `wiki-cli`, `obsidian-markdown`, `obsidian-bases`, `canvas`
   - 라우팅/사고: `wiki-mode`, `think`
   - 각 스킬은 자체 `SKILL.md` + `references/` + (필요 시) `templates/` 패키지로 분리되어 있어, 개별 호출과 조합이 가능하다.

2. **Compound Vault refoundation (v1.7)** — Multi-writer 안전성과 hybrid retrieval을 1차 시민으로 승격
   - **per-file advisory locking** (`scripts/wiki-lock.sh`): `sha1(vault-relative-path)` 키, `STALE_AFTER_SEC=60`, cross-process release 허용. PostToolUse 훅이 잠금 보유 중에는 `git add`를 보류하여 torn commit을 막는다.
   - **hybrid retrieval** (`scripts/{bm25-index,contextual-prefix,rerank,retrieve}.py`): BM25 sparse + Anthropic contextual-prefix (consent-gated `--allow-egress`) + cosine rerank (local ollama). v1.6 baseline 대비 +32pp top-1, -41% 오류 (50-query 벤치마크).
   - **Obsidian CLI를 기본 transport로 채택**: `scripts/detect-transport.sh`가 CLI → mcp-obsidian → mcpvault → filesystem 순으로 폴백한다.

3. **Methodology Modes (v1.8)** — 조직 철학을 1차 시민화
   - 4종 모드: `generic`(기본, v1.7 동작 보존), `LYT`(MOC+atomic), `PARA`(Tiago Forte), `Zettelkasten`(timestamp ID, flat).
   - 라우팅 진실 원천은 `.vault-meta/mode.json`이며, `python3 scripts/wiki-mode.py route <type> "<name>"`가 모드별 file path를 반환해 consumer 스킬에 special-casing이 들어가지 않게 한다.

4. **10-principle thinking framework (v1.9)** — 사고 디스플린을 코드화
   - `OBSERVE-OBSERVE-LISTEN-THINK-CONNECT-CONNECT-FEEL-ACCEPT-CREATE-GROW` 10단계를 `skills/think/SKILL.md`로 캡슐화.
   - 기존 14개 SKILL.md 각각에 "How to think (10-principle mapping)" appendix를 추가, 스킬마다 고유한 매핑 테이블을 단다 (보일러플레이트가 아닌 스킬별 매핑).

5. **Pre-commit verifier agent (v1.7.1)** — `agents/verifier.md`
   - Read-only 도구만 보유, 스테이징된 diff에 *six-cut + agent kernel*을 적용해 BLOCKER / HIGH / MEDIUM / LOW 4단 보고. v1.7.0 감사에서 BLOCKER B1(data-egress consent gap)이 새 나간 경로를 닫는다.

6. **부속 자산과 거버넌스**
   - `bin/setup-{vault,multi-agent,retrieve,mode,dragonscale}.sh` — 2분 셋업 스크립트군
   - `tests/`(약 1240 assertions, `make test`로 9개 hermetic suite), CI(`make test` + SKILL frontmatter validation + plugin manifest JSON 검증)
   - `docs/audits/` 시리즈(v1.7.0 / v1.7.1 / v1.7.2-sss-plus / v1.8.0 / v1.9.0)로 의사결정 트레이서빌리티 유지
   - `_templates/`(concept, entity, comparison, source, question 5종 Obsidian Templater)
   - **DragonScale Memory**(`bin/setup-dragonscale.sh`, opt-in): log folds + deterministic page addresses(counter-based unique ID) + semantic tiling lint(ollama) + boundary-first autoresearch

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

저자는 README에서 세 가지 substantive design 다이어그램으로 아키텍처를 압축 설명한다 — vault flow, multi-writer locking, hybrid retrieval. 본 wiki에서도 이 3개가 핵심 그림 후보다 (fig01~03).

### 3.1 Vault Flow

```
.raw/  ──(wiki-ingest)──▶  wiki/{entities, concepts, sources}/  ──▶  index.md, log.md, hot.md
                                                                            │
사용자 질문 ──(wiki-query)──▶ hot.md → index.md → domain page (drill-down) ─┘
```

- **읽기 경로의 비용 최소화**: 모든 질의는 `hot.md`(최근 컨텍스트 약 500단어 캐시) → `index.md`(마스터 카탈로그) → 도메인 페이지(`_index.md`) → 개별 페이지 순으로만 내려간다. 본 ai-wiki의 `index.md` + `wiki/{category}/` 구조와 직접 대응된다.
- **세션 종료 시 hot cache 갱신**: 다음 세션은 recap 없이 시작한다.

### 3.2 Methodology Mode router

```
.vault-meta/mode.json (generic|lyt|para|zettelkasten)
        │
        ▼
python3 scripts/wiki-mode.py route <type> "<name>"
        │
        ▼
generic       → wiki/sources/Karpathy-2025-...md
lyt           → wiki/notes/Karpathy-2025-...md   (+MOC 업데이트)
para          → wiki/resources/incoming/...md    (사용자 분류 대기)
zettelkasten  → wiki/<YYYYMMDDHHMMSSffffff>-...md
```

- consumer 스킬(`wiki-ingest`, `save`, `autoresearch`)은 라우터만 호출하므로 모드 전환이 깨끗하다.
- 모드 전환은 기존 파일을 자동 마이그레이션하지 않는다 (명시적 의사결정).

### 3.3 Concurrency: per-file advisory locking (v1.7+)

```bash
if bash scripts/wiki-lock.sh acquire wiki/concepts/Foo.md; then
  # transport-selected write
  bash scripts/wiki-lock.sh release wiki/concepts/Foo.md
else
  # rc=75 (EX_TEMPFAIL): 2s 후 1회 재시도, 그래도 잠금이면 log.md에 skip 기록
fi
```

- **Per-file granularity**: `sha1(<vault-relative-path>)` 키. 서로 다른 페이지의 동시 작성은 그대로 병렬로 진행된다.
- **Age-based staleness**: 기본 60초. 크래시한 writer가 60초 안에 자동 해제된다.
- **PostToolUse 훅이 잠금 보유 시 git add 지연** → torn commit 방지.
- **v1.9.1 hardening**: SessionStart에 `wiki-lock.sh clear-stale --max-age 3600`가 걸려 세션 재시작 시 고아 락이 자동 reap된다.
- **v1.9.1 symlink canonicalization**: `validate_path()`가 `python3 os.path.realpath`로 캐노니컬화 후 `commonpath(VAULT_ROOT, ...)` 검사. vault 밖으로 빠지는 심볼릭 링크 경로를 거부한다.

### 3.4 Hybrid Retrieval (v1.7+, opt-in)

세 tier 합성 (Anthropic 2024-09 contextual retrieval 연구 기반):

| Tier | 구성 | 위치 | egress |
|---|---|---|---|
| Sparse | BM25 | `scripts/bm25-index.py` | 로컬 only |
| Contextual prefix | 페이지 본문을 Anthropic API로 보내 prefix 생성 | `scripts/contextual-prefix.py` | `--allow-egress` 동의 게이트 |
| Rerank | cosine via local ollama embeddings | `scripts/rerank.py` | 로컬 (기본) |

- **Prompt-cache hardening (v1.9.2)**: contextual-prefix에서 `cache_control` 마커는 **Haiku 4.5 최소 cacheable size (16384 chars ≈ 4096 tokens)** 위에서만 부착되도록 정정. 미만이면 마커가 silently ignored되어 오해의 소지가 있었다. `cache_control_for()` 순수 함수로 추출하고 단위 테스트를 추가했다.
- **Cache telemetry**: `cache: wrote=<N> read=<N> tok` 로깅 — 본문이 아닌 정수만 기록해 v1.7.1 data-egress 정책을 지킨다.
- **Sequential invariant**: chunk 0의 응답이 chunk 1 송신 전에 도착해야 cache read가 발생 — Anthropic prompt-caching 동시성 규칙을 명시 주석으로 추가.
- **벤치 (v1.7, 50-query)**: top-1 +32pp, error -41% vs v1.6 baseline.

### 3.5 Transport fallback chain (v1.7+)

`scripts/detect-transport.sh` 결과가 `.vault-meta/transport.json`에 기록되고, 모든 스킬이 mutation 전 이 파일을 참조한다.

```
Obsidian CLI  →  mcp-obsidian  →  mcpvault  →  filesystem (always-available floor)
```

`.vault-meta/transport.json`의 `manual_override: true`로 고정할 수 있다 (v1.8.2+).

### 3.6 Vault use cases × Methodology modes (직교 합성)

- **Use case (무엇)**: A. Website / B. GitHub / C. Business / D. Personal / E. Research / F. Book·Course
- **Methodology mode (어떻게)**: Generic / LYT / PARA / Zettelkasten
- 두 축은 직교한다 — Business + Research를 PARA로 운영하는 식의 합성이 가능하다.

### 3.7 DragonScale Memory (opt-in)

`bin/setup-dragonscale.sh`로만 활성화되는 보조 메모리 메커니즘 4종:

1. **Log folds** — 과거 entry의 rollup
2. **Deterministic page addresses** — counter-based unique ID (`.vault-meta/address-counter.txt`)
3. **Semantic tiling lint** — ollama로 chunk-boundary 검증 (`scripts/tiling-check.py`, `.vault-meta/tiling-thresholds.json`)
4. **Boundary-first autoresearch** — vault의 frontier(gap-adjacent 페이지)부터 연구 타겟으로 선택

Optional이지만, GBrain의 typed-edge KG나 AKB의 vault격리·MCP 도구와 같은 메모리 운영 추상화 카테고리와 비교하면 흥미로운 변종이다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

- **Hybrid retrieval (v1.7, 50-query)**: top-1 정확도 +32pp, 오류율 -41% (v1.6 baseline 대비)
- **테스트 슈트**: `make test`로 9개 hermetic suite, 약 1240 assertions
  - `test_concurrent_write.sh`, `test_wiki_lock.sh` (concurrency)
  - `test_boundary_score.py`, `test_contextual_prefix.py`, `test_bm25_index.py`, `test_retrieve.py` (retrieval)
  - `test_tiling_check.py`, `test_wiki_mode.py`, `test_allocate_address.sh`
- **CI**: GitHub Actions에서 매 PR마다 `make test` + SKILL.md frontmatter 검증 + agents `tools:` 선언 검증 + plugin manifest JSON 유효성 검사를 돌린다.
- **감사 트레이서빌리티**: `docs/audits/v1.7.0-audit-2026-05-17.md`, `v1.7.1-fixes-plan.md`, `v1.7.2-sss-plus-plan.md`, `v1.8.0-pre-push-audit-2026-05-18.md`, `v1.9.0-pre-public-promotion-audit-2026-05-18.md` — 의사결정 archeology가 그대로 남는다.
- **Compass 자기평가 (v1.9.0)**: 7축 중 5축에서 #1 자처 — Compounding wiki primitive / Multi-writer safety / Retrieval architecture (free tier) / License·openness / Methodology support. 나머지 2축(Derivative outputs / GUI install ergonomics)은 v2.x 스코프로 미루어진 상태.

> **주의**: 위 점수와 순위는 모두 *저자 자가 평가*다. 본 ai-wiki에서 인용할 때는 출처를 명시한다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **단일 테넌트 가정**: SECURITY.md의 "Threat model: single-tenant vault" 섹션이 cross-process lock release, auto-commit hook scope, filesystem-permission trust boundary 세 가지 설계 선택이 멀티 테넌트가 아님을 명시한다.
- **에이전트 호환성**: Agent Skills 호환을 표방하지만 production verification은 Claude Code에서만 이루어진다. OpenAI Codex CLI / Cursor / Windsurf / Gemini CLI / Goose는 experimental.
- **자동 동기화 없음**: vault는 plain markdown 폴더라, Obsidian Sync / Obsidian Git / Syncthing / iCloud / Dropbox를 별도로 페어링해야 한다.
- **저자 자가 평가 의존**: 경쟁 비교표(Smart Connections, Copilot 대비)와 compass 7축 점수가 저자 자평이라 외부 벤치가 부족하다.
- **API egress 신뢰 모델**: contextual-prefix tier는 `--allow-egress` consent flag로만 켜지지만, 한 번 켜지면 페이지 본문이 Anthropic API로 흘러간다는 점을 사용자가 인지해야 한다 (cache telemetry는 정수만 로깅하도록 v1.9.2에서 정정됨).
- **DragonScale 미평가**: opt-in 메커니즘 4종(log folds, deterministic address, tiling lint, frontier autoresearch)은 코드만 있고 외부 비교 데이터가 없다.
- **Public promotion 직후 시점**: v1.9.x는 *"first public release prep"*으로 보고됐다 — 외부 사용자 베이스가 형성되는 단계이며, 향후 12개월의 컨트리뷰션과 이슈 패턴이 진짜 검증이 될 것이다.

## 6. 관련 연구 (Related Work)

본 ai-wiki에 이미 보유 중인 관련 자료:

- **[[applications/garrytan-gbrain|garrytan/gbrain (repo)]]** — Garry Tan의 markdown-first 에이전트 메모리. pgvector + typed-edge KG + skill pack. claude-obsidian과 함께 *"Karpathy LLM Wiki 패턴의 두 reference 구현체"*로 비교 가치가 크다.
- **[[applications/dnotitia-akb|dnotitia/AKB (repo)]]** — Dnotitia의 MCP-first agent knowledge base. Git bare repo + Postgres + 플러그형 vector store + 풍부한 MCP 도구셋. claude-obsidian보다 조직용 shared vault 쪽에 무게가 실린다.
- **[[applications/safishamsi-graphify|safishamsi/graphify (repo)]]** — YC S26 제품. tree-sitter AST + Leiden 군집화로 vector RAG 없이 코드 KG 구축.
- **[[applications/colbymchenry-codegraph|colbymchenry/codegraph (repo)]]** — 로컬 우선 code-intelligence MCP 서버. dynamic-dispatch 합성으로 indirect call까지 추적.
- **[[applications/lum1104-understand-anything|Lum1104/Understand-Anything (repo)]]** — 7단계 파이프라인으로 임의 코드베이스 → KG 변환.
- **[[applications/datasciencedojo-2026-llm-wiki-by-andrej-karpathy|LLM Wiki by Karpathy 입문 튜토리얼]]** — Karpathy gist의 영어권 입문 가이드.
- **[[applications/kmyu-2026-llm-wiki-pattern-synthesis|Karpathy LLM Wiki 패턴 — 한국어 종합 정리]]** — 본 ai-wiki 운영자 입장의 한국어 합성.
- **[[applications/kmyu-2026-akb-llmwiki-gbrain-comparison|AKB · llmwiki · GBrain 비교]]** — 6축 5점 비교. **claude-obsidian을 4번째 축으로 합쳐 비교를 업데이트할 가치가 있다**.
- **[[applications/liu-2026-rag-llm-wiki-or-gbrain|RAG, LLM Wiki, or GBrain? (Liu, Medium)]]** — agent의 job(retrieve/compile/act)으로 RAG·LLM Wiki·Fat Skills를 가르는 결정 프레임워크.
- **[[agents/patel-2026-beyond-the-prompt-claude-code|Beyond the Prompt: Claude Code (Patel)]]** — Claude Code 운영 매뉴얼. "setup is the work" 관점이 claude-obsidian의 셋업 스크립트군과 직접 호응한다.
- **[[agents/osmani-2026-loop-engineering|Loop Engineering (Osmani)]]** — automations / worktrees / skills / connectors / sub-agents 5+1 요소. claude-obsidian의 15개 스킬 + parallel ingest agents는 Loop Engineering의 한 사례다.

외부 자료 (저자가 명시 인용):

- **Karpathy LLM Wiki gist** (442a6bf): 패턴의 원형.
- **Anthropic Sept 2024 contextual retrieval research**: hybrid retrieval tier 설계 근거.
- **kepano/obsidian-skills**: substrate 정렬 대상 (Obsidian 측의 canonical 스킬 패키지).
- **Tiago Forte / Nick Milo / Niklas Luhmann**: PARA, LYT, Zettelkasten 방법론.

## 7. 용어집 (Glossary)

- **Compound Vault**: claude-obsidian의 v1.7+ refoundation을 가리키는 저자 용어. 본 ai-wiki에 누적되는 wiki와 같은 *"지식이 복리로 쌓이는"* 구조를 코드 + 락 + 트랜스포트 + 검색 4축으로 강화한 것이다.
- **Hot cache**: 최근 컨텍스트(약 500단어) 캐시. 매 세션 종료 시 갱신되며, 다음 세션 시작 시 첫 읽기 대상이다.
- **Methodology Mode**: LYT / PARA / Zettelkasten / Generic. *"어떻게 정리할지"*를 결정하며, `.vault-meta/mode.json`이 single source다.
- **Vault Use Case**: Website / GitHub / Business / Personal / Research / Book·Course. *"무엇을 위한 vault인지"*를 결정하며, methodology와 직교 합성된다.
- **Per-file advisory lock**: `scripts/wiki-lock.sh`가 `sha1(vault-relative-path)`로 키잉, `STALE_AFTER_SEC=60`. cross-process release 허용.
- **Transport**: vault에 쓰기 위한 채널. cli → mcp-obsidian → mcpvault → filesystem 폴백.
- **Hybrid retrieval**: BM25 (sparse) + contextual-prefix (Anthropic API, consent-gated) + cosine rerank (local ollama).
- **Contextual prefix**: 페이지 본문을 Anthropic API로 보내 prefix를 생성, BM25 인덱싱·rerank 품질을 끌어올리는 보조 표상으로, Anthropic 2024-09 연구에서 차용했다.
- **Six-cut + agent kernel**: AgriciDaniel/best-practices 리포에서 정의한 코드 리뷰 디스플린. `agents/verifier.md`가 staged diff에 적용한다.
- **10-principle thinking framework**: `OBSERVE-OBSERVE-LISTEN-THINK-CONNECT-CONNECT-FEEL-ACCEPT-CREATE-GROW`. v1.9.0에서 `skills/think/SKILL.md`로 도입.
- **DragonScale Memory**: 별도 opt-in 메모리 메커니즘 4종(log folds / deterministic addresses / semantic tiling lint / boundary-first autoresearch).
- **MAST 호응**: 본 ai-wiki에 들어있는 *Why Do Multi-Agent LLM Systems Fail?* 의 system-design 결함 카테고리 관점에서 보면, claude-obsidian은 *"명시적 락 + transport 폴백 + verifier agent"*로 inter-agent 충돌 표면을 줄이는 시스템 설계 사례다.

## 8. 그림 후보 (Figure Candidates)

`assets/diagrams/`의 3개 SVG는 README가 "세 가지 substantive design 다이어그램"으로 명시한 그림들이라 wiki에 가장 적합하다. DragonScale 시리즈는 opt-in 메커니즘 설명에 유용하며, 사용자가 DragonScale 비중을 키우고 싶을 때만 권장한다. 그래프 뷰·맵 캔버스 PNG는 *"완성된 모습"* 데모이지만 사용자 데이터가 들어 있어 추상화도가 낮아 보조용으로 둔다.

| id | strategy | caption | 추천 |
|---|---|---|---|
| fig01 | manual | Vault flow (sources → ingest → wiki + cache, query 경로) | ★ wiki 권장 (architecture) |
| fig02 | manual | Multi-writer locking (per-file advisory lock, v1.7+) | ★ wiki 권장 (architecture) |
| fig03 | manual | Hybrid retrieval (BM25 + contextual-prefix + cosine rerank) | ★ wiki 권장 (architecture) |
| fig04 | manual | DragonScale mechanism overview | (선택, DragonScale 강조 시) |
| fig05 | manual | DragonScale frontier graph | (선택) |
| fig06 | manual | DragonScale 6-step test flow | (선택) |
| fig07 | manual | Obsidian graph view 예시 (populated KG) | (선택, demo) |
| fig08 | manual | Wiki Map canvas 예시 | (선택, demo) |

> **Animated GIF 후보** (`wiki/meta/*.gif` 4종 — claude-obsidian-gif-cover-16x9, welcome-canvas, wiki-graph-grow, workflow-loop)은 Obsidian/Markdown 렌더에서 동작하지만 정적 인용에는 적합하지 않아 후보 목록에서 제외한다.

큐레이션 결정을 알려주세요 — 예: *"fig01, fig02, fig03을 wiki에 넣어줘"*. 그러면 Step 3.5에서 해당 id의 `curated: true`로 변경하고, Step 4에서 `wiki/assets/agricidaniel-claude-obsidian/`에 큐레이션 사본을 만들어 `wiki/applications/agricidaniel-claude-obsidian.md` 본문에 임베드한 뒤 `index.md`를 갱신합니다.

<!-- HUMANIZE-SUMMARY v1.6.1
run_id: 2026-06-11-001
metrics:
  char_in_korean_prose: ~5200
  char_out_korean_prose: ~5240
  change_rate: ~8%
  self_check: 6/6
  grade: A
categories:  # before → after (한글 산문 영역 한정, 보존 영역 제외)
  D-2 따옴표 강조 (한 줄 요약): 1 → 0
  D-6 결말 공식: 0 → 0
  H-3 메타 진입 '이는·이 점에서': 0 → 0
  I-1 '~인 것이다/한 것이다': 0 → 0
  I-3 '~다는 의미다/뜻이다': 0 → 0
  A-2 '~를 통해' 남발: 1 → 0 (보존 위치는 유지)
  A-7 '가지고 있다': 0 → 0
  A-10 '~할 수 있다' 남발: 2 → 1 (기술 정확성 위해 1건 보존)
  C-11 연결어미 뒤 쉼표: 0 → 0
  E-2 '~고 있다' 진행형: 0 → 0
  F-5 '~적 N' 추상체인: 0 → 0
self_check:
  - 고유명사·수치·인용 100% 보존: pass
  - YAML/코드블록/표/URL/wikilinks/영문식별자 무변경: pass
  - 변경률 30% 이하: pass (~8%)
  - 장르 이탈 없음: pass (리포트 격식체 유지)
  - register 보존: pass (해라체/평서 격식 일관)
  - 잔존 S1 0건: pass
  - 인공 표현 추가 없음: pass
highlights:
  - id: oneliner-dequote
    before: '"소스를 떨구면 자동으로 정리되고, 질문하면 페이지를 인용해 답하는" 자기조직 PKM을 표준화한 reference 구현체다.'
    after: '소스를 떨구면 자동으로 정리되고 질문하면 페이지를 인용해 답하는 자기조직 PKM을 표준화한 reference 구현체다.'
  - id: sec2-intro-tighten
    before: '이 저장소는 "Karpathy LLM Wiki를 누가 와도 2분 안에 가동시킬 수 있는 형태"로 구체화한 것이 핵심 기여다.'
    after: '이 저장소의 핵심 기여는 Karpathy LLM Wiki를 누가 와도 2분 안에 가동시킬 수 있는 형태로 구체화한 점이다.'
  - id: hedge-to-statement
    before: 'torn commit을 방지.'
    after: 'torn commit을 막는다.'
  - id: register-firm
    before: '이해해야 함 (cache telemetry는 정수만 로깅하도록 v1.9.2에서 정정됨).'
    after: '인지해야 한다 (cache telemetry는 정수만 로깅하도록 v1.9.2에서 정정됨).'
  - id: connector-rebalance
    before: '본 ai-wiki도 같은 계보 위에 있어 직접 비교 대상.'
    after: '본 ai-wiki도 같은 계보에 놓여 있어 직접 비교 대상이다.'
residual_findings:
  - id: A-10-domain
    severity: low
    reason: "`고정할 수 있다`(v1.8.2+) 1건은 기능 가용성 기술 진술이라 단언화 시 의미 왜곡 위험. 보존."
grade_reason: 'A — S1 0건, 변경률 약 8% (보수 권장 구간 5~25% 내), 자체검증 6항 모두 통과. YAML frontmatter / 8개 코드블록 / 2개 표 / 모든 URL·wikilinks·영문 식별자 무손상.'
-->
