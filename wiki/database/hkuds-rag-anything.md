---
title: "RAG-Anything (HKUDS) — All-in-One Multimodal RAG OSS"
type: repo
year: 2025
category: database
raw_path: /Users/kmyu/Desktop/project/ai-wiki/raw/repos/hkuds-rag-anything
raw_filename: "hkuds-rag-anything/"
source_collection: external
source: hkuds-rag-anything.md
org: "HKUDS"
repo: "RAG-Anything"
url: "https://github.com/HKUDS/RAG-Anything"
license: "MIT"
tags: [multimodal-rag, rag, knowledge-graph, lightrag, mineru, docling, paddleocr, repo, oss]
---

## 요약 (Summary)

**HKUDS/RAG-Anything**은 LightRAG 위에 얹은 **all-in-one multimodal RAG** OSS(PyPI `raganything`, MIT)다. PDF·Office·이미지·텍스트를 MinerU·Docling·PaddleOCR 중 하나로 파싱해 modality 무관 `content_list`로 정규화한 뒤, 이미지/표/수식 각각의 `ModalProcessor`가 VLM 캡션 + entity를 만들어 LightRAG의 KG 인덱스에 합류시킨다. 질의는 `aquery()`(LightRAG hybrid/local/global/naive) · `aquery_with_multimodal()`(질의에 표·수식 첨부) · `aquery_vlm_enhanced()`(검색된 image_path를 base64로 dereference해 VLM에 함께 전달) 세 가지로 통합 노출된다. 같은 lab의 arXiv 2510.12323 paper의 reference implementation으로, `reproduce/`에 DocBench·MMLongBench 재현 스크립트가 들어 있다.

## 주요 기여 (Key Contributions)

1. **Paper의 reference implementation** — arXiv [2510.12323](https://arxiv.org/abs/2510.12323)의 dual-graph(cross-modal KG ⊕ text-based KG) + cross-modal hybrid retrieval을 그대로 코드로 제공. `reproduce/index.py` / `reproduce/query.py` / `reproduce/llm_answer_evaluator.py`.
2. **Pluggable Parser** — `raganything/parser.py`에서 `Parser` 베이스 + `MineruParser` · `DoclingParser` · `PaddleOCRParser` 구현. `register_parser()` 레지스트리로 커스텀 파서 등록 가능. 모두 같은 `content_list` 표현으로 정규화.
3. **Modality 별 Processor 분리** — `BaseModalProcessor` → `ImageModalProcessor` / `TableModalProcessor` / `EquationModalProcessor` / `GenericModalProcessor` (`modalprocessors.py`). `ContextExtractor`가 window δ로 주변 텍스트를 함께 묶어 context-aware 캡션 생성.
4. **3-mode 통합 질의 API** — `aquery` (pure text, LightRAG 모드 그대로) / `aquery_with_multimodal` (표·수식·이미지를 질의에 첨부) / `aquery_vlm_enhanced` (검색된 컨텍스트의 `img_path`를 base64로 인코딩해 VLM에 직접 입력 — paper의 dereferencing).
5. **운영 부속 기능** — `resilience.py` (retry/circuit breaker), `callbacks.py` (`MetricsCallback`·`ProcessingEvent`), `batch.py`·`batch_parser.py`(폴더 병렬), `asset_urls.py` (S3/CDN URL 부착, MinerU 경로 전용), `omml_extractor.py` (OOXML 수식), `prompts_zh.py`(중문 프롬프트).

## 방법론 및 아키텍처 (Methodology and Architecture)

```
Document (PDF/Office/Image/TXT/MD)
   ↓ Parser   (MineruParser | DoclingParser | PaddleOCRParser)
content_list = [text | image | table | equation, ...]
   ↓ ProcessorMixin + ContextExtractor (window δ)
ImageModalProcessor / TableModalProcessor / EquationModalProcessor / GenericModalProcessor
   ↓                                                ↓
description (검색용 텍스트 프록시)            entity (KG용 요약)
   ↓ LightRAG (lightrag-hku) — NER + Relation + KV 인덱스
Cross-modal KG ⊕ Text-based KG ⇒ Unified KG + Embedding Table
   ↓ QueryMixin
aquery (hybrid/local/global/naive)
aquery_with_multimodal (질의에 multimodal 첨부)
aquery_vlm_enhanced (image_path → base64 → VLM)
```

**메인 진입점**

```python
from raganything import RAGAnything, RAGAnythingConfig

config = RAGAnythingConfig(
    working_dir="./rag_storage",
    parser="mineru",          # mineru | docling | paddleocr
    parse_method="auto",      # auto | ocr | txt
    enable_image_processing=True,
    enable_table_processing=True,
    enable_equation_processing=True,
)
rag = RAGAnything(
    config=config,
    llm_model_func=...,       # 예: gpt-4o-mini
    vision_model_func=...,    # 예: gpt-4o
    embedding_func=EmbeddingFunc(embedding_dim=3072, ...),
)
await rag.process_document_complete(file_path="paper.pdf", parse_method="auto")
ans = await rag.aquery("핵심 표가 보여주는 결과는?", mode="hybrid")
```

**핵심 모듈 (`raganything/`)**

| 파일 | 클래스 / 함수 | 역할 |
|---|---|---|
| `raganything.py` | `RAGAnything(QueryMixin, ProcessorMixin, BatchMixin)` | facade. 파서 검증 + processor 인스턴스화 + lightrag 초기화 |
| `config.py` | `RAGAnythingConfig` (env-driven dataclass) | `WORKING_DIR`·`PARSER`·`PARSE_METHOD`·`ENABLE_*_PROCESSING` |
| `parser.py` | `Parser` + Mineru/Docling/PaddleOCR + `register_parser` | content_list 정규화, plugin 레지스트리 |
| `modalprocessors.py` | `BaseModalProcessor` + 4종, `ContextExtractor` | modality별 VLM/LLM 캡션 + entity |
| `processor.py` | `ProcessorMixin` (`process_document_complete` 등) | 문서·폴더 단위 오케스트레이션 |
| `query.py` | `QueryMixin.aquery / aquery_with_multimodal / aquery_vlm_enhanced` | 3-mode 질의, VLM 메시지 빌더, base64 dereference |
| `batch.py`, `batch_parser.py` | `BatchMixin` | `max_workers` 기반 병렬 처리 |
| `resilience.py` | `retry`·`async_retry`·`CircuitBreaker` | 외부 API 안정화 |
| `callbacks.py` | `ProcessingCallback`·`MetricsCallback`·`CallbackManager` | 처리 이벤트 훅 |
| `asset_urls.py` | helpers | `RAGANYTHING_PUBLIC_ASSET_BASE_URL`로 `*_public_url` 부착 (MinerU 한정) |
| `omml_extractor.py` | | OOXML 수식 추출 |
| `prompt*.py` | | 다국어 프롬프트 관리 |

**의존성**

- 필수: `lightrag-hku` (같은 lab), `mineru[core]`, `huggingface_hub`, `tqdm`. Python ≥ 3.10.
- Optional extras: `[image]` (Pillow) · `[text]` (reportlab) · `[paddleocr]` (paddleocr + pypdfium2) · `[markdown]` (markdown + weasyprint + pygments) · `[all]`.
- OS-level: **LibreOffice** (Office 문서 처리시 필수, brew/apt 별도 설치). PaddleOCR 사용시 `paddlepaddle` 별도 설치.

## 결과 (Results)

저장소 자체에는 벤치마크 수치 표가 없고, `reproduce/`로 paper 결과를 재현하는 구성이다. 핵심 수치는 paper 페이지를 참고:

- DocBench Overall: **63.4%** (vs MMGraphRAG 61.0 / LightRAG 58.4 / GPT-4o-mini 51.2).
- MMLongBench Overall: **42.8%** (vs 38.9 / 37.7 / 33.5).
- 100+ 페이지 장문에서 격차가 13점+로 확대.
- Ablation: 그래프 구축이 게인의 대부분, reranker 기여 marginal.

상세 표·case study는 [[database/guo-2025-rag-anything-all-in-one-rag]] 참조.

운영 측면:

- 23 pytest 모듈 (parser·resilience·callbacks·doc_status 등) 유지.
- vLLM·Ollama·LM Studio·Minimax 백엔드 예제가 `examples/`에 포함 → backbone 비종속.
- README News 기준 2025-07에 GitHub 1k+ stars 도달.

## 관련 페이지 (Related Pages)

- [[database/guo-2025-rag-anything-all-in-one-rag]] — 본 repo의 paper. 알고리즘 디테일·벤치마크 표·case study는 paper 페이지가 진실의 원천이고, 이 페이지는 그 코드 구현·운영 측면을 담당한다.
- [[database/guo-2025-lightrag-simple-and-fast]] — 필수 의존 패키지(`lightrag-hku`). text-side KG·KV 인덱스와 dual-level keyword retrieval을 그대로 차용.
- [[database/zhang-2026-leanrag-knowledge-graph-based-generation]] — 같은 LightRAG 계열의 abstraction 축 확장. RAG-Anything이 modality 축으로 확장한다면 LeanRAG는 hierarchy 축으로 확장하는 방향.
- [[database/dsba-2026-paper-review-graph-based-rag]] — LightRAG·LeanRAG 비교 세미나. 본 repo는 그 연장선의 multimodal 확장축으로 위치 지을 수 있다.
