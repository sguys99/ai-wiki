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

## 요약 (Summary)

[[physical-ai/luo-2025-sonic-supersizing-motion-tracking]]을 실행 가능한 스택으로 내려놓은 NVIDIA 공식 저장소. Isaac Lab 기반 PPO 학습 코드, C++/TensorRT 배포 스택, Unitree G1 체크포인트 2종, VR teleoperation 데이터 수집 파이프라인이 한 monorepo에 들어 있다. 논문 재현에 필요한 것을 실제로 다 풀어놓은 게 이 저장소의 값이다.

세 세대가 한 저장소를 공유한다는 점이 특이하다. Decoupled WBC는 하체 RL과 상체 IK를 분리한 이전 세대 컨트롤러로 GR00T N1.5·N1.6이 쓴 것이고, GEAR-SONIC이 현재 세대 통합 컨트롤러다. MotionBricks는 애니메이션·로보틱스용 실시간 latent 생성 모델의 프리뷰다. decoupled 방식과 통합 token 방식의 차이를 코드 수준에서 견줄 수 있다.

라이선스가 이중이다. 코드는 Apache-2.0이고 모델 가중치는 NVIDIA Open Model License다. 인용·재배포 시 두 조건을 따로 확인해야 한다.

## 릴리스 흐름 (Release Timeline)

News 타임라인이 저장소의 성격을 잘 보여준다.

| 시점 | 내용 |
|---|---|
| 2025-11-12 | 최초 릴리스 — GR00T N1.5/N1.6용 Decoupled WBC |
| 2026-02-19 | GEAR-SONIC 공개 — pre-training된 체크포인트, C++ 추론, VR teleoperation, 문서 |
| 2026-03-16 | BONES-SEED 공개 — 142K+ 모션(약 288시간), G1 MuJoCo trajectory 포함 |
| 2026-03-24 | C++ 추론 스택 갱신 — 모터 오류 모니터링, ZMQ 프로토콜 v4 (헤더 1280바이트) |
| 2026-04-10 | SONIC 학습 코드·체크포인트 공개, 추가 embodiment 지원, VLA 데이터 수집 파이프라인 |
| 2026-04-14 | 브라우저 웹 데모 (Kimodo text-to-motion 사용) |
| 2026-04-27 | MotionBricks 프리뷰 — 인터랙티브 G1 데모, VQVAE·pose·root 체크포인트 |
| 2026-05-07 | G1 end-to-end VLA 워크플로 — teleop 데이터 수집 → Isaac-GR00T N1.7 파인튜닝 → SONIC 배포 |
| 2026-06-16 | 저지연 teleoperation 체크포인트 (4프레임 lookahead) |

README의 TODO 목록은 항목 전부가 체크된 상태다.

## 체크포인트 (Model Card)

둘 다 SONIC universal-token 컨트롤러다. 64차원 latent motion token을 내며 50Hz로 돌고 입력으로 SMPL 포즈, G1 모션 참조, VR 3-point를 받는다.

| 모델 | SMPL 참조 입력 | 용도 |
|---|---|---|
| Default SONIC (최초 릴리스) | 20ms 간격 미래 10프레임 ≈ 200ms lookahead | 범용 컨트롤러. motion tracking·planning·teleoperation과 기존 배포 호환. 미래참조 observation은 `step5` |
| Low-latency teleoperation | 20ms 간격 미래 4프레임 ≈ 80ms lookahead | 반응성이 중요한 전신 teleoperation과 VLA 실행. 미래참조 observation은 `step1` |

README가 굳이 못 박아 둔 단서가 하나 있다. lookahead 값은 컨트롤러에 제시되는 참조 구간(reference horizon)일 뿐 end-to-end teleoperation 지연 측정치가 아니다. 실제 지연에는 센싱·네트워크·전처리·추론이 더 들어간다. encoder·decoder·observation config는 세트로 함께 써야 한다.

배포는 C++와 TensorRT를 쓰며 PyTorch 체크포인트는 Isaac Lab 평가와 추가 학습용이다.

## 학습 (Training)

Bones-SEED로 처음부터 학습하거나 공개 체크포인트에서 파인튜닝한다. 순서는 SOMA CSV를 motion_lib 포맷으로 변환(`convert_soma_csv_to_motion_lib.py`, 120fps 소스를 30fps로) → 필터링(`filter_and_copy_bones_data.py`) → `train_agent_trl.py`를 accelerate로 실행이다. README는 체크포인트 파인튜닝에 64 GPU 이상을 권한다.

용도별로 가벼운 venv를 따로 만드는 구조다. 학습만 Isaac Lab의 Python 환경을 별도로 요구하고, MuJoCo 시뮬레이션은 `.venv_sim`, VR teleoperation은 `.venv_teleop`, 데이터 수집은 `.venv_data_collection`, 실물 배포는 C++ 빌드다. 설치 스크립트가 `uv`로 venv를 자동 생성한다.

## 배포와 인터페이스 (Deployment)

C++ 배포는 `gear_sonic_deploy/deploy.sh --input-type zmq_manager real` 형태로 뜬다. VLA 실행은 `launch_inference.py`가 C++ 컨트롤러와 Python 추론 클라이언트를 오케스트레이션하고 카메라 호스트와 프롬프트를 인자로 받는다. 저지연 모델을 쓸 때는 체크포인트 경로와 observation config를 함께 바꿔 준다.

VR teleoperation은 PICO 헤드셋 경로가 기본이며 Isaac Teleop / CloudXR 경로도 지원한다. 후자는 `isaacteleop[cloudxr]`로 CloudXR 런타임을 in-process 호스팅해 별도 publisher 컨테이너가 필요 없는데, 문서화·지원 범위가 Thor 백팩을 붙인 G1로 한정된다.

kinematic planner는 스타일을 고르고 키보드·게임패드로 조향하며 속도와 높이를 실시간으로 조정하는 형태로 노출된다. README가 GIF로 보여주는 스타일은 run·happy·stealth·injured·kneeling·hand crawling·elbow crawling·boxing과 in-the-wild 내비게이션이다.

## 실무에서 걸리는 지점 (Gotchas)

README가 직접 경고하는 항목들이 그대로 함정이다.

- **Git LFS 필수.** 없이 clone하면 메시와 ONNX 모델이 포인터 파일로 내려와 조용히 실패한다. MotionBricks 체크포인트는 약 2.2GiB라서 기본 setup에서 빠지고 `git lfs pull --include="motionbricks/out/**"`로 따로 받는다
- **ZMQ 헤더 1280바이트.** 2026-03-24에 바뀐 값으로, 구버전 클라이언트와 섞으면 깨진다
- **시뮬레이션 선행 검증.** 실물 로봇에 체크포인트를 올리기 전에 시뮬레이션에서 먼저 확인하라고 명시한다
- **lookahead ≠ 지연.** 4프레임·10프레임은 참조 구간이며 실측 지연이 아니다

지원 범위 제약도 있다. Isaac Teleop / CloudXR 경로는 Thor 백팩 G1만 문서화됐고, 체크포인트는 Unitree G1 2종뿐이다. 다른 embodiment 지원은 릴리스 노트에 언급만 있다.

## 관련 페이지 (Related Pages)

- [[physical-ai/luo-2025-sonic-supersizing-motion-tracking]] — 이 저장소가 구현하는 논문. universal token, FSQ, kinematic planner의 설계 근거와 정량 결과
- [[physical-ai/nvlabs-2026-gear-sonic-project-page]] — 같은 프로젝트의 영상 데모 페이지
- [[overviews/physical-ai-overview]] — physical-ai 카테고리 허브
