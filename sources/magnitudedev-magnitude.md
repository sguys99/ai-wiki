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

| 항목 | 값 |
|---|---|
| Org / Repo | `magnitudedev/magnitude` |
| 제품 설명 | "Open source inference server that runs the best local models for your hardware, plugged into the agent you already use" |
| License | Apache-2.0 |
| 주 언어 | TypeScript (추론 엔진은 Rust) |
| 저장소 생성 | 2026-06-12 |
| 최근 push | 2026-09-06 (GitHub API `pushed_at`, 수집일과 같은 날) |
| 채택 지표 | star 3,437, fork 247, open issue 17 (2026-09-06 GitHub API 조회) |
| 기본 브랜치 | `main` |
| 공식 사이트 | magnitude.dev, 문서 docs.magnitude.dev |
| 배포 패키지 | npm `@magnitudedev/cli` |
| 지원 OS | macOS, Linux, Windows는 WSL 경유 |
| 커뮤니티 채널 | Discord, X(@usemagnitude) |
| 저장소 구성 | Bun workspace와 Turborepo 기반 monorepo (`cli`, `desktop`, `web`, `inference`, `integrations/*`, `packages/*`) |

GitHub API가 보고한 `topics`는 빈 배열이므로 저장소에 등록된 토픽 태그는 없다.

**수집 범위**: README 전문에 더해 저장소 내 `docs/` 문서 8편(`introduction`, `get-started`, `inference`, `models`, `magnitude-harness`, `reference`, `faq`, `troubleshooting`), 에이전트용 번들 문서 5편(`onboarding`, `recommendations`, `speculative-methods`, `custom-endpoints`, `cli`), `inference/README.md`, `AGENTS.md`, `CONTRIBUTING.md`를 원문 그대로 함께 저장했다. README 자체는 짧은 소개와 FAQ 위주이고 동작 세부는 함께 수집한 문서에 있다.

## 2. 주요 기여 (Key Contributions)

1. **하드웨어 인지 모델 추천**: 프로세서, 메모리, 메모리 대역폭, 아키텍처, Metal이나 CUDA 같은 가속기를 감지해 프로파일을 캐시하고, 가중치 전체를 내려받지 않은 상태에서 모델 메타데이터만으로 "이 구성이 이 기기에 들어가는가, 얼마나 빠를 것인가"를 추정한다. 최대 10개 구성을 순위로 제시한다.
2. **에이전트 주도 온보딩**: 사용자가 CLI를 배우는 대신 프롬프트 한 줄을 자기 에이전트에 보내면, 에이전트가 `magnitude docs onboarding`을 읽고 설치, 프로파일링, 모델 선택 대화, 다운로드, 로드, harness 연결까지 진행한다. 저장소는 이 온보딩 지시문 자체를 CLI에 번들로 넣어 배포한다.
3. **에이전트 워크로드용 로컬 추론 엔진**: Rust로 작성하고 llama.cpp 위에 올린 ICN(Inference Control Node)을 Magnitude가 직접 설치하고 관리한다. 별도 추론 런타임을 사용자가 설치하거나 설정하지 않는다.
4. **요청 시점 로드와 유휴 시 해제**: 다운로드한 모델은 디스크에 머물다가 요청이 오면 메모리에 올라가고, 유휴 상태이거나 기기 메모리가 부족해지면 해제된다. 해제는 선택과 다운로드를 유지한 채 추론 메모리만 반환한다.
5. **모델 간 차이 정규화**: 로컬 모델마다 다른 reasoning 형식, tool call 형식, chat template, 대화 이력 규약을 서버가 흡수해 harness가 모델별 분기 코드를 갖지 않게 한다.
6. **speculative decoding 자동 구성**: 카탈로그 구성마다 검토된 speculative decoding 방식과 필요한 draft 아티팩트를 선언해 두고, 설치와 로드 시점에 검증한 뒤 추론에서 자동 활성화한다. 사용자가 draft 모델을 짝지을 필요가 없다.
7. **harness 9종 연결**: Magnitude 자체 harness에 더해 Pi, OpenCode, Hermes, OpenClaw, Codex, Claude Code, Oh My Pi, Cline을 canonical ID로 관리하고, 연결 시 harness 설정 파일을 갱신하며 번들 스킬까지 설치한다.
8. **로컬 모델에 맞춘 자체 harness**: 컨텍스트가 작은 모델을 전제로 compaction을 백그라운드에서 수행하고, tool call을 검증해 복구 피드백을 주며, 반복 tool call(doom loop)과 과도한 reasoning을 차단한다.
9. **추론 검증 체계**: llama.cpp 원본과의 correctness parity, 동일 작업을 증명한 뒤에만 측정하는 performance parity, 스케줄링과 동시성까지 포함하는 composite benchmark를 3계층으로 분리했다.
10. **에이전트가 읽을 수 있는 운영 표면**: 관찰 명령마다 `--json`을 지원하고, 세션 이벤트 재생 도구 `bun session`과 로컬 OpenTelemetry 수집기 Motel을 포함해 상태를 스스로 진단하게 했다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 저장소 구성과 패키지 계층

저장소 루트에는 `cli`, `desktop`, `web`, `inference`, `integrations`, `packages`, `docs`, `design`, `info`, `assets`, `patches`, `scripts` 디렉토리와 `AGENTS.md`, `CONTRIBUTING.md`, `turbo.json`, `bun.lock`, `vitest.workspace.ts`가 놓인다. `packages/` 하위에는 33개 패키지가 있다.

`AGENTS.md`가 선언한 의존 방향은 다음과 같다.

```
clients (cli/web) → client-common → sdk → acn (daemon)
```

클라이언트는 `@magnitudedev/client-common`과 `@magnitudedev/sdk`에서만 import하고 `acn`, `agent`, `acn-protocol`, `ai`, `providers`를 직접 참조하지 않는다.

| 패키지 | 역할 |
|---|---|
| `client-common` | 공유 상태, hook, 디스플레이 동기화. 연결 단위 Effect Query `AgentClient` 하나와 1차 Query, Mutation, Subscription 정의를 소유한다 |
| `sdk` | 비공개 이식형 Effect RPC 클라이언트. 고정 엔드포인트 admission과 복구, 옵션인 서비스 시작. SQLite와 프로세스 감독, 쿼리 캐시는 담지 않는다 |
| `daemon-management` | owner store, 프로세스 감독, 바이너리 취득, OS 서비스 구현. 특권 조립 지점만 import한다 |
| `acn` | 에이전트 런타임, 세션, 파일 조작, 디스플레이 스트림을 호스팅하는 서버 데몬 |
| `acn-protocol` | SDK와 ACN이 공유하는 wire contract(RPC, 스키마). 클라이언트는 import하지 않는다 |
| `ai` / `providers` | provider 중립 계약(`Provider`, `ModelCatalog`, `BoundModel`, `BaseCallOptions`) / 구현체와 레지스트리 |
| `agent` | 에이전트 런타임, projection, worker, 도구, 디스플레이 구체화 |
| `event-core` / `storage` / `roles` | event sourcing과 주소 지정 상태 / 세션과 설정과 인증 저장 / worker 특화용 role과 slot |
| `release` / `version` | 릴리스와 Changesets, 버전 할당 / 빌드 identity 생성 |

blob 수 기준 상위 패키지는 `agent` 399개, `client-common` 198개, `acn` 131개, `ai` 109개, `inference-benchmark` 99개, `event-core` 96개, `acn-protocol` 85개 순이다. `cli/src/` 안에서는 `features` 144개가 가장 크고 `harness-connections` 31개, `components` 29개, `commands` 26개가 뒤를 잇는다.

새 backend 연산 추가 절차도 규약이다. `packages/acn-protocol/src/boundary/`의 해당 도메인에 `Rpc.make`를 한 번 선언하고, ACN에 핸들러를 구현하고, 파생된 SDK 메서드를 소비한다. Effect Query는 RPC를 생성하지 않으므로 캐싱과 동기화 정책은 `packages/client-common/src/operations/`에 따로 추가한다. 유한 RPC 선언은 `replaySafe`나 `atMostOnce` 중 하나를 반드시 적용해야 한다.

### 3.2 코드베이스 규약

`AGENTS.md`는 일반 원칙 3개와 Effect 사용 규약을 명시한다.

| 원칙 | 내용 |
|---|---|
| 의미 있는 추상화 형성 | 간접 계층을 늘리는 것이 아니라 시스템의 핵심 동작과 구성 요소를 식별해 관용적으로 조합한다 |
| 과설계와 누더기 코드 금지 | 일어나지 않을 경우를 위해 설계하지 않는다. 불완전한 변경 위에 변경을 덧붙이는 것을 누더기 코드의 신호로 보고 리팩터링한다 |
| 불필요한 하위 호환 금지 | 사용자가 명시적으로 요청하지 않으면 하위 호환 shim이나 legacy 코드를 남기지 않는다 |

Effect 규약은 네 항목이다. 새 코드는 Effect-TS 네이티브여야 하고, Effect 코드에 닿는 TypeScript 코드는 effectful 상태를 유지하거나 그렇게 바뀌어야 하며 역방향은 허용하지 않는다. 의존성 주입은 Effect DI로 하고 서비스는 태그와 같은 이름의 interface를 가진 `Context.Tag`로 만든다. 직렬화, 검사, 검증이 필요한 데이터는 Effect Schema로 표현하고, 선택 값은 `Schema.optionalWith(Schema.String, { as: 'Option', exact: true })`로 선언해 `undefined`가 아니라 존재와 부재 두 상태로만 직렬화되게 한다. ID 성격의 문자열은 branded type을 쓴다.

### 3.3 추론 엔진 ICN

`inference/` 워크스페이스가 ICN을 빌드한다. Rust crate는 13개다.

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
| `icn-parity` | parity 자산 검증과 실행. 바인딩 포크에 의존하지 않는다 |
| `icn-parity-probe` | 프로덕션 코드 경로를 통해 짝지어진 연산을 노출하는 probe |
| `icn-utils` | 공용 유틸리티 |
| `benchmark-runner` | composite benchmark 실행 라이브러리와 CLI |

네이티브 의존성은 두 단계로 고정한다. `native-pin.toml`이 `llama-cpp-rs` 포크의 정확한 커밋과 그 커밋이 품고 있는 llama.cpp gitlink를 각각 기록하고, 바인딩 소스는 `inference/native/llama-cpp-rs`에 체크아웃해 `llama-cpp-2` crate를 상대 경로로 소비한다. 두 번째 Cargo Git 체크아웃을 만들지 않기 위한 조치다. 어느 pin이든 바꾼 뒤에는 `bun icn:verify-native-pin`을 실행하고, ICN이 보는 backend interface는 그대로 둔다.

바인딩 변경 순서는 세 단계로 고정되어 있다. `inference/native/llama-cpp-rs`를 고쳐 테스트하고, 그 변경을 `magnitudedev/llama-cpp-rs`에 커밋과 푸시하고, 그다음 Magnitude 쪽 포인터를 커밋한다. 푸시되지 않은 커밋을 가리키면 다른 체크아웃과 CI가 가져올 수 없다. upstream 승인은 필요하지 않고 upstream PR은 선택이며, llama.cpp 업그레이드는 중첩 커밋 포인터를 바인딩 포크에서 갱신해 커밋하는 방식이다. 클론 후에는 `git submodule update --init --recursive`로 두 submodule을 초기화한다.

바인딩 포크는 체크인된 C, C++ wrapper 소스를 고정된 llama.cpp 체크아웃과 함께 직접 컴파일하며 소스 overlay를 만들지 않는다. `parity/upstream/binding-surfaces.json`은 upstream, bridge, safe Rust 표면을 매핑한 parity 소유 감사 목록이며 포크 빌드 입력이 아니다.

개발용 서버는 모델 파일 없이 뜨는 결정적 fake backend를 제공한다(`bun icn:dev`, 모델 별칭 `icn-fake`, `127.0.0.1:8080`). 실제 GGUF를 쓸 때는 `bun icn:serve -- --model <경로> --model-alias <별칭> --bind 127.0.0.1:8080` 형태로 실행하고, Apple Silicon에서는 고정된 바인딩이 macOS Metal backend를 활성화한다. 기본값은 모든 layer를 offload하려 하고 `--gpu-layers 0`은 CPU 실행을 강제한다. 요청 최상위에 `"timings_per_token": true`를 넣으면 llama.cpp 호환 누적 타이밍 스냅샷이 스트림 갱신에 실린다.

### 3.4 설치와 온보딩

설치 경로는 두 가지다. 에이전트 주도 경로는 정해진 프롬프트 한 줄을 자기 에이전트에 보내는 것으로 시작한다. 프롬프트는 `npm i -g @magnitudedev/cli` 설치와 `magnitude docs onboarding` 실행을 지시하고, 에이전트가 하드웨어 프로파일링, 모델 안내, 다운로드, 자기 자신의 모델 전환까지 수행한다. 수동 경로는 CLI를 전역 설치하고 `magnitude setup`으로 대화형 설정을 여는 것이다. 패키지 매니저는 npm, bun, pnpm, yarn 네 가지를 문서가 각각 안내한다.

대화형 설정은 6단계로 진행된다.

대화형 설정은 프로파일링, 조합 순위화, 절충 표시, 다운로드와 설정, harness 연결, harness 실행 6단계로 진행된다.

대화형 설정에는 Fast와 Smart 사이를 옮기는 조절값이 있고, Fast 쪽으로 옮기면 생성 속도를, Smart 쪽으로 옮기면 지능을 우선한다.

에이전트용 온보딩 지시문은 절차를 5단계로 규정하고 진행 방식까지 지시한다. 명령을 조용히 일괄 실행하지 말고 각 주요 동작 전에 무엇을 왜 하는지 짧게 설명하며, 백그라운드 작업 중에는 의미 있는 진행 상황을 전달하고, 결정 시점에는 선택지와 절충을 설명한 뒤 초점 있는 질문을 하나 던지라고 요구한다. Magnitude가 표시한 정확한 모델 ID를 보존하고 표시용 이름을 명령 인자로 쓰지 말라는 지시도 반복된다.

| 온보딩 단계 | 명령 | 확인 조건 |
|---|---|---|
| 1. 설치 완료 | `magnitude service install`, `magnitude service start` | `service install`은 로그인 시작 등록과 실행 파일 해석만 한다. 추론 엔진은 실행 중인 서비스가 취득하므로 `service start`를 생략할 수 없다 |
| 2. 준비 대기와 선택 | `magnitude catalog status`, `magnitude catalog recommendations --preference balanced --limit 10` | Discovery와 Assessment가 모두 `Complete`가 될 때까지 약 10초 간격 재조회 |
| 3. 모델 설치 | `magnitude catalog pull <model-id>`, `magnitude models status <model-id>` | 설치 상태가 `Installed`가 될 때까지 폴링 |
| 4. 모델 로드 | `magnitude models load <model-id>`, `magnitude models status <model-id>` | 런타임 상태가 `Ready`가 될 때까지 폴링 |
| 5. harness 연결 제안 | `magnitude connections add <harness-id> --set-model <model-id> --install-skill` | 사용자 동의 후 실행 |

진행률 보고 규칙도 정해져 있다. 퍼센트와 다운로드 바이트의 의미 있는 변화만 전달하고, 진행 표본이 두 개 이상 모인 뒤에야 관측된 바이트 속도로 남은 시간을 추정하되 추정임을 밝히며, 진행이 멈췄거나 전체 크기를 알 수 없으면 추정치를 만들지 않는다. 온보딩 에이전트로 동작하는 동안 대화형 `magnitude setup` 흐름으로 대체하지 말라는 제약도 있다.

### 3.5 모델 준비 두 단계

CLI는 준비 상태를 discovery와 assessment 두 단계로 보고한다.

| 단계 | 내용 | 네트워크 |
|---|---|---|
| discovery | 기기에 이미 있는 Hugging Face 모델 캐시를 훑어 완전하고 사용 가능한 GGUF 모델을 찾는다 | 사용하지 않는다. 로컬 읽기 전용 스캔이며 Hub에 접속하지 않는다 |
| assessment | 카탈로그 구성과 discovery가 찾은 모델을 이 하드웨어에 대해 평가한다. 호환성, 메모리 적합, 서빙 구성, 가용 가속, 예상 생성 속도를 판정한다 | 추천 시점에 점수를 갱신하지 않는다 |

assessment 결과가 잘 동작하지 않을 모델을 제외하고 나머지를 순위로 만든다. `catalog`는 모델 discovery와 assessment 진행, 검토된 모델 선택지, 추천 근거, 다운로드 연산을 소유하고, `models`는 이 기기의 모델과 현재 설치 또는 런타임 상태를 소유한다. assessment와 모델 로드는 모두 백그라운드 작업이며 관찰 명령은 현재 상태만 반환하고 안정화를 기다리지 않는다.

### 3.6 추천 순위와 표시 속성

`magnitude catalog recommendations`는 구성이 이 기기와 호환되고 메모리에 들어갈 가능성을 먼저 판정한 뒤, 모델 지능, 예상 생성 속도, 양자화 품질, 설정된 컨텍스트 크기, 물리 메모리를 함께 고려해 최대 10개를 순위로 만든다. preference는 5단계이고 별도 카탈로그가 아니라 같은 후보 집합의 균형점을 옮기는 값이다.

| preference | 성격 | 사용 조건 |
|---|---|---|
| `fastest` | 속도 최우선, 지능은 제한적으로만 고려하는 극단값 | 지능을 거의 신경 쓰지 않는다고 사용자가 분명히 밝힌 경우에만 |
| `faster` | 속도 쪽으로 기울이되 지능도 의미 있게 고려 | 평소 빠른 선택지를 찾는 사용자 |
| `balanced` | 기본값, 속도와 지능의 절충 | 기본 |
| `smarter` | 지능 쪽으로 기울이되 속도도 의미 있게 고려 | 평소 똑똑한 선택지를 찾는 사용자 |
| `smartest` | 지능 최우선, 느린 생성을 감수하는 극단값 | 느린 생성을 감수하겠다고 사용자가 분명히 밝힌 경우에만 |

사용자가 "빠른 것과 똑똑한 것을 함께 보여 달라"고 요청하면 두 극단이 아니라 `faster`와 `smarter`를 비교하라고 문서가 못박는다. 후보 하나를 더 자세히 보려면 `magnitude catalog show <model-id>`를 쓰고, 사용자가 고르기 전에는 모델을 내려받지 않는다. 추천은 사용자와 함께 고르기 위한 출발점이며 어떤 모델이 모든 워크로드에 최선이라는 주장이 아니다.

추천 항목이 노출하는 속성은 8개이며 각각이 무엇을 뜻하지 않는지가 함께 규정되어 있다.

| 속성 | 의미 | 오해하기 쉬운 점 |
|---|---|---|
| Speed | 이 기기에서의 생성 처리량 추정치 | 표시 범위는 컨텍스트 길이에 따른 변동 폭이며 신뢰구간이 아니다. 실제 벤치마크 결과도 아니다 |
| Memory | 실행 중 필요한 추정 메모리 | 다운로드 크기가 아니다. 다른 응용이 메모리를 많이 쓰면 로드 전에 닫아야 할 수 있다 |
| Context | 이 서빙 구성에서 쓸 수 있는 대화와 작업 자료의 양 | 모델 아키텍처의 절대 최대치와 다를 수 있다. 소형 모델에는 더 작은 값이 선택될 수 있다 |
| Intelligence | Artificial Analysis Intelligence Index 점수 | 퍼센트 기호로 표시하지만 확률이나 정답률이 아니다. 양자화 변형은 이 점수를 공유한다 |
| Accuracy | 양자화 이후 로컬 아티팩트가 원본 모델을 얼마나 보존할 것으로 기대되는지 | 사실 정확도가 아니며 Intelligence와 별개다 |
| Acceleration | 그 구성에 대해 준비된 speculative decoding 방식 | 방식 이름 단독보다 기기별 속도 근거가 우선한다 |
| Capabilities | vision, tool use, structured output, reasoning 등 지원 기능 | 작업이 정해져 있으면 속도나 지능 차이보다 중요할 수 있다 |
| ID | 이후 명령에 그대로 넣어야 하는 정확한 구성 식별자 | 표시용 이름은 명령 인자가 아니다 |

### 3.7 speculative decoding 4종

speculative decoding은 값싼 수단으로 여러 토큰을 미리 제안하고 target 모델이 한꺼번에 검증하게 해 생성 속도를 올리는 기법이다. 채택 여부는 target이 결정하므로 모델의 지능이나 품질 등급은 바뀌지 않고 디코딩 속도만 달라진다.

| 방식 | 내용 |
|---|---|
| None | speculative draft 없이 통상적인 autoregressive decoding. 디코딩 단계마다 target이 승인한 토큰 하나를 내며 가속을 재는 기준선이다 |
| MTP | Multi-Token Prediction(NextN). target과 함께 학습된 보조 모듈이 미래 토큰을 target 전체보다 값싸게 제안한다. 모듈은 보통 target에 내장되거나 밀접하게 결합된다. 유효 draft가 블록 병렬 방식보다 짧거나 순차적이다 |
| DFlash | target의 hidden feature를 쓰는 경량 target 전용 block-diffusion drafter가 한 번의 forward pass로 토큰 블록 전체를 제안한다. 병렬 블록 draft가 draft 지연을 분산해 가속기에 잘 맞는다. 블록 내부의 좌우 의존이 약해 뒷부분 채택률이 떨어질 수 있다 |
| DSpark | DFlash의 병렬 구조에 경량 준자기회귀 head(보통 Markov)를 더해 블록 내부 토큰 간 의존성을 복원하고, confidence head가 확신이 낮은 뒷부분을 검증 전에 잘라낸다. 병렬 draft 속도를 대부분 유지하면서 유효 prefix를 늘린다 |

일반적 속도 순서는 `None → MTP → DFlash → DSpark`이지만 보장이 아니다. target과 draft 모델, draft 채택률, 프롬프트와 출력 내용, 컨텍스트 길이, 양자화, 하드웨어, 메모리 배치, 요청 동시성에 따라 이득이 없거나 부담이 될 수 있어, 문서는 방식 이름보다 기기별 속도 근거를 우선하라고 명시한다.

카탈로그 모델의 검토된 구성이 정확한 방식과 필요한 draft 자료를 선언하고, `magnitude catalog pull`이 필요할 때 별도 draft 아티팩트를 함께 취득한다. assessment와 로드가 target, draft, 방식, 하드웨어 적합, 서빙 구성을 검증하고 나면 추론에서 자동 활성화된다. Magnitude는 임의의 draft 모델을 target에 붙이지 않으므로, 검토된 호환 방식이 없는 구성은 speculative decoding 없이 실행된다.

### 3.8 런타임 동작

| 동작 | 내용 |
|---|---|
| 요청 시점 로드 | 요청이 오면 설정된 모델이 아직 실행 중이 아닐 때 메모리에 올린다. 해제 직후 첫 요청은 로드 시간을 포함하고, 활성 상태의 요청은 즉시 추론에 들어간다 |
| 유휴 해제 | 사용이 없거나 기기가 메모리를 필요로 하면 해제한다. 다운로드와 선택은 유지되고 다음 요청이 다시 로드한다 |
| 하드웨어 튜닝 | 가속, 모델 배치, 컨텍스트, speculative decoding, 런타임 설정을 현재 기기에 맞춰 구성한다. 로드 직전마다 가용 메모리를 다시 확인해, 평소 들어가는 모델이라도 다른 응용이 메모리를 많이 쓰고 있으면 시작하지 않는다 |
| 컨텍스트와 동시성 | 요청마다 설정된 컨텍스트를 보존한다. 더 많은 요청을 처리하려고 컨텍스트를 조용히 줄이지 않고, 남은 여유만 동시 작업에 쓴다 |
| prefill 절감 | 진행 중인 에이전트 세션에서는 호환되는 프롬프트 상태를 재사용해 가능한 경우 새 입력만 처리한다 |
| 메모리 보호 | 로드와 실행 중 메모리를 감시하다가 가용량이 위험 수준으로 떨어지면 추론이 기기를 불안정하게 만들기 전에 모델을 중단한다. 다운로드와 선택 상태는 유지된다 |
| 인터페이스 정규화 | 모델별로 다른 reasoning 형식, tool call 형식, chat template, 대화 이력 규약을 흡수해 harness가 모델별 동작을 구현하지 않고도 모델을 교체하게 한다 |

### 3.9 인터페이스와 CLI

백그라운드 서비스는 loopback `http://127.0.0.1:10100`에서 대기한다. harness 설정 과정에서 올바른 인터페이스가 자동으로 구성된다.

| API | base URL | 지원 |
|---|---|---|
| OpenAI 호환 | `http://127.0.0.1:10100/inference/v1` | 모델 목록, Chat Completions, Responses |
| Anthropic 호환 | `http://127.0.0.1:10100/inference/anthropic` | Messages, 토큰 카운트 |

공식 CLI 레퍼런스는 20개 명령을 표로 싣고, 스스로를 사람용 튜토리얼이 아니라 에이전트와 자동화, 고급 통합, 수동 복구를 위한 문서로 규정한다. 명령군은 `service`, `catalog`, `models`, `connections`, `docs` 5개이고 여기에 단독 명령 `setup`과 `update`가 더해진다.

| 명령군 | 명령 | 담당 영역 |
|---|---|---|
| 단독 | `setup`, `update` | 대화형 설정 열기, Magnitude 갱신 |
| `service` | `install`, `start`, `status`, `stop`, `uninstall` | 사용자 단위 로그인 서비스. `install`은 등록만 하고 엔진 취득은 `start`가 실행하는 서비스가 한다. `uninstall`은 사용자 데이터를 보존한다 |
| `catalog` | `list`, `pull`, `remove`, `cancel` | 카탈로그와 assessment, 취득, residency 상태 표시와 설치, 제거, 취소 |
| `models` | `status`, `load`, `stop` | 이 기기의 설치 모델과 residency, 로드와 중지 |
| `connections` | `list`, `add`, `sync`, `remove` | 지원 harness 목록, 연결과 모델 선택, 설정 재동기화, 제거 |
| `docs` | `[topic-id]`, `onboarding` | 에이전트용 번들 문서 나열과 열람 |

에이전트용 `magnitude docs cli` 문서는 비대화형 셸 워크플로용 목록을 따로 싣는데, 여기에는 레퍼런스 표에 없는 `magnitude hardware`, `magnitude catalog status`, `magnitude catalog show <model-id>`, `magnitude catalog recommendations [--preference <값>] [--limit <수>]`가 포함된다. 인자 없이 `magnitude`를 실행하면 대화형 경험이 열린다.

출력 규약도 정해져 있다. 행이 직접 비교 가능한 collection 명령은 테두리 없는 표를, detail 명령은 라벨 붙은 필드를 쓴다. 정확한 모델 ID와 harness ID를 항상 출력해 이후 명령에 그대로 쓸 수 있게 하고, 모든 비대화형 관찰 명령이 `--json`을 지원한다.

### 3.10 사용자 데이터와 환경 변수

사용자 데이터는 `~/.magnitude/` 아래에 모인다. `models/`는 관리 대상 모델, `cache/`는 모델 메타데이터와 하드웨어 프로파일 같은 버려도 되는 파생 데이터, `sessions/`는 자체 harness 대화와 세션 로그, `logs/`는 CLI 로그와 macOS 서비스 로그, `traces/`는 tracing 활성화 시의 로컬 trace 데이터이며, `config.json`과 `harness-connections.json`이 사용자 설정과 모델 선택, 관리 중인 harness 연결을 담는다.

`cache/`만 지우면 파생 데이터가 다시 만들어지고 내려받은 모델은 지워지지 않는다. 문서는 `~/.magnitude` 전체 삭제를 일반적인 문제 해결 수단으로 쓰지 말라고 경고한다.

환경 변수는 5개다. `EXA_API_KEY`가 자체 harness의 웹 검색을 활성화하고, 나머지 넷은 Hugging Face 캐시 위치를 정한다. `HF_HUB_CACHE`, `HUGGINGFACE_HUB_CACHE`(구형 재정의), `HF_HOME`, `XDG_CACHE_HOME` 순으로 확인하고 어느 것도 설정되지 않으면 `~/.cache/huggingface/hub`를 본다.

### 3.11 harness 연결과 handoff

`magnitude connections add <harness-id> --set-model <model-id> --install-skill`은 설치된 모든 모델을 대상 harness에 게시하고, 선택한 모델을 그 설정에 반영하며, 번들 Magnitude 스킬을 설치하거나 갱신한다. `--install-skill`은 연결을 적용하기 전에 해당 harness가 지원하는 사용자 전역 위치에 스킬을 설치한다. 스킬은 그 harness의 에이전트가 이후 로컬 모델을 CLI로 관리하는 방법을 담는다.

| harness | ID | 모델 준비 후 전환 방법 |
|---|---|---|
| Magnitude | `magnitude` | 로드된 모델이 자동 선택된다. 선택기나 재실행이 필요 없다 |
| Pi | `pi` | `/model` 또는 Ctrl+L로 현재 세션에서 전환한 뒤 provider `magnitude`와 선택한 모델을 고른다 |
| OpenClaw | `openclaw` | Ctrl+C로 종료 후 출력된 실행 명령으로 재시작. 전용 Magnitude 에이전트 세션이 오래된 모델 재정의를 피한다 |
| OpenCode, Hermes, Codex, Claude Code, Oh My Pi, Cline | `opencode`, `hermes`, `codex`, `claude-code`, `oh-my-pi`, `cline` | Ctrl+C로 종료 후 출력된 실행 명령으로 재시작 |

Pi만 현재 세션에서 그대로 전환하는 것이 주된 방법이고 나머지 외부 harness는 프로세스 재시작이 주된 방법이다. 출력되는 실행 명령은 절대 경로가 아니라 harness의 일반 명령 이름을 쓰며, 지시문은 그것을 정확히 보여 주되 사용자가 요청하지 않으면 실행하지 말라고 규정한다.

Codex와 Claude Code는 연결이 설치되어 있는 동안 Magnitude의 로컬 게이트웨이를 계속 사용하므로, 호스팅 모델로 전환할 때도 백그라운드 서비스가 필요하다. 설정은 로그인 시 서비스가 자동 시작되도록 등록한다. 연결을 끊으려면 `magnitude connections remove codex`처럼 제거한 뒤 harness를 재시작한다.

### 3.12 자체 harness

Magnitude harness는 로컬 모델의 제약을 전제로 설계했다. 설계 항목은 5개다.

| 항목 | 내용 |
|---|---|
| 작은 컨텍스트 활용 | 관련 없는 이력으로 모델을 묻지 않고 컨텍스트를 초점에 유지한다 |
| 멈추지 않는 compaction | 로컬 모델은 compaction이 더 자주 필요하므로 대기 없이 백그라운드에서 수행한다 |
| tool call 신뢰성 | 호출을 검증하고 모델이 틀렸을 때 명확한 복구 피드백을 준다 |
| doom loop 차단 | 반복되거나 폭주하는 도구 동작을 모델이 갇히기 전에 중단한다 |
| 과도한 reasoning 방지 | 지나친 reasoning을 잘라 모델을 작업으로 복귀시킨다 |

프로젝트 작업에서는 현재 디렉토리의 파일을 검사하고 편집하며 명령과 스크립트를 실행한다. `@`로 파일과 디렉토리를 언급하고, 이미지를 composer에 붙이거나 끌어다 놓을 수 있으며, `/bash`나 `!` 접두로 셸 명령을 실행하고, `/init`으로 프로젝트 규약과 아키텍처, 테스트를 담은 `AGENTS.md`를 만든다. 대화는 자동 저장되며 `/resume`이나 Ctrl+R로 최근 대화를 열고 `/new`로 새로 시작한다. 컨텍스트 한계에 가까워지면 이전 작업을 요약으로 접고 세션을 계속한다. `/`를 입력하면 명령 목록이 열리고 자주 쓰는 명령은 `/models`, `/catalog`, `/hardware`, `/setup`, `/bash`, `/init`, `/resume`, `/new`다.

단축키는 `Enter`(전송과 확인), `Shift+Enter`(줄 추가), `Ctrl+T`(reasoning 수준 선택), `Ctrl+R`(최근 대화), `Esc`(메뉴 닫기와 작업 중단), `Ctrl+C`(입력 지우기, 유휴 시 종료) 6개다.

스킬은 `npx skills add` 같은 호환 설치 도구로 현재 프로젝트나 전역에 설치한다. Magnitude는 `.claude/skills`, `.agents/skills`, `.magnitude/skills`를 현재 프로젝트와 홈 디렉토리에서 각각 읽고 이름이 겹치면 프로젝트 스킬이 우선한다. 문서는 스킬이 명령을 실행하고 의존성을 설치하고 웹사이트를 열고 외부 서비스와 상호작용할 수 있으므로 설치 전에 검토하라고 경고한다. `EXA_API_KEY`를 설정하면 Exa 웹 검색이 켜진다.

### 3.13 카탈로그 외 모델과 사용자 지정 엔드포인트

카탈로그 밖 모델은 Hugging Face Hub 캐시에 완전한 GGUF 패키지로 존재하면 discovery가 찾아낸다. 문서는 Hugging Face CLI로 모델과 양자화를 내려받고 다운로드 후 Magnitude를 재시작해 목록을 갱신하라고 안내한다.

원격 모델은 `~/.magnitude/config.json`의 `providers`에 OpenAI 호환 Chat Completions 엔드포인트를 선언해 추가한다. 파일을 저장하면 유효한 변경이 자동 반영되고 설정한 모델이 일반 모델 선택 목록에 나타난다. 문서 예시는 OpenRouter에 GLM 5.2를 연결하며 `contextWindow` 1,048,576과 `maxOutputTokens` 128,000, reasoning effort `high`와 `xhigh`를 선언한다.

| 설정 필드 | 내용 |
|---|---|
| `connection.baseUrl` | API 루트만 적고 `/chat/completions`를 붙이지 않는다 |
| `connection.authentication` | `none`, `bearer`, `header` 세 형태. 자격 증명은 `{ type: "environment", variable: ... }`로 환경 변수를 참조한다 |
| `models` 키 | 엔드포인트가 받는 정확한 모델 ID |
| `models[].contextWindow`, `maxOutputTokens` | 모델의 실제 컨텍스트와 출력 한도 |
| `models[].capabilities` | `vision` 불리언과 `reasoning`의 `efforts`, `defaultEffort`(옵션) |

선택 중이던 엔드포인트나 모델을 제거하면 그 모델 자리가 비워지고 대체 모델이 자동으로 선택되지는 않는다. 같은 키를 복원하면 모델은 다시 사용 가능해지지만 선택은 복원되지 않는다.

### 3.14 추론 검증 체계

`inference/README.md`는 검증을 세 계층으로 나눈다.

| 계층 | 내용 |
|---|---|
| correctness parity | 네이티브와 ICN의 최소 관찰 단위 연산을 비교한다. 출력, 실효 설정, 상태 전이가 대상이다 |
| performance parity | 양쪽이 동등한 작업을 수행했음을 증명한 뒤에만 같은 격리 연산의 시간을 잰다 |
| composite benchmarking | ICN과 고정된 `llama-server` 엔드포인트에 통제된 완료 워크로드를 보내 스케줄링, 동시성, prefix 재사용, prefill과 decode 혼합, 지연, 처리량, 공정성, 메모리, 실패까지 엔진 전체를 측정한다 |

원시 suite가 실패를 특정하고 composite benchmark가 엔진 전체의 경쟁력을 판정한다. composite fixture는 프롬프트와 출력 크기, 공유 prefix 위상, 도착 스케줄, 동시성, cold와 warm 상태, 워크로드 종류 여섯 차원으로 정의된다. 엄격 비교는 동일한 모델 바이트, template, 설정, 샘플링, 토큰 작업을 전제로 하며, 응답이나 작업량이 어긋나면 그것은 correctness 결과이고 타이밍은 무효가 된다. 같은 fixture가 ICN 대 llama.cpp 비교, ICN 회귀 테스트, 서버와 CLI로 노출되는 opt-in 공개 하드웨어 벤치마크를 함께 지원하도록 설계되었다. 버전 관리되는 suite는 `benchmark/`에 있고 재사용 가능한 라이브러리와 CLI는 `benchmark-runner` crate다.

`parity/`에는 중립 케이스, fixture, 프로파일, 콘텐츠 주소 기반 모델 레지스트리, upstream target 매니페스트, JSON 증거 스키마, 얇은 네이티브 C++ oracle이 들어 있다. 비교는 두 생산 프로세스 밖에서 이뤄지며 정확 일치, 구조 비교, 허용 오차 기반, capability 기반, 동일 작업 성능 비율 중 하나를 쓴다. parity 실행은 생성된 chat 응답이나 HTTP 교환을 원시 증거로 쓰지 않는다. `diagnostic` 프로파일은 통제되지 않는 비게이팅 기능 smoke이고, `native-diagnostic`은 후보 parity나 통제된 성능 주장 없이 단방향 네이티브 검사만 수행한다.

### 3.15 개발과 운영 도구

monorepo 루트에서 쓰는 ICN 빌드와 검증 명령은 14개다.

| 묶음 | 명령 |
|---|---|
| 빌드 | `icn:check`(링크 없이 타입 검사), `icn:build`, `icn:build:release`, `icn:build:reference`, `icn:build:candidate` |
| 테스트 | `icn:test`(Rust API, SSE, backend, 워크스페이스) |
| parity | `icn:parity:validate`, `icn:parity:list`, `icn:parity:test:ts` |
| 프로토콜 생성 | `icn:generate`(OpenAPI exporter로 `packages/icn-protocol` 재생성), `icn:check-generated`(낡으면 실패) |
| 진단 | `icn:verify-native-pin`, `icn:doctor`, `icn:version` |

`bun icn:build:reference`는 Rust 바인딩이 쓰는 중첩 llama.cpp 소스에서 선언된 target만 빌드한다. target ID는 `focused-tests`, `oracle`, `llama-bench`, `llama-batched-bench`, `llama-perplexity`, `backend-ops`, `quantize-perf`다. 빌더는 소스, 설정, 아티팩트, oracle 다이제스트를 기록하고 호출마다 새 CMake 트리를 예약하며 이전 CMake 캐시를 parity 증거로 재사용하지 않는다.

세션 조사 도구는 `bun session`이다. `list`, `events <id>`, `event <id> <index>`, `search <keyword>`, `projection <id> <name>` 하위 명령으로 과거 세션의 이벤트를 인덱스 단위로 열거나 payload를 JSON으로 꺼내며, `--type`, `--from`, `--to`, `--at`, `--last`로 범위를 좁힌다. 재생 가능한 projection은 `Window`, `Fork`, `TaskGraph`, `Turn`, `Display`, `Compaction`, `WorkingState`, `SessionContext`, `Proposal`, `AgentRegistry`, `Artifact`, `ChatTitle`, `Replay` 13종이고 `all`로 전부 덤프한다. 세션은 `~/.magnitude/sessions/`에 UTC 타임스탬프 폴더 이름으로 저장된다.

관측 도구로는 Motel이 있다. `http://127.0.0.1:27686`에서 HTTP API를 노출하는 로컬 OpenTelemetry 수집기로, health와 services, traces, spans, logs, 구조화 검색, AI SDK 호출 조사기를 `curl`로 조회한다. 이 밖에 `bun design-docs`로 파일에 적용되는 설계 문서를 찾고, `bun els overview`와 `bun els layerinfo`로 Effect export와 layer 의존성을 확인한다. 테스트는 `bunx --bun vitest`로 실행해야 하며, `--bun` 없이 실행하면 vitest worker가 Node에서 실행되어 Bun 전역이 없다.

`design/`은 아키텍처와 동작의 지속적 진실 원천이고, `info/`는 사람과 LLM이 함께 읽는 간결한 고수준 문서를 담는다. 중요한 버그 보고나 큰 명세는 `bugs/YY-MM-DD/`나 `specs/YY-MM-DD/` 아래에 둔다.

### 3.16 기여 정책

`CONTRIBUTING.md`는 기여에 AI 생성 내용이 포함되는 것을 전제하면서도 사람이 쓴 설명을 요구한다. issue와 PR은 임의의 코드 품질이나 내부 도구 문제가 아니라 실제 사용자 대면 제안이나 우려를 다뤄야 하고, 사람의 의미 있는 조종이나 검증 없이 에이전트가 한 번에 만든 구현이라면 PR보다 issue 제출이 바람직하다고 명시한다. PR 요구 항목은 변경 근거, 한 줄 설명이 붙은 patch changeset, 사람이 쓴 설명, 코드베이스 패턴에 맞는 구현, 수행한 테스트 설명이다. 테스트는 형식적 단위 테스트보다 "AI 수동" 또는 "사람 수동" 검증을 선호하며, 시스템의 의미 있는 속성을 보이지 못하는 단위 테스트는 넣지 않는다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

README와 공식 문서에는 공개된 정량 성능 수치가 없다. 대신 두 종류의 기준점을 제공한다.

첫째, 추천 화면의 Intelligence 점수를 해석할 수 있도록 Artificial Analysis Intelligence Index v4.1.1의 2026-09-01 스냅샷을 CLI 문서에 함께 싣는다. 이 지수는 수학, 과학, 코딩, 지식, long-context 작업, agentic 과제를 묶어 독립적으로 산출하는 합성 지표다.

| 참조 모델 | 평가 구성 | 점수 |
|---|---|---:|
| Claude Opus 5 | adaptive reasoning, max effort | 63 |
| Claude Fable 5 | adaptive reasoning, max effort, Opus 4.8 fallback | 62 |
| GPT-5.6 Sol | max effort | 61 |
| GPT-5.6 Terra | max effort | 57 |
| GPT-5.6 Luna | max effort | 52 |

문서는 이 표를 "로컬 모델 점수가 52 근처면 GPT-5.6 Luna와 같은 점수 영역이고 61 근처면 GPT-5.6 Sol 부근"이라는 식의 눈금으로만 쓰라고 못박는다. 동작이 같다는 뜻이 아니며, 점수는 같은 index 버전과 비슷한 reasoning 설정끼리 비교해야 한다. Artificial Analysis가 방법론이나 결과를 시간에 따라 개정할 수 있다는 점도 함께 적혀 있다. Magnitude는 추천 시점에 네트워크로 점수를 갱신하지 않고 검토된 점수를 카탈로그와 함께 배포하며, 직접 측정한 점수가 없으면 저자 추정치임을 명시한다.

둘째, 속도는 `~36-48 tok/s` 같은 범위로 표시한다. 이는 하드웨어를 근거로 한 예측이며 내려받은 모델을 실제로 벤치마크한 결과가 아니다. 실제 속도는 프롬프트 길이, 동시 작업, 가용 메모리, 모델 리비전에 따라 달라진다.

카탈로그 자체도 결과물의 하나다. 카탈로그는 상위 추천만이 아니라 현재 하드웨어에 들어가는 검토된 구성 전체를 담고, 각 구성의 메모리, 지능, 양자화, 속도, 컨텍스트, 라이선스 정보를 포함한다.

채택 지표로는 star 3,437과 fork 247, open issue 17이 확인된다(2026-09-06 GitHub API 조회). 저장소는 2026-06-12에 만들어졌으므로 3개월이 되지 않은 프로젝트다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **공개 성능 근거 부재**: parity와 composite benchmark 체계를 갖췄지만 결과 수치는 저장소 문서에 공개되어 있지 않다. ICN이 `llama-server` 대비 어느 수준인지는 사용자가 직접 벤치마크를 실행해야 확인할 수 있다. 공개 하드웨어 벤치마크는 opt-in 설계로 언급만 되어 있다.
- **속도와 지능 표시의 해석 부담**: Speed는 예측 범위이지 신뢰구간이 아니고, Intelligence는 index 점수이지 정답률이 아니며, 양자화 변형은 모델 수준 점수를 공유한다. 로컬 아티팩트의 품질 손실은 Accuracy라는 별도 항목이 담당한다. 세 지표를 함께 읽지 않으면 잘못된 기대를 갖기 쉽다.
- **플랫폼 제약**: macOS와 Linux만 지원하고 Windows는 WSL을 거쳐야 한다.
- **서비스 의존성**: Codex와 Claude Code 연결은 백그라운드 서비스가 떠 있어야 유지된다. 서비스가 멈추면 호스팅 모델 사용까지 영향을 받아 `magnitude service start`로 되살려야 한다.
- **메모리 압박 시 중단**: 실행 중 가용 메모리가 위험해지면 모델이 중단된다. 기기가 안정적으로 유지되는 대신 요청은 실패하고 다음 요청에서 다시 로드된다.
- **카탈로그 밖 구성의 가속 한계**: 검토된 호환 speculative decoding이 없는 구성은 가속 없이 실행된다. 임의의 draft 모델을 target에 임의로 붙이지 않는다는 방침 때문이다.
- **카탈로그 밖 모델의 갱신 절차**: Hugging Face 캐시에 직접 내려받은 GGUF는 완전한 상태여야 하고, 인식되는 캐시 위치에 있어야 하며, Magnitude 재시작 전까지 목록에 나타나지 않는다.
- **네이티브 고정의 운영 부담**: llama.cpp 업그레이드는 바인딩 포크의 중첩 커밋 포인터를 갱신하고 그 포인터를 다시 커밋하는 절차를 요구한다. 순서를 어기면 다른 체크아웃과 CI가 소스를 가져오지 못한다.
- **문서의 독자 설정**: 상세 문서 상당수가 사람이 아니라 에이전트가 읽고 실행하도록 쓰였다. CLI 레퍼런스도 자동화와 수동 복구를 위한 것이라고 스스로 규정한다. CLI를 직접 다루려는 사용자에게는 안내가 얇게 느껴질 수 있다.
- **하드웨어 요구의 불확정성**: FAQ는 고정된 최소 사양이 없다고만 답하고 프로파일링 결과에 맡긴다. 메모리가 많으면 큰 모델을 쓸 수 있다는 방향만 제시한다.

## 6. 관련 연구 (Related Work)

- [[agents/bai-2026-how-do-ai-agents-spend]]: SWE-bench Verified 500건을 8개 모델로 1만 6천 회 실행해 코딩 에이전트의 토큰 소비를 실측한 논문. Magnitude가 없애겠다고 말하는 토큰 비용 항목의 규모를 보여준다.
- [[agents/yongkyun-2026-cutting-llm-token-costs-with]]: headroom, rtk, caveman 세 도구의 절감률을 저자 본인의 세션 기록으로 다시 측정한 리포트. 컨텍스트를 줄여 비용을 낮추는 접근이라 모델 실행 위치를 바꾸는 Magnitude와 대비된다.
- [[agents/stablyai-orca]]: Codex, Claude Code, OpenCode, Pi를 각각 독립된 git worktree에서 동시에 실행하고 한 곳에서 추적하는 MIT 라이선스 데스크톱 앱. harness 위쪽에서 여러 실행을 묶는 반면 Magnitude는 harness 아래 모델 실행 계층을 다룬다.
- [[agents/ai-boost-awesome-harness-engineering]]: harness를 모델과 분리된 공학 분야로 규정하고 자료 385개를 문제 단위로 분류한 CC0 awesome-list. harness라는 용어의 범위를 확인할 수 있다.
- [[agents/lee-hoyeon-2026-harness-engineering]]: harness engineering을 구조, 맥락, 계획, 실행, 검증, 개선 여섯 단계로 정리한 54장 한국어 슬라이드. Magnitude가 연결 대상으로 삼는 harness 계층을 사람 쪽 작업 절차로 본다.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| ICN (Inference Control Node) | Rust와 llama.cpp로 구현한 Magnitude의 추론 실행 노드. `inference/` 워크스페이스가 13개 crate로 빌드한다 |
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
| Motel | Magnitude가 함께 쓰는 로컬 OpenTelemetry 수집기. `127.0.0.1:27686`에서 trace, span, log를 HTTP로 조회한다 |
| projection | event sourcing된 세션 이벤트를 재생해 특정 관점의 상태로 접어 놓은 것. `bun session projection`으로 13종을 덤프한다 |

## 8. 그림 후보 (Figure Candidates)

repo 자료는 이미지를 자동으로 내려받지 않는다. README에 실린 도식은 아래 한 개이며, wiki에 넣으려면 사용자가 직접 저장해야 한다.

| id | 위치 | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | `assets/readme/ecosystem-light.png` | Pi, OpenCode, Hermes, Codex, Claude Code, OpenClaw가 Magnitude에 연결되고 Magnitude가 로컬 모델을 실행하는 생태계 구성도 | manual | (수동 저장 필요) |

README는 라이트와 다크 두 종류를 `assets/readme/ecosystem-light.png`와 `assets/readme/ecosystem-dark.png`로 두고 `<picture>` 요소로 전환한다. 공식 문서에는 추천 모델을 고르고 자체 harness로 실행하는 과정을 담은 영상(`/videos/maglocaldemo.mp4`)도 실려 있으나 저장소 자산이 아니라 문서 사이트 자산이다.
