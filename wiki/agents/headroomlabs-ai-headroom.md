---
title: "Headroom — The context compression layer for AI agents"
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

# Headroom — The context compression layer for AI agents

## 요약 (Summary)

Headroom은 AI 에이전트가 읽는 모든 것, 곧 tool 출력이나 로그, RAG 청크, 파일, 대화 이력을 LLM에 닿기 전에 압축해 토큰을 60~95% 줄이는 **context compression layer**다. 검색 품질을 손보는 대신 이미 만들어진 컨텍스트를 줄이는 쪽에서 context window 예산 문제를 푼다. 붙이는 방법은 세 가지다. 코드에 `compress(messages)`를 인라인으로 부르는 **library**, 코드를 바꾸지 않고 끼우는 **proxy**, 코딩 에이전트를 통째로 감싸는 `headroom wrap`. 여기에 MCP 서버와, Claude·Codex·Gemini를 잇는 cross-agent memory, 압축 원본을 로컬에 남겨 되돌리는 reversible 압축(CCR)까지 얹힌다. 전부 로컬에서 돌기 때문에 데이터가 머신을 떠나지 않고, 라이선스는 Apache 2.0이다.

> **저장소 주의**: 사용자가 준 경로는 `headroomlabs-ai/headroom`이지만, README의 CI와 Docker, `git clone`은 모두 정본 `chopratejas/headroom`을 가리킨다. `headroomlabs.ai`는 이를 상용 지원·매니지드로 파는 회사다.

## 주요 기여 (Key Contributions)

- **콘텐츠 인지 압축**: 모든 걸 하나로 뭉개지 않는다. `ContentRouter`가 유형을 가려내 JSON은 `SmartCrusher`로, 코드는 AST 기반 `CodeCompressor`로, 산문은 학습된 `Kompress-v2-base`로 나눠 압축한다.
- **세 갈래 배포**: 같은 파이프라인을 library·proxy·wrap 세 형태로 열어놨기 때문에 언어나 프레임워크에 매이지 않고 붙일 수 있다. proxy는 코드 변경 0을 내세운다.
- **되돌릴 수 있는 압축(CCR)**: 원본을 로컬에 캐시해 두고, LLM이 필요로 하면 `headroom_retrieve`로 원문을 되불러온다. 손실 압축에서 맥락이 사라질 위험을 retrieval로 막는 방식이다.
- **입력만이 아니라 출력 토큰까지**: proxy에서는 모델이 되돌려 쓰는 출력도 줄인다. system prompt 끝에 "장황하지 말고 맥락 복창하지 마라"를 붙이는 verbosity steering, tool 결과 뒤 재개 턴의 thinking effort를 낮추는 effort routing이 그 방법이다. Opus급에서 출력이 입력의 5배 비용이라는 점을 노렸다.
- **cross-agent memory / `headroom learn`**: 에이전트끼리 공유하는 메모리(자동 dedup)에, 실패한 세션을 마이닝해 `CLAUDE.local.md` 같은 메모리 파일에 교정을 자동으로 적어두는 학습 루프를 더했다.

## 방법론 및 아키텍처 (Methodology and Architecture)

파이프라인은 `compress()`·SDK·proxy가 공유하는 단일 lifecycle이다:

```
Setup → Pre-Start → Post-Start → Input Received → Input Cached
→ Input Routed → Input Compressed → Input Remembered → Pre-Send → Post-Send → Response Received
```

에이전트가 보낸 프롬프트와 tool 출력, 로그, RAG 결과, 파일은 먼저 `CacheAligner`를 거쳐 prefix가 안정화된다. Anthropic·OpenAI KV 캐시가 실제로 hit 하게 만들어, 압축이 캐시를 깨는 바람에 손해 보는 함정을 피하려는 것이다. 그다음 `ContentRouter`가 유형을 판별해 세 압축기 중 하나로 넘긴다.

- **SmartCrusher** — dict 배열·중첩 객체·혼합 타입까지 다루는 범용 JSON 압축기
- **CodeCompressor** — Python·JS/TS·Go·Rust·Java·C/C++·Perl을 AST 인지로 압축
- **Kompress-v2-base** — 에이전트 trace로 학습한 HuggingFace 산문 압축 모델
- **Image compression** — 학습된 ML 라우터로 40~90% 축소

압축 결과는 CCR로 원본을 로컬에 남긴 채 LLM 제공자(Anthropic·OpenAI·Bedrock 등)로 전달되고, 모델이 원문을 필요로 하면 `headroom_retrieve`로 되불러온다. 제공자나 도구별 특수 처리는 `headroom/providers/`(claude·copilot·codex·openclaw·gemini)에 따로 떼어놔, 코어가 lifecycle과 순서, 정책에만 집중하게 했다.

에이전트 호환은 `headroom wrap {tool}` 한 줄로 Claude Code·Codex·Aider·Copilot CLI·OpenClaw·OpenCode·Cline·Continue·Goose·OpenHands·Mistral Vibe를 감쌌다가 `headroom unwrap {tool}`로 되돌린다. Cursor는 수동으로 설정하고, Cortex Code는 library 모드만 지원해 60~65%를 절감한다. OpenAI 호환 클라이언트는 proxy로, MCP 클라이언트는 `headroom mcp install`로 붙인다.

## 결과 (Results)

**실제 에이전트 워크로드 절감:**

| 워크로드 | Before | After | 절감 |
|---|---:|---:|---:|
| Code search (100 results) | 17,765 | 1,408 | 92% |
| SRE incident debugging | 65,694 | 5,118 | 92% |
| GitHub issue triage | 54,174 | 14,761 | 73% |
| Codebase exploration | 78,502 | 41,254 | 47% |

**정확도 보존** (N=100): GSM8K 0.870 → 0.870 (±0.000), TruthfulQA 0.530 → 0.560 (+0.030), SQuAD v2 97%(19% 압축), BFCL 97%(32% 압축). 재현: `python -m headroom.evals suite --tier 1`.

출력 토큰 절감은 counterfactual이라 모델이 원래 뭘 썼을지 알 수 없고, 그래서 신뢰구간을 붙인 추정치로 보고한다. `headroom output-savings`를 실행하면 예컨대 `Reduction: 31.7% (95% CI 27.7% … 35.7%) [estimated]` 식으로 나온다. 추정이 아닌 측정값을 원한다면 대화 10%를 압축 없이 남기는 control group(`HEADROOM_OUTPUT_HOLDOUT=0.1`)을 켜면 된다.

## 한계 (Limitations)

- 단일 제공자의 네이티브 compaction만 쓰고 cross-agent memory가 필요 없거나, 로컬 프로세스를 못 돌리는 sandbox 환경이라면 얻는 게 적다(README 자인).
- Copilot subscription 인증 재사용은 macOS Keychain에서만 smoke-test됐다. Windows·Linux·Docker/CI 경로는 OS 검증이 아직 남아 있어, Docker나 CI에서는 `GITHUB_COPILOT_TOKEN`을 명시적으로 넘기길 권한다.
- Rust 코어 ONNX(`cdn.pyke.io`)와 압축 모델(`huggingface.co`)을 TLS로 내려받는다. SSL을 검사하는 사내망이라면 CA 신뢰나 오프라인 모드를 설정해야 한다.
- 대시보드의 달러 절감은 LiteLLM에 의존해서 Python 3.14+에서는 `$0.00`으로 고정된다(토큰 절감은 그래도 추적된다). 달러 표시를 원하면 3.13을 권한다.
- 출력 셰이핑은 기본이 off라 `HEADROOM_OUTPUT_SHAPER=1`로 켜야 하고, shared proxy에서는 이 값이 전역이라 마지막 설정이 이긴다.

## 관련 페이지 (Related Pages)

- [[agents/lee-hoyeon-2026-harness-engineering]] — Headroom은 여기서 말하는 harness 계층(Prompt→Context→Harness)의 실물 인프라에 해당한다. 컨텍스트를 압축과 정렬로 다룬다.
- [[agents/osmani-2026-loop-engineering]] — 에이전트 운영 루프를 설계하는 문제의식이 겹친다. Headroom은 그 루프의 토큰 비용을 깎는 계층이다.
- [[database/li-2026-beyond-semantic-similarity-rethinking-retrieval]] — vectorless와 토큰 절약을 다룬다. 검색 대신 압축으로 예산을 푼다는 점에서 대칭을 이룬다.
