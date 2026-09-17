---
title: "VLA-JEPA: Enhancing Vision-Language-Action Model with Latent World Model"
type: article
year: 2026
category: physical-ai
raw_path: raw/articles/sun-2026-vla-jepa-project-page.md
raw_filename: "sun-2026-vla-jepa-project-page.md"
source_collection: external
author: "Jingwen Sun"
url: "https://ginwind.github.io/VLA-JEPA/"
publisher: "ginwind.github.io"
fetched_at: "2026-09-17T21:41:31+0900"
extractor_tier: "chrome"
tags: []
figures:
  - id: fig01
    file: assets/sun-2026-vla-jepa-project-page/fig01.png
    raw: raw/articles/sun-2026-vla-jepa-project-page-figures/fig01.png
    caption: "VLA-JEPA Architecture"
    strategy: fetched
    curated: false
  - id: fig02
    file: assets/sun-2026-vla-jepa-project-page/fig02.png
    raw: raw/articles/sun-2026-vla-jepa-project-page-figures/fig02.png
    caption: "VLA-JEPA Framework"
    strategy: fetched
    curated: false
  - id: fig03
    file: assets/sun-2026-vla-jepa-project-page/fig03.png
    raw: raw/articles/sun-2026-vla-jepa-project-page-figures/fig03.png
    caption: "Attention Map Visualization"
    strategy: fetched
    curated: false
  - id: fig04
    file: assets/sun-2026-vla-jepa-project-page/fig04.png
    raw: raw/articles/sun-2026-vla-jepa-project-page-figures/fig04.png
    caption: "Experiments Setup"
    strategy: fetched
    curated: false
  - id: fig05
    file: assets/sun-2026-vla-jepa-project-page/fig05.png
    raw: raw/articles/sun-2026-vla-jepa-project-page-figures/fig05.png
    caption: "Human Video Proportion Analysis"
    strategy: fetched
    curated: false
  - id: fig06
    file: assets/sun-2026-vla-jepa-project-page/fig06.png
    raw: raw/articles/sun-2026-vla-jepa-project-page-figures/fig06.png
    caption: "Real-World Experimental Results"
    strategy: fetched
    curated: false
  - id: fig07
    file: assets/sun-2026-vla-jepa-project-page/page-full.png
    raw: raw/articles/sun-2026-vla-jepa-project-page-figures/page-full.png
    caption: "전체 페이지 스크린샷"
    strategy: screenshot
    curated: false
---

> 수집 메모 — `scripts/fetch_article.py` 가 사용자의 명시적 URL 지시에 따라 가져왔다 (CLAUDE.md rule #1 의 자료 수집 예외). 추출 tier: `chrome`. 본문은 원문 그대로이며 요약·번역·윤문하지 않았다.
> `category` 는 임시값이므로 Step 3 에서 확정할 것.

---

## Abstract

 Pretraining Vision-Language-Action (VLA) policies on internet-scale video is appealing, yet current latent-action objectives often learn the wrong thing: they remain anchored to pixel variation rather than action-relevant state transitions, making them vulnerable to appearance bias, nuisance motion, and information leakage. We introduce VLA-JEPA, a JEPA-style pretraining framework that sidesteps these pitfalls by design. The key idea is leakage-free state prediction: a target encoder produces latent representations from future frames, while the student pathway sees only the current observation—future information is used solely as supervision targets, never as input. By predicting in latent space rather than pixel space, VLA-JEPA learns dynamics abstractions that are robust to camera motion and irrelevant background changes. This yields a simple two-stage recipe—JEPA pretraining followed by action-head fine-tuning—without the multi-stage complexity of prior latent-action pipelines. Experiments on LIBERO, LIBERO-Plus, SimplerEnv and real-world manipulation tasks show that VLA-JEPA achieves consistent gains in sample efficiency and generalization over existing methods. 

 Real-World Demos 

## Real-World Demos

In-Distribution Evaluation

Out-of-Distribution Evaluation

 Teaser Image 

![VLA-JEPA Architecture](images/teaser.png)

VLA-JEPA model architecture. A target encoder produces latent targets from future frames, while the student pathway sees only the current observation through a VLM backbone. A predictor maps the history latent states and the latent action representations to future latent states, trained as a latent world model using a JEPA alignment loss. Future frames are never provided as inputs to the VLM backbone; they are used solely to construct training targets. 

## Highlights

 1. We analyze why many latent-action pretraining objectives remain pixel-tethered, becoming biased toward appearance, vulnerable to nuisance motion, and prone to information leakage when future context enters the learner. 

 2. We propose VLA-JEPA, a JEPA-style latent predictive alignment scheme that learns action-relevant transition semantics by predicting and aligning future latent states—without pixel reconstruction, information leakage and only one-stage pretraining pipeline. 

 3. VLA-JEPA yields consistent gains in sample efficiency, robustness, and generalization across embodied control benchmarks (LIBERO, LIBERO-Plus, SimplerEnv) and real-world settings, while simplifying training relative to prior multi-stage latent-action pipelines. 

## Method Overview

![VLA-JEPA Framework](images/vla_jepa_framework.png)

## VLA-JEPA Framework. We adopt a VLM backbone with learnable latent action tokens. For action-free human videos, VLA-JEPA extracts latent actions via a world-model-based state transition objective using a V-JEPA2 encoder. For robot demonstrations, a flow-matching action head generates precise end-effector trajectories. During fine-tuning, both objectives are jointly optimized, enabling learned state-transition dynamics to be effectively leveraged for downstream robotic control.

## Comparison with Prior VLA Methods

 We identify four failure modes in existing latent-action pretraining pipelines: pixel-level objectives biased toward appearance, amplified noisy motion from real-world videos, information leakage causing latent-action collapse, and fragile multi-stage training pipelines. VLA-JEPA addresses all of these issues by design. 

![Attention Map Visualization](images/attention_map.png)

Visualization of the attention weight matrix of latent action tokens attending to image tokens. LAPA's latent actions focus on excessively dense visual information including operation-irrelevant details. UniVLA overemphasizes semantics, attending to irrelevant background elements. VLA-JEPA focuses precisely on the robotic arm, the hand, and the objects to be manipulated. 

## Experiments Setup

![Experiments Setup](images/experiments_setup.png)

 Experiments setup on LIBERO, LIBERO-Plus, SimplerEnv and real-world Franka robot. We evaluate VLA-JEPA on 3 simulation benchmarks and 1 real-world environment. 

## LIBERO Benchmark Results

 VLA-JEPA achieves state-of-the-art performance on the LIBERO benchmark with the highest average success rate, outperforming methods that rely on extensive robot datasets for pre-training. 

MethodSpatialObjectGoalLIBERO-10Avg

LAPA73.874.658.855.465.7

UniVLA96.596.895.692.095.2

OpenVLA-OFT97.698.497.994.597.1

π096.898.895.885.294.2

π0-Fast96.496.888.660.285.5

CoT-VLA87.591.687.669.081.1

WorldVLA87.696.283.460.081.8

villa-X97.597.091.574.590.1

GR00T N194.497.693.090.693.9

π0.598.898.298.092.496.9

VLA-JEPA (ours)96.299.697.295.897.2

## SimplerEnv Benchmark Results

 On SimplerEnv, VLA-JEPA achieves the highest average success rate on the Google Robot and competitive results on WidowX Robot, while using less than 1% of the training data compared to methods like villa-X. 

MethodGoogle RobotWidowX Robot

PickMoveDrawerPlaceAvgSpoonCarrotBlockEggplantAvg

LAPA*-----70.845.854.258.357.3

villa-X81.755.438.44.244.948.324.219.271.740.8

RoboVLMs77.361.743.524.151.745.820.84.279.237.5

π072.765.338.3--29.1016.662.540.1

π0-Fast75.367.542.9--29.121.910.866.748.3

VLA-JEPA (ours)88.364.159.349.165.275.070.812.570.857.3

## LIBERO-Plus Robustness Results

 VLA-JEPA achieves the best performance on 5 out of 7 perturbations in LIBERO-Plus, demonstrating significant advantages under Language, Light, Background, and Layout perturbations. This verifies that our latent action can effectively handle task-agnostic disturbances. 

MethodCameraRobotLanguageLightBackgroundNoiseLayoutAvg

UniVLA1.846.269.669.081.021.231.942.9

OpenVLA-OFT56.431.979.588.793.375.874.269.6

π013.86.058.885.081.479.068.953.6

π0-Fast65.121.661.073.273.274.468.861.6

WorldVLA0.127.941.643.717.110.938.025.0

VLA-JEPA (ours)63.367.185.495.693.666.385.179.5

## Impact of Human Video Data

## Human video data primarily enhances the robustness and stability of the VLA model by strengthening its existing skill repertoire, rather than introducing new action execution capabilities. As the scale of human video data increases, the robustness of the resulting policy consistently improves.

![Human Video Proportion Analysis](images/human_video_proportion.png)

 Effect of the proportion of human video data in pre-training on success rates across different perturbation dimensions on the LIBERO-Plus benchmark. 

## Real-World Experiments

## We evaluate VLA-JEPA on table-top manipulation tasks using a Franka Research 3 arm. VLA-JEPA achieves state-of-the-art performance under both in-distribution and object layout out-of-distribution settings. Notably, VLA-JEPA acquires the skill of repeated grasping —reopening the gripper to attempt another grasp after a failure—a capability not observed in π 0 or π 0.5 .

![Real-World Experimental Results](images/realworld_figure.png)

 Real-world experimental results comparing VLA-JEPA with π0 and π0.5 across in-distribution, task OOD, and layout OOD settings. 

 Compact 2x3 Demos (inserted at request) 

 Column 1 

π0

 Column 2 

π0.5

 Column 3 

VLA-JEPA

## As shown in the videos above, we observed that when the collected data used for fine-tuning does not contain repeated grasping actions, VLA-JEPA successfully learns the skill of repeated grasping, a capability not observed in π 0 and π 0.5 .

## Ablation: Video Horizon

 The model achieves its best performance when the video horizon is close to the predefined action horizon. When T is too small, the encoded information is insufficient; when T is too large, redundant information is introduced. 

TSpatialObjectGoalLIBERO-10Avg

495.099.295.889.094.8

894.899.895.894.096.1

1692.898.898.092.295.5
