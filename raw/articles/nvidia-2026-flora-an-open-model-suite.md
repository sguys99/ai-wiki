---
title: "Flora: An Open Model Suite for Scaling Robotics Data Engines"
type: article
year: 2026
category: physical-ai
raw_path: raw/articles/nvidia-2026-flora-an-open-model-suite.md
raw_filename: "nvidia-2026-flora-an-open-model-suite.md"
source_collection: external
author: "NVIDIA GEAR Lab"
url: "https://research.nvidia.com/labs/gear/flora/"
publisher: "research.nvidia.com"
publication_date: "Tue, 20 Oct 2026 16:59:07 GMT"
fetched_at: "2026-10-24T10:03:41+0900"
extractor_tier: "jina"
tags: []
figures:
  - id: fig01
    file: assets/nvidia-2026-flora-an-open-model-suite/page-full.png
    raw: raw/articles/nvidia-2026-flora-an-open-model-suite-figures/page-full.png
    caption: "전체 페이지 스크린샷"
    strategy: screenshot
    curated: false
  - id: fig02
    file: assets/nvidia-2026-flora-an-open-model-suite/crop01.png
    raw: raw/articles/nvidia-2026-flora-an-open-model-suite-figures/crop01.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
---

> 수집 메모 — `scripts/fetch_article.py` 가 사용자의 명시적 URL 지시에 따라 가져왔다 (CLAUDE.md rule #1 의 자료 수집 예외). 추출 tier: `jina`. 본문은 원문 그대로이며 요약·번역·윤문하지 않았다.
> `category` 는 임시값이므로 Step 3 에서 확정할 것.

---

[NVIDIA GEAR Team](https://research.nvidia.com/labs/gear/)[Scroll](https://research.nvidia.com/labs/gear/flora/#overview)

·Yunze Man*·Zhiqi Li*·Jing Wang·Yuhe Zhang·Ryan Punamiya Siddharth Patki·Kaiyuan Zheng·Zi-ang Cao·Zhiding Yu·Sifei Liu·Danfei Xu Ben Levin·Jan Kautz·Yuke Zhu†·Johan Bjorck*,†·Linxi “Jim” Fan†NVIDIA*Equal contribution ·†Equal advising

[Video 5](https://research.nvidia.com/labs/gear/flora/assets/video/flora.mp4?v=4)

The life-cycle of robotics foundation models crucially depends on data labels. Outcome reward labels are needed for monitoring real-world deployments. Process reward labels are needed during RL post-training. Timestamped captions are needed for filtering and balancing pretraining data. We present Flora, an industrial-strength data engine used for training GR00T models, that simultaneously covers these capabilities. Flora achieves SOTA scores on the captioning benchmark WGO-Bench and reward benchmarks RoboReward and Robometer. On internal benchmarks it is competitive with GPT-6 Astra while beating other frontier models. The model is substantially cheaper than API-based alternatives, roughly ~125× cheaper than GPT-6 Astra. Flora is battle tested at scale, labeling 200,000 hours of data per day across 512 GB300s. By open-sourcing our data engine, we enable researchers to scale custom robotics datasets and explore emerging applications such as physical auto-research and human-to-robot transfer.

Hover or tap a tile to read its annotation.

From episodes to internet-scale data.

Human and robot. The same annotation pipeline.

Proven at scale.

200,000 hours

per day.

Production run · 512 GB300 GPUs

|  | Benchmark / metric | Flora | Proprietary | Open-weight |
| --- | --- | --- | --- | --- |
| GPT-6 Astra | GPT-5.6 Sol | Claude Opus 5 | Kimi K3 |
| Timestamped captions | DenseCaptionBench Human100 subset |
| Segmentation F1@0.5 | ↑ | 54.6 | 44.2 | 32.6 | 22.7 | 21.1 |
| Caption point quality | ↑ | 66.5 | 60.3 | 36.4 | 31.0 | 30.3 |
| Joint point F1@0.5 | ↑ | 37.4 | 29.7 | 14.6 | 8.2 | 7.9 |
| DenseCaptionBench Robot200 subset |
| Segmentation F1@0.5 | ↑ | 66.9 | 71.9 | 45.8 | 45.9 | 41.2 |
| Caption point quality | ↑ | 73.7 | 80.2 | 69.6 | 49.7 | 48.0 |
| Joint point F1@0.5 | ↑ | 51.0 | 57.9 | 33.6 | 23.6 | 22.2 |
| WGO-Bench |
| Segmentation F1@0.75 | ↑ | 50.3 | 46.0 | 33.7 | 25.5 | 26.1 |
| Gold-window accuracy | ↑ | 64.7 | 77.4 | 56.6 | 49.3 | 50.6 |
| Joint semantic F1@0.75 | ↑ | 34.5 | 39.0 | 24.6 | 15.4 | 16.7 |
| Reward annotations | RoboRewardBench / RobometerBench |
| RoboReward MAE | ↓ | 40.0 | 55.4 | 78.0 | 88.2 | 68.2 |
| Robometer OOD Kendall | ↑ | 72.0 | 82.3 | 64.2 | 63.1 | 63.5 |
| Robometer ID VOC | ↑ | 98.9 | 98.9 | 97.1 | 91.8 | 97.2 |
| Robometer OOD VOC | ↑ | 99.6 | 99.7 | 99.3 | 98.6 | 99.7 |
| DenseRewardBench |
| Macro F1 | ↑ | 46.2 | 40.7 | 36.3 | 33.9 | 31.2 |
| Balanced accuracy | ↑ | 54.2 | 44.1 | 37.8 | 35.1 | 32.3 |
| Bad-action F1 | ↑ | 47.7 | 44.8 | 26.4 | 22.9 | 17.6 |
| Failure recall | ↑ | 53.3 | 0.0 | 1.0 | 0.3 | 0.3 |
| RubricBench |
| Pooled L1 error | ↓ | 6.5 | 3.6 | 8.4 | 17.1 | 15.6 |

Flora Best in row (ties)Arrows indicate better

Flora Proprietary models Open-weight models Specialized reward models

@article{leng2026flora,
  title   = {Flora: An Open Model Suite for Scaling Robotics Data Engines},
  author  = {Sicong Leng and Yunze Man and Zhiqi Li and Jing Wang and
             Yuhe Zhang and Ryan Punamiya and Siddharth Patki and Kaiyuan Zheng and
             Zi-ang Cao and Zhiding Yu and Sifei Liu and Danfei Xu and Ben Levin and
             Jan Kautz and Yuke Zhu and Johan Bjorck and Linxi "Jim" Fan},
  year    = {2026}
}

We are grateful for discussions and help from Cristaldo Campos, Omar Laymoun, Anita Agasaveeran, Marina Davila, Jenna Diamond, and the broader NVIDIA community.
