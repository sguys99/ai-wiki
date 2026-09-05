---
title: "GR00T-WholeBodyControl (GEAR-SONIC / Decoupled WBC / MotionBricks)"
type: repo
year: 2026
category: physical-ai
source: nvlabs-gr00t-wholebodycontrol.md
raw_path: raw/repos/nvlabs-gr00t-wholebodycontrol.md
raw_filename: "nvlabs-gr00t-wholebodycontrol.md"
source_collection: external
org: "NVlabs"
repo: "GR00T-WholeBodyControl"
url: "https://github.com/NVlabs/GR00T-WholeBodyControl"
license: "Apache-2.0 (code) / NVIDIA Open Model License (model weights)"
tags: [physical-ai, humanoid, teleoperation, edge-inference]
figures: []
---

## 요약

GR00T-WholeBodyControl은 NVIDIA가 humanoid 로봇의 whole-body control 스택을 학습부터 배포까지 한 저장소에 모아 공개한 코드베이스다. Isaac Lab 기반 PPO 학습 코드, C++와 TensorRT 배포 스택, Unitree G1용 공개 체크포인트 2종, VR teleoperation 데이터 수집 파이프라인이 모두 들어 있다.

이 저장소가 유용한 이유는 SONIC 논문을 재현하는 데 필요한 구성 요소를 실제로 전부 공개했다는 점에 있다. README의 TODO 목록은 체크포인트 공개, C++ 추론 스택, 문서, teleoperation 스택, 학습 레시피, 데이터 수집 워크플로, 전처리된 대규모 인체 모션 데이터셋까지 일곱 항목 모두가 완료 표시된 상태다.

이 페이지는 저장소가 제공하는 것과 설치, 실행, 요구사항, 라이선스에 집중한다. SONIC 모델의 구조와 정량 결과는 원 논문 페이지([[physical-ai/luo-2025-sonic-supersizing-motion-tracking]])가 다룬다.

## 배경

humanoid 로봇 제어는 오랫동안 미리 정한 동작마다 컨트롤러를 따로 만드는 방식이었다. 걷기 컨트롤러, 일어서기 컨트롤러, 상체 조작 컨트롤러가 각각 존재하고 상황마다 전환하는 구성이다.

GR00T N1.5와 N1.6이 쓴 Decoupled WBC가 그 구성의 한 형태다. 하체는 강화학습으로, 상체는 IK로 각각 제어하고 둘을 분리해 둔다. whole-body control은 균형과 이동을 포함해 몸 전체를 함께 제어하는 문제인데, 분리 구성에서는 두 부분이 서로의 영향을 온전히 반영하지 못한다.

GEAR-SONIC은 그 분리를 없앤 현재 세대 컨트롤러다. motion tracking은 mocap 목표 포즈를 프레임 단위로 따라가게 학습하는 과제를 말하며, SONIC은 이 과제 하나를 대규모로 키워 걷기와 기어가기부터 teleoperation과 다중 모달 제어까지 하나의 policy가 담당하게 만든다. policy는 현재 observation을 받아 다음 action을 정하는 함수를 말한다.

같은 저장소에 두 세대가 함께 있으므로 분리 방식과 통합 방식의 차이를 코드 수준에서 비교할 수 있다.

## 핵심 개념

**universal token 컨트롤러**는 서로 다른 입력 방식을 하나의 중간 표현으로 모아 받는 구조다. SONIC 체크포인트는 64차원 latent motion token을 출력하며, latent는 겉으로 드러나지 않는 모델 내부의 표현 공간을 가리킨다. 입력으로는 SMPL 포즈, G1 모션 참조, VR 3-point를 모두 받는다.

**reference lookahead**는 컨트롤러에 미리 보여주는 참조 모션의 길이다. 값이 길면 앞을 더 보고 매끄럽게 따라가지만 사람의 조작에 반응하기까지의 체감 지연이 커진다. 값이 짧으면 반대다.

**3-point teleoperation**은 헤드셋과 양손 컨트롤러 3점만으로 상체를 지정하고 나머지 자세는 컨트롤러가 생성하는 방식이다. teleoperation은 사람이 로봇을 원격으로 움직여 시연을 만드는 방식을 말한다.

## 저장소 구성

저장소는 세대가 다른 세 프로젝트를 함께 담는다.

| 프로젝트 | 성격 | 위치 |
|---|---|---|
| Decoupled WBC | 이전 세대 컨트롤러. 하체 강화학습과 상체 IK를 분리. GR00T N1.5와 N1.6이 사용 | `docs/source/references/decoupled_wbc.md` |
| GEAR-SONIC | 현재 세대 generalist humanoid whole-body 컨트롤러 | `gear_sonic`, `gear_sonic_deploy` |
| MotionBricks | 애니메이션과 로보틱스용 실시간 latent 생성 모델의 프리뷰 | `motionbricks` |

최상위 디렉토리 세 개가 각각의 역할을 나눠 맡는다.

- `gear_sonic_deploy`: 실제 하드웨어에 SONIC policy를 올리는 C++ 추론 스택
- `gear_sonic`: PPO 학습, 데이터 처리 파이프라인, 설정 시스템을 포함한 SONIC 학습 스택 전체
- `motionbricks`: MotionBricks 프리뷰. 키보드로 조작하는 G1 인터랙티브 데모, pre-training된 체크포인트, 합성 학습 코드, 모션 표현 문서

MotionBricks는 대규모 latent backbone과 smart primitive를 결합해 초당 1만 5천 프레임의 속도로 zero-shot 모션 합성을 수행한다. tracking 기반인 GEAR-SONIC을 보완하는 위치이며, GEAR-SONIC 파이프라인에 완전히 결합된 정식 릴리스는 프리뷰 시점 기준 약 한 달 뒤로 예고돼 있다.

### 릴리스 흐름

News 타임라인이 저장소가 확장돼 온 순서를 보여준다.

| 시점 | 내용 |
|---|---|
| 2025-11-12 | 최초 릴리스. GR00T N1.5와 N1.6용 Decoupled WBC |
| 2026-02-19 | GEAR-SONIC 공개. pre-training된 체크포인트, C++ 추론, VR teleoperation, 문서 |
| 2026-03-16 | BONES-SEED 공개. 14만 2천 개 이상의 인체 모션, 약 288시간, G1 MuJoCo trajectory 포함 |
| 2026-03-24 | C++ 추론 스택 갱신. 모터 오류 모니터링, TTS 알림, ZMQ 프로토콜 v4, idle 모드 재적응 |
| 2026-04-10 | SONIC 학습 코드와 체크포인트 공개, 추가 embodiment 지원, VLA 데이터 수집 파이프라인 |
| 2026-04-14 | 브라우저 웹 데모. Kimodo의 text-to-motion 생성 사용 |
| 2026-04-27 | MotionBricks 프리뷰. 인터랙티브 G1 데모, VQVAE와 pose, root 체크포인트 |
| 2026-05-07 | G1용 end-to-end VLA 워크플로. teleoperation 데이터 수집, Isaac-GR00T N1.7 fine-tuning, SONIC 배포 |
| 2026-06-16 | 저지연 teleoperation 체크포인트, Isaac Teleop CloudXR 인프로세스 경로 문서 |

## 공개 체크포인트

Unitree G1용 체크포인트 2종이 Hugging Face의 `nvidia/GEAR-SONIC`에 공개돼 있다. 둘 다 SONIC universal token 컨트롤러이고 64차원 latent motion token을 출력하며 50Hz로 구동된다. 즉 1초에 50번 새로운 제어 출력을 낸다.

| 모델 | SMPL 참조 입력 | 미래참조 observation | 용도 |
|---|---|---|---|
| Default SONIC (최초 릴리스) | 20ms 간격 미래 10프레임, 약 200ms lookahead | `step5` | 범용 컨트롤러. motion tracking, planning, teleoperation과 기존 배포 호환 |
| Low-latency teleoperation | 20ms 간격 미래 4프레임, 약 80ms lookahead | `step1` | 반응성이 중요한 whole-body teleoperation과 VLA 실행 |

배포 파일과 학습용 파일이 분리돼 있다. 배포에는 C++와 TensorRT를 쓰고, PyTorch 체크포인트는 Isaac Lab 평가와 추가 학습에 쓴다.

| 모델 | 배포 파일 | PyTorch와 설정 파일 |
|---|---|---|
| Default SONIC | `model_encoder.onnx`, `model_decoder.onnx`, `observation_config.yaml` | `sonic_release/last.pt`, `sonic_release/config.yaml` |
| Low-latency teleoperation | `low_latency/` 아래 같은 세 파일 | `low_latency/last.pt`, `low_latency/config.yaml`, `low_latency/model_config.yaml` |

README가 명시적으로 못 박아 둔 단서가 하나 있다. lookahead 값은 컨트롤러에 제시되는 참조 구간의 길이일 뿐 end-to-end teleoperation 지연의 측정치가 아니다. 실제 체감 지연에는 센싱, 네트워크, 전처리, 추론 시간이 더해진다. 또한 저지연 모델을 쓸 때는 인코더와 디코더, observation 설정을 반드시 한 세트로 함께 써야 한다.

## 설치와 환경 구성

Git LFS가 필수다. 설치하지 않고 clone하면 메시와 ONNX 모델이 실제 데이터 대신 작은 포인터 파일로 내려오고, 오류 없이 조용히 실패한다. 설치는 `sudo apt install git-lfs && git lfs install`이다.

기본 설치 순서는 clone 이후 `git lfs pull`을 실행하고 `python check_environment.py`로 환경을 확인하는 것이다. MotionBricks의 pre-training된 체크포인트는 약 2.2GiB를 추가로 내려받아야 하므로 기본 설치에서 제외되며, 데모를 실행하려면 `git lfs pull --include="motionbricks/out/**" --exclude=""`로 따로 받는다. MotionBricks의 GIF와 메시는 기본 설치에도 포함된다.

용도별로 가벼운 venv를 따로 만드는 구조라서 하나의 무거운 환경을 관리할 필요가 없다.

| 용도 | 환경 | 설치 방법 |
|---|---|---|
| SONIC 학습과 fine-tuning | Isaac Lab의 Python 환경 | Isaac Lab을 먼저 설치한 뒤 `pip install -e "gear_sonic/[training]"` |
| MuJoCo 시뮬레이션 | `.venv_sim` (자동 생성) | `bash install_scripts/install_mujoco_sim.sh` |
| VR teleoperation | `.venv_teleop` (자동 생성) | `bash install_scripts/install_pico.sh` |
| 데이터 수집 | `.venv_data_collection` (자동 생성) | `bash install_scripts/install_data_collection.sh` |
| 실제 로봇 배포 | C++ 빌드 | 배포 문서 참고 |

설치 스크립트가 `uv`로 격리된 venv를 자동 생성하므로 사용자가 직접 관리하지 않아도 된다. 다섯 경로 중 Isaac Lab을 별도로 요구하는 것은 학습뿐이며, 저장소가 명시한 대응 버전은 2.3.2다.

## 학습

학습 경로는 두 가지다. Bones-SEED 데이터셋으로 처음부터 학습하거나, 공개 체크포인트에서 fine-tuning한다. Bones-SEED는 14만 2천 개 이상의 인체 모션과 약 288시간 분량을 담고 Unitree G1으로 retargeting된 mocap 데이터셋이다. retargeting은 사람 동작 데이터를 로봇 형상에 맞게 변환하는 과정을 말한다.

데이터 준비와 학습은 네 단계로 이어진다.

- 학습 의존성 설치: `pip install -e "gear_sonic/[training]"`. Isaac Lab은 별도 설치가 필요하다
- 체크포인트와 SMPL 데이터 내려받기: `python download_from_hf.py --training`
- 포맷 변환과 필터링: `convert_soma_csv_to_motion_lib.py`로 Bones-SEED의 G1 CSV를 motion_lib 포맷으로 바꾸고(120fps 소스를 30fps로 변환), `filter_and_copy_bones_data.py`로 걸러낸다
- 학습 실행: `accelerate launch --num_processes=8 gear_sonic/train_agent_trl.py`에 실험 설정과 체크포인트 경로를 넘긴다. 예시 설정은 `num_envs=4096`, `headless=True`다

README는 공개 체크포인트에서 fine-tuning할 때 GPU 64장 이상을 권장한다. 즉 이 저장소의 학습 경로는 단일 워크스테이션이 아니라 다중 노드 클러스터를 전제한다. 다중 노드 학습, 평가, ONNX 내보내기, SOMA 인코더 설정은 별도 문서가 다룬다.

## 배포와 실행

실행 경로는 두 가지다. 하나는 `gear_sonic_deploy`의 C++ 배포 스택을 직접 실행하는 경로이고, 다른 하나는 Python 런처 `launch_inference.py`가 C++ 컨트롤러와 Python 추론 클라이언트를 함께 조율하는 VLA 실행 경로다. 후자는 `--camera-host`로 카메라 호스트를 지정하고 `--prompt "pick up the cup"`처럼 지시문(instruction)을 문자열로 넘긴다.

저지연 모델을 쓸 때는 체크포인트와 observation 설정을 함께 지정해야 한다. C++ 경로에서는 `--cp`와 `--obs-config`, Python 런처에서는 `--deploy-checkpoint`와 `--deploy-obs-config`가 그 역할을 한다.

| 작업 | 명령 |
|---|---|
| 기본 모델과 planner 내려받기 | `python download_from_hf.py` |
| 저지연 모델과 planner 내려받기 | `python download_from_hf.py --low-latency` |
| 기본 C++ 배포 | `./deploy.sh --input-type zmq_manager real` |
| VLA 추론 실행 | `python gear_sonic/scripts/launch_inference.py --camera-host ... --prompt ...` |
| Isaac Teleop 경로 스트리머 | `python gear_sonic/scripts/pico_manager_thread_server.py --input-source isaac-teleop` |

### VR teleoperation

기본 경로는 PICO VR 헤드셋이다. 사람의 동작을 로봇으로 실시간 전달해 데이터 수집과 인터랙티브 제어에 함께 쓴다. README가 GIF로 보여주는 동작은 걷기, 달리기, 측면 이동, 무릎 자세, 일어서기, 점프, 양손 조작, 물체를 손에서 손으로 넘기기다.

두 번째 경로는 Isaac Teleop과 CloudXR이다. 스트리머가 `isaacteleop[cloudxr]`로 CloudXR 런타임을 인프로세스로 호스팅하므로 별도의 publisher 컨테이너가 필요 없다. 다만 이 경로는 Thor 백팩을 장착한 G1에 대해서만 문서화되고 지원된다.

### kinematic planner

kinematic planner는 실시간 locomotion 생성을 담당한다. locomotion은 다리로 이동하는 과제 영역을 말한다. 사용자는 이동 스타일을 고르고 키보드나 게임패드로 조향하며 속도와 높이를 실행 중에 조정한다.

README가 제시하는 스타일은 run, happy, stealth, injured, kneeling, hand crawling, elbow crawling, boxing 여덟 가지이며, 여기에 실제 환경에서의 내비게이션 데모가 더해진다.

## 실무 주의사항

README가 직접 경고하는 항목이 그대로 실무의 함정이다.

- **Git LFS 누락**: 없이 clone하면 메시와 ONNX 모델이 포인터 파일로 내려와 오류 없이 실패한다
- **ZMQ 헤더 크기 변경**: 2026-03-24 갱신에서 1280바이트로 바뀌었다. 구버전 클라이언트와 섞으면 통신이 깨진다
- **시뮬레이션 선행 검증**: 실제 로봇에 체크포인트를 올리기 전에 시뮬레이션에서 먼저 검증하라고 명시한다
- **lookahead를 지연으로 오해하지 않기**: 4프레임과 10프레임은 참조 구간의 길이이지 실측 지연이 아니다
- **저지연 모델의 파일 세트**: 인코더, 디코더, observation 설정을 함께 바꾸지 않으면 동작이 어긋난다

지원 범위에도 제약이 있다. Isaac Teleop과 CloudXR 경로는 Thor 백팩 G1만 문서화됐고, 공개 체크포인트는 Unitree G1용 2종뿐이다. 추가 embodiment 지원은 릴리스 노트에 언급만 있으며, embodiment는 로봇의 물리적 형상과 그에 딸린 제어 API 구성을 뜻한다. 또한 MotionBricks는 프리뷰 단계여서 GEAR-SONIC 파이프라인에 아직 완전히 결합돼 있지 않다.

정량 벤치마크는 저장소가 제공하지 않는다. 저장소가 보여주는 것은 GIF 데모이며, 수치 결과는 원 논문 페이지에서 확인해야 한다.

## 라이선스와 인용

라이선스가 이중이므로 코드와 가중치를 나눠 확인해야 한다. 코드, 스크립트, 소프트웨어 구성 요소 전체는 Apache License 2.0을 따르고, 학습된 모델 체크포인트와 가중치는 NVIDIA Open Model License를 따른다. 후자는 출처 표기를 조건으로 상업적 사용을 허용하며 NVIDIA의 Trustworthy AI 약관 준수를 요구한다. 라이선스 전문, 서드파티 저작권 고지, DCO 문구는 저장소의 `/legal` 폴더에 모여 있다.

인용은 SONIC 논문의 BibTeX 항목 `luo2025sonic`(arXiv 2511.07820)을 쓴다. 저장소는 코드 일부의 출처로 Beyond Mimic(HybridRobotics/whole_body_tracking)과 Isaac Lab을 밝히고 있으며, 문의는 GEAR WBC 팀 메일 주소로 받는다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| whole-body control | 균형과 이동을 포함해 몸 전체를 함께 제어하는 문제. Decoupled WBC는 하체 강화학습과 상체 IK로 나누고, SONIC은 하나의 policy로 통합한다 |
| universal token 컨트롤러 | SMPL 포즈, G1 모션 참조, VR 3-point 등 서로 다른 입력을 하나의 latent 표현으로 모아 받는 SONIC의 컨트롤러 구조 |
| reference lookahead | 컨트롤러에 미리 제시하는 참조 모션의 길이. 200ms와 80ms 두 값이 공개돼 있으며 지연 측정치가 아니다 |
| 3-point teleoperation | 헤드셋과 양손 컨트롤러 3점만으로 상체를 지정하고 나머지 자세는 컨트롤러가 만들어내는 조작 방식 |
| Bones-SEED | SONIC 학습에 쓰는 공개 mocap 데이터셋. 14만 2천 개 이상의 모션, 약 288시간, Unitree G1 retargeting |
| ZMQ manager | 배포 스택의 메시지 전달 계층. 프로토콜 v4이며 헤더 크기는 1280바이트 |

## 관련 페이지

- [[physical-ai/luo-2025-sonic-supersizing-motion-tracking]]: 이 저장소가 구현하는 SONIC 논문. universal token 설계 근거와 정량 결과는 원 논문 페이지 참고.
- [[physical-ai/nvlabs-2026-gear-sonic-project-page]]: 같은 프로젝트의 공식 데모 페이지. 동작 품질의 영상 증거.
- [[physical-ai/nvidia-2025-gr00t-n1-5-an-improved-open]]: Decoupled WBC를 whole-body 컨트롤러로 사용한 VLA 모델.
- [[physical-ai/nvidia-isaac-gr00t]]: 2026-05 VLA 워크플로에서 fine-tuning 대상이 되는 Isaac-GR00T N1.7 저장소.
- [[overviews/physical-ai-overview]]: physical-ai 카테고리의 분류 뼈대와 학습 경로 허브.
