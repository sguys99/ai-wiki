---
title: "RAG, LLM Wiki, or Gbrain? How Your Agent Remembers Changes Everything"
type: article
year: 2026
category: applications
raw_path: raw/articles/liu-2026-rag-llm-wiki-or-gbrain.md
raw_filename: "liu-2026-rag-llm-wiki-or-gbrain.md"
source_collection: external
author: "Yanli Liu"
url: "https://ai.gopubby.com/rag-llm-wiki-or-gbrain-how-your-agent-remembers-changes-everything-56829e66725c"
publisher: "ai.gopubby.com (Medium publication)"
publication_date: "2026-04-27"
tags: [rag, llm-wiki, gbrain, karpathy, garry-tan, fat-skills, decision-framework, retrieve-compile-act, hybrid-architecture, signal-detector, thin-harness, context-window, chunking]
---

## 한 줄 요약 (One-line Summary)

**Yanli Liu**의 15분짜리 결정-프레임워크 에세이. 에이전트 메모리를 *"agent의 job이 무엇이냐"* 한 질문으로 **3축 분류**(RAG = retrieve at scale / Karpathy LLM Wiki = compile & compound / Garry Tan GBrain "fat skills" = operationalize & act) 하고, 2026년 트렌드는 *"retrieve · compile · act가 단일 knowledge operating system으로 수렴"* 이라고 단언한다. Karpathy gist(5,000 stars in days), GBrain 통계(24 skills · 21 cron jobs · 17,888 pages), 1M-token context window의 **300K~400K(30-40%)에서 degradation 시작**, RAG의 7-failure-point 2024 논문, GBrain `enrich` skill의 실제 YAML frontmatter, *"thin harness ~200 LOC + fat skills"* 원칙, signal-detector "An unlinked mention is a broken brain", cron의 *"Read skills/{name}/SKILL.md and run it"* 한 줄 dispatcher까지 — GBrain 디자인의 **암묵적 운영 원리**를 외부 자료 중 가장 풍부하게 정리.

## 1. 자료 정보 (Document Information)

- **저자**: Yanli Liu
- **매체**: Medium의 ai.gopubby.com publication
- **URL**: <https://ai.gopubby.com/rag-llm-wiki-or-gbrain-how-your-agent-remembers-changes-everything-56829e66725c>
- **게시**: 2026-04-27 (Karpathy gist 약 3주 후 / GBrain 출시 약 3주 후)
- **분량**: 15분 read · 1.3K claps · 9 responses (수집 시점)
- **수집 방법**: Cloudflare 차단으로 WebFetch 불가 → 사용자가 본문을 수동 복사·붙여넣기 (CLAUDE.md articles 기본 워크플로우)
- **외부 관점**: 마케팅 톤 거의 없는 architectural decision framework 에세이. 3개 아키텍처를 거의 동등한 분량으로 다룸.

## 2. 주요 기여 (Key Contributions)

1. **"What is your agent's job?" 단일 질문 → 3축 결정 프레임워크** —
   - retrieve answers from large corpus → **RAG**
   - compile knowledge that compounds → **LLM Wiki**
   - act autonomously on what it knows → **fat skills (GBrain)**
2. **RAG의 7-failure-point 중 3개를 "agent 관점에서 가장 치명적"으로 추림** —
   - **chunking problem**: 30-page spec이 500-token fragment로 쪼개져 compliance 요구사항과 이유가 다른 vector에 → 기술적으로는 맞고 dangerously incomplete한 답.
   - **re-derivation problem**: Karpathy 인용 *"RAG rereads the same books for every exam, never actually learning the material."*
   - **passivity problem**: 어제 인덱싱한 문서와 오늘 문서가 모순돼도 알아채지 못함.
3. **Context window ≠ memory** — 1M token도 **300K-400K (30-40%)에서 degradation 시작**, 세션 종료 시 0으로 리셋.
4. **LLM Wiki의 3-layer 정식화** —
   - 하단: 원본 (immutable, LLM은 읽기만)
   - 중간: wiki (LLM이 소유, summaries · entity pages · concept · cross-reference)
   - 상단: schema (CLAUDE.md 같은 운영 규칙 — 명명 규칙·cross-ref 규칙·contradiction 정의)
5. **LLM Wiki compounding 정량**: 단일 ingest가 **typically 10–15 wiki pages를 touch** (cross-ref 추가, contradiction flag, entity profile 갱신). query 응답이 다시 wiki page로 file되어 *tomorrow's queries benefit from today's synthesis*.
6. **Lint workflow** — 정기적으로 LLM이 wiki 전체를 audit: orphan page · stale claim · 미생성 concept page. *"the machine does the maintenance humans always abandon."*
7. **LLM Wiki의 scale ceiling** — ~100 sources / 수백 page까지는 BM25/grep으로 OK, **10,000에서 navigation 깨짐**, **100,000에서는 retrieval 레이어 추가 필요 → RAG로 회귀**.
8. **GBrain의 "thin harness, fat skills" 정량** — 하니스 **~200 LOC** (모델 실행 · 파일 R/W · safety), 모든 지능은 fat markdown skill로.
9. **Resolver 통찰** — RESOLVER.md가 dispatcher처럼 보이지만 **실은 skill description 자체가 resolver**. 모델이 description을 읽고 intent 매칭 → explicit routing code 불필요. Tan 인용: *"Fewer fatter skills makes the resolver shorter, which itself is less context bloat."*
10. **Fat skill 실물 YAML frontmatter** — GBrain `enrich` skill을 그대로 인용:
    ```yaml
    name: enrich
    version: 1.0.0
    description: |
      Enrich brain pages with tiered enrichment protocol.
      Creates and updates person/company pages with compiled
      truth, timeline, and cross-links.
    triggers: ["enrich", "create person page", ...]
    tools: [get_page, put_page, search, add_link, add_timeline_entry]
    mutating: true
    writes_to: [people/, companies/]
    ```
    이 frontmatter가 *"prompt template이 아니라 contract"* 라는 점.
11. **7-step enrichment + 3-tier protocol** — inner-circle (all APIs, deep web), industry figures (web+social+brain cross-ref), tracking only (light touch). 모든 claim은 `[Source: ...]` inline citation 필수, 우선순위: user statements > compiled truth > timeline > external APIs.
12. **Skill philosophy 인용** — *"Intelligence dossiers, not LinkedIn scrapes."*
13. **Always-on signal-detector skill** — 모든 inbound message에서 cheap sub-agent로 parallel 실행. 두 가지를 캡처: (1) original ideas(**user의 정확한 phrasing 보존, 절대 paraphrase 안 함**), (2) entity mentions. *"An unlinked mention is a broken brain."*
14. **Cron-as-autonomous-agent** — 잡 프롬프트는 literally *"Read skills/{name}/SKILL.md and run it."* — 모든 지능이 skill 파일에. 5분 staggered slot으로 collision 방지, quiet hours(기본 23-08), idempotent, 결과는 `reports/{job-name}/{YYYY-MM-DD-HHMM}.md`로 audit trail.
15. **Latent vs Deterministic 분리** — synthesis/reading/pattern은 LLM, DB write/calculation/reproducible output은 deterministic code. *"Mixing them is how agents hallucinate."*
16. **Convergence 예측 (2026)** — Karpathy LLM Wiki v2 community extension이 retrieval layer 추가, GBrain skills가 이미 Postgres+pgvector query, Neo4j가 graph+vector+semantic을 단일 access point로. 2026년 질문은 *"which wins"*가 아니라 *"how fast retrieve/compile/act 경계가 dissolve해서 단일 knowledge OS가 되느냐"*.
17. **Claude Code가 이미 3 패턴 hint** — CLAUDE.md = mini-wiki (persistent compound), auto-memory = compounding, skills = action. *"not a deliberate implementation, but the same pressures produced the same solutions."*

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 RAG — The Retriever

- 파이프라인: embed → store → retrieve → generate.
- 성숙도: LangChain · LlamaIndex 등 표준화, *"your team probably already knows how to build one"*.
- 강점: 100K+ doc 일일 변경, 즉시 인덱싱 가능 (preprocessing 불필요).
- 약점: chunking은 chunk size 튜닝으로 안 풀리는 구조적 문제. 멀티스테이지(embedding/vector search/rerank/context packaging) latency가 **40 tool call 루프에서 second 단위로 누적**.
- 컴플라이언스 친화 — vector store ownership, retrieval auditable, generation traceable.
- **Verdict**: 10K+ doc + 변경 잦음 + production deadline일 때. agent learning이 필요하면 부적합.

### 3.2 LLM Wiki — The Compiler

- 3-layer: raw (immutable) / wiki (LLM 소유) / schema (CLAUDE.md).
- Compounding: 1 ingest → 10-15 page touch (cross-ref · contradiction flag · entity update). 쿼리 응답도 wiki page로 file → 다음 쿼리에 누적.
- Lint workflow: orphan · stale claim · 미생성 concept 정기 audit.
- Scale ceiling: BM25/grep는 ~100 sources, 10K에서 깨짐, 100K에서는 RAG로 회귀.
- Cost: 매 ingest에 LLM이 새 source + 영향받는 wiki page들을 읽고 재작성 → RAG embedding보다 훨씬 비쌈.
- 한계: passive. deadline 지났는지·문서 모순됐는지·정책 위반인지 **act하지 않음**.
- Governance: 파생물(summary, cross-ref, synthesis)이 audit 대상이 되는 규제 환경 주의.
- **Verdict**: 수백 sources + compound 가치 + synthesis 필요. real-time freshness · massive scale · autonomous action 필요하면 부적합.

### 3.3 Fat Skills — The Operator

- *"Thin harness (~200 LOC) + fat skills (markdown)"* 인버전.
- Harness: 모델 실행 + 파일 R/W + safety만.
- Skill: trigger · checks · chain · quality bar를 markdown contract로.
- Resolver = skill description의 부산물. *"Fewer fatter skills"* 트렌드.
- Always-on signal-detector: 모든 message에서 cheap sub-agent로 parallel 실행 → original ideas(verbatim) + entity mentions.
- Cron: *"Read skills/{name}/SKILL.md and run it"* 한 줄, 5분 staggered, quiet hours, idempotent, audit trail.
- Deterministic split: LLM judgment ≠ DB write/calculation.
- 한계: 24 skill에 E2E test + eval + unit test 필요한 **codebase**. *"can't `npm install` someone else's brain."* Single-operator design.
- **Verdict**: autonomous action 필요 + 엔지니어링 의지 + 한 power user가 팀 위해 workflow 정의 가능할 때. 광범위한 조직 access 필요하면 부적합.

### 3.4 Hybrid 미래

- *"won't stay in a single lane"* — 가장 capable한 production system은 RAG(retrieve) + Wiki(synthesize) + Skills(act) 3축 결합.
- 신호: Karpathy LLM Wiki v2 + retrieval layer / GBrain skills가 Postgres+pgvector query / Neo4j가 graph+vector+semantic 통합 / Claude Code의 CLAUDE.md+auto-memory+skills 3패턴.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

이 글은 자체 벤치마크가 없는 architectural essay. 인용된 정량 수치는:

- Karpathy gist: 5,000 stars in days.
- GBrain: 24 autonomous skills, 21 cron jobs, 17,888 pages (Tan 본인 brain).
- Context window: 1M token도 **300K-400K (30-40%)에서 degradation 시작**.
- RAG: 2024 논문이 7개 failure point 매핑, 그중 3개가 **LLM이 context를 보기도 전에 발생**.
- LLM Wiki: 단일 ingest가 typically **10-15 wiki page touch**.
- LLM Wiki 한계: ~100 sources / 수백 page OK, **10K에서 깨짐**, **100K에서는 RAG 회귀 필요**.
- GBrain harness: **~200 LOC**, 24 skill은 E2E + eval + unit test 풀세트.
- GBrain cron quiet hours: 기본 23–08.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **글 자체의 한계**: 3 아키텍처 각각의 정량 비교(예: 같은 corpus에 RAG vs LLM Wiki vs Fat Skills의 R@5/latency/cost)를 제공하지 않음. 결정 프레임워크 수준의 안내.
- **GBrain 묘사가 24 skills + 21 cron jobs** — 본 wiki의 [[applications/garrytan-gbrain]] (clone 2026-05-22)는 *"43 curated skills"* 로 README가 적시. 약 1개월 사이 24 → 43으로 늘어난 것일 수 있고, 또는 글의 24가 active skill / 43이 shipped 포함의 차이일 수 있다. **숫자가 다른 자료 간에 cross-check할 때 시점 차이를 고려**.
- **OpenClaw + Hermes + Claude Code**가 GBrain의 first-class consumer로 호명되나 본 글은 그 세 플랫폼 자체를 깊이 다루지 않음.
- **2024 RAG 7-failure-point 논문**의 정확한 인용 정보 부재 (저자·제목·URL 미명시).
- **"Karpathy LLM Wiki v2 community extensions"** 등 convergence 시그널은 구체 repo 링크 없이 거론.
- **enterprise alternative** (Mem0, Zep, Letta, DevRev Computer Memory)는 본 글의 3-축 분류에 들어가지 않음.

## 6. 관련 연구 (Related Work)

- [[applications/garrytan-gbrain]] — 본 글이 묘사하는 GBrain의 1차 source. 본 글이 `enrich` skill의 YAML frontmatter를 직접 인용해 verifiable.
- [[applications/gajjar-2026-gbrain-vs-computer-memory]] — 같은 compounding thesis(*"compound > retrieve"*)를 enterprise 축에서 보완.
- [[applications/vectorize-2026-gbrain-review-honest-assessment]] — Vectorize의 "skills as code, not config" 평가와 본 글의 "fat skills" 분석이 같은 디자인 인사이트를 다른 각도에서 진술.
- [[applications/mantena-2026-hermes-gbrain-setup-vps]] — 본 글이 거론한 *"can't npm install someone else's brain"* 한계의 실전 우회 (Hermes 위임 ingestion + cron + OAuth).
- [[applications/techwealth-hub-2026-garry-tan-gbrain-explained]] — 영상의 brain agent loop 정의와 본 글의 signal-detector "An unlinked mention is a broken brain" 원칙이 결합 가능.
- [[overviews/gbrain-ecosystem-overview]] — 본 글을 **6번째 source**로 합류시켜 *"Open Question #4: ai.gopubby Medium 미수집"* 을 해소.
- [[database/li-2026-beyond-semantic-similarity-rethinking-retrieval]] (DCI) — 본 글의 "RAG retrieves but never learns" 비판과 DCI의 "embedding 없이 grep으로 raw corpus 직접"는 **다른 방향의 RAG 반박** (DCI는 인덱스 자체를 부정, 본 글은 RAG를 retrieval layer로 유지하면서 wiki/skill 추가).
- [[database/vectifyai-pageindex]] (PageIndex) — vectorless reasoning-based RAG. 본 글의 3축 중 *"LLM Wiki + retrieval"* hybrid의 한 구현으로 볼 수 있음.
- [[overviews/lightrag-family-graph-rag-overview]] — graph-based RAG 계열. 본 글이 거론한 *"Neo4j가 graph+vector+semantic을 단일 access point로"* 와 같은 convergence 트렌드.
- **Karpathy LLM Wiki gist** — 본 ai-wiki의 시조이기도 함. 본 글은 5,000 stars in days 정도만 거론, 직접 링크는 없음.

## 7. 용어집 (Glossary)

- **The Retriever / The Compiler / The Operator**: Liu의 3-축 별칭. RAG / LLM Wiki / Fat Skills(GBrain).
- **Retrieve · Compile · Act**: 동일 3축의 동사 형태. 2026 수렴 트렌드의 축.
- **Chunking problem / Re-derivation problem / Passivity problem**: agent 관점에서 가장 치명적인 RAG 3 failure.
- **Knowledge gap (context window vs persistent knowledge)**: 1M token context도 300-400K(30-40%)에서 degrade + 세션 종료 시 reset → memory 아님.
- **Lint workflow**: LLM이 wiki 전체를 정기 audit (orphan, stale, 미생성 concept). LLM Wiki 헬스 유지 메커니즘.
- **Thin harness, fat skills**: GBrain의 inversion. 하니스 ~200 LOC, 지능은 markdown skill에.
- **Resolver as skill description**: explicit routing code 없이 skill description이 dispatcher 역할.
- **Always-on signal-detector**: 모든 inbound message에 parallel cheap sub-agent. original ideas verbatim + entity mention 캡처.
- **An unlinked mention is a broken brain**: signal-detector의 운영 원칙.
- **Cron skill prompt**: 잡 본문은 *"Read skills/{name}/SKILL.md and run it"* 한 줄.
- **Latent vs deterministic work**: 전자=LLM(synthesis/reading/pattern), 후자=code(DB write/calc). 섞으면 hallucinate.
- **Tiered enrichment (3-tier)**: inner-circle / industry figures / tracking only. (본 wiki의 [[applications/garrytan-gbrain]]의 1/2/3 Tier와 일치하지만 정의 방식이 약간 다름 — README는 mention 횟수, 본 글은 관계 깊이로 분류.)
- **Intelligence dossiers, not LinkedIn scrapes**: GBrain enrich skill의 철학.
- **Convergence (knowledge OS)**: retrieve+compile+act를 단일 시스템으로 통합. Liu의 2026 예측.
