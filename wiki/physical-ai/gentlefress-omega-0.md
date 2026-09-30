---
title: "OMEGA-0 (gentlefress/OMEGA-0, GitHub repo)"
type: repo
year: 2026
category: physical-ai
source: gentlefress-omega-0.md
raw_path: raw/repos/gentlefress-omega-0.md
raw_filename: "gentlefress-omega-0.md"
source_collection: external
org: "gentlefress"
repo: "OMEGA-0"
url: "https://github.com/gentlefress/OMEGA-0"
license: "MIT (저장소 LICENSE 파일, Copyright (c) 2026 The Omega-0 Authors). 자체 라이선스 헤더가 있는 제3자 코드와 파일은 원래 라이선스를 따른다"
tags: [physical-ai, humanoid, teleoperation, world-model]
---

## 요약

OMEGA-0 저장소는 [[physical-ai/li-2026-omega-0-a-latent-predictive]] 논문의 공식 코드다. 논문이 쓴 Unitree G1, Inspire 손, 머리 장착 ZED Mini 구성을 대상으로, teleoperation 데이터 수집과 episode 기록, 두 단계 학습, 추론 서버와 로봇 클라이언트 배치까지 실제 로봇 작업 전체를 한 저장소에 담는다. 라이선스는 MIT이며 2026년 9월 29일에 공개됐다.

공개 범위는 코드와 데이터셋까지이고 가중치는 포함되지 않는다. README의 TODO에는 학습과 추론 코드, teleoperation과 기록과 배치 안내, ω-HOME 데이터셋(Hugging Face `keycharon/omega-HOME`) 공개가 완료로, pretrained 체크포인트 공개가 미완료로 표시돼 있다. 따라서 논문 수치를 바로 재현하기보다는 같은 하드웨어에서 데이터를 모으고 학습 파이프라인을 다시 실행하려는 사용자를 대상으로 한 저장소다.

## 배경

ω-0는 지시문(instruction), 현재 카메라 이미지, robot state를 받아 whole-body action latent를 생성하는 humanoid용 WAM이다. WAM은 world-action model의 약자로, 미래 장면 예측과 action 생성을 한 모델 안에서 함께 수행하는 policy 계열이다. ω-0가 내는 latent는 NVIDIA의 저수준 컨트롤러 SONIC이 받아 관절 명령으로 바꾼다. whole-body control은 균형과 이동을 포함해 몸 전체를 함께 제어하는 문제이며, SONIC은 이 문제를 대규모 motion tracking으로 푼 컨트롤러다([[physical-ai/luo-2025-sonic-supersizing-motion-tracking]]).

그래서 이 저장소는 모델 코드만으로 끝나지 않는다. 데이터 수집 단계에서도 SONIC이 teleoperation policy로 쓰이고, 배치 단계에서도 SONIC이 저수준 제어를 맡는다. 저장소가 `thirdparty/gear_sonic_deploy/`에 SONIC 배치 백엔드를 싣고 설치 안내를 [[physical-ai/nvlabs-gr00t-wholebodycontrol]] 문서로 연결하는 이유다. README는 코드 일부가 Ψ₀와 GR00T-WholeBodyControl에서 유래했다고 밝힌다.

## 핵심 개념

**`--check`와 `--arm`.** 수집과 배치 실행기 `omega_real.run`의 안전 장치다. `--check`는 하드웨어나 소켓을 열지 않고 설정 파일과 모듈 연결만 검증하고, `--arm`을 줘야 로봇으로 명령이 나간다. 설정을 바꾼 뒤 먼저 `--check`로 확인하는 순서를 권장한다.

**planner 모드와 pose teleoperation.** 수집 시 컨트롤러는 두 모드를 오간다. planner 모드는 SONIC의 이동 계획 인터페이스이고, pose teleoperation은 조작자의 몸 자세를 로봇이 따라가는 모드다. episode 기록과 폐기는 pose 모드에서만 가능하다.

**export 디렉토리 `policy-XXXXXXXX`.** 학습이 끝나면 가중치와 메타데이터가 이 이름으로 export된다. 숫자는 완료된 optimizer 스텝 수다. 추론 서버는 이 export를 `model.artifact`로 바로 읽는다.

**`predictor_init`.** WAM fine-tuning에서 joint video-action predictor를 초기화할 체크포인트다. 논문의 Stage 2(사람 동작 pre-training) 결과가 이 자리에 들어간다고 볼 수 있지만, 그 체크포인트를 만드는 레시피는 README에 없다.

## 설치와 하드웨어

Python 환경은 uv로 만든다. `train` extra가 학습과 추론 의존성을, `deploy` extra가 로봇 런타임을 설치하고, FlashAttention은 CUDA 개발 툴킷을 갖춘 뒤 따로 빌드한다.

```bash
uv sync --locked --extra train --extra deploy --python 3.10 --inexact
source .venv/bin/activate
uv pip install flash-attn --no-build-isolation
```

하드웨어 구성 요소와 설치 요점은 아래와 같다.

| 구성 요소 | 역할 | 설치 요점 |
|---|---|---|
| Unitree G1 | 대상 humanoid | 제공 설정 파일이 이 기종을 가정한다 |
| SONIC | 저수준 whole-body 제어 | 워크스테이션이나 G1의 Orin에서 실행. TensorRT와 Docker 컨테이너로 띄우고 `deploy.sh`에 네트워크 인터페이스와 ZMQ 호스트를 준다 |
| Inspire 손 | 손 조작 | 로봇에 Inspire Hand SDK를 설치하고 헤드리스 드라이버를 실행 |
| ZED Mini | ego 카메라 | JetPack과 맞는 ZED SDK 위에서 `OrinVideoSender_jpeg`를 빌드해 실행 |
| Pico 추적 장비 | teleoperation 입력 | 워크스테이션에 XRoboToolkit Python SDK 설치 |
| exo ZED 카메라 | 3인칭 RGB와 depth 기록 (선택) | 워크스테이션에 ZED SDK와 `pyzed` 필요 |

exo 카메라를 쓰지 않으면 `collect.yaml`에서 `exocentric_camera` 모듈과 기록기의 `exo_image`, `exo_depth` 입력, 관련 레이아웃 항목을 지운다.

로봇 서비스 세 개(손 드라이버, 카메라 송신기, SONIC)는 각자 터미널에서 띄워 수집이나 배치 동안 계속 유지한다. 통신 포트 기본값은 아래와 같다.

| 항목 | 기본값 |
|---|---|
| JPEG 프레임 발행 | ZMQ 5555 (`--zmq-raw`. `--zmq`는 H.264) |
| 카메라 제어 | TCP 13579 |
| Python 명령 발행과 SONIC 텔레메트리 | TCP 5556 |
| 추론 서버 | `127.0.0.1:8014` |

수집 클라이언트와 배치 클라이언트가 둘 다 TCP 5556에 명령 발행자를 바인딩하므로 동시에 띄울 수 없다. 배치 전에 수집 클라이언트를 먼저 끈다.

## 데이터 수집

teleoperation은 사람이 로봇을 원격으로 움직여 시연을 만드는 방식이다. 수집 전 SONIC 체크아웃의 skeleton 파일과 G1 URDF, 지시문을 환경 변수로 주고 `collect.yaml`로 실행기를 띄운다. 이후 Pico 컨트롤러 조합으로 시작, 모드 전환, 기록을 제어한다.

| 조작 | 동작 |
|---|---|
| A + B + X + Y | OFF에서 시작과 보정, 동작 중이면 정지 |
| A + X | planner 모드와 pose teleoperation 전환 |
| B + Y | pose teleoperation에서 상체 고정 모드 토글 |
| 왼쪽 메뉴 길게 누름 | pose teleoperation 일시정지, 떼면 재개 |
| 왼쪽 그립 + A | 기록 시작 또는 현재 episode 종료 (pose 모드) |
| 왼쪽 그립 + B | 현재 episode 중단과 폐기 (pose 모드) |
| `q` | 소프트웨어 비상 정지 |
| Ctrl+C | Python 런타임 종료, 기본으로 정지 명령 전송 |

완료된 episode는 기본 `artifacts/robot` 아래에 저장된다. 필수 파일은 `state_action.hdf5`, `ego.mp4`, `session_meta.json` 세 개이고, exo RGB(`exo.mp4`)와 depth(`exo_depth/`)는 선택이다. depth 이미지는 HDF5에 넣지 않고 따로 저장한다. fine-tuning에 쓰려면 이 기록을 아래 학습 절의 데이터 레이아웃으로 다시 정리해야 한다.

## 학습

학습 레시피는 두 단계이며 Accelerate 기반 공용 학습 루프를 공유한다.

| 단계 | 목표 | 설정 파일 |
|---|---|---|
| Action-Token Pretraining | Qwen3-VL이 FAST whole-body 동작 토큰을 autoregressive로 예측 | `src/configs/vlm_pretrain.yaml` |
| WAM Fine-Tuning | action 예측과 미래 시각 표현 학습 | `src/configs/finetune.yaml` |

### action 토큰 pre-training

FAST tokenizer는 action chunk를 압축해 이산 토큰으로 적는 방식이다. 이 단계는 Qwen3-VL이 지시문과 이미지를 보고 whole-body 동작 토큰을 예측하도록 학습한다. 기본 설정은 75차원 SMPL action과 2,048개 코드의 FAST 어휘를 쓰고, 샘플마다 observation 프레임에서 세 프레임 뒤의 action 하나를 예측한다.

데이터는 `annotation_smpl/`의 HDF5와 `video_smpl/`의 같은 이름 mp4를 짝짓는다. HDF5에는 85열 `motion` 배열(앞 75열만 사용), `instruction`, `view`(`first`는 ego, `third`는 exo)가 있어야 한다. 정규화 JSON은 `wam_smpl` 키 아래 75원소 `q01`과 `q99`를 담는다. 출력 체크포인트의 `backbone/` 디렉토리를 다음 단계의 `VLM_PATH`로 쓴다.

### WAM fine-tuning

이 단계는 vision-language backbone과 프레임 인코더를 고정하고 predictor만 학습한다. action chunk는 30스텝, 목표는 66차원이다. 필요한 외부 자산은 여섯 개다.

| 환경 변수 | 자산 |
|---|---|
| `VLM_PATH` | Qwen 모델과 processor (앞 단계의 `backbone/` 등) |
| `T5_PATH` | T5 모델과 tokenizer |
| `VJEPA_PATH` | V-JEPA 프레임 인코더 체크포인트 |
| `WAN_PATH` | Wan2.2-TI2V-5B의 48채널 VAE (`Wan2.2_VAE.pth`) |
| `PREDICTOR_INIT_PATH` | predictor 초기화 체크포인트 |
| `DATA_ROOT` | fine-tuning 데이터 디렉토리 |

데이터는 `annotation/`의 HDF5와 `first/`의 ego 영상으로 구성한다. HDF5에는 프레임 정렬된 `latent`와 `state` 배열, `instruction`, `view`가 들어간다. 리더는 state의 마지막 여섯 채널(선가속도와 각속도)을 지우는데, 논문도 IMU의 가속도와 각속도를 쓰지 않는다.

기본 레시피는 state 조건 없이 ego 영상만 쓰고 action 정규화를 `none`으로 둔다. 정규화가 필요하면 데이터 변환의 `NormalizeFields`와 `artifact.normalization`에 같은 통계를 넣어야 추론 서버가 예측을 역정규화할 수 있다.

### 분산 학습과 재개

`torchrun`으로 분산 학습하며 전역 배치는 프로세스당 배치 × 프로세스 수 × 누적 스텝이다. 체크포인트 재개는 같은 프로세스 수, 배치, 누적 설정이 필요하다. epoch 중간의 데이터 변환까지 똑같이 재현하려면 `train.workers: 0`과 `train.exact_resume: true`가 필요한데, 제공 설정은 속도를 위해 여러 worker와 `exact_resume: false`를 쓴다.

## 배치

배치는 추론 서버와 로봇 클라이언트 두 프로세스로 나뉜다. 서버는 `serve.yaml`로 체크포인트를 읽는다. 원 형식 체크포인트는 `checkpoint`와 `external_models` 옵션으로, 이 저장소가 export한 `policy-XXXXXXXX`는 `model.artifact`로 지정한다. export가 참조하는 외부 모델 자산은 설정된 경로에 그대로 있어야 한다.

클라이언트는 `INFERENCE_ENDPOINT`와 지시문을 받아 `deploy.yaml`로 실행한다. 실행 절차는 아래 순서다.

1. `model.options.view`를 입력 카메라에 맞춰 `ego` 또는 `exo`로 둔다. 기본 설정은 스테레오 ego 이미지 왼쪽에서 640 × 360 영역을 잘라 쓴다.
2. `--check`로 설정을 검증한 뒤 `--arm`으로 실행한다.
3. Enter로 planner 모드 컨트롤러를 시작하고, 2.5초 안정화 후 준비 메시지가 나오면 Enter를 한 번 더 눌러 모델 명령을 켠다.
4. 실행 중 `p`로 모델 출력을 멈추거나 재개하고, `q`로 비상 정지, Ctrl+C로 종료한다.

## 논문과의 차이

공개 기본 설정은 논문 최종 구성과 몇 군데 다르다. 논문 수치를 재현하려면 아래 항목을 직접 맞춰야 한다.

| 항목 | 논문 | 저장소 기본 설정 |
|---|---|---|
| 학습 단계 | 3단계 (VLM, SONIC replay 기반 사람 동작 pre-training, 실제 데이터 fine-tuning) | 2단계 레시피. Stage 2에 해당하는 레시피는 없고 `predictor_init`으로 초기화 체크포인트를 받는다 |
| action chunk 길이 | H = 25 | 30스텝 |
| robot state 조건 | 사용. 제거 시 success rate가 79.1%에서 60.9%로 18.2%p 하락 | 기본 레시피는 state 조건 없음 |
| action 정규화 | 64차원 latent는 평균과 표준편차, 손 명령과 state는 min-max | `none` |
| 미래 정답 인코더 | Wan 인코더 | Wan2.2 VAE (48채널) |

특히 robot state 조건은 논문 ablation에서 가장 큰 하락을 낸 요소라, 기본 레시피 그대로 학습하면 논문 성능과 차이가 날 가능성이 있다. 저장소가 이 선택을 한 이유는 README에 적혀 있지 않다.

## 한계

- pretrained 체크포인트가 공개되지 않았다. 학습된 모델로 바로 배치해 볼 수 없다.
- 사람 동작을 SONIC replay로 robot action latent로 바꾸는 절차가 README에 없다. 논문 Stage 2를 재현하려면 이 부분을 직접 구성해야 한다.
- 제공 설정이 Unitree G1, Inspire 손, ZED Mini, Pico 조합을 가정한다. 다른 조합은 설정과 네트워크 주소를 직접 바꿔야 한다.
- 제3자 구성 요소(SONIC 배치 백엔드, 카메라 송신기)는 각자 라이선스를 따른다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| `omega_real.run` | 수집과 배치 클라이언트 실행기. `--check`로 검증, `--arm`으로 명령 전송 허용 |
| `omega.inference.run` | 체크포인트를 읽어 HTTP로 action을 내주는 추론 서버 |
| `omega.training.run` | 두 학습 단계가 공유하는 학습 진입점 |
| `gear_sonic_deploy` | Inspire 손 지원을 더한 SONIC 배치 백엔드 |
| `predictor_init` | WAM fine-tuning에서 predictor를 초기화할 체크포인트 |

## 관련 페이지

- [[physical-ai/li-2026-omega-0-a-latent-predictive]]: 이 저장소가 구현하는 ω-0 논문
- [[physical-ai/nvlabs-gr00t-wholebodycontrol]]: SONIC 공식 구현. `thirdparty/gear_sonic_deploy/`의 원천
- [[physical-ai/luo-2025-sonic-supersizing-motion-tracking]]: 저수준 컨트롤러 SONIC의 논문
- [[physical-ai/3587jjh-huro]]: 사람 영상을 로봇 학습 데이터로 바꾸는 다른 공개 파이프라인
