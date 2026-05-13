---
title: "VectifyAI/PageIndex"
type: repo
year: 2025
category: database
raw_path: /Users/kmyu/Desktop/project/ai-wiki/raw/repos/vectifyai-pageindex
raw_filename: "vectifyai-pageindex/"
source_collection: external
tags: [rag, vectorless-rag, reasoning-based-rag, tree-index, long-document, llm, pdf, agentic-rag, litellm]
org: "VectifyAI"
repo: "PageIndex"
url: "https://github.com/VectifyAI/PageIndex"
license: "MIT"
---

## 한 줄 요약 (One-line Summary)

PageIndex는 vector DB · chunking 없이 PDF/Markdown을 **계층적 Table-of-Contents tree**로 변환한 뒤 LLM이 그 트리를 **추론(tree search)** 으로 탐색해 retrieval하는 vectorless RAG 프레임워크의 reference implementation(MIT)으로, `run_pageindex.py` CLI와 OpenAI Agents SDK 기반 agentic demo, LiteLLM multi-provider 지원을 제공한다.

## 1. 자료 정보 (Document Information)

- **저장소**: `VectifyAI/PageIndex` (https://github.com/VectifyAI/PageIndex)
- **라이선스**: MIT License, Copyright (c) 2025 Vectify AI
- **인용**: Mingtian Zhang, Yu Tang and PageIndex Team, *"PageIndex: Next-Generation Vectorless, Reasoning-based RAG"*, PageIndex Blog, Sep 2025
- **호스팅 서비스**: Chat platform (`chat.pageindex.ai`), MCP/API(`pageindex.ai/developer`), Docs(`docs.pageindex.ai`)
- **개발자 채널**: Twitter `@PageIndexAI`, LinkedIn `vectify-ai`, Discord
- **관련 벤치마크**: Mafin 2.5(같은 팀) — FinanceBench 98.7% accuracy 달성, vector RAG 대비 SOTA 주장
- **주요 진입점**:
  - `run_pageindex.py` — PDF/MD를 트리 구조 JSON으로 변환하는 CLI
  - `pageindex/` 패키지 — `page_index.py`(PDF), `page_index_md.py`(MD), `retrieve.py`(검색 API), `client.py`(`PageIndexClient`)
  - `examples/agentic_vectorless_rag_demo.py` — OpenAI Agents SDK 기반 end-to-end demo
  - `cookbook/` — Jupyter notebook 3종 (RAG simple, vision RAG, chat quickstart)

## 2. 주요 기여 (Key Contributions)

1. **Vectorless RAG의 reference implementation 공개.** vector DB · chunking을 사용하지 않고, 문서의 *자연스러운 섹션 구조*만으로 retrieval을 수행한다. README는 "similarity ≠ relevance, what we truly need is relevance, and that requires reasoning"이라는 입장을 명시한다.
2. **PageIndex Tree 자료 구조 표준화.** 각 노드가 `{title, node_id, start_index, end_index, summary, nodes[]}` 필드를 갖는 hierarchical JSON. node_id는 4-digit zero-padded 문자열(`"0006"`)이며 `examples/documents/results/`에 PRML, FinanceBench-class earnings, Regulation Best Interest 등 7종 sample tree JSON이 포함되어 있어 실제 schema를 바로 확인할 수 있다.
3. **2-step retrieval workflow를 컴포저블하게 분리.**
   - Step 1: `page_index_main(pdf_path, opt)` — TOC detection · extraction · transformation · page-number mapping · verification 파이프라인으로 tree 생성.
   - Step 2: `PageIndexClient` + `retrieve.get_document / get_document_structure / get_page_content`로 LLM·agent가 트리를 reasoning하면서 페이지 단위로 조회.
4. **Agentic vectorless RAG 패턴 demo.** `examples/agentic_vectorless_rag_demo.py`는 OpenAI Agents SDK의 `function_tool`로 위 3개 함수를 노출하고, system prompt에서 "구조 먼저 → 좁은 페이지 범위 호출" 규칙(`get_page_content(pages='5-7')` like)을 강제한다. 이는 vector retrieval을 "tool-using agent의 한 도구"가 아니라 *trees of contents over which LLM reasons*로 대체하는 구체적 예시다.
5. **Markdown 모드 분리.** PDF는 LLM으로 TOC를 합성해야 하지만, Markdown은 heading(`#`, `##`, …)에서 곧장 트리를 짤 수 있다. `pageindex/page_index_md.py`의 `md_to_tree`가 별도 경로로 처리하고, optional `tree_thinning_for_index`(min token threshold 기반 가지치기)와 `generate_summaries_for_structure_md`로 노드 요약을 비동기 부여한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 디렉토리 구조 (실측)

```
vectifyai-pageindex/
├── run_pageindex.py          # CLI 엔트리포인트
├── requirements.txt          # litellm, pymupdf, PyPDF2, python-dotenv, pyyaml
├── pageindex/
│   ├── __init__.py           # 공개 API re-export
│   ├── page_index.py         # PDF용 tree 빌더 (TOC detect/extract/transform/fix)
│   ├── page_index_md.py      # Markdown용 tree 빌더 (heading → node list → tree)
│   ├── retrieve.py           # get_document / get_document_structure / get_page_content
│   ├── client.py             # PageIndexClient(파일/메타 관리 래퍼)
│   ├── utils.py              # ConfigLoader, llm_acompletion, extract_json 등
│   └── config.yaml           # 기본 설정
├── cookbook/                 # 3종 notebook (RAG simple, vision RAG, chat quickstart)
└── examples/
    ├── agentic_vectorless_rag_demo.py
    ├── documents/            # PRML.pdf, 2023-annual-report.pdf 등 sample PDF + results/*.json
    ├── tutorials/            # doc-search(metadata/semantics/description), tree-search
    └── workspace/            # 사전 인덱싱된 doc workspace 샘플
```

### 3.2 PDF → Tree 파이프라인 (`pageindex/page_index.py`)

`page_index.py`의 함수 시그니처(40+ 개)에서 읽히는 처리 순서:

1. **TOC 존재 여부 판단**: `check_toc(page_list, opt)` → `toc_detector_single_page` 로 각 페이지가 TOC인지 LLM 분류 → `find_toc_pages` 로 TOC 영역 확정.
2. **TOC 추출**: `extract_toc_content`(텍스트 그대로) · `toc_extractor`(LLM이 구조화) · `check_if_toc_extraction_is_complete`로 누락 검증.
3. **TOC → 트리 변환**: `toc_transformer` 가 페이지에 산재한 표/들여쓰기 TOC를 nested JSON으로 정규화 → `check_if_toc_transformation_is_complete` 로 검증.
4. **physical_index 매핑**:
   - TOC에 페이지번호 있음 → `process_toc_with_page_numbers` + `detect_page_index` + offset 보정(`extract_matching_page_pairs` → `calculate_page_offset` → `add_page_offset_to_toc_json`).
   - TOC에 페이지번호 없음 → `process_toc_no_page_numbers` 가 페이지 본문을 그룹핑(`page_list_to_group_text`, default `max_tokens=20000`, 1-page overlap)해 LLM이 각 노드의 실제 시작 페이지를 추론(`add_page_number_to_toc`, `generate_toc_init`/`generate_toc_continue`).
   - TOC 자체가 없는 문서 → `process_no_toc` 가 페이지 텍스트만으로 트리를 합성.
5. **제목 위치 검증 및 보정**: `check_title_appearance` · `check_title_appearance_in_start_concurrent` 가 각 노드 제목이 실제 페이지에 등장하는지 fuzzy match → `verify_toc` → 불일치 노드는 `fix_incorrect_toc` / `fix_incorrect_toc_with_retries`(default `max_attempts=3`)로 재배치. LLM async 호출이 `ThreadPoolExecutor`로 병렬화된다.

### 3.3 Markdown → Tree 파이프라인 (`page_index_md.py`)

`md_to_tree(md_path, if_thinning, min_token_threshold, if_add_node_summary, summary_token_threshold, model, if_add_doc_description, if_add_node_text, if_add_node_id)`:

1. `extract_nodes_from_markdown` 이 `#` heading 레벨로 flat node list 생성.
2. `extract_node_text_content` + `update_node_list_with_text_token_count` 로 각 노드의 본문 토큰 길이 측정.
3. (옵션) `tree_thinning_for_index(min_node_token, model)` — 토큰이 임계치(default 5000)에 못 미치는 작은 노드를 인접 노드와 병합해 가지치기.
4. `build_tree_from_nodes` 로 nested tree 구성, `clean_tree_for_output` 으로 직렬화.
5. (옵션) `generate_summaries_for_structure_md` 가 `summary_token_threshold` 초과 노드에 LLM 요약 부착.

> README는 PDF → Markdown 변환물에 이 모드 적용을 권장하지 않는다. "기존 변환 도구가 hierarchy를 보존하지 못한다"는 이유로 자사의 **PageIndex OCR**(클라우드 전용)을 거쳐야 한다고 명시.

### 3.4 Retrieval API (`pageindex/retrieve.py`)

agent/LLM이 호출하는 3개의 함수:

| 함수 | 시그니처 (요약) | 반환 |
|---|---|---|
| `get_document(documents, doc_id)` | doc 메타데이터 조회 | status, page_count, name, description |
| `get_document_structure(documents, doc_id)` | tree 구조만(텍스트 제외) | nested JSON tree |
| `get_page_content(documents, doc_id, pages)` | 특정 페이지 본문 | `_parse_pages`로 `"5-7"`·`"3,8"`·`"12"` 형식 파싱 후 `_get_pdf_page_content` 또는 `_get_md_page_content`(라인번호 기준)로 추출 |

PDF는 캐시된 `doc_info['pages']`를 우선 사용하고 없으면 `PyPDF2.PdfReader`로 fallback한다. `pages` 인자는 정렬+중복 제거(`sorted(set(...))`).

### 3.5 Agentic Demo (`examples/agentic_vectorless_rag_demo.py`)

OpenAI Agents SDK 의존(`pip install openai-agents`). 핵심 system prompt 발췌:

```
- Call get_document() first to confirm status and page/line count.
- Call get_document_structure() to identify relevant page ranges.
- Call get_page_content(pages="5-7") with tight ranges; never fetch the whole document.
- Before each tool call, output one short sentence explaining the reason.
```

세 함수가 `@function_tool` 로 등록되고, `Runner` 가 token streaming + tool-call streaming(`RawResponsesStreamEvent`, `RunItemStreamEvent`)을 표시한다. 기본 sample PDF는 `examples/documents/attention-residuals.pdf`(arXiv 2603.15031 변형).

### 3.6 설정 시스템 (`pageindex/config.yaml` + `ConfigLoader`)

```yaml
model: "gpt-4o-2024-11-20"
# model: "anthropic/claude-sonnet-4-6"
retrieve_model: "gpt-5.4"
toc_check_page_num: 20
max_page_num_each_node: 10
max_token_num_each_node: 20000
if_add_node_id: "yes"
if_add_node_summary: "yes"
if_add_doc_description: "no"
if_add_node_text: "no"
```

CLI 플래그(`--model`, `--toc-check-pages`, `--max-pages-per-node`, `--max-tokens-per-node`, `--if-add-node-*`)가 config를 덮어쓴다. 모든 LLM 호출은 `litellm.acompletion`(`utils.llm_acompletion`)을 거치므로 OpenAI · Anthropic · 기타 provider를 `.env`의 키만 바꿔 사용 가능.

> `retrieve_model: "gpt-5.4"` 는 실제 OpenAI 공개 모델이 아니라 PageIndex 호스팅 측 alias로 보인다. 자체 호스팅 시에는 변경 필요.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

- **FinanceBench 98.7% accuracy** — Mafin 2.5(`VectifyAI/Mafin2.5-FinanceBench`)가 PageIndex 기반 reasoning-RAG 시스템으로 SOTA 달성을 README · blog `vectify.ai/blog/Mafin2.5` 에서 주장. FinanceBench는 Islam et al., arXiv 2311.11944(SEC filings · earnings disclosures 등 금융 장문 QA).
- 본 OSS 저장소 자체는 **벤치마크 코드/스크립트를 포함하지 않는다.** 성능 수치 검증은 별도 저장소(Mafin2.5-FinanceBench) 또는 자체 재현이 필요.
- `examples/documents/results/`에 PRML(머신러닝 교과서), 연차보고서, 규정 문서 등 7종 sample tree JSON 결과만 제공 — 정성 평가용.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **OSS 버전은 "standard PDF parsing"만 사용.** 복잡한 레이아웃·테이블·OCR 필요 문서는 자사 cloud의 **PageIndex OCR**를 별도로 호출하라고 README가 반복 안내(`# ☁️ Improved Tree Generation with PageIndex OCR` 섹션은 주석 처리되어 있으나 메시지는 본문 곳곳에 산재). 즉 self-host 품질과 cloud 품질에 명시적 격차가 존재.
- **LLM API 호출량이 크다.** TOC 검출 · 추출 · 변환 · 페이지 매핑 · 제목 검증 · 보정 단계마다 LLM이 동기/비동기로 호출되며, `page_list_to_group_text`의 `max_tokens=20000` 그룹 단위로 문서 전체를 순회한다. 비용·지연 트레이드오프가 큰 구조.
- **Multi-document corpus는 default가 아니다.** README는 "PageIndex currently enables reasoning-based RAG within a single document by default"라고 명시하고, `examples/tutorials/doc-search/`에서 metadata / semantics / description 기반 3가지 워크플로우만 별도로 안내한다. 별도로 발표된 *PageIndex File System*(blog `pageindex-filesystem`)은 OSS 코드에 포함되지 않은 것으로 보임.
- **TOC가 없거나 매우 부실한 문서에서의 동작은 `process_no_toc` 가 LLM으로 트리를 "합성"** 하므로, 환각 가능성과 노드 경계 정확도는 모델 품질에 직결됨. `verify_toc` · `fix_incorrect_toc_with_retries` 가 있지만 max_attempts=3.
- **`retrieve_model: "gpt-5.4"` 같은 비표준 alias** 가 default config에 박혀 있어 self-host 첫 실행 시 혼동 여지.
- **벤치마크 reproducibility.** FinanceBench 98.7% 주장은 별도 저장소 + 자사 cloud OCR 파이프라인을 전제로 한 수치일 가능성이 높으므로, 본 OSS 코드만으로 동일 결과 재현 보장은 없음.

## 6. 관련 연구 (Related Work)

- **본 wiki 내 LightRAG 계열** — `wiki/database/guo-2025-lightrag-simple-and-fast.md`, `wiki/database/zhang-2026-leanrag-knowledge-graph-based-generation.md`, `wiki/database/guo-2025-rag-anything-all-in-one-rag.md`, `wiki/database/hkuds-rag-anything.md`. LightRAG 계열은 **KG entity·relation을 vector + structure로 retrieval**, PageIndex는 **TOC tree에서 LLM reasoning만으로 retrieval**. 동일한 "long-document RAG에서 vector-only 한계 극복" 모티프지만 해결 전략이 그래프 vs 트리로 갈린다.
- **본 wiki 내 합성 페이지** — `wiki/overviews/lightrag-family-graph-rag-overview.md`(graph-based 축). PageIndex는 graph-based가 아닌 **structure-based(=document-native tree)** 라는 점에서 별개 가지로 묶을 수 있다.
- **FinanceBench** (Islam et al., arXiv 2311.11944) — long-document financial QA 벤치마크. 본 wiki에 미수록.
- **AlphaGo (Silver et al., 2016, Nature)** — README가 "Inspired by AlphaGo"라며 *tree search* 메타포 출처로 명시. 본 wiki에 미수록.
- **OpenAI Agents SDK** — `examples/agentic_vectorless_rag_demo.py` 가 의존하는 agent 프레임워크. 본 wiki에 미수록.
- **LiteLLM** — `requirements.txt`의 `litellm==1.83.7`. multi-provider LLM 호출 래퍼. 본 wiki에 미수록.

## 7. 용어집 (Glossary)

- **Vectorless RAG**: vector DB · embedding similarity 검색 없이 LLM의 reasoning만으로 retrieval을 수행하는 RAG 패러다임. PageIndex의 자기정체.
- **PageIndex Tree**: 문서 1개에 대응하는 hierarchical JSON. 각 노드 = `{title, node_id, start_index, end_index, summary, nodes[]}`. `start_index`/`end_index`는 **1-indexed physical page number**(MD에서는 line number).
- **TOC detector / extractor / transformer**: 각각 (1) 페이지가 TOC인지 판단, (2) TOC 텍스트 추출, (3) 추출된 TOC를 nested JSON으로 변환하는 LLM step.
- **physical_index**: 트리 노드가 가리키는 실제 PDF 페이지 번호. TOC에 인쇄된 페이지번호(`detect_page_index`)와 본문 시작 페이지(`add_page_offset_to_toc_json` 로 offset 보정) 사이의 차이를 다룬다.
- **Tree thinning** (MD 전용): heading은 살아있지만 본문이 거의 없는 작은 노드를 인접 노드와 병합해 트리를 축소하는 후처리. `min_token_threshold`(default 5000)로 제어.
- **`PageIndexClient`**: `pageindex/client.py` 클래스. 자체 호스팅 시 doc 메타데이터/저장 워크플로우를 일관되게 제공하는 래퍼. cloud API와 시그니처 호환.
- **Agentic vectorless RAG**: OpenAI Agents SDK 같은 agent framework에서 `get_document`/`get_document_structure`/`get_page_content` 3개 tool을 노출하고 LLM이 "구조 본 다음 좁은 범위 호출" 패턴으로 답변하는 워크플로우. README가 강조하는 latest 패턴.
- **Mafin 2.5**: 같은 팀의 finance RAG 시스템. PageIndex가 retrieval layer 역할.
