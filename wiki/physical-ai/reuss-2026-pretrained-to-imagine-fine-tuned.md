---
title: "Pretrained to Imagine, Fine-Tuned to Act: The Rise of World-Action Models"
type: article
year: 2026
category: physical-ai
source: reuss-2026-pretrained-to-imagine-fine-tuned.md
raw_path: raw/articles/reuss-2026-pretrained-to-imagine-fine-tuned.md
raw_filename: "reuss-2026-pretrained-to-imagine-fine-tuned.md"
source_collection: external
author: "Moritz Reuss"
url: "https://developer.nvidia.com/blog/pretrained-to-imagine-fine-tuned-to-act-the-rise-of-world-action-models/"
publisher: "NVIDIA Technical Blog"
publication_date: "2026-06-15"
korean_edition: 9bow-2026-world-action-model-rise.md
tags: [physical-ai, world-model, vla, robot-learning]
figures:
  - id: fig03
    file: assets/reuss-2026-pretrained-to-imagine-fine-tuned/fig03.webp
    raw: raw/articles/reuss-2026-pretrained-to-imagine-fine-tuned-figures/fig03.webp
    caption: "generalist manipulation policy를 향한 두 가지 베팅, VLM 기반 VLA와 video backbone 기반 WAM"
    strategy: fetched
    curated: true
  - id: fig04
    file: assets/reuss-2026-pretrained-to-imagine-fine-tuned/fig04.webp
    raw: raw/articles/reuss-2026-pretrained-to-imagine-fine-tuned-figures/fig04.webp
    caption: "로보틱스 world model 지형도에서 action 조건부 world model과 video world model이 겹치는 자리에 놓인 WAM"
    strategy: fetched
    curated: true
  - id: fig07
    file: assets/reuss-2026-pretrained-to-imagine-fine-tuned/fig07.webp
    raw: raw/articles/reuss-2026-pretrained-to-imagine-fine-tuned-figures/fig07.webp
    caption: "Veo 3.1이 zero-shot으로 생성한 토스터 레버 누르기 rollout"
    strategy: fetched
    curated: true
  - id: fig10
    file: assets/reuss-2026-pretrained-to-imagine-fine-tuned/fig10.webp
    raw: raw/articles/reuss-2026-pretrained-to-imagine-fine-tuned-figures/fig10.webp
    caption: "UniPi 구조. 텍스트 조건부 video 생성기가 미래 프레임을 만들고 별도 inverse dynamics 모듈이 action을 추출한다"
    strategy: fetched
    curated: true
  - id: fig11
    file: assets/reuss-2026-pretrained-to-imagine-fine-tuned/fig11.webp
    raw: raw/articles/reuss-2026-pretrained-to-imagine-fine-tuned-figures/fig11.webp
    caption: "Motus 계열 hybrid 구성. video 모델링과 action 생성을 별도 Transformer가 맡되 attention과 텍스트 조건화를 공유한다"
    strategy: fetched
    curated: true
  - id: kr05
    file: assets/reuss-2026-pretrained-to-imagine-fine-tuned/kr05.jpg
    raw: raw/articles/9bow-2026-world-action-model-rise-figures/fig05.jpg
    caption: "WAM 설계 공간 전체 조망. paradigm과 action integration과 architecture 세 가지 기준"
    strategy: fetched
    from_source: 9bow-2026-world-action-model-rise
    curated: true
  - id: kr06
    file: assets/reuss-2026-pretrained-to-imagine-fine-tuned/kr06.jpg
    raw: raw/articles/9bow-2026-world-action-model-rise-figures/fig06.jpg
    caption: "inverse dynamics 계열 WAM의 추상 구조"
    strategy: fetched
    from_source: 9bow-2026-world-action-model-rise
    curated: true
  - id: kr09
    file: assets/reuss-2026-pretrained-to-imagine-fine-tuned/kr09.jpg
    raw: raw/articles/9bow-2026-world-action-model-rise-figures/fig09.jpg
    caption: "joint prediction 계열 WAM의 추상 구조"
    strategy: fetched
    from_source: 9bow-2026-world-action-model-rise
    curated: true
  - id: kr13
    file: assets/reuss-2026-pretrained-to-imagine-fine-tuned/kr13.jpg
    raw: raw/articles/9bow-2026-world-action-model-rise-figures/fig13.jpg
    caption: "2026년 4월 RoboArena 리더보드. DreamZero 1750, Pi-0.5 1622"
    strategy: fetched
    from_source: 9bow-2026-world-action-model-rise
    curated: true
  - id: kr21
    file: assets/reuss-2026-pretrained-to-imagine-fine-tuned/kr21.png
    raw: raw/articles/9bow-2026-world-action-model-rise-figures/fig21.png
    caption: "학습 레시피별 조밀 코어 연산량 비교, 로그 스케일 ZFLOP"
    strategy: fetched
    from_source: 9bow-2026-world-action-model-rise
    curated: true
  - id: kr22
    file: assets/reuss-2026-pretrained-to-imagine-fine-tuned/kr22.jpg
    raw: raw/articles/9bow-2026-world-action-model-rise-figures/fig22.jpg
    caption: "VLA 계열과 WAM 계열, 그리고 둘을 합치는 세 번째 경로로의 수렴 가능성"
    strategy: fetched
    from_source: 9bow-2026-world-action-model-rise
    curated: true
---

## 요약

NVIDIA Seattle Robotics Lab의 Moritz Reuss가 2026년 6월 NVIDIA Technical Blog에 발표한 World-Action Model 지형도다. WAM은 world-action model의 약자로, 대규모 video로 pre-training한 backbone에서 출발해 장면이 앞으로 어떻게 변할지 예측하면서 거기에 맞는 action까지 내놓는 policy 계열을 가리킨다. policy는 현재 observation을 받아 다음 action을 정하는 함수를 말한다.

이 글의 중심 주장은 WAM이 VLM 기반 VLA와 나란한 두 번째 레시피가 된다는 것이다. 저자는 2025년 10월 State of VLA 글에서 WAM을 VLA 연구의 작은 하위 분야로 적었는데, 몇 달 만에 그 판단을 바꿨다고 밝힌다.

이 자료의 값은 개별 모델 소개보다 지형도 자체에 있다. 흩어져 있던 WAM 연구를 paradigm, action integration, architecture 세 가지 기준으로 나눠 한 표에 모았고, VLA와 WAM의 학습 연산량을 ZFLOP이라는 같은 잣대로 환산했으며, 추론 속도라는 실전 병목도 수치로 제시했다. 저자는 승자를 고르지 않고, 다음 세대 로봇 foundation model로 VLA와 WAM의 hybrid를 유력하게 꼽는다.

## 배경

### 두 가지 표현 베팅

지금 로봇 foundation model 분야에는 표현을 놓고 벌이는 큰 베팅이 두 가지 있다. 하나는 VLM backbone에서 출발하는 기존 VLA 레시피로, Pi-0가 세우고 Pi-0.5가 다듬었다. NVIDIA GR00T와 Xiaomi Robotics, Being-H0.5가 같은 경로를 따른다.

나머지 하나는 pre-training된 video backbone을 generalist manipulation의 새 출발점으로 쓰는 경로다. 산업 쪽 공개 사례로는 NVIDIA의 DreamZero와 Cosmos Policy, Ant Group의 LingBot-VA, Rhoda AI의 DVA, Sereact의 Cortex 2.0, Mimic Robotics의 mimic-video가 있다. 대학과 오픈 연구 그룹에서도 Video Prediction Policy, Unified Video Action Model, Fast-WAM이 나왔다.

![[assets/reuss-2026-pretrained-to-imagine-fine-tuned/fig03.webp]]
*Figure 1: generalist manipulation policy를 향한 두 가지 베팅. 왼쪽이 VLM 기반 VLA, 오른쪽이 video backbone 기반 WAM이다 (Reuss 2026, Figure 1).*

backbone을 무엇으로 잡느냐에 따라 학습 레시피와 데이터 혼합부터 추론 최적화까지 파이프라인 전체가 따라온다. 따라서 이만한 모델을 대규모로 학습시키는 비용을 감안하면 대부분의 팀은 두 경로 중 하나를 먼저 정해야 한다. 두 경로 중 어느 쪽이 입증될지, 혹은 둘이 수렴할지는 아직 열려 있다.

WAM이 놓인 자리를 이해하려면 로보틱스 world model 전반의 지형을 먼저 봐야 한다. world model은 환경의 동역학을 학습해 미래를 예측하는 모델이다. DreamDojo와 Genie, JEPA-WM 같은 action 조건부 world model은 학습된 action 추상화로부터 미래 상태를 예측한다. Cosmos-Predict와 Wan, Veo 같은 video world model은 언어와 참조 프레임을 조건으로 미래 video를 예측한다. WAM은 그 교집합에 놓여, video backbone이나 world model backbone을 action을 내놓는 로봇 policy 안에서 재사용한다.

![[assets/reuss-2026-pretrained-to-imagine-fine-tuned/fig04.webp]]
*Figure 2: 로보틱스 world model 지형도. action 조건부 world model과 video world model이 겹치는 자리에 DreamZero, LingBot-VA, UniPi, mimic-video 같은 WAM이 있다 (Reuss 2026, Figure 2).*

### grounding 간극

VLM 기반 VLA가 부딪히는 벽은 grounding이다. grounding은 지시문(instruction)에 등장하는 기호를 그 말을 실제로 만족시키는 지각 대상과 운동 대상에 붙이는 일을 말한다. "빨간 머그컵을 집어라"라는 문장을 그 일을 실제로 해내는 시각 인식과 모터 명령으로 바꾸는 과정이 여기 해당한다.

첫 VLA들의 동기는 VLM이 가진 인터넷 규모 지식을 로보틱스로 옮기는 것이었다. 문제는 VLM pre-training과 embodied manipulation 사이의 도메인 격차가 크다는 점이다. 격차가 크기 때문에 언어와 픽셀을 행동으로 잇는 연결은 결국 제한된 로봇 데이터 안에서 배울 수밖에 없다.

그 과정에서 pre-training된 능력이 손상되는 현상은 여러 논문이 보고했다. VLM2VLA는 이를 VLM에서 VLA로 넘어가는 구간의 catastrophic forgetting으로 규정한다. Knowledge Insulation은 같은 문제를 구조로 다뤄, flow matching action expert의 그래디언트가 VLM backbone으로 흘러들지 않게 분리했고 학습 수렴과 과제 성능과 지시 따르기가 모두 개선됐다고 보고한다. 그럼에도 제한된 로봇 데이터에서 언어를 물리적 action으로 잇는 문제 자체는 그대로 남는다.

### WAM에 거는 세 가지 가설

WAM은 출발점 자체를 바꿔 이 문제를 우회한다. video 생성 모델은 정확한 언어 설명을 시각적 결과로 매핑하도록 학습되고, 학습에 쓰인 video에는 손이 뻗고 도구가 움직이며 물체가 다뤄지는 의도적 동작이 이미 가득하다. 따라서 action을 하나도 보기 전에 backbone은 언어와 시각적 변화와 그럴듯한 물체 상호작용 사이의 연결을 이미 어느 정도 부호화하고 있다.

저자는 이 기대를 결론이 아니라 가설로 제시하며, 아직 통제된 비교로 검증되지 않았다고 명시한다. 근거로 드는 항목은 셋이다.

- 미래 변화 예측은 그에 필요한 action 생성과 상관관계가 있다. 원하는 결과가 주어지면 그 결과를 만든 action을 되짚는 편이, 지시문과 현재 observation에서 action을 곧바로 예측하는 것보다 대체로 쉽다. Pi-0.7이 원하는 미래 이미지를 policy에 줬을 때 action 예측이 직접적으로 바뀌고 학습 수렴이 빨라졌다고 보고한 것도 같은 방향의 신호다.
- video pre-training이 언어와 물리적 변화 사이의 grounding을 대신 제공한다. video 모델은 텍스트 설명을 시각적 결과로 옮기도록 학습되므로, 이 능력이 로보틱스로 전이되면 시연 데이터(demonstration)만으로 배워야 할 grounding의 양이 줄어든다.
- 웹 규모 video가 로봇 policy를 정규화한다. 로봇 데이터셋은 웹 규모 video에 비해 작기 때문에, video로 먼저 pre-training하거나 로봇 데이터와 함께 co-training하면 넓은 시각 사전 지식이 과적합을 줄일 수 있다. 다만 그 효과는 데이터셋과 목적 함수와 아키텍처에 따라 달라진다. DreamZero와 Fast-WAM은 로봇 fine-tuning 구간에서 action 학습을 video 예측 목적과 함께 co-training할 때 WAM 성능이 가장 좋았다고 보고한다.

## 핵심 개념

이 자료를 읽는 데 필요한 개념은 여섯 가지다. 원문도 본론에 앞서 용어 상자를 두고 같은 개념들을 풀이한다.

visuomotor policy는 이미지를 직접 받아 모터 명령을 내는 policy를 말한다. 현재 observation과 목표 혹은 지시문을 입력으로 받아 로봇 action을 출력하는 구조이며, WAM 논의에서는 비교 대상이 되는 기본형에 해당한다.

video backbone은 로봇 policy 안에서 중심 표현이나 생성기로 재사용되는, 웹 규모 video로 pre-training된 생성 모델이다. Wan과 Cosmos 계열이 현대 WAM의 표준 출발점이다.

inverse dynamics는 현재 observation과 k스텝 뒤 observation이 주어졌을 때 그 전이를 만든 action이나 action 시퀀스를 추론하는 문제다. WAM의 한 계열은 미래를 먼저 생성한 뒤 이 문제만 풀어 action을 얻는다.

action chunk는 policy 호출 한 번에 예측하는 여러 timestep 분량의 action 묶음이다. 관절 명령이나 end-effector 변화량, 그리퍼 개폐 상태가 여기 들어간다. ACT와 Diffusion Policy가 이 방식을 세웠고, 현대 WAM의 action 출력부도 대부분 이 단위로 동작한다.

Mixture-of-Transformers는 video Transformer와 action Transformer처럼 모달리티별 전문가를 두되 가중치는 나누고 attention은 공유하는 구조다. 약어 MoT로 쓴다. mixture-of-experts가 라우팅으로 전문가를 고르는 것과 달리 모달리티로 전문가를 가른다.

DiT는 diffusion 모델의 denoising 신경망을 Transformer로 구현한 구조다. 이미지와 video와 action 토큰을 여러 스텝에 걸쳐 디노이징하며, timestep 조건을 블록에 주입할 때 adaptive layer normalization을 쓰는 것이 일반적이다.

이 개념들 위에 VAE가 하나 더 붙는다. 고해상도 이미지와 video를 latent 표현으로 압축해 토큰 수를 크게 줄이는 장치이며, Wan 2.1의 VAE는 시간 방향 4배와 공간 방향 8×8 압축을, Wan 2.2-5B는 시간 방향 4배와 공간 방향 16×16 압축을 쓴다.

## 방법

### 설계 공간의 세 가지 기준

VLM 기반 VLA는 학습 레시피가 VLM co-training과 flow matching action 생성 조합으로 대체로 수렴했다. 반면 WAM은 아직 여러 형태로 갈라져 있다. 저자는 이 공간을 세 가지 기준으로 정리하되, 기준끼리 완전히 독립은 아니며 일부 WAM은 한 범주에 깔끔하게 들어가지 않는다고 단서를 단다.

| 기준 | 묻는 질문 | 선택지 |
|---|---|---|
| paradigm | 모델이 무엇을 예측하고, 예측된 video를 어떻게 action으로 바꾸는가 | inverse dynamics, joint prediction, representation-only |
| action integration | action이 실제로 모델에 어떻게 들어가는가 | 기본 action 토큰, action-as-image, latent plan과 latent action |
| architecture | 구성 요소를 어떻게 묶는가 | Mixture-of-Transformers, monolithic, hierarchical |

![[assets/reuss-2026-pretrained-to-imagine-fine-tuned/kr05.jpg]]
*Figure 8: WAM 설계 공간 전체 조망. 왼쪽이 예측 대상, 가운데가 action 통합 방식, 오른쪽이 구성 방식이다 (Reuss 2026, Figure 8, 한국어 판 재게시본).*

저자는 이 분류를 완벽한 taxonomy가 아니라 현재 논문들을 이름에 휘둘리지 않고 읽기 위한 실용적 지도로 보라고 밝힌다. 각 기준마다 초기 논문 한 편과 같은 레시피를 규모만 키운 현대판 한 편을 짝지어 제시하는 방식으로 서술이 진행된다.

### 예측 대상에 따른 구분

세 계열은 추론 경계에서 갈린다. inverse dynamics 계열은 미래 video를 먼저 만들고 거기서 action을 뽑는다. joint prediction 계열은 video와 action을 한 번에 낸다. representation-only 계열은 추론 시점의 video 생성을 아예 건너뛴다.

### inverse dynamics 계열

inverse dynamics 계열은 미래를 먼저 상상해 놓고 그 video에서 action을 거꾸로 읽어낸다. 이렇게 구성하면 어려운 언어 grounding이 video 단계로 넘어간다. 즉 명령을 그럴듯한 시각적 변화로 옮기는 일은 video 모델이 맡고, action 헤드는 되짚기 문제 하나에만 집중하면 된다.

![[assets/reuss-2026-pretrained-to-imagine-fine-tuned/kr06.jpg]]
*Figure 9: inverse dynamics 계열 WAM의 추상 구조. video 모델이 미래 프레임이나 latent을 만들고, inverse dynamics 헤드가 그 전이를 action 시퀀스로 매핑한다 (Reuss 2026, Figure 9, 한국어 판 재게시본).*

이 레시피를 현대적으로 처음 구현한 사례가 2023년 UniPi다. video를 high-level 계획으로 쓰고 inverse dynamics로 low-level 제어를 복원한다는 구성을 명확히 제시한 논문이다.

![[assets/reuss-2026-pretrained-to-imagine-fine-tuned/fig10.webp]]
*Figure 10: UniPi 구조. 텍스트 조건부 video 생성기가 현재 프레임과 지시문에서 미래 이미지 시퀀스를 만들고, 별도 inverse dynamics 모듈이 연속 프레임에서 action을 추출한다 (Reuss 2026, Figure 10).*

UniPi는 동시에 WAM이 왜 몇 년 더 걸렸는지도 보여준다. Imagen Video 세대의 CNN 기반 video diffusion 스택을 썼고 video 생성기를 처음부터 pre-training해야 했다. 저자의 어림 추정으로 그 pre-training은 약 167 ZFLOP이며, 이는 대부분의 로보틱스 연구실 예산 밖이다. 현대 inverse dynamics WAM은 공개된 DiT 기반 video backbone에서 시작해 fine-tuning하는 것으로 이 단계를 건너뛴다.

같은 방향의 현대판이 LingBot-VA다. Wan 2.2-5B를 16,000시간의 cross-embodiment pre-training으로 로봇 video-action 모델로 바꿨다. UniPi와의 차이는 규모만이 아니다. LingBot-VA는 causal 구조로 긴 시각 이력을 학습해 open-loop video 생성이 아니라 closed-loop rollout을 노린다. closed-loop 제어는 매 timestep 새 observation을 받아 action을 다시 정하는 방식이다.

| 설계 선택 | UniPi (2023) | LingBot-VA (2026) |
|---|---|---|
| 주요 아이디어 | 미래 video 계획을 만든 뒤 inverse dynamics로 action 복원 | video backbone을 fine-tuning해 closed-loop world-action rollout 수행 |
| backbone | CNN 기반 video diffusion (cascaded U-Net), Imagen Video 시대, from scratch | Wan 2.2-5B latent DiT (공개 가중치) |
| latent video VAE | 없음. 저해상도 RGB 미래를 직접 생성 | Wan 2.2-5B (공간 16×16, 시간 4배) |
| action expert | 별도 CNN action 헤드 | joint attention으로 결합된 MoT action expert |
| action과 video 결합 | 단방향. video가 먼저, 그다음 action | 양방향. video가 action을 조건화하고 생성된 action이 다시 video를 조건화 |
| 로봇 학습 규모 | 작음. 시연 데이터 위주 | embodiment 전반에 걸쳐 16,000시간 |

같은 주제의 변형도 여럿이다. Video Prediction Policy와 DiT4DiT, mimic-video는 최종 RGB video를 반드시 만들지 않고 video 모델의 중간 feature를 action 디코더의 예측 계획으로 쓴다. DVA와 LingBot-VA는 생성되거나 예측된 미래 rollout에 더 직접적으로 의존한다. 비교를 어렵게 만드는 요인은 논문마다 video backbone과 대규모 pre-training 양과 하이퍼파라미터와 평가 셋업이 모두 다르다는 점이다.

### joint prediction 계열

joint prediction 계열은 미래 video와 action을 같은 예측 단계에서 함께 낸다. 무엇이 일어나야 하는지와 그것을 어떻게 만들지를 한 번에 배우도록 강제하는, 더 강하게 결합된 구성이다.

![[assets/reuss-2026-pretrained-to-imagine-fine-tuned/kr09.jpg]]
*Figure 12: joint prediction 계열 WAM의 추상 구조. 하나의 모델이 지시문과 현재 observation을 받아 action 시퀀스와 상상된 미래 상태를 한 번에 낸다 (Reuss 2026, Figure 12, 한국어 판 재게시본).*

출발점은 GR-1이다. 인터넷 video 예측으로 pre-training한 GPT-2 계열 Transformer policy를 로봇 데이터에서 video 목적과 action 목적으로 함께 fine-tuning했다. 약 21M 파라미터 policy로 CALVIN ABC→D 분할에서 평균 완료 subtask 3.06/5를 기록했는데, 같은 표의 이전 방법들은 평균 1.0 미만에 머물렀다. 2026년 기준으로 수치 자체는 낡았고, 남는 것은 video 예측이 더 나은 시각 인코더가 아니라 더 나은 policy 표현을 만든다는 발견이다. R3M과 Voltron이 이미 video와 언어가 로보틱스 표현 학습에 도움이 된다는 것을 보였지만, GR-1은 그 대상을 이미지 수준 표현에서 policy 표현으로 옮겼다.

현대판이 DreamZero다. Wan 2.1-I2V-14B-480P에서 시작해 video diffusion backbone을 joint world-action model로 바꾼다. 하나의 monolithic DiT 안에서 video 토큰과 action 토큰을 나란히 디노이징하며 별도 inverse dynamics 모듈을 두지 않는다. 즉 action은 같은 디노이징 과정 안의 또 하나의 생성 모달리티로 다뤄진다.

| 설계 선택 | GR-1 (2024) | DreamZero (2026) |
|---|---|---|
| 주요 아이디어 | 미래 프레임 예측을 보조 목적으로 두고 action을 학습 | 미래 video와 로봇 action을 하나의 video diffusion backbone에서 함께 디노이징 |
| backbone | video 예측 readout 토큰을 둔 GPT-2 계열 Transformer policy | 로봇 제어용으로 적응시킨 Wan 2.1-I2V-14B-480P |
| 규모 | 약 21M policy 파라미터. pre-training된 시각 인코더와 언어 인코더는 분리 | 14B Wan backbone을 end-to-end로 action 튜닝 |
| 생성 목적 | 미래 video와 action에 대한 L2 재구성 | joint 미래 video와 action 생성에 대한 flow matching 계열 디노이징 |
| latent video VAE | 없음. pre-training된 MAE/ViT 시각 feature 사용 | Wan의 latent video VAE 상속 |
| 언어 조건화 | CLIP | Wan에서 상속한 T5 계열 텍스트 인코더 |

두 모델은 joint prediction이라는 핵심 아이디어만 공유하고 나머지는 거의 전부 다르다. 따라서 이 대비를 깨끗한 통제 비교로 읽어서는 안 된다. 같은 흐름 주변에 GR-2와 Seer, PAD, UWM, UVA, DreamVLA가 있다. PAD는 하나의 joint 디노이징 과정 안에서 미래 이미지 예측과 로봇 action 생성을 함께 시도한 초기 사례이고, UWM은 video와 action에 독립적인 noise를 써서 joint Transformer 안에서 더 유연한 추론 모드를 지원한다.

### representation-only 계열

representation-only 계열은 video backbone을 표현 추출에만 쓰고 추론 시점의 video 생성을 완전히 건너뛴다. 대표 사례가 Fast-WAM으로, LingBot-VA와 비슷한 Wan 계열 MoT 구성을 쓰면서 16,000시간 대규모 로봇 pre-training 없이도 시뮬레이션 벤치마크에서 그 성능에 근접한다. 추론 시점에 video 생성을 생략하기 때문에 속도도 수 배 빨라진다.

다만 저자는 이 가설을 뒷받침하는 공개 증거가 Fast-WAM 정도로 얇고 현재의 시뮬레이션 증거만으로는 설득되지 않는다고 명시한다. 오늘날 대부분의 WAM은 추론 시점에도 어떤 형태로든 video 생성을 유지하며 그만큼 느리다. 따라서 Fast-WAM처럼 빠른 WAM은 앞으로 더 큰 연구 영역이 될 것이라는 전망을 덧붙인다.

### action이 모델에 들어가는 방식

pre-training된 backbone이 할 줄 아는 일은 시각 토큰 디노이징까지이고 연속적인 로봇 action은 모른다. 이 모달리티 불일치를 어떻게 메우느냐가 두 번째 기준이 된다. 현재 논문들에서 관찰되는 방식은 세 가지다.

가장 단순한 기본값은 action 토큰과 action 헤드를 덧붙여 action을 video 옆에 놓인 또 하나의 모달리티로 다루는 방식이다. 토큰은 연속형일 수도 이산형일 수도 있다. UniPi와 GR-1, DreamZero, LingBot-VA, VPP, mimic-video, Fast-WAM이 모두 이 방식의 변형을 쓴다. 위험은 모달리티 불일치 그 자체다. action chunk는 backbone이 pre-training에서 본 시각 토큰과 성격이 다르므로, 모델이 action fine-tuning 구간에서 표현을 다시 맞춰야 한다.

두 번째는 action-as-image다. 새 action 토큰이나 별도 action 헤드를 만드는 대신, action을 같은 생성 인터페이스 안의 시각적 목표로 인코딩해 pre-training된 video 표현을 흔들지 않는 접근이다. 초기 조상은 GENIMA로, Stable Diffusion을 fine-tuning해 RGB 이미지 위에 관절 목표를 그리게 하고 컨트롤러가 그 시각적 목표를 관절 위치 action으로 옮긴다. 현대판인 Cosmos Policy는 action과 proprioception과 value function 목표를 video 모델 자신의 디노이징 인터페이스 안쪽 합성 latent 프레임으로 인코딩한다. 추론 시점에는 예측된 action 이미지를 공간 차원으로 평균 내 action 벡터로 디코딩한다.

세 번째는 action을 latent plan이나 latent action으로 압축하는 방식이다. 전체 video 예측은 비싸고 대부분의 픽셀은 제어에 필요하지 않다는 문제의식에서 출발한다. 두 개념은 정확히 같지는 않고 세밀도와 감독 경로에서 갈린다. plan은 보통 여러 스텝 구간을 덮고 짝지어진 로봇 데이터를 요구하는 반면, Genie나 LAPA 계열의 latent action은 라벨 없는 video에서 학습할 수 있다.

- Play-LMP (2019): 사후 네트워크가 짧은 trajectory 창을 latent plan으로 압축하고, 사전 네트워크가 현재 observation과 목표 이미지에서 그 plan을 맞히며, low-level policy가 샘플된 plan을 action으로 디코딩한다. 오늘날의 대규모 로봇 데이터셋과 pre-training된 모델이 없던 시절에 이미 이 구조를 갖췄다.
- Genie (2024): 라벨 없는 인터넷 video에서 latent action 토큰을 학습해 action 조건부 world model을 구동할 수 있음을 보였다. 다만 그 latent을 실제 모터 명령으로 디코딩하지 않으므로 로봇 policy는 아니다.
- LAPA (2025): 같은 latent action pre-training을 VLA 계열 로봇 학습 쪽으로 밀어붙였다.
- Being-H0.7 (2026): Play-LMP의 사전과 사후 논리를 foundation model 규모로 옮겼다. 사후 분기는 미래 observation을 동결된 V-JEPA 2.1 시각 인코더와 Perceiver 리샘플러로 K개 임베딩까지 압축하고, 사전 분기는 학습 가능한 latent 질의로 그 상태를 맞히도록 학습한다. 테스트 시점에는 사후 분기를 제거해 전체 video 시퀀스를 다시 생성하지 않고도 policy가 쓸 빠른 latent 인터페이스만 남긴다. action 생성부는 flow matching policy다.

| 설계 선택 | Play-LMP (2019) | Being-H0.7 (2026) |
|---|---|---|
| 주요 아이디어 | 짧은 로봇 행동 구간을 latent plan으로 압축해 low-level policy를 조건화 | 대규모 1인칭 human video와 로봇 시연 데이터로 latent world-action 모델을 학습 |
| 데이터 원천 | 로봇 play 데이터와 시연 trajectory | 1인칭 human video 20만 시간에 로봇 시연 데이터 1만 5천 시간 |
| 아키텍처 | hierarchical latent plan policy, LSTM low-level 디코더 | latent world-action 모델링을 위한 대형 MoT Transformer |
| latent 변수 | trajectory 수준 latent plan, 사전과 사후 학습 | 같은 사전과 사후 구조를 foundation model 규모로 |
| policy 인터페이스 | 사전 plan을 예측하고, observation과 목표로 조건화된 low-level policy가 실행 | 두 분기를 함께 학습하고, 테스트 시점에는 사전 분기만 압축 latent 인터페이스로 실행 |

핵심 차이는 latent 변수 자체가 아니다. Play-LMP가 이미 사전과 사후 latent plan이라는 아이디어를 갖고 있었고, Being-H0.7은 그 인터페이스를 현대 WAM과 VLA hybrid 안에서 어떻게 확장할 수 있는지를 보여준다. 최근에는 DreamDojo처럼 대규모 1인칭 human video에서 연속 latent action을 학습해 제어 가능한 world model을 만드는 사례도 나왔다. inverse dynamics와의 결정적 차이는 감독 경로다. inverse dynamics WAM은 시각 전이가 모터 명령으로 어떻게 매핑되는지 배우려고 짝지어진 video와 action 데이터를 필요로 하는 반면, latent action 방식은 video 자체에서 행동 추상화를 먼저 배운 뒤 나중에 로봇 action과 연결한다.

### 구성 요소를 묶는 방식

세 번째 기준인 architecture는 앞의 두 기준과 대체로 직교한다. inverse dynamics는 hierarchical일 수도 MoT 형태일 수도 있고, joint prediction은 monolithic일 수도 전문가 기반일 수도 있다.

| 구성 | 결합 강도 | 장점 | 한계 | 사례 |
|---|---|---|---|---|
| hierarchical | 약함. 정보가 한 방향으로만 흐른다 | action 헤드가 완전히 모듈이라 단순 CNN 회귀기부터 완전한 VLA 스택까지 교체 가능 | video와 action이 서로 강하게 영향을 주어야 하는 상황에 부적합 | UniPi, VPP, mimic-video, Pi-0.7 |
| monolithic Transformer | 강함. 한 스택에서 video와 action을 함께 디노이징 | 두 흐름의 결합이 강하고, action-as-image 구성과 자연스럽게 맞는다 | 같은 가중치가 조밀한 시각 토큰과 훨씬 희소한 action 목표를 함께 감당해야 한다 | DreamZero, Cosmos Policy |
| Mixture-of-Transformers | 중간. 가중치는 분리하고 attention은 공유 | 모듈성과 결합 사이의 실용적 절충 | 전문가별 가중치만큼 파라미터가 늘어난다 | Pi-0, Pi-0.5, LingBot-VA, Fast-WAM |

MoT는 현대 VLA와 최근 WAM 양쪽에서 이미 기본값이다. 저자는 모듈성과 결합 사이의 절충이라는 실용적 이유로 WAM 쪽에서도 MoT 계열 설계가 지배적 아키텍처가 되리라 전망한다.

### 모델별 설계 선택 비교

다음 표는 앞의 세 기준에 backbone과 연도를 더해 모델별 설계 선택을 모은 것이다. 저자는 WAM 공간이 빠르게 움직이고 있어 이 표가 선별된 일부일 뿐이라고 단서를 단다.

| 모델 | paradigm | action integration | backbone | architecture | 연도 |
|---|---|---|---|---|---|
| Play-LMP | WAM 이전 | latent plan | Transformer + LSTM (from scratch) | hierarchical | 2019 |
| UniPi | inverse dynamics | 기본 action 토큰 | CNN video diffusion (1.7B) | hierarchical | 2023 |
| GR-1 | joint prediction | 기본 action 토큰 | Transformer (from scratch) | 단일 Transformer | 2024 |
| GENIMA | inverse dynamics | action-as-image | Stable Diffusion / ControlNet | hierarchical (이미지 생성 + 컨트롤러) | 2024 |
| Seer | inverse dynamics | 기본 action 토큰 | 시각과 action 토큰을 함께 처리하는 Transformer | 단일 Transformer | 2025 |
| VPP | inverse dynamics | 기본 action 토큰 | Stable Video Diffusion | hierarchical | 2025 |
| mimic-video | inverse dynamics | 기본 action 토큰 | video diffusion (Cosmos) | hierarchical | 2025 |
| DreamZero | joint prediction | 기본 action 토큰 | video diffusion (Wan 14B) | monolithic DiT | 2026 |
| LingBot-VA | inverse dynamics | 기본 action 토큰 | video diffusion (Wan 2.2-5B) | MoT | 2026 |
| Cosmos Policy | joint prediction | action-as-image | video diffusion (Cosmos) | monolithic DiT | 2026 |
| Being-H0.7 | joint prediction (latent) | latent plan과 latent action | MoT Transformer (from scratch, 20만 시간 + 1만 5천 시간 데이터) | MoT | 2026 |
| Fast-WAM | representation-only | 기본 action 토큰 | video diffusion (Wan 5.5B) | MoT | 2026 |

### WAM이 지금 부상한 이유

아이디어 자체는 새롭지 않았고, 필요한 도구가 늦게 따라왔다는 것이 저자의 답이다. UniPi와 GR-1과 Play-LMP는 각각 inverse dynamics와 joint prediction과 latent 추상화의 방향을 이미 갖고 있었지만 backbone이 작았고 video 데이터가 약했으며 공개된 video foundation model이 없었고 스텝별 action 헤드가 현대 action chunk policy에 비해 잘 동작하지 않았다.

세 가지가 바뀌었다.

- video backbone이 훨씬 강해졌다. Wan과 Cosmos 같은 DiT 기반 모델이 더 나은 시간 압축과 flow matching 목적과 잘 정제된 웹 규모 video 데이터를 들고 이전 CNN 스택을 대체했다.
- 그 backbone이 공개됐다. 연구자가 pre-training 비용을 직접 치르는 대신 강력한 pre-training된 video 모델을 fine-tuning할 수 있게 됐다.
- action 쪽도 따라왔다. 작은 스텝별 MLP 헤드 대신 Transformer나 flow matching 헤드로 action chunk를 예측하는 방식이 표준이 됐다.

## 결과

### Veo 3.1 정성 점검

action 헤드를 붙이기 전에 프런티어 video 모델이 이미 무엇을 아는지 확인하려고 저자 팀은 간단한 실험을 했다. DROID 셋업에서 진행된 RoboArena 토스터 과제의 원본 rollout에서 컨텍스트 프레임 한 장을 뽑아 Google의 Veo 3.1에 주고, 토스터 레버를 누른 다음 왼쪽에 있는 오렌지를 집으라고 프롬프트했다. 앞쪽은 원본 DROID 시연 데이터와 일치하는 참조 과제이고, 뒤쪽은 시연 데이터 밖의 합성 확장이다. 프롬프트 최적화 없는 원샷 시도다.

![[assets/reuss-2026-pretrained-to-imagine-fine-tuned/fig07.webp]]
*Figure 5: Veo 3.1이 zero-shot으로 생성한 참조 과제 rollout. 로보틱스 fine-tuning을 전혀 거치지 않은 모델의 출력이다 (Reuss 2026, Figure 5).*

로봇 policy로 학습되지 않은 모델치고 결과는 좋은 편이다. 생성된 동작은 부드럽고 배경은 안정적으로 유지되며, 로봇은 두 목표물을 향해 그럴듯한 trajectory를 그린다. 레버를 먼저 끝내고 오렌지로 이동하는 순서까지 지켜졌다.

한계도 그만큼 뚜렷하다. 모델은 토스터 레버를 끝까지 누르지 못하고 일부 구간에서는 반대로 위로 당기려 든다. 더 눈에 보이는 문제는 형상 쪽이다. 원본 DROID 셋업의 핀치 그리퍼가 네 손가락 손으로 변형되고, 고정 베이스 로봇 팔이 컨텍스트 프레임 직후 자유도가 더 적은 다른 로봇으로 재해석된다. 이런 결함은 모델이 특정 하드웨어를 충실히 모델링하기보다 넓은 시각 사전 지식을 쓰고 있다는 신호다.

저자는 이 결과를 통제된 실험이 아니라 사전 지식에 대한 정성적 점검으로만 읽으라고 선을 긋는다. 해당 video가 Veo의 pre-training 데이터에 들어 있을 가능성은 낮지만 학습 셋을 직접 확인할 수는 없기 때문이다. 그럼에도 이 실험은 video backbone이 로보틱스에 매력적인 이유를 보여준다. 즉 제어에 쓸 만큼 신뢰할 수는 없어도 로봇과 물체의 상호작용이 어떤 모습이어야 하는지에 대한 유용한 사전 지식은 이미 갖고 있다. WAM fine-tuning은 그 zero-shot 상상을 신뢰할 수 있는 제어로 바꾸려는 시도다.

### RoboArena 실세계 평가

실세계 신호는 RoboArena에서 나온다. RoboArena는 개방형 언어 조건 과제로 generalist 로봇 policy를 평가하는 분산 실세계 벤치마크다. 대부분의 논문이 여전히 LIBERO 같은 시뮬레이션 벤치마크에 기대고 있어, 공개된 실세계 개방형 평가라는 점이 이 스냅샷의 가치다.

![[assets/reuss-2026-pretrained-to-imagine-fine-tuned/kr13.jpg]]
*Figure 16: 2026년 4월 RoboArena 리더보드 스냅샷. DreamZero가 1750으로 Pi-0.5의 1622를 앞선다 (Reuss 2026, Figure 16, 한국어 판 재게시본).*

| 모델 | 계열 | 점수 |
|---|---|---|
| DreamZero | WAM (joint prediction) | 1750 |
| Pi-0.5 | VLA (co-training) | 1622 |
| Pi-FAST | VLA (이산 action 토큰) | 1592 |
| Pi-0 | VLA (flow matching) | 1475 |

이 표는 두 가지를 보여준다. 첫째, DreamZero가 Pi-0.5를 128점 앞섰다. 저자는 이를 WAM이 더 나은 기본값이라는 증명이 아니라 가능성에 대한 긍정적 신호로 읽으라고 하면서도, DreamZero가 추가 대규모 cross-embodiment 학습 단계 없이 DROID만으로 학습됐다는 점을 특기한다.

둘째, Pi-FAST가 Pi-0을 117점 앞섰다. 두 모델은 backbone이 같고 DROID로 fine-tuning된 것도 같으며 action 생성 방식만 다르다. Pi-FAST는 flow 컴포넌트 없이 이산 FAST 토큰으로 action을 만든다. 따라서 이 격차는 이산 action tokenization이 원래의 flow matching 구성보다 pre-training된 능력을 더 잘 보존한다는 견해를 뒷받침한다.

### 시뮬레이션 견고성 비교

WAM과 VLA를 같은 조건에서 비교한 초기 연구로 Zhang et al.의 견고성 분석이 있다. LingBot-VA와 Cosmos Policy와 Pi-0.5를 LIBERO-Plus와 RoboTwin 2.0-Plus 위에 올려 같은 교란 조건으로 평가했다. 결과는 WAM이 VLA 베이스라인이 쓰는 넓은 학습 데이터 혼합 없이도 강한 견고성에 도달할 수 있다는 쪽으로 나왔다. 다만 비교는 시뮬레이션 환경에 한정되며 실세계 일반화는 다루지 않는다.

### 학습 연산량

video 사전 지식은 공짜가 아니다. 강한 video 사전 지식은 일부 설정에서 로보틱스 데이터 요구량을 줄여주지만, 실무에서는 로봇 데이터 효율을 연산 비용과 맞바꾸는 결과가 된다. 저자는 조밀 Transformer 하한 추정식 `C ≈ 6 × N × T`를 쓴다. N은 학습되는 조밀 파라미터 수이고 T는 처리한 토큰 수다. 정밀한 예산이 아니라 논문끼리 자릿수를 견주기 위한 어림값이다.

단위 감각을 위해 저자는 1 ZFLOP을 10의 21제곱 FLOP으로 정의하고, BF16 기준 H100 최대 처리량에 약 30% 활용률을 가정해 1 ZFLOP을 대략 936 H100-시간으로 환산한다.

![[assets/reuss-2026-pretrained-to-imagine-fine-tuned/kr21.png]]
*Figure 24: 학습 레시피별 조밀 코어 연산량 하한 추정. 로그 스케일 ZFLOP 단위다 (Reuss 2026, Figure 24, 한국어 판 재게시본).*

| 항목 | 무엇을 세는가 | 추정 | 주의점 |
|---|---|---|---|
| VLA Foundry action 단계 | pre-training된 Foundry VLM 위의 마지막 VLA 학습 단계만 | 약 0.56 ZFLOP | 파라미터 1.65B, 샘플 1억 240만 개, 샘플당 약 549 토큰. LLM과 VLM pre-training은 미포함 |
| Pi-FAST DROID action 튜닝 | FAST 계열 VLA의 대표적 DROID fine-tuning 실행 | 약 0.77 ZFLOP | 24만 스텝 기준. 현재 공개 설정인 10만 스텝이면 같은 토큰 가정에서 약 0.32 ZFLOP |
| VLA Foundry 전체 경로 | 언어 pre-training과 VLM 학습과 action 학습 전체 | 약 6.9 ZFLOP | 8,000억 토큰 LLM 단계가 대부분을 차지한다. 1B에서 2B 규모의 공개 레시피이며 프런티어 규모가 아니다 |
| DreamZero action 튜닝 | pre-training된 Wan-14B backbone의 downstream 적응만 | 약 8.6에서 9.0 ZFLOP | 10만 스텝, 배치 128, 시퀀스당 약 8,000에서 8,400 토큰. Wan 자체 제작 비용과 동결 인코더, VAE, 통신 비용은 제외 |
| MolmoAct2 스택에서 DROID까지 | Molmo2-ER에서 시작한 pre-training과 post-training과 DROID fine-tuning | 약 9.8 ZFLOP 상당 | 보고된 5,760 + 2,304 + 1,152 = 9,216 H100-시간을 환산. Molmo2-4B와 상류 Qwen3, SigLIP2 비용은 제외 |
| Wan-14B 풀 WAM 스택 | Wan 규모 video pre-training에 DreamZero식 튜닝을 더한 대리 추정 | 약 51 ZFLOP | Wan의 실제 pre-training 연산량이 공개되지 않아 Summer-22B의 토큰 예산을 대리값으로 쓴 것이다 |
| Summer-22B video pre-training | from scratch video 모델의 보고된 데이터 규모 | 약 66 ZFLOP | 22B 파라미터에 약 5,000억 video 토큰. 논문이 보고한 FLOP 총합이 아니라 투명한 재추정 |
| UniPi from scratch | Imagen Video 세대 CNN video diffusion | 약 167 ZFLOP | 약 15만 6천 H100-시간. CNN은 해상도와 프레임 수에 따라 연산이 급격히 늘어 Transformer 공식과 다른 계산이 필요하다 |

이 표를 읽을 때 주의할 대목은 DreamZero 행이다. 약 9 ZFLOP은 Wan backbone을 만드는 값이 아니라 그 위에 action을 학습시키는 값이다. 환산하면 약 8,400 H100-시간이 된다. backbone까지 직접 만들어야 한다면 대리 추정으로 51 ZFLOP까지 올라가고, 효율적인 VLA Foundry 레시피의 6.9 ZFLOP과 견주면 약 7.4배 차이가 난다.

차이가 나는 이유는 시퀀스 길이다. VLM 기반 VLA는 이미지 한두 장과 텍스트를 인코딩한 뒤 텍스트나 짧은 action 토큰 시퀀스를 예측하는 반면, WAM은 추가 action 토큰이 붙은 video latent 시퀀스를 예측한다. video 토큰 시퀀스는 VLA 시퀀스보다 대략 10배 길다. 따라서 같은 데이터셋으로 학습해도 WAM 쪽이 더 비싸다.

총 FLOP 말고도 하드웨어와 엔지니어링 장벽이 따라온다. 약 8,000 토큰 시퀀스를 다루는 14B 파라미터 모델은 상당한 GPU 메모리와 고속 인터커넥트를 갖춘 다중 노드 셋업을 요구한다. 여기에 데이터 필터링과 캡셔닝, video 디코딩, latent 전처리, 분산 입출력, 긴 시퀀스 DiT 인프라가 함께 필요하다.

데이터 품질 쪽에도 같은 구조의 부담이 있다. DreamZero는 video 생성이 강할수록 policy 성능도 강해진다고 주장한다. 따라서 WAM은 연산량만이 아니라 video 데이터 품질도 많이 요구하며, 필터링과 캡셔닝과 latent 표현과 생성적 pre-training이 모두 policy 레시피의 일부가 된다. 반면 VLM 기반 VLA에서는 같은 형태의 깔끔한 연결이 관찰되지 않는다. VLM4VLA는 VLM 초기화가 from scratch 학습보다 도움이 되지만 VLM의 일반적 능력은 downstream VLA 성능을 잘 예측하지 못한다고 보고한다.

### 추론 속도

제약은 학습 반대편에서도 온다. VLM 기반 VLA도 항상 빠르지는 않지만, 추론 시점에 video를 생성하는 기본형 WAM 셋업은 그보다 더 느릴 수 있다. 정확한 수치는 하드웨어와 구현과 디퓨전 스텝 수와 action chunk 길이에 따라 달라지는데, Fast-WAM이 제시한 대표값은 다음과 같다.

| 추론 모드 | action chunk당 지연 |
|---|---|
| WAM joint prediction (전체 video 생성 포함) | 590ms에서 800ms |
| WAM inverse dynamics (전체 video 생성 포함) | 590ms에서 800ms |
| Pi-0.5 | 약 190ms |

3배에서 4배 차이는 실시간 제어에서 작지 않다. 즉 같은 시간 안에 policy가 action을 갱신할 수 있는 횟수가 3분의 1에서 4분의 1로 줄어든다. DreamZero 논문과 Fast-WAM의 video 생성 생략 방식처럼 속도를 올리는 방법이 있지만, 대형 GPU 없이 이 모델들을 로컬에서 실행하는 것은 여전히 어렵다.

## 현대 VLA 베이스라인

video backbone이 더 나은 기본값이라는 주장은 현재의 최신 VLA 레시피를 넘어야 성립한다. 저자가 정리한 현대 VLA 베이스라인은 네 가지 요소의 조합이다.

- 이산 action tokenization. action tokenization은 연속값인 제어 명령을 정해진 구간으로 나눠 이산 토큰으로 바꾸는 기법이다. FAST와 BEAST가 대표적이다.
- VLM 능력을 보존하는 co-training. VLM 데이터와 로보틱스 데이터를 함께 학습에 넣는다.
- 분리된 action 헤드. flow matching 헤드의 그래디언트를 VLM 쪽으로 흘리지 않는다.
- 훨씬 넓어진 데이터 혼합.

아키텍처는 이미 하나로 수렴했다. MoT 레시피는 Transfusion이 비전 쪽에서 도입했고 Pi-0가 로보틱스에서 대중화했다. 그 뒤 달라진 것은 대부분 학습 레시피다. 초기 flow 기반 action 헤드는 이산 next-token pre-training에서 연속 action 디노이징으로 넘어가는 구간에 강한 교란을 일으켰고, 최근 레시피들은 그 교란을 줄이는 방향으로 설계된다.

교란의 원인은 최적화 목표의 긴장이다. VLM은 cross-entropy 손실로 이산 next-token prediction을 학습한 모델인 반면, 로봇 action은 보통 flow matching으로 모델링되는 연속 공간에 있다. 따라서 VLM을 flow matching 목적으로 그대로 fine-tuning하면 pre-training된 언어 능력과 비전 능력에 catastrophic forgetting이 일어난다. 이산 action tokenization을 쓴 co-training은 VLM을 자신이 선호하는 이산 공간에 가깝게 두면서 embodied 제어에 유용한 표현을 학습하게 하고, flow matching 헤드는 그 feature를 조건으로 자기 몫의 action 예측을 맡는다. 별도 action 헤드를 둔 시스템은 테스트 시점에 느린 autoregressive action 토큰 예측 경로를 생략할 수 있다는 이점도 얻는다.

Pi-0.5 계열은 여기에 VLM 데이터와 로보틱스 데이터의 co-training을 더하고 VLM과 flow 컴포넌트 사이의 그래디언트를 분리해 수렴을 빠르고 안정적으로 만든다. 같은 패턴이 Xiaomi-robotics-0과 Being-H0.5에서도 관찰된다. RoboArena에서 Pi-0.5가 Pi-FAST와 Pi-0을 모두 앞선 결과는 이런 학습 설계 결정이 policy 성능에 실제로 중요하다는 것과 부합한다.

이런 개선에도 VLA는 여전히 grounding 벽에 부딪힌다. 언어는 행동의 목표를 표현하기에 불충분하게 지정된 수단이다. 어수선한 장면에서 텍스트 지시문 하나로는 관련 물체 인스턴스나 원하는 물리적 상태를 특정하기 어렵고, 그 결과 policy는 배경 물체 같은 허위 상관이나 데이터셋 편향에 과적합될 수 있다. Pi-0.7이 보고한 언어 단독 프롬프트와 목표 이미지 조건화 사이의 격차가 이 관점을 뒷받침한다. subgoal image는 subtask가 끝난 직후의 장면을 그린 목표 이미지인데, 이를 주면 지시 따르기가 개선되고 학습 수렴도 빨라진다. 같은 RoboArena 스냅샷에서 DreamZero가 1750을 기록한 것도 시각적 목표 사전 지식이 이 문제에 도움이 된다는 또 하나의 논거다.

## 수렴 전망

### hybrid의 초기 신호

저자는 두 경로가 장기적으로 구분된 채 남을지 자체가 열린 질문이라고 본다. 이미 일부 VLA는 목표 따르기를 개선하려고 world model 계열 컴포넌트를 쓰고 있고, 많은 WAM은 action expert를 위해 VLA의 MoT 레시피를 빌려 쓴다.

![[assets/reuss-2026-pretrained-to-imagine-fine-tuned/kr22.jpg]]
*Figure 25: VLA 계열과 WAM 계열, 그리고 둘을 결합하는 세 번째 보편 경로로의 수렴 가능성 (Reuss 2026, Figure 25, 한국어 판 재게시본).*

Motus와 BagelVLA가 그 첫 신호다. 언어와 video 중 무엇을 로보틱스의 주 표현으로 삼을지 결정하는 대신 하나의 모델이 전부 하도록 학습시킨다. 구성은 이해 담당 VLM 컴포넌트와 video 생성 컴포넌트와 action expert 셋으로, 각 타워가 전용 가중치를 가지면서 공유 self-attention으로 정보를 주고받는다. attention 패턴은 비대칭인 경우가 많아 타워마다 다른 정보를 노출할 수 있다.

![[assets/reuss-2026-pretrained-to-imagine-fine-tuned/fig11.webp]]
*Figure 26: Motus 계열 hybrid 구성. video 모델링과 action 생성을 별도 Transformer가 맡되 attention과 텍스트 조건화를 공유해 VLA와 WAM을 하나의 policy 레시피로 잇는다 (Reuss 2026, Figure 26).*

같은 hybrid의 hierarchical 버전이 Physical Intelligence의 Pi-0.7이다. high-level policy가 subtask 지시문을 내면 BAGEL 기반 world model이 그것을 subgoal image로 바꾸고, action expert가 현재 observation과 그 subgoal image를 함께 조건으로 실행한다. 보고된 ablation은 world model subgoal이 복잡한 참조 과제에서 지시 따르기를 개선하고, 데이터셋 편향을 깨야 하는 일부 과제에서는 subgoal 없는 변형이 실패한다고 밝힌다. 저자들은 subgoal image가 학습 속도도 크게 높인다고 보고하는데, action 예측이 현재 프레임과 원하는 미래 프레임 사이의 inverse dynamics 문제에 가까워지기 때문이다.

산업 쪽 사례로는 Sereact의 Cortex 2.0이 있다. 시각 latent 공간에서 후보 미래 trajectory를 생성하고 예상 진행도와 위험과 효율로 점수를 매긴 뒤, 가장 높은 점수의 rollout을 조건으로 실행을 진행한다. WAM 계열의 예측 능력이 배포된 manipulation 시스템 안에서 계획 층으로 자리잡는 신호에 해당한다.

foundation model 규모의 hybrid로는 Being-H0.7이 가장 뚜렷하다. pre-training된 VLA인 Being-H0.5 위에 세운 latent plan 계열 모델로, InternVL3.5를 이해 전문가로, Qwen3를 action expert로, V-JEPA 2.1을 시각 인코더로 쓴다. VLA 계열의 pre-training된 컴포넌트와 V-JEPA 2.1 미래 observation 임베딩, Play-LMP 계열의 사전과 사후 latent 인터페이스, flow matching action policy를 한 모델 안에 결합한 구성이다.

이런 통합 시스템이 아직 소수인 주된 이유는 연산 비용이다. 강한 VLM을 학습시키는 것만으로도 이미 비싼데 그 위에 대규모 video 모델링을 더하면 비용이 겹으로 늘어난다. 따라서 VLA 계열 학습과 WAM 계열 학습을 나눠 진행하는 구도는 당분간 유용하게 남는다. 연산 한계 때문이기도 하고, 어떤 요소가 로보틱스에 가장 중요한지 아직 모르기 때문이기도 하다.

### 네 번째 경로

네 번째 가능성은 robotics-first foundation model이다. 웹 VLM이나 video 생성기에서 출발해 나중에 action을 붙이는 대신, embodiment와 action과 접촉이 풍부한 상호작용과 embodied 기억을 처음부터 pre-training의 중심에 놓고 설계한 대형 Transformer를 뜻한다.

저자가 아는 가장 깨끗한 사례는 Generalist AI의 GEN-1으로, UMI 계열 웨어러블 데이터 50만 시간으로 pre-training한 대형 로봇 행동 모델이다. 이 방향의 핵심 문제는 접근성이다. 자금이 충분한 스타트업과 대기업 밖에서는 이 규모의 사람 데이터나 로봇 데이터에 접근할 수 있는 곳이 거의 없다. 따라서 대규모 오픈소스 로보틱스 데이터가 나오기 전까지 이 경로는 커뮤니티 쪽에 사실상 닫혀 있다.

직교하는 방향으로 V-JEPA 2 계열의 latent world model도 있다. pre-training된 latent 공간 안에서 동역학을 직접 학습해, diffusion 기반 video 생성보다 저렴한 rollout과 빠른 추론과 더 깨끗한 계획 신호를 약속한다. VLA-JEPA와 Being-H0.7이 이 방향의 첫 WAM 사례로 유망한 성능을 보고한다.

## 한계

저자가 짚는 한계는 다섯 가지다.

- 깨끗한 비교가 아직 없다. 논문마다 video backbone이 다르고 대규모 pre-training 양이 제각각이며 하이퍼파라미터와 평가 셋업까지 갈린다. 저자가 세 기준으로 정리한 표조차 빠르게 움직이는 공간의 선별된 일부라는 단서를 달고 나온다.
- 비용이 두 방향에서 걸린다. 총 FLOP에 더해 약 8,000 토큰 시퀀스를 다루는 14B 모델용 다중 노드 셋업과 데이터 필터링과 캡셔닝과 긴 시퀀스 DiT 인프라를 함께 갖춰야 한다. video 데이터 품질 요구까지 policy 레시피 안으로 들어온다.
- 추론이 느리다. 추론 시점에 video latent을 생성하거나 디노이징하는 policy는 단순 VLA보다 훨씬 느리고, 긴 video 토큰 시퀀스가 GPU 메모리와 통신과 데이터 적재를 함께 압박한다.
- 평가가 풀리지 않았다. 논문 대부분이 여전히 LIBERO 같은 시뮬레이션에 기대고 있다. 저자는 벤치마크 점수만 올리는 방식을 어렵게 만들고 제대로 된 일반화를 요구하는 RoboLab과 MolmoSpaces 같은 평가가 더 나와야 한다고 본다.
- 명령에서 동작까지의 간극이 여전히 열려 있다. 이산 action tokenization과 VLM 보존 co-training과 넓은 데이터 혼합을 갖춘 현대 VLA도 이 간극을 완전히 닫지 못했다. WAM은 video 쪽에서 공략하겠다고 약속하지만 현재 결과가 그것을 해결했다고 보이지는 않는다.

여기에 저자 스스로 붙인 단서가 하나 더 있다. WAM을 지지하는 세 가지 근거는 여러 논문과 동료 논의와 저자 본인의 판단에서 반복되는 주장일 뿐 아직 짝지어진 통제 비교로 검증되지 않았고, 정성적 직관과 시뮬레이션 증거와 몇 건의 초기 실세계 신호에 기대고 있다.

이 페이지 자체의 자료 한계도 하나 적어 둔다. 원문 도식 상당수가 inline SVG로 삽입되어 있어 원본 수집 과정에서 이미지 파일로 내려받히지 않았다. 따라서 설계 공간 도식과 두 계열의 추상 구조와 RoboArena 리더보드와 연산량 비교와 수렴 도식 여섯 장은 같은 글의 한국어 판 아카이브에서 재게시본을 가져왔다. 해당 파일의 원본은 `raw/articles/9bow-2026-world-action-model-rise-figures/`에 있다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| WAM (world-action model) | video backbone에서 출발해 미래 장면 변화와 action을 함께 다루는 policy 계열. 이 글이 제안하는 분류 이름이다 |
| video backbone | 웹 규모 video로 pre-training한 생성 모델. Wan과 Cosmos 같은 공개 DiT 기반 모델이 현대 WAM의 출발점이다 |
| inverse dynamics | 현재 observation과 미래 observation 사이를 만든 action을 되짚는 문제 |
| joint prediction | 하나의 policy가 미래 observation과 action을 같은 예측 단계에서 함께 내놓는 방식 |
| representation-only | video backbone을 표현 추출에만 쓰고 추론 시점의 video 생성을 건너뛰는 구성. Fast-WAM이 대표 사례다 |
| latent action | 라벨 없는 video에서 배운 action 추상화. 짝지어진 video와 action 데이터를 요구하는 inverse dynamics와 감독 경로가 다르다 |
| MoT (Mixture-of-Transformers) | 모달리티별로 가중치를 나누되 self-attention은 공유하는 구조. mixture-of-experts가 라우팅으로 전문가를 고르는 것과 달리 모달리티로 전문가를 가른다 |
| ZFLOP | 10의 21제곱 FLOP. VLA와 WAM의 학습 비용을 같은 잣대에 올릴 때 쓰는 단위이며, 1 ZFLOP은 대략 936 H100-시간이다 |

## 한국어 판

PyTorch KR 운영자 박정환(9bow)이 옮긴 전문 번역이 나와 있다. 절 구조와 수치를 그대로 따르고 글 앞에 용어풀이 상자가 붙는다. 원문 도식 23개가 모두 재게시돼 있어서 이 페이지에 실은 도식 여섯 장도 그 아카이브에서 가져왔다. 다만 번역은 policy를 "정책", world model을 "월드 모델"로 옮기는 등 이 wiki의 canonical 표기와 다르므로 인용할 때는 바꿔 적는다. <!-- lint-terms: ignore, 번역 표기 자체를 인용하는 줄 -->

- 원문: [Pretrained to Imagine, Fine-Tuned to Act](https://developer.nvidia.com/blog/pretrained-to-imagine-fine-tuned-to-act-the-rise-of-world-action-models/) (NVIDIA Technical Blog, 2026-06-15)
- 한국어 판: [World Action Model의 부상](https://discuss.pytorch.kr/t/world-action-model-feat-nvidia/10769) (PyTorch KR, 2026-06-18). source는 `9bow-2026-world-action-model-rise.md`

## 관련 페이지

- [[physical-ai/wu-2023-unleashing-large-scale-video-generative]]: 이 글이 joint prediction 계열의 출발점으로 드는 GR-1 논문. 인터넷 video로 프레임 예측을 배운 뒤 같은 모델에 action 출력을 더한다.
- [[physical-ai/hou-2026-world-model-for-robot-learning]]: 저자가 본문에서 직접 가리키는 NTU 서베이. 로보틱스 world model 전반을 시뮬레이션과 평가와 내비게이션과 자율주행까지 넓게 조망한다.
- [[physical-ai/li-2025-a-comprehensive-survey-on-world]]: embodied AI world model 서베이. WAM을 world model 계보 안에 놓고 볼 때의 배경이다.
- [[physical-ai/black-2025-pi05-a-vision-language-action-model-with]]: RoboArena에서 DreamZero의 상대이자 VLA 쪽 현재 기준선.
- [[physical-ai/black-2024-pi0-a-vision-language-action-flow-model]]: MoT와 flow matching action expert 레시피의 출처. WAM 쪽이 그대로 빌려 쓴다.
- [[physical-ai/xu-2025-an-anatomy-of-vision-language-action-models]]: VLA 구성 요소와 milestone 정리. 이 글이 기존 레시피라 부르는 쪽의 지도다.
- [[physical-ai/kim-2026-silicon-valley-rfm-part-2]]: 로봇 foundation model 흐름을 국내 시각으로 정리한 글.
- [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation]]: 같은 NVIDIA 계열의 VLA foundation model.
- [[overviews/physical-ai-overview]]: physical-ai 카테고리의 분류 뼈대와 학습 경로 허브.
