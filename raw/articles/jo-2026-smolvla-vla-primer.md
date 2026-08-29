---
title: "03-10. SmolVLA - 모두의 로보틱스 - VLA 입문"
type: article
year: 2026
category: physical-ai
raw_path: raw/articles/jo-2026-smolvla-vla-primer.md
raw_filename: "jo-2026-smolvla-vla-primer.md"
source_collection: external
author: "조인령"
url: "https://wikidocs.net/366376"
publisher: "wikidocs.net"
fetched_at: "2026-08-28T08:42:00+0900"
extractor_tier: "chrome"
tags: []
figures:
  - id: fig01
    file: assets/jo-2026-smolvla-vla-primer/fig01.png
    raw: raw/articles/jo-2026-smolvla-vla-primer-figures/fig01.png
    caption: "SmolVLA 전체 구조"
    strategy: fetched
    curated: false
  - id: fig02
    file: assets/jo-2026-smolvla-vla-primer/fig02.png
    raw: raw/articles/jo-2026-smolvla-vla-primer-figures/fig02.png
    caption: "State prefix vs suffix 결과"
    strategy: fetched
    curated: false
  - id: fig03
    file: assets/jo-2026-smolvla-vla-primer/fig03.png
    raw: raw/articles/jo-2026-smolvla-vla-primer-figures/fig03.png
    caption: "Layer skipping 구조"
    strategy: fetched
    curated: false
  - id: fig04
    file: assets/jo-2026-smolvla-vla-primer/fig04.png
    raw: raw/articles/jo-2026-smolvla-vla-primer-figures/fig04.png
    caption: "Layer skipping 결과"
    strategy: fetched
    curated: false
  - id: fig05
    file: assets/jo-2026-smolvla-vla-primer/fig05.png
    raw: raw/articles/jo-2026-smolvla-vla-primer-figures/fig05.png
    caption: "Action Expert attention 구조"
    strategy: fetched
    curated: false
  - id: fig06
    file: assets/jo-2026-smolvla-vla-primer/fig06.png
    raw: raw/articles/jo-2026-smolvla-vla-primer-figures/fig06.png
    caption: "Cross/Self-Attention 비교 결과"
    strategy: fetched
    curated: false
  - id: fig07
    file: assets/jo-2026-smolvla-vla-primer/fig07.png
    raw: raw/articles/jo-2026-smolvla-vla-primer-figures/fig07.png
    caption: "Causal vs bidirectional 결과"
    strategy: fetched
    curated: false
  - id: fig08
    file: assets/jo-2026-smolvla-vla-primer/fig08.png
    raw: raw/articles/jo-2026-smolvla-vla-primer-figures/fig08.png
    caption: "Asynchronous inference Figure 2"
    strategy: fetched
    curated: false
  - id: fig09
    file: assets/jo-2026-smolvla-vla-primer/fig09.png
    raw: raw/articles/jo-2026-smolvla-vla-primer-figures/fig09.png
    caption: "Action queue Figure 3"
    strategy: fetched
    curated: false
  - id: fig10
    file: assets/jo-2026-smolvla-vla-primer/fig10.png
    raw: raw/articles/jo-2026-smolvla-vla-primer-figures/fig10.png
    caption: "SO100 실제 로봇 성능"
    strategy: fetched
    curated: false
  - id: fig11
    file: assets/jo-2026-smolvla-vla-primer/fig11.png
    raw: raw/articles/jo-2026-smolvla-vla-primer-figures/fig11.png
    caption: "SO101 OOD 결과"
    strategy: fetched
    curated: false
  - id: fig12
    file: assets/jo-2026-smolvla-vla-primer/fig12.png
    raw: raw/articles/jo-2026-smolvla-vla-primer-figures/fig12.png
    caption: "Community pretraining 결과"
    strategy: fetched
    curated: false
  - id: fig13
    file: assets/jo-2026-smolvla-vla-primer/fig13.png
    raw: raw/articles/jo-2026-smolvla-vla-primer-figures/fig13.png
    caption: "Async vs Sync 결과"
    strategy: fetched
    curated: false
  - id: fig14
    file: assets/jo-2026-smolvla-vla-primer/page-full.png
    raw: raw/articles/jo-2026-smolvla-vla-primer-figures/page-full.png
    caption: "전체 페이지 스크린샷"
    strategy: screenshot
    curated: false
---

> 수집 메모 — `scripts/fetch_article.py` 가 사용자의 명시적 URL 지시에 따라 가져왔다 (CLAUDE.md rule #1 의 자료 수집 예외). 추출 tier: `chrome`. 본문은 원문 그대로이며 요약·번역·윤문하지 않았다.
> `category` 는 임시값이므로 Step 3 에서 확정할 것.

---

## Ⅰ. 모델 등장 배경

### 1. SmolVLA 배경

로봇을 더 작고, 더 빠르고, 더 저렴하며, 더 많은 사람이 재현할 수 있는 형태로 만들 수는 없을까요?

SmolVLA를 이해할 때 중요한 키워드는 다음 세 가지입니다.

키워드SmolVLA에서의 의미

효율성작은 모델, 적은 시각 토큰, layer skipping으로 학습·추론 비용 절감

접근성단일 GPU 학습, 소비자급 GPU/CPU 배포, 저가 로봇 플랫폼 활용

재현성공개 코드, pretrained model, training data, 커뮤니티 데이터셋 활용

왜 효율성, 접근성, 재현성에 집중하게 되었을까요? 로봇 모델은 논문 속 벤치마크에서만 잘하면 끝나는 모델이 아닙니다.

실제 로봇 위에서 돌아가야 하고, 반복 실험이 가능해야 하며, 가능하면 더 저렴한 하드웨어에서도 실행될 수 있어야 합니다. SmolVLA는 이를 위해 세 가지 방향을 함께 선택합니다.

첫째, 작은 구조입니다. SmolVLA는 compact pretrained VLM을 사용하고, VLM의 일부 layer만 활용하며, visual token 수를 줄입니다. 또한 Action Expert도 가볍게 설계해 학습과 추론 비용을 낮춥니다.

둘째, 공개 커뮤니티 데이터입니다. SmolVLA는 고가의 폐쇄적인 로봇 데이터만 바라보지 않습니다. 공개적으로 수집된 커뮤니티 데이터셋과 저가 로봇 플랫폼을 활용해, 더 많은 연구자와 개발자가 VLA 실험에 접근할 수 있는 방향을 제안합니다.

셋째, 실제 로봇 배포를 고려한 추론 구조입니다. 로봇은 한 번에 하나의 답을 생성하는 챗봇과 다릅니다. 계속 관찰하고, 판단하고, 움직여야 합니다. SmolVLA는 비동기 추론 구조를 통해 로봇이 action을 실행하는 동안 다음 action을 미리 계산하도록 설계합니다.

이후 장에서는 SmolVLA가 이 목표를 달성하기 위해 어떤 구조적 선택을 했는지 살펴보겠습니다.

## Ⅲ. 모델 구조

### 1. SmolVLA 핵심 구조

SmolVLA는 무엇을 작게 만들었고, 무엇은 그대로 유지했으며, 어떤 부분을 새롭게 설계했을까요?

SmolVLA의 차별성은 모델 크기를 줄인 것 자체가 아니라, 로봇 제어에 필요한 구조는 남기고 계산 비용이 큰 부분은 과감하게 줄인 데 있습니다. π0가 “VLM과 Flow Matching을 결합하면 강력한 로봇 정책을 만들 수 있다”는 가능성을 보여주었다면, SmolVLA는 “그 가능성을 더 작고 저렴하며 재현 가능한 형태로 만들 수 있다”는 것을 보여주려는 모델입니다.

Action Expert, Flow Matching 등 개념에 대해서는 [03-07. Pi-0](https://wikidocs.net/366373)와 [03-08. Pi-0.5](https://wikidocs.net/366374)에서 자세히 다루고 있습니다.

Figure 1을 보면 SmolVLA는 크게 두 부분으로 나뉩니다.

![SmolVLA 전체 구조](https://static.wikidocs.net/images/page/366376/gh_e31ad2516585.png)

첫째, 이미지·언어·로봇 상태를 이해하는 compact pretrained VLM입니다. 둘째, VLM이 만든 feature를 바탕으로 실제 로봇의 action chunk를 생성하는 Action Expert입니다.

기존 Flow Matching 기반 VLA 모델 계열과 비슷해 보이지만, 자세히 보면 SmolVLA만의 구조적 선택들이 보입니다.

- VLM의 마지막 layer 일부를 사용하지 않는 layer skipping
- 이미지 입력을 가볍게 만들기 위한 visual token reduction
- 로봇 상태를 VLM 입력에 함께 넣는 state token 설계
- cross-attention과 self-attention을 번갈아 쓰는 Action Expert
- 로봇이 움직이는 동안 다음 action을 미리 계산하는 asynchronous inference

이 장에서는 각 구조 선택이 왜 필요한지 하나씩 살펴보겠습니다.

#### 1-1. VLM이 이해하고, Action Expert가 행동한다

SmolVLA의 기본 흐름은 다음과 같이 정리할 수 있습니다.

단계입력 또는 역할설명

1RGB image(s)로봇이 카메라로 보는 장면

2Language instruction“물체를 집어서 상자에 넣어라”와 같은 작업 지시

3Robot sensorimotor state현재 로봇의 관절 상태, 위치 등 몸의 상태

4Compact pretrained VLM이미지·언어·상태 정보를 하나의 feature로 통합

5Action ExpertVLM feature를 조건으로 받아 action chunk 생성

6Low-level action chunk로봇이 실제로 실행할 연속 행동

일반적인 VLM은 이미지를 보고 텍스트 답변을 생성합니다. 하지만 SmolVLA에서 VLM은 텍스트를 생성하기 위한 모델이라기보다, 로봇이 현재 상황을 이해할 수 있도록 feature를 만들어주는 역할을 합니다.

#### 1-2. Compact pretrained VLM

SmolVLA의 첫 번째 선택은 작은 pretrained VLM을 사용하는 것입니다. SmolVLA는 VLM backbone으로 SmolVLM-2를 사용합니다.

SmolVLM-2는 multi-image와 video input에 최적화된 효율적인 VLM이며, 시각 정보를 인코딩하기 위해 SigLIP을 사용하고, 언어 decoder로 SmolLM2 계열을 사용합니다. 즉, 이미 이미지와 언어를 어느 정도 이해할 수 있는 pretrained VLM을 가져오고, 로봇 행동 생성에 필요한 부분을 Action Expert가 담당하도록 나눕니다.

SigLIP은 [02-3-1. CLIP과 SigLIP](https://wikidocs.net/348457)에서 자세히 다루고 있습니다.

#### 1-3. SmolVLA의 입력 방식

SmolVLA는 많은 VLA 모델들처럼 세 가지 입력을 함께 사용합니다. 그리고 세 가지 입력을 합쳐서 VLM feature로 변환합니다.

입력SmolVLA에서의 역할

RGB image(s)현재 장면과 물체 상태를 제공

Language instruction수행해야 할 작업 목표를 제공

Robot sensorimotor state로봇의 현재 몸 상태를 제공

VLM feature세 입력을 합쳐 Action Expert가 사용할 조건 정보로 변환

SmolVLA는 이 상태 정보를 linear layer로 token 차원에 맞춘 뒤, visual token과 language token과 함께 VLM에 넣습니다. 즉, 로봇의 현재 몸 상태까지 포함해 장면을 해석하도록 만드는 방식입니다.

Table 11을 보면 robot state를 VLM 쪽에 prefix로 넣는 방식과 Action Expert 쪽에 suffix로 넣는 방식을 비교합니다. 결과적으로 state를 VLM에 넣는 prefix 방식이 더 좋은 성능을 보입니다.

논문이 보여주는 중요한 점은, 로봇의 상태를 행동 생성 직전에 덧붙이는 것보다 이미지와 언어를 해석하는 단계부터 함께 넣는 편이 더 유리하다는 결과입니다.

![State prefix vs suffix 결과](https://static.wikidocs.net/images/page/366376/gh_f144b2c6e66b.png)

#### 1-4. Visual token reduction: 이미지를 많이 보는 대신 빠르게 본다

로봇은 매 순간 주변을 보고 움직여야 합니다. 그런데 이미지 입력은 계산량을 크게 늘리는 요소입니다.

고해상도 이미지를 여러 조각으로 나누어 자세히 보면 더 많은 정보를 얻을 수 있습니다. 하지만 그만큼 추론 속도는 느려집니다.

실제 로봇 제어에서는 이 지연이 문제가 됩니다.

SmolVLA는 이러한 시각 입력 문제를 해결하기 위해 image tiling을 사용하지 않습니다. SmolVLM-2는 원래 global image와 함께 여러 crop을 처리하는 image tiling을 사용할 수 있지만, SmolVLA는 더 빠른 inference time을 얻기 위해 global image만 사용합니다.

또한 pixel shuffle을 적용해 frame당 visual token 수를 64개로 제한합니다. 고해상도 이미지를 그대로 많은 token으로 처리할 경우 추론 비용이 커지기 때문에, 로봇 제어에 필요한 속도와 효율성을 확보하기 위한 선택입니다.

물론 visual token을 줄이면 정보 손실이 생길 수 있습니다. 하지만 SmolVLA의 목표는 이미지 이해 벤치마크에서 최고 점수를 내는 것이 아닙니다.

로봇이 실제 환경에서 빠르게 판단하고 움직일 수 있도록 만드는 것입니다. 따라서 visual token reduction은 단순한 압축이 아닙니다.

실시간 로봇 제어를 위해 시각 입력의 계산량을 줄이는 구조적 선택입니다.

#### 1-5. Layer skipping: VLM을 끝까지 통과시키지 않는다

Figure 1을 다시 살펴보면 VLM 박스의 가위 아이콘은 SmolVLA의 중요한 설계를 보여줍니다. 이 아이콘은 VLM의 마지막 L - N개 layer를 버리는 layer skipping을 의미합니다.

![Layer skipping 구조](https://static.wikidocs.net/images/page/366376/gh_5044ed026743.png)

일반적으로는 모델의 마지막 layer가 가장 좋은 feature를 만든다고 생각하기 쉽습니다. 하지만 SmolVLA 논문은 로봇 행동 생성에 필요한 feature가 반드시 마지막 layer에서만 나오는 것은 아니라고 봅니다.

SmolVLA는 VLM 전체를 끝까지 통과시키는 대신, 특정 layer N까지만 사용합니다. 논문에서는 전체 layer의 절반 정도, 즉 N = L/2를 사용하는 것이 속도와 성능 사이에서 좋은 균형을 보인다고 설명합니다.

Table 8은 단순히 더 작은 VLM을 쓰는 것보다, 큰 VLM의 앞쪽 layer 일부만 사용하는 방식이 더 나은 결과를 낼 수 있음을 보여줍니다.

![Layer skipping 결과](https://static.wikidocs.net/images/page/366376/gh_6f1a0f3a7504.png)

이 결과가 중요한 이유는 다음과 같습니다. SmolVLA는 무조건 작은 모델을 선택한 것이 아닙니다.

이미 학습된 VLM이 가진 표현 능력은 활용하되, 로봇 행동 생성에 꼭 필요하지 않은 뒤쪽 계산을 줄였습니다. 즉, SmolVLA의 layer skipping은 단순한 가지치기가 아니라, 필요한 표현은 유지하면서 계산만 줄이는 방식입니다.

#### 1-6. Action Expert: VLM feature를 실제 행동으로 바꾸는 모듈

SmolVLA에서 Action Expert가 중요한 이유는, 정리하면 다음과 같습니다.

모듈담당하는 일

Compact pretrained VLM이미지, 언어, 로봇 상태를 이해해 feature 생성

Action ExpertVLM feature를 바탕으로 action chunk 생성

Robot execution예측된 action chunk를 실제 로봇에서 실행

이 구조에서는 VLM만 성능이 좋아서는 충분하지 않습니다. 로봇은 텍스트를 생성하는 것이 아니라, 실제 물리적 행동을 수행해야 하기 때문입니다.

따라서 SmolVLA의 핵심은 VLM과 Action Expert를 어떻게 연결하느냐에 있습니다.

##### 1-6-1. Cross-Attention과 Self-Attention을 번갈아 쓰는 이유

SmolVLA의 Action Expert는 cross-attention과 self-attention을 번갈아 사용합니다. Self-attention 관련 개념은 [02-1-3. Transformer](https://wikidocs.net/348452)에서 자세히 다루고 있습니다.

![Action Expert attention 구조](https://static.wikidocs.net/images/page/366376/gh_a757441c2ea7.png)

각 attention의 역할은 다릅니다.

구조역할

Cross-AttentionAction Expert가 VLM feature를 참고하도록 함

Self-Attentionaction token끼리 서로의 흐름을 맞추도록 함

Interleaved CA + SA상황 조건과 행동 흐름을 함께 반영

Table 6은 이 설계가 왜 필요한지 보여줍니다. Cross-Attention만 사용한 경우보다, Self-Attention만 사용한 경우보다, 두 방식을 함께 사용한 CA+SA 구조가 가장 좋은 평균 성능을 보입니다.

![Cross/Self-Attention 비교 결과](https://static.wikidocs.net/images/page/366376/gh_4264e3ac1d6e.png)

또한 Table 7에서는 action token이 미래 action까지 자유롭게 참조하는 bidirectional 방식보다, 과거 token만 참조하는 causal 방식이 더 좋은 결과를 보입니다.

![Causal vs bidirectional 결과](https://static.wikidocs.net/images/page/366376/gh_ca82bbeace5f.png)

이 결과는 로봇 행동 생성에서 중요한 의미를 가집니다. 로봇의 action chunk는 미래를 미리 훔쳐보며 만들어지는 것이 아니라, 시간 순서에 맞춰 자연스럽게 이어져야 합니다.

따라서 SmolVLA의 Action Expert는 다음 두 가지를 동시에 해결하려고 합니다. 첫째, VLM feature를 잘 참고해야 합니다.

둘째, action chunk 내부의 흐름도 자연스러워야 합니다. 이 두 요구를 함께 만족시키기 위해 SmolVLA는 cross-attention과 self-attention을 번갈아 사용하는 구조를 선택합니다.

#### 1-7. Asynchronous inference: 로봇이 멈춰 기다리지 않게 만든다

SmolVLA의 또 다른 중요한 차별점은 asynchronous inference입니다. 일반적인 synchronous inference에서는 로봇이 action chunk를 실행한 뒤, 다음 observation을 처리하고 다시 다음 action chunk를 예측합니다.

이 방식은 단순하지만 문제가 있습니다. 로봇이 다음 action을 기다리는 시간이 생길 수 있습니다.

즉, 예측과 실행이 순차적으로 이어지기 때문에 제어가 느려질 수 있습니다. SmolVLA는 이 문제를 줄이기 위해 action execution과 policy inference를 분리합니다.

로봇이 현재 action queue를 실행하는 동안, PolicyServer는 다음 observation을 처리하고 다음 action chunk를 미리 계산합니다. 이 구조는 다음처럼 이해할 수 있습니다.

방식동작 흐름문제 또는 장점

Synchronous inference예측 → 실행 → 다시 예측단순하지만 로봇이 기다리는 시간이 생길 수 있음

Asynchronous inference실행하는 동안 다음 action을 미리 예측지연을 줄이고 더 빠르게 반응 가능

Figure 2와 Figure 3은 이 구조를 이해하는 데 도움이 됩니다. Figure 2는 RobotClient와 PolicyServer가 어떻게 나뉘어 동작하는지 보여줍니다.

Figure 3은 action queue가 시간에 따라 어떻게 채워지고 비워지는지를 보여줍니다. 좀 더 구체적으로 알아보겠습니다.

##### 1-7-1. 비동기 추론은 어떻게 동작하는가

Figure 2는 RobotClient와 PolicyServer가 역할을 나눠서 일하는 과정을 보여줍니다.

- RobotClient는 실제 로봇 쪽입니다. 이미 받은 action들을 하나씩 실행합니다.
- PolicyServer는 정책 모델이 돌아가는 쪽입니다. 새로운 observation을 받아 다음 action chunk를 계산합니다.

![Asynchronous inference Figure 2](https://static.wikidocs.net/images/page/366376/gh_596fa98824e8.png)

1) 시작 상태

- 로봇은 현재 observation o0를 서버에 보냅니다.
- 서버는 o0를 보고 앞으로 실행할 action chunk n개 행동 묶음을 계산합니다.

2) 로봇은 먼저 움직이기 시작함

- 서버가 준 첫 번째 action chunk를 받은 뒤,
- 로봇은 그 안에서 일부 행동 k≤n를 먼저 실행합니다.

3) 움직이는 동안 새 observation을 다시 보냄

- 로봇이 이미 움직이고 있는 동안, 현재 상태를 반영한 새 observation ok를 다시 서버에 보냅니다.
- 서버는 그 observation을 보고 다음 action chunk를 다시 계산합니다.

4) 새 action chunk가 도착하면 queue를 갱신함

- 로봇은 기존 queue에 남아 있던 action과 새로 받은 action을 합쳐서 업데이트된 queue를 만듭니다.
- 그리고 끊기지 않고 계속 행동합니다.

즉, 로봇은 움직이고, 서버는 동시에 다음 행동을 계산하기 때문에 추론과 실행이 순차적으로 이어지는 것이 아니라 일부 겹쳐서 진행됩니다.

##### 1-7-2. action queue는 실제로 어떻게 변하는가

Figure 3은 위 구조가 실제로 돌아갈 때, action queue의 길이가 시간에 따라 어떻게 변하는지를 보여줍니다.

![Action queue Figure 3](https://static.wikidocs.net/images/page/366376/gh_6445d8970f7d.png)

여기서 action queue size는 로봇이 앞으로 실행할 행동이 몇 개 정도 미리 준비되어 있는가라고 이해하면 됩니다.

- queue가 충분히 크면 로봇은 다음 행동을 바로바로 실행할 수 있습니다.
- queue가 0에 가까워지면 로봇은 새 행동을 기다려야 해서 끊길 수 있습니다.

왼쪽 (A)은 observation filtering이 없을 때입니다. 즉, 새 observation이 들어오면 거의 그대로 계속 처리합니다.

그러면 비슷한 observation도 자주 서버에 들어가고, queue 갱신도 잦아질 수 있습니다. 논문에서 g는 asynchronous inference에서 언제 새 observation을 보내 다음 action chunk를 다시 계산할지 결정하는 queue threshold입니다.

현재 queue에 남아 있는 action 비율이 |At|n<g가 되면 새 추론을 시작하며, g가 작을수록 더 순차적으로, g가 클수록 더 자주 observation을 보내며 반응적으로 동작합니다. 그래프의 의미는 다음과 같이 해석할 수 있습니다.

- 

g = 0.0
 queue가 크게 올라갔다가 거의 바닥까지 떨어지는 패턴이 반복됩니다. 즉, action이 한 번에 채워졌다가 빠르게 소모되고, 다시 채워지는 식입니다. 준비 상태가 들쭉날쭉합니다.

- 

g = 0.7
 queue가 너무 바닥까지 떨어지지 않고 어느 정도 유지됩니다. 비교적 안정적인 타협점처럼 보입니다.

- 

g = 1.0
 queue가 높은 수준에서 거의 계속 유지됩니다. 로봇이 당장 실행할 action은 넉넉하지만, 반대로 너무 보수적으로 queue를 유지하면 새로운 observation 변화에 덜 민감해질 가능성도 생각해볼 수 있습니다.

오른쪽 (B)은 observation filtering을 적용했을 때입니다. 이 말은, observation이 들어올 때마다 무조건 다 처리하는 것이 아니라 joint-space 상에서 거의 비슷한 상태라면 생략하고, 정말 처리할 가치가 있는 변화만 반영한다는 뜻입니다.

즉, observation filtering은 “같은 장면을 거의 반복해서 또 해석하지 않도록 하는 장치”라고 볼 수 있습니다. 요약하면 이 구조의 핵심은 로봇을 멈춰 세우지 않는 것입니다.

로봇은 이전 action을 실행하고, 서버는 다음 action을 준비합니다. 그리고 action queue가 비기 전에 새로운 action이 들어옵니다.

SmolVLA가 작고 빠른 모델을 지향하는 이유도 여기서 다시 드러납니다. 로봇 제어에서는 모델이 똑똑한 것만큼이나, 제때 action을 내보내는 것이 중요합니다.

SmolVLA의 핵심 구조를 다시 정리하면 다음과 같습니다.

구조적 선택왜 필요한가

Compact pretrained VLM이미지·언어 이해 능력을 활용하되 모델을 가볍게 유지

Visual token reduction이미지 처리 비용을 줄여 빠른 추론 가능

Layer skippingVLM의 유용한 중간 feature만 활용해 계산량 절감

State token prefix로봇 상태를 장면 이해 단계부터 반영

Interleaved CA + SA Action ExpertVLM 조건과 action chunk의 시간적 흐름을 함께 반영

Asynchronous inference로봇 실행과 다음 action 예측을 병렬화해 지연 감소

SmolVLA는 단순히 모델 크기를 줄인 접근이 아닙니다.

SmolVLA는 VLA에서 꼭 필요한 요소는 유지하면서, 실제 로봇 실험과 배포에서 부담이 되는 계산 경로를 줄인 모델입니다. 그래서 SmolVLA를 이해할 때는 “파라미터 수가 작다”보다 다음 질문을 보는 것이 더 중요합니다.

어떤 정보는 유지했고, 어떤 계산은 줄였으며, 어떤 실행 구조를 새로 설계했는가? 다음 장에서는 이러한 구조적 선택이 실제 성능으로 이어졌는지 살펴보겠습니다.

## Ⅳ. 결과

### 1. 주요 결과: SmolVLA의 작은 구조의 성능

2장에서 SmolVLA의 핵심 구조를 살펴보았습니다. SmolVLA는 compact pretrained VLM을 사용하고, visual token 수를 줄이며, VLM의 일부 layer만 사용합니다.

또한 Action Expert를 가볍게 설계하고, asynchronous inference로 로봇 제어 지연을 줄이려 합니다.

그렇다면, 이렇게 작고 가볍게 만든 구조가 실제로도 잘 동작했을까요?

#### 1-1. 실제 로봇에서의 성능

Table 3은 SO100 로봇에서 Pick-Place, Stacking, Sorting 세 가지 task를 평가한 결과입니다.

![SO100 실제 로봇 성능](https://static.wikidocs.net/images/page/366376/gh_28f419f0ae4f.png)

여기서 ACT는 평균 48.3%, π0는 평균 61.7%를 기록합니다. 반면 SmolVLA 0.45B는 평균 78.3%를 기록합니다.

특히 흥미로운 점은 SmolVLA가 모든 task에서 동일하게 우세한 것은 아니라는 점입니다. Pick-Place에서는 π0가 100%로 가장 높고, SmolVLA는 75%를 기록합니다.

하지만 Stacking과 Sorting에서는 SmolVLA가 각각 90%, 70%를 기록하며 더 좋은 결과를 보입니다. 이러한 결과는 SmolVLA가 모든 task에서 항상 최고 성능을 보이는 모델이라기보다, 작은 모델임에도 여러 실제 로봇 task에서 안정적인 평균 성능을 보이는 모델에 가깝습니다.

#### 1-2. 학습에서 보지 못한 위치에도 대응할 수 있는가

Table 4는 SO101 로봇에서 Pick-Place-Lego task를 평가한 결과입니다. 이 표에서는 in-distribution과 out-of-distribution 성능을 나누어 보여줍니다.

- in-distribution: 학습 데이터와 비슷한 조건에서 평가
- out-of-distribution: 학습 중에 보지 못한 새로운 위치에 Lego object를 배치해 평가

![SO101 OOD 결과](https://static.wikidocs.net/images/page/366376/gh_e3d53ebd592e.png)

결과를 보면 ACT는 in-distribution에서 70%, out-of-distribution에서 40%를 기록합니다. SmolVLA 0.45B는 in-distribution에서 90%, out-of-distribution에서 50%를 기록합니다.

이 결과는 두 가지를 보여줍니다. 첫째, SmolVLA는 학습 데이터와 비슷한 조건에서는 ACT보다 높은 성능을 보입니다.

둘째, 학습에서 보지 못한 위치로 물체가 이동해도 성능이 완전히 무너지지는 않습니다. 물론 out-of-distribution 성능이 50%라는 점은 아직 한계도 함께 보여줍니다.

새로운 위치 변화에 더 강하게 일반화하려면 더 다양한 데이터와 더 넓은 embodiment 학습이 필요합니다. 따라서 SmolVLA는 저가 로봇 환경에서도 효과를 보이지만, 새로운 상황에 대한 일반화는 여전히 해결해야 할 과제로 남아 있습니다.

#### 1-3. Community pretraining의 효과: 공개 데이터가 실제로 도움이 되는가

SmolVLA 논문에서 중요한 메시지 중 하나는 community dataset입니다. SmolVLA는 고가의 폐쇄 데이터만 바라보지 않고, 공개 커뮤니티 데이터셋을 활용해 VLA를 학습할 수 있다는 가능성을 보여주려 합니다.

하지만 여기서도 질문이 필요합니다.

공개 커뮤니티 데이터로 사전학습하는 것이 실제 로봇 성능에 도움이 될까요?

Table 5는 SmolVLA 0.45B를 대상으로 single-task training, multi-task training, community dataset pretraining의 효과를 비교합니다.

![Community pretraining 결과](https://static.wikidocs.net/images/page/366376/gh_e2b640f68f7b.png)

결과를 보면 single-task training에서는 평균 40%를 기록합니다. multi-task training만 적용하면 평균 51.7%로 올라갑니다.

여기에 community dataset pretraining까지 적용하면 평균 78.3%까지 상승합니다. SmolVLA의 성능은 단순히 모델 구조만으로 나온 것이 아닙니다.

여러 task를 함께 학습하는 multi-task learning과 공개 커뮤니티 데이터 기반 pretraining이 실제 성능 향상에 크게 기여했습니다. 로봇은 하나의 task만 반복해서 배운다고 항상 더 똑똑해지는 것이 아닙니다.

여러 task와 다양한 행동 데이터를 미리 경험하면, 새로운 task를 배울 때 더 좋은 출발점에서 시작할 수 있다는 인사이트를 제공합니다. 이 점에서 SmolVLA의 community pretraining은 단순한 데이터 수집 전략이 아닙니다.

작은 모델이 더 넓은 행동 경험을 미리 학습하도록 만드는 방법입니다.

#### 1-4. Async inference 결과: 성공률보다 중요한 것은 속도일 수 있다

Figure 5는 synchronous inference와 asynchronous inference를 비교합니다.

![Async vs Sync 결과](https://static.wikidocs.net/images/page/366376/gh_4b532e20e227.png)

먼저 성공률만 보면 두 방식은 크게 차이 나지 않습니다. Sync는 평균 78.3%, Async는 평균 73.3%를 기록합니다.

성공률만 놓고 보면 Async가 항상 더 좋다고 말하기는 어렵습니다. 하지만 핵심은 성공률이 아니라 속도입니다.

Pick-Place task completion time을 보면 Sync는 평균 13.75초, Async는 평균 9.70초를 기록합니다. 즉, Async 방식은 비슷한 성공률을 유지하면서도 task 완료 시간을 줄입니다.

더 확실하게 알 수 있는 결과는 fixed-time evaluation입니다. 정해진 시간 안에 몇 개의 cube를 성공적으로 pick-and-place 했는지 비교했을 때, Sync는 총 9개, Async는 총 19개를 완료합니다.

이 결과는 실제 로봇 제어에서 매우 중요합니다. 로봇은 단순히 “정답 행동”을 생성하는 것만으로 충분하지 않습니다.

그 행동을 제때 생성하고, 끊기지 않게 실행해야 합니다. Async inference는 바로 이 문제를 다룹니다.

로봇이 현재 action을 실행하는 동안 다음 action을 미리 계산하기 때문에, 로봇이 멈춰서 기다리는 시간을 줄일 수 있습니다. 즉, SmolVLA의 효율성은 모델 크기에서만 나오지 않습니다.

로봇이 움직이는 시간과 모델이 다음 행동을 계산하는 시간을 겹치게 만든 실행 구조에서도 나옵니다.

#### 1-5. 주요 결과 요약

SmolVLA는 거대한 모델과 고가의 로봇 플랫폼이 아니어도, 공개 데이터와 효율적인 구조를 잘 조합하면 실험 가능한 VLA를 만들 수 있다는 것을 보여주었습니다.

주요 결과 의미

작은 모델도 시뮬레이션 benchmark에서 큰 VLA와 경쟁 가능

SO100 실제 로봇 task에서 ACT와 π0 대비 높은 평균 성능

SO101 환경에서 in-distribution뿐 아니라 OOD 조건에서도 baseline보다 높은 성능

community pretraining과 multi task learning이 실제 성능 향상에 기여

async inference가 비슷한 성공률을 유지하면서 task completion time을 줄임

## Ⅴ. 한계점

### 1. SmolVLA의 한계

#### 1-1. 데이터가 아직 충분히 다양하지 않다

SmolVLA는 공개 커뮤니티 데이터셋을 활용했다는 점에서 의미가 큽니다. 하지만 논문에서 사용한 pretraining 데이터는 주로 SO100 계열 로봇에서 수집된 데이터입니다.

즉, 다양한 로봇 형태를 폭넓게 포함한 cross-embodiment 데이터라고 보기는 어렵습니다. 이 한계는 SmolVLA만의 약점이라기보다, 현재 VLA 연구 전체가 마주한 문제에 가깝습니다.

로봇 데이터는 텍스트나 이미지 데이터처럼 인터넷에서 쉽게 수집할 수 없습니다. 실제 로봇을 움직여야 하고, 환경을 세팅해야 하며, 사람의 시연이나 원격 조작이 필요합니다.

그래서 SmolVLA가 community dataset을 강조한 점은 중요하지만, 그 데이터가 더 다양한 로봇과 환경으로 확장되어야 한다는 과제는 여전히 남아 있습니다.

#### 1-2. 데이터 규모도 아직 작다

SmolVLA는 약 23K trajectories 규모의 데이터로 학습되었습니다. 이 규모는 저비용 로봇과 공개 커뮤니티 데이터 기반이라는 점에서는 의미가 있습니다.

하지만 기존 대규모 VLA 학습과 비교하면 여전히 작은 편입니다. 예를 들어 OpenVLA는 약 1M trajectories 규모의 데이터를 활용합니다.

이와 비교하면 SmolVLA의 데이터는 훨씬 작습니다. 물론 SmolVLA의 목표가 “가장 큰 데이터로 가장 큰 모델을 학습하는 것”은 아닙니다.

오히려 작은 데이터와 작은 모델로도 경쟁력 있는 결과를 만들 수 있음을 보여주는 데 목적이 있습니다. 하지만 더 복잡한 환경과 다양한 작업으로 확장하려면 데이터 규모의 한계는 다시 문제가 될 수 있습니다.

특히 다음과 같은 상황에서는 더 많은 데이터가 필요합니다.

확장하려는 방향더 많은 데이터가 필요한 이유

다양한 물체 조작물체의 크기, 재질, 무게, 형태가 달라지기 때문

다양한 환경조명, 배경, 카메라 시점, 작업대 구조가 달라지기 때문

다양한 작업 지시같은 행동이라도 언어 표현이 다양해지기 때문

장기 작업여러 단계의 행동 순서를 안정적으로 이어야 하기 때문

새로운 로봇 플랫폼embodiment와 action space가 달라지기 때문

#### 1-3. VLM backbone이 로봇에 최적인지는 아직 모른다

SmolVLA는 이미 만들어진 VLM을 가져와 backbone으로 씁니다.

하지만 일반적인 VLM이 로봇 제어에 정말 최적인 표현을 제공할까요?

일반적인 VLM은 이미지 설명, 문서 이해, OCR, 시각 질의응답 같은 작업에서 강한 성능을 보이도록 학습됩니다. 하지만 로봇에게 필요한 시각 이해는 조금 다릅니다.

로봇은 단순히 “무엇이 보이는가?”를 아는 것만으로 충분하지 않습니다. 로봇은 다음과 같은 정보를 행동과 연결해야 합니다.

일반 VLM이 잘하는 것로봇 VLA에 더 필요한 것

이미지 속 물체 인식잡을 수 있는 위치와 방향 이해

장면 설명행동 가능한 affordance 이해

텍스트 질문에 답변언어 지시를 action sequence로 변환

문서·텍스트 읽기물리적 접촉과 조작 결과 예측

정적인 이미지 이해시간에 따른 상태 변화 이해

SmolVLA는 작은 VLM을 효율적으로 활용했지만, 앞으로는 로봇 환경에 더 잘 맞는 VLM backbone이나 pretraining 방식이 필요할 수 있습니다. 즉, 어떤 VLM을 backbone으로 선택하느냐는 여전히 풀어야 할 문제입니다.

#### 1-4. 짧은 조작 과제에서는 강하지만, 긴 작업은 아직 어렵다

SmolVLA는 Pick-Place, Stacking, Sorting과 같은 비교적 짧은 조작 과제에서 좋은 결과를 보여주었습니다. 이러한 과제는 로봇 조작 연구에서 중요한 기본 단위입니다.

하지만 실제 서비스 로봇이나 범용 로봇이 수행해야 하는 작업은 이보다 훨씬 길고 복잡할 수 있습니다. 예를 들어 다음과 같은 작업을 생각해볼 수 있습니다.

- 책상 위 물건을 종류별로 정리하기
- 냉장고에서 음료를 꺼내 컵에 따르기
- 여러 물체를 순서대로 조립하기

이런 작업은 단순한 action chunk 하나로 끝나지 않습니다. 중간 목표를 세우고, 실패를 감지하고, 다시 계획하고, 여러 단계의 행동을 안정적으로 이어야 합니다.

SmolVLA의 asynchronous inference는 빠른 반응성과 실행 효율을 높이는 데 도움이 됩니다. 하지만 장기 작업에서는 속도만으로는 부족합니다.

장기 작업을 위해서는 다음과 같은 구조가 추가로 필요할 수 있습니다.

필요한 요소이유

계층적 정책큰 작업을 여러 하위 작업으로 나누기 위해

장기 메모리이전 상태와 수행한 행동을 기억하기 위해

실패 감지잘못된 조작을 인식하고 복구하기 위해

고수준 planning다음 행동뿐 아니라 전체 작업 순서를 계획하기 위해

human feedback사람의 개입이나 수정 지시를 반영하기 위해

따라서 SmolVLA는 짧은 조작 과제에서 효율적인 VLA의 가능성을 보여주었지만, 장기적이고 복잡한 작업으로 확장하기 위해서는 추가적인 planning 구조가 필요합니다.

#### 1-5. Imitation learning 중심 학습의 한계

SmolVLA는 기본적으로 imitation learning에 의존합니다. Imitation learning은 사람이 시연한 행동 데이터를 보고, 로봇이 그 행동을 따라 하도록 학습하는 방식입니다.

이 방식은 특히 Pick-Place처럼 사람이 시연하기 쉬운 작업에서는 효과적입니다. 하지만 사람의 시연 데이터에 없는 상황이 나오면 로봇이 어떻게 복구해야 할지 알기 어렵습니다.

또한 시연 자체가 완벽하지 않거나, 특정 환경에 치우쳐 있으면 모델도 그 편향을 함께 학습할 수 있습니다. 예를 들어 학습 데이터에서는 항상 물체가 작업대 중앙에 있었다면, 물체가 가장자리로 이동했을 때 성능이 떨어질 수 있습니다.

또는 시연자가 항상 같은 순서로 행동했다면, 다른 순서의 해결 방법을 스스로 발견하기 어렵습니다. 이런 문제를 해결하기 위해서는 reinforcement learning이나 self-improvement 방식이 함께 고려될 수 있습니다.

물론 reinforcement learning을 실제 로봇에 바로 적용하는 것은 쉽지 않습니다. 실패 비용이 크고, 하드웨어 손상 위험이 있으며, 많은 시도가 필요하기 때문입니다.

그럼에도 장기적으로는 imitation learning만으로는 부족할 수 있습니다. SmolVLA가 더 복잡한 작업과 새로운 환경에 적응하려면, 사람의 시연을 따라 하는 것을 넘어 스스로 시행착오를 통해 개선하는 방향도 필요할 수 있습니다.

## Ⅵ. 정리

### 1. 정리

이번 글에서는 SmolVLA를 네 가지 흐름으로 살펴보았습니다.

장핵심 내용

1장. SmolVLA 배경VLA를 더 작고, 빠르고, 저렴하며, 재현 가능한 형태로 만들 수 있는가

2장. SmolVLA 핵심 구조compact VLM, layer skipping, visual token reduction, Action Expert, async inference

3장. 주요 결과작은 구조가 시뮬레이션과 실제 로봇 환경에서 경쟁력 있는 성능을 보임

4장. 한계점데이터 다양성, 규모, backbone 선택, 장기 작업, 학습 방식의 한계

SmolVLA가 흥미로운 이유는 단순히 모델이 작기 때문이 아닙니다. 작은 모델이지만, 로봇 제어에 필요한 구조를 꽤 정교하게 남겨두었기 때문입니다.

그리고 그 구조가 실제 로봇 환경에서도 어느 정도 통한다는 점을 보여주었기 때문입니다. VLA는 단순히 VLM에 action head를 붙이는 문제가 아닙니다.

어떤 정보를 VLM에 넣을지, 얼마나 많은 visual token을 사용할지, 어느 layer의 feature를 사용할지, Action Expert가 VLM feature와 action token을 어떻게 연결할지, 실제 로봇에서 추론 지연을 어떻게 줄일지까지 함께 설계해야 합니다. SmolVLA는 이 질문들을 하나의 작고 효율적인 구조 안에 담아낸 모델입니다.

물론 아직 더 복잡한 장기 작업, 다양한 로봇 embodiment, 더 큰 데이터 규모, 로봇에 특화된 VLM backbone, imitation learning 이후의 학습 방식은 앞으로 해결해야 할 과제로 남아 있습니다.

그럼에도 불구하고 로봇을 위한 VLA는 더 커지는 방향으로만 발전하지 않습니다.

더 작고, 더 빠르고, 더 쉽게 실험할 수 있는 방향도 중요합니다.

이 점에서 SmolVLA는 VLA 연구가 실험실의 대규모 모델을 넘어, 더 많은 연구자와 개발자가 직접 만지고 검증할 수 있는 방향으로 확장될 수 있음을 보여주는 중요한 사례입니다. π0와 같은 대형 VLA 모델을 직접 돌리기에는 자원 부담이 크지만, VLA가 실제로 어떤 방식으로 입력을 이해하고 action을 생성하는지 직접 실험해보고 싶은 입문자라면 SmolVLA는 좋은 출발점이 될 수 있습니다.

가능하다면 나의 로봇 데이터도 직접 수집해보는 것도 좋습니다. 작은 실험 기록 하나가 모이면, 더 다양한 로봇과 환경을 포괄하는 커뮤니티 데이터셋으로 이어질 수 있습니다.

## 그림 출처

- SmolVLA 전체 구조 이미지
- State prefix vs suffix 결과 이미지
- Layer skipping 구조 이미지
- Layer skipping 결과 이미지
- Action Expert attention 구조 이미지
- Cross/Self-Attention 비교 결과 이미지
- Causal vs bidirectional 결과 이미지
- Asynchronous inference Figure 2 이미지
- Action queue Figure 3 이미지
- SO100 실제 로봇 성능 이미지
- SO101 OOD 결과 이미지
- Community pretraining 결과 이미지
- Async vs Sync 결과 이미지

## 참고문헌

- Shukor, M., Aubakirova, D., Capuano, F., Kooijmans, P., Palma, S., Zouitine, A., Aractingi, M., Pascal, C., Russi, M., Marafioti, A., Alibert, S., Cord, M., Wolf, T., & Cadene, R. (2025). SmolVLA: A vision-language-action model for affordable and efficient robotics. arXiv. [https://arxiv.org/abs/2506.01844](https://arxiv.org/abs/2506.01844)
