---
title: "AutoRAG: Automated Framework for optimization of Retrieval Augmented Generation Pipeline"
type: repo
year: 2024
category: evaluations
raw_path: /Users/kmyu/Desktop/project/ai-wiki/raw/repos/marker-inc-korea-autorag
raw_filename: "marker-inc-korea-autorag/"
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
  - id: fig03
    file: assets/marker-inc-korea-autorag/full_modules.png
    raw: raw/repos/marker-inc-korea-autorag/docs/source/_static/yaml/full_modules.png
    caption: "AutoRAG가 지원하는 전체 Node × Module 매트릭스"
    strategy: manual
    curated: false
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
  - id: fig06
    file: assets/marker-inc-korea-autorag/rag_paradigms.png
    raw: raw/repos/marker-inc-korea-autorag/docs/source/_static/roadmap/RAG_paradigms.png
    caption: "Naive RAG → Advanced RAG → Modular RAG 패러다임 진화 (로드맵)"
    strategy: manual
    curated: false
  - id: fig07
    file: assets/marker-inc-korea-autorag/advanced_rag.png
    raw: raw/repos/marker-inc-korea-autorag/docs/source/_static/roadmap/advanced_RAG.png
    caption: "Advanced RAG 다이어그램 — pre/post-retrieval 노드 라인 도입"
    strategy: manual
    curated: false
  - id: fig08
    file: assets/marker-inc-korea-autorag/score_fusion.png
    raw: raw/repos/marker-inc-korea-autorag/docs/source/_static/score_fusion.png
    caption: "Hybrid Retrieval의 score fusion (RRF / CC normalize) 개념도"
    strategy: manual
    curated: true
  - id: fig09
    file: assets/marker-inc-korea-autorag/ndcg.png
    raw: raw/repos/marker-inc-korea-autorag/docs/source/_static/ndcg.png
    caption: "Retrieval 평가지표 nDCG 개념"
    strategy: manual
    curated: false
  - id: fig10
    file: assets/marker-inc-korea-autorag/project_folders.png
    raw: raw/repos/marker-inc-korea-autorag/docs/source/_static/project_folders.png
    caption: "Trial / project 폴더 구조 — 0, 1, 2, ... 시도별 결과와 summary.csv"
    strategy: manual
    curated: false
  - id: fig11
    file: assets/marker-inc-korea-autorag/trial_summary.png
    raw: raw/repos/marker-inc-korea-autorag/docs/source/_static/trial_summary.png
    caption: "Trial summary CSV — 노드별 최적 모듈 / 메트릭 점수가 정리된 결과"
    strategy: manual
    curated: true
  - id: fig12
    file: assets/marker-inc-korea-autorag/web_interface.png
    raw: raw/repos/marker-inc-korea-autorag/docs/source/_static/web_interface.png
    caption: "최적 파이프라인을 Gradio 웹 인터페이스로 배포한 모습"
    strategy: manual
    curated: false
---

## 한 줄 요약 (One-line Summary)

AutoRAG는 사용자가 가진 QA·Corpus 평가 데이터에서 RAG 파이프라인의 노드별 모듈 조합을 그리드 서치로 자동 평가·비교하여 **"내 데이터에 가장 잘 맞는 RAG"** 를 찾아주는 RAG AutoML / 최적화 프레임워크다.

## 1. 자료 정보 (Document Information)

- **원본 유형**: GitHub 오픈소스 레포 (`Marker-Inc-Korea/AutoRAG`)
- **라이선스**: Apache License 2.0
- **언어/스택**: Python 3.10+, LlamaIndex·LangChain 어댑터 채택, CLI (`autorag`) 제공
- **공식 페이지**: <https://marker-inc-korea.github.io/AutoRAG/> · PyPI 패키지 `AutoRAG`
- **인용 논문**: Kim et al., 2024. *AutoRAG: Automated Framework for optimization of Retrieval Augmented Generation Pipeline.* arXiv:2410.20878
- **이 wiki에 들어온 경로**: `git clone --depth 1` 으로 `raw/repos/marker-inc-korea-autorag/`에 스냅샷 저장 (2026-06-10 ingest 시점)

### 디렉토리 트리 (요약)

```
AutoRAG/
├── autorag/                    # 본체 패키지
│   ├── evaluator.py            # 핵심: Evaluator (trial 실행/결과 수집)
│   ├── parser.py               # 1단계: Parsing
│   ├── chunker.py              # 2단계: Chunking
│   ├── node_line.py            # Node Line 실행 엔진
│   ├── strategy.py             # Strategy(metric/speed_threshold) 적용
│   ├── nodes/
│   │   ├── queryexpansion/     # query_decompose, hyde, multi_query_expansion
│   │   ├── lexicalretrieval/   # bm25 (porter / ko_kiwi / ko_okt / ko_kkma / sudachipy 토크나이저)
│   │   ├── semanticretrieval/  # vectordb 기반
│   │   ├── hybridretrieval/    # hybrid_rrf, hybrid_cc
│   │   ├── passageaugmenter/   # prev_next_augmenter
│   │   ├── passagereranker/    # 15+ reranker (cohere/jina/colbert/monot5/voyageai/...)
│   │   ├── passagefilter/      # similarity_threshold, percentile, recency
│   │   ├── passagecompressor/  # token-level 압축
│   │   ├── promptmaker/        # fstring 등
│   │   └── generator/          # openai_llm, llama_index_llm
│   ├── data/qa/                # QA 생성 (query/answer_gen, dontknow_filter)
│   ├── vectordb/               # chroma, milvus, pinecone, qdrant, weaviate, couchbase
│   ├── evaluation/             # retrieval / generation / retrieval_contents 메트릭
│   ├── deploy/                 # Runner / ApiRunner / Gradio
│   └── dashboard.py            # 결과 대시보드
├── sample_config/rag/          # full.yaml · english/korean × gpu/gpu_api/non_gpu
├── sample_dataset/             # eli5, hotpotqa, msmarco, triviaqa
└── docs/source/                # Sphinx 문서
```

## 2. 주요 기여 (Key Contributions)

1. **RAG에 AutoML을 적용한 초기 오픈소스 도구.** 평가 데이터셋과 YAML 한 장만 있으면 수십 개 모듈 조합을 자동 평가하고 노드별 최적 모듈을 골라낸다.
2. **Node × Module 추상화로 RAG를 모듈화.** `Node Line → Node → Module` 3계층 트리. Node는 같은 역할(예: lexical retrieval)을 맡는 Module들의 swap container, Node Line은 실행 순서. YAML에서 새 Module을 추가하거나 빼면 그대로 실험이 확장된다.
3. **Strategy 기반 선택.** Node마다 `metrics`(retrieval_f1·recall·ndcg·mrr·map / meteor·rouge·sem_score 등)와 `speed_threshold`를 두어 정확도와 속도 trade-off를 명시적으로 표현.
4. **데이터 생성까지 포함한 풀스택.** Parsing(pdfminer, llama_parse 등) → Chunking(llama_index/langchain) → QA Generation(factoid query gen, basic/concise gen_gt, dontknow filter) 까지 동일한 YAML 패턴으로 다룬다.
5. **한국어 RAG에 친화적.** BM25 토크나이저로 `ko_kiwi / ko_okt / ko_kkma / sudachipy`를 기본 제공. `sample_config/rag/korean/`에 GPU/non-GPU 시나리오별 baseline을 갖춰둔다.
6. **배포까지 일원화.** 가장 좋은 trial 폴더를 `Runner` / `ApiRunner` / Gradio 웹UI 어느 형태로든 즉시 서빙. CLI: `autorag run_api` / `autorag run_web`.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3-1. 3계층 모델 — Node Line / Node / Module

| 계층 | 정의 | 예 |
|---|---|---|
| Node Line | Node들의 순서 묶음 (실행 파이프라인) | `pre_retrieve_node_line`, `retrieve_node_line`, `post_retrieve_node_line` |
| Node | 같은 역할을 하는 Module들의 swap container + 공통 파라미터(`top_k`, `strategy.metrics`, ...) | `lexical_retrieval`, `semantic_retrieval`, `hybrid_retrieval`, `passage_reranker`, `prompt_maker`, `generator` |
| Module | 실제 알고리즘 구현 + 자체 파라미터 (튜플/리스트로 그리드 정의) | `bm25` (with tokenizer grid), `vectordb`, `hybrid_rrf(weight_range=(4,80))`, `monot5`, `colbert_reranker`, `openai_llm(model=gpt-4o-mini)` |

### 3-2. Strategy — 노드별 최적화 정책

각 Node에는 `strategy` 블록이 붙는다.

```yaml
- node_type: hybrid_retrieval
  strategy:
    metrics: [ retrieval_f1, retrieval_recall, retrieval_ndcg, retrieval_mrr ]
    speed_threshold: 10        # 10초 이상 걸리는 모듈은 제외
  top_k: 10
  modules: [...]
```

- `metrics`로 평가축을 정한다. Node가 retrieval이면 retrieval_*, generator면 meteor/rouge/sem_score.
- `speed_threshold` (옵션) — 너무 느린 모듈을 컷오프.
- Node마다 독립적으로 다른 metric을 줄 수 있다. RAG는 본디 다목적 최적화이므로 노드 단위 의사결정이 알맞다.

### 3-3. 그리드 서치 의미

같은 module 안에서 파라미터를 리스트나 튜플로 주면 자동으로 곱집합 실험이 된다.

```yaml
- module_type: hybrid_cc
  normalize_method: [ mm, tmm, z, dbsf ]     # 4 가지
  weight_range: (0.0, 1.0)
  test_weight_size: 101                       # 가중치 101 포인트 스캔
```

→ 한 노드 안에서 모듈/파라미터 곱집합이 평가되고, **`summary.csv`** 에 노드별 winner가 기록된다.

### 3-4. 실행 흐름 (Evaluator)

```python
from autorag.evaluator import Evaluator

ev = Evaluator(qa_data_path="qa.parquet", corpus_data_path="corpus.parquet")
ev.start_trial("config.yaml")
```

- `Evaluator.start_trial` 이 trial 폴더(0, 1, 2, …)를 만든 뒤 `node_line.run_node_line` 으로 각 Node Line을 순차 실행한다.
- BM25 인덱스는 `bm25_ingest`로, 임베딩 인덱스는 `vectordb_ingest_*`로 사전 준비.
- 결과는 노드별 결과 parquet과 통합 `summary.csv`로 누적.

### 3-5. 데이터 생성 파이프라인 (Data Creation)

```
Raw docs → Parser (langchain_parse/pdfminer/llama_parse) → parsed.parquet
       → Chunker (llama_index_chunk Token/Sentence/Semantic) → corpus.parquet
       → corpus.sample(random_single_hop) → make_retrieval_gt_contents
       → factoid_query_gen (LLM)
       → make_basic_gen_gt + make_concise_gen_gt (LLM)
       → dontknow_filter_rule_based → qa.parquet
```

- `Raw → Corpus → QA`는 모두 `autorag.data.qa.schema`의 동일 wrapper 위에서 동작 → `.batch_apply()` 체이닝으로 LLM 호출이 일괄화된다.
- 여러 chunk 방식을 비교하려면 corpus를 여러 개 만들고 `retrieval_gt`를 다시 매핑해야 한다는 점이 README에 적혀 있다 (chunking이 retrieval_gt에 영향).

### 3-6. 배포 (Deploy)

3가지 모드 모두 trial 폴더만 있으면 곧바로 띄운다:

```python
from autorag.deploy import Runner, ApiRunner

Runner.from_trial_folder("...").run("질문")          # 코드 호출
ApiRunner.from_trial_folder("...").run_api_server()  # REST API
```

CLI도 동일: `autorag run_api --trial_dir ... --port 8000`, `autorag run_web --trial_path ...`.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

- 본 README와 docs에 정량 수치 표는 거의 없고, 대신 **사용자가 자체 데이터로 측정한 결과를 신뢰할 수 있게 만드는 인프라**가 결과물이다.
- 동봉된 평가 데이터셋: ELI5, HotpotQA, MS MARCO, TriviaQA (`sample_dataset/`) — baseline 실험용.
- 정량 벤치마크는 동봉 논문(arXiv:2410.20878)에 따로 실려 있다.
- 운영 측면 결과:
  - HuggingFace Spaces 3종(데이터 생성·파이프라인 최적화·Naive RAG 챗봇) 제공.
  - Colab 튜토리얼 3종(기본/데이터 생성/커스텀 LLM 임베딩).
  - Trendshift 추천 레포지토리 등재.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **그리드 서치 비용**: 모듈/파라미터 곱집합이 커지면 평가 비용(특히 LLM 호출)이 폭증한다 → `speed_threshold` 와 사전 `validate` 단계로 완화하지만 한계는 남는다.
- **chunking 비교가 무겁다.** chunk 방식이 다르면 `retrieval_gt`가 달라져 corpus를 새로 만들고 다시 매핑해야 한다 — 사용자 입장에서 직관과 어긋난다.
- **Node Line 토폴로지 고정.** 현재는 sequential. 문서에 "merge / split / loop"를 향후 지원하겠다는 로드맵이 있으나 미구현. Modular RAG(2024 흐름)으로 가려면 필요한 능력이다.
- **베이스 의존성이 무겁다.** llama-index / langchain / vector DB 클라이언트 / reranker 라이브러리 등 광범위 의존 → CI/배포에서 dependency conflict가 잦은 영역.
- **YAML이 커지면 가독성이 떨어진다.** `sample_config/rag/full.yaml`이 이미 100+ 라인. 분할/include 기능이 없다.

## 6. 관련 연구 (Related Work)

- **RAGAS** — RAG 평가지표(faithfulness, context precision/recall, answer relevance). AutoRAG가 retrieval_* 지표 측에서 직접 구현해 쓰는 평가축과 상보적.
- **LlamaIndex / LangChain** — AutoRAG는 두 프레임워크의 retriever·LLM·parser 어댑터를 내부 모듈로 호출한다. 두 생태계 위에 얹은 메타 도구인 셈이다.
- **Modular RAG (Gao 2024)** — Node Line 개념의 학술 배경. AutoRAG 로드맵이 명시적으로 인용한다.
- **Hybrid Retrieval (RRF, CC normalization)** — `hybrid_rrf`·`hybrid_cc(normalize_method: mm/tmm/z/dbsf)`로 구현체를 제공한다.
- **GraphRAG / LightRAG** — 같은 wiki의 [[hkuds-rag-anything]] 등 그래프 기반 RAG와는 보완 관계. AutoRAG는 현재 그래프 인덱싱을 1급 노드로 두지 않는다.

## 7. 용어집 (Glossary)

- **Node Line**: 노드들의 묶음. 실행 파이프라인의 단위. 예: pre_retrieve, retrieve, post_retrieve.
- **Node**: 같은 역할의 Module들의 swap container. 공통 파라미터(top_k, metrics)를 가짐.
- **Module**: 실제 알고리즘 구현체. 예: bm25, vectordb, hybrid_rrf, monot5, openai_llm.
- **Strategy**: 노드의 최적화 정책. 어떤 metric으로 평가할지, speed_threshold가 있는지.
- **Trial**: 한 번의 `start_trial()` 실행 결과 폴더. 폴더명은 0, 1, 2, ... 자동 증가.
- **summary.csv**: trial 폴더 안의 최종 결과 표. 각 노드별 best module과 점수.
- **retrieval_gt**: QA 데이터의 정답 passage id 매핑. chunking이 바뀌면 재매핑 필요.
- **qa.parquet / corpus.parquet**: 평가 데이터의 표준 포맷. 모든 모듈이 이 두 파일을 입력으로 받음.
- **dontknow_filter_rule_based**: QA 자동 생성 후 "모르겠다" 류 응답을 제거하는 룰 기반 필터.
- **hybrid_rrf / hybrid_cc**: lexical + semantic 결과를 합치는 두 방식 — Reciprocal Rank Fusion / Convex Combination(점수 정규화 후 가중합).

## 8. 그림 후보 (Figure Candidates)

| id | source | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | `docs/source/_static/node_lines.png` | Node Line 구조 다이어그램 | manual | ★ wiki 권장 (architecture 핵심) |
| fig02 | `docs/source/_static/yaml/full_yaml_structure.png` | YAML 3계층 트리 | manual | ★ wiki 권장 (architecture) |
| fig03 | `docs/source/_static/yaml/full_modules.png` | Node × Module 매트릭스 | manual | ★ wiki 권장 (capabilities) |
| fig04 | `docs/source/_static/data_creation_pipeline.png` | Data Creation 파이프라인 | manual | ★ wiki 권장 (method) |
| fig05 | `docs/source/_static/qa/data_creation_schema.png` | QA / Corpus 스키마 | manual | ★ wiki 권장 (data) |
| fig06 | `docs/source/_static/roadmap/RAG_paradigms.png` | Naive→Advanced→Modular RAG 진화 | manual | (선택) 배경/맥락 |
| fig07 | `docs/source/_static/roadmap/advanced_RAG.png` | Advanced RAG 다이어그램 | manual | (선택) |
| fig08 | `docs/source/_static/score_fusion.png` | Hybrid 융합 (RRF/CC) | manual | ★ wiki 권장 (technique) |
| fig09 | `docs/source/_static/ndcg.png` | nDCG 메트릭 개념 | manual | (선택) 메트릭 대표 |
| fig10 | `docs/source/_static/project_folders.png` | Trial 폴더 구조 | manual | (선택) 운영 |
| fig11 | `docs/source/_static/trial_summary.png` | Trial summary CSV 화면 | manual | ★ wiki 권장 (result) |
| fig12 | `docs/source/_static/web_interface.png` | Gradio 웹 배포 화면 | manual | (선택) |

> 참고: README 본문의 "Image"(GitHub user-attachments) 들은 **외부 호스팅 URL**이라 rule #1(웹 fetch 금지)에 따라 로컬에 내려받지 않았다. 위 fig01–fig12는 모두 `docs/source/_static/` 안의 in-repo 자산이다.
