---
title: "03-03. RT-1 - 모두의 로보틱스 - VLA 입문"
type: article
year: 2026
category: physical-ai
raw_path: raw/articles/jo-2026-rt-1-vla-primer.md
raw_filename: "jo-2026-rt-1-vla-primer.md"
source_collection: external
author: "조인령"
url: "https://wikidocs.net/366369"
publisher: "wikidocs.net"
fetched_at: "2026-08-08T23:30:07+0900"
extractor_tier: "chrome"
tags: []
figures:
  - id: fig01
    file: assets/jo-2026-rt-1-vla-primer/fig01.png
    raw: raw/articles/jo-2026-rt-1-vla-primer-figures/fig01.png
    caption: "RT-1 개요 Figure 1"
    strategy: fetched
    curated: true
  - id: fig02
    file: assets/jo-2026-rt-1-vla-primer/fig02.png
    raw: raw/articles/jo-2026-rt-1-vla-primer-figures/fig02.png
    caption: "RT-1 실제 환경 및 시스템 Figure 2 개요"
    strategy: fetched
    curated: false
  - id: fig03
    file: assets/jo-2026-rt-1-vla-primer/fig03.png
    raw: raw/articles/jo-2026-rt-1-vla-primer-figures/fig03.png
    caption: "RT-1 tokenized action 예시"
    strategy: fetched
    curated: false
  - id: fig04
    file: assets/jo-2026-rt-1-vla-primer/fig04.png
    raw: raw/articles/jo-2026-rt-1-vla-primer-figures/fig04.png
    caption: "RT-1 모델 구조 Figure 3"
    strategy: fetched
    curated: true
  - id: fig05
    file: assets/jo-2026-rt-1-vla-primer/fig05.png
    raw: raw/articles/jo-2026-rt-1-vla-primer-figures/fig05.png
    caption: "RT-1 robot classroom Figure 2a"
    strategy: fetched
    curated: false
  - id: fig06
    file: assets/jo-2026-rt-1-vla-primer/fig06.png
    raw: raw/articles/jo-2026-rt-1-vla-primer-figures/fig06.png
    caption: "RT-1 mobile manipulator Figure 2d"
    strategy: fetched
    curated: false
  - id: fig07
    file: assets/jo-2026-rt-1-vla-primer/fig07.png
    raw: raw/articles/jo-2026-rt-1-vla-primer-figures/fig07.png
    caption: "RT-1 skill 구성 Table 1"
    strategy: fetched
    curated: false
  - id: fig08
    file: assets/jo-2026-rt-1-vla-primer/fig08.png
    raw: raw/articles/jo-2026-rt-1-vla-primer-figures/fig08.png
    caption: "RT-1 object diversity Figure 2e-f"
    strategy: fetched
    curated: false
  - id: fig09
    file: assets/jo-2026-rt-1-vla-primer/fig09.png
    raw: raw/articles/jo-2026-rt-1-vla-primer-figures/fig09.png
    caption: "RT-1 robustness Figure 4"
    strategy: fetched
    curated: false
  - id: fig10
    file: assets/jo-2026-rt-1-vla-primer/fig10.png
    raw: raw/articles/jo-2026-rt-1-vla-primer-figures/fig10.png
    caption: "RT-1 주요 결과 Table 2"
    strategy: fetched
    curated: true
  - id: fig11
    file: assets/jo-2026-rt-1-vla-primer/fig11.png
    raw: raw/articles/jo-2026-rt-1-vla-primer-figures/fig11.png
    caption: "RT-1 kitchen generalization Table 3"
    strategy: fetched
    curated: false
  - id: fig12
    file: assets/jo-2026-rt-1-vla-primer/fig12.png
    raw: raw/articles/jo-2026-rt-1-vla-primer-figures/fig12.png
    caption: "RT-1 kitchen qualitative Figure 5"
    strategy: fetched
    curated: false
  - id: fig13
    file: assets/jo-2026-rt-1-vla-primer/fig13.png
    raw: raw/articles/jo-2026-rt-1-vla-primer-figures/fig13.png
    caption: "RT-1 simulation transfer Table 4"
    strategy: fetched
    curated: false
  - id: fig14
    file: assets/jo-2026-rt-1-vla-primer/fig14.png
    raw: raw/articles/jo-2026-rt-1-vla-primer-figures/fig14.png
    caption: "RT-1 heterogeneous robot data 결과"
    strategy: fetched
    curated: false
  - id: fig15
    file: assets/jo-2026-rt-1-vla-primer/fig15.png
    raw: raw/articles/jo-2026-rt-1-vla-primer-figures/fig15.png
    caption: "RT-1 long-horizon Table 6"
    strategy: fetched
    curated: false
  - id: fig16
    file: assets/jo-2026-rt-1-vla-primer/fig16.png
    raw: raw/articles/jo-2026-rt-1-vla-primer-figures/fig16.png
    caption: "RT-1 데이터 양과 다양성 Table 7"
    strategy: fetched
    curated: false
  - id: fig17
    file: assets/jo-2026-rt-1-vla-primer/fig17.png
    raw: raw/articles/jo-2026-rt-1-vla-primer-figures/fig17.png
    caption: "RT-1 설계 ablation Table 13"
    strategy: fetched
    curated: true
  - id: fig18
    file: assets/jo-2026-rt-1-vla-primer/page-full.png
    raw: raw/articles/jo-2026-rt-1-vla-primer-figures/page-full.png
    caption: "전체 페이지 스크린샷"
    strategy: screenshot
    curated: false
---

> 수집 메모 — `scripts/fetch_article.py` 가 사용자의 명시적 URL 지시에 따라 가져왔다 (CLAUDE.md rule #1 의 자료 수집 예외). 추출 tier: `chrome`. 본문은 원문 그대로이며 요약·번역·윤문하지 않았다.
> `category` 는 임시값이므로 Step 3 에서 확정할 것.

---

## Ⅰ. 모델 등장 배경

### 1. 들어가기에 앞서

RT-1은 로봇에서도 하나의 큰 모델이 여러 작업을 학습하고 일반화할 수 있는가를 묻는 논문입니다.

자연어 처리와 비전에서는 대규모 데이터와 고용량 모델이 범용성을 크게 높였지만, 로봇에서는 이런 흐름이 아직 충분히 검증되지 않았습니다. 가장 큰 이유는 로봇 데이터가 비싸고 모으기 어렵기 때문입니다.

텍스트나 이미지는 인터넷에서 대규모로 모을 수 있지만, 로봇 데이터는 실제 로봇을 움직이고, 환경을 준비하고, 사람의 시연까지 필요합니다. 그래서 기존 로봇 학습은 주로 특정 작업을 위한 데이터를 모아 특정 작업용 정책을 학습하는 방식으로 발전해 왔습니다.

이 방식은 하나의 작업에서는 강건할 수 있지만, 새로운 작업이나 새로운 환경에는 약합니다. 예를 들어 물체가 바뀌거나, 배경이 달라지거나, instruction 조합이 달라지면 다시 데이터를 모으고 다시 학습해야 하는 경우가 많습니다.

논문은 바로 이 한계를 출발점으로 삼습니다. 즉, 로봇도 하나의 큰 모델이 다양한 작업 경험을 학습하고, 새로운 task, object, environment에 일반화할 수 있는지를 묻습니다.

RT-1이 중요한 이유는 단순히 Transformer를 사용했기 때문이 아닙니다. 이 논문은 두 가지 문제를 함께 다룹니다.

첫째, 다양한 실제 로봇 데이터를 하나의 모델에 학습시킬 수 있는가입니다.

둘째, 그 모델이 실제 로봇 위에서 돌아갈 만큼 충분히 빨라야 한다는 점입니다.

논문은 Transformer가 multi-task learning에 유리하다고 보면서도, 동시에 로봇 controller는 real-time으로 동작해야 한다고 강조합니다.

즉, RT-1은 다음 질문에 대한 답을 찾는 논문이라고 볼 수 있습니다.

- 로봇에서도 범용 backbone model이 가능할까
- 대규모 multi-task 데이터가 generalization을 높일 수 있을까
- 그런 모델을 실제 제어에 쓸 수 있을 만큼 효율적으로 만들 수 있을까

이 장에서는 RT-1을 단순한 모델 소개로 보지 않고, 로봇 학습이 task-specific 방식에서 generalist policy로 넘어가는 과정에서 등장한 중요한 전환점으로 읽어보려고 합니다. 먼저 필요한 기초 개념을 정리하고, 그다음 기존 연구의 한계, RT-1의 문제 설정, 모델 구조, 데이터, 실험 결과, 그리고 이후 VLA 흐름까지 차례대로 살펴보겠습니다.

## Ⅱ. 배경지식

### 1. 기초 개념

#### 1-1. 정책(policy)이란 무엇인가

로봇 학습에서 가장 중요한 개념 중 하나는 정책(policy)입니다.

정책은 쉽게 말해, 현재 상황을 보고 다음 행동을 정하는 함수입니다. RT-1 논문에서도 정책은 이미지와 언어 instruction을 입력받아 action distribution을 만들고, 그로부터 행동을 선택해 로봇에 적용하는 대상으로 설명됩니다.

즉, 정책은 “무엇을 분류하는 모델”이 아니라, 로봇이 다음에 어떻게 움직일지를 결정하는 모델입니다.

#### 1-2. episode와 timestep

로봇은 한 번만 판단하고 끝나지 않습니다.

처음 시점에는 instruction과 초기 이미지가 주어지고, 정책은 첫 action을 출력합니다. 그 action이 실행되면 장면이 바뀌고, 정책은 다시 새로운 이미지를 보고 다음 action을 출력합니다. 이런 과정이 반복되다가 작업이 끝나면 멈춥니다.

논문은 이 전체 상호작용을 episode라고 부릅니다. 즉, episode는 작업 시작부터 종료까지의 한 번의 전체 시도입니다.

episode 안에는 여러 개의 timestep이 있습니다. 각 timestep에서 로봇은 현재 이미지를 보고, 정책이 action을 만들고, 그 action이 실제로 적용됩니다. 이런 timestep이 이어지면서 하나의 작업이 완성됩니다.

그래서 로봇 정책은 정적인 입력 하나를 처리하는 모델이 아니라, 시간에 따라 반복적으로 행동을 내는 sequential decision-making system으로 이해해야 합니다.

#### 1-3. imitation learning과 behavioral cloning

RT-1은 강화학습으로 처음부터 시행착오를 하며 배우기보다, 성공한 시연 데이터를 보고 따라 배우는 방식에 가깝습니다.

논문은 이를 behavioral cloning으로 설명합니다. 즉, 사람이나 기존 시스템이 수행한 성공 trajectory를 데이터셋으로 모아두고, 그 상황에서 어떤 action이 나왔는지를 맞히도록 정책을 학습합니다.

간단히 말해, 잘한 예시를 보고 그대로 모사하는 방식입니다.

#### 1-4. 로봇 action의 구성

그렇다면 로봇의 action은 무엇일까요?

로봇 action은 단순한 클래스 하나가 아닙니다. RT-1에서는 arm movement 7차원, base movement 3차원, 그리고 모드를 나타내는 1차원으로 구성됩니다.

즉, 로봇 행동은 “왼쪽으로 가라”처럼 하나의 명령이 아니라, 팔, 바퀴, 그리퍼, 종료 여부를 함께 포함하는 복합 제어 신호입니다.

#### 1-5. RT-1을 vision-language-action policy로 보는 이유

RT-1은 이미지와 자연어 instruction을 함께 입력으로 받습니다.

예를 들어 “pick apple from top drawer and place on counter” 같은 instruction이 주어지고, 로봇은 현재 카메라 이미지를 함께 봅니다.

즉, 이 모델은 “무엇을 하라”는 언어와 “지금 장면이 어떤가”라는 시각 정보를 동시에 보고 행동을 정합니다. 그래서 RT-1은 vision-language-action policy라고 이해할 수 있습니다.

정리하면, RT-1을 이해하기 위해 먼저 잡아야 할 개념은 다음과 같습니다.

- 정책은 현재 상황에서 다음 행동을 정하는 모델이고,
- episode는 작업 전체 시도이며,
- imitation learning은 성공 시연을 따라 배우는 방식입니다.
- 그리고 로봇의 action은 여러 제어 차원이 묶인 복합 신호이며,
- RT-1은 이미지와 instruction을 함께 보고 그 action을 예측하는 모델입니다.

### 2. 기존 연구의 한계

RT-1 이전의 로봇 학습은 대체로 특정 작업을 위한 데이터를 모으고, 그 작업을 수행하는 정책을 따로 학습하는 방식이었습니다. 논문은 이를 single-task 또는 좁은 multi-task 학습으로 설명합니다.

이런 방식은 정해진 작업에서는 잘 동작할 수 있지만, 새로운 작업이 들어오면 다시 데이터를 모으고 다시 학습해야 하는 문제가 있습니다.

 markdown_tags 

자세히 알아보기

과학

철학

robot

#### 2-1. task-specific 구조

기존 정책은 주어진 작업을 잘 수행하도록 맞춰져 있었지만, 새로운 object나 새로운 instruction 조합, 새로운 environment에는 쉽게 약해졌습니다. 즉, 하나의 작업을 잘하는 것과 여러 작업에 일반화하는 것은 다른 문제인데, 기존 연구는 전자에 더 가까웠습니다.

#### 2-2. 데이터 확장

비전과 NLP는 대규모 데이터를 활용해 범용 모델로 발전했지만, 로봇은 실제 장비와 사람의 시연이 필요하기 때문에 데이터 수집 비용이 훨씬 큽니다. 그래서 데이터가 작고 파편화되기 쉽고, 모델도 넓은 작업 범위를 충분히 학습하기 어렵습니다. RT-1 논문은 좋은 일반화를 위해 데이터의 양뿐 아니라 다양성과 연결성이 중요하다고 말합니다.

#### 2-3. generalization 평가의 부족

논문은 기존 대형 로봇 정책들도 한계가 있다고 봅니다. 예를 들어 Gato는 generalist 방향을 보여주었지만, 실제 로봇 작업의 범위가 넓지 않았고 새로운 real-world task에 대한 일반화 평가도 충분하지 않았다고 설명합니다. 또 일부 instruction-following 연구는 training task 수행에 더 초점이 맞춰져 있었습니다.

#### 2-4. real-time control

Transformer는 많은 작업을 함께 다루는 데 유리하지만, 로봇에서는 추론 속도도 중요합니다. 모델이 아무리 좋아도 실제 제어 주기를 맞추지 못하면 현장에서는 쓰기 어렵습니다. RT-1 논문이 기존 연구와 구분되는 지점도 바로 여기입니다. 성능뿐 아니라 real-time control까지 함께 문제로 다룹니다.

정리하면, 기존 연구의 한계는 다음과 같이 묶을 수 있습니다.

작업별 학습에 머무르기 쉬웠고, 데이터 확장이 어려웠으며, 새로운 task에 대한 일반화가 제한적이었고, 실제 로봇에서 돌릴 만큼 효율적인 구조도 부족했습니다. RT-1은 바로 이 네 가지 문제를 동시에 풀려고 한 연구라고 볼 수 있습니다.

### 3. 시스템 관점의 기초

RT-1을 이해할 때 중요한 점은, 이 논문이 단순히 정확한 예측 모델을 만드는 데서 끝나지 않는다는 것입니다. 로봇 정책은 실제 기계를 움직여야 하므로, 성능만큼이나 속도와 안정성도 중요합니다.

논문이 system overview와 model section에서 계속 real-time control을 강조하는 이유도 여기에 있습니다.

#### 3-1. control frequency

control frequency는 로봇이 1초에 몇 번 새로운 action을 갱신하는지를 뜻합니다. RT-1은 3Hz로 동작합니다. 즉, 1초에 3번 정도 새로운 action을 내립니다.

이 수치는 아주 빠른 로봇 제어라기보다, RT-1이 다루는 조작 작업에 실용적으로 충분한 주기라는 의미에 가깝습니다. 논문은 사람이 이 작업들을 수행하는 속도를 대략 2~4초 수준으로 보고, 모델이 그보다 지나치게 느리지 않게 반응하려면 최소 3Hz 정도는 필요하다고 설명합니다.

#### 3-2. inference latency

inference latency는 모델이 한 번 입력을 받아 action을 내놓는 데 걸리는 시간입니다. 로봇에서는 이 시간이 너무 길면, 이미 장면이 바뀐 뒤에 늦게 반응하게 됩니다. 그래서 RT-1은 좋은 예측 성능뿐 아니라, 실제 제어 주기 안에 들어올 만큼 빠른 추론이 가능해야 한다고 봅니다.

RT-1은 3Hz를 목표로 하므로 한 제어 루프는 약 333ms입니다. 하지만 이 시간을 모델이 전부 쓸 수는 없습니다. 센서 캡처, 전처리, 명령 전달, 로봇 적용 지연도 함께 들어가기 때문입니다. 그래서 논문은 모델 자체의 추론 시간 예산을 100ms 이하로 둡니다.

#### 3-3. closed-loop control

또 하나 중요한 것은 closed-loop control입니다.

RT-1은 한 번 명령을 내리고 끝나는 방식이 아니라, 이미지를 보고 action을 내리고, 다시 이미지를 보고 다음 action을 내리는 식으로 반복적으로 제어합니다. 논문도 정책이 timestep마다 observation을 받고 action distribution을 만든다고 설명합니다.

즉, RT-1은 정적인 예측 모델이 아니라, 계속 관측하고 수정하는 제어 루프 안에서 동작하는 정책입니다.

정리하면, 시스템 관점에서 RT-1을 볼 때 핵심은 세 가지입니다.

- 로봇 정책은 일정한 주기로 action을 갱신해야 합니다.
- 모델은 그 주기 안에 들어올 만큼 충분히 빨라야 합니다.
- 이 모든 것은 실제 로봇의 closed-loop control 안에서 안정적으로 돌아가야 합니다.

RT-1은 바로 이 조건을 만족하는 Transformer 기반 로봇 정책을 만들려는 시도였습니다.

## Ⅲ. 모델 구조

### 1. RT-1의 문제 설정

RT-1은 하나의 로봇 정책이 다양한 실제 작업 데이터를 학습하고, 학습에 없던 새로운 task, object, environment에도 일반화할 수 있는가를 묻습니다. 논문은 이를 하나의 large multi-task backbone model의 가능성으로 제시합니다.

즉, 작업마다 별도의 정책을 만드는 대신, 여러 로봇 경험을 하나의 모델 안에 축적할 수 있는지를 시험하는 것입니다.

![RT-1 개요 Figure 1](https://static.wikidocs.net/images/page/366369/gh_d7da93fe1362.png)

Figure 1은 RT-1의 전체 목표를 한눈에 보여줍니다. 위쪽 그림은 이미지와 자연어 instruction을 입력받아 action을 출력하는 구조를, 아래쪽 그림은 대규모 학습과 실제 평가 범위를 요약합니다. 이 그림이 보여주는 핵심은 RT-1이 단순한 모델 제안이 아니라, 아키텍처와 데이터, 그리고 실제 평가를 함께 묶은 시스템 수준의 연구라는 점입니다.

![RT-1 실제 환경 및 시스템 Figure 2 개요](https://static.wikidocs.net/images/page/366369/gh_842a11157ae8.png)

Figure 2에는 데이터 수집이 이루어진 robot classroom, 평가에 사용된 두 개의 실제 office kitchen, 사용된 mobile manipulator, 그리고 다양한 물체 예시가 함께 정리되어 있습니다. 이 그림은 RT-1이 단순한 toy benchmark가 아니라, 실제 주방형 환경에서 다양한 물체와 조작 문제를 다루는 모델이라는 점을 보여줍니다.

즉, RT-1의 문제 설정에서 말하는 “generalization”은 단순히 문장 조합 수준이 아니라, 실제 환경 변화와 물체 다양성까지 포함하는 개념입니다.

### 2. 입력과 출력

#### 2-1. 입력: 이미지 히스토리와 자연어 instruction

먼저 입력부터 보면, RT-1은 하나의 이미지가 아니라 짧은 이미지 히스토리를 사용합니다.

논문에서는 최근 6장의 이미지를 입력으로 사용합니다. 이는 현재 장면을 한 프레임으로만 보는 것이 아니라, 최근 상태 변화를 함께 보겠다는 뜻입니다. 여기에 자연어 instruction이 함께 들어갑니다.

예를 들어 “pick apple from top drawer and place on counter”처럼, 작업 목표를 설명하는 문장이 주어집니다. 즉, RT-1의 입력은 단순한 시각 정보가 아니라, 시간 축이 포함된 이미지 정보와 작업 의미를 담은 언어 정보의 결합입니다.

#### 2-2. 출력: tokenized action

 markdown_tags 

RT-1은 action을 단일 명령으로 출력하지 않습니다.

출력 action은 arm movement 7개 변수, base movement 3개 변수, 그리고 arm 제어·base 제어·episode 종료를 구분하는 mode variable로 이루어집니다.

여기서 중요한 점은 RT-1이 이 action을 연속값 그대로 다루지 않는다는 것입니다. arm movement에는 x,y,z,roll,pitch,yaw,gripper opening이 포함되고, base movement에는 x,y,yaw가 포함됩니다. mode는 arm 제어, base 제어, episode 종료 중 하나를 고르는 역할을 합니다.

논문은 이러한 action 각 차원을 256개 bin으로 이산화하여 tokenized action으로 예측한다고 설명합니다.

#### 2-3. 왜 continuous action 대신 이산화를 택했는가

RT-1은 행동을 직접 회귀하는 대신, action을 token처럼 다룹니다.

이 선택은 이후 모델 구조를 이해할 때 중요합니다. RT-1이 Transformer 기반 정책이 될 수 있는 이유도, 이미지와 instruction뿐 아니라 action까지 token화된 표현으로 연결했기 때문입니다.

![RT-1 tokenized action 예시](https://static.wikidocs.net/images/page/366369/gh_5a5da5501cbb.png)

정리하면, RT-1의 입력은 최근 이미지 히스토리와 자연어 instruction이고, 출력은 arm, base, mode를 포함한 tokenized action입니다.

즉, RT-1은 “장면을 보고 다음 행동을 예측하는 모델”이면서도, 동시에 “언어 지시에 맞는 행동을 예측하는 모델”입니다. 이 점에서 RT-1은 vision model이나 language model이 아니라, 둘을 결합해 action으로 이어지는 vision-language-action policy라고 볼 수 있습니다.

### 3. 모델 구조

RT-1의 모델 구조는 크게 보면 세 단계로 나눌 수 있습니다. 먼저 이미지와 instruction을 token 형태로 바꾸고, 그다음 중요한 시각 정보를 압축한 뒤, 마지막으로 Transformer가 action token을 예측합니다.

![RT-1 모델 구조 Figure 3](https://static.wikidocs.net/images/page/366369/gh_3c3975e316e8.png)

#### 3-1. 이미지 인코딩: EfficientNet-B3

RT-1의 첫 단계는 이미지 처리입니다.

최근 6장의 이미지를 입력으로 받습니다. 그리고 이 이미지를 바로 Transformer에 넣지 않고, 먼저 EfficientNet-B3라는 이미지 특징 추출기를 통과시킵니다.

여기서 EfficientNet은 쉽게 말해, 사진에서 중요한 시각 패턴을 뽑아주는 backbone입니다. 우리가 사진을 볼 때도 원본 픽셀 하나하나를 그대로 생각하지 않고, 물체의 모양, 위치, 경계 같은 특징을 더 중요하게 보듯이, EfficientNet도 이미지에서 의미 있는 특징을 추출합니다.

RT-1에서는 각 이미지가 최종적으로 9×9×512 크기의 feature map으로 바뀌고, 이를 펼쳐서 81개의 visual token으로 사용합니다. 즉, 원본 이미지 전체를 그대로 다루지 않고, 이미 압축된 시각 특징으로 바꿔서 다음 단계로 넘기는 것입니다.

#### 3-2. 언어 조건 주입: Universal Sentence Encoder와 FiLM

여기서 헷갈리기 쉬운 개념이 FiLM입니다.

RT-1은 이미지만 따로 처리하지 않고, instruction도 이미지 처리 과정에 반영합니다. 이때 쓰이는 것이 FiLM입니다.

FiLM은 간단히 말하면, “이번 작업에 맞게 이미지 특징을 조절하는 장치”입니다. 예를 들어 instruction이 “drawer를 열어라”라면 모델은 drawer 쪽 정보를 더 중요하게 봐야 하고, “apple을 집어라”라면 apple과 gripper 주변 정보가 더 중요해져야 합니다.

RT-1은 instruction을 Universal Sentence Encoder로 임베딩한 뒤, 이 정보를 FiLM layers를 통해 EfficientNet 내부에 넣습니다. 그래서 이미지 처리 단계부터 “이번 작업에서 무엇이 중요한가”를 반영할 수 있습니다.

논문은 이를 통해 task-relevant visual feature를 더 잘 추출한다고 설명합니다.

Universal Sentence Encoder도 이름이 어렵지만 역할은 단순합니다. 이 모델은 자연어 문장을 숫자 벡터로 바꿔주는 문장 임베딩 모델입니다. 즉, instruction 문장을 “컴퓨터가 계산할 수 있는 의미 표현”으로 바꾸는 역할을 합니다.

RT-1은 이 문장 임베딩을 이미지 처리 쪽에 연결해서, language-conditioned vision을 구현합니다.

#### 3-3. TokenLearner: 중요한 시각 정보만 압축하기

이미지에서 나온 81개의 token을 그대로 Transformer에 넣으면 계산량이 커집니다. 그런데 모든 token이 다 동등하게 중요한 것은 아닙니다. 어떤 token은 현재 task와 거의 관계가 없을 수도 있습니다.

TokenLearner는 이 중에서 중요한 정보만 남기고 압축하는 모듈입니다.

논문에서는 81개의 vision-language token을 8개 token으로 줄입니다. 쉽게 말해, RT-1은 “장면 전체를 다 똑같이 보지 말고, 지금 행동을 결정하는 데 중요한 부분만 더 작게 압축해서 보자”는 전략을 쓰는 것입니다.

이 과정이 중요한 이유는, RT-1이 실제 로봇에서 돌아갈 만큼 빠른 속도를 내는 데 크게 기여하기 때문입니다.

#### 3-4. Transformer: action token 예측

RT-1에서는 이미지와 언어에서 나온 token sequence를 받아 action token을 예측하는 데 Transformer가 사용됩니다.

RT-1은 각 이미지에서 8개씩 나온 token을 6장 이미지에 대해 모아 총 48개의 token을 만들고, 여기에 position encoding을 더해 decoder-only Transformer에 넣습니다.

여기서 position encoding은 token의 순서를 알려주는 장치입니다. Transformer는 순서를 원래 직접 알지 못하기 때문에, “이 token이 몇 번째 이미지에서 왔는지” 같은 정보를 따로 넣어줘야 합니다.

여기서 decoder-only Transformer라는 표현도 낯설 수 있습니다. 쉽게 말하면, 앞에서 본 정보를 바탕으로 다음 출력을 차례대로 예측하는 구조입니다. 언어 모델이 다음 단어를 예측하듯, RT-1은 다음 action token을 예측합니다. 다만 여기서의 출력은 문장이 아니라 로봇 행동입니다.

즉, RT-1의 Transformer는 “다음 문장 생성기”가 아니라 “다음 행동 생성기”라고 생각하면 됩니다.

#### 3-5. action tokenization과 학습 방식

출력 쪽에서 중요한 개념은 action tokenization입니다.

로봇 action은 arm 7개 변수, base 3개 변수, mode 1개 변수로 구성됩니다. RT-1은 이 값을 그대로 연속 회귀하지 않고, 각 변수를 256개 구간으로 나눠서 예측합니다. 이것이 action을 token처럼 다룬다는 뜻입니다.

 markdown_tags 

예를 들어 x축 이동값을 바로 실수 하나로 내보내는 대신, “256개 중 몇 번째 구간인가”를 예측하는 식입니다.

입문자 입장에서는 왜 이렇게 복잡하게 하나 싶을 수 있지만, 논문은 이런 이산화가 Transformer 구조와 잘 맞고, 실제로도 더 좋은 성능을 내는 방향이라고 봅니다.

즉, RT-1은 행동도 일종의 “선택 문제”로 바꿔서 풀고 있는 셈입니다.

RT-1은 categorical cross-entropy를 사용합니다. 이는 여러 후보 중 정답에 가까운 선택을 맞히도록 학습하는 방식입니다. action을 256개 bin 중 하나로 예측하기 때문에, 이런 분류형 loss가 자연스럽게 연결됩니다.

#### 3-6. real-time inference를 위한 설계

RT-1은 단순히 정확한 모델이 아니라, 실제 로봇에서 돌아가는 모델이어야 합니다. 그래서 inference speed가 매우 중요합니다.

논문은 사람이 이 작업을 수행하는 속도를 기준으로, 모델이 최소 3Hz 정도로 동작해야 의미가 있다고 봅니다. 이를 위해 TokenLearner로 token 수를 줄이고, 이미지 token을 재사용하는 방식까지 사용해 추론 속도를 높입니다.

즉, RT-1의 구조는 “더 복잡하게 많이 넣은 구조”가 아니라, “중요한 정보만 남겨서 실제 제어 가능한 속도를 맞춘 구조”라고 보는 편이 정확합니다.

정리하면, RT-1의 모델 구조는 다음 흐름으로 이해하면 됩니다.

이미지는 EfficientNet이 특징을 뽑고, instruction은 문장 임베딩으로 바뀐 뒤 FiLM을 통해 이미지 처리에 반영됩니다. 이렇게 만들어진 vision-language token은 TokenLearner로 압축되고, Transformer는 이 압축된 token sequence를 바탕으로 action token을 예측합니다. Figure 3은 바로 이 과정을 가장 잘 보여주는 그림입니다.

복잡한 용어가 많아 보여도, 결국 RT-1은 “이미지와 문장을 함께 이해하고, 중요한 정보만 추려서, 다음 행동을 예측하는 모델”이라고 정리할 수 있습니다.

## Ⅳ. 결과

### 1. 데이터 구성

RT-1에서 데이터는 단순한 학습 재료가 아니라, 모델의 일반화 성능을 결정하는 핵심 요소입니다.

논문도 좋은 generalization을 위해서는 데이터가 단순히 많기만 해서는 안 되고, scale과 breadth를 함께 가져야 한다고 설명합니다. 즉, 데이터 수가 충분히 크면서도, 다양한 task와 object, environment를 포함해야 한다는 뜻입니다.

#### 1-1. 데이터 규모와 수집 방식

RT-1의 데이터 규모는 당시 기준으로 상당히 큽니다.

논문은 13대의 로봇 fleet을 사용해 17개월 동안 약 130k demonstration을 수집했다고 설명합니다. 또한 수행 가능한 instruction 수는 700개 이상이며, 본문에서는 744개 instruction이 Table 1에 정리되어 있습니다.

이 숫자가 중요한 이유는 RT-1이 특정 몇 개의 동작만 배우는 모델이 아니라, 다양한 실제 조작 task를 하나의 정책 안에 담으려는 시도였기 때문입니다.

#### 1-2. 학습 및 평가 환경

![RT-1 robot classroom Figure 2a](https://static.wikidocs.net/images/page/366369/gh_9af53ee20f80.png)

Figure 2(a)는 대규모 데이터 수집이 이루어진 robot classroom이고, Figure 2(b)와 2(c)는 평가에 사용된 두 개의 실제 office kitchen입니다. 논문은 training environment와 evaluation environment가 비슷한 countertop을 공유하지만, lighting, background, kitchen geometry는 다르다고 설명합니다.

즉, RT-1은 단순히 하나의 고정된 실험 환경에서만 학습한 것이 아니라, 서로 다른 실제 환경 차이를 포함한 조건 위에서 평가되도록 설계되었습니다.

![RT-1 mobile manipulator Figure 2d](https://static.wikidocs.net/images/page/366369/gh_cfaa6b5e0cde.png)

Figure 2(d)는 사용된 로봇 플랫폼도 보여줍니다.

RT-1은 Everyday Robots의 mobile manipulator를 사용하며, 7자유도 arm, two-finger gripper, mobile base를 갖고 있습니다. 이 점은 데이터 구성을 이해할 때 중요합니다. RT-1의 action이 arm, base, gripper를 모두 포함하는 이유도 바로 이 하드웨어 구성과 연결되기 때문입니다.

#### 1-3. skill과 instruction의 구성

![RT-1 skill 구성 Table 1](https://static.wikidocs.net/images/page/366369/gh_9f7d238af874.png)

Table 1은 RT-1이 학습한 skill 목록과 개수를 정리합니다. 여기에는 다양한 skill이 포함되어 있습니다. 총 instruction 수는 744개입니다.

이 표를 보면 RT-1이 단순한 pick-and-place 모델이 아니라, 집기, 옮기기, 세우기, 넘어뜨리기, drawer 열고 닫기, receptacle 안팎으로 물체를 옮기기 같은 다양한 조작 유형을 함께 다루고 있음을 알 수 있습니다.

여기서 skill과 instruction의 차이도 중요합니다. 논문은 instruction을 실제 수행 가능한 문장 단위로 보고, skill은 이를 더 큰 동작 범주로 묶는 개념으로 사용합니다.

예를 들어 “pick iced tea can”은 하나의 instruction이고, 이것이 속한 더 큰 범주가 Pick Object skill입니다. 이런 구분 덕분에 RT-1은 단순히 문장 수를 늘리는 것이 아니라, 서로 다른 동작 패턴과 object 조합을 함께 학습할 수 있습니다.

#### 1-4. object diversity와 generalization

![RT-1 object diversity Figure 2e-f](https://static.wikidocs.net/images/page/366369/gh_8f39048a1757.png)

Figure 2(e)와 2(f)는 object diversity를 직관적으로 보여줍니다.

Figure 2(e)는 여러 skill에서 공통으로 사용된 물체들을, Figure 2(f)는 특히 picking skill의 object 다양성을 확장하기 위해 사용된 더 큰 물체 집합을 보여줍니다.

논문도 skills were chosen to demonstrate multiple behaviors with many objects라고 설명합니다. 즉, RT-1 데이터는 단순히 동작 종류만 다양한 것이 아니라, 같은 동작도 다양한 물체 위에서 수행되도록 설계되었습니다.

이것이 instruction generalization과 object generalization의 기반이 됩니다.

#### 1-5. RT-1 데이터가 중요한 이유

또 하나 중요한 점은, RT-1 데이터가 단지 “많은 예시”의 모음이 아니라는 것입니다.

 markdown_tags 

논문은 데이터 안의 task들이 서로 충분히 연결되어 있어야, 모델이 구조적으로 비슷한 패턴을 발견하고 새로운 조합으로 일반화할 수 있다고 설명합니다.

예를 들어 pick, place, move near, open drawer 같은 skill이 서로 독립적으로 존재하는 것이 아니라, 다양한 object와 조합되면서 새로운 instruction으로 확장될 수 있어야 합니다.

RT-1이 generalist policy를 지향할 수 있었던 이유도 바로 이런 연결된 데이터 구성을 의도했기 때문입니다.

정리하면, RT-1의 데이터 구성은 세 가지 특징으로 이해할 수 있습니다.

- 규모가 크다.
- skill과 object, environment가 다양하다.
- 그 다양성이 서로 연결되어 새로운 조합 generalization으로 이어질 수 있도록 설계되었다.

### 2. 평가 기준

RT-1의 평가는 하나의 숫자로 끝나지 않습니다.

논문은 성능을 여러 축으로 나누어 평가합니다. 이런 구분이 중요한 이유는, 로봇 정책의 “좋음”이 단순 정확도 하나로 결정되지 않기 때문입니다.

- 훈련 중 본 작업을 얼마나 잘 수행하는지
- 새로운 instruction 조합에도 일반화하는지
- 배경이나 주변 물체가 달라져도 견디는지
- 여러 단계를 이어야 하는 긴 작업까지 가능한지

#### 2-1. 기준 1: seen task performance

이 평가는 학습 데이터에 포함된 instruction을 대상으로 합니다. 다만 완전히 똑같은 장면을 다시 보는 것은 아닙니다. 논문은 object placement, time of day, robot position 같은 조건이 달라질 수 있다고 설명합니다.

즉, seen task 평가는 학습 중 본 작업에 대해 얼마나 안정적으로 수행할 수 있는지를 보는 기준입니다. 논문은 이 평가에서 200개가 넘는 task를 테스트했다고 설명합니다.

#### 2-2. 기준 2: unseen task generalization

이 부분이 RT-1에서 특히 중요합니다. 논문은 21개의 새로운 instruction을 따로 떼어 평가합니다.

여기서 새로운 instruction이란 완전히 낯선 물체나 전혀 새로운 skill이 아니라, 학습 중 보았던 object와 skill을 새로운 방식으로 조합한 경우입니다. 예를 들어 “apple”도 알고 있고 “pick”도 배웠지만, “pick up the apple”이라는 특정 instruction 조합은 학습에서 제외하는 식입니다.

이런 평가는 RT-1이 단순 암기형 정책이 아니라, 기존 패턴을 재조합해 새로운 task로 확장할 수 있는지를 보기 위한 것입니다.

#### 2-3. 기준 3: robustness

논문은 robustness를 두 종류로 나눕니다. 하나는 distractor robustness이고, 다른 하나는 background robustness입니다.

distractor robustness는 목표 물체 주변에 다른 물체가 많을 때도 제대로 수행할 수 있는지를 보는 평가입니다. 반대로 background robustness는 주방 환경 자체가 달라졌을 때, 예를 들어 조명, 배경, countertop 표면이 바뀌었을 때도 잘 동작하는지를 평가합니다.

논문은 distractor robustness에 30개 real-world task, background robustness에 22개 task를 사용했다고 설명합니다.

![RT-1 robustness Figure 4](https://static.wikidocs.net/images/page/366369/gh_14cad755d3b2.png)

Figure 4는 robustness evaluation scenario를 시각적으로 보여주는 그림입니다. 즉, 배경이 얼마나 달라졌는지, distractor가 얼마나 늘어났는지, 그리고 realistic scenario가 어떤 식으로 구성되는지를 독자가 한눈에 이해하게 해줍니다.

#### 2-4. 기준 4: long-horizon scenarios

이 평가는 단일 skill 하나를 수행하는 수준을 넘어서, 여러 단계의 skill을 이어야 하는 더 현실적인 작업을 대상으로 합니다.

예를 들어 물체를 찾고, 집고, 다른 위치로 옮기고, 다시 다른 조작을 이어가는 식의 긴 시나리오입니다. 논문은 이런 평가가 단순한 low-level manipulation accuracy만 보는 것이 아니라, 실제 사용에 더 가까운 복합 task 수행 능력을 본다고 설명합니다.

정리하면 RT-1의 평가 기준은 네 가지로 나눌 수 있습니다.

seen task는 학습 중 본 작업에서의 안정성을, unseen task는 새로운 조합 generalization을, robustness 평가는 환경 변화에 대한 적응력을, long-horizon 평가는 여러 skill을 이어야 하는 실제 시나리오 수행 능력을 봅니다.

### 3. 실험 결과

RT-1의 실험 결과는 크게 네 갈래로 볼 수 있습니다.

- 기본적인 seen / unseen / robustness 성능
- 더 현실적인 kitchen scenario에서의 generalization
- simulation data와 다른 로봇 데이터 같은 heterogeneous data를 얼마나 잘 흡수하는지
- long-horizon task와 데이터 규모·다양성 변화에 대한 결과

#### 3-1. 기본 성능 비교: seen, unseen, robustness

가장 먼저 봐야 할 결과는 Table 2입니다.

![RT-1 주요 결과 Table 2](https://static.wikidocs.net/images/page/366369/gh_843a5dfac253.png)

Table 2를 보면 RT-1은 학습 중 본 작업뿐 아니라, 학습에 없던 새로운 instruction 조합과 clutter, 배경 변화까지 포함한 거의 모든 축에서 가장 높은 성능을 보였습니다.

논문도 RT-1이 next best baseline보다 unseen task에서 25%, distractor robustness에서 36%, background robustness에서 18% 더 높다고 정리합니다.

#### 3-2. realistic kitchen generalization

![RT-1 kitchen generalization Table 3](https://static.wikidocs.net/images/page/366369/gh_86fafc0b8826.png)

Table 3은 실제 Google kitchen에서 L1, L2, L3 세 수준의 generalization을 나눠 평가합니다.

RT-1은 전체적으로 가장 강하고, 특히 새로운 countertop layout과 lighting 변화가 포함된 L1에서 매우 높은 성능을 보입니다. 더 어려운 L3에서도 Gato보다 확실히 높고, BC-Z 계열과 비슷하거나 더 나은 수준을 보입니다.

![RT-1 kitchen qualitative Figure 5](https://static.wikidocs.net/images/page/366369/gh_78555649c652.png)

Figure 5에는 RT-1의 결과가 단순한 표 숫자가 아니라, 실제 조작 sequence 위에서 나온 것임을 보여주는 qualitative 보강 자료가 담겨 있습니다.

#### 3-3. heterogeneous data 학습 효과

![RT-1 simulation transfer Table 4](https://static.wikidocs.net/images/page/366369/gh_847710bea94e.png)

 markdown_tags 

Table 4는 real data에 simulation data를 추가했을 때의 결과를 보여줍니다. 원래 하던 real task 성능은 거의 유지되면서, simulation에서만 본 물체에 대한 실제 성능은 크게 올라갑니다.

특히 sim objects / seen skill은 23에서 87로, sim objects / unseen skill은 7에서 33으로 올라갑니다. 논문은 이를 simulation data가 원래 성능을 해치지 않으면서도 새로운 물체와 조합 일반화를 크게 도와준다고 해석합니다.

![RT-1 heterogeneous robot data 결과](https://static.wikidocs.net/images/page/366369/gh_b6db7fe3fde5.png)

Everyday Robots 데이터만 학습한 RT-1은 classroom eval 92, bin-picking eval 22를 기록합니다. 여기에 Kuka bin-picking data를 함께 넣으면 classroom eval은 90으로 거의 유지되면서, bin-picking eval은 39로 크게 올라갑니다.

반면 Kuka 데이터만으로는 두 평가 모두 0입니다. 즉, RT-1은 다른 로봇의 데이터를 그대로 복사해 쓰는 것은 아니지만, 함께 학습했을 때 새로운 조작 유형에 대한 일반화를 확장할 수 있음을 보여줍니다.

#### 3-4. long-horizon task 결과

![RT-1 long-horizon Table 6](https://static.wikidocs.net/images/page/366369/gh_35e5393d350a.png)

Table 6은 SayCan framework 안에서 RT-1을 썼을 때의 결과를 보여줍니다.

RT-1은 긴 작업 시나리오에서도 execution 성공률이 가장 높고, 특히 새로운 kitchen에서도 성능이 거의 떨어지지 않습니다. 논문은 supplementary video에서 as many as 50 steps까지 수행할 수 있다고 설명합니다.

이 결과는 RT-1이 단순히 개별 skill만 강한 것이 아니라, 상위 planner와 결합했을 때도 안정적인 low-level executor로 기능할 수 있음을 보여줍니다.

#### 3-5. 데이터 양과 다양성의 영향

![RT-1 데이터 양과 다양성 Table 7](https://static.wikidocs.net/images/page/366369/gh_095e1cc423b3.png)

Table 7을 보면, full RT-1은 seen 97, unseen 76, distractors 83, backgrounds 59입니다.

그런데 task diversity는 유지한 채 데이터 양만 줄이면 성능이 떨어지긴 하지만 비교적 점진적으로 감소합니다. 반면 task diversity를 줄인 narrower data에서는 성능 하락이 더 크게 나타납니다.

논문은 이 표를 바탕으로 데이터 quantity보다 diversity가 generalization에 더 중요하다고 정리합니다.

즉, RT-1의 강점은 단순히 “많이 모은 데이터”가 아니라, 서로 다른 task와 object, environment가 연결된 구조의 데이터를 학습한 데서 나온다는 뜻입니다.

정리하면 RT-1의 실험 결과는 세 가지 메시지로 요약할 수 있습니다.

- RT-1은 seen task뿐 아니라 unseen task, distractor, background 조건에서도 baseline보다 강했습니다.
- realistic kitchen scenario와 long-horizon task에서도 더 높은 execution 성능을 보였습니다.
- simulation data나 다른 로봇 데이터까지 흡수하면서 새로운 일반화 능력을 확장할 수 있음을 보여주었습니다.

### 4. 설계 해석

이번 장에서는 어떤 설계 선택이 실제 성능과 일반화에 영향을 줬는지 중심으로 정리합니다.

RT-1의 성능은 단순히 “Transformer를 써서” 나온 것이 아닙니다. action 표현 방식, 시각 사전학습, 시간 히스토리, 그리고 Transformer 기반 구조가 일반화와 robustness에 직접적인 영향을 줍니다.

#### 4-1. discrete action representation의 효과

가장 먼저 눈에 띄는 것은 action representation입니다.

![RT-1 설계 ablation Table 13](https://static.wikidocs.net/images/page/366369/gh_1b607f3260f0.png)

Table 13에서 full RT-1은 seen 97, unseen 76, distractors 83, backgrounds 59를 기록합니다.

그런데 discrete action 대신 continuous action을 쓰면 seen 68, unseen 43, distractors 37, backgrounds 35로 크게 떨어집니다. 특히 distractor robustness는 83에서 37로, unseen task는 76에서 43으로 크게 감소합니다.

논문은 이를 두고 per-dimension discretization이 complex multi-modal action distribution을 표현하는 데 유리하고, Gaussian continuous action은 하나의 mode만 잘 표현하기 때문에 더 복잡한 demonstration data에 부적합하다고 설명합니다.

즉, RT-1에서 action tokenization은 단순 구현 선택이 아니라 핵심 성능 요인입니다.

#### 4-2. ImageNet pretraining의 역할

두 번째로 중요한 것은 ImageNet pretraining입니다.

pretraining을 제거하면 seen은 97에서 84, unseen은 76에서 43, distractors는 83에서 60, backgrounds는 59에서 41로 떨어집니다. 특히 unseen task 성능은 33포인트 감소합니다.

논문은 이를 두고 large and diverse visuals of the ImageNet dataset 덕분에 일반화와 robustness가 크게 좋아진다고 해석합니다.

즉, RT-1은 로봇 데이터만으로 처음부터 모든 시각 표현을 배우기보다, 이미 넓은 시각 패턴을 학습한 backbone 위에 로봇 task를 올리는 편이 훨씬 유리하다는 것을 보여줍니다.

#### 4-3. observation history의 중요성

history를 제거해 입력을 단일 이미지로 줄이면 seen은 82, unseen은 62, distractors는 50, backgrounds는 59가 됩니다.

특히 distractor robustness가 83에서 50으로 크게 감소하고, hard distractor는 64에서 14까지 떨어집니다.

이 결과는 RT-1이 “현재 한 장면”만 보는 모델이 아니라, 최근 이미지 흐름을 함께 보면서 더 안정적으로 행동을 결정한다는 점을 보여줍니다.

즉, 로봇 제어에서는 현재 프레임 하나보다 짧은 시간 맥락이 중요한데, RT-1은 이를 실제 성능 차이로 입증합니다.

#### 4-4. Transformer의 기여

Transformer를 제거하고 pre-trained EfficientNet 기반 구조만 남기면 seen 86, unseen 62, distractors 67, backgrounds 59가 됩니다.

완전히 망가지는 것은 아니지만, RT-1 전체 구조보다 일관되게 낮습니다.

 markdown_tags 

이 결과는 시각 backbone만 좋아서는 충분하지 않고, 여러 시점의 token과 instruction-conditioned 정보를 sequence로 통합해 action을 예측하는 Transformer가 실제 generalization에 기여한다는 점을 보여줍니다. 특히 unseen과 distractor에서 차이가 두드러집니다.

#### 4-5. 모델 크기와 capacity

RT-1을 35M에서 21M으로 줄이면 seen 89, unseen 62, distractors 77, backgrounds 53으로 떨어집니다.

하락폭이 다른 요소들만큼 극단적이지는 않지만, full model이 전반적으로 가장 좋습니다.

논문도 capacity and expressiveness를 중요한 가설로 두고 실험합니다.

이 결과는 “크기만 키우면 된다”는 뜻은 아니지만, RT-1이 어느 정도 충분한 capacity를 가져야 다양한 task와 instruction을 흡수할 수 있다는 점을 보여줍니다.

#### 4-6. auto-regressive action과 속도 trade-off

auto-regressive action을 넣으면 seen 85, unseen 71, distractors 67, backgrounds 65가 되고, inference time은 15ms에서 36ms로 약 2배 이상 느려집니다.

논문은 이 변화가 성능을 크게 개선하지 않으면서 가장 큰 slowdown을 일으킨다고 설명하며, 그래서 최종 RT-1은 action을 auto-regressively 생성하지 않는다고 말합니다.

이 결과는 RT-1이 단순히 최고 정확도만 추구한 것이 아니라, 실제 로봇 제어에 필요한 속도와 성능의 균형을 고려한 설계라는 점을 잘 보여줍니다.

#### 4-7. RT-1 설계에서 읽을 수 있는 핵심 메시지

Table 13을 전체적으로 보면, 논문이 보여주는 해석은 분명합니다.

- discrete action은 복잡한 행동 분포를 더 잘 표현하고,
- ImageNet pretraining은 시각 일반화를 크게 높이며,
- history는 clutter와 distractor 상황에서 중요하고,
- Transformer는 여러 시점과 언어 조건을 통합하는 데 기여하며,
- auto-regressive action은 속도 대비 이득이 작습니다.

즉, RT-1은 “Transformer를 로봇에 붙였다”가 아니라, 로봇 제어에 필요한 여러 조건을 함께 만족하도록 세심하게 조율된 구조라고 보는 것이 맞습니다.

RT-1의 성능은 모델 크기, action 표현, 시각 사전학습, 시간 맥락, 추론 속도 설계가 함께 맞물린 결과이며, 이 조합이 결국 일반화와 robustness로 이어졌다고 해석할 수 있습니다.

## Ⅴ. 한계점

### 1. 한계점

#### 1-1. imitation learning 기반이라는 한계

RT-1의 가장 큰 한계는 여전히 imitation learning 기반 정책이라는 점입니다.

RT-1은 성공한 demonstration을 보고 그 행동을 따라 배우는 behavioral cloning 방식 기반으로 만들어진 모델입니다.

즉, 사람이 보여준 행동을 잘 재현하는 데는 강하지만, demonstration에 없는 새로운 전략을 스스로 탐색하거나, 시행착오를 통해 더 나은 행동을 발견하는 구조는 아닙니다.

이런 점에서 RT-1은 강한 실행기이지만, 자율적으로 새로운 skill을 발명하는 모델이라고 보기는 어렵습니다.

#### 1-2. compositional generalization에 머무는 범위

논문이 보여준 unseen task generalization은 매우 인상적이지만, 그 대부분은 본 적 있는 skill과 object를 새로운 조합으로 묶는 compositional generalization에 가깝습니다.

예를 들어 “pick”도 알고 “apple”도 배웠을 때, 그 조합이 새로운 instruction으로 등장하는 식입니다.

즉, RT-1은 완전히 새로운 물리 상호작용이나 전혀 새로운 작업 개념을 스스로 학습한 것은 아닙니다.

#### 1-3. planning의 외부 의존성

RT-1은 긴 작업에서도 좋은 성능을 보였지만, 그 결과는 SayCan 같은 상위 planning framework와 결합했을 때 나타납니다.

즉, RT-1은 여러 단계의 복잡한 계획을 스스로 세우는 모델이라기보다, 주어진 하위 skill을 안정적으로 수행하는 low-level executor에 더 가깝습니다.

long-horizon 결과가 좋다는 것은 RT-1의 실행 성능이 강하다는 뜻이지, planning까지 하나의 모델 안에서 해결했다는 뜻은 아닙니다.

#### 1-4. embodiment generalization의 제약

논문은 simulation data나 다른 로봇의 데이터를 흡수할 수 있다는 점을 보여주었지만, 그렇다고 해서 RT-1이 모든 로봇에 곧바로 적용되는 universal robot policy가 된 것은 아닙니다.

논문의 heterogeneous data 결과는 “다른 데이터도 어느 정도 흡수할 수 있다”는 가능성을 보여주지만, action space와 morphology가 다른 로봇까지 완전히 자연스럽게 일반화한 단계는 아닙니다.

즉, multi-embodiment foundation model로 가기에는 아직 초기 단계라고 보는 편이 맞습니다.

#### 1-5. 대규모 데이터 의존성

RT-1의 강점은 large-scale real-world data에서 나오지만, 동시에 그만큼 대규모 실제 로봇 데이터가 필요하다는 뜻이기도 합니다.

논문은 13대의 로봇으로 17개월 동안 약 130k demonstration을 수집했습니다. 이런 데이터 규모는 매우 강력한 결과를 만들었지만, 동시에 누구나 쉽게 재현할 수 있는 설정은 아닙니다.

즉, RT-1은 “데이터를 충분히 모으면 가능하다”는 점을 보여주었지만, 그 데이터 수집 비용 자체는 여전히 큰 장벽입니다.

#### 1-6. 강건성의 남은 과제

RT-1은 distractor와 background 변화에서 baseline보다 훨씬 강했지만, 결과를 보면 background robustness는 59 수준으로, seen task 97과 비교하면 아직 격차가 큽니다.

이는 RT-1이 실제 환경 변화에 어느 정도 견디긴 하지만, 환경이 크게 바뀔수록 성능 저하가 남아 있음을 보여줍니다.

즉, robust real-world policy의 방향은 보여주었지만, 완전히 해결했다고 보기는 어렵습니다.

정리하면 RT-1의 한계는 네 가지 축으로 이해할 수 있습니다.

행동을 잘 모사하지만 스스로 탐색하는 모델은 아니고, 새로운 조합에는 강하지만 완전히 새로운 물리와 작업까지 이해하는 단계는 아니며, planning은 외부 프레임워크에 의존하고, 강한 성능 뒤에는 대규모 실제 데이터라는 높은 비용이 있습니다.

그럼에도 RT-1이 중요한 이유는, 이런 한계가 있음에도 불구하고 로봇 정책이 generalist backbone 방향으로 갈 수 있다는 가능성을 처음으로 실로봇 수준에서 강하게 보여주었기 때문입니다.

## Ⅵ. 정리

### 1. 의의와 이후 흐름

#### 1-1. RT-1의 핵심 의의

RT-1의 가장 큰 의의는 로봇에서도 generalist policy라는 방향이 실질적으로 가능하다는 점을 보여준 데 있습니다.

그 이전에도 multi-task robotic learning이나 language-conditioned policy 연구는 있었지만, 실제 로봇 환경에서 수백 개 instruction 규모, 대규모 demonstration, 그리고 새로운 task, object, environment에 대한 generalization을 한 논문 안에서 이렇게 강하게 보여준 사례는 드물었습니다.

RT-1은 13대의 로봇으로 17개월 동안 약 130k demonstration을 모으고, 700개 이상의 instruction을 하나의 정책으로 함께 학습시키며, 실제 환경에서 3000회 이상의 real-world evaluation을 수행했습니다.

이 자체가 로봇 학습이 “작은 task별 모델”에서 “큰 backbone 모델”로 이동할 수 있음을 보여주는 중요한 전환점입니다.

#### 1-2. scale과 diversity에 대한 인사이트

두 번째 의의는 로봇에서 scale의 의미를 다시 분명하게 했다는 점입니다.

RT-1은 단순히 데이터가 많으면 좋다는 수준을 넘어서, 좋은 generalization을 위해서는 데이터가 scale과 breadth를 함께 가져야 하고, task들 사이에 구조적 연결성이 있어야 한다고 말합니다.

그리고 앞서 짚어 본 Table 7을 통해 quantity보다 diversity가 generalization에 더 중요할 수 있다는 점도 보여줍니다.

이 인사이트는 이후 로봇 foundation model 연구에서 “얼마나 많이 모았는가”만큼이나 “얼마나 다양하고 연결된 데이터를 학습했는가”가 중요하다는 관점을 강화했습니다.

#### 1-3. language-conditioned control의 확장

세 번째 의의는 language-conditioned robot control을 backbone 수준으로 끌어올렸다는 점입니다.

RT-1은 자연어 instruction을 단순한 부가 정보가 아니라, 시각 처리 초기에 반영되는 핵심 입력으로 사용합니다.

그리고 unseen task evaluation을 통해, 본 적 있는 skill과 object를 새로운 조합으로 묶는 compositional generalization 가능성을 보여줍니다.

즉, RT-1은 로봇 정책이 언어를 통해 더 유연하게 task space를 구성할 수 있음을 실증한 연구라고 볼 수 있습니다. 이 점은 이후 VLA 연구가 language를 단순 interface가 아니라 action generalization의 핵심 매개로 다루게 되는 흐름과 직접 연결됩니다.

#### 1-4. real-time robot policy라는 설계 원칙

네 번째 의의는 “실제로 돌아가는” 구조를 제안했다는 점입니다.

RT-1은 Transformer를 단순히 로봇에 적용한 것이 아니라, real-time control이 가능하도록 구조를 조정했습니다.

논문은 3Hz control frequency와 100ms 이하의 inference budget을 기준으로 모델을 설계하고, TokenLearner와 token reuse를 통해 추론 속도를 맞춥니다.

이 점은 매우 중요합니다. 로봇에서는 accuracy가 높아도 제어 주기를 맞추지 못하면 실제 시스템에서 쓰기 어렵기 때문입니다.

RT-1은 high-capacity model과 real-time feasibility를 함께 고려해야 한다는 사실을 분명히 보여줬고, 이 관점은 이후 실로봇 정책 연구에서 중요한 설계 원칙으로 남았습니다.

#### 1-5. heterogeneous data 학습의 가능성

다섯 번째 의의는 heterogeneous data를 함께 학습할 수 있는 가능성을 보여줬다는 점입니다.

RT-1은 simulation data를 추가하면 새로운 object generalization이 크게 좋아지고, 다른 로봇의 데이터까지 함께 사용해도 기존 성능을 크게 해치지 않으면서 새로운 scenario 성능을 넓힐 수 있음을 보여줍니다.

이는 로봇 데이터가 반드시 하나의 동일한 embodiment와 환경 안에서만 닫혀 있을 필요는 없다는 점을 시사합니다.

물론 완전한 multi-embodiment foundation model까지 간 것은 아니지만, 서로 다른 출처의 데이터도 하나의 backbone 모델에서 함께 학습할 수 있다는 방향을 제시했다는 점에서 이후 연구에 중요한 발판이 되었습니다.

이런 점들을 종합하면, RT-1이 이후 연구에 남긴 핵심 인사이트는 크게 네 가지로 정리할 수 있습니다.

- 로봇에서도 large-scale multi-task backbone model이 가능하다.
- language는 task specification을 넘어서 generalization의 핵심 축이 된다.
- 데이터는 양뿐 아니라 다양성과 연결성이 중요하다.
- 로봇 모델은 성능과 함께 real-time control feasibility를 동시에 만족해야 한다.

#### 1-6. 이후 VLA 연구로의 연결

이후 흐름에서 RT-1은 자연스럽게 더 큰 VLA 연구로 이어집니다.

RT-1은 vision-language-action policy의 초기 backbone 형태를 보여주었고, 이후 연구들은 여기서 더 나아가 웹 스케일 비전, 언어 지식을 로봇 행동과 연결하려는 방향으로 발전합니다.

즉, RT-1이 “대규모 실제 로봇 데이터를 바탕으로 language-conditioned action policy를 학습할 수 있다”는 출발점을 만들었다면, 이후 VLA들은 여기에 더 큰 시각-언어 사전지식과 더 넓은 embodiment, 더 강한 planning 능력을 연결하려고 합니다.

그런 의미에서 RT-1은 오늘날 VLA 흐름의 완성형이라기보다, 그 흐름을 실로봇 수준에서 처음 설득력 있게 열어준 출발점에 가깝습니다.

정리하면, 로봇 정책이 task-specific controller에서 generalist backbone으로 이동할 수 있다는 가능성을 보여주었고, 그 과정에서 필요한 데이터 구성, language conditioning, action representation, real-time architecture라는 핵심 설계 원칙을 함께 남겼습니다.

## 그림 출처

- RT-1 개요 Figure 1 이미지
- RT-1 실제 환경 및 시스템 Figure 2 개요 이미지
- RT-1 tokenized action 예시 이미지
- RT-1 모델 구조 Figure 3 이미지
- RT-1 robot classroom Figure 2a 이미지
- RT-1 mobile manipulator Figure 2d 이미지
- RT-1 skill 구성 Table 1 이미지
- RT-1 object diversity Figure 2e-f 이미지
- RT-1 robustness Figure 4 이미지
- RT-1 주요 결과 Table 2 이미지
- RT-1 kitchen generalization Table 3 이미지
- RT-1 kitchen qualitative Figure 5 이미지
- RT-1 simulation transfer Table 4 이미지
- RT-1 heterogeneous robot data 결과 이미지
- RT-1 long-horizon Table 6 이미지
- RT-1 데이터 양과 다양성 Table 7 이미지
- RT-1 설계 ablation Table 13 이미지

## 참고문헌

- Brohan, A., Brown, N., Carbajal, J., Chebotar, Y., Dabis, J., Finn, C., et al. (2022). RT-1: Robotics Transformer for Real-World Control at Scale.
[https://robotics-transformer1.github.io/](https://robotics-transformer1.github.io/)
