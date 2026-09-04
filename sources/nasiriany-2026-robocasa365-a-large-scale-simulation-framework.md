---
title: "RoboCasa365: A Large-Scale Simulation Framework for Training and Benchmarking Generalist Robots"
type: paper
year: 2026
category: physical-ai
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

## 한 줄 요약 (One-line Summary)

RoboCasa365는 RoboCasa 위에 세운 가정용 mobile manipulation 벤치마크다. 주방 장면 2,500개에 일상 과제 365종을 담고 사람 시연 612시간과 합성 시연 1,615시간을 붙였다. Diffusion Policy·π0·π0.5·GR00T N1.5를 같은 조건에서 재고 pre-training이 downstream 학습의 데이터 효율을 약 3배로 올린다는 것과 lifelong learning에서 catastrophic forgetting이 그대로 남는다는 것을 보인다.

## 1. 자료 정보 (Document Information)

- **제목**: RoboCasa365: A Large-Scale Simulation Framework for Training and Benchmarking Generalist Robots
- **저자**: Soroush Nasiriany·Sepehr Nasiriany·Abhiram Maddukuri (공동 1저자), Yuke Zhu. UT Austin·NVIDIA Research
- **발표**: arXiv 2603.04356, ICLR 2026 conference paper
- **프로젝트**: https://robocasa.ai — leaderboard 운영
- **한 줄 성격**: RoboCasa(RSS 2024)의 후속. 시뮬레이터 소개에서 벤치마크 논문으로 무게 중심을 옮겼다. 무엇을 만들었는지보다 어떤 요인이 generalist policy 성능을 좌우하는지를 재는 데 지면 대부분을 쓴다.

## 2. 주요 기여 (Key Contributions)

문제 설정부터 앞 논문과 다르다. RoboCasa는 "데이터를 어떻게 늘릴 것인가"를 물었고 RoboCasa365는 "지금 우리가 generalist robot에 얼마나 가까운지를 어떻게 잴 것인가"를 묻는다. 실세계 평가가 자원을 많이 쓰고 실험 잡음에 흔들려 재현 가능한 비교가 어렵다는 진단에서 출발한다.

과제가 365종(atomic 65 + composite 300), 주방 장면이 2,500개, 물체가 3,200개 이상으로 늘었다. 로봇 상호작용 데이터는 2,000시간을 넘는다. 365개 과제 중 220개는 mobile manipulation을 요구하고 145개는 팔만으로 된다.

벤치마크에서 돌릴 수 있는 학습 설정은 대규모 multi-task 학습, pre-training 후 target 데이터로 post-training하는 foundation model 학습, 단계마다 새 과제를 얹는 lifelong learning이다. 최신 방법 네 종을 같은 조건에서 돌려 결과를 비교했고 모델을 공개했다.

pre-training 데이터의 과제 다양성이 downstream 성능에 크게 기여하는 반면 MimicGen 합성 데이터를 섞으면 오히려 떨어진다는 결과를 내놓는다. 분석 쪽 기여도 분명하다. 앞 논문의 핵심 주장 하나가 여기서 뒤집힌다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### asset 확장

RoboCasa의 물체 2,509개(153개 범주)를 그대로 쓰고 57개 범주의 고품질 3D asset을 더했다. 새 asset은 아티스트가 만들고 품질 기준에 맞춰 손봤다.

가구·가전 쪽 변화가 더 크다. RoboCasa는 싱크·커피머신·가스레인지·전자레인지 4개 범주 20개 인스턴스였는데, RoboCasa365는 12개 범주 456개 인스턴스다. 토스터·토스터오븐·스탠드믹서·블렌더·전기포트가 새로 들어왔고 냉장고·오븐·식기세척기에도 관절이 붙었다. 범주마다 20~50개 인스턴스를 두어 미학습 인스턴스로의 일반화를 시험할 수 있게 했다.

### 장면을 pre-training과 target으로 가르기

장면을 두 묶음으로 나눈다. pre-training 장면은 대규모 데이터 수집과 합성에 쓰고 target 장면은 목표 과제 데이터 수집과 평가 대부분에 쓴다.

target은 RoboCasa의 10개 layout과 10개 style을 1:1로 짝지은 10개 장면이다. pre-training은 새로 만든 50개 layout과 50개 style을 조합해 2,500개를 만들었다. layout 50개는 Zillow에 매물로 올라온 미국 전역 실제 주택 50채에서 가져와 floor plan을 최대한 맞춘 digital cousin으로 만들었다. digital cousin은 실제 환경을 그대로 복제하는 대신 구조가 닮은 대응물을 시뮬레이터에 세우는 방식이다. pre-training style과 target style은 가구·가전·텍스처가 겹치지 않게 했다.

### 과제 365종

atomic task는 RoboCasa의 25종에 40종을 더해 65종이다. 새 가전과 새 동작을 다루려고 늘렸고 skill 여덟 가지는 그대로 유지한다.

composite task는 RoboCasa와 같은 방식으로 만든다. LLM에게 주방 활동 상위 60개를 받고 활동마다 과제 청사진을 받아 코드로 옮긴다. 청사진에는 과제 이름과 설명, 필요한 물체와 가전, skill 순서가 들어 있다. RoboCasa의 composite task 중 83개를 가져오고 217개를 새로 만들어 300개가 됐다. 60개 활동은 다시 6개 activity family로 묶인다. 음료 준비, 조리, 정리·보관, 청소·살균, 식재료 준비, 상 차리기다.

### 데이터셋

pre-training 데이터는 365개 중 300개 과제를 덮는다. atomic 65개와 composite 235개이며 과제당 사람 시연 100개씩 총 30k개다. 수집에는 Omron 모바일 베이스를 얹은 Franka Panda Emika를 썼다. 여기에 MimicGen으로 atomic task 60개에 대해 과제당 10k개를 합성해 100배로 불렸다.

target 데이터로는 365개 과제 가운데 대표 50개만 고른다. Atomic 18개, Composite-Seen 16개, Composite-Unseen 16개로 나뉘고 과제당 사람 시연을 500개씩 모아 총 25k개를 만들었다. Composite-Unseen은 pre-training에 없는 활동 16개에서 뽑아 pre-training 효과를 격리해서 보려는 목적이다.

시간으로 재면 합성 pre-training 데이터가 1,615시간으로 가장 크고 사람 pre-training 데이터가 404시간, 사람 target 데이터가 208시간이다. 과제별 하위 단계 수는 1~2개가 대부분이고 15개 이상인 긴 과제가 꼬리로 붙는다. episode 길이는 10~60초에 몰려 있고 3분을 넘는 것도 있다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### multi-task 학습

pre-training 사람 데이터 300개 과제 30k개로 언어 조건부 policy를 학습하고 target 50개 과제에서 잰다. Composite-Unseen은 pre-training에 없으므로 zero-shot 평가다. π0·π0.5·GR00T N1.5는 공개 체크포인트에서 출발했다.

| Task Split | Diffusion Policy | π0 | π0.5 | GR00T N1.5 |
|---|---|---|---|---|
| Atomic | 15.7 | 36.3 | 39.6 | 43.0 |
| Composite-Seen | 0.2 | 5.2 | 7.1 | 9.6 |
| Composite-Unseen | 1.25 | 0.7 | 1.2 | 4.4 |
| 평균 | 6.1 | 15.0 | 16.9 | 20.0 |

순서는 GR00T N1.5 > π0.5 > π0 > Diffusion Policy다. 저자들은 이걸 GR00T N1.5가 결정적으로 낫다는 뜻으로 읽지 말라고 못 박는다. 배치 크기 같은 연산량, 데이터 구성, 시각·언어 backbone을 fine-tuning했는지 여부가 결과를 흔들 수 있어서다. 다만 고용량 VLA가 크고 다양한 multi-task 데이터에 더 잘 맞는다는 방향성은 읽어낸다.

### foundation model 학습

이후 실험은 모두 GR00T N1.5로 돌린다. pre-training 데이터로 먼저 학습한 뒤 target 분할별로 따로 post-training한다. target 데이터는 과제당 50·150·500개(10%·30%·100%)로 나눠 비교한다.

| Task Type | Pre-training only | Target 10% | Target 30% | Target 100% | Pre+Post 10% | Pre+Post 30% | Pre+Post 100% |
|---|---|---|---|---|---|---|---|
| Atomic | 41.9 | 38.7 | 50.6 | 60.6 | 56.9 | 59.1 | 68.5 |
| Composite-Seen | 0.0 | 11.0 | 22.7 | 35.0 | 25.4 | 34.6 | 40.6 |
| Composite-Unseen | 0.2 | 11.2 | 27.5 | 33.3 | 22.7 | 30.8 | 42.1 |
| 평균 | 15.1 | 21.0 | 34.3 | 43.7 | 35.9 | 42.2 | 51.1 |

pre-training만으로는 atomic에서 41.9%를 내지만 composite은 0에 가깝다. target만 쓰면 데이터가 많아야 쓸 만해진다. 둘을 합치면 target 10%로 target 30% 수준을 내므로 데이터 효율이 대략 3배 오른다. 이득은 Composite-Unseen에서 특히 크다.

### lifelong learning

4단계로 나눠 점점 긴 과제를 학습시킨다. 1단계는 atomic 65개, 2단계는 2~3단계 composite 20개, 3단계는 4~5단계 20개, 4단계는 6단계 이상 20개다. 단계 N에서는 N-1의 모델을 가져와 N의 데이터로 fine-tuning하고 1~N 과제 전부를 평가한다.

| Phase | Atomic | 2-3단계 | 4-5단계 | 6단계 이상 |
|---|---|---|---|---|
| Phase 1 | 41.5 | - | - | - |
| Phase 2 | 13.9 | 24.5 | - | - |
| Phase 3 | 13.9 | 4.8 | 11.3 | - |
| Phase 4 | 10.6 | 1.7 | 2.7 | 4.3 |

대각선을 따라 새 과제 성공률이 24.5 → 11.3 → 4.3으로 떨어진다. 긴 과제일수록 데이터 요구가 크기 때문이다. 세로로 보면 이전 단계 과제 성능이 계속 무너진다. atomic이 41.5에서 10.6까지, 2~3단계가 24.5에서 1.7까지 내려간다. catastrophic forgetting은 새 과제를 배우면서 이전 과제 성능이 무너지는 현상이다. 표의 세로줄이 정확히 그 모습이다.

### pre-training 데이터 구성

| Target 데이터 | pre-training 없음 | Human50 | Human300 | Human300 + MG60 |
|---|---|---|---|---|
| Atomic (10%) | 38.7 | 52.0 | 57.0 | 56.9 |
| Composite-Seen (10%) | 11.0 | 26.2 | 28.7 | 25.4 |
| Composite-Unseen (10%) | 11.2 | 23.8 | 32.3 | 22.7 |
| 평균 (10%) | 21.0 | 34.7 | 40.0 | 35.9 |
| 평균 (100%) | 43.7 | 50.0 | 52.5 | 51.1 |

과제 다양성을 50개에서 300개로 늘리면 downstream 성능이 오르고 특히 저데이터 구간과 Composite-Unseen에서 크게 오른다. MimicGen 합성 데이터를 섞은 Human300+MG60은 사람 데이터만 쓴 Human300보다 낮다. 합성 시연의 품질이 고르지 않은 탓이라는 게 저자들의 설명이다. 품질이 뒤섞인 대규모 데이터를 잘 쓰는 방법은 향후 과제로 남는다.

### 실기기 평가

DROID Panda 팔과 카메라 3대로 실제 주방에서 네 과제를 시험했다. 전기포트 뚜껑 닫기, 토스터오븐에서 조리대로 옮기기, 조리대에서 수납장으로 옮기기, 싱크에서 식기건조대로 두 개 옮기기다. 시연은 앞 셋에 30개씩, 마지막 과제에 50개를 모아 총 140개를 썼다. 과제당 20회 평가했다.

| 과제 | Real Only | Sim-and-Real |
|---|---|---|
| CloseElectricKettleLid | 70 | 70 |
| PickPlaceToasterOvenToCounter | 70 | 100 |
| PickPlaceCounterToCabinet | 52 | 84 |
| PlaceOnDishRack | 55 | 65 |
| 평균 | 61.8 | 79.8 |

Sim-and-Real은 시뮬레이션 과제 중 성적이 좋은 150개로 mid-training한 뒤 실세계 시연과 대응 시뮬레이션 데이터를 함께 co-fine-tuning한 설정이다. 시뮬레이션 데이터를 실기기 카메라 시점에 맞춰 다시 렌더해 전이를 도왔다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

저자들은 한계를 직접 짚는다. 벤치마크가 주방에 한정돼 있어 다른 가정 환경이나 더 넓은 도메인으로 결과가 옮겨 가는지 알 수 없다. 데이터가 크더라도 실세계의 감각적·물리적 복잡성을 다 담지는 못한다.

읽는 쪽에서 덧붙일 것도 있다. 방법 비교가 GR00T N1.5·π0·π0.5·Diffusion Policy 네 종에 그친다. 세 실험(foundation model·lifelong·데이터 구성)은 GR00T N1.5 하나로만 돌렸다. 결론이 특정 모델 구조에 얼마나 묶여 있는지는 확인되지 않는다. 시행 횟수와 편차도 표에 없다. 데이터 시간 수치도 §3.4.3의 404시간과 §4.2의 411시간이 같은 대상을 두고 어긋난다.

MimicGen 데이터가 오히려 해롭다는 결과는 앞 논문의 주된 주장과 정면으로 부딪히는데, 왜 그런지에 대한 분석은 "품질이 고르지 않다"는 한 문장에 머문다.

## 6. 관련 연구 (Related Work)

시뮬레이션 프레임워크로는 RoboSuite·ManiSkill·Isaac Lab·Habitat·AI2-THOR·Behavior-1K·LIBERO·ProcTHOR가 인용된다. 이 중 Behavior-1K가 환경·과제 다양성에서 앞서지만 그에 맞는 대규모 데이터셋이 없다는 게 저자들의 대비 지점이다. RoboCasa는 100k 시연에 과제 30개·장면 100개였고 RoboCasa365는 500k 이상 시연에 과제 300개 이상·장면 2,500개다.

실세계 데이터셋으로는 RT-1·BridgeData·DROID·Open X-Embodiment가, 실세계 평가 시도로는 RoboArena가 언급된다.

generalist policy 쪽으로는 Octo·RT-2·OpenVLA·SmolVLA·π0·π0.5·GR00T N1.5가 인용된다. 이 논문은 모델을 새로 제안하지 않고 이 모델들을 재는 자리에 선다.

## 7. 용어집 (Glossary)

이 자료 고유 용어만 정리한다. policy·trajectory·pre-training·fine-tuning·catastrophic forgetting 등 도메인 공통 용어는 [[overviews/glossary-physical-ai]]·[[overviews/glossary-llms]]에 위임한다.

- **RoboCasa365**: RoboCasa 위에 세운 가정용 mobile manipulation 벤치마크. 과제 365종·주방 장면 2,500개·데이터 2,200시간 이상.
- **activity family**: composite task를 묶는 상위 범주 6종(음료 준비·조리·정리 보관·청소 살균·식재료 준비·상 차리기). 그 아래 활동 60개가 놓인다.
- **pretraining / target split**: 장면과 데이터를 가르는 두 묶음. pre-training은 2,500개 장면·300개 과제, target은 10개 장면·50개 과제이며 style이 겹치지 않는다.
- **Composite-Seen / Composite-Unseen**: target 과제 분할. 앞은 pre-training에 있던 활동, 뒤는 없던 활동에서 뽑아 pre-training 효과를 격리한다.
- **digital cousin**: 실제 환경을 그대로 복제하지 않고 구조가 닮은 대응물을 시뮬레이터에 세우는 방식 (Dai 2024). Zillow 매물 50채를 이 방식으로 옮겼다.
- **stage**: 과제 길이를 세는 단위. RoboCasa가 정의한 skill 하나를 부르는 것이 1 stage다.
- **Sim-and-Real**: 시뮬레이션 150개 과제로 mid-training한 뒤 실세계 시연과 대응 시뮬레이션 데이터를 함께 co-fine-tuning하는 실기기 학습 설정.

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 1 | RoboCasa365 개요 — 장면·물체·가전·과제 유형 | caption-region | ★ wiki 권장 (concept) |
| fig02 | 4 | 주방 장면 — pre-training 표본과 target 10개 | caption-region | ★ wiki 권장 (method) |
| fig03 | 5 | composite task 300종의 activity family 구조 | manual | ★ wiki 권장 (method) |
| fig04 | 6 | 하위 단계 수·episode 길이 분포 | caption-region | (선택) |
| fig05 | 8 | foundation model 학습 곡선 | caption-region | ★ wiki 권장 (result) |
| fig06 | 10 | 실기기 플랫폼 | caption-region | (선택) |
| fig07 | 18 | Atomic-Seen 18개 과제 (부록) | caption-region | (선택) |
| fig08 | 19 | Composite-Seen 16개 과제 (부록) | caption-region | (선택) |
| fig09 | 20 | Composite-Unseen 16개 과제 (부록) | caption-region | (선택) |
| fig10 | 21 | 카메라 3시점 이미지 (부록) | caption-region | (선택) |
| tab01 | 7 | multi-task 학습 결과 4개 방법 비교 | table-region | ★ wiki 권장 (result) |
| tab02 | 8 | foundation model 학습 결과 | table-region | ★ wiki 권장 (result) |
| tab03 | 9 | lifelong learning 결과 | table-region | ★ wiki 권장 (result) |
| tab04 | 9 | pre-training 데이터 구성 비교 | table-region | ★ wiki 권장 (result) |
| tab05 | 10 | 실기기 평가 | table-region | ★ wiki 권장 (result) |
| tab06 | 16 | 가구·가전 인벤토리 (부록) | table-region | (선택) |
| tab07 | 21 | 데이터셋 통계 (부록) | table-region | (선택) |
| tab08 | 22 | pre-training 장면 다양성 (부록) | table-region | (선택) |
| tab09 | 23 | perturbation 조건별 강건성 (부록) | table-region | (선택) |
| tab10 | 23 | full fine-tuning vs LoRA (부록) | table-region | (선택) |
| tab11 | 25 | foundation model 결과 상세 (부록) | table-region | (선택) |
