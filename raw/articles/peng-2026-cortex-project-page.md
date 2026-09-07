---
title: "Cortex: A Bidirectionally Aligned Embodied Agent Framework"
type: article
year: 2026
category: physical-ai
raw_path: raw/articles/peng-2026-cortex-project-page.md
raw_filename: "peng-2026-cortex-project-page.md"
source_collection: external
author: "Cortex Team (Jiaqi Peng 외)"
url: "https://steinate.github.io/cortex.github.io/"
publisher: "steinate.github.io"
fetched_at: "2026-09-07T09:52:39+0900"
extractor_tier: "jina"
tags: [physical-ai, vla, manipulation, robot-learning]
figures:
  - id: fig01
    file: assets/peng-2026-cortex-project-page/fig01.png
    raw: raw/articles/peng-2026-cortex-project-page-figures/fig01.png
    caption: "Cortex dataset construction with public real-world data, simulation data, self-collected data, procedural data, annotation pipeline, and interface properties."
    strategy: fetched
    curated: false
  - id: fig02
    file: assets/peng-2026-cortex-project-page/fig02.png
    raw: raw/articles/peng-2026-cortex-project-page-figures/fig02.png
    caption: "Automatic annotation pipeline for subtask segmentation and temporal alignment."
    strategy: fetched
    curated: false
  - id: fig03
    file: assets/peng-2026-cortex-project-page/fig03.png
    raw: raw/articles/peng-2026-cortex-project-page-figures/fig03.png
    caption: "Event-balanced sampling improves average total score while using fewer training samples."
    strategy: fetched
    curated: false
  - id: fig04
    file: assets/peng-2026-cortex-project-page/page-full.png
    raw: raw/articles/peng-2026-cortex-project-page-figures/page-full.png
    caption: "전체 페이지 스크린샷"
    strategy: screenshot
    curated: false
  - id: fig05
    file: assets/peng-2026-cortex-project-page/fig05.png
    raw: raw/articles/peng-2026-cortex-project-page-figures/fig05.png
    caption: "Cortex architecture with instruction, observation, memory, VLM orchestration, and VLA execution."
    strategy: fetched
    curated: false
  - id: fig06
    file: assets/peng-2026-cortex-project-page/fig06.png
    raw: raw/articles/peng-2026-cortex-project-page-figures/fig06.png
    caption: "Chemical liquid stirring real-world rollout with fourteen subtasks."
    strategy: fetched
    curated: false
---

> 수집 메모 - `scripts/fetch_article.py` 의 chrome tier 로 1차 수집한 뒤, 본문이 1,741자로 잘려 있어 jina tier(r.jina.ai) 결과로 본문을 교체했다. 스크립트의 jina 요청이 403 을 받아 같은 엔드포인트를 curl 로 취득했다 (CLAUDE.md rule #1 의 자료 수집 예외). fig05, fig06 은 jina 본문에만 등장하는 이미지라 원본 URL 에서 추가로 받았다. 본문은 원문 그대로이며 요약, 번역, 윤문하지 않았다.

---

Video

## Cortex in action

Cortex coordinate long-horizon manipulation through subtask planning, compact memory, grounded execution, and online progress verification.

Method

## A dual-system interface that both planners and executors can trust.

Cortex treats the subtask-memory pair as the contract between System-2 planning and System-1 execution. The planner is constrained to executable skills, and the executor receives local, physically grounded commands instead of a brittle global task description.

![Image 1: Cortex architecture with instruction, observation, memory, VLM orchestration, and VLA execution.](https://steinate.github.io/cortex.github.io/static/images/Architecture.png)

**Bidirectionally aligned subtask interface.** The VLM updates memory and streams subtasks; the VLA consumes the active subtask as a grounded local objective. 

1
### Executable Skill Space

Free-form instructions are standardized into 32 canonical primitives, reducing kinematic hallucinations and making planner outputs routable by the VLA harness.

2
### Tractable Metadata

Subtasks include object attributes, spatial relations, counts, and reachability priors so the high-level plan matches what the robot can physically execute.

3
### Event-balanced Training

Training balances ongoing execution frames and boundary transition frames, teaching the planner when to hold a command and when to update memory.

4
### Asynchronous Loop

System-2 runs at a slower reasoning rate while System-1 executes continuously, with harness logic for command mapping, holding, and timeout recovery.

Data

## Scalable metadata construction for long-horizon manipulation.

Cortex builds a standardized interface from public real-world data, public simulation data, self-collected robot demonstrations, and procedural generation. The pipeline annotates subtask sequences, aligns boundaries, and injects execution priors.

![Image 2: Cortex dataset construction with public real-world data, simulation data, self-collected data, procedural data, annotation pipeline, and interface properties.](https://steinate.github.io/cortex.github.io/static/images/dataset.png)

**Metadata and interface standardization.** The dataset pipeline aligns raw trajectories to executable subtasks and adds grounding signals for both executability and tractability. 

Subtask Annotation

### Visualized temporal alignment across heterogeneous trajectories.

Each clip overlays the active subtask above the current frame and uses color-coded timeline segments to expose subtask boundaries over the trajectory.

1 / 3

[Video 10](https://steinate.github.io/cortex.github.io/static/videos/vis_agibot_task_327_episode_1.mp4)

**Agibot trajectory.** Subtask labels and colored progress bars reveal action boundaries in a 4:3 rollout. 

[Video 11](https://steinate.github.io/cortex.github.io/static/videos/vis_behavior_task-0010_episode-100010.mp4)

**Behavior trajectory.** A square-view rollout demonstrates consistent subtask annotation under different video geometry. 

[Video 12](https://steinate.github.io/cortex.github.io/static/videos/vis_galaxea_adjust_air_conditioner_episode_1.mp4)

**Galaxea trajectory.** Wide-format visualization shows subtask switching for a household interaction sequence. 

Results

## State-of-the-art long-horizon autonomy across planning and control.

Cortex improves both open-loop System-2 planning quality and closed-loop task execution, with the strongest gains on tasks that require memory, subtask transitions, and physical grounding.

Step-level avg.**8.32**out of 10 Episode-level avg.**7.81**closed-loop planning LIBERO-Long**95.5%**zero-shot success RoboTwin 2.0**86.8%**overall success

System-2 Planning

### Structured subtasks keep long-horizon reasoning grounded.

Average total score across spatial, long-horizon, and counting evaluations.

**Cortex**subtask interface

Step _8.32_

Episode _7.81_

**GPT-5**foundation VLM

Step _6.27_

Episode _7.23_

**Gemini 3.1 Pro**foundation VLM

Step _6.92_

Episode _6.86_

**Qwen3-VL-8B**foundation VLM

Step _6.74_

Episode _6.29_

**8.74** Counting**8.16** Long-horizon**8.05** Spatial

Closed-loop Simulation

### Progress verification improves full-task success.

Cortex preserves high success as task horizon grows, especially on long-horizon splits.

**LIBERO-Long zero-shot**Success rate

Cortex _95.5_

OpenVLA-OFT _94.5_

MemoryVLA _93.4_

π 0.5 _92.4_

Gemini 3.1 Pro _91.0_

**RoboTwin 2.0**Short / long / overall

Method Short Long Overall

Cortex 86.0 88.0 86.8

π 0.5 82.6 83.0 82.7

X-VLA 77.1 66.3 72.8

π 0 61.5 72.6 65.9

Memory-heavy Manipulation

### Cortex keeps object order, counts, and prior state across task memory.

RMBench success rates over seven manipulation tasks, each evaluated with 100 rollouts.

**7-task average**Success rate

Cortex _61.9_

Mem-0 _41.7_

π 0.5 _12.6_

X-VLA _12.1_

ACT _7.6_

DP _6.0_

Observe and Pick Up**14%**+10 vs Mem-0

Rearrange Blocks**100%**+11 vs Mem-0

Put Back Block**100%**+10 vs Mem-0

Swap Blocks**99%**+32 vs Mem-0

Swap T**63%**+49 vs Mem-0

Battery Try**37%**+9 vs Mem-0

Press Button**20%**only non-zero

Real World

## Zero-shot deployment on complex physical workflows.

Cortex transfers to an ARX ACONE dual-arm setup and enables long-horizon chemistry and washing workflows by combining a generalist VLM planner with a short-horizon subtask-conditioned VLA executor.

![Image 3: Chemical liquid stirring real-world rollout with fourteen subtasks.](https://steinate.github.io/cortex.github.io/static/images/real_ds.png)

**Chemical liquid stirring.** Cortex preserves procedure order over fourteen stages and switches only after visual evidence supports completion. 

### 20-trial Real-world Average

| Method | Chemical Task | Washing Task |
| --- | --- | --- |
| π 0.5 | 0% SR, 2.5 / 14 | 0% SR, 3.7 / 14 |
| π mem | 0% SR, 4.1 / 14 | 0% SR, 6.5 / 14 |
| Cortex | 65% SR, 11.0 / 14 | 55% SR, 10.5 / 14 |
| Human + π mem sub | 75% SR, 12.2 / 14 | 70% SR, 11.6 / 14 |

Citation

## BibTeX

@misc{peng2026cortex,
  title={Cortex: A Bidirectionally Aligned Embodied Agent Framework for Long-horizon Manipulation},
  author={Jiaqi Peng and Xiqian Yu and Delin Feng and Yuqiang Yang and Wenzhe Cai and Jing Xiong and Ganlin Yang and Jinliang Zheng and Jiafei Cao and Xueyuan Wei and Jiangmiao Pang and Yuan Shen and Tai Wang},
  year={2026},
  eprint={2607.05377},
  archivePrefix={arXiv},
  url={https://arxiv.org/abs/2607.05377}
}
