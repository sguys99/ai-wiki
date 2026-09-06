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
publisher: "WikiDocs"
tags: [physical-ai, vla, robot-learning, humanoid, manipulation]
figures:
  - id: fig01
    file: assets/jo-2026-groot-n1-vla-primer/fig01.png
    raw: raw/articles/jo-2026-groot-n1-vla-primer-figures/fig01.png
    caption: "논문 서론 인용. cross-embodied learning으로 데이터를 모아도 embodiment와 센서, 자유도 편차가 크다는 대목"
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
    caption: "GR00T N1 전체 구조. 이미지와 언어는 VLM(System 2)으로, 그 출력과 robot state, action 토큰은 DiT(System 1)로 흘러 motor action이 된다. 저자가 robot state 입력에 빨간 테두리를 덧그렸다 (paper Figure 2)"
    strategy: fetched
    curated: true
  - id: fig04
    file: assets/jo-2026-groot-n1-vla-primer/fig04.png
    raw: raw/articles/jo-2026-groot-n1-vla-primer-figures/fig04.png
    caption: "세부 구조도에서 System 2 영역만 빨간 테두리로 표시. vision encoder와 text tokenizer, frozen Eagle-2 VLM (paper Figure 3 주석판)"
    strategy: fetched
    curated: true
  - id: fig05
    file: assets/jo-2026-groot-n1-vla-primer/fig05.png
    raw: raw/articles/jo-2026-groot-n1-vla-primer-figures/fig05.png
    caption: "논문 인용. 최종 layer 대신 12번째 layer 표현을 쓴다는 대목"
    strategy: fetched
    curated: false
  - id: fig06
    file: assets/jo-2026-groot-n1-vla-primer/fig06.png
    raw: raw/articles/jo-2026-groot-n1-vla-primer-figures/fig06.png
    caption: "같은 구조도에서 System 1 영역 표시. DiT 블록과 embodiment별 action decoder (paper Figure 3 주석판)"
    strategy: fetched
    curated: true
  - id: fig07
    file: assets/jo-2026-groot-n1-vla-primer/fig07.png
    raw: raw/articles/jo-2026-groot-n1-vla-primer-figures/fig07.png
    caption: "state encoder와 action encoder 입력부 표시. robot state q_t와 noised action a_t가 각각 어디로 들어가는지 (paper Figure 3 주석판)"
    strategy: fetched
    curated: false
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
    caption: "forward Euler 적분 수식 캡처. 1/K 간격으로 K번 나눠 이동"
    strategy: fetched
    curated: false
  - id: fig13
    file: assets/jo-2026-groot-n1-vla-primer/fig13.png
    raw: raw/articles/jo-2026-groot-n1-vla-primer-figures/fig13.png
    caption: "저자가 직접 그린 flow matching 시각화. 빨간 화살표가 ground-truth vector, 파란 화살표 4개가 K=4로 나눠 이동하는 predicted flow"
    strategy: fetched
    curated: true
  - id: fig14
    file: assets/jo-2026-groot-n1-vla-primer/fig14.png
    raw: raw/articles/jo-2026-groot-n1-vla-primer-figures/fig14.png
    caption: "논문 인용. K=4가 모든 embodiment에서 충분했다는 대목"
    strategy: fetched
    curated: false
  - id: fig15
    file: assets/jo-2026-groot-n1-vla-primer/fig15.png
    raw: raw/articles/jo-2026-groot-n1-vla-primer-figures/fig15.png
    caption: "data pyramid. 웹 데이터와 human video(하단) → 합성 데이터(중간) → 실제 로봇 데이터(상단). 위로 갈수록 양은 줄고 embodiment 특수성은 커진다 (paper Figure 1)"
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
    caption: "LAPA 3단계. VQ-VAE로 x1과 x2에서 latent action z를 뽑아 codebook으로 양자화하고, 그 z를 타깃으로 VLM을 pre-training한 뒤 실제 action으로 fine-tuning한다"
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
    caption: "post-training GR00T-N1-2B와 Diffusion Policy 롤아웃 비교. 레몬과 오이를 집어 바구니에 넣기 두 과제 (paper Figure 12)"
    strategy: fetched
    curated: false
  - id: fig20
    file: assets/jo-2026-groot-n1-vla-primer/fig20.png
    raw: raw/articles/jo-2026-groot-n1-vla-primer-figures/fig20.png
    caption: "GR-1 실제 로봇 post-training 결과표. GR00T-N1-2B 10% 데이터 42.6% 대 Diffusion Policy 전체 데이터 46.4% (paper Table 3)"
    strategy: fetched
    curated: false
  - id: fig21
    file: assets/jo-2026-groot-n1-vla-primer/page-full.png
    raw: raw/articles/jo-2026-groot-n1-vla-primer-figures/page-full.png
    caption: "전체 페이지 스크린샷 (아카이브용)"
    strategy: screenshot
    curated: false
---

## 한 줄 요약 (One-line Summary)

GR00T N1(NVIDIA 2025)을 처음 읽는 사람을 위한 한국어 입문 해설이다. "모두의 로보틱스 - VLA 입문" 시리즈 03-13편으로, humanoid 데이터가 왜 모이지 않는지에서 출발해 dual-system 구조, flow matching 손실과 추론, data pyramid와 latent action space를 차례로 푼다.

## 1. 자료 정보 (Document Information)

- 저자: 조인령 (WikiDocs "모두의 로보틱스 - VLA 입문" 시리즈)
- URL: https://wikidocs.net/366379
- 형식: 온라인 강의 챕터 (03-13편)
- 성격: 원 논문 "GR00T N1: An Open Foundation Model for Generalist Humanoid Robots"(arXiv 2503.14734)의 한국어 입문 해설. 원 논문은 이미 `nvidia-2025-gr00t-n1-an-open-foundation`으로 wiki에 있어 이 페이지는 그 앞에 두는 진입로다.

본문 이미지 20장 중 절반 가까이가 논문 도식에 빨간 테두리를 덧그린 주석판이다. 같은 구조도(paper Figure 3)를 세 번 반복하면서 System 2 영역, System 1 영역, state와 action encoder 입력부를 차례로 짚는 방식이라, 논문 도식을 그대로 실은 원 논문 페이지와 성격이 다르다. flow matching 설명에는 논문에 없는 자작 시각화도 한 장 들어간다.

## 2. 주요 기여 (Key Contributions)

해설이 논문에서 골라 잡은 항목은 네 가지다.

문제 설정을 데이터 쪽으로 좁혀 읽는다. humanoid 데이터가 부족한 이유를 값비싼 하드웨어와 teleoperation 비용으로 설명한다. 여기에 하드웨어 비호환성이 겹쳐 생기는 데이터 섬(Data Islands) 현상은 별도 항목으로 세운다. 로봇마다 구조와 센서, 자유도, 제어 방식이 달라 한쪽에서 모은 데이터를 다른 쪽이 못 쓰는 상태를 가리킨다.

dual-system을 카너먼의 dual-process theory에서 끌어온다. dual-process theory는 인지를 빠르고 자동적인 System 1과 느리고 숙고적인 System 2로 나눠 보는 심리학 이론이다. 느린 추론(System 2)과 빠른 반응(System 1)이라는 인지 모델을 먼저 깔고 구조 설명으로 넘어가는 순서라, VLA 구조를 처음 보는 독자가 두 모듈의 역할 분담을 잡기 쉽다.

self-attention과 cross-attention을 왜 그 자리에 뒀는지를 따로 떼어 설명한다. 논문은 구조만 기술하고 넘어가는데, 해설은 두 attention의 역할을 각각 물리적 실현 가능성 점검과 목표 정렬로 읽는다. cross-attention을 고른 이유로는 연산량까지 든다. 논문에 없는 부연이라 그렇게 알고 읽어야 한다.

flow matching 손실의 기호를 하나씩 풀고 추론 과정을 직접 그림으로 그린다. 손실 식의 ϕ_t, A^τ_t, q_t, ε, A_t가 각각 무엇인지 나열한 뒤, forward Euler 적분에서 1/K가 붙은 의미를 "전체 길이를 K등분해 한 걸음씩 간다"로 풀고 K=4를 파란 화살표 네 개로 시각화한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

System 2는 pre-training된 Eagle-2 VLM이다. SmolLM2 LLM과 SigLIP-2 이미지 인코더에서 fine-tuning한 모델이다. 이미지 토큰은 사용자의 언어 지시 토큰과 함께 LLM으로 들어간다. control frequency는 로봇이 1초에 몇 번 새 action을 갱신하는지를 뜻하는데 System 2는 10Hz로 느리게 동작하며 추론 시간을 확보한다. 특이한 선택 하나는 출력을 어디서 뽑느냐다. 보통 VLM은 마지막 layer를 쓰지만 GR00T N1은 12번째 layer 결과를 쓴다. 속도가 빨라지고 과제 성공률도 더 높았다는 게 근거다.

System 1은 Diffusion Transformer 기반이고 flow matching으로 학습한다. flow matching은 noise에서 데이터로 향하는 vector field를 학습해 샘플을 만드는 생성 기법이다. 120Hz로 동작을 생성하므로 움직이는 도중에도 즉각 반응할 수 있다. Eagle-2가 내놓은 토큰에는 cross-attention으로 붙는다. embodiment마다 다른 state와 action 차원은 별도 MLP 기반 encoder와 decoder로 흡수한다. embodiment는 로봇의 물리적 형상과 그에 딸린 제어 구성을 뜻하는데 탁상 매니퓰레이터와 humanoid가 같은 모델을 쓰려면 이 층이 필요하다.

두 attention의 역할 분담이 이 해설에서 가장 공들인 대목이다. state encoder에는 관절 상태와 그리퍼 상태 같은 robot state가 들어가고 action encoder에는 noise가 섞인 action이 들어간다. 이 둘 사이에는 self-attention이 걸린다. 지금 팔이 이 위치에 있는데 이 action이 물리적으로 가능한지를 서로 참조해 확인하는 과정으로 읽는다. 반면 VLM 출력 토큰과는 cross-attention이다. VLM이 담고 있는 목표와 환경 정보에 방금 만든 동작의 뼈대를 맞추는 alignment 역할이다. 토큰 양이 많아 전부 self-attention으로 처리하면 연산 복잡도가 커지니 필요한 시각 정보만 골라 참조한다는 설명이 붙는다.

학습 손실은 flow matching 식 하나다. A^τ_t = τA_t + (1−τ)ε로 정의된 중간 상태에서 모델이 예측한 방향 V_θ가 실제로 noise를 걷어내는 방향 ε−A_t와 얼마나 어긋나는지를 재고 그 차이를 줄이는 쪽으로 학습한다. τ=0이 무작위 noise, τ=1이 정답 action chunk다. 추론은 forward Euler 적분으로 수행한다. 무작위 noise에서 시작해 모델이 준 방향으로 1/K씩 이동한다. 논문 실험에서는 K=4가 가장 잘 맞았다. 4단계면 충분하다는 점이 120Hz를 가능하게 하는 조건이다.

데이터 전략은 두 가지로 정리된다. 하나는 data pyramid다. 바닥은 웹 텍스트와 human video로, action 라벨은 없지만 세상에 대한 상식과 사람의 움직임 패턴을 준다. 중간은 물리 시뮬레이션(DexMimicGen)과 비디오 생성으로 만든 합성 데이터로, 실제 데이터의 10배 이상을 확보해 절대량을 채운다. 보간으로 실행 가능성을 확보하고 성공한 시연 데이터(demonstration)만 남긴다. 꼭대기는 실제 humanoid에서 모은 teleoperation 데이터다. 양은 가장 적지만 물리 법칙과 정밀한 조작을 완성한다.

다른 하나는 latent action space다. action 라벨이 없는 human video를 쓰려면 라벨을 만들어야 하는데, VQ-VAE로 이 문제를 푼다. 현재 프레임 x1과 잠시 뒤 프레임 x2를 함께 넣으면 인코더가 x1에서 x2로 가려면 어떤 움직임이 필요한지를 스스로 찾아 latent action 벡터로 압축한다. 디코더가 x1과 그 벡터로 x2를 복원해내는지 확인하며 학습한다. 관절 각도 같은 명시적 라벨 없이 지도학습 신호를 만들어내는 셈이다. 해설은 이 방식을 시리즈 앞 편에서 다룬 DINO의 라벨 없는 학습에 빗대 소개한다.

학습은 두 단계다. pre-training은 대규모 일반 데이터로 기반 능력을 먼저 쌓는 단계인데 여기서는 피라미드 전체를 섞는다. 바닥 데이터에는 실제 action이 없으니 학습된 latent action을 타깃으로 쓰고 GR-1 humanoid나 OpenX-Embodiment 같은 로봇 데이터에는 실제 action과 latent action을 함께 쓴다. post-training은 특정 하드웨어나 과제에 맞춰 fine-tuning하는 단계다. VLM backbone의 언어 부분은 frozen으로 두고 주로 꼭대기 데이터를 쓰며 데이터가 부족하면 비디오 생성으로 만든 neural trajectory를 1:1 비율로 섞는다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

해설이 결과 장에서 고른 것은 수치표보다 정성적 변화 쪽이다. 세 가지를 든다.

가장 앞에 두는 것은 학습 데이터에 없던 양손 협업이 저절로 나타난 사례다. pre-training만 마친 모델에 사과를 왼손 쪽에만 놓고 "빨간 사과를 집어 바구니에 넣어라"를 시키면, 왼손으로 집어 오른손에 넘긴 뒤 바구니에 담는다. 비슷한 과제를 pre-training에서 거의 보지 않았는데도 나온 동작이라, 모델이 동작을 외운 게 아니라 목표를 이루려고 신체 자원을 어떻게 쓸지 판단했다는 근거로 읽는다.

두 번째는 움직임의 부드러움과 grasping 정확도다. post-training을 마친 GR00T N1의 동작이 Diffusion Policy보다 눈에 띄게 매끄럽고 잡기 정확도도 상당히 높다고 적는다. 근거는 롤아웃 프레임 비교 캡처다.

세 번째가 데이터 효율이다. 10% 데이터만으로 학습해도 전체 데이터로 학습한 Diffusion Policy보다 3.8%p 낮은 데 그친다. pre-training에서 쌓은 지식 덕분에 적은 데이터로도 현장에 맞춰 fine-tuning하기 쉽다는 뜻으로 정리한다. 원 논문 기준으로는 GR00T-N1-2B 10%가 42.6%, Diffusion Policy 전체가 46.4%다.

시뮬레이션 벤치마크(RoboCasa, DexMimicGen, GR-1 Tabletop) 성적표, 모델 규모 2.2B, action chunk 길이 H=16, 학습 인프라 같은 수치는 이 해설에 없다. 결과 장 전체가 논문의 정성 그림 세 장에 기대고 있어, 정량 비교가 필요하면 원 논문 페이지로 가야 한다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

논문이 짚은 한계를 세 줄로 옮긴다. 현재 모델은 작업 반경이 짧은 상판 조작 과제에 주로 묶여 있어, 넓은 공간을 이동하며 연속 작업을 수행하는 long-horizon loco-manipulation으로 넓혀야 한다. VLM backbone의 spatial reasoning이 복잡한 물리 세계를 다루기에는 아직 부족해 더 강한 VLM 결합이 필요하다. 합성 데이터 쪽에서는 현실 물리 법칙을 지키면서 동시에 다양성까지 갖춘 비디오 trajectory를 만드는 데 기술적 한계가 남아 있다.

해설 자체의 빈틈도 있다. 12번째 layer를 쓴다는 선택이나 K=4가 가장 좋았다는 결론은 결과만 옮기고 그 근거가 된 ablation은 다루지 않는다. neural trajectory를 "비디오 생성 AI"로만 언급하고 88시간을 827시간으로 늘린 규모나 생성 결과를 걸러내는 판정 절차는 빠져 있다. 라벨 없는 데이터에 pseudo-action을 붙이는 IDM도 등장하지 않는다.

## 6. 관련 연구 (Related Work)

- 원 논문 GR00T N1(NVIDIA 2025): 이 페이지가 해설하는 대상. 정량 결과와 데이터 생성 절차는 원 논문 페이지가 훨씬 자세하다.
- LAPA(Ye 2024): latent action space 절에 인용된 VQ-VAE 기반 latent action pre-training 방식. 그림도 LAPA 논문 도식이다.
- Flow Matching(Lipman 2022): System 1의 학습과 추론이 기대는 생성 기법.
- Diffusion Policy: 결과 장 전체의 비교 대상.
- dual-system VLA 계보: Helix, OpenHelix와 같은 가지로 읽히지만 OpenHelix의 판정 기준(System 1이 실시간 perception 입력을 직접 받아야 한다)으로는 GR00T N1이 dual-system 목록에서 빠진다.

## 7. 용어집 (Glossary)

- 데이터 섬(Data Islands): 로봇마다 하드웨어 구조와 센서, 자유도, 제어 방식이 달라 한 로봇에서 모은 데이터를 다른 로봇 학습에 쓰지 못하고 고립되는 상태.
- System 2 / System 1: GR00T N1이 카너먼의 dual-process theory에서 이름을 빌린 두 모듈. 전자는 10Hz Eagle-2 VLM, 후자는 120Hz flow-matching DiT다.
- data pyramid: 웹과 human video → 합성 데이터 → 실제 로봇 데이터 순으로 쌓은 학습 코퍼스 구성. 위로 갈수록 양은 줄고 embodiment 특수성은 커진다.
- latent action space: action 라벨이 없는 영상에서 VQ-VAE로 뽑아낸 공통 동작 표현 공간. 서로 다른 embodiment의 데이터를 같은 손실 아래 넣기 위한 장치다.
- forward Euler integration: 학습된 vector field를 따라 noise에서 action으로 1/K씩 K번 나눠 이동하는 추론 절차. GR00T N1은 K=4를 쓴다.
- neural trajectory: 비디오 생성 모델로 만든 합성 trajectory 데이터. data pyramid 중간층의 한 가지다.

## 8. 그림 후보 (Figure Candidates)

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | 논문 서론 인용 (cross-embodied learning의 한계) | fetched | (아카이브) |
| fig02 | 논문 서론 인용 이어지는 부분 | fetched | (아카이브) |
| fig03 | GR00T N1 전체 구조, robot state 강조 (paper Fig 2) | fetched | ★ wiki 권장 (architecture) |
| fig04 | 세부 구조도에서 System 2 영역 표시 (paper Fig 3 주석판) | fetched | ★ wiki 권장 (architecture) |
| fig05 | 12번째 layer를 쓴다는 논문 인용 | fetched | (아카이브) |
| fig06 | 같은 구조도에서 System 1 영역 표시 | fetched | ★ wiki 권장 (architecture) |
| fig07 | state와 action encoder 입력부 표시 | fetched | (선택) |
| fig08 | DiT 블록의 self-attention 강조 | fetched | ★ wiki 권장 (method) |
| fig09 | 같은 블록의 cross-attention 강조 | fetched | ★ wiki 권장 (method) |
| fig10 | flow matching 손실 수식 | fetched | (선택) |
| fig11 | 손실 기호 정의 | fetched | (아카이브) |
| fig12 | forward Euler 적분 수식 | fetched | (선택) |
| fig13 | 저자 자작 flow matching K=4 시각화 | fetched | ★ wiki 권장 (원본에 없는 부연) |
| fig14 | K=4가 충분했다는 논문 인용 | fetched | (아카이브) |
| fig15 | data pyramid (paper Fig 1) | fetched | (확인 필요, 논문 페이지에 이미 있음) |
| fig16 | DexMimicGen 합성 데이터 생성 | fetched | (선택) |
| fig17 | LAPA 3단계 latent action | fetched | (확인 필요, 논문 페이지에 이미 있음) |
| fig18 | 좌→우 손 handover 롤아웃 (paper Fig 11) | fetched | (확인 필요, 논문 페이지에 이미 있음) |
| fig19 | Diffusion Policy 대비 롤아웃 (paper Fig 12) | fetched | (확인 필요, 논문 페이지에 이미 있음) |
| fig20 | GR-1 실제 로봇 결과표 (paper Table 3) | fetched | (선택) |
| fig21 | 전체 페이지 스크린샷 | screenshot | (아카이브) |
