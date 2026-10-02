---
title: "ICML 2026 | Latent Reasoning VLA (LaRA-VLA)"
type: article
year: 2026
category: physical-ai
raw_path: raw/articles/bai-2026-lara-vla-project-page.md
raw_filename: "bai-2026-lara-vla-project-page.md"
source_collection: external
author: "Shuanghao Bai, Jing Lyu et al."
url: "https://loveju1y.github.io/Latent-Reasoning-VLA/"
publisher: "loveju1y.github.io"
publication_date: "2024-01-01T00:00:00.000Z"
fetched_at: "2026-10-02T08:50:53+0900"
extractor_tier: "chrome"
tags: []
figures:
  - id: fig01
    file: assets/bai-2026-lara-vla-project-page/fig01.png
    raw: raw/articles/bai-2026-lara-vla-project-page-figures/fig01.png
    caption: "Model architecture"
    strategy: fetched
    curated: false
  - id: fig02
    file: assets/bai-2026-lara-vla-project-page/fig02.png
    raw: raw/articles/bai-2026-lara-vla-project-page-figures/fig02.png
    caption: "LIBERO results"
    strategy: fetched
    curated: false
  - id: fig03
    file: assets/bai-2026-lara-vla-project-page/fig03.png
    raw: raw/articles/bai-2026-lara-vla-project-page-figures/fig03.png
    caption: "SimplerEnv WidowX results"
    strategy: fetched
    curated: false
  - id: fig04
    file: assets/bai-2026-lara-vla-project-page/fig04.png
    raw: raw/articles/bai-2026-lara-vla-project-page-figures/fig04.png
    caption: "Real-world task results"
    strategy: fetched
    curated: false
  - id: fig05
    file: assets/bai-2026-lara-vla-project-page/fig05.png
    raw: raw/articles/bai-2026-lara-vla-project-page-figures/fig05.png
    caption: "Latent collapse analysis"
    strategy: fetched
    curated: false
  - id: fig06
    file: assets/bai-2026-lara-vla-project-page/fig06.png
    raw: raw/articles/bai-2026-lara-vla-project-page-figures/fig06.png
    caption: "Inference time comparison"
    strategy: fetched
    curated: false
  - id: fig07
    file: assets/bai-2026-lara-vla-project-page/fig07.png
    raw: raw/articles/bai-2026-lara-vla-project-page-figures/fig07.png
    caption: "Ablation study"
    strategy: fetched
    curated: false
  - id: fig08
    file: assets/bai-2026-lara-vla-project-page/page-full.png
    raw: raw/articles/bai-2026-lara-vla-project-page-figures/page-full.png
    caption: "전체 페이지 스크린샷"
    strategy: screenshot
    curated: false
---

> 수집 메모 — `scripts/fetch_article.py` 가 사용자의 명시적 URL 지시에 따라 가져왔다 (CLAUDE.md rule #1 의 자료 수집 예외). 추출 tier: `chrome`. 본문은 원문 그대로이며 요약·번역·윤문하지 않았다.
> `category` 는 임시값이므로 Step 3 에서 확정할 것.

---

# Latent Reasoning VLA: Latent Thinking and Prediction for Vision-Language-Action Models

[ICML 2026](https://icml.cc/Conferences/2026)

[Shuanghao Bai](https://baishuanghao.github.io/)* 1,2[Jing Lyu](https://scholar.google.com/citations?hl=vi&user=Th6JWCEAAAAJ)* 2,3,4[Wanqi Zhou](https://ellezwq.github.io/)1[Zhe Li](https://scholar.google.com/citations?user=U8f81zQAAAAJ&hl=zh-CN)2Dakai Wang1[Lei Xing](https://scholar.google.com/citations?user=TlfrTOkAAAAJ&hl=en)1[Xiaoguang Zhao](https://people.ucas.ac.cn/~zhaoxiaoguang?language=en)3[Pengwei Wang](https://scholar.google.com/citations?hl=zh-CN&user=2xR6P5AAAAAJ)2[Zhongyuan Wang](https://www.wangzhongyuan.com/)2[Cheng Chi](https://chicheng123.github.io/)2,†[Badong Chen](https://gr.xjtu.edu.cn/web/chenbd/home)1,†[Shanghang Zhang](https://pku-hmi-lab.github.io/HMI-Web/leader.html)2,5,†

* Equal contribution. † Corresponding authors.

1 Institute of Artificial Intelligence and Robotics, Xi'an Jiaotong University. 2 Beijing Academy of Artificial Intelligence. 3 Institute of Automation, University of Chinese Academy of Sciences. 4 School of Artificial Intelligence, University of Chinese Academy of Sciences. 5 Peking University. 

[Paper](static/pdfs/Latent_Reasoning_VLA.pdf)[arXiv](http://arxiv.org/abs/2602.01166)[Code](https://github.com/LoveJu1y/LaRA-VLA)

 Abstract 

## Abstract

 VisionLanguageAction (VLA) models benefit from chainofthought (CoT) reasoning, but existing approaches incur high inference overhead and rely on discrete reasoning representations that mismatch continuous perception and control. We propose Latent Reasoning VLA (LaRA-VLA), a unified VLA framework that internalizes multimodal CoT reasoning into continuous latent representations for embodied action. LaRA-VLA performs unified reasoning and prediction in latent space, eliminating explicit CoT generation at inference time and enabling efficient, actionoriented control. To realize latent embodied reasoning, we introduce a curriculum-based training paradigm that progressively transitions from explicit textual and visual CoT supervision to latent reasoning, and finally adapts latent reasoning dynamics to condition action generation. We construct two structured CoT datasets and evaluate LaRA-VLA on both simulation benchmarks and long horizon real-robot manipulation tasks. Experimental results show that LaRA-VLA consistently outperforms stateoftheart VLA methods while reducing inference latency by up to 90% compared to explicit CoTbased approaches, demonstrating latent reasoning as an effective and efficient paradigm for real-time embodied control. 

 End Abstract 1. Model Architecture 

## LaRA-VLA

![Model architecture](static/images/2_1.png)

 Training proceeds in three stages: (i) explicit CoT finetuning with aligned visual prediction latents and inversedynamics supervision for actions; (ii) a curriculumbased transition from explicit CoT to compact text latents, gradually reducing the number of text tokens while increasing reliance on latent reasoning, where the latent representations are also implicitly supervised by visual and action signals; and (iii) adaptation of latent-conditioned VLM features to an action expert for efficient action generation without explicit CoT at inference time. 

 End Model Architecture 

 2. Experiments 

## Experiments

### Simulation Experiments

#### Libero

![LIBERO results](static/images/3.png)

 On LIBERO, LaRA-VLA achieves the best overall performance with an average success rate of 97.9%, including 99.8% on the Object suite and 96.6% on the Long suite, demonstrating strong object-centric reasoning and robustness in long-horizon manipulation. 

#### SimplerEnv

![SimplerEnv WidowX results](static/images/5.png)

 On SimplerEnv-WidowX, LaRA-VLA attains the highest average success rate of 68.8%, outperforming NoCoT, Textual CoT, and Visual CoT baselines. Across both benchmarks, LaRA-VLA consistently surpasses textual and visual CoT methods, indicating that latent reasoning provides more effective and stable guidance for action prediction and generalizes better than explicit CoT supervision. 

### Real-world Experiments

![Real-world task results](static/images/6.png)

LaRA-VLA consistently outperforms ACT and GR00T N1.5 across all four long-horizon real-world manipulation tasks, achieving the highest average success rate. The improvements are especially pronounced on tasks requiring multi-stage reasoning and sustained temporal coordination, highlighting enhanced robustness to error accumulation over long horizons. 

#### LaRA-VLA

#### GR00T N1.5

 End Experiments 

 3. Analysis 

## Analysis

### Latent Collapse

![Latent collapse analysis](static/images/11.png)

 Latent tokens associated with different reasoning components form wellseparated and semantically coherent clusters, demonstrating clear functional specialization rather than degeneration into uniform or uninformative representations. Moreover, latent representations of language instruction tokens (gray points) remain structured and occupy a distinct subspace from reasoning latents, indicating that latent CoT does not trivially reuse language embeddings. 

### Inference Time

![Inference time comparison](static/images/12.png)

 LaRA-VLA significantly reduces inference latency, achieving 135 ms per rollout and outperforming all baselines by a large margin. Compared to explicit CoT methods, this yields up to a 90% reduction in inference time, demonstrating the efficiency benefits of latent reasoning without explicit CoT decoding. 

### Ablation

![Ablation study](static/images/10.png)

 Ablation study of different forms of CoT supervision on SimplerEnv. TextCoT denotes explicit textual chain of thought, Latent TextCoT denotes latent textual chain of thought, and Latent VisCoT denotes latent visual chain of thought. 

 End Analysis
