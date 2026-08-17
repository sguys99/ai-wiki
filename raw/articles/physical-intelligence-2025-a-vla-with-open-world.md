---
title: "A VLA with Open-World Generalization"
type: article
year: 2025
category: physical-ai
raw_path: raw/articles/physical-intelligence-2025-a-vla-with-open-world.md
raw_filename: "physical-intelligence-2025-a-vla-with-open-world.md"
source_collection: external
author: "Physical Intelligence"
url: "https://www.pi.website/blog/pi05"
publisher: "www.pi.website"
publication_date: "2025-04-22"
fetched_at: "2026-08-17T20:21:13+0900"
extractor_tier: "chrome"
tags: []
figures:
  - id: fig01
    file: assets/physical-intelligence-2025-a-vla-with-open-world/fig01.jpg
    raw: raw/articles/physical-intelligence-2025-a-vla-with-open-world-figures/fig01.jpg
    caption: "verbal instruction"
    strategy: fetched
    curated: false
  - id: fig02
    file: assets/physical-intelligence-2025-a-vla-with-open-world/fig02.jpg
    raw: raw/articles/physical-intelligence-2025-a-vla-with-open-world-figures/fig02.jpg
    caption: "subtask command"
    strategy: fetched
    curated: false
  - id: fig03
    file: assets/physical-intelligence-2025-a-vla-with-open-world/fig03.jpg
    raw: raw/articles/physical-intelligence-2025-a-vla-with-open-world-figures/fig03.jpg
    caption: "object detection"
    strategy: fetched
    curated: false
  - id: fig04
    file: assets/physical-intelligence-2025-a-vla-with-open-world/fig04.jpg
    raw: raw/articles/physical-intelligence-2025-a-vla-with-open-world-figures/fig04.jpg
    caption: "Multimodal Web Data"
    strategy: fetched
    curated: false
  - id: fig05
    file: assets/physical-intelligence-2025-a-vla-with-open-world/page-full.png
    raw: raw/articles/physical-intelligence-2025-a-vla-with-open-world-figures/page-full.png
    caption: "전체 페이지 스크린샷"
    strategy: screenshot
    curated: false
---

> 수집 메모 — `scripts/fetch_article.py` 가 사용자의 명시적 URL 지시에 따라 가져왔다 (CLAUDE.md rule #1 의 자료 수집 예외). 추출 tier: `chrome`. 본문은 원문 그대로이며 요약·번역·윤문하지 않았다.
> `category` 는 임시값이므로 Step 3 에서 확정할 것.

---

# π 0.5 : a VLA with Open-World Generalization

Published

April 22, 2025

Email

research@physicalintelligence.companyKevin Black, Noah Brown, James Darpinian, Karan Dhabalia, Danny Driess, Adnan Esmail, Michael Equi, Chelsea Finn, Niccolo Fusai, Manuel Galliker, Dibya Ghosh, Lachy Groom, Karol Hausman, Brian Ichter, Szymon Jakubczak, Tim Jones, Liyiming Ke, Devin LeBlanc, Sergey Levine, Adrian Li-Bell, Mohith Mothukuri, Suraj Nair, Karl Pertsch, Allen Ren, Lucy Xiaoyang Shi, Laura Smith, Jost Tobias Springenberg, Kyle Stachowicz, James Tanner, Quan Vuong, Homer Walke, Anna Walling, Haohuan Wang, Lili Yu, Ury Zhilinsky

Paper

[π 0.5 .pdf](/download/pi05.pdf)

0:073:18

Robots have come a long way over the past few years—they can perform impressive acrobatic feats, dance on stage, follow language commands and, [in some of our own results](/blog/pi0), perform complex tasks like folding laundry or cleaning off a table. But the biggest challenge in robotics is not in performing feats of agility or dexterity, but generalization: the ability to figure out how to correctly perform even a simple task in a new setting or with new objects. Imagine a robot that needs to clean your home: every home is different, with different objects in different places. Generalization must occur at many levels. At the low level, the robot must understand how to pick up a spoon (by the handle) or plate (by the edge), even if it has not seen these specific spoons or plates before, and even if they are placed in a pile of dirty dishes. At a higher level, the robot must understand the semantics of each task—where to put clothes and shoes (ideally in the laundry hamper or closet, not on the bed), and what kind of tool is appropriate for wiping down a spill. This generalization requires both robust physical skills and a common-sense understanding of the environment, so that the robot can generalize at many levels at the same time, from physical, to visual, to semantic. This is made even harder by the limited availability of diverse data for such robotic systems.

This is why most commercial robots operate in tightly controlled environments like factories or warehouses: in a world where the robot never needs to venture outside of a single building and where the objects and their locations are predetermined, current robotic methods that provide for only weak generalization can be very successful. Even the impressive demonstrations of robotic agility and dexterity that have been shown in recent years are typically designed to work in a specific environment, often with data collected in the test scene or very similar settings. But if we want robots to be part of our everyday lives, working in our homes, grocery stores, offices, hospitals, and other "messy" environments, we need strong generalization.

We have been developing robotic foundation models that can generalize to such messy environments, building on our vision-language-action (VLA) model π0. While both π0 and other recent VLAs are evaluated in environments that closely match training, we've developed a new model that we call π0.5 that exhibits meaningful generalization to entirely new environments. We believe that this represents a significant step forward toward truly generalizable physical intelligence. Our current model is far from perfect: its goal is not to accomplish new skills or exhibit high dexterity, but to generalize to new settings, such as cleaning up a kitchen or bedroom in a new home that was not seen in the training data. In our experiments, π0.5 can perform a variety of tasks in entirely new homes. It does not always succeed on the first try, but it often exhibits a hint of the flexibility and resourcefulness with which a person might approach a new challenge.

The individual tasks that π0.5 performs vary in difficulty, from rearranging objects (e.g., to put dishes in the sink) to much more intricate behaviors, such as using a sponge to wipe down a spill. We show some of the more complex stages in these tasks below, and the videos of the long-horizon behaviors [later in the post](#long-horizon-videos).

### How does it work?

The main principle behind π0.5 is co-training on heterogeneous data: by training our VLA model on a variety of different data sources, we can teach it not only how to physically perform diverse skills, but also how to understand the semantic context of each skill (e.g., if the task is to clean the kitchen, what are appropriate objects to pick up and put away, and where to put them), infer the high-level structure of a task (e.g., the steps required to make a bed), and even transfer physical behaviors from other robots (e.g., simpler robots that have one arm or no mobile base, or data from robots in less diverse environments).

Co-training is conceptually straightforward: because VLAs are derived from general vision-language models (VLMs), they can be trained on examples that consist of any combination of actions, images, text, and other multimodal annotations such as bounding boxes. This includes general multimodal tasks, such as image captioning, visual question answering, or object detection, and robotic oriented tasks, such as robotic demonstrations with actions, and "high-level" robot examples, consisting of observations labeled with the appropriate semantic behavior (e.g., an observation of an unmade bed with the label "pick up the pillow"). We also include "verbal instruction" demonstrations, where a person coaches the robot through a complex task by telling it what to do step by step (with natural language). The model makes both high-level inferences about the next semantic step to perform, analogously to chain-of-thought inference, and low-level predictions to output motor commands to the robot's joints:

Multimodal data

Verbal Instructions

"close the microwave"

![verbal instruction](/_next/image?url=%2Fimages%2Fpi05%2Fverbal_instruction.jpg&w=828&q=75)

Subtask Commands

“pick up the mitten”

![subtask command](/_next/image?url=%2Fimages%2Fpi05%2Fsubtask_command.jpg&w=828&q=75)

Object Detection

![object detection](/_next/image?url=%2Fimages%2Fpi05%2Fobject_detection.jpg&w=828&q=75)

Multimodal Web Data

![Multimodal Web Data](/_next/image?url=%2Fimages%2Fpi05%2Fmultimodal_web_data.jpg&w=828&q=75)

Robot action data

Loading…

In-the-wild Mobile Robot

Loading…

In-the-wild Static Robot

Loading…

In-office Static Robot

Loading…

General Robot Data

Cross-modal VLA policy

π0.5 VLA

High level

Loading…

Loading…

Loading…

Robot Action

Low level

Action expert

Deploy out-of-the-box in new homes

Loading…

An illustration of the co-training tasks in our π0.5 recipe, which include a variety of robotic data sources from many different robot types, as well as multimodal data that includes high-level subtask commands, instructions, and data from the web.

Multimodal data

Verbal Instructions

"close the microwave"

![verbal instruction](/_next/image?url=%2Fimages%2Fpi05%2Fverbal_instruction.jpg&w=828&q=75)

Subtask Commands

“pick up the mitten”

![subtask command](/_next/image?url=%2Fimages%2Fpi05%2Fsubtask_command.jpg&w=828&q=75)

Object Detection

![object detection](/_next/image?url=%2Fimages%2Fpi05%2Fobject_detection.jpg&w=828&q=75)

Multimodal Web Data

![Multimodal Web Data](/_next/image?url=%2Fimages%2Fpi05%2Fmultimodal_web_data.jpg&w=828&q=75)

Robot action data

Loading…

In-the-wild Mobile Robot

Loading…

In-the-wild Static Robot

Loading…

In-office Static Robot

Loading…

General Robot Data

Cross-modal VLA policy

π0.5 VLA

High level

Loading…

Loading…

Loading…

Robot Action

Low level

Action expert

Deploy out-of-the-box in new homes

Loading…

An illustration of the co-training tasks in our π0.5 recipe, which include a variety of robotic data sources from many different robot types, as well as multimodal data that includes high-level subtask commands, instructions, and data from the web.

While the basic principles of co-training are not new, training a VLA that can generalize broadly requires the right mixture of co-training tasks. Just like a person needs an appropriate curriculum to teach them the conceptual and practical aspects of a new job, VLAs need a "curriculum" provided by the mixture of co-training tasks to enable generalization at all of the necessary levels of abstraction. In our experiments, we trained versions of the π0.5 model that exclude different parts of the full training mixture: the "no WD" version excludes multimodal Web Data (question-answering, captioning, and object detection), the "no ME" version excludes Multiple Environment data collected with non-mobile robots (e.g., static robots placed into many other homes), the "no CE" version excludes Cross Embodiment data collect as part of the original π0 training set, and the "no ME or CE" version excludes both sources of robot data, leaving only the mobile manipulation data collected with the same robots that we use in our experiments (about 400 hours).

100%

80%

60%

40%

20%

0%

#### In-distribution Follow Rate

π0.5: 86%

no WD: 86%

no CE: 74%

no ME: 66%

#### In-distribution Success Rate

π0.5: 83%

no WD: 82%

no CE: 67%

no ME: 57%

#### OOD Follow Rate

π0.5: 94%

no WD: 80%

no CE: 67%

no ME: 33%

#### OOD Success Rate

π0.5: 94%

no WD: 74%

no CE: 49%

no ME: 31%

In-distribution Follow Rate

In-distribution Success Rate

OOD Follow Rate

OOD Success Rate

π0.5

no WD

no CE

no ME

no ME or CE

Evaluating the full π0.5 training mixture compared to ablations that exclude various sources of data. Web data (WD) makes the biggest difference for generalizing to out-of-distribution objects, while data from other robots (ME and CE) is important across all evaluation conditions.

We evaluated two experimental conditions: full cleaning tasks, such as putting away dishes in the sink or cleaning up items off the floor of a bedroom, and an out-of-distribution (OOD) evaluation that tasks the robot to move specific objects indicated in the prompt into a drawer. For both evaluations, we measure the success rate, averaged over individual subtasks (e.g., the percentage of objects that were moved into their proper place), as well as the language following rate, which indicates the fraction of cases where the robot's behavior correctly accords with the user's prompt. We can see that in all cases, data from other robots (ME and CE) makes a big difference in terms of policy performance. In the OOD case, we also see a significant difference from including web data (WD), which greatly improves the robot's ability to correctly identify new object categories that were not in the data. More details on these experiments are included in the [accompanying paper](/download/pi05.pdf).

To better quantify just how much generalization π0.5 can achieve, we conducted a scaling study where we vary the number of different environments seen in the training data. We also include a baseline model in these comparisons that was trained directly on data from the test environment in addition to all of the other data sources. This model (shown with a horizontal green line) provides a sense for how well a VLA could do in this scene if the challenge of generalizing to new environments is removed.

Evaluating how performance scales with the number of training environments, when co-training with the other datasets in our training mixture. When using all of the available training environments (rightmost point on the graph), our model (yellow) attains similar performance as a baseline that is trained directly on test environments (green).

These results not only show that the generalization performance of π0.5 steadily increases with the number of distinct environments in the training set, but that after only about 100 training environments, it actually approaches the performance of the baseline model that was trained on test environment directly. This suggests that our recipe can attain effective generalization using relatively accessible amounts of mobile manipulation training data.

### Training and inference

π0.5 is based on the π0 VLA, but because it is co-trained on tasks that require outputting a variety of label types, including actions and text, we can use the same model to control the robot at both the high and low level. When we run π0.5, we first ask it to output a "high level" action expressed in text, and then ask it to follow this high level action by choosing an appropriate robot motor command, in the form of a 50-step (1-second) "action chunk" of continuous low-level joint actions. This approach follows our recently developed [Hi Robot](/research/hirobot) system, except that the same model is used for both the high-level decisions and low-level motor control in a kind of "chain of thought" process.

The model itself includes both discrete auto-regressive token decoding and continuous decoding via flow matching, as in π0. The discrete decoding pathway is used for inferring high-level actions, while the continuous flow-matching pathway is used for low-level motor commands, as illustrated in the diagram below.

continuous actions

-1.70-1.70-1.7

1.251.251.3

3.143.143.1

1.421.421.4

ACTION EXPERT (300M)

Pre-trained VLA

Action expert (300M)

Loading…

Loading…

Loading…

subtask prediction

“pick up the pillow”

low-level command

“pick up the pillow”

high-level prompt

“clean the bedroom”

Illustration of the high-level/low-level inference procedure used by π0.5. The model first produces a high-level action expressed in language, essentially "telling itself" what step it should take to complete the task, and then selects the motor commands using its flow matching action expert.

high-level prompt

“clean the bedroom”

Pre-trained VLA

subtask prediction

“pick up the pillow”

low-level command

“pick up the pillow”

continuous actions

-1.70-1.70-1.7

1.251.251.3

3.143.143.1

1.421.421.4

ACTION EXPERT (300M)

Illustration of the high-level/low-level inference procedure used by π0.5. The model first produces a high-level action expressed in language, essentially "telling itself" what step it should take to complete the task, and then selects the motor commands using its flow matching action expert.

### Generalization to new homes

We evaluated π0.5 by asking it to control mobile manipulators to clean new homes that were never seen in the training data. This is an exceptionally difficult test for a VLA: while there have been impressive demonstrations of VLA generalization, such as following new semantic commands, interactively following human instructions, and chaining together distinct primitive skills, such demonstrations typically take place in the same or very similar environment as the training data. Our recent [π 0 -FAST model](/research/fast) was able to generalize to new environments with the DROID setup, but for relatively simple skills like moving individual objects. Our experiments involved placing a robot equipped with π0.5 into an entirely new home and asking it to put away dishes, make the bed, or clean up a bedroom floor. These are long tasks that require not only using complex behaviors (such as using a sponge to clean a spill), but also understanding the semantics of the task and breaking it down into individual parts, with each stage interacting with the correct object. We show example evaluations of π0.5 in the videos below.

Loading…

Loading…

Loading…

Loading…

Loading…

Loading…

Loading…

1 / 7

Examples of our model completing long-horizon tasks in new kitchens and bedrooms.

All experiments were done in homes that were not in the training data.

The policies are reactive, and can handle both variability in the environment and perturbations. In the videos below, we test what happens when people interfere with the robot.

Lastly, the π0.5 model can accept language commands at various levels of granularity, from high-level prompts like "put the dishes in the sink" to detailed individual commands instructing the model to pick up specific objects or move in specific directions. We show some examples of language following in the videos below.

Language command

Pick up the round brushPick up the silver carabinerPick up the yellow funnelPick up the clear safety gogglesPick up the green grill lighterPick up the red lighterPick up the black phone casePick up the blue pill bottlePick up the guitar shaped spoon

Loading…

Our model can follow language commands at various levels of granularity.
Yes, you know it by now - all experiments were done in homes that were not in the training data.

We include detailed videos from our rigorous empirical evaluation below, with examples of successful and failed episodes of our model. Importantly, as with all the videos on this page, none of the scenes in the videos below are from the training data. Complete results from all experiments can be found in the [full article](/download/pi05.pdf).

Task

Make the bedPut clothes in the laundry basketPut the items in the drawerPut the dishes in the sinkPut the items in the drawer (home 1)Put the dishes in the sink (home 2)Put the clothes in the basket (home 3)

Status

Success

Fail

0:010:39

### Where do we go from here?

We showed that VLAs can enable broad generalization even for complex and extended robotic skills, like cleaning a kitchen or bedroom. Our π0.5 model can enable a robot to clean a new home that was never seen in the training data. π0.5 is far from perfect, and it often makes mistakes both in terms of its high-level semantic deductions and motor commands. However, by allowing robots to learn from a variety of knowledge sources, we hope that the π0.5 recipe will bring us closer to broadly generalizable and flexible physical intelligence. There is a lot left to do: while our robots can improve from verbal feedback, they could also in the future utilize their autonomous experience to get better with even less supervision, or they could explicitly request help or advice in unfamiliar situations. There is also a lot left to do to improve transfer of knowledge, both in the technical aspects of how the models are structured, and in the diversity of data sources that our models can employ.

If you are interested in collaborating, please [reach out](mailto:collaborate@physicalintelligence.company). We are particularly excited to work with companies scaling up data collection with robots deployed for real-world applications, who are looking to collaborate on autonomy.

We are also hiring! If you'd be interested in [joining us](/join-us) please get in touch.

For researchers interested in our work, collaborations, or other queries, please write to [research@physicalintelligence.company](mailto:research@physicalintelligence.company).

0:010:20
