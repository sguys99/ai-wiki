---
title: "Accelerate Generalist Humanoid Robot Development with NVIDIA Isaac GR00T N1"
type: article
year: 2025
category: physical-ai
raw_path: raw/articles/nvidia-2025-accelerate-generalist-humanoid-robot-development.md
raw_filename: "nvidia-2025-accelerate-generalist-humanoid-robot-development.md"
source_collection: external
author: "Kalyan Meher Vadrevu, Oyindamola Omotuyi"
url: "https://developer.nvidia.com/blog/accelerate-generalist-humanoid-robot-development-with-nvidia-isaac-gr00t-n1/"
publisher: "NVIDIA Technical Blog"
publication_date: "2025-03-18T17:40:00+00:00"
fetched_at: "2026-09-01T09:23:53+0900"
extractor_tier: "chrome"
tags: []
figures:
  - id: fig01
    file: assets/nvidia-2025-accelerate-generalist-humanoid-robot-development/fig01.gif
    raw: raw/articles/nvidia-2025-accelerate-generalist-humanoid-robot-development-figures/fig01.gif
    caption: "Image of two robots in a factory lifting objects with both arms."
    strategy: fetched
    curated: false
  - id: fig02
    file: assets/nvidia-2025-accelerate-generalist-humanoid-robot-development/fig02.gif
    raw: raw/articles/nvidia-2025-accelerate-generalist-humanoid-robot-development-figures/fig02.gif
    caption: "A GIF shows a humanoid robot in a kitchen lifting and placing a dragonfruit from a cutting board to a plate."
    strategy: fetched
    curated: false
  - id: fig03
    file: assets/nvidia-2025-accelerate-generalist-humanoid-robot-development/fig03.png
    raw: raw/articles/nvidia-2025-accelerate-generalist-humanoid-robot-development-figures/fig03.png
    caption: "A diagram shows a robot workflow with image, text, and action tokens turned into object manipulation."
    strategy: fetched
    curated: false
  - id: fig04
    file: assets/nvidia-2025-accelerate-generalist-humanoid-robot-development/page-full.png
    raw: raw/articles/nvidia-2025-accelerate-generalist-humanoid-robot-development-figures/page-full.png
    caption: "전체 페이지 스크린샷"
    strategy: screenshot
    curated: false
  - id: fig05
    file: assets/nvidia-2025-accelerate-generalist-humanoid-robot-development/crop01.png
    raw: raw/articles/nvidia-2025-accelerate-generalist-humanoid-robot-development-figures/crop01.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig06
    file: assets/nvidia-2025-accelerate-generalist-humanoid-robot-development/crop02.png
    raw: raw/articles/nvidia-2025-accelerate-generalist-humanoid-robot-development-figures/crop02.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig07
    file: assets/nvidia-2025-accelerate-generalist-humanoid-robot-development/crop03.png
    raw: raw/articles/nvidia-2025-accelerate-generalist-humanoid-robot-development-figures/crop03.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig08
    file: assets/nvidia-2025-accelerate-generalist-humanoid-robot-development/crop04.png
    raw: raw/articles/nvidia-2025-accelerate-generalist-humanoid-robot-development-figures/crop04.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig09
    file: assets/nvidia-2025-accelerate-generalist-humanoid-robot-development/crop05.png
    raw: raw/articles/nvidia-2025-accelerate-generalist-humanoid-robot-development-figures/crop05.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig10
    file: assets/nvidia-2025-accelerate-generalist-humanoid-robot-development/crop06.png
    raw: raw/articles/nvidia-2025-accelerate-generalist-humanoid-robot-development-figures/crop06.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig11
    file: assets/nvidia-2025-accelerate-generalist-humanoid-robot-development/crop07.png
    raw: raw/articles/nvidia-2025-accelerate-generalist-humanoid-robot-development-figures/crop07.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig12
    file: assets/nvidia-2025-accelerate-generalist-humanoid-robot-development/crop08.png
    raw: raw/articles/nvidia-2025-accelerate-generalist-humanoid-robot-development-figures/crop08.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig13
    file: assets/nvidia-2025-accelerate-generalist-humanoid-robot-development/crop09.png
    raw: raw/articles/nvidia-2025-accelerate-generalist-humanoid-robot-development-figures/crop09.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig14
    file: assets/nvidia-2025-accelerate-generalist-humanoid-robot-development/crop10.png
    raw: raw/articles/nvidia-2025-accelerate-generalist-humanoid-robot-development-figures/crop10.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
---

> 수집 메모 — `scripts/fetch_article.py` 가 사용자의 명시적 URL 지시에 따라 가져왔다 (CLAUDE.md rule #1 의 자료 수집 예외). 추출 tier: `chrome`. 본문은 원문 그대로이며 요약·번역·윤문하지 않았다.
> `category` 는 임시값이므로 Step 3 에서 확정할 것.

---

[Robotics](https://developer.nvidia.com/blog/category/robotics/)

English中文

# Accelerate Generalist Humanoid Robot Development with NVIDIA Isaac GR00T N1

![Image of two robots in a factory lifting objects with both arms.](https://developer-blogs.nvidia.com/wp-content/uploads/2025/03/nvidia-isaac-gr00t-n1-featured.gif)

 Mar 18, 2025 

 By [Kalyan Meher Vadrevu](https://developer.nvidia.com/blog/author/kalyanmehervadrevu/) and [Oyindamola Omotuyi](https://developer.nvidia.com/blog/author/oomotuyi/)

+23

[Discuss (0)](#entry-content-comments)

- [L](https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fdeveloper.nvidia.com%2Fblog%2Faccelerate-generalist-humanoid-robot-development-with-nvidia-isaac-gr00t-n1%2F)
- [T](https://twitter.com/intent/tweet?text=Accelerate+Generalist+Humanoid+Robot+Development+with+NVIDIA+Isaac+GR00T+N1+%7C+NVIDIA+Technical+Blog+https%3A%2F%2Fdeveloper.nvidia.com%2Fblog%2Faccelerate-generalist-humanoid-robot-development-with-nvidia-isaac-gr00t-n1%2F)
- [F](https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdeveloper.nvidia.com%2Fblog%2Faccelerate-generalist-humanoid-robot-development-with-nvidia-isaac-gr00t-n1%2F)
- [R](https://www.reddit.com/submit?url=https%3A%2F%2Fdeveloper.nvidia.com%2Fblog%2Faccelerate-generalist-humanoid-robot-development-with-nvidia-isaac-gr00t-n1%2F&title=Accelerate+Generalist+Humanoid+Robot+Development+with+NVIDIA+Isaac+GR00T+N1+%7C+NVIDIA+Technical+Blog)
- [E](mailto:?subject=I'd like to share a link with you&body=https%3A%2F%2Fdeveloper.nvidia.com%2Fblog%2Faccelerate-generalist-humanoid-robot-development-with-nvidia-isaac-gr00t-n1%2F)

## AI-Generated Summary

- [NVIDIA Isaac GR00T N1](https://developer.nvidia.com/isaac/gr00t) is the world's first open foundation model for generalized humanoid robot reasoning and skills, using a dual-system architecture with a Vision-Language Model for reasoning and a Diffusion Transformer for action generation.
- The model was trained on a data pyramid combining internet-scale web data, synthetic data generated through the [NVIDIA Omniverse](https://developer.nvidia.com/omniverse) platform, and real robot teleoperation data, with synthetic data providing a 40% performance boost over real data alone.
- GR00T N1 demonstrates strong generalization across manipulation tasks including grasping, dual-arm coordination, and multi-step operations, achieving 76.8% average success rate on real-world tasks with full training data.
- The [GR00T N1 2B model](https://huggingface.co/nvidia/GR00T-N1-2B) is available on Hugging Face as the first in a series of fully customizable pretrained models for humanoid robot development.

### Next Steps

- Access the [GR00T N1 2B model](https://huggingface.co/nvidia/GR00T-N1-2B) on Hugging Face to begin development.
- Review the [Isaac-GR00T GitHub repository](http://github.com/NVIDIA/Isaac-GR00T) for sample datasets and PyTorch fine-tuning scripts.
- Read the [GR00T N1 whitepaper](https://arxiv.org/abs/2503.14734) for detailed technical information about the model architecture and training methodology.

Powered by NVIDIA Nemotron. AI-generated content may summarize information incompletely. Verify important information. [Learn more](https://www.nvidia.com/en-us/agreements/trustworthy-ai/terms/)

[Humanoid robots](https://www.nvidia.com/en-us/glossary/humanoid-robot/) are designed to adapt to human workspaces, tackling repetitive or demanding tasks. However, creating general-purpose humanoid robots for real-world tasks and unpredictable environments is challenging. Each of these tasks often requires a dedicated AI model. Training these models from scratch for every new task and environment is a laborious process due to the need for vast task-specific data, high computational cost, and limited generalization. 

[NVIDIA Isaac GR00T](https://developer.nvidia.com/isaac/gr00t) helps tackle these challenges and accelerates general-purpose humanoid robot development by providing you with open-source SimReady data, simulation frameworks such as [NVIDIA Isaac Sim](https://developer.nvidia.com/isaac/sim) and [Isaac Lab](https://developer.nvidia.com/isaac/lab), [synthetic data blueprints](https://developer.nvidia.com/blog/building-a-synthetic-motion-generation-pipeline-for-humanoid-robot-learning/), and pretrained foundation models.

## NVIDIA Isaac GR00T N1 features and benefits

NVIDIA Isaac GR00T N1 is the world’s first open foundation model for generalized humanoid robot reasoning and skills. This cross-embodiment model takes multimodal input, including language and images, to perform manipulation tasks in diverse environments. 

GR00T N1 was trained on an expansive humanoid dataset, complemented by synthetic data generated using the components of the [NVIDIA Isaac GR00T Blueprint](https://developer.nvidia.com/blog/building-a-synthetic-motion-generation-pipeline-for-humanoid-robot-learning/) and internet-scale video data. It is adaptable through post-training for specific embodiments, tasks, and environments. A subset of this data is now freely available to the developer community through the open-source [NVIDIA physical AI dataset on Hugging Face](https://huggingface.co/collections/nvidia/physicalai-67c643edbb024053dcbcd6d8).

Video 1. NVIDIA Isaac GR00T N1: An Open Foundation Model for Humanoid Robots

GR00T N1 uses one model and set of weights to enable manipulation behaviors on humanoid robots, such as the Fourier GR-1 and 1X Neo. It demonstrates robust generalization across a range of tasks, including grasping and manipulating objects with one or both arms, as well as transferring items between arms. 

![A GIF shows a humanoid robot in a kitchen lifting and placing a dragonfruit from a cutting board to a plate.](https://developer-blogs.nvidia.com/wp-content/uploads/2025/03/gr00t-n1-object-manipulation.gif)

Figure 1. GR00T N1 used in object manipulation

It can also execute complex, multi-step tasks that require sustained contextual understanding and the integration of diverse skills. These capabilities make it well-suited for applications in material handling, packaging, and inspection.

Video 2. NVIDIA Isaac GR00T N1 for Complex Manipulation Tasks

Today, NVIDIA announced the availability of the [GR00T N1 2B model](https://huggingface.co/nvidia/GR00T-N1-2B), the first in a series of fully customizable models that we will pretrain and release.

## GR00T N1 model architecture

GR00T N1 features a dual-system architecture inspired by human cognition, consisting of the following complementary components:

- Vision-Language Model (System 2): This methodical thinking system is based on NVIDIA-Eagle with SmolLM-1.7B. It interprets the environment through vision and language instructions, enabling robots to reason about their environment and instructions, and plan the right actions.
- Diffusion Transformer (System 1): This action model generates continuous actions to control the robot’s movements, translating the action plan made by System 2 into precise, continuous robot movements. 

These systems are tightly coupled, enabling them to be optimized together during post-training.

![A diagram shows a robot workflow with image, text, and action tokens turned into object manipulation.](https://developer-blogs.nvidia.com/wp-content/uploads/2025/03/gr00t-n1-model-architecture-1024x576.png)

Figure 2. GR00T N1 model architecture

## GR00T N1 data strategy for pretraining

Training a generalist model like GR00T N1 demands a robust data approach that leverages the complementary benefits of diverse data types. The GR00T N1 training data forms a pyramid, with data quantity decreasing and embodiment specificity increasing from base to peak.

- At the foundation, internet-scale web data and human videos provide a broad base of visual and linguistic information. These datasets capture human-object interactions, offering insights into natural motion patterns and task semantics. 
- The middle layer incorporates [synthetic data](https://www.nvidia.com/en-us/glossary/synthetic-data-generation/) generated by the [NVIDIA Omniverse](https://developer.nvidia.com/omniverse) platform. 
- At the peak is real robot data collected through teleoperation on various platforms, offering precise insights into robotic capabilities.

Human-centered online videos provide valuable insights into human-object interactions but lack motor control signals for robots. Simulation data fills this gap with infinite, real-time data through GPU acceleration, though it faces a simulation-to-reality gap. 

Real robot data bridges this gap but is costly and time-consuming. By combining this diverse data and using techniques such as latent action training, which teaches robots to learn from large-scale, unlabeled, human video data without supervision, a robust strategy emerges that enhances robot training, improving the performance and adaptability of GR00T N1.

This approach was put into practice using the [NVIDIA Isaac GR00T blueprint](https://build.nvidia.com/nvidia/isaac-gr00t-synthetic-manipulation). With it, over 750K synthetic trajectories were generated in just 11 hours, equivalent to 6.5K hours or nine continuous months of human demonstration data. The integration of this synthetic data with real data resulted in a 40% performance boost for GR00T N1 compared to using only real data.

## Hands-on with GR00T N1

You can get started with GR00T N1 using the following steps:

- Data preparation: Format your robot demonstration data (video, state, action) triplets into a GR00T dataset, which is compatible with the Hugging Face LeRobot format. 
- Data validation: Use the validation script to ensure that your data adheres to the correct format. 
- Post-training: Use PyTorch scripts to fine-tune the pretrained GR00T N1 model with your custom dataset. 
- Inference: Connect the inference script to your robot controller to execute the actions on your target hardware or your simulation environment using the post-trained GR00T N1 model.
- Evaluation: Run the evaluation scripts to get the task-success rate of the model.

## Performance

The GR00T N1 models were evaluated using both simulated and real-world benchmarks to assess their performance in diverse robotic embodiments and manipulation tasks. Simulation experiments used three distinct benchmarks, while real-world tests focused on tabletop manipulation tasks with the GR-1 humanoid robot. 

### Simulation benchmarks

Three benchmarks are used for simulation experiments: two open-source ones from prior studies and a new suite mirroring real-world tabletop manipulation tasks, chosen to evaluate the models across different robot embodiments and diverse manipulation tasks.

RoboCasaDexMGGR-1Average

BC Transformer26.3%53.9%16.1%26.4%

Diffusion Policy25.6%56.1%32.7%33.4%

NVIDIA Isaac GR00T N1 2B32.1%66.5%50.0%45.0%

Table 1. Average success rate across simulation benchmarks, using 100 demonstrations per task

### Real benchmarks

The models were assessed on a variety of manipulation tasks that require precise object handling, coordinated two-handed movements, and advanced spatial awareness, allowing for refined control in intricate interactions.

Pick-and-PlaceArticulatedIndustrialCoordinationAverage

Diffusion Policy (10% Data)3.0%14.3%6.7%27.5%10.2%

NVIDIA Isaac GR00T N1 2B (10% Data)35.0%62.0%31.0%50.0%42.6%

Table 2. Average policy success rate on real-world tasks with the GR-1 humanoid robots

Pick-and-PlaceArticulatedIndustrialCoordinationAverage

Diffusion Policy (Full Data)36.0%38.6%61.0%62.5%46.4%

NVIDIA Isaac GR00T N1 2B (Full Data)82.0%70.9%70.0%82.5%76.8%

Table 3. Average policy success rate on real-world tasks with the GR-1 humanoid robots

Compared to the Diffusion Policy baseline, the Isaac GR00T N1 model demonstrates smoother and more fluid motion, alongside a marked improvement in grasping accuracy, particularly when fine-tuned on smaller post-training datasets. 

Results further highlight that GR00T N1 not only learns new tasks more efficiently but also follows language instructions with greater precision than baseline methods.

## Get started today

You can access the following resources to start working with GR00T N1:

- The NVIDIA Isaac GR00T-N1-2B model is available on [Hugging Face](https://huggingface.co/nvidia/GR00T-N1-2B).
- Sample datasets and PyTorch scripts for fine-tuning are available from the [/NVIDIA/Isaac-GR00T](http://github.com/NVIDIA/Isaac-GR00T) GitHub repo.

Use the following resources for post-training and inference:

- For post-training, the minimum configuration is either one NVIDIA RTX A6000 or one NVIDIA GeForce RTX 4090 GPUs. For more demanding needs, suggested configurations include the NVIDIA DGX Spark or NVIDIA DGX H100 systems.
- For inference, the GR00T N1 model can be deployed on either the NVIDIA RTX A6000 GPU or the NVIDIA Jetson AGX Orin supercomputer.

For more information about the model, see the [GR00T N1: An Open Foundation Model for Generalist Humanoid Robots](https://arxiv.org/abs/2503.14734) whitepaper.

This model, combined with NVIDIA Isaac GR00T synthetic motion and data generation pipelines, along with simulation frameworks such as [Isaac Lab](https://developer.nvidia.com/isaac/lab) and [Isaac Sim](https://developer.nvidia.com/isaac/sim), enables you to create general-purpose humanoid robots.

For more detailed information about NVIDIA Isaac GR00T, watch the [GTC Keynote](https://www.nvidia.com/gtc/keynote/) from NVIDIA CEO Jensen Huang and GTC key sessions, including [An Introduction to Building Humanoid Robots](https://www.nvidia.com/gtc/session-catalog/?tab.catalogallsessionstab=16566177511100015Kus&search=jim-fan#/session/1727464623182001S2li).

Stay up to date by subscribing to the [newsletter](https://www.nvidia.com/en-us/industries/robotics/robotics-stay-informed/) and following NVIDIA Robotics on [YouTube](https://www.youtube.com/channel/UCSKUoczbGAcMld7HjpCR8OA), [Discord](https://discord.gg/w9VvuYdq), and [developer forums](https://forums.developer.nvidia.com/c/omniverse/simulation/69).

[Discuss (0)](#entry-content-comments)

+23

## Tags

[Robotics](https://developer.nvidia.com/blog/category/robotics/) | [Simulation / Modeling / Design](https://developer.nvidia.com/blog/category/simulation-modeling-design/) | [Manufacturing](https://developer.nvidia.com/blog/recent-posts/?industry=Manufacturing) | [AI Foundation Models](https://developer.nvidia.com/blog/recent-posts/?products=AI+Foundation+Models) | [Isaac Sim](https://developer.nvidia.com/blog/recent-posts/?products=Isaac+Sim) | [General Interest](https://developer.nvidia.com/blog/recent-posts/?learning_levels=General+Interest) | [News](https://developer.nvidia.com/blog/recent-posts/?content_types=News) | [featured](https://developer.nvidia.com/blog/tag/featured/) | [GTC 25](https://developer.nvidia.com/blog/tag/gtc-25/) | [Humanoid Robots](https://developer.nvidia.com/blog/tag/humanoid-robots/)

## About the Authors

![Avatar photo](https://developer-blogs.nvidia.com/wp-content/uploads/2021/04/Kalyan-Vadrevu-131x131.jpeg)

 About Kalyan Meher Vadrevu 
 Kalyan Vadrevu is a product marketing manager at NVIDIA, where he focuses on Isaac CUDA-X libraries and AI models. Before joining NVIDIA, he worked in developer relations and software development kit marketing at Microsoft and Nokia. He has an MBA in marketing from Indiana University Bloomington. 

[View all posts by Kalyan Meher Vadrevu](https://developer.nvidia.com/blog/author/kalyanmehervadrevu/)

![Oyindamola Omotuyi](https://developer-blogs.nvidia.com/wp-content/uploads/2022/07/Capture-131x131.png)

 About Oyindamola Omotuyi 
 Oyindamola Omotuyi is a technical marketing engineer at NVIDIA, working on robotics and robot learning applications on the NVIDIA Isaac Sim, Isaac Lab and Isaac Manipulator platforms. Prior to joining full-time, she interned twice at NVIDIA in Conversational AI and Robotics Product marketing. She earned her Ph.D. in Mechanical Engineering from the University of Cincinnati with a focus on state estimation, imitation learning and deep reinforcement learning for single and multi-agent systems. 

[View all posts by Oyindamola Omotuyi](https://developer.nvidia.com/blog/author/oomotuyi/)

## Comments

### Start the discussion at forums.developer.nvidia.com
