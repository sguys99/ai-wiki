---
title: "sguys99/langchain-study — medium/3.vectorless-rag (Vectorless RAG: A Reasoning-Based Document Retrieval System)"
type: repo
year: 2026
category: database
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

## 한 줄 요약 (One-line Summary)

sguys99(Kwang Myung Yu)의 `langchain-study` 모노레포 산하 `medium/3.vectorless-rag` 서브디렉토리 — towardsai.net 글과 alphaiterations 레포를 한글로 포팅·재구성한 **PageIndex API 의존성 0** vectorless RAG 학습용 구현. `pymupdf4llm`로 PDF → 마크다운 헤더 → 스택 기반 `DocumentTree` 직접 빌드 + LangGraph `StateGraph` 4-노드(analyze · descend · retrieve · generate) 에이전트 탐색, Anthropic `claude-sonnet-4-6` 기본. Bigtable OSDI'06(13페이지) 데모에서 35개 L2 자식 노드 추출 후 단일 질의가 **4 LLM call(3 navigate + 1 answer) / 15.60s** 완료. 노트북(`vectorless_rag_walkthrough.ipynb` 49셀) + 풍부한 한글 주석으로 [[vectifyai-pageindex]] (cloud SaaS)와 [[geeksforgeeks-2026-vectorless-rag-pageindex]] (튜토리얼) 사이에서 *"PageIndex 없이 직접 만들 때 무엇이 필요한가"* 의 답을 코드로 보여준다.

---

## 1. 자료 정보 (Document Information)

- **Repo 위치**: `sguys99/langchain-study` 모노레포의 `medium/3.vectorless-rag/` 서브디렉토리 (Medium 글 시리즈 3번째)
- **저자**: sguys99 (Kwang Myung Yu) — 본 ai-wiki 운영자 본인
- **최종 커밋**: 2026-06-02 16:39 KST (`47350865`, ":recycle: Update README.md")
- **언어 정책**: 코드 식별자·라이브러리는 영문 유지, 주석·문서·README·질문 모두 한글
- **자료 출처 (README에 명시)**:
  - https://pub.towardsai.net/vectorless-rag-how-i-built-a-rag-system-without-embeddings-databases-or-vector-similarity-efccf21e42ff
  - https://github.com/alphaiterations/agentic-ai-usecases/tree/main/advanced/vectorless-rag
- **라이선스**: `pyproject.toml`·`README.md`·`CLAUDE.md` 모두 라이선스 미명시 → unspecified
- **패키지 매니저·런타임**: uv + Python 3.12, `uv sync && uv run main.py`
- **핵심 의존성** (`pyproject.toml`): `anthropic>=0.105.2`, `langgraph>=1.2.2`, `pymupdf4llm>=1.27.2.3`, `pymupdf>=1.27.2.3`, `pydantic>=2.13.4`, `python-dotenv>=1.2.2`, `langchain>=1.3.2`, `langchain-anthropic>=1.4.4`, `langchain-openai>=1.2.2`, `openai>=2.38.0`, `ipykernel>=7.2.0`, `jupyter>=1.1.1` (langchain·openai 계열은 의존성으로 설치되지만 vectorless 핵심 경로는 anthropic SDK + langgraph만 사용)
- **데모 문서**: Google `bigtable-osdi06.pdf` (13페이지, 220KB), `main.py`가 부재 시 자동 다운로드 후 `bigtable-osdi06.pdf`로 저장
- **파일 구성** (총 1.1MB):
  ```
  3.vectorless-rag/
  ├── README.md         (28KB, 한글 본문)
  ├── overview.md       (12KB, 한글 아키텍처 설명)
  ├── CLAUDE.md         (8KB, Claude Code 에이전트 가이드)
  ├── main.py           (12KB, 진입점)
  ├── tree.py           (32KB, PDF → DocumentTree 빌더)
  ├── retriever.py      (32KB, LangGraph 에이전트 + 로깅)
  ├── questions.py      (4KB, 한글 샘플 질문 리스트)
  ├── pyproject.toml    (4KB)
  ├── uv.lock           (444KB)
  ├── bigtable-osdi06.pdf (220KB, 데모 문서)
  ├── notebooks/
  │   └── vectorless_rag_walkthrough.ipynb (49셀 단계별 학습)
  ├── results/
  │   ├── document_tree.json (트리 캐시, JSON, 약 35개 L2 노드 + 다수 L3)
  │   └── workflow.png       (LangGraph 그래프 시각화)
  └── img/
      └── 2.png         (비용/성능 비교 인포그래픽)
  ```

---

## 2. 주요 기여 (Key Contributions)

### 2-1. PageIndex 의존성 0인 한글 reference 구현

- README의 "구현" 절에서 명시: *"[PageIndex](https://github.com/VectifyAI/PageIndex)와 같이 바로 사용할 수 있는 솔루션도 있어 구조화된 문서 표현을 생성할 수 있음. 하지만 이 구현에서는 파싱, 계층 구조, 메타데이터를 완전히 제어하기 위해 자체 트리를 구축."*
- 즉 [[vectifyai-pageindex]] (PageIndex OSS, FinanceBench 98.7%)·[[geeksforgeeks-2026-vectorless-rag-pageindex]] (PageIndex Cloud SaaS API 튜토리얼)와 동일 카테고리지만 **PageIndex 라이브러리/SaaS 미사용**. `pymupdf4llm` 마크다운 변환 + 자체 정규식·스택 파싱으로 `DocumentTree`를 만든다.

### 2-2. 3-파일 분리 아키텍처 + 단일 책임

- `tree.py`: PDF → `DocumentTree` 구조화 (LLM 호출 0회)
- `retriever.py`: `DocumentTree` 탐색 → 답변 생성 (LangGraph + Anthropic)
- `main.py`: 오케스트레이션 (다운로드 → 트리 캐시 → 질문 순회)
- `questions.py`: 데이터 분리 (질문 리스트)

`CLAUDE.md`에 *"LLM 클라이언트는 `main.py`에서 단일 `anthropic.Anthropic` 인스턴스를 만들어 `retrieve()`로 전달… 호출마다 새 클라이언트를 만들지 마세요"*, *"사용 모델은 `retriever.DEFAULT_MODEL`(= 환경변수 `ANTHROPIC_MODEL`)이 단일 출처"*라고 명문화된 *single-source-of-truth* 컨벤션. 모델명 하드코딩 금지.

### 2-3. 한글 주석 + 노트북 walkthrough (학습 자료 가치)

- `tree.py` (385줄)·`retriever.py` (603줄) 모두 각 함수·블록마다 한글 주석. 예: `_route` 분기 4가지 케이스를 inline 주석으로 설명, `_call_llm`의 핸들러 2개(console INFO + file DEBUG) 의도 설명.
- `notebooks/vectorless_rag_walkthrough.ipynb` (49 cells) — 첫 셀에 *"`tree.py` · `retriever.py` · `main.py`로 구성된 **벡터 없는(vectorless) RAG** 데모를 **한 단계씩 직접 실행**하며 동작 원리를 이해하기 위한 학습 자료"* 라고 명시. 환경 설정 → API 클라이언트 → PDF 다운로드 → tree 빌드/캐시 → 단일 질의 → 결과 분석 순으로 셀 분리.

### 2-4. observability-first 로깅 설계

- `retriever.py` 64-87행에 dual handler logger 구성:
  - **console** (INFO): `┌─ Depth {depth} | Node: "{title}"` 들여쓰기 트리 + `↓ descend / → retrieve` 화살표 + 확신도·근거 한 줄
  - **file** (`retriever.log`, DEBUG): 전체 prompt + raw response + latency + token usage
- README "5. 로깅은 선택 사항이 아니고 필수" 절에 *"로그 없이 다음만 있다면 …성능 향상이 어렵다"* 라고 가시성을 학습 포인트로 명시.

### 2-5. JSON 코드펜스 안전 파싱 (`_strip_fences`)

- LLM이 ` ```json … ``` ` 펜스로 감싸 응답하는 일반 케이스 대응. `text.split("```")` → 각 조각 lstrip `json` → `json.loads` 시도 → 첫 유효 조각 반환, 실패 시 원본 그대로 반환. 펜스 미사용 ↔ 사용 둘 다 커버.
- 추가로 `analyze_node`의 JSON 파싱 실패 시 fallback decision (`should_descend: bool(node.children)`, `target_child_id: node.children[0].id if node.children else None`) — 노드가 자식 있으면 첫 자식으로 보수적으로 하강.

---

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3-1. tree.py — PyMuPDF4LLMTreeBuilder (LLM-free)

**클래스**:
- `TreeNode` (dataclass): `id`, `title`, `level` (0=루트, 1=챕터, 2=섹션, 3=하위), `page_start`, `page_end`, `content`, `children`, `heading_type`, `summary`. `to_dict()`로 미리보기 200자까지 자른 직렬화 지원.
- `DocumentTree` (dataclass): `document_name`, `root`, `total_pages`, `source_path`. `print_tree()`로 들여쓰기 + 레벨별 아이콘(📑📖📄📝) 콘솔 출력.
- `PyMuPDF4LLMTreeBuilder`: `max_content_length=8000` 기본.

**`parse_pdf(pdf_path)` 흐름**:
1. `pymupdf4llm.to_markdown(pdf_path)`로 레이아웃 보존 마크다운 전체 추출
2. `pymupdf4llm.to_markdown(pdf_path, page_chunks=True, write_images=False, embed_images=False)`로 페이지 단위 청크 별도 추출 → `page_contents: Dict[int, str]` 인덱스 생성
3. `_build_tree_from_markdown(full_md, page_contents, doc_name)` 호출 → root 반환
4. 결과: `DocumentTree(document_name=stem, root, total_pages, source_path)`

**`_build_tree_from_markdown` 스택 기반 파서**:
- `stack = [(0, root)]`로 시작, `current_content_lines` 버퍼에 본문 누적
- 라인 순회하며 `stripped.startswith('#')` 만나면:
  1. `flush_content()` — 직전까지 누적된 본문을 `stack[-1]` 노드에 `\n\n` 구분으로 append, `summary` 미설정이면 첫 문단 300자로 자동 채움
  2. level = `#` 개수 (`len(stripped.split()[0])`)
  3. title = `stripped.lstrip('#').strip()`
  4. heading_type = `_classify_heading(title)` (numbered/roman/letter/unnumbered/unknown)
  5. page_num = `_estimate_page_number(i, len(lines), max_pages)` (라인 비율 × 전체 페이지 + 1, 후속 단계에서 보정)
  6. `node_id = f"{title_slug[:20]}_{i}"` (제목 슬러그 + 라인 번호)
  7. `while stack[-1][0] >= level: stack.pop()` — 새 헤딩과 같거나 더 깊은 노드들을 닫고, 닫힌 자식의 `page_end`를 부모에 반영
  8. `stack[-1][1].children.append(new_node)` — 스택 top을 부모로 새 노드 연결
  9. `stack.append((level, new_node))` — 새 노드를 현재 경로로 push
- 헤딩 분류 정규식 4종:
  - `numbered_section`: `^(?:\d+\.)+\s+(.+)$` (1. , 2.3.1)
  - `roman_section`: `^(?:[IVX]+)\.?\s+(.+)$` (I. , II.)
  - `letter_section`: `^([A-Z])\.\s+(.+)$` (A. , B.)
  - `unnumbered_heading`: `^([A-Z][a-zA-Z\s]{3,50})$` (Abstract, Conclusion)
- 후처리:
  - `_refine_page_boundaries(root, page_contents)`: 본문 앞 100자 스니펫이 어느 페이지 청크에 포함되는지 매칭하여 `page_start/page_end` 보정. 자식 있으면 `min(child.page_start)~max(child.page_end)`로 부모 범위 갱신
  - `_distribute_content_to_leaves(node)`: 자식 있는 (헤더 역할) 노드는 본문 500자 초과 시 요약으로 축약. 리프 노드는 본문 보존.

**실제 출력 (Bigtable 트리)**:
- L0 root: `bigtable-osdi06.pdf` (p1-13, 1 child)
- L1: `**Bigtable: A Distributed Storage System for Structured Data**` (p1-13, **35 children**)
- L2 자식 일부: Abstract, 1 Introduction, 2 Data Model, Rows, Column Families, Timestamps, …

### 3-2. retriever.py — LangGraph 에이전트

**State**:
```python
class RetrievalState(TypedDict):
    query: str
    current_node: Optional[TreeNode]
    tree: TreeNode  # 또는 DocumentTree (.root로 자동 추출)
    path_taken: Annotated[List[str], operator.add]        # 누적
    retrieved_content: Annotated[List[str], operator.add] # 누적
    reasoning: str
    confidence: float
    should_descend: bool
    target_child_id: Optional[str]
    depth: int
    final_answer: Optional[str]
    call_log: Annotated[List[dict], operator.add]         # 누적
```

`operator.add` 어노테이션 3개로 LangGraph가 노드 반환값을 *덮어쓰지 않고 누적*하게 설정. 나머지는 일반 덮어쓰기.

**4-노드 StateGraph**:
- **analyze** (`_make_analyze`): 현재 노드(없으면 tree.root) + 자식 메타데이터(`id`/`title`/`summary[:150]`) 추출 → 한글 프롬프트로 `{confidence, should_descend, target_child_id, reasoning}` JSON 요청 (max_tokens=512, temperature=0.0). `_strip_fences` 후 `json.loads`, 실패 시 fallback. depth +1 반환.
- **descend** (`_make_descend`): `target_child_id` 매칭 자식으로 `current_node` 교체 (못 찾으면 첫 자식 fallback)
- **retrieve** (`_make_retrieve`): `=== **{title}** (Pages {start}-{end}) ===\n{content}` 헤더 붙은 청크를 `retrieved_content`에 누적
- **generate** (`_make_generate`): 모든 청크를 `\n\n---\n\n` 구분으로 합쳐 컨텍스트 구성, 한글 프롬프트로 *"수집된 문서 구간만을 근거로 질문에 답… 모든 주장에 섹션 제목과 페이지 범위를 인용… 근거 부족하면 추측 말고 그렇다고 명확히 밝히세요"* 요청 (max_tokens=2048). 답변 한글.

**`_route` 조건부 분기 (analyze → descend/retrieve/end)**:
```python
MAX_DEPTH = 5
def _route(state):
    if state["confidence"] < 0.3:             return "end"       # 낮은 확신도 → 종료
    if state["depth"] >= MAX_DEPTH:           return "retrieve"  # 최대 깊이 → 수집
    if state["should_descend"] and state["current_node"].children:
        return "descend"                                          # 내려가기
    return "retrieve"                                             # 그 외 → 수집
```

**고정 엣지**: `descend → analyze` (재귀), `retrieve → generate`, `generate → END`

**공개 API**:
- `retrieve(query, tree, client=None, model=None) → Dict` — initial state 구성 후 `graph.invoke`. 반환: `{answer, path, reasoning, confidence, sources, call_log}`. client 미전달 시 `anthropic.Anthropic()` 자동 생성, model 미전달 시 `DEFAULT_MODEL`(env `ANTHROPIC_MODEL`, 기본 `claude-sonnet-4-6`).
- `generate_workflow_png(output_path="workflow.png") → str` — 더미 노드(`lambda state: state`)로 동일 토폴로지 재구성 후 `graph.draw_mermaid_png()`로 PNG 렌더링.

**`_call_llm` 공통 호출자**:
- header 로깅 (call number + type)
- prompt 전체는 DEBUG → file only (콘솔 미출력, 가독성)
- `client.messages.create(model, max_tokens, temperature=0.0, messages=[{"role":"user","content":prompt}])`
- 응답 첫 텍스트 블록 추출·strip
- raw response DEBUG → file, model/latency/token usage INFO → console
- 반환: `(raw_text, elapsed_seconds)`

### 3-3. main.py — 오케스트레이션

- `PDF_URL = "https://static.googleusercontent.com/media/research.google.com/en//archive/bigtable-osdi06.pdf"`
- `download_pdf()`: 부재 시 `urllib.request.urlretrieve`로 다운로드
- `get_tree()`: `results/document_tree.json` 캐시 우선 로드 (`dict_to_treenode`로 재귀 복원, `data.get("root", data)`로 DocumentTree/TreeNode 양쪽 호환). 부재 시 `parse_pdf` 후 `asdict + json.dump(default=str)`로 캐시
- 워크플로 PNG도 `results/workflow.png`에 저장
- `for question in QUESTIONS: ask(question, tree)` 순회, 실패해도 다음 질문 진행 (try/except + ok 플래그)
- 마지막에 `완료: 전체 N개 중 ok개 질문 답변 성공` 요약

`ask(question, tree)`는 콘솔에 `[판단 근거] / [확신도] / [탐색 경로] / [출처] / [답변]` 5블록 출력.

---

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

> 자체 정량 벤치마크는 없다. README가 인용한 **실행 추적(execution trace) 1개 예시**가 유일한 수치:

```
Total LLM calls : 4  (3 navigate + 1 answer)
Total latency   : 15.60s
```

- 즉 Bigtable 데모에서 단일 질의 = navigate 3회(root → 1 Introduction → 어느 하위 노드) + answer 1회. depth 3 이하에서 종료된 것으로 추정 (MAX_DEPTH=5 미도달).
- **트리 빌드 결과 (Bigtable PDF, 13페이지)**:
  - L1 노드 1개 (논문 제목)
  - L2 노드 **35개** (Abstract / 1 Introduction / 2 Data Model / Rows / Column Families / Timestamps / 등)
  - 트리 빌드는 LLM 호출 0회 (`PyMuPDF4LLMTreeBuilder`는 정규식·스택만 사용)
  - 최초 파싱 약 10~30초 (`CLAUDE.md`), 이후 `results/document_tree.json` 캐시 즉시 로드
- **샘플 질문** (`questions.py`, 1개 활성 + 7개 주석):
  - 활성: `"Bigtable이란 무엇이며 어떤 문제를 해결하는가?"` (사실 확인, 단일 섹션)
  - 주석된 추가 질문 7개는 사실/추론/심화 3등급 분류:
    - 사실 확인: data model vs RDBMS, Chubby의 역할
    - 추론·복수 섹션: tablet server 장애/복구, compaction 전략, read/write 처리량 동시 달성
    - 심화·교차 섹션: Google 내부 사용 사례별 요구사항, locality group ↔ column family 비교

비교 표 (README의 ‘Vector RAG vs Vectorless RAG’ 절):

| 측면 | Vector RAG | Vectorless RAG (이 구현) |
|---|---|---|
| 청킹 | 고정 512토큰 (맥락 손실) | 자연스러운 섹션 (구조 보존) |
| 임베딩 | 모든 청크 임베딩 필요 (고비용) | 없음 (트리 구조만) |
| 검색 품질 | 유사도 매칭 | LLM 추론 (맥락 이해) |
| 인용 | 모호한 청크 ID | 페이지 범위 + 섹션 제목 |
| 멀티홉 | 재랭킹 없이 자주 실패 | 여러 섹션 자연 처리 |
| 환각 | 높음 (의미 표류) | 낮음 (전체 섹션 근거) |
| 비용 | 지속적 임베딩 비용 | 일회성 트리 구축 |

> 단 위 표는 일반적 vectorless RAG 비교이며, 본 구현으로 벤치마크 측정한 것은 아니다.

---

## 5. 한계와 향후 과제 (Limitations and Future Work)

### 5-1. 명시된 한계 (README 본문)

- **노드 세분화 trade-off**: 너무 굵으면(큰 섹션) 정확도 ↓, 너무 세분(아주 작은 단위)이면 LLM 호출 증가. README: *"균형 잡힌 계층 구조(섹션 → 하위 섹션 → 리프)가 가장 효과적"*
- **탐색 깊이 vs 지연**: navigate 1회당 latency 누적. 실제 시스템은 *"최대 깊이 제한 / 중지 임계값(신뢰도) 조정 / 불필요한 탐색 방지"* 필요. 본 구현은 MAX_DEPTH=5, confidence<0.3 = 종료로 대응.
- **구조 품질 의존성**: 깔끔한 제목 → 더 나은 탐색, 노이즈 많은 PDF → 불확실한 traversal, 계층 누락 → 평면적 검색. *"우수한 파싱(레이아웃 + 헤더)에 투자하는 것은 검색 품질에 직접적인 영향"*
- **구조화 문서 한정**: 논문·보고서·문서에 적합, 로그·채팅·비정형 텍스트엔 부적합
- **의미론적 fallback 부재**: 올바른 정보가 명확히 정의된 섹션에 없으면 시스템은 *"의미론적 대체 방안"* 없음

### 5-2. 구현 한계 (코드 인스펙션)

- **라이선스 미명시** — `pyproject.toml`·`README.md`·`CLAUDE.md` 어디에도 라이선스 정보 없음. 모노레포 루트도 확인되지 않음. 인용·재사용 시 저자(sguys99)에게 직접 확인 필요.
- **벤치마크 부재** — FinanceBench·HotpotQA 등 표준 벤치 없음. README 인용 latency 15.60s/Bigtable 1질의도 단일 trace로 통계적 신뢰 구간 없음.
- **샘플 질문 1개만 활성** — `questions.py`의 8개 중 7개가 주석 처리. 다양한 질문 유형(사실/추론/심화) 검증은 사용자가 직접 주석 해제해야 함.
- **에이전트 backtrack 미구현** — overview.md에서 *"되돌아가기(backtrack)"*를 언급하지만 `_route`에는 backtrack 분기 없음 (낮은 확신도는 종료, 자식 없으면 retrieve). 잘못 내려간 경우 복구 불가.
- **단일 PDF 대상** — `main.py`가 `bigtable-osdi06.pdf`를 하드코딩. 다른 PDF로 바꾸려면 `PDF_URL` + `PDF_PATH` 수정 필요. 멀티 문서 지원 없음.
- **벡터/하이브리드 결합 없음** — pure vectorless. [[pandey-2026-rag-is-no-longer-just]]의 5개 디자인 공간(Hybrid·Graph·Agentic·CRAG·Multimodal) 중 Agentic 단일 축만 다룬다.

### 5-3. README가 권하는 향후 개선

- 명확한 instruction prompt 설계 — "should_descend" 정의 한 줄 변경만으로도 결과에 큰 영향
- 로깅 활용 — *"로그 없이는 성능 향상이 어렵다"*
- 콘텐츠 구성을 시스템 설계 일부로 — 문서 자체가 정리되어 있어야 효과

---

## 6. 관련 연구 (Related Work)

### Vectorless RAG 가족

- [[vectifyai-pageindex]] — VectifyAI의 PageIndex OSS. FinanceBench 98.7%, LiteLLM 멀티 프로바이더, `get_document`/`get_document_structure`/`get_page_content` 3-함수 API. 본 구현은 PageIndex *개념*은 따르되 라이브러리 미사용.
- [[geeksforgeeks-2026-vectorless-rag-pageindex]] — PageIndex *Cloud SaaS* API(`submit_document` → 폴링 → `get_tree` → `submit_query` → `get_retrieval`) verbatim 튜토리얼. 본 구현은 SaaS 대신 *로컬 직접 구축*.
- [[li-2026-beyond-semantic-similarity-rethinking-retrieval]] — DCI(Direct Corpus Interaction) 논문. embedding/index 없이 agent가 `grep`·`bash`로 raw corpus 직접 검색, BrowseComp-Plus 80.0%. 본 구현은 *tree navigation* 축, DCI는 *shell tool* 축.

### Graph-based RAG 가족

- [[guo-2025-lightrag-simple-and-fast]] — KG entity·relation을 key-value로 직렬화, dual-level keyword retrieval
- [[zhang-2026-leanrag-knowledge-graph-based-generation]] — GMM-BIC hierarchical KG + LCA retrieval
- [[guo-2025-rag-anything-all-in-one-rag]] — multimodal cross-modal KG
- [[hkuds-rag-anything]] — 위 paper의 reference implementation

### 디자인 공간 정렬

- [[pandey-2026-rag-is-no-longer-just]] — 2026 production RAG 5 design space(Hybrid·Graph·Agentic·CRAG·Multimodal). 본 구현은 Agentic 축 단일 구현.

### 합성 페이지

- [[lightrag-family-graph-rag-overview]] — LightRAG 계열 합성

### 의존 라이브러리

- `pymupdf4llm` (Artifex) — PDF → LLM 친화 마크다운, layout-aware
- `langgraph` (LangChain) — StateGraph 기반 에이전트 워크플로
- `anthropic` Python SDK — Claude API 클라이언트

### 데모 대상 논문

- Chang et al., "Bigtable: A Distributed Storage System for Structured Data", **OSDI'06**, Google. 13페이지, distributed storage system 고전.

### 학습 자료 출처 (README 인용)

- *Vectorless RAG: How I Built a RAG System Without Embeddings, Databases, or Vector Similarity* — pub.towardsai.net 글
- `alphaiterations/agentic-ai-usecases` repo의 `advanced/vectorless-rag` (원본 코드 베이스)

---

## 7. 용어집 (Glossary)

- **Vectorless RAG** — 임베딩·벡터 DB 없이 문서 구조(목차/계층)와 LLM 추론으로 retrieval 수행하는 패러다임. 본 구현·[[vectifyai-pageindex]]·[[geeksforgeeks-2026-vectorless-rag-pageindex]] 모두 동일 개념. 별칭: Reasoning-based retrieval.
- **DocumentTree** — `tree.py`에서 정의한 PDF의 계층적 표현 자료구조. `TreeNode`(id/title/level/page_start/page_end/content/children/summary)의 재귀 구조 + 메타데이터(document_name/total_pages/source_path).
- **TreeNode** — DocumentTree 한 단위. level 0=root, 1=chapter, 2=section, 3=subsection. `heading_type`은 numbered/roman/letter/unnumbered/unknown/root/page 분류.
- **PyMuPDF4LLM** — Artifex가 만든 PyMuPDF의 LLM 친화 래퍼. `to_markdown(pdf, page_chunks=True)`로 페이지별 마크다운 분리 추출. 본 구현의 핵심 의존성.
- **LangGraph StateGraph** — LangChain의 그래프 기반 에이전트 프레임워크. `add_node`/`add_edge`/`add_conditional_edges`/`compile` API. 본 구현은 4-node graph.
- **`Annotated[List[X], operator.add]`** — TypedDict 필드에 누적(append) 의미 부여하는 LangGraph 컨벤션. 노드가 반환한 리스트가 *덮어쓰지 않고* 기존 리스트에 더해짐. 본 구현의 `path_taken`/`retrieved_content`/`call_log`에 사용.
- **MAX_DEPTH (=5)** — 트리 무한 하강 방지 안전판. `retriever.py:433`
- **confidence threshold (=0.3)** — `_route`의 종료 조건. `state["confidence"] < 0.3 → END`. `analyze_node`의 LLM이 반환하는 0~1 값.
- **navigate call / answer call** — 본 구현 로깅 분류. `_call_llm`의 `call_type` 파라미터로 구분. navigate는 max_tokens=512, answer는 max_tokens=2048.
- **`_strip_fences`** — LLM JSON 응답의 ` ```json ... ``` ` 코드펜스 제거 헬퍼. 펜스 조각마다 `json.loads` 시도해 첫 유효 조각 반환.
- **dual handler logging** — console INFO(요약) + file DEBUG(전체 prompt/response). `retriever.log`로 모든 LLM 호출 추적 가능.
- **single source of truth (모델명)** — `retriever.DEFAULT_MODEL`(= env `ANTHROPIC_MODEL`)이 유일한 모델 지정 지점. `main.py`·`tree.py`·notebook 어디에도 모델명 하드코딩 금지.
- **uv** — Astral의 Python 패키지 매니저 (pip 대체). `uv sync`로 `uv.lock` 기반 결정론적 설치, `uv run main.py`로 venv 자동 활성화.
- **Bigtable (OSDI'06)** — 본 데모 대상. Google의 distributed storage system 고전 논문, 13페이지, 35개 L2 섹션(Abstract/Introduction/Data Model/Rows/Column Families/Timestamps/Architecture/Tablet Servers/Chubby/…).
- **`bigtable-osdi06.pdf`** — `main.py`가 자동 다운로드하는 데모 PDF. URL: `https://static.googleusercontent.com/media/research.google.com/en//archive/bigtable-osdi06.pdf`
- **`results/document_tree.json`** — 트리 캐시. JSON 직렬화(`asdict + default=str`)로 저장, 다음 실행 시 `dict_to_treenode`로 재귀 복원.
- **`results/workflow.png`** — `generate_workflow_png()`가 만드는 LangGraph 토폴로지 시각화. 더미 노드(`lambda state: state`)로 동일 그래프 재구성 후 `draw_mermaid_png()`로 렌더링.
