---
title: "Headroom — The context compression layer for AI agents"
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
    caption: "headroom learn 동작: 실패 세션 마이닝 → CLAUDE.local.md 교정 기록"
    strategy: manual
    curated: false
---

## 한 줄 요약 (One-line Summary)

Headroom은 AI 에이전트가 읽어들이는 모든 텍스트 — tool 출력, 로그, RAG 청크, 파일, 대화 이력 — 를 LLM에 닿기 전에 압축하는 **context compression layer**다. 답은 그대로 두면서 토큰만 60~95% 줄인다는 게 핵심 주장이다. 붙이는 방법은 세 가지다. 코드에 인라인으로 `compress(messages)`를 부르는 **library**, 코드를 한 줄도 고치지 않고 끼우는 **proxy**(`headroom proxy --port 8787`), 코딩 에이전트를 통째로 감싸는 `headroom wrap claude` 같은 **agent wrap**. 여기에 MCP 서버(`headroom_compress`·`headroom_retrieve`·`headroom_stats`)와 Claude·Codex·Gemini를 넘나드는 cross-agent memory, 압축 원본을 로컬에 캐시해 두었다가 필요할 때 되돌리는 reversible 압축(CCR)이 얹힌다. 전부 로컬에서 돌기 때문에 데이터가 사용자 머신을 떠나지 않으며, 라이선스는 Apache 2.0이다. 저장소 뿌리는 `chopratejas/headroom`이고, `headroomlabs.ai`는 이를 상용 지원·매니지드로 파는 회사다.

## 1. 자료 정보 (Document Information)

- **Repo**: 사용자가 준 URL은 `headroomlabs-ai/headroom`이지만, README의 배지·CI·Docker 이미지·`git clone` 안내가 모두 **`chopratejas/headroom`**을 가리킨다. 전자는 조직 미러 또는 vanity 경로로 보이고 정본(canonical)은 후자다. frontmatter에 `canonical_repo`로 병기했다.
- **배포 채널**: PyPI `headroom-ai`(파이썬, `headroom` CLI 포함), npm `headroom-ai`(TypeScript SDK — 라이브러리만, CLI 없음), Docker `ghcr.io/chopratejas/headroom`, HuggingFace `chopratejas/kompress-v2-base`(텍스트 압축 모델)
- **라이선스**: Apache-2.0 (LICENSE 파일 명시)
- **의존성**: Python 3.10+. extras로 `[proxy]`·`[mcp]`·`[ml]`·`[code]`·`[memory]`·`[vector]`·`[relevance]`·`[image]`·`[agno]`·`[langchain]`·`[evals]`·`[pytorch-mps]` 등을 잘게 나눠 설치. 프레임워크 어댑터(`[langchain]`·`[agno]`·`[strands]`·`[anyllm]`·`[bedrock]`)는 `[all]`에 안 들어가 별도 설치
- **언어**: 영어 (README·문서·CLI 전부). 문서 사이트는 `headroom-docs.vercel.app`
- **자료 유형**: type = `repo` — README 본문 기준 요약(코드 스냅샷 미포함)
- **이미지**: 데모 GIF 2개(`HeadroomDemo-Fast.gif`, `headroom_learn.gif`)만 존재. repo 정책상 자동 fetch ❌ → `strategy: manual`, `curated: false`로 후보만 기록

> **이 자료가 ai-wiki에 들어오는 이유**: 우리 wiki의 다른 자료들이 "무엇을 검색·기억할까"(RAG·메모리)를 다뤘다면, Headroom은 그 반대편, 곧 "**이미 검색·생성된 컨텍스트를 어떻게 줄일까**"를 다루는 인프라다. 에이전트의 context window 예산 문제를 검색 품질이 아니라 압축과 캐시 정렬로 푼다는 점에서, [[agents/lee-hoyeon-2026-harness-engineering|Harness Engineering]]이 말하는 harness 계층의 실물 사례이자 [[database/li-2026-beyond-semantic-similarity-rethinking-retrieval|Direct Corpus Interaction]]류의 토큰 절약 논의와 곧장 맞닿는다.

## 2. 주요 기여 (Key Contributions)

- **컨텐츠 인지 압축(content-aware compression)**: 하나의 압축기로 뭉개는 대신, `ContentRouter`가 입력 종류를 판별해 JSON에는 `SmartCrusher`, 코드에는 AST 기반 `CodeCompressor`, 산문에는 학습된 `Kompress-v2-base`를 각각 붙인다. 콘텐츠 유형마다 압축 손실을 달리 다루는 것이 설계의 뼈대다.
- **세 갈래 배포(library / proxy / wrap)**: 같은 압축 파이프라인을 코드 인라인, OpenAI 호환 proxy, 에이전트 래핑 세 형태로 열어, 언어나 프레임워크에 얽매이지 않고 끼울 수 있게 했다. proxy는 코드 변경 0을 내세운다.
- **되돌릴 수 있는 압축(CCR)**: 원본을 로컬에 저장해 두었다가, LLM이 정말 필요로 하면 `headroom_retrieve`로 원문을 되불러온다. 손실 압축이 맥락을 날려버릴 위험을 retrieval로 막는 구조다.
- **입력만이 아니라 출력 토큰까지**: 압축 도구 대부분이 보내는 프롬프트만 줄이는 반면, Headroom은 모델이 **되돌려 쓰는** 출력까지 proxy에서 줄인다. verbosity steering으로 "장황하지 말고 맥락 복창하지 마라" 지시를 system prompt 끝에 붙이고, tool 결과 이후 재개 턴에서는 effort routing으로 thinking effort를 낮춘다. Opus급에서 출력이 입력의 5배 비용이라는 점을 겨냥한 것이다.
- **cross-agent memory / `headroom learn`**: Claude·Codex·Gemini가 함께 쓰는 메모리 저장소(자동 dedup), 그리고 실패한 세션을 마이닝해 `CLAUDE.local.md`(기본, gitignore) 같은 메모리 파일에 교정을 스스로 적어 넣는 학습 루프.
- **캐시 정렬(CacheAligner)**: prefix를 안정화해 Anthropic·OpenAI의 KV 캐시가 실제로 hit 하도록 맞춘다. 압축이 캐시를 깨뜨려 도리어 손해 보는 흔한 함정을 피한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

파이프라인은 `compress()`·SDK·proxy가 공유하는 하나의 요청 lifecycle로 통일돼 있다:

```
Setup → Pre-Start → Post-Start → Input Received → Input Cached
→ Input Routed → Input Compressed → Input Remembered → Pre-Send → Post-Send → Response Received
```

흐름을 뜯어보면, 에이전트가 보낸 프롬프트·tool 출력·로그·RAG 결과·파일이 먼저 `CacheAligner`를 거쳐 prefix가 안정화된 뒤, `ContentRouter`가 유형을 판별해 세 압축기 중 하나로 넘긴다.

- **SmartCrusher** — dict 배열, 중첩 객체, 혼합 타입까지 다루는 범용 JSON 압축기
- **CodeCompressor** — Python·JS/TS·Go·Rust·Java·C/C++·Perl을 AST 인지로 압축
- **Kompress-v2-base** — 에이전트 trace로 학습한 HuggingFace 산문 압축 모델
- **Image compression** — 학습된 ML 라우터로 40~90% 축소

압축된 결과는 CCR 덕분에 원본을 로컬에 남긴 채 LLM 제공자(Anthropic·OpenAI·Bedrock 등)로 전달되고, 모델이 원문을 필요로 하면 `headroom_retrieve` tool로 되불러온다. 실제 작업은 Transform(CacheAligner·ContentRouter·세 압축기)이 맡고, 각 단계를 관찰하거나 손보는 일은 pipeline extension(`on_pipeline_event(...)`)이 담당한다. 제공자·도구별 특수 처리는 `headroom/providers/`(claude·copilot·codex·openclaw·gemini·`registry.py`)로 떼어 놓아, 코어는 lifecycle·순서·정책에만 집중하도록 했다.

에이전트 호환은 `headroom wrap {tool}` 한 줄로 Claude Code·Codex·Aider·Copilot CLI·OpenClaw·OpenCode·Cline·Continue·Goose·OpenHands·Mistral Vibe를 감싸고, 되돌릴 때는 `headroom unwrap {tool}`을 쓴다. Cursor는 proxy를 띄우고 base URL을 출력하는 수동 설정이 필요하고, Cortex Code는 library 모드만 지원해 60~65%를 절감한다. OpenAI 호환 클라이언트는 전부 proxy로 붙으며, MCP 클라이언트는 `headroom mcp install`로 붙는다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

**실제 에이전트 워크로드 절감** (Before → After 토큰):

| 워크로드 | Before | After | 절감 |
|---|---:|---:|---:|
| Code search (100 results) | 17,765 | 1,408 | 92% |
| SRE incident debugging | 65,694 | 5,118 | 92% |
| GitHub issue triage | 54,174 | 14,761 | 73% |
| Codebase exploration | 78,502 | 41,254 | 47% |

**표준 벤치마크에서 정확도 보존** (N=100):

| 벤치마크 | 범주 | Baseline | Headroom | Delta |
|---|---|---:|---:|---|
| GSM8K | Math | 0.870 | 0.870 | ±0.000 |
| TruthfulQA | Factual | 0.530 | 0.560 | +0.030 |
| SQuAD v2 | QA | — | 97% | 19% 압축 |
| BFCL | Tools | — | 97% | 32% 압축 |

재현 명령은 `python -m headroom.evals suite --tier 1`이다. 출력 토큰 절감은 성질이 다르다. 모델이 원래 뭘 썼을지 알 수 없는 **counterfactual**이라, Headroom은 수치를 지어내는 대신 신뢰구간을 붙인 추정치를 보고한다(`headroom output-savings` → 예: `Reduction: 31.7% (95% CI 27.7% … 35.7%) [estimated]`). 추정 말고 측정값을 원한다면, 대화의 10%를 압축 없이 남기는 control group을 켜면 된다(`HEADROOM_OUTPUT_HOLDOUT=0.1`).

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **적합하지 않은 경우**(README가 자인한다): 단일 제공자의 네이티브 compaction만 쓰고 cross-agent memory가 필요 없다면 얻는 게 적다. 로컬 프로세스를 돌릴 수 없는 sandbox 환경에서도 쓸 수 없는데, 로컬 우선 설계와 정면으로 어긋나기 때문이다.
- **플랫폼 검증 편차**: Copilot subscription 모드의 인증 재사용은 macOS Keychain에서만 smoke-test를 거쳤다. Windows Credential Manager, Linux Secret Service, Docker/CI 경로는 아직 구현·계획 단계라 실제 OS 검증이 남아 있다. 그래서 Docker·CI에서는 host keychain 대신 `GITHUB_COPILOT_TOKEN`을 명시로 넘기라고 권한다.
- **런타임 자산 의존**: Rust 코어의 ONNX Runtime(`cdn.pyke.io`)과 압축 모델(`huggingface.co`)을 TLS로 내려받는다. SSL 검사(MITM)를 거는 사내망이라면 별도 CA 신뢰 설정이나 오프라인 모드(`HF_HUB_OFFLINE=1`, `ORT_STRATEGY=system`)가 필요하다.
- **파이썬 버전 트레이드오프**: 대시보드의 달러 절감 표시는 LiteLLM에 기대는데, LiteLLM이 Python 3.14+에서는 설치되지 않는다. 그래서 3.14에서는 토큰 절감은 추적되지만 달러 수치가 `$0.00`으로 고정된다. 달러 표시를 원하면 3.13을 권한다.
- **출력 셰이핑은 기본 off**: `HEADROOM_OUTPUT_SHAPER=1`로 직접 켜야 한다. shared proxy에서는 override가 전역으로 걸려 마지막 설정이 이긴다.
- README가 벤치마크 방법론과 아키텍처 세부를 외부 문서 사이트로 미뤄 둔 탓에, 압축 손실이 long-context·다국어·특정 도메인에서 어떻게 달라지는지는 이 요약의 범위 밖이다.

## 6. 관련 연구 (Related Work)

README의 "Compared to" 표가 Headroom을 경쟁 도구와 나란히 세운다. **RTK**(CLI 명령 출력, CLI wrapper, 로컬, 비가역), **lean-ctx**(CLI·MCP tool·editor rule, 로컬, 비가역), **Compresr/Token Co.**(자사 API로 보낸 텍스트, hosted, 비가역), **OpenAI Compaction**(대화 이력, provider-native, 비가역)을 상대로, Headroom은 스코프(모든 컨텍스트 — tool·RAG·로그·파일·이력), 배포(proxy·library·middleware·MCP), 로컬, 가역성이라는 네 축 모두에서 앞선다고 주장한다. 실제로 Headroom은 shell 출력 재작성에 **RTK 바이너리를 내장**하고, `HEADROOM_CONTEXT_TOOL=lean-ctx`로 lean-ctx를 CLI context tool 자리에 대신 앉힐 수도 있으니, 경쟁 관계이면서 동시에 서로를 보완하는 셈이다.

우리 wiki 안에서는 [[agents/lee-hoyeon-2026-harness-engineering|Harness Engineering]](harness 계층 이론), [[agents/osmani-2026-loop-engineering|Loop Engineering]](에이전트 운영 루프 설계), 그리고 vectorless·토큰 절약을 다룬 [[database/li-2026-beyond-semantic-similarity-rethinking-retrieval|Direct Corpus Interaction]]과 문제의식이 겹친다.

## 7. 용어집 (Glossary)

- **CCR (reversible compression)**: 원본을 로컬에 캐시해 두고 필요 시 되불러오는 되돌릴 수 있는 압축. LLM이 `headroom_retrieve`로 원문 호출.
- **ContentRouter**: 입력 콘텐츠 유형을 판별해 알맞은 압축기(JSON/코드/산문)로 라우팅하는 컴포넌트.
- **SmartCrusher**: dict 배열·중첩 객체·혼합 타입을 다루는 범용 JSON 압축기.
- **CodeCompressor**: 다수 언어를 AST 인지로 압축하는 코드 전용 압축기.
- **Kompress-v2-base**: 에이전트 trace로 학습된 텍스트(산문) 압축 HuggingFace 모델.
- **CacheAligner**: prefix를 안정화해 제공자 KV 캐시 hit율을 높이는 정렬기.
- **cross-agent memory**: Claude·Codex·Gemini가 공유하는 메모리 저장소(자동 dedup).
- **`headroom learn`**: 실패 세션을 마이닝해 메모리 파일(`CLAUDE.local.md` 등)에 교정을 자동 기록하는 학습 루프.
- **output shaper / effort routing**: 모델의 출력 토큰을 줄이는 기능. verbosity steering과, 재개 턴의 thinking effort를 낮추는 effort routing으로 구성.
- **counterfactual 절감**: 모델이 원래 썼을 출력을 알 수 없어 신뢰구간이 붙은 추정치로 보고하는 출력 절감 계측 방식.

## 8. 그림 후보 (Figure Candidates)

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | "라이브 데모: 10,144 → 1,260 토큰, 동일 FATAL 탐지" | manual | (선택) 데모 GIF — 시각 자료로 유용하나 애니메이션 |
| fig02 | "headroom learn: 실패 세션 마이닝 → CLAUDE.local.md" | manual | (선택) 데모 GIF |

> repo에 정적 아키텍처 도식은 없고 ASCII 다이어그램만 존재한다(본문에 텍스트로 보존). GIF 2개는 repo 정책상 자동 fetch ❌ — 필요 시 사용자가 `wiki/assets/headroomlabs-ai-headroom/`에 수동 저장.
