---
title: "GBrain Review: An Honest Assessment (Vectorize)"
type: article
year: 2026
category: applications
raw_path: raw/articles/vectorize-2026-gbrain-review-honest-assessment.md
raw_filename: "vectorize-2026-gbrain-review-honest-assessment.md"
source: vectorize-2026-gbrain-review-honest-assessment.md
source_collection: external
author: "Vectorize (no individual byline)"
url: "https://vectorize.io/articles/gbrain-review"
publisher: "Vectorize.io"
publication_date: "2026-05-08"
tags: [gbrain, review, scorecard, brainbench, longmemeval, beam, hindsight, hybrid-search, openclaw, hermes]
---

## 요약

Vectorize.io가 2026년 5월 8일에 게시한 GBrain 리뷰다. 같은 대상을 다루는 저장소 안의 다른 자료들이 기능 소개나 설치 기록에 가깝다면, 이 글은 채점과 적용 범위 판정을 목적으로 삼는다는 점에서 성격이 다르다.

글의 논지는 두 문장으로 요약된다. GBrain의 엔지니어링 품질은 공개된 수치와 코드로 뒷받침되며 통상적인 초기 오픈소스 프로젝트를 넘어선다. 그러나 GBrain은 특정 설계 선택을 강하게 밀어붙인 opinionated software이므로, 출시 메시지가 내건 "agent memory for everyone"이라는 범위에는 맞지 않는다.

저자는 이 판단을 10개 항목 scorecard, 강점 6가지, 영리한 설계 선택 4가지, 약점 6가지, 벤치마크 수치, 비용 내역, 설치 권장 조건 목록으로 나누어 제시한다. 이 페이지는 그 구조를 따라가면서 원문이 근거로 제시한 사실과 저자가 내린 평가를 구분해 정리한다.

## 배경

### GBrain의 출시와 리뷰가 놓인 자리

GBrain은 Y Combinator CEO인 Garry Tan이 2026년 4월 5일에 공개한 오픈소스 agent memory 시스템이다. 24시간 만에 약 5,000개의 GitHub star를 얻었고 리뷰 작성 시점에는 약 1만 4천 개에 이르렀다.

저자는 이 확산을 두 요인의 합으로 본다. 기술적 실체가 실제로 있다는 점, 그리고 유명인의 가시성이 통상적인 개발자 도구 독자층 바깥까지 도달했다는 점이다.

### 리뷰가 스스로 세운 평가 틀

저자는 도입부에서 이 글이 비판이 아니라 honest assessment임을 명시한다. 비판이 아니라고 선을 긋기 위해 세 가지를 먼저 사실로 인정한다.

- 공개된 headline 수치가 정확하다.
- 아키텍처가 사려 깊다.
- 엔지니어링 품질이 통상적인 v0.30 오픈소스 프로젝트를 넘어선다.

문제 삼는 대상은 따라서 품질이 아니라 적용 범위다. GBrain은 opinionated software라서 모든 팀에게 맞지 않는데, 출시 메시지는 "agent memory for everyone"으로 틀을 잡았다는 것이 저자의 출발점이다. 글의 목표도 그에 맞춰 네 가지로 좁혀진다. GBrain이 잘하는 것, 진짜로 새로운 것, 실제 한계, 그리고 적합한 사용처를 가려내는 일이다.

글 전체의 결론은 한 문단짜리 판정으로 먼저 제시된다.

> OpenClaw나 Hermes Agent를 운영하고, 지식을 plain text로 소유하는 것을 중요하게 여기며, 스키마가 바뀔 때마다 스킬 워크플로를 직접 작성할 규율이 있다면, GBrain은 현재 나와 있는 오픈소스 markdown-first personal brain 가운데 가장 낫다.

이 조건문에 저자는 네 가지 단서를 붙인다. 프로젝트가 젊고(v0.30 근처이며 breaking change가 잦다), 단일 운영자를 전제로 설계됐고, self-hosted 전용이며, production agent memory 플랫폼과 아키텍처 성격이 다르다는 점이다.

## 핵심 개념

리뷰를 읽기 전에 정리해 둘 개념이 넷 있다.

**personal brain**은 한 사람의 노트와 대화, 만남 기록을 에이전트가 읽고 쓸 수 있는 형태로 모아 둔 저장소를 뜻한다. GBrain은 이 저장소를 Markdown 파일과 git 저장소로 두고 Postgres에 색인을 만든다.

**compounding**은 쓰면 쓸수록 시스템이 스스로 나아지는 성질을 가리킨다. 저자가 GBrain의 가장 두드러진 특징으로 꼽는 것이 바로 이 성질이 사후에 덧붙은 기능이 아니라 설계에 들어 있다는 점이다.

**hybrid retrieval**은 벡터 유사도 검색과 키워드 검색을 함께 돌린 뒤 두 결과의 순위를 합치는 방식이다. GBrain은 여기에 typed entity edge에서 나온 backlink 가산점을 더한다.

**opinionated software**는 사용 방식에 대한 특정 전제를 강하게 깔고 그에 맞춰 설계를 고정한 소프트웨어를 뜻한다. 저자가 GBrain의 낮은 점수 항목을 결함이 아니라 설계 범위의 결과로 읽는 근거가 이 개념이다.

## 방법

### 10개 항목 scorecard

저자는 GBrain을 10개 항목으로 나누어 5점 만점으로 채점한다. 점수는 저자의 평가이고, 오른쪽 열은 그 점수에 붙인 근거다.

| 항목 | 점수 | 저자가 붙인 근거 |
|---|---|---|
| Architecture | 5/5 | 3-layer 설계가 깔끔하고 논리가 선다 |
| Retrieval quality | 4/5 | hybrid search와 RRF, 4-layer dedup, BrainBench 수치가 강하다 |
| Cost efficiency | 5/5 | LLM 호출 없는 entity 추출, deterministic classifier |
| Day-one experience | 4/5 | PGLite로 30분 설치, 다만 import 전에는 brain이 비어 있다 |
| Long-term value | 5/5 | 지속해서 쓸수록 유의미하게 누적된다 |
| Documentation | 4/5 | README가 강하고 gotcha를 솔직히 적었다 |
| Integration breadth | 2/5 | OpenClaw와 Hermes만 first-class |
| Multi-tenant readiness | 1/5 | 설계 중심이 아니다 |
| Maturity | 3/5 | breaking change가 잦고 코드베이스가 젊다 |
| Honesty of marketing | 5/5 | 공개 수치가 코드 동작과 일치한다 |

점수 분포는 5점이 4개, 4점이 3개, 3점이 1개, 그리고 낮은 두 항목이다. 낮은 두 항목인 Integration breadth(2/5)와 Multi-tenant readiness(1/5)는 모두 "어디까지 쓸 수 있는가"에 해당하고, 높은 점수는 모두 "얼마나 잘 만들었는가"에 해당한다. 저자가 품질과 적용 범위를 분리해서 보는 관점이 표에 그대로 드러난다.

### 강점으로 꼽은 여섯 가지

#### compounding을 만드는 세 메커니즘

GBrain에서 시스템이 스스로 나아지는 성질은 서로를 강화하는 세 메커니즘에서 나온다.

| 메커니즘 | 동작 | 효과 |
|---|---|---|
| Tiered enrichment | 1회 언급된 entity는 stub 페이지로 남는다(Tier 3). 서로 다른 출처에서 3회 언급되면 web과 social 정보로 보강한다(Tier 2). 미팅 이후이거나 8회 이상 언급되면 full pipeline이 걸린다(Tier 1) | 운영자가 중요도를 지정하지 않아도 시스템이 학습한다 |
| Fail-improve loop | classification 과제에서 LLM fallback이 발생할 때마다 그 실패에서 더 나은 regex 패턴을 만든다 | 같은 작업을 시간이 갈수록 싸게 처리한다 |
| Backlink-boosted ranking | 다른 brain 페이지가 참조하는 페이지에 retrieval 가산점을 준다 | 링크 밀도가 높아질수록 자주 참조되는 페이지가 먼저 떠오른다 |

세 메커니즘의 방향이 같다는 점이 중요하다. tiered enrichment는 자주 등장하는 대상에 더 많은 정보를 붙이고, backlink 가산점은 그렇게 두꺼워진 페이지를 더 잘 찾게 하며, fail-improve loop는 그 처리를 점점 싸게 만든다.

fail-improve loop의 방향은 통상적인 LLM 시스템과 반대다. 보통은 데이터가 늘면 LLM 호출도 늘어 비용이 커지는데, GBrain은 실패를 규칙으로 바꾸면서 같은 작업의 LLM 의존도를 낮춘다.

저자는 이 세 메커니즘이 GBrain이 몇 달 단위로 운영하는 사용자에게 신뢰를 얻는 이유라고 본다. 뒤집어 말하면 일주일짜리 시험 사용으로는 같은 가치가 드러나지 않는다는 뜻이기도 하다.

#### LLM 호출 없는 entity 추출

GBrain은 모든 페이지 write에서 typed entity 참조를 뽑는데, 이때 LLM을 부르지 않고 regex와 문자열 매칭만 쓴다. 그래서 일상적인 ingestion이 토큰 기준으로 사실상 무료가 된다. 공개된 Minions 벤치마크는 대규모 ingestion 실행이 "\$0 in tokens"로 끝난 것을 보인다.

대가는 인식할 수 있는 entity 어휘가 규칙이 다루는 타입으로 제한된다는 점이다. 규칙에 없는 종류의 대상은 추출되지 않는다.

저자는 이 교환이 대상 규모에 맞는 선택이라고 평가한다. 단일 운영자의 personal brain에서는 코퍼스가 커져도 비용이 낮게 유지되므로 최적에 가깝다. 반면 임의의 entity 타입을 다루고 분당 수천 건의 write를 받는 multi-tenant 플랫폼이라면 학습 기반 추출이 필요할 것이라고 본다.

#### hybrid retrieval의 구성

retrieval 경로는 여섯 요소로 이뤄진다.

| 요소 | 역할 |
|---|---|
| HNSW cosine similarity | pgvector에 저장한 임베딩 위에서 근사 최근접 이웃을 찾는다 |
| Postgres tsvector 키워드 검색 | ts_rank 가중치를 적용한 전문 검색을 담당한다 |
| Reciprocal Rank Fusion | `score = Σ(1 / (60 + rank))`로 두 검색의 순위를 합친다 |
| 4-layer deduplication | 중복 결과를 네 단계로 걸러낸다 |
| Backlink-boosted ranking | 참조를 많이 받는 페이지의 순위를 올린다 |
| Claude Haiku query expansion | 선택 사항이다. 검색 한 번당 대체 표현을 약 2개 만든다 |

RRF의 상수 60은 순위가 낮은 결과의 기여도를 완만하게 줄이는 역할을 한다. 1위 문서는 1/61, 10위 문서는 1/70의 점수를 받으므로, 한 검색 방식에서 압도적 1위였던 문서가 다른 방식에서 밀렸다고 해서 곧바로 탈락하지는 않는다.

저자가 이 구성에서 특히 주목하는 결과는 graph의 기여도다. typed-edge graph가 hybrid search 단독보다 retrieval 향상에 더 많이 기여한다는 관찰인데, 저자는 이를 드물고 의미 있는 결과로 평가한다. 수치는 결과 절에서 다룬다.

#### plain text 소유권

brain 저장소는 Markdown을 git에 담는다. 이 단순한 결정에서 운영상의 성질 네 가지가 따라 나온다.

- 밤사이 에이전트가 학습한 내용을 `git diff`로 확인한다.
- 재구성을 실험할 때 brain을 branch해서 격리한다.
- 각각의 write를 텍스트 편집기에서 줄 단위로 검토한다.
- 데이터베이스가 사라져도 저장소에서 다시 만든다.

저자는 이것이 구조화된 저장소만 쓰는 시스템과 근본적으로 다른 지점이라고 본다. 데이터베이스가 유일한 원본인 시스템에서는 위 네 가지가 모두 별도 기능으로 구현돼야 하지만, 원본이 텍스트 파일이면 git이 이미 갖고 있는 기능이 된다. 저자는 작가, 연구자, analyst, 창업자에게 이 성질이 결정적 요인이 된다고 덧붙인다.

#### 젊은 프로젝트치고 성숙한 production 인프라

저자가 엔지니어링 성숙도의 증거로 든 네 가지다.

| 요소 | 내용 |
|---|---|
| Minions | Postgres 기반 job queue로, deterministic한 배경 작업과 판단이 필요한 작업을 분리한다. 같은 작업을 gateway timeout 대신 중앙값 1초 미만으로 처리하고, 재시작을 넘겨 durability를 유지하며, deterministic 경로에서는 LLM 토큰을 쓰지 않는다 |
| Durable agents | Anthropic 턴마다 `subagent_messages`에, tool call마다 `subagent_tool_executions`에 커밋한다. worker가 죽어도 마지막으로 커밋된 턴에서 재개한다 |
| Skillify workflow | `gbrain skillify scaffold`와 `gbrain skillify check`가 일회성 수정을 테스트와 resolver 항목, 감사 기록을 갖춘 영구 스킬로 바꾼다. 버전 관리와 회귀 테스트가 기본 절차가 된다 |
| Health checks | `gbrain doctor`, `gbrain skillpack-check --quiet`, `gbrain skillpack install --dry-run`이 brain을 인프라처럼 다룬다. `--quiet`는 CI에서 쓰도록 exit code를 반환한다 |

앞의 두 요소는 실패를 전제로 한다. Minions는 재시작을 넘겨 durability를 유지하고, durable agent는 worker가 죽은 지점에서 재개한다. 뒤의 두 요소는 운영 절차를 고정한다. skillify는 일회성 수정을 테스트가 붙은 스킬로 승격시키고, health check는 상태 점검을 명령 하나로 만든다.

저자는 이 정도 인프라 깊이가 보통 오픈소스 프로젝트에서 18개월이 걸린다고 지적하면서, GBrain이 처음부터 갖춰 나온 이유를 Tan이 이미 자기 production brain에서 운영하고 있었기 때문으로 설명한다.

#### 정직한 마케팅

저자는 이 항목에 5/5를 주면서 네 가지를 근거로 든다. 공개된 BrainBench 수치가 실제 코드 동작을 정확히 기술하고, README가 설치 함정을 솔직히 문서화하며, 아키텍처 문서가 구현과 일치하고, "100% LongMemEval, 세계 최고의 memory 시스템" 같은 부풀린 주장 대신 명확히 기술된 코퍼스 위의 구체적 수치와 재현 가능한 eval 코드만 제시한다는 것이다.

저자는 벤치마크 정직성 문제가 이미 문서화된 분야라는 배경을 덧붙이며, 그 안에서 이것이 의미 있는 차별점이 된다고 평가한다.

### 영리한 설계 선택 네 가지

저자는 강점과 별도로 "영리한 점"이라는 항목을 따로 둔다. 잘 만든 것이 아니라 접근이 새로운 것을 모은 항목이다.

| 선택 | 내용과 저자의 평가 |
|---|---|
| compiled truth와 timeline을 나눈 페이지 패턴 | 모든 brain 페이지가 상단에 요약 절, 하단에 append-only 이력을 둔다. 갱신은 요약 절에 반영되고 이력은 timeline에 남는다 |
| 스킬을 설정이 아니라 코드로 | 스킬은 발동 조건, 검사, 연쇄를 기술한 두툼한 Markdown 파일이고 에이전트가 읽어 실행한다. YAML 기반 워크플로 엔진과 대비된다 |
| "thin harness, fat skills" 기조 | 런타임을 의도적으로 최소로 두고 지능은 34개 이상 기본 제공 스킬 파일과 운영자 추가분에 둔다 |
| 문제 범위를 좁게 고정 | 개인 brain을 쓰는 OpenClaw와 Hermes Agent 운영자를 겨냥한다 |

첫 번째 패턴이 푸는 문제는 메모리 시스템의 오래된 트레이드오프다. 갱신할 때 옛 내용을 덮어쓰면 이력이 사라지고, 계속 덧붙이면 페이지가 무한히 커진다. compiled truth와 timeline을 나누면 현재 상태는 상단 요약 절 하나로 유지되고 변경 이력은 아래에 남아, 두 요구를 감사 가능한 구조로 함께 만족시킨다.

두 번째 선택의 대가는 스킬 작성이 장황해진다는 점이다. 얻는 것은 판단 근거가 읽을 수 있는 문서로 남는다는 점이다. 에이전트가 왜 그렇게 행동했는지 확인하는 일이 상태 기계를 디버깅하는 작업이 아니라 Markdown을 읽는 작업이 된다.

세 번째 기조에서 운영자는 core를 고치지 않고 스킬을 교체하거나 fork할 수 있다. 동작에 대한 소유권이 프레임워크가 아니라 운영자에게 남는다는 뜻이다.

네 번째 선택은 앞의 세 가지가 서로 맞물리는 이유이기도 하다. "모두의 agent memory"라는 목표를 피했기 때문에 설계 선택들이 한 방향으로 정렬될 수 있었다는 것이 저자의 해석이다.

### 약점으로 꼽은 여섯 가지

| 약점 | 저자가 제시한 근거와 세부 |
|---|---|
| 단일 운영자 설계 | 다중 사용자 공유는 PGLite에서 Postgres로 전환하고, 여러 기기에 걸쳐 git 작업을 관리하고, index와 markdown의 동기화를 유지해야 한다 |
| managed cloud 없음 | self-hosted 전용이다. 로컬은 PGLite, 공유 모드는 외부 Postgres를 쓴다. "Hindsight Cloud"에 해당하는 것이 없어 managed 가입 절차도 control plane도 없다 |
| 통합 범위가 좁다 | first-class 스킬 팩은 OpenClaw와 Hermes Agent에만 있고 나머지는 개인이 유지하는 MCP 서버로 연결한다 |
| 스키마 규율이 필요하다 | 스키마는 권장 문서에 있고 워크플로와 레시피는 사람이 쓴다. 기존 스킬에 맞지 않는 사실이 들어와도 구조가 자동 합성되지 않는다 |
| retrieval 단계의 multi-hop graph와 temporal reasoning 부재 | write 시점에 typed entity edge를 뽑아 backlink 랭킹에 쓰지만 retriever가 multi-hop 순회를 우선하지 않는다 |
| 성숙도와 설치 함정 | v0.30 계열은 breaking change가 잦고 README가 두 가지 설치 함정을 문서화하고 있다 |

#### 단일 운영자와 multi-tenant의 구분

저자는 이 항목에서 흔히 뭉뚱그려지는 두 층을 나눈다. 원격 MCP HTTP 서버(`gbrain serve --http`)는 client별 scoping을 갖춘 OAuth 2.1을 제공하므로, 한 사람이 여러 client에서 접속하는 multi-client 접근은 first-class로 지원된다.

지원되지 않는 것은 그다음 층이다. 서로 다른 사용자가 서로 다른 brain을 격리해 쓰는 multi-operator 접근은 설계 중심이 아니다. 따라서 최종 사용자에게 서비스하는 agent 제품에 multi-tenant memory가 필요한 팀은 구조적으로 어긋난다는 것이 저자의 판단이며, scorecard의 1/5도 이 지점을 가리킨다.

#### 통합 범위의 실제 크기

first-party 패키지가 없는 스택으로 저자가 나열한 것은 Claude Code, Cursor, Codex, CrewAI, LangGraph, LlamaIndex, AutoGen, n8n, Dify, Pipecat, LiteLLM이다. 목록의 길이 자체가 2/5라는 점수의 근거다. MCP가 있어 연결 자체는 가능하지만 연결부는 팀이 직접 작성해야 한다.

#### 스키마 규율의 부담

GBrain의 모든 패턴은 운영자가 작성한다. 기존 스킬에 맞지 않는 사실이 들어와도 새 구조가 자동으로 합성되지 않고, 운영자가 새 스킬을 쓴다. 저자는 문서 자체가 set-and-forget 방식으로 두면 가치가 아니라 오류가 누적된다고 밝히고 있다는 점을 근거로 든다. 메모리 패턴을 직접 설계하려는 운영자에게는 맞고, 원시 사실에서 구조가 자동으로 만들어지기를 바라는 쪽에는 부담이다.

#### 다루어지지 않는 두 종류의 질의

저자가 예로 든 두 질의는 성격이 다르다. "내가 YC에서 만난 사람들이 창업한 회사에 투자한 사람은 누구인가"는 관계를 여러 단계 걸어야 답이 나오는 multi-hop 질의다. "지난주에는 참이었지만 지금은 아닌 것은 무엇인가"는 서로 다른 시점의 상태를 비교해야 하는 시간 질의다.

GBrain은 write 시점에 typed entity edge를 뽑아 두지만, retriever가 그 edge를 따라 순회하는 것을 주된 전략으로 삼지 않는다. 시간 질의에도 first-class 지원이 없다. 저자는 대부분의 개인 brain 질의가 이 한계를 견딜 수 있다고 보면서도, 구조적 multi-hop이나 시간 추론이 주력이어야 하는 작업이라면 그 전략을 우선하는 다른 시스템이 필요하다고 덧붙인다.

#### 성숙도와 설치 함정

최근 릴리스 구간인 v0.28.x와 v0.30.x는 BrainBench-Real session 캡처, Voyage를 통한 멀티모달 ingestion, npm squat 탐지, dream-cycle synthesize 개선을 추가했다. 기능이 빠르게 들어오는 만큼 breaking change도 잦다.

README가 문서화한 설치 함정은 두 가지이며 둘 다 GitHub 이슈로 추적된다.

| 피해야 할 명령 | 이유 |
|---|---|
| `bun install -g github:garrytan/gbrain` | postinstall hook이 차단된다 |
| `npm install -g gbrain` | npm 레지스트리에 squat된 패키지가 있다 |

저자는 이 단계 프로젝트에서 정상적인 일이라고 하면서도, 안정성이 중요한 팀이라면 버전 고정, 이슈 추적, 패치 시간 확보가 여전히 필요하다고 본다.

### 배포 형태별 평가

저자는 설치 경험을 세 가지 형태로 나누어 본다.

| 형태 | 절차 | 저자의 평가 |
|---|---|---|
| agent 주도 설치 | INSTALL_FOR_AGENTS.md의 URL을 에이전트에 붙여 넣는다 | OpenClaw나 Hermes 운영자에게 가장 매끄럽다 |
| standalone CLI | `git clone` 후 `bun install && bun link`, 이어서 `gbrain init` | 무리 없이 작동한다 |
| 그 외 스택 | 사용자가 brain을 자신의 agent 스택에 직접 연결한다 | MCP 서버가 연결을 가능하게 하지만 속도를 보장하지는 않는다 |

## 결과

### BrainBench

BrainBench는 GBrain이 직접 만든 벤치마크다. 240페이지 규모의 Opus 생성 rich-prose 코퍼스를 쓰고, eval 코드와 코퍼스가 gbrain-evals 저장소에 공개돼 있다.

| 구성 | P@5 | R@5 |
|---|---|---|
| 풀 시스템 | 49.1% | 97.9% |
| graph layer 비활성 | 풀 시스템보다 31.4%p 낮음 | 보고 없음 |
| ripgrep-BM25 + vector-only RAG | 비슷한 폭으로 열세 | 보고 없음 |

R@5 97.9%는 상위 5건 안에 정답 문서가 거의 항상 들어온다는 뜻이고, P@5 49.1%는 그 5건 가운데 절반 정도가 실제로 관련 문서라는 뜻이다. 개인 brain의 질의 응답에서는 정답을 놓치지 않는 쪽이 더 중요하므로 두 수치의 차이 자체가 문제로 읽히지는 않는다.

가장 의미 있는 수치는 graph layer를 껐을 때의 하락 폭이다. 같은 시스템에서 typed-edge graph만 제외하면 P@5가 31.4%p 낮아진다. 저자는 typed-edge graph가 hybrid search 단독보다 retrieval 향상에 더 많이 기여한다는 이 결과를 드물고 의미 있는 관찰로 평가한다.

### LongMemEval과 BEAM

BrainBench가 자체 벤치마크라면 나머지 둘은 외부 벤치마크다.

| 벤치마크 | GBrain의 상태 | 비고 |
|---|---|---|
| LongMemEval | v0.28 릴리스 구간에서 통합. gbrain-evals가 R@5 97.60% 보고 | 장기 메모리 벤치마크 |
| BEAM | 실행하지 않음 | 10M 토큰 규모의 long-horizon 벤치마크로, Hindsight가 64.1%로 앞서 있다 |
| retrieve-everything 계열 | 시험하지 않음 | 경쟁 제품이 쓰는 방식 |

저자는 GBrain의 벤치마크 자체를 별도로 평가한다. 공개 수치가 내부적으로 일관되고, 방법론이 문서화돼 있으며, eval 코드가 재현 가능하다는 것이 판정이다. 다만 코퍼스가 다르기 때문에 다른 시스템의 학술 점수와 직접 비교되지는 않는다는 단서를 명시적으로 붙인다.

이 단서는 앞의 표를 읽는 방법이기도 하다. GBrain의 97.60%와 Hindsight의 64.1%는 서로 다른 벤치마크의 값이므로 나란히 놓고 우열을 말할 수 없다.

### day-one 경험

30분 설치는 실제라고 저자는 평가한다. 다만 설치를 마쳐도 brain은 비어 있는 상태로 시작한다.

`gbrain import ~/notes/`가 기존 markdown을 색인해 이 문제를 완화한다. Obsidian, Logseq, 일반 텍스트 노트가 대상이며, 기존 노트를 넣어 두면 첫날부터 의미 있는 retrieval을 얻는다. 아무것도 넣지 않고 시작하면 쓸 만한 retrieval을 얻기까지 실제 에이전트 운영과 페이지 write가 쌓여야 한다. day-one experience가 5점이 아니라 4점인 이유가 이 지점이다.

### 장기 신호

이 절의 판단은 직접 production에서 운영한 경험이 아니라고 저자가 먼저 밝힌다. 근거는 README 서술, 공개 수치, gbrain-evals 저장소, 공개 출시 논의 네 가지다.

| 구분 | 내용 |
|---|---|
| 긍정 신호 | Tan의 개인 brain은 여러 해에 걸쳐 수만 페이지 규모로 자랐고 자율 cron job이 19개 이상 걸려 있다. fail-improve loop가 LLM 의존도를 실제로 낮춘다. Minions 인프라가 production 부하를 감당한다. 공개 사용자들이 4주에서 8주 사이에 반복 등장 인물에 tier-2 enrichment가 걸리면서 유의미한 개선을 보고한다 |
| 예상되는 부정 신호 | minor 버전 사이에 breaking change가 간간이 발생한다. 신규 운영자의 설치 마찰이 있으나 v0.28.5 이후 자체 탐지로 상당 부분 해소됐다. 운영자 워크플로가 바뀔 때마다 스킬을 다시 써야 한다 |

부정 신호 목록에 대해 저자는 설치하지 말아야 할 이유는 아니며 현실적인 기대치를 정하는 재료라고 덧붙인다.

공개 사용자들의 4주에서 8주라는 기간은 앞의 tiered enrichment 규칙과 맞물려 읽힌다. 반복해서 등장하는 인물이 3회 cross-source 언급 기준을 넘겨 Tier 2로 올라가려면 그만큼의 사용 기간이 필요하기 때문이다.

### 비용

GBrain 자체는 MIT 라이선스로 무료이고, 실제 비용은 외부 API와 데이터베이스에서 발생한다.

| 항목 | 필수 여부 | 비용 |
|---|---|---|
| OpenAI API | 필수. vector 검색용 텍스트 임베딩을 담당한다 | 현재 가격 기준 ingestion 토큰 100만 개당 약 0.10달러 |
| Anthropic API | 선택. query expansion을 담당한다 | 쓰지 않아도 동작하지만 쓰면 retrieval이 뚜렷하게 나아진다 |
| Postgres | 필수 | 로컬 사용은 PGLite로 무료. 공유 모드는 기존 Postgres나 관리형 인스턴스를 쓰며, Supabase 무료 티어로 작은 brain은 충분하다 |

활발히 쓰는 개인 brain의 LLM 비용은 보통 월 한 자릿수 달러에 머문다. 저자는 이 수준이 가능한 이유로 앞서 설명한 두 설계 선택을 든다. deterministic한 entity 추출이 write마다 드는 비용을 없애고, fail-improve loop가 남은 LLM 호출마저 시간이 갈수록 줄이기 때문이다. LLM 사용량이 많은 memory 제품과 비교해 비용이 유리한 근거도 여기에 있다.

### 설치 권장 조건과 대안 고려 조건

저자는 판단을 독자에게 맡기지 않고 조건 목록으로 제시한다. 두 열은 서로 대응한다.

| 설치를 권장하는 경우 | 대안을 고려할 경우 |
|---|---|
| OpenClaw 또는 Hermes Agent를 운영한다 | 그 외 스택을 쓰면서 first-class 통합이 필요하다 |
| git 저장소에 plain text markdown 메모리를 두고 싶다 | self-hosted 인프라가 아니라 memory-as-a-service가 필요하다 |
| 스키마가 바뀔 때마다 스킬 워크플로를 직접 작성한다 | 운영자가 쓴 스킬 대신 원시 사실에서 구조가 자동 합성되기를 원한다 |
| 몇 달 단위 시간 지평을 유지한다 | multi-tenant 격리, 엔터프라이즈 컴플라이언스, managed cloud가 필요하다 |
| 단일 운영자 규모에서 쓴다 | multi-hop graph 순회나 temporal reasoning이 주된 retrieval 전략이어야 한다 |
| Postgres를 무리 없이 운영하고 젊은 프로젝트의 GitHub 이슈를 추적한다 | |

왼쪽 목록의 네 번째 항목에 저자는 단서를 붙인다. GBrain은 투자에 비례해 돌려주는 시스템이므로 일주일짜리 시험 사용은 가치를 보여주지 못한다는 것이다. 앞서 본 compounding 메커니즘과 4주에서 8주라는 사용자 보고가 이 조건의 근거다.

### FAQ에서 드러난 판단

원문 말미의 FAQ는 본문에서 다루지 않은 두 가지를 추가로 밝힌다.

| 질문 | 저자의 답 |
|---|---|
| 설치할 가치가 있는가 | 앞서 기술한 사용자층에 해당하면 그렇다. 아니면 다른 선택지가 더 맞을 가능성이 높다 |
| Mem0, Zep, Hindsight보다 나은가 | 질문의 틀이 잘못됐다. 단일 운영자 markdown brain 최적화와 memory-as-a-service는 목표가 다르다 |
| production에서 쓸 수 있는가 | "production"의 정의에 달렸다. Tan의 개인 brain처럼 매일의 agent 워크플로를 받치는 용도라면 이미 입증됐고, 수천 명에게 서비스하는 agent 제품의 multi-tenant 인프라라면 상당한 커스텀 작업 없이는 아니다 |
| 유명세와 YC 후광이 평판을 부풀렸는가 | 어느 정도 그렇다. 브랜드 후광이 빠른 star 증가에 기여했다. 다만 BrainBench 수치, Minions 벤치마크, fail-improve loop는 실재하고 설계가 좋아 아키텍처와 엔지니어링도 독립적으로 성립한다. YC CEO 브랜딩을 걷어 내도 나은 편에 드는 개인 brain 프로젝트로 남되, 그 브랜딩 덕에 가시성은 실제보다 크게 얻고 있다 |

마지막 답이 이 리뷰에서 가장 직접적인 비판이다. 후광 효과를 인정하는 판단과 브랜드를 걷어 내도 실체가 남는다는 판단이 같은 답 안에 함께 들어 있고, 이 두 겹의 서술이 글 전체의 태도를 요약한다.

### 최종 판정

저자는 GBrain이 의도한 사용자층에게는 진지하게 인상적인 엔지니어링이라고 정리한다. 차별점으로 꼽는 것은 compounding 메커니즘, production 인프라, 정직한 마케팅이며, Markdown을 source of truth로 삼아 diff와 branch가 되고 운영자가 읽을 수 있게 한 결정이 brain을 소유하려는 사용자에게 정확히 맞는다고 본다.

동시에 좁은 통합 범위, 단일 운영자 설계, managed cloud 부재, 젊은 코드베이스가 의견이 강한 선택이며 임의의 스택 위에서 agent memory를 원하는 팀에는 맞지 않는다고 말한다. 조건이 맞으면 GBrain을 고르고 그렇지 않으면 Hindsight를 비롯한 대안이 낫다는 두 판단이 모두 유효하다는 것이 결론이다.

## 한계

### 리뷰가 스스로 밝힌 한계

- 장기 신호는 README, 공개 수치, gbrain-evals, 공개 출시 논의에서 추정한 것이고 직접 production 운영 경험이 아니다. 저자가 해당 절 첫머리에 이를 명시한다.
- BEAM을 실행하지 않아 long-horizon 비교에 GBrain 측 수치가 없다.
- Hindsight, Mem0, Zep과의 직접 비교는 코퍼스가 달라 학술 점수를 1:1로 맞대기 어렵다. 저자는 Hindsight와의 head-to-head를 별도 글로 분리했다고 밝힌다.

### 사실과 평가의 구분

이 자료는 리뷰이므로 서술의 성격이 두 종류로 갈린다. 인용할 때 어느 쪽인지 구분하는 편이 안전하다.

| 성격 | 해당하는 서술 |
|---|---|
| 원문이 근거로 제시한 사실 | BrainBench와 LongMemEval 수치, graph 비활성 시 31.4%p 하락, RRF 수식, tier 승격 기준(1회, 3회, 8회), 가격, 설치 함정 두 가지, 미지원 스택 목록, 릴리스 구간에 추가된 기능 |
| 저자가 내린 평가 | 10개 항목의 점수, "가장 나은 markdown-first personal brain"이라는 판정, 인프라 깊이가 보통 18개월 걸린다는 비교, 유명세가 평판에 기여한 정도, 설치 권장 조건과 대안 고려 조건 |

### 자료만으로 확인되지 않는 사항

- 원문에는 필자 개인 byline이 없고 발행 주체와 GBrain 또는 경쟁 제품의 이해관계를 밝히는 고지도 없다. 따라서 이해관계 유무를 이 자료만으로는 판단할 수 없다.
- 저장소의 raw 파일은 WebFetch로 추출한 본문 digest이며 일부 문장은 모델이 발췌하거나 재구성했을 수 있다고 파일 자체가 밝히고 있다. 문장 단위 인용이 필요하면 frontmatter의 URL로 원문을 확인해야 한다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| BrainBench | GBrain 자체 벤치마크. 240페이지 규모의 Opus 생성 rich-prose 코퍼스를 쓰며 eval 코드가 gbrain-evals에 공개돼 있다 |
| BEAM | 10M 토큰 규모의 long-horizon 벤치마크. Hindsight가 64.1%이고 GBrain은 실행하지 않았다 |
| RRF | Reciprocal Rank Fusion. `score = Σ(1 / (60 + rank))`로 vector 결과와 키워드 결과의 순위를 합치는 방식 |
| Tiered enrichment | 언급 횟수에 따라 페이지 처리 수준을 Tier 3(stub), Tier 2(web과 social 보강), Tier 1(full pipeline)으로 올리는 방식 |
| Fail-improve loop | LLM fallback이 일어날 때마다 실패에서 더 나은 regex를 만들어 다음 실행의 LLM 의존도를 낮추는 순환 |
| Minions | deterministic한 배경 작업과 판단이 필요한 작업을 분리하는 Postgres 기반 job queue |

## 관련 페이지

- [[applications/garrytan-gbrain]]: 이 리뷰가 평가 대상으로 삼은 1차 소스 코드와 README. 기능 목록과 채점 결과를 대조해 읽는다.
- [[applications/xguru-2026-gbrain-open-source-personal-knowledge]]: 같은 대상을 소개 관점에서 다룬 글이다. 무엇을 할 수 있는지에 초점을 두는 소개와 어디까지 쓸 수 있는지에 초점을 두는 이 리뷰가 서로 보완한다.
- [[applications/gajjar-2026-gbrain-vs-computer-memory]]: 엔터프라이즈 대안과의 비교. 이 리뷰가 Multi-tenant readiness에 1/5를 준 지점을 다른 각도에서 다룬다.
- [[applications/mantena-2026-hermes-gbrain-setup-vps]]: 30분 설치와 Hermes 자동 ingestion의 실전 기록. 이 리뷰가 day-one experience에 4/5를 준 근거를 실제 절차로 확인할 수 있다.
- [[applications/techwealth-hub-2026-garry-tan-gbrain-explained]]: verification runbook 관점의 영상 요약.
- [[overviews/gbrain-ecosystem-overview]]: GBrain 관련 자료를 묶은 허브 페이지.
