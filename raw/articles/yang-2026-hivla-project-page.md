---
title: "HiVLA: A Visual-Grounded-Centric Hierarchical Embodied Manipulation System"
type: article
year: 2026
category: physical-ai
raw_path: raw/articles/yang-2026-hivla-project-page.md
raw_filename: "yang-2026-hivla-project-page.md"
source_collection: external
author: "Tianshuo Yang 외"
url: "https://tianshuoy.github.io/HiVLA-page/"
publisher: "tianshuoy.github.io"
fetched_at: "2026-09-07T23:46:21+0900"
extractor_tier: "chrome"
tags: [physical-ai, vla, manipulation, robot-learning]
figures:
  - id: fig01
    file: assets/yang-2026-hivla-project-page/fig01.jpg
    raw: raw/articles/yang-2026-hivla-project-page-figures/fig01.jpg
    caption: "HiVLA teaser figure"
    strategy: fetched
    curated: false
  - id: fig02
    file: assets/yang-2026-hivla-project-page/fig02.png
    raw: raw/articles/yang-2026-hivla-project-page-figures/fig02.png
    caption: "HiVLA pipeline figure"
    strategy: fetched
    curated: false
  - id: fig03
    file: assets/yang-2026-hivla-project-page/page-full.png
    raw: raw/articles/yang-2026-hivla-project-page-figures/page-full.png
    caption: "전체 페이지 스크린샷"
    strategy: screenshot
    curated: false
---

> 수집 메모 — `scripts/fetch_article.py` 가 사용자의 명시적 URL 지시에 따라 가져왔다 (CLAUDE.md rule #1 의 자료 수집 예외). 추출 tier: `chrome`. 본문은 원문 그대로이며 요약·번역·윤문하지 않았다.

---

# HiVLA: A Visual-Grounded-Centric Hierarchical Embodied Manipulation System

 Paper authors [Tianshuo Yang](https://scholar.google.com/citations?user=9b5dE40AAAAJ&hl=en)1,2,*, Guanyu Chen3,*,[Yutian Chen](https://yutian10.github.io/)2,4,[Zhixuan Liang](https://liang-zx.github.io/)1,2, Yitian Liu3, Zanxin Chen2,3,
[Chunpu Xu](https://scholar.google.com/citations?user=J0mUlCIAAAAJ&hl=en)2, Haotian Liang2, Jiangmiao Pang2,[Yao Mu](https://yaomarkmu.github.io/)2,3,[Ping Luo](https://scholar.google.com/citations?hl=en&user=aXdjxb4AAAAJ&view_op=list_works&sortby=pubdate)1

1HKU,2Shanghai AI Lab,3SJTU,4CUHK

* indicates equal contributions, † indicates corresponding author

 Arxiv PDF link [Paper](https://arxiv.org/pdf/2604.14125) ArXiv abstract Link [arXiv](https://arxiv.org/abs/2604.14125) Github link [Code (Coming Soon)](https://tianshuoy.github.io/HiVLA-page/)

 Teaser image 

![HiVLA teaser figure](static/images/teaser.jpg)

## (a) Overview of our proposed HiVLA framework. (b) Success rate comparison on RoboTwin benchmark.

 End teaser image Paper abstract 

## Abstract

 While end-to-end Vision-Language-Action (VLA) models offer a promising paradigm for robotic manipulation, fine-tuning them on narrow control data often compromises the profound reasoning capabilities inherited from their base Vision-Language Models (VLMs). To resolve this fundamental trade-off, we propose HiVLA, a visual-grounded-centric hierarchical framework that explicitly decouples high-level semantic planning from low-level motor control. In high-level part, a VLM planner first performs task decomposition and visual grounding to generate structured plans, comprising a subtask instruction and a precise target bounding box. Then, to translate this plan into physical actions, we introduce a flow-matching Diffusion Transformer (DiT) action expert in low-level part equipped with a novel cascaded cross-attention mechanism. This design sequentially fuses global context, high-resolution object-centric crops and skill semantics, enabling the DiT to focus purely on robust execution. Our decoupled architecture preserves the VLM's zero-shot reasoning while allowing independent improvement of both components. Extensive experiments in simulation and the real world demonstrate that HiVLA significantly outperforms state-of-the-art end-to-end baselines, particularly excelling in long-horizon skill composition and the fine-grained manipulation of small objects in cluttered scenes. 

 End paper abstract Pipeline figure 

## Pipeline

![HiVLA pipeline figure](static/images/pipeline.png)

## (a) Our decoupled framework utilizes a VLM to decompose user instructions into explicit structured plans, yielding a skill-level subtask and a bounding box used to extract a high-resolution target crop. (b) To execute this plan, the DiT action expert employs a cascaded cross-attention block. This design sequentially conditions the noisy action latents on global visual context, position-aware local features, and language tokens, bridging high-level reasoning with low-level control.

 End pipeline figure Results 

## Results



| Task | π 0 | π 0.5 | StarVLA | H-RDT | Ours w/o Skill | Ours |
|---|---|---|---|---|---|---|
| Easy Tasks |  |  |  |  |  |  |
| Click Bell | 45% | 65% | 71% | 88% | 95% | 94% |
| Click Clock | 53% | 66% | 83% | 93% | 97% | 97% |
| Press Stapler | 60% | 69% | 63% | 89% | 98% | 97% |
| Lift Pot | 59% | 21% | 18% | 92% | 96% | 96% |
| Average | 54.3% | 55.3% | 58.8% | 90.5% | 96.5% | 96.0% |
| Hard Tasks |  |  |  |  |  |  |
| Place Shoe | 75% | 68% | 61% | 88% | 94% | 95% |
| Move Stapler | 15% | 17% | 15% | 34% | 42% | 60% |
| Stamp Seal | 61% | 42% | 25% | 43% | 68% | 76% |
| Stack 3 Blocks | 1% | 1% | 16% | 20% | 26% | 37% |
| Click 3 Bells | 41% | 54% | 66% | 88% | 92% | 98% |
| Average | 38.6% | 36.4% | 36.6% | 54.6% | 64.4% | 73.2% |
| Total Average | 45.6% | 44.8% | 46.4% | 70.6% | 78.7% | 83.3% |


 Main success rates across 9 tasks in the RoboTwin simulator. HiVLA demonstrates superior performance, particularly in long-horizon and visually demanding tasks. Best and second-best results are bold and underlined. 

 End results BibTex citation 

## BibTeX

```
@article{yang2026hivla,
 title = {{HiVLA}: A Visual-Grounded-Centric Hierarchical Embodied Manipulation System},
 author = {Yang, Tianshuo and Chen, Guanyu and Chen, Yutian and Liang, Zhixuan and Liu, Yitian and Chen, Zanxin and Xu, Chunpu and Liang, Haotian and Pang, Jiangmiao and Mu, Yao and Luo, Ping},
 journal = {arXiv preprint arXiv:2604.14125},
 year = {2026}
}
```

End BibTex citation Statcounter tracking code You can add a tracker to track page visits by creating an account at statcounter.com End of Statcounter Code
