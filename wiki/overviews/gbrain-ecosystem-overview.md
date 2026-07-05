---
title: "GBrain 생태계 — Markdown-first 에이전트 메모리 계열"
type: overview
year: 2026
category: overviews
source_collection: synthesis
sources:
  - garrytan-gbrain.md
  - gajjar-2026-gbrain-vs-computer-memory.md
  - vectorize-2026-gbrain-review-honest-assessment.md
  - mantena-2026-hermes-gbrain-setup-vps.md
  - techwealth-hub-2026-garry-tan-gbrain-explained.md
  - liu-2026-rag-llm-wiki-or-gbrain.md
tags: [gbrain, agent-memory, overview, synthesis, karpathy-llm-wiki, compounding-memory, hybrid-search, knowledge-graph, brainbench, longmemeval, openclaw, hermes, dream-cycle, memex, retrieve-compile-act, fat-skills, thin-harness, decision-framework]
---

## 요약 (Summary)

**GBrain**(Y Combinator CEO Garry Tan, 2026-04-05 open-source)이 나온 뒤 6주 만에 그 주위로 1차 자료 생태계가 형성됐다. 이 overview는 wiki에 실재하는 다음 **6개 자료**를 한데 묶는다.

| 자료 | 유형 | 시점 | 위치 |
|---|---|---|---|
| garrytan/gbrain (repo) | repo | clone 2026-05-22 (v0.36.x) | [[applications/garrytan-gbrain]] |
| GBrain vs DevRev Computer Memory | article | 2026-05-08 | [[applications/gajjar-2026-gbrain-vs-computer-memory]] |
| GBrain Honest Assessment (Vectorize) | article | 2026-05-08 | [[applications/vectorize-2026-gbrain-review-honest-assessment]] |
| Hermes + GBrain VPS Setup (escvelocity) | article | 2026-05-06 / 갱신 2026-05-15 | [[applications/mantena-2026-hermes-gbrain-setup-vps]] |
| Garry Tan's GBrain Explained (TechWealth Hub) | video | 2026-04-11 (5분 45초) | [[applications/techwealth-hub-2026-garry-tan-gbrain-explained]] |
| RAG, LLM Wiki, or GBrain? (Liu, Medium) | article | 2026-04-27 | [[applications/liu-2026-rag-llm-wiki-or-gbrain]] |

핵심 메시지 세 줄:

- **공통 thesis** — *"Memory that **compounds** beats memory that just **retrieves**"* (Gajjar). 대화·meeting·source가 하나씩 지날 때마다 시스템이 조금씩 똑똑해진다. 이 *compounding loop* (READ-before-answer → WRITE-after-learn → AUTO-LINK → SYNC)를 운영 차원에서 실제로 닫아내는 것, 그게 GBrain의 정체성이다. 영상은 이를 가장 짧게 정의한다 — *"the difference between a static knowledge base and a living one"*.
- **3-layer 분리** — **brain repo (markdown, source-of-truth)** ↔ **GBrain (Postgres + hybrid retrieval, derived index)** ↔ **agent (read/write)**. verification runbook 전체가 *"Vector DB는 derived index, source of truth 아님"*이라는 한 문장에서 뻗어 나온다.
- **네 축의 확장** — (1) **engineering 축** (GBrain core repo: Postgres+pgvector, zero-LLM typed-edge KG, Minions, ZeroEntropy), (2) **operational 축** (Mantena 가이드: Hermes 위임 ingestion + ngrok-bypass OAuth), (3) **comparative 축** (Vectorize의 10-dimension scorecard + Gajjar의 personal↔enterprise 비교), (4) **architectural-positioning 축** (Liu의 "RAG = retrieve / Wiki = compile / Skills = act" 3-축 결정 프레임워크와 *"retrieve · compile · act가 단일 knowledge OS로 수렴"* 예측). 영상은 이 네 축으로 들어가는 입구 역할을 한다.

## 1. 계보와 위치 (Lineage and Positioning)

```
   Vannevar Bush "memex" (1945)
        │  (README가 명시적으로 호명)
        │
   ┌────▼────────────────────────────┐
   │ Karpathy "LLM Wiki" 패턴 (~2026) │ ◄─── 본 ai-wiki/CLAUDE.md의 공통 시조
   │ gist 5,000 stars in days (Liu)  │      Mantena · Liu가 명시적으로 인용
   │ (markdown source-of-truth +     │
   │  LLM 큐레이션)                  │
   └────┬────────────────────────────┘
        │
        │  "agent가 직접 read/write" 축으로 production화
        ▼
   ┌──────────────────────────────────────────────────────────┐
   │  GBrain (Garry Tan, 2026-04-05)                          │  ◄── 본 overview의 trunk
   │  brain repo (md) → Postgres+pgvector → agent loop        │
   │  + zero-LLM KG + Minions + dream cycle + skill pack 43   │
   └──────────────────────────────────────────────────────────┘
        │              │                │                │
        │ operational  │ comparative    │ educational    │ architectural-
        ▼              ▼                ▼                ▼  positioning
   Mantena 가이드   Vectorize 리뷰   TechWealth Hub    Liu (Medium)
   (Hermes + AWS)   (10-dim          (5:45 영상)       RAG vs Wiki vs
   + Gajjar 비교    scorecard)                         Skills 3-축
   (DevRev CM)                                         + convergence
```

본 ai-wiki와의 관계를 보면, 두 프로젝트 모두 *Karpathy LLM Wiki + Bush memex* 라인을 production으로 끌어올렸지만 무게중심이 다르다. **GBrain은 "에이전트가 직접 brain을 read/write"** 하고, **본 ai-wiki는 "사용자·LLM이 함께 큐레이션"** 한다. 같은 thesis가 갈라져 나온 두 변형인 셈이다.

## 2. 5개 자료의 cross-source 합의 (Cross-source Agreement)

아래 사실들은 여러 자료가 서로 참조 없이 **같은 수치·문구로** 보고했으므로 합의로 본다.

| 사실 | repo | Vectorize | Mantena | Gajjar | TechWealth | Liu |
|---|---|---|---|---|---|---|
| 출시일 2026-04-05 | — | ✅ | — | — | (6일 뒤 영상) | (3주 후 글) |
| 17,888 pages (Tan 본인 brain) | ✅ | (간접) | — | ✅ | (1주차 10,000+) | ✅ |
| 4,383 people / 723 companies | ✅ | — | — | ✅ | — | — |
| BrainBench P@5 **49.1%**, R@5 **97.9%** | ✅ | ✅ | — | — | — | — |
| graph layer OFF → **−31.4 P@5pp** | ✅ | ✅ | — | — | — | — |
| Postgres + pgvector + HNSW + tsvector + RRF | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| "compiled truth + append-only timeline" schema | ✅ | ✅ | — | ✅ | ✅ | ✅ ([Source:...] precedence) |
| dream cycle | ✅ | ✅ | (cron) | (간접) | ✅ | (cron 7-step) |
| zero-LLM typed-edge entity 추출 | ✅ | ✅ | — | — | ✅ | ✅ ("signal-detector") |
| LongMemEval **R@5 97.60%** (gbrain-evals) | ✅ | ✅ | — | — | — | — |
| MIT license, TypeScript/Bun | ✅ | ✅ | ✅ | — | — | — |
| **24 skills / 21 cron** (시점: 2026-04-27) | — | — | — | — | — | ✅ |
| **43 skills** (시점: 2026-05-22 clone) | ✅ | (간접 "34+ shipped") | — | — | — | — |

→ 핵심 수치(P@5 49.1, +31.4pp, R@5 97.60, 17,888 pages)는 **자료 3개 이상에서 교차 확인**되어 신뢰도가 높다. 다만 **skill 수는 4월 24개에서 5월 43개로 달라졌는데**, Liu 글과 repo clone 사이 한 달 남짓한 기간에 실제로 늘었거나, *active*만 세느냐 *shipped까지* 포함하느냐의 정의 차이일 수 있다.

## 3. 운영 모델 — Brain Agent Loop

세 자료(repo · video · mantena)가 거의 같은 표현으로 정의한다.

```
  signal   →   search    →   respond     →   write     →   auto-link    →   sync
  (every     (brain-       (informed       (page +       (typed edges     (cron keeps
  message)   first         by context)     timeline)     + backlinks)     fresh)
             retrieval)
```

영상(TechWealth)의 요약이 가장 간결하다 — *"signal arrives → entity detect → check brain first → answer with context → update brain → sync"*. Vectorize는 이 loop이야말로 "compounding이 designed-in"이라는 말의 정의라고 짚는다.

### 3.1 4개 DB primitive (영상에서 호명, repo와 일치)

- **entity registry** — 사람·회사 named entity 인덱스
- **event ledger** — append-only timeline
- **fact store** — typed claim (`mrr=50000` 같은 first-class column)
- **relationship graph** — typed edge 집합 (`attended`, `works_at`, `invested_in`, `founded`, `advises`, `mentions`)

### 3.2 Hybrid retrieval 스택

| 레이어 | 출처 |
|---|---|
| HNSW cosine over pgvector | repo + Vectorize |
| Postgres tsvector + ts_rank | repo + Vectorize |
| RRF `score = Σ(1 / (60 + rank))` | repo + Vectorize |
| 4-layer dedup | repo + Vectorize |
| Backlink-boosted ranking | repo + Vectorize |
| Optional Haiku query expansion | repo + Vectorize |
| Search mode 3종 (conservative/balanced/tokenmax) | repo |
| ZeroEntropy reranker `zerank-2` default (v0.36.2.0) | repo |

→ **typed-edge graph가 hybrid search 단독보다 retrieval lift를 더 끌어올린다**(graph를 끄면 −31.4 P@5pp)는 점은 GBrain 설계에서 비교적 보기 드문 결과다.

## 4. Verification Runbook — *"Sync ran ≠ sync worked"*

영상에서 *"my favorite part of the source package"*라고 꼽은 핵심 운영 contract다. repo와 영상이 똑같은 패턴을 강제한다.

1. `gbrain sync --repo /path/to/brain` (markdown → DB)
2. `gbrain embed` (stale chunk backfill)
3. page count 검증
4. embedding coverage 검증
5. 한 페이지 edit
6. 다음 sync cycle 대기
7. 수정 텍스트로 검색 → reflect 확인

알려진 failure mode도 repo와 영상이 함께 확인해준다 — *"wrong Supabase puller가 silently 페이지를 건너뛸 수 있다"*, skill pack에 명시된 내용이다.

Mantena 가이드는 이 패턴을 실제 운영으로 보여준다. 5분마다 `gbrain sync` cron을 돌리고, `gbrain doctor`로 health check를 걸고, sync.log를 tail로 지켜보는 식이다.

## 5. 한계 — 외부 자료가 합의하는 6가지 (Vectorize scorecard 기반)

| 한계 | 점수 | 근거 |
|---|---|---|
| Multi-tenant readiness | **1/5** | repo가 single-operator design center, multi-user는 Postgres + git 동기화 추가 부담 |
| Integration breadth | **2/5** | first-class skillpack은 OpenClaw + Hermes만. Claude Code/Cursor/CrewAI/LangGraph/LlamaIndex/AutoGen은 MCP wiring 필요 |
| Maturity | 3/5 | v0.30 계열 breaking change 잦음. `bun install -g` + npm squat 2 footgun |
| No managed cloud | (자유 서술) | exclusively self-hosted, "Hindsight Cloud" equivalent 없음 |
| No multi-hop graph / temporal at retrieve | (자유 서술) | write-time typed edge 추출하나 retriever는 multi-hop 우선 안 함 |
| Schema discipline 필요 | (자유 서술) | skill·workflow를 운영자가 저작, set-and-forget이면 오류 누적 |

Gajjar는 이 가운데 *multi-tenant + permission* 두 항목을 근거 삼아 enterprise alternative(DevRev Computer Memory + AirSync + SOC 2)의 필요성을 정당화한다.

Mantena 가이드는 *Integration breadth가 좁다*는 한계를 우회하는 요령을 보여준다. OpenClaw나 Hermes의 first-class skillpack이 없어도, Hermes에게 *"Ingest this PDF: …. Write the brain page to ~/brain/"* 한 줄만 던지면 사실상 자동 ingestion으로 굴러간다.

## 6. Compounding — 세 메커니즘 (Vectorize 정리)

1. **Tiered enrichment** — 1 mention → stub (Tier 3) / 3 cross-source → web+social (Tier 2) / meeting 또는 8+ mention → full pipeline (Tier 1). 별도 지시 없이도 무엇이 중요한지를 스스로 배운다.
2. **Fail-improve loop** — 분류가 LLM fallback으로 넘어갈 때마다 그 실패 사례에서 더 나은 regex를 뽑아낸다. 그래서 시간이 지날수록 LLM 호출이 오히려 **줄어든다**.
3. **Backlink-boosted ranking** — 다른 brain page가 가리키는 page에 retrieval boost를 준다. typed edge 추출과 맞물려 자연스럽게 작동한다.

→ Vectorize의 *"long-term value 5/5"* 평가와 영상의 *"the system gets smarter with each conversation"*, 둘은 결국 같은 메커니즘을 가리킨다.

## 6.5 Liu의 3-축 메모리 분류 — GBrain의 좌표 (architectural positioning)

Liu(2026-04-27)는 GBrain을 더 큰 지도 위에 올려놓는다. *"agent의 job이 무엇이냐"*는 질문 하나로 메모리 아키텍처를 세 축으로 가른다.

| Liu의 별칭 | 패턴 | 적합 조건 | 대표 |
|---|---|---|---|
| **The Retriever** | RAG | 10K+ doc, 잦은 변경, prod deadline | LangChain · LlamaIndex |
| **The Compiler** | LLM Wiki | 수백 sources, compound, synthesis | Karpathy gist (본 ai-wiki도 이 축) |
| **The Operator** | Fat Skills | autonomous action, 엔지니어링 의지, single power user | **GBrain** |

GBrain이 *"가장 새롭다"*고 평가받는 건 *"knowledge that acts"*를 노린다는 점 때문이다. Wiki는 *"it knows but doesn't do"*에, RAG는 *"waits to be asked"*에 머무는 반면, fat skills + cron + signal-detector + dream cycle은 *"운영자가 자는 동안 brain이 스스로 갱신"*하는 데까지 나아간다.

**Liu가 본 overview에 새로 더하는 디테일**:

- **Thin harness 정량** — GBrain harness는 ~200 LOC (모델 실행 · 파일 R/W · safety). 모든 지능은 fat markdown skill에. *"Fewer fatter skills makes the resolver shorter."*
- **Resolver의 통찰** — RESOLVER.md가 dispatcher처럼 보이지만, 실은 **skill description 자체가 resolver**다. 모델이 description을 읽고 intent를 맞추므로 explicit routing code가 아예 필요 없다.
- **Fat skill 실물 YAML 인용** — `enrich` skill의 frontmatter를 verbatim 게재 (`triggers` · `tools` · `mutating: true` · `writes_to: [people/, companies/]`). *"That's not a prompt template. It's a contract."*
- **`[Source: ...]` precedence hierarchy** — user statements > compiled truth > timeline > external APIs.
- **Always-on signal-detector** — 모든 message에서 parallel cheap sub-agent로 (1) original ideas verbatim(절대 paraphrase 안 함) + (2) entity mention 캡처. *"An unlinked mention is a broken brain."*
- **Cron 잡 본문은 한 줄** — *"Read skills/{name}/SKILL.md and run it."* 5분 staggered + quiet hours(23-08 기본) + idempotent + `reports/{job}/{YYYY-MM-DD-HHMM}.md` audit.
- **Latent vs Deterministic 분리** — synthesis/reading/pattern은 LLM, DB write/calculation은 code. *"Mixing them is how agents hallucinate."*
- **RAG의 3대 치명적 failure (agent 관점)** — chunking + re-derivation + passivity. 첫 두 개는 LLM Wiki가, 셋 다는 fat skills가 해결.
- **Context window ≠ memory** 강조 — 1M token도 300-400K (30-40%)에서 degrade + 세션 종료 시 reset.

### 2026 Convergence 예측 (Liu)

*"retrieve · compile · act가 단일 knowledge OS로 수렴"*한다는 예측이다. 그 신호는 다음과 같다.

- Karpathy LLM Wiki v2 community extension이 retrieval layer 추가 (compounding ↔ scale).
- GBrain skills가 이미 Postgres+pgvector query (action ↔ retrieval).
- Neo4j 같은 enterprise 플랫폼이 graph+vector+semantic을 단일 access point로.
- **Claude Code가 이미 3패턴 무의식적 구현** — CLAUDE.md=mini-wiki(compound) + auto-memory(compound) + skills(action). *"not a deliberate implementation, but the same pressures produced the same solutions."*

## 7. Personal ↔ Enterprise 축 (Gajjar 비교 정식화)

| 축 | GBrain | DevRev Computer Memory |
|---|---|---|
| 운영 단위 | single-operator personal brain | 조직 전체 |
| 권한 | git markdown / OS file perm | SOC 2 SSO + 행 수준 권한 |
| 소스 연결 | manual / Hermes 위임 / MCP wiring | AirSync 양방향 sync (50+ SaaS: Salesforce/Jira/Zendesk/Slack) |
| 호스팅 | self-hosted (PGLite or Postgres) | managed SaaS |
| 검증 가능 정량 | BrainBench / LongMemEval 코드 공개 | 비공개 |

Gajjar가 던지는 메시지는 *"zero-sum이 아니다"*라는 것이다. 두 시스템은 사실상 **다른 사용자 군**(개인 운영자 vs 엔터프라이즈 팀)을 겨냥하지만, 결국 같은 compounding 원리를 각자 증명해 보인다.

## 8. Open Questions (지식 복리를 위한 다음 ingest 후보)

1. **Hindsight 비교** — Vectorize는 BEAM 10M-token 벤치에서 Hindsight가 64.1%로 앞선다고 인용하지만, GBrain은 BEAM을 아예 돌리지 않았다. Vectorize의 further reading에 걸린 *"GBrain vs Hindsight"* 글을 ingest하면 long-horizon 갭을 재볼 수 있다.
2. **Mem0 / Zep / Letta 등 production memory 플랫폼과의 정량 비교** — Vectorize의 *"Best AI agent memory systems compared"* 글이 후보.
3. **Conductora.com / Conducto** — 영상에서만 등장한 로컬-first orchestration 레이어. repo·다른 자료에는 부재 → 별도 자료 ingest 필요.
4. **~~ai.gopubby Medium 글~~ — RESOLVED (2026-05-22)** — Yanli Liu의 *"RAG, LLM Wiki, or GBrain?"*은 사용자 수동 저장으로 본 overview의 6번째 source로 합류. Cloudflare 차단은 [[applications/liu-2026-rag-llm-wiki-or-gbrain]]에서 우회. 새로 들어온 디테일: thin harness **~200 LOC**, signal-detector *"An unlinked mention is a broken brain"*, cron 잡 본문이 literally *"Read skills/{name}/SKILL.md and run it"*, latent vs deterministic 분리 *"Mixing them is how agents hallucinate"*, convergence 예측 (retrieve+compile+act 통합 knowledge OS).
5. **multi-hop graph traversal / temporal reasoning at retrieve** — Vectorize가 한계로 지목. GBrain 후속 릴리스에 이 영역이 들어가는지 trace할 가치.
6. **OpenClaw + Hermes 자체** — GBrain의 first-class consumer인 두 에이전트 플랫폼은 아직 ai-wiki에 없다. 같은 저자의 ecosystem 전체를 조망하려면 우선순위가 높다.
7. **LongMemEval / BrainBench 벤치 자체** — `gbrain-evals` repo와 LongMemEval(HuggingFace `xiaowu0162/longmemeval`)을 별도 자료로 ingest하면, 지금 비어 있는 본 wiki의 `evaluations/` 카테고리를 채울 수 있다.

## 9. 본 ai-wiki와의 관계 (Karpathy LLM Wiki 패턴의 두 변형)

| | 본 ai-wiki | GBrain |
|---|---|---|
| 시조 | Karpathy LLM Wiki gist | Karpathy LLM Wiki + Bush memex (README 호명) |
| 작성 주체 | 사용자 + LLM 협업 큐레이션 | AI 에이전트가 read/write |
| Source of truth | `raw/` (immutable) + `sources/` + `wiki/` 3-tier | `~/brain/` git markdown 단일 layer |
| Retrieval | (현재) `[[wikilinks]]` + Obsidian + grep | Postgres + pgvector + HNSW + BM25 + RRF + graph |
| 환각 방지 contract | "wiki에 없으면 그렇다고 말한다" (Four Rules #4) | "Vector DB는 derived index, source of truth 아님" |
| 컴파운딩 매개 | `wiki/overviews/` 합성 페이지 (이 페이지처럼) | dream cycle + tiered enrichment + fail-improve loop |
| 다중 유형 | papers/repos/articles/reports/videos/books/lectures 7종 | 모두 markdown (Hermes 위임으로 형식 통일) |

→ 두 시스템은 *Karpathy 패턴 + Bush memex*를 서로 **직교하는 두 축**으로 밀어붙인다. GBrain은 *"에이전트가 brain을 직접 관리"*하고, 본 wiki는 *"사용자가 큐레이션 + LLM이 합성"*한다. 둘을 엮을 여지도 있다. GBrain skill pack을 본 wiki의 4-Rule contract와 맞물릴 수만 있다면, 본 wiki의 `wiki/overviews/` 합성 페이지를 GBrain의 *compiled truth* layer로 쓰는 실험을 해볼 만하다.

## 10. 관련 페이지 (Related Pages)

- [[applications/garrytan-gbrain]] — repo (1차 source)
- [[applications/gajjar-2026-gbrain-vs-computer-memory]] — personal↔enterprise 비교
- [[applications/vectorize-2026-gbrain-review-honest-assessment]] — 10-dim scorecard + BrainBench/LongMemEval 수치
- [[applications/mantena-2026-hermes-gbrain-setup-vps]] — Hermes + AWS 운영 가이드 + X OAuth ngrok-bypass
- [[applications/techwealth-hub-2026-garry-tan-gbrain-explained]] — 5:45 영상 (DB primitives + verification runbook)
- [[applications/liu-2026-rag-llm-wiki-or-gbrain]] — 3-축 결정 프레임워크 + thin harness 200 LOC + signal-detector + cron 1-liner + convergence 예측

본 wiki의 다른 retrieval 자료와의 cross-link:

- [[database/li-2026-beyond-semantic-similarity-rethinking-retrieval]] (DCI, 2026) — DCI는 embedding 없이 `grep`/`bash`로 raw corpus에 직접 접근한다. GBrain의 "vector DB = derived index, markdown = source" thesis와 정확히 정반대 끝에 선 retrieval 철학이다. DCI가 derived index 자체를 버린다면, GBrain은 derived index를 강하게 유지하되 source 우위 contract를 건다.
- [[database/vectifyai-pageindex]] (PageIndex, 2025) — "vectorless reasoning-based RAG". GBrain의 typed-edge graph보다 한 걸음 더 나가 hierarchical TOC tree만 남긴다. 이로써 *"hybrid search + graph"* vs *"agent tree-search"* vs *"agent + grep"* 세 갈래 retrieval 철학을 나란히 비교할 자료군이 갖춰진다.
- [[overviews/lightrag-family-graph-rag-overview]] — graph-based RAG 계열 overview. GBrain의 typed-edge auto-extraction은 LightRAG에서 "LLM이 entity·relation 추출"하던 단계를 *zero-LLM regex로 갈아 끼운* 변형으로 볼 수 있다. 비용과 recall 사이 트레이드오프를 견줘볼 만하다.
