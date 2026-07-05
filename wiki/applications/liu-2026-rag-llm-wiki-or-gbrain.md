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

Yanli Liu가 쓴 15분짜리 architectural decision framework. *"What is your agent's job?"* 질문 하나로 메모리 아키텍처를 **3축**으로 가른다:

| 축 | 별칭 | 적합 조건 |
|---|---|---|
| **RAG** | The Retriever | 10K+ doc, 잦은 변경, 빠른 prod 출시 |
| **LLM Wiki** | The Compiler | 수백 sources, compound 가치, synthesis |
| **Fat Skills (GBrain)** | The Operator | autonomous action, 엔지니어링 의지, single power user |

2026 트렌드 결론은 *"retrieve · compile · act가 단일 knowledge operating system으로 수렴"*. Karpathy LLM Wiki v2는 retrieval을 더했고, GBrain skills는 이미 Postgres+pgvector로 query하며, Claude Code는 CLAUDE.md(wiki)+auto-memory(compound)+skills(act) 3패턴을 무의식적으로 구현하고 있다.

## 주요 기여 (Key Contributions)

1. **3축 결정 프레임워크** — *"what is your agent's job?"* 한 질문으로 RAG/Wiki/Skills 가운데 하나를 고른다.
2. **RAG 7-failure-point에서 agent에 치명적인 3개 추림** — chunking / re-derivation / passivity.
3. **Context window ≠ memory** — 1M token 모델도 300-400K(30-40%) 지점에서 degrade가 시작되고 세션이 끝나면 reset된다.
4. **LLM Wiki 3-layer 정식화** — raw(immutable) / wiki(LLM 소유) / schema(CLAUDE.md). 한 번 ingest하면 10-15 page를 touch하고, 쿼리 응답이 wiki page로 file되어 다음 쿼리가 그 위에서 덕을 본다.
5. **LLM Wiki scale ceiling** — ~100 sources에 수백 page까지는 무난하지만 **10K에서 깨지고**, 100K 규모면 RAG로 돌아가야 한다.
6. **"Thin harness, fat skills"의 정량 근거** — 하니스는 ~200 LOC로 얇게 두고 지능은 markdown skill 쪽에 몰아준다. *"Fewer fatter skills makes the resolver shorter."*
7. **Resolver = skill description의 부산물** — explicit routing code가 따로 필요 없다.
8. **Fat skill 실물 YAML** — `enrich` skill frontmatter를 그대로 인용한다(name/version/description/triggers/tools/mutating/writes_to). *"That's not a prompt template. It's a contract."*
9. **3-tier enrichment** — inner-circle(all APIs, deep web) / industry figures(web+social+brain cross-ref) / tracking only. inline `[Source: ...]` citation이 필수이며, 우선순위는 user > compiled truth > timeline > external APIs.
10. **Always-on signal-detector** — 모든 message에 parallel cheap sub-agent를 붙인다. original ideas를 verbatim으로 받고 entity mention도 함께 캡처한다. *"An unlinked mention is a broken brain."*
11. **Cron-as-autonomous-agent** — 잡 프롬프트는 *"Read skills/{name}/SKILL.md and run it"* 한 줄로 끝난다. 5분 staggered, quiet hours(기본 23-08), idempotent, `reports/{job}/{YYYY-MM-DD-HHMM}.md` audit.
12. **Latent vs Deterministic 분리** — *"Mixing them is how agents hallucinate."*
13. **Convergence 예측 (2026)** — knowledge OS는 retrieve + compile + act가 합쳐진 형태가 된다. Claude Code가 이미 3패턴을 hint한다.

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

### The Knowledge Gap — context window ≠ memory

```
   ┌─ Context Window (in-session) ──────────────────────────────┐
   │                                                              │
   │  1M token 모델 │██████████████████░░░░░░░░░░░░░░░░░░░░│      │
   │                ↑                                              │
   │           ★ 300K-400K (30-40%) 지점에서 degrade 시작         │
   │                                                              │
   │  세션 종료 ────▶ 전부 reset (다음 대화는 zero에서 다시 시작) │
   │                                                              │
   └──────────────────────────────────────────────────────────────┘
                              │
                              ▼  보완
   ┌─ Persistent Knowledge ──────────────────────────────────────┐
   │                                                              │
   │  LLM Wiki  ▶  cross-ref [[wikilinks]] · compound page touch │
   │  GBrain    ▶  Postgres + pgvector + brain pages             │
   │              ↑                                               │
   │       세션 간 보존, 누적 compound                            │
   │                                                              │
   └──────────────────────────────────────────────────────────────┘

   요지 — context window는 memory가 아니다 (주요 기여 #3 시각화).
```

### LLM Wiki 3-tier — Karpathy 패턴 시각화

```
       사용자 질문                  LLM (knowledge engineer)
            │                                  ▲
            ▼                                  │
   ┌────────────────┐                  ┌──────┴──────┐
   │  Tier 1: raw/  │  ─ ingest ─▶     │  Tier 2:    │ ◀── 쿼리 응답을
   │  (immutable)   │   ★ 1 ingest =   │  wiki/      │     wiki page로 file
   │  pdf · md · …  │   10-15 page     │  (LLM 소유) │     (compound:
   └────────────────┘   touch          │  cross-ref  │      tomorrow's
                                       │  [[links]]  │      queries benefit)
                                       └──────┬──────┘
                                              │ guided by
                                              ▼
                                       ┌─────────────┐
                                       │  Tier 3:    │
                                       │  CLAUDE.md  │
                                       │  (schema/   │
                                       │   지시문)   │
                                       └─────────────┘
   scale ceiling — ~100 sources에 수백 page는 무난, 10K에서 깨짐, 100K면 RAG 회귀
```

### Signal-detector + Cron-as-agent — GBrain 패턴 시각화

```
                          사용자 메시지
                                │
              ┌─────────────────┴─────────────────┐
              ▼                                    ▼
       main agent                       cheap sub-agent (parallel)
   (~200 LOC thin harness)              always-on signal-detector
              │                                    │
              │ skill resolver은                   │ original idea verbatim
              │ skill description의                │ + entity mention 캡처
              │ 부산물                             │
              ▼                                    ▼
       fat markdown skill                    brain page로 file
   (YAML contract: name·                          │
    triggers·tools·mutating·                      │ "An unlinked mention
    writes_to)                                    │  is a broken brain"
              │                                    ▼
              ▼                            knowledge compound
       mutating action

   ─── cron-as-autonomous-agent ─────────────────────────────────────────
    5분 staggered │ quiet hours 기본 23-08 │ idempotent
    job 프롬프트 = "Read skills/{name}/SKILL.md and run it"  (1줄로 끝)
    audit log    → reports/{job}/{YYYY-MM-DD-HHMM}.md
   ──────────────────────────────────────────────────────────────────────
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

### Convergence (2026) — Knowledge Operating System 수렴

```
        RETRIEVE                COMPILE                  ACT
         (RAG)                (LLM Wiki)            (Fat Skills/GBrain)
       embed → retrieve     raw / wiki /            thin harness
       chunking · re-deriv   schema (CLAUDE.md)     ~200 LOC
       passivity 3대 실패    1 ingest = 10-15       + cron + signal
            │                  page touch                │
            │                     │                      │
            └──────────┬──────────┴──────────┬───────────┘
                       │                     │
                       ▼                     ▼
              ┌──────────────────────────────────────┐
              │   Knowledge Operating System (2026)  │
              │     retrieve + compile + act         │
              │     단일 access point 수렴            │
              └──────────────────────────────────────┘
                              │
                              ▼
   힌트 — Claude Code = CLAUDE.md(wiki) + auto-memory(compound) + skills(act)
          이미 3패턴을 한 도구에서 무의식적으로 구현 (주요 기여 #13).
   추가 신호 — Karpathy LLM Wiki v2가 retrieval을 더했고,
              GBrain skills는 Postgres+pgvector로 query 중.
```

## 결과 (Results)

정량 벤치마크는 없다(architectural essay). 글에 등장하는 정량 수치는 다음과 같다:

- Karpathy gist: 5,000 stars in days.
- GBrain: **24 skills, 21 cron jobs, 17,888 pages** (글 작성 시점 2026-04-27).
- Context window: 1M token도 **300K~400K(30-40%) 지점에서 degrade**.
- RAG: 2024 논문이 **7 failure point**를 매핑했고, 그중 **3개는 LLM이 context를 보기 전에 발생**한다.
- LLM Wiki: 한 번 ingest하면 **10-15 page를 touch**한다.
- GBrain harness: **~200 LOC**, 24개 skill 각각이 E2E + eval + unit test로 묶여 있다.

## 한계 (Limitations)

- 같은 corpus에 RAG vs Wiki vs Skills를 R@5/latency/cost로 비교한 정량 head-to-head 자료가 없다.
- 글에 나온 **24 skills**와 [[applications/garrytan-gbrain]] README의 **43 curated skills**(2026-05-22 clone)가 어긋난다 — 4월 27일과 5월 22일 사이에 늘어났을 수도, "active"와 "shipped 포함" 정의가 달랐을 수도 있다. **숫자가 어긋나는 자료를 cross-check할 때는 시점 차이를 함께 보자**.
- RAG 7-failure-point의 출처가 된 2024 논문 링크가 빠져 있다.
- *"Karpathy LLM Wiki v2 community extensions"* 같은 convergence 시그널에 구체 링크가 없다.
- Enterprise alternative(Mem0/Zep/Letta/DevRev Computer Memory)가 3-축에 빠져 있어 [[applications/gajjar-2026-gbrain-vs-computer-memory]]가 이 부분을 보완한다.

## 관련 페이지 (Related Pages)

- [[applications/garrytan-gbrain]] — 본 글이 묘사하는 1차 source. `enrich` skill YAML이 verifiable한 직접 인용으로 들어 있다.
- [[applications/vectorize-2026-gbrain-review-honest-assessment]] — "skills as code, not config" 평가가 본 글의 "fat skills"와 같은 디자인 인사이트로 이어진다.
- [[applications/gajjar-2026-gbrain-vs-computer-memory]] — compounding thesis(*"compound > retrieve"*)를 enterprise 축에서 받쳐 준다.
- [[applications/mantena-2026-hermes-gbrain-setup-vps]] — *"can't npm install someone else's brain"* 한계의 실전 우회(Hermes 위임 + cron + OAuth).
- [[applications/techwealth-hub-2026-garry-tan-gbrain-explained]] — 영상의 brain agent loop을 본 글의 "An unlinked mention is a broken brain" 원칙과 묶어 읽을 수 있다.
- [[overviews/gbrain-ecosystem-overview]] — 본 글이 **6번째 source**로 합류하면서 Open Question #4 (Medium 미수집)가 해소된다.
- [[database/li-2026-beyond-semantic-similarity-rethinking-retrieval]] (DCI) — 본 글의 "RAG retrieves but never learns" 비판과는 다른 결의 RAG 반박(DCI는 인덱스 자체를 부정한다).
- [[database/vectifyai-pageindex]] (PageIndex) — vectorless reasoning-based RAG. 본 글 3축 가운데 "LLM Wiki + retrieval" hybrid의 한 구현이다.
- [[overviews/lightrag-family-graph-rag-overview]] — 본 글이 짚은 "graph+vector+semantic 단일 access point" 수렴 트렌드의 한 갈래.

<!-- HUMANIZE-SUMMARY v1.6.1
run_id: 2026-06-11-005
metrics:
  char_in: ~3850
  char_out: ~4020
  change_rate: ~9%
  self_check: 6/6
  grade: A
categories:  # before → after
  A-2 ~를 통해 남발: 0 → 0 (원문 미사용)
  D-1 결산 피벗: 1 (결론:) → 0 (자연어 서술로 흡수)
  C-11 연결어미 뒤 쉼표: 0 → 0
  H-3 메타 진입: 0 → 0
  E-2 종결 단조: 일부 명사구 종결 → 평서·서술 혼합
  F-4 명사화 누적: 노트형 압축어구 → 동사형 환원 (정식화/추림/부재/불일치 등)
self_check:
  - 고유명사·수치·인용 100% 보존: ✅ (5,000 stars, 24 skills, 21 cron jobs, 17,888 pages, 300K~400K, ~200 LOC, 2026-04-27, 2026-05-22 모두 그대로)
  - 변경률 30% 이하: ✅ (약 9% 추정, 노트형 표현을 자연 문장으로 풀어쓴 범위)
  - 장르 이탈 없음: ✅ (리포트 register 유지)
  - register 보존: ✅ (격식 평서체 유지)
  - S1 잔존 0건: ✅
  - 인공 표현 추가 없음: ✅ (원문에 없던 비유·수사 추가 없음)
highlights:
  - id: SUMMARY
    before: "한 질문으로 메모리 아키텍처를 3축으로 분류한다"
    after: "하나의 질문으로 메모리 아키텍처를 3축으로 가른다"
  - id: SUMMARY-TREND
    before: "2026 트렌드 결론: \"retrieve · compile · act가 ... 수렴\" — Karpathy ... 구현."
    after: "2026 트렌드 결론은 \"...수렴\". Karpathy LLM Wiki v2는 retrieval을 더했고, GBrain skills는 이미 ... 구현하고 있다."
  - id: KC-3
    before: "1M token도 300-400K(30-40%)에서 degrade + 세션 종료 시 reset."
    after: "1M token 모델도 300-400K(30-40%) 지점에서 degrade가 시작되고 세션이 끝나면 reset된다."
  - id: LIM-2
    before: "글의 24 skills ↔ ... 43 curated skills ... 불일치 — ... 시점 차이를 고려."
    after: "글에 나온 24 skills와 ... 43 curated skills가 어긋난다 — ... 시점 차이를 함께 보자."
  - id: REL-1
    before: "본 글이 묘사하는 1차 source. `enrich` skill YAML이 verifiable한 직접 인용."
    after: "본 글이 묘사하는 1차 source. `enrich` skill YAML이 verifiable한 직접 인용으로 들어 있다."
residual_findings: (없음)
grade_reason: "A — S1 0건, 변경률 약 9%, 자체검증 6항 통과. 리포트 register와 노트형 정보 밀도를 모두 유지하면서 명사구 종결 남발만 평서 서술로 풀었음. 표·코드블록·frontmatter·wikilink·영문 인용·수치 일체 불변."
-->
