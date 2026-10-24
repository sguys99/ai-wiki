---
title: "Flora: An Open Model Suite for Scaling Robotics Data Engines"
type: article
year: 2026
category: physical-ai
raw_path: raw/articles/nvidia-2026-flora-an-open-model-suite.md
raw_filename: "nvidia-2026-flora-an-open-model-suite.md"
source_collection: external
author: "NVIDIA GEAR Lab"
url: "https://research.nvidia.com/labs/gear/flora/"
publisher: "research.nvidia.com"
tags: [physical-ai, robot-dataset, robot-learning, benchmark]
figures:
  - id: fig01
    file: assets/nvidia-2026-flora-an-open-model-suite/page-full.png
    raw: raw/articles/nvidia-2026-flora-an-open-model-suite-figures/page-full.png
    caption: "Flora 프로젝트 페이지 전체 스크린샷. 소개 영상, 초록, Captioning과 Reward Modeling으로 거르는 Explore 영상 타일, Quality vs. Cost 차트, 하루 20만 시간을 내세운 Scale 절, Benchmark Results 표, Timestamped Action Instructions 막대그래프 순서로 구성된다"
    strategy: screenshot
    curated: false
  - id: fig02
    file: assets/nvidia-2026-flora-an-open-model-suite/crop01.png
    raw: raw/articles/nvidia-2026-flora-an-open-model-suite-figures/crop01.png
    caption: "프로젝트 페이지 상단 소개 영상의 첫 화면. 사람과 로봇의 조작 영상 타일 위에 FLORA 제목과 부제가 겹쳐 있다"
    strategy: crop
    curated: false
---

## 한 줄 요약 (One-line Summary)

NVIDIA GEAR 팀이 Flora 논문과 함께 공개한 프로젝트 페이지로, 소개 영상, 초록, 인터랙티브 annotation 예시 타일, 품질 대비 비용 차트, 운영 규모(하루 20만 시간), 벤치마크 결과 표를 한 화면에 모았다. 본문 정보는 논문의 초록과 Table 1을 요약한 수준이며 논문에 없는 새 수치는 없다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 제목 | Flora: An Open Model Suite for Scaling Robotics Data Engines |
| 발행 | NVIDIA GEAR Team, research.nvidia.com/labs/gear/flora/ |
| 발행일 | 2026-10-20 (HTTP Last-Modified 기준) |
| 수집 | 2026-10-24, fetch_article.py jina tier (본문 3,826자) |
| 연결 자료 | 논문 PDF (sources/leng-2026-flora-an-open-model-suite.md), Hugging Face 모델 묶음 |

## 2. 주요 기여 (Key Contributions)

프로젝트 페이지는 논문 내용을 시각 자료 중심으로 재구성한 소개 페이지다. 페이지 구성은 다음과 같다.

| 절 | 내용 |
|---|---|
| 상단 | 저자 목록(공동 1저자 *, 공동 지도 †), Paper (PDF) 버튼과 Models on Hugging Face 버튼, 소개 영상 |
| Abstract | 논문 초록 전문 |
| Explore | All, Captioning, Reward Modeling 필터로 고르는 영상 타일 벽. 타일에 마우스를 올리거나 탭하면 그 영상의 annotation이 보인다 |
| 문구 | "From episodes to internet-scale data.", "Human and robot. The same annotation pipeline." |
| Quality vs. Cost | 논문 Figure 3과 같은 차트. Flora 57.1%를 시간당 $0.72에 표시하고 GPT-6 Astra, Gemini 3.8 Flash, GPT-5.6 Sol, Claude Opus 5, Gemini 3.1 Pro, Claude Sonnet 5를 추론 강도(Min, Mid, Max)별로 찍는다 |
| Scale | "Proven at scale. 200,000 hours per day. Production run, 512 GB300 GPUs" |
| Benchmark Results | 논문 Table 1을 줄인 표. Gemini 3.8 Flash와 Qwen3.5-397B-A17B 열이 빠지고 Flora, GPT-6 Astra, GPT-5.6 Sol, Claude Opus 5, Kimi K3 다섯 열만 남는다 |
| Timestamped Action Instructions | DenseCaptionBench Human joint F1, Robot joint F1, WGO-Bench joint F1을 탭으로 바꿔 보는 막대그래프 |
| BibTeX | `leng2026flora` 인용 블록 |

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

방법론 설명은 페이지에 없고 초록만 있다. 초록이 정리하는 문제와 해법은 다음과 같다.

- 로봇 foundation model의 수명 주기는 데이터 라벨에 크게 의존한다.
- outcome reward 라벨은 실세계 배포 모니터링에, process reward 라벨은 강화학습 post-training에, timestamped caption은 pre-training 데이터의 필터링과 균형 조정에 필요하다.
- Flora는 이 세 가지를 함께 다루는 산업용 data engine이며 GR00T 모델 학습에 쓰였다.

세부 방법(겹치는 window segmentation과 stitching, 맥락형 captioning, 단일 reward 모델의 세 인터페이스, SFT와 GRPO 학습)은 논문 sources에 정리되어 있다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

페이지의 Benchmark Results 표(모든 값 ×100)는 논문 Table 1의 일부와 같다.

| 지표 | Flora | GPT-6 Astra | GPT-5.6 Sol | Claude Opus 5 | Kimi K3 |
|---|---|---|---|---|---|
| DCB Human100 Segmentation F1@0.5 | 54.6 | 44.2 | 32.6 | 22.7 | 21.1 |
| DCB Human100 Caption point quality | 66.5 | 60.3 | 36.4 | 31.0 | 30.3 |
| DCB Human100 Joint point F1@0.5 | 37.4 | 29.7 | 14.6 | 8.2 | 7.9 |
| DCB Robot200 Segmentation F1@0.5 | 66.9 | 71.9 | 45.8 | 45.9 | 41.2 |
| DCB Robot200 Caption point quality | 73.7 | 80.2 | 69.6 | 49.7 | 48.0 |
| DCB Robot200 Joint point F1@0.5 | 51.0 | 57.9 | 33.6 | 23.6 | 22.2 |
| WGO Segmentation F1@0.75 | 50.3 | 46.0 | 33.7 | 25.5 | 26.1 |
| WGO Gold-window accuracy | 64.7 | 77.4 | 56.6 | 49.3 | 50.6 |
| WGO Joint semantic F1@0.75 | 34.5 | 39.0 | 24.6 | 15.4 | 16.7 |
| RoboReward MAE ↓ | 40.0 | 55.4 | 78.0 | 88.2 | 68.2 |
| Robometer OOD Kendall | 72.0 | 82.3 | 64.2 | 63.1 | 63.5 |
| Robometer ID VOC | 98.9 | 98.9 | 97.1 | 91.8 | 97.2 |
| Robometer OOD VOC | 99.6 | 99.7 | 99.3 | 98.6 | 99.7 |
| DenseReward Macro F1 | 46.2 | 40.7 | 36.3 | 33.9 | 31.2 |
| DenseReward Balanced accuracy | 54.2 | 44.1 | 37.8 | 35.1 | 32.3 |
| DenseReward Bad-action F1 | 47.7 | 44.8 | 26.4 | 22.9 | 17.6 |
| DenseReward Failure recall | 53.3 | 0.0 | 1.0 | 0.3 | 0.3 |
| RubricBench Pooled L1 error ↓ | 6.5 | 3.6 | 8.4 | 17.1 | 15.6 |

(DCB는 DenseCaptionBench)

페이지 범례는 Flora, 독점(proprietary) 모델, open-weight 모델, 전문 reward 모델 네 그룹을 색으로 구분한다. 초록이 강조하는 수치는 GPT-6 Astra 대비 약 125배 낮은 비용과 GB300 512장에서 하루 20만 시간 라벨링이다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- 페이지는 홍보용 요약이라 한계를 다루지 않는다. 비교 조건 불일치, judge 자기 선호, 미측정 항목 같은 한계는 논문 부록에만 있다.
- jina tier로 수집한 본문에는 Explore 타일의 annotation 텍스트와 소개 영상 내용이 들어 있지 않다(JS로 동작하는 요소). 영상은 `assets/video/flora.mp4` 경로로만 기록된다.
- 향후 방향은 초록과 같다. 오픈소스 공개로 자체 로봇 데이터셋 확장과 physical auto-research, human-to-robot transfer 탐색을 기대한다.

## 6. 관련 연구 (Related Work)

페이지는 별도 관련 연구 절이 없다. 감사 문구에 Cristaldo Campos, Omar Laymoun, Anita Agasaveeran, Marina Davila, Jenna Diamond와 NVIDIA 커뮤니티가 언급된다.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| Explore | annotation 결과를 영상 타일 위에 띄워 보여 주는 페이지의 인터랙티브 절 |
| Quality vs. Cost | 원본 영상 1시간당 비용과 평균 annotation 품질을 비교한 차트 |
| Production run | GB300 512장으로 하루 20만 시간 분량을 라벨링하는 실제 운영 구성 |

## 8. 그림 후보 (Figure Candidates)

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | "Flora 프로젝트 페이지 전체 스크린샷" | screenshot | (보관) 논문 Figure 3과 Table 1이 같은 정보를 더 선명하게 담는다 |
| fig02 | "프로젝트 페이지 상단 소개 영상의 첫 화면" | crop | (보관) 정보량이 적다 |
