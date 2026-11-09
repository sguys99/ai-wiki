---
title: "RoboColosseum: A Scientific Megaproject for Evaluating Physical Intelligence In-the-Wild"
type: article
year: 2026
category: physical-ai
raw_path: raw/articles/robocolosseum-2026-robocolosseum-a-scientific-megaproject-for.md
raw_filename: "robocolosseum-2026-robocolosseum-a-scientific-megaproject-for.md"
source_collection: external
author: "RoboColosseum"
url: "https://robocolosseum.ai/blog/evaluating-physical-intelligence-in-the-wild/"
publisher: "robocolosseum.ai"
fetched_at: "2026-11-09T21:49:20+0800"
extractor_tier: "jina"
tags: []
figures:
  - id: fig01
    file: assets/robocolosseum-2026-robocolosseum-a-scientific-megaproject-for/fig01.png
    raw: raw/articles/robocolosseum-2026-robocolosseum-a-scientific-megaproject-for-figures/fig01.png
    caption: "Image 1: The two tracks. (a) Fine-tune track: bring your own models (MLP, transformer or diffusion), fine-tune on fixed datasets collected at fixed scenes, then evaluate on fixed scenes, with new scenes added over time. (b) Open track: any training data, evaluate on any task in open-world scenes such as a kitchen, laundry, warehouse or outdoors, then compare two policies pairwise."
    strategy: fetched
    curated: false
  - id: fig02
    file: assets/robocolosseum-2026-robocolosseum-a-scientific-megaproject-for/fig02.webp
    raw: raw/articles/robocolosseum-2026-robocolosseum-a-scientific-megaproject-for-figures/fig02.webp
    caption: "Image 2: The four standardized setups with their parts labelled: MolmoAct2 YAMs, SO-101, Franka DROID and the G1 humanoid."
    strategy: fetched
    curated: false
  - id: fig03
    file: assets/robocolosseum-2026-robocolosseum-a-scientific-megaproject-for/page-full.png
    raw: raw/articles/robocolosseum-2026-robocolosseum-a-scientific-megaproject-for-figures/page-full.png
    caption: "전체 페이지 스크린샷"
    strategy: screenshot
    curated: false
  - id: fig04
    file: assets/robocolosseum-2026-robocolosseum-a-scientific-megaproject-for/crop01.png
    raw: raw/articles/robocolosseum-2026-robocolosseum-a-scientific-megaproject-for-figures/crop01.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig05
    file: assets/robocolosseum-2026-robocolosseum-a-scientific-megaproject-for/crop02.png
    raw: raw/articles/robocolosseum-2026-robocolosseum-a-scientific-megaproject-for-figures/crop02.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig06
    file: assets/robocolosseum-2026-robocolosseum-a-scientific-megaproject-for/crop03.png
    raw: raw/articles/robocolosseum-2026-robocolosseum-a-scientific-megaproject-for-figures/crop03.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig07
    file: assets/robocolosseum-2026-robocolosseum-a-scientific-megaproject-for/crop04.png
    raw: raw/articles/robocolosseum-2026-robocolosseum-a-scientific-megaproject-for-figures/crop04.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig08
    file: assets/robocolosseum-2026-robocolosseum-a-scientific-megaproject-for/crop05.png
    raw: raw/articles/robocolosseum-2026-robocolosseum-a-scientific-megaproject-for-figures/crop05.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig09
    file: assets/robocolosseum-2026-robocolosseum-a-scientific-megaproject-for/crop06.png
    raw: raw/articles/robocolosseum-2026-robocolosseum-a-scientific-megaproject-for-figures/crop06.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig10
    file: assets/robocolosseum-2026-robocolosseum-a-scientific-megaproject-for/crop07.png
    raw: raw/articles/robocolosseum-2026-robocolosseum-a-scientific-megaproject-for-figures/crop07.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
---

> 수집 메모 — `scripts/fetch_article.py` 가 사용자의 명시적 URL 지시에 따라 가져왔다 (CLAUDE.md rule #1 의 자료 수집 예외). 추출 tier: `jina`. 본문은 원문 그대로이며 요약·번역·윤문하지 않았다.
> `category` 는 임시값이므로 Step 3 에서 확정할 것.

---

## 1. Motivation: Why Evaluation in Robotics

Robotics is far from solved. Despite rapid advances in robotics foundation models, much of our measurable progress remains confined to simulation and controlled laboratory settings. Gains on these benchmarks do not necessarily translate into robots that can operate reliably in the unpredictable conditions of restaurants, homes, industrial sites, and the wider world. The central question remains: how much better are these models actually getting at working in the real world?

Answering that question requires sustained, large-scale evaluation across diverse tasks, environments, embodiments, and operating conditions. Yet the field still lacks the shared physical infrastructure and coordinated effort needed to carry out this evaluation consistently over time. Individual experiments offer valuable snapshots, but understanding progress across the field requires a lasting foundation for measurement, comparison, and discovery.

Scientific progress has often depended on ambitious investments in shared infrastructure. The Hubble Space Telescope and the Large Hadron Collider expanded what researchers could observe, measure, and understand, enabling entire communities to investigate questions beyond the reach of individual laboratories. Robotics needs a similar commitment to building the infrastructure that makes new science possible and seeing through the noise. Its experiments require access to physical systems and diverse environments, supported by protocols that allow findings to accumulate into a shared body of evidence.

Through RoboColosseum, we are building this foundation: an open, decentralized network of robots, evaluation sites, and shared experimental protocols for studying physical intelligence in the real world. By connecting resources and contributors across locations, our aim is to make sustained physical evaluation accessible to a broader research community and enable experiments at a scale and diversity that individual institutions would struggle to achieve alone.

Our ambition is to establish a shared scientific instrument for physical intelligence, one that researchers can use to test hypotheses, uncover failure modes, compare approaches, and track progress over time. This infrastructure can make real-world capabilities measurable while supporting the discoveries that will shape the next generation of robotics.

## 2. Our Idea: A Shared Testbed for Physical Intelligence

![Image 1: The two tracks. (a) Fine-tune track: bring your own models (MLP, transformer or diffusion), fine-tune on fixed datasets collected at fixed scenes, then evaluate on fixed scenes, with new scenes added over time. (b) Open track: any training data, evaluate on any task in open-world scenes such as a kitchen, laundry, warehouse or outdoors, then compare two policies pairwise.](https://robocolosseum.ai/blog/evaluating-physical-intelligence-in-the-wild/tracks.png)

**Figure 1**The two tracks: fine-tuning on shared datasets at fixed scenes, and pairwise comparison on open-world tasks. [View full size ↗](https://robocolosseum.ai/blog/evaluating-physical-intelligence-in-the-wild/tracks.png)

To measure physical intelligence in the real world, we created RoboColosseum, an open, decentralized evaluation initiative co-founded by [NUS MAGIC Lab](https://magiclab-nus.github.io/), [BitRobot Foundation](https://bitrobot.ai/), [Singapore Embodied AI Centre](https://nrp.gov.sg/), and [Hugging Face](https://huggingface.co/).

We have established a distributed fleet of robots supported by dedicated, full-time robot riggers who conduct evaluations. The fleet spans single-arm manipulators, bimanual systems, and humanoids, with standardized hardware within each embodiment and shared evaluation protocols across sites. This combination of physical infrastructure, dedicated operators, and consistent procedures makes rigorous real-world evaluation a sustained operation that researchers can build on.

RoboColosseum organizes evaluation into two complementary tracks, each addressing a different dimension of physical intelligence.

The **Fine-tune track** measures how effectively models adapt to specific tasks. We maintain a growing collection of task demonstrations across embodiments, allowing models to be fine-tuned on the same task-specific datasets and evaluated at fixed sites under consistent conditions. This provides a common testbed for comparing approaches—including VLAs, WAMs, GAMs, RL-based policies, and agentic frameworks—and studying how individual design choices affect real-world performance.

The **Open track** measures what models can do out of the box. Models are evaluated without task-specific fine-tuning through pairwise comparisons across diverse real-world tasks and environments. By extending evaluation beyond a predefined task suite, this track allows researchers to examine where models generalize, where they fail, and how their capabilities differ. It gives frontier labs a practical foundation for studying how pre-training data mixtures and training objectives translate into physical capabilities in the wild.

## 3. The Technical Implementation

RoboColosseum standardizes hardware setups within each embodiment to support fair, reproducible evaluation at scale while testing models under the varied conditions they will encounter in deployment. Our fleet currently includes hundreds of robots across four embodiments (the bimanual YAM, the SO-101, the Franka arm in the DROID configuration, and the G1 humanoid), and we plan to add more robots. A dedicated 30-strong team runs evaluations in full-time shifts.

![Image 2: The four standardized setups with their parts labelled: MolmoAct2 YAMs, SO-101, Franka DROID and the G1 humanoid.](https://robocolosseum.ai/blog/evaluating-physical-intelligence-in-the-wild/setups.webp)

**Figure 2**The standardized setup for each embodiment. [View full size ↗](https://robocolosseum.ai/blog/evaluating-physical-intelligence-in-the-wild/setups.webp)

Our in-the-wild evaluation spans Singapore and global partner locations, with tasks that challenge spatial memory, dexterous manipulation, long-horizon planning, and real-time adaptability. As the evaluation network grows, it opens access to everyday environments and tasks: tidying chairs in classrooms, sorting food waste at food courts, shelving books in libraries, and performing household chores in real homes. These settings expose models to the physical variation and complexity of everyday use.

[Video 9](https://robocolosseum.ai/blog/evaluating-physical-intelligence-in-the-wild/g1-fleet.mp4)

**Film 1**Part of the fleet: Unitree G1 humanoids.

The Fine-tune track provides a consistent protocol for comparing models. Each model is fine-tuned on the same pre-collected dataset of 100 demonstrations per task, then evaluated over 25 trials per task at designated evaluation sites. Trials follow shared task definitions, with small variations in spatial arrangements and lighting conditions to assess robustness.

Models are evaluated and ranked using task progress scores and full-task success rates. Together, these metrics capture how much of a task a model can accomplish and how reliably it completes the entire task.

The Open track evaluates models through blind pairwise comparisons and reports Elo ratings. We complement these with Difficulty-Calibrated Rasch (DCR), a statistical ranking method that jointly estimates policy ability and task difficulty from real-world trial outcomes. DCR accounts for differences in the difficulty of the tasks each policy encounters, supporting comparisons across diverse evaluation settings.

The core idea is simple: a policy’s probability of success depends on its ability relative to the task’s difficulty:

Difficulty-Calibrated Rasch

$$
\sigma \left(\right. \theta_{i} - \beta_{j} \left.\right) = \frac{1}{1 + exp \left[\right. - \left(\right. \theta_{i} - \beta_{j} \left.\right) \left]\right.}
$$

Here, _θ i_ represents policy ability and _β j_ represents task difficulty. Higher ability increases the probability of success; greater difficulty reduces it.

Human difficulty ratings on a 1–10 scale inform an estimate of task difficulty. DCR preserves the distinction between both policies succeeding and both policies failing: these outcomes provide different evidence about task difficulty, even when both appear as ties in a pairwise comparison. As evaluations accumulate, DCR updates its estimates using all available trials and ranks policies by their posterior mean ability.

[Video 10](https://robocolosseum.ai/landing/video/wild.mp4)

**Film 2**From one robot at work to thousands of recorded eval trials: arms, humanoids and rovers in real places.

## 4. Initial RoboColosseum Results

At launch, RoboColosseum reports results from 15,000 real-world evaluation trials across four robot embodiments: SO-101, bimanual YAM, Franka, and Unitree G1. Our two standardized evaluation tracks assess complementary capabilities: adaptation through fine-tuning and zero-shot generalization to open-world tasks.

For the Fine-tune track, we evaluate five generalist robot models across all four embodiments: π0.5, MolmoAct2, LingBot-VLA v2, G0.5, and GR00T N1.7. Each model is fine-tuned on shared task-specific demonstration datasets and evaluated under consistent protocols.

[Video 11](https://robocolosseum.ai/blog/evaluating-physical-intelligence-in-the-wild/fine-tune-results.mp4)

**Figure 3**Fine-tune track: each model’s average trial score (0–1) and its number of trials. [View full size ↗](https://robocolosseum.ai/blog/evaluating-physical-intelligence-in-the-wild/fine-tune-results.jpg)

For the Open track, our initial evaluation covers SO-101, bimanual YAM, and Franka. We evaluate the same five generalist robot models, trained for deployment on these platforms using large-scale datasets, including MolmoAct2-SO-101, MolmoAct2-YAM, and DROID. Here, zero-shot refers to evaluation without task-specific fine-tuning: the models must apply their learned capabilities directly to the evaluation tasks. We also evaluate three frontier models, xAI’s Grok 4.7, Claude Opus 5.5, and GPT-6 Astra, to examine how their capabilities translate into real-world robot performance. For our initial results, we ran RoboColosseum’s Open track for 41 days and conducted 11,398 evaluations across 124 sites.

[Video 12](https://robocolosseum.ai/blog/evaluating-physical-intelligence-in-the-wild/open-results.mp4)

**Figure 4**Open track: each model’s DCR rating on the Elo scale, with its number of evaluations (N). [View full size ↗](https://robocolosseum.ai/blog/evaluating-physical-intelligence-in-the-wild/open-results.jpg)

Our initial results reveal four clear takeaways:

1.   **Frontier AI agents can already perform competitively with specialized VLA policies on real robots**: across 901 matched comparisons, the agents made more task progress in 394 cases, compared with 265 for VLAs, although reliable open-world manipulation remains difficult.
2.   **There is no single model that performs best everywhere**: model strengths change across tasks, robot embodiments, and evaluation tracks.
3.   **Binary task success alone does not capture the full picture**, as progress-based metrics reveal meaningful differences in how far different policies can advance before failing. On the G1 humanoid, none of the evaluated policies completed any of the five tasks, yet their average progress scores ranged from 13.3% to 23.2%, revealing meaningful differences that success rate alone would miss.
4.   **Real-world rankings become more stable as more evaluations are collected.** To make this process more efficient, RoboColosseum uses active matchmaking: instead of choosing model pairs uniformly, it focuses more evaluations on pairs whose relative performance is still unclear. With this strategy, the ranking reaches around 90% agreement with the full-data leaderboard after roughly 400–500 evaluations, compared with about 1,000 evaluations under uniform sampling.

## 5. The Future and How You Could Be Part of This

RoboColosseum is designed as an open community standard that invites global participation. Whether you are an academic researcher seeking evaluation hours, a robotics lab interested in hosting an evaluation node, or an organization wanting to contribute task benchmarks, we welcome you to join the movement.

We are offering 10,000 hours of free evaluation to get started. [Apply for free evaluation](https://app.youform.com/forms/riubycrq): tell us about your policy and the robots you want results on, and we will follow up to plan the runs.

## Ecosystem and Acknowledgements

RoboColosseum is brought to life through the close collaboration of its founding community:

*   **NUS MAGIC Lab** (led by Asst. Prof. Jiafei Duan at the NUS School of Computing) brings core research leadership in robot learning, dexterous manipulation, and foundation model design.
*   **BitRobot Foundation** leads protocol design, node network orchestration, and infrastructure support for continuous benchmarking.
*   **Hugging Face** supports open model hosting, benchmark transparency, and dataset accessibility for the global AI community.

We extend our deep gratitude to the Singapore Embodied AI Centre and Singapore’s National Robotics Programme for providing crucial funding support, facilitating access to in-the-wild evaluation environments across Singapore, and enabling the development of industry-relevant task suites. Special thanks also to our real-world data partners, including FrodoBots, for supporting data collection in real homes and urban spaces across Southeast Asia.
