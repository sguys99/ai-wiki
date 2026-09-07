---
title: "colbymchenry/codegraph"
type: repo
year: 2026
category: applications
raw_path: raw/repos/colbymchenry-codegraph.md
raw_filename: "colbymchenry-codegraph.md"
source: colbymchenry-codegraph.md
source_collection: external
tags: [code-intelligence, knowledge-graph, mcp, tree-sitter, sqlite, fts5, claude-code, cursor, codex, opencode, gemini-cli, dynamic-dispatch, static-analysis, multi-language, agent-tooling, local-first]
org: "colbymchenry"
repo: "codegraph"
url: "https://github.com/colbymchenry/codegraph"
license: "MIT"
---

## 요약

CodeGraph는 코딩 에이전트가 코드베이스를 파일 단위로 훑는 대신 미리 만들어 둔 그래프에 질의하게 만드는 로컬 도구다. tree-sitter가 20개 이상 언어의 소스를 파싱해 함수, 클래스, 메서드를 노드로, 호출과 import와 상속을 edge로 뽑아 프로젝트 폴더 안의 SQLite 데이터베이스에 넣고, MCP 서버가 그 그래프를 Claude Code를 비롯한 8종 에이전트에 도구로 노출한다.

설계에서 눈에 띄는 점은 LLM이 인덱싱 파이프라인에 전혀 등장하지 않는다는 것이다. 임베딩도, 요약도, 외부 API 호출도 없다. 추출은 전부 정적 파싱이고 검색은 SQLite의 FTS5 전문 검색이며, 데이터는 기기를 떠나지 않는다. 그 대가로 CodeGraph는 의미 유사도 질의를 못 하지만, 대신 인덱싱 비용이 API 요금이 아니라 CPU 시간이고 결과가 실행마다 같다.

두 번째 특징은 인덱스를 사람이 갱신하지 않는다는 점이다. 네이티브 OS 파일 이벤트 감시자가 편집을 잡아 debounce 후 증분 동기화하고, 아직 반영되지 않은 파일을 참조하게 될 응답에는 경고 배너를 붙인다. README의 표현으로는 "인덱스는 절대 낡지 않으며 다시 실행할 것이 없다".

7개 언어에 걸친 7개 OSS 저장소에서 헤드리스 Claude Code에 같은 아키텍처 질문을 던진 A/B 벤치마크가 공개되어 있다. 평균 16% 저렴, 토큰 47% 감소, 22% 단축, tool call 58% 감소이며 사용 조건의 파일 읽기는 대부분 0회다. 라이선스는 MIT다.

저장소와 별개로 호스팅 제품도 예고되어 있다. PR마다 무엇을 테스트해야 하고 무엇이 깨질 수 있으며 어떤 flow가 영향받는지를 알려주는 CodeGraph 플랫폼이며, 아직 대기자 명단 단계다.

이 페이지의 근거 자료는 저장소 README 전문이다. 소스 트리 스냅샷이 아니므로 내부 구현 세부는 다루지 않는다.

## 배경

에이전트가 낯선 코드베이스에서 구조 질문에 답하는 기본 방식은 탐색이다. Claude Code는 Explore 서브에이전트를 띄워 grep과 glob으로 후보 파일을 좁히고 Read로 열어 본다. 이 과정은 답을 찾기 전에 여러 번의 tool call을 소비하고, 호출마다 결과가 컨텍스트에 쌓인다.

문제는 이 탐색이 매번 처음부터 반복된다는 데 있다. 어제 같은 질문을 했더라도 오늘 세션은 다시 grep부터 시작한다. 코드베이스의 구조는 그 사이 거의 바뀌지 않았는데도 그렇다.

CodeGraph의 출발점은 그 반복을 한 번의 인덱싱으로 접는 것이다. symbol 관계, call graph, 코드 구조를 미리 계산해 두면 에이전트는 탐색 단계를 건너뛰고 질의 한 번으로 답을 받는다. README가 벤치마크에서 강조하는 대비가 정확히 이 지점이다. 인덱스가 있으면 에이전트가 보통 `codegraph_explore` 한 번으로 관련 소스를 받아 답하고 멈추지만, 없으면 예산 대부분을 올바른 코드에 도달하기 전의 find와 ls와 grep에 쓴다.

인덱스를 프로젝트마다 따로 두는 선택도 같은 맥락에서 나온다. 그래프는 `.codegraph/` 디렉토리 안의 SQLite 파일 하나이고, 서버나 계정이나 API 키가 개입하지 않는다. 설정 파일도 없어서 언어 지원은 확장자로 판정되고 제외 규칙은 기본값과 `.gitignore`로 정해진다. 사용자가 유지해야 할 상태가 인덱스 자체 말고는 없다는 뜻이다.

라우팅을 따로 다루는 이유도 짚어 둘 만하다. 웹 프레임워크의 라우트 선언은 문법상 함수 호출이나 데코레이터처럼 보이지만 실제로는 URL과 handler를 잇는 선언이다. 일반 추출만 하면 `path()` 호출이 노드로 남을 뿐 그 URL이 어느 뷰로 가는지는 그래프에 없다. 그래서 CodeGraph는 라우팅 파일을 별도로 인식해 `route` 노드를 만든다.

정적 추출에는 원래 한계가 하나 있다. tree-sitter는 소스에 이름으로 적힌 관계만 볼 수 있어서, 콜백으로 등록되어 나중에 호출되는 함수나 언어 경계를 넘는 호출은 그래프에서 끊긴다. flow가 중간에 끊기면 에이전트는 그 지점부터 다시 파일을 읽어야 하므로 인덱스의 효용이 사라진다. CodeGraph가 Swift와 Objective-C, React Native, Expo 사이의 브리징에 별도의 절을 할애하는 이유가 여기 있다.

## 핵심 개념

**지식 그래프(knowledge graph)** 는 코드의 구성 요소를 노드로, 그 사이 관계를 edge로 표현한 구조다. CodeGraph의 노드는 함수, 클래스, 메서드처럼 소스에 실재하는 symbol이고 edge는 calls, imports, extends, implements 같은 관계다. 프레임워크 라우팅에서 만들어지는 `route` 노드와 React Native view에서 만들어지는 `component` 노드처럼 언어 문법에는 없지만 프레임워크 관례로 존재하는 노드 종류도 있다.

**tree-sitter** 는 소스 코드를 AST로 파싱하는 incremental parser다. 언어마다 문법 정의가 따로 있고, CodeGraph는 그 위에 언어별 query를 결합해 어떤 AST 노드를 symbol로 삼고 어떤 것을 edge로 삼을지 지정한다.

**FTS5** 는 SQLite의 전문 검색 확장이다. CodeGraph는 symbol 이름 검색에 이것을 쓴다. 별도의 검색 엔진이나 벡터 인덱스가 없는 이유이고, 인덱스 전체가 프로젝트 폴더 안의 데이터베이스 파일 하나로 끝나는 이유이기도 하다.

**MCP (Model Context Protocol)** 는 에이전트가 외부 도구를 호출하는 표준 프로토콜이다. CodeGraph는 `codegraph serve --mcp`로 stdio 서버가 되어 에이전트에 도구 목록을 제공하고, `initialize` 응답에 자체 사용 지침을 실어 보낸다.

**dynamic dispatch** 는 어느 함수가 실행될지가 소스에 이름으로 적혀 있지 않고 실행 시점에 정해지는 호출을 말한다. 콜백 등록, React의 재렌더, interface에서 구현체로 가는 호출이 여기 해당한다. 정적 파싱이 놓치는 지점이며 grep으로도 따라갈 수 없다.

**local-first** 는 데이터 원본을 사용자 디스크에 두고 서버 없이 동작하는 설계를 뜻한다. CodeGraph는 API 키가 필요 없고 외부 서비스를 호출하지 않으며 SQLite 데이터베이스만 남긴다.

**debounce** 는 짧은 시간에 몰린 이벤트를 하나로 합쳐 처리하는 방식이다. 파일 하나를 저장할 때마다 재인덱싱하면 편집이 잦은 구간에서 같은 작업을 여러 번 하게 되므로, CodeGraph는 마지막 이벤트로부터 일정 시간이 지난 뒤에 한 번만 동기화한다.

**provenance** 는 그래프의 edge가 어떤 경로로 만들어졌는지 남기는 표시다. tree-sitter가 소스에서 직접 읽은 관계와 규칙으로 추론한 관계를 구별하는 데 쓰이며, 에이전트가 그 hop을 얼마나 믿을지 판단할 근거가 된다.

**fair coverage** 는 CodeGraph가 자기 그래프의 품질을 재려고 정의한 지표다. symbol을 가진 소스 파일 중에서, 해소된 cross-file 의존 대상을 하나 이상 갖는 파일의 비율이다. 의존 대상이란 그 파일을 import하거나 호출하거나 참조하거나 프레임워크 관례로 라우팅하는 것을 말한다.

## 방법

### 4단계 파이프라인

인덱싱은 네 단계로 진행된다.

| 단계 | 하는 일 |
|---|---|
| Extraction | tree-sitter가 소스를 AST로 파싱하고, 언어별 query가 노드(함수, 클래스, 메서드)와 edge(calls, imports, extends, implements)를 뽑는다 |
| Storage | 결과를 로컬 SQLite 데이터베이스 `.codegraph/codegraph.db`에 FTS5 전문 검색과 함께 저장한다 |
| Resolution | 추출된 참조를 실제 대상에 연결한다. 함수 호출에서 정의로, import에서 원본 파일로, 클래스 상속과 프레임워크 고유 패턴을 잇는다 |
| Auto-Sync | MCP 서버가 네이티브 OS 파일 이벤트로 프로젝트를 감시하고, 2초 정지 구간으로 debounce한 뒤 소스 파일만 걸러 증분 동기화한다 |

추출과 해소를 나눈 것이 구조의 핵심이다. 추출 단계는 파일 하나만 보고 판단할 수 있는 것을 뽑고, 해소 단계는 파일 전체가 데이터베이스에 들어온 뒤에야 알 수 있는 연결을 만든다. import 대상이 어느 파일인지, 어떤 클래스가 어떤 부모를 상속하는지는 다른 파일을 봐야 정해지기 때문이다.

에이전트 쪽에서 보면 흐름은 단순하다. 질문이 들어오면 에이전트가 CodeGraph MCP 서버의 도구를 직접 호출하고, 서버가 SQLite 지식 그래프를 조회해 답을 돌려준다. README의 아키텍처 그림은 그 위에 한 줄을 덧붙인다. 에이전트는 Explore 서브에이전트를 거치지 않고 직접 호출한다.

### 설치와 에이전트 연결

설치는 세 단계이며, README는 1단계만으로는 에이전트가 연결되지 않는다는 점을 반복해서 강조한다.

| 단계 | 명령 | 하는 일 |
|---|---|---|
| CLI 설치 | macOS와 Linux는 `install.sh`를 셸에 파이프, Windows는 `install.ps1`을 PowerShell로 실행, 또는 `npm i -g @colbymchenry/codegraph` | OS에 맞는 빌드를 받아 `codegraph`를 PATH에 올린다 |
| 에이전트 연결 | `codegraph install` | 설치된 에이전트를 탐지해 각각에 MCP 서버를 연결한다 |
| 프로젝트 초기화 | `codegraph init` | `.codegraph/` 디렉토리를 만들고 같은 단계에서 전체 그래프를 빌드한다 |

Node.js가 없어도 설치된다. 릴리스마다 Node runtime을 함께 번들한 자체 완결 빌드를 내기 때문이며, 컴파일할 것도 네이티브 빌드도 없다. 인스톨러는 PATH를 바꾸지만 현재 셸은 건드리지 않으므로 2단계 전에 새 터미널을 열어야 한다. `npx @colbymchenry/codegraph`는 다운로드와 실행을 한 번에 처리하는 지름길이다.

인스톨러가 하는 일은 다섯 가지다.

- 설치된 에이전트를 자동 탐지해 어느 것을 설정할지 묻는다.
- `codegraph`를 PATH에 올릴지 묻는다. 에이전트가 MCP 서버를 띄우려면 필요하다.
- 설정을 모든 프로젝트에 적용할지 현재 프로젝트에만 적용할지 묻는다.
- 각 에이전트의 MCP 서버 설정을 쓰고, 지시문 파일(`CLAUDE.md`, `AGENTS.md`, `GEMINI.md`)에 마커로 감싼 짧은 CodeGraph 절을 추가한다.
- Claude Code가 대상이면 자동 허용 권한을 설정한다.

지시문 파일에 절을 따로 쓰는 이유는 전달 경로가 둘로 갈리기 때문이다. MCP 서버의 자체 안내는 메인 에이전트에게만 도달하므로, 서브에이전트와 MCP를 쓰지 않는 환경은 그 지침을 볼 수 없다. 그래서 인스톨러가 네 줄짜리 절을 지시문 파일에 남겨 `codegraph explore`와 `codegraph node` CLI 등가 명령을 알린다.

스크립트와 CI에서 쓸 비대화 플래그도 있다.

| 플래그 | 값 | 기본값 |
|---|---|---|
| `--target` | `auto`, `all`, `none`, 또는 쉼표 목록 | 대화형 질문 |
| `--location` | `global`, `local` | 대화형 질문 |
| `--yes` | 불리언 | 매 단계 질문 |
| `--no-permissions` | 불리언, Claude 자동 허용 목록을 건너뛴다 | 권한 설정 켬 |
| `--print-config <id>` | 에이전트 하나의 설정 조각만 출력하고 종료한다 | 없음 |

제거도 대칭이다. `codegraph uninstall`이 설정한 모든 에이전트에서 MCP 서버 설정, 지시문, 권한을 걷어내고, 프로젝트 인덱스는 남긴다. 인덱스는 `codegraph uninit`으로 프로젝트별로 지운다. 인스톨러를 쓰지 않으려면 `~/.claude.json`의 `mcpServers`에 `codegraph serve --mcp`를 stdio 타입으로 직접 등록하고, 원하면 `~/.claude/settings.json`의 자동 허용 목록에 도구 8개를 넣으면 된다.

### 인덱스를 최신으로 유지하는 세 계층

에이전트가 `codegraph serve --mcp`를 띄우면 세 계층이 인덱스를 코드와 맞춘다. 목표는 단순히 동기화가 아니라, 편집과 다음 동기화 사이의 짧은 구간에서 에이전트가 조용히 틀린 답을 받는 일을 막는 것이다.

| 계층 | 동작 | 다루는 상황 |
|---|---|---|
| debounce된 파일 감시자 | 네이티브 FSEvents, inotify, ReadDirectoryChangesW가 소스 파일의 생성, 수정, 삭제를 잡아 debounce 구간 뒤 재인덱싱한다 | 세션 중 에이전트나 사람이 한 편집 |
| 파일 단위 staleness banner | 아직 반영되지 않은 파일을 참조하게 될 응답 머리에 경고를 붙이고 직접 읽으라고 지시한다 | debounce가 끝나기 전의 짧은 구간 |
| 접속 시점 catch-up | 첫 질의에 답하기 전에 크기, 수정 시각, 내용 해시를 작업 트리와 대조한다 | 서버가 꺼져 있던 동안 생긴 변경 |

debounce 기본값은 2000ms이고 `CODEGRAPH_WATCH_DEBOUNCE_MS`로 조절하되 100ms에서 60초 사이로 제한된다. 편집이 몰리면 여러 이벤트가 하나의 동기화로 합쳐진다. 예를 들어 에이전트가 파일을 쓰면 100ms 안에 감시자가 반응하고, 2초 debounce를 거쳐 동기화되며, 다음 질의부터 그 파일이 보인다.

staleness banner는 두 형태로 나온다. 응답이 참조하는 파일이 대기 중이면 배너가 머리에 붙고, 응답과 무관한 대기 파일은 짧은 꼬리말로 표시된다. 어느 쪽이든 에이전트는 명시적 신호를 받는다. README는 Claude Code로 확인한 결과 에이전트가 "Reading the file directly for the live content"라고 말한 뒤 파일을 열었다고 적는다.

접속 시점 catch-up이 다루는 것은 서버가 떠 있지 않은 동안의 변경이다. 터미널에서 실행한 `git pull`, 다른 편집기의 수정, 이미 종료된 세션의 편집이 다음 세션 첫 tool call에서 흡수된다.

세 계층이 있어서 수동 `codegraph sync`가 필요한 경우는 두 가지로 좁다. 감시자가 꺼져 있을 때(샌드박스 환경이거나 `CODEGRAPH_NO_DAEMON=1`)와, 에이전트 세션 밖에서 인덱스를 스크립트로 다룰 때다. 현재 상태는 MCP의 `codegraph_status`나 CLI `codegraph status`로 확인하고, 대기 중인 것이 있으면 파일 이름과 편집 경과 시간이 표시된다.

### MCP 도구 구성

CodeGraph는 도구를 8개 갖고 있지만 기본 목록에는 4개만 올린다. 에이전트 행동을 측정해 보니 목록이 짧을수록 에이전트가 맞는 도구를 골랐고 세션마다 컨텍스트를 아꼈기 때문이다.

| 도구 | 용도 |
|---|---|
| `codegraph_explore` | 기본 도구. "X는 어떻게 동작하는가", "X가 Y에 어떻게 도달하는가" 같은 flow 질문, 한 영역 조사를 한 번의 호출로 답한다. 관련 symbol의 원문 소스를 파일별로 묶어 반환하고 관계도와 영향 반경을 함께 준다 |
| `codegraph_node` | symbol 하나의 전체 소스와 호출자, 피호출자 경로를 반환한다. 이름이 모호하면 오버로드를 전부 준다. 파일 경로를 주면 Read 도구처럼 줄 번호와 함께 파일을 읽고 그 파일에 의존하는 대상을 덧붙인다 |
| `codegraph_search` | 코드베이스 전체에서 이름으로 symbol을 찾는다 |
| `codegraph_callers` | 함수의 모든 호출 지점을 반환한다. 콜백으로 등록된 자리를 포함하며, 같은 이름이 여럿이면 정의마다 절을 나눈다 |

`codegraph_explore`가 하는 일은 단순 검색과 다르다. 관련 symbol의 소스를 원문 그대로 주되, 서로 바꿔 쓸 수 있는 중복 구현은 시그니처로 접는다. 응답 크기가 파일 개수가 아니라 답 자체의 크기에 맞춰지므로, 찾는 메서드가 수천 줄짜리 파일에 묻혀 있어도 그 메서드와 메커니즘이 함께 나온다. 여기에 더해 grep이 따라갈 수 없는 dynamic dispatch hop, 즉 콜백과 React 재렌더와 interface에서 구현체로 가는 연결을 드러낸다.

나머지 4개(`codegraph_callees`, `codegraph_impact`, `codegraph_files`, `codegraph_status`)는 기능이 그대로 살아 있지만 목록에서 빠져 있다. 평가 실행을 측정한 결과 에이전트가 이 도구들을 전혀 고르지 않거나 드물게만 골랐고, 그 정보가 이미 앞의 네 도구에 인라인으로 들어오기 때문이다. explore의 영향 반경 절, node의 의존 대상 안내, symbol 본문 자체가 피호출자 목록 역할을 한다. 필요하면 `CODEGRAPH_MCP_TOOLS` 환경 변수로 다시 켜거나 CLI 등가 명령을 쓴다.

도구를 절반만 노출하기로 한 결정에는 관찰이 앞선다. 도구를 더 만들어 붙이는 대신, 에이전트가 이미 고르는 도구가 더 많은 일을 하도록 만드는 방향이다. `codegraph_explore` 하나가 flow 질문과 영역 조사와 관계도를 함께 처리하는 구성이 그 결과이고, 영향 반경과 피호출자 정보를 별도 도구가 아니라 explore와 node의 응답 안에 넣은 것도 마찬가지다.

인덱스가 없는 작업 공간에서는 서버가 스스로 비활성 상태임을 알리고 도구를 하나도 목록에 올리지 않는다. 에이전트는 내장 도구로 평소처럼 동작하고, 인덱싱 여부는 사용자 결정으로 남는다.

### 에이전트에게 전달되는 사용 지침

MCP 서버는 사용법을 문서에 적어 두는 대신 `initialize` 응답에 실어 에이전트에게 자동으로 전달한다. 지침의 요지는 세 가지다.

- 구조 관련 질문은 CodeGraph로 직접 답한다. CodeGraph가 곧 미리 만들어 둔 인덱스이므로 grep과 Read를 반복하는 것은 이미 한 일을 되풀이하는 것이다. 반환된 소스는 이미 읽은 것으로 취급한다.
- 의도에 따라 도구를 고른다. 거의 모든 경우 `codegraph_explore`를 쓰고, symbol 위치만 찾을 때는 `codegraph_search`, 모든 호출 지점이 필요할 때는 `codegraph_callers`, symbol 하나의 전체 소스나 파일 읽기가 필요할 때는 `codegraph_node`를 쓴다.
- 결과를 신뢰하고 grep으로 다시 검증하지 않는다. 편집 후에는 staleness banner를 확인한다.

README는 이 지침 원문이 `src/mcp/server-instructions.ts`이며 메인 에이전트에 대한 단일 진실 원천이라고 밝힌다. 지침이 도구를 고르는 방법만이 아니라 위임 방식까지 다루는 데는 이유가 있다. CodeGraph는 에이전트가 직접 질의할 때만 도움이 되므로, 지침은 탐색을 파일 읽는 서브에이전트에 넘기지 말고 직접 답하라고 유도한다. 그렇게 하지 않으면 서브에이전트가 어차피 파일을 읽고 CodeGraph는 순수한 부담으로 남는다.

### CLI와 CI 연동

MCP 서버와 같은 기능을 CLI로도 쓸 수 있다. `codegraph explore`와 `codegraph node`는 대응하는 MCP 도구와 출력이 같다.

| 분류 | 명령 |
|---|---|
| 설정 | `install`, `uninstall`, `init [path]`, `uninit [path]` |
| 인덱싱 | `index [path]` (`--force`, `--quiet`), `sync [path]`, `status [path]`, `unlock [path]` |
| 질의 | `query <search>`, `explore <query>`, `node <symbol 또는 file>`, `files [path]`, `callers <symbol>`, `callees <symbol>`, `impact <symbol>` |
| 변경 분석 | `affected [files...]` |
| 운영 | `daemon`, `telemetry [on 또는 off]`, `upgrade [version]`, `version`, `help [command]` |

`codegraph affected`는 다른 명령과 성격이 다르다. import 의존성을 전이적으로 따라가 변경된 소스 파일이 영향을 주는 테스트 파일을 찾는다. 에이전트가 아니라 CI와 git hook을 겨냥한 기능이다.

| 옵션 | 설명 | 기본값 |
|---|---|---|
| `--stdin` | 파일 목록을 표준 입력에서 읽는다 | `false` |
| `-d, --depth <n>` | 의존성 순회 최대 깊이 | `5` |
| `-f, --filter <glob>` | 테스트 파일을 식별할 사용자 glob | 자동 탐지 |
| `-j, --json` | JSON 출력 | `false` |
| `-q, --quiet` | 파일 경로만 출력 | `false` |

README가 드는 예시는 `git diff --name-only HEAD`를 `codegraph affected --stdin --quiet`에 파이프해 나온 파일만 `npx vitest run`으로 실행하는 방식이다. 전체 테스트를 매번 돌리지 않고 변경에 닿는 테스트만 고르는 용도다.

### 프레임워크 라우팅

CodeGraph는 웹 프레임워크의 라우팅 파일을 따로 인식해 `route` 노드를 만들고 `references` edge로 handler에 연결한다. 이 처리가 있으면 view나 controller의 호출자를 물었을 때 그것을 묶는 URL 패턴이 함께 나온다. 라우팅 파일은 함수 호출처럼 보이지만 실제로는 선언이라서, 일반 추출만으로는 URL과 handler가 이어지지 않는다.

| 프레임워크 | 인식하는 형태 |
|---|---|
| Django | `urls.py`의 `path()`, `re_path()`, `url()`, `include()` (클래스 기반 뷰 `.as_view()`, 점 표기 경로 포함) |
| Flask | `@app.route('/path', methods=[...])`, blueprint 라우트 |
| FastAPI | `@app.get(...)`, `@router.post(...)` 등 표준 메서드 전체 |
| Express | 미들웨어 체인을 포함한 `app.get(...)`, `router.post(...)` |
| NestJS | `@Controller`와 `@Get/@Post`, GraphQL `@Resolver`와 `@Query/@Mutation`, `@MessagePattern`, `@EventPattern`, `@SubscribeMessage` |
| Laravel | `Route::get()`, `Route::resource()`, `Controller@action`, 튜플 문법 |
| Drupal | `*.routing.yml` 라우트(`_controller`, `_form`, 엔티티 handler), `.module`과 `.theme`과 `.install`과 `.inc`의 `hook_*` 구현 |
| Rails | `get '/x', to: 'users#index'`와 해시 로켓 문법 |
| Spring | 메서드의 `@GetMapping`, `@PostMapping`, `@RequestMapping` |
| Play | `conf/routes`의 verb 라우트에서 `Controller.method` 액션으로 (Scala와 Java) |
| Gin, chi, gorilla, mux | `r.GET(...)`, `router.HandleFunc(...)` |
| Axum, actix, Rocket | `.route("/x", get(handler))` |
| ASP.NET | 액션 메서드의 `[HttpGet("/x")]` 속성 |
| Vapor | `app.get("x", use: handler)` |
| React Router, SvelteKit | 라우트 컴포넌트 노드 |
| Vue Router, Nuxt | `pages/` 파일 기반 라우트, `server/api/` 엔드포인트, 라우트 미들웨어 |
| Astro | `src/pages/` 파일 기반 라우트 (`.astro` 페이지와 `.ts` 엔드포인트, `[param]`과 `[...rest]` 문법) |

### 언어 경계를 잇는 브리징

실제 iOS와 React Native 코드베이스는 한 기능이 여러 언어에 걸쳐 있다. Swift 호출자가 자동 브리징된 Objective-C 선택자를 부르고, JS 파일이 bridge를 통해 네이티브 모듈에 들어가며, JSX 컴포넌트가 네이티브 view manager에 위임한다. 정적 tree-sitter 추출은 각 언어 경계에서 멈추므로 그래프에 구멍이 생긴다. CodeGraph는 여덟 종류의 경계를 이어 `trace`, `callers`, `callees`, `impact`가 끝까지 연결되게 한다.

| 경계 | JS 또는 Swift 쪽 | 네이티브 쪽 | 잇는 방법 |
|---|---|---|---|
| Swift에서 ObjC | `obj.foo(bar:)` | 선택자 `-fooWithBar:` | `@objc` 자동 브리징 규칙(init, property, protocol 형태 포함)과 Cocoa 전치사 접두사 |
| ObjC에서 Swift | `[obj fooWithBar:]` | `@objc func foo(bar:)` | 역방향 브리지 이름 후보를 만들고 소스에서 `@objc` 노출을 검증한다 |
| RN legacy bridge | `NativeModules.X.fn(...)` | ObjC `RCT_EXPORT_METHOD`와 `RCT_REMAP_METHOD`, Java와 Kotlin `@ReactMethod` | 매크로와 어노테이션 선언을 파싱해 JS 이름에서 네이티브 메서드로 가는 지도를 만든다 |
| RN TurboModules | `import M from './NativeM'; M.fn(...)` | Codegen 명세에 대응하는 네이티브 구현 | `Native<X>.ts` 명세 인터페이스를 기준으로 삼는다 |
| 네이티브에서 JS 이벤트 | `new NativeEventEmitter(...).addListener('e', cb)` | ObjC `sendEventWithName:`, Swift `sendEvent(withName:)`, Java와 Kotlin `.emit("e", ...)` | 이벤트 이름 리터럴을 키로 삼아 언어를 넘는 이벤트 채널을 합성한다 |
| Expo Modules | `requireNativeModule('X').fn(...)` | Swift 또는 Kotlin `Module { Name("X"); AsyncFunction("fn") { ... } }` | Expo DSL 리터럴을 파싱하고, 합성한 메서드 노드가 기존 이름 매칭으로 해소된다 |
| Fabric view component | JSX `<MyView prop={v}/>` | TS Codegen 명세와 네이티브 구현 클래스 | 명세를 `component` 노드로 만들고, `View`와 `ComponentView`와 `Manager`와 `ViewManager` 접미사 관례로 네이티브와 잇는다 |
| Paper view manager | JSX `<MyView prop={v}/>` | ObjC `RCT_EXPORT_VIEW_PROPERTY`, Java와 Kotlin `@ReactProp` | Fabric과 같은 방식이며 Paper 시절 선언도 `component`와 `property` 노드를 만든다 |

이렇게 만든 edge는 소스에 이름으로 적혀 있던 관계가 아니라 규칙으로 추론한 관계다. 그래서 모두 `provenance:'heuristic'`으로 태그되고 `metadata.synthesizedBy`에 채널 이름이 들어간다. README가 예로 드는 채널명은 `swift-objc-bridge`, `rn-event-channel`, `fabric-native-impl`, `expo-module-extract` 네 개다. 에이전트는 이 태그를 보고 어떤 hop이 정적으로 확인된 것이고 어떤 hop이 추론된 것인지 구별할 수 있다.

브리징 규칙의 성격은 경계마다 다르다. Swift와 Objective-C 사이는 컴파일러의 자동 브리징 규칙이 정해져 있으므로 이름 변환이 비교적 확정적이지만, Fabric view component는 명세와 구현 클래스를 이름 접미사 관례로 잇기 때문에 프로젝트가 관례를 벗어나면 연결이 끊긴다. 이벤트 채널은 문자열 리터럴이 양쪽에서 일치하는지에 기댄다. 규칙마다 확신의 정도가 다르므로 `metadata.synthesizedBy`에 채널명을 남기는 설계가 의미를 갖는다.

각 브리지는 규모가 다른 실제 저장소 세 곳에서 검증했다. 작은 저장소에서만 확인하면 규칙이 우연히 맞아떨어진 것인지 알 수 없고, 큰 저장소에서만 확인하면 어디서 실패했는지 좁히기 어렵기 때문이다.

| 브리지 | 작은 저장소 | 중간 저장소 | 큰 저장소 |
|---|---|---|---|
| Swift와 ObjC | Charts | realm-swift | Wikipedia-iOS |
| RN legacy bridge | AsyncStorage | react-native-svg | react-native-firebase |
| 네이티브에서 JS 이벤트 | RNGeolocation | 없음 | react-native-firebase |
| Expo Modules | expo-haptics | expo-camera | Expo SDK 7개 패키지 일괄 검증 |
| Fabric과 Paper view | react-native-segmented-control | react-native-screens | react-native-skia |

### 설정 없는 동작

CodeGraph에는 설정 파일이 없다. 언어 지원이 파일 확장자로 자동 판정되므로 언어마다 연결할 것이 없고, 유지해야 할 설정도 없다. 대신 제외 규칙이 기본값으로 고정되어 있다.

| 제외 대상 | 범위 |
|---|---|
| 의존성, 빌드, 캐시 디렉토리 | `node_modules`, `vendor`, `dist`, `build`, `target`, `.venv`, `Pods`, `.next` 등 지원 스택 전반. `.gitignore`가 없어도 적용된다 |
| `.gitignore`에 든 것 전부 | git 저장소는 git을 통해, git이 아닌 프로젝트는 루트와 하위의 `.gitignore`를 직접 읽어 존중한다 |
| 1MB를 넘는 파일 | 생성된 번들, 압축된 JS, 벤더링된 blob |

기본값이 일률적으로 적용되므로 의존성이나 빌드 디렉토리를 저장소에 커밋했다고 해서 그래프에 들어오지는 않는다. 더 빼려면 `.gitignore`에 넣고, 반대로 기본 제외된 디렉토리를 다시 넣으려면 `!vendor/`처럼 부정 패턴을 쓴다. 부정 패턴이 명시적 편입 수단이다.

### 지원 언어

지원 언어는 23종이고, 확장자가 곧 판정 기준이다. 언어별로 지원 범위를 명시한 항목이 있는데 문법의 특수한 구성 요소를 어디까지 노드로 만드는지를 밝힌 것이다.

| 언어 | 확장자 | 지원 범위 |
|---|---|---|
| TypeScript | `.ts`, `.tsx` | 완전 지원 |
| JavaScript | `.js`, `.jsx`, `.mjs` | 완전 지원 |
| Python | `.py` | 완전 지원 |
| Go | `.go` | 완전 지원 |
| Rust | `.rs` | 완전 지원 |
| Java | `.java` | 완전 지원 |
| C# | `.cs` | 완전 지원 |
| PHP | `.php` | 완전 지원 |
| Ruby | `.rb` | 완전 지원 |
| C | `.c`, `.h` | 완전 지원 |
| C++ | `.cpp`, `.hpp`, `.cc` | 완전 지원 |
| Objective-C | `.m`, `.mm`, `.h` | 부분 지원. 클래스, 프로토콜, 메서드, `@property`, `#import`, 메시지 전송을 다루되 `.mm` Objective-C++는 불완전하게 파싱될 수 있다 |
| Swift | `.swift` | 완전 지원 |
| Kotlin | `.kt`, `.kts` | 완전 지원 |
| Scala | `.scala`, `.sc` | 완전 지원. 클래스, trait, 메서드, 타입 별칭, Scala 3 enum |
| Dart | `.dart` | 완전 지원 |
| Svelte | `.svelte` | 완전 지원. script 추출, Svelte 5 rune, SvelteKit 라우트 |
| Vue | `.vue` | 완전 지원. script와 script setup 추출, Nuxt 페이지와 API와 미들웨어 라우트 |
| Astro | `.astro` | 완전 지원. frontmatter와 script 추출, 템플릿의 컴포넌트와 호출 참조, `src/pages/` 라우트 |
| Liquid | `.liquid` | 완전 지원 |
| Pascal, Delphi | `.pas`, `.dpr`, `.dpk`, `.lpr` | 완전 지원. 클래스, 레코드, 인터페이스, enum, DFM과 FMX 폼 파일 |
| Lua | `.lua` | 완전 지원. 함수, receiver를 가진 메서드, 지역 변수, `require` import, 호출 edge |
| R | `.R`, `.r` | 완전 지원. 모든 대입 형태의 함수, S4와 R5와 R6 클래스와 메서드, `library`와 `require` import, `source()` 파일 참조, 호출 edge |
| Luau | `.luau` | 완전 지원. Lua의 모든 것에 더해 `type`과 `export type` 별칭, 타입이 붙은 시그니처, Roblox 인스턴스 경로 `require` |

부분 지원으로 표시된 언어는 Objective-C 하나다. `.h` 헤더가 C와 Objective-C 양쪽에 걸쳐 있고 `.mm`이 Objective-C와 C++를 한 파일에 섞는 구조라서, 문법 하나로 깔끔하게 나뉘지 않는 언어다.

### 운영 중 마주치는 문제

README의 문제 해결 절은 실제로 올라온 증상을 중심으로 정리되어 있고, 대부분 인덱스의 존재 여부나 파일시스템 특성으로 원인이 좁혀진다.

| 증상 | 원인과 대응 |
|---|---|
| "CodeGraph not initialized" | 프로젝트에서 `codegraph init`을 먼저 실행하지 않았다 |
| 인덱싱이 느리다 | `node_modules`를 비롯한 큰 디렉토리가 제외되고 있는지 확인한다. `--quiet`로 출력 부담을 줄인다 |
| `database is locked` | 현재 빌드에서는 나오지 않아야 한다. 0.9 이전 설치라면 재설치해 번들 runtime을 받고, `codegraph status`의 저널 표시가 `wal`이 아니면 프로젝트를 로컬 디스크로 옮긴다 |
| MCP 서버가 연결되지 않는다 | 서버는 에이전트가 직접 띄우므로 사람이 실행하지 않는다. 프로젝트가 초기화되고 인덱싱됐는지 `codegraph status`로 확인하고 MCP 설정의 경로를 점검한다. 그래도 안 되면 `codegraph install`을 다시 실행해 설정을 새로 쓴다 |
| symbol이 보이지 않는다 | 저장 후 auto-sync에 몇 초가 걸린다. 필요하면 `codegraph sync`를 수동 실행한다. 해당 파일의 언어가 지원 대상인지, `.gitignore`나 기본 제외 디렉토리에 들어 있지 않은지 확인한다 |
| Windows와 WSL이 한 체크아웃을 공유한다 | 두 인덱스를 분리한다. 한쪽의 `CODEGRAPH_DIR`을 다른 이름으로 지정하면 되고, CodeGraph는 형제 `.codegraph-*` 디렉토리를 인덱싱과 감시에서 건너뛴다 |

`database is locked`에 대한 설명이 특히 구체적이다. CodeGraph는 자체 Node runtime을 번들하고 내장 `node:sqlite`를 WAL 모드로 쓰는데, WAL에서는 동시 읽기가 writer에 막히지 않는다. 그래서 이 증상은 WAL이 켜지지 않은 환경의 신호로 취급된다. 네트워크 공유와 WSL2의 `/mnt`가 대표적인 경우다.

### 라이브러리 임베딩

npm 패키지가 프로그래밍 API를 다시 export하므로 `import`와 `require` 양쪽에서 `CodeGraph` 클래스가 해소된다. Electron 메인 프로세스처럼 앱에 내장하는 용도다. `CodeGraph.init()` 또는 `CodeGraph.open()`으로 프로젝트를 열고, `indexAll()`에 진행 콜백을 주며, `searchNodes()`와 `getCallers()`와 `buildContext()`와 `getImpactRadius()`를 호출한 뒤 `watch()`와 `unwatch()`와 `close()`로 마무리한다. 그래프를 더 직접 다루려는 호출자를 위해 `DatabaseConnection`, `QueryBuilder`, `getDatabasePath`, `initGrammars`, `loadGrammarsForLanguages`, `FileLock`이 같은 진입점에서 나온다.

임베딩에는 조건이 셋 붙는다. npm에서 설치해야 컴파일된 라이브러리를 담은 플랫폼별 패키지가 함께 받아지고, API가 사용자 runtime에서 실행되므로 내장 `node:sqlite`를 위해 Node 22.5 이상이 필요하며, TypeScript 쪽은 `@types/node`와 `skipLibCheck: true`를 유지해야 한다. CLI와 MCP 서버는 자체 번들 runtime을 쓰므로 이 제약을 받지 않는다.

### 텔레메트리와 배포

익명 사용 통계를 수집하되 범위를 명시적으로 좁혀 두었다. 어떤 도구와 명령이 쓰이는지, 어떤 언어가 인덱싱되는지를 모아 언어와 에이전트 지원의 우선순위를 정하는 데 쓴다. 코드, 경로, 파일이나 symbol 이름, 질의, IP 주소는 수집하지 않는다.

수집 방식에도 안전장치가 있다. 사용량은 전송 전에 로컬에서 일별 합계로 집계되고, 수집 엔드포인트는 저장소의 `telemetry-worker/`에 공개된 코드이며 문서화된 필드 목록을 강제한다. 인스톨러가 처음에 묻고, 이후 `codegraph telemetry off`나 `CODEGRAPH_TELEMETRY=0`이나 `DO_NOT_TRACK=1` 중 어느 것으로도 끌 수 있다. 전체 필드 목록은 `TELEMETRY.md`에 있다.

수집 코드를 저장소에 공개한 선택이 이 절의 핵심이다. 무엇을 보내지 않는다는 문장은 확인할 수 없지만, 수집 엔드포인트가 문서화된 필드 목록만 받아들이는 공개 코드라면 사용자가 그 문장을 직접 검증할 수 있다. 100% 로컬을 내세우는 도구가 통계를 보내는 데 대한 대응으로 볼 수 있다.

배포는 세 데스크톱 OS 모두에 대해 Intel과 AMD(x64), ARM(arm64) 양쪽 빌드를 낸다. Windows는 PowerShell 인스톨러나 npm, macOS와 Linux는 셸 인스톨러나 npm으로 설치한다. `codegraph upgrade`는 설치 방식(bundle, npm, npx)을 스스로 판별해 제자리에서 갱신하며, `--check`로 갱신 여부만 확인하거나 버전을 지정해 고정할 수 있다.

## 결과

### 7개 저장소 A/B 벤치마크

7개 언어에 걸친 7개 실제 OSS 코드베이스에서, 헤드리스 Claude Code가 아키텍처 질문 하나에 답하는 과정을 CodeGraph 유무로 비교했다. 각 값은 조건마다 4회 실행한 중앙값 기준의 절감폭이다. 2026-06-02에 Opus 4.8과 현재 빌드로 재검증했다.

평균은 16% 저렴, 토큰 47% 감소, 22% 단축, tool call 58% 감소다.

| 코드베이스 | 언어와 규모 | 비용 | 토큰 | 시간 | tool call |
|---|---|---|---|---|---|
| VS Code | TypeScript, 약 1만 개 파일 | 18% 저렴 | 64% 감소 | 11% 단축 | 81% 감소 |
| Excalidraw | TypeScript, 약 640개 | 동일 | 25% 감소 | 27% 단축 | 40% 감소 |
| Django | Python, 약 3천 개 | 8% 저렴 | 60% 감소 | 13% 단축 | 77% 감소 |
| Tokio | Rust, 약 790개 | 동일 | 38% 감소 | 18% 단축 | 57% 감소 |
| OkHttp | Java, 약 645개 | 25% 저렴 | 54% 감소 | 31% 단축 | 50% 감소 |
| Gin | Go, 약 110개 | 19% 저렴 | 23% 감소 | 24% 단축 | 44% 감소 |
| Alamofire | Swift, 약 110개 | 40% 저렴 | 64% 감소 | 33% 단축 | 58% 감소 |

절감의 모양이 항목마다 다르다는 점이 중요하다. 토큰과 tool call과 시간은 저장소 크기를 가리지 않고 모두 줄지만, 비용은 같거나 저렴한 수준에 머물고 두 저장소에서는 차이가 없다. 절감폭은 작은 저장소(Alamofire, OkHttp)에서 가장 크고 응답이 무거운 저장소(Excalidraw, Tokio)에서 거의 같아진다. 후자에서 CodeGraph는 잦은 소규모 grep과 read 왕복을 몇 번의 큰 캐시 친화적 도구 응답으로 바꾸기 때문에, 처리 토큰은 줄어도 요금으로 환산하면 상쇄된다.

절대 수치를 보면 차이가 어디서 나는지 분명해진다.

| 코드베이스 | 시간 (사용/미사용) | 파일 읽기 | grep과 bash | tool call | 총 토큰 | 비용 |
|---|---|---|---|---|---|---|
| VS Code | 1분 59초 / 2분 13초 | 0 / 9 | 0 / 11 | 4 / 21 | 64만 / 179만 | $0.68 / $0.83 |
| Excalidraw | 1분 32초 / 2분 6초 | 0 / 7 | 1 / 8 | 9 / 15 | 127만 / 169만 | $0.78 / $0.78 |
| Django | 1분 43초 / 1분 58초 | 0 / 9 | 0 / 5 | 3 / 13 | 55.9만 / 141만 | $0.57 / $0.62 |
| Tokio | 1분 55초 / 2분 20초 | 0 / 8 | 0 / 6 | 6 / 14 | 108만 / 173만 | $0.82 / $0.82 |
| OkHttp | 1분 1초 / 1분 29초 | 0 / 4 | 2 / 6 | 5 / 10 | 50.2만 / 110만 | $0.41 / $0.55 |
| Gin | 1분 14초 / 1분 37초 | 1 / 6 | 1 / 2 | 5 / 9 | 65.1만 / 84.7만 | $0.46 / $0.57 |
| Alamofire | 1분 35초 / 2분 21초 | 0 / 9 | 0 / 4 | 5 / 12 | 76.6만 / 210만 | $0.57 / $0.95 |

파일 읽기 열이 이 벤치마크의 핵심이다. 7개 저장소 중 6개에서 사용 조건의 파일 읽기가 0회이고 Gin만 1회다. 미사용 조건은 4회에서 9회 사이다. tool call도 VS Code에서 21회에서 4회로 줄어 가장 큰 차이를 낸다.

### 절감이 나오는 지점

절감의 원인을 README는 탐색 단계의 유무로 설명한다. 인덱스가 있으면 에이전트는 대개 `codegraph_explore` 한 번으로 관련 소스를 받아 곧장 답하고 멈추며, 파일 읽기는 보통 0회다. 인덱스가 없으면 올바른 코드에 도달하기까지 find와 ls와 grep으로 후보를 좁히는 데 예산의 대부분을 쓴다. 앞의 절대 수치 표에서 미사용 조건의 grep과 bash 호출이 저장소마다 2회에서 11회 사이인 것이 그 탐색 구간이다.

응답의 크기를 정하는 방식도 절감에 관여한다. `codegraph_explore`는 질문에 관련된 메커니즘과 실제 메서드를 원문 그대로 보여주되, 서로 바꿔 쓸 수 있는 중복 구현은 시그니처로 접는다. 응답 크기가 파일 개수가 아니라 답 자체의 크기를 따라가므로, 찾는 메서드가 수천 줄짜리 파일에 묻혀 있어도 그 파일을 통째로 읽지 않는다.

비용 항목이 다른 항목보다 덜 줄어드는 이유도 여기서 나온다. CodeGraph는 잦은 소규모 grep과 read 왕복을 몇 번의 큰 도구 응답으로 바꾸는데, 이 응답은 캐시가 잘 적용된다. 처리 토큰 수는 크게 줄지만 요금으로 환산할 때는 캐시 읽기가 저렴하다는 점이 양쪽에 함께 작용해 차이가 좁아진다.

저장소 크기가 절감폭을 결정하지 않는다는 점도 표에서 확인된다. 비용 절감이 가장 큰 Alamofire는 약 110개 파일로 가장 작은 편이고, 절감이 없는 Excalidraw는 약 640개다. 갈리는 기준은 규모가 아니라 답변 자체가 얼마나 무거운지다. 응답이 무거운 저장소에서는 사용 조건도 큰 도구 응답을 여러 번 받게 되어 미사용 조건과 요금이 비슷해진다. 반면 토큰과 tool call과 시간은 두 저장소 모두에서 줄어든다.

마지막으로 README는 이 절감에 조건이 붙는다는 점을 분명히 한다. CodeGraph는 에이전트가 직접 질의할 때만 도움이 된다. 에이전트가 탐색을 파일 읽는 서브에이전트에 넘기면 그 서브에이전트는 인덱스와 무관하게 파일을 읽으므로, CodeGraph는 절감을 만들지 못하고 순수한 부담으로 남는다. 도구 지침이 위임보다 직접 응답을 권하는 이유가 여기 있다.

### 벤치마크 방법론

각 조건은 저장소를 대상으로 `claude -p`(Claude Opus 4.8)를 `--strict-mcp-config`와 함께 헤드리스로 실행한 것이다. 사용 조건은 CodeGraph MCP 서버를 켠 상태, 미사용 조건은 빈 MCP 설정이며, 내장 Read와 Grep과 Bash는 양쪽 모두 쓸 수 있다. 저장소마다 같은 질문을 쓰고 조건당 4회 실행해 중앙값을 보고한다.

측정 정의는 다음과 같다. 비용은 실행의 `total_cost_usd`, 토큰은 캐시를 포함한 입력과 출력을 합친 처리 총 토큰, 시간은 실제 소요 시간, tool call은 모델이 띄운 서브에이전트 내부를 포함한 모든 호출이다. 저장소는 `--depth 1`로 클론했고 같은 CodeGraph 빌드로 인덱싱했다.

질문은 저장소마다 하나씩 고정되어 있다.

| 코드베이스 | 질문 |
|---|---|
| VS Code | 확장 호스트가 메인 프로세스와 어떻게 통신하는가 |
| Excalidraw | 캔버스 요소를 어떻게 렌더링하고 갱신하는가 |
| Django | ORM은 QuerySet에서 쿼리를 어떻게 만들고 실행하는가 |
| Tokio | 런타임에서 비동기 task를 어떻게 스케줄하고 실행하는가 |
| OkHttp | 인터셉터 체인을 통해 요청을 어떻게 처리하는가 |
| Gin | 미들웨어 체인을 통해 요청을 어떻게 라우팅하는가 |
| Alamofire | 요청을 어떻게 만들고 보내고 검증하는가 |

README는 이 수치가 이전 Opus 4.7 검증보다 낮다는 점을 스스로 밝히고 그 이유를 설명한다. CodeGraph의 회귀가 아니라 미사용 조건의 기준선이 강해진 것이다. Opus 4.8은 큰 Explore 서브에이전트로 퍼져 나가는 대신 메인 스레드에서 효율적으로 grep과 read를 하므로, 비교 대상이 예전보다 군더더기가 적다.

수치의 안정성에 대한 단서도 남겨 두었다. 저장소별 값은 미사용 조건이 얼마나 헤매느냐에 따라 실행마다 움직이며, 4회 중앙값이 이를 완화하지만 꼬리는 남는다. 한 배치에서 Django의 미사용 조건이 $2.71과 14분을 기록한 사례가 있다. 표의 $0.62와 1분 58초와 비교하면 4배가 넘는 편차다.

### 언어별 cross-file coverage

impact와 영향 반경 질의의 품질은 그 아래 의존성 그래프에 달려 있다. README는 이를 주장하지 않고 언어마다 실제 벤치마크 저장소를 하나씩 정해 fair coverage를 측정해 공개한다.

| 언어 | 벤치마크 저장소 | coverage |
|---|---|---|
| TypeScript, JavaScript | CodeGraph 자체 저장소 | 95.8% |
| Python | psf/requests | 100% |
| Go | gin-gonic/gin | 96.6% |
| Rust | BurntSushi/ripgrep | 86.7% |
| Java | google/gson | 93.3% |
| C# | jbogard/MediatR | 85.2% |
| PHP | guzzle/guzzle | 100% |
| Ruby | sidekiq/sidekiq | 100% |
| C | redis/redis | 92.2% |
| C++ | google/leveldb | 94.8% |
| Objective-C | SDWebImage | 91.6% |
| Swift | Alamofire | 95.3% |
| Kotlin | square/okhttp | 96.2% |
| Scala | gatling/gatling | 91.2% |
| Dart | flutter/packages | 92.4% |
| Svelte, SvelteKit | sveltejs/realworld | 100% |
| Vue, Nuxt | nuxt/movies | 93.5% |
| Astro | xingwangzhe/stalux | 93.0% |
| Lua | nvim-telescope/telescope.nvim | 84.2% |
| Luau | dphfox/Fusion | 92.2% |
| Liquid | Shopify/dawn | 73.8% |
| Pascal, Delphi | PascalCoin | 77.4% |

동적 성격이 강한 언어일수록 낮다는 경향이 보인다. Python, PHP, Ruby, Svelte가 100%인 반면 Liquid는 73.8%, Pascal과 Delphi는 77.4%, Lua는 84.2%다. README는 잔여분이 언제나 정적 분석의 진짜 한계라고 못 박는다. 런타임 dynamic dispatch, 리플렉션과 의존성 주입 컨테이너, 프레임워크 관례로 정해지는 진입점, 벤더링된 서드파티 코드가 여기 해당하며 분모를 조작해 감춘 것이 아니라는 설명이다.

수치를 읽을 때 유의할 점이 하나 있다. 각 값은 그 언어의 벤치마크 저장소 하나에서 측정한 결과이지 어떤 프로젝트에서나 보장되는 값이 아니다. TypeScript와 JavaScript 항목의 벤치마크가 CodeGraph 자체 저장소라는 점도 함께 보아야 한다. 자기 코드에 맞춰 다듬은 추출 규칙이 유리하게 작용할 수 있는 자리다. 그럼에도 값을 공개하고 미달분의 성격을 밝힌 것은 impact 질의를 어디까지 믿을지 판단할 근거를 준다.

### 프레임워크 라우팅 coverage

라우팅도 같은 방식으로 프레임워크마다 대표 앱 하나를 정해 검증했고, 결과가 두 무리로 갈린다.

| 구간 | 프레임워크와 수치 |
|---|---|
| 90% 이상 | Express 100%, Flask 100%, Axum 100%, Vapor 100%, React Router 100%, FastAPI 98%, NestJS 96.8%, Gin 96.5%, Rocket 93.8%, Laravel 92% |
| 90% 미만 | Rails 89.6%, ASP.NET 83.9%, Spring 83.3%, Drupal 78.9%, Play 76.3%, Django 74.1% |

아래 무리는 관례와 리플렉션에 크게 기대는 프레임워크들이고, README는 이를 정적 분석의 정직한 상한이라고 표현한다. 라우트가 명시적 함수 호출이나 데코레이터로 적히는 Express와 FastAPI 계열은 파싱만으로 잡히지만, 파일 이름 규칙이나 런타임 스캔으로 라우트를 정하는 Django와 Spring 계열은 소스만 봐서는 전부 알 수 없다. 파일 기반 라우팅을 쓰는 SvelteKit과 Vue와 Nuxt와 Astro는 페이지와 엔드포인트 coverage가 앞 표의 언어별 수치와 같다.

## 한계

- **이 페이지의 근거는 README 스텁이라 내부 구현 세부는 확인 불가.** 소스 파일 구조, 테스트 개수, 함수 시그니처, 상수 값, 변경 이력, 버전 번호는 README에 없으므로 다루지 않는다. README가 언급하는 저장소 내 경로는 `src/mcp/server-instructions.ts`, `telemetry-worker/`, `TELEMETRY.md` 세 개뿐이다.
- **직접 질의할 때만 효과가 있다.** README가 명시하는 가장 큰 조건이다. 에이전트가 탐색을 파일 읽는 서브에이전트에 위임하면 그 서브에이전트는 어차피 파일을 읽고, CodeGraph는 절감 없이 부담만 더한다. 도구 지침이 위임하지 말고 직접 답하라고 유도하는 이유가 여기 있다.
- **의미 검색을 하지 못한다.** 인덱스가 symbol 이름과 정적 관계로만 이루어져 있고 임베딩이 없다. 이름을 모르는 개념을 뜻으로 찾는 질의는 이 그래프의 범위 밖이다.
- **정적 분석의 잔여 한계가 남는다.** cross-file coverage의 미달분은 런타임 dynamic dispatch, 리플렉션과 의존성 주입 컨테이너, 프레임워크 관례 진입점, 벤더링된 코드다. 관례에 크게 기대는 프레임워크(Django 74.1%, Play 76.3%, Drupal 78.9%)에서 라우팅 coverage가 가장 낮다.
- **언어 경계를 잇는 edge는 추론 결과다.** `provenance:'heuristic'` 태그가 붙으며 정적으로 증명된 관계가 아니다. `metadata.synthesizedBy`의 채널명이 출처를 남기지만, 규칙이 틀리면 그래프도 틀린다.
- **Objective-C는 부분 지원이다.** 지원 언어 표에서 유일하게 완전 지원이 아니며 `.mm` Objective-C++ 파일이 불완전하게 파싱될 수 있다.
- **파일시스템에 따라 SQLite WAL이 켜지지 않는다.** 네트워크 공유나 WSL2의 `/mnt`에서 흔하며, 이 경우 읽기가 쓰기에 막힐 수 있다. `codegraph status`의 저널 표시가 `wal`이 아니면 프로젝트를 로컬 디스크로 옮겨야 한다.
- **Windows와 WSL이 한 체크아웃을 공유할 수 없다.** 백그라운드 서버 lock과 SQLite 인덱스가 그것을 쓴 OS에 묶이고, 두 파일시스템 경계를 넘는 SQLite 잠금은 신뢰할 수 없다. 한쪽의 `CODEGRAPH_DIR`을 다른 이름으로 지정해 인덱스를 분리해야 하며, CodeGraph는 인덱싱과 감시에서 형제 `.codegraph-*` 디렉토리를 건너뛴다.
- **에이전트의 도구 선택은 CodeGraph가 직접 바꿀 수 없다.** 도구를 8개에서 4개로 줄여 노출한 결정 자체가 이 제약의 산물이다. 측정 결과 에이전트가 나머지 4개를 전혀 또는 거의 고르지 않았다.
- **호스팅 제품은 미출시다.** PR 단위 영향 분석을 제공한다는 CodeGraph 플랫폼은 대기자 명단 단계이며 README에 기능 명세가 없다.

## 같은 문제 영역의 다른 도구

이 wiki에는 코드베이스나 자료 폴더를 그래프로 만들어 에이전트에 노출하는 도구가 여럿 있다. 겉보기 목표는 비슷하지만 인덱싱 수단과 갱신 방식에서 갈린다.

| 페이지 | 인덱싱 수단 | 대상 | 갱신 방식 | 산출물 |
|---|---|---|---|---|
| CodeGraph (이 페이지) | tree-sitter 정적 파싱, LLM 없음 | 소스 코드 | 파일 감시자로 상시 증분 동기화 | 프로젝트 안의 SQLite 데이터베이스 |
| [[applications/lum1104-understand-anything]] | tree-sitter와 LLM 혼합, 다단계 에이전트 파이프라인 | 소스 코드와 지식 베이스 | fingerprint로 구조 변경 파일만 재분석 | JSON 지식 그래프와 웹 대시보드 |
| [[applications/safishamsi-graphify]] | LLM 추출, 스킬 한 번 실행 | 폴더 종류를 가리지 않음 | 실행 시점 스냅샷 | HTML, Obsidian vault, wiki 문서, JSON |
| [[applications/wlsdks-ontology-atlas]] | 사람과 에이전트가 Markdown으로 직접 작성 | 제품 capability와 경계 | 사람이 편집하고 git diff로 판정 | Markdown 폴더를 컴파일한 그래프 |
| [[applications/garrytan-gbrain]] | 페이지 저장 시 typed edge 자동 생성, LLM 호출 없음 | markdown 지식 저장소 | 저장소를 인덱스로 sync | Postgres 계열 파생 인덱스 |

CodeGraph가 이 무리에서 다른 점은 세 가지다.

첫째, 인덱싱 경로에 LLM이 하나도 없다. Understand-Anything과 graphify는 LLM으로 의미를 읽어 노드와 관계를 만들지만, CodeGraph는 파서가 뽑을 수 있는 것만 뽑는다. 그래서 "이 코드가 어느 제품 기능을 위한 것인가" 같은 의도 질문에는 답하지 못하고, 대신 "이 함수를 바꾸면 어디가 영향받는가"에 결정론적으로 답한다. Ontology Atlas가 그 의도 계층을 사람이 직접 쓰는 Markdown으로 채운다는 점에서 두 도구는 대체재가 아니라 서로 다른 계층을 맡는다.

둘째, 인덱스가 스냅샷이 아니라 상시 동기화 대상이다. graphify는 한 번 실행해 산출물을 남기고, Understand-Anything은 fingerprint로 변경 파일만 다시 분석한다. CodeGraph는 파일 감시자를 띄워 두고 편집마다 debounce 동기화하며, 반영 전 구간에는 경고 배너로 대응한다. 에이전트가 코드를 고치면서 동시에 그래프에 질의하는 상황을 전제로 삼은 설계다.

셋째, 그래프의 품질을 주장하지 않고 수치로 공개한다. 언어마다 실제 벤치마크 저장소를 정해 cross-file coverage를 재고, 프레임워크마다 대표 앱으로 라우팅 coverage를 재서 100%가 아닌 값을 그대로 싣는다. 미달분을 정적 분석의 한계로 명시하고 분모를 조작하지 않았다고 밝힌 점도 같은 태도다. 그래프 기반 도구가 무엇을 못 하는지를 사용자가 미리 알 수 있게 하는 정보이며, 이 자료군에서 흔히 볼 수 있는 형태는 아니다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| fair coverage | symbol을 가진 소스 파일 중 해소된 cross-file 의존 대상을 하나 이상 갖는 파일의 비율. CodeGraph가 impact 질의의 품질을 재는 지표로 정의한 값이다 |
| staleness banner | debounce 구간 동안 아직 반영되지 않은 파일을 참조할 때 MCP 응답 머리에 붙는 경고. 에이전트에게 그 파일만 직접 읽으라고 알린다 |
| catch-up sync | MCP 서버가 접속하거나 재접속할 때 첫 질의 전에 크기와 수정 시각과 내용 해시를 작업 트리와 대조해 외부 편집을 흡수하는 단계 |
| provenance:'heuristic' | 언어 경계를 잇느라 합성한 edge에 붙는 태그. 정적으로 증명된 관계와 구분된다 |
| metadata.synthesizedBy | 합성 edge가 어느 채널에서 왔는지 담는 필드. `swift-objc-bridge`, `rn-event-channel`, `fabric-native-impl`, `expo-module-extract`가 예시다 |
| route 노드 | 프레임워크 라우팅 파일에서 만들어져 `references` edge로 handler에 연결되는 노드 종류 |

## 관련 페이지

- [[applications/lum1104-understand-anything]]: 코드베이스 onboarding을 다단계 LLM 파이프라인으로 푸는 도구. 같은 문제 영역이지만 LLM이 분석의 중심이고 CodeGraph는 정적 파싱만 쓴다.
- [[applications/safishamsi-graphify]]: 폴더 하나를 지식 그래프 산출물 묶음으로 바꾸는 스킬. 입력 종류를 가리지 않는 대신 실행 시점 스냅샷이다.
- [[applications/wlsdks-ontology-atlas]]: 제품 capability ontology를 사람과 에이전트가 Markdown으로 직접 쓰는 워크벤치. CodeGraph가 다루지 못하는 의도 계층을 맡는다.
- [[applications/garrytan-gbrain]]: markdown 지식 저장소를 파생 인덱스로 sync하는 에이전트 메모리 MCP. 에이전트가 read loop 대신 MCP 도구로 답을 받게 한다는 점이 같다.
- [[database/li-2026-beyond-semantic-similarity-rethinking-retrieval]]: 임베딩 없이 에이전트가 grep과 bash로 원본 corpus를 직접 탐색하는 Direct Corpus Interaction. CodeGraph는 직접 탐색이되 대상이 미리 만든 그래프라는 점에서 상보적이다.
- [[agents/lee-hoyeon-2026-harness-engineering]]: harness 설계를 구조, 맥락, 계획, 실행, 검증, 개선 순서로 정리한 자료. CodeGraph는 그중 맥락을 코드 쪽에서 채우는 도구에 해당한다.
