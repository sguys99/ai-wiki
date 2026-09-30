---
title: "OMEGA-0 (gentlefress/OMEGA-0, GitHub repo)"
type: repo
year: 2026
category: physical-ai
raw_path: raw/repos/gentlefress-omega-0.md
raw_filename: "gentlefress-omega-0.md"
source_collection: external
org: "gentlefress"
repo: "OMEGA-0"
url: "https://github.com/gentlefress/OMEGA-0"
license: "MIT (저장소 LICENSE 파일, Copyright (c) 2026 The Omega-0 Authors). 자체 라이선스 헤더가 있는 제3자 코드와 파일은 원래 라이선스를 따른다"
tags: [physical-ai, humanoid, teleoperation, world-model]
figures:
  - id: fig01
    file: assets/gentlefress-omega-0/teaser.svg
    raw: https://raw.githubusercontent.com/gentlefress/OMEGA-0/main/assets/teaser.svg
    caption: "README 상단의 ω-0 개요 이미지. 저장소 assets/teaser.svg를 in-place 참조한다"
    strategy: manual
    curated: false
---

## 한 줄 요약 (One-line Summary)

ω-0 논문의 공식 코드 저장소로, Unitree G1과 Inspire 손, ZED Mini 카메라 구성에서 teleoperation 데이터 수집, episode 기록, 추론 서버와 로봇 클라이언트 배치, 그리고 action 토큰 pre-training과 WAM fine-tuning 두 학습 단계를 공개하며, SONIC 배치 백엔드와 카메라 송신기를 `thirdparty/`에 함께 싣는다. pretrained 체크포인트는 수집 시점에 아직 공개되지 않았다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 저장소 | https://github.com/gentlefress/OMEGA-0 |
| 설명 | The offical code of ω-0: A Latent Predictive World Action Model for Concurrent Humanoid Loco-Manipulation |
| 기본 브랜치 | main (수집 시점 커밋 55ff3a951e63) |
| 라이선스 | MIT. 제3자 코드는 각자의 라이선스 유지 |
| 생성과 최종 push | 둘 다 2026년 9월 29일 (수집 시점 star 35) |
| 최상위 구성 | `.gitignore`, `LICENSE`, `README.md`, `assets/`, `pyproject.toml`, `real/`, `src/`, `thirdparty/`, `tools/`, `uv.lock` |
| 논문 | [[physical-ai/li-2026-omega-0-a-latent-predictive]] (arXiv 2608.06375) |
| 데이터셋 | ω-HOME, Hugging Face `keycharon/omega-HOME` (README TODO에 공개 완료로 표시) |
| 체크포인트 | 미공개 (TODO 미완료 항목) |
| 코드 출처 | 일부 코드가 Ψ₀와 GR00T-WholeBodyControl에서 유래한다고 README가 밝힌다 |

## 2. 주요 기여 (Key Contributions)

1. **실제 로봇 전체 경로 공개.** 데이터 수집(teleoperation과 기록), 학습, 추론 서버, 로봇 클라이언트까지 한 저장소에 담는다. 논문의 Unitree G1 설정을 그대로 대상으로 한다.
2. **SONIC 연동 백엔드 동봉.** `thirdparty/gear_sonic_deploy/`가 SONIC 배치 코드에 Inspire 손 지원을 더한 백엔드이며, 원래 README와 라이선스를 함께 보존한다.
3. **두 단계 학습 레시피.** Qwen3-VL 기반 action 토큰 pre-training과, predictor를 학습하는 WAM fine-tuning 설정 파일을 제공한다. 두 단계가 Accelerate 기반 공용 학습 루프와 체크포인트 저장, 재개 기능을 공유한다.
4. **설정 검증 모드.** 수집과 배치 실행기가 `--check`로 하드웨어나 소켓을 열지 않고 설정과 모듈 연결만 검증하고, `--arm`을 줘야 명령 전송이 켜진다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 설치

uv로 Python 3.10 환경을 만든다. `train` extra는 학습과 추론 의존성을, `deploy` extra는 Python 로봇 런타임을 설치한다. FlashAttention은 별도로 빌드하며 호환되는 CUDA 개발 툴킷이 필요하다.

```bash
uv sync --locked --extra train --extra deploy --python 3.10 --inexact
source .venv/bin/activate
uv pip install flash-attn --no-build-isolation
```

### 3.2 하드웨어 구성

| 구성 요소 | 역할 | 설치 요점 |
|---|---|---|
| Unitree G1 | 대상 humanoid | 제공 설정 파일이 이 기종을 가정한다 |
| SONIC 컨트롤러 | 저수준 whole-body 제어 | 워크스테이션이나 G1의 Orin에서 실행 가능. TensorRT와 Docker 컨테이너(`run-ros2-dev.sh`)로 띄우고 `deploy.sh`에 네트워크 인터페이스와 ZMQ 호스트를 준다 |
| Inspire 손 | 손 조작 | 로봇에 Inspire Hand SDK를 설치하고 `Headless_driver_double.py`를 실행 |
| ZED Mini | ego 카메라 | JetPack과 맞는 ZED SDK를 설치하고 `XRoboToolkit-Orin-Video-Sender`를 빌드해 `OrinVideoSender_jpeg`를 띄운다 |
| Pico 추적 장비 | teleoperation 입력 | 워크스테이션에 XRoboToolkit Python SDK(`xrobotoolkit_sdk`) 설치 |
| exo ZED 카메라 (선택) | 3인칭 RGB와 depth 기록 | 워크스테이션에 ZED SDK와 `pyzed` 필요. ego 전용이면 `collect.yaml`에서 관련 모듈과 기록 항목을 지운다 |

### 3.3 서비스와 네트워크

로봇 서비스 세 개(손 드라이버, 카메라 송신기, SONIC)를 각자 터미널에서 띄워 두고 수집이나 배치 동안 유지한다.

| 항목 | 기본값 |
|---|---|
| JPEG 프레임 발행 | ZMQ 포트 5555 (`--zmq-raw`, `--zmq`는 H.264) |
| 카메라 제어 | TCP 포트 13579 (`OPEN_CAMERA` 명령) |
| Python 명령 발행과 SONIC 텔레메트리 | `COMMAND_ENDPOINT='tcp://*:5556'` |
| 추론 서버 | `127.0.0.1:8014` |

수집 클라이언트와 배치 클라이언트가 모두 TCP 5556에 명령 발행자를 바인딩하므로 둘을 동시에 실행할 수 없다. SONIC과 Python 클라이언트가 같은 호스트면 `--zmq-host 127.0.0.1`을 쓴다.

### 3.4 데이터 수집

SONIC 체크아웃의 skeleton 파일(`human_joints_info.pkl`)과 G1 URDF(`g1_29dof_with_hand.urdf`), 지시문을 환경 변수로 준 뒤 `omega_real.run`을 `collect.yaml`로 실행한다. 컨트롤러 조작은 아래와 같다.

| 조작 | 동작 |
|---|---|
| A + B + X + Y | OFF에서 시작과 보정, 동작 중이면 정지 |
| A + X | planner 모드와 pose teleoperation 전환 |
| B + Y | pose teleoperation에서 상체 고정 모드 토글 |
| 왼쪽 메뉴 길게 누름 | pose teleoperation 일시정지, 떼면 재개 |
| 왼쪽 그립 + A (pose 모드) | 기록 시작 또는 현재 episode 종료 |
| 왼쪽 그립 + B (pose 모드) | 현재 episode 중단과 폐기 |
| `q` | 소프트웨어 비상 정지 요청 |
| Ctrl+C | Python 런타임 종료, 기본으로 정지 명령 전송 |

완료된 episode는 기본 `artifacts/robot` 아래에 `state_action.hdf5`, `ego.mp4`, `session_meta.json`으로 저장된다. exo RGB(`exo.mp4`)와 depth(`exo_depth/`)는 선택이며 depth는 HDF5와 따로 저장된다.

### 3.5 배치

추론 서버와 로봇 클라이언트를 각각 띄운다. 서버는 `serve.yaml`의 `checkpoint`와 `external_models`로 원 형식 체크포인트를 읽거나, 이 저장소 학습 코드가 만든 export(`policy-XXXXXXXX`)를 `model.artifact`로 지정한다. 클라이언트는 `INFERENCE_ENDPOINT`와 지시문을 받아 `deploy.yaml`로 실행한다.

- `model.options.view`를 `ego` 또는 `exo`로 입력 카메라에 맞춘다.
- 기본 설정은 스테레오 ego 이미지 왼쪽에서 640 × 360 영역을 잘라 쓴다.
- Enter로 planner 모드 컨트롤러를 시작하고 2.5초 안정화 후 준비 메시지가 나오면 Enter를 한 번 더 눌러 모델 명령을 켠다.
- 실행 중 `p`는 모델 출력 일시정지와 재개, `q`는 비상 정지, Ctrl+C는 종료다.

### 3.6 학습

| 단계 | 목표 | 설정 파일 |
|---|---|---|
| Action-Token Pretraining | Qwen3-VL로 FAST whole-body 동작 토큰을 autoregressive 예측 | `src/configs/vlm_pretrain.yaml` |
| WAM Fine-Tuning | action 예측과 미래 시각 표현 학습 | `src/configs/finetune.yaml` |

**VLM pre-training.** 기본 설정은 75차원 SMPL action과 2,048개 코드의 FAST 어휘를 쓰고, 샘플마다 observation 프레임에서 세 프레임 뒤의 action 하나를 예측한다. 데이터는 `annotation_smpl/`의 HDF5와 `video_smpl/`의 같은 이름 mp4로 짝짓는다. HDF5에는 85열 `motion` 배열(앞 75열 사용), `instruction`, `view`(`first` 또는 `third`)가 있어야 하고, 정규화 JSON은 `wam_smpl` 키 아래 75원소 `q01`과 `q99`를 제공해야 한다. 출력 체크포인트의 `backbone/` 디렉토리를 다음 단계의 `VLM_PATH`로 쓴다.

**WAM fine-tuning.** vision-language backbone과 프레임 인코더를 고정하고 predictor만 최적화한다. action chunk는 30스텝, 목표는 66차원이며, predictor는 `predictor_init`으로 기존 체크포인트에서 초기화한다. 필요한 자산은 아래와 같다.

| 환경 변수 | 자산 |
|---|---|
| `VLM_PATH` | Qwen 모델과 processor (pre-training의 `backbone/` export 등) |
| `T5_PATH` | T5 모델과 tokenizer |
| `VJEPA_PATH` | V-JEPA 프레임 인코더 체크포인트 |
| `WAN_PATH` | `Wan2.2-TI2V-5B/Wan2.2_VAE.pth` (48채널 Wan2.2 VAE) |
| `PREDICTOR_INIT_PATH` | predictor 초기화 체크포인트 |
| `DATA_ROOT` | fine-tuning 데이터 디렉토리 |

fine-tuning 데이터는 `annotation/`의 HDF5(프레임 정렬된 `latent`와 `state`, `instruction`, `view`)와 `first/`의 ego 영상으로 구성한다. 리더는 state의 마지막 여섯 채널(선가속도와 각속도)을 지운다. 기본 레시피는 **state 조건 없이 ego 영상만** 쓰고 action 정규화를 `none`으로 둔다. 정규화가 필요하면 데이터 변환의 `NormalizeFields`와 `artifact.normalization`에 같은 통계를 넣어야 추론이 역정규화할 수 있다. 학습이 끝나면 `artifacts/finetune/policy-XXXXXXXX/`로 가중치와 메타데이터가 export된다.

**분산 학습과 재개.** `torchrun`으로 분산 학습하며 전역 배치는 프로세스당 배치 × 프로세스 수 × 누적 스텝이다. 재개는 같은 프로세스 수와 배치 설정이 필요하고, epoch 중간의 데이터 변환까지 정확히 재현하려면 `train.workers: 0`과 `train.exact_resume: true`가 필요하다. 제공 설정은 여러 worker와 `exact_resume: false`를 쓴다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

README에는 새 실험 결과가 없다. 데모 영상으로 Pick Garbage, Retrieve From Fridge, Pick Clothes From Washing Machine, Clean Bed 네 과제를 프로젝트 페이지에 연결한다. 성능 수치는 논문 페이지를 따른다.

논문과 공개 기본 설정 사이에는 아래 차이가 있다.

| 항목 | 논문 | 저장소 기본 설정 |
|---|---|---|
| 학습 단계 | 3단계 (VLM, 사람 동작 pre-training, 실제 데이터 fine-tuning) | 2단계 레시피 (action 토큰 pre-training, WAM fine-tuning). Stage 2에 해당하는 SONIC replay 기반 pre-training 레시피는 따로 없고 `predictor_init`으로 초기화 체크포인트를 받는다 |
| action chunk 길이 | H = 25 (부록 B) | 30스텝 |
| robot state 조건 | 사용 (제거 시 success rate 18.2%p 하락) | 기본 레시피는 state 조건 없음 |
| action 정규화 | 64차원 latent는 평균과 표준편차, 손 명령과 state는 min-max (부록 A) | `none` |
| 미래 영상 정답 인코더 | Wan 인코더 | Wan2.2 VAE (48채널) |

## 5. 한계와 향후 과제 (Limitations and Future Work)

- pretrained 체크포인트가 공개되지 않아 논문 결과를 바로 재현할 수 없다.
- 제공 설정이 Unitree G1, Inspire 손, ZED Mini, Pico 추적 장비 조합을 가정한다. 다른 조합은 설정과 네트워크 주소를 직접 바꿔야 한다.
- 기본 fine-tuning 레시피가 논문의 최종 구성(state 조건, 정규화, chunk 25)과 다르다.
- 사람 동작을 SONIC replay로 robot action latent로 바꾸는 도구가 README에 절차로 나오지 않는다.
- 제3자 구성 요소(SONIC 배치 백엔드, 카메라 송신기)는 각자 라이선스를 따른다.

## 6. 관련 연구 (Related Work)

| 대상 | 관계 |
|---|---|
| [[physical-ai/li-2026-omega-0-a-latent-predictive]] | 이 저장소가 구현하는 논문 |
| [[physical-ai/nvlabs-gr00t-wholebodycontrol]] | SONIC 공식 구현. `thirdparty/gear_sonic_deploy/`의 원천이자 설치 안내의 기준 |
| [[physical-ai/luo-2025-sonic-supersizing-motion-tracking]] | 저수준 컨트롤러 SONIC의 논문 |
| Ψ₀ | 코드 일부의 출처로 README가 밝힌 저장소. 논문의 가장 강한 baseline이기도 하다 |

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| `omega_real.run` | 수집과 배치 클라이언트 실행기. `--check`로 설정 검증, `--arm`으로 명령 전송 허용 |
| `omega.inference.run` | 체크포인트를 읽어 HTTP로 action을 내주는 추론 서버 |
| `omega.training.run` | 두 학습 단계가 공유하는 Accelerate 학습 진입점 |
| `gear_sonic_deploy` | Inspire 손 지원을 더한 SONIC 배치 백엔드 |
| `predictor_init` | WAM fine-tuning에서 joint predictor를 초기화할 체크포인트 |
| `policy-XXXXXXXX` | 학습 종료 시 export되는 배치용 가중치 디렉토리. 숫자는 완료된 optimizer 스텝 수 |

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | - | README 상단의 ω-0 개요 이미지 (assets/teaser.svg) | manual | 논문 페이지의 fig01로 대체 |
