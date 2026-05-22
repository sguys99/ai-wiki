---
title: "GBrain Review: An Honest Assessment (Vectorize)"
type: article
year: 2026
category: applications
raw_path: /Users/kmyu/Desktop/project/ai-wiki/raw/articles/vectorize-2026-gbrain-review-honest-assessment.md
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

Vectorize.io의 GBrain 정직한 어세스먼트. 10-dimension scorecard와 BrainBench·LongMemEval 수치, 6가지 강점·6가지 약점·4가지 clever choices를 균형 있게 정리한다. 결론: *"OpenClaw/Hermes 운영자 + plain-text 소유 + skill 작성 의지 + 다개월 horizon"이라면 최고의 markdown-first personal brain. 그 외 audience는 Hindsight 등 고려."*

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

1. **Compounding이 designed-in** — tiered enrichment / fail-improve loop / backlink-boosted ranking 세 메커니즘.
2. **Zero-LLM-call entity extraction** — daily ingestion 토큰 \$0.
3. **Hybrid retrieval, graph 끄면 −31.4 P@5pp** — typed-edge KG가 vector·BM25 hybrid 단독보다 lift가 큼.
4. **Plain-text ownership** — git diff·branch·재빌드 가능.
5. **Production infrastructure 성숙** — Minions, durable agent, skillify, doctor.
6. **Honesty of marketing** — published 수치가 코드 행동과 일치, install gotcha를 솔직히 문서화.

### 약점 6

1. Single-operator design.
2. No managed cloud.
3. Integration breadth가 좁음 (OpenClaw + Hermes만 first-class).
4. Schema discipline 필요 (skill 운영자 저작).
5. No multi-hop graph / temporal reasoning at retrieve.
6. v0.30 install gotchas (`bun install -g`, npm squat).

### Clever 4

- **Compiled truth + append-only timeline** page pattern.
- **Skills as code, not config** — fat markdown.
- **"Thin harness, fat skills"** ethos.
- **Localized problem scope** — "everyone's agent memory" 야망을 피함.

## 방법론 및 아키텍처 (Methodology and Architecture)

- Hybrid: HNSW (pgvector) + tsvector + ts_rank + RRF `score = Σ(1 / (60 + rank))` + 4-layer dedup + backlink boost + (옵션) Haiku query expansion.
- Cost-amortizing: zero-LLM entity 추출 + fail-improve loop가 활성 personal brain의 LLM 비용을 *월 single-digit USD*로 유지.
- 3 deployment shape 평가: OpenClaw/Hermes(agent-driven install) → CLI standalone → 그 외(MCP wiring 필요).

## 결과 (Results)

### BrainBench (240-page Opus rich-prose)

- 풀: **P@5 49.1%, R@5 97.9%**
- graph OFF: **−31.4 P@5pp**
- ripgrep-BM25 + vector-only 대비 similar margin 우세

### LongMemEval — gbrain-evals 보고 R@5 **97.60%**

### BEAM (10M long-horizon) — Hindsight 64.1%, **GBrain 미실행**

### Pricing — GBrain free (MIT), 활성 personal brain LLM 비용 *월 single-digit USD*.

## 한계 (Limitations)

- 본 리뷰의 long-term 시그널은 inference (직접 production 사용 아님).
- BEAM 미실행으로 long-horizon 비교 미해결.
- Hindsight/Mem0/Zep 등과 직접 비교는 corpus 차이로 1:1 매핑 불가.

## 관련 페이지 (Related Pages)

- [[applications/garrytan-gbrain]] — 본 리뷰가 평가한 1차 source.
- [[applications/gajjar-2026-gbrain-vs-computer-memory]] — multi-tenant 1/5 약점이 enterprise alternative(DevRev Computer Memory)의 입지를 정당화.
- [[applications/mantena-2026-hermes-gbrain-setup-vps]] — 30-min install + Hermes 자동 ingestion의 실전 기록.
- [[applications/techwealth-hub-2026-garry-tan-gbrain-explained]] — verification runbook ("sync ran ≠ sync worked")의 영상 요약.
