---
title: "sguys99/langchain-study/medium/3.vectorless-rag: Vectorless RAG (PageIndex 없이 직접 구현한 한글 reference)"
type: repo
year: 2026
category: database
source: sguys99-langchain-study-vectorless-rag.md
raw_path: raw/repos/sguys99-langchain-study-vectorless-rag.md
raw_filename: "sguys99-langchain-study-vectorless-rag.md"
source_collection: external
org: sguys99
repo: langchain-study (medium/3.vectorless-rag)
url: https://github.com/sguys99/langchain-study/tree/main/medium/3.vectorless-rag
license: unspecified
tags:
  - vectorless-rag
  - pageindex
  - langgraph
  - pymupdf4llm
  - anthropic
  - document-tree
  - reasoning-based-retrieval
  - bigtable
  - tutorial
  - korean
---

## 요약 (Summary)

`sguys99/langchain-study` 모노레포 `medium/3.vectorless-rag` 서브디렉토리 — towardsai.net 글과 `alphaiterations/agentic-ai-usecases` 레포를 한글 주석·노트북·CLAUDE.md와 함께 재구성한 **PageIndex API 의존성 0** vectorless RAG 학습용 reference 구현. `pymupdf4llm` 마크다운 변환 + 자체 스택 기반 파싱으로 `DocumentTree`를 *로컬에서 직접 빌드*하고, LangGraph `StateGraph` 4-노드(analyze · descend · retrieve · generate) + `MAX_DEPTH=5` · confidence<0.3 종료 라우팅 + Anthropic `claude-sonnet-4-6` (env `ANTHROPIC_MODEL` 단일 출처)로 트리를 탐색한다. Bigtable OSDI'06(13페이지) 데모에서 35개 L2 자식 노드 추출 후 단일 질의 = **4 LLM call(3 navigate + 1 answer) / 15.60s**. 동일 카테고리의 [[vectifyai-pageindex]] (OSS 라이브러리, FinanceBench 98.7%)·[[geeksforgeeks-2026-vectorless-rag-pageindex]] (Cloud SaaS API verbatim 튜토리얼)와 함께 vectorless RAG 3-구현체 비교 축을 완성한다 — *"PageIndex 없이 직접 만들 때 무엇이 필요한가"* 의 답.

## 주요 기여 (Key Contributions)

1. **PageIndex 의존성 0인 한글 reference 구현** — README가 명시적으로 *"PageIndex와 같이 바로 사용할 수 있는 솔루션도 있지만 이 구현에서는 파싱, 계층 구조, 메타데이터를 완전히 제어하기 위해 자체 트리를 구축"* 이라고 선언. [[vectifyai-pageindex]] (OSS)·[[geeksforgeeks-2026-vectorless-rag-pageindex]] (Cloud SaaS) 사이의 *세 번째 구현 축*.
2. **3-파일 분리 + single-source-of-truth 컨벤션** — `tree.py`(385줄, LLM-free 파서) / `retriever.py`(603줄, LangGraph 에이전트) / `main.py`(197줄, 오케스트레이션) / `questions.py`(데이터). `CLAUDE.md`에 *"단일 클라이언트 인스턴스"* + *"`retriever.DEFAULT_MODEL`이 모델명 단일 출처, 다른 곳에 하드코딩 금지"* 명문화.
3. **한글 주석 + 49셀 학습 노트북** — `tree.py`·`retriever.py` 모든 함수 한글 docstring + inline 주석. `notebooks/vectorless_rag_walkthrough.ipynb` (49 cells)가 환경 설정 → 트리 빌드 → 단일 질의 → 결과 분석을 단계별로 분리.
4. **observability-first 로깅** — dual handler logger(console INFO 들여쓰기 트리 요약 + file DEBUG `retriever.log` 전체 prompt/response/latency/token). README에 *"로깅은 선택 사항이 아니고 필수"* 라고 학습 포인트로 명시.
5. **LLM JSON 응답 안전 파싱** — `_strip_fences`로 ` ```json ... ``` ` 코드펜스 자동 제거 + JSON 파싱 실패 시 보수적 fallback decision(`should_descend = bool(node.children)`, 첫 자식으로 하강).

## 방법론 및 아키텍처 (Methodology and Architecture)

### 데이터 흐름

```
PDF → [tree.py:parse_pdf]
        ├─ pymupdf4llm.to_markdown (전체 마크다운)
        ├─ pymupdf4llm.to_markdown(page_chunks=True, write_images=False) (페이지 인덱스)
        └─ _build_tree_from_markdown
             ├─ 라인 순회: '#'개수 = level
             ├─ stack 기반 부모-자식 연결 (stack[-1][0] >= level → pop)
             ├─ _classify_heading (numbered/roman/letter/unnumbered/unknown 정규식 4종)
             ├─ _refine_page_boundaries (본문 100자 스니펫 ↔ 페이지 청크 매칭)
             └─ _distribute_content_to_leaves (헤더 노드 500자 초과 시 요약 축약)
        → DocumentTree(document_name, root, total_pages, source_path)

DocumentTree → results/document_tree.json (asdict + json.dump(default=str)) → 캐시

질문 → [retriever.py:retrieve]
        └─ LangGraph StateGraph
             ┌──────────────┐
             │   analyze    │ ← entry_point
             │ (LLM 1회)    │
             └──┬───────────┘
                │
                ├─ confidence < 0.3 ────────────────→ END
                ├─ depth >= MAX_DEPTH(5) ────────────→ retrieve
                ├─ should_descend & has children ──→ descend ─→ (analyze 재귀)
                └─ 그 외 ────────────────────────────→ retrieve ─→ generate (LLM 1회) ─→ END
        → {answer, path, reasoning, confidence, sources, call_log}

[main.py] PDF 다운로드 → get_tree() (캐시 우선) → generate_workflow_png() → for q in QUESTIONS: ask(q, tree)
```

### tree.py — `PyMuPDF4LLMTreeBuilder` (LLM-free)

- `TreeNode` dataclass: `id, title, level(0=root/1=chapter/2=section/3=subsection), page_start, page_end, content, children, heading_type, summary`
- 마크다운 라인 순회 → `#`개수로 level 결정 → 스택 `[(level, node)]` 운용:
  - 새 헤딩 도착 시 `while stack[-1][0] >= level: stack.pop()` (같거나 더 깊은 노드 닫음, 닫힌 자식 `page_end`를 부모에 반영)
  - 스택 top = 부모, 새 노드 append, 스택에 push
- 페이지 번호 추정: 1차로 라인 비율(`line_idx/total_lines * total_pages + 1`) → 2차로 `_refine_page_boundaries`가 본문 앞 100자 스니펫 ↔ `page_contents` 매칭으로 보정
- 부모 범위: 자식 있으면 `page_start = min(child.page_start)`, `page_end = max(child.page_end)` 재계산
- 헤더 역할 노드 본문 축약: `if len(node.content) > 500: node.content = node.content[:500] + "..."` (리프 노드는 보존)

### retriever.py — LangGraph 에이전트

**State** (TypedDict + `Annotated[List, operator.add]`로 3개 필드 누적):
- 누적: `path_taken`, `retrieved_content`, `call_log`
- 덮어쓰기: `query`, `current_node`, `tree`, `reasoning`, `confidence`, `should_descend`, `target_child_id`, `depth`, `final_answer`

**노드 4개**:

| 노드 | 입력 | LLM | 출력 |
|---|---|---|---|
| analyze | 현재 노드 + 자식 메타(`id`/`title`/`summary[:150]`) | 1회 (max_tokens=512, T=0) | `{confidence, should_descend, target_child_id, reasoning}` JSON |
| descend | `target_child_id` | 0 | `current_node` 교체 (못 찾으면 첫 자식 fallback) |
| retrieve | `current_node.content` | 0 | `=== **{title}** (Pages {s}-{e}) ===\n{content}` 청크 누적 |
| generate | 누적 `retrieved_content` | 1회 (max_tokens=2048, T=0) | `final_answer` (한글, 인용 + 근거 부족 시 명시 지시) |

**`_route` 분기 (analyze 다음)**:
- `confidence < 0.3` → END (낮은 확신도 종료)
- `depth >= 5` → retrieve (안전판)
- `should_descend && children` → descend → analyze 재귀
- else → retrieve

**엣지**: `descend → analyze` (재귀), `retrieve → generate`, `generate → END`

**`_call_llm` 공통 호출자**: header 로깅 + prompt DEBUG-only (콘솔 미출력) + `messages.create(model, max_tokens, temperature=0.0)` + raw response DEBUG + model/latency/token usage INFO 출력 + `(text, elapsed)` 반환.

**`_strip_fences`**: `text.split("```")` → 각 조각 lstrip `json` → `json.loads` 시도 → 첫 성공 조각 반환, 실패 시 원본 반환. analyze의 JSON 파싱 실패 시 fallback decision으로 `should_descend=bool(children), target_child_id=children[0].id`.

### main.py — 오케스트레이션

- `bigtable-osdi06.pdf` 자동 다운로드 (`urllib.request.urlretrieve`)
- `results/document_tree.json` 캐시 우선 (`dict_to_treenode` 재귀 복원, `data.get("root", data)`로 DocumentTree/TreeNode 양쪽 호환)
- `generate_workflow_png(output_path=results/workflow.png)` — 더미 노드(`lambda state: state`)로 동일 토폴로지 재구성 후 `draw_mermaid_png()` 렌더링
- `for q in QUESTIONS: ask(q, tree)` 순회 — 한 질문 실패해도 try/except로 다음 진행
- `ask`는 `[판단 근거] / [확신도] / [탐색 경로] / [출처] / [답변]` 5블록 콘솔 출력

## 결과 (Results)

> 자체 정량 벤치마크는 없다. README가 인용한 실행 추적 1개 + 트리 빌드 결과가 유일한 수치.

**단일 질의 실행 추적** (README, Bigtable PDF "Bigtable이란 무엇이며…?"):
```
Total LLM calls : 4  (3 navigate + 1 answer)
Total latency   : 15.60s
```
- depth 3 이하에서 종료 (MAX_DEPTH=5 미도달)

**트리 빌드 결과 (Bigtable OSDI'06, 13페이지)**:
- L1: 1개 (논문 제목)
- L2: **35개** (Abstract, 1 Introduction, 2 Data Model, Rows, Column Families, Timestamps, Architecture, Tablet Servers, Chubby, …)
- 트리 빌드 LLM 호출: **0회** (정규식 + 스택만 사용)
- 최초 파싱 약 10~30초 (CLAUDE.md 명시), 이후 캐시 즉시 로드

**활성 샘플 질문 1개 + 주석 7개** (`questions.py`):
- 활성 (사실 확인): `"Bigtable이란 무엇이며 어떤 문제를 해결하는가?"`
- 주석 (사실/추론/심화 3등급): data model vs RDBMS, Chubby의 역할, tablet server 장애·복구, compaction 전략, read/write 처리량, Google 내부 사용 사례, locality group ↔ column family 비교

**언급된 한계** (README "벡터리스 RAG의 실용적 측면" 절):
- 노드 세분화 trade-off (굵으면 정확도 ↓, 세분이면 LLM 호출 ↑)
- 탐색 깊이 vs 지연 (MAX_DEPTH 제한·confidence threshold 조정·불필요 탐색 방지 필요)
- 구조 품질 의존성 (깔끔한 제목 = 더 나은 탐색)
- 구조화 문서 한정 (논문·보고서·문서 ✓ / 로그·채팅 ✗)
- 의미론적 fallback 부재

**구현 한계** (코드 인스펙션):
- 라이선스 미명시 (pyproject·README·CLAUDE.md 모두) — 재사용 시 저자에게 확인 필요
- 표준 벤치 0개 (FinanceBench·HotpotQA 등 없음)
- 활성 질문 1개만 (7개 주석 처리, 사용자가 직접 unblock)
- backtrack 분기 미구현 (overview는 언급하지만 `_route`에 없음)
- 단일 PDF (`bigtable-osdi06.pdf` 하드코딩)
- pure vectorless (hybrid·graph 결합 없음)

## 관련 페이지 (Related Pages)

### Vectorless RAG 가족 (database/)

- [[database/vectifyai-pageindex|VectifyAI PageIndex (OSS)]] — `get_document`/`get_document_structure`/`get_page_content` 3-함수 API, LiteLLM 멀티 프로바이더, FinanceBench 98.7%. 본 구현은 PageIndex *개념*만 채택하고 라이브러리 미사용.
- [[database/geeksforgeeks-2026-vectorless-rag-pageindex|GeeksforGeeks Vectorless RAG 튜토리얼]] — PageIndex *Cloud SaaS* API(`PageIndexClient` → `submit_document` → 폴링 → `get_tree` → `submit_query` → `get_retrieval`) verbatim 10-step. 본 구현은 SaaS 대신 *로컬 직접 구축*.
- [[database/li-2026-beyond-semantic-similarity-rethinking-retrieval|DCI (Direct Corpus Interaction)]] — embedding/index 없이 agent가 `grep`·`bash`로 raw corpus 직접 검색, BrowseComp-Plus 80.0%. *tree navigation* 축 본 구현과 *shell tool* 축 DCI의 대비.

### Graph-based RAG (database/, overviews/)

- [[database/guo-2025-lightrag-simple-and-fast|LightRAG]] — KG entity·relation을 key-value로 직렬화 + dual-level keyword retrieval
- [[database/zhang-2026-leanrag-knowledge-graph-based-generation|LeanRAG]] — hierarchical KG + LCA retrieval
- [[database/guo-2025-rag-anything-all-in-one-rag|RAG-Anything]] — multimodal dual-graph (text + cross-modal)
- [[database/hkuds-rag-anything|HKUDS/RAG-Anything (repo)]] — RAG-Anything paper reference implementation
- [[overviews/lightrag-family-graph-rag-overview|LightRAG 계열 합성]] — Graph-based RAG family overview

### RAG 디자인 공간 정렬 (applications/)

- [[applications/pandey-2026-rag-is-no-longer-just|RAG is no longer just vector search + LLM (Pandey)]] — 2026 production RAG **5 design space**(Hybrid · Graph · Agentic · CRAG · Multimodal). 본 구현은 *Agentic* 축 단일.

### 동일 카테고리 — Embedding 진영 (대비축)

- [[database/shanbhogue-2026-gemini-embedding-2-native-multimodal|Gemini Embedding 2]] — Google DeepMind의 native multimodal embedder, MTEB Multilingual 69.9
- [[database/zhang-2026-your-embedding-model-is-smarter|SMART (Single-to-Multi Adaptation)]] — single-vector 모델에 MaxSim late-interaction을 얹는 training-free hybrid
