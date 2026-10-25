---
title: "GR00T Policy (LeRobot docs, huggingface/lerobot docs/source/groot.mdx)"
type: repo
year: 2026
category: physical-ai
raw_path: raw/repos/huggingface-lerobot-groot.md
raw_filename: "huggingface-lerobot-groot.md"
source_collection: external
org: "huggingface"
repo: "lerobot (docs/source/groot.mdx)"
url: "https://github.com/huggingface/lerobot/blob/main/docs/source/groot.mdx"
license: "Apache-2.0"
tags: [physical-ai, vla, imitation-learning, benchmark]
figures:
  - id: fig01
    label: An overview of GR00T
    kind: figure
    file: assets/huggingface-lerobot-groot/fig01.png
    raw: "https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/lerobot/lerobot-groot-paper1%20(1).png"
    caption: "GR00T N1 논문의 Model Overview 그림 사본. VLM(System 2)과 DiT(System 1)로 나뉜 dual-system 구조와 캡션이 함께 실려 있다"
    strategy: manual
    curated: false
---

## 한 줄 요약 (One-line Summary)

LeRobot이 GR00T N1.7을 `groot` policy type으로 통합한 방법을 설명하는 공식 문서다. 설치 명령, 자기 데이터셋 fine-tuning 명령, LIBERO 학습과 평가 레시피, SO-101 실제 기기 rollout 명령을 순서대로 제시한다. LeRobot 통합으로 얻은 LIBERO 4개 suite 성공률은 평균 96.5%다. 현재 릴리스는 N1.7만 지원하며 N1.5 지원은 제거됐다.

## 1. 자료 정보 (Document Information)

- URL: https://github.com/huggingface/lerobot/blob/main/docs/source/groot.mdx
- 저장소: huggingface/lerobot (Apache-2.0). 저장소 전체는 [[physical-ai/huggingface-lerobot]]에서 다룬다
- 문서 위치: `docs/source/groot.mdx` (LeRobot 공식 문서 사이트의 GR00T Policy 페이지 원본)
- 주요 변경 이력: 2026-07-03 N1.7 policy 추가(#3922), 2026-07-05 README와 LIBERO 결과 갱신(#3941), 2026-07-08 LIBERO 체크포인트 갱신(#3961)
- 베이스 모델: `nvidia/GR00T-N1.7-3B` (모델 카드 요약은 `sources/nvidia-gr00t-n1-7-3b.md`)
- 모델 라이선스: NVIDIA Open Model License Agreement
- 수집 일자: 2026-10-26

## 2. 주요 기여 (Key Contributions)

이 문서는 NVIDIA 공식 저장소를 거치지 않고 LeRobot의 공통 CLI만으로 GR00T N1.7을 학습, 평가, 배포하는 경로를 제시한다. LeRobot은 여러 policy가 같은 데이터 형식과 학습 CLI를 공유하는 프레임워크이므로, 이미 LeRobot 형식 데이터와 SO-101 같은 저가 로봇 팔을 쓰는 사용자에게 진입 비용이 가장 낮은 경로다.

- **N1.7 단일 지원 선언**: N1.5 지원을 제거했고, N1.5 체크포인트와 config는 migration 안내와 함께 거부된다.
- **설치와 사용 방법**: `pip install "lerobot[groot]"` 한 줄로 의존성을 설치하고 `--policy.type=groot`로 지정한다.
- **fine-tuning 레시피**: 자기 데이터셋에 대해 relative action, bf16, chunk 크기 16을 쓰는 전체 명령을 제공한다.
- **LIBERO 재현 결과**: LeRobot 통합 구현으로 4개 suite에서 평균 96.5% 성공률을 보고하고 suite별 체크포인트를 공개한다.
- **실제 기기 rollout**: SO-101 follower 팔에서 real-time action chunking을 켠 추론 명령을 제공한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 모델 개요

문서는 GR00T를 humanoid 로봇의 일반화된 추론과 기술을 위한 NVIDIA foundation model 패밀리로 소개한다. GR00T는 cross-embodiment policy로, 언어, 이미지, proprioception을 포함한 멀티모달 입력을 받아 다양한 환경에서 manipulation 과제를 수행한다. policy는 현재 observation을 받아 다음 action을 정하는 함수를 말한다.

N1.7에 대한 문서의 서술은 다음과 같다.

- backbone은 Cosmos-Reason2/Qwen3-VL이다.
- SimplerEnv, DROID, LIBERO용 체크포인트를 제공한다.
- pre-training된 vision encoder와 language encoder 위에 flow matching action transformer를 두고, vision, language, proprioception을 조건으로 action chunk를 모델링한다.
- 실제 데이터나 합성 데이터로 post-training해 특정 humanoid 로봇이나 과제에 맞출 수 있다.

문서는 GR00T의 성능 원천을 넓고 다양한 humanoid 데이터셋에서 찾는다. 학습 데이터는 세 종류다.

| 데이터 종류 | 내용 |
|---|---|
| 실제 로봇 데이터 | 로봇에서 직접 수집한 데이터 |
| 합성 데이터 | NVIDIA Isaac GR00T Blueprint로 생성한 데이터 |
| 인터넷 규모 영상 | 웹 영상 데이터 |

### 설치

GR00T는 NVIDIA GPU 가속 시스템을 전제로 한다. 설치 방법은 두 가지다.

| 상황 | 명령 |
|---|---|
| 패키지 설치 | `pip install "lerobot[groot]"` |
| 소스 체크아웃 | `pip install -e ".[groot]"` |
| 학습 추가 의존성 | `pip install "lerobot[training]"` |
| 실제 기기 rollout 추가 의존성 | `pip install "lerobot[feetech,viz]"` |

### 자기 데이터셋 fine-tuning

문서의 예시는 SO-101 로봇 팔 데이터를 `new_embodiment` tag로 학습한다. embodiment tag는 데이터가 어떤 로봇에서 왔는지 가리키는 문자열 키이며, GR00T는 이 값으로 state와 action을 해석하는 방식을 고른다. 학습 전에 `hf auth login`과 `wandb login`으로 Hugging Face와 Weights & Biases에 로그인하고, 결과 모델 저장소 이름을 `{데이터셋}_GR00T17`로 정한다.

| 인자 | 값 | 의미 |
|---|---|---|
| `--policy.type` | `groot` | GR00T policy 선택 |
| `--policy.base_model_path` | `nvidia/GR00T-N1.7-3B` | 베이스 체크포인트 |
| `--policy.embodiment_tag` | `new_embodiment` | pre-training에 없던 로봇용 tag |
| `--policy.chunk_size` | 16 | 한 번에 예측하는 action 개수 |
| `--policy.n_action_steps` | 16 | 예측 chunk에서 실제 실행하는 action 개수 |
| `--policy.use_relative_actions` | true | action을 현재 상태 대비 변화량으로 표현 |
| `--policy.relative_exclude_joints` | `["gripper"]` | 그리퍼는 relative 변환에서 제외 |
| `--policy.use_bf16` | true | bfloat16 학습 |
| `--dataset.image_transforms.enable` | true | 이미지 augmentation 사용 |
| `--batch_size` | 64 | |
| `--steps` | 20000 | 학습 step 수 |
| `--save_freq` | 5000 | 체크포인트 저장 주기 |
| `--use_policy_training_preset` | true | policy 기본 학습 설정 사용 |
| `--env_eval_freq`, `--eval_steps` | 0, 0 | 학습 중 시뮬레이션 평가 생략 |
| `--policy.push_to_hub` | true | 학습 결과를 Hugging Face Hub에 업로드 |

relative action에서 그리퍼를 빼는 이유는 문서에 설명되어 있지 않다. 그리퍼는 열림과 닫힘이라는 절대 상태가 의미를 갖는 관절이어서 변화량 표현이 맞지 않기 때문으로 보인다.

### LIBERO 학습 레시피

`libero_spatial` suite 학습 예시는 NVIDIA Isaac-GR00T 저장소의 LIBERO 예제 레시피를 따른다. 자기 데이터셋 레시피와 비교하면 다음이 다르다.

| 항목 | 자기 데이터셋 | LIBERO |
|---|---|---|
| 데이터셋 | 사용자 데이터 | `IPEC-COMMUNITY/libero_spatial_no_noops_1.0.0_lerobot` |
| embodiment tag | `new_embodiment` | `libero_sim` |
| relative action | true | false |
| batch size | 64 | 320 |
| 학습 step | 20000 | 20000 (`--policy.max_steps=20000` 병기) |
| 저장 주기 | 5000 | 2000 |
| 이미지 augmentation | 기본 설정 | ColorJitter 4종을 명시하고 최대 4개 적용 |
| 영상 backend | 기본값 | `pyav` |

LIBERO 레시피의 ColorJitter 범위는 밝기 0.7~1.3, 대비 0.6~1.4, 채도 0.5~1.5, 색상 -0.08~0.08이다. 데이터 로딩에는 worker 4개, prefetch factor 2, persistent worker를 쓴다.

### 실제 기기 rollout

학습한 모델은 `lerobot-rollout`으로 실제 로봇에 배포한다. 예시는 SO-101 follower 팔에 손목 카메라와 정면 카메라(각 640×480, 30 fps, MJPG)를 연결하고 "place the vial in the rack" 과제를 60초 동안 실행한다.

| 인자 | 값 | 의미 |
|---|---|---|
| `--strategy.type` | `base` | 기본 rollout 전략 |
| `--policy.path` | 학습한 모델 ID | fine-tuning 결과 |
| `--policy.base_model_path` | `nvidia/GR00T-N1.7-3B` | 베이스 체크포인트 |
| `--policy.n_action_steps` | 8 | chunk당 실행 action 수 |
| `--robot.type` | `so101_follower` | 로봇 종류 |
| `--inference.type` | `rtc` | real-time action chunking 추론 |
| `--inference.rtc.enabled` | True | 추론이 불안정하면 False로 끈다 |
| `--inference.rtc.execution_horizon` | 8 | chunk에서 실행하는 구간 길이 |
| `--inference.queue_threshold` | 0 | action queue 임계값. 안정적 추론을 위해 5를 넘기지 않는다 |
| `--duration` | 60 | 실행 시간(초) |

real-time action chunking은 로봇이 이전 action chunk를 실행하는 동안 다음 chunk를 비동기로 계산하고, 두 chunk가 매끄럽게 이어지도록 보정하는 추론 방식이다. execution horizon은 예측한 chunk 중 다음 추론 전까지 실제로 실행하는 action 개수를 뜻한다. 카메라 인덱스는 `lerobot-find-cameras opencv`로 확인한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

LeRobot 통합 구현(GR00T-LeRobot)의 LIBERO 예비 결과다. suite마다 episode 50회 이상으로 평가했다.

| Suite | 성공률 | 체크포인트 |
|---|---:|---|
| LIBERO Spatial | 95% | `nvidia/gr00t17-lerobot-libero_spatial-640` |
| LIBERO Object | 100% | `nvidia/gr00t17-lerobot-libero_object-640` |
| LIBERO Goal | 98% | `nvidia/gr00t17-lerobot-libero_goal-640` |
| LIBERO 10 (Long) | 93% | `nvidia/gr00t17-lerobot-libero_10-640` |
| 평균 | 96.5% | |

Object suite에서 100%를 기록했고, 가장 긴 과제 묶음인 LIBERO 10에서 93%로 가장 낮았다. 가장 높은 suite와 가장 낮은 suite의 차이는 7%p다. 평가는 `lerobot-eval`에 `--env.type=libero`, `--policy.embodiment_tag=libero_sim`, `--eval.n_episodes=50`을 주어 실행하며, 문서는 성공률을 보고할 때 suite당 episode 50회 이상을 쓰라고 권고한다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **N1.5 호환 단절**: 현재 릴리스는 N1.5 체크포인트와 config를 거부한다. N1.5를 계속 쓰려면 `lerobot==0.5.1`로 버전을 고정해야 한다.
- **예비 결과**: LIBERO 수치는 "preliminary"로 표기되어 있고, 다른 벤치마크(SimplerEnv, DROID) 결과는 없다.
- **NVIDIA GPU 전제**: GR00T는 NVIDIA GPU 가속 시스템용으로 안내된다.
- **RTC 불안정 가능성**: real-time action chunking이 추론 불안정을 일으키면 끄라는 주석과 queue 임계값 5 이하 권고가 붙어 있다. 설정에 따라 실제 기기 동작이 흔들릴 수 있다는 뜻이다.
- **embodiment 세부 위임**: `new_embodiment`의 동작 원리는 NVIDIA Isaac-GR00T 저장소 문서로 넘긴다.
- **명령 예시 오류**: rollout 명령의 줄 연속 기호(`\`) 뒤에 주석이 붙어 있어 그대로 복사하면 셸에서 명령이 끊긴다. "roullout" 오타도 있다.

## 6. 관련 연구 (Related Work)

- [[physical-ai/huggingface-lerobot]]: 이 문서가 속한 저장소. 22종 policy가 같은 데이터 형식과 학습 CLI를 공유한다.
- [[physical-ai/nvidia-isaac-gr00t]]: NVIDIA 공식 구현. LIBERO 레시피 원본과 embodiment tag 설명이 있다.
- [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation]]: 문서에 실린 개요 그림의 원 논문.
- [[physical-ai/nvidia-2025-gr00t-n1-5-an-improved-open]]: LeRobot에서 지원이 제거된 이전 세대 N1.5.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| `groot` policy type | LeRobot에서 GR00T N1.7을 선택하는 policy 이름 |
| GR00T-LeRobot | LeRobot 통합 구현으로 얻은 결과를 NVIDIA 공식 구현 결과와 구분하는 표기 |
| `new_embodiment` | pre-training에 없던 로봇(예: SO-101)을 fine-tuning할 때 쓰는 embodiment tag |
| `libero_sim` | LIBERO 시뮬레이션 데이터용 embodiment tag |
| `use_relative_actions` | action을 현재 상태 대비 변화량으로 표현하는 옵션. `relative_exclude_joints`로 제외 관절을 지정한다 |
| `lerobot-rollout` | 학습한 policy를 실제 로봇에서 실행하는 LeRobot CLI |
| `queue_threshold` | rollout 시 action queue 임계값. 5 이하 권장 |

## 8. 그림 후보 (Figure Candidates)

repo 유형이라 `-figures/` 폴더를 만들지 않았다. 문서의 그림은 GR00T N1 논문 Figure의 캡션 포함 사본이고, 같은 도식이 모델 카드의 `model-architecture.png`(`sources/nvidia-gr00t-n1-7-3b.md`의 fig03)에 캡션 없이 고해상도로 있으므로 wiki에는 모델 카드의 그림을 쓴다.

| id | 위치 | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | Model Overview 절 | GR00T N1 Model Overview 그림 사본 | manual | (중복, 불필요) |
