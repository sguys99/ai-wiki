---
title: "τ0-VLA (sii-research/tau-0-vla, GitHub repo)"
type: repo
year: 2026
category: physical-ai
raw_path: raw/repos/sii-research-tau-0-vla.md
raw_filename: "sii-research-tau-0-vla.md"
source_collection: external
org: "sii-research"
repo: "tau-0-vla"
url: "https://github.com/sii-research/tau-0-vla"
license: "Apache-2.0"
tags: [physical-ai, vla, world-model, manipulation]
figures:
  - id: fig01
    file: assets/sii-research-tau-0-vla/overview.png
    raw: https://raw.githubusercontent.com/sii-research/tau-0-vla/main/assets/overview.png
    caption: "README 상단의 τ0-VLA 개요 이미지. 논문 Figure 1과 같은 구성의 그림이다"
    strategy: manual
    curated: false
  - id: fig02
    file: assets/sii-research-tau-0-vla/method.png
    raw: https://raw.githubusercontent.com/sii-research/tau-0-vla/main/assets/method.png
    caption: "README Overview 절의 계층형 파이프라인 도식. 논문 Figure 2와 같은 구성의 그림이다"
    strategy: manual
    curated: false
---

## 한 줄 요약 (One-line Summary)

τ0-VLA 논문의 공식 구현 저장소로, Qwen3.5 backbone과 MoT action expert를 쓰는 low-level policy의 post-training과 serving 코드, high-level policy 중 proposal model과 world model의 추론과 fine-tuning 코드, LIBERO 재현 레시피를 담고 checkpoint 네 종을 Hugging Face에 공개한다. value model과 reflective model은 수집 시점에 공개되지 않았다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 저장소 | https://github.com/sii-research/tau-0-vla |
| 설명 | "τ0-VLA: a Hierarchical Robot Foundation Model with World-Model-Guided Test-Time Computation"의 공식 구현 |
| 기본 브랜치 | main (수집 시점 최신 커밋 f1665fbaf624, 2026년 9월 21일) |
| 라이선스 | 코드와 모델 가중치 모두 Apache License 2.0. 동봉 예제 데이터는 `example_data/README.md`의 별도 라이선스를 따른다 |
| 생성과 최종 push | 2026년 7월 26일 생성, 2026년 9월 21일 최종 push (수집 시점 star 631, fork 21) |
| 최상위 구성 | `.gitattributes`, `.gitignore`, `LICENSE`, `README.md`, `assets/`, `configs/`, `deploy/`, `example_data/`, `high_level/`, `pyproject.toml`, `requirements.txt`, `scripts/`, `src/`, `tests/` |
| 논문 | [[physical-ai/cai-2026-tau0-vla-a-hierarchical-robot-foundation]] (arXiv 2608.16885) |
| 프로젝트 페이지 | [[physical-ai/sii-research-2026-tau0-vla-project-page]] (https://tau0-vla.github.io/) |
| 수집 범위 | 최상위 README 전문, 하위 문서 `high_level/README.md`와 `configs/libero/README.md` |

공개 이력은 다음과 같다.

| 날짜 | 공개 내용 |
|---|---|
| 2026년 7월 27일 | 논문, 프로젝트 페이지, Hugging Face의 τ0-VLA 모델 |
| 2026년 8월 19일 | high-level policy 구성 요소를 단계적으로 공개하겠다는 예고 |
| 2026년 9월 20일 | LIBERO post-training과 시뮬레이션 평가 |
| 2026년 9월 21일 | high-level proposal model과 world model의 가중치, 추론 코드, fine-tuning 코드 |

## 2. 주요 기여 (Key Contributions)

1. **low-level policy 공개.** Qwen3.5 vision-language backbone과 Mixture-of-Transformers action expert를 conditional flow matching으로 학습한 policy의 pretrained checkpoint와 post-training 진입점(`scripts/train.sh`)을 공개한다. 40차원 통합 state/action 공간을 그대로 유지한다.
2. **high-level policy 일부 공개.** 세 카메라 이미지와 과제와 memory를 받아 다음 subtask와 갱신된 memory를 내는 proposal model(Qwen3.5-9B full checkpoint), head 카메라 이미지와 subtask를 받아 goal image를 생성하는 world model(Step1X-Edit-v1p2 robotics LoRA)을 각각 추론 예제와 fine-tuning 예제와 함께 낸다.
3. **새 로봇 적용 경로.** `configs/_template/`과 `src/tau0_vla/adapters/_template/`을 출발점으로 다른 데이터셋과 embodiment에 붙이도록 설계했다. AgiBot World 일부를 LeRobot v3.0 형식으로 담은 `example_data/`와 그에 맞춘 post-training 레시피를 함께 제공한다.
4. **LIBERO 재현 레시피.** 8차원 state와 7차원 action을 40차원 checkpoint 인터페이스에 맞추는 변환 절차, 모델 서버와 시뮬레이션 클라이언트를 분리한 환경 구성, 2,000 episode 평가 규약과 결과(평균 97.35%)를 문서로 공개한다.
5. **serving 도구.** joint-control checkpoint용 policy 서버(`deploy.server`), open-loop 평가(`deploy/openloop.py`), LIBERO 전용 end-effector policy 서버(`deploy.libero_server`)를 둔다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 README가 요약한 시스템 구조

- memory를 갖춘 high-level policy가 다음 subtask를 생성하고, 추가 추론이 필요할 때 world model이 이끄는 test-time computation으로 대안을 탐색한다.
- generalist low-level policy가 선택된 subtask를 여러 embodiment에서 실행한다.
- low-level policy는 Qwen3.5 backbone과 MoT action expert의 결합이며 conditional flow matching으로 학습했다.
- 40차원 통합 state/action 공간을 쓰며, 40,115시간의 이종 실제 로봇 데이터와 멀티모달 co-training으로 학습했다.

### 3.2 공개 checkpoint

| 모델 | Hugging Face | 설명 |
|---|---|---|
| τ0-VLA | `sii-research/tau-0-vla` | 로봇 post-training용 pretrained low-level policy |
| τ0-VLA LIBERO | `sii-research/tau-0-vla-libero` | LIBERO 시뮬레이션 평가용 checkpoint |
| τ0-VLA Proposal | `sii-research/tau-0-vla-proposal` | task memory와 세 카메라 입력을 쓰는 high-level planner |
| τ0-VLA World Model | `sii-research/tau-0-vla-world-model` | goal image 생성용 robotics LoRA |

### 3.3 설치

- 참조 환경: Python 3.11, CUDA 12.8, PyTorch 2.7.1.
- 순서: `git clone git@github.com:sii-research/tau-0-vla.git`, `cd tau-0-vla`, `bash scripts/setup.sh`.

### 3.4 high-level 구성 요소

| 구성 요소 | 입력 | 출력 | 가중치 |
|---|---|---|---|
| Proposal | 세 카메라 이미지, 과제, memory | 다음 subtask와 갱신된 memory | Qwen3.5-9B full checkpoint |
| World model | head 카메라 이미지와 subtask | goal image | Step1X-Edit-v1p2 robotics LoRA |

- 두 구성 요소는 서로 다른 Python 환경에서 실행한다.
- 예제 준비: `python scripts/make_high_level_example.py`.
- proposal 추론: `python -m tau0_vla.high_level.proposal.infer --model weights/proposal --input outputs/high_level_example/proposal.jsonl --output outputs/proposals.jsonl`.
- world model 추론: `python -m tau0_world_model.infer --model weights/step1x-base --lora weights/world_model/robotics-lora.safetensors --input outputs/high_level_example/world_model.jsonl --output outputs/goals`.
- 예제는 서로 다른 검증 observation을 쓴다. proposal 예제는 전자레인지 닫기, world model 예제는 전자레인지 열기 장면이다. 예측 subtask와 goal image를 직접 눈으로 확인하는 방식이다.
- fine-tuning 예제는 `proposal_sft.jsonl`과 `world_model_sft.jsonl`로 나뉘어 있다.
- 두 구성 요소를 자기 observation에서 연결하려면 `scripts/proposal_to_world_model.py`로 선택한 proposal과 그 head 카메라 이미지를 짝지은 JSONL을 만든 뒤 world model 추론에 넘긴다.
- README에 value model, reflective model, beam search 실행기는 등장하지 않는다. 즉 논문의 test-time computation 전체 경로는 수집 시점의 공개 코드만으로 구성되지 않는다.

### 3.5 예제 데이터와 post-training

- `example_data/`: AgiBot World 일부, LeRobot v3.0 형식.
- 대응 레시피: `configs/example_agibot_world_gong/`.
- 실행: `bash scripts/train.sh configs/example_agibot_world_gong/train.yaml --model_name_or_path /path/to/tau-0-vla-checkpoint`.
- 다른 데이터셋이나 로봇은 `configs/_template/`과 `src/tau0_vla/adapters/_template/`에서 시작한다.
- 추가 문서: `src/tau0_vla/data/DATASET_FORMAT.md`(데이터셋 형식), `src/tau0_vla/data/README.md`(데이터 파이프라인), `src/tau0_vla/adapters/README.md`(로봇 adapter).

### 3.6 serving과 평가

- 하드웨어 serving은 joint-control checkpoint를 쓰고, LIBERO 시뮬레이션은 전용 end-effector(EEF) policy 서버를 쓴다.
- post-training한 joint-control checkpoint 서버: `python -m deploy.server --model outputs/<run_name>`.
- open-loop 평가: `python deploy/openloop.py --ckpt outputs/<run_name> --no-plot`.
- payload와 action 순서 규약은 `deploy/README.md`에 있다.
- `deploy/`에는 이 밖에 `check_parity.py`, `openloop_with_server.py`, `policy.py`, `warmup.py`, `wire.py`가 있다 (파일명만 확인).

### 3.7 저장소 구성

| 경로 | 내용 |
|---|---|
| `src/tau0_vla/adapters/` | embodiment별 데이터 layout과 배포 입출력 |
| `src/tau0_vla/data/` | LeRobot 로딩, 프롬프트 구성, masking, 정규화 |
| `src/tau0_vla/high_level/` | proposal 추론, serving, fine-tuning |
| `src/tau0_vla/models/` | Qwen3.5 backbone과 flow matching action expert |
| `src/tau0_vla/trainer/` | post-training 진입점 |
| `src/tau0_vla/vlm/` | 멀티모달 collation과 토큰화 |
| `src/tau0_vla/utils/` | 로깅과 run 명세 |
| `configs/` | 재사용 템플릿, AgiBot World 예제, LIBERO 레시피 |
| `deploy/` | policy 서버와 open-loop 평가 |
| `example_data/` | 동봉 AgiBot World 일부 |
| `high_level/` | 구성 요소 가이드, high-level 예제, world model 패키지 |
| `scripts/` | 설치, 학습, 정규화 도구 (`deepspeed/`, `norm_stats/`, `stage_high_level_weights.py`, `validate_gpu_release.sh` 포함) |

### 3.8 LIBERO 변환 규약

LIBERO 고유 규약은 다음과 같다.

```text
state  = [eef_xyz(3), eef_axis_angle(3), gripper_qpos(2)]  # 8D
action = [delta_xyz(3), delta_axis_angle(3), gripper(1)]   # 7D
action_horizon = 10
```

- LIBERO action은 이미 EEF 델타라서 action 경로는 `abs2relative=False`로 두어 현재 state를 한 번 더 빼지 않는다.
- 3차원 axis-angle 회전을 6차원 rot6d로 바꾸므로 EEF pose가 6차원에서 9차원(xyz 3 + rot6d 6)이 된다.
- `train.yaml`은 `data.py`에 정의된 `libero_eef_robot_prompt_ft` 데이터 경로를 고른다.

40차원 배치는 다음과 같다.

| 40차원 슬롯 | 의미 | 활성 |
|---|---|---|
| `0:3` | EEF xyz 또는 delta xyz | 예 |
| `3:9` | EEF rot6d 또는 delta rot6d | 예 |
| `9:18` | 예약과 padding | 아니오, 항상 0 |
| `18` | 왼쪽 그리퍼 | 예 |
| `19:40` | 예약과 padding | 아니오, 항상 0 |

- 변환 순서: `AxisAngle2Rot6D`로 6차원 EEF pose를 9차원으로, `PadToDim(9, 18)`로 EEF 부분을 오른쪽에 padding해 그리퍼가 슬롯 18에 오게 하고, `state_padding_dim=40`과 `action_padding_dim=40`으로 19차원 벡터를 40차원으로 맞춘다.
- state 입력에서 LIBERO의 마주 보는 두 손가락 관절은 `gripper = 0.5 * (qpos[0] - qpos[1])`로 개폐 값 하나로 줄인다.
- 활성 인덱스는 `0:9`와 `18`이다.
- `use_action_mask_loss: true`는 비활성 action 차원을 flow matching 손실에서 뺀다. `vla_inactive_input_zero: true`는 flow 입력에서 비활성 차원을 0으로 유지한다. `zero_state_emb: false`는 state 조건화를 켠 채 둔다.
- 배포 시 예측한 rot6d EEF 회전을 3차원 axis-angle 명령으로 되돌린 뒤 시뮬레이터에 넘긴다.
- `LiberoRobot`은 state 8개 값을 EEF 값 6개와 그리퍼 값 2개로 해석하며, 옛 field metadata로 내보낸 데이터를 읽을 때도 같다.
- 이 배치는 논문 Table IV의 통합 layout(1~3차원 왼쪽 EEF 위치, 4~9차원 왼쪽 EEF 자세, 10~18차원 오른쪽 EEF, 19차원 왼쪽 그리퍼)과 0부터 세는 인덱스 기준으로 일치한다.

### 3.9 LIBERO 학습과 프롬프트

- 학습: `export TAU0_LIBERO_DATA=/path/to/libero` 후 `bash scripts/train.sh configs/libero/train.yaml --model_name_or_path sii-research/tau-0-vla`. 데이터 경로 대신 경로 목록 텍스트 파일도 받는다.
- 로봇 정보를 적은 프롬프트:

```text
You are controlling a robot.
Robot type: Panda
Control mode: end-effector
Whole-body control: disabled
Task: {instruction}
```

이 프롬프트는 논문이 low-level policy에 주는 텍스트 제어 메타데이터(embodiment, 제어 모드, whole-body 구성)를 실제로 직렬화한 형태다.

### 3.10 LIBERO checkpoint와 export

- `sii-research/tau-0-vla`에서 60,000 step post-training했다.
- 다운로드: `hf download sii-research/tau-0-vla-libero --local-dir checkpoints/tau-0-vla-libero`.
- export 구성: `model.safetensors`, `config.json`, `run_spec.json`, `policy_manifest.json`, `processor_config.json`, `tokenizer.json`, `tokenizer_config.json`, `chat_template.jinja`, 그리고 `finch_data_spec/libero-eef-robot-prompt-ft/` 아래 `spec.json`, `components.json`, `field_descriptions.json`, `norm_stats.json`.
- `model.safetensors`의 SHA-256은 `e03870720cbddbd0f3be44ee929a5d23efb9bf9532f0ac1c1bf676224aacc8ec`다.
- export에는 추론에 필요한 가중치, 정규화 통계, 변환, 프롬프트, 카메라 라벨이 모두 들어 있다. 다른 checkpoint를 내보낼 때도 같은 구성물을 넣고 symlink를 풀어 디렉토리를 옮길 수 있게 하라고 안내한다.

### 3.11 LIBERO 실행 환경 분리

| 구분 | 환경 |
|---|---|
| 모델 서버 | Python 3.12.3, PyTorch 2.7.1+cu128, Transformers 5.5.4, NumPy 2.3.5, RTX 4090 (예시). `pip install -e '.[serve]'` |
| 시뮬레이션 클라이언트 | Python 3.10, LIBERO, robosuite 1.4.0, MuJoCo 3.2.3, NumPy 1.24.4, CPU용 torch 2.6.0. 모델과 LeRobot을 import하지 않는다 |

- 서버 실행: `python -m deploy.libero_server --model checkpoints/tau-0-vla-libero --host 127.0.0.1 --port 8000 --seed 7 --infer-mode eager --warmup-steps 1`. 문서 명령은 `eager`를 쓰고 서버 기본값은 최적화 추론 모드 `optim`이다.
- LIBERO는 커밋 `8f1084e3132a39270c3a13ebe37270a43ece2a01`로 고정하고 `--no-deps`로 설치한다. `MUJOCO_GL=egl`을 쓴다.
- 공식 LIBERO 초기 상태 파일이 tensor만이 아니라 NumPy 배열을 담고 있어 `TORCH_FORCE_NO_WEIGHTS_ONLY_LOAD=1`이 필요하다. 문서는 이 설정을 신뢰할 수 있는 공식 벤치마크 자산을 쓰는 시뮬레이터 환경에만 한정하라고 적는다.
- 평가에는 BDDL 파일, 자산, 초기 상태 파일이 필요하고 시연 데이터(demonstration)는 필요 없다.
- headless Linux에서는 OpenGL/EGL loader 라이브러리(Ubuntu: `libgl1 libglx0 libglvnd0 libegl1 libopengl0`)와 NVIDIA EGL driver가 있어야 한다. `libGL.so.1`이나 EGL import 오류는 모델 평가 이전의 렌더링 설정 문제다.

### 3.12 LIBERO 평가 규약

- 네 suite를 과제당 50 rollout으로 평가한다. 40개 과제, 총 2,000 episode다.
- 명령: `python -m deploy.libero.main --args.host 127.0.0.1 --args.port 8000 --args.task-suite-name "$suite" --args.seed 7 --args.replan-steps 8 --args.episode-start 0 --args.num-trials-per-task 50 --args.video-out-path "outputs/libero_eval/$suite"`.

| 표시 이름 | CLI suite | 과제 수 | 최대 action step |
|---|---|---|---|
| Spatial | `libero_spatial` | 10 | 220 |
| Object | `libero_object` | 10 | 280 |
| Goal | `libero_goal` | 10 | 300 |
| Long | `libero_10` | 10 | 520 |

- `libero_90`(400 step)도 지원하지만 네 suite 평균에서 뺀다.
- 모든 실행이 settling step 10회, 256×256 시뮬레이터 렌더, 두 카메라 180도 회전, PIL bilinear 224×224 resize를 쓴다.
- checkpoint는 action 10개를 예측하고 클라이언트는 8개를 실행한 뒤 다시 계획한다.
- 그리퍼 명령은 부호를 뒤집지 않고 그대로 넘긴다.
- 시뮬레이터와 policy의 난수 생성기를 episode마다 seed 7로 초기화해 이전 episode와 독립시킨다. 서버 하나에 클라이언트 하나만 붙인다. 동시 클라이언트는 policy 난수 생성기를 공유하게 된다.
- 출력: `run.json`(인자, 클라이언트 코드 revision과 hash, 서버와 가중치 metadata), `episodes.jsonl`(episode별 과제, 초기 상태 인덱스, 성공, 예외, step 수, 영상 파일명), `results.json`(과제별 누적 카운트와 예외 합계), `results.txt`(정상 종료 후 최종 성공률), episode마다 MP4 한 개(실패 rollout 포함).
- 기존 episode 기록은 덮어쓰지 않는다. 설정, RPC, action, 영상 오류가 나면 0이 아닌 종료 코드로 멈추고 완료된 episode 기록은 남긴다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

README가 직접 보고하는 수치는 LIBERO 하나다. 과제당 50 rollout 기준 성공률(%)이다.

| Spatial | Goal | Object | Long (`libero_10`) | 평균 |
|---|---|---|---|---|
| 97.40 | 98.20 | 98.80 | 95.00 | 97.35 |

- 네 suite 중 Long이 가장 낮고 Object가 가장 높다. 가장 높은 suite와 가장 낮은 suite의 차이는 3.8%p다.
- 이 결과는 논문에 없는 추가 실험이다. 논문은 실제 로봇 평가만 보고한다. 실제 로봇 결과(long-horizon 네 과제, embodiment 간 직접 실행, test-time computation 효과)는 논문 페이지에 정리돼 있다.
- README는 LIBERO에서 baseline 비교를 하지 않는다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **high-level policy가 부분 공개다.** 공개된 것은 proposal model과 world model뿐이다. value model, reflective model, 확신 기반 routing, beam search 실행기가 README에 없어 논문의 test-time computation 경로 전체를 공개 코드로 재현할 수 없다. 2026년 8월 19일 공지는 구성 요소를 단계적으로 공개하겠다고만 적는다.
- **두 high-level 구성 요소의 환경이 분리돼 있다.** proposal과 world model을 별도 Python 환경에서 실행하고 JSONL 파일로 잇는다. 하나의 루프로 묶는 실행기는 제공하지 않는다.
- **high-level 예제가 정성 확인이다.** 예제는 예측 subtask와 goal image를 사람이 직접 보는 방식이며 정량 평가 스크립트는 README에 없다.
- **문서 간 환경 표기가 다르다.** 최상위 README의 참조 환경은 Python 3.11이고, LIBERO 문서의 예시 서버 환경은 Python 3.12.3이다.
- **LIBERO 클라이언트의 보안 설정.** 초기 상태 파일 로딩에 `TORCH_FORCE_NO_WEIGHTS_ONLY_LOAD=1`이 필요하다. 문서 스스로 신뢰할 수 있는 자산에만 한정하라고 경고한다.
- **LIBERO는 동시 평가가 막혀 있다.** 서버 하나에 클라이언트 하나만 붙여야 재현성이 유지된다.
- **실제 로봇 하드웨어 레시피 범위.** 공개된 post-training 예제는 AgiBot World 일부 데이터뿐이고, 논문의 배포 과제별 task-specific checkpoint는 Model checkpoints 표에 없다.

## 6. 관련 연구 (Related Work)

- 같은 연구의 다른 자료: [[physical-ai/cai-2026-tau0-vla-a-hierarchical-robot-foundation]](논문), [[physical-ai/sii-research-2026-tau0-vla-project-page]](프로젝트 페이지).
- 기반 모델: Qwen3.5(backbone과 proposal), Step1X-Edit-v1p2(world model).
- 데이터 형식과 도구: LeRobot v3.0, AgiBot World, DeepSpeed(`scripts/deepspeed/`). LeRobot은 [[physical-ai/huggingface-lerobot]] 참고.
- 시뮬레이션: LIBERO, robosuite, MuJoCo.
- 비슷한 성격의 저장소: [[physical-ai/starvla-vlact]]도 논문 공식 코드와 벤치마크별 checkpoint를 함께 공개하며 논문과 공개 artifact의 차이를 README에 적는다.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| joint-control checkpoint | 관절 제어로 post-training한 low-level checkpoint. 하드웨어 serving 서버가 쓴다 |
| EEF policy server | LIBERO 전용 end-effector 제어 policy 서버 (`deploy.libero_server`) |
| robotics LoRA | Step1X-Edit-v1p2 위에 얹어 로봇 장면의 goal image를 생성하게 만든 world model 가중치 |
| goal image | world model이 현재 head 카메라 이미지와 subtask로부터 생성한, subtask 완료 시점의 예상 장면 |
| `libero_eef_robot_prompt_ft` | LIBERO post-training이 고르는 데이터 경로. 로봇 정보 프롬프트와 EEF 표현을 함께 쓴다 |
| `use_action_mask_loss` | 비활성 action 차원을 flow matching 손실에서 빼는 설정 |
| replan steps | 예측한 action 10개 중 다시 계획하기 전에 실행하는 개수. LIBERO 평가는 8이다 |

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | | "README 상단 τ0-VLA 개요 이미지 (논문 Figure 1과 같은 구성)" | manual | (생략 권장) 논문 페이지에 있음 |
| fig02 | | "계층형 파이프라인 도식 (논문 Figure 2와 같은 구성)" | manual | (생략 권장) 논문 페이지에 있음 |
