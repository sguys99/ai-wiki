---
title: "03-09. Pi-0.6 - 모두의 로보틱스 - VLA 입문"
type: article
year: 2026
category: physical-ai
raw_path: raw/articles/jo-2026-pi-0-6-vla-primer.md
raw_filename: "jo-2026-pi-0-6-vla-primer.md"
source_collection: external
author: "조인령"
url: "https://wikidocs.net/366375"
publisher: "wikidocs.net"
fetched_at: "2026-08-25T09:44:20+0900"
extractor_tier: "chrome"
tags: []
figures:
  - id: fig01
    file: assets/jo-2026-pi-0-6-vla-primer/fig01.png
    raw: raw/articles/jo-2026-pi-0-6-vla-primer-figures/fig01.png
    caption: "Reinforcement learning overview"
    strategy: fetched
    curated: false
  - id: fig02
    file: assets/jo-2026-pi-0-6-vla-primer/fig02.png
    raw: raw/articles/jo-2026-pi-0-6-vla-primer-figures/fig02.png
    caption: "Policy extraction comparison"
    strategy: fetched
    curated: false
  - id: fig03
    file: assets/jo-2026-pi-0-6-vla-primer/fig03.png
    raw: raw/articles/jo-2026-pi-0-6-vla-primer-figures/fig03.png
    caption: "Pi-0.6 architecture"
    strategy: fetched
    curated: false
  - id: fig04
    file: assets/jo-2026-pi-0-6-vla-primer/fig04.png
    raw: raw/articles/jo-2026-pi-0-6-vla-primer-figures/fig04.png
    caption: "Pi-0.6 result 1"
    strategy: fetched
    curated: false
  - id: fig05
    file: assets/jo-2026-pi-0-6-vla-primer/fig05.png
    raw: raw/articles/jo-2026-pi-0-6-vla-primer-figures/fig05.png
    caption: "Pi-0.6 result 2"
    strategy: fetched
    curated: false
  - id: fig06
    file: assets/jo-2026-pi-0-6-vla-primer/fig06.png
    raw: raw/articles/jo-2026-pi-0-6-vla-primer-figures/fig06.png
    caption: "Pi-0.6 iterative improvement"
    strategy: fetched
    curated: false
  - id: fig07
    file: assets/jo-2026-pi-0-6-vla-primer/page-full.png
    raw: raw/articles/jo-2026-pi-0-6-vla-primer-figures/page-full.png
    caption: "전체 페이지 스크린샷"
    strategy: screenshot
    curated: false
---

> 수집 메모 — `scripts/fetch_article.py` 가 사용자의 명시적 URL 지시에 따라 가져왔다 (CLAUDE.md rule #1 의 자료 수집 예외). 추출 tier: `chrome`. 본문은 원문 그대로이며 요약·번역·윤문하지 않았다.
> `category` 는 임시값이므로 Step 3 에서 확정할 것.

---

## Ⅰ. 모델 등장 배경

### Pi-0.6 배경

Pi-0.6은 Pi 계열의 논문들 중 강화학습을 VLA 학습에 사용한 첫 번째 연구입니다.

RECAP이라는 advantage conditioning 기법을 사용한 강화학습 방법론을 적용했고, 이것은 Pi 모델이 강점을 갖는 다양한 데이터의 활용이나 2단계 학습 과정에서 효과적이었습니다.

Pi-0.6에서 강화학습을 사용한 결과, 어려운 task의 성공 확률은 2배 올리고 실패 확률은 2배 이상 낮춘 효과가 있었다고 합니다.

## Ⅱ. 배경지식

Pi-0.6* 모델의 학습 방법론의 핵심인 RECAP을 이해하기 위해서는 강화학습에 대한 기본지식과 강화학습에 규제를 적용한 방식들에 대해 미리 설명하고 넘어가겠습니다.

### 1. 강화학습

#### 기본 개념: 에이전트, 관측, 행동, 그리고 정책

![Reinforcement learning overview](https://static.wikidocs.net/images/page/366375/gh_711acc6246e7.png)

로봇이나 모델이 강화학습을 통해 학습하는 과정은 위의 그림으로 압축할 수 있습니다.

우선 위의 그림에 나타난 개념들에 대해 먼저 알아보겠습니다.

- Agent (에이전트): 학습하는 AI나 로봇 자신입니다.
- Observation (ot): 현재 에이전트가 보는 상황이나 현재 에이전트의 상태입니다. (예: 로봇 카메라에 찍힌 탁자 위 컵)
- Action (at): 에이전트가 취하는 행동입니다. (예: 팔을 3cm 앞으로 뻗는다)
- 

Policy (π): 에이전트의 전략 또는 규칙입니다.

 - 수식 π(at∣ot)는 현재 상황 ot가 주어졌을 때, 행동 at를 할 확률을 의미합니다. 똑똑한 에이전트일수록 좋은 행동을 할 확률이 높습니다.

- 

Reward (rt): 특정 상황에서 특정 행동을 했을 때 받는 즉각적인 점수입니다.

그리고 위의 개념들에 더해 학습에 직접적으로 관여되는 개념으로는 Return과 Objective(목적함수)가 있습니다.

- Return (R(τ)): 끝날 때까지 받은 보상을 모두 합친 총점입니다.

R(τ)=∑t=0Trt

- Objective (J(π)): 강화학습의 궁극적인 목표입니다. 우리가 만든 정책(π)를 따랐을 때 기대되는 총점의 평균을 뜻하며, AI는 이 J(π)를 최대화(maximize)하려고 노력합니다.

위의 개념들을 종합해서 강화학습의 과정을 이해해보면, 강화학습의 목표는 주어진 환경 내에서 에이전트가 매 순간 행동을 선택하는 policy를 최적화하여 장기적인 누적 보상(return)을 최대화하는 것입니다.

학습 과정은 에이전트가 행동(action)을 취하고 환경으로부터 observation과 보상(reward)을 얻는 재귀적인 상호작용으로 이루어집니다. 이 과정에서 에이전트는 새로운 시도를 위한 탐험과 기존에 잘 알려진 행동을 하는 활용을 반복하며 얻은 데이터를 기반으로 정책을 수정하여 더 높은 보상을 얻을 수 있는 전략을 스스로 찾아가는 과정입니다.

### 2. RECAP을 이해하기 위한 추가 개념

강화학습은 어떤 방식을 사용해 정책(policy)를 개선하는지에 따라 알고리즘이 달라집니다. 대표적인 알고리즘으로는 Q-Learning과 PPO 같은 방식이 있죠.

Pi-0.6* 모델에서는 RECAP이라는 알고리즘을 개발해 활용했습니다. 이 알고리즘을 이해하기 위해서는 현재의 보상에 가치를 판단하고, 이것이 최종 결과에 미칠 영향을 계산하는 수식이 필요하기 때문에 이에 대해 먼저 설명하고 들어가겠습니다.

#### 1. Value와 Advantage

이 두 가지는 에이전트가 내가 지금 잘하고 있나를 평가하는 핵심 지표입니다.

- Value Function (Vπ(ot)): 현재 상황(ot)의 가치입니다. 지금 내 정책(π)대로 계속 행동하면, 앞으로 총 몇 점이나 받을 수 있을까를 나타내는 기댓값입니다. 아래의 식을 보면 t시점부터 종료 T 시점까지의 예측된 reward를 더하는 것이지요.

Vπ(ot)=Eτt+1:T[∑t′=tTrt′]

- Advantage (Aπ(ot,at)): 특정 행동의 비교 우위입니다.

 - 행동하기 이전에 기대되는 가치(Vπ(ot))보다, 지금 이 특정 행동(at)을 하면 점수를 얼마나 더 혹은 덜 받을까를 뜻합니다.
 - A>0이면 평균보다 좋은 행동, A<0이면 평균보다 나쁜 행동입니다.

#### 2. 정규화된 강화학습 (Regularized RL)

여기가 Pi-0.6 논문에서 중요하게 다루는 부분입니다.

보통은 무조건 점수(J(π))만 높이려고 하지만, 그렇게 하면 AI가 꼼수를 부리거나 아예 엉뚱하고 위험한 행동을 할 수 있습니다. 특히 로봇은 이미 사람이 조종해서 모아둔 안전하고 검증된 데이터(reference policy, πref)가 있습니다.

그래서 저자들은 objective function에 검증된 데이터를 따라가도록 규제항을 추가했습니다.

- objective function 수정 (J(π,πref)): 점수는 최대한 높이되, 기존의 안전한 행동 방식(πref)에서 너무 크게 벗어나지 마라고 제약을 거는 것입니다.

J(π,πref)=Eτ∼ρπθ[∑t=0Tγtrt]−βEo∼ρπθ[D(π(⋅∣o)∥πref(⋅∣o))]

- KL Divergence (D): 두 정책(π와 πref)이 얼마나 다른지를 측정하는 수학적 거리입니다. 이 거리가 멀어질수록 페널티(β)를 줍니다.

### Pi-0.6만의 새로운 해결책: Policy Extraction

기존의 강화학습에서 advantage를 활용해 정책을 개선하는 방법론으로 원래 하던 행동(πref)을 기본으로 하되, advantage가 높은 더 좋은 행동의 확률을 지수함수(exp) 가중치를 곱해 크게 올려주자는 연구들이 대세가 되고 있었습니다.

그런데 이 논문에서는 조금 더 안정적인 새로운 정답(π^)을 제시합니다.

- 새로운 수식은 다음과 같습니다.

π^(a∣o)∝πref(a∣o)⋅p(I∣Aπref(o,a))β

지수함수를 통해 무작정 확률을 올리는 대신, 이 행동을 하면 기존보다 확실히 더 나아질 확률(p(I∣A))을 계산해서 그 확률만큼만 기존 정책을 부드럽게 개선하자는 뜻입니다. 논문에서는 이 방식이 무조건 기존보다 성능이 좋아진다는 것을 보장한다고 말합니다.

우리가 수식으로 찾은 이상적인 정답 전략(π^)은 수학적 개념일 뿐, 실제 AI 모델에 바로 넣을 수는 없습니다. 따라서 실제로 학습시키는 인공지능 신경망(πθ)이 이 이상적인 정답(π^)을 최대한 똑같이 따라 하도록(KL divergence 최소화) 학습시키는 것으로 마무리됩니다.

minθEs∼ρπref[KL(π^∥πθ)]

## Ⅲ. 모델 구조

### 1. RECAP: Pi-0.6*에 적용된 강화학습 전략

일반적인 PPO나 Q-Learning 같은 강화학습 알고리즘은 거대 모델(VLA)에 적용했을 때 학습이 매우 불안정하고 계산 비용이 큽니다.

따라서 저자들은 VLA 모델의 성능을 향상시키기 위해 복잡한 policy gradient 계산 대신 advantage condition을 활용한 강화학습 전략인 RECAP을 사용했습니다.

그 전략은 아래의 과정을 반복하는 것이었습니다.

- 

Data Collection

로봇이 과제를 수행하며 성공/실패 라벨을 수집합니다. 이때 로봇이 실수하면 사람이 직접 개입하여 올바르게 교정해 준 데이터(human interventions)도 함께 모읍니다.

- 

Value function training

Advantage는 현재의 value와 어떤 행동을 했을 때의 value가 어떻게 변하는지를 보고 행동에 가중치를 주는 과정이기 때문에 이 value를 계산하는 수식에도 학습이 필요합니다. 따라서 수집된 모든 데이터를 바탕으로, 현재 상황에서 실패를 감지하거나 작업 완료까지의 기대 시간을 예측하는 거대한 다목적 가치 함수(V)를 학습시킵니다.

- 

Advantage conditioned training

최종적으로 VLA의 policy를 업그레이드하기 위해서는 value function을 기반으로 advantage condition을 주고 학습하는 과정이 필요합니다. 학습된 가치 함수를 바탕으로 각 행동의 advantage(비교 우위)를 계산하여 우위 여부 꼬리표를 만듭니다. 그리고 이 지표를 VLA 모델의 프롬프트에 조건으로 달아주어 모델을 학습시킵니다. 이 방식은 기존의 복잡한 최적화 기법보다 훨씬 단순하면서도, 성공/실패가 섞인 다양한 데이터에서 최적의 정책(policy)을 뽑아내는 데 효과적이었습니다.

사람이 직접 조작한 데이터에서는 2단계와 3단계만 수행했으며, 그 이후에는 로봇이 스스로 수행하며 얻은 autonomously collected data를 추가해서 1, 2, 3단계를 반복적으로 수행했다고 합니다.

#### 1-1. Distributional value function training

![Distributional value function training](https://static.wikidocs.net/images/page/366375/gh_9f87838c2850.png)

저자들은 관측(observation)과 언어 명령(language command)을 바탕으로 여러 과제(multi-task)를 평가할 수 있는 신뢰성 높은 가치 함수 모델(V)을 학습시켰습니다.

가치를 단순히 스칼라 값으로 예측하지 않고 201개의 구간(bin)으로 나누어 현재 상황이 어느 구간에 속할지 확률적으로 예측하는 모델(pϕ(V∣ot,ℓ))을 만들었습니다. 이 가치 함수는 일반적인 VLA 정책 모델과 동일한 구조를 가지지만, 연산 효율을 위해 더 작은 VLM 백본(backbone)을 사용했습니다.

이 가치 함수는 현재 상태의 궤적을 따라 달성하게 될 총 보상(return, Rt)이 속할 것으로 예상되는 bin과 ground truth의 보상 결과가 얼마나 다른지 cross-entropy를 계산해서 이를 최소화하는 방향으로 학습했습니다.

실제 가치는 연속적인 값이 필요하므로, 추론 시에는 각 bin이 나타내는 가치(v(b))와 해당 bin에 속할 예측 확률(pϕ)을 곱해 가중합(기댓값)을 구함으로써 최종 가치 Vπref를 도출했습니다.

학습 데이터(D)의 경우, 사전학습(pre-training) 단계에서는 100% 사람이 조종한 데이터(demonstrations)를 정답으로 사용했고, 이후의 사후학습 단계에서는 사람의 데이터와 로봇 스스로의 데이터를 가중 결합하여 사용했습니다. 이처럼 에피소드를 끝까지 보고 정답을 매기는 on-policy Monte Carlo 방식은 강화학습에서 널리 쓰이는 전통적인 off-policy Q-function보다는 수학적으로 덜 최적화된 방식입니다. 하지만 이 구조가 훨씬 단순하고 신뢰성이 높으며, 기존의 모방학습(imitation learning)을 압도하는 성능 향상을 보여주었기에 이 방식을 최종 채택했다고 합니다.

#### 1-2. Policy extraction via advantage conditioning

이제는 앞서 구한 value function을 활용해서 어떻게 action을 추정하는 policy를 향상시킬지 학습하는 방법이 필요했고, 이 방법을 policy extraction이라고 부릅니다.

저자는 효과적인 policy extraction을 위해 몇 가지 조건이 필요하다고 말했습니다. 첫 번째는 다양한 dataset에서 작동할 수 있는지가 중요했고, 두 번째는 큰 VLA model에서도 쉽게 적용할 수 있는 확장성이 필요했습니다. 마지막으로 주어진 데이터셋에는 좋은 표본도 있지만 좋지 않은 표본도 있을 수 있기 때문에, 이런 경우에도 효과적으로 학습할 수 있는 방법론이 필요했습니다.

기존의 다른 policy extraction 방법론들(AWR 등)도 있었지만, Pi 모델의 핵심인 flow matching model에 적용하기 어렵거나 bad data를 활용하기 어려운 방법론들이었습니다.

기존의 AWR 같은 가중치 기반 방법론들은 flow matching 모델에 적용하기 수학적으로 너무 복잡하거나, 나쁜 데이터를 버려버리는 필터링 방식을 써서 한계가 있었습니다. 따라서 저자들은 이 조건들을 모두 만족하는 advantage conditioning 기법을 변형하여 Pi-0 모델에 적용했습니다.

![Policy extraction comparison](https://static.wikidocs.net/images/page/366375/gh_45f1ad000db2.png)

실제로 다른 강화학습 방법론과 비교했을 때 성공률과 시간당 성공 횟수가 가장 높았음을 알 수 있습니다.

이론적으로 최적의 정책은 기존 정책(πref)에 특정 행동이 개선을 가져올 확률(p(I∣A))을 곱하여 아래와 같이 정의됩니다.

π^(a∣o)∝πref(a∣o)⋅p(I∣Aπref(o,a))β

여기서 저자들은 수학적 트릭을 발휘했습니다. 이 개선 확률 식에 베이즈 정리를 적용하면, 기존의 복잡한 식들이 약분되어 사라지게 됩니다.

p(I∣A)∝πref(a∣I,o,ℓ)πref(a∣o,ℓ)

이 식을 위의 식에 적용하면

π^(a∣o,ℓ)∝πref(a∣o,ℓ)⋅(πref(a∣I,o,ℓ)πref(a∣o,ℓ))β

과 같이 됩니다.

그렇다면 만일 β를 1로 주면, πref(a∣o,ℓ)끼리는 약분되어 π^(a∣o,ℓ)=πref(a∣I,o,ℓ) 이렇게 정리됩니다. 이렇게 식을 단순화하고 보니 policy가 단순히 성공 지표(I)가 조건으로 추가된πref(a∣I,o,ℓ)형태로 깔끔하게 대체될 수 있었고, 이러는 대신 indicator 지표를 엄격하게 주면 로봇이 행동을 학습할 때 indicator 값에 따라 유연하게 학습할 수 있을 것이라고 생각했습니다.

그럼 이 indicator는 어떻게 주게 될까요? 저자들은 데이터에 성공 지표(I)를 달아주는 기준(threshold)을 엄격하게 설정했습니다. 특정 행동의 advantage 점수가 커트라인(ϵℓ)을 넘으면 I=1, 넘지 못하면 I=0으로 나누어 로봇이 실전에서 극단적으로 과격하게 움직이는 현상(aggressive behavior)을 방지했습니다.

최종적으로 정책 모델은 CFG(Classifier-Free Guidance) 기법을 차용하여, 지표(I)가 주어졌을 때와 주어지지 않았을 때 모두 주어진 데이터의 행동을 잘 모방하도록 음의 로그 가능도(negative log-likelihood)를 최소화하는 방향으로 학습됩니다.

이 방식은 사람의 완벽한 조종 데이터나 개입 데이터에는 무조건 I=1을 주고 집중적으로 학습시키며, 로봇이 실수한 나쁜 데이터 역시 I=0이라는 꼬리표와 함께 학습하여 오답 노트로 활용하게 만드는 매우 단순하고도 강력한 해결책이었습니다.

### 2. Pi-0.6*의 아키텍처

Pi-0.6*은 일반적인 VLA 모델의 아키텍처를 갖는 Pi-0.6에 강화학습을 적용해 생성된 모델입니다. Pi-0.6의 아키텍처를 먼저 살펴보고, 이 모델에 RECAP을 적용한 방식과 학습 방법에 대해 알아보겠습니다.

![Pi-0.6 architecture](https://static.wikidocs.net/images/page/366375/gh_24567b8b5f0a.png)

#### 2-1. Pi-0.6의 아키텍처

Pi-0.6의 기초가 되는 Pi-0.6는 Pi-0.5의 구조를 대부분 유지하지만 일부 성능 향상을 위해 아키텍처를 수정하였습니다. 우선 모델의 뇌 역할을 하는 VLM(Vision-Language Model)은 Gemma 3 4B* 모델로 업그레이드되어 시각적 상황 판단과 언어 이해 능력이 비약적으로 향상되었습니다.

여기에 로봇의 실제 움직임을 담당하는 Action Expert를 860M 파라미터 규모로 대폭 키워 50Hz의 고속 제어를 가능하게 했습니다. 특히 주목할 점은 지식 절연(Knowledge Insulation, KI) 기법입니다. 이는 정교한 연속 동작을 학습할 때 발생하는 연산이 모델이 원래 가진 언어나 시각 지식을 망치지 않도록 stop-gradient를 적용하는 방식입니다. 덕분에 로봇은 똑똑한 머리를 유지하면서도 섬세한 손기술을 동시에 갖출 수 있게 되었습니다.

#### 2-2. Pi-0.6*의 아키텍처

단순한 Pi-0.6를 한 단계 더 진화시켜 Pi-0.6*로 만드는 핵심은 바로 advantage conditioning(어드밴티지 조건화)입니다. 모델은 입력값에 Advantage: positive 혹은 Advantage: negative라는 텍스트 지표(It)를 추가로 받아들입니다. 이는 로봇에게 지금 네가 하려는 행동이 성공으로 가는 길인가라는 피드백을 주는 것과 같습니다.

학습 과정에서 모델은 성공적인 행동 데이터에는 Positive 라벨을, 실패하거나 비효율적인 행동에는 Negative 라벨을 붙여 학습합니다. 그리고 실제 로봇을 구동(inference)할 때는 강제로 Positive 조건을 주어, 모델이 항상 성공 확률이 가장 높은 동작만을 선택하도록 유도합니다. 이러한 계층적 구조 덕분에 로봇은 미션을 인식하고, 하위 작업을 계획하며, 어드밴티지를 확인한 뒤 최종적인 액션을 생성하는 논리적인 흐름을 갖게 됩니다.

#### 2-3. RECAP 학습 프로세스

Pi-0.6의 구조를 살펴보았으니, 이제는 어떻게 Pi-0.6가 RECAP이라는 강화학습 방식으로* 학습하기 위해 어떤 과정을 거쳤는지 알아보겠습니다.

우선 RECAP은 3단계 루프를 거쳐 학습하는 방식입니다.

첫 번째는 pre-training 단계로, 수많은 로봇 데이터와 웹의 시각-언어 데이터를 통해 general한 VLA가 될 수 있는 능력을 기릅니다. 사물의 이름과 위치, 로봇의 기본 움직임을 익히는 단계죠.

두 번째는 SFT(Supervised Fine-Tuning) 단계입니다. 모델이 특정한 task를 잘 수행할 수 있도록 파인튜닝하는 단계죠. 에스프레소 머신 조작과 같은 특정 작업(specific task)의 전문가가 수행한 것과 같은 데이터(expert dataset)를 학습하며, 모델이 학습하는 과정에서 indicator 힌트로 사용하는 어드밴티지를 항상 Positive로 고정해 이것이 정답이다라는 것을 가이드 삼아 직접적으로 배웁니다.

마지막은 가장 중요한 post-training & RL 단계입니다. 로봇은 파인튜닝된 모델을 바탕으로 스스로 환경에서 해당 작업을 반복적으로 수행하며 데이터(autonomous dataset)를 수집합니다. 이때 잘못된 동작을 할 경우 사람이 개입하여 이를 바로잡아주는 교정(correction) 데이터가 추가되는데, 이는 로봇에게 매우 강력한 학습 신호가 됩니다. 수집된 데이터를 바탕으로 가치 함수(value function)를 업데이트하고, 다시 어드밴티지 라벨을 계산하여 정책을 정교화하는 이 과정을 반복하며 로봇은 무한히 성장합니다.

#### 2-4. 가치 함수가 계산되는 법

앞서 RECAP에서 가치 함수를 먼저 학습하고, 그 후에 policy를 학습한다고 했습니다. 그렇다면 가치 함수는 어떻게 라벨링이 되는 것일까요?

저자는 복잡한 수식 대신 성공까지 몇 단계가 남았나를 예측하는 것을 가치 함수로 사용합니다. 성공하면 0점, 앞으로 남은 단계마다 -1점, 실패 시 큰 감점을 부여하는 sparse reward 방식을 채택하여 로봇이 최대한 빠르고 효율적으로 임무를 완수하도록 독려합니다. 가치 함수 역시 Gemma 3 기반의 670M 모델을 사용하여 현재 장면을 보고 승률을 예측하며, 이 예측치가 좋아지는 방향의 행동이 Positive 어드밴티지로 반영됩니다.

결국 Pi-0.6*는 강력한 기본 모델에 어드밴티지라는 피드백 시스템을 결합하고, 인간의 교정과 자율 학습을 반복하는 RECAP 루프를 통해 완성되었습니다. 이는 로봇이 단순히 시뮬레이션에 머물지 않고, 실제 복잡한 현실 세계의 과제들을 스스로 해결해 나갈 수 있는 강력한 토대가 될 것입니다.

## Ⅳ. 결과

### 실험 결과

#### 1. Pi-0.5 대비 성능 향상

![Pi-0.6 result 1](https://static.wikidocs.net/images/page/366375/gh_9f6822cffde1.png)

![Pi-0.6 result 2](https://static.wikidocs.net/images/page/366375/gh_07cc94c0f524.png)

Pi-0.5와 비교했을 때 Pi-0.6 모델이 압도적으로 좋은 성능을 냈으며, RECAP을 사용하여 학습하였을 때 Pi-0.6 모델이 가장 좋은 성능을 내게 되었습니다. 특히 시간당 성공 횟수가 매우 향상되었으며, 정확도도 모든 task에서 우수하였습니다.

#### 2. 반복 학습의 효과

![Pi-0.6 iterative improvement](https://static.wikidocs.net/images/page/366375/gh_ce0a01774ccd.png)

그리고 위 2개의 그래프를 통해 반복적인 학습으로 모델이 개선되는 것을 볼 수 있습니다. Iteration을 0회에서 점차 반복해 갈수록 시간당 성공 횟수도 늘어나고, 성공률도 늘어나고 있습니다. 이것이 강화학습의 진정한 효과라고 볼 수 있습니다.

## Ⅵ. 정리

### Conclusion

Pi-0.6*는 위에서 살펴본 것처럼 VLM의 변형이었던 기존 Pi 모델과 달리 강화학습을 활용한 첫 번째 Pi 모델입니다. VLA 모델에 가치 함수를 더해 advantage instruction을 주어 성공 확률을 높이는 방향으로 로봇이 행동을 선택할 수 있도록 한 것이 본 모델의 핵심 아이디어로 요약할 수 있습니다.

또한 이런 방식은 특히 강화학습을 단순히 학습 방법으로만 사용한 것이 아니라 데이터 수집 과정을 자동화하여 보다 다양하게 로봇의 행동과 상황을 수집할 수 있게 된 것 또한 본 논문의 유의미한 연구 결과로 요약할 수 있습니다.

## 참고문헌

- Physical Intelligence. pi0.6: A VLA That Learns from Experience. [https://www.pi.website/download/pistar06.pdf](https://www.pi.website/download/pistar06.pdf)
- Physical Intelligence. A VLA that Learns from Experience. [https://www.pi.website/blog/pistar06](https://www.pi.website/blog/pistar06)
