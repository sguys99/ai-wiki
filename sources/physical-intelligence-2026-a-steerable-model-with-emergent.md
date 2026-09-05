---
title: "π0.7: a Steerable Model with Emergent Capabilities"
type: article
year: 2026
category: physical-ai
raw_path: raw/articles/physical-intelligence-2026-a-steerable-model-with-emergent.md
raw_filename: "physical-intelligence-2026-a-steerable-model-with-emergent.md"
source_collection: external
author: "Physical Intelligence"
url: "https://www.pi.website/blog/pi07"
publisher: "www.pi.website"
publication_date: "2026-04-16"
fetched_at: "2026-09-04T07:48:14+0900"
extractor_tier: "chrome"
tags: [physical-ai, vla, world-model, manipulation]
figures:
  - id: fig01
    file: assets/physical-intelligence-2026-a-steerable-model-with-emergent/page-full.png
    raw: raw/articles/physical-intelligence-2026-a-steerable-model-with-emergent-figures/page-full.png
    caption: "전체 페이지 스크린샷"
    strategy: screenshot
    curated: false
  - id: fig02
    file: assets/physical-intelligence-2026-a-steerable-model-with-emergent/fig02.png
    raw: raw/articles/physical-intelligence-2026-a-steerable-model-with-emergent-figures/fig02.png
    caption: "current observation 1 (world model 데모의 현재 observation)"
    source_url: "https://www.pi.website/images/pi07/current_1.png"
    strategy: fetched
    curated: false
  - id: fig03
    file: assets/physical-intelligence-2026-a-steerable-model-with-emergent/fig03.png
    raw: raw/articles/physical-intelligence-2026-a-steerable-model-with-emergent-figures/fig03.png
    caption: "current observation 2"
    source_url: "https://www.pi.website/images/pi07/current_2.png"
    strategy: fetched
    curated: false
  - id: fig04
    file: assets/physical-intelligence-2026-a-steerable-model-with-emergent/fig04.png
    raw: raw/articles/physical-intelligence-2026-a-steerable-model-with-emergent-figures/fig04.png
    caption: "current observation 3"
    source_url: "https://www.pi.website/images/pi07/current_3.png"
    strategy: fetched
    curated: false
  - id: fig05
    file: assets/physical-intelligence-2026-a-steerable-model-with-emergent/fig05.png
    raw: raw/articles/physical-intelligence-2026-a-steerable-model-with-emergent-figures/fig05.png
    caption: "current observation 4"
    source_url: "https://www.pi.website/images/pi07/current_4.png"
    strategy: fetched
    curated: false
  - id: fig06
    file: assets/physical-intelligence-2026-a-steerable-model-with-emergent/fig06.png
    raw: raw/articles/physical-intelligence-2026-a-steerable-model-with-emergent-figures/fig06.png
    caption: "current observation 5"
    source_url: "https://www.pi.website/images/pi07/current_5.png"
    strategy: fetched
    curated: false
  - id: fig07
    file: assets/physical-intelligence-2026-a-steerable-model-with-emergent/fig07.png
    raw: raw/articles/physical-intelligence-2026-a-steerable-model-with-emergent-figures/fig07.png
    caption: "world model이 생성한 subgoal image 1"
    source_url: "https://www.pi.website/images/pi07/subgoal_1.png"
    strategy: fetched
    curated: false
  - id: fig08
    file: assets/physical-intelligence-2026-a-steerable-model-with-emergent/fig08.png
    raw: raw/articles/physical-intelligence-2026-a-steerable-model-with-emergent-figures/fig08.png
    caption: "world model이 생성한 subgoal image 2"
    source_url: "https://www.pi.website/images/pi07/subgoal_2.png"
    strategy: fetched
    curated: false
  - id: fig09
    file: assets/physical-intelligence-2026-a-steerable-model-with-emergent/fig09.png
    raw: raw/articles/physical-intelligence-2026-a-steerable-model-with-emergent-figures/fig09.png
    caption: "world model이 생성한 subgoal image 3"
    source_url: "https://www.pi.website/images/pi07/subgoal_3.png"
    strategy: fetched
    curated: false
  - id: fig10
    file: assets/physical-intelligence-2026-a-steerable-model-with-emergent/fig10.png
    raw: raw/articles/physical-intelligence-2026-a-steerable-model-with-emergent-figures/fig10.png
    caption: "world model이 생성한 subgoal image 4"
    source_url: "https://www.pi.website/images/pi07/subgoal_4.png"
    strategy: fetched
    curated: false
  - id: fig11
    file: assets/physical-intelligence-2026-a-steerable-model-with-emergent/fig11.png
    raw: raw/articles/physical-intelligence-2026-a-steerable-model-with-emergent-figures/fig11.png
    caption: "world model이 생성한 subgoal image 5"
    source_url: "https://www.pi.website/images/pi07/subgoal_5.png"
    strategy: fetched
    curated: false
---

## 한 줄 요약 (One-line Summary)

π0.7 논문의 공식 발표 글이다. 같은 내용을 영상 데모 중심으로 풀되, 논문에는 없는 대목 하나를 덧붙인다. 에어프라이어를 한 번도 배운 적 없는 모델이 왜 그걸 다룰 줄 아는지 학습 데이터를 뒤져본 기록이다.

## 1. 자료 정보 (Document Information)

- 제목: π0.7: a Steerable Model with Emergent Capabilities
- 저자: Physical Intelligence (논문과 동일한 87인 명단)
- 게시: 2026년 4월 16일, https://www.pi.website/blog/pi07
- 원본: `raw/articles/physical-intelligence-2026-a-steerable-model-with-emergent.md` (20,838자, tier=chrome)
- 함께 공개된 논문: [[physical-ai/ai-2026-pi07-a-steerable-generalist-robotic]]

본문 곳곳이 영상 데모라 텍스트 추출본에는 `Loading…` 자리표시자로 남는다. 수치와 도식은 논문 쪽이 정본이고, 이 글은 "무엇이 새로 되는가"를 눈으로 보여주는 역할을 맡는다.

## 2. 주요 기여 (Key Contributions)

발표 글이 잡은 축은 세 가지다. π0.7이 fine-tuning된 specialist와 같은 수준으로 dexterous 과제를 해낸다는 것, 학습 데이터에 없던 언어 명령을 따라간다는 것, 그리고 skill을 새 조합으로 엮어 처음 보는 과제를 푼다는 것이다.

LLM 비유가 서두에 나온다. 영어를 프랑스어로 옮길 줄 알고 JSON을 뽑을 줄 아는 언어 모델은 프랑스어 번역을 JSON으로 내놓는다. VLA는 의미 개념은 이해해도 skill을 새로 조합하지는 못했고, 학습한 skill조차 그 과제에 fine-tuning해야 최고 성능이 나왔다. 초기 언어 모델이 도메인마다 fine-tuning되던 시절에 빗댄다.

해법 요약도 논문과 같다. 다양한 데이터를 그냥 합치면 안 되고, prompt에 "어떻게 할지"를 담는 여러 modality를 함께 넣어야 한다는 것이다. 글은 네 가지를 나열한다. 과제와 하위 단계를 적은 다양한 언어, 속도와 품질 같은 수행 방식 metadata, joint인지 end-effector인지 알려주는 제어 modality 라벨, 그리고 현재 단계가 끝났을 때의 장면을 그린 subgoal image다. subgoal image는 실행 시점에 world model이 만든다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

구조 설명은 논문 Figure 1과 2를 웹 도식으로 옮긴 수준이다. 학습 시점에는 언어 지시와 subgoal image, episode metadata가 prompt로 들어가고, 추론 시점에는 high-level policy가 subtask를 내놓고 world model이 subgoal을 그리며 사용자가 원하는 metadata를 지정한다. observation memory와 action expert가 양옆에 붙는다.

글이 특히 강조하는 것은 저품질 데이터의 활용이다. 자율 평가에서 나온 데이터는 보통 그대로 넣으면 낮은 품질의 동작을 가르치게 되는데, 품질과 속도를 metadata로 적어두면 학습에 넣을 수 있다는 설명이다. π*0.6의 RECAP 강화학습 도중 생성된 experience를 strategy metadata와 함께 distillation해 하나의 범용 모델로 되돌렸다고 밝힌다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

정량 결과는 논문과 같은 그래프를 웹으로 옮긴 것이다. 빨래 개기, 에스프레소, 상자 조립에서 π*0.6 specialist와 성공률이 같거나 throughput이 더 높다는 막대그래프가 실린다.

영상으로만 보여주는 항목이 여럿이다. 유리문을 윈덱스로 닦기, 애호박 깎기, 청바지 개기, 옷 뒤집기, 문 열고 통과하기 같은 것들이다.

에어프라이어 대목이 이 글의 고유 기여다. 세 단계로 보여준다. 먼저 "고구마를 에어프라이어에 넣어라"라는 한 줄 지시만 주면 몇 번 헛손질한 뒤 일부만 해낸다. 다음으로 사람이 단계별 language coaching을 하면 훨씬 잘 해낸다. 마지막으로 그 coaching 기록으로 high-level policy를 fine-tuning하면 teleoperation 데이터를 한 줄도 더 모으지 않고 완전 자율로 수행한다.

그리고 저자들은 되묻는다. 이 모델은 에어프라이어를 어디서 배웠나. 학습 데이터가 워낙 크고 다양해 정확한 출처를 짚기 어렵다고 인정하면서도, 한참 뒤진 끝에 가장 가까운 것 셋을 찾아낸다. 가정에서 수집한 에어프라이어 닫기 episode 두 건("push the frying basket into the airfryer", "put the basket of the airfryer on the leftmost side of the counter")과 오픈소스 DROID 데이터셋의 Franka 팔 데이터다. 실제 실험의 이동형 로봇 동작과는 상당히 다르게 생겼다는 점을 짚으며, LLM이 웹 텍스트의 조각을 조합하듯 π0.7도 조합해서 만들어냈다고 해석한다. 조합적 일반화 주장을 데이터 쪽에서 뒷받침하려는 시도다.

cross-embodiment 절은 양팔 UR5e를 "학습 데이터에서 가장 과소 대표된 embodiment"라고 부른다. 무거운 팔의 관성이 크고 그리퍼가 상대적으로 부정확해 teleoperation 자체가 어렵다. 빨래 개기 데이터를 이 로봇에서 한 건도 모으지 않았는데 일관되게 해내는 것에 저자들 스스로 놀랐다고 적는다. 성공률은 원본 로봇에서 그 과제 데이터를 직접 모았던 전문 조작자들이 UR5e에서 처음 시도했을 때의 성공률과 맞먹는다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

발표 글이라 한계 서술은 얇다. 대신 다음 방향을 스케치한다. π0.7처럼 잘 조종되는 모델이라면 과제를 푸는 방법을 스스로 "생각해보고", prompt 따르기 능력으로 그 생각을 action에 grounding하고, 결과를 돌아보며 계획을 고치는 순환이 가능해질 수 있다는 것이다. prompt를 잘 따른다는 성질이 사용자 편의만이 아니라 foundation model의 의미 수준 추론을 물리 세계로 옮기는 통로라는 관점이다.

정량적 한계, 즉 zero-shot 성공률 60~80%대와 무엇이 미학습 과제인지 확정하기 어렵다는 문제는 논문 쪽에만 있다.

## 6. 관련 연구 (Related Work)

글이 직접 거는 내부 링크는 셋이다. π*0.6과 RECAP 발표 글(원문 표기는 Recap), Hi Robot의 high-level policy, 그리고 사람 영상에서 로봇으로 전이를 다룬 연구 페이지다. 외부로는 BERT 논문 한 건을 "초기 언어 모델이 도메인마다 fine-tuning되던 시절"의 근거로 건다.

## 7. 용어집 (Glossary)

논문 source의 [[physical-ai/ai-2026-pi07-a-steerable-generalist-robotic]] 용어집을 그대로 따른다. 이 글에만 나오는 것은 하나다.

| 용어 | 뜻 |
|---|---|
| strategy metadata | 발표 글이 episode metadata를 부르는 다른 이름. 속도와 품질처럼 "어떤 전략으로 수행했는지"를 가리키는 라벨 묶음이다 |

## 8. 그림 후보 (Figure Candidates)

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | 전체 페이지 스크린샷 | screenshot | (선택) |
| fig02~fig06 | world model 데모의 현재 observation 5장 | fetched | (선택) |
| fig07~fig11 | 같은 데모에서 world model이 생성한 subgoal image 5장 | fetched | (선택) |

본문 도식은 대부분 인라인 SVG와 영상이라 파일로 남지 않는다. 내려받은 10장은 246x171 안팎의 썸네일이라 임베드용으로는 작다. 아키텍처와 결과 도식은 논문 쪽 figure를 쓰는 편이 낫다.
