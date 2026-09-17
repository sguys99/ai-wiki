---
title: "Tether (FastCrest/tether, GitHub repo)"
type: repo
year: 2026
category: physical-ai
source: fastcrest-tether.md
raw_path: raw/repos/fastcrest-tether.md
raw_filename: "fastcrest-tether.md"
source_collection: external
org: "FastCrest"
repo: "tether"
url: "https://github.com/FastCrest/tether"
license: "BSL 1.1 (Business Source License, LICENSE 파일 기준. 비경쟁 용도 무료, 4년 후 Apache-2.0 자동 전환)"
tags: [physical-ai, vla, edge-inference, safety]
---

## 요약

Tether는 학습이 끝난 VLA policy를 실제 로봇에 올리기까지의 구간만 담당하는 Python CLI다. 모델을 ONNX로 변환해 서빙하고, 그 과정에서 모은 증거를 근거로 배포 가부를 판정한다.

이 저장소가 스스로 규정하는 질문은 하나다. 이 policy를 실제 운영으로 넘겨도 안전한가. CLI에 들어 있는 나머지 기능은 모두 그 판정에 들어갈 증거를 모으는 장치로 설명된다. 최종 출력은 성능 그래프가 아니라 PROMOTE, HOLD, ROLLBACK 세 값 중 하나다.

기술적으로 가장 무게가 실린 주장은 변환 정확도다. Tether의 monolithic ONNX export는 SmolVLA, pi0, pi0.5, GR00T N1.6 네 계열에서 PyTorch 원본과 코사인 유사도 +1.000000으로 일치한다. 첫 action의 절대 오차는 모두 1e-06 이하다. 변환 과정에서 모델이 미묘하게 달라지는 문제를 수치로 닫아두고, 그 위에 배포 판정을 쌓는 구조다.

같은 회사의 제품 라인은 [[physical-ai/fastcrest-2026-cupel-and-tether-studio]]에 정리되어 있다. Tether Studio가 이 CLI의 시각 표면이다.

## 배경

VLA 연구는 대부분 학습 쪽에 집중되어 있다. 새 아키텍처와 새 데이터셋으로 벤치마크 성공률을 올리는 것이 논문의 목표이고, 그 결과물은 PyTorch 체크포인트다. VLA는 이미지와 언어 지시문을 받아 로봇의 action을 내놓는 모델을 말한다.

그런데 체크포인트가 있다고 로봇이 움직이는 것은 아니다. 실제 배포에는 다른 종류의 작업이 남는다. 모델을 대상 하드웨어에서 실행 가능한 형식으로 변환해야 하고, 변환 후에도 원본과 같은 출력을 내는지 확인해야 하고, 제어 주기 안에 응답이 돌아오는지 측정해야 하고, 위험한 값이 나왔을 때 잘라낼 장치가 있어야 한다. 이 작업들은 학습 프레임워크의 범위 밖이다.

Tether는 이 공백만 채운다. 저장소는 범위를 명시적으로 잘라둔다. 학습 프레임워크가 아니고(PyTorch와 JAX가 담당한다), 클라우드 추론 제공자도 아니다(vLLM과 Baseten이 담당한다). 학습이 끝난 VLA와 실제 로봇 사이의 배포 계층만 맡는다.

경쟁 우위로 내세우는 것도 그 구간의 도구 모음이다. 수치가 검증된 교차 프레임워크 ONNX 변환, 조합 가능한 안전 장치, ROS2와 Docker와 HTTP 서빙, 그리고 QA 팀이 감사할 수 있는 결정론적 변환 영수증(`VERIFICATION.md`)이다.

## 핵심 개념

**policy** 는 현재 observation을 받아 다음 action을 정하는 함수를 말한다. Tether가 배포 대상으로 삼는 것이 이 policy다.

**parity** 는 변환 전후의 모델이 같은 입력에 같은 출력을 내는 성질이다. Tether는 이를 코사인 유사도와 첫 action의 최대 절대 오차 두 값으로 측정하고, 오차가 부동소수점 표현 한계 수준이면 기계 정밀도로 판정한다.

**monolithic ONNX** 는 모델 전체를 하나의 ONNX 그래프로 묶은 변환 결과다. 여러 조각으로 나눈 분해형(decomposed)과 대비되며, 검증된 parity 수치는 모두 이 경로에서 나온다.

**action chunk** 는 한 번의 추론으로 여러 시점의 action을 한꺼번에 내놓는 묶음이다. Tether의 `/act` 응답은 50개 시점 분량의 chunk를 돌려준다.

**execution provider** 는 ONNX Runtime이 실제 연산을 맡기는 백엔드다. 같은 ONNX 그래프라도 어느 provider가 실행하느냐에 따라 속도가 크게 달라진다.

**proof packet** 은 `tether prove`가 만드는 배포 증거 묶음이다. 진단 결과, latency 통계, 파일 해시, 해시가 붙은 매니페스트가 한 디렉토리에 모인다.

## 방법

### 세 동사로 줄인 제품 표면

신규 사용자가 익혀야 할 명령은 세 개다.

```bash
tether chat
tether prove ./export --output-dir ./tether-deploy-proof
tether promote ./tether-deploy-proof --profile warehouse-safe
```

나머지 명령은 이 세 동사를 뒷받침하는 보조 장치로 분류된다.

| 분류 | 명령 |
|---|---|
| 런타임 증거 | `go`, `serve`, `doctor`, `smoke` |
| rollout 증거 | `policy diff`, `traces`, `replay`, `eval` |
| 모델 워크플로 | `models`, `validate`, `train` |
| 엔터프라이즈와 관리 | `pro`, `contribute`, `curate`, `data`, `comply` |

고급 명령과 SO-100 전용 명령(`config`, `calibrate`, `bench-game`, `status`, `inspect`)은 직접 호출할 수 있지만 첫 실행 경로에서는 빠져 있다. 구버전 명령(`export`, `bench`, `replay` 등)도 별칭으로 남아 있다.

### 대화형 진입점

`tether chat`은 플래그를 외우지 않고 목적을 문장으로 말하는 진입점이다. "prove ./export가 franka에 쓸 수 있는지 확인해줘" 같은 요청을 받으면 내부적으로 실제 CLI 도구를 골라 subprocess로 실행하고 결과를 문장으로 돌려준다.

동작 예시는 아래와 같다. 사용자가 버전과 배포 가능한 하드웨어를 묻자 `show_version`과 `list_targets` 두 도구를 실행하고, 결과를 목록으로 정리한 뒤 다음 행동을 제안한다.

모델은 `chat.fastcrest.com`에 호스팅된 프록시를 거친 GPT-5 Mini다. 무료 한도는 머신당 하루 100회이고 가입이나 API 키가 필요 없다. `FASTCREST_PROXY_URL` 환경 변수를 바꾸면 본인 키로 다른 엔드포인트를 쓸 수 있다.

### 자동 배포 경로

대화형 진입점을 쓰지 않으면 명령을 직접 호출한다.

```bash
tether models list
tether go --model smolvla-base
tether go --model smolvla-base --embodiment franka
tether go --model pi05-libero --embodiment franka --device-class a10g
```

`tether go`가 한 명령으로 처리하는 단계는 다섯 개다. 하드웨어를 자동 탐지하고(NVIDIA GPU, Jetson, CPU), 그 장치에 맞는 모델 변형을 고르고, Hugging Face에서 가중치를 내려받고, 변환하고, `/act` 엔드포인트를 띄운다. 설정 파일 편집도, 별도 변환 단계도, 수동 변형 선택도 없다. 원시 PyTorch 가중치로만 배포되는 모델은 다음에 실행할 변환 명령을 안내한다.

첫 실행에서는 모델에 따라 1GB에서 14GB의 가중치를 내려받고 이후 실행에서는 캐시를 쓴다. 첫 서빙은 10초에서 70초의 워밍업이 필요하며, 그동안 `/health`가 HTTP 503을 반환하다가 준비가 끝나면 200으로 바뀐다. 로드 밸런서가 워밍업 중인 서버를 건너뛰도록 설계된 동작이다.

### embodiment와 ActionGuard

`--embodiment`는 로봇별 정규화를 켜는 스위치다. embodiment는 policy가 제어하는 로봇 몸체의 형태와 자유도 구성을 뜻한다.

이 옵션을 생략해도 서버는 정상적으로 뜨고 `/act`도 응답한다. 다만 돌아오는 값이 정규화되지 않은 raw action이다. 빠른 동작 확인에는 충분하지만 실제 로봇에 보낼 값은 아니다.

`--embodiment <preset>`을 지정하면 두 가지가 함께 켜진다. 로봇별 action 범위 정규화와 ActionGuard clamping이다. ActionGuard는 허용 범위를 벗어난 action 값을 잘라내는 안전 장치이고, 작동 여부가 응답의 `guard_clamped` 필드에 실린다. 기본 제공 preset은 `franka`, `so100`, `ur5`, `quadcopter` 네 가지이며 `--custom-embodiment-config`로 직접 정의할 수 있다.

### 서빙 인터페이스

서버는 HTTP `/act`를 노출한다. 요청에는 이미지와 로봇 상태, 그리고 자연어 지시문이 들어간다.

```bash
curl -X POST http://localhost:8000/act -H 'content-type: application/json' \
  -d '{"instruction":"pick up the red cup","state":[0.1,0.2,0.3,0.4,0.5,0.6]}'
```

응답 JSON은 action만 담지 않는다. 그 action이 어떻게 만들어졌는지를 함께 싣는다.

```json
{
  "actions": [[...], [...], ...],
  "latency_ms": 11.9,
  "inference_mode": "onnx_trt_fp16",
  "guard_clamped": false
}
```

| 필드 | 뜻 |
|---|---|
| `actions` | 50 x action_dim 크기의 action chunk |
| `latency_ms` | 이 요청의 실제 처리 시간 |
| `inference_mode` | 실행 경로. 엔진 플래그 없이 자동으로 정해진다 |
| `guard_clamped` | ActionGuard가 값을 잘라냈는지 여부 |

Python 클라이언트는 `ReflexClient`다. `client.episode()` 컨텍스트가 episode_id를 자동 발급하고 real-time action chunking 상태를 초기화한다. real-time action chunking은 이전 chunk가 끝나기 전에 다음 chunk를 이어 붙여 제어가 끊기지 않게 하는 기법이다.

```python
from tether.client import ReflexClient

with ReflexClient("http://localhost:8000") as client:
    with client.episode() as ep:
        result = ep.act(image=numpy_frame, state=[0.1, 0.2, ...])
        print(result["actions"])
```

워밍업 중에 나오는 503은 클라이언트가 자동으로 재시도한다. guard 위반은 예외로 던지지 않고 응답 필드로 표면화한다. 로봇 제어 루프가 예외 처리 때문에 멈추지 않도록 한 설계다.

### 인증 경계

운영 배포에서는 `/act`와 `/config`에 API 키를 요구할 수 있다.

| 항목 | 내용 |
|---|---|
| 키 주입 | `tether serve ... --api-key "$TETHER_API_KEY"` |
| 권장 헤더 | `Authorization: Bearer <key>` |
| 호환 헤더 | `X-Tether-Key: <key>` |
| Python 클라이언트 | `api_key` 인자를 주면 `X-Tether-Key`를 설정한다 |
| 무인증 유지 | `/health` |

`/health`만 인증 없이 열어두는 이유는 운영 환경 구조 때문이다. 로드 밸런서와 오케스트레이터가 자격증명 없이 준비 상태를 확인해야 하므로 준비 상태 확인 경로만 열고 추론 경로는 닫는다.

### 사전 검증

배포 전 검증은 데이터셋과 변환 결과 두 가지로 나뉜다.

```bash
tether validate dataset /path/to/lerobot_data --embodiment franka --strict
tether validate export ./p0 --model lerobot/pi0_base --threshold 1e-4
```

데이터셋 검사는 LeRobot v3.0 코퍼스에 대한 반증 가능한 항목 8개를 실행한다. 반증 가능하다는 것은 통과와 실패가 명확히 갈린다는 뜻으로, 주관적 판단이 들어가지 않는다.

변환 검사는 ONNX와 PyTorch를 왕복시켜 fixture별 최대 절대 오차와 평균 절대 오차를 내고 임계값과 비교한다. 출력은 fixture별 표와 전체 요약으로 나온다.

| 종료 코드 | 뜻 |
|---|---|
| 0 | 통과 |
| 1 | 실패. 임계값을 넘은 fixture가 하나라도 있다 |
| 2 | 오류. ONNX 누락이나 잘못된 설정 |

`--output-json`으로 CI에 넘길 수 있고, `tether validate --init-ci`는 `.github/workflows/tether-validate.yml`을 만들어준다. 변환 정확도 검사를 사람의 눈이 아니라 CI 게이트로 두겠다는 설계다.

### proof packet 구성

`tether prove ./p0`은 실제 변환 결과 디렉토리를 받아 로컬 수용 검사 패킷을 만든다. `tether deploy-proof`가 명시적 백엔드 명령으로 남아 있어 스크립트에서 계속 쓸 수 있다.

패킷에 들어가는 항목은 다음과 같다.

- doctor 진단 결과와 `/health` 응답
- 인증된 `/act` 샘플, TTFA(첫 action까지의 시간), p50과 p95와 p99, jitter
- 제어 예산 초과 횟수, API 키 경계 검사, `/metrics` 스크랩
- 선택적 trace 기록, ActionGuard 스트레스 검사
- 변환 파일 해시와 해시가 붙은 `MANIFEST.json`

새 policy나 shadow policy를 승격하기 전에는 policy diff를 패킷에 포함한다. `--policy-diff-baseline`과 `--policy-diff-candidate`(또는 `--policy-diff-shadow`)를 함께 지정하면 action 델타, latency 회귀, 형상 불일치, guard 회귀 네 항목을 게이트한다.

shadow 증거 수집은 서빙 중에 한다.

```bash
tether serve ./current --shadow-policy ./candidate --record ./traces/shadow
```

운영 policy의 action은 그대로 로봇에 나가고, 후보 policy의 action은 `shadow_result` 증거로만 기록에 덧붙는다. 실제 로봇을 위험에 노출하지 않고 후보를 같은 입력으로 평가하는 방법이다.

### 승격 판정 세 층위

판정 명령은 입력과 용도에 따라 세 층위로 나뉜다.

| 명령 | 입력 | 출력 | 종료 코드 |
|---|---|---|---|
| `tether promote <packet>` | proof packet | 운영자용 판정 | 판정 결과에 대응 |
| `tether rollout gate <trace>` | shadow trace | `policy-diff.json`, `promotion-decision.json` | 0이 PROMOTE, 1이 HOLD, 4가 ROLLBACK |
| `tether release assure <packet>` | proof packet에 realtime과 shadow 증거를 더한 것 | `release-assurance.json`과 Markdown 리포트 | 최상위 판정 PROMOTE, HOLD, ROLLBACK |

`rollout gate`는 자동화된 자체 rollout 판정에 쓴다. 종료 코드가 세 값으로 갈리므로 CI나 배포 스크립트에서 분기 조건으로 바로 쓸 수 있다.

```bash
tether rollout gate ./traces/shadow.jsonl.gz \
    --packet-dir /tmp/tether-shadow-rollout \
    --profile lab-shadow \
    --min-compared 100 \
    --wait-timeout-s 5
```

`release assure`는 운영자가 읽을 릴리스 판정에 쓴다. 리포트에는 구성 요소별 판정과 함께 risk signal이 실린다. policy action 델타, latency 회귀, stale action window, chunk 경계 델타, 속도 불연속, 그리고 아직 채우지 못한 증거 공백이 그 목록이다.

판정 기준은 코드가 아니라 profile 파일로 외부화되어 있다. `tether profiles list`로 내장 profile을 훑고, `tether profiles init warehouse-safe --output warehouse-safe.yml`로 편집 가능한 사본을 만든다.

```yaml
name: production
thresholds:
  require_auth: true
  require_record_trace: true
  require_guard: true
  control_hz: 20
  max_warm_roundtrip_p95_ms: 40
  max_missed_control_budget: 0
```

같은 패킷이라도 창고 환경과 실험실 환경에서 요구 수준이 다르므로, 임계값을 바꿔 다시 판정할 수 있게 한 구조다.

### realtime 인증서

같은 proof packet을 realtime 인증서로 바꾸면 다른 질문에 답한다. 측정된 `/act` 왕복 시간이 대상 하드웨어의 제어 루프 안에 들어가는가다. control frequency는 로봇이 1초에 몇 번 새로운 action을 갱신하는지를 뜻하고, 제어 주기는 그 역수다.

```bash
tether prove ./p0 --profile production.yml --control-hz 20 --samples 100 \
    --output-dir /tmp/tether-deploy-proof

tether bench realtime /tmp/tether-deploy-proof \
    --target agx-orin-cell-a \
    --execution-cert \
    --output-dir /tmp/tether-realtime-cert
```

인증서는 왕복 p95를 제어 주기와 비교하고 deadline 초과, `/act` 오류, 제어 예산 초과를 게이트한 뒤 `realtime-serving-cert.json`과 Markdown, 해시가 붙은 `MANIFEST.json`을 쓴다.

`--execution-cert`를 붙이면 검사 범위가 넓어진다. 패킷에 action chunk와 `action_execution` 텔레메트리가 함께 들어 있을 때만 쓸 수 있고, stale action window, chunk 경계 연속성, 경계 속도 점프, 그리고 스케줄러와 캐시와 adaptive horizon의 기여분까지 게이트한다. chunk 경계는 한 chunk가 끝나고 다음 chunk가 시작되는 지점으로, 이 자리에서 action 값이 갑자기 튀면 로봇 동작이 끊긴다.

### 런타임 wedge

추가 증거는 별도 제품이 아니라 `tether serve`의 플래그로 켠다. 저장소는 이 설계를 "증거 손잡이이지 추가 제품이 아니다"로 표현한다.

| 플래그 | 역할 |
|---|---|
| `--embodiment franka` | 로봇별 action 범위 정규화와 ActionGuard clamping |
| `--safety-config ./robot_limits.json` | URDF에서 뽑은 관절 한계 clamping과 EU AI Act 감사 로그 |
| `--adaptive-steps` | 속도가 수렴하면 denoising 루프를 조기 종료 |
| `--deadline-ms 33` | 예산을 넘기면 마지막 정상 action을 반환 |
| `--cloud-fallback http://cloud:8000` | edge 우선에 클라우드 백업 |
| `--action-similarity-threshold 0.05` | 연속한 chunk가 L2로 비슷하면 expert 계산을 건너뛴다 |
| `--max-similar-skips 3` | 연속 캐시 반환 횟수 상한 |
| `--inject-latency-ms 0` | 합성 지연 주입 |
| `--record /tmp/traces` | 요청과 응답을 JSONL로 기록 |
| `--max-consecutive-crashes 5` | 회로 차단기 |
| `--fast-kernels` | Triton 커널 경로 |
| `--transport zmq` | 저지연 로봇 통신용 ZMQ 전송 |
| `--max-batch N` | HTTP 계층 연속 배칭 |

세 플래그는 서로 짝을 이룬다. `--action-similarity-threshold`는 FlashVLA 방식으로 연속한 action chunk가 충분히 비슷하면 expert 계산을 건너뛰어 속도를 얻고, `--max-similar-skips`는 그 건너뛰기가 연속으로 몇 번까지 허용되는지를 제한한다. 캐시된 값을 계속 반환하면 실제 상황과 어긋나는 드리프트가 생기므로 상한이 필요하다.

`--deadline-ms`와 `--max-consecutive-crashes`는 실패 상황을 다룬다. 전자는 예산 초과 시 마지막 정상 action을 반환해 제어 루프가 비지 않게 하고, 후자는 연속 크래시가 상한에 닿으면 503과 `Retry-After: 60`을 반환해 호출 측이 물러서게 한다.

모든 응답은 켜진 wedge의 텔레메트리를 함께 싣는다(`guard_clamped`, `guard_violations`, `injected_latency_ms`, `inference_mode`, `safety_violations`, `deadline_exceeded`, `adaptive_enabled`). action 유사도 경로에서 건너뛴 횟수는 `/metrics`의 `reflex_action_skip_total` Prometheus 카운터에 쌓인다. 켠 기능이 실제로 무엇을 했는지가 proof packet에 그대로 남는 구조다.

### trace archive

`--record`로 모은 trace는 `tether traces`로 검색하고 집계한다. trace는 서버가 처리한 요청과 응답을 시간 순으로 기록한 자료를 말한다.

```bash
tether traces query --dir /tmp/traces --task pick-cube --status failed --since 7d --output failures.json
tether traces summary --dir /tmp/traces --since 24h --by task
tether traces summary --dir /tmp/traces --by model --since 7d --output v1_vs_v2.csv
```

필터 항목은 `--since`(`7d`, `24h`, `30m`), `--task`(대소문자 무시 부분 일치), `--status`(`success`, `failed`, `any`), `--model`(`model_hash` 부분 일치), `--limit`이다. `failed`의 판정 기준은 응답에 `error` 필드가 있는지다.

`summary`는 묶음별로 성공률과 p50, p95, p99, 최대 latency를 낸다. `--by task`로 묶으면 어느 과제가 잘 안 되는지 보이고, `--by model`로 묶으면 배포된 두 모델 버전을 같은 기준으로 비교할 수 있다. 출력은 기본이 표이고 `--output FILE`의 확장자로 JSON과 CSV를 고른다.

### 배포 형태

| 형태 | 내용 |
|---|---|
| Docker x86_64 | `ghcr.io/fastcrest/tether:latest`. 기본 명령은 `tether serve /exports --host 0.0.0.0 --port 8000` |
| Docker arm64 | `ghcr.io/fastcrest/tether:latest-arm64`. 태그 push 시 QEMU 교차 빌드로 만든다 |
| ROS2 | `tether ros2-serve`. 추론 루프를 ROS2 노드로 감싼다 |

arm64 이미지에는 CUDA와 cuDNN과 TensorRT가 일부러 빠져 있다. 이 라이브러리들은 Jetson의 `/usr/local/cuda`에 있고 호스트 JetPack 버전과 ABI가 묶여 있어서, 이미지에 담으면 호스트와 어긋난다. 대신 NVIDIA 컨테이너 런타임이 호스트의 것을 컨테이너 안으로 노출한다.

ROS2 노드는 `sensor_msgs/Image`, `sensor_msgs/JointState`, `std_msgs/String` 세 토픽을 구독하고 action chunk를 `std_msgs/Float32MultiArray`로 발행한다. 발행 주기는 `--rate-hz`로 정하고 `--safety-config`는 HTTP 서빙과 같은 파일을 공유한다. rclpy는 pip로 설치되지 않으므로 apt나 robostack으로 ROS2를 먼저 설치해야 한다. 이 명령은 숨은 별칭이며 향후 `tether serve --transport ros2`로 흡수될 예정이다.

TensorRT execution provider가 붙은 `onnxruntime-gpu`(v1.20 이상)에서는 `tether serve`가 TRT FP16을 자동으로 쓰고 엔진을 `<export_dir>/.trt_cache`에 캐시한다. 첫 기동은 30초에서 90초가 걸리고 재기동은 1초에서 2초다.

### BaseVLA spine

v0.10.0에서 모델 계층이 크게 바뀌었다. 모든 VLA 계열이 6개 컴포넌트 슬롯 중 필요한 것만 선언하는 100줄 안팎의 합성 클래스가 됐다.

| 슬롯 | 역할 |
|---|---|
| `vision_backbone` | 이미지 인코딩 |
| `llm_backbone` | 언어 처리 |
| `vlm_backbone` | 이미지와 언어를 함께 처리 |
| `projector` | 모달리티 간 표현 연결 |
| `vla_head` | action 생성 |
| `text_encoder` | 지시문 인코딩 |

이 구조 덕에 새 backbone 추가가 합성 클래스 파일 하나와 registry 항목 하나로 줄었다. 예제는 `src/tether/models/vlas/{pi0,pi05,smolvla,gr00t}.py`에 있다.

리팩터 결과는 lerobot 참조 구현과 비트 단위로 대조해 검증했다. pi0이 최대 1.13e-6, pi0.5가 최대 2.74e-6, SmolVLA가 합성 입력에서 최대 0.0, GR00T N1.6이 최대 0.0이다. 이 과정에서 조용히 틀려 있던 ONNX 변환 버그 6개가 드러나 함께 고쳐졌다(PR #156). 모듈 이름이 `tether.exporters.{pi0,smolvla,gr00t}_exporter`에서 `tether.exporters.{pi0,smolvla,gr00t}`로 바뀐 것이 호환성 파괴 변경이다.

### 설치 경로

권장 경로는 부트스트랩 설치 스크립트다. 하드웨어와 Python 버전을 먼저 확인하고 플랫폼에 맞는 extras를 자동으로 고른다.

```bash
curl -fsSL https://fastcrest.com/install | sh
```

지원하지 않는 하드웨어에서는 이유를 설명하고 조기에 중단한다. 초기 4GB Jetson Nano가 그 예로, Maxwell GPU에 JetPack 4.6과 Python 3.6 조합이라 현대 ML 스택에 맞지 않는다.

수동 설치는 extras를 직접 고른다.

| 명령 | 용도 |
|---|---|
| `pip install fastcrest-tether` | 코어 |
| `pip install 'fastcrest-tether[serve,gpu,monolithic]'` | GPU 운영 경로 |
| `pip install 'fastcrest-tether[serve,onnx]'` | Mac과 CPU 런타임 |
| `pip install 'fastcrest-tether[serve,gpu-min]'` | TensorRT 없이 ORT-CUDA만 |

검증된 변환 경로에는 `[monolithic]`이 필요하고 이 extras는 `transformers==5.3.0`을 고정한다. GPU 설치에는 pip wheel이 아니라 전체 cuDNN 9 시스템 라이브러리가 필요하다. 저장소가 권하는 가장 쉬운 길은 NVIDIA 컨테이너에서 시작하는 것이다. `tether serve`는 cuDNN을 읽지 못하면 조용히 CPU로 되돌아가지 않고 명시적으로 실패한다. 성능이 5배 떨어진 상태로 운영에 들어가는 것을 막기 위한 선택이다.

## 결과

### 검증된 parity

저장소는 아래 표를 "유일하게 하중을 받는 수치"로 부른다. 공유된 시드 입력으로 PyTorch와 대조한 값이다.

| 산출물 | 기준 | 첫 action 최대 절대 오차 | 판정 |
|---|---|---|---|
| SmolVLA ONNX, num_steps=10 (운영 기본값) | `sample_actions(num_steps=10)` | 5.96e-07 | 기계 정밀도 |
| pi0 ONNX, num_steps=10 (운영 기본값) | `sample_actions(num_steps=10)` | 2.09e-07 | 기계 정밀도 |
| pi0.5 ONNX, num_steps=10 (운영 기본값) | `sample_actions(num_steps=10)` | 2.38e-07 | 기계 정밀도 |
| GR00T N1.6 ONNX, 단일 스텝 DiT | `GR00TFullStack.forward` | 8.34e-07 | 기계 정밀도 |
| GR00T N1.6 4스텝 denoising 루프 전 구간 | PyTorch 참조에 대한 Python 루프 | 4.77e-07 | 기계 정밀도 |
| GR00T N1.6 Eagle VLM ONNX (SigLIP + Qwen3 + mlp1, 1.87B) | `EagleExportStack` PyTorch | 4.25e-04 | 기계 정밀도 |
| GR00T N1.6 DiT에 실제 VLM KV 입력 | `GR00TFullStack(state, vlm_kv)` | 1.78e-05 | 기계 정밀도 |
| GR00T N1.6 두 ONNX 연쇄 전 구간 | PyTorch의 같은 연쇄 | 1.90e-05 | parity 확인 |
| SmolVLA ONNX, num_steps=1 | `sample_actions(num_steps=1)` | 1.55e-06 | 기계 정밀도 |
| pi0 ONNX, num_steps=1 | `sample_actions(num_steps=1)` | 1.43e-06 | 기계 정밀도 |

두 ONNX 연쇄 항목에는 추가 확인이 하나 붙어 있다. 입력 이미지를 바꾸면 action이 최대 절대 오차 0.21만큼 달라진다. 수치가 일치한다는 것이 모델이 입력을 무시하고 상수를 뱉는다는 뜻이 아님을 보이는 민감도 검사다. parity 검증에서 흔히 놓치는 실패 모드를 닫아둔 셈이다.

PyTorch 수준의 네이티브 경로 검사도 함께 실행한다. DecomposedRMSNorm으로 교체한 `SmolVLAPolicy`가 참조와 코사인 유사도 1.0이고, `PI0Policy.predict_action_chunk`가 원본 `sample_actions`와 비트 단위로 같다.

### flow matching과 DDPM의 변환 차이

운영 기본값이 모델마다 다른 이유는 생성 방식이 다르기 때문이다.

| 계열 | 생성 방식 | 표준 스텝 | ONNX가 담는 범위 |
|---|---|---|---|
| SmolVLA, pi0, pi0.5 | flow matching | 10회 Euler 적분 | 루프를 펼쳐서 그래프에 굽는다 |
| GR00T N1.6 | DDPM 방식 diffusion model | 4회 | 속도 한 스텝만 내보내고 서버가 루프를 감싼다 |

flow matching은 노이즈에서 목표 분포까지의 속도장을 학습해 그 장을 따라 적분하는 생성 방식이다. 적분 스텝 수가 고정되어 있으므로 루프를 펼쳐 그래프에 담을 수 있다.

변환 난이도도 갈렸다. pi0과 pi0.5를 기계 정밀도까지 끌어올리는 데는 `torch.export` 아래에서 서로 얽힌 패치 3개가 필요했다. F.pad causal mask 처리, `DynamicLayer.update` 고정, mask 조립을 위한 `past_kv.get_seq_length()` 세 가지다. 반면 GR00T의 DiT 그래프는 DynamicCache도 PaliGemma masking도 없어 `torch.onnx.export(opset=19)`로 별도 패치 없이 추적된다.

### execution provider별 latency

Modal A10G(Ampere, sm_8.6)에서 SmolVLA monolithic을 대상으로 2026-04-29에 측정했다. 워밍업 5회 뒤 20회를 측정했고 batch는 1이다.

| Provider | 평균 latency | p95 |
|---|---|---|
| `CUDAExecutionProvider` (ORT-CUDA 폴백) | 108.11 ms | 108.68 ms |
| `TensorrtExecutionProvider` (기본값) | 19.49 ms | 19.71 ms |

TensorRT 경로가 5.55배 빠르다. 108ms는 20Hz 제어 루프(주기 50ms)에 들어가지 못하지만 19.49ms는 여유 있게 들어간다. 즉 이 차이는 속도 개선에 그치지 않고 실시간 제어 가능 여부를 가른다. 이득의 원천은 TensorRT의 FP16 커널과 엔진 융합이다.

`[serve,gpu]` extras가 `tensorrt>=10`을 끌어오고 import 시점에 `LD_LIBRARY_PATH`를 자동으로 수정한다. 가속이 실제로 켜졌는지는 `tether doctor`로 확인하며 네 항목이 모두 통과해야 한다.

| 검사 항목 | 확인 대상 |
|---|---|
| TensorRT runtime | `libnvinfer.so.10` 적재 가능 |
| CUDA cuBLAS | `libcublas.so.12` 적재 가능 |
| CUDA cuDNN | `libcudnn.so.9` 적재 가능 |
| ORT-TRT EP active | TRT execution provider가 활성 목록에 포함된 세션 생성 |

하나라도 실패하면 어떤 `pip install`을 실행해야 하는지가 함께 출력된다. 가장 흔한 원인은 `[serve,gpu-min]`을 썼거나 `tensorrt`를 자동으로 끌어오지 않던 옛 릴리스를 쓰는 경우다.

가속을 원하지 않으면 `[serve,gpu-min]`으로 설치한다. Transformer 계열에서 약 5배 느려지지만 설치 용량 약 2GB를 아낀다. `LD_LIBRARY_PATH` 수정만 끄려면 `TETHER_NO_LD_LIBRARY_PATH_PATCH=1`을 지정한다.

### Triton 커널의 LIBERO 게이트

v0.11.2 릴리스 노트는 `--fast-kernels`가 정식 게이트를 통과했다고 적는다. Pi0.5의 LIBERO-10 과제 0에서 2까지 600 episode를 과제당 100회 기준으로 평가했다.

| 실행 경로 | 성공률 | 성공 횟수 |
|---|---|---|
| Triton fast kernels | 91.3% | 274/300 |
| 네이티브 ORT | 85.3% | 256/300 |

Triton 경로가 6.0%p 앞섰다. 이 결과로 세 번째 중단 조건이 발동하지 않았고 선택적 Triton 런타임이 유지됐다. 커널 최적화가 속도만 바꾸고 정확도를 떨어뜨리지 않았는지를 성공률로 확인한 절차다. v0.11.1 노트는 같은 커널의 속도를 A100에서 PyTorch 대비 2.5배, ORT 대비 약 12배로 적는다. Triton을 쓸 수 없는 환경에서는 조용히 ORT로 되돌아간다.

### 지원 VLA 모델

| 모델 | HF ID | 파라미터 | 변환 상태 |
|---|---|---|---|
| SmolVLA | `lerobot/smolvla_base` | 450M | ONNX 검증 완료 (max_diff=3.3e-06) |
| pi0 | `lerobot/pi0_base` | 3.5B | ONNX 검증 완료 (max_diff=6.0e-08) |
| pi0.5 | `lerobot/pi05_base` | 3.62B | ONNX 검증 완료 (max_diff=2.38e-07) |
| pi0.5 LIBERO-10 (FluxVLA) | `Rylinjames/pi05-libero10-finetune-v1` | 3.62B | ONNX 검증 완료. LIBERO-10 평균 97.85%. Apache-2.0 |
| GR00T N1.6 | `nvidia/GR00T-N1.6-3B` | 3.29B | ONNX 검증 완료 (max_diff=8.34e-07, 실시간 VLM 조건화 포함) |
| DreamZero WAM | `limxdynamics/FluxVLAEngine` | 약 14B | ONNX 변환 지원. LIBERO 평균 94.65% |
| OpenVLA | `openvla/openvla-7b` | 7.5B | `optimum-cli export onnx` 경로와 후처리 헬퍼 |

OpenVLA만 경로가 다른 이유는 구조 때문이다. OpenVLA는 평범한 Llama-2-7B VLM이라 복원할 action expert가 따로 없다. action expert는 VLM 뒤에 붙어 연속값 action을 생성하는 별도 모듈을 말하는데, OpenVLA에는 그 모듈이 없으므로 표준 Hugging Face 변환 경로에 맡기고 bin 값을 연속값으로 바꾸는 후처리 헬퍼(`tether.postprocess.openvla.decode_actions`)만 제공한다.

DreamZero는 NVIDIA Research의 WAM으로, Wan 2.1 DiT backbone 위에서 영상과 action을 함께 diffusion한다. 현재는 설정과 PyTorch 런타임까지 지원하고 DiT ONNX는 작업 중이다.

모델 관리 명령은 세 가지다. `tether models list`가 큐레이션된 registry를 훑고, `tether models info <id>`가 벤치마크를 보여주고, `tether models pull <id>`가 내려받는다.

### 하드웨어 대상과 메모리 적합성

| 대상 | 하드웨어 | 메모리 | 정밀도 |
|---|---|---|---|
| `orin-nano` | Jetson Orin Nano | 8 GB | fp16 |
| `orin` | Jetson Orin | 32 GB | fp16 |
| `orin-64` | Jetson Orin 64 | 64 GB | fp16 |
| `thor` | Jetson Thor | 128 GB | fp8 |
| `desktop` | RTX 또는 A100 | 40 GB | fp16 |

monolithic ONNX의 디스크 크기(FP32)는 모델마다 크게 다르다.

| 모델 | 크기 | 적합한 대상 |
|---|---|---|
| SmolVLA | 1.6 GB | Orin Nano 8GB에 여유 있게 들어간다 |
| GR00T | 4.4 GB | Orin 이상 |
| pi0 | 12.5 GB | Orin 16GB 이상이나 데스크톱 NVIDIA GPU |
| pi0.5 | 13.0 GB | pi0과 같다 |
| DreamZero | 약 28 GB | VRAM 40GB 이상인 A100이나 H100급 |

pi0을 Orin Nano에 올리지 못하는 이유는 계산이 명확하다. FP16으로 줄여도 가중치가 약 6GB이고 여기에 활성값과 운영체제가 쓰는 메모리를 더하면 8GB를 넘는다. 모델 선택이 곧 하드웨어 선택이 되는 구간이다. `tether inspect targets`로 현재 프로필을 확인한다.

### GPU 아키텍처별 지원 상태

| 아키텍처 | Compute | 상태 | 비고 |
|---|---|---|---|
| Ampere (RTX 30 시리즈, A10G, A100) | sm_8.0~8.6 | 지원 | Modal A10G와 A100, RTX 4090에서 검증 |
| Ada Lovelace (RTX 40 시리즈, L4) | sm_8.9 | 지원 | |
| Hopper (H100, H200) | sm_9.0 | 지원 | |
| Jetson Orin (Nano, NX, AGX) | sm_8.7 | 지원 | JetPack 6.x |
| Jetson Thor | sm_10.x | 미검증 | 하드웨어를 구하지 못해 검증하지 못했다 |
| Blackwell 데스크톱 (RTX 5090, B200, GB200) | sm_10.0 / 12.0 | 조건부 지원 | smoke 검증 후 운영 권장 |
| 구형 NVIDIA (Turing RTX 20, GTX 16) | sm_7.5 | 최선 노력 | CI 매트릭스에 없다 |
| Tensor Core 이전 (Maxwell Jetson Nano 4GB) | sm_5.x | 미지원 | 설치 스크립트가 감지해 중단한다 |

Blackwell 상태는 최근에 바뀌었다. 고정된 `onnxruntime-gpu>=1.25.1`이 sm_120 커널을 담으면서 초기화 시 발생하던 segfault가 해소됐다. 다만 ORT 스레딩 이슈 #27621이 열려 있어 운영 선언 전 smoke 검증을 권장한다. ORT 1.25.1 미만에서는 여전히 segfault가 나고, `tether doctor`와 `tether go`의 Blackwell 가드가 이를 감지해 업그레이드 경로를 출력한다. Jetson Thor는 데스크톱과 같은 Blackwell 실리콘이고 ORT 1.25.1 이상이 해당 커널을 담고 있어 동작할 가능성이 높지만 확인되지 않았다.

sm_100과 sm_120을 겨냥한 네이티브 TensorRT-LLM 경로는 추가 Blackwell 런타임으로 상류에서 추적 중이다.

### 다중 로봇 배칭

`tether serve --max-batch N`은 HTTP 계층에서 연속 배칭을 수행한다. `/act` 요청이 asyncio 큐에 들어가고 서버가 `--batch-timeout-ms`(기본 5ms)마다 큐를 비워 하나의 배치 ONNX 추론으로 묶는다. 로봇 여러 대가 같은 서버를 쓰는 상황을 겨냥한 기능이다.

이전에 분해형 ONNX 경로에서 측정한 값으로는 배치 크기 4에서 16 구간에서 throughput이 2.3배에서 2.9배로 늘었다. 이 수치는 지금 기본값인 monolithic 경로에서 다시 측정된 것이 아니다.

## 한계

- **latency 표가 저장소에서 빠져 있다.** 이전 TRT FP16 표가 지금은 폐기된 분해형 ONNX 경로에서 측정된 값이라 의도적으로 제외했다고 밝힌다. Jetson latency 표 자리는 HTML 주석으로 비워둔 채 `scripts/publish_jetson_latency.py`가 인증서에서 자동으로 채우게 되어 있다. 사용자는 `tether bench <export_dir> --iterations 100`으로 직접 재현해야 한다.
- **가속 측정의 범위가 좁다.** 5.55배 수치는 A10G와 SmolVLA monolithic 조합에서만 나왔다. pi0.5 분해형이나 GR00T, 그리고 Orin Nano와 T4와 H100 같은 다른 하드웨어 등급에서는 비율이 달라질 수 있다고 저장소가 직접 적는다.
- **검증되지 않은 계열이 남아 있다.** DreamZero는 설정과 PyTorch 런타임까지만 지원하고 DiT ONNX는 작업 중이다. OpenVLA는 우회 경로와 후처리 헬퍼만 있어 Tether의 ONNX 변환을 통한 수치 검증을 거치지 않았다. 즉 "네 계열 검증"이라는 주장의 범위는 여섯 계열 중 넷이다.
- **Blackwell과 Thor는 완전 검증 상태가 아니다.** Blackwell 데스크톱은 smoke 검증을 전제로 한 지원이고, Jetson Thor는 하드웨어를 구하지 못해 미검증으로 남아 있다.
- **근거 문서 일부가 공개 저장소에 없다.** 여러 번 인용되는 `reflex_context/measured_numbers.md`와 `reflex_context/03_experiments/`, `reflex_context/01_architecture/` 경로가 공개 저장소 최상위에서 확인되지 않는다. 전체 수치 원장을 외부에서 그대로 열어보기 어렵다는 뜻이다.
- **대화형 진입점이 외부 서비스에 의존한다.** `tether chat`은 FastCrest가 호스팅하는 프록시를 호출하므로 네트워크가 필요하고 무료 한도가 머신당 하루 100회다. 폐쇄망 로봇 환경에서는 쓸 수 없다.
- **라이선스가 완전한 오픈소스가 아니다.** BSL 1.1은 소스 공개형이고 경쟁 호스팅이나 임베디드 제공을 제한한다. Apache 2.0 전환까지 4년이 걸린다. 개인, 상업, 내부 용도는 무료다.
- **GPU 설치 경로가 무겁다.** pip wheel이 아니라 전체 cuDNN 9 시스템 라이브러리가 필요하고, 저장소가 권하는 가장 쉬운 길이 NVIDIA 컨테이너에서 시작하는 것이다.
- **버전 간 캐시 불일치가 남아 있다.** v0.5.3 이전 버전이 만든 변환 캐시는 `~/.cache/tether/exports/<model_id>`를 직접 지워야 한다. v0.5.4 이상은 버전 불일치를 감지해 자동 처리한다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| monolithic ONNX | 모델 전체를 하나의 ONNX 그래프로 묶은 변환 결과. 분해형과 대비되며 검증된 parity 수치가 이 경로에서 나온다 |
| parity | 변환 전후 모델이 같은 입력에 같은 출력을 내는 성질. 코사인 유사도와 첫 action의 최대 절대 오차로 측정한다 |
| proof packet | `tether prove`가 만드는 배포 증거 묶음. 진단과 latency 통계와 해시가 붙은 `MANIFEST.json`을 담는다 |
| promotion profile | 승격 판정 임계값을 담은 JSON 또는 YAML 파일. `warehouse-safe` 같은 내장 profile이 있다 |
| ActionGuard | 허용 범위를 벗어난 action 값을 잘라내는 안전 장치. 작동 여부가 응답의 `guard_clamped`에 실린다 |
| BaseVLA spine | 모든 VLA 계열을 6개 컴포넌트 슬롯의 합성으로 표현하는 공통 골격 |
| runtime wedge | `tether serve`의 플래그로 켜는 런타임 기능 단위. 별도 제품이 아니라 증거 수집 장치로 설계됐다 |
| TTFA | time to first action. 첫 action이 나오기까지의 시간 |

## 관련 페이지

- [[physical-ai/fastcrest-2026-cupel-and-tether-studio]]: 같은 회사의 제품 라인 소개. Tether Studio가 이 CLI의 시각 표면이고, 데이터 준비 쪽은 Cupel이 맡는다.
- [[physical-ai/ginwind-vla-jepa]]: VLA 코드 저장소의 다른 예. 학습과 평가에 무게가 실려 있어 배포 쪽인 Tether와 담당 구간이 갈린다.
- [[physical-ai/nvlabs-gr00t-wholebodycontrol]]: Jetson Orin용 C++와 TensorRT 배포 스택을 담은 저장소. edge 배포 경로를 직접 구현한 사례로 Tether의 범용 접근과 비교된다.
