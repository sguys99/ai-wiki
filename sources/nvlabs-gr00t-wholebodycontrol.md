---
title: "GR00T-WholeBodyControl (GEAR-SONIC / Decoupled WBC / MotionBricks)"
type: repo
year: 2026
category: physical-ai
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

## 한 줄 요약 (One-line Summary)

SONIC 논문을 실행 가능한 스택으로 내려놓은 NVIDIA의 공식 저장소. 학습 코드(Isaac Lab + PPO), C++/TensorRT 배포 스택, Unitree G1 체크포인트 2종, VR teleoperation 데이터 수집 파이프라인이 한 monorepo에 들어 있다. 여기에 GR00T N1.5/N1.6이 쓴 이전 세대 decoupled 컨트롤러와 MotionBricks 프리뷰가 함께 산다.

## 1. 자료 정보 (Document Information)

- URL: https://github.com/NVlabs/GR00T-WholeBodyControl
- 라이선스: 코드는 Apache-2.0, 모델 가중치는 NVIDIA Open Model License (이중 라이선스)
- 의존: Isaac Lab 2.3.2 (학습 시), Git LFS (필수. 없으면 포인터 파일만 받아 조용히 실패한다)
- 문서 사이트: https://nvlabs.github.io/GR00T-WholeBodyControl/
- 대응 논문: [[luo-2025-sonic-supersizing-motion-tracking]] (arXiv 2511.07820, BibTeX `luo2025sonic`)
- 아카이브한 README 스냅샷: 2026-08-03 수집

News 타임라인이 이 저장소의 성격을 잘 보여준다. 2025-11-12 최초 릴리스는 GR00T N1.5/N1.6용 decoupled WBC였고, 2026-02-19에 GEAR-SONIC(pre-training된 체크포인트, C++ 추론, VR teleoperation)이 들어왔다. 이후 BONES-SEED 공개(2026-03-16), 웹 데모(2026-04-14), MotionBricks 프리뷰(2026-04-27), 학습 코드와 체크포인트 공개(2026-04-10), G1용 end-to-end VLA 워크플로(2026-05-07), 저지연 teleoperation 체크포인트(2026-06-16) 순으로 확장됐다. README의 TODO 목록은 항목 전부가 체크된 상태다.

## 2. 주요 기여 (Key Contributions)

논문 재현에 필요한 것을 실제로 다 풀어놓은 게 이 저장소의 값이다. pre-training된 policy 체크포인트, C++ 추론 스택, teleoperation 스택과 데모 스크립트, motion imitation과 파인튜닝 학습 레시피, 대규모 데이터 수집 워크플로와 VLA 파인튜닝 스크립트, 전처리된 대규모 인체 모션 데이터셋이 모두 공개됐다.

세 프로젝트가 한 저장소를 공유한다. Decoupled WBC는 하체 RL과 상체 IK를 분리한 이전 세대 컨트롤러로 GR00T N1.5와 N1.6이 쓴 것이다. GEAR-SONIC이 현재 세대 generalist 전신 컨트롤러이고, MotionBricks는 애니메이션과 로보틱스용 실시간 latent 생성 모델의 프리뷰다. 같은 저장소 안에 세대가 겹쳐 있어 decoupled 방식과 통합 token 방식의 차이를 코드 수준에서 견줄 수 있다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 체크포인트 2종

둘 다 SONIC universal-token 컨트롤러다. 64차원 latent motion token을 내고 50Hz로 구동되며 입력으로 SMPL 포즈, G1 모션 참조, VR 3-point를 받는다. 배포는 C++와 TensorRT를 쓰며 PyTorch 체크포인트는 Isaac Lab 평가와 추가 학습용이다.

| 모델 | SMPL 참조 입력 | 용도 |
|---|---|---|
| Default SONIC (최초 릴리스) | 20ms 간격 미래 10프레임 ≈ 200ms lookahead | 범용 컨트롤러. motion tracking, planning, teleoperation과 기존 배포 호환. 미래참조 observation은 `step5` |
| Low-latency teleoperation | 20ms 간격 미래 4프레임 ≈ 80ms lookahead | 반응성이 중요한 전신 teleoperation과 VLA 실행. 미래참조 observation은 `step1` |

README가 굳이 못 박아 둔 단서가 하나 있다. lookahead 값은 컨트롤러에 제시되는 참조 구간(reference horizon)일 뿐 end-to-end teleoperation 지연 측정치가 아니다. 실제 지연에는 센싱, 네트워크, 전처리, 추론이 더 들어간다. encoder와 decoder, observation config는 세트로 함께 써야 한다.

### 학습

Bones-SEED(14만 2천 개 이상의 모션, 약 288시간, G1 retarget)로 처음부터 학습하거나 공개 체크포인트에서 파인튜닝한다. 파이프라인은 SOMA CSV를 motion_lib 포맷으로 변환(`convert_soma_csv_to_motion_lib.py`, 120fps 소스를 30fps로) → 필터링(`filter_and_copy_bones_data.py`) → `train_agent_trl.py`를 accelerate로 실행하는 순서다. README는 체크포인트 파인튜닝에 64 GPU 이상을 권한다. 학습만 Isaac Lab의 Python 환경을 따로 요구한다.

### 배포와 인터페이스

C++ 배포는 `gear_sonic_deploy/deploy.sh --input-type zmq_manager real` 형태로 뜬다. VLA 실행은 `launch_inference.py`가 C++ 컨트롤러와 Python 추론 클라이언트를 오케스트레이션한다. 카메라 호스트와 프롬프트를 인자로 받는다. 저지연 모델을 쓸 때는 체크포인트 경로와 observation config를 함께 바꿔 준다.

VR teleoperation은 PICO 헤드셋 경로가 기본이며 Isaac Teleop / CloudXR 경로도 지원한다. 후자는 `isaacteleop[cloudxr]`로 CloudXR 런타임을 in-process 호스팅해 별도 publisher 컨테이너가 필요 없는데, 문서화와 지원 범위가 Thor 백팩을 붙인 G1로 한정된다. ZMQ 프로토콜은 v4이고 2026-03-24 업데이트에서 헤더 크기가 1280바이트로 바뀌었다. 구버전 클라이언트와 섞으면 깨지는 지점이다.

kinematic planner는 스타일을 고르고 키보드나 게임패드로 조향하며 속도와 높이를 실시간으로 조정하는 형태로 노출된다. README가 GIF로 보여주는 스타일은 run, happy, stealth, injured, kneeling, hand crawling, elbow crawling, boxing과 in-the-wild 내비게이션이다.

### 환경 분리

용도별로 가벼운 venv를 따로 만드는 구조다. 학습은 Isaac Lab의 Python 환경, MuJoCo 시뮬레이션은 `.venv_sim`, VR teleoperation은 `.venv_teleop`, 데이터 수집은 `.venv_data_collection`, 실물 배포는 C++ 빌드다. 설치 스크립트가 `uv`로 venv를 자동 생성한다. MotionBricks 체크포인트는 약 2.2GiB라서 기본 setup에서 제외되고 필요할 때 `git lfs pull --include="motionbricks/out/**"`로 따로 받는다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

저장소 자체에는 벤치마크 수치가 없다. 정량 결과는 논문 쪽이다 ([[luo-2025-sonic-supersizing-motion-tracking]]의 4절). README가 제공하는 건 GIF 데모다. teleoperation 쪽은 걷기, 달리기, 측면 이동, 무릎보행, 기상, 점프, 양손 조작, 물체 손 바꾸기, planner 쪽은 위에 적은 스타일들, 그리고 저지연 모델의 3-point teleoperation 바닥 물체 집기 데모가 있다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

README가 직접 경고하는 항목이 실무에서 걸릴 지점이다. Git LFS 없이 clone하면 메시와 ONNX 모델이 포인터 파일로 내려와 조용히 실패한다. 실물 로봇에 체크포인트를 올리기 전에 시뮬레이션에서 먼저 검증하라고 명시한다. lookahead 수치를 지연 성능으로 오해하지 말라는 단서도 같은 성격이다.

지원 범위의 제약도 있다. Isaac Teleop / CloudXR 경로는 Thor 백팩 G1만 문서화됐고, 학습 경로는 Isaac Lab 설치를 별도로 요구한다. 체크포인트는 Unitree G1 2종뿐이며 다른 embodiment 지원은 릴리스 노트에 언급만 있다.

## 6. 관련 연구 (Related Work)

같은 프로젝트의 세 자료가 서로를 보완한다. [[luo-2025-sonic-supersizing-motion-tracking]]이 방법과 정량 근거, [[nvlabs-2026-gear-sonic-project-page]]가 동작 품질의 영상 증거, 이 저장소가 실행 가능한 구현이다. 외부로는 GR00T N1.5와 N1.6(decoupled WBC의 소비자이자 SONIC의 VLA 파트너), Isaac-GR00T N1.7(2026-05 VLA 워크플로의 파인튜닝 대상), BONES-SEED(학습 데이터), Kimodo(웹 데모의 text-to-motion), MotionBricks(같은 저장소의 실시간 latent 생성 모델)로 이어진다.

## 7. 용어집 (Glossary)

- **WBC (Whole-Body Control)**: 균형과 이동을 포함해 몸 전체를 함께 제어하는 문제. decoupled 방식은 하체 RL과 상체 IK를 분리하며 SONIC은 하나의 policy로 통합한다
- **reference lookahead**: 컨트롤러에 미리 보여주는 참조 모션 구간. 지연 측정치가 아니다
- **3-point teleoperation**: 헤드셋과 양손 컨트롤러 3점만으로 상체를 지정하고 하체는 planner가 생성하는 방식
- **Isaac Lab**: NVIDIA의 로봇 학습 프레임워크. SONIC 학습과 평가 환경 (버전 2.3.2)
- **CloudXR / Isaac Teleop**: VR 스트리밍 런타임과 그 위의 teleoperation 경로. `isaacteleop[cloudxr]`로 in-process 호스팅
- **ZMQ manager**: 배포 스택의 메시지 전달 계층. 프로토콜 v4, 헤더 1280바이트
- **MotionBricks**: 같은 저장소의 실시간 latent 생성 스택 프리뷰. VQVAE와 pose, root 체크포인트로 구성
- **Bones-SEED**: 학습에 쓰는 공개 mocap 데이터셋. 14만 2천 개 이상의 모션, 약 288시간, G1 retarget
