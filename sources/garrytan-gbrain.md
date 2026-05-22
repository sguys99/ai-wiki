---
title: "garrytan/gbrain"
type: repo
year: 2026
category: applications
raw_path: /Users/kmyu/Desktop/project/ai-wiki/raw/repos/garrytan-gbrain
raw_filename: "garrytan-gbrain/"
source_collection: external
org: "garrytan"
repo: "gbrain"
url: "https://github.com/garrytan/gbrain"
license: "MIT"
language: "TypeScript"
version: "0.36.x (cloned 2026-05-22)"
tags: [agent-memory, personal-brain, markdown-first, knowledge-graph, hybrid-search, pgvector, pglite, hnsw, bm25, rrf, mcp, openclaw, hermes, zeroentropy, longmemeval, brainbench, karpathy-llm-wiki, minions, dream-cycle]
---

## 한 줄 요약 (One-line Summary)

`garrytan/gbrain`은 Y Combinator의 Garry Tan이 자신의 OpenClaw·Hermes 에이전트를 위해 만든 markdown-first **AI 에이전트 메모리 시스템**으로, git markdown 저장소를 source-of-truth로 두고 그 위에 Postgres + pgvector hybrid retrieval, zero-LLM entity 추출 기반 self-wiring knowledge graph, 43개 skill pack, nightly "dream cycle"을 결합해 *대화를 거듭할수록 똑똑해지는* 영속 메모리를 제공한다 (MIT, TypeScript/Bun, BrainBench P@5 49.1% · R@5 97.9%).

## 1. 자료 정보 (Document Information)

- **저장소**: <https://github.com/garrytan/gbrain> (실제 clone으로 검증, HEAD `f2e11d6`)
- **저자**: Garry Tan (Y Combinator President & CEO)
- **언어**: TypeScript 97.9%, Shell 1.4%
- **런타임/패키지 매니저**: Bun
- **라이선스**: MIT
- **이름의 의미**: README에 "the memex Vannevar Bush imagined, built for people who think for a living"라고 명시
- **자매 repo**: [`garrytan/gbrain-evals`](https://github.com/garrytan/gbrain-evals) (BrainBench scorecard, LongMemEval 측정값)
- **연관 에이전트 플랫폼**: [`garrytan/openclaw`](https://github.com/garrytan/openclaw), [`garrytan/hermes`](https://github.com/garrytan/hermes)
- **공식 출시**: 2026-04-05 (Vectorize.io 리뷰 인용 — 24시간 만에 ~5,000 stars, 작성 시점 ~14,000 stars)
- **현재 버전**: v0.36.x 계열 (clone 시점 2026-05-22)

> Garry Tan 본인의 production brain 규모: **17,888 pages, 4,383 people, 723 companies, 21 cron jobs autonomously, 12 days로 구축** (README 첫 단락).

## 2. 주요 기여 (Key Contributions)

1. **Markdown 저장소가 source-of-truth, DB는 derived index**: 사용자는 평문 `.md` 파일을 git으로 소유한다. PGLite/Postgres는 derive된 인덱스이므로 손실되어도 repo에서 재빌드 가능 (`gbrain sync && gbrain embed`). `git diff`로 에이전트가 밤새 학습한 내용을 검토하고, 실험적 재구조화는 git branch로 격리한다.
2. **Zero-LLM-call entity 추출 + self-wiring KG**: 모든 `put_page` 시 markdown/wikilink/typed-link 문법에서 regex·문자열 매칭만으로 typed edge(`attended`, `works_at`, `invested_in`, `founded`, `advises`, `mentions`, …)를 즉시 발사한다 → 대용량 ingestion이 토큰 비용 사실상 $0.
3. **Hybrid retrieval가 vector-only RAG를 +31.4 P@5pp로 이김**: HNSW(pgvector) + Postgres tsvector BM25 + Reciprocal Rank Fusion `score = Σ(1 / (60 + rank))` + 4-layer dedup + backlink-boosted ranking + (옵션) Claude Haiku query expansion. BrainBench(240-page Opus rich-prose) P@5 49.1%, R@5 97.9%이며 그래프 레이어를 끄면 −31.4pp.
4. **"Compiled truth + append-only timeline" 페이지 패턴**: 모든 brain page는 상단에 "현재 진실"(증거 변화에 따라 재작성), 하단에 "append-only timeline"(증거 추적)을 갖는다 → "stale memory vs unbounded growth" 트레이드오프를 감사 가능한 구조로 해결.
5. **세 가지 배포 형태와 한 contract**: PGLite(WASM Postgres 17, zero-config, <50K pages) ↔ Postgres + pgvector(Supabase/self-hosted, 공유·다중머신). 양쪽이 같은 `BrainEngine` interface(`src/core/engine.ts`, ~47 ops)를 구현 → CLI와 MCP 서버가 단일 source에서 생성.
6. **43개 skill pack ("thin harness, fat skills")**: 런타임은 의도적으로 얇고, 지능은 markdown `skills/` 파일들과 `skills/RESOLVER.md` 라우팅 테이블에 산다. 운영자는 skill을 fork·교체할 수 있다.
7. **Minions = Postgres-native durable job queue**: BullMQ 모양의 잡 큐. Durable subagent(LLM tool loop이 crash 후 two-phase `pending→done` persistence로 재개), shell job audit, child job + cascading timeout, outbound provider rate lease, S3/Supabase attachment.
8. **Dream cycle (밤마다 brain이 스스로 정리)**: cron으로 도는 enrichment·citation fixer·salience scorer·contradiction finder·tomorrow-task prep.
9. **3-tier 자동 enrichment 정책**: 한 번 언급 → stub page (Tier 3) / 3회 cross-source → web+social 보강 (Tier 2) / meeting 또는 8회+ → full pipeline (Tier 1). 명시 지시 없이 중요도를 학습.
10. **Fail-improve loop**: 분류 작업이 LLM fallback에 빠질 때마다 실패 케이스로부터 더 나은 regex를 생성 → 시간이 갈수록 동일 워크로드의 LLM 호출이 *감소*.
11. **공개·재현 가능한 BrainBench eval + LongMemEval 통합**: `gbrain eval longmemeval` (97.60% R@5 보고), `gbrain eval export/replay` (실제 쿼리 캡처·코드 변경에 재생), `gbrain eval cross-modal` (3개 다른 provider frontier 모델로 cross-check), `gbrain eval suspected-contradictions` (sampling + date pre-filter + query-conditioned LLM judge).
12. **v0.36.2.0 default: ZeroEntropy** — embedding `zembed-1`(1280d, Matryoshka), reranker `zerank-2`. OpenAI 대비 **2.2× 빠르고**(442ms vs 973ms), **2.6× 저렴**($0.05/M vs $0.13), 20개 head-to-head 쿼리 중 11승, second-pass reranker로 쓰면 top-1의 60%를 재배열.
13. **v0.36.4.0: `gbrain doctor --remediate --yes --target-score 90 --max-usd 5`**: 의존성 정렬된 plan 계산 → Minion job submit → 단계마다 score 재측정 → cost cap 초과 거부. cron으로 unattended 운영 가능.
14. **v0.35.7: temporal trajectory + founder scorecard**: `## Facts` fence 안에 typed 메트릭(`mrr=50000`, `arr=2000000`, `team_size=12`)을 적으면 first-class typed column으로 저장. `gbrain eval trajectory companies/acme-example`이 시계열 + regression flag 출력, `gbrain founder scorecard`가 claim accuracy/consistency/growth/red flags를 `schema_version: 1` JSON으로 롤업.
15. **MCP 서버 (stdio + HTTP)** — `gbrain serve --http`는 OAuth 2.1 + per-client scope(`read`/`write`/`admin`) + DCR-style client registration + 내장 rate limit + `/admin` SSE activity feed. Claude Desktop/Code/Cursor/ChatGPT/Perplexity/Cowork 모두 first-class.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 The brain agent loop (README 인용)

```
signal  →  search   →  respond     →  write     →  auto-link    →  sync
(every    (brain-     (informed       (page +      (typed edges     (cron keeps
message)  first       by context)     timeline)    + backlinks)     fresh)
          retrieval)
```

- **Signal detector**: 모든 메시지에서 아이디어·엔티티 mention·time-sensitive todo·이름·링크 캡처.
- **Brain-first lookup**: 외부 API 호출 전에 가장 싸고 빠르고 개인적인 정보원(=내 brain) 먼저 조회.
- **Auto-link**: 매 page write 시 `[[wiki/people/bob]]` 같은 reference에서 LLM 호출 없이 typed edge 추출. 새 엔티티 → 새 stub page → graph가 자동 성장.
- **Cron-driven enrichment (dream cycle)**: dedup people, fix citations, score salience, find contradictions, prep tomorrow tasks.

### 3.2 Two engines, one contract

- **PGLite (WASM Postgres 17)**: 개인 brain ≤50K pages. zero-config, 2초 init, server 없음.
- **Postgres + pgvector** (Supabase 또는 self-hosted): 공유·대규모·다중머신.
- 양 엔진이 `BrainEngine` interface(`src/core/engine.ts`, ~47 ops)를 구현 → CLI/MCP가 single source에서 생성.

### 3.3 Two organizational axes (brain ⊥ source)

- **Brain** = database (개인 brain, team mount).
- **Source** = brain 안의 한 repo (wiki, gstack, essay, knowledge base).
- 라우팅은 `.gbrain-source` dotfile + 6-tier precedence chain.
- 다이어그램: [`docs/architecture/brains-and-sources.md`](https://github.com/garrytan/gbrain/blob/main/docs/architecture/brains-and-sources.md).

### 3.4 Retrieval 디테일

- **Search mode**: 3종(`conservative` / `balanced` / `tokenmax`)을 단일 config key로 토글. cost/recall 트레이드오프를 묶음. default: `balanced` + ZeroEntropy reranker on.
- **Graph 기여도**: vector-only는 "semantically close" chunk만, graph는 "factually connected" chunk를 반환 → hybrid가 둘 모두에서 끌어옴.
- **`gbrain graph-query people/garry-tan --depth 2`**: multi-hop traversal.

### 3.5 Database primitives (영상에서 transcribe된 schema 요약)

- **Entity registry** — 사람·회사 등 named entity 인덱스.
- **Event ledger** — append-only timeline.
- **Fact store** — typed claim(예: `mrr=50000`).
- **Relationship graph** — typed edge 집합 (`attended`, `works_at`, `invested_in`, …).

### 3.6 Minions (job queue) 상세

- BullMQ 모양, Postgres-native (외부 Redis 불필요).
- Durable subagent: 매 Anthropic turn을 `subagent_messages`에, 매 tool call을 `subagent_tool_executions`에 commit → worker crash 시 마지막 committed turn에서 재개.
- Shell job + audit, child job + cascading timeout, outbound provider용 rate lease, attachment via S3/Supabase storage.
- v0.36.4.0의 `--background` 플래그: `gbrain embed --background` → `job_id=N` 출력 후 즉시 종료 (shell composition).

### 3.7 Skill pack (43개) — "thin harness, fat skills" ethos

- 카테고리: signal capture / ingest(idea·media·meeting) / enrichment / querying / brain ops / citation fix / daily task management / cron scheduling / reports / voice / soul audit / skill creation / eval framework / migrations.
- 라우팅: `skills/RESOLVER.md`를 에이전트가 요청당 한 번 읽고 적절한 skill 선택 → 실행.
- Skill은 평문 markdown 파일 (tool-agnostic) — fork·교체 가능.
- `gbrain skillpack scaffold --all`(또는 skill 단위)로 운영자 repo에 first-class 멤버로 drop.
- v0.36.0.0에서 legacy "managed-block" 모델은 폐기, 업그레이드 시 `gbrain skillpack migrate-fence` 한 번.

### 3.8 통합(Integrations) 카탈로그

- Voice: Twilio + OpenAI Realtime (또는 DIY STT/LLM/TTS) → brain page.
- Email + calendar: webhook → brain signal.
- Embedding provider: 16개 recipe (OpenAI/OpenRouter/Voyage/ZeroEntropy/Gemini/Azure/MiniMax/DashScope/Zhipu/Ollama/llama.cpp/LiteLLM 등). pricing matrix + decision tree.
- Credential gateway: vault-aware secret distribution.
- MCP clients: Claude Desktop/Code/Cursor/ChatGPT/Perplexity/Cowork.

### 3.9 디자인 시스템 (`DESIGN.md`에서)

- **Voice**: 25 단어 이하, 2인칭·축약어 허용, 구체 데이터에 grounded ("2 of 3 missed" > "Brier 0.31"), preachy 금지. `pattern_statement`·`nudge`·`forecast_blurb`·`dashboard_caption`·`morning_pulse` 5개 surface가 `gateVoice()`를 통과 (Haiku judge로 academic 톤 거부, 최대 2회 regen, 실패 시 hand-written template).
- **단일 dark theme**: `--bg-primary #0a0a0f`, `--accent #3b82f6`, WCAG AA(muted) / AAA(body).
- **Typography**: Inter (UI) + JetBrains Mono (numbers, slugs, code).
- **Spacing scale**: 4/8/16/24/32px (Linear-app density).
- **차트**: server-rendered SVG (`src/core/calibration/svg-renderer.ts`), 데이터 → SVG 문자열 순수 함수, XSS는 `escapeXml()` + `requireAdmin` 미들웨어.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 BrainBench (자체 240-page Opus 코퍼스)

- **풀 시스템**: P@5 **49.1%**, R@5 **97.9%**.
- **그래프 레이어 OFF**: P@5 **−31.4pp** (= ~17.7%) → typed-edge KG의 기여가 가장 크다.
- **ripgrep-BM25 + vector-only RAG** 대비 비슷한 margin으로 우위.
- 코퍼스·평가 코드 모두 [`gbrain-evals`](https://github.com/garrytan/gbrain-evals) 공개.

### 4.2 LongMemEval (공개 벤치마크)

- v0.28 release window에서 통합.
- `gbrain-evals` 보고: **R@5 97.60%**.
- 단, BEAM(10M-token long-horizon, Hindsight 64.1%) 미실행.

### 4.3 ZeroEntropy default (v0.36.2.0) — OpenAI 대비

| 지표 | ZeroEntropy `zembed-1` | OpenAI |
|---|---|---|
| latency | **442ms** | 973ms (2.2× 느림) |
| 가격 | **$0.05/M** | $0.13 (2.6× 비쌈) |
| 20-query head-to-head | **11승** | 9승 |
| second-pass reranker로 사용 시 | top-1의 **60%를 재배열** | — |

### 4.4 운영 비용

- 활성 personal brain의 LLM 호출은 **월 single-digit 달러** 수준 (zero-LLM entity 추출 + fail-improve loop 덕분).
- PGLite는 free, Supabase free tier로 small brain 충분.

## 5. 한계와 향후 과제 (Limitations and Future Work)

### 5.1 명시된 설계 한계 (Vectorize.io 리뷰 인용)

1. **Single-operator design**: PGLite 기본, 다중 사용자/머신은 Postgres 전환 + git 동기화 + index↔markdown sync 부담. 다중 운영자(서로 다른 brain, isolation)는 design center가 아님.
2. **No managed cloud**: 오직 self-hosted. "Hindsight Cloud" 같은 control plane 없음.
3. **Integration breadth가 좁음**: first-class skill pack은 OpenClaw + Hermes만. Claude Code/Cursor/Codex/CrewAI/LangGraph/LlamaIndex/AutoGen/n8n/Dify/Pipecat/LiteLLM은 운영자가 직접 wiring (MCP는 가능하나 first-party 패키지는 없음).
4. **Schema discipline 필요**: skill·schema가 모두 운영자 저작. raw fact만으로 자동 구조 합성은 안 함.
5. **No multi-hop graph / temporal reasoning at retrieve**: write-time에 typed edge는 추출하지만 retriever는 multi-hop traversal을 prioritize하지 않음. "지난주에는 참이었지만 지금은 아닌" 같은 temporal query에 first-class 지원 없음.
6. **Maturity / install gotchas**: v0.30 계열은 breaking change 잦음. `bun install -g github:garrytan/gbrain`(postinstall hook 차단)과 `npm install -g gbrain`(squatted package) 두 footgun이 README에 명시.

### 5.2 install 시 사용자 confirmation 요구 (`AGENTS.md`)

- `gbrain init`이 default search mode를 적용하지만 9-cell cost matrix(mode × downstream model, 25× spread)를 `[AGENT]` 마커로 출력하고, **STOP — 운영자에게 reroute** 하도록 protocol. 같은 banner가 `gbrain post-upgrade`에서도 발사.

### 5.3 vector DB는 derived index ≠ source of truth (영상에서 강조)

- Sync ran ≠ sync worked. 실패 시 stale answer. 강제 패턴:
  1. `gbrain sync --repo`
  2. `gbrain embed` (stale chunk backfill)
  3. page count / embedding coverage 검증
  4. edit → 다음 sync cycle 대기 → 수정 텍스트 검색해서 확인.
- 잘못된 Supabase puller는 silently page 건너뛸 수 있음 — skill pack에 failure mode 명시.

## 6. 관련 연구 (Related Work)

- **Andrej Karpathy의 LLM Wiki 패턴** ([gist](https://gist.github.com/karpathy/1dd0294ef9567971c1e4348a90d69285)): 본 ai-wiki와 mantena 가이드 둘 다 GBrain이 이 패턴을 production-grade로 일반화한 것으로 위치시킨다.
- **Andrej Karpathy "memex" 인용**: README가 명시적으로 Vannevar Bush의 memex를 호명.
- **Hindsight / Mem0 / Zep**: Vectorize.io 리뷰가 비교 alternative로 거론. BEAM long-horizon에서는 Hindsight가 우위.
- **OpenClaw / Hermes** (같은 저자): GBrain의 first-class consumer 에이전트 플랫폼.
- **본 ai-wiki(`/Users/kmyu/Desktop/project/ai-wiki/`)와의 관계**: 본 프로젝트의 `CLAUDE.md`도 Karpathy LLM Wiki를 다중 자료 유형으로 확장한 것으로 자기 정의 → GBrain은 "agent가 직접 brain을 read/write" 축으로, 본 wiki는 "사용자·LLM이 함께 큐레이션" 축으로 같은 패턴의 두 변형이라 볼 수 있다.

## 7. 용어집 (Glossary)

- **Brain repo**: 사용자가 git으로 소유하는 평문 markdown 디렉토리. source of truth.
- **Brain (engine)**: PGLite 또는 Postgres + pgvector로 만들어진 derive된 인덱스 DB.
- **Source**: brain 안의 한 repo (wiki, gstack, essay 등). `.gbrain-source` dotfile + 6-tier precedence로 라우팅.
- **Skill pack**: 43개의 markdown 파일로 구성된 에이전트 행동 layer. `skills/RESOLVER.md`로 라우팅.
- **Minion**: Postgres-native job queue의 작업 단위 (durable subagent / shell job / cycle phase 등).
- **Dream cycle**: 밤마다 도는 enrichment + citation fix + consolidation 작업.
- **Compiled truth**: brain page 상단의 "현재 진실" (증거 변화에 따라 재작성).
- **Append-only timeline**: brain page 하단의 evidence ledger (절대 삭제 안 함).
- **Typed edge**: zero-LLM 추출되는 관계 (`works_at`, `invested_in`, `attended`, `founded`, `advises`, `mentions`).
- **Backlink-boosted ranking**: 다른 brain page가 자주 가리키는 page에 retrieval boost.
- **BrainBench**: gbrain 자체 240-page Opus 코퍼스 벤치마크 (P@5 / R@5).
- **BrainBench-Real**: v0.28.x에 도입된 실제 session 캡처 기반 벤치마크.
- **ZeroEntropy `zembed-1` / `zerank-2`**: v0.36.2.0의 default embedding(1280d Matryoshka) / reranker.
- **PGLite**: WASM으로 컴파일된 Postgres 17, 서버 없이 file 기반 — gbrain의 default engine.
- **OpenClaw / Hermes**: 같은 저자의 에이전트 플랫폼. gbrain skillpack의 first-class target.
- **Conductora / Conducto** (영상에서 언급): 로컬-first 에이전트 orchestration 레이어로 소개되나 README에는 직접 등장하지 않음 — 영상 자막의 음성인식 결과라 별도 확인 필요.
