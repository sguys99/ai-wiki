---
title: "sii-research/tau-0-vla"
type: repo
year: 2026
category: physical-ai
raw_path: raw/repos/sii-research-tau-0-vla.md
raw_filename: "sii-research-tau-0-vla.md"
source_collection: external
org: "sii-research"
repo: "tau-0-vla"
url: "https://github.com/sii-research/tau-0-vla"
license: "Apache-2.0"
tags: [physical-ai, vla, world-model, manipulation]
---

# τ₀-VLA: a Hierarchical Robot Foundation Model with World-Model-Guided Test-Time Computation

<div id="top" align="center">

![τ₀-VLA overview](assets/overview.png)

<a href="https://tau0-vla.github.io/"><img src="https://img.shields.io/badge/Project_Website-tau0_VLA-blue" height="25" alt="Project Website"></a> &nbsp; <a href="https://arxiv.org/abs/2608.16885"><img src="https://img.shields.io/badge/Paper-tau0_VLA-red" height="25" alt="Paper"></a> &nbsp; <a href="https://huggingface.co/sii-research/tau-0-vla"><img src="https://img.shields.io/badge/Weight-Hugging_Face-orange" height="25" alt="Model Weights"></a>

</div>

This repo is the official implementation of **τ₀-VLA: a Hierarchical Robot
Foundation Model with World-Model-Guided Test-Time Computation**.

## News

- **[2026.09.21]** We release the **high-level proposal and world model**, with
  weights, inference and fine-tuning code. See the [high-level guide](high_level/README.md)
  for setup and usage.

- **[2026.09.20]** We release **LIBERO post-training and simulation evaluation**.
  See the [LIBERO guide](configs/libero/README.md) for checkpoints, setup,
  and evaluation results.

- **[2026.08.19]** 📢 We plan to progressively release components of the
  high-level policy. Please stay tuned for updates.

- **[2026.07.27]** 🚀 We release the **τ₀-VLA** model
  [Paper](https://arxiv.org/abs/2608.16885),
  [Project Website](https://tau0-vla.github.io/), and
  [Hugging Face](https://huggingface.co/sii-research/tau-0-vla).

## Overview

τ₀-VLA is a hierarchical robot foundation model for long-horizon
manipulation. A memory-augmented high-level policy generates the next subtask
and uses world-model-guided test-time computation to search over alternatives
when additional reasoning is needed. A generalist low-level policy then
executes the selected subtask across robot embodiments.

The low-level policy combines a Qwen3.5 vision-language backbone with a
Mixture-of-Transformers action expert trained through conditional flow
matching. It uses a unified 40-dimensional state/action space and was trained
on 40,115 hours of heterogeneous real-world robot data with multimodal
co-training.

![Hierarchical τ₀-VLA pipeline](assets/method.png)

## Model checkpoints

| Model | Description |
| --- | --- |
| [τ₀-VLA](https://huggingface.co/sii-research/tau-0-vla) | Pretrained low-level policy for robot post-training |
| [τ₀-VLA LIBERO](https://huggingface.co/sii-research/tau-0-vla-libero) | LIBERO checkpoint for simulation evaluation |
| [τ₀-VLA Proposal](https://huggingface.co/sii-research/tau-0-vla-proposal) | High-level planner with task memory and three-camera input |
| [τ₀-VLA World Model](https://huggingface.co/sii-research/tau-0-vla-world-model) | Robotics LoRA for goal-image generation |

## Installation

The reference environment uses Python 3.11, CUDA 12.8, and PyTorch 2.7.1.

```bash
git clone git@github.com:sii-research/tau-0-vla.git
cd tau-0-vla
bash scripts/setup.sh
```

## High-level components

[Proposal](high_level/proposal/README.md) predicts the next subtask and updates
memory from three camera views. [World model](high_level/world_model/README.md)
generates a goal image from the current observation and a subtask. Both include
inference and fine-tuning examples; use their separate environments.

See the [high-level quickstart](high_level/README.md) and
[example predictions](high_level/examples/README.md).

## Example data and post-training

[`example_data/`](example_data/README.md) contains a small AgiBot World subset
in LeRobot v3.0 format. The matching post-training recipe is under
[`configs/example_agibot_world_gong/`](configs/example_agibot_world_gong/README.md).

```bash
bash scripts/train.sh configs/example_agibot_world_gong/train.yaml \
    --model_name_or_path /path/to/tau-0-vla-checkpoint
```

For another dataset or robot, start from
[`configs/_template/`](configs/_template/README.md) and
[`src/tau0_vla/adapters/_template/`](src/tau0_vla/adapters/_template/README.md).
The repository also includes a complete LIBERO simulation recipe under
[`configs/libero/`](configs/libero/README.md).

## Serving and evaluation

Hardware serving uses joint-control checkpoints. LIBERO simulation uses a
dedicated end-effector (EEF) policy server.

Serve a post-trained joint-control checkpoint:

```bash
python -m deploy.server --model outputs/<run_name>
```

Run open-loop evaluation:

```bash
python deploy/openloop.py --ckpt outputs/<run_name> --no-plot
```

### LIBERO simulation evaluation

The LIBERO checkpoint fine-tunes the pretrained low-level policy for
end-effector control across Spatial, Goal, Object, and Long tasks.

See the [LIBERO guide](configs/libero/README.md) for checkpoint downloads,
model and simulator environments, evaluation commands, and benchmark results.

See [`deploy/`](deploy/README.md) for the payload and action-order contracts.

## Repository layout

```text
src/tau0_vla/
├── adapters/    embodiment-specific data layouts and deployment I/O
├── data/        LeRobot loading, prompting, masking, and normalization
├── high_level/  proposal inference, serving, and fine-tuning
├── models/      Qwen3.5 backbone and flow-matching action expert
├── trainer/     post-training entry point
├── vlm/         multimodal collation and tokenization
└── utils/       logging and run specifications
configs/         reusable template, AgiBot World example, and LIBERO recipe
deploy/          policy server and open-loop evaluation
example_data/    bundled AgiBot World subset
high_level/      component guides, high-level examples, and world-model package
scripts/         setup, training, and normalization utilities
```

Additional documentation:

- [Dataset format](src/tau0_vla/data/DATASET_FORMAT.md)
- [Data pipeline](src/tau0_vla/data/README.md)
- [Robot adapters](src/tau0_vla/adapters/README.md)

## Citation

If you find our work useful, please cite our [paper](https://arxiv.org/abs/2608.16885):

```bibtex
@misc{cai2026tau0vlahierarchicalrobotfoundation,
  title={$\tau_0$-VLA: a Hierarchical Robot Foundation Model with World-Model-Guided Test-Time Computation},
  author={Xiaowei Cai and Yunuo Cai and Bingao Chen and Jingxiao Chen and Zhi Chen
          and Siyuan Feng and Tengyu Hou and Jingshun Huang and Han Jiang and Runkun Ju
          and Dong Li and Mingxiang Li and Shaowei Li and Xinchen Li and Yifan Li
          and Yi Liu and Zhongyuan Liu and Jianlan Luo and Junwen Miao and Ruiqi Ni
          and Buqing Nie and Mingjie Pan and Xinlin Ren and Jianheng Song and Jiaxu Wang
          and Peiqi Wang and Sen Wang and Xiaoyan Wang and Dafeng Wei and Dongming Wu
          and Pengwei Xie and Pu Yang and Hangjian Ye and Xiangyu Yue and Jinyu Zhang
          and Qinglin Zhang and Xueyong Zhao and Pengfei Zhou and Yue Zhou},
  year={2026},
  eprint={2608.16885},
  archivePrefix={arXiv},
  primaryClass={cs.RO},
  url={https://arxiv.org/abs/2608.16885},
}
```

## License

Code and model weights are released under the [Apache License 2.0](LICENSE).
The bundled example data follows the license described in
[`example_data/README.md`](example_data/README.md).


<!-- ===== 하위 문서: high_level/README.md (https://raw.githubusercontent.com/sii-research/tau-0-vla/main/high_level/README.md) ===== -->

# High-level components

| Component | Input | Output | Weights |
|---|---|---|---|
| [Proposal](proposal/README.md) | Three camera images, task, memory | Next subtask and updated memory | [Qwen3.5-9B full checkpoint](https://huggingface.co/sii-research/tau-0-vla-proposal) |
| [World model](world_model/README.md) | Head-camera image and subtask | Goal image | [Step1X-Edit-v1p2 robotics LoRA](https://huggingface.co/sii-research/tau-0-vla-world-model) |

Use separate Python environments for the two components.

Prepare the bundled [high-level examples](examples/README.md):

```bash
python scripts/make_high_level_example.py
```

Run the proposal example in its environment:

```bash
python -m tau0_vla.high_level.proposal.infer \
  --model weights/proposal \
  --input outputs/high_level_example/proposal.jsonl \
  --output outputs/proposals.jsonl
```

Switch to the world-model environment to run its example:

```bash
python -m tau0_world_model.infer \
  --model weights/step1x-base \
  --lora weights/world_model/robotics-lora.safetensors \
  --input outputs/high_level_example/world_model.jsonl --output outputs/goals
```

The examples use separate validation observations: closing a microwave for
Proposal, and opening a microwave for the world model. Inspect the predicted
subtask and goal image directly. Fine-tuning examples are in separate
`proposal_sft.jsonl` and `world_model_sft.jsonl` files.

To connect the two components on your own observation, use
`scripts/proposal_to_world_model.py` to pair a selected proposal with its
head-camera image, then pass the resulting JSONL to world-model inference.


<!-- ===== 하위 문서: configs/libero/README.md (https://raw.githubusercontent.com/sii-research/tau-0-vla/main/configs/libero/README.md) ===== -->

# LIBERO post-training and evaluation

`train.yaml` fine-tunes the pretrained Tau0VLA checkpoint on LIBERO while
preserving the checkpoint's unified 40D state/action interface. It selects the
`libero_eef_robot_prompt_ft` data route defined in `data.py`.

## Native LIBERO contract

```text
state  = [eef_xyz(3), eef_axis_angle(3), gripper_qpos(2)]  # 8D
action = [delta_xyz(3), delta_axis_angle(3), gripper(1)]   # 7D
action_horizon = 10
```

The action values already represent EEF deltas, so the action route uses
`abs2relative=False` and does not subtract the current state a second time.

## Checkpoint-aligned 40D representation

The native 3D axis-angle rotation is converted to a 6D rotation
representation. Consequently, each EEF pose changes from
`xyz(3) + axis-angle(3) = 6D` to `xyz(3) + rot6d(6) = 9D`.

Both state and action then use the following model-facing layout:

| 40D slots | Meaning | Active |
| --- | --- | --- |
| `0:3` | EEF xyz or delta xyz | yes |
| `3:9` | EEF rot6d or delta rot6d | yes |
| `9:18` | reserved/padding | no, always zero |
| `18` | left gripper | yes |
| `19:40` | reserved/padding | no, always zero |

The conversion and padding pipeline is:

1. `AxisAngle2Rot6D` converts the 6D EEF pose to 9D.
2. `PadToDim(9, 18)` right-pads the EEF component so that the following
   gripper component is placed at slot `18`.
3. `state_padding_dim=40` and `action_padding_dim=40` pad the assembled
   19D vectors to the checkpoint's 40D input/output dimensions.

For state input, LIBERO's two opposing finger joints are reduced to one
opening value:

```text
gripper = 0.5 * (qpos[0] - qpos[1])
```

The active state/action indices are therefore `0:9` and `18`. In particular,
`use_action_mask_loss: true` excludes all inactive action dimensions from the
flow-matching loss, while `vla_inactive_input_zero: true` keeps those inactive
action dimensions at zero in the flow input. `zero_state_emb: false` keeps
state conditioning enabled. During deployment, predicted rot6d EEF rotations
are converted back to native 3D axis-angle commands before they are returned
to the LIBERO simulator.

## Training

Set the dataset path (or a text manifest containing one dataset path per line)
and launch training:

```bash
export TAU0_LIBERO_DATA=/path/to/libero
bash scripts/train.sh configs/libero/train.yaml \
  --model_name_or_path sii-research/tau-0-vla
```

The selected robot-aware prompt is:

```text
You are controlling a robot.
Robot type: Panda
Control mode: end-effector
Whole-body control: disabled
Task: {instruction}
```

`LiberoRobot` interprets the eight state values as six EEF values followed by
two gripper values, including when loading exports with older field metadata.

## Checkpoint

The [τ₀-VLA LIBERO checkpoint](https://huggingface.co/sii-research/tau-0-vla-libero)
is post-trained for **60,000 steps** from
[`sii-research/tau-0-vla`](https://huggingface.co/sii-research/tau-0-vla).

```bash
hf download sii-research/tau-0-vla-libero \
  --local-dir checkpoints/tau-0-vla-libero
```

Its complete inference export has the following structure:

```text
tau-0-vla-libero/
├── model.safetensors
├── config.json
├── run_spec.json
├── policy_manifest.json
├── processor_config.json
├── tokenizer.json
├── tokenizer_config.json
├── chat_template.jinja
└── finch_data_spec/libero-eef-robot-prompt-ft/
    ├── spec.json
    ├── components.json
    ├── field_descriptions.json
    └── norm_stats.json
```

For this export, `model.safetensors` has SHA-256
`e03870720cbddbd0f3be44ee929a5d23efb9bf9532f0ac1c1bf676224aacc8ec`.
The export includes the weights, normalization statistics, transforms, prompt,
and camera labels needed for inference. When exporting another checkpoint,
include the same artifacts and resolve symlinks to make the directory portable.

## Separate model and simulation environments

Use the repository's [installation instructions](../../README.md#installation)
for the model server and install its serving extras there. An example server
environment uses Python 3.12.3, PyTorch 2.7.1+cu128, Transformers 5.5.4,
NumPy 2.3.5, and an RTX 4090. Run commands from the repository root:

```bash
# In the model environment, after scripts/setup.sh:
pip install -e '.[serve]'
python -m deploy.libero_server \
  --model checkpoints/tau-0-vla-libero \
  --host 127.0.0.1 --port 8000 \
  --seed 7 --infer-mode eager --warmup-steps 1
```

The commands here use `eager`. The server also supports `optim`, its
default optimized inference mode.

The client uses a separate Python 3.10 environment with LIBERO, robosuite
1.4.0, MuJoCo 3.2.3, and NumPy 1.24.4. It does not import the model or LeRobot.
A minimal simulation setup is:

```bash
conda create -n tau0-libero-sim python=3.10 -y
conda activate tau0-libero-sim
pip install torch==2.6.0 --index-url https://download.pytorch.org/whl/cpu
pip install numpy==1.24.4 robosuite==1.4.0 mujoco==3.2.3 bddl==1.0.1 \
  gym==0.25.2 opencv-python==4.6.0.66 easydict==1.9 cloudpickle==2.1.0 \
  requests==2.34.2 tyro==1.0.16 imageio==2.37.4 imageio-ffmpeg==0.6.0 \
  pillow==12.3.0 pyyaml==6.0.3 tqdm==4.70.0

git clone https://github.com/Lifelong-Robot-Learning/LIBERO.git /path/to/LIBERO
git -C /path/to/LIBERO checkout 8f1084e3132a39270c3a13ebe37270a43ece2a01
pip install --no-deps -e /path/to/LIBERO
export PYTHONPATH=/path/to/LIBERO:${PYTHONPATH:-}
export MUJOCO_GL=egl
# The official LIBERO initial-state files contain NumPy arrays, not just tensors.
# Limit this setting to the simulator with trusted official benchmark assets.
export TORCH_FORCE_NO_WEIGHTS_ONLY_LOAD=1
python -c 'from libero.libero import benchmark; print(benchmark.get_benchmark_dict().keys())'
```

On first import, LIBERO asks where to store its paths; accept the defaults or
configure `LIBERO_CONFIG_PATH/config.yaml` for your checkout. Evaluation needs
the repository's BDDL files, assets, and initial-state files; demonstration
training datasets are not needed for these rollouts. Follow the
[upstream setup guide](https://github.com/Lifelong-Robot-Learning/LIBERO#installtion)
for benchmark assets. On headless Linux, install the system OpenGL/EGL loader
libraries (Ubuntu: `libgl1 libglx0 libglvnd0 libegl1 libopengl0`) and expose the
NVIDIA EGL driver. `libGL.so.1` or EGL import errors indicate a rendering
setup problem before any model evaluation.

## Evaluation commands and protocol

In the simulation environment, return to the Tau0VLA repository root and
evaluate all four suites with 50 rollouts per task:

```bash
for suite in libero_spatial libero_object libero_goal libero_10; do
  python -m deploy.libero.main \
    --args.host 127.0.0.1 --args.port 8000 \
    --args.task-suite-name "$suite" \
    --args.seed 7 --args.replan-steps 8 \
    --args.episode-start 0 --args.num-trials-per-task 50 \
    --args.video-out-path "outputs/libero_eval/$suite" || exit 1
done
```

The four suites contain 40 tasks, totaling 2,000 episodes. The CLI uses the
`--args.` prefix shown above; `python -m deploy.libero.main --help` lists all
options. `--args.episode-start` selects the first initial-state index.

| Display name | CLI suite | Tasks | Maximum action steps |
| --- | --- | ---: | ---: |
| Spatial | `libero_spatial` | 10 | 220 |
| Object | `libero_object` | 10 | 280 |
| Goal | `libero_goal` | 10 | 300 |
| Long | `libero_10` | 10 | 520 |

`libero_90` is also supported (400 steps), but is excluded from the four-suite
average. All runs use 10 settling steps, 256×256 simulator renders, a 180°
rotation for both cameras, and PIL bilinear resizing to 224×224. The checkpoint
predicts 10 actions; the client executes 8 before replanning. Native gripper
commands are passed through without an extra sign flip. The simulator and
policy RNGs are reset to seed 7 at each episode, independently of prior
episodes. Use one client per server process;
concurrent clients would share its policy RNG.

Each output directory contains:

- `run.json`: arguments, client code revision/hash, and server/weight metadata;
- `episodes.jsonl`: task, initial-state index, success, exception, step count,
  and video filename for every attempted episode;
- `results.json`: running per-task counts and exception totals;
- `results.txt`: final aggregate success rate after normal completion;
- one MP4 per episode with captured frames, including unsuccessful rollouts.

Existing episode records are protected from overwrite. Setup/RPC/action/video
errors stop the run with a nonzero exit code and leave the completed episode
records available for inspection.

## Evaluation results

Success rates (%) over 50 rollouts per task:

| Spatial | Goal | Object | Long (`libero_10`) | Average |
| ---: | ---: | ---: | ---: | ---: |
| 97.40 | 98.20 | 98.80 | 95.00 | 97.35 |
