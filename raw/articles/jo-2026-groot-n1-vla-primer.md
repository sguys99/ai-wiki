---
title: "03-13. Groot N1 - 모두의 로보틱스 - VLA 입문"
type: article
year: 2026
category: physical-ai
raw_path: raw/articles/jo-2026-groot-n1-vla-primer.md
raw_filename: "jo-2026-groot-n1-vla-primer.md"
source_collection: external
author: "조인령"
url: "https://wikidocs.net/366379"
publisher: "wikidocs.net"
fetched_at: "2026-09-01T09:18:02+0900"
extractor_tier: "chrome"
tags: []
figures:
  - id: fig01
    file: assets/jo-2026-groot-n1-vla-primer/fig01.png
    raw: raw/articles/jo-2026-groot-n1-vla-primer-figures/fig01.png
    caption: "Data Islands example 1"
    strategy: fetched
    curated: false
  - id: fig02
    file: assets/jo-2026-groot-n1-vla-primer/fig02.png
    raw: raw/articles/jo-2026-groot-n1-vla-primer-figures/fig02.png
    caption: "Data Islands example 2"
    strategy: fetched
    curated: false
  - id: fig03
    file: assets/jo-2026-groot-n1-vla-primer/fig03.png
    raw: raw/articles/jo-2026-groot-n1-vla-primer-figures/fig03.png
    caption: "GR00T N1 architecture"
    strategy: fetched
    curated: false
  - id: fig04
    file: assets/jo-2026-groot-n1-vla-primer/fig04.png
    raw: raw/articles/jo-2026-groot-n1-vla-primer-figures/fig04.png
    caption: "System 2"
    strategy: fetched
    curated: false
  - id: fig05
    file: assets/jo-2026-groot-n1-vla-primer/fig05.png
    raw: raw/articles/jo-2026-groot-n1-vla-primer-figures/fig05.png
    caption: "Intermediate layer usage"
    strategy: fetched
    curated: false
  - id: fig06
    file: assets/jo-2026-groot-n1-vla-primer/fig06.png
    raw: raw/articles/jo-2026-groot-n1-vla-primer-figures/fig06.png
    caption: "System 1"
    strategy: fetched
    curated: false
  - id: fig07
    file: assets/jo-2026-groot-n1-vla-primer/fig07.png
    raw: raw/articles/jo-2026-groot-n1-vla-primer-figures/fig07.png
    caption: "State and action encoder"
    strategy: fetched
    curated: false
  - id: fig08
    file: assets/jo-2026-groot-n1-vla-primer/fig08.png
    raw: raw/articles/jo-2026-groot-n1-vla-primer-figures/fig08.png
    caption: "Self-attention on state and action"
    strategy: fetched
    curated: false
  - id: fig09
    file: assets/jo-2026-groot-n1-vla-primer/fig09.png
    raw: raw/articles/jo-2026-groot-n1-vla-primer-figures/fig09.png
    caption: "Cross-attention with VLM tokens"
    strategy: fetched
    curated: false
  - id: fig10
    file: assets/jo-2026-groot-n1-vla-primer/fig10.png
    raw: raw/articles/jo-2026-groot-n1-vla-primer-figures/fig10.png
    caption: "Flow matching loss"
    strategy: fetched
    curated: false
  - id: fig11
    file: assets/jo-2026-groot-n1-vla-primer/fig11.png
    raw: raw/articles/jo-2026-groot-n1-vla-primer-figures/fig11.png
    caption: "Loss details"
    strategy: fetched
    curated: false
  - id: fig12
    file: assets/jo-2026-groot-n1-vla-primer/fig12.png
    raw: raw/articles/jo-2026-groot-n1-vla-primer-figures/fig12.png
    caption: "Forward Euler integration"
    strategy: fetched
    curated: false
  - id: fig13
    file: assets/jo-2026-groot-n1-vla-primer/fig13.png
    raw: raw/articles/jo-2026-groot-n1-vla-primer-figures/fig13.png
    caption: "K-step integration example"
    strategy: fetched
    curated: false
  - id: fig14
    file: assets/jo-2026-groot-n1-vla-primer/fig14.png
    raw: raw/articles/jo-2026-groot-n1-vla-primer-figures/fig14.png
    caption: "Inference steps result"
    strategy: fetched
    curated: false
  - id: fig15
    file: assets/jo-2026-groot-n1-vla-primer/fig15.png
    raw: raw/articles/jo-2026-groot-n1-vla-primer-figures/fig15.png
    caption: "Data pyramid"
    strategy: fetched
    curated: false
  - id: fig16
    file: assets/jo-2026-groot-n1-vla-primer/fig16.png
    raw: raw/articles/jo-2026-groot-n1-vla-primer-figures/fig16.png
    caption: "Synthetic data"
    strategy: fetched
    curated: false
  - id: fig17
    file: assets/jo-2026-groot-n1-vla-primer/fig17.png
    raw: raw/articles/jo-2026-groot-n1-vla-primer-figures/fig17.png
    caption: "VQ-VAE latent action"
    strategy: fetched
    curated: false
  - id: fig18
    file: assets/jo-2026-groot-n1-vla-primer/fig18.png
    raw: raw/articles/jo-2026-groot-n1-vla-primer-figures/fig18.png
    caption: "Bimanual coordination"
    strategy: fetched
    curated: false
  - id: fig19
    file: assets/jo-2026-groot-n1-vla-primer/fig19.png
    raw: raw/articles/jo-2026-groot-n1-vla-primer-figures/fig19.png
    caption: "Smoothness and grasp quality"
    strategy: fetched
    curated: false
  - id: fig20
    file: assets/jo-2026-groot-n1-vla-primer/fig20.png
    raw: raw/articles/jo-2026-groot-n1-vla-primer-figures/fig20.png
    caption: "Low-data adaptation"
    strategy: fetched
    curated: false
  - id: fig21
    file: assets/jo-2026-groot-n1-vla-primer/page-full.png
    raw: raw/articles/jo-2026-groot-n1-vla-primer-figures/page-full.png
    caption: "전체 페이지 스크린샷"
    strategy: screenshot
    curated: false
---

> 수집 메모 — `scripts/fetch_article.py` 가 사용자의 명시적 URL 지시에 따라 가져왔다 (CLAUDE.md rule #1 의 자료 수집 예외). 추출 tier: `chrome`. 본문은 원문 그대로이며 요약·번역·윤문하지 않았다.
> `category` 는 임시값이므로 Step 3 에서 확정할 것.

---

## Ⅰ. 모델 등장 배경

### GR00T N1 등장 배경

범용 로봇을 구현하기 위한 그동안의 발전에도 불구하고, 실제 물리적 세계에서 작동하는 로봇 파운데이션 모델을 구축하는 데에는 크게 두 가지 핵심적인 장벽이 남아 있었습니다. 바로 절대적인 로봇 데이터의 부족과 하드웨어 차이로 인해 데이터가 파편화되는 데이터 섬(Data Islands) 현상입니다.

GR00T N1은 이러한 데이터 확보의 어려움과 하드웨어적 이질성을 핵심 과제로 정의하고, 이를 극복하기 위해 설계된 개방형 파운데이션 모델입니다. 인간의 영상부터 시뮬레이션 데이터까지 서로 다른 출처와 구조를 가진 이질적인 정보들을 하나의 거대한 지능으로 통합하는 혁신적인 아키텍처를 통해 다음의 문제들을 해결하고자 하였습니다.

#### 1. 데이터 양 자체의 한계

인터넷상의 방대한 텍스트나 이미지 데이터와 달리, 휴머노이드 로봇 데이터를 대규모로 확보하기 위해서는 값비싼 하드웨어와 작업자의 원격 조종(teleoperation)이 필수적입니다. 결과적으로 단일 로봇 하드웨어 환경만으로는 파운데이션 모델을 충분히 학습시킬 수 있을 만큼의 압도적인 데이터를 수집하는 데 물리적, 비용적 한계가 존재합니다.

#### 2. 데이터 섬(Data Islands) 문제

![Data Islands example 1](https://static.wikidocs.net/images/page/366379/gh_270e9d988155.png)

![Data Islands example 2](https://static.wikidocs.net/images/page/366379/gh_cbb07b93be4d.png)

앞서 언급한 데이터 부족 현상을 더욱 심화시키는 원인은 로봇 하드웨어 간의 비호환성입니다. 로봇마다 하드웨어 구조, 센서의 종류, 관절의 자유도(DoF), 그리고 제어 방식이 모두 다르기 때문에 특정 로봇에서 수집된 귀중한 데이터조차 다른 로봇의 학습에 적용하기 어렵습니다. GR00T N1은 아키텍처적 개선을 통해 이러한 기종 간 장벽을 허물고, 고립된 데이터 섬들을 연결하여 범용적인 로봇 제어 지능을 학습할 수 있는 기반을 마련하였습니다.

## Ⅱ. 배경지식

### 듀얼 시스템 아키텍처의 관점

GR00T N1은 심리학자 대니얼 카너먼(Daniel Kahneman)이 제시한 인간의 인지 처리 모델에서 영감을 얻어 듀얼 시스템 아키텍처(Dual-System Architecture)를 도입했습니다. 즉, 로봇의 지능을 신중한 추론을 담당하는 고차원 계획(System 2)과 즉각적으로 행동하는 저차원 제어(System 1)로 명확히 나누어 동작하도록 설계한 것이 특징입니다.

## Ⅲ. 모델 구조

### 1. GR00T N1 모델 구조

![GR00T N1 architecture](https://static.wikidocs.net/images/page/366379/gh_5203c9bdddf8.png)

앞서 언급한 데이터 부족과 데이터 섬 문제를 극복하고 다양한 로봇 하드웨어를 아우르는 범용성을 확보하기 위해, GR00T N1이 구체적으로 어떠한 구조로 이루어져 있는지 핵심 아키텍처를 살펴보겠습니다.

#### 1-1. System 2 (추론 모듈)

![System 2](https://static.wikidocs.net/images/page/366379/gh_6700d0246578.png)

- 사전 훈련된 NVIDIA Eagle-2 VLM을 사용했습니다. Eagle-2는 SmolLM2 LLM과 SigLIP-2 이미지 인코더에서 미세 조정된 모델이며, 이미지 토큰들은 사용자의 언어 지시(텍스트 토큰)와 함께 LLM으로 전달됩니다.
- 10Hz의 저주파수로 동작하며 추론 시간을 충분히 가지도록 설계되었습니다.

![Intermediate layer usage](https://static.wikidocs.net/images/page/366379/gh_b2e71b915c75.png)

- 보통 VLM은 모델의 가장 마지막 레이어(final layer) 결과물을 사용하지만, GR00T N1은 중간 단계인 12번째 레이어의 결과물을 사용합니다. 이렇게 하면 추론 속도를 증가시킬 뿐더러 작업 성공률도 더 높다는 것을 확인하였습니다.

#### 1-2. System 1 (동작 모듈)

![System 1](https://static.wikidocs.net/images/page/366379/gh_ec0ef04a045f.png)

- Diffusion Transformer 기반으로, flow-matching 방식으로 훈련됩니다.
- 120Hz의 고주파수로 동작을 생성합니다. 움직이는 도중 직관적이고 즉각적인 반응을 할 수 있도록 설계하였습니다.
- 앞서 설명한 Eagle-2 VLM에서 나온 출력 토큰에 cross-attention하고, 가변 상태 및 동작 차원(차원이 서로 다른 매니퓰레이터, 휴머노이드와 같은 다양한 로봇 입력)을 처리하기 위해 별도의 MLP(Multi-Layer Perceptron) 기반 인코더 및 디코더를 사용합니다.

![State and action encoder](https://static.wikidocs.net/images/page/366379/gh_8ac0c31a57b7.png)

위 그림에서 state encoder에 들어가는 것이 데이터셋에 포함되어 있는 로봇의 물리적 상태 정보(robot state)이며, 여기엔 관절 상태, 그리퍼 상태 등이 포함됩니다. 또한 무작위 노이즈에서 시작하여 노이즈를 제거해가는 diffusion 모델의 특성을 활용하기 위하여 action encoder를 추가하여 노이즈가 추가된 동작(noised action)이 입력되도록 합니다.

![Self-attention on state and action](https://static.wikidocs.net/images/page/366379/gh_8ce579b20fba.png)

위 두 가지 정보인 robot state(qt)와 noised action(at)에는 Self-Attention을 적용합니다. 현재 내 팔이 이 위치에 있는데, 이 동작(noised action)을 수행하는 게 물리적으로 가능한지를 서로 참조하며 체크하는 과정을 진행합니다.

![Cross-attention with VLM tokens](https://static.wikidocs.net/images/page/366379/gh_2d21e6f3893f.png)

반면 Eagle-2 VLM에서 나온 출력 토큰(Φt)과는 Cross-Attention을 진행합니다. 여기서 Cross-Attention을 채택한 이유는 크게 두 가지입니다.

- 정답지 확인: VLM의 출력은 로봇이 수행해야 할 목표와 주변 환경에 대한 고차원적인 정보를 담고 있습니다. Cross-Attention은 앞서 만든 동작의 뼈대를 VLM의 정보(예: 사과의 위치, 집으라는 명령)에 정렬(alignment)시키는 역할을 합니다. 즉, 동작 모듈이 VLM의 정보를 참조하여 목표 방향으로 동작을 정교하게 수정하고 가이드받도록 설계된 것입니다.
- 연산 효율성: VLM에서 생성되는 토큰의 양은 매우 방대합니다. 이 모든 정보를 동작/상태 토큰과 함께 Self-Attention으로 처리할 경우 연산 복잡도가 증가하므로, 동작 생성에 직접 필요한 시각 정보만을 선택적으로 참조하는 Cross-Attention 방식을 통해 실시간 제어에 적합한 추론 속도를 확보하였습니다.

![Flow matching loss](https://static.wikidocs.net/images/page/366379/gh_e4bd67a13b8a.png)

![Loss details](https://static.wikidocs.net/images/page/366379/gh_fc7a56429c52.png)

이제 앞서 정의된 파라미터들이 실제 학습에는 어떻게 적용되는지 보겠습니다. 위 수식은 손실 함수(loss function)를 나타낸 것으로, 각 파라미터들이 의미하는 것은 다음과 같습니다.

- ϕt(VLM Tokens): Eagle-2 VLM이 현재 카메라 영상과 언어 지시를 분석해서 내놓은 상황 판단 결과. Cross-Attention을 통해 결합됨
- Atτ(Noised Action):τ=0 (무작위 노이즈 상태의 시작점)과 τ=1 (노이즈가 제거된 상태의 종점) 사이의 현재 동작. 다음의 수식으로 정의됩니다.

Atτ=τAt+(1−τ)ϵ

- qt(State): 로봇의 현재 관절 상태
- ϵ(Sampled Noise): 무작위 노이즈 상태인 시작점(무작위 노이즈 벡터)
- At(Ground-truth Action): 모델이 도달해야 할 노이즈가 제거된 상태의 종점(정답 액션 청크)

즉 수식의 의미는 모델이 예측한 노이즈 제거 방향(Vθ)이 노이즈를 제거하기 위한 올바른 방향(ϵ−At)과의 차이를 나타내는 것으로, 해당 손실 함수를 최소화하는 방향으로 학습하게 됩니다.

![Forward Euler integration](https://static.wikidocs.net/images/page/366379/gh_0eb3454607a3.png)

앞서 정의된 손실 함수로 학습된 모델을 이용하여 추론 과정을 진행할 때, 위 수식과 같이 노이즈를 깎아 동작이 만들어지게 됩니다. 이를 전방 오일러 적분(Forward Euler Integration)이라고 합니다. 추론 과정에서 At0∼N(0,I)인 아무 의미 없는 무작위 노이즈를 뽑는 것으로 시작하여, 학습된 모델에게서 출력된 Vθ(⋅)를 받고 이동합니다. 이때 1K가 앞에 붙은 것을 볼 수 있는데, 이는 시작점부터 종점까지 단번에 가는 것이 아니라 전체 길이를 K등분하여 한 걸음씩 간다는 것을 의미합니다.

![K-step integration example](https://static.wikidocs.net/images/page/366379/gh_b33579c66ff2.png)

![Inference steps result](https://static.wikidocs.net/images/page/366379/gh_595db6421fbd.png)

연구진들은 4번으로 나누어 이동했을 때가 가장 잘 작동하였다고 합니다. 최종적으로 이러한 flow-matching에 의해 단 4단계만으로도 충분히 좋은 동작이 만들어지며, 연산 횟수가 적기 때문에 120Hz의 매끄러운 실제 움직임이 가능하게 됩니다.

### 2. 학습 단계 및 데이터 전략

GR00T N1은 앞서 살펴본 듀얼 시스템 아키텍처라는 구조적 혁신에 그치지 않고, 학습 과정에서도 기존 로봇 인공지능이 직면한 고질적인 한계인 데이터 섬(Data Island) 문제를 해결하기 위해 차별화된 전략을 취하고 있습니다. 단순히 특정 로봇의 데이터를 학습하는 방식에서 벗어나, 이질적인 데이터 소스들을 하나의 거대한 지능으로 통합하는 데이터 피라미드와 잠재 행동 공간 기술은 GR00T N1을 진정한 범용 로봇 모델로 만드는 핵심 동력입니다.

#### 2-1. 데이터 피라미드 구조

![Data pyramid](https://static.wikidocs.net/images/page/366379/gh_3b6bc03ce779.png)

로봇 학습의 가장 큰 난제는 대규모의 고품질 데이터를 확보하는 것입니다. GR00T N1은 이를 해결하기 위해 데이터의 양과 질, 그리고 로봇 특화 정도에 따라 계층화된 데이터 피라미드(Data Pyramid) 전략을 도입합니다.

- 기반 계층(Web Data & Human Videos): 피라미드의 가장 넓은 바닥을 형성하는 것은 방대한 인터넷상의 텍스트와 인간 활동 영상입니다. 비록 로봇의 직접적인 행동 라벨은 없지만, 로봇에게 세상에 대한 상식과 인간의 움직임 패턴을 가르치는 방대한 지식의 원천이 됩니다.
- 중간 계층(Synthetic Data):

![Synthetic data](https://static.wikidocs.net/images/page/366379/gh_3355273fd1c9.png)

물리 시뮬레이션(DexMimicGen)과 비디오 생성 AI(Neural Trajectories)를 통해 합성한 데이터입니다. 실제 데이터보다 10배 이상 많은 양을 확보하여 학습에 사용되는 데이터 양 자체를 증가시킵니다. 해당 과정은 원활한 실행을 보장하기 위하여 보간 방식을 활용하며, 끝에서 성공적인 시연만 유지되어 고품질 데이터만 수집됩니다.

- 정점 계층(Real-World Data): 실제 휴머노이드 로봇에서 수집한 고품질의 텔레오퍼레이션 데이터입니다. 양은 가장 적지만, 실제 물리 법칙과 정밀한 조작 능력을 완성하는 데 결정적인 역할을 합니다.

#### 2-2. 잠재 행동 공간

서로 다른 로봇 하드웨어와 행동 라벨이 없는 인간 영상을 하나의 모델로 학습시키기 위해, GR00T N1은 잠재 행동 공간(Latent Action Space)이라는 개념을 도입했습니다. 앞서 소개한 DINO의 라벨 없이 이미지만으로 학습하는 방식과 유사하게, latent action space도 action 라벨 없이 unsupervised 방식으로 학습합니다.

##### 행동 라벨 없이 동작을 정의하는 법 (VQ-VAE)

![VQ-VAE latent action](https://static.wikidocs.net/images/page/366379/gh_965241e438a1.png)

보통 로봇을 학습시키려면 이 시점에 관절을 15도 꺾어라 같은 정답(label)이 필요합니다. 하지만 인터넷에 널린 인간의 영상에는 이런 데이터가 없습니다. GR00T N1은 이를 VQ-VAE라는 모델로 해결합니다. VQ-VAE는 복잡하고 방대한 데이터를 핵심 특징만 추출하여 다루기 쉬운 압축된 형태(잠재 공간)로 변환해 주는 기술로, 여기서는 연속적인 영상 프레임 간의 변화를 모델이 이해할 수 있는 행동 정보로 압축하는 역할을 수행합니다.

구체적인 학습 과정은 다음과 같습니다.

- 입력: 현재 화면(x1)과 잠시 후의 화면(x2)을 동시에 보여줍니다.
- 인코더의 추론:x1에서 x2로 화면이 바뀌려면 어떤 움직임이 있어야 할까를 스스로 찾아내어 이를 잠재 행동 벡터(latent action)로 압축합니다.
- 디코더의 검증: Frame A와 추출한 동적 정보를 합쳤을 때, 정말 Frame B가 만들어지는가를 확인하며 학습합니다.

이 과정에서 모델은 관절 각도 같은 명시적인 라벨 없이도, 영상 속 객체가 어떻게 변화하고 움직이는지 그 본질적인 동작 원리를 스스로 깨우치게 됩니다.

#### 2-3. 훈련 세부 사항

GR00T N1의 훈련 과정은 데이터 피라미드의 모든 층을 전략적으로 활용하여, 범용적인 지능을 먼저 쌓고(pre-train) 특정 작업에 정교하게 적응하는(fine-tune) 2단계 방식으로 진행하였습니다.

- 사전 훈련(Pre-training): 피라미드 전체를 사용하여, 피라미드의 base(비디오 데이터셋)부터 peak(실제 로봇 데이터)까지 모든 데이터를 혼합하여 학습합니다. Base 데이터에는 실제 동작이 없으므로 학습된 잠재 동작을 추출하여 학습하였으며, middle과 peak에 해당하는 GR-1 휴머노이드 데이터 또는 OpenX-Embodiment 데이터와 같은 로봇 데이터셋의 경우 실제 로봇 동작과 학습된 잠재 동작을 모두 사용하여 학습합니다.
- 사후 훈련(Post-training): 사후 훈련은 사전 훈련된 모델을 특정 로봇 하드웨어나 개별 작업(task)에 맞춰 미세 조정(fine-tuning)하는 단계입니다. VLM 백본의 언어 부분은 고정(frozen)하고 주로 실제 로봇의 데이터(peak)를 사용하며, 데이터가 부족한 경우 Neural Trajectories 기술로 생성한 가상 영상을 1:1 비율로 섞어 학습 효율을 높입니다.

## Ⅳ. 결과

### 실험 결과

기존의 확산 정책(Diffusion Policy)과 비교했을 때, GR00T N1의 차별점은 물리적 제약을 스스로 이해하고 복잡한 상황에서 유연하게 대처하는 능력을 보여주었다는 점입니다. 가장 인상적인 질적 성과는 학습 데이터에 명시적으로 존재하지 않았던 양손 협업 능력이 스스로 나타났다는 점입니다.

#### 1. 양손 협업과 고차원 추론

![Bimanual coordination](https://static.wikidocs.net/images/page/366379/gh_1576c0ff5f7c.png)

사전 훈련된 모델에 대하여 의도적으로 휴머노이드 손의 왼쪽에만 사과를 위치시켜 놓고 "빨간 사과를 집어 바구니에 넣어라"라는 작업 지침을 입력한 경우, 사전 훈련 중 유사한 작업을 거의 접하지 않았음에도 불구하고 왼손으로 사과를 잡고 오른손에 넘겨준 다음 바구니에 담는 동작을 수행했습니다. 이는 모델이 단순히 동작을 암기한 것이 아니라, 목표를 달성하기 위해 신체 자원을 어떻게 활용해야 하는가에 대한 고차원적인 추론 능력을 갖추었음을 시사합니다.

#### 2. 부드러움과 실시간성

![Smoothness and grasp quality](https://static.wikidocs.net/images/page/366379/gh_9e234dda970c.png)

또 다른 핵심 질적 성과는 부드러움과 실시간성입니다. 사후 훈련된 GR00T N1의 움직임은 일반적으로 훨씬 더 부드럽고, 파지 정확도 또한 Diffusion Policy에 비해 상당히 높게 측정되었습니다.

#### 3. 적은 데이터에 대한 적응력

![Low-data adaptation](https://static.wikidocs.net/images/page/366379/gh_5d546a4b2725.png)

마지막으로 GR00T N1은 데이터셋에 대한 뛰어난 적응력을 보여주었습니다. 사전 훈련(pre-training) 과정에서 쌓은 방대한 지식을 바탕으로 10%의 데이터로만 훈련되었음에도 불구하고, 전체 데이터셋으로 훈련된 Diffusion Policy보다 단 3.8% 낮은 성능을 보여주었습니다. 이는 적은 데이터셋으로도 현재 환경에 맞게 파인튜닝하기 용이하다는 것을 의미합니다.

## Ⅴ. 한계점

### GR00T N1의 한계

GR00T N1은 범용 로봇 지능의 파운데이션 모델로서 뛰어난 가능성을 증명했으나, 실제 구현과 환경 적응 측면에서 몇 가지 명확한 한계를 지니고 있습니다.

- 우선 현재 모델은 작업 반경이 짧고 단순한 상판 조작 과제(short-horizon tabletop manipulation)에 주로 국한되어 있어, 넓은 공간을 이동하며 복잡한 연속 작업을 수행하는 전신 이동-조작(long-horizon loco-manipulation) 영역으로의 확장이 필요합니다.
- 복잡한 물리 세계를 완벽히 인지하기에는 현재 탑재된 비전-언어(VLM) 백본의 공간적 추론 능력이 여전히 부족하여, 향후 더 강력한 성능의 VLM 결합이 요구됩니다.
- 마지막으로 데이터 피라미드 전략을 통한 합성 데이터 생성 시, 현실의 물리 법칙을 완벽히 준수하면서 동시에 다양성을 갖춘 비디오 궤적을 합성하는 데 기술적 한계가 존재합니다. 저자들은 이러한 물리적 불일치와 인지 병목을 해결하기 위해 향후 아키텍처 고도화와 합성 데이터 품질 개선을 핵심 과제로 제시하고 있습니다.

## Ⅵ. 정리

### GR00T N1 정리

GR00T N1은 기존의 로봇 학습 모델들이 극복하지 못했던 절대적인 데이터 부족과 기종 간 파편화인 데이터 섬(Data Islands) 문제를 돌파한 파운데이션 모델입니다. 듀얼 시스템 아키텍처(Dual-System Architecture)를 통해 고차원적인 추론 계획(System 2)과 저차원적인 실시간 반응 제어(System 1)를 효율적으로 분리 및 결합하였으며, 이 과정에서 Self-Attention과 Cross-Attention의 명확한 역할 분담을 통해 물리적 일관성과 시각·언어 지시 정렬을 달성하였습니다.

나아가 학습 과정에서는 데이터 피라미드 전략을 통해 인터넷 영상과 시뮬레이션 합성 데이터, 고품질 원격 조종 데이터를 계층적으로 융합하여 데이터 스케일의 한계를 메웠습니다. 동시에 복잡한 다차원 제어 데이터를 핵심 특징으로 압축하는 VQ-VAE 기반의 잠재 행동 공간(latent action space)을 구축함으로써, 라벨 없는 인간 영상 자원까지 비지도 학습 형태로 흡수하는 혁신을 보여주었습니다.

결과적으로 GR00T N1은 특정 작업에 종속되지 않고 물리 세계의 다양한 환경에 유연하게 적응할 수 있는 범용적인 지능을 가진 모델로 평가받습니다.

## 참고문헌

- NVIDIA Research. NVIDIA Isaac GR00T N1: An Open Foundation Model for Humanoid Robots. 2025. [https://research.nvidia.com/publication/2025-03_nvidia-isaac-gr00t-n1-open-foundation-model-humanoid-robots](https://research.nvidia.com/publication/2025-03_nvidia-isaac-gr00t-n1-open-foundation-model-humanoid-robots)
- NVIDIA Technical Blog. Accelerate Generalist Humanoid Robot Development with NVIDIA Isaac GR00T N1. [https://developer.nvidia.com/blog/accelerate-generalist-humanoid-robot-development-with-nvidia-isaac-gr00t-n1/](https://developer.nvidia.com/blog/accelerate-generalist-humanoid-robot-development-with-nvidia-isaac-gr00t-n1/)
