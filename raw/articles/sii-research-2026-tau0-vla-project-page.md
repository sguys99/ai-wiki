---
title: "τ0-VLA: a Hierarchical Robot Foundation Model with World-Model-Guided Test-Time Computation"
type: article
year: 2026
category: physical-ai
raw_path: raw/articles/sii-research-2026-tau0-vla-project-page.md
raw_filename: "sii-research-2026-tau0-vla-project-page.md"
source_collection: external
author: "τ0-VLA Team (Shanghai Innovation Institute · Agibot Finch)"
url: "https://tau0-vla.github.io/"
publisher: "tau0-vla.github.io"
publication_date: "2026-07-27"
fetched_at: "2026-09-07T23:44:14+0900"
extractor_tier: "chrome"
tags: []
figures:
  - id: fig01
    file: assets/sii-research-2026-tau0-vla-project-page/fig01.png
    raw: raw/articles/sii-research-2026-tau0-vla-project-page-figures/fig01.png
    caption: "Physical-robot evaluation tasks from the paper across three robot embodiments"
    strategy: fetched
    curated: false
  - id: fig02
    file: assets/sii-research-2026-tau0-vla-project-page/fig02.png
    raw: raw/articles/sii-research-2026-tau0-vla-project-page-figures/fig02.png
    caption: "τ0-VLA high-level decision making and low-level execution architecture"
    strategy: fetched
    curated: false
  - id: fig03
    file: assets/sii-research-2026-tau0-vla-project-page/fig03.png
    raw: raw/articles/sii-research-2026-tau0-vla-project-page-figures/fig03.png
    caption: "Next-subtask prediction accuracy across evaluation settings"
    strategy: fetched
    curated: false
  - id: fig04
    file: assets/sii-research-2026-tau0-vla-project-page/fig04.png
    raw: raw/articles/sii-research-2026-tau0-vla-project-page-figures/fig04.png
    caption: "Test-time compute and accuracy trade-off"
    strategy: fetched
    curated: false
  - id: fig05
    file: assets/sii-research-2026-tau0-vla-project-page/page-full.png
    raw: raw/articles/sii-research-2026-tau0-vla-project-page-figures/page-full.png
    caption: "전체 페이지 스크린샷"
    strategy: screenshot
    curated: false
  - id: fig06
    file: assets/sii-research-2026-tau0-vla-project-page/crop01.png
    raw: raw/articles/sii-research-2026-tau0-vla-project-page-figures/crop01.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig07
    file: assets/sii-research-2026-tau0-vla-project-page/crop02.png
    raw: raw/articles/sii-research-2026-tau0-vla-project-page-figures/crop02.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig08
    file: assets/sii-research-2026-tau0-vla-project-page/crop03.png
    raw: raw/articles/sii-research-2026-tau0-vla-project-page-figures/crop03.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig09
    file: assets/sii-research-2026-tau0-vla-project-page/crop04.png
    raw: raw/articles/sii-research-2026-tau0-vla-project-page-figures/crop04.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig10
    file: assets/sii-research-2026-tau0-vla-project-page/crop05.png
    raw: raw/articles/sii-research-2026-tau0-vla-project-page-figures/crop05.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig11
    file: assets/sii-research-2026-tau0-vla-project-page/crop06.png
    raw: raw/articles/sii-research-2026-tau0-vla-project-page-figures/crop06.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig12
    file: assets/sii-research-2026-tau0-vla-project-page/crop07.png
    raw: raw/articles/sii-research-2026-tau0-vla-project-page-figures/crop07.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
---

> 수집 메모 — `scripts/fetch_article.py` 가 사용자의 명시적 URL 지시에 따라 가져왔다 (CLAUDE.md rule #1 의 자료 수집 예외). 추출 tier: `chrome`. 본문은 원문 그대로이며 요약·번역·윤문하지 않았다.
> `category` 는 임시값이므로 Step 3 에서 확정할 것.

---

Your browser does not support HTML video.

Getting robots to handle everyday tasks around the home has never been easy. Preparing a cup of milk tea requires the robot to pour milk and tea in sequence, add toppings, attach a lid and insert a straw. The full process contains tens of steps. Cleaning the house is even more demanding. The robot must move around, collect clothes, hang a bag, hand over a blanket, and dispose of trash without pause.

As a task grows from a few seconds to several minutes, the main challenge shifts. Precise execution of actions still matters, but success of long-horizon tasks depends more and more on progress tracking, outcome prediction and subtask planning. The robot must remember what has been completed, select the next appropriate step, and recover when an action fails.

Hierarchical VLAs expose language subtasks as an interface between high-level reasoning and low-level control. Most of them still make each high-level decision with a single forward pass. They map the current observation and execution history directly to the next subtask, without explicitly comparing alternatives or estimating the physical states those alternatives may produce. A poor decision is often detected after execution, and the environment has already been changed.

Our new robotic foundation model τ0-VLA addresses this limitation with world-model-guided test-time computation. It proposes subtasks, predicts their visual outcomes, and compares the resulting branches before commitment. Subtasks form a compact, semantically structured search space: they occur at sparse decision boundaries, align with the logical stages of a task, and produce meaningful changes that can be visually evaluated.

## Long-Horizon Manipulation in the Real World

We evaluate four long-horizon tasks spanning 13–25 ordered steps: Clean Room, Prepare Ingredients, Tomato and Egg Stir Fry, and Make Milk Tea. The tasks range from ingredient preparation and room organization to cooking and drink assembly. Episodes last up to 12 minutes and require navigation, object search, articulated interaction, tool use, cooking, and recovery from imperfect execution.

The rollout row below covers all four tasks: Prepare Ingredients and Clean Room are presented in one video, Make Milk Tea in another, and Tomato and Egg Stir Fry from both front and rear views. Together, these tasks test whether the robot can preserve progress, verify outcomes, and recover across extended procedures.

Your browser does not support HTML video.

### Prepare Ingredients & Clean Room

14-step and 25-step tasks

Your browser does not support HTML video.

### Make Milk Tea

13 steps

Your browser does not support HTML video.

### Tomato and Egg Stir Fry

Front view · 22 steps

Your browser does not support HTML video.

### Tomato and Egg Stir Fry

Rear view · 22 steps

![Physical-robot evaluation tasks from the paper across three robot embodiments](/media/paper-demo-tasks.png)

Physical-robot evaluation tasks from the paper. Panels (a)–(d) show the four long-horizon tasks; panels (e)–(f) show adapted, target-specific policies derived from the shared pretrained foundation on mobile ARX and fixed-base Franka platforms.

The first four panels summarize the long-horizon evaluation. The final two panels belong to the shorter cross-embodiment evaluation; their ARX and Franka rollout videos appear later with the generalist VLA discussion.

## Two Systems, Two Time Scales

τ0-VLA operates through two policies at different time scales. At subtask boundaries, the high-level policy reads the task instruction, current observation, and execution memory to select the next subtask and update its progress record. The low-level policy then executes the selected subtask at a faster control rate.

Token-confidence statistics determine whether the high-level policy acts immediately or allocates additional computation. For uncertain decisions, it proposes alternative subtasks, uses a world model to predict their post-execution outcomes, and applies a value model to score candidate quality from those predicted outcomes. Search and reflection compare these branches before committing to one.

The observed outcome of the selected subtask updates memory before the next decision, closing the loop between predicted and physical outcomes. This selective test-time computation improves next-subtask accuracy by 15–24 percentage points across in-domain and distribution-shifted settings.

![τ0-VLA high-level decision making and low-level execution architecture](/media/framework-latest.png)

Memory-aware high-level decision making, selective world-model-guided search, and low-level VLA execution.

For this loop to remain reliable, execution memory must stay synchronized with the physical world. A failed grasp or missing object can make an otherwise plausible progress record incorrect. When new visual evidence conflicts with memory, τ0-VLA can advance, roll back, or retry, correcting both lagging and over-optimistic records while preserving valid earlier progress.

These correction behaviors are learned by perturbing memories derived from existing demonstrations, without collecting a separate correction dataset. The resulting revisable memory improves next-subtask accuracy by 11.0 percentage points.

Across the four long-horizon physical tasks, the hierarchical system with Plan Once achieves 45.0% average success, compared with 27.5% for direct execution. Both settings use the same low-level policy and run without beam search, with ten physical trials per task.

The key difference lies in how the low-level policy is guided. Direct execution conditions every action on the full task instruction, leaving the policy to infer the current stage throughout the episode. Hierarchical execution instead provides a bounded subtask selected from the latest observation and execution memory. The improvement therefore reflects the benefit of explicitly tracking progress and deciding what to do next, rather than a change in the underlying execution policy.

| Method | Clean Room | Prepare Ingredients | Stir Fry | Milk Tea | Average |
|---|---|---|---|---|---|
| GR00T N1.7 | 0 / 10 | 1 / 10 | 0 / 10 | 0 / 10 | 2.5% |
| LingBot-VLA | 0 / 10 | 0 / 10 | 0 / 10 | 0 / 10 | 0.0% |
| π0.5 | 4 / 10 | 2 / 10 | 0 / 10 | 3 / 10 | 22.5% |
| τ0-VLA | 4 / 10 | 2 / 10 | 0 / 10 | 5 / 10 | 27.5% |
| τ0-VLA (Hierarchical System, Plan Once) | 5 / 10 | 4 / 10 | 4 / 10 | 5 / 10 | 45.0% |

## More Compute, Better Decisions

We evaluate high-level decision quality on Make Milk Tea, Clean Room, and both in-domain and out-of-domain Book Organization. Plan Once makes a single subtask prediction, Best-of-N samples and scores multiple one-step candidates, and TTC further expands multi-step branches with consequence prediction and reflection before commitment.

The benefit is most evident under distribution shift. On unseen Book Organization layouts, TTC achieves 74.0% next-subtask accuracy, compared with 50.0% for Plan Once and 57.5% for Best-of-N. Predicting consequences at decision time provides additional evidence beyond a single forward prediction or one-step candidate ranking.

These improvements in decision quality translate to physical execution. With the low-level policy fixed, TTC improves success from 5/10 to 7/10 on Milk Tea, from 6/10 to 9/10 on Book Organization, and from 5/10 to 7/10 on Clean Room.

On Milk Tea, both variants already complete more than 91% of the sequence on average; the remaining failures concentrate at lid attachment and straw insertion. TTC raises progress to 95.38%, identifying final contact-rich manipulation as the main remaining bottleneck.

The gains do not require unlimited computation. Accuracy improves rapidly at low-to-moderate compute budgets and then gradually saturates. Confidence-based routing enables selective test-time computation by allocating additional reasoning only when the decision is uncertain, while allowing high-confidence decisions to proceed directly.

![Next-subtask prediction accuracy across evaluation settings](/media/ttc-accuracy.png)

TTC achieves the highest next-subtask accuracy across all four evaluation settings.

![Test-time compute and accuracy trade-off](/media/ttc-scaling.png)

Accuracy improves rapidly before approaching a plateau.

## A Generalist VLA across Robot Embodiments

Once a subtask is selected, a pretrained vision-language backbone and Mixture-of-Transformers action expert produce action chunks from multi-view observations, robot state, and language. The same low-level policy receives either the original instruction for direct execution or a bounded subtask selected by the high-level policy, keeping the control interface consistent across both settings.

A shared 40-dimensional interface supports end-effector motion, arm joints, grippers, waist, and mobile base across fixed-base, bimanual, and mobile platforms. Each embodiment maps its available state and control dimensions into this representation while masking unused slots, providing a common interface for adaptation across diverse robot configurations.

Training combines 40,115 hours of heterogeneous real-world robot experience with multimodal data to establish a shared pretrained foundation across tasks and embodiments. Each deployment is then fine-tuned separately for its target setting. The ARX and Franka rollouts below illustrate these adapted policies on distinct robot configurations.

Your browser does not support HTML video.

### Collect Laundry

ARX AC One · 5 steps

Your browser does not support HTML video.

### Tidy Makeup Table

Franka · 8 steps

## Scaling Robot Intelligence Through Next-Subtask Prediction

A low-level VLA can reliably map observations to action chunks, yet still fail when it cannot determine whether those actions correspond to the right stage of a long-horizon task. Conversely, a high-level policy can propose plausible plans but fail without feedback about what actually happened. τ0-VLA connects the two: a high-level policy that tracks progress and predicts outcomes, paired with an executor that grounds selected subtasks in robot actions.

The interface between them is the subtask. τ0-VLA plans at the subtask level, predicts possible outcomes, selects a decision, executes it, and updates its state from subsequent observations. For long-horizon robots, this transforms instruction following from executing isolated steps into continuously tracking progress through a task.

Future systems can extend this closed loop to richer tasks and longer deployments, where robots decide when to deliberate, verify outcomes, and revise their plans before small errors compound into task-level failures.

[Read the paper ↗](https://arxiv.org/abs/2608.16885)
