---
title: "AutoRAG: Automated Framework for optimization of Retrieval Augmented Generation Pipeline"
type: repo
year: 2024
category: evaluations
raw_path: /Users/kmyu/Desktop/project/ai-wiki/raw/repos/marker-inc-korea-autorag
raw_filename: "marker-inc-korea-autorag/"
source: marker-inc-korea-autorag.md
source_collection: external
org: "Marker-Inc-Korea"
repo: "AutoRAG"
url: "https://github.com/Marker-Inc-Korea/AutoRAG"
license: "Apache-2.0"
tags:
  - rag
  - automl
  - evaluation
  - pipeline-optimization
  - korean
  - hybrid-retrieval
  - reranker
  - rag-benchmark
figures:
  - id: fig01
    file: assets/marker-inc-korea-autorag/node_lines.png
    raw: raw/repos/marker-inc-korea-autorag/docs/source/_static/node_lines.png
    caption: "AutoRAG Node Line 구조 — Node Line은 Node의 묶음, Node는 swap 가능한 Module 컨테이너"
    strategy: manual
    curated: true
  - id: fig02
    file: assets/marker-inc-korea-autorag/full_yaml_structure.png
    raw: raw/repos/marker-inc-korea-autorag/docs/source/_static/yaml/full_yaml_structure.png
    caption: "YAML config 전체 구조 — node_lines → nodes → modules 의 3계층 트리"
    strategy: manual
    curated: true
  - id: fig04
    file: assets/marker-inc-korea-autorag/data_creation_pipeline.png
    raw: raw/repos/marker-inc-korea-autorag/docs/source/_static/data_creation_pipeline.png
    caption: "Data Creation 파이프라인 — 원본 → Parsing → Chunking → QA Generation"
    strategy: manual
    curated: true
  - id: fig05
    file: assets/marker-inc-korea-autorag/data_creation_schema.png
    raw: raw/repos/marker-inc-korea-autorag/docs/source/_static/qa/data_creation_schema.png
    caption: "QA / Corpus 데이터 스키마 (qa.parquet, corpus.parquet) 및 retrieval_gt 매핑"
    strategy: manual
    curated: true
  - id: fig08
    file: assets/marker-inc-korea-autorag/score_fusion.png
    raw: raw/repos/marker-inc-korea-autorag/docs/source/_static/score_fusion.png
    caption: "Hybrid Retrieval의 score fusion (RRF / CC normalize) 개념도"
    strategy: manual
    curated: true
  - id: fig11
    file: assets/marker-inc-korea-autorag/trial_summary.png
    raw: raw/repos/marker-inc-korea-autorag/docs/source/_static/trial_summary.png
    caption: "Trial summary CSV — 노드별 최적 모듈 / 메트릭 점수가 정리된 결과"
    strategy: manual
    curated: true
---

## 요약 (Summary)

AutoRAG는 사용자가 보유한 QA·Corpus 평가 데이터에서 RAG 파이프라인의 노드별 모듈 조합을 그리드 서치로 자동 평가·비교해 **"내 데이터에 가장 잘 맞는 RAG"** 를 찾아주는 RAG AutoML 프레임워크다. Apache-2.0 라이선스, Python 3.10+, CLI(`autorag`)로 제공된다. `Node Line → Node → Module` 3계층 추상화 위에서 YAML 한 장으로 수십 개 모듈 조합을 자동 평가하고, retrieval/generation 메트릭에 따라 노드별 winner를 골라 trial 폴더에 누적한다. 최적 파이프라인은 그대로 `Runner` / `ApiRunner` / Gradio 웹UI로 즉시 서빙한다. BM25 토크나이저로 `ko_kiwi / ko_okt / ko_kkma / sudachipy`를 기본 제공해 한국어 RAG에 친화적이다.

## 주요 기여 (Key Contributions)

1. **RAG에 AutoML을 적용한 초기 오픈소스 도구.** 평가 데이터셋과 YAML 한 장만 있으면 수십 개 모듈 조합을 자동 평가하고 노드별 최적 모듈을 골라낸다.
2. **Node × Module 추상화로 RAG를 모듈화.** Node는 같은 역할(lexical retrieval, semantic retrieval, reranker, generator 등)을 맡는 Module들의 swap container이고, Node Line은 실행 순서다. YAML에서 Module을 추가하거나 빼면 그대로 실험이 확장된다.
3. **Strategy 기반 노드별 의사결정.** Node마다 `metrics` (retrieval_f1·recall·ndcg·mrr·map / meteor·rouge·sem_score) 와 `speed_threshold`를 두어 정확도와 속도 trade-off를 드러낸다.
4. **데이터 생성·평가·배포 풀스택.** Parsing → Chunking → QA Generation → Trial 평가 → API/Web 서빙까지 동일 YAML 패턴으로 묶인다.
5. **한국어 RAG에 친화적.** `ko_kiwi / ko_okt / ko_kkma / sudachipy` BM25 토크나이저를 기본 제공한다. `sample_config/rag/korean/`에 GPU / non-GPU baseline이 들어 있다.

## 방법론 및 아키텍처 (Methodology and Architecture)

### 3계층 모델 — Node Line / Node / Module

| 계층 | 정의 | 예 |
|---|---|---|
| Node Line | Node들의 순서 묶음 (실행 파이프라인) | `pre_retrieve_node_line`, `retrieve_node_line`, `post_retrieve_node_line` |
| Node | 같은 역할을 하는 Module들의 swap container + 공통 파라미터 | `lexical_retrieval`, `semantic_retrieval`, `hybrid_retrieval`, `passage_reranker`, `prompt_maker`, `generator` |
| Module | 실제 알고리즘 + 자체 파라미터 (튜플/리스트로 그리드 정의) | `bm25`, `vectordb`, `hybrid_rrf`, `monot5`, `colbert_reranker`, `openai_llm` |

![[assets/marker-inc-korea-autorag/node_lines.png]]
*Figure 1: Node Line 구조 — Node Line은 Node의 묶음, Node는 swap 가능한 Module 컨테이너 (AutoRAG docs)*

### YAML 3계층 트리

YAML config는 `node_lines → nodes → modules` 의 트리 구조를 따른다.

![[assets/marker-inc-korea-autorag/full_yaml_structure.png]]
*Figure 2: YAML config 전체 구조 (AutoRAG docs)*

```yaml
node_lines:
  - node_line_name: retrieve_node_line
    nodes:
      - node_type: lexical_retrieval
        strategy:
          metrics: [retrieval_f1, retrieval_recall, retrieval_ndcg, retrieval_mrr]
          speed_threshold: 10
        top_k: 10
        modules:
          - module_type: bm25
            bm25_tokenizer: [porter_stemmer, ko_kiwi, space, gpt2, ko_okt, ko_kkma, sudachipy]
      - node_type: hybrid_retrieval
        strategy:
          metrics: [retrieval_f1, retrieval_recall, retrieval_ndcg]
        top_k: 10
        modules:
          - module_type: hybrid_cc
            normalize_method: [mm, tmm, z, dbsf]   # 4가지
            weight_range: (0.0, 1.0)
            test_weight_size: 101                   # 101 포인트 스캔
```

같은 Module 안에서 파라미터를 리스트나 튜플로 주면 곱집합으로 그리드 탐색이 일어난다. 위 예시는 `hybrid_cc` 하나로 4 × 101 = 404 조합을 평가한다.

### Strategy — 노드별 최적화 정책

각 Node는 자체 `strategy` 블록을 갖는다.

- `metrics`로 평가축이 정해진다. Node가 retrieval이면 retrieval_*, generator면 meteor / rouge / sem_score.
- `speed_threshold` (옵션) — 너무 느린 Module을 컷오프한다.
- Node마다 독립적으로 다른 metric을 쓴다. RAG는 본디 다목적 최적화라 노드 단위 의사결정이 알맞다.

### Hybrid Retrieval — RRF · CC

`hybrid_rrf`는 Reciprocal Rank Fusion (가중치 정수, weight_range: (4,80) 스캔), `hybrid_cc`는 점수 정규화 후 가중합 (mm / tmm / z / dbsf 네 가지 normalize).

![[assets/marker-inc-korea-autorag/score_fusion.png]]
*Figure 3: Hybrid Retrieval의 score fusion 개념 (AutoRAG docs)*

### Data Creation 파이프라인

```
Raw docs
  → Parser (langchain_parse · pdfminer · llama_parse) → parsed.parquet
  → Chunker (llama_index_chunk Token / Sentence / Semantic) → corpus.parquet
  → corpus.sample(random_single_hop) → make_retrieval_gt_contents
  → factoid_query_gen (LLM)
  → make_basic_gen_gt + make_concise_gen_gt (LLM)
  → dontknow_filter_rule_based → qa.parquet
```

![[assets/marker-inc-korea-autorag/data_creation_pipeline.png]]
*Figure 4: Data Creation 파이프라인 (AutoRAG docs)*

QA / Corpus 데이터의 스키마와 `retrieval_gt` 매핑은 아래와 같다.

![[assets/marker-inc-korea-autorag/data_creation_schema.png]]
*Figure 5: QA / Corpus 데이터 스키마 (AutoRAG docs)*

`Raw → Corpus → QA`는 모두 `autorag.data.qa.schema` 위에서 `.batch_apply()` 체이닝으로 LLM 호출이 일괄화된다. 여러 chunk 방식을 비교하려면 corpus를 새로 만들고 `retrieval_gt`를 다시 매핑해야 한다. chunking이 정답 passage id에 영향을 주기 때문이다.

## 결과 (Results)

trial 폴더에는 노드별 결과 parquet과 통합 `summary.csv`가 누적된다. summary는 각 Node에서 어떤 Module이 winner인지, 그 때의 메트릭 점수가 얼마인지를 한 줄씩 정리한다.

![[assets/marker-inc-korea-autorag/trial_summary.png]]
*Figure 6: Trial summary CSV — 노드별 최적 모듈 / 메트릭 점수 (AutoRAG docs)*

동봉 데이터셋 ELI5, HotpotQA, MS MARCO, TriviaQA로 baseline 실험을 돌릴 수 있고, 정량 벤치마크는 동봉 논문(arXiv:2410.20878)에 따로 수록되어 있다. HuggingFace Spaces 3종(데이터 생성·파이프라인 최적화·Naive RAG 챗봇)과 Colab 튜토리얼 3종도 함께 제공된다.

## 한계 (Limitations)

- **그리드 서치 비용** — 모듈/파라미터 곱집합이 커지면 평가 비용(특히 LLM 호출)이 폭증한다. `speed_threshold`와 사전 `validate` 단계로 완화하지만 본디 무거운 작업이다.
- **chunking 비교가 무겁다** — chunk 방식이 다르면 `retrieval_gt`가 달라져 corpus를 새로 만들고 다시 매핑해야 한다.
- **Node Line 토폴로지 고정** — sequential 구조다. 향후 merge / split / loop를 지원하겠다는 로드맵이 있으나 아직 미구현. Modular RAG로 가려면 반드시 필요한 능력이다.
- **베이스 의존성이 무겁다** — llama-index / langchain / vector DB 클라이언트 / 다수 reranker 라이브러리에 걸린다. CI·배포에서 dependency conflict가 잦은 영역이다.
- **YAML이 커지면 가독성 저하** — `sample_config/rag/full.yaml`이 이미 100 라인을 넘는다. 분할이나 include 기능이 없다.

## 관련 페이지 (Related Pages)

- [[evaluations/]] 카테고리의 첫 페이지. 앞으로 RAGAS / Braintrust 같은 RAG 평가 프레임워크 자료가 들어오면 이 페이지와 교차 참조한다.
- [[hkuds-rag-anything]] — GraphRAG / LightRAG 등 그래프 기반 RAG. AutoRAG는 현재 그래프 인덱싱을 1급 노드로 두지 않아 서로 보완하는 관계다.
- [[applications/]] — 도메인 적용 사례 카테고리. AutoRAG로 최적화한 결과 페이지가 앞으로 이쪽으로 들어올 수 있다.

## 인용 (Citation)

```bibtex
@misc{kim2024autoragautomatedframeworkoptimization,
  title={AutoRAG: Automated Framework for optimization of Retrieval Augmented Generation Pipeline},
  author={Dongkyu Kim and Byoungwook Kim and Donggeon Han and Matouš Eibich},
  year={2024},
  eprint={2410.20878},
  archivePrefix={arXiv},
  primaryClass={cs.CL},
  url={https://arxiv.org/abs/2410.20878},
}
```

