---
title: "graphify (Graphify-Labs): Any input → knowledge graph + /graphify skill"
type: repo
year: 2026
category: applications
raw_path: raw/repos/graphify-labs-graphify.md
raw_filename: "graphify-labs-graphify.md"
source_collection: external
source: graphify-labs-graphify.md
org: "Graphify-Labs"
repo: "graphify"
url: "https://github.com/Graphify-Labs/graphify"
license: "MIT"
tags: [knowledge-graph, code-knowledge-graph, agent-skill, claude-code, mcp, tree-sitter, leiden, graphrag, repo, oss]
---

## 요약

`Graphify-Labs/graphify`는 Claude Code에서 `/graphify` 한 줄로 임의 폴더를 knowledge graph로 바꾸는 스킬이자 CLI 도구다. 코드, 마크다운 문서, 논문 PDF, 스크린샷과 도식 이미지를 한 그래프에 모으고, 이후의 질문은 원본 파일이 아니라 그 그래프에 묻게 한다. 저자는 코드와 논문과 이미지가 섞인 파일 52개 코퍼스에서 질의당 토큰이 71.5배 줄었다고 보고한다.

이 페이지의 근거 자료는 저장소 클론이 아니라 README 스냅샷 파일 한 개다. 그리고 이 wiki에는 같은 제품의 스냅샷이 `safishamsi/graphify` 이름으로 하나 더 있다. 두 raw 파일의 본문을 대조한 결과 차이가 한 줄도 없었다. 따라서 이 페이지는 README 내용을 스스로 모두 담고, 두 스냅샷이 실제로 갈리는 지점을 별도 절에서 밝힌다.

## 배경

graphify가 문제로 삼는 상황은 자료를 한 폴더에 쌓아 두는 습관이다. README 서두는 Andrej Karpathy가 논문과 트윗과 스크린샷과 노트를 `/raw` 폴더에 넣어 둔다는 사실을 들고, graphify가 그 문제의 답이라고 적는다.

폴더에 자료를 모아 두는 방식에는 세 가지 비용이 따른다. 첫째, 질문할 때마다 파일 전체를 다시 읽어야 해서 토큰이 반복해서 든다. 둘째, 읽어서 얻은 구조는 세션이 끝나면 사라진다. 셋째, 자료에 실제로 적혀 있던 관계와 모델이 짐작한 관계가 뒤섞여 남는다.

README는 이 세 가지에 각각 대응하는 답을 내놓는다. 질의당 토큰을 71.5배까지 줄이고, 그래프를 파일로 저장해 세션을 넘겨 재사용하며, 모든 edge에 근거 등급을 붙여 찾아낸 관계와 추측한 관계를 구분한다.

진입점을 Claude Code 스킬로 잡은 점도 설계의 일부다. 사용자는 별도 서버나 데이터베이스를 세우지 않고 `/graphify .` 한 줄만 입력하면 되고, 그래프 생성과 질의와 내보내기가 모두 같은 명령 아래 붙어 있다.

도구 구성도 같은 방향이다. README는 Neo4j 같은 별도 그래프 데이터베이스도, 상시 실행되는 서버도 없이 전부 로컬에서 실행된다고 밝힌다. 설치 한 번과 명령 한 줄로 시작하고, 결과물은 작업 폴더 아래에 파일로 남는다.

## 핵심 개념

**knowledge graph**는 자료에서 뽑은 개념을 노드로, 개념 사이의 관계를 edge로 표현한 구조다. graphify는 코드와 문서와 논문과 이미지를 각각 다른 방식으로 읽되 결과를 한 그래프로 합친다. 그래서 코드 심벌과 논문 개념이 같은 그래프 안에서 이어질 수 있다.

**영속 그래프**는 한 번 만든 그래프를 `graph.json` 파일로 남겨 두는 방식이다. 세션이 끝나도 사라지지 않아서, 몇 주 뒤에도 원본 파일을 다시 읽지 않고 질의할 수 있다. README가 내세우는 질의당 토큰 절감은 원본을 다시 읽지 않는다는 이 성질과 짝을 이룬다.

**edge 근거 등급**은 관계 하나하나에 붙는 표시다. `EXTRACTED`는 자료에서 직접 찾아낸 관계, `INFERRED`는 모델이 추론한 관계, `AMBIGUOUS`는 판단이 갈리는 관계를 뜻한다. 사용자가 그래프를 신뢰할 범위를 스스로 정하게 하려는 장치다.

**god node**는 연결 차수가 가장 높은 개념 노드를 가리킨다. 서로 떨어져 있던 자료들이 어떤 개념을 거쳐 이어지는지 보여 준다.

**community**는 그래프에서 서로 촘촘히 연결된 노드 묶음이다. graphify는 Leiden 알고리즘으로 community를 나누고, 대화형 그래프의 필터 단위이자 `--wiki`가 만드는 문서 한 편의 단위로 쓴다.

**SHA256 캐시**는 파일 내용의 해시를 저장해 두는 장치다. 다시 실행할 때 내용이 바뀐 파일만 처리해서, 폴더가 커져도 전체 재처리를 피한다.

**worked example**은 실제 코퍼스에 도구를 실행한 뒤 입력 파일과 출력 결과를 저장소에 함께 남긴 재현용 사례다. README는 이를 가장 신뢰를 높이는 기여 형태로 제시한다.

## 방법

### 전체 사용 흐름

README가 상정하는 사용 순서는 설치, 최초 생성, 확인, 질의, 유지, 내보내기 여섯 단계다.

1. `pip install graphifyy && graphify install`로 스킬을 설치한다.
2. 대상 폴더에서 Claude Code를 열고 `/graphify .`을 입력한다.
3. `graphify-out/` 아래에 대화형 그래프, 영속 그래프, 보고서, 캐시가 만들어진다.
4. `GRAPH_REPORT.md`에서 god node, 뜻밖의 연결, 추천 질문을 확인한다.
5. `query`, `path`, `explain`으로 그래프에 직접 묻는다.
6. 폴더 내용이 바뀌면 `--update`, `--watch`, post-commit 훅 가운데 하나로 그래프를 따라 갱신한다.
7. 다른 도구로 넘길 필요가 있으면 `--svg`, `--graphml`, `--neo4j`, `--mcp`로 내보낸다.

앞의 세 단계는 한 번만 거치면 되고, 이후에는 질의와 갱신이 반복된다. 아래에서 각 단계의 세부를 나눠 설명한다.

### 설치와 진입점

설치 요구 사항은 Claude Code와 Python 3.10 이상 두 가지다. 기본 경로는 `pip install graphifyy && graphify install`이고, 설치 후 아무 디렉토리에서 Claude Code를 열어 `/graphify .`을 입력하면 된다.

PyPI 패키지 이름만 `graphifyy`로 y가 하나 더 붙어 있다. README는 `graphify` 이름을 되찾는 동안 쓰는 임시 이름이며 CLI와 스킬 명령은 그대로 `graphify`라고 밝힌다.

플랫폼별 예외 안내도 있다. Windows에서 명령을 찾지 못하면 Python Scripts 폴더를 PATH에 추가하거나 PATH를 자동으로 처리하는 `pipx install graphifyy`를 쓰라고 적고, macOS에서 externally-managed 오류가 나는 경우에도 같은 pipx 경로를 제시한다.

수동 설치 경로는 스킬 파일을 직접 배치하는 방식이다. `~/.claude/skills/graphify/SKILL.md`로 스킬 문서를 내려받은 뒤 `~/.claude/CLAUDE.md`에 트리거 한 줄을 추가한다. 사용자가 `/graphify`를 입력하면 다른 일보다 먼저 Skill 도구를 호출하라는 지시를 명시해 두는 구성이다.

### 입력 유형별 추출 경로

입력 파일은 유형에 따라 다른 추출 경로를 탄다. 코드만 정적 분석으로 처리하고 나머지는 모델이 읽는다.

| 유형 | 확장자 | 추출 방식 |
|---|---|---|
| Code | `.py .ts .js .go .rs .java .c .cpp .rb .cs .kt .scala .php` (13종) | tree-sitter로 AST를 파싱하고 call-graph pass를 한 번 더 돈다 |
| Docs | `.md .txt .rst` | Claude가 개념과 개념 사이의 관계를 추출한다 |
| Papers | `.pdf` | citation mining과 개념 추출을 함께 수행한다 |
| Images | `.png .jpg .webp .gif` | Claude vision으로 스크린샷, 도식, 다른 언어로 쓰인 이미지를 읽는다 |

멀티모달 범위는 README가 특히 강조하는 지점이다. 코드와 PDF와 마크다운뿐 아니라 스크린샷, 도식, 화이트보드를 찍은 사진, 다른 언어로 쓰인 이미지까지 같은 그래프에 넣는다고 적는다. 이미지 경로를 Claude vision이 맡기 때문에 사진이나 손으로 그린 도식도 텍스트 자료와 같은 처리 흐름을 탄다.

코드 경로가 AST 기반이라는 점은 뒤의 자동 동기화 설계와 이어진다. 코드 변경은 모델 호출 없이 다시 파싱하면 되기 때문이다.

### 명령 구성

명령은 그래프 생성, 자료 추가, 질의, 자동화, 내보내기 다섯 묶음으로 나뉜다.

| 묶음 | 명령 | 동작 |
|---|---|---|
| 그래프 생성 | `/graphify`, `/graphify ./raw` | 현재 폴더 또는 지정한 폴더를 처리한다 |
| 그래프 생성 | `/graphify ./raw --mode deep` | INFERRED edge를 더 적극적으로 추출한다 |
| 그래프 생성 | `/graphify ./raw --update` | 변경된 파일만 다시 추출해 기존 그래프에 병합한다 |
| 자료 추가 | `/graphify add <arXiv URL>` | 논문을 받아 저장하고 그래프를 갱신한다 |
| 자료 추가 | `/graphify add <x.com URL>` | 트윗을 받아 같은 흐름으로 처리한다 |
| 질의 | `/graphify query "..."` | 자연어 질문에 그래프로 답한다 |
| 질의 | `/graphify path "A" "B"` | 두 노드 사이의 경로를 찾는다 |
| 질의 | `/graphify explain "X"` | 특정 노드를 설명한다 |
| 자동화 | `/graphify ./raw --watch` | 파일 변경을 감시해 그래프를 자동으로 동기화한다 |
| 자동화 | `graphify hook install` | 커밋마다 그래프를 다시 만드는 post-commit 훅을 설치한다 |
| 내보내기 | `--wiki` | community와 god node마다 문서를 만들고 `index.md`를 진입점으로 둔다 |
| 내보내기 | `--svg`, `--graphml` | `graph.svg`와, Gephi나 yEd가 읽는 `graph.graphml`을 만든다 |
| 내보내기 | `--neo4j`, `--mcp` | Neo4j용 `cypher.txt`를 만들거나 MCP stdio 서버를 띄운다 |

질의 명령 세 가지는 서로 쓰임이 다르다. `query`는 자유로운 질문을, `path`는 두 개념이 어떻게 이어지는지를, `explain`은 개념 하나의 주변 구조를 묻는다.

### 출력 디렉토리

실행 결과는 `graphify-out/` 아래에 모인다. 사람이 볼 산출물, 에이전트가 읽을 산출물, 다시 쓸 상태 파일이 함께 들어간다.

| 산출물 | 내용 | 주 사용자 |
|---|---|---|
| `graph.html` | 노드 클릭, 검색, community 필터가 되는 대화형 그래프 | 사람 |
| `obsidian/` | Obsidian vault로 열 수 있는 형태의 내보내기 | 사람 |
| `wiki/` | `--wiki` 지정 시 만들어지는 Wikipedia 형식 문서 묶음 | 에이전트 |
| `GRAPH_REPORT.md` | god node, 뜻밖의 연결, 추천 질문을 담은 보고서 | 사람 |
| `graph.json` | 몇 주 뒤에도 원본을 다시 읽지 않고 질의할 수 있는 영속 그래프 | 도구 |
| `cache/` | SHA256 캐시. 재실행 시 변경된 파일만 처리한다 | 도구 |

`--wiki` 산출물의 설계 의도는 명시되어 있다. 에이전트를 `index.md`에 붙여 두면 JSON을 파싱하는 대신 파일을 읽어 지식 베이스를 탐색할 수 있다는 것이다.

### 그래프를 최신으로 유지하는 수단

폴더 내용이 바뀌면 그래프도 낡는다. README는 갱신 수단을 세 가지로 제시한다.

| 수단 | 트리거 | 처리 범위 | 특징 |
|---|---|---|---|
| `--update` | 사용자가 직접 실행 | 변경된 파일만 재추출한 뒤 병합 | 기존 그래프를 버리지 않는다 |
| `--watch` | 파일 저장 | 코드 저장은 즉시 재구축, 문서와 이미지 변경은 알림 | 코드 경로는 AST만 쓰고 모델을 호출하지 않는다. 문서와 이미지는 모델 재처리가 필요해 `--update` 실행을 사용자에게 알린다 |
| `graphify hook install` | git 커밋 | 커밋마다 그래프 재구축 | 백그라운드 프로세스가 필요 없고, 커밋당 한 번만 동작하며, 기존 훅과 함께 두어도 안전하다 |

`--watch`의 용도로 README가 드는 예는 여러 에이전트가 동시에 코드를 쓰는 워크플로다. 에이전트들이 차례로 작업하는 사이사이에 그래프가 스스로 최신 상태를 유지하기 때문이다.

### 그래프 분석 산출

그래프를 만든 뒤 도구가 자동으로 뽑아 주는 항목은 네 가지다.

| 항목 | 내용 |
|---|---|
| God nodes | 연결 차수가 가장 높은 개념. 모든 내용이 무엇을 거쳐 이어지는지 보여 준다 |
| Surprising connections | 합성 점수로 순위를 매긴 뜻밖의 연결. 코드와 논문을 잇는 edge가 코드끼리 잇는 edge보다 높은 순위를 받고, 결과마다 왜 그런지를 평이한 영어로 적은 설명이 붙는다 |
| Suggested questions | 그 그래프가 특히 잘 답할 수 있는 질문 4~5개 |
| Token benchmark | 실행이 끝날 때마다 자동으로 출력되는 토큰 절감 수치 |

Surprising connections의 순위 규칙은 이 도구의 목적을 드러낸다. 코드끼리의 연결은 정적 분석으로도 알 수 있지만 코드와 논문의 연결은 사람이 따로 이어 붙여야 하는 정보라서, 후자에 더 높은 점수를 준다.

### 기술 스택

구성 요소는 NetworkX, Leiden(graspologic), tree-sitter, Claude, vis.js다. NetworkX가 그래프 자료 구조를, Leiden이 community 분할을, tree-sitter가 코드 파싱을, Claude가 문서와 이미지의 개념 추출을, vis.js가 대화형 시각화를 맡는다. README는 Neo4j가 필요 없고 서버도 필요 없으며 전부 로컬에서 실행된다고 적는다.

## 결과

README가 제시하는 수치는 세 가지 코퍼스에서 잰 토큰 절감 폭이다.

| 코퍼스 | 파일 수 | 절감 | 출력 위치 |
|---|---:|---|---|
| Karpathy 저장소 + 논문 5편 + 이미지 4장 | 52 | 71.5배 | `worked/karpathy-repos/` |
| graphify 소스 + Transformer 논문 | 4 | 5.4배 | `worked/mixed-corpus/` |
| httpx (합성 Python 라이브러리) | 6 | 약 1배 | `worked/httpx/` |

세 값의 차이는 코퍼스 크기에서 온다. 파일 6개는 어차피 context window에 통째로 들어가므로 그래프로 줄일 여지가 없고, 그 규모에서 그래프의 가치는 압축이 아니라 구조를 드러내는 데 있다고 README는 설명한다. 반면 코드와 논문과 이미지가 섞인 파일 52개 규모에서는 71배를 넘는다.

이 수치의 비교 기준은 다른 도구가 아니라 원본 파일을 그대로 읽는 방식이다. 71.5배 역시 저자가 고른 코퍼스에서 저자가 측정한 값이다. 즉 이 수치는 도구 사이의 우열이 아니라, 그래프를 거치는 경로와 원문을 그대로 읽는 경로 사이의 격차를 나타낸다.

세 코퍼스는 파일 수뿐 아니라 구성도 다르다. 71.5배가 나온 코퍼스만 코드와 논문과 이미지를 함께 담고 있고, 5.4배 코퍼스는 소스와 논문 한 편이며, 약 1배 코퍼스는 합성 Python 라이브러리 하나다. 다만 파일 수와 자료 종류의 다양성 가운데 무엇이 절감 폭을 만들었는지를 분리해 잰 결과는 자료에 없다.

재현 경로는 저장소 안에 마련되어 있다. 각 `worked/` 폴더에 입력 파일 원본과 실제 출력물인 `GRAPH_REPORT.md`, `graph.json`이 함께 들어 있어 사용자가 같은 코퍼스로 직접 실행해 수치를 확인할 수 있다.

## 두 저장소 스냅샷 대조

이 wiki에는 같은 제품의 저장소 스냅샷이 두 개 있다. 이 페이지의 `Graphify-Labs/graphify`와 [[applications/safishamsi-graphify]]의 `safishamsi/graphify`다. 두 raw 파일의 본문을 diff한 결과 차이가 한 줄도 없었다.

| 비교 항목 | 이 페이지 (Graphify-Labs) | safishamsi-graphify | 차이 |
|---|---|---|---|
| README 본문 | 138줄 | 138줄 | 없음 (diff 결과 0줄) |
| raw frontmatter의 org | `Graphify-Labs` | `safishamsi` | 있음 |
| raw frontmatter의 url | 조직 계정 주소 | 개인 계정 주소 | 있음 |
| raw frontmatter의 tags | `codex`와 `cursor` 없음 | `codex`와 `cursor` 있음 | 있음 |
| 본문의 CI 배지와 curl URL | `safishamsi/graphify` | `safishamsi/graphify` | 없음 |
| 본문의 라이선스 문구 | 없음 | 없음 | 없음 |
| 본문의 버전 표기 | 없음 | 없음 | 없음 |

차이가 난 세 항목은 모두 raw frontmatter, 즉 원저자가 아니라 이 wiki가 붙인 메타데이터다. README 본문 쪽에서는 기능, 버전, 라이선스, 심지어 저장소 참조까지 두 스냅샷이 같다. 두 파일 모두 CI 배지와 수동 설치 curl URL이 `safishamsi/graphify`를 가리킨다.

따라서 두 스냅샷 사이에서 확인되는 것은 저장소 소유 주체 표기가 조직 계정과 개인 계정으로 갈렸다는 사실뿐이다. 기능이나 버전에서 무엇이 달라졌는지는 이 시점 README로 확인되지 않는다.

두 페이지를 함께 두고 읽는 방법도 여기서 정해진다. 제품의 기능을 알아보려는 경우에는 내용이 같으므로 어느 한 편만 읽으면 되고, 두 페이지를 나란히 볼 이유는 저장소가 개인 계정과 조직 계정 두 이름으로 존재한다는 사실을 확인할 때다. 두 스냅샷의 실제 변경 폭을 알아보려면 새 시점의 README를 다시 수집해 대조해야 한다.

## 한계

| 한계 | 내용 |
|---|---|
| 내부 구현 세부 확인 불가 | raw가 README 스냅샷이라 모듈 구성, 파이프라인 단계, 신뢰도 산정 기준, 추출 결과 스키마를 확인할 수 없다. README는 모듈 책임과 언어 추가 방법을 `ARCHITECTURE.md`에서 보라고 안내하지만 그 파일은 스냅샷에 없다 |
| 버전과 변경 이력 부재 | 본문에 릴리스 번호, 태그, CHANGELOG가 없어 이 스냅샷의 시점을 자료 안에서 특정할 수 없다 |
| 라이선스 문구 부재 | raw frontmatter는 MIT라고 적지만 README 본문에는 라이선스 절이 없다. 사용 조건은 저장소 원본에서 다시 확인해야 한다 |
| 저장소 참조 불일치 | frontmatter는 `Graphify-Labs/graphify`를 가리키는 반면 본문의 CI 배지와 수동 설치 URL은 `safishamsi/graphify`를 가리킨다 |
| 자체 측정 벤치마크 | 71.5배와 5.4배는 저자가 고른 코퍼스에서 저자가 잰 값이다. 제3자 재현이나 다른 도구와의 대조는 자료에 없다 |
| 절감 측정 방법 미기재 | 질의당 토큰을 무엇을 기준으로 셌는지, 어떤 질문 집합으로 쟀는지가 본문에 없다. 측정 방법은 `worked/` 폴더의 출력물을 직접 열어 확인해야 한다 |
| 소규모 코퍼스에서 이득 없음 | 파일 6개 코퍼스는 약 1배로 토큰 관점의 이득이 사실상 없다 |
| 문서 변경의 지연 반영 | `--watch`는 코드 저장만 즉시 재구축하고, 문서와 이미지는 `--update` 실행을 알리는 데서 멈춘다 |
| 모델 의존 | 기술 스택 절은 전부 로컬에서 실행된다고 적지만 문서와 논문과 이미지의 개념 추출은 Claude 호출에 의존한다. 로컬이라는 서술은 그래프 저장과 연산의 범위로 읽어야 한다 |
| 품질 검증을 기여에 의존 | 추출 정확도의 검증은 사용자가 실제 코퍼스로 실행해 맞고 틀린 부분을 평가한 `review.md`를 제출하는 기여 흐름에 맡겨져 있다 |

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| god node | 그래프에서 연결 차수가 가장 높은 개념 노드. 코퍼스의 내용이 무엇을 거쳐 이어지는지 보여 준다 |
| surprising connection | 합성 점수로 순위를 매긴 뜻밖의 연결. 코드와 논문을 잇는 edge가 코드끼리 잇는 edge보다 높은 순위를 받는다 |
| EXTRACTED / INFERRED / AMBIGUOUS | 모든 edge에 붙는 근거 등급. 자료에서 찾은 관계, 모델이 추론한 관계, 판단이 갈리는 관계를 구분한다 |
| call-graph pass | 코드에서 AST를 뽑은 뒤 호출 관계를 따로 훑는 추가 처리 단계 |
| citation mining | PDF에서 인용 관계를 뽑아 논문 사이의 edge로 만드는 처리 |
| worked example | 실제 코퍼스에 도구를 실행해 입력과 출력을 함께 저장소에 남긴 재현용 사례. `worked/{slug}/` 경로에 둔다 |

## 관련 페이지

- [[applications/safishamsi-graphify]]: 같은 README의 개인 계정 저장소 스냅샷. 본문이 동일해 두 페이지는 소유 주체 표기에서만 갈린다
- [[applications/shamsi-2026-graphify-knowledge-graphs-for-ai]]: 같은 제품의 한국어 소개 자료
- [[applications/todaycode-2026-graphify-llm-token-reduction-wiki]]: 같은 제품을 한국어로 해설한 영상 자료
- [[applications/colbymchenry-codegraph]]: 코드 저장소를 그래프로 다루는 다른 도구
- [[applications/garrytan-gbrain]]: 개인 지식 베이스 도구와의 비교 대상
- [[applications/liu-2026-rag-llm-wiki-or-gbrain]]: graphify가 놓이는 도구 분류를 다룬 자료
- [[database/guo-2025-lightrag-simple-and-fast]]: 그래프 기반 검색 계열의 선행 연구
- [[overviews/lightrag-family-graph-rag-overview]]: 그래프 기반 검색 계열 overview
