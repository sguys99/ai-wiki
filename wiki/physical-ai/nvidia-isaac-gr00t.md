---
title: "NVIDIA Isaac GR00T (N1.7)"
type: repo
year: 2026
category: physical-ai
source: nvidia-isaac-gr00t.md
raw_path: /Users/kmyu/Desktop/project/ai-wiki/raw/repos/nvidia-isaac-gr00t.md
raw_filename: "nvidia-isaac-gr00t.md"
source_collection: external
org: "NVIDIA"
repo: "Isaac-GR00T"
url: "https://github.com/NVIDIA/Isaac-GR00T"
license: "Apache-2.0 (code) / NVIDIA Open Model License (model weights)"
tags: [physical-ai, vla, humanoid, edge-inference]
figures:
  - id: fig01
    label: header
    kind: figure
    file: assets/nvidia-isaac-gr00t/fig01.png
    raw: https://raw.githubusercontent.com/NVIDIA/Isaac-GR00T/main/media/header_compress.png
    caption: "README 상단 헤더 배너 (장식용)"
    strategy: manual
    curated: false
  - id: fig02
    label: Unitree G1 demo
    kind: figure
    file: assets/nvidia-isaac-gr00t/fig02.gif
    raw: https://raw.githubusercontent.com/NVIDIA/Isaac-GR00T/main/media/unitree_g1.gif
    caption: "Unitree G1 실행 데모 (애니메이션 gif)"
    strategy: manual
    curated: false
  - id: fig03
    label: AgiBot G1 demo
    kind: figure
    file: assets/nvidia-isaac-gr00t/fig03.gif
    raw: https://raw.githubusercontent.com/NVIDIA/Isaac-GR00T/main/media/agibot_g1.gif
    caption: "AgiBot G1 실행 데모 (애니메이션 gif)"
    strategy: manual
    curated: false
  - id: fig04
    label: YAM demo
    kind: figure
    file: assets/nvidia-isaac-gr00t/fig04.gif
    raw: https://raw.githubusercontent.com/NVIDIA/Isaac-GR00T/main/media/yam.gif
    caption: "YAM 팔 실행 데모 (애니메이션 gif)"
    strategy: manual
    curated: false
  - id: fig05
    label: model architecture
    kind: figure
    file: assets/nvidia-isaac-gr00t/fig05.png
    raw: https://raw.githubusercontent.com/NVIDIA/Isaac-GR00T/main/media/model-architecture.png
    caption: "GR00T N1.7 신경망 구조 — vision-language foundation model + 연속 action을 denoise하는 diffusion transformer head"
    strategy: manual
    curated: false
---

## 요약 (Summary)

GR00T 계열 VLA의 공식 레퍼런스 구현이자 N1.7 GA 릴리스의 배포처다. [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation|GR00T N1]] 논문의 골격은 유지된다. vision-language foundation model이 앞에 서고 연속 action을 denoise하는 diffusion transformer head가 뒤에 붙으며, action head는 여전히 flow matching 방식의 DiT다. flow matching은 noise에서 데이터로 향하는 vector field를 학습해 샘플을 만드는 생성 기법이다.

이번 세대의 변경은 두 군데에 몰려 있다. VLM backbone이 자체 Eagle에서 Cosmos-Reason2-2B로 갈아탔고, action을 절대 목표가 아니라 현재 pose로부터의 변화량으로 적는 relative EEF action space를 로봇과 사람 데이터에 공통으로 깔았다. 두 번째가 EgoScale 사람 영상 20,000시간을 pre-training에 그대로 태울 수 있게 한 장치다. 상대 표현이 먼저 있어야 사람 영상이 로봇 학습 데이터로 쓸모가 생기므로, 두 변경은 사실 하나로 묶인다.

수치를 찾는 목적이라면 이 저장소는 맞는 자료가 아니다. N1.6 대비 성능은 "comparable"이라는 한 단어가 전부이고, RoboCasa·SimplerEnv·LIBERO·실기기 G1 평가 범위를 넓혔다고만 적을 뿐 성공률은 각 벤치마크 하위 README로 넘긴다. 대응 논문도 여전히 2025년 N1 논문이라 N1.5·N1.6·N1.7의 변경을 다룬 문헌은 여기서 가리키지 않는다.

라이선스 표기가 한 군데 어긋난다는 것도 함께 적어 둔다. 소개 절은 "N1.7은 Apache 2.0으로 완전히 상용 라이선스 가능"이라고 쓰지만 License 절은 코드만 Apache 2.0, 가중치는 NVIDIA Open Model License로 나눈다. 가중치를 쓸 계획이라면 뒤쪽 표기가 기준이다.

## N1.6에서 바뀐 것 (Changes from N1.6)

| 항목 | N1.6 | N1.7 |
|---|---|---|
| 모델 패키지 | `gr00t_n1d6` | `gr00t_n1d7` |
| VLM backbone | 자체 포함 Eagle (`nvidia/Eagle-Block2A-2B-v2`) | `nvidia/Cosmos-Reason2-2B` (Qwen3-VL 계열) |
| transformers | 4.51.3 | 4.57.3 |
| state·action 차원 | 29 | 132 |
| action horizon | 16 | 40 |
| DiT diffusion 층 | 32 | 16 |
| `select_layer` | 16 | 12 |
| `tune_top_llm_layers` | 4 | 0 |
| `load_bf16` | true | false |

`tune_top_llm_layers`가 4에서 0으로 내려간 게 눈에 띈다. N1.6은 backbone 상단 4개 층을 함께 학습했는데 N1.7은 backbone을 전부 얼린다. backbone을 통째로 바꾸면서 원래 모델의 일반화를 건드리지 않는 쪽을 택한 셈이다. 새 backbone은 해상도가 유연해 이미지를 padding 없이 원래 화면비 그대로 인코딩한다.

차원이 29에서 132로 네 배 넘게 커지고 action horizon이 16에서 40으로 늘어난 것은 whole-body control까지 한 인터페이스에 담으려는 조치로 읽힌다. whole-body control은 균형과 이동을 포함해 몸 전체를 함께 제어하는 문제인데, 다리와 손가락까지 넣으면 29차원으로는 부족하다.

CLI 이름 하나가 바뀐 것도 기록해 둘 만하다. `--action-horizon`이 `--execution-horizon`으로 개명됐다. 모델이 예측하는 action 개수와 실제로 실행에 쓰는 개수가 다르다는 걸 이름으로 드러낸 것으로, 예측 horizon은 40이지만 예제 명령은 대개 8이나 16을 실행한다.

## 체크포인트와 데이터 (Model Card & Data)

| 체크포인트 | 종류 | embodiment tag |
|---|---|---|
| `nvidia/GR00T-N1.7-3B` | 베이스 (3B) | pretrain tag 전체 |
| `nvidia/GR00T-N1.7-LIBERO` | fine-tuning | `LIBERO_PANDA` |
| `nvidia/GR00T-N1.7-DROID` | fine-tuning | `OXE_DROID_RELATIVE_EEF_RELATIVE_JOINT` |
| `nvidia/GR00T-N1.7-SimplerEnv-Bridge` | fine-tuning | `SIMPLER_ENV_WIDOWX` |
| `nvidia/GR00T-N1.7-SimplerEnv-Fractal` | fine-tuning | `SIMPLER_ENV_GOOGLE` |

embodiment tag는 어떤 로봇의 데이터인지 가리키는 문자열 키로, 모델이 state와 action 배열을 어떻게 해석할지 정하는 modality config를 고른다. 추론이든 fine-tuning이든 모든 명령에 `--embodiment-tag`가 필요하고 대소문자는 구분하지 않는다. 자기 로봇을 붙일 때는 `NEW_EMBODIMENT`를 쓴다.

데이터 형식은 LeRobot v2에 `meta/modality.json` 한 파일을 더한 것이다. 이 파일이 하나로 이어붙인 state·action 배열의 어느 구간이 `x`·`y`·`z`·`gripper`인지, 어떤 video key가 있는지를 적는다. embodiment tag가 참조하는 게 이 매핑이다.

demo 데이터셋 6종이 저장소에 함께 들어 있어 다운로드 없이 바로 돌려볼 수 있다. DROID 3 episode, LIBERO Panda 5 episode, SimplerEnv Bridge와 Fractal 샘플, SO100 팔의 `cube_to_bowl_5` 5 episode, 그리고 프레임별 마스크가 붙은 변형판이다. episode는 과제 시작부터 종료까지의 한 실행 단위를 말한다. 베이스 모델은 `droid_sample`에서 fine-tuning 없이 바로 돌아간다.

체크포인트마다 파일 구조가 달라 다루는 법이 갈린다. DROID나 SimplerEnv처럼 평평한 구조는 HuggingFace 모델 ID를 `--model-path`에 그대로 넘기면 되지만, LIBERO처럼 하위 폴더에 파일이 들어 있으면 HuggingFace가 중첩 경로를 지원하지 않아 `hf download`로 먼저 받아야 한다.

## 학습과 평가 (Training and Evaluation)

fine-tuning은 `launch_finetune.py` 하나로 단일 GPU와 `torchrun` 멀티 GPU를 모두 덮는다. 자기 로봇을 붙일 때 바뀌는 건 데이터셋 경로와 `--modality-config-path` 두 개다. N1.7부터는 데이터셋 경로를 여러 개 주고 `ds_weights_alpha`로 mixture 비중을 조절할 수 있다.

학습을 돌릴 때 알아야 할 숫자가 몇 개 있다. 같은 설정으로 다시 돌려도 이미지 augmentation이 결정론적이지 않아 실행 간 5~6% 편차가 난다. 공개 벤치마크 수치와 자기 결과를 견줄 때 이 폭을 감안하라는 뜻이다.

`--state_dropout_prob`는 값이 세 군데서 다르게 잡혀 있어 헷갈리기 쉽다. 모델 config 기본값은 0.8, fine-tuning CLI 기본값은 0.2인데 실제 벤치마크 스크립트는 suite마다 따로 덮어쓴다. LIBERO 10-Long은 CLI 기본값 그대로 0.2, SimplerEnv Bridge는 0.8, Fractal은 0.5다. 학습 중 state 입력을 무작위로 떨어뜨려 proprioception 의존을 줄이는 장치라서, 관절 각도 같은 자기 상태 감각에 크게 기대는 과제라면 값을 낮추라고 안내한다. proprioception은 관절 각도 같은 로봇 자신의 상태 감각 입력이다.

평가는 두 갈래다. open-loop 평가는 데이터셋의 정답 action과 예측을 맞대 MSE와 그래프를 `/tmp/open_loop_eval/traj_{id}.jpeg`로 남긴다. closed-loop 평가는 아래 server-client 구조로 시뮬레이터나 실기기에서 돌린다. 지원 벤치마크는 LIBERO, SimplerEnv 두 갈래, SO100, DROID, RoboLab, robocasa 계열이며 각각 한 번씩 `setup_*.sh`를 돌려야 한다.

## 배포와 인터페이스 (Deployment)

실기기나 시뮬레이션 평가는 server-client 구조로 돌린다. policy는 GPU 서버에서 돌고 가벼운 client가 ZMQ로 observation을 보내 action을 받는다. observation은 매 timestep에 policy가 받는 센서 입력이다. 기본 포트는 5555이고 `PolicyClient`가 `get_action(obs)` 한 줄로 gym 스타일 루프에 붙는다. 학습된 모델 없이 환경 설정만 확인하고 싶으면 `--model-path` 대신 `--dataset-path`를 줘 기록된 action을 재생하는 ReplayPolicy로 띄운다.

N1.7이 새로 넣은 것 중 하나가 전 구간 ONNX·TensorRT export다. 데스크톱 GPU와 edge 플랫폼 사이의 배포 일관성을 맞췄다고 적는다. 추론은 16GB VRAM 한 장이면 되고 RTX 4090·L40·H100은 물론 Jetson AGX Thor·Orin, DGX Spark가 대상에 들어간다. fine-tuning은 40GB 이상을 권장한다. 플랫폼별 설치 스크립트와 Dockerfile이 `scripts/deployment/` 아래에 갈려 있다.

[[physical-ai/huggingface-lerobot|LeRobot]]과는 역할이 갈린다. LeRobot 쪽에서도 `groot` policy type으로 N1.7을 쓸 수 있는데, README는 LeRobot 원생 학습·평가 흐름은 LeRobot 문서로, 모델 내부와 배포 도구와 벤치마크별 예제는 이 저장소로 오라고 정리한다.

## SONIC 연결 (Whole-Body Control)

whole-body control은 `UNITREE_G1_SONIC` tag와 GEAR-SONIC 컨트롤러로 간다. 이 경로에서 VLA는 관절 명령을 직접 내지 않고 압축된 latent action 토큰을 내며, 학습된 컨트롤러가 그걸 다리·팔·손을 포함한 전신 관절 명령으로 푼다. 한 policy가 언어 조건을 받아 manipulation과 locomotion을 함께 낸다. manipulation은 팔과 손으로 물체를 다루는 과제 영역이고 locomotion은 다리로 이동하는 과제 영역이다.

세대 간 짝이 갈린다는 단서가 여기 있다. `UNITREE_G1` tag는 이전 세대 decoupled WBC와 호환되지만, 데이터 수집부터 fine-tuning, 배포까지 이어지는 end-to-end 워크플로는 GEAR-SONIC 쪽에서만 지원한다. 실제 절차는 이 저장소가 아니라 [[physical-ai/nvlabs-gr00t-wholebodycontrol|GR00T-WholeBodyControl]]의 튜토리얼 문서로 넘어간다.

## 실무에서 걸리는 지점 (Gotchas)

설치 제약이 유난히 촘촘해서, 실제로 돌리려면 README에 흩어진 함정 목록이 사실상 필수 읽을거리다.

Cosmos-Reason2-2B가 gated 모델이라는 게 첫 관문이다. 베이스 체크포인트를 포함해 모든 GR00T 체크포인트가 첫 로드 때 이걸 당겨오므로, HuggingFace에서 접근 승인을 받고 로그인하지 않으면 `GatedRepoError`로 죽는다. 오픈 가중치라고 해서 바로 받아지지는 않는다.

영상 디코딩도 좁다. torchcodec이 유일한 backend이고 decord·pyav는 더 이상 지원하지 않는다. dGPU 기본 설치가 고정하는 torchcodec 0.8.0은 FFmpeg 4~7만 읽는데 Ubuntu 25.10 이상은 FFmpeg 8을 깔아주므로 그대로는 로드에 실패한다. 코덱은 H.264만 보장되고 AV1 데이터셋은 변환 스크립트를 거쳐야 한다.

플랫폼별 지뢰도 남아 있다. CUDA 13 이상에서는 PyTorch 2.7이 고정한 Triton 3.3.1이 major 버전을 못 알아봐 패치 스크립트를 한 번 돌려야 한다. GB300은 sm_103을 Triton이 아예 지원하지 않아 `torch.compile`이 실패하고, 이때는 eager 모드나 TensorRT로 우회하라는 게 안내의 전부다. aarch64 계열에서 `uv run`을 쓰면 x86_64용 `pyproject.toml`로 환경을 다시 맞춰 플랫폼 전용 설치를 망가뜨린다는 경고도 붙는다.

`git-lfs` 없이 clone하면 demo 데이터의 parquet이 포인터 파일만 받아지고, submodule을 빼먹으면 의존이 빈다. 둘 다 조용히 실패하는 종류라 초기 진입 비용이 실제로 크다.

## 관련 페이지 (Related Pages)

- [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation]] — 이 저장소가 구현하는 계열의 원 논문. dual-system 골격은 같지만 backbone과 action 표현이 N1.7에서 달라졌다
- [[physical-ai/nvlabs-gr00t-wholebodycontrol]] — whole-body control 쪽 절반. N1.7부터 `UNITREE_G1_SONIC` tag로 두 계열이 맞물린다
- [[llms/nvlabs-eagle]] — N1.7 이전 세대의 VLM backbone 공급처. N1부터 N1.6까지 Eagle 계열을 썼고 여기서 Cosmos-Reason2-2B로 갈아탔다
- [[physical-ai/robocasa-robocasa]] — 이 저장소가 지원 벤치마크로 올려둔 robocasa 계열의 공식 구현. 환경·데이터 쪽 짝이다
- [[physical-ai/huggingface-lerobot]] — 데이터 형식의 바탕이자 `groot` policy type으로 N1.7을 싣는 반대 방향의 연결
- [[physical-ai/openhelix-robot-awesome-dual-system-vla]] — System 1이 실시간 perception 입력을 직접 받아야 한다는 기준으로 GR00T를 dual-system VLA에서 배제한 목록
- [[overviews/physical-ai-overview]] — physical-ai 카테고리 허브. GEAR·GR00T·SONIC·GEAR-SONIC 이름 구분표가 여기 있다
