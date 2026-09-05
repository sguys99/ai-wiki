---
title: "Browser Use — Make websites accessible for AI agents"
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

LLM이 Chromium을 Chrome DevTools Protocol로 직접 몰아 웹 과제를 끝내게 하는 MIT 라이선스 Python 패키지. star 11.2만으로 이 계열에서 가장 널리 쓰이며, 코딩 에이전트에 붙이는 CLI 스킬과 직접 코드를 짜는 라이브러리 두 갈래로 들어간다.

## 1. 자료 정보 (Document Information)

- **저장소**: <https://github.com/browser-use/browser-use>
- **조직**: browser-use (Magnus Müller · Gregor Žunič, 취리히·샌프란시스코)
- **라이선스**: MIT (클라우드 서비스는 별도 Terms of Service·Privacy Policy 적용)
- **버전**: `0.13.8` (main 기준, 수집 시각 2026-09-02)
- **요구 환경**: Python `>=3.11,<4.0`
- **규모**: star 111,981 · fork 12,312 · open issue 399 (2026-09-02 GitHub API)
- **생성·최근 푸시**: 2024-10-31 생성, 2026-09-01 푸시
- **문서·제품**: <https://docs.browser-use.com> · <https://browser-use.com> · 클라우드 <https://cloud.browser-use.com>
- **함께 보는 저장소**: [browser-use/benchmark](https://github.com/browser-use/benchmark) (BU Bench), [browser-use/browser-harness](https://github.com/browser-use/browser-harness) (설치·프로필 동기화 문서)
- **인용 정보**: Müller, Magnus and Žunič, Gregor. *Browser Use: Enable AI to control your browser*, 2024

수집한 raw에는 README 외에 `pyproject.toml`, 저장소 루트·패키지 트리, `browser_use/README.md`, `AGENTS.md`의 `<guidelines>` 블록이 verbatim으로 들어 있다. README 본문만으로는 확인되지 않는 구현 사실 대부분이 이 부록 쪽에서 나온다.

## 2. 주요 기여 (Key Contributions)

이 저장소가 파는 것은 새 방법론이 아니라 **웹을 다루는 agent loop의 기성품**이다. agent loop는 모델 호출과 도구 실행, 관찰을 반복하는 기본 순환을 말한다. 여기서는 그 순환의 한 바퀴가 "현재 페이지 상태를 LLM에 넘긴다 → 다음 action을 받는다 → 브라우저에서 실행한다"로 고정되어 있고, 사용자는 과제 문장과 LLM만 고르면 된다.

진입로가 둘로 갈린다는 점이 README 구성의 축이다. 이미 코딩 에이전트를 쓰고 있으면 `browser-use skill install`로 스킬을 등록해 그 에이전트가 브라우저를 몰게 한다. 스킬은 특정 작업 절차를 담아 에이전트에 얹는 지침 패키지다. 반대로 자기 코드 안에서 웹 자동화를 돌릴 거라면 `Agent(task=..., llm=...)` 라이브러리를 쓴다. README는 일회성 과제면 CLI, 반복 자동화면 라이브러리라는 기준을 명시한다.

LLM 공급자를 한 겹 감싼 `ChatBrowserUse`도 이 저장소 고유의 선택이다. `BROWSER_USE_API_KEY` 하나로 `openai/gpt-5.5`·`anthropic/claude-sonnet-4-6`·`google/gemini-3-pro` 같은 provider prefix 모델 id에 닿고, 자체 최적화 모델 `bu-2-0-mini-preview`와 오픈웨이트 프리뷰 `browser-use/bu-30b-a3b-preview`도 같은 인터페이스로 부른다. 브라우저 자동화에 맞춰 튜닝했고 평균 3~5배 빠르다는 것이 저자들의 주장이다.

자체 벤치마크를 저장소로 분리해 공개한 점도 기록해 둘 만하다. BU Bench V1은 실제 웹 과제 100건이고 코드가 `browser-use/benchmark`에 열려 있다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

`AGENTS.md` 첫 문단이 루프 전체를 한 문장으로 적는다. 과제를 받아 CDP로 Chromium을 움직이고, HTML을 가공하고, 다음 action을 정하려고 언어 모델에 반복 질의하며, 과제가 끝날 때까지 이를 되풀이한다.

여기서 실무자가 놓치기 쉬운 사실 하나. GitHub topics에는 `playwright`가 남아 있지만 `pyproject.toml`의 런타임 의존성 목록에 playwright는 없다. 대신 `cdp-use==1.4.5`가 들어간다. 브라우저 제어가 Playwright 같은 상위 자동화 프레임워크를 거치지 않고 Chrome DevTools Protocol을 직접 때린다는 뜻이고, 이 선택이 원격 브라우저 연결과 기존 Chrome 프로필 재사용을 쉽게 만든다.

패키지는 관심사별로 갈라져 있다. `agent/`가 루프를, `browser/`가 세션과 CDP 연결을, `dom/`이 페이지 구조 처리를, `controller/`와 `tools/`가 action 등록과 실행을 맡는다. 나머지는 주변 설비다 — `llm/`(공급자 어댑터), `mcp/`, `skills/`, `sandbox/`, `sync/`, `filesystem/`, `screenshots/`, `tokens/`, `telemetry/`, `integrations/`, `actor/`, `beta/`, 그리고 진입점 `cli.py`.

의존성 목록을 읽으면 이 에이전트가 웹에서 실제로 뭘 하는지가 드러난다. `markdownify`는 주석에 "LLM에 넘길 페이지 텍스트 추출용"이라고 적혀 있고, `pypdf`·`python-docx`·`reportlab`은 다운로드한 문서를 읽고 만들기 위한 것이며, `pyotp`는 OTP 기반 로그인을 통과하려고 들어와 있다. `bubus`가 내부 이벤트 버스, `posthog`가 텔레메트리다. `mcp`가 런타임 의존성에 있어 MCP 서버·클라이언트 연동이 선택 기능이 아니라 기본 탑재다. 파일 맨 위 `<!-- mcp-name: com.browser-use/browser-use -->` 주석과 루트의 `server.json`도 같은 방향을 가리킨다.

버전 고정 방식이 특이하다. 대부분의 의존성이 `==`로 정확히 핀되어 있다. `pydantic>=2.12.5,<2.14` 정도만 범위를 남긴다. 재현성은 좋지만 다른 패키지와 한 환경에 섞을 때 충돌 여지가 크다.

LLM 공급자는 `openai`·`anthropic`·`google-genai`·`groq`·`ollama`가 런타임 의존성으로 이미 들어와 있고, AWS Bedrock(`boto3`)과 OCI는 extras로 뺐다. 선택 extras에는 화면 녹화용 `video`, Laminar를 쓰는 `eval`, 임시 메일 계정 `agentmail`이 포함된 `examples`가 있다.

커스텀 도구는 데코레이터 한 줄로 등록한다.

```python
from browser_use import Tools

tools = Tools()

@tools.action(description='Description of what this tool does.')
def custom_tool(param: str) -> str:
    return f"Result: {param}"
```

`AGENTS.md`는 여기에 규약을 덧붙인다. 모든 내부 action 스키마와 도구 입출력은 Pydantic v2 모델로 쓰고, 반환은 가급적 구조화된 `ActionResult`로 해서 에이전트가 다음 판단을 잘 하게 만들라는 것이다. 기여자용 문서지만 확장 API의 설계 의도를 읽는 데 쓸 만하다.

CLI 진입점은 별칭이 넷이다. `browser-use`·`browseruse`·`bu`·`browser`가 전부 `browser_use.cli:main`으로 간다. `browser-use-tui`는 deprecated 별칭으로만 남아 있다.

`skills/` 아래에는 스킬 패키지가 여섯 개 들어 있다 — `browser-use`, `cloud`, `open-source`, `qa`, `remote-browser`, `x402`. 마지막 `x402`는 HTTP 402 기반 결제 프로토콜 이름이라, 에이전트가 유료 리소스를 스스로 결제하는 경로를 실험 중이라는 신호로 읽힌다. 다만 README에는 이 스킬 목록에 대한 설명이 없다.

`browser_use/README.md`는 사용자 문서가 아니라 코드 구조 규약이다. Netflix의 dispatch 저장소에서 따온 서비스 단위 레이아웃(`models.py`·`services.py`·`prompts.py`·`views.py`·`utils.py`·`routers.py`)을 쓰고, `services.py`가 500줄을 넘으면 하위 서비스로 쪼개라고 적는다. `prompts.py`를 코드 구조의 1급 파일로 세운 점이 LLM 애플리케이션다운 대목이다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

README가 제시하는 수치는 둘이다.

BU Bench V1은 실제 웹 과제 100건으로 성공률을 재고, 결과 차트가 `static/accuracy_by_model_light.png`로 저장소에 들어 있다. 벤치마크 코드는 `browser-use/benchmark`에 공개되어 있다.

차트는 막대를 Browser Use Cloud(주황)와 Open Source Library(회색) 두 계열로 나눈다. 클라우드는 Cloud v4 + Opus 4.8이 85.0%, 기본 설정이 78.0%. OSS 라이브러리는 claude opus-4-7 74.0% · bu 2-0 68.0% · gpt 5.5 66.0% · gemini 3.5-flash 65.0% · qwen 3.6plus 45.0% · deepseek v4-flash-0731 37.0% · Luna 31.0% 순이다. 클라우드 최고와 OSS 최고의 간격이 11%p라, 이 차트는 모델 비교인 동시에 유료 제품의 근거 자료다.

Odysseys 리더보드에서는 평균 87.4%로 1위이며 OpenAI·Anthropic·Google·Microsoft의 computer-use agent를 앞선다고 적는다. Odysseys는 장기 호흡 웹 과제 200건을 재는 벤치마크다.

두 수치 모두 벤더 자체 발표라는 점은 감안해야 한다. 저장소 안에는 재현 절차나 실행 로그가 없고, 리더보드 순위는 시점에 따라 바뀐다. `ChatBrowserUse`가 "평균 3~5배 빠르다"는 문장도 비교 대상과 측정 조건이 명시되지 않았다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

README가 사실상 제품 랜딩 페이지다. DOM을 어떤 형태로 직렬화해 LLM에 넘기는지, 컨텍스트 예산을 어떻게 관리하는지, 실패한 action을 어떻게 복구하는지 같은 핵심 설계는 한 줄도 없다. 그런 내용을 알려면 `docs.browser-use.com`이나 코드를 봐야 한다.

OSS와 클라우드의 경계가 기능 축으로 그어져 있다. stealth 브라우징, proxy rotation, CAPTCHA 우회, 대규모 병렬 실행, 영속 파일시스템과 메모리, 1,000개 이상의 서비스 연동은 전부 유료 쪽이다. README의 FAQ는 CAPTCHA와 프로덕션 운영 질문에 "클라우드를 쓰라"로 답한다. 로컬에서 무료로 쓸 수 있다는 말은 사실이지만, 봇 탐지가 걸린 사이트를 다루는 순간 성격이 달라진다.

`posthog`가 런타임 의존성이라 텔레메트리가 기본 수집이다. 문서에 옵트아웃 페이지 링크가 있긴 하다.

버전이 아직 `0.13.x`다. 1.0 이전이라 API가 바뀔 수 있고, 의존성 핀이 촘촘해 기존 프로젝트에 얹을 때 마찰이 생긴다.

## 6. 관련 연구 (Related Work)

- [[agents/wang-2026-cua-gym-scaling-verifiable-training-environments]] · [[agents/xlang-ai-cua-gym]] — 같은 computer-use agent 문제를 학습 데이터 쪽에서 다룬다. browser-use는 실행 스택, CUA-Gym은 검증 가능한 학습 환경 합성이라 층이 다르다
- [[evaluations/xie-2024-osworld-benchmarking-multimodal-agents-for]] — OS 전체를 무대로 삼는 벤치마크. BU Bench·Odysseys가 브라우저로 범위를 좁힌 대비를 볼 수 있다
- [[agents/lee-2026-the-agent-loop-a-survey]] — agent loop를 분석 단위로 세운 서베이. 이 저장소는 그 루프를 웹 도메인에 고정해 배포한 사례다
- [[agents/rodrigues-2026-mcp-server-architecture-patterns]] — `mcp`가 런타임 의존성으로 들어와 있어 MCP 서버 패턴과 맞물린다
- [[agents/hada-2026-agent-skills]] · [[agents/agentskills-agentskills]] — `browser-use skill install`이 겨냥하는 스킬 생태계

## 7. 용어집 (Glossary)

| 용어 | 설명 |
|---|---|
| CDP (Chrome DevTools Protocol) | Chromium을 외부에서 제어하는 저수준 프로토콜. browser-use는 Playwright를 거치지 않고 `cdp-use`로 직접 연결한다 |
| `ChatBrowserUse` | 여러 LLM 공급자를 키 하나로 감싼 이 저장소의 게이트웨이 클래스. provider prefix 모델 id와 자체 `bu-*` 모델을 같은 인터페이스로 부른다 |
| BU Bench V1 | 실제 웹 과제 100건으로 모델별 성공률을 재는 자체 벤치마크. 코드는 `browser-use/benchmark` |
| Odysseys | 장기 호흡 웹 과제 200건을 재는 외부 리더보드. README는 87.4%로 1위라고 적는다 |
| `profile-use` | 로컬 브라우저 프로필의 로그인 상태를 원격 브라우저로 동기화하는 별도 배포 도구 |
| AgentMail | 임시 계정용 메일함 서비스. 인증이 필요한 과제 예제에서 쓴다 |
| x402 | HTTP 402를 쓰는 결제 프로토콜. `skills/x402/`로 스킬 하나가 들어 있다 |

## 8. 그림 후보 (Figure Candidates)

repo 유형이라 `-figures/` 아카이브를 따로 만들지 않는다. 아래 둘은 README가 참조하는 이미지이고, Step 3.5에서 사용자가 둘 다 넣으라고 확정해 `wiki/assets/browser-use-browser-use/`에 사본을 두었다.

| id | 원본 위치 | 사본 | caption | strategy | 큐레이션 |
|---|---|---|---|---|---|
| fig01 | `static/accuracy_by_model_light.png` (PNG 2700×1350) | `assets/browser-use-browser-use/fig01.png` | "BU Bench V1 성공률 — Cloud 대 OSS" | manual | curated (결과 절) |
| fig02 | GitHub user-attachments (GIF 830×540, 1.6MB) | `assets/browser-use-browser-use/fig02.gif` | "채용 지원서 자동 작성 데모" | manual | curated (요약 절) |
