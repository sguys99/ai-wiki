---
title: "τ0-VLA (sii-research/tau-0-vla, GitHub repo)"
type: repo
year: 2026
category: physical-ai
source: sii-research-tau-0-vla.md
raw_path: raw/repos/sii-research-tau-0-vla.md
raw_filename: "sii-research-tau-0-vla.md"
source_collection: external
org: "sii-research"
repo: "tau-0-vla"
url: "https://github.com/sii-research/tau-0-vla"
license: "Apache-2.0"
tags: [physical-ai, vla, world-model, manipulation]
---

## 요약

sii-research/tau-0-vla는 [[physical-ai/cai-2026-tau0-vla-a-hierarchical-robot-foundation]] 논문의 공식 구현 저장소다. 논문의 τ0-VLA는 상위 단계가 subtask를 고르고 하위 단계가 그 subtask를 action으로 옮기는 계층형 VLA이며, 상위 결정이 어려울 때만 world model과 value model로 후보를 비교하는 test-time computation을 쓴다. 저장소는 2026년 7월 26일에 만들어졌고 수집 시점(2026년 9월 21일 최종 push) 기준 star 631개를 받았다.

공개 범위는 논문 시스템의 일부다. 하위 실행 모델인 low-level policy는 pretrained checkpoint와 post-training 코드와 serving 서버까지 모두 나왔다. 반면 상위 단계는 네 모델 중 proposal model과 world model 둘만 공개됐고, value model과 reflective model과 beam search 실행기는 아직 없다. 여기에 논문에 없던 LIBERO 시뮬레이션 재현 레시피가 더해져 평균 성공률 97.35%를 보고한다.

코드와 모델 가중치는 모두 Apache License 2.0으로 배포한다. 동봉한 예제 데이터만 `example_data/README.md`에 적힌 별도 라이선스를 따른다.

## 배경

논문은 실제 로봇 평가만 보고한다. AGIBOT G1, ARX AC One, Franka Research 3 세 플랫폼에서 방 청소, 요리, 밀크티 만들기 같은 long-horizon 과제를 10회씩 시행한 결과다. long-horizon 과제는 여러 단계를 이어야 끝나는 긴 과제를 말한다. 이런 평가는 같은 하드웨어와 같은 환경이 없으면 외부에서 다시 확인할 방법이 없다.

저장소는 이 간극을 두 방향으로 메운다. 첫째, 논문의 하위 모델을 다른 로봇과 데이터셋에 붙일 수 있도록 템플릿과 adapter 구조를 제공한다. 둘째, 누구나 실행할 수 있는 공개 시뮬레이터 벤치마크인 LIBERO에서 같은 checkpoint를 post-training하고 평가하는 전 과정을 문서로 공개한다.

공개는 단계적으로 이뤄졌다.

| 날짜 | 공개 내용 |
|---|---|
| 2026년 7월 27일 | 논문, 프로젝트 페이지, Hugging Face의 τ0-VLA 모델 |
| 2026년 8월 19일 | high-level policy 구성 요소를 차례로 공개하겠다는 예고 |
| 2026년 9월 20일 | LIBERO post-training과 시뮬레이션 평가 |
| 2026년 9월 21일 | proposal model과 world model의 가중치, 추론 코드, fine-tuning 코드 |

## 핵심 개념

policy는 현재 observation을 받아 다음 action을 정하는 함수를 말한다. τ0-VLA에는 시간 척도가 다른 policy가 둘 있다. high-level policy는 subtask 경계에서 "숟가락을 집어라" 같은 언어 명령을 정하고, low-level policy는 그 명령을 받아 매 제어 주기마다 로봇 action을 낸다.

subtask는 high-level 추론이 텍스트로 내놓는 중간 단계 명령이다. 저장소에서 두 policy를 잇는 인터페이스가 바로 이 문자열이다. 상위 모델이 만든 subtask를 하위 서버에 언어 명령으로 넘기면 되므로, 두 단계를 따로 공개하고 따로 실행할 수 있다.

world model은 환경의 동역학을 학습해 미래를 예측하는 모델이다. 이 저장소의 world model은 이미지 편집 모델 Step1X-Edit-v1p2에 로봇용 LoRA를 결합한 형태로, head 카메라 이미지 한 장과 subtask를 받아 그 subtask가 끝난 시점의 goal image를 그린다. LoRA는 저랭크 행렬만 학습해 fine-tuning 비용을 줄이는 기법이다.

flow matching은 noise에서 데이터로 향하는 vector field를 학습해 샘플을 만드는 생성 기법이다. low-level policy의 action expert가 이 방식으로 action chunk를 만든다. action chunk는 policy가 한 번에 출력하는 여러 timestep 분량의 action 묶음을 가리킨다.

post-training은 pre-training을 마친 모델을 특정 embodiment나 과제 데이터로 이어서 학습시키는 단계다. embodiment는 로봇의 물리적 형상과 그에 딸린 제어 API 구성을 뜻한다. 저장소의 pretrained checkpoint는 바로 배치하는 policy가 아니라 이 post-training의 출발점으로 공개됐다.

## 공개 구성 요소

### Hugging Face checkpoint

checkpoint는 네 종이다. low-level 둘, high-level 둘로 나뉜다.

| 모델 | Hugging Face 저장소 | 단계 | 용도 |
|---|---|---|---|
| τ0-VLA | `sii-research/tau-0-vla` | low-level | 로봇 post-training용 pretrained policy |
| τ0-VLA LIBERO | `sii-research/tau-0-vla-libero` | low-level | LIBERO 시뮬레이션 평가용 checkpoint |
| τ0-VLA Proposal | `sii-research/tau-0-vla-proposal` | high-level | task memory와 세 카메라 입력을 쓰는 planner |
| τ0-VLA World Model | `sii-research/tau-0-vla-world-model` | high-level | goal image 생성용 robotics LoRA |

README가 요약한 low-level policy 구성은 논문과 같다. Qwen3.5 vision-language backbone에 Mixture-of-Transformers action expert를 결합하고 conditional flow matching으로 학습했다. 상태와 action은 40차원 통합 공간을 쓰고, 학습 데이터는 40,115시간의 이종 실제 로봇 데이터와 멀티모달 co-training mixture다. co-training은 성격이 다른 여러 데이터 원천을 하나의 학습 mixture에 함께 넣는 방식이다.

### 논문 시스템과 공개 범위의 대응

논문의 high-level policy는 네 모델로 이뤄진다. 저장소 공개 상태를 대응시키면 다음과 같다.

| 논문 구성 요소 | 논문에서의 역할 | 저장소 공개 |
|---|---|---|
| proposal model | memory를 갱신하고 후보 subtask를 제안한다 | 공개 (Qwen3.5-9B full checkpoint) |
| world model | 후보 subtask의 완료 이미지를 예측한다 | 공개 (Step1X-Edit-v1p2 robotics LoRA) |
| value model | 예측 이미지에 후보 품질 점수를 매긴다 | 미공개 |
| reflective model | 남은 분기를 보고 최종 subtask를 생성한다 | 미공개 |
| 확신 기반 routing과 beam search | 어려운 결정에만 탐색을 켜고 상위 B개 분기를 남긴다 | README에 언급 없음 |
| low-level policy | subtask를 action chunk로 실행한다 | 공개 (pretrained와 LIBERO checkpoint) |

따라서 공개 코드만으로 실행할 수 있는 상위 경로는 논문의 Plan Once 설정에 가깝다. 결정 지점마다 proposal model이 한 번 예측한 subtask를 그대로 쓰는 방식이다. world model은 별도로 실행해 후보 subtask의 결과 이미지를 확인하는 용도로 쓸 수 있지만, 그 이미지를 채점하고 분기를 고르는 단계는 사용자가 직접 구성해야 한다.

## 설치

최상위 README가 밝힌 참조 환경은 Python 3.11, CUDA 12.8, PyTorch 2.7.1이다. 설치는 세 단계다.

```bash
git clone git@github.com:sii-research/tau-0-vla.git
cd tau-0-vla
bash scripts/setup.sh
```

high-level의 두 구성 요소는 이 기본 환경과 별도로 각자의 Python 환경을 쓴다. LIBERO 평가도 모델 서버 환경과 시뮬레이션 클라이언트 환경을 나눈다. 즉 전 과정을 실행하려면 최소 네 개의 환경(low-level 학습과 serving, proposal, world model, LIBERO 클라이언트)이 필요하다.

## high-level 구성 요소

### 입력과 출력

두 구성 요소는 입력과 출력이 다르고 기반 모델도 다르다.

| 구성 요소 | 입력 | 출력 | 가중치 |
|---|---|---|---|
| Proposal | 세 카메라 이미지, 과제, memory | 다음 subtask와 갱신된 memory | Qwen3.5-9B full checkpoint |
| World model | head 카메라 이미지와 subtask | goal image | Step1X-Edit-v1p2 robotics LoRA |

proposal model이 출력하는 memory는 논문의 execution memory다. 지금까지 무엇을 끝냈는지를 텍스트로 유지하는 기록이며, 다음 결정 단계의 입력으로 다시 들어간다. 이 순환 덕분에 소금처럼 넣어도 눈에 보이는 변화가 없는 단계도 완료 여부를 추적할 수 있다.

### 예제 실행

예제는 데이터 준비, proposal 추론, world model 추론의 세 단계로 실행한다.

1. `python scripts/make_high_level_example.py`로 동봉 예제를 만든다.
2. proposal 환경에서 `python -m tau0_vla.high_level.proposal.infer --model weights/proposal --input outputs/high_level_example/proposal.jsonl --output outputs/proposals.jsonl`을 실행한다.
3. world model 환경으로 바꿔 `python -m tau0_world_model.infer --model weights/step1x-base --lora weights/world_model/robotics-lora.safetensors --input outputs/high_level_example/world_model.jsonl --output outputs/goals`를 실행한다.

world model 명령은 base 모델(`weights/step1x-base`)과 LoRA 파일을 따로 받는다. 즉 Hugging Face의 world model 저장소는 LoRA 가중치만 담고 있고, Step1X-Edit base 가중치는 별도로 준비해야 한다. `scripts/stage_high_level_weights.py`가 저장소에 함께 있다 (파일명만 확인했고 README에 설명은 없다).

두 예제는 서로 다른 검증 observation을 쓴다. proposal 예제는 전자레인지를 닫는 장면이고 world model 예제는 전자레인지를 여는 장면이다. 결과 확인은 예측된 subtask 문장과 goal image를 사람이 직접 보는 방식이다.

### 두 구성 요소의 연결과 fine-tuning

자기 observation에서 두 구성 요소를 이으려면 중간 파일을 거친다. `scripts/proposal_to_world_model.py`가 선택한 proposal과 그 observation의 head 카메라 이미지를 짝지은 JSONL을 만들고, 이 파일을 world model 추론에 넘긴다. 환경이 분리돼 있어 한 프로세스 안의 루프가 아니라 파일 기반 파이프라인이다.

fine-tuning 예제는 구성 요소별로 `proposal_sft.jsonl`과 `world_model_sft.jsonl`에 나뉘어 있다. 논문은 proposal model을 memory가 일부러 어긋난 입력(뒤처짐, 앞서감, 인지 못한 실패)으로 학습시켜 memory를 스스로 고치게 했는데, 이 SFT 데이터가 그 구성을 따르는지는 README만으로는 확인할 수 없다.

## low-level post-training과 serving

### 예제 데이터와 새 로봇 적용

`example_data/`는 AgiBot World 데이터 일부를 LeRobot v3.0 형식으로 담는다. 같은 데이터에 맞춘 post-training 레시피가 `configs/example_agibot_world_gong/`에 있다.

```bash
bash scripts/train.sh configs/example_agibot_world_gong/train.yaml \
    --model_name_or_path /path/to/tau-0-vla-checkpoint
```

다른 데이터셋이나 로봇은 두 템플릿에서 시작한다. `configs/_template/`은 학습 설정을, `src/tau0_vla/adapters/_template/`은 embodiment별 데이터 layout과 배포 입출력을 정의한다. 데이터 쪽 세부는 세 문서로 나뉜다.

- `src/tau0_vla/data/DATASET_FORMAT.md`: 데이터셋 형식
- `src/tau0_vla/data/README.md`: 데이터 파이프라인
- `src/tau0_vla/adapters/README.md`: 로봇 adapter

### serving 서버와 open-loop 평가

serving은 제어 방식에 따라 서버가 갈린다. 실제 하드웨어 serving은 관절 제어로 post-training한 joint-control checkpoint를 쓰고, LIBERO 시뮬레이션은 end-effector 제어 전용 서버를 쓴다. end-effector는 로봇 팔 끝에서 물체와 접촉하는 부분이다.

| 용도 | 명령 |
|---|---|
| joint-control checkpoint 서버 | `python -m deploy.server --model outputs/<run_name>` |
| open-loop 평가 | `python deploy/openloop.py --ckpt outputs/<run_name> --no-plot` |
| LIBERO EEF 서버 | `python -m deploy.libero_server --model ...` |

open-loop 실행은 한 번 계산한 action 묶음을 중간 피드백 없이 끝까지 내보내는 방식이다. README는 `deploy/openloop.py`의 세부 동작을 설명하지 않으며, 같은 디렉토리에 서버를 거치는 변형 `openloop_with_server.py`가 함께 있다. 서버가 받는 payload 형식과 action 순서 규약은 `deploy/README.md`에 정리돼 있다.

## 저장소 구성

핵심 패키지 `src/tau0_vla/`는 일곱 하위 모듈로 나뉜다.

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
| `scripts/` | 설치, 학습, 정규화 도구 |

world model 패키지는 `src/` 밖의 `high_level/` 아래에 따로 있다. world model을 proposal과 다른 Python 환경에서 실행하라는 README 안내와 맞물리는 배치다. `scripts/`에는 `deepspeed/`와 `norm_stats/` 디렉토리, GPU 공개 검증용 `validate_gpu_release.sh`도 들어 있다.

## LIBERO 재현 레시피

### 고유 규약과 40차원 배치

LIBERO는 Franka Panda 한 팔을 end-effector로 제어하는 벤치마크라 고유 규약이 8차원 state와 7차원 action이다.

```text
state  = [eef_xyz(3), eef_axis_angle(3), gripper_qpos(2)]  # 8D
action = [delta_xyz(3), delta_axis_angle(3), gripper(1)]   # 7D
action_horizon = 10
```

pretrained checkpoint는 40차원 입출력을 기대하므로 이 벡터를 40차원 배치에 맞춰 옮겨야 한다. 핵심 원칙은 checkpoint의 통합 인터페이스를 바꾸지 않고 LIBERO 값을 정해진 슬롯에 채운 뒤 나머지를 0으로 두는 것이다.

| 40차원 슬롯 | 의미 | 활성 |
|---|---|---|
| `0:3` | EEF xyz 또는 delta xyz | 예 |
| `3:9` | EEF rot6d 또는 delta rot6d | 예 |
| `9:18` | 예약과 padding | 아니오, 항상 0 |
| `18` | 왼쪽 그리퍼 | 예 |
| `19:40` | 예약과 padding | 아니오, 항상 0 |

이 배치는 논문 부록 Table IV의 통합 layout과 정확히 대응한다. 논문은 1번부터 세어 1~3차원을 왼쪽 EEF 위치, 4~9차원을 왼쪽 EEF 자세, 10~18차원을 오른쪽 EEF, 19차원을 왼쪽 그리퍼로 둔다. 0부터 세는 코드 인덱스로 옮기면 `0:3`, `3:9`, `9:18`, `18`이 된다. 즉 LIBERO의 한 팔은 통합 공간의 왼팔 자리에 들어가고 오른팔 자리는 비워 둔다.

### 변환 절차

변환은 세 단계로 이뤄진다.

1. `AxisAngle2Rot6D`가 3차원 axis-angle 회전을 6차원 rot6d 표현으로 바꾼다. EEF pose는 xyz 3차원과 rot6d 6차원을 합쳐 9차원이 된다.
2. `PadToDim(9, 18)`이 EEF 부분을 오른쪽으로 padding해 뒤따르는 그리퍼 값이 슬롯 18에 오게 한다.
3. `state_padding_dim=40`과 `action_padding_dim=40`이 조립된 19차원 벡터를 40차원으로 늘린다.

state 입력의 그리퍼는 따로 처리한다. LIBERO는 마주 보는 두 손가락 관절 값을 주는데, 이를 `gripper = 0.5 * (qpos[0] - qpos[1])`로 개폐 값 하나로 줄인다. 결과적으로 활성 인덱스는 `0:9`와 `18` 두 구간이다.

action 쪽에는 이중 변환을 막는 설정이 하나 있다. LIBERO action은 이미 EEF 델타이므로 action 경로를 `abs2relative=False`로 두어 현재 state를 한 번 더 빼지 않는다. 배포 시에는 반대 방향으로 예측된 rot6d 회전을 3차원 axis-angle 명령으로 되돌린 뒤 시뮬레이터에 넘긴다.

### 마스킹 설정

세 설정이 비활성 차원을 다룬다. 논문이 masked flow matching이라 부른 기법을 설정 파일 수준에서 켜는 방식이다.

| 설정 | 값 | 효과 |
|---|---|---|
| `use_action_mask_loss` | `true` | 비활성 action 차원을 flow matching 손실에서 뺀다 |
| `vla_inactive_input_zero` | `true` | flow 입력에서 비활성 action 차원을 0으로 유지한다 |
| `zero_state_emb` | `false` | state 조건화를 끄지 않고 그대로 쓴다 |

### 학습과 로봇 정보 프롬프트

학습은 데이터 경로를 환경 변수로 주고 공용 학습 스크립트를 부른다. 데이터 경로 대신 경로를 한 줄에 하나씩 적은 텍스트 manifest도 받는다.

```bash
export TAU0_LIBERO_DATA=/path/to/libero
bash scripts/train.sh configs/libero/train.yaml \
  --model_name_or_path sii-research/tau-0-vla
```

`train.yaml`은 `data.py`에 정의된 `libero_eef_robot_prompt_ft` 데이터 경로를 고른다. 이 경로는 매 샘플 앞에 로봇 정보를 적은 프롬프트를 붙인다.

```text
You are controlling a robot.
Robot type: Panda
Control mode: end-effector
Whole-body control: disabled
Task: {instruction}
```

이 프롬프트가 논문이 low-level policy에 주는 텍스트 제어 메타데이터의 실제 형태다. 논문은 embodiment, 제어 모드, whole-body control 사용 여부를 텍스트로 넘긴다고만 적었고, 저장소가 그 직렬화를 보여준다. 하나의 checkpoint가 출력 헤드를 바꾸지 않고 여러 로봇을 다루는 근거가 이 텍스트 조건과 40차원 마스킹의 조합이다.

`LiberoRobot`은 state 8개 값을 EEF 값 6개와 그리퍼 값 2개로 해석한다. 옛 field metadata로 내보낸 데이터를 읽을 때도 같은 해석을 쓴다.

### checkpoint와 export 구성

공개 LIBERO checkpoint는 `sii-research/tau-0-vla`에서 60,000 step post-training했다. `hf download sii-research/tau-0-vla-libero --local-dir checkpoints/tau-0-vla-libero`로 받는다.

export는 가중치만이 아니라 추론에 필요한 모든 구성물을 한 디렉토리에 담는다.

| 구성물 | 파일 |
|---|---|
| 가중치와 설정 | `model.safetensors`, `config.json`, `run_spec.json`, `policy_manifest.json` |
| 전처리와 토크나이저 | `processor_config.json`, `tokenizer.json`, `tokenizer_config.json`, `chat_template.jinja` |
| 데이터 명세 | `finch_data_spec/libero-eef-robot-prompt-ft/` 아래 `spec.json`, `components.json`, `field_descriptions.json`, `norm_stats.json` |

이 export의 `model.safetensors` SHA-256은 `e03870720cbddbd0f3be44ee929a5d23efb9bf9532f0ac1c1bf676224aacc8ec`다. export에는 정규화 통계, 변환, 프롬프트, 카메라 라벨까지 들어 있어 다른 위치로 옮겨도 그대로 추론할 수 있다. 문서는 다른 checkpoint를 내보낼 때도 같은 구성물을 넣고 symlink를 실제 파일로 풀라고 안내한다.

### 모델 서버와 시뮬레이션 클라이언트

LIBERO 평가는 모델과 시뮬레이터를 서로 다른 환경에서 실행하고 네트워크로 잇는다. 두 환경의 의존성 버전이 크게 달라서다.

| 구분 | 환경 | 비고 |
|---|---|---|
| 모델 서버 | Python 3.12.3, PyTorch 2.7.1+cu128, Transformers 5.5.4, NumPy 2.3.5, RTX 4090 (예시) | `pip install -e '.[serve]'`로 serving 의존성 설치 |
| 시뮬레이션 클라이언트 | Python 3.10, LIBERO, robosuite 1.4.0, MuJoCo 3.2.3, NumPy 1.24.4, CPU용 torch 2.6.0 | 모델과 LeRobot을 import하지 않는다 |

서버 실행 예시는 `python -m deploy.libero_server --model checkpoints/tau-0-vla-libero --host 127.0.0.1 --port 8000 --seed 7 --infer-mode eager --warmup-steps 1`이다. 문서의 명령은 `eager` 모드를 쓰지만 서버 기본값은 최적화 추론 모드인 `optim`이다.

클라이언트 쪽 준비에는 주의할 점이 셋 있다.

- LIBERO는 커밋 `8f1084e3132a39270c3a13ebe37270a43ece2a01`로 고정하고 `--no-deps`로 설치한다. 렌더링은 `MUJOCO_GL=egl`을 쓴다.
- 공식 LIBERO 초기 상태 파일이 tensor만이 아니라 NumPy 배열을 담고 있어 `TORCH_FORCE_NO_WEIGHTS_ONLY_LOAD=1`이 필요하다. 이 설정은 PyTorch의 안전한 가중치 로딩을 끄므로, 문서는 신뢰할 수 있는 공식 벤치마크 자산을 쓰는 시뮬레이터 환경에만 한정하라고 적는다.
- headless Linux에서는 OpenGL/EGL loader 라이브러리(Ubuntu 기준 `libgl1 libglx0 libglvnd0 libegl1 libopengl0`)와 NVIDIA EGL driver가 있어야 한다. `libGL.so.1`이나 EGL import 오류는 모델 평가 이전의 렌더링 설정 문제다.

평가에는 BDDL 파일, 자산, 초기 상태 파일이 필요하다. 시연 데이터(demonstration)는 평가에 필요 없다.

### 평가 규약

평가는 네 suite를 과제당 50 rollout으로 실행한다. rollout은 policy를 실행해 trajectory를 만들어내는 과정이다. 네 suite가 각 10개 과제이므로 총 40개 과제, 2,000 episode다.

| 표시 이름 | CLI suite | 과제 수 | 최대 action step |
|---|---|---|---|
| Spatial | `libero_spatial` | 10 | 220 |
| Object | `libero_object` | 10 | 280 |
| Goal | `libero_goal` | 10 | 300 |
| Long | `libero_10` | 10 | 520 |

`libero_90`(최대 400 step)도 지원하지만 네 suite 평균에서는 뺀다. 실행 명령은 suite마다 `python -m deploy.libero.main`에 `--args.` 접두 인자로 호스트, 포트, suite 이름, seed 7, replan step 8, 과제당 시행 50회, 영상 출력 경로를 준다.

재현성을 위해 고정한 조건은 다음과 같다.

- 모든 실행이 settling step 10회, 256×256 시뮬레이터 렌더, 두 카메라 180도 회전, PIL bilinear 224×224 resize를 쓴다.
- checkpoint는 action 10개를 예측하고 클라이언트는 그중 8개를 실행한 뒤 다시 계획한다. 논문의 실제 로봇 설정은 action horizon 30이었으므로 LIBERO 레시피는 더 짧은 chunk를 쓴다.
- 그리퍼 명령은 부호를 뒤집지 않고 그대로 넘긴다.
- 시뮬레이터와 policy의 난수 생성기를 episode마다 seed 7로 다시 초기화한다. 즉 각 episode 결과가 앞선 episode에 의존하지 않는다.
- 서버 하나에 클라이언트 하나만 붙인다. 동시 클라이언트는 policy 난수 생성기를 공유해 재현성을 깨뜨린다.

평가 출력은 suite 디렉토리마다 다섯 종류가 남는다.

| 파일 | 내용 |
|---|---|
| `run.json` | 인자, 클라이언트 코드 revision과 hash, 서버와 가중치 metadata |
| `episodes.jsonl` | episode별 과제, 초기 상태 인덱스, 성공, 예외, step 수, 영상 파일명 |
| `results.json` | 과제별 누적 카운트와 예외 합계 |
| `results.txt` | 정상 종료 후 최종 성공률 |
| episode별 MP4 | 실패한 rollout을 포함한 모든 episode 영상 |

기존 episode 기록은 덮어쓰지 않는다. 설정, RPC, action, 영상 오류가 나면 0이 아닌 종료 코드로 멈추고 완료된 episode 기록은 그대로 남겨 점검할 수 있게 한다.

## 결과

README가 직접 보고하는 수치는 LIBERO 하나다. 과제당 50 rollout 기준 성공률이다.

| Spatial | Goal | Object | Long (`libero_10`) | 평균 |
|---|---|---|---|---|
| 97.40% | 98.20% | 98.80% | 95.00% | 97.35% |

네 suite 모두 95% 이상이다. 가장 높은 Object(98.80%)와 가장 낮은 Long(95.00%)의 차이는 3.8%p이며, 최대 520 step으로 가장 긴 Long suite에서 성공률이 가장 낮다. 이 결과는 실제 로봇 데이터로 pre-training한 40차원 통합 checkpoint가 한 팔 end-effector 시뮬레이션 과제에도 60,000 step post-training으로 적응한다는 점을 보여준다.

README는 이 표에 baseline을 함께 싣지 않는다. 따라서 다른 VLA 대비 우열은 이 자료만으로 판단할 수 없다. 논문의 실제 로봇 결과(long-horizon 네 과제에서 계층 구조 평균 SR 45.00%, test-time computation으로 Book Organization 6/10에서 9/10 등)는 [[physical-ai/cai-2026-tau0-vla-a-hierarchical-robot-foundation]]에 정리돼 있다.

## 한계

- **high-level policy가 부분 공개다.** value model, reflective model, 확신 기반 routing, beam search 실행기가 README에 없다. 논문의 핵심 기여인 world model이 이끄는 test-time computation을 공개 코드만으로 재현할 수 없고, 2026년 8월 19일 공지는 단계적 공개만 예고한다.
- **high-level 두 구성 요소가 파일로만 이어진다.** proposal model과 world model이 서로 다른 Python 환경에서 실행되고 JSONL 파일로 연결된다. closed-loop 제어 루프 안에서 둘을 함께 실행하는 코드는 제공하지 않는다.
- **high-level 예제가 정성 확인이다.** 예측 subtask와 goal image를 사람이 직접 보는 방식이며, 논문처럼 다음 subtask 예측 정확도를 재는 평가 스크립트는 README에 없다.
- **문서 간 환경 표기가 다르다.** 최상위 README의 참조 환경은 Python 3.11인데 LIBERO 문서의 예시 서버 환경은 Python 3.12.3이다.
- **LIBERO 클라이언트의 보안 설정.** 초기 상태 파일 로딩에 `TORCH_FORCE_NO_WEIGHTS_ONLY_LOAD=1`이 필요해 PyTorch의 안전 로딩을 꺼야 한다.
- **LIBERO 평가는 병렬화가 막혀 있다.** 서버 하나에 클라이언트 하나만 붙여야 결과가 재현된다. README는 2,000 episode를 병렬로 나눠 실행하는 방법을 따로 안내하지 않는다.
- **실제 로봇 레시피 범위.** 공개된 하드웨어 post-training 예제는 AgiBot World 일부 데이터뿐이다. 논문의 배포 과제(Clean Room, Make Milk Tea 등)용 task-specific checkpoint는 checkpoint 표에 없다.
- **LIBERO 결과에 비교 대상이 없다.** baseline 없이 τ0-VLA 수치만 보고한다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| joint-control checkpoint | 관절 제어로 post-training한 low-level checkpoint. 실제 하드웨어 serving 서버가 쓴다 |
| EEF policy server | LIBERO 전용 end-effector 제어 policy 서버 (`deploy.libero_server`) |
| robotics LoRA | Step1X-Edit-v1p2 위에 결합해 로봇 장면의 goal image를 생성하게 만든 world model 가중치 |
| goal image | world model이 현재 head 카메라 이미지와 subtask로부터 생성한, subtask 완료 시점의 예상 장면 |
| `use_action_mask_loss` | 비활성 action 차원을 flow matching 손실에서 빼는 설정 |
| replan steps | 예측한 action 10개 중 다시 계획하기 전에 실행하는 개수. LIBERO 평가는 8이다 |

## 관련 페이지

- [[physical-ai/cai-2026-tau0-vla-a-hierarchical-robot-foundation]]: 이 저장소가 구현하는 논문. test-time computation 절차와 실제 로봇 평가 결과를 다룬다.
- [[physical-ai/sii-research-2026-tau0-vla-project-page]]: 같은 연구의 프로젝트 페이지. rollout 영상과 execution memory 단독 개선 폭을 싣는다.
- [[physical-ai/huggingface-lerobot]]: 예제 데이터와 데이터 로더가 쓰는 LeRobot 형식의 원 저장소.
- [[physical-ai/starvla-vlact]]: 논문 공식 코드와 벤치마크별 checkpoint를 함께 공개하는 비슷한 성격의 VLA 저장소.
- [[physical-ai/liu-2026-libero-recover-beyond-task-success-towards]]: LIBERO 위에서 성공률을 넘어 회복 능력을 재는 확장 벤치마크.
- [[overviews/physical-ai-overview]]: physical-ai 도메인 전체 지도.
