---
title: "graphify (Safi Shamsi): 임의의 폴더를 지식 그래프로 만드는 Claude Code 스킬"
type: repo
year: 2026
category: applications
raw_path: raw/repos/safishamsi-graphify.md
raw_filename: "safishamsi-graphify.md"
source_collection: external
source: safishamsi-graphify.md
org: "safishamsi"
repo: "graphify"
url: "https://github.com/safishamsi/graphify"
license: "MIT"
tags: [knowledge-graph, code-knowledge-graph, agent-skill, claude-code, mcp, tree-sitter, leiden, graphrag, repo, oss]
---

## 요약

graphify는 Claude Code에서 `/graphify`를 입력하면 지정한 폴더를 읽어 하나의 지식 그래프로 만드는 스킬이다. 입력 폴더의 종류를 가리지 않아서 코드베이스도, 논문과 스크린샷을 모아 둔 자료 폴더도 같은 명령으로 처리한다.

만들어진 그래프는 사라지지 않고 `graphify-out/` 디렉토리에 파일로 남는다. 대화형 HTML, Obsidian vault, 에이전트가 읽을 wiki 문서, 사람이 읽을 리포트, 그래프 JSON이 한 번의 실행에서 함께 나온다. 세션이 끝나도 `graph.json`이 남기 때문에 몇 주 뒤에 원본 파일을 다시 읽지 않고 질의할 수 있다.

핵심 주장은 두 가지다. 첫째, 원본 파일을 그대로 읽는 방식과 비교해 질의당 토큰이 71.5배 줄었다. 둘째, 모든 엣지에 `EXTRACTED`, `INFERRED`, `AMBIGUOUS` 중 하나를 붙여 무엇이 자료에서 찾아낸 관계이고 무엇이 추론으로 채운 관계인지 사용자가 항상 알 수 있게 했다.

이 페이지의 근거 자료는 `safishamsi` 계정 시절 저장소의 README 본문이다. 같은 프로젝트가 조직을 옮긴 뒤의 저장소는 [[applications/graphify-labs-graphify]]가 다룬다.

## 배경

graphify가 겨냥한 문제는 README가 직접 인용한 Andrej Karpathy의 작업 방식이다. Karpathy는 `/raw`라는 폴더 하나를 두고 논문과 트윗, 스크린샷, 노트를 계속 쌓아 둔다.

이 방식은 모으기는 쉽지만 쓰기가 어렵다. 질문이 생길 때마다 에이전트가 폴더의 파일을 다시 읽어야 하고, 파일이 쌓일수록 한 번의 질의에 들어가는 토큰이 늘어난다. 세션이 끝나면 읽어 둔 내용도 함께 사라져서 다음 세션은 같은 읽기를 처음부터 반복한다.

README는 graphify가 이 문제에 대한 답이라고 적고 근거로 세 가지를 든다. 질의당 토큰이 원본 직접 읽기 대비 71.5배 적다는 점, 그래프가 세션을 넘어 유지된다는 점, 발견한 것과 추측한 것을 정직하게 구분한다는 점이다.

세 번째 근거가 이 도구의 성격을 잘 보여 준다. 폴더를 그래프로 바꾸는 과정에는 자료에 명시된 관계뿐 아니라 모델이 추론한 관계도 섞여 들어간다. graphify는 그 둘을 지우지 않고 라벨로 남긴다.

| 기준 | 원본 파일 직접 읽기 | graphify 그래프 |
|---|---|---|
| 질의당 토큰 | 폴더의 파일을 그대로 읽는다 | 혼합 corpus 기준 71.5배 적다 |
| 세션 간 지속 | 세션이 끝나면 읽은 내용이 사라진다 | `graph.json`이 남아 다시 읽지 않고 질의한다 |
| 관계의 출처 | 읽은 사람이 판단한다 | 엣지마다 발견인지 추측인지 라벨이 붙는다 |

세 기준이 같은 방향을 가리킨다. 자료를 한 번 정리해 두는 비용을 치르고 그 뒤의 질의를 싸게 만드는 방향이다. 첫 빌드는 폴더 전체를 읽어야 하지만 이후의 질문은 그래프에 던진다.

## 핵심 개념

**지식 그래프**는 자료에서 뽑아낸 개념을 노드로, 개념 사이의 관계를 엣지로 표현한 구조다. graphify는 코드의 호출 관계와 문서의 개념 관계, 이미지에서 읽어낸 관계를 하나의 그래프에 합친다.

그래프가 토큰을 줄이는 원리는 읽는 대상을 바꾸는 데 있다. 질문이 생길 때마다 폴더의 파일을 다시 읽는 대신, 이미 만들어 둔 그래프에 묻고 필요한 부분만 본다. README가 재는 71.5배는 이 차이를 질의 한 번당 토큰으로 환산한 값이다.

**god node**는 그래프에서 연결도가 가장 높은 개념을 뜻한다. 다른 개념들이 그곳을 거쳐 이어지는 지점이라서, 코드베이스를 처음 보는 사람이 어디부터 읽어야 하는지 알려 주는 단서가 된다.

**surprising connection**은 의외성이 높은 연결이다. graphify는 복합 점수로 순위를 매기는데, 코드와 논문 사이 엣지에 코드와 코드 사이 엣지보다 높은 순위를 준다. 같은 종류의 파일끼리 이어지는 것보다 종류를 건너뛰어 이어지는 편이 사용자가 몰랐을 가능성이 크다는 판단이다. 결과마다 왜 그 연결이 나왔는지를 평이한 영어로 함께 적는다.

**community**는 그래프에서 서로 촘촘히 이어진 노드 무리를 뜻한다. graphify는 Leiden 알고리즘으로 community를 찾고, `graph.html`의 필터와 `--wiki` 출력의 문서 단위가 모두 이 community를 기준으로 나뉜다. Leiden 알고리즘 자체는 [[database/edge-2024-from-local-to-global]]의 GraphRAG가 쓰는 것과 같은 계보이고 구현체도 같은 graspologic이다.

**신뢰도 라벨**은 엣지마다 붙는 세 값이다. `EXTRACTED`는 자료에서 실제로 찾아낸 관계, `INFERRED`는 추론으로 채운 관계, `AMBIGUOUS`는 판정이 애매한 관계를 가리킨다. 이 구분이 환각을 없애 주지는 않지만, 사용자가 어떤 엣지를 그대로 믿고 어떤 엣지를 확인해야 하는지 판단할 근거를 준다.

**스킬**은 특정 작업 절차를 담아 에이전트에 결합하는 지침 패키지를 뜻한다. graphify가 별도 애플리케이션이 아니라 스킬로 배포된다는 점이 사용 방식을 결정한다. 사용자는 코딩 세션을 벗어나지 않고 `/graphify` 한 줄로 그래프를 만들고, 만들어진 그래프에 같은 세션에서 바로 질의한다.

**`graphify-out/`** 은 모든 산출물이 모이는 디렉토리다. 그래프가 메모리 안에만 있다가 사라지지 않고 파일로 남는다는 점이 이 도구의 지속성을 만든다.

## 방법

### 설치와 스킬 등록

설치는 PyPI 한 줄이 기본 경로다. Claude Code와 Python 3.10 이상이 필요하다.

```bash
pip install graphifyy && graphify install
```

두 명령의 역할이 다르다. `pip install graphifyy`가 패키지를 내려받고, `graphify install`이 스킬을 Claude Code에 등록한다. 등록이 끝나면 어느 디렉토리에서 Claude Code를 열어도 `/graphify`가 동작한다.

패키지 이름과 명령 이름이 다르다는 점에 주의한다. PyPI 이름은 `graphifyy`이고, README는 `graphify` 이름을 되찾는 동안 쓰는 임시 이름이라고 밝힌다. 설치가 끝나면 CLI 명령과 스킬 명령은 모두 `graphify`다.

운영체제마다 걸리는 지점이 다르고 README가 각각의 우회 방법을 적어 두었다.

| 환경 | 증상 | 해결 |
|---|---|---|
| Windows | 설치 후에도 `graphify` 명령을 인식하지 못한다 | Python Scripts 폴더(`%APPDATA%\Python\Python3xx\Scripts`)를 PATH에 추가하거나 `pipx install graphifyy`를 쓴다 |
| macOS | `pip install`이 externally-managed-environment 오류로 실패한다 | `pipx install graphifyy`를 쓴다 |

수동 설치 경로도 있다. `v1` 브랜치의 `skills/graphify/skill.md`를 `~/.claude/skills/graphify/SKILL.md`로 내려받은 뒤 `~/.claude/CLAUDE.md`에 스킬 항목을 추가한다. README가 제시하는 등록 문구는 사용자가 `/graphify`를 입력하면 다른 일을 하기 전에 Skill 도구로 `graphify` 스킬을 먼저 호출하라는 지시다. 즉 스킬 등록의 본질은 슬래시 명령과 스킬 호출을 연결하는 한 줄이다.

### 입력 유형별 추출 경로

graphify는 파일 확장자를 보고 추출 방식을 정한다. 네 경로가 각각 다른 도구를 쓴다.

| 유형 | 확장자 | 추출 방식 |
|---|---|---|
| Code | `.py .ts .js .go .rs .java .c .cpp .rb .cs .kt .scala .php` | tree-sitter로 AST를 만든 뒤 call-graph 패스 |
| Docs | `.md .txt .rst` | Claude가 개념과 관계를 추출 |
| Papers | `.pdf` | 인용 mining과 개념 추출 |
| Images | `.png .jpg .webp .gif` | Claude vision |

코드 경로만 성격이 다르다. tree-sitter는 소스 코드를 문법 구조로 파싱하는 도구라서 결과가 모델의 판단에 의존하지 않는다. 나머지 세 경로는 Claude가 내용을 읽고 개념과 관계를 뽑는다.

이 차이는 비용으로도 나타난다. `--watch`가 코드 저장에만 즉시 재빌드를 거는 것도 코드 경로가 AST만 쓰기 때문이다. 문서와 이미지 경로는 모델을 호출하므로 같은 방식으로 자동화하기 어렵다.

이미지 경로의 범위가 특히 넓다. README는 스크린샷과 다이어그램, 화이트보드 사진, 다른 언어로 쓰인 이미지까지 Claude vision으로 처리해 같은 그래프에 잇는다고 밝힌다. 네 종류를 임의로 섞은 폴더도 그대로 동작한다.

### 실행 명령

기본 실행은 경로 하나를 주는 것이다. 옵션은 추출 방식을 바꾸는 것과 출력 형식을 고르는 것으로 나뉜다.

| 명령 | 하는 일 |
|---|---|
| `/graphify` | 현재 디렉토리 전체를 처리한다 |
| `/graphify ./raw` | 지정한 폴더만 처리한다 |
| `/graphify ./raw --mode deep` | `INFERRED` 엣지를 더 적극적으로 추출한다 |
| `/graphify ./raw --update` | 변경된 파일만 다시 추출해 기존 그래프에 병합한다 |
| `/graphify ./raw --watch` | 파일이 바뀌는 대로 그래프를 자동 동기화한다 |
| `/graphify ./raw --wiki` | `index.md`와 community별 문서를 만든다 |
| `/graphify ./raw --svg` | `graph.svg`로 내보낸다 |
| `/graphify ./raw --graphml` | `graph.graphml`로 내보낸다. Gephi와 yEd에서 연다 |
| `/graphify ./raw --neo4j` | Neo4j용 `cypher.txt`를 만든다 |
| `/graphify ./raw --mcp` | MCP stdio 서버를 시작한다 |
| `graphify hook install` | 커밋마다 그래프를 다시 만드는 post-commit 훅을 설치한다 |

자료를 폴더에 직접 넣지 않고 주소로 추가하는 경로도 있다. `/graphify add`에 arXiv 논문 주소를 주면 논문을 받아 저장하고 그래프를 갱신하며, X 게시물 주소도 같은 방식으로 받는다. Karpathy의 `/raw` 폴더가 논문과 트윗을 함께 담는다는 문제 정의와 이 두 예시가 맞물린다.

### 그래프에 묻는 세 가지 질문

만들어진 그래프에는 세 종류의 질의를 보낸다. 세 명령이 각각 다른 형태의 답을 돌려준다.

| 명령 | 질문의 형태 | 예시 |
|---|---|---|
| `query` | 자연어 질문 | `graphify query "what connects attention to the optimizer?"` |
| `path` | 두 노드 사이의 경로 | `graphify path "DigestAuth" "Response"` |
| `explain` | 노드 하나의 설명 | `graphify explain "SwinTransformer"` |

세 명령은 사용자가 이미 아는 것의 양에 따라 나뉜다. 무엇을 물어야 할지 아직 정하지 못했으면 `query`, 두 개념 사이에 어떤 경로가 있는지 확인하려면 `path`, 특정 이름의 정체를 확인하려면 `explain`이다. README가 든 예시도 각각 자연어 질문 한 문장, 클래스 이름 두 개, 모델 이름 하나다.

### 산출물

한 번의 실행이 여섯 가지를 남긴다. 사람이 볼 것과 에이전트가 읽을 것, 다시 쓸 것이 함께 들어 있다.

| 항목 | 내용 | 주 독자 |
|---|---|---|
| `graph.html` | 대화형 그래프. 노드 클릭, 검색, community 필터를 지원한다 | 사람 |
| `obsidian/` | Obsidian vault로 바로 열 수 있는 형태 | 사람 |
| `wiki/` | Wikipedia 형식 문서. `--wiki` 옵션으로 생성한다 | 에이전트 |
| `GRAPH_REPORT.md` | god node, 의외의 연결, 추천 질문 | 사람 |
| `graph.json` | 지속되는 그래프. 다시 읽지 않고 질의한다 | 도구와 에이전트 |
| `cache/` | SHA256 캐시. 재실행 시 변경된 파일만 처리한다 | 도구 |

`--wiki` 출력의 설계 의도가 특히 분명하다. community와 god node마다 문서 하나를 만들고 `index.md`를 진입점으로 둔다. 에이전트를 `index.md`로 보내면 JSON을 파싱하지 않고 파일을 읽는 방식으로 지식 베이스를 탐색한다. 그래프 탐색을 에이전트가 이미 잘하는 파일 읽기로 바꾼 설계다.

`GRAPH_REPORT.md`에는 추천 질문 4개에서 5개가 들어간다. 이 그래프가 특히 잘 답할 수 있는 질문을 도구가 먼저 제안하는 방식이다.

### 다른 도구로 내보내기

graphify는 그래프를 자기 형식으로만 두지 않는다. 네 가지 옵션이 각각 다른 소비자를 겨냥한다.

| 옵션 | 산출물 | 소비자 |
|---|---|---|
| `--svg` | `graph.svg` | 문서에 붙이는 정적 이미지 |
| `--graphml` | `graph.graphml` | Gephi와 yEd 같은 그래프 도구 |
| `--neo4j` | `cypher.txt` | Neo4j 데이터베이스 |
| `--mcp` | MCP stdio 서버 | MCP를 지원하는 에이전트 |

앞의 세 옵션이 그래프를 파일로 꺼내는 경로라면 `--mcp`는 그래프를 살아 있는 상태로 여는 경로다. 서버를 시작하면 에이전트가 중간 파일을 거치지 않고 서버에 직접 질의한다.

Obsidian vault와 `--wiki` 문서까지 더하면 같은 그래프가 사람용, 도구용, 에이전트용 형식으로 동시에 존재한다. 그래프를 한 번 만들어 두고 읽는 쪽마다 다른 문을 열어 주는 구성이다.

### 자동 동기화 두 경로

그래프는 만든 순간부터 낡기 시작한다. graphify는 이를 두 가지 방식으로 막는다. 둘의 차이는 무엇이 재빌드를 유발하는지에 있다.

| 경로 | 발동 시점 | 비용 |
|---|---|---|
| `--watch` | 파일이 저장될 때 | 코드는 AST만 쓰므로 LLM 호출이 없다 |
| `graphify hook install` | 커밋될 때 | 백그라운드 프로세스가 필요 없다 |

`--watch`는 백그라운드 터미널에서 실행하며 코드베이스가 바뀌는 대로 그래프를 갱신한다. 코드 파일 저장은 즉시 재빌드를 유발하고, 이때는 AST만 쓰기 때문에 LLM 호출이 없다. 반면 문서와 이미지가 바뀌면 사용자에게 알리기만 하고, LLM 재추출은 사용자가 `--update`를 실행할 때 이뤄진다. 비싼 경로에는 사람의 승인을 한 단계 두었다.

README는 이 기능의 쓸모로 여러 에이전트가 동시에 코드를 쓰는 작업 방식을 든다. 여러 작업이 연달아 진행되는 동안 그래프가 사이사이 최신 상태를 유지한다.

post-commit 훅은 다른 성격이다. 커밋마다 그래프를 다시 만들며 백그라운드 프로세스가 필요 없다. 커밋당 한 번만 발동하고, 편집기 종류를 가리지 않으며, 기존 훅과 함께 설치해도 안전하다고 README는 밝힌다.

### 기술 스택

전체 구성은 다섯 가지다. NetworkX가 그래프를 표현하고, Leiden(graspologic)이 community를 찾고, tree-sitter가 코드를 파싱하고, Claude가 문서와 이미지를 읽고, vis.js가 `graph.html`을 그린다.

README는 Neo4j가 필요 없고 서버도 필요 없으며 전부 로컬에서 실행된다고 명시한다. `--neo4j` 옵션은 Neo4j를 쓰고 싶은 사용자를 위한 내보내기이지 실행 요구 사항이 아니다.

## 결과

### 리포트가 담는 네 가지

실행이 끝나면 `GRAPH_REPORT.md`와 콘솔 출력이 네 종류의 결과를 내놓는다.

| 결과 | 내용 |
|---|---|
| god node | 연결도가 가장 높은 개념. 무엇을 거쳐 모든 것이 이어지는지 |
| surprising connection | 복합 점수로 순위를 매긴 의외의 연결. 결과마다 왜 그런지를 평이한 영어로 붙인다 |
| suggested question | 이 그래프가 특히 잘 답할 수 있는 질문 4개에서 5개 |
| token benchmark | 실행이 끝날 때마다 자동 출력되는 절감 수치 |

네 결과의 성격이 다르다. 앞의 두 가지는 그래프가 무엇을 찾았는지 알려 주고, 세 번째는 사용자가 다음에 무엇을 물어야 할지 제안하며, 네 번째는 이 그래프를 유지할 가치가 있는지 판단할 근거를 준다.

추천 질문이 자동 생성된다는 점은 이 도구가 겨냥하는 상황과 맞물린다. 자료를 모아 두기만 한 폴더에서는 사용자 자신도 무엇을 물어야 할지 모르는 경우가 많다.

### 토큰 절감

README의 Worked examples 표가 corpus 세 개의 측정값을 싣는다. 저장소 안에 원본 입력과 실제 출력이 함께 들어 있어 사용자가 직접 확인할 수 있는 형태다.

| Corpus | 파일 수 | 절감 | 출력 위치 |
|---|---:|---:|---|
| Karpathy 저장소와 논문 5편, 이미지 4장 | 52 | 71.5배 | `worked/karpathy-repos/` |
| graphify 소스와 Transformer 논문 | 4 | 5.4배 | `worked/mixed-corpus/` |
| httpx (합성 Python 라이브러리) | 6 | 약 1배 | `worked/httpx/` |

절감폭은 corpus 크기에 비례한다. 6개 파일 corpus에서는 절감이 약 1배로 사실상 없으며, README가 이 결과를 그대로 싣는다.

README는 그 이유를 corpus 크기로 설명한다. 6개 파일은 어차피 context window에 들어가므로 그 규모에서 그래프의 가치는 압축이 아니라 구조적 명료성에 있다. 반면 코드와 논문과 이미지가 섞인 52개 파일에서는 절감이 71배 이상이 된다.

이 도구를 언제 쓸지 판단하는 기준이 여기서 나온다. 한 번에 다 읽을 수 있는 크기의 자료라면 그래프는 이해를 돕는 보조 도구이고, 다 읽을 수 없는 크기부터 토큰 절감이라는 실질적 이득이 생긴다.

토큰 벤치마크는 실행이 끝날 때마다 자동으로 출력된다. 사용자가 별도로 측정하지 않아도 자기 corpus에서 절감이 얼마인지 매번 확인할 수 있다.

### 수치의 재현

README는 이 수치를 주장으로만 두지 않는다. 각 `worked/` 폴더에 원본 입력 파일과 실제 출력인 `GRAPH_REPORT.md`, `graph.json`이 함께 들어 있다.

따라서 사용자는 같은 입력에 도구를 실행해 저장소가 적은 수치와 자기 환경의 수치를 맞춰 볼 수 있다. 벤치마크가 매 실행마다 자동 출력되므로 자기 corpus에서의 절감도 같은 방식으로 확인한다.

### 재실행 비용

첫 실행 이후의 비용을 낮추는 장치가 세 가지다.

| 장치 | 동작 |
|---|---|
| SHA256 캐시 | `graphify-out/cache/`에 남아 재실행 때 변경된 파일만 처리한다 |
| `--update` | 변경된 파일만 다시 추출해 기존 그래프에 병합한다 |
| `graph.json` | 그래프가 파일로 남아 몇 주 뒤에도 원본을 다시 읽지 않고 질의한다 |

세 장치가 같은 방향을 가리킨다. 첫 빌드는 자료 전체를 읽어야 하지만 그 뒤로는 변경분만 처리한다.

### 기여 방식과 품질 검증

README의 Contributing 절은 worked 예제를 가장 신뢰를 쌓는 기여로 든다. 절차는 세 단계다. 실제 corpus에 `/graphify`를 실행하고, 출력을 `worked/{slug}/`에 저장하고, 그래프가 무엇을 맞히고 무엇을 틀렸는지 정직하게 평가한 `review.md`를 함께 PR로 올린다.

추출 버그 신고 형식도 정해 두었다. 입력 파일과 `graphify-out/cache/`의 캐시 항목, 그리고 무엇이 누락되거나 지어내졌는지를 이슈에 담는다. 캐시 항목을 함께 요구하는 이유는 같은 입력에 대해 도구가 무엇을 뽑았는지를 재현 없이 확인하기 위해서다.

이 두 요구가 같은 목표를 향한다. 그래프가 무엇을 놓치고 무엇을 지어내는지를 사용자 사례로 모으는 것이다. 신뢰도 라벨이 개별 엣지 수준에서 하는 구분을 저장소 수준에서 반복하는 장치로 볼 수 있다.

모듈별 책임과 새 언어를 추가하는 방법은 `ARCHITECTURE.md`가 다룬다고 README가 안내한다.

## 한계

- **raw가 README 스텁이라 내부 구현 세부는 확인 불가**: 이 저장소의 커밋 `0507ad0`이 `raw/repos/`의 전체 클론을 README 스텁으로 교체했다. 그래서 모듈 구성, 테스트 규모, 버전 이력, `ARCHITECTURE.md`가 서술하는 파이프라인 단계는 이 자료로 검증할 수 없다. 이 페이지는 README 본문에 적힌 내용으로 서술을 한정했다.
- **작은 corpus에서는 토큰 이득이 없다**: 6개 파일 corpus의 절감은 약 1배다. 저자 자신이 그 규모에서는 압축이 아니라 구조적 명료성이 가치라고 적는다.
- **`INFERRED` 엣지의 정확도는 사용자 검증에 맡긴다**: 신뢰도 라벨은 추측 여부를 알리지만 그 추측이 맞는지는 판정하지 않는다. `AMBIGUOUS`도 애매함을 표시하는 데서 멈춘다. `--mode deep`은 `INFERRED` 엣지를 더 많이 뽑으므로 확인해야 할 관계도 함께 늘어난다.
- **문서와 이미지 변경은 자동 반영되지 않는다**: `--watch`가 즉시 재빌드하는 대상은 코드 저장뿐이다. 문서와 이미지는 알림만 주고 사용자가 `--update`를 실행해야 LLM 재추출이 이뤄진다.
- **설치 경로가 환경마다 갈린다**: Windows는 PATH 추가가 필요할 수 있고 macOS는 externally-managed-environment 오류가 날 수 있다. 두 경우 모두 `pipx install`이 대안이다.
- **코드 경로가 적용되는 확장자가 한정된다**: README가 코드 유형으로 명시한 확장자는 13종이다. 목록에 없는 언어의 파일은 tree-sitter AST 경로를 타지 못한다. 새 언어를 추가하는 방법은 `ARCHITECTURE.md`가 다룬다고만 안내한다.
- **패키지 이름이 임시다**: 설치할 이름은 `graphifyy`이고 실행할 이름은 `graphify`다. README는 원래 이름을 되찾는 중이라고 밝힌다.
- **공개된 worked 예제가 세 개뿐이다**: README의 표에 실린 corpus는 Karpathy 저장소 묶음과 graphify 자체 소스, 합성 라이브러리 하나다. 도메인이 다른 자료에서 같은 절감이 나오는지는 이 자료로 알 수 없고, 저자가 외부 기여자에게 worked 예제를 첫 번째 기여로 권하는 이유도 여기에 있다.
- **그래프 품질의 객관적 측정이 없다**: 품질 평가를 worked 예제의 `review.md`라는 사람 손 평가에 맡기고 있으며, README가 자동화된 품질 지표를 제시하지 않는다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| god node | 그래프에서 연결도가 가장 높은 개념. 다른 개념들이 그곳을 거쳐 이어진다 |
| surprising connection | 복합 점수로 순위를 매긴 의외의 연결. 코드와 논문 사이 엣지가 코드와 코드 사이 엣지보다 높은 순위를 받는다 |
| 신뢰도 라벨 | 엣지마다 붙는 `EXTRACTED`, `INFERRED`, `AMBIGUOUS`. 각각 자료에서 찾아낸 관계, 추론으로 채운 관계, 판정이 애매한 관계를 뜻한다 |
| `graphify-out/` | 모든 산출물이 모이는 디렉토리. `graph.html`, `obsidian/`, `wiki/`, `GRAPH_REPORT.md`, `graph.json`, `cache/`로 구성된다 |
| `--mode deep` | `INFERRED` 엣지를 더 적극적으로 추출하는 실행 옵션 |
| `graphifyy` | PyPI 패키지 이름. `graphify` 이름을 되찾는 동안 쓰는 임시 이름이며 CLI 명령은 `graphify` 그대로다 |

## 관련 페이지

- [[applications/graphify-labs-graphify]]: 같은 프로젝트가 `Graphify-Labs` 조직으로 이전한 뒤의 저장소 페이지다. 본 페이지의 근거는 `safishamsi` 계정 시절 README다.
- [[applications/shamsi-2026-graphify-knowledge-graphs-for-ai]]: 저자가 운영하는 한국어 랜딩 페이지 기반 자료다. 도구를 처음 접할 때 읽기에 적합하다.
- [[applications/todaycode-2026-graphify-llm-token-reduction-wiki]]: 같은 도구를 한 시간 분량으로 다룬 한국어 영상 자료다. 실제 폴더에 적용하는 시연이 들어 있다.
- [[applications/garrytan-gbrain]]: markdown을 원본으로 두고 지식 그래프를 자동으로 만드는 에이전트 메모리다. GBrain은 개인 지식 저장소를 향하고 graphify는 임의 폴더의 그래프 빌더를 향한다.
- [[applications/liu-2026-rag-llm-wiki-or-gbrain]]: retrieve와 compile, act로 나눈 분류다. graphify는 그래프 retrieve와 `GRAPH_REPORT.md` 및 `--wiki` compile이 결합된 형태에 해당한다.
- [[applications/vectorize-2026-gbrain-review-honest-assessment]]: GBrain 평가용 채점표다. 같은 계열 도구를 비교할 때 참고할 수 있다.
- [[database/li-2026-beyond-semantic-similarity-rethinking-retrieval]]: 에이전트가 원본 corpus를 직접 검색하자는 주장이다. 원본 직접 읽기 대비 토큰 절감을 앞세우는 graphify와 반대 방향이다.
- [[database/edge-2024-from-local-to-global]]: Leiden community detection을 그래프 기반 retrieval에 도입한 GraphRAG 논문이다. graphify가 쓰는 Leiden과 graspologic 구현이 같은 계보다.
- [[database/guo-2025-lightrag-simple-and-fast]]: 그래프 기반 RAG의 대표 후속 작업이다.
- [[database/hkuds-rag-anything]]: 이미지와 표, 수식을 다루는 멀티모달 RAG다. graphify도 이미지를 다루지만 modality별 처리기를 따로 두지는 않는다.
- [[overviews/lightrag-family-graph-rag-overview]]: 그래프 기반 RAG 계열 overview다. graphify는 이 계열을 코드 도메인과 에이전트 스킬 쪽으로 확장한 사례로 볼 수 있다.
