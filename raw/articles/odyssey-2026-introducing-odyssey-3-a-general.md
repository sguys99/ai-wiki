---
title: "Introducing Odyssey-3: A General-Purpose Physical Intelligence"
type: article
year: 2026
category: physical-ai
raw_path: raw/articles/odyssey-2026-introducing-odyssey-3-a-general.md
raw_filename: "odyssey-2026-introducing-odyssey-3-a-general.md"
source_collection: external
author: "Oliver Cameron, Jeff Hawke"
url: "https://odyssey.systems/introducing-odyssey-3"
publisher: "Odyssey"
fetched_at: "2026-09-18T18:52:27+0900"
extractor_tier: "chrome"
tags: []
figures:
  - id: fig01
    file: assets/odyssey-2026-introducing-odyssey-3-a-general/fig01.jpg
    raw: raw/articles/odyssey-2026-introducing-odyssey-3-a-general-figures/fig01.jpg
    caption: ""
    strategy: fetched
    curated: false
  - id: fig02
    file: assets/odyssey-2026-introducing-odyssey-3-a-general/fig02.jpg
    raw: raw/articles/odyssey-2026-introducing-odyssey-3-a-general-figures/fig02.jpg
    caption: ""
    strategy: fetched
    curated: false
  - id: fig03
    file: assets/odyssey-2026-introducing-odyssey-3-a-general/fig03.jpg
    raw: raw/articles/odyssey-2026-introducing-odyssey-3-a-general-figures/fig03.jpg
    caption: ""
    strategy: fetched
    curated: false
  - id: fig04
    file: assets/odyssey-2026-introducing-odyssey-3-a-general/fig04.png
    raw: raw/articles/odyssey-2026-introducing-odyssey-3-a-general-figures/fig04.png
    caption: ""
    strategy: fetched
    curated: false
  - id: fig05
    file: assets/odyssey-2026-introducing-odyssey-3-a-general/fig05.png
    raw: raw/articles/odyssey-2026-introducing-odyssey-3-a-general-figures/fig05.png
    caption: ""
    strategy: fetched
    curated: false
  - id: fig06
    file: assets/odyssey-2026-introducing-odyssey-3-a-general/fig06.png
    raw: raw/articles/odyssey-2026-introducing-odyssey-3-a-general-figures/fig06.png
    caption: ""
    strategy: fetched
    curated: false
  - id: fig07
    file: assets/odyssey-2026-introducing-odyssey-3-a-general/fig07.png
    raw: raw/articles/odyssey-2026-introducing-odyssey-3-a-general-figures/fig07.png
    caption: ""
    strategy: fetched
    curated: false
  - id: fig08
    file: assets/odyssey-2026-introducing-odyssey-3-a-general/page-full.png
    raw: raw/articles/odyssey-2026-introducing-odyssey-3-a-general-figures/page-full.png
    caption: "전체 페이지 스크린샷"
    strategy: screenshot
    curated: false
---

> 수집 메모 — `scripts/fetch_article.py` 가 사용자의 명시적 URL 지시에 따라 가져왔다 (CLAUDE.md rule #1 의 자료 수집 예외). 추출 tier: `chrome`. 본문은 원문 그대로이며 요약·번역·윤문하지 않았다.
> `category` 는 임시값이므로 Step 3 에서 확정할 것.

---

Introducing Odyssey-3:
A General-Purpose Physical Intelligence

Odyssey-3 is a foundation world model that can power robots, drive cars, train AIs, pilot drones, and even play video games

![](https://framerusercontent.com/images/ukXuJU0anDGIC4NS3x3orWD06gY.jpg?width=3000&height=3000)

Oliver Cameron

![](https://framerusercontent.com/images/O3bwQaKUwfM3rebTaX6a9IL32Gg.jpeg?width=640&height=640)

Jeff Hawke

September 15th, 2026

Jeff and I began working on autonomous vehicles and robotics in the 2010s, at a time when one of the field’s long-term ambitions was general-purpose physical intelligence: a system that understands the extent of the world to operate across many different machines and tasks. In practice, the field progressed through increasingly specialized systems, each trained for a relatively narrow domain and often requiring enormous amounts of task-specific data.

We founded Odyssey in 2023 around the belief that world models could provide a legitimate technical path toward that broader ambition. By learning a general, causal model of how the world behaves, a world model could provide a common foundation for many physical and virtual systems, adapting that knowledge to new tasks with relatively little task-specific experience.

Today, we’re sharing our work on Odyssey-3, our most powerful foundation world model yet, and an early example of a single learned intelligence operating across many different physical and virtual systems. Odyssey-3 is an autoregressive diffusion transformer trained to simulate highly diverse scenarios. The same foundation model is capable of controlling robots, powering humanoids, driving vehicles, piloting drones, training AIs, and even playing video games.

Trained on a vast collection of visual observations of the world, Odyssey-3 has developed a learned understanding of physics, dynamics, cause-and-effect, human behaviors, and other concepts that make up our reality. It can draw on that learned world knowledge to solve physical and virtual tasks, requiring far less experiential data per task than previous systems. We see Odyssey-3 as enabling physical agents, a new kind of agent that speaks the language of the world—enabling it to interface natively with physical and virtual systems.

###### Jump to examples of Odyssey-3 powering…

![](https://framerusercontent.com/images/LiRYOmWkSraVmvKrqsnSWHZOqLc.png?width=1020&height=80)

## Physical Agents That Speak the Language of the World

Odyssey-3 demonstrates encouraging performance controlling physical systems with only a few hours of experiential data, drawing on the broad world knowledge it has acquired during pretraining. This experiential data pairs the physical system’s observations with the actions taken to perform a task, providing examples of how its controls are used. An action decoder—a learned output component attached to the world model—is trained on these examples to translate Odyssey-3’s internal representations into the actions required by the physical system.

![](https://framerusercontent.com/images/D4BBvZ5VT3DIphQ3pemyUJ4.jpg?width=1942&height=809)

### Odyssey-3 Can Power Robot Arms

With only tens of hours of robot demonstrations, Odyssey-3 can learn to control a variety of robot arms and complete complex tasks, drawing on the broad world knowledge acquired during pretraining. In our experiments, we observe recovery behaviors that are absent from the training demonstrations, including reorienting a gripper after a missed grasp and retrieving an object dropped in an unusual position or orientation. These behaviors suggest that Odyssey-3’s learned physical understanding can help a robot respond to situations beyond those explicitly demonstrated. This is encouraging for sample-efficient robotics, where collecting demonstrations of every possible failure and recovery quickly becomes impractical.

An important question is how consistently these capabilities hold up across different robots and environments. To this end, we’re excited to announce a close collaboration with $[Poke & Wiggle](https://pokeandwiggle.com/)/$, a leader in robot data, robot policy analysis, and large scale benchmarking. Together, we’re evaluating Odyssey-3 across different bodies, viewpoints, and controls to understand where its knowledge transfers, where it breaks down, and how those findings can guide further training.

$/$

###### “Pour the cereal into the bowl”

Controlling Robot

$/$

###### “Put the candy bags into the box”

Controlling Robot

$/$

###### “Put the items into the cardboard box”

Controlling Robot

$/$

###### “Put the wipes into the box”

Controlling Robot

$/$

###### “Close the screwbox”

Controlling Robot

$/$

###### “Put the items into the box and close it”

Controlling Robot

$/$

###### “Pour coffee into the espresso cup”

Controlling Robot

$/$

###### “Clean the plate with the wipe”

Controlling Robot

### Odyssey-3 Is the Foundation for Flexion’s Humanoid Autonomy

Today, we’re announcing a deep research collaboration with $[Flexion](https://flexion.ai/)/$, a leader in general-purpose robot intelligence with expertise in reinforcement learning and whole-body control. Flexion is pursuing one of the most ambitious problems in robotics: building general-purpose intelligence that allows robots to perform useful work within the buildings, tools, and environments humans already use. Their research brings together perception, manipulation, and whole-body control to develop robots that can carry out extended tasks and recover when things go wrong.

Building on Odyssey-3 as a base model, Flexion has carried out substantial research and engineering to develop the humanoid control policies demonstrated here. With only tens of hours of humanoid teleoperation data, the resulting system can perform tasks in real time, applying Odyssey-3’s pretrained representations through Flexion’s work on robot learning and control. In our evaluations, these policies generalize better to environmental changes than the VLA baselines tested, continuing to execute tasks under lighting changes that cause baseline policies to fail. We see these results as an encouraging demonstration of what Flexion’s robotics expertise can achieve with a powerful foundation world model, and we’re excited to continue this research together.

$/$

Controlling Humanoid

###### “Open the blue container and take out the cardboard box”

$/$

###### “Move the plate to the center of the table and place the mug on top of it”

Controlling Humanoid

$/$

###### “Place the box against the wooden corner”

Controlling Humanoid

$/$

###### “Open the cardboard box”

Controlling Humanoid

### “What excites us about Odyssey-3 is the opportunity to build on physical knowledge acquired far beyond a robot’s own demonstrations. Combining that foundation with our research in humanoid learning and control opens up exciting possibilities for how quickly robots can acquire useful skills and adapt to unfamiliar situations.”

—Nikita Rudin, Co-Founder & CEO of Flexion

### Odyssey-3 Can Drive Vehicles

With only 20 hours of simulated driving data, Odyssey-3 is capable of autonomously driving a car in closed loop on the streets of India, generating driving trajectories in real time. The pretrained world model remains frozen throughout training, extracting visual representations that feed into a relatively small driving policy, which predicts waypoints ahead of the car. The driving policy therefore learns to draw on an existing understanding of the world, with the simulated experience teaching it how to apply that knowledge to driving.

$/$

###### “Take the first roundabout exit”

Driving Autonomously

$/$

###### “Drive along the road”

Driving Autonomously

$/$

###### “Drive along the road”

Driving Autonomously

$/$

###### “Drive along the road”

Driving Autonomously

$/$

###### “Do a 180 degree turn towards the left”

Driving Autonomously

$/$

###### “Drive along the road”

Driving Autonomously

We compared policies trained entirely in simulation with policies trained on real driving footage, evaluating both on busy roads with frequent distractions. Both navigated bends while maintaining their lane, handled vehicles overtaking on either side, and turned at busy junctions. On real roads, the policies trained entirely in simulation traveled about 77% as far between safety-driver interventions as those trained on real footage.

### Odyssey-3 Can Train AIs

Odyssey-3 can generate environments that AIs can inhabit, taking actions and learning from their consequences. These worlds support a recursive learning system, with an intelligence operating inside another intelligence, each pushing the other to become more capable.

Our work on $[PROWL](./introducing-prowl-1)/$ explores this directly: agents uncover failures that guide improvements to the world model, while reliable simulated experiences provide training for the agents themselves. As the world model improves, it can support more complex experiences; as the agents improve, they can discover weaknesses that less capable agents would never reach. Each intelligence could continually expand what the other is able to learn, helping generate the experiences needed for further progress.

These worlds also give us a way to study how increasingly capable agents behave when given the freedom to act. As language models and other intelligences take on greater responsibility, we need places to discover potentially dangerous behaviors and investigate their consequences before they cause harm in the physical world.

#### Language Models Can Work to Achieve Goals

$/$

Generating Environment

$/$

Generating Environment

$/$

Generating Environment

$/$

Generating Environment

#### Agents Can Explore Simulated Worlds

$/$

Generating Environment

$/$

Generating Environment

$/$

Generating Environment

$/$

Generating Environment

$/$

Generating Environment

$/$

Generating Environment

### Odyssey-3 Can Pilot Drones

Following the same training recipe as our driving experiments, we train an aerial navigation policy to generate flight waypoints from recent camera observations, the drone’s motion state, and a high-level navigation prompt. The policy draws on Odyssey-3’s pretrained visual representations, with simulated flight demonstrations teaching an action expert how to translate those representations into movement. Using tens of hours of simulated drone data, we trained a policy that demonstrated stable flight while avoiding obstacles in a simulated indoor setting.

To investigate what the backbone already understood before policy training, we also visualized its predictions for aerial navigation tasks with its weights frozen. In these qualitative rollouts, we observed plausible directional flight and motion around obstacles, alongside responses consistent with the world’s semantic content. These observations suggest that pretraining provides useful knowledge of spatial structure and motion.

$/$

###### “Take off, navigate to behind the table, and hover”

Piloting Drone

$/$

###### “Take off, navigate under the table, and land behind the bookcase”

Piloting Drone

$/$

###### “Take off, explore the room, and hover above the table”

Piloting Drone

$/$

###### “Take off, navigate to the right end of the room, and land”

Piloting Drone

### Odyssey-3 Can Play Video Games

Odyssey-3 can provide a foundation for policies that play video games. We train these policies on gameplay recordings paired with keyboard and mouse inputs, keeping the pretrained world model frozen. During play, the policy observes recent game frames, generates controls, and uses the resulting observations to choose its next actions. The same approach used to control physical systems becomes a way to interact with virtual worlds.

Our experiments have produced extended gameplay sessions in Rockstar Games’ GTA V, alongside selected examples of driving, shooting, and hand-to-hand combat. We are also seeing early evidence of transfer: GTA-trained policies have produced movement in Rockstar Games’ Red Dead Redemption 2 and motorcycle riding in Square Enix’s Sleeping Dogs without additional policy training on either title. In one experiment, a mobility policy trained on approximately two hours of GTA footage produced horseback movement in Red Dead Redemption 2, applying controls learned in one game to a different character, vehicle, and environment.

$/$

Playing RDR 2

$/$

Playing RDR 2

$/$

Playing GTA V

$/$

Playing GTA V

$/$

Playing Sleeping Dogs

$/$

Playing Sleeping Dogs

Together with our results in robotics, humanoids, driving, training, and drones, these gaming experiments suggest that Odyssey-3 is a strong foundation for generalist embodied agents. A shared pretrained world model can support policies across different bodies, environments, and controls, with early evidence that learned behaviors can transfer between them.

![](https://framerusercontent.com/images/LiRYOmWkSraVmvKrqsnSWHZOqLc.png?width=1020&height=80)

## An Early Glimpse of Physical Agents

Agents in our reality, like humans, develop an understanding of the world and how it works through observation and interaction, allowing them to draw on prior knowledge when learning a new task. We can learn to operate dangerous machinery at age 18—despite never having used it before—because we have already gained an intuition for navigating space, watched countless objects in motion, seen how they respond to force, observed humans using tools in many contexts, and noted that collisions are dangerous.

Today, many robotic systems are trained on repeated demonstrations of specific tasks to acquire the ability to manipulate objects, concentrating large amounts of narrow experience to accomplish a single task. We see this as a sign that these systems are brute-forcing the problem, compensating for a lack of general world understanding with ever-larger quantities of task-specific data. Humans do not need to sit and watch thousands of hours of specific tasks before becoming capable, because so much of the necessary knowledge has already been acquired through our experience of the broader world.

Similarly, a true physical agent should possess a superhuman understanding of the world, including the physics, dynamics, and cause-and-effect that govern how our reality evolves. That understanding would give it a native interface to physical systems, enabling it to adapt to new tasks with the amount of experiential training a human needs, or less. Odyssey-3 enables early physical agents, and represents a leap in the performance and maturity of world models, capable of applying its learned understanding to robots, humanoids, cars, drones, and video games with only a few hours of experiential data.

As physical agents develop, we believe they will enable us to automate increasingly complex physical work, taking on jobs that put people at risk and helping with everyday tasks that age, illness, or disability can make difficult, allowing more people to live independently. These same capabilities could accelerate experimentation in science and engineering, give us more time to spend with one another and on work we find meaningful, and eventually allow us to operate in environments we humans have had no lived experience in, including worlds beyond our own.

These same models will also change how intelligence itself develops, generating the worlds in which future agents learn, and learning themselves from what those agents discover when acting in the physical world. More capable world models will support more capable agents, whose experiences and discoveries would in turn improve the worlds that shaped them, allowing both to grow beyond the limits of the environments we can construct by hand.

World models are learned dynamical systems. As a foundation layer, they represent the holy grail of general intelligence, by enabling decision-making and reasoning inside accurate, open-ended environments. When combined, VLM agents can reason directly within these representations. However, frontier world models have lagged behind this potential: largely because they remain sub-scale, roughly two orders of magnitude behind language models. We are excited to see early signals of this potential emerging in Odyssey-3, and we’re excited to release it publicly in the coming weeks.

$

$[Contact Us](./contact)/$

/$

World Model

Odyssey-3

Our most powerful foundation world model yet, materially advancing the state-of-the-art in physical accuracy of world models

$

$[Learn More](./introducing-odyssey-3)/$

/$

![](https://framerusercontent.com/images/3MyEMMdcZGpKPGdkvxJLs6NmBKI.png?width=540&height=540)

World Model

Starchild-1

A step beyond world models that learn only from visual observation, toward systems that learn from richer multimodal interaction with the world

$

$[Learn More](./introducing-starchild-1)/$

/$

$[Technical Report](https://starchild.odyssey.ml/starchild-1.pdf)/$

![](https://framerusercontent.com/images/eymfPWbAZ07D7RSarP9qqX74HY.png?width=540&height=540)

World Model

Agora-1

A multi-agent world model, enabling multiple participants—human or AI—to share and interact within the same world simulation in real-time

$

$[Learn More](./introducing-agora-1)/$

/$

$[Try Agora-1](https://agora.odyssey.ml)/$

![](https://framerusercontent.com/images/6uQKXYZX2S51Hnxcp6niCCGOr3Q.png?width=540&height=540)

Reinforcement Learning

PROWL-1

A novel RL-driven adversarial framework where an RL agent explores game environments with the objective to improve world model performance

$

$[Learn More](./introducing-prowl-1)/$

/$

$[Read the Paper](https://arxiv.org/abs/2605.18803)/$

![](https://framerusercontent.com/images/7xELAgMXWZN29fTyVF6eaN6Rjcg.png?width=540&height=540)

$/$
