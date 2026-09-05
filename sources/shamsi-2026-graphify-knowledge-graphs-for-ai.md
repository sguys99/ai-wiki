---
title: "Graphify — Knowledge Graphs for AI Coding Assistants"
type: article
year: 2026
category: applications
raw_path: raw/articles/shamsi-2026-graphify-knowledge-graphs-for-ai.md
raw_filename: "shamsi-2026-graphify-knowledge-graphs-for-ai.md"
source_collection: external
author: "Safi Shamsi"
url: "https://graphify.net/kr/"
publisher: "Graphify (graphify.net)"
tags: [knowledge-graph, code-intelligence, ai-coding-assistant, tree-sitter, networkx, leiden, mcp, claude-code, rag-alternative, multi-modal]
---

## 한 줄 요약 (One-line Summary)

Graphify는 코드·문서·논문·다이어그램을 Tree-sitter AST와 LLM 의미 추출로 NetworkX 지식 그래프에 모으고 Leiden 커뮤니티 탐지로 군집화해, Claude Code·Codex·OpenCode 같은 AI 코딩 어시스턴트가 멀티모달 코드베이스를 70배 토큰 효율로 탐색하게 해주는 MIT 라이선스 오픈소스 스킬이다.

## 1. 자료 정보 (Document Information)

- **자료 유형**: Article (제품 랜딩 페이지, https://graphify.net/kr/)
- **URL의 lang 속성**: `ko`이지만 본문은 영어 (한국어 사용자를 겨냥한 영문 페이지)
- **유지보수자**: Safi Shamsi
- **GitHub**: github.com/safishamsi/graphify (3.7k+ stars, 2026-06 기준 페이지 명기치)
- **PyPI**: 패키지명 `graphifyy`, CLI 명령은 `graphify`
- **라이선스**: MIT (의존성 NetworkX BSD, Tree-sitter MIT — 모두 permissive)
- **런타임 요구**: Python 3.10+
- **수집 일자**: 2026-06-08

## 2. 주요 기여 (Key Contributions)

1. **AI 코딩 어시스턴트용 멀티모달 지식 그래프 스킬**을 단일 패키지로 묶었다. Claude Code, OpenAI Codex, OpenCode가 `/graphify`, `/graphify query`, `/graphify path`, `/graphify explain` 슬래시 커맨드로 직접 호출하도록 `skill-*.md` manifest를 제공한다.

2. **Vector RAG 없이 동작하는 코드 이해 파이프라인**을 내놓았다. embedding이나 vector store를 쓰지 않고 Tree-sitter 정적 분석(AST·call graph·docstring), LLM 의미 추출(prose 개념), 비전 모델(다이어그램)로 노드와 엣지를 만든 뒤 Leiden 알고리즘으로 의미 커뮤니티를 찾는다.

3. **검증된 토큰 절감 효과**를 워크드 예제로 보였다.
   - httpx (Python 6파일): 144 노드 · 330 엣지 · 6 커뮤니티. god node = `Client`, `AsyncClient`, `Response`, `Request`. surprise edge = `DigestAuth → Response`.
   - Karpathy mixed corpus (GPT 프레임워크 repo 3개 + attention 논문 5편 + 다이어그램 4개, ~52 파일 · ~92k words): 285 노드 · 340 엣지 · 53 커뮤니티. 쿼리당 평균 ~1.7k 토큰 vs naive ~123k 토큰 → **71.5× 토큰 감축**.
   - ~500k word 코퍼스에서도 BFS subgraph 쿼리가 ~2k 토큰 수준을 지킨다(naive ~670k). 압축률이 규모에 따라 유지된다는 뜻이다.

4. **프라이버시·보안 기본값**을 설계 단계부터 박았다. 원본 소스 파일은 외부 모델로 보내지 않고 의미 기술(semantic descriptions)만 전송한다. telemetry 없음. URL은 http/https만 허용하고, 다운로드 크기·타임아웃 제한, 출력 경로 containment 검사, 노드 라벨 HTML-escape로 SSRF·Cypher 인젝션·XSS를 막는다.

5. **확장 가능한 다단계 파이프라인 아키텍처**를 모듈로 분리했다. detect → extract → build → cluster → analyze → report → export 각 단계가 독립 모듈이라 기여자가 단계별로 확장한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 파이프라인 7단계

```
detect   — collect files (파일 수집)
extract  — AST + LLM nodes/edges (Tree-sitter + LLM 의미 추출)
build    — NetworkX graph (그래프 구성)
cluster  — Leiden communities (의미 군집)
analyze  — god nodes & surprises (중심 노드·이상 엣지)
report   — GRAPH_REPORT.md (사람이 읽는 감사 리포트)
export   — HTML / JSON / Obsidian (시각화·쿼리 가능 산출물)
```

### 지원 모듈

| 모듈 | 역할 |
|---|---|
| `ingest.py` | URL fetching |
| `cache.py` | semantic caching (증분 캐시) |
| `security.py` | input validation (SSRF·XSS 방지) |
| `watch.py` | live updates (파일 변경 감시) |
| `serve.py` | MCP-protocol service (Model Context Protocol 서버) |

### 추출 입력 (멀티모달)

- **코드**: `.py`, `.js`, `.go`, `.java` 등 — Tree-sitter가 19개 언어를 로컬에서 파싱 (LLM 호출 없음)
- **문서**: Markdown
- **논문**: PDF
- **다이어그램**: 이미지 (vision 모델로 판독)

### 출력 산출물

```
graphify-out/
├── graph.html        # 인터랙티브 시각화
├── GRAPH_REPORT.md   # 핵심 노드·서프라이즈·추천 질문
├── graph.json        # 영속 쿼리 가능한 그래프
└── cache/            # 증분 캐시
```

### LLM 분리 설계

Graphify는 자체 LLM을 번들링하지 않는다. AI 코딩 어시스턴트가 이미 설정해둔 모델 API 키를 그대로 쓰고, 외부로 나가는 호출은 의미 추출 단계 하나뿐이다. 이때도 원본 소스 코드가 아니라 의미 기술만 전송한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

| 코퍼스 | 입력 규모 | 그래프 규모 | 토큰 비용 (쿼리당) | 절감률 |
|---|---|---|---|---|
| httpx | 6 Python 파일 | 144 노드 · 330 엣지 · 6 커뮤니티 | — (감사 예시) | — |
| Karpathy mixed | 3 repos + 5 papers + 4 diagrams (~52 files, ~92k words) | 285 노드 · 340 엣지 · 53 커뮤니티 | ~1.7k vs naive ~123k | **71.5×** |
| 대규모 코퍼스 | ~500k words | (페이지 미공개) | ~2k vs naive ~670k | **~335×** (보존 확인용) |

추가 정성적 결과:
- **god node 식별**: httpx에서 `Client`, `AsyncClient`, `Response`, `Request`처럼 시스템 중심에 자리한 최고 degree 노드를 자동으로 뽑는다.
- **Surprise edge 검출**: 같은 코퍼스에서 `DigestAuth → Response` 같은 예상 외 cross-file 연결을 플래그해 검토 대상으로 올린다.

### 비교 (Comparison)

| Project | 초점 | 강점 | Graphify 대비 한계 |
|---|---|---|---|
| Sourcegraph | Cross-repo 코드 검색 | 엔터프라이즈급 내비게이션 | knowledge graph 아님, 설계 의미 한정적 |
| Code2Vec | 함수 단위 embedding | 벡터 검색·분류 | 그래프 구조 없음, 멀티모달 입력 불가 |
| Neo4j | 범용 그래프 DB | Cypher 쿼리 강력 | 코드 자체로부터 그래프를 생성하지 않음 |

## 5. 한계와 향후 과제 (Limitations and Future Work)

페이지 본문이 명시한 한계는 거의 없고, 대신 비교 표에서 인접 도구들의 약점을 부각한다. 본문에서 추정 가능한 한계는 다음과 같다 (페이지 직접 명기 ❌ — 독자 추론):

- **단일 메인테이너 구조**: Safi Shamsi 단독 유지보수. 장기 유지보수성과 반응 속도는 컨트리뷰터 풀에 달려 있다.
- **LLM 의존**: AST 단계는 LLM-free지만 prose·diagram 의미 추출 단계는 외부 모델 API 키가 필수다. 토큰 비용과 지연시간은 사용자가 부담한다.
- **그래프 정확도 검증치 미공개**: god node·surprise edge가 "보고된 사례에서 유의미했다"는 정성 평가만 보이고, 정량 평가(precision/recall)는 페이지 본문에 없다.
- **19개 언어 지원**: Tree-sitter 의존이라 지원 언어는 Tree-sitter grammar 가용성에 묶인다.

향후 과제로 페이지가 직접 약속한 항목은 없고, "Learn more" 섹션의 6개 심화 가이드 링크(아래)가 차후 분석의 분기점이다.

## 6. 관련 연구 (Related Work)

페이지가 직접 인용한 인접 프로젝트와 향후 분석 후보:

### 페이지 비교 대상

- **Sourcegraph** — cross-repo code search (엔터프라이즈)
- **Code2Vec** — function-level embedding
- **Neo4j** — general-purpose graph database

### 본 wiki 기존 자료와의 연결 (담당자 큐레이션 후보)

- **GraphRAG** (Edge 2024, Microsoft Research) — `wiki/database/edge-2024-from-local-to-global.md`. Graphify와 마찬가지로 knowledge graph + community detection을 쓰지만 대상이 **문서 corpus**이지 코드는 아니다. Graphify는 이 패턴을 코드 도메인으로 옮긴 사례다.
- **LightRAG** (Guo 2025) — `wiki/database/guo-2025-lightrag-simple-and-fast.md`. 경량 graph-based RAG. Graphify가 코드 특화라면 LightRAG는 일반 문서 특화다.
- **PageIndex** (Kalane 2026) — `wiki/database/kalane-2026-pageindex-threw-out-vector-databases.md`. "vector DB 없는 RAG" 계보. Graphify의 "no embeddings required" 주장과 같은 노선이다.
- **RAG-Anything** (Guo 2025) — `wiki/database/guo-2025-rag-anything-all-in-one-rag.md`. 멀티모달 RAG.

### 페이지 자체 심화 자료 (graphify.net/kr 하위 페이지)

1. *Knowledge Graphs for AI Coding Assistants* — 왜 구조적 그래프가 vector RAG보다 코드 이해에 낫는가
2. *Tree-sitter AST Extraction* — 19개 언어를 LLM 호출 없이 로컬에서 파싱하는 방법
3. *Leiden Community Detection* — embedding·vector store 없이 그래프 토폴로지만으로 군집
4. *Claude Code Integration* — CLAUDE.md 지시문과 PreToolUse hook
5. *CLI Command Reference* — `/graphify` 슬래시 명령 전체
6. *Graphify vs Alternatives* — Sourcegraph·Code2Vec·Neo4j 정직 비교

## 7. 용어집 (Glossary)

- **Tree-sitter**: incremental parsing 라이브러리. 19개+ 언어 grammar로 AST를 빠르게 만든다. Graphify에서 LLM 호출 없이 코드 구조를 뽑는 핵심이다.
- **NetworkX**: Python 그래프 라이브러리 (BSD 라이선스). Graphify의 인메모리 그래프 표현이다.
- **Leiden algorithm**: Louvain의 후속 커뮤니티 탐지 알고리즘. modularity 최적화와 connected community 보장이 강점이다.
- **God node**: 그래프에서 degree(연결 수)가 가장 높은 노드. 시스템의 중심·hub 역할을 한다.
- **Surprise edge**: 통상적 군집 경계를 가로지르는 예상 외 엣지. 설계 인사이트나 우려 지점의 표지가 된다.
- **MCP (Model Context Protocol)**: Anthropic이 주도한 도구 호출 표준 프로토콜. Graphify는 `serve.py`로 MCP 서버를 제공한다.
- **BFS subgraph query**: 특정 노드를 중심으로 폭우선 탐색해 인접 부분 그래프만 컨텍스트로 넘기는 쿼리 방식. 토큰 절감의 핵심이다.
- **PreToolUse hook**: Claude Code의 도구 호출 직전 훅. Graphify가 이 훅에서 컨텍스트 주입을 권장한다.

## 8. 그림 후보 (Figure Candidates)

원본 페이지(`graphify.net/kr/`)의 HTML에는 `<img>` 태그가 0개로, 페이지 본문은 텍스트·테이블·이모지 아이콘만 쓴다. 추출할 도식 자산이 없어 figures frontmatter는 생략했다.

> 참고: 페이지 우측 상단의 `𝕏 in f R Y ⧉` 등은 소셜/공유 아이콘 텍스트일 뿐 의미 있는 도식이 아니다. 향후 `Learn more` 섹션의 하위 페이지(`tree-sitter-ast-extraction.html`, `leiden-community-detection.html` 등)를 별도 article로 ingest할 때 도식이 보이면 그 시점에 figures를 채운다.
