---
title: "BrowserCode (browser-use): The browser-native agent"
type: repo
year: 2026
category: agents
source: browser-use-browsercode.md
raw_path: raw/repos/browser-use-browsercode.md
raw_filename: "browser-use-browsercode.md"
source_collection: external
org: "browser-use"
repo: "browsercode"
url: "https://github.com/browser-use/browsercode"
license: "MIT"
tags: [browser-agent, coding-agent, cdp, opencode-fork, browser-harness, tui, cloud-browser, bu-bench, repo, oss]
figures:
  - id: fig01
    label: "Best BrowserCode models on BU Bench"
    kind: figure
    file: assets/browser-use-browsercode/fig01.png
    raw: https://raw.githubusercontent.com/browser-use/browsercode/main/static/browsercode_best_models_light.png
    caption: "BU Bench 기준 추천 모델 세 종의 항목별 비교"
    strategy: manual
    curated: true
  - id: fig02
    label: "Performance of LLMs with BrowserCode on BU Bench V1"
    kind: figure
    file: assets/browser-use-browsercode/fig02.png
    raw: https://raw.githubusercontent.com/browser-use/browsercode/main/static/browser_harness_by_model_light.png
    caption: "BU Bench V1에서 모델 18종의 점수와 입력 단가"
    strategy: manual
    curated: true
---

## 요약

BrowserCode는 browser-use가 [OpenCode](https://github.com/anomalyco/opencode)를 fork해 만든 코딩 에이전트다. README는 스스로를 "제약 없는 CDP로 실제 브라우저를 구동하는 간결한 코딩 에이전트"라고 소개한다.

설계의 특징은 브라우저 도구의 개수에 있다. 클릭이나 입력, 스크롤을 각각 도구로 노출하는 대신 `browser_execute(code)` 하나만 두고, 에이전트가 그때그때 JavaScript를 작성해 Chrome DevTools Protocol로 브라우저를 직접 제어한다.

harness는 모델을 감싸 도구와 검증, 상태를 제공하는 실행 환경을 말한다. BrowserCode의 harness는 그 표면적을 브라우저 도구 하나로 줄인 쪽에 서 있고, 줄어든 표면적만큼의 판단을 모델의 코드 작성 능력에 맡긴다.

배포 형태는 단일 CLI다. `bcode` 실행 파일 하나가 TUI와 headless 실행을 모두 담당하고, 라이선스는 MIT다.

## 설계 배경

README의 철학 절은 브라우저를 다루는 능력과 코드를 쓰는 능력이 깊이 연결되어 있다는 전제에서 출발한다. 브라우저 조작을 코드 작성 문제로 바꿔놓으면 코드를 잘 쓰는 모델이 곧 브라우저를 잘 다루는 모델이 된다는 뜻이다.

이 전제에서 나온 방침이 "Minimal abstractions. Maximal power to the agent"다. 저장소는 브라우저 상호작용을 코딩 문제로 전환했다고 명시하며, 절 제목 자체를 "do more with less"로 달았다.

대비되는 접근은 화면을 정형화해 모델에 전달하는 계열이다. accessibility tree나 set-of-mark는 페이지를 요소 목록이나 번호가 붙은 마커로 바꿔 모델에 넘기고, 모델은 그 목록에서 대상을 골라 좌표나 인덱스로 지시한다.

이 계열의 병목은 grounding이다. grounding은 모델 출력을 외부 근거나 실제 화면에 붙들어 매는 일을 말한다. [[evaluations/xie-2024-osworld-benchmarking-multimodal-agents-for]] 페이지는 OSWorld 실패 표본 550건 가운데 75% 이상이 마우스 클릭 좌표 부정확이었다고 기록한다.

BrowserCode는 좌표를 고르는 단계 자체를 없애는 방향을 택한다. 브라우저의 프로그래밍 인터페이스를 그대로 열어두면 모델은 좌표가 아니라 셀렉터와 코드로 대상을 지정한다.

## 핵심 개념

CDP는 Chrome DevTools Protocol의 약어로, Chrome을 외부에서 조작하고 계측하는 프로토콜이다. BrowserCode는 이 프로토콜을 자체 도구 API로 감싸지 않고 그대로 열어두며, README는 그 상태를 "unconstrained"라고 표현한다.

primitive는 시스템이 제공하는 더 나눌 수 없는 기본 동작 단위를 뜻한다. 아키텍처 절은 BrowserCode가 OpenCode에 더한 것이 브라우저 primitive 하나뿐이라고 명시한다.

Browser Harness는 browser-use의 브라우저 자동화 라이브러리다. BrowserCode는 이 라이브러리를 의존성으로 설치하는 대신 TypeScript 포팅본을 저장소 안에 vendoring해 넣었다.

`.bcode/agent-workspace/`는 에이전트가 작성한 재사용 가능한 브라우저 스크립트가 쌓이는 디렉토리다. README 상단은 에이전트가 사이트마다 런타임에 적응하면서 나중에 다시 쓸 스크립트를 남긴다고 적는다.

BU Bench는 browser-use의 자체 브라우저 에이전트 벤치마크다. README가 모델을 추천하는 근거가 이 벤치마크 결과이고, 저장소에 들어 있는 차트 이미지 두 장이 그 수치를 담는다.

## 아키텍처

### 단일 브라우저 primitive

BrowserCode의 구조는 세 겹으로 정리된다. OpenCode fork가 코딩 에이전트의 본체를 담당하고, vendoring한 Browser Harness 포팅본이 브라우저 자동화를 담당하며, 그 위에 도구 하나가 추가된다.

추가된 도구가 하는 일은 README에 네 줄로 적혀 있다.

```text
browser_execute(code)
  -> runs JavaScript in-process
  -> talks to Chrome through the DevTools Protocol
  -> keeps the browser session alive across calls
  -> returns logs, values, and screenshots to the agent
```

| README 줄 | 뜻 |
|---|---|
| runs JavaScript in-process | 전달된 JavaScript를 별도 프로세스를 띄우지 않고 같은 프로세스 안에서 실행한다 |
| talks to Chrome through the DevTools Protocol | 실행 통로가 CDP다. 브라우저 자동화 라이브러리를 한 겹 더 거치지 않는다 |
| keeps the browser session alive across calls | 호출이 끝나도 브라우저 세션이 유지된다 |
| returns logs, values, and screenshots to the agent | 반환값이 로그와 값, 스크린샷 세 가지다 |

세 번째 줄이 이 설계의 핵심이다. 호출 사이에 브라우저 세션이 살아 있으므로 에이전트는 한 번에 완결된 스크립트를 작성할 필요가 없다.

따라서 실제 진행은 여러 번의 짧은 호출로 나뉜다. 페이지를 열고, DOM을 확인하고, 셀렉터가 틀렸으면 고쳐 다시 실행하는 순서가 가능해진다.

반환값이 세 가지라는 점도 이 반복을 뒷받침한다. 로그와 값은 코드 실행 결과를 알려주고 스크린샷은 화면 상태를 알려주므로, 에이전트는 두 종류의 근거를 함께 보고 다음 코드를 정한다.

### 상류 프로젝트와의 분업

이 저장소는 자기 범위를 좁게 정의하고 나머지를 상류로 넘긴다. Contributing 절은 대부분의 상류 기여가 두 프로젝트 가운데 하나로 가야 한다고 안내한다.

| 프로젝트 | 담당 | BrowserCode와의 관계 |
|---|---|---|
| [anomalyco/opencode](https://github.com/anomalyco/opencode) | 코딩 에이전트 본체 | fork 대상. 소스 실행 경로가 `packages/opencode`인 데서 관계가 드러난다 |
| [browser-use/browser-harness](https://github.com/browser-use/browser-harness) | 브라우저 자동화 | TypeScript 포팅본을 vendoring |
| `browser-use/browsercode` | 두 프로젝트의 결합과 `browser_execute` | 저장소가 직접 더한 부분은 브라우저 primitive 하나 |

제휴 관계에 관한 문장은 두 곳에 나온다. 아키텍처 절과 README 본문 모두 BrowserCode가 OpenCode 팀이 만든 것이 아니며 어떤 형태로도 OpenCode와 제휴 관계가 아니라고 명시한다.

### 스크립트 재사용 워크스페이스

런타임 적응만으로는 같은 작업을 반복할 때마다 같은 탐색을 다시 하게 된다. BrowserCode는 에이전트가 작성한 브라우저 스크립트를 `.bcode/agent-workspace/`에 남겨 이 반복을 줄인다.

README가 첫 문단에서 "사이트마다 런타임에 적응하고 나중에 재사용할 스크립트를 쓴다"고 적은 문장이 이 디렉토리의 존재 이유다. 적응의 결과가 세션이 끝나면 사라지지 않고 파일로 남는다.

## 실행 방법

### 설치와 실행 경로

설치는 원라인 스크립트 하나다. README는 bash를 지원하는 터미널에서 실행하라는 조건을 붙인다.

```sh
curl -fsSL https://bcode.sh/install | bash
```

실행 경로는 네 가지로 갈린다.

| 경로 | 명령 | 용도 |
|---|---|---|
| TUI | `bcode` | 대화형 터미널 화면을 띄운다 |
| headless | `bcode run "..."` | 과제 문장을 인자로 받아 화면 없이 실행한다 |
| 호스팅 | `POST https://api.browser-use.com/api/v4/runs` | Browser Use Cloud에서 에이전트를 실행한다 |
| 소스 | `bun install` 후 `bun run --cwd packages/opencode dev` | 저장소를 clone해 개발 모드로 실행한다 |

README가 든 headless 예시는 실제 웹 과제 형태를 그대로 보여준다. `bcode run "On Google flights return all flight details from New York to SF tomorrow"`처럼 목적지와 조건을 문장으로 적는다.

호스팅 실행은 API 키를 헤더에 담고 과제를 JSON 본문으로 넘기는 형태다.

```sh
curl -X POST https://api.browser-use.com/api/v4/runs \
  -H "X-Browser-Use-API-Key: $BROWSER_USE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task": "Your task"}'
```

### 모델 연결

모델 커버리지는 상류에서 상속된다. BrowserCode는 API 키로 접근 가능한 모든 모델을 지원하고, 여기에 OpenCode가 지원하는 provider 전부가 더해진다.

연결 방법은 두 가지다. TUI 안에서 `/connect`를 실행하거나 provider API 키를 환경 변수로 설정한다.

### 브라우저 연결

브라우저 연결 방식은 사용자가 지정하지 않는다. README는 "에이전트가 알아서 연결한다. 방법을 알고 있다"고 적으며, 프롬프트 문장에서 필요한 연결 경로를 에이전트가 판단하게 둔다.

| 프롬프트 예시 | 에이전트가 잡는 경로 |
|---|---|
| "Connect to my current tab on amazon.com and find deals for 64GB DDR5 RAM, return URLs" | 사용자의 실제 브라우저를 인수해 제어한다 |
| "Make a new browser profile and QA test http://localhost:3000, fix bugs and open a PR" | 자체 브라우저 프로필을 만들어 로컬에서 작업한다 |
| "Open a remote browser and extract every item sold on mcdonalds.com in SF" | Browser Use Cloud 브라우저를 제어하고 사용자에게 관전 링크를 준다 |

세 예시가 각각 다른 지점을 보여준다. 첫째는 로그인된 세션을 그대로 쓰는 경로, 둘째는 격리된 프로필에서 QA와 PR 생성까지 이어가는 경로, 셋째는 원격 실행에 관전 링크가 붙는 경로다.

### 클라우드 브라우저와 환경 변수

Browser Use Cloud의 무료 조건은 개수 제한이 아니라 동시 실행 제한이다. 브라우저 자체는 무제한이고 동시 세션이 3개로 묶인다.

| 항목 | 내용 |
|---|---|
| 제공량 | 무제한 무료 브라우저 |
| 제한 | 동시 세션 3개 |
| 부가 기능 | stealth, captcha 해결, 프록시 |
| 상향 조정 | [cloud.browser-use.com](https://cloud.browser-use.com)에서 처리 |

가입 절차도 에이전트에게 맡길 수 있다. README는 에이전트가 완전히 자율적으로 가입할 수 있으므로 그렇게 지시하면 된다고 적는다.

환경 변수는 세 종류가 등장한다.

| 환경 변수 | 역할 |
|---|---|
| `BROWSER_USE_API_KEY` | Browser Use Cloud 브라우저와 호스팅 실행에 쓰는 키 |
| provider별 API 키 | 모델 연결. `/connect` 대신 환경 변수로 설정할 때 쓴다 |
| `DO_NOT_TRACK=1` | 익명 사용 트레이스 전송을 끈다 |

## 결과

### 추천 모델 세 종

README는 BU Bench 결과를 근거로 용도별 모델 세 종을 추천한다. 최고 성능은 `claude-opus-4-8`, 최고 open-weight는 `kimi-k3`, 가성비는 reasoning effort를 `xhigh`로 올린 `gpt-5.6-luna`다.

![[assets/browser-use-browsercode/fig01.png]]
*Figure 1: BU Bench 추천 모델 세 종을 score, speed, price, 가중치 공개 여부, 구독 허용 다섯 항목으로 비교한 레이더 차트 (browser-use README)*

| 모델 | Score | Speed (task/hr) | Price (1달러당 task) | 가중치 | 구독 |
|---|---|---|---|---|---|
| Opus 4.8 (best performance) | 89.5% | 25.8 | 1.1 | closed | Claude Code 구독 차단 |
| Kimi K3 (best open-weight) | 86.0% | 6.3 | 1.3 | open | Kimi Coding 구독 허용 |
| Luna xhigh (best value) | 82.0% | 25.6 | 26.6 | closed | Codex 구독 허용 |

Luna의 가성비는 달러당 처리 task 수에서 나온다. 26.6 대 1.1이면 Opus의 24배이고, score 차이 7.5%p를 감수할 만한지가 선택의 기준이 된다.

Kimi K3의 제약은 속도다. 점수는 86.0%로 높은 편이지만 시간당 6.3 task로 다른 두 모델의 4분의 1 속도다.

구독 허용 항목은 비용 구조에 관한 정보다. Opus 4.8은 Claude Code 구독으로 쓸 수 없어 API 과금으로만 접근하고, Kimi K3와 Luna는 각각 Kimi Coding과 Codex 구독을 허용한다.

### 모델 18종 점수 분포

두 번째 차트는 범위를 넓혀 18개 모델을 score 순으로 세운다. 막대 안 기호가 입력 토큰 백만당 단가, 파란 점선 테두리가 open-weight 표시다.

![[assets/browser-use-browsercode/fig02.png]]
*Figure 2: BU Bench V1에서 모델 18종의 점수. 막대 안 기호는 입력 토큰 백만당 단가, 파란 점선 테두리는 open-weight (browser-use README)*

| 기호 | 입력 토큰 백만당 단가 |
|---|---|
| `$` | 1달러 미만 |
| `$$` | 1달러 이상 3달러 미만 |
| `$$$` | 3달러 이상 |

| 모델 | Score | 단가 | open-weight |
|---|---|---|---|
| claude opus-4-8 | 89.5% | `$$$` | |
| claude fable-5 | 87.0% | `$$$` | |
| claude opus-5 | 87.0% | `$$$` | |
| grok 4.5 | 86.3% | `$$` | |
| kimi k3 | 86.0% | `$$$` | ● |
| glm 5.2 | 84.0% | `$$` | ● |
| gpt 5.6-sol | 84.0% | `$$$` | |
| gemini 3.1-pro | 82.4% | `$$` | |
| gpt-5.6-luna (xhigh) | 82.0% | `$$` | |
| gpt 5.5 | 80.0% | `$$$` | |
| gemini 3.6-flash | 79.0% | `$$` | |
| qwen 3.8max | 79.0% | `$$` | ● |
| deepseek v4-flash-0731 | 76.0% | `$` | ● |
| minimax m3 | 74.0% | `$` | ● |
| gpt-5.6-luna (default) | 72.4% | `$$` | |
| gpt 5.6-terra | 72.0% | `$$` | |
| gemini 3-flash | 66.2% | `$` | |
| gemini 3.5-flash-lite | 61.0% | `$` | |

상위권은 좁게 밀집한다. 89.5%에서 84.0% 사이에 일곱 모델이 들어가므로 최상위와 7위의 차이가 5.5%p에 그친다.

open-weight 모델은 다섯 종이고 86.0%부터 74.0%까지 분포한다. 최상위권을 차지하지는 못하지만 상위권 안에 함께 놓인다.

같은 모델이 설정만 달라 두 번 등장하는 사례가 하나 있다. `gpt-5.6-luna`는 reasoning effort가 default일 때 72.4%, xhigh일 때 82.0%로 9.6%p 차이가 난다.

이 차이는 harness가 결과를 전부 결정하지는 않는다는 뜻이다. 같은 BrowserCode 위에서도 모델에 주는 추론 예산에 따라 성적이 10%p 가까이 움직인다.

단가와 점수의 관계는 단순한 비례가 아니다. `$` 구간에도 76.0%인 deepseek v4-flash-0731이 있고 `$$$` 구간에도 80.0%인 gpt 5.5가 있어, 가격대별로 점수 범위가 겹친다.

### 같은 조직 본체와의 대조

같은 벤더의 기존 스택과 견줄 여지가 있다. [[agents/browser-use-browser-use]] 페이지는 그 저장소의 BU Bench V1 차트가 Browser Use Cloud v4와 Opus 4.8 조합을 85.0%, OSS 라이브러리 최고를 claude opus-4-7의 74.0%로 기록한다고 적는다.

같은 Opus 4.8이 BrowserCode 차트에서는 89.5%다. 다만 두 차트가 같은 시점의 같은 실행에서 나왔다는 보장이 없고 어느 쪽도 실행 로그를 공개하지 않으므로, 4.5%p라는 차이를 그대로 받아들일 근거는 약하다.

확인되는 사실은 배치의 방향이다. 벤더가 자기 제품 라인 안에서 새 harness를 기존 라이브러리보다 높은 자리에 놓았다.

## 한계

- BU Bench는 browser-use가 만든 벤치마크이고 우위 주장의 근거도 여기뿐이다. OSWorld나 WebArena 점수가 없어 다른 계열과 직접 비교가 안 되고, task 구성과 채점 방식, V1이라는 버전 표기의 의미도 이 저장소 안에서는 설명되지 않는다. [[agents/browser-use-browser-use]] 페이지는 그 저장소 README가 BU Bench를 실제 웹 과제 100건으로 소개하고 코드를 `browser-use/benchmark`에 공개했다고 기록하지만, BrowserCode 저장소 자체는 그 연결을 밝히지 않는다.
- "붙여본 모든 브라우저 에이전트를 능가한다"는 문장에 비교 대상도 상대 점수도 붙어 있지 않다. 차트 두 장은 모델별 비교일 뿐 harness끼리의 비교가 아니다.
- 제약 없는 CDP는 에이전트가 작성한 JavaScript를 사용자의 실제 브라우저 세션에서 그대로 실행한다는 뜻이다. "현재 탭에 연결해라"는 사용법은 로그인된 세션 전체를 모델에 노출하는데 README에 가드레일 논의가 없다. 가드레일은 에이전트의 행동 범위를 제한하는 안전 장치를 말한다.
- 설치가 `curl | bash`이고 텔레메트리가 기본 활성이다. 후자는 `DO_NOT_TRACK=1`로 끄지만 전자는 스크립트를 검증 없이 실행하는 방식 자체가 남는다.
- 저장소가 직접 밝히듯 대부분의 기여는 browser-harness나 opencode 상류로 가야 한다. OpenCode 팀과 무관하다고 명시했으므로 fork 유지보수 부담은 이 저장소가 진다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| CDP (Chrome DevTools Protocol) | Chrome을 외부에서 조작하고 계측하는 프로토콜. BrowserCode는 이 프로토콜을 감싸지 않고 그대로 쓴다 |
| `browser_execute(code)` | BrowserCode가 더한 단 하나의 브라우저 도구. JavaScript를 받아 실행하고 로그와 값, 스크린샷을 반환한다 |
| Browser Harness | browser-use의 브라우저 자동화 라이브러리. TypeScript 포팅본이 이 저장소에 vendoring되어 있다 |
| BU Bench | browser-use의 자체 브라우저 에이전트 벤치마크. README의 모델 추천 근거 |
| `.bcode/agent-workspace/` | 에이전트가 작성한 재사용 가능한 브라우저 스크립트가 쌓이는 디렉토리 |
| bcode | CLI 실행 파일 이름. 인자 없이 실행하면 TUI, `bcode run "..."`이면 headless |

## 관련 페이지

- [[agents/browser-use-browser-use]]: 같은 조직의 Python 라이브러리이자 이 조직 스택의 본체. 아키텍처와 설치, 스킬과 라이브러리 두 진입로는 그 페이지가 담당한다. 그 페이지에 따르면 고정된 agent loop를 기성품으로 제공하는 형태이고, 이 저장소는 코딩 에이전트에 브라우저 도구 하나를 더한 형태다
- [[evaluations/xie-2024-osworld-benchmarking-multimodal-agents-for]]: 실제 OS 위에서 computer-use agent를 재는 벤치마크. grounding이 병목이라는 결과가 BrowserCode의 좌표 대신 코드라는 선택과 맞닿는다
- [[agents/wang-2026-cua-gym-scaling-verifiable-training-environments]]: 같은 문제를 학습 데이터 쪽에서 다룬 연구. BrowserCode가 추론 시점의 harness로 푼다면 CUA-Gym은 환경과 task를 합성해 RLVR로 푼다
- [[evaluations/xlang-ai-osworld]]: OSWorld의 공식 구현체. 외부 벤치마크로 BrowserCode를 재보려 할 때의 출발점
- [[agents/stablyai-orca]]: OpenCode를 포함한 CLI 코딩 에이전트를 worktree 단위로 병렬 관리하는 오케스트레이터. 같은 상류 프로젝트를 반대편에서 다루는 사례
- [[overviews/glossary-agents]]: harness, 가드레일, grounding 등 이 페이지의 용어 표기 기준
