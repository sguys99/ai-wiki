---
title: "MCP Server Architecture Patterns for LLM-Integrated Applications"
type: paper
year: 2026
category: agents
raw_path: raw/papers/rodrigues-2026-mcp-server-architecture-patterns.pdf
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
    caption: "구성별 MCP 전송 지연의 p50, p95, p99 (로그 스케일). 행 라벨이 measured와 modeled를 구분한다"
    page: 6
    bbox_norm: [0.5, 0.0562, 0.9298, 0.2129]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/rodrigues-2026-mcp-server-architecture-patterns/fig02.png
    raw: raw/papers/rodrigues-2026-mcp-server-architecture-patterns-figures/fig02.png
    caption: "context 내 tool 수에 따른 선택 정확도와 median 지연 (Claude Haiku 4.5와 Claude Sonnet 4, 버킷당 200건, ANSYR 프로덕션 로그). 음영 구간이 권장 범위인 tool 10개 이하다"
    page: 6
    bbox_norm: [0.5, 0.2508, 0.9298, 0.3853]
    strategy: caption-region
    curated: true
  - id: tab01
    label: Table I
    kind: table
    file: assets/rodrigues-2026-mcp-server-architecture-patterns/tab01.png
    raw: raw/papers/rodrigues-2026-mcp-server-architecture-patterns-figures/tab01.png
    caption: "MCP 패턴 5종의 고전 조상과 LLM-client delta 대조표"
    page: 2
    bbox_norm: [0.0702, 0.1033, 0.9288, 0.4651]
    strategy: table-region
    low_confidence: true
    curated: false
  - id: tab02
    label: Table II
    kind: table
    file: assets/rodrigues-2026-mcp-server-architecture-patterns/tab02.png
    raw: raw/papers/rodrigues-2026-mcp-server-architecture-patterns-figures/tab02.png
    caption: "패턴 카탈로그를 도출한 MCP 서버 15개 코퍼스. 공개 서버는 구현 저장소를 밝히고 ANSYR 프로덕션 서버는 익명화했다"
    page: 2
    bbox_norm: [0.5009, 0.1163, 0.9288, 0.4651]
    strategy: table-region
    curated: false
  - id: tab03
    label: Table III
    kind: table
    file: assets/rodrigues-2026-mcp-server-architecture-patterns/tab03.png
    raw: raw/papers/rodrigues-2026-mcp-server-architecture-patterns-figures/tab03.png
    caption: "MCP 전송 지연표. measured 행은 loopback 종단 측정(100회 호출과 warm-up 10회)이고 modeled 행은 loopback 오버헤드에 same-region network RTT 캘리브레이션을 더한 값으로 직접 측정이 아니다"
    page: 6
    bbox_norm: [0.0774, 0.101, 0.926, 0.178]
    strategy: table-region
    low_confidence: true
    curated: false
---

## 한 줄 요약 (One-line Summary)

프로덕션 MCP 서버 15개를 질적 코딩(qualitative coding)해 되풀이되는 아키텍처 패턴 5종(Resource Gateway, Tool Orchestrator, Stateful Session Server, Proxy Aggregator, Domain-Specific Adapter)과 anti-pattern 4종을 GoF 형식으로 카탈로그화하고, "LLM이 자연어 설명을 읽고 tool을 고른다"는 제약이 만드는 실무 한계를 프로덕션 텔레메트리로 계측한 산업 경험 논문(industry experience paper)이다. 계측 결과의 핵심은 Haiku 4.5급 모델에서 context당 tool이 10개에서 15개 사이를 지나면 선택 정확도가 90% 아래로 내려간다는 것이고, Sonnet 4는 20개까지 90% 이상을 유지하다 30개에서 내려간다.

## 1. 자료 정보 (Document Information)

- **제목**: MCP Server Architecture Patterns for LLM-Integrated Applications
- **저자**: Carson Rodrigues (Celabe), Oysturn Vas (University of Waterloo)
- **발표**: arXiv:2606.30317v1 [cs.SE], 2026-06-29. ICSME 2026 Industry Track 대상 원고. 총 9페이지
- **유형**: Industry experience paper (설계 패턴 카탈로그와 정량 평가의 결합)
- **Index Terms**: Model Context Protocol, MCP, LLM integration, software architecture, software maintenance, software evolution, design patterns, AI agents, industry experience
- **코퍼스**: 독립 개발된 MCP 서버 15개. Celabe의 ANSYR 음성 AI 플랫폼 프로덕션 서버 5개(Server-A부터 Server-E까지 익명화, 2024년 말부터 2025년 초 사이 배포)와 공식 `modelcontextprotocol/servers` 레지스트리 공개 서버 10개로 구성된다
- **재현 패키지**: https://github.com/rodriguescarson/mcp-patterns-icsme2026 (MIT 라이선스)
- **AI 공개**: ICSME Industry Track의 AI 콘텐츠 공개 지침에 따라 기재한다. Claude Sonnet 4.6이 원고 준비 단계의 집필과 편집 보조로 쓰였고 최종 텍스트는 저자가 검토했다. Claude Haiku 4.5(`claude-haiku-4-5-20251001`)와 Claude Sonnet 4는 §VI-A 신뢰도 실험의 독립 rater 피험자다. §VI-B의 network RTT 캘리브레이션 상수는 인용된 선행 측정에서 가져온 값이며 LLM이 만든 값이 아니다. 연구 질문, 패턴 정의, 연구 설계, 주장 등 저작권 수준의 지적 기여에는 AI가 관여하지 않았고, 그림도 AI로 생성하거나 변형하지 않았다
- **이해상충**: 1저자 Carson Rodrigues는 코퍼스의 프로덕션 절반을 제공한 ANSYR 운영사 Celabe 소속이다. 2저자 Oysturn Vas는 University of Waterloo 소속으로 Celabe와 ANSYR과 상업적 관계가 없다

**MCP 배경**: MCP는 Anthropic이 2024년 11월에 발표한 client-server 프로토콜로, JSON-RPC 2.0 위에서 3개 primitive를 정의한다. Tools는 이름, 자연어 설명, JSON Schema 입력 명세를 갖는 호출 가능 함수다. Resources는 LLM이 읽을 수 있는 URI 주소 엔드포인트로 정적(파일, 문서)일 수도 동적(실시간 DB 질의)일 수도 있다. Prompts는 서버측에서 관리하는 파라미터화 템플릿으로 요청 시 사용자나 에이전트에게 노출된다. 전송은 로컬 in-process용 stdio와 원격용 streamable-http(HTTP에 server-sent events 옵션) 2종이다. 서버 하나가 Claude, GPT-4, Gemini 등 규격을 지키는 어떤 에이전트에서도 수정 없이 동작한다.

저자들은 MCP를 LSP(Language Server Protocol)에 빗댄다. LSP는 에디터와 언어지능 도구의 인터페이스를 표준화해 같은 서버가 VS Code, Neovim, Emacs에서 수정 없이 동작하게 만들었고, MCP는 에이전트와 능력 제공자 사이에 같은 디커플링을 노린다.

## 2. 주요 기여 (Key Contributions)

1. **서버측 아키텍처 패턴 5종** 카탈로그. Gamma et al.이 정립한 구조화 서술 형식(context, problem, solution, consequences, known uses)을 LLM 대면 API 제약에 맞춰 적용했다. 각 패턴은 Repository, Facade, Session, Proxy, Adapter라는 고전 조상을 갖고, 저자들이 기여로 내세우는 것은 **LLM-client delta**다 (Table I).
2. **anti-pattern 4종** (God Tool, Unsanitized Resource Content, Synchronous Long-Running Operations, Missing or Vague Tool Descriptions). 각각 "구체적이고 반복되는 실패 모드와 알려진 수정"의 단위로 제시된다.
3. **정량 측정 3종**: (a) 분류 taxonomy의 rater 간 신뢰도. held-out 서버 54개에 두 LLM rater를 붙여 Cohen's κ=0.76을 얻고 경계 모호성 3곳을 국소화했다. (b) 전송 지연 벤치마크. in-host 전송은 종단 측정, cross-host 전송은 모델값이다. (c) tool 수와 선택 정확도의 관계를 프로덕션 로그로 분석해 실무 정확도 예산을 tool 10개에서 15개 사이로 지목했다.
4. **횡단 관심사(cross-cutting concern) 정리**: 인증, 에러 핸들링, 버전관리, 관찰가능성(observability).
5. **유지보수와 진화 관점의 재해석**. 각 패턴을 변경을 국소화하는 seam으로 보고, 동시에 저자가 물려받는 유지보수 부담을 함께 제시한다. seam은 그 자리를 편집하지 않고 동작을 바꿀 수 있는 위치를 뜻한다.

논문이 밝히는 문제의식은 실무에서 반복되는 4개 질문이다. tool을 어떻게 분해해야 하는가, 즉 언제 tool 하나가 둘이 되는가. 서버측 상태는 언제 정당화되고 어떻게 관리해야 하는가. 운영자가 여러 서버의 능력을 어떻게 집계해야 하는가. 서버가 복잡한 API를 그대로 노출하지 않고 감싸야 하는 시점은 언제인가. 저자들은 이들이 MCP 고유의 질문이 아니라 LLM 클라이언트라는 특정 제약을 통과한 API 설계 질문이라고 정리한다. LLM은 문서를 열거나 schema를 뜯어보지 않고 자연어 설명을 읽어 tool을 고르며, 사람 개발자와 달리 schema 복잡도에 민감하다. 사람 엔지니어에게는 자명한 tool이 설명이 없거나 잘 쓰이지 않았으면 LLM에게는 보이지 않거나 모호해진다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 코퍼스 (Corpus)

Table II가 코퍼스 15개를 열거한다. 프로덕션 5개는 지식재산 사유로 익명 핸들을 쓰되 배포 카테고리와 primary pattern은 표에 공개했고, 공개 10개는 GitHub 전체 경로로 표기했다. 타임스탬프와 primary pattern 배정이 담긴 기계 판독 코퍼스는 재현 패키지의 `corpus.json`에 들어 있다.

| 서버 | 카테고리 | Primary pattern |
|---|---|---|
| Server-A | Voice-tool aggregator | Tool Orchestrator |
| Server-B | Per-call dialogue session | Stateful Session Server |
| Server-C | Telephony / SIP adapter | Domain-Specific Adapter |
| Server-D | Customer/CRM read gateway | Resource Gateway |
| Server-E | Multi-tenant aggregator | Proxy Aggregator |

| 서버 | 카테고리 | Primary pattern |
|---|---|---|
| `filesystem` | Local files | Resource Gateway |
| `postgres` | Relational DB | Resource Gateway |
| `sqlite` | Embedded DB | Resource Gateway |
| `github` | VCS / issue API | Tool Orchestrator |
| `slack` | Messaging API | Tool Orchestrator |
| `brave-search` | Web search | Tool Orchestrator |
| `fetch` | Generic HTTP | Tool Orchestrator |
| `puppeteer` | Browser automation | Stateful Session Server |
| `memory` | Per-session KV store | Stateful Session Server |
| `git` | Repository state | Stateful Session Server |

패턴 분포를 보면 Resource Gateway 4개, Tool Orchestrator 5개, Stateful Session Server 4개, Domain-Specific Adapter 1개, Proxy Aggregator 1개다. Domain-Specific Adapter와 Proxy Aggregator는 프로덕션 서버 각 1개에만 배정되어 있어, "최소 2개 서버에서 독립적으로 등장"이라는 승격 조건을 코퍼스 표만으로는 확인할 수 없다.

### 코딩 프로토콜 (Coding Protocol)

서버마다 고정된 소스에서 5개 artifact를 추출한다.

| # | artifact | 추출 대상 |
|---|---|---|
| i | tool, resource, prompt 등록 | 소스 코드의 `setRequestHandler` 호출과 JSON schema |
| ii | 전송 설정 | 서버가 stdio와 streamable-http 중 무엇을 쓰는지 |
| iii | 서버측 세션과 상태 처리 | 세션 저장소 유무와 만료 처리 |
| iv | 다른 MCP 서버로의 위임 | upstream 연결과 라우팅 |
| v | 도메인 검증과 비즈니스 로직 | 입력 정규화, 업무 규칙 |

공개 10개는 GitHub 저장소(소스 코드, README, 공개 문서)에서, 프로덕션 5개는 소스와 배포 설정에서 가져왔다. **README 산문만 신뢰하지 않는다.** README는 관심 대상인 구조적 결정을 자주 누락하기 때문이다.

질적 코딩은 Saldaña의 2주기 절차를 따른다. 1차 open coding에서 1저자가 추출된 artifact마다 되풀이되는 구조적 결정에 라벨을 붙이고, 2차 pattern coding에서 1차 코드를 공유 구조와 공유 문제로 묶어 후보 패턴을 만든다. 후보는 **최소 2개 서버에서 독립적으로 등장**하고 자명한 선행 해법이 없는 문제를 다룰 때만 카탈로그로 승격된다. 2저자가 결과 taxonomy를 코퍼스에 대조해 독립 검토하고 두 저자가 논의로 불일치를 해소했다. 이 검토는 독립 dual coding이 아닌 verification pass이므로 rater 간 신뢰도는 §VI-A에서 held-out 코퍼스와 독립 rater 2인으로 따로 측정한다.

### 패턴 5종 (Five Patterns)

Table I이 조상과 delta를 대조한다.

| MCP 패턴 | 고전 조상 | LLM-client delta |
|---|---|---|
| Resource Gateway | Repository / REST | resource를 LLM retrieval 관점에서 명명한다 |
| Tool Orchestrator | Facade / Mediator | tool 집합 크기를 선택 정확도에 맞춘다 |
| Stateful Session Server | Session / Memento | 상태가 암묵적이며 프롬프트에 없다 |
| Proxy Aggregator | Proxy / API gateway | context에 맞게 tool을 분할한다 |
| Domain-Specific Adapter | Adapter (GoF) | 검증을 자연어 가드레일로 구현한다 |

패턴마다 "Also known as" 별칭이 붙는다.

| 패턴 | 별칭 |
|---|---|
| Resource Gateway | Data Facade, Context Provider |
| Tool Orchestrator | Action Hub, Workflow Facade |
| Stateful Session Server | Conversational Context Server |
| Proxy Aggregator | MCP Router, Multi-Server Facade |
| Domain-Specific Adapter | Semantic Layer, Domain Translator |


#### 패턴별 context, problem, solution

| 패턴 | Context | Problem | Solution |
|---|---|---|---|
| Resource Gateway | LLM 에이전트가 백엔드 시스템(데이터베이스, 문서 저장소, 서드파티 API)에서 구조화 데이터를 읽어 응답 근거로 삼아야 한다 | 백엔드 데이터를 queryable하게 노출하면서 신뢰할 수 없는 데이터를 통한 prompt injection을 막고 백엔드 schema 변경에 일관되게 대응하려면 어떻게 해야 하는가 | 모든 데이터 접근을 중개하는 gateway로 구성한다. 읽기는 Resources(목록 조회, ID 조회)로, 열린 URI 템플릿에 넣기 안전하지 않은 파라미터 질의는 Tools로 노출한다. 백엔드 응답이 LLM에 닿기 전에 주입 콘텐츠를 제거하거나 이스케이프하는 sanitization layer를 삽입한다 |
| Tool Orchestrator | LLM 에이전트가 여러 외부 시스템에 걸친 동작을 수행해야 한다. 티켓 생성, 담당자 통보, 채널 게시가 한 흐름인 경우다 | LLM이 각 시스템 API를 이해하거나 호출 사이 중간 상태를 관리하거나 부분 실패를 처리하지 않게 하면서 다중 시스템 워크플로를 노출하려면 어떻게 해야 하는가 | 완결된 워크플로를 캡슐화한 composite tool을 노출한다. tool 하나가 내부에서 모든 sub-call을 수행하고 단일 요약을 반환한다. LLM은 연산 하나만 보고 오케스트레이션은 서버가 담당한다 |
| Stateful Session Server | LLM 에이전트가 다중 턴 상호작용을 수행하고 뒤 호출이 앞에서 세운 상태에 의존한다. 열린 파일, 진행 중 트랜잭션, 인증된 사용자가 그런 상태다 | MCP tool call은 기본적으로 stateless request-response다. 한 세션 안 여러 호출에 걸쳐 유지되어야 하는 상태를 어떻게 관리해야 하는가 | 연결 시점에 session identifier를 생성해 모든 tool 응답에 포함시키고 이후 모든 호출이 이를 운반한다. 서버는 per-session 컨텍스트를 메모리에 두거나 수평 확장 배포에서는 Redis에 둔다. 세션은 비활성 시 만료된다 |
| Proxy Aggregator | LLM 에이전트가 서로 다른 여러 MCP 서버의 능력이 필요하지만 클라이언트 설정이 유지 가능한 연결 수를 제한하거나, 운영자가 fleet 전체에 중앙화된 인증과 로깅을 걸어야 한다 | 여러 upstream MCP 서버를 단일 엔드포인트로 제시하면서 서버별 정체성, 버전관리, 실패 격리를 잃지 않으려면 어떻게 해야 하는가 | upstream N개에 연결하는 proxy 서버를 만들고 tool 이름을 서버별 namespace로 접두해 충돌을 막고 각 호출을 올바른 upstream으로 라우팅한다. 노출 범위에 따라 static-merge와 scoped 두 변형으로 갈린다 |
| Domain-Specific Adapter | 기존 시스템이 유용하지만 LLM에 적대적인 API를 갖는다. 기계 판독용 식별자, 저수준 연산, 복잡한 인증 흐름, 상당한 후처리가 필요한 출력 형식이 그런 경우다 | 복잡한 저수준 API를 LLM이 정확히 쓸 수 있는 형태로 번역하면서 비즈니스 로직을 서버에 재구현하지 않으려면 어떻게 해야 하는가 | 기존 API를 감싸는 semantic adapter를 만들고 사람이 읽는 tool 설명, 입력 정규화, 출력 강화, 에러 번역 4개를 더한다 |

Domain-Specific Adapter가 더하는 4개 보강 요소는 다음과 같다.

| 보강 요소 | 내용 |
|---|---|
| 사람이 읽는 tool 설명 | LLM의 선택을 안내한다 |
| 입력 정규화 | 자연어 날짜, 이름, 모호한 식별자를 받아들인다 |
| 출력 강화 | ID를 표시명으로 해석해 돌려준다 |
| 에러 번역 | API 에러 코드를 평문 영어로 바꾼다 |

Proxy Aggregator의 두 변형은 무엇을 노출하는지에서 갈린다.

| 변형 | 노출 범위 | 장점 | 문제 |
|---|---|---|---|
| static-merge | 모든 upstream tool의 union을 한 번에 노출한다 | 클라이언트 설정이 단순해진다 | 가시 tool 수가 올라가, 병합 카탈로그가 §VI-C의 예산을 넘으면 선택 정확도가 떨어진다 |
| scoped | 현재 과제에 관련된 upstream tool의 subset만 노출한다. 요청별로 후보를 검색한다(retrieval-over-tools) | tool 수를 예산 안에 유지한다 | 요청별 tool retrieval 단계 자체가 빠르고 정확해야 한다 |

Listing 4가 보여주는 것은 static-merge의 핵심이고 scoped 변형은 그 위에 요청별 필터를 한 층 겹친다. 저자들은 집계가 context를 tool 수 한계 밖으로 밀어낼 상황이면 언제든 scoped 변형을 선택하라고 권고한다.

#### 패턴별 consequences

| 패턴 | 이점 | 부담 |
|---|---|---|
| Resource Gateway | 접근 제어의 단일 강제 지점. 백엔드 schema가 바뀌어도 LLM에는 안정된 인터페이스 유지. prompt injection 위험을 한 계층에 격리 | 읽기마다 network hop 하나 추가. 백엔드 schema 변경이 MCP 서버로 전파. 복잡한 join이나 집계를 resource로 표현하기 어색 |
| Tool Orchestrator | LLM 추론 부담 감소. 다단계 연산에 트랜잭션에 준하는 의미 부여. LLM이 추론할 필요 없는 API 표면 은닉 | 워크플로 변경 시 개별 sub-tool 재사용 곤란. 부분 실패 처리 책임이 LLM에서 서버로 이동. 워크플로 로직이 tool과 문서 두 곳에 인코딩 |
| Stateful Session Server | 다중 턴 워크플로가 자연스러워짐. 중복 데이터 전송 제거. 트랜잭션 의미 확보 | 세션을 회수(reap)하지 않으면 메모리 누수. 수평 확장에 분산 세션 저장소 필요. LLM이 session ID를 확실히 전달한다는 보장 없음 |
| Proxy Aggregator | 클라이언트 설정 단순화. 중앙화된 인증과 감사 로깅. 대규모 fleet 전반의 tool 발견 지원 | 단일 실패 지점 도입. 모든 호출에 network hop 하나 추가. namespace 충돌에 신중한 거버넌스 필요. upstream 실패가 집계 지점으로 드러남. scoped 변형은 요청별 retrieval 단계를 추가 |
| Domain-Specific Adapter | 설명이 정확해지면 LLM tool 선택 정확도 개선. API 복잡도가 adapter에 격리. 백엔드 API 버전관리를 adapter가 흡수 | 하부 API 변경 시 adapter 갱신 필요. 하부 API가 이미 LLM 친화적일 때 과설계 위험 |

#### 패턴별 known uses와 코드 listing

| 패턴 | Known Uses | Listing 요지 |
|---|---|---|
| Resource Gateway | 데이터베이스 커넥터(PostgreSQL, MongoDB), 문서 저장소 브리지(Notion, Google Drive), REST API 래퍼(GitHub, Jira, Linear) | Listing 1. `ListResourcesRequestSchema` 핸들러가 `_id`, `title`, `updatedAt`만 projection해 목록을 만들고 `doc://${d._id}` URI와 `application/json` mimeType을 붙인다. `ReadResourceRequestSchema` 핸들러는 `doc://` 접두를 떼어 문서를 조회한 뒤 `sanitize(JSON.stringify(doc))`로 감싸 반환한다. sanitize가 읽기 경로에 놓인다 |
| Tool Orchestrator | CI/CD 자동화 서버, DevOps 워크플로 도구, 고객지원 액션 허브 | Listing 2. `create_and_notify_ticket` tool 하나가 `jira.createIssue`, `slack.postMessage`, `email.send` 3개 API 호출을 순차 수행하고 `Created ${ticket.key}, notified ${assignee.name}` 형태의 텍스트 하나만 반환한다 |
| Stateful Session Server | 코드 편집 에이전트(open, edit, save 순서), 데이터베이스 트랜잭션 서버, 다단계 폼 어시스턴트 | Listing 3. `Map<string, SessionContext>`를 세션 저장소로 두고 `req.params.arguments._sessionId`로 세션을 찾는다. `open_file`은 파일을 읽어 `filePath`, `content`, 빈 `edits` 배열을 저장하고 문자 수를 반환한다. `edit_file`은 열린 파일이 없으면 `No file open in this session` 오류를 던진다 |
| Proxy Aggregator | 엔터프라이즈 MCP 게이트웨이, 개발자 플랫폼 aggregator, 멀티도메인 AI 어시스턴트 백엔드 | Listing 4. upstream마다 `listTools()`를 부른 뒤 `${s.namespace}__${t.name}` 형태로 이름을 바꿔 병합한다(예: `github__create_pr`). 호출 시 `req.params.name.split('__')`으로 namespace를 떼어 해당 upstream의 `callTool`로 넘긴다 |
| Domain-Specific Adapter | CRM 어댑터(Salesforce, HubSpot), 금융 데이터 커넥터, 헬스케어 레코드 시스템 | 코드 listing이 붙지 않는 유일한 패턴이다 |

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

질적 패턴 서술을 보완하려고 실험 3개를 수행했고 모두 재현 패키지에서 재현 가능하다.

| 실험 | 절 | 설계 | 산출 지표 |
|---|---|---|---|
| 분류 신뢰도 | §VI-A | held-out 서버 54개를 독립 LLM rater 2인이 분류 | Cohen's κ, raw agreement, 저자 라벨 일치율 |
| 전송 지연 | §VI-B | in-host는 종단 측정, cross-host는 모델값 | p50, p95, p99 |
| tool 수와 정확도 | §VI-C | ANSYR 프로덕션 로그 회고 분석 | 선택 정확도, median 지연 |

### (A) 분류 신뢰도 (§VI-A)

taxonomy를 독립 rater가 **신뢰성 있게** 적용할 수 있는지, 그리고 경계가 어디서 흐린지를 평가한다. held-out 코퍼스는 공식 MCP 레지스트리와 인기 커뮤니티 서버에서 뽑은 54개로, 패턴 도출에 쓰인 서버는 하나도 포함하지 않았다. 각 서버에는 아키텍처를 명명하지 않고 무엇을 하는지만 서술하는 **중립적 기능 중심 설명**을 붙였다. 예시는 "stage changes, commit, show diffs, and switch branches in a repository"다. 독립 rater 2인(Claude Haiku 4.5, Claude Sonnet 4)에게 패턴 정의 5개만 주고 재현성을 위해 temperature 0으로 모든 서버를 분류시켰다.

저자들은 아키텍처를 스스로 명명하는 canonical 설명을 분류하는 더 쉬운 프로토콜을 의도적으로 피했다. 저자가 쓴 canonical 설명으로 진행한 파일럿은 97%를 기록했지만, 이는 taxonomy가 현실적이고 아키텍처 중립적인 입력에서 살아남는지가 아니라 설명 문구를 측정한 값이다.

| 지표 | 값 |
|---|---|
| rater 간 Cohen's κ | 0.76 (bootstrap 95% CI [0.62, 0.88]) |
| rater 간 raw agreement | 81.5% |
| 저자 의도 라벨 일치 (Haiku 4.5) | 68.5% |
| 저자 의도 라벨 일치 (Sonnet 4) | 75.9% |
| canonical 설명 파일럿 | 97% |
| held-out 서버 수 | 54 |

rater 간 일치는 "substantial"이므로 독립 rater가 taxonomy를 일관되게 적용한다. 저자 의도 라벨과의 일치는 더 낮고, 불일치는 흩어지지 않고 **3개 경계에 체계적으로 집중**된다.

| # | 경계 | 증상 | 원인 |
|---|---|---|---|
| 1 | Statefulness는 기능에서 안 보인다 | 모든 stateful 서버(`git`, `puppeteer`, `playwright`, `selenium` 등)가 Tool Orchestrator로 읽힌다 | 능력 목록은 동작을 열거하되 서버측 세션 상태를 드러내지 않는다 |
| 2 | Domain logic은 안 보인다 | 도메인 어댑터(`kubernetes`, `salesforce`, `shopify`, `fhir`)가 Tool Orchestrator와 Resource Gateway로 갈린다 | 검증과 업무 규칙이 기능 설명에 드러나지 않는다 |
| 3 | read-style tool은 gateway를 닮는다 | 검색 지향 orchestrator(`sentry`, `notion`)가 Resource Gateway로 재분류된다 | 읽기 위주 표면이 gateway와 구별되지 않는다 |

권고는 두 가지다. statefulness와 domain-logic을 상호배타 카테고리가 아니라, 서버가 primary structural pattern과 함께 지닐 수 있는 **cross-cutting attribute**로 취급한다. 그리고 패턴 배정은 능력 목록만이 아니라 **구현 신호**에 근거한다.

### (B) 전송 지연 (§VI-B, Table III와 Fig. 1)

| Transport | Method | p50 | p95 | p99 |
|---|---|---|---|---|
| stdio (local) | measured | 0.01 ms | 0.02 ms | 0.02 ms |
| streamable-http (loopback) | measured | 0.39 ms | 0.45 ms | 0.48 ms |
| streamable-http (same-region remote) | modeled | 30.4 ms | 80.4 ms | 180.4 ms |
| Stateful Session Server (remote) | modeled | 38.4 ms | 100.4 ms | 216.4 ms |
| Proxy Aggregator (remote, single hop) | modeled | 62.4 ms | 160.4 ms | 308.4 ms |

measured 2행은 최소 JSON-RPC 2.0 echo 서버를 stdio와 loopback streamable-http(로컬 `http.server`에 HTTP POST)로 각각 100회 호출하고 warm-up 10회를 앞에 둔 값으로, LLM 왕복을 배제해 프로토콜 오버헤드만 분리한다. modeled 3행은 다중 호스트 배포가 필요해 계측하지 않은 cross-host 경로를 대상으로, 측정된 loopback 오버헤드에 명시적 network RTT 캘리브레이션 상수를 더한 값이다. 상수는 same-region HTTPS RTT의 p50 약 30 ms, p95 약 80 ms, p99 약 180 ms로, MCP Python SDK 벤치마크와 pipecat 통합 데이터가 보고한 전형적 same-region 클라우드 HTTPS 왕복 분포와 정합한다. 행별 캘리브레이션 출처는 재현 패키지에 기재되어 있다. Method 열이 이 구분을 모든 행에 명시하고, 논문은 같은 구분을 산문 주장 전반에 유지한다.

핵심 발견은 **전송 오버헤드가 프로토콜 계층이 아니라 network RTT에 지배된다**는 것이다. in-host 전송(stdio, loopback streamable-http)은 1 ms를 훨씬 밑돌고, stdio와 streamable-http의 격차는 실재하지만 호스트 경계를 넘는 배포에서는 무의미해진다. same-region network RTT가 두 프로토콜 자체 오버헤드보다 2배에서 3배의 자릿수만큼 크기 때문이다. 따라서 아키텍처상 중요한 선택은 어떤 전송 인코딩을 쓰는지가 아니라 (a) 서버가 클라이언트와 co-located인지, (b) downstream fan-out(Proxy Aggregator)이 network hop을 하나 더 추가하는지다.

### (C) tool 수와 선택 정확도 (§VI-C, Fig. 2)

context 크기의 함수로 tool 선택 정확도를 특성화하려고 ANSYR 음성 AI 플랫폼의 2025년 1분기 프로덕션 텔레메트리를 **관찰 데이터**로 보고한다. 이 논문을 위한 새 통제 실험이 아니라 프로덕션 로그의 회고 분석이며, 버킷별 수치와 출처는 재현 패키지의 `tool_count_telemetry.csv`로 공개해 독립 검증이 가능하다. tool 수 버킷 b는 {1, 3, 5, 10, 15, 20, 30, 50}이고 버킷마다 프로덕션 세션 턴 200개(N_b=200)를 뽑았다. 프로덕션에서 각 턴은 테넌트 설정에 따라 Claude Haiku 4.5 또는 Claude Sonnet 4가 처리했다. ground truth는 통화 후 품질 리뷰(상시 프로덕션 감사 단계)에서 사람 운영자가 정답으로 확인한 tool이다. Wilson 95% 신뢰구간은 모든 버킷에서 ±4%p 이내다.

산문이 명시하는 수치는 4개다. Haiku는 tool 10개에서 15개 사이에서 90% 정확도 문턱 아래로 내려가고(10개에서 91%, 15개에서 87%), Sonnet은 20개까지 90% 이상을 유지하다 30개에서 아래로 내려간다. tool 10개에서 Haiku는 median 245 ms에 91%, Sonnet은 410 ms에 95%다. 나머지 버킷 값은 Fig. 2 그래프에만 존재하며, 크롭을 판독한 값은 다음과 같다.

| tool 수 | Haiku 4.5 정확도 | Sonnet 4 정확도 | Haiku 4.5 median 지연 | Sonnet 4 median 지연 |
|---|---|---|---|---|
| 1 | 약 98% | 약 99% | 약 180 ms | 약 320 ms |
| 3 | 약 97% | 약 98% | 약 195 ms | 약 345 ms |
| 5 | 약 95% | 약 97% | 약 210 ms | 약 365 ms |
| 10 | 91% | 95% | 245 ms | 410 ms |
| 15 | 87% | 약 93% | 약 280 ms | 약 455 ms |
| 20 | 약 82% | 약 90% | 약 320 ms | 약 510 ms |
| 30 | 약 74% | 약 85% | 약 390 ms | 약 620 ms |
| 50 | 약 63% | 약 78% | 약 510 ms | 약 790 ms |

Fig. 2의 오른쪽 패널에는 산문이 언급하지 않는 **500 ms 예산선**이 그려져 있다. 이 선을 기준으로 보면 Sonnet 4는 tool 20개에서 이미 예산을 넘고, 같은 지점에서 정확도는 90%로 문턱에 걸친다. Haiku 4.5는 tool 50개에서야 예산에 닿는다. 즉 Sonnet 4의 정확도 여유는 지연 예산으로 상쇄되며, 지연 제약이 있는 음성 배포에서 두 모델의 권장 범위 차이는 정확도 곡선만 볼 때보다 좁아진다. 왼쪽 패널에는 90% 문턱선과 tool 10개 이하를 표시하는 권장 음영 구간이 함께 그려져 있다.

Resource Gateway와 Tool Orchestrator 패턴에 대한 함의는 직접적이다. 단일 MCP 서버가 tool을 약 10개에서 15개보다 많이 노출하면, §IV-D의 **scoped** Proxy Aggregator 변형(per-context tool 필터링, retrieval-over-tools라고도 한다)으로 tool 공간을 분할해 한 context에 관련 subset만 보이게 해야 한다. 단순 static merge는 문제를 개선하기보다 악화시키므로, 완화책은 집계 자체가 아니라 **선택적 노출**이다.

이 문턱은 더 큰 규모에서 문서화된 효과의 보수적 시작점이다.

| 연구 | 보고한 관계 |
|---|---|
| 본 논문 (§VI-C) | Haiku 4.5는 tool 10개에서 15개 사이, Sonnet 4는 20개에서 30개 사이에서 90% 아래로 내려간다 |
| Gan and Sun (RAG-MCP) | 후보 tool 약 30개까지만 tool 선택 성공률이 90%를 넘고 약 100개를 지나면 급격히 저하된다 |
| Kate et al. (LongFuncEval) | tool 카탈로그가 커질 때 정확도가 7%에서 85%까지 하락한다 |

본 논문의 기여는 지연 제약이 있는 음성 배포에서 저하가 **시작되는 지점**을 국소화한 것이고, Gan and Sun의 retrieval 기반 완화책은 저자들이 권고하는 Proxy Aggregator 분할의 구체적 사례다.

**Caveats**: 데이터는 관찰 데이터이고 한 조직의 프로덕션 tool 표면에서 나왔다. 의미가 겹치는 tool이 많은 인벤토리나 의도적으로 모호한 설명을 가진 tool에서는 결과가 다를 수 있다. 그리고 프로덕션 세션 로그 자체는 공개하지 않았으므로 공개 코드만으로 그림을 재도출할 수는 없다.

### 횡단 관심사 (§VII)

| 관심사 | 지침 |
|---|---|
| 인증 | streamable-http는 Bearer 토큰 인증을 지원한다. tool 핸들러 안이 아니라 전송 계층에서 인증한다. 토큰을 특정 tool 집합으로 스코핑한다. 모든 tool call을 caller identity와 함께 로깅한다. 호출 로그 없이 LLM 동작을 디버깅하는 것은 매우 어렵다 |
| 에러 핸들링 | 가능하면 예외를 던지지 않고 tool 에러를 structured error content로 반환한다. LLM이 에러를 보고 재시도할지 판단하며 사용자에게 에스컬레이션할지 결정할 수 있다 |
| 버전관리 | 서버의 `initialize` 응답에 version 필드를 포함한다. tool schema의 breaking change는 major 버전을 올린다. 즉시 클라이언트 갱신을 강제하지 않고 마이그레이션 창 동안 구 schema를 살려 둔다 |
| 관찰가능성 | tool call마다 tool 이름, 입력 해시, 지연, 출력 크기, 에러 코드를 로깅한다. 이 로그가 LLM 오작동의 **주된** 디버깅 표면이다 |

### 논의 (§VIII)

**LSP 유비 (§VIII-A)**: MCP는 LSP의 의도를 반영한다. host(에디터 또는 LLM 클라이언트)를 provider(언어 서버 또는 MCP 서버)에서 디커플링해 provider가 여러 host에서 재사용되게 하는 것이다. LSP는 언어지능을 에디터별 플러그인에서 공유 생태계로 바꿨다. MCP가 LLM 능력에 대해 같은 일을 할지는 좋은 구현을 안내할 패턴 어휘가 등장하는지에 부분적으로 달려 있고, 이 논문은 그 씨앗을 놓으려 한다.

**LLM 클라이언트를 위한 API 설계 (§VIII-B)**: 패턴들이 시사하는 것은 MCP 서버 설계가 근본적으로 하나의 특이한 제약을 가진 API 설계 문제라는 점이다. 클라이언트가 어떤 API를 부를지 문서를 참조해서가 아니라 자연어 설명을 읽어서 추론한다. 이는 통상의 API 설계 가정을 뒤집는다. 정밀하고 정보 밀도 높은 설명은 선택 사항이 아니라 필수이며, tool이 올바르게 쓰이는지를 직접 결정한다. tool 설명을 코드가 동작한 뒤 빠르게 써 두는 문서 주석으로 취급하는 실무자는 서버가 기대만큼 동작하지 않는 것을 보게 된다.

**실무자와 유지보수 관점의 함의 (§VIII-C)**: 구조를 고르는 실무자에게 카탈로그는 몇 개 결정으로 줄어든다.

| # | 결정 |
|---|---|
| 1 | 읽기 위주 백엔드 데이터는 sanitization layer를 갖춘 Resource Gateway로 노출한다 |
| 2 | 다중 시스템 워크플로는 Tool Orchestrator로 캡슐화한다 |
| 3 | 턴이 진짜로 앞선 상태에 의존할 때만 Stateful Session Server를 선택하고, 선택했다면 세션 회수 비용을 예산에 넣는다 |
| 4 | fleet 집계는 static merge가 아니라 scoped Proxy Aggregator 변형으로 한다 |
| 5 | 어떤 단일 context도 §VI-C의 tool 10개에서 15개 정확도 예산 아래로 유지한다 |

패턴이 비용을 회수하는 자리는 유지보수와 진화 관점이다. 각 패턴은 변경을 국소화하는 seam이기도 하고, 동시에 저자가 물려받는 유지보수 부담을 함께 지닌다.

| 패턴 | seam으로서의 값 | 물려받는 부담 |
|---|---|---|
| Domain-Specific Adapter | upstream API 변동을 흡수해 LLM 대면 표면을 안정시킨다 | 하부 API 변경 추적 |
| Proxy Aggregator | fleet을 버전관리하고 인증하고 감사할 단일 지점이다 | 단일 실패 지점과 namespace 거버넌스 |
| Resource Gateway | 백엔드 schema 마이그레이션을 한 계층에 가둔다 | 백엔드 변경의 전파 |
| Stateful Session Server | 다중 턴 상태를 한 곳에 모은다 | 세션 저장소를 회수하지 않으면 누수된다. statefulness는 클라이언트에도 taxonomy 자체에도 보이지 않으므로 명시적으로 문서화해야 한다 |
| 공통 | tool 설명이 선택을 결정한다 | tool 설명은 코드처럼 리뷰하지 않으면 동작과 어긋나는 load-bearing 산출물이다 |

이 관점에서 §V의 anti-pattern은 반복되는 유지보수성 smell이며 Hasan et al.의 smell 카탈로그와 직접 연결된다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

### 논문이 명시한 한계 4개 (§VIII-D)

| # | 한계 |
|---|---|
| 1 | 파생 코퍼스가 한 조직의 서버 15개와 공식 공개 레지스트리다. 최근 측정 연구가 공개 MCP 서버 8,000개 이상을 카탈로그했고, 그 규모의 층화 복제는 시도하지 않았다 |
| 2 | taxonomy를 단일 코더 open coding과 2차 검증으로 도출했고 독립 dual coding이 아니다. held-out rater 간 연구(κ=0.76, N=54)로 완화했으나 파생 코퍼스의 완전한 독립 dual coding은 향후 과제다 |
| 3 | 분류 코퍼스가 합성 및 실제 파생 서버 **설명**이고 실행 중 서버 자체가 아니다. 프로덕션 서버에 대한 분류 정확도는 다를 수 있다 |
| 4 | 전송 지연표 5행 중 3행이 종단 측정이 아니라 모델값이다. 과도한 주장을 피하려고 행마다 방법론을 명시했다 |

### 타당성 위협 4범주 (§VIII-E)

| 범주 | 내용 |
|---|---|
| Construct validity | 신뢰도 연구가 held-out 서버에 독립 LLM rater 2인을 써 단일 rater 편향을 완화하지만, 두 rater 모두 LLM이라 blind spot을 공유할 수 있다. 독립 human dual-coding은 향후 과제다 |
| Internal validity | Table III의 modeled 행은 측정된 loopback 오버헤드와 network RTT 상수를 합성한 값이다. 상수는 same-region 클라우드 텔레메트리로 캘리브레이션했으나 cross-region이나 혼잡 경로 배포는 절대값이 상당히 달라진다. 구성 간 상대 순서는 절대값보다 안정적이다 |
| External validity | ANSYR 프로덕션 서버 5개가 모두 하나의 응용 도메인(단일 산업의 음성 AI)에서 나왔다. 운영 프로파일이 다른 도메인에서는 패턴이 달라질 수 있다 |
| Conclusion validity | 신뢰도 코퍼스 N=54가 rater 간 κ의 bootstrap 95% CI를 [0.62, 0.88]로 만든다. "substantial" 일치이지만 54개 표본만으로 카탈로그가 전체 설계 공간을 포괄한다고 과대 해석해서는 안 된다 |

### 후속 방향 두 목록

논문은 후속 방향을 두 곳에서 제시하고 목록이 완전히 겹치지 않는다.

| 출처 | 제시한 방향 |
|---|---|
| §VIII-C (연구자용) | (1) 생태계 규모에서 파생 코퍼스의 독립 human dual-coding, (2) 진짜 taxonomy 모호성과 LLM 공유 blind spot을 분리할 Claude 2종 이상의 multi-model rater 패널, (3) 패턴 선택을 측정된 지연과 신뢰도에 잇는 예측 연구. 카탈로그를 서술적 어휘에서 경험적 도구로 바꾼다 |
| §IX (결론) | (1) 더 크고 도메인이 다양한 코퍼스에서 taxonomy의 독립 inter-coder 검증, (2) 패턴 변형별 LLM tool 선택 정확도의 정량 평가, (3) MCP 서버 공격 표면의 보안 분석, 특히 resource를 통한 prompt injection |

### 재현 패키지 (§VIII-F)

MIT 라이선스로 공개된 패키지 구성은 다음과 같다.

| 파일 | 내용 |
|---|---|
| `corpus.json` | 열거된 파생 코퍼스 |
| `kappa_eval.py` | 54개 서버 신뢰도 코퍼스와 2-rater 분류 스크립트 |
| `transport_bench.py` | 전송 벤치마크 |
| `prompts/classification_prompt.txt` | 분류 프롬프트 템플릿 |
| `tool_count_telemetry.csv` | 관찰 tool 수 텔레메트리 |
| `requirements.txt` | 의존성 매니페스트 |
| `results_kappa.json` | rater별 서버 단위 예측, rater 간 κ와 bootstrap CI, rater별 저자 라벨 일치율 |
| `results/transport_measured.json` | 전송 raw 샘플 |

두 rater(`claude-haiku-4-5-20251001`와 Claude Sonnet 4)는 결정성을 위해 temperature 0으로 질의했다.

### 논문 내적 불일치와 미기재 항목

- **Toolformer와 ToolBench의 인용 어긋남**: §II-C 본문은 "evaluation benchmarks (ToolBench-style suites [11], …)"라고 쓰지만 참고문헌 [11]은 Schick et al.의 Toolformer(NeurIPS 2023)다. ToolBench는 참고문헌 목록에 없다.
- **modeled 행의 반올림**: streamable-http remote의 p95는 loopback 0.45 ms와 상수 80 ms의 합이 80.45 ms인데 표는 80.4 ms로 적는다. p99도 0.48과 180의 합 180.48을 180.4로 적어, 반올림이 아닌 절단으로 보인다.
- **modeled 행의 추가 오버헤드 미기재**: 본문은 modeled 행을 "loopback 오버헤드에 network RTT 캘리브레이션 상수를 더한 값"으로 정의하지만, Stateful Session Server(remote)의 38.4 / 100.4 / 216.4 ms와 Proxy Aggregator(remote)의 62.4 / 160.4 / 308.4 ms는 streamable-http remote 행보다 각각 8 / 20 / 36 ms와 32 / 80 / 128 ms 더 크다. 이 추가분의 근거는 본문에 없고 행별 캘리브레이션 출처가 재현 패키지에 있다고만 적힌다.
- **패턴 승격 조건과 코퍼스 표의 긴장**: §III-B는 후보가 최소 2개 서버에서 독립적으로 등장해야 승격된다고 하지만, Table II는 Domain-Specific Adapter와 Proxy Aggregator를 각각 프로덕션 서버 1개에만 배정한다. 공개 서버 10개 중에는 두 패턴이 primary pattern으로 배정된 서버가 없다.
- **경계 모호성 예시의 코퍼스 초과**: §VI-A 경계 (1)이 예시로 든 `playwright`와 `selenium`은 held-out 54개 코퍼스 소속이며 Table II의 파생 코퍼스 15개에는 없다.
- **10~15 문턱의 모델 조건**: 결론(§IX)은 이 문턱을 "for current Haiku-class models"로 한정한다. Sonnet 4는 20개까지 90% 이상을 유지하므로 문턱을 모델 무관하게 인용하면 조건이 빠진다.

## 6. 관련 연구 (Related Work)

- **함수 호출 계보**: MCP는 OpenAI와 Anthropic이 도입한 function calling 능력을 확장하되 tool **구현**을 그것을 호출하는 LLM에서 분리한다. 가장 명료한 유비는 LSP다.
- **패턴 방법론**: Gamma et al.(GoF), Fowler의 엔터프라이즈 애플리케이션 패턴, Hohpe and Woolf의 통합 패턴에서 구조화 서술 형식을 차용하고 LLM 대면 API 제약에 맞춰 적용했다. 저자들은 구조적 골격이 새롭다고 주장하지 않는다. 각 골격은 고전 소프트웨어 아키텍처에 명확한 조상을 갖는다. 기여는 클라이언트가 문서 참조가 아니라 자연어 설명 읽기로 연산을 고를 때 생기는 delta이며, 이 제약은 REST, GraphQL, LSP에 없다. anti-pattern과 tool 수 한계가 애초에 등장하는 이유도 이 제약이다.
- **LLM tool use와 에이전트 아키텍처**: 선행 연구는 평가 벤치마크(ToolBench 계열 suite, function calling 벤치마크), 실행 시점에 tool을 조합하는 에이전트 아키텍처(ReAct, AutoGPT 계열 루프, LangChain), 브라우저 제어 에이전트 인프라(computer use)에 걸쳐 있다. 이들은 에이전트가 어떤 tool을 부를지 결정하는 **클라이언트측**에 집중한다. MCP는 능력 카탈로그를 어떻게 구조화하고 명명하고 묶는지의 **서버측**으로 초점을 옮긴다. 이 논문의 패턴 카탈로그는 선행 연구를 대체하지 않고 보완하며, MCP 같은 프로토콜이 존재한 뒤 서버 저자가 내리는 아키텍처 결정에 어휘를 제공한다.
- **MCP 자체를 다룬 연구**: Hou et al.은 MCP의 보안 위협과 열린 연구 방향을 서베이하고, Hasan et al.은 공개 MCP 서버에서 보안과 **유지보수성** smell을 마이닝하며, Guo et al.은 8,000개 이상 규모의 생태계를 측정한다. 이들은 생태계가 무엇을 담고 어디가 취약한지를 특성화하되 되풀이되는 서버측 설계 **구조**나 그것을 형성하는 LLM 클라이언트 제약을 카탈로그하지 않으며, 이 논문이 채우려는 빈틈이 그 지점이다. 이 논문의 anti-pattern과 Hasan et al.의 유지보수성 smell은 같은 서버들을 보는 상보적 관점이다.
- **tool 수 완화**: Gan and Sun의 RAG-MCP는 retrieval-augmented tool 선택으로 프롬프트 팽창을 완화하고, Kate et al.의 LongFuncEval은 long context 모델의 function calling 유효성을 측정한다.

## 7. 용어집 (Glossary)

- **MCP (Model Context Protocol)**: LLM을 외부 tool, 데이터 소스, 서비스에 연결하는 JSON-RPC 2.0 기반 client-server 표준. Tools, Resources, Prompts 3개 primitive를 정의한다.
- **Tool / Resource / Prompt**: MCP의 3개 primitive. 각각 이름과 자연어 설명과 JSON Schema를 갖는 호출 가능 함수, URI 주소 읽기 엔드포인트, 서버측 파라미터화 템플릿이다.
- **stdio / streamable-http**: MCP의 두 전송. 로컬 in-process 통신용과 원격 서버용(HTTP에 server-sent events 옵션)이다.
- **LLM-client delta**: 고전 패턴 대비 "LLM이 자연어 설명을 읽고 연산을 고른다"는 제약이 추가로 만들어내는 차이. 이 논문이 기여 단위로 내세우는 개념이다.
- **composite tool**: 완결된 다중 시스템 워크플로를 내부에서 처리하고 단일 요약만 반환하는 tool. Tool Orchestrator의 구성 단위다.
- **retrieval-over-tools**: 전체 tool을 나열하지 않고 요청별로 관련 tool 후보만 검색해 노출하는 기법. scoped Proxy Aggregator의 핵심이며 Gan and Sun의 RAG-MCP가 구체적 사례다.
- **static-merge / scoped**: Proxy Aggregator의 두 변형. 전자는 upstream tool의 union을 한 번에 노출하고 후자는 요청별 관련 subset만 노출한다.
- **sanitization layer**: 백엔드나 외부 콘텐츠에 주입된 지시를 LLM 도달 전에 제거하거나 이스케이프하는 계층. Resource Gateway의 필수 구성이며 Unsanitized Resource Content anti-pattern의 수정이다.
- **God Tool**: tool 하나가 크고 미분화된 schema를 받아 LLM이 "action" 인자의 의미를 추론해야 하는 anti-pattern.
- **structured error content**: 예외를 던지는 대신 tool 에러를 구조화된 내용으로 반환하는 방식. LLM이 재시도와 에스컬레이션을 판단할 수 있게 한다.
- **Cohen's κ**: rater 간 일치도를 우연 일치로 보정해 측정하는 지표. 이 논문의 0.76은 "substantial" 구간이다.
- **architecture-neutral description**: 아키텍처를 명명하지 않고 서버가 무엇을 하는지만 서술하는 분류 실험용 설명. 아키텍처를 스스로 밝히는 canonical 설명과 대비된다.

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 6 | "구성별 MCP 전송 지연의 p50, p95, p99 (로그 스케일). 행 라벨이 measured와 modeled를 구분한다" | caption-region | wiki 권장 (결과, network RTT 지배를 로그 스케일로 보여준다) |
| fig02 | 6 | "context 내 tool 수에 따른 선택 정확도와 median 지연 (Claude Haiku 4.5와 Claude Sonnet 4, 버킷당 200건, ANSYR 프로덕션 로그). 음영 구간이 권장 범위인 tool 10개 이하다" | caption-region | wiki 강력 권장 (핵심 결과이며 8개 버킷 값과 500 ms 예산선은 그림에만 있다) |
| tab01 | 2 | "MCP 패턴 5종의 고전 조상과 LLM-client delta 대조표" | table-region | 본문 표로 재현 (§3에 옮김) |
| tab02 | 2 | "패턴 카탈로그를 도출한 MCP 서버 15개 코퍼스. 공개 서버는 구현 저장소를 밝히고 ANSYR 프로덕션 서버는 익명화했다" | table-region | 본문 표로 재현 (§3에 옮김) |
| tab03 | 6 | "MCP 전송 지연표. measured 행은 loopback 종단 측정(100회 호출과 warm-up 10회)이고 modeled 행은 loopback 오버헤드에 same-region network RTT 캘리브레이션을 더한 값으로 직접 측정이 아니다" | table-region | 본문 표로 재현 (§4에 옮김) |

**크롭 결함과 재크롭 좌표**: `md5sum` 중복 배정은 없었다(5개 파일 모두 해시가 다르다). 다만 크롭을 열어 보면 표 2건이 영역을 잘못 잡았다. 두 항목에 `low_confidence: true`를 달았고, 재크롭은 사람이 지시할 때만 수행한다.

- Table I 크롭은 페이지 양단을 다 잡아 대상 표 외에 Table II 전체와 §II-B 산문까지 들어왔다. 대상 표는 왼쪽 단에만 있다. 재크롭 후보 좌표는 `--bbox tab01=2:0.070,0.100,0.465,0.256`이다.
- Table III 크롭은 세로 범위가 짧아 캡션 꼬리와 헤더, 첫 데이터 행만 잡혔다. 데이터 행 5개 중 4개가 잘렸고 오른쪽으로는 Fig. 1 영역까지 들어왔다. 재크롭 후보 좌표는 `--bbox tab03=6:0.075,0.098,0.455,0.330`이다.

표 3개는 본문 markdown 표로 재현하는 편이 RAG와 가독성에 유리하므로 §3과 §4에 옮겼다. 코드 Listing 1부터 4까지는 패턴별 핵심 스니펫이므로 wiki에는 구조 요지만 서술한다.
