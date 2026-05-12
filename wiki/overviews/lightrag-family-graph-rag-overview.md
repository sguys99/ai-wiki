---
title: "Graph-based RAG — LightRAG 계열 (HKUDS RAG-Anything · LeanRAG)"
type: overview
year: 2026
category: overviews
source_collection: synthesis
sources:
  - guo-2025-lightrag-simple-and-fast.md
  - guo-2025-rag-anything-all-in-one-rag.md
  - hkuds-rag-anything.md
  - 9bow-2026-rag-anything-multimodal-rag-framework.md
  - zhang-2026-leanrag-knowledge-graph-based-generation.md
  - dsba-2026-paper-review-graph-based-rag.md
tags: [graph-rag, knowledge-graph, lightrag, leanrag, rag-anything, hkuds, hierarchical-retrieval, dual-level-retrieval, multimodal-rag, lca, overview, synthesis]
---

## 요약 (Summary)

**LightRAG**(HKUDS, EMNLP 2025)를 분기점으로 한 graph-based RAG 계열은, 동일 lab(HKUDS)의 **modality 축 확장(RAG-Anything, arXiv 2510.12323)** 과 외부 그룹(Shanghai AI Lab)의 **abstraction 축 확장(LeanRAG, AAAI-26)** 으로 갈라진다. 본 overview는 wiki에 실재하는 다음 6개 자료를 합성한다.

| 자료 | 유형 | 위치 |
|---|---|---|
| LightRAG (EMNLP 2025) | paper | [[database/guo-2025-lightrag-simple-and-fast]] |
| RAG-Anything (arXiv 2510.12323) | paper | [[database/guo-2025-rag-anything-all-in-one-rag]] |
| HKUDS/RAG-Anything | repo | [[database/hkuds-rag-anything]] |
| RAG-Anything 한국어 소개 (PyTorchKR) | article | [[database/9bow-2026-rag-anything-multimodal-rag-framework]] |
| LeanRAG (AAAI-26) | paper | [[database/zhang-2026-leanrag-knowledge-graph-based-generation]] |
| Graph-based RAG 세미나 (LightRAG · LeanRAG) | video | [[database/dsba-2026-paper-review-graph-based-rag]] |

핵심 메시지 세 줄:
- **공통 기반**: 코퍼스에서 LLM이 entity·relation을 추출해 KG 인덱스를 만들고, 이를 dense vector search와 함께 활용하는 graph-based RAG 패러다임. LightRAG가 **key-value 직렬화**로 임베딩 검색을 단순화하면서 이 계열의 시조 역할을 한다.
- **세 축의 확장**: (1) RAG-Anything = **modality** 축 (텍스트 → 이미지·표·수식), (2) LeanRAG = **abstraction** 축 (평면 KG → hierarchical + abstract relation), (3) RAG-Anything repo = **engineering** 축 (paper → MIT OSS).
- **미해결 모순**: LightRAG와 LeanRAG가 같은 UltraDomain 평가에서 **원문(passage) 첨부 효과**에 정반대 결과(LightRAG: 종종 제거 시 향상 / LeanRAG: 일관 하락)를 보고. retrieval 정밀도에 따라 원문의 역할이 noise냐 evidence냐가 갈리는 것으로 해석되나 통합 framework는 부재.

## 1. 가족 구성과 계보 (Family Tree)

```
   GraphRAG (Microsoft, 2024) ← 공통 시조
        │
        ▼ community summary가 무거움 / 증분 갱신 비싸다
   ┌────────────────────────────────────┐
   │   LightRAG (HKUDS, EMNLP 2025)     │  ◄── 본 계열의 trunk
   │   - KV 직렬화 + dual-level keyword │
   │   - community 제거, union 증분 갱신│
   └────────────────────────────────────┘
        │                          │
        │ modality 축              │ abstraction 축
        ▼                          ▼
   RAG-Anything (HKUDS)       LeanRAG (Shanghai AI Lab)
   = text-KG + cross-modal     = flat KG → hierarchical
     KG + VLM dereferencing      + abstract relation
                               + LCA bottom-up retrieval
        │
        │ engineering 축
        ▼
   HKUDS/RAG-Anything (repo, MIT, PyPI `raganything`)
   + 9bow 한국어 소개글 (PyTorchKR Discuss)
```

> **출처 위치**: LightRAG의 KV·dual-level은 [[database/guo-2025-lightrag-simple-and-fast]] §3.2–3.3. RAG-Anything의 dual-graph는 [[database/guo-2025-rag-anything-all-in-one-rag]] §3.2. LeanRAG의 aggregated relation은 [[database/zhang-2026-leanrag-knowledge-graph-based-generation]] §3.2. 운영·코드 구조는 [[database/hkuds-rag-anything]].

## 2. 공통 디자인 가정 (Shared Assumptions)

세 논문이 명시적/암묵적으로 공유하는 가정:

1. **LLM-extracted KG**: 외부 고정 KG가 아니라, LLM 프롬프트로 코퍼스에서 entity·relation을 추출. → 외부 fixed KG 환경에서의 적용은 세 논문 모두 미검증 (DSBA 세미나의 open question).
2. **GraphRAG식 평가**: UltraDomain(Qian et al., 2024) + persona × task 자동 질문 생성 + LLM-as-judge + 4 지표(Comprehensiveness · Diversity · Empowerment · Overall). LightRAG·LeanRAG·HiRAG가 동일 프레임 위에서 비교 가능.
3. **검색은 dense + structural의 hybrid**: 단순 dense vector search만으로는 multi-hop을 못 잡고, 단순 graph traversal만으로는 의미를 못 잡는다 — 둘을 결합한다.
4. **Open-ended QA 위주**: 단답형 정확도가 아니라 답변의 풍부함·다양성. → 정량 페어와이즈 또는 1–10 평균. RAG-Anything만 DocBench/MMLongBench의 정답 기반 accuracy로 전환.

## 3. 세 축의 확장 (Three Axes of Extension)

### Axis A — Modality (RAG-Anything)

- **무엇이 달라지는가**: 텍스트 외에 이미지·표·수식까지 atomic unit으로 normalize. 비텍스트 unit `c_j`마다 VLM이 검색용 description `d_chunk_j` + 그래프용 entity summary `e_entity_j` 생성 → anchor node `v_mm_j` + `belongs_to` 엣지.
- **왜 dual-graph인가**: 단일 거대 그래프 대신 cross-modal KG와 text-based KG를 별도 구축한 뒤 entity name으로 alignment. modality-specific grounding 보존이 목적.
- **합성 단계의 dereferencing**: 검색용 텍스트 프록시는 검색에만 사용하고, 합성 시 원본 시각을 base64로 복원해 VLM에 함께 입력 → 텍스트 압축으로 검색 효율 + 원본 시각으로 reasoning 충실도.
- **운영 측면 (repo)**: MinerU·Docling·PaddleOCR pluggable parser → 같은 `content_list` 표현으로 정규화. `BaseModalProcessor` 상속으로 modality 확장 가능. 3-mode 통합 질의 API(`aquery` / `aquery_with_multimodal` / `aquery_vlm_enhanced`).

### Axis B — Abstraction (LeanRAG)

- **두 문제 정식화**: (1) **Semantic Islands** — HiRAG/Raptor가 abstract 노드는 만들지만 노드 간 relation이 없어 cross-community 추론 불가. (2) **Structure-Retrieval Mismatch** — 검색이 hierarchical 인덱스를 무시하고 평면 유사도 검색으로 퇴화.
- **Aggregated Relation 생성** (핵심 차별점): 두 abstract entity $(\alpha_j, \alpha_k)$ 사이 connectivity strength $\lambda_{j,k}$(= base-layer inter-cluster relation 개수)가 threshold $\tau$ 초과 시 LLM 합성, 이하 시 단순 concatenation. → fully navigable semantic network.
- **LCA bottom-up retrieval**: 쿼리는 base-layer entity에만 anchor → seed들의 Lowest Common Ancestor 경로(shortest-path union)만 추출. 평면 KG에서 seed 간 모든 경로를 찾는 폭증을 피하고 의미 중복 최소화.
- **GMM-BIC**: 클러스터 수 $m$은 BIC로 자동 결정 (발표 슬라이드 출처; 본문에는 명시 부재). 최대 레이어 $K = \lceil \log_2 N \rceil + 1$.

### Axis C — Engineering (HKUDS/RAG-Anything repo + 9bow 글)

- **Reference implementation**: `reproduce/index.py` / `query.py` / `llm_answer_evaluator.py`로 paper 결과 재현. PyPI 한 줄 설치(`pip install raganything`).
- **운영 부속**: `resilience.py` (retry·CircuitBreaker), `callbacks.py` (MetricsCallback), `batch.py` (max_workers), `asset_urls.py` (CDN/S3 URL), `omml_extractor.py` (OOXML 수식), 다국어 프롬프트 — 논문에는 없는 production gap을 메운다.
- **확장 패턴**: `register_parser()`로 커스텀 파서, `BaseModalProcessor` 상속으로 modality 확장. 백본도 vLLM·Ollama·LM Studio·Minimax 예제 제공.
- **한국어 진입점**: 9bow(박정환)의 PyTorchKR 글이 도전 과제 → 핵심 기여 → 파이프라인 → 결과 → 설치까지 입문 압축. 단, GPT 정리본 디스클레이머가 붙어 있어 정밀 인용은 paper 페이지 우선.

## 4. 비교 매트릭스 (Comparison Matrix)

| 차원 | LightRAG | RAG-Anything | LeanRAG |
|---|---|---|---|
| **저자 lab** | HKUDS | HKUDS | Shanghai AI Lab + 협력 |
| **출간** | EMNLP 2025 Findings | arXiv 2510.12323 (2025-10) | AAAI-26 |
| **KG 구조** | 평면 KG, KV 직렬화 | text KG ⊕ cross-modal KG (dual) | hierarchical KG (multi-layer + abstract relation) |
| **인덱스 단위** | entity·relation KV 쌍 | atomic unit (text/image/table/equation) | base entity + aggregated entity + aggregated relation |
| **Retrieval 패러다임** | dual-level keyword (low·high) | structural navigation + semantic matching + modality fusion | base-layer anchor + LCA bottom-up |
| **원문 chunk 사용** | 검색된 entity 출처 chunk 일부 첨부 | dereferenced visual + textual context | base entity 출처 chunk 첨부 (필수) |
| **백본 (논문 셋업)** | GPT-4o-mini + BGE-M3 / text-embedding-3-large (혼재) | GPT-4o-mini + text-embedding-3-large + bge-reranker-v2-m3 | DeepSeek-V3 + BGE-M3 (RQ2는 Qwen3-14B) |
| **평가 데이터셋** | UltraDomain Mix/CS/Legal/Agriculture | DocBench (229 문서, 평균 66페이지) + MMLongBench (135 문서) | UltraDomain Mix/CS/Legal/Agriculture |
| **평가 방식** | 페어와이즈 win rate (4 metric) | accuracy % (정답 기반) | 1–10 평균 (5회 채점) |
| **핵심 ablation 결과** | -High 가장 큰 하락 / -Origin은 **종종 향상** | Chunk-only 60.0 → Full 63.4 (+그래프), w/o Reranker 62.4 (+1.0 marginal) | -Relation은 Diversity 최대 하락 / -Context는 **모두 하락** |
| **증분 갱신** | union 연산 (O(extract)) | 동일 (LightRAG 위) + atomic-unit별 VLM 비용 추가 | 본문 미언급, hierarchy 재구축 비용 모름 |
| **외부 의존** | lightrag-hku | lightrag-hku + MinerU/Docling/PaddleOCR + LibreOffice | 미공개 (KnowledgeXLab/LeanRAG 저장소 존재) |
| **라이선스(공개)** | MIT (HKUDS/LightRAG) | MIT (HKUDS/RAG-Anything) | 본문 명시 없음 (repo 확인 필요) |

## 5. 주요 결과 종합 (Key Results Synthesis)

### UltraDomain (LightRAG vs LeanRAG — 같은 데이터셋, 다른 judge)

LightRAG는 페어와이즈(LLM-as-judge: GPT-4o-mini), LeanRAG는 1–10 평균(LLM-as-judge: DeepSeek-V3). **직접 비교는 불가**하지만, LeanRAG 논문의 Table 1에서 LightRAG는 baseline으로 함께 측정됨:

| Dataset (Overall, 1–10, DeepSeek-V3 judge) | LeanRAG | HiRAG | GraphRAG | LightRAG | NaiveRAG |
|---|---|---|---|---|---|
| Mix | **8.59** | 8.08 | 7.87 | 7.61 | 7.47 |
| CS | **8.82** | 8.77 | 8.37 | 8.59 | 8.77 |
| Legal | **8.49** | 8.00 | 8.44 | 7.74 | 8.21 |
| Agriculture | **8.87** | 8.87 | 8.85 | 8.56 | 8.69 |

- LeanRAG가 모든 도메인에서 1위(또는 tie). Diversity 격차 최대.
- LightRAG는 LeanRAG 셋업에서 NaiveRAG·GraphRAG·HiRAG보다 종종 낮게 평가 — DSBA 세미나 발표자는 "정밀 hierarchical 검색이 도입된 환경에서는 LightRAG의 평면 KV가 상대적으로 밀린다"고 해석.
- **그러나** LightRAG 자체 페어와이즈에서는 GraphRAG·NaiveRAG·HyDE·RQ-RAG 모두 대비 일관 우세 (Mix만 GraphRAG 미세 열세). → **judge·평가 방식의 영향이 결과를 좌우**.

### DocBench / MMLongBench (RAG-Anything의 비교)

| Method | DocBench Overall | DocBench Mm. | MMLongBench Overall |
|---|---|---|---|
| GPT-4o-mini | 51.2% | 43.8% | 33.5% |
| LightRAG | 58.4% | 59.7% | 38.9% |
| MMGraphRAG | 61.0% | 66.0% | 37.7% |
| **RAG-Anything** | **63.4%** | **76.3%** | **42.8%** |

- 비텍스트 modality(Mm.) 격차가 가장 큼 — dual-graph의 본질적 기여.
- **장문 격차 확대**: 101–200p에서 68.2% vs MMGraphRAG 54.6%, 200+p에서 68.8% vs 55.0% → **13점+**. dual-graph의 entity 정렬이 페이지 간 multimodal evidence를 묶는다는 가설을 지지.

### Ablation 정렬 (그래프 vs 원문 vs 리랭커)

| 논문 | 그래프 제거 | 리랭커 제거 | 원문(passage) 제거 |
|---|---|---|---|
| LightRAG | 측정 안 함 | — | **Agriculture·Mix에서 종종 향상** (원문 noise 가설) |
| RAG-Anything | DocBench 60.0 (–3.4pp) | 62.4 (–1.0pp) | 측정 안 함 |
| LeanRAG | — | — | **모든 도메인 일관 하락** (Mix Overall 8.59 → 7.93) |

→ 그래프 자체의 가치는 RAG-Anything이 직접 입증(+3.4pp), 원문의 역할은 LightRAG·LeanRAG가 정반대 결론.

## 6. 미해결 모순과 Open Questions

DSBA 세미나가 정리·발견한 미해결 지점들 ([[database/dsba-2026-paper-review-graph-based-rag]] §5):

### 6.1 -Origin 모순 (LightRAG vs LeanRAG)

| | LightRAG ablation (-Origin) | LeanRAG ablation (w/o Context) |
|---|---|---|
| Agriculture | NaiveRAG 대비 **승률 향상** | Overall 8.87 → 8.53 (**하락**) |
| Mix | NaiveRAG 대비 **승률 향상** | Overall 8.59 → 7.93 (**하락**) |
| 해석 (LightRAG 저자) | 원문은 noise 포함, KG가 이미 충분 | (해당 안 됨) |
| 해석 (LeanRAG 저자) | (해당 안 됨) | graph = index/navigation, 원문 = rich content — 두 정보 협업이 필수 |

화해 가설: **retrieval 정밀도가 다르면 원문의 역할이 noise냐 evidence냐가 갈린다**. LightRAG의 평면 dual-level keyword는 검색이 거칠어 원문이 노이즈를 더하고, LeanRAG의 LCA bottom-up은 정밀해서 원문이 evidence를 보강한다 — 하지만 이 가설을 체계적으로 검증한 framework는 wiki 내 부재. **Open question #1**.

### 6.2 Mix 데이터셋 — community summary의 잔존 가치

LightRAG는 4 데이터셋 중 **Mix만 GraphRAG 대비 미세 열세**(승률 49.6%). 해석: 다도메인 융합 질의에는 GraphRAG의 community summary가 여전히 유리. LeanRAG가 같은 Mix에서 SOTA를 달성한 사실은 hierarchical abstract relation이 community summary의 대안이 될 수 있음을 시사 — 다만 직접적인 community detection vs hierarchical clustering 비교는 어느 논문도 수행 안 함. **Open question #2**.

### 6.3 LCA 깊이와 효율성

LeanRAG의 LCA가 실제로 어느 깊이까지 올라가는지 정성 분석이 없다(DSBA 세미나 발표자 비판). 만약 자주 root까지 올라간다면 LCA 효과가 약화 → hierarchy 사용 의의가 흔들린다. 또한 LCA 탐색의 latency 측정도 본문 부재. **Open question #3**.

### 6.4 인덱싱 비용 (특히 RAG-Anything)

LightRAG는 chunk별 LLM 1회로 끝나지만, RAG-Anything은 atomic unit별 VLM 호출이 누적 → indexing latency·비용이 크게 증가. paper는 latency 비교를 명시적으로 제공하지 않고, repo `docs/multimodal_rag_failure_modes.md`가 운영 함정만 안내. 정량 분석 부재가 **production 도입의 실질 장벽**. **Open question #4**.

### 6.5 고정 KG / Non-KG 그래프

세 논문 모두 "LLM이 코퍼스에서 KG 추출" 전제. 외부 fixed KG(원문 부재) 또는 인용 그래프·소셜 그래프 등 non-KG 일반 그래프에서 같은 retrieval이 동작하는지 미검증. **Open question #5** (DSBA 세미나 결론에서 명시).

## 7. 운영 선택 가이드 (When to Use Which)

본 wiki의 자료 기반 추천 — 본격 도입 전 paper의 한계 섹션을 반드시 확인할 것.

| 상황 | 추천 | 근거 |
|---|---|---|
| 텍스트 중심 일반 QA, 빠른 prototype | **LightRAG** | dual-level keyword 단순, indexing 비용 낮음, MIT |
| 다중 주제 융합·법률 판례·도메인 트렌드 분석 | **LeanRAG** | hierarchical + abstract relation이 cross-community 정보를 묶음 (Diversity 우위) |
| **이미지·표·수식 포함 복합 문서** (논문·재무 보고서·정부 보고서) | **RAG-Anything** | dual-graph가 비텍스트 evidence를 보존, dereferencing으로 VLM에 직접 시각 입력 |
| **100+ 페이지 장문 multimodal 문서** | **RAG-Anything** | DocBench 100+p에서 MMGraphRAG 대비 13점+ |
| Production OSS 도입 (Korean tutorial 필요) | **HKUDS/RAG-Anything repo** + [[database/9bow-2026-rag-anything-multimodal-rag-framework|9bow 한국어 글]] | resilience·callbacks·batch 등 운영 기능 + 한국어 진입 자료 |
| 외부 fixed KG 사용 (LLM 추출 X) | **세 방법 모두 미검증** — 채택 시 추가 검증 필요 | DSBA 세미나 open question #1 |
| 인덱싱 latency가 critical | **LightRAG > LeanRAG > RAG-Anything** | RAG-Anything은 atomic-unit별 VLM 비용, LeanRAG는 hierarchy 재구축 비용 미명시 |
| 페어와이즈 평가 환경 | LightRAG가 가장 일관된 강점 | LightRAG 자체 페어와이즈 결과 |
| 1–10 평균 / DeepSeek-V3 judge 환경 | LeanRAG가 SOTA | LeanRAG RQ1 |

## 8. 외부 위치 (External Positioning)

DSBA 세미나([[database/dsba-2026-paper-review-graph-based-rag]])가 정리한 graph-based RAG 흐름:

```
GraphRAG (MS, 2024)
  ├── HippoRAG: entity PageRank + passage
  ├── HiRAG (2025): hierarchical clusters, abstract relation 부재
  ├── HugRAG, CausalRAG
  ├── LightRAG (HKUDS, EMNLP 2025)  ← 본 계열 trunk
  │     ├── RAG-Anything (HKUDS, arXiv 2510.12323)   ← modality 축
  │     └── ...
  └── LeanRAG (Shanghai AI Lab, AAAI-26)             ← abstraction 축
        └── (HiRAG의 후속 보완 작업)
```

vanilla RAG vs graph-based RAG의 적합 영역(세미나의 분류):
- **vanilla**: 빠른 단순 QA (고객 지원, 제품 설명서)
- **graph-based**: 다중 주제 통합이 필요한 도메인 (의학·신약, 법률 판례, 산업 트렌드 분석)

## 9. 참조 위치 가이드 (Where to Look)

| 질문 | 1차 출처 (wiki 내) |
|---|---|
| LightRAG의 KV 인덱스 정확한 정의 | [[database/guo-2025-lightrag-simple-and-fast]] §3.2 |
| Dual-level keyword 매칭 대상 (논문 vs 코드 간극) | [[database/guo-2025-lightrag-simple-and-fast]] §3.3 + [[database/dsba-2026-paper-review-graph-based-rag]] |
| RAG-Anything의 dual-graph 수식 | [[database/guo-2025-rag-anything-all-in-one-rag]] §3.2 |
| Modality-aware retrieval signal 결합 방식 | [[database/guo-2025-rag-anything-all-in-one-rag]] §3.3 |
| `aquery_vlm_enhanced` 내부 동작 (base64 dereference) | [[database/hkuds-rag-anything]] §3 + repo `raganything/query.py` |
| MinerU / Docling / PaddleOCR 비교 | [[database/hkuds-rag-anything]] §3 |
| LeanRAG의 connectivity strength $\lambda_{j,k}$와 threshold $\tau$ | [[database/zhang-2026-leanrag-knowledge-graph-based-generation]] §3.2 |
| LCA path 정의 | [[database/zhang-2026-leanrag-knowledge-graph-based-generation]] §3.3 |
| RAG-Anything DocBench 카테고리별 점수 | [[database/guo-2025-rag-anything-all-in-one-rag]] §4.2 |
| LeanRAG ablation 페어와이즈 표 | [[database/zhang-2026-leanrag-knowledge-graph-based-generation]] §4.4 |
| Graph-based RAG 평가 패러다임 (open-ended QA) | [[database/dsba-2026-paper-review-graph-based-rag]] §방법론 |

## 10. 본 overview의 한계 (Caveats of This Synthesis)

- **2차 합성 자료**: 모든 수치는 wiki 내 6개 페이지에서 가져왔고, 각 페이지가 이미 원본의 2차 정리. 정밀 인용 시 원 논문(`raw/papers/`) 및 repo 확인 필요.
- **비대칭 비교**: LightRAG·LeanRAG는 같은 UltraDomain 평가에 있지만, RAG-Anything은 DocBench/MMLongBench로 평가 셋업이 분리됨 → 세 방법의 head-to-head 정량 비교는 wiki에 부재.
- **LightRAG vs LeanRAG의 결과 차이**가 judge LLM(GPT-4o-mini vs DeepSeek-V3) 영향인지, 평가 방식(페어와이즈 vs 1–10) 영향인지, retrieval 본질 차이인지 — 본 wiki 자료만으로는 분리 불가.
- **LeanRAG repo 운영 정보 부재**: KnowledgeXLab/LeanRAG는 wiki에 ingest되어 있지 않아, code-level 비교(LightRAG/RAG-Anything 대비)는 추후 추가 시 합성 가능.
- **HiRAG·HippoRAG·MMGraphRAG**가 본 wiki에 ingest되지 않아 baseline 측 디테일은 paper의 인용 범위로 제한.

## 관련 페이지 (Related Pages)

### Trunk (LightRAG)
- [[database/guo-2025-lightrag-simple-and-fast|LightRAG (EMNLP 2025)]] — KV 직렬화 + dual-level keyword. 본 계열의 시조.

### Modality 축
- [[database/guo-2025-rag-anything-all-in-one-rag|RAG-Anything (arXiv 2510.12323)]] — dual-graph + cross-modal hybrid retrieval.
- [[database/hkuds-rag-anything|HKUDS/RAG-Anything (repo)]] — 위 논문의 reference implementation (MIT, PyPI `raganything`).
- [[database/9bow-2026-rag-anything-multimodal-rag-framework|RAG-Anything 한국어 소개글]] — PyTorchKR 9bow 작성, 입문 진입점.

### Abstraction 축
- [[database/zhang-2026-leanrag-knowledge-graph-based-generation|LeanRAG (AAAI-26)]] — hierarchical KG + aggregated relation + LCA retrieval.

### 외부 위치 / 비판
- [[database/dsba-2026-paper-review-graph-based-rag|Graph-based RAG 세미나 (LightRAG · LeanRAG)]] — DSBA 김도윤 박사과정, 53분 발표. 본 overview의 모순·open question 부분의 1차 출처.

### 추후 ingest 후보 (현재 wiki에 부재)
- GraphRAG (Microsoft, 2024) — 본 계열의 공통 시조.
- HiRAG (Huang et al., 2025) — LeanRAG가 명시한 직전 SOTA.
- HippoRAG — entity-PageRank-passage 기반.
- Raptor — hierarchical clustering의 대표.
- MMGraphRAG — RAG-Anything 주요 multimodal baseline.
- KnowledgeXLab/LeanRAG (repo) — LeanRAG의 reference implementation.
