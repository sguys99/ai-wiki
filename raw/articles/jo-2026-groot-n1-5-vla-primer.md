---
title: "03-14. Groot N1.5 - 모두의 로보틱스 - VLA 입문"
type: article
year: 2026
category: physical-ai
raw_path: raw/articles/jo-2026-groot-n1-5-vla-primer.md
raw_filename: "jo-2026-groot-n1-5-vla-primer.md"
source_collection: external
author: "조인령"
url: "https://wikidocs.net/366380"
publisher: "wikidocs.net"
fetched_at: "2026-09-04T09:51:17+0900"
extractor_tier: "chrome"
tags: []
figures:
  - id: fig01
    file: assets/jo-2026-groot-n1-5-vla-primer/fig01.png
    raw: raw/articles/jo-2026-groot-n1-5-vla-primer-figures/fig01.png
    caption: "GR00T N1.5 overview"
    strategy: fetched
    curated: false
  - id: fig02
    file: assets/jo-2026-groot-n1-5-vla-primer/fig02.png
    raw: raw/articles/jo-2026-groot-n1-5-vla-primer-figures/fig02.png
    caption: "FLARE comparison"
    strategy: fetched
    curated: false
  - id: fig03
    file: assets/jo-2026-groot-n1-5-vla-primer/fig03.png
    raw: raw/articles/jo-2026-groot-n1-5-vla-primer-figures/fig03.png
    caption: "Q-former pretraining"
    strategy: fetched
    curated: false
  - id: fig04
    file: assets/jo-2026-groot-n1-5-vla-primer/fig04.png
    raw: raw/articles/jo-2026-groot-n1-5-vla-primer-figures/fig04.png
    caption: "Future tokens overview"
    strategy: fetched
    curated: false
  - id: fig05
    file: assets/jo-2026-groot-n1-5-vla-primer/fig05.png
    raw: raw/articles/jo-2026-groot-n1-5-vla-primer-figures/fig05.png
    caption: "Future token insertion"
    strategy: fetched
    curated: false
  - id: fig06
    file: assets/jo-2026-groot-n1-5-vla-primer/fig06.png
    raw: raw/articles/jo-2026-groot-n1-5-vla-primer-figures/fig06.png
    caption: "Current observation cross-attention"
    strategy: fetched
    curated: false
  - id: fig07
    file: assets/jo-2026-groot-n1-5-vla-primer/fig07.png
    raw: raw/articles/jo-2026-groot-n1-5-vla-primer-figures/fig07.png
    caption: "Future observation alignment"
    strategy: fetched
    curated: false
  - id: fig08
    file: assets/jo-2026-groot-n1-5-vla-primer/fig08.png
    raw: raw/articles/jo-2026-groot-n1-5-vla-primer-figures/fig08.png
    caption: "Cosine similarity objective"
    strategy: fetched
    curated: false
  - id: fig09
    file: assets/jo-2026-groot-n1-5-vla-primer/fig09.png
    raw: raw/articles/jo-2026-groot-n1-5-vla-primer-figures/fig09.png
    caption: "DreamGen overview"
    strategy: fetched
    curated: false
  - id: fig10
    file: assets/jo-2026-groot-n1-5-vla-primer/fig10.png
    raw: raw/articles/jo-2026-groot-n1-5-vla-primer-figures/fig10.png
    caption: "DreamGen pipeline"
    strategy: fetched
    curated: false
  - id: fig11
    file: assets/jo-2026-groot-n1-5-vla-primer/fig11.png
    raw: raw/articles/jo-2026-groot-n1-5-vla-primer-figures/fig11.png
    caption: "Multi-view grid"
    strategy: fetched
    curated: false
  - id: fig12
    file: assets/jo-2026-groot-n1-5-vla-primer/fig12.png
    raw: raw/articles/jo-2026-groot-n1-5-vla-primer-figures/fig12.png
    caption: "Pseudo action labeling"
    strategy: fetched
    curated: false
  - id: fig13
    file: assets/jo-2026-groot-n1-5-vla-primer/fig13.png
    raw: raw/articles/jo-2026-groot-n1-5-vla-primer-figures/fig13.png
    caption: "Simulation result 1"
    strategy: fetched
    curated: false
  - id: fig14
    file: assets/jo-2026-groot-n1-5-vla-primer/fig14.png
    raw: raw/articles/jo-2026-groot-n1-5-vla-primer-figures/fig14.png
    caption: "Simulation result 2"
    strategy: fetched
    curated: false
  - id: fig15
    file: assets/jo-2026-groot-n1-5-vla-primer/fig15.png
    raw: raw/articles/jo-2026-groot-n1-5-vla-primer-figures/fig15.png
    caption: "Real robot performance"
    strategy: fetched
    curated: false
  - id: fig16
    file: assets/jo-2026-groot-n1-5-vla-primer/fig16.png
    raw: raw/articles/jo-2026-groot-n1-5-vla-primer-figures/fig16.png
    caption: "Generalization result 1"
    strategy: fetched
    curated: false
  - id: fig17
    file: assets/jo-2026-groot-n1-5-vla-primer/fig17.png
    raw: raw/articles/jo-2026-groot-n1-5-vla-primer-figures/fig17.png
    caption: "Generalization result 2"
    strategy: fetched
    curated: false
  - id: fig18
    file: assets/jo-2026-groot-n1-5-vla-primer/page-full.png
    raw: raw/articles/jo-2026-groot-n1-5-vla-primer-figures/page-full.png
    caption: "전체 페이지 스크린샷"
    strategy: screenshot
    curated: false
---

> 수집 메모 — `scripts/fetch_article.py` 가 사용자의 명시적 URL 지시에 따라 가져왔다 (CLAUDE.md rule #1 의 자료 수집 예외). 추출 tier: `chrome`. 본문은 원문 그대로이며 요약·번역·윤문하지 않았다.
> `category` 는 임시값이므로 Step 3 에서 확정할 것.

---

## Ⅰ. 모델 등장 배경

### GR00T N1.5 등장 배경

GR00T N1은 휴머노이드 로봇을 위한 VLA 모델로서 중요한 발걸음을 내디뎠지만, 몇 가지 한계점을 안고 있었습니다. 주로 단기 테이블탑 작업에 국한되었고, 새로운 행동이나 환경에 대한 일반화 능력이 제한적이었습니다. 또한 합성 데이터 생성 시 물리적 정확성이나 다양성 확보에 어려움이 있었습니다.

GR00T N1.5는 바로 이러한 N1의 한계점들을 돌파하기 위해 등장했습니다. VLM 백본을 공간 인지 능력이 향상된 Eagle-2.5로 업그레이드하여 인지 병목을 해소하였고, 미래의 시각적 변화를 내부적으로 상상하고 정렬하는 FLARE(Future LAtent Representation Alignment) 프레임워크를 도입하여 장기적 관점의 정교한 조작을 가능하게 했습니다. 나아가 물리 법칙을 고려한 대규모 신경 궤적 합성 엔진인 DreamGen 파이프라인을 구축함으로써 데이터 피라미드의 물리적 불일치 문제를 해결하였습니다.

본 문서에서는 N1.5가 어떻게 행동의 결과를 미리 상상하는지(FLARE), 그리고 방대한 합성 데이터를 통해 어떻게 데이터 한계를 넘어섰는지(DreamGen)를 중심으로 소개합니다.

## Ⅱ. 배경지식

### N1에서 N1.5로의 확장 관점

GR00T N1.5는 N1의 듀얼 시스템 아키텍처를 그대로 버리는 대신, 더 강한 VLM 백본과 미래 예측, 합성 데이터 전략을 추가하여 일반화 능력을 확장한 모델입니다. 따라서 N1.5를 이해할 때는 기존 구조 위에 어떤 예측 메커니즘과 데이터 파이프라인이 덧붙었는지를 보는 것이 핵심입니다.

## Ⅲ. 모델 구조

### 1. GR00T N1.5 모델 구조

N1과의 주요 차이점은 다음과 같습니다.

![GR00T N1.5 overview](https://static.wikidocs.net/images/page/366380/gh_7dea96844f4e.png)

- VLM 모델은 사전학습(pre-training)과 미세 조정(fine-tuning) 모두에서 동결됩니다. (N1에서는 미세 조정 단계에서만 동결하였습니다.)
- N1과 마찬가지로 GR00T N1.5도 [NVIDIA Eagle](https://github.com/NVlabs/EAGLE) VLM을 사용하여 텍스트와 시각적 관찰값을 인코딩합니다. 다만 이전 버전 대비 공간 이해도가 향상된 Eagle-2.5 버전의 VLM이 사용됩니다.
- 비전 인코더와 LLM을 연결하는 adapter MLP는 단순화되었고, LLM에 입력되는 시각적 및 텍스트 토큰 임베딩에 레이어 정규화가 추가되었습니다.
- N1에서 사용한 flow-matching loss 외에도, N1.5에서는 Future LAtent Representation Alignment(FLARE)를 추가하였습니다. 따라서 N1에서 robot state(qt)와 noised action(at)에 Self-Attention을 진행하였다면, N1.5에서는 여기서 미래의 잠재 상태를 예측하기 위한 M개의 학습 가능한 토큰을 임베딩 레이어에 추가하여 Self-Attention을 진행합니다.
- 사전학습에 사용되는 데이터셋에 다음이 추가되었습니다. DreamGen으로 만들어진 neural trajectories, 그리고 AgiBot-Beta

### 2. FLARE

#### 2-1. FLARE의 특징

FLARE(Future LAtent Representation Alignment)는 로봇이 자신의 행동이 미래에 어떤 결과를 초래할지 미리 상상하고 예측할 수 있게 해주는 프레임워크입니다. 기존의 로봇 모델들이 현재의 시각 정보에만 의존하여 즉각적인 반응을 생성하는 데 집중했다면, FLARE는 잠재 공간 세계 모델링(latent-space world modeling)을 정책 학습에 통합하여 로봇이 장기적인 관점에서 최적의 행동을 결정하도록 돕습니다. 잠재 공간 세계 모델링이란 로봇이 복잡한 환경 데이터를 핵심 특징만 추출된 압축적 공간으로 변환한 뒤, 그 안에서 자신의 행동에 따른 미래 상황을 시뮬레이션하여 물리적 인과관계를 학습하는 기술을 의미합니다.

FLARE의 주요 특징은 다음과 같습니다.

- 가볍고 강력한 확장성: 기존 VLA 모델의 아키텍처를 크게 바꾸지 않고 토큰을 추가하는 것만으로 사용할 수 있어 호환성이 뛰어납니다.
- 미래 예측 기반의 추론: 로봇이 행동을 생성하는 과정에서 미래의 잠재적 상태를 미리 예측하고 이를 실제 결과와 정렬함으로써, 추론 과정에서 더 정교한 조작이 가능해집니다.
- 데이터 효율성 극대화: 라벨이 없는 인간 시점 비디오(egocentric video)에서도 로봇이 세상의 물리적 변화를 학습할 수 있게 하여, 적은 데이터로도 새로운 작업에 빠르게 적응할 수 있게 합니다.

![FLARE comparison](https://static.wikidocs.net/images/page/366380/gh_930863ffb96a.png)

해당 그림은 flow-matching(혹은 diffusion) 정책만 사용한 경우와 FLARE를 적용한 경우를 비교한 것으로, FLARE는 flow-matching과 future latent alignment objectives를 모두 학습할 수 있으며 인간 시점 비디오와 같은 데이터셋에서도 학습할 수 있음을 보여줍니다.

#### 2-2. FLARE의 작동 방식

##### 1. 압축된 action-aware observation embedding 모델로 사전훈련

![Q-former pretraining](https://static.wikidocs.net/images/page/366380/gh_d0ebe9a2920c.png)

방대한 시각 데이터를 효율적으로 처리하기 위해 Q-former라는 특수한 구조를 사용합니다.

- SigLIP-2 모델이 이미지(256개 토큰)와 텍스트(32개 토큰)를 각각 인코딩합니다. 위 이미지는 FLARE 논문에서 발췌한 것으로, 실제 N1.5 모델을 학습시킬 때는 Eagle 2.5 VLM 모델을 사용해 인코딩합니다.
- 인코딩된 토큰은 4개의 Self-Attention 트랜스포머 블록을 통과하며 총 288개의 토큰으로 융합됩니다.
- Q-former 모듈을 적용하여, 32개의 학습 가능한 쿼리 토큰과 288개의 융합 토큰이 Self-Attention 및 Cross-Attention을 거치며 최종적으로 32개의 쿼리 토큰이 288개의 융합 토큰의 정보를 대신하도록 압축됩니다.

따라서 Eagle VLM 모델에서 처리된 시각 및 언어 정보들을 N1에서는 그대로 사용하였다면, N1.5 모델에서는 Q-former를 적용하여 32개의 압축된 토큰 정보로 사용함으로써 더 우수한 성능 및 효율성을 가지게 됩니다.

##### 2. 미래를 예측하도록 하는 토큰을 추가하여 DiT에서 공동 훈련

![Future tokens overview](https://static.wikidocs.net/images/page/366380/gh_f4e3b42342f9.png)

![Future token insertion](https://static.wikidocs.net/images/page/366380/gh_732ec0aa519f.png)

- 앞서 [03-13. Groot N1](https://wikidocs.net/366379) 모델에서는 DiT 입력 시퀀스에 로봇의 현재 관절 상태인 qt, 그리고 노이즈가 추가된 액션 청크 Atτ=τAt+(1−τ)ϵ가 들어갔습니다. N1.5 모델은 여기서 M개의 학습 가능한 미래 토큰 임베딩을 추가합니다. 이 토큰들은 처음에는 아무 의미가 없지만, Self-Attention을 거치면서 미래 상태 정보를 담는 그릇이 됩니다.

![Current observation cross-attention](https://static.wikidocs.net/images/page/366380/gh_13951b0dd68e.png)

- 다음으로 Q-former를 적용하여 32개의 압축된 토큰으로 처리된 현재 관측 정보(current observation)를 Cross-Attention으로 참조합니다. 이때 들어가는 이미지는 로봇의 현재 관절 상태인 qt와 동일한 t 시점으로 샘플링하여 입력합니다.

![Future observation alignment](https://static.wikidocs.net/images/page/366380/gh_6253255699e9.png)

- Self-Attention을 통해 학습된 M개의 미래 토큰 임베딩을 미래 관측 정보(future observation) 모델의 맨 마지막 층과 비교하는 과정을 진행합니다. 미래 관측 정보는 로봇의 현재 관절 상태인 qt보다 H step 뒤 시점인 t+H 시점으로 샘플링하여 입력합니다.

![Intermediate layer selection](https://static.wikidocs.net/images/page/366380/gh_522c40e5144a.png)

- 

이때 모델의 맨 마지막 층이 아닌 중간 층(L)에서 진행하는데, 너무 앞쪽 층은 정보가 부족하며 뒤쪽 층은 현재의 동작을 결정하는 데 집중하기 때문입니다. 실험 결과, 총 8개 층 중 6번째 층에서 미래 정보를 추출할 때 가장 성능이 좋았습니다. 추가적으로 DiT 내부에서 나온 데이터와 우리가 비교하려는 미래 관측 정보는 데이터의 차원이 다를 수 있기에, MLP를 통과시켜 두 데이터를 직접 비교할 수 있는 동일한 공간으로 변환해 주는 과정도 진행됩니다.

- 

비교는 코사인 유사도 수식을 통해 계산됩니다.

![Cosine similarity objective](https://static.wikidocs.net/images/page/366380/gh_109017d478f7.png)

- B: 배치 차원
- M: 미래 토큰 개수(32개)
- D: 임베딩 차원
- fθ(ϕt,Atτ,qt): DiT가 현재 상태를 보고 미래를 예측한 데이터
- g(ϕt+H): 원본 비디오 데이터에서 t+H 시점으로 샘플링된 미래 사진의 실제 데이터
- cos⁡(⋅,⋅): 두 데이터가 얼마나 같은 방향을 가리키는지 측정하는 코사인 유사도입니다. 1에 가까울수록 더 유사하다는 의미입니다.

- 기존 N1 모델의 flow-matching 손실 함수에 Future Latent Representation Alignment 손실 함수를 추가하여, 최종 손실 함수는 다음과 같이 정의됩니다.

![FLARE total loss 1](https://static.wikidocs.net/images/page/366380/gh_5950610e221c.png)

![FLARE total loss 2](https://static.wikidocs.net/images/page/366380/gh_87b7af9b7c29.png)

- Lfm: [03-13. Groot N1](https://wikidocs.net/366379)에서 설명한 일반적인 flow-matching 손실 함수
- λ: 학습 가능한 가중치이며, 0.2라는 비율이 가장 적절하였습니다.

GR00T N1.5는 이러한 FLARE를 모델에 적용하며 단순히 다음 동작을 예측하는 것을 넘어, 자신의 행동이 미래에 가져올 시각적 변화를 내부적으로 상상하도록 설계되었습니다. 덕분에 복잡한 환경에서도 물체를 쓰러뜨리지 않고 피해 가거나, 더 효율적인 경로로 손을 뻗는 등 훨씬 지능적이고 부드러운 움직임을 구현할 수 있게 되었습니다.

### 3. DreamGen

#### 3-1. DreamGen의 특징

로봇 학습의 가장 큰 걸림돌은 사람이 직접 로봇을 조종해서 데이터를 모아야 한다는 비용 문제였습니다. DreamGen은 비디오 월드 모델(Video World Model)을 활용하여, 실제 로봇이 움직이는 것 같은 합성 비디오(Neural Trajectories)를 스스로 만들어냅니다.

![DreamGen overview](https://static.wikidocs.net/images/page/366380/gh_fe7a6459d312.png)

#### 3-2. DreamGen의 4단계 파이프라인

DreamGen은 로봇 정책 훈련을 위한 4단계 파이프라인으로 구성됩니다.

![DreamGen pipeline](https://static.wikidocs.net/images/page/366380/gh_77dadc99f920.png)

##### 1. 비디오 월드 모델 미세 조정 (Finetune Video World Model)

사람이 원격 조작한 로봇 궤적에 비디오 월드 모델을 미세 조정하여 로봇의 물리적 제약과 움직임 능력을 학습시키는 과정입니다. 월드 모델의 WAN2.1, CogVideoX, Hunyuan, Cosmos 전체를 다시 학습시키는 대신, LoRA(Low-Rank Adaptation)를 사용하여 작은 크기의 행렬곱으로 나누고 이들만 부분적으로 학습시키는 방식으로 진행합니다.

![Multi-view grid](https://static.wikidocs.net/images/page/366380/gh_f76dba5a7e0e.png)

또한 훈련 데이터셋에 고정된 시점이 아닌 여러 시점이 혼재하여 존재하는 경우, 위 그림처럼 여러 카메라 영상을 하나의 2x2 Grid 모양으로 합쳐서 하나의 비디오처럼 학습시킵니다.

##### 2. 비디오 월드 모델 롤아웃 (Rollout Video World Model)

미세 조정된 비디오 월드 모델을 사용하여 다양한 초기 프레임과 언어 지침으로 합성 로봇 비디오를 생성하는 과정입니다. 입력으로 로봇이 현재 처한 상황을 보여주는 실제 사진 한 장을 주면, 시뮬레이터에서 각 작업에 대해 대상 물체나 환경의 위치를 무작위화하며 증강하는 과정을 거칩니다.

##### 3. 가상 행동 라벨링 (Label Pseudo Actions)

생성된 비디오에는 행동 라벨(label)이 없으므로, 생성된 비디오에서 역동역학 모델(Inverse Dynamics Model, IDM) 또는 잠재 행동 모델(Latent Action Model, LAPA)을 사용하여 가상 행동 라벨을 추출하는 과정입니다.

![Pseudo action labeling](https://static.wikidocs.net/images/page/366380/gh_3df532594226.png)

- 역동역학 모델(Inverse Dynamics Model, IDM): DiT와 SigLIP-2 비전 인코더를 사용하며 현재 프레임(St)과 미래 프레임(St+h) 두 장을 입력받아, 그 사이를 채울 action chunk를 예측하도록 훈련됩니다. 이때 로봇의 상태 정보 없이 오직 이미지의 변화만 보고 동작을 뽑아내는 것이 특징입니다. 훈련 후에는 슬라이딩 윈도우(Sliding Window) 방식을 통해 비디오 전체를 한 프레임씩 밀어가며 연속적으로 동작을 추출하여 자연스러운 라벨을 만듭니다.
- 잠재 행동 모델(Latent Action Model, LAPA): VQ-VAE 구조를 사용하여 현재 프레임(St)과 미래 프레임(St+h) 두 장을 입력받아 두 프레임 사이의 시각적 차이를 잠재 동작(latent action)으로 변환합니다. 해당 잠재 동작 벡터가 그 자체로 라벨이 됩니다.

##### 4. 신경 궤적을 통한 정책 훈련 (Visuomotor Policy Training)

생성된 신경 궤적을 사용하여 시각 운동 로봇 정책을 훈련하는 과정입니다. 신경 궤적에는 상태 정보가 포함되어 있지 않으므로, 상태 정보는 0으로 조건화하여 진행합니다. N1.5 모델을 학습시키는 경우 이렇게 합성된 데이터셋과 상태 정보도 포함되어 있는 실제 데이터셋 모두를 공동으로 사용하는데, 따라서 두 가지 유형의 궤적을 별도의 행동 인코더와 디코더를 사용하여 별도의 경로로 처리합니다.

DreamGen의 가장 큰 특징은 이렇게 단순히 데이터의 양을 늘리는 증강뿐 아니라 일반화(generalization)에 있습니다.

- 환경 일반화(Environment Generalization): 로봇이 처음 가보는 장소에서도 즉시 작업할 수 있게 하는 특징입니다. 앞서 데이터셋을 증강하는 과정에서 임의의 사진 환경을 무작위화하는 과정을 거쳤기에, 연구실 데이터로만 학습한 로봇이 주방, 사무실 등 10가지의 새로운 환경에서 28.5%의 성공률을 기록했습니다.
- 행동 일반화(Behavior Generalization): DreamGen은 로봇이 배운 적 없는 새로운 동사(verbs)를 이해하게 만들었습니다. 기존 GR00T N1은 훈련 데이터에 포함된 집기(pick-and-place) 지시만 반복하며 12가지의 새로운 지시(물 붓기 pour, 다림질하기 iron, 물 주기 water 등)에 대해서는 13.1%라는 낮은 성공률을 기록한 반면, GR00T N1.5는 DreamGen을 통해 38.3%라는 성공률을 기록했습니다.

## Ⅳ. 결과

### 실험 결과

GR00T N1.5는 아키텍처 개선, 데이터 확장, 그리고 새로운 학습 손실 함수 도입을 통해 이전 모델인 N1 대비 시뮬레이션과 실물 로봇 환경 모두에서 압도적인 성능 향상을 기록했습니다.

#### 1. 시뮬레이션 환경에서의 성능 향상

![Simulation result 1](https://static.wikidocs.net/images/page/366380/gh_aed97a67711d.png)

![Simulation result 2](https://static.wikidocs.net/images/page/366380/gh_9f8a0b8cb3c2.png)

N1.5는 언어 지시 수행 능력을 평가하는 주요 시뮬레이션 환경에서 비약적인 성공률 향상을 보였습니다. 특히 복잡한 언어 명령이 포함된 작업에서 강점을 드러냅니다. 이러한 결과는 N1.5가 단순히 동작을 흉내 내는 것을 넘어, 제공된 언어 명령과 시각 정보를 더 정교하게 결합하여 처리하고 있음을 보여줍니다.

#### 2. 실제 휴머노이드 로봇에서의 성능

![Real robot performance](https://static.wikidocs.net/images/page/366380/gh_ca3101f8a5b2.png)

실제 휴머노이드 로봇(GR-1)을 이용한 평가에서도 언어 이해도와 작업 성공률이 크게 개선되었습니다. N1.5는 두 가지 과일 중 특정 과일을 골라 접시에 담는 등의 세밀한 지시 사항을 거의 완벽하게(93.3%) 이해하며, 이는 frozen VLM(Eagle 2.5) 전략이 언어 이해력을 보존하는 데 효과적이었음을 입증합니다.

#### 3. 일반화와 하드웨어 전이 성능

![Generalization result 1](https://static.wikidocs.net/images/page/366380/gh_5431209856fe.png)

![Generalization result 2](https://static.wikidocs.net/images/page/366380/gh_39109965c241.png)

N1.5의 또 다른 특징은 FLARE(Future Latent Representation Alignment) 알고리즘을 통한 일반화 성능의 확장입니다. 학습 데이터에 없던 10가지 새로운 물체에 대해 FLARE를 통한 인간 영상 학습(human ego-videos)을 거친 후 55.0%의 성공률을 기록했습니다. (N1의 경우 0-shot 성공률 0%) 또한 앞의 DreamGen에서 소개한 바와 같이, 기존에 학습하지 않았던 12가지 새로운 동사(행동)에 대해 38.3%의 성공률을 달성했습니다. (N1은 13.1%)

GR-1 데이터로 사전 학습된 모델을 Unitree G1 로봇에 적용(post-training)했을 때에도 미학습 물체에 대해서 84.2%의 높은 성공률을 보이며 뛰어난 하드웨어 전이 성능을 증명했습니다. 결과적으로 N1.5는 더 적은 로봇 시연 데이터로도 새로운 환경과 물체, 그리고 복잡한 언어 명령에 유연하게 대응할 수 있는 성능을 확보하였습니다.

## Ⅴ. 한계점

### GR00T N1.5의 한계

GR00T N1.5는 N1의 한계점을 상당 부분 개선했지만, 여전히 완벽하지는 않으며 향후 연구 방향을 제시하고 있습니다.

- 기존 N1의 한계점을 상당 부분 개선했지만, 아직 완전히 새로운 행동과 환경에 대한 일반화는 향후 연구 과제로 남아 있습니다.
- GR00T N1의 한계점으로 지적되었던 장기적인 이동 및 조작(long-horizon loco-manipulation) 작업에 대한 능력은 N1.5에서도 여전히 발전의 여지가 있습니다. 매우 복잡하거나 예측 불가능한 실제 환경에서의 강건성(robustness) 또한 지속적인 개선이 필요한 부분입니다.
- DreamGen 파이프라인의 생성형 비디오 모델은 시각적으로는 매우 자연스러운 신경 궤적을 만들어내지만, 물리 엔진처럼 뉴턴의 물리 법칙을 엄격하게 계산하여 프레임을 생성하는 것이 아니기 때문에 미세한 물체 조작 시 시각적 왜곡이나 물리적 불일치가 발생할 수 있습니다. 따라서 여전히 물리 법칙을 완벽하게 준수하면서 다양하고 반사실적인 데이터를 생성하는 데는 도전 과제가 남아 있습니다.

## Ⅵ. 정리

### GR00T N1.5 정리

GR00T N1.5는 N1의 범용 아키텍처를 계승하여 미래 예측 기반의 추론(FLARE)과 월드 모델 기반의 데이터 합성(DreamGen)을 성공적으로 융합한 차세대 로봇 파운데이션 모델입니다. 기존 N1 모델보다 더 향상된 성능의 Eagle-2.5 VLM을 채택하여 언어 이해력을 보존하고, Q-former 구조를 도입해 시각 데이터를 32개의 핵심 토큰으로 압축하며 연산 효율성을 확보했습니다.

핵심 기술인 FLARE 프레임워크는 DiT 입력 층에 미래 토큰을 추가하고 이를 실제 미래 관측 정보와 정렬시키는 잠재 공간 세계 모델링을 통해, 로봇이 행동에 따른 변화를 내부적으로 상상하도록 유도합니다.

또한 DreamGen 파이프라인은 역동역학 및 잠재 행동 모델을 활용하여 행동 라벨이 없는 대규모 합성 비디오인 신경 궤적을 생성함으로써 데이터 부족 문제를 해결했습니다. 이러한 합성 데이터의 다양성 덕분에 로봇은 처음 마주하는 10가지 미학습 환경에서도 28.5%의 성공률을 기록하며 뛰어난 환경 일반화 성능을 달성했습니다. 또한 GR00T N1.5는 사전에 학습된 가중치를 Unitree G1 로봇에 교차 적용했을 때도 미학습 물체 기준 84.2%의 높은 성공률을 기록하며 탁월한 하드웨어 간 전이 성능을 입증했습니다.

## 참고문헌

- NVIDIA Research. GR00T N1.5: An Improved Open Foundation Model for Generalist Humanoid Robots. [https://research.nvidia.com/labs/gear/gr00t-n1_5/](https://research.nvidia.com/labs/gear/gr00t-n1_5/)
- Yuke Zhu et al. DreamGen: Unlocking Generalization in Robot Learning through Neural Trajectories. arXiv, 2025. [https://arxiv.org/abs/2505.12705](https://arxiv.org/abs/2505.12705)
- Guo Chen et al. Eagle 2.5: Boosting Long-Context Post-Training for Frontier Vision-Language Models. arXiv, 2025. [https://arxiv.org/abs/2504.15271](https://arxiv.org/abs/2504.15271)
