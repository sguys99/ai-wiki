---
title: "UnifoLM-WLA-1.0"
type: article
year: 2026
category: physical-ai
raw_path: raw/articles/unigen-x-2026-unifolm-wla-1-0.md
raw_filename: "unigen-x-2026-unifolm-wla-1-0.md"
source_collection: external
author: "Unitree Robotics"
url: "https://unigen-x.github.io/unifolm-wla.github.io/"
publisher: "unigen-x.github.io"
fetched_at: "2026-09-14T08:18:36+0900"
extractor_tier: "chrome"
tags: []
figures:
  - id: fig01
    file: assets/unigen-x-2026-unifolm-wla-1-0/fig01.png
    raw: raw/articles/unigen-x-2026-unifolm-wla-1-0-figures/fig01.png
    caption: "Robot-view image at t0"
    strategy: fetched
    curated: false
  - id: fig02
    file: assets/unigen-x-2026-unifolm-wla-1-0/fig02.png
    raw: raw/articles/unigen-x-2026-unifolm-wla-1-0-figures/fig02.png
    caption: "Robot-view image at t1"
    strategy: fetched
    curated: false
  - id: fig03
    file: assets/unigen-x-2026-unifolm-wla-1-0/fig03.png
    raw: raw/articles/unigen-x-2026-unifolm-wla-1-0-figures/fig03.png
    caption: "Optical flow from t0 to t1"
    strategy: fetched
    curated: false
  - id: fig04
    file: assets/unigen-x-2026-unifolm-wla-1-0/fig04.png
    raw: raw/articles/unigen-x-2026-unifolm-wla-1-0-figures/fig04.png
    caption: "Dynamic-region mask overlay"
    strategy: fetched
    curated: false
  - id: fig05
    file: assets/unigen-x-2026-unifolm-wla-1-0/fig05.png
    raw: raw/articles/unigen-x-2026-unifolm-wla-1-0-figures/fig05.png
    caption: "Dynamic-region mask isolated from the RGB image"
    strategy: fetched
    curated: false
  - id: fig06
    file: assets/unigen-x-2026-unifolm-wla-1-0/fig06.png
    raw: raw/articles/unigen-x-2026-unifolm-wla-1-0-figures/fig06.png
    caption: ""
    strategy: fetched
    curated: false
  - id: fig07
    file: assets/unigen-x-2026-unifolm-wla-1-0/fig07.png
    raw: raw/articles/unigen-x-2026-unifolm-wla-1-0-figures/fig07.png
    caption: ""
    strategy: fetched
    curated: false
  - id: fig08
    file: assets/unigen-x-2026-unifolm-wla-1-0/page-full.png
    raw: raw/articles/unigen-x-2026-unifolm-wla-1-0-figures/page-full.png
    caption: "전체 페이지 스크린샷"
    strategy: screenshot
    curated: false
---

> 수집 메모 — `scripts/fetch_article.py` 가 사용자의 명시적 URL 지시에 따라 가져왔다 (CLAUDE.md rule #1 의 자료 수집 예외). 추출 tier: `chrome`. 본문은 원문 그대로이며 요약·번역·윤문하지 않았다.
> `category` 는 임시값이므로 Step 3 에서 확정할 것.

---

General-Purpose Humanoid Robot Foundation Model

# UnifoLM-WLA-1.0 One Model Driven, Whole-Body Coordination

[Code](https://github.com/unitreerobotics/unifolm-wla)[Models](https://huggingface.co/collections/unitreerobotics/unifolm-wla-10)[Datasets](https://huggingface.co/collections/unitreerobotics/unifolm-wla-10)

UnifoLM-WLA-1.0 is Unitree Robotics' comprehensively upgraded, next-generation general-purpose humanoid robot foundation model with 6B parameters. Built on large-scale general multimodal perception and understanding data and interaction-centric world modeling, it substantially advances spatial perception and understanding, achieving leading results across multiple embodied reasoning benchmarks. Trained on approximately 2,500 hours of high-quality real-robot data. A single model accomplishes 64 tasks spanning tabletop manipulation and whole-body manipulation. It supports parallel grippers and two types of dexterous hands, demonstrating strong generalization across tasks and end-effector configurations.

6Bmodel parameters

5M+ER samples

≈2,500hRobot data

ER Model · Embodied Reasoner

## Understand the World, Connect with Action.

A unified multimodal model brings together embodied reasoning, future dynamic-region prediction, and discrete action learning to jointly strengthen spatial perception, interaction prediction, and action generation, providing a unified vision–language–action representation for subsequent WLA training.

### Embodied Reasoning

Across 16 multimodal perception and understanding benchmarks, UnifoLM-ER-1 leads open-source models on seven and delivers overall performance comparable to leading proprietary models. Built on Qwen3-VL-4B, UnifoLM-ER-1 is trained on more than 5 million samples spanning image point prediction, object detection, multi-image reasoning, 2D trajectory prediction, 3D object detection, and multi-image spatial question answering. These data are co-trained with general image–text data, preserving broad vision-language capabilities while substantially improving spatial understanding and reasoning in embodied environments.

 <div class="training-mix" aria-label="ER 模型训练数据构成"> <strong class="mono">Training mix</strong> <div class="training-items mono"> <span>Point Prediction</span><span>Object Detection</span><span>Multi-image Reasoning</span><span>2D Trajectory</span><span>3D Detection</span><span>Spatial QA</span><span>General VLM Data</span> </div> </div> 

### Benchmark results

ModelOpen SourceSpatial UnderstandingMultimodal Understanding

RoboVQAEgo-Plan2RefSpatial-
BenchWhere2PlacePixmo-PointBLINKCV-BenchEmbSpatialRoboSpatialSATVSI-BenchVSRERQARealWorld
QAMMEMMMU_VAL

UnifoLM-ER-1-4BYes62.455.161.782.073.893.4†88.688.973.176.054.288.150.069.82223.354.7

RoboBrain2.0-7B*Yes30.033.2342.263.654.783.985.776.354.275.336.184.0/69.42057.444.4

Robix-7B*No63.6//41.929.587.686.577.4/71.144.683.342.570.72332.8/

Pelican-7B*Yes31.833.722.357.320.4/79.473.257.552.052.882.239.869.32141.951.1

Cosmos-R1-7B*Yes38.826.05.62.98.2/76.768.942.482.725.482.4/67.62157.437.4

Cosmos3-Super-64B*Yes//57.071.0/90.3†88.0/70.0/60.9/51.2///

Qwen3-VL-4B*Yes47.740.746.663.048.385.0†85.179.661.768.759.381.641.371.02325.257.8

Qwen3-VL-8B*Yes43.349.754.261.951.073.8†86.278.566.967.359.483.245.870.62412.562.3

Embodied-R1-3B*Yes51.826.539.769.549.478.5†82.767.447.476.326.6/35.2///

Embodied-R1.5-8B*Yes61.053.854.274.064.883.0†86.978.169.774.756.1/46.0///

Molmo2-ER-4B*Yes//52.554.0/85.7†87.878.8/78.074.5/46.8///

Hy-Embodied-VLM-1.0
30B-A3B*Yes/49.653.465.064.687.3†89.782.769.478.0//60.8///

MiMo-Emb-7B*Yes62.043.048.063.642.3581.388.276.261.778.648.579.046.766.32320.826.4

Thinker-4B*Yes62.763.761.072.057.484.686.380.270.872.765.481.5/71.92323.446.2

 <tr> <td class="model-col">GenieReasoner-3B<sup>*</sup></td> <td data-i18n-source="No" data-i18n-zh="否">No</td> <td>/</td><td>/</td><td>/</td><td>/</td><td>/</td><td>74.8</td><td>83.9</td><td>70.7</td><td>/</td><td>/</td><td>/</td><td>/</td><td>/</td><td>/</td><td>/</td><td>/</td> </tr> 

Wall-OSS-0.5-3B*Yes///15.0////////3344//

Lumo-1-Stage1-7B*No//51.069.1/82.486.475.662.674.7//////

Gemini-ER 2‡No//35.4//90.6†90.481.451.1///71.0///

Gemini-ER 1.5‡No//41.848.0//83.673.457.762.039.9/47.0///

Gemini 2.5 Pro‡No//33.637.0/88.6†85.978.071.374.751.1/56.0///

Gemini 2.5 Flash‡No//41.248.0/80.3†85.576.273.473.345.3/47.5///

Gemini 3.1 Pro‡No//70.061.0/86.1†88.6/65.1/47.5/65.2///

GPT-5.6-sol‡No//58.351.1/85.6†85.280.766.821.3//64.8///

GPT-6-Astra‡No//79.669.0/90.4†87.383.373.431.3//77.7///

Results are sourced from the models' official technical reports or publicly available papers.

Results were obtained through tests using the models' official APIs.

BLINK scores are averaged over the Relative Depth and Spatial Relation subtasks only; all reported results were obtained in our own testing.

### Dynamic Region Prediction

We use optical flow to extract dynamic regions that capture future scene changes, then train a VQ-VAE to encode them into fixed-length sequences of discrete tokens. Conditioned on the current image and a task description or action, the VLM directly predicts mask tokens for future dynamic regions, focusing on interaction subjects and the scene changes they induce to enable interaction-centric world modeling.

LIVE PIPELINE

01 / OPTICAL-FLOW SUPERVISION

![Robot-view image at t0](assets/dynamic_region_prediction/head_left_t0.png)

IMAGE_t0

![Robot-view image at t1](assets/dynamic_region_prediction/head_left_t1.png)

IMAGE_t1

ESTIMATEOptical
Flow

![Optical flow from t0 to t1](assets/dynamic_region_prediction/optical_flow_t0_t1.png)

OPTICAL FLOW

![Image at t1](assets/dynamic_region_prediction/head_left_t1.png)

![Dynamic-region mask overlay](assets/dynamic_region_prediction/mask_overlay_head_left_t1.png)

![Dynamic-region mask isolated from the RGB image](assets/dynamic_region_prediction/dynamic_mask_only.png)

DYNAMIC MASK

DISCRETIZEVQ-VAE

TaskORAction

IMAGE_t0 + CONDITIONVLM

02 / FUTURE CHANGE PREDICTION

0821370419421126FUTURE MASK TOKENS

Clean table01

Fold towel02

Install phone03

Place plates04

## Discrete Action Learning

We partition the unified action space into three components: end-effector (EEF) poses, end-effector joints, and lower-body joints. A separate residual vector quantization (RVQ) model is trained for each component to discretize action sequences. Building on UnifoLM-ER-1, we introduce discrete action tokens and mask tokens for future dynamic regions, jointly aligning visual, language, and action representations within a single VLM to obtain the UnifoLM-ER-Flow model.

LIVE ENCODING

CONTINUOUS MOTIONVECTOR QUANTIZATIONDISCRETE TOKENS

EEF trajectory

RVQ

<EEF_START>1842073156<EEF_END>

Gripper / dexterous hand

RVQ

<HAND_START>0429511638<HAND_END>

Lower-body motion

RVQ

<LOWER_START>2711440322<LOWER_END>

Temporal alignmentShared timesteps · Synchronously fed into VLM

WLA Model

## Multi-Source Data, One Model.

UnifoLM-WLA-1.0 builds on the UnifoLM-ER-Flow multimodal backbone and incorporates an MMDiT action expert. It is trained on approximately 2,500 hours of high-quality real-robot data—including the [Unitree Open Datasets](https://huggingface.co/unitreerobotics/datasets) and [BitRobot-HIW-500](https://bitrobot-foundation.github.io/humanoids-in-the-wild-500-hours/), etc.—covering diverse robot embodiments and scenarios. Through a unified action space, it enables cross-embodiment prior transfer and jointly models perception and understanding, interaction prediction, and action generation, balancing embodied manipulation capabilities with general multimodal perception and reasoning.

## Model Architecture

 <p>真机数据、具身推理数据与通用 VLM 数据共同构成训练配方。所有机器人、任务和末端执行器共享同一套模型参数。</p> <div class="vla-training-strip" aria-label="VLA training setup" data-i18n-aria-source="VLA training setup" data-i18n-aria-zh="VLA 模型架构"> <div class="vla-fact"><b>≈ 2,500h</b><span class="mono" data-i18n-source="Multi-embodiment robot data" data-i18n-zh="多本体真机数据">Multi-embodiment robot data</span></div> <div class="vla-fact"><b data-i18n-source="Co-training" data-i18n-zh="联合训练">Co-training</b><span class="mono" data-i18n-source="Robot + general VLM data" data-i18n-zh="真机 + 通用 VLM 数据">Robot + general VLM data</span></div> <div class="vla-fact"><b data-i18n-source="Fully shared" data-i18n-zh="完全共享">Fully shared</b><span class="mono" data-i18n-source="One set of model weights" data-i18n-zh="一套模型参数">One set of model weights</span></div> </div> 

LIVE GRAPH

Language prediction

placetheplatesontherack

Discrete actions

82963118

Continuous actions

-1.71.253.141.42

UnifoLM-ER-Flow

Stop Gradient

Action ExpertMMDiT flow decoder

Image encoder

![](assets/dynamic_region_prediction/head_left_t0.png)

![](assets/dynamic_region_prediction/wrist_cam_left.png)

![](assets/dynamic_region_prediction/wrist_cam_right.png)

Prompt

State

Noise Actions

Real-robot tests · Unitree G1

## One Model Driven, Multiple Tasks, Multiple End-effectors.

A single UnifoLM-WLA-1.0 model supports both tabletop and whole-body manipulation, demonstrating smooth task execution across diverse real-robot evaluations. The videos below showcase real-robot evaluation results.

10 Whole-Body Manipulation Tasks <span class="mono" data-i18n-source="10 tasks" data-i18n-zh="10 项任务">10 tasks</span> 

Scroll to explore

Take out the trash01

Put the clothes in the washing machine.02

Organize shoes03

Tidy up the bathroom04

Tidy up the kitchen05

Make the bed06

Get the vegetables07

Put the folder into cabinet08

Place items on the shelves.09

Tidy up the sofa10

54 Table-top Manipulation Tasks <span class="mono" data-i18n-source="55 tasks" data-i18n-zh="54 项任务">54 tasks</span> 

Scroll to explore

Fold towel01

Fold cloth02

Fold pants03

Store plates04

Battery charging05

Collect paper cups06

Dismantle windmill07

Find green block08

Flower arranging09

Organize pencil case10

Organize ping pong paddles11

Organize tool wall12

Organize toolbox13

Package phone14

Picking batteries15

Play football16

Plug in plug17

Pour out medicine18

Put book on bookshelf19

Put items in cabinet20

Spell robot21

Stack cups22

Storage RealSense23

Take out food from microwave24

Tidy up desktop25

Unlock26

Unwrap gift27

Catching snacks from the conveyor belt28

Draw triangle29

Erase whiteboard30

Grab mango31

Hang up cup32

Organize chopstick rest33

Organize cola34

Organize pencil case B35

Organize seasonings36

Organizing shoes37

Place eggs38

Place fruits with color39

Put food in microwave40

Put the fruit in the basket41

Remove lollipop42

Sort building blocks43

Sort building blocks from conveyor belt44

Stack blocks RGB45

Stack orange46

Stacking bowls47

Storage glasses48

Storage shoes from conveyor belt49

Store parts50

Take out hamburger51

Turn on the desk lamp52

Unplug network cable53

Zip up bag54
