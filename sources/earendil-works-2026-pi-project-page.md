---
title: "Pi"
type: article
year: 2026
category: agents
raw_path: raw/articles/earendil-works-2026-pi-project-page.md
raw_filename: "earendil-works-2026-pi-project-page.md"
source_collection: external
author: "Earendil Works"
url: "https://pi.dev/"
publisher: "pi.dev"
fetched_at: "2026-10-02T08:33:13+0900"
extractor_tier: "chrome"
tags: [coding-agent, harness, extensions, context-engineering]
figures:
  - id: fig01
    file: assets/earendil-works-2026-pi-project-page/fig01.png
    raw: raw/articles/earendil-works-2026-pi-project-page-figures/fig01.png
    caption: "Pi 터미널 안에서 Doom extension이 게임 화면을 렌더링하는 동안 에이전트가 작업을 계속하는 장면. 하단 footer에 토큰 사용량, 비용, context 사용률, provider와 모델이 표시된다"
    strategy: fetched
    curated: true
  - id: fig02
    file: assets/earendil-works-2026-pi-project-page/page-full.png
    raw: raw/articles/earendil-works-2026-pi-project-page-figures/page-full.png
    caption: "pi.dev 홈 전체 페이지 스크린샷"
    strategy: screenshot
    curated: false
  - id: fig03
    file: assets/earendil-works-2026-pi-project-page/crop01.png
    raw: raw/articles/earendil-works-2026-pi-project-page-figures/crop01.png
    caption: "자동 크롭 결과로 빈 데모 창 일부만 잡혀 정보가 없다"
    strategy: crop
    curated: false
---

## 한 줄 요약 (One-line Summary)

pi.dev는 Pi 프로젝트의 공식 홈페이지로, Pi를 "minimal agent harness"로 규정하고 사용자가 워크플로를 harness에 맞추는 대신 harness를 워크플로에 맞춰 고치라는 설계 철학을 일곱 개 기능 절(자기 수정, provider 15곳 이상, tree 세션, context engineering, steering, 네 가지 모드, primitive 중심 확장)로 소개한다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| URL | https://pi.dev/ |
| 운영 | Earendil Works (저장소 earendil-works/pi). pi.dev 도메인은 exe.dev가 기증했다 (저장소 README) |
| 수집 | 2026년 10월 2일, `fetch_article.py` chrome tier, 본문 6,557자 |
| 형식 | 데모 애니메이션과 짧은 기능 설명이 번갈아 나오는 제품 소개 페이지. 각 절 앞에 "Pi - ..." 형태의 데모 제목이 붙는다 |
| 저장소 | [[agents/earendil-works-pi]] |

페이지 첫 화면은 mitsuhiko 사용자의 터미널(`~/Development/game-jam`, git main 브랜치)에서 `pi`를 입력하는 데모다. 이어서 Ben Vinegar의 서드파티 extension `@termdraw/pi`로 터미널에 그림을 그리는 "더 많이 커스터마이즈한 Pi" 데모를 보여 준다.

## 2. 주요 기여 (Key Contributions)

1. **최소 harness 선언.** Pi는 강력한 기본값을 제공하지만 서브에이전트와 plan mode 같은 기능은 일부러 빼고, 필요하면 Pi에게 만들게 하거나 package를 설치하라고 권한다.
2. **자기 수정 루프.** 커맨드, tool, provider, 워크플로, UI가 필요하면 Pi에게 직접 만들라고 요청하고, Pi가 스스로를 고친 뒤 `/reload`로 이어서 작업한다.
3. **context engineering 수단 공개.** 최소 system prompt와 확장성 덕분에 context window에 무엇을 넣고 어떻게 관리할지를 사용자가 통제한다고 주장하며, 수단 여섯 가지(AGENTS.md, SYSTEM.md, compaction, 스킬, prompt template, dynamic context)를 나열한다.
4. **primitive 우선 원칙.** 다른 에이전트가 내장하는 기능을 사용자가 TypeScript extension으로 직접 만들 수 있게 하고, 50개 이상의 extension 예제를 제공한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 Why Pi

Pi는 extension, 스킬, prompt template, theme으로 커스터마이즈하고 이를 Pi package로 묶어 npm이나 git으로 공유한다. 모드는 interactive, print/JSON, RPC, SDK 네 가지이며 실제 통합 사례로 OpenClaw를 든다.

### 3.2 harness를 바꾸고 워크플로는 유지

Pi는 "봉인된 제품"이 아니라고 선언한다. 필요한 기능을 Pi에게 요청하면 Pi가 그 자리에서 스스로를 수정하고, 사용자는 `/reload` 후 작업을 이어 간다. 다른 사람에게 유용하면 공유하라고 권한다.

### 3.3 provider와 모델

지원 provider로 Anthropic, OpenAI, Google, Azure, Bedrock, Mistral, Groq, Cerebras, xAI, Hugging Face, Kimi For Coding, MiniMax, NVIDIA, OpenRouter, Ollama 등을 들고, 인증은 API 키나 OAuth로 한다.

| 동작 | 방법 |
|---|---|
| 세션 중 모델 전환 | `/model` 또는 Ctrl+L |
| 즐겨찾기 모델 순환 | Ctrl+P |
| custom provider와 모델 추가 | `models.json` 또는 extension |

### 3.4 tree 구조의 공유 가능한 이력

세션은 tree로 저장되고 모든 branch가 파일 하나에 들어 있다. `/tree`로 이전 지점으로 이동해 이어 갈 수 있고, 메시지 타입으로 필터링하거나 entry에 bookmark label을 달 수 있다. `/export`는 HTML로 저장하고 `/share`는 GitHub gist에 올려 렌더링되는 공유 URL을 준다.

### 3.5 context engineering

context engineering은 유한한 context window에 넣을 정보를 고르고 관리하는 설계를 말한다. 페이지는 Pi의 수단을 다음처럼 정리한다.

| 수단 | 설명 |
|---|---|
| AGENTS.md | `~/.pi/agent/`, 상위 디렉토리, 현재 디렉토리에서 시작 시 로드하는 프로젝트 지시문 |
| SYSTEM.md | 프로젝트별로 기본 system prompt를 교체하거나 덧붙인다 |
| compaction | context 한계에 가까워지면 오래된 메시지를 자동 요약한다. extension으로 주제 기반 compaction, 코드 인지 요약, 다른 요약 모델 사용을 구현할 수 있다 |
| 스킬 | 지시문과 tool을 담은 능력 패키지로 필요할 때 로드한다. prompt cache를 깨지 않는 progressive disclosure라고 설명한다 |
| prompt template | Markdown 파일로 된 재사용 프롬프트. `/name`으로 확장한다 |
| dynamic context | extension이 매 turn 전에 메시지를 주입하고, 이력을 필터링하고, RAG를 구현하거나 장기 메모리를 만들 수 있다 |

### 3.6 steering과 follow-up

에이전트가 일하는 중에도 메시지를 제출할 수 있다. Enter는 steering 메시지를 보내며 현재 tool이 끝난 뒤 전달되고 남은 tool을 중단시킨다. Alt+Enter는 follow-up을 보내며 에이전트가 끝날 때까지 기다린다.

### 3.7 네 가지 모드

| 모드 | 설명 |
|---|---|
| Interactive | 전체 TUI 경험 |
| Print/JSON | `pi -p "query"`로 스크립트 실행, `--mode json`으로 이벤트 스트림 |
| RPC | Node 외 환경 통합을 위한 stdin/stdout JSON 프로토콜 |
| SDK | 애플리케이션에 Pi를 내장. 실제 예로 OpenClaw |

### 3.8 기능이 아니라 primitive

extension은 tool, 커맨드, 단축키, 이벤트, 전체 TUI에 접근하는 TypeScript 모듈이다. 페이지가 직접 만들 수 있는 예로 든 기능은 다음과 같다.

- 서브에이전트, plan mode
- 권한 게이트, 경로 보호
- SSH 실행, 샌드박스
- MCP 통합 (내장 MCP와 병행 지원)
- custom 편집기, 상태 표시줄, overlay

직접 만들기 싫으면 Pi에게 만들게 하거나 package를 설치하라고 권하고, 설치 예로 `pi install npm:@foo/pi-tools`와 `pi install git:github.com/badlogic/pi-doom`을 든다. 페이지 마지막은 "and it can play doom" 문구와 Doom extension 스크린샷(Fig. 01)이다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

벤치마크는 없다. 페이지가 내세운 정량 표현은 "15+ providers, hundreds of models"와 "50+ examples"(extension 예제) 두 가지다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- 제품 소개 페이지라 보안 모델(내장 권한 시스템 없음, project trust의 한계)을 다루지 않는다. 세부는 저장소 문서에 있다.
- 데모가 애니메이션이어서 수집본에는 데모 제목과 터미널 프롬프트 조각만 텍스트로 남았다.
- 링크한 문서 경로(`packages/coding-agent#extensions` 등)는 수집 시점 저장소 README 구조와 일부 맞지 않는다. coding-agent README가 짧아지고 세부가 `docs/`로 옮겨졌기 때문이다.

## 6. 관련 연구 (Related Work)

- [[agents/earendil-works-pi]]: 같은 프로젝트의 저장소. 패키지 구성, 세션 형식, compaction 알고리즘, 보안 모델을 문서 수준에서 다룬다.
- [[agents/agentskills-agentskills]]: Pi가 구현하는 Agent Skills 명세.
- [[agents/magnitudedev-magnitude]]: Pi에서 `/model`로 바로 전환해 쓰는 로컬 모델 서버.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| minimal agent harness | 기본 기능만 갖추고 나머지는 사용자가 확장으로 만드는 harness라는 Pi의 자기 규정 |
| `/reload` | Pi가 스스로를 수정한 뒤 extension과 리소스를 다시 로드하는 커맨드 |
| dynamic context | extension이 turn마다 context를 주입하거나 걸러 내는 방식 |
| Pi package gallery | `pi-package` keyword를 단 npm 패키지를 모은 pi.dev/packages 페이지 |

## 8. 그림 후보 (Figure Candidates)

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | Pi 터미널 안 Doom extension과 footer | fetched | ★ wiki 권장 (extension 표현력과 footer 정보) |
| fig02 | pi.dev 전체 페이지 스크린샷 | screenshot | (선택) |
| fig03 | 빈 데모 창 일부 자동 크롭 | crop | 제외 권장 (정보 없음) |
