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
  - id: fig01
    file: assets/jo-2026-groot-n1-vla-primer/fig01.png
    raw: raw/articles/jo-2026-groot-n1-vla-primer-figures/fig01.png
    caption: "논문 서론 인용 — cross-embodied learning으로 데이터를 모아도 embodiment·센서·자유도 편차가 크다는 대목"
    strategy: fetched
    curated: false
  - id: fig02
    file: assets/jo-2026-groot-n1-vla-primer/fig02.png
    raw: raw/articles/jo-2026-groot-n1-vla-primer-figures/fig02.png
    caption: "논문 서론 인용 이어지는 부분"
    strategy: fetched
    curated: false
  - id: fig03
    file: assets/jo-2026-groot-n1-vla-primer/fig03.png
    raw: raw/articles/jo-2026-groot-n1-vla-primer-figures/fig03.png
    caption: "GR00T N1 전체 구조 — 이미지·언어는 VLM(System 2)으로, 그 출력과 robot state·action 토큰은 DiT(System 1)로 흘러 motor action이 된다. 저자가 robot state 입력에 빨간 테두리를 덧그렸다 (paper Figure 2)"
    strategy: fetched
    curated: true
  - id: fig04
    file: assets/jo-2026-groot-n1-vla-primer/fig04.png
    raw: raw/articles/jo-2026-groot-n1-vla-primer-figures/fig04.png
    caption: "세부 구조도에서 System 2 영역만 빨간 테두리로 표시 — vision encoder·text tokenizer·frozen Eagle-2 VLM (paper Figure 3 주석판)"
    strategy: fetched
    curated: true
  - id: fig05
    file: assets/jo-2026-groot-n1-vla-primer/fig05.png
    raw: raw/articles/jo-2026-groot-n1-vla-primer-figures/fig05.png
    caption: "논문 인용 — 최종 layer 대신 12번째 layer 표현을 쓴다는 대목"
    strategy: fetched
    curated: false
  - id: fig06
    file: assets/jo-2026-groot-n1-vla-primer/fig06.png
    raw: raw/articles/jo-2026-groot-n1-vla-primer-figures/fig06.png
    caption: "같은 구조도에서 System 1 영역 표시 — DiT 블록과 embodiment별 action decoder (paper Figure 3 주석판)"
    strategy: fetched
    curated: true
  - id: fig07
    file: assets/jo-2026-groot-n1-vla-primer/fig07.png
    raw: raw/articles/jo-2026-groot-n1-vla-primer-figures/fig07.png
    caption: "state encoder와 action encoder 입력부 표시 — robot state q_t와 noised action a_t가 각각 어디로 들어가는지 (paper Figure 3 주석판)"
    strategy: fetched
    curated: false
  - id: fig08
    file: assets/jo-2026-groot-n1-vla-primer/fig08.png
    raw: raw/articles/jo-2026-groot-n1-vla-primer-figures/fig08.png
    caption: "DiT 블록 확대 — self-attention 두 곳에 빨간 테두리. robot state와 noised action이 서로를 참조하는 자리"
    strategy: fetched
    curated: true
  - id: fig09
    file: assets/jo-2026-groot-n1-vla-primer/fig09.png
    raw: raw/articles/jo-2026-groot-n1-vla-primer-figures/fig09.png
    caption: "같은 블록에서 cross-attention 두 곳에 빨간 테두리. VLM 출력 토큰이 들어오는 자리"
    strategy: fetched
    curated: true
  - id: fig10
    file: assets/jo-2026-groot-n1-vla-primer/fig10.png
    raw: raw/articles/jo-2026-groot-n1-vla-primer-figures/fig10.png
    caption: "flow matching 손실 수식 캡처 (paper 식 1)"
    strategy: fetched
    curated: false
  - id: fig11
    file: assets/jo-2026-groot-n1-vla-primer/fig11.png
    raw: raw/articles/jo-2026-groot-n1-vla-primer-figures/fig11.png
    caption: "손실 수식의 기호 정의 캡처"
    strategy: fetched
    curated: false
  - id: fig12
    file: assets/jo-2026-groot-n1-vla-primer/fig12.png
    raw: raw/articles/jo-2026-groot-n1-vla-primer-figures/fig12.png
    caption: "forward Euler 적분 수식 캡처 — 1/K 간격으로 K번 나눠 이동"
    strategy: fetched
    curated: false
  - id: fig13
    file: assets/jo-2026-groot-n1-vla-primer/fig13.png
    raw: raw/articles/jo-2026-groot-n1-vla-primer-figures/fig13.png
    caption: "저자가 직접 그린 flow matching 시각화 — 빨간 화살표가 ground-truth vector, 파란 화살표 4개가 K=4로 나눠 이동하는 predicted flow"
    strategy: fetched
    curated: true
  - id: fig14
    file: assets/jo-2026-groot-n1-vla-primer/fig14.png
    raw: raw/articles/jo-2026-groot-n1-vla-primer-figures/fig14.png
    caption: "논문 인용 — K=4가 모든 embodiment에서 충분했다는 대목"
    strategy: fetched
    curated: false
  - id: fig15
    file: assets/jo-2026-groot-n1-vla-primer/fig15.png
    raw: raw/articles/jo-2026-groot-n1-vla-primer-figures/fig15.png
    caption: "data pyramid — 웹 데이터·human video(하단) → 합성 데이터(중간) → 실로봇 데이터(상단). 위로 갈수록 양은 줄고 embodiment 특수성은 커진다 (paper Figure 1)"
    strategy: fetched
    curated: false
  - id: fig16
    file: assets/jo-2026-groot-n1-vla-primer/fig16.png
    raw: raw/articles/jo-2026-groot-n1-vla-primer-figures/fig16.png
    caption: "DexMimicGen 합성 데이터 생성 도식"
    strategy: fetched
    curated: false
  - id: fig17
    file: assets/jo-2026-groot-n1-vla-primer/fig17.png
    raw: raw/articles/jo-2026-groot-n1-vla-primer-figures/fig17.png
    caption: "LAPA 3단계 — VQ-VAE로 x1·x2에서 latent action z를 뽑아 codebook으로 양자화하고, 그 z를 타깃으로 VLM을 pre-training한 뒤 실제 action으로 fine-tuning한다"
    strategy: fetched
    curated: false
  - id: fig18
    file: assets/jo-2026-groot-n1-vla-primer/fig18.png
    raw: raw/articles/jo-2026-groot-n1-vla-primer-figures/fig18.png
    caption: "왼손으로 사과를 집어 오른손에 넘긴 뒤 바구니에 넣는 롤아웃 6프레임 (paper Figure 11)"
    strategy: fetched
    curated: false
  - id: fig19
    file: assets/jo-2026-groot-n1-vla-primer/fig19.png
    raw: raw/articles/jo-2026-groot-n1-vla-primer-figures/fig19.png
    caption: "post-training GR00T-N1-2B와 Diffusion Policy 롤아웃 비교 — 레몬·오이 집어 바구니에 넣기 두 과제 (paper Figure 12)"
    strategy: fetched
    curated: false
  - id: fig20
    file: assets/jo-2026-groot-n1-vla-primer/fig20.png
    raw: raw/articles/jo-2026-groot-n1-vla-primer-figures/fig20.png
    caption: "GR-1 실로봇 post-training 결과표 — GR00T-N1-2B 10% 데이터 42.6% 대 Diffusion Policy 전체 데이터 46.4% (paper Table 3)"
    strategy: fetched
    curated: false
  - id: fig21
    file: assets/jo-2026-groot-n1-vla-primer/page-full.png
    raw: raw/articles/jo-2026-groot-n1-vla-primer-figures/page-full.png
    caption: "전체 페이지 스크린샷 (아카이브용)"
    strategy: screenshot
    curated: false
---

## 요약 (Summary)

GR00T N1(NVIDIA 2025)을 처음 읽는 사람을 위한 한국어 입문 해설이다. "모두의 로보틱스 - VLA 입문" 시리즈 03-13편으로, 휴머노이드 데이터가 왜 모이지 않는지에서 출발해 dual-system 구조, flow matching 손실과 추론, data pyramid와 latent action space를 차례로 푼다. 원 논문은 이미 [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation]]으로 wiki에 있으니 이 페이지는 그 앞에 두는 진입로에 가깝다.

이 해설의 성격은 도식 사용법에서 잘 드러난다. 본문 이미지 20장 중 절반 가까이가 논문 도식에 빨간 테두리를 덧그린 주석판이다. 같은 구조도(paper Figure 3)를 세 번 반복하면서 System 2 영역, System 1 영역, state·action encoder 입력부를 차례로 짚는다. flow matching 대목에는 논문에 없는 자작 시각화도 한 장 들어간다. 논문 도식을 그대로 실은 원 논문 페이지와 겹치지 않는 부분이 바로 여기다.

## 문제 설정 (Problem Setting)

해설은 GR00T N1이 푸는 문제를 데이터 쪽으로 좁혀 읽는다. 인터넷 텍스트나 이미지와 달리 휴머노이드 데이터를 대규모로 모으려면 값비싼 하드웨어와 사람의 teleoperation이 필요하다. teleoperation은 사람이 로봇을 원격으로 움직여 demonstration을 만드는 방식이다. 단일 하드웨어 환경만으로는 foundation model을 채울 만큼의 양이 나오지 않는다.

여기에 하드웨어 비호환성이 겹친다. 로봇마다 구조·센서·자유도·제어 방식이 달라 한쪽에서 모은 데이터를 다른 쪽 학습에 갖다 쓰기 어렵다. 해설은 이 상태를 데이터 섬(Data Islands)이라 부르고 부족 문제와 별도 항목으로 세운다. GR00T N1의 구조적 선택 상당수가 이 섬들을 잇는 데 맞춰져 있다는 게 이후 설명의 전제다.

배경지식으로 카너먼의 이중 처리 이론을 먼저 깐다. 신중한 추론을 맡는 System 2와 즉각 반응하는 System 1으로 나눈 인지 모델을 소개한 뒤 구조 설명으로 넘어가는 순서라, VLA를 처음 보는 독자가 두 모듈의 역할 분담을 잡기 쉽다.

## 방법론 및 아키텍처 (Methodology and Architecture)

![[assets/jo-2026-groot-n1-vla-primer/fig03.png]]
*Figure 2: GR00T N1 전체 구조. 이미지와 언어 지시는 VLM(System 2)으로 들어가고 그 출력이 robot state·action 토큰과 함께 Diffusion Transformer(System 1)로 흘러 motor action이 된다. 빨간 테두리는 저자가 robot state 입력을 강조하려고 덧그린 것이다 (조인령 2026, paper Figure 2).*

### System 2 — 느리게 보는 쪽

System 2는 pre-training된 Eagle-2 VLM이다. Eagle-2는 SmolLM2 LLM과 SigLIP-2 이미지 인코더에서 fine-tuning한 모델이다. 이미지 토큰은 사용자의 언어 지시 토큰과 함께 LLM으로 들어간다. control frequency는 로봇이 1초에 몇 번 새 action을 갱신하는지를 뜻하는데 System 2는 10Hz로 느리게 돌며 추론 시간을 확보한다.

눈에 띄는 선택은 출력을 어디서 뽑느냐다. 보통 VLM은 마지막 layer 결과를 쓰지만 GR00T N1은 중간인 12번째 layer를 쓴다. 추론이 빨라지는 데다 과제 성공률도 더 높았다는 게 근거다.

![[assets/jo-2026-groot-n1-vla-primer/fig04.png]]
*Figure 3-a: 세부 구조도에서 System 2 영역만 표시한 주석판. vision encoder와 text tokenizer를 지나 frozen Eagle-2 VLM으로 들어가는 경로다 (조인령 2026, paper Figure 3).*

### System 1 — 빠르게 움직이는 쪽

System 1은 Diffusion Transformer 기반이고 flow matching으로 학습한다. flow matching은 noise에서 데이터로 향하는 vector field를 학습해 샘플을 만드는 생성 기법이다. 120Hz로 동작을 생성하므로 움직이는 도중에도 즉각 반응할 수 있다. embodiment마다 다른 state·action 차원은 별도 MLP 기반 encoder와 decoder가 흡수한다. embodiment는 로봇의 물리적 형상과 그에 딸린 제어 구성을 뜻하는데, 탁상 매니퓰레이터와 휴머노이드가 한 가중치를 공유하려면 이 층이 필요하다.

![[assets/jo-2026-groot-n1-vla-primer/fig06.png]]
*Figure 3-b: 같은 구조도에서 System 1 영역을 표시한 주석판. DiT 블록과 embodiment별 action decoder가 여기 들어간다 (조인령 2026, paper Figure 3).*

state encoder에는 관절 상태와 그리퍼 상태 같은 robot state가 들어가고 action encoder에는 noise가 섞인 action이 들어간다. 무작위 noise에서 시작해 그것을 걷어내는 diffusion 모델의 성질을 쓰기 위한 배치다.

### 두 attention의 역할 분담

이 해설이 논문보다 한 걸음 더 들어가는 대목이 attention 배치다. robot state q_t와 noised action a_t 사이에는 self-attention이 걸린다. 지금 팔이 이 위치에 있는데 이 action을 수행하는 게 물리적으로 가능한지를 서로 참조해 확인하는 과정으로 읽는다.

![[assets/jo-2026-groot-n1-vla-primer/fig08.png]]
*DiT 블록 확대. 빨간 테두리가 쳐진 self-attention 자리에서 robot state와 noised action이 서로를 참조한다 (조인령 2026).*

반면 Eagle-2가 내놓은 출력 토큰 Φ_t와는 cross-attention이다. 해설은 여기에 이유를 둘 든다. 하나는 alignment로, VLM 출력이 담은 목표와 환경 정보에 방금 만든 동작의 뼈대를 맞추는 역할이다. 사과가 어디 있는지, 집으라는 명령인지 같은 정보가 이 경로로 들어와 동작 방향을 잡아준다. 다른 하나는 연산량이다. VLM이 뱉는 토큰이 워낙 많아 전부 self-attention으로 처리하면 복잡도가 커지니, 동작 생성에 필요한 시각 정보만 골라 참조하는 쪽을 택했다는 설명이다.

![[assets/jo-2026-groot-n1-vla-primer/fig09.png]]
*같은 블록의 cross-attention 자리. VLM 출력 토큰이 들어오는 경로다. 여기서 동작이 목표에 맞춰 정렬된다 (조인령 2026).*

두 이유 모두 논문 본문에 명시된 서술이 아니라 해설자의 부연이다. 그렇게 알고 읽는 편이 좋다.

### 손실과 추론

학습 손실은 flow matching 식 하나다. A^τ_t = τA_t + (1−τ)ε로 정의된 중간 상태를 두고, 모델이 예측한 방향 V_θ가 실제로 noise를 걷어내는 방향 ε−A_t와 얼마나 어긋나는지를 재 그 차이를 줄인다. τ=0이 무작위 noise 쪽 시작점, τ=1이 정답 action chunk다. 해설은 손실 식의 ϕ_t·A^τ_t·q_t·ε·A_t를 하나씩 나열해 무엇을 가리키는지 짚는다.

추론은 forward Euler 적분이다. 무작위 noise를 하나 뽑아 시작해 모델이 준 방향으로 이동하는데, 시작점에서 종점까지 단번에 가지 않고 전체를 K등분해 한 걸음씩 간다. 식 앞에 붙은 1/K가 그 뜻이다. 논문 실험에서는 K=4가 가장 잘 맞았다. 네 단계면 충분하다는 점이 120Hz를 가능하게 하는 조건이 된다.

![[assets/jo-2026-groot-n1-vla-primer/fig13.png]]
*저자가 직접 그린 flow matching 시각화. 빨간 화살표가 시작 분포에서 목표 분포로 가는 ground-truth vector이고, 파란 화살표 넷이 K=4로 나눠 이동하는 predicted flow다. 논문에는 없는 그림이다 (조인령 2026).*

## 데이터 전략 (Data Strategy)

구조와 별개로 데이터 섬 문제를 직접 겨냥한 장치가 둘이다.

첫째는 data pyramid다. 바닥은 웹 텍스트와 human video로, action 라벨은 없지만 세상에 대한 상식과 사람의 움직임 패턴을 준다. 중간은 물리 시뮬레이션(DexMimicGen)과 비디오 생성으로 만든 합성 데이터로, 실제 데이터의 10배 이상을 확보해 절대량을 채운다. 보간으로 실행 가능성을 확보하고 성공한 demonstration만 남긴다. 꼭대기는 실제 휴머노이드에서 모은 teleoperation 데이터다. 양은 가장 적지만 물리 법칙과 정밀한 조작을 완성하는 자리다.

둘째는 latent action space다. action 라벨이 없는 human video를 학습에 넣으려면 라벨을 만들어야 하는데, VQ-VAE가 그 일을 한다. 현재 프레임 x1과 잠시 뒤 프레임 x2를 함께 넣으면 인코더가 x1에서 x2로 가려면 어떤 움직임이 필요한지를 스스로 찾아 latent action 벡터로 압축한다. 디코더가 x1과 그 벡터로 x2를 복원해내는지 확인하며 학습이 돈다. 관절 각도 같은 명시적 라벨 없이 지도학습 신호를 만들어내는 셈이다. 해설은 이를 시리즈 앞 편에서 다룬 DINO의 라벨 없는 학습에 빗대 소개한다.

학습은 두 단계다. pre-training은 대규모 일반 데이터로 기반 능력을 먼저 쌓는 단계인데 여기서는 피라미드 전체를 섞는다. 바닥 데이터에는 실제 action이 없으니 학습된 latent action을 타깃으로 쓰고 GR-1 휴머노이드나 OpenX-Embodiment 같은 로봇 데이터에는 실제 action과 latent action을 함께 쓴다. post-training은 특정 하드웨어나 과제에 맞춰 fine-tuning하는 단계다. VLM backbone의 언어 부분은 frozen으로 두고 주로 꼭대기 데이터를 쓰며 데이터가 부족하면 비디오 생성으로 만든 neural trajectory를 1:1 비율로 섞는다.

## 결과 (Results)

결과 장에서 해설이 고른 것은 수치표보다 정성적 변화 쪽이다.

가장 앞에 두는 것은 학습 데이터에 없던 양손 협업이 저절로 나타난 사례다. pre-training만 마친 모델에 사과를 왼손 쪽에만 놓고 "빨간 사과를 집어 바구니에 넣어라"를 시키면, 왼손으로 집어 오른손에 넘긴 뒤 바구니에 담는다. 비슷한 과제를 pre-training에서 거의 보지 않았는데도 나온 동작이라, 모델이 동작을 외운 게 아니라 목표를 이루려고 신체 자원을 어떻게 쓸지 판단했다는 근거로 읽는다.

다음은 움직임의 부드러움과 grasping 정확도다. post-training을 마친 GR00T N1의 동작이 Diffusion Policy보다 눈에 띄게 매끄럽고 잡기 정확도도 상당히 높다고 적는다. 근거는 롤아웃 프레임 비교 캡처다.

마지막이 데이터 효율이다. 10% 데이터만으로 학습해도 전체 데이터로 학습한 Diffusion Policy보다 3.8%p 낮은 데 그친다. 원 논문 기준으로는 GR00T-N1-2B 10%가 42.6%, Diffusion Policy 전체가 46.4%다. pre-training에서 쌓은 지식 덕분에 적은 데이터로도 현장에 맞춰 fine-tuning하기 쉽다는 뜻으로 정리한다.

시뮬레이션 벤치마크(RoboCasa·DexMimicGen·GR-1 Tabletop) 성적표, 모델 규모 2.2B, action chunk 길이 H=16, 학습 인프라 같은 수치는 이 해설에 없다. 결과 장 전체가 논문의 정성 그림 세 장에 기대고 있어, 정량 비교가 필요하면 원 논문 페이지로 가야 한다.

## 한계 (Limitations)

논문이 짚은 한계를 세 줄로 옮긴다. 현재 모델은 작업 반경이 짧은 상판 조작 과제에 주로 묶여 있어, 넓은 공간을 이동하며 연속 작업을 수행하는 long-horizon loco-manipulation으로 넓혀야 한다. VLM backbone의 spatial reasoning이 복잡한 물리 세계를 다루기에는 아직 부족해 더 강한 VLM 결합이 필요하다. 합성 데이터 쪽에서는 현실 물리 법칙을 지키면서 다양성까지 갖춘 비디오 trajectory를 만드는 데 기술적 한계가 남아 있다.

해설 자체의 빈틈도 있다. 12번째 layer를 쓴다는 선택이나 K=4가 가장 좋았다는 결론은 결과만 옮기고 그 근거가 된 ablation은 다루지 않는다. neural trajectory를 "비디오 생성 AI"로만 언급하고 88시간을 827시간으로 늘린 규모나 생성 결과를 걸러내는 판정 절차는 빠져 있다. 라벨 없는 데이터에 pseudo-action을 붙이는 IDM도 등장하지 않는다. 입문 진입로로는 충분하지만 인용 근거로 쓰기에는 원 논문 페이지가 맞다.

## 관련 페이지 (Related Pages)

- [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation]] — 이 페이지가 해설하는 원 논문. 시뮬레이션·실로봇 수치표, 데이터 생성 절차, 학습 인프라가 모두 그쪽에 있다. 입문으로 감을 잡은 뒤 넘어가는 순서를 권한다.
- [[physical-ai/jo-2026-wall-oss-vla-primer]] — 같은 "모두의 로보틱스 - VLA 입문" 시리즈 03-11편. 수식을 단위로 뜯는 서술 방식이 이 편과 닮았다.
- [[physical-ai/jo-2026-smolvla-vla-primer]] — 같은 시리즈 03-10편. SmolVLA가 π0의 self-attention과 GR00T N1의 cross-attention을 번갈아 쌓는 절충을 택한 배경을 함께 보면 좋다.
- [[llms/chen-2025-eagle-25-boosting-long-context-post-training]] — System 2 자리에 들어가는 Eagle 계열의 다음 세대. 이 편이 설명하는 Eagle-2가 어떤 계보의 모델인지 확인할 수 있다.
- [[llms/lipman-2022-flow-matching-for-generative-modeling]] — System 1의 학습과 추론이 기대는 생성 기법의 원 논문.
- [[physical-ai/cui-2025-openhelix-a-short-survey-empirical]] — dual-system VLA에 판정 기준을 세운 서베이. System 1이 실시간 perception 입력을 직접 받아야 한다는 조건이라 GR00T N1은 그 목록에서 빠진다.
- [[physical-ai/figure-ai-2025-helix-a-vision-language-action]] — 같은 dual-system 갈래의 다른 구현. 7-9Hz VLM과 200Hz visuomotor policy 조합이라 주기 설계를 비교해볼 만하다.
- [[overviews/physical-ai-overview]] — physical-ai 카테고리의 분류 기준·학습 경로 허브.
