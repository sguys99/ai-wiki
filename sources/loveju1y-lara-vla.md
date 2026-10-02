---
title: "LaRA-VLA"
type: repo
year: 2026
category: physical-ai
raw_path: raw/repos/loveju1y-lara-vla.md
raw_filename: "loveju1y-lara-vla.md"
source_collection: external
org: "LoveJu1y"
repo: "LaRA-VLA"
url: "https://github.com/LoveJu1y/LaRA-VLA"
license: "MIT"
tags: [physical-ai, vla, manipulation, robot-learning]
---

## 한 줄 요약 (One-line Summary)

LaRA-VLA 논문(ICML 2026)의 공식 구현 저장소다. StarVLA 코드베이스를 바탕으로 Qwen3-VL-4B와 DiT action head를 묶은 `laravla` 패키지, 4단계 VLM 학습 스크립트와 단일 단계 VLA 학습 스크립트, LIBERO와 SimplerEnv 평가 진입점, Hugging Face에 공개한 데이터셋 2종과 모델 2종을 제공한다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 저장소 | https://github.com/LoveJu1y/LaRA-VLA (기본 브랜치 main) |
| 생성과 갱신 | 2026-01-31 생성, 마지막 push 2026-05-18 (수집 시점 별 99개) |
| 라이선스 | README 배지와 LICENSE 파일은 MIT (저작권 표기는 "StarVLA Team"). GitHub API의 라이선스 판정은 NOASSERTION이다. 일부 파일은 Apache-2.0 등 원 저작권 헤더를 유지한다 |
| 논문 | [[physical-ai/bai-2026-latent-reasoning-vla-latent-thinking]] (arXiv 2602.01166) |
| 프로젝트 페이지 | [[physical-ai/bai-2026-lara-vla-project-page]] |
| 데이터셋 | `lovejuly/bridge_orig_lerobot`, `lovejuly/libero_lerobot_all` (Hugging Face) |
| 모델 | `lovejuly/LaRA-VLA-bridge`, `lovejuly/LaRA-VLA-libero` (Hugging Face) |
| 수집 범위 | 최상위 README 전문, examples/LIBERO와 SimplerEnv README, deployment/model_server README, 학습 스크립트 4종, `libero.yaml`과 `bridge.yaml`, THIRD_PARTY_NOTICES, 공개 일정 문서, LICENSE, 파일 트리 |

## 2. 주요 기여 (Key Contributions)

README NEWS 기준 공개 상태는 다음과 같다.

| 항목 | 상태 |
|---|---|
| ICML 2026 채택 | 공지 |
| 학습 코드 | 공개 |
| 평가 코드 | 공개 |
| 학습된 가중치 | 공개 (Bridge, LIBERO) |
| 학습 데이터셋 | 공개 (단 Bridge는 `videos/` 디렉터리 제외) |

README는 StarVLA 코드베이스 위에 만들었고 Coconut과 ECoT의 아이디어와 구성 요소를 참고했다고 밝힌다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 패키지 구조

| 경로 | 역할 |
|---|---|
| `laravla/training/train.py` | 단일 학습 진입점 |
| `laravla/model/framework/laravla.py`, `base_framework.py`, `latent_analysis_mixin.py` | 프레임워크 본체와 latent 분석 mixin |
| `laravla/model/modules/vlm/QWen3.py`, `QWen2_5.py` | VLM 래퍼. `add_qwen_special_tokens`에 thinking 토큰과 FAST 토큰 추가 도구가 있다 |
| `laravla/model/modules/action_model/` | DiT, GR00T, LayerwiseFM, MLP, FAST action head와 flow matching head(`cross_attention_dit.py`) |
| `laravla/model/modules/projector/QFormer.py`, `dino_model/` | 보조 projector와 DINOv2 래퍼 |
| `laravla/dataloader/gr00t_lerobot/` | GR00T 계열 LeRobot 데이터로더, `bridge_annotations.py`(CoT, bbox 주석 결합), `bridge_reasoning_formatter.py`(단계별 학습 문자열 생성), `mixtures.py` |
| `laravla/config/training/libero.yaml`, `bridge.yaml` | 학습 설정 |
| `scripts/` | 다단계와 단일 단계 학습 스크립트 |
| `examples/LIBERO`, `examples/SimplerEnv` | 평가 진입점 |
| `deployment/model_server/` | websocket policy server와 디버그 클라이언트 |

설정의 `framework.name`은 여전히 `QwenGR00T`이고, 공개 일정 문서는 저장소를 StarVLA에서 LaRA-VLA로 이름을 바꾸는 정리 작업이 진행 중이었음을 보여준다.

### 3.2 설치와 데이터 배치

conda Python 3.10 환경에서 `requirements.txt`와 `pip install -e .`로 설치한다. 학습 전에 `BRIDGE_LEROBOT_ROOT`, `LIBERO_LEROBOT_ROOT`, `HF_HOME`을 지정한다.

| 데이터 | 기대 구조 |
|---|---|
| Bridge | `${BRIDGE_LEROBOT_ROOT}/bridge_orig_lerobot/` 아래 `annotations/`, `meta/`, `data/`, `videos/`. 공개본에는 `videos/`가 없어 원본 영상을 따로 구해 넣어야 학습이 실행된다 |
| LIBERO | `${LIBERO_LEROBOT_ROOT}/` 아래 goal, object, spatial, 10 suite의 `*_no_noops_1.0.0_lerobot/` 네 디렉터리 |

### 3.3 주요 설정값 (`libero.yaml`, `bridge.yaml`)

| 키 | LIBERO | Bridge |
|---|---|---|
| `qwenvl.base_vlm` | StarVLA/Qwen3-VL-4B-Instruct-Action | 같음 |
| `data_mix` | libero_all | bridge_local |
| 이미지 크기 | 224×224, 카메라 `image_0` 1개 | 224×224 |
| `cot_mode` | implicit | implicit |
| `bridge_reasoning.component_order` | SUBTASK, BBOX, REASON | 같음 |
| thinking 토큰 | `<|thinking|>`, `<|start_of_thinking|>`, `<|end_of_thinking|>`, 요소당 1개 | 같음 |
| `img_next` | 토큰 `<img_next>`, 해상도 112 (2×2 merge로 16토큰), 손실 가중치 0.1 | 같음 |
| CoT 주석 | `episode_dense_captions_full.jsonl`, bbox는 `episode_sam3_bboxes_from_dino_final.jsonl` (상대 경로) | `episode_dense_captions_full_final.jsonl`, bbox는 `episode_sam3_bboxes_final_merged.jsonl` (내부 절대 경로로 남아 있음) |
| action head | DiT-B, 16층, cross-attention 차원 1536, 추론 timestep 4, `repeated_diffusion_steps` 4 | 같음 |
| action 차원과 horizon | 7차원, horizon 8 | 7차원, horizon 16 |
| FAST tokenizer | `physical-intelligence/fast` | 같음 |
| 학습률 | base 3e-5, VLM 1e-5, action model 1e-4, cosine_with_min_lr | 같음 |

### 3.4 학습 스크립트와 논문 단계의 대응

저장소는 학습을 "다단계 VLM 학습"과 "단일 단계 VLA 학습" 두 스크립트 묶음으로 나눈다.

| 스크립트 | 내용 | 논문 대응 |
|---|---|---|
| `run_libero_multistage.sh`, `run_bridge_multistage.sh` | `training_stage reasoning_only`로 4개 stage를 연속 실행한다. stage 1은 명시적 CoT, stage 2~4는 thinking 토큰 1~3개로 텍스트를 점차 대체한다. 각 stage는 직전 stage checkpoint를 불러온다 | Stage I과 Stage II(세 하위 단계) |
| `run_laravla_libero.sh`, `run_laravla_bridge.sh` | `training_stage full`, `bridge_reasoning.stage 4`로 action expert까지 학습한다. `PRETRAINED_CKPT`가 있으면 `qwen_vl_interface` 모듈만 다시 불러온다 | Stage III |

다단계 스크립트의 stage별 설정은 다음과 같다.

| 항목 | LIBERO stage 1 / 2 / 3 / 4 | Bridge stage 1 / 2 / 3 / 4 |
|---|---|---|
| 최대 step | 5천 / 2천 / 2천 / 2천 | 1만 / 5천 / 5천 / 1만 |
| GPU당 배치 | 12 / 12 / 12 / 16 | 12 / 16 / 16 / 16 |
| VLM 손실 가중치 | 1.0 전 stage | 1.0 전 stage |
| img_next 손실 가중치 | 0.1 / 0.1 / 0.2 / 0.2 | 0.1 / 0.1 / 0.2 / 0.2 |
| GPU 수 | 8 | 8 |

단일 단계 스크립트는 LIBERO가 6만 step, GPU 1장(`nproc_per_node=1`), GPU당 배치 8이고, Bridge는 2만 step, GPU 8장, GPU당 배치 8이다.

### 3.5 평가와 배포

| 진입점 | 사용법 |
|---|---|
| LIBERO | LaRA-VLA 환경과 LIBERO 환경(Python 3.10 권장, numpy 1.24.4)을 따로 두고 `eval_libero_all.sh <checkpoint.pt>`로 suite 네 개를 GPU 여러 장에 병렬 평가한다. 결과는 `<checkpoint_dir>/eval_libero_implicit_parallel/` 아래에 쓴다 |
| SimplerEnv | `bridge_eval.sh <checkpoint.pt>`가 policy server와 SimplerEnv 과제를 병렬로 띄운다. `test_your_simplerEnv.py`로 환경을 먼저 점검한다 |
| 다수 checkpoint | `run_all_ckpts_libero_all.sh`, `run_all_ckpts_bridge.sh` |
| 실제 로봇 | `server_policy.py --ckpt_path ... --port 10093 --use_bf16`로 websocket policy server를 띄우고 컨트롤러가 `debug_server_policy.py`를 참고해 접속한다. `readme-deployment.md`는 네트워크 설정과 frankx 설치 메모만 남아 있다 |

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

README의 결과표는 논문 Table 2, Table 3과 같다.

| 벤치마크 | LaRA-VLA | 표 안의 두 번째로 높은 평균 |
|---|---|---|
| LIBERO (Spatial / Goal / Object / Long) | 96.4 / 98.6 / 99.8 / 96.6, 평균 97.9% | OpenVLA-OFT 97.1% |
| SimplerEnv WidowX (Spoon / Carrot / Block / Eggplant) | 95.8 / 62.5 / 25.0 / 91.7, 평균 68.8% | UD-VLA 62.5% |

README는 LIBERO 결과가 `examples/LIBERO/README.md`의 평가 절차, Bridge 결과가 SimplerEnv 기반 절차에 대응한다고 적는다. 실제 로봇 결과와 추론 지연은 README에 없다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **Bridge 영상 미포함**: 공개 Bridge 데이터셋에 `videos/`가 없어 사용자가 원본을 따로 마련해야 학습할 수 있다.
- **논문 설정과의 차이**: LIBERO 단일 단계 스크립트는 6만 step인데 논문 Table 5의 LIBERO Stage III는 4만 step이다. LIBERO 다단계 스크립트의 stage 2~3 배치는 12인데 Table 5의 Stage II 배치는 16이다. Bridge 단일 단계 스크립트는 2만 step인데 Table 5의 SimplerEnv Stage III는 6만 step이다. Bridge 다단계 설정은 Table 5와 일치한다.
- **실제 로봇 코드**: 실제 로봇 데이터셋, 학습 설정, 컨트롤러 코드는 공개되지 않았고 policy server만 있다.
- **라이선스 검토 미완**: THIRD_PARTY_NOTICES는 NVIDIA Isaac-GR00T(Apache-2.0), OpenAI diffusion 저장소(MIT), Meta DiT, DINOv2(Apache-2.0), OpenVLA와 Prismatic(MIT) 유래 파일을 나열한다. Meta DiT 유래 `models.py`를 가장 라이선스에 민감한 파일로 지목하고 상업적 배포 전 검토를 권고한다. 공개 일정 문서도 법률과 출처 검토가 남아 있다고 적는다.
- **정리 중인 코드**: 공개 일정 문서(중국어)는 하드코딩 경로와 디버그 진입점 제거, 설정 정리, 문서 재작성, CI를 7개 Phase로 나눠 진행 중이라고 적는다. `bridge.yaml`의 `cot_path`와 `bbox_path`에는 `/share/project/...` 형태의 내부 절대 경로가 남아 있어 사용자가 고쳐야 한다. 설정의 `framework.name: QwenGR00T`, Bridge 스크립트의 `reasoning_summary`, `reasoning_film` 같은 미사용 옵션이 남아 있다.

## 6. 관련 연구 (Related Work)

- [[physical-ai/bai-2026-latent-reasoning-vla-latent-thinking]]: 이 저장소가 구현하는 논문.
- [[physical-ai/bai-2026-lara-vla-project-page]]: 같은 연구의 소개 페이지와 실제 로봇 영상.
- [[physical-ai/starvla-vlact]]: 같은 StarVLA 코드베이스에서 나온 다른 VLA 저장소.
- [[physical-ai/nvidia-isaac-gr00t]]: 데이터로더와 flow matching head 일부 파일의 출처.
- [[physical-ai/kim-2024-openvla-an-open-source-vision-language-action-model]]: 로깅 유틸리티 출처이자 baseline.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| `cot_mode: implicit` | 추론 시 CoT 텍스트를 생성하지 않고 thinking 토큰 자리의 latent로만 추론하는 모드. 공개 저장소의 유일한 기본 모드다 |
| `bridge_reasoning.stage` | 학습 문자열 형식을 정하는 단계 값. 1은 명시적 CoT, 2 이상은 thinking 토큰으로 텍스트를 대체한다 |
| `training_stage` | `reasoning_only`(VLM만 학습)와 `full`(action expert 포함) 두 값 |
| `img_next` | 다음 프레임 visual latent를 예측하는 토큰 설정 |
| StarVLA | 이 저장소가 바탕으로 삼은 오픈소스 VLA 코드베이스 |
