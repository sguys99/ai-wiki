---
title: "H-JEPA: End-to-End Learning of Hierarchical World Models for Visual Planning"
type: repo
year: 2026
category: physical-ai
raw_path: raw/repos/kevinghst-h-jepa.md
raw_filename: "kevinghst-h-jepa.md"
source_collection: external
org: "kevinghst"
repo: "H-JEPA"
url: "https://github.com/kevinghst/H-JEPA"
license: "MIT"
tags: [physical-ai, world-model, robot-learning]
---

## 한 줄 요약 (One-line Summary)

kevinghst/H-JEPA는 H-JEPA 논문의 공식 학습과 planning 코드다. LeWM과 stable-worldmodel 위에 구현했고, Visual AntMaze, FourRoom Distractors, OGBench Cube, Push-T 학습과 평가, DROID 오프라인 planning을 지원하며 논문 Figure 6 아래, Table 1과 9, Figure 9(b)를 재현하는 스크립트와 데이터셋, 체크포인트 93개를 공개한다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 저장소 | https://github.com/kevinghst/H-JEPA |
| 라이선스 | MIT |
| 생성과 갱신 | 2026-09-27 생성, 마지막 push 2026-10-10, 수집 시점 star 119 |
| 관련 공개물 | HuggingFace 데이터셋과 모델 `jepa-world-models/h-jepa`, 프로젝트 페이지 https://h-jepa.com/ |
| 수집 범위 | README, docs/RESULTS.md, docs/SLURM.md, h_jepa/ARCHITECTURE.md, 학습과 평가 셸 스크립트 4개, 대표 설정 5개, pyproject.toml, LICENSE, 파일 트리 169개 |
| 환경 | Python 3.11, torch 2.7.1, CUDA 12.8 wheel, stable-pretraining 0.1.7, Hydra 설정 |
| 대응 논문 | `sources/zhang-2026-h-jepa-end-to-end-learning-of.md` |

## 2. 주요 기여 (Key Contributions)

- 시뮬레이션 4개 환경 × 모델 7종 × 시드 3개, 총 84개 학습 run을 `scripts/train_all.sh` 하나로 재현한다. 모델 7종은 LeWM, H-JEPA 2~4단계, HWM 2~4단계다.
- DROID는 모델 3종(LeWM+IDM, HWM 2단계, H-JEPA 2단계) × 시드 3개, 9개 run을 지원한다.
- 학습된 체크포인트를 공개한다. 시뮬레이션 84개(9.7 GB), DROID 9개(2.7 GB)다.
- AntMaze와 FourRoom 데이터셋, 평가 과제 50개 세트, DROID 평가 clip 16개(252 MB)와 256×256 재인코딩 학습 shard(91 GB)를 HuggingFace에 공개한다. Push-T와 Cube 학습 데이터는 LeWM 공개본(MIT)을 쓴다.
- 논문 보고 수치를 docs/RESULTS.md에 재현 기준값으로 옮겨 둔다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 디렉터리 구성

| 경로 | 역할 |
|---|---|
| `h_jepa/main_hjepa.py` | 학습 진입점. 학습이 끝나면 planning 평가와 probing, decoding 평가를 자동 실행한다 |
| `h_jepa/eval.py` → `planning_eval.py` / `droid_eval.py` → `hierarchical_solver.py` | planning 평가 경로 |
| `h_jepa/models/` | `hjepa.py`(N개 JEPA를 담는 ModuleList), `jepa.py`, 인코더(ViT, latent MLP, sequence encoder), predictor, probe |
| `h_jepa/config/train`, `config/eval`, `config/probing` | `<env>_<model>.yaml`, `<env>_<planner>.yaml` 형식의 Hydra 설정 |
| `scripts/data/` | AntMaze, FourRoom 수집 스크립트와 Push-T, Cube 전처리 |
| `stable_worldmodel/` | 환경(FourRoom, OGBench AntMaze 등)과 HDF5 데이터 로더 |

### 3.2 데이터 로더와 계층 구성 (ARCHITECTURE.md)

- `swm.data.HDF5Dataset`이 최상위 level까지 덮을 만큼 긴 level-1 clip 하나를 반환하고, 상위 level은 모델 안에서 만든다. clip 길이는 최상위 level의 `num_steps`를 각 level의 frameskip, stride, window_size로 재귀 확장해 정한다.
- level 1 action은 frameskip 동안의 raw action을 이어 붙여 `frameskip × raw_action_dim` 차원이 된다. level 2 이상은 action_encoder가 하위 action 임베딩 묶음을 macro-action으로 압축하며 묶음 길이는 stride다.
- `encode_hierarchical`은 level 1부터 차례로 인코딩한 뒤 각 level을 `history_size + rollout_n` 길이로 같은 시간 인덱스에서 무작위 crop한다.
- sparse level-1 encoding(기본값)은 crop 위치를 먼저 뽑고 실제로 읽히는 level-1 프레임만 인코딩한다. 수치는 전체 인코딩과 동일하고, 4단계 stride 2 window 1 모델은 level-1 프레임 25개 중 약 12개만 인코딩한다.

### 3.3 모델과 손실

- 각 JEPA는 인코더(projector 포함), action 인코더(level 1은 항등), action embed MLP, `ProjectedPredictor`(ARPredictor Transformer + projector)로 구성된다.
- level 1 인코더는 픽셀에 ViT를 적용해 CLS 토큰을 projector로 보낸다. proprioception이 있으면 pixel 임베딩과 proprio 임베딩을 이어 붙여 projector에 넣는다. level 2 이상은 하위 임베딩에 latent 인코더를 적용한다.
- level별 손실은 `pred_loss + sigreg_weight × sigreg_loss`이고 전체 손실은 학습 대상 level의 합이다. `rollout_n>1`이면 autoregressive rollout 손실과 teacher-forcing anchor를 함께 쓴다. ARCHITECTURE.md의 손실 표에는 IDM 항이 없고, DROID 설정 파일이 `idm_coeff`와 `action_sigreg_coeff`로 이를 더한다.

### 3.4 HierarchicalSolver

- 현재 observation과 목표를 모든 level에서 미리 인코딩한 뒤 level N부터 1까지 내려가며 풀고, 각 level의 `GradientSolver`가 rollout을 미분해 action을 직접 최적화한다.
- `LevelCostModel` 어댑터는 rollout을 그 level의 latent 공간에서 실행하고, 상태 비용은 예측 latent를 위 level의 `JEPA.encode(..., chunk_temporal_inputs=True)`로 올려 위 level 공간에서 잰다.
- 상위 level의 horizon이 1이 되면 그 solve를 건너뛴다. `horizon_one_goal_cost_space: upper`를 주면 하위 rollout을 건너뛴 상위 인코더로 사영해 실제 상위 목표와 비교한다(AntMaze, FourRoom 설정).
- cross-level action 비용(하위 action을 상위 action 공간으로 pooling해 상위 macro-action과 비교)은 기본값 0이다. 논문 부록 E에서는 Push-T와 Cube에서만 가중치 0.2로 켠다.
- goal anchoring은 마지막 subgoal을 실제 목표 임베딩으로 교체해 drift가 아래로 전파되는 것을 막는다.

### 3.5 대표 설정 값

| 설정 | 값 | 논문 대응 |
|---|---|---|
| `ant_hjepa_l3` level 2, 3 | stride 2, window 1, history 3, embed 384, latent MLP hidden 384, macro-action 4차원, predictor depth 5, heads 12, hidden 224, mlp 1536, SIGReg 0.09, lr 1e-5 | Table 4 AntMaze 열과 일치 |
| `ant_l3` planner | level별 후보 (100, 100, 400), horizon (4, 2, 5), 학습률 (0.06, 0.1, 0.1), 90 step, episode 예산 350, receding horizon 2 | Table 7과 일치 |
| `droid_hjepa_l2` level 2 | stride 3, window 1, history 2, IDM 50, action SIGReg 0.005, macro-action MLP hidden 64 출력 8, predictor 384×12, heads 6, SIGReg 0.16, lr 5e-4, 100 epoch | Table 5와 일치 |

### 3.6 실행 절차

1. 설치: conda Python 3.11.13, `pip install -e ".[train,env]"`, `HJEPA_HOME` 지정.
2. 학습: `python main_hjepa.py --config-name ant_hjepa_l3 seed=42`. 출력은 `$HJEPA_HOME/ckpts/<env>/<env>_<model>/seed<seed>/`.
3. 단독 평가: `python eval.py --config-name ant_l3 ... policy=<ckpt>`. `success_rate`는 퍼센트로 기록된다.
4. 재현: `scripts/eval_depth.sh`(Figure 6), `scripts/eval_cost_ladder.sh`(Table 1, 9, 결과는 `eval_flat`와 `eval_l<k>_project`), `scripts/eval_droid.sh`(Figure 9b, planner 시드 1, 2, 3).
5. DROID 학습은 GPU 2장 × 배치 128, epoch당 292 step, SLURM `srun --ntasks-per-node=2`로 실행한다. `scripts/slurm/launch.py`가 sweep 제출, 재개, epoch별 평가를 지원한다.

| planner 설정 이름 | 뜻 |
|---|---|
| `flat` | level-1 planning |
| `l2`, `l3`, `l4` | H-JEPA와 HWM의 계층 planning |
| `l2_project`, `l3_project`, `l4_project` | level-1 planning에 level-k latent 비용 적용 |

HWM 설정은 상위 인코더를 항등 함수로 두고 상위 level SIGReg를 쓰지 않는다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

docs/RESULTS.md의 깊이 비교(성공률 %, 시드 42, 43, 44 평균±SE, 환경별 고정 과제 50개)는 다음과 같다.

| 환경 | LeWM | H-JEPA 2 | H-JEPA 3 | H-JEPA 4 | HWM 2 | HWM 3 | HWM 4 |
|---|---|---|---|---|---|---|---|
| Visual AntMaze | 18.0±3.5 | 39.3±3.7 | 73.3±3.5 | 67.3±2.4 | 34.0±1.2 | 38.7±3.5 | 14.0±2.0 |
| FourRoom Distractors | 40.7±6.8 | 81.3±6.7 | 96.0±1.1 | 88.0±2.3 | 75.3±3.3 | 99.3±0.7 | 92.7±4.4 |
| OGBench Cube | 32.0±6.1 | 47.3±2.7 | 60.0±5.0 | 62.7±2.4 | 46.7±2.9 | 53.3±5.2 | 34.0±3.1 |
| Push-T | 40.0±2.3 | 45.3±1.3 | 17.3±3.5 | 0.7±0.7 | 42.0±6.4 | 12.0±2.0 | 0.0±0.0 |

HWM 수치는 논문 본문 표에는 없고 Figure 6 아래 그림으로만 제시되므로 이 표가 HWM의 정확한 값을 확인할 수 있는 자료다. FourRoom에서는 HWM 3단계(99.3%)가 H-JEPA 3단계(96.0%)보다 높다.

비용 사다리 값(Table 1, 9의 level-1 열)은 논문 표와 같다. DROID 결과(16 clip, 5 fps, epoch 100 체크포인트, 학습 시드 1, 1000, 10000 평균±SE, 각 학습 시드는 planner 시드 3개 평균)는 다음과 같다.

| 모델 | Fréchet fidelity (%) |
|---|---|
| LeWM + IDM | 33.57±1.52 |
| HWM | 35.65±2.22 |
| H-JEPA | 38.42±0.94 |

### 논문과의 차이

| 항목 | 논문 | 저장소 |
|---|---|---|
| 4단계 H-JEPA 계층 planning 성공률 | Table 1과 Table 9: AntMaze 63.3±7.7, FourRoom 80.0±4.0, Cube 55.3±4.4 | RESULTS.md 깊이 비교: AntMaze 67.3±2.4, FourRoom 88.0±2.3, Cube 62.7±2.4 |
| DROID 집계 | 부록 J.2: 학습 시드 × planner 시드 칸의 중앙값. Fig. 9b 라벨 +34, +35, +40 | 학습 시드별 planner 시드 평균의 평균±SE. 33.57, 35.65, 38.42 |
| DROID 학습 episode 수 | 부록 J.4: 재인코딩 corpus 74,530 episode | README §4.1: 평가 clip 16개를 뺀 74,896 episode로 학습, 검증 64 episode |
| ARCHITECTURE.md 예시 | 시뮬레이션 상위 level stride 2 | 설명 예시가 PushT level-2 stride 3, frameskip 25를 쓴다(설명용) |

4단계 수치는 같은 "50개 최종 평가 과제"를 표방하는데 서로 다르다. 2단계와 3단계 값과 Push-T 4단계 값은 일치한다. RESULTS.md는 "원 저장소 README에서 옮긴 논문 보고값"이라고 적고 있어 어느 쪽이 최종인지 이 자료만으로는 판단할 수 없다. DROID 차이는 집계 방식(중앙값과 평균)의 차이로 설명된다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- RESULTS.md 값은 새 검증 run의 측정값이 아니라 논문 보고값을 옮긴 것이다.
- DROID 평가는 오프라인 경로 충실도이고 closed-loop 과제 성공이 아니다.
- AntMaze 수집은 일부 reset 난수가 시드되지 않아 공개본과 바이트 단위로 같지 않다. FourRoom 수집은 공개본을 재현했다.
- DROID 학습에는 GPU 2장 SLURM 할당과 91 GB 데이터가 필요하다.
- RESULTS.md의 DROID 표는 IDM 없는 LeWM 막대와 Figure 9(c) 연산 sweep을 포함하지 않는다.

## 6. 관련 연구 (Related Work)

| 의존 또는 관련 | 관계 |
|---|---|
| LeWM (lucas-maes/le-wm) | level 1 구조와 Push-T, Cube 데이터의 출처 |
| stable-worldmodel (galilai-group) | 환경, 데이터 로더, `GradientSolver` |
| stable-pretraining 0.1.7 | 학습 루프와 재개 관리 |
| OGBench | AntMaze 환경과 ant 전문가 policy |

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| HierarchicalSolver | level마다 GradientSolver를 두고 위에서 아래로 subgoal을 넘기는 planning 클래스 |
| LevelCostModel | level별 rollout을 실행하고 비용을 위 level 공간에서 재는 어댑터 |
| sparse level-1 encoding | crop 후 실제로 읽히는 level-1 프레임만 인코딩하는 학습 최적화 |
| cost ladder | level-1 planning에서 목표 비용 공간만 L1~L4로 바꿔 보는 평가(Table 1, 9) |
| goal anchoring | 마지막 subgoal을 실제 목표 임베딩으로 바꿔 drift 전파를 막는 처리 |

## 8. 그림 후보 (Figure Candidates)

README의 teaser(애니메이션 GIF와 MP4, `assets/teaser.gif`)와 `assets/depth_planning_sr.png`가 있으나 논문 Figure 1, Figure 6과 내용이 겹쳐 수집하지 않았다.
