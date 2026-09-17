---
title: "VLA-JEPA (ginwind/VLA-JEPA, GitHub repo)"
type: repo
year: 2026
category: physical-ai
raw_path: raw/repos/ginwind-vla-jepa.md
raw_filename: "ginwind-vla-jepa.md"
source_collection: external
org: "ginwind"
repo: "VLA-JEPA"
url: "https://github.com/ginwind/VLA-JEPA"
license: "Apache-2.0 (README 배지 기준, 저장소에 LICENSE 파일 없음)"
tags: [physical-ai, vla, world-model, robot-learning, benchmark]
figures:
  - id: fig01
    file: assets/ginwind-vla-jepa/VLA-JEPA.png
    raw: https://raw.githubusercontent.com/ginwind/VLA-JEPA/main/assets/VLA-JEPA.png
    caption: "README 상단의 VLA-JEPA 개요 이미지. 저장소 assets/VLA-JEPA.png를 in-place 참조한다"
    strategy: manual
    curated: false
---

## 한 줄 요약 (One-line Summary)

VLA-JEPA 논문의 공식 코드 저장소로, starVLA 코드베이스 위에 Qwen3-VL-2B와 V-JEPA2 인코더를 결합한 학습 코드(일부)와 LIBERO, LIBERO-Plus, SimplerEnv 세 벤치마크의 평가 스크립트, Hugging Face 체크포인트 2종의 사용법을 README 한 장에 담고 있다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 저장소 | https://github.com/ginwind/VLA-JEPA |
| 저장소 설명 | [ECCV 2026] VLA-JEPA: Enhancing Vision-Language-Action Model with Latent World Model |
| 논문 | arXiv 2602.10098 |
| 프로젝트 페이지 | https://ginwind.github.io/VLA-JEPA/ |
| 가중치 | https://huggingface.co/ginwind/VLA-JEPA |
| 라이선스 | README 배지는 Apache 2.0을 표시하지만 배지 링크가 tatsu-lab/stanford_alpaca의 LICENSE로 향하고, 저장소 최상위에 LICENSE 파일이 없다 |
| 최상위 구성 | README.md, assets/, deployment/, examples/, pyproject.toml, requirements.txt, scripts/, starVLA/ |
| 기반 코드 | starVLA (README 명시) |
| 수집 | 2026-09-17, main 브랜치 README 전문 |

## 2. 주요 기여 (Key Contributions)

README가 제공하는 것은 네 가지다.

1. **학습 코드.** TODO 목록의 첫 항목이 "Partial training code"로, 학습 코드는 일부만 공개됐다고 README 스스로 밝힌다. 사전 준비 모델, 데이터셋 다섯 종, YAML 설정 키, 커스텀 데이터셋 확장 방법을 적는다.
2. **평가 코드 3종.** LIBERO, LIBERO-Plus, SimplerEnv 각각의 환경 구성, 설정 파일 수정, 실행 스크립트를 단계별로 적는다.
3. **체크포인트.** Hugging Face ginwind/VLA-JEPA에서 받는 VLA-JEPA-LIBERO.pt(LIBERO와 LIBERO-Plus 공용)와 VLA-JEPA-Simpler.pt 두 파일을 언급한다.
4. **커스텀 데이터 학습.** LeRobot v2.1 형식 로봇 데이터와 사람 영상 데이터로 학습을 확장하는 절차를 적는다.

TODO 목록 5개 항목은 모두 완료 표시다.

| 항목 | 상태 |
|---|---|
| Partial training code | 완료 |
| LIBERO evaluation code | 완료 |
| LIBERO-Plus evaluation code | 완료 |
| SimplerEnv evaluation code | 완료 |
| Training codes for custom datasets | 완료 |

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

README는 모델 구조를 설명하지 않고 상단 개요 이미지 한 장과 논문 링크로 대신한다. 아래는 README가 적는 설치, 학습, 평가 절차다.

### 3.1 환경 설정

```
git clone https://github.com/ginwind/VLA-JEPA
conda create -n VLA_JEPA python=3.10 -y
conda activate VLA_JEPA
pip install -r requirements.txt
pip install flash-attn --no-build-isolation
pip install -e .
```

Python 3.10 conda 환경에 requirements.txt, FlashAttention2, 프로젝트 자체를 순서대로 설치한다. README는 이 저장소의 코드가 starVLA를 기반으로 한다고 명시한다.

### 3.2 학습 준비

**pre-training 모델.** Qwen3-VL-2B(Hugging Face Qwen/Qwen3-VL-2B-Instruct)와 V-JEPA2 인코더(facebook/vjepa2-vitl-fpc64-256)를 내려받는다.

**데이터셋.** 다섯 종을 Hugging Face에서 받는다.

| 데이터셋 | 출처 | 용도 (논문 기준) |
|---|---|---|
| ssv2 | morpheushoc/something-something-v2 | 사람 영상 pre-training |
| Droid | IPEC-COMMUNITY/droid_lerobot | 로봇 데이터 pre-training |
| LIBERO | IPEC-COMMUNITY libero-benchmark-dataset 컬렉션 | LIBERO와 LIBERO-Plus fine-tuning |
| BridgeV2 | IPEC-COMMUNITY/bridge_orig_lerobot | SimplerEnv WidowX post-training |
| Fractal | IPEC-COMMUNITY/fractal20220817_data_lerobot | SimplerEnv Google Robot post-training |

로봇 데이터셋에는 각 LeRobot 데이터셋의 meta/ 하위에 modality.json을 추가해야 한다. LIBERO, BridgeV2, Fractal, Droid용 modality.json은 ./examples 아래에 제공되며 BridgeV2와 Fractal은 ./examples/SimplerEnv에 있다.

**학습 시작.** pre-training인지 post-training인지에 따라 /scripts 디렉토리에서 학습 스크립트와 YAML 설정을 고른다. YAML에서 갱신할 키는 다음과 같다.

| YAML 키 | 값 |
|---|---|
| framework.qwenvl.basevlm | Qwen3-VL-2B 체크포인트 경로 |
| framework.vj2_model.base_encoder | V-JEPA2 인코더 체크포인트 경로 |
| datasets.vla_data.data_root_dir | 로봇 데이터셋 경로 |
| datasets.video_data.video_dir | 사람 영상 디렉토리 |
| datasets.video_data.text_file | 영상 설명 텍스트 파일 |

### 3.3 커스텀 데이터셋 학습

로봇 데이터와 사람 영상 데이터를 각각 또는 함께 지정해 학습할 수 있다.

**로봇 데이터.** LeRobot v2.1 형식만 지원하므로 먼저 변환한다. 이후 절차는 세 단계다.

1. starVLA/dataloader/gr00t_lerobot/data_config.py에 커스텀 로봇 데이터셋 설정 클래스를 정의한다. video-key 필드는 modality.json에 미리 정의된 값과 일치해야 하며, examples/Droid/modality.json이 참고 예시다. ROBOT_TYPE_CONFIG_MAP에 robot_type에서 설정 클래스로의 매핑을 추가한다.
2. robot_type은 starVLA/dataloader/gr00t_lerobot/mixtures.py의 DATASET_NAMED_MIXTURES가 지정한다. dict 키가 YAML의 datasets.vla_data.data_mix에 대응하고, 값은 하위 데이터셋 튜플이다. 하위 데이터셋 튜플은 subdirectory, version, robot_type 세 항목이며 robot_type이 상태와 action 정규화, 필드 정렬용 설정을 고른다.
3. YAML 설정을 갱신하고 학습을 시작한다.

**사람 영상.** 두 경로가 있다. 직접 DataLoader를 구현하고 starVLA/dataloader/__init__.py의 build_dataloader 안에서 dataset_py에서 dataloader로의 매핑을 갱신하거나, 제공된 영상 dataloader를 쓰고 YAML의 datasets.video_data를 설정한다.

| 필드 | 뜻 |
|---|---|
| dataset_py | 제공된 영상 dataloader 사용 (변경 불필요) |
| video_dir | 영상 파일 디렉토리. 파일명은 index이고 확장자는 extensions가 정한다 |
| text_file | 헤더 없는 CSV. 첫 열이 index, 둘째 열이 영상 텍스트 설명 |
| CoT_prompt | latent action 학습용 프롬프트 템플릿 (변경 불필요) |
| extensions | 영상 파일 확장자 목록 |

### 3.4 평가 절차

체크포인트는 Hugging Face ginwind/VLA-JEPA에서 받는다. VLA-JEPA 환경에 tyro, matplotlib, mediapy, websockets, msgpack을 추가 설치하고 numpy를 1.24.4로 고정한다.

세 벤치마크는 공통 절차를 따른다. 벤치마크 코드를 별도 conda 환경에 설치하고, 받은 체크포인트 폴더의 config.json과 config.yaml에서 framework.qwenvl.basevlm과 framework.vj2_model.base_encoder를 로컬 경로로 바꾼 뒤, 평가 스크립트의 변수를 채워 실행한다.

| 벤치마크 | 벤치마크 설치 | 스크립트 | 채울 변수 | 체크포인트 | 병렬 실행 |
|---|---|---|---|---|---|
| LIBERO | Lifelong-Robot-Learning/LIBERO 공식 절차 | examples/LIBERO/eval_libero.sh | LIBERO_HOME(4행), sim_python(9행), your_ckpt(11행) | LIBERO/checkpoints/VLA-JEPA-LIBERO.pt | 4개 suite를 GPU 4대에서 |
| LIBERO-Plus | sylvestf/LIBERO-plus 클론. examples/LIBERO-Plus/libero_plus_init.py 121행을 task_classification.json 경로로 바꾸고, 원본 benchmark/__init__.py를 제공된 파일로 교체해 perturbation 항목별 평가를 켠다 | examples/LIBERO-Plus/eval_libero_plus.sh | LIBERO_HOME(4행), sim_python(9행), your_ckpt(11행) | LIBERO/checkpoints/VLA-JEPA-LIBERO.pt (LIBERO와 공용) | 7개 perturbation 항목을 GPU 7대에서 |
| SimplerEnv | simpler-env/SimplerEnv 공식 절차 | examples/SimplerEnv/eval_files/auto_eval_scripts/batch_evaluate.sh | SimplerEnv_PATH, sim_python, MODEL_PATH | SimplerEnv/checkpoints/VLA-JEPA-Simpler.pt | (명시 없음, Notes에서 GPU 8대) |

SimplerEnv는 실행 후 하위 과제별 rollout 영상이 생성되고, calc_success_rate.sh로 성공률을 계산한다.

```
bash ./examples/SimplerEnv/eval_files/auto_eval_scripts/calc_success_rate.sh <task_suite> <model_path> <log_dir>
```

task_suite는 pick_coke_can, move_near, drawer, long_horizon_apple_in_drawer, bridge_put_on 다섯 값 중 하나다. bridge_put_on이 WidowX 로봇 평가이고 나머지 넷이 Google Robot 평가다. log_dir은 생성된 영상의 루트 디렉토리이며 기본값은 평가 출력 디렉토리 아래 ./results다.

Notes는 각 프로세스가 GPU 하나를 써야 하고, 실행 전 설정 파일의 체크포인트 경로를 모두 확인하라고 적는다. LIBERO는 4개 suite를 GPU 4대에서, LIBERO-Plus와 SimplerEnv는 GPU 8대에서 병렬 평가하며, GPU가 적으면 실행 스크립트의 병렬화 로직을 고친다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

README는 성능 수치를 싣지 않는다. 수치는 논문과 프로젝트 페이지에 있다. README가 재현 대상으로 삼는 평가는 다음 세 가지다.

| 평가 | 논문 대응 | README가 제공하는 것 |
|---|---|---|
| LIBERO 4개 suite | Table 1 | 평가 스크립트와 VLA-JEPA-LIBERO.pt |
| LIBERO-Plus 7개 perturbation | Table 3 | 수정된 benchmark/__init__.py와 평가 스크립트, 같은 체크포인트 |
| SimplerEnv 5개 task suite | Table 2 | 일괄 평가 스크립트, 성공률 계산 스크립트, VLA-JEPA-Simpler.pt |

실제 로봇 실험용 코드나 체크포인트, pre-training만 마친 체크포인트는 README에 언급이 없다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

README가 명시한 제약은 다음과 같다.

- 학습 코드는 "Partial training code"로 표기돼 일부만 공개됐다.
- 평가는 GPU 4대에서 8대의 병렬 실행을 전제하며 GPU가 적으면 스크립트를 직접 고쳐야 한다.

자료에 기술이 없어 확인할 수 없는 점은 다음과 같다.

- 라이선스 조항이 README 본문에 없다. Apache 2.0 배지는 있으나 링크가 tatsu-lab/stanford_alpaca의 LICENSE로 향하고 저장소에 LICENSE 파일이 없어 검증할 수 없다.
- 최상위 deployment/ 디렉토리의 내용을 README가 설명하지 않는다.
- LIBERO-Plus 절은 GPU 7대 병렬을, Notes는 LIBERO-Plus와 SimplerEnv를 GPU 8대에서 실행한다고 적어 서로 다르다.
- 어떤 부분의 학습 코드가 빠졌는지, pre-training 5만 스텝을 재현할 수 있는지는 README에 없다.
- 학습에 필요한 GPU 메모리와 시간, 평가에 걸리는 시간이 없다.

## 6. 관련 연구 (Related Work)

README는 Acknowledgement에서 starVLA 프로젝트와 V-JEPA2 프로젝트(facebookresearch/vjepa2)의 오픈소스 기여에 감사를 표한다. 코드 구조가 starVLA를 따르므로 dataloader 경로가 starVLA/dataloader/gr00t_lerobot/ 아래에 있고, 로봇 데이터 형식이 GR00T 계열이 쓰는 LeRobot과 modality.json 조합이다.

인용 형식은 다음과 같다.

```
@misc{vlajepa2026,
  title={VLA-JEPA: Enhancing Vision-Language-Action Model with Latent World Model},
  author={Jingwen Sun and Wenyao Zhang and Zekun Qi and Shaojie Ren and Zezhi Liu and Hanxin Zhu and Guangzhong Sun and Xin Jin and Zhibo Chen},
  year={2026},
  eprint={2602.10098},
  archivePrefix={arXiv},
  primaryClass={cs.RO},
  url={https://arxiv.org/abs/2602.10098},
}
```

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| starVLA | 이 저장소가 기반으로 삼은 VLA 코드베이스. dataloader와 설정 구조를 물려받았다 |
| modality.json | LeRobot 데이터셋의 meta/ 아래에 두는 파일. video-key 등 데이터셋의 모달리티 정의를 담으며 로봇 데이터셋마다 필요하다 |
| ROBOT_TYPE_CONFIG_MAP | data_config.py에서 robot_type 문자열을 데이터셋 설정 클래스로 잇는 매핑 |
| DATASET_NAMED_MIXTURES | mixtures.py에서 data_mix 이름을 하위 데이터셋 튜플 목록(subdirectory, version, robot_type)으로 잇는 dict |
| VLA-JEPA-LIBERO.pt | LIBERO와 LIBERO-Plus 평가에 공용으로 쓰는 체크포인트 |
| VLA-JEPA-Simpler.pt | SimplerEnv 평가용 체크포인트 |
| calc_success_rate.sh | SimplerEnv rollout 영상에서 task suite별 성공률을 계산하는 스크립트 |
