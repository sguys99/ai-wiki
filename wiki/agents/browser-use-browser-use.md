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

## 요약 (Summary)

LLM이 Chromium을 직접 몰아 웹 과제를 끝내게 하는 MIT 라이선스 Python 패키지. 페이지를 열고 버튼을 누르고 폼을 채우는 일을 사람 대신 한다. star 11.2만·fork 1.2만으로 이 계열에서 가장 널리 쓰이는 구현이다.

![[assets/browser-use-browser-use/fig02.gif]]
*"이 채용 지원서를 내 이력서와 정보로 채워줘" 과제 데모 (browser-use README)*

파는 물건은 새 방법론이 아니라 웹을 다루는 agent loop의 기성품이다. agent loop는 모델 호출과 도구 실행, 관찰을 반복하는 기본 순환을 말한다. 여기서는 그 한 바퀴가 "페이지 상태를 LLM에 넘긴다 → 다음 action을 받는다 → 브라우저에서 실행한다"로 고정돼 있어서, 쓰는 쪽은 과제 문장과 LLM만 고르면 된다.

들어가는 문이 둘이다. 이미 코딩 에이전트를 쓰고 있으면 `browser-use skill install`로 스킬을 등록해 그 에이전트가 브라우저를 몰게 한다. 스킬은 특정 작업 절차를 담아 에이전트에 얹는 지침 패키지다. 자기 코드 안에서 반복 자동화를 돌릴 거라면 `Agent(task=..., llm=...)` 라이브러리 쪽이다. README가 제시하는 기준은 단순하다 — 일회성이면 CLI, 반복이면 라이브러리.

## 주요 기여 (Key Contributions)

`ChatBrowserUse`가 이 저장소 고유의 선택이다. `BROWSER_USE_API_KEY` 키 하나로 `openai/gpt-5.5`·`anthropic/claude-sonnet-4-6`·`google/gemini-3-pro` 같은 provider prefix 모델 id에 닿고, 자체 최적화 모델 `bu-2-0-mini-preview`와 오픈웨이트 프리뷰 `browser-use/bu-30b-a3b-preview`도 같은 인터페이스로 부른다. 공급자별 키를 따로 두지 않아도 되는 구조다.

벤치마크를 별도 저장소로 열어 둔 점도 함께 볼 만하다. BU Bench V1은 실제 웹 과제 100건이고 코드가 `browser-use/benchmark`에 공개돼 있다.

## 방법론 및 아키텍처 (Methodology and Architecture)

`AGENTS.md` 첫 문단이 루프를 한 문장으로 적는다. 과제를 받아 CDP로 Chromium을 움직이고, HTML을 가공하고, 다음 action을 정하려고 언어 모델에 반복 질의하며, 과제가 끝날 때까지 되풀이한다.

실무자가 놓치기 쉬운 사실이 하나 있다. GitHub topics에는 `playwright`가 붙어 있지만 `pyproject.toml`의 런타임 의존성에 playwright는 없다. 대신 `cdp-use==1.4.5`가 들어간다. 브라우저 제어가 상위 자동화 프레임워크를 거치지 않고 Chrome DevTools Protocol을 직접 때린다는 뜻이고, 원격 브라우저 연결과 기존 Chrome 프로필 재사용이 쉬워지는 이유이기도 하다.

패키지는 관심사별로 갈라져 있다. `agent/`가 루프를, `browser/`가 세션과 CDP 연결을, `dom/`이 페이지 구조 처리를, `controller/`와 `tools/`가 action 등록과 실행을 맡는다. 그 옆에 `llm/`·`mcp/`·`skills/`·`sandbox/`·`sync/`·`filesystem/`·`tokens/`·`telemetry/`가 붙고 진입점이 `cli.py`다.

의존성 목록이 이 에이전트의 실제 행동 범위를 드러낸다. `markdownify`는 주석에 "LLM에 넘길 페이지 텍스트 추출용"이라고 적혀 있고, `pypdf`·`python-docx`·`reportlab`은 내려받은 문서를 읽고 만들기 위한 것이며, `pyotp`는 OTP 로그인을 통과하려고 들어와 있다. `mcp`가 런타임 의존성이라 MCP 연동은 선택 기능이 아니라 기본 탑재다. 대부분의 의존성이 `==`로 정확히 핀돼 있어 재현성은 좋지만 다른 패키지와 한 환경에 섞을 때 충돌 여지가 크다.

커스텀 도구는 데코레이터 한 줄로 등록한다.

```python
from browser_use import Tools

tools = Tools()

@tools.action(description='Description of what this tool does.')
def custom_tool(param: str) -> str:
    return f"Result: {param}"
```

`AGENTS.md`가 여기 규약을 덧붙인다. 내부 action 스키마와 도구 입출력은 Pydantic v2 모델로 쓰고, 반환은 구조화된 `ActionResult`로 해서 에이전트가 다음 판단을 잘 하게 만들라는 것이다. 기여자용 문서지만 확장 API의 설계 의도를 읽는 데 쓸 만하다.

CLI 진입점은 `browser-use`·`browseruse`·`bu`·`browser` 넷이 전부 같은 함수로 간다. `skills/` 아래에는 `browser-use`·`cloud`·`open-source`·`qa`·`remote-browser`·`x402` 여섯 개 스킬 패키지가 들어 있다. 마지막 `x402`는 HTTP 402 기반 결제 프로토콜 이름이라 에이전트가 유료 리소스를 스스로 결제하는 경로를 실험 중이라는 신호로 읽히는데, README에는 이 목록에 대한 설명이 없다.

`browser_use/README.md`는 사용자 문서가 아니라 코드 구조 규약이다. Netflix dispatch에서 따온 서비스 단위 레이아웃(`models.py`·`services.py`·`prompts.py`·`views.py`·`routers.py`)을 쓰고 `services.py`가 500줄을 넘으면 쪼개라고 적는다. `prompts.py`를 1급 파일로 세운 대목이 LLM 애플리케이션답다.

## 결과 (Results)

README가 제시하는 수치는 둘이다. 하나는 BU Bench V1 성공률 차트이고, 다른 하나는 Odysseys 리더보드 평균 87.4% 1위다. Odysseys는 장기 호흡 웹 과제 200건을 재는 벤치마크이며 OpenAI·Anthropic·Google·Microsoft의 computer-use agent를 앞선다고 적는다.

차트를 읽을 때 주의할 점이 있다. 막대가 모델별로만 늘어선 게 아니라 주황(Browser Use Cloud)과 회색(Open Source Library) 두 계열로 갈려 있다. 클라우드 쪽이 Cloud v4 + Opus 4.8로 85.0%, 기본 설정으로 78.0%다. OSS 라이브러리 쪽 최고는 claude opus-4-7의 74.0%이고 그 아래로 자체 모델 bu 2-0이 68.0%, gpt 5.5가 66.0%, gemini 3.5-flash가 65.0%, qwen 3.6plus 45.0%, deepseek v4-flash-0731 37.0%, Luna 31.0% 순이다. 같은 벤치마크에서 클라우드 최고와 OSS 최고의 간격이 11%p라는 뜻이라, 이 차트는 모델 비교표인 동시에 유료 제품의 근거 자료이기도 하다.

![[assets/browser-use-browser-use/fig01.png]]
*BU Bench V1 성공률. 주황이 Browser Use Cloud, 회색이 OSS 라이브러리다 (browser-use README, `static/accuracy_by_model_light.png`)*

둘 다 벤더 자체 발표다. 저장소 안에 재현 절차나 실행 로그가 없고 리더보드 순위는 시점에 따라 바뀐다. `ChatBrowserUse`가 "평균 3~5배 빠르다"는 문장도 비교 대상과 측정 조건이 없다. 인용할 때는 출처를 README 주장으로 명시하는 편이 안전하다.

## 한계 (Limitations)

README가 사실상 제품 랜딩 페이지다. DOM을 어떤 형태로 직렬화해 LLM에 넘기는지, 컨텍스트 예산을 어떻게 관리하는지, 실패한 action을 어떻게 복구하는지 같은 핵심 설계는 한 줄도 없다. 그 부분은 `docs.browser-use.com`이나 코드를 봐야 한다.

OSS와 클라우드의 경계는 기능 축으로 그어져 있다. stealth 브라우징, proxy rotation, CAPTCHA 우회, 대규모 병렬 실행, 영속 파일시스템과 메모리, 1,000개 이상의 서비스 연동은 유료 쪽이다. FAQ는 CAPTCHA 질문과 프로덕션 운영 질문에 모두 "클라우드를 쓰라"로 답하고, 저장소에 들어 있는 벤치마크 차트 자체가 그 격차를 85.0% 대 74.0%로 보여준다. 무료로 쓸 수 있다는 말은 사실이되, 봇 탐지가 걸린 사이트를 다루는 순간 성격이 달라진다.

`posthog`가 런타임 의존성이라 텔레메트리는 기본 수집이고 문서에 옵트아웃 링크가 있다. 버전은 아직 `0.13.8`로 1.0 이전이라 API 변동을 감안해야 한다.

## 관련 페이지 (Related Pages)

- [[agents/browser-use-browsercode]] — 같은 조직이 OpenCode를 fork해 만든 코딩 에이전트. 고정된 agent loop 대신 `browser_execute(code)` 하나로 JavaScript를 CDP에 흘려보내는 반대 설계이며, 같은 BU Bench V1에서 Opus 4.8 기준 89.5%를 적는다
- [[agents/wang-2026-cua-gym-scaling-verifiable-training-environments]] — 같은 computer-use agent 문제를 학습 데이터 쪽에서 다룬다. 이쪽이 실행 스택이라면 CUA-Gym은 검증 가능한 학습 환경 합성이다
- [[agents/xlang-ai-cua-gym]] — 그 논문의 공식 구현체
- [[evaluations/xie-2024-osworld-benchmarking-multimodal-agents-for]] — OS 전체를 무대로 삼는 벤치마크. BU Bench와 Odysseys가 브라우저로 범위를 좁힌 대비를 볼 수 있다
- [[agents/lee-2026-the-agent-loop-a-survey]] — agent loop를 분석 단위로 세운 서베이. 이 저장소는 그 루프를 웹 도메인에 고정해 배포한 사례다
- [[agents/rodrigues-2026-mcp-server-architecture-patterns]] — `mcp`가 런타임 의존성이라 MCP 서버 패턴과 맞물린다
- [[agents/hada-2026-agent-skills]] · [[agents/agentskills-agentskills]] — `browser-use skill install`이 겨냥하는 스킬 생태계
