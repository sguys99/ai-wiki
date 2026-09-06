---
title: "Magnitude (magnitudedev): Run your agent on local models"
type: repo
year: 2026
category: agents
raw_path: raw/repos/magnitudedev-magnitude.md
raw_filename: "magnitudedev-magnitude.md"
source_collection: external
org: "magnitudedev"
repo: "magnitude"
url: "https://github.com/magnitudedev/magnitude"
license: "Apache-2.0"
tags: [local-inference, inference-server, llama-cpp, gguf, quantization, speculative-decoding, coding-agents, harness, cli, rust, typescript, effect-ts, repo, oss]
figures:
  - id: fig01
    label: README ecosystem diagram
    kind: figure
    file: assets/magnitudedev-magnitude/fig01.png
    raw: https://github.com/magnitudedev/magnitude/blob/main/assets/readme/ecosystem-light.png
    caption: "Pi, OpenCode, Hermes, Codex, Claude Code, OpenClaw가 Magnitude에 연결되고 Magnitude가 로컬 모델을 실행하는 생태계 구성도"
    strategy: manual
    curated: false
---
## 한 줄 요약 (One-line Summary)

사용자 기기의 하드웨어를 프로파일링해 그 기기에서 잘 동작할 로컬 모델을 추천, 다운로드, 튜닝, 실행하고, Claude Code나 Codex 같은 기존 harness에 loopback API로 연결해 주는 오픈소스 로컬 추론 서버. Rust와 llama.cpp로 만든 추론 엔진(ICN)과 Effect-TS 기반 데몬(ACN), 자체 harness를 하나의 monorepo에 담았다.

## 1. 자료 정보 (Document Information)

- **Org / Repo**: `magnitudedev/magnitude`
- **제품 설명**: "Open source inference server that runs the best local models for your hardware, plugged into the agent you already use"
- **License**: Apache-2.0
- **주 언어**: TypeScript (엔진은 Rust)
- **저장소 생성**: 2026-06-12, 최근 푸시 2026-09-06 (수집 시각 기준)
- **채택 지표**: star 3,437, fork 247 (2026-09-06 GitHub API 조회)
- **공식 사이트**: magnitude.dev, 문서 docs.magnitude.dev
- **배포 패키지**: npm `@magnitudedev/cli`
- **지원 OS**: macOS, Linux, Windows는 WSL 경유
- **저장소 구성**: Bun workspace와 Turborepo 기반 monorepo (`cli`, `desktop`, `web`, `inference`, `integrations/*`, `packages/*`)
- **수집 범위**: README 전문에 더해 저장소 내 `docs/` 8개 문서, `cli/src/agent-docs/topics/` 5개 문서, `inference/README.md`, `AGENTS.md`, `CONTRIBUTING.md`를 원문 그대로 함께 저장했다

## 2. 주요 기여 (Key Contributions)

1. **하드웨어 인지 모델 추천**: 프로세서, 메모리, 메모리 대역폭, Metal이나 CUDA 같은 가속기를 감지해 프로파일을 캐시하고, 가중치 전체를 내려받지 않은 상태에서 모델 메타데이터만으로 "이 구성이 이 기기에 들어가는가, 얼마나 빠를 것인가"를 추정한다. 최대 10개 구성을 순위로 제시한다.
2. **에이전트 주도 온보딩**: 사용자가 CLI를 배우는 대신 프롬프트 한 줄을 자기 에이전트에 보내면, 에이전트가 `magnitude docs onboarding`을 읽고 설치, 프로파일링, 모델 선택 대화, 다운로드, 로드, harness 연결까지 진행한다. 저장소는 이 온보딩 지시문 자체를 CLI에 번들로 넣어 배포한다.
3. **에이전트 워크로드용 로컬 추론 엔진**: Rust로 작성하고 llama.cpp 위에 올린 ICN(Inference Control Node)을 직접 관리한다. 별도 추론 런타임을 사용자가 설치하거나 설정하지 않는다.
4. **요청 시점 로드와 유휴 시 해제**: 다운로드한 모델은 디스크에 머물다가 요청이 오면 메모리에 올라가고, 유휴 상태이거나 기기 메모리가 부족해지면 해제된다. 해제는 선택과 다운로드를 유지한 채 추론 메모리만 반환한다.
5. **모델 간 차이 정규화**: 로컬 모델마다 다른 reasoning 형식, tool call 형식, chat template, 대화 이력 규약을 서버가 흡수해 harness가 모델별 분기 코드를 갖지 않게 한다.
6. **speculative decoding 자동 구성**: 카탈로그 구성마다 검토된 speculative decoding 방식과 필요한 draft 아티팩트를 선언해 두고, 설치와 로드 시점에 검증한 뒤 추론에서 자동 활성화한다. 사용자가 draft 모델을 짝지을 필요가 없다.
7. **harness 9종 연결**: Magnitude 자체 harness에 더해 Pi, OpenCode, Hermes, OpenClaw, Codex, Claude Code, Oh My Pi, Cline을 canonical ID로 관리하고, 연결 시 harness 설정 파일을 갱신하며 번들 스킬까지 설치한다.
8. **로컬 모델에 맞춘 자체 harness**: 컨텍스트가 작은 모델을 전제로 compaction을 백그라운드에서 수행하고, tool call을 검증해 복구 피드백을 주며, 반복 tool call(doom loop)과 과도한 reasoning을 차단한다.
9. **추론 검증 체계**: llama.cpp 원본과의 correctness parity, 동일 작업을 증명한 뒤에만 측정하는 performance parity, 스케줄링과 동시성까지 포함하는 composite benchmark를 3계층으로 분리했다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 패키지 계층

`AGENTS.md`가 선언한 의존 방향은 다음과 같다.

```
clients (cli/web) → client-common → sdk → acn (daemon)
```

클라이언트는 `@magnitudedev/client-common`과 `@magnitudedev/sdk`에서만 import하고 `acn`, `agent`, `acn-protocol`, `ai`, `providers`를 직접 참조하지 않는다. `acn`은 에이전트 런타임, 세션, 파일 조작, 디스플레이 스트림을 호스팅하는 서버 데몬이고, `acn-protocol`은 SDK와 ACN이 공유하는 wire contract다. `ai`는 provider 중립 계약(`Provider`, `ModelCatalog`, `BoundModel`, `BaseCallOptions`)을 정의하고 `providers`가 구현체와 레지스트리를 담는다. `event-core`는 event sourcing과 projection을, `storage`는 세션과 설정 저장을 맡는다.

`packages/` 하위 규모는 `agent` 399개, `client-common` 198개, `acn` 131개, `ai` 109개, `inference-benchmark` 99개 blob 순이다. 코드베이스는 Effect-TS 네이티브를 규약으로 못박아 두었고, 직렬화나 검증이 필요한 데이터는 Effect Schema로, ID 성격의 문자열은 branded type으로 표현하도록 요구한다.

### 3.2 추론 엔진 ICN

`inference/` 워크스페이스가 ICN을 빌드한다. crate 구성은 다음과 같다.

| crate | 역할 |
|---|---|
| `icn-contracts` | 전송 방식과 backend에 중립인 계약 정의 |
| `icn-models` | 모델 생애주기 |
| `icn-hardware` | 하드웨어 적합성 평가 |
| `icn-reasoning` | chat template 기반 reasoning 형식 검사 |
| `icn-engine` | 실제 추론 실행 |
| `icn-speculative` | speculative decoding |
| `icn-catalog` | 카탈로그 |
| `icn-api` | HTTP와 OpenAPI 경계 |
| `icn-server` | 조립 지점 |
| `icn-parity`, `icn-parity-probe` | 원본 대비 동등성 검증 |
| `benchmark-runner` | composite benchmark 실행 라이브러리와 CLI |

네이티브 의존성은 두 단계로 고정한다. `native-pin.toml`이 `llama-cpp-rs` 포크의 정확한 커밋과 그 커밋이 품고 있는 llama.cpp gitlink를 각각 기록하고, 바인딩 소스는 `inference/native/llama-cpp-rs`에 체크아웃해 상대 경로로 소비한다. 바인딩을 고칠 때는 포크에 먼저 커밋과 푸시를 하고 나서 Magnitude 쪽 포인터를 갱신해야 하며, 푸시되지 않은 커밋을 가리키면 다른 체크아웃과 CI가 가져올 수 없다.

개발용 서버는 모델 파일 없이 뜨는 결정적 fake backend를 제공한다(`bun icn:dev`). 실제 GGUF를 쓸 때는 `bun icn:serve -- --model <경로> --model-alias <별칭> --bind 127.0.0.1:8080` 형태로 실행하고, Apple Silicon에서는 고정된 바인딩이 macOS Metal backend를 활성화한다. `--gpu-layers 0`은 CPU 실행을 강제한다.

### 3.3 모델 준비 두 단계

CLI는 준비 상태를 discovery와 assessment 두 단계로 보고한다.

- **discovery**: 기기에 이미 있는 Hugging Face 캐시를 훑어 완전하고 사용 가능한 GGUF 모델을 찾는다. 로컬 읽기 전용 스캔이며 네트워크를 쓰지 않는다.
- **assessment**: 카탈로그 구성과 discovery가 찾은 모델을 이 하드웨어에 대해 평가한다. 호환성, 메모리 적합, 서빙 구성, 가속 방식, 예상 생성 속도를 판정해 잘 동작하지 않을 모델을 제외하고 나머지를 순위로 만든다.

온보딩 지시문은 두 단계가 모두 `Complete`로 보고될 때까지 약 10초 간격으로 `magnitude catalog status`를 다시 조회하라고 규정한다.

### 3.4 추천 순위와 표시 속성

`magnitude catalog recommendations`는 모델 지능, 예상 생성 속도, 양자화 품질, 설정된 context 크기, 물리 메모리를 함께 고려해 순위를 만든다. preference는 5단계이고 별도 카탈로그가 아니라 같은 후보 집합의 균형점을 옮기는 값이다.

| preference | 성격 |
|---|---|
| `fastest` | 속도 최우선, 지능은 제한적으로만 고려하는 극단값 |
| `faster` | 속도 쪽으로 기울이되 지능도 의미 있게 고려 |
| `balanced` | 기본값, 속도와 지능의 절충 |
| `smarter` | 지능 쪽으로 기울이되 속도도 의미 있게 고려 |
| `smartest` | 지능 최우선, 느린 생성을 감수하는 극단값 |

추천 항목이 노출하는 속성은 다음과 같다.

| 속성 | 의미 |
|---|---|
| Speed | 이 기기에서의 생성 처리량 추정치. 표시된 범위는 짧은 context와 긴 context 사이의 변동 폭이며 신뢰구간이 아니다 |
| Memory | 실행 중 필요한 추정 메모리. 다운로드 크기가 아니다 |
| Context | 이 서빙 구성에서 쓸 수 있는 대화와 작업 자료의 양. 모델 아키텍처의 절대 최대치와 다를 수 있다 |
| Intelligence | Artificial Analysis Intelligence Index 점수. 퍼센트 기호로 표시하지만 확률이나 정답률이 아니다 |
| Accuracy | 양자화 이후 로컬 아티팩트가 원본 모델을 얼마나 충실히 보존하는지. 사실 정확도가 아니며 Intelligence와 별개다 |
| Acceleration | 준비된 speculative decoding 방식 |
| Capabilities | vision, tool use, structured output, reasoning 등 지원 기능 |
| ID | 이후 명령에 그대로 넣어야 하는 정확한 구성 식별자. 표시용 이름은 인자가 아니다 |

### 3.5 speculative decoding 4종

speculative decoding은 값싼 수단으로 여러 토큰을 미리 제안하고 target 모델이 한꺼번에 검증하게 해 생성 속도를 올리는 기법이다. 채택 여부는 target이 결정하므로 모델의 지능이나 품질 등급은 바뀌지 않는다.

| 방식 | 내용 |
|---|---|
| None | speculative draft 없이 통상적인 autoregressive decoding. 비교 기준선 |
| MTP | Multi-Token Prediction(NextN). target과 함께 학습된 보조 모듈이 미래 토큰을 제안한다. 유효 draft가 짧거나 순차적이다 |
| DFlash | target의 hidden feature를 쓰는 경량 block-diffusion drafter가 한 번의 forward pass로 토큰 블록 전체를 제안한다. 블록 뒷부분에서 채택률이 떨어질 수 있다 |
| DSpark | DFlash의 병렬 구조에 준자기회귀 head를 더해 블록 내부 토큰 간 의존성을 복원하고, confidence head가 확신이 낮은 뒷부분을 검증 전에 잘라낸다 |

일반적 속도 순서는 `None → MTP → DFlash → DSpark`이지만 보장이 아니다. target과 draft 모델, draft 채택률, 프롬프트와 출력 내용, context 길이, 양자화, 하드웨어, 메모리 배치, 요청 동시성에 따라 이득이 없거나 오히려 부담이 될 수 있다. 문서는 방식 이름보다 기기별 속도 근거를 우선하라고 명시한다. 검토된 호환 방식이 없는 구성은 speculative decoding 없이 실행된다.

### 3.6 런타임 동작

- **요청 시점 로드**: 요청이 오면 설정된 모델을 메모리에 올린다. 해제 직후 첫 요청은 로드 시간을 포함하고, 활성 상태의 요청은 즉시 추론에 들어간다.
- **하드웨어 튜닝**: 가속, 모델 배치, context, speculative decoding, 런타임 설정을 현재 기기에 맞춰 구성한다. 로드 직전마다 가용 메모리를 다시 확인해, 평소 들어가는 모델이라도 다른 응용이 메모리를 많이 쓰고 있으면 시작하지 않는다.
- **context와 동시성**: 요청마다 설정된 context를 보존한다. 더 많은 요청을 밀어 넣으려고 context를 조용히 줄이지 않고, 남은 여유만 동시 작업에 쓴다.
- **prefill 절감**: 진행 중인 에이전트 세션에서는 호환되는 프롬프트 상태를 재사용해 새 입력만 처리한다.
- **메모리 보호**: 로드와 실행 중에 메모리를 감시하다가 가용량이 위험 수준으로 떨어지면 추론이 기기를 불안정하게 만들기 전에 모델을 중단한다. 다운로드와 선택 상태는 유지된다.

### 3.7 인터페이스

백그라운드 서비스는 loopback `http://127.0.0.1:10100`에서 대기한다.

| API | base URL | 지원 |
|---|---|---|
| OpenAI 호환 | `http://127.0.0.1:10100/inference/v1` | 모델 목록, Chat Completions, Responses |
| Anthropic 호환 | `http://127.0.0.1:10100/inference/anthropic` | Messages, 토큰 카운트 |

CLI는 관찰 명령마다 `--json`을 지원하며, 주요 명령군은 `service`, `catalog`, `models`, `connections`, `docs`다.

| 명령 | 목적 |
|---|---|
| `magnitude setup` | 대화형 모델 탐색과 설정 |
| `magnitude service install / start / status / stop / uninstall` | 사용자 단위 로그인 서비스 관리 |
| `magnitude catalog status` | discovery와 assessment 진행 상태 |
| `magnitude catalog recommendations [--preference <값>] [--limit <수>]` | 추천 목록 |
| `magnitude catalog pull / remove / cancel <model-id>` | 카탈로그 모델 설치와 제거 |
| `magnitude models status / load <model-id> / stop` | 설치 모델과 실행 상태 |
| `magnitude connections list / add / sync / remove` | harness 연결 관리 |
| `magnitude docs [topic-id]` | 에이전트용 번들 문서 열람 |
| `magnitude update` | Magnitude 갱신 |

사용자 데이터는 `~/.magnitude/` 아래에 모인다. `models/`는 관리 대상 모델, `cache/`는 모델 메타데이터와 하드웨어 프로파일 같은 파생 데이터, `sessions/`는 자체 harness 대화, `logs/`, `traces/`, `config.json`, `harness-connections.json`이 함께 놓인다. 문서는 `cache/`만 지우는 것은 파생 데이터 재생성으로 끝나지만 `~/.magnitude` 전체 삭제를 일반적인 문제 해결 수단으로 쓰지 말라고 경고한다.

### 3.8 harness 연결과 handoff

`magnitude connections add <harness-id> --set-model <model-id> --install-skill`은 설치된 모델을 대상 harness에 게시하고, 선택한 모델을 설정에 반영하며, 번들 스킬을 설치하거나 갱신한다. 스킬은 그 harness의 에이전트가 이후 로컬 모델을 CLI로 관리하는 방법을 담는다.

| harness | ID | 모델 준비 후 전환 방법 |
|---|---|---|
| Magnitude | `magnitude` | 로드된 모델이 자동 선택된다 |
| Pi | `pi` | `/model` 또는 Ctrl+L로 현재 세션에서 전환 |
| OpenCode | `opencode` | Ctrl+C로 종료 후 출력된 실행 명령으로 재시작 |
| Hermes | `hermes` | 동일 |
| OpenClaw | `openclaw` | 동일. 전용 Magnitude 에이전트 세션이 오래된 모델 설정을 피한다 |
| Codex | `codex` | 동일 |
| Claude Code | `claude-code` | 동일 |
| Oh My Pi | `oh-my-pi` | 동일 |
| Cline | `cline` | 동일 |

Codex와 Claude Code는 연결이 설치되어 있는 동안 Magnitude의 로컬 게이트웨이를 계속 사용하므로, 호스팅 모델로 돌아갈 때도 백그라운드 서비스가 필요하다. 설정은 로그인 시 서비스가 자동 시작되도록 등록한다.

### 3.9 자체 harness

Magnitude harness는 로컬 모델의 제약을 전제로 설계했다. 작은 context를 낭비하지 않도록 관련 없는 이력을 쌓지 않고, compaction이 자주 필요하므로 대기 없이 백그라운드에서 수행한다. tool call을 검증해 모델이 틀렸을 때 복구 피드백을 주고, 반복되거나 폭주하는 tool use를 끊으며, 과도한 reasoning을 잘라 작업으로 되돌린다.

프로젝트 작업에서는 `@`로 파일과 디렉토리를 언급하고, `/bash`나 `!` 접두로 셸 명령을 실행하며, `/init`으로 `AGENTS.md`를 만든다. 대화는 자동 저장되고 `/resume`이나 Ctrl+R로 되돌아간다. 스킬은 `.claude/skills`, `.agents/skills`, `.magnitude/skills`를 프로젝트와 홈 디렉토리에서 각각 읽고 프로젝트 쪽이 우선한다. `EXA_API_KEY`를 설정하면 Exa 웹 검색이 켜진다.

### 3.10 카탈로그 외 모델과 사용자 지정 엔드포인트

카탈로그 밖 모델은 Hugging Face Hub 캐시에 완전한 GGUF로 존재하면 discovery가 찾아낸다. 캐시 경로는 `HF_HUB_CACHE`, `HUGGINGFACE_HUB_CACHE`, `HF_HOME`, `XDG_CACHE_HOME` 순으로 확인하고 없으면 `~/.cache/huggingface/hub`로 되돌아간다. 다운로드 후에는 재시작해야 목록이 갱신된다.

원격 모델도 붙일 수 있다. `~/.magnitude/config.json`의 `providers`에 OpenAI 호환 Chat Completions 엔드포인트를 선언하면 유효한 변경이 자동 반영되고 일반 모델 선택 목록에 나타난다. `baseUrl`은 API 루트만 적고 `/chat/completions`를 붙이지 않으며, 모델 키는 엔드포인트가 받는 정확한 ID를 쓰고, 자격 증명은 파일에 저장하지 않고 환경 변수로 참조한다.

### 3.11 추론 검증 체계

`inference/README.md`는 검증을 세 계층으로 나눈다.

1. **correctness parity**: 네이티브와 ICN의 최소 관찰 단위 연산을 비교한다. 출력, 실효 설정, 상태 전이가 대상이다.
2. **performance parity**: 양쪽이 동등한 작업을 수행했음을 증명한 뒤에만 같은 연산의 시간을 잰다.
3. **composite benchmarking**: ICN과 고정된 `llama-server` 엔드포인트에 통제된 완료 워크로드를 보내 스케줄링, 동시성, prefix 재사용, prefill과 decode 혼합, 지연, 처리량, 공정성, 메모리, 실패까지 엔진 전체를 측정한다.

parity 실행은 생성된 chat 응답이나 HTTP 교환을 기본 증거로 쓰지 않는다. 엄격 비교는 동일한 모델 바이트, template, 설정, 샘플링, 토큰 작업을 전제로 하며, 응답이나 작업이 어긋나면 그것은 correctness 결과이고 타이밍은 무효가 된다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

README와 공식 문서에는 공개된 정량 성능 수치가 없다. 대신 두 종류의 기준점을 제공한다.

첫째, 추천 화면의 Intelligence 점수를 해석할 수 있도록 Artificial Analysis Intelligence Index v4.1.1의 2026-09-01 스냅샷을 CLI 문서에 함께 싣는다.

| 참조 모델 | 평가 구성 | 점수 |
|---|---|---:|
| Claude Opus 5 | adaptive reasoning, max effort | 63 |
| Claude Fable 5 | adaptive reasoning, max effort, Opus 4.8 fallback | 62 |
| GPT-5.6 Sol | max effort | 61 |
| GPT-5.6 Terra | max effort | 57 |
| GPT-5.6 Luna | max effort | 52 |

문서는 이 표를 "로컬 모델 점수가 52 근처면 GPT-5.6 Luna와 같은 점수 영역"이라는 식의 눈금으로만 쓰라고 못박는다. 동작이 같다는 뜻이 아니며, 점수는 같은 index 버전과 비슷한 reasoning 설정끼리 비교해야 한다. Magnitude는 추천 시점에 네트워크로 점수를 갱신하지 않고 검토된 점수를 카탈로그와 함께 배포하며, 직접 측정한 점수가 없으면 저자 추정치임을 명시한다.

둘째, 속도는 `~36–48 tok/s` 같은 범위로 표시한다. 이는 하드웨어를 근거로 한 예측이며 내려받은 모델을 실제로 벤치마크한 결과가 아니다. 실제 속도는 프롬프트 길이, 동시 작업, 가용 메모리, 모델 리비전에 따라 달라진다.

채택 지표로는 star 3,437과 fork 247이 확인된다(2026-09-06 조회). 저장소는 2026-06-12에 만들어졌으므로 3개월이 되지 않은 프로젝트다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **공개 성능 근거 부재**: parity와 composite benchmark 체계를 갖췄지만 결과 수치는 저장소 문서에 공개되어 있지 않다. ICN이 `llama-server` 대비 어느 수준인지는 사용자가 직접 벤치마크를 실행해야 확인할 수 있다.
- **속도와 지능 표시의 해석 부담**: Speed는 예측 범위이지 신뢰구간이 아니고, Intelligence는 index 점수이지 정답률이 아니며, 양자화 변형은 모델 수준 점수를 공유한다. 로컬 아티팩트의 품질 손실은 Accuracy라는 별도 항목이 담당한다. 세 지표를 함께 읽지 않으면 잘못된 기대를 갖기 쉽다.
- **플랫폼 제약**: macOS와 Linux만 지원하고 Windows는 WSL을 거쳐야 한다.
- **서비스 의존성**: Codex와 Claude Code 연결은 백그라운드 서비스가 떠 있어야 유지된다. 서비스가 멈추면 호스팅 모델 사용까지 영향을 받아 `magnitude service start`로 되살려야 한다.
- **메모리 압박 시 중단**: 실행 중 가용 메모리가 위험해지면 모델이 중단된다. 기기가 안정적으로 유지되는 대신 요청은 실패하고 다음 요청에서 다시 로드된다.
- **카탈로그 밖 구성의 가속 한계**: 검토된 호환 speculative decoding이 없는 구성은 가속 없이 실행된다. 임의의 draft 모델을 target에 임의로 붙이지 않는다는 정책 때문이다.
- **네이티브 고정의 운영 부담**: llama.cpp 업그레이드는 바인딩 포크의 중첩 커밋 포인터를 갱신하고 그 포인터를 다시 커밋하는 절차를 요구한다. 순서를 어기면 다른 체크아웃과 CI가 소스를 가져오지 못한다.
- **문서의 독자 설정**: 상세 문서 상당수가 사람이 아니라 에이전트가 읽고 실행하도록 쓰였다. CLI를 직접 다루려는 사용자에게는 안내가 얇게 느껴질 수 있다.

## 6. 관련 연구 (Related Work)

- [[agents/bai-2026-how-do-ai-agents-spend]]: agentic coding의 토큰 소비와 비용 구조를 실측한 연구. Magnitude가 없애려는 비용 항목이 무엇인지 규모로 보여준다.
- [[agents/yongkyun-2026-cutting-llm-token-costs-with]]: 토큰 비용을 줄이는 도구 조합을 다룬 자료. 비용 절감을 컨텍스트 압축으로 접근한 사례로 로컬 실행과 대비된다.
- [[agents/stablyai-orca]]: 여러 CLI 에이전트를 worktree 단위로 오케스트레이션하는 데스크톱 앱. harness 위쪽을 다루는 반면 Magnitude는 harness 아래 모델 실행 계층을 다룬다.
- [[agents/ai-boost-awesome-harness-engineering]]: harness engineering 자료 모음. harness 연결이라는 개념의 배경이 된다.
- [[agents/lee-hoyeon-2026-harness-engineering]]: harness 개념을 단계별로 정리한 한국어 강의 자료.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| ICN (Inference Control Node) | Rust와 llama.cpp로 구현한 Magnitude의 추론 실행 노드. `inference/` 워크스페이스가 빌드한다 |
| ACN | 에이전트 런타임, 세션, 파일 조작, 디스플레이 스트림을 호스팅하는 서버 데몬. 클라이언트는 SDK를 통해서만 접근한다 |
| discovery | 기기의 Hugging Face 캐시를 읽기 전용으로 훑어 사용 가능한 GGUF 모델을 찾는 준비 단계 |
| assessment | 카탈로그와 discovery 결과를 현재 하드웨어에 대해 평가해 호환성, 메모리 적합, 서빙 구성, 가속, 예상 속도를 판정하는 단계 |
| residency | 설치된 모델이 지금 메모리에 올라가 있는지를 나타내는 상태. `magnitude models status`가 보고한다 |
| harness connection | Magnitude가 외부 harness의 설정 파일과 스킬을 갱신해 로컬 모델을 쓰게 만드는 연결 단위 |
| MTP | Multi-Token Prediction. target과 함께 학습된 보조 모듈이 다음 토큰들을 제안하는 speculative decoding 방식 |
| DFlash | target의 hidden feature를 사용해 한 번의 forward pass로 토큰 블록을 제안하는 block-diffusion drafter |
| DSpark | DFlash에 준자기회귀 head와 confidence head를 더해 블록 내부 의존성을 복원한 방식 |
| parity | ICN 결과가 원본 llama.cpp와 같은지 검증하는 체계. correctness, performance, composite 세 계층으로 나뉜다 |
| GGUF | llama.cpp 계열이 사용하는 로컬 모델 파일 포맷 |
| Artificial Analysis Intelligence Index | 수학, 과학, 코딩, 지식, long-context, agentic 과제를 묶어 산출하는 독립 평가 지수 |

## 8. 그림 후보 (Figure Candidates)

repo 자료는 이미지를 자동으로 내려받지 않는다. README에 실린 도식은 아래 한 개이며, wiki에 넣으려면 사용자가 직접 저장해야 한다.

| id | 위치 | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | `assets/readme/ecosystem-light.png` | Pi, OpenCode, Hermes, Codex, Claude Code, OpenClaw가 Magnitude에 연결되고 Magnitude가 로컬 모델을 실행하는 생태계 구성도 | manual | (수동 저장 필요) |
