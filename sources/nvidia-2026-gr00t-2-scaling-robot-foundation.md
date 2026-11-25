---
title: "GR00T 2: Scaling Robot Foundation Models for Generalization, Dexterity, and Adaptation"
type: paper
year: 2026
category: physical-ai
raw_path: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation.pdf
raw_filename: "nvidia-2026-gr00t-2-scaling-robot-foundation.pdf"
source_collection: external
authors: "NVIDIA"
url: "https://research.nvidia.com/labs/gear/gr00t-2/assets/gr00t2_whitepaper.pdf"
tags: [physical-ai, world-model, robot-learning, humanoid]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig01.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig01.png
    caption: "사람과 로봇의 영상에서 미래 장면과 제어 명령을 함께 학습하는 GR00T 2의 입출력과 응용"
    page: 4
    bbox_norm: [0.0947, 0.0939, 0.9054, 0.6198]
    strategy: caption-region
    curated: false
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig02.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig02.png
    caption: "Dexter 시연 수에 따른 50개 과제의 평균 성공률과 과제별 분포"
    page: 6
    bbox_norm: [0.0947, 0.0939, 0.9053, 0.2586]
    strategy: caption-region
    curated: false
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig03.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig03.png
    caption: "YAM의 장난감 자동차 조립과 Dexter의 배송 라벨 부착 순서"
    page: 7
    bbox_norm: [0.0889, 0.5709, 0.9111, 0.7531]
    strategy: manual
    curated: false
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig04.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig04.png
    caption: "센서 장갑, DexUMI, 휴대형 그리퍼, 시뮬레이션을 거쳐 기술을 옮기는 네 경로"
    page: 8
    bbox_norm: [0.0947, 0.0939, 0.9053, 0.4011]
    strategy: caption-region
    curated: false
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig05.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig05.png
    caption: "실제 로봇의 접촉 과제 네 가지에서 지도학습과 강화학습 이후의 성공률"
    page: 10
    bbox_norm: [0.0947, 0.0939, 0.9053, 0.2691]
    strategy: caption-region
    curated: false
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig06.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig06.png
    caption: "상위 에이전트가 WAM과 복구 도구를 호출하는 실행 구조"
    page: 10
    bbox_norm: [0.0947, 0.3329, 0.9053, 0.575]
    strategy: caption-region
    curated: false
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig07.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig07.png
    caption: "장난감 조립과 연속 삽입에서 에이전트와 학습 방식에 따른 성공 횟수"
    page: 11
    bbox_norm: [0.0947, 0.0939, 0.9053, 0.2974]
    strategy: caption-region
    curated: false
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig08.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig08.png
    caption: "물체와 목적지를 카메라 영상에 표시했을 때의 짧은 지시와 여러 단계 과제 결과"
    page: 12
    bbox_norm: [0.1342, 0.3476, 0.8658, 0.5924]
    strategy: caption-region
    curated: false
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig09.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig09.png
    caption: "추론 모델에서 Turbo를 거쳐 SONIC으로 이어지는 humanoid 제어 구조"
    page: 13
    bbox_norm: [0.1241, 0.1007, 0.8759, 0.3232]
    strategy: caption-region
    curated: false
  - id: fig10
    label: Figure 10
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig10.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig10.png
    caption: "사람 영상의 학습 비율에 따른 실제 Dexter와 생성 영상의 성공률 및 진행도"
    page: 15
    bbox_norm: [0.0947, 0.0939, 0.9053, 0.3078]
    strategy: caption-region
    curated: false
  - id: fig11
    label: Figure 11
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig11.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig11.png
    caption: "YAM V2에서 체크포인트 개발 시점에 따라 달라진 상대 Elo"
    page: 17
    bbox_norm: [0.0899, 0.0949, 0.4661, 0.3091]
    strategy: manual
    curated: false
  - id: fig12
    label: Figure 12
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig12.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig12.png
    caption: "센서 장갑으로 기록한 손동작을 로봇에 옮기는 절차"
    page: 18
    bbox_norm: [0.0947, 0.0939, 0.9053, 0.3339]
    strategy: caption-region
    curated: false
  - id: fig13
    label: Figure 13
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig13.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig13.png
    caption: "사람이 시연한 실험실 과제와 Dexter가 실행한 장면"
    page: 18
    bbox_norm: [0.0947, 0.694, 0.9053, 0.8356]
    strategy: caption-region
    curated: false
  - id: fig14
    label: Figure 14
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig14.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig14.png
    caption: "YAM 데이터를 함께 학습했을 때 달라지는 예상 손목 카메라 영상"
    page: 19
    bbox_norm: [0.0947, 0.0939, 0.9053, 0.2969]
    strategy: caption-region
    curated: false
  - id: fig15
    label: Figure 15
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig15.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig15.png
    caption: "바나나 요구르트를 만드는 DexUMI 시연과 로봇 실행"
    page: 19
    bbox_norm: [0.0947, 0.3737, 0.9053, 0.5338]
    strategy: caption-region
    curated: false
  - id: fig16
    label: Figure 16
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig16.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig16.png
    caption: "사람 영상 한 편에서 시뮬레이션 시연을 만들어 실제 손으로 옮기는 과정"
    page: 20
    bbox_norm: [0.0965, 0.0941, 0.9027, 0.2572]
    strategy: caption-region
    curated: false
  - id: fig17
    label: Figure 17
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig17.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig17.png
    caption: "실제 작업대와 시뮬레이션에서 재구성한 과제의 대응"
    page: 21
    bbox_norm: [0.0947, 0.0939, 0.9053, 0.2792]
    strategy: caption-region
    curated: false
  - id: fig18
    label: Figure 18
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig18.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig18.png
    caption: "YAM 체크포인트별 실제 환경과 시뮬레이션의 진행도, 성공률, Elo"
    page: 21
    bbox_norm: [0.0947, 0.33, 0.9053, 0.5411]
    strategy: caption-region
    curated: false
  - id: fig19
    label: Figure 19
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig19.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig19.png
    caption: "RTX 5090과 Jetson Thor에서 최적화 단계별 G1 예측 지연"
    page: 23
    bbox_norm: [0.0947, 0.0939, 0.9053, 0.2737]
    strategy: caption-region
    curated: false
  - id: fig20
    label: Figure 20
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig20.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig20.png
    caption: "과제 구간에 따라 예측한 동작의 실행 속도를 조절하는 과정"
    page: 24
    bbox_norm: [0.0947, 0.0939, 0.9053, 0.2554]
    strategy: caption-region
    curated: false
  - id: fig21
    label: Figure 21
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig21.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig21.png
    caption: "YAM long-horizon 과제 여섯 가지의 시작 장면과 수행 단계"
    page: 38
    bbox_norm: [0.0963, 0.1835, 0.9038, 0.6686]
    strategy: caption-region
    curated: false
  - id: fig22
    label: Figure 22
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig22.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig22.png
    caption: "Dexter long-horizon 과제 일곱 가지의 시작 장면과 수행 단계"
    page: 39
    bbox_norm: [0.0963, 0.0947, 0.9038, 0.6599]
    strategy: caption-region
    curated: false
  - id: fig23
    label: Figure 23
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig23.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig23.png
    caption: "YAM 여섯 과제에서 모델별 평균 진행도와 호출 지연"
    page: 40
    bbox_norm: [0.1737, 0.0939, 0.8263, 0.2973]
    strategy: caption-region
    curated: false
  - id: fig24
    label: Figure 24
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig24.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig24.png
    caption: "Dexter-50의 개별 과제에서 시연 수에 따른 성공률"
    page: 42
    bbox_norm: [0.0947, 0.0939, 0.9053, 0.5337]
    strategy: caption-region
    curated: false
  - id: fig25
    label: Figure 25
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig25.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig25.png
    caption: "Dexter가 처음부터 성공한 과제와 시연 추가 후 성공한 과제"
    page: 43
    bbox_norm: [0.0947, 0.0939, 0.9053, 0.688]
    strategy: caption-region
    curated: false
  - id: fig26
    label: Figure 26
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig26.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig26.png
    caption: "센서 장갑으로 기록한 네 가지 과제의 세부 단계"
    page: 45
    bbox_norm: [0.0947, 0.0939, 0.9053, 0.4254]
    strategy: caption-region
    curated: false
  - id: fig27
    label: Figure 27
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig27.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig27.png
    caption: "로봇 시연 수와 학습 구성에 따른 사람 시연 전이의 성공률과 진행도"
    page: 46
    bbox_norm: [0.0947, 0.0939, 0.9053, 0.3634]
    strategy: caption-region
    curated: false
  - id: fig28
    label: Figure 28
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig28.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig28.png
    caption: "사람만 시연한 과제에서 로봇의 첫 장면으로 생성한 미래 영상"
    page: 47
    bbox_norm: [0.0947, 0.0939, 0.9053, 0.3518]
    strategy: caption-region
    curated: false
  - id: fig29
    label: Figure 29
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig29.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig29.png
    caption: "휴대형 그리퍼로 시연하고 YAM이 실행한 세 과제의 장면"
    page: 49
    bbox_norm: [0.0947, 0.0939, 0.9053, 0.2991]
    strategy: caption-region
    curated: false
  - id: fig30
    label: Figure 30
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig30.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig30.png
    caption: "DexUMI 시연과 로봇 손 실행으로 비교한 세 가지 양손 과제"
    page: 51
    bbox_norm: [0.0947, 0.2493, 0.9053, 0.6868]
    strategy: caption-region
    curated: false
  - id: fig31
    label: Figure 31
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig31.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig31.png
    caption: "사람 영상, 시뮬레이션 학습, 실제 로봇 손을 잇는 도구를 쓰는 기술 전이"
    page: 55
    bbox_norm: [0.1342, 0.0939, 0.8658, 0.39]
    strategy: caption-region
    curated: false
  - id: fig32
    label: Figure 32
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig32.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig32.png
    caption: "그리퍼 UMI 데이터에 수록된 기술별 시연 건수"
    page: 61
    bbox_norm: [0.0947, 0.2396, 0.9058, 0.4869]
    strategy: caption-region
    curated: false
  - id: fig33
    label: Figure 33
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig33.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig33.png
    caption: "Tianji와 Sharpa 손을 구동하는 teleoperation 장치와 업그레이드"
    page: 63
    bbox_norm: [0.0953, 0.0939, 0.9047, 0.3307]
    strategy: caption-region
    curated: false
  - id: fig34
    label: Figure 34
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig34.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig34.png
    caption: "GearArena 과제별 평균 채점 점수와 만점 비율"
    page: 66
    bbox_norm: [0.0947, 0.0939, 0.9053, 0.3072]
    strategy: caption-region
    curated: false
  - id: fig35
    label: Figure 35
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig35.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig35.png
    caption: "비교할 체크포인트를 지정한 뒤 익명 평가를 거쳐 평점을 산출하는 절차"
    page: 67
    bbox_norm: [0.1593, 0.0941, 0.8354, 0.243]
    strategy: caption-region
    curated: false
  - id: fig36
    label: Figure 36
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig36.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig36.png
    caption: "YAM V2 체크포인트 20개의 Elo와 불확실성 구간"
    page: 70
    bbox_norm: [0.1326, 0.0939, 0.8958, 0.5874]
    strategy: caption-region
    curated: false
  - id: fig37
    label: Figure 37
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig37.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig37.png
    caption: "YAM과 Dexter 평가에서 개발 시점에 따른 체크포인트 성능"
    page: 71
    bbox_norm: [0.0947, 0.2585, 0.9053, 0.558]
    strategy: caption-region
    curated: false
  - id: fig38
    label: Figure 38
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig38.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig38.png
    caption: "YAM V2에서 체크포인트의 추론 속도와 상대 평점"
    page: 72
    bbox_norm: [0.0947, 0.0939, 0.9053, 0.4244]
    strategy: caption-region
    curated: false
  - id: fig39
    label: Figure 39
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig39.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig39.png
    caption: "휴대형 그리퍼의 단면 치수와 유연한 연결부 구조"
    page: 74
    bbox_norm: [0.0899, 0.0949, 0.9101, 0.3841]
    strategy: manual
    curated: false
  - id: fig40
    label: Figure 40
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig40.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig40.png
    caption: "연결부에 초기 변형을 주었을 때 그리퍼의 열림과 닫힘"
    page: 75
    bbox_norm: [0.103, 0.1239, 0.8983, 0.3367]
    strategy: caption-region
    curated: false
  - id: fig41
    label: Figure 41
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig41.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig41.png
    caption: "UMI와 같은 형태의 그리퍼로 실행한 과제별 장면"
    page: 76
    bbox_norm: [0.0947, 0.0939, 0.9053, 0.3539]
    strategy: caption-region
    curated: false
  - id: fig42
    label: Figure 42
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig42.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig42.png
    caption: "같은 장난감 조립을 UMI와 YAM 카메라에서 본 장면"
    page: 78
    bbox_norm: [0.0947, 0.1795, 0.907, 0.3828]
    strategy: caption-region
    curated: false
  - id: fig43
    label: Figure 43
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig43.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig43.png
    caption: "그리퍼 UMI의 손목 영상을 YAM 시야에 맞추는 변환"
    page: 78
    bbox_norm: [0.0947, 0.6388, 0.9058, 0.7697]
    strategy: caption-region
    curated: false
  - id: fig44
    label: Figure 44
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig44.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig44.png
    caption: "로봇 손가락의 관절 위치에 맞춘 DexUMI 연결부 설계"
    page: 82
    bbox_norm: [0.0924, 0.0923, 0.9056, 0.3404]
    strategy: caption-region
    curated: false
  - id: fig45
    label: Figure 45
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig45.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig45.png
    caption: "DexUMI의 관절 지지부, 손가락 접촉면과 손목 카메라"
    page: 83
    bbox_norm: [0.092, 0.092, 0.9057, 0.3428]
    strategy: caption-region
    curated: false
  - id: fig46
    label: Figure 46
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig46.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig46.png
    caption: "영상과 action의 잡음 제거 과정에서 탐색을 적용하는 시점"
    page: 85
    bbox_norm: [0.0947, 0.0939, 0.9052, 0.2919]
    strategy: caption-region
    curated: false
  - id: fig47
    label: Figure 47
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig47.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig47.png
    caption: "AutoRL이 RoboCasa365에서 제안하고 평가한 강화학습 설정"
    page: 88
    bbox_norm: [0.1342, 0.0939, 0.8658, 0.4746]
    strategy: caption-region
    curated: false
  - id: fig48
    label: Figure 48
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig48.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig48.png
    caption: "온라인 강화학습의 작업 분담과 실제 로봇 및 시뮬레이터의 연결"
    page: 90
    bbox_norm: [0.1185, 0.1163, 0.8815, 0.5132]
    strategy: caption-region
    curated: false
  - id: fig49
    label: Figure 49
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig49.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig49.png
    caption: "실제 로봇의 강화학습에 사용한 네 가지 접촉 과제"
    page: 91
    bbox_norm: [0.0361, 0.2666, 0.9581, 0.5568]
    strategy: caption-region
    curated: false
  - id: fig50
    label: Figure 50
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig50.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig50.png
    caption: "DreamDojo에서 함께 학습한 RoboLab 과제 열 가지의 성공률 변화"
    page: 96
    bbox_norm: [0.0947, 0.0939, 0.9054, 0.4225]
    strategy: caption-region
    curated: false
  - id: fig51
    label: Figure 51
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig51.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig51.png
    caption: "DreamDojo 학습 진행과 배치 및 그룹 크기에 따른 RoboLab 성능"
    page: 96
    bbox_norm: [0.0947, 0.4604, 0.9054, 0.6858]
    strategy: caption-region
    curated: false
  - id: fig52
    label: Figure 52
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig52.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig52.png
    caption: "DreamDojo 학습 후 실제 로봇에서 평가한 삽입과 물체 배치"
    page: 97
    bbox_norm: [0.0947, 0.0939, 0.9054, 0.4362]
    strategy: caption-region
    curated: false
  - id: fig53
    label: Figure 53
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig53.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig53.png
    caption: "RoboCasa365에서 에이전트가 실행 중 오류를 복구한 두 사례"
    page: 101
    bbox_norm: [0.0947, 0.0939, 0.9053, 0.4315]
    strategy: caption-region
    curated: false
  - id: fig54
    label: Figure 54
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig54.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig54.png
    caption: "RoboCasa365와 RoboDojo에서 에이전트 결합 모델의 실패 원인"
    page: 102
    bbox_norm: [0.1935, 0.0939, 0.8065, 0.2875]
    strategy: caption-region
    curated: false
  - id: fig55
    label: Figure 55
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig55.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig55.png
    caption: "실제 작업대에서 장난감 세 종류를 조립하고 연속 삽입을 수행하는 장면"
    page: 103
    bbox_norm: [0.0947, 0.0859, 0.9053, 0.4139]
    strategy: caption-region
    curated: false
  - id: fig56
    label: Figure 56
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig56.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig56.png
    caption: "YAM 단기 지시문 평가에 쓰인 참조 유형 여덟 가지"
    page: 105
    bbox_norm: [0.0725, 0.0798, 0.9275, 0.4174]
    strategy: caption-region
    curated: false
  - id: fig57
    label: Figure 57
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig57.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig57.png
    caption: "G1이 이동과 양손 작업을 함께 수행한 과제별 장면"
    page: 110
    bbox_norm: [0.098, 0.1032, 0.902, 0.4377]
    strategy: caption-region
    curated: false
  - id: fig58
    label: Figure 58
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig58.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig58.png
    caption: "탁자 위 물체 옮기기와 정리에 쓰인 물체 집합"
    page: 111
    bbox_norm: [0.098, 0.1032, 0.902, 0.3131]
    strategy: caption-region
    curated: false
  - id: fig59
    label: Figure 59
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig59.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig59.png
    caption: "기록한 G1 동작을 여러 가상 장면에서 재생해 시연을 만드는 과정"
    page: 112
    bbox_norm: [0.05, 0.0939, 0.9071, 0.2612]
    strategy: caption-region
    curated: false
  - id: fig60
    label: Figure 60
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig60.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig60.png
    caption: "센서 입력부터 실행까지의 전체 지연과 모델 예측 지연의 측정 구간"
    page: 114
    bbox_norm: [0.0947, 0.0939, 0.9053, 0.3543]
    strategy: caption-region
    curated: false
  - id: fig61
    label: Figure 61
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig61.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig61.png
    caption: "실제 로봇 작업대와 평가용 시뮬레이션 환경의 예시"
    page: 118
    bbox_norm: [0.0947, 0.0939, 0.9055, 0.559]
    strategy: caption-region
    curated: false
  - id: fig62
    label: Figure 62
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig62.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig62.png
    caption: "장난감 세 종류의 조립을 재현한 시뮬레이션 초기 장면"
    page: 120
    bbox_norm: [0.0947, 0.0939, 0.9053, 0.3876]
    strategy: caption-region
    curated: false
  - id: fig63
    label: Figure 63
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig63.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig63.png
    caption: "실물 사진과 스캔에서 충돌 판정용 형상까지 만드는 과정"
    page: 120
    bbox_norm: [0.0947, 0.4384, 0.9053, 0.5365]
    strategy: caption-region
    curated: false
  - id: fig64
    label: Figure 64
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig64.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig64.png
    caption: "시뮬레이션에서 로봇이 장난감 비행기 날개를 삽입하고 고정하는 장면"
    page: 121
    bbox_norm: [0.0947, 0.0939, 0.9053, 0.2479]
    strategy: caption-region
    curated: false
  - id: fig65
    label: Figure 65
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig65.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig65.png
    caption: "평가 반복 수로 제한되는 상관계수 상한과 실제 측정치 비교"
    page: 121
    bbox_norm: [0.0947, 0.2857, 0.9054, 0.4382]
    strategy: caption-region
    curated: false
  - id: fig66
    label: Figure 66
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig66.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig66.png
    caption: "DROID 작업대에서 실제 환경과 시뮬레이션의 체크포인트별 성능"
    page: 122
    bbox_norm: [0.0947, 0.0939, 0.9054, 0.33]
    strategy: caption-region
    curated: false
  - id: fig67
    label: Figure 67
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig67.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig67.png
    caption: "GR00T 2 학습 소프트웨어와 연산 장비의 구성"
    page: 127
    bbox_norm: [0.1579, 0.2962, 0.8421, 0.6259]
    strategy: caption-region
    curated: false
  - id: fig68
    label: Figure 68
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig68.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig68.png
    caption: "GB300 GPU 1,024개에서 측정한 학습 데이터 throughput과 대기 시간"
    page: 130
    bbox_norm: [0.1184, 0.1876, 0.8816, 0.4288]
    strategy: caption-region
    curated: false
  - id: fig69
    label: Figure 69
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig69.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig69.png
    caption: "사람 시연 기록을 시간순으로 맞춰 학습용 데이터로 변환하는 과정"
    page: 134
    bbox_norm: [0.0899, 0.0889, 0.9101, 0.2351]
    strategy: manual
    curated: false
  - id: fig70
    label: Figure 70
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig70.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig70.png
    caption: "입력 수집, 변환, 게시를 겹쳐 실행하는 데이터 처리 구조"
    page: 135
    bbox_norm: [0.154, 0.1235, 0.846, 0.5048]
    strategy: caption-region
    curated: false
  - id: tab01
    label: Table 1
    kind: table
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/tab01.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/tab01.png
    caption: "YAM 여섯 과제와 Dexter 일곱 과제의 모델별 진행도와 최종 성공률"
    page: 7
    bbox_norm: [0.0897, 0.1779, 0.9103, 0.5801]
    strategy: manual
    curated: false
  - id: tab02
    label: Table 2
    kind: table
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/tab02.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/tab02.png
    caption: "YAM V2의 세 과제군에서 zero-shot 진행도와 성공률"
    page: 40
    bbox_norm: [0.0897, 0.5229, 0.9103, 0.6511]
    strategy: manual
    curated: false
  - id: tab03
    label: Table 3
    kind: table
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/tab03.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/tab03.png
    caption: "Dexter 71개 과제의 zero-shot 진행도와 성공률"
    page: 41
    bbox_norm: [0.0897, 0.1679, 0.9103, 0.2651]
    strategy: manual
    curated: false
  - id: tab04
    label: Table 4
    kind: table
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/tab04.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/tab04.png
    caption: "휴대형 UMI 시연에서 YAM으로 옮긴 조립, 분해, 컨베이어 분류 결과"
    page: 49
    bbox_norm: [0.0897, 0.6169, 0.9103, 0.7541]
    strategy: manual
    curated: false
  - id: tab05
    label: Table 5
    kind: table
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/tab05.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/tab05.png
    caption: "DexUMI에서 로봇 손으로 옮긴 세 과제의 단계별 완료율"
    page: 50
    bbox_norm: [0.1357, 0.1289, 0.8643, 0.3691]
    strategy: manual
    curated: false
  - id: tab06
    label: Table 6
    kind: table
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/tab06.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/tab06.png
    caption: "DexUMI와 구조가 다른 Sharpa 손에 옮긴 두 과제의 성공률"
    page: 54
    bbox_norm: [0.2176, 0.1289, 0.7824, 0.2111]
    strategy: manual
    curated: false
  - id: tab07
    label: Table 7
    kind: table
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/tab07.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/tab07.png
    caption: "사람 영상에서 만든 시뮬레이션 시연으로 학습한 실제 도구를 쓰는 기술 결과"
    page: 56
    bbox_norm: [0.1779, 0.1419, 0.8221, 0.2801]
    strategy: manual
    curated: false
  - id: tab08
    label: Table 8
    kind: table
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/tab08.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/tab08.png
    caption: "사람 영상에서 학습 시점을 고르는 신호별 임계값"
    page: 58
    bbox_norm: [0.2399, 0.6159, 0.7601, 0.7331]
    strategy: manual
    curated: false
  - id: tab09
    label: Table 9
    kind: table
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/tab09.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/tab09.png
    caption: "실험실에서 시연 데이터를 수집할 때의 카메라와 작업 조건"
    page: 59
    bbox_norm: [0.1551, 0.6269, 0.8449, 0.8861]
    strategy: manual
    curated: false
  - id: tab10
    label: Table 10
    kind: table
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/tab10.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/tab10.png
    caption: "UMI-10K의 시연 시간, 기술 수와 장면 구성"
    page: 61
    bbox_norm: [0.3034, 0.1159, 0.6966, 0.2421]
    strategy: manual
    curated: false
  - id: tab11
    label: Table 11
    kind: table
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/tab11.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/tab11.png
    caption: "로봇 플랫폼별 teleoperation 데이터의 시간과 샘플 비중"
    page: 62
    bbox_norm: [0.1041, 0.1289, 0.8959, 0.3561]
    strategy: manual
    curated: false
  - id: tab12
    label: Table 12
    kind: table
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/tab12.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/tab12.png
    caption: "GearArena 평가 요청, 실행 횟수, 비교 기록의 집계"
    page: 65
    bbox_norm: [0.1168, 0.2859, 0.8832, 0.4751]
    strategy: manual
    curated: false
  - id: tab13
    label: Table 13
    kind: table
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/tab13.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/tab13.png
    caption: "YAM V2 체크포인트 쌍 사이의 Elo 차이와 불확실성"
    page: 69
    bbox_norm: [0.1076, 0.1419, 0.8924, 0.2741]
    strategy: manual
    curated: false
  - id: tab14
    label: Table 14
    kind: table
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/tab14.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/tab14.png
    caption: "같은 평가에서 비교한 YAM V2 체크포인트의 과제군별 점수"
    page: 71
    bbox_norm: [0.1297, 0.1289, 0.8703, 0.2611]
    strategy: manual
    curated: false
  - id: tab15
    label: Table 15
    kind: table
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/tab15.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/tab15.png
    caption: "UMI와 같은 형태의 로봇 그리퍼에서 수행한 과제별 전이 성능"
    page: 76
    bbox_norm: [0.0897, 0.4919, 0.9103, 0.6431]
    strategy: manual
    curated: false
  - id: tab16
    label: Table 16
    kind: table
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/tab16.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/tab16.png
    caption: "휴대형 UMI와 YAM의 카메라, 그리퍼와 작업 공간 비교"
    page: 77
    bbox_norm: [0.1919, 0.1289, 0.8081, 0.3531]
    strategy: manual
    curated: false
  - id: tab17
    label: Table 17
    kind: table
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/tab17.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/tab17.png
    caption: "UMI에서 YAM으로 전이할 때 제어 출력, 시야 변환, 시연 수의 효과"
    page: 79
    bbox_norm: [0.2207, 0.4209, 0.7793, 0.6471]
    strategy: manual
    curated: false
  - id: tab18
    label: Table 18
    kind: table
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/tab18.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/tab18.png
    caption: "실제 로봇 한 대의 GRPO 학습에서 반복당 소요 시간"
    page: 91
    bbox_norm: [0.0897, 0.1159, 0.9103, 0.2751]
    strategy: manual
    curated: false
  - id: tab19
    label: Table 19
    kind: table
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/tab19.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/tab19.png
    caption: "에이전트 결합 방식에 따른 RoboCasa365와 RoboDojo의 성능"
    page: 99
    bbox_norm: [0.0897, 0.1809, 0.9103, 0.6681]
    strategy: manual
    curated: false
  - id: tab20
    label: Table 20
    kind: table
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/tab20.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/tab20.png
    caption: "상위 에이전트 개입 여부로 나눈 시뮬레이션 실행 결과"
    page: 100
    bbox_norm: [0.2554, 0.2879, 0.7446, 0.3631]
    strategy: manual
    curated: false
  - id: tab21
    label: Table 21
    kind: table
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/tab21.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/tab21.png
    caption: "YAM과 Dexter의 영상 표시 규칙 및 그리퍼 상태 판정 기준"
    page: 104
    bbox_norm: [0.0933, 0.1289, 0.9067, 0.4031]
    strategy: manual
    curated: false
  - id: tab22
    label: Table 22
    kind: table
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/tab22.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/tab22.png
    caption: "영상에 목표점을 표시했을 때 짧은 지시와 여러 단계 과제의 모델별 성공 결과"
    page: 106
    bbox_norm: [0.111, 0.1549, 0.889, 0.2931]
    strategy: manual
    curated: false
  - id: tab23
    label: Table 23
    kind: table
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/tab23.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/tab23.png
    caption: "YAM에서 참조 유형별 첫 시도 성공률"
    page: 106
    bbox_norm: [0.2019, 0.3259, 0.7981, 0.5061]
    strategy: manual
    curated: false
  - id: tab24
    label: Table 24
    kind: table
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/tab24.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/tab24.png
    caption: "쓰레기 분류 중 에이전트의 비용, 응답 지연과 호출 횟수"
    page: 107
    bbox_norm: [0.141, 0.1419, 0.859, 0.2941]
    strategy: manual
    curated: false
  - id: tab25
    label: Table 25
    kind: table
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/tab25.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/tab25.png
    caption: "Unitree G1의 실제 과제 네 가지에서 모델별 성공률"
    page: 111
    bbox_norm: [0.1563, 0.4039, 0.8437, 0.5271]
    strategy: manual
    curated: false
  - id: tab26
    label: Table 26
    kind: table
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/tab26.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/tab26.png
    caption: "G1 탁자 과제에서 합성 시연을 추가했을 때의 분포 내외 성공률"
    page: 112
    bbox_norm: [0.2325, 0.3599, 0.7675, 0.4691]
    strategy: manual
    curated: false
  - id: tab27
    label: Table 27
    kind: table
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/tab27.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/tab27.png
    caption: "로봇과 GPU별 모델 예측 시간의 중앙값 및 최적화 배율"
    page: 115
    bbox_norm: [0.0897, 0.1499, 0.9103, 0.3191]
    strategy: manual
    curated: false
  - id: tab28
    label: Table 28
    kind: table
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/tab28.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/tab28.png
    caption: "추론 지연을 모사했을 때 명령 연결 방식에 따른 성공률과 움직임 변화"
    page: 116
    bbox_norm: [0.0897, 0.1549, 0.9103, 0.3411]
    strategy: manual
    curated: false
  - id: tab29
    label: Table 29
    kind: table
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/tab29.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/tab29.png
    caption: "Dexter 과제 세 가지에서 구간별 가속 전후의 성공률과 완료 시간"
    page: 117
    bbox_norm: [0.1127, 0.2209, 0.8873, 0.3501]
    strategy: manual
    curated: false
  - id: tab30
    label: Table 30
    kind: table
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/tab30.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/tab30.png
    caption: "RoboCasa365에서 모델별 성공률과 일반화 항목의 결과"
    page: 124
    bbox_norm: [0.1127, 0.1289, 0.8873, 0.2951]
    strategy: manual
    curated: false
  - id: tab31
    label: Table 31
    kind: table
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/tab31.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/tab31.png
    caption: "RoboDojo에서 과제 유형별 성공률과 종합 점수"
    page: 124
    bbox_norm: [0.1074, 0.3539, 0.8926, 0.5351]
    strategy: manual
    curated: false
  - id: tab32
    label: Table 32
    kind: table
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/tab32.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/tab32.png
    caption: "RoboLab에서 전체 및 난이도별 과제 성공률"
    page: 125
    bbox_norm: [0.169, 0.1289, 0.831, 0.2951]
    strategy: manual
    curated: false
  - id: tab33
    label: Table 33
    kind: table
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/tab33.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/tab33.png
    caption: "MolmoSpaces의 물체 조작 유형별 성공률"
    page: 125
    bbox_norm: [0.1216, 0.3539, 0.8784, 0.5541]
    strategy: manual
    curated: false
  - id: tab34
    label: Table 34
    kind: table
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/tab34.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/tab34.png
    caption: "G1 Factory의 시나리오별 과제 성공률"
    page: 126
    bbox_norm: [0.152, 0.1289, 0.848, 0.2441]
    strategy: manual
    curated: false
  - id: tab35
    label: Table 35
    kind: table
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/tab35.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/tab35.png
    caption: "GB300 GPU 1,024개에서 측정한 입력 공급량과 대기 시간"
    page: 132
    bbox_norm: [0.0897, 0.6119, 0.9103, 0.7301]
    strategy: manual
    curated: false
  - id: tab36
    label: Table 36
    kind: table
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/tab36.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/tab36.png
    caption: "실제 데이터 처리 작업의 throughput, 자원 사용과 재시작 성능"
    page: 135
    bbox_norm: [0.0897, 0.6459, 0.9103, 0.8791]
    strategy: manual
    curated: false
---

## 한 줄 요약 (One-line Summary)

GR00T 2는 미래 영상과 로봇의 제어 명령인 action을 함께 예측한다. 사람만 시연한 기술을 로봇에 옮기고, 접촉 오차가 누적되는 긴 과제에서는 로봇 시연과 강화학습, 외부 에이전트로 성공률을 높였다.

## 1. 자료 정보 (Document Information)

NVIDIA가 2026년 11월 발표한 135쪽 백서다. 2절은 모델 규격, 3절은 실제 로봇 실험, 4절은 학습 및 평가 방법을 다룬다. 부록 A~K에는 과제별 성적, 시연 수집 장치, 추론 지연의 측정 경계가 있다. 같은 제목의 공식 프로젝트 페이지가 공개한 인용 키는 `nvidia2026gr00t2`다.

## 2. 주요 기여 (Key Contributions)

- 미래 영상은 사람과 로봇이 함께 학습할 수 있는 신호다. 로봇의 관절 명령이 없는 영상도 장면 변화의 예시로 쓴다.
- X-Adapt는 사람이 보여 준 과제와 목표 로봇이 다른 물체를 다룬 기록을 결합한다. 데이터 수집 장치가 로봇 손과 일치하는 경우와 다른 경우를 따로 검증했다.
- 짧은 동작은 GR00T 2가 실행하고, 긴 조립의 진행 확인과 실패 복구는 상위 에이전트가 맡는다. humanoid에서는 SONIC이 균형과 관절 구동을 담당한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

WAM은 현재 입력에서 다음 장면과 그 장면에 대응하는 action을 함께 생성하는 모델이다. Cosmos-Predict2.5-2B에서 시작한 Transformer 하나가 영상을 처리하고, 로봇마다 작은 입력 및 출력 모듈을 둔다. 최대 카메라 4대의 224×320 영상을 초당 5프레임으로 0.8초간 읽고, 로봇 상태와 지시문(instruction)을 함께 받는다.

| 학습 단계 | 학습 신호 |
|---|---|
| 단일 카메라 영상 | 1인칭 사람 영상과 로봇 영상을 사용해 한 카메라에서 본 미래 장면을 예측한다. |
| 여러 시점의 영상과 action | 미래 영상과 유효한 action에 각각 flow matching 손실을 적용한다. 사람 손의 위치를 추적한 기록도 이용한다. |
| 로봇 비중 확대 | YAM 데이터를 더 자주 사용하고 사람 영상 및 다관절 손 데이터를 유지한다. |

Human-1M에서 고른 영상은 40만 2,730시간, 그리퍼 UMI 시연 데이터(demonstration)는 1만 184시간, 로봇 teleoperation 기록은 2만 3,500시간이다. 기본형은 Wan 2.1 VAE로 공간 각 방향을 8배 압축한다. 백서 2절에 따르면 Turbo는 같은 20억 파라미터 Transformer를 유지하고 Wan 2.2 VAE로 각 방향을 16배 압축한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

주요 학습은 GB300 GPU 1,024개에서 수행했다. LanceDS의 버전을 고정하고 영상 전송과 디코딩을 비동기로 처리했다. 표 35에서 초당 약 1만 2,000개의 학습 구간을 공급하고, 입력을 기다린 시간은 평균 0.37ms였다.

| 평가 | 결과와 측정 조건 | 근거 |
|---|---|---|
| Dexter-50 | 목표 로봇 시연 0회, 1회, 5회에서 평균 성공률 40%, 71%, 95%. 과제별 rank 32 LoRA 학습에 RTX 5090 한 장으로 약 30분 | 그림 2, 부록 A.3 |
| 더 넓은 Dexter zero-shot 평가 | 71개 과제 각 3회. 기본형 49.8%, Turbo 36.6%, GR00T 1.7 18.3%, π0.5 26.3% | 표 3 |
| long-horizon 과제 post-training | YAM 6개 과제에서 기본형 71.7%, Turbo 65.0%. Dexter 7개에서 각각 68.6%, 34.3% | 표 1 |
| 사람 영상 비중 ablation | 비중 0%, 1%, 10%, 100%일 때 72개 과제에서 실제 Dexter 성공률 18%, 27%, 28%, 41%. 실제 진행도는 50%, 58%, 61%, 70% | 그림 10 |
| UMI에서 YAM으로 전이 | 덤프트럭 조립 60%, 기판 분해 50%, 컨베이어 물체 분류 86%. UMI pre-training을 제거하면 20%, 0%, 34% | 표 4, 17 |
| 실제 로봇 강화학습 | GRPO 성공 실행을 다시 학습한 뒤 배관 체결 88%, 손가락 배치 98%, 케이블 삽입 94%, 충전기 삽입 96% | 그림 5 |
| 장난감 조립 복구 | 무작위로 부품을 쏟은 조건에서 교정 시연과 에이전트를 결합해 비행기 98/100회, 트랙터 97/100회, 자동차 97/100회 성공 | 그림 7 |
| G1과 SONIC | 팝콘 48/48회, 탁자 정리 28/30회, 바닥 물체 집기 25/30회, 흘린 액체 닦기 14/30회 성공 | 표 25 |
| 추론과 실물 평가 | G1용 Turbo 예측 중앙값은 RTX 5090에서 38.40ms, Jetson Thor에서 123.97ms. YAM 25개 과제의 실물과 시뮬레이션 성공률 상관계수는 0.92 | 표 27, 그림 18 |

## 5. 한계와 향후 과제 (Limitations and Future Work)

Dexter-50은 시연 5회로 이미 80% 이상 성공하는 과제에서 골랐다. 표 1의 Dexter 트럭 조립에서는 두 GR00T 2 모델에 더 쉬운 초기 장면을 사용했다. 원래 장면에서 기본형은 20회 중 7회 성공하고 평균 진행도는 94점이었다.

기본형의 입력 이력은 0.8초이며 촉각을 직접 입력받지 않는다. 영상 위의 점은 물체와 놓을 위치를 지정할 수 있지만, 놓을 때의 방향이나 힘을 지정하지 못한다. 백서 5절은 배치 전 검증에 필요한 반복 수, 자동 성공 판정의 오류, 목표 신뢰도까지 소요되는 사람 및 로봇 시간을 후속 과제로 든다.

## 6. 관련 연구 (Related Work)

[[physical-ai/nvidia-gr00t-n1-7-3b|GR00T N1.7 모델 카드]]에서 이전 모델의 로봇별 입출력 규격을 확인할 수 있다. 두 공식 자료를 함께 해설한 페이지는 [[physical-ai/nvidia-2026-gr00t-2-scaling-robot-foundation|GR00T 2]]다.

## 7. 용어집 (Glossary)

| 용어 | 이 자료에서의 의미 |
|---|---|
| Human-1M | 사람의 1인칭 작업 기록에서 학습 장면을 고른 원천 데이터 |
| X-Adapt | 한 신체로 시연한 과제를 다른 구조의 로봇에 옮기는 실험 설정 |
| Dexter-50 | Dexter에서 해당 과제 시연을 배제한 뒤 소량 적응을 측정한 50개 과제 |
| GearArena | 같은 장면에서 여러 체크포인트를 익명 비교하는 실물 평가 시스템 |
| SONIC | G1에서 Turbo가 지정한 움직임을 관절 명령으로 바꾸는 제어기 |

## 8. 그림 후보 (Figure Candidates)

| id | 위치 | 설명 | 추출 방식 | 추천 |
|---|---|---|---|---|
| fig01 | 4 | 사람과 로봇의 영상에서 미래 장면과 제어 명령을 함께 학습하는 GR00T 2의 입출력과 응용 | caption-region | ★ 본문 권장 |
| fig02 | 6 | Dexter 시연 수에 따른 50개 과제의 평균 성공률과 과제별 분포 | caption-region | ★ 본문 권장 |
| fig03 | 7 | YAM의 장난감 자동차 조립과 Dexter의 배송 라벨 부착 순서 | manual | 참고 |
| fig04 | 8 | 센서 장갑, DexUMI, 휴대형 그리퍼, 시뮬레이션을 거쳐 기술을 옮기는 네 경로 | caption-region | ★ 본문 권장 |
| fig05 | 10 | 실제 로봇의 접촉 과제 네 가지에서 지도학습과 강화학습 이후의 성공률 | caption-region | 참고 |
| fig06 | 10 | 상위 에이전트가 WAM과 복구 도구를 호출하는 실행 구조 | caption-region | 참고 |
| fig07 | 11 | 장난감 조립과 연속 삽입에서 에이전트와 학습 방식에 따른 성공 횟수 | caption-region | 참고 |
| fig08 | 12 | 물체와 목적지를 카메라 영상에 표시했을 때의 짧은 지시와 여러 단계 과제 결과 | caption-region | 참고 |
| fig09 | 13 | 추론 모델에서 Turbo를 거쳐 SONIC으로 이어지는 humanoid 제어 구조 | caption-region | 참고 |
| fig10 | 15 | 사람 영상의 학습 비율에 따른 실제 Dexter와 생성 영상의 성공률 및 진행도 | caption-region | 참고 |
| fig11 | 17 | YAM V2에서 체크포인트 개발 시점에 따라 달라진 상대 Elo | manual | 참고 |
| fig12 | 18 | 센서 장갑으로 기록한 손동작을 로봇에 옮기는 절차 | caption-region | 참고 |
| fig13 | 18 | 사람이 시연한 실험실 과제와 Dexter가 실행한 장면 | caption-region | 참고 |
| fig14 | 19 | YAM 데이터를 함께 학습했을 때 달라지는 예상 손목 카메라 영상 | caption-region | 참고 |
| fig15 | 19 | 바나나 요구르트를 만드는 DexUMI 시연과 로봇 실행 | caption-region | 참고 |
| fig16 | 20 | 사람 영상 한 편에서 시뮬레이션 시연을 만들어 실제 손으로 옮기는 과정 | caption-region | 참고 |
| fig17 | 21 | 실제 작업대와 시뮬레이션에서 재구성한 과제의 대응 | caption-region | 참고 |
| fig18 | 21 | YAM 체크포인트별 실제 환경과 시뮬레이션의 진행도, 성공률, Elo | caption-region | 참고 |
| fig19 | 23 | RTX 5090과 Jetson Thor에서 최적화 단계별 G1 예측 지연 | caption-region | 참고 |
| fig20 | 24 | 과제 구간에 따라 예측한 동작의 실행 속도를 조절하는 과정 | caption-region | 참고 |
| fig21 | 38 | YAM long-horizon 과제 여섯 가지의 시작 장면과 수행 단계 | caption-region | 참고 |
| fig22 | 39 | Dexter long-horizon 과제 일곱 가지의 시작 장면과 수행 단계 | caption-region | 참고 |
| fig23 | 40 | YAM 여섯 과제에서 모델별 평균 진행도와 호출 지연 | caption-region | 참고 |
| fig24 | 42 | Dexter-50의 개별 과제에서 시연 수에 따른 성공률 | caption-region | 참고 |
| fig25 | 43 | Dexter가 처음부터 성공한 과제와 시연 추가 후 성공한 과제 | caption-region | 참고 |
| fig26 | 45 | 센서 장갑으로 기록한 네 가지 과제의 세부 단계 | caption-region | 참고 |
| fig27 | 46 | 로봇 시연 수와 학습 구성에 따른 사람 시연 전이의 성공률과 진행도 | caption-region | 참고 |
| fig28 | 47 | 사람만 시연한 과제에서 로봇의 첫 장면으로 생성한 미래 영상 | caption-region | 참고 |
| fig29 | 49 | 휴대형 그리퍼로 시연하고 YAM이 실행한 세 과제의 장면 | caption-region | 참고 |
| fig30 | 51 | DexUMI 시연과 로봇 손 실행으로 비교한 세 가지 양손 과제 | caption-region | 참고 |
| fig31 | 55 | 사람 영상, 시뮬레이션 학습, 실제 로봇 손을 잇는 도구를 쓰는 기술 전이 | caption-region | 참고 |
| fig32 | 61 | 그리퍼 UMI 데이터에 수록된 기술별 시연 건수 | caption-region | 참고 |
| fig33 | 63 | Tianji와 Sharpa 손을 구동하는 teleoperation 장치와 업그레이드 | caption-region | 참고 |
| fig34 | 66 | GearArena 과제별 평균 채점 점수와 만점 비율 | caption-region | 참고 |
| fig35 | 67 | 비교할 체크포인트를 지정한 뒤 익명 평가를 거쳐 평점을 산출하는 절차 | caption-region | 참고 |
| fig36 | 70 | YAM V2 체크포인트 20개의 Elo와 불확실성 구간 | caption-region | 참고 |
| fig37 | 71 | YAM과 Dexter 평가에서 개발 시점에 따른 체크포인트 성능 | caption-region | 참고 |
| fig38 | 72 | YAM V2에서 체크포인트의 추론 속도와 상대 평점 | caption-region | 참고 |
| fig39 | 74 | 휴대형 그리퍼의 단면 치수와 유연한 연결부 구조 | manual | 참고 |
| fig40 | 75 | 연결부에 초기 변형을 주었을 때 그리퍼의 열림과 닫힘 | caption-region | 참고 |
| fig41 | 76 | UMI와 같은 형태의 그리퍼로 실행한 과제별 장면 | caption-region | 참고 |
| fig42 | 78 | 같은 장난감 조립을 UMI와 YAM 카메라에서 본 장면 | caption-region | 참고 |
| fig43 | 78 | 그리퍼 UMI의 손목 영상을 YAM 시야에 맞추는 변환 | caption-region | 참고 |
| fig44 | 82 | 로봇 손가락의 관절 위치에 맞춘 DexUMI 연결부 설계 | caption-region | 참고 |
| fig45 | 83 | DexUMI의 관절 지지부, 손가락 접촉면과 손목 카메라 | caption-region | 참고 |
| fig46 | 85 | 영상과 action의 잡음 제거 과정에서 탐색을 적용하는 시점 | caption-region | 참고 |
| fig47 | 88 | AutoRL이 RoboCasa365에서 제안하고 평가한 강화학습 설정 | caption-region | 참고 |
| fig48 | 90 | 온라인 강화학습의 작업 분담과 실제 로봇 및 시뮬레이터의 연결 | caption-region | 참고 |
| fig49 | 91 | 실제 로봇의 강화학습에 사용한 네 가지 접촉 과제 | caption-region | 참고 |
| fig50 | 96 | DreamDojo에서 함께 학습한 RoboLab 과제 열 가지의 성공률 변화 | caption-region | 참고 |
| fig51 | 96 | DreamDojo 학습 진행과 배치 및 그룹 크기에 따른 RoboLab 성능 | caption-region | 참고 |
| fig52 | 97 | DreamDojo 학습 후 실제 로봇에서 평가한 삽입과 물체 배치 | caption-region | 참고 |
| fig53 | 101 | RoboCasa365에서 에이전트가 실행 중 오류를 복구한 두 사례 | caption-region | 참고 |
| fig54 | 102 | RoboCasa365와 RoboDojo에서 에이전트 결합 모델의 실패 원인 | caption-region | 참고 |
| fig55 | 103 | 실제 작업대에서 장난감 세 종류를 조립하고 연속 삽입을 수행하는 장면 | caption-region | 참고 |
| fig56 | 105 | YAM 단기 지시문 평가에 쓰인 참조 유형 여덟 가지 | caption-region | 참고 |
| fig57 | 110 | G1이 이동과 양손 작업을 함께 수행한 과제별 장면 | caption-region | 참고 |
| fig58 | 111 | 탁자 위 물체 옮기기와 정리에 쓰인 물체 집합 | caption-region | 참고 |
| fig59 | 112 | 기록한 G1 동작을 여러 가상 장면에서 재생해 시연을 만드는 과정 | caption-region | 참고 |
| fig60 | 114 | 센서 입력부터 실행까지의 전체 지연과 모델 예측 지연의 측정 구간 | caption-region | 참고 |
| fig61 | 118 | 실제 로봇 작업대와 평가용 시뮬레이션 환경의 예시 | caption-region | 참고 |
| fig62 | 120 | 장난감 세 종류의 조립을 재현한 시뮬레이션 초기 장면 | caption-region | 참고 |
| fig63 | 120 | 실물 사진과 스캔에서 충돌 판정용 형상까지 만드는 과정 | caption-region | 참고 |
| fig64 | 121 | 시뮬레이션에서 로봇이 장난감 비행기 날개를 삽입하고 고정하는 장면 | caption-region | 참고 |
| fig65 | 121 | 평가 반복 수로 제한되는 상관계수 상한과 실제 측정치 비교 | caption-region | 참고 |
| fig66 | 122 | DROID 작업대에서 실제 환경과 시뮬레이션의 체크포인트별 성능 | caption-region | 참고 |
| fig67 | 127 | GR00T 2 학습 소프트웨어와 연산 장비의 구성 | caption-region | 참고 |
| fig68 | 130 | GB300 GPU 1,024개에서 측정한 학습 데이터 throughput과 대기 시간 | caption-region | 참고 |
| fig69 | 134 | 사람 시연 기록을 시간순으로 맞춰 학습용 데이터로 변환하는 과정 | manual | 참고 |
| fig70 | 135 | 입력 수집, 변환, 게시를 겹쳐 실행하는 데이터 처리 구조 | caption-region | 참고 |
| tab01 | 7 | YAM 여섯 과제와 Dexter 일곱 과제의 모델별 진행도와 최종 성공률 | manual | 참고 |
| tab02 | 40 | YAM V2의 세 과제군에서 zero-shot 진행도와 성공률 | manual | 참고 |
| tab03 | 41 | Dexter 71개 과제의 zero-shot 진행도와 성공률 | manual | 참고 |
| tab04 | 49 | 휴대형 UMI 시연에서 YAM으로 옮긴 조립, 분해, 컨베이어 분류 결과 | manual | 참고 |
| tab05 | 50 | DexUMI에서 로봇 손으로 옮긴 세 과제의 단계별 완료율 | manual | 참고 |
| tab06 | 54 | DexUMI와 구조가 다른 Sharpa 손에 옮긴 두 과제의 성공률 | manual | 참고 |
| tab07 | 56 | 사람 영상에서 만든 시뮬레이션 시연으로 학습한 실제 도구를 쓰는 기술 결과 | manual | 참고 |
| tab08 | 58 | 사람 영상에서 학습 시점을 고르는 신호별 임계값 | manual | 참고 |
| tab09 | 59 | 실험실에서 시연 데이터를 수집할 때의 카메라와 작업 조건 | manual | 참고 |
| tab10 | 61 | UMI-10K의 시연 시간, 기술 수와 장면 구성 | manual | 참고 |
| tab11 | 62 | 로봇 플랫폼별 teleoperation 데이터의 시간과 샘플 비중 | manual | 참고 |
| tab12 | 65 | GearArena 평가 요청, 실행 횟수, 비교 기록의 집계 | manual | 참고 |
| tab13 | 69 | YAM V2 체크포인트 쌍 사이의 Elo 차이와 불확실성 | manual | 참고 |
| tab14 | 71 | 같은 평가에서 비교한 YAM V2 체크포인트의 과제군별 점수 | manual | 참고 |
| tab15 | 76 | UMI와 같은 형태의 로봇 그리퍼에서 수행한 과제별 전이 성능 | manual | 참고 |
| tab16 | 77 | 휴대형 UMI와 YAM의 카메라, 그리퍼와 작업 공간 비교 | manual | 참고 |
| tab17 | 79 | UMI에서 YAM으로 전이할 때 제어 출력, 시야 변환, 시연 수의 효과 | manual | 참고 |
| tab18 | 91 | 실제 로봇 한 대의 GRPO 학습에서 반복당 소요 시간 | manual | 참고 |
| tab19 | 99 | 에이전트 결합 방식에 따른 RoboCasa365와 RoboDojo의 성능 | manual | 참고 |
| tab20 | 100 | 상위 에이전트 개입 여부로 나눈 시뮬레이션 실행 결과 | manual | 참고 |
| tab21 | 104 | YAM과 Dexter의 영상 표시 규칙 및 그리퍼 상태 판정 기준 | manual | 참고 |
| tab22 | 106 | 영상에 목표점을 표시했을 때 짧은 지시와 여러 단계 과제의 모델별 성공 결과 | manual | 참고 |
| tab23 | 106 | YAM에서 참조 유형별 첫 시도 성공률 | manual | 참고 |
| tab24 | 107 | 쓰레기 분류 중 에이전트의 비용, 응답 지연과 호출 횟수 | manual | 참고 |
| tab25 | 111 | Unitree G1의 실제 과제 네 가지에서 모델별 성공률 | manual | 참고 |
| tab26 | 112 | G1 탁자 과제에서 합성 시연을 추가했을 때의 분포 내외 성공률 | manual | 참고 |
| tab27 | 115 | 로봇과 GPU별 모델 예측 시간의 중앙값 및 최적화 배율 | manual | 참고 |
| tab28 | 116 | 추론 지연을 모사했을 때 명령 연결 방식에 따른 성공률과 움직임 변화 | manual | 참고 |
| tab29 | 117 | Dexter 과제 세 가지에서 구간별 가속 전후의 성공률과 완료 시간 | manual | 참고 |
| tab30 | 124 | RoboCasa365에서 모델별 성공률과 일반화 항목의 결과 | manual | 참고 |
| tab31 | 124 | RoboDojo에서 과제 유형별 성공률과 종합 점수 | manual | 참고 |
| tab32 | 125 | RoboLab에서 전체 및 난이도별 과제 성공률 | manual | 참고 |
| tab33 | 125 | MolmoSpaces의 물체 조작 유형별 성공률 | manual | 참고 |
| tab34 | 126 | G1 Factory의 시나리오별 과제 성공률 | manual | 참고 |
| tab35 | 132 | GB300 GPU 1,024개에서 측정한 입력 공급량과 대기 시간 | manual | 참고 |
| tab36 | 135 | 실제 데이터 처리 작업의 throughput, 자원 사용과 재시작 성능 | manual | 참고 |
