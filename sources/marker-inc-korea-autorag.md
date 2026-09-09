---
title: "AutoRAG: Automated Framework for optimization of Retrieval Augmented Generation Pipeline"
type: repo
year: 2024
category: evaluations
raw_path: raw/repos/marker-inc-korea-autorag.md
raw_filename: "marker-inc-korea-autorag.md"
source_collection: external
org: "Marker-Inc-Korea"
repo: "AutoRAG"
url: "https://github.com/Marker-Inc-Korea/AutoRAG"
license: "Apache-2.0"
tags: [rag, automl, evaluation, pipeline-optimization, hybrid-retrieval, data-creation, repo]
figures:
  - id: fig01
    file: assets/marker-inc-korea-autorag/node_lines.png
    raw: https://raw.githubusercontent.com/Marker-Inc-Korea/AutoRAG/main/docs/source/_static/node_lines.png
    caption: "사용자 질의에서 답변까지 Query Expansion, Retrieval, Rerank, Passage Compressor, Prompt Maker, Generator 여섯 node가 이어지고 이를 Pre Retrieve, Retrieve, Post Retrieve 세 node line으로 묶은 구조도"
    strategy: manual
    curated: true
  - id: fig02
    file: assets/marker-inc-korea-autorag/full_yaml_structure.png
    raw: https://raw.githubusercontent.com/Marker-Inc-Korea/AutoRAG/main/docs/source/_static/yaml/full_yaml_structure.png
    caption: "sample_config 아래 rag 폴더의 트리 화면으로 english와 korean 하위 폴더와 extracted_sample.yaml, full.yaml 두 파일이 보인다"
    strategy: manual
    curated: true
  - id: fig03
    file: assets/marker-inc-korea-autorag/full_modules.png
    raw: https://raw.githubusercontent.com/Marker-Inc-Korea/AutoRAG/main/docs/source/_static/yaml/full_modules.png
    caption: "docs의 yaml/full_modules.png, 파일명으로 보아 전체 node와 module 목록 도식으로 추정되며 로컬 사본이 없어 내용은 확인하지 못했다"
    strategy: manual
    curated: false
  - id: fig04
    file: assets/marker-inc-korea-autorag/data_creation_pipeline.png
    raw: https://raw.githubusercontent.com/Marker-Inc-Korea/AutoRAG/main/docs/source/_static/data_creation_pipeline.png
    caption: "Raw Documents가 Parsing, Chunking, QA Creation 세 단계를 거쳐 Raw, Corpus, QA Data 세 산출물로 이어지는 Data Creation Process 도식"
    strategy: manual
    curated: true
  - id: fig05
    file: assets/marker-inc-korea-autorag/data_creation_schema.png
    raw: https://raw.githubusercontent.com/Marker-Inc-Korea/AutoRAG/main/docs/source/_static/qa/data_creation_schema.png
    caption: "Raw Document가 Parsing으로 Raw(파싱 결과), Chunk로 Corpus(청킹 결과), QA generation으로 QA가 되는 세 데이터 객체의 변환 순서도"
    strategy: manual
    curated: true
  - id: fig06
    file: assets/marker-inc-korea-autorag/rag_paradigms.png
    raw: https://raw.githubusercontent.com/Marker-Inc-Korea/AutoRAG/main/docs/source/_static/roadmap/RAG_paradigms.png
    caption: "docs의 roadmap/RAG_paradigms.png, 파일명으로 보아 RAG 패러다임 비교 도식으로 추정되며 로컬 사본이 없어 내용은 확인하지 못했다"
    strategy: manual
    curated: false
  - id: fig07
    file: assets/marker-inc-korea-autorag/advanced_rag.png
    raw: https://raw.githubusercontent.com/Marker-Inc-Korea/AutoRAG/main/docs/source/_static/roadmap/advanced_RAG.png
    caption: "docs의 roadmap/advanced_RAG.png, 파일명으로 보아 Advanced RAG 구조 도식으로 추정되며 로컬 사본이 없어 내용은 확인하지 못했다"
    strategy: manual
    curated: false
  - id: fig08
    file: assets/marker-inc-korea-autorag/score_fusion.png
    raw: https://raw.githubusercontent.com/Marker-Inc-Korea/AutoRAG/main/docs/source/_static/score_fusion.png
    caption: "BM25와 Vector Search 결과 각각에 최소 최대 점수 산출, Min-Max 정규화, 가중치 곱(예시 0.7과 0.3)을 적용한 뒤 Score Fusion으로 합쳐 Hybrid Result를 얻는 순서도"
    strategy: manual
    curated: true
  - id: fig09
    file: assets/marker-inc-korea-autorag/ndcg.png
    raw: https://raw.githubusercontent.com/Marker-Inc-Korea/AutoRAG/main/docs/source/_static/ndcg.png
    caption: "docs의 ndcg.png, 파일명으로 보아 nDCG 지표 설명 도식으로 추정되며 로컬 사본이 없어 내용은 확인하지 못했다"
    strategy: manual
    curated: false
  - id: fig10
    file: assets/marker-inc-korea-autorag/project_folders.png
    raw: https://raw.githubusercontent.com/Marker-Inc-Korea/AutoRAG/main/docs/source/_static/project_folders.png
    caption: "docs의 project_folders.png, 파일명으로 보아 프로젝트 폴더 구조 화면으로 추정되며 로컬 사본이 없어 내용은 확인하지 못했다"
    strategy: manual
    curated: false
  - id: fig11
    file: assets/marker-inc-korea-autorag/trial_summary.png
    raw: https://raw.githubusercontent.com/Marker-Inc-Korea/AutoRAG/main/docs/source/_static/trial_summary.png
    caption: "summary.csv 예시 화면으로 node line 세 개와 node 여섯 개 각각의 best_module_name, best_module_params, best_execution_time 열이 있다"
    strategy: manual
    curated: true
  - id: fig12
    file: assets/marker-inc-korea-autorag/web_interface.png
    raw: https://raw.githubusercontent.com/Marker-Inc-Korea/AutoRAG/main/docs/source/_static/web_interface.png
    caption: "docs의 web_interface.png, 파일명으로 보아 웹 인터페이스 화면으로 추정되며 로컬 사본이 없어 내용은 확인하지 못했다"
    strategy: manual
    curated: false
---

## 한 줄 요약 (One-line Summary)

AutoRAG는 사용자가 준비한 QA 데이터셋과 Corpus 데이터셋으로 여러 RAG module 조합을 자동 평가해 "내 데이터"와 "내 용도"에 맞는 RAG 파이프라인을 찾아주는 도구다. README는 스스로를 "RAG AutoML tool for automatically finding an optimal RAG pipeline for your data"로 소개한다.

## 1. 자료 정보 (Document Information)

- 원본 유형: GitHub 저장소 `Marker-Inc-Korea/AutoRAG`의 README. 커밋 0507ad0(2026-06-17)이 `raw/repos/`의 전체 클론을 README 스텁으로 바꿨으므로 현재 raw는 README 본문 한 편이다. 이 문서의 근거는 그 README와 `wiki/assets/marker-inc-korea-autorag/`에 남아 있는 docs 도식 6장으로 한정된다.
- 라이선스: frontmatter는 Apache-2.0으로 기록한다. README 본문에는 라이선스 조항 문장도 라이선스 배지도 없어 현재 raw로는 검증할 수 없다.
- 배포 형태: PyPI 패키지 `AutoRAG`. README는 Python 3.10 이상을 권장한다.
- 공식 문서: https://marker-inc-korea.github.io/AutoRAG/ (README가 "Document"로 안내하는 사이트. 내용은 raw에 없다)
- 인용 논문: Dongkyu Kim, Byoungwook Kim, Donggeon Han, Matouš Eibich. 2024. AutoRAG: Automated Framework for optimization of Retrieval Augmented Generation Pipeline. arXiv:2410.20878 (cs.CL). 논문 PDF는 이 wiki에 없다.
- README 상단 배지: PyPI 다운로드, LinkedIn, X, Hugging Face, Trendshift. 배지는 외부 이미지라 수치가 raw에 남아 있지 않다.

README의 목차(Index) 구성은 다음과 같다.

| 절 | 하위 항목 |
|---|---|
| Quick Install | 설치 명령 3종 |
| Data Creation | Parsing, Chunking, QA Creation |
| RAG Optimization | How AutoRAG optimizes RAG pipeline?, Metrics, Quick Start (Set YAML File, Run AutoRAG, Run Dashboard, Deploy your optimal RAG pipeline) |
| FaQ | Hardware Specs, Running AutoRAG, Tips/Tricks, TroubleShooting (모두 외부 링크) |

목차 밖에도 YouTube 튜토리얼, Hugging Face Space 3종, Colab 튜토리얼 3종, shoutout, Contributors, Contribution, Citation 절이 있다.

## 2. 주요 기여 (Key Contributions)

README가 제시하는 문제와 해법은 다음과 같다.

1. 문제 정의. RAG 파이프라인과 module은 많지만 어떤 조합이 "your own data"와 "your own use-case"에 맞는지 알 수 없다. 모든 RAG module을 만들어 평가하는 일은 시간이 많이 들고 어렵지만, 그렇게 하지 않으면 어떤 파이프라인이 최선인지 끝내 알 수 없다.
2. 자동 평가. 사용자가 가진 평가 데이터로 여러 RAG module을 자동 평가해 최적 파이프라인을 찾는다. README는 "many RAG module combinations"를 간단히 평가하는 방법을 제공한다고 적는다.
3. 3계층 YAML 설정. 설정 파일은 `node_lines`, `nodes`, `modules` 세 키로 중첩된다. node마다 `strategy.metrics`로 평가 지표를 지정하고 그 아래 module 목록을 붙인다.
4. 데이터 생성 포함. RAG 최적화에 필요한 QA 데이터셋과 Corpus 데이터셋을 Parsing, Chunking, QA Creation 세 단계로 만드는 코드가 같은 패키지에 들어 있다.
5. 결과 확인과 배포. trial 폴더의 `summary.csv`와 대시보드 명령으로 결과를 보고, 코드 호출, API 서버, 웹 인터페이스 세 가지 방식으로 최적 파이프라인을 바로 배포한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3-1. 설치

| 명령 | README가 적은 용도 |
|---|---|
| `pip install AutoRAG` | 기본 설치 |
| `pip install "AutoRAG[gpu]"` | 로컬 모델을 쓸 때 |
| `pip install "AutoRAG[gpu,parse]"` | parsing 기능까지 쓸 때 |

### 3-2. 두 종류의 데이터

RAG 최적화에는 QA 데이터셋(`qa.parquet`)과 Corpus 데이터셋(`corpus.parquet`)이 필요하다. README는 QA 데이터셋이 정확하고 신뢰할 수 있는 평가와 최적화에 중요하고, Corpus 데이터셋은 RAG가 문서를 검색해 답을 생성하는 데 쓰이므로 RAG 성능에 결정적이라고 적는다. 지원하는 parsing module과 chunking module 목록은 Notion 페이지 링크로만 안내한다.

### 3-3. Data Creation 세 단계

Parsing 단계의 설정 YAML은 `modules` 목록 아래 `module_type: langchain_parse`와 `parse_method: pdfminer`를 둔다. 코드는 `from autorag.parser import Parser` 뒤 `Parser(data_path_glob="your/data/path/*").start_parsing("parse_config.yaml")`이다. 여러 parse module을 한 번에 쓸 수 있지만, 그 경우 parsed 결과마다 새 프로세스로 실행해야 한다고 적혀 있다.

Chunking 단계의 YAML 예시는 `module_type: llama_index_chunk`, `chunk_method: Token`, `chunk_size: 1024`, `chunk_overlap: 24`, `add_file_name: en`이다. 코드는 `Chunker.from_parquet(parsed_data_path=...)` 뒤 `start_chunking("chunk_config.yaml")`이다. 여러 chunk module을 쓸 때는 corpus 하나로 QA를 만든 뒤 나머지 corpus를 그 QA 데이터에 매핑해야 한다. chunk method가 다르면 `retrieval_gt`가 달라지므로 QA 데이터셋에 다시 매핑해야 하기 때문이다.

QA Creation 단계는 README 코드 한 덩어리로 제시된다. 호출 순서는 다음과 같다.

| 순서 | 호출 | 역할 (README 주석과 이름 기준) |
|---|---|---|
| 1 | `Raw(raw_df)` | `parsed.parquet`을 읽은 DataFrame을 Raw 객체로 감싼다 |
| 2 | `Corpus(corpus_df, raw_instance)` | `corpus.parquet`을 Raw와 연결한 Corpus 객체로 만든다 |
| 3 | `corpus_instance.sample(random_single_hop, n=3)` | corpus에서 single hop 샘플을 뽑는다 (`n=3`) |
| 4 | `.map(lambda df: df.reset_index(drop=True))` | 인덱스를 재설정한다 |
| 5 | `.make_retrieval_gt_contents()` | retrieval 정답 passage의 본문을 채운다 |
| 6 | `.batch_apply(factoid_query_gen, llm=llm)` | query generation |
| 7 | `.batch_apply(make_basic_gen_gt, llm=llm)` | answer generation (basic) |
| 8 | `.batch_apply(make_concise_gen_gt, llm=llm)` | answer generation (concise) |
| 9 | `.filter(dontknow_filter_rule_based, lang="en")` | filter don't know |
| 10 | `initial_qa.to_parquet('./qa.parquet', './corpus.parquet')` | 두 parquet 파일로 저장한다 |

LLM은 `from llama_index.llms.openai import OpenAI` 뒤 `OpenAI()`로 만든다. README 코드의 import 경로는 다음과 같다.

| 심볼 | 모듈 경로 |
|---|---|
| `dontknow_filter_rule_based` | `autorag.data.qa.filter.dontknow` |
| `make_basic_gen_gt`, `make_concise_gen_gt` | `autorag.data.qa.generation_gt.llama_index_gen_gt` |
| `Raw`, `Corpus` | `autorag.data.qa.schema` |
| `factoid_query_gen` | `autorag.data.qa.query.llama_gen_query` |
| `random_single_hop` | `autorag.data.qa.sample` |

### 3-4. RAG Optimization의 설정 구조

README 예시 YAML은 "three retrieval nodes, prompt_maker, and generator nodes"를 쓰는 설정이다. 최상위 `node_lines` 목록의 각 항목은 `node_line_name`과 `nodes`를 갖고, node는 `node_type`, `strategy`, `top_k`(retrieval node만), `modules`를 갖는다. module은 `module_type`과 module별 파라미터다.

| node line | node_type | strategy.metrics | top_k | module_type | module 파라미터 |
|---|---|---|---|---|---|
| retrieve_node_line | lexical_retrieval | retrieval_f1, retrieval_recall, retrieval_ndcg, retrieval_mrr | 3 | bm25 | 없음 |
| retrieve_node_line | semantic_retrieval | 위와 같음 | 3 | vectordb | `vectordb: default` |
| retrieve_node_line | hybrid_retrieval | 위와 같음 | 3 | hybrid_rrf | `weight_range: (4,80)` |
| post_retrieve_node_line | prompt_maker | meteor, rouge, sem_score (`embedding_model: openai`) | 없음 | fstring | `prompt: "Read the passages and answer the given question. \n Question: {query} \n Passage: {retrieved_contents} \n Answer : "` |
| post_retrieve_node_line | generator | 위와 같음 | 없음 | openai_llm | `llm: gpt-4o-mini`, `batch: 16` |

README는 시작용으로 미리 만든 설정 YAML을 강하게 권하고, `sample_config/rag` 폴더와 Sample YAML Guide, Make Custom YAML Guide 문서를 링크한다. `hybrid_rrf`의 동작과 `weight_range`의 뜻은 README가 설명하지 않는다.

README는 node만 보여주는 구조도, 모든 node와 module을 보여주는 그림, 최적화 과정 gif를 외부 이미지로 싣지만 raw에는 링크만 남아 있다. 지원 node와 module 목록도 Notion 페이지 링크다. `wiki/assets`에 남은 docs 도식 node_lines.png(fig01)는 node line 3개(Pre Retrieve, Retrieve, Post Retrieve)와 node 6개(Query Expansion, Retrieval, Rerank, Passage Compressor, Prompt Maker, Generator)를 그린다. README 본문 예시에는 `retrieve_node_line`과 `post_retrieve_node_line` 두 node line만 나온다.

### 3-5. 평가 지표

README 예시에서 retrieval 계열 node 셋은 `retrieval_f1`, `retrieval_recall`, `retrieval_ndcg`, `retrieval_mrr` 네 지표를, `prompt_maker`와 `generator`는 `meteor`, `rouge`, `sem_score` 세 지표를 쓴다. `sem_score`에는 `embedding_model: openai`가 붙는다. README는 지표 설명을 Retrieval Metrics, Retrieval Token Metrics, Generation Metrics 세 항목으로 나눠 외부 링크로 안내하고, node별 지표를 정리한 그림 두 장도 외부 이미지로 싣는다. 지표의 정의와 계산식은 raw에 없다.

### 3-6. 실행과 결과 확인

Python에서는 `from autorag.evaluator import Evaluator` 뒤 `Evaluator(qa_data_path='qa.parquet', corpus_data_path='corpus.parquet').start_trial('config.yaml')`을 호출한다. CLI는 `autorag evaluate --config ... --qa_data_path ... --corpus_data_path ...`다. 실행이 끝나면 현재 디렉토리에 여러 파일과 폴더가 생기고, 숫자 이름(0 등)의 trial 폴더 안 `summary.csv`가 평가 결과와 최적 RAG 파이프라인을 요약한다. 폴더 구조 세부는 docs 링크로만 안내한다. 대시보드는 `autorag dashboard --trial_dir ...`로 띄우고, 샘플 대시보드 화면은 외부 이미지다.

docs 도식 trial_summary.png(fig11)가 보여주는 `summary.csv` 예시는 열 6개(node_line_name, node_type, best_module_filename, best_module_name, best_module_params, best_execution_time)와 행 6개다.

| node_line_name | node_type | best_module_filename | best_module_name | best_module_params | best_execution_time |
|---|---|---|---|---|---|
| pre_retrieve_node_line | query_expansion | 0.parquet | query_decompose | `{'llm': 'openai', 'temperature': 0.2}` | 1.133 |
| retrieve_node_line | retrieval | 0.parquet | bm25 | `{'top_k': 10}` | 0.0916 |
| retrieve_node_line | passage_reranker | 0.parquet | tart | `{'top_k': 5}` | 5.316 |
| retrieve_node_line | passage_compressor | 0.parquet | tree_summarize | `{'llm': 'openai', 'model': 'gpt-3.5-turbo-16k'}` | 0.408 |
| post_retrieve_node_line | prompt_maker | 0.parquet | fstring | `{'prompt': "Question: {query} \n Something to r` (화면에서 잘림) | 0.0000159 |
| post_retrieve_node_line | generator | 5.parquet | llama_index_llm | `{'llm': 'openai', 'model': 'gpt-3.5-turbo-1106'` (화면에서 잘림) | 0.472 |

best_execution_time의 단위는 도식에 표시되지 않는다. 도식의 node_type이 `retrieval` 하나인 반면 README 예시는 `lexical_retrieval`, `semantic_retrieval`, `hybrid_retrieval` 셋으로 나뉜다.

### 3-7. 배포

trial 폴더(대시보드에 쓴 0, 1, 2 같은 폴더)만 있으면 세 방식 중 어느 것으로든 최적 파이프라인을 실행한다.

| 방식 | 코드 또는 명령 |
|---|---|
| 코드 호출 | `from autorag.deploy import Runner` 뒤 `Runner.from_trial_folder('/trial_dir').run('your question')` |
| API 서버 | `nest_asyncio.apply()` 뒤 `ApiRunner.from_trial_folder('/trial_dir').run_api_server()`, 또는 `autorag run_api --trial_dir ... --host 0.0.0.0 --port 8000` |
| 웹 인터페이스 | `autorag run_web --trial_path ...` |

README는 `run_api` CLI가 extracted config YAML을 쓴다고 적고 그 절차는 docs tutorial의 "extract pipeline and evaluate test dataset" 절로 넘긴다. API endpoint 문서는 `./docs/source/deploy/api_endpoint.md`, 웹 인터페이스 문서는 `deploy/web.md`를 가리키는데 두 파일 모두 raw에 없다. 샘플 웹 인터페이스 화면은 외부 이미지다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

README에는 정량 결과가 없다. 벤치마크 점수, 다른 도구와의 비교, 실험 표가 하나도 실려 있지 않다. 이 도구의 산출물은 사용자가 자기 데이터로 실행해 얻는 `summary.csv`이고, 그 형식은 3-6절의 도식 예시로만 확인된다. 정량 실험은 Citation 절의 논문(arXiv:2410.20878)에 있을 수 있으나 그 논문은 wiki에 없다.

README가 싣는 외부 반응은 다음과 같다.

- LlamaIndex의 LinkedIn 포스트(회사 shoutout)
- Shubham Saboo, Kalyan KS 두 사람의 LinkedIn 포스트(개인 shoutout)
- Trendshift 배지와 PyPI 다운로드 배지 (수치는 raw에 없다)

튜토리얼과 데모는 YouTube 영상 1편(기본 음소거), Hugging Face Space 3종(Naive RAG Chatbot, AutoRAG Data Creation, AutoRAG RAG Pipeline Optimization), Colab 3종(Step 1 Basic of AutoRAG, Step 2 Data Creation, Step 3 Use Custom LLM & Embedding Model)이다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

README가 명시한 제약은 세 가지다.

- 여러 parse module을 한 번에 쓰면 parsed 결과마다 새 프로세스로 실행해야 한다.
- 여러 chunk module을 쓰면 corpus 하나로 QA를 만들고 나머지 corpus를 QA에 매핑해야 하며, chunk method가 다르면 `retrieval_gt`를 다시 매핑해야 한다.
- `run_api` CLI는 extracted config YAML이 필요해 별도 추출 절차를 거친다.

raw가 README 스텁이라 내부 구현 세부는 확인할 수 없다. 커밋 0507ad0이 삭제한 파일은 696개로, `autorag/` 패키지 소스 180개, `tests/` 271개, `docs/` 186개(docs 도식 포함), `sample_config/` 37개, `sample_dataset/` 5개, `.github/` 8개, 그리고 `LICENSE`, `README.md`, `pyproject.toml` 등 최상위 파일 9개다. 그래서 다음 항목은 README만으로 판단할 수 없다.

- 라이선스 조항 (frontmatter의 Apache-2.0은 README에서 검증 불가)
- 지원 parsing, chunking, node, module 목록과 지표 정의 (Notion 링크)
- trial 폴더 구조, API endpoint, 웹 인터페이스 세부 (docs 링크)
- `sample_config/rag` 안 YAML의 실제 내용 (fig02 도식은 폴더 트리만 보여준다)
- 하드웨어 요구 사항, 실행 팁, 문제 해결 (FaQ의 Notion과 Medium 링크)
- 한국어 처리 지원 여부 (README 본문에 언급이 없고 fig02의 `korean` 폴더명만 있다)
- 대시보드와 웹 인터페이스 화면 내용 (외부 이미지)

자료 안의 불일치도 하나 있다. README 예시의 retrieval node_type은 `lexical_retrieval`, `semantic_retrieval`, `hybrid_retrieval` 셋인데 docs 도식 fig11의 node_type은 `retrieval` 하나다. 도식이 이전 버전의 화면으로 보이지만 날짜 정보가 없어 단정할 수 없다.

## 6. 관련 연구 (Related Work)

- 논문 arXiv:2410.20878. README Citation 절의 bibtex가 가리키는 같은 이름의 논문이다. wiki에 없다.
- LlamaIndex. README의 QA 생성 코드가 `llama_index.llms.openai.OpenAI`를 쓰고 chunk module 이름이 `llama_index_chunk`다. fig11의 generator module 이름도 `llama_index_llm`이다. LlamaIndex의 LinkedIn 포스트가 shoutout 절에 실려 있다.
- LangChain. parse module 이름이 `langchain_parse`다.
- Hugging Face. Space 3종과 조직 페이지 링크가 있다.
- wiki 안에서는 [[evaluations/kim-2026-ai-prd-eval-plan]]과 [[agents/seans-ai-stories-2026-agent-harness-loop-engineering]]이 이 페이지를 역링크한다.

## 7. 용어집 (Glossary)

- node line: 설정 YAML 최상위 `node_lines` 목록의 한 항목. `node_line_name`과 `nodes`를 갖는다. README 예시에는 `retrieve_node_line`과 `post_retrieve_node_line`, docs 도식에는 `pre_retrieve_node_line`까지 셋이 있다.
- node: `node_type`으로 역할을 정하고 `strategy`, `top_k`, `modules`를 갖는 설정 단위. README 예시의 node_type은 lexical_retrieval, semantic_retrieval, hybrid_retrieval, prompt_maker, generator다.
- module: node 아래 `module_type`과 파라미터로 지정하는 구현 후보. 예시는 bm25, vectordb, hybrid_rrf, fstring, openai_llm이다.
- strategy: node마다 붙는 블록으로, README 예시에서는 `metrics` 키만 쓴다.
- top_k: retrieval 계열 node에 붙는 파라미터. README 예시는 셋 다 3이다.
- QA 데이터셋: `qa.parquet`. 평가와 최적화에 쓰는 질문과 정답 데이터.
- Corpus 데이터셋: `corpus.parquet`. RAG가 검색하는 문서 조각 모음.
- retrieval_gt: QA 데이터가 가리키는 retrieval 정답. chunk method가 바뀌면 다시 매핑해야 한다.
- trial 폴더: `start_trial` 한 번의 결과 폴더. 이름은 0, 1, 2 같은 숫자다.
- summary.csv: trial 폴더 안에서 평가 결과와 최적 파이프라인을 요약한 파일.
- extracted config YAML: `run_api` CLI가 쓰는 설정 파일. 추출 절차는 docs로 넘긴다.
- dontknow filter: 생성한 QA에서 "모른다"류 답을 제거하는 규칙 기반 필터 (`dontknow_filter_rule_based`).

## 8. 그림 후보 (Figure Candidates)

repos 규칙상 별도 `-figures/` 디렉토리를 만들지 않고 GitHub raw URL을 `raw` 필드에 기록한다. 12개 파일은 모두 커밋 0507ad0 이전 클론의 `docs/source/_static/` 아래에 실재했음을 git 이력으로 확인했다. README 본문이 직접 싣는 이미지는 GitHub user-attachments 호스팅이라 별개이며, rule #1에 따라 내려받지 않았다.

여섯 장(fig01, fig02, fig04, fig05, fig08, fig11)은 `wiki/assets/marker-inc-korea-autorag/`에 로컬 사본이 있어 실제 이미지를 열어 caption을 썼다. 나머지 여섯 장은 로컬 사본이 없고 README에도 등장하지 않아 파일명 이외의 정보가 없다.

| id | file | 근거 | strategy | 추천 |
|---|---|---|---|---|
| fig01 | docs/source/_static/node_lines.png | 로컬 사본 판독 | manual | ★ wiki 권장 (architecture 핵심) |
| fig02 | docs/source/_static/yaml/full_yaml_structure.png | 로컬 사본 판독 (내용은 sample_config/rag 폴더 트리) | manual | ★ wiki 권장 (architecture) |
| fig03 | docs/source/_static/yaml/full_modules.png | 파일명만 | manual | ★ wiki 권장 (capabilities) |
| fig04 | docs/source/_static/data_creation_pipeline.png | 로컬 사본 판독 | manual | ★ wiki 권장 (method) |
| fig05 | docs/source/_static/qa/data_creation_schema.png | 로컬 사본 판독 | manual | ★ wiki 권장 (data) |
| fig06 | docs/source/_static/roadmap/RAG_paradigms.png | 파일명만 | manual | (선택) 배경/맥락 |
| fig07 | docs/source/_static/roadmap/advanced_RAG.png | 파일명만 | manual | (선택) |
| fig08 | docs/source/_static/score_fusion.png | 로컬 사본 판독 | manual | ★ wiki 권장 (technique) |
| fig09 | docs/source/_static/ndcg.png | 파일명만 | manual | (선택) 메트릭 대표 |
| fig10 | docs/source/_static/project_folders.png | 파일명만 | manual | (선택) 운영 |
| fig11 | docs/source/_static/trial_summary.png | 로컬 사본 판독 | manual | ★ wiki 권장 (result) |
| fig12 | docs/source/_static/web_interface.png | 파일명만 | manual | (선택) |
