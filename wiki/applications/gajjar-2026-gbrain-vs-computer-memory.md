---
title: "Computer Memory vs GBrain (DevRev)"
type: article
year: 2026
category: applications
raw_path: raw/articles/gajjar-2026-gbrain-vs-computer-memory.md
raw_filename: "gajjar-2026-gbrain-vs-computer-memory.md"
source: gajjar-2026-gbrain-vs-computer-memory.md
source_collection: external
author: "Arth Gajjar"
url: "https://devrev.ai/blog/gbrain-individuals-computer-memory-enterprises"
publisher: "DevRev Blog"
publication_date: "2026-05-08"
tags: [gbrain, agent-memory, enterprise, devrev, computer-memory, airsync, two-way-sync, soc2]
---

## 요약

DevRev의 Tech Lead인 Arth Gajjar가 2026년 5월에 게시한 짧은 비교 에세이다. 하나의 문제를 세우고 두 개의 답을 나란히 놓는 구성을 취한다. 문제는 AI agent가 매 세션을 이전 기록 없이 다시 시작한다는 것이고, 두 답은 Garry Tan의 개인용 GBrain과 DevRev의 조직용 Computer Memory다.

글의 결론은 두 시스템 중 하나를 고르는 것이 아니라 둘이 공유하는 원리를 짚는 데 있다. 누적되는 메모리가 단순히 조회만 하는 메모리보다 낫고, GBrain은 개인 영역에서, Computer Memory는 엔터프라이즈 영역에서 그 원리를 각각 입증한다는 것이다.

읽을 때 전제해야 할 사실이 하나 있다. 저자는 비교 대상 한쪽을 만드는 회사에 소속돼 있고, 원문에는 그 이해관계를 따로 밝히는 문단이 없다. 그래서 이 페이지는 글이 서술한 내용과 저자가 내린 평가를 구분해 옮기고, 저장소가 보유한 다른 자료와 대조되는 지점을 한계 절에 따로 모은다.

## 배경

### 세션마다 초기화되는 에이전트

글의 출발점은 agent의 망각이다. 모든 AI agent는 이전 상호작용에서 얻은 컨텍스트나 지식 없이 각 세션을 시작한다. 대화가 끝나면 그 대화에서 알게 된 것도 함께 사라진다.

저자는 이 결핍이 업무 현장에서 어떤 형태로 나타나는지를 두 가지 예로 든다. account renewal, 즉 고객 계약 갱신 시점이 언제인지와 revenue blocker, 즉 매출을 막고 있는 요인이 무엇인지다. 둘 다 문서 한 건을 검색해서 답할 수 있는 종류가 아니라, 누적된 이력을 알고 있어야 답할 수 있는 종류의 질문이다.

### 개인용 해법으로 등장한 GBrain

글이 첫 번째 답으로 소개하는 것이 GBrain이다. Y Combinator president인 Garry Tan이 만들었고 2026년 4월에 open-source로 공개했다.

동작 방식은 두 방향의 흐름으로 요약된다. GBrain은 markdown 파일과 people page와 calendar 데이터를 인덱싱해 두고, agent는 응답하기 전에 그 컨텍스트를 읽고 응답한 뒤에 메모리를 갱신한다. 읽기만 하는 저장소가 아니라 쓰기까지 하는 저장소라는 점이 요지다.

글은 Tan 본인의 운영 규모를 근거로 인용한다. 17,888 페이지, 4,383명의 contact, 723개 회사이고 모두 밀리초 단위로 검색된다. 이 수치는 저장소가 보유한 GBrain README의 현재 값과 어긋나며, 그 대조는 한계 절에서 따로 다룬다.

### 글이 놓인 자리

이 글은 논문도 코드도 아니고 새 알고리즘이나 벤치마크를 제시하지 않는다. 두 시스템의 설계 전제를 대조하는 산문 에세이이고, 본문은 네 개 절로 짧게 구성된다.

## 핵심 개념

**누적되는 메모리와 조회만 하는 메모리**는 이 글 전체를 떠받치는 대비다. 조회만 하는 메모리는 질문이 들어올 때마다 저장된 문서에서 관련 조각을 찾아 돌려준다. 누적되는 메모리는 거기에 더해 사용할수록 저장된 내용 자체가 정리되고 보강된다. 글의 마지막 문장 "Memory that compounds beats memory that just retrieves"가 이 대비를 그대로 압축한 것이다.

**compiled truth와 append-only timeline**은 글이 인용한 GBrain의 페이지 schema다. 페이지 상단에는 현재 시점의 결론이 놓이고 증거가 바뀔 때마다 다시 쓰인다. 하단에는 그 결론에 이르게 한 증거가 시간 순으로 쌓이며 지워지지 않는다. 결론과 근거를 한 페이지 안에서 분리해 두면 결론은 최신 상태로 유지하면서도 근거 이력은 보존할 수 있다.

**dream cycle**은 GBrain이 야간에 자동으로 수행하는 처리를 부르는 이름이다. entity page를 보강하고 메모리를 통합한다. 사람이 잠든 사이에 저장소가 스스로 정돈된다는 점에서 앞의 누적 개념을 실제로 구현하는 장치에 해당한다.

**two-way sync**는 외부 시스템과 지식 저장소 사이에서 데이터가 양쪽 방향으로 오가는 동기화를 뜻한다. 한 방향 수집은 외부에서 읽어 오기만 하지만, 양방향 동기화는 저장소에서 일어난 변경도 외부 시스템으로 돌려보낸다. 글이 GBrain과 Computer Memory를 가르는 두 번째 기준으로 삼은 것이 이 성질이다.

**SOC 2**는 System and Organization Controls 2의 약어로, SaaS 사업자의 보안 통제를 심사하는 표준이다. 글은 이 표준의 준수 여부를 엔터프라이즈용 접근 제어와 flat-file 접근을 가르는 기준으로 제시한다. flat-file 접근은 파일 단위 권한만으로 열람 범위를 정하는 방식을 가리킨다.

## 방법

### 글의 전개 구조

원문은 네 개 절로 이루어진다. 문제 제기, 한쪽 시스템의 장점, 다른 쪽이 필요한 이유, 공통 결론 순서로 진행하는 전형적인 비교 구성이다.

| 절 | 원문 제목 | 다루는 내용 |
|---|---|---|
| 1 | Every AI agent starts from zero | agent가 세션마다 컨텍스트 없이 시작한다는 문제 제기 |
| 2 | What GBrain does well | GBrain의 저장 구조, 검색 방식, dream cycle |
| 3 | Where enterprises need something different | 조직 단위 지식 시스템으로서 Computer Memory와 AirSync |
| 4 | Both prove the same principle | 누적되는 메모리라는 공통 원리 |

### 글이 정리한 GBrain

글이 언급하는 GBrain 요소는 다섯 가지다. 저장 위치, 색인 대상, 검색 방식, 페이지 구조, 야간 처리로 나뉜다.

| 구성 요소 | 글의 서술 |
|---|---|
| 저장 위치 | git 저장소 안의 markdown 파일 |
| 색인 대상 | markdown 파일, people page, calendar 데이터 |
| 검색 방식 | Postgres와 pgvector를 사용한 hybrid search |
| 페이지 구조 | 상단 compiled truth, 하단 append-only timeline |
| 야간 처리 | dream cycle이 entity page를 보강하고 메모리를 통합 |

순위 합산이나 중복 제거, typed edge 같은 검색 알고리즘 세부는 이 글에 나오지 않는다. 그 층위는 [[applications/garrytan-gbrain]]이 다룬다.

### 글이 제시한 Computer Memory

Computer Memory에 관해 글이 서술하는 항목은 GBrain 쪽보다 적다. 성격, 연결 방식, 접근 제어 세 가지뿐이다.

| 항목 | 글의 서술 |
|---|---|
| 성격 | 개인용이 아니라 조직 단위 지식 시스템 |
| 연결 방식 | AirSync가 50개 이상의 시스템과 양방향 동기화 |
| 연결 대상 예시 | Salesforce, Jira, Zendesk, Slack |
| 접근 제어 | SOC 2 준수 |

내부 retrieval 구조는 서술되지 않는다. graph를 쓰는지, 어떤 임베딩 모델을 쓰는지, 색인을 어떻게 만드는지가 모두 글에 없다.

### 세 가지 차이

글의 뼈대는 "Three key architectural differences"라는 소제목 아래 놓인 세 항목이다. 각 항목은 개인용 설계와 조직용 설계가 어디에서 갈라지는지를 한 문장씩으로 대비시킨다.

| 기준 | GBrain 쪽 서술 | Computer Memory 쪽 서술 | 저자가 든 효과 |
|---|---|---|---|
| 지식의 소유 범위 | personal, 한 사람의 brain | shared, 조직 전체에서 누적 | cross-team 가시성 |
| 외부 시스템 연결 | manual ingestion | two-way sync | 수동 절차 없는 연속적 실시간 동기화 |
| 접근 제어 | flat-file access | SOC 2 준수 접근 제어 | 엔터프라이즈 수준의 권한 관리 |

세 항목은 성격이 같다. 모두 "혼자 쓰는가, 조직이 함께 쓰는가"에서 파생되는 요구 사항이다. 여러 사람이 함께 쓰면 지식이 개인 경계를 넘어야 하고, 사람이 아니라 시스템이 데이터를 계속 옮겨 줘야 하며, 누가 무엇을 볼 수 있는지가 파일 권한보다 정교해야 한다.

## 결과

### 인용된 정량 수치

이 글에는 벤치마크가 없다. 검증 가능한 정량 정보는 아래 네 항목이 전부다.

| 수치 | 값 | 대상 |
|---|---|---|
| GBrain 운영 규모 | 17,888 페이지, 4,383명의 contact, 723개 회사 | Tan 본인의 personal brain |
| 검색 응답 | 밀리초 단위 | 위 규모 전체에 대해 |
| AirSync 커넥터 | 50개 이상의 시스템 | DevRev Computer Memory |
| 준수 표준 | SOC 2 | DevRev Computer Memory |

두 시스템을 같은 과제로 측정한 수치는 하나도 없다. 따라서 이 글은 성능 비교가 아니라 설계 전제 비교로 읽어야 한다.

### 글의 결론

저자는 두 시스템을 경쟁 관계로 놓지 않고 같은 원리의 두 사례로 묶는다. 누적되는 메모리가 조회만 하는 메모리를 이긴다는 명제를 GBrain이 개인 영역에서, Computer Memory가 엔터프라이즈 영역에서 각각 입증한다는 것이다.

이 결론은 세 가지 차이 항목과 방향이 맞는다. 앞에서 나열한 차이는 원리의 차이가 아니라 적용 범위의 차이이기 때문이다.

## 한계

### 이해관계와 검증 범위

저자는 DevRev 소속이고 비교 대상 한쪽이 자사 제품이다. 소속은 저자 소개줄에 드러나 있으나 원문에 별도의 이해관계 고지 문단은 없다. 그러므로 세 가지 차이 항목은 관찰된 사실이 아니라 저자의 평가로 읽어야 한다.

검증 가능성도 한쪽으로 기울어 있다. GBrain 쪽 서술은 공개된 저장소와 대조할 수 있지만, Computer Memory 쪽은 커넥터 수와 준수 표준 두 가지 외에 확인할 근거가 글에 없다.

### 운영 규모 수치의 시점 차이

글이 인용한 GBrain 운영 규모는 저장소가 보유한 README의 값과 크게 다르다. 두 값을 나란히 놓으면 다음과 같다.

| 항목 | 이 글이 인용한 값 | `raw/repos/garrytan-gbrain.md`의 값 |
|---|---|---|
| 페이지 | 17,888 | 146,646 |
| 인물 | 4,383 (contact) | 24,585 |
| 회사 | 723 | 5,339 |
| 자율 실행 cron job | 언급 없음 | 66 |

차이는 대략 한 자릿수다. 어느 한쪽이 틀렸다고 볼 근거는 저장소가 보유한 자료에 없으므로, 이 글의 수치는 글이 인용한 시점의 값으로 읽는 것이 자료에 부합한다. 다만 이 글만 읽고 GBrain의 규모를 판단하면 실제보다 작게 인식하게 된다.

### 두 라벨의 적용 범위

저자가 GBrain 쪽에 붙인 두 라벨은 저장소의 다른 자료와 대조하면 범위가 좁아진다.

| 라벨 | 대조 자료 | 대조 결과 |
|---|---|---|
| manual ingestion | [[applications/mantena-2026-hermes-gbrain-setup-vps]] | Hermes에게 PDF 인제스션을 한 줄로 지시하면 brain page 작성까지 위임되고, 5분 간격 cron이 sync를 수행한다 |
| flat-file access | [[applications/garrytan-gbrain]] | README가 로그인 단위로 brain을 분할해 각자 허용된 범위만 조회하게 하는 company brain 모드를 서술한다 |

첫 라벨은 사람이 매번 파일을 직접 만든다는 뜻이라기보다 first-class 엔터프라이즈 커넥터가 없다는 뜻에 가깝다. 두 번째 라벨이 해당 기능 이전 시점을 가리키는 것인지 저자가 그 모드를 다루지 않은 것인지는 저장소 자료만으로 판정할 수 없다.

### 사용자 군의 차이

멀티테넌트 격리와 컴플라이언스가 필요한 조직과, plain text 소유권과 개인 brain을 원하는 단일 운영자는 서로 다른 사용자 군이다. 글은 두 시스템을 같은 기준에 놓고 비교하면서 이 점을 명시하지 않는다.

같은 지점을 외부 리뷰도 지적한다. [[applications/vectorize-2026-gbrain-review-honest-assessment]]는 GBrain의 Multi-tenant readiness에 5점 만점 중 1점을, Integration breadth에 2점을 주면서 그것을 결함이 아니라 설계 범위의 결과로 읽는다.

### 원문 취득 방식

저장소의 raw 파일은 원문 전문이 아니라 WebFetch로 추출한 디지스트다. 파일 머리말이 "일부 문장은 모델이 발췌하거나 재구성했을 수 있다"고 명시한다. 논지 수준의 요약은 신뢰할 수 있으나, 큰따옴표로 옮긴 문장을 축자 인용으로 확정하려면 원문 대조가 필요하다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| AirSync | DevRev의 양방향 sync 엔진. 50개 이상의 SaaS 시스템과 실시간으로 양방향 동기화한다 |
| Computer Memory | DevRev 제품. 개인이 아니라 조직 단위로 지식을 누적하는 메모리 시스템으로 포지셔닝된다 |
| compiled truth와 append-only timeline | GBrain의 페이지 schema. 상단은 증거가 바뀔 때마다 다시 쓰이는 현재 결론이고, 하단은 증거 이력을 추가만 하며 보존하는 층이다 |
| dream cycle | GBrain의 야간 자동 처리. entity page를 보강하고 메모리를 통합한다 |
| SOC 2 | System and Organization Controls 2. SaaS 보안 통제 표준이다 |

## 관련 페이지

- [[applications/garrytan-gbrain]]: 이 글이 묘사하는 GBrain의 1차 자료. 운영 규모 수치와 company brain 권한 모델을 대조할 기준이다.
- [[applications/vectorize-2026-gbrain-review-honest-assessment]]: 같은 대상을 10개 항목으로 채점한 외부 리뷰. 이 글이 DevRev 제품과의 대비로 지적한 한계를, 이해관계 없는 제3자가 점수와 근거로 같은 결론에 도달한 사례로 읽을 수 있다.
- [[applications/mantena-2026-hermes-gbrain-setup-vps]]: Hermes와 GBrain을 결합한 설치 가이드. 이 글의 manual ingestion 라벨이 적용되는 범위를 좁힌다.
- [[applications/kmyu-2026-akb-llmwiki-gbrain-comparison]]: 개인 지식 베이스 계열 시스템을 나란히 비교한 저장소 내부 페이지.
