---
title: "Computer Memory vs GBrain"
type: article
year: 2026
category: applications
raw_path: raw/articles/gajjar-2026-gbrain-vs-computer-memory.md
raw_filename: "gajjar-2026-gbrain-vs-computer-memory.md"
source_collection: external
author: "Arth Gajjar"
url: "https://devrev.ai/blog/gbrain-individuals-computer-memory-enterprises"
publisher: "DevRev Blog"
publication_date: "2026-05-08"
tags: [gbrain, agent-memory, enterprise, devrev, computer-memory, airsync, karpathy-llm-wiki, salesforce, jira, zendesk, slack]
---

## 한 줄 요약 (One-line Summary)

DevRev의 Tech Lead Arth Gajjar가 "모든 AI agent는 매 세션마다 zero에서 시작한다"는 문제 의식 아래, Garry Tan의 개인용 GBrain과 DevRev의 조직용 Computer Memory를 대비시키고 "누적되는 메모리가 단순히 조회만 하는 메모리를 이긴다"는 공통 원리를 도출한 짧은 비교 에세이다.

## 1. 자료 정보 (Document Information)

- **저자**: Arth Gajjar (Tech Lead @ DevRev)
- **매체**: DevRev Blog (devrev.ai/blog)
- **URL**: <https://devrev.ai/blog/gbrain-individuals-computer-memory-enterprises>
- **게시와 갱신**: Updated 2026-05-08
- **원문 분류**: 상단 Categories 표기는 "Blog, Computer"다.
- **분량과 구성**: 짧은 비교 에세이이고 본문은 4개 절로 이루어진다. "Every AI agent starts from zero", "What GBrain does well", "Where enterprises need something different", "Both prove the same principle" 순서다.
- **이해관계**: 저자 소개줄이 DevRev 소속임을 밝히고 있고, 비교 대상 한쪽이 자사 제품인 Computer Memory다. 원문에는 별도의 이해관계 고지 문단이 없다. 따라서 두 시스템의 우열에 관한 서술은 저자의 평가로 읽어야 한다.
- **raw 취득 방식 주의**: `raw/articles/gajjar-2026-gbrain-vs-computer-memory.md`는 원문 전문이 아니라 WebFetch로 추출한 디지스트다. 파일 머리말이 "일부 문장은 모델이 발췌하거나 재구성했을 수 있다"고 명시한다. 그러므로 아래 요약은 원문의 논지 수준까지 신뢰할 수 있고, 큰따옴표로 옮긴 문장도 원문 대조 없이는 축자 인용으로 확정하기 어렵다.

## 2. 주요 기여 (Key Contributions)

1. **"Every AI agent starts from zero" 문제 정의**. 모든 AI agent는 이전 상호작용에서 얻은 컨텍스트나 지식 없이 각 세션을 시작한다. 그 결과 account renewal이나 revenue blocker처럼 비즈니스에 중요한 세부를 이해하는 데 필요한 정보를 갖지 못한다.
2. **GBrain 요점 정리**. Y Combinator president인 Garry Tan이 만들었고 2026년 4월에 open-source로 공개했다. markdown 파일, people page, calendar 데이터를 인덱싱하며, agent가 응답 전에 컨텍스트를 읽고 응답 후에 메모리를 갱신하게 한다. 글이 인용한 Tan 본인의 운영 규모는 17,888 페이지, 4,383명의 contact, 723개 회사이고 모두 밀리초 단위로 검색된다.
3. **GBrain 저장과 검색 구조**. 지식을 git 저장소 안의 markdown 파일로 저장하고, hybrid search를 위해 Postgres와 pgvector를 쓴다.
4. **GBrain 페이지 schema 한 줄 정의**. "compiled truth on top (rewritten as evidence changes), append-only timeline below (preserving the proof trail)". 여기에 entity page를 보강하고 메모리를 통합하는 야간 dream cycle이 붙는다.
5. **Computer Memory의 포지셔닝**. 개인용이 아니라 조직 단위 지식 시스템으로 기능한다. DevRev의 AirSync는 Salesforce, Jira, Zendesk, Slack을 포함한 50개 이상의 시스템에 연결되는 양방향 sync 엔진이다.
6. **개인과 엔터프라이즈의 차이 세 가지** (원문 소제목 "Three key architectural differences").
   1. **Shared, not personal**: Computer Memory는 조직 전체에서 지식을 누적해 cross-team 가시성을 만든다.
   2. **Two-way sync, not manual ingestion**: 수동 절차 없이 연속적이고 실시간인 동기화를 수행한다.
   3. **Enterprise-grade permissions**: flat-file 접근과 대비되는 SOC 2 준수 접근 제어를 제공한다.
7. **공통 thesis 정식화**. "Memory that compounds beats memory that just retrieves". GBrain이 개인 영역에서, Computer Memory가 엔터프라이즈 영역에서 같은 원리를 입증한다는 것이 글의 결론이다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

- **형식**: 논문이나 코드가 아니라 비교 에세이다. 새 알고리즘도, 새 벤치마크 설계도 없다.
- **GBrain 서술 범위**: 글이 언급하는 GBrain 요소는 markdown과 people page와 calendar 인덱싱, git 저장소, Postgres와 pgvector 기반 hybrid search, compiled truth와 append-only timeline의 2층 페이지 schema, 야간 dream cycle이다. 순위 합산이나 중복 제거, typed edge 같은 검색 알고리즘 세부는 다루지 않는다.
- **Computer Memory 서술 범위**: AirSync가 50개 이상의 시스템과 양방향으로 동기화한다는 점, 조직 단위로 지식을 누적한다는 점, SOC 2 준수 접근 제어를 갖췄다는 점만 서술된다. 내부 retrieval 구조, 즉 graph 사용 여부와 임베딩 모델과 색인 방식은 글에 나오지 않는다.
- **권한 모델 대비**: 글은 GBrain 쪽을 flat-file access로, Computer Memory 쪽을 SOC 2 준수 접근 제어로 요약한다. 이 한 줄이 세 번째 차이 항목의 전부이고, 구체적인 권한 모델 설명은 양쪽 모두 없다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

이 글에는 정량 벤치마크가 없다. 인용된 정량 수치는 세 가지다.

- **GBrain 운영 사례**: 17,888 페이지, 4,383명의 contact, 723개 회사. Tan 본인의 personal brain 기준이다.
- **AirSync 커넥터 수**: 50개 이상의 시스템. 명시된 예시는 Salesforce, Jira, Zendesk, Slack이다.
- **규제 표준**: SOC 2.

저장소 자료와 대조하면 첫 수치가 어긋난다. `raw/repos/garrytan-gbrain.md` 첫 단락은 같은 personal brain을 146,646 페이지, 24,585명, 5,339개 회사, 자율 실행 중인 cron job 66개로 적는다. 이 글이 인용한 값은 그보다 대략 한 자릿수 작다. 어느 한쪽이 틀렸다고 볼 근거는 저장소가 보유한 자료에 없으므로, 이 글의 수치는 글이 인용한 시점의 값으로 읽는 것이 자료에 부합한다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **이해관계 고지 부재**: 저자가 DevRev 소속이고 비교 대상 한쪽이 자사 제품인데 원문에 별도 고지 문단이 없다. 세 가지 차이 항목은 관찰된 사실이 아니라 저자의 평가다.
- **Computer Memory의 검증 불가**: 내부 retrieval 구조가 글에 서술되지 않아 GBrain 쪽만큼 사실 대조를 할 수 없다. 검증 가능한 정보는 커넥터 수와 준수 표준 두 가지뿐이다.
- **운영 규모 수치의 시점 차이**: 4절의 대조를 참고한다. 이 글만 읽으면 GBrain의 운영 규모를 저장소 문서가 적는 값보다 작게 인식하게 된다.
- **"manual ingestion" 라벨의 범위**: [[applications/mantena-2026-hermes-gbrain-setup-vps]]는 Hermes에게 PDF 인제스션을 한 줄로 지시하면 brain page 작성까지 위임되고 5분 간격 cron이 sync를 수행하는 운영을 기록한다. 따라서 이 라벨은 사람이 매번 파일을 직접 만든다는 뜻이라기보다 first-class 엔터프라이즈 커넥터가 없다는 뜻에 가깝다.
- **"flat-file access" 라벨의 범위**: `raw/repos/garrytan-gbrain.md`는 로그인 단위로 brain을 분할해 각자 허용된 범위만 조회하게 하는 company brain 모드를 서술한다. 이 글의 권한 대비가 그 기능 이전 시점을 가리키는 것인지, 저자가 그 모드를 다루지 않은 것인지는 저장소 자료만으로 판정할 수 없다.
- **사용자 군의 차이를 다루지 않음**: 멀티테넌트 격리와 컴플라이언스가 필요한 조직과, plain text 소유권과 개인 brain을 원하는 단일 운영자는 서로 다른 사용자 군이다. 글은 두 시스템을 같은 기준에 놓고 비교하면서 이 점을 명시하지 않는다.

## 6. 관련 연구 (Related Work)

- [[applications/garrytan-gbrain]]: 본 글이 묘사하는 GBrain의 1차 자료. 운영 규모 수치와 권한 모델 서술을 대조할 기준이다.
- [[applications/vectorize-2026-gbrain-review-honest-assessment]]: GBrain을 10개 항목으로 채점한 외부 리뷰. Multi-tenant readiness 1점과 Integration breadth 2점이 본 글의 비교 프레임과 같은 지점을 가리킨다.
- [[applications/mantena-2026-hermes-gbrain-setup-vps]]: Hermes와 GBrain을 결합한 설치 가이드. manual ingestion 라벨의 적용 범위를 좁힌다.
- Karpathy LLM Wiki 패턴: 본 글이 직접 호명하지는 않지만 GBrain과 이 저장소가 공유하는 전제다.

## 7. 용어집 (Glossary)

- **AirSync**: DevRev의 양방향 sync 엔진. 50개 이상의 SaaS 시스템과 실시간으로 양방향 동기화한다.
- **Computer Memory**: DevRev 제품. 개인이 아니라 조직 단위로 지식을 누적하는 메모리 시스템으로 포지셔닝된다.
- **compiled truth와 append-only timeline**: GBrain의 페이지 schema. 상단은 증거가 바뀔 때마다 다시 쓰이는 현재 결론이고, 하단은 증거 이력을 추가만 하며 보존하는 층이다.
- **dream cycle**: GBrain의 야간 자동 처리. entity page를 보강하고 메모리를 통합한다.
- **SOC 2**: System and Organization Controls 2. SaaS 보안 통제 표준이다.
