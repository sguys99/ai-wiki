---
title: "[Paper Review] Graph based RAG"
type: video
year: 2026
category: database
raw_path: /Users/kmyu/Desktop/project/ai-wiki/raw/videos/dsba-2026-paper-review-graph-based-rag.md
raw_filename: "dsba-2026-paper-review-graph-based-rag.md"
source_collection: external
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

## 한 줄 요약 (One-line Summary)

DSBA 연구실(SNU 산업공학과) 김도윤 박사과정의 53분 세미나. **Graph-based RAG**(지식 그래프 기반 RAG)의 공통 메커니즘을 정리하고, **LightRAG**(EMNLP 2025, dual-level keyword retrieval로 효율성 강조)와 **LeanRAG**(AAAI-26, hierarchical KG + LCA retrieval로 글로벌·로컬 정보 동시 포착)를 비교 분석한다. 핵심 메시지: **그래프 retrieval**의 설계(구조 정보 추출 + 로컬·글로벌 융합 + 컨텍스트화 효율)가 graph-based RAG의 성패를 가른다.

## 1. 자료 정보 (Document Information)

- **제목**: [Paper Review] Graph based RAG
- **발표자**: 김도윤 (서울대학교 산업공학과 데이터 과학 및 비즈니스 애널리틱스(DSBA) 연구실 박사과정, doyooni303@snu.ac.kr)
- **채널**: 서울대학교 산업공학과 DSBA 연구실 (YouTube)
- **업로드**: 2026-05-02
- **길이**: 53분 20초 (3,200초)
- **유형**: 논문 세미나 (paper review)
- **다룬 논문**:
  1. **LightRAG**: Simple and Fast Retrieval-Augmented Generation (EMNLP 2025)
  2. **LeanRAG**: Knowledge-Graph-Based Generation with Semantic Aggregation and Hierarchical Retrieval (AAAI-26, 2026년 1월 발표)
- **참고 사전 영상**: 발표자의 이전 GraphRAG 세미나 (Microsoft GraphRAG 2024 리뷰)와 GNN4NLP 세미나 — 본 영상은 그 후속.
- **자막**: YouTube 자동 자막(ko)을 정제(rolling-subtitle dedup, 5분 단위 버킷)한 transcript 사용. 자동 자막 특성상 일부 음성인식 오기(예: "라이트래그"→"라이그/라이베그/레라그", "레그"→RAG, "지지크래프"→"지식 그래프")가 섞여 있음.

## 2. 주요 기여 (Key Contributions)

본 영상은 발표자의 자체 연구가 아니라 두 논문의 정리·비교 review이다. 주요 정리·통찰은 다음과 같다.

1. **Graph-based RAG의 표준 파이프라인 정리**: ① KG 구축(LLM 프롬프트 기반, GraphRAG 이후 표준화된 entity/relation 추출 포맷) → ② Graph Retrieval(주요 노드/관계/경로/서브그래프/hybrid 중 선택) → ③ Context화(검색된 그래프 요소를 텍스트 직렬화) → ④ Generation.
2. **Vanilla RAG vs Graph-based RAG 적합 영역 구분**: vanilla = 빠르고 단순한 QA(고객 지원, 제품 설명서); graph-based = 다중 주제 통합이 필요한 도메인(의학·신약 연구, 법률 판례, 산업 트렌드 분석).
3. **두 논문의 method 비교 정리**:
   - LightRAG = "수평적이고 빠르게" — entity/relation을 key-value로 재표현 + dual-level keyword retrieval로 그래프 크기에 비효율적인 GraphRAG 대비 효율성 확보.
   - LeanRAG = "수직적으로 깊게" — 평면 KG에 hierarchical clustering으로 abstract 노드를 쌓되, **abstract 노드들 간 relation까지 형성**(이전 hierarchical 방법론들은 노드만 만들고 관계는 만들지 않았음)하고 LCA(Lowest Common Ancestor)로 의미 중복 최소화 경로를 retrieve.
4. **두 논문의 상충 결과를 발표자 관점에서 해석**: LightRAG ablation에서는 **원문 제거 시 종종 성능이 향상**(원문 노이즈 가설), LeanRAG에서는 **원문 제거 시 성능 하락**. → 원문(텍스트 청크)을 그래프 retrieval에 어떻게 융합할지는 미해결 연구 과제.
5. **개인 연구 동기 공유**: 발표자는 기술 경영 관점에서 산업 트렌드 분석을 위한 graph-based RAG 프레임워크를 개인 연구로 진행 중이라고 언급.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 Graph-based RAG 공통 메커니즘 (서론)

- **KG 구축**: LLM에 프롬프트로 entity(name, type, description)와 relationship(source, target, description)을 추출 — GraphRAG에서 제시한 포맷이 사실상 표준.
- **Graph Retrieval 패턴 5종**:
  1. 주요 노드 (entity) 만 — 예: HippoRAG (쿼리 연관 entity 검색 → PageRank → entity가 포함된 passage 활용)
  2. 주요 관계 (relation)
  3. 주요 경로 (path)
  4. 서브그래프 (subgraph) — GraphRAG의 community detection이 여기 해당
  5. Hybrid
- **검색 결과의 컨텍스트화**: entity·relation을 텍스트로 직렬화 + (선택적으로) 출처 passage 첨부.
- **추가 모듈로 KG를 변형하는 접근**: LightRAG = key-value 재표현, LeanRAG = hierarchical 확장.

### 3.2 LightRAG (EMNLP 2025)

- **문제 의식**: 기존 graph-based RAG(특히 GraphRAG)는 entity 간 다양한 관계를 충분히 반영 못 하고, 그래프 크기에 따라 비효율(노드 수 N에 대해 ~O(N²) 복잡도)임.
- **목표 3가지**: comprehensive information retrieval, enhanced retrieval efficiency, rapid adaptation to new data.
- **그래프 구축**:
  - Entity: `key = entity name`, `value = description`
  - Relationship: `key = (source, target) tuple`, `value = description`
  - 중복 제거 후 최종 KG 형성.
- **Dual-level Retrieval (핵심)**:
  - 쿼리로부터 LLM이 두 종류 키워드 추출: **high-level**(개념·테마) + **low-level**(구체 entity·디테일).
  - 키워드 리스트를 문자열로 연결 → 임베딩.
  - **Low-level keyword 임베딩 ↔ Entity key-value 문자열 임베딩** 매칭.
  - **High-level keyword 임베딩 ↔ Relation key-value 문자열 임베딩** 매칭.
  - 상위 k개 entity·relation으로 서브그래프 구축.
- **Context 구성**: 서브그래프의 entity·relation 텍스트 + entity 출처 passage 중 등장 횟수 상위 일부.
- **논문 vs 코드 간극** (발표자 지적): 논문은 low-level keyword를 entity name과만 비교한다고 서술하나, 공식 코드는 entity name + description 양쪽으로 검색.

### 3.3 LeanRAG (AAAI-26)

- **문제 의식**:
  - GraphRAG의 community summary가 너무 coarse하고 community 간 연결이 없음.
  - 기존 hierarchical 접근(Raptor 등)은 abstract 노드를 만들지만 **abstract 노드들 간 relation을 형성하지 않음** → vertical 정보 단절.
- **Hierarchical KG 구축 (Semantic Aggregation)**:
  - 평면 KG의 노드 description으로 임베딩 → **Gaussian Mixture Model**로 클러스터링.
  - 클러스터 수 $m$은 BIC로 결정. 최대 레이어 수 $K = \lceil \log_2 N \rceil + 1$ (N = 평면 KG 노드 수).
  - 각 클러스터를 LLM에 프롬프트로 입력해 abstract entity와 description 생성.
  - **Abstract entity 간 relation 형성 (본 논문 핵심)**:
    - 두 abstract 노드 $\alpha_1, \alpha_2$ 사이 — 클러스터 내 relation들을 나열했을 때 토큰 수가 임계값 이하면 그대로 연결.
    - 임계값 초과면 LLM으로 새 관계를 합성.
- **Hierarchical Retrieval (LCA 기반)**:
  - 쿼리로부터 entity 임베딩 매칭으로 상위 k개 **seed entity** 선택.
  - 모든 seed entity를 포함하는 hierarchical 서브그래프를 **Lowest Common Ancestor**로 탐색 → 의미적으로 중복 최소화된 경로 추출.
- **Context 구성**: LCA 경로 내 모든 entity·relation·description + anchor 노드의 원문 passage.

### 3.4 두 논문 공통 평가 프레임워크

- **Open-ended QA (GraphRAG에서 도입한 방식)**:
  - Persona × Task 매트릭스로 LLM-as-judge가 질문 자동 생성 (예: 5 persona × 5 task × 5 question = 125 questions).
  - 평가 지표: **Comprehensiveness, Diversity, Empowerment, Overall** — LLM-as-judge로 페어와이즈(LightRAG) 또는 1–10 점수 평균(LeanRAG).
- **데이터셋**: **UltraDomain** 코퍼스 — 18개 도메인, 428개 원소. LightRAG는 Agriculture·Computer Science·Legal·Mix 4종으로 분리, LeanRAG도 유사 사용.
- **(추가) Multi-hop QA**: 일부 연구는 MuSiQue 등 공개 multi-hop dataset에 exact match·recall·RAGAS로 평가하지만 본 두 논문은 open-ended QA가 메인.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 LightRAG 결과

- **메인 비교 (RQ1)**: GraphRAG 포함 모든 baseline 대비 LightRAG가 4 metric 페어와이즈에서 전반적으로 높은 승률. 특히 **Diversity**에서 유리(dual-level 설계 의도와 정합).
- **예외**: Mix dataset(여러 도메인 통합)에서는 GraphRAG가 LightRAG보다 약간 우세 — 발표자 해석: GraphRAG의 community summary가 다양한 주제를 이미 포함해서 그런 듯.
- **Ablation (RQ2)**:
  - **High-level keyword 제거 시 가장 큰 성능 하락** → high-level이 핵심 기여.
  - **원문(passage) 제거 시 성능 종종 향상**(특히 Agriculture). 발표자(저자 인용): 원문에 노이즈가 포함될 수 있음.
- **효율성 (RQ3)** — GraphRAG 대비:
  - LLM 입출력 토큰 수, API 호출 횟수: 현저히 낮음 (Table 3).
  - 신규 데이터 추가 시간·메모리: 훨씬 짧음·작음 (Tables 5, 7).
  - Retrieval 시간: 훨씬 짧음 (Table 6).
- **사용 모델**: Generation/Judge = GPT-4o-mini, Embedding = BGE-M3 또는 OpenAI text-embedding-3-large (코드상 양자 혼재, 명시 없음).

### 4.2 LeanRAG 결과

- **메인 성능 (RQ1)**: LeanRAG가 NaiveRAG·GraphRAG·LightRAG·HippoRAG 등 대비 전반적으로 우수. HippoRAG도 hierarchical 계열로서 상위권 — **계층적 그래프 활용이 효과적**임을 시사.
- **컨텍스트 토큰 수 (RQ2)**: LeanRAG가 가장 적은 토큰으로 컨텍스트 구성 → 의미 중복이 적음 (LCA 효과). 평가 모델: Qwen-2.5-14B. **흥미로운 관찰**: LightRAG의 컨텍스트가 GraphRAG보다 길게 나옴(원문 첨부 영향 추정).
- **Abstract relation의 효과 (RQ3)**: abstract entity 간 relation 제거 시 페어와이즈 비교에서 성능 하락 — 특히 **Diversity**에서 큰 하락(글로벌 관점 손실).
- **원문 사용 효과 (RQ4)**: 원문 제거 시 성능 하락 → 저자 주장: "구조 정보(graph) + 실제 내용(원문 청크)을 함께 융합해야". **LightRAG와 정반대 결과**.
- **사용 모델**: Generation = DeepSeek-V3, Embedding = BGE-M3.

### 4.3 발표자의 비판·아쉬움 정리

- **LightRAG**: 논문과 코드 구현 사이 간극(검색 대상 entity name vs name+description).
- **LeanRAG**:
  - 평가 방식이 1–10 점수 평균이라 페어와이즈가 더 정확했을 것.
  - LCA가 실제로 몇 단계까지 올라갔는지 case study가 부재 — 만약 대부분 root까지 올라간다면 LCA의 효과가 약한 것.
  - **효율성 비교 실험 부재** (LCA 탐색이 추론 시간의 대부분을 차지할 가능성).

## 5. 한계와 향후 과제 (Limitations and Future Work)

발표자가 결론에서 제시한 향후 연구 질문들:

1. **고정 KG 환경**: 본 두 연구는 LLM으로 코퍼스에서 KG를 추출했다. 그러나 외부에서 주어진 고정 KG(원문 부재)에서는 어떤 retrieval이 효과적인가?
2. **Non-KG 일반 그래프**: 지식 그래프가 아닌 일반 그래프(예: 인용 그래프, 소셜 그래프)에서의 효과적 retrieval 설계는?
3. **인덱싱 vs 컨텍스트화 효율**: 신규 데이터를 KG에 추가하는 비용은 의외로 낮음. 오히려 retrieval 후 context화 단계가 시간을 잡아먹음 → 이 단계의 효율화가 중요한 연구 포인트.
4. **원문 활용 방식 미해결**: LightRAG(원문 제거 시 성능 ↑)와 LeanRAG(원문 제거 시 성능 ↓)의 상충 결과 — 원문을 언제·어떻게·얼마나 융합할지에 대한 체계적 연구가 필요.
5. **로컬·글로벌 정보 융합**: 모든 graph-based RAG의 공통 화두. dual-level keyword(LightRAG), hierarchical clustering(LeanRAG) 외의 새로운 융합 메커니즘 가능성.

본 영상 자체의 한계: 자동 자막 기반이라 음성인식 오기·구어체가 다수. 두 논문의 정량 수치(테이블 값)가 본문에서 거의 인용되지 않아 정확한 벤치마크 점수를 얻으려면 원논문을 직접 읽어야 함.

## 6. 관련 연구 (Related Work)

본 영상에서 언급되거나 위치 지어진 연구들:

- **GraphRAG (Microsoft, 2024)**: Graph-based RAG의 시조. KG 구축 → community detection → community summary 활용. 본 영상의 두 논문이 모두 비교 baseline으로 사용.
- **HippoRAG**: Entity 검색 → PageRank → entity 포함 passage 활용. Hierarchical retrieval 계열로 LeanRAG 비교에서 강한 성능.
- **CausalRAG**: Seed entity → S-hop 서브그래프 → 경로 요약 활용.
- **Raptor 계열 hierarchical 방법**: Abstract 노드는 만들지만 노드 간 relation을 만들지 않는 한계 — LeanRAG가 메우려는 gap.
- **UltraDomain**: 18개 도메인 멀티-도메인 코퍼스. Open-ended QA 평가의 표준 데이터셋.
- **MuSiQue**: 멀티홉 QA 평가의 대표 데이터셋(본 두 논문은 직접 사용하지 않으나 graph-based RAG 평가의 두 축 중 하나).
- **RAGAS**: LLM-as-judge 기반 RAG 평가 프레임워크.
- **GNN4NLP** (발표자 이전 세미나): 그래프와 NLP 연계 연구의 전사(prior).

## 7. 용어집 (Glossary)

- **Graph-based RAG**: 지식 그래프(KG)로 표현된 데이터베이스를 활용한 RAG. Vector DB 기반 vanilla RAG와 달리 노드·관계 구조로 정보를 보존.
- **GraphRAG**: Microsoft가 2024년 제시한 graph-based RAG의 시조 방법론. KG 구축 → Leiden community detection → community summary → query-time retrieval.
- **Knowledge Graph (KG)**: Entity(노드)와 relation(엣지)으로 구성된 구조적 지식 표현. Entity는 (name, type, description), relation은 (source, target, description)로 표준화됨.
- **Dual-level Retrieval (LightRAG)**: 쿼리에서 high-level 키워드(개념·테마)와 low-level 키워드(구체 entity)를 동시에 추출하여 각각 relation·entity 검색에 사용하는 방식.
- **Hierarchical KG (LeanRAG)**: 평면 KG 위에 GMM 클러스터링으로 abstract 노드 레이어를 $K = \log_2 N + 1$개까지 쌓고, 같은 레이어의 abstract 노드 간에도 관계를 형성한 KG.
- **Lowest Common Ancestor (LCA)**: 트리/계층 그래프에서 두 노드의 공통 조상 중 가장 깊은(낮은) 노드. LeanRAG에서는 seed entity들의 LCA를 기준으로 의미 중복 최소화 서브그래프 경로를 추출.
- **Seed Entity (LeanRAG)**: 쿼리 임베딩과 entity 임베딩 간 유사도 기반으로 선택된 검색 시작점 entity 집합.
- **Abstract Entity / Abstract Relation (LeanRAG)**: 클러스터링으로 만들어진 상위 레이어의 가상 노드·관계. LLM으로 description을 합성.
- **Anchor Node**: LeanRAG retrieval에서 LCA 경로의 leaf에 해당하는 평면 KG entity. 출처 원문 passage가 첨부됨.
- **Open-ended QA**: Persona × Task 매트릭스에서 자동 생성된 질문에 대해 LLM-as-judge로 평가하는 방식. GraphRAG가 도입.
- **Comprehensiveness / Diversity / Empowerment / Overall**: Open-ended QA의 4 평가 지표 — 답변의 포괄성, 다양한 관점, 사용자 의사결정 지원, 종합 품질.
- **UltraDomain**: 18 도메인 428 원소의 멀티-도메인 코퍼스. Graph-based RAG 평가 표준.
- **Mosaic of contexts (의미 중복 최소화)**: LeanRAG의 LCA가 추구하는 성질 — 같은 의미를 반복하지 않는 경로로만 컨텍스트를 구성.
- **Key-Value 재표현 (LightRAG)**: KG의 entity와 relation을 (name → description), ((src,tgt) → description)의 키-값 쌍 문자열로 직렬화하여 임베딩 검색을 단순화한 트릭.
- **GMM-BIC 클러스터링 (LeanRAG)**: Gaussian Mixture Model로 노드 임베딩을 클러스터링하되, 클러스터 수는 Bayesian Information Criterion으로 자동 결정.
