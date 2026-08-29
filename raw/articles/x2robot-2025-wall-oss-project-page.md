---
title: "WALL-OSS: Igniting VLMs toward the Embodied Space — X Square Robot 프로젝트 페이지"
type: article
year: 2025
category: physical-ai
raw_path: raw/articles/x2robot-2025-wall-oss-project-page.md
raw_filename: "x2robot-2025-wall-oss-project-page.md"
source_collection: external
author: "X Square Robot"
url: "https://x2robot.com/en/research/68bc2cde8497d7f238dde690"
publisher: "x2robot.com"
fetched_at: "2026-08-28T08:46:39+0900"
extractor_tier: "chrome"
tags: []
figures:
  - id: fig01
    file: assets/x2robot-2025-wall-oss-project-page/fig01.jpg
    raw: raw/articles/x2robot-2025-wall-oss-project-page-figures/fig01.jpg
    caption: ""
    strategy: fetched
    curated: false
  - id: fig02
    file: assets/x2robot-2025-wall-oss-project-page/fig02.png
    raw: raw/articles/x2robot-2025-wall-oss-project-page-figures/fig02.png
    caption: ""
    strategy: fetched
    curated: false
  - id: fig03
    file: assets/x2robot-2025-wall-oss-project-page/fig03.jpg
    raw: raw/articles/x2robot-2025-wall-oss-project-page-figures/fig03.jpg
    caption: ""
    strategy: fetched
    curated: false
  - id: fig04
    file: assets/x2robot-2025-wall-oss-project-page/page-full.png
    raw: raw/articles/x2robot-2025-wall-oss-project-page-figures/page-full.png
    caption: "전체 페이지 스크린샷"
    strategy: screenshot
    curated: false
---

> 수집 메모 — `scripts/fetch_article.py` 가 사용자의 명시적 URL 지시에 따라 가져왔다 (CLAUDE.md rule #1 의 자료 수집 예외). 추출 tier: `chrome`. 본문은 원문 그대로이며 요약·번역·윤문하지 않았다.
> `category` 는 임시값이므로 Step 3 에서 확정할 것.

---

#### ABSTRACT

While foundation models show remarkable progress in language and vision, existing vision-language models (VLMs) still have limited spatial and embodiment understanding. Transferring VLMs to embodied domains reveals fundamental mismatches between modalities, pretraining distributions, and training objectives, leaving action comprehension and generation as a central bottleneck on the path to AGI.

We introduce WALL-OSS, an end-to-end embodied foundation model that leverages large-scale multimodal pretraining to achieve (1) embodiment-aware vision--language understanding, (2) strong language--action association, and (3) robust manipulation capability.Our approach employs a tightly coupled architecture and multi-strategies training curriculum that enables Unified Cross-Level CoT—seamlessly unifying instruction reasoning, subgoal decomposition, and fine-grained action synthesis within a single differentiable framework.

Our results show that WALL-OSS attains high success on complex long-horizon manipulations, demonstrates strong instruction-following capabilities, and outperforms strong baselines, thereby providing a reliable and scalable path from VLMs to VLA embodied foundation models.

### EVALUATE

We designed six manipulation tasks to assess the model's performance across our core dimensions. Among these, set-table, tidy-bedroom, and place-by-color are novel tasks unseen during pre-training, designed to assess the model's adaptation capability on novel tasks.

#### Reasoning

- 

Video Player is loading.

Current Time 0:00

/

Duration 0:36

Loaded: 2.10%

0:00

Stream Type LIVE

Remaining Time -0:36

1x

 - Chapters

 - descriptions off, selected

 - captions settings, opens captions settings dialog
 - captions off, selected

This is a modal window.

Beginning of dialog window. Escape will cancel and close the window.

TextColorWhiteBlackRedGreenBlueYellowMagentaCyanOpacityOpaqueSemi-TransparentText BackgroundColorBlackWhiteRedGreenBlueYellowMagentaCyanOpacityOpaqueSemi-TransparentTransparentCaption Area BackgroundColorBlackWhiteRedGreenBlueYellowMagentaCyanOpacityTransparentSemi-TransparentOpaque

Font Size50%75%100%125%150%175%200%300%400%Text Edge StyleNoneRaisedDepressedUniformDrop shadowFont FamilyProportional Sans-SerifMonospace Sans-SerifProportional SerifMonospace SerifCasualScriptSmall Caps

End of dialog window.

- 

Video Player is loading.

Current Time 0:00

/

Duration 0:30

Loaded: 2.57%

0:00

Stream Type LIVE

Remaining Time -0:30

1x

 - Chapters

 - descriptions off, selected

 - captions settings, opens captions settings dialog
 - captions off, selected

This is a modal window.

Beginning of dialog window. Escape will cancel and close the window.

TextColorWhiteBlackRedGreenBlueYellowMagentaCyanOpacityOpaqueSemi-TransparentText BackgroundColorBlackWhiteRedGreenBlueYellowMagentaCyanOpacityOpaqueSemi-TransparentTransparentCaption Area BackgroundColorBlackWhiteRedGreenBlueYellowMagentaCyanOpacityTransparentSemi-TransparentOpaque

Font Size50%75%100%125%150%175%200%300%400%Text Edge StyleNoneRaisedDepressedUniformDrop shadowFont FamilyProportional Sans-SerifMonospace Sans-SerifProportional SerifMonospace SerifCasualScriptSmall Caps

End of dialog window.

- 

Video Player is loading.

Current Time 0:00

/

Duration 0:34

Loaded: 2.25%

0:00

Stream Type LIVE

Remaining Time -0:34

1x

 - Chapters

 - descriptions off, selected

 - captions settings, opens captions settings dialog
 - captions off, selected

This is a modal window.

Beginning of dialog window. Escape will cancel and close the window.

TextColorWhiteBlackRedGreenBlueYellowMagentaCyanOpacityOpaqueSemi-TransparentText BackgroundColorBlackWhiteRedGreenBlueYellowMagentaCyanOpacityOpaqueSemi-TransparentTransparentCaption Area BackgroundColorBlackWhiteRedGreenBlueYellowMagentaCyanOpacityTransparentSemi-TransparentOpaque

Font Size50%75%100%125%150%175%200%300%400%Text Edge StyleNoneRaisedDepressedUniformDrop shadowFont FamilyProportional Sans-SerifMonospace Sans-SerifProportional SerifMonospace SerifCasualScriptSmall Caps

End of dialog window.

- 

Video Player is loading.

Current Time 0:00

/

Duration 0:23

Loaded: 3.44%

0:00

Stream Type LIVE

Remaining Time -0:23

1x

 - Chapters

 - descriptions off, selected

 - captions settings, opens captions settings dialog
 - captions off, selected

This is a modal window.

Beginning of dialog window. Escape will cancel and close the window.

TextColorWhiteBlackRedGreenBlueYellowMagentaCyanOpacityOpaqueSemi-TransparentText BackgroundColorBlackWhiteRedGreenBlueYellowMagentaCyanOpacityOpaqueSemi-TransparentTransparentCaption Area BackgroundColorBlackWhiteRedGreenBlueYellowMagentaCyanOpacityTransparentSemi-TransparentOpaque

Font Size50%75%100%125%150%175%200%300%400%Text Edge StyleNoneRaisedDepressedUniformDrop shadowFont FamilyProportional Sans-SerifMonospace Sans-SerifProportional SerifMonospace SerifCasualScriptSmall Caps

End of dialog window.

- 

Video Player is loading.

Current Time 0:00

/

Duration 0:19

Loaded: 3.97%

0:00

Stream Type LIVE

Remaining Time -0:19

1x

 - Chapters

 - descriptions off, selected

 - captions settings, opens captions settings dialog
 - captions off, selected

This is a modal window.

Beginning of dialog window. Escape will cancel and close the window.

TextColorWhiteBlackRedGreenBlueYellowMagentaCyanOpacityOpaqueSemi-TransparentText BackgroundColorBlackWhiteRedGreenBlueYellowMagentaCyanOpacityOpaqueSemi-TransparentTransparentCaption Area BackgroundColorBlackWhiteRedGreenBlueYellowMagentaCyanOpacityTransparentSemi-TransparentOpaque

Font Size50%75%100%125%150%175%200%300%400%Text Edge StyleNoneRaisedDepressedUniformDrop shadowFont FamilyProportional Sans-SerifMonospace Sans-SerifProportional SerifMonospace SerifCasualScriptSmall Caps

End of dialog window.

- 

Video Player is loading.

Current Time 0:00

/

Duration 0:34

Loaded: 1.97%

0:00

Stream Type LIVE

Remaining Time -0:34

1x

 - Chapters

 - descriptions off, selected

 - captions settings, opens captions settings dialog
 - captions off, selected

This is a modal window.

Beginning of dialog window. Escape will cancel and close the window.

TextColorWhiteBlackRedGreenBlueYellowMagentaCyanOpacityOpaqueSemi-TransparentText BackgroundColorBlackWhiteRedGreenBlueYellowMagentaCyanOpacityOpaqueSemi-TransparentTransparentCaption Area BackgroundColorBlackWhiteRedGreenBlueYellowMagentaCyanOpacityTransparentSemi-TransparentOpaque

Font Size50%75%100%125%150%175%200%300%400%Text Edge StyleNoneRaisedDepressedUniformDrop shadowFont FamilyProportional Sans-SerifMonospace Sans-SerifProportional SerifMonospace SerifCasualScriptSmall Caps

End of dialog window.

- 

Video Player is loading.

Current Time 0:00

/

Duration 0:30

Loaded: 2.29%

0:00

Stream Type LIVE

Remaining Time -0:30

1x

 - Chapters

 - descriptions off, selected

 - captions settings, opens captions settings dialog
 - captions off, selected

This is a modal window.

Beginning of dialog window. Escape will cancel and close the window.

TextColorWhiteBlackRedGreenBlueYellowMagentaCyanOpacityOpaqueSemi-TransparentText BackgroundColorBlackWhiteRedGreenBlueYellowMagentaCyanOpacityOpaqueSemi-TransparentTransparentCaption Area BackgroundColorBlackWhiteRedGreenBlueYellowMagentaCyanOpacityTransparentSemi-TransparentOpaque

Font Size50%75%100%125%150%175%200%300%400%Text Edge StyleNoneRaisedDepressedUniformDrop shadowFont FamilyProportional Sans-SerifMonospace Sans-SerifProportional SerifMonospace SerifCasualScriptSmall Caps

End of dialog window.

- 

Video Player is loading.

Current Time 0:00

/

Duration 0:29

Loaded: 2.36%

0:00

Stream Type LIVE

Remaining Time -0:29

1x

 - Chapters

 - descriptions off, selected

 - captions settings, opens captions settings dialog
 - captions off, selected

This is a modal window.

Beginning of dialog window. Escape will cancel and close the window.

TextColorWhiteBlackRedGreenBlueYellowMagentaCyanOpacityOpaqueSemi-TransparentText BackgroundColorBlackWhiteRedGreenBlueYellowMagentaCyanOpacityOpaqueSemi-TransparentTransparentCaption Area BackgroundColorBlackWhiteRedGreenBlueYellowMagentaCyanOpacityTransparentSemi-TransparentOpaque

Font Size50%75%100%125%150%175%200%300%400%Text Edge StyleNoneRaisedDepressedUniformDrop shadowFont FamilyProportional Sans-SerifMonospace Sans-SerifProportional SerifMonospace SerifCasualScriptSmall Caps

End of dialog window.

- 

Video Player is loading.

Current Time 0:00

/

Duration 0:20

Loaded: 3.38%

0:00

Stream Type LIVE

Remaining Time -0:20

1x

 - Chapters

 - descriptions off, selected

 - captions settings, opens captions settings dialog
 - captions off, selected

This is a modal window.

Beginning of dialog window. Escape will cancel and close the window.

TextColorWhiteBlackRedGreenBlueYellowMagentaCyanOpacityOpaqueSemi-TransparentText BackgroundColorBlackWhiteRedGreenBlueYellowMagentaCyanOpacityOpaqueSemi-TransparentTransparentCaption Area BackgroundColorBlackWhiteRedGreenBlueYellowMagentaCyanOpacityTransparentSemi-TransparentOpaque

Font Size50%75%100%125%150%175%200%300%400%Text Edge StyleNoneRaisedDepressedUniformDrop shadowFont FamilyProportional Sans-SerifMonospace Sans-SerifProportional SerifMonospace SerifCasualScriptSmall Caps

End of dialog window.

- 

Video Player is loading.

Current Time 0:00

/

Duration 0:08

Loaded: 7.86%

0:00

Stream Type LIVE

Remaining Time -0:08

1x

 - Chapters

 - descriptions off, selected

 - captions settings, opens captions settings dialog
 - captions off, selected

This is a modal window.

Beginning of dialog window. Escape will cancel and close the window.

TextColorWhiteBlackRedGreenBlueYellowMagentaCyanOpacityOpaqueSemi-TransparentText BackgroundColorBlackWhiteRedGreenBlueYellowMagentaCyanOpacityOpaqueSemi-TransparentTransparentCaption Area BackgroundColorBlackWhiteRedGreenBlueYellowMagentaCyanOpacityTransparentSemi-TransparentOpaque

Font Size50%75%100%125%150%175%200%300%400%Text Edge StyleNoneRaisedDepressedUniformDrop shadowFont FamilyProportional Sans-SerifMonospace Sans-SerifProportional SerifMonospace SerifCasualScriptSmall Caps

End of dialog window.

- 

Video Player is loading.

Current Time 0:00

/

Duration 0:46

Loaded: 1.54%

0:00

Stream Type LIVE

Remaining Time -0:46

1x

 - Chapters

 - descriptions off, selected

 - captions settings, opens captions settings dialog
 - captions off, selected

This is a modal window.

Beginning of dialog window. Escape will cancel and close the window.

TextColorWhiteBlackRedGreenBlueYellowMagentaCyanOpacityOpaqueSemi-TransparentText BackgroundColorBlackWhiteRedGreenBlueYellowMagentaCyanOpacityOpaqueSemi-TransparentTransparentCaption Area BackgroundColorBlackWhiteRedGreenBlueYellowMagentaCyanOpacityTransparentSemi-TransparentOpaque

Font Size50%75%100%125%150%175%200%300%400%Text Edge StyleNoneRaisedDepressedUniformDrop shadowFont FamilyProportional Sans-SerifMonospace Sans-SerifProportional SerifMonospace SerifCasualScriptSmall Caps

End of dialog window.

#### Long-Horizon Planning and Action Robustness

- 

Video Player is loading.

Current Time 0:00

/

Duration 0:14

Loaded: 4.99%

0:00

Stream Type LIVE

Remaining Time -0:14

1x

 - Chapters

 - descriptions off, selected

 - captions settings, opens captions settings dialog
 - captions off, selected

This is a modal window.

Beginning of dialog window. Escape will cancel and close the window.

TextColorWhiteBlackRedGreenBlueYellowMagentaCyanOpacityOpaqueSemi-TransparentText BackgroundColorBlackWhiteRedGreenBlueYellowMagentaCyanOpacityOpaqueSemi-TransparentTransparentCaption Area BackgroundColorBlackWhiteRedGreenBlueYellowMagentaCyanOpacityTransparentSemi-TransparentOpaque

Font Size50%75%100%125%150%175%200%300%400%Text Edge StyleNoneRaisedDepressedUniformDrop shadowFont FamilyProportional Sans-SerifMonospace Sans-SerifProportional SerifMonospace SerifCasualScriptSmall Caps

End of dialog window.

- 

Video Player is loading.

Current Time 0:00

/

Duration 0:20

Loaded: 3.15%

0:00

Stream Type LIVE

Remaining Time -0:20

1x

 - Chapters

 - descriptions off, selected

 - captions settings, opens captions settings dialog
 - captions off, selected

This is a modal window.

Beginning of dialog window. Escape will cancel and close the window.

TextColorWhiteBlackRedGreenBlueYellowMagentaCyanOpacityOpaqueSemi-TransparentText BackgroundColorBlackWhiteRedGreenBlueYellowMagentaCyanOpacityOpaqueSemi-TransparentTransparentCaption Area BackgroundColorBlackWhiteRedGreenBlueYellowMagentaCyanOpacityTransparentSemi-TransparentOpaque

Font Size50%75%100%125%150%175%200%300%400%Text Edge StyleNoneRaisedDepressedUniformDrop shadowFont FamilyProportional Sans-SerifMonospace Sans-SerifProportional SerifMonospace SerifCasualScriptSmall Caps

End of dialog window.

- 

Video Player is loading.

Current Time 0:00

/

Duration 1:08

Loaded: 0.00%

0:00

Stream Type LIVE

Remaining Time -1:08

1x

 - Chapters

 - descriptions off, selected

 - captions settings, opens captions settings dialog
 - captions off, selected

This is a modal window.

Beginning of dialog window. Escape will cancel and close the window.

TextColorWhiteBlackRedGreenBlueYellowMagentaCyanOpacityOpaqueSemi-TransparentText BackgroundColorBlackWhiteRedGreenBlueYellowMagentaCyanOpacityOpaqueSemi-TransparentTransparentCaption Area BackgroundColorBlackWhiteRedGreenBlueYellowMagentaCyanOpacityTransparentSemi-TransparentOpaque

Font Size50%75%100%125%150%175%200%300%400%Text Edge StyleNoneRaisedDepressedUniformDrop shadowFont FamilyProportional Sans-SerifMonospace Sans-SerifProportional SerifMonospace SerifCasualScriptSmall Caps

End of dialog window.

- 

Video Player is loading.

Current Time 0:00

/

Duration 1:04

Loaded: 1.14%

0:00

Stream Type LIVE

Remaining Time -1:04

1x

 - Chapters

 - descriptions off, selected

 - captions settings, opens captions settings dialog
 - captions off, selected

This is a modal window.

Beginning of dialog window. Escape will cancel and close the window.

TextColorWhiteBlackRedGreenBlueYellowMagentaCyanOpacityOpaqueSemi-TransparentText BackgroundColorBlackWhiteRedGreenBlueYellowMagentaCyanOpacityOpaqueSemi-TransparentTransparentCaption Area BackgroundColorBlackWhiteRedGreenBlueYellowMagentaCyanOpacityTransparentSemi-TransparentOpaque

Font Size50%75%100%125%150%175%200%300%400%Text Edge StyleNoneRaisedDepressedUniformDrop shadowFont FamilyProportional Sans-SerifMonospace Sans-SerifProportional SerifMonospace SerifCasualScriptSmall Caps

End of dialog window.

- 

Video Player is loading.

Current Time 0:00

/

Duration 1:04

Loaded: 0.00%

0:00

Stream Type LIVE

Remaining Time -1:04

1x

 - Chapters

 - descriptions off, selected

 - captions settings, opens captions settings dialog
 - captions off, selected

This is a modal window.

Beginning of dialog window. Escape will cancel and close the window.

TextColorWhiteBlackRedGreenBlueYellowMagentaCyanOpacityOpaqueSemi-TransparentText BackgroundColorBlackWhiteRedGreenBlueYellowMagentaCyanOpacityOpaqueSemi-TransparentTransparentCaption Area BackgroundColorBlackWhiteRedGreenBlueYellowMagentaCyanOpacityTransparentSemi-TransparentOpaque

Font Size50%75%100%125%150%175%200%300%400%Text Edge StyleNoneRaisedDepressedUniformDrop shadowFont FamilyProportional Sans-SerifMonospace Sans-SerifProportional SerifMonospace SerifCasualScriptSmall Caps

End of dialog window.

#### 

#### Instruction Following

- 

Video Player is loading.

Current Time 0:00

/

Duration 0:06

Loaded: 10.77%

0:00

Stream Type LIVE

Remaining Time -0:06

1x

 - Chapters

 - descriptions off, selected

 - captions settings, opens captions settings dialog
 - captions off, selected

This is a modal window.

Beginning of dialog window. Escape will cancel and close the window.

TextColorWhiteBlackRedGreenBlueYellowMagentaCyanOpacityOpaqueSemi-TransparentText BackgroundColorBlackWhiteRedGreenBlueYellowMagentaCyanOpacityOpaqueSemi-TransparentTransparentCaption Area BackgroundColorBlackWhiteRedGreenBlueYellowMagentaCyanOpacityTransparentSemi-TransparentOpaque

Font Size50%75%100%125%150%175%200%300%400%Text Edge StyleNoneRaisedDepressedUniformDrop shadowFont FamilyProportional Sans-SerifMonospace Sans-SerifProportional SerifMonospace SerifCasualScriptSmall Caps

End of dialog window.

- 

Video Player is loading.

Current Time 0:00

/

Duration 0:10

Loaded: 6.70%

0:00

Stream Type LIVE

Remaining Time -0:10

1x

 - Chapters

 - descriptions off, selected

 - captions settings, opens captions settings dialog
 - captions off, selected

This is a modal window.

Beginning of dialog window. Escape will cancel and close the window.

TextColorWhiteBlackRedGreenBlueYellowMagentaCyanOpacityOpaqueSemi-TransparentText BackgroundColorBlackWhiteRedGreenBlueYellowMagentaCyanOpacityOpaqueSemi-TransparentTransparentCaption Area BackgroundColorBlackWhiteRedGreenBlueYellowMagentaCyanOpacityTransparentSemi-TransparentOpaque

Font Size50%75%100%125%150%175%200%300%400%Text Edge StyleNoneRaisedDepressedUniformDrop shadowFont FamilyProportional Sans-SerifMonospace Sans-SerifProportional SerifMonospace SerifCasualScriptSmall Caps

End of dialog window.

- 

Video Player is loading.

Current Time 0:00

/

Duration 0:12

Loaded: 5.54%

0:00

Stream Type LIVE

Remaining Time -0:12

1x

 - Chapters

 - descriptions off, selected

 - captions settings, opens captions settings dialog
 - captions off, selected

This is a modal window.

Beginning of dialog window. Escape will cancel and close the window.

TextColorWhiteBlackRedGreenBlueYellowMagentaCyanOpacityOpaqueSemi-TransparentText BackgroundColorBlackWhiteRedGreenBlueYellowMagentaCyanOpacityOpaqueSemi-TransparentTransparentCaption Area BackgroundColorBlackWhiteRedGreenBlueYellowMagentaCyanOpacityTransparentSemi-TransparentOpaque

Font Size50%75%100%125%150%175%200%300%400%Text Edge StyleNoneRaisedDepressedUniformDrop shadowFont FamilyProportional Sans-SerifMonospace Sans-SerifProportional SerifMonospace SerifCasualScriptSmall Caps

End of dialog window.

- 

Video Player is loading.

Current Time 0:00

/

Duration 0:04

Loaded: 15.20%

0:00

Stream Type LIVE

Remaining Time -0:04

1x

 - Chapters

 - descriptions off, selected

 - captions settings, opens captions settings dialog
 - captions off, selected

This is a modal window.

Beginning of dialog window. Escape will cancel and close the window.

TextColorWhiteBlackRedGreenBlueYellowMagentaCyanOpacityOpaqueSemi-TransparentText BackgroundColorBlackWhiteRedGreenBlueYellowMagentaCyanOpacityOpaqueSemi-TransparentTransparentCaption Area BackgroundColorBlackWhiteRedGreenBlueYellowMagentaCyanOpacityTransparentSemi-TransparentOpaque

Font Size50%75%100%125%150%175%200%300%400%Text Edge StyleNoneRaisedDepressedUniformDrop shadowFont FamilyProportional Sans-SerifMonospace Sans-SerifProportional SerifMonospace SerifCasualScriptSmall Caps

End of dialog window.

- 

Video Player is loading.

Current Time 0:00

/

Duration 0:37

Loaded: 1.84%

0:00

Stream Type LIVE

Remaining Time -0:37

1x

 - Chapters

 - descriptions off, selected

 - captions settings, opens captions settings dialog
 - captions off, selected

This is a modal window.

Beginning of dialog window. Escape will cancel and close the window.

TextColorWhiteBlackRedGreenBlueYellowMagentaCyanOpacityOpaqueSemi-TransparentText BackgroundColorBlackWhiteRedGreenBlueYellowMagentaCyanOpacityOpaqueSemi-TransparentTransparentCaption Area BackgroundColorBlackWhiteRedGreenBlueYellowMagentaCyanOpacityTransparentSemi-TransparentOpaque

Font Size50%75%100%125%150%175%200%300%400%Text Edge StyleNoneRaisedDepressedUniformDrop shadowFont FamilyProportional Sans-SerifMonospace Sans-SerifProportional SerifMonospace SerifCasualScriptSmall Caps

End of dialog window.

- 

Video Player is loading.

Current Time 0:00

/

Duration 0:08

Loaded: 8.25%

0:00

Stream Type LIVE

Remaining Time -0:08

1x

 - Chapters

 - descriptions off, selected

 - captions settings, opens captions settings dialog
 - captions off, selected

This is a modal window.

Beginning of dialog window. Escape will cancel and close the window.

TextColorWhiteBlackRedGreenBlueYellowMagentaCyanOpacityOpaqueSemi-TransparentText BackgroundColorBlackWhiteRedGreenBlueYellowMagentaCyanOpacityOpaqueSemi-TransparentTransparentCaption Area BackgroundColorBlackWhiteRedGreenBlueYellowMagentaCyanOpacityTransparentSemi-TransparentOpaque

Font Size50%75%100%125%150%175%200%300%400%Text Edge StyleNoneRaisedDepressedUniformDrop shadowFont FamilyProportional Sans-SerifMonospace Sans-SerifProportional SerifMonospace SerifCasualScriptSmall Caps

End of dialog window.

- 

Video Player is loading.

Current Time 0:00

/

Duration 0:26

Loaded: 2.60%

0:00

Stream Type LIVE

Remaining Time -0:26

1x

 - Chapters

 - descriptions off, selected

 - captions settings, opens captions settings dialog
 - captions off, selected

This is a modal window.

Beginning of dialog window. Escape will cancel and close the window.

TextColorWhiteBlackRedGreenBlueYellowMagentaCyanOpacityOpaqueSemi-TransparentText BackgroundColorBlackWhiteRedGreenBlueYellowMagentaCyanOpacityOpaqueSemi-TransparentTransparentCaption Area BackgroundColorBlackWhiteRedGreenBlueYellowMagentaCyanOpacityTransparentSemi-TransparentOpaque

Font Size50%75%100%125%150%175%200%300%400%Text Edge StyleNoneRaisedDepressedUniformDrop shadowFont FamilyProportional Sans-SerifMonospace Sans-SerifProportional SerifMonospace SerifCasualScriptSmall Caps

End of dialog window.

- 

Video Player is loading.

Current Time 0:00

/

Duration 0:30

Loaded: 2.38%

0:00

Stream Type LIVE

Remaining Time -0:30

1x

 - Chapters

 - descriptions off, selected

 - captions settings, opens captions settings dialog
 - captions off, selected

This is a modal window.

Beginning of dialog window. Escape will cancel and close the window.

TextColorWhiteBlackRedGreenBlueYellowMagentaCyanOpacityOpaqueSemi-TransparentText BackgroundColorBlackWhiteRedGreenBlueYellowMagentaCyanOpacityOpaqueSemi-TransparentTransparentCaption Area BackgroundColorBlackWhiteRedGreenBlueYellowMagentaCyanOpacityTransparentSemi-TransparentOpaque

Font Size50%75%100%125%150%175%200%300%400%Text Edge StyleNoneRaisedDepressedUniformDrop shadowFont FamilyProportional Sans-SerifMonospace Sans-SerifProportional SerifMonospace SerifCasualScriptSmall Caps

End of dialog window.

- 

Video Player is loading.

Current Time 0:00

/

Duration 0:20

Loaded: 3.39%

0:00

Stream Type LIVE

Remaining Time -0:20

1x

 - Chapters

 - descriptions off, selected

 - captions settings, opens captions settings dialog
 - captions off, selected

This is a modal window.

Beginning of dialog window. Escape will cancel and close the window.

TextColorWhiteBlackRedGreenBlueYellowMagentaCyanOpacityOpaqueSemi-TransparentText BackgroundColorBlackWhiteRedGreenBlueYellowMagentaCyanOpacityOpaqueSemi-TransparentTransparentCaption Area BackgroundColorBlackWhiteRedGreenBlueYellowMagentaCyanOpacityTransparentSemi-TransparentOpaque

Font Size50%75%100%125%150%175%200%300%400%Text Edge StyleNoneRaisedDepressedUniformDrop shadowFont FamilyProportional Sans-SerifMonospace Sans-SerifProportional SerifMonospace SerifCasualScriptSmall Caps

End of dialog window.

- 

Video Player is loading.

Current Time 0:00

/

Duration 0:14

Loaded: 4.71%

0:00

Stream Type LIVE

Remaining Time -0:14

1x

 - Chapters

 - descriptions off, selected

 - captions settings, opens captions settings dialog
 - captions off, selected

This is a modal window.

Beginning of dialog window. Escape will cancel and close the window.

TextColorWhiteBlackRedGreenBlueYellowMagentaCyanOpacityOpaqueSemi-TransparentText BackgroundColorBlackWhiteRedGreenBlueYellowMagentaCyanOpacityOpaqueSemi-TransparentTransparentCaption Area BackgroundColorBlackWhiteRedGreenBlueYellowMagentaCyanOpacityTransparentSemi-TransparentOpaque

Font Size50%75%100%125%150%175%200%300%400%Text Edge StyleNoneRaisedDepressedUniformDrop shadowFont FamilyProportional Sans-SerifMonospace Sans-SerifProportional SerifMonospace SerifCasualScriptSmall Caps

End of dialog window.

#### Overall

Our experiments clearly demonstrate that multi-modal co-training substantially enhances a model’s ability to follow fine-grained instructions. The pre-training phase of WALL-OSS establishes a strong foundation for multimodal action alignment, and maintaining this co-training strategy during fine-tuning further amplifies the model’s instruction-grounded execution capabilities.

![](/_next/image?url=%2Fapi%2Fimages%2Ffile%2F01.jpg&w=3840&q=75)

#### Model

We present the overall architecture of WALL-OSS. We adopt QwenVL2.5-3B as the main backbone. The model takes as input vision (egocentric and arm-mounted camera views) together with text instructions and produces different outputs depending on the training phase, while remaining conditioned on the same multimodal inputs throughout. 

![](/_next/image?url=%2Fapi%2Fimages%2Ffile%2Fm0.png&w=3840&q=75)

#### DATA

We construct an embodiment-centric, multisource dataset to address the lack of large-scale, aligned VLA supervision and the spatial understanding gaps of current VLMs. The corpus exceeds tens of thousands of hours and comprises three complementary parts: (1) self-collected robot action data for high quality and task complexity, (2) open-source action data for cross-morphology and cross-environment generalization, and (3) multimodal VQA data to preserve and strengthen language--vision ability while providing additional supervision for spatial--temporal and reasoning.

To match our two-stage training recipe (Inspiration and Integration), we functionally orchestrate the sources: (1) Inspiration focuses on embodied VQA, instruction following, and discrete action priors via FAST to inject coarse action awareness into the VLM while improving spatial reasoning; (2) Integration focuses on high-frequency continuous control with flow matching over real and unified open-source trajectories, first training the action branch and then jointly optimizing with the VLM to tighten language--vision--action alignment and mitigate forgetting.

![](/_next/image?url=%2Fapi%2Fimages%2Ffile%2F02.jpg&w=3840&q=75)
