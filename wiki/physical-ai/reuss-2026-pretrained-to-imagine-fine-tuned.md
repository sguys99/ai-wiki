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
  - id: fig01
    file: assets/reuss-2026-pretrained-to-imagine-fine-tuned/fig01.webp
    raw: raw/articles/reuss-2026-pretrained-to-imagine-fine-tuned-figures/fig01.webp
    caption: "visuomotor policy 도식 — 언어 지시와 현재 observation이 들어가 action 묶음이 나온다"
    strategy: fetched
    curated: false
  - id: fig02
    file: assets/reuss-2026-pretrained-to-imagine-fine-tuned/fig02.webp
    raw: raw/articles/reuss-2026-pretrained-to-imagine-fine-tuned-figures/fig02.webp
    caption: "world model 도식 — 현재 상태와 action 추상화가 들어가 미래 이미지나 latent이 나온다"
    strategy: fetched
    curated: false
  - id: fig03
    file: assets/reuss-2026-pretrained-to-imagine-fine-tuned/fig03.webp
    raw: raw/articles/reuss-2026-pretrained-to-imagine-fine-tuned-figures/fig03.webp
    caption: "generalist manipulation policy를 향한 두 갈래 베팅 — VLM 기반 VLA와 video backbone 기반 WAM"
    strategy: fetched
    curated: true
  - id: fig04
    file: assets/reuss-2026-pretrained-to-imagine-fine-tuned/fig04.webp
    raw: raw/articles/reuss-2026-pretrained-to-imagine-fine-tuned-figures/fig04.webp
    caption: "로보틱스 world model 지형도 — action 조건부 world model과 video world model이 겹치는 자리에 WAM이 있다"
    strategy: fetched
    curated: true
  - id: fig05
    file: assets/reuss-2026-pretrained-to-imagine-fine-tuned/fig05.webp
    raw: raw/articles/reuss-2026-pretrained-to-imagine-fine-tuned-figures/fig05.webp
    caption: "Veo 3.1 실험에 쓴 DROID 토스터 과제의 컨텍스트 프레임"
    strategy: fetched
    curated: false
  - id: fig06
    file: assets/reuss-2026-pretrained-to-imagine-fine-tuned/fig06.webp
    raw: raw/articles/reuss-2026-pretrained-to-imagine-fine-tuned-figures/fig06.webp
    caption: "같은 과제의 실제 DROID rollout — 로봇이 토스터 레버를 누른다"
    strategy: fetched
    curated: false
  - id: fig07
    file: assets/reuss-2026-pretrained-to-imagine-fine-tuned/fig07.webp
    raw: raw/articles/reuss-2026-pretrained-to-imagine-fine-tuned-figures/fig07.webp
    caption: "Veo 3.1이 zero-shot으로 만든 레버 누르기 rollout"
    strategy: fetched
    curated: false
  - id: fig08
    file: assets/reuss-2026-pretrained-to-imagine-fine-tuned/fig08.webp
    raw: raw/articles/reuss-2026-pretrained-to-imagine-fine-tuned-figures/fig08.webp
    caption: "Veo 3.1의 합성 확장 rollout — 레버를 누른 뒤 오렌지를 집으라는 지시"
    strategy: fetched
    curated: false
  - id: fig09
    file: assets/reuss-2026-pretrained-to-imagine-fine-tuned/fig09.gif
    raw: raw/articles/reuss-2026-pretrained-to-imagine-fine-tuned-figures/fig09.gif
    caption: "합성 확장 시퀀스 전체 애니메이션 (GIF)"
    strategy: fetched
    curated: false
  - id: fig10
    file: assets/reuss-2026-pretrained-to-imagine-fine-tuned/fig10.webp
    raw: raw/articles/reuss-2026-pretrained-to-imagine-fine-tuned-figures/fig10.webp
    caption: "UniPi 구조 — 텍스트 조건부 video 생성기가 미래 프레임을 만들고 별도 inverse dynamics 모듈이 action을 뽑는다"
    strategy: fetched
    curated: false
  - id: fig11
    file: assets/reuss-2026-pretrained-to-imagine-fine-tuned/fig11.webp
    raw: raw/articles/reuss-2026-pretrained-to-imagine-fine-tuned-figures/fig11.webp
    caption: "Motus 계열 hybrid 구성 — video 모델링과 action 생성을 별도 Transformer가 맡되 attention과 텍스트 조건화를 공유한다"
    strategy: fetched
    curated: false
  - id: fig12
    file: assets/reuss-2026-pretrained-to-imagine-fine-tuned/page-full.png
    raw: raw/articles/reuss-2026-pretrained-to-imagine-fine-tuned-figures/page-full.png
    caption: "원문 페이지 전체 스크린샷"
    strategy: screenshot
    curated: false
  - id: kr05
    file: assets/reuss-2026-pretrained-to-imagine-fine-tuned/kr05.jpg
    raw: raw/articles/9bow-2026-world-action-model-rise-figures/fig05.jpg
    caption: "WAM 설계 공간 한눈에 보기 — paradigm·action integration·architecture 세 축"
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
    caption: "2026년 4월 RoboArena 리더보드 — DreamZero 1750, Pi-0.5 1622"
    strategy: fetched
    from_source: 9bow-2026-world-action-model-rise
    curated: true
  - id: kr21
    file: assets/reuss-2026-pretrained-to-imagine-fine-tuned/kr21.png
    raw: raw/articles/9bow-2026-world-action-model-rise-figures/fig21.png
    caption: "학습 레시피별 조밀 코어 연산량 비교 — 로그 스케일 ZFLOP"
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

## 요약 (Summary)

NVIDIA Seattle Robotics Lab의 Moritz Reuss가 그린 World-Action Model 지형도다. WAM은 world-action model의 약자다. 대규모 영상으로 pre-training한 video backbone에서 시작해 장면이 앞으로 어떻게 변할지 내다보면서 거기 맞는 action까지 내놓는 policy를 이렇게 부른다.

2025년 10월 State of VLA 글만 해도 저자는 WAM을 VLA의 작은 하위 갈래로 적어 두었다. 몇 달 만에 그 판단을 바꿔야 했다. 이 글의 주장은 WAM이 VLM 기반 VLA와 나란한 두 번째 레시피가 된다는 쪽이다. 어떤 형태가 이길지는 아직 열려 있고 최종 승자로는 둘의 hybrid를 유력하게 꼽는다.

## 두 갈래 베팅 (Two Representation Bets)

지금 로봇 foundation model 판에는 표현을 놓고 벌이는 큰 베팅이 두 개 있다. 하나는 VLM backbone에서 출발하는 기존 VLA 레시피다. 나머지 하나는 pre-training된 video backbone을 generalist manipulation의 새 경로로 쓴다. 뒤쪽에 NVIDIA의 DreamZero와 Cosmos Policy, Ant Group의 LingBot-VA, Rhoda AI의 DVA, Sereact의 Cortex 2.0, Mimic Robotics의 mimic-video가 몰려 있다.

![[assets/reuss-2026-pretrained-to-imagine-fine-tuned/fig03.webp]]
*generalist manipulation policy를 향한 두 갈래 베팅인 VLM 기반 VLA와 video backbone 기반 WAM (Reuss 2026)*

backbone을 무엇으로 잡느냐에 따라 학습 레시피와 데이터 혼합부터 추론 최적화까지 파이프라인 전체가 따라온다. 이만한 모델을 대규모로 돌리는 비용을 생각하면 팀 대부분은 둘 중 하나를 먼저 정해 놓고 가야 한다.

![[assets/reuss-2026-pretrained-to-imagine-fine-tuned/fig04.webp]]
*로보틱스 world model 지형도에서 WAM은 action 조건부 world model과 video world model이 겹치는 자리에 있다 (Reuss 2026)*

## 왜 WAM인가 (The Grounding Gap)

grounding은 "빨간 머그컵을 집어라" 같은 기호를 그 말을 실제로 만족시키는 지각·운동 대상에 붙이는 일이다. VLM 기반 VLA는 인터넷 규모 이미지-텍스트로 pre-training한 backbone에서 출발한다. 걸림돌은 VLM pre-training과 embodied manipulation 사이의 도메인 격차다. 격차가 크니 이 연결은 결국 제한된 로봇 데이터 안에서 배울 수밖에 없다. 그 과정에서 성능이 깎이는 현상을 VLM2VLA는 catastrophic forgetting이라 불렀다. Knowledge Insulation은 flow matching action expert의 그래디언트를 VLM backbone에서 떼어내는 쪽으로 구조를 손봤다. 그래도 언어를 물리적 action으로 잇는 문제 자체는 그대로 남는다.

WAM은 출발점을 바꿔 이 문제를 우회한다. video 생성 모델은 텍스트를 시각적 결과로 매핑하도록 학습되고 그 영상에는 손이 뻗고 도구가 움직이는 장면이 이미 가득하다. 베팅은 "영상에서 action으로" 건너가는 거리가 "언어에서 action으로"를 처음부터 배우는 거리보다 짧으리라는 쪽에 걸린다.

근거는 저자가 가설이라고 분명히 밝힌 세 항목이다. 미래 변화 예측이 필요한 action 생성과 상관관계가 있다는 것, video pre-training이 언어와 물리적 변화 사이의 grounding을 대준다는 것, 웹 규모 영상이 작은 로봇 데이터셋에 대한 과적합을 눌러준다는 것. 셋 어느 쪽도 통제된 비교로 검증되지는 않았다.

가능성을 눈으로 확인하려고 저자 팀은 DROID 토스터 과제의 프레임 한 장을 Veo 3.1에 넣고 레버를 누른 뒤 왼쪽 오렌지를 집으라고 프롬프트했다. 움직임은 부드럽고 배경도 흔들리지 않으며 두 목표물을 순서대로 처리했다. 반면 레버를 끝까지 누르지 못하고 DROID의 핀치 그리퍼가 네 손가락 손으로 변형되기도 한다. 저자는 이를 통제된 실험이 아니라 사전 지식에 대한 정성적 점검으로 읽으라고 단서를 단다.

## 설계 공간 세 축 (Design Space)

VLA는 "VLM co-training + flow matching action 생성"으로 대체로 수렴했다. WAM은 아직 여러 형태로 갈라져 있다. 저자는 이 공간을 세 축으로 정리한다. 축이 서로 완전히 독립은 아니다.

![[assets/reuss-2026-pretrained-to-imagine-fine-tuned/kr05.jpg]]
*paradigm·action integration·architecture 세 축으로 본 WAM 설계 공간 (Reuss 2026, 한국어 판 재게시본)*

### 무엇을 예측하는가

inverse dynamics 계열은 미래를 먼저 상상해 놓고 그 영상에서 action을 거꾸로 읽어낸다. inverse dynamics 자체는 현재 observation과 k스텝 뒤 observation이 주어졌을 때 그 사이를 만든 action 묶음을 추론하는 문제다. 이렇게 짜면 어려운 언어 grounding이 video 단계로 넘어가고 action 헤드는 되짚기 하나에만 매달리면 된다.

![[assets/reuss-2026-pretrained-to-imagine-fine-tuned/kr06.jpg]]
*inverse dynamics 계열 WAM의 추상 구조 (Reuss 2026, 한국어 판 재게시본)*

이 레시피를 현대적으로 처음 구현한 사례가 2023년 UniPi다. 지금 그 자리는 LingBot-VA가 채운다. Wan 2.2-5B를 16,000시간 cross-embodiment 학습으로 돌려 로봇 video-action 모델로 바꾼 결과물이다. 차이는 규모에 그치지 않는다. 긴 시각 이력을 causal하게 학습해 폐쇄 루프 rollout까지 노린다. video 전문가와 action 전문가는 공유 self-attention으로 묶는 Mixture-of-Transformers에 올렸다.

joint prediction 계열은 미래 영상과 action을 한 번에 뽑는다. 출발점인 GR-1은 약 21M 파라미터 policy로, 인터넷 영상 예측 pre-training을 거친 뒤 로봇 데이터에서 video 목적과 action 목적을 함께 걸어 CALVIN ABC→D 3.06/5를 냈다. 수치는 낡았다. 남는 것은 영상이 더 나은 시각 인코더가 아니라 더 나은 policy 표현을 만든다는 발견이다.

![[assets/reuss-2026-pretrained-to-imagine-fine-tuned/kr09.jpg]]
*joint prediction 계열 WAM의 추상 구조 (Reuss 2026, 한국어 판 재게시본)*

현대판이 DreamZero다. Wan 2.1-I2V-14B-480P에서 시작해 monolithic DiT 하나 안에서 video 토큰과 action 토큰을 나란히 디노이징한다. inverse dynamics 모듈을 따로 두지 않는다. action도 같은 디노이징 과정에 얹힌 또 하나의 생성 모달리티로 들어간다.

나머지 하나가 representation-only다. video backbone은 표현을 뽑는 데만 쓰고 추론 시점의 video 생성은 건너뛴다. 이 자리를 지키는 모델이 Fast-WAM인데 16,000시간 로봇 pre-training 없이도 시뮬레이션에서 LingBot-VA 수준에 다가선다. 이 가설을 뒷받침하는 공개 증거가 아직 얇다고 저자는 짚는다.

### action이 모델에 들어가는 방식

pre-training된 backbone이 할 줄 아는 일은 시각 토큰 디노이징까지다. 연속적인 로봇 action은 모른다. 이 모달리티 불일치를 어떻게 메우느냐가 두 번째 축이 된다.

기본값은 action 토큰과 헤드를 덧붙여 action을 영상 옆에 놓인 또 하나의 모달리티로 두는 방식이다. UniPi·GR-1·DreamZero·LingBot-VA·VPP·mimic-video·Fast-WAM이 전부 여기 속한다. 다음 갈래는 action을 video 모델이 이미 아는 형태로 바꿔 준다. GENIMA는 Stable Diffusion을 fine-tuning해 RGB 이미지 위에 관절 목표를 그린다. Cosmos Policy는 action과 proprioception과 value 목표를 video 모델 자신의 디노이징 인터페이스 안쪽 합성 latent 프레임에 인코딩한다. 마지막 갈래는 action을 latent plan이나 latent action으로 압축한다. 원형은 2019년 Play-LMP의 사전/사후 구조이고 Being-H0.7이 그 인터페이스를 foundation model 규모로 끌어올렸다. Being-H0.7의 학습 데이터는 20만 시간 1인칭 인간 영상과 1만 5천 시간 로봇 시연이다.

### 구성 요소를 묶는 방식

hierarchical 구성이 가장 유연하다. action 헤드가 완전히 모듈이라 단순 CNN 회귀기부터 완전한 VLA 스택까지 갈아 끼울 수 있다. 정보가 한 방향으로만 흐르는 점은 장점이면서 동시에 한계다. monolithic Transformer는 video와 action 디노이징을 한 스택에 몰아넣어 결합을 세게 만들지만 같은 가중치가 조밀한 시각 토큰과 훨씬 희소한 action 목표를 한꺼번에 감당해야 한다. Mixture-of-Transformers가 그 사이의 절충이다. 모달리티별로 가중치는 나누되 attention은 공유한다. Pi-0·Pi-0.5 같은 현대 VLA도, LingBot-VA·Fast-WAM도 모두 이 구조다. 저자는 WAM 쪽에서도 MoT가 주류가 되리라 전망한다.

아이디어 자체는 새롭지 않았다. "왜 지금인가"에 저자는 도구가 늦게 따라왔을 뿐이라고 답한다. Wan·Cosmos 같은 DiT 기반 모델이 이전 CNN 스택을 밀어냈고 그 backbone이 공개되면서 pre-training 비용을 직접 치를 일이 없어졌다. action 쪽도 스텝별 MLP 헤드에서 action chunking 헤드로 옮겨 왔다.

## 결과 (Results)

실세계 신호는 RoboArena에서 나온다. 2026년 4월 스냅샷 기준으로 DreamZero가 1750을 찍어 Pi-0.5의 1622를 넘었고 그 아래로 Pi-FAST 1592, Pi-0 1475가 이어진다. 눈에 띄는 대목은 학습 조건이다. DreamZero는 추가 cross-embodiment 학습 없이 DROID만으로 학습됐다.

![[assets/reuss-2026-pretrained-to-imagine-fine-tuned/kr13.jpg]]
*2026년 4월 RoboArena 리더보드 — DreamZero 1750, Pi-0.5 1622 (Reuss 2026, 한국어 판 재게시본)*

같은 표에서 Pi-FAST가 Pi-0을 앞선 것도 읽을거리다. 둘은 backbone을 공유하고 action 생성 방식만 갈린다. 이산 action 토큰화 쪽이 flow matching 구성보다 pre-training된 능력을 더 잘 보존한다는 견해를 뒷받침하는 결과다.

시뮬레이션 쪽 비교는 Zhang et al.이 맡았다. LingBot-VA·Cosmos Policy·Pi-0.5를 LIBERO-Plus와 RoboTwin 2.0-Plus에 나란히 올려 같은 교란 조건으로 돌렸다. WAM이 VLA 베이스라인의 넓은 데이터 혼합 없이도 견고성에 닿을 수 있다는 쪽으로 결과가 나왔다. 시뮬레이션에 한정되며 실세계 일반화는 다루지 않는다.

## 연산량과 추론 속도라는 실전 제약

video 사전 지식은 공짜가 아니다. 로봇 데이터 효율을 연산 비용과 맞바꾸는 셈이다. 저자는 조밀 Transformer 하한 추정 `C ≈ 6 × N × T`를 써서 ZFLOP 단위로 환산한다. 정밀한 예산은 아니고 논문끼리 견주기 위한 어림값이다.

![[assets/reuss-2026-pretrained-to-imagine-fine-tuned/kr21.png]]
*학습 레시피별 조밀 코어 연산량 비교 — 로그 스케일 ZFLOP (Reuss 2026, 한국어 판 재게시본)*

| 항목 | 무엇을 세는가 | 추정 |
|---|---|---|
| VLA Foundry 소형 from-scratch | 언어 pre-training + VLM + action 학습 전체 | 약 6.9 ZFLOP |
| DreamZero action 튜닝 | Wan-14B backbone의 downstream 적응만 | 약 8.6~9.0 ZFLOP |
| MolmoAct2 VLA 스택 → DROID | 보고된 전체 | 약 9.8 ZFLOP 상당 |
| Wan-14B 풀 WAM 스택 | video pre-training + DreamZero식 튜닝 | 약 51 ZFLOP |
| Summer-22B video pre-training | 22B를 약 500B video 토큰으로 from-scratch | 약 66 ZFLOP |
| UniPi from-scratch | Imagen Video 세대 CNN video diffusion | 약 167 ZFLOP |

읽을 때 주의할 대목이 하나 있다. DreamZero의 약 9 ZFLOP은 Wan backbone을 만드는 값이 아니라 그 위에 action을 입히는 값이다. 1 ZFLOP이 대략 936 H100-시간이니 약 8,400 H100-시간쯤 된다. backbone까지 직접 만들면 51 ZFLOP으로 뛴다. 효율적인 VLA 레시피의 6.9 ZFLOP과 견주면 약 7.4배 차이다. UniPi 시절의 167 ZFLOP이 사실상 감당할 수 없는 비용이었던 것과 같은 구도다. 공개 video backbone에서 출발해 이 단계를 건너뛸 수 있게 되면서 상황이 달라졌다.

제약은 반대편에서도 온다. 추론 속도다. Fast-WAM이 내놓은 대표값을 보면 video 생성을 함께 돌리는 두 추론 모드가 action chunk당 590~800ms, Pi-0.5가 약 190ms다. 실시간 제어에서 3~4배 차이는 작지 않다. 총 FLOP 말고도 약 8k 토큰 시퀀스를 다루는 14B 모델용 다중 노드 셋업, 데이터 필터링과 캡셔닝, 긴 시퀀스 DiT 인프라가 나란히 따라붙는다.

## 하이브리드 전망 (Convergence)

저자는 승자를 고르지 않는다. 이미 world model 계열 컴포넌트를 얹은 VLA가 있고 action expert를 위해 VLA의 MoT 레시피를 빌려 쓰는 WAM도 많다.

![[assets/reuss-2026-pretrained-to-imagine-fine-tuned/kr22.jpg]]
*VLA 계열과 WAM 계열이 둘을 합치는 세 번째 경로로 수렴할 가능성 (Reuss 2026, 한국어 판 재게시본)*

Motus와 BagelVLA에서는 이해 컴포넌트와 video 생성 컴포넌트와 action expert가 attention을 공유한다. Pi-0.7은 hierarchical 버전으로, BAGEL 기반 world model이 만든 시각 subtask 이미지에 action expert를 조건화한다. Sereact의 Cortex 2.0은 후보 미래 trajectory를 만들어 진행도·위험·효율로 점수 매긴 뒤 실행을 고르는 산업 쪽 사례다.

네 번째 가능성으로 robotics-first foundation model도 있다. 웹 VLM이나 video 생성기에서 출발해 나중에 action을 붙이는 대신 embodiment와 접촉이 풍부한 상호작용을 처음부터 중심에 놓고 짠 대형 Transformer다. Generalist AI의 GEN-1이 50만 시간 UMI 계열 웨어러블 데이터를 들고 이 길로 갔다. 병목은 데이터 접근성이다. 대규모 오픈 로보틱스 데이터가 풀리기 전까지 커뮤니티 쪽에는 닫혀 있는 경로다.

저자가 남은 과제로 꼽는 것은 셋이다. 명령에서 동작까지의 간극은 여전히 열려 있다. 로봇 벤치마킹에는 RoboLab·MolmoSpaces처럼 해킹이 어려운 평가가 더 있어야 한다. 다음 세대는 WAM과 VLA의 hybrid일 가능성이 높다.

## 한국어 판 (Korean Edition)

PyTorch KR 운영자 박정환(9bow)이 옮긴 전문 번역이 나와 있다. 절 구조와 수치를 그대로 따르고 글 앞에 용어풀이 상자가 붙는다. 원문 도식 23개가 모두 재게시돼 있어서 이 페이지에 실은 도식 여섯 장도 그 아카이브에서 가져왔다. 다만 번역은 policy를 "정책", world model을 "월드 모델"로 옮기는 등 이 wiki의 canonical 표기와 다르므로 인용할 때는 바꿔 적는다. <!-- lint-terms: ignore — 번역 표기 자체를 인용하는 줄 -->

- 원문: [Pretrained to Imagine, Fine-Tuned to Act](https://developer.nvidia.com/blog/pretrained-to-imagine-fine-tuned-to-act-the-rise-of-world-action-models/) (NVIDIA Technical Blog, 2026-06-15)
- 한국어 판: [World Action Model의 부상](https://discuss.pytorch.kr/t/world-action-model-feat-nvidia/10769) (PyTorch KR, 2026-06-18) — source는 `9bow-2026-world-action-model-rise.md`

## 관련 페이지 (Related Pages)

- [[physical-ai/wu-2023-unleashing-large-scale-video-generative]] — "미래를 상상하도록 pre-training하고 행하도록 fine-tuning한다"는 이 계보의 초기 사례. Ego4D 사람 영상으로 프레임 예측을 배운 뒤 같은 모델에 action 출력만 얹는다
- [[physical-ai/hou-2026-world-model-for-robot-learning]] — 저자가 본문에서 직접 가리키는 NTU 서베이. 로보틱스 world model 전반의 조망이다
- [[physical-ai/li-2025-a-comprehensive-survey-on-world]] — embodied AI world model 서베이. WAM을 world model 계보 안에 놓고 볼 때의 배경
- [[physical-ai/black-2025-pi05-a-vision-language-action-model-with]] — RoboArena에서 DreamZero의 상대이자 VLA 쪽 현재 기준선
- [[physical-ai/black-2024-pi0-a-vision-language-action-flow-model]] — MoT + flow matching action expert 레시피의 출처. WAM 쪽이 그대로 빌려 쓴다
- [[physical-ai/xu-2025-an-anatomy-of-vision-language-action-models]] — VLA 구성 요소와 milestone 정리. 이 글이 "기존 레시피"라 부르는 쪽의 지도
- [[physical-ai/kim-2026-silicon-valley-rfm-part-2]] — 로봇 foundation model 흐름을 국내 시각으로 정리한 글
- [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation]] — 같은 NVIDIA 계열의 VLA foundation model
- [[overviews/physical-ai-overview]] — 도메인 허브
