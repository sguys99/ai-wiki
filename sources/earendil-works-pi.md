---
title: "Pi agent harness (earendil-works/pi, GitHub repo)"
type: repo
year: 2025
category: agents
raw_path: raw/repos/earendil-works-pi.md
raw_filename: "earendil-works-pi.md"
source_collection: external
org: "earendil-works"
repo: "pi"
url: "https://github.com/earendil-works/pi"
license: "MIT"
tags: [coding-agent, harness, extensions, skills, compaction, typescript]
figures:
  - id: fig01
    file: assets/earendil-works-pi/interactive-mode.png
    raw: https://raw.githubusercontent.com/earendil-works/pi/main/packages/coding-agent/docs/images/interactive-mode.png
    caption: "터미널에서 실행 중인 Pi 화면. 대화 영역, 입력 편집기, 현재 폴더와 모델과 세션 상태를 보여 주는 하단 footer로 구성된다"
    strategy: manual
    curated: false
  - id: fig02
    file: assets/earendil-works-pi/tree-view.png
    raw: https://raw.githubusercontent.com/earendil-works/pi/main/packages/coding-agent/docs/images/tree-view.png
    caption: "docs/images에 있는 세션 tree 탐색 화면. 수집한 문서 본문에는 임베드되어 있지 않다"
    strategy: manual
    curated: false
---

## 한 줄 요약 (One-line Summary)

Pi는 Earendil Works가 MIT 라이선스로 공개한 TypeScript 기반 agent harness monorepo로, 터미널 코딩 에이전트 CLI(`pi-coding-agent`)와 그 아래의 agent runtime(`pi-agent-core`), 다중 provider LLM API(`pi-ai`), 터미널 UI 라이브러리(`pi-tui`)를 함께 담는다. 서브에이전트, plan mode, 권한 확인 같은 기능을 내장하지 않고 extension, 스킬, prompt template, theme, package라는 primitive로 사용자가 직접 만들게 하는 것이 설계의 중심이다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 저장소 | https://github.com/earendil-works/pi |
| GitHub 설명 | "AI agent toolkit: unified LLM API, agent loop, TUI, coding agent CLI" |
| 기본 브랜치 | main (수집 시점 최신 커밋 7fbbd5f4a1d9, 2026년 10월 1일) |
| 라이선스 | MIT |
| 생성과 규모 | 2025년 8월 9일 생성, 수집 시점 star 111,190, fork 14,128 |
| 프로젝트 사이트 | [[agents/earendil-works-2026-pi-project-page]] (https://pi.dev) |
| 문서 | https://pi.dev/docs/latest, 저장소 안에서는 `packages/coding-agent/docs/` |
| 설치 | `npm install -g --ignore-scripts @earendil-works/pi-coding-agent` (Node.js 22.19 이상) 또는 macOS와 Linux에서 `curl -fsSL https://pi.dev/install.sh \| sh` |
| 수집 범위 | 최상위 README, `packages/coding-agent/README.md`, coding-agent docs 9편(index, how-pi-works, quickstart, sessions, skills, packages, extensions, compaction, security), `packages/agent/README.md`, `packages/ai/README.md` 앞부분 |

최상위 디렉토리는 `packages/` 아래 13개 패키지(agent, ai, chord, client, codemode, coding-agent, durable, evals, mcp, protocol, server, telemetry, tui)를 두고, 루트에 `AGENTS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `.pi/`, 테스트 스크립트(`test.sh`, `pi-test.sh`)를 둔다. README는 새 기여자의 issue와 PR을 기본으로 자동 종료하고 maintainer가 매일 검토한다고 명시한다.

## 2. 주요 기여 (Key Contributions)

1. **계층형 패키지 구성.** 코딩 에이전트 CLI, agent runtime, 통합 LLM API, TUI 라이브러리를 각각 독립 npm 패키지로 나눠 공개한다. CLI는 나머지 패키지 위에 올라가 있고, 사용자는 하위 패키지만 가져다 자기 애플리케이션을 만들 수 있다.
2. **primitive 중심 확장 모델.** 지시 파일(instruction file)인 `AGENTS.md`, prompt template, 스킬, extension, custom provider, Pi package를 "가장 약한 수단부터" 고르도록 단계화했다. extension은 TypeScript 모듈로 tool, 커맨드, 단축키, provider, 이벤트 핸들러, renderer, TUI를 등록한다.
3. **tree 구조 세션.** 세션을 JSONL 파일 하나에 tree로 저장한다. 이전 지점으로 돌아가 다른 branch를 만들어도 원래 branch가 지워지지 않고, 떠나는 branch를 요약해 새 branch에 붙일 수 있다.
4. **compaction과 branch summarization.** context 한계에 가까워지면 오래된 메시지를 구조화된 요약으로 바꾸되 원본 entry는 세션 tree에 남긴다. 임계값, 보존 토큰 수, 모델별 override를 설정으로 조정하고 extension hook으로 요약 방식 자체를 교체할 수 있다.
5. **네 가지 인터페이스.** interactive TUI, print와 JSON 이벤트 스트림, stdin과 stdout 위의 JSONL RPC, in-process TypeScript SDK가 모두 같은 agent와 세션 메커니즘을 공유한다.
6. **명시적 보안 경계 선언.** Pi에는 파일시스템, 프로세스, 네트워크, 자격 증명 접근을 막는 권한 시스템이 없다고 README가 먼저 밝히고, 격리가 필요하면 Gondolin extension, Docker, OpenShell 세 패턴을 쓰도록 안내한다.
7. **공급망 강화 규칙.** 직접 의존성은 정확한 버전으로 고정하고, `.npmrc`의 `min-release-age=2`로 당일 릴리스를 피하며, CLI 패키지에 `npm-shrinkwrap.json`을 동봉해 전이 의존성까지 고정한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 패키지 구성

README의 전체 패키지 표는 일곱 개를 소개한다.

| 패키지 | 역할 |
|---|---|
| `@earendil-works/pi-coding-agent` | 대화형 코딩 에이전트 CLI (`pi` 명령) |
| `@earendil-works/pi-agent-core` | tool calling과 상태 관리를 갖춘 agent runtime |
| `@earendil-works/pi-ai` | OpenAI, Anthropic, Google 등 다중 provider를 하나로 묶은 LLM API |
| `@earendil-works/pi-tui` | differential rendering을 쓰는 터미널 UI 라이브러리 |
| `@earendil-works/pi-durable` | 대화, task, 문서를 위한 durable runtime |
| `@earendil-works/pi-telemetry` | 벤더 중립 텔레메트리 계약, 참조 adapter, conformance test, 타입 스키마 |
| `@earendil-works/chord` | 서비스, 복제 상태, RPC, plugin을 위한 독립 애플리케이션 조립 runtime |

Slack과 채팅 자동화는 별도 저장소 `earendil-works/pi-chat`이 담당한다. 장기 계획은 RFC 사이트(rfc.earendil.com)에 공개한다.

### 3.2 agent loop

`how-pi-works.md`는 Pi의 실행 흐름을 다음 순서로 정의한다. agent loop는 모델 호출, tool 실행, 결과 관찰을 반복하는 기본 순환이다.

1. 사용자가 제출한 메시지가 active branch에 추가된다.
2. Pi가 system prompt, active branch, 사용 가능한 tool, 모델 설정으로 요청을 만들어 선택한 provider로 보낸다.
3. provider가 텍스트와 tool call을 담은 assistant 응답을 스트리밍한다.
4. Pi가 응답을 기록하고 각 tool call을 실행한 뒤 결과를 기록한다. 여기까지가 turn 하나다.
5. tool 결과나 대기 중인 메시지가 추가 요청을 필요로 하면 다음 turn을 시작하고, 아니면 run을 끝낸다.

실행 중 입력은 두 종류로 나뉜다. steering 메시지는 현재 assistant turn 뒤에 들어가고(pi.dev 설명으로는 현재 tool이 끝난 뒤 남은 tool을 중단시킨다), follow-up 메시지는 에이전트가 대기 작업을 모두 마친 뒤 들어간다. 중단(abort)하면 현재 run이 멈추고 대기 메시지는 편집기에 다시 채워진다.

`pi-agent-core` README는 같은 loop를 이벤트 순서로 기술한다. `prompt()` 호출은 `agent_start`, `turn_start`, `message_start`와 `message_end`, 스트리밍 중 `message_update`, `turn_end`, `agent_end` 순서로 이벤트를 낸다. tool call이 있으면 `tool_execution_start`, `tool_execution_update`, `tool_execution_end`가 끼고 다음 turn이 이어진다.

| 항목 | 내용 |
|---|---|
| tool 실행 모드 | `parallel`(기본): preflight는 순차, 허용된 tool은 동시 실행, toolResult 메시지는 assistant 원래 순서로 기록. `sequential`: 하나씩 실행 |
| 모드 지정 | agent 설정의 `toolExecution` 전역값 또는 tool별 `executionMode`. 배치 안에 sequential tool이 하나라도 있으면 배치 전체가 순차 실행 |
| `beforeToolCall` | 인자 검증 뒤 실행 전에 호출되어 실행을 막을 수 있다 |
| `afterToolCall` | 실행 후, `tool_execution_end` 전에 결과를 덮어쓸 수 있다 |
| `terminate: true` | 배치의 모든 tool 결과가 terminate를 요청할 때만 자동 후속 LLM 호출을 생략한다 |
| `finishTurn` | `{ action: "end" }`는 turn_end 직후 정지, `{ action: "continue" }`는 다음 요청 하나를 보장한다. 무조건 continue를 반환하면 무한 루프가 된다 |

agent는 `AgentMessage`라는 확장 가능한 메시지 타입을 다룬다. LLM은 `user`, `assistant`, `toolResult`만 이해하므로, 요청 직전에 선택 단계 `transformContext()`(오래된 메시지 정리, 외부 context 주입)와 필수 단계 `convertToLlm()`(UI 전용 메시지 제거, custom 타입 변환)을 거친다. system prompt와 tool 선언은 transcript가 소유한다. 맨 앞 system 메시지가 prompt이고 이후 system 메시지가 이를 패치하며, loop는 매 요청 전 실제 tool 구성과 transcript 선언을 비교해 차이가 있으면 system 메시지로 알린다.

### 3.3 context 구성

model 요청에 들어가는 context는 다음 요소로 만든다.

| 요소 | 출처와 처리 |
|---|---|
| 대화 이력 | active branch의 세션 entry를 user, assistant, tool-result 메시지로 변환 |
| system prompt | 기본 지시문과 발견된 context 파일. 프로젝트별 `SYSTEM.md`로 교체하거나 덧붙일 수 있다 |
| tool 정의 | 활성 tool 집합 |
| 스킬 설명 | 이름, 설명, 경로만 넣고 전체 지시문은 필요할 때 읽는다 |
| prompt template | 편집기 입력을 사용자 메시지로 바꾸기 전에 확장한다 |
| 첨부 | 선택한 파일, 이미지, 붙여 넣은 텍스트, shell 출력 |

extension은 지시문을 추가하거나 context를 변형할 수 있다. `AGENTS.override.md`, `AGENTS.md`, `CLAUDE.md` 같은 context 파일은 project trust 여부와 무관하게 로드된다.

### 3.4 세션 저장과 branch

영속 세션은 JSONL 파일이다. 각 tree entry는 ID와 부모 참조를 갖고, 현재 entry가 active branch를 결정한다. 기본 저장 위치는 `~/.pi/agent/sessions/`이며 작업 디렉토리별로 묶인다(`--session-dir`, `PI_CODING_AGENT_SESSION_DIR`, `sessionDir` 설정으로 변경, CLI 옵션이 우선). `--no-session`은 재개할 수 없는 일회성 세션을 만든다.

| 동작 | 결과 | 쓰는 경우 |
|---|---|---|
| `/tree` | 현재 세션 파일 안에서 이동 | 관련 대안을 한 파일에 함께 두고 싶을 때 |
| `/fork` | 이전 사용자 메시지에서 새 세션 생성 | 대안을 별도 작업으로 분리할 때 |
| `/clone` | active branch를 새 세션으로 복사 | 현재 상태의 별도 사본이 필요할 때 |

`pi --continue`는 현재 디렉토리의 최근 세션을, `pi --resume`과 `/resume`은 세션 선택기를 연다. `/session`은 세션 파일, ID, 메시지 수, 토큰 사용량, 비용을 보여 준다. `/export`는 HTML이나 JSONL로 저장하고, `/share`는 Radius 인증이 있으면 Radius artifact로, 없으면 private GitHub gist로 올려 뷰어 링크를 준다. `/bug`는 transcript 포함 여부를 고르거나 현재 모델에게 문제 요약을 시켜 개발자용 비공개 리포트를 만든다.

### 3.5 compaction

compaction은 길어진 대화 이력을 요약으로 접어 context 한계 안에서 세션을 이어가는 처리다. Pi에는 요약 메커니즘이 두 가지 있다.

| 메커니즘 | 트리거 | 목적 |
|---|---|---|
| compaction | context가 임계값을 넘거나 `/compact` 실행 | 오래된 메시지를 요약해 context 확보 |
| branch summarization | `/tree`로 다른 branch로 이동 | 떠나는 branch의 맥락 보존 |

자동 compaction은 `contextTokens > contextWindow - reserveTokens`일 때 일어난다. `reserveTokens` 기본값은 16,384 토큰으로 응답 공간을 남기기 위한 값이다. 다중 turn 실행 중에는 tool 결과가 붙은 뒤 다음 assistant 응답 전에 검사하고, 새 사용자 prompt 전과 run 종료 후에도 검사한다. provider의 context overflow 오류나 이른 `stopReason: "length"`는 compact 후 재시도 한 번을 유발할 수 있다.

compaction 절차는 다섯 단계다.

1. **절단점 탐색**: 최근 메시지부터 거꾸로 토큰을 누적해 `keepRecentTokens`(기본 2만)에 도달하는 지점을 찾는다.
2. **메시지 추출**: 이전 보존 경계(또는 세션 시작)부터 절단점까지의 메시지를 모은다.
3. **요약 생성**: 이전 요약이 있으면 함께 넘겨 구조화된 형식으로 LLM 요약을 만든다.
4. **entry 추가**: 요약과 `firstKeptEntryId`를 담은 `CompactionEntry`를 저장한다.
5. **context 재구성**: 다음 요청부터 요약과 `firstKeptEntryId` 이후 메시지로 context를 만든다.

절단점은 사용자, assistant, BashExecution, custom 메시지에만 둘 수 있고 tool 결과에서는 자르지 않는다(tool call과 붙어 있어야 하기 때문이다). 사용자 메시지 하나가 시작한 구간이 `keepRecentTokens`보다 크면 그 구간 안 assistant 메시지에서 자르고, 이전 이력 요약과 구간 앞부분 요약 두 개를 만들어 합친다. 요약 요청은 재사용 가능성이 낮아 prompt cache 쓰기를 끈다.

요약 형식은 Goal, Constraints & Preferences, Progress(Done, In Progress, Blocked), Key Decisions, Next Steps를 공통으로 갖고 compaction 요약만 Critical Context를 더한다. 읽은 파일과 수정한 파일 목록(`readFiles`, `modifiedFiles`)은 기본 compaction과 branch summarization을 거치며 누적 추적된다.

| 설정 | 기본값 | 뜻 |
|---|---|---|
| `enabled` | `true` | 자동 compaction 사용 |
| `reserveTokens` | `16384` | 응답용으로 남겨 둘 토큰 |
| `keepRecentTokens` | `20000` | 요약하지 않고 남길 최근 토큰 |
| `modelOverrides` | 없음 | `provider/modelId` 키로 모델별 값 지정 |

문서 예시에서는 1M context 모델에 `reserveTokens`를 40만으로 주면 60만 토큰을 넘을 때 compaction이 일어난다. 자동 compaction을 꺼도 `/compact`는 동작한다. extension은 `session_before_compact`와 `session_before_tree` 이벤트로 compaction을 취소하거나 자체 요약을 제공할 수 있다.

### 3.6 확장 수단

quickstart는 필요에 맞는 가장 약한 수단부터 고르라고 안내한다.

| 필요 | 시작점 |
|---|---|
| 폴더에 지속 지시문 부여 | `AGENTS.md` |
| `/` 메뉴에서 재사용할 프롬프트 | prompt template |
| 작업별 지시문과 보조 파일 | 스킬 |
| 실행 가능한 tool, 커맨드, 이벤트 핸들러 | extension |
| 사용자 정의 터미널 컴포넌트 | Terminal UI |
| 지원하지 않는 모델 서비스 연결 | custom provider |
| 여러 리소스 설치와 배포 | Pi package |

**스킬.** Pi는 Agent Skills 명세를 구현한다. 스킬은 `SKILL.md`를 가진 디렉토리이며 `scripts/`, `references/`, `assets/`를 함께 담을 수 있다. 시작 시 각 스킬의 이름, 설명, 경로만 system prompt에 넣고, 과제가 맞으면 모델이 `SKILL.md`를 읽는다. 모델이 관련 스킬을 놓칠 수 있으므로 `/skill:name`으로 강제 로드할 수 있고, `disable-model-invocation: true`는 명시 커맨드로만 부르게 한다. 이름은 소문자, 숫자, 하이픈으로 최대 64자, 설명은 최대 1,024자다. `~/.agents/skills/`와 `.agents/skills/` 위치도 지원하며, 설명이 없거나 형식이 깨진 스킬은 로드하지 않고 이름이 충돌하면 처음 발견한 것을 남긴다.

**extension.** extension은 `ExtensionAPI`를 받는 default factory를 내보내는 TypeScript 모듈이다. `jiti`를 쓰므로 별도 컴파일 없이 로드되고, `~/.pi/agent/extensions/`나 프로젝트 디렉토리에 두거나 `pi --extension ./hello.ts`로 직접 로드한다. factory 안에서 프로세스, 소켓, watcher, timer를 시작하지 말고 `session_start`에서 시작해 `session_shutdown`에서 닫아야 한다.

| 기능 | 주요 API |
|---|---|
| lifecycle 관찰과 수정 | `pi.on()` |
| 모델이 부르는 동작 추가 | `pi.registerTool()` |
| `/` 커맨드 추가 | `pi.registerCommand()` |
| 단축키와 CLI 플래그 | `pi.registerShortcut()`, `pi.registerFlag()` |
| 메시지 전송 | `pi.sendUserMessage()`, `pi.sendMessage()` |
| context 밖 세션 데이터 저장 | `pi.appendEntry()` |
| model provider 추가 | `pi.registerProvider()` |
| MCP 서버 추가 | `pi.registerMcpServer()` |
| 요청별 모델 라우팅 | `pi.registerVirtualModel()` |
| extension 간 통신 | `pi.events` |

이벤트 핸들러는 로드 순서대로 실행된다. `tool_call`은 입력을 바꾸거나 실행을 막고, `tool_result` 핸들러는 순서대로 합성되며, `message_end`는 확정된 메시지를 교체할 수 있다. `turn_end`와 `agent_before_settle`은 entry를 추가하고 `continue: true`로 다음 요청 하나를 요청할 수 있는 지점이고, `agent_settled`는 알림 전용이다.

custom tool은 이름, 모델용 설명, TypeBox 파라미터 스키마, `execute()`를 정의한다. 실패는 `execute()`에서 예외를 던져 표시하고, 파일을 수정하는 tool은 `withFileMutationQueue()`로 읽기, 수정, 쓰기를 묶는다. tool의 `exposure`는 모델이 tool에 닿는 방식을 정한다.

| exposure | 동작 |
|---|---|
| `direct` (기본) | 활성 상태일 때 모델에 선언되고 다른 tool에서도 호출 가능 |
| `model-only` | 모델에만 선언되고 다른 tool에서는 호출 불가 |
| `codemode` | 등록되면 호출 가능하고 `codemode` tool 목록에 오르지만 모델에는 선언되지 않음 |
| `deferred` | codemode와 같되 codemode 목록에 없고 `tool_search`로 찾아 활성화 |
| `hidden` | 등록은 되어 있으나 도달 불가 (tool은 등록 해제가 안 되어 철회에 쓴다) |

`annotations`는 MCP tool annotation과 같은 의미의 힌트(`readOnlyHint`, `destructiveHint`, `idempotentHint`, `openWorldHint`)다. 검증되지는 않지만 권한 extension이 확인할 호출을 고르는 데 쓸 수 있고, 문서는 Codex가 승인을 묻는 호출을 같은 규칙으로 확인하는 예제 코드를 싣는다.

**Pi package.** extension, 스킬, prompt template, theme을 한 단위로 npm이나 git으로 배포한다. `pi install npm:@example/pi-tools@1.0.0`, `pi install git:github.com/example/pi-tools@v1`, 로컬 경로를 지원하고, `pi -e`로 설정에 추가하지 않고 한 번만 써 볼 수 있다. `package.json`의 `pi` 키에 리소스 경로를 명시하거나 관례 디렉토리(`extensions/`, `skills/`, `prompts/`, `themes/`)를 쓴다. `pi-package` keyword를 달면 pi.dev 패키지 갤러리에 오른다. Pi가 제공하는 `pi-ai`, `pi-agent-core`, `pi-coding-agent`, `pi-tui`, `typebox`는 `peerDependencies`에 `"*"`로 선언하고 번들하지 않아야 한다.

### 3.7 인터페이스

| 모드 | 동작 |
|---|---|
| interactive | 세션과 agent 이벤트를 터미널에 렌더링 |
| print | prompt 하나를 실행하고 최종 응답 출력 (`pi -p "query"`) |
| JSON | agent 이벤트를 JSONL로 출력 (`--mode json`) |
| RPC | stdin으로 JSONL 커맨드를 받고 stdout으로 응답과 이벤트 출력 |
| SDK | TypeScript에서 in-process로 agent 세션 생성과 제어 |

### 3.8 pi-ai

`pi-ai`는 provider 모음, 자동 인증 해석, 토큰과 비용 추적, context 직렬화, 세션 중간의 다른 모델로의 hand-off를 제공하는 통합 LLM API다. chat 카탈로그에는 tool calling을 지원하는 모델만 넣는다. 수집한 지원 provider 목록에는 OpenAI, Azure OpenAI, OpenAI Codex(ChatGPT 구독 OAuth), Anthropic, Google, Vertex AI, Mistral, Groq, Cerebras, Cloudflare AI Gateway와 Workers AI, xAI, OpenRouter, Vercel AI Gateway, DeepSeek, NVIDIA NIM, MiniMax, Moonshot AI, Together AI, Baseten, Hugging Face, GitHub Copilot, Amazon Bedrock, OpenCode Zen 등이 있다. 목차상 다루는 주제는 tool 정의와 partial JSON 스트리밍, 이미지 입력과 생성, 분류, thinking 통합 인터페이스, stop reason, 오류와 중단 후 재개, custom provider, 테스트용 faux provider, cross-provider handoff, 브라우저 사용, OAuth다.

### 3.9 보안 모델

Pi의 tool과 extension은 Pi 프로세스의 운영체제 권한으로 실행되고, 모든 tool call 전에 승인을 묻지 않는다. 문서는 transcript 관찰, project trust, 변경 검토는 보안 경계가 아니라고 명시한다.

| 실행 방식 | 보호되는 것 |
|---|---|
| 운영체제 사용자 권한으로 직접 실행 | 그 사용자가 접근할 수 없는 것만. 전용 계정으로 범위를 좁힐 수 있다 |
| 컨테이너, VM, 샌드박스 안에서 전체 실행 | 노출하지 않은 호스트 파일과 프로세스. 문서가 보통 가장 강한 실용 선택지로 꼽는다 |
| Pi는 밖에 두고 내장 tool만 격리 환경에서 실행 | tool로 수행한 동작으로부터 호스트 보호. Pi와 다른 extension은 경계 밖이라 더 좁은 격리다 |

README가 든 격리 패턴은 세 가지다. Gondolin extension은 `pi`와 provider 인증을 호스트에 두고 내장 tool과 `!` 커맨드를 로컬 Linux micro-VM으로 보낸다. Plain Docker는 `pi` 프로세스 전체를 로컬 컨테이너에서 실행한다. OpenShell은 `pi` 프로세스 전체를 policy로 통제되는 샌드박스에서 실행한다.

project trust는 작업 폴더가 제공하는 설정과 리소스(`.pi/settings.json`, `.pi/mcp.json`, `.pi/extensions`, `.pi/skills`, `.pi/prompts`, `.pi/themes`, `.pi/SYSTEM.md`, `.pi/APPEND_SYSTEM.md`, 프로젝트 `.agents/skills`)를 로드할지 정한다. 결정 순서는 CLI `--approve`/`--no-approve`, 사용자 수준 extension의 `project_trust` 이벤트, `~/.pi/agent/trust.json`에 저장된 가장 가까운 디렉토리 결정, 전역 `defaultProjectTrust`(기본 `"ask"`) 순이다. print, JSON, RPC 모드는 trust prompt를 띄울 수 없어 `"always"`가 아니면 보호 리소스를 건너뛴다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

저장소는 성능 벤치마크를 제시하지 않는다. 수집 시점 정량 정보는 star 111,190과 fork 14,128, 패키지 13개(README 소개 7개), coding-agent docs 41개 문서, pi.dev가 밝힌 provider 15곳 이상과 extension 예제 50개 이상이다. 개발 명령은 `npm run build`(모델 데이터 갱신 후 빌드), `npm run build:offline`, `npm run check`(lint, format, 타입 검사), `./test.sh`(API 키가 없으면 LLM 의존 테스트 생략), `./pi-test.sh`(소스에서 실행)다.

공급망 규칙은 다음과 같다.

- 직접 외부 의존성은 정확한 버전으로 고정하고 내부 workspace 패키지만 범위 버전을 쓴다.
- `.npmrc`는 `save-exact=true`, `min-release-age=2`를 둔다.
- `package-lock.json`을 의존성 기준으로 삼고, pre-commit이 `PI_ALLOW_LOCKFILE_CHANGE=1` 없이는 lockfile 커밋을 막는다.
- 배포 CLI 패키지에 루트 lockfile에서 생성한 `npm-shrinkwrap.json`을 넣는다.
- 릴리스 전 `npm run release:local`로 저장소 밖에 npm과 Bun 설치를 만들어 smoke test를 한다.
- CI는 `npm ci --ignore-scripts`로 설치하고 정기 워크플로가 `npm audit`와 `npm audit signatures`를 실행한다.
- shrinkwrap 생성에 lifecycle script 허용 목록이 있어 새 lifecycle script 의존성은 검토 전까지 검사에서 실패한다.

릴리스 소스 아카이브로 `./scripts/build-binaries.sh --offline-model-data --platform linux-x64`를 실행하면 공식 standalone 바이너리를 직접 빌드할 수 있다. README는 OSS 작업 세션을 `badlogic/pi-share-hf`로 Hugging Face에 공개하자고 권하고, 작성자 본인의 `pi-mono` 작업 세션을 `badlogicgames/pi-mono` 데이터셋으로 정기 공개한다고 밝힌다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **내장 권한 시스템 없음.** 파일시스템, 프로세스, 네트워크, 자격 증명 접근을 제한하지 않는다. 격리는 사용자가 컨테이너나 VM으로 직접 구성해야 한다.
- **project trust의 한계.** 프로젝트 `sessionDir` 설정은 trust 결정 전에 읽힌다. context 파일(`AGENTS.md`, `CLAUDE.md`)은 trust와 무관하게 로드되어 prompt injection 경로가 남는다.
- **기능 미내장.** 서브에이전트, plan mode, 권한 게이트는 extension 예제나 서드파티 package로 직접 구성해야 한다.
- **extension 신뢰 문제.** extension은 Pi 프로세스 안에서 같은 권한으로 실행되어 prompt, tool call, 파일, 자격 증명, 세션 이력을 볼 수 있다.
- **스킬 로드 누락 가능성.** 모델이 관련 스킬을 로드하지 않을 수 있어 `/skill:name` 강제 호출이 필요할 때가 있다.
- **compaction 실패.** provider가 응답하지 않거나 요약 요청을 받지 못하면 compaction이 실패한다.
- **기여 정책.** 새 기여자의 issue와 PR은 기본 자동 종료된다.
- **보안 범위 밖 항목.** 로컬 에이전트의 예상 동작, 신뢰할 수 없는 콘텐츠의 prompt injection, 내장 샌드박스 부재, 사용자가 설치한 extension과 스킬의 동작은 권한 경계 우회가 아니면 보안 신고 대상이 아니다.

## 6. 관련 연구 (Related Work)

- [[agents/earendil-works-2026-pi-project-page]]: 같은 프로젝트의 소개 사이트. 설계 철학과 기능을 사용자 관점에서 정리한다.
- [[agents/agentskills-agentskills]]: Pi가 구현하는 Agent Skills 명세 저장소.
- [[agents/magnitudedev-magnitude]]: Pi를 연결 대상 harness로 지원하는 로컬 추론 서버. Pi만 세션 안에서 `/model`로 바로 전환된다.
- [[agents/stablyai-orca]]: Pi를 포함한 CLI 에이전트를 worktree별로 병렬 실행하는 데스크톱 앱.
- [[agents/ayghri-i-have-adhd]]: Pi용 `package.json`과 extension 배포 경로를 갖춘 스킬 저장소.
- [[database/li-2026-beyond-semantic-similarity-rethinking-retrieval]]: Pi를 기반 harness로 쓴 최소 scaffold DCI-Agent-Lite를 실험한 논문.
- [[overviews/agent-harness-engineering-overview]]: harness 설계 자료를 묶은 overview.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| active branch | 세션 tree에서 현재 entry로 끝나는 경로. 다음 모델 요청의 이력을 공급한다 |
| steering 메시지 | 에이전트 실행 중 제출해 현재 turn 뒤에 끼워 넣는 메시지 |
| follow-up 메시지 | 에이전트가 대기 작업을 모두 마친 뒤 들어가는 메시지 |
| branch summarization | `/tree`로 branch를 옮길 때 떠나는 branch를 요약해 새 위치에 붙이는 처리 |
| `firstKeptEntryId` | compaction 뒤 원문 그대로 모델에 보내는 첫 entry의 ID |
| project trust | 작업 폴더의 설정과 실행 리소스를 로드할지 정하는 결정. tool call을 제한하지는 않는다 |
| Pi package | extension, 스킬, prompt template, theme을 npm이나 git으로 함께 배포하는 단위 |
| exposure | tool이 모델에 선언되는지, 다른 tool에서 호출 가능한지를 정하는 속성 |
| codemode | 스크립트 안에서 다른 tool을 프로그래밍 방식으로 호출하는 tool과 그 exposure 등급 |

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | - | 터미널에서 실행 중인 Pi 화면 (대화, 입력 편집기, footer) | manual | (수동 저장 필요) |
| fig02 | - | 세션 tree 탐색 화면 | manual | (수동 저장 필요) |

repos 규약에 따라 이미지는 자동으로 받지 않았다. `docs/images/`에는 이 둘 외에 `doom-extension.png`(pi.dev fig01과 같은 그림)와 마스코트 `exy.png`가 있다.
