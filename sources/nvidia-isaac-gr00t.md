---
title: "NVIDIA Isaac GR00T (N1.7)"
type: repo
year: 2026
category: physical-ai
raw_path: raw/repos/nvidia-isaac-gr00t.md
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

## 한 줄 요약 (One-line Summary)

GR00T 계열 VLA의 공식 레퍼런스 구현이자 N1.7 GA 릴리스의 배포처. 이번 세대의 변경은 두 군데에 몰려 있다. VLM backbone이 자체 Eagle에서 Cosmos-Reason2-2B로 갈아탔고, action을 절대 목표가 아니라 현재 pose로부터의 변화량으로 적는 relative EEF 표현을 로봇과 사람 데이터에 공통으로 깔았다. 후자가 EgoScale human video 20,000시간을 pre-training에 그대로 태울 수 있게 한 장치다.

## 1. 자료 정보 (Document Information)

- URL: https://github.com/NVIDIA/Isaac-GR00T
- 라이선스: 코드는 Apache-2.0, 모델 가중치는 NVIDIA Open Model License (이중 라이선스)
- 릴리스 단계: General Availability. 상용 배포와 지원, 안정성 보장이 명시된 단계다
- 대응 논문: [[nvidia-2025-gr00t-n1-an-open-foundation]] (arXiv 2503.14734, BibTeX `gr00tn1_2025`)
- 이전 세대 브랜치: `n1d6`, `n1d5`가 따로 살아 있다
- 아카이브한 README 스냅샷: 2026-09-01 수집

라이선스 문구가 한 군데 어긋난다. 본문 소개 절은 "N1.7은 Apache 2.0으로 완전히 상용 라이선스 가능"이라고 적는데, 아래 License 절은 코드만 Apache 2.0이고 가중치는 NVIDIA Open Model License라고 나눈다. 가중치를 쓸 계획이라면 뒤쪽 표기를 기준으로 삼는 편이 안전하다.

수치를 찾는 목적이라면 이 README는 맞는 자료가 아니다. RoboCasa·SimplerEnv·LIBERO·실기기 G1 평가 범위를 넓혔다고만 적고 성공률 숫자는 각 벤치마크 하위 README로 넘긴다. N1.6 대비 성능은 "comparable"이라는 한 단어가 전부다.

## 2. 주요 기여 (Key Contributions)

저장소로서의 값은 GR00T를 논문에서 실행 가능한 스택으로 내려놓는 데 있다. 3B 베이스 체크포인트와 벤치마크별 fine-tuning 체크포인트 4종, 다운로드 없이 바로 돌아가는 demo 데이터셋 6종, 학습·추론·서빙 CLI, ONNX와 TensorRT 전 구간 export, dGPU부터 Jetson Orin까지 플랫폼별 설치 스크립트가 한 저장소에 들어 있다.

N1.7 자체의 기여는 두 가지로 압축된다. 첫째가 relative EEF action space다. end-effector는 로봇 팔 끝에서 물체와 접촉하는 부분을 말하는데, action을 "여기로 가라"는 절대 목표 대신 "지금 위치에서 이만큼 움직여라"는 변화량으로 적는다. NVIDIA는 이 표현이 cross-embodiment 성능을 끌어올린 핵심 요인이라고 본다. 둘째가 human video pre-training이다. 로봇 시연과 나란히 EgoScale 사람 영상 20,000시간을 학습에 넣는데, 상대 표현이 사람과 로봇 양쪽에서 같은 의미를 갖기 때문에 사람 영상에서 배운 manipulation 사전 지식이 로봇 제어로 바로 건너간다. manipulation은 팔과 손으로 물체를 다루는 과제 영역을 가리킨다.

두 기여가 사실 하나로 묶인다는 점이 읽는 재미다. 상대 표현이 먼저 있어야 사람 영상이 데이터로 쓸모가 생긴다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### N1.6에서 바뀐 것

구조의 큰 틀은 그대로다. vision-language foundation model이 앞에 서고 연속 action을 denoise하는 diffusion transformer head가 뒤에 붙는 형태이며, action head는 여전히 flow matching 방식의 DiT다. flow matching은 noise에서 데이터로 향하는 vector field를 학습해 샘플을 만드는 생성 기법이다. 바뀐 건 그 안을 채우는 숫자와 부품이다.

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

`tune_top_llm_layers`가 4에서 0으로 내려간 게 눈에 띈다. N1.6은 backbone 상단 4개 층을 함께 학습했는데 N1.7은 backbone을 전부 얼린다. backbone을 바꾸면서 원래 모델의 일반화를 건드리지 않는 쪽을 택한 셈이다. 새 backbone은 해상도가 유연해서 이미지를 padding 없이 원래 화면비 그대로 인코딩한다.

차원이 29에서 132로 네 배 넘게 커진 것과 action horizon이 16에서 40으로 늘어난 것은 whole-body control까지 한 인터페이스에 담으려는 조치로 읽힌다. 다리와 손가락까지 포함하면 29차원으로는 부족하다.

### embodiment tag가 하는 일

embodiment tag는 어떤 로봇의 데이터인지를 가리키는 문자열 키로, 모델이 state와 action 배열을 어떻게 해석할지 정하는 modality config를 고른다. 추론이든 fine-tuning이든 모든 명령에 `--embodiment-tag`가 필요하고 대소문자는 구분하지 않는다. pre-training에 포함된 embodiment의 pretrain tag와 fine-tuning으로 새로 붙이는 posttrain tag가 나뉘어 있으며, 자기 로봇을 붙일 때는 `NEW_EMBODIMENT`를 쓴다.

데이터 형식은 LeRobot v2에 `meta/modality.json` 한 파일을 더한 것이다. 이 파일이 하나로 이어붙인 state·action 배열의 어느 구간이 `x`·`y`·`z`·`gripper`인지, 어떤 video key가 있는지를 적는다. embodiment tag가 참조하는 게 바로 이 매핑이다.

### 체크포인트와 demo 데이터

| 체크포인트 | 종류 | embodiment tag |
|---|---|---|
| `nvidia/GR00T-N1.7-3B` | 베이스 (3B) | pretrain tag 전체 |
| `nvidia/GR00T-N1.7-LIBERO` | fine-tuning | `LIBERO_PANDA` |
| `nvidia/GR00T-N1.7-DROID` | fine-tuning | `OXE_DROID_RELATIVE_EEF_RELATIVE_JOINT` |
| `nvidia/GR00T-N1.7-SimplerEnv-Bridge` | fine-tuning | `SIMPLER_ENV_WIDOWX` |
| `nvidia/GR00T-N1.7-SimplerEnv-Fractal` | fine-tuning | `SIMPLER_ENV_GOOGLE` |

demo 데이터셋 6종이 저장소에 함께 들어 있어 다운로드 없이 바로 돌려볼 수 있다. DROID 3 episode, LIBERO Panda 5 episode, SimplerEnv Bridge와 Fractal 샘플, SO100 팔의 `cube_to_bowl_5` 5 episode, 그리고 프레임별 마스크가 붙은 변형판이다. episode는 과제 시작부터 종료까지의 한 실행 단위를 말한다. 베이스 모델은 `droid_sample`에서 fine-tuning 없이 바로 돌아간다.

체크포인트마다 파일 구조가 달라 다루는 법이 갈린다. DROID나 SimplerEnv처럼 평평한 구조는 HuggingFace 모델 ID를 `--model-path`에 그대로 넘기면 되지만, LIBERO처럼 하위 폴더에 파일이 들어 있으면 HuggingFace가 중첩 경로를 지원하지 않아 `hf download`로 먼저 받아야 한다.

### 서빙과 배포

실기기나 시뮬레이션 평가는 server-client 구조로 돌린다. policy는 GPU 서버에서 돌고 가벼운 client가 ZMQ로 observation을 보내 action을 받는다. observation은 매 timestep에 policy가 받는 센서 입력이다. 기본 포트는 5555이고 `PolicyClient`가 `get_action(obs)` 한 줄로 gym 스타일 루프에 붙는다. 학습된 모델 없이 환경 설정만 확인하고 싶으면 `--model-path` 대신 `--dataset-path`를 줘서 기록된 action을 재생하는 ReplayPolicy로 띄운다.

N1.7이 새로 넣은 것 중 하나가 전 구간 ONNX·TensorRT export다. 데스크톱 GPU와 edge 플랫폼 사이의 배포 일관성을 맞췄다고 적는다. 추론은 16GB VRAM 한 장이면 되고 RTX 4090·L40·H100은 물론 Jetson AGX Thor·Orin, DGX Spark가 대상에 들어간다. fine-tuning은 40GB 이상을 권장한다.

CLI 이름 하나가 바뀐 것도 기록해 둘 만하다. `--action-horizon`이 `--execution-horizon`으로 개명됐는데, 모델이 예측하는 action 개수와 실제로 실행에 쓰는 개수가 다르다는 걸 이름으로 드러낸 것이다. 예측 horizon은 40이지만 예제 명령은 대개 8이나 16을 실행한다.

### SONIC 연결

whole-body control은 `UNITREE_G1_SONIC` tag와 GEAR-SONIC 컨트롤러로 간다. whole-body control은 균형과 이동을 포함해 몸 전체를 함께 제어하는 문제다. 이 경로에서 VLA는 관절 명령을 직접 내지 않고 압축된 latent action 토큰을 내며, 학습된 컨트롤러가 그걸 다리·팔·손을 포함한 전신 관절 명령으로 푼다. 한 policy가 언어 조건을 받아 manipulation과 locomotion을 함께 낸다.

세대 간 짝이 갈린다는 단서가 여기 있다. `UNITREE_G1` tag는 이전 세대 decoupled WBC와 호환되지만, 데이터 수집부터 fine-tuning, 배포까지 이어지는 end-to-end 워크플로는 GEAR-SONIC 쪽에서만 지원한다. 실제 절차는 이 저장소가 아니라 [[nvlabs-gr00t-wholebodycontrol]]의 튜토리얼 문서로 넘어간다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

README에 성능 수치가 없다. N1.6과 견줘 "비슷한 성능이되 일반화와 언어 지시 따르기가 나아졌다"는 서술이 전부이고, 그 개선의 원인으로 EgoScale human video 20,000시간을 지목한다. RoboCasa, RoboCasa GR1 탁상 과제, SimplerEnv, 실기기 G1 평가로 범위를 넓혔다고 적지만 결과표는 각 벤치마크 README 몫이다.

대신 학습을 돌릴 때 알아야 할 숫자가 몇 개 나온다. 같은 설정으로 다시 돌려도 이미지 augmentation이 결정론적이지 않아 실행 간 5~6% 편차가 난다. 공개 벤치마크 수치와 자기 결과를 비교할 때 이 폭을 감안하라는 뜻이다.

`--state_dropout_prob`는 값이 세 군데서 다르게 잡혀 있어 헷갈리기 쉽다. 모델 config 기본값은 0.8, fine-tuning CLI 기본값은 0.2인데 실제 벤치마크 스크립트는 suite마다 따로 덮어쓴다. LIBERO 10-Long은 CLI 기본값 그대로 0.2, SimplerEnv Bridge는 0.8, Fractal은 0.5다. 학습 중 state 입력을 무작위로 떨어뜨려 proprioception 의존을 줄이는 장치라서, 관절 각도 같은 자기 상태 감각에 크게 기대는 과제라면 값을 낮추라고 안내한다.

평가는 두 갈래다. open-loop 평가는 데이터셋의 정답 action과 예측을 맞대 MSE와 그래프를 `/tmp/open_loop_eval/traj_{id}.jpeg`로 남긴다. closed-loop 평가는 위의 server-client 구조로 시뮬레이터나 실기기에서 돌린다. 지원 벤치마크는 LIBERO, SimplerEnv 두 갈래, SO100, DROID, RoboLab, robocasa 계열이다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

설치 제약이 유난히 촘촘하다. 이 저장소를 실제로 돌리려면 README에 흩어진 함정 목록이 사실상 필수 읽을거리다.

Cosmos-Reason2-2B가 gated 모델이라는 게 첫 관문이다. 베이스 체크포인트를 포함해 모든 GR00T 체크포인트가 첫 로드 때 이걸 당겨오므로, HuggingFace에서 접근 승인을 받고 로그인하지 않으면 `GatedRepoError`로 죽는다. 오픈 가중치라고 해서 바로 받아지지 않는다.

영상 디코딩도 좁다. torchcodec이 유일한 backend이고 decord·pyav는 더 이상 지원하지 않는다. dGPU 기본 설치가 고정하는 torchcodec 0.8.0은 FFmpeg 4~7만 읽는데 Ubuntu 25.10 이상은 FFmpeg 8을 깔아주므로 그대로는 로드에 실패한다. 코덱은 H.264만 보장되고 AV1 데이터셋은 변환 스크립트를 거쳐야 한다.

플랫폼별 지뢰도 남아 있다. CUDA 13 이상에서는 PyTorch 2.7이 고정한 Triton 3.3.1이 major 버전을 못 알아봐 패치 스크립트를 한 번 돌려야 하고, GB300은 sm_103을 Triton이 아예 지원하지 않아 `torch.compile`이 실패한다. 이 경우 eager 모드나 TensorRT로 우회하라는 게 안내의 전부다. aarch64 계열에서 `uv run`을 쓰면 x86_64용 `pyproject.toml`로 환경을 다시 맞춰 플랫폼 전용 설치를 망가뜨린다는 경고도 붙는다.

`git-lfs` 없이 clone하면 demo 데이터의 parquet이 포인터 파일만 받아지고, submodule을 빼먹으면 의존이 빈다. 둘 다 조용히 실패하는 종류라 초기 진입 비용이 실제로 크다.

기록에 남기는 김에 적어 두면, N1.7 성능 근거를 이 저장소만으로는 판단할 수 없다. 대응 논문은 여전히 2025년 N1 논문이고 N1.5·N1.6·N1.7의 변경을 다룬 논문은 이 README가 가리키지 않는다.

## 6. 관련 연구 (Related Work)

이 저장소는 [[nvidia-2025-gr00t-n1-an-open-foundation]]의 후속 구현이다. 논문의 Eagle-2 VLM과 flow-matching DiT라는 dual-system 골격은 유지되지만 backbone과 action 표현이 그때와 다르므로, 논문을 읽고 코드를 볼 때 차이를 염두에 둬야 한다.

whole-body control 쪽 절반은 [[nvlabs-gr00t-wholebodycontrol]]에 있다. GR00T가 팔과 손의 manipulation을, SONIC 계열이 몸 전체 제어를 맡는 분업인데 N1.7부터 두 계열이 `UNITREE_G1_SONIC` tag로 맞물린다. 이름이 겹쳐 헷갈리는 GEAR·GR00T·SONIC·GEAR-SONIC 구분은 [[physical-ai-overview]]의 용어 정리 절이 표로 정리해 뒀다.

[[huggingface-lerobot]]과는 두 방향으로 얽힌다. 데이터 형식이 LeRobot v2를 기반으로 하고, 반대로 LeRobot 쪽에서도 `groot` policy type으로 N1.7을 쓸 수 있다. README는 역할을 갈라 둔다. LeRobot 원생 학습·평가 흐름은 LeRobot 문서로, 모델 내부와 배포 도구, 벤치마크별 예제는 이 저장소로 오라는 것이다.

[[cui-2025-openhelix-a-short-survey-empirical]]의 판정 기준으로 보면 GR00T는 dual-system VLA에서 빠진다. System 1이 실시간 perception 입력을 직접 받아야 한다는 조건 때문인데, 그 기준을 적용한 배제 목록이 [[openhelix-robot-awesome-dual-system-vla]]에 있다.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| embodiment tag | 어떤 로봇의 데이터인지 가리키는 문자열 키. 모델이 state·action 배열을 해석할 modality config를 고른다. 대소문자 무관하고 모든 명령에 필수 |
| relative EEF action space | action을 절대 목표 pose가 아니라 현재 pose로부터의 변화량으로 적는 표현. 사람과 로봇 데이터에 공통으로 쓰여 cross-embodiment 전이의 축이 된다 |
| modality config | state·action 배열의 구간별 이름과 video key를 적은 설정. 데이터셋에서는 `meta/modality.json`, 학습에서는 `--modality-config-path`로 준다 |
| execution horizon | 예측한 action 중 policy 호출 한 번에 실제로 실행하는 개수. N1.6의 `--action-horizon`을 개명한 것으로, 예측 horizon 40과 구분된다 |
| state dropout | 학습 중 state 입력을 확률적으로 떨어뜨려 proprioception 의존을 줄이는 정규화. `--state_dropout_prob`로 조절하고 벤치마크마다 값이 다르다 |
| EgoScale | N1.7 pre-training에 들어간 20,000시간 규모의 1인칭 사람 영상 데이터 |
| Cosmos-Reason2-2B | N1.7의 VLM backbone. Qwen3-VL 계열이고 padding 없이 원래 화면비로 이미지를 인코딩한다. gated 모델이라 HuggingFace 접근 승인이 필요하다 |
| NEW_EMBODIMENT | pre-training에 없던 자기 로봇을 붙일 때 쓰는 embodiment tag |

## 8. 그림 후보 (Figure Candidates)

repo 유형이라 자동 다운로드하지 않았다. 아래는 README 본문에 등장하는 이미지의 원본 URL 목록이며, 필요한 것만 `wiki/assets/nvidia-isaac-gr00t/`에 수동 저장한다.

| id | 위치 | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | README 상단 | 헤더 배너 | manual | (장식 — 불필요) |
| fig02 | 소개 절 | Unitree G1 데모 gif | manual | (확인 필요) |
| fig03 | 소개 절 | AgiBot G1 데모 gif | manual | (확인 필요) |
| fig04 | 소개 절 | YAM 팔 데모 gif | manual | (확인 필요) |
| fig05 | 소개 절 | N1.7 신경망 구조 도식 | manual | ★ wiki 권장 (architecture) |
