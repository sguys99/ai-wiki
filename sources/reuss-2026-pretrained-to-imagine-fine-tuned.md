---
title: "Pretrained to Imagine, Fine-Tuned to Act: The Rise of World-Action Models"
type: article
year: 2026
category: physical-ai
raw_path: raw/articles/reuss-2026-pretrained-to-imagine-fine-tuned.md
raw_filename: "reuss-2026-pretrained-to-imagine-fine-tuned.md"
source_collection: external
author: "Moritz Reuss"
url: "https://developer.nvidia.com/blog/pretrained-to-imagine-fine-tuned-to-act-the-rise-of-world-action-models/"
publisher: "NVIDIA Technical Blog"
publication_date: "2026-06-15"
tags: [physical-ai, world-model, vla, robot-learning]
figures:
  - id: fig01
    file: assets/reuss-2026-pretrained-to-imagine-fine-tuned/fig01.webp
    raw: raw/articles/reuss-2026-pretrained-to-imagine-fine-tuned-figures/fig01.webp
    caption: "visuomotor policy 도식. 언어 지시와 현재 observation이 들어가 action 묶음이 나온다"
    strategy: fetched
    curated: false
  - id: fig02
    file: assets/reuss-2026-pretrained-to-imagine-fine-tuned/fig02.webp
    raw: raw/articles/reuss-2026-pretrained-to-imagine-fine-tuned-figures/fig02.webp
    caption: "world model 도식. 현재 상태와 action 추상화가 들어가 미래 이미지나 latent이 나온다"
    strategy: fetched
    curated: false
  - id: fig03
    file: assets/reuss-2026-pretrained-to-imagine-fine-tuned/fig03.webp
    raw: raw/articles/reuss-2026-pretrained-to-imagine-fine-tuned-figures/fig03.webp
    caption: "generalist manipulation policy를 향한 두 가지 베팅, VLM 기반 VLA와 video backbone 기반 WAM"
    strategy: fetched
    curated: true
  - id: fig04
    file: assets/reuss-2026-pretrained-to-imagine-fine-tuned/fig04.webp
    raw: raw/articles/reuss-2026-pretrained-to-imagine-fine-tuned-figures/fig04.webp
    caption: "로보틱스 world model 지형도. action 조건부 world model과 video world model이 겹치는 자리에 WAM이 있다"
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
    caption: "같은 과제의 실제 DROID rollout. 로봇이 토스터 레버를 누른다"
    strategy: fetched
    curated: false
  - id: fig07
    file: assets/reuss-2026-pretrained-to-imagine-fine-tuned/fig07.webp
    raw: raw/articles/reuss-2026-pretrained-to-imagine-fine-tuned-figures/fig07.webp
    caption: "Veo 3.1이 zero-shot으로 만든 레버 누르기 rollout"
    strategy: fetched
    curated: true
  - id: fig08
    file: assets/reuss-2026-pretrained-to-imagine-fine-tuned/fig08.webp
    raw: raw/articles/reuss-2026-pretrained-to-imagine-fine-tuned-figures/fig08.webp
    caption: "Veo 3.1의 합성 확장 rollout. 레버를 누른 뒤 오렌지를 집으라는 지시"
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
    caption: "UniPi 구조. 텍스트 조건부 video 생성기가 미래 프레임을 만들고 별도 inverse dynamics 모듈이 action을 뽑는다"
    strategy: fetched
    curated: true
  - id: fig11
    file: assets/reuss-2026-pretrained-to-imagine-fine-tuned/fig11.webp
    raw: raw/articles/reuss-2026-pretrained-to-imagine-fine-tuned-figures/fig11.webp
    caption: "Motus 계열 hybrid 구성. video 모델링과 action 생성을 별도 Transformer가 맡되 attention과 텍스트 조건화를 공유한다"
    strategy: fetched
    curated: true
  - id: fig12
    file: assets/reuss-2026-pretrained-to-imagine-fine-tuned/page-full.png
    raw: raw/articles/reuss-2026-pretrained-to-imagine-fine-tuned-figures/page-full.png
    caption: "원문 페이지 전체 스크린샷"
    strategy: screenshot
    curated: false
---

## 한 줄 요약 (One-line Summary)

NVIDIA Seattle Robotics Lab의 Moritz Reuss가 그린 World-Action Model 지형도다. 글은 진단 하나에서 시작한다. VLM에서 출발하는 기존 VLA 레시피 옆에 두 번째 레시피가 자리를 잡는 중이고 그 출발점은 대규모 영상으로 pre-training한 video backbone이다. 설계 공간은 paradigm과 action integration과 architecture 세 가지 기준으로 갈리고 UniPi부터 DreamZero, LingBot-VA, Cosmos Policy, Being-H0.7까지가 그 위에 배치된다. 연산 비용과 추론 속도라는 실전 제약도 수치로 계산해 붙였다.

## 1. 자료 정보 (Document Information)

- 저자: Moritz Reuss (NVIDIA Seattle Robotics Lab 박사후연구원, 이전 KIT Rudolf Lioutikov 연구실)
- 발행: 2026-06-15, NVIDIA Technical Blog
- URL: https://developer.nvidia.com/blog/pretrained-to-imagine-fine-tuned-to-act-the-rise-of-world-action-models/
- 성격: 서베이형 기술 블로그다. 논문 형식은 아니고 저자 본인의 판단과 가설이 글 앞에 나온다. 저자 스스로도 여러 주장에 "결론이 아니라 가설"이라는 꼬리표를 붙인다.
- 같은 내용의 한국어 판이 PyTorch KR에 있다. `9bow-2026-world-action-model-rise`

WAM은 world-action model의 약자다. 대규모 영상으로 pre-training한 video backbone에서 출발해 장면이 시간에 따라 어떻게 변할지 표현하고 예측하면서 거기에 맞는 action까지 내놓는 policy를 부르는 말이다. 2025년 10월 State of VLA 글만 해도 저자는 WAM을 VLA의 작은 하위 분야로 적어 두었다. 몇 달 만에 그 판단을 바꿔야 했고 이 글은 그 자리에서 시작한다.

## 2. 주요 기여 (Key Contributions)

이 글이 wiki에서 갖는 값은 개별 모델 소개보다 지형도 자체에 있다.

- WAM을 VLA와 나란한 두 번째 레시피로 규정한다. 지금 떠오른 이유로는 도구의 성숙, 곧 공개된 DiT 기반 video backbone과 action chunking 헤드를 든다.
- 흩어져 있던 WAM 논문을 paradigm과 action integration과 architecture 세 가지 기준으로 갈라 표 하나에 모은다. 기준이 서로 완전히 독립은 아니라는 단서도 빼놓지 않는다.
- VLA와 WAM의 학습 연산량을 ZFLOP이라는 같은 잣대로 환산해 나란히 놓는다. 블로그 글에서 이만큼 수치를 붙이는 일은 드물다.
- 추론 속도라는 실전 병목도 수치로 짚는다. video 생성을 함께 실행하는 WAM은 action chunk당 590~800ms가 걸리고 Pi-0.5는 약 190ms다.
- 승자를 고르지는 않는다. 다음 세대로는 VLA와 WAM을 합친 hybrid를 유력하게 꼽는다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### grounding 문제가 출발점이다

grounding은 "빨간 머그컵을 집어라" 같은 기호를 그 말을 실제로 만족시키는 지각 대상과 운동 대상에 붙이는 일이다. VLM 기반 VLA는 인터넷 규모 이미지-텍스트로 pre-training한 backbone을 그대로 가져다 쓴다. 걸림돌은 VLM pre-training과 embodied manipulation 사이의 도메인 격차다. 격차가 크니 이 연결은 결국 제한된 로봇 데이터 안에서 배울 수밖에 없다. 그 과정에서 성능이 깎이는 현상을 VLM2VLA는 catastrophic forgetting이라 불렀다. Knowledge Insulation은 flow matching action expert의 그래디언트를 VLM backbone에서 떼어내 pre-training된 지식이 상하지 않게 구조를 손봤다. 그럼에도 언어를 물리적 action으로 잇는 문제 자체는 그대로 남는다.

WAM은 출발점 자체를 바꾸는 데 건다. video 생성 모델은 텍스트 설명을 시각적 결과로 매핑하라고 학습된다. 그 영상에는 손이 뻗고 도구가 움직이는, 의도를 가진 동작이 이미 가득하다. 그렇다면 "영상에서 action으로" 건너가는 거리가 "언어에서 action으로"를 처음부터 배우는 거리보다 짧을 수 있다.

저자 스스로 가설이라고 밝힌 항목이 셋 있다. 미래 변화 예측이 필요한 action 생성과 상관관계가 있다는 것, video pre-training이 언어와 물리적 변화 사이의 grounding을 대준다는 것, 웹 규모 영상이 작은 로봇 데이터셋에 대한 과적합을 눌러준다는 것. 셋 중 어느 것도 깨끗하게 통제된 비교로 검증되지는 않았다.

### Veo 3.1로 사전 지식을 눈으로 확인한다

action 헤드를 붙이기 전에 프런티어 video 모델이 이미 무엇을 아는지부터 봤다. 저자 팀은 DROID 토스터 과제의 컨텍스트 프레임 한 장을 Veo 3.1에 넣고 레버를 누른 뒤 왼쪽 오렌지를 집으라고 프롬프트했다. 프롬프트를 다듬지 않은 원샷 시도다. 잘된 쪽부터 보면 움직임이 부드럽고 배경도 흔들리지 않으며 두 목표물을 순서대로 처리했다. 안 되는 쪽도 있다. 레버를 끝까지 누르지 못하거나 위로 당기려 들고 DROID의 핀치 그리퍼가 네 손가락 손으로 변형되기도 한다. 저자는 이를 통제된 실험이 아니라 사전 지식에 대한 정성적 점검으로만 읽으라고 선을 긋는다.

### 무엇을 예측하는가

inverse dynamics 계열은 미래를 먼저 상상해 놓고 그 영상에서 action을 거꾸로 읽어낸다. inverse dynamics 자체는 현재 observation과 k스텝 뒤 observation이 주어졌을 때 그 사이를 만든 action 묶음을 추론하는 문제다. 이렇게 짜면 어려운 언어 grounding이 video 단계로 넘어가고 action 헤드는 되짚기 하나에만 매달리면 된다. 이 레시피를 현대적으로 처음 구현한 사례가 2023년 UniPi다. 지금 그 자리는 LingBot-VA가 채운다. Wan 2.2-5B를 16,000시간 cross-embodiment 학습으로 로봇 video-action 모델로 바꾼 결과물이다. UniPi와의 차이는 규모에 그치지 않는다. LingBot-VA는 긴 시각 이력을 causal하게 학습해 closed-loop rollout까지 노린다. video 전문가와 action 전문가는 공유 self-attention으로 묶는 Mixture-of-Transformers 구조에 올렸다.

joint prediction 계열은 미래 영상과 action을 한 번에 뽑는다. 출발점은 GR-1이다. 인터넷 영상 예측으로 pre-training한 GPT-2 계열 policy를 로봇 데이터에서 video 목적과 action 목적으로 함께 fine-tuning했다. 약 21M 파라미터 policy로 CALVIN ABC→D 평균 3.06/5를 냈다. 2026년 기준으로 수치 자체는 낡았다. 남는 것은 영상이 더 나은 시각 인코더가 아니라 더 나은 policy 표현을 만든다는 발견이다. 현대판은 DreamZero다. Wan 2.1-I2V-14B-480P에서 출발해 하나의 monolithic DiT 안에서 video 토큰과 action 토큰을 나란히 디노이징한다. 별도 inverse dynamics 모듈은 두지 않는다. action도 같은 디노이징 과정 속 또 하나의 생성 모달리티다.

나머지 하나가 representation-only다. video backbone은 표현을 뽑는 데만 쓰고 추론 시점의 video 생성은 건너뛴다. 여기 있는 모델이 Fast-WAM이다. LingBot-VA와 비슷한 Wan/MoT 구성을 쓰면서 16,000시간 로봇 pre-training 없이도 시뮬레이션에서 그 성능에 다가선다. 다만 이 가설을 뒷받침하는 공개 증거가 아직 얇다고 저자는 짚는다.

### action이 모델에 들어가는 방식

pre-training된 backbone이 할 줄 아는 일은 시각 토큰 디노이징까지다. 연속적인 로봇 action은 모른다. 이 모달리티 불일치를 어떻게 메우느냐가 두 번째 기준이 된다.

손쉬운 기본값부터 보자. action 토큰과 헤드를 덧붙여 action을 영상 옆에 놓인 또 하나의 모달리티로 취급하는 방식이다. UniPi와 GR-1, DreamZero, LingBot-VA, VPP, mimic-video, Fast-WAM이 전부 여기 속한다. 다음 방식은 action을 video 모델이 이미 아는 형태로 바꿔 준다. GENIMA에서는 fine-tuning한 Stable Diffusion이 RGB 이미지 위에 관절 목표를 그려 주고 컨트롤러가 그 그림을 관절 위치 action으로 옮긴다. Cosmos Policy는 action과 proprioception과 value 목표를 video 모델 자신의 디노이징 인터페이스 안쪽 합성 latent 프레임에 인코딩한다. 추론 시점에는 예측된 action 이미지를 공간 방향으로 평균 내 벡터로 디코딩한다.

마지막 방식은 action을 latent plan이나 latent action으로 압축하는 쪽이다. 뿌리는 2019년 Play-LMP까지 올라간다. 사후 네트워크가 짧은 trajectory 창을 latent plan으로 압축하고 사전 네트워크가 현재 observation과 목표 이미지에서 그 plan을 맞히는 구조를 그때 이미 갖췄다. Genie는 라벨 없는 인터넷 영상에서 latent action 토큰을 배울 수 있다는 것을 보여 줬다. Being-H0.7은 같은 사전/사후 논리를 foundation model 규모까지 밀어 올린다. 동결된 V-JEPA 2.1 인코더와 Perceiver 리샘플러가 미래 observation을 K개 임베딩까지 줄인다. 테스트 시점에는 사후 분기를 떼어낸다. 전체 video 시퀀스를 다시 생성하지 않고도 policy가 쓸 빠른 latent 인터페이스가 남는다. 학습 데이터는 20만 시간 1인칭 인간 영상과 1만 5천 시간 로봇 시연이다.

### 구성 요소를 묶는 방식

hierarchical 구성이 가장 유연하다. action 헤드가 완전히 모듈이라 단순 CNN 회귀기(UniPi)부터 완전한 VLA 스택(Pi-0.7)까지 무엇이든 갈아 끼울 수 있다. 정보가 한 방향으로만 흐르는 점은 장점이면서 동시에 한계다. monolithic Transformer는 DreamZero처럼 video와 action 디노이징을 한 스택에 몰아넣어 결합을 세게 만든다. 대신 같은 가중치가 조밀한 시각 토큰과 훨씬 희소한 action 목표를 한꺼번에 감당해야 한다. Mixture-of-Transformers가 그 사이의 절충이다. 모달리티별로 가중치는 나누되 attention은 공유한다. Pi-0와 Pi-0.5 같은 현대 VLA도, LingBot-VA와 Fast-WAM도 모두 이 구조다. 저자는 WAM 쪽에서도 MoT가 주류가 되리라 전망한다.

### 왜 하필 지금인가

아이디어는 새롭지 않았다. 도구가 늦게 따라왔을 뿐이라고 저자는 답한다. Wan과 Cosmos 같은 DiT 기반 모델이 더 나은 시간 압축과 flow matching 목적을 들고 이전 CNN 스택을 밀어냈다. 그 backbone들이 공개되면서 연구자가 pre-training 비용을 직접 치를 일이 없어졌다. action 쪽도 스텝별 MLP 헤드에서 action chunking 헤드로 옮겨 왔다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

실세계 신호는 RoboArena에서 나온다. 2026년 4월 스냅샷 기준으로 DreamZero가 1750을 찍어 Pi-0.5의 1622를 넘었고 그 아래로 Pi-FAST 1592, Pi-0 1475가 이어진다. 눈길이 가는 대목은 학습 조건이다. DreamZero는 추가 cross-embodiment 학습 단계 없이 DROID만으로 학습됐다. 같은 표에서 Pi-FAST가 Pi-0을 앞선다. 이산 action 토큰화가 flow matching 구성보다 pre-training된 능력을 더 잘 보존한다는 견해를 뒷받침하는 결과다.

연산량은 조밀 Transformer 하한 추정 `C ≈ 6 × N × T`로 환산했다. 정밀한 예산은 아니고 논문끼리 견주기 위한 어림값이다.

| 항목 | 무엇을 세는가 | 추정 |
|---|---|---|
| VLA Foundry 소형 from-scratch | 언어 pre-training + VLM + action 학습 전체 | 약 6.9 ZFLOP |
| DreamZero action 튜닝 | Wan-14B backbone의 downstream 적응만 | 약 8.6~9.0 ZFLOP |
| MolmoAct2 VLA 스택 → DROID | 보고된 전체 | 약 9.8 ZFLOP 상당 |
| Wan-14B 풀 WAM 스택 | video pre-training + DreamZero식 튜닝 | 약 51 ZFLOP |
| Summer-22B video pre-training | 22B를 약 500B video 토큰으로 from-scratch | 약 66 ZFLOP |
| UniPi from-scratch | Imagen Video 세대 CNN video diffusion | 약 167 ZFLOP |

읽을 때 주의할 대목이 하나 있다. DreamZero의 약 9 ZFLOP은 Wan backbone을 만드는 값이 아니라 그 위에 action을 입히는 값이다. 1 ZFLOP은 대략 936 H100-시간이니 약 8,400 H100-시간쯤 된다. backbone까지 직접 만들어야 한다면 51 ZFLOP으로 뛴다. 효율적인 VLA 레시피의 6.9 ZFLOP과 견주면 약 7.4배 차이다. UniPi 시절의 167 ZFLOP이 사실상 감당할 수 없는 비용이었던 것과 같은 구도다. 공개 video backbone에서 출발해 이 단계를 건너뛸 수 있게 되면서 상황이 달라졌다.

제약은 반대 방향에서도 온다. 추론 속도다. Fast-WAM이 제시한 대표값을 보면 video 생성을 함께 실행하는 두 추론 모드가 action chunk당 590~800ms, Pi-0.5가 약 190ms다. 실시간 제어에서 3~4배 차이는 작지 않다.

시뮬레이션 쪽 비교는 Zhang et al.이 맡았다. LingBot-VA와 Cosmos Policy와 Pi-0.5를 LIBERO-Plus와 RoboTwin 2.0-Plus에 나란히 올려 같은 교란 조건으로 평가했다. WAM이 VLA 베이스라인의 넓은 데이터 혼합 없이도 견고성에 닿을 수 있다는 쪽으로 결과가 나왔다. 시뮬레이션에 한정되고 실세계 일반화는 다루지 않는다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

깨끗한 비교가 아직 없다. 이 분야가 안고 있는 가장 큰 문제다. 논문마다 video backbone이 다르고 pre-training 양도 제각각인 데다 하이퍼파라미터와 평가 셋업까지 갈린다. 저자가 세 가지 기준으로 정리한 표조차 "빠르게 움직이는 공간의 선별된 일부"라는 단서를 달고 나온다.

비용은 두 방향에서 걸린다. 총 FLOP에 더해 약 8,000 토큰 시퀀스를 다루는 14B 모델용 다중 노드 셋업, 데이터 필터링과 캡셔닝, 긴 시퀀스 DiT 인프라까지 갖춰야 한다. DreamZero는 video 생성이 강할수록 policy도 강해진다고 주장한다. 그만큼 WAM은 video 데이터 품질도 많이 요구하는 모델이다.

평가 쪽도 아직 풀리지 않았다. 논문 대부분이 여태 LIBERO 같은 시뮬레이션에 기대고 있다. 저자가 더 나와야 한다고 짚는 쪽은 벤치마크 해킹을 어렵게 만드는 RoboLab과 MolmoSpaces 같은 평가다.

마지막으로 저자는 명령에서 동작까지의 간극이 여전히 열려 있다고 정리한다. 이산 action 토큰화와 co-training과 넓은 데이터 혼합을 갖춘 현대 VLA도 이 간극을 닫지 못했다. WAM은 영상 쪽에서 공략하겠다고 약속하지만 지금 나온 결과가 그것을 풀었다고 보이지는 않는다.

## 6. 관련 연구 (Related Work)

- Pi-0 / Pi-0.5 (Physical Intelligence): 비교 기준으로 삼는 VLA 레시피. RoboArena에서는 WAM의 상대로 서지만 MoT 구조와 flow matching action expert를 WAM 쪽에 빌려준 쪽이기도 하다.
- Pi-0.7: hybrid의 hierarchical 버전. BAGEL 기반 world model이 만든 시각 subgoal에 action expert를 조건화한다. 절제 실험에서 subgoal이 복잡한 참조 과제의 지시 따르기를 개선했다.
- World Model for Robot Learning 서베이 (Hou 2026): 저자가 본문에서 직접 가리키는 NTU 서베이. 로보틱스 world model 전반의 조망.
- Motus와 BagelVLA: 이해 컴포넌트와 video 생성 컴포넌트와 action expert가 attention을 공유하는 hybrid 첫 신호.
- Cortex 2.0 (Sereact): 후보 미래 trajectory를 만들고 진행도와 위험과 효율로 점수 매겨 실행을 고르는 산업 쪽 hybrid 사례.
- GEN-1 (Generalist AI): 네 번째 길인 robotics-first foundation model의 사례. 50만 시간 UMI 계열 웨어러블 데이터로 pre-training했다. 이 경로의 병목은 데이터 접근성이다.
- V-JEPA 2 / VLA-JEPA: diffusion 기반 video 생성보다 싼 rollout을 노리는 latent world model 방향.

## 7. 용어집 (Glossary)

- WAM (world-action model): video backbone에서 출발해 미래 장면 변화와 action을 함께 다루는 policy 계열을 묶어 부르는 이름. 이 글이 밀고 있는 분류 이름이다.
- video backbone: 웹 규모 영상으로 pre-training한 생성 모델. Wan과 Cosmos처럼 공개된 DiT 기반 모델이 현대 WAM의 출발점이다.
- inverse dynamics: 현재 observation과 미래 observation 사이를 만든 action을 되짚는 문제.
- joint prediction: 하나의 policy가 미래 observation과 action을 같은 예측 단계에서 한꺼번에 내놓는 방식.
- representation-only: video backbone을 표현 추출에만 쓰고 추론 시점의 video 생성은 건너뛰는 구성. Fast-WAM이 대표 사례.
- latent action: 라벨 없는 영상에서 배운 action 추상화. 짝지어진 video-action 데이터가 있어야 하는 inverse dynamics와는 감독 경로가 다르다.
- MoT (Mixture-of-Transformers): 모달리티별로 가중치를 나누되 self-attention은 공유하는 구조. mixture-of-experts가 라우팅으로 전문가를 고르는 것과 달리 모달리티로 전문가를 가른다.
- ZFLOP: 10^21 FLOP. VLA와 WAM의 학습 비용을 같은 잣대에 올릴 때 이 글이 쓰는 단위이고 1 ZFLOP은 대략 936 H100-시간이다.

## 8. 그림 후보 (Figure Candidates)

원문 도식은 약 24개인데 lazy loading 탓에 원본 다운로드로 내려받은 것은 11개뿐이다. 빠진 몫은 한국어 판 아카이브(`9bow-2026-world-action-model-rise-figures/`)에서 채우면 된다. 거기에는 23개가 온전히 들어와 있다. 같은 아카이브에 페이지 전체 스크린샷 1장과 요소 단위 크롭 51장도 함께 있다. 크롭 쪽은 관련 글 썸네일까지 섞여 있어 후보 표에서 뺐다. 전체 목록은 `figures.json`이 들고 있다.

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | visuomotor policy 도식 | fetched | (선택) |
| fig02 | world model 도식 | fetched | (선택) |
| fig03 | VLA와 WAM 두 가지 베팅 | fetched | ★ wiki 권장 (개념) |
| fig04 | 로보틱스 world model 지형도 | fetched | ★ wiki 권장 (개념) |
| fig05 | Veo 3.1 실험 컨텍스트 프레임 | fetched | (선택) |
| fig06 | DROID 실제 rollout | fetched | (선택) |
| fig07 | Veo 3.1 zero-shot rollout | fetched | ★ wiki 권장 (실험) |
| fig08 | Veo 3.1 합성 확장 rollout | fetched | (선택) |
| fig09 | 합성 확장 애니메이션 GIF | fetched | (아카이브) |
| fig10 | UniPi 구조 | fetched | (선택) |
| fig11 | Motus 계열 hybrid 구성 | fetched | ★ wiki 권장 (전망) |
| fig12 | 페이지 전체 스크린샷 | screenshot | (아카이브) |
