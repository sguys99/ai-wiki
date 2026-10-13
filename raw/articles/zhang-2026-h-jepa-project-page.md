---
title: "H-JEPA: Hierarchical World Models for Visual Planning"
type: article
year: 2026
category: physical-ai
raw_path: raw/articles/zhang-2026-h-jepa-project-page.md
raw_filename: "zhang-2026-h-jepa-project-page.md"
source_collection: external
author: "Wancong Zhang, Basile Terver et al."
url: "https://h-jepa.com/"
publisher: "h-jepa.com"
fetched_at: "2026-10-13T13:08:28+0900"
extractor_tier: "jina"
tags: []
figures:
  - id: fig01
    file: assets/zhang-2026-h-jepa-project-page/fig01.png
    raw: raw/articles/zhang-2026-h-jepa-project-page-figures/fig01.png
    caption: "Image 1: Three-level planning in Visual AntMaze, with coarse subgoals refined into raw actions. The accompanying plot compares planning success and compute."
    strategy: fetched
    curated: false
  - id: fig02
    file: assets/zhang-2026-h-jepa-project-page/fig02.png
    raw: raw/articles/zhang-2026-h-jepa-project-page-figures/fig02.png
    caption: "Image 2: Goal-cost surfaces in different latent spaces illustrate how upper-level representations change the planning objective."
    strategy: fetched
    curated: false
  - id: fig03
    file: assets/zhang-2026-h-jepa-project-page/fig03.png
    raw: raw/articles/zhang-2026-h-jepa-project-page-figures/fig03.png
    caption: "Image 3: Planning success versus compute across FourRoom, AntMaze, Cube, and Push-T, comparing flat LeWM with two- and three-level H-JEPA."
    strategy: fetched
    curated: false
  - id: fig04
    file: assets/zhang-2026-h-jepa-project-page/page-full.png
    raw: raw/articles/zhang-2026-h-jepa-project-page-figures/page-full.png
    caption: "전체 페이지 스크린샷"
    strategy: screenshot
    curated: false
  - id: fig05
    file: assets/zhang-2026-h-jepa-project-page/crop01.png
    raw: raw/articles/zhang-2026-h-jepa-project-page-figures/crop01.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig06
    file: assets/zhang-2026-h-jepa-project-page/crop02.png
    raw: raw/articles/zhang-2026-h-jepa-project-page-figures/crop02.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig07
    file: assets/zhang-2026-h-jepa-project-page/crop03.png
    raw: raw/articles/zhang-2026-h-jepa-project-page-figures/crop03.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig08
    file: assets/zhang-2026-h-jepa-project-page/crop04.png
    raw: raw/articles/zhang-2026-h-jepa-project-page-figures/crop04.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig09
    file: assets/zhang-2026-h-jepa-project-page/crop05.png
    raw: raw/articles/zhang-2026-h-jepa-project-page-figures/crop05.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig10
    file: assets/zhang-2026-h-jepa-project-page/crop06.png
    raw: raw/articles/zhang-2026-h-jepa-project-page-figures/crop06.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig11
    file: assets/zhang-2026-h-jepa-project-page/crop07.png
    raw: raw/articles/zhang-2026-h-jepa-project-page-figures/crop07.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig12
    file: assets/zhang-2026-h-jepa-project-page/crop08.png
    raw: raw/articles/zhang-2026-h-jepa-project-page-figures/crop08.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig13
    file: assets/zhang-2026-h-jepa-project-page/crop09.png
    raw: raw/articles/zhang-2026-h-jepa-project-page-figures/crop09.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig14
    file: assets/zhang-2026-h-jepa-project-page/crop10.png
    raw: raw/articles/zhang-2026-h-jepa-project-page-figures/crop10.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig15
    file: assets/zhang-2026-h-jepa-project-page/crop11.png
    raw: raw/articles/zhang-2026-h-jepa-project-page-figures/crop11.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig16
    file: assets/zhang-2026-h-jepa-project-page/crop12.png
    raw: raw/articles/zhang-2026-h-jepa-project-page-figures/crop12.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig17
    file: assets/zhang-2026-h-jepa-project-page/crop13.png
    raw: raw/articles/zhang-2026-h-jepa-project-page-figures/crop13.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig18
    file: assets/zhang-2026-h-jepa-project-page/crop14.png
    raw: raw/articles/zhang-2026-h-jepa-project-page-figures/crop14.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
---

> 수집 메모 — `scripts/fetch_article.py` 가 사용자의 명시적 URL 지시에 따라 가져왔다 (CLAUDE.md rule #1 의 자료 수집 예외). 추출 tier: `jina`. 본문은 원문 그대로이며 요약·번역·윤문하지 않았다.
> `category` 는 임시값이므로 Step 3 에서 확정할 것.

---

## Summary

Long-horizon planning requires reasoning at different timescales and levels of abstraction. Existing action-conditioned JEPA world models predict and plan at a single timescale or with multiple horizons in one shared latent space. This makes prediction and planning unnecessarily hard - a single representation must serve both low-level control and long-range planning, yet details useful for precise control can be difficult to predict over long horizon and irrelevant to measuring progress toward the goal.

**H-JEPA** is an end-to-end recipe for learning a hierarchy of Joint-Embedding Predictive Architectures. Each higher level predicts farther ahead in **its own learned latent space**. Planning runs top-down: the highest level plans toward the goal, its predictions become subgoals for the level below, and the lowest level produces primitive actions.

When factors in the data evolve at separated timescales, higher levels discard fast, unpredictable detail while preserving slower, task-relevant state. Across four simulated navigation and manipulation environments, hierarchical planning with H-JEPA improves over a flat JEPA. On Visual AntMaze, a three-level hierarchy raises success from **18% to 73%**. With inverse-dynamics supervision, the approach also improves offline planning fidelity on diverse real-robot videos from DROID.

[![Image 1: Three-level planning in Visual AntMaze, with coarse subgoals refined into raw actions. The accompanying plot compares planning success and compute.](https://h-jepa.com/assets/figures/overview.png)](https://h-jepa.com/assets/figures/overview.png)

**Fig. 1: Hierarchical abstractions support planning at multiple timescales.** Higher-level latents preserve the ant’s position and maze layout while losing leg-pose detail. The top level plans toward the final goal; each lower level refines an upper-level subgoal. Right: planning success versus compute for flat LeWM and two- and three-level H-JEPA. Error bars show standard error over three paired model and planning seeds.

## Hierarchical predictive learning

H-JEPA learns a hierarchy of latent world models end-to-end from observation-action trajectories, with each higher level predicting over a longer timescale in its own learned latent space. At every level, action-conditioned prediction is paired with SIGReg [[1]](https://h-jepa.com/#ref-lejepa) to prevent representation collapse. The hierarchy is trained jointly, with gradients from higher-level objectives flowing through lower-level encoders.

H-JEPA plans from coarse to fine: higher levels propose latent subgoals, and lower levels refine them into primitive actions. Each lower-level planner compares its predictions with the assigned subgoal in the higher level’s latent space. After executing an action prefix, planning repeats from the new observation.

## Experimental results

We evaluate navigation in **Visual AntMaze** and **FourRoom Distractors**, manipulation in **Push-T** and **OGBench Cube**, and offline planning on real robot trajectories from **DROID**. The flat baseline, LeWM, corresponds to training the first-level JEPA on its own.

### Learning abstractions

Higher levels selectively lose fast-varying information while retaining slower state. In AntMaze, the ant’s body configuration becomes less recoverable with depth, while its position remains accurately recoverable. In FourRoom, the independently moving distractor fades from higher-level representations while the controlled agent remains visible.

**Fig. 2: Selective abstraction across hierarchy levels.** Above: frozen probes measure retained state information; higher normalized error means less recoverable information. Error bars show standard error over three training seeds. Below: ground-truth observations and decoded representations at levels 1–4 in AntMaze and FourRoom. Decoders are trained after the world model, only for visualization.

This selectivity is strongest when entities evolve at well-separated timescales. It is not universal: the manipulation datasets have smaller temporal-frequency gaps and show little selective abstraction.

**A better space for measuring progress.** A fine-grained representation may assign a large distance to states that differ in pose but are equally close to the goal. Projecting a level-1 rollout into a more abstract latent space improves planning even without invoking upper-level planners. Across every tested multilevel AntMaze model, at least one upper-level cost improves success over the native level-1 cost.

[![Image 2: Goal-cost surfaces in different latent spaces illustrate how upper-level representations change the planning objective.](https://h-jepa.com/assets/figures/goal-costs.png)](https://h-jepa.com/assets/figures/goal-costs.png)

**Fig. 3: The representation changes the planning objective.** Distances to the starred anchor in each latent space of a three-level AntMaze model (one training seed). Blue is near; red is far. Higher levels show more graded costs along corridors and a broader low-cost region around the anchor.

### Planning performance

On FourRoom, AntMaze, and Cube, adding hierarchy levels up to three improves the success–compute frontier: the planner can achieve higher success with less compute. Two-level H-JEPA also matches or exceeds LeWM across tested budgets on Push-T. Deeper models perform poorly there, likely because short episodes leave much less usable training data for longer training clips.

[![Image 3: Planning success versus compute across FourRoom, AntMaze, Cube, and Push-T, comparing flat LeWM with two- and three-level H-JEPA.](https://h-jepa.com/assets/figures/planning-results-pareto.png)](https://h-jepa.com/assets/figures/planning-results-pareto.png)

**Fig. 4: Planning success across compute budgets.** Success versus planner FLOPs, including forward and backward passes, for flat LeWM and two- and three-level H-JEPA. Bold curves indicate Pareto fronts. Error bars show one standard error over three seeds.

#### Planning in action

Example executions comparing LeWM and H-JEPA, with the starting observation and goal shown alongside each rollout.

### Real-world videos: DROID

DROID introduces variation in scenes, lighting, and objects across episodes. Here, a purely predictive objective can encode the stable background while discarding the moving robot. We add an **inverse-dynamics loss** that predicts the action connecting consecutive latent states, encouraging the representation to retain information about the agent.

[Video 12](https://h-jepa.com/assets/videos/scene-diversity.mp4?v=9a7c872ae9)

**Fig. 5: From a fixed scene to diverse real environments.** Three Cube episodes and three DROID clips illustrate variation across episodes.

We evaluate plans offline using **Fréchet fidelity**, which compares the full three-dimensional end-effector path with an expert trajectory. A stationary arm scores 0%; the expert path scores 100%. This measures path fidelity, rather than closed-loop task success.

The learned second level improves performance on top of the inverse-dynamics baseline while reducing planner compute. The paper includes the full evaluation protocol, metric calibration, ablations, and additional qualitative results.

## References

[1] Randall Balestriero and Yann LeCun. [LeJEPA: Provable and Scalable Self-Supervised Learning Without the Heuristics](https://arxiv.org/abs/2511.08544). arXiv:2511.08544, 2025.
