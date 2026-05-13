---
title: "VectifyAI/PageIndex"
type: repo
year: 2025
category: database
raw_path: /Users/kmyu/Desktop/project/ai-wiki/raw/repos/vectifyai-pageindex
raw_filename: "vectifyai-pageindex/"
source: vectifyai-pageindex.md
source_collection: external
tags: [rag, vectorless-rag, reasoning-based-rag, tree-index, long-document, llm, pdf, agentic-rag, litellm]
org: "VectifyAI"
repo: "PageIndex"
url: "https://github.com/VectifyAI/PageIndex"
license: "MIT"
---

## 요약 (Summary)

**PageIndex**는 vector DB · chunking 없이 PDF/Markdown 문서를 **계층적 Table-of-Contents tree**로 변환한 뒤 LLM이 그 트리를 **추론(tree search)** 으로 탐색해 retrieval하는 **vectorless RAG** 프레임워크의 reference implementation(MIT, Vectify AI)이다. README는 "similarity ≠ relevance, what we truly need is relevance, and that requires reasoning"이라는 입장에서 vector retrieval을 *대체* 한다고 주장하며, FinanceBench에서 [Mafin 2.5](https://github.com/VectifyAI/Mafin2.5-FinanceBench)가 PageIndex를 retrieval layer로 사용해 **98.7% accuracy** SOTA를 보고했다(별도 저장소·자사 cloud 파이프라인 전제).

본 OSS 코드는 (1) `run_pageindex.py` CLI로 PDF/MD → tree JSON 변환, (2) `pageindex/retrieve.py`의 `get_document` · `get_document_structure` · `get_page_content` 3개 함수로 retrieval, (3) `examples/agentic_vectorless_rag_demo.py`에서 OpenAI Agents SDK로 묶은 end-to-end agentic RAG demo를 제공한다. LLM 호출은 모두 LiteLLM을 거치므로 OpenAI · Anthropic 등 multi-provider 지원.

## 주요 기여 (Key Contributions)

1. **Vectorless RAG의 reference implementation 공개** — vector DB · chunking을 사용하지 않고 문서의 자연 섹션 구조만으로 retrieval. PDF는 LLM이 TOC를 합성, Markdown은 heading 트리에서 직접 구성.
2. **PageIndex Tree schema 표준화** — 각 노드 `{title, node_id, start_index, end_index, summary, nodes[]}`. node_id는 4-digit zero-padded(`"0006"`). `examples/documents/results/`에 PRML, 연차보고서, Regulation Best Interest 등 7종 sample tree JSON 제공.
3. **2-step retrieval workflow의 컴포저블 분리** — Step 1 `page_index_main(pdf_path, opt)` (TOC detect → extract → transform → page-number 매핑 → verify → fix), Step 2 `PageIndexClient` + `retrieve.*` 함수로 agent가 트리를 reasoning하면서 페이지 단위 조회.
4. **Agentic vectorless RAG 패턴** — `examples/agentic_vectorless_rag_demo.py`가 OpenAI Agents SDK `function_tool`로 3개 함수를 노출하고, system prompt에서 "구조 먼저 → 좁은 페이지 범위 호출(`pages='5-7'` like)" 규칙을 강제한다.
5. **Markdown 모드 분리 + tree thinning** — `md_to_tree`가 heading에서 flat node list를 만든 뒤 옵션으로 작은 노드를 병합(`tree_thinning_for_index`, default `min_token_threshold=5000`)하고 LLM 요약을 부착.

## 방법론 및 아키텍처 (Methodology and Architecture)

### 디렉토리 핵심

| 경로 | 역할 |
|---|---|
| `run_pageindex.py` | CLI: `--pdf_path` 또는 `--md_path`로 tree JSON 생성, `./results/{name}_structure.json`에 저장 |
| `pageindex/page_index.py` | PDF용 tree 빌더 (40+ 함수, async/sync 혼합) |
| `pageindex/page_index_md.py` | Markdown용 tree 빌더 (`md_to_tree`) |
| `pageindex/retrieve.py` | `get_document` / `get_document_structure` / `get_page_content(pages="5-7")` |
| `pageindex/client.py` | `PageIndexClient` 래퍼 (self-host와 cloud 시그니처 호환) |
| `pageindex/utils.py` | `ConfigLoader`, `llm_acompletion`(LiteLLM), `extract_json` 등 |
| `pageindex/config.yaml` | default 모델 = `gpt-4o-2024-11-20`, `max_token_num_each_node=20000`, etc. |
| `examples/agentic_vectorless_rag_demo.py` | OpenAI Agents SDK 기반 end-to-end demo |
| `cookbook/*.ipynb` | RAG simple · vision RAG · chat quickstart 3종 |

### PDF → Tree 파이프라인 (`page_index.py`)

1. **TOC 존재 판단**: `toc_detector_single_page`로 각 페이지가 TOC인지 LLM 분류 → `find_toc_pages`가 TOC 영역 확정.
2. **TOC 추출 및 변환**: `extract_toc_content` → `toc_extractor` → `toc_transformer`로 nested JSON 정규화, `check_if_toc_*_is_complete`로 누락 검증.
3. **physical_index 매핑** (3-way 분기):
   - TOC에 페이지번호 있음 → `process_toc_with_page_numbers` + offset 보정 (`extract_matching_page_pairs` → `calculate_page_offset` → `add_page_offset_to_toc_json`).
   - TOC에 페이지번호 없음 → `process_toc_no_page_numbers`. `page_list_to_group_text(max_tokens=20000, overlap_page=1)`로 본문을 그룹핑해 LLM이 시작 페이지 추론(`generate_toc_init`/`generate_toc_continue`).
   - TOC 자체가 없음 → `process_no_toc`가 페이지 본문만으로 트리 합성.
4. **검증 + 보정**: `check_title_appearance_in_start_concurrent`(`ThreadPoolExecutor` 병렬) → `verify_toc` → 불일치 노드는 `fix_incorrect_toc_with_retries(max_attempts=3)`.

### Markdown → Tree 파이프라인 (`page_index_md.py`)

`md_to_tree(...)` 흐름: `extract_nodes_from_markdown`(heading → flat list) → `extract_node_text_content` + `update_node_list_with_text_token_count` → (옵션) `tree_thinning_for_index` → `build_tree_from_nodes` → `clean_tree_for_output` → (옵션) `generate_summaries_for_structure_md`.

> README는 "PDF → MD 변환물에는 이 모드를 권장하지 않는다"고 명시 — 기존 변환 도구가 hierarchy 보존을 못하므로 자사의 PageIndex OCR을 통해야 한다고 안내.

### Retrieval API (`retrieve.py`)

| 함수 | 반환 |
|---|---|
| `get_document(documents, doc_id)` | status, page_count, name, description |
| `get_document_structure(documents, doc_id)` | tree 구조만(텍스트 제외) |
| `get_page_content(documents, doc_id, pages)` | `_parse_pages`가 `"5-7"` · `"3,8"` · `"12"` 형식 파싱 후 `PyPDF2`(또는 캐시) / md 라인번호 기반으로 본문 추출 |

### 기본 설정 (`config.yaml`)

```yaml
model: "gpt-4o-2024-11-20"        # litellm 경유 → 어떤 provider도 가능
retrieve_model: "gpt-5.4"          # 자사 alias로 보임 (self-host 시 변경 필요)
toc_check_page_num: 20
max_page_num_each_node: 10
max_token_num_each_node: 20000
if_add_node_id: "yes"
if_add_node_summary: "yes"
```

## 결과 (Results)

- **FinanceBench 98.7% accuracy** (Mafin 2.5, [`VectifyAI/Mafin2.5-FinanceBench`](https://github.com/VectifyAI/Mafin2.5-FinanceBench)) — PageIndex를 retrieval layer로 사용한 별도 시스템의 SOTA 주장. 본 OSS에는 벤치마크 스크립트가 포함되지 않으므로 재현은 별도 저장소 + 자사 cloud OCR 파이프라인 전제.
- **정성 sample 결과**: `examples/documents/results/`에 PRML(머신러닝 교과서), 2023 annual report, Regulation Best Interest(SEC), earthmover, q1-fy25-earnings, four-lectures 등 7개 PDF에 대해 생성된 tree JSON이 그대로 포함되어 schema와 깊이를 즉시 확인 가능.

## 한계 (Limitations)

- **OSS 버전은 standard PDF parsing만 지원** — 복잡한 레이아웃 · OCR 필요 문서는 자사 cloud의 PageIndex OCR을 별도로 호출하라고 README가 반복. self-host 품질과 cloud 품질 간 명시적 격차.
- **LLM API 호출량 다수** — TOC 검출 · 추출 · 변환 · 매핑 · 검증 · 보정 단계마다 LLM 호출. `max_tokens=20000` 그룹 단위로 문서 전체 순회. 비용 · 지연 트레이드오프 큼.
- **Multi-document corpus는 default 아님** — README: *"PageIndex currently enables reasoning-based RAG within a single document by default."* `examples/tutorials/doc-search/`의 metadata / semantics / description 3가지 워크플로우와 별도 블로그 *PageIndex File System*은 OSS 코드에 포함되지 않은 것으로 보임.
- **TOC 부재 문서의 트리 합성 정확도는 모델 의존** — `process_no_toc`는 LLM 환각 가능. `fix_incorrect_toc_with_retries(max_attempts=3)` 외에는 강한 ground-truth check 부재.
- **`retrieve_model: "gpt-5.4"` 비표준 alias** — default config에 박혀 있어 self-host 첫 실행 시 혼동 여지.

## 관련 페이지 (Related Pages)

- [[database/guo-2025-lightrag-simple-and-fast]] — LightRAG. KG entity·relation을 key-value로 직렬화 + dual-level keyword retrieval. PageIndex와 같은 "vector-only 한계 극복" 모티프지만 해결 전략이 **graph** vs **structural tree**로 갈린다.
- [[database/zhang-2026-leanrag-knowledge-graph-based-generation]] — LeanRAG. hierarchical KG + LCA retrieval로 redundancy 46% 감소. PageIndex는 KG 대신 *문서 내장 TOC* 를 계층의 출처로 삼는다는 차이.
- [[database/guo-2025-rag-anything-all-in-one-rag]] — RAG-Anything 논문. text/image/table/equation cross-modal KG + modality-aware retrieval. PageIndex는 modality보다 **document structure**에 집중.
- [[database/hkuds-rag-anything]] — RAG-Anything reference implementation. 둘 다 OSS RAG framework지만, RAG-Anything은 *graph + multimodal*, PageIndex는 *vectorless + tree-only*.
- [[overviews/lightrag-family-graph-rag-overview]] — graph-based RAG 합성 페이지. PageIndex는 graph가 아닌 **structure(tree)-based** 가지로 별도로 위치시킬 후보.
