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

## 한 줄 요약 (One-line Summary)

PyTorch 한국 사용자 모임의 9bow가 Figure AI의 Helix 발표를 한국어로 옮긴 소개 글이다. 원문에는 iframe 안에 있어 수집되지 않던 System 1 / System 2 구조도가 여기에는 이미지로 박혀 있다는 점이 이 자료의 실질적 가치다.

## 1. 자료 정보 (Document Information)

- **제목**: Helix: Figure AI가 공개한 범용 휴머노이드 제어를 위한 시각-언어-행동(VLA) 모델
- **저자**: 9bow (박정환), PyTorch 한국 사용자 모임 운영자
- **발행**: 2025-02-23, https://discuss.pytorch.kr/t/helix-figure-ai-vla/6197
- **성격**: [[figure-ai-2025-helix-a-vision-language-action]]의 한국어 소개. 원문 링크와 데모 영상 5편을 함께 싣는다
- **신뢰도 주의**: 글 끝에 저자가 "GPT 모델로 정리한 글을 바탕으로 한 것으로, 원문의 내용 또는 의도와 다르게 정리된 내용이 있을 수 있습니다"라고 명시한다. 사실 확인은 원문 페이지를 기준으로 한다
- **수집 메모**: `scripts/fetch_article.py`의 chrome tier가 Discourse SPA에서 본문 123자만 얻어 실패했다. Discourse raw endpoint(`/raw/6197`)로 저자 원본 마크다운을 받고 본문의 `upload://` 참조를 실제 이미지 URL로 치환했다. 본문 3,646자

## 2. 주요 기여 (Key Contributions)

새로운 정보를 더하지는 않는다. 원문에 없는 수치나 해석은 하나도 없고, 원문의 다섯 가지 "최초"와 S1/S2 구조를 한국어로 옮긴 것이 전부다.

수집 가치는 다른 데 있다. 첫째, 원문의 System 1 / System 2 구조도가 여기에는 일반 이미지로 들어 있다. 원문 페이지에서는 이 도식이 iframe 안에 있어 자동 수집에 잡히지 않았다. 둘째, 이 글이 Helix를 Figure AI의 이전 발표인 Figure 01(OpenAI 협업)과 이어 놓아 회사의 흐름 안에 위치시킨다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

원문 요약이라 서술은 얕다. S2가 초당 7–9회 돌면서 인터넷에서 pre-training된 VLM으로 장면과 명령을 해석하고, S1이 초당 200회 돌면서 S2가 만든 의미 표현을 받아 실시간으로 움직임을 조정한다는 두 문단이 아키텍처 설명의 전부다. S2가 고수준 목표를 정하고 S1이 실시간 동작을 수행하는 분업 덕에 정확한 동작을 빠르게 낼 수 있다고 정리한다.

원문에 있으나 여기서 빠진 것이 상당하다. 약 500시간이라는 데이터 규모, 7B와 80M이라는 파라미터 분할, 35-DoF action space, hindsight instruction으로 지시문을 사후에 붙인 자동 라벨링, 학습 시점에 넣은 시간 오프셋, 과제 완료 비율을 예측하는 합성 action 차원, 그리고 latent 벡터를 통한 그래디언트 역전파가 모두 언급되지 않는다. 구조를 실제로 파악하려면 원문 쪽을 봐야 한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

원문과 마찬가지로 정량 결과가 없다. 다섯 가지 특징을 나열하는 형식이다. 상반신 전체 제어, 두 로봇의 협업, 처음 보는 물건 수천 개를 즉시 다루는 범용 조작, 과제별 fine-tuning 없이 한 벌의 가중치로 도는 단일 신경망, 그리고 저전력 임베디드 GPU에서 도는 상용 준비 상태다.

한 대목에서 원문보다 세게 나간다. 상용 준비를 설명하며 "추가적인 하드웨어 비용 없이 바로 상업적 배포가 가능합니다"라고 쓰는데, 원문은 저전력 임베디드 GPU에서 온보드로 돈다는 사실과 그래서 상용 배치 준비가 됐다는 서술까지만 하고 하드웨어 비용에 대해서는 아무 말도 하지 않는다. 저자가 밝힌 GPT 정리 과정에서 붙은 살로 보인다.

선인장 사례는 원문과 같다. "선인장을 집어줘"라고 하면 Helix가 선인장이 무엇인지 개념적으로 이해하고 주변에서 그 형태의 물체를 찾아 집는다는 설명이다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

원문의 "1,000배 스케일업" 언급이 빠져 있어 향후 과제에 해당하는 서술은 사실상 없다. 자료 자체의 한계는 저자가 명시한 GPT 경유 정리라는 점이고, 위에서 짚은 하드웨어 비용 대목이 그 위험이 실제로 드러난 예다.

## 6. 관련 연구 (Related Work)

글이 직접 거는 링크는 둘이다. 원문인 Figure AI 블로그, 그리고 같은 커뮤니티의 Figure 01 소개 글(`discuss.pytorch.kr/t/figure-openai-figure-01/3760`)이다. 후자는 아직 이 wiki에 수집되지 않았다.

## 7. 용어집 (Glossary)

- **VLAM**: 이 글이 쓰는 표기. 원문의 VLA(Vision-Language-Action model)와 같은 것을 가리키며 여기서만 M(model)을 붙인다. wiki 본문에서는 VLA로 통일한다.
- **시각-언어-행동 모델**: 제목과 본문에서 VLA를 옮긴 말. 원저자의 표기이므로 인용할 때만 그대로 두고 서술에서는 VLA를 쓴다.

## 8. 그림 후보 (Figure Candidates)

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | Figure AI 발표 페이지 상단 배너 스크린샷 | fetched | (선택 안 함 — 네비게이션이 함께 찍힌 배너) |
| fig02 | System 2 → latent 벡터 → System 1 구조도 | fetched | ★ wiki 권장 (원문에서 못 건진 핵심 도식) |
