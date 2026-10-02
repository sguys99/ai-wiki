---
title: "Latent Reasoning VLA: Latent Thinking and Prediction for Vision-Language-Action Models (프로젝트 페이지)"
type: article
year: 2026
category: physical-ai
raw_path: raw/articles/bai-2026-lara-vla-project-page.md
raw_filename: "bai-2026-lara-vla-project-page.md"
source_collection: external
author: "Shuanghao Bai, Jing Lyu et al."
url: "https://loveju1y.github.io/Latent-Reasoning-VLA/"
publisher: "loveju1y.github.io (GitHub Pages)"
fetched_at: "2026-10-02T08:50:53+0900"
extractor_tier: "chrome"
tags: [physical-ai, vla, manipulation, robot-learning]
figures:
  - id: fig01
    file: assets/bai-2026-lara-vla-project-page/fig01.png
    raw: raw/articles/bai-2026-lara-vla-project-page-figures/fig01.png
    caption: "LaRA-VLA 3단계 학습 구조도. Stage I 명시적 CoT와 visual 토큰 alignment, Stage II curriculum 기반 텍스트 latent 교체, Stage III action expert 적응을 보여준다. 논문 Figure 2와 같은 그림의 웹용 원본이며 1666×743"
    strategy: fetched
    curated: true
  - id: fig02
    file: assets/bai-2026-lara-vla-project-page/fig02.png
    raw: raw/articles/bai-2026-lara-vla-project-page-figures/fig02.png
    caption: "LIBERO 네 suite 성공률 비교표 이미지. 논문 Table 2와 같은 내용이며 LaRA-VLA 평균 97.9%다"
    strategy: fetched
    curated: false
  - id: fig03
    file: assets/bai-2026-lara-vla-project-page/fig03.png
    raw: raw/articles/bai-2026-lara-vla-project-page-figures/fig03.png
    caption: "SimplerEnv WidowX 네 과제 성공률 비교표 이미지. 논문 Table 3과 같은 내용이며 LaRA-VLA 평균 68.8%다"
    strategy: fetched
    curated: false
  - id: fig04
    file: assets/bai-2026-lara-vla-project-page/fig04.png
    raw: raw/articles/bai-2026-lara-vla-project-page-figures/fig04.png
    caption: "실제 로봇 과제별 성공률 막대 그래프. 논문 Figure 5와 같은 수치이지만 두 번째 과제 이름이 Sort all fruits가 아니라 Put all fruits로 적혀 있다"
    strategy: fetched
    curated: false
  - id: fig05
    file: assets/bai-2026-lara-vla-project-page/fig05.png
    raw: raw/articles/bai-2026-lara-vla-project-page-figures/fig05.png
    caption: "latent collapse 분석 산점도. 지시문 토큰과 Subtask, Bbox, Motion latent가 분리된 군집을 이룬다. 논문 Figure 6과 같은 그림이다"
    strategy: fetched
    curated: false
  - id: fig06
    file: assets/bai-2026-lara-vla-project-page/fig06.png
    raw: raw/articles/bai-2026-lara-vla-project-page-figures/fig06.png
    caption: "추론 지연 비교 막대 그래프. ThinkAct-7B 7513 ms, ECOT-7B 4434 ms, Fast-ThinkAct-3B 805 ms, LaRA-VLA-4B 135 ms. 논문 Figure 7과 같은 그림이다"
    strategy: fetched
    curated: true
  - id: fig07
    file: assets/bai-2026-lara-vla-project-page/fig07.png
    raw: raw/articles/bai-2026-lara-vla-project-page-figures/fig07.png
    caption: "SimplerEnv CoT 감독 형식 ablation 표 이미지. 논문 Table 4와 같은 내용이다"
    strategy: fetched
    curated: false
  - id: fig08
    file: assets/bai-2026-lara-vla-project-page/page-full.png
    raw: raw/articles/bai-2026-lara-vla-project-page-figures/page-full.png
    caption: "프로젝트 페이지 전체 화면 캡처. 상단 6000px까지만 저장됐다"
    strategy: screenshot
    curated: false
---

## 한 줄 요약 (One-line Summary)

LaRA-VLA 논문(arXiv 2602.01166, ICML 2026)의 GitHub Pages 소개 페이지다. 초록, 3단계 학습 구조도, LIBERO와 SimplerEnv 결과표, 실제 로봇 결과, latent collapse와 추론 지연, ablation을 논문 문장 그대로 요약하고, 논문에 없는 실제 로봇 rollout 영상 8편(LaRA-VLA 4편, GR00T N1.5 4편)을 나란히 싣는다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 제목 | ICML 2026, Latent Reasoning VLA (LaRA-VLA) |
| URL | https://loveju1y.github.io/Latent-Reasoning-VLA/ |
| 저자 | Shuanghao Bai, Jing Lyu(공동 1저자) 외 10명, 교신 Cheng Chi, Badong Chen, Shanghang Zhang |
| 소속 | Xi'an Jiaotong University, BAAI, 중국과학원 자동화연구소와 인공지능학원, Peking University |
| 링크 | 논문 PDF(`static/pdfs/Latent_Reasoning_VLA.pdf`), arXiv 2602.01166, 코드 https://github.com/LoveJu1y/LaRA-VLA |
| 수집 | 2026-10-02 `fetch_article.py` chrome tier, 본문 5,847자, 이미지 7장과 전체 화면 캡처 |
| 발행일 | 페이지 메타데이터의 publication_date(2024-01-01)는 템플릿 기본값으로 보이며 실제 날짜가 아니다. 논문 preprint 날짜는 2026-02-01이다 |

같은 연구의 다른 자료는 논문 [[physical-ai/bai-2026-latent-reasoning-vla-latent-thinking]]과 저장소 [[physical-ai/loveju1y-lara-vla]]다.

## 2. 주요 기여 (Key Contributions)

페이지 자체의 기여는 논문 내용의 웹 요약과 영상 증거다.

- 논문 초록과 Figure 2 설명문, 결과 해석 문장을 그대로 옮겨 연구 전체를 한 화면에 요약한다.
- 논문 그림과 표를 웹용 원본 해상도 이미지로 제공한다 (구조도 1666×743 등).
- 실제 로봇 long-horizon 과제 4종에 대해 LaRA-VLA와 GR00T N1.5의 rollout 영상을 함께 제공한다. 논문은 성공률 막대 그래프만 싣는다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 페이지 구성

| 절 | 내용 | 논문 대응 |
|---|---|---|
| Abstract | 초록 전문 | 초록 |
| 1. Model Architecture | 3단계 학습 구조도와 설명문 | Figure 2와 캡션 |
| 2. Experiments, Simulation | LIBERO 표와 해석, SimplerEnv 표와 해석 | Table 2, Table 3, 4.1절 Results |
| 2. Experiments, Real-world | 성공률 그래프, 해석 문단, LaRA-VLA 영상 4편, GR00T N1.5 영상 4편 | Figure 5, 4.2절 Results |
| 3. Analysis, Latent Collapse | 산점도와 해석 | Figure 6, 4.3절 |
| 3. Analysis, Inference Time | 지연 그래프와 해석 | Figure 7, 4.3절 |
| 3. Analysis, Ablation | ablation 표와 캡션 | Table 4 |

### 3.2 학습 구조 설명문

페이지의 구조도 설명은 논문 Figure 2 캡션과 같다. 학습은 세 단계로 진행된다.

1. 명시적 CoT fine-tuning. visual 예측 latent를 alignment하고 inverse dynamics로 action을 감독한다.
2. curriculum 기반 전환. 명시적 CoT를 간결한 텍스트 latent로 바꾸며 텍스트 토큰 수를 점차 줄이고, latent는 visual과 action 신호로 암묵적으로 감독된다.
3. latent를 조건으로 받은 VLM feature를 action expert에 적응시켜 추론 시 명시적 CoT 없이 action을 생성한다.

### 3.3 페이지에만 있는 자료: 실제 로봇 영상

페이지 HTML(수집 시점)에는 `static/videos/` 아래 mp4 8편이 있다. 본문 텍스트 추출에는 영상 제목이 빠지고 "LaRA-VLA"와 "GR00T N1.5" 소제목만 남는다.

| 모델 | 영상 파일 | 대응 과제 (파일명 기준 추정) |
|---|---|---|
| LaRA-VLA | Pick_Bowls.mp4 | 그릇 두 개 쌓기 |
| LaRA-VLA | Find&Pick_Cube.mp4 | 블록을 찾아 바구니에 넣기 |
| LaRA-VLA | Pick_Fruits.mp4 | 과일을 바구니로 분류하기 |
| LaRA-VLA | Pick_Objects.mp4 | 모든 물체를 바구니에 넣기 |
| GR00T N1.5 | Groot_Bowls.mp4 | 그릇 두 개 쌓기 |
| GR00T N1.5 | Groot_Cube.mp4 | 블록을 찾아 바구니에 넣기 |
| GR00T N1.5 | Groot_Fruits.mp4 | 과일을 바구니로 분류하기 |
| GR00T N1.5 | Groot_Objects.mp4 | 모든 물체를 바구니에 넣기 |

영상은 raw에 저장하지 않았고 내용(성공 여부, 길이)은 확인하지 않았다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

페이지의 수치는 모두 논문과 같다.

| 항목 | 수치 |
|---|---|
| LIBERO 평균 | 97.9% (Object 99.8%, Long 96.6%) |
| SimplerEnv WidowX 평균 | 68.8% |
| 실제 로봇 평균 | ACT 0%, GR00T N1.5 47.9%, LaRA-VLA 56.2% |
| 추론 지연 | rollout당 135 ms, 명시적 CoT 방식 대비 최대 90% 감소 |
| ablation 최고 | Latent Text-CoT와 Latent Vis-CoT 결합 68.75% |

페이지의 실제 로봇 해석 문단은 논문과 같은 "네 과제 모두에서 ACT와 GR00T N1.5를 일관되게 앞선다"이지만, 같은 페이지 그래프에서 모든 물체 넣기 과제는 GR00T N1.5 50.0%, LaRA-VLA 41.6%다. 그래프의 두 번째 과제 이름은 "Put all fruits into the basket"으로 논문 Figure 5의 "Sort all fruits into the basket"과 다르다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- 페이지에는 한계 절이 없다. 논문은 latent 토큰 수 증가 시 collapse 위험(단계당 1개로 제한)과 curriculum의 학습 비용을 한계로 든다.
- 페이지는 데이터 파이프라인(LIBERO-LaRA, Bridge-LaRA)과 학습 손실, attention 구조, 하이퍼파라미터를 다루지 않는다. 이 내용은 논문 페이지에 있다.

## 6. 관련 연구 (Related Work)

- [[physical-ai/bai-2026-latent-reasoning-vla-latent-thinking]]: 같은 연구의 논문. 방법, 데이터, 수치의 정본이다.
- [[physical-ai/loveju1y-lara-vla]]: 같은 연구의 코드 저장소. 학습 스크립트, 설정, 공개 checkpoint와 데이터셋 위치가 있다.
- [[physical-ai/nvidia-2025-gr00t-n1-5-an-improved-open]]: 영상 비교 대상 baseline.
- [[physical-ai/sun-2026-vla-jepa-project-page]]: 같은 시기의 latent 예측 VLA 프로젝트 페이지.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| LaRA-VLA | Latent Reasoning VLA. CoT를 연속 latent로 내재화한 VLA |
| Latent Text-CoT, Latent Vis-CoT | ablation 표의 latent 텍스트 CoT와 latent visual CoT 감독 |
| real-world video | 페이지에만 있는 실제 로봇 rollout 영상. LaRA-VLA와 GR00T N1.5 각 4편 |

## 8. 그림 후보 (Figure Candidates)

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | 3단계 학습 구조도 (논문 Figure 2) | fetched | ★ wiki 권장 (architecture) |
| fig02 | LIBERO 결과표 (논문 Table 2) | fetched | (논문 페이지와 중복) |
| fig03 | SimplerEnv WidowX 결과표 (논문 Table 3) | fetched | (논문 페이지와 중복) |
| fig04 | 실제 로봇 성공률 그래프 (논문 Figure 5) | fetched | (논문 페이지와 중복) |
| fig05 | latent collapse 산점도 (논문 Figure 6) | fetched | (논문 페이지와 중복) |
| fig06 | 추론 지연 그래프 (논문 Figure 7) | fetched | ★ wiki 권장 (result) |
| fig07 | ablation 표 (논문 Table 4) | fetched | (논문 페이지와 중복) |
| fig08 | 전체 화면 캡처 | screenshot | (확인용) |
