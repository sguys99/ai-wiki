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
fetched_at: "2026-10-02"
tags: []
---

> 수집 메모: 사용자의 명시적 지시로 GitHub raw URL에서 가져왔다 (CLAUDE.md rule #1 자료 수집 예외). 기본 브랜치 main, 저장소 생성 2026-01-31, 마지막 push 2026-05-18. GitHub API의 license 필드는 NOASSERTION이고 README 배지와 LICENSE 파일은 MIT(StarVLA Team 저작권 표기)다. 아래는 최상위 README 전문, 하위 문서와 학습 스크립트, 설정 파일, LICENSE, 파일 트리를 원문 그대로 이어 붙인 것이다.

# README.md

<h1 align="center">[ICML 2026] LaRA-VLA</h1>

<p align="center">
  <strong>Latent Reasoning VLA: Latent Thinking and Prediction for Vision-Language-Action Models</strong>
</p>

<p align="center">
  <a href="https://baishuanghao.github.io/">Shuanghao Bai*</a>, <a href="https://scholar.google.com/citations?hl=vi&user=Th6JWCEAAAAJ">Jing Lyu*</a>, <a href="https://ellezwq.github.io/">Wanqi Zhou</a>, <a href="https://scholar.google.com/citations?user=U8f81zQAAAAJ&hl=zh-CN">Zhe Li</a>, <a href="">Dakai Wang</a>, <a href="https://scholar.google.com/citations?user=TlfrTOkAAAAJ&hl=en">Lei Xing</a>, <a href="https://people.ucas.ac.cn/~zhaoxiaoguang?language=en">Xiaoguang Zhao</a>, <a href="https://scholar.google.com/citations?hl=zh-CN&user=2xR6P5AAAAAJ">Pengwei Wang</a>, <a href="https://www.wangzhongyuan.com/">Zhongyuan Wang</a>, <a href="https://chicheng123.github.io/">Cheng Chi</a>, <a href="https://gr.xjtu.edu.cn/web/chenbd/home">Badong Chen</a>, <a href="https://pku-hmi-lab.github.io/HMI-Web/leader.html">Shanghang Zhang</a>
</p>



<p align="center">
  <a href="https://loveju1y.github.io/Latent-Reasoning-VLA/">
    <img src="https://img.shields.io/badge/Homepage-LaRA--VLA-2d6cdf?style=for-the-badge" alt="Homepage">
  </a>
  <a href="https://arxiv.org/abs/2602.01166">
    <img src="https://img.shields.io/badge/arXiv-2602.01166-b31b1b?style=for-the-badge" alt="arXiv">
  </a>
  <a href="https://github.com/LoveJu1y/LaRA-VLA">
    <img src="https://img.shields.io/badge/GitHub-LaRA--VLA-181717?style=for-the-badge&logo=github" alt="GitHub">
  </a>
  <a href="https://huggingface.co/datasets/lovejuly">
    <img src="https://img.shields.io/badge/Hugging%20Face-Datasets-ffbf00?style=for-the-badge" alt="Hugging Face Datasets">
  </a>
  <a href="https://huggingface.co/lovejuly">
    <img src="https://img.shields.io/badge/Hugging%20Face-Models-ffbf00?style=for-the-badge" alt="Hugging Face Models">
  </a>
  <a href="./LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-2ea44f?style=for-the-badge" alt="License">
  </a>
</p>

<p align="center">
  <img src="assets/2.png" alt="LaRA-VLA overview" width="92%">
</p>

<p align="center">
  <sub>
    LaRA-VLA performs iterative latent reasoning by feeding hidden states back into reasoning slots
    before action prediction, rather than relying on long explicit chain-of-thought generation.
  </sub>
</p>

## NEWS

- 🎉 LaRA-VLA has been accepted to **[ICML 2026](https://icml.cc/Conferences/2026)**.
- ✅ Training code is released.
- ✅ Evaluation code is released.
- ✅ Pretrained model weights are released.
- ✅ Training datasets are released.

## Installation

```bash
git clone https://github.com/LoveJu1y/LaRA-VLA
cd LaRA-VLA

conda create -n lara-vla python=3.10 -y
conda activate lara-vla

pip install -r requirements.txt
pip install -e .
```


## Quick Start

### 1) Basic check

```bash
python -c "from laravla.training.train import main; print('OK')"
```

### 2) Multi-stage training for VLM 

Before launching training, set the dataset roots and model cache path:

```bash
export BRIDGE_LEROBOT_ROOT=/path/to/bridge_datasets_parent
export LIBERO_LEROBOT_ROOT=/path/to/libero_lerobot
export HF_HOME=/path/to/qwen_cache
```

Dataset repos:

- Bridge: https://huggingface.co/datasets/lovejuly/bridge_orig_lerobot
- LIBERO: https://huggingface.co/datasets/lovejuly/libero_lerobot_all

Model repos:

- Bridge: https://huggingface.co/lovejuly/LaRA-VLA-bridge
- LIBERO: https://huggingface.co/lovejuly/LaRA-VLA-libero

Bridge training expects:

```text
${BRIDGE_LEROBOT_ROOT}/bridge_orig_lerobot/
  annotations/
  meta/
  data/
  videos/
```

The current public Bridge dataset release contains the core annotations and metadata, but does not include the raw `videos/` directory. Bridge training will not run unless `videos/` is available locally under the structure above.

LIBERO training expects:

```text
${LIBERO_LEROBOT_ROOT}/
  libero_goal_no_noops_1.0.0_lerobot/
  libero_object_no_noops_1.0.0_lerobot/
  libero_spatial_no_noops_1.0.0_lerobot/
  libero_10_no_noops_1.0.0_lerobot/
```

Bridge:

```bash
bash scripts/run_bridge_multistage.sh
```

LIBERO:

```bash
bash scripts/run_libero_multistage.sh
```

### 3) Single-stage training for VLA

Bridge:

```bash
bash scripts/run_laravla_bridge.sh
```

LIBERO:

```bash
bash scripts/run_laravla_libero.sh
```


## Evaluation

### LIBERO

The LIBERO results above correspond to the evaluation workflow documented in
[examples/LIBERO/README.md](examples/LIBERO/README.md).

#### Results

| CoT Type | Method | Spatial | Goal | Object | Long | Avg |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| No CoT | OpenVLA (Kim et al., 2025b) | 84.7 | 88.4 | 79.2 | 53.7 | 76.5 |
|  | π₀ (Black et al., 2024) | 96.8 | 98.8 | 95.8 | 85.2 | 94.2 |
|  | OpenVLA-OFT (Kim et al., 2025a) | 97.6 | 98.4 | 97.9 | 94.5 | 97.1 |
| Textual CoT | ThinkAct (Huang et al., 2025) | 88.3 | 91.4 | 87.1 | 70.9 | 84.4 |
|  | MolmoAct (Lee et al., 2025) | 87.0 | 95.4 | 87.6 | 77.2 | 86.6 |
|  | π₀.₅ (Intelligence et al., 2025) | 98.8 | 98.2 | 98.0 | 92.4 | 96.8 |
|  | DeepThinkVLA (Yin et al., 2025) | 99.0 | 96.6 | 96.4 | 96.2 | 97.0 |
| Visual CoT | CoT-VLA (Zhao et al., 2025) | 87.5 | 91.6 | 87.6 | 69.0 | 81.1 |
|  | DreamVLA (Zhang et al., 2025b) | 97.5 | 94.0 | 89.5 | 89.5 | 92.6 |
|  | F1 (Lv et al., 2025) | 98.2 | 97.8 | 95.4 | 91.3 | 95.7 |
|  | UD-VLA (Chen et al., 2025b) | 94.1 | 95.7 | 91.2 | 89.6 | 92.7 |
| Latent CoT | Fast-ThinkAct (Huang et al., 2026) | 92.0 | 97.2 | 90.2 | 79.4 | 89.7 |
|  | **LaRA-VLA (Ours)** | 96.4 | 98.6 | 99.8 | 96.6 | **97.9** |
### SimplerEnv

The Bridge real-world results above are evaluated through the SimplerEnv-based
pipeline documented in
[examples/SimplerEnv/README.md](examples/SimplerEnv/README.md).

#### Results

| CoT Type | Method | Put Spoon | Put Carrot | Stack Block | Put Eggplant | Avg |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| No CoT | OpenVLA (Kim et al., 2025b) | 0.0 | 0.0 | 0.0 | 4.1 | 1.0 |
|  | Octo (Ghosh et al., 2024) | 47.2 | 9.7 | 4.2 | 56.9 | 29.5 |
|  | OpenVLA-OFT (Kim et al., 2025a) | 12.5 | 4.2 | 8.3 | 37.5 | 39.6 |
|  | π₀ (Black et al., 2024) | 29.1 | 0.0 | 16.7 | 62.5 | 40.1 |
|  | CogACT (Li et al., 2024) | 71.7 | 50.8 | 15.0 | 67.5 | 51.3 |
| Textual CoT | ThinkAct (Huang et al., 2025) | 58.3 | 37.5 | 8.7 | 70.8 | 43.8 |
| Visual CoT | F1 (Lv et al., 2025) | 50.0 | 70.8 | 50.0 | 66.7 | 59.4 |
|  | UD-VLA (Chen et al., 2025b) | 58.3 | 62.5 | 54.1 | 75.0 | 62.5 |
| Latent CoT | **LaRA-VLA (Ours)** | 95.8 | 62.5 | 25.0 | 91.7 | **68.8** |

## Acknowledgments

Our code builds on the open-source [StarVLA](https://github.com/starVLA/starVLA) codebase, and incorporates ideas and components from [Coconut](https://github.com/facebookresearch/coconut) and [ECOT (Embodied Chain-of-Thought)](https://github.com/MichalZawalski/embodied-CoT).

## Citation

```bibtex
@article{bai2026latentreasoningvla,
  title={Latent Reasoning VLA: Latent Thinking and Prediction for Vision-Language-Action Models},
  author={Bai, Shuanghao and Lyu, Jing and Zhou, Wanqi and Li, Zhe and Wang, Dakai and Xing, Lei and Zhao, Xiaoguang and Wang, Pengwei and Wang, Zhongyuan and Chi, Cheng and Chen, Badong and Zhang, Shanghang},
  journal={arXiv preprint arXiv:2602.01166},
  year={2026}
}
```

## License

Released under the MIT License. See `LICENSE`.


---

# examples/LIBERO/README.md

````text
## LIBERO

This directory contains the recommended LIBERO evaluation entrypoints.

Main files:

- `eval_libero.py`: evaluate one LIBERO suite against one policy server
- `eval_libero_all.sh`: recommended parallel multi-suite evaluation
- `run_all_ckpts_libero_all.sh`: batch evaluation for many checkpoints

## Prerequisites

You usually need:

- one trained checkpoint
- one LaRA-VLA Python environment (the code package namespace is `laravla`)
- one LIBERO Python environment
- `LIBERO_HOME`

To set up the environment, please first follow the official [LIBERO repository](https://github.com/Lifelong-Robot-Learning/LIBERO) to install the base LIBERO environment.

Common issue: LIBERO defaults to Python 3.8, but the syntax updates between 3.8 and 3.10 are substantial. We verified that using Python 3.10 avoids many issues.

Afterwards, inside the LIBERO environment, install the following dependencies:
```
pip install tyro matplotlib mediapy websockets msgpack
pip install numpy==1.24.4
```
Useful checks:

```bash
python -c "from laravla.training.train import main; print('OK')"
python -c "from libero.libero import benchmark; print('OK')"
```

## Recommended: Parallel Evaluation

```bash
LARAVLA_PYTHON=/path/to/laravla/python \
LIBERO_PYTHON=/path/to/libero/python \
LIBERO_HOME=/path/to/LIBERO \
CUDA_VISIBLE_DEVICES=0,1,2,3 \
TASK_SUITES=libero_goal,libero_spatial,libero_object,libero_10 \
bash examples/LIBERO/eval_libero_all.sh /abs/path/to/checkpoint.pt
```


Outputs are written under:

```text
<checkpoint_dir>/eval_libero_implicit_parallel/<checkpoint_name>/
```

## Batch Evaluation for Many Checkpoints

```bash
LARAVLA_PYTHON=/path/to/laravla/python \
LIBERO_PYTHON=/path/to/libero/python \
LIBERO_HOME=/path/to/LIBERO \
bash examples/LIBERO/run_all_ckpts_libero_all.sh /abs/path/to/checkpoints
```

````


---

# examples/SimplerEnv/README.md

````text
## SimplerEnv

This directory contains the recommended SimplerEnv evaluation entrypoints.

Main files:

- `bridge_eval.sh`: recommended parallel evaluation for one checkpoint
- `run_all_ckpts_bridge.sh`: batch evaluation for many checkpoints
- `start_simpler_env.py`: simulator-side evaluation entrypoint
- `model2simpler_interface.py`: SimplerEnv-side policy adapter
- `test_your_simplerEnv.py`: quick environment check

## Prerequisites

You usually need:

- one trained checkpoint
- one LaRA-VLA Python environment (the code package namespace is `laravla`)
- one SimplerEnv Python environment
- `SimplerEnv_PATH`

To set up the environment, please first follow the official [SimplerEnv repository](https://github.com/simpler-env/SimplerEnv) to install the base simpler_env environment.

Afterwards, inside the simpler_env environment, install the following dependencies:

conda activate simpler_env
pip install tyro matplotlib mediapy websockets msgpack
pip install numpy==1.24.4

Useful checks:

```bash
python examples/SimplerEnv/test_your_simplerEnv.py
```

If this script succeeds, your SimplerEnv setup is likely usable.

## Recommended: Parallel Evaluation

```bash
laravla_python=/path/to/laravla/python \
sim_python=/path/to/simpler_env/python \
SimplerEnv_PATH=/path/to/SimplerEnv \
CUDA_VISIBLE_DEVICES=0,1,2,3 \
bash examples/SimplerEnv/bridge_eval.sh /abs/path/to/checkpoint.pt
```

The script launches policy servers and SimplerEnv tasks in parallel, then writes
logs under the checkpoint directory unless `LOG_DIR` is overridden.

## Batch Evaluation for Many Checkpoints

```bash
laravla_python=/path/to/laravla/python \
sim_python=/path/to/simpler_env/python \
SimplerEnv_PATH=/path/to/SimplerEnv \
bash examples/SimplerEnv/run_all_ckpts_bridge.sh /abs/path/to/checkpoints
```

````


---

# deployment/model_server/README.md

````text

# start policy server


```bash

your_ckpt=./results/Checkpoints/1003_qwenfast/checkpoints/steps_50000_pytorch_model.pt

python deployment/model_server/server_policy.py \
    --ckpt_path ${your_ckpt} \
    --port 10093 \
    --use_bf16
```


# connect to policy server for debug

```bash
python deployment/model_server/debug_server_policy.py

# plus server_policy.py into your vla controler by ref to debug_server_policy.py
```
````


---

# scripts/run_libero_multistage.sh

````text
#!/usr/bin/env bash
# Libero-all :: 四阶段课程训练（均为 reasoning_only）
# - Stage 1：无 pretrained_checkpoint
# - Stage 2–4：加载上一阶段 checkpoints/steps_<CKPT_STEP[上一阶段]>_pytorch_model.pt
# train：training_stage!=full 时不覆盖 bridge_reasoning.stage，每阶段由下方 BRIDGE_STAGE 指定。
# 仓库根目录: bash scripts/run_libero_multistage.sh
set -euo pipefail
export TOKENIZERS_PARALLELISM=false

# ===================== 按需改这里 =====================
CONFIG_YAML=laravla/config/training/libero.yaml
RUN_ROOT=results/LiberoVLM
RUN_ID_PREFIX=libero_vlm
NUM_GPUS=8
MASTER_PORT=29513
WANDB_PROJECT=libero_vlm
WANDB_ENTITY=

# 非空则只加载部分模块；空 = 整模加载
RELOAD_MODULES=
IMG_NEXT_USE_TEACHER=false

STEPS_CACHE_PATH="${RUN_ROOT}/steps_cache/libero_vlm"

declare -A BRIDGE_STAGE=( [1]=1 [2]=2 [3]=3 [4]=4 )

declare -A VLM_LOSS_WEIGHT=( [1]=1.0 [2]=1.0 [3]=1.0 [4]=1.0 )
declare -A IMG_NEXT_LOSS_WEIGHT=( [1]=0.1 [2]=0.1 [3]=0.2 [4]=0.2 )

declare -A PER_DEVICE_BATCH=( [1]=12 [2]=12 [3]=12 [4]=16 )
declare -A MAX_STEPS=( [1]=5000 [2]=2000 [3]=2000 [4]=2000 )

# 须满足 MAX_STEPS[s] % SAVE_INTERVAL[s] == 0（与 train 存盘条件一致）
declare -A SAVE_INTERVAL=( [1]=5000 [2]=2000 [3]=2000 [4]=2000 )

# 第 s 阶段结束时文件名 steps_<CKPT_STEP[s]>_pytorch_model.pt 中的步数
declare -A CKPT_STEP=( [1]=5000 [2]=2000 [3]=2000 [4]=2000 )

START_STAGE="${START_STAGE:-1}"
# ====================================================

mkdir -p "${STEPS_CACHE_PATH}"

run_one_stage() {
  local stage="$1"
  local load_ckpt="$2"

  local run_id="${RUN_ID_PREFIX}_stage_${stage}"
  local out="${RUN_ROOT}/${run_id}"

  mkdir -p "${out}"
  cp "$0" "${out}/run_command.sh"

  local args=(
    --config_yaml "${CONFIG_YAML}"
    --run_root_dir "${RUN_ROOT}"
    --run_id "${run_id}"
    --wandb_project "${WANDB_PROJECT}"
    --framework.training_stage reasoning_only
    --datasets.vla_data.bridge_reasoning.stage "${BRIDGE_STAGE[$stage]}"
    --trainer.max_train_steps "${MAX_STEPS[$stage]}"
    --trainer.save_interval "${SAVE_INTERVAL[$stage]}"
    --datasets.vla_data.per_device_batch_size "${PER_DEVICE_BATCH[$stage]}"
    --framework.latent_reasoning.vlm_loss_weight "${VLM_LOSS_WEIGHT[$stage]}"
    --framework.img_next.loss_weight "${IMG_NEXT_LOSS_WEIGHT[$stage]}"
    --framework.img_next.use_teacher "${IMG_NEXT_USE_TEACHER}"
    --datasets.vla_data.bridge_annotations.steps_cache_path "${STEPS_CACHE_PATH}"
    --datasets.vla_data.bridge_annotations.write_steps_cache true
  )
  [[ -n "${WANDB_ENTITY}" ]] && args+=( --wandb_entity "${WANDB_ENTITY}" )

  if [[ -n "${load_ckpt}" ]]; then
    args+=( --trainer.pretrained_checkpoint "${load_ckpt}" )
    [[ -n "${RELOAD_MODULES}" ]] && args+=( --trainer.reload_modules "${RELOAD_MODULES}" )
  fi

  torchrun \
    --nproc_per_node="${NUM_GPUS}" \
    --master_port="${MASTER_PORT}" \
    laravla/training/train.py \
    "${args[@]}" \
    "$@"
}

for stage in 1 2 3 4; do
  (( stage < START_STAGE )) && continue

  load_ckpt=""
  if (( stage > 1 )); then
    prev=$((stage - 1))
    load_ckpt="${RUN_ROOT}/${RUN_ID_PREFIX}_stage_${prev}/checkpoints/steps_${CKPT_STEP[$prev]}_pytorch_model.pt"
    if [[ ! -f "${load_ckpt}" ]]; then
      echo "缺少上一阶段权重: ${load_ckpt}" >&2
      exit 1
    fi
  fi

  run_one_stage "${stage}" "${load_ckpt}"
done

````


---

# scripts/run_laravla_libero.sh

````text
#!/usr/bin/env bash
# Libero-all :: train.py — repository root: bash scripts/run_laravla_libero.sh
set -euo pipefail
export TOKENIZERS_PARALLELISM=false


PRETRAINED_CKPT=
RELOAD_MODULES=qwen_vl_interface

# 若改 run_root_dir / run_id，请同步改下面 mkdir 路径
mkdir -p results/Libero_VLA/libero_all_vla

args=(
  --config_yaml laravla/config/training/libero.yaml
  --run_root_dir results/Libero_VLA
  --run_id libero_all_vla
  --wandb_project libero_vla
  --framework.training_stage full
  --datasets.vla_data.bridge_reasoning.stage 4
  --trainer.max_train_steps 60000
  --datasets.vla_data.per_device_batch_size 8
  --framework.img_next.use_teacher false
)

if [[ -n "${PRETRAINED_CKPT}" ]]; then
  args+=( --trainer.pretrained_checkpoint "${PRETRAINED_CKPT}" )
  [[ -n "${RELOAD_MODULES}" ]] && args+=( --trainer.reload_modules "${RELOAD_MODULES}" )
fi

exec torchrun \
  --nproc_per_node=1 \
  --master_port=29513 \
  laravla/training/train.py \
  "${args[@]}" \
  "$@"

````


---

# scripts/run_bridge_multistage.sh

````text
#!/usr/bin/env bash
# Bridge-LeRobot :: four-stage curriculum training
# - Stage 1: no pretrained checkpoint by default
# - Stage 2-4: load the previous stage checkpoint
# - train.py: when training_stage != full, bridge_reasoning.stage is not overridden
# Repository root: bash scripts/run_bridge_multistage.sh
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
cd "${REPO_ROOT}"

export TOKENIZERS_PARALLELISM="${TOKENIZERS_PARALLELISM:-false}"
export HF_HOME="${HF_HOME:-${REPO_ROOT}/qwen_cache}"

# ===================== edit as needed =====================
CONFIG_YAML="${CONFIG_YAML:-laravla/config/training/bridge.yaml}"
RUN_ROOT="${RUN_ROOT:-results/BridgeLeRobot_VLM}"
RUN_ID_PREFIX="${RUN_ID_PREFIX:-bridge_multistage}"
NUM_GPUS="${NUM_GPUS:-8}"
MASTER_PORT="${MASTER_PORT:-29512}"
WANDB_PROJECT="${WANDB_PROJECT:-bridge_multistage_vlm}"
WANDB_ENTITY="${WANDB_ENTITY:-}"

# Non-empty => only reload selected modules; empty => load the full model.
RELOAD_MODULES="${RELOAD_MODULES:-}"
INITIAL_PRETRAINED_CKPT="${INITIAL_PRETRAINED_CKPT:-}"
CKPT_PRE="${CKPT_PRE:-}"
STEPS_CACHE_PATH="${STEPS_CACHE_PATH:-}"

# Optional action-model knobs kept for Bridge experiments.
USE_REASONING_SUMMARY="${USE_REASONING_SUMMARY:-false}"
REASONING_SUMMARY_TOKENS="${REASONING_SUMMARY_TOKENS:-2}"
REASONING_SUMMARY_HEADS="${REASONING_SUMMARY_HEADS:-4}"
REASONING_SUMMARY_DROPOUT="${REASONING_SUMMARY_DROPOUT:-0.1}"
USE_REASONING_FILM="${USE_REASONING_FILM:-false}"
REASONING_FILM_FIRST_K="${REASONING_FILM_FIRST_K:-0}"
REASONING_FILM_DROPOUT="${REASONING_FILM_DROPOUT:-0.1}"
REASONING_FILM_HIDDEN="${REASONING_FILM_HIDDEN:-1024}"
ATTENTION_IMPLEMENTATION="${ATTENTION_IMPLEMENTATION:-sdpa}"

declare -A BRIDGE_STAGE=(
  [1]=1
  [2]=2
  [3]=3
  [4]=4
)

declare -A SCHEDULED_STAGE=(
  [1]=1
  [2]=2
  [3]=3
  [4]=4
)

declare -A TRAINING_STAGE=(
  [1]="reasoning_only"
  [2]="reasoning_only"
  [3]="reasoning_only"
  [4]="reasoning_only"
)

declare -A VLM_LOSS_WEIGHT=(
  [1]=1.0
  [2]=1.0
  [3]=1.0
  [4]=1.0
)

declare -A IMG_NEXT_LOSS_WEIGHT=(
  [1]="${IMG_NEXT_LOSS_WEIGHT_STAGE1:-0.1}"
  [2]="${IMG_NEXT_LOSS_WEIGHT_STAGE2:-0.1}"
  [3]="${IMG_NEXT_LOSS_WEIGHT_STAGE3:-0.2}"
  [4]="${IMG_NEXT_LOSS_WEIGHT_STAGE4:-0.2}"
)

declare -A PER_DEVICE_BATCH=(
  [1]=12
  [2]=16
  [3]=16
  [4]=16
)

declare -A MAX_STEPS=(
  [1]=10000
  [2]=5000
  [3]=5000
  [4]=10000
)

declare -A SAVE_INTERVAL=(
  [1]=10000
  [2]=5000
  [3]=5000
  [4]=10000
)

declare -A CKPT_STEP=(
  [1]=10000
  [2]=5000
  [3]=5000
  [4]=5000
)

START_STAGE="${START_STAGE:-1}"
# =========================================================

[[ -n "${STEPS_CACHE_PATH}" ]] && mkdir -p "${STEPS_CACHE_PATH}"

run_one_stage() {
  local stage="$1"
  local load_ckpt="$2"

  local run_id="${RUN_ID_PREFIX}_stage_${stage}"
  local out="${RUN_ROOT}/${run_id}"
  local component_order="SUBTASK,BBOX,REASON"

  mkdir -p "${out}"
  cp "$0" "${out}/run_command.sh"

  local args=(
    --config_yaml "${CONFIG_YAML}"
    --run_root_dir "${RUN_ROOT}"
    --run_id "${run_id}"
    --wandb_project "${WANDB_PROJECT}"
    --framework.training_stage "${TRAINING_STAGE[$stage]}"
    --datasets.vla_data.bridge_reasoning.stage "${BRIDGE_STAGE[$stage]}"
    --datasets.vla_data.ecot.scheduled_stage "${SCHEDULED_STAGE[$stage]}"
    --trainer.max_train_steps "${MAX_STEPS[$stage]}"
    --trainer.save_interval "${SAVE_INTERVAL[$stage]}"
    --trainer.eval_interval 50000000
    --trainer.logging_frequency 20
    --trainer.warmup_ratio 0.1
    --trainer.learning_rate.base 3.0e-5
    --trainer.learning_rate.action_model 1.0e-4
    --datasets.vla_data.per_device_batch_size "${PER_DEVICE_BATCH[$stage]}"
    --datasets.vla_data.bridge_reasoning.include_action_tokens "true"
    --datasets.vla_data.bridge_reasoning.component_order "${component_order}"
    --framework.latent_reasoning.vlm_loss_weight "${VLM_LOSS_WEIGHT[$stage]}"
    --framework.img_next.loss_weight "${IMG_NEXT_LOSS_WEIGHT[$stage]}"
    --framework.action_model.use_reasoning_film "${USE_REASONING_FILM}"
    --framework.action_model.reasoning_film_first_k "${REASONING_FILM_FIRST_K}"
    --framework.action_model.reasoning_film_dropout "${REASONING_FILM_DROPOUT}"
    --framework.action_model.reasoning_film_hidden "${REASONING_FILM_HIDDEN}"
    --framework.action_model.use_reasoning_summary "${USE_REASONING_SUMMARY}"
    --framework.action_model.reasoning_summary_tokens "${REASONING_SUMMARY_TOKENS}"
    --framework.action_model.reasoning_summary_heads "${REASONING_SUMMARY_HEADS}"
    --framework.action_model.reasoning_summary_dropout "${REASONING_SUMMARY_DROPOUT}"
    --framework.qwenvl.attn_implementation "${ATTENTION_IMPLEMENTATION}"
  )

  [[ -n "${STEPS_CACHE_PATH}" ]] && args+=( --datasets.vla_data.bridge_annotations.steps_cache_path "${STEPS_CACHE_PATH}" )
  [[ -n "${WANDB_ENTITY}" ]] && args+=( --wandb_entity "${WANDB_ENTITY}" )

  if [[ -n "${load_ckpt}" ]]; then
    args+=( --trainer.pretrained_checkpoint "${load_ckpt}" )
    [[ -n "${RELOAD_MODULES}" ]] && args+=( --trainer.reload_modules "${RELOAD_MODULES}" )
  fi

  torchrun \
    --nproc_per_node="${NUM_GPUS}" \
    --master_port="${MASTER_PORT}" \
    laravla/training/train.py \
    "${args[@]}" \
    "$@"
}

for stage in 1 2 3 4; do
  (( stage < START_STAGE )) && continue

  load_ckpt=""
  if (( stage == START_STAGE )); then
    load_ckpt="${CKPT_PRE:-${INITIAL_PRETRAINED_CKPT:-}}"
  else
    prev=$((stage - 1))
    load_ckpt="${RUN_ROOT}/${RUN_ID_PREFIX}_stage_${prev}/checkpoints/steps_${CKPT_STEP[$prev]}_pytorch_model.pt"
    if [[ ! -f "${load_ckpt}" ]]; then
      echo "Missing previous-stage checkpoint: ${load_ckpt}" >&2
      exit 1
    fi
  fi

  run_one_stage "${stage}" "${load_ckpt}"
done

````


---

# scripts/run_laravla_bridge.sh

````text
#!/usr/bin/env bash
# Bridge-LeRobot :: train.py — repository root: bash scripts/run_laravla_bridge.sh
set -euo pipefail
export TOKENIZERS_PARALLELISM=false

PRETRAINED_CKPT=
RELOAD_MODULES=qwen_vl_interface

# 若改 run_root_dir / run_id，请同步改下面 mkdir 路径（与 bridge.yaml 默认一致）
mkdir -p results/Bridge/Bridge_VLA

args=(
  --config_yaml laravla/config/training/bridge.yaml
  --run_root_dir results/Bridge
  --run_id bridge_vla
  --wandb_project bridge_vla
  --framework.training_stage full
  --datasets.vla_data.bridge_reasoning.stage 4
  --trainer.max_train_steps 20000
  --datasets.vla_data.per_device_batch_size 8
  --framework.img_next.use_teacher false
)

if [[ -n "${PRETRAINED_CKPT}" ]]; then
  args+=( --trainer.pretrained_checkpoint "${PRETRAINED_CKPT}" )
  [[ -n "${RELOAD_MODULES}" ]] && args+=( --trainer.reload_modules "${RELOAD_MODULES}" )
fi

exec torchrun \
  --nproc_per_node=8 \
  --master_port=29512 \
  laravla/training/train.py \
  "${args[@]}" \
  "$@"

````


---

# laravla/config/training/libero.yaml

````text
# ============================================================================
# Libero-all :: Latent Reasoning Training
# ============================================================================
# Mix: libero_goal / libero_object / libero_spatial / libero_10
# See: laravla/dataloader/gr00t_lerobot/mixtures.py
# ============================================================================

run_id: "libero_all"
run_root_dir: "results/LiberoAll"
seed: 42
trackers: [jsonl, wandb]
wandb_entity: ""
wandb_project: "libero_all"
is_debug: false

datasets:
  vla_data:
    dataset_py: "lerobot_datasets"
    data_root_dir: "./data/libero_lerobot"
    data_mix: "libero_all"
    per_device_batch_size: 8
    image_size: [224, 224]
    delete_pause_frame: true
    obs: ["image_0"]
    default_image_resolution: [3, 224, 224]

    bridge_annotations:
      cot_path: "annotations/episode_dense_captions_full.jsonl"
      bbox_path: "annotations/episode_sam3_bboxes_from_dino_final.jsonl"
      fast_tokenizer_name: "physical-intelligence/fast"
      steps_cache_path: null
      write_steps_cache: true
      filters:
        require_cot_episode: false
        require_bbox_episode: true
        min_episode_bbox_coverage: 0.0
        require_bbox_step: false
        include_task_indices: null
        exclude_task_indices: null

    bridge_reasoning:
      enable: true
      stage: 2
      include_bbox: true
      include_action_tokens: true
      include_img_next: true
      thinking_token: "<|thinking|>"
      start_token: "<|start_of_thinking|>"
      end_token: "<|end_of_thinking|>"
      component_order: [SUBTASK, BBOX, REASON]
      tag2think_count:
        SUBTASK: 1
        REASON: 1
        BBOX: 1

framework:
  name: "QwenGR00T"
  training_stage: "action_only"
  cot_mode: "implicit"
  latent_reasoning:
    compute_language_loss: true
    vlm_loss_weight: 1

  img_next:
    enable: true
    token: "<img_next>"
    loss_weight: 0.1
    res: 112
    use_teacher: true

  qwenvl:
    base_vlm: "StarVLA/Qwen3-VL-4B-Instruct-Action"
    attn_implementation: "sdpa"
    cache_dir: "./qwen_cache"
    model_max_length: 2048

  action_model:
    action_model_type: "DiT-B"
    hidden_size: 1024
    add_pos_embed: true
    max_seq_len: 1024
    action_dim: 7
    state_dim: 7
    future_action_window_size: 7
    action_horizon: 8
    past_action_window_size: 0
    repeated_diffusion_steps: 4
    noise_beta_alpha: 1.5
    noise_beta_beta: 1.0
    noise_s: 0.999
    num_timestep_buckets: 1000
    num_inference_timesteps: 4
    num_target_vision_tokens: 32
    diffusion_model_cfg:
      cross_attention_dim: 1536
      dropout: 0.2
      final_dropout: true
      interleave_self_attention: true
      norm_type: "ada_norm"
      num_layers: 16
      output_dim: 1024
      positional_embeddings: null

trainer:
  pretrained_checkpoint: null
  reload_modules: null
  max_train_steps: 60000
  epochs: null
  gradient_accumulation_steps: 1
  gradient_clipping: 1.0
  logging_frequency: 10
  save_interval: 5000
  eval_interval: 2000
  warmup_ratio: 0.1
  num_warmup_steps: 5000
  learning_rate:
    base: 3.0e-5
    qwen_vl_interface: 1.0e-5
    action_model: 1.0e-4
  lr_scheduler_type: "cosine_with_min_lr"
  scheduler_specific_kwargs:
    min_lr: 5.0e-7
  optimizer:
    name: "AdamW"
    betas: [0.9, 0.95]
    eps: 1.0e-8
    weight_decay: 1.0e-8
  freeze_modules: ""
  enable_gradient_checkpointing: false
  enable_mixed_precision_training: true

````


---

# laravla/config/training/bridge.yaml

````text
# ============================================================================
# Bridge-LeRobot :: ECoT Stage-2 Training Configuration
# ============================================================================
#  - Dataloader: `lerobot_datasets` (BRIDGE mix)
#  - Formatter: BridgeReasoningFormatter stage=2 (subtask latent)
#  - Trainer : train_ecot.py (latent reasoning enabled)
# ============================================================================

run_id: "bridge_ecot_stage2"
run_root_dir: "results/BridgeECOT"
seed: 42
trackers: [jsonl, wandb]
wandb_entity: "your_wandb_entity"
wandb_project: "bridge_ecot"
is_debug: false

datasets:
  vla_data:
    dataset_py: "lerobot_datasets"
    data_root_dir: "/share/project/baishuanghao/data"
    data_mix: "bridge_local"
    per_device_batch_size: 8
    image_size: [224, 224]
    delete_pause_frame: true
    obs: ["image_0"]
    default_image_resolution: [3, 224, 224]
    bridge_annotations:
      cot_path: "/share/project/baishuanghao/data/bridge_orig_lerobot/annotations/episode_dense_captions_full_final.jsonl"
      bbox_path: "/share/project/baishuanghao/data/bridge_orig_lerobot/annotations/episode_sam3_bboxes_final_merged.jsonl"
      fast_tokenizer_name: "physical-intelligence/fast"
      steps_cache_path: "/share/project/baishuanghao/data/bridge_orig_lerobot/meta/steps_d73aaaf2328a.pkl"
      filters:
        require_cot_episode: false
        require_bbox_episode: true
        min_episode_bbox_coverage: 0.0
        require_bbox_step: false
        include_task_indices: null  # e.g., [1, 2, 3]
        exclude_task_indices: [4,11,338,1176,3656,3922,4446,4865,6552,9814,11386,11704,12032,12708,13667,15039,16104,16392,16914,17286,18937]   # e.g., [4]
    bridge_reasoning:
      enable: true
      stage: 4          # Stage 2: subtask latent, reasoning/bbox still explicit
      include_bbox: true
      include_action_tokens: true
      thinking_token: "<|thinking|>"
      start_token: "<|start_of_thinking|>"
      end_token: "<|end_of_thinking|>"
      component_order: [BBOX, SUBTASK, REASON]
      tag2think_count:
        SUBTASK: 1
        REASON: 1
        BBOX: 1
      vlm_loss_weight: 1
    ecot:
      scheduled_stage: 4   # for config validation logging

framework:
  name: "QwenGR00T"
  training_stage: "full"
  cot_mode: "implicit"          # 默认显式声明，运行时可被 COT_MODE 覆写
  enable_latent_reasoning: true
  emit_thinking_tokens: false   # 显式 CoT 关闭 latent 时仍不输出思维 token
  latent_reasoning:
    compute_language_loss: true
    vlm_loss_weight: 1
    thinking_token: "<|thinking|>"
    start_of_thinking_token: "<|start_of_thinking|>"
    end_of_thinking_token: "<|end_of_thinking|>"
  # img_next 对齐配置
  img_next:
    enable: true
    token: "<img_next>"
    loss_weight: 0.1
    res: 112  # 112x112 输入，经 2x2 merge 得 16 token
    use_teacher: false
  qwenvl:
    base_vlm: "StarVLA/Qwen3-VL-4B-Instruct-Action"
    attn_implementation: "sdpa"
    cache_dir: "/share/project/lvjing/starVLA/qwen_cache"
    model_max_length: 2048
  action_model:
    action_model_type: "DiT-B"
    hidden_size: 1024
    add_pos_embed: true
    max_seq_len: 1024
    action_dim: 7
    state_dim: 8
    future_action_window_size: 15
    action_horizon: 16
    past_action_window_size: 0
    repeated_diffusion_steps: 4
    noise_beta_alpha: 1.5
    noise_beta_beta: 1.0
    noise_s: 0.999
    num_timestep_buckets: 1000
    num_inference_timesteps: 4
    num_target_vision_tokens: 32
    use_reasoning_summary: false
    use_img_next_mlp_compress: false
    reasoning_summary_tokens: 2
    reasoning_summary_heads: 4
    reasoning_summary_dropout: 0.1
    use_reasoning_film: false
    reasoning_film_first_k: 4        # 0 表示禁用；>0 表示前 K 层应用
    reasoning_film_dropout: 0.1
    reasoning_film_hidden: 1024      # FiLM MLP 中间维度（可与 DiT hidden 对齐）
    diffusion_model_cfg:
      cross_attention_dim: 1536
      dropout: 0.2
      final_dropout: true
      interleave_self_attention: true
      norm_type: "ada_norm"
      num_layers: 16
      output_dim: 1024
      positional_embeddings: null

trainer:
  max_train_steps: 20000
  epochs: null
  gradient_accumulation_steps: 1
  gradient_clipping: 1.0
  logging_frequency: 10
  save_interval: 2000
  eval_interval: 500
  latent_analysis:
    enable: false
    interval_steps: 1
    max_samples: 32
    max_latents: 3
    max_img_next: 32
    # Dedupe: keep only unique instructions to reduce repeated samples.
    # - unique_in_batch: ensures we don't log the same instruction twice within one trigger.
    # - dedupe_across_run: ensures we don't keep logging an instruction we've already logged before.
    unique_in_batch: true
    dedupe_across_run: true
    max_seen_instructions: 1000
    # If true, log how many unique instructions have been saved so far.
    log_saved_instruction_count: true
    # If true, additionally dump thinking token vectors for PCA/UMAP and probing.
    # The dump is one file per trigger under `${output_dir}/latent_analysis/${embeddings_subdir}/`.
    dump_embeddings: false
    # Optional: also dump <img_next> token vectors (size max_img_next x hidden).
    dump_img_next_embeddings: false
    # One of: float16 | bfloat16 | float32
    embeddings_dtype: "float16"
    embeddings_subdir: "embeddings"
    dump_dir: null
  warmup_ratio: 0.1
  num_warmup_steps: 2000
  learning_rate:
    base: 3.0e-5
    qwen_vl_interface: 1.0e-5
    action_model: 1.0e-4
  lr_scheduler_type: "cosine_with_min_lr"
  scheduler_specific_kwargs:
    min_lr: 5.0e-7
  optimizer:
    name: "AdamW"
    betas: [0.9, 0.95]
    eps: 1.0e-8
    weight_decay: 1.0e-8
  freeze_modules: ""
  enable_gradient_checkpointing: false
  enable_mixed_precision_training: true

````


---

# docs/THIRD_PARTY_NOTICES.md

````text
# Third-Party Notices

This repository builds on the open-source StarVLA codebase. The current public
project identity is **LaRA-VLA**, while many third-party notices preserved here
are already present in that upstream base. This file is intended to preserve
and summarize those visible attributions in the current repository state.

This repository is released under the MIT License at the repository root.
However, individual files may carry their own third-party copyright or license
headers, and those file-level notices should be preserved.

This file is a best-effort inventory based on the file headers and upstream
references visible in the current repository. It is not intended to claim a
full independent provenance reconstruction for every historical StarVLA file.

This file is informational only and is not legal advice.

## How To Read This File

- The repository as a whole builds on StarVLA.
- Some files in StarVLA already preserve third-party provenance and SPDX
  notices.
- This document records the most visible third-party notices currently present
  in this repository and flags a few items that deserve additional review.

## Third-Party Notices Preserved In This Repository

### 1. NVIDIA Isaac-GR00T / NVIDIA-authored Apache-2.0 components

Upstream:

- https://github.com/NVIDIA/Isaac-GR00T

License:

- Apache License 2.0

Local files that retain NVIDIA SPDX / Apache-2.0 headers:

- `laravla/dataloader/gr00t_lerobot/data_config.py`
- `laravla/dataloader/gr00t_lerobot/datasets.py`
- `laravla/dataloader/gr00t_lerobot/embodiment_tags.py`
- `laravla/dataloader/gr00t_lerobot/schema.py`
- `laravla/dataloader/gr00t_lerobot/video.py`
- `laravla/dataloader/gr00t_lerobot/transform/__init__.py`
- `laravla/dataloader/gr00t_lerobot/transform/base.py`
- `laravla/dataloader/gr00t_lerobot/transform/concat.py`
- `laravla/dataloader/gr00t_lerobot/transform/state_action.py`
- `laravla/dataloader/gr00t_lerobot/transform/video.py`
- `laravla/model/modules/action_model/flow_matching_head/__init__.py`
- `laravla/model/modules/action_model/flow_matching_head/action_encoder.py`
- `laravla/model/modules/action_model/flow_matching_head/cross_attention_dit.py`

Notes:

- These files already preserve Apache-2.0 SPDX headers in the repository.
- The current repository keeps those file-level notices as inherited from the
  StarVLA base and subsequent local modifications.

### 2. OpenAI diffusion repositories

Upstreams:

- https://github.com/openai/guided-diffusion
- https://github.com/openai/improved-diffusion
- https://github.com/openai/glide-text2im

License:

- MIT License

Local files that explicitly reference these upstreams:

- `laravla/model/modules/action_model/__init__.py`
- `laravla/model/modules/action_model/DiT_modules/diffusion_utils.py`
- `laravla/model/modules/action_model/DiT_modules/gaussian_diffusion.py`
- `laravla/model/modules/action_model/DiT_modules/respace.py`
- `laravla/model/modules/action_model/DiT_modules/timestep_sampler.py`

Notes:

- These files include in-file comments indicating they were modified from
  OpenAI diffusion repositories.
- The current repository preserves those provenance comments.

### 3. Meta DiT

Upstream:

- https://github.com/facebookresearch/DiT

License:

- The upstream DiT repository is released under the license distributed with
  that project; the vendored file in this repository retains Meta copyright
  notices and refers to the upstream license file.

Local file:

- `laravla/model/modules/action_model/DiT_modules/models.py`

Important note:

- This file is the most license-sensitive vendored component currently visible
  in the repository.
- Review the exact upstream DiT license terms carefully before any stable or
  commercially-positioned release.

### 4. Meta DINOv2

Upstream:

- https://github.com/facebookresearch/dinov2

License:

- Apache License 2.0 for the copied transform file, per the local header

Local file:

- `laravla/model/modules/dino_model/dino_transforms.py`

Notes:

- `laravla/model/modules/dino_model/dino.py` is a local wrapper that loads
  DINOv2 via `torch.hub`; it is not itself marked as a copied upstream file.

### 5. OpenVLA / Prismatic logging utility

Upstream:

- https://github.com/openvla/openvla
- https://github.com/TRI-ML/prismatic-vlms

License:

- MIT License

Local file:

- `laravla/training/trainer_utils/overwatch.py`

Notes:

- The file header explicitly says it was originally from the OpenVLA / Prismatic
  project and modified in this repository.

## Files Requiring Additional Provenance Review

The following files carry third-party copyright or "modified by" notices, but
their exact upstream file mapping is not fully documented inside this current
repository snapshot. They should be reviewed before a stable public release.

### A. NVIDIA-labeled action headers

Files:

- `laravla/model/modules/action_model/GR00T_ActionHeader.py`
- `laravla/model/modules/action_model/LayerwiseFM_ActionHeader.py`

Observed in local headers:

- NVIDIA copyright notice
- local modification notice

Recommended follow-up:

- confirm the exact upstream source file(s) in NVIDIA Isaac-GR00T or related
  NVIDIA releases
- confirm whether an SPDX identifier or a clearer upstream reference should be
  added to these files

### B. CogACT-labeled action header

File:

- `laravla/model/modules/action_model/DiTActionHeader.py`

Observed in local header:

- `Copyright 2025 CogACT`
- local modification notice

Recommended follow-up:

- confirm the exact upstream CogACT source file
- confirm the intended redistribution notice to keep alongside the repository
  MIT license

## Repository Policy For Preserved Third-Party Code

When keeping or modifying third-party-derived code in this repository:

1. Preserve upstream copyright and license headers.
2. Add an explicit "Modified by ..." note when changes are made locally.
3. Prefer linking the exact upstream project or file when known.
4. Do not remove SPDX identifiers from vendored files.
5. Record new vendored or adapted code in this notice file.

## Practical Release Checklist

Before a stable public release, verify:

- files that preserve third-party headers still retain their upstream notices
- the repository root `LICENSE` does not obscure file-level third-party licenses
- the Meta DiT vendored file has been reviewed for compatibility with the
  release you intend to make
- NVIDIA- and CogACT-labeled action-header files have explicit upstream mapping

````


---

# docs/open_source_release_schedule.md

````text
# 仓库开源发布 Schedule

> 目标：将当前仓库从“可在内部/熟悉环境下运行的研究仓库”整理为“可公开发布、可被外部用户理解、安装、复现和贡献”的开源仓库。
> 原则：先清风险，再统一入口，再补文档与验证，最后发布。
> 建议节奏：按 **7 个 Phase** 推进，每完成一个 Phase 建议单独 commit 一次。

---

## 当前状态

### 已完成 / 已开始

- 训练入口已经统一为 `laravla/training/train.py`
- 启动脚本中的训练入口引用已经同步到 `train.py`
- 仓库主线已经基本收敛到 **implicit latent reasoning** 模式
- 已有一份配置/训练清理计划：[config_and_training_cleanup_plan.md](./config_and_training_cleanup_plan.md)

### 当前主要阻塞项

- Some repo-level planning docs still lag behind the current `laravla/` namespace
- Final legal/provenance review is still pending
- Release metadata and community files still need final cleanup
- Minimal validation exists, but release-time consistency checks should still be documented

---

## 总体时间表

### Week 1

- Phase 0：冻结主入口与命名
- Phase 1：安全与私有信息清理
- Phase 2：训练/配置/脚本一致性清理

### Week 2

- Phase 3：文档重写
- Phase 4：许可证与第三方归属审计
- Phase 5：最小验证与 CI

### Week 3

- Phase 6：发布资产准备
- Phase 7：发布彩排与正式开源

> 如果节奏紧，可以把 Phase 3 / 4 / 5 并行推进；但 **Phase 1 必须先完成**。

---

## Phase 0：冻结主入口与命名

> 风险等级：🟢 低
> 目标：让仓库对外只有一套训练入口命名，避免后续文档和脚本继续分叉。

### Tasks

1. 将所有脚本中的旧训练入口调用统一为 `train.py`
2. 将代码注释、yaml 注释、文档中的旧入口描述统一切换为 `train`
3. 检查 `__main__` 默认 `config_yaml` 是否仍指向已删除/不存在的旧配置
4. 确认 `from laravla.training.train import main` 可正常 import

### 涉及重点文件

- `scripts/run_libero_multistage.sh`
- `scripts/run_bridge_multistage.sh`
- `scripts/run_laravla_libero.sh`
- `scripts/run_laravla_bridge.sh`
- `docs/config_and_training_cleanup_plan.md`
- `laravla/config/training/*.yaml`
- `README.md`
- `laravla/model/framework/QwenGR00T.py`
- `laravla/model/modules/vlm/QWen2_5.py`
- `laravla/dataloader/lerobot_datasets.py`

### 验收标准

- 仓库中不再残留旧训练入口名
- 所有训练脚本均调用 `laravla/training/train.py`

---

## Phase 1：安全与私有信息清理

> 风险等级：🔴 高
> 目标：去掉任何不适合公开发布的敏感内容、机器绑定内容和调试入口。

### Tasks

1. 删除仓库中的硬编码密钥
2. 删除或改造内网/私有镜像默认值
3. 删除所有 `debugpy.listen(("0.0.0.0", ...))` 和 `wait_for_client()` 默认入口
4. 将硬编码绝对路径改为：
   - `null`
   - 相对路径
   - 环境变量
   - CLI 参数
5. Review dataset-specific filter configs and remove them only if they are truly private or not meant to be part of the public default setup
6. 检查根目录和 docs 是否包含内部机器名、用户名、私有目录结构

### 当前已发现的重点风险

- `scripts/run_bridge_multistage.sh`
  - `WANDB_API_KEY`
  - `WANDB_BASE_URL`
  - `HF_ENDPOINT`
  - 私有 `steps_cache_path`
- `examples/LIBERO/eval_libero_all.sh`
  - 固定 conda 环境路径
  - 固定 checkpoint 路径
  - 固定 `LIBERO_HOME`
- `examples/SimplerEnv/bridge_eval.sh`
  - 固定 python / 环境 / 路径
- `laravla/config/training/*.yaml`
  - `data_root_dir`
  - `cache_dir`
  - `steps_cache_path`
  - `wandb_entity`
- `deployment/model_server/server_policy.py`
- `examples/LIBERO/eval_libero.py`
- `laravla/dataloader/lerobot_datasets.py`
- `laravla/model/modules/vlm/QWen2_5.py`

### 建议输出

- 一次 “sanitize” commit
- 一份对外安全默认值规范：
  - 默认不启用远程调试
  - 默认不带私有镜像
  - 默认不带任何密钥

### 验收标准

- `rg -n "WANDB_API_KEY|debugpy|/share/project|hf-mirror|bandw|0.0.0.0" .` 不再出现不应公开的默认值
- 所有脚本在没有私有机器路径的环境下也能看懂，并可通过参数补全

---

## Phase 2：训练 / 配置 / 脚本一致性清理

> 风险等级：🟡 中
> 目标：保证代码、yaml、脚本、注释都围绕当前真实主线，即 `train.py + implicit latent reasoning`。

### Tasks

1. 继续执行 [config_and_training_cleanup_plan.md](./config_and_training_cleanup_plan.md) 中与开源强相关的条目
2. 清理 yaml 中未使用或对外无意义的字段
3. 统一脚本和配置中的默认训练入口、训练阶段、stage 说明
4. 清理 README 中过时训练命令
5. 统一说明仓库当前主推荐路径：
   - Bridge 训练
   - LIBERO 训练
   - LIBERO 评测
   - SimplerEnv 评测

### 重点问题

- README 仍引用过时训练入口
- 若干 `__main__` 默认配置仍指向不存在的 legacy config
- yaml 注释仍混用旧入口名 / `cot_mode` 的历史描述

### 建议输出

- 一次 “cleanup: align train/config/scripts” commit
- 更新后的默认训练命令

### 验收标准

- README、脚本、yaml 的训练入口一致
- 新用户只需要看一份主文档就能知道“用哪个脚本训练”

---

## Phase 3：文档重写

> 风险等级：🟡 中
> 目标：把仓库从“内部知道怎么跑”变成“外部第一次打开也知道是什么、怎么装、怎么训练、怎么评测”。

### Tasks

1. 重写顶层 `README.md`
2. 明确写出仓库主卖点：
   - implicit latent reasoning
   - iterative forward
   - hidden state feedback as next reasoning token
3. 给出最小可运行路径：
   - 安装
   - 下载模型
   - 启动训练
   - 启动 policy server
   - 跑 LIBERO / SimplerEnv
4. 补齐空文档：
   - `examples/LIBERO/README.md`
5. Rewrite or remove internal-only documents that do not match the public release scope
6. 增加 FAQ：
   - 数据不公开时如何使用
   - 如何替换 base VLM
   - 如何关闭/开启 latent reasoning 相关能力

### 推荐文档结构

1. 项目简介
2. 亮点与方法概览
3. 安装
4. 快速开始
5. 训练
6. 评测
7. Data and checkpoint guidance
8. Limitations and known issues

### 建议输出

- 一次 “docs: rewrite public-facing documentation” commit

### 验收标准

- 外部用户仅通过 README 就能找到正确入口
- `examples/LIBERO/README.md` is no longer empty
- each example directory has at least one usable README

---

## Phase 4：许可证与第三方代码归属审计

> 风险等级：🔴 高
> 目标：明确仓库中每部分代码的来源、许可证和再分发边界。

### Tasks

1. 盘点所有非纯自研代码来源
2. 确认这些来源的许可证是否兼容当前仓库公开方式
3. 新增 `NOTICE` 或 `THIRD_PARTY_NOTICES.md`
4. 在 README 的 Acknowledgements 基础上补充更正式的归属说明
5. 检查文件头是否需要：
   - SPDX 标识
   - 原始仓库链接
   - 修改说明
6. 特别核查以下目录/文件：
   - `laravla/dataloader/gr00t_lerobot/*`
   - `laravla/model/modules/action_model/GR00T_ActionHeader.py`
   - `laravla/model/modules/action_model/LayerwiseFM_ActionHeader.py`
   - `laravla/model/modules/action_model/DiTActionHeader.py`
   - `laravla/model/modules/action_model/DiT_modules/models.py`
   - `laravla/training/trainer_utils/overwatch.py`

### 重点提醒

- 某些第三方文件头会引用“原仓库根目录的 LICENSE”
- the repository root license and file-level third-party notices must remain consistent
- 公开前必须确认这种再分发方式在法律和文档层面是自洽的

### 建议输出

- `THIRD_PARTY_NOTICES.md`
- 必要时补充 `NOTICE`
- 一次 “legal: add provenance and third-party notices” commit

### 验收标准

- 第三方来源可追溯
- 仓库根目录具备足够的许可证与归属说明

---

## Phase 5：最小验证与 CI

> 风险等级：🟡 中
> 目标：让仓库至少具备基础的可验证性，减少公开后的“装不上 / 一跑就挂 / 根本不知道哪里坏了”问题。

### Tasks

1. 增加最小 smoke tests
2. 增加 config load 检查
3. 增加一个 fake-data forward 检查
4. 增加脚本级 lint / import check
5. 建立最小 GitHub Actions

### 最小建议测试集

- `OmegaConf.load()` 三个训练 yaml
- `from laravla.training.train import main`
- `from laravla.model.framework import build_framework`
- `BridgeReasoningFormatter` 的 stage 格式化行为
- `QwenGR00T` fake sample smoke test

### CI 最小内容

- Python 版本检查
- `make check`
- smoke imports
- yaml syntax check

### 建议输出

- `.github/workflows/ci.yml`
- 一个 `tests/` 目录或 `scripts/smoke/` 目录
- 一次 “ci: add minimal smoke coverage” commit

### 验收标准

- PR 可以自动跑基本检查
- 新用户遇到问题时，仓库里有明确的最小验证命令

---

## Phase 6：发布资产准备

> 风险等级：🟡 中
> 目标：补齐开源项目在 GitHub 上应该具备的元信息和发布素材。

### Tasks

1. 清理和确认 `.gitignore`
2. 删除无意义或不应公开的文件
   - 例如根目录的异常临时文件
3. 完善 `pyproject.toml`
4. 明确 `requirements.txt` / optional dependencies 的角色
5. 增加社区文件：
   - `CONTRIBUTING.md`
   - `CODE_OF_CONDUCT.md`
   - `SECURITY.md`
6. 增加 issue / PR template
7. 准备 checkpoint / dataset 说明
8. 准备 Hugging Face model card / release note

### 推荐发布内容

- GitHub Release 文案
- 支持的 checkpoint 列表
- 最小显存 / 依赖说明
- 复现限制说明
- 已知未开源部分说明

### 验收标准

- 仓库元信息齐全
- 发布页和 README 信息一致

---

## Phase 7：发布彩排与正式开源

> 风险等级：🔴 高
> 目标：在真正公开之前，按外部用户视角完整跑一遍安装与使用流程。

### Tasks

1. 在干净环境中从零 clone 仓库
2. 按 README 完整执行安装流程
3. 执行最小 smoke tests
4. 验证至少一条训练命令可启动
5. 验证至少一条评测命令可启动
6. 检查 README 中所有路径、文件名、命令是否真实存在
7. 整理首发 tag：
   - `v0.1.0-research`
   - 或 `v1.0.0`（如果你希望直接按正式版本公开）

### 发布建议

- 首发版本建议命名为 `v0.1.0-research`
- 先强调：
  - 研究代码
  - implicit latent reasoning 主线
  - 提供训练/评测参考实现
- 暂时不要承诺过多平台和环境支持

### 验收标准

- 一位不了解内部环境的人也能按文档完成最小流程
- GitHub 首屏信息清晰
- 没有明显安全问题和法律风险残留

---

## 建议提交顺序

```bash
git commit -m "refactor: unify training entrypoint name as train"
git commit -m "sanitize: remove secrets, private paths, and debug entrypoints"
git commit -m "cleanup: align training configs, scripts, and docs to train.py"
git commit -m "docs: rewrite public-facing README and example docs"
git commit -m "legal: add third-party notices and provenance records"
git commit -m "ci: add minimal smoke tests and GitHub Actions"
git commit -m "release: prepare open-source metadata and community files"
```

---

## Release Checklist

### P0

- [ ] 所有密钥已移除
- [ ] 所有私有路径已移除
- [ ] 所有 debugpy 默认入口已移除
- [ ] `train.py` 已成为唯一训练入口
- [ ] README 不再引用过时入口

### P1

- [ ] 文档主线已统一
- [ ] `examples/LIBERO/README.md` 已补齐
- [ ] 发布所需许可证/NOTICE 文件已补齐
- [ ] 最小 smoke tests 已可运行

### P2

- [ ] CI 已接入
- [ ] 社区文件已补齐
- [ ] release note / model card 已准备好
- [ ] 首发版本已完成彩排

---

## 建议我们接下来的执行顺序

1. 先完成 Phase 0 剩余收尾，把所有旧入口文档残留统一改掉
2. 立刻进入 Phase 1，优先做 sanitize
3. 然后做 README 和 example 文档重写
4. 再处理第三方许可证与最小 CI
5. 最后做一次从零安装到运行的开源彩排

> 结论：从当前仓库状态看，**最适合的策略不是“一次性大改完再发”，而是按 Phase 连续小步提交**。这样风险最小，也最容易随时停在一个可发布状态。

````


---

# LICENSE

````text
    MIT License

    Copyright (c) StarVLA Team.

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    Rebases are allowed for forks and feature branches. When rebasing from upstream StarVLA, use descriptive commit messages, e.g., "chore: clone from StarVLA".
    Preserve attribution: keep at least the two latest upstream StarVLA commits as separate.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE

````


---

# 파일 트리 (main)

````text
.gitignore
LICENSE
Makefile
README.md
assets
assets/2.png
assets/3.png
assets/5.png
assets/Framworks.png
assets/laravla_LIBERO.png
assets/laravla_simpleEnv.png
deployment
deployment/__init__.py
deployment/model_server
deployment/model_server/README.md
deployment/model_server/__init__.py
deployment/model_server/debug_server_policy.py
deployment/model_server/server_policy.py
deployment/model_server/tools
deployment/model_server/tools/__init__.py
deployment/model_server/tools/image_tools.py
deployment/model_server/tools/msgpack_numpy.py
deployment/model_server/tools/websocket_policy_client.py
deployment/model_server/tools/websocket_policy_server.py
deployment/readme-deployment.md
deployment/upload
deployment/upload/push_model_to_hf.py
docs
docs/THIRD_PARTY_NOTICES.md
docs/config_and_training_cleanup_plan.md
docs/open_source_release_schedule.md
docs/rename_starvla_to_laravla_plan.md
examples
examples/LIBERO
examples/LIBERO/README.md
examples/LIBERO/eval_libero.py
examples/LIBERO/eval_libero_all.sh
examples/LIBERO/model2libero_interface.py
examples/LIBERO/run_all_ckpts_libero_all.sh
examples/SimplerEnv
examples/SimplerEnv/README.md
examples/SimplerEnv/adaptive_ensemble.py
examples/SimplerEnv/bridge_eval.sh
examples/SimplerEnv/custom_argparse.py
examples/SimplerEnv/model2simpler_interface.py
examples/SimplerEnv/run_all_ckpts_bridge.sh
examples/SimplerEnv/start_simpler_env.py
examples/SimplerEnv/test_your_simplerEnv.py
laravla
laravla/__init__.py
laravla/config
laravla/config/deepseeds
laravla/config/deepseeds/deepspeed_zero2.yaml
laravla/config/deepseeds/ds_config.yaml
laravla/config/deepseeds/zero2.yaml
laravla/config/deepseeds/zero3.json
laravla/config/training
laravla/config/training/bridge.yaml
laravla/config/training/libero.yaml
laravla/dataloader
laravla/dataloader/__init__.py
laravla/dataloader/gr00t_lerobot
laravla/dataloader/gr00t_lerobot/README.md
laravla/dataloader/gr00t_lerobot/__init__.py
laravla/dataloader/gr00t_lerobot/bridge_annotations.py
laravla/dataloader/gr00t_lerobot/bridge_reasoning_formatter.py
laravla/dataloader/gr00t_lerobot/data_config.py
laravla/dataloader/gr00t_lerobot/datasets.py
laravla/dataloader/gr00t_lerobot/embodiment_tags.py
laravla/dataloader/gr00t_lerobot/mixtures.py
laravla/dataloader/gr00t_lerobot/schema.py
laravla/dataloader/gr00t_lerobot/transform
laravla/dataloader/gr00t_lerobot/transform/__init__.py
laravla/dataloader/gr00t_lerobot/transform/base.py
laravla/dataloader/gr00t_lerobot/transform/concat.py
laravla/dataloader/gr00t_lerobot/transform/state_action.py
laravla/dataloader/gr00t_lerobot/transform/video.py
laravla/dataloader/gr00t_lerobot/video.py
laravla/dataloader/lerobot_datasets.py
laravla/model
laravla/model/framework
laravla/model/framework/__init__.py
laravla/model/framework/base_framework.py
laravla/model/framework/laravla.py
laravla/model/framework/latent_analysis_mixin.py
laravla/model/framework/share_tools.py
laravla/model/modules
laravla/model/modules/action_model
laravla/model/modules/action_model/DiTActionHeader.py
laravla/model/modules/action_model/DiT_modules
laravla/model/modules/action_model/DiT_modules/diffusion_utils.py
laravla/model/modules/action_model/DiT_modules/gaussian_diffusion.py
laravla/model/modules/action_model/DiT_modules/models.py
laravla/model/modules/action_model/DiT_modules/respace.py
laravla/model/modules/action_model/DiT_modules/timestep_sampler.py
laravla/model/modules/action_model/GR00T_ActionHeader.py
laravla/model/modules/action_model/LayerwiseFM_ActionHeader.py
laravla/model/modules/action_model/MLP_ActionHeader.py
laravla/model/modules/action_model/__init__.py
laravla/model/modules/action_model/fast_ActionHeader.py
laravla/model/modules/action_model/flow_matching_head
laravla/model/modules/action_model/flow_matching_head/__init__.py
laravla/model/modules/action_model/flow_matching_head/action_encoder.py
laravla/model/modules/action_model/flow_matching_head/cross_attention_dit.py
laravla/model/modules/dino_model
laravla/model/modules/dino_model/dino.py
laravla/model/modules/dino_model/dino_transforms.py
laravla/model/modules/projector
laravla/model/modules/projector/QFormer.py
laravla/model/modules/projector/__init__.py
laravla/model/modules/vlm
laravla/model/modules/vlm/QWen2_5.py
laravla/model/modules/vlm/QWen3.py
laravla/model/modules/vlm/__init__.py
laravla/model/modules/vlm/tools
laravla/model/modules/vlm/tools/add_qwen_special_tokens
laravla/model/modules/vlm/tools/add_qwen_special_tokens/README.md
laravla/model/modules/vlm/tools/add_qwen_special_tokens/add_special_tokens_to_qwen.py
laravla/model/modules/vlm/tools/add_qwen_special_tokens/fast_tokens.txt
laravla/model/tools.py
laravla/training
laravla/training/__init__.py
laravla/training/train.py
laravla/training/trainer_utils
laravla/training/trainer_utils/__init__.py
laravla/training/trainer_utils/cot_mode_utils.py
laravla/training/trainer_utils/overwatch.py
laravla/training/trainer_utils/trainer_tools.py
pyproject.toml
pyrightconfig.json
requirements.txt
scripts
scripts/run_bridge_multistage.sh
scripts/run_laravla_bridge.sh
scripts/run_laravla_libero.sh
scripts/run_libero_multistage.sh
````
