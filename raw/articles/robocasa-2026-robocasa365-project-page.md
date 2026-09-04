---
title: "RoboCasa"
type: article
year: 2026
category: physical-ai
raw_path: raw/articles/robocasa-2026-robocasa365-project-page.md
raw_filename: "robocasa-2026-robocasa365-project-page.md"
source_collection: external
author: "robocasa"
url: "https://robocasa.ai/"
publisher: "robocasa.ai"
fetched_at: "2026-09-04T18:32:37+0900"
extractor_tier: "chrome"
tags: []
figures:
  - id: fig01
    file: assets/robocasa-2026-robocasa365-project-page/page-full.png
    raw: raw/articles/robocasa-2026-robocasa365-project-page-figures/page-full.png
    caption: "전체 페이지 스크린샷"
    strategy: screenshot
    curated: false
---

> 수집 메모 — `scripts/fetch_article.py` 가 사용자의 명시적 URL 지시에 따라 가져왔다 (CLAUDE.md rule #1 의 자료 수집 예외). 추출 tier: `chrome`. 본문은 원문 그대로이며 요약·번역·윤문하지 않았다.
> `category` 는 임시값이므로 Step 3 에서 확정할 것.

---

RoboCasa is a large-scale simulation framework for training generally capable robots to perform everyday tasks. It features realistic and diverse human-centered environments with a focus on kitchen scenes. We create these environments with the aid of generative AI tools, such as large language models (LLMs) and text-to-image/3D generative models. Together with the simulated tasks, we offer a dataset of high-quality human demonstrations and leverage automated trajectory generation techniques to significantly expand the amount of training data with little additional cost.

We’re excited to announce RoboCasa365, the latest release built on the RoboCasa platform: 365 everyday tasks across 2,500 diverse kitchen environments, with 600+ hours of human demonstration data and 1,600+ hours of synthetically generated demonstrations. RoboCasa365 is designed for systematic benchmarking across key settings, including multi-task learning, foundation model training, and lifelong learning. It supports popular policy learning models, such as Diffusion Policy, π₀, and GR00T.

---

## Realistic and Diverse Scenes

To capture the complexity and diversity of real-world environments, we consult numerous architecture and home design magazines and compile a collection of kitchen layouts and styles reflecting the vast diversity of kitchens in homes around the world. We model these kitchens according to standard size and spatial specifications and fit them with a large repository of interactable furniture and appliances spanning cabinets, stoves, sinks, microwaves, and more.

RoboCasa365 significantly expands this foundation: from the original 120 scenes we scale to 2,500 unique kitchen environments for large-scale training. We introduce 50 new layouts based on real-world homes, paired with 50 additional styles that vary fixtures, appliances, and textures.

## Cross-Embodiment Support

The simulator supports mobile manipulators of diverse form factors, such as single-arm mobile platforms, humanoid robots, and quadruped robots with arms.

## Interactable Furniture and Appliances

Each kitchen scene is equipped with a selection of interactable furniture and appliances. Several types of interactable objects are articulated; for example, a robot can open and close doors on microwaves and twist knobs on stoves. Other types of interactable objects can undergo state changes; for example, when a knob on the stove is turned, the corresponding burner turns on.

---

## Augmenting Scene Diversity with Text-to-Image Models

Each scene can be customized by replacing textures from a large selection of high-quality AI-generated textures created using the popular text-to-image models from [MidJourney](https://docs.midjourney.com/docs/model-versions). We provide 100 textures for walls, 100 for the floor, 100 for counters, and 100 for cabinet panels, respectively. These textures can be used as a form of realistic domain randomization to increase the visual diversity of our training datasets substantially.

## Creating Diverse Object Assets with Text-to-3D Models

We curate a repository of 3,200+ objects across more than 150 categories, spanning a variety of fruits, vegetables, packaged foods, and receptacles. They are sourced from [Objaverse](https://objaverse.allenai.org/) 1.0, [LightWheel AI](https://www.lightwheel.ai/), and the remaining are AI-generated from [Luma AI](https://lumalabs.ai/).

## Training Foundational Robot Skills

We focus on ten foundational skills as the basic building blocks to scaffold long-horizon manipulation behaviors for the majority of household activities: (1) Pick and place, (2) Opening and closing doors, (3) Opening and closing drawers, (4) Twisting knobs, (5) Turning levers, (6) Pressing buttons, (7) Insertion, (8) Navigation, (9) Sliding Racks, and (10) Closing/Opening Lids. RoboCasa365 includes 65 atomic tasks for systematically training and benchmarking these skills.

### Pick and Place

### Opening and Closing Doors

### Turning Levers

### Twisting Knobs

### Pressing Buttons

## Generating Composite Tasks with LLM Guidance

Composite tasks involve sequencing skills to solve semantically meaningful activities, from restocking kitchen supplies to brewing coffee. Our goal in creating these tasks is to capture realistic and diverse tasks that reflect the ecological statistics of real-world household activities in the human-centered world. We use the guidance of large language models (LLMs), [GPT-4](https://openai.com/index/gpt-4-research/) particularly, to define our tasks, as they encapsulate a vast amount of common sense and world knowledge of the human world and can thus effectively provide task candidates based on the environments and the robot’s skills.

### Steaming Vegetables

### Restocking Kitchen Supplies

### Brewing Coffee

---

# Team

### Core Team

[Soroush Nasiriany](https://snasiriany.me)

[Sep Nasiriany](https://sepnasiriany.github.io/)

[Abhiram Maddukuri](https://abhiram824.github.io/)

[Yuke Zhu](https://yukezhu.me/)

### Alumni

[Lance Zhang](https://www.linkedin.com/in/lancezhang04/)

[Adeet Parikh](https://www.linkedin.com/in/adeet-parikh/)

[Aaron Lo](https://www.linkedin.com/in/aaron-lo-18a6871b3/)

[Abhishek Joshi](https://www.linkedin.com/in/abhishek-joshi-4ab469180/)

[Ajay Mandlekar](https://ai.stanford.edu/~amandlek/)

# Citation

RoboCasa365:

```
@inproceedings
{
robocasa365
,

 
title
=
{RoboCasa365: A Large-Scale Simulation Framework for Training and Benchmarking Generalist Robots}
,

 
author
=
{Soroush Nasiriany and Sepehr Nasiriany and Abhiram Maddukuri and Yuke Zhu}
,

 
booktitle
=
{International Conference on Learning Representations (ICLR)}
,

 
year
=
{2026}

}
```

RoboCasa (Original Release):

```
@inproceedings
{
robocasa2024
,

 
title
=
{RoboCasa: Large-Scale Simulation of Everyday Tasks for Generalist Robots}
,

 
author
=
{Soroush Nasiriany and Abhiram Maddukuri and Lance Zhang and Adeet Parikh and Aaron Lo and Abhishek Joshi and Ajay Mandlekar and Yuke Zhu}
,

 
booktitle
=
{Robotics: Science and Systems (RSS)}
,

 
year
=
{2024}

}
```
