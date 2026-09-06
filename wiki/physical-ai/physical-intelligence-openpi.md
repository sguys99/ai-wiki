---
title: "openpi: Open-source models and packages for robotics (π₀ / π₀-FAST / π₀.₅)"
type: repo
year: 2025
category: physical-ai
source: physical-intelligence-openpi.md
raw_path: raw/repos/physical-intelligence-openpi.md
raw_filename: "physical-intelligence-openpi.md"
source_collection: external
org: "Physical-Intelligence"
repo: "openpi"
url: "https://github.com/Physical-Intelligence/openpi"
license: "Apache-2.0"
tags: [physical-ai, vla, robot-learning, manipulation, edge-inference]
---

## 요약

Physical Intelligence가 π0 계열 vision-language-action model을 코드와 가중치째 공개한 공식 저장소다. 라이선스는 Apache-2.0이고, 1만 시간이 넘는 로봇 데이터로 pre-training을 마친 base checkpoint 3종과 플랫폼별 fine-tuned checkpoint 7종을 함께 제공한다.

이 저장소의 가치는 성능 수치가 아니라 재현 경로에 있다. 논문만 내고 가중치를 닫아 둔 선행 VLA와 달리 사용자는 pre-training 단계를 건너뛰고 자기 데이터로 fine-tuning만 하면 된다. 하드웨어 문턱도 낮은 편이다. 추론은 8GB를 넘는 GPU면 충분하고 LoRA fine-tuning도 22.5GB라 RTX 4090 한 장에서 실행된다.

다만 저장소는 스스로를 실험이라고 규정한다. π0는 Physical Intelligence 자체 로봇을 위해 개발됐고 그 로봇들은 널리 쓰이는 ALOHA나 DROID와 구성이 다르다. 따라서 다른 플랫폼으로 옮겼을 때 모든 시도가 성공하리라 기대하지 않는다고 README가 직접 밝힌다.

## 배경

VLA 연구의 재현을 막아 온 요인은 pre-training 비용이다. 1만 시간 규모의 로봇 데이터를 다시 모아 학습하는 일은 개별 연구실이 감당하기 어렵다.

openpi는 이 단계를 이미 끝낸 상태로 배포해 사용자의 진입 지점을 fine-tuning으로 옮긴다. 알고리즘의 정량 평가는 원 논문 페이지가 다루며, 이 페이지는 저장소가 제공하는 모델과 실행 절차에 집중한다.

## 핵심 개념

flow matching은 noise에서 목표 분포로 가는 연속 변환의 속도장을 학습하는 생성 기법이다. π0는 이 방식으로 연속값 action을 직접 생성한다.

action chunk는 policy가 한 번에 출력하는 여러 timestep 분량의 action 묶음이다. policy는 현재 observation을 받아 다음 action을 정하는 함수를 말한다. openpi의 추론 API는 호출 한 번에 이 묶음을 반환한다.

FAST tokenizer는 action chunk를 압축해 이산 토큰으로 적는 방식이다. π0-FAST는 이 토큰을 autoregressive로 예측하므로 언어 모델과 같은 방식으로 동작한다.

knowledge insulation은 backbone을 FAST token으로 지도하고 action expert의 gradient는 backbone으로 흘리지 않는 학습 레시피다. π0.5는 이 레시피로 학습해 open-world 일반화를 높였다.

## 제공 체크포인트

### base 모델

세 가지 base 모델은 모두 1만 시간 이상의 로봇 데이터로 pre-training을 마쳤으며, 그대로 쓰기보다 fine-tuning의 출발점으로 쓰도록 만들어졌다.

| 모델 | 성격 | checkpoint 경로 |
|---|---|---|
| π0 | flow matching 기반 base VLA | `gs://openpi-assets/checkpoints/pi0_base` |
| π0-FAST | FAST tokenizer를 쓰는 autoregressive base VLA | `gs://openpi-assets/checkpoints/pi0_fast_base` |
| π0.5 | knowledge insulation으로 학습해 open-world 일반화를 높인 개선판 | `gs://openpi-assets/checkpoints/pi05_base` |

π0.5는 저장소 안에서 학습과 추론 모두 flow matching head만 지원한다. 즉 이산 토큰 head를 쓰는 경로는 저장소에서 선택할 수 없다.

### expert 모델

expert checkpoint는 base 모델을 특정 로봇과 과제에 fine-tune한 것으로, 대상 로봇에서 바로 실행하는 용도다.

| 모델 | 용도 | 내용 |
|---|---|---|
| π0-FAST-DROID | 추론 | DROID 데이터셋으로 fine-tune. DROID 로봇 플랫폼의 새 장면에서 다양한 tabletop manipulation을 zero-shot으로 수행한다 |
| π0-DROID | fine-tuning | 같은 데이터로 fine-tune한 π0. 추론이 더 빠른 대신 언어 명령 따르기가 약할 수 있다 |
| π0-ALOHA-towel | 추론 | 내부 ALOHA 데이터로 fine-tune. 여러 종류의 수건을 zero-shot으로 갠다 |
| π0-ALOHA-tupperware | 추론 | 내부 ALOHA 데이터로 fine-tune. 반찬통에서 음식을 꺼낸다 |
| π0-ALOHA-pen-uncap | 추론 | 공개 ALOHA 데이터로 fine-tune. 펜 뚜껑을 연다 |
| π0.5-LIBERO | 추론 | LIBERO 벤치마크용 fine-tune. 해당 벤치마크에서 최고 성능을 낸다 |
| π0.5-DROID | 추론과 fine-tuning | DROID 데이터에 knowledge insulation을 적용. 빠른 추론과 좋은 언어 따르기를 함께 목표로 한다 |

저자들은 이 checkpoint들이 사용자의 로봇에서 동작한다고 보장하지 않는다. 비교적 작은 데이터로 fine-tune했기 때문이다. 다만 DROID checkpoint만은 실사용에서 꽤 넓게 일반화된다고 밝힌다.

### 다운로드 경로와 캐시

체크포인트는 `gs://openpi-assets`에서 필요할 때 자동으로 내려받아 `~/.cache/openpi`에 캐시된다. 저장 위치는 `OPENPI_DATA_HOME` 환경 변수로 바꾼다.

## 하드웨어 요구사항

| 모드 | 필요 메모리 | 예시 GPU |
|---|---|---|
| 추론 | 8GB 초과 | RTX 4090 |
| fine-tuning (LoRA) | 22.5GB 초과 | RTX 4090 |
| fine-tuning (full) | 70GB 초과 | A100 80GB, H100 |

세 수치는 모두 GPU 한 장을 쓸 때의 기준이다. LoRA는 저랭크 행렬만 학습해 fine-tuning 비용을 줄이는 기법으로, 소비자용 GPU와 full fine-tuning 사이의 격차를 메운다. 즉 22.5GB와 70GB의 차이가 개인 연구자와 클러스터 사용자를 가르는 경계다. 학습 config의 `fsdp_devices`로 model parallelism을 쓰면 GPU당 요구량은 줄어든다.

운영 환경 제약도 명시돼 있다. README의 요구사항 절은 학습 스크립트가 multi-node 학습을 아직 지원하지 않는다고 적으며, 검증된 OS는 Ubuntu 22.04뿐이고 다른 운영체제는 지원 대상이 아니다.

## 설치

의존성 관리는 uv를 쓴다. clone 시점에 submodule을 함께 받아야 하고, LeRobot을 의존성으로 끌어오려면 `GIT_LFS_SKIP_SMUDGE=1`이 필요하다.

```bash
git clone --recurse-submodules git@github.com:Physical-Intelligence/openpi.git

GIT_LFS_SKIP_SMUDGE=1 uv sync
GIT_LFS_SKIP_SMUDGE=1 uv pip install -e .
```

시스템 설정 문제로 uv 설치가 막히는 경우를 대비해 Docker 설치 경로도 별도 문서로 제공한다.

## 추론 실행

pre-training된 checkpoint는 몇 줄로 실행된다. config를 고르고 checkpoint를 내려받아 policy를 만든 뒤 observation dict를 넣으면 action chunk가 나온다.

```python
config = _config.get_config("pi05_droid")
checkpoint_dir = download.maybe_download("gs://openpi-assets/checkpoints/pi05_droid")
policy = policy_config.create_trained_policy(config, checkpoint_dir)
action_chunk = policy.infer(example)["actions"]
```

observation dict에는 외부 카메라 이미지와 손목 카메라 이미지가 들어가고, `prompt` 키에 "pick up the fork" 같은 자연어 지시가 들어간다. DROID와 ALOHA 로봇에 대해서는 단계별 실행 예제가 따로 마련돼 있다.

원격 추론 경로도 갖췄다. 모델을 별도 서버에서 구동하고 websocket으로 action을 로봇에 스트리밍하는 방식이며, 로봇에 싣기 어려운 큰 GPU를 쓰면서 로봇 환경과 policy 환경을 분리할 수 있다.

로봇 없이 시험하는 스크립트도 있다. 무작위 observation을 만들어 추론만 실행하므로 설치 검증에 쓴다.

## 자체 데이터 fine-tuning

README는 π0.5를 LIBERO 데이터로 fine-tune하는 과정을 예제로 삼아 세 단계를 설명한다.

### 1단계 데이터 변환

보유 데이터를 LeRobot dataset 형식으로 옮기는 일이 출발점이다. LIBERO 데이터를 변환하는 최소 예제 스크립트가 포함돼 있어 이를 고쳐 자기 데이터에 맞춘다. LIBERO만 쓸 경우에는 fine-tuning config가 이미 변환된 데이터셋을 가리키므로 이 단계를 건너뛸 수 있다.

### 2단계 config 정의와 학습

config는 역할이 다른 세 층으로 나뉜다.

| config | 역할 |
|---|---|
| `LiberoInputs` / `LiberoOutputs` | 로봇 환경과 모델 사이의 데이터 매핑. 학습과 추론 양쪽에 쓰인다 |
| `LeRobotLiberoDataConfig` | LeRobot dataset의 원본 데이터를 학습용으로 처리하는 방식 |
| `TrainConfig` | fine-tuning 하이퍼파라미터, 데이터 config, weight loader |

학습 전에는 `compute_norm_stats.py`로 정규화 통계를 계산해야 한다. pre-training mixture에 포함됐던 로봇에 새 과제를 fine-tune하는 경우라면 pre-training 시점의 정규화 통계를 다시 불러 쓰는 기능이 유리하다.

학습 실행 시 `XLA_PYTHON_CLIENT_MEM_FRACTION=0.9`를 설정하면 JAX가 GPU 메모리를 최대 90%까지 사용한다. 기본값이 75%이므로 이 설정 하나로 가용 메모리가 15%p 늘어난다. 진행 상황은 콘솔과 Weights & Biases 대시보드에서 확인하고 checkpoint는 `checkpoints` 디렉터리에 저장된다.

### 3단계 policy server와 평가

학습이 끝나면 `serve_policy.py`로 policy server를 띄운다. 이 서버는 8000번 포트에서 observation을 기다리고 평가 스크립트나 로봇 런타임이 여기에 질의한다. LIBERO 평가는 policy server와 평가 스크립트를 함께 다루는 Docker 워크플로를 권장한다.

ALOHA 시뮬레이터, 실제 ALOHA, UR5에 대한 예제도 각각 별도 문서로 제공된다.

## PyTorch 구현

2025년 9월에 π0와 π0.5의 PyTorch 구현이 JAX 구현과 나란히 추가됐다. LIBERO 벤치마크에서 추론과 fine-tuning 양쪽을 검증했다.

### 미지원 기능

PyTorch 쪽에는 아직 빠진 기능이 있다.

- π0-FAST 모델
- 혼합 정밀도 학습
- FSDP 학습
- LoRA 학습
- 학습 중 EMA 가중치

빠진 항목이 대부분 대규모 학습용 기능이므로 큰 규모의 fine-tuning은 여전히 JAX 구현이 유리하다. 반면 PyTorch 학습 스크립트는 torchrun 기반의 단일 노드 multi-GPU 실행과 multi-node 실행 명령을 함께 문서화한다.

### 설치 절차와 캐시 오염 경고

PyTorch 경로는 transformers 4.53.2에 패치 파일을 덮어써야 동작한다. 저장소가 제공하는 파일을 가상환경의 transformers 패키지에 복사하는 방식이며, AdaRMS 지원과 활성값 정밀도 제어, 그리고 갱신 없이 KV 캐시를 재사용하는 세 가지 변경이 목적이다.

```bash
cp -r ./src/openpi/models_pytorch/transformers_replace/* .venv/lib/python3.11/site-packages/transformers/
```

README는 이 절차에 경고를 붙인다. uv의 기본 링크 모드가 hardlink이므로 이 덮어쓰기가 uv 캐시의 transformers를 영구히 바꾼다. 그 결과 transformers를 재설치해도 변경이 남고 같은 캐시를 쓰는 다른 프로젝트로까지 번질 수 있다. 완전히 되돌리려면 `uv cache clean transformers`를 실행해야 한다.

### 정밀도 처리

두 구현은 추론에서는 같고 학습에서 갈린다.

| 구분 | JAX | PyTorch |
|---|---|---|
| 추론 | 대부분 bfloat16, 안정성이 필요한 일부만 float32 | JAX와 동일 |
| 학습 | 혼합 정밀도가 기본. 가중치와 그래디언트는 float32, 대부분의 활성값과 연산은 bfloat16 | 전체 bfloat16이 기본이고 전체 float32도 가능. 혼합 정밀도는 미지원 |
| 설정 키 | config의 `dtype` | config의 `pytorch_training_precision` |

bfloat16 학습은 메모리를 덜 쓰는 대신 손실이 float32보다 높게 나온다. 즉 PyTorch 기본 설정은 메모리를 아끼는 쪽으로 기울어 있다. 추론 속도는 torch.compile을 적용하면 두 구현이 비슷하다.

### 학습 실행 모드

JAX checkpoint를 PyTorch로 쓰려면 변환 스크립트를 먼저 실행하고 config의 `pytorch_weight_path`에 변환 결과를 지정한다. 학습은 `train_pytorch.py`를 단일 GPU로 실행하거나 torchrun으로 단일 노드 multi-GPU 또는 multi-node로 실행한다. `--resume` 옵션을 붙이면 최신 checkpoint에서 이어서 학습한다.

## 자주 발생하는 문제

README의 troubleshooting 표는 설치와 학습에서 반복되는 실패를 정리한다.

| 증상 | 대응 |
|---|---|
| `uv sync` 의존성 충돌 | `.venv`를 지우고 다시 실행. 그래도 안 되면 uv 자체를 최신으로 갱신 |
| 학습 중 GPU 메모리 부족 | `XLA_PYTHON_CLIENT_MEM_FRACTION`을 0.9 이상으로 설정. `--fsdp-devices`로 FSDP 사용. 그래도 부족하면 EMA 비활성화 |
| policy server 접속 오류 | 서버 구동 여부와 포트 확인. 클라이언트와 서버 사이 네트워크와 방화벽 점검 |
| 학습 시 norm stats 누락 | 학습 시작 전에 `compute_norm_stats.py` 실행 |
| 데이터셋 다운로드 실패 | 네트워크 확인. HuggingFace 데이터셋은 로그인이 필요하다 |
| CUDA 관련 오류 | NVIDIA 드라이버 확인. CUDA 라이브러리는 uv가 설치하므로 시스템 설치가 필요 없고 오히려 충돌 원인이 될 수 있다 |
| action 차원 불일치 | 데이터 처리 transform이 로봇의 입출력 차원과 맞는지 확인 |
| 학습 손실 발산 | `norm_stats.json`의 `q01`, `q99`, `std` 확인. 거의 쓰이지 않는 차원의 값이 지나치게 작으면 정규화 후 state와 action이 커진다 |

FSDP 항목은 메모리와 속도를 맞바꾸는 선택이다. 메모리 사용량이 줄어드는 대신 학습이 느려지며 느려지는 정도는 환경에 따라 다르다.

## 다른 공개 VLA와의 비교

오픈소스 VLA라는 자리는 [[physical-ai/kim-2024-openvla-an-open-source-vision-language-action-model|OpenVLA]]가 먼저 차지했다. OpenVLA도 model checkpoint와 PyTorch 학습 코드, LoRA fine-tuning 레시피를 함께 공개했다.

openpi가 넓힌 부분은 공개 범위다. 하나의 모델이 아니라 action 출력 방식이 서로 다른 base 모델 3종을 내놓고, 여기에 로봇 플랫폼별 expert checkpoint 7종을 붙였다. 따라서 사용자는 fine-tuning의 출발점과 즉시 실행 가능한 완성품 중에서 고를 수 있다.

원 논문에 없는 정보도 담고 있다. π0-FAST와 π0.5는 π0 논문 이후에 나온 모델이라 논문 페이지만으로는 확인되지 않는다. 다만 π0.5의 학습 방식 서술은 저장소와 논문이 다르다. 저장소는 knowledge insulation을 드는 반면 논문은 이산 토큰 pre-training 뒤에 action expert를 붙이는 2단 레시피를 설명하므로, 두 문서를 함께 읽는 편이 안전하다.

## 한계

- 플랫폼 이식이 보장되지 않는다. π0는 Physical Intelligence 자체 로봇용으로 개발됐고 ALOHA나 DROID와 구성이 다르다.
- expert checkpoint는 비교적 작은 데이터로 fine-tune한 것이라 다른 setup으로 옮기면 일반화하지 않을 수 있다. DROID checkpoint만 예외적으로 넓게 일반화된다고 본다.
- PyTorch 구현에 π0-FAST와 혼합 정밀도, FSDP, LoRA, EMA가 빠져 있다.
- 검증된 OS가 Ubuntu 22.04뿐이라 다른 운영체제는 지원 대상이 아니다.
- transformers 패치가 uv 캐시를 영구히 바꿔 같은 캐시를 쓰는 다른 프로젝트까지 영향을 준다.
- multi-node 학습 지원 여부의 서술이 문서 안에서 어긋난다. 요구사항 절은 학습 스크립트가 multi-node를 지원하지 않는다고 적는 반면 PyTorch 절은 multi-node torchrun 명령을 제시한다.
- 저장소는 성능 수치를 직접 싣지 않는다. π0.5-LIBERO가 LIBERO에서 최고 성능이라는 언급과 PyTorch 구현을 LIBERO에서 검증했다는 언급이 전부이므로, 정량 비교는 원 논문 페이지를 참고한다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| flow matching | noise에서 목표 분포로 가는 연속 변환의 속도장을 학습하는 생성 기법. π0의 action 출력부가 이 방식이다 |
| action chunk | policy가 한 번에 출력하는 여러 timestep 분량의 action 묶음. `policy.infer`의 반환값 |
| FAST tokenizer | action chunk를 압축해 이산 토큰으로 적는 방식. π0-FAST가 이 토큰을 예측한다 |
| knowledge insulation | backbone은 FAST token으로 지도하고 action expert의 gradient는 backbone으로 흘리지 않는 학습 레시피. π0.5의 학습 방식 |
| LeRobot dataset | HuggingFace LeRobot이 정한 로봇 데이터 형식. openpi 학습의 입력 규격 |
| norm stats | state와 action 정규화에 쓰는 통계. 학습 전 `compute_norm_stats.py`로 계산하며 pre-training 값을 다시 불러 쓸 수도 있다 |
| policy server | 학습된 policy를 websocket으로 노출해 로봇 런타임이 질의하게 하는 프로세스. 큰 GPU를 로봇 밖에 두는 구조를 만든다 |

## 관련 페이지

- [[physical-ai/black-2024-pi0-a-vision-language-action-flow-model]]: 이 저장소가 구현하는 π0의 원 논문. 정량 평가와 추론 지연 측정은 원 논문 페이지가 다룬다.
- [[physical-ai/black-2025-pi05-a-vision-language-action-model-with]]: π0.5의 원 논문. 저장소와 학습 방식 서술이 갈리는 지점을 확인할 수 있다.
- [[physical-ai/ai-2026-pi07-a-steerable-generalist-robotic]]: π0.7 논문. 저장소에는 아직 없는 π 계열 후속 모델.
- [[physical-ai/physical-intelligence-2024-our-first-generalist-policy]]: 같은 팀이 쓴 π0 공식 블로그 해설.
- [[physical-ai/kim-2024-openvla-an-open-source-vision-language-action-model]]: 오픈소스 VLA라는 위치가 겹치는 선행 저장소.
- [[physical-ai/huggingface-lerobot]]: openpi가 학습 데이터 형식으로 채택한 LeRobot.
- [[physical-ai/sa-2026-vision-language-action-models-for]]: π 계열 전체 계보를 정리한 서베이.
- [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation]]: 배포와 추론 비용을 함께 볼 만한 open foundation model.
- [[overviews/physical-ai-overview]]: physical-ai 카테고리의 분류 뼈대와 학습 경로 허브.
