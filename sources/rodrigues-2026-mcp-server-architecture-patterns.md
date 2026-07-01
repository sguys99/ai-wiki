---
title: "MCP Server Architecture Patterns for LLM-Integrated Applications"
type: paper
year: 2026
category: agents
raw_path: /home/sguys99/project/ai-wiki/raw/papers/rodrigues-2026-mcp-server-architecture-patterns.pdf
raw_filename: "rodrigues-2026-mcp-server-architecture-patterns.pdf"
source_collection: external
authors: "Carson Rodrigues, Oysturn Vas"
arxiv_id: "2606.30317"
tags:
  - mcp
  - model-context-protocol
  - tool-use
  - software-architecture
  - design-patterns
  - anti-patterns
  - tool-selection
  - llm-integration
  - agents
figures:
  - id: fig01
    file: assets/rodrigues-2026-mcp-server-architecture-patterns/fig01.png
    raw: raw/papers/rodrigues-2026-mcp-server-architecture-patterns-figures/fig01.png
    caption: "Fig. 1: MCP 전송 지연 (p50/p95/p99, 로그 스케일) — stdio/loopback은 측정값, cross-host 3행은 network-RTT 캘리브레이션 모델값"
    page: 6
    strategy: page-region
    curated: true
  - id: fig02
    file: assets/rodrigues-2026-mcp-server-architecture-patterns/fig02.png
    raw: raw/papers/rodrigues-2026-mcp-server-architecture-patterns-figures/fig02.png
    caption: "Fig. 2: context 내 tool 수 vs. 선택 정확도·지연 (Haiku 4.5 / Sonnet 4, 버킷당 N=200, ANSYR 프로덕션 로그). 음영은 권장 범위(≤10 tools)"
    page: 6
    strategy: page-region
    curated: true
---

## 한 줄 요약 (One-line Summary)

프로덕션 MCP 서버 15개를 코딩(qualitative coding)해 되풀이되는 **5개 아키텍처 패턴**(Resource Gateway · Tool Orchestrator · Stateful Session Server · Proxy Aggregator · Domain-Specific Adapter)과 **4개 anti-pattern**을 GoF 형식으로 카탈로그화하고, "LLM이 자연어 설명을 읽고 tool을 고른다"는 제약이 만들어내는 핵심 실무 한계 — **context당 10~15개 tool을 넘으면 선택 정확도가 90% 아래로 떨어진다** — 를 프로덕션 텔레메트리로 계측한 산업 경험 논문(industry experience paper).

## 1. 자료 정보 (Document Information)

- **제목**: MCP Server Architecture Patterns for LLM-Integrated Applications
- **저자**: Carson Rodrigues (Celabe), Oysturn Vas (University of Waterloo)
- **발표**: arXiv:2606.30317v1 [cs.SE], 2026-06-29. ICSME 2026 Industry Track 대상 원고
- **유형**: Industry experience paper (설계 패턴 카탈로그 + 정량 평가)
- **코퍼스**: 독립 개발된 MCP 서버 15개 — Celabe의 ANSYR 음성 AI 플랫폼 프로덕션 서버 5개(Server-A~E, 익명화) + 공식 `modelcontextprotocol/servers` 레지스트리 공개 서버 10개
- **재현 패키지**: https://github.com/rodriguescarson/mcp-patterns-icsme2026 (MIT). corpus.json, 54-서버 신뢰도 코퍼스, kappa_eval.py, transport_bench.py, 분류 프롬프트, tool_count_telemetry.csv 포함
- **AI 공개**: Sonnet 4.6이 집필·편집 보조. Haiku 4.5(claude-haiku-4-5-20251001)와 Sonnet 4는 신뢰도 실험의 **rater 피험자**. 저작권 수준의 지적 기여(연구 질문·패턴 정의·주장)는 AI 없음, 그림도 AI 미생성

**MCP 배경**: MCP(2024-11 Anthropic 발표)는 JSON-RPC 2.0 위에서 3개 primitive를 정의한다 — **Tools**(이름·자연어 설명·JSON Schema를 가진 호출 가능 함수), **Resources**(LLM이 읽는 URI 주소 엔드포인트, 정적/동적), **Prompts**(서버측 파라미터화 템플릿). 전송(transport)은 로컬 in-process용 **stdio**와 원격용 **streamable-http**(HTTP + 선택적 SSE) 2종이다. 저자들은 MCP를 **LSP(Language Server Protocol)** 에 빗댄다 — 에디터와 언어지능을 표준화해 재사용했듯, MCP는 에이전트와 능력 제공자를 디커플링한다.

## 2. 주요 기여 (Key Contributions)

1. **5개 서버측 아키텍처 패턴** 카탈로그 (GoF의 context/problem/solution/consequences/known-uses 형식). 각 패턴은 고전 조상(Repository, Facade, Session, Proxy, Adapter)을 갖되, 기여점은 **LLM-client delta**다 (Table I).
2. **4개 anti-pattern** (God Tool · Unsanitized Resource Content · Synchronous Long-Running Operations · Missing/Vague Tool Descriptions) — 각각 "구체적·반복되는 실패 모드 + 알려진 수정"의 단위.
3. **3개 정량 측정**: (a) 분류 taxonomy의 rater 간 신뢰도(Cohen's κ=0.76, 54 held-out 서버, 2 LLM rater), 3개 경계 모호성 국소화; (b) 전송 지연 벤치마크(측정 2행 + 모델 3행); (c) **tool 수 vs. 선택 정확도** 관찰 연구 — 실무 정확도 예산을 ≈10~15 tool로 지목.
4. **cross-cutting concern** 정리: 인증·에러 핸들링·버전관리·관찰가능성(observability).

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 코딩 프로토콜 (Coding Protocol)

서버마다 고정된 소스(공개는 GitHub 소스·README·문서, 프로덕션은 소스·배포설정)에서 5개 artifact를 추출한다: (i) tool/resource/prompt 등록(`setRequestHandler` 호출과 JSON schema), (ii) 전송 설정, (iii) 서버측 세션/상태 처리, (iv) 다른 MCP 서버로의 위임, (v) 도메인 검증·비즈니스 로직. **README 산문만 신뢰하지 않는다** (구조적 결정을 자주 누락하기 때문). 질적 코딩은 2주기(Saldaña)로 진행한다 — 1차 open coding, 2차 pattern coding. 후보는 **최소 2개 서버에서 독립적으로 등장**하고 기존 해법이 없는 문제를 다룰 때만 카탈로그로 승격한다. 2저자가 독립 검증하되, dual coding이 아닌 verification pass이므로 신뢰도는 §VI-A에서 별도 held-out으로 측정한다.

### 5개 패턴 (Five Patterns)

| # | 패턴 | 고전 조상 | LLM-client delta | 문제 → 해법 요지 | Known Uses |
|---|---|---|---|---|---|
| 1 | **Resource Gateway** (Data Facade) | Repository / REST | LLM 검색용으로 명명된 resource | 백엔드 데이터를 queryable하게 노출하되 prompt injection 방어. read는 Resources(list/get), 안전치 않은 파라미터 질의는 Tools. **sanitization layer**를 반드시 삽입 | DB 커넥터(PostgreSQL, MongoDB), 문서스토어(Notion, Drive), REST 래퍼(GitHub, Jira, Linear) |
| 2 | **Tool Orchestrator** (Action Hub) | Facade / Mediator | 선택 정확도에 맞춘 tool 집합 크기 | 다중 시스템 워크플로를 LLM이 각 API를 몰라도 되게. **composite tool** 하나가 내부에서 모든 sub-call 수행 후 단일 요약 반환 | CI/CD 자동화, DevOps 워크플로, 고객지원 액션허브 |
| 3 | **Stateful Session Server** | Session / Memento | 상태가 prompt에 없이 암묵적 | stateless request-response인 tool 호출 사이에 상태 유지. 연결 시 session ID 생성 → 모든 응답에 포함, 이후 호출이 이를 운반. 서버가 per-session 컨텍스트를 메모리/Redis 보관, 비활성 시 만료 | 코드 편집 에이전트(open→edit→save), DB 트랜잭션, 다단계 폼 |
| 4 | **Proxy Aggregator** (MCP Router) | Proxy / API gateway | context에 맞춰 tool 분할 | 다수 upstream MCP 서버를 단일 엔드포인트로. tool 이름을 서버별 **namespace**로 접두(`github__create_pr`)해 충돌 방지·라우팅. 2변형: **static-merge**(전체 union 노출 → tool 수 증가로 정확도 저하) vs **scoped**(요청별 관련 subset만 검색, retrieval-over-tools) | 엔터프라이즈 MCP 게이트웨이, 개발자 플랫폼 aggregator, 멀티도메인 어시스턴트 백엔드 |
| 5 | **Domain-Specific Adapter** (Semantic Layer) | Adapter (GoF) | 검증을 자연어 guardrail로 | LLM-hostile API(기계식 ID·저수준 op·복잡 인증)를 정확히 사용 가능하게 번역. 사람이 읽는 tool 설명 + 입력 정규화(자연어 날짜·이름·fuzzy ID) + 출력 강화(ID→표시명) + 에러 번역(코드→평문) | CRM 어댑터(Salesforce, HubSpot), 금융 데이터, 헬스케어 레코드 |

### 4개 anti-pattern

- **The God Tool**: `do_anything(action, params)`처럼 크고 미분화된 단일 schema → tool 선택 정확도 붕괴. **수정: 분해** — 각 op에 정밀한 이름·schema·설명.
- **Unsanitized Resource Content**: 사용자 생성 콘텐츠(댓글·문서·폼)를 sanitize 없이 resource 응답에 반환 → "Ignore previous instructions…"가 데이터가 아닌 명령으로 처리됨. **수정: 외부 콘텐츠는 MCP 응답 진입 전 sanitize.**
- **Synchronous Long-Running Operations**: 수 초 이상 걸리는 op(영상 인코딩 등)를 동기 tool로 노출 → client timeout(MCP는 async 콜백 없음). **수정: job ID 동기 반환 + 별도 `poll_job(id)`.**
- **Missing or Vague Tool Descriptions**: 설명 없음/이름만 재진술. LLM은 schema가 아니라 **설명을 읽고** tool을 고른다. **수정: 무엇을·언제·무엇을 반환하는지 처음 보는 사람에게 설명하듯.**

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### (A) 분류 신뢰도 (§VI-A)

54개 held-out 서버에 **architecture-neutral**(아키텍처명을 안 밝히는 중립·기능 중심) 설명을 붙여 2 rater(Haiku 4.5, Sonnet 4, temp=0)가 분류. **rater 간 κ=0.76** (95% CI [0.62, 0.88], raw agreement 81.5%) — "substantial". 단, 저자 의도 라벨과의 일치는 68.5%(Haiku)·75.9%(Sonnet)로 더 낮고, 불일치가 **3개 경계에 체계적으로 집중**된다:
1. **Statefulness는 기능에서 안 보임**: 모든 stateful 서버(git, puppeteer, playwright…)가 Tool Orchestrator로 읽힘.
2. **Domain logic은 안 보임**: 도메인 어댑터(kubernetes, salesforce, shopify, fhir)가 Tool Orchestrator/Resource Gateway로 갈림.
3. **read-style tool은 gateway를 닮음**: 검색 지향 orchestrator(sentry, notion)가 Resource Gateway로 재분류.
> 아키텍처명을 밝힌 canonical 설명 파일럿은 97%를 기록했으나, 이는 taxonomy가 아니라 설명 문구를 측정한 것. → **statefulness·domain-logic을 상호배타 카테고리가 아닌 cross-cutting 속성으로 취급**하고, 패턴 배정은 capability list가 아닌 **구현 신호**에 근거하라고 권고.

### (B) 전송 지연 (§VI-B, Table III / Fig. 1)

| Transport | Method | p50 | p95 | p99 |
|---|---|---|---|---|
| stdio (local) | measured | 0.01 ms | 0.02 ms | 0.02 ms |
| streamable-http (loopback) | measured | 0.39 ms | 0.45 ms | 0.48 ms |
| streamable-http (same-region remote) | modeled | 30.4 ms | 80.4 ms | 180.4 ms |
| Stateful Session Server (remote) | modeled | 38.4 ms | 100.4 ms | 216.4 ms |
| Proxy Aggregator (remote, single hop) | modeled | 62.4 ms | 160.4 ms | 308.4 ms |

측정 2행(loopback echo 서버, N=100+10 warm-up) + 모델 3행(loopback 오버헤드 + 문서화된 same-region network-RTT 상수 ≈30/80/180 ms). **핵심 발견: 전송 오버헤드는 프로토콜 계층이 아니라 network RTT가 지배한다.** in-host 전송(stdio, loopback http)은 1 ms 미만이고, stdio와 streamable-http의 격차는 실재하나 호스트 경계를 넘는 순간 무의미해진다(RTT가 2~3 orders 크므로). 따라서 아키텍처상 중요한 선택은 전송 인코딩이 아니라 (a) 서버가 client와 **co-located인가**, (b) downstream fan-out(Proxy Aggregator)이 **network hop을 추가하는가**다.

### (C) tool 수 vs. 정확도 (§VI-C, Fig. 2) — 논문의 headline 실무 결과

ANSYR 프로덕션 텔레메트리(Q1 2025)의 **관찰 데이터**. tool-count 버킷 b∈{1,3,5,10,15,20,30,50}마다 200 세션 턴, ground truth는 사후 품질 리뷰에서 운영자가 확인한 정답 tool. Wilson 95% CI는 ±4%p 이내.
- **Haiku 4.5**: 10~15 tool 사이에서 90% 아래로 하락 (10개 91%, 15개 87%). 10 tool에서 91% @ median 245 ms.
- **Sonnet 4**: 20 tool까지 ≥90% 유지, 30개에서 하락. 10 tool에서 95% @ 410 ms.
- **함의**: 단일 MCP 서버가 ≈10~15 tool을 넘으면 **scoped Proxy Aggregator**(per-context 필터링 = retrieval-over-tools)로 tool 공간을 분할해 관련 subset만 노출하라. static merge는 문제를 악화시키니, 완화책은 aggregation 자체가 아니라 **선택적 노출**이다.
- 더 큰 규모의 선행연구와도 정합한다: Gan & Sun(RAG-MCP)은 ≈30 후보까지 90%↑, ≈100 넘으면 급락. Kate et al.(LongFuncEval)은 카탈로그 증가 시 7~85% 정확도 하락. 본 논문은 latency-제약 음성 배포에서 **하락이 시작되는 지점**을 국소화한다.

### Cross-Cutting Concerns (§VII)

- **인증**: streamable-http는 Bearer 토큰 지원. **tool 핸들러가 아닌 전송 계층에서 인증**, 토큰을 특정 tool 집합으로 스코핑, 모든 호출을 caller identity와 로깅.
- **에러 핸들링**: 예외 throw보다 **structured error content** 반환 → LLM이 에러를 보고 재시도·에스컬레이션 판단.
- **버전관리**: `initialize` 응답에 version 필드. tool schema breaking change는 major 증가, 마이그레이션 창 동안 구 schema 유지.
- **관찰가능성**: tool 호출마다 이름·입력 해시·지연·출력 크기·에러코드 로깅 — LLM 오작동 디버깅의 주 표면.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **파생 코퍼스가 작음**: 한 조직 15개 서버 + 공개 레지스트리. Guo et al.이 카탈로그한 >8,000개 규모의 층화 복제는 미수행.
- **단일 코더 open coding + 2차 검증** (독립 dual coding 아님). held-out κ 실험으로 완화하나, 파생 코퍼스의 완전 독립 dual coding은 미래 과제로 남는다.
- **분류 코퍼스는 서버 설명(synthetic/real-derived)** 이지 실행 중 서버 자체가 아님 → 프로덕션 서버 분류 정확도는 다를 수 있음.
- **전송 표 5행 중 3행이 모델값**(측정 아님). 행별로 명시 라벨. cross-region·혼잡 경로는 절대값이 크게 달라진다(상대 순서는 더 안정적).
- **외적 타당성**: ANSYR 5개 서버가 단일 도메인(음성 AI, 단일 산업). 운영 프로파일이 다른 도메인에선 패턴이 달라질 수 있다.
- **두 rater 모두 LLM** → 공유 blind spot 가능. 독립 human dual-coding, 2개 Claude 모델을 넘는 multi-model rater 패널, 패턴 선택과 측정 지연·신뢰도를 잇는 예측 연구가 향후 과제다.
- **이해상충**: 1저자 Carson Rodrigues는 Celabe(ANSYR 운영사) 소속. 2저자는 상업적 무관계. 코퍼스는 5 프로덕션+10 공개로 균형을 맞췄고, 분류 실험엔 프로덕션 텔레메트리를 넣지 않았다.

## 6. 관련 연구 (Related Work)

- **함수 호출 계보**: OpenAI/Anthropic function calling → MCP는 tool **구현을 LLM에서 분리**. 가장 명료한 유비는 **LSP**(에디터↔언어지능 표준화).
- **패턴 방법론**: Gamma et al.(GoF), Fowler(엔터프라이즈 앱 패턴), Hohpe & Woolf(통합 패턴)의 구조화 서술 형식 차용.
- **LLM tool use / 에이전트**: ToolBench류 벤치마크, ReAct, AutoGPT, LangChain, computer-use — 이들은 **client측**(어떤 tool을 부를지)에 집중한다. MCP는 **server측**(능력 카탈로그를 어떻게 구조화·명명·그룹화)으로 초점을 옮긴다.
- **MCP 자체 연구(직교)**: Hou et al.(보안 위협 서베이), Hasan et al.(공개 서버의 보안·유지보수성 smell 마이닝 — 본 논문 anti-pattern과 상보), Guo et al.(>8,000 서버 규모 측정).
- **tool 수 완화**: Gan & Sun(RAG-MCP, retrieval-augmented tool 선택), Kate et al.(LongFuncEval).

## 7. 용어집 (Glossary)

- **MCP (Model Context Protocol)**: LLM을 외부 tool·데이터·서비스에 연결하는 JSON-RPC 2.0 기반 client-server 표준. Tools/Resources/Prompts 3 primitive.
- **Tool / Resource / Prompt**: MCP의 3 primitive. 각각 호출 함수 / URI 주소 읽기 엔드포인트 / 서버측 템플릿.
- **stdio vs streamable-http**: 로컬 in-process 전송 vs HTTP(+SSE) 원격 전송.
- **retrieval-over-tools**: 전체 tool을 나열하지 않고 요청별로 관련 tool 후보만 검색·노출하는 기법 (scoped Proxy Aggregator의 핵심).
- **LLM-client delta**: 고전 패턴 대비 "LLM이 자연어 설명을 읽고 op를 고른다"는 제약이 추가로 만들어내는 차이 — 이 논문의 기여 단위.
- **Cohen's κ**: rater 간 일치도를 우연 일치 보정해 측정하는 지표. 0.76 = "substantial".
- **God Tool**: 하나의 tool이 거대·미분화 schema를 받아 LLM이 "action" 의미를 추론해야 하는 anti-pattern.
- **sanitization layer**: 백엔드/외부 콘텐츠의 주입 명령을 LLM 도달 전 제거·이스케이프하는 계층 (prompt injection 방어).

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 6 | "MCP 전송 지연 (p50/p95/p99, 로그 스케일) — 측정 2행 + 모델 3행" | page-region | ★ wiki 권장 (result — network RTT가 지배) |
| fig02 | 6 | "tool 수 vs. 선택 정확도·지연 (Haiku 4.5 / Sonnet 4). 음영 = 권장 ≤10 tools" | page-region | ★★ wiki 강력 권장 (headline 결과 — 10~15 tool 예산) |

> 표(Table I 패턴↔조상, Table II 15-서버 코퍼스, Table III 전송 지연)는 이미지가 아닌 **본문 markdown 표**로 재현하는 편이 RAG·가독성에 유리 → 위 §3·§4에 포함. 코드 Listing 1~4는 패턴별 핵심 스니펫이므로 wiki에는 요지만 서술.

