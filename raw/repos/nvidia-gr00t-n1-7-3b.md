---
title: "GR00T-N1.7-3B (nvidia/GR00T-N1.7-3B, Hugging Face model card)"
type: repo
year: 2026
category: physical-ai
raw_path: raw/repos/nvidia-gr00t-n1-7-3b.md
raw_filename: "nvidia-gr00t-n1-7-3b.md"
source_collection: external
org: "nvidia"
repo: "GR00T-N1.7-3B (Hugging Face model)"
url: "https://huggingface.co/nvidia/GR00T-N1.7-3B"
license: "NVIDIA Open Model License Agreement"
tags: []
---

> 수집 메모 — 사용자의 명시적 URL 지시에 따라 `huggingface.co/nvidia/GR00T-N1.7-3B/raw/main/README.md` 를 그대로 받아 저장했다 (CLAUDE.md rule #1 의 자료 수집 예외). 본문은 원문 그대로이며 요약, 번역, 윤문하지 않았다. 수집 시각 2026-10-26. Hugging Face API 기준 저장소 생성 2026-02-25, 최종 수정 2026-04-23, pipeline_tag `robotics`, tags safetensors, Gr00tN1d7, robotics, arxiv:2503.14734, 다운로드 78,969, like 172. 저장소 파일은 `.gitattributes`, `EXPLAINABILITY.md`, `LICENSE`, `PRIVACY.md`, `README.md`, `SAFETY_and_SECURITY.md`, `SUCCESS`, `config.json`, `embodiment_id.json`, `experiment_cfg/`(conf.yaml, config.yaml, dataset_statistics.json, final_model_config.json, final_processor_config.json, initial_actions.npz), `latest`, `model-00001-of-00002.safetensors`, `model-00002-of-00002.safetensors`, `model-architecture.png`, `model.safetensors.index.json`, `processor_config.json`, `scheduler.pt`, `statistics.json`, `trainer_state.json`, `training_args.bin`, `wandb_config.json`, `zero_to_fp32.py` 이다. 본문 아래에 같은 저장소의 `config.json` 과 `embodiment_id.json` 전문을 부록으로 함께 수집했다.

---

---
tags:
- robotics
---

<div align="center">
  <a href="https://github.com/NVIDIA/Isaac-GR00T">
    <img src="https://cdn-uploads.huggingface.co/production/uploads/67b8da81d01134f89899b4a7/8bFQa2ZIGCsOQQ2ho2N_U.png">
  </a>
  <div align="center">
  <a href="https://github.com/NVIDIA/Isaac-GR00T">
    <img src="https://img.shields.io/badge/GitHub-grey?logo=GitHub" alt="GitHub Badge">
  </a>
  <a href="https://developer.nvidia.com/isaac/gr00t">
    <img src="https://img.shields.io/badge/Website-green" alt="Website Badge">
  </a>
  <!-- <a href=""">
    <img src="https://img.shields.io/badge/Project%20Page-blue?style=plastic" alt="Project Page Badge">
  </a>
  <a href="">
    <img src="https://img.shields.io/badge/Research_Blog-black?style=flat" alt="Research Blog Badge">
  </a>
  <a href="">
    <img src="https://img.shields.io/badge/Dataset-Overview-brightgreen?logo=googleforms" alt="Research Blog Badge">
  </a>
  -->
</div>
</div>

# Model Overview

<p align="center">
  <img src="https://cdn-uploads.huggingface.co/production/uploads/67b8da81d01134f89899b4a7/ZCLLXZk2LQBG0YH_BmiIN.gif"
       style="width:100%; max-width:1000px; height:auto;">
</p>

## Description:
NVIDIA Isaac GR00T N1.7 is an open foundation model for generalized humanoid robot reasoning and skills. This cross-embodiment model takes multimodal input, including language and images, to perform manipulation tasks in diverse environments. Developers and researchers can post-train GR00T N1.7 with real or synthetic data for their specific humanoid robot or task.

Isaac GR00T N1.7 is the medium-sized version of our model built using pre-trained vision and language encoders, and uses a flow matching action transformer to model a chunk of actions conditioned on vision, language and proprioception. 

A detailed description of the Isaac GR00T N1.X architecture is provided in the GROOT N1 White Paper (https://arxiv.org/abs/2503.14734). 

This model is ready for commercial/non-commercial use.

**Model Developer**: NVIDIA

## Model Versions
The Isaac GR00T N1.7 model family includes the following 4 models:

### GR00T N1.7 – SimplerEnv Bridge

**Description**  
N1.7 post-trained model using the **Bridge Dataset** in SimplerEnv.

**Post-Training Data**  
https://huggingface.co/datasets/IPEC-COMMUNITY/bridge_orig_lerobot

**Dataset Summary**  
A LeRobot-format conversion of **BridgeData V2**, originally containing **60,096 trajectories** of robot manipulation across **24 environments**.

### GR00T N1.7 – SimplerEnv Fractal

**Description**  
N1.7 post-trained model using the **Fractal Dataset** in SimplerEnv.

**Post-Training Data**  
https://huggingface.co/datasets/IPEC-COMMUNITY/bridge_orig_lerobot

**Dataset Summary**  
A LeRobot-format conversion of **BridgeData V2**, originally containing **60,096 trajectories** of robot manipulation across **24 environments**.

### GR00T N1.7 – Droid
**Description**  
N1.7 post-trained model using the **DROID Dataset**.

**Post-Training Data**  
https://droid-dataset.github.io/

**Dataset Summary**  
A large-scale **“in-the-wild” robot manipulation dataset** with approximately **76,000 demonstration trajectories (~350 hours)** of interaction data, collected across **564 distinct scenes in 52 buildings**, covering **86 manipulation tasks** from natural-language instructions.

### GR00T N1.7 – LIBERO
**Description**  
N1.7 post-trained model using the **LIBERO Dataset**.

**Post-Training Data**  
https://github.com/Lifelong-Robot-Learning/LIBERO

**Dataset Summary**  
A benchmark for **lifelong robot learning**, providing **130 language-conditioned manipulation tasks** grouped into multiple task suites.  
Includes **human-teleoperated demonstrations** designed to evaluate **knowledge transfer and continual learning** in robotic agents.

## License
This model is released under the  [NVIDIA Open Model License Agreement](https://www.nvidia.com/en-us/agreements/enterprise-software/nvidia-open-model-license/).


### Deployment Geography:
Global

### Use Case:
Researchers, Academics, Open-Source Community: AI-driven robotics research and algorithm development.
Developers: Integrate and customize AI for various robotic applications.
Startups & Companies: Accelerate robotics development and reduce training costs.

### Release Date:
* Github via https://github.com/NVIDIA/Isaac-GR00T
* Huggingface via https://huggingface.co/collections/nvidia/gr00t-n17 

## Computational Load (Internal Only: For NVIDIA Models Only)
Cumulative Compute: Follow Instructions
 Estimated Energy and Emissions for Model Training: Follow Instructions
Total kWh:
64 GB200 nodes * 4 gpus per node x 1200W x 0.001 x 0.8 x 120 hours * 1.4 =  41288 kWh
Total Emission:
410.5 * 41288 * 0.000001 = 16.949 tCO2e

## Model Architecture:

**GR00T-N1.7 VLM backbone is now [Cosmos-Reason2-2B](https://huggingface.co/nvidia/Cosmos-Reason2-8B)**

**Network Architecture:** 

The schematic diagram is shown in the illustration above.
Red, Green, Blue (RGB) camera frames are processed through a pre-trained vision transformer (SigLip2).
Text is encoded by a pre-trained transformer (T5)
Robot proprioception is encoded using a multi-layer perceptron (MLP) indexed by the embodiment ID. To handle variable-dimension proprioception, inputs are padded to a configurable max length before feeding into the MLP.
Actions are encoded and velocity predictions decoded by an MLP, one per unique embodiment.
The flow matching transformer is implemented as a diffusion transformer (DiT), in which the diffusion step conditioning is implemented using adaptive layernorm (AdaLN).

![Model Architecture](model-architecture.png)

**Number of Model Parameters:** 3,000,000,000

## Input:
**Input Type(s):**
-Vision: Image Frames
-State: Robot Proprioception
-Language Instruction: Text
-Embodiment ID: Integer

**Input Format:**
-Vision: Variable number of uint8 image frames, coming from robot cameras
-State: Floating Point
-Language Instruction: String
-Embodiment ID: Integer indicating which of the training embodiments is observed

**Input Parameters:**
-Vision: Two-Dimensional (2D) - Red, Green, Blue (RGB)
-State: One-Dimensional (1D) - Floating number vector
-Language Instruction: One-Dimensional (1D) - String
-Embodiment ID: One-Dimensional (1D) - Integer

## Output:
**Output Type(s):** Actions

**Output Format** Continuous-value vectors

**Output Parameters:** [Two-Dimensional (2D)] <br>

**Other Properties Related to Output:** Continuous-value vectors correspond to different motor controls on a robot, which depends on Degrees of Freedom of the robot embodiment.

Our AI models are designed and/or optimized to run on NVIDIA GPU-accelerated systems. By leveraging NVIDIA’s hardware (e.g. GPU cores) and software frameworks (e.g., CUDA libraries), the model achieves faster training and inference times compared to CPU-only solutions. <br>

## Software Integration:

**Runtime Engine(s):** PyTorch

**Supported Hardware Microarchitecture Compatibility:** 
All of the below:
* NVIDIA Ampere
* NVIDIA Blackwell
* NVIDIA Jetson
* NVIDIA Hopper
* NVIDIA Lovelace

**[Preferred/Supported] Operating System(s):**
* Linux

The integration of foundation and fine-tuned models into AI systems requires additional testing using use-case-specific data to ensure safe and effective deployment. Following the V-model methodology, iterative testing and validation at both unit and system levels are essential to mitigate risks, meet technical and functional requirements, and ensure compliance with safety and ethical standards before deployment.

# Model Version
GR00T N1.7 EA

# Training and Evaluation Datasets:
The total size (in number of data points): 21.6 million <br>
Total number of datasets: 13 <br>   


## Training Dataset:
GR00T Pretraining Data

**Data Collection Method by dataset:** Hybrid: Human, Robot, Simulated.

**Labeling Method by dataset:** Hybrid: Human, Automated.

**Properties:** 
* Cross-embodiment: Data collected on various robot embodiments 
* Sensor types: RGB camera, robot proprioception, robot actuator data


## Evaluation:
We evaluate in both simulation and real robot benchmarks, as defined in the White Paper (https://arxiv.org/abs/2503.14734). 

**Data Collection Method by dataset:** Hybrid: Human, Robot, Simulated.

**Labeling Method by dataset:** Hybrid: Human, Automated.

* Sim evaluation benchmarks for upper body control
* 9 DexMG Whitepaper tasks
* 24 RoboCasa simulated mobile manipulator tasks
* 24 Digital Cousin simulated GR-1 humanoid manipulation tasks 
* For sim, we automatically measure the success rate in each manipulation behavior.
* For real robot
    * Grocery packing task
    * Novel objects (unseen from training data)
    * Industrial multi-robot coordination with handoffs
    * Evaluated by human observers in the lab

## System Requirements and Performance

This section discusses the various configurations and inference runtimes for GR00T N1.7 tasks. We discuss both latency and speedup.

GR00T N1.7 Inference Timing (4 denoising steps, 1 camera):

| Device | Mode | Data Processing | Backbone | Action Head | E2E | Frequency | E2E Speedup |
|--------|------|-----------------|----------|-------------|-----|-----------|-------------|
| **dGPU** | | | | | | | |
| H100 80GB HBM3 | PyTorch Eager | 6.2 ms | 31.3 ms | 48.2 ms | 85.8 ms | 11.7 Hz | 1.00x |
| | torch.compile | 6.2 ms | 30.4 ms | 12.0 ms | 48.6 ms | 20.6 Hz | 1.77x |
| | **TensorRT (Full Pipeline)** | **6.2 ms** | **8.8 ms** | **12.3 ms** | **27.9 ms** | **35.9 Hz** | **3.08x** |
| H20 96GB HBM3 | PyTorch Eager | 5.33 ms | 30.8 ms | 47.3 ms | 83.4 ms | 12.0 Hz | 1.00x |
| | torch.compile | 5.33 ms | 31.1 ms | 13.3 ms | 49.7 ms | 20.1 Hz | 1.68x |
| | **TensorRT (Full Pipeline)** | **5.33 ms** | **14.2 ms** | **14.5 ms** | **34.0 ms** | **29.4 Hz** | **2.45x** |
| RTX Pro 6000 Blackwell | PyTorch Eager | 4.8 ms | 29.3 ms | 44.0 ms | 78.4 ms | 12.8 Hz | 1.00x |
| | torch.compile | 4.8 ms | 29.4 ms | 16.5 ms | 50.7 ms | 19.7 Hz | 1.55x |
| | **TensorRT (Full Pipeline)** | **4.8 ms** | **9.9 ms** | **13.2 ms** | **27.9 ms** | **35.9 Hz** | **2.81x** |
| RTX Pro 5000 72GB | PyTorch Eager | 8.85 ms | 54.01 ms | 63.19 ms | 126.4 ms | 7.9 Hz | 1.00x |
| | torch.compile | 8.85 ms | 55.74 ms | 20.38 ms | 84.9 ms | 11.8 Hz | 1.49x |
| | **TensorRT (Full Pipeline)** | **8.85 ms** | **14.37 ms** | **17.33 ms** | **40.5 ms** | **24.7 Hz** | **3.13x** |
| L40 | PyTorch Eager | 6.6 ms | 42.8 ms | 78.9 ms | 128.3 ms | 7.8 Hz | 1.00x |
| | torch.compile | 6.6 ms | 42.7 ms | 19.8 ms | 69.0 ms | 14.5 Hz | 1.86x |
| | **TensorRT (Full Pipeline)** | **6.6 ms** | **13.1 ms** | **18.8 ms** | **38.4 ms** | **26.0 Hz** | **3.34x** |
| L20 | PyTorch Eager | 5.7 ms | 47.58 ms | 86.92 ms | 140.3 ms | 7.1 Hz | 1.00x |
| | torch.compile | 5.7 ms | 47.2 ms | 20.18 ms | 73.1 ms | 13.7 Hz | 1.92x |
| | **TensorRT (Full Pipeline)** | **5.7 ms** | **17.27 ms** | **19.79 ms** | **42.8 ms** | **23.3 Hz** | **3.28x** |
| **Jetson / Spark** | | | | | | | |
| DGX Spark | PyTorch Eager | 13.14 ms | 38.22 ms | 74.94 ms | 126.4 ms | 7.9 Hz | 1.00x |
| | torch.compile | 13.14 ms | 39.23 ms | 56.49 ms | 108.8 ms | 9.2 Hz | 1.16x |
| | **TensorRT (Full Pipeline)** | **13.14 ms** | **33.43 ms** | **52.37 ms** | **98.6 ms** | **10.1 Hz** | **1.28x** |
| AGX Thor | PyTorch Eager | 8.21 ms | 55.26 ms | 81.65 ms | 144.9 ms | 6.9 Hz | 1.00x |
| | torch.compile | 8.21 ms | 55.59 ms | 64.66 ms | 128.4 ms | 7.8 Hz | 1.13x |
| | **TensorRT (Full Pipeline)** | **8.21 ms** | **28.89 ms** | **56.64 ms** | **93.8 ms** | **10.7 Hz** | **1.54x** |
| Orin | PyTorch Eager | 9.45 ms | 127.6 ms | 205.39 ms | 342.8 ms | 2.9 Hz | 1.00x |
| | torch.compile | 9.45 ms | 128.59 ms | 78.94 ms | 217.0 ms | 4.6 Hz | 1.58x |
| | **TensorRT (DiT-only)** | **9.45 ms** | **128.38 ms** | **78.6 ms** | **216.5 ms** | **4.6 Hz** | **1.58x** |

> **Note:** Orin uses DiT-only TensorRT (`--inference-mode tensorrt`) because TRT 10.3 does not support the backbone engine. All other platforms use the full pipeline (`--inference-mode trt_full_pipeline`).


## Inference:
**Engine:** PyTorch
**Test Hardware:** A6000

## Ethical Considerations:
NVIDIA believes Trustworthy AI is a shared responsibility and we have established policies and practices to enable development for a wide array of AI applications.  When downloaded or used in accordance with our terms of service, developers should work with their internal model team to ensure this model meets requirements for the relevant industry and use case and addresses unforeseen product misuse.  

Users are responsible for model inputs and outputs. Users are responsible for ensuring safe integration of this model, including implementing guardrails as well as other safety mechanisms, prior to deployment.

For more detailed information on ethical considerations for this model, please see the Model Card++ Explainability, Bias, Safety & Security, and Privacy Subcards.

Please report model quality, risk, security vulnerabilities or NVIDIA AI Concerns [here](https://www.nvidia.com/en-us/support/submit-security-vulnerability/).

---

## 부록 A. config.json (수집 원문)

```json
{
  "action_horizon": 40,
  "add_pos_embed": true,
  "apply_sincos_state_encoding": false,
  "architectures": [
    "Gr00tN1d7"
  ],
  "attn_dropout": 0.2,
  "backbone_embedding_dim": 2048,
  "color_jitter_params": {
    "brightness": 0.3,
    "contrast": 0.4,
    "hue": 0.08,
    "saturation": 0.5
  },
  "crop_fraction": 0.95,
  "diffusion_model_cfg": {
    "attention_head_dim": 48,
    "dropout": 0.2,
    "final_dropout": true,
    "interleave_self_attention": true,
    "norm_type": "ada_norm",
    "num_attention_heads": 32,
    "num_layers": 32,
    "output_dim": 1024,
    "positional_embeddings": null
  },
  "dtype": "bfloat16",
  "exclude_state": false,
  "formalize_language": true,
  "hidden_size": 1024,
  "image_crop_size": [
    230,
    230
  ],
  "image_target_size": [
    256,
    256
  ],
  "letter_box_transform": false,
  "load_bf16": true,
  "max_action_dim": 132,
  "max_num_embodiments": 32,
  "max_seq_len": 1024,
  "max_state_dim": 132,
  "model_dtype": "bfloat16",
  "model_type": "Gr00tN1d7",
  "noise_beta_alpha": 1.5,
  "noise_beta_beta": 1.0,
  "noise_s": 0.999,
  "num_inference_timesteps": 4,
  "num_timestep_buckets": 1000,
  "random_history_crop": true,
  "random_rotation_angle": 0,
  "reproject_vision": false,
  "rtc_ramp_rate": 6.0,
  "select_layer": 16,
  "shortest_image_edge": 256,
  "state_dropout_prob": 0.2,
  "state_gaussian_noise_std": 0.0,
  "transformers_version": "4.57.1",
  "tune_diffusion_model": true,
  "tune_linear": true,
  "tune_llm": true,
  "tune_projector": true,
  "tune_top_llm_layers": 0,
  "tune_visual": true,
  "tune_vlln": true,
  "use_albumentations": true,
  "use_alternate_vl_dit": true,
  "use_flash_attention": true,
  "use_future_tokens": false,
  "use_mean_std": false,
  "use_percentiles": true,
  "use_vl_self_attention": true,
  "use_vlln": true,
  "vl_self_attention_cfg": {
    "attention_head_dim": 64,
    "dropout": 0.2,
    "final_dropout": true,
    "num_attention_heads": 32,
    "num_layers": 4,
    "positional_embeddings": null
  },
  "model_name": "nvidia/Cosmos-Reason2-2B"
}

```

## 부록 B. embodiment_id.json (수집 원문)

```json
{
  "robocasa_panda_omron": 13,
  "oxe_droid": 17,
  "oxe_fractal": 18,
  "oxe_language_table": 19,
  "oxe_bridge": 20,
  "unknown": 22,
  "gr1_unified": 20,
  "agibot": 26,
  "sim_behavior_r1_pro": 23,
  "xdof": 24,
  "xdof_oss_data": 25,
  "unitree_g1_full_body_with_waist_height_nav_cmd": 25,
  "real_r1_pro_sharpa": 27,
  "real_r1_pro_sharpa_add_view": 27,
  "real_r1_pro_sharpa_relative_arm_joint": 26,
  "real_r1_pro_sharpa_delta_eef": 26,
  "real_r1_pro_sharpa_absolute_eef": 26,
  "real_r1_pro_sharpa_meanstd": 26,
  "real_r1_pro_sharpa_relative_eef": 26,
  "real_r1_pro_sharpa_relative_eef_add_view": 26,
  "real_r1_pro_sharpa_relative_eef_relative_hand": 26,
  "real_r1_pro_sharpa_relative_eef_human": 26,
  "real_r1_pro_sharpa_relative_eef_human_add_view": 26,
  "real_r1_pro_sharpa_relative_eef_human_relative_hand": 26,
  "real_r1_pro_sharpa_relative_eef_egodex": 26,
  "real_r1_pro_sharpa_relative_eef_egodex_relative_hand": 26,
  "real_r1_pro_sharpa_relative_eef_egodex_wrist_only": 26,
  "real_r1_pro_sharpa_relative_eef_maxinsights": 26,
  "real_r1_pro_sharpa_relative_eef_maxinsights_relative_hand": 26,
  "real_r1_pro_sharpa_relative_eef_mecka": 26,
  "real_r1_pro_sharpa_relative_eef_mecka_relative_hand": 26,
  "real_g1_relative_eef_absolute_joints": 25,
  "real_g1_relative_eef_absolute_joints_wrist_cam": 25,
  "real_g1_relative_eef_relative_joints": 25,
  "real_r1_pro_sharpa_relative_eef_relative_hand_relative_joint": 26,
  "real_r1_pro_sharpa_relative_joint": 29,
  "oxe_droid_relative_eef_relative_joint": 24,
  "oxe_droid_relative_eef_relative_joint_swapped": 24,
  "oxe_droid_relative_eef_relative_joint_upweight_z": 24,
  "oxe_droid_relative_eef_relative_joint_upweight_z_swapped": 24,
  "oxe_droid_relative_eef_relative_joint_3view": 24,
  "oxe_droid_relative_eef_relative_joint_3view_swapped": 24,
  "oxe_droid_relative_eef": 24,
  "oxe_droid_joint_position_relative": 24,
  "xdof_relative_eef_relative_joint": 27,
  "xdof_relative_eef_relative_joint_subtask": 27,
  "xdof_relative_eef": 27,
  "xdof_relative_joint": 28,
  "simpler_env_google": 0,
  "simpler_env_widowx": 1,
  "libero_sim": 2,
  "droid_sim": 3
}
```
