---
title: "RAG-Anything: All-in-One RAG Framework (HKUDS, GitHub repo)"
type: repo
year: 2025
category: database
raw_path: /Users/kmyu/Desktop/project/ai-wiki/raw/repos/hkuds-rag-anything
raw_filename: "hkuds-rag-anything/"
source_collection: external
org: "HKUDS"
repo: "RAG-Anything"
url: "https://github.com/HKUDS/RAG-Anything"
license: "MIT"
tags: [multimodal-rag, rag, knowledge-graph, lightrag, mineru, docling, paddleocr, repo, oss]
---

## 한 줄 요약 (One-line Summary)

HKUDS의 **RAG-Anything**(PyPI 패키지명 `raganything`)은 LightRAG 위에 얹은 **all-in-one multimodal RAG** OSS로, MinerU·Docling·PaddleOCR 파서로 PDF/Office/이미지/텍스트 문서를 단일 atomic unit으로 분해한 뒤 이미지·표·수식까지 KG 인덱스에 통합한 hybrid retrieval을 제공한다.

## 1. 자료 정보 (Document Information)

- **Org / Repo**: `HKUDS/RAG-Anything` (Data Intelligence Lab @ HKU)
- **License**: MIT (Copyright (c) 2025 Data Intelligence Lab@HKU)
- **PyPI**: `raganything` (Python ≥ 3.10)
- **Companion paper**: arXiv [2510.12323](https://arxiv.org/abs/2510.12323) — Guo et al., 2025 (이미 wiki에 정리됨: [[database/guo-2025-rag-anything-all-in-one-rag]])
- **Built on**: [HKUDS/LightRAG](https://github.com/HKUDS/LightRAG) — text-side KG·KV 인덱스와 dual-level keyword retrieval을 그대로 차용
- **Snapshot**: `git clone --depth 1` (2026-05-12 시점)
- **상위 디렉토리 구성**:
  - `raganything/` — 메인 패키지 (19 모듈, 약 2.5K LoC: parser/processor/query/config 등)
  - `examples/` — 13개 예제 (end-to-end, batch, vLLM, Ollama, LM Studio, Minimax 등)
  - `reproduce/` — 논문 벤치마크 재현 스크립트 (`index.py`, `query.py`, `llm_answer_evaluator.py`)
  - `docs/` — 6개 가이드 (batch_processing, context_aware_processing, enhanced_markdown, multimodal_rag_failure_modes, offline_setup, vllm_integration)
  - `tests/` — 23개 pytest 파일 (parser·resilience·callbacks·doc_status 등)
  - `assets/`, `scripts/`, `pyproject.toml`, `setup.py`, `requirements.txt`, `env.example`

## 2. 주요 기여 (Key Contributions)

1. **Paper의 reference implementation** — arXiv 2510.12323 논문의 dual-graph (cross-modal KG + text-based KG) + cross-modal hybrid retrieval 아키텍처를 그대로 코드로 제공. `reproduce/` 디렉토리에 DocBench·MMLongBench 재현 스크립트 포함.
2. **3-파서 추상화 (Pluggable Parser)** — `raganything/parser.py`의 `Parser` 베이스 + `MineruParser`·`DoclingParser`·`PaddleOCRParser` 구현, `register_parser()`로 커스텀 파서 등록. 같은 `content_list` 표현으로 정규화하여 후속 파이프라인 비종속.
3. **Modality-별 Processor 분리** — `raganything/modalprocessors.py`에 `BaseModalProcessor` → `ImageModalProcessor` / `TableModalProcessor` / `EquationModalProcessor` / `GenericModalProcessor`. 사용자 정의 modality는 `GenericModalProcessor` 상속으로 확장.
4. **3가지 질의 모드 통합 API** — `RAGAnything.aquery()` (순수 텍스트, LightRAG의 `hybrid/local/global/naive` 모드 그대로), `aquery_with_multimodal()` (질의에 표·수식·이미지 첨부), `aquery_vlm_enhanced()` (검색된 컨텍스트의 image_path를 base64로 인코딩해 VLM에 함께 입력 — dereferencing).
5. **운영 부속 기능** — `resilience.py` (retry/circuit breaker), `callbacks.py` (ProcessingEvent·MetricsCallback), `batch.py`·`batch_parser.py` (대량 처리, `--max_workers`), `enhanced_markdown.py` (Markdown → PDF 변환, WeasyPrint), `asset_urls.py` (CDN/S3로 `*_public_url` 부착), `omml_extractor.py` (OOXML 수식 추출), 한글/중문 프롬프트 (`prompt_manager.py`·`prompts_zh.py`).

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

논문 아키텍처와 동일한 5단계 multi-stage pipeline. 패키지 진입점은 `from raganything import RAGAnything, RAGAnythingConfig`.

```
[Document]  PDF / DOCX / PPTX / XLSX / JPG / PNG / TXT / MD
   ↓ Parser ( raganything/parser.py )
     MineruParser | DoclingParser | PaddleOCRParser
     → content_list = [ {type: text|image|table|equation, ...}, ... ]
   ↓ ProcessorMixin ( raganything/processor.py )
     - ContextExtractor (window δ로 주변 텍스트 컨텍스트 수집)
     - ImageModalProcessor   → VLM caption + entity 추출
     - TableModalProcessor   → table summary + entity
     - EquationModalProcessor → LaTeX 해석 + entity
     - GenericModalProcessor  → 커스텀
   ↓ KG construction (LightRAG 호출 — entity·relation 추출)
     Cross-modal KG (anchor v_mm_j + belongs_to)
     ⊕ Text-based KG  →  Unified KG  +  Embedding Table
   ↓ QueryMixin ( raganything/query.py )
     aquery()                 — pure text (hybrid/local/global/naive)
     aquery_with_multimodal() — query + image/table/equation 첨부
     aquery_vlm_enhanced()    — retrieve → base64 image dereference → VLM
   → response
```

### 핵심 클래스

| 모듈 | 클래스 / 함수 | 역할 |
|---|---|---|
| `raganything/raganything.py` | `RAGAnything(QueryMixin, ProcessorMixin, BatchMixin)` | 메인 facade. `__post_init__`에서 lightrag 초기화·파서 검증·processor 인스턴스화 |
| `raganything/config.py` | `RAGAnythingConfig` (dataclass) | env-driven config (`WORKING_DIR`, `PARSER`, `PARSE_METHOD`, `ENABLE_IMAGE/TABLE/EQUATION_PROCESSING` 등) |
| `raganything/parser.py` | `Parser`·`MineruParser`·`DoclingParser`·`PaddleOCRParser` + `register_parser` | content_list 정규화, plugin 레지스트리 |
| `raganything/modalprocessors.py` | `BaseModalProcessor`·`Image/Table/Equation/GenericModalProcessor`, `ContextConfig`·`ContextExtractor` | modality별 VLM/LLM caption + entity 생성 |
| `raganything/query.py` | `QueryMixin.aquery/aquery_with_multimodal/aquery_vlm_enhanced` | 3-mode 질의 API, VLM 메시지 빌더, image path → base64 변환 |
| `raganything/processor.py` | `ProcessorMixin` | `process_document_complete()`·`process_folder_complete()` 오케스트레이션 |
| `raganything/batch.py`·`batch_parser.py` | `BatchMixin` | 폴더·다파일 병렬 처리 (`max_workers`) |
| `raganything/resilience.py` | `retry`·`async_retry`·`CircuitBreaker` | 외부 API 호출 안정화 |
| `raganything/callbacks.py` | `ProcessingCallback`·`MetricsCallback`·`CallbackManager`·`ProcessingEvent` | 처리 이벤트 훅 |
| `raganything/asset_urls.py` | (helpers) | `RAGANYTHING_PUBLIC_ASSET_BASE_URL` 환경변수 기반 CDN/S3 URL 부착 |
| `raganything/omml_extractor.py` | | Office Math ML 수식 추출 |
| `raganything/prompt.py`·`prompts_zh.py`·`prompt_manager.py` | | 다국어 프롬프트 관리 |

### 의존성

- `lightrag-hku` (필수, 같은 lab) — KG/KV 저장·키워드 retrieval
- `mineru[core]` (필수) — PDF/오피스 파싱 + OCR + 표·수식
- `huggingface_hub`, `tqdm` (필수)
- Optional extras: `Pillow` (`[image]`), `reportlab` (`[text]`), `paddleocr+pypdfium2` (`[paddleocr]`), `markdown+weasyprint+pygments` (`[markdown]`), `[all]` (전부)
- 외부 시스템 의존: **LibreOffice** (Office 문서 처리시 필수, brew/apt 등으로 별도 설치)

### Sample Quick-Start (README §Usage Examples 발췌)

```python
config = RAGAnythingConfig(
    working_dir="./rag_storage",
    parser="mineru",                  # mineru | docling | paddleocr
    parse_method="auto",              # auto | ocr | txt
    enable_image_processing=True,
    enable_table_processing=True,
    enable_equation_processing=True,
)
rag = RAGAnything(config=config,
                  llm_model_func=...,
                  vision_model_func=...,
                  embedding_func=EmbeddingFunc(embedding_dim=3072, ...))
await rag.process_document_complete(file_path="paper.pdf", parse_method="auto")
ans = await rag.aquery("이 문서의 핵심 표가 보여주는 결과는?", mode="hybrid")
```

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

저장소 자체는 벤치마크 수치를 제공하지 않고, `reproduce/index.py` + `reproduce/query.py` + `reproduce/llm_answer_evaluator.py`로 **paper에서 보고된 DocBench·MMLongBench 결과를 재현**하는 스크립트를 제공한다. 실제 수치는 [[database/guo-2025-rag-anything-all-in-one-rag]] 참고:

- DocBench Overall: RAG-Anything **63.4%** vs MMGraphRAG 61.0 / LightRAG 58.4 / GPT-4o-mini 51.2.
- MMLongBench Overall: **42.8%** vs 38.9 / 37.7 / 33.5.
- 100+ 페이지 long-doc에서 격차가 13점+로 확대.

저장소 부가 지표 (커뮤니티 / 운영):

- GitHub trending repo (1k+ stars 도달, README News 기준 2025-07).
- 23 pytest 파일로 parser·resilience·callbacks·doc_status·custom_parser·embedding_examples 등 모듈 단위 커버리지 유지.
- vLLM·Ollama·LM Studio·Minimax 등 다양한 LLM 백엔드 예제 제공 → 단일 API key에 묶여있지 않다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **인덱싱 비용** — atomic unit별로 VLM caption 호출이 누적되어 LightRAG 단독 대비 indexing latency·비용이 증가. README는 latency 수치를 명시하지 않지만 docs/multimodal_rag_failure_modes.md에서 retrieval bias·OCR 실패 등 운영 시 흔한 함정을 정리.
- **백본 의존** — paper와 동일하게 기본 권장 backbone이 `gpt-4o-mini` + `text-embedding-3-large`. 다른 backbone에서는 prompt·VLM 동작이 검증되지 않음.
- **Parser-specific 기능 편차** — `RAGANYTHING_PUBLIC_ASSET_BASE_URL` 같은 CDN URL 부착은 MinerU 경로에만 wired; Docling·PaddleOCR 경로는 추후 작업. (README §Public media URLs)
- **외부 시스템 설치 부담** — LibreOffice·MinerU 모델·PaddleOCR `paddlepaddle` 등 OS-level 의존이 있어 컨테이너화·오프라인 셋업이 까다롭다 (docs/offline_setup.md로 별도 가이드 제공).
- **Text-centric retrieval bias** — 시각 정보를 요구하는 질의에도 텍스트를 우선 검색하는 경향. paper Appendix A.5에서 한계로 명시되며 코드 레벨 보완 예정.

## 6. 관련 연구 (Related Work)

- [[database/guo-2025-rag-anything-all-in-one-rag]] — 동일 시스템의 paper 페이지. 본 repo는 해당 paper의 reference implementation.
- [[database/guo-2025-lightrag-simple-and-fast]] — 같은 lab의 직전 작업. `lightrag-hku` 패키지로 의존 (KG·KV 인덱스, dual-level keyword retrieval).
- [[database/zhang-2026-leanrag-knowledge-graph-based-generation]] — LeanRAG. RAG-Anything이 modality 축으로 확장한다면 LeanRAG는 abstraction 축으로 확장.
- [[database/dsba-2026-paper-review-graph-based-rag]] — LightRAG·LeanRAG 비교 세미나. 본 repo는 그 연장선의 multimodal 확장축.
- HKUDS 생태계: [VideoRAG](https://github.com/HKUDS/VideoRAG) (long-context video), [MiniRAG](https://github.com/HKUDS/MiniRAG) (extremely simple RAG) — README §Related Projects.
- 외부 파서: [MinerU](https://github.com/opendatalab/MinerU) (필수 의존), Docling, PaddleOCR.

## 7. 용어집 (Glossary)

- **All-in-One Multimodal RAG**: 텍스트뿐 아니라 이미지·표·수식까지 1급 시민으로 처리하는 단일 RAG 프레임워크.
- **Atomic Unit**: 파서가 문서를 분해해 만든 modality 무관 단위(텍스트 블록·이미지·표·수식). `content_list`의 원소.
- **content_list**: 파서가 출력하는 정규화된 atomic unit 시퀀스. 후속 파이프라인은 파서 종속성 없이 이 표현만 사용.
- **Cross-modal KG / Text-based KG / Unified KG**: 비텍스트 anchor 기반 KG와 LightRAG 식 텍스트 KG를 entity-name 정렬로 병합해 만든 통합 KG. paper 핵심 설계.
- **Modal Processor**: modality별로 VLM/LLM을 호출해 description + entity를 생성하는 컴포넌트. 본 repo의 `ImageModalProcessor` 등.
- **VLM-Enhanced Query / Dereferencing**: 검색된 텍스트 컨텍스트에서 image_path를 추출 → base64 인코딩 → VLM에 함께 보내 시각 정보를 직접 보게 하는 방식.
- **MinerU / Docling / PaddleOCR**: 세 가지 지원 파서. 본 repo는 셋을 동일 `Parser` 인터페이스로 추상화하고 `register_parser`로 확장.
- **dual-level keyword retrieval (low / high)**: LightRAG에서 가져온 retrieval 모드. `aquery(mode="hybrid")` 등의 내부 동작.
- **LibreOffice**: Office 문서(DOC/PPT/XLS) 처리시 필수 외부 의존. headless로 PDF 변환 후 MinerU에 전달.
