---
title: "VLAct (starVLA/VLAct, GitHub repo)"
type: repo
year: 2026
category: physical-ai
raw_path: raw/repos/starvla-vlact.md
raw_filename: "starvla-vlact.md"
source_collection: external
org: "starVLA"
repo: "VLAct"
url: "https://github.com/starVLA/VLAct"
license: "MIT (README License 절과 배지 표기. GitHub API는 LICENSE 파일을 NOASSERTION으로 분류한다)"
tags: [physical-ai, vla, robot-learning, manipulation]
figures:
  - id: fig01
    file: assets/starvla-vlact/VLAct-update.png
    raw: https://raw.githubusercontent.com/starVLA/VLAct/main/assets/VLAct-update.png
    caption: "README 상단의 VLAct 개요 이미지. 저장소 assets/VLAct-update.png를 in-place 참조한다"
    strategy: manual
    curated: false
  - id: fig02
    file: assets/starvla-vlact/fig2_pilot.png
    raw: https://raw.githubusercontent.com/starVLA/VLAct/main/assets/vlact/fig2_pilot.png
    caption: "action head 조합별 pilot study 그래프. 논문 Figure 2와 같은 그림이다"
    strategy: manual
    curated: false
  - id: fig03
    file: assets/starvla-vlact/fig3_method.png
    raw: https://raw.githubusercontent.com/starVLA/VLAct/main/assets/vlact/fig3_method.png
    caption: "pre-training과 fine-tuning 절차 도식. 논문 Figure 3과 같은 그림이다"
    strategy: manual
    curated: false
  - id: fig04
    file: assets/starvla-vlact/fig4_action_space.png
    raw: https://raw.githubusercontent.com/starVLA/VLAct/main/assets/vlact/fig4_action_space.png
    caption: "부분 통합 cross-embodiment action space 도식. 논문 Figure 4와 같은 그림이다"
    strategy: manual
    curated: false
  - id: fig05
    file: assets/starvla-vlact/fig5_realworld.png
    raw: https://raw.githubusercontent.com/starVLA/VLAct/main/assets/vlact/fig5_realworld.png
    caption: "실제 로봇 평가와 미학습 embodiment 전이 그래프. 논문 Figure 5와 같은 그림이다"
    strategy: manual
    curated: false
  - id: fig08
    file: assets/starvla-vlact/fig8_aux_data.png
    raw: https://raw.githubusercontent.com/starVLA/VLAct/main/assets/vlact/fig8_aux_data.png
    caption: "보조 co-training 데이터별 성공률 그래프. 논문 Figure 8과 같은 그림이다"
    strategy: manual
    curated: false
---

## 한 줄 요약 (One-line Summary)

VLAct 논문의 공식 코드 저장소로, StarVLA 코드베이스 위에 세 연속 action head(OFT, PI, GR00T)를 공유 latent에 붙인 multi-head framework와 continued pre-training launcher, 다섯 벤치마크의 fine-tuning과 평가 스크립트, 실제 로봇 policy 서버를 담으며, 재사용용 Qwen3-VL-4B backbone과 벤치마크별 fine-tuning checkpoint 5종을 Hugging Face에 공개한다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 저장소 | https://github.com/starVLA/VLAct |
| 설명 | [NeurIPS 2026] Beyond Data Scaling: Representation-Centric Continued Pre-training for Vision-Language-Action Models |
| 기본 브랜치 | main (수집 시점 커밋 4c41b666228b) |
| 라이선스 | README는 MIT로 표기 |
| 생성과 최종 push | 2026년 8월 25일 생성, 2026년 9월 30일 최종 push (수집 시점 star 137, fork 7) |
| 최상위 구성 | `.gitignore`, `LICENSE`, `Makefile`, `README.md`, `assets/`, `deployment/`, `examples/`, `pyproject.toml`, `pyrightconfig.json`, `requirements.txt`, `scripts/`, `starVLA/` |
| 논문 | [[physical-ai/yang-2026-beyond-data-scaling-representation-centric-continued]] (arXiv 2608.27550) |
| 부가 자료 | 프로젝트 페이지 https://starvla.github.io/VLAct/, YouTube 영상, Hugging Face collection `StarVLA/vlact` |
| 소식 | 2026년 9월 NeurIPS 2026 채택(strong accept 2개), 2026년 8월 논문과 코드와 backbone 공개, RoboDojo 리더보드 35개 중 성공률 6위 |

## 2. 주요 기여 (Key Contributions)

1. **multi-head framework 구현.** `starVLA/model/framework/QwenHybrid_xrobot_padding.py`가 공유 latent에서 OFT, PI, GR00T 세 head로 가는 VLAct 구조다. 개별 head framework(`QwenOFT`, `QwenPI_v4`, `QwenGR00T`)도 함께 있다.
2. **레시피 요소를 실행 옵션으로 노출.** shallow-layer protection, caption 혼합, multi-head 지도, 부분 통합 layout, wrap-aware loss가 각각 launcher 인자로 대응된다.
3. **continued pre-training 파이프라인.** base model 다운로드, VLM과 로봇 데이터 준비, LeRobot v2.1 layout, cache와 통계 생성, 경로 설정, 단일 노드와 다중 노드 학습을 담은 별도 가이드를 둔다.
4. **벤치마크별 fine-tuning과 평가.** LIBERO-Plus, VLA-Arena, RoboTwin, DOMINO, RoboCasa 환경 설정과 평가 규약 문서를 `examples/`에 둔다.
5. **재사용용 backbone 공개와 사용 규약.** 새 embodiment나 데이터셋이나 디코더에는 벤치마크별 policy가 아니라 continued pre-training backbone에서 시작하라고 권장하고, 이 checkpoint가 바로 배치 가능한 policy가 아니라는 점을 명시한다.
6. **논문 대비 차이 공개.** 논문 설정과 공개 artifact, 공개 checkpoint head와 논문 표의 head가 다른 부분을 README에 적는다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 README가 요약한 실패 양상과 근거

| 번호 | 실패 양상 | 근거 수치 |
|---|---|---|
| 1 | Prior erosion. 로봇 데이터가 웹 규모 코퍼스보다 좁아 end-to-end 갱신이 쓸모 있는 시각-언어 feature를 덮어쓴다 | backbone 전체 갱신 LIBERO-Plus 78.9 대 얕은 layer 보호 82.6 |
| 2 | Decoder lock-in. 단일 pre-training head가 backbone을 그 head의 디코딩 기하에 특화시킨다 | OFT pre-training이 OFT fine-tuning을 61.7에서 75.8로 올리지만 PI fine-tuning은 60.5에서 55.1로 scratch 아래로 떨어뜨린다 |
| 3 | Discretization loss. 이산 action 토큰은 대략적 구조는 가르치지만 세밀한 시간과 진폭 정보를 잃는다 | FAST 후 FAST는 LIBERO-Plus 45.2, FAST 후 GR00T는 76.7 |

downstream에서는 pre-training head를 버리고 새로 초기화한 head를 붙이며 backbone 전체를 동결 해제해 일반적으로 fine-tuning한다. matched Qwen3-VL-OFT baseline과의 모든 비교에서 바뀌는 것은 VLM backbone 가중치뿐이다.

### 3.2 레시피 세 요소 (README Method 절)

- VLM prior 보존: vision encoder와 LLM 하위 절반 layer를 동결하고 모든 minibatch에 image caption 데이터를 섞는다. 손실은 L_total = L_action + 0.5 L_VLM-CE로 적혀 있다. 동결 방식 ablation은 전체 갱신 78.9 / 77.1, vision encoder만 동결 81.3 / 79.3, vision encoder와 하위 절반 LLM 동결 82.6 / 80.5 (LIBERO-Plus / RoboTwin 2.0). 테스트한 모든 비action 원천이 고정 예산에서 도움이 되고 caption이 가장 크며, 텍스트 전용 지시 데이터도 로봇 전용 학습보다 낫다.
- action 지도 다양화: 세 연속 head를 하나의 공유 latent에 붙이고 같은 정답 chunk를 예측시킨다. L_action = L_OFT + L_PI + L_GR00T. 새 head나 alignment 모듈 없이 head 다양성 자체가 지도 신호이며, backbone forward 한 번을 공유한다. PI를 downstream head로 둔 RoboTwin 2.0 결과는 head 없음 60.5, OFT 55.1(−5.4), OFT + GR00T 63.1(+2.6), OFT + PI + GR00T 77.0(+16.5). 같은 head 성능도 matched single-head 대비 OFT 78.8에서 80.5, PI 75.4에서 77.0, GR00T 71.7에서 76.0으로 오른다.
- embodiment 간 action 의미 통합: 부분 통합 20차원 layout 하나에 공유 head를 둔다. 1~12차원은 양팔 embodiment의 두 6-DoF 팔(절대 관절 각도), 13~18차원은 단일 팔 6-DoF delta end-effector pose, 19차원은 공유 그리퍼 좌표(Franka 그리퍼와 AgileX 왼쪽 그리퍼), 20차원은 오른쪽 그리퍼다. 각 샘플은 활성 차원에서만 손실을 내고 나머지는 mask한다. 주기 관절에는 δ_wrap = ((â − a) + π) mod 2π − π인 wrap-aware loss를 절대 관절 차원에만 적용한다. ablation은 분리 head 78.5 / 81.1, 통합 head 79.5 / 81.4, 통합 action 표현 80.5 / 82.6 (RoboTwin 2.0 / LIBERO-Plus), wrap loss는 원래 관절 각도 75.5, 통합 관절 공간 78.6, wrap-aware loss 추가 80.5 (RoboTwin 2.0).

### 3.3 레시피와 구현의 대응

| 레시피 요소 | 구현 위치 |
|---|---|
| shallow-layer protection (vision encoder와 LLM layer 0~17) | `--trainer.freeze_modules` |
| caption 혼합 co-training | `--datasets.vlm_data.dataset_use`, `--trainer.loss_scale.vlm` |
| multi-head 동시 지도 | `--framework.heads oft,gr00t,pi`, `--framework.head_loss_weights` |
| 부분 통합 action layout | `--framework.disjoint_action_layout`, `--framework.mask_padded_action_dims` |
| wrap-aware loss | `--trainer.shortest_angular_joint_loss*`, `--trainer.endpoint_wrap_loss_weight` |

모든 옵션은 `scripts/run_scripts/Pretrain/pretrain_qwen3_single_node.sh`에 설정돼 있다.

### 3.4 설치

- 검증 환경: Linux, Python 3.10, NVIDIA GPU, CUDA 호환 PyTorch.
- 순서: 저장소 clone, conda 환경 `vlact`(python 3.10) 생성, pytorch.org 안내로 CUDA 호환 PyTorch 설치, `requirements.txt` 설치, `flash-attn==2.7.4.post1`을 `--no-build-isolation`으로 설치, `pip install -e .`.
- flash-attn은 CUDA toolkit과 PyTorch 버전이 맞아야 하며, 대부분 `--no-build-isolation`으로 해결되고 아니면 `nvcc -V`와 설치된 torch, transformers, flash-attn 버전을 확인해 맞는 release를 고른다.

### 3.5 continued pre-training 실행

- 가이드: `scripts/run_scripts/Pretrain/README.md`.
- 단일 노드 GPU 8개: `bash scripts/run_scripts/Pretrain/pretrain_qwen3_single_node.sh`.
- 다중 노드 Slurm: `sbatch scripts/run_scripts/Pretrain/pretrain_qwen3_slurm.sh`.
- launcher는 머신별 Accelerate/DeepSpeed 설정을 참조하므로 실행 전에 가이드의 설정 안내를 확인해야 한다.

### 3.6 downstream fine-tuning과 평가

| 벤치마크 | 제공 head | 스크립트 |
|---|---|---|
| RoboTwin | OFT, PI, GR00T | `train_robotwin_qwen3oft.sh`, `eval_robotwin_qwen3oft.sh` (그리고 `*_qwen3pi.sh`, `*_qwen3gr00t.sh`) |
| LIBERO | PI | `train_libero_qwen3pi.sh` |
| VLA-Arena | PI | `train_vla_arena_qwen3pi.sh` |
| DOMINO | OFT | `train_domino_qwen3oft.sh` |

- 모든 launcher 앞부분에 설정 블록이 있으며 `base_vlm`, 벤치마크 데이터 경로, `run_root_dir`, `pretrained_ckpt`를 확인해야 한다.
- downstream launcher는 `--trainer.random_init_action_model True`를 설정한다. 즉 옮겨지는 것은 continued pre-training의 action head가 아니라 backbone이다.
- 환경 설정과 평가 규약 문서: `examples/LIBERO-plus/`, `examples/VLA-Arena/`, `examples/Robotwin/`, `examples/DOMINO/`, `examples/Robocasa_tabletop/`, `examples/eval_protocol.md`.

### 3.7 저장소 구성

| 경로 | 내용 |
|---|---|
| `starVLA/model/framework/QwenHybrid_xrobot_padding.py` | VLAct. 공유 latent에서 OFT, PI, GR00T로 |
| `starVLA/model/framework/{QwenOFT,QwenPI_v4,QwenGR00T}.py` | 단일 head framework |
| `starVLA/model/modules/action_model/` | action head와 wrap-aware loss |
| `starVLA/dataloader/gr00t_lerobot/` | 데이터 mixture, embodiment tag, action 변환 |
| `starVLA/training/train_starvla{,_cotrain}.py` | VLA 학습과 VLA + VLM co-training 진입점 |
| `examples/{DROID,InternA1,MolmoAct,RoboCoin}/` | pre-training 데이터 정제와 cache 생성 |
| `examples/{LIBERO,LIBERO-plus,VLA-Arena,Robotwin,DOMINO,Robocasa_tabletop}/` | 벤치마크 환경과 평가 |
| `scripts/run_scripts/{Pretrain,LIBERO,VLA-Arena,RoboTwin,DOMINO}/` | 학습과 평가 launcher |
| `deployment/` | 실제 로봇 policy 서버 |

### 3.8 Model Zoo

| 모델 | Hugging Face |
|---|---|
| VLAct Qwen3-VL-4B backbone | `StarVLA/VLAct_Qwen3_Pretrain` |
| VLAct RoboDojo | `StarVLA/VLAct-Qwen3VL4B-OFT-RoboDojo` |
| VLAct RoboTwin 2.0 | `StarVLA/VLAct_Qwen3GR00T_Robotwin_Finetune` |
| VLAct DOMINO | `StarVLA/VLAct_Qwen3OFT_Domino_Finetune` |
| VLAct VLA-Arena | `StarVLA/VLAct_Qwen3PI_VLA_Arena_Finetune` |
| VLAct LIBERO-Plus | `StarVLA/VLAct_Qwen3PI_Libero_Plus_Finetune` |

- 다운로드 예시 명령은 `huggingface-cli download JasonYang66/VLAct-Qwen3VL4B-Pretrained --local-dir playground/Pretrained_models/VLAct-Qwen3VL4B-Pretrained`이다. 표의 backbone 저장소 이름(`StarVLA/VLAct_Qwen3_Pretrain`)과 다운로드 명령의 저장소 이름이 다르게 적혀 있다.
- downstream launcher의 `pretrained_ckpt`에는 `playground/Pretrained_models/VLAct-Qwen3VL4B-Pretrained/checkpoints/steps_100000_pytorch_model.pt`를 지정한다.
- 이 checkpoint는 바로 배치 가능한 policy가 아니다. `config.yaml`과 `dataset_statistics.json`을 run root에 두고, 대상 카메라와 action 규약을 맞추며, 맞지 않는 downstream head는 새로 초기화해야 한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

README는 matched Qwen3-VL-OFT baseline 비교가 통제 비교이고, 공개 시스템과의 비교는 학습 레시피가 달라 넓은 맥락으로만 봐야 하며, RoboDojo는 외부 리더보드라 벤치마크 간 수치를 비교하지 말라고 적는다.

| 벤치마크 | VLAct | matched Qwen3-VL-OFT | 향상 |
|---|---|---|---|
| LIBERO-Plus | 82.6% | 75.0% | +7.6 |
| VLA-Arena | 54.8% | 33.4% | +21.4 |
| RoboTwin 2.0 Base, Clean | 80.5% | 61.7% | +18.8 |
| RoboTwin 2.0 Scaling, Clean / Random | 92.5% / 90.8% | 88.2% / 88.3% | +4.3 / +2.5 |
| DOMINO, SR / MS | 18.50 / 34.20 | 10.86 / 30.49 | +7.64 / +3.71 |

- RoboCasa-GR1: downstream trajectory 20%로 49.5%, 전체로 54.0%.
- RoboDojo ARX X5 공식 평가: 평균 점수 10.66, 성공률 7.60%, 2026년 8월 24일 스냅샷에서 35개 중 성공률 6위.

Franka Research 3 실제 로봇 결과:

| 평가 구간 | VLAct | baseline |
|---|---|---|
| 단일 팔 단기, in-domain | 92.5% | 77.5% |
| Novel object from pot / in cup | 90.0% / 90.0% | 73.3% / 65.0% |
| Table cleaning / scoop beans | 86.6% / 80.0% | 73.3% / 33.3% |
| long-horizon OOD, extended / full substitution | 82.5% / 83.3% | 47.5% / 46.6% |
| 양팔 협응 | 72.0% | 44.0% |

각 policy는 H800 GPU 8개로 5만 step fine-tuning하고 과제당 고정 초기 설정 10개에서 평가했다. 두 모델은 같은 시연 데이터, head, optimizer, 예산을 쓴다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- 논문 설정과 공개 artifact가 다르다. 논문은 caption 보조 손실 가중치 0.5와 GPU 16개를 보고하지만, 저장소 launcher와 내려받는 10만 step artifact는 `--trainer.loss_scale.vlm 0.2`로 기록돼 있고 artifact card는 4노드 × 8 GPU로 적혀 있다. 보고된 실험 설정은 논문을, 특정 checkpoint 재현은 artifact의 `training_config.original.yaml`을 따르라고 안내한다.
- checkpoint head와 논문 headline 결과가 호환되지 않는다. RoboTwin 92.5%는 OFT head 결과인데 공개 RoboTwin checkpoint는 GR00T head다. VLA-Arena와 LIBERO-Plus 모델 페이지는 PI head인데 논문 Table 1과 Table 4는 OFT 비교를 보고한다.
- 논문의 RoboDojo 결과는 과제당 50 episode 공식 리더보드 스냅샷이며 로컬 규모 평가가 아니다.
- continued pre-training checkpoint는 배치 가능한 policy가 아니며 대상 로봇의 카메라와 action 규약을 맞춰 fine-tuning해야 한다.
- launcher가 머신별 Accelerate/DeepSpeed 설정을 참조하므로 그대로 실행되지 않을 수 있다.
- README의 Model Zoo 표와 다운로드 명령이 backbone 저장소 이름을 다르게 적는다.
- 라이선스는 README가 MIT로 적지만 GitHub API는 LICENSE 파일을 표준 라이선스로 인식하지 못한다(NOASSERTION).

## 6. 관련 연구 (Related Work)

- 기반 코드와 도구: StarVLA, LeRobot, GR00T, DeepSpeed, Qwen-VL, InternVL.
- pre-training 데이터: DROID, InternData-A1, RoboCoin, MolmoAct.
- 평가 벤치마크: LIBERO-Plus, VLA-Arena, RoboTwin 2.0, DOMINO, RoboCasa, RoboDojo.
- 인용 요청: VLAct 논문, StarVLA-α(arXiv 2604.11757), StarVLA 코드베이스 논문(arXiv 2604.05014).
- 저장소 내 관련 페이지: [[physical-ai/ginwind-vla-jepa]]도 starVLA 코드베이스의 `dataloader/gr00t_lerobot/` 구조를 그대로 쓴다.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| QwenHybrid_xrobot_padding | 공유 latent에 OFT, PI, GR00T 세 head를 붙인 VLAct framework 파일 |
| matched Qwen3-VL-OFT baseline | backbone 가중치만 다르고 head, 초기화, 데이터, optimizer, 예산이 같은 비교 대상 |
| random_init_action_model | downstream launcher가 action head를 새로 초기화하도록 하는 옵션 |
| disjoint_action_layout | 부분 통합 20차원 action layout을 켜는 framework 옵션 |
| Prior erosion | README가 붙인 이름으로, 좁은 로봇 데이터의 end-to-end 갱신이 VLM feature를 덮어쓰는 실패 양상 |
| Discretization loss | 이산 action 토큰이 세밀한 시간과 진폭 정보를 잃는 실패 양상 |

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | | "README 상단 VLAct 개요 이미지" | manual | (선택) 수동 저장 필요 |
| fig02 | | "pilot study 그래프 (논문 Figure 2와 동일)" | manual | (생략 권장) 논문 페이지에 있음 |
| fig03 | | "학습 절차 도식 (논문 Figure 3과 동일)" | manual | (생략 권장) 논문 페이지에 있음 |
| fig04 | | "action space 도식 (논문 Figure 4와 동일)" | manual | (생략 권장) 논문 페이지에 있음 |
| fig05 | | "실제 로봇 평가 그래프 (논문 Figure 5와 동일)" | manual | (생략 권장) 논문 페이지에 있음 |
| fig08 | | "보조 데이터 그래프 (논문 Figure 8과 동일)" | manual | (생략 권장) 논문 페이지에 있음 |
