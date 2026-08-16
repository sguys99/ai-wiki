---
title: "03-06. OpenVLA - 모두의 로보틱스 - VLA 입문"
type: article
year: 2026
category: physical-ai
raw_path: raw/articles/jo-2026-openvla-vla-primer.md
raw_filename: "jo-2026-openvla-vla-primer.md"
source_collection: external
author: "조인령"
url: "https://wikidocs.net/366372"
publisher: "wikidocs.net"
fetched_at: "2026-08-16T00:20:04+0900"
extractor_tier: "chrome"
tags: []
figures:
  - id: fig01
    file: assets/jo-2026-openvla-vla-primer/fig01.png
    raw: raw/articles/jo-2026-openvla-vla-primer-figures/fig01.png
    caption: "OpenVLA 등장 배경"
    strategy: fetched
    curated: false
  - id: fig02
    file: assets/jo-2026-openvla-vla-primer/fig02.png
    raw: raw/articles/jo-2026-openvla-vla-primer-figures/fig02.png
    caption: "OpenVLA 모델 개요"
    strategy: fetched
    curated: false
  - id: fig03
    file: assets/jo-2026-openvla-vla-primer/fig03.png
    raw: raw/articles/jo-2026-openvla-vla-primer-figures/fig03.png
    caption: "Open X-Embodiment 개요"
    strategy: fetched
    curated: false
  - id: fig04
    file: assets/jo-2026-openvla-vla-primer/fig04.png
    raw: raw/articles/jo-2026-openvla-vla-primer-figures/fig04.png
    caption: "단일 이미지와 자연어 지시 입력"
    strategy: fetched
    curated: false
  - id: fig05
    file: assets/jo-2026-openvla-vla-primer/fig05.png
    raw: raw/articles/jo-2026-openvla-vla-primer-figures/fig05.png
    caption: "OpenVLA 전체 구조"
    strategy: fetched
    curated: false
  - id: fig06
    file: assets/jo-2026-openvla-vla-primer/fig06.png
    raw: raw/articles/jo-2026-openvla-vla-primer-figures/fig06.png
    caption: "Fused vision encoder"
    strategy: fetched
    curated: false
  - id: fig07
    file: assets/jo-2026-openvla-vla-primer/fig07.png
    raw: raw/articles/jo-2026-openvla-vla-primer-figures/fig07.png
    caption: "Projector 구조"
    strategy: fetched
    curated: false
  - id: fig08
    file: assets/jo-2026-openvla-vla-primer/fig08.png
    raw: raw/articles/jo-2026-openvla-vla-primer-figures/fig08.png
    caption: "Llama 2 backbone"
    strategy: fetched
    curated: false
  - id: fig09
    file: assets/jo-2026-openvla-vla-primer/fig09.png
    raw: raw/articles/jo-2026-openvla-vla-primer-figures/fig09.png
    caption: "BridgeData V2 평가 결과"
    strategy: fetched
    curated: false
  - id: fig10
    file: assets/jo-2026-openvla-vla-primer/fig10.png
    raw: raw/articles/jo-2026-openvla-vla-primer-figures/fig10.png
    caption: "Google robot 평가 결과"
    strategy: fetched
    curated: false
  - id: fig11
    file: assets/jo-2026-openvla-vla-primer/fig11.png
    raw: raw/articles/jo-2026-openvla-vla-primer-figures/fig11.png
    caption: "새로운 작업 적응 결과"
    strategy: fetched
    curated: false
  - id: fig12
    file: assets/jo-2026-openvla-vla-primer/fig12.png
    raw: raw/articles/jo-2026-openvla-vla-primer-figures/fig12.png
    caption: "LoRA fine-tuning 비교"
    strategy: fetched
    curated: false
  - id: fig13
    file: assets/jo-2026-openvla-vla-primer/fig13.png
    raw: raw/articles/jo-2026-openvla-vla-primer-figures/fig13.png
    caption: "Quantization 비교"
    strategy: fetched
    curated: false
  - id: fig14
    file: assets/jo-2026-openvla-vla-primer/page-full.png
    raw: raw/articles/jo-2026-openvla-vla-primer-figures/page-full.png
    caption: "전체 페이지 스크린샷"
    strategy: screenshot
    curated: false
---

> 수집 메모 — `scripts/fetch_article.py` 가 사용자의 명시적 URL 지시에 따라 가져왔다 (CLAUDE.md rule #1 의 자료 수집 예외). 추출 tier: `chrome`. 본문은 원문 그대로이며 요약·번역·윤문하지 않았다.
> `category` 는 임시값이므로 Step 3 에서 확정할 것.

---

## Ⅰ. 모델 등장 배경

### 1. OpenVLA 연구의 등장 배경

앞서 살펴본 흐름에서 Gato는 하나의 큰 모델이 여러 종류의 작업을 함께 다룰 수 있다는 가능성을 보여주었고, RT-1은 이런 흐름을 실제 로봇 조작 데이터로 확장해 generalist robot policy의 방향을 구체화했습니다. 그리고 RT-2는 인터넷 규모의 vision-language model을 로봇 action prediction에 연결하면서, 이미지와 언어를 함께 이해한 뒤 행동으로 이어지는 VLA의 대표적인 형태를 보여주었습니다.

반면 앞서 살펴본 ACT는 RT-1, RT-2처럼 대규모 vision-language 기반 generalization을 확장하는 흐름이라기보다, 정밀 로봇 조작에서 모방학습이 쉽게 무너지는 문제를 다루며 action을 어떤 방식으로 예측할 것인가에 더 집중한 접근이었습니다. OpenVLA는 다시 RT-1과 RT-2가 보여준 흐름 위에서

> 이미지와 언어를 함께 이해하는 foundation model을 실제 로봇 행동 예측에 연결할 수 있는가

라는 질문을 이어받는 연구라고 볼 수 있습니다.

![OpenVLA 등장 배경](https://static.wikidocs.net/images/page/366372/gh_e9d854117712.png)

하지만 여기에는 여전히 남아 있던 문제가 있었습니다. 기존에 좋은 성능을 보여준 VLA 모델은 대체로 비공개되어 있을 뿐만 아니라, 모델 구조나 학습 절차, fine-tuning 방식이 충분히 공개되어 있지 않았습니다.

이런 흐름에서 OpenVLA 논문은 기존 VLA의 확산을 막는 핵심 문제로 비공개성과 효율적인 fine-tuning 기준의 부재를 직접 지적합니다. OpenVLA 연구의 등장 배경은 단순히 새로운 모델을 하나 더 제안하는 데 있지 않습니다.

> RT-2가 보여준 VLA의 방향을 오픈소스 기반으로 다시 구현하고, 이를 새로운 환경에도 실제로 fine-tuning할 수 있는 형태로 만들 수 있는가

그래서 OpenVLA는 한편으로는 RT-1, RT-2처럼 vision-language model을 robot action prediction으로 확장하는 흐름을 잇고, 다른 한편으로는 기존 VLA 모델의 한계였던 폐쇄성을 정면으로 다루고 있다고 볼 수 있습니다.

## Ⅱ. 배경지식

### 1. OpenVLA: 오픈소스 기반 시각-언어-행동 모델

OpenVLA는 이미지와 언어 지시를 함께 받아 로봇의 행동을 예측하는 모델입니다. 앞서 살펴본 RT-1, RT-2처럼, 로봇이 현재 장면을 보고 사람이 준 지시를 이해한 뒤 어떤 행동을 해야 하는지 예측하는 흐름 위에 있습니다.

다만 OpenVLA의 의미는 단순히 또 하나의 VLA 모델을 제안했다는 데 있지 않습니다. 이 논문은 7B 규모의 오픈소스 VLA 모델을 제안하고, 이를 대규모 로봇 조작 데이터로 학습시켜 여러 종류의 로봇과 작업에 사용할 수 있는 범용 조작 정책으로 제시합니다.

![OpenVLA 모델 개요](https://static.wikidocs.net/images/page/366372/gh_6a1ee0cc41ee.png)

#### 1-1. Open X-Embodiment는 무엇인가

[https://robotics-transformer-x.github.io/](https://robotics-transformer-x.github.io/) OpenVLA를 이해하려면 먼저 Open X-Embodiment를 짚고 넘어갈 필요가 있습니다.

Open X-Embodiment는 하나의 로봇이나 하나의 연구실에서 만든 데이터셋이 아닙니다. 여러 연구기관과 로봇 시스템에서 수집한 로봇 조작 데이터를 모아 둔 대규모 데이터 모음입니다.

![Open X-Embodiment 개요](https://static.wikidocs.net/images/page/366372/gh_9555f5232dfe.png)

쉽게 말하면, 다양한 로봇들이 여러 환경에서 여러 작업을 수행한 기록을 모아 놓은 데이터 기반입니다.

```
여러 종류의 로봇
+ 여러 작업
+ 여러 환경
→ 하나의 대규모 로봇 조작 데이터 모음
```

하지만 OpenVLA가 Open X-Embodiment에 들어 있는 모든 데이터를 그대로 사용한 것은 아닙니다. 데이터셋마다 카메라 구성, 로봇 종류, 행동 기록 방식이 다를 수 있기 때문에, 그대로 섞어 학습하면 입력과 출력 형태가 너무 달라질 수 있습니다.

그래서 OpenVLA는 로봇 행동 예측에 적합한 데이터를 선별해서 사용했습니다. 선별 기준은 크게 두 가지입니다.

```
1. 실제 조작 작업 데이터일 것
2. 입력과 출력 형태가 비교적 일관될 것
```

여기서 실제 조작 작업 데이터란 로봇이 물체를 집고, 옮기고, 넣고, 정리하는 것처럼 손이나 집게를 이용해 물체와 상호작용하는 데이터를 말합니다. 단순 이동이나 로봇의 내부 상태만 담긴 데이터보다는, 이미지와 행동이 함께 연결된 조작 데이터를 사용한 것입니다.

또한 OpenVLA는 최소 하나의 외부 카메라가 있는 데이터를 사용했습니다. 외부 카메라는 로봇 손목에 달린 카메라가 아니라, 작업 공간을 밖에서 바라보는 카메라를 의미합니다. 이 카메라가 있어야 모델이 물체의 위치, 로봇 손의 위치, 작업 장면 전체를 보고 행동을 예측할 수 있습니다.

```
외부 카메라 이미지
→ 현재 장면과 물체 위치를 파악하는 정보
```

출력 측면에서는 단일 로봇 팔의 말단 위치 데이터를 중심으로 사용했습니다. 여기서 말단은 로봇 팔 끝부분, 즉 집게나 그리퍼가 달린 부분을 의미합니다.

쉽게 말해 OpenVLA는 여러 종류의 로봇 데이터 중에서도 다음과 같은 형태의 데이터를 주로 골랐습니다.

```
현재 장면 이미지
+ 언어 지시
+ 로봇 팔 끝부분이 어떻게 움직였는지에 대한 기록
```

이렇게 데이터를 선별한 이유는 OpenVLA가 이미지와 언어 지시를 보고 다음 로봇 행동을 예측해야 하기 때문입니다. 그러려면 학습 데이터에도 “무엇을 보고”, “어떤 지시를 받고”, “어떻게 움직였는지”가 함께 들어 있어야 합니다.

OpenVLA는 이렇게 선별한 데이터 약 970k개 로봇 에피소드를 사용해 학습했습니다. 정리하면 Open X-Embodiment는 OpenVLA가 여러 로봇과 여러 작업을 학습할 수 있게 해 준 대규모 데이터 기반입니다. 다만 OpenVLA는 그중에서도 이미지와 행동 기록이 잘 연결되어 있고, 로봇 행동 예측에 맞는 데이터를 선별해 사용했습니다.

```
Open X-Embodiment 전체 데이터
→ 조작 작업 데이터 선별
→ 외부 카메라가 있는 데이터 사용
→ 단일 로봇 팔의 말단 제어 데이터 중심으로 정리
→ 약 970k개 로봇 에피소드로 OpenVLA 학습
```

#### 1-2. OpenVLA가 목표로 하는 것

OpenVLA의 목표는 특정 로봇 하나에만 맞춘 정책을 만드는 것이 아닙니다. 목표는 다음과 같습니다.

> 이미지와 언어를 이해하는 큰 모델을 바탕으로, 여러 로봇과 여러 조작 작업에 사용할 수 있는 범용 로봇 정책을 만드는 것

기존의 VLA 모델들은 좋은 성능을 보였지만, 대부분 비공개였습니다. 모델 구조, 학습 절차, 세부 구현 방식이 충분히 공개되어 있지 않아 연구자들이 직접 재현하거나 새로운 로봇에 맞게 수정하기 어려웠습니다.

OpenVLA는 이 문제를 해결하기 위해 모델과 학습 방법을 공개 가능한 형태로 정리했습니다.

#### 1-3. OpenVLA를 한 문장으로 정리하면

OpenVLA는 이미지와 언어 지시를 입력으로 받아 로봇 행동을 예측하는 오픈소스 VLA 모델입니다. 조금 더 구체적으로 말하면, OpenVLA는 대규모 로봇 조작 데이터로 학습된 7B 규모의 모델이며, 여러 로봇과 여러 작업에 적용할 수 있는 범용 조작 정책을 목표로 합니다.

정리하면 다음과 같습니다.

```
입력:
현재 장면 이미지 + 언어 지시

출력:
로봇이 수행할 행동

학습 데이터:
Open X-Embodiment에서 선별한 약 970k개 로봇 에피소드

목표:
여러 로봇과 여러 작업에 적용 가능한 오픈소스 범용 조작 정책
```

따라서 OpenVLA는 기존 VLA 흐름을 이어받으면서도, 이를 공개적이고 재현 가능한 형태로 정리한 실용적인 범용 로봇 정책이라고 볼 수 있습니다.

## Ⅲ. 모델 구조

### 1. OpenVLA의 입력과 출력 구조

OpenVLA의 입출력 구조는 큰 틀에서 앞서 살펴본 RT-1, RT-2와 비슷합니다. 모델은 현재 장면 이미지와 사람이 준 언어 지시를 함께 보고, 그 상황에서 로봇이 수행해야 할 행동을 예측합니다.

```
현재 장면 이미지
+ 자연어 지시
→ 로봇 행동
```

이미지와 언어를 함께 보고 행동을 만든다는 점에서는 기존 VLA 계열 모델과 같은 흐름에 있습니다. 따라서 이 장에서는 입력과 출력 구조를 다시 길게 반복하기보다, OpenVLA에서 특히 기억해야 할 차이점만 짚고 넘어가겠습니다.

#### 1-1. 입력: 단일 이미지와 자연어 지시

OpenVLA에서 먼저 기억해야 할 점은 현재 시점의 이미지 한 장을 사용한다는 것입니다. 모델은 이 이미지와 자연어 지시를 함께 보고, 지금 어떤 행동을 해야 하는지 예측합니다.

![단일 이미지와 자연어 지시 입력](https://static.wikidocs.net/images/page/366372/gh_79b511eb8ab6.png)

예를 들어 논문 그림에서는 다음과 같은 지시가 등장합니다.

```
Put eggplant in bowl
```

이 경우 모델은 이미지에서 가지와 그릇이 어디에 있는지 파악하고, 지시문을 통해 “가지를 그릇 안에 넣어야 한다”는 목표를 이해해야 합니다. OpenVLA는 긴 영상이나 여러 시점의 관측 기록을 사용하는 구조가 아닙니다.

현재 장면을 보여주는 단일 이미지를 기준으로 행동을 예측합니다. 이 점은 ACT와 비교하면 더 분명해집니다.

```
ACT
→ 여러 카메라 이미지 + 현재 관절 상태

OpenVLA
→ 단일 이미지 + 자연어 지시
```

ACT는 정밀 조작을 위해 여러 카메라와 로봇의 현재 관절 상태를 함께 사용했습니다. 반면 OpenVLA는 현재 보이는 이미지 한 장과 언어 지시를 중심으로 행동을 결정합니다.

이 구조는 단순하고 범용적으로 쓰기 좋지만, 한계도 있습니다. 이미지 한 장에 보이지 않는 정보, 과거 움직임, 로봇의 정확한 내부 상태까지 모두 직접 반영하기는 어렵기 때문입니다.

그래서 OpenVLA를 이해할 때는 “강력한 시각-언어 모델을 로봇 행동 예측에 연결했다”는 점과 함께, 현재 버전은 단일 이미지 기반 정책이라는 점을 같이 기억하는 것이 좋습니다.

#### 1-2. 출력: 7차원 로봇 행동

OpenVLA가 출력하는 것은 자연어 문장이 아닙니다. 최종 출력은 로봇을 실제로 움직이기 위한 7차원 행동 값입니다.

쉽게 말하면, 로봇 팔 끝부분을 어떻게 움직일지에 대한 숫자 명령입니다.

```
로봇 팔 끝부분을 얼마나 이동할지
+ 어느 방향으로 자세를 바꿀지
+ 그리퍼를 열거나 닫을지
→ 7차원 로봇 행동
```

논문 그림에서는 이를 간단히 다음처럼 표현합니다.

```
[Δx, Δθ, ΔGrip]
```

여기서 $\Delta x$는 로봇 팔 끝부분의 위치 변화, $\Delta \theta$는 자세 변화, $\Delta \text{Grip}$은 그리퍼 제어로 이해하면 됩니다. 중요한 점은 OpenVLA가 여러 로봇 데이터를 함께 학습하기 위해, 행동 표현을 비교적 공통적으로 맞추었다는 것입니다.

그래서 OpenVLA는 Open X-Embodiment 전체 데이터를 무작정 쓰지 않고, 조작 작업과 단일 로봇 팔의 말단 제어 데이터를 중심으로 선별했습니다. 이렇게 해야 서로 다른 로봇에서 모은 데이터라도 다음과 같은 공통된 형태로 정리할 수 있습니다.

```
이미지와 지시를 보고
→ 로봇 팔 끝부분의 다음 움직임을 예측
```

#### 1-3. Action Tokenization: RT-2와 같은 흐름, 다른 구간 설정

OpenVLA는 언어모델을 기반으로 합니다. 언어모델은 원래 다음 단어 토큰을 예측하도록 만들어진 모델이기 때문에, 연속적인 로봇 행동 값을 그대로 출력하기 어렵습니다.

그래서 OpenVLA도 RT-2와 마찬가지로 로봇 행동을 action token 형태로 바꿔 예측합니다.

```
연속적인 로봇 행동 값
→ 구간으로 나누기
→ action token으로 표현
→ 언어모델이 token 예측
→ 다시 로봇 제어값으로 변환
```

큰 구조는 RT-2와 같습니다. 각 행동 차원을 여러 구간으로 나누고, 그 구간을 하나의 token처럼 다루는 방식입니다. 또한 새로운 action token을 완전히 따로 추가하기보다, tokenizer에서 거의 사용되지 않는 256개의 token을 action token으로 재활용합니다.

OpenVLA와 RT-2에서 차이는 구간을 나누는 기준입니다. RT-2는 action 값의 최소값과 최대값 범위를 기준으로 구간을 나누었습니다.

반면 OpenVLA는 학습 데이터에서 각 action 차원의 1%–99% 범위를 기준으로 256개 구간을 만듭니다.

```
RT-2:
최소값 ~ 최대값 범위를 256개 구간으로 나눔

OpenVLA:
1% ~ 99% 범위를 256개 구간으로 나눔
```

이렇게 하는 이유는 드물게 튀는 값 때문입니다.

로봇 데이터에는 아주 드물게 큰 움직임이나 비정상적으로 튀는 action 값이 들어갈 수 있습니다. 이런 값까지 모두 포함해서 최소값과 최대값을 잡으면, 전체 구간이 불필요하게 넓어집니다.

그 결과 실제로 자주 등장하는 작은 움직임들이 너무 거칠게 나뉠 수 있습니다. OpenVLA는 1%–99% 범위를 사용해 이런 극단값의 영향을 줄입니다.

덕분에 자주 등장하는 action 범위를 더 세밀하게 표현할 수 있습니다. 정리하면 다음과 같습니다.

> OpenVLA의 Action Tokenization은 RT-2와 같은 큰 틀을 따르지만, action 구간을 나눌 때 최소-최대 범위 대신 1%–99% 범위를 사용해 극단값의 영향을 줄인다는 차이가 있습니다.

### 2. OpenVLA의 전체 구조

OpenVLA의 구조는 크게 세 부분으로 나누어 볼 수 있습니다.

![OpenVLA 전체 구조](https://static.wikidocs.net/images/page/366372/gh_5bbc35ec08df.png)

- vision encoder
- projector
- LLM backbone

즉 전체 흐름은

```
이미지 이해
→ 언어모델이 읽을 수 있는 표현으로 변환
→ action token 생성
→ 최종 robot action 출력
```

입니다. OpenVLA는 완전히 새로운 로봇 전용 backbone을 처음부터 만든 구조라기보다, Prismatic-7B VLM을 기반으로 가져와 robot action prediction에 맞게 fine-tuning한 형태입니다.

#### 2-1. Vision Encoder

OpenVLA의 첫 번째 핵심은 vision encoder입니다.

![Fused vision encoder](https://static.wikidocs.net/images/page/366372/gh_e29d8610f10c.png)

OpenVLA는 단일 시각 인코더를 쓰지 않고, SigLIP와 DINOv2를 함께 사용하는 fused vision encoder를 사용합니다. 입력 이미지는 두 인코더를 각각 통과하고, 그 결과 feature를 channel-wise concatenate 해서 하나의 시각 표현으로 만듭니다.

여기서 중요한 점은 두 인코더가 보는 정보의 성격이 조금 다르다는 것입니다.

- SigLIP는 비교적 의미 정보(semantic feature)에 강하고
- DINOv2는 더 저수준의 공간 정보(spatial feature)를 보완합니다.

즉 단순하게 말하면,

- SigLIP는 “무엇이 있는가”
- DINOv2는 “어디에 어떻게 있는가”

를 더 잘 보완한다고 이해할 수 있습니다. 논문도 DINOv2를 추가한 이유를 공간적 추론 능력의 향상과 연결해 설명합니다.

이 차이는 로봇 조작에서 특히 중요합니다. 로봇이 컵이나 그릇을 조작할 때는 단순히 물체가 있다는 사실만 아는 것으로는 부족합니다. 물체가 어디에 놓여 있는지, 어느 방향으로 기울어져 있는지, 손끝을 어느 각도로 접근시켜야 하는지가 중요합니다.

즉 로봇 제어에서는 의미 정보만이 아니라 공간 정보도 매우 중요합니다. 논문도 이런 fused 구조가 실제로 도움이 된다고 보고합니다.

Appendix의 실험에서는 DINOv2를 제거한 SigLIP-only 구조가 SigLIP와 DINOv2를 함께 사용하는 구조보다 평균 성능이 더 낮았고, 저자들은 이를 통해 DINOv2가 일부 일반화된 상황에서 실제로 도움이 된다고 설명합니다. 또 하나 중요한 점은, OpenVLA가 vision encoder를 단순히 가져다만 쓰지 않았다는 것입니다.

논문은 frozen vision보다 fine-tuned vision이 더 좋은 성능을 보였다고 설명합니다. 즉 인터넷 이미지로 사전학습된 일반 visual feature만으로는 부족했고, 로봇 조작에 필요한 더 세밀한 공간 정보에 맞게 vision encoder도 다시 적응할 필요가 있었던 것입니다.

#### 2-2. Projector

vision encoder가 만든 feature는 곧바로 언어모델로 들어가지 않습니다.

![Projector 구조](https://static.wikidocs.net/images/page/366372/gh_ba7b1e31c724.png)

이 feature는 2-layer MLP projector를 거쳐 language embedding space로 옮겨집니다. 즉 projector는 “시각 특징을 언어모델이 이해할 수 있는 형식으로 바꿔 주는 연결부”라고 이해하면 됩니다.

vision encoder는 이미지에서 feature를 뽑고, LLM backbone은 원래 텍스트 토큰을 처리하도록 학습된 모델이기 때문에 그 둘 사이에는 표현 공간을 맞춰 주는 단계가 필요합니다. projector가 바로 그 역할을 합니다. OpenVLA에서 projector의 역할은 복잡한 추론 자체보다 시각 정보를 LLM이 사용할 수 있게 연결하는 것에 있습니다.

#### 2-3. LLM Backbone

OpenVLA의 backbone은

![Llama 2 backbone](https://static.wikidocs.net/images/page/366372/gh_3be682886628.png)

Llama 2 7B입니다. OpenVLA는 처음부터 로봇용 네트워크를 새로 설계한 구조가 아니라, 이미 강한 LLM을 사용하고 그 위에 vision feature와 robot action prediction을 얹은 구조입니다.

그리고 기반 VLM으로는 Prismatic-7B를 사용합니다. Prismatic은

- SigLIP + DINOv2 visual encoder
- 2-layer projector
- Llama 2 7B backbone

으로 구성된 open VLM이며, OpenVLA는 이를 로봇 action prediction으로 fine-tune한 형태입니다. 여기서 중요한 점은 Llama 2가 자연어 문장을 생성하는 대신, OpenVLA에서는 action token sequence를 생성한다는 것입니다.

즉 OpenVLA는 이미지와 instruction을 받아 그에 맞는 robot action을 직접 회귀하는 것이 아니라, 우선 action token을 순차적으로 예측하고 이를 다시 최종 robot action으로 바꾸는 방식으로 동작합니다. 즉 이 구조의 핵심은 LLM을 “문장 생성기”로 쓰는 것이 아니라, 시각 정보와 언어 조건을 함께 보고 action token을 생성하는 policy backbone으로 쓴다는 점입니다.

#### 2-4. 왜 Prismatic-7B를 backbone으로 사용했는가

논문은 backbone 선택 과정에서 IDEFICS-1, LLaVA, Prismatic 등을 비교했습니다. 그 결과 저자들은 Prismatic 기반 정책이 더 나은 성능을 보였고, 그 이유 중 하나로 fused SigLIP-DINOv2가 주는 spatial reasoning 이점을 설명합니다.

또한 논문은 Prismatic이 더 모듈화되어 있고 사용하기 쉬운 codebase를 가지고 있어, robot action prediction으로 확장하기 좋은 기반이었다고 설명합니다. 즉 OpenVLA가 Prismatic을 사용한 이유는 단순히 성능만이 아니라, 오픈소스 기반으로 확장하고 fine-tuning하기 좋은 VLM이었기 때문입니다.

#### 2-5. 정리

정리하면 OpenVLA의 전체 구조는

```
입력 이미지
→ SigLIP + DINOv2가 서로 다른 시각 feature 추출
→ feature를 결합
→ projector가 language embedding space로 변환
→ Llama 2가 action token 생성
→ 최종 robot action 출력
```

의 흐름으로 이해할 수 있습니다. 즉 OpenVLA의 핵심은 단순히 큰 language model을 썼다는 데 있지 않습니다.

- SigLIP와 DINOv2를 함께 사용해 semantic + spatial 정보를 함께 담고
- projector로 이를 LLM이 읽을 수 있는 형식으로 바꾸고
- LLM이 이를 바탕으로 action token을 생성하도록 만들었다

는 점이 더 중요합니다. 즉 OpenVLA는 완전히 새로운 로봇 전용 backbone이라기보다, 강한 open VLM을 로봇 정책으로 확장한 구조라고 보는 것이 더 정확합니다.

### 3. OpenVLA의 학습 방식과 데이터

OpenVLA는 사전학습된 시각-언어 모델인 Prismatic-7B를 로봇 행동 예측에 맞게 미세조정하는 방식으로 학습됩니다. 즉, 완전히 새로운 정책을 처음부터 학습하는 것이 아니라, 이미 이미지와 언어를 함께 다룰 수 있는 모델 위에 로봇 행동 예측 능력을 얹는 구조입니다.

이때 사용된 학습 데이터의 기반은 Open X-Embodiment(OpenX)입니다. OpenX는 하나의 단일 로봇 데이터셋이 아니라, 여러 로봇, 여러 장면, 여러 작업에서 수집된 대규모 로봇 시연 데이터를 묶어 놓은 로봇 시연 데이터 모음입니다.

OpenVLA는 이 가운데 로봇 조작에 적합한 데이터를 정제해 사용했고, 최종적으로 970k trajectories 규모의 학습 데이터를 사용했습니다. 하지만 OpenX 전체를 그대로 넣은 것은 아닙니다.

논문의 목표는 여러 embodiment, 여러 장면, 여러 작업을 담으면서도 입력과 출력 형식을 최대한 일관되게 맞추는 것이었습니다. 그래서 먼저 데이터 필터링을 수행합니다.

논문은

- 조작(manipulation) 데이터만 남기고
- 최소 한 개 이상의 3인칭 시점 카메라가 있어야 하며
- 단일 팔 말단 제어(single-arm end-effector control)를 사용하는 데이터만 남기는

방식으로 입력과 출력 공간을 맞춥니다. 즉, 여러 데이터셋을 단순히 한데 모은 것이 아니라, 하나의 VLA가 공통된 형식으로 학습할 수 있도록 정리한 것입니다.

그다음에는 데이터 혼합 비율도 조정합니다. 논문은 Octo에서 사용한 혼합 비율을 참고해, 다양성이 낮은 데이터셋은 비중을 낮추고 장면과 작업 다양성이 더 큰 데이터셋은 비중을 높입니다.

또한 DROID도 일부 포함해 보았지만, 논문에 따르면 이 데이터에서는 행동 토큰 정확도가 계속 낮게 유지되었습니다. 그래서 최종 학습의 마지막 3분의 1에서는 DROID를 혼합에서 제거했습니다.

즉 OpenVLA의 성능은 단순히 데이터 양만이 아니라, 어떤 데이터를 어떤 비율로 섞어 학습했는가와도 강하게 연결되어 있습니다. 이렇게 정리된 데이터 위에서 OpenVLA는 로봇 행동 예측 문제를 언어모델이 다룰 수 있는 행동 토큰 예측 문제로 바꾸어 학습합니다.

그리고 손실은 예측된 행동 토큰에 대해서만 계산됩니다. 즉 OpenVLA의 학습은 새로운 복잡한 손실 함수를 설계했다기보다, 기존 시각-언어 모델을 로봇 행동 예측에 맞게 일관된 데이터 형식 위에서 미세조정하는 과정이라고 볼 수 있습니다.

논문은 이와 함께 몇 가지 중요한 학습 설정도 강조합니다. 최종 학습에서는 224×224 해상도를 사용했고, 시각 인코더는 고정하지 않고 함께 미세조정했습니다.

또한 일반적인 언어모델 학습보다 더 많은 반복이 필요했으며, 실제 로봇 성능은 행동 토큰 정확도가 95%를 넘을 때까지 계속 증가했다고 설명합니다. 최종 모델은 27 epoch 동안 학습되었고, 가장 좋은 결과는 고정 학습률 2e-5에서 얻어졌습니다.

즉 OpenVLA의 학습은 단순히 큰 언어모델 위에 로봇 데이터를 조금 얹는 수준이 아니라, 로봇 행동 예측에 맞게 시각 인코더와 언어모델을 함께 충분히 적응시키는 과정이라고 볼 수 있습니다. 또 하나 흥미로운 구현상의 선택도 있습니다.

행동 토큰은 256개가 필요하지만, Llama 토크나이저는 미세조정 시 새로 넣을 수 있는 특수 토큰 수가 많지 않습니다. 그래서 OpenVLA는 별도의 큰 출력 어휘를 새로 만드는 대신, 기존 어휘에서 가장 적게 쓰이는 마지막 256개 토큰을 행동 토큰으로 덮어쓰는 방식을 사용합니다.

즉 OpenVLA는 행동을 완전히 별도의 출력 공간으로 두기보다, 기존 언어모델의 토큰 공간 안으로 끌어들여 학습한다고 볼 수 있습니다.

### 4. OpenVLA의 설계 선택

논문은 최종 모델을 바로 만든 것이 아니라, 그 전에 여러 설계 선택을 비교했다고 설명합니다. 이 부분은 OpenVLA가 왜 지금 구조가 되었는지를 이해하는 데 중요합니다.

#### 4-1. 어떤 VLM backbone이 좋은가

저자들은 Prismatic 외에도 IDEFICS-1, LLaVA 등을 비교했습니다. 그 결과 단일 물체 장면에서는 큰 차이가 작을 수 있었지만, 여러 물체가 동시에 등장하고 언어 지시로 올바른 대상을 골라야 하는 task에서는 LLaVA가 IDEFICS-1보다 더 강했고, Prismatic 기반 정책은 다시 그보다 더 높은 성능을 보였습니다.

논문은 그 이유 중 하나로 SigLIP-DINOv2의 fused vision backbone이 제공하는 더 나은 spatial reasoning을 듭니다.

#### 4-2. 입력 해상도는 높을수록 좋은가

OpenVLA는 224×224와 384×384를 비교했지만, 논문에서는 큰 성능 차이를 보지 못했다고 설명합니다. 반면 384×384는 학습 시간이 약 3배 더 들었습니다.

그래서 최종 모델은 224×224 해상도를 사용합니다. 즉 VLM 일반 벤치마크와 달리, 적어도 이 논문이 다룬 VLA 설정에서는 해상도를 키우는 것이 반드시 성능 향상으로 이어지지는 않았습니다.

#### 4-3. Vision encoder는 freeze해야 하는가

기존 VLM 연구에서는 vision encoder를 고정하는 편이 더 좋은 경우도 있었습니다. 하지만 OpenVLA에서는 달랐습니다.

논문은 vision encoder를 fine-tune하는 것이 중요했다고 말합니다. 즉 로봇 제어에서는 인터넷 사전학습에서 얻은 일반 visual feature만으로는 부족하고, 실제 제어에 필요한 더 세밀한 공간 정보에 맞게 vision backbone도 적응해야 한다는 것입니다.

#### 4-4. 학습 epoch은 얼마나 필요한가

일반적인 LLM/VLM 학습은 데이터셋을 1~2 epoch 정도 도는 경우가 많습니다. 하지만 OpenVLA는 그렇지 않았습니다.

논문은 실제 로봇 성능이 training action token accuracy가 95%를 넘을 때까지 계속 증가했다고 설명하며, 최종 모델은 27 epoch를 학습했습니다. 즉 VLA 학습은 단순히 foundation model 위에 조금만 얹는 수준이 아니라, robot action prediction에 충분히 적응할 때까지 상당한 반복 학습이 필요하다는 점을 보여줍니다.

#### 4-5. Learning rate는 어떻게 잡았는가

논문은 여러 learning rate를 비교했고, 최종적으로 고정 2e-5가 가장 좋았다고 보고합니다. 또한 warmup은 특별한 이득을 주지 않았다고 설명합니다.

## Ⅳ. 결과

### 1. 실험 결과와 OpenVLA의 의미

논문은 OpenVLA를 두 가지 측면에서 평가합니다. 첫째는

generalist policy로서 바로 쓸 수 있는가

둘째는

새로운 로봇과 새로운 작업에 잘 적응하는가

입니다.

#### 1-1. Out-of-the-box 성능

OpenVLA는 BridgeData V2의 WidowX와 RT-1/RT-2 평가에 쓰인 Google robot에서 평가되었습니다.

![BridgeData V2 평가 결과](https://static.wikidocs.net/images/page/366372/gh_f9b5ccdd01a0.png)

평가 축은

- visual generalization
- motion generalization
- physical generalization
- semantic generalization
- language grounding

등입니다. 논문에 따르면 BridgeData V2에서 OpenVLA는 평균적으로 RT-1-X와 Octo를 크게 앞섰고, RT-2-X보다도 더 높은 전체 성능을 보였습니다.

특히 semantic generalization을 제외한 거의 모든 축에서 더 높거나 비슷한 결과를 보였습니다.

![Google robot 평가 결과](https://static.wikidocs.net/images/page/366372/gh_544393ae78c3.png)

Google robot 평가에서는 OpenVLA와 RT-2-X가 전반적으로 비슷한 수준이었고, 둘 다 RT-1-X와 Octo를 크게 앞섰습니다. 즉 OpenVLA는 7B 모델임에도 55B의 RT-2-X와 비슷하거나 일부 환경에서는 더 나은 성능을 보였다는 점이 중요합니다.

논문은 그 이유를 몇 가지로 설명합니다.

- 더 큰 규모의 로봇 학습 데이터
- 더 정교한 데이터 정제 과정
- fused vision encoder
- open backbone 위의 일관된 VLA 학습 파이프라인

즉 OpenVLA의 성능 향상은 단순히 모델 크기 때문이 아니라, 데이터 다양성, 데이터 정제, visual feature 선택, 학습 구조의 조합에서 나온 결과라고 볼 수 있습니다.

#### 1-2. 새로운 로봇과 새로운 작업에 대한 적응

OpenVLA의 두 번째 중요한 실험은 fine-tuning입니다. 논문은 Franka-Tabletop과 Franka-DROID 환경에서, task마다 10~150개의 demonstration만 사용해 OpenVLA를 적응시킵니다.

![새로운 작업 적응 결과](https://static.wikidocs.net/images/page/366372/gh_3ab36a672ff2.png)

비교 대상은 Diffusion Policy, 입출력 조건을 맞춘 Diffusion Policy(matched), Octo, 그리고 OpenX pretraining 없이 바로 target task에 맞춘 OpenVLA(scratch)입니다. 결과는 꽤 명확합니다.

Diffusion Policy는 “Put Carrot in Bowl”처럼 비교적 좁고 단일 instruction 중심의 task에서는 강했습니다. 하지만 장면에 여러 물체가 있고, instruction에 따라 올바른 대상을 골라야 하는 diverse multi-instruction task에서는 OpenVLA와 Octo 같은 generalist pretrained policy가 더 잘 적응했습니다.

논문은 OpenVLA가 전체 평균 성능에서 가장 높았고, 모든 task에서 최소 50% 이상의 성공률을 유지한 유일한 접근이었다고 설명합니다. 즉 OpenVLA는 좁은 단일 task 하나만을 위해 특별히 최적화된 모델이라기보다, 새로운 downstream imitation learning task의 기본값(default)으로 쓰기 좋은 모델이라는 뜻입니다.

여기서 흥미로운 점은 논문이 Diffusion Policy의 장점도 분명히 인정한다는 것입니다. 아주 좁고 정교한 task에서는 Diffusion Policy가 더 부드럽고 정밀한 trajectory를 보일 수 있다고 말합니다.

그리고 OpenVLA에 action chunking이나 temporal smoothing 같은 요소를 도입하면 이런 약점을 줄일 수 있을 것이라고 논의합니다. 이 부분은 ACT와 자연스럽게 연결되는 지점이기도 합니다.

### 2. Parameter-Efficient Fine-Tuning과 Quantization

OpenVLA 논문의 중요한 기여는 단순히 성능 좋은 VLA를 제안한 데서 끝나지 않고, 현실적인 비용으로 fine-tuning하고 배포할 수 있는가까지 실험했다는 점입니다.

#### 2-1. LoRA fine-tuning

논문은 full fine-tuning, last layer only, frozen vision, sandwich fine-tuning, LoRA(rank 32, 64)를 비교합니다.

![LoRA fine-tuning 비교](https://static.wikidocs.net/images/page/366372/gh_2eb35169637a.png)

결과적으로 LoRA가 가장 좋은 trade-off를 보였습니다. full fine-tuning은 성공률 69.7 ± 7.2%, 학습 파라미터 7,188.1M, VRAM 163.3GB였습니다.

반면 LoRA rank 32는 성공률 68.2 ± 7.5%로 거의 비슷하면서, 실제 학습 파라미터는 97.6M, VRAM은 59.7GB 수준이었습니다. 즉 LoRA는 전체 성능을 거의 유지하면서도, 훨씬 적은 파라미터와 메모리로 fine-tuning할 수 있음을 보여줍니다.

논문은 rank 차이에 큰 차이가 없다고 보고하며, 기본값으로 r = 32를 추천합니다. 또한 LoRA를 사용하면 단일 A100 GPU에서 10~15시간 정도로 새로운 task에 OpenVLA를 fine-tune할 수 있다고 설명합니다.

#### 2-2. Quantization

추론 단계에서는 bfloat16, int8, int4를 비교합니다.

![Quantization 비교](https://static.wikidocs.net/images/page/366372/gh_358db7774477.png)

논문 표 기준으로

- bfloat16: 71.3 ± 4.8%, 16.8GB
- int8: 58.1 ± 5.1%, 10.2GB
- int4: 71.9 ± 4.7%, 7.0GB

입니다. 여기서 핵심은

4-bit quantization이 성능을 거의 유지하면서 메모리를 절반 이하로 줄였다는 점입니다. 반면 int8은 오히려 성능이 더 낮았습니다.

논문은 이 원인을 정밀도 자체보다 추론 속도 저하에서 찾습니다. A5000에서 int8은 약 1.2Hz로 동작했고, 이는 학습 시 사용한 5Hz non-blocking control과 시스템 동역학을 크게 다르게 만들었습니다.

반면 int4는 약 3Hz로 더 가까운 동역학을 유지했습니다. 그리고 appendix의 blocking control 실험에서는 int8도 bfloat16, int4와 비교적 비슷한 성능을 보였습니다.

즉 int8 성능 저하는 “8-bit라서 값이 틀려졌다”기보다는, 느린 추론 속도가 실제 제어 동역학을 바꾸었기 때문이라는 해석이 더 타당합니다.

## Ⅴ. 한계점

### 1. OpenVLA의 한계와 향후 방향

논문은 OpenVLA의 한계도 분명히 밝힙니다. 첫째,

현재 OpenVLA는 single-image observation만 지원합니다. 즉 멀티뷰 카메라, proprioceptive input, observation history 같은 정보를 충분히 활용하지 못합니다.

실제 로봇 시스템은 훨씬 더 다양한 감각 입력을 사용하기 때문에, 이 부분은 앞으로 확장되어야 할 중요한 과제입니다. 둘째,

추론 속도가 여전히 중요 제약입니다.

논문은 OpenVLA가 4090에서 약 6Hz로 동작한다고 보고하지만, ALOHA 같은 시스템은 50Hz 수준의 고주파 제어를 요구합니다. 따라서 더 빠른 inference optimization, action chunking, speculative decoding 같은 기법이 필요하다고 말합니다.

셋째, OpenVLA가 이전 generalist policy보다 더 강하다고 해도, 아직 매우 높은 신뢰도 수준은 아닙니다.

논문은 대부분의 task에서 성공률이 90% 미만이라고 인정합니다. 즉 OpenVLA는 매우 강한 출발점이지만, 곧바로 완성된 산업용 로봇 정책이라고 보기는 어렵습니다.

## Ⅵ. 정리

### 1. 정리

OpenVLA는 이미지와 자연어 지시를 받아 로봇 action을 직접 예측하는 오픈소스 Vision-Language-Action Model입니다. 이 모델의 핵심은 단순히 큰 모델을 제안했다는 데 있지 않습니다.

더 중요한 점은,

- pretrained VLM을 로봇 정책으로 확장했고
- continuous action을 token prediction 문제로 다시 정의했으며
- 대규모 robot data mixture 위에서 generalist policy를 만들고
- LoRA와 quantization을 통해 실제 적응성과 접근성까지 함께 보여주었다는 점입니다.

이 논문의 핵심은 로봇 제어를 완전히 별도의 문제로 떼어내기보다, foundation model의 연장선 위에서 다시 정의했다는 점에 있습니다. 그리고 이 접근이 기존 generalist policy보다 더 강한 성능과 더 현실적인 fine-tuning 경로를 동시에 만들 수 있음을 보여주었습니다.

## 그림 출처

- OpenVLA 등장 배경 이미지
- OpenVLA 모델 개요 이미지
- Open X-Embodiment 개요 이미지
- 단일 이미지와 자연어 지시 입력 이미지
- OpenVLA 전체 구조 이미지
- Fused vision encoder 이미지
- Projector 구조 이미지
- Llama 2 backbone 이미지
- BridgeData V2 평가 결과 이미지
- Google robot 평가 결과 이미지
- 새로운 작업 적응 결과 이미지
- LoRA fine-tuning 비교 이미지
- Quantization 비교 이미지

## 참고문헌

- OpenVLA: An Open-Source Vision-Language-Action Model. [https://arxiv.org/abs/2406.09246](https://arxiv.org/abs/2406.09246)
- Open X-Embodiment: Robotic Learning Datasets and RT-X Models. [https://robotics-transformer-x.github.io/](https://robotics-transformer-x.github.io/)
- Prismatic VLM. [https://prismatic-vlms.github.io/](https://prismatic-vlms.github.io/)
