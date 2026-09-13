---
title: "Headroom 컨텍스트 압축 자료 지도와 근거 등급"
type: overview
year: 2026
category: overviews
source_collection: synthesis
sources:
  - headroomlabs-ai-headroom.md
  - tosea-2026-how-to-use-headroom-context.md
  - subratpati-2026-building-cost-efficient-agents-with.md
  - nedai-2026-headroom-token-compression-guide.md
  - 9bow-2026-headroom-ai-agent-context-compression.md
  - yongkyun-2026-cutting-llm-token-costs-with.md
tags: [headroom, context-compression, token-reduction, ai-agents, proxy, mcp, ccr, cache-alignment, cross-agent-memory, cost-optimization, local-first, prompt-caching, self-reported-benchmark, counterfactual-replay, rtk, caveman, cursor, claude-code, overview, synthesis]
study_path:
  - id: agents/9bow-2026-headroom-ai-agent-context-compression
    note: "가장 짧은 진입점. Headroom이 어디에 놓이는 계층인지와 특징 세 가지의 이름을 먼저 잡는다."
  - id: agents/subratpati-2026-building-cost-efficient-agents-with
    note: "토큰이 왜 예산 문제인지를 금액으로 확인한다. 도입을 검토할 이유가 여기서 정해진다."
    prereq: ["agents/9bow-2026-headroom-ai-agent-context-compression"]
  - id: agents/tosea-2026-how-to-use-headroom-context
    note: "다섯 연결 방식 중 무엇을 언제 고르는지와 네이티브 compaction과의 스코프 차이를 확인한다."
    prereq: ["agents/9bow-2026-headroom-ai-agent-context-compression"]
  - id: agents/nedai-2026-headroom-token-compression-guide
    note: "Cursor에 proxy로 붙이는 구체 절차와 Windows 인코딩 함정을 확인한다. 방식 선택이 끝난 뒤 읽는다."
    prereq: ["agents/tosea-2026-how-to-use-headroom-context"]
  - id: agents/headroomlabs-ai-headroom
    note: "1차 자료. 앞선 소개글의 수치와 구성이 어디서 나왔는지 대조하는 기준이며 출력 절감과 라이선스는 여기에만 있다."
    prereq: ["agents/tosea-2026-how-to-use-headroom-context"]
  - id: agents/yongkyun-2026-cutting-llm-token-costs-with
    note: "공개 수치를 실제 트래픽에 재생한 유일한 독립 측정. 앞의 다섯 자료가 옮긴 값의 분모를 바꿔 본다."
    prereq: ["agents/headroomlabs-ai-headroom"]
---

## 요약

Headroom은 AI 에이전트가 읽어들이는 텍스트를 LLM에 닿기 전에 줄이는 context compression layer다. 압축 대상은 tool 출력과 로그, RAG 청크, 파일 내용, 대화 이력이며, 검색 품질을 개선해 읽을 양을 줄이는 대신 이미 확보된 텍스트의 부피만 줄인다는 점이 설계의 출발점이다. 이 규정은 [[agents/headroomlabs-ai-headroom]]과 [[agents/9bow-2026-headroom-ai-agent-context-compression]]이 같은 내용으로 적는다.

이 overview는 그 도구를 다루는 여섯 자료를 한 지도 위에 올린다. 1차 자료인 저장소 README 한 편, 영어 사용 안내 한 편, 비용 관점 소개 한 편, 한국어 how-to 한 편, 한국어 커뮤니티 소개 한 편, 그리고 공개 수치를 실제 트래픽에 재측정한 리포트 한 편이다.

여섯을 나란히 놓아야 보이는 것이 세 가지다. 첫째, 자료마다 담당하는 범위가 달라서 어떤 질문을 어디서 답해야 하는지가 정해진다. 둘째, 같은 도구를 두고 압축률 표기와 압축기 목록이 자료마다 어긋난다. 셋째, Headroom의 성능을 말하는 수치 가운데 저장소 바깥에서 측정된 것은 [[agents/yongkyun-2026-cutting-llm-token-costs-with]] 한 편뿐이다.

세 번째가 이 페이지의 핵심 발견이다. 나머지 다섯 자료가 싣는 절감률과 정확도는 전부 저장소 자신이 발표한 값이거나 그 값을 옮긴 것이다. 그리고 유일한 독립 측정은 같은 도구를 두 조건에서 재서, 도구를 위해 만들어진 콘텐츠에서는 공개 범위가 재현되지만 저자의 실제 Claude Code 트래픽에서는 절감률 중간값이 25%로 내려가고 청구액 기준으로는 2.8%만 줄어든다는 결과를 냈다. 따라서 아래의 모든 절감률 서술은 어느 분모 위에서 잰 값인지를 함께 읽어야 한다.

## 배경

### 여섯 자료가 공유하는 문제 설정

여섯 자료는 모두 같은 관찰에서 출발한다. 에이전트가 한 턴에 소비하는 토큰의 대부분은 사람이 쓴 프롬프트가 아니라 기계가 만들어낸 텍스트라는 것이다.

문제의 규모를 각 자료가 다른 단위로 제시한다. [[agents/tosea-2026-how-to-use-headroom-context]]는 실패하는 테스트의 출력 1만 2,000 토큰 가운데 대부분이 반복 경고와 통과한 테스트 이름이고 실제 실패 원인은 중간에 묻혀 있다는 사례를 든다. [[agents/subratpati-2026-building-cost-efficient-agents-with]]는 같은 문제를 금액으로 옮겨, 입력 4만 5,000 토큰을 소비하는 세션이 GPT-4o 가격 기준으로 유저당 하루 약 11.25달러라고 적는다. [[agents/headroomlabs-ai-headroom]]은 코드 검색 결과 100건의 원본 크기가 1만 7,765 토큰이라는 측정값으로 같은 지점을 짚는다.

[[agents/tosea-2026-how-to-use-headroom-context]]는 이 대상에 operational context라는 이름을 붙인다. operational context는 에이전트가 작업 중 만들어내는 tool call 출력과 로그, 파일 내용, 검색 결과를 통칭하는 표현이며, 제공자가 자체 제공하는 compaction이 다루는 대화 이력과 구분된다. compaction은 길어진 대화 이력을 요약으로 접어 context window 한계 안에서 세션을 이어가는 처리다. 이 구분이 Headroom의 자리를 정한다. 네이티브 compaction은 대화 이력을 줄이므로 에이전트가 작업 중 생산하는 출력물에는 직접 손대지 않는다.

### 자료군의 구성

여섯 자료는 성격이 셋으로 나뉜다.

| 성격 | 자료 | 이 성격의 자료가 하는 일 |
|---|---|---|
| 1차 자료 | [[agents/headroomlabs-ai-headroom]] | 스펙, 아키텍처, 설치, 라이선스, 자체 벤치마크의 원본 |
| 소개와 사용 안내 | [[agents/tosea-2026-how-to-use-headroom-context]], [[agents/subratpati-2026-building-cost-efficient-agents-with]], [[agents/nedai-2026-headroom-token-compression-guide]], [[agents/9bow-2026-headroom-ai-agent-context-compression]] | 1차 자료를 각기 다른 독자에게 옮기고 일부를 자기 관점으로 재구성 |
| 독립 측정 | [[agents/yongkyun-2026-cutting-llm-token-costs-with]] | 공개 수치를 저자 본인 트래픽에 다시 계산해 청구액 기준 절감을 낸다 |

가운데 네 편은 근거 상태가 같다. 각 페이지가 스스로 밝히듯 `raw/articles/`에 남은 본문이 원문 전문이 아니라 `WebFetch`로 취득한 요약 추출본이다. 그래서 이 네 편에 대해서는 절 제목과 표 수치와 명령이 보존된 반면 원문 산문 단위의 인용은 불가능하다. 이 제약이 아래 여러 판정의 폭을 정한다.

## 자료 지도

### 자료 역할 대응표

여섯 자료는 같은 도구를 다루지만 단독으로 답할 수 있는 질문이 서로 다르다. 아래 대응은 각 페이지가 자기 `## 관련 페이지` 절에 적어 둔 역할 분담과 일치한다.

| 자료 | 유형 | 이 자료가 단독으로 답하는 것 | 이 자료가 다루지 않는 것 |
|---|---|---|---|
| [[agents/headroomlabs-ai-headroom]] | repo README | 요청 lifecycle 11단계, 압축기 이름, 도입 형태 네 가지, 출력 토큰 절감, extras 구성, 에이전트별 호환 상태, 사내망 TLS 대응, Apache 2.0과 상용 지원 구분 | 제3자 측정, 실사용 함정, 도입 비용 환산 |
| [[agents/tosea-2026-how-to-use-headroom-context]] | 영어 사용 안내 | 다섯 연결 방식의 선택 규칙, 도입하지 말아야 할 여섯 조건, 네이티브 compaction과의 4행 비교표, 데이터 경로 점검 항목 | 구현 클래스 단위 구조, 라이선스, 출력 절감 |
| [[agents/subratpati-2026-building-cost-efficient-agents-with]] | 비용 관점 소개 | 토큰 소비 세 지점과 대응 구성 요소의 일대일 대응, 압축률의 금액 환산 | 압축률 측정 방법론, 설치 절차, 구성 요소 전수 |
| [[agents/nedai-2026-headroom-token-compression-guide]] | 한국어 how-to | Cursor Base URL 교체 절차, 코멘트에서 나온 `PYTHONUTF8=1` 인코딩 대응 | 방식 선택 기준, 벤치마크 방법론, 압축 손실 |
| [[agents/9bow-2026-headroom-ai-agent-context-compression]] | 한국어 커뮤니티 소개 | 한국어 커뮤니티 유입 시점과 전달 요지, 공식 문서 사이트 주소 | 압축기 이름, 되불러오기 기능, 정확도 네 종목 |
| [[agents/yongkyun-2026-cutting-llm-token-costs-with]] | 독립 측정 리포트 | 고정 페이로드 측정과 500개 세션 재생, live zone 경계, 행 선택 알고리즘, prompt caching 요율별 지출 구성, 공급망 리스크 | 제품 스펙, 설치 절차, 라이선스 |

표를 가로로 읽으면 자료군의 빈 곳도 드러난다. 어느 자료도 압축으로 잃은 정보가 어떤 과제에서 실제 오답을 만드는지를 검증하지 않았고, 저장소 코드를 읽어 README의 구조 서술을 확인한 자료도 [[agents/yongkyun-2026-cutting-llm-token-costs-with]] 한 편뿐이다.

### 무엇을 알고 싶을 때 어디로 가는가

| 알고 싶은 것 | 갈 곳 |
|---|---|
| Headroom이 무엇이고 어디에 놓이는가 | [[agents/9bow-2026-headroom-ai-agent-context-compression]] |
| 도입하면 비용이 얼마나 줄어드는가 | [[agents/subratpati-2026-building-cost-efficient-agents-with]]가 기대치를, [[agents/yongkyun-2026-cutting-llm-token-costs-with]]가 실측을 준다 |
| 어느 연결 방식을 고를 것인가 | [[agents/tosea-2026-how-to-use-headroom-context]] |
| Cursor에 붙이는 구체 절차 | [[agents/nedai-2026-headroom-token-compression-guide]] |
| 내부 구조와 압축기 이름 | [[agents/headroomlabs-ai-headroom]]과 [[agents/yongkyun-2026-cutting-llm-token-costs-with]] |
| 설치 옵션, 라이선스, 상용 지원 범위 | [[agents/headroomlabs-ai-headroom]] |
| 출력 토큰까지 줄이는 기능 | [[agents/headroomlabs-ai-headroom]]에만 있다 |
| 공개 수치를 믿어도 되는가 | [[agents/yongkyun-2026-cutting-llm-token-costs-with]] |
| 도입하지 말아야 할 조건 | [[agents/tosea-2026-how-to-use-headroom-context]]가 여섯 가지, [[agents/headroomlabs-ai-headroom]]이 두 가지를 적는다 |

## 핵심 개념

여섯 자료를 가로질러 읽으려면 개념 다섯 가지의 표기를 먼저 맞춰야 한다. 자료마다 같은 대상을 다른 이름으로 부르는 경우가 있어서다.

**content routing**은 입력의 콘텐츠 유형을 판별해 유형별 압축기로 보내는 단계다. JSON에서 안전하게 지울 수 있는 것과 코드에서 안전하게 지울 수 있는 것이 다르므로 하나의 압축기로 일괄 처리하지 않는다는 발상이다. 이 단계를 [[agents/headroomlabs-ai-headroom]], [[agents/9bow-2026-headroom-ai-agent-context-compression]], [[agents/nedai-2026-headroom-token-compression-guide]]는 `ContentRouter`라는 구성 요소 이름으로 부르고, [[agents/tosea-2026-how-to-use-headroom-context]]는 이름 없이 기능으로만 적는다.

**CCR**은 Compress-Cache-Retrieve의 약어이며 압축 원본을 로컬에 남겨 두었다가 모델이 요청하면 되돌려 주는 구조다. 손실 압축이 필요한 세부까지 지울 위험을 되불러오기로 보완한다. [[agents/headroomlabs-ai-headroom]]은 되불러올 수 있는 기간을 설정된 TTL 안으로 한정한다고만 적고, [[agents/yongkyun-2026-cutting-llm-token-costs-with]]는 그 기간을 5분으로 특정한다. 두 값이 모순은 아니지만 확인 시점이 다르므로 구체 수치가 필요하면 뒤쪽 자료를 근거로 든다.

**cache alignment**는 요청 앞부분의 prefix를 안정된 형태로 유지해 제공자 측 KV 캐시가 실제로 적중하도록 맞추는 처리다. 압축이 매 요청마다 prefix를 바꾸면 캐시가 무효화되어 절감분보다 손실이 커질 수 있다. 이 메커니즘을 설명하는 자료는 [[agents/headroomlabs-ai-headroom]]이다. [[agents/subratpati-2026-building-cost-efficient-agents-with]]는 timestamp와 UUID 같은 동적 콘텐츠가 캐싱을 무력화한다는 현상만 적고 원인을 캐시 적중 실패로 규정하지는 않는다.

**live zone**은 [[agents/yongkyun-2026-cutting-llm-token-costs-with]]만 쓰는 표현으로, 요청 본문 가운데 마지막 캐시 마커 이후의 아직 캐시되지 않은 꼬리 부분을 가리킨다. 압축기가 다시 쓸 수 있는 유일한 영역이며, 이 경계를 넘어 오래된 메시지까지 고치면 캐시가 깨져 손해가 난다. cache alignment가 무엇을 지키는 처리인지를 가장 구체적으로 보여주는 개념이다.

**반사실 재생**은 어떤 도구를 켰다면 청구액이 얼마였을지를 이미 기록된 세션 로그에서 턴 단위로 다시 계산하는 방법이다. [[agents/yongkyun-2026-cutting-llm-token-costs-with]]의 두 번째 실험이 이 방법을 쓴다. 도구를 실제로 켜고 에이전트를 다시 실행하지 않으므로 과거 트래픽 구성을 그대로 유지한 채 비교할 수 있다.

## 여섯 자료가 함께 그리는 구조

### 요청 처리 순서

[[agents/headroomlabs-ai-headroom]]이 기록한 요청 lifecycle은 11단계이며, 이름이 처리 순서를 그대로 드러낸다. 입력을 받고, 캐시 정렬을 적용하고, 유형을 판별해 라우팅하고, 압축하고, 메모리에 기록한 뒤 제공자로 보낸다. 같은 페이지가 인용한 README 도식은 `CacheAligner`가 먼저 오고 `ContentRouter`와 CCR이 뒤따르며, 유형별 압축기가 `ContentRouter` 아래 갈라지는 형태다.

여기서 주목할 점은 압축과 메모리 기록이 별개 기능이 아니라 같은 요청 처리 흐름 안에 나란히 배치돼 있다는 것이다. lifecycle에 `Input Remembered` 단계가 들어 있고, cross-agent memory가 그 단계에 대응한다.

구성 요소를 셋으로 요약한 자료는 [[agents/subratpati-2026-building-cost-efficient-agents-with]]다. 이 글은 토큰 소비 지점 세 가지에 구성 요소 셋을 일대일로 대응시킨다. 다만 세 번째 이름인 Context Manager는 README에 같은 이름으로 등장하지 않으며, 해당 페이지가 그 사실을 직접 밝혀 둔다. 구성 요소 목록이 필요하면 1차 자료 쪽을 근거로 쓴다.

### 압축 방식 대응표

압축기 구성은 자료마다 기록이 다르다. 1차 자료가 적은 목록과 독립 측정 리포트가 적은 목록이 겹치면서도 어긋난다.

| 압축기 또는 전략 | 대상 콘텐츠 | 기록한 자료 |
|---|---|---|
| SmartCrusher | JSON, 반복 구조 레코드 배열 | [[agents/headroomlabs-ai-headroom]], [[agents/yongkyun-2026-cutting-llm-token-costs-with]] |
| CodeCompressor | 소스 코드, AST 인지 압축 | [[agents/headroomlabs-ai-headroom]]. 같은 대상을 CodeAware로 적은 것은 [[agents/yongkyun-2026-cutting-llm-token-costs-with]] |
| Kompress-v2-base | 산문, 에이전트 trace로 학습한 모델 | [[agents/headroomlabs-ai-headroom]]. Kompress로 줄여 적은 것은 [[agents/yongkyun-2026-cutting-llm-token-costs-with]] |
| 이미지 압축 | 이미지, 40~90% 축소 | [[agents/headroomlabs-ai-headroom]]만 |
| Search | 검색 결과 행을 점수화해 상위만 남긴다 | [[agents/yongkyun-2026-cutting-llm-token-costs-with]]만 |
| Log | 빌드 출력 | [[agents/yongkyun-2026-cutting-llm-token-costs-with]]만 |
| Diff | git diff | [[agents/yongkyun-2026-cutting-llm-token-costs-with]]만 |
| HTML | HTML | [[agents/yongkyun-2026-cutting-llm-token-costs-with]]만 |

두 목록이 갈리는 이유를 확정할 근거는 이 저장소에 없다. 1차 자료는 유형을 JSON과 코드와 산문과 이미지 넷으로 적고, 독립 측정은 라우터가 인식하는 유형을 일곱으로 적으며 여기에 더해 Rust 프록시가 네 유형만 네이티브로 압축한다는 사실을 덧붙인다. 두 자료가 서로 다른 판본을 읽었을 가능성이 가장 단순한 설명이지만, 어느 자료에도 확인한 버전 표기가 없다. 따라서 압축기 이름을 인용할 때는 어느 자료를 근거로 삼았는지 함께 밝히는 편이 안전하다.

소개글 넷은 압축기 이름을 그만큼 다루지 않는다. [[agents/9bow-2026-headroom-ai-agent-context-compression]]과 [[agents/nedai-2026-headroom-token-compression-guide]]는 `ContentRouter`라는 이름과 유형 예시만 적고 개별 압축기 이름은 싣지 않으며, [[agents/tosea-2026-how-to-use-headroom-context]]는 구성 요소를 기능 이름 일곱 가지로 나열한다.

### 연결 방식과 선택 규칙

붙이는 경로를 몇 가지로 세는지도 자료마다 다르다. [[agents/tosea-2026-how-to-use-headroom-context]]는 다섯으로 세고, [[agents/headroomlabs-ai-headroom]]은 도입 형태를 넷으로 세면서 cross-agent memory를 메모리 기능으로 따로 둔다. [[agents/nedai-2026-headroom-token-compression-guide]]는 한국어 독자를 위해 셋으로 줄인다.

| 연결 방식 | 코드 변경 | 적합한 상황 | 이 방식을 다룬 자료 |
|---|---|---|---|
| Library | 필요 | 커스텀 에이전트나 RAG 파이프라인을 직접 만들고 압축 시점을 세밀하게 제어한다 | tosea, repo, subratpati |
| Proxy | 없음 | 앱을 고치지 않고 절감 규모부터 재 본다. 실험 단계의 출발점 | tosea, repo, subratpati, nedai, 9bow |
| 코딩 에이전트 래핑 | 없음 | 이미 쓰는 코딩 에이전트를 그대로 두고 감싼다 | tosea, repo, nedai, 9bow |
| MCP 서버 | 없음 | 모델이 작업 중 필요한 시점에 압축을 직접 호출하게 한다 | tosea, repo, nedai, 9bow |
| Cross-agent memory | 경우에 따라 | 여러 에이전트가 같은 컨텍스트를 다시 읽지 않게 한다 | tosea, repo |

선택 기준을 규칙으로 압축한 자료는 [[agents/tosea-2026-how-to-use-headroom-context]] 하나다. 판단 기준은 압축률이 아니라 도구를 쓰는 형태이며, 코딩 에이전트를 쓰면 래퍼, 코드 변경을 최소화하려면 proxy, 자체 앱을 만들면 library, MCP 네이티브 클라이언트를 쓰면 MCP 서버다. 같은 페이지는 실험 단계에서 proxy가 가장 쉬운 출발점이라고 본다. 앱을 고치지 않고 절감 규모를 먼저 잰 다음 library로 옮기는 순서가 성립하기 때문이다.

Cursor를 어느 방식으로 붙이는지는 자료마다 서술이 다르므로 하나로 단정할 수 없다. [[agents/headroomlabs-ai-headroom]]은 Cursor를 wrap 대상 목록에 두되 수동 설정으로 표시하고 proxy의 base URL을 출력해 사용자가 설정에 입력하게 한다고 적는다. [[agents/tosea-2026-how-to-use-headroom-context]]는 Q&A에서 지원되며 설정 지침이 출력된다고만 답한다. [[agents/nedai-2026-headroom-token-compression-guide]]는 proxy를 Cursor용 경로로 소개하고 Base URL을 `http://localhost:8787`로 바꾸는 절차를 적는데, 래핑보다 proxy를 권하는 조언 자체는 저자의 결론이 아니라 코멘트 작성자의 의견이라고 같은 페이지가 구분해 둔다.

## 수치와 근거 등급

### 절감률 표기가 자료마다 다르다

같은 도구의 절감률을 자료들이 다른 숫자로 적는다. 이 불일치는 overview 단위에서만 보이는 것이라 먼저 정리한다.

| 자료 | 적은 절감률 | 근거로 든 것 |
|---|---|---|
| [[agents/headroomlabs-ai-headroom]] | 60~95% | README 표제와 워크로드 4행 표(47~92%) |
| [[agents/9bow-2026-headroom-ai-agent-context-compression]] | 60~95% | 저장소 표 3행. 절감률이 가장 낮은 47% 행이 빠졌다 |
| [[agents/nedai-2026-headroom-token-compression-guide]] | 60~95% | 저장소 설명 문장 인용. 표는 싣지 않는다 |
| [[agents/tosea-2026-how-to-use-headroom-context]] | 47~92% | 저장소 표 4행 전부. 유지보수자 자체 벤치마크임을 밝힌다 |
| [[agents/subratpati-2026-building-cost-efficient-agents-with]] | 40~90% | 출처 미기재 |
| [[agents/yongkyun-2026-cutting-llm-token-costs-with]] | 공개값 60~95%를 인용하되 실측은 고정 페이로드 중간값 54%, 실제 트래픽 중간값 25% | 저자 직접 측정 |

두 가지가 드러난다. 첫째, 저장소가 내세우는 60~95%의 하한 60%는 자체 표의 최저 행 47%보다 높다. [[agents/9bow-2026-headroom-ai-agent-context-compression]]이 바로 그 47% 행을 빠뜨린 채 60~95%를 함께 실어 범위가 더 좁아 보인다. 둘째, [[agents/subratpati-2026-building-cost-efficient-agents-with]]의 40~90%는 다른 다섯 자료 어디와도 맞지 않으며 해당 페이지가 이 차이를 직접 지적한다. 절감률을 인용할 때 출처를 함께 밝혀야 하는 이유가 여기에 있다.

### 수치 출처 판정표

이 절의 목적은 값을 모으는 것이 아니라 각 값이 누구의 측정인지를 밝히는 것이다. 오른쪽 두 열이 그 판정이다.

| 수치 | 값 | 저장소 내 출처 | 원 출처 | 자기 보고 | 독립 검증 |
|---|---|---|---|---|---|
| 토큰 절감 범위 | 60~95% | repo, 9bow, nedai | 저장소 README 표제 | 예 | 아니오 |
| 토큰 절감 범위 | 40~90% | subratpati | 글에 출처 표기 없음 | 예 | 아니오 |
| 워크로드 절감 4행 | 47%에서 92% | repo, tosea(4행), 9bow(3행) | 저장소 자체 벤치마크 | 예 | 아니오 |
| GSM8K | 0.870에서 0.870 | repo, 9bow | 저장소 eval, 표본 100건 | 예 | 아니오 |
| TruthfulQA | 0.530에서 0.560 | repo | 저장소 eval, 표본 100건 | 예 | 아니오 |
| SQuAD v2와 BFCL | 각각 97% | repo | 저장소 eval, baseline 미기재 | 예 | 아니오 |
| 정확도 보존 | 95% 이상 | subratpati | 내장 평가 도구 | 예 | 아니오 |
| 출력 토큰 절감 | 31.7%, 95% 신뢰구간 27.7%에서 35.7% | repo | 저장소 자체 추정. 원래 출력을 알 수 없는 값이라 추정치로 보고 | 예 | 아니오 |
| 커뮤니티 누적 절감 | 590억 토큰, 23만 5,900달러, 190만 요청 | tosea, subratpati | 커뮤니티 대시보드 집계. 집계 기간과 방법 미기재 | 예 | 아니오 |
| 세션 비용 | 입력 4만 5,000 토큰이 하루 11.25달러 | subratpati | 저자 계산. 중간 단계가 수집본에 없다 | 저자 추정 | 아니오 |
| grep과 git diff 절감 | 중간값 54% | yongkyun | 저장소 4곳에서 캡처한 고정 페이로드 | 아니오 | 예 |
| 실제 트래픽 활성화율과 절감률 | 페이로드의 45%에서 활성화, 중간값 25% | yongkyun | 저자 세션 6억 1,400만 토큰 재생 | 아니오 | 예 |
| 청구액 절감 | 2.8% | yongkyun | 같은 재생, 기준선 지출 926.31달러 | 아니오 | 예 |

판정의 결론은 두 가지다. 첫째, Headroom의 성능을 말하는 값 가운데 저장소 바깥에서 측정된 것은 [[agents/yongkyun-2026-cutting-llm-token-costs-with]]의 세 행뿐이다. 나머지는 전부 저장소 자체 측정이거나 그 값의 재인용이며, 재인용한 자료 중 [[agents/tosea-2026-how-to-use-headroom-context]]만 유지보수자 자체 벤치마크라는 단서를 달고 `headroom stats`로 자기 환경에서 재측정할 것을 권한다.

둘째, 저장소 자체 벤치마크 안에도 등급 차이가 있다. GSM8K와 TruthfulQA는 압축 전후 값이 모두 있어 비교가 성립하지만 SQuAD v2와 BFCL은 baseline 칸이 비어 있다. [[agents/headroomlabs-ai-headroom]]은 이 두 항목이 해당 압축률에서의 정확도만 보고한 값이라 정확도 유지의 근거로 쓰기에는 정보가 부족하다고 스스로 적는다. 네 항목 모두 표본이 100건이라는 점도 함께 고려해야 한다.

### 독립 재측정이 드러낸 세 계층

[[agents/yongkyun-2026-cutting-llm-token-costs-with]]는 공개 수치가 과장이라고 말하지 않는다. 도구를 위해 만들어진 콘텐츠에서는 공개 범위가 그대로 재현되며, 저자 본인의 측정에서도 grep 덤프가 최대 99%까지 줄었다. 두 결과가 갈리는 것은 잰 대상이 다르기 때문이며 그 차이를 저자는 세 계층으로 나눈다.

| 계층 | 저장소 벤치마크가 재는 것 | 실제 트래픽 재생이 재는 것 |
|---|---|---|
| 분모 | 단일 페이로드 하나 | 세션 청구액 전체 |
| 워크로드 | 압축이 가장 잘 되는 콘텐츠 유형 | 실제 트래픽의 유형 구성 |
| 가격 책정 | 토큰 개수 | 토큰 종류별 단가 |

분모 계층이 가장 직관적이다. 저장소 표의 코드 검색 페이로드를 92% 압축하면 약 1만 6,000 토큰이 지워지는데, 저장소는 이 값을 그 페이로드 크기 1만 7,765로 나눠 92%를 얻고 재생은 같은 값을 수백 턴에 걸친 세션 청구액 전체로 나눠 2.8%를 얻는다.

워크로드 계층이 세 계층 중 간극이 가장 크다. 저장소 표의 코드 검색 행은 Elasticsearch 형태 JSON 레코드 100건을 뽑아내는 생성기에서 나온 합성 페이로드이며 실제 트래픽에서 캡처한 것이 아니라고 [[agents/yongkyun-2026-cutting-llm-token-costs-with]]가 밝힌다. 저자의 실제 워크로드에서는 대부분의 페이로드가 중복이 적은 평문과 소스 코드였고, 그 결과 압축기는 페이로드의 45%에서만 활성화됐으며 절감률 중간값은 25%였다. 중복 행을 지우는 고압축 전략이 발동한 경우는 2,781건의 활성화 중 46건에 그쳤다.

가격 책정 계층은 소개글 어느 편도 다루지 않는 지점이다. 저자 표본의 926달러 지출은 cache write가 42%, output이 29%를 차지하는데 Headroom의 절감은 대부분 cache read에 떨어진다. 압축한 tool 결과가 컨텍스트에 들어간 뒤 매 턴 cache read 요율로 재전송되기 때문이며, cache read는 fresh input의 10분의 1 단가로 청구서에서 가장 싼 토큰이다.

같은 구조가 반대 방향으로 작동하기도 한다. 한 번 압축한 페이로드가 세션 내내 재전송되므로 첫 턴 절감이 세션 전체에서는 약 27배로 늘어난다. 다만 이 배수는 500개 세션에서 compaction 이벤트가 2건만 관찰된 조건의 상한이며, compaction이 잦은 환경에서는 더 작아진다고 저자가 단서를 단다.

## 도입하지 말아야 할 조건

여섯 자료 중 셋이 부적합 조건을 명시한다. 조건의 수가 자료마다 다르므로 출처를 나누어 적는다.

| 조건 | 성격 | 이 조건을 적은 자료 |
|---|---|---|
| 단일 제공자의 네이티브 compaction으로 충분하고 cross-agent memory가 필요 없다 | 필요한 스코프가 대화 이력에 한정된다 | repo, tosea |
| 로컬 프로세스를 실행할 수 없는 sandbox 환경이다 | local-first 설계의 전제가 성립하지 않는다 | repo, tosea |
| AI 도구를 가끔만 쓴다 | 절감 총량이 도입 비용을 넘지 않는다 | tosea |
| 프롬프트가 짧다 | 압축할 여지 자체가 적다 | tosea |
| proxy나 wrapper를 환경에 추가할 수 없다 | 연결 경로가 막힌다 | tosea |
| 매번 전체 원문이 필요한 워크플로다 | 기본 노출량을 줄이는 목적과 충돌한다 | tosea |
| 기본 Read 도구를 많이 쓰고 셸 명령이 적다 | 파일 read에는 접을 중복 행이 없다 | yongkyun |
| 청구액이 cache write와 output에 몰려 있다 | 압축이 닿는 토큰 종류가 아니다 | yongkyun |

앞의 여섯과 뒤의 둘은 성격이 다르다. 앞의 여섯은 도구를 붙일 수 없거나 붙여도 압축할 것이 없는 조건이고, 뒤의 둘은 도구가 정상 동작해도 청구서가 거의 움직이지 않는 조건이다. 뒤의 둘은 [[agents/yongkyun-2026-cutting-llm-token-costs-with]]가 실제 트래픽을 재고 나서야 나온 기준이라 소개글에서는 얻을 수 없다.

반대로 절감이 커지는 조건도 같은 자료가 정리한다. 반복 구조 tool 결과가 많으면 고압축 전략의 발동 빈도가 올라가고, 세션이 길고 compaction이 드물면 압축한 페이로드가 cache read로 재전송되며 절감이 누적된다.

## 학습 경로

아래 여섯 단계는 frontmatter의 `study_path`와 같은 순서다. 개념 진입에서 시작해 도입 판단과 1차 자료를 거쳐 독립 검증으로 끝난다.

1. [[agents/9bow-2026-headroom-ai-agent-context-compression|headroom 한국어 소개]]. 가장 짧은 진입점이다. 압축 계층의 위치와 특징 세 가지의 이름을 잡는다. 이 글의 표에서 47% 행이 빠져 있다는 사실을 기억해 두면 뒤에서 대조 지점이 된다.
2. [[agents/subratpati-2026-building-cost-efficient-agents-with|Cost-Efficient Agents]]. 토큰이 왜 예산 문제인지를 금액으로 확인한다. 입력 4만 5,000 토큰 세션이 하루 11.25달러라는 환산이 도입 검토의 출발점이 된다.
3. [[agents/tosea-2026-how-to-use-headroom-context|How to Use Headroom]]. 다섯 연결 방식 중 무엇을 언제 고를지와 네이티브 compaction과의 스코프 차이를 확인한다. 도입하지 말아야 할 여섯 조건도 여기에 있다.
4. [[agents/nedai-2026-headroom-token-compression-guide|Headroom 사용 방법]]. Cursor에 proxy로 붙이는 절차를 명령 단위로 확인한다. 방식 선택이 끝난 뒤 읽어야 의미가 있으므로 세 번째 자료 다음에 둔다.
5. [[agents/headroomlabs-ai-headroom|headroom 저장소]]. 1차 자료이며 앞선 자료가 옮긴 수치와 구성의 원본이다. 출력 토큰 절감, extras 구성, 라이선스와 상용 지원 구분은 이 페이지에만 있다.
6. [[agents/yongkyun-2026-cutting-llm-token-costs-with|Cutting LLM Token Costs]]. 공개 수치를 저자 본인 트래픽에 재생한 유일한 독립 측정이다. 앞의 다섯 자료가 옮긴 값이 어느 분모 위에 서 있었는지가 여기서 드러나므로 마지막에 읽는다.

## 한계

**독립 검증 자료가 한 편뿐이다.** 여섯 자료 중 Headroom을 직접 재측정한 것은 [[agents/yongkyun-2026-cutting-llm-token-costs-with]]뿐이고, 그 한 편도 저자 개인의 Claude Code 이력에서 나온 값이라 보편 수치가 아니라고 저자가 직접 밝힌다. 나머지 다섯 자료가 싣는 성능 값은 전부 저장소 자체 측정이거나 그 재인용이다.

**네 자료의 근거가 요약 추출본이다.** [[agents/tosea-2026-how-to-use-headroom-context]], [[agents/subratpati-2026-building-cost-efficient-agents-with]], [[agents/nedai-2026-headroom-token-compression-guide]], [[agents/9bow-2026-headroom-ai-agent-context-compression]]의 `raw/` 파일은 `WebFetch`로 취득한 요약본이다. 각 페이지가 판정 근거와 함께 이를 밝히고 있으며, 그래서 표 수치와 명령은 확인되지만 원문 산문 단위의 논증과 코드 예제는 확인할 수 없다.

**경쟁 도구의 1차 자료가 없다.** [[agents/yongkyun-2026-cutting-llm-token-costs-with]]가 함께 측정한 rtk와 caveman은 이 저장소에 자체 페이지가 없다. rtk는 [[agents/headroomlabs-ai-headroom]]의 자체 비교표와 attribution 절에도 등장하지만 그 서술은 Headroom 쪽이 작성한 것이고, 도구 자신의 문서와 대조된 것이 아니다. caveman은 [[agents/yongkyun-2026-cutting-llm-token-costs-with]] 한 편이 유일한 근거다. 두 도구의 공개 절감률(rtk 60~99%, caveman 평균 65%)도 그 한 편이 인용한 값으로만 확인된다. [[agents/headroomlabs-ai-headroom]]이 비교 대상으로 든 lean-ctx와 Compresr, Token Co., OpenAI Compaction도 사정이 같다.

**판본 시점을 확인할 수 없다.** 압축기 목록이 1차 자료 기준 넷과 독립 측정 기준 일곱으로 다르고 CCR 보관 기간도 TTL 표기와 5분 표기로 갈리는데, 어느 자료에도 확인한 릴리스 표기가 없어 시점 차이인지 서술 범위 차이인지 판정할 수 없다.

**정본 저장소 경로가 갈린다.** 수집 URL은 `headroomlabs-ai/headroom`이지만 README 본문의 clone 주소와 Docker 이미지 경로는 `chopratejas/headroom`을 가리킨다. [[agents/headroomlabs-ai-headroom]]이 뒤쪽을 정본으로 판단하되 판단 근거가 그 두 가지뿐이라고 함께 적는다. [[agents/9bow-2026-headroom-ai-agent-context-compression]]은 앞쪽 주소를 안내한다.

**다루지 못한 질문이 남는다.** 압축 손실이 long-context나 다국어, 특정 도메인에서 어떻게 달라지는지는 여섯 자료 중 어느 편도 다루지 않는다. 출력 토큰 절감 기능은 [[agents/headroomlabs-ai-headroom]]만 기록하고 소개글 넷과 독립 측정 어디에서도 검증되지 않았다. cross-agent memory가 실제 멀티에이전트 운영에서 얼마나 재발견을 줄이는지를 잰 자료도 없다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| operational context | 에이전트가 작업 중 만들어내는 tool call 출력과 로그, 파일, 검색 결과의 통칭. 대화 이력과 구분되는 압축 대상이다 |
| content routing | 입력의 콘텐츠 유형을 판별해 유형별 압축기로 보내는 단계. 구성 요소 이름은 `ContentRouter`다 |
| CCR | Compress-Cache-Retrieve의 약어. 압축 전 원본을 로컬에 남겨 두고 모델이 요청하면 `headroom_retrieve`로 되돌려 주는 가역 압축 |
| cache alignment | 요청 prefix를 안정화해 제공자 KV 캐시가 실제로 적중하게 맞추는 처리. 압축으로 캐시를 잃어 총비용이 오르는 상황을 막는다 |
| live zone | 마지막 캐시 마커 이후의 아직 캐시되지 않은 요청 꼬리 부분. 압축기가 다시 쓸 수 있는 유일한 영역이다 |
| 반사실 재생 | 어떤 도구를 켰다면 청구액이 얼마였을지를 기록된 세션 로그에서 턴 단위로 다시 계산한 값 |

## 관련 페이지

커버 자료 여섯 편이다.

- [[agents/headroomlabs-ai-headroom]]: 1차 자료. 스펙, 요청 lifecycle, 압축기 이름, 도입 형태, 출력 절감, 라이선스와 상용 지원 구분을 담당한다
- [[agents/tosea-2026-how-to-use-headroom-context]]: 다섯 연결 방식의 선택 규칙과 도입하지 말아야 할 여섯 조건, 네이티브 compaction 비교표를 담당한다
- [[agents/subratpati-2026-building-cost-efficient-agents-with]]: 압축률을 금액으로 환산한 비용 관점을 담당한다. 절감률을 40~90%로 적어 다른 자료와 표기가 갈리는 자료이기도 하다
- [[agents/nedai-2026-headroom-token-compression-guide]]: Cursor Base URL 교체 절차와 Windows 한글 인코딩 대응을 담당한다
- [[agents/9bow-2026-headroom-ai-agent-context-compression]]: 한국어 커뮤니티 유입 시점과 공식 문서 사이트 주소를 담당한다
- [[agents/yongkyun-2026-cutting-llm-token-costs-with]]: 유일한 독립 측정. 고정 페이로드와 실제 트래픽 재생의 두 결과와 그 사이 세 계층을 담당한다

관련 주제의 다른 페이지다.

- [[overviews/agent-harness-engineering-overview]]: Headroom이 인프라로 들어맞는 상위 프레임을 다룬다
- [[agents/lee-hoyeon-2026-harness-engineering]]: harness 계층 이론. Headroom은 그 계층에 놓이는 실물 인프라에 해당한다
- [[agents/osmani-2026-loop-engineering]]: 에이전트 운영 루프 설계. Headroom은 그 루프의 토큰 비용을 줄이는 계층이다
- [[agents/bai-2026-how-do-ai-agents-spend]]: 코딩 에이전트의 토큰 소비 구성을 분석한 논문. 독립 측정이 실측한 지출 구성과 같은 문제를 다룬다
- [[agents/anthropic-2025-effective-context-engineering-for-ai]]: context engineering과 compaction의 설계 관점. 수명 증폭과 compaction 상한을 이해하는 배경이 된다
- [[database/li-2026-beyond-semantic-similarity-rethinking-retrieval]]: 토큰 예산을 압축이 아니라 retrieval 방식 변경으로 푸는 반대편 접근
