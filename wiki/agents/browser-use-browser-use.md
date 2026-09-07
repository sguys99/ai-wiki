---
title: "Browser Use: Make websites accessible for AI agents"
type: repo
year: 2026
category: agents
raw_path: raw/repos/browser-use-browser-use.md
raw_filename: "browser-use-browser-use.md"
source_collection: external
source: browser-use-browser-use.md
org: "browser-use"
repo: "browser-use"
url: "https://github.com/browser-use/browser-use"
license: "MIT"
tags: [browser-agents, computer-use-agents, web-automation, cdp, agent-loop, mcp, skills, tool-use, llm-gateway, benchmark]
figures:
  - id: fig01
    label: static/accuracy_by_model_light.png
    kind: figure
    file: assets/browser-use-browser-use/fig01.png
    raw: https://github.com/browser-use/browser-use/blob/main/static/accuracy_by_model_light.png
    caption: "BU Bench V1 성공률. 주황이 Browser Use Cloud, 회색이 OSS 라이브러리다"
    strategy: manual
    curated: true
  - id: fig02
    label: apply_to_job demo
    kind: figure
    file: assets/browser-use-browser-use/fig02.gif
    raw: https://github.com/user-attachments/assets/57611d8e-0474-4de6-84b7-37a0c0cd27e7
    caption: "이력서를 읽어 채용 지원서를 채우는 데모"
    strategy: manual
    curated: true
---

## 요약

browser-use는 LLM이 웹 브라우저를 사람과 같은 방식으로 쓰게 하는 MIT 라이선스 Python 패키지다. 페이지를 열고 버튼을 누르고 타이핑하고 폼을 채우는 일을 모델이 대신한다. 사용자는 과제를 문장으로 적고, 패키지가 그 과제를 끝까지 수행한다.

수집 시점인 2026-09-02의 GitHub API 값으로 star 11만 1,981개, fork 1만 2,312개, open issue 399개다. 저장소는 2024-10-31에 생성되었고 최근 푸시는 2026-09-01이며, 수집 기준 버전은 `0.13.8`이다.

![[assets/browser-use-browser-use/fig02.gif]]
*Figure 1: "이 채용 지원서를 내 이력서와 정보로 채워줘" 과제 데모 (browser-use README)*

이 저장소가 제공하는 것은 새 방법론이 아니라 웹을 다루는 agent loop의 기성품이다. 루프의 한 바퀴가 "페이지 상태를 LLM에 넘긴다, 다음 action을 받는다, 브라우저에서 실행한다"로 고정되어 있고, 사용자가 고를 것은 과제 문장과 LLM뿐이다.

## 대표 용례

README 첫 절은 대표 과제 두 가지를 데모 영상으로 보여준다. 폼 입력과 데이터 추출로, 브라우저 에이전트가 흔히 요구받는 두 방향을 각각 대표한다.

| 용례 | 과제 문장 | 산출물 |
|---|---|---|
| 폼 입력 | "이 채용 지원서를 내 이력서와 정보로 채워줘" | 지원서 폼이 채워진 페이지. 예제 코드는 `examples/use-cases/apply_to_job.py` |
| 데이터 추출 | "내 팔로워에 대한 구조화 데이터를 추출해 CSV로 내보내줘" | CSV 파일. 클라우드 quickstart 문서로 연결된다 |

두 과제의 차이는 결과물이 브라우저 안에 남는지 파일로 나오는지다. 후자를 위해 문서 처리 의존성이 기본 설치에 포함되어 있다.

## 핵심 개념

agent loop는 모델 호출과 도구 실행, 관찰을 반복하는 기본 순환이다. browser-use는 이 순환의 각 단계를 웹 도메인에 고정해 놓았다. 관찰은 브라우저의 현재 페이지 상태이고, 도구 실행은 브라우저 조작이며, 모델 호출은 다음 action을 정하는 질의다.

CDP는 Chrome DevTools Protocol의 약어로, Chromium을 외부에서 제어하는 저수준 프로토콜이다. browser-use는 상위 자동화 프레임워크를 거치지 않고 이 프로토콜을 직접 호출한다.

스킬은 특정 작업 절차를 담아 에이전트에 등록하는 지침 패키지다. browser-use는 `browser-use skill install` 명령으로 자신을 다른 코딩 에이전트에 스킬로 등록해, 그 에이전트가 브라우저를 제어하게 만든다.

provider prefix 모델 id는 `openai/gpt-5.5`처럼 공급자 이름을 앞에 붙인 식별자다. browser-use의 게이트웨이 클래스가 이 형식을 받아, 키 하나로 여러 공급자의 모델에 닿게 한다.

| 개념 | 이 저장소에서의 구현 위치 |
|---|---|
| agent loop | `browser_use/agent/` |
| 브라우저 세션과 CDP 연결 | `browser_use/browser/`, 의존성 `cdp-use` |
| action 정의와 실행 | `browser_use/controller/`, `browser_use/tools/` |
| 스킬 패키지 | `browser_use/skills/` 하위 6개 |
| LLM 게이트웨이 | `browser_use/llm/`, 클래스 `ChatBrowserUse` |

## 두 진입 경로

README는 사용자를 두 경로로 나누어 안내한다. 이미 코딩 에이전트를 쓰는 사람과, 자기 코드에서 웹 자동화를 구현하는 사람이다.

### CLI 스킬 경로

첫 경로는 이미 쓰고 있는 코딩 에이전트에 browser-use를 스킬로 등록하는 방식이다. README는 Claude Code, Codex, Cursor, Hermes, OpenClaw를 대상 예로 든다. 설치는 프롬프트 하나를 에이전트에 붙여넣는 것으로 끝난다. 그 프롬프트는 uv와 Python 3.12로 browser-use를 최신 안정판까지 설치하거나 업그레이드하고, `browser-use skill install`로 스킬을 등록하고, 사용자의 브라우저에 연결하라고 지시한다. 설치나 연결이 실패하면 browser-harness 저장소의 설치 문서를 따르라는 폴백까지 프롬프트 안에 들어 있다.

등록이 끝나면 사용자는 코딩 에이전트에 원하는 일을 말하면 된다. README가 드는 예는 "이 영상을 YouTube에 올려줘", "이 노트북 세 대를 비교해 가격 표로 만들어줘", "이 채용 지원서를 내 이력서로 채워줘"다.

### Python 라이브러리 경로

두 번째 경로는 자기 코드에서 `Agent` 객체를 직접 만드는 방식이다. 웹을 자동화하는 소프트웨어를 만들 때 쓰며, 스케줄 실행과 병렬 실행, 자사 제품에 브라우저 에이전트를 내장하는 경우가 여기 해당한다. 커스텀 도구, 커스텀 시스템 프롬프트, 구조화 출력, 세밀한 브라우저 제어가 이 경로에서만 가능하다.

### 선택 기준

| 기준 | CLI 스킬 | Python 라이브러리 |
|---|---|---|
| 전제 조건 | 코딩 에이전트를 이미 쓰고 있다 | 웹 자동화 소프트웨어를 직접 만든다 |
| 설치 | `browser-use skill install` 1회 | `uv add browser-use` 또는 `pip install browser-use` |
| 대표 용례 | 영상 업로드, 상품 비교, 폼 입력 | 스크래핑, 모니터링, QA, 제품 내장 |
| 실행 주체 | 코딩 에이전트가 스킬 지침을 따른다 | 사용자 코드가 `Agent`를 호출한다 |
| 커스터마이즈 | 스킬 범위 안 | 도구, 프롬프트, 출력 스키마, 브라우저 옵션 |
| README의 판단 기준 | 일회성 과제 | 반복 자동화 |

## 설치와 첫 실행

### 설치와 Python 버전

설치는 `uv add browser-use` 또는 `pip install browser-use` 한 줄이다. 패키지가 요구하는 런타임은 `pyproject.toml` 기준 Python `>=3.11,<4.0`이다.

문서 안에서 권장 버전이 두 값으로 갈린다. 코딩 에이전트용 Quickstart 프롬프트는 Python 3.12를 지정하고, 기여자용 `AGENTS.md`의 개발 환경 안내는 `uv venv --python 3.11`을 쓴다. 둘 다 요구 범위 안이지만 처음 설치하는 사람에게는 혼란 요소다.

| 문맥 | 명령 | Python 버전 |
|---|---|---|
| 사용자 설치 (README) | `uv add browser-use`, `pip install browser-use` | `>=3.11,<4.0` |
| 코딩 에이전트 Quickstart 프롬프트 | uv로 최신 안정판 설치 후 `browser-use skill install` | 3.12 |
| 기여자 개발 환경 (`AGENTS.md`) | `uv venv --python 3.11`, `uv sync` | 3.11 |

### 환경 변수

키는 `.env` 파일로 넣는다. `BROWSER_USE_API_KEY` 하나로 게이트웨이를 통해 여러 공급자에 닿을 수 있고, 공급자 키를 직접 쓰려면 해당 변수를 넣는다.

| 변수 | 용도 |
|---|---|
| `BROWSER_USE_API_KEY` | Browser Use Cloud 키. 게이트웨이, 클라우드 REST API, `use_cloud` 원격 브라우저에 공통으로 쓴다 |
| `ANTHROPIC_API_KEY` | Anthropic 공급자 키를 직접 쓸 때 |
| `GOOGLE_API_KEY` | Google 공급자 키를 직접 쓸 때 |

### 첫 에이전트 코드

`Agent`에 과제 문장과 LLM 객체를 넘기고 `run()`을 기다리는 것이 최소 코드다. README 예제는 browser-use 저장소의 star 수를 찾아오는 과제를 쓴다.

```python
import asyncio

from browser_use import Agent, ChatBrowserUse

async def main():
    agent = Agent(
        task="Find the number of stars of the browser-use repo",
        llm=ChatBrowserUse(model='openai/gpt-5.5'),
    )
    history = await agent.run()

if __name__ == "__main__":
    asyncio.run(main())
```

`run()`은 코루틴이라 `asyncio` 위에서 동작하고, 반환값은 실행 이력이다.

## 지원 모델과 LLM 게이트웨이

### ChatBrowserUse

`ChatBrowserUse`는 여러 LLM 공급자를 키 하나로 감싼 이 저장소의 게이트웨이 클래스다. 공급자별 키를 따로 발급받지 않아도 `BROWSER_USE_API_KEY` 하나로 provider prefix 모델 id에 닿는다. 자체 최적화 모델과 open-weight 프리뷰 모델도 같은 인터페이스로 호출한다.

| 모델 id 계열 | 예시 | 비고 |
|---|---|---|
| provider prefix | `openai/gpt-5.5`, `anthropic/claude-sonnet-4-6`, `google/gemini-3-pro` | 별도 공급자 키가 필요 없다 |
| 자체 호스팅 모델 | `bu-2-0-mini-preview` | README가 속도와 비용 면에서 기본으로 권한다 |
| open-weight 프리뷰 | `browser-use/bu-30b-a3b-preview` | `Agent(...)`가 기본 시스템 프롬프트를 그대로 보낸다 |
| 공급자 클래스 직접 사용 | `ChatOpenAI(model='gpt-5.5')`, `ChatAnthropic(model='claude-opus-4-8')` | 코드 예제 주석에 함께 제시된다. Sonnet도 잘 동작한다고 적는다 |

저자들은 `ChatBrowserUse`를 브라우저 자동화 과제에 맞춰 최적화했고, 다른 모델보다 평균 3~5배 빠르면서 SOTA 정확도를 낸다고 적는다. 이 문장은 비교 대상과 측정 조건이 명시되지 않은 벤더 주장이므로 인용 시 출처를 함께 밝히는 편이 안전하다.

### 시스템 프롬프트 조정

시스템 프롬프트는 세 단계로 다룬다. 기본값은 `Agent(...)`가 알아서 보내므로 사용자가 손댈 필요가 없다. FAQ는 모델을 open-weight 프리뷰로 바꿨다는 이유만으로 별도 시스템 메시지를 추가하지 말라고 명시한다.

| 단계 | 수단 | 사용 시점 |
|---|---|---|
| 기본 | 별도 설정 없음 | `Agent(...)`가 기본 에이전트 시스템 프롬프트를 자동으로 보낸다 |
| 부분 수정 | `extend_system_message` | 기본 동작을 유지하며 지시를 덧붙일 때 |
| 전면 교체 | `override_system_message` | 기본 동작 자체를 과제에 맞게 바꿀 때 |

기본 프롬프트는 코드에 문자열로 박혀 있지 않고 파일로 관리된다. 빌드 설정이 `browser_use/agent/system_prompts/*.md`를 패키지에 포함하도록 지정하고 있어서다.

## 아키텍처

### 실행 루프

`AGENTS.md` 첫 문단이 루프 전체를 한 문장으로 정의한다. 사용자가 정의한 과제를 받아 CDP로 Chromium을 조작하며 페이지를 이동하고, HTML을 가공하고, 다음 action을 정하려고 언어 모델에 반복 질의하며, 과제가 끝날 때까지 이를 되풀이한다.

### 브라우저 제어 계층

브라우저 제어는 Chrome DevTools Protocol 직접 호출로 구현되어 있다. GitHub topics에는 `playwright`가 들어 있지만 `pyproject.toml`의 런타임 의존성 목록에 playwright는 없다. 그 자리에 있는 것은 `cdp-use==1.4.5`다. 즉 Playwright 같은 상위 자동화 프레임워크를 경유하지 않는다.

기존 Chrome 프로필 재사용과 원격 브라우저 연결은 각각 별도 예제와 문서로 안내된다. 두 경로 모두 인증 상태를 유지하는 데 쓰이며, 아래 인증 처리 절에서 다시 다룬다.

### 패키지 구성

`browser_use/` 아래에 디렉토리 17개와 파일 10개가 있다. 관심사별로 나뉘어 있어 어느 디렉토리가 루프의 어느 부분을 맡는지 이름으로 읽힌다.

| 디렉토리 또는 파일 | 역할 |
|---|---|
| `agent/` | agent loop 본체. `agent/system_prompts/*.md`가 패키지에 함께 배포된다 |
| `browser/` | 브라우저 세션 관리와 CDP 연결 |
| `dom/` | 페이지 구조 처리. `dom/**/*.js`가 패키지에 포함되므로 페이지 주입 스크립트가 함께 배포된다 |
| `controller/`, `tools/` | action 등록과 실행 |
| `llm/` | 공급자 어댑터. `llm/oci_raw/`가 별도로 있다 |
| `mcp/`, `integrations/` | MCP 서버와 클라이언트 연동, 외부 서비스 연동 |
| `skills/` | 스킬 패키지 6종. `skills/**/*.md`가 패키지에 포함된다 |
| `sandbox/`, `sync/`, `filesystem/` | 실행 격리, 동기화, 파일 처리 |
| `screenshots/`, `tokens/` | 스크린샷 수집, 토큰 회계 |
| `telemetry/`, `observability.py` | 사용 데이터 수집과 관측 |
| `actor/`, `beta/` | actor 계층과 베타 기능 |
| `cli.py`, `config.py`, `init_cmd.py` | CLI 진입점, 설정, 초기화 명령 |

`dom/` 아래에 JavaScript 파일이 함께 배포된다는 사실은 페이지 가공이 순수 Python 처리만으로 되어 있지 않다는 뜻이다. 다만 그 스크립트가 DOM을 어떤 형태로 직렬화하는지는 raw에서 확인되지 않는다.

### 저장소 루트 구성

루트에는 파일 16개와 디렉토리 9개가 있다. 코딩 에이전트를 독자로 삼은 문서가 여럿 놓인 점이 특징이다.

| 루트 항목 | 성격 |
|---|---|
| `AGENTS.md`, `CLAUDE.md` | 코딩 에이전트용 기여 지침 |
| `CLOUD.md`, `BETA_AGENT_INTEGRATION_FEATURES.md` | 클라우드와 베타 통합 기능 문서 |
| `server.json` | MCP 서버 등록 메타데이터 |
| `Dockerfile`, `Dockerfile.fast`, `docker/` | 컨테이너 이미지 두 종과 부속 파일 |
| `skills/`, `static/`, `examples/`, `tests/`, `scripts/`, `bin/` | 스킬, 정적 자산, 예제, 테스트, 스크립트, 실행 파일 |
| `.env.example`, `.python-version`, `.pre-commit-config.yaml` | 환경 변수 예시, Python 버전 고정, pre-commit 설정 |

### 스킬 패키지

패키지 안의 `skills/` 하위에 스킬 패키지 여섯 개가 들어 있다. README는 이 목록을 설명하지 않으므로, 이름에서 읽히는 범위까지만 정리할 수 있다.

| 스킬 | 이름에서 읽히는 범위 |
|---|---|
| `browser-use` | 기본 브라우저 조작 |
| `cloud` | Browser Use Cloud 연동 |
| `open-source` | 오픈소스 라이브러리 경로 |
| `qa` | 웹 QA 시나리오 |
| `remote-browser` | 원격 브라우저 연결 |
| `x402` | README에 설명이 없다. 이름의 402는 HTTP 상태 코드 402(Payment Required)와 같은 숫자다 |

## 의존성 구성

### 런타임 의존성

런타임 의존성이 36개다. 목록 자체가 이 에이전트의 실제 행동 범위를 알려준다. 문서를 읽고 만들고, OTP 로그인을 통과하고, 스크린샷을 찍고, MCP로 외부 도구와 연결하는 기능이 모두 기본 설치에 포함된다.

| 의존성 | 이 패키지가 쓰는 이유 |
|---|---|
| `cdp-use==1.4.5` | Chrome DevTools Protocol 직접 제어 |
| `markdownify==1.2.2` | 주석에 "LLM에 넘길 페이지 텍스트 추출용"이라고 적혀 있다 |
| `pypdf`, `python-docx`, `reportlab` | 내려받은 문서를 읽고 새 문서를 만든다 |
| `pyotp==2.9.0` | OTP 기반 로그인 통과 |
| `pillow==12.3.0` | 스크린샷 처리 |
| `bubus==1.5.6` | 내부 이벤트 버스 |
| `mcp==1.28.1` | MCP 연동이 선택 기능이 아니라 기본 탑재 |
| `openai`, `anthropic`, `google-genai`, `groq`, `ollama` | LLM 공급자 SDK가 기본 설치된다 |
| `google-api-python-client`, `google-auth`, `google-auth-oauthlib` | Google API 인증 |
| `browser-use-sdk==3.4.2`, `browser-harness==0.1.10` | 클라우드 SDK와 harness가 런타임 의존성에 포함된다 |
| `posthog==7.7.0` | 텔레메트리 |
| `rich`, `click`, `InquirerPy` | CLI 출력과 인자 파싱, 대화형 프롬프트 |
| `psutil`, `pyobjc`(macOS), `screeninfo`(그 외) | 프로세스 관리와 화면 해상도 조회 |

공급자 SDK 다섯 종이 런타임에 미리 들어와 있다는 점은 설치 용량과 맞바꾼 편의다. `ollama`가 포함되어 있어 로컬 모델도 추가 설치 없이 쓸 수 있다.

### 선택 extras

선택 extras는 9개 묶음이다. AWS Bedrock과 OCI는 여기로 분리되어 있고, 화면 녹화와 평가 도구도 선택 사항이다.

| extras | 내용 |
|---|---|
| `cli` | 빈 묶음 (플레이스홀더) |
| `core` | `browser-use-core==0.13.3`을 플랫폼별 wheel로 설치한다 |
| `aws` | `boto3==1.42.37` (Bedrock) |
| `oci` | `oci==2.166.0` |
| `video` | `imageio[ffmpeg]`, `numpy` (화면 녹화) |
| `examples` | `agentmail`, `botocore`, `imgcat`, `langchain-openai` |
| `eval` | Laminar(`lmnr[all]`), `datamodel-code-generator` |
| `cli-oci`, `all` | 위 묶음을 조합한 편의 extras |

`core` extras가 지정하는 플랫폼은 macOS arm64와 x86_64, Linux x86_64와 aarch64, Windows AMD64다. 즉 별도 컴파일 구성 요소가 이 다섯 조합에만 배포된다.

### 버전 고정 방식

버전 고정이 매우 촘촘하다. 런타임 의존성 36개 중 35개가 `==`로 정확히 핀되어 있고, 범위를 남긴 것은 `pydantic>=2.12.5,<2.14` 하나뿐이다.

이 방식은 재현성 면에서 유리하다. 반면 다른 패키지와 한 가상환경을 공유할 때 버전 충돌이 발생할 여지가 크다. 따라서 기존 프로젝트에 추가할 때는 별도 환경 분리를 검토하는 편이 안전하다.

## 확장과 운영

### 커스텀 도구 등록

커스텀 도구는 `Tools` 객체에 데코레이터 한 줄로 등록하고, 그 객체를 `Agent`에 넘긴다.

```python
from browser_use import Tools

tools = Tools()

@tools.action(description='Description of what this tool does.')
def custom_tool(param: str) -> str:
    return f"Result: {param}"

agent = Agent(task="Your task", llm=llm, browser=browser, tools=tools)
```

`AGENTS.md`가 여기에 규약을 덧붙인다. 내부 action 스키마와 과제 입출력, 도구 입출력을 모두 Pydantic v2 모델로 쓰고, 반환은 구조화된 내용을 담은 `ActionResult`로 해서 에이전트가 다음 판단을 잘 하게 만들라는 것이다. `description` 인자와 docstring도 설명적으로 쓰라고 요구한다.

### 원격 브라우저와 클라우드 전환

성능을 올리는 수단으로 `Browser(use_cloud=True)` 파라미터가 있다. `AGENTS.md`는 이 파라미터의 동작을 다섯 가지로 적는다. Browser Use Cloud에 원격 브라우저를 자동 프로비저닝하고, CAPTCHA와 봇 탐지를 우회하며, 원격 브라우저 중 가장 낮은 지연을 제공하고, 로컬에서 원격으로의 프로필 동기화로 인증을 처리하며, 원격 스트리밍 URL로 화면을 볼 수 있다. 설정에 필요한 것은 `BROWSER_USE_API_KEY` 환경 변수뿐이다.

클라우드 에이전트를 코드 없이 호출하려면 REST 엔드포인트를 쓴다. `POST https://api.browser-use.com/api/v4/runs`에 `X-Browser-Use-API-Key` 헤더와 과제 문장을 담은 JSON 본문을 보내는 방식이다.

### CLI 진입점

`pyproject.toml`의 `[project.scripts]`에 진입점 다섯 개가 등록되어 있다. 넷은 같은 함수를 가리키는 별칭이고 하나는 deprecated다.

| 명령 | 대상 함수 | 비고 |
|---|---|---|
| `browser-use` | `browser_use.cli:main` | 기본 명령 |
| `browseruse` | `browser_use.cli:main` | 별칭 |
| `bu` | `browser_use.cli:main` | 별칭 |
| `browser` | `browser_use.cli:main` | 별칭 |
| `browser-use-tui` | `browser_use.cli:browser_use_tui_main` | deprecated 별칭 |

### 인증 처리

로그인이 필요한 사이트를 다루는 방법으로 세 경로를 안내한다. 이미 있는 로그인 세션을 쓰는 방법, 계정을 새로 만드는 방법, 로컬 인증 상태를 원격으로 옮기는 방법이다.

| 방법 | 수단 | 용도 |
|---|---|---|
| 기존 Chrome 프로필 재사용 | `examples/browser/real_browser.py` | 이미 로그인해 둔 세션을 그대로 쓴다 |
| 임시 계정과 메일함 | AgentMail (`examples` extras의 `agentmail`) | 계정을 새로 만들어야 하는 과제 |
| 원격 브라우저로 프로필 동기화 | `profile-use` 바이너리와 browser-harness의 프로필 동기화 문서 | 로컬 인증 상태를 원격 브라우저로 옮긴다 |

OTP를 요구하는 로그인은 런타임 의존성 `pyotp`로 처리한다. 즉 2단계 인증이 걸린 사이트도 기본 설치 범위에서 다룰 수 있다.

## MCP 통합

MCP 연동은 선택 기능이 아니라 기본 구성이다. `mcp==1.28.1`이 런타임 의존성에 있고, 패키지 안에 `mcp/` 디렉토리가 별도로 있다.

저장소가 MCP 서버로 등록되는 메타데이터도 두 곳에 있다. 루트의 `server.json`과 README 최상단의 `<!-- mcp-name: com.browser-use/browser-use -->` 주석이다. 따라서 이 패키지는 MCP 서버를 호출하는 클라이언트이면서 동시에 MCP 서버로 노출되는 대상이기도 하다.

## 코드 구조 규약

`browser_use/README.md`는 사용자 문서가 아니라 코드 구조 규약이다. Netflix의 dispatch 저장소에서 따온 서비스 단위 레이아웃을 쓰고, 참고 자료로 fastapi-best-practices 저장소를 함께 링크한다. 서비스 하나가 `models.py`, `services.py`, `prompts.py`, `views.py`, `utils.py`, `routers.py`로 구성된다.

특이한 점은 파일이 길어질 때의 분할 기준을 파일별로 다르게 정한 것이다.

| 파일 | 규약 |
|---|---|
| `services.py` | 항상 단일 파일. 500줄을 넘으면 하위 서비스(`_<subservice>/`)로 분할한다 |
| `views.py` | 항상 Requests와 Responses 두 부분으로 나눈다. 길어지면 여러 파일로 분할한다 |
| `prompts.py` | 단일 파일. 길어지면 프롬프트 하나당 파일 하나 수준으로 분할한다 |
| `routers.py` | 절대 두 개 이상으로 분할하지 않는다 |

`prompts.py`를 서비스 구성의 필수 파일로 규정한 점이 LLM 애플리케이션의 특징을 보여준다. 일반적인 백엔드 레이아웃에는 프롬프트 파일이 들어가지 않는다.

## 기여자 규약

`AGENTS.md`의 `<guidelines>` 블록은 지침 10개로 되어 있다. 기여자용 문서이지만 확장 API의 설계 의도와 저자들의 권장 구성을 읽는 데 쓸 수 있다.

| 지침 | 내용 |
|---|---|
| 패키지 관리 | `pip` 대신 항상 `uv`를 쓴다 (`uv venv --python 3.11`, `uv sync`) |
| 모델명 | 모델 이름을 임의로 교체하지 않는다. 사용자가 아직 알려지지 않은 새 모델을 시도한다 |
| 타입 안전 | 내부 action 스키마, 과제 입출력, 도구 입출력을 모두 Pydantic v2 모델로 쓴다 |
| 포매팅 | PR 전에 반드시 pre-commit을 실행한다 |
| 명명 | action마다 설명적인 이름과 docstring을 쓴다 |
| 반환값 | 구조화된 내용을 담은 `ActionResult`를 반환해 에이전트의 판단을 돕는다 |
| 문서 | `<browser_use_docs/>`의 문서를 따르고, 잘린 부분은 해당 문서 페이지를 확인한다 |
| 예제 | 기능 구현 요청에 새 예제 파일을 만들지 않는다. 확인이 필요하면 터미널의 인라인 코드로 한다 |
| 모델 추천 | 기본값으로 `ChatBrowserUse`를 권한다 |
| 성능 문의 | `Browser(use_cloud=True)` 파라미터를 안내한다 |

"모델 이름을 임의로 교체하지 않는다"는 지침은 코딩 에이전트를 독자로 삼은 문서라는 성격을 잘 보여준다. 학습 시점 이후에 나온 모델을 사용자가 지정했을 때 에이전트가 아는 이름으로 되돌리는 문제를 막으려는 것이다.

### 개발 도구 설정

| 도구 | 설정 |
|---|---|
| ruff | line-length 130, 탭 인덴트, 단일 인용부호, `fix = true` |
| pyright | 타입 검사 모드 `basic`, 대상 `browser_use`와 `examples`, `tests` |
| pytest | 타임아웃 300초, asyncio 자동 모드, 마커 4종(slow, integration, unit, asyncio) |
| codespell | `bu` 등 프로젝트 약어를 무시 목록에 등록 |
| dev 의존성 | 18개 (ruff, pytest 계열, pyright, pre-commit, Laminar 등) |

## 결과

### BU Bench V1

BU Bench V1은 실제 웹 과제 100건으로 성공률을 재는 자체 벤치마크다. 벤치마크 코드는 `browser-use/benchmark` 저장소에 공개되어 있고, 결과 차트는 `static/accuracy_by_model_light.png`와 다크 모드용 파일로 저장소에 들어 있다.

차트를 읽을 때 유의할 점이 있다. 막대가 모델별로만 늘어선 것이 아니라 Browser Use Cloud(주황) 2개와 Open Source Library(회색) 7개, 두 계열로 나뉘어 있다.

| 계열 | 항목 | 성공률 |
|---|---|---|
| Browser Use Cloud | Cloud v4 + Opus 4.8 | 85.0% |
| Browser Use Cloud | Cloud v4 (default) | 78.0% |
| Open Source Library | claude opus-4-7 | 74.0% |
| Open Source Library | bu 2-0 | 68.0% |
| Open Source Library | gpt 5.5 | 66.0% |
| Open Source Library | gemini 3.5-flash | 65.0% |
| Open Source Library | qwen 3.6plus | 45.0% |
| Open Source Library | deepseek v4-flash-0731 | 37.0% |
| Open Source Library | Luna | 31.0% |

![[assets/browser-use-browser-use/fig01.png]]
*Figure 2: BU Bench V1 성공률. 주황이 Browser Use Cloud, 회색이 OSS 라이브러리다 (browser-use README, `static/accuracy_by_model_light.png`)*

클라우드 최고 85.0%와 OSS 최고 74.0%의 간격이 11%p다. 따라서 이 차트는 모델 비교표이면서 동시에 유료 제품의 근거 자료이기도 하다.

OSS 계열 안에서는 상용 모델과 자체 모델이 섞여 있다. 자체 모델 bu 2-0이 68.0%로 gpt 5.5(66.0%)와 gemini 3.5-flash(65.0%)보다 높고 claude opus-4-7(74.0%)보다 낮다. 하위 세 항목인 qwen 3.6plus(45.0%), deepseek v4-flash-0731(37.0%), Luna(31.0%)는 상위권과 20%p 이상 벌어져 있어, 같은 실행 스택에서도 모델 선택이 결과를 크게 좌우한다.

### Odysseys 리더보드

Odysseys는 장기 호흡 웹 과제 200건으로 에이전트 성능을 재는 외부 리더보드다. README는 browser-use가 평균 87.4%로 1위이며 OpenAI, Anthropic, Google, Microsoft의 computer-use agent를 앞선다고 적는다.

### 수치 해석 시 유의점

두 수치 모두 벤더 자체 발표다. 저장소 안에는 재현 절차나 실행 로그가 없다. 리더보드 순위는 시점에 따라 바뀌므로 "1위"라는 서술은 수집 시점의 상태로 읽어야 한다. `ChatBrowserUse`의 "평균 3~5배 빠르다"는 문장도 비교 대상과 측정 조건이 없다. 인용할 때는 출처를 README 주장으로 명시하는 편이 안전하다.

## 오픈소스와 클라우드의 경계

경계가 기능 단위로 그어져 있다. README가 두 경로의 장점을 각각 불릿으로 나열하는데, 프로덕션 운영에 필요한 항목이 대부분 유료 쪽에 모여 있다.

| 항목 | 오픈소스 에이전트 | 클라우드 에이전트 |
|---|---|---|
| 비용 | 무료, 자기 장비에서 실행 | 유료 호스팅 |
| 제어 | 코드 수준 통합, LLM 선택, 동작 커스터마이즈 | 시작과 확장이 가장 쉽다 |
| 성능 | 차트의 OSS 계열 최고 74.0% | 복잡한 과제에서 더 강력, 차트 최고 85.0% |
| stealth와 CAPTCHA | README가 클라우드 브라우저와 함께 쓰기를 권한다 | proxy rotation과 CAPTCHA 해결 포함 |
| 연동 | 직접 구현 | Gmail, Slack, Notion 등 1,000개 이상 |
| 상태 보존 | 직접 구현 | 영속 파일시스템과 메모리 |
| 재실행 | 직접 구현 | 사이트가 바뀌어도 실시간 데이터를 가져오는 재실행 스크립트 |

오픈소스 경로의 세 번째 불릿 자체가 클라우드 브라우저와의 병행 사용을 권한다. 즉 stealth와 proxy rotation, 확장성은 오픈소스 코드로 해결하는 항목이 아니라 유료 브라우저 인프라로 해결하는 항목으로 배치되어 있다.

## 한계

README는 제품 소개와 사용 안내에 집중한다. DOM을 어떤 형태로 직렬화해 LLM에 넘기는지, 컨텍스트 예산을 어떻게 관리하는지, 실패한 action을 어떻게 복구하는지 같은 핵심 설계는 README에 없다. 빌드 설정에서 `dom/**/*.js`가 패키지에 포함된다는 사실로 페이지 주입 스크립트의 존재만 확인되고, 그 형식을 알려면 `docs.browser-use.com`이나 코드를 봐야 한다.

FAQ는 CAPTCHA 질문과 프로덕션 운영 질문에 모두 클라우드 사용을 권한다. 프로덕션 항목의 근거로 드는 것은 Chrome의 메모리 사용량이 크고 다수 에이전트의 병렬 실행 관리가 까다롭다는 점이다. 무료로 쓸 수 있다는 말은 사실이지만, 봇 탐지가 걸린 사이트나 대규모 병렬 실행을 다루는 순간 조건이 달라진다.

텔레메트리 수집 코드가 기본 설치에 들어 있다. `posthog`가 런타임 의존성이고, `pyproject.toml`의 `[project.urls]`에 Telemetry 문서 링크가 별도 항목으로 등록되어 있다. 수집 범위와 중단 방법은 그 문서를 확인해야 한다.

버전이 `0.13.8`로 1.0 이전이다. 의존성 핀이 촘촘해 기존 프로젝트에 추가할 때 마찰이 생기고, 권장 Python 버전이 문서 위치에 따라 3.11과 3.12로 갈린다.

## 라이선스와 인용

라이브러리는 MIT 라이선스다. 클라우드 서비스와 데이터 정책은 라이선스와 별개로 Terms of Service와 Privacy Policy가 적용된다. 즉 코드를 자유롭게 쓰는 것과 클라우드 API를 쓰는 것은 조건이 다르다.

| 항목 | 값 |
|---|---|
| 코드 라이선스 | MIT |
| 클라우드 서비스 | 별도 Terms of Service, Privacy Policy |
| 인용 | Müller, Magnus and Žunič, Gregor. *Browser Use: Enable AI to control your browser*, 2024, GitHub |
| GitHub topics | `ai-agents`, `ai-tools`, `browser-automation`, `browser-use`, `llm`, `python`, `playwright` |
| 제작 | 취리히와 샌프란시스코 (README 하단) |

이 저장소만으로 전체 구성을 파악하기 어려운 부분이 있다. 벤치마크, 설치 안내, 프로필 동기화 도구가 각각 별도 저장소로 분리되어 있어서다.

| 저장소 | 담당 |
|---|---|
| [browser-use/benchmark](https://github.com/browser-use/benchmark) | BU Bench 벤치마크 코드 |
| [browser-use/browser-harness](https://github.com/browser-use/browser-harness) | 설치 안내와 프로필 동기화 문서. 런타임 의존성 `browser-harness`의 원본 |
| [browser-use/profile-use-releases](https://github.com/browser-use/profile-use-releases) | `profile-use` 도구 바이너리 배포 |

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| CDP (Chrome DevTools Protocol) | Chromium을 외부에서 제어하는 저수준 프로토콜. browser-use는 Playwright를 거치지 않고 `cdp-use`로 직접 연결한다 |
| `ChatBrowserUse` | 여러 LLM 공급자를 키 하나로 감싼 이 저장소의 게이트웨이 클래스. provider prefix 모델 id와 자체 `bu-*` 모델을 같은 인터페이스로 부른다 |
| `Browser(use_cloud=True)` | 원격 브라우저를 Browser Use Cloud에 자동 프로비저닝하는 파라미터. `BROWSER_USE_API_KEY`만 있으면 동작한다 |
| BU Bench V1 | 실제 웹 과제 100건으로 모델별 성공률을 재는 자체 벤치마크. 코드는 `browser-use/benchmark` |
| Odysseys | 장기 호흡 웹 과제 200건을 재는 외부 리더보드. README는 87.4%로 1위라고 적는다 |
| `profile-use` | 로컬 브라우저 프로필의 로그인 상태를 원격 브라우저로 동기화하는 별도 배포 도구 |

## 관련 페이지

- [[agents/browser-use-browsercode]]: 같은 조직의 다른 산출물. 이 페이지는 Python 라이브러리 본체의 아키텍처와 설치, 설정, API를 담당하고, 그 페이지는 OpenCode를 fork한 코딩 에이전트 쪽을 담당한다. 그 페이지에 따르면 BrowserCode는 고정된 agent loop 대신 `browser_execute(code)` 하나로 JavaScript를 CDP에 전달하는 설계이며 같은 BU Bench V1에서 Opus 4.8 기준 89.5%를 적는다
- [[agents/wang-2026-cua-gym-scaling-verifiable-training-environments]]: 같은 computer-use agent 문제를 학습 데이터 쪽에서 다룬다. browser-use가 실행 스택이라면 CUA-Gym은 검증 가능한 학습 환경 합성이다
- [[agents/xlang-ai-cua-gym]]: 그 논문의 공식 구현체
- [[evaluations/xie-2024-osworld-benchmarking-multimodal-agents-for]]: OS 전체를 무대로 삼는 벤치마크. BU Bench와 Odysseys가 브라우저로 범위를 좁힌 대비를 볼 수 있다
- [[agents/lee-2026-the-agent-loop-a-survey]]: agent loop를 분석 단위로 세운 서베이. 이 저장소는 그 루프를 웹 도메인에 고정해 배포한 사례다
- [[agents/rodrigues-2026-mcp-server-architecture-patterns]]: `mcp`가 런타임 의존성이고 루트에 `server.json`이 있어 MCP 서버 패턴과 맞물린다
- [[agents/hada-2026-agent-skills]]: `browser-use skill install`이 겨냥하는 스킬 포맷을 다룬다
- [[agents/agentskills-agentskills]]: 같은 스킬 생태계의 저장소 사례
