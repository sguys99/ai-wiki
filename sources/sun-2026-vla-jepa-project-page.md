---
title: "VLA-JEPA: Enhancing Vision-Language-Action Model with Latent World Model (프로젝트 페이지)"
type: article
year: 2026
category: physical-ai
raw_path: raw/articles/sun-2026-vla-jepa-project-page.md
raw_filename: "sun-2026-vla-jepa-project-page.md"
source_collection: external
author: "Jingwen Sun"
url: "https://ginwind.github.io/VLA-JEPA/"
publisher: "ginwind.github.io (GitHub Pages)"
fetched_at: "2026-09-17T21:41:31+0900"
extractor_tier: "chrome"
tags: [physical-ai, vla, world-model, robot-learning, manipulation]
figures:
  - id: fig01
    file: assets/sun-2026-vla-jepa-project-page/fig01.png
    raw: raw/articles/sun-2026-vla-jepa-project-page-figures/fig01.png
    caption: "티저 도식. 현재 프레임을 받은 V-JEPA 인코더와 VLA, 미래 프레임을 받은 V-JEPA 인코더가 나란히 있고, VLA의 latent action과 현재 latent를 projector가 받아 다음 latent를 예측한다. 논문 Figure 1과 같은 그림이며 1588×942"
    strategy: fetched
    curated: false
  - id: fig02
    file: assets/sun-2026-vla-jepa-project-page/fig02.png
    raw: raw/articles/sun-2026-vla-jepa-project-page-figures/fig02.png
    caption: "VLA-JEPA 프레임워크 도식. 위쪽은 사람 영상 pre-training으로 latent world model의 alignment 손실만 학습하고, 아래쪽은 로봇 데이터 fine-tuning으로 alignment 손실과 action head의 prediction 손실을 함께 학습한다. 논문 Figure 2의 웹용 원본이며 4760×2676"
    strategy: fetched
    curated: true
  - id: fig03
    file: assets/sun-2026-vla-jepa-project-page/fig03.png
    raw: raw/articles/sun-2026-vla-jepa-project-page-figures/fig03.png
    caption: "latent action 토큰의 attention 가중치 시각화. 행은 VLA-JEPA, LAPA, UniVLA이고 열은 LIBERO, LIBERO-Plus, 사람 영상 2종, 실제 로봇 3인칭과 손목 시점이다. 논문 Figure 6의 웹용 원본이며 3148×1576"
    strategy: fetched
    curated: true
  - id: fig04
    file: assets/sun-2026-vla-jepa-project-page/fig04.png
    raw: raw/articles/sun-2026-vla-jepa-project-page-figures/fig04.png
    caption: "평가 환경 장면 모음. LIBERO, LIBERO-Plus, SimplerEnv Google Robot, SimplerEnv WidowX Robot, 실제 Franka 로봇. 논문 Figure 3과 같은 그림이며 2466×1542"
    strategy: fetched
    curated: false
  - id: fig05
    file: assets/sun-2026-vla-jepa-project-page/fig05.png
    raw: raw/articles/sun-2026-vla-jepa-project-page-figures/fig05.png
    caption: "사람 영상 비율에 따른 LIBERO-Plus perturbation 항목별 성공률 꺾은선 그래프. 논문 Figure 5와 같은 그림이며 680×428"
    strategy: fetched
    curated: false
  - id: fig06
    file: assets/sun-2026-vla-jepa-project-page/fig06.png
    raw: raw/articles/sun-2026-vla-jepa-project-page-figures/fig06.png
    caption: "실제 로봇 성공률 막대 그래프. in-distribution, task OOD, object layout OOD에서 π0, π0.5, VLA-JEPA를 비교한다. 논문 Figure 4와 같은 그림이며 1275×750"
    strategy: fetched
    curated: false
  - id: fig07
    file: assets/sun-2026-vla-jepa-project-page/page-full.png
    raw: raw/articles/sun-2026-vla-jepa-project-page-figures/page-full.png
    caption: "전체 페이지 스크린샷. 원본 높이 9622px 중 상단 6000px. 제목과 저자, 링크 배지, 초록, 실제 로봇 시연 영상 4편, 티저 도식, Highlights, 프레임워크 도식, attention 시각화, 평가 환경, LIBERO 표까지 담겼다"
    strategy: screenshot
    curated: false
---

## 한 줄 요약 (One-line Summary)

VLA-JEPA 논문의 공식 프로젝트 페이지로, 초록과 Highlights, 도식 6장, 실제 로봇 시연 영상, 논문의 결과 표 4개를 한 화면에 모은 소개 페이지이며 논문에 없는 새 수치는 없다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 제목 | VLA-JEPA: Enhancing Vision-Language-Action Model with Latent World Model |
| 저자 | Jingwen Sun과 Wenyao Zhang 공동 1저자 외 7인, 교신 Xin Jin과 Zhibo Chen |
| 소속 | University of Science and Technology of China, Zhongguancun Academy, Shanghai Jiao Tong University, Tsinghua University, Eastern Institute of Technology, University of Chinese Academy of Sciences, Nankai University |
| URL | https://ginwind.github.io/VLA-JEPA/ |
| 논문 링크 | arXiv 2602.10098 |
| 코드 | https://github.com/ginwind/VLA-JEPA |
| 가중치 | Hugging Face ginwind/VLA-JEPA |
| 구성 | 저자 정보와 배지 3개(arXiv, Code, Hugging Face), 초록, 실제 로봇 시연 영상, 티저 도식, Highlights, 프레임워크 도식, 기존 VLA와의 비교, 평가 환경, LIBERO 표, SimplerEnv 표, LIBERO-Plus 표, 사람 영상 비율 그래프, 실제 로봇 결과, 2×3 시연 영상 격자, 영상 horizon ablation 표 |
| 발행일 | 페이지에 표기 없음 (논문은 2026년 2월) |
| 수집 tier | chrome (jina는 403). 본문 7,820자, 이미지 6장 |

## 2. 주요 기여 (Key Contributions)

페이지가 전달하는 내용은 논문의 초록, 세 가지 Highlights, 대표 도식, 결과 표다. 페이지 고유의 자료는 실제 로봇 시연 영상과 웹용 고해상도 도식이다.

1. **실제 로봇 시연 영상.** 초록 바로 아래에 in-distribution 평가 영상 2편과 out-of-distribution 평가 영상 2편이 있다. 실제 로봇 결과 절 아래에는 π0, π0.5, VLA-JEPA를 열로 둔 2×3 시연 영상 격자가 있으며, 페이지는 fine-tuning 데이터에 반복 grasping이 없는데도 VLA-JEPA가 이를 익혔고 π0와 π0.5에서는 관찰되지 않았다고 적는다.
2. **고해상도 도식.** 프레임워크 도식이 4760×2676, attention 시각화가 3148×1576, 평가 환경이 2466×1542로 논문 PDF 크롭보다 크다.
3. **결과 표 4개.** LIBERO, SimplerEnv, LIBERO-Plus, 영상 horizon ablation 표를 싣는다. 수치는 논문과 같고 일부 행이 생략됐다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

페이지의 방법 설명은 초록, 티저 캡션, Highlights, 프레임워크 캡션, 비교 절의 다섯 곳에 나뉘어 있다.

### 3.1 초록

인터넷 규모 영상으로 VLA policy를 pre-training하는 것은 매력적이지만 현재의 latent action 목적 함수는 action과 관련된 상태 전이가 아니라 픽셀 변화에 묶여 있어 외형 편향, 과제와 무관한 움직임, 정보 누출에 취약하다는 문제 제기로 시작한다. VLA-JEPA는 이 함정을 설계로 피하는 JEPA 방식 pre-training 프레임워크다.

핵심 아이디어는 leakage-free state prediction이다. 목표 인코더가 미래 프레임에서 latent 표현을 만들고 학생 경로는 현재 observation만 보며, 미래 정보는 감독 목표로만 쓰이고 입력으로는 쓰이지 않는다. 픽셀 공간이 아니라 latent 공간에서 예측하므로 카메라 움직임과 무관한 배경 변화에 robust한 dynamics 추상화를 배운다. 결과는 JEPA pre-training 뒤 action head fine-tuning의 간단한 두 단계 레시피다.

초록의 마지막 문장은 "sample efficiency and generalization"에서 일관된 이득을 말한다. arXiv v2 초록은 같은 자리에 "generalization and robustness"라고 적어 표현이 다르다.

### 3.2 티저 캡션

티저 도식 아래 캡션은 논문 서론의 구조 설명을 옮긴 것이다. 목표 인코더가 미래 프레임에서 latent 목표를 만들고, 학생 경로는 VLM backbone을 통해 현재 observation만 보며, 예측기가 과거 latent 상태와 latent action 표현을 미래 latent 상태로 사상하고 이를 JEPA alignment 손실로 latent world model로서 학습한다는 내용이다. 미래 프레임은 VLM backbone의 입력으로 절대 주어지지 않고 학습 목표를 만드는 데만 쓰인다.

### 3.3 Highlights

| 번호 | 내용 |
|---|---|
| 1 | 많은 latent action pre-training 목적 함수가 픽셀에 묶여 외형 편향, 과제와 무관한 움직임, 미래 문맥이 학습기에 들어올 때의 정보 누출에 취약한 이유를 분석했다 |
| 2 | 미래 latent 상태를 예측하고 맞추는 JEPA 방식 latent predictive alignment로 action 관련 전이 의미를 배운다. 픽셀 재구성과 정보 누출이 없고 pre-training이 한 단계다 |
| 3 | LIBERO, LIBERO-Plus, SimplerEnv와 실제 환경에서 sample efficiency, robustness, 일반화가 일관되게 개선되며 기존 다단계 latent action 파이프라인보다 학습이 단순하다 |

### 3.4 프레임워크 캡션

VLM backbone에 학습 가능한 latent action 토큰을 둔다. action 라벨이 없는 사람 영상에서는 V-JEPA2 인코더를 쓰는 world model 기반 상태 전이 목적 함수로 latent action을 뽑는다. 로봇 시연 데이터(demonstration)에서는 flow matching action head가 end-effector trajectory를 생성한다. fine-tuning에서는 두 목적 함수를 함께 최적화해 학습된 상태 전이 dynamics를 downstream 로봇 제어에 활용한다.

### 3.5 기존 VLA와의 비교

기존 latent action 파이프라인의 네 가지 실패 유형을 한 문장으로 요약한다. 외형에 편향된 픽셀 수준 목적 함수, 실제 영상에서 증폭되는 잡음 움직임, latent action 붕괴를 부르는 정보 누출, 취약한 다단계 학습 파이프라인이다. 페이지는 VLA-JEPA가 이 모두를 설계로 해결한다고 적는다.

attention 시각화 캡션은 세 모델의 차이를 요약한다. LAPA의 latent action은 과제와 무관한 세부까지 포함하는 지나치게 조밀한 시각 정보에 집중하고, UniVLA는 의미를 과도하게 강조해 무관한 배경 요소를 보며, VLA-JEPA는 로봇 팔, 손, 조작 대상에 정확히 집중한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 LIBERO

페이지는 VLA-JEPA가 최고 평균 성공률로 LIBERO 최고 성능을 냈으며 방대한 로봇 데이터로 pre-training한 방법들을 앞섰다고 적는다. 표는 논문 Table 1에서 사람 영상 제외 행을 뺀 11행이다.

| 방법 | Spatial | Object | Goal | LIBERO-10 | 평균 |
|---|---|---|---|---|---|
| LAPA | 73.8 | 74.6 | 58.8 | 55.4 | 65.7 |
| UniVLA | 96.5 | 96.8 | 95.6 | 92.0 | 95.2 |
| OpenVLA-OFT | 97.6 | 98.4 | 97.9 | 94.5 | 97.1 |
| π0 | 96.8 | 98.8 | 95.8 | 85.2 | 94.2 |
| π0-Fast | 96.4 | 96.8 | 88.6 | 60.2 | 85.5 |
| CoT-VLA | 87.5 | 91.6 | 87.6 | 69.0 | 81.1 |
| WorldVLA | 87.6 | 96.2 | 83.4 | 60.0 | 81.8 |
| villa-X | 97.5 | 97.0 | 91.5 | 74.5 | 90.1 |
| GR00T N1 | 94.4 | 97.6 | 93.0 | 90.6 | 93.9 |
| π0.5 | 98.8 | 98.2 | 98.0 | 92.4 | 96.9 |
| VLA-JEPA (ours) | 96.2 | 99.6 | 97.2 | 95.8 | 97.2 |

### 4.2 SimplerEnv

페이지는 Google Robot에서 최고 평균, WidowX Robot에서 경쟁력 있는 결과를 냈으며 villa-X 같은 방법 대비 1% 미만의 학습 데이터를 썼다고 적는다. 표는 논문 Table 2에서 UniVLA, GR00T N1, MoTo, OpenVLA-OFT, 사람 영상 제외 행을 뺀 6행이다.

| 방법 | Google Pick | Google Move | Google Drawer | Google Place | Google 평균 | WidowX Spoon | WidowX Carrot | WidowX Block | WidowX Eggplant | WidowX 평균 |
|---|---|---|---|---|---|---|---|---|---|---|
| LAPA* | - | - | - | - | - | 70.8 | 45.8 | 54.2 | 58.3 | 57.3 |
| villa-X | 81.7 | 55.4 | 38.4 | 4.2 | 44.9 | 48.3 | 24.2 | 19.2 | 71.7 | 40.8 |
| RoboVLMs | 77.3 | 61.7 | 43.5 | 24.1 | 51.7 | 45.8 | 20.8 | 4.2 | 79.2 | 37.5 |
| π0 | 72.7 | 65.3 | 38.3 | - | - | 29.1 | 0 | 16.6 | 62.5 | 40.1 |
| π0-Fast | 75.3 | 67.5 | 42.9 | - | - | 29.1 | 21.9 | 10.8 | 66.7 | 48.3 |
| VLA-JEPA (ours) | 88.3 | 64.1 | 59.3 | 49.1 | 65.2 | 75.0 | 70.8 | 12.5 | 70.8 | 57.3 |

### 4.3 LIBERO-Plus

페이지는 7개 perturbation 중 5개에서 최고이며 Language, Light, Background, Layout에서 큰 우위를 보여 latent action이 과제와 무관한 교란을 처리한다는 점을 확인했다고 적는다. 표는 논문 Table 3에서 사람 영상 제외 행을 뺀 6행이다.

| 방법 | Camera | Robot | Language | Light | Background | Noise | Layout | 평균 |
|---|---|---|---|---|---|---|---|---|
| UniVLA | 1.8 | 46.2 | 69.6 | 69.0 | 81.0 | 21.2 | 31.9 | 42.9 |
| OpenVLA-OFT | 56.4 | 31.9 | 79.5 | 88.7 | 93.3 | 75.8 | 74.2 | 69.6 |
| π0 | 13.8 | 6.0 | 58.8 | 85.0 | 81.4 | 79.0 | 68.9 | 53.6 |
| π0-Fast | 65.1 | 21.6 | 61.0 | 73.2 | 73.2 | 74.4 | 68.8 | 61.6 |
| WorldVLA | 0.1 | 27.9 | 41.6 | 43.7 | 17.1 | 10.9 | 38.0 | 25.0 |
| VLA-JEPA (ours) | 63.3 | 67.1 | 85.4 | 95.6 | 93.6 | 66.3 | 85.1 | 79.5 |

### 4.4 사람 영상의 효과

사람 영상 데이터는 새 action 실행 능력을 더하는 것이 아니라 기존 skill 목록을 강화해 VLA 모델의 robustness와 안정성을 높이며, 사람 영상 규모가 커질수록 policy의 robustness가 일관되게 개선된다고 적는다. 그래프는 논문 Figure 5와 같다.

### 4.5 실제 로봇

Franka Research 3 팔로 탁상 manipulation 과제를 평가했고, VLA-JEPA가 in-distribution과 object layout OOD 양쪽에서 최고 성능을 냈다고 적는다. 반복 grasping, 즉 실패 후 그리퍼를 다시 열어 재시도하는 skill을 익혔으며 π0와 π0.5에서는 관찰되지 않았다고 강조한다. 막대 그래프는 논문 Figure 4와 같다.

2×3 시연 영상 격자 아래 문장은 페이지 고유의 서술이다. fine-tuning에 쓴 수집 데이터에 반복 grasping action이 없는데도 VLA-JEPA가 반복 grasping skill을 학습했고 π0와 π0.5에서는 이 능력이 관찰되지 않았다고 적는다.

### 4.6 영상 horizon ablation

영상 horizon이 미리 정한 action horizon에 가까울 때 최고 성능이며, T가 너무 작으면 부호화 정보가 부족하고 너무 크면 중복 정보가 들어온다고 적는다. 표는 논문 Table 4와 같다.

| T | Spatial | Object | Goal | LIBERO-10 | 평균 |
|---|---|---|---|---|---|
| 4 | 95.0 | 99.2 | 95.8 | 89.0 | 94.8 |
| 8 | 94.8 | 99.8 | 95.8 | 94.0 | 96.1 |
| 16 | 92.8 | 98.8 | 98.0 | 92.2 | 95.5 |

## 5. 한계와 향후 과제 (Limitations and Future Work)

페이지는 한계를 다루지 않는다. 자료 자체의 제약은 다음과 같다.

- 아키텍처 사양, 학습 하이퍼파라미터, 데이터셋 규모, 실제 로봇 하드웨어 구성, 부록의 과제별 관찰이 모두 빠져 있다. 논문 본문과 부록에만 있다.
- 결과 표에서 사람 영상 제외 ablation 행이 전부 빠져 있고 SimplerEnv 표는 비교 대상 4종이 생략됐다. 최고와 두 번째 표시도 웹 표에서는 서식이 제거돼 남아 있지 않다.
- 초록의 "sample efficiency" 표현은 논문 v2 초록과 다르며, sample efficiency를 직접 잰 실험은 논문에도 없다.
- 시연 영상은 페이지에서만 볼 수 있고 텍스트 추출본에는 영상 요소가 남지 않는다. 영상 길이는 2초에서 4초로 짧다.
- 발행일 표기가 없다.

## 6. 관련 연구 (Related Work)

페이지는 관련 연구를 따로 정리하지 않고 결과 표와 attention 비교의 대상 이름만 노출한다. LAPA, UniVLA, OpenVLA-OFT, π0, π0-Fast, π0.5, CoT-VLA, WorldVLA, villa-X, GR00T N1, RoboVLMs다. 이들의 계보와 latent action 계열 안에서의 위치는 논문 본문이 다룬다.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| leakage-free state prediction | 미래 프레임을 학생 경로의 입력이 아니라 감독 목표로만 쓰는 VLA-JEPA의 핵심 설계 |
| latent predictive alignment | 픽셀 재구성 대신 미래 latent 상태를 예측하고 맞추는 JEPA 방식 학습 목표 |
| 반복 grasping | grasping 실패 후 그리퍼를 다시 열어 재시도하는 동작. 페이지가 시연 영상으로 강조하는 사람 영상 pre-training의 효과 |
| Highlights | 프로젝트 페이지가 논문 기여를 세 문장으로 요약한 절 |

## 8. 그림 후보 (Figure Candidates)

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | 티저 도식 (논문 Figure 1과 동일, 1588×942) | fetched | (선택, 논문 페이지에 있음) |
| fig02 | 프레임워크 도식 (논문 Figure 2의 웹용 원본, 4760×2676) | fetched | ★ wiki 권장 (method, 고해상도) |
| fig03 | attention 가중치 시각화 (논문 Figure 6의 웹용 원본, 3148×1576) | fetched | ★ wiki 권장 (analysis, 고해상도) |
| fig04 | 평가 환경 장면 (논문 Figure 3과 동일, 2466×1542) | fetched | (선택, 논문 페이지에 있음) |
| fig05 | 사람 영상 비율 그래프 (논문 Figure 5와 동일, 680×428) | fetched | (선택, 논문 크롭이 더 큼) |
| fig06 | 실제 로봇 성공률 막대 그래프 (논문 Figure 4와 동일, 1275×750) | fetched | (선택, 논문 페이지에 있음) |
| fig07 | 전체 페이지 스크린샷 (상단 6000px) | screenshot | (선택) |
