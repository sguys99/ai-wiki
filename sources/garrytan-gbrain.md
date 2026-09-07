---
title: "garrytan/gbrain"
type: repo
year: 2026
category: applications
raw_path: raw/repos/garrytan-gbrain.md
raw_filename: "garrytan-gbrain.md"
source_collection: external
org: "garrytan"
repo: "gbrain"
url: "https://github.com/garrytan/gbrain"
license: "MIT"
language: "TypeScript"
version: "README 본문이 v0.41.37.0까지 언급"
tags: [agent-memory, personal-brain, markdown-first, knowledge-graph, hybrid-search, pgvector, pglite, hnsw, bm25, rrf, mcp, openclaw, hermes, zeroentropy, longmemeval, brainbench, karpathy-llm-wiki, minions, dream-cycle, schema-pack, company-brain]
---

## 한 줄 요약 (One-line Summary)

`garrytan/gbrain`은 Y Combinator의 Garry Tan이 자신의 OpenClaw와 Hermes 에이전트를 운영하려고 만든 markdown-first 에이전트 메모리 시스템으로, git markdown 저장소를 system of record로 두고 그 위에 PGLite 또는 Postgres + pgvector hybrid retrieval, LLM 호출 없이 typed edge를 만드는 self-wiring knowledge graph, 인용과 gap analysis를 붙여 답을 합성하는 brain layer, 43개 스킬, 야간 dream cycle을 결합한다 (MIT, TypeScript/Bun, BrainBench P@5 49.1%, R@5 97.9%).

## 1. 자료 정보 (Document Information)

- **저장소**: <https://github.com/garrytan/gbrain>
- **수집 원본**: README 전문 457줄 (`raw/repos/garrytan-gbrain.md`)
- **저자**: Garry Tan (Y Combinator President & CEO)
- **라이선스**: MIT
- **런타임과 패키지 매니저**: Bun (`bun install -g`, `bun run test`, `bun run verify`, `bun run ci:local`)
- **자매 저장소**: [`garrytan/gbrain-evals`](https://github.com/garrytan/gbrain-evals) (BrainBench scorecard 전문)
- **연관 에이전트 플랫폼**: [`openclawagents/openclaw`](https://github.com/openclawagents/openclaw), [`openclawagents/hermes`](https://github.com/openclawagents/hermes)
- **버전 단서**: README 본문이 v0.40.6.1부터 v0.41.37.0까지의 릴리스를 인용한다. 기본 schema pack은 v0.41.22부터 `gbrain-base-v2`다.
- **에이전트용 진입 문서**: `llms.txt`(문서 지도), `llms-full.txt`(핵심 문서 인라인), `AGENTS.md`, `CLAUDE.md`, `INSTALL_FOR_AGENTS.md`

> Garry Tan 본인의 production brain 규모는 README 첫 단락에 적혀 있다. **146,646 페이지, 24,585명, 5,339개 회사**, 자율 실행 중인 cron job 66개다. 에이전트가 사용자가 자는 동안 회의, 이메일, 트윗, 음성 통화, 아이디어를 ingest하고, 마주친 모든 사람과 회사를 보강하며, 자기 인용을 고치고 메모리를 통합한다.

## 2. 주요 기여 (Key Contributions)

1. **brain repo가 system of record, DB는 retrieval용 파생 인덱스**: 지식은 평범한 git 저장소에 markdown으로 있고 GBrain이 그 저장소를 Postgres로 sync한다. git에서 지운 파일은 DB에서 soft delete가 된다. 공개 부분집합 publish, 팀 mount 공유, 동료의 brain 서버를 가리키는 thin client 배치가 모두 같은 구조에서 나온다.
2. **검색이 아니라 답을 돌려주는 brain layer**: `gbrain search`가 hybrid score 상위 페이지를 주는 raw retrieval이라면, `gbrain think`는 같은 retrieval 위에 인용이 붙은 합성 답변과 gap analysis를 함께 낸다. gap analysis는 페이지가 오래됐을 때, claim에 인용이 없을 때, 두 페이지가 서로 모순될 때, 아직 채워지지 않은 구멍이 있을 때를 답 안에서 알린다.
3. **LLM 호출이 0인 self-wiring knowledge graph**: 모든 `put_page`가 markdown, wikilink, typed-link 문법에서 entity 참조를 뽑아 typed edge(`attended`, `works_at`, `invested_in`, `founded`, `advises`, `mentions`)를 기록한다. 새 entity는 새 stub 페이지가 되고 graph가 스스로 자란다.
4. **graph 레이어가 retrieval 성능 향상의 최대 기여자**: 240페이지 Opus 생성 rich-prose 코퍼스에서 P@5 49.1%, R@5 97.9%를 기록했고, graph를 끈 변형 대비 P@5 기준 31.4%p 높다. ripgrep 기반 BM25와 vector-only RAG 대비로도 비슷한 폭의 우위다.
5. **company brain으로의 확장**: 팀원마다 login으로 범위가 정해진 brain 조각을 갖는다. README는 brain을 읽는 모든 경로(search, list, lookup, multi-source read)를 fuzz test해 누출 0건을 얻었다고 적으며, YC가 Request for Startups에 올린 company-brain 형태에 해당한다고 위치를 잡는다.
6. **고정 레이아웃을 강요하지 않는 schema pack**: 기본 `gbrain-base-v2`는 canonical 14종에 catch-all `note`를 더한 15종 분류다. legacy `gbrain-base`(24종), 디렉토리 13개를 더한 `gbrain-recommended`, 사용자가 직접 만드는 pack을 함께 제공하고, `gbrain schema detect`, `suggest`, `review-candidates --apply` 세 명령으로 실제 파일 구조에서 타입을 뽑아낸다.
7. **에이전트가 스키마를 저작하는 경로 (v0.40.7.0)**: `gbrain schema` CLI 동사 14개와 배치 MCP op `schema_apply_mutations`(admin scope, localOnly가 아니라 원격 에이전트도 HTTPS로 접근)를 제공한다. atomic file lock, 에이전트 신원이 남는 audit log, 동시 writer를 막지 않는 1,000행 단위 chunked UPDATE backfill이 붙는다.
8. **Minions, Postgres 네이티브 durable job queue**: BullMQ 모양이지만 작업 상태가 brain과 같은 Postgres에 남는다. durable subagent, audit가 붙은 shell job, cascading timeout이 있는 child job, outbound provider용 rate lease, S3와 Supabase storage attachment를 담는다. README는 이것이 "서브에이전트를 fire-and-forget Promise로 띄우는" 방식을 대체한다고 적는다.
9. **43개 스킬과 thin harness, fat skills**: 라우팅은 `skills/RESOLVER.md`에 있고 signal capture부터 migration까지 14개 영역을 덮는다. 스킬은 도구 중립 markdown 파일이며, 설치기가 하나의 skillpack으로 에이전트 workspace에 넣는다.
10. **재현 가능한 eval 프레임워크**: `gbrain eval`의 하위 명령이 공개 LongMemEval 실행, 실제 질의 캡처와 재생, frontier 모델 3개 교차 확인, NamedThingBench hard gate, 모순 탐지를 각각 담당한다.
11. **두 엔진, 하나의 계약**: PGLite(WASM Postgres 17, zero-config, 기본값)는 약 5만 페이지까지의 개인 brain용이고, Postgres + pgvector는 공유, 대규모, 다중 머신용이다. `src/core/engine.ts`의 `BrainEngine` interface가 약 47개 연산을 정의하고 두 엔진이 모두 구현하며, CLI와 MCP 서버가 이 한 곳에서 생성된다.
12. **MCP 도구 30개 이상과 OAuth 2.1 HTTP 서버**: `gbrain serve`는 stdio, `gbrain serve --http`는 OAuth 2.1과 `/admin` 대시보드를 갖춘 HTTP MCP다. DCR 방식 client registration, `read`/`write`/`admin` scope 게이트, rate limit이 포함된다.
13. **동기 영수증이 붙는 단일 ingest 명령**: `gbrain capture`가 인자, `--file`, `--stdin`을 받고 페이지를 DB와 디스크에 한 번에 남긴다. 기본 slug는 `inbox/YYYY-MM-DD-<hash8>`라 캡처가 예측 가능한 triage 위치에 모인다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 brain agent loop (README 원문)

```
  signal   →   search   →   respond   →   write   →   auto-link   →   sync
  (every    (brain-first  (informed     (page +    (typed edges     (cron
  message)  retrieval)    by context)   timeline)  + backlinks)     keeps fresh)
```

- **Signal detector**는 에이전트가 받는 모든 메시지에서 실행된다. 아이디어, entity 언급, 기한 있는 todo, 이름, 링크를 캡처한다.
- **Brain-first lookup**은 외부 API 호출보다 먼저 일어난다. README는 brain을 "가장 싸고 빠르고 개인적인 정보원"으로 부른다.
- **Auto-link**는 모든 페이지 write에서 발동한다. LLM 호출 없이 `[[wiki/people/bob]]` 형태 참조에 순수 패턴 매칭만 적용한다.
- **Cron 기반 enrichment**는 사용자가 자는 동안 실행된다. 사람 페이지 중복 제거, 인용 수정, salience 점수 매기기, 모순 찾기, 다음 날 할 일 준비를 한다.

전체 루프의 다이어그램은 `docs/architecture/topologies.md`에 있다.

### 3.2 검색과 brain layer의 분리

| 명령 | 반환물 | 비용 | 쓰임 |
|---|---|---|---|
| `gbrain search` | hybrid score 상위 페이지 목록 | LLM 비용 없음 | 에이전트 컨텍스트 채우기, 인용 조회, 특정 문구 찾기 |
| `gbrain think` | 같은 retrieval 위에 합성한 답변, 인용, gap analysis | LLM 호출 있음 | 답 자체가 필요한 질의 |
| `gbrain agent run` | 같은 표면을 Minions 큐의 서브에이전트에 노출 | crash safe two-phase persistence | 오래 걸리는 작업 |

hybrid scoring 구성은 vector, keyword, RRF, source-tier boost, reranker다. README는 brain layer를 `find_trajectory`와 함께 쓰면 "회사 지표가 어떻게 변했고 팀이 지금 어떤 모습이며 무엇을 약속했고 마지막으로 언제 만났으며 여기서 줄 수 있는 value-add가 무엇인지"를 한 번에 답할 수 있다고 적는다.

### 3.3 hybrid search 구성 요소

- **기본 레이어**: pgvector HNSW vector 검색, BM25 keyword 검색, reciprocal-rank fusion, source-tier boost, intent-aware query rewriting.
- **search mode 3종**: `conservative`, `balanced`, `tokenmax`가 비용과 품질 조절값을 config key 하나로 묶는다. 각 mode의 세부 값은 본문에 없고 `docs/eval/SEARCH_MODE_METHODOLOGY.md`로 넘긴다. 기본값은 `balanced`에 ZeroEntropy reranker를 켠 상태라고 적혀 있으나, 통합 절은 `zerank-2`를 `tokenmax` mode의 기본값으로 소개해 두 서술이 어긋난다.
- **질의별 graph signal 3종**: 특정 질의에 대해 상위 결과가 hub일 때 adjacency boost, 팀 brain들에서 교차 확인되면 cross-source boost, 수다스러운 세션의 약한 chunk가 자리를 차지하면 session demote.
- **관측 도구**: `gbrain search "<query>" --explain`은 단계별 기여를 보여준다. 기본 점수, 발동한 boost, 그 boost가 곱한 값이 나온다. `gbrain doctor`에 `graph_signals_coverage` 검사가 있고 `gbrain search stats`는 발동 횟수와 실패 분해를 보여준다.
- **chunk 대신 페이지 단위 판정**: vector retrieval이 페이지마다 최고 chunk를 pooling한다. 한 chunk가 약하다는 이유로 이웃에게 지는 대신 가장 강한 근거로 표면화된다.
- **이름을 부르는 질의 처리**: 페이지 제목 문구나 선언된 free-text alias에 맞는 질의는 그 페이지로 boost된다. 기존 페이지는 `gbrain reindex --aliases`로 backfill한다.
- **에이전트가 쓰는 신호**: 모든 결과에 왜 매치됐는지 알리는 `evidence` 태그와 `exists`, `probable`, `unknown` 중 하나인 `create_safety` 힌트가 붙는다. 에이전트가 raw score로 추측하는 대신 페이지 존재 여부를 판단하라는 설계다.
- **진단**: `gbrain search diagnose "<query>" --target <slug>`가 어느 retrieval 레이어가 그 페이지를 표면화하거나 놓치는지 추적한다.

### 3.4 self-wiring knowledge graph

- 모든 `put_page`가 markdown, wikilink, typed-link 문법에서 entity 참조를 추출하고 LLM 호출 0으로 edge를 기록한다.
- typed edge 예시는 `attended`, `works_at`, `invested_in`, `founded`, `advises`, `mentions`다.
- multi-hop traversal은 `gbrain graph-query`로 한다.
- README는 "vector 검색은 의미적으로 가까운 chunk를 돌려주고 graph는 사실로 연결된 chunk를 돌려준다"고 구분한다. hybrid search는 양쪽에서 끌어오고, 모든 write에서 실행되는 auto-link가 graph를 최신으로 유지한다.
- **Obsidian vault 대응**: 폴더를 가로지르는 bare `[[note-name]]` wikilink는 `gbrain config set link_resolution.global_basename true`로 켜야 basename으로 해석된다. 기본값은 꺼짐이고, `gbrain doctor`가 켜기 전에 몇 개의 edge를 얻게 되는지 알려준다.

### 3.5 schema pack (brain의 형태)

README는 대부분의 개인 지식 도구가 자기 방식의 "notes + people + tags" 레이아웃을 강요한다고 지적한다. Notion export나 오래된 Obsidian vault를 그 위에 올리면 에이전트가 `Projects/` 폴더가 무엇을 뜻하는지, `Reading/`이 사람인지 출처인지 모른다는 것이다.

| pack | 내용 | 활성화 |
|---|---|---|
| `gbrain-base-v2` | v0.41.22부터 기본값. canonical 14종에 catch-all `note`를 더한 15종 DRY/MECE 분류(`person`, `company`, `media`, `tweet`, `social-digest`, `analysis`, `atom`, `concept`, `source`, `deal`, `email`, `slack`, `writing`, `project`, `note`). 하위 타입, 포맷, 출처는 frontmatter로 내렸다 | 기본 |
| `gbrain-base` | v0.41 이전 brain이 쓰던 24종 legacy 레이아웃. 하위 호환을 위해 계속 번들 | `gbrain onboard --check --explain` 뒤 `gbrain jobs submit unify-types`로 이전 |
| `gbrain-recommended` | `gbrain-base`에 `source`, `place`, `trip`, `conversation`, `personal`, `civic`, `project` 등 디렉토리 13개를 더한 것 | `gbrain schema use gbrain-recommended` |
| 사용자 pack | `detect`가 실제 파일 구조를 타입 후보로 클러스터링하고, `suggest`가 LLM 패스를 돌리며, `review-candidates --apply`가 승격한다. 후속 pack은 `migration_from:`을 선언해 기존 brain이 옮겨올 수 있게 한다 | `gbrain schema use my-pack` |

활성 pack은 모든 read와 write 경로를 관통한다. `parseMarkdown`이 pack의 경로 접두사로 페이지 타입을 추론하고, `whoknows`는 `expert_routing: true`로 선언된 타입에만 전문가 라우팅을 적용하며, `extract_facts`는 `extractable: true` 타입에서만 실행된다. 검색 캐시는 pack 이름과 버전을 키에 접어 넣어 pack 사이 오염이 구조적으로 불가능하게 한다. pack을 바꾸면 brain이 스스로를 다시 해석하고, 되돌리면 잃는 것이 없다.

해석 순서는 7단계다. per-call 플래그, 환경 변수, source별 DB 키, brain 전역 DB 키, `gbrain.yml`, `~/.gbrain/config.json`, 그리고 `gbrain-base` 기본값 순이다.

### 3.6 brain과 source라는 두 가지 조직 단위

- **brain**은 데이터베이스다. 개인 brain이거나 참여한 팀 mount다.
- **source**는 그 brain 안의 저장소 하나다. wiki, gstack, 에세이, 지식 베이스 등이다.
- 라우팅은 `.gbrain-source` dotfile에 있고 문서화된 6단계 precedence chain으로 해석된다.
- 다이어그램은 `docs/architecture/brains-and-sources.md`에 있다.

### 3.7 Minions job queue

- BullMQ 모양이고 Postgres 네이티브다. 작업 상태가 brain과 같은 데이터베이스에 남는다.
- durable subagent는 LLM tool loop이 crash를 넘겨 살아남게 한다. two-phase `pending`에서 `done`으로 가는 persistence를 쓴다.
- audit가 붙은 shell job, cascading timeout이 있는 child job, outbound provider용 rate lease, S3와 Supabase storage 기반 attachment를 지원한다.

### 3.8 데이터 유입 경로

```bash
gbrain capture "the thought I want to remember"
gbrain capture --file ./notes/today.md
echo "from a pipe" | gbrain capture --stdin
SLUG=$(gbrain capture "..." --quiet)
```

- 페이지는 DB와 디스크에 한 번에 안착한다. 기본 slug는 `inbox/YYYY-MM-DD-<hash8>`다.
- thin client 설치에서는 같은 동사가 MCP를 거쳐 서버로 라우팅된다. 명령과 사용 경험은 동일하다.
- webhook ingest는 Zapier, IFTTT, Apple Shortcuts용으로 `POST /ingest`에 Bearer 토큰과 `Content-Type: text/markdown`을 붙인다.
- 모바일 캡처는 inbox 폴더 소스가 `~/.gbrain/inbox/`에 떨어진 것을 집어 올린다. iOS Shortcuts, AirDrop, Drafts, Finder가 대상이다.
- 서드파티 skillpack은 `gbrain/ingestion`의 버전 관리되는 `IngestionSource` 계약에 맞춰 Granola, Linear, voice, OCR 같은 커스텀 소스를 실을 수 있다.

### 3.9 설치 경로

| 경로 | 명령 또는 절차 | 소요 |
|---|---|---|
| 에이전트가 설치 (권장) | OpenClaw 또는 Hermes를 띄운 뒤 `INSTALL_FOR_AGENTS.md` URL을 붙여넣는다. 에이전트가 GBrain 설치, brain 생성, API 키 질문, 43개 스킬 로드, dream cycle 설정, end-to-end 검증까지 한다 | 약 30분 |
| 코딩 에이전트에 메모리만 | `gbrain init --pglite` 뒤 `claude mcp add gbrain -- gbrain serve` 또는 `codex mcp add gbrain -- gbrain serve` | 명령 2개 |
| 원격 brain에 연결 | `gbrain connect https://your-host/mcp --token gbrain_xxx --install`. `--agent codex`로 Codex 대상 지정 | 명령 1개 |
| CLI 단독 | `bun install -g github:garrytan/gbrain` 뒤 `gbrain init --pglite`, `gbrain doctor`, `gbrain import ~/notes/`, `gbrain query "..."` | init 2초 |

에이전트 설치 경로는 HTTPS로 파일을 읽고 shell 명령을 실행할 수 있는 에이전트면 동작한다. README는 Codex, Claude Code, Claude Cowork, Cursor, AlphaClaw에서 검증했다고 적는다. Postgres 대규모, Supabase, thin client 경로는 `docs/INSTALL.md`에 있다.

### 3.10 MCP 클라이언트별 설정

| 클라이언트 | 방식 | 특이점 |
|---|---|---|
| Claude Code | `claude mcp add gbrain -- gbrain serve` | 서버도 터널도 필요 없다 |
| Codex | `gbrain connect ... --agent codex` | bearer를 런타임에 `$GBRAIN_REMOTE_TOKEN`에서 읽어 토큰이 설정 파일에 남지 않는다 |
| Cursor, Windsurf | MCP 설정에 `{"command": "gbrain", "args": ["serve"]}` 추가 | stdio 클라이언트 공통 형태 |
| Claude Desktop (Cowork) | Settings의 Integrations에 HTTP 서버 URL 추가 | 원격 전용. 로컬 `claude_desktop_config.json`은 동작하지 않는다 |
| Claude Cowork (team plan) | 조직 Owner가 Organization Settings의 Connectors에 추가 | |
| Perplexity Computer | `--oauth --register`가 최소 권한 OAuth client를 발급 | Pro 구독 필요 |
| ChatGPT | PKCE를 동반한 OAuth 2.1이 필수 요건 | grant type `authorization_code`로 `chatgpt` client 등록 |

HTTP 서버는 DCR 방식 client registration, `read`/`write`/`admin` scope 게이트, rate limit을 포함한다. ngrok, Railway, Fly.io 배포 가이드는 `docs/mcp/`에 있다.

### 3.11 통합 카탈로그

각 통합은 `recipes/`에 실리는 recipe(markdown + 설정 힌트)이고 `gbrain integrations list`로 찾는다.

| 분류 | 내용 |
|---|---|
| Voice | Twilio + OpenAI Realtime로 전화 통화가 brain 페이지가 된다. 직접 만든 STT, LLM, TTS 조합도 가능하다 |
| Email, calendar | brain signal로 라우팅하는 webhook 핸들러 |
| 임베딩 provider 16종 | OpenAI(기본 fallback), OpenRouter, Voyage, ZeroEntropy(기본), Google Gemini, Azure OpenAI, MiniMax, Alibaba DashScope, Zhipu, Ollama(로컬), llama.cpp llama-server(로컬), LiteLLM proxy. 가격 행렬과 결정 트리 포함 |
| Reranker | ZeroEntropy `zerank-2` 호스팅(`tokenmax` mode 기본으로 소개)과 v0.40.6.1의 `llama-server-reranker` recipe. 후자는 llama.cpp로 Qwen3-Reranker 또는 self-hosted ZeroEntropy 가중치를 같은 `gateway.rerank()` seam에 붙여 완전 로컬 cross-encoder rerank를 한다 |
| Credential gateway | vault를 인식하는 secret 배포 |
| MCP 클라이언트 | 주요 MCP 클라이언트 전부 |

### 3.12 튜토리얼

- **personal-brain**: GitHub 저장소 2개, Telegram bot, Render 위의 AlphaClaw, OpenClaw + GBrain + Supabase로 개인 브레인을 세우는 canonical 경로다. 약 2시간이 걸린다.
- **company-brain**: 10명에서 50명 팀을 위한 federated, multi-user, OAuth scope 기반 institutional memory다. 약 90분이 걸린다.
- **improving-skills-with-skillopt**: `SKILL.md`를 학습 가능한 파라미터로 다룬다. `--bootstrap-from-skill`로 벤치마크를 만들고 judge를 강화한 뒤, optimizer가 제안한 편집 중 점수가 실제로 오른 것만 남긴다. 약 20분에 API 호출 약 $1이다.

작성 예정 목록에는 기존 에이전트 연결, VC dealflow용 founder scorecard와 회의 준비, Notion과 Obsidian vault 이전, 코드베이스를 질의 가능한 code brain으로 인덱싱이 올라 있다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 BrainBench

- 코퍼스는 Opus로 생성한 240페이지 rich-prose다.
- 전체 시스템은 **P@5 49.1%, R@5 97.9%**를 기록했다.
- graph를 끈 변형 대비 **P@5 기준 31.4%p** 높다.
- ripgrep 기반 BM25와 vector-only RAG 대비로도 비슷한 폭으로 앞선다.
- scorecard 전문은 자매 저장소 `gbrain-evals`에 있다.

### 4.2 그 밖의 eval

| 명령 | 내용 |
|---|---|
| `gbrain eval longmemeval` | 공개 LongMemEval 벤치마크를 자기 hybrid retrieval에 실행한다. README에 점수는 적혀 있지 않다 |
| `gbrain eval export`, `replay` | 실제 질의를 캡처해 코드 변경에 재생한다. `GBRAIN_CONTRIBUTOR_MODE=1` 필요 |
| `gbrain eval cross-modal` | 서로 다른 provider의 frontier 모델 3개로 출력을 과제에 대해 교차 확인한다 |
| `gbrain eval retrieval-quality` | NamedThingBench를 실행해 title-substring, alias-synonym, generic-to-named, multi-chunk-dilution 네 계열을 hard gate한다. 회귀가 나면 CI가 크게 실패한다 |
| `gbrain eval suspected-contradictions` | retrieval 쌍 sampling, 계층적 날짜 pre-filter, query-conditioned LLM judge, 영속 캐시로 견해와 fact의 충돌을 찾는다 |

### 4.3 운영 규모와 성능 관련 서술

- Tan 본인 brain은 146,646 페이지, 24,585명, 5,339개 회사이며 cron job 66개가 자율 실행 중이다.
- PGLite는 서버 없이 2초 만에 데이터베이스를 준비한다.
- PGLite 권장 상한은 약 5만 페이지다.
- company brain의 권한 격리는 읽기 경로 전반에 대한 fuzz test에서 누출 0건을 보였다.
- MCP로 노출되는 도구는 30개 이상이다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

### 5.1 README가 스스로 남긴 유보

- **cron sync 타임아웃 범위 주석**: v0.41.13.0의 `--timeout`이 mid-import에 발동하면 `gbrain sync`가 status `partial`로 exit 0을 내고 `last_commit`은 그대로 둔다. 다음 실행이 같은 diff를 다시 걷고 `content_hash`가 이미 import된 파일을 단축한다. README는 extract와 embed 단계는 끝까지 실행된다는 점, `--max-age`가 마이그레이션 v98 이후 30분의 rollout window를 갖는다는 점, full sync 트리거는 v0.42 이후로 미뤘다는 점을 함께 밝힌다.
- **태그 제거가 반영되지 않는 트레이드오프**: v0.41.37.0이 태그 조정을 add-only로 바꾼 결과, frontmatter에서 태그를 지워도 다음 sync에서 DB의 태그가 사라지지 않는다. provenance 컬럼이 필요해 미뤘다고 적혀 있다.
- **기본 타입 개수 서술의 불일치**: schema pack 절은 v0.41.22부터 기본값이 15종 `gbrain-base-v2`이고 legacy가 24종이라고 적는데, v0.40.7.0 소개 문단은 기본값이 22종 universal type이라고 적는다. 릴리스 차이로 보이나 README만으로는 확정되지 않는다.
- **Obsidian basename 해석은 기본 꺼짐**: 폴더를 가로지르는 bare wikilink 해석은 사용자가 명시적으로 켜야 한다.

### 5.2 troubleshooting 절이 드러내는 실패 유형

README에서 분량이 가장 큰 절이며, 실제 운영에서 나온 실패를 증상 단위로 기록한다. 상세한 원인과 대응은 wiki 페이지의 같은 절에 표로 정리했다.

| 증상 | 해결 버전과 요지 |
|---|---|
| `gbrain import`가 `expected N dimensions, not M`으로 실패 | 임베딩 차원 불일치. `gbrain doctor`가 필요한 복구 명령을 출력한다. `~/.gbrain`을 지울 필요는 없다 |
| federated brain에서 매시간 cron sync가 타임아웃 | v0.41.13.0. `--break-lock --all --max-age 1800` 선행 실행과 source별 `timeout` 루프 |
| Supabase에서 dream cycle이 wiki 링크를 조용히 잃음 | v0.41.19.0. Supavisor pooler 순간 장애에 대응하는 벌크 write 자체 재시도와 `batch_retry_health` 검사 |
| dream cycle이 실행마다 링크 행 약 150개를 잃음 | v0.41.27.0. `withRetry`의 `reconnect` 콜백으로 무효화된 데이터베이스 싱글턴에서 자체 복구 |
| `gbrain brainstorm`이 채점 결과 0개 | v0.41.21.0. judge의 4,000 토큰 출력 상한과 슬래시 형식 모델 이름의 가격 조회 실패 |
| `gbrain reindex --markdown`이 자동 생성 태그를 지움 | v0.41.37.0. 태그 조정을 추가 전용으로 변경 |
| 큰 brain에서 `gbrain sync`가 멈춤 | `GBRAIN_SYNC_TRACE=1` 추적, `--no-schema-pack` 우회, PGLite 단일 writer 경합 회피 |
| Windows에서 스키마 마이그레이션이 `getaddrinfo ENOTFOUND` | v0.41.37.0. 9개 bring-up 단계를 자식 프로세스 대신 in-process로 실행 |

### 5.3 기여 절차상의 제약

- community PR은 하나씩 merge하지 않고 release wave 단위로 묶는다.
- schema, retrieval ranking, MCP 프로토콜, 보안 경계를 건드리는 변경은 PR 전에 이슈에서 설계 논의를 거쳐야 한다.
- 빠른 수정(오타, 문서 버그, 명백한 회귀)만 바로 PR로 갈 수 있다.

## 6. 관련 연구 (Related Work)

- **Andrej Karpathy의 LLM Wiki 패턴**: markdown 파일을 지식의 원본으로 두고 계속 쌓아 가는 발상을 공유한다. 이 저장소의 `CLAUDE.md`가 원형으로 밝힌 패턴이며, GBrain의 raw README는 특정 gist 주소를 인용하지 않으므로 여기서도 주소를 적지 않는다. GBrain은 그 발상에 retrieval 엔진, 스케줄러, 권한 모델을 붙여 운영 시스템으로 만든 사례다.
- **본 ai-wiki와의 관계**: 본 저장소의 `CLAUDE.md`도 Karpathy LLM Wiki를 여러 자료 유형으로 확장한 것으로 자기 정의한다. GBrain은 에이전트가 직접 brain을 읽고 쓰는 방향으로, 본 wiki는 사용자와 LLM이 함께 큐레이션하는 방향으로 갈린 두 변형이다.
- **OpenClaw와 Hermes**: GBrain이 실제로 운영되는 대상 에이전트 플랫폼이다. README는 GBrain을 "내 OpenClaw와 Hermes 배치 뒤의 production brain"으로 소개한다.
- **YC Request for Startups의 company-brain 항목**: README가 company brain 확장을 이 항목에 대응시키며, 그 영역에서 창업할 거라면 GBrain 위에 지으라고 권한다.
- **크레딧으로 밝힌 계보**: 기본으로 실리는 임베딩과 reranker 스택은 ZeroEntropy, 비대칭 인코딩 recipe 템플릿은 Voyage AI, 검색 품질 개선 계보는 Ramp Labs에 각각 공을 돌려 밝힌다.

## 7. 용어집 (Glossary)

- **brain repo**: 사용자가 git으로 소유하는 평문 markdown 디렉토리. README의 표현으로 system of record다.
- **brain (engine)**: PGLite 또는 Postgres + pgvector로 만들어진 retrieval용 파생 인덱스 데이터베이스.
- **source**: 한 brain 안의 저장소 하나. wiki, gstack, 에세이, 지식 베이스 등이며 `.gbrain-source` dotfile과 6단계 precedence로 라우팅된다.
- **brain layer**: 검색 결과를 넘어 인용과 gap analysis가 붙은 답을 합성하는 층. `gbrain think`가 진입점이다.
- **gap analysis**: 답변에 함께 붙는, brain이 아직 모르는 것에 대한 서술. 오래된 페이지, 인용 없는 claim, 페이지 간 모순, 비어 있는 구멍을 알린다.
- **typed edge**: LLM 호출 없이 추출되는 관계. `works_at`, `invested_in`, `attended`, `founded`, `advises`, `mentions` 등이다.
- **schema pack**: brain의 페이지 타입, 링크 타입, 자동 추출 대상 fact를 선언한 묶음. 기본값은 `gbrain-base-v2`다.
- **Minion**: Postgres 네이티브 job queue의 작업 단위. durable subagent, shell job, child job 등이 여기에 실린다.
- **dream cycle**: 야간 cron으로 실행되는 enrichment, 인용 수정, salience 채점, 모순 탐지, 다음 날 준비 묶음.
- **search mode**: `conservative`, `balanced`, `tokenmax` 세 가지로 비용과 품질 조절값을 한 번에 바꾸는 설정.
- **graph signal**: 질의별로 발동하는 adjacency boost, cross-source boost, session demote 세 신호.
- **`create_safety`**: 검색 결과마다 붙는 `exists`, `probable`, `unknown` 힌트. 에이전트가 페이지를 새로 만들지 판단하는 근거다.
- **BrainBench**: 240페이지 Opus 생성 코퍼스로 P@5와 R@5를 재는 자체 벤치마크.
- **NamedThingBench**: `gbrain eval retrieval-quality`가 돌리는, 이름을 부르는 질의 계열의 회귀 방지 게이트.
- **PGLite**: WASM으로 컴파일된 Postgres 17. 서버 없이 파일 기반으로 동작하는 GBrain의 기본 엔진이다.
- **thin harness, fat skills**: 실행기는 얇게 두고 지능은 markdown 스킬 파일에 두는 설계 태도. `docs/ethos/`가 다룬다.
