---
title: "GBrain Review: An Honest Assessment of Garry Tan's Brain"
type: article
year: 2026
category: applications
raw_path: raw/articles/vectorize-2026-gbrain-review-honest-assessment.md
raw_filename: "vectorize-2026-gbrain-review-honest-assessment.md"
source_collection: external
author: "Vectorize (no individual byline)"
url: "https://vectorize.io/articles/gbrain-review"
publisher: "Vectorize.io"
publication_date: "2026-05-08"
tags: [gbrain, agent-memory, review, scorecard, brainbench, longmemeval, beam, hindsight, mem0, zep, hybrid-search, pgvector, openclaw, hermes]
---

## 한 줄 요약 (One-line Summary)

Vectorize.io가 게시한 GBrain 리뷰로, 스스로를 비판이 아니라 honest assessment로 규정하고 10개 항목 scorecard, BrainBench와 LongMemEval 수치, 강점 6가지, 약점 6가지, 영리한 설계 선택 4가지를 함께 제시한다. 저자의 결론은 GBrain이 특정 사용자층에게는 현재 가장 나은 오픈소스 markdown-first personal brain이지만, 출시 메시지가 내건 "agent memory for everyone"에는 맞지 않는 opinionated software라는 것이다.

## 1. 자료 정보 (Document Information)

- **저자**: 개인 byline 없이 Vectorize 명의로 게시
- **매체**: Vectorize.io (vectorize.io/articles), 게시일 2026-05-08
- **URL**: <https://vectorize.io/articles/gbrain-review>
- **구성**: 판정 문단, scorecard, 강점, 영리한 점, 약점, day-one 경험, 장기 경험, 벤치마크, 가격, 설치 권장 대상, 최종 판정, FAQ
- **발행 주체 고지**: 원문에는 발행 주체의 이해관계나 GBrain 및 경쟁 제품과의 관계를 밝히는 고지가 없다. 개인 byline도 없어 필자를 특정할 수 없다.
- **GBrain 출시 정보 인용**: 2026-04-05 오픈소스 공개, 24시간 만에 약 5,000개 GitHub star, 작성 시점 약 1만 4천 개.

## 2. 주요 기여 (Key Contributions)

### 2.1 리뷰가 스스로 세운 평가 틀

저자는 이 글이 비판이 아니라 honest assessment임을 도입부에서 명시하고, 공개된 headline 수치가 정확하고 아키텍처가 사려 깊으며 엔지니어링 품질이 통상적인 v0.30 오픈소스 프로젝트를 넘어선다는 세 가지를 사실로 인정하며 출발한다. 문제 삼는 지점은 품질이 아니라 적용 범위다. GBrain은 opinionated software라서 모든 팀에게 맞지 않는데 출시 메시지는 "agent memory for everyone"으로 틀을 잡았다는 것이다.

판정 문단 인용: "OpenClaw나 Hermes Agent를 운영하고, 지식을 plain text로 소유하는 것을 중요하게 여기며, 스키마가 바뀔 때마다 스킬 워크플로를 직접 작성할 규율이 있다면, GBrain은 현재 나와 있는 오픈소스 markdown-first personal brain 가운데 가장 낫다." 여기에 붙는 단서는 프로젝트가 젊고(v0.30 근처, breaking change 잦음), 단일 운영자를 전제로 설계됐고, self-hosted 전용이며, production agent memory 플랫폼과 아키텍처 성격이 다르다는 네 가지다.

### 2.2 10개 항목 scorecard

| Dimension | Rating | 저자가 붙인 근거 |
|---|---|---|
| Architecture | 5/5 | 3-layer 설계가 깔끔하고 논리가 선다 |
| Retrieval quality | 4/5 | hybrid search와 RRF, 4-layer dedup, BrainBench 수치가 강하다 |
| Cost efficiency | 5/5 | LLM 호출 없는 entity 추출, deterministic classifier |
| Day-one experience | 4/5 | PGLite로 30분 설치, 다만 import 전에는 brain이 비어 있다 |
| Long-term value | 5/5 | 지속해서 쓸수록 유의미하게 누적된다 |
| Documentation | 4/5 | README가 강하고 gotcha를 솔직히 적었다 |
| Integration breadth | **2/5** | OpenClaw와 Hermes만 first-class |
| Multi-tenant readiness | **1/5** | 설계 중심이 아니다 |
| Maturity | 3/5 | breaking change가 잦고 코드베이스가 젊다 |
| Honesty of marketing | 5/5 | 공개 수치가 코드 동작과 일치한다 |

낮은 두 항목은 Integration breadth(2/5)와 Multi-tenant readiness(1/5)이고, 저자는 이를 품질 결함이 아니라 설계 범위의 결과로 해석한다.

### 2.3 강점 6가지

**1. compounding이 사후 부착이 아니라 설계에 들어 있다.** 서로를 강화하는 세 메커니즘으로 이뤄진다.

| 메커니즘 | 동작 | 효과 |
|---|---|---|
| Tiered enrichment | 1회 언급은 stub 페이지(Tier 3), 3회 cross-source 언급이면 web과 social 보강(Tier 2), 미팅 이후 또는 8회 이상 언급이면 full pipeline(Tier 1) | 명시적 지시 없이 중요도를 학습한다 |
| Fail-improve loop | classification 과제에서 LLM fallback이 날 때마다 실패에서 더 나은 regex 패턴을 만든다 | 같은 작업을 갈수록 싸게 처리한다. 비용이 커지는 통상적 LLM 시스템과 반대다 |
| Backlink-boosted ranking | 다른 brain 페이지가 참조하는 페이지에 retrieval 가산점을 준다 | typed edge 추출에서 자연히 따라나오며, 링크 밀도가 오를수록 자주 참조되는 페이지가 잘 떠오른다 |

저자는 이 세 메커니즘이 몇 달 단위로 운영하는 사용자에게 GBrain이 신뢰를 얻는 이유이며, 일주일짜리 시험 사용으로는 같은 가치가 드러나지 않는다고 본다.

**2. LLM 호출 없는 entity 추출.** 모든 페이지 write에서 regex와 문자열 매칭으로 typed entity 참조를 뽑아 일상적 ingestion이 토큰 기준으로 사실상 무료다. 공개된 Minions 벤치마크는 대규모 ingestion 실행이 "\$0 in tokens"로 끝난 것을 보인다. 대가는 entity 어휘가 규칙이 다루는 타입으로 제한된다는 점이다. 저자는 단일 운영자 personal brain에서는 최적이지만 임의의 entity 타입과 분당 수천 건 write를 받는 multi-tenant 플랫폼이라면 학습 기반 추출이 필요할 것으로 본다.

**3. hybrid retrieval이 vector 단독보다 낫다.** 구성은 pgvector 임베딩 위의 HNSW cosine similarity, ts_rank 가중치를 쓰는 Postgres tsvector 키워드 검색, Reciprocal Rank Fusion(`score = Σ(1 / (60 + rank))`), 4-layer deduplication, backlink-boosted ranking, 선택 사항인 Claude Haiku query expansion이다. 저자는 typed-edge graph가 hybrid search 단독보다 retrieval 향상에 더 기여한다는 결과를 드물고 의미 있는 관찰로 평가한다. 수치는 4.1절 참고.

**4. plain text 소유권.** brain 저장소가 Markdown을 git에 담아, 밤사이 에이전트가 학습한 내용을 `git diff`로 확인하고 재구성 실험을 위해 brain을 branch하며 write를 텍스트 편집기에서 줄 단위로 검토할 수 있다. 데이터베이스가 날아가면 저장소에서 다시 만든다. 저자는 이것이 구조화된 저장소만 쓰는 시스템과 근본적으로 다른 지점이며 작가, 연구자, analyst, 창업자에게 결정적 요인이라고 본다.

**5. 젊은 프로젝트치고 성숙한 production 인프라.**

| 요소 | 내용 |
|---|---|
| Minions | Postgres 기반 job queue로 deterministic한 배경 작업과 판단이 필요한 작업을 분리한다. 같은 작업을 gateway timeout 대신 중앙값 1초 미만으로 처리하고, 재시작을 넘겨 durability를 유지하며, deterministic 경로에서는 LLM 토큰을 쓰지 않는다 |
| Durable agents | Anthropic 턴마다 `subagent_messages`에, tool call마다 `subagent_tool_executions`에 커밋한다. worker가 죽어도 마지막으로 커밋된 턴에서 재개한다 |
| Skillify workflow | `gbrain skillify scaffold`와 `gbrain skillify check`가 일회성 수정을 테스트와 resolver 항목, 감사 기록을 갖춘 영구 스킬로 바꾼다 |
| Health checks | `gbrain doctor`, `gbrain skillpack-check --quiet`(CI exit code), `gbrain skillpack install --dry-run`이 brain을 인프라로 다룬다 |

저자는 이 정도 인프라 깊이가 보통 오픈소스 프로젝트에서 18개월이 걸리는데 GBrain은 처음부터 갖춰 나왔고, 그 이유가 Tan이 이미 자기 production brain에서 운영하고 있었기 때문이라고 본다.

**6. 정직한 마케팅.** 공개된 BrainBench 수치가 실제 코드 동작을 정확히 기술하고, README가 설치 gotcha를 솔직히 문서화하며, 아키텍처 문서가 구현과 일치한다. "100% LongMemEval, 세계 최고의 memory 시스템" 같은 부풀린 주장 없이 명확히 기술된 코퍼스 위의 구체적 수치와 재현 가능한 eval 코드만 있다. 저자는 벤치마크 정직성 문제가 문서화된 분야에서 의미 있는 차별점이라고 평가한다.

### 2.4 영리한 설계 선택 4가지

| 선택 | 내용과 저자의 평가 |
|---|---|
| compiled truth와 timeline을 나눈 페이지 패턴 | 모든 brain 페이지가 상단에 요약 절, 하단에 append-only 이력을 둔다. 갱신은 요약 절에 반영되고 이력은 timeline에 남아, stale memory와 무한 증가 사이의 전형적 트레이드오프를 감사 가능한 구조로 푼다 |
| 스킬을 설정이 아니라 코드로 | 스킬은 발동 조건, 검사, 연쇄를 기술한 두툼한 Markdown 파일이고 에이전트가 읽어 실행한다. YAML 기반 워크플로 엔진과 대비되며, 스킬 작성이 장황해지는 대신 에이전트가 왜 그렇게 행동했는지 확인하는 일이 상태 기계 디버깅이 아니라 Markdown 읽기가 된다 |
| "thin harness, fat skills" 기조 | 런타임을 의도적으로 최소로 두고 지능은 34개 이상 기본 제공 스킬 파일과 운영자 추가분에 둔다. core를 고치지 않고 스킬을 교체하거나 fork할 수 있어 동작에 대한 소유권을 프레임워크에 넘기지 않는다 |
| 문제 범위를 좁게 고정 | 개인 brain을 쓰는 OpenClaw와 Hermes Agent 운영자를 겨냥한다. "모두의 agent memory"라는 목표를 피한 덕에 설계 선택들이 서로 맞물린다 |

### 2.5 약점 6가지

| 약점 | 저자가 제시한 근거와 세부 |
|---|---|
| 단일 운영자 설계 | 다중 사용자 공유는 PGLite에서 Postgres로 전환하고, 여러 기기에 걸쳐 git 작업을 관리하고, index와 markdown의 동기화를 유지해야 한다. 저자는 두 층을 구분한다. 원격 MCP HTTP 서버(`gbrain serve --http`)는 client별 scoping을 갖춘 OAuth 2.1로 multi-client 접근을 first-class 지원하지만, 서로 다른 사용자가 서로 다른 brain을 격리해 쓰는 multi-operator 접근은 설계 중심이 아니다 |
| managed cloud 없음 | self-hosted 전용이다. 로컬은 PGLite, 공유 모드는 외부 Postgres를 쓴다(Tan은 Supabase). "Hindsight Cloud"에 해당하는 것이 없어 managed 가입 절차도 control plane도 없다. Postgres와 Bun을 직접 운영하는 팀에는 문제가 없지만 memory-as-a-service를 원하면 맞지 않는다 |
| 통합 범위가 좁다 | first-class 스킬 팩은 OpenClaw와 Hermes Agent에만 있고 나머지는 개인이 유지하는 MCP 서버로 연결한다. Claude Code, Cursor, Codex, CrewAI, LangGraph, LlamaIndex, AutoGen, n8n, Dify, Pipecat, LiteLLM 어느 것에도 first-party 패키지가 없어 팀이 연결부를 직접 작성해야 한다 |
| 스키마 규율이 필요하다 | 스키마는 권장 문서에 있고 워크플로와 레시피는 사람이 쓴다. 기존 스킬에 맞지 않는 사실이 들어와도 구조가 자동 합성되지 않는다. 문서 자체가 set-and-forget이면 가치가 아니라 오류가 누적된다고 밝히고 있다 |
| retrieval 단계의 multi-hop graph와 temporal reasoning 부재 | write 시점에 typed entity edge를 뽑아 backlink 랭킹에 쓰지만 retriever가 multi-hop 순회를 우선하지 않는다. "내가 YC에서 만난 사람들이 창업한 회사에 투자한 사람은 누구인가"는 graph 순회가, "지난주에는 참이었지만 지금은 아닌 것은 무엇인가"는 시간에 따른 상태 비교가 필요한데 둘 다 주된 전략이 아니다 |
| 성숙도와 설치 gotcha | v0.30 계열은 breaking change가 잦다. 최근 릴리스 구간(v0.28.x, v0.30.x)은 BrainBench-Real session 캡처, Voyage 기반 멀티모달 ingestion, npm squat 탐지, dream-cycle synthesize 개선을 추가했다. 설치 함정은 `bun install -g github:garrytan/gbrain`(postinstall hook 차단)과 `npm install -g gbrain`(squat된 레지스트리 패키지)이고 둘 다 GitHub 이슈로 추적된다 |

저자는 대부분의 개인 brain 질의가 multi-hop 부재를 견딜 수 있고 breaking change도 이 단계에서는 정상이라고 보면서도, 구조적 multi-hop이나 시간 추론이 주력이어야 하는 작업과 안정성이 중요한 팀에는 각각 다른 시스템과 버전 고정이 필요하다고 덧붙인다.

### 2.6 설치 권장 조건과 대안 고려 조건

| 설치를 권장하는 경우 | 대안을 고려할 경우 |
|---|---|
| OpenClaw 또는 Hermes Agent를 운영한다 | 그 외 스택을 쓰면서 first-class 통합이 필요하다 |
| git 저장소에 plain text markdown 메모리를 두고 싶다 | self-hosted 인프라가 아니라 memory-as-a-service가 필요하다 |
| 스키마가 바뀔 때마다 스킬 워크플로를 직접 작성한다 | 운영자가 쓴 스킬 대신 원시 사실에서 구조가 자동 합성되기를 원한다 |
| 몇 달 단위 시간 지평을 유지한다. 일주일 시험 사용은 가치를 못 보여준다 | multi-tenant 격리, 엔터프라이즈 컴플라이언스, managed cloud가 필요하다 |
| 단일 운영자 규모에서 쓴다 | multi-hop graph 순회나 temporal reasoning이 주된 retrieval 전략이어야 한다 |
| Postgres를 무리 없이 운영하고 젊은 프로젝트의 GitHub 이슈를 추적한다 | |

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

- **hybrid retrieval 구성**: pgvector 위의 HNSW cosine similarity, Postgres tsvector와 ts_rank 가중치, RRF(`score = Σ(1 / (60 + rank))`), 4-layer dedup, backlink-boosted ranking, 선택 사항인 Claude Haiku query expansion. query expansion은 검색 한 번당 대체 표현을 약 2개 만든다.
- **비용 구조**: LLM 호출 없는 entity 추출과 fail-improve loop가 맞물려 활발히 쓰는 개인 brain의 LLM 비용을 월 한 자릿수 달러로 유지한다. 저자는 이 두 선택이 LLM 사용량이 많은 memory 제품 대비 비용이 유리한 이유라고 설명한다.
- **배포 형태 세 가지**: OpenClaw와 Hermes 운영자는 INSTALL_FOR_AGENTS.md의 URL을 에이전트에 붙여 넣는 agent 주도 설치가 매끄럽다. standalone CLI 경로(`git clone` 후 `bun install && bun link`, `gbrain init`)도 무리 없이 작동한다. 그 외 스택은 사용자가 brain을 자신의 agent 스택에 직접 연결해야 하며, MCP 서버가 이를 가능하게 하지만 속도를 보장하지는 않는다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 BrainBench

240페이지 규모의 Opus 생성 rich-prose 코퍼스에서 측정하며 eval 코드와 코퍼스는 gbrain-evals 저장소에 있다.

| 구성 | P@5 | R@5 |
|---|---|---|
| 풀 시스템 | 49.1% | 97.9% |
| graph layer 비활성 | 풀 시스템보다 31.4%p 낮음 | 보고 없음 |
| ripgrep-BM25 + vector-only RAG | 비슷한 폭으로 열세 | 보고 없음 |

### 4.2 LongMemEval과 BEAM

- LongMemEval은 v0.28 릴리스 구간에서 통합됐고 gbrain-evals가 현재 보고하는 값은 R@5 97.60%다.
- 10M 토큰 규모의 long-horizon 벤치마크 BEAM은 GBrain이 실행하지 않았다. 이 항목에서는 Hindsight가 64.1%로 앞서 있다.
- 경쟁 제품이 쓰는 retrieve-everything 계열 벤치마크도 시험되지 않았다.
- 저자의 판정: 공개 수치가 내부적으로 일관되고 방법론이 문서화됐으며 eval 코드가 재현 가능하다. 다만 코퍼스가 달라 다른 시스템의 학술 점수와 직접 비교되지 않는다.

### 4.3 day-one 경험

30분 설치는 실제라고 평가한다. 다만 brain은 import 전까지 비어 있다. `gbrain import ~/notes/`가 기존 markdown(Obsidian, Logseq, 일반 텍스트)을 색인해 day-one retrieval에 의미를 준다. 아무것도 넣지 않고 시작하면 쓸 만한 retrieval을 얻기까지 실제 에이전트 운영과 페이지 write가 필요하다.

### 4.4 장기 신호

이 절의 판단은 README 서술, 공개 수치, gbrain-evals 저장소, 공개 출시 논의에서 추정한 것이고 직접 production 운영 경험이 아니라고 저자가 먼저 밝힌다.

| 구분 | 내용 |
|---|---|
| 긍정 신호 | Tan의 개인 brain은 여러 해에 걸쳐 수만 페이지 규모로 자랐고 자율 cron job이 19개 이상이다. fail-improve loop가 LLM 의존도를 실제로 낮춘다. Minions 인프라가 production 부하를 감당한다. 공개 사용자들이 4주에서 8주 사이에 반복 등장 인물에 tier-2 enrichment가 걸리면서 유의미한 개선을 보고한다 |
| 예상되는 부정 신호 | minor 버전 사이 breaking change가 간간이 발생한다. 신규 운영자의 설치 마찰이 있으나 v0.28.5 이후 자체 탐지로 상당 부분 해소됐다. 운영자 워크플로가 바뀔 때마다 스킬을 다시 써야 한다 |

저자는 부정 신호들이 설치하지 말아야 할 이유는 아니며 현실적인 기대치를 정하는 재료라고 본다.

### 4.5 가격

- GBrain 자체는 MIT 라이선스로 무료다.
- OpenAI API는 vector 검색용 텍스트 임베딩에 필수이며 현재 가격 기준으로 ingestion 토큰 100만 개당 약 0.10달러다.
- Anthropic API는 선택 사항으로 query expansion을 담당한다. 쓰지 않아도 동작하지만 쓰면 retrieval이 뚜렷하게 나아진다.
- Postgres는 로컬 사용 시 PGLite로 무료이고 공유 모드는 기존 Postgres나 관리형 인스턴스를 쓴다. Supabase 무료 티어로 작은 brain은 충분하다.
- 활발히 쓰는 개인 brain의 LLM 비용은 보통 월 한 자릿수 달러다.

### 4.6 FAQ에서 나온 판단

| 질문 | 저자의 답 |
|---|---|
| 설치할 가치가 있는가 | 앞서 기술한 사용자층에 해당하면 그렇다. 아니면 다른 선택지가 더 맞을 가능성이 높다 |
| Mem0, Zep, Hindsight보다 나은가 | 질문의 틀이 잘못됐다. 단일 운영자 markdown brain 최적화와 memory-as-a-service는 목표가 다르다 |
| production에서 쓸 수 있는가 | "production"의 정의에 달렸다. Tan의 개인 brain처럼 매일의 agent 워크플로를 받치는 용도라면 이미 입증됐고, 수천 명에게 서비스하는 agent 제품의 multi-tenant 인프라라면 상당한 커스텀 작업 없이는 아니다 |
| 유명세와 YC 후광이 평판을 부풀렸는가 | 어느 정도 그렇다. 브랜드 후광이 빠른 star 증가에 기여했다. 다만 BrainBench 수치, Minions 벤치마크, fail-improve loop는 실재하고 설계가 좋아 아키텍처와 엔지니어링도 독립적으로 성립한다. YC CEO 브랜딩을 걷어 내도 나은 편에 드는 개인 brain 프로젝트로 남되, 그 브랜딩 덕에 가시성은 실제보다 크게 얻고 있다 |

### 4.7 최종 판정

의도한 사용자층에게는 진지하게 인상적인 엔지니어링이라는 것이 저자의 정리다. 차별점으로 compounding 메커니즘, 인프라, 정직한 마케팅을 꼽고, Markdown을 source of truth로 삼은 결정이 brain을 소유하려는 사용자에게 정확히 맞는다고 본다. 동시에 좁은 통합 범위, 단일 운영자 설계, managed cloud 부재, 젊은 코드베이스가 의견이 강한 선택이며 임의의 스택 위에서 agent memory를 원하는 팀에는 맞지 않는다고 말한다. 조건이 맞으면 GBrain을 고르고 아니면 Hindsight를 비롯한 대안이 낫다는 두 판단이 모두 유효하다는 것이 결론이다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- 리뷰 자체의 한계: 장기 신호는 README, 공개 수치, gbrain-evals, 공개 출시 논의에서 추정한 것이고 직접 production 운영 경험이 아니다. 저자가 해당 절 첫머리에 이를 명시한다.
- BEAM 미실행 때문에 long-horizon 비교에 GBrain 측 수치가 없다.
- Hindsight, Mem0, Zep과의 직접 비교는 코퍼스가 달라 학술 점수를 1:1로 맞대기 어렵다. 저자는 Hindsight와의 head-to-head를 별도 글로 분리했다고 밝힌다.
- 발행 주체 고지 부재: 원문에는 필자 개인 byline도, 발행 주체와 GBrain 또는 경쟁 제품의 이해관계를 밝히는 고지도 없다.
- 아카이브 상태: 이 저장소의 raw 파일은 WebFetch로 추출한 본문 digest이며 일부 문장은 모델이 발췌하거나 재구성했을 수 있다고 파일 자체가 밝히고 있다. 원문과 문장 단위로 대조하려면 frontmatter의 URL을 봐야 한다.

## 6. 관련 연구 (Related Work)

- [[applications/garrytan-gbrain]]: 이 리뷰가 평가 대상으로 삼은 1차 소스 코드와 README.
- [[applications/xguru-2026-gbrain-open-source-personal-knowledge]]: 같은 대상을 소개 관점에서 다룬 글이라 평가 톤이 대비된다.
- [[applications/gajjar-2026-gbrain-vs-computer-memory]]: 엔터프라이즈 대안과의 비교. 이 리뷰가 매긴 multi-tenant 1/5와 같은 지점을 다룬다.
- [[applications/mantena-2026-hermes-gbrain-setup-vps]]: 30분 설치와 Hermes 자동 ingestion의 실전 기록.
- [[applications/techwealth-hub-2026-garry-tan-gbrain-explained]]: verification runbook 관점의 영상 요약.
- **Hindsight**: BEAM 10M 토큰에서 64.1%로 앞서 있는 시스템이며 이 글의 비교 대상이다.
- **Mem0, Zep**: production memory 플랫폼 대안으로, 이 글은 별도 head-to-head 글로 분리해 언급한다.

## 7. 용어집 (Glossary)

- **BrainBench**: GBrain 자체 벤치마크. 240페이지 규모의 Opus 생성 rich-prose 코퍼스를 쓰며 eval 코드가 gbrain-evals에 공개돼 있다.
- **BrainBench-Real**: v0.28.x와 v0.30.x 릴리스 구간에서 추가된 실제 session 캡처 기반 벤치마크.
- **LongMemEval**: 장기 메모리 벤치마크. gbrain-evals가 R@5 97.60%를 보고한다.
- **BEAM**: 10M 토큰 규모의 long-horizon 벤치마크. Hindsight가 64.1%이고 GBrain은 실행하지 않았다.
- **RRF (Reciprocal Rank Fusion)**: `score = Σ(1 / (60 + rank))`로 vector 결과와 키워드 결과의 순위를 합치는 방식.
- **Tiered enrichment**: 언급 횟수에 따라 페이지 처리 수준을 Tier 3(stub), Tier 2(web과 social 보강), Tier 1(full pipeline)으로 올리는 방식.
- **Fail-improve loop**: LLM fallback이 일어날 때마다 실패에서 더 나은 regex를 만들어 다음 실행의 LLM 의존도를 낮추는 순환.
- **Skillify**: `gbrain skillify scaffold`와 `gbrain skillify check`로 일회성 수정을 테스트와 resolver 항목을 갖춘 영구 스킬로 승격하는 워크플로.
- **Minions**: deterministic한 배경 작업과 판단이 필요한 작업을 분리하는 Postgres 기반 job queue.
- **PGLite**: GBrain이 로컬 사용에 쓰는 Postgres 실행 환경. 30분 설치 경로와 무료 로컬 운영의 근거로 언급된다.
- **Compiled truth와 timeline**: brain 페이지 상단의 요약 절과 하단의 append-only 이력을 나눈 구조.
