---
title: "Helix: Figure AI가 공개한 범용 휴머노이드 제어를 위한 시각-언어-행동(VLA) 모델"
type: article
year: 2025
category: physical-ai
source: 9bow-2025-helix-generalist-humanoid-vla.md
raw_path: raw/articles/9bow-2025-helix-generalist-humanoid-vla.md
raw_filename: "9bow-2025-helix-generalist-humanoid-vla.md"
source_collection: external
author: "9bow (박정환)"
url: "https://discuss.pytorch.kr/t/helix-figure-ai-vla/6197"
publisher: "PyTorch KR (discuss.pytorch.kr)"
published: "2025-02-23"
tags: [physical-ai, vla, humanoid, manipulation]
figures:
  - id: fig01
    file: assets/9bow-2025-helix-generalist-humanoid-vla/fig01.jpeg
    raw: raw/articles/9bow-2025-helix-generalist-humanoid-vla-figures/fig01.jpeg
    caption: "Figure AI Helix 발표 페이지 상단 배너 (네비게이션 포함 스크린샷)"
    strategy: fetched
    curated: true
  - id: fig02
    file: assets/9bow-2025-helix-generalist-humanoid-vla/fig02.jpeg
    raw: raw/articles/9bow-2025-helix-generalist-humanoid-vla-figures/fig02.jpeg
    caption: "System 2(7B VLM, 7-9Hz) → latent 벡터 → System 1(80M Transformer, 200Hz) 구조도"
    strategy: fetched
    curated: true
---

## 요약 (Summary)

PyTorch 한국 사용자 모임의 9bow가 [[physical-ai/figure-ai-2025-helix-a-vision-language-action|Figure AI의 Helix 발표]]를 한국어로 옮긴 소개 글이다. 발표 사흘 뒤에 올라왔다.

내용은 원문 요약이라 새로 얻을 정보가 없다. 그런데도 이 자료를 따로 수집한 이유는 그림 하나 때문이다. Helix의 System 1 / System 2 구조도가 원문 페이지에서는 iframe 안에 들어 있어 자동 수집에 잡히지 않는데, 이 글에는 평범한 이미지로 박혀 있다.

![[assets/9bow-2025-helix-generalist-humanoid-vla/fig02.jpeg]]
*Helix 구조도: 카메라 이미지와 텍스트 명령, 관절 각도·손가락 위치가 System 2(7B pretrained VLM, GPU 2)로 들어간다. 7-9Hz로 갱신되는 latent 벡터가 System 1(80M Transformer, GPU 1)로 건네지고 200Hz 제어가 나온다*

![[assets/9bow-2025-helix-generalist-humanoid-vla/fig01.jpeg]]
*Figure AI 발표 페이지 상단 배너. 로봇 두 대가 냉장고에 장을 넣는 Video 1 장면이 히어로 이미지로 쓰였다*

## 원문 대비 무엇이 남고 무엇이 빠졌나 (Coverage)

남은 것은 다섯 가지 특징과 S1/S2의 역할 분담이다. 상반신 전체 제어, 두 로봇의 협업, 처음 보는 물건 수천 개를 다루는 범용 조작, 과제별 fine-tuning 없이 도는 단일 신경망, 저전력 임베디드 GPU 위의 상용 준비 상태가 그것이다. S2가 초당 7–9회 돌며 장면과 명령을 해석하고 S1이 초당 200회 돌며 움직임을 조정한다는 서술도 그대로 있다.

빠진 것이 더 많다. 약 500시간이라는 데이터 규모, 7B와 80M이라는 파라미터 분할, 35-DoF action space, hindsight instruction으로 지시문을 사후에 붙인 자동 라벨링, 학습 시점에 넣은 시간 오프셋, 과제 완료 비율을 예측하는 합성 action 차원, latent 벡터를 통한 그래디언트 역전파가 모두 언급되지 않는다. 구조를 실제로 파악하려면 원문 페이지를 봐야 한다.

## 한 대목의 과장 (One Overstatement)

상용 준비 상태를 설명하며 "추가적인 하드웨어 비용 없이 바로 상업적 배포가 가능합니다"라고 쓴다. 원문은 저전력 임베디드 GPU에서 온보드로 돈다는 사실과 그래서 상용 배치 준비가 됐다는 서술까지만 하고, 하드웨어 비용에 대해서는 아무 말도 하지 않는다.

글 끝에 저자가 "GPT 모델로 정리한 글을 바탕으로 한 것으로, 원문의 내용 또는 의도와 다르게 정리된 내용이 있을 수 있습니다"라고 밝혀 두었다. 이 대목이 그 위험이 실제로 드러난 지점으로 보인다. 인용할 일이 있으면 원문 쪽 수치를 쓴다.

## 관련 페이지 (Related Pages)

- [[physical-ai/figure-ai-2025-helix-a-vision-language-action]] — 원문. 데이터 규모·파라미터 분할·학습 방식은 이쪽에만 있다
- [[physical-ai/9bow-2026-physics-aware-generation-world-simulator]] — 같은 저자의 Physical AI 서베이 정리 시리즈
- [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation]] — 한 달 뒤 나온 dual-system VLA. 구조도를 나란히 놓고 보면 분업 방식이 겹친다
- [[overviews/glossary-physical-ai]] — 이 페이지의 전문 용어 canonical 표기
