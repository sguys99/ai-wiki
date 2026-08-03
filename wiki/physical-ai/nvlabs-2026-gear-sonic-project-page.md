---
title: "GEAR-SONIC 프로젝트 페이지 (SONIC 공식 데모)"
type: article
year: 2026
category: physical-ai
source: nvlabs-2026-gear-sonic-project-page.md
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

## 요약 (Summary)

SONIC 논문의 공식 프로젝트 페이지. 텍스트로 남는 건 논문 abstract 하나뿐이고 실질 내용은 영상 데모 갤러리다. 그래서 이 페이지의 값은 서술이 아니라 화면에 있다. MPJPE 22.3mm이라는 숫자가 실제로 어떤 걸음걸이인지, 모달리티를 갈아탈 때 이음새가 보이는지, 페달을 밟으며 다른 발로 균형을 잡는 순간이 어떻게 생겼는지는 영상으로만 확인된다.

페이지 안에 브라우저용 인터랙티브 데모(`/demo.html`)로 가는 경로가 있다. repo README에 따르면 이 데모는 Kimodo text-to-motion 생성을 쓴다.

## 이 페이지에서 확인되는 것 (What the Page Shows)

abstract가 서술로 요약한 항목은 논문 쪽과 같다. 스케일링 3축(파라미터 1.2M–42M, mocap 700시간에서 나온 100M+ 프레임, 21k GPU hours), 실시간 kinematic planner, VR teleoperation과 VLA를 하나의 정책으로 받는 통합 token space, 손발 협응이 필요한 자율 loco-manipulation이다. 성능 곡선이나 표는 실려 있지 않다.

정량 근거를 찾을 곳은 [[physical-ai/luo-2025-sonic-supersizing-motion-tracking]]이고, 실행 코드는 [[physical-ai/nvlabs-gr00t-wholebodycontrol]]이다. 세 자료를 함께 보면 역할이 갈린다. 논문이 방법과 수치, repo가 실행 가능한 스택, 이 페이지가 동작 품질의 육안 증거다.

## 자료로서의 제약 (Collection Notes)

수집 기록을 남겨 둔다. jina tier는 403으로 막혀 `chrome` tier로 렌더했고, 그렇게 해도 텍스트는 1,596자에 그친다. `<img>` 태그 기반 이미지는 0개로 잡혔다 — 페이지 요소가 대부분 영상이라 그렇다. 그래서 figure 후보는 전체 페이지 스크린샷 한 장(원본 12,837px 중 상단 6,000px)이 전부이고, 정보량이 낮아 wiki 본문에는 임베드하지 않았다. `curated: false`로 아카이브에는 남아 있으니 나중에 재선택할 수 있다.

특정 데모 장면을 wiki에 넣고 싶으면 영상 프레임을 수동 캡처해 `raw/articles/nvlabs-2026-gear-sonic-project-page-figures/`에 추가하고 `strategy: manual`로 표기하는 편이 낫다.

발행일 표기가 없어 `year`는 수집 시점(2026-08-03) 상태를 기준으로 2026을 넣었다. 대응 논문은 arXiv 2511.07820으로 BibTeX 상 2025년이다 — 세 자료의 `year`가 갈리는 이유가 여기 있다.

## 관련 페이지 (Related Pages)

- [[physical-ai/luo-2025-sonic-supersizing-motion-tracking]] — 이 페이지가 소개하는 논문. 방법론·스케일링 곡선·sim2real·VLA 성공률
- [[physical-ai/nvlabs-gr00t-wholebodycontrol]] — 학습·배포 코드와 체크포인트
- [[overviews/physical-ai-overview]] — physical-ai 카테고리 허브
