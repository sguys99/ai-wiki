---
title: "Headroom: The context compression layer for AI agents"
type: repo
year: 2026
category: agents
source: headroomlabs-ai-headroom.md
raw_path: raw/repos/headroomlabs-ai-headroom.md
raw_filename: "headroomlabs-ai-headroom.md"
source_collection: external
org: "headroomlabs-ai"
repo: "headroom"
url: "https://github.com/headroomlabs-ai/headroom"
canonical_repo: "https://github.com/chopratejas/headroom"
license: "Apache-2.0"
tags:
  - context-compression
  - token-reduction
  - ai-agents
  - proxy
  - mcp
  - cross-agent-memory
  - ccr
  - reversible-compression
  - cache-alignment
  - smartcrusher
  - codecompressor
  - kompress-v2-base
  - output-token-reduction
  - claude-code
  - local-first
---

# Headroom: The context compression layer for AI agents

## 요약

Headroom은 AI 에이전트가 읽어들이는 모든 텍스트를 LLM에 도달하기 전에 압축하는 context compression layer다. context compression layer는 모델과 애플리케이션 사이에 놓여 오가는 텍스트의 양만 줄이고 의미는 유지하려는 중간 계층을 뜻한다. 압축 대상은 tool 출력과 로그, RAG 청크, 파일 내용, 대화 이력 전체다. README는 같은 답을 얻으면서 토큰을 60~95% 줄인다고 주장하며, 대표 예시로 로그 10,144 토큰을 1,260 토큰으로 줄여도 동일한 FATAL 항목을 찾아냈다는 데모를 제시한다.

이 저장소가 다른 압축 도구와 갈라지는 지점은 세 가지다. 첫째, 콘텐츠 유형마다 다른 압축기를 쓴다. 둘째, 압축한 원본을 로컬에 남겨 두어 모델이 필요할 때 되돌릴 수 있다. 셋째, 보내는 프롬프트만이 아니라 모델이 되돌려 쓰는 출력까지 줄인다.

전부 사용자 머신에서 실행되는 local-first 설계다. local-first는 데이터 원본을 사용자 디스크에 두고 서버 없이 동작하는 설계를 말한다. 라이선스는 Apache 2.0이고, 저장소의 모든 코드가 오픈소스로 유지된다고 명시돼 있다.

> **저장소 경로 주의**: 이 wiki가 수집한 URL은 `headroomlabs-ai/headroom`이지만, README 본문의 `docker pull ghcr.io/chopratejas/headroom:latest`과 `git clone https://github.com/chopratejas/headroom.git` 안내는 모두 `chopratejas/headroom`을 가리킨다. 앞의 경로는 조직 미러나 vanity 경로로 보이고 정본은 뒤의 경로로 판단된다. README에 배지나 CI 설정은 실려 있지 않으므로 이 판단의 근거는 Docker 이미지 경로와 clone 주소 두 가지다. 조직 단위 배포 문의 주소로는 `hello@headroomlabs.ai`가 안내된다. 공식 문서 사이트 주소는 이 README에 없고, 그 주소를 안내하는 것은 형제 자료 [[agents/9bow-2026-headroom-ai-agent-context-compression]]이다.

## 배경

에이전트의 토큰 비용은 입력과 출력 두 방향에서 함께 발생한다. Headroom은 이 두 방향을 별개 문제로 구분해 다룬다.

### 입력 측 문제

에이전트가 한 턴에 읽어들이는 텍스트는 사람이 작성한 프롬프트보다 기계가 만든 텍스트가 훨씬 많다. README가 압축 대상으로 꼽는 목록이 그 구성을 보여 준다. tool을 호출해 돌아온 JSON 응답, 명령 실행 로그, RAG가 가져온 청크, 읽어들인 파일, 그리고 누적된 대화 이력이다. 이 텍스트는 대개 정보 밀도가 낮다. 코드 검색 결과 100건의 원본 크기가 17,765 토큰이라는 README 수치가 그 예다.

여기서 압축 대상이 되는 것은 context window의 사용량이다. context window는 모델이 한 번에 받아들일 수 있는 토큰 길이 한도를 뜻한다. Headroom은 검색 품질을 개선해 읽을 양을 줄이는 접근이 아니라, 이미 확보된 텍스트를 그대로 받아 부피만 줄이는 접근을 택한다.

### 출력 측 문제

입력을 줄여도 모델이 되돌려 쓰는 토큰 비용은 남는다. README는 Opus급 모델에서 출력 토큰이 입력 토큰의 5배 비용이라는 점을 근거로 이 방향의 절감을 별도 기능으로 분리했다.

README가 낭비로 분류하는 출력은 세 종류다. "Great, let me..." 같은 도입부 인사, 이미 입력에 있는 코드를 다시 출력하는 것, 그리고 판단이 거의 필요 없는 단순 단계에서까지 깊게 수행되는 thinking이다. 이 세 가지는 답의 정확성에 기여하지 않으면서 출력 토큰을 소비한다.

## 핵심 개념

Headroom의 문서를 읽는 데 필요한 개념 다섯 가지를 먼저 정리한다.

**콘텐츠 인지 압축(content-aware compression)**은 입력을 하나의 압축기로 일괄 처리하지 않고, 유형을 먼저 판별한 뒤 유형별 압축기로 넘기는 방식이다. JSON에서 안전하게 지울 수 있는 것과 코드에서 안전하게 지울 수 있는 것이 다르기 때문에, 손실을 유형별로 다르게 다룬다는 발상이다.

**CCR(reversible compression)**은 압축 원본을 로컬에 캐시해 두고 모델이 요청하면 되돌려 주는 구조다. 손실 압축은 필요한 세부까지 지울 위험이 있는데, 이를 되불러오기로 보완한다. 되불러올 수 있는 기간은 설정된 TTL 안으로 한정된다.

**캐시 정렬(cache alignment)**은 요청 앞부분의 prefix를 안정된 형태로 유지해 제공자 측 KV 캐시가 실제로 hit 하도록 맞추는 처리다. 압축이 매 요청마다 prefix를 바꿔 놓으면 캐시가 무효화되어 절감분보다 손실이 커질 수 있으므로, 압축과 캐시를 함께 고려한다.

**compaction**은 길어진 대화 이력을 요약으로 접어 context 한계 안에서 세션을 이어가는 처리다. 제공자가 자체 제공하는 기능이며, README는 Headroom을 이와 비교 대상으로 세운다.

**counterfactual 절감**은 모델이 압축 없이 원래 무엇을 썼을지 알 수 없는 상황에서 계산하는 절감치를 말한다. 출력 절감은 이 성질을 갖기 때문에 단정된 수치가 아니라 신뢰구간이 붙은 추정치로 보고된다.

## 방법

### 요청 lifecycle

`compress()` 직접 호출과 SDK 경유, proxy 경유가 모두 같은 요청 lifecycle을 공유한다. 도입 형태를 바꿔도 처리 순서는 동일하다는 뜻이다.

```
Setup → Pre-Start → Post-Start → Input Received → Input Cached
→ Input Routed → Input Compressed → Input Remembered → Pre-Send → Post-Send → Response Received
```

이름이 처리 순서를 그대로 드러낸다. 입력을 받고(Input Received), 캐시 정렬을 적용하고(Input Cached), 유형을 판별해 라우팅하고(Input Routed), 압축하고(Input Compressed), 메모리에 기록한(Input Remembered) 뒤 제공자로 보낸다(Pre-Send, Post-Send).

lifecycle에 `Input Remembered` 단계가 들어 있다는 점도 눈여겨볼 만하다. 압축과 메모리 기록이 별개 기능이 아니라 같은 요청 처리 흐름 안에 나란히 배치돼 있다는 뜻이며, 뒤에서 설명할 cross-agent memory가 이 단계에 대응한다.

구현은 역할별로 세 층으로 나뉜다.

| 층 | 담당 | 구성 |
|---|---|---|
| Transform | 실제 변환 작업 | CacheAligner, ContentRouter, SmartCrusher, CodeCompressor, Kompress-v2-base |
| Pipeline extension | 각 단계 관찰과 변경 | `on_pipeline_event(...)` |
| Provider 계층 | 제공자와 도구별 특수 처리 | `headroom/providers/` 아래 claude, copilot, codex, openclaw, gemini, `registry.py` |

이 분리 덕분에 코어는 lifecycle과 실행 순서, 적용 규칙만 담당하고 제공자별 예외 처리는 바깥으로 빠진다.

### 콘텐츠 인지 압축기

`ContentRouter`가 입력의 콘텐츠 유형을 판별해 알맞은 압축기를 고른다. 압축기는 네 종류다.

| 압축기 | 대상 | 처리 방식 | 대상 범위 |
|---|---|---|---|
| SmartCrusher | JSON | 구조를 인지한 범용 압축 | dict 배열, 중첩 객체, 혼합 타입 |
| CodeCompressor | 코드 | AST 인지 압축 | Python, JS/TS, Go, Rust, Java, C/C++, Perl |
| Kompress-v2-base | 산문 | 학습된 HuggingFace 모델 | 에이전트 trace로 학습 |
| Image compression | 이미지 | 학습된 ML 라우터 | 40~90% 축소 |

산문 압축기 Kompress-v2-base가 에이전트 trace로 학습됐다는 점은 설계 의도를 보여 준다. 일반 문서가 아니라 에이전트가 실제로 주고받는 텍스트 분포에 맞춘 모델이라는 뜻이다.

### 캐시 정렬과 되돌릴 수 있는 압축

압축 전후에 두 가지 보호 장치가 붙는다.

`CacheAligner`는 압축보다 앞에서 동작한다. prefix를 안정화해 Anthropic과 OpenAI의 KV 캐시가 실제로 hit 하도록 맞춘다. 압축을 적용했다가 캐시 hit을 잃어 총비용이 오르는 상황을 방지하기 위한 단계다.

CCR은 압축 뒤에 동작한다. 압축된 프롬프트를 제공자로 보내면서 원본은 로컬에 남기고, 모델이 원문을 필요로 하면 `headroom_retrieve` tool을 호출해 되불러온다. 즉 모델 쪽에서 보면 압축된 요약을 먼저 받고, 부족하면 스스로 원문을 요청할 수 있는 구조다.

### 세 가지 도입 형태

같은 압축 파이프라인을 세 가지 방식으로 도입할 수 있다. 코드 수정 범위와 적용 대상이 다르다.

| 도입 형태 | 진입점 | 코드 변경 | 적용 범위 |
|---|---|---|---|
| Library | Python `compress(messages)`, TypeScript `await compress(messages, { model })` | 필요 | 호출한 지점만 |
| Proxy | `headroom proxy --port 8787` | 없음 | OpenAI 호환 클라이언트 전부, 언어 무관 |
| Agent wrap | `headroom wrap claude` 등 | 없음 | 감싼 코딩 에이전트 전체 |
| MCP 서버 | `headroom mcp install` | 없음 | MCP 클라이언트 전부 |

proxy 방식이 코드 변경 없이 동작하는 근거는 OpenAI 호환 인터페이스다. 클라이언트가 보던 API 형태를 그대로 유지한 채 요청 경로만 로컬 proxy로 바꾸므로, 애플리케이션 코드는 자신이 압축 계층을 거친다는 사실을 알 필요가 없다.

MCP 서버는 tool 세 개를 노출한다. `headroom_compress`가 압축을 수행하고, `headroom_retrieve`가 CCR로 원문을 되불러오며, `headroom_stats`가 통계를 보고한다.

### 출력 토큰 절감

출력 절감은 proxy에서만 동작하며 두 기법으로 구성된다. 기본값은 off라 `HEADROOM_OUTPUT_SHAPER=1`로 켠 뒤 proxy를 실행해야 한다.

| 기법 | 동작 | 적용 조건 |
|---|---|---|
| Verbosity steering | system prompt 끝에 "간결하게 쓰고 컨텍스트를 복창하지 말라"는 짧은 지시를 덧붙인다 | 상시. 프롬프트 끝에 붙이므로 프롬프트 캐시는 유지된다 |
| Effort routing | 모델의 thinking effort를 낮춘다 | tool 결과 이후의 재개 턴에만 적용. 새 질문이나 오류에는 full effort 유지 |

verbosity steering의 배치 위치가 설계 요점이다. 지시를 system prompt 앞이 아니라 끝에 덧붙이기 때문에 앞부분 prefix가 바뀌지 않아 캐시 hit이 유지된다. effort routing은 조건을 좁게 잡는다. 파일 읽기나 테스트 통과처럼 결과를 확인만 하고 이어가는 턴에서만 effort를 내리고, 새 질문과 오류 상황은 건드리지 않는다.

적절한 간결함 수준은 학습으로 정할 수도 있다. `headroom learn --verbosity`가 dry run으로 무엇을 찾았는지 먼저 보여 주고, `--apply`로 저장하면 이후 proxy가 그 설정을 사용한다.

### 메모리와 학습 루프

Headroom은 압축과 별개로 메모리 계층을 함께 제공한다.

cross-agent memory는 Claude, Codex, Gemini가 공유하는 저장소다. 어느 에이전트가 남긴 항목인지 agent provenance로 구분하고 중복은 자동 dedup으로 정리한다. 멀티에이전트 워크플로에서는 `SharedContext().put`과 `.get`으로 압축된 컨텍스트를 에이전트 사이에 전달한다.

`headroom learn`은 실패한 세션을 마이닝해 교정 사항을 메모리 파일에 기록한다. Claude, Codex, Gemini용 플러그인 기반이다. 기본 기록 대상은 `CLAUDE.local.md`이며 gitignore 대상이라 개인 파일로 남는다. `--target CLAUDE.md`를 지정하면 팀 공유 파일에 기록하고, `AGENTS.md`나 `GEMINI.md`도 대상이 될 수 있다.

## 도입과 운영

### 빠른 시작 절차

README는 도입을 세 단계로 안내한다. 설치, 도입 형태 선택, 확인 순서다.

```bash
# 1 설치
pip install "headroom-ai[all]"

# 2 도입 형태 선택
headroom wrap claude                    # 코딩 에이전트 감싸기
headroom proxy --port 8787              # proxy 방식. 코드 변경 없음
# 또는 from headroom import compress    # 라이브러리 방식

# 3 설정 확인과 절감 확인
headroom doctor
headroom perf
headroom dashboard
```

세 번째 단계가 따로 마련돼 있다는 점이 실무에서는 중요하다. 압축 계층은 잘못 붙으면 트래픽이 그대로 통과해 버려도 겉으로는 정상 동작처럼 보인다. `headroom doctor`는 라우팅이 실제로 동작하는지 확인하는 헬스 체크이고, `headroom dashboard`는 절감 현황을 실시간으로 보여 준다. 다만 대시보드는 proxy가 실행 중일 때만 동작한다.

### 설치와 확장 옵션

Python 3.10 이상이 필요하다. CLI는 PyPI 패키지에만 포함되며 npm 패키지는 TypeScript SDK로 라이브러리만 제공한다.

```bash
pip install "headroom-ai[all]"          # 파이썬. headroom CLI 포함
npm install headroom-ai                 # TypeScript SDK. CLI 없음
docker pull ghcr.io/chopratejas/headroom:latest
```

extras는 잘게 나뉘어 있어 필요한 것만 설치할 수 있다.

| 구분 | extras | 비고 |
|---|---|---|
| 도입 형태 | `[proxy]`, `[mcp]` | proxy와 MCP 서버 |
| 압축 기능 | `[ml]`, `[code]`, `[image]`, `[relevance]` | 모델 기반 압축과 코드, 이미지 처리 |
| 메모리와 검색 | `[memory]`, `[vector]` | `[vector]`는 선택적 HNSW 백엔드로 C++ 툴체인이 필요하다 |
| 평가와 가속 | `[evals]`, `[pytorch-mps]` | 벤치마크 재현과 Apple Silicon 가속 |
| 프레임워크 어댑터 | `[langchain]`, `[agno]`, `[strands]`, `[anyllm]`, `[bedrock]` | `[all]`에 포함되지 않아 따로 설치한다 |

`[all]`이 코어 스택만 덮고 프레임워크 어댑터를 제외한다는 점을 놓치기 쉽다. LangChain이나 Agno를 쓰려면 `pip install "headroom-ai[langchain]"` 형태로 추가 설치해야 한다.

### 에이전트 호환성

`headroom wrap {tool}` 한 줄로 감싸는 방식이 기본이다. 도구마다 감싸는 방법이 다르다.

| 에이전트 | wrap 지원 | 동작 |
|---|---|---|
| Claude Code | 지원 | `--memory`, `--code-graph`, `--1m`, `--tool-search` 옵션 제공 |
| Codex | 지원 | Claude와 메모리 공유 |
| Aider, Copilot CLI, Goose, OpenHands, Mistral Vibe | 지원 | proxy를 띄우고 바로 실행 |
| OpenCode | 지원 | 설정 주입 후 proxy를 띄우고 실행 |
| Cline, Continue | 지원 | proxy를 띄우고 설정 주입 |
| OpenClaw | 지원 | ContextEngine 플러그인으로 설치 |
| Cursor | 수동 설정 | proxy를 띄우고 base URL을 출력해 사용자가 설정에 입력 |
| Cortex Code | library 모드만 | wrap 없이 60~65% 절감 |

되돌리는 `headroom unwrap {tool}`은 지원 범위가 더 좁다. `claude`, `copilot`, `codex`, `opencode`, `openclaw` 다섯 개만 지원한다. 표에 없는 OpenAI 호환 클라이언트는 `headroom proxy`로 연결하면 동작한다.

### 프레임워크 연동

라이브러리로 쓸 때의 진입점은 스택별로 정리돼 있다.

| 스택 | 연결 방법 |
|---|---|
| 임의의 Python 앱 | `compress(messages, model=...)` |
| 임의의 TypeScript 앱 | `await compress(messages, { model })` |
| Anthropic 또는 OpenAI SDK | `withHeadroom(new Anthropic())`, `withHeadroom(new OpenAI())` |
| Vercel AI SDK | `wrapLanguageModel({ model, middleware: headroomMiddleware() })` |
| LiteLLM | `litellm.callbacks = [HeadroomCallback()]` |
| LangChain | `HeadroomChatModel(your_llm)` |
| Agno | `HeadroomAgnoModel(your_model)` |
| Strands | 별도 가이드 안내 |
| ASGI 앱 | `app.add_middleware(CompressionMiddleware)` |
| 멀티에이전트 | `SharedContext().put`과 `.get` |
| MCP 클라이언트 | `headroom mcp install` |

### 운영 명령

설치 확인부터 절감 계측, 업그레이드까지 CLI로 처리한다.

| 명령 | 용도 |
|---|---|
| `headroom doctor` | 헬스 체크. 라우팅이 동작하는지 확인한다 |
| `headroom perf` | 성능 측정 |
| `headroom dashboard` | 절감 현황 실시간 확인. proxy가 실행 중이어야 한다 |
| `headroom output-savings` | 출력 절감 추정치 보고 |
| `headroom learn --verbosity` | 간결함 수준 학습. `--apply`로 저장 |
| `headroom update` | pip, pipx, uv tool 중 설치 수단을 감지해 그 자리에서 업그레이드 |
| `headroom update --check` | 업그레이드 없이 최신 릴리스만 보고 |
| `headroom update --pre` | pre-release 포함 |

proxy는 시작할 때 업데이트 알림을 한 줄 표시한다. PyPI 확인은 하루 한 번을 넘지 않고 백그라운드로 수행되며 시작을 지연시키지 않는다. 알림이 불필요하면 `HEADROOM_UPDATE_CHECK=off`로 끈다.

설정 변경은 재시작 없이 반영된다. `headroom wrap`이 실행 중인 proxy에 loopback `POST /admin/runtime-env`로 현재 설정을 즉시 동기화한다.

### GitHub Copilot subscription 모드

Copilot CLI는 구독 트래픽을 로컬 proxy로 통과시키는 별도 경로가 있다.

```bash
headroom copilot-auth login
headroom wrap copilot --subscription -- --model gpt-4o
```

동작 원리는 토큰 교환이다. Headroom이 보관한 재사용 가능한 GitHub OAuth 토큰을 Copilot의 짧은 수명 API 토큰으로 교환한 뒤, 동일한 proxy 압축 파이프라인을 적용한다. GitHub Enterprise Server나 커스텀 도메인 배포에서는 `GITHUB_COPILOT_ENTERPRISE_DOMAIN`을 설정한다.

### 사내망과 TLS 검사 환경

SSL 검사를 거는 사내망에서는 설치와 실행 양쪽에서 인증서 문제가 발생할 수 있다. README가 원인별 대응을 구분해 안내한다.

| 증상 | 원인 | 대응 |
|---|---|---|
| `pip install`이 `CERTIFICATE_VERIFY_FAILED`로 실패 | 네트워크가 사내 CA로 SSL 검사를 수행 | Rust를 먼저 설치해 `maturin`이 신뢰할 수 없는 연결로 `rustup`을 내려받지 않게 하거나, `pip install --only-binary headroom-ai headroom-ai`로 prebuilt wheel 사용 |
| 런타임 자산 다운로드 실패 | `cdn.pyke.io`(Rust 코어용 ONNX Runtime)와 `huggingface.co`(압축 모델)를 TLS로 받아 온다 | `REQUESTS_CA_BUNDLE`, `SSL_CERT_FILE`, `CURL_CA_BUNDLE`로 사내 CA 신뢰. 또는 오프라인 모드 `HF_HUB_OFFLINE=1`, `ORT_STRATEGY=system` |
| Python 3.13 이상에서 "Basic Constraints of CA cert not marked critical" | `VERIFY_X509_STRICT`가 RFC 5280 4.2.1.9를 강제 | `HEADROOM_TLS_STRICT=0`. Headroom이 제어하는 TLS 컨텍스트에서 엄격 플래그만 해제되고 체인, 서명, 만료, 호스트명 검사는 유지된다 |

prebuilt wheel은 win_amd64, Linux x86_64와 aarch64, macOS Apple Silicon용으로 배포된다.

## 결과

### 실제 워크로드 절감

README는 에이전트가 실제로 처리하는 네 가지 작업에서 압축 전후 토큰을 제시한다.

| 워크로드 | Before | After | 절감 |
|---|---:|---:|---:|
| Code search (100 results) | 17,765 | 1,408 | 92% |
| SRE incident debugging | 65,694 | 5,118 | 92% |
| GitHub issue triage | 54,174 | 14,761 | 73% |
| Codebase exploration | 78,502 | 41,254 | 47% |

절감률이 47%에서 92%까지 벌어진다는 점이 중요하다. 코드 검색 결과와 로그처럼 반복 구조가 뚜렷한 입력에서는 92%까지 줄어들지만, 코드베이스 탐색처럼 서로 다른 파일 내용이 이어지는 입력에서는 47%에 머문다. 따라서 앞서 인용한 60~95% 범위는 워크로드 성격에 따라 폭이 크게 달라지는 값으로 읽어야 한다.

### 벤치마크 정확도 보존

압축이 답을 바꾸지 않는지 표준 벤치마크로 확인한 결과다. 네 벤치마크 모두 N=100이다.

| 벤치마크 | 범주 | Baseline | Headroom | Delta |
|---|---|---:|---:|---|
| GSM8K | Math | 0.870 | 0.870 | ±0.000 |
| TruthfulQA | Factual | 0.530 | 0.560 | +0.030 |
| SQuAD v2 | QA | 미기재 | 97% | 19% 압축 |
| BFCL | Tools | 미기재 | 97% | 32% 압축 |

GSM8K는 변화가 없고 TruthfulQA는 0.530에서 0.560으로 0.030 올랐다. SQuAD v2와 BFCL은 baseline 칸이 비어 있어 압축 전후 비교가 아니라 해당 압축률에서의 정확도만 보고한 값이다. 즉 이 두 항목은 정확도가 유지됐다는 근거로 쓰기에 정보가 부족하다. N이 100이라는 점도 함께 고려해야 한다. 재현 명령은 `python -m headroom.evals suite --tier 1`이다.

### 출력 절감 계측

출력 절감은 입력 절감과 계측 방식이 다르다. 모델이 압축 없이 원래 무엇을 썼을지 알 수 없는 counterfactual이기 때문이다. Headroom은 이 점을 인정하고 신뢰구간을 붙인 추정치로 보고한다.

```bash
headroom output-savings
# Reduction: 31.7%  (95% CI 27.7% ... 35.7%)   [estimated]
```

`[estimated]` 표시가 붙는 이유가 여기에 있다. 측정값을 원한다면 대화의 10%를 압축하지 않고 남기는 control group을 켜면 된다(`HEADROOM_OUTPUT_HOLDOUT=0.1`). 이 경우 압축한 대화와 압축하지 않은 대화를 직접 비교할 수 있다.

## 경쟁 도구 비교

README는 "Compared to" 절에서 네 도구와 자신을 나란히 세운다.

| 도구 | 스코프 | 배포 | 로컬 | 가역 |
|---|---|---|---|---|
| Headroom | 모든 컨텍스트(tool, RAG, 로그, 파일, 이력) | proxy, library, middleware, MCP | Yes | Yes |
| RTK | CLI 명령 출력 | CLI wrapper | Yes | No |
| lean-ctx | CLI 명령, MCP tool, editor rule | CLI wrapper, MCP | Yes | No |
| Compresr, Token Co. | 자사 API로 보낸 텍스트 | hosted API 호출 | No | No |
| OpenAI Compaction | 대화 이력 | provider-native | No | No |

README는 이 표를 근거로 스코프, 배포 방식, 로컬 실행, 가역성 네 항목 모두에서 앞선다고 주장한다. 다만 저장소가 직접 작성한 비교표이므로 독립 검증은 아니라는 점을 감안해야 한다.

표의 스코프 열이 차이를 가장 뚜렷하게 보여 준다. RTK는 CLI 명령 출력만, lean-ctx는 CLI 명령과 MCP tool, editor rule까지, OpenAI Compaction은 대화 이력만 다룬다. 반면 Headroom은 tool 출력과 RAG 결과, 로그, 파일, 이력을 모두 대상으로 삼는다. 가역 열에서는 Headroom만 Yes이고 나머지 넷은 전부 No다. 로컬 열은 Headroom과 RTK, lean-ctx 셋이 Yes이고, 자사 API로 텍스트를 보내는 hosted 방식 둘은 No다.

경쟁 관계와 보완 관계가 함께 있다는 점도 attribution 절에 명시돼 있다. Headroom은 shell 출력 재작성에 RTK 바이너리를 포함해 배포하고, `HEADROOM_CONTEXT_TOOL=lean-ctx`로 lean-ctx를 CLI context tool 자리에 대신 둘 수도 있다.

## 도입 판단 기준

README가 적합한 경우와 그렇지 않은 경우를 직접 밝힌다.

| 판단 | 조건 |
|---|---|
| 적합 | AI 코딩 에이전트를 매일 쓰면서 코드 변경 없이 절감을 원한다 |
| 적합 | 여러 에이전트를 함께 쓰면서 공유 메모리가 필요하다 |
| 적합 | 되돌릴 수 있는 압축이 필요하다. 설정된 TTL 안에서 CCR로 원본을 되불러올 수 있다 |
| 부적합 | 단일 제공자의 네이티브 compaction만 쓰고 cross-agent memory가 필요 없다 |
| 부적합 | 로컬 프로세스를 실행할 수 없는 sandbox 환경이다 |

두 번째 부적합 조건은 local-first 설계의 직접적인 결과다. 압축을 로컬 프로세스에서 수행하므로 그 프로세스를 띄울 수 없는 환경에서는 구조적으로 사용할 수 없다.

## 한계

- **플랫폼 검증 편차**: Copilot subscription 모드의 인증 재사용은 macOS Keychain에서만 smoke-test를 거쳤다. Windows Credential Manager, Linux Secret Service, Docker와 CI 경로는 OS 검증이 남아 있다. 그래서 Docker와 CI에서는 host keychain에 기대지 말고 `GITHUB_COPILOT_TOKEN`을 명시적으로 넘기라고 권한다.
- **런타임 자산의 외부 의존**: ONNX Runtime과 압축 모델을 외부 호스트에서 TLS로 내려받는다. local-first를 내세우지만 초기 자산 확보에는 네트워크가 필요하고, SSL 검사 환경에서는 별도 설정이 요구된다.
- **출력 셰이핑 기본 off**: `HEADROOM_OUTPUT_SHAPER=1`을 직접 설정해야 동작한다. 기본 설치 상태에서는 출력 절감이 적용되지 않는다.
- **벤치마크 근거의 한계**: N이 100이고, 네 벤치마크 중 둘은 baseline이 비어 있다. 워크로드 절감 수치와 비교표도 저장소가 자체 측정하고 자체 작성한 값이다.
- **압축 손실 조건 미기재**: README가 벤치마크 방법론과 압축 손실의 세부 조건을 싣지 않았다. 따라서 압축 손실이 long-context나 다국어, 특정 도메인에서 어떻게 달라지는지는 이 저장소 자료만으로 판단할 수 없다.

## 라이선스와 상용 지원

Headroom OSS는 개인 개발자를 대상으로 하며 local-first, 무료, Apache 2.0이다. 조직 단위 배포에 필요한 기능은 별도 제공 항목으로 구분돼 있다. 상시 실행되는 공유 배포, 중앙 집중 설정, 절감 대시보드, SSO, air-gapped와 VPC 설치가 그 목록이다. 이 항목은 지원이 포함된 self-hosted 형태나 완전 관리형으로 제공되며 문의 주소는 `hello@headroomlabs.ai`다. README는 저장소의 모든 코드가 Apache 2.0 오픈소스로 유지된다고 함께 밝힌다.

기여 절차는 짧다. 저장소를 clone한 뒤 `uv sync --extra dev && uv run pytest`로 개발 환경을 구성하고 테스트를 실행한다. `.devcontainer/`에 개발 컨테이너가 있으며, 기본 구성과 Qdrant, Neo4j를 포함한 `memory-stack` 구성 두 가지를 제공한다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| CCR (reversible compression) | 원본을 로컬에 캐시해 두고 필요할 때 되불러오는 되돌릴 수 있는 압축. LLM이 `headroom_retrieve`로 원문을 호출하며, 되불러올 수 있는 기간은 설정된 TTL로 제한된다 |
| ContentRouter | 입력 콘텐츠 유형을 판별해 알맞은 압축기로 라우팅하는 구성 요소 |
| CacheAligner | prefix를 안정화해 제공자 KV 캐시 hit율을 높이는 정렬기 |
| cross-agent memory | Claude, Codex, Gemini가 공유하는 메모리 저장소. agent provenance와 자동 dedup을 지원한다 |
| output shaper와 effort routing | 출력 토큰을 줄이는 기능. system prompt 끝에 간결함을 요구하는 verbosity steering과, 재개 턴의 thinking effort를 낮추는 effort routing으로 구성된다 |
| counterfactual 절감 | 모델이 원래 썼을 출력을 알 수 없어 신뢰구간이 붙은 추정치로 보고하는 출력 절감 계측 방식 |

## 관련 페이지

이 페이지는 공식 저장소 README를 근거로 제품 스펙, 아키텍처, 설치, 설정, 라이선스를 담당한다. 사용 팁이나 개별 필자의 측정치, 커뮤니티 반응은 아래 해설 자료가 담당한다.

- [[agents/tosea-2026-how-to-use-headroom-context]]: Tosea Team의 영문 사용 안내. 컨텍스트와 로그, RAG 청크를 실제로 압축하는 절차를 다룬다
- [[agents/subratpati-2026-building-cost-efficient-agents-with]]: Subrat Pati가 비용 효율 관점에서 정리한 적용 사례
- [[agents/nedai-2026-headroom-token-compression-guide]]: Nedai의 한국어 사용 방법 안내
- [[agents/9bow-2026-headroom-ai-agent-context-compression]]: 박정환의 한국어 소개. 이 README에 없는 공식 문서 사이트 주소를 안내한다
- [[agents/yongkyun-2026-cutting-llm-token-costs-with]]: Yongkyun이 rtk와 headroom, caveman 세 도구를 비교한 글. README 비교표의 RTK 항목과 대조해 읽을 수 있다
- [[agents/lee-hoyeon-2026-harness-engineering]]: harness 계층 이론. Headroom은 그 계층에 놓이는 실물 인프라에 해당한다
- [[agents/osmani-2026-loop-engineering]]: 에이전트 운영 루프 설계. Headroom은 그 루프의 토큰 비용을 줄이는 계층이다
- [[database/li-2026-beyond-semantic-similarity-rethinking-retrieval]]: vectorless와 토큰 절약을 다룬다. 검색 방식을 바꿔 예산을 푸는 접근과 대칭을 이룬다
