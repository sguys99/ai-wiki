---
title: "NVIDIA Isaac GR00T (N1.7)"
type: repo
year: 2026
category: physical-ai
source: nvidia-isaac-gr00t.md
raw_path: raw/repos/nvidia-isaac-gr00t.md
raw_filename: "nvidia-isaac-gr00t.md"
source_collection: external
org: "NVIDIA"
repo: "Isaac-GR00T"
url: "https://github.com/NVIDIA/Isaac-GR00T"
license: "Apache-2.0 (code) / NVIDIA Open Model License (model weights)"
tags: [physical-ai, vla, humanoid, edge-inference]
---

## 요약

NVIDIA Isaac GR00T는 GR00T 계열 VLA의 공식 레퍼런스 구현이자 N1.7 GA 릴리스의 배포처다. 3B 규모 베이스 체크포인트, 벤치마크별 fine-tuning 체크포인트 4종, 다운로드 없이 바로 실행되는 demo 데이터셋 6종, 학습과 추론과 서빙 CLI, ONNX와 TensorRT export, 플랫폼별 설치 스크립트가 한 저장소에 들어 있다.

GA는 General Availability의 약어로, 상용 배포와 지원, 안정성 보장이 명시된 릴리스 단계를 뜻한다. 실험용 프리뷰가 아니라 제품에 넣어도 되는 단계라는 의미이며, README는 검증된 벤치마크 전체와 pull request 기여 수용도 함께 명시한다.

이 페이지는 저장소가 제공하는 자원과 사용 절차에 집중한다. 모델 아키텍처의 내부 구성과 실험 수치는 원 논문 페이지([[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation]])와 한국어 해설([[physical-ai/jo-2026-groot-n1-vla-primer]], [[physical-ai/jo-2026-groot-n1-5-vla-primer]])이 다룬다.

## 배경

GR00T N1.7은 다양한 로봇 데이터로 학습한 cross-embodiment VLA다. 양팔 로봇, semi-humanoid, 대규모 humanoid 데이터를 섞어 학습했고, 언어와 이미지를 입력으로 받아 여러 환경에서 manipulation 과제를 수행한다. manipulation은 팔과 손으로 물체를 다루는 과제 영역을 말한다.

저장소가 안내하는 사용 흐름은 다섯 단계다. 이 순서가 문서 전체의 뼈대이기도 하다.

| 단계 | 내용 |
|---|---|
| 1. 데이터 준비 | 로봇 시연 데이터(demonstration)를 영상, state, action으로 모아 GR00T LeRobot 형식으로 변환한다. 빠른 확인용 demo 데이터셋이 포함되어 있다 |
| 2. 추론 실행 | pretrain embodiment에서 베이스 모델로 zero-shot 추론을 하거나, 벤치마크 과제는 fine-tuning된 체크포인트를 쓴다 |
| 3. fine-tuning | `launch_finetune.py`에 자기 데이터와 modality config를 주어 로봇에 맞춘다 |
| 4. 평가 | open-loop 평가로 먼저 검증한 뒤 시뮬레이션 벤치마크나 실제 기기에서 Policy API로 시험한다 |
| 5. 배포 | `Gr00tPolicy`를 로봇 컨트롤러에 연결하고 필요하면 TensorRT로 가속한다 |

성능 수치를 찾는 목적이라면 이 저장소는 맞는 자료가 아니다. N1.6 대비 성능은 comparable이라는 한 단어가 전부이고, RoboCasa, RoboCasa GR1 탁상 과제, SimplerEnv, 실제 G1 기기 평가로 범위를 넓혔다고만 적을 뿐 성공률은 각 벤치마크 하위 README로 넘긴다.

## 핵심 개념

policy는 현재 observation을 받아 다음 action을 정하는 함수를 말한다. observation은 매 timestep에 policy가 받는 센서 입력이고, action은 policy가 출력하는 제어 명령이다.

embodiment tag는 어떤 로봇의 데이터인지 가리키는 문자열 키다. 모델이 state와 action 배열을 어떻게 해석할지 정하는 modality config를 이 키가 고른다. 추론이든 fine-tuning이든 모든 명령에 `--embodiment-tag`가 필요하고 대소문자는 구분하지 않는다.

modality config는 하나로 이어붙인 state와 action 배열의 어느 구간이 `x`, `y`, `z`, `gripper`인지, 어떤 video key가 있는지를 적은 설정이다. 데이터셋 쪽에서는 `meta/modality.json` 파일이, 학습 쪽에서는 `--modality-config-path` 인자가 이 설정을 전달한다.

relative EEF action space는 action을 절대 목표 pose가 아니라 현재 pose로부터의 변화량으로 적는 표현이다. EEF는 end-effector의 약어이며, end-effector는 로봇 팔 끝에서 물체와 접촉하는 부분을 가리킨다. N1.7은 이 표현을 로봇과 사람 데이터에 공통으로 적용해 cross-embodiment 성능을 끌어올린 핵심 요인으로 지목한다.

execution horizon은 예측한 action 중 policy 호출 한 번에 실제로 실행하는 개수다. N1.7의 모델 action horizon은 40이지만 예제 명령은 대개 8이나 16을 실행한다.

## N1.6에서 달라진 점

신경망의 큰 틀은 유지된다. vision-language foundation model이 앞에 서고 연속 action을 denoise하는 diffusion transformer head가 뒤에 붙으며, action head는 여전히 flow matching 방식의 DiT다. flow matching은 noise에서 데이터로 향하는 vector field를 학습해 샘플을 만드는 생성 기법이고, DiT는 diffusion 모델의 denoising 신경망을 Transformer로 구현한 구조를 말한다.

바뀐 것은 그 안을 채우는 부품과 숫자다.

| 항목 | N1.6 | N1.7 |
|---|---|---|
| 모델 패키지 | `gr00t_n1d6` | `gr00t_n1d7` |
| VLM backbone | 자체 포함 Eagle (`nvidia/Eagle-Block2A-2B-v2`) | `nvidia/Cosmos-Reason2-2B` (Qwen3-VL 계열) |
| transformers | 4.51.3 | 4.57.3 |
| state와 action 차원 | 29 | 132 |
| model action horizon | 16 | 40 |
| DiT diffusion 층 | 32 | 16 |
| `select_layer` | 16 | 12 |
| `tune_top_llm_layers` | 4 | 0 |
| `load_bf16` | true | false |

`tune_top_llm_layers`가 4에서 0으로 내려간 변화가 눈에 띈다. N1.6은 backbone 상단 4개 층을 함께 학습했지만 N1.7은 backbone을 전부 얼린다. 즉 backbone을 통째로 교체하면서 원래 모델의 일반화 능력은 건드리지 않는 쪽을 택했다. 새 backbone은 해상도가 유연해 이미지를 padding 없이 원래 화면비 그대로 인코딩한다.

차원이 29에서 132로 네 배 넘게 커지고 action horizon이 16에서 40으로 늘어난 것은 whole-body control까지 한 인터페이스에 담으려는 조치로 읽힌다. whole-body control은 균형과 이동을 포함해 몸 전체를 함께 제어하는 문제인데, 다리와 손가락까지 포함하면 29차원으로는 부족하다.

모델 밖의 변화도 세 가지 적혀 있다.

- fine-tuning이 여러 데이터셋 경로를 받고 `ds_weights_alpha`로 mixture 비중을 조절할 수 있게 됐다.
- 전 구간 ONNX와 TensorRT export가 추가돼 데스크톱 GPU와 edge 플랫폼 사이의 배포 일관성이 맞춰졌다.
- rollout CLI 인자가 `--action-horizon`에서 `--execution-horizon`으로 개명됐다. 모델이 예측하는 action 개수와 실제로 실행하는 개수가 다르다는 점을 이름으로 드러낸 것이다.
- policy 서빙, rollout 기록, 평가, 설정 검증 경로가 보강돼 오류 진단이 쉬워졌다.

N1.7 자체의 학습 측 기여는 두 가지로 압축된다. 하나가 위에서 설명한 relative EEF action space이고, 다른 하나가 EgoScale 사람 영상 2만 시간을 로봇 시연 데이터와 나란히 pre-training에 넣은 human video pre-training이다. 상대 표현이 사람과 로봇 양쪽에서 같은 의미를 갖기 때문에 사람 영상에서 배운 manipulation 사전 지식이 로봇 제어로 바로 전이된다.

따라서 두 기여는 사실상 하나로 묶인다. 상대 표현이 먼저 있어야 사람 영상이 학습 데이터로 쓸모가 생기기 때문이다.

## 체크포인트와 데이터

### 체크포인트

| 체크포인트 | 종류 | embodiment tag | 용도 |
|---|---|---|---|
| `nvidia/GR00T-N1.7-3B` | 베이스 (3B) | pretrain tag 전체 | pretrain embodiment에서 zero-shot 추론, 또는 새 과제 fine-tuning의 출발점 |
| `nvidia/GR00T-N1.7-LIBERO` | fine-tuning | `LIBERO_PANDA` | LIBERO 벤치마크 (Franka Panda) |
| `nvidia/GR00T-N1.7-DROID` | fine-tuning | `OXE_DROID_RELATIVE_EEF_RELATIVE_JOINT` | DROID 데이터셋 |
| `nvidia/GR00T-N1.7-SimplerEnv-Bridge` | fine-tuning | `SIMPLER_ENV_WIDOWX` | SimplerEnv Bridge (WidowX) |
| `nvidia/GR00T-N1.7-SimplerEnv-Fractal` | fine-tuning | `SIMPLER_ENV_GOOGLE` | SimplerEnv Fractal (Google Robot) |

체크포인트마다 파일 구조가 달라 다루는 방법이 나뉜다. DROID나 SimplerEnv처럼 평평한 구조는 HuggingFace 모델 ID를 `--model-path`에 그대로 넘기면 되지만, LIBERO처럼 하위 폴더에 모델 파일이 들어 있으면 HuggingFace가 중첩 경로를 지원하지 않아 `hf download`로 먼저 내려받아야 한다.

### demo 데이터셋

demo 데이터셋 6종이 저장소에 함께 들어 있어 별도 다운로드 없이 바로 실행할 수 있다. episode는 과제 시작부터 종료까지의 한 실행 단위를 말한다.

| 데이터셋 | 로봇 | embodiment tag | 용도 |
|---|---|---|---|
| `demo_data/droid_sample` | DROID (3 episode) | `OXE_DROID_RELATIVE_EEF_RELATIVE_JOINT` | zero-shot 또는 fine-tuning 추론 |
| `demo_data/libero_demo` | LIBERO Panda (5 episode) | `LIBERO_PANDA` | fine-tuning 체크포인트 추론 |
| `demo_data/simplerenv_bridge_sample` | WidowX | `SIMPLER_ENV_WIDOWX` | SimplerEnv Bridge 체크포인트 추론 |
| `demo_data/simplerenv_fractal_sample` | Google Robot | `SIMPLER_ENV_GOOGLE` | SimplerEnv Fractal 체크포인트 추론 |
| `demo_data/cube_to_bowl_5` | SO100 팔 (5 episode) | `NEW_EMBODIMENT` | 사용자 정의 embodiment fine-tuning 예제 |
| `demo_data/cube_to_bowl_5_with_mask` | SO100 팔 + 프레임별 마스크 | `NEW_EMBODIMENT` | 마스크 기반 배경 억제 예제 |

DROID episode가 더 필요하면 `scripts/download_droid_sample.py --num-episodes 10`으로 추가 생성한다. 베이스 모델은 `droid_sample`에서 fine-tuning 없이 바로 동작한다.

### 데이터 포맷

데이터 형식은 LeRobot v2 데이터셋 형식에 `meta/modality.json` 한 파일을 더한 것이다. 디렉토리 구성은 다음과 같다.

| 경로 | 내용 |
|---|---|
| `meta/info.json` | 데이터셋 메타데이터 |
| `meta/episodes.jsonl` | episode 색인과 길이 |
| `meta/tasks.jsonl` | 과제의 자연어 설명 |
| `meta/modality.json` | state, action, video key 매핑 (GR00T 고유) |
| `data/chunk-000/` | timestep별 state와 action이 담긴 parquet 파일 |
| `videos/chunk-000/` | episode별 mp4 영상 파일 |

자기 데이터를 쓰려면 위 형식으로 변환한다. LeRobot v3에서 넘어오는 경우에는 `scripts/lerobot_conversion` 아래의 `convert_v3_to_v2.py`를 별도 가상환경에서 실행한다.

## 설치와 하드웨어 요구사항

### 하드웨어

| 용도 | 요구사항 |
|---|---|
| 추론 | 16GB 이상 VRAM GPU 1장. RTX 4090, L40, H100, Jetson AGX Thor와 Orin, DGX Spark |
| fine-tuning | 40GB 이상 VRAM GPU 1장 이상 권장. H100 또는 L40 노드가 최적이며 A6000도 동작하나 학습 시간이 길어진다 |

플랫폼별로 요구하는 CUDA와 Python 조합이 다르다. dGPU는 CUDA 12.8과 Python 3.12, Jetson Thor와 Orin은 JetPack 7.2에 CUDA 13.2와 Python 3.12, DGX Spark는 CUDA 13.0과 Python 3.12를 쓴다. 플랫폼별 설치 스크립트와 Dockerfile은 `scripts/deployment/` 아래에 있다.

### 설치 절차

의존성 관리는 uv를 쓴다. 순서는 다음과 같다.

- `git-lfs`를 먼저 설치한다. `demo_data/`의 parquet 파일을 받는 데 필요하다.
- submodule을 포함해 clone한다: `git clone --recurse-submodules`. 이미 clone했다면 `git submodule update --init --recursive`로 따로 초기화한다.
- FFmpeg를 설치한다. 유일하게 지원되는 영상 backend인 `torchcodec`이 요구한다.
- `uv sync --python 3.12`로 환경을 만든다. flash-attn과 TensorRT 같은 GPU 의존성이 기본 설치에 포함된다.
- `import gr00t`가 되는지 확인한다.
- HuggingFace에 로그인한다. `huggingface-cli login` 또는 `HF_TOKEN` 환경변수를 쓴다.

uv 대신 pip을 쓰려면 Python 3.12 가상환경을 만들고 `pip install -e .`를 실행한다. 다만 GPU 의존성은 직접 설치해야 할 수 있다. 시스템 의존성 충돌을 피하려면 Docker 이미지를 먼저 띄우고 그 안에서 저장소를 clone하는 순서를 권장한다.

`uv run`을 실행할 때마다 `Installing flash-attn...` 메시지가 나오는 것은 알려진 동작이다. URL로 고정한 wheel을 uv가 매번 재검증하는 것이며 소스 빌드가 아니라 2~3초짜리 캐시 확인이다. fine-tuning이 `CUDA_HOME is unset`으로 실패하면 `scripts/deployment/dgpu/install_deps.sh`를 한 번 실행하거나 `CUDA_HOME`을 직접 지정한다.

## 추론과 배포

### zero-shot 추론

포함된 `demo_data/droid_sample`은 베이스 모델과 바로 맞물린다. `scripts/deployment/standalone_inference_script.py`에 `--model-path nvidia/GR00T-N1.7-3B`, 데이터셋 경로, embodiment tag, `--traj-ids`, `--inference-mode pytorch`, `--execution-horizon 8`을 주면 DROID episode 2개에 대해 open-loop 추론이 실행된다. open-loop 실행은 한 번 계산한 action 묶음을 중간 피드백 없이 끝까지 내보내는 방식이다. 베이스 모델은 첫 실행 시 약 6GB를 HuggingFace에서 자동으로 내려받는다.

fine-tuning 체크포인트로 바꿀 때는 `--model-path`만 해당 모델 ID로 교체한다. 다만 LIBERO처럼 중첩 폴더 구조를 쓰는 체크포인트는 `hf download`로 필요한 파일을 먼저 받은 뒤 로컬 경로를 지정한다.

### server-client 구조

실제 기기 배포나 시뮬레이션 평가는 server-client 구조로 실행한다. policy는 GPU 서버에서 구동되고 가벼운 client가 ZMQ로 observation을 보내 action을 받는다.

`gr00t/eval/run_gr00t_server.py`로 서버를 띄우고 기본 포트 5555를 쓴다. client 쪽은 `PolicyClient`를 만들어 `policy.get_action(obs)` 한 줄로 gym 스타일 루프에 결합한다. 포트가 점유되어 `ZMQError: Address already in use`가 나면 `--port`로 다른 값을 준다.

학습된 모델 없이 환경 설정만 확인하려면 `--model-path` 대신 `--dataset-path`를 주어 서버를 띄운다. 기록된 action을 그대로 재생하는 ReplayPolicy로 동작하므로 환경 연결 문제와 모델 문제를 분리해 볼 수 있다.

## fine-tuning

fine-tuning은 `gr00t/experiment/launch_finetune.py` 하나가 단일 GPU와 `torchrun` 멀티 GPU를 모두 덮는다. 단일 GPU는 `CUDA_VISIBLE_DEVICES=0`과 `--num-gpus 1`로, 8장 구성은 `torchrun --nproc_per_node=8`로 실행한다. 예제 명령이 쓰는 값은 `--max-steps 2000`, `--global-batch-size 32`, `--dataloader-num-workers 4`다.

자기 로봇을 붙일 때 바꾸는 인자는 두 개다. 데이터셋 경로를 자기 데이터로, `--modality-config-path`를 자기 modality config로 바꾸고 embodiment tag는 `NEW_EMBODIMENT`를 쓴다. Weights & Biases 로깅은 `--use-wandb`로 켜고, 더 세밀한 설정이 필요하면 `launch_train.py`를 쓴다. 멀티 GPU에서는 가상환경이 제대로 잡히도록 맨 `torchrun`이 아니라 `uv run torchrun`을 쓰라고 안내한다.

공개 벤치마크 결과를 재현하려면 각 벤치마크의 자체 README를 따른다. 데이터셋 다운로드, fine-tuning, 평가 명령이 벤치마크마다 한 문서에 정리되어 있다.

| 벤치마크 | embodiment tag |
|---|---|
| LIBERO | `LIBERO_PANDA` |
| SimplerEnv (Fractal) | `SIMPLER_ENV_GOOGLE` |
| SimplerEnv (Bridge) | `SIMPLER_ENV_WIDOWX` |
| SO100 | `NEW_EMBODIMENT` |

학습 시 알아 두어야 할 항목이 세 가지 있다. 하드웨어가 감당하는 최대 배치 크기를 쓰고 수천 step을 학습하라는 것이 첫째다. 둘째로 같은 설정으로 다시 학습해도 이미지 augmentation이 결정론적이지 않아 실행 간 5~6%의 편차가 난다. 즉 공개 벤치마크 수치와 자기 결과를 비교할 때 이 폭을 감안해야 한다.

셋째가 `--state_dropout_prob`인데, 값이 세 군데서 다르게 잡혀 있어 혼동하기 쉽다. 학습 중 state 입력을 무작위로 떨어뜨려 일반화를 돕고 proprioception 의존을 줄이는 장치이며, proprioception은 관절 각도 같은 로봇 자신의 상태 감각 입력을 말한다.

| 위치 | 값 |
|---|---|
| 모델 config 기본값 | 0.8 |
| fine-tuning CLI 기본값 | 0.2 |
| LIBERO 10-Long 스크립트 | 0.2 (CLI 기본값 그대로) |
| SimplerEnv Bridge 스크립트 | 0.8 |
| SimplerEnv Fractal 스크립트 | 0.5 |

자기 상태 감각에 크게 기대는 과제라면 이 값을 낮추라는 것이 README의 안내다.

## 평가

평가는 두 가지 방식으로 나뉜다. open-loop 평가는 데이터셋의 정답 action과 예측을 맞대어 MSE와 그래프를 `/tmp/open_loop_eval/traj_{traj_id}.jpeg`로 남긴다. 저장 위치는 `--save-plot-path`로 바꿀 수 있다.

closed-loop 평가는 앞서 설명한 server-client 구조로 시뮬레이터나 실제 기기에서 실행한다. closed-loop 제어는 매 timestep 새 observation을 받아 action을 다시 정하는 방식이다.

시뮬레이션 벤치마크는 첫 실행 전에 한 번의 환경 설정이 필요하다. 공용 시스템 라이브러리(`libegl1-mesa-dev`, `libglu1-mesa`)를 설치한 뒤 벤치마크별 `setup_*.sh`를 실행한다. LIBERO, SimplerEnv, robocasa, robocasa-gr1이 여기에 해당하고, DROID와 RoboLab과 SO100처럼 실제 기기나 사용자 정의 embodiment를 쓰는 경로는 설정 스크립트 없이 각자의 README를 따른다. 설정이 제대로 됐는지는 `scripts/eval/check_sim_eval_ready.py`로 확인한다.

새 시뮬레이션 벤치마크를 추가할 때 주의할 점이 하나 있다. 각 벤치마크는 `{prefix}/{task_name}` 형식의 gym 환경 이름으로 등록되고, 평가 프레임워크는 `gr00t/eval/sim/env_utils.py`의 `ENV_PREFIX_TO_EMBODIMENT_TAG` 매핑으로 prefix에서 embodiment tag를 찾는다. 그런데 prefix와 tag 이름이 일치하지 않는 경우가 많다. 예를 들어 prefix `libero_sim`은 `EmbodimentTag.LIBERO_PANDA`로 이어진다. 따라서 prefix가 tag 이름과 같다고 가정하면 안 된다. 여러 prefix를 쓰는 벤치마크라면 관련 prefix 전부를 같은 tag로 매핑해야 한다.

테스트를 실행하려면 `uv sync --python 3.12 --extra dev`로 개발 의존성을 설치한 뒤 `pytest`를 실행한다. GPU 표시가 붙은 테스트는 해당 CUDA 하드웨어가 있는 장비에서만 실행한다.

## whole-body control 연동

whole-body control은 `UNITREE_G1_SONIC` tag와 GEAR-SONIC 컨트롤러 경로로 지원된다. 이 경로에서 VLA는 관절 명령을 직접 내지 않고 압축된 latent action 토큰을 출력하며, 학습된 whole-body 컨트롤러가 그것을 다리와 팔과 손을 포함한 전신 관절 명령으로 푼다. latent action은 두 프레임 사이의 시각적 변화를 action 라벨 없이 부호화한 벡터를 말한다. 하나의 policy가 언어 조건을 받아 manipulation과 locomotion을 함께 출력하며, locomotion은 다리로 이동하는 과제 영역이다.

세대 간 지원 범위가 나뉜다는 점을 확인해야 한다. `UNITREE_G1` tag는 이전 세대 decoupled WBC 컨트롤러와 호환되지만, 데이터 수집부터 fine-tuning과 배포까지 이어지는 end-to-end 워크플로는 GEAR-SONIC 경로에서만 지원한다. 실제 절차는 이 저장소가 아니라 [[physical-ai/nvlabs-gr00t-wholebodycontrol]]의 튜토리얼 문서가 담당하며, VR teleoperation 기반 데이터 수집, fine-tuning과 배포, PolicyServer와 SONIC decoder 조합의 실시간 제어가 각각 문서화되어 있다. teleoperation은 사람이 로봇을 원격으로 움직여 시연을 만드는 방식이다.

## LeRobot과의 역할 분담

GR00T N1.7은 HuggingFace LeRobot에서도 `groot` policy type으로 쓸 수 있다. README는 두 저장소의 역할을 명시적으로 나눈다. LeRobot 원생 학습과 평가와 rollout 흐름은 LeRobot 문서를 따르고, 모델 내부 구현과 배포 도구와 벤치마크별 예제는 이 저장소를 참고하라는 것이다.

## 실행 시 걸리는 제약

설치 제약이 촘촘해서, 실제로 실행하려면 README에 흩어진 제약 목록을 먼저 확인해야 한다.

| 제약 | 내용과 대응 |
|---|---|
| gated backbone | `nvidia/Cosmos-Reason2-2B`가 gated 모델이고 베이스를 포함한 모든 체크포인트가 첫 로드 때 이를 내려받는다. 접근 승인과 로그인이 없으면 `GatedRepoError`로 실패한다 |
| 영상 backend | `torchcodec`이 유일한 backend이며 decord와 pyav는 더 이상 지원하지 않는다 |
| FFmpeg 버전 | dGPU 기본 설치가 고정하는 `torchcodec` 0.8.0은 FFmpeg 4에서 7까지만 읽는다. Ubuntu 25.10 이상은 FFmpeg 8을 설치하므로 8 미만 런타임을 따로 준비하고 `LD_LIBRARY_PATH`에 올려야 한다 |
| 코덱 | H.264만 보장되고 AV1 디코딩은 보장하지 않는다. AV1 데이터셋은 `convert_av1_to_h264.py`로 변환한다 |
| CUDA 13 이상 | PyTorch 2.7이 고정한 Triton 3.3.1이 major 버전 13을 인식하지 못해 `ptx_get_version()`에서 실패한다. `scripts/patch_triton_cuda13.sh`를 한 번 실행한다 |
| GB300 (sm_103) | Triton 3.3.1이 이 아키텍처를 지원하지 않아 `torch.compile`이 실패한다. eager 모드나 TensorRT 추론으로 우회한다 |
| aarch64 플랫폼 | Spark, Thor, Orin에서 `uv run python`이나 `uv run torchrun`을 쓰면 x86_64용 `pyproject.toml`로 환경을 다시 맞춰 플랫폼 전용 설치를 손상시킨다. 가상환경과 플랫폼 스크립트를 source한 뒤 맨 `python`과 `torchrun`을 쓴다 |
| git-lfs와 submodule | `git-lfs` 없이 clone하면 demo 데이터의 parquet이 포인터 파일만 받아지고, submodule을 빠뜨리면 의존이 비어 있게 된다 |

마지막 두 항목은 오류 없이 조용히 실패하는 종류라 초기 진입 비용을 실제로 키운다.

## 라이선스

라이선스 표기가 문서 안에서 한 군데 어긋난다. 소개 절은 N1.7이 Apache 2.0으로 완전히 상용 라이선스 가능하다고 적지만, License 절은 코드만 Apache 2.0이고 모델 가중치는 NVIDIA Open Model License라고 나눈다. 가중치를 사용할 계획이라면 뒤쪽 표기를 기준으로 삼아야 한다.

성능 근거를 이 저장소만으로 판단할 수 없다는 점도 함께 확인해야 한다. 인용으로 걸린 대응 논문은 여전히 2025년 N1 논문이며, N1.5와 N1.6과 N1.7의 변경을 다룬 문헌은 README가 가리키지 않는다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| embodiment tag | 어떤 로봇의 데이터인지 가리키는 문자열 키. 모델이 state와 action 배열을 해석할 modality config를 고른다. 대소문자를 구분하지 않고 모든 명령에 필수 |
| modality config | state와 action 배열의 구간별 이름과 video key를 적은 설정. 데이터셋에서는 `meta/modality.json`, 학습에서는 `--modality-config-path`로 전달한다 |
| relative EEF action space | action을 절대 목표 pose가 아니라 현재 pose로부터의 변화량으로 적는 표현. 사람과 로봇 데이터에 공통으로 쓰여 cross-embodiment 전이의 전제가 된다 |
| execution horizon | 예측한 action 중 policy 호출 한 번에 실제로 실행하는 개수. N1.6의 `--action-horizon`을 개명한 것으로 예측 horizon 40과 구분된다 |
| state dropout | 학습 중 state 입력을 확률적으로 떨어뜨려 proprioception 의존을 줄이는 정규화. `--state_dropout_prob`로 조절하며 벤치마크마다 값이 다르다 |
| NEW_EMBODIMENT | pre-training에 없던 자기 로봇을 붙일 때 쓰는 embodiment tag |

## 관련 페이지

- [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation]]: 이 저장소가 구현하는 계열의 원 논문. 아키텍처 내부와 정량 평가는 원 논문 페이지 참고.
- [[physical-ai/jo-2026-groot-n1-vla-primer]]: GR00T N1의 한국어 해설. 모델 구조를 개념부터 풀어 설명한다.
- [[physical-ai/jo-2026-groot-n1-5-vla-primer]]: N1.5 세대의 한국어 해설. N1에서 N1.7로 이어지는 중간 단계를 다룬다.
- [[physical-ai/nvlabs-gr00t-wholebodycontrol]]: whole-body control 쪽 저장소. N1.7부터 `UNITREE_G1_SONIC` tag로 두 계열이 맞물린다.
- [[llms/nvlabs-eagle]]: N1.6까지 쓰던 VLM backbone 공급처. N1.7에서 Cosmos-Reason2-2B로 교체됐다.
- [[physical-ai/robocasa-robocasa]]: 지원 벤치마크로 올라 있는 robocasa 계열의 공식 구현. 환경과 데이터 쪽 짝이다.
- [[physical-ai/huggingface-lerobot]]: 데이터 형식의 바탕이자 `groot` policy type으로 N1.7을 싣는 반대 방향의 연결.
- [[physical-ai/openhelix-robot-awesome-dual-system-vla]]: System 1이 실시간 perception 입력을 직접 받아야 한다는 기준으로 GR00T를 dual-system VLA에서 제외한 목록.
- [[overviews/physical-ai-overview]]: physical-ai 카테고리 허브. GEAR와 GR00T와 SONIC과 GEAR-SONIC 이름 구분표가 있다.
