---
title: "03-13. Groot N1 - 모두의 로보틱스 - VLA 입문"
type: article
year: 2026
category: physical-ai
source: jo-2026-groot-n1-vla-primer.md
raw_path: raw/articles/jo-2026-groot-n1-vla-primer.md
raw_filename: "jo-2026-groot-n1-vla-primer.md"
source_collection: external
author: "조인령"
url: "https://wikidocs.net/366379"
publisher: "WikiDocs"
tags: [physical-ai, vla, robot-learning, humanoid, manipulation]
figures:
  - id: fig03
    file: assets/jo-2026-groot-n1-vla-primer/fig03.png
    raw: raw/articles/jo-2026-groot-n1-vla-primer-figures/fig03.png
    caption: "GR00T N1 전체 구조. 이미지와 언어는 VLM(System 2)으로, 그 출력과 robot state, action 토큰은 DiT(System 1)로 흘러 motor action이 된다. 저자가 robot state 입력에 빨간 테두리를 덧그렸다 (원 논문 Figure 2)"
    strategy: fetched
    curated: true
  - id: fig04
    file: assets/jo-2026-groot-n1-vla-primer/fig04.png
    raw: raw/articles/jo-2026-groot-n1-vla-primer-figures/fig04.png
    caption: "세부 구조도에서 System 2 영역만 빨간 테두리로 표시. vision encoder, text tokenizer, frozen Eagle-2 VLM (원 논문 Figure 3의 저자 주석 그림)"
    strategy: fetched
    curated: true
  - id: fig06
    file: assets/jo-2026-groot-n1-vla-primer/fig06.png
    raw: raw/articles/jo-2026-groot-n1-vla-primer-figures/fig06.png
    caption: "같은 구조도에서 System 1 영역 표시. DiT 블록과 embodiment별 action decoder (원 논문 Figure 3의 저자 주석 그림)"
    strategy: fetched
    curated: true
  - id: fig08
    file: assets/jo-2026-groot-n1-vla-primer/fig08.png
    raw: raw/articles/jo-2026-groot-n1-vla-primer-figures/fig08.png
    caption: "DiT 블록 확대. self-attention 두 곳에 빨간 테두리. robot state와 noised action이 서로를 참조하는 자리"
    strategy: fetched
    curated: true
  - id: fig09
    file: assets/jo-2026-groot-n1-vla-primer/fig09.png
    raw: raw/articles/jo-2026-groot-n1-vla-primer-figures/fig09.png
    caption: "같은 블록에서 cross-attention 두 곳에 빨간 테두리. VLM 출력 토큰이 들어오는 자리"
    strategy: fetched
    curated: true
  - id: fig13
    file: assets/jo-2026-groot-n1-vla-primer/fig13.png
    raw: raw/articles/jo-2026-groot-n1-vla-primer-figures/fig13.png
    caption: "저자가 직접 그린 flow matching 시각화. 빨간 화살표가 ground-truth vector, 파란 화살표 4개가 K=4로 나눠 이동하는 predicted flow"
    strategy: fetched
    curated: true
---

## 요약

GR00T N1(NVIDIA 2025)을 처음 읽는 사람을 위한 한국어 입문 해설이다. "모두의 로보틱스 - VLA 입문" 시리즈의 03-13편으로, 휴머노이드 로봇 데이터가 모이지 않는 이유에서 출발해 dual-system 구조, flow matching 손실과 추론, data pyramid와 latent action space를 차례로 다룬다.

해설의 성격은 도식을 쓰는 방식에서 드러난다. 본문 이미지 20장 가운데 절반 가까이가 원 논문 도식에 빨간 테두리를 덧그린 저자 주석 그림이다. 같은 구조도(원 논문 Figure 3)를 세 번 반복하면서 System 2 영역, System 1 영역, state encoder와 action encoder 입력부를 차례로 짚는다. 또한 flow matching 대목에는 원 논문에 없는 자작 시각화가 한 장 들어간다.

따라서 이 페이지는 원 논문의 축약본이 아니라 그 앞에 두는 진입로에 가깝다. 시뮬레이션 벤치마크 수치표와 데이터 생성 절차는 [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation]]에 정리되어 있으므로, 이 입문 페이지를 먼저 읽고 원 논문 페이지로 넘어가는 순서를 권한다.

## 배경

해설은 로봇 foundation model을 가로막는 장벽을 데이터 쪽 문제 두 가지로 좁혀 정의한다. foundation model은 여러 하위 과제의 기반이 되는 대규모 범용 모델이다. 두 장벽은 각각 절대적인 데이터 부족과 데이터 섬(Data Islands) 현상이다.

| 장벽 | 원인 | 결과 |
|---|---|---|
| 데이터 양의 한계 | 휴머노이드 데이터를 대규모로 확보하려면 값비싼 하드웨어와 작업자의 teleoperation이 필요하다 | 단일 하드웨어 환경만으로는 foundation model을 학습시킬 양이 나오지 않는다 |
| 데이터 섬 | 로봇마다 하드웨어 구조, 센서 종류, 관절 자유도(DoF), 제어 방식이 모두 다르다 | 한 로봇에서 수집한 데이터를 다른 로봇의 학습에 적용하기 어렵다 |

teleoperation은 사람이 로봇을 원격으로 움직여 시연 데이터(demonstration)를 만드는 방식이다. 즉 인터넷에서 대규모로 수집할 수 있는 텍스트나 이미지와 달리, 로봇 데이터는 하드웨어 비용과 사람의 조작 시간을 그대로 치러야 얻어진다.

두 번째 장벽은 첫 번째를 더 악화시킨다. 어렵게 모은 데이터조차 하드웨어가 다르면 재사용되지 않고 기종별로 고립되기 때문이다. GR00T N1의 구조적 선택 상당수가 이 고립된 섬들을 잇는 데 맞춰져 있다는 것이 이후 설명의 전제다.

## 핵심 개념

### dual-system 구조

GR00T N1은 로봇의 지능을 성격이 다른 두 모듈로 나눈다. 심리학자 대니얼 카너먼이 제시한 인지 처리 모델에서 이름을 빌려, 신중한 추론을 맡는 고차원 계획을 System 2로, 즉각 행동하는 저차원 제어를 System 1으로 부른다. dual-system VLA는 이처럼 느린 대형 모델과 빠른 경량 policy를 서로 다른 주기로 함께 실행하는 VLA 구조를 가리킨다.

policy는 현재 observation을 받아 다음 action을 정하는 함수를 말한다. 여기서 observation은 매 timestep에 policy가 받는 센서 입력이다.

두 모듈을 가르는 기준은 control frequency다. control frequency는 로봇이 1초에 몇 번 새로운 action을 갱신하는지를 뜻한다. System 2는 10Hz, System 1은 120Hz로 동작하므로, System 2가 상황을 한 번 판단하는 동안 System 1은 열두 번 새 동작을 만들어낸다.

해설은 구조도를 보여주기 전에 이 인지 모델을 먼저 설명한다. 그 덕분에 VLA를 처음 보는 독자도 뒤에 나오는 그림에서 두 모듈의 역할 분담을 바로 파악할 수 있다.

### flow matching과 embodiment

flow matching은 noise에서 데이터로 향하는 vector field를 학습해 샘플을 만드는 생성 기법이다. System 1은 무작위 noise에서 출발해 그 noise를 걷어내는 방향으로 이동하며 action을 만든다.

embodiment는 로봇의 물리적 형상과 그에 딸린 제어 구성을 뜻한다. 탁상 매니퓰레이터와 휴머노이드는 관절 수가 다르므로 상태와 action의 차원도 다르다. 따라서 하나의 가중치를 공유하려면 차원 차이를 흡수하는 층이 따로 필요하다.

### latent action

latent action은 두 프레임 사이의 시각적 변화를 action 라벨 없이 부호화한 벡터다. GR00T N1은 이 표현을 써서 action 라벨이 전혀 없는 사람 영상까지 같은 학습 손실 안으로 넣는다. 데이터 섬을 잇는 두 장치 가운데 하나가 여기서 나온다.

## 방법

### 전체 구조

![[assets/jo-2026-groot-n1-vla-primer/fig03.png]]
*Figure 2: GR00T N1 전체 구조. 이미지와 언어 지시는 VLM(System 2)으로 들어가고, 그 출력이 robot state, action 토큰과 함께 Diffusion Transformer(System 1)로 흘러 motor action이 된다. 빨간 테두리는 저자가 robot state 입력을 강조하려고 덧그린 것이다 (조인령 2026, 원 논문 Figure 2).*

| 구분 | System 2 | System 1 |
|---|---|---|
| 역할 | 시각과 언어를 해석해 상황을 판단한다 | 판단 결과를 받아 실제 motor action을 만든다 |
| 구성 | pre-training된 Eagle-2 VLM | Diffusion Transformer, flow matching으로 학습 |
| control frequency | 10Hz | 120Hz |
| 입력 | 카메라 이미지, 사용자의 언어 지시 | System 2 출력 토큰, robot state, noised action |
| 출력 | 중간 layer의 표현 토큰 | embodiment별 action chunk |

### System 2

System 2는 pre-training된 NVIDIA Eagle-2 VLM이다. Eagle-2는 SmolLM2 LLM과 SigLIP-2 이미지 인코더에서 fine-tuning한 모델이다. 이미지 토큰은 사용자의 언어 지시가 변환된 텍스트 토큰과 함께 LLM으로 전달된다.

동작 주기는 10Hz로 낮게 잡았다. 낮은 주기는 성능 손해가 아니라 설계 선택이다. 대형 VLM이 한 번 추론하는 데 걸리는 시간을 확보하기 위한 것이기 때문이다.

출력을 어디서 뽑는지가 눈에 띄는 선택이다. 보통 VLM은 가장 마지막 layer의 결과를 쓰지만, GR00T N1은 중간 단계인 12번째 layer의 결과를 쓴다. 근거는 두 가지로, 추론 속도가 빨라지고 과제 성공률도 더 높게 측정됐다는 점이다.

![[assets/jo-2026-groot-n1-vla-primer/fig04.png]]
*Figure 3-a: 세부 구조도에서 System 2 영역만 표시한 저자 주석 그림. vision encoder와 text tokenizer를 지나 frozen Eagle-2 VLM으로 들어가는 경로다 (조인령 2026, 원 논문 Figure 3).*

### System 1

System 1은 Diffusion Transformer 기반이고 flow matching으로 학습한다. 120Hz로 동작을 생성하므로 로봇이 움직이는 도중에도 즉각 반응할 수 있다.

embodiment마다 다른 상태와 action의 차원은 별도의 MLP 기반 encoder와 decoder가 흡수한다. 즉 차원이 서로 다른 매니퓰레이터와 휴머노이드가 하나의 System 1을 공유할 수 있게 해주는 층이다.

![[assets/jo-2026-groot-n1-vla-primer/fig06.png]]
*Figure 3-b: 같은 구조도에서 System 1 영역을 표시한 저자 주석 그림. DiT 블록과 embodiment별 action decoder가 여기 들어간다 (조인령 2026, 원 논문 Figure 3).*

입력은 두 경로로 들어온다. state encoder에는 데이터셋에 포함된 로봇의 물리적 상태 정보인 robot state가 들어가며, 관절 상태와 그리퍼 상태가 여기에 해당한다. action encoder에는 noise가 섞인 action이 들어가는데, 무작위 noise에서 시작해 그것을 걷어내는 diffusion 모델의 성질을 활용하기 위한 배치다.

### 두 attention의 역할 분담

이 해설이 원 논문보다 한 걸음 더 들어가는 대목이 attention 배치다. 논문은 어디에 무엇이 걸리는지만 기술하는 반면, 해설은 두 attention이 각각 맡는 일을 따로 떼어 설명한다.

| 위치 | attention 종류 | 맡는 일 |
|---|---|---|
| robot state q_t와 noised action a_t 사이 | self-attention | 현재 팔 위치에서 그 action을 수행하는 것이 물리적으로 가능한지 서로 참조해 확인한다 |
| VLM 출력 토큰 Φ_t와의 사이 | cross-attention | 목표와 환경 정보에 맞춰 동작의 방향을 정교하게 수정한다 |

![[assets/jo-2026-groot-n1-vla-primer/fig08.png]]
*Figure 3-c: DiT 블록 확대. 빨간 테두리가 쳐진 self-attention 자리에서 robot state와 noised action이 서로를 참조한다 (조인령 2026).*

cross-attention을 채택한 이유로 해설은 두 가지를 든다.

- alignment. VLM 출력에는 로봇이 수행해야 할 목표와 주변 환경에 대한 고차원 정보가 담겨 있다. 예를 들어 사과가 어디 있는지, 집으라는 명령인지 같은 정보가 이 경로로 들어와 방금 만든 동작의 뼈대를 목표 방향으로 수정한다.
- 연산 효율. VLM이 만들어내는 토큰의 양은 매우 많다. 이 정보를 전부 상태 토큰, action 토큰과 함께 self-attention으로 처리하면 연산 복잡도가 커지므로, 동작 생성에 직접 필요한 시각 정보만 선택적으로 참조하는 방식을 택했다.

![[assets/jo-2026-groot-n1-vla-primer/fig09.png]]
*Figure 3-d: 같은 블록의 cross-attention 자리. VLM 출력 토큰이 들어오는 경로이며, 여기서 동작이 목표 방향으로 정교해진다 (조인령 2026).*

두 이유 모두 원 논문 본문에 명시된 서술이 아니라 해설자의 부연이다. 따라서 인용 근거로 옮길 때는 출처를 이 해설로 적어야 한다.

### flow matching 손실

학습 손실은 flow matching 식 하나로 정리된다. 중간 상태 A^τ_t를 A^τ_t = τA_t + (1 - τ)ε로 정의한 뒤, 모델이 예측한 noise 제거 방향 V_θ가 올바른 방향인 ε - A_t와 얼마나 어긋나는지를 재고 그 차이를 줄이는 쪽으로 학습한다.

해설은 식에 등장하는 기호를 하나씩 나열해 풀이한다.

| 기호 | 이름 | 뜻 |
|---|---|---|
| ϕ_t | VLM tokens | Eagle-2가 현재 카메라 영상과 언어 지시를 분석해 내놓은 상황 판단 결과. cross-attention으로 결합된다 |
| A^τ_t | noised action | τ=0인 무작위 noise 시작점과 τ=1인 noise가 제거된 종점 사이의 현재 동작 |
| q_t | state | 로봇의 현재 관절 상태 |
| ε | sampled noise | 시작점이 되는 무작위 noise 벡터 |
| A_t | ground-truth action | 모델이 도달해야 할 종점, 즉 정답 action chunk |

즉 τ는 noise가 얼마나 걷혔는지를 나타내는 좌표이고, 학습은 그 좌표의 어느 지점에서 출발하든 정답 쪽으로 향하는 방향을 맞히도록 모델을 조정하는 과정이다.

### forward Euler 적분 추론

추론은 forward Euler 적분으로 진행한다. 정규분포에서 아무 의미 없는 무작위 noise를 하나 뽑아 시작점으로 삼고, 학습된 모델이 내놓은 V_θ 방향으로 이동한다.

여기서 식 앞에 1/K가 붙는다. 시작점에서 종점까지 단번에 가는 것이 아니라 전체 길이를 K등분해 한 걸음씩 간다는 뜻이다.

원 논문 실험에서는 K=4로 나눠 이동했을 때 가장 잘 동작했다. 네 단계면 충분하다는 결과는 곧 연산 횟수가 적다는 뜻이므로, 120Hz의 매끄러운 실제 움직임이 가능해지는 조건이 된다.

![[assets/jo-2026-groot-n1-vla-primer/fig13.png]]
*Figure 4: 저자가 직접 그린 flow matching 시각화. 빨간 화살표가 시작 분포에서 목표 분포로 가는 ground-truth vector이고, 파란 화살표 네 개가 K=4로 나눠 이동하는 predicted flow다. 원 논문에는 없는 그림이다 (조인령 2026).*

## 데이터 전략

구조와 별개로 데이터 섬 문제를 직접 겨냥한 장치가 두 가지 있다. 하나는 데이터를 계층으로 쌓는 data pyramid이고, 다른 하나는 성격이 다른 데이터를 하나의 표현으로 묶는 latent action space다.

### data pyramid

data pyramid는 데이터의 양과 질, 그리고 로봇 특화 정도에 따라 학습 코퍼스를 세 계층으로 나눈 구성이다. 위로 갈수록 양은 줄고 embodiment 특수성은 커진다.

| 계층 | 구성 | 역할 |
|---|---|---|
| 기반 계층 | 인터넷 텍스트와 사람 활동 영상 | action 라벨은 없지만 세상에 대한 상식과 사람의 움직임 패턴을 준다 |
| 중간 계층 | 물리 시뮬레이션(DexMimicGen)과 비디오 생성으로 만든 합성 데이터 | 실제 데이터의 10배 이상을 확보해 학습 데이터의 절대량을 늘린다 |
| 정점 계층 | 실제 휴머노이드에서 수집한 teleoperation 데이터 | 양은 가장 적지만 실제 물리 법칙과 정밀한 조작 능력을 완성한다 |

중간 계층은 양만 늘리는 층이 아니다. 보간 방식으로 원활한 실행을 보장하고, 마지막에 성공한 시연 데이터만 남겨 품질을 걸러낸다.

### latent action space

latent action space는 action 라벨이 없는 사람 영상을 학습에 넣기 위한 장치다. 로봇 학습에는 보통 특정 시점에 관절을 몇 도 꺾어야 하는지 같은 라벨이 필요하지만, 인터넷에 널린 사람의 영상에는 그런 정보가 없다.

GR00T N1은 이 문제를 VQ-VAE로 푼다. VQ-VAE는 복잡하고 방대한 데이터에서 핵심 특징만 추출해 다루기 쉬운 압축 표현으로 바꾸는 모델이고, 여기서는 연속된 영상 프레임 사이의 변화를 동작 정보로 압축하는 역할을 맡는다.

학습 과정은 세 단계다.

- 입력. 현재 화면 x1과 잠시 뒤의 화면 x2를 동시에 넣는다.
- 인코더의 추론. x1에서 x2로 화면이 바뀌려면 어떤 움직임이 있어야 하는지를 스스로 찾아 latent action 벡터로 압축한다.
- 디코더의 검증. x1과 그 벡터를 합쳤을 때 정말 x2가 만들어지는지 확인하며 학습한다.

이 과정에서 모델은 관절 각도 같은 명시적 라벨 없이도 영상 속 물체가 어떻게 변화하고 움직이는지를 스스로 익힌다. 해설은 이 방식을 시리즈 앞 편에서 다룬 DINO의 라벨 없는 학습에 빗대 소개한다.

### 학습 두 단계

학습은 pre-training과 post-training 두 단계로 나뉜다. pre-training은 대규모 일반 데이터로 기반 능력을 먼저 쌓는 단계이고 post-training은 특정 하드웨어나 개별 과제에 맞춰 fine-tuning하는 단계다.

| 단계 | 쓰는 데이터 | 학습 타깃과 설정 |
|---|---|---|
| pre-training | data pyramid 전체 | 기반 계층에는 실제 action이 없으므로 학습된 latent action을 타깃으로 쓴다. GR-1 휴머노이드나 OpenX-Embodiment 같은 로봇 데이터에는 실제 action과 latent action을 함께 쓴다 |
| post-training | 주로 정점 계층 | VLM backbone의 언어 부분은 frozen으로 두고, 데이터가 부족하면 비디오 생성으로 만든 neural trajectory를 1:1 비율로 섞는다 |

neural trajectory는 video world model이 만들어낸 합성 trajectory 데이터다. 즉 실제 로봇을 더 움직이지 않고도 정점 계층의 부족분을 메우는 경로다.

## 결과

해설이 결과에서 고른 것은 벤치마크 수치표보다 정성적 변화 쪽이다. 세 가지를 든다.

| 결과 | 관찰 내용 |
|---|---|
| 양손 협업의 emergent capability | pre-training만 마친 모델이 학습 데이터에 명시적으로 없던 손 사이 전달 동작을 스스로 수행했다 |
| 동작 품질 | post-training을 마친 GR00T N1의 움직임이 Diffusion Policy보다 부드럽고 grasping 정확도도 상당히 높게 측정됐다 |
| 데이터 효율 | 10% 데이터로만 학습해도 전체 데이터로 학습한 Diffusion Policy와의 성공률 차이가 3.8%p에 그쳤다 |

emergent capability는 학습 목표로 명시하지 않았는데도 모델과 데이터가 커지면서 나타나는 능력을 가리킨다. 실험 구성은 다음과 같다. 휴머노이드의 왼손 쪽에만 의도적으로 사과를 두고 "빨간 사과를 집어 바구니에 넣어라"라는 지시를 준다. 그러면 모델은 왼손으로 사과를 집어 오른손에 넘긴 뒤 바구니에 담는다.

유사한 과제를 pre-training에서 거의 접하지 않았는데도 나온 동작이므로, 해설은 이를 모델이 동작을 암기한 것이 아니라 목표를 이루려고 신체 자원을 어떻게 쓸지 판단했다는 근거로 읽는다.

데이터 효율 수치는 원 논문 기준으로 GR00T-N1-2B의 10% 데이터 학습이 42.6%, Diffusion Policy의 전체 데이터 학습이 46.4%다. 즉 학습 데이터를 10분의 1로 줄이고도 성공률 차이가 3.8%p에 머물렀다는 뜻이며, 해설은 이를 pre-training에서 쌓은 지식 덕분에 적은 데이터로도 현장 환경에 맞춰 fine-tuning하기 쉽다는 의미로 정리한다.

반면 시뮬레이션 벤치마크(RoboCasa, DexMimicGen, GR-1 Tabletop) 성적표, 모델 규모 2.2B, action chunk 길이 H=16, 학습 인프라 같은 수치는 이 해설에 없다. 결과 절 전체가 원 논문의 정성 그림 세 장에 기대고 있으므로, 정량 비교가 필요하면 원 논문 페이지를 참고한다.

## 한계

원 논문이 짚은 한계를 해설은 세 항목으로 옮긴다.

- 현재 모델은 작업 반경이 짧고 단순한 상판 조작 과제에 주로 국한되어 있다. 따라서 넓은 공간을 이동하며 복잡한 연속 작업을 수행하는 long-horizon loco-manipulation 영역으로 확장해야 한다.
- VLM backbone의 spatial reasoning이 복잡한 물리 세계를 완벽히 인지하기에는 아직 부족하다. spatial reasoning은 물체의 위치와 방향, 물체 사이의 관계를 파악하는 능력을 뜻하며, 향후 더 강력한 VLM 결합이 요구된다.
- 합성 데이터를 만들 때 현실의 물리 법칙을 준수하면서 동시에 다양성까지 갖춘 비디오 trajectory를 생성하는 데 기술적 한계가 남아 있다.

해설 자체의 빈틈도 함께 적어 둘 만하다.

- 12번째 layer를 쓴다는 선택과 K=4가 가장 좋았다는 결론은 결과만 옮기고, 그 근거가 된 ablation은 다루지 않는다. ablation은 구성 요소를 하나씩 빼거나 바꿔가며 각 요소의 성능 기여를 확인하는 실험이다.
- neural trajectory를 비디오 생성 AI로만 언급하고, 88시간 분량을 827시간으로 늘린 규모나 생성 결과를 걸러내는 판정 절차는 빠져 있다.
- action 라벨이 없는 데이터에 pseudo action을 붙이는 Inverse Dynamics Model도 등장하지 않는다.

이 해설은 입문 진입로로는 충분하지만, 인용 근거로 쓰기에는 원 논문 페이지가 맞다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| 데이터 섬(Data Islands) | 로봇마다 하드웨어 구조, 센서, 자유도, 제어 방식이 달라 한 로봇에서 모은 데이터를 다른 로봇 학습에 쓰지 못하고 고립되는 상태 |
| System 2 / System 1 | 카너먼의 인지 처리 모델에서 이름을 빌린 두 모듈. 전자는 10Hz Eagle-2 VLM, 후자는 120Hz flow matching DiT다 |
| data pyramid | 인터넷 데이터와 사람 영상, 합성 데이터, 실제 로봇 데이터 순으로 쌓은 학습 코퍼스 구성. 위로 갈수록 양은 줄고 embodiment 특수성은 커진다 |
| latent action space | action 라벨이 없는 영상에서 VQ-VAE로 뽑아낸 공통 동작 표현 공간. 성격이 다른 embodiment의 데이터를 같은 손실 아래 넣기 위한 장치다 |
| forward Euler 적분 | 학습된 vector field를 따라 noise에서 action으로 1/K씩 K번 나눠 이동하는 추론 절차. GR00T N1은 K=4를 쓴다 |
| neural trajectory | video world model이 만들어낸 합성 trajectory 데이터. data pyramid 중간 계층의 한 가지이며 post-training에서 부족분을 메운다 |

## 관련 페이지

- [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation]]: 이 페이지가 해설하는 원 논문. 시뮬레이션과 실제 로봇 수치표, 데이터 생성 절차, 학습 인프라가 모두 원 논문 페이지에 있다. 입문으로 감을 잡은 뒤 넘어가는 순서를 권한다.
- [[physical-ai/jo-2026-groot-n1-5-vla-primer]]: 같은 시리즈의 다음 편(03-14). 여기서 세운 dual-system 구조를 그대로 두고 FLARE와 DreamGen이 결합되는 과정을 이어서 읽는다. 이 편에서 다룬 latent action space가 다음 편의 pseudo action 라벨링으로 이어진다.
- [[physical-ai/jo-2026-wall-oss-vla-primer]]: 같은 시리즈의 03-11편. 수식을 기호 단위로 나눠 설명하는 방식이 이 편과 닮았다.
- [[physical-ai/jo-2026-smolvla-vla-primer]]: 같은 시리즈의 03-10편. SmolVLA가 π0의 self-attention과 GR00T N1의 cross-attention을 번갈아 쌓는 절충을 택한 배경을 함께 볼 수 있다.
- [[llms/chen-2025-eagle-25-boosting-long-context-post-training]]: System 2 자리에 들어가는 Eagle 계열의 다음 세대. 이 편이 설명하는 Eagle-2가 어떤 계보의 모델인지 확인할 수 있다.
- [[llms/lipman-2022-flow-matching-for-generative-modeling]]: System 1의 학습과 추론이 기대는 생성 기법의 원 논문.
- [[physical-ai/cui-2025-openhelix-a-short-survey-empirical]]: dual-system VLA에 판정 기준을 세운 서베이. System 1이 실시간 perception 입력을 직접 받아야 한다는 조건이라 GR00T N1은 그 목록에서 빠진다.
- [[physical-ai/figure-ai-2025-helix-a-vision-language-action]]: 같은 dual-system 계열의 다른 구현. 7-9Hz VLM과 200Hz visuomotor policy 조합이라 주기 설계를 비교해 볼 만하다.
- [[overviews/physical-ai-overview]]: physical-ai 카테고리의 분류 기준과 학습 경로 허브.
