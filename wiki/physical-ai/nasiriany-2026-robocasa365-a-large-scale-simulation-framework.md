---
title: "RoboCasa365: A Large-Scale Simulation Framework for Training and Benchmarking Generalist Robots"
type: paper
year: 2026
category: physical-ai
source: nasiriany-2026-robocasa365-a-large-scale-simulation-framework.md
raw_path: raw/papers/nasiriany-2026-robocasa365-a-large-scale-simulation-framework.pdf
raw_filename: "nasiriany-2026-robocasa365-a-large-scale-simulation-framework.pdf"
source_collection: external
authors: "Soroush Nasiriany, Sepehr Nasiriany, Abhiram Maddukuri, Yuke Zhu"
arxiv_id: "2603.04356"
tags: [physical-ai, benchmark, simulator, robot-dataset, manipulation]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/nasiriany-2026-robocasa365-a-large-scale-simulation-framework/fig01.png
    raw: raw/papers/nasiriany-2026-robocasa365-a-large-scale-simulation-framework-figures/fig01.png
    caption: "RoboCasa365 개요 — 장면·물체·가전 라이브러리와 skill·long-horizon·semantic reasoning 과제 예시"
    page: 1
    bbox_norm: [0.1663, 0.5689, 0.8333, 0.8556]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/nasiriany-2026-robocasa365-a-large-scale-simulation-framework/fig02.png
    raw: raw/papers/nasiriany-2026-robocasa365-a-large-scale-simulation-framework-figures/fig02.png
    caption: "주방 장면 — 위가 pre-training용 2,500개 중 표본, 아래가 target 10개 전부"
    page: 4
    bbox_norm: [0.1667, 0.0958, 0.8334, 0.4278]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/nasiriany-2026-robocasa365-a-large-scale-simulation-framework/fig03.png
    raw: raw/papers/nasiriany-2026-robocasa365-a-large-scale-simulation-framework-figures/fig03.png
    caption: "composite task 300종 — 6개 activity family 아래 60개 활동이 놓이고 활동마다 과제가 달린다"
    page: 5
    bbox_norm: [0.0802, 0.0874, 0.9098, 0.3756]
    strategy: manual
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/nasiriany-2026-robocasa365-a-large-scale-simulation-framework/fig04.png
    raw: raw/papers/nasiriany-2026-robocasa365-a-large-scale-simulation-framework-figures/fig04.png
    caption: "과제별 하위 단계 수 분포와 사람 시연 episode 길이 분포"
    page: 6
    bbox_norm: [0.1667, 0.5376, 0.8333, 0.7423]
    strategy: caption-region
    curated: false
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/nasiriany-2026-robocasa365-a-large-scale-simulation-framework/fig05.png
    raw: raw/papers/nasiriany-2026-robocasa365-a-large-scale-simulation-framework-figures/fig05.png
    caption: "foundation model 학습 곡선 — target demo 수에 따른 평균 성공률 세 조건 비교"
    page: 8
    bbox_norm: [0.5226, 0.3934, 0.8333, 0.5735]
    strategy: caption-region
    curated: true
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/nasiriany-2026-robocasa365-a-large-scale-simulation-framework/fig06.png
    raw: raw/papers/nasiriany-2026-robocasa365-a-large-scale-simulation-framework-figures/fig06.png
    caption: "실기기 플랫폼 — 실제 주방의 DROID Panda 팔"
    page: 10
    bbox_norm: [0.1667, 0.2298, 0.8333, 0.4269]
    strategy: caption-region
    curated: false
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/nasiriany-2026-robocasa365-a-large-scale-simulation-framework/fig07.png
    raw: raw/papers/nasiriany-2026-robocasa365-a-large-scale-simulation-framework-figures/fig07.png
    caption: "post-training Atomic-Seen 18개 과제 (부록)"
    page: 18
    bbox_norm: [0.1667, 0.1986, 0.8375, 0.776]
    strategy: caption-region
    curated: false
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/nasiriany-2026-robocasa365-a-large-scale-simulation-framework/fig08.png
    raw: raw/papers/nasiriany-2026-robocasa365-a-large-scale-simulation-framework-figures/fig08.png
    caption: "post-training Composite-Seen 16개 과제 (부록)"
    page: 19
    bbox_norm: [0.1667, 0.1133, 0.8365, 0.8865]
    strategy: caption-region
    curated: false
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/nasiriany-2026-robocasa365-a-large-scale-simulation-framework/fig09.png
    raw: raw/papers/nasiriany-2026-robocasa365-a-large-scale-simulation-framework-figures/fig09.png
    caption: "post-training Composite-Unseen 16개 과제 (부록)"
    page: 20
    bbox_norm: [0.1669, 0.0963, 0.8331, 0.9072]
    strategy: caption-region
    curated: false
  - id: fig10
    label: Figure 10
    kind: figure
    file: assets/nasiriany-2026-robocasa365-a-large-scale-simulation-framework/fig10.png
    raw: raw/papers/nasiriany-2026-robocasa365-a-large-scale-simulation-framework-figures/fig10.png
    caption: "카메라 3시점 이미지 예시 (부록)"
    page: 21
    bbox_norm: [0.2314, 0.0958, 0.7686, 0.2443]
    strategy: caption-region
    curated: false
  - id: tab01
    label: Table 1
    kind: table
    file: assets/nasiriany-2026-robocasa365-a-large-scale-simulation-framework/tab01.png
    raw: raw/papers/nasiriany-2026-robocasa365-a-large-scale-simulation-framework-figures/tab01.png
    caption: "multi-task 학습 결과 — Diffusion Policy·π0·π0.5·GR00T N1.5 성공률"
    page: 7
    bbox_norm: [0.2637, 0.4326, 0.7327, 0.5255]
    strategy: table-region
    curated: true
  - id: tab02
    label: Table 2
    kind: table
    file: assets/nasiriany-2026-robocasa365-a-large-scale-simulation-framework/tab02.png
    raw: raw/papers/nasiriany-2026-robocasa365-a-large-scale-simulation-framework-figures/tab02.png
    caption: "foundation model 학습 결과 — pre-training only / target only / pre-training + post-training"
    page: 8
    bbox_norm: [0.1667, 0.0419, 0.8333, 0.1971]
    strategy: table-region
    curated: true
  - id: tab03
    label: Table 3
    kind: table
    file: assets/nasiriany-2026-robocasa365-a-large-scale-simulation-framework/tab03.png
    raw: raw/papers/nasiriany-2026-robocasa365-a-large-scale-simulation-framework-figures/tab03.png
    caption: "lifelong learning 결과 — 4단계에 걸친 과제별 성공률"
    page: 9
    bbox_norm: [0.2637, 0.0962, 0.733, 0.1772]
    strategy: table-region
    curated: true
  - id: tab04
    label: Table 4
    kind: table
    file: assets/nasiriany-2026-robocasa365-a-large-scale-simulation-framework/tab04.png
    raw: raw/papers/nasiriany-2026-robocasa365-a-large-scale-simulation-framework-figures/tab04.png
    caption: "pre-training 데이터 구성 비교 — Human50·Human300·Human300+MG60"
    page: 9
    bbox_norm: [0.2293, 0.5012, 0.7635, 0.6489]
    strategy: table-region
    curated: true
  - id: tab05
    label: Table 5
    kind: table
    file: assets/nasiriany-2026-robocasa365-a-large-scale-simulation-framework/tab05.png
    raw: raw/papers/nasiriany-2026-robocasa365-a-large-scale-simulation-framework-figures/tab05.png
    caption: "실기기 평가 — 실세계 데이터만 vs 시뮬레이션 혼합"
    page: 10
    bbox_norm: [0.2314, 0.4752, 0.7658, 0.5389]
    strategy: table-region
    curated: true
  - id: tab06
    label: Table 6
    kind: table
    file: assets/nasiriany-2026-robocasa365-a-large-scale-simulation-framework/tab06.png
    raw: raw/papers/nasiriany-2026-robocasa365-a-large-scale-simulation-framework-figures/tab06.png
    caption: "가구·가전 인벤토리 (부록)"
    page: 16
    bbox_norm: [0.377, 0.6758, 0.623, 0.8873]
    strategy: table-region
    curated: false
  - id: tab07
    label: Table 7
    kind: table
    file: assets/nasiriany-2026-robocasa365-a-large-scale-simulation-framework/tab07.png
    raw: raw/papers/nasiriany-2026-robocasa365-a-large-scale-simulation-framework-figures/tab07.png
    caption: "pre-training·target 데이터셋 통계 (부록)"
    page: 21
    bbox_norm: [0.2314, 0.354, 0.7654, 0.4231]
    strategy: table-region
    curated: false
  - id: tab08
    label: Table 8
    kind: table
    file: assets/nasiriany-2026-robocasa365-a-large-scale-simulation-framework/tab08.png
    raw: raw/papers/nasiriany-2026-robocasa365-a-large-scale-simulation-framework-figures/tab08.png
    caption: "pre-training 장면 다양성 결과 (부록)"
    page: 22
    bbox_norm: [0.2799, 0.5354, 0.7171, 0.6051]
    strategy: table-region
    curated: false
  - id: tab09
    label: Table 9
    kind: table
    file: assets/nasiriany-2026-robocasa365-a-large-scale-simulation-framework/tab09.png
    raw: raw/papers/nasiriany-2026-robocasa365-a-large-scale-simulation-framework-figures/tab09.png
    caption: "perturbation 조건별 강건성 평가 (부록)"
    page: 23
    bbox_norm: [0.1828, 0.1213, 0.8145, 0.1721]
    strategy: table-region
    curated: false
  - id: tab10
    label: Table 10
    kind: table
    file: assets/nasiriany-2026-robocasa365-a-large-scale-simulation-framework/tab10.png
    raw: raw/papers/nasiriany-2026-robocasa365-a-large-scale-simulation-framework-figures/tab10.png
    caption: "full fine-tuning과 LoRA 성공률 비교 (부록)"
    page: 23
    bbox_norm: [0.2152, 0.5318, 0.7815, 0.591]
    strategy: table-region
    curated: false
  - id: tab11
    label: Table 11
    kind: table
    file: assets/nasiriany-2026-robocasa365-a-large-scale-simulation-framework/tab11.png
    raw: raw/papers/nasiriany-2026-robocasa365-a-large-scale-simulation-framework-figures/tab11.png
    caption: "foundation model 학습 결과 상세 (부록)"
    page: 25
    bbox_norm: [0.2421, 0.1398, 0.7579, 0.8599]
    strategy: table-region
    curated: false
---

## 요약 (Summary)

RoboCasa365는 RoboCasa 위에 세운 가정용 mobile manipulation 벤치마크다. ICLR 2026 논문이고 저자는 앞 논문과 같은 UT Austin·NVIDIA Research 팀이다.

질문이 바뀌었다. 이 논문은 거기서부터 읽어야 한다. 2024년의 RoboCasa는 데이터를 어떻게 늘릴 것인가를 물었다. RoboCasa365는 지금 우리가 generalist robot에 얼마나 다가섰는지를 어떻게 잴 것인가를 묻는다. 실세계 평가는 자원이 많이 들고 실험 잡음에 흔들려 재현 가능한 비교가 어렵다는 진단에서 출발한다.

![[assets/nasiriany-2026-robocasa365-a-large-scale-simulation-framework/fig01.png]]
*Figure 1: RoboCasa365 개요. 장면·물체·가전 라이브러리 위에 skill 과제, long-horizon mobile manipulation, semantic reasoning 과제가 얹힌다 (Nasiriany et al. 2026, p.1)*

규모는 과제 365종, 주방 장면 2,500개, 물체 3,200개 이상, 로봇 상호작용 데이터 2,000시간 이상이다. 365개 중 220개가 mobile manipulation을 요구한다. 벤치마크로서 지원하는 학습 설정은 세 갈래다. 대규모 multi-task 학습, pre-training 후 target 데이터로 post-training하는 foundation model 학습, 단계마다 새 과제를 얹는 lifelong learning이다.

## 주요 기여 (Key Contributions)

먼저 최신 방법 네 종을 같은 조건에서 재고 그 결과를 공개했다. Diffusion Policy, π0, π0.5, GR00T N1.5를 300개 과제 사람 데이터로 학습시켜 50개 target 과제에서 잰다. 학습된 모델도 함께 열었다.

pre-training이 downstream 학습에 무엇을 주는지도 정량화했다. target 데이터 10%로 30% 수준을 내므로 데이터 효율이 약 3배 오른다.

pre-training 데이터를 어떻게 구성하느냐도 실험했다. 과제 다양성을 50개에서 300개로 늘리면 성능이 오르는 반면 MimicGen 합성 데이터를 섞으면 오히려 떨어진다. 앞 논문에서 성능 상승의 주된 근거였던 합성 데이터가 여기서는 부담이 된다.

## 방법론 및 아키텍처 (Methodology and Architecture)

### 장면을 두 묶음으로 가르기

이 벤치마크는 장면을 pre-training과 target으로 가른다. 설계의 핵심이다. pre-training 장면은 대규모 수집과 합성에 쓰고 target 장면은 목표 과제 데이터 수집과 평가 대부분에 쓴다.

![[assets/nasiriany-2026-robocasa365-a-large-scale-simulation-framework/fig02.png]]
*Figure 2: 주방 장면. 위가 pre-training용 2,500개 중 표본이고 아래가 target 10개 전부다 (Nasiriany et al. 2026, p.4)*

target은 RoboCasa의 layout 10개와 style 10개를 1:1로 짝지은 10개다. pre-training은 새 layout 50개와 새 style 50개의 조합으로 2,500개다. layout 50개는 Zillow에 매물로 올라온 미국 전역 실제 주택 50채에서 가져와 floor plan을 최대한 맞춘 digital cousin으로 세웠다. digital cousin은 실제 환경을 그대로 복제하는 대신 구조가 닮은 대응물을 시뮬레이터에 만드는 방식이다. 두 묶음의 style은 가구·가전·텍스처가 겹치지 않는다. 평가에서 본 적 없는 환경을 보장하려는 장치다.

asset도 늘었다. 가구·가전이 4개 범주 20개 인스턴스에서 12개 범주 456개 인스턴스가 됐다. 토스터·토스터오븐·스탠드믹서·블렌더·전기포트가 새로 들어왔고 냉장고·오븐·식기세척기에 관절이 붙었다. 범주마다 20~50개를 두어 미학습 인스턴스 일반화를 시험할 수 있게 했다.

### 과제 365종

atomic task는 RoboCasa의 25종에 40종을 더해 65종이다. skill 여덟 가지는 그대로다. composite task는 앞 논문의 방식을 이어받았다. LLM에게 활동 60개를 받고 활동마다 과제 청사진을 받는 방식이다. 기존 83개에 217개를 더해 300개가 됐다.

![[assets/nasiriany-2026-robocasa365-a-large-scale-simulation-framework/fig03.png]]
*Figure 3: composite task 300종의 구조. 6개 activity family 아래 60개 활동이 놓이고 활동마다 과제가 달린다 (Nasiriany et al. 2026, p.5)*

60개 활동은 다시 6개 activity family로 묶인다. 음료 준비, 조리, 정리·보관, 청소·살균, 식재료 준비, 상 차리기다. 과제 지시문은 "블렌더 뚜껑을 열고 배를 넣은 뒤 뚜껑을 닫고 블렌더를 켜라"처럼 여러 단계가 한 문장에 들어간다.

### 데이터

pre-training 데이터는 300개 과제(atomic 65 + composite 235)를 덮고 과제당 사람 시연 100개씩 30k개다. 수집에는 Omron 모바일 베이스를 얹은 Franka Panda Emika를 썼다. 여기에 MimicGen으로 atomic task 60개를 과제당 10k개씩 합성해 100배로 불렸다.

target 데이터는 대표 50개 과제를 고른다. Atomic 18개, Composite-Seen 16개, Composite-Unseen 16개다. Composite-Unseen은 pre-training에 없는 활동에서 뽑아 pre-training 효과만 따로 보려는 장치다. 과제당 500개씩 25k개를 모았다.

시간으로 재면 합성 데이터 1,615시간, 사람 pre-training 404시간, 사람 target 208시간이다. episode 길이는 10~60초에 몰려 있고 3분을 넘는 것도 있다.

## 결과 (Results)

### 네 방법을 같은 조건에서 재면

![[assets/nasiriany-2026-robocasa365-a-large-scale-simulation-framework/tab01.png]]
*Table 1: multi-task 학습 결과. pre-training 사람 데이터 300개 과제로 학습해 target 50개 과제에서 잰 성공률 (Nasiriany et al. 2026, p.7)*

순서는 GR00T N1.5(20.0) > π0.5(16.9) > π0(15.0) > Diffusion Policy(6.1)다. Composite-Unseen은 pre-training에 없던 과제라 zero-shot 평가인데 여기서 GR00T N1.5만 4.4로 눈에 띄고 나머지는 1 안팎이다.

저자들은 이걸 GR00T N1.5가 결정적으로 낫다는 뜻으로 읽지 말라고 명시한다. 배치 크기 같은 연산량, 데이터 구성, 시각·언어 backbone을 fine-tuning했는지 여부가 결과를 흔들 수 있어서다. 다만 고용량 VLA가 크고 다양한 multi-task 데이터에 더 잘 맞는다는 방향은 읽어낸다.

### pre-training은 데이터 효율을 3배로 올린다

이후 실험은 모두 GR00T N1.5로 돌린다.

![[assets/nasiriany-2026-robocasa365-a-large-scale-simulation-framework/tab02.png]]
*Table 2: foundation model 학습 결과. pre-training only, target only, pre-training 후 post-training 세 조건 (Nasiriany et al. 2026, p.8)*

![[assets/nasiriany-2026-robocasa365-a-large-scale-simulation-framework/fig05.png]]
*Figure 5: 같은 결과의 평균값 곡선. target demo 수를 늘려가며 세 조건을 비교한다 (Nasiriany et al. 2026, p.8)*

pre-training만으로는 atomic에서 41.9%가 나오지만 composite은 사실상 0이다. target만 쓰면 데이터가 많아야 쓸 만해진다(10% 21.0 → 100% 43.7). 둘을 합치면 target 10%로 35.9를 내는데 이는 target만 쓴 30%(34.3)를 넘는 값이다. 데이터 효율이 대략 3배 오른다. 이득은 Composite-Unseen에서 특히 크다.

### lifelong learning은 여전히 뚫리지 않는다

![[assets/nasiriany-2026-robocasa365-a-large-scale-simulation-framework/tab03.png]]
*Table 3: lifelong learning 결과. 4단계에 걸쳐 점점 긴 과제를 학습하고 매 단계마다 이전 과제까지 함께 평가한다 (Nasiriany et al. 2026, p.9)*

대각선을 따라가면 새로 배우는 과제의 성공률이 24.5 → 11.3 → 4.3으로 떨어진다. 과제가 길어질수록 데이터 요구가 커지기 때문이다. 세로로 보면 이전 단계 과제 성능이 계속 무너진다. atomic이 41.5에서 10.6까지, 2~3단계 과제가 24.5에서 1.7까지 내려간다. catastrophic forgetting은 새 과제를 배우면서 이전 과제 성능이 무너지는 현상이다. 이 표가 그 모양을 그대로 담고 있다.

### 합성 데이터가 오히려 해가 된다

![[assets/nasiriany-2026-robocasa365-a-large-scale-simulation-framework/tab04.png]]
*Table 4: pre-training 데이터 구성 비교. Human50·Human300·Human300+MG60을 저데이터(10%)와 고데이터(100%) 구간에서 각각 잰다 (Nasiriany et al. 2026, p.9)*

과제 다양성 쪽 결과는 예상대로다. pre-training 과제를 50개에서 300개로 늘리면 저데이터 구간 평균이 34.7에서 40.0으로 오르고 Composite-Unseen에서 23.8 → 32.3으로 가장 크게 벌어진다. 과제 종류를 늘리는 것이 새 과제 학습에 특히 유효하다.

예상 밖은 MimicGen 쪽이다. Human300+MG60(35.9)이 사람 데이터만 쓴 Human300(40.0)보다 낮다. 저자들은 합성 시연의 품질이 고르지 않은 탓으로 본다. RoboCasa 2024가 "합성 데이터를 늘릴수록 오른다"를 핵심 결과로 내세웠던 것과 견주면 정반대다. 차이는 조건에 있다. 앞 논문은 atomic task를 scratch로 학습할 때를 쟀고 여기서는 이미 대규모 사람 데이터가 있는 상태에서 합성 데이터를 더 얹을 때를 잰다.

### 실기기

DROID Panda 팔과 카메라 3대로 실제 주방에서 네 과제를 시험했다. 시연 140개로 학습하고 과제당 20회 평가했다.

![[assets/nasiriany-2026-robocasa365-a-large-scale-simulation-framework/tab05.png]]
*Table 5: 실기기 평가. 실세계 데이터만 쓴 경우와 시뮬레이션을 섞은 경우 (Nasiriany et al. 2026, p.10)*

평균 61.8%에서 79.8%로 18%p 오른다. Sim-and-Real 설정은 시뮬레이션 과제 중 성적 좋은 150개로 mid-training한 뒤 실세계 시연과 대응 시뮬레이션 데이터를 함께 co-fine-tuning한다. 이때 시뮬레이션 데이터를 실기기 카메라 시점에 맞춰 다시 렌더해 전이를 도왔다.

## 한계 (Limitations)

저자들은 도메인과 사실성을 한계로 든다. 벤치마크가 주방에 한정돼 다른 가정 환경으로 결과가 옮겨 가는지 알 수 없고 데이터가 크더라도 실세계의 감각적·물리적 복잡성을 다 담지는 못한다.

읽는 쪽에서 덧붙일 것도 있다. 방법 비교는 네 종에 그치고 나머지 세 실험은 GR00T N1.5 하나로만 돌렸다. 결론이 특정 모델 구조에 얼마나 묶여 있는지 확인할 길이 없다. 시행 횟수와 편차도 표에 없다. 데이터 시간 수치는 §3.4.3의 404시간과 §4.2의 411시간이 같은 대상을 두고 어긋난다. MimicGen 데이터가 해롭다는 결과도 "품질이 고르지 않다"는 한 문장에 머물러 어떤 종류의 결함이 어떻게 학습을 망치는지는 밝혀지지 않았다.

## 이 저장소 안에서의 위치 (Position in This Wiki)

이 저장소의 physical-ai 페이지 상당수는 VLA 계보를 따라간다. RT-1에서 RT-2, OpenVLA, π 계열, GR00T로 이어지는 모델 쪽 계보다. RoboCasa365는 그 계보를 한자리에 세워 같은 자로 재는 페이지다.

[[physical-ai/nasiriany-2024-robocasa-large-scale-simulation-of-everyday|RoboCasa]]가 직접 전신이고 장면·과제·데이터를 각각 20배·3.65배·20배 남짓 키웠다. 두 논문은 결론까지 갈린다. 앞 논문은 MimicGen 합성 데이터를 성능 상승의 근거로 삼았는데 여기서는 사람 데이터만 쓴 쪽이 더 낫다. 조건이 달라서 생긴 차이지만 "합성 데이터로 규모를 키우면 된다"는 명제를 그대로 믿기는 어려워진다.

평가 대상 중 [[physical-ai/nvidia-2025-gr00t-n1-5-an-improved-open|GR00T N1.5]]가 이 벤치마크의 기준 모델이다. 그쪽 페이지가 보고한 "RoboCasa 과제당 demo 30개에서 17.4 → 47.5"는 앞 세대 RoboCasa 환경의 수치이고 이 논문은 훨씬 넓어진 365개 과제 위에서 같은 모델을 다시 잰다. [[physical-ai/black-2024-pi0-a-vision-language-action-flow-model|π0]]와 [[physical-ai/black-2025-pi05-a-vision-language-action-model-with|π0.5]]도 같은 표에 함께 놓인다. 각 모델 페이지가 자기 논문의 자체 평가를 담는다면 이 페이지는 제3자 조건의 대조표를 담는다.

lifelong learning 결과는 이 저장소에서 드물게 부정적 결과를 정면으로 다루는 자리다. 4단계를 지나며 이전 과제 성능이 무너지는 표가 그대로 실려 있고 저자들도 이걸 해결이 아니라 과제로 남긴다.

## 관련 페이지 (Related Pages)

- [[physical-ai/nasiriany-2024-robocasa-large-scale-simulation-of-everyday]] — 직접 전신. 장면 120개·과제 100종·MimicGen 10만 trajectory. 합성 데이터에 대한 결론이 이 논문과 갈린다
- [[physical-ai/robocasa-robocasa]] — 공식 구현 저장소. RoboCasa365 v1.0 릴리스와 leaderboard 안내
- [[physical-ai/robocasa-2026-robocasa365-project-page]] — 프로젝트 홈페이지. 두 논문을 함께 소개한다
- [[physical-ai/nvidia-2025-gr00t-n1-5-an-improved-open]] — 이 벤치마크의 기준 모델이자 multi-task 비교 1위
- [[physical-ai/black-2024-pi0-a-vision-language-action-flow-model]] — 비교 대상 중 하나. flow matching 기반 VLA
- [[physical-ai/black-2025-pi05-a-vision-language-action-model-with]] — 비교 대상 중 하나. π0의 후속
- [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation]] — RoboCasa Kitchen 24개 과제를 주요 벤치마크로 쓴 앞 세대 사례
- [[overviews/physical-ai-overview]] — physical-ai 분류 기준과 학습 경로 허브
