---
title: "π0.7: a Steerable Model with Emergent Capabilities"
type: article
year: 2026
category: physical-ai
raw_path: raw/articles/physical-intelligence-2026-a-steerable-model-with-emergent.md
raw_filename: "physical-intelligence-2026-a-steerable-model-with-emergent.md"
source_collection: external
source: physical-intelligence-2026-a-steerable-model-with-emergent.md
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
    caption: "current observation 1 (world model 데모 — 현재 관측)"
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

## 요약 (Summary)

π0.7 논문과 같은 날 올라온 공식 발표 글이다. 수치와 도식은 논문 쪽이 정본이고, 이 글은 영상 데모로 "무엇이 새로 되는가"를 보여주는 역할을 맡는다. 다만 논문에 없는 대목이 하나 있다 — 에어프라이어를 배운 적 없는 모델이 왜 그걸 다룰 줄 아는지, 학습 데이터를 직접 뒤져본 기록이다.

## 무엇을 새로 보여주는가 (What the Post Adds)

발표 글이 잡은 축은 논문과 같다. fine-tuning된 specialist와 같은 수준의 dexterity, 학습에 없던 언어 명령 따라가기, 그리고 skill을 새 조합으로 엮어 처음 보는 과제 풀기다. 서두의 LLM 비유도 논문과 겹친다. 영어→프랑스어 번역과 JSON 출력을 각각 아는 언어 모델은 프랑스어 번역을 JSON으로 내놓는데, VLA는 의미 개념은 이해해도 skill을 새로 조합하지는 못했다는 것이다. 초기 언어 모델이 도메인마다 fine-tuning되던 시절에 빗댄다.

prompt 구성도 같은 넷을 나열한다. 과제와 하위 단계를 적은 다양한 언어, 속도·품질 같은 수행 방식 metadata, joint인지 end-effector인지 알려주는 제어 modality 라벨, 그리고 현재 단계가 끝났을 때의 장면을 그린 subgoal image다. 여기서 metadata를 부르는 이름이 조금 다른데, 발표 글은 strategy metadata라고 쓴다. π*0.6의 RECAP 강화학습 도중 생성된 experience를 이 라벨과 함께 distillation해 하나의 범용 모델로 되돌렸다는 서술이 붙는다.

## 에어프라이어는 어디서 배웠나 (Where the Air Fryer Knowledge Came From)

이 글의 고유 기여다. 저자들은 조합적 일반화 주장을 데이터 쪽에서 뒷받침하려 한다.

먼저 세 단계 시연을 보여준다. "고구마를 에어프라이어에 넣어라"라는 한 줄 지시만 주면 몇 번 헛손질한 뒤 일부만 해낸다. 사람이 단계별로 language coaching을 하면 훨씬 잘 해낸다. 그 coaching 기록으로 high-level policy를 fine-tuning하면 teleoperation 데이터를 한 줄도 더 모으지 않고 완전 자율로 돌아간다.

그다음이 흥미로운 부분이다. 학습 데이터가 워낙 크고 다양해 정확한 출처를 짚기 어렵다고 인정하면서도, 한참 뒤진 끝에 가장 가까운 것 셋을 찾아낸다. 가정에서 수집한 에어프라이어 닫기 episode 두 건("push the frying basket into the airfryer", "put the basket of the airfryer on the leftmost side of the counter")과 오픈소스 DROID 데이터셋의 Franka 팔 데이터다. 실제 실험의 이동형 로봇 동작과는 상당히 다르게 생겼다는 점을 짚으며, LLM이 웹 텍스트의 조각을 조합하듯 π0.7도 조합해 만들어냈다고 해석한다.

논문이 "무엇이 미학습인지 확정하기 어렵다"를 한계로 적었다면, 이 글은 같은 사실을 근거로 삼는다. 남아 있는 것이 조각뿐인데 완성된 동작이 나온다면 그게 조합이라는 논리다.

## cross-embodiment 대목 (Cross-embodiment)

발표 글은 양팔 UR5e를 "학습 데이터에서 가장 과소 대표된 embodiment"라고 부른다. 무거운 팔의 관성이 크고 그리퍼가 상대적으로 부정확해 teleoperation 자체가 어렵다. 이 로봇에서 빨래 개기 데이터를 한 건도 모으지 않았는데 일관되게 해내는 것에 저자들 스스로 놀랐다고 적는다. 성공률은 원본 로봇에서 그 과제 데이터를 직접 모았던 전문 조작자들이 UR5e에서 처음 시도했을 때와 맞먹는다. 이들의 teleoperation 경력은 평균 375시간이다.

영상으로만 나오는 항목도 여럿이다. 유리문을 윈덱스로 닦기, 애호박 깎기, 청바지 개기, 옷 뒤집기, 문 열고 통과하기 같은 것들이다.

## 다음 방향 (What's Next)

글은 한계 대신 다음 그림을 스케치한다. π0.7처럼 잘 조종되는 모델이라면 과제를 푸는 방법을 스스로 생각해보고, prompt 따르기 능력으로 그 생각을 action에 grounding하고, 결과를 돌아보며 계획을 고치는 순환이 가능해질 수 있다는 것이다. prompt를 잘 따른다는 성질이 사용자 편의를 넘어, foundation model의 의미 수준 추론을 물리 세계로 옮기는 통로라는 관점이다.

정량적 한계 — zero-shot 성공률 60~80%대, 미학습 과제 판정의 어려움 — 는 논문 쪽에만 있다.

## 수집 메모 (Ingest Note)

본문 곳곳이 영상 데모라 텍스트 추출본에는 `Loading…` 자리표시자로 남는다. 아키텍처 도식은 인라인 SVG라 파일로 잡히지 않았고, 내려받은 이미지 10장은 world model 데모의 현재 observation과 생성된 subgoal image인데 246x171 안팎의 썸네일이라 임베드용으로는 작다. 도식이 필요하면 논문 페이지의 figure를 쓴다.

## 관련 페이지 (Related Pages)

- [[physical-ai/ai-2026-pi07-a-steerable-generalist-robotic]] — 논문 본문. 아키텍처·수치·ablation은 전부 이쪽이다
- [[physical-ai/physical-intelligence-2025-a-vla-that-learns-from]] — π\*0.6 발표 글. 여기서 다룬 RECAP experience가 π0.7로 distillation된다
- [[physical-ai/physical-intelligence-2025-a-vla-with-open-world]] — π0.5 발표 글
- [[physical-ai/physical-intelligence-2024-our-first-generalist-policy]] — π0 발표 글
- [[overviews/physical-ai-overview]] — 도메인 허브
