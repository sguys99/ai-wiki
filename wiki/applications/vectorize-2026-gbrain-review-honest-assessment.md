---
title: "GBrain Review: An Honest Assessment (Vectorize)"
type: article
year: 2026
category: applications
raw_path: raw/articles/vectorize-2026-gbrain-review-honest-assessment.md
raw_filename: "vectorize-2026-gbrain-review-honest-assessment.md"
source: vectorize-2026-gbrain-review-honest-assessment.md
source_collection: external
author: "Vectorize"
url: "https://vectorize.io/articles/gbrain-review"
publisher: "Vectorize.io"
publication_date: "2026-05-08"
tags: [gbrain, review, scorecard, brainbench, longmemeval, beam, hindsight, hybrid-search, openclaw, hermes]
---

## 요약 (Summary)

Vectorize.io가 GBrain을 솔직하게 평가한 글이다. 10-dimension scorecard를 바탕으로 BrainBench·LongMemEval 수치, 강점 6가지와 약점 6가지, 영리한 설계 선택 4가지를 한쪽으로 치우치지 않게 짚는다. 결론은 이렇다. OpenClaw나 Hermes를 운영하면서 plain-text를 직접 소유하고 skill을 짜 나갈 의지가 있으며 몇 달 단위 horizon을 내다본다면, markdown-first personal brain으로 이만한 선택지가 없다. 그런 조건에 맞지 않는 사용자라면 Hindsight 같은 대안을 함께 살펴보라는 것이다.

## 주요 기여 (Key Contributions)

### 10-dimension scorecard

| Dimension | Rating |
|---|---|
| Architecture | 5/5 |
| Retrieval quality | 4/5 |
| Cost efficiency | 5/5 |
| Day-one experience | 4/5 |
| Long-term value | 5/5 |
| Documentation | 4/5 |
| Integration breadth | **2/5** |
| Multi-tenant readiness | **1/5** |
| Maturity | 3/5 |
| Honesty of marketing | 5/5 |

### 강점 6

1. **Compounding이 designed-in** — tiered enrichment, fail-improve loop, backlink-boosted ranking 세 메커니즘이 복리 효과를 설계 단계에서 심어 뒀다.
2. **Zero-LLM-call entity extraction** — daily ingestion에 드는 토큰 비용이 \$0이다.
3. **Hybrid retrieval, graph 끄면 −31.4 P@5pp** — typed-edge KG를 얹으면 vector·BM25 hybrid 단독보다 lift가 눈에 띄게 크다.
4. **Plain-text ownership** — git diff·branch·재빌드가 그대로 된다.
5. **Production infrastructure 성숙** — Minions, durable agent, skillify, doctor가 갖춰져 있다.
6. **Honesty of marketing** — 공개한 수치가 실제 코드 동작과 맞고, install gotcha도 숨기지 않고 문서에 적어 뒀다.

### 약점 6

1. 한 사람이 운영하는 것을 전제로 설계됐다(single-operator design).
2. managed cloud가 없다.
3. Integration breadth가 좁아 OpenClaw와 Hermes만 first-class로 물린다.
4. skill을 운영자가 직접 짜야 해서 schema discipline이 요구된다.
5. retrieve 단계에서 multi-hop graph나 temporal reasoning은 지원하지 않는다.
6. v0.30에는 install gotcha가 있다(`bun install -g`, npm squat).

### Clever 4

- **Compiled truth + append-only timeline** — 페이지 구성 패턴 자체가 그렇다.
- **Skills as code, not config** — 설정이 아니라 코드로, 두툼한 markdown에 담는다.
- **"Thin harness, fat skills"** — harness는 얇게, skill은 두껍게 가는 철학.
- **Localized problem scope** — "모두의 agent memory"라는 야망은 접고 문제 범위를 좁게 잡았다.

## 방법론 및 아키텍처 (Methodology and Architecture)

- Hybrid: HNSW (pgvector) + tsvector + ts_rank + RRF `score = Σ(1 / (60 + rank))` + 4-layer dedup + backlink boost + (옵션) Haiku query expansion.
- Cost-amortizing: zero-LLM entity 추출과 fail-improve loop가 맞물려, 활발히 쓰는 personal brain의 LLM 비용을 *월 single-digit USD*로 묶어 둔다.
- deployment shape는 세 갈래로 나눠 평가한다. OpenClaw/Hermes는 agent-driven install, 그다음이 CLI standalone, 나머지는 MCP wiring이 필요한 경우다.

## 결과 (Results)

### BrainBench (240-page Opus rich-prose)

- 풀: **P@5 49.1%, R@5 97.9%**
- graph OFF: **−31.4 P@5pp**
- ripgrep-BM25 + vector-only 대비 similar margin 우세

### LongMemEval — gbrain-evals 보고 R@5 **97.60%**

### BEAM (10M long-horizon) — Hindsight 64.1%, **GBrain 미실행**

### Pricing — GBrain free (MIT), 활성 personal brain LLM 비용 *월 single-digit USD*.

## 한계 (Limitations)

- 이 리뷰가 말하는 long-term 시그널은 직접 production에서 굴려 본 게 아니라 inference에 기댄 것이다.
- BEAM을 돌리지 않아 long-horizon 비교는 아직 결론이 없다.
- Hindsight·Mem0·Zep과 직접 견주려 해도 corpus가 달라 1:1로 맞대기 어렵다.

## 관련 페이지 (Related Pages)

- [[applications/garrytan-gbrain]] — 본 리뷰가 평가한 1차 source.
- [[applications/gajjar-2026-gbrain-vs-computer-memory]] — multi-tenant 1/5 약점이 enterprise alternative(DevRev Computer Memory)의 입지를 정당화.
- [[applications/mantena-2026-hermes-gbrain-setup-vps]] — 30-min install + Hermes 자동 ingestion의 실전 기록.
- [[applications/techwealth-hub-2026-garry-tan-gbrain-explained]] — verification runbook ("sync ran ≠ sync worked")의 영상 요약.
