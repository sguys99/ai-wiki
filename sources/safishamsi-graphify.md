---
title: "graphify: any input (code, docs, papers, images) to knowledge graph (Safi Shamsi, GitHub repo)"
type: repo
year: 2026
category: applications
raw_path: raw/repos/safishamsi-graphify.md
raw_filename: "safishamsi-graphify.md"
source_collection: external
org: "safishamsi"
repo: "graphify"
url: "https://github.com/safishamsi/graphify"
license: "MIT"
tags: [knowledge-graph, code-knowledge-graph, agent-skill, claude-code, mcp, tree-sitter, leiden, graphrag, repo, oss]
---

## 한 줄 요약 (One-line Summary)

graphify는 Claude Code에서 `/graphify`를 입력하면 지정한 폴더의 코드와 문서, 논문 PDF, 이미지를 읽어 하나의 지식 그래프로 만들고 결과를 `graphify-out/`에 남기는 스킬이다. README는 raw 파일을 그대로 읽는 방식과 비교해 질의당 토큰이 71.5배 줄었다고 보고하며, 모든 엣지에 `EXTRACTED`, `INFERRED`, `AMBIGUOUS` 중 하나를 붙여 발견한 관계와 추측한 관계를 구분한다.

## 1. 자료 정보 (Document Information)

- **Org / Repo**: `safishamsi/graphify`
- **URL**: `https://github.com/safishamsi/graphify`
- **License**: MIT. raw frontmatter가 기록한 값이며 README 본문에는 라이선스 문구가 없다.
- **PyPI 패키지**: `graphifyy`. README는 `graphify` 이름을 되찾는 동안 임시로 붙인 이름이라고 밝히며, CLI 명령과 스킬 명령은 그대로 `graphify`라고 안내한다.
- **요구 환경**: Claude Code와 Python 3.10 이상.
- **브랜치**: CI 배지와 수동 설치 URL이 모두 `v1` 브랜치를 가리킨다.
- **raw 자료의 범위**: 이 저장소의 2026-06-17 커밋 `0507ad0`이 `raw/repos/`의 전체 클론을 README 스텁 하나로 교체했다. 따라서 현재 raw는 README 본문뿐이고, 소스 코드, 테스트, CHANGELOG, `ARCHITECTURE.md` 본문, `worked/` 출력 파일은 확인할 수 없다. 아래 서술은 README 본문에 실제로 적힌 내용으로 한정한다.

## 2. 주요 기여 (Key Contributions)

1. **Claude Code 스킬로 제공되는 지식 그래프 빌더**: README의 첫 소개 문장이 "A Claude Code skill"이다. 사용자가 `/graphify`를 입력하면 파일을 읽고 그래프를 만든 뒤 사용자가 몰랐던 구조를 돌려준다고 설명한다.
2. **폴더 종류를 가리지 않는 입력**: `/graphify .`는 코드베이스, 노트, 논문 등 어떤 폴더에도 적용된다. README는 코드와 PDF, markdown, 스크린샷, 다이어그램, 화이트보드 사진, 다른 언어로 쓰인 이미지까지 하나의 그래프로 잇는다고 밝힌다.
3. **Karpathy의 `/raw` 폴더 문제를 겨냥한 위치 설정**: README는 Andrej Karpathy가 논문과 트윗, 스크린샷, 노트를 모아 두는 `/raw` 폴더를 인용하고, graphify가 그 문제에 대한 답이라고 적는다. 근거로 세 가지를 든다. 질의당 토큰이 raw 파일 직접 읽기 대비 71.5배 적고, 세션이 바뀌어도 그래프가 유지되며, 무엇을 발견하고 무엇을 추측했는지 정직하게 밝힌다는 점이다.
4. **엣지 단위 신뢰도 표기**: 모든 엣지에 `EXTRACTED`, `INFERRED`, `AMBIGUOUS` 중 하나가 붙는다. README는 이를 두고 사용자가 발견된 것과 추측된 것을 항상 알 수 있다고 설명한다.
5. **재사용 가능한 산출물 묶음**: 한 번의 실행이 대화형 HTML, Obsidian vault, 에이전트용 wiki, 리포트, 그래프 JSON, 캐시를 한 디렉토리에 만든다.
6. **실행 때마다 출력되는 토큰 벤치마크**: README는 매 실행 뒤 토큰 벤치마크가 자동으로 출력된다고 밝힌다.
7. **자동 동기화 두 가지**: `--watch` 옵션은 파일 변경을 감시하고, `graphify hook install`은 post-commit 훅을 설치한다.
8. **에이전트가 파일로 탐색하는 wiki 출력**: `--wiki`는 community와 god node마다 Wikipedia 형식의 markdown 문서를 만들고 `index.md`를 진입점으로 둔다. 에이전트는 JSON을 파싱하지 않고 파일을 읽어 지식 베이스를 탐색한다.
9. **검증 가능한 worked 예제 공개**: 세 corpus의 원본 입력과 실제 출력을 저장소에 넣어 두어 사용자가 같은 수치를 재현할 수 있게 했다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 입력 유형별 추출 경로

README는 파일 종류에 따라 추출 방식이 갈린다고 표로 정리한다.

| 유형 | 확장자 | 추출 방식 |
|---|---|---|
| Code | `.py .ts .js .go .rs .java .c .cpp .rb .cs .kt .scala .php` | tree-sitter로 AST를 만든 뒤 call-graph 패스 |
| Docs | `.md .txt .rst` | Claude가 개념과 관계를 추출 |
| Papers | `.pdf` | 인용 mining과 개념 추출 |
| Images | `.png .jpg .webp .gif` | Claude vision. 스크린샷, 다이어그램, 다른 언어로 쓰인 이미지 포함 |

README는 이 네 종류를 임의로 섞어도 동작한다고 명시한다.

### 산출물 디렉토리

실행 결과는 `graphify-out/` 아래에 모인다.

| 항목 | 내용 |
|---|---|
| `graph.html` | 대화형 그래프. 노드 클릭, 검색, community 필터를 지원한다 |
| `obsidian/` | Obsidian vault로 바로 열 수 있는 형태 |
| `wiki/` | 에이전트 탐색용 Wikipedia 형식 문서. `--wiki` 옵션으로 생성한다 |
| `GRAPH_REPORT.md` | god node, 의외의 연결, 추천 질문을 담은 리포트 |
| `graph.json` | 지속되는 그래프. 몇 주 뒤에도 다시 읽지 않고 질의할 수 있다 |
| `cache/` | SHA256 캐시. 재실행 시 변경된 파일만 처리한다 |

### 설치

기본 경로는 PyPI 설치 한 줄이다.

```bash
pip install graphifyy && graphify install
```

README는 두 가지 환경 문제와 해결책을 함께 안내한다. Windows에서 `graphify` 명령을 인식하지 못하면 Python Scripts 폴더(`%APPDATA%\Python\Python3xx\Scripts`)를 PATH에 추가하거나 `pipx install graphifyy`를 쓴다. macOS에서 externally-managed-environment 오류로 `pip install`이 실패해도 `pipx install`을 권한다.

수동 설치 경로도 있다. `v1` 브랜치의 `skills/graphify/skill.md`를 `~/.claude/skills/graphify/SKILL.md`로 내려받은 뒤, `~/.claude/CLAUDE.md`에 스킬 항목을 추가한다. README가 제시하는 등록 문구는 사용자가 `/graphify`를 입력하면 다른 일을 하기 전에 Skill 도구로 `graphify` 스킬을 먼저 호출하라는 지시다.

### 명령

README의 Usage 절이 제시하는 명령은 다음과 같다.

```
/graphify                          # 현재 디렉토리
/graphify ./raw                    # 특정 폴더
/graphify ./raw --mode deep        # INFERRED 엣지를 더 적극적으로 추출
/graphify ./raw --update           # 변경된 파일만 재추출해 기존 그래프에 병합

/graphify add https://arxiv.org/abs/1706.03762   # 논문을 받아 저장하고 그래프 갱신
/graphify add https://x.com/karpathy/status/...  # 트윗을 받아 저장

/graphify query "what connects attention to the optimizer?"
/graphify path "DigestAuth" "Response"
/graphify explain "SwinTransformer"

/graphify ./raw --watch            # 파일 변경에 맞춰 그래프 자동 동기화
/graphify ./raw --wiki             # index.md와 community별 문서 생성
/graphify ./raw --svg              # graph.svg 내보내기
/graphify ./raw --graphml          # graph.graphml 내보내기 (Gephi, yEd)
/graphify ./raw --neo4j            # Neo4j용 cypher.txt 생성
/graphify ./raw --mcp              # MCP stdio 서버 시작

graphify hook install              # post-commit 훅 설치
```

`/graphify add`가 받는 예시로 arXiv 논문 주소와 X 게시물 주소가 함께 제시된다.

### 그래프가 돌려주는 분석 결과

README의 What you get 절은 네 가지를 든다.

| 결과 | 정의 |
|---|---|
| God node | 연결도가 가장 높은 개념. 모든 것이 그곳을 거쳐 연결된다 |
| Surprising connection | 복합 점수로 순위를 매긴 의외의 연결. 코드와 논문 사이 엣지가 코드와 코드 사이 엣지보다 높은 순위를 받고, 결과마다 왜 그런지를 평이한 영어로 설명한다 |
| Suggested question | 이 그래프가 특히 잘 답할 수 있는 질문 4개에서 5개 |
| Token benchmark | 실행이 끝날 때마다 자동 출력. 혼합 corpus에서 71.5배 절감 |

### 신뢰도 라벨

모든 엣지에 세 라벨 중 하나가 붙는다.

| 라벨 | 뜻 |
|---|---|
| `EXTRACTED` | 자료에서 실제로 찾아낸 관계 |
| `INFERRED` | 추론으로 채운 관계 |
| `AMBIGUOUS` | 판정이 애매한 관계 |

`--mode deep`은 `INFERRED` 엣지를 더 적극적으로 뽑는 옵션이다.

### 자동 동기화 두 경로

`--watch`는 백그라운드 터미널에서 실행하며 코드베이스가 바뀌는 대로 그래프를 갱신한다. 코드 파일 저장은 즉시 재빌드를 유발하고 이때는 AST만 쓰므로 LLM 호출이 없다. 문서와 이미지가 바뀌면 사용자에게 알리고, LLM 재추출은 사용자가 `--update`를 실행할 때 이뤄진다. README는 여러 에이전트가 동시에 코드를 쓰는 작업 방식에서 그래프가 작업 사이사이 최신 상태를 유지한다는 점을 이 기능의 쓸모로 든다.

`graphify hook install`은 post-commit 훅을 설치해 커밋마다 그래프를 다시 만든다. 백그라운드 프로세스가 필요 없고, 커밋당 한 번만 발동하며, 편집기 종류를 가리지 않고, 기존 훅과 함께 설치해도 안전하다고 README는 밝힌다.

### 기술 스택

NetworkX와 Leiden(graspologic), tree-sitter, Claude, vis.js로 구성된다. README는 Neo4j가 필요 없고 서버도 필요 없으며 전부 로컬에서 실행된다고 명시한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 토큰 절감

README의 Worked examples 표가 corpus 세 개의 측정값을 싣는다.

| Corpus | 파일 수 | 절감 | 출력 위치 |
|---|---:|---:|---|
| Karpathy 저장소와 논문 5편, 이미지 4장 | 52 | 71.5배 | `worked/karpathy-repos/` |
| graphify 소스와 Transformer 논문 | 4 | 5.4배 | `worked/mixed-corpus/` |
| httpx (합성 Python 라이브러리) | 6 | 약 1배 | `worked/httpx/` |

README의 해석은 절감폭이 corpus 크기에 따라 커진다는 것이다. 6개 파일은 어차피 context window에 들어가므로 그래프의 가치가 압축이 아니라 구조적 명료성에 있고, 코드와 논문과 이미지가 섞인 52개 파일에서는 71배 이상이 된다. 각 `worked/` 폴더에 원본 입력과 실제 출력인 `GRAPH_REPORT.md`, `graph.json`이 들어 있어 사용자가 직접 실행해 수치를 확인할 수 있다.

### 재실행 비용

SHA256 캐시가 `graphify-out/cache/`에 남아 재실행 때 변경된 파일만 처리한다. `--update`는 변경된 파일만 다시 추출해 기존 그래프에 병합한다. `graph.json`이 남아 있으므로 몇 주 뒤에도 원본 파일을 다시 읽지 않고 질의할 수 있다.

### 기여 방식

README의 Contributing 절은 worked 예제를 가장 신뢰를 쌓는 기여로 든다. 실제 corpus에 `/graphify`를 실행하고 출력을 `worked/{slug}/`에 저장한 뒤, 그래프가 무엇을 맞히고 무엇을 틀렸는지 정직하게 평가한 `review.md`를 함께 PR로 올리는 방식이다. 추출 버그는 입력 파일과 `graphify-out/cache/`의 캐시 항목, 그리고 무엇이 누락되거나 지어내졌는지를 담아 이슈로 올리라고 안내한다. 모듈별 책임과 새 언어 추가 방법은 `ARCHITECTURE.md`가 다룬다고 밝힌다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **raw가 README 스텁이라 내부 구현 세부는 확인 불가**: 커밋 `0507ad0` 이후 raw에는 README 본문만 남았다. 모듈 구성, 테스트 규모, 버전 이력, `ARCHITECTURE.md`가 서술하는 파이프라인 단계는 이 자료로 검증할 수 없다. README가 `ARCHITECTURE.md`의 존재와 역할만 언급한다.
- **작은 corpus에서는 토큰 이득이 없다**: 6개 파일 corpus의 절감은 약 1배다. README 자신이 그 크기는 이미 context window에 들어가므로 압축이 아니라 구조적 명료성이 가치라고 적는다.
- **`INFERRED` 엣지의 정확도는 사용자 검증에 맡긴다**: 신뢰도 라벨은 추측 여부를 알리지만 추측이 맞는지는 판정하지 않는다. `AMBIGUOUS`는 애매함을 표시하는 데서 멈춘다.
- **문서와 이미지 변경은 자동 반영되지 않는다**: `--watch`는 코드 저장만 즉시 재빌드한다. 문서와 이미지는 알림만 주고 사용자가 `--update`를 실행해야 LLM 재추출이 이뤄진다.
- **설치 경로가 환경마다 갈린다**: Windows는 PATH 추가가 필요할 수 있고, macOS는 externally-managed-environment 오류로 `pip install`이 실패할 수 있다. 두 경우 모두 `pipx install`이 대안이다.
- **패키지 이름이 임시다**: PyPI 이름은 `graphifyy`이고 README는 `graphify` 이름을 되찾는 중이라고 밝힌다. 설치 명령과 실행 명령의 이름이 서로 다르다.
- **그래프 품질의 객관적 측정은 진행 중이다**: 품질 평가를 worked 예제의 `review.md`라는 사람 손 평가에 맡기고 있으며, README가 자동화된 품질 지표를 제시하지 않는다.

## 6. 관련 연구 (Related Work)

### wiki 내부의 같은 프로젝트 자료

- [[applications/graphify-labs-graphify]]: 같은 프로젝트가 `Graphify-Labs` 조직으로 이전한 뒤의 저장소 페이지다. 본 페이지의 raw는 `safishamsi` 계정 시절 README다.
- [[applications/shamsi-2026-graphify-knowledge-graphs-for-ai]]: 저자가 운영하는 한국어 랜딩 페이지 기반 자료다.
- [[applications/todaycode-2026-graphify-llm-token-reduction-wiki]]: 같은 도구를 한 시간 분량으로 다룬 한국어 영상 자료다.

### wiki 내부의 비교 대상

- [[applications/garrytan-gbrain]]: markdown을 원본으로 두고 지식 그래프를 자동으로 만드는 에이전트 메모리라는 점에서 가장 가까운 비교 대상이다. GBrain은 개인 지식 저장소를 향하고, graphify는 임의 폴더의 지식 그래프 빌더를 향한다.
- [[applications/liu-2026-rag-llm-wiki-or-gbrain]]: retrieve와 compile, act로 나눈 분류에서 graphify는 그래프 retrieve와 `GRAPH_REPORT.md` 및 `--wiki` compile이 결합된 형태에 해당한다.
- [[applications/vectorize-2026-gbrain-review-honest-assessment]]: GBrain 평가용 채점표로, 같은 계열 도구를 비교할 때 참고할 수 있다.
- [[database/li-2026-beyond-semantic-similarity-rethinking-retrieval]]: 에이전트가 raw corpus를 직접 검색하자는 주장이다. raw 파일 직접 읽기 대비 토큰 절감을 앞세우는 graphify와 반대 방향이다.
- [[database/edge-2024-from-local-to-global]]: Leiden community detection을 그래프 기반 retrieval에 도입한 GraphRAG 논문이다. graphify가 쓰는 Leiden과 graspologic 구현이 같은 계보에 있다.
- [[database/guo-2025-lightrag-simple-and-fast]]: 그래프 기반 RAG의 대표 후속 작업이다.
- [[database/hkuds-rag-anything]]: 이미지와 표, 수식을 포함한 멀티모달 RAG다. graphify도 이미지를 다루지만 modality별 처리기를 따로 두지는 않는다.
- [[overviews/lightrag-family-graph-rag-overview]]: 그래프 기반 RAG 계열 overview다. graphify는 이 계열을 코드 도메인과 에이전트 스킬 쪽으로 확장한 사례로 볼 수 있다.

### wiki 외부에서 README가 언급하는 것

- **tree-sitter**: 코드 AST 추출의 기반이다.
- **Leiden과 graspologic**: community 구조를 만드는 알고리즘과 그 구현이다.
- **NetworkX**: 그래프 표현이다.
- **vis.js**: `graph.html`의 대화형 시각화다.
- **Claude와 Claude vision**: 문서와 이미지에서 개념과 관계를 추출한다.
- **Andrej Karpathy의 `/raw` 폴더**: README가 문제 정의로 인용한 작업 방식이다. 논문과 트윗, 스크린샷, 노트를 한 폴더에 모아 두는 방식을 가리키며, 이 저장소의 `CLAUDE.md`가 출발점으로 밝힌 LLM Wiki 패턴과 같은 계보다. README는 특정 gist 주소를 인용하지 않으므로 여기서도 주소를 적지 않는다.

## 7. 용어집 (Glossary)

- **`/graphify` 스킬**: Claude Code에서 입력하는 슬래시 명령. 스킬이 폴더를 읽고 지식 그래프를 만든 뒤 결과를 돌려준다.
- **`graphify-out/`**: 모든 산출물이 모이는 디렉토리. `graph.html`, `obsidian/`, `wiki/`, `GRAPH_REPORT.md`, `graph.json`, `cache/`로 구성된다.
- **God node**: 그래프에서 연결도가 가장 높은 개념. 다른 개념들이 그곳을 거쳐 이어진다.
- **Surprising connection**: 복합 점수로 순위를 매긴 의외의 연결. 코드와 논문 사이 엣지가 코드와 코드 사이 엣지보다 높은 순위를 받는다.
- **신뢰도 라벨**: `EXTRACTED`는 자료에서 찾아낸 관계, `INFERRED`는 추론으로 채운 관계, `AMBIGUOUS`는 판정이 애매한 관계를 뜻한다.
- **`--mode deep`**: `INFERRED` 엣지를 더 적극적으로 추출하는 실행 옵션.
- **`--update`**: 변경된 파일만 다시 추출해 기존 그래프에 병합하는 실행 옵션.
- **`--wiki`**: community와 god node마다 Wikipedia 형식 문서를 만들고 `index.md`를 진입점으로 두는 출력 옵션.
- **`graphify hook install`**: 커밋마다 그래프를 다시 만드는 post-commit 훅을 설치하는 명령.
- **`graphifyy`**: PyPI 패키지 이름. `graphify` 이름을 되찾는 동안 쓰는 임시 이름이며 CLI 명령은 `graphify` 그대로다.
