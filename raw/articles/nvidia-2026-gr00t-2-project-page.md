---
title: "GR00T 2: Scaling Robot Foundation Models for Generalization, Dexterity, and Adaptation"
type: article
year: 2026
category: physical-ai
raw_path: raw/articles/nvidia-2026-gr00t-2-project-page.md
raw_filename: "nvidia-2026-gr00t-2-project-page.md"
source_collection: external
author: "NVIDIA"
url: "https://research.nvidia.com/labs/gear/gr00t-2/#cite"
publisher: "research.nvidia.com"
publication_date: "Thu, 12 Nov 2026 03:45:06 GMT"
fetched_at: "2026-11-26T06:50:10+0900"
extractor_tier: "jina"
tags: []
figures:
  - id: fig01
    file: assets/nvidia-2026-gr00t-2-project-page/fig01.jpg
    raw: raw/articles/nvidia-2026-gr00t-2-project-page-figures/fig01.jpg
    caption: "A person sets up filter paper in a funnel"
    strategy: fetched
    curated: false
  - id: fig02
    file: assets/nvidia-2026-gr00t-2-project-page/fig02.jpg
    raw: raw/articles/nvidia-2026-gr00t-2-project-page-figures/fig02.jpg
    caption: "Dexter sets up filter paper in a funnel"
    strategy: fetched
    curated: false
  - id: fig03
    file: assets/nvidia-2026-gr00t-2-project-page/fig03.jpg
    raw: raw/articles/nvidia-2026-gr00t-2-project-page-figures/fig03.jpg
    caption: "A person with a handheld UMI gripper sorts packages from a conveyor belt into two bins"
    strategy: fetched
    curated: false
  - id: fig04
    file: assets/nvidia-2026-gr00t-2-project-page/fig04.jpg
    raw: raw/articles/nvidia-2026-gr00t-2-project-page-figures/fig04.jpg
    caption: "YAM sorts packages from the same conveyor belt into the two bins"
    strategy: fetched
    curated: false
  - id: fig05
    file: assets/nvidia-2026-gr00t-2-project-page/fig05.jpg
    raw: raw/articles/nvidia-2026-gr00t-2-project-page-figures/fig05.jpg
    caption: "A person wearing the DexUMI exoskeleton scoops granola"
    strategy: fetched
    curated: false
  - id: fig06
    file: assets/nvidia-2026-gr00t-2-project-page/fig06.jpg
    raw: raw/articles/nvidia-2026-gr00t-2-project-page-figures/fig06.jpg
    caption: "A robot hand scoops granola"
    strategy: fetched
    curated: false
---

> 수집 메모 — `scripts/fetch_article.py` 가 사용자의 명시적 URL 지시에 따라 가져왔다 (CLAUDE.md rule #1 의 자료 수집 예외). 추출 tier: `jina`. 본문은 원문 그대로이며 요약·번역·윤문하지 않았다.
> `category` 는 임시값이므로 Step 3 에서 확정할 것.

---

# GR00T 2

Scaling robot foundation models for generalization, dexterity, and adaptation.

[Paper](https://research.nvidia.com/labs/gear/gr00t-2/assets/gr00t2_whitepaper.pdf) · [BibTeX](https://research.nvidia.com/labs/gear/gr00t-2/#cite) · Code Available in December

November 2026

**Microscope**

* * *

## Introducing GR00T 2

We introduce GR00T 2, a new generation of foundation **world-action models (WAMs)**. GR00T 2 predicts future video and robot actions together, learning how physical interactions unfold along with the actions that produce them. The models run on parallel grippers, dexterous hands, and humanoids. Learning to predict the world, not just act in it, unlocks three new capabilities.

### 01[Emergence of X-Adaptability](https://research.nvidia.com/labs/gear/gr00t-2/#x-adapt)

Skills shown only by humans, or with handheld and wearable devices, carry over to robots that never practiced them.

*   [**Human → robot.**](https://research.nvidia.com/labs/gear/gr00t-2/#h2r) Shown the task only by humans, never on the robot, a robot with two five-fingered hands lines a lab funnel with filter paper and wets it with a wash bottle in 65% of trials.
*   [**Handheld UMI gripper → YAM.**](https://research.nvidia.com/labs/gear/gr00t-2/#umi) Shown only with a handheld UMI gripper, a different gripper from the robot's own, the YAM arm assembles a toy dump truck end to end in 60% of trials, a long-horizon task that takes up to 4 minutes.
*   [**Wearable hand → robot hand.**](https://research.nvidia.com/labs/gear/gr00t-2/#dexumi) Shown only with DexUMI, a wearable hand that mirrors the robot's fingers, a two-handed robot handles long-horizon dexterous work, such as preparing banana yogurt and scooping granola for breakfast, and highly dynamic tasks like striking a match to light a lamp.

### 02[Fast Adaptation and Agentic Control](https://research.nvidia.com/labs/gear/gr00t-2/#adaptation)

GR00T 2 performs many new tasks zero-shot and masters them from a handful of demonstrations. Because it predicts the outcome it is acting toward, a reasoning model can also direct it.

*   [**Zero-shot generalization and few-shot adaptation.**](https://research.nvidia.com/labs/gear/gr00t-2/#dexter50) On 50 tasks never seen on the target robot, only in human video or on other robots, GR00T 2 succeeds 40% of the time zero-shot. Five demonstrations per task, **under 3 minutes of robot data**, raise that to 95% after a 30-minute fine-tune on a single RTX 5090.
*   [**Dexterity.**](https://research.nvidia.com/labs/gear/gr00t-2/#dexterity) With minimal post-training, GR00T 2 performs long-horizon, highly dexterous tasks with two 22-DoF Sharpa hands, such as seating GB300 memory modules (85%) and assembling a toy truck (65%). Previous models could not do these tasks.
*   [**Self-improvement.**](https://research.nvidia.com/labs/gear/gr00t-2/#rl) Reinforcement learning on the real robot lifts three contact-rich insertion tasks to 88–96% success.
*   [**Agentic control.**](https://research.nvidia.com/labs/gear/gr00t-2/#agentic-control) With a reasoning model calling GR00T 2 through the WAM API, YAM completes 97 or more of 100 back-to-back assemblies of each of three toys, recovering from stalls and errors along the way.
*   [**Visual steering.**](https://research.nvidia.com/labs/gear/gr00t-2/#steering) When a reasoning model gives step instructions and marks where to grasp and release on GR00T 2's camera view, YAM follows what-and-where instructions 92% of the time, up from 40% with the task instruction alone, and finishes 17 of 20 long-horizon trash-sorting runs.

### 03[Whole-Body Loco-Manipulation with GR00T 2 Turbo](https://research.nvidia.com/labs/gear/gr00t-2/#whole-body)

GR00T 2 Turbo is GR00T 2 built for speed. A smaller transformer and a more compact video representation make it light enough to run on the **Unitree G1 humanoid** itself, steering the robot's whole body as it walks, bends, reaches, and carries.

*   [**Real time on the robot.**](https://research.nvidia.com/labs/gear/gr00t-2/#turbo-latency) Each prediction takes 124 ms on the G1's own Jetson Thor.
*   [**Whole-body skills.**](https://research.nvidia.com/labs/gear/gr00t-2/#whole-body) Through the SONIC whole-body controller, Turbo scoops and serves popcorn in all 48 trials and clears a table of diverse objects in 93% of trials.

* * *

## Model Architecture

One diffusion transformer denoises future video and robot actions together. Predicting how the scene should change lets GR00T 2 learn physics from human video; small per-robot heads turn the plan into motor commands for each body.

GR00T 2 reads recent video, the instruction and the robot state, denoises future video and an action chunk together, executes the chunk, and repeats. The footage is a GR00T 2 rollout of truck assembly on Dexter (Tianji robot + Sharpa hands), shown from the head camera and both wrist cameras at the model's own 320×224 resolution. The history panel is the real 0.8 s the model saw. The future panel is video that GR00T 2 generated from that moment for all three cameras, not the real footage.

* * *

## Pretraining Data: Humans, Handheld Grippers, and Robots

GR00T 2 is pretrained on one mixture of three kinds of data: **402,730 hours** of egocentric video of people at work, **10,184 hours** of demonstrations with a handheld UMI gripper across 2,897 tasks, and **23,500 hours** of robot teleoperation. The robot data spans parallel-gripper arms (YAM and Franka), dexterous hands (Sharpa and Wuji), and the Unitree G1 humanoid. The human video comes from our egocentric Human-1M dataset, and 100,000 hours of it are openly available as [Human-1M-100K](https://huggingface.co/datasets/nvidia/PhysicalAI-Human-1M-100K) on Hugging Face, which you can browse in the [Human-1M Dataset Explorer](https://huggingface.co/spaces/nvidia/PhysicalAI-Human-1M-Explorer).

* * *

## Scaling Human Video in Pretraining

Human video is by far the largest part of the mixture. To measure how much it helps the robot as it scales, we pretrain four models on none, 1%, 10%, and 100% of the human video, then evaluate each on 72 downstream Dexter tasks, both as video rollouts and on the real robot. Task progress rises at every step, from 64% to 77% in video rollouts and from 50% to 70% on the robot.

#### Video rollout task progress (%)

#### Real-robot task progress (%)

x: share of the human video in pretraining (log scale). Error bars: 1 SD across repeated runs, 72 tasks.

* * *

## X-Adaptability: Learn from Humans, Run on Other Robots

GR00T 2 uses human video and data from other robots to learn skills for a new robot. The target robot does not need to have demonstrated the task itself. We call this cross-adaptation, or X-Adapt, and show it three ways: from humans to a dexterous robot, from a handheld gripper to a robot arm, and from a wearable hand to a robot hand.

Human → Dexter ↓

![A person sets up filter paper in a funnel](https://research.nvidia.com/labs/gear/gr00t-2/assets/img/xa_human_demo.jpg)

![Dexter sets up filter paper in a funnel](https://research.nvidia.com/labs/gear/gr00t-2/assets/img/xa_human_robot.jpg)

UMI → YAM ↓

![A person with a handheld UMI gripper sorts packages from a conveyor belt into two bins](https://research.nvidia.com/labs/gear/gr00t-2/assets/img/xa_umi_demo.jpg?v=3)

![YAM sorts packages from the same conveyor belt into the two bins](https://research.nvidia.com/labs/gear/gr00t-2/assets/img/xa_umi_yam.jpg?v=3)

DexUMI → Dex hand ↓

![A person wearing the DexUMI exoskeleton scoops granola](https://research.nvidia.com/labs/gear/gr00t-2/assets/img/xa_dexumi_demo.jpg)

![A robot hand scoops granola](https://research.nvidia.com/labs/gear/gr00t-2/assets/img/xa_dexumi_robot.jpg)

Top: the demonstration GR00T 2 learns from. Bottom: GR00T 2 performing the same task on a robot that never saw a demonstration of it.

### Human → Robot, with No Teleoperation

Each chemistry-lab task is demonstrated only by people wearing gloves and head and wrist cameras. Task-agnostic play data teach Dexter how its own body looks and moves.

Filter-paper setup: the human demonstration used for training, then GR00T 2 on Dexter, autonomous.

#### Success with zero teleoperated demonstrations

Dexter, 20 trials per task. Learning from human demonstrations alone, with no teleoperation, GR00T 2 succeeds on all four tasks.

### UMI → YAM: From a Handheld Gripper to a Robot Arm

Conveyor sorting and tossing, the toy dump-truck assembly and the NIST board disassembly are demonstrated only with a handheld [GEAR UMI](https://research.nvidia.com/labs/gear/hardware-prototypes/GEAR_UMI/index.html) gripper. YAM contributes only task-agnostic teleoperation data, with no demonstration of any of these tasks.

UMI demo · training data

GR00T 2 on YAM · autonomous

**Conveyor sorting & tossing**

#### End-to-End success rate on YAM with 0 YAM data for the task

Click a task to watch it. *Conveyor: share of the 50 items sorted.

### DexUMI → Dexterous Hand: From a Wearable Hand to a Robot Hand

[GEAR DexUMI](https://research.nvidia.com/labs/gear/hardware-prototypes/GEAR_DexUMI/index.html) is a wearable exoskeleton that matches a robot hand's joints, so what a person does with it maps directly onto the robot. From DexUMI demonstrations alone, GR00T 2 learns three bimanual tasks on a Tianji robot with two ROBOTERA hands: preparing banana yogurt and scooping granola, the two halves of a breakfast task, and striking a match to light a lamp under a flask before putting the match out in water. For more information on GEAR Hardware, check out the [open-source hardware website](https://research.nvidia.com/labs/gear/hardware-prototypes/).

DexUMI demo · training data

GR00T 2 on Tianji arms with ROBOTERA hands · autonomous

* * *

## Dexterity: Fine Motor Control for Five-Fingered Hands

With only a small amount of teleoperation data per task, post-training lets GR00T 2 perform long-horizon dexterous tasks with Dexter's two 22-DoF Sharpa hands: labeling packages, swapping parts, assembling toys, and running chemistry-lab procedures end to end.

**Make shipping label**

#### Success on the Dexter post-training tasks

Click a task to watch it.

### Human → Sim → Real: From One Human Demo to In-Hand Tool Use

Starting from a single human demonstration of using a hammer, we reconstruct the task in simulation and refine the skill with reinforcement learning. GR00T 2 learns from that simulation data and transfers directly to a real robot with Sharpa hands.

**Human demo**

* * *

## Fast Adaptation: A New Task from a Few Demonstrations

Post-trained for about six epochs on a small dataset per task, GR00T 2 learns each task from a few hours of demonstrations.

### Zero-Shot Generalization, Few-Shot Mastery

GR00T 2 is pretrained on teleoperation data from many robots and on large-scale human video, and it learns by predicting how the world changes as it acts. Because it has seen so many tasks, a skill shown on one embodiment, or only in human video, carries over to a robot that has never practiced it. We test this on 50 tasks that appear in other robots' data or in human video but never in the target robot's own data: a bimanual robot with two Sharpa hands.

**40/ 50**unseen tasks already succeed zero-shot, with no data from the target robot

**95%**success with five demonstrations per task, up from 40% zero-shot

**<3 min**of robot data per task: the five demonstrations

**30 min**of fine-tuning on a single RTX 5090

Zero-shot, from the instruction alone, GR00T 2 succeeds in 40% of trials, and on 40 of the 50 tasks it succeeds at least once. Most misses come from execution, not intent: GR00T 2 does the right steps in the right order, and a single step falls short on precision. A little robot data closes that gap. One demonstration per task lifts success to 71%, and five, **under 3 minutes of robot data**, lift it to 95%, with 37 of the 50 tasks succeeding in every trial. Each adaptation is a **30-minute** LoRA fine-tune on a **single RTX 5090**.

#### Average success over 50 tasks

#### Tasks by success rate

Zero-shot runs the pretrained model as is; 1-shot and 5-shot fine-tune it with LoRA on 1 or 5 demonstrations per task.

### YAM Post-Training

Six long-horizon assembly and insertion tasks on YAM, each post-trained for about six epochs.

#### YAM post-training success

20 trials per task and model.

### Contact-Rich Skills with Real-World RL

Reinforcement learning on the real robot, driven only by task-level success signals, lifts all three contact-rich tasks: from 40–76% success after supervised post-training to 88–96% with GRPO-induced self-imitation.

**Fixed-pipe fittings**

#### Success on three contact-rich tasks with real-world RL

* * *

## Agentic GR00T 2: Control and Steering

A frontier reasoning agent and GR00T 2 handle complementary parts of a task. The agent decides _what_ to do: it breaks a long task into steps, checks progress, and writes code. GR00T 2 decides _how_, performing the contact-rich manipulation that is hard to script. Through the WAM API, the agent can control GR00T 2 as a tool and steer it by marking targets on its camera view.

### Agentic Control: 97 or More Successes out of 100 Assembly Trials

The agent runs as System 2 (S2). In an observe–reason–act–verify loop, it calls GR00T 2 as a tool alongside tools for camera images, robot state, and code-as-policy (CaP) skills. On real robots, GR00T 2 performs most of the manipulation. The agent watches it, and when a part drops or progress stalls, it repairs the scene with a CaP skill learned with ASPIRE and hands control back. In simulation, the agent instead runs a task-level program that calls GR00T 2 for each manipulation step. We also used simulation to develop recovery skills for some assembly tasks and then transferred them to the real robot.

The agent reaches GR00T 2, observation tools, and CaP skills through one tool server.

Each assembly trial starts by dumping all parts onto the table, so every trial begins from a cluttered layout that does not appear in the post-training data. With the agent, GR00T 2 assembles the toy plane, the toy tractor, and the Hot Wheels car in 98, 97, and 97 of 100 trials. The same post-trained policy without the agent succeeds in 71–84, and supervised post-training alone in 23–69.

**Toy plane**

Each video is one continuous session. Top left: the agent's reasoning. Bottom: playback speed and episode count.

#### Successful assemblies out of 100 trials

YAM, continuous runs.

The agent also composes the skills from [real-world RL](https://research.nvidia.com/labs/gear/gr00t-2/#rl) into longer tasks: inserting five Ethernet cables into a network switch, or plugging five chargers into the outlets a person points at. CaP localizes, grasps, and positions each part; GR00T 2 performs the precision-critical insertion; and the agent sequences the steps, verifies each insertion, and calls a CaP recovery when needed. Replacing the supervised policy with the RL-trained GR00T 2 raises full-task success from 12 to 19 of 20 runs on cables and from 2 to 20 of 20 on chargers.

**Multi-cable insertion**

Top left: the agent's plan and progress. Bottom: playback speed.

**19/ 20**runs inserting 5 Ethernet cables in sequence (12/20 without RL)

**20/ 20**runs plugging 5 chargers into pointed-at outlets (2/20 without RL)

**292/ 300**assembly trials succeeded, across all three toys

**98/ 100**toy-plane trials succeeded, up from 69 with SFT alone

### Visual Steering: Showing GR00T 2 Where to Act

A language instruction can leave the target object, its destination, or the acting arm unclear, especially in clutter. With visual steering, the planner marks a grasp point on the target object and a release point at its destination on GR00T 2's camera view, colored by the arm that should act. GR00T 2 generates the rest of the motion: approach, grasp, transport, and release. After each step, the planner looks again and decides whether to continue, retry, or stop. Training needs no new data: the marks are extracted from the gripper and hand states in existing demonstrations, and the same model still follows language alone.

**Tower of Hanoi**

Both robots are evaluated with the same protocol, in three settings: GR00T 2 given only the task instruction, the planner's step instructions, or the step instructions together with marks. On short-horizon instructions about what to move and where, visual steering (step instructions plus marks) raises success from 40% to 92% on YAM and from 30% to 70% on Dexter, whereas the planner's step instructions alone reach 66% and 33%. On instructions about how to move, such as the action type or the grasp type, the gain is smaller: 44% to 59% on YAM.

#### Short-horizon instruction following, success rate

YAM: 90 what-and-where and 54 how trials per setting. Dexter: 64 trials per setting, all what-and-where.

Over long horizons, these single-step gains compound. On YAM, GR00T 2 without marks completes no trash-sorting or board-disassembly episode, even with the planner's step instructions; with marks, it completes 17 of 20 and 3 of 10. On Dexter, the marks place more items in trash sorting but rarely complete the full task, which is the current limit of the system. Marks also convey neither an object's final orientation nor the motion between grasp and release, such as pouring or wiping; those still come from language.

#### Long-horizon tasks, full-task success

20 trash-sorting and 10 NIST board-disassembly episodes per setting.

* * *

## GR00T 2 Turbo: Whole-Body Loco-Manipulation

A humanoid must place its hands precisely while staying balanced as its whole body moves, often quickly. With its lower prediction cost, GR00T 2 Turbo runs onboard a Unitree G1 and steers the SONIC whole-body controller through latent whole-body commands. The videos below show it serving and delivering popcorn, cleaning up a spill, and picking up trash in an office cafeteria.

**Popcorn delivery**

### GR00T 2 Turbo: Efficient World-Action Modeling

GR00T 2 Turbo lowers the cost of world-action modeling in two ways: a smaller joint video–action transformer (2B parameters) and a higher-compression video encoder that exploits redundancy in video. It still predicts future observations and actions jointly, with the same action horizon, and it is the model behind the onboard G1 results below. Turbo also remains competitive on other embodiments. On YAM it reaches 90% on fixed-pipe fittings and 100% on inserting a wire into a breaker, ahead of GR00T 2 on both. It trails GR00T 2 on the other four YAM tasks and on five of the six Dexter tasks in the post-training charts above, tying on the sixth. The Dexterity and YAM post-training charts report both variants task by task.

### Fast Enough to Run on the Robot

Turbo's smaller transformer and compact video representation, together with inference optimizations shared by every configuration below, make onboard execution possible. The optimizations cut median prediction latency by 66–86% (2.9–7.2×) relative to eager BF16 execution of the same checkpoint. Optimized, a Turbo prediction for G1 takes 38 ms on an RTX 5090 and 124 ms onboard Jetson Thor, where it plans 1.6 s chunks of whole-body motion tokens about once per second; SONIC executes them at 50 Hz.

#### Median prediction latency, milliseconds

Eager BF16 → optimized.

### Think Slow, Move Fast

A reasoning model chooses the task; GR00T 2 Turbo imagines and plans; SONIC turns latent whole-body tokens into joint targets. Everything but the reasoning model runs onboard.

### Real-World G1 Tasks

Scooping and serving popcorn, cleaning up a spill, and clearing a table of diverse objects, all on the same humanoid: bimanual tool use, whole-body reach, and long-horizon clean-up.

#### G1 success rate

48 trials for popcorn, 30 for each other task.

### Sim → Real: World-Action Models Use Simulation Better

With simulated data added, GR00T 2 Turbo's out-of-distribution success rises from 6.7% to 63.3%. GR00T 1.7 rises to 40.0%.

#### Adding simulation data, real-world G1 success

Same real data; one arm adds simulated episodes.

**Simulation**

* * *

## Simulation for Evaluation and Development

We developed an agentic real-to-sim workflow that recreates high-fidelity digital twins of real-world tasks and use these simulation environments for policy evaluation and development. The task set spans rigid and articulated objects, deformable materials, high-precision assembly, and particles with diverse interactions including, but not limited to, sliding, pushing and scooping.

### Real-to-Sim Reconstruction

Agent-assisted workflows build the environments. Agents take inputs such as real robot videos, 3D scans, and photographs and use tools from [SimFoundry](https://research.nvidia.com/labs/gear/simfoundry/) to reconstruct the scene and assets, including geometry, appearance, and collision modeling. Reconstructed environments are validated through a combination of automated tests (replaying existing demonstrations and stability tests) and human expert feedback given to the agent for refinement. We highlight a collection of reconstructed tasks below.

**Overview**

### Simulation Tracks Real-World Performance

Policy evaluations in these high-fidelity digital twins proved to have strong correlations with real-world evaluations, allowing them to accelerate GR00T 2 development. Changes to the data loading and processing pipeline were tested with small-scale training and closed-loop simulation before adoption in pretraining. Inference settings were screened in simulation before robot tests.

#### Matched-task success rate

Pearson 0.92 · Spearman 0.89 · MMRV 0.055

#### Elo (centered)

Pearson 0.93 · Spearman 0.90

Real-world (x) vs. simulated (y) performance for 14 GR00T 2 policies on the 25-task YAM benchmark. Each letter marks the same policy in both plots. Elo scores are centered within comparison groups. The dashed line is y = x for success rate and a least-squares fit for Elo, whose simulated and real scales differ.

Authors:

NVIDIA

BibTeX

@techreport{nvidia2026gr00t2,
  title       = {{GR00T 2}: Scaling Robot Foundation Models for
                 Generalization, Dexterity, and Adaptation},
  author      = {{NVIDIA et al.}},
  institution = {NVIDIA},
  type        = {Whitepaper},
  year        = {2026},
  url         = {https://research.nvidia.com/labs/gear/gr00t-2/assets/gr00t2_whitepaper.pdf}
}
