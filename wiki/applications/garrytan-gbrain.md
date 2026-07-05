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

Garry Tan (Y Combinator CEO)이 자신의 OpenClaw·Hermes 에이전트를 위해 만든 **markdown-first AI 에이전트 메모리 시스템**이다. 밑에 깔린 thesis는 하나다 — *"vector DB는 derived index, git markdown repo가 source of truth"*. 여기에 다섯 가지를 얹었다. ① Postgres + pgvector hybrid retrieval (HNSW + BM25 + RRF), ② zero-LLM-call typed-edge knowledge graph, ③ 43개 skill pack ("thin harness, fat skills"), ④ Postgres-native durable job queue (Minions), ⑤ nightly "dream cycle". BrainBench(자체 240-page corpus)에서 P@5 49.1% · R@5 97.9%를 찍는데, graph를 끄면 −31.4pp나 무너진다. typed-edge KG가 vector-only 대비 retrieval lift를 가장 크게 끌어올린다는 신호다 (MIT, TypeScript/Bun).

## 주요 기여 (Key Contributions)

1. **"Brain repo = source of truth" 패턴의 production-grade 일반화** — git markdown을 소유하고, DB가 날아가면 `gbrain sync && gbrain embed`로 다시 세운다. 에이전트가 학습한 결과는 `git diff`로 들여다보고, 실험은 git branch로 떼어 격리한다.
2. **Zero-LLM-call self-wiring KG** — page를 쓸 때마다 regex/wikilink 매칭만으로 `attended` · `works_at` · `invested_in` · `founded` · `advises` 같은 typed edge를 그 자리에서 뽑아낸다. 덕분에 대용량 ingestion이라도 토큰 비용이 사실상 \$0에 수렴한다.
3. **Hybrid retrieval + backlink boost가 vector-only를 +31.4 P@5pp 앞선다** — HNSW + tsvector BM25 + RRF + 4-layer dedup + backlink ranking을 엮었다. hybrid search 단독보다 typed-edge graph의 기여가 더 크다는 게 이 시스템의 차별점이다.
4. **"Compiled truth + append-only timeline" page schema** — brain page마다 위쪽은 현재 진실, 아래쪽은 evidence ledger로 나뉜다. 이 이분법이 "stale memory vs unbounded growth" 딜레마를 audit 가능한 형태로 푼다.
5. **Skill pack 43개로 "행동 layer를 markdown으로 표현"** — `skills/RESOLVER.md`가 라우팅을 맡고, 운영자가 fork하거나 갈아끼울 수 있다. 별도 워크플로우 엔진 없이 markdown만 읽어도 에이전트가 왜 그렇게 판단했는지 드러난다.
6. **Minions (Postgres-native job queue)** — BullMQ를 닮았다. durable subagent(two-phase pending→done persistence로 crash 후 재개), shell audit, child + cascading timeout, rate lease, S3/Supabase attachment를 갖췄다.
7. **Dream cycle** — cron으로 도는 enrichment·citation fixer·contradiction finder·tomorrow-task prep. v0.36.4.0부터는 `gbrain doctor --remediate --max-usd 5`가 cost cap 안에서 score를 90까지 스스로 끌어올리는 autonomous loop를 제공한다.
8. **공개·재현 가능한 BrainBench + LongMemEval (97.60% R@5) + cross-modal eval** — 코퍼스와 코드를 별도 `gbrain-evals` repo로 공개했다. README가 published number와 실제 code 행동을 정직하게 맞춰 둔 점을 Vectorize 리뷰가 "honesty of marketing 5/5"로 호평했다.
9. **MCP 서버 (stdio + HTTP)** — `gbrain serve --http`는 OAuth 2.1 + per-client scope + DCR + rate limit + `/admin` SSE feed를 얹었고, Claude Desktop/Code/Cursor/ChatGPT/Perplexity/Cowork를 first-class로 지원한다.
10. **ZeroEntropy default (v0.36.2.0)** — embedding `zembed-1`(1280d Matryoshka)에 reranker `zerank-2`. OpenAI 대비 2.2× 빠르고 2.6× 저렴하며, 20-query head-to-head에서 11승을 거뒀다.

## 방법론 및 아키텍처 (Methodology and Architecture)

### The brain agent loop

```
signal  →  search   →  respond     →  write     →  auto-link    →  sync
(every    (brain-     (informed       (page +      (typed edges     (cron keeps
message)  first       by context)     timeline)    + backlinks)     fresh)
          retrieval)
```

결국 핵심은 *"에이전트가 답하기 전에 brain을 먼저 읽고, 답한 뒤 brain에 다시 쓴다"*는 단순한 contract 하나로 압축된다.

### Two engines, one contract

- **PGLite (WASM Postgres 17)** ≤50K pages — zero-config, 2초 init.
- **Postgres + pgvector** — Supabase/self-hosted, shared·다중머신.
- 양쪽이 `BrainEngine` interface(`src/core/engine.ts`, ~47 ops) 구현 → CLI/MCP 서버가 single source에서 자동 생성.

### Brain ⊥ Source 두 축

- **Brain** = 어떤 DB (개인 brain · team mount).
- **Source** = brain 안의 어떤 repo (wiki · essay · gstack).
- `.gbrain-source` dotfile + 6-tier precedence로 라우팅.

### Search modes

`conservative` / `balanced` / `tokenmax` 세 가지를 config key 하나로 갈아탄다. 기본값은 `balanced` + ZeroEntropy reranker. **`gbrain init`은 9-cell cost matrix (mode × downstream model, 25× spread)를 찍어 보여준 뒤 [AGENT] 마커에서 멈추고 운영자에게 confirm을 요청한다** — silent default를 밀어붙이지 않는다.

### 검증 가능한 sync (영상에서 강조)

> Sync ran ≠ sync worked. Vector DB는 derived index이지 source of truth 아님.

그래서 정해둔 패턴이 있다: `gbrain sync` → `gbrain embed`(stale 백필) → page count·embedding coverage 검증 → edit 후 cycle 대기 → 검색으로 reflect 확인. 잘못 구성된 Supabase puller는 page를 소리 없이 건너뛸 수 있어, skill pack이 이 failure mode를 못 박아 둔다.

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

- **Single-operator design** — multi-tenant isolation은 애초에 설계 목표가 아니다.
- **No managed cloud** — 오직 self-hosted만 지원한다.
- **Integration breadth가 좁음** — first-class skill pack이 붙는 건 OpenClaw + Hermes뿐이다. 다른 에이전트 스택은 MCP로 직접 wiring해야 하고, first-party 패키지는 없다.
- **Schema discipline 필요** — skill도 schema도 전부 운영자가 손수 짜야 한다. 방치하면 오류만 쌓인다고 README가 대놓고 경고한다.
- **No multi-hop graph / temporal reasoning at retrieve** — typed edge는 write-time에 뽑아 두지만, retriever가 multi-hop traversal을 먼저 챙기지는 않는다.
- **Install footgun 2개** — `bun install -g github:garrytan/gbrain`은 postinstall hook이 막혀 안 되고, `npm install -g gbrain`은 squatted package라 금물이다. 전자가 실패하면 `git clone` 후 `bun install && bun link`로 우회하라.

## 관련 페이지 (Related Pages)

- [[applications/gajjar-2026-gbrain-vs-computer-memory]] — DevRev Tech Lead가 GBrain(개인 메모리)과 DevRev Computer Memory(엔터프라이즈 메모리)를 맞대어 본다. shared, two-way sync, 권한 차이가 초점.
- [[applications/vectorize-2026-gbrain-review-honest-assessment]] — Vectorize.io의 솔직한 어세스먼트. 위 scorecard가 여기서 나왔고, BrainBench·LongMemEval 수치를 정리해 둔다.
- [[applications/mantena-2026-hermes-gbrain-setup-vps]] — AWS EC2 + Hermes 위에 GBrain을 올리고 X(Twitter) 수집까지 훑는 풀세트 튜토리얼. PATH 이슈, 그리고 OAuth 2.0 PKCE로 ngrok 없이 likes를 긁는 법.
- [[applications/techwealth-hub-2026-garry-tan-gbrain-explained]] — 5분 45초짜리 YouTube 영상. brain agent loop, 4개 DB primitives(entity registry · event ledger · fact store · relationship graph), verification runbook을 transcript 기반으로 간추린다.

## 메모 (Notes)

- 본 ai-wiki의 `CLAUDE.md` 역시 Karpathy LLM Wiki 패턴을 다중 자료형으로 넓힌 것이고, GBrain은 그 패턴을 *에이전트가 직접 read/write*하는 축으로 밀어 production화했다. 두 프로젝트는 markdown source-of-truth + retrieval layer + compounding이라는 같은 thesis에서 갈라진 두 변형인 셈이다.
- 인용한 수치(17,888 pages / 4,383 people / 723 companies, 21 cron jobs, 12 days)는 전부 README 첫 단락에 실린 Garry Tan 본인 brain의 통계다.
