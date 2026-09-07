---
title: "Graphify: Knowledge Graphs for AI Coding Assistants"
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

Graphify는 코드, 문서, 논문, 다이어그램을 Tree-sitter 정적 분석과 LLM 의미 추출로 하나의 NetworkX 지식 그래프에 모은 뒤 Leiden 알고리즘으로 군집화해, Claude Code나 OpenAI Codex 같은 AI 코딩 어시스턴트가 코드베이스를 탐색하게 해주는 MIT 라이선스 오픈소스 스킬이다. 이 자료는 제품 공식 랜딩 페이지이므로 성능 수치와 설계 주장은 모두 제작자 측 서술이다.

## 1. 자료 정보 (Document Information)

- **자료 유형**: Article (제품 랜딩 페이지, https://graphify.net/kr/)
- **원제**: 페이지 최상단 제목은 `Graphify — Knowledge Graphs for AI Coding Assistants`다. 본 wiki는 제목에 em dash를 쓰지 않는 규약에 따라 `Graphify: Knowledge Graphs for AI Coding Assistants`로 표기한다.
- **URL의 lang 속성**: `ko`이지만 본문은 영어다. 한국어 사용자를 겨냥해 만든 경로에 영문 본문을 올린 형태다.
- **유지보수자**: Safi Shamsi. 페이지 하단 저작권 표기도 "Maintained by Safi Shamsi"다.
- **GitHub**: github.com/safishamsi/graphify. 페이지가 제시한 star 수는 3,700개 이상이다.
- **PyPI**: 패키지명은 `graphifyy`, CLI 명령은 `graphify`다. 패키지명과 명령어가 다르므로 설치 시 혼동하기 쉽다.
- **라이선스**: MIT. 핵심 의존성인 NetworkX는 BSD, Tree-sitter는 MIT로 모두 permissive 계열이며 페이지는 라이선스 충돌이 없다고 밝힌다.
- **런타임 요구**: Python 3.10 이상
- **보안 정책 문서**: 저장소 `v3` 브랜치의 `SECURITY.md`
- **수집 일자**: 2026-06-08

이 자료의 성격상 서술을 두 층으로 나눠 읽어야 한다. 파이프라인 구성, 모듈 이름, 출력 파일명, 라이선스처럼 배포물에서 확인 가능한 사실이 한 층이고, 토큰 절감률과 보안 방어 효과처럼 제작자가 자기 측정으로 제시한 주장이 다른 층이다. 아래 서술에서는 후자를 페이지의 주장으로 명시한다.

## 2. 주요 기여 (Key Contributions)

1. **AI 코딩 어시스턴트가 호출하는 지식 그래프 스킬**을 단일 패키지로 묶었다. Claude Code, OpenAI Codex, OpenCode에는 전용 `skill-*.md` manifest가 기본 포함되고, 셸 명령을 실행할 수 있는 어시스턴트라면 어느 것이든 `graphify`를 호출할 수 있다고 밝힌다. 노출되는 명령은 `/graphify`, `/graphify query`, `/graphify path`, `/graphify explain` 네 가지다.

2. **코드가 하는 일과 그렇게 설계된 이유를 함께 설명하는 것**을 목표로 내세운다. 페이지는 Graphify가 저장소를 그래프로 바꿔 "what the code does"와 "why it was designed that way"를 모두 설명한다고 서술한다. 소스 코드만이 아니라 문서, 연구 논문, 다이어그램을 같은 그래프에 넣는 이유가 여기에 있다.

3. **벡터 임베딩 없이 동작하는 코드 이해 파이프라인**을 내놓았다. 임베딩이나 vector store를 쓰지 않고 Tree-sitter 정적 분석(AST, call graph, docstring), LLM 의미 추출(산문에서 개념 추출), 비전 모델(다이어그램 판독)로 노드와 엣지를 만든 뒤 Leiden 알고리즘으로 의미 커뮤니티를 찾는다.

4. **토큰 절감 효과를 워크드 예제로 제시했다.** 아래 수치는 모두 제품 페이지가 자체적으로 보고한 값이며 제3자 검증 결과는 아니다.
   - httpx (HTTP transport layer를 모델링한 Python 6개 파일): 노드 144개, 엣지 330개, 커뮤니티 6개. god node는 `Client`, `AsyncClient`, `Response`, `Request`이고 surprise edge는 `DigestAuth → Response`다.
   - Karpathy mixed corpus (GPT 프레임워크 저장소 3개, attention 논문 5편, 다이어그램 4개로 약 52개 파일, 약 9만 2천 단어): 노드 285개, 엣지 340개, 커뮤니티 53개. 쿼리당 평균 비용이 약 1,700 토큰으로, 전체를 그대로 넣는 naive 방식의 약 12만 3천 토큰 대비 71.5배 감소했다.
   - 약 50만 단어 코퍼스에서도 BFS subgraph 쿼리가 약 2,000 토큰 수준을 유지한다. naive 방식은 약 67만 토큰이다. 두 값의 비는 약 335배에 해당하지만 페이지는 이 비율을 숫자로 제시하지 않고 "규모가 커져도 압축이 유지된다"고만 서술한다.

5. **프라이버시와 보안을 기본값으로 선언했다.** 원본 소스 파일은 외부 모델로 보내지 않고 문서와 다이어그램의 의미 기술(semantic descriptions)만 전송한다. telemetry는 수집하지 않는다. URL은 http와 https만 허용하고, 다운로드에 크기와 시간 제한을 걸며, 출력 경로를 containment 검사하고, 노드 라벨을 HTML escape 처리한다. 페이지는 이 조치가 SSRF, Cypher 인젝션, XSS를 막는다고 설명한다.

6. **확장 가능한 다단계 파이프라인 아키텍처**를 모듈로 분리했다. 각 단계가 독립 모듈이라 기여자가 원하는 단계만 따로 확장할 수 있다고 밝힌다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 여섯 가지 핵심 능력

페이지는 정적 분석, 의미 추출, 그래프 군집화를 하나의 스킬로 통합했다고 소개하며 능력을 여섯 항목으로 나눈다.

| 능력 | 내용 |
|---|---|
| Multi-Modal Extraction | `.py`, `.js`, `.go`, `.java` 등 코드와 Markdown, PDF, 이미지를 파싱한다. Tree-sitter가 AST, call graph, docstring을 뽑고, LLM이 산문에서 개념을 뽑으며, 비전 모델이 다이어그램을 읽는다 |
| Knowledge Graph Build | 추출된 노드와 엣지를 NetworkX 그래프로 병합하고 Leiden 알고리즘으로 의미 커뮤니티를 탐지한다. 벡터 임베딩은 쓰지 않는다 |
| God Nodes & Surprises | degree가 가장 높은 god node를 찾아내고, 검토할 가치가 있는 예상 밖 cross-file 또는 cross-domain 연결을 표시한다 |
| Interactive Outputs | 인터랙티브 `graph.html`, 쿼리 가능한 `graph.json`, 사람이 읽는 감사 리포트 `GRAPH_REPORT.md`를 내보낸다 |
| Assistant Integration | `/graphify`, `/graphify query`, `/graphify path`, `/graphify explain` 명령을 Claude Code, Codex, OpenCode 등에 제공한다 |
| Secure by Design | http와 https URL만 허용하고 크기와 타임아웃을 제한하며, 경로 containment 검사와 노드 라벨 HTML escape로 SSRF, 인젝션, XSS를 방어한다 |

### 파이프라인 7단계

각 단계는 격리된 모듈이라 기여자가 단계별로 독립 확장할 수 있다.

| 단계 | 원문 설명 | 역할 |
|---|---|---|
| detect | collect files | 대상 파일을 수집한다 |
| extract | AST + LLM nodes/edges | Tree-sitter AST와 LLM 의미 추출로 노드와 엣지를 만든다 |
| build | NetworkX graph | 추출 결과를 NetworkX 그래프로 구성한다 |
| cluster | Leiden communities | Leiden 알고리즘으로 의미 커뮤니티를 나눈다 |
| analyze | god nodes & surprises | 중심 노드와 예상 밖 엣지를 찾는다 |
| report | GRAPH_REPORT.md | 사람이 읽는 감사 리포트를 쓴다 |
| export | HTML / JSON / Obsidian | 시각화와 쿼리 가능한 산출물을 내보낸다 |

### 지원 모듈

| 모듈 | 역할 |
|---|---|
| `ingest.py` | URL fetching |
| `cache.py` | semantic caching (증분 캐시) |
| `security.py` | input validation |
| `watch.py` | live updates (파일 변경 감시) |
| `serve.py` | MCP 프로토콜 서비스 |

### 추출 입력과 언어 지원

- **코드**: `.py`, `.js`, `.go`, `.java` 등. 심화 가이드 항목은 Tree-sitter가 19개 언어를 로컬에서 파싱하며 소스에는 LLM을 호출하지 않는다고 밝힌다.
- **문서**: Markdown
- **논문**: PDF
- **다이어그램**: 이미지. 비전 모델이 판독한다.

### 설치와 실행

패키지는 PyPI로 배포한다. `pip install graphifyy && graphify install`로 설치한 뒤 `/graphify ./raw`처럼 대상 폴더를 지정하면 산출물이 `graphify-out/` 아래에 생성된다.

| 산출물 | 내용 |
|---|---|
| `graph.html` | 인터랙티브 시각화 |
| `GRAPH_REPORT.md` | 핵심 노드, surprise, 추천 질문 |
| `graph.json` | 영속적이고 쿼리 가능한 그래프 |
| `cache/` | 증분 캐시 |

### LLM 분리 설계

Graphify는 자체 LLM을 번들링하지 않는다. AI 코딩 어시스턴트가 이미 설정해 둔 모델 API 키를 그대로 쓰고, 외부로 나가는 호출은 의미 추출 단계 하나뿐이다. 이때도 원본 소스 코드가 아니라 의미 기술만 전송한다고 밝힌다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

페이지 상단은 네 가지 지표를 헤드라인으로 내건다. GitHub star 3,700개 이상, MIT 라이선스, 토큰 71.5배 감축, Python 3.10 이상 런타임이다.

| 코퍼스 | 입력 규모 | 그래프 규모 | 쿼리당 토큰 비용 | 절감률 |
|---|---|---|---|---|
| httpx | Python 6개 파일 (HTTP transport layer 모델링) | 노드 144개, 엣지 330개, 커뮤니티 6개 | 페이지 미공개 | 페이지 미공개 |
| Karpathy mixed | 저장소 3개, 논문 5편, 다이어그램 4개 (약 52개 파일, 약 9만 2천 단어) | 노드 285개, 엣지 340개, 커뮤니티 53개 | 약 1,700 (naive 약 12만 3천) | 71.5배 |
| 대규모 코퍼스 | 약 50만 단어 | 페이지 미공개 | 약 2,000 (naive 약 67만) | 페이지가 비율을 제시하지 않음 |

정성적 결과는 두 가지다.

- **god node 식별**: httpx 예제에서 `Client`, `AsyncClient`, `Response`, `Request`처럼 시스템 중심에 자리한 최고 degree 노드를 자동으로 뽑았다.
- **surprise edge 검출**: 같은 코퍼스에서 `DigestAuth → Response` 같은 예상 밖 연결을 검토 대상으로 표시했다.

확장성에 대해서는 Tree-sitter 파싱과 NetworkX 그래프 구성이 코드 규모에 선형으로 비례한다고 FAQ에서 설명한다. 이 선형성 주장 역시 근거 데이터 없이 서술로만 제시된다.

### 인접 프로젝트 비교

페이지가 직접 만든 비교 표다. 비교 대상의 강점과 한계를 제품 측 시각으로 정리한 것이므로 중립적 평가가 아니다.

| 프로젝트 | 초점 | 강점 | Graphify 대비 한계 (페이지 서술) |
|---|---|---|---|
| Sourcegraph | cross-repo 코드 검색 | 엔터프라이즈급 내비게이션 | knowledge graph가 아니며 설계 의미를 제한적으로만 다룬다 |
| Code2Vec | 함수 단위 임베딩 | 벡터 retrieval과 분류 | 그래프 구조가 없고 멀티모달 입력을 받지 못한다 |
| Neo4j | 범용 그래프 데이터베이스 | 강력한 Cypher 쿼리 | 코드로부터 그래프를 스스로 생성하지 않는다 |

## 5. 한계와 향후 과제 (Limitations and Future Work)

페이지가 스스로 밝힌 한계는 없다. 대신 비교 표에서 인접 도구의 약점을 부각하는 구성을 택했다. 아래는 페이지 서술에서 독자가 추론할 수 있는 제약이며 페이지가 직접 명기한 내용이 아니다.

- **자료 성격에서 오는 한계**: 이 자료는 제품 랜딩 페이지다. 71.5배 감축, 선형 확장, 보안 방어 효과는 모두 제작자 측 서술이고 재현 절차나 측정 조건이 공개되지 않았다. 워크드 예제가 재현 가능한 코퍼스로 저장소에 포함돼 있다고는 밝히지만, 측정 스크립트나 원자료는 페이지에 없다.
- **정량 검증치 부재**: god node와 surprise edge는 사례로만 제시되고 precision이나 recall 같은 지표가 없다. 어떤 엣지를 surprise로 판정하는 기준도 페이지에 없다.
- **외부 모델 의존**: AST 추출 단계는 LLM을 호출하지 않지만, 산문 개념 추출과 다이어그램 판독은 외부 모델 API 키가 필요하다. 토큰 비용과 지연시간은 사용자가 부담한다.
- **언어 지원 범위**: 심화 가이드가 밝힌 지원 언어는 19개다. 페이지는 이 범위를 넓히는 방법이나 미지원 언어의 대체 경로를 설명하지 않는다.
- **유지보수 인력**: 페이지가 표기한 유지보수자는 Safi Shamsi 한 명이다. 기여자가 단계별로 확장할 수 있다는 설계 의도는 밝히지만 실제 기여자 규모는 알 수 없다.

향후 과제로 페이지가 약속한 항목은 없다. 대신 "Learn more" 섹션의 심화 가이드 6편이 추가 분석의 분기점이다.

## 6. 관련 연구 (Related Work)

### 페이지 비교 대상

- **Sourcegraph**: cross-repo 코드 검색 도구
- **Code2Vec**: 함수 단위 임베딩
- **Neo4j**: 범용 그래프 데이터베이스

### 페이지 자체 심화 자료

페이지 하단은 하위 HTML 문서 6편을 심화 가이드로 링크한다. 각 항목은 아직 별도 자료로 수집하지 않았다.

| 가이드 | 페이지 요약 | 파일 |
|---|---|---|
| Knowledge Graphs for AI Coding Assistants | 구조적 그래프가 벡터 RAG보다 코드 이해에 나은 이유 | `knowledge-graph-for-ai-coding-assistants.html` |
| Tree-sitter AST Extraction | 소스에 LLM을 호출하지 않고 19개 언어를 로컬 파싱하는 방법 | `tree-sitter-ast-extraction.html` |
| Leiden Community Detection | 임베딩과 vector store 없이 그래프 토폴로지만으로 군집화 | `leiden-community-detection.html` |
| Claude Code Integration | CLAUDE.md 지시문과 PreToolUse 훅 설정 절차 | `graphify-claude-code-integration.html` |
| CLI Command Reference | `/graphify`와 `graphify` 명령 전체 목록 | `graphify-cli-commands.html` |
| Graphify vs Alternatives | Sourcegraph, Code2Vec, Neo4j와의 비교 | `graphify-vs-alternatives.html` |

### 본 wiki 기존 자료와의 연결

아래 연결은 본 wiki의 큐레이션 판단이다. 페이지가 이 자료들을 언급하거나 참조한 것은 아니다.

- **GraphRAG** (Edge 2024, `wiki/database/edge-2024-from-local-to-global.md`): knowledge graph를 만들고 커뮤니티를 탐지해 질의에 답하는 구조가 Graphify와 같다. 대상이 문서 코퍼스라는 점이 다르다.
- **LightRAG** (Guo 2025, `wiki/database/guo-2025-lightrag-simple-and-fast.md`): 경량 graph-based RAG. 일반 문서를 대상으로 한다.
- **PageIndex** (Kalane 2026, `wiki/database/kalane-2026-pageindex-threw-out-vector-databases.md`): vector 데이터베이스 없이 구조를 이용하는 retrieval 계열로, Graphify의 임베딩 미사용 노선과 방향이 같다.
- **RAG-Anything** (Guo 2025, `wiki/database/guo-2025-rag-anything-all-in-one-rag.md`): 멀티모달 RAG. Graphify의 멀티모달 입력과 비교 지점이 된다.
- **같은 프로젝트 자료 3편**: 저장소 페이지 `wiki/applications/safishamsi-graphify.md`, 조직 이전판 `wiki/applications/graphify-labs-graphify.md`, 한국어 심층 해설 영상 `wiki/applications/todaycode-2026-graphify-llm-token-reduction-wiki.md`.

## 7. 용어집 (Glossary)

- **Tree-sitter**: Graphify가 코드에서 AST, call graph, docstring을 뽑는 데 쓰는 파서다. 페이지에 따르면 19개 언어를 로컬에서 처리하며 이 단계에서는 LLM을 호출하지 않는다.
- **NetworkX**: BSD 라이선스로 배포되는 Python 그래프 라이브러리다. Graphify는 추출한 노드와 엣지를 이 라이브러리의 그래프로 병합한다.
- **Leiden algorithm**: Graphify가 그래프에 적용하는 커뮤니티 탐지 알고리즘이다. 페이지는 임베딩이나 vector store 없이 그래프 토폴로지만으로 군집을 찾는다고 설명한다.
- **god node**: 그래프에서 degree가 가장 높은 노드다. 페이지는 이를 시스템의 중심에 있는 노드로 규정한다.
- **surprise edge**: 예상 밖의 cross-file 또는 cross-domain 연결이다. Graphify는 이런 엣지를 검토 대상으로 표시한다.
- **semantic descriptions**: 외부 모델로 보내는 유일한 데이터다. 문서와 다이어그램의 의미를 기술한 내용이며 원본 소스 파일은 전송하지 않는다.
- **BFS subgraph query**: 특정 노드에서 폭 우선 탐색으로 인접 부분 그래프만 가져오는 질의 방식이다. 페이지는 대규모 코퍼스에서도 이 방식이 약 2,000 토큰 수준을 유지한다고 보고한다.
- **skill manifest**: `skill-*.md` 형식의 파일로, AI 코딩 어시스턴트가 Graphify를 스킬로 인식하게 한다. Claude Code, OpenAI Codex, OpenCode용이 기본 제공된다.
- **MCP**: `serve.py`가 제공하는 서비스 프로토콜이다. 페이지는 이 모듈을 "MCP-protocol service"로만 소개하고 세부는 설명하지 않는다.

## 8. 그림 후보 (Figure Candidates)

수집된 본문에 이미지가 없어 추출할 도식 자산이 없다. 따라서 `figures:` frontmatter를 생략했다.

향후 "Learn more" 섹션의 하위 페이지(`tree-sitter-ast-extraction.html`, `leiden-community-detection.html` 등)를 별도 article로 수집할 때 도식이 확인되면 그 시점에 figures를 채운다.
