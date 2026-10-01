---
title: "Pi agent harness (earendil-works/pi, GitHub repo)"
type: repo
year: 2025
category: agents
raw_path: raw/repos/earendil-works-pi.md
raw_filename: "earendil-works-pi.md"
source_collection: external
source: earendil-works-pi.md
org: "earendil-works"
repo: "pi"
url: "https://github.com/earendil-works/pi"
license: "MIT"
tags: [coding-agent, harness, extensions, skills, compaction, typescript]
---

## 요약

Pi는 터미널에서 동작하는 코딩 에이전트이자, 그 에이전트를 이루는 부품을 각각 라이브러리로 공개한 TypeScript monorepo다. Earendil Works가 MIT 라이선스로 공개했고, 수집 시점(2026년 10월 2일) 기준 star는 11만 1,190개, fork는 1만 4,128개다. 저장소 README는 이 프로젝트를 "Pi agent harness"라고 부른다. harness는 모델을 감싸 도구, 검증, 상태를 제공하는 실행 환경을 뜻한다.

Pi의 특징은 무엇을 넣었는지보다 무엇을 뺐는지에서 드러난다. 서브에이전트, plan mode, tool call 승인 같은 기능은 내장하지 않는다. 대신 extension, 스킬, prompt template, theme, package라는 primitive를 제공하고, 필요한 기능은 사용자가 만들거나 Pi에게 만들게 한다. 소프트웨어 문맥의 primitive는 더 작게 나누지 않고 조합의 재료로 쓰는 기본 구성 요소를 말한다.

이 페이지는 최상위 README, coding-agent 패키지 README, coding-agent 문서 9편(index, how-pi-works, quickstart, sessions, skills, packages, extensions, compaction, security), agent runtime README, LLM API README 앞부분을 바탕으로 구조를 정리한다. 사용자 관점의 소개는 프로젝트 사이트 [[agents/earendil-works-2026-pi-project-page]]가 다룬다.

## 배경

코딩 에이전트는 보통 완성된 제품으로 배포된다. 기능 목록이 정해져 있고, 사용자는 제공된 기능 안에서 작업 방식을 조정한다. Pi는 이 관계를 뒤집는 것을 목표로 한다. coding-agent README의 첫 문장은 "Adapt Pi to your workflow, not the other way around"이며, 필요한 prompt template, 스킬, extension, theme을 Pi에게 직접 만들라고 요청하거나 Pi package를 설치하라고 안내한다.

이 방향은 두 가지 설계 결정으로 이어진다. 첫째, 에이전트의 내부 부품을 독립 패키지로 분리해 다른 애플리케이션이 가져다 쓸 수 있게 했다. 둘째, 실행 중인 Pi 프로세스 안에 TypeScript 코드를 로드하는 extension 시스템을 두어, 기능 추가를 설정 변경이 아니라 코드 작성 문제로 만들었다.

반대로 Pi는 보안 경계를 제공하지 않는다고 처음부터 밝힌다. README의 "Permissions & Containerization" 절은 Pi에 파일시스템, 프로세스, 네트워크, 자격 증명 접근을 제한하는 권한 시스템이 없으며, 기본적으로 Pi를 실행한 사용자와 프로세스의 권한으로 동작한다고 적는다. 기능을 덜어 낸 대가로 격리 책임은 사용자에게 넘어간다.

## 핵심 개념

세션은 Pi가 대화 하나를 기록한 것으로, 메시지, tool call과 결과, 모델 변경, compaction 같은 이벤트를 모두 담는다. Pi는 이 기록을 일렬이 아니라 tree로 저장한다. 이전 지점으로 돌아가 다시 시작하면 원래 경로를 지우지 않고 새 가지를 만든다.

active branch는 세션 tree에서 현재 entry로 끝나는 경로를 말한다. 모델이 다음 요청에서 받는 이력은 세션 파일 전체가 아니라 이 active branch뿐이다. 따라서 버린 시도는 파일에는 남아 있지만 모델의 context에는 들어가지 않는다.

agent loop는 모델 호출, tool 실행, 결과 관찰을 반복하는 기본 순환이다. Pi에서는 assistant 응답 하나와 그에 딸린 tool 실행을 묶어 turn이라 부르고, 추가 요청이 필요 없을 때까지 turn을 반복한 단위를 run이라 부른다.

compaction은 길어진 대화 이력을 요약으로 접어 context 한계 안에서 세션을 이어가는 처리다. Pi의 compaction은 요약 entry를 새로 추가할 뿐 원본 entry를 지우지 않는다. 그래서 요약 뒤에도 세션 tree에서 원래 메시지를 다시 볼 수 있다.

extension은 Pi 프로세스 안에 로드되는 TypeScript 모듈이다. tool, 슬래시 커맨드, 단축키, model provider, 이벤트 핸들러, renderer, 터미널 UI를 등록할 수 있다. Pi가 내장하지 않은 기능은 대부분 extension으로 구현한다.

project trust는 작업 폴더가 제공하는 설정과 실행 리소스를 로드할지 정하는 결정이다. 낯선 저장소를 열었을 때 그 안의 extension이 자동으로 실행되는 것을 막는 장치이며, 시작 이후의 tool call 범위는 제한하지 않는다.

## 방법

### 패키지 구성

`packages/` 아래에는 13개 디렉토리(agent, ai, chord, client, codemode, coding-agent, durable, evals, mcp, protocol, server, telemetry, tui)가 있다. README가 전체 패키지 표에 소개하는 것은 일곱 개이고, 그중 세 개를 프로젝트의 중심으로 강조한다.

| 패키지 | 역할 | README 강조 |
|---|---|---|
| `@earendil-works/pi-coding-agent` | 대화형 코딩 에이전트 CLI. 사용자가 실행하는 `pi` 명령 | ○ |
| `@earendil-works/pi-agent-core` | tool calling과 상태 관리를 갖춘 agent runtime | ○ |
| `@earendil-works/pi-ai` | 다중 provider를 하나의 인터페이스로 묶은 LLM API | ○ |
| `@earendil-works/pi-tui` | differential rendering을 쓰는 터미널 UI 라이브러리 | |
| `@earendil-works/pi-durable` | 대화, task, 문서를 위한 durable runtime | |
| `@earendil-works/pi-telemetry` | 벤더 중립 텔레메트리 계약, 참조 adapter, conformance test, 타입 스키마 | |
| `@earendil-works/chord` | 서비스, 복제 상태, RPC, plugin을 위한 독립 애플리케이션 조립 runtime | |

의존 관계는 아래에서 위로 쌓인다. `pi-ai`가 provider 호출을 추상화하고, `pi-agent-core`가 그 위에서 agent loop와 이벤트를 관리하며, `pi-coding-agent`가 세션 저장, 리소스 탐색, extension, TUI를 결합해 CLI를 만든다. extension과 스킬에는 `pi-ai`, `pi-agent-core`, `pi-coding-agent`, `pi-tui`, `typebox`가 호스트 제공 패키지로 주입된다. Slack과 채팅 자동화는 별도 저장소 `earendil-works/pi-chat`이 맡고, 장기 계획은 RFC 사이트에 공개한다.

### 설치와 첫 실행

설치 경로는 두 가지다. npm 설치는 `npm install -g --ignore-scripts @earendil-works/pi-coding-agent`이며 Node.js 22.19 이상이 필요하다. macOS와 Linux에서는 `curl -fsSL https://pi.dev/install.sh | sh` 설치 스크립트도 쓸 수 있다. 문서는 일반 npm 설치에 의존성 lifecycle script가 필요 없다고 밝힌다.

작업할 폴더로 이동해 `pi`를 실행하면 대화 영역, 입력 편집기, footer로 된 화면이 뜬다. footer는 현재 폴더, 모델, 세션 상태를 보여 준다. 작업 폴더는 관련 파일, 지시문, 설정을 찾는 기준이자 저장된 세션을 묶는 단위다. 모델 연결은 Pi 안에서 `/login`을 실행해 구독이나 API 키를 등록하고, 필요하면 `/model`로 다른 모델을 고른다.

quickstart는 Pi가 파일 읽기, 검색, 명령 실행, 편집을 화면에 모두 보여 주지만 tool call마다 승인을 묻지는 않는다고 강조한다. 예시 과제로는 회의록을 요약해 action item을 파일로 저장하기, 저장소 구조와 검사 실행 방법 설명하기, CSV 두 개를 비교해 변경 요약하기를 든다. 편집기에서 `@`를 입력하면 파일을 검색해 첨부할 수 있다. 제거는 `npm uninstall -g`나 설치 스크립트의 Uninstall 메뉴로 하지만, 두 방법 모두 `~/.pi/agent/` 아래의 설정, 자격 증명, 세션, package는 지우지 않는다.

### agent loop

`how-pi-works.md`는 사용자가 메시지를 제출한 뒤의 흐름을 다음과 같이 정의한다.

1. 메시지가 active branch에 추가된다.
2. Pi가 system prompt, active branch, 사용 가능한 tool, 모델 설정으로 요청을 만들어 선택한 provider로 보낸다.
3. provider가 텍스트와 tool call을 담은 assistant 응답을 스트리밍한다.
4. Pi가 응답을 기록하고, 각 tool call을 실행하고, 결과를 기록한다. 여기까지가 turn 하나다.
5. tool 결과나 대기 메시지가 추가 요청을 필요로 하면 다음 turn을 시작하고, 아니면 run을 끝낸다.

실행 도중의 사용자 입력은 두 종류로 구분된다. steering 메시지는 현재 assistant turn 뒤에 들어가고, follow-up 메시지는 에이전트가 대기 작업을 모두 마친 뒤 들어간다. 사이트 설명에 따르면 Enter가 steering, Alt+Enter가 follow-up이며, steering은 현재 tool이 끝난 뒤 남은 tool 실행을 중단시킨다. 중단(abort)하면 현재 run이 멈추고 대기 중이던 메시지는 편집기에 다시 채워진다.

`pi-agent-core` README는 같은 loop를 이벤트 순서로 보여 준다. tool call이 없는 `prompt("Hello")`는 다음 순서로 이벤트를 낸다.

```
agent_start
turn_start
message_start / message_end      (사용자 메시지)
message_start                    (assistant 응답 시작)
message_update ...               (스트리밍 조각)
message_end
turn_end
agent_end
```

assistant가 tool을 부르면 `message_end` 뒤에 `tool_execution_start`, `tool_execution_update`(tool이 스트리밍할 때), `tool_execution_end`, toolResult 메시지가 끼고, `turn_end` 다음에 새 `turn_start`가 이어진다. UI는 이 이벤트를 구독해 화면을 갱신한다.

tool 실행 방식과 loop 제어 지점은 다음과 같다.

| 항목 | 동작 |
|---|---|
| `parallel` 모드 (기본) | preflight는 순서대로, 허용된 tool은 동시에 실행한다. 완료 이벤트는 끝난 순서로 나오지만 toolResult 메시지는 assistant가 요청한 순서로 기록된다 |
| `sequential` 모드 | tool call을 하나씩 실행한다. 배치 안에 sequential 지정 tool이 하나라도 있으면 배치 전체가 순차 실행된다 |
| `beforeToolCall` | 인자 검증 뒤, 실행 전에 호출된다. 실행을 막고 `terminate: true`를 붙일 수 있다 |
| `afterToolCall` | 실행 뒤, `tool_execution_end` 전에 호출되어 결과를 덮어쓸 수 있다 |
| `terminate: true` | 배치의 모든 tool 결과가 요청할 때만 자동 후속 LLM 호출을 생략한다. 섞인 배치는 정상 진행한다 |
| `finishTurn` | `{ action: "end" }`는 `turn_end` 직후 정지, `{ action: "continue" }`는 다음 요청 하나를 보장한다 |

`finishTurn`은 다음 요청 뒤에 다시 호출되므로, 조건 없이 continue를 반환하면 loop가 끝나지 않는다. 문서는 이 점을 명시적으로 경고한다. 오류나 중단으로 끝난 응답은 hard exit로 처리되어 `finishTurn`의 결정이 무시된다.

### 메시지 변환과 system prompt

agent는 `AgentMessage`라는 확장 가능한 메시지 타입을 다룬다. 표준 `user`, `assistant`, `toolResult` 외에 애플리케이션 고유 타입을 declaration merging으로 추가할 수 있다. 반면 LLM은 세 가지 표준 타입만 이해하므로 요청 직전에 변환을 거친다.

```
AgentMessage[] → transformContext() → AgentMessage[] → convertToLlm() → Message[] → LLM
                    (선택)                                (필수)
```

`transformContext()`는 오래된 메시지를 정리하거나 외부 context를 주입하는 선택 단계이고, `convertToLlm()`은 UI 전용 메시지를 걸러 내고 custom 타입을 LLM 형식으로 바꾸는 필수 단계다.

system prompt와 tool 선언은 transcript가 소유한다. 맨 앞 system 메시지가 prompt이고, 이후 system 메시지가 `content`(지시문 추가)나 `sections`(이름 붙은 절 교체)로 이를 패치한다. `agent.state.tools`는 실제로 실행 가능한 tool 구성이며, loop는 매 요청 전에 이를 transcript가 선언한 tool과 비교해 다르면 system 메시지로 변경을 알린다. 이렇게 하면 대화 중간에 tool이나 지시문이 바뀌어도 transcript만 보고 당시 상태를 재현할 수 있다.

### context 구성

모델 요청 하나에 들어가는 재료는 여섯 가지다.

| 요소 | 출처와 처리 |
|---|---|
| 대화 이력 | active branch의 세션 entry를 user, assistant, tool-result 메시지로 변환한다 |
| system prompt | 기본 지시문에 발견된 context 파일을 더한다. 프로젝트 `SYSTEM.md`로 교체하고 `APPEND_SYSTEM.md`로 덧붙일 수 있다 |
| tool 정의 | 현재 활성화된 tool 집합 |
| 스킬 설명 | 이름, 설명, 경로만 넣는다. 전체 지시문은 필요할 때 읽는다 |
| prompt template | 편집기 입력을 사용자 메시지로 바꾸기 전에 확장한다 |
| 첨부 | 선택한 파일, 이미지, 붙여 넣은 텍스트, shell 출력 |

extension은 여기에 지시문을 추가하거나 context 자체를 변형할 수 있다. `context` 이벤트는 prompt와 tool system 메시지를 뺀 대화 메시지만 변형하고, 요청 단위로 transcript 전체를 다뤄야 할 때만 `context_with_system`을 쓴다. `AGENTS.override.md`, `AGENTS.md`, `CLAUDE.md` 같은 context 파일은 project trust 결정과 무관하게 로드된다.

### 세션 저장과 branch

영속 세션은 JSONL 파일이다. 각 entry는 ID와 부모 entry 참조를 가지며, 현재 entry가 active branch를 정한다. 기본 저장 위치는 `~/.pi/agent/sessions/`이고 작업 디렉토리별로 묶인다. 위치는 `--session-dir` 옵션, `PI_CODING_AGENT_SESSION_DIR` 환경 변수, `sessionDir` 설정 순으로 바꿀 수 있으며 CLI 옵션이 가장 우선한다. `--no-session`으로 시작하면 종료 뒤 재개할 수 없는 일회성 세션이 된다.

세션을 잇는 명령은 다음과 같다.

| 명령 | 동작 |
|---|---|
| `pi --continue` | 현재 작업 디렉토리의 가장 최근 세션을 연다 |
| `pi --resume`, `/resume` | 세션 선택기를 연다. 검색, 이름 변경, 삭제, 정렬, 이름 붙은 세션만 보기를 지원한다 |
| `/new` | 새 세션을 시작한다 |
| `/name`, `--name` | 세션에 알아보기 쉬운 이름을 붙인다 |
| `/session` | 현재 세션 파일, ID, 메시지 수, 토큰 사용량, 비용을 보여 준다 |

branch를 만드는 방법은 세 가지이며 결과물의 위치가 다르다.

| 동작 | 결과 | 쓰는 경우 |
|---|---|---|
| `/tree` | 현재 세션 파일 안에서 이동한다 | 관련 대안을 한 파일에 함께 둘 때 |
| `/fork` | 이전 사용자 메시지에서 새 세션 파일을 만든다 | 대안을 별도 작업으로 떼어 낼 때 |
| `/clone` | active branch를 새 세션 파일로 복사한다 | 현재 상태의 독립 사본이 필요할 때 |

`/tree`에서 사용자 메시지를 고르면 그 텍스트가 편집기에 다시 채워지고, 고쳐서 제출하면 새 branch가 생긴다. assistant 응답 같은 다른 entry를 고르면 빈 편집기로 그 뒤에서 이어 간다. branch를 떠날 때 Pi는 떠나는 branch를 요약해 들어가는 branch에 붙여 줄 수 있다. 버린 시도의 메시지를 전부 싣지 않으면서 그 시도에서 얻은 정보는 보존하는 방식이다.

세션은 밖으로 내보낼 수도 있다. `/export`는 HTML이나 JSONL로 저장하고, `/share`는 Radius 인증이 설정되어 있으면 Radius artifact로, 아니면 private GitHub gist로 올려 뷰어 링크를 돌려준다. `/bug`는 transcript를 넣을지, 뺄지, 현재 모델에게 문제를 요약시킬지 골라 개발자용 비공개 리포트를 만든다. 리포트에는 자격 증명 값을 뺀 환경과 provider 설정, 오류 진단이 들어간다. 문서는 내보낸 세션에 prompt, 모델 응답, tool 인자, 명령 출력, 파일 내용이 담길 수 있으니 공유 전에 검토하라고 거듭 안내한다.

### compaction

Pi에는 요약 메커니즘이 두 가지 있다. 둘 다 비슷한 구조화 형식을 쓰고 파일 작업을 누적 추적한다.

| 메커니즘 | 트리거 | 목적 |
|---|---|---|
| compaction | context가 임계값을 넘거나 `/compact` 실행 | 오래된 메시지를 요약해 context 공간 확보 |
| branch summarization | `/tree`로 다른 branch로 이동 | 떠나는 branch의 맥락을 새 branch에 보존 |

자동 compaction은 `contextTokens > contextWindow - reserveTokens`일 때 일어난다. `reserveTokens`의 기본값은 16,384 토큰으로, 모델 응답이 들어갈 공간을 남기기 위한 값이다. 다중 turn 실행 중에는 tool 결과가 붙은 뒤 다음 assistant 응답을 시작하기 전에 검사하고, 새 사용자 prompt 전과 run 종료 뒤에도 검사한다. provider가 context overflow 오류를 내거나 응답이 일찍 `stopReason: "length"`로 끝나면 compact 후 재시도를 한 번 시도한다.

compaction은 다섯 단계로 진행된다.

1. **절단점 탐색**: 최근 메시지부터 거꾸로 토큰 추정치를 더해 `keepRecentTokens`(기본 2만 토큰)에 도달하는 지점을 찾는다.
2. **메시지 추출**: 이전 보존 경계(처음이면 세션 시작)부터 절단점까지의 메시지를 모은다.
3. **요약 생성**: 이전 요약이 있으면 함께 넘겨 구조화된 형식으로 LLM 요약을 만든다.
4. **entry 추가**: 요약과 `firstKeptEntryId`를 담은 `CompactionEntry`를 세션에 추가한다.
5. **context 재구성**: 다음 요청부터 system prompt, 요약, `firstKeptEntryId` 이후 메시지 순으로 context를 만든다.

예를 들어 entry 0~9로 된 세션에서 entry 4부터 보존하기로 정하면, entry 1~3은 요약 대상이 되고 entry 10으로 compaction entry가 추가된다. 이후 모델이 받는 것은 system prompt, entry 10의 요약, entry 4~9의 원문이다. entry 1~3은 파일에 그대로 남지만 모델에는 보내지 않는다.

절단점에는 규칙이 있다. 사용자, assistant, BashExecution, custom 메시지에서만 자를 수 있고 tool 결과에서는 자르지 않는다. tool 결과는 그것을 요청한 tool call과 붙어 있어야 하기 때문이다. 사용자 메시지 하나가 시작한 구간 자체가 `keepRecentTokens`보다 크면 그 구간 안의 assistant 메시지에서 자르고, 이전 이력 요약과 구간 앞부분 요약 두 개를 따로 만들어 합친다. 반복 compaction에서는 직전 compaction의 보존 경계부터 다시 요약하므로, 앞선 compaction에서 살아남은 메시지도 다음 요약에 포함된다.

요약 형식은 Goal, Constraints & Preferences, Progress(Done, In Progress, Blocked), Key Decisions, Next Steps 절을 공통으로 갖는다. compaction 요약은 여기에 Critical Context 절을 더하고, branch 요약은 Next Steps에서 끝난다. 기본 구현은 `details`에 읽은 파일 목록과 수정한 파일 목록을 기록하고 다음 요약으로 넘겨 누적한다. 요약 요청은 다시 쓰일 가능성이 낮아 prompt cache 쓰기를 끈다.

설정은 `~/.pi/agent/settings.json`이나 프로젝트 `.pi/settings.json`의 `compaction` 키에서 한다.

| 설정 | 기본값 | 뜻 |
|---|---|---|
| `enabled` | `true` | 자동 compaction 사용 여부. 꺼도 `/compact`는 동작한다 |
| `reserveTokens` | `16384` | 응답용으로 남겨 둘 토큰. 요약 출력 한도에도 영향을 준다 |
| `keepRecentTokens` | `20000` | 요약하지 않고 원문으로 남길 최근 토큰 |
| `modelOverrides` | 없음 | `provider/modelId` 키로 모델별 `reserveTokens`, `keepRecentTokens` 지정 |

문서 예시에서는 1M context 모델에 `reserveTokens`를 40만으로 주어, 60만 토큰을 넘을 때 compaction이 일어나게 한다. 다른 모델은 일반값 16,384를 그대로 쓴다. extension은 `session_before_compact`와 `session_before_tree` 이벤트로 요약을 취소하거나 자체 요약을 제공할 수 있으므로, 주제 기반 요약이나 다른 요약 모델 사용도 extension으로 구현한다.

### 확장 수단의 단계

quickstart는 필요에 맞는 가장 약한 수단부터 고르라고 권한다. 아래로 갈수록 할 수 있는 일이 많아지지만 실행 코드가 늘어나 검토 부담도 커진다.

| 필요 | 시작점 |
|---|---|
| 폴더에 지속 지시문 부여 | `AGENTS.md` |
| `/` 메뉴에서 재사용할 프롬프트 | prompt template |
| 작업별 지시문과 보조 파일 | 스킬 |
| 실행 가능한 tool, 커맨드, 이벤트 핸들러 | extension |
| 사용자 정의 터미널 컴포넌트 | Terminal UI |
| 지원하지 않는 모델 서비스 연결 | custom provider |
| 여러 리소스 설치와 배포 | Pi package |

### 스킬

Pi는 Agent Skills 명세를 구현한다. 스킬은 `SKILL.md`를 가진 디렉토리이며 스크립트, 참고 문서, asset을 함께 담을 수 있다.

```text
pdf-tools/
├── SKILL.md
├── scripts/
│   └── extract.sh
├── references/
│   └── formats.md
└── assets/
    └── template.json
```

`SKILL.md`는 `name`과 `description` frontmatter로 시작하고 그 뒤에 지시문을 적는다. description은 모델이 이 스킬을 로드할지 판단하는 근거이므로, 무엇을 하는지와 언제 쓰는지를 함께 적어야 한다. 문서는 "Helps with PDFs" 같은 설명은 라우팅 정보가 부족하다고 지적한다.

로드는 progressive disclosure 방식이다. progressive disclosure는 필요한 시점에만 정보를 단계적으로 노출하는 설계다. 시작 시 Pi는 설정된 위치를 훑어 각 스킬의 이름, 설명, 경로만 system prompt에 넣고, 과제가 맞으면 모델이 `SKILL.md` 전문을 읽는다. 모델이 관련 스킬을 놓칠 수 있어 `/skill:name`으로 강제 로드하는 경로를 두고, `/skill:pdf-tools extract report.pdf`처럼 뒤에 붙인 인자는 사용자 요청으로 덧붙는다.

| 항목 | 규칙 |
|---|---|
| 탐색 위치 | 사용자와 프로젝트 스킬 디렉토리, `~/.agents/skills/`, `.agents/skills/`(작업 디렉토리에서 저장소 루트까지 상위 탐색) |
| 이름 | 소문자, 숫자, 하이픈. 앞뒤와 연속 하이픈 금지, 최대 64자 |
| 설명 | 최대 1,024자. 없으면 로드하지 않는다 |
| `disable-model-invocation: true` | 자동 선택에서 빼고 명시 커맨드로만 부른다 |
| 이름 충돌 | 먼저 발견한 스킬을 남기고 경고한다 |
| 디렉토리명 불일치 | Pi는 경고하지 않지만 다른 구현은 강제할 수 있어 일치시키는 편이 이식성이 높다 |

### extension

extension은 `ExtensionAPI`를 받는 default factory를 내보내는 TypeScript 모듈이다. 문서의 최소 예제는 `/hello` 커맨드 하나를 등록한다.

```typescript
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

export default function (pi: ExtensionAPI) {
  pi.registerCommand("hello", {
    description: "Show a greeting",
    handler: async (name, ctx) => {
      ctx.ui.notify(`Hello, ${name || "world"}!`, "info");
    },
  });
}
```

이 파일을 `~/.pi/agent/extensions/hello.ts`에 두거나 `pi --extension ./hello.ts`로 로드하면 된다. Pi는 `jiti`로 TypeScript를 바로 로드하므로 별도 컴파일 단계가 없다. 단일 파일로 충분하면 파일 하나를, 여러 파일이 필요하면 `index.ts`를 가진 디렉토리를 쓴다.

lifecycle 규칙은 엄격하다. factory는 동기나 비동기 모두 가능하고 Pi는 비동기 factory를 기다린 뒤 시작을 계속한다. 그러나 세션 없이 extension만 로드하는 실행도 있으므로, factory 안에서 프로세스, 소켓, watcher, timer를 시작하면 안 된다. 오래 사는 리소스는 `session_start`에서 시작하고 멱등한 `session_shutdown` 핸들러에서 닫는다. `/reload`는 extension runtime 자체를 교체하므로 `await ctx.reload()` 뒤의 코드는 옛 runtime의 상태를 다시 쓰면 안 된다.

extension이 기능을 붙이는 지점은 다음과 같다.

| 기능 | 주요 API |
|---|---|
| lifecycle 관찰과 수정 | `pi.on()` |
| 모델이 부르는 동작 추가 | `pi.registerTool()` |
| `/` 커맨드 추가 | `pi.registerCommand()` |
| 단축키와 CLI 플래그 | `pi.registerShortcut()`, `pi.registerFlag()` |
| 사용자나 custom 메시지 전송 | `pi.sendUserMessage()`, `pi.sendMessage()` |
| context 밖 세션 데이터 저장 | `pi.appendEntry()` |
| model provider 추가 | `pi.registerProvider()` |
| MCP 서버 추가 | `pi.registerMcpServer()` |
| 요청별 모델 라우팅 | `pi.registerVirtualModel()` |
| extension 간 통신 | `pi.events` |

이벤트 핸들러는 로드와 등록 순서대로 실행된다. 이벤트마다 반환값의 효과가 다르다는 점이 중요하다. 일부는 알림만 하고, 일부는 데이터를 변형하거나 결과를 교체하거나 동작을 취소한다.

| 이벤트 | 할 수 있는 일 |
|---|---|
| `before_agent_start` | 현재 prompt와 구조화된 `systemPromptOptions`를 보고 prompt 절, tool, 지침을 바꾼다 |
| `tool_call` | 입력을 수정하거나 실행을 막는다 |
| `tool_result` | 결과를 바꾼다. 여러 핸들러가 앞선 변경을 이어받아 합성된다 |
| `message_end` | 확정된 메시지를 같은 role로 교체한다 |
| `turn_end`, `agent_before_settle` | entry를 추가하고 `continue: true`로 다음 요청 하나를 요청한다 |
| `agent_settled` | Pi가 자동으로 더 진행하지 않는다는 알림. 수정은 불가 |
| `provider_stream_event` | provider 스트림 이벤트를 정규화 전에 읽기 전용으로 관찰한다 |
| `cache_warming_decision` | 유휴 상태의 prompt cache 갱신을 `warm`이나 `stop`으로 덮어쓴다 |

### custom tool과 exposure

custom tool은 이름, 모델용 설명, TypeBox 파라미터 스키마, `execute()` 함수를 정의한다. 결과에는 모델에 보낼 `content`와 렌더링이나 상태 복원용 `details`가 필요하다. 실패는 `execute()`에서 예외를 던져 표시하며, 객체를 반환하는 것만으로는 오류가 되지 않는다. 메모리 상태를 공유하는 tool은 sequential 실행을 쓰고, 파일을 고치는 tool은 `withFileMutationQueue()`로 읽기, 수정, 쓰기 전체를 묶어 병렬 tool call끼리 충돌하지 않게 한다. 결과가 크면 잘라서 보내고 전체 출력 위치를 모델에 알려야 한다.

tool은 `ctx.executeTool()`로 다른 tool을 부를 수 있다. 중첩 호출도 인자 검증과 `tool_call`, `tool_result` 핸들러를 똑같이 거치지만 transcript에는 tool call로 남지 않는다. 대신 호출한 tool의 결과 메시지에 `nestedCalls` 기록(이름, 인자, 상태, 소요 시간, 오류)이 최대 256건까지 붙고, 중첩 결과의 사용량은 모든 깊이에서 호출한 tool의 `usage`에 더해진다.

`exposure`는 모델이 tool에 닿는 방식을 정하는 속성이다.

| exposure | 모델에 선언 | 다른 tool에서 호출 | 용도 |
|---|---|---|---|
| `direct` (기본) | 활성일 때 | 활성일 때 | 일반 tool |
| `model-only` | 활성일 때 | 불가 | 다른 tool을 조율하거나 사용자에게 묻는 tool |
| `codemode` | 명시 활성화 전에는 안 함 | 등록되면 항상 | `codemode` tool 스크립트에서 쓰는 tool |
| `deferred` | 명시 활성화 전에는 안 함 | 등록되면 항상 | codemode 목록에서도 빠지고 `tool_search`로 찾아 활성화 |
| `hidden` | 안 함 | 불가 | 등록 해제가 없으므로 tool을 철회할 때 쓴다 |

`annotations`는 MCP tool annotation과 같은 의미의 힌트(`readOnlyHint`, `destructiveHint`, `idempotentHint`, `openWorldHint`)다. 힌트가 없으면 MCP 기본값을 따라 읽기 전용이 아니고, 파괴적일 수 있으며, 외부 세계에 닿을 수 있다고 간주한다. 힌트는 검증되지 않지만 권한 extension이 어떤 호출을 확인할지 정하는 데 쓸 수 있다. 문서는 `tool_call` 이벤트에서 이 힌트를 읽어 Codex가 승인을 묻는 것과 같은 호출에만 `ctx.ui.confirm()`을 띄우는 예제를 싣는다. Pi가 내장하지 않은 승인 기능을 extension 몇 줄로 만드는 방식을 보여 주는 예다.

MCP는 모델이 외부 도구와 데이터 원천에 표준화된 방식으로 접근하게 하는 프로토콜이다. `pi.registerMcpServer(name, config)`는 `mcp.json`의 `mcpServers` 항목과 같은 형태의 설정으로 현재 세션에 MCP 서버를 추가한다. 등록은 저장되지 않으므로 로드할 때마다 다시 해야 하며, 같은 이름이 `mcp.json`에 있으면 `mcp.json`의 설정이 우선한다.

### Pi package

Pi package는 extension, 스킬, prompt template, theme을 하나로 묶어 배포하는 단위다. 평범한 디렉토리나 npm 패키지이며, 관례 디렉토리(`extensions/`, `skills/`, `prompts/`, `themes/`)를 두거나 `package.json`의 `pi` 키에 경로를 명시한다.

| 소스 | 예 | 동작 |
|---|---|---|
| npm | `npm:@example/pi-tools@1.0.0` | Pi npm 디렉토리에 설치. 버전 지정 시 고정 |
| git | `git:github.com/example/pi-tools@v1` | clone 후 지정 ref로 맞춘다. tag와 commit은 고정 |
| URL | `https://github.com/example/pi-tools` | git 소스로 취급 |
| 로컬 | `./pi-tools` | 복사하지 않고 해석된 경로에서 로드 |

`pi install`, `pi list`, `pi remove`, `pi update --extensions`로 관리하고, `pi -e npm:@example/pi-tools`로 설정에 추가하지 않고 한 번만 써 볼 수 있다. 개인 설치는 `~/.pi/agent/settings.json`에, `--local` 설치는 프로젝트 `.pi/settings.json`에 기록된다. 설정의 객체 형식으로 package에서 로드할 리소스를 glob과 `!`, `+`, `-` 접두어로 좁힐 수 있다.

의존성 규칙에는 함정이 있다. Pi가 주입하는 호스트 패키지(`pi-ai`, `pi-agent-core`, `pi-coding-agent`, `pi-tui`, `typebox`)는 `peerDependencies`에 `"*"`로 선언하고 번들하지 않아야 한다. `dependencies`에 넣어 실물 사본이 생기면 extension 모듈 매핑을 우회해 클래스와 레지스트리가 중복될 수 있고, Pi는 이를 감지하면 경고한다. `pi-package` keyword를 단 npm 패키지는 pi.dev 패키지 갤러리에 오른다.

### 인터페이스와 SDK

다섯 가지 인터페이스가 모두 같은 agent와 세션 메커니즘을 쓴다.

| 모드 | 동작 | 쓰는 경우 |
|---|---|---|
| interactive | 세션과 agent 이벤트를 터미널에 렌더링 | 일상 작업 |
| print | prompt 하나를 실행하고 최종 응답 출력 (`pi -p "query"`) | 일회성 작업과 스크립트 |
| JSON | agent 이벤트를 JSONL로 출력 (`--mode json`) | 한 번의 실행에서 구조화 이벤트 소비 |
| RPC | stdin으로 JSONL 커맨드를 받고 stdout으로 응답과 이벤트 출력 | 별도 Pi 프로세스를 다른 언어에서 제어 |
| SDK | in-process로 agent 세션 생성과 제어 | 애플리케이션 안에 Pi 내장 |

SDK의 바탕인 `pi-agent-core`는 `Agent` 클래스에 system prompt와 모델을 초기 상태로 주고, `pi-ai`의 `streamSimple`을 스트리밍 함수로 연결한 뒤 `agent.subscribe()`로 이벤트를 받는 구조다. README 빠른 시작 예제는 `message_update` 이벤트의 `text_delta`만 골라 표준 출력에 쓰는 방식으로 스트리밍 응답을 출력한다.

### pi-ai

`pi-ai`는 provider 모음, 자동 인증 해석, 토큰과 비용 추적, context 직렬화, 세션 중간의 다른 모델로의 hand-off를 제공하는 통합 LLM API다. provider는 모델 API를 제공하는 회사나 서비스 단위를 말한다. chat 카탈로그에는 tool calling을 지원하는 모델만 들어간다. 에이전트 워크플로에 tool calling이 필수라고 보기 때문이다.

수집한 README 앞부분의 지원 provider는 다음과 같다.

| 분류 | provider |
|---|---|
| 주요 모델 개발사 | OpenAI, Anthropic, Google, Mistral, xAI, DeepSeek, MiniMax, Moonshot AI |
| 클라우드 | Azure OpenAI (Responses), Vertex AI, Amazon Bedrock |
| 추론 서비스 | Groq, Cerebras, NVIDIA NIM, Together AI, Baseten, Hugging Face, Cloudflare Workers AI |
| gateway와 router | OpenRouter, Vercel AI Gateway, Cloudflare AI Gateway, Radius, OpenCode Zen |
| 구독 OAuth | OpenAI Codex (ChatGPT Plus/Pro), GitHub Copilot |
| 기타 | Ant Ling, ZAI Coding Plan, TypeSafe (분류기 API) |

README 목차가 다루는 기능은 tool 정의와 partial JSON 스트리밍, 인자 검증, 이미지 입력과 생성, 분류, thinking 통합 인터페이스, stop reason, 중단 후 재개, custom provider, 테스트용 faux provider, cross-provider handoff, 브라우저 사용, tree shaking, OAuth다.

### 보안 모델

Pi는 생성된 명령과 코드를 신뢰할 수 없는 것으로 다루라고 요구한다. tool과 extension은 Pi 프로세스의 운영체제 권한으로 실행되고, 모든 tool call 전에 승인을 묻지 않는다. 파일, 주석, 명령 출력, 모델 응답이 prompt injection으로 모델을 조종할 수 있다. prompt injection은 입력 데이터에 숨긴 지시로 모델의 행동을 바꾸는 공격이다. 문서는 transcript 관찰, project trust, 변경 검토 모두 보안 경계가 아니라고 명시한다.

실행 방식에 따라 보호 범위가 달라진다.

| 실행 방식 | 보호되는 것 |
|---|---|
| 운영체제 사용자 권한으로 직접 실행 | 그 사용자가 접근할 수 없는 것만. 전용 계정으로 범위를 좁힐 수 있지만 운영체제와 네트워크는 공유한다 |
| 컨테이너, VM, 샌드박스 안에서 전체 실행 | 노출하지 않은 호스트 파일과 프로세스. 문서는 보통 가장 강한 실용 선택지로 본다 |
| Pi는 밖에 두고 내장 tool만 격리 환경에서 실행 | tool로 수행한 동작으로부터 호스트를 보호한다. Pi와 다른 extension은 경계 밖이라 범위가 더 좁다 |

README가 안내하는 구체적 격리 패턴은 세 가지다. Gondolin extension은 `pi`와 provider 인증을 호스트에 두고 내장 tool과 `!` 커맨드만 로컬 Linux micro-VM으로 보낸다. Plain Docker는 `pi` 프로세스 전체를 로컬 컨테이너에서 실행하는 단순 격리다. OpenShell은 `pi` 프로세스 전체를 policy로 통제되는 샌드박스에서 실행한다.

project trust는 다음 리소스가 작업 디렉토리에 있을 때 결정을 요구한다.

- `.pi/settings.json`, `.pi/mcp.json`
- `.pi/extensions`, `.pi/skills`, `.pi/prompts`, `.pi/themes`
- `.pi/SYSTEM.md`, `.pi/APPEND_SYSTEM.md`
- 현재 디렉토리나 상위 디렉토리의 프로젝트 `.agents/skills`

결정 순서는 CLI `--approve`나 `--no-approve`, 사용자 수준 extension의 `project_trust` 이벤트, `~/.pi/agent/trust.json`에 저장된 가장 가까운 디렉토리의 결정, 전역 `defaultProjectTrust`(기본 `"ask"`) 순이다. print, JSON, RPC 모드는 trust prompt를 띄울 수 없으므로 `defaultProjectTrust`가 `"always"`가 아니면 보호 리소스를 건너뛴다.

## 결과

저장소는 성능 벤치마크를 제시하지 않는다. 수집 시점에 확인할 수 있는 정량 정보는 다음과 같다.

| 항목 | 값 |
|---|---|
| star, fork | 11만 1,190개, 1만 4,128개 |
| 저장소 생성 | 2025년 8월 9일 |
| `packages/` 디렉토리 | 13개 (README 표 소개 7개) |
| coding-agent 문서 | `docs/` 아래 41개 Markdown 문서 |
| provider | 사이트 기준 15곳 이상, 모델 수백 개 |
| extension 예제 | 사이트 기준 50개 이상 |
| compaction 기본값 | `reserveTokens` 16,384, `keepRecentTokens` 2만 |

정량 지표 대신 저장소가 공들여 설명하는 부분은 공급망 관리다. README는 npm 의존성 변경을 코드 변경과 같은 수준으로 검토한다고 밝히고 다음 규칙을 둔다.

- 직접 외부 의존성은 정확한 버전으로 고정하고, 내부 workspace 패키지만 범위 버전을 쓴다.
- `.npmrc`에 `save-exact=true`와 `min-release-age=2`를 두어 당일 배포된 의존성 버전을 피한다.
- `package-lock.json`을 의존성 기준으로 삼고, pre-commit이 `PI_ALLOW_LOCKFILE_CHANGE=1` 없이는 lockfile 커밋을 막는다.
- `npm run check`가 고정된 직접 의존성, TypeScript import 호환성, 생성된 coding-agent shrinkwrap을 검사한다.
- 배포 CLI 패키지에 루트 lockfile로 만든 `npm-shrinkwrap.json`을 넣어 npm 사용자의 전이 의존성까지 고정한다.
- 릴리스 태그 전에 `npm run release:local`로 저장소 밖에 격리된 npm과 Bun 설치를 만들어 smoke test를 한다.
- 로컬 릴리스 설치, 문서의 npm 설치, `pi update --self`는 가능한 곳에서 `--ignore-scripts`를 쓴다.
- CI는 `npm ci --ignore-scripts`로 설치하고, 정기 워크플로가 `npm audit --omit=dev`와 `npm audit signatures --omit=dev`를 실행한다.
- shrinkwrap 생성에 lifecycle script 허용 목록이 있어, 새 lifecycle script를 가진 의존성은 검토 전까지 검사에서 실패한다.

GitHub 릴리스에는 `SHA256SUMS`로 검증되는 버전별 소스 아카이브가 들어 있다. 압축을 풀고 `./scripts/build-binaries.sh --offline-model-data --platform linux-x64 --out "$PWD/out"`을 실행하면 공식 standalone 바이너리와 같은 스크립트로 직접 빌드할 수 있다. `--offline-model-data`는 provider 카탈로그를 새로 받지 않고 아카이브에 든 모델 데이터를 쓴다.

개발 명령은 `npm install --ignore-scripts`, `npm run build`(모델 데이터 갱신 후 전체 빌드), `npm run build:offline`(네트워크 없이 재빌드), `npm run check`(lint, format, 타입 검사), `./test.sh`(API 키가 없으면 LLM 의존 테스트 생략), `./pi-test.sh`(아무 디렉토리에서나 소스 버전 Pi 실행)다.

README 후반은 OSS 코딩 에이전트 세션 공유를 요청한다. 공개 세션 데이터가 장난감 벤치마크 대신 실제 과제, tool use, 실패와 수정 사례로 코딩 에이전트를 개선하는 데 도움이 된다는 주장이다. 공개 도구로 `badlogic/pi-share-hf`를 안내하고, 작성자 본인의 `pi-mono` 작업 세션을 Hugging Face 데이터셋 `badlogicgames/pi-mono`로 정기 공개한다고 밝힌다.

## 한계

Pi의 한계는 대부분 설계 선택의 반대면이다.

| 한계 | 내용 |
|---|---|
| 내장 권한 시스템 없음 | 파일시스템, 프로세스, 네트워크, 자격 증명 접근을 제한하지 않는다. 격리는 사용자가 컨테이너나 VM으로 직접 구성한다 |
| project trust의 빈틈 | 프로젝트 `sessionDir` 설정은 trust 결정 전에 읽힌다. `AGENTS.md`, `CLAUDE.md` 같은 context 파일은 trust와 무관하게 로드되어 prompt injection 경로가 남는다 |
| 기능 미내장 | 서브에이전트, plan mode, 권한 게이트를 extension 예제나 서드파티 package로 직접 구성해야 한다 |
| extension 신뢰 | extension은 같은 프로세스와 권한으로 실행되어 prompt, tool call, 파일, 자격 증명, 세션 이력을 볼 수 있다 |
| 스킬 로드 누락 | 모델이 관련 스킬을 로드하지 않을 수 있어 `/skill:name` 강제 호출이 필요할 때가 있다 |
| compaction 실패 | provider가 응답하지 않거나 요약 요청을 받지 못하면 실패한다. 문제를 고친 뒤 `/compact`를 다시 실행해야 한다 |
| 기여 정책 | 새 기여자의 issue와 PR은 기본으로 자동 종료되고 maintainer가 매일 검토한다 |

보안 신고 범위도 좁게 정의되어 있다. 로컬 에이전트의 예상 동작, 신뢰할 수 없는 콘텐츠의 prompt injection, 내장 샌드박스 부재, 사용자가 설치한 extension과 스킬의 동작은 권한 경계 우회나 로컬 사용자에게 원래 없던 접근을 보이지 않는 한 보안 이슈로 보지 않는다.

수집 범위의 한계도 있다. 이 페이지는 README와 문서 9편을 근거로 하며, RPC 프로토콜, session 파일 형식, MCP, codemode, TUI, durable, chord, telemetry 패키지의 세부 문서는 읽지 않았다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| active branch | 세션 tree에서 현재 entry로 끝나는 경로. 다음 모델 요청의 이력이 된다 |
| steering 메시지 | 실행 중 제출해 현재 turn 뒤에 끼워 넣는 메시지. 남은 tool 실행을 중단시킨다 |
| follow-up 메시지 | 에이전트가 대기 작업을 모두 마친 뒤 들어가는 메시지 |
| branch summarization | branch를 옮길 때 떠나는 branch를 요약해 새 위치에 붙이는 처리 |
| project trust | 작업 폴더의 설정과 실행 리소스를 로드할지 정하는 결정. tool call 범위는 제한하지 않는다 |
| exposure | tool이 모델에 선언되는지, 다른 tool에서 호출 가능한지를 정하는 속성 |

## 관련 페이지

- [[agents/earendil-works-2026-pi-project-page]]: 같은 프로젝트의 소개 사이트. 설계 철학과 기능을 사용자 관점에서 정리한다.
- [[agents/agentskills-agentskills]]: Pi가 구현하는 Agent Skills 명세 저장소.
- [[agents/magnitudedev-magnitude]]: Pi를 연결 대상 harness로 지원하는 로컬 추론 서버. 외부 harness 중 Pi만 세션 안에서 `/model`로 바로 전환된다.
- [[agents/stablyai-orca]]: Pi를 포함한 CLI 에이전트를 worktree별로 병렬 실행하는 데스크톱 앱.
- [[agents/ayghri-i-have-adhd]]: Pi용 `package.json`과 extension 배포 경로를 갖춘 스킬 저장소.
- [[database/li-2026-beyond-semantic-similarity-rethinking-retrieval]]: Pi를 기반 harness로 쓴 최소 scaffold DCI-Agent-Lite를 실험한 논문.
- [[overviews/agent-harness-engineering-overview]]: harness 설계 자료를 묶은 overview.
