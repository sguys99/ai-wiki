---
title: "MCP Server Architecture Patterns for LLM-Integrated Applications"
type: paper
year: 2026
category: agents
source: rodrigues-2026-mcp-server-architecture-patterns.md
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
    label: Figure 1
    kind: figure
    file: assets/rodrigues-2026-mcp-server-architecture-patterns/fig01.png
    raw: raw/papers/rodrigues-2026-mcp-server-architecture-patterns-figures/fig01.png
    caption: "Fig. 1: MCP 전송 지연 (p50/p95/p99, 로그 스케일) — stdio/loopback은 측정값, cross-host 3행은 network-RTT 캘리브레이션 모델값"
    page: 6
    bbox_norm: [0.5, 0.0562, 0.9298, 0.2129]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/rodrigues-2026-mcp-server-architecture-patterns/fig02.png
    raw: raw/papers/rodrigues-2026-mcp-server-architecture-patterns-figures/fig02.png
    caption: "Fig. 2: context 내 tool 수 vs. 선택 정확도·지연 (Haiku 4.5 / Sonnet 4, 버킷당 N=200, ANSYR 프로덕션 로그). 음영은 권장 범위(≤10 tools)"
    page: 6
    bbox_norm: [0.5, 0.2508, 0.9298, 0.3853]
    strategy: caption-region
    curated: true
  - id: tab01
    label: Table I
    kind: table
    file: assets/rodrigues-2026-mcp-server-architecture-patterns/tab01.png
    raw: raw/papers/rodrigues-2026-mcp-server-architecture-patterns-figures/tab01.png
    caption: "TABLE I E ACH MCP PATTERN HAS A CLASSICAL ANCESTOR ; THE CONTRIBUTION"
    page: 2
    bbox_norm: [0.0702, 0.1033, 0.9288, 0.4651]
    strategy: table-region
    curated: false
  - id: tab02
    label: Table II
    kind: table
    file: assets/rodrigues-2026-mcp-server-architecture-patterns/tab02.png
    raw: raw/papers/rodrigues-2026-mcp-server-architecture-patterns-figures/tab02.png
    caption: "TABLE II E NUMERATED CORPUS OF FIFTEEN MCP SERVERS USED TO DERIVE THE"
    page: 2
    bbox_norm: [0.5009, 0.1163, 0.9288, 0.4651]
    strategy: table-region
    curated: false
  - id: tab03
    label: Table III
    kind: table
    file: assets/rodrigues-2026-mcp-server-architecture-patterns/tab03.png
    raw: raw/papers/rodrigues-2026-mcp-server-architecture-patterns-figures/tab03.png
    caption: "TABLE III MCP T RANSPORT L ATENCY . R OWS LABELLED measured ARE END - TO - END LOOPBACK MEASUREMENTS (N = 100 CALLS + 10 WARM - UP ). R OWS LABELLED modeled ARE LOOPBACK OVERHEAD PLUS A"
    page: 6
    bbox_norm: [0.0774, 0.101, 0.926, 0.178]
    strategy: table-region
    curated: false
---

## 요약 (Summary)

프로덕션에 올라간 MCP 서버 15개(Celabe의 ANSYR 음성 AI 서버 5개 + 공식 레지스트리 공개 서버 10개)를 질적 코딩해, 되풀이되는 **서버측 아키텍처 패턴 5개**와 **anti-pattern 4개**를 GoF 형식으로 정리한 산업 경험 논문이다. 각 패턴은 Repository·Facade·Session·Proxy·Adapter 같은 고전 조상을 갖지만, 저자들이 기여점으로 꼽는 것은 **LLM-client delta** — "클라이언트가 문서를 읽는 대신 tool의 자연어 설명을 읽고 무엇을 호출할지 고른다"는 제약이 만들어내는 차이다.

이 제약에서 논문의 headline 실무 결과가 나온다. 단일 context에 노출한 tool이 **약 10~15개를 넘어서면 tool 선택 정확도가 90% 아래로 떨어진다** (Haiku 4.5). 그래서 tool 설명은 나중에 붙이는 주석이 아니라, tool이 제대로 쓰일지를 좌우하는 load-bearing 산출물이다.

## 5개 아키텍처 패턴 (Five Patterns)

각 패턴은 고전 설계 패턴을 조상으로 두되, LLM 클라이언트라는 제약 아래에서 형태가 달라진다.

| # | 패턴 | 고전 조상 | 핵심 문제 → 해법 | 대표 사례 |
|---|---|---|---|---|
| 1 | **Resource Gateway** | Repository / REST | 백엔드 데이터를 queryable하게 노출하되 prompt injection을 막는다. read는 Resources(list/get), 위험한 파라미터 질의는 Tools로. **sanitization layer** 필수 | PostgreSQL·MongoDB 커넥터, Notion·Drive 브리지, GitHub·Jira 래퍼 |
| 2 | **Tool Orchestrator** | Facade / Mediator | 다중 시스템 워크플로를 LLM이 각 API를 몰라도 쓰게 한다. **composite tool** 하나가 내부에서 모든 sub-call을 처리하고 단일 요약만 반환 | CI/CD·DevOps 자동화, 고객지원 액션허브 |
| 3 | **Stateful Session Server** | Session / Memento | stateless한 tool 호출 사이에 상태를 잇는다. 연결 시 session ID를 만들어 모든 응답에 실어 보내고, 서버가 per-session 컨텍스트를 메모리/Redis에 보관 | 코드 편집 에이전트(open→edit→save), DB 트랜잭션, 다단계 폼 |
| 4 | **Proxy Aggregator** | Proxy / API gateway | 여러 upstream 서버를 단일 엔드포인트로 묶되 서버별 정체성을 잃지 않는다. tool 이름을 **namespace**로 접두(`github__create_pr`)해 라우팅 | 엔터프라이즈 MCP 게이트웨이, 멀티도메인 어시스턴트 백엔드 |
| 5 | **Domain-Specific Adapter** | Adapter (GoF) | LLM-hostile API(기계식 ID·저수준 op·복잡 인증)를 정확히 쓸 수 있게 번역한다. 사람이 읽는 설명 + 입력 정규화 + 출력 강화(ID→표시명) + 에러 번역 | Salesforce·HubSpot 어댑터, 금융·헬스케어 커넥터 |

**Proxy Aggregator의 두 변형**이 특히 중요하다. **static-merge**는 모든 upstream tool의 union을 한꺼번에 노출해 클라이언트 설정은 단순해지지만 tool 수가 불어나 선택 정확도를 떨어뜨린다. **scoped**는 요청마다 관련 subset만 검색해 노출한다(retrieval-over-tools). 아래 tool-count 예산을 넘길 상황이면 scoped 변형을 써야 한다.

## 4개 anti-pattern (Anti-Patterns)

파생 코퍼스의 어떤 서버도 이 구조가 지배적이진 않았지만, 개발·코드리뷰에서 되풀이 관찰된 국소적 실패 모드다. 각각 "구체적 실패 + 알려진 수정"의 단위로 제시된다.

- **The God Tool** — `do_anything(action, params)`처럼 거대·미분화된 단일 schema. LLM이 "action"의 의미를 추론해야 해 선택 정확도가 무너진다. **수정: 분해** — op마다 정밀한 이름·schema·설명.
- **Unsanitized Resource Content** — 사용자 생성 콘텐츠를 sanitize 없이 resource 응답에 그대로 반환. "Ignore previous instructions…"가 데이터가 아니라 명령으로 처리된다. **수정: 외부 콘텐츠는 MCP 응답에 들어가기 전 sanitize.**
- **Synchronous Long-Running Operations** — 수 초 이상 걸리는 op를 동기 tool로 노출하면 client가 timeout(MCP엔 async 콜백이 없다). **수정: job ID를 동기 반환하고 별도 `poll_job(id)`를 둔다.**
- **Missing or Vague Tool Descriptions** — 설명이 없거나 이름만 되풀이. LLM은 schema가 아니라 설명을 읽고 tool을 고른다. **수정: 무엇을·언제·무엇을 반환하는지 처음 보는 사람에게 설명하듯 쓴다.**

## 정량 결과 (Quantitative Results)

### tool 수 vs. 선택 정확도 — 논문의 핵심

ANSYR 프로덕션 텔레메트리(Q1 2025)의 관찰 데이터로, tool-count 버킷마다 200 세션 턴을 뽑고 사후 품질 리뷰에서 운영자가 확인한 정답 tool을 ground truth로 삼았다.

![[assets/rodrigues-2026-mcp-server-architecture-patterns/fig02.png]]
*Figure 2: context 내 tool 수 vs. 선택 정확도·지연 (Haiku 4.5 / Sonnet 4, 버킷당 N=200, ANSYR 프로덕션 로그). 음영은 권장 범위 ≤10 tools (Rodrigues 2026, p.6)*

- **Haiku 4.5** — 10~15 tool 사이에서 90% 아래로 하락(10개 91%, 15개 87%). 10 tool에서 91% @ median 245 ms.
- **Sonnet 4** — 20 tool까지 ≥90%를 유지하다 30개에서 하락. 10 tool에서 95% @ 410 ms.
- **함의** — 단일 서버가 ≈10~15 tool을 넘으면 scoped Proxy Aggregator(per-context 필터링 = retrieval-over-tools)로 tool 공간을 쪼개 관련 subset만 보여야 한다. static merge는 오히려 문제를 키운다. 완화책은 aggregation 자체가 아니라 **선택적 노출**이다.

### 전송 지연 — 지배 요인은 프로토콜이 아니라 network RTT

![[assets/rodrigues-2026-mcp-server-architecture-patterns/fig01.png]]
*Figure 1: MCP 전송 지연 (p50/p95/p99, 로그 스케일). stdio·loopback 2행은 측정값, cross-host 3행은 same-region network-RTT 캘리브레이션 모델값 (Rodrigues 2026, p.6)*

| Transport | Method | p50 | p95 | p99 |
|---|---|---|---|---|
| stdio (local) | measured | 0.01 ms | 0.02 ms | 0.02 ms |
| streamable-http (loopback) | measured | 0.39 ms | 0.45 ms | 0.48 ms |
| streamable-http (same-region remote) | modeled | 30.4 ms | 80.4 ms | 180.4 ms |
| Stateful Session Server (remote) | modeled | 38.4 ms | 100.4 ms | 216.4 ms |
| Proxy Aggregator (remote, single hop) | modeled | 62.4 ms | 160.4 ms | 308.4 ms |

in-host 전송(stdio, loopback http)은 1 ms 미만이라 stdio와 streamable-http의 격차는 실재하지만, 호스트 경계를 넘는 순간 network RTT가 2~3 orders 크므로 무의미해진다. 따라서 아키텍처상 진짜 중요한 선택은 전송 인코딩이 아니라 **(a) 서버가 클라이언트와 co-located인가, (b) downstream fan-out(Proxy Aggregator)이 network hop을 추가하는가**다. (표의 3행은 측정이 아닌 모델값임을 논문이 행별로 명시한다.)

### 분류 신뢰도

54개 held-out 서버에 아키텍처명을 감춘 중립 설명을 붙여 두 rater(Haiku 4.5, Sonnet 4)가 분류한 결과 **rater 간 κ=0.76**(substantial)이 나왔다. 다만 저자 의도 라벨과의 일치는 69~76%로 더 낮고, 불일치가 세 경계에 몰린다 — (1) statefulness는 기능 목록에서 안 보여 stateful 서버가 Tool Orchestrator로 읽히고, (2) domain logic도 안 보여 도메인 어댑터가 갈라지며, (3) read-style tool은 gateway를 닮는다. 그래서 저자들은 statefulness·domain-logic을 상호배타 카테고리가 아니라 **cross-cutting 속성**으로 다루고, 패턴 배정을 capability list가 아닌 구현 신호에 근거하라고 권고한다.

## 실무 지침 (Cross-Cutting Concerns)

- **인증** — streamable-http의 Bearer 토큰을 tool 핸들러가 아니라 전송 계층에서 검증하고, 토큰을 특정 tool 집합으로 스코핑, 모든 호출을 caller identity와 함께 로깅한다.
- **에러 핸들링** — 예외를 던지기보다 structured error content를 반환해 LLM이 에러를 보고 재시도·에스컬레이션을 판단하게 한다.
- **버전관리** — `initialize` 응답에 version 필드를 넣고, schema breaking change는 major를 올리며 마이그레이션 창 동안 구 schema를 살려 둔다.
- **관찰가능성** — tool 호출마다 이름·입력 해시·지연·출력 크기·에러코드를 로깅한다. LLM 오작동을 디버깅할 유일한 표면이다.

> **유지보수 관점** — 각 패턴은 변경을 국소화하는 seam이기도 하다. Domain-Specific Adapter는 upstream API 변화를 흡수해 LLM-facing 표면을 안정시키고, Proxy Aggregator는 fleet을 버전·인증·감사할 단일 지점이며, Resource Gateway는 백엔드 스키마 마이그레이션을 한 계층에 가둔다. 반대로 세션 스토어는 reap하지 않으면 새고, statefulness는 클라이언트에도 taxonomy에도 안 보이므로 명시 문서화해야 하며, tool 설명은 코드처럼 리뷰하지 않으면 동작과 어긋난다.

## 관련 페이지 (Related Pages)

- [[agents/cemri-2025-why-do-multi-agent-llm-systems]] — multi-agent 실패 taxonomy. tool 사용·정보 은폐 같은 실패 모드가 이 논문의 anti-pattern(God Tool·Vague Description)과 client/server 양면에서 맞닿는다
- [[agents/dennis-2026-compiling-agentic-workflows-into-llm]] — agentic 워크플로를 compile하는 접근. Tool Orchestrator가 워크플로를 서버측 composite tool로 캡슐화하는 것과 대비되는 client측 전략
- [[agents/qiao-2026-memory-intelligence-agent]] — 에이전트 메모리. Stateful Session Server의 서버측 세션 상태와 에이전트 장기 메모리의 경계를 함께 보면 좋다
- [[database/li-2026-beyond-semantic-similarity-rethinking-retrieval]] — Direct Corpus Interaction. retrieval-over-tools(scoped Proxy Aggregator)와 마찬가지로 "무엇을 context에 노출할지"를 검색 문제로 보는 관점

