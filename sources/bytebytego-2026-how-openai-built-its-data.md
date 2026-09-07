---
title: "How OpenAI Built Its Data Agent"
type: article
year: 2026
category: agents
raw_path: raw/articles/bytebytego-2026-how-openai-built-its-data.md
raw_filename: "bytebytego-2026-how-openai-built-its-data.md"
source_collection: external
author: "ByteByteGo Newsletter (interview with Emma Tang, OpenAI)"
url: "https://blog.bytebytego.com/p/how-openai-built-its-data-agent"
publisher: "ByteByteGo Newsletter"
publication_date: "2026-06-03"
tags: [openai, data-agent, agentic-systems, llm-agents, sql-agent, context-engineering, context-assembly, codex, mcp, gpt-5-5, harness, tool-curation, retrieval, embedding, knowledge-platform, cross-cloud-migration, internal-platform]
---

## 한 줄 요약 (One-line Summary)

ByteByteGo Newsletter가 OpenAI 데이터 플랫폼 엔지니어링 책임자 Emma Tang을 인터뷰해 정리한 production agent case study다. 2026년 5월 기준 1.5 exabyte, 9만 개 데이터셋, 약 4,000명의 사내 사용자를 감당하는 데이터 플랫폼 위에서 OpenAI가 운영 중인 사내 data agent는 저자 표현으로 "pretty vanilla"다. GPT-5.5 단일 모델과 약 13개로 추린 도구, 6개 layer의 context assembly, 단순한 agent loop가 전부이고 router와 fine-tuning과 post-training이 없다. 글의 중심 주장은 "the data foundation matters more than the agent"이며, 단일 monorepo와 통합 data lake와 강한 annotation이 있어야 이 단순한 구조가 exabyte 규모에서 신뢰성 있게 동작한다고 설명한다. 여기에 Codex의 사내 활용 사례 3건과 다른 팀을 위한 교훈 5가지, 향후 과제 2가지가 붙는다.

## 1. 자료 정보 (Document Information)

- **저자와 발행자**: ByteByteGo Newsletter (Substack)
- **인용된 인물**: Emma Tang, Head of Data Platform Engineering, OpenAI
- **URL**: <https://blog.bytebytego.com/p/how-openai-built-its-data-agent>
- **게시일**: 2026-06-03
- **분량**: 본문 약 3,900단어의 long-form 인터뷰 기사
- **수집 경로**: 원본 URL의 본문을 추출해 `raw/articles/`에 저장했다 (CLAUDE.md rule #1의 자료 수집 예외).
- **figures**: 본문에 "as shown in the figure below"와 "The Figure above shows the overall design of context assembly" 두 곳의 다이어그램 참조가 있으나 이미지 자체는 raw에 수집되지 않았다. 따라서 `figures:` 키를 생략한다.
- **장르**: production agent case study. 새 벤치마크나 실험 설계는 없고, 사내 운영 사례와 교훈과 로드맵을 정리한 아키텍처 해설이다.

## 2. 주요 기여 (Key Contributions)

1. **exabyte 규모 data agent의 아키텍처 공개.** LLM, runtime, context assembly, tools 네 구성 요소로 이루어진 구조를 실제 운영 수치와 함께 드러낸다.
2. **six layers of context 명명.** table usage metadata, human annotations, Codex enrichment, institutional knowledge, memory, runtime context 여섯 층을 구분하고, 앞의 세 층만 daily offline pipeline에서 테이블당 description 하나로 합쳐 테이블당 벡터 하나로 임베딩한다고 밝힌다.
3. **단순함이 설계 의도라는 주장.** router와 multi-model 혼합과 fine-tuning을 모두 배제한 구조가 강한 데이터 기반 위에서는 충분히 동작한다는 사례를 제시한다.
4. **tool curation 사례.** 약 40개였던 도구를 호출당 약 13개로 줄이고 기능이 겹치는 도구를 제거하자 문제가 해소됐다고 보고한다. 다만 성능 변화의 정량값은 공개하지 않았고 "the results were bad"라는 정성 서술만 있다.
5. **Codex 사내 활용 사례 3건.** cross-cloud migration, open-source 패치 무인 릴리스, support 티켓 처리를 규모 수치와 함께 서술한다.
6. **다른 팀을 위한 교훈 5가지.** 데이터 기반 우선, 도구 축소, 신뢰 가능한 쿼리만 retrieval, 경로가 아닌 목표 지시, 더 공격적인 일정.
7. **향후 과제 2가지.** 질문마다 생성되는 맞춤 React 앱과, AI로 가속된 사용자 코드를 검증하는 플랫폼 측 에이전트.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 문제 정의와 사용자 경험

이 규모에서 데이터 분석의 난점은 SQL 작성이 아니라고 글은 전제한다. 어떤 테이블을 써야 하는지 찾는 일과 그 데이터를 의미상 어떻게 다뤄야 하는지 이해하는 일이 더 어렵다. 비슷해 보이지만 뜻이 다른 테이블이 많고, 각 테이블의 grain이 무엇인지와 다른 데이터와 어떻게 join하는지가 불분명하다. 분석가는 코드 한 줄을 쓰기 전에 이 판단에만 몇 시간을 쓸 수 있다.

에이전트는 이 판단을 대신한다. 사용자가 평이한 영어로 질문하면 에이전트가 관련 테이블을 찾고 SQL을 작성해 실행한 뒤 결과를 확인하고, 답과 함께 추론 과정을 붙여 돌려준다. 사용자가 받는 응답은 세 가지로 구성된다: 답, 실행한 SQL, 참조한 테이블 목록.

접근 경로는 네 가지다.

| 경로 | 설명 |
|---|---|
| Slack | 기사에 예시로 등장하는 기본 경로. 엔지니어나 마케터가 채널에서 질문한다 |
| 웹 포털 | 플랫폼 자체 인터페이스 |
| IDE | 개발 환경 안에서 직접 질의 |
| Codex CLI | MCP를 통해 연결된다 |

### 3.2 LLM과 harness 구도

글은 아키텍처 설명에 앞서 agentic 시스템의 기본 패턴을 정의한다. data agent는 LLM에 harness를 결합한 형태이며, LLM이 추론을 맡고 harness가 도구와 agent loop를 제공한다.

harness가 필요한 이유는 LLM 단독으로는 다음 토큰 예측만 가능하기 때문이다. 원문 표현으로 "an LLM by itself can only predict the next token. It knows a lot, but it cannot run a SQL query or act on the result." harness는 이 간극을 메운다. 데이터베이스 질의 인터페이스 같은 호출 가능한 도구를 주고, 관련 컨텍스트를 조립하며, 모델을 루프에 넣어 추론과 행동과 관찰을 반복시킨다.

많은 agent 시스템이 이 지점에서 복잡해진다고 글은 지적한다. 복잡도를 늘리는 선택지는 네 가지로 열거된다.

| 선택지 | 내용 |
|---|---|
| router | 쉬운 질문은 작고 저렴한 모델로, 어려운 질문은 큰 모델로 보낸다 |
| multi-model 혼합 | 여러 LLM을 함께 쓴다 |
| 내부 데이터 fine-tuning | 사내 데이터로 모델을 추가 학습시킨다 |
| content-type별 retrieval pipeline | 콘텐츠 종류마다 다른 임베딩 모델을 쓰는 복잡한 검색 경로를 만든다 |

각 선택은 도움이 될 수 있지만 동시에 비용과 지연을 늘리고 실패 가능 지점을 추가한다. OpenAI 팀은 반대 방향을 택했고, 견고하고 통합된 데이터 플랫폼 기반이 받쳐 주는 덕분에 단순한 아키텍처가 이 규모에서도 잘 동작한다고 판단했다.

### 3.3 4-component 구조

| 구성 요소 | 구현 | 역할 |
|---|---|---|
| LLM | GPT-5.5 단일 모델 | 모든 요청에 같은 모델을 쓴다. 올바른 SQL 생성, 결과 검사, 쿼리 수정, 검증된 답까지의 추론을 담당한다 |
| Runtime | agent loop orchestrator | 모델 출력을 파싱하고 요청된 tool call을 디스패치하며 결과를 다시 모델에 넣고 이 순환을 반복한다 |
| Context Assembly | 6개 layer | 글이 "where the real engineering work lives"라고 지목한 층 |
| Tools | 약 13개로 추린 집합 | 사내 컨텍스트 조회, 내부 knowledge base, Airflow와 Spark 같은 빅데이터 시스템, 메타데이터 서비스 |

원문 인용: "There is no router, no fine-tuning, and no special post-training. Every question goes to the same model."

### 3.4 context assembly가 필요한 이유

강한 모델도 적절한 컨텍스트 없이는 틀린 답을 낸다는 것이 이 층의 출발점이다. 스키마만으로는 테이블을 구분할 수 없다. 글이 드는 예는 다음과 같다. 두 테이블이 모두 `user_id` 컬럼을 가지고 있고 거의 동일해 보이지만, 하나는 로그아웃 상태 사용자를 포함하고 다른 하나는 포함하지 않는다. 스키마만으로는 어느 쪽이 질문에 답하는 테이블인지 모델이 판별할 수 없고 결국 잘못된 쪽을 고른다.

그래서 팀은 모델의 테이블 선택과 쿼리 생성에 실제로 도움이 되는 신호를 먼저 식별했다. 테이블의 스키마와 사람들이 그 테이블을 어떻게 조회해 왔는지, 테이블 소유자가 남긴 메모, 그리고 pipeline 코드가 드러내는 생성 방식이다. 이 세 신호가 뒤의 앞선 세 layer로 이어진다.

### 3.5 six layers of context

| Layer | 내용 | 처리 방식 |
|---|---|---|
| Table usage metadata | 스키마, lineage, 조회 이력 | 데이터 사이언티스트가 쓴 인기 대시보드 쿼리를 가장 높게, 일회성 탐색 쿼리를 낮게 순위 매긴다 |
| Human annotations | 테이블 소유자가 직접 쓴 설명. business meaning, ownership, criticality, 알려진 caveat | 스키마나 과거 쿼리에서 추론할 수 없는 정보를 담는다 |
| Codex enrichment | 야간 Codex job이 각 테이블을 만드는 pipeline 코드를 읽는다 | 100개에서 200개 테이블 단위 batch, 테이블당 5분에서 10분 소요 |
| Institutional knowledge | Slack 스레드, Google Docs, Notion 페이지 | 별도로 ingest하고 임베딩하며, access-controlled retrieval 서비스로 제공해 권한 없는 문서가 노출되지 않게 한다 |
| Memory | 이전 대화에서 저장된 correction과 learning | global 또는 personal 범위로 구분한다 |
| Runtime context | warehouse 직접 조회, Airflow와 Spark 등 플랫폼 시스템과의 통신 | offline 컨텍스트가 없거나 낡았을 때 채운다 |

Codex enrichment가 코드를 읽어 뽑아내는 것은 네 가지다. 테이블이 실제로 무엇을 담는지, 어떻게 derive되는지, 데이터가 얼마나 최신인지, 그리고 비슷한 테이블 대신 언제 이 테이블을 써야 하는지.

앞의 세 layer는 테이블을 서술하는 층이다. daily offline pipeline이 이 세 층을 테이블당 description 하나로 병합하고, 임베딩 모델이 그 description을 테이블당 벡터 하나로 만들어 저장한다. 런타임에는 질문과 가장 잘 맞는 description을 가진 테이블이 retrieval로 뽑혀 컨텍스트에 들어간다.

memory는 컨텍스트를 조립하는 또 하나의 출처다. 검색된 description 위에 덧입혀져, 에이전트가 과거의 실수를 되풀이하지 않고 더 정확한 기준선에서 시작하게 한다.

나머지 두 layer는 테이블 저장소가 메우지 못하는 빈틈을 담당한다. institutional knowledge는 자체 access-controlled 서비스를 통해 임베딩되고 검색되며, runtime context는 offline description이 없거나 낡았을 때 warehouse에서 즉시 가져온다.

### 3.6 request flow 3단계

| 단계 | 처리 |
|---|---|
| Step 1 질문 임베딩 | offline에서 테이블 description을 임베딩할 때 쓴 것과 같은 임베딩 모델로 질문을 벡터로 바꾼다. retrieval이 검색하는 대상이 이 벡터다 |
| Step 2 컨텍스트 조립 | vector store에서 질문에 가장 잘 맞는 테이블 description을 찾는다. semantic search와 exact text matching을 결합하고, 자체 access-controlled 서비스에서 institutional knowledge를 가져오며, 관련 memory를 더한다 |
| Step 3 agent loop 시작 | 조립된 컨텍스트를 LLM에 넣고 루프를 돌려 SQL을 쓰고 도구 실행 결과를 보고 답이 맞을 때까지 재시도하게 한다 |

에이전트를 신뢰할 만하게 만드는 것은 이 세 단계를 통과하는 컨텍스트의 품질이고, 그 품질은 하부 인프라의 품질과 모델이 그것을 얼마나 쉽게 추론할 수 있는지에 달려 있다고 글은 정리한다.

### 3.7 재현 가능성에 대한 저자의 주장

글은 이 시스템을 구성하는 대부분의 요소가 누구에게나 공개돼 있다고 강조한다. GPT-5.5는 API로 제공되고, OpenAI의 임베딩 API도 공개돼 있으며, Codex도 공개돼 있고, MCP는 열린 프로토콜이다. 원문 표현으로 데이터 플랫폼 팀은 "did not have access to anything a serious engineering team could not get". 팀이 가진 것은 통합되고 깨끗하며 견고한 기반, 신중하게 설계된 컨텍스트 층, 그리고 에이전트 자체를 단순하게 유지하려는 의지였다는 것이 저자의 결론이다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

이 글은 정량 벤치마크 논문이 아니라 운영 사례 보고서다. 인용 가능한 수치는 다음과 같다.

### 4.1 규모 지표

| 항목 | 수치 | 시점과 출처 |
|---|---|---|
| 저장 용량 | 1.5 exabyte | 2026년 5월 기준, 기사 도입부 |
| 데이터셋 수 | 9만 개 | 2026년 5월 기준. 본문 다른 곳에서는 같은 수를 테이블 9만 개로 표기 |
| 사내 사용자 수 | 약 4,000명 | 2026년 5월 기준, 기사 도입부 |
| 도구 수 | 약 40개에서 호출당 약 13개로 | 원문 모두 "around" 표기 |
| Codex enrichment | 100개에서 200개 테이블 단위 batch, 테이블당 5분에서 10분 | 야간 job |
| foundation model | GPT-5.5 단일 | 모든 요청 동일 |

기사 안에 사용자 수가 두 번 등장하고 값이 다르다. 도입부는 약 4,000명, support 사례 절은 5,500명이다. 원문이 두 수치의 관계를 설명하지 않으므로 인용 시 어느 절에서 온 수치인지 밝히는 편이 안전하다.

### 4.2 Codex 사내 활용 사례 3건

| 사례 | 규모 | 결과 |
|---|---|---|
| Cross-cloud migration | DAG 1만 개, 테이블 9만 개, 600 PB, 상호 의존하는 워크로드 수십만 개 | 종단 간 약 2개월 |
| open-source 패치 릴리스 | Spark와 Kafka와 Flink를 포함해 12개가 넘는 fork | 3개월에서 4개월간 사람 개입 없이 운영, 인시던트 0건 |
| support 티켓 처리 | 사내 사용자 5,500명 | 티켓당 몇 시간에서 엔지니어 한 명이 하루 약 100건 처리로 |

**Migration 세부.** 한 클라우드 제공자에서 용량이 부족해져 데이터 자산을 두 번째 클라우드로 빠르게 옮겨야 했던 것이 배경이다. 어려운 부분은 데이터 이동이 아니라 의존 그래프다. 테이블이 DAG를 이루기 때문에 임의 순서로 옮길 수 없고, cutover 도중에는 일부 테이블이 옛 클라우드에 남아 있는 동안 하류 소비자가 이미 새 클라우드에 올라가 있다. 어느 시점에도 각 테이블의 어느 복사본이 authoritative인지 알아야 의존 워크로드가 낡은 원본을 읽지 않는다. 팀은 마이그레이션 진행 중에 올바른 방향으로 데이터를 클라우드 간 복제하는 시스템을 만들었고, 대상 의존 그래프 규모는 원문 표기로 `O(100k)`다.

수십만 개 워크로드가 각각 새 클라우드를 가리키도록 작은 코드 변경을 필요로 했다. 그만큼의 pull request를 사람이 여는 것은 불가능해서 Codex가 대신 생성했고, Codex Skills가 PR마다 테스트와 검증을 처리했다. 팀은 그 주위에 자체 시스템을 만들어 두 가지 난제를 풀었다. 의존 관계 순서대로 변경이 진행되게 하는 ordering과, cutover 동안 각 워크로드가 옛 클라우드와 새 클라우드 양쪽에서 실행되는 사이 데이터 정합성을 유지하는 문제다. 이 시스템이 Codex가 안전하게 작업할 가드레일이 됐다. 비교 대상으로 글은 다른 회사의 유사한 cross-cloud migration이 수년간 이어져 왔다고 언급하지만 비교군의 정량값은 제시하지 않는다.

**Open-source 패치 세부.** 플랫폼은 12개가 넘는 오픈소스 도구 위에서 구동되고, 팀은 각 도구의 자체 버전을 사내에 두고 커스텀 패치를 유지한다. 패치가 추가될 때마다 기존 테스트 스위트로 검증하고 스테이징에서 확인한 뒤 프로덕션으로 롤아웃해야 한다. 테스트 스위트는 길어서 몇 시간짜리도 있고 며칠씩 이어지는 것도 있다. 이전에는 엔지니어가 릴리스마다 붙어서 테스트를 지켜보고 실패를 진단하며 단계적으로 롤포워드했다.

Codex 기반 release agent는 네 가지를 담당한다. 테스트 스위트로 패치를 검증하고, 문제가 생기면 실패를 진단해 수정을 제안하며, 패치를 프로덕션까지 롤아웃하고, 팀에 수행 내용을 알린다.

**Support 세부.** 사용자 5,500명 규모의 플랫폼에는 파이프라인 실패, 대시보드 오류, 권한 링크 미작동 같은 문의가 꾸준히 들어온다. 각 건은 수정 전에 조사가 필요했고, 이 조사 작업이 시니어 엔지니어 시간의 상당 부분을 차지했다. 지금은 support bot이 흔한 질문을 먼저 받아 쉬운 것을 직접 해결하고, bot이 해결하지 못하면 on-call 엔지니어가 최소한의 컨텍스트만 붙여 Codex에 넘긴다. Codex가 조사하고 수정안을 찾아 적용하며 엔지니어는 검토하고 승인한다. 원문 표현으로 "The work is not easier. The engineer is amplified."

### 4.3 다른 팀을 위한 교훈 5가지

| 교훈 | 근거로 제시된 내용 |
|---|---|
| The data foundation matters more than the agent | 코딩 에이전트의 source of truth는 저장소 하나지만 data agent의 source of truth는 회사 전체다. 어느 것도 모델이 읽을 수 있는 형태가 아니면 어떤 에이전트 구조로도 해결되지 않는다 |
| Fewer tools beat more tools | 약 40개 도구를 연결했을 때 모델이 잘못된 도구를 고르고 유사 도구들의 겹치는 응답에 혼란을 겪었다. 호출당 약 13개로 제한하고 겹치는 도구를 제거하자 문제가 해소됐다 |
| Pick trusted queries for retrieval | 과거 쿼리를 전부 임베딩하는 방식을 시도했으나 실패했다. 대부분의 쿼리는 일회성 탐색이지 정본 예시가 아니다. 신뢰도 순위를 매기자 모델이 좋은 패턴을 모방하기 시작했다 |
| Guide the goal, not the path | 질문 유형마다 단계별 지시를 상세히 준 실험에서 에이전트가 지시를 따르되 더 나쁜 답을 냈다. 상위 수준 지침이 더 나았다 |
| Be more ambitious | 마이그레이션의 초기 추정치는 더 길었으나 용량 문제로 2개월을 밀어붙였고 기한을 맞췄다. Codex 이전의 일정 추정은 더 이상 적용되지 않는다는 것이 팀의 결론이다 |

교훈 1에 붙은 인프라 설명은 인터뷰 대상자가 자사 환경을 서술한 내용이다. compute, orchestration, metadata management, storage technology 등 여러 영역에 걸쳐 인프라를 갖췄고, 중복 기술이 없으며 data lake가 통합돼 있다고 밝힌다. 플랫폼의 모든 테이블은 단일 monorepo의 코드가 생성하고, 데이터 엔지니어링 팀이 규약을 강제하며 중복되거나 불명확한 컬럼을 단속한다. 모든 테이블에는 소유자, 중요도, 기대 신선도를 담은 강한 annotation이 붙어 있다.

교훈 2의 실무 지침은 중복 회피다. 두 메타데이터 서비스가 비슷한 정보를 노출하면 에이전트에게 하나만 보이게 하고, 테이블 소유자를 조회하는 방법이 둘이면 하나를 고른다. 원문 표현으로 "The model is better at reasoning than at choosing between near-duplicate tools."

교훈 4에는 일반화된 관찰이 붙는다. 최신 모델은 좋은 정보를 갖고 있을 때 planning을 잘하지만, 무엇을 계획할지 지시받는 데는 덜 능하다는 것이다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

**자료의 한계.**

| 항목 | 내용 |
|---|---|
| 다이어그램 미수집 | 본문이 참조하는 아키텍처 도식과 context assembly 도식이 raw에 없다 |
| vanilla 구조의 baseline 부재 | router가 있는 버전과 없는 버전의 성능 비교가 공개되지 않았다. "the results were bad" 같은 정성 표현만 있다 |
| 비용과 지연 미공개 | GPT-5.5의 요청당 비용, 지연, 처리량 수치가 없다 |
| 도구 목록 미공개 | 약 13개 도구의 구체적 목록이 없다 |
| Codex 품질 지표 미공개 | Codex가 "investigates, finds the fix, and applies it" 한다고만 서술하고 실패율, false positive 비율, 사람의 반려율이 없다 |
| 사용자 수 불일치 | 도입부의 약 4,000명과 support 절의 5,500명이 설명 없이 병존한다 |

**팀이 밝힌 차기 과제.**

| 과제 | 설명 |
|---|---|
| 질문마다 생성되는 맞춤 앱 | 오늘의 분석 도구는 막대 차트, 선 차트, 피벗 테이블 같은 고정 위젯 집합을 준다. 질문이 위젯에 맞지 않으면 스크립트를 직접 쓰거나 데이터 팀에 요청해야 한다. 에이전트는 이미 전통적 대시보드를 요청 시 생성하고 있고, 다음 단계는 자유 형식이다. Codex가 backing store에 연결된 완전한 React 앱을 질문에 맞춰 만든다. 생성에 몇 초가 걸리고 사용자 한 명의 필요에 맞으며 실제 데이터와 실제 가드레일 위에서 실행된다 |
| 플랫폼 측 에이전트 | Codex가 모든 팀을 가속하면서 사용자가 플랫폼에 코드를 밀어 넣는 속도가 팀의 검토 속도를 넘어섰다. 나쁜 UI는 소수 사용자에게 영향을 주지만 공유 인프라의 나쁜 변경은 회사 전체를 멈출 수 있다. 해법은 사용자 대상 에이전트가 아니라 플랫폼 측 에이전트다. 들어오는 코드를 triage하고 실행 전에 검증한다 |

Emma Tang이 든 실제 사례는 잘못된 Flink job이 클러스터에 올라가 클러스터를 다운시킨 경우다. 사용자에게 물으니 "I don't know, I don't know how Flink works, it's vibe-coded. Can you help fix it?"라고 답했다고 한다. 글의 마지막 문장은 "The previous wave of agents helped users do more. The next wave will help platforms keep up."이다.

## 6. 관련 연구 (Related Work)

### 본 ai-wiki 내부 연결

| 자료 | 관련성 |
|---|---|
| [[agents/lee-hoyeon-2026-harness-engineering]] | 프롬프트에서 컨텍스트를 거쳐 harness로 이어지는 3단계 진화를 다룬 강의. 본 글의 LLM과 harness 구도를 한국어로 풀어낸다 |
| [[agents/lin-2026-harness-updating-is-not-harness-benefit]] | base capability와 harness benefit의 분리. OpenAI가 단순한 에이전트에 강한 harness와 컨텍스트를 붙여 후자에 투자한 사례와 직결된다 |
| [[agents/dennis-2026-compiling-agentic-workflows-into-llm]] | 표면의 오케스트레이션을 가중치로 컴파일하는 방향. OpenAI는 오케스트레이션 자체를 무겁게 만들지 않는 반대 입장이다 |
| [[agents/patel-2026-beyond-the-prompt-claude-code]] | 준비 작업이 본체라는 관점. 본 글의 데이터 기반 우선 주장과 같은 성격이다 |
| [[agents/osmani-2026-loop-engineering]] | agent loop를 설계 대상으로 삼는 일반 패턴. 본 글의 3단계 request flow를 추상화한 관점으로 읽을 수 있다 |
| [[agents/zhang-2026-recursive-language-models]] | long-context를 root LLM이 코드로 탐색하는 전략. 본 글이 6개 layer를 테이블당 벡터 하나로 압축하는 것과 대비된다 |
| [[applications/liu-2026-rag-llm-wiki-or-gbrain]] | retrieve와 compile과 act로 나누는 프레임. 본 글의 context assembly는 compile 단계의 산업 사례에 해당한다 |

### 본 글이 언급한 외부 자료

- Codex (OpenAI, 공개)
- MCP (Model Context Protocol, 열린 프로토콜)
- OpenAI Embedding API (공개)
- GPT-5.5 (API로 공개)

## 7. 용어집 (Glossary)

- **Data agent**: 자연어 질문을 받아 9만 개 테이블 중 적절한 것을 찾고 SQL을 작성해 실행하고 결과를 검증하는 사내 에이전트.
- **Context assembly**: 질문에 답하는 데 필요한 정보를 여러 출처에서 모아 LLM 입력으로 조립하는 층. 본 사례가 실제 엔지니어링 작업이 놓인 자리로 지목한 곳이다.
- **Table usage metadata**: 스키마와 lineage와 과거 조회 이력. 인기 대시보드 쿼리와 일회성 쿼리에 다른 가중치를 준다.
- **Codex enrichment**: pipeline 코드를 야간 batch로 읽어 테이블의 실제 내용, 생성 방식, 신선도, 대체 테이블 대비 사용 시점을 추출하는 작업.
- **Institutional knowledge**: Slack과 Google Docs와 Notion에 흩어진 사내 지식. 별도 임베딩과 access-controlled retrieval로 제공된다.
- **Runtime context**: offline description이 낡거나 없을 때 warehouse와 Airflow와 Spark에 즉시 질의해 채우는 경로.
- **Grain (테이블)**: 테이블의 한 행이 무엇 하나를 나타내는지를 정하는 단위. 이 판단이 어긋나면 join과 집계가 조용히 틀린다.
- **Cutover**: 마이그레이션 도중 어느 클라우드의 어느 복사본이 authoritative source인지가 바뀌는 전환 시점.
- **Authoritative source**: 같은 테이블의 여러 복사본 중 하류 워크로드가 읽어야 하는 정본.
- **Codex Skills**: Codex가 생성한 PR마다 테스트와 검증을 수행한 기능. 본 마이그레이션 사례에 등장한다.
- **Vibe-coded**: 사용자가 코드의 실제 동작을 이해하지 못한 채 LLM에 의존해 작성한 코드. 플랫폼 측 에이전트가 필요한 이유로 제시된다.
