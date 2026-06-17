---
title: "claude-obsidian: Self-Organizing AI Second Brain for Obsidian + Claude Code"
type: repo
year: 2026
category: applications
raw_path: raw/repos/agricidaniel-claude-obsidian.md
raw_filename: "agricidaniel-claude-obsidian.md"
source: agricidaniel-claude-obsidian.md
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
---

# claude-obsidian — Karpathy LLM Wiki를 2분 안에 가동하는 Claude Code 플러그인 + Obsidian 볼트

## 요약 (Summary)

Daniel Agrici가 만든 Claude Code 플러그인 겸 Obsidian 볼트다. Karpathy의 [LLM Wiki 패턴](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)을 두 환경(Claude Code 스킬 15개 + Obsidian 볼트 구조)에 정착시켜, 소스를 떨구면 자동으로 정리되고 질문하면 페이지를 인용해 답하는 자기조직 PKM을 표준화한 reference 구현체다. 본 ai-wiki도 같은 계보에 서 있어 직접 비교할 가치가 크다.

- **저자**: Daniel Agrici (`agricidaniel.com`)
- **라이선스**: MIT
- **최신 버전**: `v1.9.2` (2026-05-27, 2026-05-28 release)
- **저장소**: [`AgriciDaniel/claude-obsidian`](https://github.com/AgriciDaniel/claude-obsidian)
- **블로그 deep dive**: [I Turned Obsidian Into a Self-Organizing AI Brain](https://agricidaniel.com/blog/claude-obsidian-ai-second-brain)
- **동반 프로젝트**: `claude-canvas`(시각 canvas), `claude-seo`, `claude-ads`, `best-practices`(six-cut + agent kernel)

## 주요 기여 (Key Contributions)

1. **Claude Code 스킬 15개로 LLM Wiki 워크플로우 모듈화** — 오케스트레이터(`wiki`) / 인제스트(`wiki-ingest`, `save`, `autoresearch`, `defuddle`) / 질의·유지(`wiki-query`, `wiki-lint`, `wiki-fold`, `wiki-retrieve`) / Obsidian 통합(`wiki-cli`, `obsidian-markdown`, `obsidian-bases`, `canvas`) / 라우팅·사고(`wiki-mode`, `think`).
2. **Compound Vault refoundation (v1.7)** — per-file advisory locking + hybrid retrieval(BM25 + contextual-prefix + cosine rerank) + Obsidian CLI 기본 transport.
3. **Methodology Modes (v1.8)** — generic / LYT / PARA / Zettelkasten 4종을 1차 시민으로 승격. `.vault-meta/mode.json`이 single source of truth.
4. **10-principle thinking framework (v1.9)** — `OBSERVE-OBSERVE-LISTEN-THINK-CONNECT-CONNECT-FEEL-ACCEPT-CREATE-GROW` 10단계를 `skills/think/SKILL.md` + 기존 14개 SKILL의 appendix에 통합.
5. **Pre-commit verifier agent (v1.7.1)** — read-only 도구만 보유, staged diff에 six-cut + agent kernel을 적용해 BLOCKER / HIGH / MEDIUM / LOW 4단으로 보고한다.
6. **거버넌스 자산** — `bin/setup-*.sh` 2분 셋업 / `make test` 9개 hermetic suite (약 1240 assertions) / `docs/audits/` 감사 트레이서빌리티 / 옵션 DragonScale Memory(log folds + 결정론적 페이지 주소 + tiling lint + boundary-first autoresearch).

## 방법론 및 아키텍처 (Methodology and Architecture)

저자는 README에서 세 가지 substantive design 다이어그램으로 아키텍처를 압축한다 — vault flow, multi-writer locking, hybrid retrieval. 본 wiki도 이 셋을 핵심 그림으로 채택한다.

### Vault flow

소스가 `.raw/`에 떨어지면 `/wiki-ingest` 에이전트가 엔터티·콘셉트·소스 페이지를 만들고 `index.md`·`log.md`·`hot.md`를 갱신한다. 질의는 항상 `hot.md`(최근 컨텍스트 약 500단어 캐시) → `index.md`(마스터 카탈로그) → 도메인 페이지(`_index.md`) → 개별 페이지 순으로만 내려간다. 본 ai-wiki의 `index.md` + `wiki/{category}/` 구조와 정확히 맞물린다.

![[assets/agricidaniel-claude-obsidian/vault-flow.svg]]
*Figure 1: Vault flow — 소스가 `.raw/`에서 ingest 에이전트를 거쳐 entity·concept·source 페이지로 분기되고, 질의는 hot cache → index → pages 순으로 비용을 최소화한다 (Agrici 2026, README §Architecture).*

### Methodology Mode router

```
.vault-meta/mode.json (generic | lyt | para | zettelkasten)
        │
        ▼
python3 scripts/wiki-mode.py route <type> "<name>"
        │
        ▼
generic       → wiki/sources/Karpathy-2025-...md
lyt           → wiki/notes/Karpathy-2025-...md     (+MOC 업데이트)
para          → wiki/resources/incoming/...md      (사용자 분류 대기)
zettelkasten  → wiki/<YYYYMMDDHHMMSSffffff>-...md
```

consumer 스킬(`wiki-ingest`, `save`, `autoresearch`)은 라우터만 호출하므로 모드 전환이 깨끗하다. 모드를 바꿔도 기존 파일을 자동 마이그레이션하지 않는다 (명시적 의사결정).

### Concurrency: per-file advisory locking (v1.7+)

병렬 ingest 서브에이전트가 동일 페이지에 동시에 쓸 때, `scripts/wiki-lock.sh`가 `sha1(<vault-relative-path>)` 키로 advisory lock을 건다. 한쪽이 acquire하면 다른 쪽은 `rc=75 (EX_TEMPFAIL)`을 받고 2초 후 한 번 재시도, 그래도 잠금이면 `log.md`에 skip을 기록한다. PostToolUse 훅은 잠금이 보유 중인 동안 `git add`를 보류해 torn commit을 막는다.

- **Per-file granularity** — 서로 다른 페이지는 그대로 병렬.
- **Age-based staleness** — 기본 60초. 크래시한 writer가 60초 안에 자동 해제된다.
- **v1.9.1 hardening** — SessionStart에 `wiki-lock.sh clear-stale --max-age 3600`이 걸려 세션 재시작 시 고아 락이 자동 reap된다.
- **v1.9.1 symlink canonicalization** — `validate_path()`가 `python3 os.path.realpath`로 캐노니컬화 후 `commonpath(VAULT_ROOT, ...)` 검사를 거쳐 볼트 밖으로 빠지는 심볼릭 링크 경로를 거부한다.

![[assets/agricidaniel-claude-obsidian/multi-writer-locking.svg]]
*Figure 2: Multi-writer safety — 두 writer가 같은 페이지를 잡으려 할 때 한쪽만 acquire하고 다른 쪽은 다음 패스에서 재시도한다. v1.6의 잠재 데이터 손상 경로를 닫았다 (Agrici 2026, v1.7 Compound Vault).*

### Hybrid Retrieval (v1.7+, opt-in)

Anthropic의 2024-09 [contextual retrieval 연구](https://www.anthropic.com/news/contextual-retrieval)를 토대로 세 tier를 합성한다.

| Tier | 구성 | 위치 | egress |
|---|---|---|---|
| Sparse | BM25 | `scripts/bm25-index.py` | 로컬 only |
| Contextual prefix | 페이지 본문을 Anthropic API로 보내 prefix 생성 | `scripts/contextual-prefix.py` | `--allow-egress` 동의 게이트 |
| Rerank | cosine via local ollama embeddings | `scripts/rerank.py` | 로컬 (기본) |

- **Prompt-cache hardening (v1.9.2)** — `cache_control` 마커는 Haiku 4.5 최소 cacheable size(16,384 chars ≈ 4,096 tokens) 위에서만 부착되도록 정정. 그 미만에서는 API가 silently ignore해 오해의 소지가 있었다. `cache_control_for()` 순수 함수로 추출 + 단위 테스트 추가.
- **Cache telemetry** — `cache: wrote=<N> read=<N> tok`처럼 정수만 로깅. 본문은 절대 기록하지 않아 v1.7.1 data-egress 정책을 지킨다.
- **Sequential invariant** — chunk 0 응답이 chunk 1 송신 전에 도착해야 cache read가 발생한다. 향후 병렬화가 캐시 read를 소리 없이 0으로 만드는 일을 막으려고 process_page 루프에 명시 주석을 박았다.
- **벤치 (v1.7, 50-query)** — top-1 +32pp, error -41% vs v1.6 baseline.

![[assets/agricidaniel-claude-obsidian/hybrid-retrieval.svg]]
*Figure 3: Hybrid retrieval — BM25 sparse + (consent-gated) Anthropic contextual-prefix → local ollama cosine rerank. `--explain` 트레이서빌리티 포함 (Agrici 2026, README §Architecture).*

### Transport fallback chain

`scripts/detect-transport.sh`의 결과가 `.vault-meta/transport.json`에 기록되고 모든 스킬이 mutation 전 이 파일을 참조한다.

```
Obsidian CLI  →  mcp-obsidian  →  mcpvault  →  filesystem (always-available floor)
```

`manual_override: true`로 고정 가능 (v1.8.2+).

### Vault use cases × Methodology modes (직교 합성)

- **Use case (무엇)** — A. Website / B. GitHub / C. Business / D. Personal / E. Research / F. Book·Course
- **Methodology mode (어떻게)** — Generic / LYT / PARA / Zettelkasten

두 축은 직교다. *"Business + Research를 PARA로 운영"* 같은 합성이 명시적으로 허용된다.

## 결과 (Results)

- **Hybrid retrieval 벤치 (v1.7, 50-query)** — top-1 정확도 +32pp, 오류율 -41% (v1.6 baseline 대비).
- **테스트** — `make test`로 9개 hermetic suite, 약 1,240 assertions. CI가 매 PR마다 `make test` + SKILL.md frontmatter 검증 + agents `tools:` 선언 검증 + plugin manifest JSON 유효성을 돌린다.
- **감사 트레이서빌리티** — `docs/audits/`에 v1.7.0 / v1.7.1 / v1.7.2-sss-plus / v1.8.0 / v1.9.0 감사가 모두 남아 의사결정 archeology가 보존된다.
- **Compass 자기평가 (v1.9.0)** — 7축 중 5축에서 #1을 자처(compounding wiki primitive / multi-writer safety / retrieval architecture (free tier) / license·openness / methodology support). 나머지 2축(derivative outputs / GUI install ergonomics)은 v2.x 스코프로 미루어진 상태.

> 위 점수와 순위는 모두 *저자 자가 평가*다. 외부 벤치마크가 부족한 단계임을 감안한다.

## 한계 (Limitations)

- **단일 테넌트 가정** — SECURITY.md의 "Threat model: single-tenant vault" 섹션이 cross-process lock release / auto-commit hook scope / filesystem-permission trust boundary 세 가지가 멀티 테넌트가 아님을 명시한다.
- **에이전트 호환성** — Agent Skills 호환을 표방하지만 production verification은 Claude Code에서만 이뤄졌다. Codex CLI / Cursor / Windsurf / Gemini CLI / Goose는 experimental.
- **API egress 신뢰 모델** — contextual-prefix tier는 `--allow-egress`로만 켜지지만, 한 번 켠 뒤에는 페이지 본문이 Anthropic API로 흘러간다는 점을 사용자가 인지해야 한다.
- **DragonScale 미평가** — opt-in 메커니즘 4종은 코드만 있고 외부 비교 데이터가 없다.
- **자동 동기화 없음** — 볼트는 plain markdown 폴더. Obsidian Sync / Obsidian Git / Syncthing / iCloud / Dropbox 별도 페어링 필요.

## 관련 페이지 (Related Pages)

본 ai-wiki에서 직접 비교 가치가 있는 페이지를 골라낸다.

- [[applications/garrytan-gbrain|garrytan/gbrain]] — Karpathy LLM Wiki 패턴의 또 다른 reference 구현체. pgvector + typed-edge KG + skill pack 조합으로 claude-obsidian과 *"markdown-first 에이전트 메모리"* 카테고리를 형성한다.
- [[applications/dnotitia-akb|dnotitia/AKB]] — MCP-first agent knowledge base. Git bare repo + Postgres + 플러그형 vector store. claude-obsidian보다 *"조직용 shared vault"* 쪽에 가까움.
- [[applications/safishamsi-graphify|safishamsi/graphify]] — tree-sitter AST + Leiden 군집화로 vector RAG 없이 코드 KG를 만든다.
- [[applications/colbymchenry-codegraph|colbymchenry/codegraph]] — 로컬 우선 code-intelligence MCP 서버.
- [[applications/lum1104-understand-anything|Lum1104/Understand-Anything]] — 7단계 파이프라인으로 임의 코드베이스를 KG로 옮긴다.
- [[applications/datasciencedojo-2026-llm-wiki-by-andrej-karpathy|LLM Wiki by Karpathy 입문 튜토리얼]] — Karpathy gist의 영어권 입문 가이드. claude-obsidian이 *"실제 셋업 가능한 형태"*로 구체화한 패턴의 원형.
- [[applications/kmyu-2026-llm-wiki-pattern-synthesis|Karpathy LLM Wiki 패턴 — 한국어 종합 정리]] — 본 ai-wiki 운영자의 한국어 합성.
- [[applications/kmyu-2026-akb-llmwiki-gbrain-comparison|AKB · llmwiki · GBrain 비교]] — 6축 5점 비교. **claude-obsidian을 4번째 축으로 합쳐 비교를 업데이트할 가치가 큰 후보**.
- [[applications/liu-2026-rag-llm-wiki-or-gbrain|RAG, LLM Wiki, or GBrain? (Liu, Medium)]] — agent의 job(retrieve / compile / act)으로 RAG·LLM Wiki·Fat Skills를 가르는 결정 프레임워크.
- [[agents/patel-2026-beyond-the-prompt-claude-code|Beyond the Prompt: Claude Code (Patel)]] — *"setup is the work"* 관점이 claude-obsidian의 셋업 스크립트군과 호응한다.
- [[agents/osmani-2026-loop-engineering|Loop Engineering (Osmani)]] — automations / worktrees / skills / connectors / sub-agents 5+1 요소. claude-obsidian의 15 스킬 + parallel ingest agents가 Loop Engineering의 한 사례다.
- [[agents/cemri-2025-why-do-multi-agent-llm-systems|Why Do Multi-Agent LLM Systems Fail? (MAST)]] — system-design 결함 카테고리 관점에서, claude-obsidian은 *"명시적 락 + transport 폴백 + verifier agent"*로 inter-agent 충돌 표면을 줄이는 사례다.

<!-- HUMANIZE-SUMMARY v1.6.1
run_id: 2026-06-11-002
metrics:
  char_in: ~5800
  char_out: ~5810
  change_rate: ~3%
  self_check: 6/6
  grade: A
categories:  # before → after
  A-2 '~를 통해/계보 위에 있어': 1 → 0  (요약·Vault flow 마무리 표현 정돈)
  E-2 종결어미 단조 보고 표현: 부분 다양화 (보고한다·맞물린다·옮긴다·이뤄졌다·호응한다·사례다)
  F-4 '~에 기반하여': 1 → 0  (Hybrid Retrieval 도입부)
  A-11 '~기 위한' 목적절: 1 → 0  (Sequential invariant '막으려고'로 자연화)
  D-7/H-3 메타 진입: 0 → 0  (해당 없음)
  C-11 연결어미 뒤 쉼표: 0 → 0  (해당 없음)
self_check:
  - 고유명사·수치·인용 100% 보존: 통과 (v1.7~v1.9.2·+32pp·-41%·1240 assertions·50-query·16,384 chars 모두 유지)
  - 변경률 30% 이하: 통과 (~3%, 보수적 유지)
  - 장르 이탈 없음: 통과 (리포트 격식체 유지)
  - register 보존: 통과 (격식체·기술 용어 유지)
  - S1 잔존 0건: 통과
  - 인공 표현 추가 없음: 통과 (의미·사실 100% 보존, 임의 수사 없음)
highlights:
  - id: A-2
    before: "본 ai-wiki도 같은 계보 위에 있어 직접 비교 가치가 크다."
    after: "본 ai-wiki도 같은 계보에 서 있어 직접 비교할 가치가 크다."
  - id: A-9/E-2
    before: "본 ai-wiki의 index.md + wiki/{category}/ 구조와 정확히 대응된다."
    after: "본 ai-wiki의 index.md + wiki/{category}/ 구조와 정확히 맞물린다."
  - id: A-6
    before: "Anthropic의 2024-09 contextual retrieval 연구를 기반으로 세 tier를 합성한다."
    after: "Anthropic의 2024-09 contextual retrieval 연구를 토대로 세 tier를 합성한다."
  - id: A-11
    before: "병렬화가 캐시 read를 소리 없이 0으로 만드는 일을 막기 위한 명시 주석을 process_page 루프에 박았다."
    after: "병렬화가 캐시 read를 소리 없이 0으로 만드는 일을 막으려고 process_page 루프에 명시 주석을 박았다."
  - id: E-2
    before: "production verification은 Claude Code에서만."
    after: "production verification은 Claude Code에서만 이뤄졌다."
residual_findings: (없음 — YAML frontmatter·코드블록·표·figure caption·wikilink·통계·버전 전부 원형 보존)
grade_reason: "A — 입력이 이미 1차 윤문된 sources의 재구성본이라 S1 잔존 0건. 산문 구간 5건만 보수 교정, 변경률 ~3%로 기술 자료 register 그대로."
-->
