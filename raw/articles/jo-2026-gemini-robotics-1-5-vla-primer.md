---
title: "03-16. Gemini Robotics 1.5 - 모두의 로보틱스 - VLA 입문"
type: article
year: 2026
category: physical-ai
raw_path: raw/articles/jo-2026-gemini-robotics-1-5-vla-primer.md
raw_filename: "jo-2026-gemini-robotics-1-5-vla-primer.md"
source_collection: external
author: "조인령"
url: "https://wikidocs.net/366382"
publisher: "wikidocs.net"
fetched_at: "2026-09-17T21:25:03+0900"
extractor_tier: "chrome"
tags: []
figures:
  - id: fig01
    file: assets/jo-2026-gemini-robotics-1-5-vla-primer/fig01.png
    raw: raw/articles/jo-2026-gemini-robotics-1-5-vla-primer-figures/fig01.png
    caption: "Gemini Robotics 1.5 overview"
    strategy: fetched
    curated: false
  - id: fig02
    file: assets/jo-2026-gemini-robotics-1-5-vla-primer/fig02.png
    raw: raw/articles/jo-2026-gemini-robotics-1-5-vla-primer-figures/fig02.png
    caption: "Embodied reasoning in physical scenes"
    strategy: fetched
    curated: false
  - id: fig03
    file: assets/jo-2026-gemini-robotics-1-5-vla-primer/fig03.png
    raw: raw/articles/jo-2026-gemini-robotics-1-5-vla-primer-figures/fig03.png
    caption: "Multi-embodiment evaluation"
    strategy: fetched
    curated: false
  - id: fig04
    file: assets/jo-2026-gemini-robotics-1-5-vla-primer/fig04.png
    raw: raw/articles/jo-2026-gemini-robotics-1-5-vla-primer-figures/fig04.png
    caption: "Generalization performance"
    strategy: fetched
    curated: false
  - id: fig05
    file: assets/jo-2026-gemini-robotics-1-5-vla-primer/fig05.png
    raw: raw/articles/jo-2026-gemini-robotics-1-5-vla-primer-figures/fig05.png
    caption: "Motion Transfer result 1"
    strategy: fetched
    curated: false
  - id: fig06
    file: assets/jo-2026-gemini-robotics-1-5-vla-primer/fig06.png
    raw: raw/articles/jo-2026-gemini-robotics-1-5-vla-primer-figures/fig06.png
    caption: "Motion Transfer result 2"
    strategy: fetched
    curated: false
  - id: fig07
    file: assets/jo-2026-gemini-robotics-1-5-vla-primer/fig07.png
    raw: raw/articles/jo-2026-gemini-robotics-1-5-vla-primer-figures/fig07.png
    caption: "Thinking result 1"
    strategy: fetched
    curated: false
  - id: fig08
    file: assets/jo-2026-gemini-robotics-1-5-vla-primer/fig08.png
    raw: raw/articles/jo-2026-gemini-robotics-1-5-vla-primer-figures/fig08.png
    caption: "Thinking result 2"
    strategy: fetched
    curated: false
  - id: fig09
    file: assets/jo-2026-gemini-robotics-1-5-vla-primer/fig09.png
    raw: raw/articles/jo-2026-gemini-robotics-1-5-vla-primer-figures/fig09.png
    caption: "Agentic system"
    strategy: fetched
    curated: false
  - id: fig10
    file: assets/jo-2026-gemini-robotics-1-5-vla-primer/page-full.png
    raw: raw/articles/jo-2026-gemini-robotics-1-5-vla-primer-figures/page-full.png
    caption: "전체 페이지 스크린샷"
    strategy: screenshot
    curated: false
---

> 수집 메모 — `scripts/fetch_article.py` 가 사용자의 명시적 URL 지시에 따라 가져왔다 (CLAUDE.md rule #1 의 자료 수집 예외). 추출 tier: `chrome`. 본문은 원문 그대로이며 요약·번역·윤문하지 않았다.
> `category` 는 임시값이므로 Step 3 에서 확정할 것.

---

## Ⅰ. 모델 등장 배경

### Gemini Robotics 1.5 등장 배경

앞에서 보았던 Gemini Robotics 1.0은 Gemini의 멀티모달 이해 능력을 실제 로봇 행동으로 연결한 모델입니다.

하지만 1.0은 여전히 몇 가지 과제를 남겼습니다.

첫째, 복잡한 작업을 여러 단계로 나누어 계획하는 능력은 제한적이었습니다.

단순한 조작 작업은 잘 수행할 수 있지만, 가방을 싸거나 책상을 정리하는 것처럼 긴 순서가 필요한 작업에서는 상위 계획과 진행 상태 판단이 중요합니다.

둘째, 서로 다른 로봇 몸체에 대한 일반화가 아직 충분하지 않았습니다.

1.0에서도 다른 로봇으로 fine-tuning하는 가능성은 보여주었지만, 로봇마다 팔 길이, 관절 구조, gripper, 카메라 위치가 다르기 때문에 한 로봇에서 배운 skill을 다른 로봇으로 옮기는 것은 여전히 어려운 문제였습니다.

셋째, 로봇이 행동하기 전에 스스로 "무엇을 먼저 해야 하는지" 생각하는 구조가 더 필요했습니다.

복잡한 작업에서는 바로 action을 출력하는 것보다, 작업을 작은 단계로 나누고 현재 상황에 맞게 다음 행동을 정하는 과정이 중요합니다.

Gemini Robotics 1.5는 이러한 한계를 보완하기 위해 등장했습니다.

1.5에서 중요한 변화는 크게 세 가지입니다.

첫째, Thinking VLA입니다.

로봇이 바로 행동을 출력하는 것이 아니라, 먼저 자연어로 현재 상황과 다음 목표를 정리한 뒤 행동할 수 있도록 했습니다.

둘째, Motion Transfer입니다.

서로 다른 로봇의 데이터를 함께 학습해, 한 로봇에서 배운 동작을 다른 로봇에도 옮길 수 있도록 했습니다.

셋째, Agentic Framework입니다.

Gemini Robotics-ER 1.5가 상위 계획과 진행 상태 판단을 담당하고, Gemini Robotics 1.5가 각 단계를 실제 로봇 행동으로 실행하는 구조입니다.

정리하면, Gemini Robotics 1.0이 시각, 언어 이해를 로봇 행동으로 연결한 모델이었다면, Gemini Robotics 1.5는 여기서 더 나아가 생각하고, 계획하고, 여러 로봇 몸체에 걸쳐 행동하는 로봇 에이전트를 목표로 한 모델입니다.

![Gemini Robotics 1.5 overview](https://static.wikidocs.net/images/page/366382/gh_08f0dcaa5859.png)

## Ⅱ. 배경지식

### Gemini Robotics 1.5의 핵심 개념

Gemini Robotics 1.5를 이해하려면 먼저 세 가지 개념을 잡아야 합니다.

하나는 orchestrator, 하나는 Thinking VLA, 그리고 다른 하나는 Motion Transfer입니다.

#### 1-1. Orchestrator란 무엇인가

Orchestrator는 전체 작업 흐름을 관리하는 역할입니다.

로봇에게 "책상을 정리해줘"라는 지시가 들어왔다고 생각해보겠습니다.

이 명령을 바로 팔의 움직임으로 바꾸기는 어렵습니다.

먼저 책상 위에 무엇이 있는지 확인해야 하고, 어떤 물건을 어디로 옮길지 정해야 하며, 작업이 끝났는지도 판단해야 합니다.

Gemini Robotics-ER 1.5는 이런 역할을 담당합니다.

즉, 로봇의 "상위 관리자"처럼 사용자의 목표를 이해하고, 작업을 여러 단계로 나눈 뒤, 각 단계가 잘 끝났는지 확인합니다.

공식 블로그에서도 Gemini Robotics-ER 1.5를 high-level brain처럼 로봇의 활동을 조율하는 모델로 설명합니다. 이 모델은 물리 환경에서 계획과 논리적 판단을 수행하고, 필요할 경우 Google Search 같은 도구도 호출할 수 있습니다.

#### 1-2. Thinking VLA란 무엇인가

기존 VLA 모델은 보통 이미지와 지시를 입력받고 바로 action을 출력합니다.

하지만 복잡한 작업에서는 바로 움직이는 것보다 먼저 생각하는 과정이 필요합니다.

Gemini Robotics 1.5는 행동을 내기 전에 자연어 기반의 thinking trace를 생성할 수 있습니다.

쉽게 말하면, 로봇이 "지금 무엇을 해야 하는지"를 짧게 정리한 뒤 행동하는 것입니다.

예를 들어 "옷을 색깔별로 분류해"라는 지시가 들어오면, 모델은 먼저 흰 옷은 흰 바구니에 넣고, 다른 색 옷은 검은 바구니에 넣어야 한다는 식으로 작업 기준을 정리합니다. 그다음 하나의 옷을 집고, 알맞은 위치로 옮기는 행동을 실행합니다.

이 과정은 단순한 설명문이 아닙니다.

복잡한 작업을 더 작은 실행 단위로 나누고, 로봇이 다음 행동을 더 안정적으로 선택하도록 돕는 장치입니다.

DeepMind는 Gemini Robotics 1.5가 action 이전에 자연어 reasoning을 생성해 복잡한 multi-step task를 더 잘 분해하고 수행할 수 있다고 설명합니다.

#### 1-3. Motion Transfer란 무엇인가

로봇마다 몸의 구조는 다릅니다.

ALOHA처럼 양팔이 고정된 로봇도 있고, Franka처럼 연구실에서 많이 쓰는 로봇팔도 있으며, Apollo처럼 사람 형태에 가까운 humanoid도 있습니다.

이들은 팔 길이, 관절 구조, 카메라 위치, gripper 형태가 서로 다릅니다.

그래서 한 로봇에서 배운 동작을 다른 로봇으로 그대로 옮기기는 어렵습니다.

Motion Transfer는 이 문제를 해결하기 위한 방법입니다.

핵심은 로봇마다 다른 몸의 구조를 그대로 외우는 것이 아니라, 여러 로봇 데이터 안에서 공통된 동작의 의미를 학습하는 것입니다.

예를 들어 "물체를 집는다", "상자 안에 넣는다", "문을 연다" 같은 동작은 로봇마다 실행 방식은 다르지만, 작업의 목적은 비슷합니다.

Motion Transfer는 이런 공통성을 학습해 서로 다른 로봇 사이에서도 skill을 옮길 수 있도록 돕습니다. 논문은 Gemini Robotics 1.5가 heterogeneous, multi-embodiment robot data에서 학습하도록 Motion Transfer mechanism을 도입했다고 설명합니다.

## Ⅲ. 모델 구조

### Gemini Robotics 1.5의 전체 구조

Gemini Robotics 1.5의 구조는 크게 두 단계로 볼 수 있습니다.

먼저 Gemini Robotics-ER 1.5가 사용자의 목표와 현재 장면을 이해하고 계획을 세웁니다.

그다음 Gemini Robotics 1.5가 각 단계를 실제 로봇 행동으로 바꿉니다.

#### 1-1. Gemini Robotics-ER 1.5: 이해와 계획

Gemini Robotics-ER 1.5는 Vision-Language Model입니다.

이 모델은 직접 로봇의 low-level action을 출력하는 역할보다는, 물리 세계를 이해하고 작업을 계획하는 역할에 가깝습니다.

예를 들어 로봇에게 "내 위치 기준으로 이 물건들을 재활용, 음식물 쓰레기, 일반 쓰레기로 분류해줘"라고 지시했다고 생각해보겠습니다.

이 작업을 수행하려면 로봇은 단순히 물건을 보는 것만으로는 부족합니다.

지역별 분리수거 규칙을 찾아야 할 수도 있고, 장면 속 물체가 무엇인지 파악해야 하며, 각 물건을 어느 통에 넣을지 결정해야 합니다.

Gemini Robotics-ER 1.5는 이런 상위 추론을 담당합니다.

필요하면 외부 도구를 사용하고, 전체 작업을 여러 단계로 나누며, 작업 진행 상태를 판단합니다.

DeepMind는 ER 1.5가 spatial understanding, task planning, progress estimation 같은 embodied reasoning에 특화되어 있다고 설명합니다.

![Embodied reasoning in physical scenes](https://static.wikidocs.net/images/page/366382/gh_4387cc92756a.png)

#### 1-2. Gemini Robotics 1.5: 행동 생성

Gemini Robotics 1.5는 Vision-Language-Action 모델입니다.

이 모델은 Gemini Robotics-ER 1.5가 나눈 각 단계를 실제 로봇 행동으로 바꾸는 역할을 합니다.

예를 들어 ER 모델이 "빨간 옷을 집어서 검은 바구니에 넣어라"라는 단계 지시를 만들면, Gemini Robotics 1.5는 현재 장면을 보고 로봇 팔과 손을 어떻게 움직일지 결정합니다.

즉, ER 1.5가 "무엇을 어떤 순서로 할지"를 정한다면, Gemini Robotics 1.5는 "그 단계를 실제로 어떻게 움직여 수행할지"를 담당합니다.

공식 모델 페이지도 Gemini Robotics 1.5를 시각 정보와 instruction을 motor command로 바꾸는 VLA 모델로 설명합니다. 또한 입력은 text와 image, 출력은 text와 action으로 정리하고 있습니다.

#### 1-3. 두 모델이 함께 작동하는 방식

Gemini Robotics 1.5의 핵심은 두 모델이 역할을 나눠 함께 작동한다는 점입니다.

복잡한 작업 전체를 하나의 VLA 모델이 바로 해결하려고 하면 어렵습니다.

작업이 길어질수록 무엇을 먼저 해야 하는지, 지금 어디까지 완료했는지, 실패했을 때 어떻게 복구할지가 중요해집니다.

그래서 1.5는 ER 모델과 VLA 모델을 나눕니다.

- Gemini Robotics-ER 1.5: 장면 이해, 계획, 도구 사용, 진행 상태 판단
- Gemini Robotics 1.5: 각 단계의 실제 로봇 행동 생성

## Ⅳ. 결과

### 실험과 결과

Gemini Robotics 1.5의 실험은 크게 세 가지 질문을 중심으로 보면 됩니다.

첫째, 여러 로봇에서 같은 모델이 잘 작동하는가.

둘째, Thinking이 실제로 multi-step task에 도움이 되는가.

셋째, ER 모델과 VLA 모델을 함께 사용했을 때 긴 작업을 더 잘 수행하는가.

#### 1-1. 여러 로봇에서의 일반화

Gemini Robotics 1.5는 ALOHA, Bi-arm Franka, Apollo humanoid처럼 서로 다른 형태의 로봇에서 평가됩니다.

이 점이 중요한 이유는 로봇의 몸이 달라지면 action space와 관절 구조, 센서 위치가 모두 달라지기 때문입니다.

기존에는 로봇마다 별도의 데이터와 모델 조정이 필요한 경우가 많았습니다.

반면 Gemini Robotics 1.5는 여러 embodiment의 데이터를 함께 학습하고, 하나의 모델이 여러 로봇을 다룰 수 있는 방향을 보여줍니다.

공식 모델 페이지도 Gemini Robotics 1.5가 ALOHA, Bi-arm Franka, Apollo 같은 서로 다른 robot form에 적응하며, 하나의 모델을 여러 로봇에 사용할 수 있다고 설명합니다.

![Multi-embodiment evaluation](https://static.wikidocs.net/images/page/366382/gh_4f87a3cc515f.png)

#### 1-2. 일반화 성능

Gemini Robotics 1.5는 학습한 작업을 반복하는 것뿐 아니라, 새로운 지시, 새로운 행동 조건, 새로운 시각 조건, 새로운 작업 조합에 대해 평가됩니다.

여기서 중요한 점은 숫자 자체보다 일반화의 범위입니다.

1.5는 단순히 "본 적 있는 물체를 잘 집는다"가 아니라, 표현이 바뀌거나 장면이 달라지고, 로봇 몸체가 달라져도 행동을 이어갈 수 있는지를 봅니다.

공식 모델 페이지는 Gemini Robotics 1.5가 이전 모델들보다 여러 일반화 범주에서 일관되게 더 좋은 성능을 보인다고 설명합니다.

![Generalization performance](https://static.wikidocs.net/images/page/366382/gh_b3f844a9a2bd.png)

#### 1-3. Motion Transfer의 효과

Motion Transfer는 Gemini Robotics 1.5의 핵심입니다.

논문은 Motion Transfer를 통해 서로 다른 로봇의 데이터를 함께 학습하고, 한 로봇에서 배운 skill을 다른 로봇에서 사용할 수 있음을 보여줍니다.

![Motion Transfer result 1](https://static.wikidocs.net/images/page/366382/gh_8f6b44dfd816.png)

예를 들어 특정 작업이 ALOHA 데이터에만 포함되어 있어도, 다른 로봇이 그 작업을 수행할 수 있다면 이는 단순 암기가 아니라 embodiment 사이의 공통 동작 개념을 학습했다는 의미가 됩니다.

즉, Motion Transfer는 로봇 학습을 "각 로봇마다 따로 배우는 방식"에서 "여러 로봇의 경험을 공유하는 방식"으로 바꾸려는 시도입니다.

![Motion Transfer result 2](https://static.wikidocs.net/images/page/366382/gh_5b7f17865d53.png)

#### 1-4. Thinking이 행동을 돕는가

Gemini Robotics 1.5는 thinking mode를 통해 복잡한 작업을 더 작은 단계로 나눕니다.

이 방식은 특히 multi-step task에서 중요합니다.

작업이 길어질수록 모델이 현재 목표를 잊거나, 다음 행동을 잘못 선택할 가능성이 커지기 때문입니다.

Thinking trace는 이런 문제를 줄여줍니다.

모델은 먼저 현재 상황을 해석하고, 다음에 수행할 짧은 목표를 정한 뒤, 그 목표를 실제 행동으로 바꿉니다.

공식 블로그도 Gemini Robotics 1.5가 긴 작업을 더 단순한 짧은 segment로 나누며, 이를 통해 새로운 작업과 환경 변화에 더 robust해질 수 있다고 설명합니다.

![Thinking result 1](https://static.wikidocs.net/images/page/366382/gh_f4e9d1c9c57b.png)

![Thinking result 2](https://static.wikidocs.net/images/page/366382/gh_b9d36bcc8bca.png)

#### 1-5. Agentic system

Gemini Robotics 1.5의 중요한 변화는 ER 모델과 VLA 모델을 결합한 agentic system입니다.

이 구조에서는 Gemini Robotics-ER 1.5가 전체 목표를 관리하고, Gemini Robotics 1.5가 각 단계를 실행합니다.

단순한 pick-and-place 작업에서는 VLA 모델만으로도 충분할 수 있습니다.

하지만 긴 작업에서는 계획, 기억, 도구 사용, 성공 여부 판단이 필요합니다.

예를 들어 가방을 싸는 작업에서는 무엇을 넣어야 하는지 정해야 하고, 이미 넣은 물건과 아직 넣지 않은 물건을 구분해야 합니다.

분리수거 작업에서는 규칙을 찾아보고, 각 물체를 올바른 분류 기준에 맞춰야 할 수 있습니다.

이런 작업에서는 ER 모델이 상위 계획을 세우고, VLA 모델이 실제 행동을 실행하는 구조가 더 적합합니다.

DeepMind는 두 모델이 함께 사용될 때 로봇이 더 긴 작업과 다양한 환경에 일반화하는 능력이 증가한다고 설명합니다.

![Agentic system](https://static.wikidocs.net/images/page/366382/gh_8b23ecbe24d7.png)

이 결과의 핵심은 Gemini Robotics 1.5가 단순히 더 좋은 VLA 모델이 아니라는 점입니다.

1.5는 로봇이 계획하고, 행동하고, 결과를 확인하고, 다시 다음 행동을 정하는 구조로 확장되었다는 점에서 의미가 있습니다.

## Ⅴ. 한계점

### Gemini Robotics 1.5의 한계

Gemini Robotics 1.5는 중요한 진전을 보여주지만, 아직 완성형 범용 로봇이라고 보기는 어렵습니다.

첫째, 실제 배포와 안전성 문제는 여전히 남아 있습니다.

로봇은 물리 세계에서 움직이기 때문에, 잘못된 행동은 단순한 오답이 아니라 실제 위험으로 이어질 수 있습니다. DeepMind도 semantic reasoning, respectful dialogue, onboard collision avoidance 같은 다층적 safety approach를 사용한다고 설명합니다.

둘째, Motion Transfer가 모든 embodiment 차이를 완전히 해결하는 것은 아닙니다.

로봇의 몸체, 센서, gripper, 관절 구조가 크게 달라지면 여전히 성능 차이가 생길 수 있습니다.

셋째, agentic system은 강력하지만 복잡합니다.

상위 계획이 틀리면 실행 모델이 잘 움직여도 실패할 수 있고, 반대로 계획은 맞아도 실제 조작이 실패하면 전체 작업은 완료되지 않습니다.

정리하면 Gemini Robotics 1.5는 로봇 에이전트로 가는 중요한 단계이지만, 실제 배포를 위해서는 안전성, embodiment gap, 시스템 복잡성을 계속 해결해야 합니다.

## Ⅵ. 정리

### Gemini Robotics 1.5 정리

Gemini Robotics 1.5는 로봇이 단순히 지시를 행동으로 바꾸는 수준을 넘어, 생각하고 계획하며 여러 로봇 몸체에서 행동하는 방향으로 확장된 모델입니다.

핵심은 세 가지입니다.

첫째, Gemini Robotics-ER 1.5가 물리 세계를 이해하고 작업을 계획합니다.

둘째, Gemini Robotics 1.5가 각 단계를 실제 로봇 행동으로 바꿉니다.

셋째, Motion Transfer와 Thinking VLA를 통해 여러 로봇 사이의 skill transfer와 multi-step task 수행 능력을 높입니다.

특히 1.5는 로봇이 바로 움직이기보다, 먼저 자연어로 상황과 목표를 정리하고 그다음 행동하도록 만든다는 점에서 의미가 있습니다.

이 과정은 긴 작업을 더 작은 단계로 나누고, 사람이 로봇의 행동 이유를 이해하는 데도 도움을 줍니다.

하지만 여전히 모든 로봇과 모든 작업에 바로 적용되는 완성형 모델은 아닙니다.

실제 배포를 위해서는 안전성, embodiment 차이, agentic system의 복잡성 문제가 남아 있습니다.

한 문장으로 정리하면, Gemini Robotics 1.5는 VLA 모델을 "행동 생성기"에서 "물리 세계에서 생각하고 행동하는 로봇 에이전트"로 확장한 모델이라고 볼 수 있습니다.

## 참고문헌

Gemini Robotics Team. Gemini Robotics 1.5: Pushing the Frontier of Generalist Robots with Advanced Embodied Reasoning, Thinking, and Motion Transfer. arXiv, 2025.

Google DeepMind. Gemini Robotics 1.5 brings AI agents into the physical world. 2025.
