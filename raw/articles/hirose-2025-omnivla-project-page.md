---
title: "OmniVLA: An Omni-Modal Vision-Language-Action Model for Robot Navigation"
type: article
year: 2025
category: physical-ai
raw_path: raw/articles/hirose-2025-omnivla-project-page.md
raw_filename: "hirose-2025-omnivla-project-page.md"
source_collection: external
author: "Noriaki Hirose"
url: "https://omnivla-nav.github.io/"
publisher: "omnivla-nav.github.io"
fetched_at: "2026-09-17T21:32:44+0900"
extractor_tier: "chrome"
tags: []
figures:
  - id: fig01
    file: assets/hirose-2025-omnivla-project-page/fig01.png
    raw: raw/articles/hirose-2025-omnivla-project-page-figures/fig01.png
    caption: ""
    strategy: fetched
    curated: false
  - id: fig02
    file: assets/hirose-2025-omnivla-project-page/fig02.png
    raw: raw/articles/hirose-2025-omnivla-project-page-figures/fig02.png
    caption: ""
    strategy: fetched
    curated: false
  - id: fig03
    file: assets/hirose-2025-omnivla-project-page/page-full.png
    raw: raw/articles/hirose-2025-omnivla-project-page-figures/page-full.png
    caption: "전체 페이지 스크린샷"
    strategy: screenshot
    curated: false
---

> 수집 메모 — `scripts/fetch_article.py` 가 사용자의 명시적 URL 지시에 따라 가져왔다 (CLAUDE.md rule #1 의 자료 수집 예외). 추출 tier: `chrome`. 본문은 원문 그대로이며 요약·번역·윤문하지 않았다.
> `category` 는 임시값이므로 Step 3 에서 확정할 것.

---

# OmniVLA: An Omni-Modal Vision-Language-Action Model for Robot Navigation

[Noriaki Hirose](https://sites.google.com/view/noriaki-hirose/)1, 2, [Catherine Glossop](https://catglossop.github.io/)1, [Dhruv Shah](https://robodhruv.github.io/)3, [Sergey Levine](https://cs.berkeley.edu/~svlevine)1

1 University of California, Berkeley, 2 Toyota Motor North America, 3 Princeton University

 IEEE International Conference on Robotics and Automation (ICRA) 2026

 PDF Link. [Paper](https://arxiv.org/pdf/2509.19480) Talk Link. [YouTube](https://youtu.be/h9NgUQSJPQU) Code Link. [Code](https://github.com/NHirose/OmniVLA) Checkpoint Link[Checkpoint](https://huggingface.co/NHirose/omnivla-original) BibTex [BibTex](./static/omnivla.bib)

 Abstract. 

## Abstract

 Humans can flexibly interpret and compose different goal specifications, such as language instructions, spatial coordinates, or visual references, when navigating to a destination. In contrast, most existing robotic navigation policies are trained on a single modality, limiting their adaptability to real-world scenarios where different forms of goal specification are natural and complementary. In this work, we present a training framework for robotic foundation models that enables omni-modal goal conditioning for vision-based navigation. Our approach leverages a high-capacity vision-language-action (VLA) backbone and trains with three primary goal modalities: 2D poses, egocentric images, and natural language, as well as their combinations, through a randomized modality fusion strategy. This design not only expands the pool of usable datasets but also encourages the policy to develop richer geometric, semantic, and visual representations. The resulting model, OmniVLA, achieves strong generalization to unseen environments, robustness to scarce modalities, and the ability to follow novel natural language instructions. We demonstrate that OmniVLA outperforms specialist baselines across modalities and offers a flexible foundation for fine-tuning to new modalities and tasks. We believe OmniVLA provides a step toward broadly generalizable and flexible navigation policies, and a scalable path for building omni-modal robotic foundation models. 

/ Abstract. Paper video. 

## Full video

## Approach

### Motivation

 In this study, we propose a family of Omni-Modal Vision-Language-Action Models (OmniVLA) for autonomous navigation that can ingest goals expressed in multiple modalities, leveraging information across modalities, and achieving a more flexible navigation policy. We train our model with goals specified through three primary modalities: (1) 2D poses, (2) egocentric images, and (3) natural language. By simultaneously learning to interpret these different modalities, the model must develop a richer understanding of the geometric, visual, and semantic information of the task, resulting in a more powerful navigation model as a foundation model. Moreover, our method allows the user to instruct the robot with multiple modalities, making it more user friendly and directly allowing the policy to leverage more than one kind of information about a goal. For example, a user can specify a target pose and provide instructions on \emph{how} to reach it through language. 

### OmniVLA

 To train these policies, we compose several design choices into one system, resulting in a flexible and general navigation policy. We use an expressive vision-language-action (VLA) model, [OpenVLA](https://openvla.github.io/) as the base model, enabling us to leverage internet-scale knowledge from the VLM backbone and the representations learned during fine-tuning on cross-embodiment robot data. As a result, our policy exhibits strong generalization and fine-tuning capabilities, following language instructions not seen in the training data, and adapting to completely new modalities. Additionally, we address the problem of modality imbalance and scarcity by using modality dropout during training, and modality masking during inference. This ensures that our policy attends to all available goal modalities and learn from cross-modal goal representations across all datasets. 

![](./static/images/omniVLA.png)

### Dataset

 Our training corpus spans 9,500 hours across 10 platforms, including human-collected data, covering a wide range of environments. GNM and LeLaN are themselves mixtures of 7 and 5 publicly available datasets, respectively. The GNM mixture includes [GO Stanford4](https://svl.stanford.edu/projects/dvmpc/dataset/), [HuRoN (SACSoN)](https://sites.google.com/view/sacson-review/huron-dataset?authuser=0), [RECON](https://sites.google.com/view/recon-robot/), [SCAND](https://www.cs.utexas.edu/~xiao/SCAND/SCAND.html), [CoryHall](https://arxiv.org/abs/1709.10489), [TartanDrive](https://github.com/castacks/tartan_drive), and [Seattle](https://github.com/JHLee0513/semantic_bevnet). [LeLaN](https://learning-language-navigation.github.io/) combines both robot and non-robot data to learn a generalized language-conditioned navigation policy, using a model-based approach to generate counterfactual actions toward target objects along with language prompts derived from VLM reasoning. For LeLaN, we use released synthetic action commands and language prompts from [GO Stanford2](https://cvgl.stanford.edu/gonet/dataset/), [GO Stanford4](https://svl.stanford.edu/projects/dvmpc/dataset/), [HuRoN (SACSoN)](https://sites.google.com/view/sacson-review/huron-dataset?authuser=0), the HumanWalking dataset, and YouTube videos. (HumanWalking and YouTube datasets are available from the [LeLaN](https://learning-language-navigation.github.io/) project page.) 

 While large datasets support generalization, large-scale collection efforts often introduce noise, which can reduce accuracy. For the [FrodoBots-2k dataset](https://huggingface.co/datasets/frodobots/FrodoBots-2K), we use synthetic actions generated with [MBRA](https://github.com/NHirose/Learning-to-Drive-Anywhere-with-MBRA). Because existing reannotation approaches cannot bridge the embodiment gap in the [BDD-V dataset](https://bair.berkeley.edu/blog/2018/05/30/bdd/) (autonomous vehicles vs. small robots), we train a reannotation model to generate reasonable synthetic actions, enabling its use for training in a manner similar to [MBRA](https://github.com/NHirose/Learning-to-Drive-Anywhere-with-MBRA). Finally, we finetune OmniVLA on the [CAST dataset](https://huggingface.co/datasets/catglossop/CAST-dataset) to evaluate adaptability to a new language domain. 

![](./static/images/dataset.png)

 Animation. 

## Experiments

 We evaluate OmniVLA on language-, 2D goal pose-, and egocentric goal image-conditioned navigation across different robots to analyze cross-embodiment performance. 

 Animation. 

/ Interpolating. Re-rendering. 

### Language-conditioned navigation (Out-Of-Distribution prompt)

 We deploy OmniVLA on the FrodoBots and ERZ for language-conditioned navigation. In these videos, we provide out-of-distribution language prompts that both instruct the robot on how to move and specify the target location. Our training dataset includes prompts such as “move toward X,” where X denotes the target object. 

 Results Carousel 

- 
- 
- 
- 
- 

 Animation. 

/ Interpolating. Re-rendering. 

### Language-conditioned navigation (In-Distribution prompt)

 The following videos use in-distribution language prompts. Our policy successfully avoids collisions with obstacles between the robot’s starting position and the target objects. 

 Results Carousel 

- 

 Animation. 

/ Interpolating. Re-rendering. 

### Language-conditioned navigation (Cross embodiment analysis)

 We deploy OmniVLA on other robot embodiments, including the Unitree GO1 quadruped and Vizbot, a Roomba-based prototype, in both indoor and outdoor settings. Using different cameras on the GO1 and Vizbot, we evaluate the cross-embodiment performance of our policy. The robots achieve successful goal-reaching behavior even in the most challenging language-conditioned navigation tasks, highlighting the policy’s generalization ability. 

 Results Carousel 

- 
- 
- 
- 
- 
- 
- 
- 
- 

 Animation. 

/ Interpolating. Re-rendering. 

### Multi-modal conditioned navigation (Language & 2D pose)

 By training on omni-modal task representations, OmniVLA can learn to follow multiple goal signals. We conduct experiments where tasks are specified by providing both 2D goal poses (where?}) and behavioral language instructions (how?) in 10 different environments. 

 Results Carousel 

- 

 Animation. 

/ Interpolating. Re-rendering. 

### 2D goal pose-conditioned navigation

 We deploy OmniVLA for long-range 2D goal pose-conditioned navigation. Conditioned on 2D goal poses, our policy navigates to targets 25–100 meters from the robot’s starting position. GPS is used to estimate both the robot’s location and the target goal position. 

 Results Carousel 

- 
- 
- 
- 
- 
- 

 Animation. 

/ Interpolating. Re-rendering. 

### Egocentric goal image-conditioned navigation

 In addition to language- and 2D pose-conditioned navigation, we evaluate the egocentric goal image-conditioned navigation policy, primarily in indoor environments. Similar to prior image-conditioned approaches such as ViNT, ExAug, and NoMaD, our policy can navigate toward goals up to 3 meters away, enabling the use of a topological memory for reaching more distant targets. To collect this goal loop, we teleoperate the robot and record image observations at a fixed frame rate of 1 Hz. During deployment, we start from the initial observation and continuously identify the closest node in the topological memory. At each time step, the image from the next node is provided as the goal image to compute the next action. Our OmniVLA supports navigation using multiple modalities to specify both the goal location and the desired movement. 

 Results Carousel 

- 
- 
- 
- 
- 

## BibTeX

```
 @misc{hirose2025omnivla,
 title={OmniVLA: An Omni-Modal Vision-Language-Action Model for Robot Navigation}, 
 author={Noriaki Hirose and Catherine Glossop and Dhruv Shah and Sergey Levine},
 year={2025},
 eprint={2509.19480},
 archivePrefix={arXiv},
 primaryClass={cs.RO},
 url={https://arxiv.org/abs/2509.19480}, 
 }
```

 The website ([source code](https://github.com/model-base-reannotation/model-base-reannotation)) design was adapted from [Nerfies](https://nerfies.github.io).
