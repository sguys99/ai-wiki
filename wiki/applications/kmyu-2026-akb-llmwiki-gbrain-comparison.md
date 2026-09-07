---
title: "AKB, llmwiki, GBrain 비교 및 AKB 발전 방향"
type: report
year: 2026
category: applications
raw_path: raw/reports/kmyu-2026-akb-llmwiki-gbrain-comparison.pdf
raw_filename: "kmyu-2026-akb-llmwiki-gbrain-comparison.pdf"
source: kmyu-2026-akb-llmwiki-gbrain-comparison.md
source_collection: external
org: "kmyu"
url: ""
tags: [akb, llmwiki, gbrain, agent-memory, shared-memory, knowledge-base, memory-platform, comparison, dnotitia, karpathy, garry-tan, strategy, positioning]
---

# AKB, llmwiki, GBrain 비교 및 AKB 발전 방향

## 요약

2026-04-18에 작성된 6페이지 분량의 전략 보고서다. agent memory를 knowledge base로 바꾸는 세 가지 접근인 AKB, llmwiki, GBrain을 같은 기준으로 비교하고, 그 결과를 근거로 AKB가 나아갈 방향을 제안한다.

비교는 두 가지 방식을 함께 쓴다. 하나는 6개 운영 항목을 5점 척도로 매긴 정량 점수표이고, 다른 하나는 핵심 역할부터 리스크까지 8개 관점을 나란히 놓은 정성 비교표다. 여기에 장기기억 관점과 공유 knowledge base 관점의 세부 비교, 시스템별 장단점 정리가 이어진다.

결론은 세 시스템이 각각 다른 자리에서 가장 강하다는 것이다. GBrain은 가장 강한 장기기억 엔진이고, llmwiki는 가장 좋은 공유형 knowledge base 결과물이며, AKB는 가장 좋은 shared memory substrate다. 세 시스템의 만점 항목이 하나도 겹치지 않는다는 점이 이 판단을 뒷받침한다.

보고서의 제안은 여기서 한 걸음 더 나아간다. AKB가 "shared memory DB"에 머물지 않고 "조직의 공용 agent memory operating platform"이 되려면, Phase 1에서 현재 강점을 다지고 Phase 2에서 GBrain식 운영 기능을 흡수하며 Phase 3에서 llmwiki식 publish layer를 확장하라는 3단계 로드맵을 제시한다.

## 배경

### 같은 문제를 서로 다른 층위에서 푸는 세 시스템

에이전트가 대화 한 번을 넘어 지식을 계속 쌓으려면 그 지식을 어딘가에 남겨야 한다. 남기는 방식은 하나가 아니다. 데이터베이스에 항목으로 저장할 수도 있고, 사람이 읽는 문서로 컴파일할 수도 있으며, 스스로 정리하고 보강하는 운영 체계로 만들 수도 있다.

보고서가 비교하는 세 시스템이 각각 이 세 가지 방식을 대표한다. AKB는 여러 에이전트가 공유하는 데이터베이스 기반 backend이고, llmwiki는 세션과 노트를 서로 연결된 위키로 컴파일하며, GBrain은 수집부터 유지보수까지 자동화한 memory OS에 가깝다.

보고서의 목적은 서두에 명시되어 있다. "agent memory를 knowledge base화하는 세 가지 접근, 즉 AKB, llmwiki, GBrain을 비교하고, 그 장단점을 반영한 AKB 발전 방향을 제안한다"는 것이다. 비교 자체가 목적이 아니라 AKB의 다음 단계를 정하기 위한 비교다.

### 정보량이 균등하지 않은 비교

보고서는 서두에서 비교의 전제를 하나 밝힌다. "AKB는 공개 정보가 상대적으로 적어, 아래 평가는 공개 확인 가능한 정보 기준으로 작성했다"는 문장이다.

이 전제는 본문 곳곳에 그대로 반영된다. AKB의 약점을 서술할 때 보고서는 "공개 정보 기준으로는 (중략) 약하게 보인다", "공개 기준으로는 product layer가 얇다"처럼 유보 표현을 쓴다. 기술 스택도 "PostgreSQL과 pgvector 기반으로 보이며"라고 적어 확정하지 않는다.

따라서 AKB의 낮은 점수는 기능이 실제로 없다는 뜻이 아니라 공개된 자료에서 확인되지 않는다는 뜻으로 읽어야 한다. 보고서가 인용한 AKB 관련 공개 자료는 LobeHub의 MCP 목록 한 건뿐이다.

### 인용한 외부 자료

보고서 9절이 밝힌 근거 자료는 네 건이며, 모두 공개된 gist, README, MCP 목록이다. 논문이나 표준 벤치마크는 인용하지 않는다.

| 번호 | 자료 | 위치 | 비교에서의 역할 |
|---|---|---|---|
| 1 | Andrej Karpathy, llm-wiki pattern gist | `gist.github.com/karpathy/442a6bf555914893e9891c11519de94f` | llmwiki 패턴의 원형 |
| 2 | Pratiyush, llmwiki README | `github.com/Pratiyush/llm-wiki` | llmwiki 평가 대상의 OSS 구현 |
| 3 | Garry Tan, GBrain README | `github.com/garrytan/gbrain` | GBrain 평가 대상의 OSS |
| 4 | LobeHub MCP listing, AKB | `lobehub.com/mcp/foose212-akb-server` | AKB 평가의 유일한 공개 근거 |

## 핵심 개념

**shared memory substrate**는 여러 에이전트가 동시에 읽고 쓰는 canonical 기억 저장 계층을 뜻한다. 보고서는 AKB가 이미 이 자리를 잘 차지하고 있다고 보며, 발전 방향의 출발점으로 삼는다.

**memory operating platform**은 substrate 위에 governance, maintenance, publish 계층을 더한 형태다. 저장만 하는 것이 아니라 저장된 기억의 품질과 수명을 관리하고 그 일부를 밖으로 내보내는 데까지 책임지는 구조를 가리킨다. 보고서는 이것을 AKB의 도착지로 지목한다.

**compiled artifact**는 실시간으로 갱신되는 저장소가 아니라 한 번 정리해 만들어 낸 결과물을 뜻한다. 보고서는 llmwiki의 핵심 산출물을 이 성격으로 규정하며, 이 규정이 llmwiki가 실시간 backend 항목에서 낮은 점수를 받는 이유가 된다.

**lifecycle 관리**는 memory entry에 draft, active, stale, archived 같은 상태값을 부여해 기억의 수명을 추적하는 기능이다. 보고서는 이 기능을 AKB Phase 1의 두 번째 과제로 배치한다.

**brain-first query policy**는 외부 검색을 하기 전에 내부 knowledge base를 먼저 조회하도록 시스템에 내장하는 정책이다. 보고서는 이를 GBrain에서 가져올 기능으로 분류한다.

**tiered enrichment**는 엔티티에 단계적으로 메타 정보를 채워 넣는 방식이다. 사람, 회사, 프로젝트처럼 반복 등장하는 대상의 페이지를 자동으로 두껍게 만드는 기능을 가리키며, 보고서는 이를 GBrain의 강점으로 표기한다.

**memory governance**는 저장된 기억에 타입과 상태값과 출처를 부여해 품질과 수명을 통제하는 활동을 묶어 부르는 이름이다. 보고서는 AKB가 backend만으로는 차별화가 약하므로 governance까지 올라가야 한다고 본다.

**publishability**는 축적한 기억을 사람이나 다른 시스템이 읽을 수 있는 형태로 내보낼 수 있는 성질을 뜻한다. 보고서 8절은 memory governance, maintenance와 함께 이 성질을 AKB가 확보해야 할 세 가지로 나열한다.

**proactive agent**는 사용자의 질문을 기다리기만 하지 않고 먼저 움직이는 에이전트를 가리킨다. 보고서는 이런 에이전트를 장기 운영하려는 개인과 팀을 GBrain의 최적 사용자로 지목한다.

## 방법

### 평가 설계

보고서는 5점 만점 척도로 6개 항목을 평가하며, 5점이 가장 강하다고 명시한다. 항목 구성은 아래와 같다.

- 장기기억 운영력
- 사람 공유용 KB 적합성
- multi-agent shared backend 적합성
- 자동 maintenance / enrichment
- 도입 및 운영 단순성
- 결과물의 가독성 / 배포성

여섯 항목은 성격상 세 쌍으로 묶인다. 앞의 두 항목은 기억을 얼마나 잘 다루는가와 사람에게 얼마나 잘 보여주는가를 나눠 묻고, 가운데 두 항목은 여러 에이전트를 감당하는 능력과 자동 정리 능력을 묻는다. 뒤의 두 항목은 도입 비용과 산출물의 배포 편의를 묻는다.

정량 점수만으로는 왜 그런 점수가 나왔는지 알기 어렵기 때문에, 보고서는 같은 세 시스템을 정성 관점에서 다시 비교한다. 정성 비교는 세 층으로 진행된다. 먼저 8개 관점의 전략 비교표를 놓고, 다음으로 장기기억 관점과 공유 knowledge base 관점을 각각 강점과 약점으로 나눠 서술하며, 마지막으로 시스템별 장단점을 모아 정리한다.

### 전략 관점 비교

보고서 3절의 비교표는 세 시스템의 성격 차이를 가장 압축적으로 보여준다. 핵심 역할과 저장 단위 같은 구조적 특성부터 각 시스템이 안고 있는 리스크까지 8개 관점을 다룬다.

| 관점 | AKB | llmwiki | GBrain |
|---|---|---|---|
| 핵심 역할 | MCP 기반 shared memory backend | 세션과 노트를 interlinked wiki로 컴파일 | agent brain 운영체계에 가까운 memory OS |
| 주 저장 단위 | DB 기반 memory entry, collection, shared context | markdown page, session transcript, static site | brain page, entity, report, task, recurring job |
| 최적 사용자 | 여러 에이전트와 app이 같은 memory를 공유하는 팀 | 사람과 AI가 함께 읽는 문서형 knowledge base가 필요한 팀 | proactive agent를 장기 운영하려는 개인과 팀 |
| 장기기억 방식 | 저장 및 검색 중심 | 정리된 지식 결과물 축적 중심 | ingest, enrich, maintain, query의 순환 구조 |
| 사람 친화적 가독성 | 제한적 | 매우 강함 | 중간 |
| 자동 유지보수 | 상대적으로 약함 | lint, confidence, lifecycle 중심 | 매우 강함, cron 및 유지보수 루프 내장 |
| 공유 방식 | MCP 중심 공유 | 정적 사이트, llms.txt, JSON-LD 등 문서 배포에 강함 | MCP, publish 기능, brain-first agent 운영 |
| 리스크 | 제품 계층이 얇으면 단순 벡터 스토어처럼 보일 수 있음 | runtime memory보다는 compiled artifact에 가까움 | 구조가 무겁고 운영 복잡도가 높음 |

세 시스템의 저장 단위가 서로 다르다는 점이 나머지 차이를 대부분 설명한다. AKB는 데이터베이스의 행에 해당하는 memory entry를 다루고, llmwiki는 markdown 페이지를 다루며, GBrain은 페이지뿐 아니라 entity와 task와 recurring job까지 저장 단위로 삼는다. 저장 단위에 task와 job이 들어간다는 것은 GBrain이 기억을 보관하는 데서 멈추지 않고 기억을 대상으로 무언가를 실행한다는 뜻이다.

리스크 항목은 각 시스템이 실패할 때의 모습을 적은 것이라는 점에서 유용하다. AKB는 제품 계층이 얇으면 단순 벡터 스토어와 구별되지 않고, llmwiki는 실시간 기억이 아니라는 한계에 부딪히며, GBrain은 무거운 구조와 높은 운영 복잡도가 부담이 된다.

### 장기기억 관점 세부 비교

보고서 4.1절은 기억을 얼마나 잘 다루는지를 기준으로 세 시스템을 나눠 본다.

| 시스템 | 강점 | 약점 |
|---|---|---|
| AKB | 여러 에이전트가 같은 memory를 조회하고 갱신하는 공용 기억 저장소 역할에 적합하다. PostgreSQL과 pgvector 기반으로 보이며 실용적이고 확장 가능한 backend 설계와 잘 맞는다. MCP 인터페이스 중심이라 에이전트 생태계와 붙이기 쉽다 | 공개 정보 기준으로는 enrichment, citation repair, staleness 관리, entity lifecycle 같은 고차 memory 운영 기능이 약하게 보인다. 현재 상태만으로는 "잘 만든 shared memory DB"에 가깝고 "스스로 기억을 가꾸는 brain"과는 거리가 있다 |
| llmwiki | 단순 저장이 아니라 knowledge를 재구성한 위키를 남긴다. 세션 기록이 사라지지 않고 문서화된 지식으로 누적된다. confidence, lifecycle, lint가 있어 지식 품질 관리가 가능하다 | 핵심 산출물이 정리된 wiki artifact다. 따라서 runtime에서 에이전트가 계속 기억을 읽고 보강하고 관리하는 루프는 GBrain보다 약하다 |
| GBrain | ingest, enrich, maintain, query, citation-fix, cron, task orchestration이 연결된 구조다. 사람, 회사, 미팅, 아이디어를 지속적으로 축적하고 시간이 지나도 brain이 스스로 더 좋아지게 설계되어 있다. 장기기억을 "저장"이 아니라 "운영"하는 접근이다 | 시스템이 가장 무겁다. 설치, 운영, 정책 설계, API key 관리 등 진입장벽이 높다 |

AKB와 GBrain을 가르는 기준은 기능 개수가 아니라 기억을 다루는 동사다. 보고서 표현대로 AKB는 기억을 저장하고, GBrain은 기억을 운영한다. 이 구분이 이후 발전 방향 제안의 출발점이 된다.

llmwiki의 약점 서술은 방향이 조금 다르다. 품질 관리 기능 자체는 confidence와 lifecycle과 lint의 형태로 갖고 있지만, 그 기능이 작동하는 시점이 실시간이 아니라 컴파일 시점이라는 점이 약점으로 지목된다.

### 공유 knowledge base 관점 세부 비교

보고서 4.2절은 관점을 바꿔 "외부의 여러 사람이 함께 쓸 수 있는가"를 묻는다. 앞 절과 강약이 뒤집힌다.

| 시스템 | 강점 | 약점 |
|---|---|---|
| AKB | 여러 에이전트가 동일 지식을 공유하는 backend로 적합하다. 조직 내 에이전트, 워크플로, 애플리케이션을 연결하는 기억 인프라 계층이 될 수 있다 | 사람에게 바로 보여줄 수 있는 knowledge base 경험은 약하다. 검색, 문서형 탐색, 위키 링크, 퍼블리시, 읽기 흐름 측면이 보강되어야 한다 |
| llmwiki | 이 영역에서 가장 강하다. static site, search, wikilink, AI export, HTML/TXT/JSON sibling, llms.txt, graph.jsonld까지 갖춰 공유 가능한 knowledge base 제품에 가깝다. 내부 공유, GitHub Pages 배포, 링크 공유에 매우 적합하다 | 협업 knowledge base로는 강하지만, 여러 에이전트가 같은 live memory를 실시간으로 쓰는 backend로는 상대적으로 부적합하다 |
| GBrain | publish 기능과 MCP 제공으로 공유 자체는 가능하다. brain-first 운영을 통해 공유 전에 지식을 더 정제할 수 있다 | 기본 철학이 "모든 사람이 읽는 위키"보다는 "강한 brain을 가진 agent"에 더 가깝다. 그래서 knowledge base 제품으로서는 llmwiki보다 직관성이 떨어진다 |

llmwiki의 강점 목록이 구체적인 산출물 형식으로 채워져 있다는 점이 눈에 띈다. static site와 검색과 wikilink는 사람을 위한 것이고, llms.txt와 graph.jsonld와 JSON sibling은 다른 시스템이 읽기 위한 것이다. 같은 지식을 두 종류의 독자에게 각각 맞춘 형식으로 내보낸다는 뜻이다.

GBrain의 약점은 기능 부족이 아니라 지향의 차이로 서술된다. publish 기능이 있고 MCP도 제공하지만, 설계 철학의 무게중심이 공유용 위키가 아니라 강한 brain을 가진 에이전트 쪽에 있다는 것이다.

### 시스템별 장단점 정리

보고서 5절은 관점별로 흩어져 있던 평가를 시스템 단위로 다시 모은다.

| 시스템 | 장점 | 단점 |
|---|---|---|
| AKB | multi-agent shared memory라는 포지션이 분명하다. DB와 MCP를 중심으로 한 인프라형 설계가 자연스럽다. 가장 가볍게 시작할 수 있다 | 공개 기준으로는 product layer가 얇다. 사람에게 보여지는 knowledge base 경험이 약하다. memory의 품질 관리, 수명주기 관리, 정리 자동화가 부족해 보인다 |
| llmwiki | 사람과 AI가 함께 읽는 문서형 결과물이 뛰어나다. transcript를 버리지 않고 reusable knowledge로 만든다. 배포, 공유, 검색, 위키 탐색 경험이 강하다 | shared memory backend로는 다소 간접적이다. 실시간 agent memory 운영체계라기보다 knowledge compiler에 가깝다 |
| GBrain | 장기기억 운영 체계가 가장 완성도 높다. ingestion, enrichment, maintenance, scheduling이 유기적으로 연결되어 있다. proactive agent 운영에 매우 강하다 | 가장 무겁고 복잡하다. 단순한 공유 KB가 필요한 조직에는 과할 수 있다. 개인이나 특정 agent brain에 최적화된 성격이 강하다 |

AKB의 장점 세 가지가 모두 구조에 관한 것이고 단점 세 가지가 모두 기능에 관한 것이라는 점이 이 표에서 드러난다. 위치는 좋은데 그 위치에서 할 수 있는 일이 아직 적다는 진단이다. 보고서의 발전 방향 제안이 구조를 바꾸는 대신 기능을 더하는 쪽으로 짜인 이유가 여기에 있다.

## 결과

### 6개 항목 점수표

| 평가 항목 | AKB | llmwiki | GBrain |
|---|---:|---:|---:|
| 장기기억 운영력 | 3.0 | 3.5 | **5.0** |
| 사람 공유용 KB 적합성 | 2.5 | **5.0** | 3.5 |
| multi-agent shared backend 적합성 | **5.0** | 2.5 | 4.0 |
| 자동 maintenance / enrichment | 2.5 | 3.5 | **5.0** |
| 도입 및 운영 단순성 | **4.0** | **4.0** | 2.5 |
| 결과물의 가독성 / 배포성 | 2.5 | **5.0** | 3.0 |

점수표의 가장 중요한 특징은 세 시스템의 만점 항목이 하나도 겹치지 않는다는 점이다. AKB는 multi-agent shared backend 적합성 한 항목에서만 5.0점이고, llmwiki는 사람 공유용 KB 적합성과 결과물의 가독성 및 배포성 두 항목에서 5.0점이며, GBrain은 장기기억 운영력과 자동 maintenance / enrichment 두 항목에서 5.0점이다.

각 시스템이 가장 약한 자리도 서로 다르다. AKB는 사람 공유용 KB 적합성, 자동 maintenance / enrichment, 결과물의 가독성 및 배포성 세 항목에서 나란히 2.5점으로 가장 낮다. llmwiki는 multi-agent shared backend 적합성 2.5점이 유일한 최저치이고, GBrain은 도입 및 운영 단순성 2.5점이 유일한 최저치다.

도입 및 운영 단순성은 순위가 뒤집히는 유일한 항목이다. 다른 다섯 항목에서 GBrain은 4.0점 이상을 받지만, 이 항목에서는 2.5점으로 셋 중 가장 낮다. AKB와 llmwiki가 4.0점으로 같다. 기능이 많을수록 도입 비용이 올라간다는 trade-off가 숫자로 드러난 부분이다.

### 기타 feature 관점 보조 비교

점수표가 담지 못한 개별 기능 차이는 보고서 4.3절의 보조 표가 다룬다.

| 항목 | AKB | llmwiki | GBrain |
|---|---|---|---|
| 기본 아키텍처 강점 | shared backend | compiled wiki | autonomous brain |
| 검색 계층 | DB/MCP 중심 | wiki 탐색 + search index | multi-layer brain query |
| 출판 / 공유 | 약함 | **매우 강함** | 중간 |
| 정합성 / lint | 제한적 | 강함 | 강함 |
| 엔티티 확장 | 제한적 | 위키 페이지 중심 | tiered enrichment 강함 |
| 스케줄링 / recurring job | 약함 | 제한적 | **강함** |
| 운영 오버헤드 | 낮음 | 낮음에서 중간 | 높음 |

검색 계층 항목이 세 시스템의 접근 차이를 잘 보여준다. AKB는 데이터베이스 질의와 MCP 호출로 검색하고, llmwiki는 위키를 따라 이동하는 탐색과 검색 인덱스를 함께 쓰며, GBrain은 여러 계층을 거치는 brain query를 쓴다.

정합성과 lint 항목에서는 llmwiki와 GBrain이 모두 "강함"으로 같고 AKB만 "제한적"이다. 스케줄링과 recurring job 항목에서는 GBrain만 "강함"이고 나머지 둘은 "약함"과 "제한적"이다. 두 항목이 곧 보고서가 AKB에 이식하라고 권하는 기능의 목록이 된다.

### 종합 판단과 층위 분리

보고서 6절은 세 프로젝트가 경쟁 관계이면서도 사실은 서로 다른 층위를 가장 잘 푼 사례라고 본다.

| 시스템 | 잘 정의한 층위 |
|---|---|
| AKB | 공유 memory infrastructure layer |
| llmwiki | human-readable knowledge publishing layer |
| GBrain | autonomous memory operations layer |

세 층위는 배타적이지 않고 순서대로 이어진다. 보고서는 그 순서를 세 단계로 적는다.

1. AKB가 canonical shared memory를 저장한다.
2. 그 위에서 GBrain식 maintenance 및 enrichment engine이 memory를 가꾼다.
3. 최종적으로 llmwiki식 publish layer가 사람이 읽는 knowledge base를 만든다.

이 3단 연결이 이후 발전 방향 제안의 논리적 근거다. AKB가 1단계를 이미 갖추고 있으므로 2단계와 3단계를 순서대로 붙이면 전체가 완성된다는 구성이다. 경쟁 제품을 따라잡는 문제가 아니라 자기 층위 위에 두 층을 더 쌓는 문제로 다시 정의한 셈이다.

### 상황별 선택 기준

보고서 8절은 조직이 무엇을 우선하느냐에 따라 답이 달라진다고 정리한다.

| 우선하는 목표 | 권고 |
|---|---|
| 장기기억형 proactive agent 운영 | GBrain이 가장 강하다 |
| 사람 중심의 shared knowledge base | llmwiki가 가장 강하다 |
| 여러 에이전트의 공용 기억 인프라 | AKB가 가장 자연스럽다 |

같은 판단은 보고서 1절의 Executive Summary와 10절의 한 줄 결론에서도 반복된다. Executive Summary는 여기에 네 번째 항목을 덧붙이는데, AKB의 가장 유망한 발전 방향이 단순 저장소를 넘어 공유 memory layer와 자동 정리 및 유지보수, publishable wiki layer를 결합하는 것이라는 내용이다.

## AKB 발전 방향

### 포지셔닝 제안

보고서 7절의 핵심 제안은 AKB가 "shared memory DB"에서 멈추지 말고 "shared memory platform"으로 올라가야 한다는 것이다.

이 제안을 시간 순서로 펼치면 세 구간이 된다.

| 구간 | 내용 |
|---|---|
| 현재 강점 유지 | 여러 에이전트가 공통으로 쓰는 shared memory backend |
| 중기 확장 | memory quality management와 lifecycle management 추가 |
| 장기 확장 | 사람 공유용 wiki, briefing, report layer 추가 |

보고서는 AKB가 GBrain과 llmwiki를 그대로 복제하기보다 다음 포지션을 취하는 것이 낫다고 본다.

> AKB = 조직용 shared memory substrate + memory governance layer + publish connectors

복제와 포지션 정의를 구분한 점이 이 제안의 요지다. GBrain의 기능을 전부 옮겨 오면 GBrain의 단점인 무거운 구조와 높은 운영 복잡도까지 함께 따라온다. 반면 AKB가 가장 높은 점수를 받은 multi-agent shared backend 적합성을 유지한 채 필요한 기능만 골라 결합하면 도입 및 운영 단순성 4.0점이라는 현재 강점을 잃지 않는다.

### Phase 1, 현재 강점 강화

첫 단계는 이미 잘하는 일을 더 잘하게 만드는 데 집중한다. 네 가지 기능 모두 저장된 기억의 구조를 정하는 작업이다.

| 번호 | 기능 | 세부 |
|---|---|---|
| 1 | memory schema 표준화 | note, entity, source, meeting, decision, task, fact, claim 등의 타입 정의 |
| 2 | lifecycle 관리 추가 | draft, active, stale, archived 같은 상태값 도입 |
| 3 | citation / provenance 필드 의무화 | 기억의 출처와 갱신 시점을 명시 |
| 4 | collection / workspace / tenant 모델 강화 | 팀, 프로젝트, 에이전트별 경계 명확화 |

네 기능은 Phase 2의 전제 조건이기도 하다. 기억에 타입과 상태값과 출처가 없으면 Phase 2의 stale 탐지나 contradiction 탐지를 수행할 대상 자체를 정의할 수 없다. 마찬가지로 tenant 경계가 없으면 Phase 3의 permission-aware publishing이 성립하지 않는다.

### Phase 2, GBrain식 운영 기능 흡수

두 번째 단계는 저장된 기억을 자동으로 관리하는 기능을 더한다. 보고서가 GBrain의 강점으로 지목한 항목들이 그대로 옮겨 온다.

| 번호 | 기능 | 세부 |
|---|---|---|
| 1 | maintenance jobs | stale memory 탐지, orphaned memory 탐지, duplicate / contradiction 탐지 |
| 2 | entity enrichment | 사람, 회사, 프로젝트 페이지 자동 확장 |
| 3 | brain-first query policy | 외부 검색 전에 AKB를 먼저 조회하는 정책 내장 |
| 4 | scheduled briefing / digest | 최근 업데이트, 위험 이슈, 열린 질문 자동 요약 |

이 네 기능은 4.3절 보조 비교표에서 AKB가 낮은 평가를 받은 항목과 정확히 대응한다. maintenance jobs는 "정합성 / lint 제한적"에, entity enrichment는 "엔티티 확장 제한적"에, scheduled briefing은 "스케줄링 / recurring job 약함"에 각각 대응한다.

brain-first query policy는 성격이 조금 다르다. 나머지 셋이 저장소 안에서 수행되는 작업이라면, 이것은 에이전트가 질문을 받았을 때 어디를 먼저 보는지를 정하는 규칙이다. 내부 knowledge base를 외부 검색보다 우선하게 만들어야 그 knowledge base에 투자할 이유가 생긴다.

### Phase 3, llmwiki식 publish layer 확장

세 번째 단계는 저장하고 관리한 기억을 밖으로 내보내는 계층을 만든다.

| 번호 | 기능 | 세부 |
|---|---|---|
| 1 | human-readable wiki export | markdown / HTML / static site export |
| 2 | AI-readable export | llms.txt, JSON, graph export |
| 3 | 공유 가능한 index / overview / timeline 페이지 | 프로젝트별 briefing, 변경 로그, 결정 이력 페이지 생성 |
| 4 | permission-aware publishing | 내부용, 외부공유용, 고객공유용 등 뷰 분리 |

1번과 2번이 독자를 사람과 기계로 나눈다는 점이 llmwiki의 강점 목록과 같은 구성이다. 4.2절이 llmwiki의 강점으로 나열한 static site와 llms.txt와 graph.jsonld가 여기서 AKB의 과제로 바뀐다.

4번 permission-aware publishing은 llmwiki에는 없던 요구다. 개인이나 소규모 팀이 쓰는 위키와 달리 조직용 platform은 같은 기억을 내부용과 외부공유용과 고객공유용으로 나눠 보여줘야 하기 때문이다. Phase 1에서 tenant 모델을 먼저 강화하라고 한 이유가 여기서 드러난다.

### 추천 4계층 아키텍처

세 단계를 다 밟았을 때의 구조를 보고서 7.3절이 4개 계층으로 제시한다.

| 계층 | 이름 | 구성 |
|---|---|---|
| Layer 1 | Canonical Memory Layer | PostgreSQL + vector + structured metadata. 모든 에이전트의 공용 기억 원본 저장소 |
| Layer 2 | Memory Operations Layer | dedupe, contradiction check, stale detection, citation repair, entity enrichment, periodic maintenance |
| Layer 3 | Retrieval / MCP Layer | 에이전트가 읽고 쓰는 표준 인터페이스. multi-agent orchestration 대응 |
| Layer 4 | Publish Layer | wiki export, digest / report / timeline 생성, 사람 친화적 검색 UI |

Layer 1과 Layer 3은 AKB가 이미 갖고 있는 부분이고, Layer 2와 Layer 4가 Phase 2와 Phase 3에서 새로 붙는 부분이다. 보고서는 이 구조로 가면 AKB가 backend의 장점을 유지하면서도 llmwiki와 GBrain의 핵심 장점을 선택적으로 흡수할 수 있다고 본다.

Layer 2와 Layer 3의 순서에 주목할 만하다. 운영 계층이 인터페이스 계층 아래에 놓여 있어서, 에이전트가 MCP로 읽는 시점에는 이미 중복 제거와 모순 검사와 출처 보정이 끝난 기억을 받게 된다.

### 세 단계와 진단의 대응

세 단계의 기능 목록은 임의로 고른 것이 아니라 앞선 비교에서 AKB가 낮게 평가된 지점을 하나씩 덮는다. 보고서가 여러 절에 나눠 적은 약점 서술과 각 단계를 맞춰 보면 대응이 드러난다.

| 단계 | 덮으려는 약점 서술 | 대응하는 비교표 항목 |
|---|---|---|
| Phase 1 | "memory의 품질 관리, 수명주기 관리, 정리 자동화가 부족해 보인다" (5절) | 자동 유지보수 "상대적으로 약함" (3절) |
| Phase 2 | "enrichment, citation repair, staleness 관리, entity lifecycle 같은 고차 memory 운영 기능이 약하게 보인다" (4.1절) | 정합성 / lint "제한적", 엔티티 확장 "제한적", 스케줄링 / recurring job "약함" (4.3절) |
| Phase 3 | "사람에게 바로 보여줄 수 있는 knowledge base 경험은 약하다" (4.2절) | 사람 친화적 가독성 "제한적" (3절), 출판 / 공유 "약함" (4.3절) |

단계의 순서도 기능 사이의 의존 관계를 따른다. Phase 1이 memory schema와 lifecycle 상태값을 정의해야 Phase 2의 stale 탐지와 contradiction 탐지가 검사할 대상을 갖게 되고, Phase 1이 tenant 경계를 세워야 Phase 3의 permission-aware publishing이 나눌 기준을 갖게 된다.

점수표와 대조하면 각 단계가 노리는 항목도 분명해진다. Phase 2는 AKB가 2.5점을 받은 자동 maintenance / enrichment를, Phase 3은 역시 2.5점인 사람 공유용 KB 적합성과 결과물의 가독성 및 배포성을 겨냥한다. 반면 이미 5.0점인 multi-agent shared backend 적합성은 세 단계 어디에서도 건드리지 않는다.

### 권고의 논거

보고서 8절은 AKB가 방향만 잘 잡으면 가장 전략적 가치가 클 수 있다고 보며, 그 이유를 네 단계로 전개한다.

1. 조직에서는 에이전트가 하나가 아니라 여러 개가 된다.
2. 따라서 공용 memory substrate의 중요성이 커진다.
3. 다만 backend만으로는 차별화가 약하다.
4. 그래서 memory governance, maintenance, publishability까지 올라가야 한다.

앞의 두 단계가 기회를 말하고 뒤의 두 단계가 위험을 말한다. 조직 안에서 에이전트가 늘어날수록 공용 기억 계층의 가치는 커지지만, 그 계층이 저장 기능만 제공하면 다른 벡터 스토어와 구별되지 않는다. 3절 비교표가 AKB의 리스크로 적은 "제품 계층이 얇으면 단순 벡터 스토어처럼 보일 수 있음"과 같은 내용이다.

보고서의 최종 문장은 다음과 같다.

> AKB는 "shared vector memory"가 아니라, "조직의 공용 agent memory operating platform"이 되어야 한다.

## 한계

### 평가의 근거가 균등하지 않다

가장 큰 한계는 보고서 스스로 서두에서 밝힌 정보 비대칭이다. AKB에 대한 공개 근거는 LobeHub의 MCP 목록 한 건인 데 반해, llmwiki와 GBrain은 gist와 README라는 1차 자료를 갖고 있다.

그래서 AKB가 2.5점을 받은 세 항목은 기능이 없다는 확인이 아니라 확인되지 않았다는 기록으로 읽어야 한다. 보고서도 이 점을 알고 "약하게 보인다", "부족해 보인다", "공개 기준으로는"처럼 유보 표현을 일관되게 쓴다.

기술 스택 서술도 마찬가지다. 4.1절은 AKB를 "PostgreSQL과 pgvector 기반으로 보이며"라고 적어 추정임을 밝힌다. 7.3절의 Layer 1이 PostgreSQL과 vector를 명시하지만 이는 권고안의 구성이지 현재 AKB의 확인된 구현이 아니다.

### 점수 산정 근거가 공개되지 않는다

6개 항목의 점수가 어떤 기준으로 3.0점과 3.5점으로 갈렸는지는 본문에 나오지 않는다. 항목별 세부 배점표나 채점 규칙 없이 최종 점수만 제시된다. 정성 비교표가 점수의 방향을 설명해 주기는 하지만 0.5점 단위의 차이까지 설명하지는 못한다.

### 시점과 범위의 제약

보고서는 2026-04-18 기준이며 세 시스템 모두 활발히 변하는 프로젝트다. 특히 AKB의 공개 정보량은 이후 달라질 수 있고, 그 경우 낮게 매겨진 세 항목의 점수도 함께 달라진다.

비교 대상 자체도 세 건으로 한정된다. 상용 enterprise memory 제품이나 다른 오픈소스 대안은 다루지 않으므로, 이 표만으로 시장 전체를 조망할 수는 없다.

### 실측 데이터가 없다

보고서는 벤치마크 수치나 실사용 로그를 제시하지 않는다. 검색 정확도, 지연 시간, 저장 규모 같은 정량 지표가 한 건도 나오지 않으며, 평가는 전부 공개 문서 독해에 기반한 정성 판단이다. 세 시스템의 운영 규모나 성능을 숫자로 비교하려면 별도 자료가 필요하다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| shared memory substrate | 여러 에이전트가 동시에 읽고 쓰는 canonical 기억 저장 계층. 보고서가 AKB의 현재 강점으로 지목한 위치다 |
| memory operating platform | substrate 위에 governance, maintenance, publish 계층을 더한 형태. 보고서가 AKB의 도착지로 권고한 모습이다 |
| compiled artifact | 실시간 갱신 저장소가 아니라 한 번 정리해 만들어 낸 결과물. 보고서가 llmwiki의 성격을 규정할 때 쓴 표현이다 |
| lifecycle 관리 | memory entry에 draft, active, stale, archived 같은 상태값을 부여해 수명을 추적하는 기능 |
| brain-first query policy | 외부 검색을 하기 전에 내부 knowledge base를 먼저 조회하도록 내장하는 정책 |
| tiered enrichment | 엔티티에 단계적으로 메타 정보를 채워 넣는 방식. 보고서가 GBrain의 강점으로 표기한 항목이다 |

## 관련 페이지

- [[applications/dnotitia-akb]]: 이 보고서의 평가 대상인 AKB 제품을 다룬 페이지
- [[applications/dnotitia-2026-akb-product-introduction]]: 평가 대상 AKB의 제품 소개 슬라이드. 이 보고서가 권고한 방향과 실제 제품 구성을 대조할 수 있다
- [[applications/garrytan-gbrain]]: 평가 대상 GBrain의 OSS repo 페이지
- [[applications/datasciencedojo-2026-llm-wiki-by-andrej-karpathy]]: 평가 대상 llmwiki 패턴의 원형을 설명한 입문 튜토리얼
- [[applications/kmyu-2026-llm-wiki-pattern-synthesis]]: 같은 저자가 쓴 llmwiki 패턴 한국어 종합 정리
- [[applications/liu-2026-rag-llm-wiki-or-gbrain]]: RAG, LLM Wiki, GBrain 중 무엇을 고를지 다룬 결정 프레임워크로 가장 가까운 선행 작업
- [[applications/gajjar-2026-gbrain-vs-computer-memory]]: 개인 brain과 엔터프라이즈 memory를 비교한 자료
- [[applications/vectorize-2026-gbrain-review-honest-assessment]]: GBrain을 10개 항목으로 채점한 스코어카드로, 이 보고서의 6개 항목 점수와 나란히 볼 수 있다
- [[applications/mantena-2026-hermes-gbrain-setup-vps]]: GBrain의 실제 배포 사례로, 보고서가 지적한 높은 진입장벽을 확인할 수 있다
- [[applications/techwealth-hub-2026-garry-tan-gbrain-explained]]: GBrain을 3개 계층으로 설명한 멘탈 모델
- [[overviews/gbrain-ecosystem-overview]]: GBrain 관련 자료를 묶은 합성 페이지
