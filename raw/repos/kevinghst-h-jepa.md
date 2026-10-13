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
fetched_at: "2026-10-13"
tags: []
---

> 수집 메모: 사용자의 명시적 지시로 GitHub raw URL에서 가져왔다 (CLAUDE.md rule #1 자료 수집 예외). 기본 브랜치 main, 저장소 생성 2026-09-27, 마지막 push 2026-10-10, GitHub API license 필드 MIT. 아래는 최상위 README 전문, 하위 문서(docs/RESULTS.md, docs/SLURM.md, h_jepa/ARCHITECTURE.md), 학습과 평가 스크립트, 대표 설정 파일, pyproject.toml, LICENSE, 파일 트리를 원문 그대로 이어 붙인 것이다.


# README.md

<h1 align="center">
    <p><b>H-JEPA: End-to-End Learning of Hierarchical World Models for Visual Planning</b></p>
</h1>

<div align="center" style="line-height: 1;">
  <a href="https://arxiv.org/abs/2610.06805" target="_blank" style="margin: 2px;"><img alt="ArXiv" src="https://img.shields.io/badge/arXiv-2610.06805-b5212f?logo=arxiv" style="display: inline-block; vertical-align: middle;"/></a>
  <a href="https://h-jepa.com/" target="_blank" style="margin: 2px;"><img alt="Website" src="https://img.shields.io/badge/Website-h--jepa.com-blue" style="display: inline-block; vertical-align: middle;"/></a>
  <a href="https://huggingface.co/datasets/jepa-world-models/h-jepa" target="_blank" style="margin: 2px;"><img alt="HuggingFace Dataset" src="https://img.shields.io/badge/🤗%20Dataset-jepa--world--models/h--jepa-ffc107" style="display: inline-block; vertical-align: middle;"/></a>
  <a href="https://huggingface.co/jepa-world-models/h-jepa" target="_blank" style="margin: 2px;"><img alt="HuggingFace Models" src="https://img.shields.io/badge/🤗%20Models-jepa--world--models/h--jepa-ffc107" style="display: inline-block; vertical-align: middle;"/></a>
</div>

<br>

<p align="center">
  Wancong Zhang*,
  Basile Terver*,
  Mike Rabbat,
  Yann LeCun&dagger;,
  Randall Balestriero&dagger;
</p>

<p align="center">
  <b>AMI Labs</b>, NYU, INRIA Paris, Brown University<br>
  <sub>* equal contribution, &dagger; equal advising</sub>
</p>

<p align="center">
  <a href="assets/teaser-video.mp4">
    <img src="assets/teaser.gif" alt="Animated H-JEPA planning illustration in Visual AntMaze, with decoded subgoals at three levels and planning success versus compute. Click for the MP4 video." width="800">
  </a>
</p>

---

H-JEPA learns a hierarchy of action-conditioned JEPA world models end-to-end, with each level predicting farther ahead
in its own learned latent space.
Hierarchical planning with H-JEPA proceeds top-down: the top level optimizes progress toward the goal, and each level's predictions become subgoals for the level below.
On Visual AntMaze, a three-level H-JEPA achieves **73.3%** planning success against **18.0%** using the flat [LeWorldModel](https://arxiv.org/abs/2603.19312), with a fraction of planner compute.

This repository contains the training and planning code for H-JEPA. It supports Visual AntMaze,
FourRoom Distractors, OGBench Cube, Push-T, and offline planning on DROID. It contains scripts to reproduce
Figure 6 (bottom row), Tables 1 and 9, and Figure 9(b)
of the [H-JEPA paper](https://arxiv.org/abs/2610.06805).
It is built on [LeWM](https://github.com/lucas-maes/le-wm) and
[stable-worldmodel](https://github.com/galilai-group/stable-worldmodel).

## 1) Installation

```bash
git clone https://github.com/kevinghst/H-JEPA.git && cd H-JEPA
conda create -n hjepa python=3.11.13 && conda activate hjepa
pip install -e ".[train,env]" --extra-index-url https://download.pytorch.org/whl/cu128
export HJEPA_HOME=/path/to/data   # datasets, expert policies and checkpoints live here
```

**Choose your workflow:**

- **[Train and evaluate on Visual AntMaze](#2-run-h-jepa)** — start with a concrete example.
- **[Reproduce the paper's simulation results](#3-reproducing-push-t-ogbench-cube-visual-antmaze-fourroom)**
- **[Reproduce the paper's DROID results](#4-reproducing-droid)**

## 2) Run H-JEPA

Run commands from `h_jepa/` unless noted (`cd h_jepa` after installation).

### 2.1) Training

Train three-level H-JEPA on Visual AntMaze with seed 42. First prepare the
[AntMaze datasets](#31-datasets), including the probing files, and [evaluation tasks](#32-evaluation-tasks).

```bash
python main_hjepa.py --config-name ant_hjepa_l3 seed=42
```

Training configs follow `<env>_<model>`; see the [model/config tables](#5-configuration-reference) for other choices.

Training automatically runs planning evaluation at the end.

Runs write to `$HJEPA_HOME/ckpts/<env>/<env>_<model>/seed<seed>/`:

- `<env>_<model>_object.ckpt`, `config.yaml`, logs and the stable-pretraining cache `spt/`;
- `planning_eval/epoch_XXXX/metrics.yaml`: final planning eval with the matching planner and model seed;
- `final_probing_decoding_eval/`: frozen-model probes and decoders (`config/probing/<env>.yaml`).

### 2.2) Standalone planning evaluation

Use this to evaluate a pretrained checkpoint or rerun evaluation with different planner settings.

Here we evaluate the three-level H-JEPA model from above using three-level hierarchical planning on Visual AntMaze. Prepare the
[evaluation tasks](#32-evaluation-tasks) and either train the model or
[download its checkpoint](#34-pretrained-checkpoints-optional) first.

```bash
python eval.py --config-name ant_l3 seed=42 output.dir=eval_l3 \
  policy="$HJEPA_HOME/ckpts/ant/ant_hjepa_l3/seed42/ant_hjepa_l3_object.ckpt"
```

Results are saved beside the checkpoint in `eval_l3/metrics.yaml`; `success_rate` is reported as a percentage.
Completed tasks are skipped on rerun. Use a new `output.dir` when changing planner settings.

For cluster training and evaluation, see [Running on SLURM](docs/SLURM.md).

## 3) Reproducing Push-T, OGBench Cube, Visual AntMaze, FourRoom

Reproduces the bottom row of Figure 6 and the level-1 columns of Tables 1 and 9.
Results report paper success rates
(%, mean ± SE over seeds 42, 43, 44; planner seed = model seed).
**For evaluation only, download [tasks](#32-evaluation-tasks) and [checkpoints](#34-pretrained-checkpoints-optional);
datasets are needed for training and probing.**

### 3.1) Datasets

The datasets are HDF5 files under `$HJEPA_HOME`.

| Environment | Files | Source |
|---|---|---|
| Push-T | `pusht_expert_train.h5`, `pusht_expert_val.h5` | download (LeWM + HF) |
| OGBench Cube | `cube_single_expert_train.h5`, `cube_single_expert_val.h5` | download (LeWM) + split |
| Visual AntMaze | `visual_antmaze_medium_{explore_stitch_train,stitch_val,probing_train,probing_eval}.h5` | download (HF) or generate |
| FourRoom Distractors | `fourroom_tp35_d1{,_val,_probing,_probing_val}.h5` | download (HF) or generate |

**Push-T and Cube.** The training data is LeWM's release
([`quentinll/lewm-pusht`](https://huggingface.co/datasets/quentinll/lewm-pusht),
[`quentinll/lewm-cube`](https://huggingface.co/datasets/quentinll/lewm-cube), MIT). The Push-T
validation set is in our release. From the repository root:

```bash
hf download quentinll/lewm-pusht --repo-type dataset --local-dir $HJEPA_HOME --include "*.zst"
hf download quentinll/lewm-cube --repo-type dataset --local-dir $HJEPA_HOME --include "*.zst"
hf download jepa-world-models/h-jepa pusht_expert_val.h5 --repo-type dataset --local-dir $HJEPA_HOME
unzstd $HJEPA_HOME/pusht_expert_train.h5.zst
tar -I unzstd -xf $HJEPA_HOME/cube_single_expert.tar.zst -C $HJEPA_HOME
python scripts/data/add_pusht_block_ori.py "$HJEPA_HOME/pusht_expert_train.h5"  # add block_ori for probing
python scripts/data/split_cube.py  # first 9,800 episodes for training; last 200 for validation
```

**Visual AntMaze and FourRoom Distractors.** Download the eight files from
[`jepa-world-models/h-jepa`](https://huggingface.co/datasets/jepa-world-models/h-jepa):

```bash
hf download jepa-world-models/h-jepa --repo-type dataset --local-dir $HJEPA_HOME \
  --include "visual_antmaze_medium_*" --include "fourroom_tp35_d1*" --include SHA256SUMS
(cd "$HJEPA_HOME" && sha256sum -c --ignore-missing SHA256SUMS)
```

<details>
<summary>Optional: collect AntMaze and FourRoom datasets</summary>

From the repository root:

```bash
bash scripts/data/collect_datasets.sh
```

Uses the matching configs in `scripts/data/config/`. AntMaze requires the
[OGBench](https://github.com/seohongpark/ogbench) ant expert policy in `$HJEPA_HOME/ogbench_experts/ant/`:

```bash
mkdir -p $HJEPA_HOME/ogbench_experts
wget -qO- https://rail.eecs.berkeley.edu/datasets/ogbench/experts.tar.gz \
  | tar xz -C $HJEPA_HOME/ogbench_experts --strip-components=1 experts/ant
```

FourRoom collection reproduced the downloads in our checks. AntMaze follows the same distribution
but is not byte-identical because some reset randomness is unseeded. Its downloaded training set
contains 12,500 explore + 12,500 stitch episodes (the seed-42 paper training data), with only training
columns; collected files include extra columns. Probing evaluation uses 155 explore + 155 stitch episodes.

</details>

### 3.2) Evaluation tasks

Each environment has a fixed set of 50 start/goal tasks under `h_jepa/assets/eval_trajs/`.
From `h_jepa/`, download them from
[`jepa-world-models/h-jepa`](https://huggingface.co/datasets/jepa-world-models/h-jepa):

```bash
hf download jepa-world-models/h-jepa --repo-type dataset --local-dir assets --include "eval_trajs/*"
(cd assets/eval_trajs && sha256sum -c SHA256SUMS)
```

<details>
<summary>Optional: regenerate evaluation tasks</summary>

```bash
# Visual AntMaze: start/goal cells 3 grid cells apart, reached by the expert policy
# (needs the OGBench ant expert in $HJEPA_HOME/ogbench_experts/ant/, see 3.1)
python scripts/generate_maze_expert_grid_eval_tasks.py --config-name ant_flat \
  --output-path assets/eval_trajs/ant/expert_grid_d3_n50.pt \
  --d-low 3 --d-high 3 --num-episodes 50 --rollout-budget 125 --seed 42

# FourRoom Distractors: writes one file per active-distractor count; the evals use _d1
# (no dataset needed)
python scripts/generate_fourroom_eval_tasks.py \
  --data-config-path ../scripts/data/config/fourroom_tp35_d0to5.yaml \
  --output-dir assets/eval_trajs/fourroom --output-stem fourroom_tp35 \
  --cross-n-rooms 2 --max-steps 75 --num-episodes 50

# OGBench Cube: 20-step windows centred on the grasp, from the val split
# (needs cube_single_expert_val.h5, see 3.1)
python scripts/generate_dataset_eval_trajs.py --config-name cube_flat \
  --dataset-name cube_single_expert_val --traj-sampling-mode cube_pickup_centered \
  --goal-offset-steps 20 --eval-budget 50 --seed 42 \
  --output-path assets/eval_trajs/ogbench/goal_offset_20_pickup_val.pt

# Push-T: 75-step windows from the val split, stratified over episodes
# (needs pusht_expert_val.h5, see 3.1)
python eval.py --config-name pusht_flat policy=random load_eval_trajs_path=null \
  eval.goal_offset_steps=75 eval.dataset_name=pusht_expert_val seed=42 \
  dump_eval_trajs_path=assets/eval_trajs/pusht/goal_offset_75_val.pt
```

</details>

### 3.3) Training

Train all 4 environments × 7 models × 3 seeds (84 runs):

```bash
scripts/train_all.sh
```

Runs are sequential. Filter with `ENVS`, `MODELS`, `SEEDS`, e.g.
`ENVS=cube MODELS="lewm hjepa_l3" SEEDS=42 scripts/train_all.sh`, or submit each training command
as a separate cluster job. Outputs follow §2.1.

### 3.4) Pretrained checkpoints (optional)

To skip training (§3.3), download all 84 trained models (4 environments × 7 models × 3 seeds, 9.7 GB) from
[`jepa-world-models/h-jepa`](https://huggingface.co/jepa-world-models/h-jepa)
(the DROID models are in §4.3):

```bash
hf download jepa-world-models/h-jepa --local-dir $HJEPA_HOME/ckpts --exclude "droid/*"
# one environment only: --include "cube/*" instead of --exclude; one seed: add --include "*/seed42/*"
```

Checkpoints and `normalizer.pt` use the training layout (§2.1), ready for the eval scripts below.

### 3.5) Depth comparison (Figure 6)

First complete [training (§3.3)](#33-training) or [download pretrained checkpoints (§3.4)](#34-pretrained-checkpoints-optional),
and prepare the [evaluation tasks (§3.2)](#32-evaluation-tasks). Trained and downloaded checkpoints use the same directory layout expected by this script.

Training runs this eval automatically; to evaluate saved checkpoints:

```bash
scripts/eval_depth.sh
```

Results are saved next to each checkpoint in `eval_<planner>/metrics.yaml`.
Both this script and the cost-ladder script accept `ENVS` and `SEEDS` filters.
Each requires all relevant model checkpoints for the selected environments and seeds; neither accepts a `MODELS` filter.
For a single checkpoint, use [standalone evaluation (§2.2)](#22-standalone-planning-evaluation).

See the [expected results reported in the paper](docs/RESULTS.md#depth-comparison-figure-6).

### 3.6) Cost ladder (Tables 1 and 9)

First complete [training (§3.3)](#33-training) or [download pretrained checkpoints (§3.4)](#34-pretrained-checkpoints-optional),
and prepare the [evaluation tasks (§3.2)](#32-evaluation-tasks).

Evaluate each H-JEPA model with level-1 planning and either native or projected cost:

```bash
scripts/eval_cost_ladder.sh
```

Results go beside each checkpoint in `eval_flat/metrics.yaml` (native L1) and
`eval_l<k>_project/metrics.yaml` (level-k cost, k = 2 … model depth).

See the [expected results reported in the paper](docs/RESULTS.md#cost-ladder-tables-1-and-9).

## 4) Reproducing DROID

Evaluate open-loop planning on real-robot videos from DROID. Plans are scored against recorded expert trajectories;
this evaluation measures trajectory fidelity, not closed-loop task success.

Reproduces Figure 9(b).
**For evaluation only, download the [evaluation clips](#41-data) (252 MB) and
[checkpoints](#43-pretrained-checkpoints-optional); the 91 GB training set is needed for training only.**

### 4.1) Data

Download DROID data to `$HJEPA_HOME/droid/` ([dataset details and license](https://huggingface.co/datasets/jepa-world-models/h-jepa)).

**Evaluation clips.** The 16 evaluation episodes, raw 1280×720 in `droid_raw/1.0.1/`:

```bash
hf download jepa-world-models/h-jepa --repo-type dataset --local-dir $HJEPA_HOME \
  --include droid/droid_raw_eval16.tar --include droid/SHA256SUMS
(cd $HJEPA_HOME/droid && sha256sum -c --ignore-missing SHA256SUMS && tar -xf droid_raw_eval16.tar)
```

**Training data.** 91 GB of tar shards, re-encoded at 256×256 in `droid_256p/1.0.1/`:

```bash
hf download jepa-world-models/h-jepa --repo-type dataset --local-dir $HJEPA_HOME --include "droid/*"
bash $HJEPA_HOME/droid/extract.sh    # checks SHA256SUMS, untars all shards; --delete drops the tars
```

Models train at 5 fps on 74,896 episodes, excluding the 16 evaluation clips, with 64 validation episodes.

### 4.2) Training

Train 3 models × 3 seeds (1, 1000, 10000), for 9 runs:

```bash
ENVS=droid scripts/train_all.sh
```

| Config | Model | GPUs × batch | Epochs |
|---|---|---|---|
| `droid_lewm` | flat LeWM + IDM | 2 × 128 | 100 |
| `droid_hwm_l2` | HWM: identity level 2, trained end-to-end | 2 × 128 | 100 |
| `droid_hjepa_l2` | H-JEPA: latent-MLP level 2, trained end-to-end | 2 × 128 | 100 |

Each epoch is 292 steps. Run inside a SLURM allocation with 2 GPUs and 2 tasks per node:
the script uses `srun --ntasks-per-node=2 python main_hjepa.py --config-name droid_<model> seed=<seed>`.
Alternatively, submit each command separately. `MODELS` and `SEEDS` filter runs.

Outputs follow §2.1, with snapshots `droid_<model>_epoch_<N>_object.ckpt` every `save_every_n_epochs`.

### 4.3) Pretrained checkpoints (optional)

To skip training (§4.2), download the 9 trained models (3 models × 3 seeds, 2.7 GB) from
[`jepa-world-models/h-jepa`](https://huggingface.co/jepa-world-models/h-jepa):

```bash
hf download jepa-world-models/h-jepa --local-dir $HJEPA_HOME/ckpts --include "droid/*"
# one model only: --include "droid/droid_hjepa_l2/*"; one seed: --include "droid/*/seed1/*"
```

`droid_<model>_object.ckpt` (the epoch-100 model) and `normalizer.pt` use the training layout (§4.2),
without the epoch snapshots, ready for the eval script below.

### 4.4) Planning evaluation

First complete [training (§4.2)](#42-training) or [download pretrained checkpoints (§4.3)](#43-pretrained-checkpoints-optional),
and prepare the [evaluation clips (§4.1)](#41-data). Trained and downloaded checkpoints use the same directory layout expected by this script.

Plan each clip start → goal in one open-loop call and score against ground-truth actions.
Evaluate all models with planner seeds 1, 2, 3, writing `eval_{flat,l2}/plan_seed<ps>/eval.csv` beside
each checkpoint and printing mean ± SE per model (filter with `MODELS`, `SEEDS`, `PLAN_SEEDS`):

```bash
scripts/eval_droid.sh
```

For standalone evaluation, adapt the [command in §2.2](#22-standalone-planning-evaluation)
to your DROID checkpoint, using `droid_flat` for LeWM or `droid_l2` for HWM and H-JEPA.

Fréchet fidelity measures how closely the planned end-effector path follows the expert trajectory:
0% corresponds to zero motion, and 100% to an exact match. The `frechet/skill_mean` column in `eval.csv`
reports mean fidelity across the 16 clips; multiply by 100 to express it as a percentage.

See the [expected results reported in the paper](docs/RESULTS.md#droid-planning-figure-9b).

## 5) Configuration reference

See [ARCHITECTURE.md](h_jepa/ARCHITECTURE.md) for model and planner internals.
Configs use `<env>` = `ant`, `fourroom`, `cube`, `pusht` or `droid`.
The simulation environments support the options below. DROID supports models `lewm`, `hjepa_l2` and `hwm_l2`,
with planners `flat` for LeWM and `l2` for H-JEPA/HWM.

| Model (`config/train/<env>_<model>.yaml`) | Description |
|---|---|
| `lewm` | Flat LeWM (one level) |
| `hjepa_l2`, `hjepa_l3`, `hjepa_l4` | End-to-end H-JEPA with 2/3/4 levels |
| `hwm_l2`, `hwm_l3`, `hwm_l4` | HWM: identity upper encoders, no upper-level SIGReg |

| Planner (`config/eval/<env>_<planner>.yaml`) | Description |
|---|---|
| `flat` | Level-1 planning |
| `l2`, `l3`, `l4` | Hierarchical planning for H-JEPA and HWM |
| `l2_project`, `l3_project`, `l4_project` | Level-1 planning with cost in the level-2/3/4 latent |

## 6) Citation

```bibtex
@article{zhang2026hjepa,
  title   = {{H-JEPA}: End-to-End Learning of Hierarchical World Models for Visual Planning},
  author  = {Zhang, Wancong and Terver, Basile and Rabbat, Mike and LeCun, Yann and Balestriero, Randall},
  journal = {arXiv preprint arXiv:2610.06805},
  year    = {2026}
}
```

## 7) License

MIT (see `LICENSE`).

# docs/RESULTS.md

# Paper-reported results

These are the results reported in the [H-JEPA paper](https://arxiv.org/abs/2610.06805),
transcribed from the original repository README. They are reference values for reproduction,
not measurements from a new validation run.

## Depth comparison (Figure 6)

[Reproduction instructions](../README.md#35-depth-comparison-figure-6).

Planning success rate (%), mean ± standard error over model seeds 42, 43, 44,
with the planner seed paired to the model seed. Each environment uses 50 fixed start/goal tasks.
LeWM uses flat planning; H-JEPA and HWM use the planner matching their model depth.
The numbers in the column headings indicate model depth.

| | LeWM | H-JEPA 2 | H-JEPA 3 | H-JEPA 4 | HWM 2 | HWM 3 | HWM 4 |
|---|---|---|---|---|---|---|---|
| Visual AntMaze | 18.0 ± 3.5 | 39.3 ± 3.7 | 73.3 ± 3.5 | 67.3 ± 2.4 | 34.0 ± 1.2 | 38.7 ± 3.5 | 14.0 ± 2.0 |
| FourRoom Distractors | 40.7 ± 6.8 | 81.3 ± 6.7 | 96.0 ± 1.1 | 88.0 ± 2.3 | 75.3 ± 3.3 | 99.3 ± 0.7 | 92.7 ± 4.4 |
| OGBench Cube | 32.0 ± 6.1 | 47.3 ± 2.7 | 60.0 ± 5.0 | 62.7 ± 2.4 | 46.7 ± 2.9 | 53.3 ± 5.2 | 34.0 ± 3.1 |
| Push-T | 40.0 ± 2.3 | 45.3 ± 1.3 | 17.3 ± 3.5 | 0.7 ± 0.7 | 42.0 ± 6.4 | 12.0 ± 2.0 | 0.0 ± 0.0 |


## Cost ladder (Tables 1 and 9)

[Reproduction instructions](../README.md#36-cost-ladder-tables-1-and-9).

Planning success rate (%), mean ± standard error over model seeds 42, 43, 44,
with paired planner seeds and the same 50 fixed tasks per environment.
All entries use level-1 planning. Native L1 measures cost in the level-1 latent space;
L2/L3/L4 cost projects predictions and the goal into the corresponding upper latent space.
Blank cells indicate a cost level above the model's depth.

| | Model | Native L1 | L2 cost | L3 cost | L4 cost |
|---|---|---|---|---|---|
| Visual AntMaze | 2 levels | 23.3 ± 3.3 | 31.3 ± 2.7 | | |
| | 3 levels | 16.7 ± 1.8 | 20.7 ± 4.8 | 22.0 ± 2.3 | |
| | 4 levels | 10.0 ± 0.0 | 20.7 ± 1.8 | 21.3 ± 4.7 | 26.7 ± 2.9 |
| FourRoom Distractors | 2 levels | 9.3 ± 0.7 | 38.7 ± 6.6 | | |
| | 3 levels | 43.3 ± 8.7 | 65.3 ± 5.5 | 71.3 ± 4.1 | |
| | 4 levels | 68.7 ± 4.7 | 72.0 ± 3.1 | 66.0 ± 3.1 | 70.7 ± 2.7 |
| OGBench Cube | 2 levels | 24.0 ± 1.2 | 13.3 ± 0.7 | | |
| | 3 levels | 24.7 ± 1.3 | 28.0 ± 4.2 | 14.0 ± 3.5 | |
| | 4 levels | 26.7 ± 2.7 | 25.3 ± 2.4 | 12.0 ± 2.0 | 12.0 ± 2.3 |
| Push-T | 2 levels | 36.7 ± 1.8 | 38.0 ± 3.1 | | |
| | 3 levels | 30.7 ± 1.8 | 28.0 ± 4.0 | 24.7 ± 4.1 | |
| | 4 levels | 1.3 ± 0.7 | 1.3 ± 0.7 | 0.7 ± 0.7 | 1.3 ± 1.3 |

## DROID planning (Figure 9b)

[Reproduction instructions](../README.md#44-planning-evaluation).

Open-loop planning on 16 DROID evaluation clips at 5 fps, using the released epoch-100 checkpoints.
Fréchet fidelity (%) is reported as mean ± standard error over training seeds 1, 1000, 10000;
each training seed's result is first averaged over planner seeds 1, 2, 3.

| Model | Fréchet fidelity (%) |
|---|---|
| LeWM + IDM | 33.57 ± 1.52 |
| HWM | 35.65 ± 2.22 |
| H-JEPA | 38.42 ± 0.94 |

Fréchet fidelity is `1 − F(planned, expert) / F(zero motion, expert)`, where `F` is the discrete
Fréchet distance between cumulative xyz end-effector paths. The metric is computed per clip and
averaged over the 16 clips. Zero motion scores 0%, an exact path match scores 100%, and negative
values indicate worse fidelity than zero motion. This is an offline path metric, not closed-loop task success.
The `frechet/skill_mean` column in `eval.csv` stores the unscaled value; multiply by 100 for this table.

This table covers the three models evaluated by `scripts/eval_droid.sh`; it does not include
the no-IDM LeWM bar or the compute sweep in Figure 9(c).

# docs/SLURM.md

# Running on SLURM

Complete the [installation](../README.md#1-installation) first and set `HJEPA_HOME`.
Run the commands below from `h_jepa/` (`cd h_jepa` from the repository root); paths are relative to that directory.

Set cluster options in `scripts/slurm/local.yaml` (gitignored), overriding `scripts/slurm/default.yaml`:

```yaml
venv: /path/to/.venv     # its bin/python runs the jobs
partition: gpu
account: my_account
qos: normal
```

```bash
# one job per seed: $HJEPA_HOME/ckpts/cube/my_sweep_<timestamp>/cube_hjepa_l3/seed<seed>/
python scripts/slurm/launch.py train --config-name cube_hjepa_l3 --sweep my_sweep --seeds 42,43,44
# relaunch one run from lightning_resume/last.ckpt
python scripts/slurm/launch.py resume <run_dir>
# one eval.py job per saved epoch checkpoint: <run_dir>/eval_epoch/epoch_<N>/
python scripts/slurm/launch.py eval <sweep_dir|run_dir> --epochs last
```

Use `--grid key=v1,v2` (repeatable) for Hydra grids and `--dry` to preview submissions.
Sweeps run from a submission-time repo copy (`<sweep_dir>/code`). Wall-clock limits are `time`
(training) and `eval.time_by_env` (eval); `--time` overrides both.

# h_jepa/ARCHITECTURE.md

# Hierarchical JEPA: Architecture Overview

This document covers the two entry points for working with the hierarchical world model:
- **Training**: `main_hjepa.py`
- **Planning eval**: `eval.py` → `planning_eval.py` / `droid_eval.py` → `hierarchical_solver.py`

---

## 1. Dataloader

### Dataset

`swm.data.HDF5Dataset` loads pre-collected trajectories from HDF5 files. Each sample is a **clip** — a short window of consecutive frames sampled at a given frameskip.

The dataset is configured per-level. It returns a single level-1 stream long
enough for the top level, and the model constructs higher levels internally. For a
2-level model on PushT with level-2 stride 3:

| Level | Frameskip | Kernel size | Clip length (`num_steps`) |
|-------|-----------|-------------|---------------------------|
| 1     | 25 real steps per frame | 1 | 4 frames (history 3 + pred 1) |
| 2     | 75 real steps per frame (= 25 × stride 3) | 1 or more | 4 frames |

The dataset span is computed from the highest loaded level by recursively
expanding `num_steps` through each upper level's `frameskip`/`stride` and
`window_size`. This ensures state chunks at higher levels are fully populated;
action chunks may still be zero-padded by the model.

### Batch keys

The dataloader initially outputs only level-1 keys for each column in
`keys_to_load`:

```
pixels_level1   : (B, T1, C, H, W)   — raw RGB, ImageNet-normalized, resized to img_size
action_level1   : (B, T1, act_dim * frameskip1)   — actions stacked over frameskip
proprio_level1  : (B, T1, proprio_dim)  — z-score normalized (if loaded)
state_level1    : (B, T1, state_dim)    — z-score normalized (if loaded)
```

`T1` may be longer than the level-1 training target length because it must
contain enough lower-level states to construct all higher-level windows. After
model-side chunking, `encode_hierarchical` adds higher-level
state targets. If `levelN.window_size > 1`, non-action targets are chunked:

```
pixels_levelN   : (B, T, K, C, H, W)
proprio_levelN  : (B, T, K, proprio_dim)
state_levelN    : (B, T, K, state_dim)
```

where `K = levelN.window_size`. The learned state/action embeddings remain unchunked at the higher level:

```
embed_N  : (B, T, D)
action_N : (B, T, A)
```

**Image preprocessing**: `ToImage` + `Resize(img_size)` + ImageNet mean/std normalization, applied to all `pixels_*` columns.

**Action stacking (level 1)**: because the dataset skips 5 real steps between observations, the `frameskip` actions taken in between are concatenated, so the level-1 action vector has dimension `frameskip × raw_action_dim`.

**Action encoding (level 2+)**: an `action_encoder` (a small sequence encoder) compresses a chunk of lower-level action embeddings into a fixed-size latent action, the macro-action the level's planner optimizes. In model-side chunking, action chunks have length `levelN.stride`, independent of `levelN.window_size`.

**Non-pixel columns** are z-score normalized using per-column mean/std computed on the training set.

---

## 2. HJEPA: Model and Training Forward Pass

### Model structure

`HJEPA` is a thin `nn.ModuleList` container for N independent `JEPA` modules. Each `JEPA` has:

- **Encoder**: maps observations → latent vector. The encoder owns its projection head as `encoder.projector`.
  - Level 1 without proprio: ViT applied to raw pixels → CLS token → `encoder.projector` → `embed_dim`.
  - Level 1 with proprio: `encoder.pixel_encoder` maps pixels to `pixel_embed`, `encoder.proprio_encoder` maps proprio to `proprio_embed`, then `encoder.projector(concat(pixel_embed, proprio_embed))` produces `embed`.
  - Level 2+: a latent encoder applied to lower-level embeddings. With `window_size=1`, this can be a pointwise latent MLP. With `window_size>1`, it can be a sequence encoder that pools a lower-level temporal window into one abstract embedding. If proprio is enabled at that level, the pixel/proprio streams consume `pixel_embed_{level-1}` and `proprio_embed_{level-1}`.
- **Action Encoder** (level 2+; identity at level 1): sequence encoder compressing a chunk of lower-level action embeddings into one latent action.
- **Action Embed**: small MLP that maps the level's actions (raw action blocks at level 1, latent actions above) → the predictor's action embedding.
- **Predictor**: `ProjectedPredictor`, where the base `ARPredictor` Transformer predicts in its hidden output space and `predictor.projector` maps the result to `embed_dim`.

### How the hierarchy is defined

The hierarchy is **temporal**: each level operates at a coarser timescale.

```
Level 1: frameskip = dataset.level1.frameskip  (set in dataset config)
Level N: frameskip = level(N-1).frameskip × levelN.stride
Level N state window length = levelN.window_size
```

Level 2's encoder takes as input the **embedding produced by level 1's encoder** — not raw pixels. The hierarchy is compositional:

```
s1_t = Enc1(o_t)
s2_T = Enc2(s1_{T·stride : T·stride + window_size})
```

To get a level-2 embedding, the model first runs the level-1 encoder, then feeds the result into the level-2 encoder.

For action alignment, the first lower-level action in upper chunk `T` starts at the last lower-level state in that state chunk:

```
state chunk  : s[start], ..., s[start + window_size - 1]
action chunk : a[start + window_size - 1], ..., length levelN.stride
```

State chunks are required to be full windows in the current training path. Action chunks may be zero-padded near the end.

### `encode_hierarchical`

The training-time encode. The dataset returns only a long `level1` stream
(`pixels_level1`, `action_level1`, targets); `encode_hierarchical` lifts it through
every level in sequence:

```python
embed_1 = JEPA[1].encode(pixels)    # level 1: raw pixels (sparse or dense, see below)
embed_2 = JEPA[2].encode(embed_1)   # level 2: chunks of level-1 embeddings
# ... and so on up to level N
```

Each higher level encodes the previous level's `embed_{N-1}` and `action_{N-1}` with
`chunk_temporal_inputs=True`, so its `JEPA.encode` does the constant-stride
chunking/subsampling. If a higher level has proprio enabled, it instead takes the
previous level's `pixel_embed_{N-1}` and `proprio_embed_{N-1}` streams into its fusion
encoder. The output holds `embed_1..embed_N` (`(B, T, D)` each), `action_1..action_N`,
`pixel_embed_N` / `proprio_embed_N` for proprio-enabled levels, and the chunked state
targets (`pixels_levelN`, `state_levelN`, `proprio_levelN`, ...).

Planning and probing do not use it: they call each level's `JEPA.encode` directly.

Lower levels may be longer than their training target length while constructing
upper levels, so before returning the output, each level's state and action
variables are randomly cropped to:

```
levelN.wm.history_size + levelN.wm.rollout_n
```

The same random time indices are used for all variables at that level. For example, with `level2.stride=3`, `level2.window_size=3`, and target length 4, level 1 is loaded long enough to produce four full level-2 windows, but returned `pixels_level1`, `action_level1`, `embed_1`, and `action_1` are cropped back to length 4.

**Sparse level-1 encoding** (`sparse_level1_encode=True`, the default): the crop
offsets are drawn *before* encoding, and the level-1 encoder runs only on the
frames that some kept step at some level actually reads (each level's crop, plus
the windows those steps expand to at the levels below). The results are scattered
into zero-filled full-length `embed_1` / `pixel_embed_1` / `proprio_embed_1`, so
the higher levels' chunking code is unchanged and the zeros only ever occupy
positions the crop discards. Actions are still encoded on the full stream. This
is numerically identical to encoding every frame (see
`unit_tests/test_sparse_level1_encode.py`) and pays off when `window_size <
stride` leaves gaps between windows: e.g. a 4-level stride-2 window-1 model
encodes ~12 of its 25 level-1 frames. When `window_size >= stride` every frame is
needed and the path degenerates to the dense one.

### `hjepa_forward` (the training step)

After encoding all levels, for each trainable level:

**1. Prediction**

For `rollout_n=1`, the training path keeps the causal teacher-forced one-step objective:

```
context  = emb[:, :history_size]          # (B, H, D)
act_ctx  = act_emb[:, :history_size]      # (B, H, A)
target   = emb[:, 1 : history_size + 1]   # (B, H, D)

pred = JEPA.predict(context, act_ctx)     # (B, H, D)
```

For `rollout_n>1`, the model rolls out autoregressively from the full `history_size` context for `rollout_n` steps, using ground-truth future actions and predicted future embeddings. When `history_size > 1`, it also keeps the teacher-forced one-step loss as an anchor: `teacher_forcing_loss + rollout_loss_weight * rollout_loss`. When `history_size == 1`, the teacher-forced term duplicates the first rollout step, so `pred_loss = rollout_loss_weight * rollout_loss`.

**2. Losses**

| Loss | Description |
|------|-------------|
| `pred_loss` | Teacher-forced one-step MSE for `rollout_n == 1`; for longer rollouts, weighted rollout MSE plus the teacher-forced anchor only when `history_size > 1` |
| `sigreg_loss` | SIGReg regularization: encourages embedding diversity and prevents collapse |
| `teacher_forcing_loss` | One-step teacher-forced MSE anchor |
| `rollout_loss` | Autoregressive full-history rollout MSE, logged when `rollout_n > 1` |

Total loss per level: `pred_loss + sigreg_weight * sigreg_loss`.

Total loss: sum across all trainable levels.

---

## 3. HierarchicalSolver (Planning)

### Overview

`HierarchicalSolver` orchestrates planning across all hierarchy levels. The intuition is:

> The top level plans coarsely (where should I be in 15-step chunks?), and each lower level plans how to get there at finer granularity.

The solver relies on the JEPA models themselves for hierarchy semantics. In
particular, planning reads each upper level's `temporal_stride` and
`temporal_window_size` from the model; eval configs should not duplicate these
as planning fields.

### Setup

```
eval.py
  └─ run_planning_eval
       └─ _build_policy
            └─ build_solver
                 └─ build_hierarchical_solver
                      └─ HierarchicalSolver
                           ├─ level_solvers[1]: GradientSolver  (fine, level-1 model)
                           └─ level_solvers[2]: GradientSolver  (coarse, level-2 model)
```

Each level gets its own gradient-descent solver wrapped in a `LevelCostModel` adapter. The adapter:
- Runs **rollout** in the level's own latent space (using `JEPA.rollout`).
- Computes **state cost** in the *upper* level's space: it encodes the predicted level-N latents through level-(N+1)'s `JEPA.encode(..., chunk_temporal_inputs=True)` before comparing against the subgoal targets.
- Optionally computes **action cost** in the upper level's action-embedding space, controlled by `hierarchical_plan_config.levelN.action_cost_weight` (default `0.0`).

### Planning loop (`HierarchicalSolver.solve`)

Planning proceeds **top-down**, one level at a time:

```
# Precompute embeddings of current obs and goal at all levels
obs_embeddings  = encode_all_levels(obs_pixels)   # embed_1, embed_2, ...
goal_embeddings = encode_all_levels(goal_pixels)

for level in [N, N-1, ..., 1]:
    obs_emb  = obs_embeddings[embed_{level}]
    goal_emb = (top level)    goal_embeddings[embed_{level}]
               (lower levels) subgoal latents from level above

    actions, subgoal_latents = level_solver.solve(obs_emb, goal_emb)

return level_1_actions
```

At the end, `outputs['actions']` contains the level-1 solver's chosen primitive actions.

### Observation and goal encoding

Before planning, `HierarchicalSolver` encodes the current observation and goal
through all hierarchy levels. For level 1 this is just the pixel encoder. For
level 2+, if the upper JEPA has `window_size > 1`, the solver builds a context
window before calling that upper encoder:

- If only one frame is available, repeat that frame until the window has length
  `window_size`.
- If a longer context stream is available, use the latest `window_size` lower
  embeddings so the encoded upper context ends at the most recent observation.
- Store only the last embedding at each level as `embed_{level}` for planning.

Example with one current observation `o_t`, `level2.stride=3`, and
`level2.window_size=3`:

```
level 1 input  : (o_t)
level 1 embed  : (e_t)
level 2 input  : (e_t, e_t, e_t)
level 2 embed  : E_t
```

This is a fallback for planning from a single observation. If the policy later
tracks real recent observations, those real embeddings can fill the higher-level
context window instead of repeating the current one.

### Key design decisions

**Subgoal passing**: the top-level solver predicts a trajectory of coarse latents `(B, T_coarse, D_top)`. A subset (`num_subgoals`) of these are extracted and passed as goals to the level below, effectively converting abstract "where I want to be" into concrete waypoints.

**Cross-level state cost**: level-N rollout produces latents in level-N space. To measure progress toward level-(N+1) subgoals, the adapter feeds the whole predicted lower-level stream into level-(N+1)'s `JEPA.encode` with `chunk_temporal_inputs=True`. The upper JEPA applies its own `temporal_stride` and `temporal_window_size`.

Each level uses an integer `horizon`, and the solver derives one horizon per
solver call from it and the eval budget (flat planning does the same). The
highest level decreases monotonically from its configured horizon to `1`; each
lower level stays at its configured horizon until the next upper level reaches
`1`, then decreases over that remaining suffix. Lower levels can set
`pre_decay_horizon` to override the horizon used before their decay segment
starts; when unset, this defaults to the next upper level's temporal stride.
When an upper level's
resolved planning horizon is `1`, that upper solve is skipped because its
predicted subgoal would not be used. By default, the next lower level then plans
directly to the actual goal embedding in its own latent space. Set
`horizon_one_goal_cost_space: upper` on the skipped upper level's plan config to
instead compare the lower rollout after projection through that upper encoder
against the actual upper-level goal embedding.

For `window_size=1`, this reduces to stride subsampling. With `stride=3`:

```
(s0), (s3), (s6), ...
```

For `window_size=3`, the adapter first prefix-repeats the current context state
so the first upper chunk contains no predictions:

```
lower rollout        : (s0, s1, s2, s3, s4, s5, s6)
prepared upper input : (s0, s0, s0, s1, s2, s3, s4, s5, s6)
upper chunks         : (s0,s0,s0), (s1,s2,s3), (s4,s5,s6)
```

`JEPA.criterion()` drops the first encoded timestep, so cost is applied only to
prediction chunks:

```
Enc(s1,s2,s3), Enc(s4,s5,s6), ...
```

**Cross-level action cost**: lower-level actions can also be projected into the
upper level's action embedding space and compared against the upper solver's
chosen macro-actions. This term is disabled by default:

```
hierarchical_plan_config:
  level1:
    action_cost_weight: 0.0
```

When enabled, level-N candidate actions are first embedded with level N's
`action_embed`, then encoded by level N+1's `action_encoder`, and this pooled
macro-action is compared directly against the upper solver's optimized
macro-action.

For `stride=3`, `window_size=1`:

```
upper plan actions : A0, A1
lower actions      : a0, a1, a2, a3, a4, a5
pooled action cost : mse(A0, enc_upper(embed_lower(a0:a2)))
                   + mse(A1, enc_upper(embed_lower(a3:a5)))
```

For `window_size>1`, action embeddings are padded at the front to stay aligned
with the prefix-repeated state stream. The final projected upper action is
dropped because it points beyond the last encoded upper state.

**Goal anchoring**: if the top-level planner's last predicted state is known to converge toward the true goal, the last subgoal is replaced with the ground-truth goal embedding to prevent drift propagation down the chain.

**Temporal span**: the number of real environment steps spanned by one prediction step at each level:

```
span(1) = action_block
span(N) = span(N-1) × horizon(N-1)
```

For the offline PushT example: `span(1) = 5`, `span(2) = 5 × 15 = 75` real steps.

### Solvers

| Solver | Strategy |
|--------|----------|
| `GradientSolver` | Backpropagate through the differentiable rollout to optimize actions directly |

Each level can use a different solver and budget. The hierarchical eval configs
use separate level-specific settings for horizon, `num_subgoals`, `cost_last_n`,
`intermediate_cost_weight`, and solver-specific optimization parameters.

# h_jepa/scripts/train_all.sh

```bash
#!/usr/bin/env bash
# Train every model behind the depth figure and the cost-ladder tables: 4 environments
# x 7 models x 3 seeds. Each run ends with its planning eval and final probing/decoding
# eval. The runs are independent; on a cluster, submit each line as its own job.
# ENVS=droid trains the DROID models (3 models x 3 seeds) instead; each DROID run takes one
# process per GPU (srun task), so run it inside a SLURM allocation with 2 GPUs and 2 tasks per node.
set -e
cd "$(dirname "$0")/.."

ENVS=${ENVS:-"ant fourroom cube pusht"}

for env in $ENVS; do
  if [[ $env == droid ]]; then
    models=${MODELS:-"lewm hwm_l2 hjepa_l2"} seeds=${SEEDS:-"1 1000 10000"} launch="srun --ntasks-per-node=2"
  else
    models=${MODELS:-"lewm hjepa_l2 hjepa_l3 hjepa_l4 hwm_l2 hwm_l3 hwm_l4"} seeds=${SEEDS:-"42 43 44"} launch=
  fi
  for model in $models; do
    for seed in $seeds; do
      $launch python main_hjepa.py --config-name "${env}_${model}" seed="$seed"
    done
  done
done

```

# h_jepa/scripts/eval_depth.sh

```bash
#!/usr/bin/env bash
# Standalone planning evals behind the bottom row of the depth figure: LeWM with flat
# planning, H-JEPA and HWM with 2/3/4-level planning. Model and planner seeds are paired.
# Training already runs the same evals at the end; this script re-runs them from saved
# checkpoints ($HJEPA_HOME/ckpts/<env>/<env>_<model>/seed<seed>/).
set -e
cd "$(dirname "$0")/.."

ENVS=${ENVS:-"ant fourroom cube pusht"}
SEEDS=${SEEDS:-"42 43 44"}

eval_model() {
  local env=$1 model=$2 plan=$3 seed=$4
  local run="$HJEPA_HOME/ckpts/${env}/${env}_${model}/seed${seed}"
  python eval.py --config-name "${env}_${plan}" seed="$seed" \
    policy="$run/${env}_${model}_object.ckpt" output.dir="$run/eval_${plan}"
}

for env in $ENVS; do
  for seed in $SEEDS; do
    eval_model "$env" lewm flat "$seed"
    for n in 2 3 4; do
      eval_model "$env" "hjepa_l$n" "l$n" "$seed"
      eval_model "$env" "hwm_l$n" "l$n" "$seed"
    done
  done
done

```

# h_jepa/scripts/eval_cost_ladder.sh

```bash
#!/usr/bin/env bash
# Level-1 planning of the H-JEPA models with the cost measured in each upper level's
# latent (the cost-ladder tables). An n-level model is evaluated with the l2..ln
# projections. The native level-1 column uses the flat planner (<env>_flat).
set -e
cd "$(dirname "$0")/.."

ENVS=${ENVS:-"ant fourroom cube pusht"}
SEEDS=${SEEDS:-"42 43 44"}

for env in $ENVS; do
  for seed in $SEEDS; do
    for n in 2 3 4; do
      run="$HJEPA_HOME/ckpts/${env}/${env}_hjepa_l$n/seed${seed}"
      for plan in flat $(seq -f "l%g_project" 2 "$n"); do
        python eval.py --config-name "${env}_${plan}" seed="$seed" \
          policy="$run/${env}_hjepa_l${n}_object.ckpt" output.dir="$run/eval_${plan}"
      done
    done
  done
done

```

# h_jepa/scripts/eval_droid.sh

```bash
#!/usr/bin/env bash
# Offline DROID planning evals behind Figure 9(b): the release planner cell of
# each model (the config defaults, README §5.4) on the 16 evaluation clips, with planner
# seeds 1/2/3 for every trained model, then the mean Frechet fidelity per model. Checkpoints
# come from `ENVS=droid train_all.sh` ($HJEPA_HOME/ckpts/droid/droid_<model>/seed<seed>/).
# The eval config follows the model name (lewm*: droid_flat, *_l<N>*: droid_l<N>).
# EPOCHS="50 100 150" evaluates droid_<model>_epoch_<N>_object.ckpt instead, into
# eval_<plan>/epoch_<N>/, skipping missing checkpoints.
set -e
cd "$(dirname "$0")/.."

MODELS=${MODELS:-"lewm hwm_l2 hjepa_l2"}
SEEDS=${SEEDS:-"1 1000 10000"}
PLAN_SEEDS=${PLAN_SEEDS:-"1 2 3"}
EPOCHS=${EPOCHS:-""}
RUNS=${RUNS:-$HJEPA_HOME/ckpts/droid}

for model in $MODELS; do
  plan=flat
  [[ $model =~ _l([0-9]) ]] && plan=l${BASH_REMATCH[1]}
  for seed in $SEEDS; do
    run="$RUNS/droid_${model}/seed${seed}"
    for epoch in ${EPOCHS:-final}; do
      if [[ $epoch == final ]]; then
        ckpt="$run/droid_${model}_object.ckpt" out="$run/eval_${plan}"
      else
        ckpt="$run/droid_${model}_epoch_${epoch}_object.ckpt" out="$run/eval_${plan}/epoch_${epoch}"
      fi
      if [[ ! -f $ckpt ]]; then
        echo "skip: missing $ckpt"
        continue
      fi
      for ps in $PLAN_SEEDS; do
        python eval.py --config-name "droid_${plan}" policy="$ckpt" seed="$ps" output.dir="$out/plan_seed${ps}" \
          hydra.run.dir="$out/plan_seed${ps}/hydra"
      done
    done
  done
done

python - "$MODELS" "$SEEDS" "$PLAN_SEEDS" "${EPOCHS:-final}" "$RUNS" <<'PY'
import csv, os, re, sys
import numpy as np

models, seeds, plan_seeds, epochs = (a.split() for a in sys.argv[1:5])
for model in models:
    m = re.search(r"_l(\d)", model)
    plan = f"l{m.group(1)}" if m else "flat"
    for epoch in epochs:
        sub = "" if epoch == "final" else f"/epoch_{epoch}"
        per_seed = []
        for seed in seeds:
            run = f"{sys.argv[5]}/droid_{model}/seed{seed}/eval_{plan}{sub}"
            paths = [f"{run}/plan_seed{ps}/eval.csv" for ps in plan_seeds]
            if all(os.path.exists(p) for p in paths):
                rows = [next(csv.DictReader(open(p))) for p in paths]
                per_seed.append(100 * np.mean([float(r["frechet/skill_mean"]) for r in rows]))
        if not per_seed:
            continue
        se = np.std(per_seed, ddof=1) / np.sqrt(len(per_seed))
        print(
            f"droid_{model} {epoch}: Frechet fidelity {np.mean(per_seed):.2f} +- {se:.2f} "
            f"(%, mean +- SE over {len(per_seed)} train seeds)"
        )
PY

```

# h_jepa/config/train/base/ant.yaml

```yaml
# @package _global_
# Visual AntMaze: settings shared by all seven models.
data:
  dataset:
    name: visual_antmaze_medium_explore_stitch_train
    subset_seed: ${seed}
    val_name: visual_antmaze_medium_stitch_val
    val_total_transitions: 201000
    keys_to_load:
    - pixels
    - action
    - xy
    - qpos
    - qvel
    - proprio
    keys_to_cache:
    - action
    - xy
    - qpos
    - qvel
    keys_to_merge:
      proprio:
      - key: qpos
        start: 2
      - qvel
    level1:
      frameskip: 5
      num_steps: ${eval:'${level1.wm.history_size} + ${level1.wm.rollout_n}'}
output_model_name: model
env: ant
subdir: ${env}/${output_model_name}/seed${seed}
hydra:  # Hydra logs inside the run dir (main_hjepa.py run_dir), not in the launch dir
  run:
    dir: ${oc.env:HJEPA_HOME,${oc.env:HOME}/.stable_worldmodel}/ckpts/${subdir}/hydra
quick_debug: false
num_workers: 6
seed: 42
img_size: 64
patch_size: 4
encoder_scale: tiny
dump_object: true
save_every_n_epochs: 1
resume_every_n_steps: 2000  # full-state resume checkpoint (0 = off), see utils.ResumeCheckpoint
trainer:
  max_epochs: 5
  devices: auto
  accelerator: gpu
  precision: bf16
  gradient_clip_val: 1.0
  num_sanity_val_steps: 1
loader:
  batch_size: 128
  num_workers: ${num_workers}
  drop_last: true
  persistent_workers: true
  prefetch_factor: 2
  pin_memory: true
  shuffle: true
optimizer:
  type: AdamW
  lr: 5.0e-05
  weight_decay: 0.001
wandb:
  enabled: false
  config:
    entity: null
    project: hjepa
    name: null
    id: null
    resume: allow
    log_model: false
planning_eval:
  enabled: true
  config_name: ???
  output_subdir: planning_eval
  run_on_train_end: true
  every_n_epochs: 0  # also run the planning eval every N epochs (0 = end of training only)
final_probing_decoding_eval:
  enabled: true
  config_name: ant
  output_subdir: final_probing_decoding_eval
  overrides:
    level1:
      train_decoder: true
      probes:
        enabled: true
level1:
  lr: 5.0e-05
  wm:
    history_size: 3
    rollout_n: 1
    rollout_loss_weight: 1.0
    embed_dim: 384
    use_proprio: true
    proprio_emb_dim: 128
    action_dim: 8
    proprio_dim: 27
  encoder:
    projector:
      type: identity
    pixel_encoder:
      encoder:
        type: vit
        scale: tiny
      projector:
        type: mlp
        output_dim: 256
    proprio_encoder:
      encoder:
        type: mlp
        hidden_dim: 256
        output_dim: ${level1.wm.proprio_emb_dim}
      projector:
        type: identity
  predictor:
    depth: 4
    heads: 8
    mlp_dim: 1024
    dim_head: 64
    dropout: 0.1
    emb_dropout: 0.0
    hidden_dim: 192
    projector:
      type: mlp
  loss:
    embed:
      sigreg:
        enabled: true
        weight: 0.09

```

# h_jepa/config/train/ant_hjepa_l3.yaml

```yaml
# Visual AntMaze: H-JEPA with 3 levels, trained end-to-end. Every upper level has stride 2.
defaults:
- base/ant
- _self_
output_model_name: ant_hjepa_l3
num_levels: 3
data:
  dataset:
    level2:
      frameskip: ${level2.stride}
      window_size: ${level2.window_size}
      num_steps: ${eval:'${level2.wm.history_size} + ${level2.wm.rollout_n}'}
    level3:
      frameskip: ${level3.stride}
      window_size: ${level3.window_size}
      num_steps: ${eval:'${level3.wm.history_size} + ${level3.wm.rollout_n}'}
planning_eval:
  config_name: ant_l3
final_probing_decoding_eval:
  overrides:
    level1:
      train_decoder: true
      probes:
        enabled: true
    level2:
      train_decoder: true
      probes:
        enabled: true
    level3:
      train_decoder: true
      probes:
        enabled: true
level2:
  lr: 1.0e-05
  stride: 2
  window_size: 1
  wm:
    history_size: 3
    rollout_n: 1
    rollout_loss_weight: 1.0
    embed_dim: 384
    use_proprio: false
  encoder:
    type: latent_mlp
    input_dim: ${level1.wm.embed_dim}
    hidden_dim: 384
    final_ln: false
    output_dim: ${level2.wm.embed_dim}
    projector:
      type: identity
  action_encoder:
    output_dim: 4
    input_dim: ${level1.wm.embed_dim}
    max_chunk: ${eval:'${data.dataset.level2.frameskip} + 1'}
    queue_size: 4000
  action_embed:
    patch_embed: false
    input_dim: ${level2.action_encoder.output_dim}
  predictor:
    depth: 5
    heads: 12
    mlp_dim: 1536
    dim_head: 64
    dropout: 0.1
    emb_dropout: 0.0
    hidden_dim: 224
    projector:
      type: mlp
  loss:
    embed:
      sigreg:
        enabled: true
        weight: 0.09
level3:
  lr: 1.0e-05
  stride: 2
  window_size: 1
  wm:
    history_size: 3
    rollout_n: 1
    rollout_loss_weight: 1.0
    embed_dim: 384
    use_proprio: false
  encoder:
    type: latent_mlp
    input_dim: ${level2.wm.embed_dim}
    hidden_dim: 384
    final_ln: false
    output_dim: ${level3.wm.embed_dim}
    projector:
      type: identity
  action_encoder:
    output_dim: 4
    input_dim: ${level2.wm.embed_dim}
    max_chunk: ${eval:'${data.dataset.level3.frameskip} + 1'}
    queue_size: 4000
  action_embed:
    patch_embed: false
    input_dim: ${level3.action_encoder.output_dim}
  predictor:
    depth: 5
    heads: 12
    mlp_dim: 1536
    dim_head: 64
    dropout: 0.1
    emb_dropout: 0.0
    hidden_dim: 224
    projector:
      type: mlp
  loss:
    embed:
      sigreg:
        enabled: true
        weight: 0.09

```

# h_jepa/config/eval/ant_l3.yaml

```yaml
# Visual AntMaze: 3-level hierarchical planning, shared by H-JEPA and HWM.
# Sample counts: best mean success rate under 100 TFLOPs/episode.
cache_dir: ${oc.env:HJEPA_HOME}
world:
  env_name: swm/OGBAntMaze-v0
  num_envs: ${eval.num_eval}
  max_episode_steps: ???
  history_size: 1
  frame_skip: 1
  ob_type: pixels
  width: 64
  height: 64
  camera_name: back
  maze_type: medium
  dataset_type: stitch
  terminate_at_goal: true
dataset:
  stats: visual_antmaze_medium_stitch_val
  keys_to_cache:
  - action
  - xy
  - qpos
  - qvel
  keys_to_merge:
    proprio:
    - key: qpos
      start: 2
    - qvel
  level1:
    frameskip: 1
    num_steps: 1
seed: 42
policy: null
dump_eval_trajs_path: null
load_eval_trajs_path: assets/eval_trajs/ant/expert_grid_d3_n50.pt
solver:
  _target_: hierarchical_solver.HierarchicalSolver
  solvers:
    level1:
      _target_: stable_worldmodel.solver.GradientSolver
      n_steps: 90
      batch_size: 1
      var_scale: 1.0
      num_samples: 100
      action_noise: 0
      device: cuda
      seed: ${seed}
      optimizer_cls:
        _target_: hydra.utils.get_class
        path: torch.optim.AdamW
      optimizer_kwargs:
        lr: 0.06
    level2:
      _target_: stable_worldmodel.solver.GradientSolver
      n_steps: 90
      batch_size: 1
      var_scale: 1.0
      num_samples: 100
      action_noise: 0
      device: cuda
      seed: ${seed}
      optimizer_cls:
        _target_: hydra.utils.get_class
        path: torch.optim.AdamW
      optimizer_kwargs:
        lr: 0.1
    level3:
      _target_: stable_worldmodel.solver.GradientSolver
      n_steps: 90
      batch_size: 1
      var_scale: 1.0
      num_samples: 400
      action_noise: 0
      device: cuda
      seed: ${seed}
      optimizer_cls:
        _target_: hydra.utils.get_class
        path: torch.optim.AdamW
      optimizer_kwargs:
        lr: 0.1
hierarchical_plan_config:
  receding_horizon: 2
  level1:
    horizon: 4
    pre_decay_horizon: 2
    action_block: 5
    cost_last_n: 2
    action_cost_weight: 0.0
  level2:
    horizon: 2
    pre_decay_horizon: 2
    action_block: 1
    action_dim: 4
    num_subgoals: 1
    cost_last_n: 1
    horizon_one_goal_cost_space: upper
  level3:
    horizon: 5
    action_block: 1
    action_dim: 4
    num_subgoals: 1
    cost_last_n: 1
    horizon_one_goal_cost_space: upper
eval:
  num_eval: 50
  goal_offset_steps: 25
  start_state_mode: xy_neutral
  goal_state_mode: xy_neutral
  eval_budget: 350
  img_size: 64
  dataset_name: visual_antmaze_medium_stitch_val
  callables:
  - method: set_state
    args:
      qpos:
        value: qpos
      qvel:
        value: qvel
  - method: set_navigation_goal
    args:
      goal_xy:
        value: goal_xy
output:
  dir: null

```

# h_jepa/config/train/base/droid.yaml

```yaml
# @package _global_
# DROID: settings shared by the flat and hierarchical models.
data:
  dataset:
    type: droid
    name: droid_paths_minus16_256p.csv
    val_name: droid_val_indist_256p.csv
    camera_views:
    - left_mp4_path
    - right_mp4_path
    fps: 5
    norm_stats: full_fps5
    keys_to_load:
    - pixels
    - action
    - proprio
    level1:
      frameskip: 1
      num_steps: ${eval:'${level1.wm.history_size} + ${level1.wm.rollout_n}'}
quick_debug: false
local_cache_dir: true
output_model_name: model
env: droid
subdir: ${env}/${output_model_name}/seed${seed}
hydra:  # Hydra logs inside the run dir (main_hjepa.py run_dir), not in the launch dir
  run:
    dir: ${oc.env:HJEPA_HOME,${oc.env:HOME}/.stable_worldmodel}/ckpts/${subdir}/hydra
num_workers: 6
train_split: null
seed: 42
img_size: 256
patch_size: 16
encoder_scale: small
dump_object: true
save_every_n_epochs: 2
resume_every_n_steps: 100  # full-state resume checkpoint (0 = off), see utils.ResumeCheckpoint
trainer:
  max_epochs: 100
  devices: 2
  accelerator: gpu
  precision: bf16
  gradient_clip_val: 1.0
  num_sanity_val_steps: 1
  limit_train_batches: 292
loader:
  batch_size: 128
  num_workers: ${num_workers}
  drop_last: true
  persistent_workers: true
  prefetch_factor: 2
  pin_memory: true
  shuffle: true
optimizer:
  type: AdamW
  lr: 5.0e-04
  weight_decay: 1.0e-04
  warmup_ratio: 0.1
wandb:
  enabled: false
  config:
    entity: null
    project: hjepa
    name: null
    id: null
    resume: allow
    log_model: false
planning_eval:
  enabled: false
  config_name: null
  output_subdir: planning_eval
  run_on_train_end: false
  every_n_epochs: 0
final_probing_decoding_eval:
  enabled: false
level1:
  lr: 5.0e-04
  idm_coeff: 100
  idm:
    hidden_dim: 256
  wm:
    history_size: 7
    rollout_n: 1
    embed_dim: 384
    use_proprio: false
    action_dim: 7
  encoder:
    type: vit
    scale: ${encoder_scale}
    patch_size: ${patch_size}
    image_size: ${img_size}
    use_mask_token: false
    projector:
      type: layernorm
  predictor:
    type: causal_transformer
    action_dim: ${level1.wm.action_dim}
    predictor_dim: 384
    depth: 12
    heads: 6
    dim_head: 64
    mlp_ratio: 4.0
    max_seq_len: 16
    dropout: 0.1
    emb_dropout: 0.0
    adaln_init_scale: 0.02
  action_embed:
    type: identity
  loss:
    embed:
      sigreg:
        enabled: true
        weight: 0.08

```

# h_jepa/config/train/droid_hjepa_l2.yaml

```yaml
# DROID: 2-level H-JEPA trained end to end (level 2: latent MLP encoder at stride 3).
defaults:
- base/droid
- _self_
output_model_name: droid_hjepa_l2
num_levels: 2
save_every_n_epochs: 10
grad_clip_per_level: true
data:
  dataset:
    level2:
      frameskip: ${level2.stride}
      window_size: ${level2.window_size}
      num_steps: ${eval:'${level2.wm.history_size} + ${level2.wm.rollout_n}'}
trainer:
  max_epochs: 100
level2:
  lr: 5.0e-04
  stride: 3
  window_size: 1
  idm_coeff: 50
  idm:
    hidden_dim: 256
  action_sigreg_coeff: 0.005
  wm:
    history_size: 2
    rollout_n: 1
    embed_dim: 384
    use_proprio: false
  encoder:
    type: latent_mlp
    input_dim: 384
    trunc_normal_init: true
    hidden_dim: 768
    output_dim: 384
    final_ln: false
    projector:
      type: identity
  action_encoder:
    type: mlp
    input_dim: ${level1.predictor.action_dim}
    hidden_dims:
    - 64
    output_dim: 8
    final_ln: true
    trunc_normal_init: true
    queue_size: 4000
  action_embed:
    type: identity
  predictor:
    type: causal_transformer
    action_dim: ${level2.action_encoder.output_dim}
    predictor_dim: 384
    depth: 12
    heads: 6
    dim_head: 64
    mlp_ratio: 4.0
    max_seq_len: 16
    dropout: 0.1
    emb_dropout: 0.0
    adaln_init_scale: 0.02
  loss:
    embed:
      sigreg:
        enabled: true
        weight: 0.16

```

# pyproject.toml

```toml
[project]
name = "h-jepa"
version = "1.0.0"
description = "Hierarchical JEPA world models"
readme="README.md"
license="MIT"
authors = [
  {name = "Wancong Zhang"},
  {name = "Basile Terver"},
  {name = "Mike Rabbat"},
  {name = "Yann LeCun"},
  {name = "Randall Balestriero"},
]
urls = {Homepage = "https://github.com/kevinghst/H-JEPA"}
classifiers = [
  "Intended Audience :: Science/Research",
  "License :: OSI Approved :: MIT License",
  "Programming Language :: Python :: 3",
]
requires-python = ">=3.11,<3.12"
dependencies = [
  "torch==2.7.1",
  "torchvision==0.22.1",
  "torchaudio==2.7.1",
  "numpy",
  "loguru",
  "tabulate",
  "gymnasium==1.2.3",
  "einops",
  "h5py",
  "scipy",
  "hdf5plugin",
  "tqdm",
  "gdown",
  "typer",
  "rich",
]

[project.optional-dependencies]
train = [
    "transformers>=4.50.0",
    "stable-pretraining==0.1.7",  # training only; main_hjepa.ResumableManager needs 0.1.7
    "datasets>=4",  # stable-pretraining leaves it unpinned and pip otherwise backtracks to 1.x
    "lightning>=2.5",
    "torchmetrics",
    "hydra-core",
    "hydra-submitit-launcher",
    "wandb",
    "decord",
    "scikit-learn",
    "matplotlib",
]

env = [
    "mujoco==3.14.0",  # mujoco versions change episode outcomes (Cube, AntMaze)
    "dm_control==1.0.47",
    "pygame",
    "pymunk",
    "shapely",
    "ogbench==1.2.1",
    "minigrid",
    "opencv-python",
    "stable_baselines3",
    "imageio",
    "jax",  # OGBench AntMaze expert policy (data collection, eval-task generation)
    "flax",
]

[dependency-groups]
dev = [
  "ipdb",
  "pytest",
  "pytest-cov>=7.0.0",
  "ruff",
  "twine",
  "mkdocs-shadcn",
  "pymdown-extensions",
  "pillow",
  "decord",
  "imageio[ffmpeg]",
  "mkdocstrings[python]",
]

[build-system]
requires = ["uv_build>=0.9.21,<0.10.0"]
build-backend = "uv_build"

[tool.uv.build-backend]
module-root = "."
module-name = "stable_worldmodel"
source-exclude = [
    "**/.mypy_cache/**",
    "**/__pycache__/**",
    "**/*.pyc",
]

[tool.ruff]
line-length = 79
indent-width = 4

[tool.ruff.format]
indent-style = "space"
quote-style = "single"

[tool.coverage.run]
omit = ["stable_worldmodel/envs/*"]
```

# LICENSE

```
MIT License

Copyright (c) 2026 Wancong Zhang, Basile Terver, Mike Rabbat, Yann LeCun, Randall Balestriero

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

```

# 파일 트리

```
.gitignore
LICENSE
README.md
assets/depth_planning_sr.png
assets/teaser-layout-comparison.jpg
assets/teaser-vertical-poster.jpg
assets/teaser-vertical.gif
assets/teaser-vertical.mp4
assets/teaser-video-poster.jpg
assets/teaser-video.mp4
assets/teaser.gif
assets/teaser.png
docs/RESULTS.md
docs/SLURM.md
h_jepa/ARCHITECTURE.md
h_jepa/config/eval/ant_flat.yaml
h_jepa/config/eval/ant_l2.yaml
h_jepa/config/eval/ant_l2_project.yaml
h_jepa/config/eval/ant_l3.yaml
h_jepa/config/eval/ant_l3_project.yaml
h_jepa/config/eval/ant_l4.yaml
h_jepa/config/eval/ant_l4_project.yaml
h_jepa/config/eval/cube_flat.yaml
h_jepa/config/eval/cube_l2.yaml
h_jepa/config/eval/cube_l2_project.yaml
h_jepa/config/eval/cube_l3.yaml
h_jepa/config/eval/cube_l3_project.yaml
h_jepa/config/eval/cube_l4.yaml
h_jepa/config/eval/cube_l4_project.yaml
h_jepa/config/eval/droid_flat.yaml
h_jepa/config/eval/droid_l2.yaml
h_jepa/config/eval/fourroom_flat.yaml
h_jepa/config/eval/fourroom_l2.yaml
h_jepa/config/eval/fourroom_l2_project.yaml
h_jepa/config/eval/fourroom_l3.yaml
h_jepa/config/eval/fourroom_l3_project.yaml
h_jepa/config/eval/fourroom_l4.yaml
h_jepa/config/eval/fourroom_l4_project.yaml
h_jepa/config/eval/pusht_flat.yaml
h_jepa/config/eval/pusht_l2.yaml
h_jepa/config/eval/pusht_l2_project.yaml
h_jepa/config/eval/pusht_l3.yaml
h_jepa/config/eval/pusht_l3_project.yaml
h_jepa/config/eval/pusht_l4.yaml
h_jepa/config/eval/pusht_l4_project.yaml
h_jepa/config/probing/ant.yaml
h_jepa/config/probing/cube.yaml
h_jepa/config/probing/fourroom.yaml
h_jepa/config/probing/pusht.yaml
h_jepa/config/train/ant_hjepa_l2.yaml
h_jepa/config/train/ant_hjepa_l3.yaml
h_jepa/config/train/ant_hjepa_l4.yaml
h_jepa/config/train/ant_hwm_l2.yaml
h_jepa/config/train/ant_hwm_l3.yaml
h_jepa/config/train/ant_hwm_l4.yaml
h_jepa/config/train/ant_lewm.yaml
h_jepa/config/train/base/ant.yaml
h_jepa/config/train/base/cube.yaml
h_jepa/config/train/base/droid.yaml
h_jepa/config/train/base/fourroom.yaml
h_jepa/config/train/base/pusht.yaml
h_jepa/config/train/cube_hjepa_l2.yaml
h_jepa/config/train/cube_hjepa_l3.yaml
h_jepa/config/train/cube_hjepa_l4.yaml
h_jepa/config/train/cube_hwm_l2.yaml
h_jepa/config/train/cube_hwm_l3.yaml
h_jepa/config/train/cube_hwm_l4.yaml
h_jepa/config/train/cube_lewm.yaml
h_jepa/config/train/droid_hjepa_l2.yaml
h_jepa/config/train/droid_hwm_l2.yaml
h_jepa/config/train/droid_lewm.yaml
h_jepa/config/train/fourroom_hjepa_l2.yaml
h_jepa/config/train/fourroom_hjepa_l3.yaml
h_jepa/config/train/fourroom_hjepa_l4.yaml
h_jepa/config/train/fourroom_hwm_l2.yaml
h_jepa/config/train/fourroom_hwm_l3.yaml
h_jepa/config/train/fourroom_hwm_l4.yaml
h_jepa/config/train/fourroom_lewm.yaml
h_jepa/config/train/pusht_hjepa_l2.yaml
h_jepa/config/train/pusht_hjepa_l3.yaml
h_jepa/config/train/pusht_hjepa_l4.yaml
h_jepa/config/train/pusht_hwm_l2.yaml
h_jepa/config/train/pusht_hwm_l3.yaml
h_jepa/config/train/pusht_hwm_l4.yaml
h_jepa/config/train/pusht_lewm.yaml
h_jepa/data.py
h_jepa/droid_assets/droid_clips_waypoint_curated16v2_5fps_gw36.json
h_jepa/droid_assets/norm_stats_droid.json
h_jepa/droid_data.py
h_jepa/droid_eval.py
h_jepa/eval.py
h_jepa/eval_config_utils.py
h_jepa/final_probing_decoding_eval.py
h_jepa/hierarchical_solver.py
h_jepa/hjepa_utils.py
h_jepa/loss.py
h_jepa/main_hjepa.py
h_jepa/main_probing_decoding_eval.py
h_jepa/models/__init__.py
h_jepa/models/encoders/__init__.py
h_jepa/models/encoders/build_encoder.py
h_jepa/models/encoders/encoders.py
h_jepa/models/encoders/hf_vit.py
h_jepa/models/encoders/seq_encoder.py
h_jepa/models/hjepa.py
h_jepa/models/jepa.py
h_jepa/models/module.py
h_jepa/models/predictors/__init__.py
h_jepa/models/predictors/predictors.py
h_jepa/models/probers.py
h_jepa/planning_eval.py
h_jepa/scripts/eval_cost_ladder.sh
h_jepa/scripts/eval_depth.sh
h_jepa/scripts/eval_droid.sh
h_jepa/scripts/generate_dataset_eval_trajs.py
h_jepa/scripts/generate_fourroom_eval_tasks.py
h_jepa/scripts/generate_maze_expert_grid_eval_tasks.py
h_jepa/scripts/slurm/default.yaml
h_jepa/scripts/slurm/launch.py
h_jepa/scripts/train_all.sh
h_jepa/traj_metrics.py
h_jepa/utils.py
pyproject.toml
scripts/data/add_pusht_block_ori.py
scripts/data/collect_antmaze.py
scripts/data/collect_datasets.sh
scripts/data/collect_fourroom_distractors.py
scripts/data/config/fourroom_tp35_d0to5.yaml
scripts/data/config/fourroom_tp35_d1.yaml
scripts/data/config/fourroom_tp35_d1_probing.yaml
scripts/data/config/fourroom_tp35_d1_probing_val.yaml
scripts/data/config/fourroom_tp35_d1_val.yaml
scripts/data/config/visual_antmaze_medium_explore_stitch_train.yaml
scripts/data/config/visual_antmaze_medium_probing_eval.yaml
scripts/data/config/visual_antmaze_medium_probing_train.yaml
scripts/data/config/visual_antmaze_medium_stitch_val.yaml
scripts/data/convert_pusht_noise_to_h5.py
scripts/data/fourroom_distractor_distance.py
scripts/data/split_cube.py
stable_worldmodel/__init__.py
stable_worldmodel/data/__init__.py
stable_worldmodel/data/dataset.py
stable_worldmodel/data/utils.py
stable_worldmodel/envs/__init__.py
stable_worldmodel/envs/four_room/__init__.py
stable_worldmodel/envs/four_room/env.py
stable_worldmodel/envs/four_room/expert_policy.py
stable_worldmodel/envs/four_room/explore_policy.py
stable_worldmodel/envs/ogbench/__init__.py
stable_worldmodel/envs/ogbench/antmaze_env.py
stable_worldmodel/envs/ogbench/antmaze_policy.py
stable_worldmodel/envs/ogbench/cube_env.py
stable_worldmodel/envs/ogbench/expert_policy.py
stable_worldmodel/envs/ogbench/humanoidmaze_env.py
stable_worldmodel/envs/ogbench/locomaze_env.py
stable_worldmodel/envs/ogbench/pointmaze_env.py
stable_worldmodel/envs/ogbench/sac_expert.py
stable_worldmodel/envs/pusht/__init__.py
stable_worldmodel/envs/pusht/env.py
stable_worldmodel/envs/pusht/expert_policy.py
stable_worldmodel/envs/utils.py
stable_worldmodel/policy.py
stable_worldmodel/solver/__init__.py
stable_worldmodel/solver/gd.py
stable_worldmodel/solver/solver.py
stable_worldmodel/spaces.py
stable_worldmodel/utils.py
stable_worldmodel/world.py
stable_worldmodel/wrapper.py
```
