---
title: "RAG, LLM Wiki, or GBrain? — 3-축 결정 프레임워크 (Liu)"
type: article
year: 2026
category: applications
raw_path: /Users/kmyu/Desktop/project/ai-wiki/raw/articles/liu-2026-rag-llm-wiki-or-gbrain.md
raw_filename: "liu-2026-rag-llm-wiki-or-gbrain.md"
source: liu-2026-rag-llm-wiki-or-gbrain.md
source_collection: external
author: "Yanli Liu"
url: "https://ai.gopubby.com/rag-llm-wiki-or-gbrain-how-your-agent-remembers-changes-everything-56829e66725c"
publisher: "ai.gopubby.com (Medium)"
publication_date: "2026-04-27"
tags: [rag, llm-wiki, gbrain, karpathy, garry-tan, fat-skills, decision-framework, retrieve-compile-act, signal-detector, thin-harness, claude-code]
---

## 요약 (Summary)

Yanli Liu의 15분짜리 architectural decision framework. *"What is your agent's job?"* 한 질문으로 메모리 아키텍처를 **3축**으로 분류한다:

| 축 | 별칭 | 적합 조건 |
|---|---|---|
| **RAG** | The Retriever | 10K+ doc, 잦은 변경, 빠른 prod 출시 |
| **LLM Wiki** | The Compiler | 수백 sources, compound 가치, synthesis |
| **Fat Skills (GBrain)** | The Operator | autonomous action, 엔지니어링 의지, single power user |

2026 트렌드 결론: *"retrieve · compile · act가 단일 knowledge operating system으로 수렴"* — Karpathy LLM Wiki v2가 retrieval 추가, GBrain skills가 이미 Postgres+pgvector query, Claude Code가 CLAUDE.md(wiki)+auto-memory(compound)+skills(act) 3패턴을 무의식적으로 구현.

## 주요 기여 (Key Contributions)

1. **3축 결정 프레임워크** — *"what is your agent's job?"*로 RAG/Wiki/Skills 중 단일 선택.
2. **RAG 7-failure-point 중 agent에 치명적인 3개 추림** — chunking / re-derivation / passivity.
3. **Context window ≠ memory** — 1M token도 300-400K(30-40%)에서 degrade + 세션 종료 시 reset.
4. **LLM Wiki 3-layer 정식화** — raw(immutable) / wiki(LLM 소유) / schema(CLAUDE.md). 단일 ingest = 10-15 page touch + 쿼리 응답이 wiki page로 file → tomorrow's queries benefit.
5. **LLM Wiki scale ceiling** — ~100 sources 수백 page OK, **10K에서 깨짐**, 100K에서는 RAG 회귀 필요.
6. **"Thin harness, fat skills"** 정량 — 하니스 ~200 LOC, 지능은 markdown skill에. *"Fewer fatter skills makes the resolver shorter."*
7. **Resolver = skill description의 부산물** — explicit routing code 불필요.
8. **Fat skill 실물 YAML** — `enrich` skill frontmatter 그대로 인용 (name/version/description/triggers/tools/mutating/writes_to). *"That's not a prompt template. It's a contract."*
9. **3-tier enrichment** — inner-circle (all APIs, deep web) / industry figures (web+social+brain cross-ref) / tracking only. inline `[Source: ...]` citation 필수, 우선순위 user > compiled truth > timeline > external APIs.
10. **Always-on signal-detector** — 모든 message에 parallel cheap sub-agent. original ideas verbatim + entity mention 캡처. *"An unlinked mention is a broken brain."*
11. **Cron-as-autonomous-agent** — 잡 프롬프트 *"Read skills/{name}/SKILL.md and run it"* 한 줄. 5분 staggered, quiet hours(기본 23-08), idempotent, `reports/{job}/{YYYY-MM-DD-HHMM}.md` audit.
12. **Latent vs Deterministic 분리** — *"Mixing them is how agents hallucinate."*
13. **Convergence 예측 (2026)** — knowledge OS = retrieve + compile + act 통합. Claude Code가 이미 3패턴 hint.

## 방법론 및 아키텍처 (Methodology and Architecture)

```
                   "What is your agent's job?"
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
   RETRIEVE answers       COMPILE knowledge     ACT autonomously
   from large corpus      that compounds         on what it knows
        │                     │                     │
        ▼                     ▼                     ▼
   ┌─────────┐           ┌────────────┐        ┌────────────┐
   │   RAG   │           │  LLM Wiki  │        │ Fat Skills │
   │  (mature│           │ (Karpathy) │        │  (GBrain)  │
   │  scale) │           │ (compound) │        │   (act)    │
   └─────────┘           └────────────┘        └────────────┘
   embed→store           raw / wiki /          thin harness
   →retrieve→gen          schema (CLAUDE.md)   ~200 LOC +
   chunking+re-deriv     1 ingest →            fat markdown
   +passivity 3대         10-15 page touch     skills (contract)
   failure                                     + cron + signal
```

### 세 아키텍처의 핵심 trade-off (Liu의 행렬)

| | RAG | LLM Wiki | Fat Skills |
|---|---|---|---|
| 스케일 | 100K+ | <1K sources | personal scope |
| 학습 | ❌ | ✅ (compound) | ✅ (skill 갱신) |
| 자율 액션 | ❌ | ❌ | ✅ |
| 성숙도 | 매우 높음 | 신생 | 신생, 1인 운영 |
| 컴플라이언스 | 강함 (audit) | 파생물 audit 이슈 | 미개척 |
| 즉시 출시 | ✅ | LLM 비용 부담 | 엔지니어링 codebase 필요 |

## 결과 (Results)

정량 벤치마크 없음 (architectural essay). 인용된 정량 수치:

- Karpathy gist: 5,000 stars in days.
- GBrain: **24 skills, 21 cron jobs, 17,888 pages** (글 작성 시점 2026-04-27).
- Context window: 1M token도 **300K~400K(30-40%)에서 degrade**.
- RAG: 2024 논문이 **7 failure point** 매핑, **3개는 LLM이 context 보기 전 발생**.
- LLM Wiki: 단일 ingest = **10-15 page touch**.
- GBrain harness: **~200 LOC**, 24 skill은 E2E + eval + unit test.

## 한계 (Limitations)

- 정량 head-to-head 비교(같은 corpus에 RAG vs Wiki vs Skills R@5/latency/cost) 부재.
- 글의 **24 skills** ↔ [[applications/garrytan-gbrain]] README의 **43 curated skills**(2026-05-22 clone) 불일치 — 4월 27일 → 5월 22일 사이 늘어난 것일 수 있고, "active" vs "shipped 포함" 정의 차이일 수도. **숫자가 다른 자료 간에 cross-check할 때 시점 차이를 고려**.
- RAG 7-failure-point의 2024 논문 출처 부재.
- *"Karpathy LLM Wiki v2 community extensions"* 등 convergence 시그널은 구체 링크 없음.
- Enterprise alternative(Mem0/Zep/Letta/DevRev Computer Memory)는 3-축에 포함되지 않음 — [[applications/gajjar-2026-gbrain-vs-computer-memory]]가 보완.

## 관련 페이지 (Related Pages)

- [[applications/garrytan-gbrain]] — 본 글이 묘사하는 1차 source. `enrich` skill YAML이 verifiable한 직접 인용.
- [[applications/vectorize-2026-gbrain-review-honest-assessment]] — "skills as code, not config" 평가가 본 글의 "fat skills"와 같은 디자인 인사이트.
- [[applications/gajjar-2026-gbrain-vs-computer-memory]] — compounding thesis(*"compound > retrieve"*)를 enterprise 축에서 보완.
- [[applications/mantena-2026-hermes-gbrain-setup-vps]] — *"can't npm install someone else's brain"* 한계의 실전 우회 (Hermes 위임 + cron + OAuth).
- [[applications/techwealth-hub-2026-garry-tan-gbrain-explained]] — 영상의 brain agent loop과 본 글의 "An unlinked mention is a broken brain" 원칙 결합 가능.
- [[overviews/gbrain-ecosystem-overview]] — 본 글이 **6번째 source**로 합류해 Open Question #4 (Medium 미수집) 해소.
- [[database/li-2026-beyond-semantic-similarity-rethinking-retrieval]] (DCI) — 본 글의 "RAG retrieves but never learns" 비판과 다른 방향의 RAG 반박 (DCI는 인덱스 자체를 부정).
- [[database/vectifyai-pageindex]] (PageIndex) — vectorless reasoning-based RAG. 본 글 3축 중 "LLM Wiki + retrieval" hybrid의 한 구현.
- [[overviews/lightrag-family-graph-rag-overview]] — 본 글이 거론한 "graph+vector+semantic 단일 access point" 수렴 트렌드의 한 갈래.
