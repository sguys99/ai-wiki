---
title: "Helix: Figure AI가 공개한 범용 휴머노이드 제어를 위한 시각-언어-행동(VLA) 모델"
type: article
year: 2025
category: physical-ai
raw_path: raw/articles/9bow-2025-helix-generalist-humanoid-vla.md
raw_filename: "9bow-2025-helix-generalist-humanoid-vla.md"
source_collection: external
author: "9bow (박정환)"
url: "https://discuss.pytorch.kr/t/helix-figure-ai-vla/6197"
publisher: "PyTorch KR (discuss.pytorch.kr)"
published: "2025-02-23"
fetched_at: "2026-08-31T09:15:00+0900"
extractor_tier: "discourse-raw"
tags:
  - physical-ai
  - vla
  - humanoid
  - manipulation
figures:
  - id: fig01
    file: assets/9bow-2025-helix-generalist-humanoid-vla/fig01.jpeg
    raw: raw/articles/9bow-2025-helix-generalist-humanoid-vla-figures/fig01.jpeg
    caption: "Figure AI Helix 발표 페이지 상단 배너"
    strategy: fetched
    curated: false
  - id: fig02
    file: assets/9bow-2025-helix-generalist-humanoid-vla/fig02.jpeg
    raw: raw/articles/9bow-2025-helix-generalist-humanoid-vla-figures/fig02.jpeg
    caption: "System 1 / System 2 로 구성된 Helix 구조도"
    strategy: fetched
    curated: false
---

> 수집 메모 — 사용자의 명시적 URL 지시에 따라 취득한 원문 전문이다 (CLAUDE.md rule #1 의 자료 수집 예외).
> `scripts/fetch_article.py` 의 chrome tier 가 Discourse SPA 에서 본문 123자만 얻어 실패했으므로,
> Discourse raw endpoint(`/raw/6197`)로 저자 원본 마크다운을 받고 본문의 `upload://` 참조만
> 실제 이미지 URL 로 치환했다. 문장은 손대지 않았다. 원문은 위 `url` 참조.
>
> 저자 주의: 이 글은 원저자가 밝힌 대로 GPT 모델로 정리한 요약이며 원문(Figure AI 블로그)과
> 다를 수 있다. 사실 확인은 [[figure-ai-2025-helix-a-vision-language-action]] 을 기준으로 한다.

---

![Helix: 범용 휴머노이드 제어를 위한 시각-언어-행동(VLA) 모델 (feat. Figure AI)|1028x545](https://discuss.pytorch.kr/uploads/default/original/2X/c/c20eeac33aefbf11b22f0ac152dd3be8336849e9.jpeg)


## Figure AI의 VLAM, Helix 소개

https://videos.ctfassets.net/qx5k8y1u9drj/5FDXDLlij51hccnRIbeVm1/3e62d60c24b5ee9bc0938a77634e1208/Quad_-_1.mp4

작년 초 [OpenAI와의 협업으로 Figure 01을 공개](https://discuss.pytorch.kr/t/figure-openai-figure-01/3760)했던 휴머노이드 개발 기업 Figure AI가 새로운 시각-언어-행동 모델(VLAM, Vision-Language-Action Model) Helix를 공개했습니다. 기존 로봇들은 새로운 작업을 배우기 위해 막대한 양의 시뮬레이션 및 데이터 수집이 필요했지만, 헬릭스는 단 하나의 신경망을 통해 다양한 로봇 행동을 학습하고, 즉각적으로 새로운 물체를 조작할 수 있습니다.

특히, 두 대의 로봇이 동시에 협력하여 새로운 물체를 다루고, 다양한 환경에서 자연어 명령만으로 동작할 수 있다는 점에서 기존 로봇 시스템과 차별화됩니다. 가정 내 로봇 활용을 위한 획기적인 발전을 보여주고 있습니다.

https://videos.ctfassets.net/qx5k8y1u9drj/2a4YQTPs9dnzYKWZQ6c2ni/78812ae00c3232d684e6e5e7ef748a36/VLA_Full_Quality_MASTER_21925A.mp4

Helix는 로봇이 카메라로 관찰한 시각 정보와 인간이 내리는 자연어 명령을 결합하여, 상반신 전체를 자유롭게 조작할 수 있도록 설계되어, 로봇이 전혀 본 적 없는 물체도 자연스럽게 집고 다룰 수 있습니다. 예를 들어, 냉장고 문을 열어 물건을 넣고 닫기 / 서랍을 열어 새로운 물체를 정리하기 / 여러 개의 새로운 물체를 구별하여 원하는 위치에 놓기 / 다른 로봇과 협력하여 가사 작업 수행하기 등의 작업들을 별도의 프로그래밍 없이 단순히 "이 물건을 정리해줘"와 같은 간단한 자연어 명령만으로 수행할 수 있습니다.

![Helix: System 1 / System 2 로 구성된 VLA 모델|1028x360](https://discuss.pytorch.kr/uploads/default/original/2X/f/fdcb1255f31e5ec467f1760b9537a03242ab23d9.jpeg)

Helix는 다음과 같은 두 개의 주요 시스템(S1과 S2)으로 구성되어 있습니다:

1. **시스템 2 (S2)**:  초당 7-9회의 속도로 동작하며, 장면 이해와 자연어 처리를 담당합니다. 인터넷에서 사전 학습된 비전-언어 모델(VLM)을 활용하여 주어진 명령과 환경을 해석합니다.

2. **시스템 1 (S1)**:  초당 200회의 속도로 동작하며, 실제 로봇의 물리적 행동을 결정합니다. S2에서 생성된 의미 표현을 받아 실시간으로 움직임을 조정합니다.

S2가 고수준 목표를 결정하고, S1이 실시간 동작을 수행하는 구조 덕분에, Helix는 정확한 로봇 행동을 빠르게 생성할 수 있습니다.

## Helix의 주요 특징

https://videos.ctfassets.net/qx5k8y1u9drj/5uOKAGkEqDISJXys5zl28i/f354a6ca801cd28966de775be3dfd919/APPLE_VIDEO.mp4

Helix는 기존 로봇 시스템과 차별화되는 다음과 같은 **핵심 기능**을 제공합니다.

1. **상반신 전체 제어**: Helix는 손목, 개별 손가락, 몸통, 머리까지 상반신 전체를 제어할 수 있는 최초의 VLA 모델입니다. 즉, 손가락을 조정하여 물체를 섬세하게 집을 수 있을 뿐만 아니라, 몸통과 머리를 움직여 로봇의 시야와 접근성을 최적화할 수 있습니다.

2. **다중 로봇 협업 (Multi-Robot Collaboration)**: Helix는 두 대의 로봇이 동시에 협력하여 작업을 수행할 수 있도록 설계되었습니다. 예를 들어, 하나의 로봇이 봉지에서 물건을 꺼내 다른 로봇에게 전달하면, 다른 로봇이 이를 적절한 위치에 배치할 수 있습니다. 이는 기존 로봇 시스템에서는 불가능했던 기능이며, 가사 로봇의 실용성을 획기적으로 향상시키는 요소입니다.

https://videos.ctfassets.net/qx5k8y1u9drj/1znVWYCLf4pyMXw76DN8Dn/225d292597c9bee14deb063ba067e240/Cactus.mp4

3. **범용 물체 조작 (Pick Up Anything)**: Helix를 탑재한 로봇은 수천 개의 새로운 물체를 즉각적으로 인식하고 조작할 수 있습니다. 즉, 훈련 데이터에 포함되지 않은 물체도 형태와 특징을 분석하여 적절한 방법으로 집고 이동할 수 있습니다. 예를 들어, 로봇에게 "선인장을 집어줘"라고 명령하면, Helix는 "선인장"이 무엇인지 개념적으로 이해하고, 주변에서 선인장 형태의 물체를 찾아, 적절한 방식으로 집을 수 있습니다.

4. **단일 신경망 (One Neural Network)**: 기존의 로봇 시스템은 특정 작업을 수행할 때마다 개별적으로 학습해야 했습니다. 그러나 Helix는 단 하나의 신경망을 사용하여 모든 행동을 학습하며, 별도의 작업별 미세 조정(fine-tuning) 없이도 다양한 작업을 수행할 수 있습니다.

5. **상업적 활용 가능 (Commercial-Ready)**: Helix는 저전력 임베디드 GPU에서 실행되도록 최적화되어 있으며, 추가적인 하드웨어 비용 없이 바로 상업적 배포가 가능합니다. 즉, 실제 제품으로 활용할 준비가 되어 있는 최초의 VLA 모델이라 할 수 있습니다.

https://videos.ctfassets.net/qx5k8y1u9drj/4wf95VTvc50PrNLOrxqJgD/3b73d98fcc80efa5b25ca6e714ae087c/KETCHUP.mp4

## :scroll: Figure AI의 Helix 모델 공개 블로그

https://www.figure.ai/news/helix

## 더 읽어보기

- https://discuss.pytorch.kr/t/figure-openai-figure-01/3760


<br /><br />

---

*이 글은 GPT 모델로 정리한 글을 바탕으로 한 것으로, 원문의 내용 또는 의도와 다르게 정리된 내용이 있을 수 있습니다. 관심있는 내용이시라면 원문도 함께 참고해주세요! 읽으시면서 어색하거나 잘못된 내용을 발견하시면 덧글로 알려주시기를 부탁드립니다.* 🤗

[:pytorch:파이토치 한국 사용자 모임🇰🇷](https://pytorch.kr/)이 정리한 이 글이 유용하셨나요? [회원으로 가입](https://discuss.pytorch.kr/signup)하시면 주요 글들을 이메일💌로 보내드립니다! (기본은 Weekly지만 [Daily로 변경도 가능](https://discuss.pytorch.kr/my/preferences/emails)합니다.)

 🎁 아래↘️쪽에 좋아요:+1:를 눌러주시면 새로운 소식들을 정리하고 공유하는데 힘이 됩니다~ 🤩

-------------------------

