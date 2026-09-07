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

Yanli Liu가 쓴 15분 분량의 결정 프레임워크 에세이로, 에이전트 메모리 설계를 "당신의 에이전트가 하는 일이 무엇인가(what is your agent's job?)"라는 질문 하나로 세 가지 유형으로 나눈다. 대규모 코퍼스에서 답을 찾아오는 일이면 RAG, 시간이 지날수록 풍부해지는 지식을 컴파일하는 일이면 Karpathy의 LLM Wiki, 아는 것을 스스로 실행하는 일이면 Garry Tan의 GBrain식 fat skills다. 결론은 2026년의 질문이 "어느 쪽이 이기는가"가 아니라 "retrieve, compile, act의 경계가 얼마나 빨리 허물어져 단일 knowledge operating system이 되는가"라는 것이다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 저자 | Yanli Liu |
| 매체 | Medium의 ai.gopubby.com publication |
| URL | <https://ai.gopubby.com/rag-llm-wiki-or-gbrain-how-your-agent-remembers-changes-everything-56829e66725c> |
| 게시일 | 2026-04-27 |
| 부제 | "Karpathy's compounding wiki, Garry Tan's autonomous brain, and the decision framework most teams skip" |
| 분량 | 15분 분량, claps 약 1,300회, 응답 9건 (수집 시점) |
| 수집 방법 | 사용자가 본문을 수동으로 복사해 저장 |

글은 Karpathy가 GitHub gist를 공개하고 약 3주 뒤에 나왔다. 본문 첫 문장이 "Three weeks ago"로 시작하며 그 gist가 며칠 만에 5,000개의 star를 받았다고 적는다. GBrain 공개 시점은 "Later on"이라고만 적혀 있고 구체적 간격은 명시하지 않는다.

세 아키텍처를 비슷한 분량으로 다루고 각 절 끝에 "Verdict" 단락을 두어, 특정 제품을 밀지 않고 선택 기준을 제시하는 구성을 취한다. 본문에는 저자가 직접 그린 도식이 10개 삽입되어 있으나 수집본에는 캡션 줄만 남아 있고 이미지 파일은 없다.

## 2. 주요 기여 (Key Contributions)

| # | 기여 | 핵심 내용 |
|---|---|---|
| 1 | 단일 질문 기반 결정 프레임워크 | "what is your agent's job?" 하나로 retrieve(RAG), compile(LLM Wiki), act(fat skills)를 가른다 |
| 2 | RAG 7개 failure point 중 3개 선별 | chunking, re-derivation, passivity. 2024년 논문이 정리한 7개 중 3개는 모델이 컨텍스트를 보기도 전에 발생한다 |
| 3 | context window는 메모리가 아니라는 명제 | 100만 토큰을 담아도 30만에서 40만 토큰, 한도의 30~40%에서 성능 저하가 시작되고 세션 종료 시 초기화된다 |
| 4 | LLM Wiki 3계층 정식화 | 하단 원본(immutable), 중간 wiki(모델 소유), 상단 schema(CLAUDE.md 같은 운영 규칙) |
| 5 | 복리 누적의 정량 지표 | ingest 1회당 wiki page 10~15개 갱신. 합성 답변도 wiki page로 저장되며 slug는 질문에서 유도된다 |
| 6 | lint workflow | 모델이 wiki 전체를 주기 감사해 orphan page, 오래된 주장, 미생성 개념을 찾는다. "the machine does the maintenance humans always abandon" |
| 7 | LLM Wiki 규모 천장 | 원본 100건에 page 수백 개는 정상, 1만 건에서 탐색 실패, 10만 건에서 retrieval 레이어가 필요해져 RAG로 회귀 |
| 8 | thin harness, fat skills의 정량 근거 | harness를 약 200줄로 유지하고 지능은 전부 markdown 스킬에 둔다 |
| 9 | resolver는 skill description이 대신한다 | 명시적 라우팅 코드가 불필요하다. "Fewer fatter skills makes the resolver shorter, which itself is less context bloat" |
| 10 | fat skill 실물 YAML frontmatter 공개 | `enrich` 스킬의 name, version, description, triggers, tools, mutating, writes_to를 그대로 인용하고 "contract"라고 평가한다 |
| 11 | 7단계 enrichment와 3등급 프로토콜 | inner-circle, industry figures, tracking only. `[Source: ...]` 인용 필수, 우선순위는 사용자 진술, compiled truth, timeline, 외부 API 순 |
| 12 | 스킬 철학 인용 | "Intelligence dossiers, not LinkedIn scrapes". 기본 사실보다 신념, 프로젝트, 동기, 궤적을 우선한다 |
| 13 | always-on signal-detector | 모든 수신 메시지에 병렬 서브에이전트를 붙여 original idea와 entity mention을 포착한다. "An unlinked mention is a broken brain" |
| 14 | fat skill과 function call의 구분 | function call은 상태 없이 실행하고 잊는다. fat skill은 상태를 유지하고 품질 기준을 강제하며 brain을 더 풍부하게 남긴다 |
| 15 | cron을 자율 에이전트로 쓰는 패턴 | 잡 프롬프트가 "Read skills/{name}/SKILL.md and run it" 한 줄. 5분 시차, quiet hours 기본 23시부터 8시, idempotent, 감사 기록 |
| 16 | latent 작업과 deterministic 작업의 분리 | 읽기와 합성은 모델이, 데이터베이스 쓰기와 계산은 코드가 맡는다. "Mixing them is how agents hallucinate" |
| 17 | 2026년 수렴 예측 | LLM Wiki v2 커뮤니티 확장판의 retrieval 추가, GBrain의 pgvector 질의, Neo4j의 단일 access point 통합 |
| 18 | Claude Code가 세 패턴을 암시한다는 관찰 | CLAUDE.md는 mini-wiki, auto-memory는 복리 누적, 스킬은 실행. "the same pressures produced the same solutions" |

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 문제 정의, 에이전트가 잊는 이유

저자는 context window가 메모리가 아니라 세션마다 지워지는 화이트보드라는 전제를 먼저 못박는다. 100만 토큰을 담을 수 있어도 30만에서 40만 토큰 구간에서 성능 저하가 시작되고 세션 종료 시 전부 초기화된다.

RAG는 이 문제에 대한 첫 번째 진지한 답이었다. 전부를 context window에 넣는 대신 문서를 벡터로 임베딩해 저장하고 질의 시점에 관련 청크만 가져온다. 저자는 수백만 개의 production 시스템이 이 위에서 동작한다고 인정한다. 다만 2024년 논문이 정리한 실패 지점 7개 가운데 세 가지가 에이전트에게 특히 문제가 된다.

| 실패 유형 | 증상 | 저자가 든 예시 |
|---|---|---|
| chunking problem | 관련 정보가 서로 다른 벡터로 흩어진다 | 30페이지 기술 명세가 500토큰 조각으로 쪼개져 컴플라이언스 요구사항 청크와 그 이유를 설명하는 청크가 분리된다. 검색기가 하나만 찾아 기술적으로는 맞지만 위험할 만큼 불완전한 답이 나온다 |
| re-derivation problem | 모든 질의가 매번 처음부터 시작한다 | 어제 같은 문서를 분석해 같은 결론을 냈어도 내일 또 같은 일을 한다. Karpathy 인용은 "RAG rereads the same books for every exam, never actually learning the material" |
| passivity problem | 물어볼 때까지 기다린다 | 지난 화요일 인덱싱한 문서가 오늘 문서와 모순되어도 알아채지 못하고, 세 자료가 중요한 세부에서 어긋나도 표시하지 않는다 |

저자는 이 세 가지를 fragmented context, no compounding, no action으로 요약하고, Karpathy의 LLM Wiki가 앞의 두 개를, Tan의 GBrain이 세 개 전부를 겨냥한다고 정리한다.

### 3.2 RAG, The Retriever

- **파이프라인**: embed, store, retrieve, generate. Pinecone이나 Chroma 같은 벡터 데이터베이스에 저장한다.
- **성숙도**: LangChain과 LlamaIndex를 비롯한 여러 프레임워크가 표준화했고, 팀이 이미 만드는 법을 안다는 사실이 대부분의 아키텍처 비교가 인정하는 것보다 중요하다고 저자는 본다.
- **규모**: 정책, 메모, 명세, Slack 내보내기까지 내부 문서 20만 건을 전부 인덱싱하고 같은 날 질의를 시작할 수 있다. wiki page 전처리도 스킬 작성도 필요 없다.
- **신선도**: 문서가 바뀌면 다시 임베딩하면 되고 wiki 감사나 스킬 재작성이 따라붙지 않는다.
- **약점 1, 구조적 chunking**: 청크 크기 조절로 풀리지 않는다. 7개 실패 지점 가운데 3개는 언어 모델이 컨텍스트를 보기도 전에 발생한다.
- **약점 2, 누적 지연**: 임베딩과 vector search, reranking, 컨텍스트 패키징 각 단계가 밀리초를 더한다. 에이전트가 루프에서 tool call을 40번 하면 초 단위로 누적된다.
- **규제 대응**: 데이터가 자기 vector store에 남고 retrieval이 감사 가능하며 생성이 추적 가능하다. 저자는 이 감사 가능성이 새 접근의 복리 누적 이점보다 중요하게 평가되는 경우가 많다고 본다.

**Verdict**: 코퍼스가 1만 건 이상이고 자주 바뀌며 알려진 trade-off로 production 출시를 서둘러야 할 때 쓴다. 에이전트가 자기 작업에서 학습하거나 자율 실행해야 하면 쓰지 않는다.

### 3.3 LLM Wiki, The Compiler

질의 시점에 raw chunk를 가져오는 대신 모델을 써서 원본을 상호 연결된 wiki로 미리 컴파일한다. 합성은 한 번만 하고 이후 모든 질의가 그 결과를 쓴다.

| 계층 | 소유 | 내용 |
|---|---|---|
| 하단 (raw) | 사람 | PDF, 기사, 자막, 북마크. immutable이며 모델은 읽기만 한다 |
| 중간 (wiki) | 모델 | 요약, entity page, 개념 정의, 상호 참조를 담은 markdown page |
| 상단 (schema) | 사람 | CLAUDE.md 같은 설정 파일. 명명 규칙, 상호 참조 규칙, 모순의 정의 |

- **복리 누적 경로 1, ingest**: 새 문서를 넣으면 기존 wiki와 대조해 영향받는 page를 전부 갱신한다. 한 번에 보통 10~15개 page를 건드리며 상호 참조 추가, 모순 표시, entity profile 갱신이 함께 일어난다.
- **복리 누적 경로 2, 질의 루프**: 합성 답변이 새 지식이면 다시 wiki page로 저장되고 slug는 질문 자체에서 유도된다.
- **lint workflow**: 모델이 주기적으로 wiki 전체를 감사해 들어오는 링크가 없는 orphan page, 오래된 주장, 언급만 되고 자기 page를 받지 못한 개념을 찾는다. 저자의 평가는 "the machine does the maintenance humans always abandon"이다.
- **약점 1, 규모 천장**: BM25와 grep 탐색이 원본 100건에 page 수백 개까지는 잘 동작하지만 1만 건에서 실패하고 10만 건에서는 retrieval 레이어가 필요해져 다시 RAG처럼 보인다.
- **약점 2, 선행 연산 비용**: 매 ingest마다 모델이 새 원본과 관련 기존 page를 읽고 다시 쓴다. 문서당 비용이 RAG 임베딩보다 상당히 크다.
- **약점 3, 수동성**: 세 자료에 등장한 마감이 지나도 알아채지 않고, 새 문서가 기존 정책과 충돌해도 알림을 발생시키지 않는다.
- **거버넌스**: 요약과 상호 참조, 합성 page 같은 파생 사본이 일부 규제 환경에서 보존과 감사 대상이 된다.

**Verdict**: 원본이 수천이 아니라 수백 단위이고, 지식이 누적되어야 하며, retrieval이 아니라 합성이 필요할 때 쓴다. 실시간 신선도, 대규모, 자율 실행이 필요하면 쓰지 않는다. 적합한 사례는 원본 200건으로 규제 변화를 추적하는 팀이고, 부적합한 사례는 Confluence page 50만 개를 질의 가능하게 만들려는 회사다.

### 3.4 Fat Skills, The Operator

GBrain은 "무엇을 아는가"가 아니라 "그것에 대해 무엇을 언제 해야 하는가"를 다룬다. 엔터프라이즈 제품이 아니라 OpenClaw, Hermes, Claude Code 같은 개인용 에이전트 위에서 실행되도록 만들어졌고, README의 문장은 "Your AI agent is smart but forgetful. GBrain gives it a brain"이다. Y Combinator CEO가 자기 에이전트를 운영하려고 만든 뒤 공개한 것이라 조직 배포가 아니라 한 명의 파워 유저 워크플로에 최적화되어 있다.

| 구성 요소 | 역할 |
|---|---|
| thin harness (약 200줄) | 모델 실행, 파일 읽기와 쓰기, 안전 강제 |
| fat skill (markdown) | 발동 시점, 확인 항목, 다른 스킬과의 연결, 품질 기준을 담은 전체 워크플로 |
| RESOLVER.md | always-on 스킬, brain 연산, 콘텐츠 ingest, thinking 스킬, 운영 작업, 셋업의 6개 범주로 라우팅 |
| cron | 스킬을 일정에 따라 자율 실행 |

resolver의 실제 동작은 스킬 설명 자체가 수행한다. 모델이 설명을 읽고 의도를 매칭하므로 명시적 라우팅 코드가 필요 없고, 추세는 좁은 스킬 다수 대신 분기 파라미터를 가진 더 적고 포괄적인 스킬로 가고 있다.

fat skill의 실물은 `enrich` 스킬의 frontmatter로 제시된다.

```yaml
name: enrich
version: 1.0.0
description: |
  Enrich brain pages with tiered enrichment protocol.
  Creates and updates person/company pages with compiled
  truth, timeline, and cross-links.
triggers:
  - "enrich"
  - "create person page"
  - "update company page"
  - "who is this person"
tools:
  - get_page
  - put_page
  - search
  - add_link
  - add_timeline_entry
mutating: true
writes_to:
  - people/
  - companies/
```

frontmatter 아래에는 7단계 enrichment 프로토콜이 이어지고 세 등급으로 실행 강도가 갈린다.

| 등급 | 대상 | 조사 범위 |
|---|---|---|
| inner-circle | 핵심 인맥 | 모든 API와 심층 웹 검색까지 전면 조사 |
| industry figures | 업계 인물 | 웹과 소셜에 brain 상호 참조를 더한 중간 수준 |
| tracking only | 추적 가치는 있으나 중요도가 낮은 대상 | 가벼운 처리 |

- **인용 규칙**: 모든 주장에 `[Source: ...]` 인라인 인용이 필수이고 우선순위는 사용자 진술, compiled truth, timeline entry, 외부 API 순이다. 철학 문장은 "Intelligence dossiers, not LinkedIn scrapes"다.
- **always-on signal-detector**: 모든 수신 메시지에서 본 응답과 병렬로 저비용 서브에이전트가 실행되어 original idea를 원문 표현 그대로 보존하고 entity mention을 포착한다. 검출된 entity는 기존 page에 연결되거나 새 page를 만든다. 원칙은 "An unlinked mention is a broken brain"이다.
- **function call과의 차이**: function call은 상태가 없어 실행하고 반환하면 잊는다. fat skill은 상태를 유지하고 품질 기준을 강제하며 다른 스킬과 연결되고 실행 후 brain을 더 풍부하게 남긴다.
- **cron 운영 규칙**: 잡 프롬프트는 "Read skills/{name}/SKILL.md and run it" 한 줄이다. 5분 시차 슬롯으로 충돌을 막고, 기본 23시부터 8시까지의 quiet hours를 지키며, idempotent를 강제해 같은 잡을 두 번 실행해도 중복 산출이 없다. 결과는 `reports/{job-name}/{YYYY-MM-DD-HHMM}.md`에 남는다.
- **cron 전형 구성**: 6시간마다 Hacker News 수집, 새로 언급된 entity의 일간 enrich, 포트폴리오 회사 지표의 주간 확인, 매주 월요일 아침 다이제스트 작성.
- **deterministic split**: 읽기와 합성, 패턴 인식은 모델이 맡고 SQL 질의, API 호출, 파일 연산, 계산은 결정적 코드가 맡는다.
- **약점 1, 엔지니어링 부담**: 24개 스킬 전부가 end-to-end 테스트, 평가, 단위 테스트로 검증되어 있어 주말 프로젝트가 아니라 코드베이스다.
- **약점 2, 개인 종속성**: Tan 개인의 사람과 회사, 발행 일정에 맞춰 만들어져 아키텍처는 이전 가능해도 구현은 그대로 쓸 수 없다. "You can't npm install someone else's brain".
- **약점 3, 단일 운영자 전제**: brain 저장소 17,888 페이지는 개인 시스템으로는 크지만 엔터프라이즈로는 작다. Postgres와 pgvector 백엔드가 더 확장될 수 있어도 스킬 구조가 전체를 이해하는 단일 운영자를 전제한다.
- **엔터프라이즈 적합 지점**: 조직 전체 배포가 아니라 특정 역할이다. 자율 조사 워크플로를 운영하는 시니어 애널리스트, 매일 경쟁 정보를 갱신받아야 하는 프로덕트 리드, 배포 상태를 감시하고 자율 에스컬레이션하는 에이전트를 둔 엔지니어링 매니저를 예로 든다.

**Verdict**: 지식이 자율 실행을 발동시켜야 하고, 스킬 계층에 엔지니어링을 투자할 의지가 있고, 한 명의 파워 유저가 팀을 위해 워크플로를 정의할 수 있을 때 쓴다. 조직 전체 접근이 필요하거나 팀이 스킬 코드베이스를 유지할 수 없으면 쓰지 않는다.

### 3.5 세 아키텍처 비교

저자는 이 아키텍처들이 경쟁하는 것이 아니라 같은 문제의 서로 다른 버전을 푼다고 본다. 원문의 표현은 "Picking between them is a design decision, not a loyalty test"다.

| 기준 | RAG | LLM Wiki | Fat Skills |
|---|---|---|---|
| 강점 | 규모 | 깊이 | 자율성 |
| 약점 | 깊이 | 규모 | 접근성 |
| 적정 규모 | 문서 10만 건 이상 | 원본 1,000건 미만 | 개인 범위, 17,888 페이지 |
| 학습과 누적 | 없음 | 있음, ingest마다 10~15 page 갱신 | 있음, 스킬 자체가 능력을 누적 |
| 자율 실행 | 없음 | 없음, 수동적 | 있음, cron과 always-on 스킬 |
| 성숙도 | 매우 높음 | 신생 | 신생, 1인 운영 전제 |
| 규제 대응 | 감사 가능성이 강점 | 파생물이 보존과 감사 대상이 될 수 있음 | 자료에 언급 없음 |
| 도입 비용 | 즉시 출시 가능 | ingest마다 모델 비용 | 테스트와 평가를 갖춘 코드베이스 필요 |

선택의 출발점은 하나의 질문이다.

| 에이전트의 일 | 상황 | 선택 |
|---|---|---|
| 대규모 코퍼스에서 답을 retrieve | 문서가 수천 건이고 정기적으로 바뀌며 사용자가 빠른 답을 원한다 | RAG. reranker를 붙이면 knowledge assistant 사용 사례의 80%를 덮는다 |
| 누적되는 전문성을 compile | 논문, 규제 서류, 경쟁사 분석, 기술 명세 수백 건. 가치가 문서 사이의 연결에 있다 | LLM Wiki. 100번째 질의가 첫 번째보다 확실히 나아지며 이는 RAG가 약속할 수 없는 것이다 |
| 묻지 않아도 실행 | 감시, 표시, enrich, 실행을 원하고 잠든 사이에도 작업이 진행되기를 원한다 | Fat skills. 다만 엔지니어링 예산을 함께 잡아야 한다 |

### 3.6 hybrid 수렴 전망

가장 유능한 아키텍처는 셋을 결합해 RAG가 retrieval 계층에서 대규모로 찾고, wiki가 합성 계층에서 지속 지식으로 컴파일하고, 스킬이 실행 계층에서 자율 워크플로로 만든다. 근거로 드는 신호는 네 가지다.

- Karpathy LLM Wiki v2의 커뮤니티 확장판이 컴파일된 wiki 위에 retrieval 레이어를 추가하고 있다.
- GBrain 스킬은 이미 Postgres와 pgvector 백엔드에 질의한다.
- Neo4j 같은 엔터프라이즈 플랫폼이 graph database, vector search, semantic reasoning을 단일 access point로 묶고 있다.
- Claude Code가 CLAUDE.md는 mini-wiki, auto-memory는 복리 누적, 스킬은 실행으로 세 패턴을 이미 갖추고 있다.

저자는 데이터베이스가 SQL과 NoSQL 선택에서 둘 다 처리하는 hybrid로 진화한 것과 같은 경로를 예상한다. 글 마지막에는 시작 경로가 제시된다. RAG는 LangChain의 RAG 튜토리얼이 가장 빠른 길이고, LLM Wiki는 Karpathy의 gist가 오늘 바로 Claude나 GPT에 적용 가능한 200줄 schema이며, fat skills는 GBrain 저장소에서 코드보다 RESOLVER.md와 THIN_HARNESS_FAT_SKILLS.md를 먼저 읽으라고 권한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

이 글은 자체 실험이 없는 아키텍처 에세이이며 정량 벤치마크를 제시하지 않는다. 본문에 인용된 수치는 다음과 같다.

| 항목 | 수치 | 문맥 |
|---|---|---|
| Karpathy gist 반응 | 며칠 만에 star 5,000개 | 글 게시 약 3주 전 공개 |
| GBrain 규모 | 자율 스킬 24개, cron job 21개, 페이지 17,888개 | Tan 본인의 brain, 인용 시점 2026-04-27 |
| context window 성능 저하 시작 | 100만 토큰 한도에서 30만에서 40만 토큰, 한도의 30~40% | 세션 종료 시 전부 초기화 |
| RAG 실패 지점 | 2024년 논문이 7개 매핑, 그중 3개는 모델이 컨텍스트를 보기 전에 발생 | 에이전트에 치명적인 3개는 chunking, re-derivation, passivity |
| chunking 예시 규모 | 30페이지 명세가 500토큰 조각으로 분할 | 요구사항과 그 이유가 다른 벡터로 분리 |
| RAG 지연 누적 | tool call 40회 루프에서 밀리초가 초 단위로 누적 | 임베딩, vector search, reranking, 컨텍스트 패키징 다단계 |
| LLM Wiki 복리 누적 | ingest 1회당 wiki page 10~15개 갱신 | 상호 참조, 모순 표시, entity 갱신 |
| LLM Wiki 규모 한계 | 원본 100건에 page 수백 개는 정상, 1만 건에서 탐색 붕괴, 10만 건에서 RAG 회귀 | BM25와 grep 기반 탐색 |
| GBrain harness | 약 200줄 | 스킬 24개는 end-to-end, 평가, 단위 테스트 전부 보유 |
| GBrain cron | 5분 시차 슬롯, quiet hours 기본 23시부터 8시 | idempotent 강제, 결과는 `reports/{job-name}/{YYYY-MM-DD-HHMM}.md` |
| RAG 적정 규모 예시 | 내부 문서 20만 건 인덱싱 후 당일 질의 시작 | 정책, 메모, 명세, Slack 내보내기 포함 |
| LLM Wiki 적합과 부적합 예시 | 원본 200건 규제 추적 팀은 적합, Confluence page 50만 개는 부적합 | 저자가 든 엔터프라이즈 판단 기준 |
| reranker 효과 주장 | knowledge assistant 사용 사례의 80% 커버 | RAG에 reranker를 결합했을 때, 근거 자료는 제시하지 않음 |

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **정량 비교 부재**: 같은 코퍼스에 RAG, LLM Wiki, fat skills를 올려 R@5, 지연 시간, 비용으로 견준 자료가 없다. 결정 프레임워크 수준의 안내에 머문다.
- **핵심 수치의 출처 미표기**: 2024년 RAG 7-failure-point 논문의 저자, 제목, URL이 없다. context window 성능 저하가 30~40% 지점에서 시작한다는 수치도 출처를 밝히지 않는다. "reranker를 붙이면 80%를 덮는다"는 주장도 근거 없이 제시된다.
- **수렴 신호의 링크 부재**: "Karpathy LLM Wiki v2 community extensions"를 거론하면서 구체 저장소 링크를 달지 않는다.
- **GBrain 수치의 시점 문제**: 글이 적은 스킬 24개, cron job 21개, 페이지 17,888개는 2026-04-27 시점 값이다. 본 wiki가 보유한 [[applications/garrytan-gbrain]] README(2026-05-22 clone)는 curated skill 43개, 페이지 146,646개, 인물 24,585명, 회사 5,339개, cron job 66개를 적고 있다. 약 한 달 사이에 규모가 크게 늘었을 수도 있고 active와 shipped의 정의 차이일 수도 있다. 수치가 다른 자료를 대조할 때는 시점 차이를 함께 확인해야 한다.
- **인접 플랫폼 미상술**: OpenClaw, Hermes, Claude Code가 GBrain의 1차 소비자로 호명되지만 세 플랫폼 자체는 깊이 다루지 않는다.
- **엔터프라이즈 대안 누락**: Mem0, Zep, Letta, DevRev Computer Memory 같은 상용 메모리 계층이 세 유형 분류에 들어가지 않는다.
- **fat skills의 규제 대응 미검토**: RAG와 LLM Wiki에 대해서는 감사와 거버넌스를 논하지만 fat skills의 규제 대응은 다루지 않는다.
- **도식 유실**: 본문에 저자가 그린 도식 10개가 삽입되어 있으나 수집본에는 캡션 줄만 남아 있어 시각 자료를 인용할 수 없다.

## 6. 관련 연구 (Related Work)

- [[applications/garrytan-gbrain]]: 본 글이 묘사하는 GBrain의 1차 자료다. 본 글이 `enrich` 스킬의 YAML frontmatter를 직접 인용해 대조 검증이 가능하다.
- [[applications/kmyu-2026-akb-llmwiki-gbrain-comparison]]: AKB, llmwiki, GBrain을 6개 운영 항목으로 비교한 국내 전략 보고서다. 본 글과 대상은 겹치지만 관점이 다르며, 본 글은 아키텍처 선택 기준을, 이 보고서는 제품 포지셔닝을 다룬다.
- [[applications/gajjar-2026-gbrain-vs-computer-memory]]: 같은 복리 누적 명제를 엔터프라이즈 관점에서 보완한다.
- [[applications/vectorize-2026-gbrain-review-honest-assessment]]: "skills as code, not config" 평가가 본 글의 fat skills 분석과 같은 설계 통찰을 다른 각도에서 진술한다.
- [[applications/mantena-2026-hermes-gbrain-setup-vps]]: 본 글이 거론한 "can't npm install someone else's brain" 한계의 실전 우회를 보여준다.
- [[applications/techwealth-hub-2026-garry-tan-gbrain-explained]]: 영상의 brain agent loop 정의를 본 글의 signal-detector 원칙과 묶어 읽을 수 있다.
- [[applications/datasciencedojo-2026-llm-wiki-by-andrej-karpathy]]: 본 글이 요약만 한 Karpathy LLM Wiki 패턴을 6단계 실습 가이드로 풀어쓴 입문 자료다.
- [[applications/kmyu-2026-llm-wiki-pattern-synthesis]]: LLM Wiki 패턴의 한국어 종합 정리로, 본 글의 규모 천장 주장과 대조할 수 있다.
- [[overviews/gbrain-ecosystem-overview]]: 본 글이 여섯 번째 자료로 합류해 Medium 계열 미수집 항목을 해소한다.
- [[database/li-2026-beyond-semantic-similarity-rethinking-retrieval]]: DCI는 인덱스 자체를 부정하는 방향의 RAG 비판이고, 본 글은 RAG를 retrieval 계층으로 유지하면서 wiki와 스킬을 더하는 방향이다.
- [[database/vectifyai-pageindex]]: vectorless reasoning 기반 RAG로, 본 글이 말한 "LLM Wiki에 retrieval을 더한" hybrid의 한 구현으로 볼 수 있다.
- [[overviews/lightrag-family-graph-rag-overview]]: 본 글이 거론한 "graph와 vector와 semantic을 단일 access point로" 수렴 흐름의 한 계열이다.

## 7. 용어집 (Glossary)

- **The Retriever / The Compiler / The Operator**: Liu가 세 아키텍처에 붙인 별칭이다. 각각 RAG, LLM Wiki, fat skills(GBrain)에 대응한다.
- **retrieve, compile, act**: 같은 세 유형을 동사로 표현한 것이며 2026년 수렴 명제의 대상이다.
- **chunking problem**: 하나의 문서가 조각나면서 관련 정보가 서로 다른 벡터로 흩어져 검색기가 일부만 찾는 실패다.
- **re-derivation problem**: 모든 질의가 처음부터 다시 도출하며 이전 작업이 누적되지 않는 실패다.
- **passivity problem**: 물어볼 때까지 기다리고 모순이나 변화를 스스로 알아채지 않는 실패다.
- **knowledge gap**: context window와 지속 지식 사이의 간극이다. 100만 토큰 모델도 30~40% 지점에서 성능이 떨어지고 세션 종료 시 초기화되므로 context window는 메모리가 아니다.
- **lint workflow**: 모델이 wiki 전체를 주기적으로 감사해 orphan page, 오래된 주장, 미생성 개념 page를 찾는 유지보수 루프다.
- **thin harness, fat skills**: GBrain의 설계 역전이다. harness는 약 200줄로 얇게 두고 지능은 전부 markdown 스킬에 둔다.
- **resolver as skill description**: 명시적 라우팅 코드 없이 스킬 설명 자체가 dispatcher 역할을 한다는 관찰이다.
- **always-on signal-detector**: 모든 수신 메시지에 병렬로 붙는 저비용 서브에이전트로, original idea를 그대로 보존하고 entity mention을 포착한다. 원칙은 "An unlinked mention is a broken brain"이다.
- **tiered enrichment**: inner-circle, industry figures, tracking only의 3등급으로 조사 강도를 나누는 프로토콜이다. Liu는 등급을 관계의 깊이로 정의하는데, 본 wiki가 보유한 [[applications/garrytan-gbrain]] README에는 등급 판정 기준이 명시되어 있지 않다.
- **latent work와 deterministic work**: 전자는 읽기, 합성, 패턴 인식으로 모델이 맡고 후자는 데이터베이스 쓰기, 계산, 재현 가능한 산출로 코드가 맡는다. 섞으면 환각이 발생한다는 것이 GBrain의 전제다.
- **knowledge operating system**: retrieve, compile, act를 단일 시스템으로 통합한 형태를 가리키는 Liu의 2026년 예측이다.
