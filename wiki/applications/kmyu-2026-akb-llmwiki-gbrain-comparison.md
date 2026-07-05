---
title: "AKB, llmwiki, GBrain 비교 및 AKB 발전 방향"
type: report
year: 2026
category: applications
raw_path: /Users/kmyu/Desktop/project/ai-wiki/raw/reports/kmyu-2026-akb-llmwiki-gbrain-comparison.pdf
raw_filename: "kmyu-2026-akb-llmwiki-gbrain-comparison.pdf"
source: kmyu-2026-akb-llmwiki-gbrain-comparison.md
source_collection: external
org: "kmyu"
url: ""
tags: [akb, llmwiki, gbrain, agent-memory, shared-memory, knowledge-base, memory-platform, comparison, dnotitia, karpathy, garry-tan, strategy, positioning]
---

# AKB, llmwiki, GBrain 비교 및 AKB 발전 방향

## 요약 (Summary)

2026-04-18에 작성한 전략 보고서다. AKB·llmwiki·GBrain 세 가지 agent memory 접근을 6개 축(장기기억 운영력·사람 공유 KB 적합성·multi-agent shared backend 적합성·자동 maintenance·도입 단순성·가독성/배포성)에서 나란히 견준다. 결론만 추리면 장기기억 엔진은 GBrain이, 공유형 KB 결과물은 llmwiki가, shared memory substrate는 AKB가 각각 가장 강하다. 여기서 한 걸음 더 나아가, AKB가 "shared memory DB"에 머물지 않고 "조직용 agent memory operating platform"으로 올라서려면 3-phase 로드맵(Phase 1 강점 강화, Phase 2 GBrain식 운영 흡수, Phase 3 llmwiki식 publish layer 확장)을 밟아야 한다고 권한다.

보고서는 서두에서 한 가지 전제를 못박는다. AKB는 공개된 정보가 상대적으로 적어, 아래 평가를 공개 확인이 가능한 정보만 놓고 작성했다는 것이다.

## 주요 기여 (Key Contributions)

1. **3-system 비교 프레임** — 단순 feature 나열에 그치지 않고 6개 운영축을 5점 척도로 점수화한다. AKB·llmwiki·GBrain을 같은 평면에 올려놓으니 trade-off가 한눈에 들어온다.
2. **layer 분리 통찰** — 세 시스템을 경쟁 관계가 아니라 서로 다른 층위의 best 사례로 다시 읽는다. AKB는 shared memory infrastructure, llmwiki는 human-readable publishing, GBrain은 autonomous memory operations에 해당한다.
3. **AKB 포지셔닝 권고** — GBrain·llmwiki를 그대로 베끼지 말라고 짚는다. "조직용 shared memory substrate + memory governance layer + publish connectors"라는 3-축 정체성으로 가라는 구체적인 방향을 제시한다.
4. **3-phase 로드맵** — Phase 1(schema·lifecycle·citation·tenant), Phase 2(maintenance jobs·entity enrichment·brain-first query·scheduled digest), Phase 3(wiki export·llms.txt·timeline·permission-aware publishing)로 나뉘고, 단계마다 구체 기능을 4개씩 못박아 둔다.
5. **4-layer 추천 아키텍처** — Canonical Memory → Memory Operations → Retrieval/MCP → Publish로 이어지는 stack 구조다.

## 방법론 및 아키텍처 (Methodology and Architecture)

### 평가 방법

5점 만점 척도로 6개 항목을 평가한다.

- 장기기억 운영력
- 사람 공유용 KB 적합성
- multi-agent shared backend 적합성
- 자동 maintenance / enrichment
- 도입 및 운영 단순성
- 결과물의 가독성 / 배포성

### 비교 대상 시스템 정의

| 시스템 | 핵심 역할 | 주 저장 단위 | 최적 사용자 |
|---|---|---|---|
| **AKB** | MCP 기반 shared memory backend | DB 기반 memory entry / collection / shared context | 여러 agent·app이 같은 memory를 공유하는 팀 |
| **llmwiki** | 세션·노트를 interlinked wiki로 컴파일 | markdown page / session transcript / static site | 사람과 AI가 함께 읽는 문서형 KB가 필요한 팀 |
| **GBrain** | agent brain 운영체계에 가까운 memory OS | brain page / entity / report / task / recurring job | proactive agent를 장기 운영하려는 개인·팀 |

### 추천 4-layer 아키텍처 (AKB 발전형)

- **Layer 1 — Canonical Memory**: PostgreSQL + vector + structured metadata. 모든 agent가 공용하는 기억 원본.
- **Layer 2 — Memory Operations**: dedupe / contradiction check / stale detection / citation repair / entity enrichment / periodic maintenance.
- **Layer 3 — Retrieval / MCP**: agent가 읽고 쓰는 표준 인터페이스. multi-agent orchestration 대응.
- **Layer 4 — Publish**: wiki export / digest / report / timeline / 사람 친화 검색 UI.

## 결과 (Results)

### 6축 점수표 (5점 만점)

| 평가 항목 | AKB | llmwiki | GBrain |
|---|---:|---:|---:|
| 장기기억 운영력 | 3.0 | 3.5 | **5.0** |
| 사람 공유용 KB 적합성 | 2.5 | **5.0** | 3.5 |
| multi-agent shared backend 적합성 | **5.0** | 2.5 | 4.0 |
| 자동 maintenance / enrichment | 2.5 | 3.5 | **5.0** |
| 도입 및 운영 단순성 | **4.0** | **4.0** | 2.5 |
| 결과물의 가독성 / 배포성 | 2.5 | **5.0** | 3.0 |

### Feature 관점 보조 비교

| 항목 | AKB | llmwiki | GBrain |
|---|---|---|---|
| 기본 아키텍처 강점 | shared backend | compiled wiki | autonomous brain |
| 검색 계층 | DB/MCP 중심 | wiki 탐색 + search index | multi-layer brain query |
| 출판 / 공유 | 약함 | **매우 강함** | 중간 |
| 정합성 / lint | 제한적 | 강함 | 강함 |
| 엔티티 확장 | 제한적 | 위키 페이지 중심 | tiered enrichment 강함 |
| 스케줄링 / recurring job | 약함 | 제한적 | **강함** |
| 운영 오버헤드 | 낮음 | 낮음~중간 | 높음 |

### 시스템별 적합 사용 시나리오 (보고서 §8 권고)

- 장기기억형 proactive agent가 우선이면 GBrain이 가장 강하다.
- 사람 중심 shared knowledge base가 우선이면 llmwiki가 앞선다.
- 여러 agent의 공용 기억 인프라가 우선이면 AKB가 가장 자연스럽다.

## 한계와 향후 과제 (Limitations and Future Work)

### 보고서가 명시한 분석 한계

- **AKB 정보 비대칭** — AKB는 공개된 정보가 적어 점수를 보수적으로 매겼을 여지가 있다. enrichment·citation repair·staleness 관리·entity lifecycle 같은 "고차 memory 운영 기능"이 실제로 약한지, 아니면 그저 공개되지 않은 것인지 가려내기 어렵다.
- **llmwiki는 runtime memory가 아니다** — compiled wiki artifact에 가까운 탓에 실시간 agent memory backend 평가축에서는 불리하다. 다만 설계 의도가 그럴 뿐 결함으로 볼 일은 아니다.

### AKB 발전 권고 (보고서 §7)

**핵심 명제**: "AKB는 'shared memory DB'에서 멈추지 말고, 'shared memory platform'으로 올라가야 한다."

**Phase 1 — AKB 강점 강화**

1. memory schema 표준화 (note·entity·source·meeting·decision·task·fact·claim 등)
2. lifecycle 관리 (draft·active·stale·archived 상태값)
3. citation / provenance 필드 의무화 (출처·갱신 시점)
4. collection / workspace / tenant 모델 강화 (팀·프로젝트·agent별 경계)

**Phase 2 — GBrain식 운영 기능 흡수**

1. maintenance jobs: stale / orphaned / duplicate / contradiction 탐지
2. entity enrichment: 사람·회사·프로젝트 페이지 자동 확장
3. brain-first query policy: 외부 검색 전 AKB 우선 조회
4. scheduled briefing / digest: 최근 업데이트·위험 이슈·열린 질문 자동 요약

**Phase 3 — llmwiki식 publish layer 확장**

1. human-readable wiki export (markdown / HTML / static site)
2. AI-readable export (llms.txt / JSON / graph)
3. index / overview / timeline 페이지 (briefing·변경 로그·결정 이력)
4. permission-aware publishing (내부용 / 외부공유 / 고객공유 뷰 분리)

## 관련 페이지 (Related Pages)

- [[applications/dnotitia-akb|dnotitia/AKB (repo)]] — 본 보고서의 평가 대상 AKB 제품 deep dive
- [[applications/garrytan-gbrain|garrytan/gbrain (repo)]] — 평가 대상 GBrain OSS
- [[applications/datasciencedojo-2026-llm-wiki-by-andrej-karpathy|LLM Wiki by Karpathy 입문 튜토리얼]] — 평가 대상 llmwiki 패턴의 원형 설명
- [[applications/kmyu-2026-llm-wiki-pattern-synthesis|Karpathy LLM Wiki 패턴 한국어 종합 정리]] — 같은 저자(kmyu)의 llmwiki 메타 리포트
- [[applications/liu-2026-rag-llm-wiki-or-gbrain|RAG, LLM Wiki, or GBrain? (Liu, Medium)]] — 가장 가까운 선행 결정 프레임워크
- [[applications/gajjar-2026-gbrain-vs-computer-memory|GBrain vs DevRev Computer Memory]] — 개인 brain vs 엔터프라이즈 memory 비교
- [[applications/vectorize-2026-gbrain-review-honest-assessment|GBrain Honest Assessment (Vectorize)]] — GBrain 10차원 스코어카드 (본 보고서 6축 점수와 보조 비교 가능)
- [[applications/mantena-2026-hermes-gbrain-setup-vps|Hermes + GBrain on AWS EC2 (Mantena)]] — GBrain 실전 배포 사례
- [[applications/techwealth-hub-2026-garry-tan-gbrain-explained|GBrain Explained (TechWealth Hub)]] — GBrain 3-layer 멘탈 모델
- [[overviews/gbrain-ecosystem-overview|GBrain 생태계 overview]] — GBrain 자료들을 묶은 합성 페이지
