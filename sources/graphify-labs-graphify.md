---
title: "graphify (Graphify-Labs): Any input → knowledge graph + /graphify skill"
type: repo
year: 2026
category: applications
raw_path: raw/repos/graphify-labs-graphify.md
raw_filename: "graphify-labs-graphify.md"
source_collection: external
org: "Graphify-Labs"
repo: "graphify"
url: "https://github.com/Graphify-Labs/graphify"
license: "MIT"
tags: [knowledge-graph, code-knowledge-graph, agent-skill, claude-code, mcp, tree-sitter, leiden, graphrag, repo, oss]
---

## 한 줄 요약 (One-line Summary)

`Graphify-Labs/graphify`는 Claude Code에서 `/graphify` 한 줄로 임의 폴더를 읽어 knowledge graph를 만드는 스킬이자 CLI 도구다. 코드, 마크다운 문서, 논문 PDF, 이미지를 한 그래프로 합치고 그 그래프에 질의하게 해서, 원본 파일을 그대로 읽을 때보다 적은 토큰으로 답을 얻는 것을 목표로 한다. 이 stem의 raw는 README 스냅샷 한 개이며, 본문은 `safishamsi/graphify` 스냅샷과 글자 단위로 같다.

## 1. 자료 정보 (Document Information)

| 항목 | 값 | 근거 위치 |
|---|---|---|
| Org / Repo | `Graphify-Labs/graphify` | raw frontmatter |
| URL | `https://github.com/Graphify-Labs/graphify` | raw frontmatter |
| License | MIT | raw frontmatter. README 본문에는 라이선스 문구가 없다 |
| 자료 형태 | README 스냅샷 파일 1개 (7,591 바이트, 본문 138줄) | raw 파일 자체 |
| 요구 사항 | Claude Code와 Python 3.10 이상 | README 설치 절 |
| PyPI 패키지 | `graphifyy` | README 설치 절 |
| CLI 명령과 스킬 명령 | `graphify` | README 설치 절 |
| 본문의 저장소 참조 | CI 배지와 수동 설치 curl URL이 `safishamsi/graphify`의 `v1` 브랜치를 가리킨다 | README 상단과 수동 설치 절 |

README는 PyPI 이름이 `graphifyy`인 이유를 `graphify` 이름을 되찾는 동안 쓰는 임시 이름이라고 밝히고, CLI와 스킬 명령은 그대로 `graphify`라고 적는다. Windows에서 명령을 찾지 못하면 Python Scripts 폴더를 PATH에 추가하거나 `pipx install graphifyy`를 쓰라고 안내하며, macOS의 externally-managed 오류에도 같은 pipx 경로를 제시한다.

수동 설치 경로도 함께 적혀 있다. `~/.claude/skills/graphify/SKILL.md`로 스킬 파일을 내려받은 뒤, `~/.claude/CLAUDE.md`에 트리거 한 줄을 추가해 사용자가 `/graphify`를 입력하면 다른 일보다 먼저 Skill 도구를 호출하도록 지시하는 방식이다.

### 짝 자료 대조

같은 제품의 저장소 스냅샷이 이 wiki에 두 개 있다. 두 raw 파일의 본문을 diff한 결과 차이가 한 줄도 없었다.

| 비교 항목 | graphify-labs-graphify | safishamsi-graphify | 차이 |
|---|---|---|---|
| README 본문 | 138줄 | 138줄 | 없음 (diff 결과 0줄) |
| raw frontmatter의 org | `Graphify-Labs` | `safishamsi` | 있음 |
| raw frontmatter의 url | 조직 계정 주소 | 개인 계정 주소 | 있음 |
| raw frontmatter의 tags | `codex`와 `cursor` 없음 | `codex`와 `cursor` 있음 | 있음 |
| 본문의 CI 배지와 curl URL | `safishamsi/graphify` | `safishamsi/graphify` | 없음 |
| 본문의 라이선스 문구 | 없음 | 없음 | 없음 |
| 본문의 버전 표기 | 없음 | 없음 | 없음 |

frontmatter는 원저자가 아니라 이 wiki가 붙인 메타데이터다. 따라서 두 스냅샷에서 확인되는 차이는 저장소 소유 주체 표기와 태그뿐이고, 기능, 버전, 라이선스에서 달라진 점은 이 시점 README로 확인되지 않는다.

## 2. 주요 기여 (Key Contributions)

1. **단일 명령 진입점**: Claude Code에서 `/graphify .`을 입력하면 대상 폴더를 읽어 그래프를 만든다. README는 코드베이스, 노트, 논문 등 폴더 종류를 가리지 않는다고 적는다.
2. **멀티모달 입력 통합**: 코드, PDF, 마크다운, 스크린샷, 도식, 화이트보드 사진, 다른 언어로 쓰인 이미지까지 받아 Claude vision으로 개념과 관계를 뽑고 하나의 그래프로 잇는다.
3. **근거 등급이 붙은 edge**: 모든 edge에 `EXTRACTED`, `INFERRED`, `AMBIGUOUS` 중 하나를 표시해, 자료에서 찾아낸 관계와 모델이 추측한 관계를 사용자가 구분하게 한다.
4. **토큰 절감 벤치마크의 자동 출력**: 실행이 끝날 때마다 토큰 벤치마크를 출력한다. 코드와 논문과 이미지가 섞인 코퍼스에서 원본 파일을 읽는 방식 대비 질의당 토큰이 71.5배 적었다고 보고한다.
5. **그래프 최신성 유지 수단 세 가지**: `--update`, `--watch`, 그리고 `graphify hook install`이 설치하는 post-commit 훅을 제공한다.
6. **에이전트가 읽는 wiki 산출**: `--wiki`는 community와 god node마다 Wikipedia 형식 마크다운 문서를 만들고 `index.md`를 진입점으로 둔다. 에이전트가 JSON을 파싱하는 대신 파일을 읽어 지식 베이스를 탐색하게 하려는 설계다.

README 서두는 이 도구의 동기를 Karpathy의 작업 습관으로 제시한다. 논문, 트윗, 스크린샷, 노트를 `/raw` 폴더에 쌓아 두는 상황을 문제로 규정하고, graphify가 그 문제의 답이라고 적는다. 근거로 드는 것은 질의당 토큰 71.5배 절감, 세션을 넘어 유지되는 그래프, 찾은 것과 추측한 것의 구분 세 가지다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 입력 유형별 추출 경로

| 유형 | 확장자 | 추출 방식 |
|---|---|---|
| Code | `.py .ts .js .go .rs .java .c .cpp .rb .cs .kt .scala .php` (13종) | tree-sitter AST 파싱과 call-graph pass |
| Docs | `.md .txt .rst` | Claude가 개념과 관계를 추출 |
| Papers | `.pdf` | citation mining과 개념 추출 |
| Images | `.png .jpg .webp .gif` | Claude vision으로 스크린샷과 도식을 읽는다 |

### 명령 구성

| 묶음 | 명령 | 동작 |
|---|---|---|
| 그래프 생성 | `/graphify`, `/graphify ./raw` | 현재 폴더 또는 지정한 폴더를 처리한다 |
| 그래프 생성 | `/graphify ./raw --mode deep` | INFERRED edge를 더 적극적으로 추출한다 |
| 그래프 생성 | `/graphify ./raw --update` | 변경된 파일만 다시 추출해 기존 그래프에 병합한다 |
| 자료 추가 | `/graphify add <arXiv URL>` | 논문을 받아 저장하고 그래프를 갱신한다 |
| 자료 추가 | `/graphify add <x.com URL>` | 트윗을 받아 같은 흐름으로 처리한다 |
| 질의 | `/graphify query "..."` | 자연어 질문을 그래프에 던진다 |
| 질의 | `/graphify path "A" "B"` | 두 노드 사이의 경로를 찾는다 |
| 질의 | `/graphify explain "X"` | 특정 노드를 설명한다 |
| 자동화 | `/graphify ./raw --watch` | 파일 변경을 감시해 그래프를 자동 동기화한다 |
| 자동화 | `graphify hook install` | 커밋마다 그래프를 다시 만드는 post-commit 훅을 설치한다 |
| 내보내기 | `--wiki` | community와 god node마다 문서를 만들고 `index.md`를 둔다 |
| 내보내기 | `--svg`, `--graphml` | `graph.svg`, Gephi와 yEd가 읽는 `graph.graphml`을 만든다 |
| 내보내기 | `--neo4j`, `--mcp` | Neo4j용 `cypher.txt`를 만들거나 MCP stdio 서버를 띄운다 |

### 출력 디렉토리

실행 결과는 `graphify-out/` 아래에 모인다.

| 산출물 | 내용 |
|---|---|
| `graph.html` | 노드 클릭, 검색, community 필터가 되는 대화형 그래프 |
| `obsidian/` | Obsidian vault로 열 수 있는 형태의 내보내기 |
| `wiki/` | `--wiki` 지정 시 만들어지는 Wikipedia 형식 문서 묶음 |
| `GRAPH_REPORT.md` | god node, 뜻밖의 연결, 추천 질문을 담은 보고서 |
| `graph.json` | 몇 주 뒤에도 다시 읽지 않고 질의할 수 있는 영속 그래프 |
| `cache/` | SHA256 캐시. 재실행 시 변경된 파일만 처리한다 |

### 그래프를 최신으로 유지하는 수단

| 수단 | 트리거 | 처리 범위 | 특징 |
|---|---|---|---|
| `--update` | 사용자가 직접 실행 | 변경된 파일만 재추출 후 병합 | 기존 그래프를 버리지 않는다 |
| `--watch` | 파일 저장 | 코드 저장은 즉시 재구축, 문서와 이미지 변경은 알림 | 코드 경로는 AST만 쓰고 LLM을 호출하지 않는다. 문서와 이미지는 LLM 재처리가 필요해 `--update` 실행을 알린다 |
| `graphify hook install` | git 커밋 | 커밋마다 그래프 재구축 | 백그라운드 프로세스가 필요 없고 커밋당 한 번만 동작하며 기존 훅과 함께 두어도 안전하다 |

README는 `--watch`의 용도를 여러 에이전트가 동시에 코드를 쓰는 워크플로로 설명한다. 에이전트들이 차례로 작업하는 사이사이에 그래프가 스스로 최신 상태를 유지하기 때문이다.

### 그래프 분석 산출

- **God nodes**: 연결 차수가 가장 높은 개념이다. 모든 것이 무엇을 거쳐 이어지는지 보여 준다.
- **Surprising connections**: 합성 점수로 순위를 매긴다. 코드와 논문을 잇는 edge가 코드끼리 잇는 edge보다 높은 순위를 받으며, 각 결과에는 왜 그런지를 평이한 영어로 설명하는 문장이 붙는다.
- **Suggested questions**: 그 그래프만 특히 잘 답할 수 있는 질문 4~5개를 제안한다.
- **Token benchmark**: 실행이 끝날 때마다 자동으로 출력된다.

### 기술 스택

NetworkX, Leiden(graspologic), tree-sitter, Claude, vis.js로 구성한다. README는 Neo4j가 필요 없고 서버도 필요 없으며 전부 로컬에서 실행된다고 적는다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

| 코퍼스 | 파일 수 | 절감 | 출력 위치 |
|---|---:|---|---|
| Karpathy 저장소 + 논문 5편 + 이미지 4장 | 52 | 71.5배 | `worked/karpathy-repos/` |
| graphify 소스 + Transformer 논문 | 4 | 5.4배 | `worked/mixed-corpus/` |
| httpx (합성 Python 라이브러리) | 6 | 약 1배 | `worked/httpx/` |

README는 토큰 절감 폭이 코퍼스 크기에 비례한다고 설명한다. 파일 6개는 어차피 context window에 들어가므로 그 규모에서 그래프의 가치는 압축이 아니라 구조를 드러내는 데 있고, 코드와 논문과 이미지가 섞인 파일 52개 규모에서는 71배를 넘는다는 것이다.

재현 경로도 함께 제시한다. 각 `worked/` 폴더에 입력 파일 원본과 실제 출력(`GRAPH_REPORT.md`, `graph.json`)이 들어 있어 사용자가 직접 실행해 수치를 확인할 수 있다고 적는다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **raw가 README 스냅샷이라 내부 구현 세부는 확인 불가**: 모듈 구성, 파이프라인 단계 함수, 신뢰도 등급 산정 기준, 추출 결과 스키마는 이 자료에 없다. README는 모듈 책임과 언어 추가 방법을 저장소의 `ARCHITECTURE.md`에서 보라고 안내하지만 그 파일은 스냅샷에 포함되지 않았다.
- **버전과 변경 이력 부재**: README 본문에 릴리스 번호, 태그, CHANGELOG가 없다. 이 스냅샷이 어느 시점 상태인지 자료 안에서 특정할 수 없다.
- **라이선스 문구 부재**: raw frontmatter는 MIT라고 적지만 README 본문에는 라이선스 절이 없다. 사용 조건은 저장소 원본에서 다시 확인해야 한다.
- **저장소 참조 불일치**: frontmatter는 `Graphify-Labs/graphify`를 가리키는 반면 README 본문의 CI 배지와 수동 설치 curl URL은 `safishamsi/graphify`를 가리킨다.
- **벤치마크는 저자 자체 측정**: 71.5배와 5.4배는 저자가 고른 코퍼스에서 저자가 잰 값이다. 제3자 재현이나 비교 대상 도구와의 대조는 자료에 없다.
- **소규모 코퍼스에서는 절감이 없다**: 파일 6개 코퍼스는 약 1배로, 토큰 관점의 이득이 사실상 없다.
- **문서와 이미지 변경은 즉시 반영되지 않는다**: `--watch`는 코드 저장만 즉시 재구축하고 문서와 이미지는 사용자에게 `--update` 실행을 알리는 데서 멈춘다.
- **로컬 실행과 모델 의존의 병존**: 기술 스택 절은 서버 없이 전부 로컬에서 실행된다고 적지만, 문서와 논문과 이미지의 개념 추출은 Claude 호출에 의존한다. 두 서술이 함께 있으므로 여기서 로컬이 뜻하는 범위는 그래프 저장과 연산이다.
- **품질 검증을 사용자 기여에 의존**: README의 기여 절은 실제 코퍼스에 실행해 결과가 맞고 틀린 부분을 평가한 `review.md`를 함께 제출하는 것을 가장 신뢰를 높이는 기여로 꼽는다. 추출 오류는 입력 파일과 캐시 항목과 놓치거나 지어낸 내용을 함께 이슈로 올리라고 안내한다.

## 6. 관련 연구 (Related Work)

- [[applications/safishamsi-graphify]]: 같은 README의 개인 계정 저장소 스냅샷. 본문이 동일하므로 두 페이지는 소유 주체 표기에서만 갈린다.
- [[applications/shamsi-2026-graphify-knowledge-graphs-for-ai]]: 같은 제품의 한국어 소개 자료.
- [[applications/todaycode-2026-graphify-llm-token-reduction-wiki]]: 같은 제품을 한국어로 해설한 영상 자료.
- [[applications/garrytan-gbrain]]: 개인 지식 베이스 도구와의 비교 대상.
- [[applications/colbymchenry-codegraph]]: 코드 저장소를 그래프로 다루는 다른 도구.
- [[applications/liu-2026-rag-llm-wiki-or-gbrain]]: graphify가 놓이는 도구 분류를 다룬 자료.
- [[database/guo-2025-lightrag-simple-and-fast]]: 그래프 기반 검색 계열의 선행 연구.
- [[overviews/lightrag-family-graph-rag-overview]]: 그래프 기반 검색 계열 overview.

## 7. 용어집 (Glossary)

- **god node**: 그래프에서 연결 차수가 가장 높은 개념 노드. 코퍼스의 모든 내용이 무엇을 거쳐 이어지는지 보여 준다.
- **surprising connection**: 합성 점수로 순위를 매긴 뜻밖의 연결. 코드와 논문을 잇는 edge가 코드끼리 잇는 edge보다 높은 순위를 받는다.
- **EXTRACTED / INFERRED / AMBIGUOUS**: 모든 edge에 붙는 근거 등급 표시. 자료에서 직접 찾은 관계와 모델이 추측한 관계, 판단이 갈리는 관계를 구분한다.
- **call-graph pass**: 코드 파일에서 AST를 뽑은 뒤 호출 관계를 따로 훑는 추가 처리 단계.
- **citation mining**: PDF에서 인용 관계를 뽑아 논문 사이의 edge로 만드는 처리.
- **worked example**: 실제 코퍼스에 도구를 실행해 입력과 출력을 함께 저장소에 남긴 재현용 사례. `worked/{slug}/` 경로에 둔다.
