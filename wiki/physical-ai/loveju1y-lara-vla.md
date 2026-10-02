---
title: "LaRA-VLA"
type: repo
year: 2026
category: physical-ai
source: loveju1y-lara-vla.md
raw_path: raw/repos/loveju1y-lara-vla.md
raw_filename: "loveju1y-lara-vla.md"
source_collection: external
org: "LoveJu1y"
repo: "LaRA-VLA"
url: "https://github.com/LoveJu1y/LaRA-VLA"
license: "MIT"
tags: [physical-ai, vla, manipulation, robot-learning]
---

## 요약

LoveJu1y/LaRA-VLA는 ICML 2026 논문 "Latent Reasoning VLA"([[physical-ai/bai-2026-latent-reasoning-vla-latent-thinking]])의 공식 구현 저장소다. LaRA-VLA는 VLA가 action을 내기 전의 chain-of-thought(CoT)를 텍스트로 생성하지 않고 thinking 토큰 자리의 연속 latent로 수행하게 만든 모델이며, 저장소는 이 모델의 학습, 평가, 배포 코드를 담은 `laravla` 패키지를 제공한다.

저장소는 오픈소스 VLA 코드베이스 StarVLA를 바탕으로 만들어졌다. backbone은 Qwen3-VL-4B이고 action head는 16층 DiT다. 학습은 "다단계 VLM 학습" 스크립트(논문의 Stage I과 II)와 "단일 단계 VLA 학습" 스크립트(논문의 Stage III) 두 묶음으로 나뉘며, LIBERO와 SimplerEnv 평가 진입점, websocket policy server가 함께 들어 있다. 학습 데이터셋 2종과 학습된 모델 2종은 Hugging Face에 공개됐다.

## 저장소 개요

| 항목 | 내용 |
|---|---|
| 저장소 | https://github.com/LoveJu1y/LaRA-VLA (기본 브랜치 main) |
| 생성과 갱신 | 2026-01-31 생성, 마지막 push 2026-05-18, 수집 시점 별 99개 |
| 라이선스 | README 배지와 LICENSE 파일은 MIT이고 저작권 표기는 "StarVLA Team"이다. GitHub API의 라이선스 판정은 NOASSERTION이다 |
| 프로젝트 페이지 | [[physical-ai/bai-2026-lara-vla-project-page]] |
| 데이터셋 | `lovejuly/bridge_orig_lerobot`, `lovejuly/libero_lerobot_all` |
| 모델 | `lovejuly/LaRA-VLA-bridge`, `lovejuly/LaRA-VLA-libero` |
| 참고 구현 | StarVLA 코드베이스, Coconut과 ECoT의 아이디어와 구성 요소 |

README NEWS에 따르면 학습 코드, 평가 코드, 학습된 가중치, 학습 데이터셋이 모두 공개됐다. 다만 Bridge 데이터셋 공개본에는 원본 영상 디렉터리가 빠져 있다 (아래 "데이터 준비" 참고).

## 핵심 개념

**implicit CoT 모드.** 공개 저장소의 기본이자 유일한 추론 모드는 `cot_mode: implicit`다. 추론 시 CoT 텍스트를 생성하지 않고, `<|start_of_thinking|>`와 `<|end_of_thinking|>` 사이의 `<|thinking|>` 토큰 자리에서 latent로만 추론한다. 공개 일정 문서는 저장소의 주 경로를 이 모드로 수렴시켰다고 적는다.

**reasoning stage.** `bridge_reasoning.stage`는 학습 문자열 형식을 정하는 값이다. stage 1은 Subtask, BBox, Reasoning 문장을 명시적으로 쓰고, stage 2 이상은 이 텍스트를 앞에서부터 thinking 토큰으로 대체한다. 이 값을 1에서 4까지 올리는 과정이 논문의 curriculum이다.

**training stage.** `framework.training_stage`는 학습 대상을 정한다. `reasoning_only`는 VLM만 학습하고, `full`은 DiT action head까지 함께 학습한다.

**img_next.** `<img_next>` 토큰이 다음 프레임의 visual latent를 예측한다. 해상도 112×112 이미지를 2×2 merge하면 16개 토큰이 되며, 논문 부록의 학습 문자열 예시에서 `<img next>`가 16개인 것과 같다.

## 패키지 구조

| 경로 | 역할 |
|---|---|
| `laravla/training/train.py` | 단일 학습 진입점. 모든 스크립트가 이 파일을 `torchrun`으로 실행한다 |
| `laravla/model/framework/laravla.py`, `base_framework.py` | 프레임워크 본체 |
| `laravla/model/framework/latent_analysis_mixin.py` | latent 분석용 mixin |
| `laravla/model/modules/vlm/QWen3.py`, `QWen2_5.py` | Qwen VLM 래퍼. `add_qwen_special_tokens`에 thinking 토큰과 FAST 토큰을 어휘에 추가하는 도구가 있다 |
| `laravla/model/modules/action_model/` | DiT, GR00T, LayerwiseFM, MLP, FAST action head와 flow matching head(`cross_attention_dit.py`) |
| `laravla/model/modules/projector/QFormer.py`, `dino_model/` | 보조 projector와 DINOv2 래퍼 |
| `laravla/dataloader/gr00t_lerobot/` | GR00T 계열 LeRobot 데이터로더 |
| `laravla/dataloader/gr00t_lerobot/bridge_annotations.py` | CoT 문장과 bbox 주석을 step 단위로 결합한다 |
| `laravla/dataloader/gr00t_lerobot/bridge_reasoning_formatter.py` | reasoning stage에 맞춰 학습 문자열을 만든다 |
| `laravla/config/training/libero.yaml`, `bridge.yaml` | 학습 설정 |
| `scripts/` | 다단계와 단일 단계 학습 스크립트 |
| `examples/LIBERO`, `examples/SimplerEnv` | 평가 진입점 |
| `deployment/model_server/` | websocket policy server와 디버그 클라이언트 |

action head 디렉터리에 여러 종류가 남아 있는 것은 StarVLA 코드베이스에서 물려받은 구조이며, 공개 설정이 쓰는 것은 DiT-B다. 설정의 `framework.name`도 아직 `QwenGR00T`로 남아 있고, `docs/rename_starvla_to_laravla_plan.md`가 있는 것으로 보아 StarVLA에서 LaRA-VLA로 이름을 바꾸는 정리 작업이 진행 중이었다.

## 설치와 데이터 준비

### 설치

conda로 Python 3.10 환경을 만들고 `pip install -r requirements.txt`, `pip install -e .`로 설치한다. 설치 확인은 `python -c "from laravla.training.train import main; print('OK')"`로 한다.

### 데이터 준비

학습 전에 환경 변수 세 개를 지정한다.

| 변수 | 내용 |
|---|---|
| `BRIDGE_LEROBOT_ROOT` | Bridge 데이터셋의 상위 디렉터리 |
| `LIBERO_LEROBOT_ROOT` | LIBERO 데이터셋 디렉터리 |
| `HF_HOME` | Qwen 모델 캐시 경로 |

| 데이터 | 기대 구조 | 주의 |
|---|---|---|
| Bridge | `bridge_orig_lerobot/` 아래 `annotations/`, `meta/`, `data/`, `videos/` | 공개본에는 `videos/`가 없다. 원본 영상을 따로 구해 같은 구조로 두어야 학습이 실행된다 |
| LIBERO | goal, object, spatial, 10 suite의 `*_no_noops_1.0.0_lerobot/` 네 디렉터리 | 없음 |

`annotations/`에는 논문의 자동 주석 파이프라인이 만든 CoT 문장(`episode_dense_captions_full*.jsonl`)과 SAM3 기반 bbox(`episode_sam3_bboxes_*.jsonl`)가 들어간다.

## 주요 설정값

두 설정 파일은 backbone, 추론 토큰, action head 구조를 공유하고, 데이터와 action horizon만 다르다.

| 키 | LIBERO (`libero.yaml`) | Bridge (`bridge.yaml`) |
|---|---|---|
| `qwenvl.base_vlm` | StarVLA/Qwen3-VL-4B-Instruct-Action | 같음 |
| `data_mix` | libero_all | bridge_local |
| 이미지 | 224×224, 카메라 `image_0` 1개 | 224×224 |
| `cot_mode` | implicit | implicit |
| 추론 요소 순서 | SUBTASK, BBOX, REASON | 같음 |
| 요소당 thinking 토큰 | 1개 | 1개 |
| `img_next` | 해상도 112, 16토큰, 손실 가중치 0.1 | 같음 |
| action head | DiT-B, 16층, cross-attention 차원 1536 | 같음 |
| 추론 denoising step | 4 | 4 |
| action 차원과 horizon | 7차원, horizon 8 | 7차원, horizon 16 |
| FAST tokenizer | `physical-intelligence/fast` | 같음 |
| 학습률 | base 3e-5, VLM 1e-5, action model 1e-4 | 같음 |
| scheduler | cosine_with_min_lr (최소 5e-7) | 같음 |

action horizon은 한 번의 추론으로 내는 미래 action 개수다. LIBERO의 8과 Bridge의 16은 논문 부록 A의 값과 같다. 추론 denoising step 4는 DiT가 노이즈에서 action을 만들 때 반복하는 횟수로, 추론 지연을 짧게 유지하는 요인 중 하나다.

## 학습 절차

### 논문 단계와 스크립트의 대응

저장소는 논문의 3단계 학습을 스크립트 두 묶음으로 나눈다.

| 스크립트 | 설정 | 논문 대응 |
|---|---|---|
| `run_libero_multistage.sh`, `run_bridge_multistage.sh` | `training_stage reasoning_only`로 stage 1에서 4까지 연속 실행한다. 각 stage는 직전 stage의 checkpoint를 불러오고, `START_STAGE`로 중간부터 재개할 수 있다 | Stage I(stage 1)과 Stage II(stage 2~4) |
| `run_laravla_libero.sh`, `run_laravla_bridge.sh` | `training_stage full`, `bridge_reasoning.stage 4`. `PRETRAINED_CKPT`를 주면 `qwen_vl_interface` 모듈만 다시 불러온다 | Stage III |

즉 다단계 스크립트로 VLM의 latent 추론을 먼저 완성하고, 그 checkpoint를 단일 단계 스크립트의 `PRETRAINED_CKPT`로 넘겨 action head를 붙이는 순서다. stage 2~4는 thinking 토큰 수를 1, 2, 3개로 늘리는 논문 Stage II의 세 하위 단계에 해당한다.

### 다단계 스크립트 설정

| 항목 | LIBERO stage 1 / 2 / 3 / 4 | Bridge stage 1 / 2 / 3 / 4 |
|---|---|---|
| 최대 step | 5천 / 2천 / 2천 / 2천 | 1만 / 5천 / 5천 / 1만 |
| GPU당 배치 | 12 / 12 / 12 / 16 | 12 / 16 / 16 / 16 |
| VLM 손실 가중치 | 전 stage 1.0 | 전 stage 1.0 |
| img_next 손실 가중치 | 0.1 / 0.1 / 0.2 / 0.2 | 0.1 / 0.1 / 0.2 / 0.2 |
| GPU 수 | 8 | 8 |

img_next 손실 가중치가 stage 3부터 0.2로 오르는 것은 텍스트 감독이 줄어드는 만큼 visual 예측 감독의 비중을 높이는 논문의 설계(Stage II 후반 0.2 L_vis + L_act-dis)와 맞는다.

### 단일 단계 스크립트 설정

| 항목 | LIBERO | Bridge |
|---|---|---|
| 최대 step | 6만 | 2만 |
| GPU 수 | 1 | 8 |
| GPU당 배치 | 8 | 8 |
| 재로드 모듈 | `qwen_vl_interface` | `qwen_vl_interface` |

## 평가와 배포

평가는 LaRA-VLA 환경과 시뮬레이터 환경을 분리하고 policy server로 둘을 잇는 구조다.

| 진입점 | 사용법 |
|---|---|
| LIBERO | LIBERO 공식 환경을 설치하되 Python 3.10을 권장한다(3.8에서는 문제가 많다). `tyro`, `mediapy`, `websockets`, `msgpack`, numpy 1.24.4를 추가 설치한 뒤 `eval_libero_all.sh <checkpoint.pt>`로 suite 네 개를 GPU 여러 장에 병렬 평가한다. 결과는 `<checkpoint_dir>/eval_libero_implicit_parallel/` 아래에 쓴다 |
| SimplerEnv | SimplerEnv 공식 환경에 같은 의존성을 추가하고 `test_your_simplerEnv.py`로 점검한 뒤 `bridge_eval.sh <checkpoint.pt>`로 policy server와 과제를 병렬 실행한다 |
| 다수 checkpoint | `run_all_ckpts_libero_all.sh`, `run_all_ckpts_bridge.sh`로 디렉터리 안의 checkpoint를 일괄 평가한다 |
| 실제 로봇 | `server_policy.py --ckpt_path ... --port 10093 --use_bf16`으로 websocket policy server를 띄우고, 로봇 컨트롤러가 `debug_server_policy.py`를 참고해 접속한다 |

실제 로봇 배포 문서(`readme-deployment.md`)에는 네트워크 인터페이스 설정과 frankx 설치 메모만 남아 있고, 논문의 Agilex Cobot Magic용 컨트롤러 코드는 없다.

## 결과

README의 결과표는 논문 Table 2, Table 3과 같다. 실제 로봇 결과와 추론 지연은 README에 없다.

| 벤치마크 | LaRA-VLA 과제별 | 평균 | 표 안의 두 번째로 높은 평균 |
|---|---|---|---|
| LIBERO (Spatial / Goal / Object / Long) | 96.4 / 98.6 / 99.8 / 96.6 | 97.9% | OpenVLA-OFT 97.1% |
| SimplerEnv WidowX (Spoon / Carrot / Block / Eggplant) | 95.8 / 62.5 / 25.0 / 91.7 | 68.8% | UD-VLA 62.5% |

README는 LIBERO 결과가 `examples/LIBERO/README.md`의 평가 절차에, Bridge 결과가 SimplerEnv 기반 절차에 대응한다고 적는다. 과제별 편차와 baseline 수치의 불일치는 논문 페이지에 정리돼 있다.

## 한계

### 논문 설정과의 차이

공개 스크립트의 일부 값은 논문 부록 Table 5와 다르다.

| 항목 | 논문 Table 5 | 공개 스크립트 |
|---|---|---|
| LIBERO Stage III 학습 step | 4만 | 6만 (`run_laravla_libero.sh`) |
| LIBERO Stage II 배치 | 16 | stage 2와 3은 12, stage 4는 16 (`run_libero_multistage.sh`) |
| SimplerEnv(Bridge) Stage III 학습 step | 6만 | 2만 (`run_laravla_bridge.sh`) |
| Bridge Stage I과 II | 1만, 5천+5천+1만, 배치 12/16 | 일치 |

논문 수치를 재현하려면 이 값들을 Table 5에 맞춰 조정해야 할 수 있다.

### 공개 범위

- Bridge 데이터셋 공개본에 `videos/`가 없어 사용자가 원본 영상을 따로 마련해야 한다.
- 실제 로봇 데이터셋, 학습 설정, 컨트롤러 코드는 공개되지 않았고 policy server만 있다.

### 정리가 끝나지 않은 코드

공개 일정 문서(중국어)는 공개 준비를 7개 Phase로 나눠 진행 중이라고 적는다. 하드코딩 경로와 디버그 진입점 제거, 설정 정리, 문서 재작성, 라이선스 감사, 최소 검증과 CI가 포함된다. 수집 시점에도 다음 흔적이 남아 있다.

- `bridge.yaml`의 `cot_path`와 `bbox_path`가 `/share/project/...` 형태의 내부 절대 경로라 사용자가 고쳐야 한다.
- 설정의 `framework.name`이 `QwenGR00T`로 남아 있다.
- Bridge 다단계 스크립트에 `reasoning_summary`, `reasoning_film` 같은 실험용 옵션이 기본 꺼짐 상태로 남아 있다.

### 라이선스

저장소 전체는 MIT로 배포되지만 일부 파일은 원 저작권 헤더를 유지한다. THIRD_PARTY_NOTICES는 다음 출처를 나열한다.

| 출처 | 라이선스 | 해당 파일 |
|---|---|---|
| NVIDIA Isaac-GR00T | Apache-2.0 | `gr00t_lerobot` 데이터로더, flow matching head |
| OpenAI guided-diffusion 등 | MIT | DiT diffusion 유틸리티 |
| Meta DiT | 원 저장소 라이선스 | `DiT_modules/models.py` |
| Meta DINOv2 | Apache-2.0 | `dino_transforms.py` |
| OpenVLA, Prismatic | MIT | `overwatch.py` 로깅 유틸리티 |

문서는 Meta DiT 유래 `models.py`를 가장 라이선스에 민감한 파일로 지목하고, 안정 배포나 상업적 사용 전에 원 라이선스를 검토하라고 권고한다. 공개 일정 문서도 법률과 출처 검토가 아직 남아 있다고 적는다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| `cot_mode: implicit` | 추론 시 CoT 텍스트를 생성하지 않고 thinking 토큰 자리의 latent로만 추론하는 모드. 공개 저장소의 기본 모드다 |
| `bridge_reasoning.stage` | 학습 문자열 형식을 정하는 값. 1은 명시적 CoT, 2 이상은 thinking 토큰으로 텍스트를 대체한다 |
| `training_stage` | `reasoning_only`(VLM만 학습)와 `full`(action head 포함) 두 값 |
| `img_next` | 다음 프레임 visual latent를 예측하는 토큰 설정. 112×112 해상도에서 16토큰 |
| StarVLA | 이 저장소가 바탕으로 삼은 오픈소스 VLA 코드베이스 |

## 관련 페이지

- [[physical-ai/bai-2026-latent-reasoning-vla-latent-thinking]]: 이 저장소가 구현하는 논문. 방법, 데이터 파이프라인, 결과의 정본이다.
- [[physical-ai/bai-2026-lara-vla-project-page]]: 같은 연구의 소개 페이지와 실제 로봇 rollout 영상.
- [[physical-ai/starvla-vlact]]: 같은 StarVLA 코드베이스에서 나온 다른 VLA 저장소.
- [[physical-ai/nvidia-isaac-gr00t]]: 데이터로더와 flow matching head 일부 파일의 출처.
- [[physical-ai/kim-2024-openvla-an-open-source-vision-language-action-model]]: 로깅 유틸리티의 출처이자 벤치마크 baseline.
