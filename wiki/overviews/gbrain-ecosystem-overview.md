---
title: "GBrain 생태계 자료 지도와 학습 경로"
type: overview
year: 2026
category: overviews
source_collection: synthesis
sources:
  - garrytan-gbrain.md
  - gajjar-2026-gbrain-vs-computer-memory.md
  - vectorize-2026-gbrain-review-honest-assessment.md
  - mantena-2026-hermes-gbrain-setup-vps.md
  - techwealth-hub-2026-garry-tan-gbrain-explained.md
  - liu-2026-rag-llm-wiki-or-gbrain.md
tags: [gbrain, agent-memory, overview, synthesis, karpathy-llm-wiki, compounding-memory, hybrid-search, knowledge-graph, brainbench, longmemeval, self-reported-benchmark, openclaw, hermes, dream-cycle, retrieve-compile-act, fat-skills, thin-harness, decision-framework]
study_path:
  - id: applications/techwealth-hub-2026-garry-tan-gbrain-explained
    note: "5분 45초 개괄로 brain repo, retrieval 층, 에이전트라는 3계층 어휘를 먼저 잡는다. 문서를 열기 전의 진입로."
  - id: applications/liu-2026-rag-llm-wiki-or-gbrain
    note: "GBrain이 RAG와 Karpathy LLM Wiki 사이 어디에 놓이는지 좌표를 잡는다. 도입 여부를 결정하는 질문이 여기서 정해진다."
    prereq: ["applications/techwealth-hub-2026-garry-tan-gbrain-explained"]
  - id: applications/garrytan-gbrain
    note: "1차 자료. 앞의 두 자료가 요약한 구성과 수치의 원본이며, 다른 자료의 값이 어긋날 때 대조 기준이 된다."
    prereq: ["applications/techwealth-hub-2026-garry-tan-gbrain-explained"]
  - id: applications/mantena-2026-hermes-gbrain-setup-vps
    note: "README가 30분으로 잡은 설치가 실제 서버에서 어떤 절차와 실패로 이어지는지 확인한다."
    prereq: ["applications/garrytan-gbrain"]
  - id: applications/vectorize-2026-gbrain-review-honest-assessment
    note: "잘 만들었는가와 어디까지 쓸 수 있는가를 분리해 채점한 제3자 리뷰. 도입 판단의 반대 근거가 여기에 있다."
    prereq: ["applications/garrytan-gbrain"]
  - id: applications/gajjar-2026-gbrain-vs-computer-memory
    note: "개인 운영자 범위를 넘어 조직으로 갈 때 무엇이 부족해지는지를 엔터프라이즈 제품과의 대비로 확인한다."
    prereq: ["applications/vectorize-2026-gbrain-review-honest-assessment"]
---

## 요약

GBrain은 Y Combinator의 Garry Tan이 자신의 에이전트를 운영하려고 만들어 2026년 4월 5일에 MIT 라이선스로 공개한 에이전트 메모리 시스템이다. 지식의 원본을 git으로 소유하는 markdown 저장소에 두고, 그 저장소를 Postgres로 sync해 retrieval에 쓰는 파생 인덱스를 만드는 구조다. 출시일과 라이선스는 [[applications/vectorize-2026-gbrain-review-honest-assessment]]와 [[applications/garrytan-gbrain]]이 함께 밝힌다.

이 overview는 그 시스템을 다루는 여섯 자료를 한 지도 위에 올린다. 1차 자료인 저장소 README 한 편, 제3자 리뷰 한 편, 실전 설치 기록 한 편, 개괄 영상 한 편, 그리고 대안과 견주는 비교 글 두 편이다.

여섯을 나란히 놓고 얻는 것은 개별 페이지만 읽어서는 나오지 않는 세 가지다. 첫째, 자료마다 담당하는 겹이 달라서 어떤 질문을 어디서 답해야 하는지가 정해진다. 둘째, 같은 대상을 두고 값과 서술이 갈리는 항목이 드러난다. 셋째, 여섯 자료 가운데 GBrain의 성능을 독립적으로 측정한 자료가 하나도 없다는 사실이 확인된다.

세 번째가 이 페이지에서 가장 중요한 발견이다. 이 저장소에 실린 GBrain 관련 수치는 전부 프로젝트 자신이 발표한 값이거나 그 값을 제3자가 재인용한 것이다. 리뷰조차 직접 측정 대신 공개 수치의 내부 일관성과 eval 코드의 재현 가능성을 근거로 삼았다고 스스로 밝힌다. 따라서 아래의 모든 벤치마크 서술은 자기 보고로 읽어야 한다.

## 배경

### 여섯 자료가 6주 안에 모인 경위

GBrain은 공개 직후 빠르게 퍼졌다. [[applications/vectorize-2026-gbrain-review-honest-assessment]]는 공개 24시간 만에 GitHub star 약 5,000개를 얻었고 리뷰 작성 시점에는 약 1만 4천 개에 이르렀다고 적는다. 저자는 이 확산을 기술적 실체와 유명인의 가시성이 함께 작용한 결과로 본다.

자료가 쌓인 순서는 시점이 그대로 성격을 나눈다. 공개 6일 뒤의 개괄 영상, 3주 뒤의 아키텍처 비교 에세이, 한 달 뒤의 설치 기록과 두 편의 평가 글 순이다.

| 시점 | 자료 | 그 시점에 답한 질문 |
|---|---|---|
| 2026-04-11 | [[applications/techwealth-hub-2026-garry-tan-gbrain-explained]] | 이것이 무엇이고 어떤 모양인가 |
| 2026-04-27 | [[applications/liu-2026-rag-llm-wiki-or-gbrain]] | 기존 메모리 방식과 견주면 어디에 놓이는가 |
| 2026-05-06 | [[applications/mantena-2026-hermes-gbrain-setup-vps]] | 실제 서버에 올리면 어떤 일이 생기는가 |
| 2026-05-08 | [[applications/vectorize-2026-gbrain-review-honest-assessment]] | 어디까지 쓸 수 있는가 |
| 2026-05-08 | [[applications/gajjar-2026-gbrain-vs-computer-memory]] | 조직 규모로 가면 무엇이 부족한가 |
| 2026-05-22 clone | [[applications/garrytan-gbrain]] | 저장소 자신은 무엇을 주장하는가 |

1차 자료인 저장소 README가 목록의 마지막에 있다는 점이 이 자료군의 특징이다. 다른 다섯 편은 모두 자신이 읽은 시점의 README나 공개 게시물을 근거로 삼았고, 이 저장소가 보유한 README는 그보다 나중의 판본이다. 그래서 규모 수치와 버전이 자료마다 다르며, 뒤의 불일치 절이 그 차이를 정리한다.

### 여섯 자료가 공유하는 문제 설정

자료들이 출발점으로 삼는 문제는 같다. 에이전트가 세션마다 이전 기록 없이 다시 시작한다는 것이다.

[[applications/gajjar-2026-gbrain-vs-computer-memory]]는 이 결핍을 업무 질문 두 개로 보여준다. 고객 계약 갱신 시점이 언제인지, 매출을 막고 있는 요인이 무엇인지는 문서 한 건을 찾아 답할 수 있는 종류가 아니라 누적된 이력을 알아야 답할 수 있는 종류다.

[[applications/liu-2026-rag-llm-wiki-or-gbrain]]은 같은 문제를 context window 쪽에서 설명한다. context window는 모델이 한 번에 받아들일 수 있는 토큰 길이 한도를 뜻하는데, 저자는 이를 세션이 끝날 때마다 지워지는 화이트보드에 비유한다. 한도가 100만 토큰이어도 30만에서 40만 토큰 구간, 즉 한도의 30~40% 지점에서 성능 저하가 시작되므로 한도를 늘리는 방향으로는 문제가 풀리지 않는다고 본다. 다만 이 성능 저하 수치의 출처는 원문이 밝히지 않는다.

[[applications/techwealth-hub-2026-garry-tan-gbrain-explained]]는 문제를 저장 위치 쪽에서 잡는다. 대화 이력을 그대로 쌓는 방식과 문서를 벡터로 인덱싱해 질의마다 꺼내 오는 방식 모두 원본이 어디에 있는지가 흐려진다는 공통 약점을 갖는다는 지적이다.

세 자료의 진단이 하나로 모이는 지점이 compounding이라는 개념이다. 사용할수록 저장된 내용 자체가 정돈되고 두꺼워져야 한다는 요구이며, [[applications/gajjar-2026-gbrain-vs-computer-memory]]의 마지막 문장 "Memory that compounds beats memory that just retrieves"가 이를 압축한다.

## 자료 지도

### 자료 역할 대응표

여섯 자료는 같은 대상을 다루지만 담당하는 겹이 다르다. 아래 표의 오른쪽 두 열이 이 overview의 라우팅 규칙에 해당한다.

| 자료 | 유형 | 이 자료가 단독으로 답하는 것 | 이 자료가 다루지 않는 것 |
|---|---|---|---|
| [[applications/garrytan-gbrain]] | repo README | 두 엔진과 `BrainEngine` interface, schema pack 4종, retrieval 층 구성, Minions 큐, MCP 클라이언트별 설정, 릴리스별 실패 유형 | 제3자 평가, 실제 설치 경험, 대안과의 비교 |
| [[applications/vectorize-2026-gbrain-review-honest-assessment]] | 제3자 리뷰 | 10개 항목 채점, 강점과 약점 각 6가지, 비용 내역, 설치 권장 조건과 대안 고려 조건 | 저장소 코드 검증, 직접 운영 경험 |
| [[applications/mantena-2026-hermes-gbrain-setup-vps]] | 설치 기록 | AWS EC2 배치 절차, PATH와 slug 함정, 5분 주기 sync cron, X 연동과 비용 회피 구성 | 검색 품질, 스키마 설계, 팀 공유 구성 |
| [[applications/techwealth-hub-2026-garry-tan-gbrain-explained]] | 개괄 영상 | 3계층 멘탈 모델, database primitive 4종, sync 검증 절차 7단계, skill pack 행동 규칙 | 검색 알고리즘 구성, 임베딩 제공자, 수치 측정 |
| [[applications/liu-2026-rag-llm-wiki-or-gbrain]] | 비교 에세이 | RAG와 LLM Wiki와 fat skills의 3분류, thin harness 정량, `enrich` 스킬 계약, cron 운영 규칙, 수렴 예측 | 정량 비교, 상용 메모리 제품, 규제 대응 |
| [[applications/gajjar-2026-gbrain-vs-computer-memory]] | 비교 에세이 | 개인 범위와 조직 범위의 세 가지 차이, AirSync와 SOC 2라는 엔터프라이즈 요건 | 검색 알고리즘 세부, 벤치마크, 이해관계 고지 |

표를 가로로 읽으면 자료군의 빈 곳도 드러난다. 어느 자료도 GBrain을 직접 설치해 검색 품질을 측정하지 않았고, 어느 자료도 저장소 코드를 읽어 README의 주장을 확인하지 않았다.

### 두 편의 비교 글이 서로 다른 대상을 잡는 이유

[[applications/liu-2026-rag-llm-wiki-or-gbrain]]과 [[applications/gajjar-2026-gbrain-vs-computer-memory]]는 모두 비교 에세이지만 비교의 기준면이 다르다.

Liu는 아키텍처 계보를 따라 가로로 자른다. 같은 개인 규모 안에서 retrieve와 compile과 act 중 무엇을 하느냐로 세 방식을 나눈다. Gajjar는 운영 단위를 따라 세로로 자른다. 같은 compounding 원리를 개인이 쓰느냐 조직이 쓰느냐로 두 제품을 나눈다.

두 절단면이 교차하기 때문에 GBrain의 위치가 한 점으로 좁혀진다. Liu 쪽에서는 act를 담당하는 축에 놓이고, Gajjar 쪽에서는 개인 운영자 범위에 놓인다. 이 교차가 [[applications/vectorize-2026-gbrain-review-honest-assessment]]가 Multi-tenant readiness에 5점 만점 중 1점을 준 판단과 같은 결론에 도달한다는 점이 자료군에서 가장 견고한 합의다.

## 핵심 개념

**compounding**은 사용할수록 시스템이 스스로 나아지는 성질을 가리킨다. [[applications/vectorize-2026-gbrain-review-honest-assessment]]는 이 성질이 사후에 덧붙은 기능이 아니라 설계에 들어 있다는 점을 GBrain의 가장 두드러진 특징으로 꼽는다. [[applications/liu-2026-rag-llm-wiki-or-gbrain]]은 반대 사례로 RAG를 든다. 문서를 아무리 많이 인덱싱해도 100번째 질의가 첫 번째 질의보다 나아지지 않는다는 것이다.

**source of truth와 derived index의 분리**는 이 시스템의 운영 규칙이 나오는 자리다. [[applications/techwealth-hub-2026-garry-tan-gbrain-explained]]가 인용한 문장은 "The vector database is a derived index, not the source of truth"다. 파생 인덱스가 낡으면 답도 낡으므로 인덱스가 원본을 따라잡았는지 확인하는 절차가 필수가 된다.

**compiled truth와 append-only timeline**은 페이지 하나의 내부 배치다. 상단에는 증거가 바뀔 때마다 다시 쓰이는 현재 결론이 놓이고, 하단에는 그 결론에 이르게 한 증거가 시간순으로 쌓이며 지워지지 않는다. [[applications/gajjar-2026-gbrain-vs-computer-memory]]와 [[applications/techwealth-hub-2026-garry-tan-gbrain-explained]], [[applications/vectorize-2026-gbrain-review-honest-assessment]], [[applications/liu-2026-rag-llm-wiki-or-gbrain]] 네 편이 같은 배치를 서술한다. Vectorize는 이 배치가 푸는 문제를 명시한다. 갱신할 때 옛 내용을 덮어쓰면 이력이 사라지고 계속 덧붙이면 페이지가 무한히 커지는데, 둘을 위아래로 나누면 두 요구를 함께 만족시킬 수 있다는 것이다.

**typed edge**는 페이지 사이의 관계에 이름을 붙인 것이다. [[applications/garrytan-gbrain]]은 `works_at`, `invested_in`, `attended`, `founded`, `advises`, `mentions` 같은 값을 쓰며 이 edge가 페이지를 쓸 때마다 LLM 호출 없이 문법 매칭만으로 만들어진다고 적는다.

**thin harness와 fat skills**는 GBrain의 설계 역전을 가리키는 이름이다. harness는 모델을 감싸 도구와 검증과 상태를 제공하는 실행 환경을 뜻한다. [[applications/liu-2026-rag-llm-wiki-or-gbrain]]에 따르면 GBrain은 이 harness를 약 200줄로 얇게 두고 지능을 전부 markdown 스킬 파일로 옮긴다. [[applications/garrytan-gbrain]]에서 이 기조는 `docs/ethos/`에 놓인 설계 철학으로 확인된다.

**dream cycle**은 사용자가 자는 동안 실행되는 야간 배치 작업이다. [[applications/garrytan-gbrain]]은 사람 페이지 중복 제거, 인용 수정, salience 채점, 모순 탐지, 다음 날 준비를 이 이름으로 묶는다. [[applications/techwealth-hub-2026-garry-tan-gbrain-explained]]는 대화 훑기, 빈약한 페이지 보강, 깨진 citation 수정, 메모리 통합 네 가지로 서술한다.

## 여섯 자료가 함께 그리는 구조

### 3계층 배치

여러 자료가 같은 층 구분을 쓴다. [[applications/techwealth-hub-2026-garry-tan-gbrain-explained]]가 가장 명시적으로 그림을 그린다.

| 층 | 구성 | 역할 |
|---|---|---|
| 왼쪽 | brain repo, plain markdown | source of truth. 사람이 언제든 읽고 편집한다 |
| 가운데 | GBrain. Postgres와 vector, hybrid search, chunking, indexing | markdown 위에 놓이는 retrieval 층 |
| 오른쪽 | AI 에이전트 | 답하기 전에 읽고 새로 배운 뒤 되쓴다 |

층을 나눈 결과 읽기와 쓰기의 방향이 고정된다. 사람과 에이전트는 왼쪽 markdown에 쓰고 질의는 가운데 층을 통해 읽으며, 가운데 층에 직접 쓰는 경로가 없다. 이 고정이 앞의 derived index 규정과 뒤의 검증 절차가 성립하는 전제다.

[[applications/gajjar-2026-gbrain-vs-computer-memory]]도 같은 배치를 짧게 요약한다. 저장 위치는 git 저장소 안의 markdown, 인덱싱 대상은 markdown 파일과 people page와 calendar 데이터, 검색 방식은 Postgres와 pgvector를 쓰는 hybrid search라는 서술이다. [[applications/mantena-2026-hermes-gbrain-setup-vps]]는 이 배치를 디렉토리 규칙으로 옮긴다. 코드가 있는 `~/gbrain`과 데이터가 쌓이는 `~/brain`을 섞어 쓰지 말라는 것이 가이드의 첫 번째 경고다.

### 에이전트 루프

루프의 단계 수와 이름은 [[applications/garrytan-gbrain]]과 [[applications/techwealth-hub-2026-garry-tan-gbrain-explained]]가 거의 같게 적는다. README는 signal, search, respond, write, auto-link, sync 여섯 단계로 쓰고, 영상은 signal 도착, entity 검출, brain 우선 조회, 컨텍스트를 실은 답변, brain 갱신, sync 여섯 단계로 쓴다.

두 서술이 다른 지점은 두 번째 단계다. README는 brain 조회를 앞세우고 영상은 entity 검출을 먼저 둔다. 같은 동작을 어느 쪽에서 보느냐의 차이로 보이지만, 이 저장소가 보유한 자료만으로는 어느 표현이 문서 원문에 가까운지 확정되지 않는다.

세 번째 단계가 두 자료 모두에서 핵심으로 지목된다. 답을 먼저 만들고 나중에 저장하는 순서가 아니라 저장된 것을 먼저 읽고 답을 만든다는 순서다. 영상은 이 순서가 compounding을 성립시킨다고 설명하고, README는 brain을 가장 싸고 빠르고 개인적인 정보원으로 규정한다.

[[applications/liu-2026-rag-llm-wiki-or-gbrain]]은 여기에 루프 바깥의 층을 덧붙인다. signal-detector는 트리거를 기다리지 않고 모든 수신 메시지에서 본 응답과 병렬로 실행되며 두 가지를 포착한다. 하나는 사용자의 정확한 표현을 그대로 보존하는 original idea이고, 다른 하나는 인물과 회사와 개념의 entity mention이다. 이 동작을 지탱하는 원칙이 "An unlinked mention is a broken brain"이다.

### 자료별 서술 범위 대조

같은 항목을 어느 자료가 어느 깊이로 다루는지를 모으면 중복 독서를 피할 수 있다. 아래 표는 앞 절의 합의 목록이 아니라 서술 범위의 대조다.

| 항목 | 가장 깊게 다루는 자료 | 함께 언급하는 자료 | 다루지 않는 자료 |
|---|---|---|---|
| retrieval 층 구성 | [[applications/vectorize-2026-gbrain-review-honest-assessment]] 6요소 | [[applications/garrytan-gbrain]] 5요소와 graph signal 3종 | 나머지 네 편 |
| typed edge와 graph | [[applications/garrytan-gbrain]] | [[applications/vectorize-2026-gbrain-review-honest-assessment]], [[applications/techwealth-hub-2026-garry-tan-gbrain-explained]] | [[applications/mantena-2026-hermes-gbrain-setup-vps]], [[applications/gajjar-2026-gbrain-vs-computer-memory]] |
| 스킬 구조와 라우팅 | [[applications/liu-2026-rag-llm-wiki-or-gbrain]] `enrich` frontmatter 전문 | [[applications/garrytan-gbrain]] 43개 목록, [[applications/vectorize-2026-gbrain-review-honest-assessment]] 평가 | [[applications/gajjar-2026-gbrain-vs-computer-memory]] |
| cron 운영 규칙 | [[applications/liu-2026-rag-llm-wiki-or-gbrain]] 시차와 quiet hours와 감사 경로 | [[applications/mantena-2026-hermes-gbrain-setup-vps]] 실제 crontab 두 줄 | [[applications/gajjar-2026-gbrain-vs-computer-memory]] |
| 설치 절차 | [[applications/mantena-2026-hermes-gbrain-setup-vps]] 7단계와 확인 명령 | [[applications/garrytan-gbrain]] 네 경로, [[applications/techwealth-hub-2026-garry-tan-gbrain-explained]] 4단계 | [[applications/liu-2026-rag-llm-wiki-or-gbrain]] |
| sync 검증 | [[applications/techwealth-hub-2026-garry-tan-gbrain-explained]] 7단계 절차 | [[applications/mantena-2026-hermes-gbrain-setup-vps]] `gbrain doctor`와 로그 확인 | [[applications/gajjar-2026-gbrain-vs-computer-memory]], [[applications/liu-2026-rag-llm-wiki-or-gbrain]] |
| 권한과 조직 배치 | [[applications/gajjar-2026-gbrain-vs-computer-memory]] | [[applications/garrytan-gbrain]] company brain, [[applications/vectorize-2026-gbrain-review-honest-assessment]] 1점 판정 | [[applications/techwealth-hub-2026-garry-tan-gbrain-explained]] |

retrieval 층에서 두 자료의 서술이 어긋난다는 점은 따로 짚을 값이 있다. Vectorize는 Postgres tsvector와 ts_rank, RRF의 상수 60, 4단계 중복 제거, Claude Haiku query expansion을 구성 요소로 든다. [[applications/garrytan-gbrain]]의 README는 BM25 keyword 검색, reciprocal-rank fusion, source-tier boost, intent-aware query rewriting으로 적고 tsvector와 4단계 중복 제거와 Haiku를 언급하지 않는다. 두 목록이 같은 구현을 다른 추상 수준에서 적은 것인지 판본 차이인지는 이 저장소 자료로 확정되지 않으므로, 세부 구성을 인용할 때는 어느 자료에서 왔는지 밝히는 편이 안전하다.

## 자료 사이에서 갈리는 지점

여섯 자료는 겹치는 부분보다 어긋나는 부분에서 더 많은 것을 알려준다. 네 항목이 특히 갈린다.

### 규모 수치의 시점 차이

Tan 본인이 운영하는 brain의 규모가 자료마다 다르다. 값이 틀렸다기보다 인용 시점이 다르기 때문이며, 어느 값을 쓸지는 무엇을 말하려는지에 달려 있다.

| 인용 시점 | 페이지 | 인물 | 회사 | cron job | 출처 |
|---|---|---|---|---|---|
| 2026-04 공개 직후 1주차 | markdown 1만 개 이상 | people page 수천 개 | 언급 없음 | 언급 없음 | [[applications/techwealth-hub-2026-garry-tan-gbrain-explained]] |
| 2026-04-27 | 17,888 | 언급 없음 | 언급 없음 | 21 | [[applications/liu-2026-rag-llm-wiki-or-gbrain]] |
| 2026-05-08 | 17,888 | 4,383 | 723 | 언급 없음 | [[applications/gajjar-2026-gbrain-vs-computer-memory]] |
| 2026-05-08 | 수만 페이지 | 언급 없음 | 언급 없음 | 19개 이상 | [[applications/vectorize-2026-gbrain-review-honest-assessment]] |
| 2026-05-22 clone 기준 README | 146,646 | 24,585 | 5,339 | 66 | [[applications/garrytan-gbrain]] |

한 달 남짓한 사이에 페이지가 약 8배로 늘어난 셈이다. 실제로 그만큼 자랐을 수도 있고 집계 기준이 달라졌을 수도 있는데, 어느 쪽인지는 이 저장소 자료로 판정할 수 없다. [[applications/gajjar-2026-gbrain-vs-computer-memory]]와 [[applications/liu-2026-rag-llm-wiki-or-gbrain]]은 각자의 한계 절에서 이 차이를 이미 밝혀 두었다. 그러므로 "GBrain은 17,888 페이지 규모"라는 문장을 현재 서술로 옮기면 실제보다 작게 전달된다.

스킬 개수도 같은 성격의 차이를 보인다. [[applications/liu-2026-rag-llm-wiki-or-gbrain]]은 2026-04-27 시점으로 자율 스킬 24개를, [[applications/vectorize-2026-gbrain-review-honest-assessment]]는 2026-05-08 시점으로 34개 이상을, [[applications/garrytan-gbrain]]의 README는 43개를 적는다. 증가 순서가 시점 순서와 일치하므로 실제 증가로 읽는 편이 자연스럽다.

### Claude Code 통합 여부

두 자료가 반대 방향으로 서술한다. [[applications/vectorize-2026-gbrain-review-honest-assessment]]는 first-party 패키지가 없는 스택으로 Claude Code, Cursor, Codex, CrewAI, LangGraph, LlamaIndex, AutoGen, n8n, Dify, Pipecat, LiteLLM을 나열하며 Integration breadth에 5점 만점 중 2점을 준다.

[[applications/garrytan-gbrain]]의 README는 Claude Code를 `claude mcp add gbrain -- gbrain serve` 한 줄로 붙이며 서버도 토큰도 터널도 필요 없다고 적고, Cursor와 Windsurf는 MCP 설정 항목 하나로 처리한다. 리뷰가 리뷰 시점의 README를 근거로 삼았으므로 그 사이에 통합이 추가됐을 수 있다. 판본 차이가 아니라면 first-class skill pack이 있는 것과 MCP로 붙는 것을 리뷰가 구분해 세었다는 해석도 가능하다. 어느 쪽인지는 확정되지 않는다.

### 설치 명령의 상반된 권고

같은 명령을 한 자료는 권하고 다른 자료는 금한다.

| 명령 | [[applications/garrytan-gbrain]] | [[applications/vectorize-2026-gbrain-review-honest-assessment]] |
|---|---|---|
| `bun install -g github:garrytan/gbrain` | CLI 단독 설치 경로로 제시 | postinstall hook이 차단되므로 피하라고 경고 |
| `npm install -g gbrain` | 언급 없음 | npm 레지스트리에 squat된 패키지가 있어 위험 |
| `git clone` 후 `bun install`과 `bun link` | 언급 없음 | standalone CLI 경로로 무리 없이 작동 |

[[applications/mantena-2026-hermes-gbrain-setup-vps]]가 실제로 택한 경로는 세 번째다. 저장소를 clone한 뒤 `bun install`과 `bun link`로 전역 링크를 만들고 `gbrain --version`으로 확인한다. 이 저장소가 보유한 자료 중 실제 설치를 수행한 것은 이 한 편뿐이므로, 세 서술이 갈릴 때 실측 근거는 이 페이지에 있다.

### 검증 절차의 근거 위치

[[applications/techwealth-hub-2026-garry-tan-gbrain-explained]]가 자료 묶음에서 가장 마음에 든다고 꼽은 부분이 sync 검증 절차다. 근거 문장은 "Sync ran is not the same as sync worked"이며, 절차는 sync 실행, 낡은 chunk에 임베딩 backfill, 페이지 수 검증, 임베딩 채움 정도 검증, 페이지 하나 수정, 다음 sync cycle 대기, 수정한 문구로 검색 확인 일곱 단계다.

주의할 점은 이 절차의 근거가 어디 있느냐다. 영상은 이를 저장소의 verification runbook 문서 내용으로 전하지만, 이 저장소가 보유한 README 본문에는 해당 절차도 인용 문장도 들어 있지 않다. database primitive 네 가지와 잘못된 Supabase puller가 조용히 페이지를 건너뛴다는 실패 유형도 마찬가지로 영상에만 있다. README에 있는 Supabase 관련 항목은 pooler 순간 장애로 dream cycle이 링크를 잃는 다른 증상이다.

따라서 검증 절차와 database primitive는 영상 한 편이 유일한 근거이고, 영상 자체는 문서를 읽고 옮긴 3자 해설이다. 영상 페이지는 발표자가 설치나 sync를 직접 실행한 화면이 없다는 점도 함께 밝힌다.

[[applications/mantena-2026-hermes-gbrain-setup-vps]]는 같은 관점을 실행으로 옮긴 유일한 자료다. 5분 주기로 `gbrain sync --repo /home/ubuntu/brain`을 실행하고 결과를 `sync.log`에 쌓으며 `gbrain doctor`로 상태를 확인하는 구성이다. 다만 이 가이드가 실행한 것은 주기적 sync와 헬스체크이고, 영상이 말한 일곱 단계 검증 절차를 그대로 수행한 기록은 아니다.

## 벤치마크 수치와 자기 보고 여부

이 절의 목적은 수치를 모으는 것이 아니라 각 수치가 누구의 측정인지를 밝히는 것이다. 오른쪽 열이 그 판정이다.

| 지표 | 값 | 측정 대상 | 저장소 내 출처 | 성격 |
|---|---|---|---|---|
| BrainBench P@5 | 49.1% | 240페이지 Opus 생성 코퍼스 | [[applications/garrytan-gbrain]], [[applications/vectorize-2026-gbrain-review-honest-assessment]] | 자기 보고. 프로젝트 자체 벤치마크 |
| BrainBench R@5 | 97.9% | 같은 코퍼스 | [[applications/garrytan-gbrain]], [[applications/vectorize-2026-gbrain-review-honest-assessment]] | 자기 보고 |
| graph 층 비활성 시 P@5 하락 | 31.4%p | 같은 코퍼스 | [[applications/garrytan-gbrain]], [[applications/vectorize-2026-gbrain-review-honest-assessment]] | 자기 보고. ripgrep 기반 BM25와 vector 단독 RAG 대비도 비슷한 폭 |
| LongMemEval R@5 | 97.60% | 공개 LongMemEval | [[applications/vectorize-2026-gbrain-review-honest-assessment]]만 | 자기 보고. gbrain-evals 저장소 값이며 README 본문에는 점수가 없다 |
| BEAM | 미실행 | 10M 토큰 long-horizon | [[applications/vectorize-2026-gbrain-review-honest-assessment]] | GBrain 값 없음. Hindsight 64.1%는 다른 벤치마크 값이라 나란히 비교할 수 없다고 원문이 명시 |
| company brain 권한 fuzz test | 누출 0건 | 읽기 경로 전체 | [[applications/garrytan-gbrain]] | 자기 보고 |
| 임베딩 비용 | ingestion 토큰 100만 개당 약 0.10달러 | OpenAI API | [[applications/vectorize-2026-gbrain-review-honest-assessment]] | 제3자가 옮긴 공개 가격 |
| 개인 brain 월 LLM 비용 | 한 자릿수 달러 | 활발히 쓰는 개인 brain | [[applications/vectorize-2026-gbrain-review-honest-assessment]] | 제3자 추정 |
| 10개 항목 채점 | 1점에서 5점 | GBrain 전반 | [[applications/vectorize-2026-gbrain-review-honest-assessment]] | 제3자 평가. 측정이 아니다 |
| X collector 수집량 | 본인 게시물 399건 중 신규 7건 | 저자 본인 계정 | [[applications/mantena-2026-hermes-gbrain-setup-vps]] | 실측이지만 GBrain 성능이 아니라 수집 결과 |

표가 보여주는 것은 두 가지다. 첫째, GBrain의 retrieval 성능을 말하는 값은 전부 프로젝트 자신이 발표했다. [[applications/vectorize-2026-gbrain-review-honest-assessment]]도 이를 부인하지 않는다. 저자가 한 일은 공개 수치가 내부적으로 일관되고 방법론이 문서화됐으며 eval 코드가 재현 가능하다고 판정한 것이며, 직접 재현한 결과는 제시하지 않는다.

둘째, 코퍼스가 다르면 비교가 성립하지 않는다는 단서를 원문이 스스로 붙였다. BrainBench는 240페이지짜리 자체 생성 코퍼스이므로 다른 시스템의 학술 점수와 직접 맞대기 어렵다. GBrain의 LongMemEval 97.60%와 Hindsight의 BEAM 64.1%를 나란히 놓고 우열을 말할 수 없다는 서술이 그 귀결이다.

31.4%p라는 하락 폭은 자기 보고 안에서도 성격이 조금 다르다. 같은 시스템에서 graph 층 하나만 끈 내부 비교이므로 다른 제품과의 비교에 쓸 수는 없지만, typed-edge graph가 hybrid search 단독보다 retrieval 향상에 더 크게 기여한다는 주장을 뒷받침하는 데는 쓸 수 있다. [[applications/vectorize-2026-gbrain-review-honest-assessment]]가 이 결과를 드물고 의미 있는 관찰로 평가한 이유도 여기에 있다.

## GBrain과 대안 비교

여섯 자료가 실제로 비교 대상으로 삼은 것은 네 가지다. 아래 표는 그 범위 안에서만 정리한 것이며, 자료가 다루지 않은 제품은 넣지 않았다.

| 비교 대상 | 비교를 제시한 자료 | GBrain 쪽 서술 | 상대 쪽 서술 | 비교의 한계 |
|---|---|---|---|---|
| RAG | [[applications/liu-2026-rag-llm-wiki-or-gbrain]] | 자율 실행까지 담당. 개인 범위 | 문서 10만 건 이상도 처리. 성숙도가 매우 높고 감사 가능성이 강점 | 같은 코퍼스에서 겨룬 정량 비교가 없다 |
| Karpathy LLM Wiki | [[applications/liu-2026-rag-llm-wiki-or-gbrain]], [[applications/mantena-2026-hermes-gbrain-setup-vps]] | 컴파일된 지식 위에 실행 층을 올린 형태 | 원본 1,000건 미만에 적합. ingest 1회당 page 10~15개 갱신. 수동적이라 스스로 행동하지 않음 | Liu 본인이 수렴을 예측하므로 경계가 고정된 구분이 아니다 |
| DevRev Computer Memory | [[applications/gajjar-2026-gbrain-vs-computer-memory]] | personal, manual ingestion, flat-file 접근 | shared, AirSync 50개 이상 시스템 양방향 sync, SOC 2 준수 접근 제어 | 저자가 DevRev 소속이고 이해관계 고지가 없다. 두 시스템을 같은 과제로 측정한 수치도 없다 |
| Hindsight, Mem0, Zep | [[applications/vectorize-2026-gbrain-review-honest-assessment]] | 단일 운영자 markdown brain에 최적화 | memory-as-a-service. 목표가 다르다 | 저자가 질문의 틀 자체가 잘못됐다며 직접 비교를 거부한다 |

표에서 반복되는 것은 비교의 한계 열이다. 네 비교 모두 같은 조건에서 측정한 결과가 아니라 설계 전제의 대조다. 도입 판단에 쓸 때는 성능 우열이 아니라 요구 조건의 일치 여부로 읽어야 한다.

### Liu의 세 가지 분류

[[applications/liu-2026-rag-llm-wiki-or-gbrain]]은 선택 기준을 기능 목록이 아니라 질문 하나로 압축한다. "what is your agent's job?"이며, 에이전트가 하는 일이 정해지면 나머지가 따라온다는 구성이다.

| 별칭 | 방식 | 적합 조건 | 강점과 약점 |
|---|---|---|---|
| The Retriever | RAG | 문서가 수천 건 이상이고 정기적으로 바뀌며 빠른 출시가 우선 | 규모에서 이기고 깊이에서 진다 |
| The Compiler | LLM Wiki | 원본 수백 건. 가치가 개별 문서가 아니라 문서 사이의 연결에 있다 | 깊이에서 이기고 규모에서 진다 |
| The Operator | Fat Skills, GBrain | 감시와 표시와 enrich와 실행까지 원하고 엔지니어링 예산이 있다 | 자율성에서 이기고 접근성에서 진다 |

저자가 짚는 규칙성은 강점과 약점이 같은 설계 결정에서 나온다는 점이다. RAG가 규모를 감당하는 이유는 원본을 해석하지 않고 조각내어 저장하기 때문이고, 바로 그래서 깊이를 잃는다. fat skills가 자율성을 얻는 이유는 스킬마다 실행 규칙과 품질 기준을 사람이 정의하기 때문이고, 바로 그래서 그 정의를 할 수 있는 사람이 있어야만 동작한다.

저자의 결론은 승자를 고르는 대신 수렴을 예측하는 쪽이다. 원문의 표현은 "Picking between them is a design decision, not a loyalty test"이며, 2026년의 질문은 retrieve와 compile과 act의 경계가 얼마나 빨리 허물어져 셋을 모두 수행하는 knowledge operating system이 되느냐라는 것이다. 다만 저자가 든 수렴 신호 가운데 Karpathy LLM Wiki v2 커뮤니티 확장판은 구체 저장소를 지목하지 않아 확인할 수 없다.

### Gajjar의 개인과 조직 대비

[[applications/gajjar-2026-gbrain-vs-computer-memory]]는 세 가지 차이로 개인용 설계와 조직용 설계를 가른다. 지식의 소유 범위가 personal이냐 shared냐, 외부 시스템 연결이 manual ingestion이냐 two-way sync냐, 접근 제어가 flat-file 접근이냐 SOC 2 준수 제어냐다.

세 항목의 성격은 같다. 모두 혼자 쓰느냐 조직이 함께 쓰느냐에서 파생되는 요구다. 저자의 결론도 둘 중 하나를 고르라는 것이 아니라 같은 compounding 원리를 서로 다른 범위에서 각각 입증한다는 쪽이다.

이 자료를 인용할 때 두 가지 단서가 필요하다. 저자가 비교 대상 한쪽을 만드는 회사에 소속돼 있고 원문에 이해관계 고지가 없다는 점이 하나다. 다른 하나는 GBrain 쪽에 붙인 두 라벨의 범위가 다른 자료와 대조하면 좁아진다는 점이다.

| 라벨 | 대조 자료가 보여주는 것 |
|---|---|
| manual ingestion | [[applications/mantena-2026-hermes-gbrain-setup-vps]]는 Hermes에게 "Ingest this PDF" 한 줄을 보내면 brain 페이지 작성까지 위임되고 5분 주기 cron이 sync를 수행하는 구성을 보인다 |
| flat-file access | [[applications/garrytan-gbrain]]의 README는 login 단위로 범위가 정해진 brain 조각을 갖는 company brain 모드를 서술한다 |

두 라벨은 사람이 매번 파일을 직접 만든다거나 파일 권한밖에 없다는 뜻이라기보다, first-class 엔터프라이즈 커넥터가 없다는 뜻에 가깝다. 라벨이 가리키는 시점이 company brain 기능 이전인지 저자가 그 모드를 다루지 않은 것인지는 이 저장소 자료로 판정할 수 없다.

### Vectorize의 적용 범위 판정

[[applications/vectorize-2026-gbrain-review-honest-assessment]]는 품질과 적용 범위를 분리해 채점한다. 점수가 높은 항목은 모두 얼마나 잘 만들었는가에 해당하고, 낮은 두 항목은 모두 어디까지 쓸 수 있는가에 해당한다.

| 점수 구간 | 항목 |
|---|---|
| 5점 | Architecture, Cost efficiency, Long-term value, Honesty of marketing |
| 4점 | Retrieval quality, Day-one experience, Documentation |
| 3점 | Maturity |
| 2점 | Integration breadth |
| 1점 | Multi-tenant readiness |

낮은 두 점수는 결함이 아니라 설계 범위의 결과라고 저자는 읽는다. 근거가 opinionated software라는 개념이다. 사용 방식에 대한 특정 전제를 강하게 깔고 그에 맞춰 설계를 고정한 소프트웨어라는 뜻이며, 문제 범위를 좁게 고정했기 때문에 나머지 설계 선택이 한 방향으로 정렬될 수 있었다는 해석으로 이어진다.

저자가 제시한 compounding의 세 메커니즘은 이 overview에서 [[applications/liu-2026-rag-llm-wiki-or-gbrain]]의 스킬 계약 서술과 짝을 이룬다. tiered enrichment는 1회 언급된 entity를 stub으로 남기고, 서로 다른 출처에서 3회 언급되면 웹과 소셜 정보로 보강하며, 미팅 이후이거나 8회 이상 언급되면 전체 처리를 건다. fail-improve loop는 분류 과제에서 LLM fallback이 발생할 때마다 그 실패에서 더 나은 regex를 뽑아 같은 작업의 LLM 의존도를 낮춘다. backlink 가산점은 참조를 많이 받는 페이지의 순위를 올린다.

세 메커니즘의 방향이 같다는 점이 중요하다. 자주 등장하는 대상에 더 많은 정보가 붙고, 그렇게 두꺼워진 페이지가 더 잘 검색되며, 그 처리가 시간이 갈수록 싸진다. 저자가 일주일짜리 시험 사용으로는 가치가 드러나지 않는다고 단서를 붙인 이유도 여기에 있다. 공개 사용자들이 유의미한 개선을 보고한 시점은 4주에서 8주 사이다.

### 본 저장소와의 대비

이 저장소도 Karpathy의 LLM Wiki 패턴을 출발점으로 삼는다. 아래 표의 왼쪽 열은 이 저장소의 `CLAUDE.md`가 정한 규칙이고, 오른쪽 열은 앞에서 인용한 여섯 자료의 서술이다. 두 시스템을 같은 기준으로 측정한 자료는 없으므로 설계 전제의 대조로만 읽는다.

| 항목 | 이 저장소 | GBrain |
|---|---|---|
| 작성 주체 | 사용자와 LLM의 협업 큐레이션 | AI 에이전트가 직접 읽고 쓴다 |
| source of truth | `raw/`와 `sources/`와 `wiki/` 3단 구조 | git으로 소유하는 markdown 저장소 한 층 |
| retrieval | `[[wikilinks]]`와 Obsidian, grep | Postgres와 pgvector 위의 hybrid search에 typed edge 결합 |
| 환각 방지 규칙 | wiki에 없으면 없다고 말한다 | vector database는 derived index이고 source of truth가 아니다 |
| 누적 수단 | `wiki/overviews/` 합성 페이지 | dream cycle과 tiered enrichment, fail-improve loop |
| 다루는 자료 유형 | papers와 repos, articles, reports, videos, books, lectures 7종 | 전부 markdown |

두 시스템이 같은 패턴을 서로 다른 방향으로 밀어붙였다는 점이 대비의 요지다. GBrain은 에이전트가 brain을 직접 관리하는 쪽으로 가고, 이 저장소는 사용자가 큐레이션하고 LLM이 합성하는 쪽으로 간다.

## 학습 경로

아래 여섯 단계는 frontmatter의 `study_path`와 같은 순서다. 개념 파악에서 시작해 1차 자료와 실전 운영을 거쳐 비판적 평가로 끝난다.

1. [[applications/techwealth-hub-2026-garry-tan-gbrain-explained|GBrain 해설 영상]]. 5분 45초 안에 brain repo와 retrieval 층과 에이전트라는 3계층 어휘를 잡는다. 이후 모든 자료가 이 구분 위에서 읽힌다.
2. [[applications/liu-2026-rag-llm-wiki-or-gbrain|RAG, LLM Wiki, GBrain 결정 프레임워크]]. GBrain이 기존 메모리 방식 사이 어디에 놓이는지를 먼저 확인한다. 도입할지 말지의 질문이 여기서 정해지므로 저장소를 열기 전에 읽는 편이 낫다.
3. [[applications/garrytan-gbrain|garrytan/gbrain README]]. 1차 자료이며 앞의 두 자료가 요약한 내용의 원본이다. 값이 어긋날 때 대조 기준이 되므로 규모 수치와 버전을 확인하며 읽는다.
4. [[applications/mantena-2026-hermes-gbrain-setup-vps|Hermes와 GBrain VPS 셋업]]. README가 30분으로 잡은 설치가 실제 서버에서 어떤 절차와 실패로 이어지는지 확인한다. PATH와 slug 두 함정이 대표 사례다.
5. [[applications/vectorize-2026-gbrain-review-honest-assessment|Vectorize 리뷰]]. 잘 만들었는가와 어디까지 쓸 수 있는가를 분리해 채점한 제3자 평가다. 도입하지 말아야 할 조건이 목록으로 정리돼 있다.
6. [[applications/gajjar-2026-gbrain-vs-computer-memory|Computer Memory 비교]]. 개인 운영자 범위를 넘어 조직으로 갈 때 무엇이 부족해지는지를 엔터프라이즈 제품과의 대비로 확인한다. 저자 소속에서 오는 편향을 감안해 읽는다.

## 한계

**1차 자료가 원문 전체가 아니다.** [[applications/garrytan-gbrain]]의 근거는 README 전문 하나이며 저장소 코드를 읽어 검증한 결과가 아니다. 같은 저장소의 튜토리얼 문서는 원문 전문이 아니라 WebFetch 요약본으로 보관돼 있고, 파일 자체가 마지막 두 문서는 재현이 거부되어 상세 요약으로 대체했다고 밝힌다. 따라서 저장소 내부 구조와 파일 경로, 명령어, 커밋 이력을 근거로 한 서술은 README 본문에서 확인되는 범위로 제한했다.

**자기 보고 수치에 의존한다.** 앞의 벤치마크 표에서 정리한 대로 GBrain의 retrieval 성능을 말하는 값은 전부 프로젝트 자신이 발표한 것이다. 여섯 자료 중 어느 편도 독립 재현을 수행하지 않았고, 가장 비판적인 [[applications/vectorize-2026-gbrain-review-honest-assessment]]조차 직접 production 운영 경험이 아니라고 해당 절 첫머리에 명시한다.

**세 편의 원문이 요약본이다.** [[applications/gajjar-2026-gbrain-vs-computer-memory]], [[applications/vectorize-2026-gbrain-review-honest-assessment]], [[applications/mantena-2026-hermes-gbrain-setup-vps]] 세 편은 저장소의 raw가 원문 전문이 아니라 WebFetch로 추출한 본문 요약이다. 각 페이지가 일부 문장을 모델이 발췌하거나 재구성했을 수 있다고 밝히고 있으므로, 큰따옴표로 옮긴 문장을 축자 인용으로 확정하려면 원문 대조가 필요하다.

**영상 단일 근거 항목이 있다.** database primitive 네 가지와 sync 검증 절차 일곱 단계, 잘못된 Supabase puller 실패 유형은 [[applications/techwealth-hub-2026-garry-tan-gbrain-explained]]에만 있고 이 저장소가 보유한 README 본문에서는 확인되지 않는다. 영상 자체도 자동 생성 자막을 옮긴 자료라 명령어와 고유명사 표기가 흔들린다. 영상에 한 번 등장하는 로컬 orchestration 서비스 이름은 같은 영상 안에서 두 표기로 갈려 원어가 확정되지 않으므로 이 페이지에서는 다루지 않았다.

**독립 검증 자료의 범위가 좁다.** 제3자 평가는 [[applications/vectorize-2026-gbrain-review-honest-assessment]] 한 편뿐이고, 실제 설치를 수행한 기록도 [[applications/mantena-2026-hermes-gbrain-setup-vps]] 한 편뿐이다. 그 설치 기록은 `gbrain 0.22.x` 기준이라 README 판본과 시차가 크다.

**커버 범위 밖의 자료가 있다.** 이 저장소에는 여섯 자료 외에도 [[applications/garrytan-gbrain-tutorials]], [[applications/tilnote-2026-gbrain-repository-core-summary]], [[applications/xguru-2026-gbrain-open-source-personal-knowledge]], [[applications/kmyu-2026-akb-llmwiki-gbrain-comparison]] 네 편이 GBrain을 다룬다. 이 overview는 frontmatter `sources:`에 선언한 여섯 편만 근거로 삼았으므로 네 편의 서술은 반영되지 않았다.

**다루지 못한 질문이 남는다.** retrieval 시점의 multi-hop graph 순회와 시간 추론은 [[applications/vectorize-2026-gbrain-review-honest-assessment]]가 한계로 지목했지만 이후 릴리스에서 어떻게 됐는지 확인할 자료가 없다. GBrain의 first-class 소비자로 반복 호명되는 OpenClaw와 Hermes 자체를 다루는 자료도 없다. BrainBench와 LongMemEval을 담은 `gbrain-evals` 저장소가 수집돼 있지 않아 자기 보고 수치의 재현 가능성도 서술로만 남아 있다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| compounding | 사용할수록 저장된 내용 자체가 정돈되고 두꺼워져 같은 질문에 대한 답이 나아지는 성질 |
| derived index | source of truth가 아니라 원본에서 파생된 인덱스. GBrain에서 vector database가 여기에 해당한다 |
| compiled truth와 append-only timeline | 페이지 상단에 현재 결론을 두고 하단에 증거를 시간순으로 쌓는 배치 |
| typed edge | 페이지 사이 관계에 이름을 붙인 것. LLM 호출 없이 문법 매칭만으로 만들어진다 |
| thin harness와 fat skills | 실행 환경을 약 200줄로 얇게 두고 지능을 전부 markdown 스킬 파일에 두는 설계 |
| dream cycle | 빈약한 페이지 보강, 인용 수정, 모순 탐지, 메모리 통합을 사용자가 자는 동안 수행하는 야간 배치 |

## 관련 페이지

- [[applications/garrytan-gbrain]]: 1차 자료인 저장소 README. 구성과 수치의 원본이며 다른 자료의 값이 어긋날 때 대조 기준이 된다.
- [[applications/vectorize-2026-gbrain-review-honest-assessment]]: 제3자 리뷰. 10개 항목 채점과 약점 목록, 비용 내역, 도입 조건과 대안 조건이 여기에 있다.
- [[applications/mantena-2026-hermes-gbrain-setup-vps]]: 실제 설치와 운영 기록. AWS EC2 배치 절차와 두 가지 함정, 비용 회피 구성을 담당한다.
- [[applications/techwealth-hub-2026-garry-tan-gbrain-explained]]: 개괄 영상. 3계층 멘탈 모델과 database primitive, sync 검증 절차의 유일한 근거다.
- [[applications/liu-2026-rag-llm-wiki-or-gbrain]]: 아키텍처 비교 에세이. RAG와 LLM Wiki와 fat skills의 3분류와 수렴 예측을 담당한다.
- [[applications/gajjar-2026-gbrain-vs-computer-memory]]: 개인 범위와 조직 범위의 대비. 엔터프라이즈 요건이 무엇인지를 담당하되 저자 소속에서 오는 편향을 감안해 읽는다.
- [[overviews/gstack-ai-software-factory-overview]]: 같은 저자 계열의 다른 시스템을 묶은 overview. 이 페이지가 메모리 층을 다룬다면 그 페이지는 개발 워크플로 쪽을 다룬다.
- [[overviews/prompt-to-loop-engineering-evolution-overview]]: 프롬프트 단위 작업이 루프 단위 설계로 옮겨 가는 흐름을 묶은 overview. GBrain의 cron과 always-on 스킬이 그 흐름의 한 사례에 해당한다.
