---
title: "Magnitude (magnitudedev): Run your agent on local models"
type: repo
year: 2026
category: agents
source: magnitudedev-magnitude.md
raw_path: raw/repos/magnitudedev-magnitude.md
raw_filename: "magnitudedev-magnitude.md"
source_collection: external
org: "magnitudedev"
repo: "magnitude"
url: "https://github.com/magnitudedev/magnitude"
license: "Apache-2.0"
tags: [local-inference, inference-server, llama-cpp, gguf, quantization, speculative-decoding, coding-agents, harness, cli, rust, typescript, effect-ts, repo, oss]
---

## 요약

Magnitude는 사용자의 기기에서 로컬 모델을 실행하고 그 모델을 이미 쓰고 있는 코딩 에이전트에 연결해 주는 오픈소스 추론 서버다. 기기의 프로세서와 메모리, 메모리 대역폭을 프로파일링해 실제로 들어가고 쓸 만한 속도가 나올 모델 구성을 추천하고, 선택한 구성을 다운로드해 하드웨어에 맞게 설정한 뒤 백그라운드 서비스로 실행한다.

연결 대상은 자체 harness를 포함해 9종이다. harness는 모델을 감싸 도구와 검증, 상태를 제공하는 실행 환경을 뜻한다. 외부 harness로는 Pi, OpenCode, Hermes, OpenClaw, Codex, Claude Code, Oh My Pi, Cline을 지원하고, 여기에 로컬 모델 전용으로 설계한 Magnitude harness가 더해진다.

프로젝트의 설계 의도는 로컬 모델 실행을 사람이 아니라 에이전트가 대신 설정하게 하는 것이다. 사용자는 프롬프트 한 줄을 자기 에이전트에 보내고, 에이전트가 CLI를 실행해 하드웨어 프로파일링부터 harness 재연결까지 진행한다. 이 의도가 저장소 구조에도 드러난다. `cli/src/agent-docs/topics/` 아래에 에이전트가 읽을 지시문을 두고 CLI 패키지에 번들로 담아 배포하며, 모든 비대화형 관찰 명령이 `--json`을 지원한다.

라이선스는 Apache-2.0이고, 저장소는 TypeScript 기반 데몬과 CLI에 Rust로 작성한 추론 엔진을 더한 monorepo다. 2026년 6월 12일에 만들어졌고 자료 수집 시점인 2026년 9월 6일 기준으로 star 3,437개, fork 247개, 열린 issue 17개가 GitHub API에 기록되어 있다.

이 페이지가 다루는 범위는 저장소가 스스로 밝힌 것까지다. README와 공식 문서 8편, 수집된 에이전트용 번들 문서 5편, 추론 워크스페이스 README, `AGENTS.md`, `CONTRIBUTING.md`를 근거로 하며, 제품 동작과 CLI 표면, 엔진 구조, 코드베이스 규약을 다룬다. 소스 코드를 읽어야 알 수 있는 알고리즘 세부와 공개되지 않은 성능 수치는 다루지 않는다.

## 배경

코딩 에이전트를 로컬 모델로 실행하려는 요구는 비용, 프라이버시, 오프라인 가용성 세 가지에서 나온다. 호스팅 모델은 토큰 단위로 과금되고 rate limit이 걸리며 프롬프트와 파일이 외부로 전송된다. 저장소가 내세우는 여덟 가지 특징 중 앞의 두 개가 정확히 이 지점을 겨냥해, 토큰 비용과 API 키와 rate limit이 없고 모델과 프롬프트와 파일이 기기에 머문다고 말한다.

로컬 모델은 이 세 제약을 없애지만 대신 설정 부담을 사용자에게 넘긴다. 부담의 실체는 선택 문제다. 어떤 모델의 어떤 양자화가 이 기기의 메모리에 들어가는지, 컨텍스트를 얼마로 잡아야 하는지, 그 조합에서 초당 몇 토큰이 나오는지를 미리 알기 어렵다. 양자화는 가중치를 낮은 비트 수로 줄여 모델을 압축하는 기법이고, 압축 정도에 따라 메모리 사용량과 품질이 함께 달라진다.

공식 FAQ는 이 지점을 Ollama와의 비교로 설명한다. 에이전트에게 Ollama 설치를 맡기면 에이전트는 추측으로 결정한다. 하드웨어도, 어떤 양자화가 맞는지도, 실제 속도가 얼마일지도 모르기 때문이다. Magnitude는 그 대신 세 가지를 제공한다고 답한다. 기기별로 계산된 추천이 담긴 카탈로그, harness 설정 파일까지 작성하는 온보딩 흐름, 그리고 에이전트 워크로드를 전제로 만든 추론이다.

두 번째 배경은 로컬 모델의 운영 특성이다. 로컬 모델은 상시 메모리를 점유하면 다른 작업을 방해하고, 컨텍스트가 작아 대화가 금방 한계에 닿으며, tool call 형식과 reasoning 형식이 모델마다 다르다. 서버가 이 차이를 흡수하지 않으면 harness가 모델별 분기 코드를 갖게 된다. 따라서 Magnitude는 요청 시점 로드와 유휴 시 해제, 그리고 인터페이스 정규화를 서버의 기본 책임으로 정의한다.

세 번째 배경은 하드웨어 요구가 고정값으로 제시되지 않는다는 점이다. FAQ는 최소 사양이 없다고만 답하고 프로파일링 결과에 판단을 맡기며, 메모리가 많으면 큰 모델을 쓸 수 있다는 방향만 제시한다. 즉 이 프로젝트는 사양 표를 주는 대신 사양을 측정해 후보를 좁히는 쪽을 택했다.

## 핵심 개념

**추론 서버**는 harness가 보내는 요청을 받아 모델 프로세스, 메모리, 컨텍스트, 동시성을 관리하는 백그라운드 구성 요소다. Magnitude는 이 서버를 loopback 주소에서 실행하고 OpenAI 호환과 Anthropic 호환 두 가지 인터페이스로 노출한다.

**카탈로그 구성**은 모델 하나가 아니라 모델, 양자화, 컨텍스트 크기를 묶은 단위다. 같은 모델이라도 양자화와 컨텍스트가 다르면 메모리 사용량과 속도가 달라지므로, 추천과 설치와 실행이 모두 이 구성 단위를 대상으로 한다. 구성마다 고유 ID가 있고, 이후 명령에는 표시용 이름이 아니라 이 ID를 그대로 넣어야 한다.

**discovery와 assessment**는 모델 준비의 두 단계다. discovery는 기기에 이미 있는 Hugging Face 캐시를 읽기 전용으로 훑어 쓸 수 있는 GGUF 모델을 찾고, assessment는 카탈로그 구성과 discovery 결과를 현재 하드웨어에 대해 평가한다. GGUF는 llama.cpp 계열이 사용하는 로컬 모델 파일 포맷이다.

**residency**는 설치된 모델이 지금 메모리에 올라가 있는지를 나타내는 상태다. 다운로드는 디스크를 쓰고 로드는 메모리를 쓴다는 구분이 이 개념의 핵심이며, 다운로드된 모델은 로드되기 전까지 추론 메모리를 사용하지 않는다.

**speculative decoding**은 값싼 수단으로 여러 토큰을 먼저 제안하고 target 모델이 그 토큰들을 한꺼번에 검증하게 해 생성 속도를 올리는 기법이다. 어떤 토큰을 채택할지는 target이 결정하므로 모델의 지능이나 품질 등급은 바뀌지 않고 디코딩 속도만 달라진다.

**harness connection**은 Magnitude가 외부 harness의 설정 파일을 갱신하고 번들 스킬을 설치해 그 harness가 로컬 모델을 쓰게 만드는 연결 단위다. 스킬은 특정 작업 절차를 담아 에이전트에 제공하는 지침 패키지이며, 여기서는 이후 모델을 CLI로 관리하는 방법을 담는다.

**parity**는 ICN이 낸 결과가 원본 llama.cpp와 같은지 검증하는 체계다. ICN(Inference Control Node)은 Magnitude가 Rust로 작성해 llama.cpp 위에 올린 추론 실행 노드를 말한다. parity는 정확성, 성능, 엔진 전체 세 계층으로 나뉘며, 성능 측정은 양쪽이 동등한 작업을 했다는 것이 증명된 뒤에만 유효하다.

## 방법

### 에이전트 우선 설계

이 저장소의 여러 선택은 문서와 CLI의 1차 독자가 사람이 아니라 에이전트라는 전제에서 나온다. 저장소가 스스로 내세우는 특징은 여덟 가지다. 앞의 세 항목이 비용과 프라이버시, 설정 주체를 다루고, 이어지는 네 항목이 하드웨어 인지와 자동 튜닝을 다루며, 마지막 항목이 라이선스를 밝힌다.

| 특징 | 내용 |
|---|---|
| 무료 실행 | 토큰 비용, API 키, rate limit이 없다 |
| 완전한 프라이버시와 오프라인 | 모델과 프롬프트, 파일이 기기에 머문다 |
| 에이전트 우선 설정 | 프롬프트 한 줄이면 나머지는 에이전트가 안내한다 |
| 하드웨어 인지 | 칩과 메모리, 대역폭을 프로파일링한다 |
| 적합한 것 추천 | 이 기기에 맞는 모델을 예상 tok/s와 함께 제시한다 |
| 처음부터 끝까지 튜닝 | speculative decoding과 동시성을 기기에 맞춰 설정한다 |
| 요청 시점 모델 | 요청에 맞춰 로드하고 유휴 상태이거나 메모리가 차면 해제한다 |
| 오픈소스 | Apache-2.0이며 수정할 수 있다 |

공식 FAQ는 여덟 개 질문으로 이 위치를 다시 확인한다. 답변의 방향이 일관되게 "사용자가 관리하지 않는다"와 "기기를 벗어나지 않는다" 두 가지로 모인다.

| 질문 | 답변 요지 |
|---|---|
| Magnitude가 무엇인가 | 이 하드웨어에 맞는 로컬 모델을 실행해 이미 쓰는 에이전트에 연결하는 오픈소스 추론 서버 |
| 어떤 하드웨어가 필요한가 | 고정된 최소 사양은 없다. 프로파일링해서 맞는 모델을 추천하며 메모리가 많으면 큰 모델을 쓸 수 있다 |
| 에이전트에게 Ollama 설정을 맡기면 안 되는가 | 에이전트는 하드웨어와 맞는 양자화, 실제 속도를 모르므로 추측하게 된다 |
| 어떤 harness가 되는가 | Pi, OpenCode, Hermes, OpenClaw, Codex, Claude Code, Oh My Pi, Cline. 또는 내장 harness |
| 설정 후 관리해야 하는가 | 아니다. 백그라운드에서 실행되며 에이전트가 CLI로 모델을 설치하거나 전환할 수 있다 |
| 데이터가 클라우드로 가는가 | 아니다. 프롬프트와 파일, 모델이 기기에 머문다 |
| 완전히 오프라인으로 되는가 | 그렇다. Magnitude와 모델을 한 번 내려받으면 인터넷 연결이 필요 없다 |
| 카탈로그 밖 모델을 쓸 수 있는가 | 그렇다. Hugging Face에서 호환 GGUF를 내려받아 쓸 수 있다 |

에이전트가 읽는 문서는 `cli/src/agent-docs/topics/` 아래에 놓이고 `magnitude docs <topic-id>`로 열람한다. 함께 수집된 것은 다섯 편이다. 사람용 `docs/` 문서와 내용이 겹치지만 지시문 형태로 다시 쓰여 있고, CLI 패키지에 번들로 담겨 배포되므로 오프라인에서도 읽을 수 있다.

| topic | 담는 내용 |
|---|---|
| `onboarding` | 설치부터 harness 연결까지 5단계 절차와 대화 진행 규약, 폴링 조건 |
| `recommendations` | preference 5단계의 사용 조건, 표시 속성 8종의 의미와 오해 방지, Artificial Analysis 참조 점수 |
| `speculative-methods` | `None`, `MTP`, `DFlash`, `DSpark`의 동작과 속도 순서, Magnitude가 자동으로 처리하는 범위 |
| `custom-endpoints` | OpenAI 호환 원격 엔드포인트를 `config.json`에 선언하는 방법과 TypeScript 설정 타입 |
| `cli` | 비대화형 셸 워크플로용 명령 목록, `catalog`와 `models`의 소유 범위, 출력 규약 |

### 저장소 구성과 패키지 계층

저장소는 Bun workspace와 Turborepo로 묶인 monorepo다. workspace는 `cli`, `desktop`, `web`, `inference`, `integrations/*`, `packages/*`로 선언되어 있고, 여기에 문서와 규약을 담은 `docs`, `design`, `info` 디렉토리가 더해진다. `packages/` 아래에는 33개 패키지가 있다.

의존 방향은 클라이언트에서 데몬으로 내려가는 단방향으로 고정되어 있다.

```
clients (cli/web) → client-common → sdk → acn (daemon)
```

클라이언트는 `@magnitudedev/client-common`과 `@magnitudedev/sdk`에서만 import하고 `acn`, `agent`, `acn-protocol`, `ai`, `providers`를 직접 참조하지 않는다. 각 계층의 역할은 다음과 같다.

| 패키지 | 역할 |
|---|---|
| `client-common` | 공유 상태, hook, 디스플레이 동기화. 공유 SDK 인스턴스 위에 연결 단위 Effect Query `AgentClient`를 하나 두고, 1차 Query와 Mutation과 Subscription 정의를 소유한다 |
| `sdk` | 비공개 이식형 Effect RPC 클라이언트. 고정 엔드포인트 admission과 복구, 옵션인 서비스 시작 기능을 담는다. SQLite와 프로세스 감독과 쿼리 캐시는 담지 않는다 |
| `daemon-management` | 비공개 owner store, 프로세스 감독, 바이너리 취득, OS 서비스 구현. CLI 부트스트랩과 데스크톱 메인, 개발 서버 같은 특권 조립 지점만 import한다 |
| `acn` | 에이전트 런타임, 세션, 파일 조작, 디스플레이 스트림을 호스팅하는 서버 데몬. ACN 프로토콜 RPC를 구현한다 |
| `acn-protocol` | SDK와 ACN이 공유하는 wire contract. 클라이언트는 참조하지 않는다 |
| `ai` | provider 중립 계약(`Provider`, `ModelCatalog`, `BoundModel`, `BaseCallOptions`) |
| `providers` | 구체 provider 구현과 레지스트리. provider 클라이언트 생성을 소유한다 |
| `agent` | 에이전트 런타임, projection, worker, 도구, 디스플레이 구체화 |
| `event-core` | event sourcing과 projection, 주소 지정 상태 |
| `roles` | worker 특화를 위한 role과 slot 정의 |
| `storage` | 세션, 설정, 인증의 영속 저장 |
| `release` | 릴리스 준비, Changesets 오케스트레이션, 프로토콜과 플러그인 버전 할당 |
| `version` | 빌드 identity 생성만 담당 |

패키지 규모는 에이전트 런타임에 집중되어 있다. blob 수 기준으로 `agent`가 399개로 가장 크고, `client-common` 198개, `acn` 131개, `ai` 109개, `inference-benchmark` 99개, `event-core` 96개, `acn-protocol` 85개가 뒤를 잇는다. CLI 쪽에서는 `cli/src/features`가 144개로 가장 크고 `harness-connections` 31개, `components` 29개, `commands` 26개가 따른다. 즉 CLI 코드의 상당 부분이 harness 연결 로직에 들어가 있다.

새 backend 연산을 추가하는 절차도 규약으로 정해져 있다. `packages/acn-protocol/src/boundary/`의 해당 도메인에 `Rpc.make`를 한 번 선언하고, ACN에 핸들러를 구현하고, 파생된 SDK 메서드를 소비한다. Effect Query는 RPC를 생성하지 않으므로 캐싱과 동기화 정책은 `packages/client-common/src/operations/`에 따로 추가한다. 유한 RPC 선언은 `replaySafe`나 `atMostOnce` 중 하나를 반드시 적용해야 하며, RPC 트리 자체가 선언된 replay 정책을 요구한다.

### 코드베이스 규약

`AGENTS.md`는 일반 엔지니어링 원칙 3개를 명시한다. 원칙은 추상화, 복잡도, 하위 호환 순서로 배열되어 있고 모두 코드를 덜 남기는 방향을 가리킨다.

| 원칙 | 내용 |
|---|---|
| 의미 있는 추상화 형성 | 간접 계층을 늘리는 것이 아니라 시스템의 핵심 동작과 구성 요소를 식별해 관용적으로 조합한다 |
| 과설계와 누더기 코드 금지 | 일어나지 않을 경우를 위해 설계하지 않는다. 불완전한 변경 위에 변경을 덧붙이는 것을 누더기 코드의 신호로 보고 리팩터링한다 |
| 불필요한 하위 호환 금지 | 사용자가 명시적으로 요청하지 않으면 하위 호환 shim이나 legacy 코드를 남기지 않는다 |

Effect 규약은 더 구체적이다. 이 코드베이스는 Effect-TS 네이티브를 전제로 하며, 다음 네 항목을 요구한다.

| 항목 | 규약 |
|---|---|
| 코드 성격 | 새 코드는 Effect-TS 네이티브여야 한다. Effect 코드에 닿는 TypeScript 코드는 effectful 상태를 유지하거나 그렇게 바뀌어야 하고, 역방향 전환은 허용하지 않는다 |
| 의존성 주입 | Effect DI를 쓰고 추상화를 서비스로 분리한다. 서비스는 태그와 같은 이름의 interface를 가진 `Context.Tag`로 만든다 |
| 스키마 | 직렬화, 검사, 검증이 필요한 데이터는 Effect Schema로 표현한다. 선택 값은 `Schema.optionalWith(Schema.String, { as: 'Option', exact: true })`로 선언해 `undefined`가 아니라 존재와 부재 두 상태로만 직렬화되게 한다 |
| branded type | ID 성격의 의미를 가진 문자열 값에는 Effect branded type을 쓴다 |

### 설치 경로

설치는 에이전트 주도 경로와 수동 경로로 나뉜다. 두 경로 모두 npm 패키지 `@magnitudedev/cli`를 전역 설치하는 것에서 시작하고, 문서는 네 가지 패키지 매니저를 각각 안내한다.

| 패키지 매니저 | 설치 명령 |
|---|---|
| npm | `npm install -g @magnitudedev/cli` |
| bun | `bun add -g @magnitudedev/cli` |
| pnpm | `pnpm add -g @magnitudedev/cli` |
| yarn | `yarn global add @magnitudedev/cli` |

에이전트 주도 경로는 설치 명령과 `magnitude docs onboarding` 실행을 지시하는 프롬프트 한 줄을 자기 에이전트에 보내는 것으로 끝난다. 그 뒤로는 에이전트가 하드웨어를 프로파일링하고, 후보 모델을 안내하고, 사용자가 고른 것을 내려받고, 자기 자신을 그 모델로 전환한다.

수동 경로는 `magnitude setup`으로 대화형 설정을 여는 것이다. 대화형 설정은 여섯 단계로 진행된다.

| 단계 | 내용 |
|---|---|
| 1 | 프로세서, 메모리, 메모리 대역폭을 프로파일링 |
| 2 | 모델과 양자화와 컨텍스트 조합을 이 하드웨어에 대해 순위화 |
| 3 | 속도, 지능, 메모리 절충을 표시 |
| 4 | 선택한 모델을 다운로드하고 설정 |
| 5 | 그 모델을 선택한 harness에 연결 |
| 6 | 모델이 준비된 상태로 harness를 실행 |

대화형 설정에는 Fast와 Smart 사이를 옮기는 조절값이 있다. Fast 쪽으로 옮기면 생성 속도를, Smart 쪽으로 옮기면 지능을 우선한다. 지원 플랫폼은 macOS와 Linux이고 Windows는 `wsl --install`로 WSL을 설치한 뒤 재부팅하고 WSL 안에서 같은 절차를 따른다.

설정이 끝나면 작업은 harness 안에서 이어진다. 에이전트가 handoff 지시를 줬다면 그것을 먼저 따르고, 그 뒤로 Magnitude는 headless 상태로 백그라운드에서 실행되며 에이전트가 요청할 때 모델을 로드하고 메모리와 동시성을 자동으로 관리한다.

사용자는 CLI를 배울 필요가 없다. 문서는 이후 모델 조사와 설치, 전환을 에이전트에게 맡기거나 harness의 모델 드롭다운에서 설치된 모델을 고르라고 안내한다.

### 에이전트 주도 온보딩

번들 문서 `magnitude docs onboarding`은 온보딩을 다섯 단계로 규정한다. 지시문은 명령 목록만 주지 않고 진행 방식까지 규정하는데, 명령을 조용히 일괄 실행하지 말고 각 주요 동작 전에 무엇을 왜 하는지 짧게 설명하며, 백그라운드 작업 중에는 의미 있는 진행 상황을 전달하고, 결정 시점에는 선택지와 절충을 설명한 뒤 초점 있는 질문을 하나 던지라고 요구한다.

| 단계 | 명령 | 확인 조건 |
|---|---|---|
| 1. 설치 완료 | `magnitude service install`, `magnitude service start` | `service install`은 로그인 시작 등록과 실행 파일 해석만 한다. 추론 엔진은 실행 중인 서비스가 취득하므로 `service start`를 생략할 수 없다 |
| 2. 준비 대기와 선택 | `magnitude catalog status`, `magnitude catalog recommendations --preference balanced --limit 10` | Discovery와 Assessment가 모두 `Complete`가 될 때까지 약 10초 간격으로 재조회 |
| 3. 모델 설치 | `magnitude catalog pull <model-id>`, `magnitude models status <model-id>` | 설치 상태가 `Installed`가 될 때까지 폴링 |
| 4. 모델 로드 | `magnitude models load <model-id>`, `magnitude models status <model-id>` | 런타임 상태가 `Ready`가 될 때까지 폴링 |
| 5. harness 연결 제안 | `magnitude connections add <harness-id> --set-model <model-id> --install-skill` | 사용자 동의 후 실행 |

설치와 로드가 각각 독립된 백그라운드 작업이라는 점이 이 절차의 형태를 결정한다. `catalog pull`은 설치를 접수하기만 하고, `models load`도 로드를 시작하기만 한다. 그래서 지시문은 두 단계 모두 상태 조회를 반복해 확인하라고 규정하고, 관찰된 진행에 따라 폴링 간격을 조절하라고 덧붙인다.

진행률 보고 규칙도 정해져 있다. 퍼센트와 다운로드 바이트의 의미 있는 변화만 전달하고, 진행 표본이 두 개 이상 모인 뒤에야 관측된 바이트 속도로 남은 시간을 추정하되 추정임을 밝히며, 진행이 멈췄거나 전체 크기를 알 수 없으면 추정치를 만들지 않는다. 실패가 보고되면 실행 가능한 메시지를 사용자에게 전달하고, 이 워크플로 밖의 조치는 먼저 물어본다. 온보딩 에이전트로 동작하는 동안 대화형 `magnitude setup` 흐름으로 대체하지 말라는 제약도 있다.

### 하드웨어 프로파일링과 모델 준비

Magnitude는 프로세서, 메모리, 아키텍처, Metal이나 CUDA 같은 가속 방식을 감지해 프로파일을 만들고 캐시한다. 이 프로파일과 모델 메타데이터만으로 어떤 구성이 메모리에 들어가고 얼마나 빠를지를 추정하므로, 가중치 전체를 내려받기 전에 판단이 끝난다. 프로파일은 필요할 때 다시 계산된다.

준비 상태는 두 단계로 보고된다.

| 단계 | 하는 일 | 네트워크 |
|---|---|---|
| discovery | 기기에 이미 있는 Hugging Face 모델 캐시를 훑어 완전하고 사용 가능한 GGUF 모델을 찾는다 | 사용하지 않는다. 로컬 읽기 전용 스캔이며 Hub에 접속하지 않는다 |
| assessment | 카탈로그 구성과 discovery가 찾은 모델을 이 하드웨어에 대해 평가한다. 호환성, 메모리 적합, 서빙 구성, 가용 가속, 예상 생성 속도를 판정한다 | 추천 시점에 점수를 갱신하지 않는다 |

assessment 결과가 잘 동작하지 않을 모델을 제외하고 나머지를 순위로 만든다. 두 단계가 CLI 명령군에도 반영되어 있다. `catalog`는 모델 discovery와 assessment 진행, 검토된 모델 선택지, 추천 근거, 다운로드 연산을 소유하고, `models`는 이 기기의 모델과 현재 설치 또는 런타임 상태를 소유한다. assessment와 모델 로드는 모두 백그라운드 작업이므로 관찰 명령은 현재 상태만 반환하고 안정화를 기다리지 않는다.

상태 보고는 명령마다 다루는 계층이 다르다. 에이전트가 폴링으로 진행을 확인하려면 어느 명령이 어떤 상태를 소유하는지 알아야 하므로, CLI가 이 구분을 그대로 노출한다.

| 명령 | 보고하는 상태 | 완료를 뜻하는 값 |
|---|---|---|
| `magnitude service status` | 설치, 시작, 런타임, 활성 모델 | 서비스가 실행 중이고 활성 모델이 표시된 상태 |
| `magnitude catalog status` | discovery와 assessment 진행 | 두 단계가 모두 `Complete` |
| `magnitude catalog list` | 카탈로그, assessment, 취득, residency | 취득이 끝나고 구성이 목록에 남은 상태 |
| `magnitude models status <model-id>` | 설치 상태와 런타임 상태 | 설치는 `Installed`, 로드는 `Ready` |
| `magnitude connections list` | 지원 harness와 설치된 harness | 대상 harness가 설치 목록에 있는 상태 |

카탈로그는 상위 추천만 담지 않는다. 현재 하드웨어에 들어가는 검토된 구성 전체를 담고, 각 구성의 메모리, 지능, 양자화, 속도, 컨텍스트, 라이선스 정보를 포함한다. Magnitude가 관리하는 모델은 `~/.magnitude/models`에 저장되며, 다운로드는 디스크에 파일을 두는 것이고 모델을 메모리에 상주시키지는 않는다.

### 추천 순위와 다섯 단계 preference

추천은 구성이 이 기기와 호환되고 메모리에 들어갈 가능성을 먼저 판정한 뒤, 모델 지능과 예상 생성 속도, 양자화 품질, 설정된 컨텍스트 크기, 물리 메모리를 함께 고려해 최대 10개 구성을 순위로 만든다. preference는 별도의 카탈로그가 아니라 같은 후보 집합에서 절충점을 옮기는 값이다.

| preference | 성격 | 사용 지침 |
|---|---|---|
| `fastest` | 속도 최우선, 지능은 제한적으로만 고려 | 지능을 거의 신경 쓰지 않는다고 사용자가 분명히 밝힌 경우에만 |
| `faster` | 속도 쪽으로 기울이되 지능도 의미 있게 고려 | 평소 빠른 선택지를 찾는 사용자의 기본값 |
| `balanced` | 속도와 지능의 절충 | 기본값 |
| `smarter` | 지능 쪽으로 기울이되 속도도 의미 있게 고려 | 평소 똑똑한 선택지를 찾는 사용자의 기본값 |
| `smartest` | 지능 최우선, 느린 생성을 감수 | 느린 생성을 감수하겠다고 사용자가 분명히 밝힌 경우에만 |

문서는 사용자가 빠른 것과 똑똑한 것을 함께 보여 달라고 요청하면 두 극단이 아니라 `faster`와 `smarter`를 비교하라고 명시한다. 즉 `fastest`와 `smartest`는 일반적인 다음 선택지가 아니라 의도가 분명할 때만 쓰는 값이다. 후보 하나를 더 자세히 보려면 `magnitude catalog show <model-id>`를 쓰고, 사용자가 고르기 전에는 모델을 내려받지 않는다.

추천의 성격도 문서가 규정한다. 추천은 사용자와 함께 고르기 위한 출발점이며 어떤 모델이 모든 워크로드에 최선이라는 주장이 아니다.

### 추천 화면의 속성 읽는 법

추천 항목이 노출하는 속성은 여덟 가지이며, 각각이 무엇을 뜻하지 않는지가 함께 규정되어 있다. 이 규정이 문서에서 가장 긴 부분인데, 표시된 숫자를 잘못 읽으면 잘못된 모델을 고르게 되기 때문이다.

| 속성 | 의미 | 오해하기 쉬운 점 |
|---|---|---|
| Speed | 이 기기에서의 생성 처리량 추정치 | 표시된 범위는 짧은 컨텍스트와 긴 컨텍스트 사이의 변동 폭이며 신뢰구간이 아니다. 하드웨어를 근거로 한 예측이고 내려받은 모델을 실제로 벤치마크한 값이 아니다 |
| Memory | 실행 중 필요한 추정 메모리 | 다운로드 크기가 아니다. 평소 들어가는 모델도 다른 응용이 메모리를 많이 쓰면 로드 전에 그 응용을 닫아야 할 수 있다 |
| Context | 이 서빙 구성에서 쓸 수 있는 대화와 작업 자료의 양 | 모델 아키텍처의 절대 최대치와 다를 수 있다. 긴 컨텍스트는 메모리를 더 쓰고 생성을 느리게 하므로 소형 모델에는 Magnitude가 더 작은 값을 고를 수 있다 |
| Intelligence | Artificial Analysis Intelligence Index 점수 | 퍼센트 기호로 표시하지만 확률이나 정답률이 아니다. 같은 원본 모델의 양자화 변형은 이 모델 수준 점수를 공유한다 |
| Accuracy | 양자화 이후 로컬 아티팩트가 원본 모델을 얼마나 충실히 보존할 것으로 기대되는지 | 사실 정확도가 아니며 Intelligence와 별개 지표다 |
| Acceleration | 그 구성에 대해 준비된 speculative decoding 방식 | 방식 이름 단독보다 기기별 속도 근거가 우선한다 |
| Capabilities | vision, tool use, structured output, reasoning 등 지원 기능 | 작업이 정해져 있다면 작은 속도나 지능 차이보다 중요할 수 있다 |
| ID | 이후 명령에 사용할 정확한 구성 식별자 | 표시용 이름은 명령 인자가 아니다 |

이 속성들은 함께 읽어야 의미가 생긴다. Memory와 Context는 그 구성이 이 기기에서 현실적인지를 결정하고, Accuracy는 로컬 포맷으로 옮기면서 잃은 품질을 나타내며, Capabilities는 애초에 그 작업이 가능한지를 결정한다. 문서는 빠른 모델이 빠른 반복에 유리하고 더 똑똑한 모델은 어려운 코딩이나 reasoning 과제에서 기다릴 값이 있다는 식으로 두 방향을 함께 제시한다.

### 모델 교체와 재선택

초기 설정이 가장 좋은 시작 구성을 준다는 것이 문서의 전제이고, 모델 선택을 다시 볼 시점은 두 가지로 제시된다. 새 모델이 출시됐을 때, 그리고 속도와 지능, 컨텍스트, 메모리의 절충을 다르게 잡고 싶을 때다.

교체 경로는 세 가지다. harness의 모델 드롭다운에서 이미 설치된 다른 모델을 고르거나, 에이전트에게 새 모델을 조사해 설치하게 하거나, CLI로 직접 설치한다. 문서는 에이전트에게 보낼 요청의 예시까지 싣는데, "이 기기에서 더 잘 돌 만한 새 모델이 Magnitude에 있는지" 묻는 조사형, "지금 것보다 빠른 Magnitude 모델을 찾아 달라"는 조건형, "이 새 모델을 설치하고 전환해 달라"는 실행형이다. 에이전트는 CLI로 하드웨어와 카탈로그를 조사한 뒤 모델을 설치하고, 준비가 끝나면 사용자가 harness에서 그것을 선택한다.

### speculative decoding 네 가지 방식

Magnitude가 보고하는 가속 방식은 네 가지이고, 일반적인 속도 순서는 `None`, `MTP`, `DFlash`, `DSpark` 순으로 빨라진다. 뒤로 갈수록 draft를 더 병렬로 만들고 채택 가능한 prefix를 더 길게 확보하는 방향이다.

| 방식 | 동작 | 특징 |
|---|---|---|
| None | speculative draft 없이 통상적인 autoregressive decoding | 디코딩 단계마다 target이 승인한 토큰 하나를 낸다. 가속을 재는 기준선 |
| MTP | target과 함께 학습된 보조 모듈(Multi-Token Prediction, NextN)이 미래 토큰을 제안 | 모듈이 보통 target에 내장되거나 밀접하게 결합된다. target 전체보다 값싸게 제안하지만 유효 draft가 블록 병렬 방식보다 짧거나 순차적이다 |
| DFlash | target의 hidden feature를 쓰는 경량 target 전용 block-diffusion drafter가 한 번의 forward pass로 토큰 블록 전체를 제안 | 병렬 블록 draft가 draft 지연을 분산해 가속기에 잘 맞는다. 블록 내부의 좌우 의존이 약해 뒷부분 채택률이 떨어질 수 있다 |
| DSpark | DFlash의 병렬 구조에 경량 준자기회귀 head(보통 Markov)를 더해 블록 내부 토큰 간 의존성을 복원 | confidence head가 확신이 낮은 뒷부분을 검증 전에 제거해 낭비되는 target 검증을 줄인다. 병렬 draft 속도를 대부분 유지하면서 유효 prefix를 늘린다 |

이 순서는 경향이지 보장이 아니다. target과 draft 모델, draft 채택률, 프롬프트와 출력 내용, 컨텍스트 길이, 양자화, 하드웨어, 메모리 배치, 요청 동시성에 따라 이득이 거의 없거나 오히려 부담이 될 수 있다. 그래서 문서는 방식 이름만 보지 말고 Magnitude가 계산한 기기별 속도 근거를 우선하라고 안내한다.

사용자가 방식을 고르거나 draft 모델을 짝지을 일은 없다. 카탈로그 구성이 검토된 방식과 필요한 draft 자료를 선언해 두고, `magnitude catalog pull`이 필요할 때 별도 draft 아티팩트를 함께 받아오며, assessment와 로드 단계에서 target과 draft, 방식, 하드웨어 적합, 서빙 구성을 검증한 뒤 추론에서 자동 활성화한다. Magnitude는 임의의 draft 모델을 target에 결합하지 않으므로, 검토된 호환 방식이 없는 구성은 speculative decoding 없이 실행된다.

### 추론 런타임 동작

런타임은 일곱 가지 동작으로 정리된다. 앞의 두 항목은 메모리를 언제 쓸지, 가운데 세 항목은 무엇을 보장할지, 뒤의 두 항목은 위험할 때 무엇을 포기할지를 규정한다.

| 동작 | 내용 |
|---|---|
| 요청 시점 로드 | 다운로드한 모델은 필요해질 때까지 디스크에 머문다. 요청이 오면 설정된 모델이 아직 실행 중이 아닐 때 메모리에 올린다. 해제 직후 첫 요청은 로드 시간을 포함하고, 활성 상태에서 들어온 요청은 곧바로 추론을 시작한다 |
| 유휴 해제 | 사용이 없거나 기기가 메모리를 필요로 하면 모델을 해제한다. 해제는 다운로드를 지우거나 선택을 바꾸지 않고 추론 메모리만 반환하며, 다음 요청이 다시 로드한다 |
| 하드웨어 튜닝 | 가속, 모델 배치, 컨텍스트, speculative decoding, 런타임 설정을 현재 기기에 맞춰 구성한다. 로드 직전마다 가용 메모리를 다시 확인해, 평소 들어가는 모델이라도 다른 응용이 메모리를 많이 쓰고 있으면 시작하지 않는다 |
| 컨텍스트 보존 | 요청마다 설정된 컨텍스트를 그대로 유지한다. 더 많은 요청을 처리하려고 컨텍스트를 조용히 줄이지 않고, 남은 용량만 동시 작업에 배정한다 |
| prefill 절감 | 진행 중인 에이전트 세션에서는 호환되는 프롬프트 상태를 재사용해 가능한 경우 새 입력만 처리한다. 반복되는 prefill 작업이 줄어든다 |
| 메모리 보호 | 로드와 실행 중 메모리를 감시하다가 가용량이 위험 수준으로 떨어지면 추론이 기기를 불안정하게 만들기 전에 모델을 중단한다. 모델은 내려받은 상태와 선택된 상태로 남는다 |
| 인터페이스 정규화 | 모델별로 다른 reasoning 형식, tool call 형식, chat template, 대화 이력 규약을 흡수해 harness가 모델별 동작을 구현하지 않고도 모델을 교체하게 한다 |

컨텍스트 보존과 동시성의 관계가 이 설계에서 가장 분명한 선택이다. 요청이 몰릴 때 컨텍스트를 줄여 더 많은 요청을 받는 대신, 컨텍스트를 고정하고 남은 여유만큼만 동시에 처리한다. 그래서 기기에 여유 추론 용량이 없으면 동시 요청은 대기한다.

### 추론 API와 CLI

백그라운드 서비스는 loopback `http://127.0.0.1:10100`에서 대기하고 두 가지 호환 API를 노출한다. 어느 인터페이스를 쓸지는 harness 설정 과정에서 자동으로 결정된다.

| API | base URL | 지원 범위 |
|---|---|---|
| OpenAI 호환 | `http://127.0.0.1:10100/inference/v1` | 모델 목록, Chat Completions, Responses |
| Anthropic 호환 | `http://127.0.0.1:10100/inference/anthropic` | Messages, 토큰 카운트 |

CLI 레퍼런스는 스스로를 사람용 튜토리얼이 아니라 에이전트와 자동화, 고급 통합, 수동 복구를 위한 문서로 규정한다. 명령은 20개다. 단독 명령 `setup`과 `update`를 빼면 `service`, `catalog`, `models`, `connections`, `docs` 다섯 개 명령군으로 묶인다.

| 명령 | 목적 |
|---|---|
| `magnitude setup` | 대화형 모델 탐색과 설정을 연다 |
| `magnitude service install` | 사용자 단위 서비스를 설치하고 활성화만 한다. 시작하지는 않는다 |
| `magnitude service start` | 설치나 갱신 후 시작하고 서비스를 기다린다 |
| `magnitude service status` | 설치, 시작, 런타임, 활성 모델 상태를 표시한다 |
| `magnitude service stop` | 제거하지 않고 중지한다 |
| `magnitude service uninstall` | 사용자 데이터를 보존하며 서비스 정의를 중지하고 제거한다 |
| `magnitude catalog list` | 카탈로그, assessment, 취득, residency 상태를 표시한다 |
| `magnitude catalog pull <model-id>` | 카탈로그 모델을 설치하거나 갱신한다 |
| `magnitude catalog remove <model-id>` | 설치된 카탈로그 모델을 제거한다 |
| `magnitude catalog cancel <model-id>` | 진행 중인 취득 작업을 취소한다 |
| `magnitude models status` | 설치된 모델과 residency 상태를 표시한다 |
| `magnitude models load <model-id>` | canonical 모델 ID로 모델을 로드한다 |
| `magnitude models stop` | 활성 로컬 모델을 중지한다 |
| `magnitude connections list` | 지원 harness와 설치된 harness를 표시한다 |
| `magnitude connections add <harness> [--set-model <model-id>] [--install-skill]` | 설치 모델을 게시하고 모델을 선택하며 harness 스킬을 갱신한다 |
| `magnitude connections sync [harness]` | 연결된 harness 설정을 갱신한다 |
| `magnitude connections remove <harness>` | harness 연결을 제거한다 |
| `magnitude docs [topic-id]` | 에이전트용 번들 문서를 나열하거나 읽는다 |
| `magnitude docs onboarding` | 에이전트 주도 설정 워크플로 전문을 읽는다 |
| `magnitude update` | Magnitude를 갱신한다 |

에이전트용 번들 문서 `magnitude docs cli`는 비대화형 셸 워크플로용 목록을 따로 싣는데, 여기에는 위 레퍼런스 표에 없는 명령 네 개가 포함된다.

| 명령 | 목적 |
|---|---|
| `magnitude hardware` | 감지한 하드웨어 프로파일을 표시한다 |
| `magnitude catalog status` | discovery와 assessment 진행 상태를 표시한다 |
| `magnitude catalog show <model-id>` | 후보 구성 하나의 세부를 표시한다 |
| `magnitude catalog recommendations [--preference <값>] [--limit <수>]` | 추천 목록을 순위로 표시한다 |

출력 규약도 정해져 있다. 각 명령은 그 연산에 해당하는 정보만 출력하고, 행이 직접 비교 가능한 collection 명령은 테두리 없는 표를 쓰고 detail 명령은 라벨 붙은 필드를 쓴다. 정확한 모델 ID와 harness ID를 항상 출력해 이후 명령에 그대로 넣을 수 있게 하며, 모든 비대화형 관찰 명령이 `--json`을 지원한다. 인자 없이 `magnitude`를 실행하면 대화형 경험이 열린다.

### 사용자 데이터와 환경 변수

사용자 데이터는 홈 디렉토리의 한 폴더에 모인다.

| 경로 | 내용 |
|---|---|
| `~/.magnitude/models/` | Magnitude가 관리하는 로컬 모델 |
| `~/.magnitude/cache/` | 모델 메타데이터, 하드웨어 프로파일, 버려도 되는 캐시 |
| `~/.magnitude/sessions/` | 자체 harness 대화와 세션 로그 |
| `~/.magnitude/logs/` | CLI 로그와 macOS 서비스 로그 |
| `~/.magnitude/traces/` | tracing이 활성화된 경우의 로컬 trace 데이터 |
| `~/.magnitude/config.json` | 사용자 설정과 모델 선택 |
| `~/.magnitude/harness-connections.json` | 관리 중인 harness 연결 |

`cache/`만 지우면 파생 데이터가 다시 만들어지고 내려받은 모델은 지워지지 않는다. 반면 `~/.magnitude` 전체를 지우면 모델과 설정, 연결, 세션이 함께 사라진다. 문서는 전체 삭제를 일반적인 문제 해결 수단으로 쓰지 말라고 경고한다.

환경 변수는 다섯 개다.

| 변수 | 목적 |
|---|---|
| `EXA_API_KEY` | 자체 harness의 웹 검색을 활성화한다 |
| `HF_HUB_CACHE` | Hugging Face Hub 캐시 디렉토리를 지정한다 |
| `HUGGINGFACE_HUB_CACHE` | 구형 Hugging Face Hub 캐시 재정의 |
| `HF_HOME` | Hugging Face 데이터 디렉토리를 지정한다 |
| `XDG_CACHE_HOME` | 기본 캐시 디렉토리를 지정한다 |

Hugging Face 캐시 설정은 위 표의 순서대로 확인하고, 어느 것도 설정되지 않으면 `~/.cache/huggingface/hub`를 본다.

### harness 연결과 전환

연결은 명령 하나로 끝난다. `magnitude connections add <harness-id> --set-model <model-id> --install-skill`은 설치된 모든 모델을 그 harness에 게시하고, 선택한 모델을 설정에 반영하며, 번들 Magnitude 스킬을 설치하거나 갱신한다. `--install-skill`은 연결을 적용하기 전에 그 harness가 지원하는 사용자 전역 위치에 스킬을 설치한다.

| harness | ID | 모델이 준비된 뒤 전환 방법 |
|---|---|---|
| Magnitude | `magnitude` | 로드된 모델이 자동으로 선택된다. 선택기나 재실행이 필요 없다 |
| Pi | `pi` | `/model` 또는 Ctrl+L로 현재 세션에서 전환한 뒤 provider `magnitude`와 선택한 모델을 고른다 |
| OpenCode | `opencode` | Ctrl+C로 종료한 뒤 출력된 실행 명령으로 재시작 |
| Hermes | `hermes` | Ctrl+C로 종료한 뒤 출력된 실행 명령으로 재시작 |
| OpenClaw | `openclaw` | Ctrl+C로 종료한 뒤 출력된 실행 명령으로 재시작. 전용 Magnitude 에이전트 세션이 오래된 모델 재정의를 피한다 |
| Codex | `codex` | Ctrl+C로 종료한 뒤 출력된 실행 명령으로 재시작 |
| Claude Code | `claude-code` | Ctrl+C로 종료한 뒤 출력된 실행 명령으로 재시작 |
| Oh My Pi | `oh-my-pi` | Ctrl+C로 종료한 뒤 출력된 실행 명령으로 재시작 |
| Cline | `cline` | Ctrl+C로 종료한 뒤 출력된 실행 명령으로 재시작 |

전환 방법은 두 종류로 갈린다. Pi만 현재 세션에서 그대로 전환하는 것이 주된 방법이고, 나머지 외부 harness는 프로세스를 종료하고 다시 여는 것이 주된 방법이다. 출력되는 실행 명령은 절대 경로가 아니라 harness의 일반 명령 이름을 쓰며, 지시문은 그것을 정확히 보여 주되 사용자가 요청하지 않으면 실행하지 말라고 규정한다. Magnitude 자체는 내장이라 외부 연결 명령이 필요하지 않다.

Codex와 Claude Code는 연결이 설치되어 있는 동안 Magnitude의 로컬 게이트웨이를 계속 경유한다. 따라서 호스팅 모델로 전환하더라도 백그라운드 서비스가 실행 중이어야 하며, 설정 과정에서 로그인 시 자동 시작하도록 서비스를 등록한다. 연결을 끊으려면 `magnitude connections remove codex`나 `magnitude connections remove claude-code`로 제거한 뒤 harness를 재시작한다.

### 자체 harness

Magnitude harness는 로컬 모델의 제약을 전제로 만들어졌다. 다섯 가지 설계 항목이 모두 컨텍스트가 작고 tool call이 불안정한 모델을 겨냥한다.

| 항목 | 내용 |
|---|---|
| 작은 컨텍스트 활용 | 관련 없는 이력으로 모델을 묻지 않고 컨텍스트를 초점에 유지한다 |
| 멈추지 않는 compaction | 로컬 모델은 compaction이 더 자주 필요하므로 대기 없이 백그라운드에서 수행한다 |
| tool call 신뢰성 | 호출을 검증하고 모델이 틀렸을 때 명확한 복구 피드백을 준다 |
| doom loop 차단 | 반복되거나 폭주하는 도구 동작을 모델이 갇히기 전에 중단한다 |
| 과도한 reasoning 방지 | 지나친 reasoning을 잘라 모델을 작업으로 복귀시킨다 |

프로젝트 작업 기능은 일반적인 코딩 harness와 유사하다. 현재 디렉토리의 파일을 검사하고 편집하며 명령과 스크립트를 실행하고, `@`로 파일과 디렉토리를 언급하며, 이미지를 composer에 붙이거나 끌어다 놓을 수 있다. `/bash`나 `!` 접두로 셸 명령을 직접 실행하고, `/init`으로 프로젝트 규약과 아키텍처, 테스트를 담은 `AGENTS.md`를 생성한다. 대화는 자동 저장되어 `/resume`이나 Ctrl+R로 이어갈 수 있고 `/new`로 새로 시작하며, 컨텍스트 한계에 가까워지면 이전 작업을 요약으로 접은 뒤 세션을 계속한다.

`/`를 입력하면 명령 목록이 열린다. 자주 쓰는 명령은 `/models`, `/catalog`, `/hardware`, `/setup`, `/bash`, `/init`, `/resume`, `/new`다. 단축키는 여섯 개다.

| 단축키 | 동작 |
|---|---|
| `Enter` | 전송 또는 확인 |
| `Shift+Enter` | 줄 추가 |
| `Ctrl+T` | reasoning 수준 선택 |
| `Ctrl+R` | 최근 대화 열기 |
| `Esc` | 메뉴 닫기 또는 작업 중단 |
| `Ctrl+C` | 입력 지우기, 유휴 상태에서는 종료 |

스킬은 `npx skills add` 같은 호환 설치 도구로 현재 프로젝트나 전역에 설치한다. Magnitude가 스킬을 읽는 위치는 세 곳이고, 각각을 현재 프로젝트와 홈 디렉토리에서 함께 확인한다.

| 탐색 경로 | 우선순위 |
|---|---|
| `.claude/skills` | 이름이 겹치면 프로젝트 쪽이 홈 디렉토리 쪽보다 우선한다 |
| `.agents/skills` | 같음 |
| `.magnitude/skills` | 같음 |

문서는 스킬 설치 전 검토를 요구한다. 스킬이 명령을 실행하고 의존성을 설치하고 웹사이트를 열고 외부 서비스와 상호작용할 수 있기 때문이다. 웹 검색은 `EXA_API_KEY`를 설정하고 harness를 시작하면 Exa를 통해 활성화된다.

### 카탈로그 밖 모델과 원격 엔드포인트

카탈로그에 없는 모델도 쓸 수 있다. Hugging Face Hub 캐시에 완전한 GGUF 패키지로 존재하면 discovery가 찾아낸다. 문서는 Hugging Face CLI로 모델과 양자화를 내려받게 하고, 다운로드가 끝난 뒤 Magnitude를 재시작해 목록을 갱신하라고 안내한다. 캐시 위치 확인 순서는 앞의 환경 변수 표와 같다.

원격 모델은 `~/.magnitude/config.json`의 `providers`에 OpenAI 호환 Chat Completions 엔드포인트를 선언해 추가한다. 파일을 저장하면 유효한 변경이 자동 반영되고 설정한 모델이 일반 모델 선택 목록에 나타난다. 문서 예시는 OpenRouter에 GLM 5.2를 연결하며, `contextWindow`를 1,048,576으로 `maxOutputTokens`를 128,000으로 선언하고 reasoning effort로 `high`와 `xhigh`를 노출한다.

| 설정 필드 | 작성 규칙 |
|---|---|
| `connection.baseUrl` | API 루트만 적고 `/chat/completions`를 붙이지 않는다 |
| `connection.authentication` | `none`, `bearer`, `header` 세 형태 중 하나. 자격 증명은 `{ type: "environment", variable: ... }`로 환경 변수를 참조하고 파일에 저장하지 않는다 |
| `connection.headers` | 필요한 추가 헤더를 선언한다. 옵션 |
| `models` 키 | 엔드포인트가 받는 정확한 모델 ID를 쓴다. 표시용 이름이 아니다 |
| `models[].contextWindow`, `models[].maxOutputTokens` | 모델의 실제 컨텍스트와 출력 한도를 선언한다 |
| `models[].capabilities` | `vision` 불리언과 `reasoning`의 `efforts`, `defaultEffort`. 옵션 |

제거와 복원의 동작도 규정되어 있다. 선택 중이던 엔드포인트나 모델을 제거하면 그 모델 자리가 비워지고 대체 모델이 자동으로 선택되지는 않는다. 같은 키를 복원하면 모델은 다시 사용 가능해지지만 선택은 복원되지 않는다.

### 엔진 구현과 네이티브 고정

ICN은 Rust로 작성해 llama.cpp 위에 올렸고 Magnitude와 함께 설치되고 관리된다. 사용자가 별도의 추론 런타임을 설정할 일이 없다는 뜻이다. `inference/` 워크스페이스가 13개 crate로 이를 빌드한다.

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

네이티브 의존성은 두 단계로 고정된다. `native-pin.toml`이 `llama-cpp-rs` 포크의 정확한 커밋과 그 커밋이 품고 있는 llama.cpp gitlink를 각각 기록하고, 바인딩 소스는 `inference/native/llama-cpp-rs`에 체크아웃해 `llama-cpp-2` crate를 상대 경로로 소비한다. 두 번째 Cargo Git 체크아웃이 생기지 않게 하려는 조치다. 어느 pin이든 바꾼 뒤에는 `bun icn:verify-native-pin`을 실행하며, ICN이 보는 backend interface는 그대로 유지된다.

바인딩을 수정할 때는 순서가 정해져 있다. 순서를 지키지 않으면 다른 체크아웃과 CI가 해당 커밋을 가져오지 못한다.

| 순서 | 작업 |
|---|---|
| 1 | `inference/native/llama-cpp-rs`를 고치고 테스트한다 |
| 2 | 그 변경을 `magnitudedev/llama-cpp-rs`에 커밋하고 푸시한다 |
| 3 | 갱신된 `inference/native/llama-cpp-rs` 포인터를 Magnitude에 커밋한다 |

upstream(utilityai나 llama.cpp)이 변경을 받아들일 필요는 없고 upstream PR은 선택이다. llama.cpp 자체는 보통 수정하지 않으며, 업그레이드는 중첩 커밋 포인터를 바인딩 포크에서 갱신해 커밋하는 방식이다. 네이티브 패치가 실제로 필요할 때만 llama.cpp 포크를 만든다. 클론 후에는 `git submodule update --init --recursive`로 두 submodule을 초기화한다.

바인딩 포크는 체크인된 C, C++ wrapper 소스를 고정된 llama.cpp 체크아웃과 함께 직접 컴파일하며 소스 overlay를 만들거나 적용하지 않는다. `parity/upstream/binding-surfaces.json`은 upstream과 bridge, safe Rust 표면을 매핑한 parity 소유 감사 목록이며 포크 빌드 입력이 아니다.

개발 편의를 위해 모델 파일 없이 뜨는 결정적 fake backend를 제공한다. `bun icn:dev`로 띄우면 모델 별칭 `icn-fake`로 `127.0.0.1:8080`에서 OpenAI 호환 스트리밍 응답을 받을 수 있다. 실제 GGUF로 실행할 때는 `bun icn:serve -- --model <경로> --model-alias <별칭> --bind 127.0.0.1:8080` 형태로 모델 경로와 별칭, bind 주소를 넘긴다. Apple Silicon에서는 고정된 바인딩이 macOS Metal backend를 활성화하고, 기본값은 모든 layer를 offload하려 하며 `--gpu-layers 0`은 CPU 실행을 강제한다. 요청 최상위에 `"timings_per_token": true`를 넣으면 llama.cpp 호환 누적 타이밍 스냅샷이 스트림 갱신에 실린다.

개발 서버는 `/health`로 생존을 확인하고 `/v1/chat/completions`로 OpenAI 호환 스트리밍 응답을 낸다. `stream_options`에 `include_usage`를 넣으면 사용량 청크가 따라오고, 응답은 `data:` 프레임 뒤에 종료 표시 프레임으로 끝난다.

타이밍 스냅샷이 어느 델타에 실리는지도 규정되어 있다. 샘플링된 토큰 하나가 의미 델타를 0개 낼 수도 여러 개 낼 수도 있는데, 첫 샘플 토큰 결과에 파서 델타가 함께 있으면 마지막 파서 델타가 스냅샷을 받고, 없으면 역할 델타가 받는다. 파서 델타가 없는 이후 결과는 SSE 이벤트를 내지 않으므로 서버가 타이밍만 담은 이벤트를 만들지 않는다. 예외가 하나 있다. llama.cpp는 부분 결과를 보내기 전에 완전한 정지 단어를 감지하면 플래그가 꺼져 있어도 그 결과에 타이밍을 포함한다. EOS와 길이 종료는 부분 결과의 타이밍 판단 이후에 감지되므로 그렇게 동작하지 않는다. 최종 타이밍 요약은 항상 종료 청크에, `include_usage`를 켰다면 빈 choices 사용량 청크에 실린다.

### 추론 검증 체계

추론 검증은 세 계층으로 분리되어 있다. 앞의 두 계층이 실패 원인을 특정하고, 세 번째 계층이 엔진 전체가 경쟁력 있는지를 판정한다.

| 계층 | 대상 | 판정 |
|---|---|---|
| correctness parity | 네이티브와 ICN의 가장 작은 관찰 단위 연산 | 출력, 실효 설정, 상태 전이가 같은지 |
| performance parity | 같은 격리 연산의 실행 시간 | 양쪽이 동등한 작업을 수행했음을 증명한 뒤에만 측정한다 |
| composite benchmarking | ICN과 고정된 `llama-server` 엔드포인트에 보낸 통제된 완료 워크로드 | 스케줄링, 동시성, prefix 재사용, prefill과 decode 혼합, 지연, 처리량, 공정성, 메모리, 실패 |

composite fixture는 요청이나 결정적 agentic 워크플로를 여섯 가지 차원과 함께 정의한다.

| fixture 차원 | 내용 |
|---|---|
| 프롬프트와 출력 크기 | 입력과 생성 길이를 고정한다 |
| 공유 prefix 위상 | 요청들이 앞부분을 얼마나 공유하는지 |
| 도착 스케줄 | 요청이 시간축에서 어떻게 들어오는지 |
| 동시성 | 동시에 처리하는 요청 수 |
| cold와 warm 상태 | 모델이 이미 로드되어 있는지 |
| 워크로드 종류 | 단순 요청인지 결정적 agentic 워크플로인지 |

엄격 비교는 동일한 모델 바이트, template, 설정, 샘플링, 토큰 작업을 전제로 하며, 응답이나 작업량이 어긋나면 그것은 correctness 결과이고 측정된 시간은 무효가 된다. 같은 fixture가 ICN 대 llama.cpp 비교, ICN 회귀 테스트, 서버와 CLI로 노출되는 opt-in 공개 하드웨어 벤치마크를 함께 지원하도록 설계되었다. 버전 관리되는 suite는 `benchmark/`에 있고 재사용 가능한 라이브러리와 CLI는 `benchmark-runner` crate다.

원시 parity 자산은 `parity/` 아래에 모여 있다. 중립 케이스, fixture, 프로파일, 콘텐츠 주소 기반 모델 레지스트리, upstream target 매니페스트, JSON 증거 스키마, 얇은 네이티브 C++ oracle이 들어 있고, 비교는 두 생산 프로세스 밖에서 이뤄지며 정확 일치, 구조 비교, 허용 오차 기반, capability 기반, 동일 작업 성능 비율 중 하나를 쓴다. parity 실행은 생성된 chat 응답이나 HTTP 교환을 원시 증거로 삼지 않는다. `diagnostic` 프로파일은 통제되지 않는 비게이팅 기능 smoke이고, `native-diagnostic`은 후보 parity나 통제된 성능 주장 없이 단방향 네이티브 검사만 수행한다.

### 개발과 운영 도구

monorepo 루트에서 쓰는 ICN 빌드와 검증 명령은 14개이며 다섯 묶음으로 나뉜다.

| 묶음 | 명령 |
|---|---|
| 빌드 | `bun icn:check`(링크 없이 타입 검사), `bun icn:build`(디버그), `bun icn:build:release`(최적화), `bun icn:build:reference`(고정 테스트와 공식 도구, 네이티브 oracle), `bun icn:build:candidate`(provenance 포함 parity probe) |
| 테스트 | `bun icn:test`(Rust API, SSE, backend, 워크스페이스) |
| parity | `bun icn:parity:validate`(케이스, fixture, 프로파일, target, 모델 레지스트리 검증), `bun icn:parity:list`, `bun icn:parity:test:ts` |
| 프로토콜 생성 | `bun icn:generate`(OpenAPI exporter 실행 후 `packages/icn-protocol` 전체 재생성), `bun icn:check-generated`(쓰기 없이 파생해 낡으면 실패) |
| 진단 | `bun icn:verify-native-pin`, `bun icn:doctor`, `bun icn:version` |

`bun icn:build:reference`는 Rust 바인딩이 쓰는 중첩 llama.cpp 소스에서 선언된 target만 빌드한다. target ID는 `focused-tests`, `oracle`, `llama-bench`, `llama-batched-bench`, `llama-perplexity`, `backend-ops`, `quantize-perf`다. 빌더는 소스와 설정, 아티팩트, oracle 다이제스트를 기록하고 호출마다 새 CMake 트리를 예약하며, 이전 CMake 캐시를 parity 증거로 재사용하지 않는다.

세션 조사 도구는 `bun session`이다. 세션은 `~/.magnitude/sessions/`에 UTC 타임스탬프 폴더 이름으로 저장되고, 이벤트는 0부터 세며, projection 출력은 JSON이라 `jq`로 질의할 수 있다.

| 하위 명령 | 목적 |
|---|---|
| `bun session list` | 최근 세션의 ID, 제목, 날짜, 메시지 수 |
| `bun session events <id>` | 인덱스와 타입, 타임스탬프만 나열. `--type`으로 이벤트 타입을, `--from`과 `--to`로 인덱스 범위를 좁힌다 |
| `bun session event <id> <index>` | 이벤트 하나의 전체 payload를 JSON으로 출력 |
| `bun session search <keyword> <id>` | payload에서 키워드를 찾아 인덱스, 타입, 발췌를 보여준다. `--last N`으로 최근 N개 세션을 함께 검색 |
| `bun session projection <id> <name>` | 이벤트를 재생해 지정한 projection 상태를 JSON으로 덤프. `--at N`으로 시점을 지정 |

재생 가능한 projection은 13종이다. `Window`, `Fork`, `TaskGraph`, `Turn`, `Display`, `Compaction`, `WorkingState`, `SessionContext`, `Proposal`, `AgentRegistry`, `Artifact`, `ChatTitle`, `Replay`이며 `all`로 전부 덤프한다. 즉 compaction이 언제 어떻게 일어났는지, 작업 그래프가 어떤 모양이었는지를 사후에 이벤트로부터 다시 만들어 볼 수 있다.

관측 도구로는 Motel이 있다. `http://127.0.0.1:27686`에서 HTTP API를 노출하는 로컬 OpenTelemetry 수집기로, `curl`로 조회한다.

| 엔드포인트 | 내용 |
|---|---|
| `/api/health`, `/api/services` | 생존 확인과 telemetry를 보고하는 서비스 목록 |
| `/api/traces`, `/api/traces/<trace-id>` | 서비스별 최근 trace와 span을 포함한 전체 trace 트리 |
| `/api/spans/<span-id>` | span 하나와 그 로그 |
| `/api/logs`, `/api/logs/search` | 서비스별 최근 로그와 구조화 로그 검색 |
| `/api/traces/search` | 구조화 trace 검색 |
| `/api/ai/calls` | AI SDK 호출 조사기 |

OpenAPI 명세는 `http://127.0.0.1:27686/openapi.json`에 있다. 이 밖에 `bun design-docs <path>`로 파일에 적용되는 설계 문서를 찾고, `bun els overview --file <path>`와 `bun els layerinfo --file <path>`로 Effect export와 layer 의존성을 확인한다. 테스트는 `bunx --bun vitest`로 실행해야 하며, `--bun` 없이 실행하면 vitest worker가 Node에서 실행되어 Bun 전역이 없다. 타입 검사는 저장소 전역 `tsc -b` 대신 패키지 단위로 수행한다. 현재 세션의 CLI 로거 출력은 `bun logs`로 본다.

문서 디렉토리의 역할도 나뉘어 있다. `design/`은 아키텍처와 동작의 지속적 진실 원천이고, `info/`는 사람과 LLM이 함께 읽는 간결한 고수준 문서를 담으며, 중요한 버그 보고나 큰 명세는 `bugs/YY-MM-DD/`나 `specs/YY-MM-DD/` 아래에 둔다.

## 결과

공개된 정량 성능 수치는 없다. 저장소는 parity와 composite benchmark 도구를 갖췄지만 결과 자체는 문서에 싣지 않았다. 대신 사용자가 추천 화면을 해석할 수 있도록 두 가지 기준점을 제공한다.

첫째는 Intelligence 점수의 눈금이다. CLI 문서는 Artificial Analysis Intelligence Index v4.1.1의 2026년 9월 1일 스냅샷을 함께 싣는다. 이 지수는 수학, 과학, 코딩, 지식, long-context 작업, agentic 과제를 묶어 독립적으로 산출하는 합성 지표다.

| 참조 모델 | 평가 구성 | 점수 |
|---|---|---:|
| Claude Opus 5 | adaptive reasoning, max effort | 63 |
| Claude Fable 5 | adaptive reasoning, max effort, Opus 4.8 fallback | 62 |
| GPT-5.6 Sol | max effort | 61 |
| GPT-5.6 Terra | max effort | 57 |
| GPT-5.6 Luna | max effort | 52 |

이 표의 용도는 제한적이다. 로컬 모델의 점수가 52 근처면 GPT-5.6 Luna와 같은 점수 영역이고 61 근처면 GPT-5.6 Sol 부근이라는 정도의 눈금으로만 쓰라고 문서가 명시한다. 두 모델이 같은 방식으로 동작한다는 뜻이 아니며, 비교는 같은 index 버전과 비슷한 reasoning 설정 사이에서만 유효하다. Artificial Analysis가 방법론이나 결과를 시간에 따라 개정할 수 있다는 점도 함께 적혀 있다. Magnitude는 추천 시점에 네트워크로 점수를 갱신하지 않고 검토한 점수를 카탈로그와 함께 배포하며, 직접 측정한 점수가 없으면 저자 추정치임을 표시한다.

둘째는 속도 표기다. 추천 화면은 `~36-48 tok/s` 같은 범위를 보여 주는데, 이는 하드웨어를 근거로 한 예측이지 내려받은 모델을 실제로 측정한 결과가 아니다. 실제 속도는 프롬프트 길이, 동시 작업, 가용 메모리, 모델 리비전에 따라 달라진다.

카탈로그 자체도 이 프로젝트의 산출물 가운데 하나다. 카탈로그는 상위 추천만이 아니라 현재 하드웨어에 들어가는 검토된 구성 전체를 담고, 각 구성의 메모리, 지능, 양자화, 속도, 컨텍스트, 라이선스 정보를 포함한다. 즉 공개된 벤치마크 수치는 없지만 기기별로 계산된 후보 집합이 결과물로 제시된다.

공개 수치가 없다는 사실 자체가 이 저장소의 검증 설계와 맞물려 있다. parity 문서는 타이밍이 유효하려면 양쪽이 동등한 작업을 했다는 증명이 먼저 있어야 한다고 규정하고, 응답이나 작업량이 어긋나면 그 결과는 성능이 아니라 정확성 문제로 분류한다. 즉 조건을 갖추지 못한 측정값을 내놓지 않는 쪽을 택했고, 그 결과 사용자가 볼 수 있는 성능 근거는 자기 기기에서 직접 실행한 benchmark뿐이다.

채택 지표로는 star 3,437개와 fork 247개, 열린 issue 17개가 확인된다. 모두 2026년 9월 6일 GitHub API 조회값이며 저장소가 2026년 6월 12일에 만들어졌으므로 공개 3개월이 되지 않은 시점의 수치다. GitHub API가 보고한 `topics`는 빈 배열이라 저장소에 등록된 토픽 태그는 없다.

## 문제 해결

공식 문제 해결 문서도 1차 대응을 에이전트에게 맡긴다. harness가 살아 있으면 에이전트에게 Magnitude를 점검하고 고치도록 요청하고, 에이전트는 `magnitude docs onboarding`으로 현재 워크플로를 읽은 뒤 headless CLI로 서비스와 모델과 연결을 조사한다.

모델이 로드되지 않을 때의 메시지는 세 가지로 구분되며 각각 다른 조치를 요구한다.

| 메시지 | 뜻 | 조치 |
|---|---|---|
| **Too large** | 시스템 메모리를 보존하면서는 그 구성이 들어갈 수 없다 | 더 작은 모델이나 양자화, 컨텍스트를 고른다 |
| **Not enough memory available** | 평소에는 들어가지만 지금 다른 응용이 메모리를 너무 많이 쓰고 있다 | 메모리를 많이 쓰는 응용을 닫고 다시 시도한다 |
| **Model stopped** (저메모리) | 실행 중에 가용 메모리가 안전하지 않은 수준이 되었다 | 메모리를 확보한다. 다음 요청이 모델을 다시 로드한다 |

설정이 끝나지 않은 경우에는 에이전트에게 온보딩을 이어가게 한다. 이미 끝난 하드웨어 프로파일링과 모델 다운로드는 가능한 범위에서 재사용되므로 처음부터 다시 하지 않는다. CLI 자체가 시작되지 않으면 `magnitude --version`을 확인한 뒤 갱신하거나 다시 설치하고, Windows에서는 WSL 안에서 실행하는지 확인한다. 대화형 설정을 쓰고 있었다면 `magnitude setup`을 다시 실행해도 된다.

harness가 Magnitude를 쓰지 못할 때는 서비스 실행 여부를 확인하고 연결을 다시 동기화한다. 수동 복구는 `magnitude service start`와 `magnitude connections sync` 두 명령이다. 다운로드가 실패한 경우 Magnitude는 일시적인 네트워크와 서버 실패를 재시도하고, 재시도가 소진되면 네트워크 접근과 디스크 공간을 확인한 뒤 다시 시도한다. 부분 다운로드는 처음부터 다시 받지 않고 이어받을 수 있다.

추론이 느리거나 대기하는 경우의 원인도 세 가지로 정리되어 있다. 첫 요청은 모델 로드를 기다릴 수 있고, 긴 프롬프트는 생성 전에 prefill이 필요하며, 동시 요청은 기기에 여유 추론 용량이 없을 때 대기한다. 지속적인 생성 속도가 기대보다 느리면 에이전트에게 현재 구성과 더 빠른 추천을 비교하게 하라고 문서가 안내한다.

복구는 영향이 가장 작은 순서로 올라간다.

| 순서 | 조치 |
|---|---|
| 1 | 요청을 다시 시도한다 |
| 2 | harness를 재시작한다 |
| 3 | Magnitude 서비스를 시작하거나 재시작한다 |
| 4 | 에이전트에게 온보딩을 다시 진행하게 하거나 `magnitude setup`을 다시 실행한다 |
| 5 | 파생된 하드웨어나 카탈로그 데이터가 문제일 때만 `~/.magnitude/cache`를 지운다 |
| 6 | 번들 추론 파일이 없으면 CLI를 다시 설치한다 |

로그 위치는 운영체제별로 다르다. macOS에서는 서비스 로그가 `~/.magnitude/logs/acn-service.log`에 있고, Linux에서는 `journalctl --user -u magnitude.service`로 본다. 자체 harness의 세션 로그는 `~/.magnitude/sessions` 아래 세션별로 저장된다. 문서는 로그를 공유하기 전에 프롬프트와 프로젝트 내용, 사적 경로, 자격 증명을 제거하라고 요구한다.

## 한계

- **성능 근거가 공개되지 않았다.** ICN이 원본 `llama-server` 대비 어느 수준인지는 사용자가 저장소의 benchmark 도구를 직접 실행해야 확인할 수 있다. 공개 하드웨어 벤치마크는 opt-in 설계로 언급만 되어 있고 결과가 실려 있지 않다.
- **표시 지표의 해석 부담이 크다.** Speed는 신뢰구간이 아닌 예측 범위이고, Intelligence는 정답률이 아닌 index 점수이며 양자화 변형끼리 점수를 공유한다. 로컬 아티팩트의 품질 손실은 Accuracy가 따로 표현하므로 세 지표를 함께 읽어야 한다.
- **플랫폼이 제한된다.** macOS와 Linux만 지원하고 Windows는 WSL을 거쳐야 한다.
- **백그라운드 서비스에 의존한다.** Codex와 Claude Code 연결은 서비스가 실행 중이어야 유지되며, 서비스가 멈추면 호스팅 모델 사용까지 영향을 받아 `magnitude service start`로 되살려야 한다.
- **메모리 압박 시 요청이 실패한다.** 가용 메모리가 위험해지면 모델이 중단된다. 기기 안정성을 지키는 대신 그 요청은 실패하고 다음 요청에서 다시 로드된다.
- **카탈로그 밖 구성은 가속을 받지 못한다.** 검토된 호환 방식이 없으면 speculative decoding 없이 실행된다. 임의의 draft 모델을 target에 결합하지 않는다는 방침의 결과다.
- **카탈로그 밖 모델의 갱신 절차가 수동이다.** 직접 내려받은 GGUF는 완전한 상태여야 하고 인식되는 Hugging Face 캐시 위치에 있어야 하며, Magnitude를 재시작하기 전까지 목록에 나타나지 않는다.
- **네이티브 고정에 절차적 부담이 있다.** llama.cpp를 올리려면 바인딩 포크의 중첩 커밋 포인터를 갱신하고 그 포인터를 다시 커밋해야 하며, 푸시 순서를 어기면 다른 체크아웃과 CI가 빌드하지 못한다.
- **문서의 주 독자가 에이전트다.** 상세 문서 상당수가 사람이 읽는 튜토리얼이 아니라 에이전트가 읽고 실행하는 지시문 형태로 쓰여 있다. CLI 레퍼런스도 스스로를 자동화와 수동 복구를 위한 문서로 규정하므로, CLI를 직접 다루려는 사용자에게는 안내가 얇게 느껴질 수 있다.
- **하드웨어 요구가 확정되지 않는다.** FAQ는 고정된 최소 사양이 없다고만 답하고, 메모리가 많으면 큰 모델을 쓸 수 있다는 방향만 제시한다. 어떤 기기에서 어떤 경험을 얻을지는 프로파일링 결과를 봐야 알 수 있다.

## 기여 정책

`CONTRIBUTING.md`는 이 저장소가 AI 생성 코드를 전제로 운영된다는 점을 밝히면서도 사람의 개입을 요구한다. 기여에 AI 생성 내용이 포함되는 것은 예상된 일이지만, 유용한 논의를 위해 issue와 PR에는 사람이 쓴 설명이 들어가야 하고 사람과 AI가 쓴 부분을 명확히 구분하는 것이 이상적이라고 적는다. 사람의 의미 있는 조종이나 검증 없이 에이전트가 한 번에 만든 구현이라면 PR보다 issue 제출이 바람직하다는 규정이 이 문서에서 가장 특징적이다.

| 요구 항목 | 내용 |
|---|---|
| 대상 범위 | 임의의 코드 품질이나 내부 도구 문제가 아니라 실제 사용자 대면 제안이나 우려를 다룬다 |
| 근거 | 변경과 구현 방식에 대한 명확한 정당화 |
| changeset | 한 줄 설명이 붙은 patch changeset |
| 설명 | 사람이 쓴 설명이 반드시 어딘가에 있어야 하고 AI가 쓴 부분은 선택이다 |
| 구현 품질 | 코드베이스 패턴에 맞고 품질이 높아야 한다 |
| 테스트 | 수행한 테스트를 설명한다. 형식적 단위 테스트보다 AI 수동 검증, 그보다 사람 수동 검증을 선호하고, 시스템의 의미 있는 속성을 보이지 못하는 단위 테스트는 넣지 않는다 |

금지된 코드베이스 영역은 없지만, 특정 버그를 해결하는 범위가 분명한 변경이 받아들여질 가능성이 가장 높다고 문서가 밝힌다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| ICN (Inference Control Node) | Rust와 llama.cpp로 구현한 Magnitude의 추론 실행 노드. `inference/` 워크스페이스가 13개 crate로 빌드한다 |
| discovery | 기기의 Hugging Face 캐시를 읽기 전용으로 훑어 사용 가능한 GGUF 모델을 찾는 준비 단계 |
| assessment | 카탈로그와 discovery 결과를 현재 하드웨어에 대해 평가해 호환성, 메모리 적합, 서빙 구성, 가속, 예상 속도를 판정하는 단계 |
| residency | 설치된 모델이 지금 메모리에 올라가 있는지를 나타내는 상태 |
| harness connection | 외부 harness의 설정과 스킬을 갱신해 로컬 모델을 쓰게 만드는 연결 단위 |
| DSpark | DFlash의 병렬 블록 제안에 준자기회귀 head와 confidence head를 더한 speculative decoding 방식 |

## 관련 페이지

- [[agents/bai-2026-how-do-ai-agents-spend]]: SWE-bench Verified 500건을 8개 모델로 1만 6천 회 실행해 코딩 에이전트의 토큰 소비를 실측한 논문. Magnitude가 없애겠다고 말하는 토큰 비용 항목의 규모를 보여준다.
- [[agents/yongkyun-2026-cutting-llm-token-costs-with]]: headroom과 rtk, caveman 세 도구의 절감률을 저자 본인의 세션 기록으로 다시 측정한 리포트. 컨텍스트를 줄여 비용을 낮추는 접근이라 모델 실행 위치를 바꾸는 Magnitude와 대비된다.
- [[agents/stablyai-orca]]: Codex와 Claude Code, OpenCode, Pi를 각각 독립된 git worktree에서 동시에 실행하고 한 곳에서 추적하는 MIT 라이선스 데스크톱 앱. harness 위쪽에서 여러 실행을 묶는 반면 Magnitude는 harness 아래 모델 실행 계층을 다룬다.
- [[agents/ai-boost-awesome-harness-engineering]]: harness를 모델과 분리된 공학 분야로 규정하고 자료 385개를 문제 단위로 분류한 CC0 awesome-list. harness라는 용어가 어디까지를 가리키는지 확인할 수 있다.
- [[agents/lee-hoyeon-2026-harness-engineering]]: harness engineering을 구조와 맥락, 계획, 실행, 검증, 개선 여섯 단계로 정리한 54장 한국어 슬라이드. Magnitude가 연결 대상으로 삼는 harness 계층을 사람 쪽 작업 절차로 본다.
