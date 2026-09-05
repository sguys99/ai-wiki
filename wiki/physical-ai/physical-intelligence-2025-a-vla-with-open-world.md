---
title: "π0.5: a VLA with Open-World Generalization"
type: article
year: 2025
category: physical-ai
source: physical-intelligence-2025-a-vla-with-open-world.md
raw_path: raw/articles/physical-intelligence-2025-a-vla-with-open-world.md
raw_filename: "physical-intelligence-2025-a-vla-with-open-world.md"
source_collection: external
author: "Physical Intelligence"
url: "https://www.pi.website/blog/pi05"
publisher: "Physical Intelligence Blog"
publication_date: "2025-04-22"
tags: [physical-ai, vla, manipulation, mobile-robot, robot-learning]
figures:
  - id: fig01
    file: assets/physical-intelligence-2025-a-vla-with-open-world/fig01.jpg
    raw: raw/articles/physical-intelligence-2025-a-vla-with-open-world-figures/fig01.jpg
    caption: "verbal instruction 데이터 — 사람이 부엌에서 로봇에게 \"close the microwave\"라고 말로 지시하는 장면 (400×300)"
    strategy: fetched
    curated: true
  - id: fig02
    file: assets/physical-intelligence-2025-a-vla-with-open-world/fig02.jpg
    raw: raw/articles/physical-intelligence-2025-a-vla-with-open-world-figures/fig02.jpg
    caption: "subtask 명령 데이터 — \"pick up the mitten\" 라벨이 붙은 로봇 시점 observation (400×237)"
    strategy: fetched
    curated: false
  - id: fig03
    file: assets/physical-intelligence-2025-a-vla-with-open-world/fig03.jpg
    raw: raw/articles/physical-intelligence-2025-a-vla-with-open-world-figures/fig03.jpg
    caption: "object detection 데이터 예시 (400×301)"
    strategy: fetched
    curated: false
  - id: fig04
    file: assets/physical-intelligence-2025-a-vla-with-open-world/fig04.jpg
    raw: raw/articles/physical-intelligence-2025-a-vla-with-open-world-figures/fig04.jpg
    caption: "multimodal web data 예시 — 실내 장면에 monitor·stove·sofa·pillow 등 bounding box와 라벨이 달려 있다 (400×286)"
    strategy: fetched
    curated: true
  - id: fig05
    file: assets/physical-intelligence-2025-a-vla-with-open-world/page-full.png
    raw: raw/articles/physical-intelligence-2025-a-vla-with-open-world-figures/page-full.png
    caption: "블로그 전체 페이지 스크린샷 (상단 6000px, 원본 12158px)"
    strategy: screenshot
    curated: false
---

## 요약 (Summary)

π0.5 논문과 같은 날 올라온 Physical Intelligence 공식 발표문이다. 수식을 걷어내고 co-training 레시피를 설명한다. 논문이 막대그래프로만 보여 준 언어 지시 따르기 ablation의 수치가 이 글에는 숫자로 적혀 있다. 새 집에서 돌린 무편집 데모 영상도 함께 실렸다.

회사가 무엇을 문제로 보는지가 첫 단락에 나온다. 로봇공학의 가장 큰 난제는 곡예나 손재주가 아니라 generalization이다. 집집마다 물건도 배치도 다르니 일반화는 여러 층위에서 동시에 일어나야 한다. 숟가락은 손잡이를, 접시는 가장자리를 잡아야 한다는 저수준 감각이 한 층이다. 옷과 신발을 어디에 둬야 하는지 아는 의미 층도 있다. 대부분의 상용 로봇이 공장과 창고에 머무는 이유를 여기서 찾는다.

## 논문에 없는 것 (What the Paper Doesn't Have)

### 언어 ablation 수치

논문 Figure 11은 막대그래프뿐이지만 블로그 본문에는 값이 적혀 있다.

| 조건 | In-dist. follow | In-dist. success | OOD follow | OOD success |
|---|---|---|---|---|
| π0.5 | 86% | 83% | 94% | 94% |
| no WD | 86% | 82% | 80% | 74% |
| no CE | 74% | 67% | 67% | 49% |
| no ME | 66% | 57% | 33% | 31% |

다른 로봇에서 온 데이터(ME·CE)는 모든 조건에서 성능을 좌우한다. 웹 데이터(WD)의 효과는 학습에서 못 본 물체 범주로 갔을 때만 크게 드러난다. 표를 어떻게 읽어야 하는지도 글에 함께 적어 두었다.

평가 조건은 둘로 나뉜다. 이 구분은 블로그 설명이 더 명확하다. 하나는 전체 청소 과제로, 접시를 싱크대에 넣거나 침실 바닥의 물건을 치우게 한다. 또 하나는 out-of-distribution 평가인데 프롬프트가 지목한 물건을 서랍에 넣게 한다. 후자에서는 success rate와 별도로 follow rate를 잰다. 로봇 행동이 사용자 프롬프트와 맞아떨어진 비율이다.

### 데이터 슬라이스의 실제 모습

![[assets/physical-intelligence-2025-a-vla-with-open-world/fig01.jpg]]
*verbal instruction 수집 장면 — 사람이 부엌에서 로봇에게 "close the microwave"라고 말로 지시한다 (Physical Intelligence 2025)*

논문 Figure 4는 여섯 슬라이스를 한 판에 몰아 넣어 각 예시가 작게 보인다. 블로그는 같은 자료를 슬라이스별로 크게 보여 준다. verbal instruction은 π0.5에서 새로 들어온 데이터 종류다. 사람이 이미 학습된 저수준 policy에 말로 subtask를 하나씩 불러 과제를 끝내게 하며 모은다.

![[assets/physical-intelligence-2025-a-vla-with-open-world/fig04.jpg]]
*multimodal web data 예시 — 실내 장면에 monitor·stove·sofa·pillow 등의 bounding box와 라벨이 달려 있다 (Physical Intelligence 2025)*

논문은 웹 데이터에 실내 장면 bounding box를 따로 보강했다고 적었다. 이 그림이 그 서술 그대로다. 못 본 물체 범주의 이름을 알아듣는 능력이 여기서 온다.

### 무편집 데모

새 집에서 돌린 장기 과제 영상 7편이 실렸다. 사람이 로봇을 방해했을 때 어떻게 반응하는지 보여 주는 영상이 있다. 언어 따르기 영상도 들어 있는데 지시문을 얼마나 잘게 쪼갤지 바꿔 가며 물건을 집게 했다. 논문 Figure 2·7이 정지 프레임으로 보여 주는 장면의 원본이다.

언어 따르기 데모의 지시문 목록도 이 글에만 있다. "pick up the round brush", "pick up the silver carabiner", "pick up the yellow funnel", "pick up the clear safety goggles", "pick up the green grill lighter", "pick up the black phone case", "pick up the blue pill bottle", "pick up the guitar shaped spoon". 색·재질·형태를 섞은 수식어로 물건을 지목한다.

## 블로그 쪽이 더 구체적인 대목 (Where the Blog Is Sharper)

action chunk의 길이를 "50 step, 즉 1초"로 적어 control frequency가 50Hz임을 바로 알 수 있게 했다. control frequency는 로봇이 1초에 몇 번 새로운 action을 갱신하는지를 뜻한다. 논문에서는 제어 주기와 chunk 길이가 다른 절에 흩어져 있다.

계층 구조의 계보는 글에 직접 나온다. 이 방식은 자사의 Hi Robot 시스템을 따르되 high-level 결정과 low-level 제어를 같은 모델이 한다는 점만 다르다. 그 과정을 일종의 chain-of-thought라고 부른다.

co-training을 설명하는 비유도 블로그 쪽이 낫다. VLA가 여러 층위에서 일반화하려면 학습 mixture가 커리큘럼 노릇을 해야 한다. 사람이 새 일을 배울 때 개념과 실무를 함께 익히는 과정에 빗댄 설명이다.

## 자기 규정과 한계 (Self-Assessment)

지금 모델의 목표는 새 기술을 익히거나 높은 손재주를 보이는 것이 아니라 새 환경으로 옮겨 가는 것이라고 먼저 밝힌다. 첫 시도에 늘 성공하지는 않는다는 문장도 그대로 있다.

직전 세대와 무엇이 달라졌는지도 직접 비교해 둔다. π0-FAST는 DROID 환경에서 새 환경 일반화를 보였지만 물건 하나를 옮기는 정도의 단순한 기술이었다. π0.5의 과제에서는 스펀지로 얼룩을 닦는 식의 복잡한 행동과 과제 분해가 함께 필요하다.

## 관련 페이지 (Related Pages)

- [[physical-ai/black-2025-pi05-a-vision-language-action-model-with]] — 짝이 되는 논문. 구조 도식·ablation·실기기 평가의 원본
- [[physical-ai/physical-intelligence-2024-our-first-generalist-policy]] — 같은 자리에 올라온 π0 발표문. 두 글을 나란히 보면 반년 사이 강조점 이동이 보인다
- [[physical-ai/black-2024-pi0-a-vision-language-action-flow-model]] — π0 논문
- [[physical-ai/physical-intelligence-openpi]] — 이 글이 소개하는 모델의 공개 구현
- [[overviews/physical-ai-overview]] — 도메인 허브
