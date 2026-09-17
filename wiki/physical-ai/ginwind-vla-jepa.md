---
title: "VLA-JEPA (ginwind/VLA-JEPA, GitHub repo)"
type: repo
year: 2026
category: physical-ai
source: ginwind-vla-jepa.md
raw_path: raw/repos/ginwind-vla-jepa.md
raw_filename: "ginwind-vla-jepa.md"
source_collection: external
org: "ginwind"
repo: "VLA-JEPA"
url: "https://github.com/ginwind/VLA-JEPA"
license: "Apache-2.0 (README 배지 기준, 저장소에 LICENSE 파일 없음)"
tags: [physical-ai, vla, world-model, robot-learning, benchmark]
figures: []
---

## 요약

ginwind/VLA-JEPA는 VLA-JEPA 논문의 공식 코드 저장소다. starVLA 코드베이스 위에 Qwen3-VL-2B와 V-JEPA2 인코더를 결합한 학습 코드 일부, LIBERO와 LIBERO-Plus와 SimplerEnv 세 벤치마크의 평가 스크립트, Hugging Face에 올린 체크포인트 2종의 사용법을 README 한 장에 담는다. 저장소 설명에는 ECCV 2026 게재가 표기돼 있다.

이 페이지는 저장소가 제공하는 것과 설치, 학습, 평가 절차, 라이선스 상태에 집중한다. 모델 구조와 정량 결과는 원 논문 페이지([[physical-ai/sun-2026-vla-jepa-enhancing-vision-language-action-model-with]])가 다루고, 시연 영상과 고해상도 도식은 프로젝트 페이지([[physical-ai/sun-2026-vla-jepa-project-page]])가 다룬다.

README가 밝히는 공개 범위는 제한적이다. TODO 목록의 첫 항목이 "Partial training code"라서 학습 코드는 일부만 공개됐고, 실제 로봇 실험용 코드나 pre-training만 마친 체크포인트는 언급이 없다. 반면 세 벤치마크 평가는 환경 구성부터 성공률 계산까지 단계별로 적혀 있어 논문 Table 1, 2, 3의 재현이 README의 주된 목적이다.

## 배경

VLA-JEPA는 action 라벨이 없는 사람 영상에서 latent action을 배우는 VLA pre-training 프레임워크다. latent action은 두 프레임 사이의 변화를 명시적 제어 명령 대신 모델 내부 표현으로 담은 변수를 말한다. 논문은 Something-Something-v2 사람 영상 22만 개와 Droid 로봇 trajectory 7만 6천 개로 pre-training한 뒤 벤치마크별 시연 데이터(demonstration)로 fine-tuning했다.

저장소의 코드 구조는 starVLA를 따른다. README가 명시적으로 밝히는 사실이며, dataloader 경로가 starVLA/dataloader/gr00t_lerobot/ 아래에 있고 로봇 데이터 형식이 GR00T 계열이 쓰는 LeRobot과 modality.json 조합이라는 점에서도 드러난다. Acknowledgement는 starVLA와 V-JEPA2 두 프로젝트에 감사를 표한다.

## 핵심 개념

**LeRobot v2.1과 modality.json.** 저장소가 받는 로봇 데이터 형식이다. LeRobot은 Hugging Face의 로봇 데이터셋 형식이고, modality.json은 각 데이터셋의 meta/ 하위에 두는 파일로 video-key 같은 모달리티 정의를 담는다. 로봇 데이터셋마다 이 파일이 필요하며 LIBERO, BridgeV2, Fractal, Droid용은 ./examples 아래에 제공된다.

**robot_type과 두 매핑.** 커스텀 로봇 데이터를 붙일 때 거치는 두 dict다. ROBOT_TYPE_CONFIG_MAP은 robot_type 문자열을 데이터셋 설정 클래스로 잇고, DATASET_NAMED_MIXTURES는 YAML의 data_mix 이름을 하위 데이터셋 튜플 목록으로 잇는다. robot_type이 상태와 action 정규화, 필드 정렬용 설정을 고른다.

**체크포인트 2종.** VLA-JEPA-LIBERO.pt는 LIBERO와 LIBERO-Plus 평가에 공용으로 쓰이고, VLA-JEPA-Simpler.pt는 SimplerEnv 평가에 쓰인다. 두 벤치마크가 같은 LIBERO 데이터셋으로 fine-tuning한 모델을 쓴다는 논문 서술과 일치한다.

## 저장소 구성

최상위 구성은 여덟 항목이다.

| 항목 | 내용 (README 기준) |
|---|---|
| README.md | 이 페이지가 다루는 문서 |
| assets/ | README 상단 개요 이미지 VLA-JEPA.png |
| deployment/ | README에 설명 없음 |
| examples/ | 벤치마크별 평가 스크립트, modality.json, LIBERO-Plus용 수정 파일 |
| pyproject.toml | pip install -e . 대상 |
| requirements.txt | 의존성 목록 |
| scripts/ | pre-training과 post-training용 학습 스크립트와 YAML 설정 |
| starVLA/ | 모델과 dataloader 코드. starVLA 기반 |

TODO 목록 5개 항목은 모두 완료 표시다.

| 항목 | 상태 |
|---|---|
| Partial training code | 완료 |
| LIBERO evaluation code | 완료 |
| LIBERO-Plus evaluation code | 완료 |
| SimplerEnv evaluation code | 완료 |
| Training codes for custom datasets | 완료 |

## 설치

Python 3.10 conda 환경에 requirements.txt, FlashAttention2, 프로젝트 자체를 순서대로 설치한다.

```
git clone https://github.com/ginwind/VLA-JEPA
conda create -n VLA_JEPA python=3.10 -y
conda activate VLA_JEPA
pip install -r requirements.txt
pip install flash-attn --no-build-isolation
pip install -e .
```

평가까지 하려면 같은 환경에 tyro, matplotlib, mediapy, websockets, msgpack을 추가 설치하고 numpy를 1.24.4로 고정한다. 벤치마크 시뮬레이터 자체는 각각 별도 conda 환경에 설치하며, 평가 스크립트가 sim_python 변수로 그 환경의 Python을 호출한다.

## 학습

### 사전 준비

pre-training 모델 두 개를 Hugging Face에서 받는다. Qwen3-VL-2B는 Qwen/Qwen3-VL-2B-Instruct이고 V-JEPA2 인코더는 facebook/vjepa2-vitl-fpc64-256이다. 논문의 아키텍처 사양과 같다.

데이터셋은 다섯 종이다.

| 데이터셋 | 출처 | 용도 (논문 기준) |
|---|---|---|
| ssv2 | morpheushoc/something-something-v2 | 사람 영상 pre-training |
| Droid | IPEC-COMMUNITY/droid_lerobot | 로봇 데이터 pre-training |
| LIBERO | IPEC-COMMUNITY libero-benchmark-dataset 컬렉션 | LIBERO와 LIBERO-Plus fine-tuning |
| BridgeV2 | IPEC-COMMUNITY/bridge_orig_lerobot | SimplerEnv WidowX post-training |
| Fractal | IPEC-COMMUNITY/fractal20220817_data_lerobot | SimplerEnv Google Robot post-training |

로봇 데이터셋 넷은 IPEC-COMMUNITY가 LeRobot 형식으로 변환해 올린 것이고, 각각의 meta/ 아래에 modality.json을 넣어야 한다. 제공 위치는 ./examples이며 BridgeV2와 Fractal은 ./examples/SimplerEnv에 있다.

### 학습 시작

pre-training인지 post-training인지에 따라 /scripts 디렉토리에서 학습 스크립트와 YAML 설정을 고른다. YAML에서 갱신할 키는 다섯 개다.

| YAML 키 | 값 |
|---|---|
| framework.qwenvl.basevlm | Qwen3-VL-2B 체크포인트 경로 |
| framework.vj2_model.base_encoder | V-JEPA2 인코더 체크포인트 경로 |
| datasets.vla_data.data_root_dir | 로봇 데이터셋 경로 |
| datasets.video_data.video_dir | 사람 영상 디렉토리 |
| datasets.video_data.text_file | 영상 설명 텍스트 파일 |

키 이름에서 저장소의 두 데이터 경로가 드러난다. vla_data가 로봇 데이터이고 video_data가 사람 영상이며, 논문의 두 손실(L_FM + β L_WM과 L_WM)이 각각에 대응한다.

### 커스텀 데이터셋

로봇 데이터와 사람 영상 데이터를 각각 또는 함께 지정해 학습할 수 있다.

로봇 데이터는 LeRobot v2.1 형식만 지원하므로 먼저 변환한다. 이후 절차는 세 단계다.

1. starVLA/dataloader/gr00t_lerobot/data_config.py에 커스텀 로봇 데이터셋 설정 클래스를 정의한다. video-key 필드는 modality.json에 미리 정의된 값과 일치해야 하며 examples/Droid/modality.json이 참고 예시다. ROBOT_TYPE_CONFIG_MAP에 robot_type에서 설정 클래스로의 매핑을 추가한다.
2. starVLA/dataloader/gr00t_lerobot/mixtures.py의 DATASET_NAMED_MIXTURES에 항목을 추가한다. dict 키가 YAML의 datasets.vla_data.data_mix에 대응하고 값은 하위 데이터셋 튜플이다. 튜플은 subdirectory, version, robot_type 세 항목이다.
3. YAML 설정을 갱신하고 학습을 시작한다.

사람 영상은 두 경로가 있다. 직접 DataLoader를 구현하고 starVLA/dataloader/__init__.py의 build_dataloader 안에서 dataset_py에서 dataloader로의 매핑을 갱신하거나, 제공된 영상 dataloader를 쓰고 YAML의 datasets.video_data를 설정한다.

| 필드 | 뜻 |
|---|---|
| dataset_py | 제공된 영상 dataloader 사용 (변경 불필요) |
| video_dir | 영상 파일 디렉토리. 파일명은 index이고 확장자는 extensions가 정한다 |
| text_file | 헤더 없는 CSV. 첫 열이 index, 둘째 열이 영상 텍스트 설명 |
| CoT_prompt | latent action 학습용 프롬프트 템플릿 (변경 불필요) |
| extensions | 영상 파일 확장자 목록 |

text_file의 둘째 열이 영상 텍스트 설명이라는 점은 논문의 데이터 정의와 맞는다. 논문은 사람 영상 데이터셋을 영상 집합과 지시문(instruction)의 쌍으로 정의하며, VLM이 초기 프레임과 지시문을 받아 latent action 토큰을 낸다.

## 평가

### 공통 절차

세 벤치마크는 같은 틀을 따른다.

1. 벤치마크 코드를 별도 conda 환경에 설치한다.
2. Hugging Face ginwind/VLA-JEPA에서 받은 체크포인트 폴더의 config.json과 config.yaml에서 framework.qwenvl.basevlm과 framework.vj2_model.base_encoder를 로컬 경로로 바꾼다.
3. 평가 스크립트의 변수를 채운다.
4. 스크립트를 실행한다.

| 벤치마크 | 벤치마크 설치 | 스크립트 | 채울 변수 | 체크포인트 | 병렬 실행 |
|---|---|---|---|---|---|
| LIBERO | Lifelong-Robot-Learning/LIBERO 공식 절차 | examples/LIBERO/eval_libero.sh | LIBERO_HOME(4행), sim_python(9행), your_ckpt(11행) | LIBERO/checkpoints/VLA-JEPA-LIBERO.pt | 4개 suite를 GPU 4대에서 |
| LIBERO-Plus | sylvestf/LIBERO-plus 클론 후 수정 2건 | examples/LIBERO-Plus/eval_libero_plus.sh | LIBERO_HOME(4행), sim_python(9행), your_ckpt(11행) | LIBERO/checkpoints/VLA-JEPA-LIBERO.pt (LIBERO와 공용) | 7개 perturbation 항목을 GPU 7대에서 |
| SimplerEnv | simpler-env/SimplerEnv 공식 절차 | examples/SimplerEnv/eval_files/auto_eval_scripts/batch_evaluate.sh | SimplerEnv_PATH, sim_python, MODEL_PATH | SimplerEnv/checkpoints/VLA-JEPA-Simpler.pt | Notes에서 GPU 8대 |

### LIBERO-Plus의 수정 2건

LIBERO-Plus는 LIBERO 4개 suite에 perturbation 7종을 가한 벤치마크다. perturbation은 카메라, 로봇 초기 상태, 언어, 조명, 배경, 잡음, 물체 배치처럼 과제 목표와 무관하게 입력을 바꾸는 교란을 뜻한다. 저장소는 perturbation 항목별 평가를 켜기 위해 원본 벤치마크에 두 가지 수정을 요구한다.

- examples/LIBERO-Plus/libero_plus_init.py의 121행을 LIBERO-Plus/libero/libero/benchmark/task_classification.json 경로로 바꾼다.
- 원본 LIBERO-Plus/libero/libero/benchmark/__init__.py를 제공된 libero_plus_init.py로 교체한다.

### SimplerEnv의 성공률 계산

SimplerEnv는 batch_evaluate.sh 실행 후 하위 과제별 rollout 영상이 생성되고, calc_success_rate.sh로 성공률을 계산한다. rollout은 policy를 실행해 trajectory를 만들어내는 과정이다.

```
bash ./examples/SimplerEnv/eval_files/auto_eval_scripts/calc_success_rate.sh <task_suite> <model_path> <log_dir>
```

| 인자 | 값 |
|---|---|
| task_suite | pick_coke_can, move_near, drawer, long_horizon_apple_in_drawer, bridge_put_on 중 하나 |
| model_path | VLA-JEPA-Simpler.pt 경로 |
| log_dir | 생성된 영상의 루트 디렉토리. 기본값은 평가 출력 디렉토리 아래 ./results |

bridge_put_on이 WidowX 로봇 평가이고 나머지 넷이 Google Robot 평가다. 논문 Table 2의 Google Robot 과제 Pick, Move, Drawer, Place와 WidowX 과제 Spoon, Carrot, Block, Eggplant가 이 다섯 suite에 대응한다.

### GPU 요구

Notes는 각 프로세스가 GPU 하나를 써야 하고 실행 전 설정 파일의 체크포인트 경로를 모두 확인하라고 적는다. LIBERO는 4개 suite를 GPU 4대에서, LIBERO-Plus와 SimplerEnv는 GPU 8대에서 병렬 평가한다. GPU가 적으면 실행 스크립트의 병렬화 로직을 직접 고친다.

## 논문과의 대응

README는 성능 수치를 싣지 않는다. 재현 대상과 논문 표의 대응은 다음과 같다.

| README 평가 | 논문 대응 | 제공 항목 |
|---|---|---|
| LIBERO 4개 suite | Table 1 | 평가 스크립트, VLA-JEPA-LIBERO.pt |
| LIBERO-Plus 7개 perturbation | Table 3 | 수정된 benchmark/__init__.py, 평가 스크립트, 같은 체크포인트 |
| SimplerEnv 5개 task suite | Table 2 | 일괄 평가 스크립트, 성공률 계산 스크립트, VLA-JEPA-Simpler.pt |

논문의 실제 로봇 실험(Figure 4, 부록 B)과 ablation(Table 4, Figure 5, Figure 6)에 대응하는 코드나 체크포인트는 README에 없다.

## 한계

README가 명시한 제약은 다음과 같다.

- 학습 코드는 "Partial training code"로 표기돼 일부만 공개됐다.
- 평가는 GPU 4대에서 8대의 병렬 실행을 전제하며 GPU가 적으면 스크립트를 직접 고쳐야 한다.

자료에 기술이 없어 확인할 수 없는 점은 다음과 같다.

- 라이선스 조항이 README 본문에 없다. Apache 2.0 배지는 있으나 링크가 tatsu-lab/stanford_alpaca의 LICENSE로 향하고 저장소에 LICENSE 파일이 없어 검증할 수 없다. frontmatter의 license 값은 배지 기준이다.
- 최상위 deployment/ 디렉토리의 내용을 README가 설명하지 않는다.
- LIBERO-Plus 절은 GPU 7대 병렬을, Notes는 LIBERO-Plus와 SimplerEnv를 GPU 8대에서 실행한다고 적어 서로 다르다.
- 어떤 부분의 학습 코드가 빠졌는지, pre-training 5만 스텝을 재현할 수 있는지는 README에 없다.
- 학습에 필요한 GPU 메모리와 시간, 평가에 걸리는 시간이 없다.
- README 상단 개요 이미지 assets/VLA-JEPA.png는 이 wiki에 복사하지 않았다. 같은 구조도는 논문 페이지와 프로젝트 페이지에 있다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| starVLA | 이 저장소가 기반으로 삼은 VLA 코드베이스. dataloader와 설정 구조를 물려받았다 |
| modality.json | LeRobot 데이터셋의 meta/ 아래에 두는 파일. video-key 등 데이터셋의 모달리티 정의를 담으며 로봇 데이터셋마다 필요하다 |
| ROBOT_TYPE_CONFIG_MAP | data_config.py에서 robot_type 문자열을 데이터셋 설정 클래스로 잇는 매핑 |
| DATASET_NAMED_MIXTURES | mixtures.py에서 data_mix 이름을 하위 데이터셋 튜플 목록(subdirectory, version, robot_type)으로 잇는 dict |
| VLA-JEPA-LIBERO.pt | LIBERO와 LIBERO-Plus 평가에 공용으로 쓰는 체크포인트 |
| calc_success_rate.sh | SimplerEnv rollout 영상에서 task suite별 성공률을 계산하는 스크립트 |

## 관련 페이지

- [[physical-ai/sun-2026-vla-jepa-enhancing-vision-language-action-model-with]]: 원 논문 페이지. 이 저장소가 재현 대상으로 삼는 Table 1, 2, 3과 아키텍처 사양
- [[physical-ai/sun-2026-vla-jepa-project-page]]: 공식 프로젝트 페이지. 시연 영상과 고해상도 도식
- [[physical-ai/yang-2026-hivla-a-visual-grounded-centric-hierarchical-embodied]]: starVLA 코드베이스를 비교 대상으로 쓴 HiVLA 논문. 이 저장소의 기반 코드가 어떤 것인지 가늠하는 참고
- [[physical-ai/huggingface-lerobot]]: LeRobot. 이 저장소가 받는 로봇 데이터 형식
- [[physical-ai/nvidia-isaac-gr00t]]: Isaac-GR00T. modality.json 기반 데이터 설정의 출처 계열
- [[physical-ai/liu-2026-libero-recover-beyond-task-success-towards]]: LIBERO 벤치마크를 확장한 연구. LIBERO 평가 환경의 배경
