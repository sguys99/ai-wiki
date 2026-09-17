---
title: "Tether (FastCrest/tether, GitHub repo)"
type: repo
year: 2026
category: physical-ai
raw_path: raw/repos/fastcrest-tether.md
raw_filename: "fastcrest-tether.md"
source_collection: external
org: "FastCrest"
repo: "tether"
url: "https://github.com/FastCrest/tether"
license: "BSL 1.1 (Business Source License, LICENSE 파일 기준. 비경쟁 용도 무료, 4년 후 Apache-2.0 자동 전환)"
tags: [physical-ai, vla, edge-inference, safety]
figures:
  - id: fig01
    file: assets/fastcrest-tether/tether-tweet.gif
    raw: https://raw.githubusercontent.com/FastCrest/tether/main/assets/tether-tweet.gif
    caption: "README 상단의 CLI 데모 애니메이션. pip install부터 tether doctor, tether --help까지를 Modal A10G에서 실행한 화면이다"
    strategy: manual
    curated: false
---

## 한 줄 요약 (One-line Summary)

Tether는 학습이 끝난 VLA policy를 실제 로봇에 올리기까지의 구간을 담당하는 Python CLI로, PyTorch 원본과 수치가 일치하는 ONNX 그래프를 만들어 서빙하고 그 과정에서 모은 증거로 배포 가부를 PROMOTE, HOLD, ROLLBACK 중 하나로 판정한다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 저장소 | https://github.com/FastCrest/tether |
| 저장소 설명 | FastCrest Tether: the OSS edge-to-cloud AI deploy CLI. Optimize, verify, deploy across Jetson, RTX, Apple Silicon, AMD. Hybrid edge-cloud inference with parity certs. |
| 제작사 | FastCrest (공동창업자 Romir Jain, Arnav Gupta) |
| 패키지 | `fastcrest-tether` (PyPI) |
| 문서 버전 | v0.11.2 (2026-05-29 릴리스 노트 기준) |
| 라이선스 | Business Source License 1.1. 비경쟁 용도는 무료이고 4년 후 Apache 2.0으로 자동 전환된다 |
| 런타임 | Python 3.10 이상 |
| 주 언어 | Python |
| 최상위 구성 | `src/`, `tests/`, `docs/`, `examples/`, `configs/`, `scripts/`, `infra/`, `launch/`, `reference/`, `contrib/`, `dashboards/`, `Dockerfile`(및 `.arm64`, `.jetpack`), `install.sh`, `GOALS.yaml`, `CHANGELOG.md`, `THIRD_PARTY_LICENSES.md` |
| 저장소 생성 | 2026-04-13. 최근 push 2026-09-17, star 84 |
| 수집 | 2026-09-18, main 브랜치 README 전문 |
| 관련 제품 | Tether Studio(시각 워크스페이스), Cupel(로봇 데이터 준비 도구). 둘 다 [[physical-ai/fastcrest-2026-cupel-and-tether-studio]] 참고 |

README는 Tether를 "VLA robot policy를 위한 deployment confidence" 도구로 정의하고, 이 도구가 답하는 질문을 하나로 못박는다. "이 policy를 실제 운영으로 넘겨도 안전한가"다. CLI의 나머지 기능은 모두 그 판정에 들어갈 증거를 모으는 장치로 설명된다.

## 2. 주요 기여 (Key Contributions)

README가 내세우는 기여는 여섯 가지로 정리된다.

| 항목 | 내용 |
|---|---|
| 네 VLA 계열 수치 parity | monolithic ONNX export가 SmolVLA, pi0, pi0.5, GR00T N1.6에서 PyTorch 원본과 cos = +1.000000으로 일치한다. parity는 변환 전후 모델이 같은 입력에 같은 출력을 내는지를 뜻한다 |
| 세 동사로 줄인 제품 표면 | 신규 사용자가 익힐 명령은 `tether chat`, `tether prove`, `tether promote` 셋뿐이고 나머지는 보조 장치로 배치된다 |
| 기본값으로 켜지는 TensorRT 가속 | `[serve,gpu]` extras가 ONNX Runtime의 TensorRT execution provider를 기본 경로로 쓴다. A10G에서 CUDA execution provider 대비 5.55배 빠르다 |
| 증거 기반 승격 판정 | proof packet을 수집해 PROMOTE, HOLD, ROLLBACK 중 하나를 반환한다. 판정 기준은 YAML profile로 외부화되어 있다 |
| BaseVLA spine | 모든 VLA 계열을 6개 컴포넌트 슬롯을 선언하는 100줄 안팎의 합성 클래스로 통일했다. 새 backbone 추가가 합성 클래스 파일 하나와 registry 항목 하나로 줄었다 |
| edge 우선 하드웨어 범위 | Jetson Orin 계열과 데스크톱 NVIDIA GPU를 1순위 대상으로 삼고, Docker 이미지와 ROS2 노드를 함께 제공한다 |

README는 Tether의 범위를 명시적으로 잘라둔다. 학습 프레임워크가 아니고(그 역할은 PyTorch와 JAX가 맡는다) 클라우드 추론 제공자도 아니다(vLLM과 Baseten이 맡는다). 학습이 끝난 VLA와 실제 로봇 사이의 배포 계층만 담당한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 공개 워크플로 세 단계

README가 제시하는 공개 워크플로는 세 줄이다.

```bash
tether chat
tether prove ./export --output-dir ./tether-deploy-proof
tether promote ./tether-deploy-proof --profile warehouse-safe
```

`tether chat`은 실제 CLI를 subprocess로 호출하는 대화형 진입점이다. 플래그가 아니라 목적을 말하면 되고("prove ./export가 franka에 쓸 수 있는지 확인해줘"), 내부적으로 `show_version`, `list_targets` 같은 도구를 골라 실행한 뒤 결과를 문장으로 돌려준다. 모델은 `chat.fastcrest.com`에 호스팅된 프록시를 거친 GPT-5 Mini이고, 무료 한도는 머신당 하루 100회이며 가입이나 API 키가 필요 없다. `FASTCREST_PROXY_URL`을 바꾸면 본인 키를 쓸 수 있다.

`tether prove`는 실제 export 디렉토리를 받아 로컬 수용 검사 패킷을 만든다. `tether promote`는 그 패킷을 받아 운영자가 볼 판정을 낸다.

### 명시적 배포 경로

대화형 진입점을 쓰지 않으면 명령을 직접 부른다.

```bash
tether models list
tether go --model smolvla-base
tether go --model smolvla-base --embodiment franka
tether go --model pi05-libero --embodiment franka --device-class a10g
```

`tether go`는 하드웨어를 자동 탐지해(NVIDIA GPU, Jetson, CPU) 그 장치에 맞는 모델 변형을 고르고, Hugging Face에서 가중치를 내려받은 뒤 `/act` 엔드포인트를 띄운다. 설정 파일 편집, 별도 export 단계, 수동 변형 선택이 모두 생략된다.

`--embodiment`는 로봇별 정규화를 켜는 스위치다. 생략하면 서버는 정상적으로 뜨지만 `/act`가 정규화되지 않은 raw action을 돌려준다. `franka`, `so100`, `ur5`, `quadcopter` preset이 기본 포함되고 `--custom-embodiment-config`로 직접 지정할 수 있다. embodiment를 지정하면 로봇별 action 범위 정규화와 ActionGuard clamping이 함께 켜진다.

### 서빙 API와 클라이언트

서버는 HTTP `/act`를 노출하고, 응답 JSON에 action chunk와 함께 실행 정보를 싣는다.

```json
{
  "actions": [[...], [...], ...],
  "latency_ms": 11.9,
  "inference_mode": "onnx_trt_fp16",
  "guard_clamped": false
}
```

`actions`는 50 x action_dim 크기의 chunk다. action chunk는 한 번의 추론으로 여러 시점의 action을 한꺼번에 내놓는 묶음을 말한다. `inference_mode`는 엔진 플래그 없이 자동으로 결정되고, `guard_clamped`는 ActionGuard가 값을 잘라냈는지를 알려준다.

Python 클라이언트는 `ReflexClient`다. `client.episode()` 컨텍스트가 episode_id를 자동 발급하고 real-time action chunking 상태를 초기화한다. 워밍업 중에 나오는 HTTP 503은 클라이언트가 자동 재시도하고, guard 위반은 예외가 아니라 응답 필드로 표면화된다.

### 인증 경계

운영 배포에서는 `/act`와 `/config`에 API 키를 요구할 수 있다.

| 항목 | 내용 |
|---|---|
| 키 주입 | `tether serve ... --api-key "$TETHER_API_KEY"` |
| 권장 헤더 | `Authorization: Bearer <key>` |
| 호환 헤더 | `X-Tether-Key: <key>` |
| Python 클라이언트 | `api_key` 인자를 주면 `X-Tether-Key`를 설정한다 |
| 무인증 유지 | `/health`. 로드 밸런서와 오케스트레이터가 자격증명 없이 준비 상태를 확인하도록 남겨둔다 |

### 사전 검증

배포 전에 데이터셋과 export를 각각 검사한다.

```bash
tether validate dataset /path/to/lerobot_data --embodiment franka --strict
tether validate export ./p0 --model lerobot/pi0_base --threshold 1e-4
```

데이터셋 검사는 LeRobot v3.0 코퍼스에 대한 8개의 반증 가능한 항목을 실행한다. export 검사는 ONNX와 PyTorch를 왕복시켜 fixture별 `max_abs_diff`와 `mean_abs_diff`를 내고 임계값과 비교한다. 종료 코드는 0이 통과, 1이 실패(임계값을 넘은 fixture가 하나라도 있음), 2가 오류(ONNX 누락, 잘못된 설정)다. `--output-json`으로 CI에 넘길 수 있고 `tether validate --init-ci`는 `.github/workflows/tether-validate.yml`을 만들어준다.

### proof packet 구성

`tether prove ./p0`이 만드는 패킷에는 다음이 들어간다.

- doctor 진단 결과와 `/health` 응답
- 인증된 `/act` 샘플, TTFA(첫 action까지의 시간), p50과 p95와 p99, jitter
- 제어 예산 초과 횟수, API 키 경계 검사, `/metrics` 스크랩
- 선택적 trace 기록, ActionGuard 스트레스 검사
- export 파일 해시와 해시가 붙은 `MANIFEST.json`

새 policy나 shadow policy를 승격하기 전에는 `--policy-diff-baseline`과 `--policy-diff-candidate`(또는 `--policy-diff-shadow`)를 함께 줘서 policy diff를 패킷에 넣는다. 이 diff는 action 델타, latency 회귀, 형상 불일치, guard 회귀를 검사 대상으로 삼는다.

shadow 수집은 `tether serve ./current --shadow-policy ./candidate --record ./traces/shadow`로 한다. 운영 action은 그대로 나가고 후보 action은 `shadow_result` 증거로 덧붙는다.

### 승격 판정과 profile

판정 명령은 세 층위로 나뉜다.

| 명령 | 입력 | 출력과 종료 코드 |
|---|---|---|
| `tether promote <packet>` | proof packet | 운영자용 판정 |
| `tether rollout gate <trace>` | shadow trace | `policy-diff.json`과 `promotion-decision.json`. 0이 PROMOTE, 1이 HOLD, 4가 ROLLBACK |
| `tether release assure <packet>` | proof packet에 realtime과 shadow 증거를 더한 것 | `release-assurance.json`과 Markdown 리포트. 최상위 판정은 PROMOTE, HOLD, ROLLBACK |

`release assure` 리포트는 구성 요소별 판정과 함께 risk signal을 싣는다. policy action 델타, latency 회귀, stale action window, chunk 경계 델타, 속도 불연속, 그리고 남은 증거 공백이 그 목록이다.

판정 기준은 profile로 외부화된다. `tether profiles list`로 내장 profile을 훑고, `tether profiles init warehouse-safe --output warehouse-safe.yml`로 편집 가능한 파일을 뽑는다. profile은 JSON이나 YAML이고 기본 임계값을 덮어쓴다.

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

### realtime 인증서

같은 proof packet을 realtime 인증서로 바꾸면 측정된 `/act` 경로가 대상 하드웨어의 제어 루프에 맞는지를 따로 판정한다.

```bash
tether bench realtime /tmp/tether-deploy-proof \
    --target agx-orin-cell-a \
    --execution-cert \
    --output-dir /tmp/tether-realtime-cert
```

인증서는 왕복 p95를 제어 주기와 비교하고 deadline 초과, `/act` 오류, 제어 예산 초과를 게이트한 뒤 `realtime-serving-cert.json`과 Markdown, 해시가 붙은 `MANIFEST.json`을 쓴다. `--execution-cert`를 붙이면 stale action window, chunk 경계 연속성, 경계 속도 점프, 스케줄러와 캐시와 adaptive horizon의 기여분까지 게이트한다.

### 런타임 wedge

추가 증거는 별도 제품이 아니라 `tether serve`의 플래그로 켠다.

| 플래그 | 역할 |
|---|---|
| `--embodiment franka` | 로봇별 action 범위 정규화와 ActionGuard clamping |
| `--safety-config ./robot_limits.json` | URDF에서 뽑은 관절 한계 clamping과 EU AI Act 감사 로그 |
| `--adaptive-steps` | 속도가 수렴하면 denoising 루프를 조기 종료 |
| `--deadline-ms 33` | 예산을 넘기면 마지막 정상 action을 반환 |
| `--cloud-fallback http://cloud:8000` | edge 우선에 클라우드 백업 |
| `--action-similarity-threshold 0.05` | FlashVLA 방식. 연속한 chunk가 L2로 비슷하면 expert 계산을 건너뛴다 |
| `--max-similar-skips 3` | 연속 캐시 반환 횟수 상한. 드리프트 방지용 |
| `--inject-latency-ms 0` | 합성 지연 주입(B.4 A2C2 게이트 방법론) |
| `--record /tmp/traces` | 요청과 응답을 JSONL로 기록해 재생에 쓴다 |
| `--max-consecutive-crashes 5` | 회로 차단기. 작동하면 503과 `Retry-After: 60`을 반환한다 |
| `--fast-kernels` | Triton 커널 경로. 사용할 수 없으면 조용히 ORT로 되돌아간다 |
| `--transport zmq` | 저지연 로봇 통신용 ZMQ. 이미지를 JPEG로 직렬화해 msgpack으로 보낸다 |
| `--max-batch N` | HTTP 계층 연속 배칭 |

모든 응답은 켜진 wedge의 텔레메트리를 함께 싣는다(`guard_clamped`, `guard_violations`, `injected_latency_ms`, `inference_mode`, `safety_violations`, `deadline_exceeded`, `adaptive_enabled` 등). action 유사도 경로의 건너뛴 횟수는 `/metrics`의 `reflex_action_skip_total` Prometheus 카운터에 쌓인다.

### trace archive

`--record`로 모은 trace는 `tether traces`로 검색하고 집계한다.

```bash
tether traces query --dir /tmp/traces --task pick-cube --status failed --since 7d --output failures.json
tether traces summary --dir /tmp/traces --since 24h --by task
tether traces summary --dir /tmp/traces --by model --since 7d --output v1_vs_v2.csv
```

필터 항목은 `--since`(`7d`, `24h`, `30m`), `--task`(대소문자 무시 부분 일치), `--status`(`success`, `failed`, `any`. failed는 `error` 필드가 있는 경우), `--model`(`model_hash` 부분 일치), `--limit`이다. 출력은 기본 표이고 `--output FILE`의 확장자로 JSON과 CSV를 고른다. `--by model`로 묶으면 배포된 두 모델 버전을 나란히 비교할 수 있다.

### 배포 형태

| 형태 | 내용 |
|---|---|
| Docker x86_64 | `ghcr.io/fastcrest/tether:latest`. 기본 명령은 `tether serve /exports --host 0.0.0.0 --port 8000` |
| Docker arm64 | `ghcr.io/fastcrest/tether:latest-arm64`. 태그 push 시 QEMU 교차 빌드로 만든다. CUDA와 cuDNN과 TensorRT를 일부러 담지 않고 호스트 JetPack의 것을 컨테이너 런타임이 노출하게 둔다 |
| ROS2 | `tether ros2-serve`. `sensor_msgs/Image`, `sensor_msgs/JointState`, `std_msgs/String`을 구독하고 action chunk를 `std_msgs/Float32MultiArray`로 발행한다. `--rate-hz`로 주기를 정하고 `--safety-config`를 HTTP 서빙과 공유한다. rclpy는 pip로 설치되지 않으므로 apt나 robostack으로 ROS2를 먼저 깔아야 한다 |

TensorRT execution provider가 붙은 `onnxruntime-gpu`(v1.20 이상)에서는 `tether serve`가 TRT FP16을 자동으로 쓰고 엔진을 `<export_dir>/.trt_cache`에 캐시한다. 첫 기동은 30초에서 90초가 걸리고 재기동은 1초에서 2초다.

### BaseVLA spine

v0.10.0에서 모든 VLA 계열이 6개 컴포넌트 슬롯(`vision_backbone`, `llm_backbone`, `vlm_backbone`, `projector`, `vla_head`, `text_encoder`) 중 필요한 것만 선언하는 100줄 안팎의 합성 클래스로 바뀌었다. 예제는 `src/tether/models/vlas/{pi0,pi05,smolvla,gr00t}.py`에 있다.

이 리팩터는 lerobot 참조 구현과 비트 단위로 대조해 검증됐고(pi0 최대 1.13e-6, pi0.5 최대 2.74e-6, SmolVLA 합성 입력 최대 0.0, GR00T N1.6 최대 0.0), 그 과정에서 조용히 틀려 있던 ONNX export 버그 6개가 고쳐졌다(PR #156). 모듈 이름이 `tether.exporters.{pi0,smolvla,gr00t}_exporter`에서 `tether.exporters.{pi0,smolvla,gr00t}`로 바뀐 것이 호환성 파괴 변경이다.

### 설치 경로

권장 경로는 부트스트랩 설치 스크립트다. 하드웨어와 Python 버전을 먼저 확인하고 플랫폼(Mac, Jetson Orin, NVIDIA GPU, CPU)에 맞는 extras를 고른다. 지원하지 않는 하드웨어(초기 4GB Jetson Nano 등)에서는 이유를 설명하고 조기에 중단한다.

```bash
curl -fsSL https://fastcrest.com/install | sh
```

수동 설치는 extras를 직접 고른다. `fastcrest-tether`가 코어, `[serve,gpu,monolithic]`이 GPU 운영 경로, `[serve,onnx]`가 Mac과 CPU 런타임이다. cos = +1.000000 검증 경로에는 `[monolithic]`이 필요하고 이 extras는 `transformers==5.3.0`을 고정한다. GPU 설치에는 pip wheel이 아니라 전체 cuDNN 9 시스템 라이브러리가 필요하며, README는 NVIDIA 컨테이너에서 시작하는 것을 가장 쉬운 경로로 제시한다. `tether serve`는 cuDNN을 못 읽으면 조용히 CPU로 되돌아가지 않고 큰 소리로 실패한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 검증된 parity

README는 이 표를 "유일하게 하중을 받는 수치"로 부른다. 공유된 시드 입력으로 PyTorch와 대조한 값이다.

| 산출물 | 기준 | 첫 action max_abs | 판정 |
|---|---|---|---|
| SmolVLA ONNX, num_steps=10 (운영 기본값) | `sample_actions(num_steps=10)` | 5.96e-07 | 기계 정밀도 |
| pi0 ONNX, num_steps=10 (운영 기본값) | `sample_actions(num_steps=10)` | 2.09e-07 | 기계 정밀도 |
| pi0.5 ONNX, num_steps=10 (운영 기본값) | `sample_actions(num_steps=10)` | 2.38e-07 | 기계 정밀도 |
| GR00T N1.6 ONNX, 단일 스텝 DiT (DDPM, 루프 외부) | `GR00TFullStack.forward` | 8.34e-07 | 기계 정밀도 |
| GR00T N1.6 4스텝 denoising 루프 전 구간 | PyTorch 참조에 대한 Python 루프 | 4.77e-07 | 기계 정밀도 |
| GR00T N1.6 Eagle VLM ONNX (SigLIP + Qwen3 + mlp1, 1.87B) | `EagleExportStack` PyTorch | 4.25e-04 | 기계 정밀도 |
| GR00T N1.6 DiT에 실제 VLM KV 입력 (5입력 `expert_stack_with_vlm.onnx`) | `GR00TFullStack(state, vlm_kv)` | 1.78e-05 | 기계 정밀도 |
| GR00T N1.6 두 ONNX 연쇄 전 구간 (Eagle에서 DiT로) | PyTorch의 같은 연쇄 | 1.90e-05 | parity 확인. 입력 이미지를 바꾸면 action이 max_abs 0.21만큼 달라지는 민감도까지 확인 |
| SmolVLA ONNX, num_steps=1 | `sample_actions(num_steps=1)` | 1.55e-06 | 기계 정밀도 |
| pi0 ONNX, num_steps=1 | `sample_actions(num_steps=1)` | 1.43e-06 | 기계 정밀도 |

운영 기본값의 근거는 모델 계열마다 다르다. flow matching 계열(SmolVLA, pi0, pi0.5)은 속도장을 10번의 Euler 스텝으로 적분하는 것이 표준이라 ONNX가 그 루프를 펼쳐서 굽는다. GR00T는 DDPM 방식 diffusion model이고 표준 스텝이 4회라, ONNX는 속도 한 스텝만 내보내고 `tether serve`가 루프를 감싼다.

pi0와 pi0.5를 이 수준까지 끌어올리는 데는 `torch.export` 아래에서 서로 얽힌 패치 3개가 필요했다(F.pad causal mask, 고정된 `DynamicLayer.update`, mask 조립을 위한 `past_kv.get_seq_length()`). GR00T의 DiT 그래프는 DynamicCache도 PaliGemma masking도 없어 `torch.onnx.export(opset=19)`로 그냥 추적된다.

PyTorch 수준의 네이티브 경로 검사도 함께 실행한다. DecomposedRMSNorm으로 바꾼 `SmolVLAPolicy`가 참조와 cos = 1.0이고, `PI0Policy.predict_action_chunk`가 원본 `sample_actions`와 비트 단위로 같다.

### 실행 provider별 latency

Modal A10G(Ampere, sm_8.6)에서 SmolVLA monolithic을 대상으로 2026-04-29에 측정했다. 워밍업 5회 뒤 20회를 측정했고 batch는 1이다.

| Provider | 평균 latency | p95 |
|---|---|---|
| `CUDAExecutionProvider` (ORT-CUDA 폴백) | 108.11 ms | 108.68 ms |
| `TensorrtExecutionProvider` (기본값) | 19.49 ms | 19.71 ms |

5.55배 차이이고, 이득의 원천은 TensorRT의 FP16 커널과 엔진 융합이다. `[serve,gpu]` extras가 `tensorrt>=10`을 끌어오고 import 시점에 `LD_LIBRARY_PATH`를 자동으로 고친다.

가속이 실제로 켜졌는지는 `tether doctor`로 확인한다. `TensorRT runtime (libnvinfer.so.10)`, `CUDA cuBLAS (libcublas.so.12)`, `CUDA cuDNN (libcudnn.so.9)`, `ORT-TRT EP active` 네 항목이 모두 통과해야 한다. 하나라도 실패하면 어떤 `pip install`을 돌려야 하는지가 함께 출력된다. 가장 흔한 원인은 `[serve,gpu-min]`을 썼거나 `tensorrt`를 자동으로 끌어오지 않던 옛 릴리스를 쓰는 경우다.

가속을 원하지 않으면 `[serve,gpu-min]`으로 설치한다. ORT-CUDA만 쓰고 Transformer 계열에서 약 5배 느리지만 설치 용량 약 2GB를 아낀다. `LD_LIBRARY_PATH` 패치만 끄려면 `TETHER_NO_LD_LIBRARY_PATH_PATCH=1`을 준다.

### Triton 커널의 LIBERO 게이트 통과

v0.11.2 릴리스 노트는 `--fast-kernels`가 정식 게이트를 통과했다고 적는다. Pi0.5의 LIBERO-10 과제 0에서 2까지 600 episode를 과제당 100회 기준으로 돌린 결과, Triton 커널이 91.3%(274/300), 네이티브 ORT가 85.3%(256/300)였다. Triton 경로가 6.0%p 앞섰기 때문에 세 번째 중단 조건이 발동하지 않았고 선택적 Triton 런타임이 유지됐다. v0.11.1 노트는 같은 커널의 속도를 A100에서 PyTorch 대비 2.5배, ORT 대비 약 12배로 적는다.

### 지원 VLA 모델

| 모델 | HF ID | 파라미터 | export 상태 |
|---|---|---|---|
| SmolVLA | `lerobot/smolvla_base` | 450M | ONNX 검증 완료 (max_diff=3.3e-06) |
| pi0 | `lerobot/pi0_base` | 3.5B | ONNX 검증 완료 (max_diff=6.0e-08) |
| pi0.5 | `lerobot/pi05_base` | 3.62B | ONNX 검증 완료 (max_diff=2.38e-07) |
| pi0.5 LIBERO-10 (FluxVLA) | `Rylinjames/pi05-libero10-finetune-v1` | 3.62B | ONNX 검증 완료. LIBERO-10 평균 97.85%. Apache-2.0 |
| GR00T N1.6 | `nvidia/GR00T-N1.6-3B` | 3.29B | ONNX 검증 완료 (max_diff=8.34e-07, 실시간 VLM 조건화 포함) |
| DreamZero WAM | `limxdynamics/FluxVLAEngine` | 약 14B | ONNX export 지원. 영상과 action을 함께 diffusion한다. LIBERO 평균 94.65% |
| OpenVLA | `openvla/openvla-7b` | 7.5B | `optimum-cli export onnx` 경로와 `tether.postprocess.openvla.decode_actions` 헬퍼 |

OpenVLA만 경로가 다른 이유는 구조 때문이다. OpenVLA는 평범한 Llama-2-7B VLM이라 복원할 action expert가 따로 없어, 표준 Hugging Face export 경로에 맡기고 bin에서 연속값으로 바꾸는 후처리 헬퍼만 제공한다.

모델 관리 명령은 세 가지다. `tether models list`가 큐레이션된 registry를 훑고, `tether models info <id>`가 벤치마크를 보여주고, `tether models pull <id>`가 내려받는다.

### 하드웨어 대상과 메모리 적합성

| 대상 | 하드웨어 | 메모리 | 정밀도 |
|---|---|---|---|
| `orin-nano` | Jetson Orin Nano | 8 GB | fp16 |
| `orin` | Jetson Orin | 32 GB | fp16 |
| `orin-64` | Jetson Orin 64 | 64 GB | fp16 |
| `thor` | Jetson Thor | 128 GB | fp8 |
| `desktop` | RTX 또는 A100 | 40 GB | fp16 |

monolithic ONNX의 디스크 크기(FP32)는 SmolVLA 1.6GB, pi0 12.5GB, pi0.5 13.0GB, GR00T 4.4GB, DreamZero 약 28GB다. SmolVLA는 Orin Nano 8GB에 여유 있게 들어가지만 pi0은 현실적으로 Orin 16GB 이상이나 데스크톱 NVIDIA GPU가 필요하다. 12.5GB짜리 monolithic ONNX는 FP16으로 줄여도(가중치 약 6GB에 활성값과 OS를 더하면) 8GB Orin Nano에 올라가지 않는다. 약 14B 파라미터의 DreamZero는 VRAM 40GB 이상인 A100이나 H100급을 요구한다.

### GPU 아키텍처별 지원 상태

| 아키텍처 | Compute | 상태 | 비고 |
|---|---|---|---|
| Ampere (RTX 30 시리즈, A10G, A100) | sm_8.0~8.6 | 지원 | Modal A10G와 A100, RTX 4090에서 검증 |
| Ada Lovelace (RTX 40 시리즈, L4) | sm_8.9 | 지원 | |
| Hopper (H100, H200) | sm_9.0 | 지원 | |
| Jetson Orin (Nano, NX, AGX) | sm_8.7 | 지원 | JetPack 6.x |
| Jetson Thor | sm_10.x | 미검증 | 데스크톱과 같은 Blackwell 실리콘이고 ORT 1.25.1 이상이 해당 커널을 담고 있다. 하드웨어가 없어서 검증하지 못했을 뿐이다 |
| Blackwell 데스크톱 (RTX 5090, RTX PRO 6000, B200, GB200) | sm_10.0 / 12.0 | 조건부 지원 | 고정된 `onnxruntime-gpu>=1.25.1`이 sm_120 커널을 담아 초기화 시 발생하던 segfault가 해소됐다. 운영 선언 전 smoke 검증을 권장한다(ORT 스레딩 이슈 #27621 미해결). ORT 1.25.1 미만에서는 여전히 segfault가 나고 `tether doctor`와 `tether go`의 Blackwell 가드가 이를 감지해 업그레이드 경로를 출력한다 |
| 구형 NVIDIA (Turing RTX 20, GTX 16) | sm_7.5 | 최선 노력 | 동작할 것으로 보지만 CI 매트릭스에 없다 |
| Tensor Core 이전 (Maxwell Jetson Nano 4GB, GTX 9 시리즈) | sm_5.x | 미지원 | NVIDIA가 JetPack 4.6(Python 3.6)에서 지원을 끝냈다. 부트스트랩 설치 스크립트가 자동 감지해 안내와 함께 중단한다 |

sm_100과 sm_120을 겨냥한 네이티브 TensorRT-LLM 경로는 추가 Blackwell 런타임으로 상류에서 추적 중이다.

### 다중 로봇 배칭

`tether serve --max-batch N`은 HTTP 계층에서 연속 배칭을 한다. `/act` 요청이 asyncio 큐에 들어가고 서버가 `--batch-timeout-ms`(기본 5ms)마다 큐를 비워 하나의 배치 ONNX 추론으로 묶는다. 이전에 분해형 ONNX 경로에서 측정한 값으로는 배치 크기 4에서 16 구간에서 throughput이 2.3배에서 2.9배로 늘었다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **latency 표가 README에서 빠져 있다.** 이전 TRT FP16 표가 지금은 폐기된 분해형 ONNX 경로에서 측정된 값이라 의도적으로 뺐다고 밝힌다. Jetson latency 표 자리는 HTML 주석으로 비워둔 채 `scripts/publish_jetson_latency.py`가 인증서에서 자동으로 채우게 되어 있다. 사용자는 `tether bench <export_dir> --iterations 100`으로 직접 재현해야 한다.
- **가속 측정의 범위가 좁다.** 5.55배 수치는 A10G와 SmolVLA monolithic 조합에서만 나왔다. pi0.5 분해형이나 GR00T, 그리고 Orin Nano와 T4와 H100 같은 다른 하드웨어 등급에서는 비율이 달라질 수 있다고 README가 직접 적는다.
- **검증되지 않은 계열이 남아 있다.** DreamZero는 설정과 PyTorch 런타임까지만 지원하고 DiT ONNX는 작업 중이다. OpenVLA는 optimum-cli 우회 경로와 후처리 헬퍼만 있어 Tether의 ONNX export를 통한 수치 검증을 거치지 않았다.
- **Blackwell과 Thor는 완전 검증 상태가 아니다.** Blackwell 데스크톱은 smoke 검증을 전제로 지원이고, Jetson Thor는 하드웨어를 구하지 못해 미검증으로 남아 있다.
- **근거 문서 일부가 공개 저장소에 없다.** README가 여러 번 인용하는 `reflex_context/measured_numbers.md`와 `reflex_context/03_experiments/`, `reflex_context/01_architecture/` 경로는 공개 저장소 최상위에서 확인되지 않는다. 즉 전체 수치 원장을 외부에서 그대로 열어보기 어렵다.
- **대화형 진입점이 외부 서비스에 의존한다.** `tether chat`은 FastCrest가 호스팅하는 프록시를 호출하므로 네트워크가 필요하고 무료 한도가 머신당 하루 100회다.
- **라이선스가 완전한 오픈소스가 아니다.** BSL 1.1은 소스 공개형이고 경쟁 호스팅이나 임베디드 제공을 제한한다. Apache 2.0 전환까지 4년이 걸린다.
- **GPU 설치 경로가 무겁다.** pip wheel이 아니라 전체 cuDNN 9 시스템 라이브러리가 필요하고, README가 권하는 가장 쉬운 길이 NVIDIA 컨테이너에서 시작하는 것이다.
- **버전 간 캐시 불일치가 남아 있다.** v0.5.3 이전 버전이 만든 export 캐시는 `~/.cache/tether/exports/<model_id>`를 직접 지워야 한다. v0.5.4 이상은 버전 불일치를 감지해 자동 처리한다.

## 6. 관련 연구 (Related Work)

Tether가 다루는 모델은 모두 외부 VLA 연구 산출물이다. flow matching 계열의 SmolVLA와 pi0과 pi0.5는 LeRobot 생태계에서 공개됐고, GR00T N1.6은 NVIDIA의 모델로 Eagle 2.5 VL backbone이 실시간 이미지와 언어 KV를 만든다. DreamZero는 NVIDIA Research의 WAM으로 Wan 2.1 DiT backbone 위에서 영상과 action을 함께 diffusion하며 FluxVLA를 통해 Apache-2.0으로 제공된다. pi0.5 LIBERO-10 체크포인트는 LimX Dynamics가 fine-tuning한 것이다.

wiki 내부에서는 다음 페이지와 이어진다.

- [[physical-ai/fastcrest-2026-cupel-and-tether-studio]]: 같은 회사의 제품 라인 소개. Tether Studio가 이 CLI의 시각 워크스페이스다.
- [[physical-ai/ginwind-vla-jepa]]: VLA 코드 저장소의 다른 예. 학습 쪽에 무게가 실려 있어 배포 쪽인 Tether와 대비된다.
- [[physical-ai/nvlabs-gr00t-wholebodycontrol]]: Jetson Orin용 C++와 TensorRT 배포 스택을 담은 저장소. edge 배포 경로를 직접 구현한 사례다.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| Tether | FastCrest가 만든 VLA 배포 CLI. 이 자료의 대상이다 |
| monolithic ONNX | 모델 전체를 하나의 ONNX 그래프로 묶은 export. 분해형(decomposed)과 대비되며 검증된 parity 수치가 이 경로에서 나온다 |
| parity | 변환 전후 모델이 같은 입력에 같은 출력을 내는 성질. Tether는 cos 유사도와 첫 action의 max_abs로 측정한다 |
| proof packet | `tether prove`가 만드는 배포 증거 묶음. 진단과 latency 통계와 해시가 붙은 `MANIFEST.json`을 담는다 |
| promotion profile | 승격 판정 임계값을 담은 JSON 또는 YAML 파일. `warehouse-safe` 같은 내장 profile이 있다 |
| ActionGuard | 로봇별 범위를 벗어난 action 값을 잘라내는 안전 장치. 작동 여부가 응답의 `guard_clamped`에 실린다 |
| BaseVLA spine | 모든 VLA 계열을 6개 컴포넌트 슬롯의 합성으로 표현하는 공통 골격 |
| runtime wedge | `tether serve`의 플래그로 켜는 런타임 기능 단위. 별도 제품이 아니라 증거 수집 장치로 설계됐다 |
| rollout gate | shadow trace를 받아 PROMOTE, HOLD, ROLLBACK을 종료 코드로 반환하는 명령 |
| realtime serving certificate | 측정된 `/act` 왕복 시간이 대상 하드웨어의 제어 주기에 맞는지를 판정한 인증서 |
| TTFA | time to first action. 첫 action이 나오기까지의 시간 |

## 8. 그림 후보 (Figure Candidates)

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | README 상단 CLI 데모 애니메이션 (pip install, tether doctor, tether --help) | manual | (확인 필요) 움직이는 터미널 녹화라 정지 도식으로서의 정보량이 낮다 |
