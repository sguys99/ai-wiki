---
title: "Has GPT-6-Astra Achieved Embodied Intelligence?"
type: paper
year: 2026
category: physical-ai
raw_path: raw/papers/cai-2026-has-gpt-6-astra-achieved-embodied-intelligence.pdf
raw_filename: "cai-2026-has-gpt-6-astra-achieved-embodied-intelligence.pdf"
source_collection: external
authors: "Joint Research Team (SenseNova, Acerobotics, Ropedia, NTU Singapore, The University of Tokyo). Project Leads: Zhongang Cai, Zhonghua Wu, Qingyi Tao"
arxiv_id: "2610.22471"
url: "https://arxiv.org/abs/2610.22471"
tags: [physical-ai, benchmark, manipulation, robot-learning]
figures:
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/cai-2026-has-gpt-6-astra-achieved-embodied-intelligence/fig01.png
    raw: raw/papers/cai-2026-has-gpt-6-astra-achieved-embodied-intelligence-figures/fig01.png
    caption: "12개 벤치마크에서 GPT-6-Astra의 성능 상한. 회색 점은 기존 최고 성능(SOTA)과 agentic 방법 최고 성능, 보라색은 표준 1배 budget, 초록색은 10배 budget 결과다. LIBERO-Long++ 100.0%, SIMPLE 98.8%, RoboDojo 81.9%, BEHAVIOR 37.0%, LHPR-VLN 28.9%까지 분포한다"
    page: 1
    bbox_norm: [0.1002, 0.6524, 0.8848, 0.8556]
    strategy: manual
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/cai-2026-has-gpt-6-astra-achieved-embodied-intelligence/fig02.png
    raw: raw/papers/cai-2026-has-gpt-6-astra-achieved-embodied-intelligence-figures/fig02.png
    caption: "in-context learning 프로토콜. GPT-6-Astra가 훈련 데이터를 학습해 knowledge package K를 작성하고 테스트 전에 고정한다. 각 테스트 episode는 K를 복사한 새 세션에서 1배 또는 10배 step 한도로 실행되며 episode 사이에 정보가 넘어가지 않는다"
    page: 4
    bbox_norm: [0.1002, 0.0524, 0.8998, 0.2226]
    strategy: manual
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/cai-2026-has-gpt-6-astra-achieved-embodied-intelligence/fig03.png
    raw: raw/papers/cai-2026-has-gpt-6-astra-achieved-embodied-intelligence-figures/fig03.png
    caption: "ICL knowledge package의 여섯 구성 요소. 과제 안내(.md), 동작 참조(.npz), 시각 참조(.png), 실행 helper(.py), 완료 검사와 복구(.md, .py), 메타데이터와 출처로 이루어지고 테스트 시 observation과 로봇 상태와 함께 읽혀 action을 검색, 조정, 검사한다"
    page: 5
    bbox_norm: [0.106, 0.0908, 0.894, 0.2532]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/cai-2026-has-gpt-6-astra-achieved-embodied-intelligence/fig04.png
    raw: raw/papers/cai-2026-has-gpt-6-astra-achieved-embodied-intelligence-figures/fig04.png
    caption: "벤치마크별 step budget 대비 성공률. budget은 공식 step 한도의 배수(log 축)로 표시하고 점은 측정값, 분홍 곡선은 추세, 회색 선은 budget 소진 episode가 모두 성공한다고 가정한 상한이다. RoboDojo는 1배 27.6%에서 10배 81.9%로, Bench2Dex는 25.6%에서 61.5%로 오른다"
    page: 6
    bbox_norm: [0.1031, 0.088, 0.9018, 0.8634]
    strategy: caption-region
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/cai-2026-has-gpt-6-astra-achieved-embodied-intelligence/fig05.png
    raw: raw/papers/cai-2026-has-gpt-6-astra-achieved-embodied-intelligence-figures/fig05.png
    caption: "벤치마크별 과제당 평균 토큰 사용량(a)과 평균 소요 시간(b). 아래부터 ICL 준비, 1배 실행, 10배 연장분을 쌓았다. BEHAVIOR가 약 7,200만 토큰과 400분 이상으로 가장 크고 RoboDojo와 Bench2Dex는 10배 연장분 비중이 크다"
    page: 7
    bbox_norm: [0.0855, 0.0713, 0.9085, 0.3189]
    strategy: caption-region
    curated: true
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/cai-2026-has-gpt-6-astra-achieved-embodied-intelligence/fig06.png
    raw: raw/papers/cai-2026-has-gpt-6-astra-achieved-embodied-intelligence-figures/fig06.png
    caption: "ICL과 10배 budget에서도 남는 실패 유형. (a) 물리적 성공 검증 실패(Hang mugs에서 머리 카메라로는 걸린 듯 보이지만 손목 카메라로는 테이블 위), (b) 되돌릴 수 없는 결과로부터의 복구 실패(컵이 넘어져 쏟아짐), (c) long-horizon 진행 상태 유지 실패(걸어 둔 헤드폰을 다시 건드려 떨어뜨림)"
    page: 8
    bbox_norm: [0.0949, 0.0503, 0.9042, 0.414]
    strategy: caption-region
    curated: true
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/cai-2026-has-gpt-6-astra-achieved-embodied-intelligence/fig07.png
    raw: raw/papers/cai-2026-has-gpt-6-astra-achieved-embodied-intelligence-figures/fig07.png
    caption: "RoboDojo에서 System 1과 System 2 협업 방식, action 표현별 토큰 비용 대비 성공률. 기준점(15.56%, 256만 토큰)을 중심으로 네 사분면을 나누며 ICL과 VLA closed-loop 결합이 54.17%로 가장 높지만 1,934만 토큰을 쓴다"
    page: 10
    bbox_norm: [0.106, 0.0908, 0.894, 0.438]
    strategy: caption-region
    curated: true
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/cai-2026-has-gpt-6-astra-achieved-embodied-intelligence/fig08.png
    raw: raw/papers/cai-2026-has-gpt-6-astra-achieved-embodied-intelligence-figures/fig08.png
    caption: "단순한 형상에서 복잡한 형상 순으로 본 zero-shot 실세계 제어. Franka 3 블록 쌓기 6/6, Pika의 그릇 이동 후 재계획 3/3, Tianji M6S 사람이 쓴 grasp 스크립트 병 잡기 1/3, Galaxea R1 Pro 세탁기 버튼 누르기 2/2, Unitree G1 회전 후 접근과 정지 3/3 등이다"
    page: 12
    bbox_norm: [0.106, 0.0908, 0.894, 0.5054]
    strategy: caption-region
    curated: true
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/cai-2026-has-gpt-6-astra-achieved-embodied-intelligence/fig09.png
    raw: raw/papers/cai-2026-has-gpt-6-astra-achieved-embodied-intelligence-figures/fig09.png
    caption: "꽃 꽂기 과제에서 시야가 결과를 결정하는 사례. 단일 팔 Franka 3는 손목 카메라로 꽃병 입구를 보지 못해 실패하고, 양팔 Piper는 빈 팔을 움직여 손목 카메라로 꽃병 입구를 비추는 active vision으로 성공한다"
    page: 13
    bbox_norm: [0.106, 0.0908, 0.894, 0.2042]
    strategy: caption-region
    curated: true
  - id: fig10
    label: Figure 10
    kind: figure
    file: assets/cai-2026-has-gpt-6-astra-achieved-embodied-intelligence/fig10.png
    raw: raw/papers/cai-2026-has-gpt-6-astra-achieved-embodied-intelligence-figures/fig10.png
    caption: "아침 식사 과제의 두 명세. 왼쪽은 BEHAVIOR-1K cook_bacon의 BDDL 목표 조건으로 베이컨이 익고 냉장고가 닫혀 있으면 성공이다. 오른쪽은 제안하는 요청 명세로 허용 결과별 점수(토스트 0.5, 달걀과 토스트 0.8, 커피 포함 1.0), 15분 마감, 판정자만 보는 온도 술어, 냉장고와 버너에 대한 시간 제한 의무를 담는다"
    page: 15
    bbox_norm: [0.106, 0.0911, 0.894, 0.3256]
    strategy: caption-region
    curated: true
  - id: fig11
    label: Figure 11
    kind: figure
    file: assets/cai-2026-has-gpt-6-astra-achieved-embodied-intelligence/fig11.png
    raw: raw/papers/cai-2026-has-gpt-6-astra-achieved-embodied-intelligence-figures/fig11.png
    caption: "가정 환경 구축과 사용 절차. 공개 asset과 평면도로 집을 구성하고, 코딩 에이전트가 사람 검토 아래 물건을 배치하며, articulation, 액체, 천, 나사산 물리를 연결한 뒤, 요청(Intent)과 말하지 않은 의무(Duty)를 담은 과제를 world time 위에서 평가한다"
    page: 16
    bbox_norm: [0.106, 0.0908, 0.8936, 0.3692]
    strategy: caption-region
    curated: true
  - id: fig12
    label: Figure 12
    kind: figure
    file: assets/cai-2026-has-gpt-6-astra-achieved-embodied-intelligence/fig12.png
    raw: raw/papers/cai-2026-has-gpt-6-astra-achieved-embodied-intelligence-figures/fig12.png
    caption: "가정 proof of concept에서 관찰된 GPT-6-Astra 실패. (a) 정리 중 팔꿈치로 모니터를 밀어냄, (b) 과일을 옮기는 동안 냉장고 문을 300초에서 765초까지 열어 둠, (c) 연 냉장고 문이 다른 팔을 막아 베이컨을 꺼내지 못함, (d) 수도꼭지를 잠그지 못해 싱크대가 넘침, (e) 판단에 걸린 시간 동안 버너가 켜져 달걀이 탐"
    page: 17
    bbox_norm: [0.1002, 0.0824, 0.8998, 0.7076]
    strategy: manual
    curated: true
  - id: fig13
    label: Figure 13
    kind: figure
    file: assets/cai-2026-has-gpt-6-astra-achieved-embodied-intelligence/fig13.png
    raw: raw/papers/cai-2026-has-gpt-6-astra-achieved-embodied-intelligence-figures/fig13.png
    caption: "zero-shot 실세계 과제 전체 갤러리 중 모든 시도가 성공한 A군 27개 과제. Franka 3, Franka Panda, Pika, 양팔 Piper, Tianji M6S, Galaxea R1 Pro, Unitree G1의 과제별 3프레임과 성공 횟수다"
    page: 54
    bbox_norm: [0.1002, 0.1724, 0.8998, 0.8276]
    strategy: manual
    curated: false
  - id: fig14
    label: Figure 14
    kind: figure
    file: assets/cai-2026-has-gpt-6-astra-achieved-embodied-intelligence/fig14.png
    raw: raw/papers/cai-2026-has-gpt-6-astra-achieved-embodied-intelligence-figures/fig14.png
    caption: "Franka 3 과제 프레임. 블록 쌓기, 천 접기, 플러그 삽입"
    page: 56
    bbox_norm: [0.1054, 0.2662, 0.8945, 0.3607]
    strategy: caption-region
    curated: false
  - id: fig15
    label: Figure 15
    kind: figure
    file: assets/cai-2026-has-gpt-6-astra-achieved-embodied-intelligence/fig15.png
    raw: raw/papers/cai-2026-has-gpt-6-astra-achieved-embodied-intelligence-figures/fig15.png
    caption: "Franka Panda 과제 프레임. 테이프 롤 쌓기, 수건과 천 접기, 플러그 삽입"
    page: 57
    bbox_norm: [0.1054, 0.158, 0.894, 0.368]
    strategy: caption-region
    curated: false
  - id: fig16
    label: Figure 16
    kind: figure
    file: assets/cai-2026-has-gpt-6-astra-achieved-embodied-intelligence/fig16.png
    raw: raw/papers/cai-2026-has-gpt-6-astra-achieved-embodied-intelligence-figures/fig16.png
    caption: "Pika 그리퍼를 단 PiPER 과제 프레임. 그릇 이동 후 재계획, 천 접기, 플러그 삽입"
    page: 58
    bbox_norm: [0.1054, 0.3266, 0.894, 0.5472]
    strategy: caption-region
    curated: false
  - id: fig17
    label: Figure 17
    kind: figure
    file: assets/cai-2026-has-gpt-6-astra-achieved-embodied-intelligence/fig17.png
    raw: raw/papers/cai-2026-has-gpt-6-astra-achieved-embodied-intelligence-figures/fig17.png
    caption: "양팔 AgileX Piper의 탁상 manipulation 과제 12개 전체 프레임"
    page: 60
    bbox_norm: [0.1054, 0.0936, 0.894, 0.7242]
    strategy: caption-region
    curated: false
  - id: fig18
    label: Figure 18
    kind: figure
    file: assets/cai-2026-has-gpt-6-astra-achieved-embodied-intelligence/fig18.png
    raw: raw/papers/cai-2026-has-gpt-6-astra-achieved-embodied-intelligence-figures/fig18.png
    caption: "Wuji 손을 단 Tianji M6S 과제 프레임. 장난감 잡기와 병 잡기"
    page: 61
    bbox_norm: [0.1054, 0.4532, 0.894, 0.6738]
    strategy: caption-region
    curated: false
  - id: fig19
    label: Figure 19
    kind: figure
    file: assets/cai-2026-has-gpt-6-astra-achieved-embodied-intelligence/fig19.png
    raw: raw/papers/cai-2026-has-gpt-6-astra-achieved-embodied-intelligence-figures/fig19.png
    caption: "Galaxea R1 Pro 과제 프레임. 세탁기 버튼 누르기와 꽃 모으기"
    page: 63
    bbox_norm: [0.1054, 0.0936, 0.894, 0.5192]
    strategy: caption-region
    curated: false
  - id: fig20
    label: Figure 20
    kind: figure
    file: assets/cai-2026-has-gpt-6-astra-achieved-embodied-intelligence/fig20.png
    raw: raw/papers/cai-2026-has-gpt-6-astra-achieved-embodied-intelligence-figures/fig20.png
    caption: "AgileX Tracer와 xArm7 조합의 내비게이션과 탐색 과제 기록"
    page: 64
    bbox_norm: [0.1054, 0.3596, 0.894, 0.6421]
    strategy: caption-region
    curated: false
  - id: fig21
    label: Figure 21
    kind: figure
    file: assets/cai-2026-has-gpt-6-astra-achieved-embodied-intelligence/fig21.png
    raw: raw/papers/cai-2026-has-gpt-6-astra-achieved-embodied-intelligence-figures/fig21.png
    caption: "Wuji 손을 단 Unitree G1의 고정 자세 집어 떨어뜨리기와 이동 과제 프레임"
    page: 66
    bbox_norm: [0.1054, 0.2335, 0.8944, 0.3498]
    strategy: caption-region
    curated: false
  - id: tab01
    label: Table 1
    kind: table
    file: assets/cai-2026-has-gpt-6-astra-achieved-embodied-intelligence/tab01.png
    raw: raw/papers/cai-2026-has-gpt-6-astra-achieved-embodied-intelligence-figures/tab01.png
    caption: "실세계 플랫폼 다섯 분류와 각 분류가 묻는 질문. 단일 팔(3대), 양팔 그리퍼, 양팔 dexterous hand, 바퀴형 모바일 manipulator(2대), humanoid로 구성된다"
    page: 11
    bbox_norm: [0.106, 0.0914, 0.895, 0.3427]
    strategy: table-region
    curated: true
  - id: tab02
    label: Table 2
    kind: table
    file: assets/cai-2026-has-gpt-6-astra-achieved-embodied-intelligence/tab02.png
    raw: raw/papers/cai-2026-has-gpt-6-astra-achieved-embodied-intelligence-figures/tab02.png
    caption: "그림 1의 벤치마크별 성공률(%) 원표. 기존 SOTA와 agentic SOTA, GPT-6-Astra + ICL의 1배와 누적 10배 결과를 형상 분류별로 나란히 적었다"
    page: 38
    bbox_norm: [0.1781, 0.0914, 0.8219, 0.3999]
    strategy: table-region
    curated: true
  - id: tab03
    label: Table 3
    kind: table
    file: assets/cai-2026-has-gpt-6-astra-achieved-embodied-intelligence/tab03.png
    raw: raw/papers/cai-2026-has-gpt-6-astra-achieved-embodied-intelligence-figures/tab03.png
    caption: "LIBERO-PRO 과제별 성공률과 토큰, 시간 비용"
    page: 39
    bbox_norm: [0.106, 0.6872, 0.8946, 0.8211]
    strategy: table-region
    curated: false
  - id: tab04
    label: Table 4
    kind: table
    file: assets/cai-2026-has-gpt-6-astra-achieved-embodied-intelligence/tab04.png
    raw: raw/papers/cai-2026-has-gpt-6-astra-achieved-embodied-intelligence-figures/tab04.png
    caption: "LIBERO-Long++와 LIBERO-Ultra-Long 과제별 성공률과 비용"
    page: 40
    bbox_norm: [0.106, 0.7122, 0.8943, 0.8099]
    strategy: table-region
    curated: false
  - id: tab05
    label: Table 5
    kind: table
    file: assets/cai-2026-has-gpt-6-astra-achieved-embodied-intelligence/tab05.png
    raw: raw/papers/cai-2026-has-gpt-6-astra-achieved-embodied-intelligence-figures/tab05.png
    caption: "RoboDojo 과제 그룹별, 과제별 성공률과 비용"
    page: 42
    bbox_norm: [0.106, 0.7544, 0.8963, 0.8416]
    strategy: table-region
    curated: false
  - id: tab06
    label: Table 6
    kind: table
    file: assets/cai-2026-has-gpt-6-astra-achieved-embodied-intelligence/tab06.png
    raw: raw/papers/cai-2026-has-gpt-6-astra-achieved-embodied-intelligence-figures/tab06.png
    caption: "RoboLab 전체 성공률. GPT-6-Astra 10배 69.2%, 1배 57.1%가 FLUX 3 Action(42.9%), Cosmos3-Nano-Policy(36.8%), π0.5(28.0%) 등 VLA와 world action model 9종을 앞선다"
    page: 43
    bbox_norm: [0.106, 0.307, 0.8963, 0.5409]
    strategy: table-region
    curated: true
  - id: tab07
    label: Table 7
    kind: table
    file: assets/cai-2026-has-gpt-6-astra-achieved-embodied-intelligence/tab07.png
    raw: raw/papers/cai-2026-has-gpt-6-astra-achieved-embodied-intelligence-figures/tab07.png
    caption: "RoboLab 세부 과제별 성공률과 비용"
    page: 44
    bbox_norm: [0.106, 0.4315, 0.8941, 0.626]
    strategy: table-region
    curated: false
  - id: tab08
    label: Table 8
    kind: table
    file: assets/cai-2026-has-gpt-6-astra-achieved-embodied-intelligence/tab08.png
    raw: raw/papers/cai-2026-has-gpt-6-astra-achieved-embodied-intelligence-figures/tab08.png
    caption: "RoboLab 추가 과제별 성공률과 비용"
    page: 45
    bbox_norm: [0.106, 0.2261, 0.894, 0.5005]
    strategy: table-region
    curated: false
  - id: tab09
    label: Table 9
    kind: table
    file: assets/cai-2026-has-gpt-6-astra-achieved-embodied-intelligence/tab09.png
    raw: raw/papers/cai-2026-has-gpt-6-astra-achieved-embodied-intelligence-figures/tab09.png
    caption: "LHPR-VLN 전체 성능"
    page: 46
    bbox_norm: [0.1055, 0.3592, 0.8956, 0.5479]
    strategy: table-region
    curated: false
  - id: tab10
    label: Table 10
    kind: table
    file: assets/cai-2026-has-gpt-6-astra-achieved-embodied-intelligence/tab10.png
    raw: raw/papers/cai-2026-has-gpt-6-astra-achieved-embodied-intelligence-figures/tab10.png
    caption: "VLN-CE R2R과 RxR 전체 성능"
    page: 47
    bbox_norm: [0.106, 0.5434, 0.8963, 0.8643]
    strategy: table-region
    curated: false
  - id: tab11
    label: Table 11
    kind: table
    file: assets/cai-2026-has-gpt-6-astra-achieved-embodied-intelligence/tab11.png
    raw: raw/papers/cai-2026-has-gpt-6-astra-achieved-embodied-intelligence-figures/tab11.png
    caption: "SIMPLE 여섯 과제 평가 세트의 단계별 성공률 비교"
    page: 49
    bbox_norm: [0.1055, 0.0969, 0.8945, 0.3922]
    strategy: table-region
    curated: false
  - id: tab12
    label: Table 12
    kind: table
    file: assets/cai-2026-has-gpt-6-astra-achieved-embodied-intelligence/tab12.png
    raw: raw/papers/cai-2026-has-gpt-6-astra-achieved-embodied-intelligence-figures/tab12.png
    caption: "SIMPLE에서 zero-shot과 ICL의 1배 budget 성공률, 효율, 비용 비교. Common-4 성공률이 70.8%에서 90.8%로 오르고 평균 action step이 376.9에서 210.4로 줄어든다"
    page: 50
    bbox_norm: [0.106, 0.0975, 0.894, 0.3361]
    strategy: table-region
    curated: false
  - id: tab13
    label: Table 13
    kind: table
    file: assets/cai-2026-has-gpt-6-astra-achieved-embodied-intelligence/tab13.png
    raw: raw/papers/cai-2026-has-gpt-6-astra-achieved-embodied-intelligence-figures/tab13.png
    caption: "RoboDojo 42개 과제에서의 harness 설계 ablation. 에이전트 구성 요소, action 표현과 chunking, System 1과 System 2 협업 세 묶음의 점수, 성공률, 토큰 사용량이다"
    page: 51
    bbox_norm: [0.1633, 0.3044, 0.8338, 0.5824]
    strategy: table-region
    curated: true
  - id: tab14
    label: Table 14
    kind: table
    file: assets/cai-2026-has-gpt-6-astra-achieved-embodied-intelligence/tab14.png
    raw: raw/papers/cai-2026-has-gpt-6-astra-achieved-embodied-intelligence-figures/tab14.png
    caption: "실세계 8개 플랫폼의 카메라, action 인터페이스, 제공 컨텍스트, 과제별 성공 횟수. 어떤 플랫폼에도 시연 데이터를 쓰지 않았다"
    page: 53
    bbox_norm: [0.1057, 0.1316, 0.894, 0.7008]
    strategy: table-region
    curated: true
---

## 한 줄 요약 (One-line Summary)

범용 frontier 모델 GPT-6-Astra를 12개 embodied 벤치마크, harness ablation, 8대 실제 로봇, 차세대 벤치마크 프로토타입으로 검증한 기술 보고서다. in-context learning과 10배 step budget으로 다수 벤치마크가 포화에 가까워지지만, 과제 간 전이, 비용과 시간, 물리적 성공 검증, 비가역 실패 복구, long-horizon 진행 유지는 여전히 풀리지 않았다고 결론짓는다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 제목 | Has GPT-6-Astra Achieved Embodied Intelligence? |
| 저자 | Joint Research Team (SenseNova, Acerobotics, Ropedia, NTU Singapore, The University of Tokyo). Project Leads: Zhongang Cai, Zhonghua Wu, Qingyi Tao |
| 공개 | arXiv 2610.22471v1 [cs.RO], 2026년 10월 15일 |
| 분량 | 본문 18쪽, 전체 66쪽 (부록에 관련 연구, 벤치마크별 전체 결과, harness ablation, 실제 로봇 전체 결과) |
| 홈페이지 | sensenova.ai/has-gpt-6-astra-achieved-embodied-intelligence |
| SOTA 기준일 | 2026년 10월 12일 |
| 선행 연구 | 같은 그룹이 GPT-5를 8개 spatial intelligence 벤치마크로 평가한 이전 보고서의 연장선이다. 이번에는 공간 지능에서 embodied intelligence로, 인식과 추론에서 closed-loop 제어로 범위를 넓혔다 |

보고서는 GPT-6-Astra가 "얼마나 잘하는가"뿐 아니라 "그 능력이 분야에 무엇을 뜻하는가"를 묻는다. 구성은 네 부분이다.

1. 통합 프로토콜 아래 12개 벤치마크 대규모 평가 (2장)
2. embodied 제어용 agentic harness ablation (3장)
3. 8대 로봇 구성의 실세계 검증 (4장)
4. 차세대 embodied 벤치마크 원칙과 가정 환경 프로토타입 (5장)

## 2. 주요 기여 (Key Contributions)

- **통합 프로토콜 평가**: 탁상 로봇 팔, humanoid, 모바일 플랫폼, dexterous hand, 내비게이션을 아우르는 12개 벤치마크를 한 프로토콜로 평가했다. 훈련 세트 시연 데이터(demonstration)로부터의 in-context learning(ICL)을 허용하고 step budget을 최대 10배로 늘린 조건에서 GPT-6-Astra는 LIBERO 계열과 SIMPLE에서 포화에 가깝고, RoboDojo 81.9%, DexJoCo 87.3%를 기록했다.
- **남은 한계 6가지 식별**: ICL의 과제 간 전이 부족, 비현실적인 추론 비용과 실행 시간, 물리적 성공 검증 실패, 실패 원인 파악 실패, 비가역 실패로부터의 복구 불가, long-horizon 진행 유지 실패다.
- **harness ablation**: System 2(GPT-6-Astra)가 System 1(π0.5)이 제안한 action을 실행 전에 검토하는 closed-loop 협업이 효과적이지만 토큰 비용이 크다는 점, joint angle보다 의미적으로 정렬된 end-effector 명령이 낫다는 점, adaptive action chunking이 성공률과 호출 수를 함께 개선한다는 점을 보였다.
- **실세계 검증**: 8대 플랫폼에서 zero-shot으로 같은 모델이 모든 형상을 제어했다. active vision을 스스로 발현했고, 느린 System 2가 고주파 System 0 locomotion controller 위에서 직접 동작할 수 있음을 보였다. 동시에 시연 데이터 수집 비용과 물리적 제약 때문에 시뮬레이션의 "실행을 늘려 성공률을 사는" 전략이 성립하지 않음을 확인했다.
- **차세대 벤치마크 원칙과 프로토타입**: 사람의 필요에서 도출한 과제, 도메인 내 시연 데이터 없음, 에이전트가 생각하는 동안에도 흐르는 world clock이라는 세 원칙을 제안하고 Isaac Sim 기반 원룸 아파트 프로토타입으로 구체화했다.

결론은 "GPT-6-Astra는 embodied competence의 문턱은 대체로 넘었지만 실용적 embodied intelligence의 문턱은 아직 넘지 못했다"이다. 남은 핵심 과제는 벤치마크 성공을 신뢰성 있고 효율적이며 확장 가능한 실세계 배포로 옮기는 일이다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 평가 대상 벤치마크

12개 평가 설정은 다섯 분류로 묶인다.

| 분류 | 벤치마크 |
|---|---|
| 탁상 manipulation | RoboDojo, RoboLab, LIBERO-Long++, LIBERO-Ultra-Long, LIBERO-PRO |
| dexterous manipulation | Bench2Dex, DexJoCo |
| humanoid loco-manipulation | SIMPLE |
| long-horizon 가정 활동 | BEHAVIOR |
| vision-language navigation | VLN-CE R2R, VLN-CE RxR, LHPR-VLN |

모든 평가에서 모델 가중치는 고정된다.

### 3.2 통합 프로토콜

프로토콜은 두 원칙을 따른다.

1. **훈련 세트 ICL 허용**: 기존 학습형 policy는 벤치마크가 제공하는 시연 데이터로 학습하거나 fine-tuning한다. GPT-6-Astra에게 이 시연 데이터를 주지 않으면 다른 정보 조건에서 비교하는 셈이 되므로, 가중치를 바꾸지 않고 컨텍스트 준비만으로 같은 정보를 활용하게 한다.
2. **step budget 확장**: GPT-6-Astra는 실패한 action을 알아채고 전략을 수정해 회복하는 경우가 많은데, 엄격한 step 한도는 회복 전에 episode를 끊는다. 따라서 표준 budget(1배)과 최대 10배까지의 확장 budget 두 조건을 보고한다.

**ICL 준비 단계**: 테스트 전에 과제마다 별도의 준비 단계를 둔다. GPT-6-Astra는 벤치마크에 맞는 observation과 시연 action으로 표현된 훈련 시연 데이터를 분석해 과제별 노트와 재사용 코드를 만든다. 이 자료들이 knowledge package K를 이루며, 평가 전에 고정(hash, read-only)되어 그 과제의 모든 테스트 episode에 제공된다. held-out 테스트 episode와 평가자 전용 정보는 준비에서 제외된다.

**episode 평가**: 각 테스트 episode는 지시문(instruction), 고정된 K, 허용된 observation과 action 인터페이스를 가진 새 세션에서 시작한다. 결정 시점마다 GPT-6-Astra가 현재 observation을 보고 다음 action 또는 action 시퀀스를 정하면 환경이 실행하고 새 observation을 돌려준다. episode 안에서는 상호작용 기록이 유지되어 실수를 진단하고 복구를 시도할 수 있다. 테스트 중 K와 가중치는 갱신되지 않고 episode 사이에 정보가 전달되지 않는다. observation 접근, action 의미, control frequency, 성공 기준은 budget 조건과 무관하게 같다.

**확장 budget**: 1배 결과와 2배부터 10배까지의 누적 cutoff 결과를 함께 보고한다. 연장은 리셋이 아니라 같은 episode의 연속이어서 상호작용 기록과 환경에 누적된 결과가 유지된다. episode는 검증된 성공, 해당 terminal failure, budget 소진 중 하나로 끝난다.

### 3.3 knowledge package 구성

GPT-6-Astra가 무엇을 보관할지는 사람이 지정하지 않았다. 그럼에도 벤치마크 전반에 여섯 구성 요소가 반복적으로 나타났다.

| 구성 요소 | 내용 | 대표 파일 형식 |
|---|---|---|
| Task guidance | 과제 목표, 실행 단계, 전략, subtask 순서, 물체 역할, 제약 | .md |
| Motion references | 시연에서 뽑은 trajectory, grasp 구성, phase anchor | .npz |
| Visual references | 시연 프레임, 접촉 부위 crop, 중간 상태 이미지 | .png |
| Executable helpers | forward/inverse kinematics, 참조 검색, action 생성 Python 코드 | .py |
| Checks & recovery | 완료 판정 근거, 실패 증상과 교정 action 대응 | .md, .py |
| Metadata & provenance | 로봇 사양, 인터페이스 규약, 출처 기록, 검증 노트 | .md, .py |

벤치마크마다 보관 내용의 비중이 다르다. Bench2Dex와 DexJoCo는 손 구성, phase별 동작 예시, dexterous 제어 helper를 강조한다. LIBERO-Long++와 Ultra-Long은 조합 가능한 atomic skill 중심으로 시연을 정리하고, LIBERO-PRO는 탐색에서 얻은 텍스트 전략과 복구 지식을 주로 남긴다. SIMPLE은 수치 trajectory 전체와 action chunk 추출 helper를, VLN 계열은 내비게이션 전략, 랜드마크 참조, 정지 안내를, BEHAVIOR는 물체별 grasp affordance, 양손과 도구 접촉 기하, 조건부 검증 절차를 남긴다.

**사용 방식**: 사후 분석 결과 모든 벤치마크에서 공통 흐름이 보였다. 과제 안내를 읽고, 준비된 helper로 후보 동작을 검색하고, 시각 참조와 대조해 실행을 검사한다. 시연을 그대로 재생하지 않고 현재 장면에 맞춰 조정한다. 예를 들어 Bench2Dex Ball Box Loading에서는 참조 관절을 재매핑하고 작업 공간 높이 차이 4~5 cm를 보정하면서 시연의 양손 지지 기하를 유지했고, DexJoCo Photograph에서는 미끄러짐 후 다른 참조 집기 동작을 골랐다. 다만 이 분석은 개별 구성 요소의 인과적 기여를 분리하지 않는다.

### 3.4 harness ablation 설계 (3장)

**System 1과 System 2 협업**: GPT-6-Astra를 System 2로, RoboDojo로 fine-tuning한 π0.5를 System 1(VLA)로 둔다. 비교 설정은 다음과 같다.

| 설정 | 동작 |
|---|---|
| standalone VLA | GPT 감독 없이 VLA만 실행 |
| open-loop 협업 | GPT가 subgoal을 지정하고 VLA가 joint action 시퀀스를 바로 실행 |
| closed-loop 협업 | VLA가 제안한 action을 forward kinematics로 후보 EEF 동작으로 바꾸고 GPT가 실행 전 수락, 수정, 거부 |
| closed-loop (L=4) | GPT 호출 한 번에 VLA 제안 EEF action 4개를 검토 |
| ICL | 2장의 knowledge package를 쓰는 직접 제어 에이전트 |
| ICL + VLA closed-loop | knowledge package와 closed-loop 협업(L=2) 결합 |

**action 표현과 chunking**: 기준선은 RoboRSI 에이전트 프레임워크로, GPT-6-Astra가 RGB 이미지와 로봇 상태를 보고 결정마다 절대 Cartesian end-effector(EEF) action 하나를 낸다. 비교 대상은 상대 이동 방향과 거리를 지정하는 directional motion command, 직접 joint angle 제어, 고정 action chunk(L=4), 모델이 L을 1~4 중에서 고르는 adaptive chunking이다.

**에이전트 구성 요소 (부록 D.1)**: planning subagent(과제를 subgoal과 완료 기준으로 분해), execution subagent(main 에이전트의 subgoal로 EEF action 생성), feedback subagent(실행 결과를 평가해 계속, 조정, 재시도 제안), history compression(최근 4턴만 유지하고 이전 상호작용은 2,000토큰 상한의 rolling summary로 통합)을 하나씩 추가해 비교했다.

모든 harness 실험은 RoboDojo 42개 과제에서 과제마다 seed를 달리한 3회 실행으로 평가했다(ICL은 Table 5 설정). 부분 완료를 반영한 점수와 완전 성공률을 함께 보고하고, Generalization, Precision, Long-Horizon, Memory, Open 다섯 범주로 나눈다.

### 3.5 실세계 변형 프로토콜 (4장)

시뮬레이션 프로토콜은 "테스트 과제의 성공 시연 데이터가 존재한다"와 "추가 실행 step은 공짜다"라는 두 가정에 기대는데, 실제 로봇에서는 둘 다 성립하지 않는다. 그래서 세 가지를 바꿨다.

1. **zero-shot**: 시연 데이터와 데이터에서 추출한 knowledge package를 주지 않는다. 과제나 로봇 특화 학습 없이 generalist로 동작한다.
2. **구조화된 사람 사전 지식을 컨텍스트로 제공**: tool schema, joint limit, 카메라 배치, 안전 제약, dexterous hand 개폐 preset 등 배포 시 통상 얻을 수 있는 정보를 사람이 적어 준다. 일부 플랫폼에는 허용 grasp 지점 같은 과제 수준 안내도 준다. pick, place, insert 같은 고수준 semantic skill은 어떤 플랫폼에도 제공하지 않는다.
3. **wall-clock budget과 성공 기준**: step 대신 시간으로 budget을 잡고(보통 60분), 운영자가 비상 정지 버튼을 계속 쥔다. 성공은 모델의 완료 선언이 아니라 사람이 물리적 결과로 판정한다. 천 접기 같은 변형 물체 과제는 공통 품질 기준을 정하기 어려워 "끝까지 수행했는지"만 나타낸다.

| 형상 분류 | 플랫폼 | 대수 | 주요 질문 | 과제 |
|---|---|---|---|---|
| 단일 팔, 그리퍼 | Franka 3, Franka Panda, PiPER + Pika gripper | 3 | 시뮬레이션 결과가 강체에서 변형 물체, 정밀 과제로 전이되는가 | 쌓기, 그릇 포개기, 천과 수건 접기, 플러그 삽입 |
| 양팔, 그리퍼 | AgileX Piper | 1 | 두 팔을 조율해 더 어려운 zero-shot 과제를 하는가 | 순서 있는 접기, 꽃 꽂기, 양손 들기, 분류 |
| 양팔, dexterous hand | Tianji M6S | 1 | 고자유도 손을 제어하는가 | 장난감과 병 잡기 |
| 바퀴형 모바일 manipulator | Galaxea R1 Pro, AgileX Tracer + xArm7 | 2 | 방 규모 거리와 long-horizon에서 동작하는가 | 세탁기 찾아 버튼 누르기, 꽃 모으기, 쟁반 정리, 내비게이션과 탐색 |
| humanoid | Unitree G1 | 1 | 저수준 locomotion과 팔 제어 위의 System 2로 동작하는가 | 탁상 집어 떨어뜨리기, 회전 후 접근과 정지 |

### 3.6 차세대 벤치마크 원칙 (5장)

기존 embodied 벤치마크는 imitation learning policy를 위해 설계됐다. 과제 시연 데이터를 모으고, policy를 맞추고, 같은 과제의 held-out episode로 평가한다. 따라서 범용 에이전트에게 이런 벤치마크는 "벤치마크가 제공하는 것을 얼마나 잘 활용하는가"를 일부 측정하게 되고, 난이도를 올리는 통상적 대응으로는 이 문제가 바뀌지 않는다. 보고서는 언어 에이전트 평가처럼 "에이전트가 로봇 센서로만 세계를 보고, 하드웨어가 노출한 명령으로만 행동하며, 계속 진행하는 세계에서 단일 배포 단위로 평가되는" 설정을 목표로 한다.

현재 벤치마크는 PDDL에서 영향을 받은 BDDL처럼 장면 물체에 대한 목표 조건이 한 상태에서 참이면 성공으로 본다. 이 방식은 고전 planning의 가정(완전히 명세된 목표와 이진 성공, 에이전트 action으로만 변하는 세계, step 단위 시간, 주어진 world model)을 물려받는다. 세 원칙은 각각 이 가정 중 하나 이상을 깬다.

| 원칙 | 내용 | 깨는 가정 |
|---|---|---|
| 사람의 필요에서 도출한 과제 | 사람이 말할 법한 요청("아침 좀 만들어 줄래?")으로 과제를 주고, 고정 목표 상태가 아니라 결과의 효용으로 평가한다. 명시되지 않은 의무(켜진 버너, 흐르는 수도, 열어 둔 수납장)를 Duty로, 명시 요청을 Intent로 같은 배포에 두고 world clock 마감을 건다 | 완전 명세 목표, 이진 성공 |
| 테스트 시점에 쌓는 경험 | 도메인 내 훈련 episode나 장면 특화 시연 데이터를 주지 않는다. 판정 술어는 에이전트가 볼 수 없는 물리량으로 정의하고, 탐색에도 다른 action과 같은 world time과 부작용을 부과한다. 평가 단위는 배포이며 그 안에서 얼마나 빨리 능숙해지는지가 관심 대상이다 | 주어진 world model |
| 멈추지 않는 세계 | observation과 다음 명령 사이 시간(추론, tool use, 통신)을 이전 명령 아래에서 시뮬레이션한다. 호스트의 시뮬레이션과 렌더링 시간은 부과하지 않는다. 판정자는 완료 선언 이후 일정 시간까지 world clock 위의 전체 trajectory를 본다 | step 단위 시간, 에이전트만 세계를 바꿈 |

"아침 만들기"는 계층적 planning의 고수준 action처럼 토스트 한 조각부터 완전한 식사까지 여러 refinement를 허용한다. 목표 공식은 작성자가 고른 하나만 남기므로, 부분 점수 대신 결과에 대한 효용 함수가 필요하다. 고정 검사가 지시문과 모순되는 예도 있다. Bench2Dex의 condiment-box-loading 과제는 조미료 세 개를 상자에 넣으라고 하지만 성공 검사는 간장과 식초 병이 세워져 있을 것까지 요구한다. 또 유능한 에이전트는 검사가 예상하지 못한 방식으로 요청을 만족하거나 요청보다 약한 검사를 악용할 수 있으므로, 판정자 자체를 사람의 결과 순위와 대조해 검증해야 한다.

Figure 10의 요청 명세 예시는 다음 요소를 담는다: 발화("Could you make me breakfast?"), 거주자 15분 후 외출이라는 컨텍스트, 사고 시간이 흐르게 하는 world clock, 완료 후 5분까지 관찰, 허용 결과별 점수(토스트 0.5, 달걀과 토스트 0.8, 달걀과 토스트와 커피 1.0), 15분 내 제공 시 가치 1이고 30분 후 0인 선형 감쇠, 에이전트에게 숨긴 술어(심부 온도 70°C 이상이면 익음, 표면 온도 200°C 이상이면 탐), 화재나 사람 접촉 금지, 냉장고가 열리면 1분 내 닫기, 빈 버너가 켜지면 2분 내 끄기, 바닥에 물이 있으면 5분 내 닦기. 반면 BEHAVIOR-1K cook_bacon은 매 step 현재 상태로 목표를 검사해 처음 참이 되는 순간 성공이며, 버너를 끌 필요가 없고 cooked는 최고 온도가 임계를 넘은 뒤 계속 참이라 탄 베이컨도 익은 것으로 친다.

### 3.7 가정 proof of concept 구축

NVIDIA Isaac Sim에 재현 가능한 파이프라인으로 완전 상호작용 원룸 아파트를 만들었다.

1. 공개 asset과 평면도로 집 구성 (발코니, 거실, 침실, 주방, 욕실)
2. 코딩 에이전트가 사람 검토 아래 일상 물건을 실제 규모로 이름 붙은 지지면에 배치
3. 모든 부품에 물리 연결: articulation, 접촉, position-based fluid와 천, 일상 가전의 가열과 조리 과정
4. 필요만 진술하는 과제 설계 (Intent와 Duty)
5. 에이전트는 로봇 탑재 카메라로만 보고, 사고 시간이 world time을 진행시킨다

판정 결과의 의미는 물리의 충실도에 달려 있으므로 causal fidelity를 목표로 했다. 물체 질량과 마찰부터 버너에서 팬, 음식으로 흐르는 열까지 에이전트 결정이 의존하는 모든 것을 올바른 인과로 시뮬레이션하고 실세계 참조에 근거시킨다. 로봇은 AgiBot G2이며, GPT-6-Astra는 4장의 zero-shot 설정으로 로봇 자체 인터페이스를 통해 제어하고 탑재 카메라와 proprioception만 observation으로 받는다. 형상 설명 외에 시연 데이터는 없다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 벤치마크별 성공률 (Table 2)

| 분류 | 벤치마크 | SOTA (방법) | Agentic SOTA (방법) | 1배 | 10배 누적 | 10배 실행의 1배 cutoff |
|---|---|---|---|---|---|---|
| 탁상 | LIBERO-Long++ | 82.0 (LiLo-VLA) | 없음 | 97.5 | 100.0 | 97.5 |
| 탁상 | LIBERO-PRO | 50.0 (πRLinf) | 92.6 (RPent / GPT-6 Astra) | 98.3 | 99.3 | 98.3 |
| 탁상 | LIBERO-Ultra-Long | 44.0 (LiLo-VLA) | 없음 | 82.2 | 98.9 | 82.2 |
| 탁상 | RoboDojo | 29.6 (Awomo-0.5) | 31.4 (PhysicalRSI) | 54.2 (VLA 사용) | 81.9 | 27.6 |
| 탁상 | RoboLab (zero-shot) | 42.9 (FLUX 3 Action) | 없음 | 57.1 | 69.2 | 57.1 |
| humanoid | SIMPLE | 92.5 (Psi-0) | 없음 | 96.3 | 98.8 | 97.5 |
| 모바일 | BEHAVIOR | 14.8 (Rondo) | 5.3 (Agent) | 37.0 | 미실시 | 미실시 |
| dexterous | DexJoCo | 40.3 (π0.5) | 없음 | 78.2 | 87.3 | 78.2 |
| dexterous | Bench2Dex | 25.5 (π0.5) | 없음 | 25.6 | 61.5 | 25.6 |
| 내비게이션 | VLN-CE RxR | 76.5 (Qwen-RobotNav) | 없음 | 82.0 | 90.0 | 84.0 |
| 내비게이션 | VLN-CE R2R | 77.4 (Robostral Navigate) | 81.3 (GPT-6-Astra ultra) | 80.0 | 88.0 | 85.0 |
| 내비게이션 | LHPR-VLN | 2.4 (FantasyVLN) | 5.3 (Claude Code Opus-5) | 21.1 | 28.9 | 25.4 |

단위는 %다. 1배 실행은 10배 실행과 별도로 수행했고 각 budget을 컨텍스트에 알려 주었다. RoboLab은 훈련 세트가 없어 ICL이 없고, BEHAVIOR는 공식 budget이 이미 길어 10배로 늘리지 않았다.

1배에서도 대부분 설정에서 기존 최고 성능과 같거나 높고, LIBERO-Ultra-Long과 DexJoCo에서는 기존 최고 성공률의 거의 두 배다.

### 4.2 ICL의 효과

SIMPLE에서 zero-shot과 ICL을 비교하면(Table 12) ICL의 기여가 분리된다.

| 지표 | zero-shot | ICL | Psi-0 (참고) |
|---|---|---|---|
| Common-4 성공률 | 85/120 (70.8%) | 109/120 (90.8%) | 108/120 (90.0%) |
| 6과제 성공률 (참고용, 분모 상이) | 110/167 (65.9%) | 111/126 (88.1%) | 154/180 (85.6%) |
| 평균 action step (둘 다 성공한 81 episode) | 376.9 | 210.4 | 없음 |
| 평균 테스트 토큰 | 264만 | 640만 | 없음 |
| 평균 테스트 시간 | 47.0분 | 31.4분 | 없음 |
| ICL 준비 (과제당 1회) | 없음 | 834만 토큰, 90.4분 | 없음 |

ICL은 action step을 44.2% 줄였다. ICL 효과는 훈련 데이터가 테스트 과제를 얼마나 덮는지에 달려 있다. LIBERO 계열, SIMPLE, VLN-CE처럼 테스트가 훈련 분포를 가깝게 따르면 패키지가 시연 동작이나 경로를 거의 그대로 검색, 조정해 포화에 가까워진다. DexJoCo의 접촉이 많은 dexterous 과제도 phase별 동작 참조와 controller helper가 잘 덮는다. 반면 RoboLab은 과제 수준 패키지를 만들 훈련 세트가 없어 성공률이 중간에 머문다.

### 4.3 budget 확장의 효과

ICL을 써도 1배에서 크게 미해결인 벤치마크는 RoboDojo, Bench2Dex, BEHAVIOR, LHPR-VLN 네 개다. 앞의 둘은 반복 교정이 필요한 정밀 양손 또는 dexterous manipulation이고, 뒤의 둘은 여러 단계에 걸쳐 subgoal을 추적해야 하는 긴 가정 manipulation이나 내비게이션이다.

| 벤치마크 | 1배 → 10배 | 해석 |
|---|---|---|
| RoboDojo | 27.6% → 81.9% (약 3배) | 1배에서 끝나지 않은 episode의 약 4분의 3이 완료. Precision 그룹이 가장 크게 증가 |
| Bench2Dex | 25.6% → 61.5% (2배 이상) | 표준 budget이 생산적인 실행과 복구를 끊고 있었다 |
| LHPR-VLN | 25.4% → 28.9% | 소폭 상승. long-horizon 내비게이션 요구는 상호작용 추가만으로 해결되지 않는다 |
| DexJoCo, VLN-CE | 약 90% 도달 | 이미 높은 벤치마크도 이득 |
| LIBERO 계열, SIMPLE | 95% 초과 | 포화 근접 |

Figure 4의 회색 상한선은 budget을 소진한 모든 episode가 무한 budget에서는 성공한다고 가정한 값이다(RoboDojo 90.0%, Bench2Dex 69.2%, DexJoCo 90.9%, LHPR-VLN 28.9% 등).

### 4.4 RoboDojo 그룹별 결과 (Table 5)

| 그룹 | 기존 GPT-6-Astra 보고 (점수 / 성공률) | Awomo-0.5 | 본 연구 1배 | 본 연구 10배 | 1배 토큰 / 10배 토큰 (백만) | 1배 시간 / 10배 시간 (분) |
|---|---|---|---|---|---|---|
| Generalization | 35.32 / 32.67 | 37.70 / 30.89 | 34.92 / 28.33 | 81.42 / 75.00 | 15.58 / 52.47 | 82.2 / 329.2 |
| Precision | 12.65 / 4.00 | 39.66 / 33.50 | 28.62 / 15.00 | 91.00 / 87.50 | 9.17 / 37.86 | 35.4 / 198.0 |
| Long-Horizon | 21.45 / 8.25 | 40.36 / 26.75 | 41.37 / 20.00 | 95.00 / 90.00 | 16.71 / 38.42 | 66.9 / 195.8 |
| Memory | 43.03 / 38.67 | 42.27 / 41.22 | 73.67 / 70.00 | 96.67 / 96.67 | 10.11 / 10.55 | 27.1 / 29.8 |
| Open | 34.36 / 31.00 | 24.09 / 22.92 | 17.63 / 15.00 | 73.00 / 67.50 | 8.64 / 39.91 | 42.1 / 227.2 |

본 연구는 과제당 5 episode, 총 210 episode다. Open 그룹은 과제 특화 시연 데이터가 없고 다른 네 그룹에서 만든 패키지에 기대므로 모든 그룹 중 성공률이 가장 낮다. 과제별로는 Store laptop and headphones가 10배에서도 성공률 0%(점수 40)로 남았고 10배 평균 시간이 1,125.3분, Fasten screws는 10배 평균 토큰 1억 7,863만 개와 922.5분이 들었다. 기존 연구는 다른 frontier LLM들이 RoboDojo에서 2% 미만 성공률이었다고 보고했다.

### 4.5 RoboLab 결과 (Table 6)

| policy | 유형 | 성공률 | 크기 |
|---|---|---|---|
| GPT-6-Astra 10배 | Agent | 69.2% | 미공개 |
| GPT-6-Astra 1배 | Agent | 57.1% | 미공개 |
| FLUX 3 Action | WAM | 42.9% | 7B |
| Cosmos3-Nano-Policy | WAM | 36.8% | 16B |
| π0.5 | VLA | 28.0% | 3.3B |
| DreamZero | WAM | 25.7% | 14B |
| Cosmos3-Edge-Policy | WAM | 22.9% | 4B |
| π0-FAST | VLA | 15.5% | 3B |
| GR00T N1.6 | VLA | 7.2% | 3B |
| π0 | VLA | 5.0% | 3.3B |
| paligemma-binning | VLA | 3.4% | 3B |

WAM은 world action model이다. 기준선은 공식 리더보드 값(각 1,200 episode)이며 같은 추론 비용 조건의 비교는 아니다.

### 4.6 LIBERO 계열 세부

- **LIBERO-PRO**: 8개 suite, suite당 10과제, 과제당 10개 고정 초기 상태로 800 episode 전체를 평가했다. 1배에서 786/800(98.25%)로 기존 최고인 RPent/GPT-6-Astra(low reasoning) 92.63%보다 5.62%p 높다. 6개 suite에서 99~100%이고 오류는 Long Task(97%)와 Long Swap(90%)에 몰렸다. 10배에서는 794/800(99.25%)다. 가장 어려운 과제는 Yellow-white mug in microwave로 Swap 변형이 1배 30%, 10배 70%였고 10배 평균 1,451만 토큰과 164.0분이 들었다. observation은 고정 3인칭 카메라와 Panda 손목 카메라이고, action은 20Hz 7차원 OSC-pose 명령(평행 이동 3, axis-angle 회전 3, 그리퍼 1)이며 단위 평행 이동은 5 cm, 단위 회전은 0.5 rad다. 1배 경계는 환경 step 10,000 또는 planner 턴 100 중 먼저 오는 쪽이다.
- **LIBERO-Long++ / Ultra-Long**: 패키지는 atomic skill 훈련 split(trajectory 4,050개, atomic skill당 150개, transition 351,999개)으로만 만들었다. Long++ 평균 1배 97.5%, 10배 100.0%이고 Ultra-Long 평균 1배 82.2%, 10배 98.9%다. Ultra-Long Original 시나리오는 1배 63.3%였다. episode당 비용은 Long++ 약 104만 토큰과 53.1분, Ultra-Long 약 889만 토큰과 110.9분이다.

### 4.7 비용과 시간

GPT-6-Astra의 강한 성능은 큰 토큰과 시간 비용을 동반한다(Figure 5). 소비 토큰의 약 98%가 캐시된 입력 토큰이어서 보고서는 "100만 토큰 ≈ 1 USD"를 비용 추정 경험칙으로 쓴다.

- LIBERO-Long++는 1배 성공률이 97%를 넘는데도 episode당 약 100만 토큰과 거의 1시간의 추론과 tool use이 든다.
- LIBERO-Ultra-Long은 약 900만 토큰과 거의 2시간이다.
- RoboDojo는 확장 budget에서 episode 하나가 평균 3시간 이상 걸린다.
- 확장 비용은 결국 실패하는 어려운 episode에 몰린다.
- 추론 지연은 action step budget에 포함되지 않으므로 실시간 제어가 필요한 배포를 제한한다.
- RoboDojo의 표준 budget은 명령된 동작 시간으로 8~76초인데 평균 계산 시간은 55분이다.

### 4.8 남은 실패 유형 (2.4절)

| 유형 | 사례 | 요지 |
|---|---|---|
| ICL의 과제 특화성 | RoboDojo Open 그룹, RoboLab | 패키지가 과제 수준 안내, 동작 참조, helper를 주로 담아 원 데이터와 멀어지면 효과가 약해진다 |
| 시간과 비용 | 4.7 참조 | 포화에 가까운 벤치마크에서도 비용이 크다 |
| 물리적 성공 검증 | Bench2Dex Jigsaw Puzzle Assembly: 네 조각이 직사각형을 이뤘다고 보고하면서 episode가 끝나지 않자 세부 조정을 계속해 오히려 조각을 벌려 놓음. RoboDojo Hang mugs: 머리 카메라에서 손잡이와 못이 겹쳐 보이는 것을 걸린 증거로 삼았지만 실제로는 컵이 테이블 위. 이후 재grasp에서도 손가락이 닫힌 것을 접촉으로 오인. Fill egg holder: 달걀 4개를 모두 옮기고 안착했다고 보고했지만 부분 점수로 실패 | 시각적 그럴듯함과 자가 보고가 실제 완료 조건과 어긋나 반복 교정이나 성급한 확신을 낳는다 |
| 결과가 큰 action으로부터의 복구 | RoboDojo Pour liquid into cup: 컵이 넘어져 액체가 쏟아짐. 컵을 세우고 다시 따랐지만 쏟아진 것은 되돌릴 수 없어 budget 대부분을 남기고 종료. DexJoCo Assembly: 못이 바닥에 떨어지자 닿을 수 없다고 판단하고 팔을 멈춤 | 선행 조건(용기 열기, 물체 고정)인 단계가 실패하면 하위 subtask가 진행되지 않는다. 성공적 복구는 대개 반복이 아니라 전략 변경(DexJoCo Fold Glasses에서 측면 접근과 시험 들기로 전환)이었다 |
| long-horizon 진행 유지 | RoboDojo Store laptop and headphones: 헤드폰을 걸어 둔 뒤 이어컵을 조정하다 헤드밴드가 빠짐. BEHAVIOR can_meat: 들고 있던 병이 다음 동작 중 기울어 떨어짐 | 완료한 subgoal을 영구 해결로 취급하지 말고 앞서 만든 조건을 추적, 재확인해야 한다 |

### 4.9 harness ablation 결과 (Table 13, Figure 7)

| 설정 | 평균 점수 / 성공률 (%) | 토큰 (백만) |
|---|---|---|
| Baseline (RoboRSI) | 22.78 / 15.56 | 2.56 |
| + planning subagent | 26.03 / 19.44 | 2.96 |
| + execution subagent | 21.56 / 15.28 | 2.55 |
| + feedback subagent | 30.00 / 24.72 | 2.74 |
| + history compression | 28.03 / 21.11 | 0.86 |
| + directional motion command | 26.61 / 18.06 | 1.91 |
| + joint angle | 16.08 / 9.72 | 1.12 |
| + fixed action chunk (L=4) | 17.97 / 11.39 | 0.43 |
| + adaptive action chunk | 26.36 / 20.00 | 1.15 |
| VLA (π0.5) 단독 | 11.41 / 6.91 | 없음 |
| + VLA open-loop | 11.21 / 5.83 | 0.39 |
| + VLA closed-loop | 31.15 / 23.61 | 7.66 |
| + VLA closed-loop (L=4) | 34.64 / 25.83 | 2.80 |
| + ICL | 39.24 / 29.67 | 9.57 |
| + ICL + VLA closed-loop | 60.08 / 54.17 | 19.33 |

- **협업 방식**: closed-loop 협업은 open-loop 대비 성공률을 최대 20.00%p 높이지만 action마다 검토하면 766만 토큰이 든다. 검토 범위를 L=4로 늘리면 토큰이 63.5% 줄어 280만 개가 되면서 성공률은 23.61%에서 25.83%로 오른다. ICL과 closed-loop 결합은 54.17%로 최고이며 ICL 없는 최선의 closed-loop 설정보다 28.34%p 높지만 그 설정의 약 6.9배인 1,934만 토큰을 쓴다.
- **action 표현**: directional command는 성공률을 2.50%p 올리고 joint angle은 5.84%p 떨어뜨린다. 보고서는 이를 멀티모달 모델의 embodied intelligence와 저수준 로봇 제어 공간 사이의 representation gap으로 해석한다.
- **chunking**: 고정 chunk(L=4)는 43.5만 토큰으로 가장 싸지만 성공률이 4.17%p 떨어지고, adaptive chunk는 114.6만 토큰으로 성공률을 4.44%p 올린다.
- **에이전트 구성 요소**: feedback subagent가 점수 7.22점, 성공률 9.16%p 상승으로 가장 크고 토큰은 7.03%만 늘었다. history compression은 점수 5.25점, 성공률 5.55%p를 올리면서 토큰을 66.41% 줄였다. planning subagent는 점수 3.25점 상승에 토큰 15.63% 증가였고 Memory 범주에서 크게 올랐다. execution subagent는 점수를 1.22점 떨어뜨렸다. 구성 요소의 개수보다 추가 추론이 실행을 어떻게 돕는지가 중요하다는 결론이다.

### 4.10 실세계 결과 (Table 14)

| 플랫폼 | 카메라 | action 인터페이스 | 추가 컨텍스트 | 결과 (성공 / 시도) |
|---|---|---|---|---|
| Franka 3 + Robotiq 2F-85 | 손목 ZED Mini, 3인칭 ZED 2 | end-effector pose + grasp label | 로봇 설정 | 블록 쌓기 6/6, 천 접기 2/4, 플러그 삽입 0/3 |
| Franka Panda + Franka Hand | 보정된 손목 웹캠 | 절대 end-effector pose + 그리퍼 개폐 | tool schema, joint limit, 안전 제약 | 테이프 롤 쌓기 3/3, 수건 접기 2/2, 천 접기 1/2, 플러그 삽입 0/5 |
| AgileX PiPER + Pika gripper | 손목, 측면 | end-effector pose와 그리퍼 명령, IK는 로컬 도구 | 단계별 과제 프롬프트, 허용 grasp 지점 | 그릇 포개기 3/3, 천 접기 3/3, 플러그 삽입 0/3 |
| AgileX Piper 양팔 | 정면, 손목 2개 | 사전 정의 프로토콜 없이 두 팔 직접 제어 | 로봇 사양과 공식 매뉴얼 | 12과제 14/14 |
| Tianji M6S + Wuji Gen-1 hands | 머리 Azure Kinect | end-effector pose + grasp label | tool schema, joint limit, 손 preset, 사람이 쓴 grasp 스크립트 | 장난감 잡기 3/3, 병 잡기 1/3 (사람 피드백 후 성공), 모델이 쓴 grasp 코드 0/3 |
| Galaxea R1 Pro | 머리 스테레오, 섀시 5개, 손목 D405 2개 | 노출된 로봇 부위를 직접 제어 | GPT-6-Astra가 로봇에서 1회 탐색 | 세탁기 찾아 버튼 누르기 2/2, 꽃 모으기 0/2 (몸통 과열 고장), 탁상 6과제 9/9 |
| AgileX Tracer + xArm7 | 팔 장착 RealSense D455 | 내비게이션 waypoint 3개 | 없음 (로봇 모델, SLAM, 충돌 감지 없음) | 내비게이션과 탐색 9/23 (5과제) |
| Unitree G1 (29 DoF) + Wuji Gen-1 hands | 머리 Azure Kinect | 팔 관절 목표 14개, 손 이진 개폐, IMU 회전, 0.15 m/s 시간 기반 보행, 정지 | tool schema, joint limit, 이진 손 preset, locomotion과 안전 제약 | 장난감 집어 떨어뜨리기 2/3, 회전 후 접근과 정지 3/3 |

**발견 1. 한 모델이 모든 형상을 제어하지만 성공은 과제에 달렸다.** 플랫폼 특화 학습 없이 같은 모델이 단일 팔부터 humanoid까지 8대를 제어했다. 강체 pick-and-place는 17/18로 안정적이고 시뮬레이션과 일치한다. 반면 변형 물체(Franka 3 천 접기 2/4), 정밀 접촉(세 플랫폼 플러그 삽입 0/11), long-horizon 모바일 과제(AgileX Tracer 내비게이션과 탐색 9/23)는 훨씬 어렵다. 두 번째 팔은 zero-shot으로 완수할 수 있는 과제 범위를 넓혔고, 접촉으로 받는 그릇이 밀려나자 실행 피드백으로 재계획했다.

**발견 2. 볼 수 있는 것이 할 수 있는 것을 정한다.** 실세계 성공은 프롬프트와 primitive 외에 카메라가 과제 결정 영역을 볼 수 있는지에 크게 좌우된다. 꽃 꽂기에서 그리퍼가 줄기를 위에서 세로로 잡으면 그리퍼와 함께 움직이는 손목 카메라로는 꽃 아래 꽃병 입구가 보이지 않는다. 단일 팔 Franka 3는 손목 카메라가 유일한 근접 시야라 입구를 보지 못하고 꽃을 꽃병 옆에 떨어뜨렸다. 양팔 Piper에서는 빈 팔을 움직여 그 손목 카메라로 꽃병 입구를 비춘 뒤 꽂기를 완료했다. 시점이 action space의 일부가 되는 active vision이다. 사람 운영자는 로봇 카메라가 아니라 자기 시점으로 장면을 보므로 teleoperation 시연 데이터에는 이런 행동이 거의 없고, 그런 시연에서 학습한 policy도 흉내 낼 대상이 없다. 로봇 카메라로만 보는 zero-shot 에이전트는 이를 스스로 발견해야 한다.

**발견 3. 기존 System 0 위의 System 2.** humanoid에서 GPT-6-Astra의 숙고는 로컬 모터 제어보다 훨씬 느리므로, 과제 학습된 System 1 없이 기존 System 0 controller로 직접 동작할 수 있는지 시험했다. SIMPLE에서는 관절, 몸체, locomotion 목표를 decoupled WBC 또는 AMO controller가 실행한다. 실제 G1에서는 팔 관절 목표와 손 이진 개폐로 manipulation(2/3)을, 제조사 속도 인터페이스로 회전과 보행(3/3)을 수행했다(두 과제는 따로 평가). 다만 이는 느린 피드백 기반 감독 아래 실현 가능성을 보인 것이지 신뢰성 있는 실시간 visuomotor 제어는 아니다.

### 4.11 실세계에서 달라지는 것 (4.3절)

시뮬레이션 결과를 만든 두 요소가 실세계에서 각각 제약을 받는다.

**물리적 제약이 확장 실행을 막는다.**

| 제약 | 사례 |
|---|---|
| 안전 | controller 한계를 넘는 접촉은 보호 정지를 일으켜 보통 시도를 끝낸다. Franka 3에서 얇은 천을 접다 그리퍼가 테이블에 닿은 경우, PiPER 플러그 삽입 시도 3회 중 2회가 관절 충돌 고장으로 끝난 경우가 있고, GPT-6-Astra는 하드웨어 수준 고장에서 복구하지 못한다. 떨어뜨린 물체 같은 결과는 비가역이다 |
| 기계적 한계 | 명령이 가하는 부하를 직접 피드백받지 못한다. Tianji M6S에서 반복 grasp 중 Wuji 손 손가락 관절이 부하로 멈췄고, 유일한 보호 장치는 모델 스스로 정한 온도 임계였는데 손이 62°C에 도달해 시도가 중단됐다. Galaxea R1 Pro 꽃 모으기 2회는 모두 몸통 과열 고장으로 끝났다 |
| 실시간 | 시뮬레이션에서는 모델이 숙고하는 동안 환경이 멈추지만 실제 로봇에서는 경과 시간을 통해 토큰, 안전 위험 노출, 하드웨어 부담, 사람 감독 비용이 모두 쌓인다. G1에서 GPT-6-Astra는 실행 시간의 약 90%를 숙고에 쓰고 manipulation 시도 하나에 1시간 이상 걸린다 |

**시연 데이터 부재가 ICL을 바꾼다.** 사람이 쓴 컨텍스트로 상당 범위의 과제가 가능하지만 이는 전문가의 프롬프트 엔지니어링이고 품질이 결과에 직결된다. Tianji 손에서 사전 정의 grasp primitive 없이 0/3이던 것이 사람이 쓴 grasp primitive로 3/3이 됐다. 컨텍스트가 꼭 사람에게서 올 필요는 없다. Galaxea R1 Pro에서는 GPT-6-Astra가 동작 없는 사전 친숙화 세션에서 제조사 문서와 센서, controller 실시간 탐색으로 자기 로봇 프로필을 작성했고 모든 과제 세션이 이 프로필에서 시작했다. 아직 평가하지 않은 대안 컨텍스트 원천으로 cross-embodiment 시연, 시뮬레이션 자가 생성 시연, 사람 시연, 로봇 자신의 배포 기록, 로봇 간 공유 knowledge package를 든다.

### 4.12 가정 proof of concept 결과 (5.2절)

| 발견 | 사례 | 해석 |
|---|---|---|
| 손에 든 물체에만 집중하고 집의 나머지를 놓친다 | 책상 정리 중 그리퍼의 책을 옮기며 팔로 다른 물건을 떨어뜨리고 팔꿈치로 모니터를 밀어냄. 장보기 정리에서 우유를 넣으려 냉장고를 연 뒤 과일을 옮기느라 300초부터 765초까지 문을 열어 둠 | 최종 상태 검사는 둘 다 놓친다. 냉장고는 episode 끝에 닫혀 있고 책의 위치는 책상 나머지에 대해 말해 주지 않는다. 그래서 판정자는 전체 trajectory에 걸쳐 의무를 추적해야 한다 |
| 시연 데이터 없이 낯선 설비의 움직임과 자기 몸의 위치를 알아내지 못한다 | 좁은 통로에서 한 팔로 냉장고 문을 잡자 열린 문이 다른 팔과 선반 사이를 막음. 손잡이를 놓고 손을 넣자 문이 닫혀 원점으로 돌아감. 낯선 수도꼭지를 돌리지 않고 계속 밀어 싱크대가 넘침 | 그리퍼와 손잡이만 계획하고 몸 전체를 계획하지 않는다. 같은 동작을 반복, 조정할 뿐이다. 2장 벤치마크에서는 ICL로 정리한 시연이 둘 다 보여 주므로 이 약점이 드러나지 않았다 |
| 생각하는 동안 낡아 버린 observation으로 결정한다 | 머리 카메라로 달걀을 보며 익으면 버너를 끄기로 올바르게 판단했지만 결정마다 world time 수 초가 걸려(한 번에 8초) 달걀이 익은 지 약 90초 뒤에야 버너를 껐고 그때 달걀은 탄 상태 | 모델은 세계가 자신을 기다리는 것처럼 추론한다. 2장의 시뮬레이터에서는 실제로 기다렸다 |

이 episode들은 수가 적고 정성적이지만 같은 방향을 가리킨다. 2장 벤치마크에서는 무엇을 할지 결정하는 능력으로 충분했지만, 필요만 말하고 시연을 주지 않으며 멈추지 않는 집에서는 그 결정을 행동으로 옮겨야 하고 현재는 그 지점에서 부족하다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

**연구 방향으로 제시한 다섯 가지 (초록)**

1. in-context learning의 일반성 향상
2. 비용과 실행 시간 절감
3. 물리 상태 검증
4. 비가역 실패로부터의 복구
5. long-horizon 진행 보존

**harness 측면의 방향**

- 검증과 복구를 더 선택적으로 수행하고 과제 관련 경험을 더 효율적으로 반영해 신뢰성과 토큰 소비의 균형을 맞춘다.
- 의미적으로 의미 있는 action 명령을 노출하고 정밀 동작 실행은 로봇 controller에 위임하며, adaptive execution horizon으로 성능과 토큰을 조율한다.
- 구조화된 실행 메모리와 표적화된 검증 메커니즘으로 과제 진행과 실패를 추적한다. 추가 구성 요소는 성능과 총 토큰 소비 양쪽 기여로 평가한다.

**실세계 측면**: 이질적 원천(cross-embodiment 시연, 시뮬레이션 자가 생성 시연, 사람 시연, 배포 기록, 공유 패키지)에서 embodied 과제용 컨텍스트를 원칙적으로 구성하는 일은 열린 문제이자 큰 연구 기회다.

**차세대 벤치마크 구축의 열린 과제 (5.3절)**

| 과제 | 내용 |
|---|---|
| 판정자의 근거 | 술어 목록이 아니라 일어난 일을 채점하려면 달걀을 뒤집었는지, 탔는지 같은 물리적 사실이 필요한데 시뮬레이터는 아직 휴리스틱 상태 변화로 모델링한다. 학습된 판정자도 부족하다. vision-language 성공 판정기는 접촉이 많은 조립에서 balanced accuracy가 최대 60%이고, 에이전트 trajectory의 vision-language 판정자는 에이전트 자신의 추론에 오도될 수 있다 |
| 시뮬레이션 충실도 | 판정자가 시뮬레이터 상태를 읽으므로 모델링 오류가 에이전트 행동처럼 보인다. 잘못 모델링된 관절은 성공처럼, 접촉 artifact는 실패처럼 보이게 한다. 시뮬레이션이 실제 로봇 결과를 예측한다는 근거는 짧은 탁상 과제(일부 변형 물체 포함)에만 있고 long-horizon 가정 활동에는 없다 |
| 멈추지 않는 세계의 비용 | 에이전트가 생각하는 동안 모든 물리 과정을 시뮬레이션해야 하고 점수가 지연, 하드웨어, 서비스 부하에 따라 달라진다. 기존 벤치마크는 환경을 멈추거나(추론 속도가 점수에서 빠짐) 생성 토큰마다 시간을 진행시킨다(재현 가능하지만 실제 배포 지연을 반영하지 못함) |
| 반복 비용 | 1시간 이상 걸리는 배포는 반복이 비싸고, 짧은 로봇 시도조차 policy를 신뢰성 있게 구분할 만큼 충분히 반복되지 않는 경우가 많다 |

**보고서 자체의 한계로 읽을 부분**

- knowledge package 사용 분석은 개별 구성 요소의 인과적 기여를 분리하지 않는다.
- 일부 토큰 수치는 부분 계측이라 하한이다(LIBERO-PRO 117 episode, Long++ 8/120, Ultra-Long 27/90).
- 10배 결과는 표준 budget 기준선과 직접 비교할 수 없다.
- 실세계 시도 횟수가 플랫폼당 수 회 수준이고 가정 proof of concept는 정성적 사례다.
- 인프라 중단은 실패로 채점했지만 행동 분석에서는 따로 다뤘다.

## 6. 관련 연구 (Related Work)

| 계열 | 대표 연구 | 본 보고서와의 관계 |
|---|---|---|
| foundation model을 embodied 에이전트로 | SayCan, Inner Monologue, Code as Policies, VoxPoser, ReKep, Gemini Robotics-ER | 이들은 foundation model이 "무엇을"을 정하고 skill 집합, planner, 별도 controller가 "어떻게"를 정한다. 본 보고서는 frontier 모델이 end-effector action을 직접 내는 controller 자체가 될 수 있는지를 묻는다 |
| 학습형 policy | RT-1, π0, π0.5, π0-FAST, GR00T N1.6, FLUX 3 Action, Cosmos3 Policy, DreamZero | 벤치마크 기준선. VLA와 world action model(WAM) |
| frontier 모델 embodied 실증 연구 | ChatGPT/GPT-4V 로봇 프롬프팅, NavGPT, MapGPT, CaP-X, 이전 GPT-5 spatial intelligence 평가 | 본 보고서는 공간 지능에서 embodied intelligence로, closed-loop 제어로 확장 |
| GPT-6-Astra 직후 연구 | R2R-CE 평가 2편, Zhang et al. RoboDojo 평가, Astranomy, Ditto-Bench, RoboICL, RoboDawn, RoboMME, Vals Robobench, Embodied Agent Arena, RoboQuest, RoboHarm | 대부분 한 벤치마크 계열, 한 능력, 한 harness만 본다. 결론도 엇갈린다. Zhang et al.은 one-shot 시연이 RoboDojo 성공률을 낮췄다고 했지만 RoboICL은 시연과 상호작용 메모리를 결합하면 오른다고 했다. RoboHarm은 의도적으로 유해한 로봇 팔 시도 100회 중 60회를 완료하고 2회만 거부했다고 보고했다 |
| 차세대 평가 | BEHAVIOR-1K, BDDL, PDDL/PDDL3, PARTNR, IS-Bench, 시간이 흐르는 에이전트 평가 | 과제 도출, 판정 방식, world clock 원칙의 출발점 |

본 보고서의 차별점은 manipulation과 내비게이션 벤치마크를 단일 프로토콜로 평가하고, harness 설계를 ablation하고, 실제 로봇에서 검증하고, 그 결과로 차세대 벤치마크 원칙을 제안한다는 점이다.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| GPT-6-Astra | 보고서가 평가한 범용 frontier 멀티모달 모델. 2026년 공개 |
| knowledge package (K) | ICL 준비 단계에서 GPT-6-Astra가 훈련 데이터를 학습해 작성하고 테스트 전에 고정하는 노트, 참조, 코드 묶음 |
| 표준 budget / 확장 budget | 벤치마크 공식 action step 한도(1배)와 그 10배까지 늘린 한도. 확장은 같은 episode의 연속이다 |
| Agentic SOTA | 기존에 발표된 agentic 방법 중 최고 성능 |
| System 0 / 1 / 2 | 저수준 모터 controller, 과제 학습된 빠른 policy(VLA), 느린 숙고형 추론 모델의 3층 구도 |
| review horizon (L) | closed-loop 협업에서 GPT 호출 한 번에 검토하는 VLA 제안 action 수. action 표현 실험에서는 결정당 생성하는 EEF action 수 |
| adaptive action chunk | 모델이 결정마다 내보낼 action 수(1~4)를 스스로 고르는 방식 |
| active vision | 다음 action에 필요한 observation을 얻으려 카메라 시점을 의도적으로 옮기는 행동 |
| Intent / Duty | 차세대 벤치마크에서 명시 요청과, 아무도 말하지 않았지만 지켜야 할 의무(냉장고 닫기 등) |
| world clock | 에이전트가 숙고하는 동안에도 흐르는 시뮬레이션 시간 |
| causal fidelity | 에이전트 결정이 의존하는 물리 현상을 올바른 인과로 시뮬레이션하는 성질 |
| WAM | world action model. world model 기반으로 action을 내는 로봇 policy 계열 |

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 1 | 12개 벤치마크 성능 상한 | manual | ★ wiki 권장 (result) |
| fig02 | 4 | in-context learning 프로토콜 | manual | ★ wiki 권장 (method) |
| fig03 | 5 | knowledge package 여섯 구성 요소 | caption-region | ★ wiki 권장 (method) |
| fig04 | 6 | step budget 대비 성공률 | caption-region | ★ wiki 권장 (result) |
| fig05 | 7 | 벤치마크별 토큰과 시간 비용 | caption-region | ★ wiki 권장 (result) |
| fig06 | 8 | 남는 실패 유형 세 가지 | caption-region | ★ wiki 권장 (analysis) |
| fig07 | 10 | harness 설정별 토큰 대비 성공률 | caption-region | ★ wiki 권장 (ablation) |
| fig08 | 12 | zero-shot 실세계 제어 예시 | caption-region | ★ wiki 권장 (result) |
| fig09 | 13 | 꽃 꽂기의 active vision | caption-region | ★ wiki 권장 (analysis) |
| fig10 | 15 | 아침 식사 과제의 두 명세 | caption-region | ★ wiki 권장 (method) |
| fig11 | 16 | 가정 환경 구축 절차 | caption-region | ★ wiki 권장 (method) |
| fig12 | 17 | 가정 proof of concept 실패 | manual | ★ wiki 권장 (analysis) |
| fig13 | 54 | 실세계 과제 전체 갤러리 A군 | manual | (부록, 확인 필요) |
| fig14 | 56 | Franka 3 과제 프레임 | caption-region | (부록) |
| fig15 | 57 | Franka Panda 과제 프레임 | caption-region | (부록) |
| fig16 | 58 | PiPER + Pika 과제 프레임 | caption-region | (부록) |
| fig17 | 60 | 양팔 Piper 과제 프레임 | caption-region | (부록) |
| fig18 | 61 | Tianji M6S 과제 프레임 | caption-region | (부록) |
| fig19 | 63 | Galaxea R1 Pro 과제 프레임 | caption-region | (부록) |
| fig20 | 64 | AgileX Tracer + xArm7 과제 기록 | caption-region | (부록) |
| fig21 | 66 | Unitree G1 과제 프레임 | caption-region | (부록) |
| tab01 | 11 | 실세계 플랫폼 분류와 질문 | table-region | ★ wiki 권장 (setup) |
| tab02 | 38 | 벤치마크별 성공률 원표 | table-region | ★ wiki 권장 (result) |
| tab03 | 39 | LIBERO-PRO 과제별 결과 | table-region | (크롭이 주석 영역만 잡음, 확인 필요) |
| tab04 | 40 | LIBERO-Long++ / Ultra-Long 과제별 결과 | table-region | (크롭이 주석 영역만 잡음, 확인 필요) |
| tab05 | 42 | RoboDojo 과제별 결과 | table-region | (크롭이 주석 영역만 잡음, 확인 필요) |
| tab06 | 43 | RoboLab 전체 성공률 | table-region | ★ wiki 권장 (result) |
| tab07 | 44 | RoboLab 세부 결과 | table-region | (부록) |
| tab08 | 45 | RoboLab 추가 결과 | table-region | (부록) |
| tab09 | 46 | LHPR-VLN 결과 | table-region | (부록) |
| tab10 | 47 | VLN-CE 결과 | table-region | (부록) |
| tab11 | 49 | SIMPLE 단계별 성공률 | table-region | (부록) |
| tab12 | 50 | SIMPLE zero-shot 대 ICL | table-region | (본문에 표로 옮김) |
| tab13 | 51 | harness 설계 ablation | table-region | ★ wiki 권장 (ablation) |
| tab14 | 53 | 실세계 플랫폼별 설정과 결과 | table-region | ★ wiki 권장 (result) |
