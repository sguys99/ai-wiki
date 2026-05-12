---
title: "Graph-based RAG (LightRAG · LeanRAG) — DSBA 세미나 정리"
type: video
year: 2026
category: database
raw_path: /Users/kmyu/Desktop/project/ai-wiki/raw/videos/dsba-2026-paper-review-graph-based-rag.md
raw_filename: "dsba-2026-paper-review-graph-based-rag.md"
supplementary_raw_path: /Users/kmyu/Desktop/project/ai-wiki/raw/papers/Paper-Review-Graph-based-RAG.pdf
supplementary_raw_filename: "Paper-Review-Graph-based-RAG.pdf"
source_collection: external
source: dsba-2026-paper-review-graph-based-rag.md
channel: "서울대학교 산업공학과 DSBA 연구실"
presenter: "김도윤 (SNU 산업공학과 박사과정)"
url: "https://www.youtube.com/watch?v=QKewUxS1VKI"
duration: "PT53M20S"
upload_date: "2026-05-02"
papers_reviewed:
  - "LightRAG: Simple and Fast Retrieval-Augmented Generation (EMNLP 2025)"
  - "LeanRAG: Knowledge-Graph-Based Generation with Semantic Aggregation and Hierarchical Retrieval (AAAI-26)"
tags: [graph-rag, rag, knowledge-graph, lightrag, leanrag, paper-review, dsba, dual-level-retrieval, hierarchical-clustering, lca, video]
---

## 요약 (Summary)

DSBA 연구실(SNU 산업공학과) 김도윤 박사과정의 53분 세미나로, **Graph-based RAG**의 공통 파이프라인(KG 구축 → graph retrieval → context화 → generation)을 정리하고, 두 최신 방법론을 비교한다.

- **LightRAG (EMNLP 2025)** — "수평적·빠르게": entity·relation을 key-value로 재표현하고 쿼리에서 high/low **dual-level keyword**를 추출해 각각 relation·entity 검색에 사용. GraphRAG 대비 토큰·시간·메모리 모두 우수.
- **LeanRAG (AAAI-26)** — "수직적·깊게": 평면 KG에 GMM-BIC로 hierarchical 클러스터를 쌓고, 기존 hierarchical 방법들이 하지 않던 **abstract 노드 간 relation까지** 형성한 뒤, **LCA(Lowest Common Ancestor)** 로 의미 중복 최소화 경로를 retrieve.

핵심 통찰: graph-based RAG의 성패는 retrieval 단계의 **로컬·글로벌 정보 융합**과 **컨텍스트화 효율**에 달려 있다. 두 논문이 **원문(passage) 첨부 효과**에서 **상충된 결과**(LightRAG: 제거 시 종종 향상 / LeanRAG: 제거 시 하락)를 보인 점은 미해결 연구 과제로 남는다.

## 주요 기여 (Key Contributions)

영상 자체는 review 콘텐츠이며, 발표자가 정리·통찰한 부분이 wiki에 가장 가치 있다.

- **Graph-based RAG의 표준 파이프라인 5종 retrieval 패턴** 정리: 주요 노드 / 관계 / 경로 / 서브그래프 / hybrid.
- **Vanilla RAG vs Graph-based RAG 적합 영역** 명확화:
  - vanilla = 빠른 단순 QA(고객 지원, 제품 설명서)
  - graph-based = 다중 주제 통합이 필요한 도메인(의학·신약, 법률 판례, 산업 트렌드 분석)
- **두 대표 논문의 method axis 비교**:
  - LightRAG = key-value 재표현 + dual-level keyword (수평적, 효율 중심)
  - LeanRAG = hierarchical clustering + abstract relation + LCA retrieval (수직적, 정보 융합 중심)
- **두 논문 결과의 상충 지점 도출**: 원문 첨부의 효과가 정반대 → graph + raw text 융합 방식이 미해결 영역임을 부각.
- **발표자 비판**: LightRAG의 "논문 vs 코드 간극", LeanRAG의 "LCA case study 부재 + 효율성 평가 부재".

## 방법론 및 아키텍처 (Methodology and Architecture)

### Graph-based RAG 공통 파이프라인

1. **KG 구축**: LLM 프롬프트로 코퍼스에서 entity (name, type, description) + relation (source, target, description) 추출. **GraphRAG가 도입한 추출 포맷이 사실상 표준**.
2. **Graph Retrieval**: 쿼리와 관련된 노드/관계/경로/서브그래프 추출.
3. **Context화**: 검색 결과를 텍스트로 직렬화 + (선택) 출처 passage 첨부.
4. **Generation**: 컨텍스트와 쿼리로 LLM 응답 생성.

### LightRAG의 차별점

- **Key-Value 재표현**: entity를 `(name → description)`, relation을 `((src,tgt) → description)`의 string 쌍으로 직렬화 → 임베딩 검색이 단순해짐.
- **Dual-level keyword 추출**: 쿼리로부터 LLM이
  - **high-level** 키워드(개념·테마)와
  - **low-level** 키워드(구체 entity·디테일)를 동시에 추출.
- **검색 매칭**:
  - low-level keyword embedding ↔ **entity** key-value embedding
  - high-level keyword embedding ↔ **relation** key-value embedding
- **컨텍스트**: 검색된 entity·relation 서브그래프 + entity 출처 passage 중 등장 횟수 상위 일부.

### LeanRAG의 차별점

- **Hierarchical KG 구축 (Semantic Aggregation)**:
  - 노드 description 임베딩 → **GMM 클러스터링** ($m$은 BIC로 자동 결정).
  - 클러스터를 LLM에 입력해 **abstract entity** 생성.
  - 최대 레이어 $K = \lceil \log_2 N \rceil + 1$.
  - **Abstract 노드 간 relation 형성** (본 논문 핵심 차별점):
    - 클러스터 내 relation 토큰 수 ≤ 임계값 → 그대로 연결
    - 임계값 초과 → LLM으로 새 관계 합성
- **LCA-based Retrieval**:
  - 쿼리 임베딩으로 상위 k개 **seed entity** 선택.
  - 모든 seed entity를 포함하는 hierarchical 서브그래프를 LCA로 탐색.
  - 의미 중복 최소화 경로 추출.
- **컨텍스트**: LCA 경로의 entity·relation·description + anchor 노드의 원문 passage.

### 평가 프레임워크 (두 논문 공통)

- **Open-ended QA**: GraphRAG가 도입. Persona × Task 매트릭스로 LLM이 자동 질문 생성(예: 5×5×5 = 125 questions).
- **지표**: Comprehensiveness, Diversity, Empowerment, Overall — LLM-as-judge.
- **데이터셋**: **UltraDomain** (18 도메인, 428 원소). Agriculture·Computer Science·Legal·Mix 등으로 분리 평가.
- **비교 방식**: LightRAG = 페어와이즈, LeanRAG = 1–10 점수 평균(발표자는 페어와이즈가 더 적절했을 것이라 지적).

## 결과 (Results)

| 차원 | LightRAG | LeanRAG |
|---|---|---|
| 메인 비교 | 모든 baseline 대비 페어와이즈 승률 우세, 특히 **Diversity** | NaiveRAG·GraphRAG·LightRAG·HippoRAG 대비 전반적 우수 |
| 컨텍스트 토큰 수 | GraphRAG보다 길게 산출(원문 첨부 영향) | **가장 적은 토큰** — 의미 중복 최소화 |
| 효율성 | LLM 토큰·API 호출·인덱싱 시간·메모리·retrieval 시간 모두 GraphRAG 대비 우수 | **효율성 비교 실험 부재** (발표자 비판) |
| Ablation 핵심 | High-level keyword 제거 시 가장 큰 성능 하락 | Abstract relation 제거 시 성능 하락(특히 Diversity) |
| **원문 제거 효과** | **종종 성능 향상** (Agriculture 등) — 원문 노이즈 가설 | **성능 하락** — 구조+원문 융합이 필수 |
| 사용 모델 | GPT-4o-mini + BGE-M3 / OpenAI text-embedding-3-large(혼재) | DeepSeek-V3 + BGE-M3 |
| Mix 데이터셋 | GraphRAG가 약간 우세 (community summary가 다중 주제 포함) | — |

**상충 지점**: 두 논문이 같은 평가 프레임워크에서 원문 첨부의 효과를 정반대로 보고 — graph retrieval 결과와 raw passage를 어떻게·언제·얼마나 융합할지는 미해결 연구 영역.

## 한계 및 향후 과제 (Limitations & Open Questions)

발표자가 결론에서 제시한 향후 연구 질문:

1. **고정 KG 환경**: LLM으로 코퍼스에서 KG를 추출하는 본 두 논문과 달리, 외부에서 주어진 고정 KG(원문 부재)에서는 어떤 retrieval이 효과적인가?
2. **Non-KG 일반 그래프**: 인용 그래프, 소셜 그래프 등 일반 그래프에서의 retrieval 설계?
3. **인덱싱 vs 컨텍스트화**: 신규 데이터의 KG 추가 비용은 의외로 낮음. 오히려 retrieval 후 context화 단계가 시간을 소비 → 이 단계 효율화가 중요한 연구 포인트.
4. **원문 융합 방식**: LightRAG·LeanRAG의 상충 결과를 체계적으로 설명할 framework 필요.
5. **로컬·글로벌 정보 융합**: dual-level keyword(LightRAG) / hierarchical clustering(LeanRAG) 외 새로운 융합 메커니즘 가능성.

본 영상 자체의 한계: 자동 자막 기반이라 음성인식 오기·구어체가 다수. 두 논문의 정량 수치(테이블 값)가 대부분 인용되지 않아 정확한 벤치마크는 원논문 직접 확인 필요.

## 보조 자료 (Supplementary Material)

- **발표 슬라이드**: `raw/papers/Paper-Review-Graph-based-RAG.pdf` (45 pages)
  - 표지: "Lab Seminar · 서울대학교 산업공학과 DSBA · 박사과정 김도윤 · Graph-based RAG · 2026. 4. 27.(월)"
  - 구성: Introduction (vanilla vs graph RAG 비교표, retrieval 패턴 5종, GraphRAG·HippoRAG·HiRAG·HugRAG·CausalRAG·LightRAG·LeanRAG 연구 흐름, Multi-hop / Open-ended QA 평가) → Paper Review (LightRAG·LeanRAG 슬라이드) → Conclusion.
  - 본 wiki의 표/수치는 슬라이드와 transcript 양쪽에서 종합. 정량 검증이 필요할 때는 슬라이드 PDF가 1차 출처.

## 관련 페이지 (Related Pages)

- [[database/guo-2025-lightrag-simple-and-fast|LightRAG (Guo et al., EMNLP 2025)]] — 본 세미나가 review한 1번 논문. dual-level keyword retrieval과 KV 인덱스의 원전. 본 페이지의 인용된 모든 LightRAG 수치(610K→<100 tokens, -Origin 결과 등)의 1차 출처.
- [[database/zhang-2026-leanrag-knowledge-graph-based-generation|LeanRAG (Zhang et al., AAAI-26)]] — 본 세미나가 review한 2번 논문. hierarchical KG + aggregated relation + LCA retrieval. 본 페이지의 LeanRAG 점수표(Mix Overall 8.59 등)와 RQ3·RQ4 ablation의 1차 출처.

향후 추가 후보:
- **GraphRAG 원논문** (Microsoft, 2024) — LightRAG·LeanRAG 공통 baseline
- **HippoRAG** — entity-PageRank-passage 기반 graph RAG (LeanRAG 비교에서 상위권)
- **HiRAG** (Huang et al., 2025) — LeanRAG가 명시한 직전 SOTA
- **Raptor** — hierarchical clustering 기반 RAG (abstract 노드만 만들고 relation은 안 만드는 한계의 대표 사례)
- **RAGAS** — RAG 평가 프레임워크 (`evaluations` 카테고리)
- **UltraDomain** dataset
- 김도윤 발표자의 이전 GraphRAG 세미나·GNN4NLP 세미나 영상
