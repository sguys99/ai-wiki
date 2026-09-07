---
title: "Headroom: The context compression layer for AI agents"
type: repo
year: 2026
category: agents
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
figures:
  - id: fig01
    file: assets/headroomlabs-ai-headroom/HeadroomDemo-Fast.gif
    raw: "https://github.com/headroomlabs-ai/headroom/raw/main/HeadroomDemo-Fast.gif"
    caption: "라이브 데모: 10,144 → 1,260 토큰, 동일한 FATAL 로그 탐지"
    strategy: manual
    curated: false
  - id: fig02
    file: assets/headroomlabs-ai-headroom/headroom_learn.gif
    raw: "https://github.com/headroomlabs-ai/headroom/raw/main/headroom_learn.gif"
    caption: "headroom learn 동작: 실패 세션 마이닝 후 CLAUDE.local.md에 교정 기록"
    strategy: manual
    curated: false
---

## 한 줄 요약 (One-line Summary)

Headroom은 AI 에이전트가 읽어들이는 모든 텍스트, 곧 tool 출력과 로그, RAG 청크, 파일, 대화 이력을 LLM에 닿기 전에 압축하는 context compression layer다. README는 같은 답을 유지하면서 토큰을 60~95% 줄인다고 주장한다. 도입 방식은 세 가지다. 코드에 인라인으로 `compress(messages)`를 부르는 library, 코드를 한 줄도 고치지 않고 앞단에 세우는 proxy(`headroom proxy --port 8787`), 코딩 에이전트를 통째로 감싸는 `headroom wrap claude` 형태의 agent wrap이다. 여기에 MCP 서버(`headroom_compress`, `headroom_retrieve`, `headroom_stats`)와 Claude, Codex, Gemini가 공유하는 cross-agent memory, 압축 원본을 로컬에 캐시해 두었다가 필요할 때 되돌리는 reversible 압축(CCR)이 결합된다. 전부 로컬에서 실행되므로 데이터가 사용자 머신을 떠나지 않으며, 라이선스는 Apache 2.0이다.

## 1. 자료 정보 (Document Information)

- **Repo**: 사용자가 준 URL은 `headroomlabs-ai/headroom`이지만, README 본문의 `docker pull ghcr.io/chopratejas/headroom:latest`과 `git clone https://github.com/chopratejas/headroom.git` 안내는 모두 `chopratejas/headroom`을 가리킨다. 전자는 조직 미러 또는 vanity 경로로 보이고 정본(canonical)은 후자로 판단된다. frontmatter에 `canonical_repo`로 병기했다. README에 배지나 CI 설정은 실려 있지 않으므로 이 판단의 근거는 Docker 이미지 경로와 clone 주소 두 가지다.
- **배포 채널**: PyPI `headroom-ai`(파이썬 패키지, `headroom` CLI를 함께 설치), npm `headroom-ai`(TypeScript SDK로 라이브러리만 제공하고 CLI는 없다), Docker `ghcr.io/chopratejas/headroom:latest`. 압축 모델 Kompress-v2-base는 HuggingFace에서 받아 오지만 README는 모델 저장소 id를 적지 않고 호스트 `huggingface.co`만 언급한다.
- **라이선스**: Apache 2.0. README의 License 절과 "Everything in the repo stays open source (Apache 2.0)" 문장이 근거다.
- **의존성**: Python 3.10 이상. extras를 잘게 나눠 `[proxy]`, `[mcp]`, `[ml]`, `[code]`, `[memory]`, `[vector]`, `[relevance]`, `[image]`, `[agno]`, `[langchain]`, `[evals]`, `[pytorch-mps]`로 설치한다. `[vector]`는 선택적 HNSW 백엔드라 C++ 툴체인을 요구한다. `[all]`은 코어 스택만 덮고 프레임워크 어댑터(`[langchain]`, `[agno]`, `[strands]`, `[anyllm]`, `[bedrock]`)는 포함하지 않아 따로 설치해야 한다.
- **언어**: README와 CLI 모두 영어다. 이 README에는 별도 문서 사이트 주소가 없다. 공식 문서 사이트 주소를 안내하는 것은 형제 자료 [[agents/9bow-2026-headroom-ai-agent-context-compression]]이며, 그 정보의 출처는 이 저장소 README가 아니다.
- **자료 유형**: type은 `repo`다. README 본문만을 근거로 삼았고 코드 스냅샷은 포함하지 않았다.
- **이미지**: 데모 GIF 2개(`HeadroomDemo-Fast.gif`, `headroom_learn.gif`)만 있다. repo 정책상 자동 fetch를 하지 않으므로 `strategy: manual`, `curated: false`로 후보만 기록했다.

> **이 자료가 ai-wiki에 들어오는 이유**: 우리 wiki의 다른 자료들이 무엇을 검색하고 기억할지(RAG와 메모리)를 다뤘다면, Headroom은 그 반대편, 곧 이미 검색되거나 생성된 컨텍스트를 어떻게 줄일지를 다루는 인프라다. 에이전트의 context window 예산 문제를 검색 품질이 아니라 압축과 캐시 정렬로 푼다는 점에서, [[agents/lee-hoyeon-2026-harness-engineering|Harness Engineering]]이 말하는 harness 계층의 실물 사례이자 [[database/li-2026-beyond-semantic-similarity-rethinking-retrieval|Direct Corpus Interaction]] 계열의 토큰 절약 논의와 맞닿는다.

## 2. 주요 기여 (Key Contributions)

- **콘텐츠 인지 압축(content-aware compression)**: 하나의 압축기로 모든 입력을 처리하는 대신, `ContentRouter`가 입력 종류를 판별해 JSON에는 `SmartCrusher`, 코드에는 AST 기반 `CodeCompressor`, 산문에는 학습된 `Kompress-v2-base`를 각각 연결한다. 콘텐츠 유형마다 압축 손실을 달리 다루는 것이 설계의 핵심이다.
- **세 가지 배포 형태(library, proxy, wrap)**: 같은 압축 파이프라인을 코드 인라인, OpenAI 호환 proxy, 에이전트 래핑 세 형태로 열어 언어나 프레임워크에 얽매이지 않고 연결할 수 있게 했다. proxy는 코드 변경이 전혀 없다는 점을 내세운다.
- **되돌릴 수 있는 압축(CCR)**: 원본을 로컬에 저장해 두었다가 LLM이 필요로 하면 `headroom_retrieve`로 원문을 되불러온다. 되불러올 수 있는 기간은 설정된 TTL 안으로 한정된다. 손실 압축이 맥락을 없앨 위험을 retrieval로 보완하는 구조다.
- **입력만이 아니라 출력 토큰까지**: 압축 도구 대부분이 보내는 프롬프트만 줄이는 반면, Headroom은 모델이 되돌려 쓰는 출력까지 proxy에서 줄인다. verbosity steering은 "장황하게 쓰지 말고 컨텍스트를 복창하지 말라"는 짧은 지시를 system prompt 끝에 덧붙여 프롬프트 캐시가 여전히 hit 하도록 한다. effort routing은 tool 결과 이후의 재개 턴에서 모델의 thinking effort를 낮추고, 새 질문이나 오류 상황에서는 full effort를 유지한다. Opus급 모델에서 출력이 입력의 5배 비용이라는 점을 근거로 든다.
- **cross-agent memory와 `headroom learn`**: Claude, Codex, Gemini가 함께 쓰는 메모리 저장소를 두고 agent provenance와 자동 dedup을 지원한다. `headroom learn`은 실패한 세션을 마이닝해 `CLAUDE.local.md`(기본값이며 gitignore 대상)에 교정을 기록하고, `--target CLAUDE.md`로 팀 공유 파일이나 `AGENTS.md`, `GEMINI.md`를 지정할 수도 있다.
- **캐시 정렬(CacheAligner)**: prefix를 안정화해 Anthropic과 OpenAI의 KV 캐시가 실제로 hit 하도록 맞춘다. 압축이 캐시를 깨뜨려 도리어 손해가 나는 함정을 피한다.
- **SharedContext**: 멀티에이전트 워크플로에서 압축된 컨텍스트를 에이전트 사이로 전달하는 구성 요소다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

파이프라인은 `compress()`와 SDK, proxy가 공유하는 하나의 요청 lifecycle로 통일돼 있다.

```
Setup → Pre-Start → Post-Start → Input Received → Input Cached
→ Input Routed → Input Compressed → Input Remembered → Pre-Send → Post-Send → Response Received
```

흐름을 보면, 에이전트가 보낸 프롬프트와 tool 출력, 로그, RAG 결과, 파일이 먼저 `CacheAligner`를 거쳐 prefix가 안정화된 뒤, `ContentRouter`가 유형을 판별해 압축기 중 하나로 넘긴다.

| 구성 요소 | 대상 | 처리 방식 |
|---|---|---|
| SmartCrusher | JSON | dict 배열, 중첩 객체, 혼합 타입까지 다루는 범용 압축기 |
| CodeCompressor | 코드 | Python, JS/TS, Go, Rust, Java, C/C++, Perl을 AST 인지로 압축 |
| Kompress-v2-base | 산문 | 에이전트 trace로 학습한 HuggingFace 모델 |
| Image compression | 이미지 | 학습된 ML 라우터로 40~90% 축소 |

압축된 결과는 CCR 덕분에 원본을 로컬에 남긴 채 LLM 제공자(Anthropic, OpenAI, Bedrock 등)로 전달되고, 모델이 원문을 필요로 하면 `headroom_retrieve` tool로 되불러온다. 실제 변환 작업은 Transform(CacheAligner, ContentRouter, 세 압축기)이 맡고, 각 단계를 관찰하거나 변경하는 일은 pipeline extension(`on_pipeline_event(...)`)이 담당한다. 제공자와 도구별 특수 처리는 `headroom/providers/`(claude, copilot, codex, openclaw, gemini, `registry.py`)로 분리해, 코어는 lifecycle과 실행 순서, 적용 규칙에만 집중하도록 했다.

에이전트 호환은 `headroom wrap {tool}` 한 줄로 Claude Code, Codex, Aider, Copilot CLI, OpenClaw, OpenCode, Cline, Continue, Goose, OpenHands, Mistral Vibe를 감싼다. Claude Code에는 `--memory`, `--code-graph`, `--1m`, `--tool-search` 옵션이 붙고, Codex는 Claude와 메모리를 공유한다. OpenCode, Cline, Continue는 설정 파일을 주입한 뒤 proxy를 띄우고, Aider와 Copilot CLI, Goose, OpenHands, Mistral Vibe는 proxy를 띄우고 바로 실행한다. OpenClaw는 ContextEngine 플러그인으로 설치된다. Cursor는 proxy를 띄우고 base URL을 출력해 주면 사용자가 설정에 옮겨 적는 수동 방식이고, Cortex Code는 library 모드만 지원하며 이 경우 절감은 60~65%다. 되돌리는 `headroom unwrap {tool}`은 `claude`, `copilot`, `codex`, `opencode`, `openclaw` 다섯 개만 지원한다. OpenAI 호환 클라이언트는 전부 proxy로 연결되고, MCP 클라이언트는 `headroom mcp install`로 붙는다.

프레임워크 연동은 별도 표로 정리돼 있다. 파이썬은 `compress(messages, model=...)`, TypeScript는 `await compress(messages, { model })`을 부르고, Anthropic이나 OpenAI SDK는 `withHeadroom(...)`으로 감싼다. Vercel AI SDK는 `wrapLanguageModel({ model, middleware: headroomMiddleware() })`, LiteLLM은 `litellm.callbacks = [HeadroomCallback()]`, LangChain은 `HeadroomChatModel(your_llm)`, Agno는 `HeadroomAgnoModel(your_model)`을 쓴다. ASGI 앱은 `app.add_middleware(CompressionMiddleware)`로 미들웨어를 추가하고, 멀티에이전트 구성은 `SharedContext().put`과 `.get`을 쓴다. Strands는 별도 가이드를 안내한다.

운영 명령은 설치 직후 확인용과 상시 점검용으로 나뉜다. `headroom doctor`는 라우팅이 동작하는지 확인하는 헬스 체크이고, `headroom perf`는 성능을 측정하며, `headroom dashboard`는 절감 현황을 실시간으로 보여준다(proxy가 실행 중이어야 한다). `headroom update`는 pip, pipx, uv tool 중 무엇으로 설치했는지 감지해 그 자리에서 업그레이드하고, `--check`는 최신 릴리스만 보고하며 `--pre`는 pre-release까지 포함한다. proxy는 시작할 때 업데이트 알림을 한 줄 표시하는데, PyPI 확인은 하루 한 번을 넘지 않고 백그라운드로 수행되며 시작을 지연시키지 않는다. `HEADROOM_UPDATE_CHECK=off`로 끌 수 있다. `headroom wrap`은 실행 중인 proxy에 loopback `POST /admin/runtime-env`로 현재 설정을 즉시 동기화하므로 재시작이 필요 없다.

출력 셰이핑은 기본값이 off이며 `HEADROOM_OUTPUT_SHAPER=1`로 켠 뒤 proxy를 실행한다. 적절한 간결함 수준은 `headroom learn --verbosity`로 먼저 확인(dry run)하고 `--apply`로 저장하면 이후 proxy가 그 설정을 사용한다.

GitHub Copilot CLI는 subscription 모드를 따로 지원한다. `headroom copilot-auth login` 후 `headroom wrap copilot --subscription -- --model gpt-4o` 형태로 실행하면, Headroom이 보관한 재사용 가능한 GitHub OAuth 토큰을 Copilot의 짧은 수명 API 토큰으로 교환한 뒤 동일한 proxy 압축 파이프라인을 적용한다. GitHub Enterprise Server나 커스텀 도메인 배포에서는 `GITHUB_COPILOT_ENTERPRISE_DOMAIN`을 설정한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

**실제 에이전트 워크로드 절감** (Before → After 토큰):

| 워크로드 | Before | After | 절감 |
|---|---:|---:|---:|
| Code search (100 results) | 17,765 | 1,408 | 92% |
| SRE incident debugging | 65,694 | 5,118 | 92% |
| GitHub issue triage | 54,174 | 14,761 | 73% |
| Codebase exploration | 78,502 | 41,254 | 47% |

**표준 벤치마크에서 정확도 보존** (모두 N=100):

| 벤치마크 | 범주 | Baseline | Headroom | Delta |
|---|---|---:|---:|---|
| GSM8K | Math | 0.870 | 0.870 | ±0.000 |
| TruthfulQA | Factual | 0.530 | 0.560 | +0.030 |
| SQuAD v2 | QA | 미기재 | 97% | 19% 압축 |
| BFCL | Tools | 미기재 | 97% | 32% 압축 |

재현 명령은 `python -m headroom.evals suite --tier 1`이다. SQuAD v2와 BFCL은 baseline 칸이 비어 있어 절대 비교가 아니라 해당 압축률에서의 정확도만 보고한 값이다.

출력 토큰 절감은 성질이 다르다. 모델이 원래 무엇을 썼을지 알 수 없는 counterfactual이라, Headroom은 수치를 단정하는 대신 신뢰구간을 붙인 추정치를 보고한다. `headroom output-savings`를 실행하면 `Reduction: 31.7% (95% CI 27.7% ... 35.7%) [estimated]` 형태로 출력된다. 추정이 아니라 측정값을 원한다면 대화의 10%를 압축 없이 남기는 control group을 켜면 된다(`HEADROOM_OUTPUT_HOLDOUT=0.1`).

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **적합하지 않은 경우**: README가 직접 밝힌 두 가지다. 단일 제공자의 네이티브 compaction만 쓰고 cross-agent memory가 필요 없다면 얻는 것이 적다. 로컬 프로세스를 실행할 수 없는 sandbox 환경에서도 쓸 수 없는데, local-first 설계와 정면으로 어긋나기 때문이다.
- **플랫폼 검증 편차**: Copilot subscription 모드의 인증 재사용은 macOS Keychain에서만 smoke-test를 거쳤다. Windows Credential Manager, Linux Secret Service, Docker와 CI 경로는 아직 OS 검증이 남아 있다. 그래서 Docker와 CI에서는 host keychain 대신 `GITHUB_COPILOT_TOKEN`을 명시적으로 넘기라고 권한다.
- **런타임 자산 의존**: Rust 코어의 ONNX Runtime(`cdn.pyke.io`)과 압축 모델(`huggingface.co`)을 TLS로 내려받는다. SSL 검사를 거는 사내망이라면 `REQUESTS_CA_BUNDLE`, `SSL_CERT_FILE`, `CURL_CA_BUNDLE`로 사내 CA를 신뢰시키거나 오프라인 모드(`HF_HUB_OFFLINE=1`, `ORT_STRATEGY=system`)로 실행해야 한다.
- **설치 단계의 SSL 함정**: `pip install`이 `CERTIFICATE_VERIFY_FAILED`로 실패하면 네트워크가 SSL 검사를 거는 상황이다. 이때는 `maturin`이 신뢰할 수 없는 연결로 `rustup`을 내려받지 않도록 Rust를 먼저 설치하거나, prebuilt wheel을 쓴다(`pip install --only-binary headroom-ai headroom-ai`). wheel은 win_amd64, Linux x86_64와 aarch64, macOS Apple Silicon용으로 배포된다.
- **Python 3.13 이상의 엄격 모드**: `VERIFY_X509_STRICT`가 RFC 5280 4.2.1.9를 강제하면서 "Basic Constraints of CA cert not marked critical" 오류가 날 수 있다. `HEADROOM_TLS_STRICT=0`을 설정하면 Headroom이 제어하는 TLS 컨텍스트에서 엄격 플래그만 해제되고 체인, 서명, 만료, 호스트명 검사는 그대로 유지된다.
- **출력 셰이핑은 기본 off**: `HEADROOM_OUTPUT_SHAPER=1`로 직접 켜야 한다.
- README가 벤치마크 방법론과 압축 손실의 세부 조건을 싣지 않았다. 따라서 압축 손실이 long-context나 다국어, 특정 도메인에서 어떻게 달라지는지는 이 요약의 범위 밖이다.

## 6. 관련 연구 (Related Work)

README의 "Compared to" 표가 Headroom을 경쟁 도구와 나란히 세운다.

| 도구 | 스코프 | 배포 | 로컬 | 가역 |
|---|---|---|---|---|
| Headroom | 모든 컨텍스트(tool, RAG, 로그, 파일, 이력) | proxy, library, middleware, MCP | Yes | Yes |
| RTK | CLI 명령 출력 | CLI wrapper | Yes | No |
| lean-ctx | CLI 명령, MCP tool, editor rule | CLI wrapper, MCP | Yes | No |
| Compresr, Token Co. | 자사 API로 보낸 텍스트 | hosted API 호출 | No | No |
| OpenAI Compaction | 대화 이력 | provider-native | No | No |

README는 이 표를 근거로 Headroom이 로컬 실행, 전체 콘텐츠 유형 지원, 주요 프레임워크 호환, 가역성 네 항목에서 앞선다고 주장한다. 다만 표는 저장소 자체가 만든 비교라 독립 검증은 아니다. 실제로 Headroom은 shell 출력 재작성에 RTK 바이너리를 포함해 배포하고, `HEADROOM_CONTEXT_TOOL=lean-ctx`로 lean-ctx를 CLI context tool 자리에 대신 둘 수도 있다고 attribution 절에 밝혀, 경쟁 관계이면서 동시에 서로를 보완한다.

우리 wiki 안에서는 [[agents/lee-hoyeon-2026-harness-engineering|Harness Engineering]](harness 계층 이론), [[agents/osmani-2026-loop-engineering|Loop Engineering]](에이전트 운영 루프 설계), 그리고 vectorless와 토큰 절약을 다룬 [[database/li-2026-beyond-semantic-similarity-rethinking-retrieval|Direct Corpus Interaction]]과 문제의식이 겹친다.

## 7. 용어집 (Glossary)

- **CCR (reversible compression)**: 원본을 로컬에 캐시해 두고 필요할 때 되불러오는 되돌릴 수 있는 압축. LLM이 `headroom_retrieve`로 원문을 호출하며, 되불러올 수 있는 기간은 설정된 TTL로 제한된다.
- **ContentRouter**: 입력 콘텐츠 유형을 판별해 알맞은 압축기(JSON, 코드, 산문)로 라우팅하는 구성 요소.
- **SmartCrusher**: dict 배열, 중첩 객체, 혼합 타입을 다루는 범용 JSON 압축기.
- **CodeCompressor**: 다수 언어를 AST 인지로 압축하는 코드 전용 압축기.
- **Kompress-v2-base**: 에이전트 trace로 학습된 산문 압축 HuggingFace 모델.
- **CacheAligner**: prefix를 안정화해 제공자 KV 캐시 hit율을 높이는 정렬기.
- **SharedContext**: 멀티에이전트 워크플로에서 압축된 컨텍스트를 에이전트 사이로 전달하는 구성 요소.
- **cross-agent memory**: Claude, Codex, Gemini가 공유하는 메모리 저장소로 agent provenance와 자동 dedup을 지원한다.
- **`headroom learn`**: 실패 세션을 마이닝해 메모리 파일(`CLAUDE.local.md` 등)에 교정을 자동 기록하는 학습 루프. Claude, Codex, Gemini용 플러그인 기반이다.
- **output shaper와 effort routing**: 모델의 출력 토큰을 줄이는 기능. system prompt 끝에 간결함을 요구하는 verbosity steering과, 재개 턴의 thinking effort를 낮추는 effort routing으로 구성된다.
- **counterfactual 절감**: 모델이 원래 썼을 출력을 알 수 없어 신뢰구간이 붙은 추정치로 보고하는 출력 절감 계측 방식.

## 8. 그림 후보 (Figure Candidates)

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | "라이브 데모: 10,144 → 1,260 토큰, 동일 FATAL 탐지" | manual | (선택) 데모 GIF로 시각 자료로는 유용하나 애니메이션이다 |
| fig02 | "headroom learn: 실패 세션 마이닝 후 CLAUDE.local.md 기록" | manual | (선택) 데모 GIF |

> repo에 정적 아키텍처 도식은 없고 ASCII 다이어그램만 있다(본문에 텍스트로 보존했다). GIF 2개는 repo 정책상 자동 fetch 대상이 아니므로, 필요하면 사용자가 `wiki/assets/headroomlabs-ai-headroom/`에 수동으로 저장한다.
