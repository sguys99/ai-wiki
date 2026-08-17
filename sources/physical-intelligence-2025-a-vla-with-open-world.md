---
title: "π0.5: a VLA with Open-World Generalization"
type: article
year: 2025
category: physical-ai
raw_path: /home/sguys99/project/ai-wiki/raw/articles/physical-intelligence-2025-a-vla-with-open-world.md
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

## 한 줄 요약 (One-line Summary)

π0.5 논문과 같은 날 올라온 Physical Intelligence 공식 발표문. 수식 없이 co-training 레시피를 설명하고 논문이 막대그래프로만 보여 준 ablation 수치를 숫자로 적어 두었다. 새 집에서 돌린 무편집 데모 영상도 함께 싣는다.

## 1. 자료 정보 (Document Information)

- 제목: π0.5: a VLA with Open-World Generalization
- 저자: Physical Intelligence (논문과 동일한 35인 명단)
- 발행: 2025년 4월 22일, https://www.pi.website/blog/pi05
- 수집: `scripts/fetch_article.py` chrome tier, 본문 18,762자
- 원본: `raw/articles/physical-intelligence-2025-a-vla-with-open-world.md`
- 짝이 되는 논문: arXiv 2504.16054 (`sources/black-2025-pi05-a-vision-language-action-model-with.md`)

## 2. 주요 기여 (Key Contributions)

블로그 글이라 새 연구 결과는 없다. 대신 세 가지가 담겼다.

논문에는 그림으로만 있는 언어 지시 따르기 ablation의 수치가 본문에 적혀 있다. in-distribution과 out-of-distribution 각각의 follow rate·success rate를 조건별로 읽을 수 있다.

다음은 회사가 π0.5를 어떤 문제의 답으로 규정하는지다. 회사가 꼽는 로봇공학의 가장 큰 난제는 곡예도 손재주도 아닌 generalization이다. 집집마다 물건도 배치도 다르다는 사실이 문제의 전부라고 본다. 그래서 일반화는 여러 층위에서 동시에 일어나야 한다고 쓴다. 숟가락은 손잡이를, 접시는 가장자리를 잡아야 한다는 저수준 감각이 한 층이다. 옷과 신발을 어디에 둬야 하는지 아는 의미 층이 거기에 더해진다.

마지막은 무편집 데모다. 새 집에서 돌린 장기 과제 영상 7편, 사람이 방해했을 때의 반응, 언어 따르기 영상이 실렸다. 여기서는 지시문 세분화 정도를 바꿔 가며 물건을 집게 했다. 논문 Figure 2·7이 정지 프레임으로 보여 주는 장면의 원본이다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

설명 자체는 논문 4장을 수식 없이 옮겼다. 다만 표현이 몇 군데 더 구체적이다.

action chunk의 길이를 "50 step, 즉 1초"로 적어 control frequency가 50Hz임을 바로 알 수 있게 했다. 논문에서는 제어 주기와 chunk 길이가 다른 절에 흩어져 있다.

계층 구조의 계보는 이 글에서 분명해진다. 이 방식이 자사의 Hi Robot 시스템을 따르되 "high-level 결정과 low-level 제어를 같은 모델이 한다"는 점만 다르다고 회사는 밝힌다. 그 과정을 일종의 chain-of-thought라고 부른다.

VLA가 여러 층위에서 일반화하려면 학습 mixture가 커리큘럼 역할을 해야 한다. co-training을 그렇게 설명한다. 사람이 새 일을 배울 때 개념과 실무를 같이 익히는 과정에 빗대는데 이 비유는 블로그 쪽이 낫다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

논문 Figure 11에 해당하는 언어 지시 따르기 ablation 수치를 본문에 그대로 옮겨 놓았다.

| 조건 | In-dist. follow | In-dist. success | OOD follow | OOD success |
|---|---|---|---|---|
| π0.5 | 86% | 83% | 94% | 94% |
| no WD | 86% | 82% | 80% | 74% |
| no CE | 74% | 67% | 67% | 49% |
| no ME | 66% | 57% | 33% | 31% |

다른 로봇에서 온 데이터(ME·CE)는 모든 조건에서 성능을 좌우한다. 웹 데이터(WD)의 효과는 학습에서 못 본 물체 범주로 갔을 때만 크게 드러난다. 읽는 방법도 이렇게 나란히 적어 두었다.

환경 수 확장 실험은 그림으로만 나오지만 결론은 같다. 약 100개 환경을 넘기면 테스트 환경 데이터를 직접 넣고 학습한 baseline에 근접한다. 회사는 이 지점을 "비교적 손에 넣을 만한 양의 mobile manipulation 데이터로도 일반화가 된다"고 정리한다.

평가 조건은 둘로 나뉜다. 전체 청소 과제에서는 접시를 싱크대에 넣거나 침실 바닥의 물건을 치운다. out-of-distribution 평가는 프롬프트가 지목한 물건을 서랍에 넣게 한다. 후자에서는 success rate와 함께 follow rate를 따로 잰다. 로봇 행동이 사용자 프롬프트와 맞아떨어진 비율이다.

언어 따르기 데모의 지시문은 이렇다. "pick up the round brush", "pick up the silver carabiner", "pick up the yellow funnel", "pick up the clear safety goggles", "pick up the green grill lighter", "pick up the black phone case", "pick up the blue pill bottle", "pick up the guitar shaped spoon" 같은 것들이다. 색·재질·형태를 섞은 수식어로 물건을 지목한다. 이 목록은 이 글에만 실렸다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

논문만큼 자세하지는 않지만 자기 규정은 분명하다. 현재 모델의 목표가 새 기술을 익히거나 높은 손재주를 보이는 데 있지 않고 새 환경으로 옮겨 가는 데 있다고 먼저 밝힌다. 첫 시도에 늘 성공하지는 않는다는 문장도 그대로 있다.

π0-FAST는 DROID 환경에서 새 환경 일반화를 보였지만 물건 하나를 옮기는 정도의 단순한 기술이었다. 회사가 직전 세대와 무엇이 다른지를 직접 짚는다. π0.5의 과제는 스펀지로 얼룩을 닦는 식의 복잡한 행동과 과제 분해를 함께 요구한다.

## 6. 관련 연구 (Related Work)

자사 자료로는 π0 블로그(직전 세대 VLA), FAST 연구 페이지(π0-FAST의 action tokenizer), Hi Robot(high-level·low-level 분리 구조)을 본문에서 링크로 건다. 논문 PDF도 `/download/pi05.pdf`로 함께 건다.

## 7. 용어집 (Glossary)

이 글 고유의 용어는 없다. 논문 source의 용어집(π0.5·co-training·subtask·MM/ME/CE/HL/WD/VI·verbal instruction·follow rate)을 그대로 따른다.

- **Hi Robot**: high-level 추론과 low-level 제어를 나눈 Physical Intelligence의 선행 시스템. π0.5는 그 구도를 한 모델에 합쳤다.

## 8. 그림 후보 (Figure Candidates)

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | verbal instruction 장면 — 사람이 말로 "close the microwave" | fetched | (확인 필요 — 400px 저해상도) |
| fig02 | subtask 명령 "pick up the mitten" | fetched | (아카이브) |
| fig03 | object detection 예시 | fetched | (아카이브) |
| fig04 | 웹 데이터 bounding box 예시 | fetched | (확인 필요 — 400px 저해상도) |
| fig05 | 블로그 전체 페이지 스크린샷 | screenshot | (아카이브) |

페이지의 시각 자료가 대부분 동영상과 인터랙티브 차트라 정지 이미지로 남는 것이 적다. 본문 도식은 논문 쪽 figure로 채우는 편이 낫다.
