---
title: "SONIC: Supersizing Motion Tracking for Natural Humanoid Whole-Body Control (GEAR-SONIC 프로젝트 페이지)"
type: article
year: 2026
category: physical-ai
raw_path: /Users/kmyu/Desktop/project/ai-wiki/raw/articles/nvlabs-2026-gear-sonic-project-page.md
raw_filename: "nvlabs-2026-gear-sonic-project-page.md"
source_collection: external
author: "NVIDIA GEAR Lab"
url: "https://nvlabs.github.io/GEAR-SONIC/"
publisher: "nvlabs.github.io"
fetched_at: "2026-08-03T23:12:02+0900"
extractor_tier: "chrome"
tags: [physical-ai, humanoid, teleoperation]
figures:
  - id: fig01
    file: assets/nvlabs-2026-gear-sonic-project-page/page-full.png
    raw: raw/articles/nvlabs-2026-gear-sonic-project-page-figures/page-full.png
    caption: "프로젝트 페이지 전체 캡처 — 영상 갤러리 구성 (원본 12,837px 중 상단 6,000px)"
    strategy: screenshot
    curated: false
---

## 한 줄 요약 (One-line Summary)

SONIC 논문의 공식 프로젝트 페이지. 텍스트로는 abstract 하나뿐이고 실질 내용은 영상 데모 갤러리라서, 논문이 수치로만 보여주는 "자연스러운 전신 동작"을 눈으로 확인하는 통로로 쓰는 자료다.

## 1. 자료 정보 (Document Information)

- URL: https://nvlabs.github.io/GEAR-SONIC/
- 발행: NVIDIA GEAR Lab (nvlabs.github.io). 페이지에 발행일 표기 없음 — 수집 시점 2026-08-03 상태를 아카이브했다
- 추출 tier: `chrome` (jina는 403). 본문 1,596자, 이미지 후보 0개, 전체 페이지 캡처 1장
- 대응 논문: [[luo-2025-sonic-supersizing-motion-tracking]] (arXiv 2511.07820)
- 대응 코드: [[nvlabs-gr00t-wholebodycontrol]]
- 페이지 안에 인터랙티브 웹 데모(`/demo.html`)로 가는 경로가 있고, repo README에 따르면 이 데모는 Kimodo text-to-motion 생성을 쓴다

## 2. 주요 기여 (Key Contributions)

이 페이지 자체의 기여는 논문과 별개로 없다. 수집된 텍스트는 논문 abstract 전문과 동일하다. 스케일링 3축(파라미터 1.2M–42M, mocap 700시간에서 나온 100M+ 프레임, 21k GPU hours), 실시간 kinematic planner, VR teleoperation과 VLA를 하나의 policy로 받는 통합 token space, 손발 협응이 필요한 자율 loco-manipulation을 언급한다.

자료로서의 값은 다른 데 있다. 논문의 정지 이미지와 MPJPE 수치로는 판단하기 어려운 동작의 질 — 걷기·달리기·기어가기의 매끄러움, 모달리티 전환의 이음새, 페달을 밟으며 균형을 잡는 순간 — 을 영상으로 남긴 곳이 여기다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

페이지에 방법론 서술은 없다. 아키텍처를 확인할 곳은 논문 Figure 7이다 ([[luo-2025-sonic-supersizing-motion-tracking]]의 3절 참조).

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

수치 결과는 페이지에 실려 있지 않다. abstract가 서술로 요약한 두 가지만 확인된다. compute와 데이터 다양성을 늘릴 때 성능이 꾸준히 좋아진다는 것, 학습에 없던 모션으로 policy가 일반화된다는 것이다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

자료 자체의 한계를 기록해 둔다. 이 페이지는 영상 중심이라 `chrome` tier로 렌더해도 텍스트가 1,596자뿐이고, `<img>` 태그 기반 이미지가 0개로 잡혔다(영상 요소가 대부분이라 그렇다). 그래서 figure 후보는 전체 페이지 스크린샷 한 장이 전부다. 특정 데모 장면을 wiki에 넣고 싶으면 영상 프레임을 수동 캡처해 `raw/articles/{stem}-figures/`에 추가하는 편이 낫다.

## 6. 관련 연구 (Related Work)

페이지 상단 링크로 논문(arXiv), 코드(GR00T-WholeBodyControl), 모델(Hugging Face `nvidia/GEAR-SONIC`), 문서 사이트로 갈 수 있다. 세 자료를 함께 보면 논문은 방법과 수치, repo는 실행 가능한 스택, 이 페이지는 동작 품질의 육안 증거를 담당한다.

## 7. 용어집 (Glossary)

- **GEAR**: Generalist Embodied Agent Research. SONIC과 GR00T 계열을 내는 NVIDIA 연구 조직
- **project page**: 논문에 딸린 영상·데모 중심 웹페이지. 정량 결과보다 동작 품질을 보이는 용도

## 8. 그림 후보 (Figure Candidates)

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | 프로젝트 페이지 전체 캡처 (상단 6,000px) | screenshot | (선택) |
