---
title: "03-15. Gemini Robotics 1.0 - 모두의 로보틱스 - VLA 입문"
type: article
year: 2026
category: physical-ai
raw_path: raw/articles/jo-2026-gemini-robotics-1-0-vla-primer.md
raw_filename: "jo-2026-gemini-robotics-1-0-vla-primer.md"
source_collection: external
author: "조인령"
url: "https://wikidocs.net/366381"
publisher: "wikidocs.net"
fetched_at: "2026-09-17T21:18:43+0900"
extractor_tier: "chrome"
tags: []
figures:
  - id: fig01
    file: assets/jo-2026-gemini-robotics-1-0-vla-primer/fig01.png
    raw: raw/articles/jo-2026-gemini-robotics-1-0-vla-primer-figures/fig01.png
    caption: "Gemini Robotics overview"
    strategy: fetched
    curated: false
  - id: fig02
    file: assets/jo-2026-gemini-robotics-1-0-vla-primer/fig02.png
    raw: raw/articles/jo-2026-gemini-robotics-1-0-vla-primer-figures/fig02.png
    caption: "Gemini Robotics architecture"
    strategy: fetched
    curated: false
  - id: fig03
    file: assets/jo-2026-gemini-robotics-1-0-vla-primer/fig03.png
    raw: raw/articles/jo-2026-gemini-robotics-1-0-vla-primer-figures/fig03.png
    caption: "Dexterous manipulation examples"
    strategy: fetched
    curated: false
  - id: fig04
    file: assets/jo-2026-gemini-robotics-1-0-vla-primer/fig04.png
    raw: raw/articles/jo-2026-gemini-robotics-1-0-vla-primer-figures/fig04.png
    caption: "Embodied reasoning capabilities"
    strategy: fetched
    curated: false
  - id: fig05
    file: assets/jo-2026-gemini-robotics-1-0-vla-primer/fig05.png
    raw: raw/articles/jo-2026-gemini-robotics-1-0-vla-primer-figures/fig05.png
    caption: "Grasp prediction 1"
    strategy: fetched
    curated: false
  - id: fig06
    file: assets/jo-2026-gemini-robotics-1-0-vla-primer/fig06.png
    raw: raw/articles/jo-2026-gemini-robotics-1-0-vla-primer-figures/fig06.png
    caption: "Grasp prediction 2"
    strategy: fetched
    curated: false
  - id: fig07
    file: assets/jo-2026-gemini-robotics-1-0-vla-primer/fig07.png
    raw: raw/articles/jo-2026-gemini-robotics-1-0-vla-primer-figures/fig07.png
    caption: "Zero-shot and few-shot control"
    strategy: fetched
    curated: false
  - id: fig08
    file: assets/jo-2026-gemini-robotics-1-0-vla-primer/fig08.png
    raw: raw/articles/jo-2026-gemini-robotics-1-0-vla-primer-figures/fig08.png
    caption: "Task performance"
    strategy: fetched
    curated: false
  - id: fig09
    file: assets/jo-2026-gemini-robotics-1-0-vla-primer/fig09.png
    raw: raw/articles/jo-2026-gemini-robotics-1-0-vla-primer-figures/fig09.png
    caption: "Language following result"
    strategy: fetched
    curated: false
  - id: fig10
    file: assets/jo-2026-gemini-robotics-1-0-vla-primer/fig10.png
    raw: raw/articles/jo-2026-gemini-robotics-1-0-vla-primer-figures/fig10.png
    caption: "Generalization benchmark"
    strategy: fetched
    curated: false
  - id: fig11
    file: assets/jo-2026-gemini-robotics-1-0-vla-primer/fig11.png
    raw: raw/articles/jo-2026-gemini-robotics-1-0-vla-primer-figures/fig11.png
    caption: "Generalization comparison"
    strategy: fetched
    curated: false
  - id: fig12
    file: assets/jo-2026-gemini-robotics-1-0-vla-primer/fig12.png
    raw: raw/articles/jo-2026-gemini-robotics-1-0-vla-primer-figures/fig12.png
    caption: "Long-horizon dexterity"
    strategy: fetched
    curated: false
  - id: fig13
    file: assets/jo-2026-gemini-robotics-1-0-vla-primer/fig13.png
    raw: raw/articles/jo-2026-gemini-robotics-1-0-vla-primer-figures/fig13.png
    caption: "Reasoning-enhanced result"
    strategy: fetched
    curated: false
  - id: fig14
    file: assets/jo-2026-gemini-robotics-1-0-vla-primer/fig14.png
    raw: raw/articles/jo-2026-gemini-robotics-1-0-vla-primer-figures/fig14.png
    caption: "Task adaptation result"
    strategy: fetched
    curated: false
  - id: fig15
    file: assets/jo-2026-gemini-robotics-1-0-vla-primer/fig15.png
    raw: raw/articles/jo-2026-gemini-robotics-1-0-vla-primer-figures/fig15.png
    caption: "Embodiment adaptation"
    strategy: fetched
    curated: false
  - id: fig16
    file: assets/jo-2026-gemini-robotics-1-0-vla-primer/page-full.png
    raw: raw/articles/jo-2026-gemini-robotics-1-0-vla-primer-figures/page-full.png
    caption: "전체 페이지 스크린샷"
    strategy: screenshot
    curated: false
---

> 수집 메모 — `scripts/fetch_article.py` 가 사용자의 명시적 URL 지시에 따라 가져왔다 (CLAUDE.md rule #1 의 자료 수집 예외). 추출 tier: `chrome`. 본문은 원문 그대로이며 요약·번역·윤문하지 않았다.
> `category` 는 임시값이므로 Step 3 에서 확정할 것.

---

## Ⅰ. 모델 등장 배경

### Gemini Robotics 1.0 등장 배경

![Gemini Robotics overview](https://static.wikidocs.net/images/page/366381/gh_e52a37f21606.png)

Google DeepMind는 Gemini 2.0을 기반으로 두 가지 로봇 모델을 제안했습니다.

하나는 실제 행동을 직접 생성하는 Gemini Robotics이고, 다른 하나는 로봇에게 필요한 공간 이해와 추론 능력을 강화한 Gemini Robotics-ER입니다.

Gemini Robotics 1.0에서 중요한 특징은 크게 세 가지입니다.

- Generality

하나의 정해진 작업만 수행하는 것이 아니라, 다양한 물체와 환경, 지시에 대응하는 것을 목표로 합니다.

- Interactivity

로봇은 한 번 행동을 정하고 끝나는 것이 아니라, 주변 상황이나 사용자의 지시가 바뀌면 다시 반응할 수 있어야 합니다.

- Dexterity

단순히 물체를 집고 옮기는 것을 넘어, 안경 케이스를 열거나 천을 접고, 헤드폰 줄을 감는 것처럼 정교한 조작을 목표로 합니다.

정리하면, Gemini Robotics 1.0은 시각 이해, 언어 이해, 로봇 행동 생성을 하나로 연결해 실제 물리 세계에서 더 유연하게 행동하는 로봇을 만들기 위한 모델입니다.

## Ⅱ. 배경지식

### 1. Gemini Robotics 1.0을 이해하기 위한 두 모델

Gemini Robotics 1.0을 이해하려면 먼저 두 모델을 구분해야 합니다.

하나는 Gemini Robotics-ER이고, 다른 하나는 Gemini Robotics입니다.

Gemini Robotics-ER는 행동하기 전에 장면을 이해하고 추론하는 모델에 가깝고, Gemini Robotics는 그 이해를 실제 로봇 행동으로 바꾸는 VLA 모델에 가깝습니다.

#### 1-1. Gemini Robotics-ER란 무엇인가

Gemini Robotics-ER에서 ER은 Embodied Reasoning을 뜻합니다.

Embodied reasoning은 직역하면 "몸을 가진 존재의 추론" 정도로 볼 수 있습니다.

일반적인 VLM은 이미지를 보고 "컵이 있다", "테이블 위에 바나나가 있다"처럼 말할 수 있습니다. 하지만 로봇에게 필요한 이해는 여기서 끝나지 않습니다.

로봇은 다음과 같은 질문에 답할 수 있어야 합니다.

- 컵은 어디에 있는가?
- 컵의 어느 부분을 잡아야 하는가?
- 그 주변에 장애물은 없는가?
- 손을 어떤 경로로 움직이면 되는가?
- 이 행동은 안전한가?
- 지금 상태에서 다음 행동은 무엇인가?

즉, 로봇에게 필요한 이해는 단순한 이미지 설명이 아니라 행동으로 이어질 수 있는 공간적, 물리적 이해입니다.

논문은 Gemini Robotics-ER가 object detection, pointing, trajectory prediction, grasp prediction, multi-view correspondence, 3D bounding box prediction 같은 로봇 관련 능력을 갖도록 Gemini 2.0의 embodied reasoning 능력을 확장한다고 설명합니다.

쉽게 말하면 Gemini Robotics-ER는 로봇의 "눈과 머리"에 가깝습니다.

장면을 보고, 어디를 봐야 하는지 판단하고, 어디를 잡아야 하는지 추론하고, 어떤 행동이 가능한지 생각하는 역할을 합니다.

#### 1-2. Gemini Robotics란 무엇인가

Gemini Robotics는 이미지를 보고, 자연어 지시를 이해한 뒤, 로봇이 실행할 수 있는 행동을 출력합니다.

다른 VLA 모델들도 행동을 token처럼 다루며 VLM과 로봇 action을 연결했습니다. 하지만 Gemini Robotics는 더 직접적으로 로봇 제어를 목표로 합니다.

논문은 Gemini Robotics를 Gemini에서 파생되어 robot action을 직접 예측하도록 fine-tuning된 모델로 설명합니다. 이 모델은 현재 장면 이미지들과 task instruction을 입력으로 받고, 로봇이 실행할 수 있는 action chunk를 출력합니다.

일반적으로 로봇 제어에서는 한 순간의 action만 내보내는 방식도 있습니다. 하지만 이렇게 하면 모델이 매 순간 아주 빠르게 예측해야 하고, 추론이 조금만 늦어져도 움직임이 끊길 수 있습니다.

앞선 [03-05. ACT](https://wikidocs.net/366371)나 [03-07. Pi-0](https://wikidocs.net/366373) 같은 모델들에서 설명했듯이, action chunk는 "앞으로 아주 짧은 시간 동안 이렇게 움직여라"에 가까운 행동 덩어리를 출력합니다.

이 방식은 로봇이 더 부드럽게 움직이고, 모델 추론 지연에도 더 안정적으로 반응하는 데 도움이 됩니다.

#### 1-3. 왜 두 모델이 함께 필요한가

Gemini Robotics-ER와 Gemini Robotics는 서로 다른 문제를 해결합니다.

Gemini Robotics-ER는 물리 세계를 이해하는 능력에 집중합니다.

반면 Gemini Robotics는 그 이해를 실제 로봇 행동으로 바꾸는 데 집중합니다.

정리하면 Gemini Robotics-ER는 행동 전의 공간 이해와 추론을 담당하고, Gemini Robotics는 그 결과를 실제 로봇 행동으로 변환하는 모델입니다. 두 모델을 함께 보면 Gemini Robotics 1.0은 단순한 VLA 모델이 아니라, 이해와 행동을 연결하려는 embodied AI 시스템에 가깝습니다.

## Ⅲ. 모델 구조

### 1. Gemini Robotics 1.0의 전체 구조

Gemini Robotics의 구조는 크게 두 부분으로 나눌 수 있습니다.

첫 번째는 cloud에서 동작하는 Gemini Robotics backbone입니다.

두 번째는 로봇 내부 컴퓨터에서 동작하는 local action decoder입니다.

![Gemini Robotics architecture](https://static.wikidocs.net/images/page/366381/gh_05bbe7b13566.png)

#### 1-1. Cloud backbone과 local action decoder

Gemini Robotics의 backbone은 cloud에서 실행됩니다.

이 backbone은 장면 이미지와 자연어 instruction을 입력받고, 로봇이 해야 할 행동을 결정하는 핵심 역할을 합니다.

하지만 대형 VLM을 그대로 로봇에 연결하면 문제가 생깁니다.

대형 모델은 성능이 좋지만 연산량이 많아 추론에 시간이 걸리고, 특수 하드웨어가 필요할 수 있습니다. 로봇 제어에서는 이 지연이 큰 문제가 됩니다. 로봇은 실제 세계에서 움직이고 있기 때문에, 모델이 늦게 답하면 이미 상황이 바뀌어 있을 수 있습니다.

그래서 Gemini Robotics는 backbone과 local action decoder를 나눕니다.

논문은 Gemini Robotics가 대형 모델의 추론 지연을 줄이기 위해 backbone을 최적화하고, 로봇 내부의 local action decoder와 결합했다고 설명합니다. 핵심은 대형 멀티모달 모델의 이해 능력을 유지하면서도, 실제 로봇 제어에 필요한 반응성과 부드러운 움직임을 확보하려 했다는 점입니다.

큰 모델의 이해 능력은 유지하되, 실제 제어는 local decoder가 보완하도록 설계했습니다.

쉽게 말하면 다음과 같습니다.

- Cloud backbone: 지금 무엇을 해야 하는지 이해하는 두뇌
- Local action decoder: 그 판단을 실제 로봇 움직임으로 바꾸는 신경계

#### 1-2. 입력: 이미지와 자연어 instruction

Gemini Robotics의 입력은 현재 장면을 보여주는 이미지들과 사용자의 자연어 지시입니다.

예를 들어 로봇에게 다음과 같은 지시가 주어질 수 있습니다.

- "open the eyeglasses case"
- "pour pulses"
- "unfasten file folder"
- "wrap headphone wire"

이런 작업들은 단순 pick-and-place보다 훨씬 어렵습니다. 안경 케이스를 열려면 케이스의 방향과 여는 부분을 이해해야 하고, 곡물을 붓기 위해서는 용기를 잡고 기울이는 동작이 필요합니다. 헤드폰 줄을 감으려면 줄처럼 형태가 변하는 물체를 다뤄야 합니다.

논문 Figure 15는 이러한 dexterous manipulation 예시를 보여줍니다.

![Dexterous manipulation examples](https://static.wikidocs.net/images/page/366381/gh_7b5d62539dd8.png)

#### 1-3. 출력: action chunk

Gemini Robotics는 실제 low-level robot control에 더 가까운 action chunk를 생성합니다.

로봇은 이 action chunk를 실행하면서 계속 장면을 관찰하고, 상황이 바뀌면 다시 새로운 action chunk를 출력하여 움직입니다.

이 점에서 Gemini Robotics는 closed-loop control에 가깝습니다.

한 번 계획을 세우고 그대로 끝까지 실행하는 것이 아니라, 현재 장면을 보고 행동하고, 다시 보고 행동을 수정합니다.

이 구조는 실제 로봇 환경에서 중요합니다.

현실 세계에서는 물체가 미끄러질 수도 있고, 사람이 물건을 옮길 수도 있고, 로봇의 손이 목표 위치에서 조금 벗어날 수도 있습니다. 이런 상황에서 로봇은 계속 관찰하고 다시 조정해야 합니다.

DeepMind 공식 블로그도 Gemini Robotics가 주변 변화나 instruction 변화를 감지하고 행동을 조정할 수 있으며, 물체가 미끄러지거나 누군가 물건을 옮겨도 다시 계획하고 계속 수행한다고 설명합니다.

#### 1-4. 학습 데이터

Gemini Robotics는 ALOHA 2 로봇 fleet을 사용해 12개월 동안 수집한 대규모 teleoperation robot action dataset으로 학습되었습니다.

논문은 이 데이터가 수천 시간의 real-world expert robot demonstration으로 구성되어 있으며, 다양한 task, object, difficulty, episode horizon, dexterity requirement를 포함한다고 설명합니다. 또한 학습에는 robot action data뿐 아니라 web documents, code, image, audio, video, embodied reasoning, visual question answering data 같은 non-action data도 함께 사용되었습니다.

이 부분은 Gemini Robotics의 성격을 이해하는 데 중요합니다.

Gemini Robotics는 로봇 데이터만으로 학습된 모델이 아닙니다.

실제 움직임을 배우는 데는 robot action data가 필요하지만, 장면을 이해하고 언어 지시를 해석하고 새로운 상황에 일반화하는 데는 Gemini 기반 멀티모달 지식이 함께 사용됩니다.

즉, Gemini Robotics의 성능은 다음 두 가지가 결합된 결과입니다.

- 실제 로봇의 행동 데이터를 통해 배운 물리적 조작 능력
- Gemini 기반 멀티모달 모델이 가진 시각, 언어, 세계 이해 능력

이 점에서 Gemini Robotics는 다른 모델들과 달리 로봇 데이터만을 중심으로 한 정책도 아니고, VLM의 출력 공간에 action token을 연결한 초기 VLA도 아닙니다.

더 직접적으로 로봇 조작을 수행하기 위해 설계된 Gemini 기반 VLA 모델이라고 볼 수 있습니다.

### 2. Gemini Robotics-ER의 역할

Gemini Robotics 1.0에서 Gemini Robotics-ER는 단순한 보조 모델이 아닙니다.

논문은 Gemini Robotics가 Gemini Robotics-ER 위에 구축된다고 설명합니다. 즉, ER 모델은 Gemini Robotics의 행동 능력을 뒷받침하는 중요한 기반입니다.

#### 2-1. 공간 이해와 pointing

Gemini Robotics-ER는 로봇이 물리 세계를 이해하기 위해 필요한 여러 능력을 강화합니다.

대표적인 능력은 다음과 같습니다.

- 2D object detection
- 2D pointing
- 2D trajectory prediction
- top-down grasp prediction
- multi-view correspondence
- 3D bounding box detection

object detection은 물체의 위치를 찾는 능력입니다.

pointing은 특정 물체나 물체의 특정 부분을 점으로 가리키는 능력입니다.

trajectory prediction은 어떤 경로로 움직일 수 있을지 예측하는 능력입니다.

grasp prediction은 어디를 잡으면 좋을지 판단하는 능력입니다.

3D bounding box detection은 물체를 2D 이미지 속 평면 물체로만 보는 것이 아니라, 3차원 공간 안의 크기와 위치를 추정하는 능력입니다.

논문은 Gemini 2.0과 Gemini Robotics-ER가 open-vocabulary language query를 기반으로 물체와 공간 개념을 다룰 수 있다고 설명합니다. 예를 들어 단순히 "컵"을 찾는 것뿐 아니라, "잡기 좋은 위치", "비어 있는 공간", "오른쪽에 있는 물체"처럼 로봇 행동과 관련된 공간적 표현도 처리할 수 있습니다.

![Embodied reasoning capabilities](https://static.wikidocs.net/images/page/366381/gh_f211129056c5.png)

#### 2-2. Grasp prediction과 trajectory prediction

로봇 제어에서 "무엇을 잡을지"만큼 중요한 것은 "어디를 잡을지"입니다.

예를 들어 컵을 잡는다고 해도 컵의 몸통을 잡을지, 손잡이를 잡을지에 따라 행동이 달라집니다.

바나나도 가운데를 잡을지, 끝부분을 잡을지에 따라 task 성공 여부와 이후 움직임이 달라집니다.

Gemini Robotics-ER는 Gemini 2.0의 pointing 능력을 확장해 top-down grasp pose를 예측합니다. 논문은 grasp prediction이 Gemini Robotics-ER에서 새롭게 도입된 기능이며, 물체의 특정 부분을 자연어로 지정해 grasp를 예측할 수 있다고 설명합니다.

![Grasp prediction 1](https://static.wikidocs.net/images/page/366381/gh_b90b372a71e8.png)

![Grasp prediction 2](https://static.wikidocs.net/images/page/366381/gh_5ab23bb3f59e.png)

#### 2-3. Zero-shot / few-shot robot control

Gemini Robotics-ER는 직접 VLA action chunk를 출력하는 모델은 아니지만, code generation과 robot API를 통해 로봇 제어에 연결될 수 있습니다.

논문은 Gemini 2.0과 Gemini Robotics-ER이 perception, state estimation, spatial reasoning, planning, control 단계를 하나의 모델 안에서 수행할 수 있다고 설명합니다. 이때 로봇 API를 제공하면 모델이 코드를 생성해 로봇을 움직이는 방식으로 zero-shot control을 수행합니다.

![Zero-shot and few-shot control](https://static.wikidocs.net/images/page/366381/gh_2af9ae1a96f7.png)

실험에서 Gemini Robotics-ER는 기존 Gemini 2.0 Flash보다 로봇 제어와 관련된 추론 과제에서 더 나은 모습을 보였습니다. 다만 이 방식은 직접 action chunk를 출력하는 VLA 방식과는 다르며, 복잡하고 정교한 조작에는 end-to-end action model인 Gemini Robotics가 필요합니다.

정리하면 Gemini Robotics-ER은 그 자체로도 로봇 제어에 활용될 수 있지만, 가장 중요한 역할은 Gemini Robotics가 행동을 만들기 전에 필요한 물리 세계 이해 능력을 제공하는 것입니다.

## Ⅳ. 결과

### 1. 기본 실험 결과

Gemini Robotics의 실험은 크게 세 가지 질문을 중심으로 볼 수 있습니다.

첫째, 다양한 dexterous manipulation task를 수행할 수 있는가.

둘째, 자연어 지시를 세밀하게 따라갈 수 있는가.

셋째, 새로운 물체, 배경, 지시, 초기 조건에도 일반화할 수 있는가.

#### 1-1. 다양한 조작 작업 수행

Gemini Robotics는 short-horizon dexterous task에서 기존 baseline보다 높은 성능을 보였습니다.

논문은 여러 실제 환경에서 다양한 조작 작업을 평가합니다. 작업은 단순한 물체 이동뿐 아니라, 천 접기나 줄 감기처럼 형태가 변하는 물체를 다루는 과제까지 포함합니다.

![Task performance](https://static.wikidocs.net/images/page/366381/gh_3200b3456f10.png)

여기서 중요한 것은 Gemini Robotics가 단순히 딱딱한 물체를 집고 옮기는 작업에만 강한 것이 아니라는 점입니다.

논문은 Gemini Robotics가 "fold pink cloth", "wrap the wire around the headphone" 같은 deformable object manipulation에서 강점을 보였고, baseline은 이런 작업에서 어려움을 겪었다고 설명합니다. 또한 "open pink folder", "insert red block", "wrap the wire around the headphone" 같은 어려운 작업에서는 Gemini Robotics만 non-zero success를 보였다고 말합니다.

천, 줄, 폴더 같은 물체는 잡는 위치와 힘에 따라 형태가 변합니다.

따라서 이런 작업은 "물체 중심 좌표로 이동해서 집기"만으로는 해결하기 어렵습니다.

이 결과는 Gemini Robotics가 단순한 위치 기반 조작을 넘어, 더 정교한 물리 상호작용을 다루기 시작했다는 점을 보여줍니다.

Gemini Robotics가 이런 작업에서 성능을 보였다는 것은, VLA 모델이 점점 더 실제 생활에 가까운 조작 문제로 이동하고 있음을 의미합니다.

#### 1-2. 자연어 지시 수행 능력

두 번째 실험은 자연어 지시를 얼마나 세밀하게 따를 수 있는지를 평가합니다.

논문은 25개의 language instruction을 다섯 개의 다양한 scene에서 평가했습니다. 여기에는 학습 장면뿐 아니라 unseen object와 unseen receptacle이 포함된 새로운 장면도 포함됩니다. 평가 instruction은 "clean the table"처럼 추상적인 지시가 아니라, "Place the blue clip to the right of the yellow sticky notes"처럼 세밀한 공간 관계를 요구하는 지시입니다.

![Language following result](https://static.wikidocs.net/images/page/366381/gh_d8e8ae9f7bec.png)

이 실험이 중요한 이유는 로봇에게 언어가 단순한 task label이 아니라는 점을 보여주기 때문입니다.

예를 들어 "blue clip"이라는 표현은 물체 이름만 보는 것이 아니라 색상과 물체 종류를 함께 이해해야 합니다.

"to the right of the yellow sticky notes"는 물체 간 공간 관계를 이해해야 합니다.

"bottom compartment of the caddy"는 물체의 부분 구조와 위치 표현을 함께 이해해야 합니다.

논문은 Gemini Robotics가 novel object와 fine-grained instruction이 있는 challenging scene에서 baseline보다 더 효과적이었다고 설명합니다.

특히 PaliGemma 기반 re-implement baseline은 학습 중 본 물체에는 접근할 수 있었지만, "top black container", "blue clip" 같은 descriptive language attribute와 unseen object 조건에서는 어려움을 겪었다고 설명합니다.

즉, Gemini Robotics의 언어 이해는 단순히 "문장을 읽는다"가 아닙니다.

언어를 통해 로봇 행동을 세밀하게 조정하는 능력에 가깝습니다.

#### 1-3. 세 가지 일반화: visual, instruction, action

Gemini Robotics의 일반화 평가는 세 가지 축으로 나뉩니다.

- Visual generalization

배경, 조명, distractor, texture가 달라져도 같은 행동을 수행할 수 있는지를 봅니다.

- Instruction generalization

Paraphrase, typo, 다른 언어, 구체성 차이가 있는 표현을 이해할 수 있는지를 봅니다.

- Action generalization

이는 물체의 초기 위치가 달라지거나, 물체 instance의 크기, 형태, 물리적 특성이 달라져도 이전에 배운 움직임을 새로운 조건에 맞게 조정할 수 있는지를 평가합니다.

![Generalization benchmark](https://static.wikidocs.net/images/page/366381/gh_1176d11467dc.png)

평가는 학습 분포 안의 작업과 세 가지 일반화 조건을 나누어 구성됩니다. 중요한 점은 Gemini Robotics가 단순히 학습한 작업을 반복한 것이 아니라, 시각 변화, 언어 표현 변화, 행동 조건 변화에 대해 각각 얼마나 견디는지를 따로 검증했다는 것입니다.

논문은 Gemini Robotics가 세 종류의 variation을 baseline보다 더 효과적으로 처리했고, baseline이 catastrophic failure를 보이는 조건에서도 non-zero performance를 보였다고 설명합니다.

![Generalization comparison](https://static.wikidocs.net/images/page/366381/gh_505b608779fc.png)

이 결과가 중요한 이유는 Gemini Robotics의 강점이 단순히 학습한 작업을 잘 수행하는 데만 있지 않다는 점입니다.

로봇이 실제 환경에서 쓰이려면 새로운 배경, 새로운 물체, 새로운 표현, 새로운 초기 상태를 계속 만나게 됩니다.

Gemini Robotics는 이런 변화에 대해 더 강한 일반화를 보였고, 이는 Gemini 기반 VLA 모델이 로봇 행동의 범위를 넓힐 수 있음을 보여줍니다.

### 2. 추가 실험 결과

Gemini Robotics는 기본 모델의 성능만 보여주지 않습니다.

기본 Gemini Robotics가 어디까지 할 수 있고, 추가 fine-tuning을 통해 어떤 방향으로 확장될 수 있는지도 함께 실험합니다.

이 부분은 1.5와 연결되는 전 단계로 볼 수 있습니다.

#### 2-1. Long-horizon dexterity

앞선 실험은 주로 short-horizon dexterous task를 다뤘습니다.

하지만 실제 생활에서는 더 긴 작업이 많습니다.

예를 들어 점심 도시락을 싸는 작업은 물건 하나를 집고 끝나는 것이 아닙니다.

빵을 봉투에 넣고, 봉투를 잠그고, 에너지바를 넣고, 포도를 용기에 담고, 뚜껑을 닫고, 도시락 가방을 지퍼로 잠그는 여러 단계를 포함합니다.

논문은 fine-tuning을 통해 Gemini Robotics가 origami fox 만들기, lunch-box packing, spelling board game, card game, 집게로 샐러드에 재료 넣기 같은 long-horizon dexterous task를 수행할 수 있음을 보여줍니다.

![Long-horizon dexterity](https://static.wikidocs.net/images/page/366381/gh_93927a5152d4.png)

이 결과는 Gemini Robotics가 out-of-the-box generalist 모델로만 쓰이는 것이 아니라, 특정 고난도 작업에 추가 fine-tuning해 specialized skill을 얻을 수 있음을 보여줍니다.

다만 이 부분은 동시에 한계도 드러냅니다.

기본 generalist 모델이 모든 long-horizon dexterous task를 바로 해결한 것은 아니며, 어려운 작업에는 여전히 고품질 추가 데이터와 specialization이 필요합니다.

#### 2-2. Reasoning-enhanced Gemini Robotics

Gemini Robotics의 또 다른 확장 실험은 embodied reasoning을 행동 예측과 더 강하게 연결하는 것입니다.

논문은 reasoning-enhanced version을 통해 one-step reasoning, semantic generalization, spatial understanding이 필요한 real-world robot task를 평가합니다.

예를 들어 "put the Japanese fish delicacy in the lunch-box"라는 지시는 단순히 물체 이름을 아는 것만으로는 부족합니다.

모델은 Japanese fish delicacy가 sushi를 의미한다는 것을 이해하고, 여러 물체 중 sushi를 찾아 lunch-box에 넣어야 합니다.

또 "pack the smallest coke soda in the lunch-box"라는 지시는 크기 비교와 공간 이해가 필요합니다.

논문은 reasoning-enhanced version이 이런 out-of-distribution 상황에서 vanilla Gemini Robotics보다 더 높은 성공률을 보였다고 설명합니다.

![Reasoning-enhanced result](https://static.wikidocs.net/images/page/366381/gh_cb966f97519e.png)

이 부분은 Gemini Robotics 1.0이 단순 action model에 머무르지 않고, 추론과 행동을 더 밀접하게 연결하려는 방향을 보여줍니다.

이 흐름은 이후 Gemini Robotics 1.5의 Thinking VLA와도 자연스럽게 연결됩니다.

#### 2-3. 빠른 task adaptation

Gemini Robotics는 새로운 task에 빠르게 적응할 수 있는지도 실험합니다.

논문은 long-horizon task에서 뽑은 8개 sub-task를 대상으로, demonstration 수를 바꿔가며 fine-tuning 효과를 봅니다.

그 결과 8개 중 7개 task에서 최대 100개 demonstration만으로 50% 이상의 성공률을 달성할 수 있었다고 설명합니다. 논문은 task 복잡도에 따라 이 demonstration 양이 대략 15분에서 1시간 정도의 시연에 해당한다고 설명합니다.

![Task adaptation result](https://static.wikidocs.net/images/page/366381/gh_f74bd276f402.png)

이 결과는 Gemini Robotics가 단순히 학습된 작업만 수행하는 모델이 아니라, 기존에 배운 물리적 상호작용 지식을 바탕으로 새로운 작업을 빠르게 배울 수 있음을 시사합니다.

#### 2-4. 새로운 embodiment로의 adaptation

Gemini Robotics는 ALOHA 2를 중심으로 학습되었지만, 논문은 다른 robot embodiment로의 적응도 실험합니다.

대상은 Bi-arm Franka robot과 Apptronik의 humanoid robot Apollo입니다.

논문은 Gemini Robotics가 새로운 form factor, action, observation을 가진 로봇에도 fine-tuning을 통해 적응할 수 있음을 보여줍니다. 또한 새로운 embodiment로 fine-tuning한 뒤에도 visual disturbance, initial condition perturbation, object shape variation 같은 일반화 평가에서 single-task diffusion baseline보다 더 나은 결과를 보였다고 설명합니다.

![Embodiment adaptation](https://static.wikidocs.net/images/page/366381/gh_5b29924df3af.png)

이 실험은 Gemini Robotics 1.0이 이미 multi-embodiment 방향을 향하고 있었다는 점을 보여줍니다.

다만 여기서의 핵심은 "zero-shot으로 모든 로봇을 바로 제어한다"가 아니라, fine-tuning을 통해 새로운 로봇으로 적응할 수 있다는 점입니다.

이 차이를 정확히 이해해야 합니다.

## Ⅴ. 한계점

### Gemini Robotics 1.0의 한계

Gemini Robotics 1.0의 가장 큰 의미는 VLA 모델이 더 정교한 dexterous manipulation으로 이동했다는 점입니다. 동시에 몇 가지 분명한 한계도 드러납니다.

#### 1. Cloud 기반 구조와 계산 비용

Gemini Robotics 1.0은 강력하지만, cloud backbone과 local action decoder를 함께 사용하는 구조입니다.

이 구조는 대형 Gemini 기반 모델의 이해 능력을 활용할 수 있다는 장점이 있지만, 동시에 네트워크, 추론 인프라, latency, 비용 문제가 생길 수 있습니다.

논문은 latency를 줄이기 위해 distilled backbone과 local decoder를 사용하지만, 여전히 완전히 가벼운 on-device robot policy라고 보기는 어렵습니다.

즉, Gemini Robotics 1.0은 "대형 VLA를 실제 로봇에 연결하는 방법"을 보여주었지만, 모든 환경에서 쉽게 배포 가능한 구조라고 말하기는 어렵습니다.

#### 2. 고난도 long-horizon task에는 specialization이 필요

Gemini Robotics는 다양한 short-horizon dexterous task를 out-of-the-box로 수행할 수 있었지만, 모든 긴 작업을 기본 모델만으로 해결한 것은 아닙니다.

origami fox 만들기나 lunch-box packing 같은 작업은 추가 fine-tuning을 통해 specialization한 결과로 제시됩니다.

즉, Gemini Robotics는 강한 generalist model이지만, 매우 정교하고 긴 작업에서는 여전히 고품질 task-specific data와 fine-tuning이 필요합니다.

이 점은 기존 모델들과 마찬가지로 로봇 데이터 수집 비용 문제가 여전히 남아 있음을 보여줍니다.

#### 3. 완전한 multi-embodiment generalization은 아님

Gemini Robotics는 새로운 embodiment로의 adaptation 가능성을 보여주었습니다.

하지만 1.0 단계에서는 새로운 로봇에 대해 fine-tuning이 필요합니다.

논문도 future work에서 더 적은 데이터로 새로운 robot type에 적응하고, 궁극적으로 zero-shot cross-embodiment transfer를 달성하는 것을 목표로 언급합니다.

즉, Gemini Robotics 1.0은 multi-embodiment 방향의 가능성을 보여주었지만, 아직 모든 로봇에 바로 적용되는 universal robot policy는 아닙니다.

#### 4. 안전성은 별도의 핵심 문제

로봇 모델은 텍스트 모델과 다르게 실제 물리 세계에 영향을 줍니다.

잘못된 답변은 단순한 오답으로 끝날 수 있지만, 잘못된 로봇 행동은 물건을 깨뜨리거나 사람에게 위험을 줄 수 있습니다.

Gemini Robotics 논문은 semantic action safety를 중요한 문제로 다룹니다. 예를 들어 장난감을 뜨거운 난로 위에 놓지 않아야 하고, 알레르기가 있는 사람에게 땅콩을 제공하지 않아야 하며, 칼이 사람을 향하지 않도록 해야 한다는 식의 안전 판단이 필요합니다. 논문은 ASIMOV dataset과 constitutional AI 방법을 통해 이런 안전 문제를 평가하고 개선하려고 했다고 설명합니다.

따라서 Gemini Robotics 1.0의 성능을 볼 때도 안전성을 별도의 문제로 분리해서 봐야 합니다.

로봇이 더 똑똑해졌다는 것과, 실제 생활 공간에 안전하게 배포할 수 있다는 것은 같은 말이 아닙니다.

## Ⅵ. 정리

### Gemini Robotics 1.0 정리

Gemini Robotics 1.0은 Gemini 2.0의 멀티모달 이해 능력을 실제 로봇 행동으로 연결한 VLA 모델입니다.

이 모델은 이미지와 자연어 instruction을 입력받고, 로봇이 실행할 수 있는 action chunk를 출력합니다. 구조적으로는 cloud에서 동작하는 Gemini Robotics backbone과 로봇 내부에서 동작하는 local action decoder로 나뉘며, 이를 통해 대형 모델의 generalization 능력과 실제 로봇 제어에 필요한 반응성을 함께 얻으려 했습니다.

또한 Gemini Robotics 1.0은 Gemini Robotics-ER와 함께 제시되었습니다.

Gemini Robotics-ER는 object detection, pointing, trajectory prediction, grasp prediction, 3D understanding 같은 embodied reasoning 능력을 강화한 모델입니다. 이 모델은 로봇이 행동하기 전에 물리 세계를 이해하고, 어디를 잡고 어디로 움직일지 판단하는 데 중요한 역할을 합니다.

Gemini Robotics 1.0의 실험은 세 가지 점에서 의미가 있습니다.

첫째, 다양한 dexterous manipulation task에서 baseline보다 강한 성능을 보였습니다.

둘째, 세밀한 자연어 instruction을 따라갈 수 있음을 보여주었습니다.

셋째, visual, instruction, action generalization을 분리해 평가했고, 세 종류의 변화에 대해 더 강한 일반화 성능을 보였습니다.

추가 실험에서는 long-horizon dexterous task, reasoning-enhanced control, 빠른 task adaptation, 새로운 embodiment adaptation 가능성도 보여주었습니다.

하지만 완성형은 아닙니다.

cloud 기반 구조와 계산 비용 문제가 남아 있고, 고난도 long-horizon task에는 여전히 specialization이 필요하며, 새로운 embodiment에 대해서도 fine-tuning이 필요합니다. 또한 실제 배포를 위해서는 semantic safety와 물리적 안전성 문제를 별도로 해결해야 합니다.

한 문장으로 정리하면, Gemini Robotics 1.0은 Gemini의 멀티모달 세계 이해를 실제 로봇의 정교한 행동으로 연결하면서, VLA 모델이 physical AI로 확장될 수 있음을 보여준 중요한 단계라고 볼 수 있습니다.

## 참고문헌

Gemini Robotics Team. Gemini Robotics: Bringing AI into the Physical World. arXiv, 2025.

Google DeepMind. Gemini Robotics brings AI into the physical world. 2025.
