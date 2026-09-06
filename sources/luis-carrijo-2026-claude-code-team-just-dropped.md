---
title: "Claude Code team just dropped a free course on loop engineering with Fable 5"
type: video
year: 2026
category: agents
raw_path: raw/videos/luis-carrijo-2026-claude-code-team-just-dropped.md
raw_filename: "luis-carrijo-2026-claude-code-team-just-dropped.md"
source_collection: external
channel: "Luis Carrijo"
url: "https://www.youtube.com/watch?v=RjLlIC9InDI"
duration: "1:01:05"
tags: [claude-code, agentic-loop, dynamic-workflow, auto-mode, permissions, skills, fable-5, vertex-ai]
---

## 한 줄 요약 (One-line Summary)

Claude Code의 harness가 매 호출마다 프롬프트를 조립하는 방식에서 출발해 permissions 계층, 스킬, auto mode, dynamic workflow까지를 라이브 데모로 훑는 1시간짜리 강좌 겸 대담이다. Anthropic의 Lydia Haley와 CS Dojo의 YK Sugi가 출연해 각각 설계 의도와 실전 운영 방식을 설명하고, 3D slingshot 게임을 처음부터 만들어 dynamic workflow로 다시 빌드하는 과정을 끝까지 보여 준다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 채널 | Luis Carrijo |
| 프로그램 | Agent Factory (transcript에서 진행자가 "Welcome to the agent factory"로 소개한다) |
| 출연 | Lydia Haley (Anthropic, 온라인 활동명 Avocoder), YK Sugi (CS Dojo 운영자, Claude Code tips 저장소 저자) |
| 업로드 | 2026-07-09 |
| 길이 | 1:01:05 |
| URL | https://www.youtube.com/watch?v=RjLlIC9InDI |
| 실행 환경 | Google Cloud Agent Platform, Vertex AI 경유 Claude 모델 |

전반부는 Lydia Haley의 워크숍 형식 강의이고, 15분 지점부터 대담과 두 편의 라이브 데모가 이어진다. 영상에 붙은 챕터 구분은 다섯 개다.

| timestamp | 챕터 |
|---|---|
| 00:00 | how Claude Code works under the hood |
| 05:01 | the agentic loop explained |
| 16:21 | the feature 99% of devs miss: auto mode |
| 19:01 | why voice beats typing |
| 32:34 | auto code review with draft PRs |

### 자동 자막 오인식 판정

raw transcript는 자동 생성 자막이라 고유명사가 상당수 잘못 적혔다. 본 요약은 아래 판정에 따라 정확한 표기로 옮겼다. 판정 근거는 문맥과 제품 실체다.

| transcript 표기 | 판정 표기 | 근거 |
|---|---|---|
| cloud code, clot code, claw code, clock code, cla | Claude Code | 강좌 전체의 대상 제품이다 |
| CloudMD | CLAUDE.md | 프로젝트 지시문 파일을 가리키는 문맥이다 |
| enthropic | Anthropic | Claude Code 제작사다 |
| Vortex AI, Vert.ex AI | Vertex AI | Google Cloud의 모델 서빙 제품이다 |
| Asian platform, Asian factory | Agent Platform, Agent Factory | Google Cloud 제품명과 프로그램명이다 |
| aentic, sub aents | agentic, sub-agents | 강좌 주제어다 |
| 3JS, Canon | three.js, Cannon | YK Sugi가 물리 라이브러리를 비교하는 대목이다 |
| beat (빌드 도구) | Vite | 프런트엔드 빌드 도구를 지정하는 문맥이다 |
| mpm run, sf read file | npm run, fs.readFile | 명령과 Node 파일 읽기 API다 |
| presidents | precedence | permissions 계층의 우선순위를 설명하는 대목이다 |
| quadify, clify, claify | claudify | Lydia Haley가 만든 조어를 진행자가 되받는 대목이다 |
| playright | Playwright | 브라우저 테스트 도구다 |

판정을 보류한 표기도 있다. 진행자가 Vertex AI 설정 데모를 넘길 때 부르는 이름 "Samita", YK Sugi가 면접을 봤다는 회사 "Daft", `/fewer-permission-prompts`가 규칙 추가를 건너뛴 사유로 출력한 "mutating ob"는 transcript만으로 원 표기를 확정할 수 없어 본문에서 다루지 않았다.

## 2. 주요 기여 (Key Contributions)

- Claude Code harness가 사용자 입력 한 번을 API request 하나로 조립하는 과정을 구성 요소 단위로 분해해 보여 준다. tool schemas, system prompt, 환경 정보, messages array 네 덩어리로 나눠 설명한다.
- permissions의 allow, ask, deny 세 규칙과 enterprise에서 project까지의 우선순위 계층을 데모로 확인한다. deny 규칙이 모델이 낸 tool call도 실제로 막는 장면을 포함한다.
- auto mode의 설계 배경을 Anthropic 담당자가 직접 설명한다. 기존 두 모드가 각각 permission fatigue와 무제한 실행이라는 문제를 가진다는 진단에서 출발한다.
- dynamic workflow를 실제로 실행해 `/workflows`로 phase 구성을 열어 보이고, 생성된 JavaScript 파일 자체를 편집 대상으로 제시한다.
- intent-driven development를 3D slingshot 게임 빌드로 구현해 보인다. 프롬프트 원문, 라이브러리 선택 대화, draft PR 생성까지 전 과정을 담는다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### harness의 프롬프트 조립

강의의 출발점은 모델이 stateless라는 사실이다. 세션 안에서도, 호출과 호출 사이에도 모델에는 메모리가 없다. 매번 호출할 때마다 모델은 사실상 0에서 시작한다. 따라서 상태를 전부 제공하는 일은 harness의 몫이다. harness는 모델을 감싸 도구와 상태를 공급하는 실행 환경을 말하며, 여기서는 Claude Code 자체가 harness다.

사용자가 엔터를 누르는 순간 Claude Code는 아래 네 덩어리를 하나의 큰 request로 조립한다.

| 구성 요소 | 담기는 내용 | 출처 |
|---|---|---|
| tool schemas | Claude Code가 사용자를 대신해 취할 수 있는 모든 행동의 정의. bash, edit, read, agent, web fetch 등이 있고 문서에 전량 공개돼 있다. 실체는 이름, 설명, 입력 형태를 담은 JSON schema다 | Claude Code 내장 |
| system prompt | 모델의 정체성, 어조, 코딩 컨벤션, Anthropic이 강제하려는 보안 규칙 | Claude Code에 하드코딩 |
| 환경 정보 | 운영체제, 셸, 실행 중인 모델, git 브랜치 | 세션 시작 시 수집 |
| messages array | 사용자 프롬프트, CLAUDE.md 파일 내용, 스킬 목록 | 사용자 프로젝트와 입력 |

스킬 목록은 이름과 설명만 첫 메시지에 들어간다. 강의는 이를 progressive disclosure라고 부른다. progressive disclosure는 필요한 시점에만 정보를 단계적으로 노출하는 설계를 뜻한다.

조립 결과는 messages API로 보내는 JSON request body다. 강의는 여기에 한 가지 단서를 붙인다. 모델은 JSON을 읽지 않는다. JSON을 토큰으로 바꾸는 일은 Anthropic API나 Bedrock 같은 API 계층이 내부에서 처리한다.

### agentic loop 한 바퀴

강의는 "add a test for calc"라는 요청 하나로 루프 한 바퀴를 따라간다. 조립된 프롬프트 어디에도 `utils.ts` 파일 내용이 아직 없으므로 모델은 tool schemas에서 read tool을 발견하고 그것을 호출한다.

| 순서 | 주체 | 일어나는 일 |
|---|---|---|
| 1 | harness | 네 덩어리를 조립해 API로 보낸다 |
| 2 | 모델 | 파일 내용이 없다는 것을 확인하고 read tool call을 담은 assistant message를 반환한다 |
| 3 | CLI | API 응답이 온 뒤에야 read tool call이 화면에 표시된다 |
| 4 | harness | 실제 파일 읽기를 실행한다. 내부 구현은 `fs.readFile`이나 런타임에 맞는 등가 호출이다 |
| 5 | harness | 파일 내용을 tool result로 messages array에 추가한다 |
| 6 | harness | assistant message와 tool result가 더해진 상태로 프롬프트 전체를 다시 조립한다 |

모델은 직접 파일을 읽거나 명령을 실행하지 못한다. tool call은 harness에 보내는 신호일 뿐이고 실행은 harness가 한다. 강의는 이 도식이 실제 JSON 객체를 그대로 옮긴 것이 아니라 개념을 보여 주는 의사코드라고 명시한다.

### permissions

plan mode는 permission mode의 일종으로 소개된다. 아직 아무것도 코딩하지 말고 손대지 말라고 지시하는 모드다. 그보다 세밀한 통제 수단이 설정 파일의 permissions다.

Claude Code 설정 JSON은 tool call을 세 방식으로 처리한다.

| 규칙 | 동작 | 강의가 든 예시 |
|---|---|---|
| allow | 질문 없이 실행한다 | `npm run` 계열 명령, 경우에 따라 git commit |
| ask | 실행 전에 사용자에게 묻는다 | `rm` 계열. deny로 두면 지워야 할 파일이 계속 남아 곤란하다는 이유로 Lydia Haley는 ask를 선호한다 |
| deny | 실행을 막는다 | git push. 원격 저장소를 건드리지 못하게 한다 |

기본 모드도 따로 지정할 수 있다. 규칙을 손으로 적는 대신 내장 슬래시 커맨드 `/permissions`로 새 규칙을 추가하거나 기존 규칙을 열람할 수 있다. 다만 어떤 tool이 존재하는지와 permission 표기법을 알아야 한다는 점이 불편으로 지적된다.

`/fewer-permission-prompts`는 그 불편을 줄이는 신규 커맨드다. 기존 세션 transcript 전체를 훑어 사용자가 가장 자주 질문받은 tool call을 찾아 설정 JSON에 규칙으로 추가한다. 데모에서는 새 노트북 환경인데도 두 개를 추가했고, 각각 Linear MCP 서버 호출과 `bash bun run type check`였다. 추가하지 않고 건너뛴 항목은 사유를 함께 출력한다. 커맨드의 내부 지시문은 "when in doubt, leave it out"이며, 이미 Claude가 자동 허용하는 항목은 규칙이 필요 없다는 이유로 제외한다.

여러 위치의 설정이 충돌할 때의 우선순위는 위쪽이 이긴다.

| 순위 | 계층 | 의도 |
|---|---|---|
| 1 | managed settings (enterprise) | 회사가 정한 규칙을 개인이 덮어쓰지 못하게 한다 |
| 2 | user | 개인 전역 설정 |
| 3 | project | 프로젝트별 설정 |

강의는 이를 "루트에 가까운 쪽이 이기는 역방향 계층"이라고 표현한다. deny 규칙의 실효성은 데모로 확인한다. `Edit package.json`을 deny에 넣은 뒤 모델을 Haiku로 바꿔 package.json의 버전을 1로 올려 달라고 요청하자 Claude는 할 수 없다고 답했다. 모델에서 나온 tool call이라도 deny 규칙에 걸리면 실행되지 않는다.

CLAUDE.md와 permissions의 역할 분담도 정리된다. CLAUDE.md는 행동을 유도하고 permissions는 그것을 보장한다. 다만 두 수단 모두 수동적이며, 반복 절차를 능동적으로 담아 두는 수단이 스킬이다.

### 스킬

스킬은 특정 절차를 담은 마크다운 파일이다. 매번 다시 설명해야 하는 여러 단계짜리 작업, 그리고 프로젝트에 고유한 작업이 대상이다. 강의가 든 예시는 배포, 통합 작업, 질의응답 루프다.

작성은 `/skill-creator`로 시작한다. 강의는 이 커맨드가 Claude Code 내장이라고 보면서도, 평소 플러그인을 여러 개 추가해 두어 내장인지 추가한 것인지 헷갈릴 때가 있다고 덧붙인다. 데모에서는 code reviewer 스킬을 만든다.

frontmatter로 조정할 수 있는 항목은 다음과 같다.

| 키 | 효과 | 강의가 든 용도 |
|---|---|---|
| `model` | 스킬 실행 시 사용할 모델을 고정한다 | Opus 세션에서도 코드 리뷰만은 Sonnet이나 Haiku로 처리한다 |
| `disable_model_invocation: true` | 스킬을 모델에 전달하지 않고 로컬에만 둔다. 모델은 호출할 수 없고 사용자만 슬래시 커맨드로 쓴다 | 모델이 임의로 코드 리뷰를 시작하지 못하게 한다 |
| `user_invocable: false` | 반대로 슬래시 커맨드에서 사라지고 모델만 호출할 수 있다 | 모델 전용 절차 |
| 인자 문법 | 슬래시 커맨드에 인자를 넘긴다 | `/deploy staging`처럼 배포 대상을 지정한다 |

Lydia Haley는 `disable_model_invocation`과 `user_invocable`이 서로를 부정하는 방향이라 frontmatter 설정 하나로 합쳐졌어야 했다고 인정하고, 당분간은 그대로 받아들여 달라며 변경 가능성을 언급한다.

배포 스킬 예시는 테스트 실행, 앱 번들링, 환경 배포 세 단계로 구성하고 배포 대상을 인자로 받는 형태다. 스킬 사고방식도 함께 제시된다. 무언가를 직접 코딩하기 전에 Claude Code가 이미 자동화해 두었는지 먼저 확인하고, 일상 업무 중 얼마나 많은 부분을 Claude에 맡길 수 있는지 되짚어 보라는 것이다.

### auto mode

auto mode는 기존 두 방식의 중간에 놓인다.

| 방식 | 동작 | 문제 |
|---|---|---|
| ask 전면 적용 | 파일 삭제, 명령 실행 등 모든 행동을 묻는다 | permission fatigue. 백 번쯤 질문받고 나면 내용을 읽지 않고 승인하게 된다 |
| `--dangerously-skip-permissions` | 아무것도 묻지 않는다 | 루트 파일을 지우려는 순간에도 되돌릴 방법이 없다 |
| auto mode | deny 목록과 allow 목록 사이에서 tool call마다 별도의 classifier를 실행한다 | 강의가 제시하는 해법이다 |

classifier의 판단 기준은 위험 여부다. 위험하다고 보면 사용자에게 묻고, 일반적인 read나 edit이면 묻지 않고 진행한다. 강의는 부수 효과 두 가지를 덧붙인다.

- prompt injection 방어가 낫다. tool call 안에 "ignore all instructions" 같은 문구가 섞여 들어와도 중간에서 도는 classifier가 이를 잡아낼 여지가 크다.
- 컨텍스트를 반영한다. `rm -rf`는 일반적으로 위험하지만 사용자가 그 폴더를 지워 달라고 직접 요청했다면 위험하지 않다. 그런 경우 auto mode는 묻지 않는다.

결과적으로 긴 세션에서 Claude Code를 훨씬 자율적으로 실행할 수 있다는 것이 도입 이유다. Google Cloud Agent Platform에서는 기본 비활성이라 환경변수 `CLAUDE_CODE_ENABLE_AUTO_MODE`를 내보내고 재시작해야 한다. 켜진 뒤에는 Shift+Tab으로 모드 목록에서 확인할 수 있다.

### dynamic workflow

dynamic workflow는 서브에이전트(sub-agent) 실행의 비결정성을 해결하려는 신규 기능이다. 서브에이전트는 자체 컨텍스트를 가진 또 하나의 Claude Code 인스턴스이며, 특정 작업 하나에 집중하는 데 강하다. 문제는 몇 개가 뜰지 예측할 수 없다는 점이다. 같은 요청에도 네 개가 뜨기도 하고 아예 뜨지 않기도 하며 열 개가 뜨기도 한다.

| 항목 | 일반 서브에이전트 호출 | dynamic workflow |
|---|---|---|
| 실행 결정 방식 | 모델이 그때그때 판단한다 | Claude Code가 JavaScript 파일을 생성하고 그 파일이 실행을 규정한다 |
| 재현성 | 비결정적이다 | 저장한 뒤 슬래시 커맨드로 부르면 매번 동일한 서브에이전트가 실행된다 |
| 규모 | 소수 | 수백 개까지 늘어날 수 있으며 이는 설계 의도다 |
| 대상 작업 | 단발 작업 | 수 시간에서 수 일이 걸리는 장기 작업 |

호출 방법은 슬래시 커맨드가 아니라 자연어다. 프롬프트에 dynamic workflow를 쓰라고 적기만 하면 된다. Lydia Haley의 실제 프롬프트는 디자인 파일을 읽고 dynamic workflow로 게임을 다시 빌드해 그 디자인에 맞추라는 요청이었다.

실행 내역은 `/workflows`로 확인한다. 데모에서 확인된 구성은 아래와 같다.

| phase | 서브에이전트 | 실행 방식 |
|---|---|---|
| build | build engine, build UI, build audio, build levels and haptics | 네 개가 병렬로 실행된다 |
| integration | 단일 서브에이전트 | build 완료 후 순차 실행 |
| review | 단일 서브에이전트 | 순차 실행 |
| verify | 단일 서브에이전트 | 순차 실행 |

phase 사이는 순차이고 build phase 내부는 병렬이다. 병렬 실행 덕분에 단일 서브에이전트와 비슷한 시간 안에 더 많은 작업을 끝낼 수 있다는 것이 강의의 설명이다. 데모에서는 모든 서브에이전트가 Fable 5로 실행됐다.

`/workflows` 화면에서 `S`를 누르면 workflow를 저장한다. 데모에서는 rebuilt slingshot game이라는 이름으로 저장했고, 그 결과물이 JavaScript 파일이다. 파일 내용은 평범한 함수이며 build phase, 각 builder, 서브에이전트에 넘기는 프롬프트, review phase가 모두 코드로 드러난다. 서브에이전트별 모델도 바꿀 수 있다. Claude에게 부탁하는 방법과 JavaScript 파일을 직접 편집하는 방법 둘 다 가능하다. 파일이 고정되면 같은 슬래시 커맨드를 부를 때마다 같은 서브에이전트 구성이 실행된다.

### Vertex AI 연동

Google Cloud Agent Platform에서 Claude Code를 쓰는 경로가 두 가지 제시된다.

| 방식 | 절차 |
|---|---|
| 수동 | Claude Code 설치, gcloud SDK 설치, 프로젝트 ID 설정, Vertex AI API 활성화, Vertex AI 연동용 환경변수 설정 |
| `/setup-vertex` 마법사 | 위 절차 대부분을 자동 수행한다. application default credentials 선택, 프로젝트 선택, 리전 선택을 물은 뒤 Haiku로 짧은 확인 호출을 보내 설정이 맞는지 검증하고, 사용 가능한 모델 목록을 보여 준다 |

데모 계정에서 확인된 모델은 Opus 4.6과 Fable 5였고, 추가 모델은 Google Model Garden에서 활성화할 수 있다. 마지막에 작업 모델의 컨텍스트를 100만 토큰으로 고정하고 설정을 저장했다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

정량 벤치마크는 없다. 대신 두 편의 라이브 데모와 실전 운영 관찰이 근거로 제시된다.

### 데모 1. slingshot 게임 처음부터 만들기

YK Sugi가 음성 입력으로 진행한 intent-driven development 데모다. 첫 프롬프트는 만들 것을 구체적으로 지정하되 구현 방법은 열어 둔다. 고정 카메라와 고정 slingshot이 눈앞에 있고, slingshot에 매달린 공을 X축과 Y축 방향으로 끌 수 있으며, 끄는 방향이 X와 Y 좌표를, 붙잡고 있는 시간이 Z 방향을 결정한다. 뒤로 멀리 당길수록 빠르게 날아간다. 구현은 프런트엔드 HTML, JavaScript, CSS로 한정하되 라이브러리 사용은 허용하고 선택지를 알려 달라고 요청한다.

모델은 three.js에 직접 구현한 물리 엔진을 붙이는 방안과 three.js에 Cannon을 결합하는 방안을 제시했다. YK Sugi는 직접 구현은 원하지 않는다고 답하고, Cannon 말고 다른 물리 라이브러리가 있었던 것 같다며 다시 물었다. 모델이 Ammo와 Rapier를 제시하자 사전에 조사해 둔 Rapier를 선택했다. 빌드 도구는 Vite로 지정했다.

이후 요청은 세 차례 더 이어진다.

| 순서 | 요청 | 결과 |
|---|---|---|
| 1 | 프로젝트를 git 저장소로 만들고 공개 저장소를 생성한다 (별도 탭의 두 번째 세션) | `gh` 명령으로 처리 |
| 2 | 발사 전에 궤적을 표시해 공이 어디로 갈지 보이게 한다 | 궤적 기능 추가 후 커밋 |
| 3 | 앞쪽에 큰 원반형 표적을 몇 개 놓고, 맞으면 입자로 흩어지는 시각 효과를 넣는다 | 서로 다른 거리에 배치한 과녁 세 개와 충돌 판정으로 계획 수립 |

요청하지 않았는데도 Claude가 Playwright로 스스로 테스트를 돌린 장면이 데모에 포함된다. 마지막 프롬프트는 코드 리뷰 과정을 흉내 내기 위한 것으로, main에 직접 push하지 말고 새 브랜치를 만들어 push한 뒤 draft PR을 만들고 `open` 명령으로 열어 달라는 요청이었다. 병렬로 진행한 다른 세션에서는 Lydia Haley의 GitHub 계정에 저장소 admin 권한을 부여했다.

데모 중간에 YK Sugi가 제시한 운영 팁은 다음과 같다.

| 팁 | 내용 |
|---|---|
| alias 설정 | 매번 `claude`를 타이핑하지 않도록 별칭을 만든다 |
| 음성 입력 | `/voice` 옵션이나 전용 데스크톱 앱을 쓴다. YK Sugi는 로컬 모델을 쓰는 앱을 직접 만들어 사용한다 |
| 프로젝트 단일 폴더 | 대부분의 프로젝트를 한 폴더 아래 둔다. 에이전트가 다른 프로젝트를 참조하기 쉬워져 한 프로젝트의 요소와 다른 프로젝트의 요소를 합치라는 지시가 가능해진다 |
| 질문 순서 | 아키텍처와 라이브러리 같은 넓은 질문을 먼저 하고 점점 좁혀 간다. 최신 정보가 필요하면 에이전트에게 조사를 맡긴다 |
| CLI 숙달 | git과 GitHub CLI를 비롯한 CLI 명령 전반을 익힌다 |
| 출력 검증 | 앱 동작을 직접 확인하고, 코드를 직접 읽고, 테스트와 GitHub Actions로 검증을 자동화한다 |
| draft PR | 에이전트가 만든 PR은 draft로 두고 확인한 뒤 리뷰 대기로 바꾼다. 다른 사람도 상태를 명확히 알 수 있다 |
| 팁 38번 | 코드 생성 모델은 필요 이상으로 코드를 많이 쓰는 경향이 있으므로 과도하게 복잡한 코드는 단순화한다 |

plan mode 사용 여부를 묻는 질문에 YK Sugi는 명시적으로 켜 본 적은 없고 Claude가 스스로 켜는 경우는 있다고 답했다. 프롬프트가 다소 모호하거나 오타와 음성 인식 오류가 섞여도 의도만 분명하면 Claude가 알아듣는다는 관찰도 덧붙인다. 컨텍스트가 적을수록 질문을 많이 하라는 것이 그가 제시한 기준이다.

### 데모 2. 와이어프레임 기반 dynamic workflow 리빌드

Lydia Haley는 YK Sugi의 저장소를 가져와 실제 게임에 가깝게 확장하는 작업을 맡았다. 특징은 프롬프트로 변경 사항을 나열하는 대신 시각적 계획을 먼저 만든 점이다.

계획은 Claude Design으로 작성했다. Claude Design은 프롬프트로 프레젠테이션, 슬라이드, 웹사이트를 만드는 research preview 단계의 도구이며, 강의는 이를 디자인용 Claude Code라고 소개한다. 산출물은 HTML이라 Figma나 Canva로 내보낼 수도 있다.

Claude가 제안한 Slingshot V2 구성은 메인 메뉴, 레벨 선택, 게임플레이 루프로 이어지는 게임 흐름과 게임플레이 화면이다. 화면에는 체력 바가 들어가고, 설계할 시스템으로 체력 바, 조준과 충전, 햅틱, 점수 집계가 제시된다. 레벨별 화면도 함께 만들어졌다. 햅틱은 휴대폰에서 당기고 부수는 감각을 전달하기 위한 것이다.

이 HTML 와이어프레임을 데모 자산 폴더에 넣고, 파일을 읽어 dynamic workflow로 게임을 다시 빌드하라고 요청했다. 프롬프트를 더 구체적으로 쓸 수도 있었지만 Claude가 와이어프레임만으로 의도를 이해하는지 보려고 일부러 짧게 두었다는 설명이 붙는다.

결과물은 원래 디자인의 손그림 느낌을 거의 그대로 재현했고, 레벨이 추가됐으며 오디오까지 들어가 실제 게임 형태가 됐다. Fable 5는 큰 모델이라 응답이 다소 느렸고, 강의는 요리 프로그램처럼 미리 완료해 둔 탭을 준비해 두는 방식으로 대기 시간을 처리했다.

### 실전 운영 관찰

| 사례 | 내용 |
|---|---|
| PR 자동 수정 | GitHub에 Claude 앱을 설치해 두면 CI가 실패하거나 팀원이 코멘트를 남길 때 Claude가 자동으로 수정을 시도해 CI가 통과할 때까지 해당 브랜치에 push한다. Anthropic 팀은 모든 이슈와 PR에 Claude bot을 붙여 두고 있다 |
| 예약 세션 | Lydia Haley는 예약 실행되는 Claude Code 세션을 여러 개 두어 상시로 진행 상황을 파악한다 |
| 리뷰 비중 전환 | 직접 코드를 쓸 때는 작성 과정에서 리뷰의 90% 정도가 함께 일어난다. Claude Code를 쓰면 리뷰가 90%, 직접 손대는 수정이 10% 정도로 뒤집힌다 |
| 비용 절감 | YK Sugi는 부동산을 사는 과정에서 Claude Code로 realtor 목록과 이메일 주소를 쉼표로 구분된 형태로 뽑아 직접 연락했고, 그 결과 1만 달러를 아꼈다고 밝힌다 |
| 비개발 용도 | 리서치, 영상 편집, 데이터 분석, 저장소 정리, 글쓰기에 CLI를 쓴다. Lydia Haley는 MP4 변환과 음량 조절, 이미지 편집을 별도 소프트웨어 없이 Claude Code로 처리하고 영상 편집도 상당 부분 CLI에서 한다 |

Claude co-work의 배경도 이 맥락에서 설명된다. 2025년 12월 무렵 Anthropic 내부에서 마케팅 팀이 마케팅 파일을 만들거나 데이터 사이언스 업무를 처리하는 등 비개발 용도로 Claude Code를 쓰는 사례가 늘었다. 그런 작업에 맞는 harness를 따로 만들자는 판단에서 co-work가 약 일주일 만에 나왔고, 제작에도 Claude Code를 썼다. 현재 구분은 기술 작업은 Claude Code, 이메일과 캘린더와 항공권 예약 같은 비기술 작업은 co-work다. co-work는 내부적으로 Claude Code 런타임을 그대로 쓰므로 코딩도 가능하지만, connector와 system prompt가 비기술 작업에 맞춰져 있다.

### 역할 변화에 대한 관점

Lydia Haley는 소프트웨어 엔지니어의 역할이 product manager에 가까워지고 있다고 본다. 코드를 쓰는 일만이 아니라 코드를 소유하고, 만들려는 아키텍처를 이해하고, 그 기능이 왜 필요한지 파악하는 일이 중심이 된다는 것이다. 비유로는 컴파일 단계를 든다. TypeScript나 JavaScript를 쓰면서 생성되는 기계어에 집중하지 않듯, 코드 문법 자체보다 한 층 위인 아키텍처와 기능과 한계를 이해하는 쪽으로 초점이 옮겨 간다. 다만 훅과 permissions와 CLAUDE.md로 Claude가 일할 환경을 갖추는 일에는 여전히 기술적 전문성과 판단력, 그리고 적극성이 필요하다고 덧붙인다.

YK Sugi의 관점은 도구론이다. 화가가 일반 붓 대신 자동 전동 붓을 쓰는 상황에 가깝고, 결과물에 대한 책임은 여전히 사용자에게 있다는 것이다. AI가 나쁜 코드를 대량 생산한다는 비판에 대해서는 그러면 만들어 내지 않으면 된다고 답한다. 10만 줄을 생성했다고 10만 줄을 커밋할 필요는 없고 옳다고 판단한 부분만 커밋하면 된다는 것이다. 일회성 프로젝트는 코드를 확인하지 않아도 되지만, 보안이 중요한 프로덕션 코드베이스라면 draft PR을 만들고 사람이나 AI가 리뷰하도록 하라는 기준을 제시한다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- dynamic workflow의 첫 실행은 결정론적이지 않다. Claude가 그때그때 JavaScript 파일을 생성하기 때문이다. 결정론이 확보되는 시점은 workflow를 저장해 슬래시 커맨드로 재실행할 때부터다.
- Fable 5는 모델이 커서 응답이 느리다. 데모에서도 대기 시간을 감당하기 위해 미리 완료한 탭을 준비해 두었다.
- 스킬의 `disable_model_invocation`과 `user_invocable`은 서로를 부정하는 방향의 키 두 개다. Lydia Haley는 하나로 합쳐졌어야 한다고 인정하고 변경 가능성을 언급했지만 시점은 밝히지 않았다.
- auto mode는 Google Cloud Agent Platform에서 기본 비활성이라 환경변수 설정과 재시작이 필요하다.
- `/permissions`로 규칙을 추가하려면 어떤 tool이 있는지와 permission 표기법을 사용자가 알아야 한다.
- 강좌 전체에 정량 지표가 없다. 리뷰 비중 90 대 10, 1만 달러 절감 같은 수치는 모두 출연자의 경험 진술이며 측정 방법이 제시되지 않는다.
- transcript가 자동 자막이라 고유명사 표기가 여러 곳에서 어긋난다. 1절의 판정 표로 정리했으나 "Samita", "Daft", "mutating ob" 세 표기는 확정하지 못했다.

## 6. 관련 연구 (Related Work)

- YK Sugi의 Claude Code tips 저장소. 커뮤니티 자료로 스타 8,000개를 넘겼고 팁 번호가 최소 38번까지 있다.
- Claude Code 공식 문서. tool schemas 전량, permissions, 스킬 관련 문서가 강의 중에 언급된다.
- Claude Design. 프롬프트로 프레젠테이션과 슬라이드, 웹사이트를 만드는 research preview 도구다.
- Claude co-work. 비개발 업무용 harness이며 내부적으로 Claude Code 런타임을 쓴다.
- Google Cloud Agent Platform과 Vertex AI. 강좌의 실행 환경이자 후속 콘텐츠 주제로 ADK 2.0이 예고된다.

## 7. 용어집 (Glossary)

| 용어 | 설명 |
|---|---|
| auto mode | tool call 사이마다 classifier를 실행해 위험한 호출만 사용자에게 묻는 permission 모드. 환경변수 `CLAUDE_CODE_ENABLE_AUTO_MODE`로 활성화한다 |
| permission fatigue | 모든 행동을 묻는 방식이 반복되면서 사용자가 내용을 읽지 않고 승인하게 되는 현상 |
| dynamic workflow | Claude Code가 생성한 JavaScript 파일로 서브에이전트 실행을 규정하는 기능. 저장 후 슬래시 커맨드로 재실행하면 같은 구성이 반복된다 |
| intent-driven development | 어떻게 만들지가 아니라 무엇을 만들지를 정확히 파악하고 표현하는 개발 방식. YK Sugi가 강좌에서 쓰는 용어다 |
| Fable 5 | 강좌 데모에 쓰인 Anthropic의 대형 모델. Vertex AI에서 접근할 수 있고 큰 모델이라 응답이 느리다 |
| Claude Design | 프롬프트로 디자인과 슬라이드, 웹사이트를 만드는 research preview 도구. 산출물이 HTML이다 |
| Claude co-work | 이메일과 캘린더 같은 비개발 업무를 위한 harness. Claude Code 런타임 위에서 동작한다 |
| claudify | 일상 업무 중 Claude에 맡길 수 있는 부분을 찾아 자동화한다는 뜻으로 Lydia Haley가 쓴 조어 |
