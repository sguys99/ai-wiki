---
title: "RAG-Anything: All-in-One RAG Framework (HKUDS, GitHub repo)"
type: repo
year: 2025
category: database
raw_path: raw/repos/hkuds-rag-anything.md
raw_filename: "hkuds-rag-anything.md"
source_collection: external
org: "HKUDS"
repo: "RAG-Anything"
url: "https://github.com/HKUDS/RAG-Anything"
license: "MIT"
tags: [multimodal-rag, rag, knowledge-graph, lightrag, mineru, docling, paddleocr, repo, oss]
figures:
  - id: fig01
    label: System Overview figure
    kind: figure
    file: assets/hkuds-rag-anything/fig01.png
    raw: https://github.com/HKUDS/RAG-Anything/blob/main/assets/rag_anything_framework.png
    caption: "README System Overview 절이 싣는 RAG-Anything 전체 프레임워크 개요도"
    strategy: manual
    curated: false
---

## 한 줄 요약 (One-line Summary)

HKUDS의 RAG-Anything은 LightRAG 위에 세운 all-in-one multimodal RAG 프레임워크로, PDF와 Office 문서와 이미지와 텍스트를 MinerU, Docling, PaddleOCR 가운데 하나로 파싱해 텍스트와 이미지와 표와 수식을 같은 knowledge graph 인덱스에 올린 뒤 하나의 질의 인터페이스로 답한다.

## 1. 자료 정보 (Document Information)

- **Org / Repo**: `HKUDS/RAG-Anything`
- **PyPI 패키지**: `raganything`. README 배지가 Python 3.10을 표시한다.
- **Based on**: [LightRAG](https://github.com/HKUDS/LightRAG). README 상단 배지와 System Overview 절이 모두 "built on LightRAG"를 명시한다.
- **동반 기술 보고서**: arXiv [2510.12323](https://arxiv.org/abs/2510.12323). README News 2025.10 항목이 "technical report of RAG-Anything"을 공개했다고 적는다.
- **인용 정보**: BibTeX 키 `guo2025raganythingallinoneragframework`, 저자 Zirui Guo, Xubin Ren, Lingrui Xu, Jiahao Zhang, Chao Huang, primaryClass `cs.AI`.
- **커뮤니티 창구**: Discord 초대 링크, WeChat 그룹(issue 7), 중국어 README(`README_zh.md`), Trendshift 배지(repositories/14959), pepy 다운로드 배지.
- **라이선스**: 수집된 raw 파일의 frontmatter가 `license: "MIT"`로 적는다. 다만 README 본문에는 라이선스 조항이나 `LICENSE` 파일 언급이 한 번도 등장하지 않는다.

### 자료 범위에 관한 주의

`raw/repos/hkuds-rag-anything.md`는 저장소 전체 클론이 아니라 README 한 편이다. 2026-06-17 커밋 `0507ad0`이 클론 디렉토리를 README 스텁으로 바꾸면서 `raganything/` 소스 19개 모듈, `examples/` 13개 스크립트, `tests/`, `reproduce/`, `docs/` 6편, `pyproject.toml`, `LICENSE`가 함께 사라졌다. 따라서 이 요약은 README가 문서화한 공개 인터페이스까지만 다루고, 내부 클래스 구성이나 테스트 커버리지는 근거가 없어 서술하지 않는다.

### News 타임라인 (README 기준)

| 날짜 | 내용 |
|---|---|
| 2026.06 | LightRAG가 RAG-Anything을 native integration하는 방식으로 multimodal RAG를 지원하게 됐다 |
| 2025.10 | 기술 보고서 arXiv 2510.12323 공개 |
| 2025.08 | VLM-Enhanced Query 모드 추가. 문서에 이미지가 있으면 VLM에 함께 넘겨 시각과 텍스트 컨텍스트를 결합한다 |
| 2025.07 | context configuration module 추가 (`docs/context_aware_processing.md`) |
| 2025.07 | multimodal query 기능 추가 (텍스트, 이미지, 표, 수식) |
| 2025.07 | GitHub star 1,000개 도달 |

2026.06 항목은 방향이 뒤집힌 소식이다. RAG-Anything이 LightRAG를 가져다 쓰는 관계에서, LightRAG가 RAG-Anything을 품어 multimodal 기능을 얻는 관계가 추가됐다.

## 2. 주요 기여 (Key Contributions)

README의 Key Features 절이 일곱 항목을 든다.

| 항목 | README 서술 |
|---|---|
| End-to-End Multimodal Pipeline | 문서 수집과 파싱부터 multimodal 질의 응답까지 하나의 워크플로로 잇는다 |
| Universal Document Support | PDF, Office 문서, 이미지, 그 밖의 형식을 함께 처리한다 |
| Specialized Content Analysis | 이미지, 표, 수식, 그 밖의 이질적 콘텐츠마다 전용 처리기를 둔다 |
| Multimodal Knowledge Graph | entity 추출과 cross-modal 관계 발견을 자동으로 수행한다 |
| Adaptive Processing Modes | MinerU 기반 파싱과 multimodal 콘텐츠 직접 주입 가운데 선택한다 |
| Direct Content List Insertion | 외부에서 이미 파싱한 content list를 파싱 단계를 건너뛰고 바로 넣는다 |
| Hybrid Intelligent Retrieval | 텍스트와 multimodal 콘텐츠를 함께 훑는 retrieval을 제공한다 |

README가 스스로 내세우는 위치는 "여러 전용 도구를 따로 쓸 필요를 없애는" 통합 프레임워크다. 겨냥하는 곳으로는 학술 연구, 기술 문서, 재무 보고서, 기업 지식 관리를 든다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

README는 파이프라인을 문서 파싱, 콘텐츠 분석, knowledge graph, 지능형 retrieval 네 단계 흐름도로 요약한 뒤 다섯 절로 나눠 설명한다.

### 3.1 다섯 단계

| 단계 | README 명칭 | 하는 일 |
|---|---|---|
| 1 | Document Parsing Stage | MinerU로 문서 구조를 고정밀 추출하고, 이질적 요소를 텍스트 블록, 시각 요소, 표, 수식으로 분해하면서 문맥 관계를 보존한다 |
| 2 | Multi-Modal Content Understanding and Processing | 콘텐츠 종류를 자동 판별해 최적 경로로 보내고, 텍스트 파이프라인과 multimodal 파이프라인을 동시에 실행하며, 원본 문서 계층을 유지한다 |
| 3 | Multimodal Analysis Engine | modality를 아는 처리 단위 네 종을 배치한다 |
| 4 | Multimodal Knowledge Graph Index | 문서 콘텐츠를 구조화된 의미 표현으로 바꾸고 관계에 가중치를 부여한다 |
| 5 | Modality-Aware Retrieval | 벡터 유사도와 그래프 순회를 결합하고 modality를 반영해 순위를 조정한다 |

### 3.2 분석 엔진 네 종

| 처리 단위 | 대상 | README 서술 |
|---|---|---|
| Visual Content Analyzer | 이미지 | vision model을 붙여 이미지를 분석하고, 시각 의미에 근거한 문맥 인식 캡션을 만들며, 시각 요소 사이의 공간 관계와 계층 구조를 뽑는다 |
| Structured Data Interpreter | 표 | 표 형식 데이터를 체계적으로 해석하고, 통계 패턴 인식으로 추세를 분석하며, 여러 표 사이의 의미 관계와 의존을 식별한다 |
| Mathematical Expression Parser | 수식 | 복잡한 수식을 높은 정확도로 파싱하고, LaTeX 형식을 기본 지원하며, 수식과 도메인 지식 사이의 개념 대응을 만든다 |
| Extensible Modality Handler | 사용자 정의 | 새 콘텐츠 유형을 위한 설정 가능한 처리 틀을 제공하고, plugin 구조로 새 처리기를 붙이며, 실행 시점에 파이프라인 구성을 바꾼다 |

### 3.3 knowledge graph 인덱스의 네 기능

| 기능 | 내용 |
|---|---|
| Multi-Modal Entity Extraction | 의미 있는 multimodal 요소를 knowledge graph의 entity로 바꾸고 의미 주석과 메타데이터를 함께 보존한다 |
| Cross-Modal Relationship Mapping | 텍스트 entity와 multimodal 구성 요소 사이의 의미 연결을 관계 추론으로 세운다 |
| Hierarchical Structure Preservation | `belongs_to` 관계 사슬로 원래 문서 구성과 절 사이의 의존을 유지한다 |
| Weighted Relationship Scoring | 의미 근접도와 문서 안에서의 문맥 중요도를 근거로 관계 유형마다 정량 점수를 준다 |

### 3.4 retrieval의 세 기전

| 기전 | 내용 |
|---|---|
| Vector-Graph Fusion | 벡터 유사도 탐색과 그래프 순회를 함께 써서 의미 임베딩과 구조 관계를 동시에 활용한다 |
| Modality-Aware Ranking | 질의가 선호하는 modality에 따라 결과 가중치를 조정하는 적응형 점수 계산을 넣는다 |
| Relational Coherence Maintenance | 검색된 요소 사이의 의미 관계와 구조 관계를 유지해 문맥 일관성을 지킨다 |

### 3.5 공개 API

README가 코드 예제로 문서화하는 진입점은 `from raganything import RAGAnything, RAGAnythingConfig`다.

```python
config = RAGAnythingConfig(
    working_dir="./rag_storage",
    parser="mineru",          # mineru | docling | paddleocr
    parse_method="auto",      # auto | ocr | txt
    enable_image_processing=True,
    enable_table_processing=True,
    enable_equation_processing=True,
)
rag = RAGAnything(config=config,
                  llm_model_func=...,      # 예제는 gpt-4o-mini
                  vision_model_func=...,   # 예제는 gpt-4o
                  embedding_func=EmbeddingFunc(embedding_dim=3072, max_token_size=8192, ...))
await rag.process_document_complete(file_path="document.pdf", output_dir="./output", parse_method="auto")
```

질의는 세 가지로 문서화된다.

| 방식 | 호출 | 특징 |
|---|---|---|
| Pure Text Query | `aquery(q, mode="hybrid")` | LightRAG의 `hybrid`, `local`, `global`, `naive` 모드를 그대로 받는다. 동기 버전 `rag.query(q, mode=...)`도 있다 |
| VLM Enhanced Query | `aquery(q, mode="hybrid", vlm_enhanced=True)` | 별도 메서드가 아니라 `aquery`의 인자다. `vision_model_func`가 주어지면 자동으로 켜지고, `vlm_enhanced=False`로 강제로 끌 수 있다 |
| Multimodal Query | `aquery_with_multimodal(q, multimodal_content=[...], mode="hybrid")` | 표나 수식을 질의에 첨부한다. `type: "table"`이면 `table_data`와 `table_caption`, `type: "equation"`이면 `latex`와 `equation_caption`을 넘긴다 |

VLM Enhanced Query의 내부 절차도 README가 주석으로 명시한다. 이미지 경로가 든 컨텍스트를 먼저 검색하고, 이미지를 읽어 base64로 인코딩한 다음, 텍스트 컨텍스트와 이미지를 함께 VLM에 보낸다.

그 밖의 진입점은 다음과 같다.

- `process_folder_complete(folder_path, output_dir, file_extensions, recursive, max_workers)`로 폴더를 일괄 처리한다.
- `RAGAnything(lightrag=lightrag_instance, vision_model_func=...)`로 기존 LightRAG 인스턴스를 그대로 받는다. `working_dir`, `llm_model_func`, `embedding_func`는 그 인스턴스에서 상속된다.
- `raganything.modalprocessors`의 `ImageModalProcessor`와 `TableModalProcessor`를 직접 만들어 `process_multimodal_content(modal_content, content_type, file_path, entity_name)`을 호출하면 `(description, entity_info)` 쌍을 돌려받는다.
- `GenericModalProcessor`를 상속해 `process_multimodal_content`를 재정의하고 `self._create_entity_and_chunk(...)`를 호출하면 사용자 정의 modality를 붙일 수 있다.

### 3.6 content list 직접 삽입

`insert_content_list(content_list, file_path, split_by_character, split_by_character_only, doc_id, display_stats)`는 파싱 단계를 건너뛰고 이미 만들어진 항목 목록을 넣는다.

| type | 필수 키 |
|---|---|
| `text` | `text`, `page_idx` |
| `image` | `img_path`(절대 경로), `image_caption`, `image_footnote`, `page_idx` |
| `table` | `table_body`(마크다운 표), `table_caption`, `table_footnote`, `page_idx` |
| `equation` | `latex`, `text`, `page_idx` |
| 사용자 정의 | `content`, `page_idx` |

`page_idx`는 0부터 세는 원본 페이지 번호이고, 항목은 목록에 적힌 순서대로 처리된다. README는 이 경로의 쓸모로 MinerU와 Docling 밖의 외부 파서 결과 활용, 프로그램으로 만든 콘텐츠 삽입, 여러 출처를 한 knowledge base로 모으기, 캐시해 둔 파싱 결과 재사용을 든다.

### 3.7 파서 세 종

| 파서 | README가 적는 강점 |
|---|---|
| MinerU | PDF, 이미지, Office 문서를 비롯한 여러 형식을 지원하고, OCR과 표 추출이 강하며, GPU 가속을 지원한다 |
| Docling | Office 문서와 HTML에 최적화됐고, 문서 구조 보존이 낫고, 여러 Office 형식을 기본 지원한다 |
| PaddleOCR | 이미지와 PDF를 위한 OCR 중심 파서로, 기존 `content_list` 처리와 호환되는 텍스트 블록을 만들고, Office와 TXT와 MD는 PDF로 먼저 변환해 처리한다 |

MinerU 2.0은 `magic-pdf.json` 설정 파일을 더 이상 쓰지 않고 명령행 인자로 설정을 받는다. `mineru -p input.pdf -o output_dir -m auto`가 자동 모드, `-m ocr`이 OCR 중심 모드, `-b pipeline --device cuda`가 GPU 가속이다. 같은 설정을 `process_document_complete`의 인자로도 넘길 수 있다.

| MinerU 인자 | 값 |
|---|---|
| `lang` | OCR 최적화용 문서 언어. `"ch"`, `"en"`, `"ja"` 등 |
| `device` | `"cpu"`, `"cuda"`, `"cuda:0"`, `"npu"`, `"mps"` |
| `start_page` / `end_page` | 0부터 세는 페이지 범위 |
| `formula` / `table` | 수식 파싱, 표 파싱 사용 여부 |
| `backend` | `pipeline`, `hybrid-auto-engine`, `hybrid-http-client`, `vlm-auto-engine`, `vlm-http-client` |
| `source` | 모델 출처. `"huggingface"`, `"modelscope"`, `"local"` |
| `vlm_url` | `backend=vlm-http-client`일 때의 서비스 주소 |

### 3.8 설치와 환경 변수

`pip install raganything`이 기본이고 extras로 `[image]`, `[text]`, `[image,text]`, `[all]`을 받는다. 소스 설치는 uv를 써서 `uv sync`, `uv sync --extra image --extra text`, `uv sync --all-extras`로 한다. opencv 패키지에서 네트워크 시간 초과가 나면 `UV_HTTP_TIMEOUT=120 uv sync`를 안내한다. MinerU 모델은 첫 실행에서 자동으로 내려받는다.

| 요구 콘텐츠 | 추가 설치 |
|---|---|
| Office 문서(.doc, .docx, .ppt, .pptx, .xls, .xlsx) | LibreOffice. macOS는 `brew install --cask libreoffice`, Ubuntu와 Debian은 `sudo apt-get install libreoffice`, CentOS와 RHEL은 `sudo yum install libreoffice` |
| 확장 이미지 형식(.bmp, .tiff, .gif, .webp) | `pip install raganything[image]`, Pillow 필요 |
| 텍스트 파일(.txt, .md) | `pip install raganything[text]`, ReportLab 필요 |
| PaddleOCR 파서 | `pip install raganything[paddleocr]` 뒤에 플랫폼별 `paddlepaddle` 별도 설치 |

환경 변수는 `.env` 파일로 관리하고 `.env.example`을 참고하라고 안내한다. `OPENAI_API_KEY`, `OPENAI_BASE_URL`, `OUTPUT_DIR`, `PARSER`, `PARSE_METHOD`를 쓰며, 예전 이름 `MINERU_PARSE_METHOD`는 폐기 예정이지만 호환을 위해 아직 동작한다.

이미지 자산을 외부에서 HTTPS나 S3 링크로 접근해야 하면 `RAGANYTHING_PUBLIC_ASSET_BASE_URL`과 `RAGANYTHING_PUBLIC_ASSET_STRIP_PREFIX`를 함께 설정한다. 파싱이 끝나면 비어 있지 않은 `img_path`, `table_img_path`, `equation_img_path`마다 `*_public_url` 형제 필드가 붙고 원본 경로는 로컬 처리를 위해 그대로 남는다. 둘 중 하나만 설정하면 경고를 남기고 URL 부착을 건너뛴다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

README에는 벤치마크 수치 표가 없다. 정확도 비교는 동반 기술 보고서가 담당하고 README는 인용만 안내하므로, DocBench와 MMLongBench 결과는 [[database/guo-2025-rag-anything-all-in-one-rag]]를 참고한다.

README가 직접 제시하는 지표는 커뮤니티 쪽이다.

| 지표 | 값 |
|---|---|
| GitHub star | 2025.07에 1,000개 도달 (News 항목) |
| 상류 프로젝트 채택 | 2026.06에 LightRAG가 RAG-Anything을 native integration |
| 배포 채널 | PyPI `raganything`, pepy 다운로드 배지 |
| 노출 지표 | Trendshift 저장소 배지(repositories/14959) |

예제로는 다섯 개 스크립트를 안내한다.

| 스크립트 | 용도 | API 키 |
|---|---|---|
| `examples/raganything_example.py` | MinerU를 쓰는 end-to-end 문서 처리 | 필요 |
| `examples/modalprocessors_example.py` | multimodal 콘텐츠 직접 처리 | 필요 |
| `examples/office_document_test.py` | Office 문서 파싱 시험, `--check-libreoffice` 지원 | 불필요 |
| `examples/image_format_test.py` | 이미지 형식 파싱 시험, `--check-pillow` 지원 | 불필요 |
| `examples/text_format_test.py` | 텍스트 형식 파싱 시험, `--check-reportlab` 지원 | 불필요 |

MinerU 설치 확인은 `mineru --version`과 `rag.check_parser_installation()` 두 가지로 안내한다.

지원 형식은 다음과 같다.

| 구분 | 형식 |
|---|---|
| 문서 | PDF, DOC, DOCX, PPT, PPTX, XLS, XLSX |
| 이미지 | JPG, PNG, BMP, TIFF, GIF, WebP |
| 텍스트 | TXT, MD |
| multimodal 요소 | 이미지(사진, 다이어그램, 차트, 스크린샷), 표(데이터 표, 비교표, 통계 요약), 수식(LaTeX), 사용자 정의 콘텐츠 |

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **공개 URL 부착이 MinerU 경로 한정**. README가 범위를 못 박는다. Docling 같은 다른 파서는 계속 동작하지만 각 파서의 `content_list` 후처리에 헬퍼가 연결되기 전까지 `*_public_url` 필드를 만들지 않는다.
- **운영체제 수준 의존**. Office 문서에 LibreOffice, PaddleOCR 경로에 `paddlepaddle`이 필요하다. `raganything[all]`도 Python 의존만 해결하므로 LibreOffice는 여전히 따로 설치해야 한다.
- **파이프라인 실패 유형이 따로 문서화될 만큼 많다**. README는 OCR, 표, retrieval 편향, 디버깅 요령을 다루는 점검 목록 `docs/multimodal_rag_failure_modes.md`를 별도로 두고 이슈 207번과 213번을 함께 가리킨다.
- **extras 목록의 내적 불일치**. Quick Start의 Optional Dependencies 절은 `[image]`, `[text]`, `[all]` 세 가지만 나열하는데, 뒤의 Parser Configuration과 Processing Requirements 절은 `[paddleocr]`를 추가로 안내한다. 같은 README 안에서 extras 목록이 어긋난다.
- **라이선스 조항이 README 본문에 없다**. 수집된 raw 파일의 frontmatter만 `license: "MIT"`를 적고, README 본문에는 라이선스 절도 `LICENSE` 파일 링크도 없다. 저장소 클론이 스텁으로 바뀌면서 `LICENSE` 파일이 함께 사라진 결과다.
- **성능 특성 서술 없음**. README는 인덱싱 비용, 지연 시간, 처리량을 수치로 밝히지 않는다. `max_workers`로 병렬 처리를 조절하라는 안내가 전부다.

## 6. 관련 연구 (Related Work)

- [[database/guo-2025-rag-anything-all-in-one-rag]]: 같은 시스템의 기술 보고서. README News가 2025.10에 공개했다고 적는 arXiv 2510.12323이다. 알고리즘 세부와 벤치마크는 기술 보고서 페이지가 정본이다.
- [[database/guo-2025-lightrag-simple-and-fast]]: 토대가 되는 선행 시스템. README 배지와 System Overview가 "built on LightRAG"를 명시하고, 2026.06 News는 반대 방향의 통합도 성사됐다고 적는다.
- [[database/9bow-2026-rag-anything-multimodal-rag-framework]]: 같은 시스템을 다룬 한국어 소개글.
- README의 Related Projects 절이 같은 org의 프로젝트 셋을 든다. [LightRAG](https://github.com/HKUDS/LightRAG)(Simple and Fast RAG), [VideoRAG](https://github.com/HKUDS/VideoRAG)(Extreme Long-Context Video RAG), [MiniRAG](https://github.com/HKUDS/MiniRAG)(Extremely Simple RAG).
- 외부 파서 [MinerU](https://github.com/opendatalab/MinerU)는 기본 파서이자 모델 출처 설정의 대상이다.

## 7. 용어집 (Glossary)

- **All-in-One Multimodal RAG**: 텍스트만이 아니라 이미지와 표와 수식까지 한 프레임워크가 함께 처리하도록 묶은 구성. README가 "여러 전용 도구를 따로 쓸 필요를 없앤다"고 표현한다.
- **content list**: 파서가 문서를 분해해 내놓는 항목 목록. 항목마다 `type`과 `page_idx`를 갖고, 파싱을 건너뛰고 직접 넣을 수도 있다.
- **Modal Processor**: modality마다 모델을 불러 description과 entity를 만드는 구성 요소. `ImageModalProcessor`, `TableModalProcessor`, `GenericModalProcessor`가 README에 등장한다.
- **VLM Enhanced Query**: 검색된 컨텍스트에서 이미지 경로를 찾아 base64로 인코딩한 뒤 텍스트와 함께 VLM에 넘기는 질의 방식. 별도 메서드가 아니라 `aquery`의 `vlm_enhanced` 인자다.
- **belongs_to 관계 사슬**: 원본 문서의 계층 구조를 knowledge graph 위에 남기는 관계 유형.
- **parse method**: `auto`, `ocr`, `txt` 중 하나로 파싱 방식을 고르는 설정. 환경 변수 `PARSE_METHOD`와 함수 인자 양쪽으로 지정한다.
- **`*_public_url`**: 이미지 자산에 외부 접근용 URL을 붙이는 형제 필드. MinerU 파서 경로에서만 생성된다.

## 8. 그림 후보 (Figure Candidates)

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | README System Overview 절의 프레임워크 개요도 | manual | (확인 필요) |

repo 유형은 `-figures/` 디렉토리를 만들지 않고 저장소 안의 이미지를 그 자리에서 참조하는 것이 규약이다. 위 항목의 `raw` 필드에는 GitHub URL만 적어 두었고 파일을 내려받지 않았으므로 `curated: false`로 남긴다.
