---
title: "Systematically Exploring the Capabilities of GPT-6 Astra as Embodied Policies"
type: paper
year: 2026
category: physical-ai
raw_path: raw/papers/galbot-2026-systematically-exploring-the-capabilities-of.pdf
raw_filename: "galbot-2026-systematically-exploring-the-capabilities-of.pdf"
source_collection: external
authors: "Galbot Team (Xuchuan Chen 외 33인, 지도 He Wang, Li Yi, Zhizheng Zhang)"
arxiv_id: "2609.38537"
license: "CC BY 4.0"
tags: [physical-ai, manipulation, humanoid, benchmark]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/galbot-2026-systematically-exploring-the-capabilities-of/fig01.png
    raw: raw/papers/galbot-2026-systematically-exploring-the-capabilities-of-figures/fig01.png
    caption: "제어 모드, 명령 인터페이스, 하위 제어기 요약. Direct는 Astra가 만든 명령을 IK나 PD 같은 해석적 제어로 실행하고, Hybrid는 Astra가 학습된 policy의 제안을 검토하거나 고정된 whole-body controller에 명령과 motion reference를 공급한다"
    page: 2
    bbox_norm: [0.1034, 0.0946, 0.8937, 0.3709]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/galbot-2026-systematically-exploring-the-capabilities-of/fig02.png
    raw: raw/papers/galbot-2026-systematically-exploring-the-capabilities-of-figures/fig02.png
    caption: "그리퍼 manipulation 결과. (a, b) RoboDojo 10개 과제의 Score와 성공률, (c) RoboLab 성공률, (d) Hybrid 실행 control step 중 85.6%는 π0.5를 따르고 14.4%만 Astra가 생성하거나 수정했다"
    page: 4
    bbox_norm: [0.106, 0.073, 0.894, 0.4573]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/galbot-2026-systematically-exploring-the-capabilities-of/fig03.png
    raw: raw/papers/galbot-2026-systematically-exploring-the-capabilities-of-figures/fig03.png
    caption: "dexterous manipulation에서 Astra의 수정 결정. (a) 50개 Hybrid 사례의 수정 사유 분포로 놓친 grasp와 떨어진 물체 복구가 33.33%로 가장 많다. (b) 실행 step의 88.02%는 수정 없는 π0.5 action이고 11.98%가 Astra 수정이다"
    page: 7
    bbox_norm: [0.106, 0.073, 0.894, 0.3]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/galbot-2026-systematically-exploring-the-capabilities-of/fig04.png
    raw: raw/papers/galbot-2026-systematically-exploring-the-capabilities-of-figures/fig04.png
    caption: "DexJoCo 양손 원판 쌓기 성공률. Astra와 π0.5 조합이 경험 기반 10회 시도 중 5회(50%) 성공해 DP-T(24.7%), π0.5(23.3%), GR00T N1.5(0.7%) 등 공개 baseline보다 높다"
    page: 7
    bbox_norm: [0.1002, 0.3624, 0.5048, 0.5476]
    strategy: manual
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/galbot-2026-systematically-exploring-the-capabilities-of/fig05.png
    raw: raw/papers/galbot-2026-systematically-exploring-the-capabilities-of-figures/fig05.png
    caption: "양손 원판 쌓기의 성공 사례와 실패 사례. (a) Astra가 원판을 받침에 닿게 수정한 뒤 policy가 놓아 성공한다. (b) 반복 수정에도 작은 원판이 기둥 위에 뜬 채 step 한도에 도달한다"
    page: 8
    bbox_norm: [0.1228, 0.073, 0.8772, 0.3826]
    strategy: caption-region
    curated: false
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/galbot-2026-systematically-exploring-the-capabilities-of/fig06.png
    raw: raw/papers/galbot-2026-systematically-exploring-the-capabilities-of-figures/fig06.png
    caption: "다섯 쌍의 초기 상태에서 측정한 연속 회전 결과. 원기둥 20초와 직육면체 10초 구간의 방향 오차, 축 속도, 목표 도달 비율, 누적 reward를 Astra Direct와 RL policy로 비교한다"
    page: 9
    bbox_norm: [0.106, 0.073, 0.8955, 0.3888]
    strategy: caption-region
    curated: false
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/galbot-2026-systematically-exploring-the-capabilities-of/fig07.png
    raw: raw/papers/galbot-2026-systematically-exploring-the-capabilities-of-figures/fig07.png
    caption: "Allegro 과제의 사례별 최종 오차. (a) 15초 시점 이동 오차, (b, c) 이동과 회전을 함께 요구하는 과제의 위치와 회전 오차를 Astra 120회 결정 종료 시점, 같은 step의 RL, 15초 RL로 비교한다"
    page: 10
    bbox_norm: [0.106, 0.1123, 0.8941, 0.4482]
    strategy: caption-region
    curated: false
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/galbot-2026-systematically-exploring-the-capabilities-of/fig08.png
    raw: raw/papers/galbot-2026-systematically-exploring-the-capabilities-of-figures/fig08.png
    caption: "RoboCasa365에서 협력이 바꾼 성능 분포. (a) 과제 그룹별 성공률로 Hybrid가 전체 38.7%로 가장 높지만 unseen 조합 과제는 Direct가 앞선다. (b) 실행 step의 55.2%는 수용된 policy action, 44.8%는 Astra가 만든 action이다"
    page: 11
    bbox_norm: [0.106, 0.073, 0.894, 0.2886]
    strategy: caption-region
    curated: true
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/galbot-2026-systematically-exploring-the-capabilities-of/fig09.png
    raw: raw/papers/galbot-2026-systematically-exploring-the-capabilities-of-figures/fig09.png
    caption: "같은 물리적 시작 상태에서 비교한 RoboCasa 결과. 네 개 과제와 seed 조합에서 π0.5 단독, Astra Direct, Astra Hybrid의 최종 화면과 결과를 보여주며 커피 준비 과제는 단독 policy만 성공한다"
    page: 12
    bbox_norm: [0.1751, 0.073, 0.8249, 0.6206]
    strategy: caption-region
    curated: false
  - id: fig10
    label: Figure 10
    kind: figure
    file: assets/galbot-2026-systematically-exploring-the-capabilities-of/fig10.png
    raw: raw/papers/galbot-2026-systematically-exploring-the-capabilities-of-figures/fig10.png
    caption: "navigation 성공률, 경로 효율, 종료 유형. (a) 네 subset의 SR과 SPL, (b) 성공 STOP, 실패 STOP, 500 step 예산 소진의 분포다"
    page: 13
    bbox_norm: [0.1002, 0.2424, 0.8998, 0.4596]
    strategy: manual
    curated: false
  - id: fig11
    label: Figure 11
    kind: figure
    file: assets/galbot-2026-systematically-exploring-the-capabilities-of/fig11.png
    raw: raw/papers/galbot-2026-systematically-exploring-the-capabilities-of-figures/fig11.png
    caption: "navigation 성공 두 건과 예산 소진 실패 한 건. 각 행은 시작, 중간, 마지막 전방 화면과 Habitat navigation mesh 위의 실제 경로를 보여주며, 이 지도는 Astra에게 제공되지 않았다"
    page: 14
    bbox_norm: [0.1444, 0.3312, 0.8556, 0.7014]
    strategy: caption-region
    curated: false
  - id: fig12
    label: Figure 12
    kind: figure
    file: assets/galbot-2026-systematically-exploring-the-capabilities-of/fig12.png
    raw: raw/papers/galbot-2026-systematically-exploring-the-capabilities-of-figures/fig12.png
    caption: "HumanoidBench 30개 과제 결과. 초록 막대가 Astra와 whole-body controller 조합의 평균 return이고 왼쪽 세 막대는 DreamerV3, TD-MPC2, SAC의 공개 결과이며 점선이 과제별 기준값이다"
    page: 17
    bbox_norm: [0.1261, 0.0729, 0.8739, 0.6648]
    strategy: caption-region
    curated: true
  - id: fig13
    label: Figure 13
    kind: figure
    file: assets/galbot-2026-systematically-exploring-the-capabilities-of/fig13.png
    raw: raw/papers/galbot-2026-systematically-exploring-the-capabilities-of-figures/fig13.png
    caption: "세 실험의 결정과 물리적 반응. 왼쪽 위는 Maze 실행 경로, 오른쪽 위는 Walk의 gait clock 주파수 스윕, 아래는 경험 기반 Push가 4.81cm 오차로 성공하는 과정이다"
    page: 18
    bbox_norm: [0.1002, 0.3024, 0.8998, 0.4876]
    strategy: manual
    curated: false
  - id: fig14
    label: Figure 14
    kind: figure
    file: assets/galbot-2026-systematically-exploring-the-capabilities-of/fig14.png
    raw: raw/papers/galbot-2026-systematically-exploring-the-capabilities-of-figures/fig14.png
    caption: "egocentric 영상에서 복원한 상호작용 장면. 사과 옮기기 두 사례의 원본 프레임과 복원 형상으로, 물체와 받침 배치는 복원되지만 테이블 모서리와 가구는 근사치에 머문다"
    page: 19
    bbox_norm: [0.106, 0.073, 0.894, 0.2108]
    strategy: caption-region
    curated: false
  - id: fig15
    label: Figure 15
    kind: figure
    file: assets/galbot-2026-systematically-exploring-the-capabilities-of/fig15.png
    raw: raw/papers/galbot-2026-systematically-exploring-the-capabilities-of-figures/fig15.png
    caption: "물리 세계 agent를 위한 harness 구조. (A) 에피소드 안에서 Astra가 허용된 observation과 도구로 상태를 평가하고 Direct EEF 제어, policy 검토, whole-body controller 명령 중 한 경로로 행동한다. (B) 연구자와 개발 agent가 시도 기록을 진단해 스킬과 인터페이스를 고친 뒤 고정 구성으로 다시 평가하는 바깥 개발 루프다"
    page: 25
    bbox_norm: [0.106, 0.1519, 0.894, 0.519]
    strategy: caption-region
    curated: true
  - id: fig16
    label: Figure 16
    kind: figure
    file: assets/galbot-2026-systematically-exploring-the-capabilities-of/fig16.png
    raw: raw/papers/galbot-2026-systematically-exploring-the-capabilities-of-figures/fig16.png
    caption: "RoboDojo의 10개 manipulation 과제 화면. 테이블 정리, 언어 분류, 순서 모방, 숫자 배열, 포장, 물체 분류, 탑 쌓기, 마작, 옷 개기, 병 버리기다"
    page: 28
    bbox_norm: [0.106, 0.1123, 0.894, 0.5297]
    strategy: caption-region
    curated: false
  - id: fig17
    label: Figure 17
    kind: figure
    file: assets/galbot-2026-systematically-exploring-the-capabilities-of/fig17.png
    raw: raw/papers/galbot-2026-systematically-exploring-the-capabilities-of-figures/fig17.png
    caption: "dexterous manipulation 과제의 초기 상태 예시"
    page: 31
    bbox_norm: [0.106, 0.5893, 0.894, 0.8164]
    strategy: caption-region
    curated: false
  - id: fig18
    label: Figure 18
    kind: figure
    file: assets/galbot-2026-systematically-exploring-the-capabilities-of/fig18.png
    raw: raw/papers/galbot-2026-systematically-exploring-the-capabilities-of-figures/fig18.png
    caption: "in-hand manipulation 네 과제. Sharpa 손의 원기둥과 직육면체 회전, Allegro 손의 원기둥 이동과 이동 후 회전 과제를 보여준다"
    page: 35
    bbox_norm: [0.106, 0.4728, 0.894, 0.6656]
    strategy: caption-region
    curated: false
  - id: fig19
    label: Figure 19
    kind: figure
    file: assets/galbot-2026-systematically-exploring-the-capabilities-of/fig19.png
    raw: raw/papers/galbot-2026-systematically-exploring-the-capabilities-of-figures/fig19.png
    caption: "in-hand 회전 성능의 사례별 비교. 각 열이 초기 상태 하나이며 Astra와 RL의 오차와 속도 추이를 나란히 보여준다"
    page: 39
    bbox_norm: [0.106, 0.0985, 0.894, 0.6139]
    strategy: caption-region
    curated: false
  - id: fig20
    label: Figure 20
    kind: figure
    file: assets/galbot-2026-systematically-exploring-the-capabilities-of/fig20.png
    raw: raw/papers/galbot-2026-systematically-exploring-the-capabilities-of-figures/fig20.png
    caption: "같은 시작 상태에서 비교한 회전 시퀀스. Astra는 원기둥을 16.3초에 떨어뜨리고 RL은 20초를 완료하며, 직육면체에서는 Astra가 천천히 회전시키는 동안 RL이 계속 재배향한다"
    page: 40
    bbox_norm: [0.106, 0.073, 0.8941, 0.4442]
    strategy: caption-region
    curated: false
  - id: fig21
    label: Figure 21
    kind: figure
    file: assets/galbot-2026-systematically-exploring-the-capabilities-of/fig21.png
    raw: raw/papers/galbot-2026-systematically-exploring-the-capabilities-of-figures/fig21.png
    caption: "같은 초기 상태에서 수행한 Allegro 정성 rollout 비교"
    page: 41
    bbox_norm: [0.106, 0.1123, 0.894, 0.5839]
    strategy: caption-region
    curated: false
  - id: fig22
    label: Figure 22
    kind: figure
    file: assets/galbot-2026-systematically-exploring-the-capabilities-of/fig22.png
    raw: raw/papers/galbot-2026-systematically-exploring-the-capabilities-of-figures/fig22.png
    caption: "navigation observation과 실행 어댑터 구성. Astra, LightNav-0, Uni-NaVid는 전방 카메라 하나를, OmniNav Flow는 세 시점을 쓰고 Habitat이 변환된 출력을 실행한다"
    page: 43
    bbox_norm: [0.1054, 0.1262, 0.8963, 0.8519]
    strategy: caption-region
    curated: false
  - id: tab01
    label: Table 1
    kind: table
    file: assets/galbot-2026-systematically-exploring-the-capabilities-of/tab01.png
    raw: raw/papers/galbot-2026-systematically-exploring-the-capabilities-of-figures/tab01.png
    caption: "평가 범위와 비교 조건. 여섯 도메인별 과제와 표본 수, 비교 대상을 정리한다"
    page: 3
    bbox_norm: [0.106, 0.1123, 0.894, 0.4921]
    strategy: table-region
    curated: false
  - id: tab02
    label: Table 2
    kind: table
    file: assets/galbot-2026-systematically-exploring-the-capabilities-of/tab02.png
    raw: raw/papers/galbot-2026-systematically-exploring-the-capabilities-of-figures/tab02.png
    caption: "RoboDojo 과제별 Score. 공개 policy 결과를 같은 과제와 장면 구성으로 재가중한 값과 본 연구의 Direct, Hybrid 결과를 비교한다"
    page: 5
    bbox_norm: [0.106, 0.1123, 0.8941, 0.3418]
    strategy: table-region
    curated: false
  - id: tab03
    label: Table 3
    kind: table
    file: assets/galbot-2026-systematically-exploring-the-capabilities-of/tab03.png
    raw: raw/papers/galbot-2026-systematically-exploring-the-capabilities-of-figures/tab03.png
    caption: "자체 시뮬레이션 벤치마크의 dexterous manipulation Score. 10개 과제 평균이 π0.5 44.2, Direct 16.6, Hybrid 61.6이다"
    page: 6
    bbox_norm: [0.2212, 0.1123, 0.7788, 0.3251]
    strategy: table-region
    curated: true
  - id: tab04
    label: Table 4
    kind: table
    file: assets/galbot-2026-systematically-exploring-the-capabilities-of/tab04.png
    raw: raw/papers/galbot-2026-systematically-exploring-the-capabilities-of-figures/tab04.png
    caption: "in-hand 회전의 짝지은 비교. 목표 도달 step 비율이 원기둥에서 RL 76.90% 대 Astra 0.51%, 직육면체에서 RL 63.50% 대 Astra 4.40%다"
    page: 9
    bbox_norm: [0.106, 0.5192, 0.894, 0.6235]
    strategy: table-region
    curated: true
  - id: tab05
    label: Table 5
    kind: table
    file: assets/galbot-2026-systematically-exploring-the-capabilities-of/tab05.png
    raw: raw/papers/galbot-2026-systematically-exploring-the-capabilities-of-figures/tab05.png
    caption: "in-hand 이동과 재배향 결과. 이동에서 Astra 1/5, RL 4/5 성공이고 이동과 회전 결합에서 Astra 0/5, RL 4/5에서 5/5 성공이다"
    page: 10
    bbox_norm: [0.106, 0.1126, 0.8936, 0.1773]
    strategy: table-region
    curated: false
  - id: tab06
    label: Table 6
    kind: table
    file: assets/galbot-2026-systematically-exploring-the-capabilities-of/tab06.png
    raw: raw/papers/galbot-2026-systematically-exploring-the-capabilities-of-figures/tab06.png
    caption: "RoboCasa 같은 초기 상태에서의 완료율. π0.5 단독 22.7%, Astra Direct 33.3%, Astra Hybrid 38.7%다"
    page: 11
    bbox_norm: [0.1856, 0.3913, 0.8144, 0.4893]
    strategy: table-region
    curated: true
  - id: tab07
    label: Table 7
    kind: table
    file: assets/galbot-2026-systematically-exploring-the-capabilities-of/tab07.png
    raw: raw/papers/galbot-2026-systematically-exploring-the-capabilities-of-figures/tab07.png
    caption: "고정 subset 네 개의 navigation 결과. R2R SR 78%, RxR SR 92%, MP3D SR 56%, HM3D SR 82%이며 ObjectNav의 SPL이 낮다"
    page: 13
    bbox_norm: [0.106, 0.1123, 0.894, 0.2107]
    strategy: table-region
    curated: false
  - id: tab08
    label: Table 8
    kind: table
    file: assets/galbot-2026-systematically-exploring-the-capabilities-of/tab08.png
    raw: raw/papers/galbot-2026-systematically-exploring-the-capabilities-of-figures/tab08.png
    caption: "같은 에피소드 목록으로 로컬 평가한 공개 navigation policy 비교. Astra가 LightNav-0, Uni-NaVid 7B, OmniNav Flow, NavFoM, SPAN-Nav보다 모든 subset에서 SR과 SPL이 높다"
    page: 14
    bbox_norm: [0.106, 0.1403, 0.894, 0.2878]
    strategy: table-region
    curated: true
  - id: tab09
    label: Table 9
    kind: table
    file: assets/galbot-2026-systematically-exploring-the-capabilities-of/tab09.png
    raw: raw/papers/galbot-2026-systematically-exploring-the-capabilities-of-figures/tab09.png
    caption: "한 장애물 코스에서 PASSAGE와 Astra 다섯 차례 연속 시도 비교. PASSAGE는 13.18초에 도달하지만 Astra는 다섯 번째 시도에도 목표에서 6.519m 떨어져 끝난다"
    page: 15
    bbox_norm: [0.1061, 0.1262, 0.8939, 0.2568]
    strategy: table-region
    curated: true
  - id: tab10
    label: Table 10
    kind: table
    file: assets/galbot-2026-systematically-exploring-the-capabilities-of/tab10.png
    raw: raw/papers/galbot-2026-systematically-exploring-the-capabilities-of-figures/tab10.png
    caption: "Astra 없이 수행한 해석적 reference 인터페이스 실현 가능성 시험. Five-point와 WholeBody-14 모두 엄격 성공은 0/12다"
    page: 15
    bbox_norm: [0.1061, 0.1262, 0.8939, 0.2568]
    strategy: table-region
    curated: false
  - id: tab11
    label: Table 11
    kind: table
    file: assets/galbot-2026-systematically-exploring-the-capabilities-of/tab11.png
    raw: raw/papers/galbot-2026-systematically-exploring-the-capabilities-of-figures/tab11.png
    caption: "HumanoidBench 8개 과제의 공개 방법 대비 return. Maze, Reach, Walk 등에서 Astra가 가장 높고 Door에서는 TD-MPC2가 가장 높다"
    page: 16
    bbox_norm: [0.2097, 0.1262, 0.7903, 0.2895]
    strategy: table-region
    curated: true
  - id: tab12
    label: Table 12
    kind: table
    file: assets/galbot-2026-systematically-exploring-the-capabilities-of/tab12.png
    raw: raw/papers/galbot-2026-systematically-exploring-the-capabilities-of-figures/tab12.png
    caption: "SIMPLE L2에서 ScaleBFM과 결합한 Astra 성공률. 6개 과제 60회 중 50회 성공(83.3%)이다"
    page: 18
    bbox_norm: [0.1337, 0.6002, 0.467, 0.7476]
    strategy: table-region
    curated: true
  - id: tab13
    label: Table 13
    kind: table
    file: assets/galbot-2026-systematically-exploring-the-capabilities-of/tab13.png
    raw: raw/papers/galbot-2026-systematically-exploring-the-capabilities-of-figures/tab13.png
    caption: "연구별 추론 자원 소비. RoboDojo 토큰 총량, RoboCasa 모델 요청 수, 보행 실험의 호출당 39.86초 지연을 정리한다"
    page: 20
    bbox_norm: [0.106, 0.1123, 0.894, 0.2896]
    strategy: table-region
    curated: true
  - id: tab14
    label: Table 14
    kind: table
    file: assets/galbot-2026-systematically-exploring-the-capabilities-of/tab14.png
    raw: raw/papers/galbot-2026-systematically-exploring-the-capabilities-of-figures/tab14.png
    caption: "RoboDojo 과제별 Direct와 Hybrid의 Score와 성공률 전체 표"
    page: 26
    bbox_norm: [0.1002, 0.4604, 0.8998, 0.7326]
    strategy: manual
    curated: false
  - id: tab15
    label: Table 15
    kind: table
    file: assets/galbot-2026-systematically-exploring-the-capabilities-of/tab15.png
    raw: raw/papers/galbot-2026-systematically-exploring-the-capabilities-of-figures/tab15.png
    caption: "RoboLab 과제별 성공 횟수. Direct 49/50, Hybrid 46/50, π0.5와 Cosmos3-Nano-Policy 18/50, DreamZero 17/50이다"
    page: 27
    bbox_norm: [0.1444, 0.1123, 0.8556, 0.3251]
    strategy: table-region
    curated: false
  - id: tab16
    label: Table 16
    kind: table
    file: assets/galbot-2026-systematically-exploring-the-capabilities-of/tab16.png
    raw: raw/papers/galbot-2026-systematically-exploring-the-capabilities-of-figures/tab16.png
    caption: "별도로 고정한 구성에서 수행한 Push와 Walk 집중 실험 기록"
    page: 27
    bbox_norm: [0.1281, 0.4121, 0.8719, 0.5758]
    strategy: table-region
    curated: false
  - id: tab17
    label: Table 17
    kind: table
    file: assets/galbot-2026-systematically-exploring-the-capabilities-of/tab17.png
    raw: raw/papers/galbot-2026-systematically-exploring-the-capabilities-of-figures/tab17.png
    caption: "RoboDojo의 action과 토큰 회계. Hybrid 6억 2,476만 토큰, Direct 11억 3,234만 토큰이며 대부분이 캐시 입력이다"
    page: 28
    bbox_norm: [0.1828, 0.1123, 0.8172, 0.2594]
    strategy: table-region
    curated: false
  - id: tab18
    label: Table 18
    kind: table
    file: assets/galbot-2026-systematically-exploring-the-capabilities-of/tab18.png
    raw: raw/papers/galbot-2026-systematically-exploring-the-capabilities-of-figures/tab18.png
    caption: "HumanoidBench 30개 과제 전체의 Astra return과 기준값"
    page: 29
    bbox_norm: [0.1002, 0.0924, 0.8998, 0.6376]
    strategy: manual
    curated: false
  - id: tab19
    label: Table 19
    kind: table
    file: assets/galbot-2026-systematically-exploring-the-capabilities-of/tab19.png
    raw: raw/papers/galbot-2026-systematically-exploring-the-capabilities-of-figures/tab19.png
    caption: "SIMPLE Handover 개발 기록. grasp 안정화, 넘어진 상자 복구, 지시문 적응 조건별 성공 횟수다"
    page: 30
    bbox_norm: [0.106, 0.4196, 0.894, 0.6111]
    strategy: table-region
    curated: false
  - id: tab20
    label: Table 20
    kind: table
    file: assets/galbot-2026-systematically-exploring-the-capabilities-of/tab20.png
    raw: raw/papers/galbot-2026-systematically-exploring-the-capabilities-of-figures/tab20.png
    caption: "dexterous manipulation 과제 목록과 평가 설정"
    page: 32
    bbox_norm: [0.106, 0.1262, 0.894, 0.4505]
    strategy: table-region
    curated: false
  - id: tab21
    label: Table 21
    kind: table
    file: assets/galbot-2026-systematically-exploring-the-capabilities-of/tab21.png
    raw: raw/papers/galbot-2026-systematically-exploring-the-capabilities-of-figures/tab21.png
    caption: "dexterous manipulation 구현 세부 설정"
    page: 33
    bbox_norm: [0.106, 0.0985, 0.894, 0.5519]
    strategy: table-region
    curated: false
  - id: tab22
    label: Table 22
    kind: table
    file: assets/galbot-2026-systematically-exploring-the-capabilities-of/tab22.png
    raw: raw/papers/galbot-2026-systematically-exploring-the-capabilities-of-figures/tab22.png
    caption: "과제별 완료 판정 기준"
    page: 34
    bbox_norm: [0.106, 0.1262, 0.894, 0.6719]
    strategy: table-region
    curated: false
  - id: tab23
    label: Table 23
    kind: table
    file: assets/galbot-2026-systematically-exploring-the-capabilities-of/tab23.png
    raw: raw/papers/galbot-2026-systematically-exploring-the-capabilities-of-figures/tab23.png
    caption: "in-hand manipulation 벤치마크 정의. 과제마다 다섯 쌍의 초기 상태를 Astra Direct와 RL policy가 공유한다"
    page: 35
    bbox_norm: [0.1002, 0.1924, 0.8998, 0.4026]
    strategy: manual
    curated: false
  - id: tab24
    label: Table 24
    kind: table
    file: assets/galbot-2026-systematically-exploring-the-capabilities-of/tab24.png
    raw: raw/papers/galbot-2026-systematically-exploring-the-capabilities-of-figures/tab24.png
    caption: "평가에 쓴 RL policy의 학습 출처. PPO 학습 설정과 전이 횟수를 정리한다"
    page: 36
    bbox_norm: [0.106, 0.1262, 0.894, 0.2795]
    strategy: table-region
    curated: false
  - id: tab25
    label: Table 25
    kind: table
    file: assets/galbot-2026-systematically-exploring-the-capabilities-of/tab25.png
    raw: raw/papers/galbot-2026-systematically-exploring-the-capabilities-of-figures/tab25.png
    caption: "20초 분석 구간의 원기둥 회전 사례별 결과"
    page: 38
    bbox_norm: [0.106, 0.606, 0.894, 0.802]
    strategy: table-region
    curated: false
  - id: tab26
    label: Table 26
    kind: table
    file: assets/galbot-2026-systematically-exploring-the-capabilities-of/tab26.png
    raw: raw/papers/galbot-2026-systematically-exploring-the-capabilities-of-figures/tab26.png
    caption: "10초 분석 구간의 직육면체 회전 사례별 결과"
    page: 39
    bbox_norm: [0.106, 0.0988, 0.8937, 0.2942]
    strategy: table-region
    curated: false
  - id: tab27
    label: Table 27
    kind: table
    file: assets/galbot-2026-systematically-exploring-the-capabilities-of/tab27.png
    raw: raw/papers/galbot-2026-systematically-exploring-the-capabilities-of-figures/tab27.png
    caption: "15초 종료 시점의 원기둥 이동 사례별 결과"
    page: 40
    bbox_norm: [0.1002, 0.6974, 0.8998, 0.9326]
    strategy: manual
    curated: false
  - id: tab28
    label: Table 28
    kind: table
    file: assets/galbot-2026-systematically-exploring-the-capabilities-of/tab28.png
    raw: raw/papers/galbot-2026-systematically-exploring-the-capabilities-of-figures/tab28.png
    caption: "이동과 회전 결합 과제의 사례별 종료 결과"
    page: 41
    bbox_norm: [0.106, 0.1126, 0.8926, 0.2264]
    strategy: table-region
    curated: false
  - id: tab29
    label: Table 29
    kind: table
    file: assets/galbot-2026-systematically-exploring-the-capabilities-of/tab29.png
    raw: raw/papers/galbot-2026-systematically-exploring-the-capabilities-of-figures/tab29.png
    caption: "navigation 종료 유형과 이동 거리"
    page: 42
    bbox_norm: [0.106, 0.1262, 0.894, 0.2242]
    strategy: table-region
    curated: false
  - id: tab30
    label: Table 30
    kind: table
    file: assets/galbot-2026-systematically-exploring-the-capabilities-of/tab30.png
    raw: raw/papers/galbot-2026-systematically-exploring-the-capabilities-of-figures/tab30.png
    caption: "비교에 쓴 navigation policy의 소스 커밋과 체크포인트"
    page: 42
    bbox_norm: [0.106, 0.1262, 0.894, 0.2242]
    strategy: table-region
    curated: false
  - id: tab31
    label: Table 31
    kind: table
    file: assets/galbot-2026-systematically-exploring-the-capabilities-of/tab31.png
    raw: raw/papers/galbot-2026-systematically-exploring-the-capabilities-of-figures/tab31.png
    caption: "모든 고정 subset의 경로 일치도와 종료 결과"
    page: 43
    bbox_norm: [0.106, 0.1262, 0.894, 0.4214]
    strategy: table-region
    curated: false
  - id: tab32
    label: Table 32
    kind: table
    file: assets/galbot-2026-systematically-exploring-the-capabilities-of/tab32.png
    raw: raw/papers/galbot-2026-systematically-exploring-the-capabilities-of-figures/tab32.png
    caption: "VLN-CE의 subset 결과와 전체 벤치마크 공개 결과 참고 비교"
    page: 44
    bbox_norm: [0.106, 0.14, 0.894, 0.3695]
    strategy: table-region
    curated: false
  - id: tab33
    label: Table 33
    kind: table
    file: assets/galbot-2026-systematically-exploring-the-capabilities-of/tab33.png
    raw: raw/papers/galbot-2026-systematically-exploring-the-capabilities-of-figures/tab33.png
    caption: "object-goal navigation의 subset 결과와 전체 벤치마크 공개 결과 참고 비교"
    page: 44
    bbox_norm: [0.106, 0.14, 0.894, 0.3695]
    strategy: table-region
    curated: false
  - id: tab34
    label: Table 34
    kind: table
    file: assets/galbot-2026-systematically-exploring-the-capabilities-of/tab34.png
    raw: raw/papers/galbot-2026-systematically-exploring-the-capabilities-of-figures/tab34.png
    caption: "RoboCasa 전체 과제와 제어 horizon 목록"
    page: 45
    bbox_norm: [0.1071, 0.1123, 0.8929, 0.4076]
    strategy: table-region
    curated: false
  - id: tab35
    label: Table 35
    kind: table
    file: assets/galbot-2026-systematically-exploring-the-capabilities-of/tab35.png
    raw: raw/papers/galbot-2026-systematically-exploring-the-capabilities-of-figures/tab35.png
    caption: "75개 공유 시작 상태의 짝지은 결과. Hybrid만 성공 13건, Direct만 성공 9건, 공통 성공 16건이다"
    page: 45
    bbox_norm: [0.1071, 0.1123, 0.8929, 0.4076]
    strategy: table-region
    curated: false
  - id: tab36
    label: Table 36
    kind: table
    file: assets/galbot-2026-systematically-exploring-the-capabilities-of/tab36.png
    raw: raw/papers/galbot-2026-systematically-exploring-the-capabilities-of-figures/tab36.png
    caption: "Astra 두 조건의 harness 구성 범위"
    page: 45
    bbox_norm: [0.1444, 0.4712, 0.8556, 0.5528]
    strategy: table-region
    curated: false
---

## 한 줄 요약 (One-line Summary)

Galbot 팀이 범용 추론 모델 GPT-6 Astra를 embodied policy로 쓰는 경우를 그리퍼 manipulation, dexterous manipulation, mobile manipulation, navigation, locomotion, humanoid loco-manipulation 여섯 도메인에서 체계적으로 평가한 보고서다. Astra는 navigation과 과제 수준 판단에서는 강하지만 손가락 접촉 조정과 dense motion reference 생성에서는 불안정했고, 토큰 사용량과 추론 지연이 실제 제어의 큰 제약으로 드러났다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 제목 | Systematically Exploring the Capabilities of GPT-6 Astra as Embodied Policies |
| 저자 | Galbot Team (Xuchuan Chen 외 33인, 지도 He Wang, Li Yi, Zhizheng Zhang) |
| 발표 | arXiv 2609.38537 (cs.RO), 2026년 9월 |
| 분량 | 본문 20쪽, 부록 포함 46쪽 |
| 평가 대상 | GPT-6 Astra (`gpt-6-astra`, Responses API, 주로 xhigh reasoning 설정) |
| 라이선스 | CC BY 4.0 |

## 2. 주요 기여 (Key Contributions)

- 범용 추론 모델이 숫자로 된 로봇 action을 직접 생성할 수 있게 된 상황에서, 이를 embodied policy로 쓸 때 어떤 과제를 수행하고 어디서 불안정하며 어떤 자원이 드는지를 여섯 도메인에 걸쳐 측정했다.
- 제어 경로를 두 가지로 나눴다. **Direct**는 Astra가 만든 명령을 IK나 PD 같은 해석적 제어로 바로 실행하고, **Hybrid**는 Astra가 학습된 task policy의 제안을 수용, 수정, 대체하거나 고정된 whole-body controller에 명령을 공급한다.
- 성공 사례뿐 아니라 실패 사례, 기존 방법과의 짝지은 비교, 추론 자원 소비를 함께 보고했다. 같은 물리적 시작 상태에서 비교한 결과와 개발 과정의 시도(development trial)를 분리해 보고한다.
- 핵심 결론은 "유용한 과제 결정"과 "신뢰할 수 있는 물리 제어" 사이에 간극이 있다는 것이다. Astra는 목표 수정과 접촉 조건 준비에는 유용하지만, 손가락 접촉 재배치, 보행용 dense reference 생성, 완료 검증에서는 약했다.
- 비용도 정량화했다. RoboDojo 50개 인스턴스에서 Hybrid가 6억 2,476만 토큰, Direct가 11억 3,234만 토큰을 썼고, 30초 보행 실험은 평균 39.86초짜리 모델 호출 250회가 필요했다(추론 중 물리 시뮬레이션 정지).

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 Astra가 action을 만드는 방식

action은 로봇 제어 인터페이스에 보내는 명령(목표 자세, 관절 증분, navigation 이동 등)이다. Astra는 각 연구가 허용한 observation을 받아 action을 고르고, 그 결과로 얻은 피드백을 다음 결정에 쓴다. 인터페이스가 명령 범위를 검사하고, 과제 성공은 환경이 판정한다. 도구로는 계산, 이미지 확인, 노트 작성이 제공된다.

| 제어 모드 | 명령 인터페이스 | 하위 제어 | 적용 도메인 |
|---|---|---|---|
| Direct 또는 Hybrid | end-effector나 관절 목표, 그리퍼와 base 명령 | IK, 관절 또는 operational-space 제어 | 그리퍼, dexterous, mobile manipulation |
| Direct | 전진, 회전, 정지 결정 | 이산 navigation primitive | navigation |
| Direct 또는 Hybrid | 관절 PD 목표 또는 dense motion reference | PD 제어기 또는 고정 whole-body controller | locomotion |
| Hybrid | 속도 명령 또는 sparse 신체 목표 | 고정 whole-body controller | humanoid loco-manipulation |

Hybrid는 두 형태다. manipulation에서는 Astra가 task policy의 action 제안을 수용, 수정, 대체하고 RoboCasa에서는 subgoal 재작성도 허용한다. humanoid 제어에서는 Astra가 고정된 whole-body controller에 dense motion reference, 속도 명령, sparse 신체 목표를 공급한다. 모델 가중치는 모든 연구에서 고정이며, 일부 연구는 시도 사이에 노트나 과제 지침을 갱신한다.

### 3.2 harness 구조 (Figure 15)

부록 A의 harness는 두 루프로 이뤄진다.

- **에피소드 내 실행 루프**: 허용된 observation, 지시문과 이력, 도구와 working memory(코드 계산, 파일과 이미지, 노트와 스킬)를 받아 Astra가 상태를 평가하고 숫자 목표를 계획한다. 이후 경로 01(Direct EEF 제어), 경로 02(VLA 제안 검토), 경로 03(whole-body controller 명령) 중 하나로 행동한다.
- **탐색적 개발 루프**: 연구자나 개발 agent가 보관된 시도를 진단하고 스킬, 도구, 실행 인터페이스를 고친 뒤 구성을 고정해 다시 평가한다. 모델 가중치와 과제 규칙은 바뀌지 않고, 고정 평가에서는 기록을 되돌려 쓰지 않는다. 저자들은 이것이 자율 재귀 최적화기가 아니라고 명시한다.

### 3.3 평가 범위 (Table 1)

| 도메인 | 과제와 표본 수 | 비교 대상 |
|---|---|---|
| 그리퍼 manipulation | RoboDojo, RoboLab 각 10개 과제, 과제와 방법당 5회 | RoboDojo: Direct와 Hybrid 짝지은 비교 및 공개 policy 점수. RoboLab: zero-shot policy 3종 |
| dexterous manipulation | manipulation 10개 과제 각 5사례, in-hand 4개 과제 각 5개 초기 상태 | Direct, Hybrid, 단독 π0.5. in-hand는 과제별 RL과 비교 |
| mobile manipulation | RoboCasa 15개 과제, 과제와 방법당 5 episode | Direct, Hybrid, 로컬 평가한 단독 π0.5 |
| navigation | 4개 데이터셋 subset, 시스템당 50 episode | 공개 navigation policy 5종 |
| locomotion | 한 코스에서 Astra 5회 연속 시도, 별도 인터페이스 시험 12 rollout씩 | PASSAGE |
| humanoid loco-manipulation | HumanoidBench 30개 과제, SIMPLE L2 6개 과제 각 10장면 | DreamerV3, TD-MPC2, SAC 공개 결과 |

### 3.4 측정 원칙

- 과제 완료, 부분 진행, 단순한 실패 회피를 구분한다. 회전 오차는 각속도와, navigation 성공은 경로 효율과, humanoid reward는 관찰된 진행과 종료 여부와 함께 해석한다.
- 제어기 주기와 추론 속도는 별개다. 추론 중 물리를 멈추면 로봇 동작 시간에서 결정 지연이 빠지므로, 자원 요약은 control step, action segment, 모델 요청, 캐시 입력, 비캐시 입력, 출력 토큰을 따로 센다.

### 3.5 도메인별 설정

- **RoboDojo**: 양손 manipulation 벤치마크. 공개 π0.5 성공률을 기준으로 층화해 10개 과제를 골랐다(최하위 구간 6개, 다음 구간 2개, 상위 두 구간 각 1개). Direct는 이미지, proprioception, 지시문, 실행 이력을 받아 양손 EEF 목표와 그리퍼 명령을 생성하고 1~5 control step(25Hz)을 실행한 뒤 다시 관찰한다. Hybrid는 RoboDojo용으로 fine-tuning된 π0.5가 50 step 관절 공간 action 시퀀스를 제안하면 Astra가 앞쪽 1~15 step을 실행하거나 1~5 step EEF 수정으로 대체한다. IK는 bounded damped least-squares 방식이며 이동 5cm, 회전 0.35rad 안전 제한이 있다.
- **RoboLab**: 단일 팔 Franka, 의미 기반 pick-and-place, 순서 있는 블록 쌓기, 머그 재배향 등 10개 과제. 학습 데이터가 없어 policy baseline은 DROID 학습 가중치로 zero-shot 전이한다.
- **dexterous manipulation 10개 과제**: 시뮬레이션 Sharpa 손. 다중 과제 π0.5를 과제당 시연 데이터(demonstration) 100개(총 1,000개)로 fine-tuning했다. Direct는 손목과 손가락 목표를 출력하고, Hybrid는 약 30Hz에서 1~16 step 접두 실행 또는 1~5 step 수정을 고른다. 검토나 토큰 예산이 소진되면 π0.5 단독 제어로 전환한다. 0~100 점수로 부분 진행에 점수를 준다.
- **DexJoCo Hanoi 원판 쌓기**: 양팔 Franka Panda와 Allegro 손. 오른손이 중간 원판을 목적지 peg로 옮기고 왼손이 작은 원판을 그 위에 놓는다. 50Hz, 시도당 최대 1,500 control step, segment당 최대 30 step. 10회 시도를 2회씩 5쌍으로 진행하고 쌍 사이에 서면 지침을 다듬는다.
- **in-hand 제어**: Sharpa는 원기둥이나 직육면체를 world-frame +Z 축으로 계속 회전시키고, Allegro는 원기둥을 이동시키거나 이동과 함께 장축 기준 -40도 회전을 수행한다. Astra는 이미지와 상태를 받아 22개(Sharpa) 또는 16개(Allegro) 관절을 1~5회의 20Hz step 동안 명령한다. RL은 학습 시 observation으로 매 step 행동한다. 결정 한도는 Sharpa 100회, Allegro 120회다.
- **RoboCasa365**: 원자 과제(seen) 5개, 복합 과제(seen) 5개, 복합 과제(unseen) 5개, 각 5 seed로 조건당 75 episode. Astra는 RGB 세 시점과 EEF, base, 그리퍼 상태만 받고 물체 자세, 접촉 정보, 참조 trajectory, 중간 reward는 받지 않는다. segment는 보통 20Hz에서 20 step이며 horizon은 450~4,350 step이다. Hybrid는 별도 fine-tuning 없는 다중 과제 π0.5 체크포인트를 쓰고, Astra는 20 step 접두를 수용하거나 action을 만들거나 policy 지시문을 subgoal로 다시 쓴다.
- **navigation**: R2R과 RxR(영어 가이드)에서 validation-unseen 50 episode씩, MP3D ObjectNav v1과 HM3D ObjectNav v2에서 validation 50 episode씩. Astra는 512×384 전방 RGB 한 장, 지시문 또는 물체 범주, step 카운터, action 피드백만 받고 GPS, 나침반, depth, 의미 레이블, 목표 좌표는 받지 않는다. 어댑터가 출력을 0.25m 전진과 30도 회전으로 바꾸며 500 primitive 예산을 둔다. 성공 기준은 VLN-CE에서 목표 3m 이내 STOP, ObjectNav에서 주석된 목표 viewpoint 집합 1m 이내 STOP이다.
- **locomotion**: PASSAGE의 학습된 motion generator를 Astra로 교체하고, 장면 정렬 25×65 표현과 고정된 G1 ScaleTrack 추종기는 유지했다. 각 제안은 50Hz로 0.5초 구간을 지정하며 루트 높이, 투영 중력, 평면 속도, yaw rate, 29개 관절의 위치와 속도를 담아 호출당 1,625개 값이 필요하다. 다섯 번 연속 시도하며 첫 시도는 zero-shot, 이후는 진행, 넘어짐, 충돌의 텍스트 요약을 유지하고 다섯 번째 전에는 다른 코스의 retargeting된 보행 클립을 받는다.
- **HumanoidBench**: Highbar 두 변형을 제외한 실행 가능한 30개 과제, seed 1과 2. Astra는 RGB, privileged state, 과제 형상, 지침을 받아 보행 속도와 yaw rate 또는 sparse 골반과 손목 reference를 고르고, 고정된 Humanoid-GPT whole-body controller가 500Hz 물리 위에서 50Hz로 동작한다.
- **SIMPLE**: G1과 Dex3 손, 고정된 ScaleBFM whole-body controller. Astra는 양 손목, 양 발목, 손가락 action을 명령한다. 각 시도 뒤 Astra가 결과를 검토해 Skill(과제 지침)과 Memory(episode 간 노트) 두 문서를 고친다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 그리퍼 manipulation

RoboDojo(10개 과제 50 인스턴스)에서 Hybrid는 24/50(48%) 성공, 평균 Score 62.60을 기록했고 Direct는 13/50(26%), Score 37.81이었다. 공개 결과를 같은 과제와 장면 구성으로 재가중하면 π0.5는 성공률 15.67%, Score 24.43이고, Galaxea G0.5가 Score 38.26으로 공개 policy 중 가장 높다.

| 과제 | π0.5 (재가중) | Hybrid | Direct |
|---|---|---|---|
| Organize the table | 23.33 | 60.00 | 30.00 |
| Classify by language | 0.60 | 38.00 | 60.00 |
| Imitate a sorting sequence | 1.60 | 53.00 | 0.00 |
| Arrange the largest number | 2.29 | 50.00 | 57.00 |
| Pack objects into a box | 18.36 | 50.00 | 50.00 |
| Classify objects | 24.67 | 71.00 | 100.00 |
| Build a tower | 37.73 | 64.00 | 12.00 |
| Make a Kong in Mahjong | 26.67 | 40.00 | 0.00 |
| Fold clothes | 29.12 | 100.00 | 40.00 |
| Put bottles in a bin | 79.93 | 100.00 | 36.00 |
| 종합 | 24.43 | 62.60 | 37.81 |

- Hybrid 우위는 long-horizon 조정이나 접촉에 민감한 과제(순서 모방 53 대 0, 탑 쌓기 64 대 12, 옷 개기 100 대 40, 병 버리기 100 대 36)에 몰려 있다. 반면 언어 분류(60 대 38)와 물체 분류(100 대 71)는 Direct가 높다.
- Hybrid 50개 trajectory의 실행 control step 42,750개 중 36,576개(85.6%)가 π0.5를 그대로 따랐고 6,174개(14.4%)만 Astra가 생성하거나 수정했다. 즉 Astra는 policy를 대체하지 않고 선택적으로 개입한다.
- RoboLab에서는 Direct 49/50(98%), Hybrid 46/50(92%), π0.5 18/50(36%), Cosmos3-Nano-Policy 18/50(36%), DreamZero 17/50(34%)이다. Hybrid는 π0.5보다 56%p 높지만 Direct보다 성공 3건이 적다.
- 순위가 갈리는 이유: RoboDojo는 양손, long-horizon, 변형 물체, 접촉 민감 과제가 많아 학습된 policy의 상호작용 패턴이 유용하다. RoboLab은 단일 팔 의미 pick-and-place가 대부분이라 Direct가 현재 observation만으로 계획할 수 있고, zero-shot policy 제안은 오히려 고쳐야 할 대상이 된다. policy 보조의 가치는 학습된 motion prior가 과제에 얼마나 맞는지에 달려 있다.

### 4.2 dexterous manipulation

| 과제 | π0.5 | Direct | Hybrid |
|---|---|---|---|
| Pot lift and hold | 40.0 | 44.0 | 62.0 |
| Headphones in box | 42.0 | 22.0 | 42.0 |
| Toy retrieval | 100.0 | 22.0 | 100.0 |
| Mug hanging | 62.0 | 4.0 | 82.0 |
| Mahjong tile storage | 48.0 | 18.0 | 88.0 |
| Bottles/cans sorting | 72.0 | 14.0 | 100.0 |
| Upright egg placement | 6.0 | 12.0 | 38.0 |
| Two-bowl stacking | 46.0 | 20.0 | 52.0 |
| Bread-slot insertion | 10.0 | 8.0 | 28.0 |
| Nesting-doll ordering | 16.0 | 2.0 | 24.0 |
| 전체 평균 | 44.2 | 16.6 | 61.6 |

- Hybrid는 10개 과제 모두에서 Direct보다 높고, π0.5 대비 8개 과제에서 높고 2개는 같다. 향상폭은 마작 패 정리 40점, 달걀 세우기 32점, 병과 캔 분류 28점 순이다.
- Astra 수정 사유는 놓친 grasp와 떨어진 물체 복구 33.33%(370건), 배치 실패 복구 20.90%(232건), 배치 정렬과 놓는 시점 13.60%(151건), grasp 안정화와 들어올림 확인 12.88%(143건) 순이다. 수정은 실행 Hybrid step의 11.98%에 불과하다.
- 실패 요인은 여전히 grasp 확보와 완료 판정이다. Direct는 손가락이 동시에 닫히며 물체를 밀어내거나 두 손가락 들기로 지지가 약해진다. 달걀이 옆으로 누워 있는데 성공을 선언한 사례도 있다.
- DexJoCo 원판 쌓기에서 Astra와 π0.5 조합은 10회 중 5회(50%) 성공했다. 공개 baseline은 DP-T 24.7%, π0.5 23.3%, DP-C 12.7%, ACT 6%, GR00T N1.5 0.7%이다(공개 결과는 50 episode 세 세트 평균). 실행 step 11,320개 중 73.6%가 수정 없는 policy action이었다. 성공 사례에서 Astra는 작은 원판이 아직 받침 위에 떠 있어 제안된 놓기를 미루고, 짧은 하강 수정 뒤 policy에 놓기를 넘겼다. 반대로 Astra의 손목 조정 두 번이 원판을 목적지에서 멀어지게 한 사례도 있다. 시도와 다섯 번의 리뷰가 6,360만 토큰을 썼고 리뷰에는 13.6만 토큰만 쓰였다.

### 4.3 in-hand 제어

| 과제 | 제어기 | Full | Budget | Drop | 목표 도달 step 비율 | 방향 오차 (rad) | 속도 MAE |
|---|---|---|---|---|---|---|---|
| 원기둥, 20초 | Astra Direct | 3/5 | 1/5 | 1/5 | 0.51% | 1.626 | 0.960 |
| 원기둥, 20초 | RL | 5/5 | 해당 없음 | 0/5 | 76.90% | 0.173 | 0.276 |
| 직육면체, 10초 | Astra Direct | 5/5 | 0/5 | 0/5 | 4.40% | 0.742 | 0.143 |
| 직육면체, 10초 | RL | 5/5 | 해당 없음 | 0/5 | 63.50% | 0.096 | 0.063 |

- 직육면체에서는 두 제어기 모두 다섯 번 모두 물체를 유지했지만 Astra가 너무 느리게 회전시켰다. grasp가 안정적이어도 회전 진행의 격차가 남는다. Astra는 지지 유지는 잘하지만 손가락 접촉을 재배치해 움직임을 이어가는 데 약하다.
- 이동: Astra 1/5, RL 4/5, 평균 최종 오차 59.05mm 대 17.29mm. 이동과 회전 결합: Astra 0/5, 같은 step의 RL 4/5, 15초 RL 5/5. 성공 기준은 위치 오차 22.4mm 미만이면서 회전 오차 10도 미만이다. Astra의 120회 결정 예산은 6.00~7.65초에 끝나지만 같은 시간에서도 RL이 앞서므로 action horizon만으로는 격차를 설명할 수 없다.

### 4.4 mobile manipulation (RoboCasa365)

| 과제 그룹 | π0.5 단독 | Astra Direct | Astra Hybrid |
|---|---|---|---|
| 원자 과제 seen | 13/25 (52.0%) | 7/25 (28.0%) | 13/25 (52.0%) |
| 복합 과제 seen | 3/25 (12.0%) | 4/25 (16.0%) | 7/25 (28.0%) |
| 복합 과제 unseen | 1/25 (4.0%) | 14/25 (56.0%) | 9/25 (36.0%) |
| 전체 | 17/75 (22.7%) | 25/75 (33.3%) | 29/75 (38.7%) |

- Hybrid는 policy 학습 범위 안의 과제에서 Direct보다 높지만 unseen 조합에서는 뒤진다. Hybrid만 성공한 시작 상태 13개, Direct만 성공 9개, 공통 성공 16개이며 exact McNemar 검정 p = 0.5235로 유의한 차이는 아니다.
- Hybrid 75 episode 중 66개가 지시문 재작성을 썼고 제안의 72.6%가 재작성된 지시문 조건이었다. 실행 step의 55.2%는 수용된 policy action, 44.8%는 Astra가 만든 action이다.
- Astra 두 조건은 CoffeeSetupMug와 WashLettuce를 다섯 seed 모두 실패했지만 단독 policy는 각각 3건, 2건 성공했다. policy 접근이 성공을 보존하지는 않는다. 실패 유형은 정밀한 grasp와 지속 접촉, 물체를 든 채 base와 팔 조정, 단계 간 전제 조건과 물체 상태 추적이다.

### 4.5 navigation

| 과제 | 데이터셋 | 성공 | SR | SPL | nDTW | sDTW |
|---|---|---|---|---|---|---|
| VLN-CE | R2R | 39/50 | 78 | 65.27 | 72.20 | 59.35 |
| VLN-CE | RxR (영어) | 46/50 | 92 | 77.25 | 84.73 | 80.42 |
| ObjectNav | MP3D | 28/50 | 56 | 22.43 | 해당 없음 | 해당 없음 |
| ObjectNav | HM3D | 41/50 | 82 | 43.69 | 해당 없음 | 해당 없음 |

- ObjectNav는 SR에 비해 SPL이 낮아 비효율적 탐색이 드러난다. MP3D 10개, HM3D 5개 episode가 예산 소진으로 끝났고 VLN-CE episode는 모두 STOP으로 끝났다.
- 같은 200 episode로 로컬 평가한 공개 policy와 비교하면 Astra가 모든 subset에서 SR과 SPL이 가장 높다. LightNav-0 대비 SR 향상은 20, 20, 36, 16%p다. R2R nDTW는 LightNav-0가 72.77%로 Astra(72.20%)보다 약간 높지만 sDTW는 Astra가 59.35% 대 48.89%로 높다.

| 시스템 | 시점 수 | R2R SR | RxR SR | MP3D SR | HM3D SR |
|---|---|---|---|---|---|
| Astra | 1 | 78.00 | 92.00 | 56.00 | 82.00 |
| LightNav-0 | 1 | 58.00 | 72.00 | 20.00 | 66.00 |
| Uni-NaVid 7B | 1 | 30.00 | 34.00 | 8.00 | 30.00 |
| OmniNav Flow | 3 | 56.00 | 72.00 | 4.00 | 6.00 |
| NavFoM | 3 | 44.00 | 58.00 | 18.00 | 42.00 |
| SPAN-Nav | 3 | 70.00 | 72.00 | 해당 없음 | 해당 없음 |

- 실패 trajectory는 시각 observation을 특정 위치와 연결하기, 목표 완료 검증, 충돌 피드백이나 탐색 이력으로 경로 바꾸기에서 어려움을 보인다.

### 4.6 locomotion

| 계획기 / 시도 | 결과 | 시간 (s) | 진행 (m) | 최종 오차 (m) | 넘어짐 |
|---|---|---|---|---|---|
| PASSAGE | 목표 도달 | 13.18 | 8.622 | 0.495 | 아니오 |
| Astra 1회 | 넘어짐 | 9.80 | 1.561 | 7.556 | 예 |
| Astra 2회 | 진행 없음 | 20.28 | -0.024 | 9.141 | 아니오 |
| Astra 3회 | 진행 없음 | 8.00 | 0.012 | 9.104 | 아니오 |
| Astra 4회 | 진행 없음 | 8.48 | 0.159 | 8.958 | 아니오 |
| Astra 5회 | 시간 종료 | 30.00 | 2.598 | 6.519 | 아니오 |

- 다섯 번째 시도는 30초 동안 서 있고 3.833m를 이동했지만 주 장애물 구간 앞에서 끝났다. 관절 한계만으로 reference가 일관되지 않으며, 루트 속도와 팔다리 자세와 그 변화가 서로 맞아야 한다.
- 마지막 30초 episode는 동기 호출 250회, 호출당 평균 39.86초가 걸렸다. PASSAGE 계획은 호출당 약 0.08초다.
- Astra 없이 해석적 생성기로 시험한 compact reference 인터페이스는 엄격 성공이 0/12였다. Five-point(골반, 손목, 발목)는 4/12 도달 후 유지, 넘어짐 1회이고 WholeBody-14는 3/12, 넘어짐 4회였다. 낮은 천장 코스는 1/6, 0/6만 도달했다. 큰 장애물 접촉력은 추종 가능한 동작이 안전한 동작은 아님을 보여준다.

### 4.7 humanoid loco-manipulation

| 과제 | DreamerV3 | TD-MPC2 | SAC | Astra | 기준값 |
|---|---|---|---|---|---|
| Maze | 272.3 | 244.3 | 144.8 | 1358.8 | 1200 |
| Reach | 7580.9 | 7316.1 | 4565.1 | 11430.2 | 12000 |
| Walk | 800.2 | 782.0 | 31.7 | 848.7 | 700 |
| Run | 633.8 | 93.3 | 5.0 | 642.1 | 700 |
| Crawl | 878.8 | 957.4 | 330.0 | 971.9 | 700 |
| Stair | 131.1 | 70.4 | 14.1 | 272.5 | 700 |
| Push | -1251.9 | -258.7 | -97.9 | 877.3 | 700 |
| Door | 213.0 | 274.7 | 39.4 | 142.4 | 600 |

- 30개 과제 평균 return은 Astra 581.9, TD-MPC2 338.2, SAC 42.7, DreamerV3 -41.9다. Astra는 DreamerV3보다 16개, TD-MPC2보다 19개, SAC보다 25개 과제에서 높고, 세 방법 중 최고값을 13개 과제에서 넘고 Kitchen에서 0으로 같다. 기준값에 도달한 과제는 Stand, Walk, Maze, Crawl, Push, Sit Simple 6개다.
- 비교 대상은 공개 결과(DreamerV3와 SAC 1,000만 학습 step, TD-MPC2 200만 step)이며 Astra는 미리 학습된 whole-body controller를 쓴다는 점에서 조건이 다르다.
- 보정의 영향: Walk에서 gait clock 주파수를 1.2Hz에서 1.8Hz로 바꾸면 가중치, 명령 속도, 피드백 규칙 변경 없이 평균 return이 705.72에서 746.60으로 오른다. 1.25m/s 명령에 실제 전진 속도는 약 1.48m/s다.
- Push는 진입 상태와 접촉 reference를 함께 바꿔야 성공한다. seed 5에서 둘 다 그대로면 27.02cm, 진입만 바꾸면 36.81cm, 접촉만 바꾸면 23.11cm, 둘 다 바꾸면 4.97cm 오차다.
- Door는 해치를 회전시키지만 통로를 열지 못했고, 손가락 닫힘 제어를 추가해도 return 144.38(기준 600)에 그쳤다. Cube와 Window는 물체를 일찍 놓치고 Kitchen은 0이다.
- SIMPLE L2에서는 60회 중 50회 성공(83.3%)이다. Handover 8/10, Mobile pick/place 7/10, Tabletop 9/10, XMove bend pick 9/10, XMove pick 9/10, Bend 8/10이다.
- Handover의 native 성공 기준은 완전히 놓은 뒤 상자가 안정적인지 요구하지 않는다. 손가락 닫힘이나 상자 기울기를 안정적 grasp로 착각하는 실패가 있었고, 고정 절차를 이전 성공 장면 3개에 다시 적용하면 추가 유지 검사까지 통과한 것은 2개였다.
- egocentric 영상에서 상호작용 장면과 humanoid motion reference를 만드는 파이프라인도 Astra가 구성하고 다듬었다. 이미지 기반 보정으로 장면 Chamfer-L1 오차가 35.93mm에서 24.73mm로, CAD 치수를 반영하면 12.14mm로 줄었다. 사과 옮기기 세 사례 중 한 사례만 상호작용 전체를 완료했고, 이 연구에 2억 1,700만 토큰이 들었다.

### 4.8 추론 자원 (Table 13, Table 17)

| 항목 | Hybrid | Direct |
|---|---|---|
| 실행 control step | 42,750 | 38,221 |
| 실행 action segment | 3,776 | 7,729 |
| 총 토큰 (캐시 입력 포함) | 624,762,828 | 1,132,343,772 |
| 캐시 입력 토큰 | 607,555,840 | 1,107,349,760 |
| 비캐시 입력 토큰 | 15,901,963 | 22,907,448 |
| 출력 토큰 | 1,305,025 | 2,086,564 |

- RoboDojo Hybrid는 기록 토큰을 44.8% 줄이지만 비캐시 입력과 출력이 여전히 많다. RoboCasa Hybrid는 Astra가 만든 action segment는 줄이지만 모델 요청은 Direct보다 많다(8,941 대 7,910, episode당 중앙값 108 대 85). 움직임을 위임해도 그 움직임을 검토하는 작업은 위임되지 않는다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **접촉 조정**: 직접 in-hand 제어는 과제별 RL에 크게 뒤진다. 현재 grasp를 유지하려는 경향이 회전 지속에 필요한 손가락 놓기와 재배치를 막는다.
- **dense reference 보행**: 다섯 번 시도에도 신뢰할 만한 보행에 실패했다. 경로가 주어져도 조정된 신체 동작은 주어지지 않는다.
- **완료 검증**: 오류 감지, 수정 제안, 수정 효과 검증은 별개의 요구다. 그럴듯한 설명이 물리적 결과를 보장하지 않는다.
- **policy 보조의 역효과**: RoboCasa Hybrid는 단독 policy가 성공한 사례를 실패하기도 한다. 개입 시점과 policy에 제어를 되돌릴 시점을 판단해야 한다.
- **반복 재현성**: Push 개발 기록에서 성공 뒤 같은 절차의 재시도가 실패했다(return 803.86 뒤 -259.83). 진단, 서면 지침, 지속 제어는 따로 평가해야 한다.
- **추론 비용과 지연**: 물리를 멈춰야 지연을 견딜 수 있는데 실제 장면은 기다려 주지 않는다. 실제 제어에서는 추론 지연을 물리 피드백 변화 속도와 함께 평가해야 한다.
- **평가 범위**: navigation 결과는 50 episode subset이고 공개 전체 벤치마크 결과와 프로토콜이 다르다. HumanoidBench 비교는 공개 결과 재사용이며 whole-body controller와 지침, 보정이 시스템 성능에 섞여 있다.

## 6. 관련 연구 (Related Work)

- **VLA**: π0.5는 observation과 지시문을 로봇 경험에서 학습한 action으로 매핑한다. 본 연구의 Hybrid 대부분이 π0.5를 제안자로 쓴다.
- **LLM 기반 로봇 제어**: SayCan(grounding된 스킬 선택), Code as Policies(프로그램으로 인식과 제어 구성), Prompt a Robot to Walk와 Natural Language as Policies(숫자 피드백 제어).
- **벤치마크**: RoboDojo, RoboLab, DexJoCo, RoboCasa365, R2R, RxR, MP3D와 HM3D ObjectNav, HumanoidBench, SIMPLE.
- **비교 policy와 제어기**: Galaxea G0.5, Xiaomi R1, OpenWAM-α, DM0.5, Cosmos3-Nano-Policy, DreamZero, DP-T, DP-C, ACT, GR00T N1.5, LightNav-0, Uni-NaVid, OmniNav, NavFoM, SPAN-Nav, PASSAGE, ScaleTrack, ScaleBFM, Humanoid-GPT.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| GPT-6 Astra | 평가 대상인 범용 추론 모델. 숫자 로봇 action을 직접 생성할 수 있다 |
| Direct | Astra가 만든 명령을 학습된 policy 없이 IK나 PD 같은 해석적 제어로 실행하는 모드 |
| Hybrid | Astra가 학습된 task policy의 제안을 검토하거나 whole-body controller에 명령을 주는 협력 모드 |
| proposal review | policy가 낸 action 시퀀스를 Astra가 접두 실행, 수정, 대체 중 하나로 처리하는 절차 |
| dense motion reference | 0.5초 구간을 50Hz로 채우는 루트 상태와 29개 관절 위치와 속도 값의 묶음. 호출당 1,625개 값 |
| Five-point / WholeBody-14 | 6프레임 링크 자세 시퀀스로 된 compact reference 인터페이스. 각각 5개, 14개 신체 지점을 지정한다 |
| native Score | RoboDojo의 부분 완료 점수 |
| SPL | 경로 길이로 가중한 성공률. 성공해도 불필요하게 많이 이동하면 낮아진다 |
| Skill / Memory 문서 | SIMPLE에서 Astra가 시도 뒤 갱신하는 과제 지침 문서와 episode 간 노트 |

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 2 | "제어 모드, 명령 인터페이스, 하위 제어기 요약" | caption-region | ★ wiki 권장 (architecture) |
| fig02 | 4 | "그리퍼 manipulation 결과" | caption-region | ★ wiki 권장 (result) |
| fig03 | 7 | "dexterous manipulation에서 Astra의 수정 결정" | caption-region | ★ wiki 권장 (result) |
| fig04 | 7 | "DexJoCo 양손 원판 쌓기 성공률" | manual | ★ wiki 권장 (result) |
| fig05 | 8 | "양손 원판 쌓기의 성공 사례와 실패 사례" | caption-region | (본문 보조) |
| fig06 | 9 | "다섯 쌍의 초기 상태에서 측정한 연속 회전 결과" | caption-region | (본문 보조) |
| fig07 | 10 | "Allegro 과제의 사례별 최종 오차" | caption-region | (본문 보조) |
| fig08 | 11 | "RoboCasa365에서 협력이 바꾼 성능 분포" | caption-region | ★ wiki 권장 (result) |
| fig09 | 12 | "같은 물리적 시작 상태에서 비교한 RoboCasa 결과" | caption-region | (본문 보조) |
| fig10 | 13 | "navigation 성공률, 경로 효율, 종료 유형" | manual | (본문 보조) |
| fig11 | 14 | "navigation 성공 두 건과 예산 소진 실패 한 건" | caption-region | (본문 보조) |
| fig12 | 17 | "HumanoidBench 30개 과제 결과" | caption-region | ★ wiki 권장 (result) |
| fig13 | 18 | "세 실험의 결정과 물리적 반응" | manual | (본문 보조) |
| fig14 | 19 | "egocentric 영상에서 복원한 상호작용 장면" | caption-region | (본문 보조) |
| fig15 | 25 | "물리 세계 agent를 위한 harness 구조" | caption-region | ★ wiki 권장 (architecture) |
| fig16 | 28 | "RoboDojo의 10개 manipulation 과제 화면" | caption-region | (부록 상세) |
| fig17 | 31 | "dexterous manipulation 과제의 초기 상태 예시" | caption-region | (부록 상세) |
| fig18 | 35 | "in-hand manipulation 네 과제" | caption-region | (부록 상세) |
| fig19 | 39 | "in-hand 회전 성능의 사례별 비교" | caption-region | (부록 상세) |
| fig20 | 40 | "같은 시작 상태에서 비교한 회전 시퀀스" | caption-region | (부록 상세) |
| fig21 | 41 | "같은 초기 상태에서 수행한 Allegro 정성 rollout 비교" | caption-region | (부록 상세) |
| fig22 | 43 | "navigation observation과 실행 어댑터 구성" | caption-region | (부록 상세) |
| tab01 | 3 | "평가 범위와 비교 조건" | table-region | (본문 보조) |
| tab02 | 5 | "RoboDojo 과제별 Score" | table-region | (본문 보조) |
| tab03 | 6 | "자체 시뮬레이션 벤치마크의 dexterous manipulation Score" | table-region | ★ wiki 권장 (result) |
| tab04 | 9 | "in-hand 회전의 짝지은 비교" | table-region | ★ wiki 권장 (result) |
| tab05 | 10 | "in-hand 이동과 재배향 결과" | table-region | (본문 보조) |
| tab06 | 11 | "RoboCasa 같은 초기 상태에서의 완료율" | table-region | ★ wiki 권장 (result) |
| tab07 | 13 | "고정 subset 네 개의 navigation 결과" | table-region | (본문 보조) |
| tab08 | 14 | "같은 에피소드 목록으로 로컬 평가한 공개 navigation policy 비교" | table-region | ★ wiki 권장 (result) |
| tab09 | 15 | "한 장애물 코스에서 PASSAGE와 Astra 다섯 차례 연속 시도 비교" | table-region | ★ wiki 권장 (result) |
| tab10 | 15 | "Astra 없이 수행한 해석적 reference 인터페이스 실현 가능성 시험" | table-region | (본문 보조) |
| tab11 | 16 | "HumanoidBench 8개 과제의 공개 방법 대비 return" | table-region | ★ wiki 권장 (result) |
| tab12 | 18 | "SIMPLE L2에서 ScaleBFM과 결합한 Astra 성공률" | table-region | ★ wiki 권장 (result) |
| tab13 | 20 | "연구별 추론 자원 소비" | table-region | ★ wiki 권장 (result) |
| tab14 | 26 | "RoboDojo 과제별 Direct와 Hybrid의 Score와 성공률 전체 표" | manual | (부록 상세) |
| tab15 | 27 | "RoboLab 과제별 성공 횟수" | table-region | (부록 상세) |
| tab16 | 27 | "별도로 고정한 구성에서 수행한 Push와 Walk 집중 실험 기록" | table-region | (부록 상세) |
| tab17 | 28 | "RoboDojo의 action과 토큰 회계" | table-region | (부록 상세) |
| tab18 | 29 | "HumanoidBench 30개 과제 전체의 Astra return과 기준값" | manual | (부록 상세) |
| tab19 | 30 | "SIMPLE Handover 개발 기록" | table-region | (부록 상세) |
| tab20 | 32 | "dexterous manipulation 과제 목록과 평가 설정" | table-region | (부록 상세) |
| tab21 | 33 | "dexterous manipulation 구현 세부 설정" | table-region | (부록 상세) |
| tab22 | 34 | "과제별 완료 판정 기준" | table-region | (부록 상세) |
| tab23 | 35 | "in-hand manipulation 벤치마크 정의" | manual | (부록 상세) |
| tab24 | 36 | "평가에 쓴 RL policy의 학습 출처" | table-region | (부록 상세) |
| tab25 | 38 | "20초 분석 구간의 원기둥 회전 사례별 결과" | table-region | (부록 상세) |
| tab26 | 39 | "10초 분석 구간의 직육면체 회전 사례별 결과" | table-region | (부록 상세) |
| tab27 | 40 | "15초 종료 시점의 원기둥 이동 사례별 결과" | manual | (부록 상세) |
| tab28 | 41 | "이동과 회전 결합 과제의 사례별 종료 결과" | table-region | (부록 상세) |
| tab29 | 42 | "navigation 종료 유형과 이동 거리" | table-region | (부록 상세) |
| tab30 | 42 | "비교에 쓴 navigation policy의 소스 커밋과 체크포인트" | table-region | (부록 상세) |
| tab31 | 43 | "모든 고정 subset의 경로 일치도와 종료 결과" | table-region | (부록 상세) |
| tab32 | 44 | "VLN-CE의 subset 결과와 전체 벤치마크 공개 결과 참고 비교" | table-region | (부록 상세) |
| tab33 | 44 | "object-goal navigation의 subset 결과와 전체 벤치마크 공개 결과 참고 비교" | table-region | (부록 상세) |
| tab34 | 45 | "RoboCasa 전체 과제와 제어 horizon 목록" | table-region | (부록 상세) |
| tab35 | 45 | "75개 공유 시작 상태의 짝지은 결과" | table-region | (부록 상세) |
| tab36 | 45 | "Astra 두 조건의 harness 구성 범위" | table-region | (부록 상세) |
