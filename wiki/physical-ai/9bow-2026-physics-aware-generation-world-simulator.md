---
title: "Physical AI 연구 한 번에 살펴보기 2편: 물리를 이해하는 생성 모델과 월드 시뮬레이터"
type: article
year: 2026
category: physical-ai
raw_path: /home/sguys99/project/ai-wiki/raw/articles/9bow-2026-physics-aware-generation-world-simulator.md
raw_filename: "9bow-2026-physics-aware-generation-world-simulator.md"
source_collection: external
source: 9bow-2026-physics-aware-generation-world-simulator.md
author: "9bow (박정환)"
url: "https://discuss.pytorch.kr/t/physical-ai-2/10771"
publisher: "PyTorch KR (discuss.pytorch.kr)"
published: "2026-06-19"
tags: [physical-ai, world-model, simulator, benchmark]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/9bow-2026-physics-aware-generation-world-simulator/fig01.jpg
    raw: raw/articles/9bow-2026-physics-aware-generation-world-simulator-figures/fig01.jpg
    caption: "글 대표 이미지 — 이미지·영상·3D 생성에서 물리 인지 생성과 물리 시뮬레이션을 거쳐 world simulator로 나아가는 흐름"
    strategy: fetched
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/9bow-2026-physics-aware-generation-world-simulator/fig02.png
    raw: raw/articles/9bow-2026-physics-aware-generation-world-simulator-figures/fig02.png
    caption: "논문 Figure 1 재수록 — 생성 AI가 상호작용성과 물리 인지 생성을 얻어 world model로 수렴하는 개념도"
    strategy: fetched
    curated: false
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/9bow-2026-physics-aware-generation-world-simulator/fig03.jpg
    raw: raw/articles/9bow-2026-physics-aware-generation-world-simulator-figures/fig03.jpg
    caption: "논문 Figure 4 재수록 — 물리 재료·시뮬레이션 기법·물리 엔진 3축"
    strategy: fetched
    curated: false
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/9bow-2026-physics-aware-generation-world-simulator/fig04.jpg
    raw: raw/articles/9bow-2026-physics-aware-generation-world-simulator-figures/fig04.jpg
    caption: "논문 Figure 3 재수록 — PAG-E 여섯 패러다임 배선도"
    strategy: fetched
    curated: false
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/9bow-2026-physics-aware-generation-world-simulator/fig05.jpg
    raw: raw/articles/9bow-2026-physics-aware-generation-world-simulator-figures/fig05.jpg
    caption: "논문 Figure 2 재수록 — 물리 인지가 나쁜 영상과 좋은 영상 대조"
    strategy: fetched
    curated: false
---

## 요약 (Summary)

PyTorch 한국 사용자 모임이 Physical AI 서베이 두 편을 묶어 소개하는 시리즈의 2편이다. 다루는 논문은 Liu 2025의 "Generative Physical AI in Vision: A Survey"(arXiv 2501.10928) 한 편이다. 그 서베이 골격을 거의 그대로 따라가며 한글로 풀어 쓴다. 분량은 약 16,600자, 논문 도식 4종을 재수록했다.

![[assets/9bow-2026-physics-aware-generation-world-simulator/fig01.jpg]]
*글 대표 이미지: 이미지·영상·3D 생성에서 물리 인지 생성과 물리 시뮬레이션을 거쳐 world simulator로 나아가는 흐름 (9bow 2026)*

논문 내용 자체는 [[physical-ai/liu-2025-generative-physical-ai-in-vision]]에 정리돼 있다. 이 페이지는 해설 글이 원문에 더한 것과 이 wiki 표기와 어긋나는 지점만 남긴다.

## 이 글이 더한 것 (What the Article Adds)

1편은 Zhang 2026 Physical AI 서베이를 다루며 "LLM의 world 지식 → grounding → action → 예측과 시뮬레이션 → embodied 배포" 로드맵을 그렸다. 이 글은 Liu 2025를 그 로드맵의 예측·시뮬레이션 칸에 배치한다. 생성 모델 관점에서 그 칸을 확대한 작업이라고 본다. 두 서베이를 잇는 이 독법은 원 논문에 없는 부분이다.

Table 1을 한글 표로 옮긴 뒤 두 문장을 덧붙였다. PAG-E와 PAG-I는 "명시적 물리 모델" 한 행에서만 갈리고 "물리 세계 이해" 행은 둘 다 참이다. PUG는 물리 입출력도 명시적 모델도 없다. 표만 봐서는 놓치기 쉬운 대목이다.

**Gaussian Splatting이 왜 시뮬레이션과 붙는가.** 장면을 입자처럼 다루는 표현이라 물리 시뮬레이션과 결합이 자연스럽다. 그래서 PAG-E의 상당수가 Gaussian을 시뮬레이션 요소로 재해석한다고 한 문단으로 설명한다. 논문은 NeRF와 Gaussian Splatting을 넓은 의미의 생성 모델에 포함시키기만 하고 그 이유는 길게 다루지 않는다.

배경 지식으로는 diffusion model 계보를 DDIM·DPM-Solver 같은 가속 샘플러, latent diffusion, classifier-free guidance까지 넓혀 적었다. PAG-E 대표 방법마다 arXiv 링크를 걸어 둔 것도 논문을 따라 읽을 때 편하다.

모델과 데이터셋을 키워도 분포 밖 물리 일반화는 나아지지 않았고 모델은 비슷한 학습 예시가 있는지에 의존한다. Kang 등의 이 발견을 "더 많은 데이터가 곧 더 나은 물리 이해는 아니다"라는 한 줄로 정리한다.

## 수치 대조 (Numbers Checked Against the Paper)

이 글이 옮긴 수치를 논문 원문과 대조했다. 어긋나는 항목은 없었다.

| 항목 | 값 | 논문 위치 |
|---|---|---|
| Cosmos-Reason1 온톨로지 | 3개 대분류 · 16개 세부 범주 | Table 3, p.12 |
| Cosmos-Reason1 문항 | 이진 2,828 + 객관식 2,909 = 5,737, 그중 604개가 영상 426편과 연결 | §5.7 |
| WISA-32K | 영상 약 32,000편 · 물리 현상 17종 | §6.1.1 |
| PISA | 실제 361편 + Kubric 합성 60편 | §5.7 |
| PhyBench | 프롬프트 700 · 시나리오 31 · 4개 유형 | §6.1.1 |
| PhyGenBench | 프롬프트 160 · 물리 법칙 27 | §6.1.1 |
| VideoPhy / VideoPhy2 | 캡션 688 · 모델 12종 / 행동 197종 · 프롬프트 3,940 · 5점 리커트 | §6.1.1 |
| Physics-IQ | 실세계 영상 396편 · 이후 5초 예측 | §6.1.2 |
| PhyCoBench | 7개 범주 · 프롬프트 120 | §6.1.2 |

평가 지표를 사람 평가, VLM 기반 평가, 자동 정량 평가 셋으로 나눈 구성도 논문 6.2절 그대로다.

## 빠진 것과 표기 차이 (Gaps and Notation)

논문 Table 2의 PAG-E 방법 38편 요약표는 옮기지 않았다. 방법별 물리 엔진과 파라미터 취득 경로를 한눈에 보려면 논문 쪽 표를 봐야 한다. 향후 방향 여섯 갈래도 한 문단에 압축돼 있어 각 방향의 근거는 대부분 생략됐다.

글 말미에 "GPT 모델로 정리한 글을 바탕으로 한 것"이라는 저자 고지가 붙어 있다. 대조한 범위에서 사실 오류는 없었지만 원문 확인을 권하는 저자 의도는 그대로 존중한다.

표기는 이 wiki 규칙과 다르다. 인용할 때는 오른쪽으로 옮겨 적는다.

| 글의 표기 | 이 wiki 표기 |
|---|---|
| 월드 모델 / 월드 시뮬레이터 | world model / world simulator <!-- lint-terms: ignore 표기 대응표라 왼쪽 열은 원문 표기 그대로 둔다 --> |
| 물리 인지 생성 | physics-aware generation (PAG) |
| 점수 증류 샘플링 | score distillation sampling <!-- lint-terms: ignore 표기 대응표라 왼쪽 열은 원문 표기 그대로 둔다 --> |
| 물질점 방법 | Material Point Method (MPM) |
| 가우시안 스플래팅 | Gaussian Splatting |
| 체화 AI | embodied AI |

## 관련 페이지 (Related Pages)

- [[physical-ai/liu-2025-generative-physical-ai-in-vision]] — 이 글이 다루는 논문. 도식과 벤치마크 표는 그쪽이 원본이다
- [[physical-ai/li-2025-a-comprehensive-survey-on-world]] — world model 서베이
- [[overviews/physical-ai-overview]] — 도메인 허브
