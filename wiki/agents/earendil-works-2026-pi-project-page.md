---
title: "Pi"
type: article
year: 2026
category: agents
raw_path: raw/articles/earendil-works-2026-pi-project-page.md
raw_filename: "earendil-works-2026-pi-project-page.md"
source_collection: external
source: earendil-works-2026-pi-project-page.md
author: "Earendil Works"
url: "https://pi.dev/"
publisher: "pi.dev"
tags: [coding-agent, harness, extensions, context-engineering]
figures:
  - id: fig01
    file: assets/earendil-works-2026-pi-project-page/fig01.png
    raw: raw/articles/earendil-works-2026-pi-project-page-figures/fig01.png
    caption: "Pi 터미널 안에서 Doom extension이 게임 화면을 렌더링하는 동안 에이전트가 작업을 계속하는 장면. 하단 footer에 토큰 사용량, 비용, context 사용률, provider와 모델이 표시된다"
    strategy: fetched
    curated: true
---

## 요약

pi.dev는 터미널 코딩 에이전트 Pi의 공식 홈페이지다. 페이지는 Pi를 "minimal agent harness"로 규정하고, 사용자가 작업 방식을 도구에 맞추는 대신 도구를 작업 방식에 맞춰 고치라고 권한다. harness는 모델을 감싸 도구, 검증, 상태를 제공하는 실행 환경을 뜻한다.

페이지는 데모 애니메이션과 짧은 설명을 번갈아 배치한 제품 소개 형식이며, 일곱 개 기능 절로 구성된다. 자기 수정, provider 15곳 이상, tree 구조 세션, context engineering, steering, 네 가지 모드, primitive 중심 확장이다. 패키지 구조, compaction 알고리즘, 보안 모델 같은 내부 세부는 저장소 페이지 [[agents/earendil-works-pi]]가 다룬다.

## 배경

대부분의 코딩 에이전트는 서브에이전트, plan mode, 권한 확인 같은 기능을 제품에 내장해 배포한다. Pi는 강력한 기본값을 제공하되 이런 기능은 의도적으로 뺐다고 밝힌다. 필요하면 Pi에게 직접 만들게 하거나, 원하는 방식으로 구현한 package를 설치하라는 것이 페이지의 일관된 답이다.

이 철학은 페이지 첫 화면에서부터 드러난다. 첫 데모는 터미널에서 `pi`를 실행하는 장면이고, 이어지는 데모는 Ben Vinegar의 서드파티 extension `@termdraw/pi`로 터미널에 그림을 그리는 "더 많이 커스터마이즈한 Pi"다. 기본 상태와 확장한 상태를 나란히 보여 주어, 확장이 예외적 사용이 아니라 기본 사용 방식이라는 점을 강조한다.

## 핵심 개념

extension은 Pi 프로세스에 로드되는 TypeScript 모듈로, tool, 커맨드, 단축키, 이벤트, 전체 터미널 UI에 접근한다. 페이지가 "다른 에이전트가 내장하는 기능"이라고 부르는 것은 Pi에서 모두 extension으로 구현한다.

primitive는 더 작게 나누지 않고 조합의 재료로 쓰는 기본 구성 요소를 말한다. 페이지의 절 제목 "Primitives, not features"는 완성된 기능 대신 기능을 만들 재료를 제공한다는 뜻이다.

context engineering은 유한한 context window에 넣을 정보를 고르고 관리하는 설계를 말한다. 페이지는 Pi의 최소 system prompt와 확장성 덕분에 사용자가 실제로 이 설계를 할 수 있다고 주장한다.

Pi package는 extension, 스킬, prompt template, theme을 묶어 npm이나 git으로 공유하는 배포 단위다.

## 방법

### Pi를 쓰는 이유

페이지는 Pi의 커스터마이즈 수단으로 네 가지를 든다.

| 수단 | 역할 |
|---|---|
| extension | 실행 가능한 tool, 커맨드, 이벤트 처리, UI 추가 |
| 스킬 | 작업별 지시문과 보조 파일 |
| prompt template | 재사용 프롬프트 |
| theme | 터미널 색상 |

이것들을 Pi package로 묶어 npm이나 git으로 공유할 수 있다. 실행 모드는 interactive, print/JSON, RPC, SDK 네 가지이며, 실제 통합 사례로 OpenClaw를 든다.

### harness를 바꾸고 워크플로는 유지

"Change the harness, not your workflow" 절은 Pi가 봉인된 제품이 아니라고 선언한다. 커맨드, tool, provider, 워크플로, UI 조정이 필요하면 Pi에게 만들라고 요청하면 되고, Pi가 그 자리에서 스스로를 수정한다. 수정이 끝나면 `/reload`로 다시 로드해 작업을 이어 간다. 이렇게 만든 것이 다른 사람에게도 유용하면 공유하라고 권한다.

이 절의 데모 제목은 "Build a custom workflow extension"이다. 즉 자기 수정의 결과물은 대개 extension이며, 사용자는 TypeScript를 직접 쓰지 않고도 Pi를 통해 extension을 얻는다.

### provider와 모델

"15+ providers, hundreds of models" 절은 지원 provider를 나열한다. provider는 모델 API를 제공하는 회사나 서비스 단위를 말한다.

- 모델 개발사: Anthropic, OpenAI, Google, Mistral, xAI, MiniMax
- 클라우드: Azure, Bedrock
- 추론 서비스: Groq, Cerebras, NVIDIA, Hugging Face
- router와 로컬: OpenRouter, Ollama
- 구독형: Kimi For Coding

인증은 API 키나 OAuth로 한다. 모델 조작 방법은 다음과 같다.

| 동작 | 방법 |
|---|---|
| 세션 중 모델 전환 | `/model` 또는 Ctrl+L |
| 즐겨찾기 모델 순환 | Ctrl+P |
| custom provider와 모델 추가 | `models.json` 또는 extension |

세션 도중 모델을 바꿀 수 있다는 점은 데모 제목 "Switch models mid-session"으로도 강조된다.

### tree 구조의 공유 가능한 이력

세션은 tree로 저장되며 모든 branch가 파일 하나에 들어 있다. `/tree`로 이전 어느 지점으로든 이동해 거기서 이어 갈 수 있으므로, 다른 접근을 시도해도 원래 경로를 잃지 않는다. tree 화면에서는 메시지 타입으로 필터링하고, entry에 label을 달아 bookmark로 쓸 수 있다.

공유 수단은 두 가지다. `/export`는 HTML로 저장하고, `/share`는 GitHub gist에 올려 세션을 렌더링하는 공유 URL을 돌려준다. 페이지는 예시 세션 링크도 함께 건다.

### context engineering

페이지는 context window에 들어가는 내용을 통제하는 수단을 여섯 가지로 정리한다.

| 수단 | 설명 |
|---|---|
| AGENTS.md | `~/.pi/agent/`, 상위 디렉토리, 현재 디렉토리에서 시작 시 로드하는 프로젝트 지시문 |
| SYSTEM.md | 프로젝트별로 기본 system prompt를 교체하거나 덧붙인다 |
| compaction | context 한계에 가까워지면 오래된 메시지를 자동 요약한다 |
| 스킬 | 지시문과 tool을 담은 능력 패키지. 필요할 때만 로드한다 |
| prompt template | Markdown 파일로 된 재사용 프롬프트. `/name`으로 확장한다 |
| dynamic context | extension이 매 turn 전에 메시지를 주입하고 이력을 필터링한다 |

compaction은 길어진 대화 이력을 요약으로 접어 context 한계 안에서 세션을 이어가는 처리다. 페이지는 compaction 방식 자체도 extension으로 교체할 수 있다고 밝히며, 주제 기반 compaction, 코드를 인지하는 요약, 다른 요약 모델 사용을 예로 든다.

스킬 설명에는 progressive disclosure라는 표현이 붙는다. progressive disclosure는 필요한 시점에만 정보를 단계적으로 노출하는 설계다. 페이지는 Pi의 스킬 로드가 prompt cache를 깨지 않는 방식이라고 덧붙인다. 시작 시 스킬 이름과 설명만 넣고 전문은 나중에 읽으므로, system prompt 앞부분이 바뀌지 않아 캐시가 유지된다는 의미다.

dynamic context는 가장 강한 수단이다. extension이 매 turn 전에 메시지를 주입하고, 이력을 걸러 내고, RAG를 구현하거나 장기 메모리를 만들 수 있다.

### steering과 follow-up

에이전트가 일하는 도중에도 메시지를 제출할 수 있으며, 키에 따라 전달 시점이 다르다.

| 키 | 메시지 종류 | 전달 시점 |
|---|---|---|
| Enter | steering | 현재 tool이 끝난 뒤 전달되고, 남은 tool 실행을 중단시킨다 |
| Alt+Enter | follow-up | 에이전트가 작업을 모두 마칠 때까지 기다린다 |

즉 방향을 바로잡을 때는 steering을, 다음 할 일을 미리 넣어 둘 때는 follow-up을 쓴다.

### 네 가지 모드

| 모드 | 설명 |
|---|---|
| Interactive | 전체 TUI 경험 |
| Print/JSON | `pi -p "query"`로 스크립트에서 실행하고, `--mode json`으로 이벤트 스트림을 받는다 |
| RPC | Node 외 환경과 통합하기 위한 stdin/stdout JSON 프로토콜 |
| SDK | 애플리케이션에 Pi를 내장한다. 실제 사례로 OpenClaw |

이 절의 데모는 "Generate a shell script in print mode"로, print 모드가 일회성 스크립트 작업에 쓰인다는 점을 보여 준다.

### 기능이 아니라 primitive

마지막 절은 다른 에이전트가 내장하는 기능을 사용자가 직접 만들 수 있다고 주장하고, 저장소의 extension 예제로 연결한다.

| 분류 | 예 |
|---|---|
| 작업 구조 | 서브에이전트, plan mode |
| 안전 장치 | 권한 게이트, 경로 보호, 샌드박스 |
| 실행 위치 | SSH 실행 |
| 통합 | MCP 통합 (내장 MCP와 병행 지원) |
| UI | custom 편집기, 상태 표시줄, overlay |

MCP는 모델이 외부 도구와 데이터 원천에 표준화된 방식으로 접근하게 하는 프로토콜이다. 직접 만들고 싶지 않으면 Pi에게 만들게 하거나 package를 설치하면 되고, 저장소에는 50개 이상의 extension 예제가 있다. 설치 예는 다음 두 줄이다.

```
$ pi install npm:@foo/pi-tools
$ pi install git:github.com/badlogic/pi-doom
```

페이지 끝은 "and it can play doom"이라는 문구와 Doom extension 스크린샷이다.

![[assets/earendil-works-2026-pi-project-page/fig01.png]]
*Fig. 01: Pi 터미널 안에서 Doom extension이 게임 화면을 렌더링하는 동안 에이전트가 작업을 계속하는 장면 (pi.dev)*

이 스크린샷은 extension의 표현력을 보여 주는 예다. 대화 영역 아래에 게임 화면이 렌더링되고, 그 아래에 조작 키 안내가 붙는다. 맨 아래 footer에는 작업 디렉토리(`~/workspaces/pi-mono`)와 브랜치, 입출력 토큰 수, 비용($0.011, 구독), context 사용률(27만 2천 토큰 중 1.7%), provider(openai-codex)와 모델(gpt-5.2-codex), thinking 수준(medium)이 표시된다.

## 결과

페이지는 벤치마크를 제시하지 않는다. 정량 표현은 두 가지뿐이다.

| 표현 | 의미 |
|---|---|
| 15+ providers, hundreds of models | 지원 provider 수와 사용 가능한 모델 규모 |
| 50+ examples | 저장소에 있는 extension 예제 수 |

## 한계

- 제품 소개 페이지라 보안 모델을 다루지 않는다. 저장소 문서에 따르면 Pi에는 내장 권한 시스템이 없고 project trust는 tool call을 제한하지 않는다. 세부는 [[agents/earendil-works-pi]]의 보안 모델 절에 있다.
- 데모가 애니메이션이어서 수집본에는 데모 제목과 터미널 프롬프트 조각만 텍스트로 남았다.
- 페이지가 링크한 문서 경로(`packages/coding-agent#extensions` 등)는 수집 시점 저장소 구조와 일부 맞지 않는다. coding-agent README가 짧아지고 세부 설명이 `docs/` 아래로 옮겨졌기 때문이다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| minimal agent harness | 기본 기능만 갖추고 나머지는 사용자가 확장으로 만드는 harness라는 Pi의 자기 규정 |
| `/reload` | Pi가 스스로를 수정한 뒤 extension과 리소스를 다시 로드하는 커맨드 |
| dynamic context | extension이 turn마다 context를 주입하거나 걸러 내는 방식 |
| Pi package gallery | `pi-package` keyword를 단 npm 패키지를 모은 pi.dev/packages 페이지 |

## 관련 페이지

- [[agents/earendil-works-pi]]: 같은 프로젝트의 저장소. 패키지 구성, 세션 형식, compaction 알고리즘, 보안 모델을 문서 수준에서 다룬다.
- [[agents/agentskills-agentskills]]: Pi가 구현하는 Agent Skills 명세.
- [[agents/magnitudedev-magnitude]]: Pi에서 `/model`로 바로 전환해 쓰는 로컬 모델 서버.
- [[overviews/agent-harness-engineering-overview]]: harness 설계 자료를 묶은 overview.
