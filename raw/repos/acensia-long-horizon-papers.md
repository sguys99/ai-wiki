---
title: "long-horizon-papers"
type: repo
year: 2026
category: physical-ai
raw_path: raw/repos/acensia-long-horizon-papers.md
raw_filename: "acensia-long-horizon-papers.md"
source_collection: external
org: "acensia"
repo: "long-horizon-papers"
url: "https://github.com/acensia/long-horizon-papers"
license: "None (unlicensed)"
tags: []
---

# long-horizon-papers

A curated collection of papers on **long-horizon tasks**, spanning LLM agents,
vision-language models (VLM), and vision-language-action models (VLA).
Focus is on 2026 work, plus key 2025 foundations on the VLA side.
Used as a submodule of [paper-shelf](https://github.com/acensia/paper-shelf);
follows the same conventions (one folder per paper, `source.txt` metadata, PDFs gitignored).

## LLM — long-horizon agents

| Date | Paper | arXiv |
|------|-------|-------|
| Jun 2026 | Agent Memory: Characterization and System Implications of Stateful Long-Horizon Workloads — first systems-level characterization of agent memory, with a taxonomy along four axes | [2606.06448](https://arxiv.org/abs/2606.06448) |
| May 2026 | Meta-Cognitive Memory Policy Optimization for Long-Horizon LLM Agents — "Belief Entropy" probes how uncertain the model is about latent task state given its compressed memory | [2605.30159](https://arxiv.org/abs/2605.30159) |
| Apr 2026 | Rethinking Agentic Reinforcement Learning in Large Language Models — RL for agentic LLMs with focus on long-horizon planning and tool use | [2604.27859](https://arxiv.org/abs/2604.27859) |
| Apr 2026 | YC-Bench: Benchmarking AI Agents for Long-Term Planning and Consistent Execution — agent runs a simulated startup over a one-year horizon, hundreds of turns | [2604.01212](https://arxiv.org/abs/2604.01212) |
| Mar 2026 | Beyond pass@1: A Reliability Science Framework for Long-Horizon LLM Agents — reliability-focused evaluation methodology | [2603.29231](https://arxiv.org/abs/2603.29231) |
| Mar 2026 | The Y-Combinator for LLMs: Solving Long-Context Rot with Lambda-Calculus — tackles context degradation over long executions | [2603.20105](https://arxiv.org/abs/2603.20105) |
| Mar 2026 | A Subgoal-driven Framework for Improving Long-Horizon LLM Agents — online subgoal decomposition + MiRA, RL with milestone-based dense rewards | [2603.19685](https://arxiv.org/abs/2603.19685) |
| Mar 2026 | Memex(RL): Scaling Long-Horizon LLM Agents via Indexed Experience Memory — indexed experience memory for workflows spanning hundreds of steps | [2603.04257](https://arxiv.org/abs/2603.04257) |
| Feb 2026 | KLong: Training LLM Agent for Extremely Long-horizon Tasks — **withdrawn by author (Apr 2026)** due to data errors | [2602.17547](https://arxiv.org/abs/2602.17547) |
| Feb 2026 | AgentLAB: Benchmarking LLM Agents against Long-Horizon Attacks — security angle: adaptive multi-turn attacks | [2602.16901](https://arxiv.org/abs/2602.16901) |
| Jan 2026 | Continuum Memory Architectures for Long-Horizon LLM Agents — memory for long-running workflows | [2601.09913](https://arxiv.org/abs/2601.09913) |
| Jan 2026 | InfiAgent: An Infinite-Horizon Framework for General-Purpose Autonomous Agents | [2601.03204](https://arxiv.org/abs/2601.03204) |

## VLM — long-horizon planning

| Date | Paper | arXiv |
|------|-------|-------|
| Apr 2026 | Goal2Skill: Long-Horizon Manipulation with Adaptive Planning and Reflection — VLM planner with structured task memory: post-condition verification + reflection to diagnose failures (32.4% vs 9.8% strongest baseline) | [2604.13942](https://arxiv.org/abs/2604.13942) |
| Mar 2026 | AgentVLN: Towards Agentic Vision-and-Language Navigation — agentic VLN over extended horizons | [2603.17670](https://arxiv.org/abs/2603.17670) |
| Mar 2026 | Recurrent Reasoning with Vision-Language Models for Estimating Long-Horizon Embodied Task Progress — progress estimation as the key signal for multi-step execution | [2603.17312](https://arxiv.org/abs/2603.17312) |

## VLA — long-horizon manipulation

Organized by the competing answers to *"how does a VLA survive a long task?"* — the first four
folders are strategies for *not failing*; `Recovery/` is the newer line on *failing gracefully*.

### Hierarchical/ — VLM planner ⟷ VLA executor

| Date | Paper | arXiv |
|------|-------|-------|
| Jul 2026 | Harness VLA: Steering Frozen VLAs into Reliable Manipulation Primitives via Memory-Guided Agents — memory-guided agent composes *frozen* VLAs with analytic primitives | [2607.08448](https://arxiv.org/abs/2607.08448) |
| Jul 2026 | Cortex: A Bidirectionally Aligned Embodied Agent Framework — 32 canonical skill primitives + tractability principles for subtask transitions; attacks the planner/executor semantic gap head-on | [2607.05377](https://arxiv.org/abs/2607.05377) |
| Jun 2026 | What Matters in Orchestrating Robot Policies: A Systematic Study of Hierarchical VLA Agents — options-style framework benchmarking planner-controller configs; the closest thing to a survey of this folder | [2606.10267](https://arxiv.org/abs/2606.10267) |
| Jun 2026 | VoLo: A Physical Orchestrator for Open-Vocabulary Long-Horizon Manipulation — VLA/WAM as an *interruptible tool* the VLM steers mid-execution (cf. Tool-Aligned VLA) | [2606.07723](https://arxiv.org/abs/2606.07723) |
| May 2026 | Towards Long-horizon Embodied Agents with Tool-Aligned VLA Models — "VLAs-as-tools": planning VLM invokes bounded VLA executions; tool-family residual adapters | [2605.13119](https://arxiv.org/abs/2605.13119) |
| May 2026 | Anticipation-VLA — unified multimodal model as both anticipation + value model to generate subgoals; refines subgoals when progress stalls | [2605.01772](https://arxiv.org/abs/2605.01772) |
| Apr 2026 | LoHo-Manip: Long-Horizon Manipulation via Trace-Conditioned VLA Planning — task-management VLM above *any* VLA; trace-conditioned executor makes replanning implicit | [2604.21924](https://arxiv.org/abs/2604.21924) |
| Feb 2026 | LiLo-VLA: Compositional Long-Horizon Manipulation via Linked Object-Centric Policies — modular linked policies, dynamic replanning + skill reuse | [2602.21531](https://arxiv.org/abs/2602.21531) |

### Memory/ — temporal context inside the policy

| Date | Paper | arXiv |
|------|-------|-------|
| Jul 2026 | NativeMEM: Native Memory Compression — compresses history into single tokens using the VLA's *own* vision encoder; no external memory module | [2607.06678](https://arxiv.org/abs/2607.06678) |
| Jul 2026 | HiMe: Hierarchical Embodied Memory — high-frequency Executor / working-memory Sentry / Planner split; names the "frequency-competence paradox" | [2607.03449](https://arxiv.org/abs/2607.03449) |
| Jun 2026 | Chronos: A Physics-Informed Full-History Framework for Non-Markovian Long-Horizon Manipulation — selective SSM over full history (cf. Keyframe Chaining, VQ-Memory) | [2606.30318](https://arxiv.org/abs/2606.30318) |
| Jun 2026 | S²-VLA: State-Space Guided VLA — maintains a belief state that gates fusion of visual/language/action features by execution phase | [2606.27872](https://arxiv.org/abs/2606.27872) |
| Jun 2026 | EventVLA: Event-Driven Visual Evidence Memory — *learns* which keyframes to keep by predicting future keyframe probability | [2606.20092](https://arxiv.org/abs/2606.20092) |
| Jun 2026 | μVLA: On Recurrent Memory for Partially Observable Manipulation — the control experiment: what does recurrence *alone* buy, with no auxiliary losses? | [2606.12497](https://arxiv.org/abs/2606.12497) |
| Apr 2026 | HELM: Harness-Enhanced Long-horizon Memory — names the three execution-loop gaps: memory (cross-phase context loss), verification, recovery | [2604.18791](https://arxiv.org/abs/2604.18791) |
| Mar 2026 | VQ-Memory — discretizes past joint states via VQ-VAE; compact, model-agnostic temporal memory | [2603.09513](https://arxiv.org/abs/2603.09513) |
| Mar 2026 | Non-Markovian Long-Horizon Robot Manipulation via Keyframe Chaining — sparse semantic keyframe history, reasons over events thousands of timesteps apart | [2603.01465](https://arxiv.org/abs/2603.01465) |
| Feb 2026 | Recursive Belief Vision Language Action Models | [2602.20659](https://arxiv.org/abs/2602.20659) |
| Feb 2026 | StemVLA — future 3D spatial geometry + 4D historical representation | [2602.23721](https://arxiv.org/abs/2602.23721) |
| Feb 2026 | Efficient Long-Horizon VLA Models via Static-Dynamic Disentanglement — splits visual tokens into static/dynamic to cut context length | [2602.03983](https://arxiv.org/abs/2602.03983) |
| Nov 2025 | EchoVLA: Synergistic Declarative Memory for VLA-Driven Mobile Manipulation | [2511.18112](https://arxiv.org/abs/2511.18112) |
| Aug 2025 | MemoryVLA: Perceptual-Cognitive Memory in VLA Models — the foundational one; perceptual-cognitive memory bank, +26 pts on long-horizon real-world tasks | [2508.19236](https://arxiv.org/abs/2508.19236) |

### WorldModel/ — subgoal imagination & visual foresight

| Date | Paper | arXiv |
|------|-------|-------|
| Jul 2026 | Imagined Rollouts are Kinematic, Not Dynamic: A Diagnosis of Long-Horizon World-Model Failure — shows imagined rollouts fail *kinematically*, not dynamically; the sharpest negative result in this folder | [2607.05966](https://arxiv.org/abs/2607.05966) |
| Jun 2026 | Foresight: Failure Detection with Action-Conditioned World Model Latents — detects failure from world-model latents using only task-level labels + conformal thresholds | [2606.23085](https://arxiv.org/abs/2606.23085) |
| May 2026 | World Model for Robot Learning: A Comprehensive Survey — frames subgoal generation in VLAs as "predictive branches" vs native video world models | [2605.00080](https://arxiv.org/abs/2605.00080) |
| Mar 2026 | Do World Action Models Generalize Better than VLAs? A Robustness Study | [2603.22078](https://arxiv.org/abs/2603.22078) |
| Feb 2026 | H-WM: Robotic Task and Motion Planning Guided by Hierarchical World Model — understanding + prediction experts map symbolic plans to visually grounded subgoals | [2602.11291](https://arxiv.org/abs/2602.11291) |
| Feb 2026 | BagelVLA — interleaves textual reasoning + visual forecasting into the action loop | [2602.09849](https://arxiv.org/abs/2602.09849) |
| Jan 2026 | PALM: Progress-Aware Policy Learning via Affordance Reasoning — future affordance prediction + progress estimation; SOTA on CALVIN, LIBERO-LONG | [2601.07060](https://arxiv.org/abs/2601.07060) |
| Jul 2025 | DreamVLA — predictive "dreaming" branch with comprehensive world knowledge | [2507.04447](https://arxiv.org/abs/2507.04447) |

### Benchmarks/ — evaluating long-horizon manipulation

| Date | Paper | arXiv |
|------|-------|-------|
| Jul 2026 | RoboDojo: A Unified Sim-and-Real Benchmark for Generalist Robot Manipulation Policies — evaluates 30 policies along generalization / memory / precision / **horizon** axes | [2607.04434](https://arxiv.org/abs/2607.04434) |
| Apr 2026 | LongBench: Evaluating Robotic Manipulation Policies on Real-World Long-Horizon Tasks — real-world, not sim | [2604.16788](https://arxiv.org/abs/2604.16788) |
| Mar 2026 | RoboMME: Benchmarking and Understanding Memory for Robotic Generalist Policies — 16 tasks taxonomized by temporal/spatial/object/procedural memory | [2603.04639](https://arxiv.org/abs/2603.04639) |
| Aug 2025 | Long-VLA — first end-to-end long-horizon VLA (phase-aware input masking); introduced the L-CALVIN benchmark | [2508.19958](https://arxiv.org/abs/2508.19958) |

Classic baselines: CALVIN (5-subtask chains) and LIBERO-Long (100 long-horizon tasks).

### Recovery/ — verification, failure detection & correction

HELM names three execution-loop gaps — memory, **verification**, **recovery** — but the first three
folders only answer the memory one. This folder collects the mid-2026 cluster on the other two:
noticing that a long rollout has gone wrong, and doing something about it without restarting.

| Date | Paper | arXiv |
|------|-------|-------|
| Jul 2026 | Diagnosing Semantic Handoff Failures in Agent-Orchestrated VLA Skill Composition — the failure *taxonomy* paper: skills that pass in isolation break at their boundaries when chained | [2607.06256](https://arxiv.org/abs/2607.06256) |
| Jul 2026 | VLA-Corrector: Lightweight Detect-and-Correct Inference for Adaptive Action Horizon — detects visual deviation mid-chunk and triggers online replanning | [2607.01804](https://arxiv.org/abs/2607.01804) |
| Jun 2026 | PhysReflect-VLA: Physical Feasibility and Self-Reflective Regulation — execution-time feasibility check + LLM reflection for error correction | [2606.27146](https://arxiv.org/abs/2606.27146) |

See also Foresight (WorldModel/), which does failure *detection* from world-model latents.

## Trends (as of Jul 2026)

- **LLM side**: shift from prompting/planning tricks to **memory systems** (indexed experience,
  continuum/meta-cognitive memory) and **RL with dense milestone rewards**.
- **VLA side**: four competing strategies — (1) put a VLM planner on top, (2) build memory
  into the policy, (3) imagine subgoals with a world model, (4) end-to-end with phase-aware
  tricks. HELM's gap taxonomy (memory / verification / recovery) is a useful organizing lens.
- **Memory is consolidating on selection, not capacity.** The Jun–Jul 2026 wave (EventVLA,
  NativeMEM, Chronos, HiMe) is less about storing more history than about *choosing what to keep*
  — learned keyframe evidence, native-encoder compression, selective state spaces. μVLA is the
  useful control: how much of this does plain recurrence already give you?
- **Recovery is the new front.** Through ~May 2026 the field answered "don't fail." Since June it
  has started answering "notice you failed, then fix it" — see `Recovery/` and Foresight. The
  handoff-failure diagnosis paper argues the damage concentrates at *skill boundaries*, which is
  exactly the seam hierarchical VLAs create.
- **World-model foresight took a hit**: "Imagined Rollouts are Kinematic, Not Dynamic" (Jul 2026)
  is a pointed negative result for the subgoal-imagination strategy.
- **Benchmarks** are shifting from sim chains (CALVIN) to memory-probing (RoboMME), real-world
  (LongBench), and unified sim+real with an explicit horizon axis (RoboDojo).

52 papers total · 51 with PDFs · 1 withdrawn (KLong).

PDFs are gitignored (same policy as paper-shelf); re-download via the `PDF:` link in each `source.txt`.
