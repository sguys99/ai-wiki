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
  - id: fig03
    file: assets/physical-intelligence-2026-a-steerable-model-with-emergent/fig03.png
    raw: raw/articles/physical-intelligence-2026-a-steerable-model-with-emergent-figures/fig03.png
    caption: "world model 데모의 현재 observation 2. 로봇 카메라가 담은 주방 조리대 장면이다"
    source_url: "https://www.pi.website/images/pi07/current_2.png"
    strategy: fetched
    curated: true
  - id: fig08
    file: assets/physical-intelligence-2026-a-steerable-model-with-emergent/fig08.png
    raw: raw/articles/physical-intelligence-2026-a-steerable-model-with-emergent-figures/fig08.png
    caption: "아키텍처 도식의 subgoal image 예시. 하위 단계가 끝났을 때의 장면을 그린 목표 이미지다"
    source_url: "https://www.pi.website/images/pi07/subgoal_2.png"
    strategy: fetched
    curated: true
---

## 요약

Physical Intelligence가 2026년 4월 16일에 자사 블로그에 올린 π0.7 공식 발표 글이다. 같은 날 논문 PDF도 함께 공개했고, 저자 명단도 논문과 같다.

회사가 이 글에서 내세우는 주장은 일반화 능력이 단계적으로 달라졌다는 것이다. 하나의 범용 모델이 과제별로 fine-tuning된 specialist와 같은 수준으로 dexterous 과제를 수행하고, 학습 데이터에 없던 언어 명령을 따르며, 학습에서 배운 skill을 새 조합으로 엮어 처음 보는 과제를 푼다는 세 가지다.

이 페이지는 발표 글이 실제로 말한 것을 다룬다. 즉 발표 맥락, 영상으로 보여준 시연 과제, 회사가 강조한 steerability와 emergent capability의 메시지다. 모델 아키텍처와 실험 수치, ablation은 [[physical-ai/ai-2026-pi07-a-steerable-generalist-robotic]] 논문 페이지가 담당하므로 그 페이지를 함께 읽는 편이 좋다.

## 배경

로봇 foundation model이 넓게 일반화하리라는 기대는 오래됐지만, 실제로 공개된 모델은 LLM 수준의 조합적 일반화를 보여준 적이 없다. 발표 글은 이 결핍을 출발점으로 삼는다.

LLM 쪽의 사례는 분명하다. 영어를 프랑스어로 옮길 줄 알고 JSON 형식을 낼 줄 아는 언어 모델은 프랑스어 번역을 JSON으로 내놓는다. 즉 학습 데이터에 있던 개념을 새 방식으로 결합한다.

VLA는 그 지점에 이르지 못했다. 다양한 의미 개념을 이해하기는 해도, 새 도구나 처음 보는 주방 기기를 쓰는 식으로 skill을 새로 결합하는 능력은 확인되지 않았다. 게다가 학습에서 이미 본 skill조차 그 skill에 fine-tuning해야 최고 성능이 나왔다.

발표 글은 이 상황을 초기 언어 모델에 빗댄다. 초기 언어 모델도 문제 영역마다 따로 fine-tuning해야 했고, 근거로 BERT 논문을 건다. 따라서 진정한 generalist라면 모든 skill을 추가 학습 없이 수행하고 그 skill을 재조합해 새 과제를 풀 수 있어야 한다는 것이 저자들의 기준이다.

## 핵심 개념

이 절의 용어를 잡아두면 뒤의 시연 설명이 그대로 읽힌다. 발표 글은 논문과 같은 개념을 쓰되 일부를 다른 이름으로 부른다.

steerable은 사용자가 무엇을 할지뿐 아니라 어떻게 할지까지 모델에 지정할 수 있다는 뜻이다. 발표 글 제목의 steerable model이 가리키는 성질이며, 속도나 품질 같은 수행 방식을 실행 시점에 지정한다는 의미를 담는다.

emergent capability는 학습 데이터에 없던 조합을 모델이 실행해내는 성질을 말한다. 발표 글이 제목에 넣은 두 번째 핵심어이고, 저자들이 주방 기기 조작 실험에서 처음 관찰했다고 적은 능력이다.

compositional generalization은 학습에서 본 skill을 새로운 조합으로 엮어 미학습 과제를 푸는 능력이다. 발표 글은 π0.7이 이 능력의 초기 징후를 보였다고 서술한다.

subgoal image는 현재 하위 단계가 끝났을 때의 장면을 그린 목표 이미지다. 학습 시점에는 데이터에서 가져오고, 실행 시점에는 경량 world model이 만들어낸다. world model은 환경의 동역학을 학습해 미래를 예측하는 모델이다.

language coaching은 사람이 하위 단계를 말로 하나씩 짚어주며 로봇을 안내하는 방식이다. 처음 기기를 쓰는 사람에게 옆에서 순서를 알려주는 상황과 같다.

## 방법

### prompt를 이루는 네 modality

발표 글이 제시하는 해법은 데이터를 그냥 합치는 대신 prompt에 문맥을 늘리는 것이다. 여러 로봇의 데이터, 사람 영상, 여러 policy를 실행해 모은 자율 episode를 단순 병합하면 좋은 결과가 나오지 않기 때문이다. policy는 현재 observation을 받아 다음 action을 정하는 함수를 말한다.

따라서 학습에는 무엇을 할지만이 아니라 어떻게 할지를 함께 적은 여러 modality가 들어간다.

| prompt modality | 담는 정보 |
|---|---|
| 다양한 지시문 | 과제 전체와 개별 하위 단계를 기술하는 자연어 |
| metadata | 속도와 품질처럼 그 episode를 어떻게 수행했는지 |
| control modality 라벨 | joint 제어인지 end-effector 제어인지 |
| subgoal image | 현재 하위 단계가 끝났을 때의 장면. 실행 시점에는 world model이 생성한다 |

지시문(instruction)은 로봇에게 과제를 지정하는 자연어 문장이다. 발표 글의 도식은 학습 시점 지시문 예시로 "pick up the oven mitt", "open the drawer", "grab the spatula", "place pot on the stove", "fold the towel", "wipe the counter", "close the fridge"를 나열한다. 즉 과제 전체가 아니라 하위 단계 수준의 짧은 명령이 학습 단위다.

### 학습 시점과 추론 시점

도식은 같은 모델을 두 시점으로 나누어 보여준다. 학습 시점에는 지시문과 subgoal image, quality와 speed로 이루어진 episode metadata가 prompt로 들어가고, observation memory와 함께 VLA에 입력되어 action expert가 action을 낸다.

추론 시점에는 그 자리를 세 요소가 대신한다. high-level policy가 과제 지시문을 받아 하위 단계 지시문을 내놓고, world model이 그 하위 단계에 맞는 subgoal image를 그리며, 사용자가 원하는 metadata를 직접 지정한다.

![[assets/physical-intelligence-2026-a-steerable-model-with-emergent/fig03.png]]
*Figure 1: observation memory에 들어가는 현재 장면의 예시. 로봇 카메라가 담은 주방 화면이다 (Physical Intelligence 2026, 발표 글 아키텍처 도식).*

![[assets/physical-intelligence-2026-a-steerable-model-with-emergent/fig08.png]]
*Figure 2: subgoal image의 예시. 하위 단계가 끝났을 때의 장면을 사진과 같은 형태로 그려낸 목표 이미지다 (Physical Intelligence 2026, 발표 글 아키텍처 도식).*

도식은 이 구성이 겨냥하는 성능 항목도 함께 적어둔다. fine-tuning 없는 out-of-the-box 성능, specialist 수준의 dexterity, cross-embodiment 전이의 세 가지다.

### 저품질 데이터의 활용

발표 글이 특히 강조하는 효과는 원래라면 쓰기 어려운 데이터를 살려 쓰는 것이다. 각 라벨이 행동을 구분해주기 때문에 전략과 숙련도가 서로 다른 데이터를 한 학습에 함께 넣을 수 있다.

- subgoal image는 물체의 정확한 공간 배치를 지정한다.
- episode 길이를 적어주면 과제를 얼마나 빨리 끝내야 하는지가 정해진다.
- 자율 평가에서 나온 suboptimal 데이터는 그대로 넣으면 낮은 품질의 동작을 가르치게 되지만, 품질이나 속도를 낮게 적어두면 학습에 포함할 수 있다.

## 시연과 결과

### 에어프라이어 조작의 세 단계

저자들이 emergent capability를 처음 관찰한 상황은 여러 주방 기기를 조작하게 시켰을 때다. 해당 기기 과제의 시연 데이터(demonstration)를 따로 모으지 않고, 대신 prompt로 조작을 유도했다.

고구마를 에어프라이어에 넣는 과제가 대표 사례이고, 발표 글은 이를 세 단계 영상으로 보여준다.

| 단계 | 주어진 입력 | 결과 |
|---|---|---|
| zero-shot 지시 | "load a sweet potato into the air fryer" 한 문장 | 몇 번 헛손질한 뒤 과제의 일부만 수행하고 끝내지 못한다 |
| 단계별 language coaching | 사람이 하위 단계를 말로 하나씩 안내 | 훨씬 안정적으로 수행한다 |
| high-level policy fine-tuning | 앞 단계의 coaching 기록으로 high-level policy를 fine-tuning | teleoperation 데이터를 추가로 모으지 않고 완전 자율로 수행한다 |

두 번째 단계는 보기보다 어렵다는 것이 저자들의 설명이다. 세밀한 지시를 이해하고 그것을 눈앞의 장면에 정확히 grounding해야 하기 때문이다. teleoperation은 사람이 로봇을 원격으로 움직여 시연을 만드는 방식인데, 세 번째 단계는 이 방식으로 데이터를 한 건도 더 모으지 않았다는 점이 핵심이다. 즉 로봇이 language coaching만으로 과제를 배운 셈이다. 이때 world model은 각 하위 단계 지시문에 대응하는 subgoal image도 함께 생성한다.

### 에어프라이어 지식의 출처 추적

이 글의 고유 기여는 조합적 일반화 주장을 학습 데이터 쪽에서 뒷받침하려 한 기록이다. 저자들은 로봇이 에어프라이어라는 물건을 어디서 배웠는지 직접 확인하려 했다.

우선 한계를 인정한다. 학습 데이터의 규모와 다양성 때문에 이 행동에 기여한 정확한 episode를 짚어내기 어렵고, 지식은 로봇 episode와 웹 스케일 vision-language pre-training이 함께 만든 결과일 가능성이 크다는 것이다.

오랜 탐색 끝에 찾아낸 가장 가까운 자료는 세 건이다.

- 가정에서 수집한 에어프라이어 닫기 episode 한 건. 라벨은 "push the frying basket into the airfryer"다.
- 같은 가정에서 수집한 또 다른 episode 한 건. 라벨은 "put the basket of the airfryer on the leftmost side of the counter"다.
- 오픈소스 DROID 데이터셋의 Franka 로봇 데이터.

이 자료들은 실험에 쓴 이동형 로봇의 실제 동작과 상당히 다르게 생겼다. 저자들은 이 차이를 근거로 π0.7이 고구마를 에어프라이어에 넣는 행동을 조합해 만들어냈다고 해석하며, LLM이 웹에서 본 텍스트 조각을 조합하는 방식에 빗댄다.

같은 맥락에서 발표 글은 언어로 다양한 과제를 지시하고 상호작용하며 새 행동을 가르칠 수 있다는 점도 영상으로 보여준다.

### cross-embodiment 전이

발표 글이 가장 강한 결과로 꼽는 것은 양팔 UR5e에서의 빨래 개기다. embodiment는 로봇의 물리적 형상과 그에 딸린 제어 API 구성을 뜻한다.

| 항목 | 내용 |
|---|---|
| 로봇 구성 | UR5e 산업용 팔 2대와 Robotiq 평행 그리퍼 |
| 데이터 비중 | 학습 데이터에서 가장 과소 대표된 embodiment |
| teleoperation 난이도 | 무거운 팔의 관성이 크고 그리퍼가 상대적으로 부정확해 사람이 조작하기도 어렵다 |
| 해당 과제 데이터 | 이 로봇에서 빨래 개기 데이터를 한 건도 수집하지 않았다 |

그럼에도 π0.7은 이 로봇에서 빨래 개기를 일관되게 수행했고, 저자들은 스스로 놀랐다고 적는다. 티셔츠를 갤 때의 물리적 동작이 데이터를 수집한 로봇과 크게 다르기 때문이다. 데이터를 모은 정적 양팔 로봇은 UR5e보다 훨씬 작아서, 크기와 배치와 형상이 모두 달라진 UR5e에서는 실질적으로 다른 전략을 써야 한다.

성공률의 기준점도 사람으로 잡는다. π0.7의 성공률은 원본 로봇에서 이 과제의 학습 데이터를 직접 수집했던 전문 teleoperation 조작자들이 UR5e를 처음 다뤘을 때의 성공률과 맞먹는다. 이 조작자들의 teleoperation 경력은 평균 375시간으로, 이미 숙련자에 해당한다는 뜻이다.

### 속도와 최적성 조건화

일반화만이 목표는 아니다. 저자들은 높은 성공률과 빠른 수행을 함께 원한다고 밝히고, 앞선 연구인 RECAP을 끌어온다. RECAP은 robustness와 throughput을 최적화하도록 강화학습으로 policy를 학습하는 알고리즘이다. throughput은 단위 시간에 과제를 얼마나 많이 끝내는지를 재는 지표다.

RECAP은 policy 최적화 수단으로는 효과적이었지만 과제별 specialist를 만들었다. 반면 π0.7은 RECAP으로 최적화했던 과제 전부를 하나의 범용 모델로 수행한다.

| 항목 | 발표 글의 서술 |
|---|---|
| 비교 대상 | 과제별로 RECAP 강화학습을 거친 specialist policy |
| 비교 과제 | 빨래 개기(티셔츠와 반바지), 빨래 개기(가장 어려운 품목), 에스프레소 만들기, 상자 조립 |
| 성공률 | specialist와 같은 수준 |
| throughput | 같거나 때로는 더 높다. 그래프의 y축은 specialist의 throughput으로 정규화했다 |
| 방법 | RECAP 학습 중 생성된 experience를 strategy metadata와 함께 π0.7로 distillation |

발표 글은 여기서 metadata를 strategy metadata라고 부른다. 논문이 쓰는 episode metadata와 같은 것을 가리키는 다른 이름이다.

### 영상으로 공개된 나머지 과제

앞의 통제된 실험 외에도 여러 로봇 플랫폼에서 수행한 과제를 영상으로 나열한다. 재생 시간이 함께 표시된 네 건과 자리표시자만 남은 세 건이다.

- 오이 깎기 (0:49)
- 땅콩버터 샌드위치 만들기 (0:28)
- 윈덱스로 유리문 닦기 (1:15)
- 애호박 깎기 (1:13)
- 청바지 개기, 옷 뒤집기, 문 열고 통과하기

## 다음 방향

발표 글은 한계 대신 다음 그림을 스케치하며 끝난다. π0.7을 emergent compositional generalization과 다양한 prompt 따르기, 그리고 fine-tuning된 specialist가 필요했던 과제에서의 out-of-the-box 성능을 갖춘 단일 통합 모델로 규정한다.

저자들이 그리는 다음 단계는 세 동작이 이어지는 순환이다. 모델이 과제를 푸는 방법을 스스로 생각해보고, prompt를 따르는 능력으로 그 생각을 action에 grounding하고, 결과를 돌아보며 계획을 고치는 흐름이다.

따라서 prompt를 잘 따른다는 성질은 사용자 편의를 위한 기능만이 아니다. 최신 foundation model이 가진 의미 수준의 추론과 문제 해결 능력을 물리 세계에 붙여, 의미 일반화를 물리적 일반화로 옮기는 통로라는 것이 저자들의 관점이다. 글은 채용과 협업 문의로 마무리한다.

## 한계

발표 글 자체에는 정량적 한계 서술이 없다. zero-shot 성공률의 절대 수치나 무엇을 미학습 과제로 볼 것인지의 판정 문제는 논문 쪽에만 실려 있으므로, 한계를 확인하려면 [[physical-ai/ai-2026-pi07-a-steerable-generalist-robotic]] 페이지를 참고한다.

에어프라이어 지식의 출처 추적도 정성적 근거에 머문다. 저자들 스스로 정확한 episode를 특정하기 어렵다고 적었기 때문에, 조합적 일반화라는 해석은 가장 가까운 자료 세 건과 실제 동작의 차이에 기대고 있다.

자료 형식에서 오는 제약도 있다. 이 페이지가 논문 세부를 옮겨오지 않는 이유이기도 하다.

- 본문의 상당 부분이 영상이라 텍스트 추출본에는 `Loading…` 자리표시자만 남는다. 성공률과 throughput 막대그래프의 수치도 같은 이유로 남지 않았다.
- 아키텍처 도식은 인라인 SVG여서 이미지 파일로 저장되지 않았다. 파일로 남은 것은 도식 안에 들어 있던 사진 썸네일 10장과 전체 페이지 스크린샷뿐이며, 썸네일의 크기는 246×171 픽셀 안팎이다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| steerable | 무엇을 할지뿐 아니라 어떻게 할지까지 사용자가 지정할 수 있는 성질. 발표 글 제목의 첫 번째 핵심어다 |
| emergent capability | 학습 데이터에 없던 조합을 모델이 실행해내는 성질 |
| compositional generalization | 학습에서 본 skill을 새로운 조합으로 엮어 미학습 과제를 푸는 능력 |
| subgoal image | 현재 하위 단계가 끝났을 때의 장면을 그린 목표 이미지. 실행 시점에는 world model이 생성한다 |
| strategy metadata | 발표 글이 episode metadata를 부르는 다른 이름. 속도와 품질처럼 어떤 전략으로 수행했는지를 적은 라벨 묶음이다 |
| language coaching | 사람이 하위 단계를 말로 하나씩 안내해 로봇이 과제를 끝내게 하는 방식 |

## 관련 페이지

- [[physical-ai/ai-2026-pi07-a-steerable-generalist-robotic]]: 같은 날 공개된 π0.7 논문. 아키텍처, 실험 수치, ablation, 정량적 한계는 모두 논문 페이지가 담당한다.
- [[physical-ai/physical-intelligence-2025-a-vla-that-learns-from]]: π*0.6 발표 글. 이 글이 distillation 원천으로 언급한 RECAP 강화학습을 다룬다.
- [[physical-ai/amin-2025-pistar06-a-vla-that-learns]]: π*0.6 논문. RECAP의 학습 루프와 specialist policy 구성을 다룬다.
- [[physical-ai/physical-intelligence-2025-a-vla-with-open-world]]: π0.5 발표 글. π0.7이 이어받은 co-training과 개방 환경 일반화의 앞 단계다.
- [[physical-ai/physical-intelligence-2024-our-first-generalist-policy]]: π0 발표 글. flow matching 기반 action expert가 처음 등장한 세대다.
- [[overviews/physical-ai-overview]]: physical-ai 카테고리의 분류 뼈대와 학습 경로 허브.
