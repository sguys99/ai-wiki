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

Magnitude는 사용자의 기기에서 로컬 모델을 실행하고, 그 모델을 이미 쓰고 있는 코딩 에이전트에 연결해 주는 오픈소스 추론 서버다. 기기의 프로세서와 메모리, 메모리 대역폭을 프로파일링해 실제로 들어가고 쓸 만한 속도가 나올 모델 구성을 추천하고, 선택한 구성을 다운로드해 하드웨어에 맞게 설정한 뒤 백그라운드 서비스로 실행한다.

연결 대상은 Pi, OpenCode, Hermes, OpenClaw, Codex, Claude Code, Oh My Pi, Cline이며 자체 harness도 함께 제공한다. harness는 모델을 감싸 도구와 검증, 상태를 제공하는 실행 환경을 뜻한다. 라이선스는 Apache-2.0이고, 저장소는 TypeScript 기반 데몬과 CLI에 Rust로 작성한 추론 엔진을 더한 monorepo다.

프로젝트의 설계 의도는 "로컬 모델 실행을 사람이 아니라 에이전트가 대신 설정하게 한다"로 요약된다. 사용자는 프롬프트 한 줄을 자기 에이전트에 보내고, 에이전트가 CLI를 실행해 하드웨어 프로파일링부터 harness 재연결까지 진행한다.

## 배경

코딩 에이전트를 로컬 모델로 실행하려는 요구는 비용, 프라이버시, 오프라인 가용성 세 가지에서 나온다. 호스팅 모델은 토큰 단위로 과금되고 rate limit이 걸리며 프롬프트와 파일이 외부로 전송된다. 로컬 모델은 이 세 제약을 모두 없애지만 대신 설정 부담을 사용자에게 넘긴다.

설정 부담의 실체는 선택 문제다. 어떤 모델의 어떤 양자화가 이 기기의 메모리에 들어가는지, context를 얼마로 잡아야 하는지, 그 조합에서 초당 몇 토큰이 나오는지를 미리 알기 어렵다. 양자화는 가중치를 낮은 비트 수로 줄여 모델을 압축하는 기법이고, 압축 정도에 따라 메모리 사용량과 품질이 함께 달라진다.

Magnitude의 공식 문서는 이 지점을 Ollama와의 비교로 설명한다. 에이전트에게 Ollama 설치를 맡기면 에이전트는 추측으로 결정한다. 하드웨어도, 어떤 양자화가 맞는지도, 실제 속도가 얼마일지도 모르기 때문이다. Magnitude는 그 대신 기기별로 계산된 추천이 담긴 카탈로그, harness 설정 파일까지 작성하는 온보딩 절차, 에이전트 워크로드를 전제로 만든 추론 서버를 제공한다.

두 번째 배경은 로컬 모델의 운영 특성이다. 로컬 모델은 상시 메모리를 점유하면 다른 작업을 방해하고, 컨텍스트가 작아 대화가 금방 한계에 닿으며, tool call 형식과 reasoning 형식이 모델마다 다르다. 서버가 이 차이를 흡수하지 않으면 harness가 모델별 분기 코드를 갖게 된다.

## 핵심 개념

**추론 서버**는 harness가 보내는 요청을 받아 모델 프로세스, 메모리, context, 동시성을 관리하는 백그라운드 구성 요소다. Magnitude는 이 서버를 loopback 주소에서 실행하고 OpenAI 호환과 Anthropic 호환 두 가지 인터페이스로 노출한다.

**카탈로그 구성**은 모델 하나가 아니라 모델, 양자화, context 크기를 묶은 단위다. 같은 모델이라도 양자화와 context가 다르면 메모리 사용량과 속도가 달라지므로, 추천과 설치, 실행 모두 이 구성 단위를 대상으로 한다. 구성마다 고유 ID가 있고 이후 명령에는 표시용 이름이 아니라 이 ID를 그대로 사용해야 한다.

**discovery와 assessment**는 모델 준비의 두 단계다. discovery는 기기에 이미 있는 Hugging Face 캐시를 읽기 전용으로 훑어 쓸 수 있는 GGUF 모델을 찾고, assessment는 카탈로그 구성과 discovery 결과를 현재 하드웨어에 대해 평가한다. GGUF는 llama.cpp 계열이 사용하는 로컬 모델 파일 포맷이다.

**residency**는 설치된 모델이 지금 메모리에 올라가 있는지를 나타내는 상태다. 다운로드는 디스크를 쓰고 로드는 메모리를 쓴다는 구분이 이 개념의 핵심이며, 다운로드된 모델은 로드되기 전까지 추론 메모리를 사용하지 않는다.

**speculative decoding**은 값싼 수단으로 여러 토큰을 먼저 제안하고 target 모델이 그 토큰들을 한꺼번에 검증하게 해 생성 속도를 올리는 기법이다. 어떤 토큰을 채택할지는 target이 결정하므로 모델의 지능이나 품질 등급은 바뀌지 않고 디코딩 속도만 달라진다.

**harness connection**은 Magnitude가 외부 harness의 설정 파일을 갱신하고 번들 스킬을 설치해 그 harness가 로컬 모델을 쓰게 만드는 연결 단위다. 스킬은 특정 작업 절차를 담아 에이전트에 제공하는 지침 패키지이며, 여기서는 이후 모델을 CLI로 관리하는 방법을 담는다.

## 방법

### 전체 구성

저장소는 클라이언트에서 데몬으로 내려가는 단방향 의존을 규약으로 고정했다.

```
clients (cli/web) → client-common → sdk → acn (daemon)
```

클라이언트는 `client-common`과 `sdk`에서만 import하고 데몬 내부 패키지를 직접 참조하지 않는다. 각 계층의 역할은 다음과 같다.

| 패키지 | 역할 |
|---|---|
| `client-common` | 공유 상태, hook, 디스플레이 동기화. 연결 단위 쿼리 클라이언트를 소유한다 |
| `sdk` | 이식 가능한 RPC 클라이언트. 고정 엔드포인트 접속과 복구, 서비스 시작 기능을 담는다 |
| `acn` | 에이전트 런타임, 세션, 파일 조작, 디스플레이 스트림을 호스팅하는 서버 데몬 |
| `acn-protocol` | SDK와 ACN이 공유하는 wire contract. 클라이언트는 참조하지 않는다 |
| `ai` | provider 중립 계약(`Provider`, `ModelCatalog`, `BoundModel`, `BaseCallOptions`) |
| `providers` | 구체 provider 구현과 레지스트리 |
| `agent` | 에이전트 런타임, projection, worker, 도구, 디스플레이 구체화 |
| `event-core` | event sourcing과 projection, 주소 지정 상태 |
| `storage` | 세션, 설정, 인증 저장 |

코드베이스는 Effect-TS 네이티브를 규약으로 삼는다. 직렬화하거나 검증해야 하는 데이터는 Effect Schema로 표현하고, 선택 값은 `Schema.optionalWith`로 선언해 값이 있거나 없는 두 상태로만 직렬화되게 한다. ID 성격의 문자열은 branded type을 쓴다.

### 하드웨어 프로파일링과 모델 평가

Magnitude는 프로세서, 메모리, 아키텍처, Metal이나 CUDA 같은 가속 방식을 감지해 프로파일을 만들고 캐시한다. 이 프로파일과 모델 메타데이터만으로 어떤 구성이 메모리에 들어가고 얼마나 빠를지를 추정하므로, 가중치 전체를 내려받기 전에 판단이 끝난다.

준비 상태는 두 단계로 보고된다. discovery는 로컬 캐시 스캔이라 네트워크를 사용하지 않고, assessment는 호환성, 메모리 적합, 서빙 구성, 사용 가능한 가속, 예상 생성 속도를 판정한다. assessment 결과가 잘 동작하지 않을 모델을 제외하고 남은 구성의 순위를 만든다.

에이전트용 온보딩 지시문은 두 단계가 모두 `Complete`로 보고될 때까지 약 10초 간격으로 상태를 다시 조회하고, 의미 있는 변화만 사용자에게 알리라고 규정한다. 설치와 로드도 각각 백그라운드 작업이므로 같은 방식으로 진행률을 관찰한다.

### 추천 순위와 다섯 단계 preference

추천은 모델 지능, 예상 생성 속도, 양자화 품질, 설정된 context 크기, 물리 메모리를 함께 고려해 최대 10개 구성을 순위로 만든다. preference는 별도의 카탈로그가 아니라 같은 후보 집합에서 절충점을 옮기는 값이다.

| preference | 성격 | 사용 지침 |
|---|---|---|
| `fastest` | 속도 최우선, 지능은 제한적으로만 고려 | 지능을 거의 신경 쓰지 않는다고 사용자가 분명히 밝힌 경우에만 |
| `faster` | 속도 쪽으로 기울이되 지능도 의미 있게 고려 | 평소 빠른 선택지를 찾는 사용자의 기본값 |
| `balanced` | 속도와 지능의 절충 | 기본값 |
| `smarter` | 지능 쪽으로 기울이되 속도도 의미 있게 고려 | 평소 똑똑한 선택지를 찾는 사용자의 기본값 |
| `smartest` | 지능 최우선, 느린 생성을 감수 | 느린 생성을 감수하겠다고 사용자가 분명히 밝힌 경우에만 |

문서는 사용자가 "빠른 것과 똑똑한 것을 함께 보여 달라"고 요청하면 두 극단이 아니라 `faster`와 `smarter`를 비교하라고 명시한다. 추천은 사용자와 함께 고르기 위한 출발점이지 어떤 모델이 모든 작업에 최선이라는 주장이 아니다.

### 추천 화면의 속성 읽는 법

추천 항목이 노출하는 속성은 여덟 가지이며, 각각이 무엇을 뜻하지 않는지가 함께 규정되어 있다.

| 속성 | 의미 | 오해하기 쉬운 점 |
|---|---|---|
| Speed | 이 기기에서의 생성 처리량 추정치 | 표시된 범위는 짧은 context와 긴 context 사이의 변동 폭이며 신뢰구간이 아니다 |
| Memory | 실행 중 필요한 추정 메모리 | 다운로드 크기가 아니다. 평소 들어가는 모델도 다른 응용이 메모리를 점유하면 로드에 실패할 수 있다 |
| Context | 이 서빙 구성에서 쓸 수 있는 대화와 작업 자료의 양 | 모델 아키텍처의 절대 최대치와 다를 수 있다. 긴 context는 메모리를 더 쓰고 생성을 느리게 한다 |
| Intelligence | Artificial Analysis Intelligence Index 점수 | 퍼센트 기호로 표시하지만 확률이나 정답률이 아니다. 같은 원본 모델의 양자화 변형은 이 점수를 공유한다 |
| Accuracy | 양자화 이후 로컬 아티팩트가 원본 모델을 얼마나 충실히 보존하는지 | 사실 정확도가 아니며 Intelligence와 별개 지표다 |
| Acceleration | 준비된 speculative decoding 방식 | 방식 이름보다 기기별 속도 근거가 우선한다 |
| Capabilities | vision, tool use, structured output, reasoning 등 지원 기능 | 작업이 정해져 있다면 작은 속도나 지능 차이보다 중요하다 |
| ID | 이후 명령에 사용할 정확한 구성 식별자 | 표시용 이름은 명령 인자가 아니다 |

이 속성들은 함께 읽어야 의미가 생긴다. Memory와 Context는 그 구성이 이 기기에서 현실적인지를 결정하고, Accuracy는 로컬 포맷으로 옮기면서 잃은 품질을 나타내며, Capabilities는 애초에 그 작업이 가능한지를 결정한다.

### speculative decoding 네 가지 방식

Magnitude가 보고하는 가속 방식은 네 가지이고, 일반적인 속도 순서는 `None`, `MTP`, `DFlash`, `DSpark` 순으로 빨라진다.

| 방식 | 동작 | 특징 |
|---|---|---|
| None | speculative draft 없이 통상적인 autoregressive decoding | 디코딩 단계마다 target이 승인한 토큰 하나를 낸다. 가속을 재는 기준선 |
| MTP | target과 함께 학습된 보조 모듈(Multi-Token Prediction, NextN)이 다음 토큰들을 제안 | target의 디코딩 작업을 줄이지만 유효 draft가 짧거나 순차적이다 |
| DFlash | target의 hidden feature를 쓰는 경량 block-diffusion drafter가 한 번의 forward pass로 토큰 블록 전체를 제안 | 병렬 블록 제안이 draft 지연을 분산해 가속기에 잘 맞는다. 블록 뒷부분은 채택률이 떨어질 수 있다 |
| DSpark | DFlash의 병렬 구조에 준자기회귀 head를 더해 블록 내부 토큰 간 의존성을 복원 | confidence head가 확신이 낮은 뒷부분을 검증 전에 제거해 낭비되는 검증을 줄인다 |

이 순서는 경향이지 보장이 아니다. target과 draft 모델, draft 채택률, 프롬프트와 출력 내용, context 길이, 양자화, 하드웨어, 메모리 배치, 요청 동시성에 따라 이득이 거의 없거나 오히려 부담이 될 수 있다.

사용자가 방식을 고르거나 draft 모델을 짝지을 일은 없다. 카탈로그 구성이 검토된 방식과 필요한 draft 아티팩트를 선언해 두고, `magnitude catalog pull`이 필요한 draft를 함께 받아오며, 평가와 로드 단계에서 target과 draft, 방식, 하드웨어 적합, 서빙 구성을 검증한 뒤 추론에서 자동 활성화한다. Magnitude는 임의의 draft 모델을 target에 결합하지 않으므로, 검토된 호환 방식이 없는 구성은 speculative decoding 없이 실행된다.

### 추론 런타임

런타임은 다섯 가지 동작으로 정리된다.

- **요청 시점 로드**: 다운로드한 모델은 필요해질 때까지 디스크에 머문다. 요청이 오면 설정된 모델이 아직 실행 중이 아닐 때 메모리에 올라간다. 해제 직후 첫 요청은 로드 시간을 포함하고, 활성 상태에서 들어온 요청은 곧바로 추론을 시작한다.
- **유휴 해제**: 사용이 없거나 기기가 메모리를 필요로 하면 모델을 해제한다. 해제는 다운로드를 지우거나 선택을 바꾸지 않고 추론 메모리만 반환하며, 다음 요청이 다시 로드한다.
- **하드웨어 튜닝**: 가속, 모델 배치, context, speculative decoding, 런타임 설정을 현재 기기에 맞춰 구성한다. 로드 직전마다 가용 메모리를 다시 확인한다.
- **context 보존과 동시성**: 요청마다 설정된 context를 그대로 유지한다. 더 많은 요청을 처리하려고 context를 조용히 줄이지 않고, 남은 용량만 동시 작업에 배정한다. 진행 중인 세션에서는 호환되는 프롬프트 상태를 재사용해 새 입력만 처리하므로 반복되는 prefill 작업이 줄어든다.
- **메모리 보호**: 로드와 실행 중 메모리를 감시하다가 가용량이 위험 수준으로 떨어지면 추론이 기기를 불안정하게 만들기 전에 모델을 중단한다.

여기에 더해 서버는 로컬 모델마다 다른 reasoning 형식, tool call 형식, chat template, 대화 이력 규약을 정규화한다. harness가 모델별 동작을 구현하지 않고도 모델을 교체할 수 있게 하려는 조치다.

### 인터페이스

백그라운드 서비스는 loopback `http://127.0.0.1:10100`에서 대기하고 두 가지 호환 API를 노출한다.

| API | base URL | 지원 범위 |
|---|---|---|
| OpenAI 호환 | `http://127.0.0.1:10100/inference/v1` | 모델 목록, Chat Completions, Responses |
| Anthropic 호환 | `http://127.0.0.1:10100/inference/anthropic` | Messages, 토큰 카운트 |

CLI는 사람이 직접 쓰기보다 에이전트가 실행하는 것을 전제로 설계되어, 관찰 명령마다 `--json`을 지원하고 모델과 harness의 정확한 ID를 항상 출력한다.

| 명령군 | 주요 명령 | 담당 영역 |
|---|---|---|
| `service` | `install`, `start`, `status`, `stop`, `uninstall` | 사용자 단위 로그인 서비스 |
| `catalog` | `status`, `list`, `show`, `recommendations`, `pull`, `cancel`, `remove` | 모델 탐색과 평가 진행, 검토된 구성, 다운로드 |
| `models` | `status`, `load`, `stop` | 이 기기의 모델과 설치, 실행 상태 |
| `connections` | `list`, `add`, `sync`, `remove` | harness 연결 |
| `docs` | `docs [topic-id]`, `docs onboarding` | 에이전트용 번들 문서 |

사용자 데이터는 한 디렉토리에 모인다.

| 경로 | 내용 |
|---|---|
| `~/.magnitude/models/` | Magnitude가 관리하는 로컬 모델 |
| `~/.magnitude/cache/` | 모델 메타데이터, 하드웨어 프로파일, 재생성 가능한 캐시 |
| `~/.magnitude/sessions/` | 자체 harness 대화와 세션 로그 |
| `~/.magnitude/logs/` | CLI 로그와 macOS 서비스 로그 |
| `~/.magnitude/config.json` | 사용자 설정과 모델 선택 |
| `~/.magnitude/harness-connections.json` | 관리 중인 harness 연결 |

문제 해결 시 `cache/`만 지우면 파생 데이터가 다시 만들어지지만, `~/.magnitude` 전체를 지우면 모델과 설정, 연결, 세션이 함께 사라진다. 문서는 전체 삭제를 일반적인 해결 수단으로 쓰지 말라고 경고한다.

### harness 연결과 전환

연결은 명령 하나로 끝난다. `magnitude connections add <harness-id> --set-model <model-id> --install-skill`은 설치된 모델을 그 harness에 게시하고, 선택한 모델을 설정에 반영하며, 번들 스킬을 설치하거나 갱신한다.

| harness | ID | 모델이 준비된 뒤 전환 방법 |
|---|---|---|
| Magnitude | `magnitude` | 로드된 모델이 자동으로 선택된다 |
| Pi | `pi` | `/model` 또는 Ctrl+L로 현재 세션에서 전환 |
| OpenCode | `opencode` | Ctrl+C로 종료한 뒤 출력된 실행 명령으로 재시작 |
| Hermes | `hermes` | 종료 후 출력된 명령으로 재시작 |
| OpenClaw | `openclaw` | 종료 후 재시작. 전용 Magnitude 에이전트 세션이 오래된 모델 설정을 피한다 |
| Codex | `codex` | 종료 후 출력된 명령으로 재시작 |
| Claude Code | `claude-code` | 종료 후 출력된 명령으로 재시작 |
| Oh My Pi | `oh-my-pi` | 종료 후 출력된 명령으로 재시작 |
| Cline | `cline` | 종료 후 출력된 명령으로 재시작 |

Codex와 Claude Code는 연결이 설치되어 있는 동안 Magnitude의 로컬 게이트웨이를 계속 경유한다. 따라서 호스팅 모델로 돌아가더라도 백그라운드 서비스가 실행 중이어야 하며, 설정 과정에서 로그인 시 자동 시작하도록 서비스를 등록한다. 연결을 끊으려면 `magnitude connections remove codex`처럼 제거한 뒤 harness를 재시작한다.

### 자체 harness

Magnitude harness는 로컬 모델의 제약을 전제로 만들어졌다. 다섯 가지 설계 항목이 모두 컨텍스트가 작고 tool call이 불안정한 모델을 겨냥한다.

- 관련 없는 이력을 쌓지 않아 작은 컨텍스트를 낭비하지 않는다.
- 로컬 모델은 compaction이 더 자주 필요하므로 대기 없이 백그라운드에서 수행한다.
- tool call을 검증하고 모델이 틀렸을 때 복구 방법을 알려 준다.
- 반복되거나 폭주하는 도구 실행을 차단해 모델이 같은 자리에 갇히지 않게 한다.
- 과도한 reasoning을 잘라 작업으로 되돌린다.

프로젝트 작업 기능은 일반적인 코딩 harness와 유사하다. `@`로 파일과 디렉토리를 언급하고, `/bash`나 `!` 접두로 셸 명령을 실행하며, `/init`으로 프로젝트 규약을 담은 `AGENTS.md`를 생성한다. 대화는 자동 저장되어 `/resume`이나 Ctrl+R로 이어갈 수 있고, 컨텍스트 한계에 가까워지면 이전 작업을 요약으로 압축한 뒤 세션을 계속한다.

스킬은 `.claude/skills`, `.agents/skills`, `.magnitude/skills` 세 위치를 프로젝트와 홈 디렉토리에서 각각 읽고, 이름이 겹치면 프로젝트 스킬이 우선한다. `EXA_API_KEY`를 설정하면 Exa 기반 웹 검색이 활성화된다.

### 카탈로그 밖 모델과 원격 엔드포인트

카탈로그에 없는 모델도 쓸 수 있다. Hugging Face Hub 캐시에 완전한 GGUF로 존재하면 discovery가 찾아낸다. 캐시 위치는 `HF_HUB_CACHE`, `HUGGINGFACE_HUB_CACHE`, `HF_HOME`, `XDG_CACHE_HOME` 순으로 확인하고 없으면 `~/.cache/huggingface/hub`를 사용한다. 다운로드가 끝난 뒤 Magnitude를 재시작해야 목록이 갱신된다.

원격 모델은 `~/.magnitude/config.json`의 `providers`에 OpenAI 호환 Chat Completions 엔드포인트를 선언해 추가한다. 유효한 변경은 자동 반영되고 설정한 모델이 일반 모델 선택 목록에 나타난다. 작성 규칙은 네 가지다.

- `baseUrl`에는 API 루트만 적고 `/chat/completions`를 붙이지 않는다.
- `models`의 키는 엔드포인트가 받는 정확한 모델 ID를 쓴다.
- 모델의 실제 context와 출력 한도를 선언한다.
- 자격 증명은 파일에 저장하지 않고 환경 변수로 참조한다.

선택 중이던 엔드포인트나 모델을 제거하면 그 모델 자리가 비워지고 대체 모델이 자동으로 선택되지는 않는다. 같은 키를 복원하면 모델은 다시 사용 가능해지지만 선택은 복원되지 않는다.

### 엔진 구현과 네이티브 고정

추론 엔진 ICN(Inference Control Node)은 Rust로 작성해 llama.cpp 위에 올렸고 Magnitude와 함께 설치, 관리된다. 별도의 추론 런타임을 사용자가 설정할 일이 없다는 뜻이다. crate는 역할별로 나뉘어 있다.

| crate | 역할 |
|---|---|
| `icn-contracts` | 전송 방식과 backend에 중립인 계약 |
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

네이티브 의존성은 두 단계로 고정된다. `native-pin.toml`이 `llama-cpp-rs` 포크의 커밋과 그 커밋이 품고 있는 llama.cpp 리비전을 각각 기록하고, 바인딩 소스는 저장소 안에 체크아웃해 상대 경로로 소비한다. 바인딩을 수정할 때는 포크에 먼저 커밋과 푸시를 하고 그다음 Magnitude 쪽 포인터를 갱신해야 한다. 순서를 지키지 않으면 다른 체크아웃과 CI가 해당 커밋을 가져오지 못한다.

개발 편의를 위해 모델 파일 없이 뜨는 결정적 fake backend를 제공한다. 실제 GGUF로 실행할 때는 모델 경로와 별칭, bind 주소를 넘기고, Apple Silicon에서는 고정된 바인딩이 macOS Metal backend를 활성화한다.

### 검증 체계

추론 검증은 세 계층으로 분리되어 있다.

1. **correctness parity**: 네이티브와 ICN의 가장 작은 관찰 단위 연산을 비교한다. 출력, 실효 설정, 상태 전이가 대상이다.
2. **performance parity**: 양쪽이 동등한 작업을 수행했음을 먼저 증명한 뒤에만 같은 연산의 시간을 잰다.
3. **composite benchmarking**: ICN과 고정된 `llama-server` 엔드포인트에 통제된 워크로드를 보내 스케줄링, 동시성, prefix 재사용, prefill과 decode 혼합, 지연, 처리량, 공정성, 메모리, 실패를 측정한다.

앞의 두 계층이 실패 원인을 특정하고, 세 번째 계층이 엔진 전체가 경쟁력 있는지를 판정한다. parity 실행은 생성된 chat 응답이나 HTTP 교환을 기본 증거로 삼지 않는다. 엄격 비교는 동일한 모델 바이트, template, 설정, 샘플링, 토큰 작업을 전제로 하며, 응답이나 작업량이 어긋나면 그것은 correctness 결과이고 측정된 시간은 무효가 된다.

## 결과

공개된 정량 성능 수치는 없다. 저장소는 parity와 composite benchmark 도구를 갖췄지만 결과 자체는 문서에 싣지 않았다. 대신 사용자가 추천 화면을 해석할 수 있도록 두 가지 기준점을 제공한다.

첫째는 Intelligence 점수의 눈금이다. CLI 문서는 Artificial Analysis Intelligence Index v4.1.1의 2026년 9월 1일 스냅샷을 함께 싣는다.

| 참조 모델 | 평가 구성 | 점수 |
|---|---|---:|
| Claude Opus 5 | adaptive reasoning, max effort | 63 |
| Claude Fable 5 | adaptive reasoning, max effort, Opus 4.8 fallback | 62 |
| GPT-5.6 Sol | max effort | 61 |
| GPT-5.6 Terra | max effort | 57 |
| GPT-5.6 Luna | max effort | 52 |

이 표의 용도는 제한적이다. 로컬 모델의 점수가 52 근처면 GPT-5.6 Luna와 같은 점수 영역이고 61 근처면 GPT-5.6 Sol 부근이라는 정도의 눈금으로만 쓰라고 문서가 명시한다. 두 모델이 같은 방식으로 동작한다는 뜻이 아니며, 비교는 같은 index 버전과 비슷한 reasoning 설정 사이에서만 유효하다. Magnitude는 추천 시점에 네트워크로 점수를 갱신하지 않고 검토한 점수를 카탈로그와 함께 배포하며, 직접 측정한 점수가 없으면 저자 추정치임을 표시한다.

둘째는 속도 표기다. 추천 화면은 `~36-48 tok/s` 같은 범위를 보여 주는데, 이는 하드웨어를 근거로 한 예측이지 내려받은 모델을 실제로 측정한 결과가 아니다. 실제 속도는 프롬프트 길이, 동시 작업, 가용 메모리, 모델 리비전에 따라 달라진다.

채택 지표로는 star 3,437개와 fork 247개가 확인된다(2026년 9월 6일 GitHub API 조회). 저장소가 2026년 6월 12일에 만들어졌으므로 공개 3개월이 되지 않은 시점의 수치다.

## 한계

- **성능 근거가 공개되지 않았다.** ICN이 원본 `llama-server` 대비 어느 수준인지는 사용자가 저장소의 benchmark 도구를 직접 실행해야 확인할 수 있다.
- **표시 지표의 해석 부담이 크다.** Speed는 신뢰구간이 아닌 예측 범위이고, Intelligence는 정답률이 아닌 index 점수이며 양자화 변형끼리 점수를 공유한다. 로컬 아티팩트의 품질 손실은 Accuracy가 따로 표현하므로 세 지표를 함께 읽어야 한다.
- **플랫폼이 제한된다.** macOS와 Linux만 지원하고 Windows는 WSL을 거쳐야 한다.
- **백그라운드 서비스에 의존한다.** Codex와 Claude Code 연결은 서비스가 실행 중이어야 유지되며, 서비스가 멈추면 호스팅 모델 사용까지 영향을 받는다.
- **메모리 압박 시 요청이 실패한다.** 가용 메모리가 위험해지면 모델이 중단된다. 기기 안정성을 지키는 대신 그 요청은 실패하고 다음 요청에서 다시 로드된다.
- **카탈로그 밖 구성은 가속을 받지 못한다.** 검토된 호환 방식이 없으면 speculative decoding 없이 실행된다. 임의의 draft 모델을 결합하지 않는다는 정책의 결과다.
- **네이티브 고정에 절차적 부담이 있다.** llama.cpp를 올리려면 바인딩 포크의 중첩 커밋 포인터를 갱신하고 그 포인터를 다시 커밋해야 하며, 푸시 순서를 어기면 다른 체크아웃과 CI가 빌드하지 못한다.
- **문서의 주 독자가 에이전트다.** 상세 문서 상당수가 사람이 읽는 튜토리얼이 아니라 에이전트가 읽고 실행하는 지시문 형태로 쓰여 있어, CLI를 직접 다루려는 사용자에게는 안내가 얇게 느껴질 수 있다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| ICN (Inference Control Node) | Rust와 llama.cpp로 구현한 Magnitude의 추론 실행 노드 |
| discovery | 기기의 Hugging Face 캐시를 읽기 전용으로 훑어 사용 가능한 GGUF 모델을 찾는 준비 단계 |
| assessment | 카탈로그와 discovery 결과를 현재 하드웨어에 대해 평가해 호환성, 메모리 적합, 서빙 구성, 가속, 예상 속도를 판정하는 단계 |
| residency | 설치된 모델이 지금 메모리에 올라가 있는지를 나타내는 상태 |
| harness connection | 외부 harness의 설정과 스킬을 갱신해 로컬 모델을 쓰게 만드는 연결 단위 |
| DSpark | DFlash의 병렬 블록 제안에 준자기회귀 head와 confidence head를 더한 speculative decoding 방식 |

## 관련 페이지

- [[agents/bai-2026-how-do-ai-agents-spend]]: agentic coding의 토큰 소비와 비용 구조를 실측한 연구. Magnitude가 없애려는 비용 항목의 규모를 보여준다.
- [[agents/yongkyun-2026-cutting-llm-token-costs-with]]: 토큰 비용을 컨텍스트 압축으로 줄이는 접근. 모델 실행 위치를 바꾸는 Magnitude와 대비된다.
- [[agents/stablyai-orca]]: 여러 CLI 에이전트를 worktree 단위로 오케스트레이션하는 데스크톱 앱. harness 위쪽 계층을 다룬다.
- [[agents/ai-boost-awesome-harness-engineering]]: harness engineering 자료 모음. harness 연결 개념의 배경이 된다.
- [[agents/lee-hoyeon-2026-harness-engineering]]: harness 개념을 단계별로 정리한 한국어 강의 자료.
