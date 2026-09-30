---
title: "VLAct (starVLA/VLAct, GitHub repo)"
type: repo
year: 2026
category: physical-ai
source: starvla-vlact.md
raw_path: raw/repos/starvla-vlact.md
raw_filename: "starvla-vlact.md"
source_collection: external
org: "starVLA"
repo: "VLAct"
url: "https://github.com/starVLA/VLAct"
license: "MIT (README License 절과 배지 표기. GitHub API는 LICENSE 파일을 NOASSERTION으로 분류한다)"
tags: [physical-ai, vla, robot-learning, manipulation]
---

## 요약

starVLA/VLAct는 [[physical-ai/yang-2026-beyond-data-scaling-representation-centric-continued]] 논문의 공식 코드 저장소다. 논문이 제안한 representation-centric continued pre-training 레시피의 학습 코드, 다섯 벤치마크의 fine-tuning과 평가 스크립트, 실제 로봇용 policy 서버를 담고, 학습한 backbone과 벤치마크별 checkpoint를 Hugging Face에 공개한다. 2026년 8월 25일에 만들어졌고 README 기준으로 NeurIPS 2026에 채택됐다.

continued pre-training은 이미 pre-training된 VLM에서 출발해 downstream fine-tuning 전에 다양한 로봇 trajectory로 학습하는 단계를 말한다. 저장소의 목적은 이 단계를 재현하고, 그 결과물인 Qwen3-VL-4B backbone을 새 로봇과 새 action head에 재사용하게 하는 것이다. 코드는 StarVLA 코드베이스를 기반으로 한다.

README는 공개 checkpoint를 바로 쓰는 법보다 backbone을 어떻게 옮겨 쓰는지를 더 강조한다. continued pre-training checkpoint는 배치 가능한 policy가 아니며, 새 embodiment나 데이터셋에는 벤치마크별 policy가 아니라 이 backbone에서 fine-tuning을 시작하라고 권장한다. 또한 논문 설정과 공개 artifact 사이의 차이를 별도 안내로 밝혀 두었다.

## 배경

VLA는 이미지와 지시문(instruction)을 받아 로봇 action을 출력하는 vision-language-action model이다. 대부분의 VLA는 VLM backbone 위에 action head를 붙이고 로봇 데이터로 학습한다. backbone은 상위 head가 올라타는 pre-training된 특징 추출 본체이고, action head는 backbone 표현을 로봇 action으로 바꾸는 출력 모듈이다.

논문은 이 구조의 continued pre-training에서 세 가지 실패 양상을 찾았다. README는 이를 표 하나로 요약한다.

| 번호 | 실패 양상 | 설명 | README가 드는 근거 |
|---|---|---|---|
| 1 | Prior erosion | 로봇 데이터가 웹 규모 코퍼스보다 훨씬 좁아 end-to-end 갱신이 쓸모 있는 시각-언어 feature를 덮어쓴다 | backbone 전체 갱신 시 LIBERO-Plus 78.9%, 얕은 layer 보호 시 82.6% |
| 2 | Decoder lock-in | 단일 pre-training head가 backbone을 그 head의 디코딩 기하에 특화시킨다 | OFT pre-training이 OFT fine-tuning을 61.7%에서 75.8%로 올리지만 PI fine-tuning은 60.5%에서 55.1%로 scratch 아래로 떨어뜨린다 |
| 3 | Discretization loss | 이산 action 토큰은 대략적 구조는 가르치지만 세밀한 시간과 진폭 정보를 잃는다 | FAST로 pre-training하고 FAST로 fine-tuning하면 45.2%, GR00T로 fine-tuning하면 76.7% |

VLAct는 세 실패 양상을 모두 continued pre-training 단계에서 다룬다. downstream에서는 pre-training head를 버리고 원하는 head를 새로 초기화해 붙인 뒤 backbone 전체를 동결 해제하고 평소처럼 fine-tuning한다. README는 matched Qwen3-VL-OFT baseline과의 모든 비교에서 바뀌는 것이 VLM backbone 가중치뿐이라는 점을 강조한다. 즉 downstream head와 초기화, 데이터, optimizer, 예산이 모두 같으므로 성능 차이는 학습된 backbone 표현에서 나온다.

## 핵심 개념

action chunk는 policy가 한 번에 출력하는 여러 timestep 분량의 action 묶음이다. VLAct의 세 pre-training head는 모두 같은 정답 action chunk를 예측하도록 학습된다.

embodiment는 로봇의 물리적 형상과 그에 딸린 제어 API 구성을 뜻한다. 저장소의 pre-training 데이터에는 Franka 단일 팔과 AgileX 양팔이 섞여 있으며, 두 로봇의 action 차원 구성이 다르다는 점이 부분 통합 action layout을 도입한 이유다.

embodiment tag는 어떤 로봇의 데이터인지 가리키는 문자열 키로, state와 action 배열을 해석할 modality config를 고른다. 저장소의 dataloader가 GR00T 계열의 LeRobot 형식을 따르므로 이 개념이 그대로 쓰인다.

flow matching은 noise에서 데이터로 향하는 vector field를 학습해 샘플을 만드는 생성 기법이다. 세 head 중 PI와 GR00T가 이 방식으로 action chunk를 생성하고, OFT는 MLP로 연속 action을 직접 회귀한다.

## 레시피 요소

### VLM prior 보존

첫 요소는 vision encoder와 LLM 하위 절반 layer를 동결하는 shallow-layer protection과, 모든 minibatch에 image caption 데이터를 섞는 co-training이다. README가 적은 손실은 L_total = L_action + 0.5 L_VLM-CE다. 얕은 layer는 넓은 시각과 공간 처리를 맡고, caption은 물체, 속성, 관계, 장면 맥락에 대한 촘촘한 지도를 주어 학습 가능한 layer를 원래 동작 영역 가까이 붙잡는다는 설명이다.

| pre-training 갱신 방식 | LIBERO-Plus | RoboTwin 2.0 |
|---|---|---|
| backbone 전체 갱신 | 78.9% | 77.1% |
| vision encoder만 동결 | 81.3% | 79.3% |
| vision encoder와 하위 절반 LLM layer 동결 | 82.6% | 80.5% |

README는 보조 데이터 ablation 그래프도 함께 싣는다. 고정 예산에서 테스트한 모든 비action 원천이 도움이 되고 image caption의 효과가 가장 크며, 텍스트 전용 지시 데이터도 로봇 데이터만 쓴 학습보다 낫다. README는 이를 보조 co-training이 과제 지식 전이만이 아니라 표현 보존과 다양화로 작동한다는 근거로 든다.

### action 지도 다양화

둘째 요소는 OFT, PI, GR00T 세 연속 head를 하나의 공유 latent에 붙여 같은 정답 chunk를 예측시키는 것이다. latent는 겉으로 드러나지 않는 모델 내부의 표현 공간을 가리킨다. 학습 목표는 L_action = L_OFT + L_PI + L_GR00T이며, 새 head나 alignment 모듈 없이 head 다양성 자체가 지도 신호다. 세 head가 서로 다른 디코더 편향을 부과하므로 backbone은 한 head만 읽을 수 있는 feature에 기댈 수 없다. 모든 head가 backbone forward 한 번을 공유하므로 비용은 가벼운 디코더 몇 개뿐이다.

PI를 downstream head로 둔 RoboTwin 2.0 결과는 다음과 같다.

| pre-training head | PI를 pre-training에서 봤는가 | PI fine-tuning | scratch 대비 |
|---|---|---|---|
| 없음 | 해당 없음 | 60.5% | 기준 |
| OFT | 아니오 | 55.1% | −5.4%p |
| OFT + GR00T | 아니오 | 63.1% | +2.6%p |
| OFT + PI + GR00T | 예 | 77.0% | +16.5%p |

head를 하나 더하면 pre-training에서 보지 않은 head의 결과가 scratch 아래에서 위로 바뀐다. 같은 head 성능도 matched single-head pre-training 대비 OFT가 78.8%에서 80.5%로, PI가 75.4%에서 77.0%로, GR00T가 71.7%에서 76.0%로 올라, head 다양성이 같은 head 성능을 희생하지 않는다.

### embodiment 간 action 의미 통합

셋째 요소는 부분 통합된 20차원 action layout 하나에 공유 head를 두는 것이다. 물리적으로 비교 가능한 차원만 같은 좌표를 공유하고, 호환되지 않는 운동학은 강제로 맞추지 않는다. embodiment adapter, router, 조건부 디코더는 없다.

| 차원 | 의미 |
|---|---|
| 1~12 | 양팔 embodiment의 두 6-DoF 팔 (절대 관절 각도) |
| 13~18 | 단일 팔 embodiment의 6-DoF delta end-effector pose |
| 19 | 공유 그리퍼 좌표 (Franka 그리퍼와 AgileX 왼쪽 그리퍼) |
| 20 | 오른쪽 그리퍼 |

end-effector는 로봇 팔 끝에서 물체와 접촉하는 부분이다. 각 샘플은 활성 차원에서만 손실을 내고 나머지는 mask한다. 주기 관절에는 wrap-aware loss를 더해 179°와 −179°를 358°가 아니라 2° 차이로 취급한다. 잔차를 δ_wrap = ((â − a) + π) mod 2π − π로 감싸며 절대 관절 차원에만 적용한다.

| action space 설계 | RoboTwin 2.0 | LIBERO-Plus |
|---|---|---|
| embodiment별 분리 head | 78.5% | 81.1% |
| 통합 head (alignment 없음) | 79.5% | 81.4% |
| 통합 action 표현 | 80.5% | 82.6% |

| wrap 설정 (RoboTwin 2.0) | 성공률 |
|---|---|
| 원래 관절 각도 baseline | 75.5% |
| 통합 관절 공간 | 78.6% |
| 통합 관절 공간 + wrap-aware loss | 80.5% |

### 레시피와 구현의 대응

README의 대응표는 논문의 각 요소가 어떤 launcher 인자로 켜지는지를 알려 준다. 모든 인자는 `scripts/run_scripts/Pretrain/pretrain_qwen3_single_node.sh`에 설정돼 있고, multi-head framework 본체는 `starVLA/model/framework/QwenHybrid_xrobot_padding.py`다.

| 레시피 요소 | 구현 위치 |
|---|---|
| shallow-layer protection (vision encoder와 LLM layer 0~17) | `--trainer.freeze_modules` |
| caption 혼합 co-training | `--datasets.vlm_data.dataset_use`, `--trainer.loss_scale.vlm` |
| multi-head 동시 지도 | `--framework.heads oft,gr00t,pi`, `--framework.head_loss_weights` |
| 부분 통합 action layout | `--framework.disjoint_action_layout`, `--framework.mask_padded_action_dims` |
| wrap-aware loss | `--trainer.shortest_angular_joint_loss*`, `--trainer.endpoint_wrap_loss_weight` |

LLM layer 0~17 동결은 논문 본문의 "하위 절반"을 구체적인 layer 번호로 적은 것이다. 논문의 attention 시각화도 Layer17과 Layer18 사이에 경계선을 긋는다.

## 설치

저장소는 Linux, Python 3.10, NVIDIA GPU, CUDA 호환 PyTorch 환경을 검증 대상으로 둔다. 설치 순서는 아래와 같다.

1. `git clone https://github.com/starVLA/VLAct.git`으로 저장소를 받는다.
2. `conda create -n vlact python=3.10 -y`로 환경을 만들고 활성화한다.
3. pytorch.org 안내에 따라 CUDA 호환 PyTorch를 먼저 설치한다.
4. `python -m pip install -r requirements.txt`로 의존성을 설치한다.
5. `python -m pip install flash-attn==2.7.4.post1 --no-build-isolation`으로 FlashAttention을 설치한다.
6. `python -m pip install -e .`로 패키지를 편집 가능 모드로 설치한다.

FlashAttention은 CUDA toolkit과 PyTorch 버전이 맞아야 한다. 대부분은 `--no-build-isolation`으로 해결되며, 그렇지 않으면 `nvcc -V`와 설치된 torch, transformers, flash-attn 버전을 확인해 맞는 release를 고르라고 README가 안내한다.

## 학습과 평가

### continued pre-training

continued pre-training 전체 절차는 별도 가이드 `scripts/run_scripts/Pretrain/README.md`에 있다. 가이드가 다루는 범위는 다음과 같다.

- base model 다운로드
- VLM 데이터와 로봇 데이터 준비
- LeRobot v2.1 layout 구성
- cache와 통계 생성
- 경로 설정
- 단일 노드와 다중 노드 학습

실행 진입점은 두 개다. 단일 노드 GPU 8개는 `bash scripts/run_scripts/Pretrain/pretrain_qwen3_single_node.sh`, 다중 노드 Slurm 클러스터는 `sbatch scripts/run_scripts/Pretrain/pretrain_qwen3_slurm.sh`다. launcher가 머신별 Accelerate/DeepSpeed 설정을 참조하므로 실행 전에 가이드의 설정 안내를 먼저 확인해야 한다.

pre-training 데이터 정제와 cache 생성 코드는 데이터셋별로 `examples/DROID/`, `examples/InternA1/`, `examples/MolmoAct/`, `examples/RoboCoin/`에 있다. 논문 부록이 설명하는 과제 이름 필터링, delta end-effector의 FPS 환산과 step 단위 mask, 관절 각도 감싸기, 그리퍼 min-max 정규화가 이 단계에 해당한다.

### downstream fine-tuning

벤치마크마다 제공하는 head가 다르다.

| 벤치마크 | 제공 head | launcher |
|---|---|---|
| RoboTwin | OFT, PI, GR00T | `train_robotwin_qwen3oft.sh`와 `eval_robotwin_qwen3oft.sh`, 그리고 `*_qwen3pi.sh`, `*_qwen3gr00t.sh` |
| LIBERO | PI | `train_libero_qwen3pi.sh` |
| VLA-Arena | PI | `train_vla_arena_qwen3pi.sh` |
| DOMINO | OFT | `train_domino_qwen3oft.sh` |

모든 launcher는 표시된 설정 블록으로 시작한다. 실행 전에 확인할 항목은 `base_vlm`, 벤치마크 데이터 경로, `run_root_dir`, `pretrained_ckpt` 네 가지다. downstream launcher는 `--trainer.random_init_action_model True`를 설정하므로, 옮겨지는 것은 continued pre-training의 action head가 아니라 backbone이다. 이 옵션이 논문의 "head를 새로 초기화하고 backbone만 재사용한다"는 설계를 코드로 강제한다.

벤치마크 환경 설정과 평가 규약은 `examples/LIBERO-plus/`, `examples/VLA-Arena/`, `examples/Robotwin/`, `examples/DOMINO/`, `examples/Robocasa_tabletop/`의 README와 `examples/eval_protocol.md`에 있다.

### 저장소 구성

| 경로 | 내용 |
|---|---|
| `starVLA/model/framework/QwenHybrid_xrobot_padding.py` | VLAct framework. 공유 latent에서 OFT, PI, GR00T 세 head로 |
| `starVLA/model/framework/{QwenOFT,QwenPI_v4,QwenGR00T}.py` | 단일 head framework |
| `starVLA/model/modules/action_model/` | action head와 wrap-aware loss |
| `starVLA/dataloader/gr00t_lerobot/` | 데이터 mixture, embodiment tag, action 변환 |
| `starVLA/training/train_starvla{,_cotrain}.py` | VLA 학습과 VLA + VLM co-training 진입점 |
| `examples/{DROID,InternA1,MolmoAct,RoboCoin}/` | pre-training 데이터 정제와 cache 생성 |
| `examples/{LIBERO,LIBERO-plus,VLA-Arena,Robotwin,DOMINO,Robocasa_tabletop}/` | 벤치마크 환경과 평가 |
| `scripts/run_scripts/{Pretrain,LIBERO,VLA-Arena,RoboTwin,DOMINO}/` | 학습과 평가 launcher |
| `deployment/` | 실제 로봇 policy 서버 |

`starVLA/dataloader/gr00t_lerobot/` 구조는 같은 StarVLA 코드베이스를 쓰는 [[physical-ai/ginwind-vla-jepa]]와 같다. 두 저장소 모두 GR00T 계열의 LeRobot 데이터 형식과 embodiment tag 방식을 물려받았다.

## Model Zoo

공개 checkpoint는 Hugging Face collection `StarVLA/vlact`에서 관리한다. 재사용용 backbone 하나와 벤치마크별 fine-tuning policy 다섯 개다.

| 모델 | Hugging Face | 이름에 표시된 head |
|---|---|---|
| VLAct Qwen3-VL-4B backbone | `StarVLA/VLAct_Qwen3_Pretrain` | 해당 없음 |
| VLAct RoboDojo | `StarVLA/VLAct-Qwen3VL4B-OFT-RoboDojo` | OFT |
| VLAct RoboTwin 2.0 | `StarVLA/VLAct_Qwen3GR00T_Robotwin_Finetune` | GR00T |
| VLAct DOMINO | `StarVLA/VLAct_Qwen3OFT_Domino_Finetune` | OFT |
| VLAct VLA-Arena | `StarVLA/VLAct_Qwen3PI_VLA_Arena_Finetune` | PI |
| VLAct LIBERO-Plus | `StarVLA/VLAct_Qwen3PI_Libero_Plus_Finetune` | PI |

backbone 사용 절차는 세 단계다.

1. `huggingface-cli download JasonYang66/VLAct-Qwen3VL4B-Pretrained --local-dir playground/Pretrained_models/VLAct-Qwen3VL4B-Pretrained`로 backbone과 설정, 정규화 통계를 함께 내려받는다.
2. downstream launcher의 `pretrained_ckpt`를 `playground/Pretrained_models/VLAct-Qwen3VL4B-Pretrained/checkpoints/steps_100000_pytorch_model.pt`로 지정한다.
3. `config.yaml`과 `dataset_statistics.json`을 내려받은 run root에 그대로 두고, 대상 로봇의 카메라와 action 규약을 맞추며, 호환되지 않는 downstream head는 새로 초기화한다.

README 안에서 backbone 저장소 이름이 두 가지로 적혀 있다는 점에 주의해야 한다. Model Zoo 표는 `StarVLA/VLAct_Qwen3_Pretrain`, 다운로드 명령은 `JasonYang66/VLAct-Qwen3VL4B-Pretrained`를 가리킨다.

## 결과

README는 결과 비교의 성격을 먼저 구분한다. matched Qwen3-VL-OFT baseline과의 비교는 downstream head와 초기화, 데이터, optimizer, 예산을 고정하고 backbone 가중치만 바꾼 통제 비교다. 공개 시스템과의 비교는 학습 레시피가 달라 넓은 맥락으로만 봐야 한다. RoboDojo는 외부 리더보드 결과이므로 벤치마크 간 수치를 비교하지 말라고 적는다.

| 벤치마크 | VLAct | matched Qwen3-VL-OFT | 향상 |
|---|---|---|---|
| LIBERO-Plus | 82.6% | 75.0% | +7.6%p |
| VLA-Arena | 54.8% | 33.4% | +21.4%p |
| RoboTwin 2.0 Base, Clean | 80.5% | 61.7% | +18.8%p |
| RoboTwin 2.0 Scaling, Clean / Random | 92.5% / 90.8% | 88.2% / 88.3% | +4.3%p / +2.5%p |
| DOMINO, SR / MS | 18.50 / 34.20 | 10.86 / 30.49 | +7.64 / +3.71 |

pre-training에 없던 로봇으로도 전이된다. RoboCasa-GR1에서는 downstream trajectory 20%만으로 49.5%, 전체로 54.0%를 기록했다. RoboDojo의 ARX X5 공식 평가에서는 평균 점수 10.66, 성공률 7.60%로 2026년 8월 24일 스냅샷 35개 policy 중 성공률 6위였다. 명시적 WAM 항목보다도 모두 높았다. WAM은 world-action model의 약자로, 미래 장면 예측과 action 생성을 한 모델 안에서 함께 수행하는 policy 계열이다.

Franka Research 3 실제 로봇 결과는 아래와 같다.

| 평가 구간 | VLAct | baseline |
|---|---|---|
| 단일 팔 단기, in-domain | 92.5% | 77.5% |
| Novel object from pot / in cup | 90.0% / 90.0% | 73.3% / 65.0% |
| Table cleaning / scoop beans | 86.6% / 80.0% | 73.3% / 33.3% |
| long-horizon OOD, extended / full substitution | 82.5% / 83.3% | 47.5% / 46.6% |
| 양팔 협응 | 72.0% | 44.0% |

각 policy는 H800 GPU 8개로 5만 step fine-tuning하고 과제당 고정된 초기 설정 10개에서 평가했다. 두 모델은 같은 시연 데이터(demonstration), head, optimizer, fine-tuning 예산을 쓴다. long-horizon 과제는 여러 단계를 이어야 끝나는 긴 과제이며, 이 구간에서 baseline과의 차이가 가장 크다. 과제별 세부 수치와 실패 분석은 논문 페이지에 있다.

## 논문과의 차이

README의 "Paper setting vs. released artifact" 안내와 Model Zoo 아래 주의 문단은 논문 수치를 재현하려는 사용자가 반드시 알아야 할 차이를 적는다.

| 항목 | 논문 | 공개 저장소와 artifact |
|---|---|---|
| caption 보조 손실 가중치 | 0.5 | launcher와 10만 step artifact 모두 `--trainer.loss_scale.vlm 0.2` |
| 학습 자원 | GPU 16개 | artifact card에 4노드 × 8 GPU로 기록 |
| RoboTwin 2.0 headline 92.5% | OFT head | 공개 RoboTwin checkpoint는 GR00T head |
| VLA-Arena와 LIBERO-Plus | Table 1과 Table 4는 OFT 비교 | 모델 페이지는 PI head |
| RoboDojo | 과제당 50 episode 공식 리더보드 스냅샷 | 로컬 규모 평가가 아님 |

README는 보고된 실험 설정은 논문을 따르고, 특정 checkpoint를 재현하려면 artifact의 `training_config.original.yaml`을 쓰라고 안내한다. 따라서 공개 checkpoint를 평가해 얻은 수치가 논문 표와 다를 수 있으며, 그 원인은 head 종류와 학습 설정 차이에 있다.

## 한계

- 공개 continued pre-training checkpoint는 바로 배치 가능한 policy가 아니다. 대상 로봇의 카메라와 action 규약을 맞추고 head를 붙여 fine-tuning해야 한다.
- launcher가 머신별 Accelerate/DeepSpeed 설정을 참조하므로 다른 클러스터에서는 설정을 고쳐야 실행된다.
- 논문 설정과 공개 artifact의 손실 가중치, 학습 자원, checkpoint head가 다르다 (위 표).
- README 안에서 backbone 저장소 이름이 두 가지로 적혀 있다.
- README는 라이선스를 MIT로 표기하지만 GitHub API는 LICENSE 파일을 표준 라이선스로 인식하지 못한다(NOASSERTION). 사용 전에 LICENSE 파일을 직접 확인하는 것이 안전하다.
- `deployment/` 실제 로봇 policy 서버의 사용법은 README에 설명이 없다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| QwenHybrid_xrobot_padding | 공유 latent에 OFT, PI, GR00T 세 head를 붙인 VLAct framework 파일 |
| matched Qwen3-VL-OFT baseline | backbone 가중치만 다르고 head, 초기화, 데이터, optimizer, 예산이 같은 비교 대상 |
| random_init_action_model | downstream launcher가 action head를 새로 초기화하도록 하는 옵션 |
| disjoint_action_layout | 부분 통합 20차원 action layout을 켜는 framework 옵션 |
| Decoder lock-in | 단일 pre-training head가 backbone을 그 head의 디코딩 기하에 특화시키는 실패 양상 |

## 관련 페이지

- [[physical-ai/yang-2026-beyond-data-scaling-representation-centric-continued]]: VLAct 논문. 레시피의 근거 실험, 벤치마크 전체 표, 실제 로봇 실패 분석
- [[physical-ai/ginwind-vla-jepa]]: 같은 StarVLA 코드베이스와 `gr00t_lerobot` dataloader 구조를 쓰는 VLA-JEPA 저장소
- [[physical-ai/nvidia-isaac-gr00t]]: GR00T 저장소. GR00T head와 LeRobot 데이터 형식, embodiment tag 방식의 출처
- [[physical-ai/noietch-eva-client]]: StarVLA를 policy 학습 프레임워크이자 서빙 backend로 지원하는 로봇 클라이언트
- [[physical-ai/yang-2026-hivla-a-visual-grounded-centric-hierarchical-embodied]]: StarVLA의 Qwen-GR00T 변형을 비교 대상으로 쓴 HiVLA 논문
