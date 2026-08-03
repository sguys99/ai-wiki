---
title: "SONIC: Supersizing Motion Tracking for Natural Humanoid Whole-Body Control"
type: article
year: 2026
category: physical-ai
raw_path: raw/articles/nvlabs-2026-gear-sonic-project-page.md
raw_filename: "nvlabs-2026-gear-sonic-project-page.md"
source_collection: external
author: "NVIDIA GEAR Lab"
url: "https://nvlabs.github.io/GEAR-SONIC/"
publisher: "nvlabs.github.io"
fetched_at: "2026-08-03T23:12:02+0900"
extractor_tier: "chrome"
tags: []
figures:
  - id: fig01
    file: assets/nvlabs-2026-gear-sonic-project-page/page-full.png
    raw: raw/articles/nvlabs-2026-gear-sonic-project-page-figures/page-full.png
    caption: "전체 페이지 스크린샷"
    strategy: screenshot
    curated: false
---

> 수집 메모 — `scripts/fetch_article.py` 가 사용자의 명시적 URL 지시에 따라 가져왔다 (CLAUDE.md rule #1 의 자료 수집 예외). 추출 tier: `chrome`. 본문은 원문 그대로이며 요약·번역·윤문하지 않았다.
> `category` 는 임시값이므로 Step 3 에서 확정할 것.

---

Abstract. 

## Abstract

 Despite the rise of billion-parameter foundation models trained across thousands of GPUs, similar scaling gains have not been shown for humanoid control. Current neural controllers for humanoids remain modest in size, target a limited set of behaviors, and are trained on a handful of GPUs. We show that scaling model capacity, data, and compute yields a generalist humanoid controller capable of natural, robust whole-body movements. We position motion tracking as a scalable task for humanoid control, leveraging dense supervision from diverse motion-capture data to acquire human motion priors without manual reward engineering. We build a foundation model for motion tracking by scaling along three axes: network size (1.2M to 42M parameters), dataset volume (100M+ frames from 700 hours of motion capture), and compute (21k GPU hours). Beyond demonstrating the benefits of scale, we further show downstream utility through: (1) a real-time kinematic planner bridging motion tracking to tasks such as navigation, enabling natural and interactive control, and (2) a unified token space supporting VR teleoperation and vision-language-action (VLA) models with a single policy. Through this interface, we demonstrate autonomous VLA-driven whole-body loco-manipulation requiring coordinated hand and foot placement. Scaling motion tracking exhibits favorable properties: performance improves steadily with compute and data diversity, and learned policies generalize to unseen motions, establishing motion tracking at scale as a practical foundation for humanoid control.
