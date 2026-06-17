---
title: "garrytan/gbrain"
type: repo
year: 2026
category: applications
raw_path: raw/repos/garrytan-gbrain.md
raw_filename: "garrytan-gbrain.md"
source: garrytan-gbrain.md
source_collection: external
org: "garrytan"
repo: "gbrain"
url: "https://github.com/garrytan/gbrain"
license: "MIT"
version: "0.36.x (cloned 2026-05-22)"
tags: [agent-memory, personal-brain, markdown-first, knowledge-graph, hybrid-search, pgvector, pglite, mcp, openclaw, hermes, zeroentropy, brainbench, longmemeval, karpathy-llm-wiki, minions, dream-cycle]
---

## 요약 (Summary)

Garry Tan (Y Combinator CEO)이 자신의 OpenClaw·Hermes 에이전트를 위해 만든 **markdown-first AI 에이전트 메모리 시스템**. 핵심 thesis는 *"vector DB는 derived index, git markdown repo가 source of truth"*. 그 위에 ① Postgres + pgvector hybrid retrieval (HNSW + BM25 + RRF), ② zero-LLM-call typed-edge knowledge graph, ③ 43개 skill pack ("thin harness, fat skills"), ④ Postgres-native durable job queue (Minions), ⑤ nightly "dream cycle"을 결합한다. BrainBench(자체 240-page corpus) P@5 49.1% · R@5 97.9%로 graph 끄면 −31.4pp 떨어지는 점이 typed-edge KG가 vector-only 대비 retrieval lift를 가장 크게 만든다는 신호다 (MIT, TypeScript/Bun).

## 주요 기여 (Key Contributions)

1. **"Brain repo = source of truth" 패턴의 production-grade 일반화** — git markdown을 소유, DB는 손실되면 `gbrain sync && gbrain embed`로 재빌드. 에이전트 학습 결과를 `git diff`로 검토하고 실험은 git branch로 격리한다.
2. **Zero-LLM-call self-wiring KG** — 모든 page write에서 regex/wikilink 매칭만으로 `attended` · `works_at` · `invested_in` · `founded` · `advises` 등 typed edge를 즉시 추출 → 대용량 ingestion이 토큰 비용 사실상 \$0.
3. **Hybrid retrieval + backlink boost가 vector-only를 +31.4 P@5pp 이김** — HNSW + tsvector BM25 + RRF + 4-layer dedup + backlink ranking. typed-edge graph 기여도가 hybrid search 단독보다 크다는 점이 차별점.
4. **"Compiled truth + append-only timeline" page schema** — 모든 brain page가 상단=현재 진실, 하단=evidence ledger로 분리되어 "stale memory vs unbounded growth"를 audit 가능하게 해결.
5. **Skill pack 43개로 "행동 layer를 markdown으로 표현"** — `skills/RESOLVER.md` 라우팅, 운영자가 fork·교체 가능. 별도 워크플로우 엔진 없이 markdown만 읽으면 에이전트 의사결정이 보인다.
6. **Minions (Postgres-native job queue)** — BullMQ 모양, durable subagent(two-phase pending→done persistence로 crash 후 재개), shell audit, child + cascading timeout, rate lease, S3/Supabase attachment.
7. **Dream cycle** — cron으로 도는 enrichment·citation fixer·contradiction finder·tomorrow-task prep. v0.36.4.0 부터 `gbrain doctor --remediate --max-usd 5`가 cost cap 안에서 score를 자율로 90까지 끌어올리는 autonomous loop 제공.
8. **공개·재현 가능한 BrainBench + LongMemEval (97.60% R@5) + cross-modal eval** — 별도 `gbrain-evals` repo로 코퍼스·코드 공개. README가 published number ↔ 실제 code 행동을 정직하게 일치시킴 (Vectorize 리뷰가 "honesty of marketing 5/5"로 호평).
9. **MCP 서버 (stdio + HTTP)** — `gbrain serve --http`는 OAuth 2.1 + per-client scope + DCR + rate limit + `/admin` SSE feed. Claude Desktop/Code/Cursor/ChatGPT/Perplexity/Cowork first-class.
10. **ZeroEntropy default (v0.36.2.0)** — embedding `zembed-1`(1280d Matryoshka) + reranker `zerank-2`. OpenAI 대비 2.2× 빠르고 2.6× 저렴, 20-query head-to-head 11승.

## 방법론 및 아키텍처 (Methodology and Architecture)

### The brain agent loop

```
signal  →  search   →  respond     →  write     →  auto-link    →  sync
(every    (brain-     (informed       (page +      (typed edges     (cron keeps
message)  first       by context)     timeline)    + backlinks)     fresh)
          retrieval)
```

요점은 *"에이전트가 답하기 전에 brain을 먼저 읽고, 답한 후에 brain에 다시 쓴다"*는 단순 contract.

### Two engines, one contract

- **PGLite (WASM Postgres 17)** ≤50K pages — zero-config, 2초 init.
- **Postgres + pgvector** — Supabase/self-hosted, shared·다중머신.
- 양쪽이 `BrainEngine` interface(`src/core/engine.ts`, ~47 ops) 구현 → CLI/MCP 서버가 single source에서 자동 생성.

### Brain ⊥ Source 두 축

- **Brain** = 어떤 DB (개인 brain · team mount).
- **Source** = brain 안의 어떤 repo (wiki · essay · gstack).
- `.gbrain-source` dotfile + 6-tier precedence로 라우팅.

### Search modes

`conservative` / `balanced` / `tokenmax` 3종을 단일 config key로 전환. default `balanced` + ZeroEntropy reranker. **`gbrain init`이 9-cell cost matrix (mode × downstream model, 25× spread)를 출력하며 [AGENT] 마커로 STOP — 운영자에게 confirm 요청** — silent default 강요하지 않음.

### 검증 가능한 sync (영상에서 강조)

> Sync ran ≠ sync worked. Vector DB는 derived index이지 source of truth 아님.

강제 패턴: `gbrain sync` → `gbrain embed`(stale 백필) → page count·embedding coverage 검증 → edit 후 cycle 대기 → 검색으로 reflect 확인. 잘못된 Supabase puller는 silently page 건너뛸 수 있음 (skill pack에 failure mode 명시).

## 결과 (Results)

### BrainBench (자체 240-page Opus rich-prose corpus)

| 구성 | P@5 | R@5 |
|---|---|---|
| 풀 시스템 | **49.1%** | **97.9%** |
| graph layer OFF | **−31.4pp** (~17.7%) | — |
| ripgrep-BM25 + vector-only RAG | similar margin 열세 | — |

### LongMemEval (공개)

- v0.28부터 통합, `gbrain-evals`에서 **R@5 97.60%** 보고.
- BEAM (10M-token long-horizon, Hindsight 64.1%)은 미실행.

### ZeroEntropy default (v0.36.2.0) — OpenAI 대비

- latency **442ms** (vs 973ms, 2.2× 빠름)
- 가격 **\$0.05/M** (vs \$0.13, 2.6× 저렴)
- 20-query head-to-head: ZE **11승**
- second-pass reranker로 사용 시 top-1의 **60%** 재배열

### 운영 비용

- 활성 personal brain의 LLM 비용은 **월 한 자릿수 달러** 수준 (zero-LLM entity 추출 + fail-improve loop 덕).

### Vectorize.io 리뷰 scorecard

| Dimension | Rating |
|---|---|
| Architecture | 5/5 |
| Retrieval quality | 4/5 |
| Cost efficiency | 5/5 |
| Day-one experience | 4/5 |
| Long-term value | 5/5 |
| Documentation | 4/5 |
| Integration breadth | 2/5 |
| Multi-tenant readiness | 1/5 |
| Maturity | 3/5 |
| Honesty of marketing | 5/5 |

## 한계 (Limitations)

- **Single-operator design** — multi-tenant isolation은 design center가 아님.
- **No managed cloud** — exclusively self-hosted.
- **Integration breadth가 좁음** — first-class skill pack은 OpenClaw + Hermes만. 다른 에이전트 스택은 MCP로 wiring 필요하나 first-party 패키지 없음.
- **Schema discipline 필요** — skill·schema가 모두 운영자 저작. set-and-forget이면 오류만 누적된다고 README가 명시.
- **No multi-hop graph / temporal reasoning at retrieve** — write-time에 typed edge는 추출하나 retriever는 multi-hop traversal을 우선시하지 않음.
- **Install footgun 2개** — `bun install -g github:garrytan/gbrain` 금지(postinstall hook 차단), `npm install -g gbrain` 금지(squatted package). 안내: `bun install -g github:garrytan/gbrain`이 안 되면 `git clone` 후 `bun install && bun link`.

## 관련 페이지 (Related Pages)

- [[applications/gajjar-2026-gbrain-vs-computer-memory]] — DevRev Tech Lead가 GBrain(개인 메모리) ↔ DevRev Computer Memory(엔터프라이즈 메모리)를 비교. shared / two-way sync / 권한 차이.
- [[applications/vectorize-2026-gbrain-review-honest-assessment]] — Vectorize.io의 정직한 어세스먼트. 위 scorecard 출처. BrainBench·LongMemEval 수치 정리.
- [[applications/mantena-2026-hermes-gbrain-setup-vps]] — AWS EC2 + Hermes에 GBrain 설치 + X(Twitter) 수집까지 풀세트 튜토리얼. PATH 이슈, OAuth 2.0 PKCE로 ngrok 없이 likes 수집.
- [[applications/techwealth-hub-2026-garry-tan-gbrain-explained]] — 5분 45초 YouTube 영상. brain agent loop, 4개 DB primitives(entity registry · event ledger · fact store · relationship graph), verification runbook을 transcript 기반으로 요약.

## 메모 (Notes)

- 본 ai-wiki의 `CLAUDE.md` 자체가 Karpathy LLM Wiki 패턴의 다중 자료형 확장이며, GBrain은 같은 패턴을 *에이전트가 직접 read/write* 축으로 production화한 것 — 두 프로젝트는 같은 thesis(markdown source-of-truth + retrieval layer + compounding)의 두 변형으로 볼 수 있다.
- 인용된 수치(17,888 pages / 4,383 people / 723 companies, 21 cron jobs, 12 days)는 모두 README 첫 단락의 Garry Tan 본인 brain 통계.
