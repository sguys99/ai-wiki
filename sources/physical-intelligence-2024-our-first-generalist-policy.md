---
title: "π0: Our First Generalist Policy"
type: article
year: 2024
category: physical-ai
raw_path: /home/sguys99/project/ai-wiki/raw/articles/physical-intelligence-2024-our-first-generalist-policy.md
raw_filename: "physical-intelligence-2024-our-first-generalist-policy.md"
source_collection: external
author: "Physical Intelligence"
url: "https://www.pi.website/blog/pi0"
publisher: "Physical Intelligence Blog"
publication_date: "2024-10-31"
tags: [physical-ai, vla, manipulation, robot-learning]
figures:
  - id: fig01
    file: assets/physical-intelligence-2024-our-first-generalist-policy/fig01.png
    raw: raw/articles/physical-intelligence-2024-our-first-generalist-policy-figures/fig01.png
    caption: "본문에 삽입된 로봇 일러스트 (262×322)"
    strategy: fetched
    curated: false
  - id: fig02
    file: assets/physical-intelligence-2024-our-first-generalist-policy/page-full.png
    raw: raw/articles/physical-intelligence-2024-our-first-generalist-policy-figures/page-full.png
    caption: "블로그 전체 페이지 스크린샷 (상단 6000px)"
    strategy: screenshot
    curated: false
---

## 한 줄 요약 (One-line Summary)

π0 논문의 공식 블로그 발표문이다. 논문과 같은 내용을 수식 없이 풀어 쓰고 데모 영상과 과제별 점수를 직접 보여준다. Physical Intelligence가 π0를 "artificial physical intelligence를 향한 첫걸음"으로 규정한 문서다.

## 1. 자료 정보 (Document Information)

- **제목**: π0: Our First Generalist Policy
- **저자**: Physical Intelligence (논문과 동일한 24인 저자진)
- **발행**: 2024-10-31, https://www.pi.website/blog/pi0
- **성격**: 논문 [[physical-ai/black-2024-pi0-a-vision-language-action-flow-model]]의 대중 공개용 해설. 논문 PDF 링크와 무편집 데모 영상을 함께 싣는다
- **수집 메모**: 본문 16,858자. 페이지의 데모가 대부분 동영상이라 정지 이미지 후보는 2개뿐이다

## 2. 주요 기여 (Key Contributions)

블로그가 논문에 없는 새 결과를 내놓지는 않는다. 대신 동기 서술이 훨씬 직설적이다. Moravec's paradox를 끌어온다. 체스를 이기거나 신약을 찾는 일은 AI에게 "쉬운" 문제인 반면 셔츠를 개거나 식탁을 치우는 일은 지금껏 고안된 가장 어려운 공학 문제에 속한다고 말한다. 그래서 embodied 시스템이 필요하다.

논문 Figure 7은 막대그래프뿐이다. 블로그에는 zero-shot 평가의 과제별 raw 점수가 숫자로 그대로 적혀 있다.

식탁 치우기에서는 접시를 하나씩 옮기는 대신 여러 장을 포개 한 번에 담는 행동이 나왔다고 한다. 접시 위 쓰레기를 털어내고 나서 통에 넣기도 했다. 이런 emergent strategy 관찰을 논문은 지나가듯 다루지만 블로그는 따로 서술한다.

블로그는 자체 수집 데이터가 "8종의 서로 다른 로봇"에서 나왔다고 쓴다. 논문은 7종 robot configuration이라고 쓴다. Bimanual ARX와 Bimanual AgileX를 논문이 운동학적으로 비슷하다고 보아 한 부류로 묶었기 때문이다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

입력은 세 갈래다. Open X-Embodiment 데이터셋, 인터넷 규모 pre-training, 그리고 여러 dexterous 로봇에서 모은 자체 π dataset이다. 이것이 pre-trained VLM과 action expert로 이뤄진 π0에 들어가고 출력은 빨래 개기·커피 내리기·장보기·식탁 치우기 같은 과제 수행이다. 블로그는 수식 없이 이 흐름만 설명한다.

GPT-4V나 Gemini 같은 VLM은 웹의 텍스트와 이미지를 모델링하도록 학습돼 의미 지식을 잘 옮겨 오지만 출력이 이산 언어 토큰뿐이다. dexterous manipulation에는 초당 50회까지 모터 명령을 내보내야 한다. 그래서 pre-trained VLM에 flow matching으로 연속 action 출력을 붙였다. VLM을 고른 이유를 밝힌 이 대목이 블로그의 핵심이다. flow matching은 "diffusion model의 변형"이라고 한 줄로 정의한다. 파라미터 30억짜리 비교적 작은 VLM을 실시간 제어에 맞게 개조했다고만 밝히고 PaliGemma라는 이름은 논문에만 나온다.

pre-training과 fine-tuning의 역할 분담도 LLM에 빗대 정리한다. pre-training이 물리 세계 지식을 가르치고 fine-tuning이 특정 과제를 잘하도록 밀어붙인다.

데이터셋은 특정 응용을 풀려고 고르지 않았다. 모델이 물리적 상호작용을 두루 이해하게 만드는 데 목표를 뒀다. 그릇 치우기, 봉투에 물건 담기, 옷 개기, 케이블 정리, 상자 조립, 플러그 꽂기, 포장 용기에 음식 담기, 쓰레기 버리기가 그 목록이다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

zero-shot 5개 과제 정규화 점수다. 부분 성공에는 부분 점수를 준다.

| 과제 (로봇) | π0 | π0-small | OpenVLA | OpenVLA (UR5e only) | Octo |
|---|---|---|---|---|---|
| Shirt Folding (Bi-ARX) | 1.000 | 0.500 | 0 | 0 | 0 |
| Bussing Easy (UR5e) | 0.971 | 0.443 | 0 | 0.343 | 0.043 |
| Bussing Hard (UR5e) | 0.875 | 0.333 | 0 | 0 | 0 |
| Grocery Bagging (UR5e) | 0.786 | 0.271 | 0 | 0 | 0 |
| Toast out of Toaster (Bi-Trossen) | 0.750 | 0 | 0 | 0 | 0 |

블로그는 OpenVLA와 Octo가 가장 쉬운 Bussing Easy에서만 0이 아닌 점수를 냈다고 쓴다. 표에서 그 값을 낸 OpenVLA는 UR5e 데이터로만 fine-tune한 쪽(0.343)이고 기본 OpenVLA는 다섯 과제 모두 0이다. 2위인 π0-small과 비교해도 전체 아키텍처에 VLM pre-training을 얹은 쪽이 2배 넘게 앞선다.

OpenVLA 평가 과제는 "가지를 냄비에 넣어라" 같은 단일 단계 행동인데 π0의 가장 쉬운 bussing조차 여러 물체를 쓰레기통과 그릇통으로 분류하는 일이다. 어려운 쪽은 다단계·변형 물체·상황별 전략 선택까지 요구한다. 블로그는 이 과제들이 학계 관행보다 훨씬 어렵다는 점을 따로 짚는다.

빨래 개기에서는 건조기에서 옷을 꺼내 탁자로 옮기고 개어 쌓는 과정을 하나의 policy가 완전 자율로 수행한다. post-training 결과를 담은 이 빨래 개기 영상은 무편집이라고 한다. 다양한 데이터로 학습한 덕에 사람이 여러 방식으로 방해해도 회복한다는 관찰도 덧붙인다. 상자 조립은 접기와 끼우기가 예상 못 한 방식으로 실패할 수 있어 진행 상황을 보며 조정해야 한다. 반쯤 접힌 상자가 벌어지지 않도록 두 팔과 탁자로 받쳐야 한다고 설명한다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

generalist robot policy는 아직 초기 단계이고 갈 길이 멀다고 명시한다. 앞으로 풀 과제로는 long-horizon reasoning과 planning, 자율적 self-improvement, robustness, safety를 꼽는다.

기술과 데이터만으로는 안 되고 로보틱스 커뮤니티 전체가 협업해야 한다고 밝힌다. teleoperation과 자율 주행용 하드웨어 설계를 다듬고 파트너 데이터를 pre-trained 모델에 합치는 협업이 이미 진행 중이라고 한다.

## 6. 관련 연구 (Related Work)

블로그가 직접 링크한 비교 대상은 둘뿐이다. OpenVLA는 이산화된 action을 쓰는 7B VLA, Octo는 diffusion 출력을 쓰는 93M 모델로 소개한다. 나머지 계보(RT-2·ACT·Diffusion Policy·PaliGemma·Transfusion)는 논문 쪽에만 있다.

## 7. 용어집 (Glossary)

논문 source와 겹치는 용어는 [[black-2024-pi0-a-vision-language-action-flow-model]]에 위임한다. 이 문서 고유의 표현만 적는다.

- **artificial physical intelligence**: Physical Intelligence가 내건 장기 목표. 사용자가 LLM 챗봇에 요청하듯 로봇에 아무 과제나 말로 시킬 수 있는 상태를 가리킨다.
- **Moravec's paradox**: 사람에게 쉬운 감각·운동 과제가 AI에는 어렵고 그 반대도 성립한다는 관찰. 블로그가 문제 설정의 출발점으로 인용한다.
- **emergent strategy**: 명시적으로 가르치지 않았는데 대규모 다양 데이터 학습에서 나타난 전략. 접시 포개 담기, 접시 위 쓰레기 털어내기가 예다.

## 8. 그림 후보 (Figure Candidates)

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | 본문 로봇 일러스트 (262×322 소형) | fetched | (선택 안 함 — 정보량 낮음) |
| fig02 | 전체 페이지 스크린샷 | screenshot | (선택 안 함 — 아카이브용) |

이 기사의 도식은 대부분 동영상과 인터랙티브 차트라 정지 이미지로 남지 않았다. wiki 페이지에는 이미지를 임베드하지 않고 도식이 필요한 대목은 논문 페이지의 figure를 참조하도록 링크한다.
