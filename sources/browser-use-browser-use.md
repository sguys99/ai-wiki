---
title: "Browser Use: Make websites accessible for AI agents"
type: repo
year: 2026
category: agents
raw_path: raw/repos/browser-use-browser-use.md
raw_filename: "browser-use-browser-use.md"
source_collection: external
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

## 한 줄 요약 (One-line Summary)

LLM이 Chromium을 Chrome DevTools Protocol로 직접 제어해 웹 과제를 끝내게 하는 MIT 라이선스 Python 패키지다. 진입 경로가 둘인데, 하나는 코딩 에이전트에 등록하는 CLI 스킬이고 다른 하나는 직접 코드를 작성하는 Python 라이브러리다.

## 1. 자료 정보 (Document Information)

| 항목 | 값 |
|---|---|
| 저장소 | <https://github.com/browser-use/browser-use> |
| 조직 | browser-use (Magnus Müller, Gregor Žunič) |
| 라이선스 | MIT (클라우드 서비스는 별도 Terms of Service와 Privacy Policy 적용) |
| 버전 | `0.13.8` (main 기준, 수집 시각 2026-09-02) |
| 요구 환경 | Python `>=3.11,<4.0` |
| 규모 | star 11만 1,981개, fork 1만 2,312개, open issue 399개 (2026-09-02 GitHub API) |
| 생성과 최근 푸시 | 2024-10-31 생성, 2026-09-01 푸시 |
| GitHub topics | `ai-agents`, `ai-tools`, `browser-automation`, `browser-use`, `llm`, `playwright`, `python` |
| 문서와 제품 | <https://docs.browser-use.com>, <https://browser-use.com>, 클라우드 <https://cloud.browser-use.com> |
| 인용 정보 | Müller, Magnus and Žunič, Gregor. *Browser Use: Enable AI to control your browser*, 2024 |

함께 참조되는 저장소가 셋이다. [browser-use/benchmark](https://github.com/browser-use/benchmark)가 BU Bench 코드를 담고, [browser-use/browser-harness](https://github.com/browser-use/browser-harness)가 설치 안내와 프로필 동기화 문서를 담으며, [browser-use/profile-use-releases](https://github.com/browser-use/profile-use-releases)가 프로필 동기화 도구 바이너리를 배포한다. 저장소 하단은 취리히와 샌프란시스코에서 만들었다고 적는다.

수집한 raw에는 README 외에 GitHub API 메타데이터, 저장소 루트 트리, `browser_use/` 패키지 트리, `pyproject.toml`, `browser_use/README.md`, `AGENTS.md`의 `<guidelines>` 블록이 원문 그대로 들어 있다. README 본문만으로는 확인되지 않는 구현 사실 대부분이 이 부록에서 나온다.

## 2. 주요 기여 (Key Contributions)

이 저장소가 제공하는 것은 새 방법론이 아니라 웹을 다루는 agent loop의 기성품이다. agent loop는 모델 호출과 도구 실행, 관찰을 반복하는 기본 순환을 말한다. 여기서는 그 순환의 한 바퀴가 "현재 페이지 상태를 LLM에 넘긴다, 다음 action을 받는다, 브라우저에서 실행한다"로 고정되어 있고, 사용자는 과제 문장과 LLM만 고르면 된다.

진입 경로가 둘로 나뉜다는 점이 README 구성의 기준이다. 이미 코딩 에이전트를 쓰고 있으면 `browser-use skill install`로 스킬을 등록해 그 에이전트가 브라우저를 제어하게 한다. 스킬은 특정 작업 절차를 담아 에이전트에 등록하는 지침 패키지다. 자기 코드 안에서 웹 자동화를 실행할 때는 `Agent(task=..., llm=...)` 라이브러리를 쓴다.

| 기준 | CLI 스킬 | Python 라이브러리 |
|---|---|---|
| 전제 | 이미 코딩 에이전트를 쓰고 있다 (README는 Claude Code, Codex, Cursor, Hermes, OpenClaw를 예로 든다) | 웹을 자동화하는 소프트웨어를 직접 만든다 |
| 설치 | `browser-use skill install`로 스킬을 한 번 등록한다 | `uv add browser-use` 또는 `pip install browser-use` |
| 예시 과제 | "이 영상을 YouTube에 올려줘", "이 노트북 세 대를 비교해 가격 표로 만들어줘", "이 채용 지원서를 내 이력서로 채워줘" | 스케줄 실행과 병렬 실행(스크래핑, 모니터링, QA), 자사 제품에 브라우저 에이전트 내장 |
| 제어 범위 | 코딩 에이전트가 스킬 지침을 따른다 | 커스텀 도구, 커스텀 시스템 프롬프트, 구조화 출력, 세밀한 브라우저 제어 |
| README의 기준 | 일회성 과제 | 반복 자동화 |

LLM 공급자를 한 겹 감싼 `ChatBrowserUse`도 이 저장소 고유의 선택이다. `BROWSER_USE_API_KEY` 하나로 `openai/gpt-5.5`, `anthropic/claude-sonnet-4-6`, `google/gemini-3-pro` 같은 provider prefix 모델 id에 닿고, 자체 최적화 모델 `bu-2-0-mini-preview`와 open-weight 프리뷰 `browser-use/bu-30b-a3b-preview`도 같은 인터페이스로 부른다. 브라우저 자동화에 맞춰 최적화했고 다른 모델보다 평균 3~5배 빠르면서 SOTA 정확도를 낸다는 것이 저자들의 주장이다. 코드 예제는 `ChatOpenAI(model='gpt-5.5')`와 `ChatAnthropic(model='claude-opus-4-8')`처럼 공급자 클래스를 직접 쓰는 경로도 주석으로 함께 제시하며, Sonnet도 잘 동작한다고 적는다.

자체 벤치마크는 별도 저장소로 분리해 공개했다. BU Bench V1은 실제 웹 과제 100건이고 코드가 `browser-use/benchmark`에 열려 있다. README의 첫 절은 대표 과제 두 가지를 데모로 보여준다. 하나는 이력서로 채용 지원서를 채우는 폼 입력이고, 다른 하나는 팔로워 정보를 구조화해 CSV로 내보내는 데이터 추출이다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

`AGENTS.md` 첫 문단이 루프 전체를 한 문장으로 적는다. 과제를 받아 CDP로 Chromium을 움직이고, HTML을 가공하고, 다음 action을 정하려고 언어 모델에 반복 질의하며, 과제가 끝날 때까지 이를 되풀이한다.

브라우저 제어 계층의 선택이 이 저장소의 구조를 좌우한다. GitHub topics에는 `playwright`가 들어 있지만 `pyproject.toml`의 런타임 의존성 목록에 playwright는 없다. 대신 `cdp-use==1.4.5`가 들어간다. 브라우저 제어가 Playwright 같은 상위 자동화 프레임워크를 거치지 않고 Chrome DevTools Protocol을 직접 호출한다는 뜻이다. 기존 Chrome 프로필 재사용과 원격 브라우저 연결은 각각 별도 예제와 문서로 안내된다.

`browser_use/` 아래에 디렉토리 17개와 파일 10개가 있다. 관심사별로 나뉘어 있어서 어느 디렉토리가 루프의 어느 부분을 맡는지 이름으로 읽힌다.

| 디렉토리 | 역할 |
|---|---|
| `agent/` | agent loop 본체. 빌드 설정이 `agent/system_prompts/*.md`를 패키지에 포함한다 |
| `browser/` | 브라우저 세션과 CDP 연결 |
| `dom/` | 페이지 구조 처리. 빌드 설정이 `dom/**/*.js`를 포함하므로 페이지에 주입하는 JavaScript가 패키지에 함께 배포된다 |
| `controller/`, `tools/` | action 등록과 실행 |
| `llm/` | 공급자 어댑터. `llm/oci_raw/`가 별도로 있다 |
| `mcp/`, `integrations/` | MCP 서버와 클라이언트 연동, 외부 서비스 연동 |
| `skills/` | 스킬 패키지 6종. 빌드 설정이 `skills/**/*.md`를 포함한다 |
| `sandbox/`, `sync/`, `filesystem/`, `screenshots/`, `tokens/` | 실행 격리, 동기화, 파일, 스크린샷, 토큰 회계 |
| `telemetry/`, `actor/`, `beta/` | 사용 데이터 수집, actor 계층, 베타 기능 |
| `cli.py`, `config.py`, `init_cmd.py`, `observability.py` | 진입점, 설정, 초기화 명령, 관측 |

패키지 안의 `skills/` 하위에는 스킬 패키지 여섯 개가 들어 있다. `browser-use`, `cloud`, `open-source`, `qa`, `remote-browser`, `x402`다. `x402`는 README에 설명이 없고, 이름의 402는 HTTP 상태 코드 402(Payment Required)와 같은 숫자다. raw에서 확인되는 것은 디렉토리 이름뿐이다.

저장소 루트에는 파일 16개와 디렉토리 9개가 있다. 에이전트용 문서가 여럿 함께 놓인 점이 특징이다. `AGENTS.md`와 `CLAUDE.md`가 코딩 에이전트용 기여 지침이고, `CLOUD.md`와 `BETA_AGENT_INTEGRATION_FEATURES.md`가 클라우드와 베타 통합 기능 문서다. MCP 서버 등록 메타데이터는 루트의 `server.json`과 README 최상단의 `<!-- mcp-name: com.browser-use/browser-use -->` 주석 양쪽에 들어 있다. 컨테이너 이미지는 `Dockerfile`과 `Dockerfile.fast` 두 종에 `docker/` 부속 파일이 붙는다. 나머지는 `skills/`, `static/`, `examples/`, `tests/`, `scripts/`, `bin/`과 `.env.example`, `.python-version`, `.pre-commit-config.yaml`이다.

### 의존성이 드러내는 기능 범위

런타임 의존성이 36개다. 목록을 읽으면 이 에이전트가 웹에서 실제로 무엇을 하는지가 드러난다.

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
| `browser-use-sdk==3.4.2`, `browser-harness==0.1.10` | 클라우드 SDK와 harness가 런타임 의존성에 포함된다 |
| `posthog==7.7.0` | 텔레메트리 |
| `rich`, `click`, `InquirerPy` | CLI 출력과 인자 파싱, 대화형 프롬프트 |
| `psutil`, `pyobjc`(macOS), `screeninfo`(그 외) | 프로세스 관리와 화면 해상도 조회 |

Google API 인증용으로 `google-api-python-client`, `google-auth`, `google-auth-oauthlib`도 함께 들어온다. 선택 extras는 9개 묶음이다. `core`는 `browser-use-core==0.13.3`을 플랫폼별 wheel로 설치하며 macOS arm64와 x86_64, Linux x86_64와 aarch64, Windows AMD64를 대상으로 한다. `aws`는 Bedrock용 `boto3`, `oci`는 `oci` SDK, `video`는 화면 녹화용 `imageio[ffmpeg]`와 `numpy`, `examples`는 `agentmail`과 `botocore`, `imgcat`, `langchain-openai`, `eval`은 Laminar(`lmnr[all]`)와 `datamodel-code-generator`를 담는다. 나머지 `cli`는 빈 묶음이고 `cli-oci`와 `all`은 조합 편의용이다.

버전 고정 방식이 특이하다. 런타임 의존성 36개 중 35개가 `==`로 정확히 핀되어 있고, 범위를 남긴 것은 `pydantic>=2.12.5,<2.14` 하나뿐이다. 재현성은 좋지만 다른 패키지와 한 환경에 섞을 때 충돌 여지가 크다.

### 확장 API와 시스템 프롬프트

커스텀 도구는 데코레이터 한 줄로 등록한다.

```python
from browser_use import Tools

tools = Tools()

@tools.action(description='Description of what this tool does.')
def custom_tool(param: str) -> str:
    return f"Result: {param}"

agent = Agent(task="Your task", llm=llm, browser=browser, tools=tools)
```

시스템 프롬프트는 세 단계로 다룬다. 기본값은 `Agent(...)`가 알아서 보내고, 부분 수정은 `extend_system_message`, 전면 교체는 `override_system_message`를 쓴다. FAQ는 모델을 open-weight 프리뷰로 바꿨다는 이유만으로 별도 시스템 메시지를 추가할 필요는 없다고 명시한다.

성능 관련 파라미터로 `Browser(use_cloud=True)`가 있다. `AGENTS.md`는 이 파라미터가 Browser Use Cloud에 원격 브라우저를 자동으로 프로비저닝하며, CAPTCHA와 봇 탐지 우회, 낮은 지연, 로컬에서 원격으로의 프로필 동기화 인증을 제공하고, 원격 스트리밍 URL로 화면을 볼 수 있으며 `BROWSER_USE_API_KEY` 환경 변수만 있으면 설정된다고 적는다.

CLI 진입점은 `pyproject.toml`의 `[project.scripts]`에 다섯 개가 등록되어 있다. `browser-use`와 별칭 `browseruse`, `bu`, `browser` 넷이 전부 `browser_use.cli:main`으로 가고, `browser-use-tui`만 `browser_use.cli:browser_use_tui_main`을 가리키는 deprecated 별칭이다.

인증 처리는 세 경로를 안내한다. 첫째는 기존 Chrome 프로필 재사용으로 `examples/browser/real_browser.py`가 이미 로그인해 둔 세션을 그대로 쓰는 방법을 보여준다. 둘째는 계정을 새로 만들어야 하는 과제용으로 임시 계정과 메일함을 제공하는 AgentMail이다. 셋째는 `profile-use` 바이너리를 공식 릴리스에서 설치한 뒤 browser-harness의 프로필 동기화 문서를 따라 로컬 인증 상태를 원격 브라우저로 옮기는 방법이다.

### 코드 구조 규약과 기여자 규약

`browser_use/README.md`는 사용자 문서가 아니라 코드 구조 규약이다. Netflix의 dispatch 저장소에서 따온 서비스 단위 레이아웃(`models.py`, `services.py`, `prompts.py`, `views.py`, `utils.py`, `routers.py`)을 쓰고, 파일이 길어질 때의 분할 기준을 파일별로 정한다.

| 파일 | 규약 |
|---|---|
| `services.py` | 항상 단일 파일. 500줄을 넘으면 하위 서비스(`_<subservice>/`)로 분할한다 |
| `views.py` | 항상 Requests와 Responses 두 부분으로 나눈다. 길어지면 여러 파일로 분할한다 |
| `prompts.py` | 단일 파일. 길어지면 프롬프트 하나당 파일 하나 수준으로 분할한다 |
| `routers.py` | 절대 두 개 이상으로 분할하지 않는다 |

`prompts.py`를 코드 구조의 필수 파일로 규정한 점이 LLM 애플리케이션의 특징을 보여준다. 참고 자료로 fastapi-best-practices 저장소도 함께 링크한다.

`AGENTS.md`의 `<guidelines>` 블록은 지침 10개로 되어 있다. 패키지 관리는 `pip` 대신 항상 `uv`를 쓰고(`uv venv --python 3.11`, `uv sync`), 모델 이름은 임의로 교체하지 않는다(사용자가 아직 알려지지 않은 새 모델을 시도한다). 내부 action 스키마와 과제 입출력, 도구 입출력은 모두 Pydantic v2 모델로 쓰고, PR 전에 pre-commit을 반드시 실행하며, action마다 설명적인 이름과 docstring을 쓴다. 반환은 구조화된 내용을 담은 `ActionResult`로 해서 에이전트의 판단을 돕는다. 문서는 `<browser_use_docs/>`를 따르고 잘린 부분은 해당 문서 페이지를 확인한다. 기능 구현 요청에 새 예제 파일을 만들지 않고 확인이 필요하면 터미널의 인라인 코드로 한다. 모델 추천은 기본값으로 `ChatBrowserUse`를, 성능 문의에는 `Browser(use_cloud=True)`를 안내한다.

개발 도구 설정도 `pyproject.toml`에 함께 들어 있다. ruff는 line-length 130에 탭 인덴트와 단일 인용부호를 쓰고, pyright는 `basic` 타입 검사 모드이며, pytest는 타임아웃 300초에 asyncio 자동 모드로 동작한다. dev 의존성은 18개다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

README가 제시하는 수치는 둘이다.

BU Bench V1은 실제 웹 과제 100건으로 성공률을 재고, 결과 차트가 `static/accuracy_by_model_light.png`와 `static/accuracy_by_model_dark.png`로 저장소에 들어 있다. 벤치마크 코드는 `browser-use/benchmark`에 공개되어 있다. 차트는 막대를 Browser Use Cloud(주황) 2개와 Open Source Library(회색) 7개로 나눈다.

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

클라우드 최고와 OSS 최고의 간격이 11%p다. 따라서 이 차트는 모델 비교인 동시에 유료 제품의 근거 자료이기도 하다.

Odysseys 리더보드에서는 평균 87.4%로 1위이며 OpenAI, Anthropic, Google, Microsoft의 computer-use agent를 앞선다고 적는다. Odysseys는 장기 호흡 웹 과제 200건을 재는 벤치마크다.

두 수치 모두 벤더 자체 발표라는 점은 감안해야 한다. 저장소 안에는 재현 절차나 실행 로그가 없고, 리더보드 순위는 시점에 따라 바뀐다. `ChatBrowserUse`가 "평균 3~5배 빠르다"는 문장도 비교 대상과 측정 조건이 명시되지 않았다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

README는 제품 소개와 사용 안내에 집중한다. DOM을 어떤 형태로 직렬화해 LLM에 넘기는지, 컨텍스트 예산을 어떻게 관리하는지, 실패한 action을 어떻게 복구하는지 같은 핵심 설계는 README에 없다. 빌드 설정이 `dom/**/*.js`를 패키지에 포함한다는 사실에서 페이지 주입 스크립트가 존재한다는 것만 확인되고, 그 형식을 알려면 `docs.browser-use.com`이나 코드를 봐야 한다.

OSS와 클라우드의 경계가 기능 단위로 그어져 있다. README가 두 경로의 장점을 각각 불릿으로 나열하는데, 프로덕션 운영에 필요한 항목이 대부분 유료 쪽에 모여 있다.

| 항목 | 오픈소스 에이전트 | 클라우드 에이전트 |
|---|---|---|
| 비용 | 무료, 자기 장비에서 실행 | 유료 호스팅 |
| 제어 | 코드 수준 통합, LLM 선택, 동작 커스터마이즈 | 시작과 확장이 가장 쉽다 |
| 성능 | 차트의 OSS 계열 최고 74.0% | 복잡한 과제에서 더 강력, 차트 최고 85.0% |
| stealth와 CAPTCHA | README가 클라우드 브라우저와 함께 쓰기를 권한다 | proxy rotation과 CAPTCHA 해결 포함 |
| 연동 | 직접 구현 | Gmail, Slack, Notion 등 1,000개 이상 |
| 상태 보존 | 직접 구현 | 영속 파일시스템과 메모리 |
| 재실행 | 직접 구현 | 사이트가 바뀌어도 실시간 데이터를 가져오는 재실행 스크립트 |

README의 FAQ는 CAPTCHA와 프로덕션 운영 질문에 모두 클라우드 사용을 권한다. 프로덕션 항목의 근거로는 Chrome의 메모리 사용량이 크고 다수 에이전트를 병렬 실행하는 관리가 까다롭다는 점을 든다. 클라우드 API는 REST 엔드포인트 `POST https://api.browser-use.com/api/v4/runs`에 `X-Browser-Use-API-Key` 헤더로 호출한다. 로컬에서 무료로 쓸 수 있다는 말은 사실이지만, 봇 탐지가 걸린 사이트를 다루는 순간 조건이 달라진다.

`posthog`가 런타임 의존성이라 텔레메트리 수집 코드가 패키지에 내장되어 있다. `pyproject.toml`의 `[project.urls]`에 Telemetry 문서 링크가 별도 항목으로 등록되어 있다.

버전이 아직 `0.13.8`로 1.0 이전이다. 의존성 핀이 촘촘해 기존 프로젝트에 추가할 때 마찰이 생긴다. 설치 안내에도 작은 불일치가 있다. 코딩 에이전트에 붙여넣는 Quickstart 프롬프트는 Python 3.12를 지정하고, `AGENTS.md`의 개발 환경 안내는 `uv venv --python 3.11`을 쓴다.

## 6. 관련 연구 (Related Work)

- [[agents/browser-use-browsercode]]: 같은 조직의 다른 산출물. 이 페이지가 Python 라이브러리를 다루고, 그 페이지가 코딩 에이전트 쪽 산출물을 다룬다
- [[agents/wang-2026-cua-gym-scaling-verifiable-training-environments]], [[agents/xlang-ai-cua-gym]]: 같은 computer-use agent 문제를 학습 데이터 쪽에서 다룬다. browser-use는 실행 스택, CUA-Gym은 검증 가능한 학습 환경 합성이라 계층이 다르다
- [[evaluations/xie-2024-osworld-benchmarking-multimodal-agents-for]]: OS 전체를 무대로 삼는 벤치마크. BU Bench와 Odysseys가 브라우저로 범위를 좁힌 대비를 볼 수 있다
- [[agents/lee-2026-the-agent-loop-a-survey]]: agent loop를 분석 단위로 세운 서베이. 이 저장소는 그 루프를 웹 도메인에 고정해 배포한 사례다
- [[agents/rodrigues-2026-mcp-server-architecture-patterns]]: `mcp`가 런타임 의존성으로 들어와 있어 MCP 서버 패턴과 맞물린다
- [[agents/hada-2026-agent-skills]], [[agents/agentskills-agentskills]]: `browser-use skill install`이 겨냥하는 스킬 생태계

## 7. 용어집 (Glossary)

| 용어 | 설명 |
|---|---|
| CDP (Chrome DevTools Protocol) | Chromium을 외부에서 제어하는 저수준 프로토콜. browser-use는 Playwright를 거치지 않고 `cdp-use`로 직접 연결한다 |
| `ChatBrowserUse` | 여러 LLM 공급자를 키 하나로 감싼 이 저장소의 게이트웨이 클래스. provider prefix 모델 id와 자체 `bu-*` 모델을 같은 인터페이스로 부른다 |
| `Browser(use_cloud=True)` | 원격 브라우저를 Browser Use Cloud에 자동 프로비저닝하는 파라미터. `BROWSER_USE_API_KEY`만 있으면 동작한다 |
| BU Bench V1 | 실제 웹 과제 100건으로 모델별 성공률을 재는 자체 벤치마크. 코드는 `browser-use/benchmark` |
| Odysseys | 장기 호흡 웹 과제 200건을 재는 외부 리더보드. README는 87.4%로 1위라고 적는다 |
| `profile-use` | 로컬 브라우저 프로필의 로그인 상태를 원격 브라우저로 동기화하는 별도 배포 도구 |
| AgentMail | 임시 계정용 메일함 서비스. 인증이 필요한 과제 예제에서 쓴다 |
| `browser-harness` | 설치 안내와 프로필 동기화 문서를 담은 별도 저장소이자 런타임 의존성 패키지 |

## 8. 그림 후보 (Figure Candidates)

repo 유형이라 `-figures/` 아카이브를 따로 만들지 않는다. 아래 둘은 README가 참조하는 이미지이고, Step 3.5에서 사용자가 둘 다 넣으라고 확정해 `wiki/assets/browser-use-browser-use/`에 사본을 두었다.

| id | 원본 위치 | 사본 | caption | strategy | 큐레이션 |
|---|---|---|---|---|---|
| fig01 | `static/accuracy_by_model_light.png` (PNG 2700x1350) | `assets/browser-use-browser-use/fig01.png` | "BU Bench V1 성공률, Cloud와 OSS 비교" | manual | curated (결과 절) |
| fig02 | GitHub user-attachments (GIF 830x540, 1.6MB) | `assets/browser-use-browser-use/fig02.gif` | "채용 지원서 자동 작성 데모" | manual | curated (요약 절) |
