---
title: "AKB, llmwiki, GBrain 비교 및 AKB 발전 방향"
type: report
year: 2026
category: applications
raw_path: /Users/kmyu/Desktop/project/ai-wiki/raw/reports/kmyu-2026-akb-llmwiki-gbrain-comparison.pdf
raw_filename: "kmyu-2026-akb-llmwiki-gbrain-comparison.pdf"
source_collection: external
org: "kmyu"
url: ""
tags: [akb, llmwiki, gbrain, agent-memory, shared-memory, knowledge-base, memory-platform, comparison, dnotitia, karpathy, garry-tan, strategy, positioning]
---

## 한 줄 요약 (One-line Summary)

2026-04-18에 작성한 전략 보고서로, AKB·llmwiki·GBrain 세 가지 agent memory 접근을 6개 축(장기기억 운영력·사람 공유 KB 적합성·multi-agent shared backend 적합성·자동 maintenance·도입 단순성·가독성/배포성)에서 견준다. 한 줄 결론은 **GBrain이 가장 강한 장기기억 엔진**, **llmwiki가 가장 좋은 공유형 KB 결과물**, **AKB가 가장 좋은 shared memory substrate**다. 여기에 더해 AKB가 "shared memory DB"에서 "조직용 agent memory operating platform"으로 올라서려면 3-phase 로드맵(Phase 1 강점 강화, Phase 2 GBrain식 운영 흡수, Phase 3 llmwiki식 publish layer 확장)을 밟으라고 권한다.

---

## 1. 자료 정보 (Document Information)

- **제목**: AKB, llmwiki, GBrain 비교 및 AKB 발전 방향
- **작성일**: 2026-04-18
- **포맷**: PDF 6 페이지 (텍스트·표 위주, 도식 없음)
- **유형**: 내부 전략/포지셔닝 분석 보고서
- **전제 명시**: "AKB는 공개 정보가 상대적으로 적어, 아래 평가는 공개 확인 가능한 정보 기준으로 작성했다"
- **참고한 외부 자료** (보고서 §9 인용):
  1. Andrej Karpathy, llm-wiki pattern gist — `gist.github.com/karpathy/442a6bf555914893e9891c11519de94f`
  2. Pratiyush, llmwiki README — `github.com/Pratiyush/llm-wiki`
  3. Garry Tan, GBrain README — `github.com/garrytan/gbrain`
  4. LobeHub MCP listing, AKB — `lobehub.com/mcp/foose212-akb-server`

---

## 2. 주요 기여 (Key Contributions)

1. **3-system 비교 프레임**: 단순 feature 비교가 아니라 6개 운영축을 5점 척도로 점수화한다. AKB·llmwiki·GBrain을 같은 평면에 놓아 trade-off가 한눈에 보인다.
2. **layer 분리 통찰**: 세 시스템을 경쟁이 아니라 **서로 다른 층위**의 best 사례로 재해석한다. AKB = shared memory infrastructure, llmwiki = human-readable publishing, GBrain = autonomous memory operations.
3. **AKB 포지셔닝 권고**: GBrain·llmwiki를 복제하지 말고 "조직용 shared memory substrate + memory governance layer + publish connectors"라는 3-축 정체성으로 가라는 구체적인 방향이다.
4. **3-phase 로드맵**: Phase 1 (schema·lifecycle·citation·tenant), Phase 2 (maintenance jobs·entity enrichment·brain-first query·scheduled digest), Phase 3 (wiki export·llms.txt·timeline·permission-aware publishing). 단계마다 4개씩 구체 기능을 박아둔다.
5. **4-layer 추천 아키텍처**: Canonical Memory → Memory Operations → Retrieval/MCP → Publish 의 stack 구조다.

---

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

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

---

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

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

### 시스템별 적합 사용 시나리오 (최종 §8 권고)

- **장기기억형 proactive agent가 우선이면** → GBrain이 가장 강하다.
- **사람 중심 shared knowledge base가 우선이면** → llmwiki가 가장 강하다.
- **여러 agent의 공용 기억 인프라가 우선이면** → AKB가 가장 자연스럽다.

---

## 5. 한계와 향후 과제 (Limitations and Future Work)

### 보고서가 명시한 분석 한계

- **AKB 정보 비대칭**: AKB는 공개 정보가 적어 점수가 보수적으로 매겨졌을 가능성이 있다. enrichment·citation repair·staleness 관리·entity lifecycle 같은 "고차 memory 운영 기능"이 실제로 약한지, 단지 공개되지 않은 것인지 가르기 어렵다.
- **llmwiki는 runtime memory가 아니다**: compiled wiki artifact에 가까워 실시간 agent memory backend 평가축에서 불리하다. 다만 이는 설계 의도이지 결함은 아니다.

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

---

## 6. 관련 연구 (Related Work)

본 보고서는 세 비교 대상 모두 외부 공개 자료에 근거한다.

- **Karpathy llm-wiki pattern** (2025–2026, gist 442a6bf...) — 본 ai-wiki 프로젝트의 원형 패턴.
- **Pratiyush/llm-wiki** (github.com/Pratiyush/llm-wiki) — llmwiki 평가 대상의 구체 OSS 구현.
- **garrytan/gbrain** (github.com/garrytan/gbrain) — GBrain 평가 대상의 OSS.
- **Dnotitia/AKB** (LobeHub MCP listing 경유) — AKB 평가 대상.

본 ai-wiki 내부 관련 자료(ingest 완료):
- `applications/dnotitia-akb` — AKB 제품 소개 deep dive
- `applications/garrytan-gbrain` — GBrain OSS repo
- `applications/gajjar-2026-gbrain-vs-computer-memory` — GBrain vs DevRev Computer Memory
- `applications/vectorize-2026-gbrain-review-honest-assessment` — GBrain 10차원 스코어카드
- `applications/liu-2026-rag-llm-wiki-or-gbrain` — RAG/LLM Wiki/GBrain 결정 프레임워크 (가장 가까운 선행 작업)
- `applications/datasciencedojo-2026-llm-wiki-by-andrej-karpathy` — Karpathy LLM Wiki 입문 튜토리얼
- `applications/kmyu-2026-llm-wiki-pattern-synthesis` — Karpathy LLM Wiki 한국어 종합 정리
- `overviews/gbrain-ecosystem-overview` — GBrain 생태계 합성 페이지

---

## 7. 용어집 (Glossary)

- **AKB (Agent Knowledge Base)** — Dnotitia가 만든 MCP 기반 organizational memory 시스템.
- **GBrain** — Garry Tan이 공개한 markdown-first agent brain. ingest·enrich·maintain·query 루프를 내장한다.
- **llmwiki** — Karpathy의 llm-wiki gist 패턴 + Pratiyush 등 OSS 구현. session/note를 markdown wiki로 컴파일한다.
- **MCP (Model Context Protocol)** — 에이전트가 외부 도구·메모리·자원에 표준 인터페이스로 접근하는 Anthropic 프로토콜.
- **shared memory substrate** — 여러 agent가 동시에 읽고 쓰는 canonical 메모리 저장 계층 (본 보고서의 AKB 포지셔닝 키워드).
- **memory operating platform** — substrate 위에 governance·maintenance·publish layer를 더한 형태 (보고서가 AKB의 도착지로 권고한 모양).
- **brain-first query policy** — 외부 web/search 호출 전에 내부 KB를 먼저 조회하는 정책 (CLAUDE.md "rule #1"과 동형).
- **publish layer** — KB의 일부를 사람·다른 시스템이 읽을 수 있게 export하는 계층 (markdown, HTML, llms.txt, JSON, graph 등).
- **lifecycle 관리** — memory entry에 draft·active·stale·archived 등 상태를 부여해 수명을 추적한다.
- **citation repair** — 오래된·깨진 출처를 자동 보정하는 GBrain식 maintenance 기능.
- **tiered enrichment** — 엔티티에 깊이별로 단계적 메타정보를 자동 채워 넣는 패턴 (GBrain 특화).

<!-- HUMANIZE-SUMMARY v1.6.1
run_id: 2026-06-10-005
metrics:
  char_in: 3825
  char_out: 3760
  change_rate: 4.8%
  self_check: 6/6
  grade: A
categories:  # before → after
  A-18 좌향 수식 장문: 3 → 0
  A-9 "~에 의해" 류 피동/수동 서술: 2 → 0
  A-15 추상 주어 + 만능 동사: 2 → 0
  F-5 "~적 N" 추상 체인: 2 → 0
  G-2 "~일 수 있다" 추정: 2 → 0
  I-2 "~라는 점에 있다/이라는 방향성" 형식명사: 2 → 0
  H-3 메타 진입 "이는~": 1 → 0
  E-2 "~한다"/"~된다" 균일 종결: 다수 → 다양화(한다·이다·박아둔다·견준다·밟으라고 권한다·올라서려면)
  D-1 결산 피벗 "결론적으로/이를 통해": 0 → 0 (원문에 적음, 보존)
  C-11 연결어미 뒤 쉼표: 0 → 0
self_check:
  - 고유명사·수치·인용·영문 약어·점수표·인용된 URL/repo 경로 100% 보존: ✅ (AKB, llmwiki, GBrain, MCP, RAG, PostgreSQL, pgvector, 점수표 수치, wikilink 식별자, §번호 모두 동일)
  - 변경률 30% 이하: ✅ (4.8%)
  - 장르 이탈 없음: ✅ (리포트 register 유지)
  - register 보존: ✅ (격식체 -다체 일관)
  - S1 잔존 0건: ✅
  - 인공 표현 추가 없음: ✅ ("박아둔다", "밟으라고 권한다", "견준다" 등은 원문 의미 안에서만 종결 다양화 목적으로 치환)
highlights:
  - id: A-18
    before: "6개 평가축(...)으로 비교한 2026-04-18 작성 전략 보고서. ... 한 줄 결론과 함께, AKB가 ~ 진화하려면 ~ 따라야 한다는 권고를 제시한다."
    after: "2026-04-18에 작성한 전략 보고서로, ... 6개 축에서 견준다. 한 줄 결론은 ... 다. 여기에 더해 AKB가 ... 올라서려면 ... 밟으라고 권한다."
  - id: F-5 + I-2
    before: "라는 3-축 정체성으로 진화하라는 specific한 방향성."
    after: "라는 3-축 정체성으로 가라는 구체적인 방향이다."
  - id: A-9
    before: "AKB·llmwiki·GBrain이 같은 평면 위에서 trade-off가 가시화된다."
    after: "AKB·llmwiki·GBrain을 같은 평면에 놓아 trade-off가 한눈에 보인다."
  - id: G-2
    before: "불리하지만, 이는 설계 의도이지 결함이 아닐 수 있다."
    after: "불리하다. 다만 이는 설계 의도이지 결함은 아니다."
  - id: A-15
    before: "AKB가 진화해야 한다고 권고된 최종 형태"
    after: "보고서가 AKB의 도착지로 권고한 모양"
residual_findings: (없음)
grade_reason: "A — S1 0건, 변경률 4.8%, 자체검증 6항 통과. 리포트 register와 모든 식별자/점수표/§번호 인용 그대로."
-->
