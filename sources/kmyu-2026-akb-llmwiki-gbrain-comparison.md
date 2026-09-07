---
title: "AKB, llmwiki, GBrain 비교 및 AKB 발전 방향"
type: report
year: 2026
category: applications
raw_path: raw/reports/kmyu-2026-akb-llmwiki-gbrain-comparison.pdf
raw_filename: "kmyu-2026-akb-llmwiki-gbrain-comparison.pdf"
source_collection: external
org: "kmyu"
url: ""
tags: [akb, llmwiki, gbrain, agent-memory, shared-memory, knowledge-base, memory-platform, comparison, dnotitia, karpathy, garry-tan, strategy, positioning]
---

## 한 줄 요약 (One-line Summary)

2026-04-18에 작성한 전략 보고서로, agent memory를 knowledge base화하는 세 가지 접근인 AKB, llmwiki, GBrain을 6개 항목에서 5점 척도로 비교하고 그 장단점을 반영한 AKB 발전 방향을 제안한다. 결론은 GBrain이 가장 강한 장기기억 엔진이고, llmwiki가 가장 좋은 공유형 knowledge base 결과물이며, AKB가 가장 좋은 shared memory substrate라는 것이다. 보고서는 여기에 더해 AKB가 "shared memory DB"에서 "조직의 공용 agent memory operating platform"으로 올라가려면 3단계 로드맵(Phase 1 현재 강점 강화, Phase 2 GBrain식 운영 기능 흡수, Phase 3 llmwiki식 publish layer 확장)을 따를 것을 권한다.

---

## 1. 자료 정보 (Document Information)

- **제목**: AKB, llmwiki, GBrain 비교 및 AKB 발전 방향
- **작성일**: 2026-04-18
- **포맷**: PDF 6페이지. 본문 전체가 텍스트와 표로만 구성되어 있고 도식이나 차트는 한 장도 없다
- **유형**: 전략 및 포지셔닝 분석 보고서
- **목적** (보고서 서두): "agent memory를 knowledge base화하는 세 가지 접근, 즉 AKB, llmwiki, GBrain을 비교하고, 그 장단점을 반영한 AKB 발전 방향을 제안한다"
- **전제** (보고서 서두): "AKB는 공개 정보가 상대적으로 적어, 아래 평가는 공개 확인 가능한 정보 기준으로 작성했다"
- **문서 구성**: 10개 절로 이루어진다. 1절 Executive Summary, 2절 점수 비교, 3절 전략 관점 비교표, 4절 세부 비교, 5절 프로젝트별 핵심 장단점, 6절 종합 판단, 7절 AKB 발전 방향 제안, 8절 최종 권고, 9절 참고 자료, 10절 한 줄 결론

### 보고서 9절이 인용한 외부 자료

| 번호 | 자료 | URL |
|---|---|---|
| 1 | Andrej Karpathy, llm-wiki pattern gist | `gist.github.com/karpathy/442a6bf555914893e9891c11519de94f` |
| 2 | Pratiyush, llmwiki README | `github.com/Pratiyush/llm-wiki` |
| 3 | Garry Tan, GBrain README | `github.com/garrytan/gbrain` |
| 4 | LobeHub MCP listing, AKB (Agent Knowledge Base) | `lobehub.com/mcp/foose212-akb-server` |

---

## 2. 주요 기여 (Key Contributions)

1. **세 시스템 비교 프레임**: feature 나열에 그치지 않고 6개 운영 항목을 5점 척도로 점수화한다. AKB, llmwiki, GBrain을 같은 평면에 놓아 trade-off를 한눈에 보이게 만든다.
2. **층위 분리 관점**: 세 시스템을 경쟁 관계가 아니라 서로 다른 층위를 가장 잘 푼 사례로 읽는다. AKB는 공유 memory infrastructure layer, llmwiki는 human-readable knowledge publishing layer, GBrain은 autonomous memory operations layer에 해당한다.
3. **AKB 포지셔닝 권고**: GBrain과 llmwiki를 그대로 복제하기보다 "조직용 shared memory substrate + memory governance layer + publish connectors"라는 세 요소의 정체성을 취하라고 제안한다.
4. **3단계 로드맵**: Phase 1(schema, lifecycle, citation, tenant), Phase 2(maintenance jobs, entity enrichment, brain-first query, scheduled digest), Phase 3(wiki export, llms.txt, timeline, permission-aware publishing)으로 나누고 단계마다 구체 기능을 4개씩 제시한다.
5. **4계층 추천 아키텍처**: Canonical Memory, Memory Operations, Retrieval/MCP, Publish로 이어지는 stack 구조를 AKB의 이상적 구조로 제시한다.

---

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 평가 방법

5점 만점 척도로 6개 항목을 평가한다. 보고서는 "5점이 가장 강하다"고 명시한다.

- 장기기억 운영력
- 사람 공유용 KB 적합성
- multi-agent shared backend 적합성
- 자동 maintenance / enrichment
- 도입 및 운영 단순성
- 결과물의 가독성 / 배포성

### 3.2 전략 관점 비교표 (보고서 3절)

보고서 3절은 8개 관점에서 세 시스템을 나란히 놓는다. 점수표가 정량 요약이라면 이 표는 정성 요약에 해당한다.

| 항목 | AKB | llmwiki | GBrain |
|---|---|---|---|
| 핵심 역할 | MCP 기반 shared memory backend | 세션과 노트를 interlinked wiki로 컴파일 | agent brain 운영체계에 가까운 memory OS |
| 주 저장 단위 | DB 기반 memory entry, collection, shared context | markdown page, session transcript, static site | brain page, entity, report, task, recurring job |
| 최적 사용자 | 여러 agent와 app이 같은 memory를 공유하는 팀 | 사람과 AI가 함께 읽는 문서형 knowledge base가 필요한 팀 | proactive agent를 장기 운영하려는 개인과 팀 |
| 장기기억 방식 | 저장 및 검색 중심 | 정리된 지식 결과물 축적 중심 | ingest, enrich, maintain, query의 순환 구조 |
| 사람 친화적 가독성 | 제한적 | 매우 강함 | 중간 |
| 자동 유지보수 | 상대적으로 약함 | lint, confidence, lifecycle 중심 | 매우 강함, cron 및 유지보수 루프 내장 |
| 공유 방식 | MCP 중심 공유 | 정적 사이트, llms.txt, JSON-LD 등 문서 배포에 강함 | MCP, publish 기능, brain-first agent 운영 |
| 리스크 | 제품 계층이 얇으면 단순 벡터 스토어처럼 보일 수 있음 | runtime memory보다는 compiled artifact에 가까움 | 구조가 무겁고 운영 복잡도가 높음 |

### 3.3 장기기억 관점 세부 비교 (보고서 4.1절)

| 시스템 | 강점 | 약점 |
|---|---|---|
| AKB | 여러 에이전트가 같은 memory를 조회하고 갱신하는 공용 기억 저장소 역할에 적합하다. PostgreSQL과 pgvector 기반으로 보이며 실용적이고 확장 가능한 backend 설계와 잘 맞는다. MCP 인터페이스 중심이라 에이전트 생태계와 붙이기 쉽다 | 공개 정보 기준으로는 enrichment, citation repair, staleness 관리, entity lifecycle 같은 고차 memory 운영 기능이 약하게 보인다. 현재 상태만으로는 "잘 만든 shared memory DB"에 가깝고 "스스로 기억을 가꾸는 brain"과는 거리가 있다 |
| llmwiki | 단순 저장이 아니라 knowledge를 재구성한 위키를 남긴다. 세션 기록이 사라지지 않고 문서화된 지식으로 누적된다. confidence, lifecycle, lint가 있어 지식 품질 관리가 가능하다 | 핵심 산출물이 정리된 wiki artifact다. 따라서 runtime에서 에이전트가 계속 기억을 읽고 보강하고 관리하는 루프는 GBrain보다 약하다 |
| GBrain | ingest, enrich, maintain, query, citation-fix, cron, task orchestration이 연결된 구조다. 사람, 회사, 미팅, 아이디어를 지속적으로 축적하고 시간이 지나도 brain이 스스로 더 좋아지게 설계되어 있다. 장기기억을 "저장"이 아니라 "운영"하는 접근이다 | 시스템이 가장 무겁다. 설치, 운영, 정책 설계, API key 관리 등 진입장벽이 높다 |

보고서가 AKB와 GBrain을 가르는 기준은 기능 개수가 아니라 기억을 다루는 동사다. AKB는 기억을 저장하고 꺼내는 데 최적화되어 있고, GBrain은 기억을 운영한다. 이 구분이 이후 절의 발전 방향 제안으로 이어진다.

### 3.4 공유 가능한 knowledge base 관점 세부 비교 (보고서 4.2절)

| 시스템 | 강점 | 약점 |
|---|---|---|
| AKB | 여러 에이전트가 동일 지식을 공유하는 backend로 적합하다. 조직 내 에이전트, 워크플로, 애플리케이션을 연결하는 기억 인프라 계층이 될 수 있다 | 사람에게 바로 보여줄 수 있는 knowledge base 경험은 약하다. 검색, 문서형 탐색, 위키 링크, 퍼블리시, 읽기 흐름 측면이 보강되어야 한다 |
| llmwiki | 이 영역에서 가장 강하다. static site, search, wikilink, AI export, HTML/TXT/JSON sibling, llms.txt, graph.jsonld까지 갖춰 공유 가능한 knowledge base 제품에 가깝다. 내부 공유, GitHub Pages 배포, 링크 공유에 매우 적합하다 | 협업 knowledge base로는 강하지만, 여러 에이전트가 같은 live memory를 실시간으로 쓰는 backend로는 상대적으로 부적합하다 |
| GBrain | publish 기능과 MCP 제공으로 공유 자체는 가능하다. brain-first 운영을 통해 공유 전에 지식을 더 정제할 수 있다 | 기본 철학이 "모든 사람이 읽는 위키"보다는 "강한 brain을 가진 agent"에 더 가깝다. 그래서 knowledge base 제품으로서는 llmwiki보다 직관성이 떨어진다 |

### 3.5 프로젝트별 핵심 장단점 (보고서 5절)

4절이 관점별 비교라면 5절은 시스템별로 장단점을 모아 정리한 절이다.

| 시스템 | 장점 | 단점 |
|---|---|---|
| AKB | multi-agent shared memory라는 포지션이 분명하다. DB와 MCP를 중심으로 한 인프라형 설계가 자연스럽다. 가장 가볍게 시작할 수 있다 | 공개 기준으로는 product layer가 얇다. 사람에게 보여지는 knowledge base 경험이 약하다. memory의 품질 관리, 수명주기 관리, 정리 자동화가 부족해 보인다 |
| llmwiki | 사람과 AI가 함께 읽는 문서형 결과물이 뛰어나다. transcript를 버리지 않고 reusable knowledge로 만든다. 배포, 공유, 검색, 위키 탐색 경험이 강하다 | shared memory backend로는 다소 간접적이다. 실시간 agent memory 운영체계라기보다 knowledge compiler에 가깝다 |
| GBrain | 장기기억 운영 체계가 가장 완성도 높다. ingestion, enrichment, maintenance, scheduling이 유기적으로 연결되어 있다. proactive agent 운영에 매우 강하다 | 가장 무겁고 복잡하다. 단순한 공유 KB가 필요한 조직에는 과할 수 있다. 개인이나 특정 agent brain에 최적화된 성격이 강하다 |

### 3.6 종합 판단 (보고서 6절)

보고서는 세 프로젝트가 경쟁 관계이면서도 사실은 서로 다른 층위를 가장 잘 푼 사례라고 본다.

| 시스템 | 잘 정의한 층위 |
|---|---|
| AKB | 공유 memory infrastructure layer |
| llmwiki | human-readable knowledge publishing layer |
| GBrain | autonomous memory operations layer |

세 접근을 경쟁이 아니라 순서로 이으면 다음과 같다.

1. AKB가 canonical shared memory를 저장한다.
2. 그 위에서 GBrain식 maintenance / enrichment engine이 memory를 가꾼다.
3. 최종적으로 llmwiki식 publish layer가 사람이 읽는 knowledge base를 만든다.

이 3단 연결이 7절 발전 방향 제안의 근거다. AKB가 1단계를 이미 갖고 있으므로 2단계와 3단계를 순서대로 붙이면 된다는 논리다.

### 3.7 추천 4계층 아키텍처 (보고서 7.3절)

| 계층 | 이름 | 구성 |
|---|---|---|
| Layer 1 | Canonical Memory Layer | PostgreSQL + vector + structured metadata. 모든 에이전트의 공용 기억 원본 저장소 |
| Layer 2 | Memory Operations Layer | dedupe, contradiction check, stale detection, citation repair, entity enrichment, periodic maintenance |
| Layer 3 | Retrieval / MCP Layer | 에이전트가 읽고 쓰는 표준 인터페이스. multi-agent orchestration 대응 |
| Layer 4 | Publish Layer | wiki export, digest / report / timeline 생성, 사람 친화적 검색 UI |

보고서는 이 구조로 가면 AKB가 backend의 장점을 유지하면서도 llmwiki와 GBrain의 핵심 장점을 선택적으로 흡수할 수 있다고 본다.

---

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 6개 항목 점수표 (5점 만점, 보고서 2절)

| 평가 항목 | AKB | llmwiki | GBrain |
|---|---:|---:|---:|
| 장기기억 운영력 | 3.0 | 3.5 | **5.0** |
| 사람 공유용 KB 적합성 | 2.5 | **5.0** | 3.5 |
| multi-agent shared backend 적합성 | **5.0** | 2.5 | 4.0 |
| 자동 maintenance / enrichment | 2.5 | 3.5 | **5.0** |
| 도입 및 운영 단순성 | **4.0** | **4.0** | 2.5 |
| 결과물의 가독성 / 배포성 | 2.5 | **5.0** | 3.0 |

세 시스템의 만점 항목이 서로 겹치지 않는다. AKB는 multi-agent shared backend 적합성에서만 5.0이고, llmwiki는 사람 공유용 KB 적합성과 결과물의 가독성 / 배포성 두 항목에서 5.0이며, GBrain은 장기기억 운영력과 자동 maintenance / enrichment 두 항목에서 5.0이다. 도입 및 운영 단순성에서는 AKB와 llmwiki가 4.0으로 같고 GBrain만 2.5로 낮다.

### 4.2 기타 feature 관점 보조 비교 (보고서 4.3절)

| 항목 | AKB | llmwiki | GBrain |
|---|---|---|---|
| 기본 아키텍처 강점 | shared backend | compiled wiki | autonomous brain |
| 검색 계층 | DB/MCP 중심 | wiki 탐색 + search index | multi-layer brain query |
| 출판 / 공유 | 약함 | **매우 강함** | 중간 |
| 정합성 / lint | 제한적 | 강함 | 강함 |
| 엔티티 확장 | 제한적 | 위키 페이지 중심 | tiered enrichment 강함 |
| 스케줄링 / recurring job | 약함 | 제한적 | **강함** |
| 운영 오버헤드 | 낮음 | 낮음에서 중간 | 높음 |

### 4.3 Executive Summary의 4개 결론 (보고서 1절)

1. 장기기억 자체를 가장 강하게 구현한 것은 GBrain이다.
2. 사람과 AI가 함께 읽고 공유하는 knowledge base로는 llmwiki가 가장 적합하다.
3. 여러 에이전트가 공용 memory backend를 공유하는 구조에는 AKB가 가장 자연스럽다.
4. 따라서 AKB의 가장 유망한 발전 방향은 단순 저장소를 넘어 공유 memory layer와 자동 정리 및 유지보수, publishable wiki layer를 결합하는 것이다.

### 4.4 선택 기준 (보고서 8절)

| 우선순위 | 권고 |
|---|---|
| 장기기억형 proactive agent | GBrain이 가장 강하다 |
| 사람 중심 shared knowledge base | llmwiki가 가장 강하다 |
| 여러 에이전트의 공용 기억 인프라 | AKB가 가장 자연스럽다 |

---

## 5. 한계와 향후 과제 (Limitations and Future Work)

### 5.1 보고서가 명시한 분석 한계

- **AKB 정보 비대칭**: 보고서 서두가 "AKB는 공개 정보가 상대적으로 적어, 아래 평가는 공개 확인 가능한 정보 기준으로 작성했다"고 전제한다. 4.1절도 AKB의 약점을 "공개 정보 기준으로는 (중략) 약하게 보인다"라는 관찰형으로 적고, 5절도 "공개 기준으로는 product layer가 얇다"고 쓴다. 세 곳 모두 단정이 아니라 유보 표현이라, AKB의 낮은 점수는 실제 기능 부재와 정보 부족을 구분하지 못한 결과일 수 있다.
- **AKB의 기술 스택 추정**: 4.1절은 AKB를 "PostgreSQL과 pgvector 기반으로 보이며"라고 적는다. 확인된 사실이 아니라 추정이다.
- **llmwiki의 runtime 부적합**: 3절 리스크 항목은 llmwiki를 "runtime memory보다는 compiled artifact에 가까움"으로, 5절 단점은 "실시간 agent memory 운영체계라기보다 knowledge compiler에 가깝다"로 적는다. 실시간 backend 항목에서 llmwiki가 낮게 나오는 이유가 여기에 있다.

### 5.2 제품 포지셔닝 제안 (보고서 7.1절)

핵심 제안은 한 문장이다. "AKB는 'shared memory DB'에서 멈추지 말고, 'shared memory platform'으로 올라가야 한다."

| 구간 | 내용 |
|---|---|
| 현재 강점 유지 | 여러 에이전트가 공통으로 쓰는 shared memory backend |
| 중기 확장 | memory quality management와 lifecycle management 추가 |
| 장기 확장 | 사람 공유용 wiki / briefing / report layer 추가 |

보고서는 AKB가 GBrain과 llmwiki를 그대로 복제하기보다 다음 포지션을 취하는 것이 낫다고 본다.

> AKB = 조직용 shared memory substrate + memory governance layer + publish connectors

### 5.3 우선순위별 기능 제안 (보고서 7.2절)

**Phase 1. AKB의 현재 강점을 강화**

| 번호 | 기능 | 세부 |
|---|---|---|
| 1 | memory schema 표준화 | note, entity, source, meeting, decision, task, fact, claim 등의 타입 정의 |
| 2 | lifecycle 관리 추가 | draft, active, stale, archived 같은 상태값 도입 |
| 3 | citation / provenance 필드 의무화 | 기억의 출처와 갱신 시점을 명시 |
| 4 | collection / workspace / tenant 모델 강화 | 팀, 프로젝트, 에이전트별 경계 명확화 |

**Phase 2. GBrain식 운영 기능 흡수**

| 번호 | 기능 | 세부 |
|---|---|---|
| 1 | maintenance jobs | stale memory 탐지, orphaned memory 탐지, duplicate / contradiction 탐지 |
| 2 | entity enrichment | 사람, 회사, 프로젝트 페이지 자동 확장 |
| 3 | brain-first query policy | 외부 검색 전에 AKB를 먼저 조회하는 정책 내장 |
| 4 | scheduled briefing / digest | 최근 업데이트, 위험 이슈, 열린 질문 자동 요약 |

**Phase 3. llmwiki식 publish layer 확장**

| 번호 | 기능 | 세부 |
|---|---|---|
| 1 | human-readable wiki export | markdown / HTML / static site export |
| 2 | AI-readable export | llms.txt, JSON, graph export |
| 3 | 공유 가능한 index / overview / timeline 페이지 | 프로젝트별 briefing, 변경 로그, 결정 이력 페이지 생성 |
| 4 | permission-aware publishing | 내부용, 외부공유용, 고객공유용 등 뷰 분리 |

### 5.4 AKB 권고의 논거 (보고서 8절)

보고서는 AKB가 방향만 잘 잡으면 가장 전략적 가치가 클 수 있다고 보며, 그 이유를 네 단계로 전개한다.

1. 조직에서는 에이전트가 하나가 아니라 여러 개가 된다.
2. 따라서 공용 memory substrate의 중요성이 커진다.
3. 다만 backend만으로는 차별화가 약하다.
4. 그래서 memory governance, maintenance, publishability까지 올라가야 한다.

보고서가 내린 최종 한 문장은 다음과 같다.

> AKB는 "shared vector memory"가 아니라, "조직의 공용 agent memory operating platform"이 되어야 한다.

### 5.5 한 줄 결론 (보고서 10절)

- GBrain은 가장 강한 장기기억 엔진이다.
- llmwiki는 가장 좋은 공유형 knowledge base 결과물이다.
- AKB는 가장 좋은 shared memory substrate다.
- AKB의 발전 방향은 여기에 maintenance와 publish layer를 붙여 조직용 memory platform으로 진화하는 것이다.

---

## 6. 관련 연구 (Related Work)

보고서 9절이 인용한 외부 자료는 네 건이며, 모두 공개된 gist, README, MCP 목록이다. 별도의 논문이나 벤치마크를 인용하지 않는다.

| 자료 | 역할 |
|---|---|
| Andrej Karpathy, llm-wiki pattern gist | llmwiki 패턴의 원형 |
| Pratiyush, llmwiki README | llmwiki 평가 대상의 OSS 구현 |
| Garry Tan, GBrain README | GBrain 평가 대상의 OSS |
| LobeHub MCP listing, AKB | AKB 평가의 유일한 공개 근거 |

본 ai-wiki 내부의 관련 자료는 다음과 같다.

- `applications/dnotitia-akb`: AKB 제품 소개
- `applications/garrytan-gbrain`: GBrain OSS repo
- `applications/gajjar-2026-gbrain-vs-computer-memory`: GBrain과 DevRev Computer Memory 비교
- `applications/vectorize-2026-gbrain-review-honest-assessment`: GBrain 10개 항목 스코어카드
- `applications/liu-2026-rag-llm-wiki-or-gbrain`: RAG, LLM Wiki, GBrain 결정 프레임워크로 가장 가까운 선행 작업
- `applications/datasciencedojo-2026-llm-wiki-by-andrej-karpathy`: Karpathy LLM Wiki 입문 튜토리얼
- `applications/kmyu-2026-llm-wiki-pattern-synthesis`: 같은 저자의 Karpathy LLM Wiki 한국어 종합 정리
- `overviews/gbrain-ecosystem-overview`: GBrain 생태계 합성 페이지

---

## 7. 용어집 (Glossary)

- **AKB**: 보고서 9절이 인용한 LobeHub 목록의 표기로는 Agent Knowledge Base다. 보고서 3절은 AKB를 MCP 기반 shared memory backend로 정의한다.
- **llmwiki**: Karpathy의 llm-wiki gist 패턴과 Pratiyush의 OSS 구현을 함께 가리킨다. 세션과 노트를 interlinked wiki로 컴파일한다.
- **GBrain**: Garry Tan이 공개한 OSS로, 보고서는 agent brain 운영체계에 가까운 memory OS로 정의한다.
- **MCP**: 에이전트가 memory를 읽고 쓰는 표준 인터페이스를 가리킨다. 보고서 7.3절의 Layer 3 이름이기도 하다.
- **shared memory substrate**: 여러 에이전트가 동시에 읽고 쓰는 canonical 기억 저장 계층으로, 보고서가 AKB의 현재 강점으로 지목한 위치다.
- **memory operating platform**: substrate 위에 governance, maintenance, publish 계층을 더한 형태로, 보고서가 AKB의 도착지로 권고한 모습이다.
- **brain-first query policy**: 외부 검색을 하기 전에 AKB를 먼저 조회하도록 내장하는 정책이다. 보고서 7.2절 Phase 2의 세 번째 기능이다.
- **publish layer**: knowledge base의 일부를 사람이나 다른 시스템이 읽을 수 있게 export하는 계층으로, markdown, HTML, llms.txt, JSON, graph 등이 대상이다.
- **lifecycle 관리**: memory entry에 draft, active, stale, archived 같은 상태값을 부여해 수명을 추적하는 기능이다.
- **citation repair**: 오래되거나 깨진 출처를 보정하는 기능으로, 보고서는 GBrain의 강점 목록에 이를 포함한다.
- **tiered enrichment**: 엔티티에 단계적으로 메타 정보를 채워 넣는 방식으로, 보고서 4.3절이 GBrain의 강점으로 표기한 항목이다.
- **compiled artifact**: 실시간으로 갱신되는 저장소가 아니라 한 번 정리해 만들어 낸 결과물을 뜻하며, 보고서가 llmwiki의 성격을 규정할 때 쓴 표현이다.
