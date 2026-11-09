---
title: "RoboColosseum · The proving ground for physical AI"
type: article
year: 2026
category: physical-ai
raw_path: raw/articles/robocolosseum-2026-robocolosseum-the-proving-ground-for.md
raw_filename: "robocolosseum-2026-robocolosseum-the-proving-ground-for.md"
source_collection: external
author: "RoboColosseum"
url: "https://robocolosseum.ai/"
publisher: "robocolosseum.ai"
fetched_at: "2026-11-09T21:49:07+0800"
extractor_tier: "jina"
tags: []
figures:
  - id: fig01
    file: assets/robocolosseum-2026-robocolosseum-the-proving-ground-for/page-full.png
    raw: raw/articles/robocolosseum-2026-robocolosseum-the-proving-ground-for-figures/page-full.png
    caption: "전체 페이지 스크린샷"
    strategy: screenshot
    curated: false
  - id: fig02
    file: assets/robocolosseum-2026-robocolosseum-the-proving-ground-for/crop01.png
    raw: raw/articles/robocolosseum-2026-robocolosseum-the-proving-ground-for-figures/crop01.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig03
    file: assets/robocolosseum-2026-robocolosseum-the-proving-ground-for/crop02.png
    raw: raw/articles/robocolosseum-2026-robocolosseum-the-proving-ground-for-figures/crop02.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
---

> 수집 메모 — `scripts/fetch_article.py` 가 사용자의 명시적 URL 지시에 따라 가져왔다 (CLAUDE.md rule #1 의 자료 수집 예외). 추출 tier: `jina`. 본문은 원문 그대로이며 요약·번역·윤문하지 않았다.
> `category` 는 임시값이므로 Step 3 에서 확정할 것.

---

## In-the-wild  
evaluations at scale

[Apply for an eval](https://robocolosseum.ai/#apply)
We operate one of the largest real-world robot benchmarks, with hundreds of robots deployed across 140+ scenes.

[Video 4](https://robocolosseum.ai/)

Evaluation tracks

### Open track

Two unnamed models try the same new instruction in the same scene. The evaluator picks the better run, or calls a tie.

### Fine-tune track

Every model is fine-tuned on a fixed task from the same 100 demonstrations, then makes 25 attempts.

## You bring the model.  
We handle the rest.

From robots to scoring, scenes, and operators, we handle everything to evaluate your model.

[Apply now](https://robocolosseum.ai/#apply)
1.   001### Apply

Tell us about your policy and the robots you want results on. 
2.   002### Connect

We help you link your inference server through our policy API, or serve your checkpoint on a machine next to the robot. 
3.   003### Evaluate

Operators set up each scene and run your model in Open track comparisons and Fine-tune track trials, recording every camera. 
4.   004### Track

See where your model ranks against top labs on that robot's leaderboard. Every run, failures included, is published on Hugging Face. 

## Active  
embodiments

5 active

**Policies**From top labs

All instructions written by an evaluator on the spot, with more added daily.

## Evaluation viewer

[Launch viewer](https://robocolosseum.ai/evals)
Preview the evaluation viewer. Watch a real blind comparison, both runs in sync, with the evaluator's pick and notes.

Data samples

## Fine-tune datasets

[Explore every recorded eval trial](https://huggingface.co/RoboColosseum)
We publish everything: training demonstrations and every evaluation run, failed attempts included, on Hugging Face in LeRobot format. Track scores or train on the data.

[](https://huggingface.co/RoboColosseum)

## Get 10,000 hours   
of free evaluation

You bring the policy. We put it to the test   
on real robots, in the wild.

[Apply for an eval](https://robocolosseum.ai/#apply)

## FAQ

Frequently asked

Who can apply?
Teams with a policy for one of our robots. The 10,000 free hours are allocated by the RoboColosseum team, who review every application and follow up with next steps.

What happens after I apply?
We read your application and get in touch to plan the evaluation with you: which robots and tasks, and how your model will connect. Then the runs start and results appear as they are scored.

Which robots are available?
Unitree G1 humanoids, bimanual YAM stations, Franka arms in the DROID setup and SO-ARM101 arms. Earth Rover Mini+ wheeled robots are being added. Your policy has to take the robot's camera inputs and produce its action format.

How do I connect my model?
Two ways. Run your own inference server and connect it with our policy API, and the robot streams observations to it during each run. Or hand over a checkpoint and we serve it on a machine next to the robot. We help you set up either one.

How is a model scored?
Open track: two unnamed models try the same fresh instruction and the evaluator picks the better run or calls a tie. Ratings are fitted from all comparisons on that robot and shown with their uncertainty. Fine-tune track: every model is fine-tuned on the same 100 demonstrations, then makes 25 attempts, and we report full successes and milestone progress.

How is it kept fair?
Evaluators see trial A and trial B, never the model names. Both models in a comparison face the same robot, scene and instruction, one after the other. Every fine-tuned model trains on identical demonstrations.

What gets published, and where?
Every run from both kinds of evaluation, failures included, with its videos, in LeRobot format on [Hugging Face](https://huggingface.co/RoboColosseum). Scores go on the public leaderboard.

## Citation

[Read the paper](https://arxiv.org/abs/2611.02497)
If you use RoboColosseum's results or data in your research, please cite our paper.

BibTeX

`@article{nguyen2026robocolosseum,  title={RoboColosseum: Evaluating Physical Intelligence at Scale In-The-Wild},  author={Nguyen, Tan Sang and Wang, Yi Ru and Shailesh, Shailesh and Yang, Gang and Hu, Jiamo and Jiang, Jianuo and Fang, Haoquan and Ren, Zhongzheng and Luo, Zhongyi and Chong, Ian and others},  journal={arXiv preprint arXiv:2611.02497},  year={2026}}`
