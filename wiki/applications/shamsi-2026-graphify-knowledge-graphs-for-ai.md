---
title: "Graphify — Knowledge Graphs for AI Coding Assistants"
type: article
year: 2026
category: applications
raw_path: /Users/kmyu/Desktop/project/ai-wiki/raw/articles/shamsi-2026-graphify-knowledge-graphs-for-ai.md
raw_filename: "shamsi-2026-graphify-knowledge-graphs-for-ai.md"
source: shamsi-2026-graphify-knowledge-graphs-for-ai.md
source_collection: external
author: "Safi Shamsi"
url: "https://graphify.net/kr/"
publisher: "Graphify (graphify.net)"
tags: [knowledge-graph, code-intelligence, ai-coding-assistant, tree-sitter, networkx, leiden, mcp, claude-code, rag-alternative, multi-modal]
---

## 요약 (Summary)

Graphify는 코드·문서·논문·다이어그램을 한 묶음으로 받아들여 NetworkX 지식 그래프를 짓고, embedding이나 vector store 없이도 AI 코딩 어시스턴트가 멀티모달 코드베이스를 탐색하게 해주는 MIT 라이선스 오픈소스 스킬이다. Tree-sitter가 19개 언어의 AST·call graph·docstring을 로컬에서 뽑고(LLM 호출 0), LLM이 prose에서 개념을 길어 올리며, vision 모델이 다이어그램을 읽어 노드와 엣지를 모은다. 모인 그래프에는 Leiden 알고리즘이 의미 커뮤니티를 입힌다. Claude Code·OpenAI Codex·OpenCode가 `/graphify` 슬래시 커맨드로 직접 호출하고, `serve.py`는 MCP 서버까지 띄운다. Karpathy mixed corpus(~52 files, ~92k words) 워크드 예제에서 쿼리당 평균 ~1.7k 토큰 vs naive ~123k 토큰 — **71.5× 토큰 감축**을 보였다. [[database/edge-2024-from-local-to-global]] GraphRAG의 community-detection 패턴을 코드 도메인으로 옮기면서, [[database/kalane-2026-pageindex-threw-out-vector-databases]] PageIndex 계보의 "vector DB 없는 RAG" 노선을 코드 이해 쪽에 가져온 사례다.

## 핵심 포인트 (Key Points)

- **AI 코딩 어시스턴트 전용 knowledge graph 스킬**. Claude Code, OpenAI Codex, OpenCode용 `skill-*.md` manifest를 함께 묶어 `/graphify`, `/graphify query`, `/graphify path`, `/graphify explain` 슬래시 커맨드가 곧장 동작한다.
- **Vector RAG 없이 코드 이해**. embedding · vector store 0. Tree-sitter AST + LLM 의미 추출 + Leiden 군집화로 토폴로지 기반 검색을 한다.
- **멀티모달 입력**. `.py`, `.js`, `.go`, `.java` 등 코드 + Markdown + PDF + 이미지를 한 그래프로 통합. Tree-sitter는 LLM 호출 없이 로컬에서 끝낸다.
- **71.5× 토큰 감축** (Karpathy mixed corpus, ~92k words). ~500k word 코퍼스에서도 BFS subgraph 쿼리가 ~2k 토큰 수준에 머문다 (naive ~670k).
- **god node · surprise edge**. 시스템 중심(`Client`, `AsyncClient`, `Response`, `Request` 같은 hub)을 자동 추출하고, `DigestAuth → Response` 류 예상 외 cross-file 연결을 검토 대상으로 올린다.
- **프라이버시·보안 기본값**. 원본 소스 파일은 외부 모델로 보내지 않고 의미 기술(semantic descriptions)만 전송한다. telemetry 0. http/https URL만 허용, 다운로드 크기·타임아웃 제한, 출력 경로 containment, 노드 라벨 HTML-escape로 SSRF · Cypher 인젝션 · XSS를 막는다.
- **MIT 라이선스 · 단일 메인테이너**. Safi Shamsi가 유지보수. 의존성도 NetworkX(BSD)와 Tree-sitter(MIT)로 모두 permissive.

## 파이프라인 (Pipeline)

7단계가 독립 모듈로 분리되어 있어 기여자가 단계별로 갈아끼운다.

```
detect   — collect files (파일 수집)
extract  — AST + LLM nodes/edges (Tree-sitter + LLM 의미 추출)
build    — NetworkX graph (그래프 구성)
cluster  — Leiden communities (의미 군집)
analyze  — god nodes & surprises (중심 노드·이상 엣지)
report   — GRAPH_REPORT.md (사람이 읽는 감사 리포트)
export   — HTML / JSON / Obsidian (시각화·쿼리 가능 산출물)
```

지원 모듈: `ingest.py`(URL fetching), `cache.py`(semantic caching), `security.py`(input validation), `watch.py`(live updates), `serve.py`(MCP-protocol service).

## 워크드 예제 (Worked Examples)

| 코퍼스 | 입력 규모 | 그래프 규모 | 토큰 비용 (쿼리당) | 절감률 |
|---|---|---|---|---|
| httpx | 6 Python 파일 | 144 노드 · 330 엣지 · 6 커뮤니티 | — (감사 예시) | — |
| Karpathy mixed | 3 repos + 5 papers + 4 diagrams (~52 files, ~92k words) | 285 노드 · 340 엣지 · 53 커뮤니티 | ~1.7k vs naive ~123k | **71.5×** |
| 대규모 코퍼스 | ~500k words | (페이지 미공개) | ~2k vs naive ~670k | **~335×** |

- httpx god node: `Client`, `AsyncClient`, `Response`, `Request`. surprise edge: `DigestAuth → Response`.
- Karpathy 코퍼스: GPT 프레임워크 repo 3개 + attention 논문 5편 + 다이어그램 4개. 285 노드 · 340 엣지 · 53 커뮤니티.

## 비교 (Comparison)

| Project | 초점 | 강점 | Graphify 대비 한계 |
|---|---|---|---|
| Sourcegraph | Cross-repo 코드 검색 | 엔터프라이즈급 내비게이션 | knowledge graph 아님, 설계 의미 한정적 |
| Code2Vec | 함수 단위 embedding | 벡터 검색·분류 | 그래프 구조 없음, 멀티모달 입력 불가 |
| Neo4j | 범용 그래프 DB | Cypher 쿼리 강력 | 코드 자체로부터 그래프를 생성하지 않음 |

## 한계 (Limitations)

페이지가 자체 한계를 명시하지는 않는다. 추정 가능한 약점:

- **단일 메인테이너**. Safi Shamsi 단독 유지보수. 컨트리뷰터 풀이 응답 속도와 장기 안정성을 좌우한다.
- **LLM 의존**. AST 단계는 LLM-free지만 prose · diagram 의미 추출은 외부 모델 API 키가 필수다. 토큰 비용과 지연시간은 사용자가 부담한다.
- **정량 검증치 미공개**. god node · surprise edge는 정성 사례로만 보이고 precision/recall 같은 지표는 페이지에 없다.
- **Tree-sitter grammar 가용성**. 19개 언어 지원은 grammar 풀에 묶여 있다.

## 설치·사용 (Install & Run)

```bash
# Requires Python 3.10+
pip install graphifyy && graphify install

# Build a knowledge graph for any project folder
/graphify ./raw

# Outputs land in graphify-out/
graphify-out/
├── graph.html        # interactive visualization
├── GRAPH_REPORT.md   # core nodes, surprises, suggested questions
├── graph.json        # persistent, queryable graph
└── cache/            # incremental cache
```

패키지명 `graphifyy`, CLI 명령은 `graphify`. Graphify는 LLM을 번들링하지 않는다. AI 코딩 어시스턴트가 이미 설정해둔 모델 API 키를 그대로 쓰고, 외부로 나가는 호출은 의미 추출 단계 하나뿐이다.

## 관련 페이지 (Related Pages)

- [[applications/safishamsi-graphify|safishamsi/graphify (repo deep-dive)]] — **같은 프로젝트의 repo 페이지**. 33개 언어 지원, 21+ AI 어시스턴트 통합, 9단계 파이프라인의 모듈 단위 해부까지 다룬다. 본 페이지가 한국어 랜딩의 마케팅 서사를 정리한다면, repo 페이지는 코드·내부 모듈·실측 벤치마크의 권위 있는 출처다.
- [[applications/datasciencedojo-2026-llm-wiki-by-andrej-karpathy|LLM Wiki by Karpathy (튜토리얼)]] — Graphify가 자동화하려는 워크플로우의 출발점. Karpathy의 raw 폴더 패턴을 영어권 6단계 튜토리얼로 풀어쓴 자료.
- [[database/edge-2024-from-local-to-global]] — Microsoft Research GraphRAG. knowledge graph + community detection 패턴의 출발점. Graphify는 같은 패턴을 문서 corpus 대신 코드 도메인에 옮긴 사례.
- [[database/guo-2025-lightrag-simple-and-fast]] — 경량 graph-based RAG. Graphify가 코드 특화라면 LightRAG는 일반 문서 특화.
- [[database/kalane-2026-pageindex-threw-out-vector-databases]] — "vector DB 없는 RAG" 계보의 대표. Graphify의 "no embeddings required" 노선과 같은 흐름.
- [[database/guo-2025-rag-anything-all-in-one-rag]] — 멀티모달 RAG. Graphify의 multi-modal 입력(코드+문서+논문+다이어그램)과 비교 지점.
- [[applications/dsba-2026-paper-review-graph-based-rag]] — graph-based RAG 흐름 리뷰. Graphify를 코드 도메인 적용 사례로 끌어 쓸 수 있는 backdrop.

## 출처 (Source)

- 원문: https://graphify.net/kr/
- GitHub: https://github.com/safishamsi/graphify
- PyPI: https://pypi.org/project/graphifyy/ (패키지명 `graphifyy`)
- 라이선스: MIT
- 유지보수자: Safi Shamsi
- 본 wiki ingest: 2026-06-08
