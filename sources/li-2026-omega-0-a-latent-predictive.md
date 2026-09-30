---
title: "ω-0: A Latent Predictive World Action Model for Concurrent Humanoid Loco-Manipulation"
type: paper
year: 2026
category: physical-ai
raw_path: raw/papers/li-2026-omega-0-a-latent-predictive.pdf
raw_filename: "li-2026-omega-0-a-latent-predictive.pdf"
source_collection: external
authors: "Zhe Li, Zhenzhe Zhang, Yangyang Wei, Wenjie Zhang, Xichen Yuan (공동 1저자), Peiyuan Zhi, Gen Li, Xinying Guo, Fengjie Gao, Jianfei Yang, Shanghang Zhang"
arxiv_id: "2608.06375"
url: "https://arxiv.org/abs/2608.06375"
tags: [physical-ai, world-model, humanoid, robot-dataset]
figures:
  - id: fig01
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/li-2026-omega-0-a-latent-predictive/fig01.png
    raw: raw/papers/li-2026-omega-0-a-latent-predictive-figures/fig01.png
    caption: "ω-0와 ω-HOME 전체 구성. (1) 텍스트 토큰, ego/exo 토큰, view 토큰, robot state를 받아 whole-body action latent를 내는 ω-0와 선택적으로 생성한 미래 영상 예시, (2) 8개 capability 묶음과 멀티모달 기록으로 이뤄진 ω-HOME dataset, (3) 탁자 닦기, 바닥 걸레질, 사과 집기, 침대 청소, 세탁 등 실제 시연, (4) 사람 시연 전이와 과제 간 일반화"
    page: 1
    bbox_norm: [0.0902, 0.5474, 0.9098, 0.8796]
    strategy: manual
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/li-2026-omega-0-a-latent-predictive/fig02.png
    raw: raw/papers/li-2026-omega-0-a-latent-predictive-figures/fig02.png
    caption: "ω-0 구조와 3단계 학습. (1) Stage 1은 Qwen3-VL을 FAST 토큰으로 학습해 whole-body VLM을 만든다. (2) Stage 2와 3은 VLM feature, V-JEPA feature, 텍스트, state를 받는 joint video-action latent predictor와 0.45B action DiT가 SONIC용 whole-body latent를 denoising한다. (3) predictor 내부의 prefix-guided dual-query attention과 2D, 3D, 1D RoPE 배치"
    page: 5
    bbox_norm: [0.106, 0.0729, 0.894, 0.3065]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/li-2026-omega-0-a-latent-predictive/fig03.png
    raw: raw/papers/li-2026-omega-0-a-latent-predictive-figures/fig03.png
    caption: "ω-HOME 통계와 대표 멀티모달 시연. (a) 총 40.3시간, 24개 과제, 4,827개 episode의 capability 분포, (b) 과제별 수집 시간으로 음료를 냉장고 아래 칸에 넣기 3.8시간부터 바닥 걸레질 0.4시간까지, 아래는 ego RGB, exo RGB, exo depth 예시"
    page: 9
    bbox_norm: [0.1009, 0.0189, 0.9586, 0.4104]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/li-2026-omega-0-a-latent-predictive/fig04.png
    raw: raw/papers/li-2026-omega-0-a-latent-predictive-figures/fig04.png
    caption: "teleoperation 장비 구성. 조작자는 Pico 4 Ultra 헤드셋, 두 손의 컨트롤러, 발목의 Pico tracker를 착용하고, 로봇 쪽은 머리의 ZED Mini 카메라와 Inspire DexHand로 신호를 받는다"
    page: 9
    bbox_norm: [0.4902, 0.4324, 0.9698, 0.6636]
    strategy: manual
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/li-2026-omega-0-a-latent-predictive/fig05.png
    raw: raw/papers/li-2026-omega-0-a-latent-predictive-figures/fig05.png
    caption: "ω-0Ego, ω-0Omni, ψ-0, GR00T의 과제별 막대 그래프. (a) score, (b) success rate, (c) task progress. 원문 캡션은 Figure 6과 같은 문장이 잘못 반복돼 있다"
    page: 13
    bbox_norm: [0.1444, 0.4276, 0.8556, 0.6563]
    strategy: caption-region
    curated: false
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/li-2026-omega-0-a-latent-predictive/fig06.png
    raw: raw/papers/li-2026-omega-0-a-latent-predictive-figures/fig06.png
    caption: "실제 가정 과제 10개의 rollout 장면. 칸 지정 사과 배치, 침대 쓰레기 쓸어 담기, 냉장고에서 과일 꺼내기, 걸레질, 세탁기에서 옷 꺼내기, 손에 든 쓰레기통에 쓰레기 줍기, 서랍에 사과 넣고 닫기, 옷을 바구니에 넣기, 수건을 세탁기에 넣기, 탁자 닦기이며 주황 표식이 subtask 진행 지점이다"
    page: 15
    bbox_norm: [0.1444, 0.073, 0.8557, 0.4384]
    strategy: caption-region
    curated: true
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/li-2026-omega-0-a-latent-predictive/fig07.png
    raw: raw/papers/li-2026-omega-0-a-latent-predictive-figures/fig07.png
    caption: "일반화와 사람 데이터 전이. 새 물체(cross object), 새 방(cross scene)에서의 실행과, 사람 시연으로 fine-tuning한 뒤 로봇에 배치한 실행 장면"
    page: 15
    bbox_norm: [0.1444, 0.5063, 0.8556, 0.7321]
    strategy: caption-region
    curated: true
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/li-2026-omega-0-a-latent-predictive/fig08.png
    raw: raw/papers/li-2026-omega-0-a-latent-predictive-figures/fig08.png
    caption: "실제 long-horizon 과제 두 가지. 선반까지 걸어가 음료를 집어 사람에게 건네는 과제와, 오른손에 든 쓰레기통에 쓰레기를 주워 담는 과제"
    page: 16
    bbox_norm: [0.1244, 0.073, 0.4763, 0.3769]
    strategy: caption-region
    curated: false
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/li-2026-omega-0-a-latent-predictive/fig09.png
    raw: raw/papers/li-2026-omega-0-a-latent-predictive-figures/fig09.png
    caption: "7개 모델의 과제별 success rate 비교 (ω-0Ego, ω-0Omni, ψ-0, GR00T N1.7, Fast-WAM, DiT4DiT, π-0.5)"
    page: 27
    bbox_norm: [0.106, 0.0888, 0.894, 0.302]
    strategy: caption-region
    curated: false
  - id: fig10
    label: Figure 10
    kind: figure
    file: assets/li-2026-omega-0-a-latent-predictive/fig10.png
    raw: raw/papers/li-2026-omega-0-a-latent-predictive-figures/fig10.png
    caption: "7개 모델의 과제별 task progress 비교"
    page: 27
    bbox_norm: [0.106, 0.3688, 0.894, 0.582]
    strategy: caption-region
    curated: false
  - id: fig11
    label: Figure 11
    kind: figure
    file: assets/li-2026-omega-0-a-latent-predictive/fig11.png
    raw: raw/papers/li-2026-omega-0-a-latent-predictive-figures/fig11.png
    caption: "7개 모델의 과제별 평균 score 비교"
    page: 27
    bbox_norm: [0.106, 0.6488, 0.894, 0.862]
    strategy: caption-region
    curated: false
  - id: fig12
    label: Figure 12
    kind: figure
    file: assets/li-2026-omega-0-a-latent-predictive/fig12.png
    raw: raw/papers/li-2026-omega-0-a-latent-predictive-figures/fig12.png
    caption: "부록 과제 카드 arrange_fruit_in_the_closet. 옷장의 지정 칸에 사과를 놓는 공간 배치 능력을 평가하며 장면, 대상 물체, 대표 실행 순서를 보여준다"
    page: 28
    bbox_norm: [0.1444, 0.5131, 0.8556, 0.8778]
    strategy: caption-region
    curated: false
  - id: fig13
    label: Figure 13
    kind: figure
    file: assets/li-2026-omega-0-a-latent-predictive/fig13.png
    raw: raw/papers/li-2026-omega-0-a-latent-predictive-figures/fig13.png
    caption: "부록 과제 카드 clean_bed. 도구로 침대 위 종이 뭉치를 쓸어 담고 몸을 돌려 버리는 동작 능력을 평가하며 장면, 대상 물체, 대표 실행 순서를 보여준다"
    page: 29
    bbox_norm: [0.1444, 0.1046, 0.8556, 0.4529]
    strategy: caption-region
    curated: false
  - id: fig14
    label: Figure 14
    kind: figure
    file: assets/li-2026-omega-0-a-latent-predictive/fig14.png
    raw: raw/papers/li-2026-omega-0-a-latent-predictive-figures/fig14.png
    caption: "부록 과제 카드 mop_floor. 걸레를 든 채 이동하며 바닥 얼룩을 지우는 접촉 동작 능력을 평가하며 장면, 대상 물체, 대표 실행 순서를 보여준다"
    page: 29
    bbox_norm: [0.1444, 0.5376, 0.8556, 0.86]
    strategy: caption-region
    curated: false
  - id: fig15
    label: Figure 15
    kind: figure
    file: assets/li-2026-omega-0-a-latent-predictive/fig15.png
    raw: raw/papers/li-2026-omega-0-a-latent-predictive-figures/fig15.png
    caption: "부록 과제 카드 wipe_table. 탁자 표면을 계속 닦는 접촉 동작 능력을 평가하며 장면, 대상 물체, 대표 실행 순서를 보여준다"
    page: 30
    bbox_norm: [0.1444, 0.1146, 0.8556, 0.4371]
    strategy: caption-region
    curated: false
  - id: fig16
    label: Figure 16
    kind: figure
    file: assets/li-2026-omega-0-a-latent-predictive/fig16.png
    raw: raw/papers/li-2026-omega-0-a-latent-predictive-figures/fig16.png
    caption: "부록 과제 카드 pick_and_place_apple. 사과를 집어 옮겨 놓는 동작 능력을 평가하며 장면, 대상 물체, 대표 실행 순서를 보여준다"
    page: 30
    bbox_norm: [0.1444, 0.5417, 0.8556, 0.8501]
    strategy: caption-region
    curated: false
  - id: fig17
    label: Figure 17
    kind: figure
    file: assets/li-2026-omega-0-a-latent-predictive/fig17.png
    raw: raw/papers/li-2026-omega-0-a-latent-predictive-figures/fig17.png
    caption: "부록 과제 카드 pick_clothes_from_washing_machine. 세탁기 문 열기와 옷 꺼내기를 포함한 articulated object 조작 능력을 평가하며 장면, 대상 물체, 대표 실행 순서를 보여준다"
    page: 31
    bbox_norm: [0.1444, 0.09, 0.8556, 0.4407]
    strategy: caption-region
    curated: false
  - id: fig18
    label: Figure 18
    kind: figure
    file: assets/li-2026-omega-0-a-latent-predictive/fig18.png
    raw: raw/papers/li-2026-omega-0-a-latent-predictive-figures/fig18.png
    caption: "부록 과제 카드 pick_garbage. 여러 물체를 차례로 모으는 long-horizon 수집과 양손 협응 능력을 평가하며 장면, 대상 물체, 대표 실행 순서를 보여준다"
    page: 31
    bbox_norm: [0.1444, 0.5099, 0.8556, 0.8747]
    strategy: caption-region
    curated: false
  - id: fig19
    label: Figure 19
    kind: figure
    file: assets/li-2026-omega-0-a-latent-predictive/fig19.png
    raw: raw/papers/li-2026-omega-0-a-latent-predictive-figures/fig19.png
    caption: "부록 과제 카드 put_apple_and_close_drawer. 탁자 위 조작과 서랍 닫기 능력을 평가하며 장면, 대상 물체, 대표 실행 순서를 보여준다"
    page: 32
    bbox_norm: [0.1444, 0.1046, 0.8556, 0.441]
    strategy: caption-region
    curated: false
  - id: fig20
    label: Figure 20
    kind: figure
    file: assets/li-2026-omega-0-a-latent-predictive/fig20.png
    raw: raw/papers/li-2026-omega-0-a-latent-predictive-figures/fig20.png
    caption: "부록 과제 카드 put_clothes_into_bucket. 변형 물체 취급과 바구니 배치 능력을 평가하며 장면, 대상 물체, 대표 실행 순서를 보여준다"
    page: 32
    bbox_norm: [0.1444, 0.5258, 0.8556, 0.86]
    strategy: caption-region
    curated: false
  - id: fig21
    label: Figure 21
    kind: figure
    file: assets/li-2026-omega-0-a-latent-predictive/fig21.png
    raw: raw/papers/li-2026-omega-0-a-latent-predictive-figures/fig21.png
    caption: "부록 과제 카드 put_towel_into_washing_machine. 수건 취급과 세탁기 투입 능력을 평가하며 장면, 대상 물체, 대표 실행 순서를 보여준다"
    page: 33
    bbox_norm: [0.1444, 0.097, 0.8556, 0.4195]
    strategy: caption-region
    curated: false
  - id: fig22
    label: Figure 22
    kind: figure
    file: assets/li-2026-omega-0-a-latent-predictive/fig22.png
    raw: raw/papers/li-2026-omega-0-a-latent-predictive-figures/fig22.png
    caption: "부록 과제 카드 retrieve_from_the_upper_fridge. 냉장고 조작을 포함한 long-horizon 물체 회수 능력을 평가하며 장면, 대상 물체, 대표 실행 순서를 보여준다"
    page: 33
    bbox_norm: [0.1444, 0.489, 0.8556, 0.8538]
    strategy: caption-region
    curated: false
  - id: fig23
    label: Figure 23
    kind: figure
    file: assets/li-2026-omega-0-a-latent-predictive/fig23.png
    raw: raw/papers/li-2026-omega-0-a-latent-predictive-figures/fig23.png
    caption: "부록 과제 카드 brush_toilet. 도구를 쓰는 변기 청소 능력을 평가하며 장면, 대상 물체, 대표 실행 순서를 보여준다"
    page: 35
    bbox_norm: [0.1444, 0.0786, 0.8556, 0.3354]
    strategy: caption-region
    curated: false
  - id: fig24
    label: Figure 24
    kind: figure
    file: assets/li-2026-omega-0-a-latent-predictive/fig24.png
    raw: raw/papers/li-2026-omega-0-a-latent-predictive-figures/fig24.png
    caption: "부록 과제 카드 classify_gadgets. 의미 기준의 물체 분류 능력을 평가하며 장면, 대상 물체, 대표 실행 순서를 보여준다"
    page: 35
    bbox_norm: [0.1444, 0.368, 0.8556, 0.6131]
    strategy: caption-region
    curated: false
  - id: fig25
    label: Figure 25
    kind: figure
    file: assets/li-2026-omega-0-a-latent-predictive/fig25.png
    raw: raw/papers/li-2026-omega-0-a-latent-predictive-figures/fig25.png
    caption: "부록 과제 카드 collect_books. 책을 모아 탁자 위를 정리하는 동작 능력을 평가하며 장면, 대상 물체, 대표 실행 순서를 보여준다"
    page: 35
    bbox_norm: [0.1444, 0.6457, 0.8556, 0.886]
    strategy: caption-region
    curated: false
  - id: fig26
    label: Figure 26
    kind: figure
    file: assets/li-2026-omega-0-a-latent-predictive/fig26.png
    raw: raw/papers/li-2026-omega-0-a-latent-predictive-figures/fig26.png
    caption: "부록 과제 카드 collect_fruits_from_the_closet. 칸이 나뉜 수납장에서 과일 꺼내기 능력을 평가하며 장면, 대상 물체, 대표 실행 순서를 보여준다"
    page: 36
    bbox_norm: [0.1444, 0.0763, 0.8556, 0.3447]
    strategy: caption-region
    curated: false
  - id: fig27
    label: Figure 27
    kind: figure
    file: assets/li-2026-omega-0-a-latent-predictive/fig27.png
    raw: raw/papers/li-2026-omega-0-a-latent-predictive-figures/fig27.png
    caption: "부록 과제 카드 collect_toys_from_the_bed. 부드러운 침대 표면에서 장난감 모으기 능력을 평가하며 장면, 대상 물체, 대표 실행 순서를 보여준다"
    page: 36
    bbox_norm: [0.1444, 0.3727, 0.8556, 0.6154]
    strategy: caption-region
    curated: false
  - id: fig28
    label: Figure 28
    kind: figure
    file: assets/li-2026-omega-0-a-latent-predictive/fig28.png
    raw: raw/papers/li-2026-omega-0-a-latent-predictive-figures/fig28.png
    caption: "부록 과제 카드 fruit_bucket_arrangement. 과일 배치와 용기 정리 능력을 평가하며 장면, 대상 물체, 대표 실행 순서를 보여준다"
    page: 36
    bbox_norm: [0.1444, 0.6433, 0.8556, 0.8884]
    strategy: caption-region
    curated: false
  - id: fig29
    label: Figure 29
    kind: figure
    file: assets/li-2026-omega-0-a-latent-predictive/fig29.png
    raw: raw/papers/li-2026-omega-0-a-latent-predictive-figures/fig29.png
    caption: "부록 과제 카드 grab_fruit_bucket. 몸 전체로 뻗어 과일 통을 잡는 동작 능력을 평가하며 장면, 대상 물체, 대표 실행 순서를 보여준다"
    page: 37
    bbox_norm: [0.1444, 0.0783, 0.8556, 0.3209]
    strategy: caption-region
    curated: false
  - id: fig30
    label: Figure 30
    kind: figure
    file: assets/li-2026-omega-0-a-latent-predictive/fig30.png
    raw: raw/papers/li-2026-omega-0-a-latent-predictive-figures/fig30.png
    caption: "부록 과제 카드 hang_clothes. 옷을 다뤄 거는 동작 능력을 평가하며 장면, 대상 물체, 대표 실행 순서를 보여준다"
    page: 37
    bbox_norm: [0.1444, 0.3529, 0.8556, 0.5977]
    strategy: caption-region
    curated: false
  - id: fig31
    label: Figure 31
    kind: figure
    file: assets/li-2026-omega-0-a-latent-predictive/fig31.png
    raw: raw/papers/li-2026-omega-0-a-latent-predictive-figures/fig31.png
    caption: "부록 과제 카드 move_table_with_human. 사람과 함께 탁자를 옮기는 협업 능력을 평가하며 장면, 대상 물체, 대표 실행 순서를 보여준다"
    page: 37
    bbox_norm: [0.1444, 0.6296, 0.8556, 0.8864]
    strategy: caption-region
    curated: false
  - id: fig32
    label: Figure 32
    kind: figure
    file: assets/li-2026-omega-0-a-latent-predictive/fig32.png
    raw: raw/papers/li-2026-omega-0-a-latent-predictive-figures/fig32.png
    caption: "부록 과제 카드 push_chair. 몸 전체로 의자를 미는 가구 상호작용 능력을 평가하며 장면, 대상 물체, 대표 실행 순서를 보여준다"
    page: 38
    bbox_norm: [0.1444, 0.1434, 0.8556, 0.3861]
    strategy: caption-region
    curated: false
  - id: fig33
    label: Figure 33
    kind: figure
    file: assets/li-2026-omega-0-a-latent-predictive/fig33.png
    raw: raw/papers/li-2026-omega-0-a-latent-predictive-figures/fig33.png
    caption: "부록 과제 카드 put_the_beverage_in_the_lower_fridge. 냉장고 아래 칸에 음료 넣기 능력을 평가하며 장면, 대상 물체, 대표 실행 순서를 보여준다"
    page: 38
    bbox_norm: [0.1444, 0.5483, 0.8556, 0.8074]
    strategy: caption-region
    curated: false
  - id: fig34
    label: Figure 34
    kind: figure
    file: assets/li-2026-omega-0-a-latent-predictive/fig34.png
    raw: raw/papers/li-2026-omega-0-a-latent-predictive-figures/fig34.png
    caption: "부록 과제 카드 put_the_bottle_in_the_upper_fridge. 냉장고 위 칸에 병 넣기 능력을 평가하며 장면, 대상 물체, 대표 실행 순서를 보여준다"
    page: 39
    bbox_norm: [0.1444, 0.1364, 0.8556, 0.3955]
    strategy: caption-region
    curated: false
  - id: fig35
    label: Figure 35
    kind: figure
    file: assets/li-2026-omega-0-a-latent-predictive/fig35.png
    raw: raw/papers/li-2026-omega-0-a-latent-predictive-figures/fig35.png
    caption: "부록 과제 카드 wipe_basin. 세면대 표면 닦기 능력을 평가하며 장면, 대상 물체, 대표 실행 순서를 보여준다"
    page: 39
    bbox_norm: [0.106, 0.5577, 0.8941, 0.8282]
    strategy: caption-region
    curated: false
  - id: tab01
    label: Table 1
    kind: table
    file: assets/li-2026-omega-0-a-latent-predictive/tab01.png
    raw: raw/papers/li-2026-omega-0-a-latent-predictive-figures/tab01.png
    caption: "실제 가정 loco-manipulation 과제 11개 목록. 과제, 장면, 하체 개입 여부를 적었고 1번 사과 집기만 하체 개입이 없다"
    page: 12
    bbox_norm: [0.126, 0.0735, 0.874, 0.2677]
    strategy: table-region
    curated: false
  - id: tab02
    label: Table 2
    kind: table
    file: assets/li-2026-omega-0-a-latent-predictive/tab02.png
    raw: raw/papers/li-2026-omega-0-a-latent-predictive-figures/tab02.png
    caption: "11개 과제 종합 평가. ACT 8.2%, Diffusion Policy 15.5%, π-0.5 27.3%, InternVLA-M1 31.8%, EgoVLA 25.5%, GR00T-N1.7 22.7%, ψ-0 44.5%, Fast-WAM 37.1%, DiT4DiT 43.6%에 비해 ω-0Ego 79.1%, ω-0Omni 81.8%의 success rate를 기록한다. score 최대치는 41점이다"
    page: 13
    bbox_norm: [0.106, 0.0735, 0.894, 0.3593]
    strategy: table-region
    curated: true
  - id: tab03
    label: Table 3
    kind: table
    file: assets/li-2026-omega-0-a-latent-predictive/tab03.png
    raw: raw/papers/li-2026-omega-0-a-latent-predictive-figures/tab03.png
    caption: "ω-HOME을 추가 pre-training 데이터로 쓴 효과. Ego는 79.1%에서 80.4%로, Omni는 81.8%에서 82.4%로 success rate가 오른다"
    page: 13
    bbox_norm: [0.106, 0.7347, 0.8962, 0.8404]
    strategy: table-region
    curated: false
  - id: tab04
    label: Table 4
    kind: table
    file: assets/li-2026-omega-0-a-latent-predictive/tab04.png
    raw: raw/papers/li-2026-omega-0-a-latent-predictive-figures/tab04.png
    caption: "ω-0 ablation. robot state 제거 60.9%, VLM prefix 제거 66.4%, video query 제거 64.5%, RTC 제거 71.8%, Wan을 현재 이미지 인코더로 쓴 경우 63.6%이며 전체 모델은 Ego 79.1%, Omni 81.8%다"
    page: 14
    bbox_norm: [0.106, 0.0735, 0.894, 0.2319]
    strategy: table-region
    curated: true
  - id: tab05
    label: Table 5
    kind: table
    file: assets/li-2026-omega-0-a-latent-predictive/tab05.png
    raw: raw/papers/li-2026-omega-0-a-latent-predictive-figures/tab05.png
    caption: "미래 video latent 예측이 일반화에 주는 효과. video query가 없으면 cross-object 66.7%, cross-scene 15.0%, 사람 데이터 전이 20.0%이고, 있으면 각각 83.3%, 79.5%, 60.0%다"
    page: 18
    bbox_norm: [0.1099, 0.0733, 0.8966, 0.1946]
    strategy: table-region
    curated: true
  - id: tab06
    label: Table 6
    kind: table
    file: assets/li-2026-omega-0-a-latent-predictive/tab06.png
    raw: raw/papers/li-2026-omega-0-a-latent-predictive-figures/tab06.png
    caption: "ω-0Ego의 put_apple_and_close_drawer 과제 시행별 진행 단계 기록. 10회 시행마다 각 단계의 달성 여부를 1과 0으로 적었다"
    page: 24
    bbox_norm: [0.1105, 0.2789, 0.8895, 0.3637]
    strategy: table-region
    curated: false
  - id: tab07
    label: Table 7
    kind: table
    file: assets/li-2026-omega-0-a-latent-predictive/tab07.png
    raw: raw/papers/li-2026-omega-0-a-latent-predictive-figures/tab07.png
    caption: "ω-0Ego의 wipe_table 과제 시행별 진행 단계 기록. 10회 시행마다 각 단계의 달성 여부를 1과 0으로 적었다"
    page: 24
    bbox_norm: [0.11, 0.4924, 0.89, 0.5799]
    strategy: table-region
    curated: false
  - id: tab08
    label: Table 8
    kind: table
    file: assets/li-2026-omega-0-a-latent-predictive/tab08.png
    raw: raw/papers/li-2026-omega-0-a-latent-predictive-figures/tab08.png
    caption: "ω-0Ego의 pick_garbage 과제 시행별 진행 단계 기록. 10회 시행마다 각 단계의 달성 여부를 1과 0으로 적었다"
    page: 24
    bbox_norm: [0.11, 0.4924, 0.89, 0.5799]
    strategy: table-region
    curated: false
  - id: tab09
    label: Table 9
    kind: table
    file: assets/li-2026-omega-0-a-latent-predictive/tab09.png
    raw: raw/papers/li-2026-omega-0-a-latent-predictive-figures/tab09.png
    caption: "ω-0Ego의 clean_bed 과제 시행별 진행 단계 기록. 10회 시행마다 각 단계의 달성 여부를 1과 0으로 적었다"
    page: 24
    bbox_norm: [0.1102, 0.6097, 0.8898, 0.6893]
    strategy: table-region
    curated: false
  - id: tab10
    label: Table 10
    kind: table
    file: assets/li-2026-omega-0-a-latent-predictive/tab10.png
    raw: raw/papers/li-2026-omega-0-a-latent-predictive-figures/tab10.png
    caption: "ω-0Ego의 mop_floor 과제 시행별 진행 단계 기록. 10회 시행마다 각 단계의 달성 여부를 1과 0으로 적었다"
    page: 24
    bbox_norm: [0.1103, 0.7191, 0.8897, 0.7898]
    strategy: table-region
    curated: false
  - id: tab11
    label: Table 11
    kind: table
    file: assets/li-2026-omega-0-a-latent-predictive/tab11.png
    raw: raw/papers/li-2026-omega-0-a-latent-predictive-figures/tab11.png
    caption: "ω-0Ego의 pick_and_place 과제 시행별 진행 단계 기록. 10회 시행마다 각 단계의 달성 여부를 1과 0으로 적었다"
    page: 25
    bbox_norm: [0.1104, 0.093, 0.8896, 0.1646]
    strategy: table-region
    curated: false
  - id: tab12
    label: Table 12
    kind: table
    file: assets/li-2026-omega-0-a-latent-predictive/tab12.png
    raw: raw/papers/li-2026-omega-0-a-latent-predictive-figures/tab12.png
    caption: "ω-0Ego의 put_clothes_into_bucket 과제 시행별 진행 단계 기록. 10회 시행마다 각 단계의 달성 여부를 1과 0으로 적었다"
    page: 25
    bbox_norm: [0.1103, 0.226, 0.8898, 0.2962]
    strategy: table-region
    curated: false
  - id: tab13
    label: Table 13
    kind: table
    file: assets/li-2026-omega-0-a-latent-predictive/tab13.png
    raw: raw/papers/li-2026-omega-0-a-latent-predictive-figures/tab13.png
    caption: "ω-0Ego의 washing_machine 과제 시행별 진행 단계 기록. 10회 시행마다 각 단계의 달성 여부를 1과 0으로 적었다"
    page: 25
    bbox_norm: [0.1103, 0.3576, 0.8897, 0.4281]
    strategy: table-region
    curated: false
  - id: tab14
    label: Table 14
    kind: table
    file: assets/li-2026-omega-0-a-latent-predictive/tab14.png
    raw: raw/papers/li-2026-omega-0-a-latent-predictive-figures/tab14.png
    caption: "ω-0Ego의 arrange_fruit_in_the_closet 과제 시행별 진행 단계 기록. 10회 시행마다 각 단계의 달성 여부를 1과 0으로 적었다"
    page: 25
    bbox_norm: [0.1106, 0.4895, 0.8894, 0.5751]
    strategy: table-region
    curated: false
  - id: tab15
    label: Table 15
    kind: table
    file: assets/li-2026-omega-0-a-latent-predictive/tab15.png
    raw: raw/papers/li-2026-omega-0-a-latent-predictive-figures/tab15.png
    caption: "ω-0Ego의 pick_clothes_from_washing_machine 과제 시행별 진행 단계 기록. 10회 시행마다 각 단계의 달성 여부를 1과 0으로 적었다"
    page: 25
    bbox_norm: [0.11, 0.6365, 0.89, 0.7136]
    strategy: table-region
    curated: false
  - id: tab16
    label: Table 16
    kind: table
    file: assets/li-2026-omega-0-a-latent-predictive/tab16.png
    raw: raw/papers/li-2026-omega-0-a-latent-predictive-figures/tab16.png
    caption: "ω-0Ego의 retrieve_from_fridge 과제 시행별 진행 단계 기록. 10회 시행마다 각 단계의 달성 여부를 1과 0으로 적었다"
    page: 25
    bbox_norm: [0.1106, 0.775, 0.8895, 0.8716]
    strategy: table-region
    curated: false
---

## 한 줄 요약 (One-line Summary)

ω-0(OMEGA-0)는 지시문(instruction), 현재 시각 입력, robot state를 받아 SONIC 컨트롤러가 바로 실행할 수 있는 whole-body action latent를 diffusion으로 생성하면서, 미래 장면을 픽셀로 재구성하지 않고 미래 observation 임베딩만 보조 목표로 예측하는 humanoid용 latent predictive WAM이며, 함께 수집한 40.3시간 규모의 ω-HOME dataset으로 학습한 단일 모델이 실제 가정 loco-manipulation 과제 11개에서 success rate 81.8%(Omni 변형)를 기록해 두 번째로 높은 baseline인 ψ-0(44.5%)를 37.3%p 앞선다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 제목 | ω-0: A Latent Predictive World Action Model for Concurrent Humanoid Loco-Manipulation |
| 저자 | Zhe Li(Project Lead), Zhenzhe Zhang, Yangyang Wei, Wenjie Zhang, Xichen Yuan (이상 공동 1저자), Peiyuan Zhi, Gen Li, Xinying Guo, Fengjie Gao, Jianfei Yang, Shanghang Zhang |
| 교신저자 | Shanghang Zhang (PKU), Jianfei Yang (NTU) |
| 소속 | MARS Lab NTU, Peking University, BAAI, HKUST(GZ) |
| arXiv | 2608.06375v2 (2026년 8월 9일, cs.RO) |
| 코드 | https://github.com/gentlefress/OMEGA-0 (MIT) |
| 프로젝트 페이지 | https://gentlefress.github.io/OMEGA-0_page/ |
| 데이터셋 | ω-HOME, Hugging Face `keycharon/omega-HOME` (저장소 README 기준 공개됨) |
| 로봇 | Unitree G1, Inspire DexHand, 머리 장착 ZED Mini |
| 분량 | 본문 18쪽, 참고문헌 2쪽, 부록 19쪽 (전체 39쪽), 그림 35개와 표 16개 |
| 학습 자원 | 세 단계 모두 NVIDIA H100 8장 |

## 2. 주요 기여 (Key Contributions)

저자가 정리한 기여는 네 가지다.

1. **latent predictive whole-body WAM.** 미래 시각 임베딩 예측과 diffusion 기반 whole-body action 생성을 결합한 ω-0를 제안한다. loco-manipulation은 이동과 물체 조작을 한 policy로 함께 수행하는 과제 영역이며, ω-0는 이동하면서 조작하는 동시 수행(concurrent loco-manipulation)을 목표로 한다.
2. **3단계 학습 파이프라인.** action-aware VLM 표현을 먼저 학습하고, 공개 사람 동작 데이터를 SONIC 시뮬레이션 replay로 로봇이 실행 가능한 action latent로 바꿔 pre-training한 뒤, 실제 로봇 데이터로 post-training한다.
3. **ω-HOME dataset.** 40.3시간, 4,827개 episode, 24개 과제, 30Hz로 기록한 가정용 humanoid 데이터셋이다. ego RGB, exo RGB, exo depth, whole-body SMPL 동작, robot state, action latent를 동기화해 담는다.
4. **단일 모델 실제 실행.** 과제별 policy나 과제별 action head 없이 하나의 ω-0 모델이 short-horizon과 long-horizon을 포함한 가정 과제 11개를 자율 수행한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 문제 설정과 동기

가정용 humanoid 과제는 팔 조작이나 이동 하나만으로 끝나지 않는다. 큰 탁자를 닦으려면 발을 옮기고 상체를 기울이며 표면 접촉을 유지해야 하고, 걸레질은 긴 도구를 제어하면서 몸을 옮겨야 한다. 냉장고에서 물건을 꺼내거나 세탁기 아래 칸에 옷을 넣으려면 뻗기, 굽히기, 균형, 손 조작이 함께 맞물려야 한다. 저자는 이 과제들이 독립된 skill을 순서대로 이은 것이 아니라 하체, 몸통, 팔, 손이 계속 서로 맞춰 가는 동시 수행이라고 본다.

기존 접근의 한계는 세 계열로 정리된다.

| 계열 | 대표 연구 | 한계 |
|---|---|---|
| 팔 중심 VLA | π 시리즈, RT-1, RT-2, Diffusion Policy | end-effector나 팔 action만 예측한다 |
| 바퀴형 mobile manipulation | Mobile ALOHA 등 | base와 팔을 별도 기능 요소로 다룬다 |
| humanoid VLA | Ψ-0, OpenHLM, WholeBodyVLA, EgoVLA, GR00T | locomotion, 균형, 조작을 실무적으로 분해한다. 먼저 이동하고 서서 조작하는 과제에는 통하지만 걸으며 조작하는 과제에서 한계가 드러난다 |
| 팔 중심 WAM | VPP, Fast-WAM, UVA, Cosmos Policy 등 | 미래 예측이 국소적 물체 상호작용만 돕는다 |
| humanoid WAM | DiT4DiT, Motion-WAM | 영상 dynamics를 action 예측의 중심 중간 표현으로 둔다 |

WAM은 world-action model의 약자로, 미래 장면 예측과 action 생성을 한 모델 안에서 함께 수행하는 policy 계열이다. 저자는 영상 중심 WAM의 문제를 두 가지로 짚는다. 첫째, 실제 humanoid 환경의 시각 입력은 잡음이 많고 몸이나 도구에 가려지며 이동 중 시점이 바뀐다. action 생성이 예측된 영상 trajectory에 크게 의존하면 그 영상의 시간적 불일치가 급격한 전환, 머뭇거림, 불안정한 전신 협응으로 증폭된다. 둘째, 픽셀 수준 영상 품질을 높여도 제어가 좋아진다는 보장이 없다. 실시간 humanoid 실행에 필요한 것은 다음 whole-body action을 고르는 데 쓸모 있는 압축된 미래 정보다.

그래서 저자는 미래 예측을 영상 생성 목표가 아니라 whole-body action 학습을 위한 압축된 예측 신호로 쓸 수 있는지를 연구 질문으로 세운다. 답으로 제시한 설계가 미래 observation 임베딩과 whole-body action latent를 함께 학습하는 latent predictive world-action 표현이다. 이 설계는 world modeling의 이점을 유지하면서 대형 영상 생성기와 test-time video-to-action inversion을 쓰지 않는다.

### 3.2 전체 구조

ω-0는 지시문 ℓ, 시점 v의 현재 시각 입력 o_t^v, proprioception 상태 s_t를 받아 미래 whole-body action latent chunk z_{t:t+H}를 예측한다. 예측된 latent는 SONIC이 receding-horizon 방식으로 실제 humanoid에서 실행한다. 모델은 세 구성 요소로 이뤄진다.

| 구성 요소 | 입력 | 역할 | Stage 2와 3의 상태 |
|---|---|---|---|
| Whole-Body VLM (Qwen3-VL-2B-Instruct) | 지시문, ego 또는 exo 이미지, view 토큰 | 이산 whole-body action 토큰을 autoregressive로 예측하도록 학습해 action 의미를 담은 feature를 만든다 | 고정 |
| Joint Video-Action Latent Predictor | VLM feature, T5 텍스트 feature, V-JEPA 시각 feature, view 토큰, motion query, video query | motion query는 action 생성에, video query는 미래 visual latent 예측에 쓴다. motion query가 video query를 attention해 예측된 시각 dynamics를 action 표현에 주입한다 | 학습 |
| Action DiT (0.45B) | 미래 인지 motion feature, 텍스트 feature, state feature, noisy action latent | noisy latent를 깨끗한 whole-body action latent chunk로 denoising한다 | 학습 |

부가 구성 요소로 V-JEPA 2.1 이미지 인코더(고정), T5 텍스트 인코더(고정), 미래 영상 정답 latent를 뽑는 Wan 인코더(고정), state encoder, condition-fusion 모듈이 있다. Wan decoder는 정성적 시각화가 필요할 때만 쓰는 선택 분기이고 policy 추론과 실시간 제어에는 쓰지 않는다.

### 3.3 Stage 1: Whole-Body Action VLM pre-training

첫 단계의 목표는 vision-language backbone에 whole-body action 의미를 심는 것이다. pre-training된 VLM의 출력 공간은 이산 언어 토큰용이라 고차원 연속 제어 신호를 바로 예측하기 어렵다. 그래서 저자는 먼저 이산 whole-body action 어휘를 만든다.

- **Whole-body FAST tokenizer.** FAST tokenizer는 action chunk를 압축해 이산 토큰으로 적는 방식이다. 연속 trajectory a_{t:t+H} ∈ R^{H×d_a}를 인코더 E_act로 토큰열 c_{1:N}으로 바꾸고, 디토크나이저 D_act로 복원한다. 학습 목표는 복원 오차의 L1 노름 L_tok = ‖â − a‖₁이다.
- **VLM fine-tuning.** Qwen3-VL-2B-Instruct에 입력 x = [e_v, o_t^v, ℓ]을 넣는다. e_v는 카메라 시점을 알리는 학습 가능한 view 토큰이다. VLM은 action 토큰을 next-token prediction으로 예측하고 손실은 L_vlm = −Σ log p_θ(c_i | c_{<i}, ℓ, o_t^v, e_v)다.
- **산출물.** 학습된 VLM의 hidden 표현을 이후 단계의 action 의미 사전 지식으로 쓴다.

데이터는 공개 데이터셋 세 개를 합친다. ARCTIC은 ego와 exo 영상을 함께 담아 시점 조건 action 예측에 쓰이고, Xperience-10M은 대규모 ego 멀티모달 데이터이지만 humanoid loco-manipulation과 무관하거나 humanoid가 실행하기 어려운 과제를 수작업으로 걸러낸다. Motion-X는 다양한 3인칭 사람 동작 영상으로 exo action 이해를 보강한다. SMPL-H나 SMPL-X처럼 제각각인 신체 표현은 모두 SMPL로 통일한다.

### 3.4 Stage 2: Human-to-Humanoid Action-Latent pre-training

두 번째 단계는 미래 visual latent 예측과 whole-body action 생성을 정렬한다. V-JEPA에서 착안해 픽셀 영상 생성 대신 재구성 없는(reconstruction-free) 미래 임베딩 예측을 목표로 삼는다. 영상 중심 WAM과 달리 이 미래 예측 분기는 의도적으로 가볍게 두며 보조 예측 목표 역할만 한다. action DiT는 test-time video-to-action inversion 없이 언어, 시각, state, 미래 인지 query 조건에서 직접 latent를 denoising한다.

**지도 신호 두 가지.**

| 목표 | 정답 생성 방식 |
|---|---|
| 미래 visual latent | 고정된 Wan 인코더로 미래 프레임 o_{t+1:t+K}^v에서 y_{t+1:t+K}^v를 추출한다 |
| whole-body action latent와 robot state | 공개 사람 동작을 SONIC으로 시뮬레이션에서 batch replay해 action latent와 robot state를 기록한다. SONIC이 안정적으로 추적하지 못하는 동작(무술 동작처럼 매우 동적이거나 물리적으로 불가능한 trajectory)은 버린다. Motion-X에 이런 동작이 많아 이 필터가 특히 중요하다 |

**robot state 구성.** s_t = [q_pos, q_hand, r_torso^6D]이다. 몸 관절 위치, 손 관절 위치, IMU의 골반 방향 quaternion을 쓴다. IMU의 선가속도와 각속도는 쓰지 않는다. quaternion은 q와 −q가 같은 회전을 뜻하는 이중 표현 문제로 학습을 불안정하게 만들 수 있어 연속 6D 회전 표현으로 바꾼다. 부록 기준 state는 47차원이다.

**prefix 조건.** 현재 이미지는 고정된 V-JEPA 2.1로 f_t^v를, 지시문은 T5로 f_ℓ를 얻고, 학습 가능한 view 토큰 r_v와 Stage 1 VLM feature f_vlm을 이어 붙여 p = [f_vlm, f_ℓ, r_v, f_t^v]를 만든다.

**query와 위치 부호화.** motion query q_m은 action chunk 길이와 개수를 맞춰 query 하나가 미래 action 한 스텝에 대응한다. video query q_v는 미래 visual latent 토큰에 대응한다. 토큰 종류마다 RoPE를 다르게 적용한다.

| 토큰 | RoPE |
|---|---|
| prefix의 시각 토큰 | 공간 patch 좌표에 따른 2D RoPE |
| 미래 video query | 시간과 공간 좌표에 대한 3D RoPE |
| action query | action horizon을 따라가는 1D 시간 RoPE |
| 텍스트, view, VLM 요약 토큰 | 공간 RoPE 없음 (비공간 조건 토큰) |

**prefix-guided dual-query attention 3단계.**

1. prefix, motion query, video query를 각각 별도 self-attention 블록으로 처리해 p̃, q̃_m, q̃_v를 얻는다.
2. motion query와 video query가 각각 prefix에 cross-attention한다. q̄_m = CrossAttn_m(q̃_m, p̃), q̄_v = CrossAttn_v(q̃_v, p̃).
3. motion query가 video query에 cross-attention한다. h_m = CrossAttn_mv(q̄_m, q̄_v), h_v = q̄_v. 이 상호작용이 예측된 시각 dynamics를 motion 표현에 주입해, action 분기가 자신의 action이 불러올 미래 observation을 고려하게 만든다.

**손실.** video 출력은 L_video = ‖h_v − y_{t+1:t+K}^v‖²₂로 지도한다. action 쪽은 h_m, f_ℓ, state feature f_s = E_s(s_t)를 condition-fusion 모듈 Φ_cond로 합쳐 c_dit를 만들고, action DiT가 noise를 섞은 z_τ = √ᾱ_τ z_0 + √(1−ᾱ_τ) ε에서 깨끗한 latent ẑ_0를 예측하는 x0-prediction으로 학습한다. L_action = ‖ẑ_0 − z_0‖²₂이고 전체 목표는 L_stage2 = L_action + λ_video L_video다. 추론은 DDIM 역과정으로 적은 denoising 스텝만 쓴다.

**고정과 학습.** Stage 2에서 V-JEPA 인코더, Wan 인코더, whole-body action VLM은 고정하고 joint predictor, state encoder, condition-fusion 모듈, action DiT만 학습한다.

### 3.5 Stage 3: 실제 데이터 fine-tuning과 학습 시점 RTC

세 번째 단계는 SONIC 기반 teleoperation으로 모은 실제 로봇 데이터로 fine-tuning한다. 과제별로 모델을 따로 학습하지 않고 모든 실제 trajectory를 섞어 하나의 일반 모델을 만든다. 학습 데이터는 11개 과제, 과제당 약 200개 시연 데이터(demonstration), 총 2,220개 trajectory다. 고정과 학습 대상은 Stage 2와 같다.

real-time action chunking은 추론 지연이 있어도 action chunk가 매끄럽게 이어지도록 학습 중에 이를 흉내 내는 기법이다(RTC, Black 2025). receding-horizon 제어에서 인접 chunk는 독립이 아니라 새 chunk의 앞부분이 직전 단계에서 생성하거나 실행한 action과 이어져야 한다. 학습 시 prefix 길이 M을 0에서 8 사이에서 무작위로 뽑아 noisy latent의 앞 M 프레임을 깨끗한 정답 latent로 바꾸고, 손실은 prefix가 아닌 구간에만 계산한다. L_RTC = ‖ẑ_0^{M+1:H} − z_0^{M+1:H}‖²₂이고 L_stage3 = L_RTC + λ_video L_video다. 깨끗한 prefix가 시간적 기준점이 되어 chunk 사이 불연속을 줄인다.

### 3.6 실제 배치

배치 시 SONIC이 저수준 whole-body 컨트롤러를 맡는다. 매 제어 스텝마다 지시문, 머리 카메라 이미지, proprioception을 받아 action latent chunk를 예측하고, SONIC이 이를 실행 가능한 whole-body 명령으로 바꾼다. 부록 B의 세부 수치는 아래와 같다.

| 항목 | 값 |
|---|---|
| forward 1회 소요 | 약 0.14초 (7Hz 이상) |
| action chunk 길이 H | 25 |
| 실행 스텝 K | 앞 8개만 실행하고 새 이미지를 받는다 |
| 텍스트 토큰화 | episode 시작에 한 번 하고 재사용 |
| 시각 토큰과 state | 매 policy 갱신마다 새로 받음 |
| view 토큰 | ego와 exo를 구분하는 이진 토큰 |
| 미래 visual latent 분기 | 실시간 제어에는 쓰지 않음 |

chunk 경계 처리에는 두 장치를 쓴다. 첫째, RTC 방식 warm start는 직전 chunk의 실행하지 않은 뒷부분을 다음 denoising 초기화의 prefix로 넣는다. 둘째, overlap blending은 겹치는 길이 O에서 이전 chunk의 마지막 O개와 다음 chunk의 처음 O개를 α_j = (j+1)/(O+1)로 선형 보간해 고주파 점프를 없앤다.

### 3.7 action과 state의 형식 (부록 A)

| 항목 | 차원 | 정규화 |
|---|---|---|
| whole-body action latent | 64 (SONIC 컨트롤러 인터페이스) | 학습셋 통계로 평균과 표준편차 정규화 |
| 손 명령 | 2 (좌우 각 1, 0은 완전히 편 손, 1은 완전히 쥔 손) | min-max |
| action 전체 | 66 | 위 두 가지 조합 |
| robot state | 47 (몸 관절, 손 관절, 루트 6D 회전) | min-max |

공개 동작 데이터는 SMPL-X와 SMPL-H를 SMPL로 바꾸고 좌표계를 z-up으로 통일한다. 또 첫 프레임의 루트 yaw를 모든 프레임에서 빼는 zero-yaw 정규화를 공개 데이터와 ω-HOME 모두에 적용한다. 시작 방향이 제각각이면 retargeting이나 replay 초기에 로봇 방향이 급변하는 불연속이 생기기 때문이다.

### 3.8 ω-HOME dataset

| 항목 | 값 |
|---|---|
| 총 분량 | 40.3시간, 4,827개 episode |
| 과제 | 24개, capability 묶음 8개 |
| 기록 주기 | 30Hz |
| modality | 지시문, ego RGB, exo RGB, exo depth, robot state, whole-body SMPL 동작, action latent |
| 과제별 시간 범위 | 음료를 냉장고 아래 칸에 넣기 3.8시간부터 바닥 걸레질 0.4시간까지 |

capability 묶음 8개는 물체 회수, 표면 청소, 가전 조작, 용기 이송, 천 다루기, 수납 정리, mobile manipulation, 도구를 쓰는 바닥 작업이다. Figure 1의 원형도에는 1번 접촉이 많은 청소(4개 과제, 4.91시간), 2번 어지러운 물건 치우기(4개, 6.39시간), 3번 기본 pick-and-place(3개, 2.04시간), 4번 여러 물체 분류와 배치(3개, 6.41시간), 5번 수납 공간에서 꺼내기(2개, 5.69시간), 6번 수납과 가전에 넣기(2개, 6.49시간), 7번 세탁과 의류 관리(4개, 5.97시간), 8번 큰 물체 조작과 사람 협업(2개, 2.46시간)으로 적혀 있다.

**teleoperation.** teleoperation은 사람이 로봇을 원격으로 움직여 시연을 만드는 방식이다. SONIC을 teleoperation policy로 쓰고, 조작자는 Pico VR 헤드셋(Pico 4 Ultra)과 발에 단 Pico tracker 두 개로 머리와 하체 동작 신호를, 손에 든 트리거 두 개로 손 쥐기 명령을 준다. 로봇에는 ZED Mini를 ego 카메라로, Inspire DexHand를 손으로 단다. 방 안에 ZED depth 카메라를 따로 놓아 3인칭 RGB와 depth를 동기 기록한다.

**평가 누출 방지.** ω-HOME을 pre-training에 추가하는 실험에서는 평가 과제 11개를 pre-training 풀에서 빼고 나머지 trajectory만 공개 사람 시연 데이터와 합쳐 Stage 2에 쓴다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 평가 지표와 과제 구성

모든 방법은 실제 데이터셋으로 학습하거나 fine-tuning한 단일 멀티태스크 모델이며, 과제마다 10회 독립 시행한다.

| 지표 | 정의 | 특징 |
|---|---|---|
| Success Rate | 모든 목표를 시간 안에 끝낸 시행 비율 (N_success / 10) | 이진 판정 |
| Score | 미리 나눈 subtask를 하나 끝낼 때마다 1점, 10회 평균. 11개 과제 합계 최대 41점 | 앞 단계를 실패해도 뒤 단계 점수를 받는 non-prefix 지표 |
| Task Progress | n개 순서 subtask 중 m번째에서 처음 실패하면 m/n, 전부 끝내면 1.0 | 첫 실패 전까지 연속 진행을 재는 지표 |

평가 과제 11개는 아래와 같다 (Table 1).

| # | 과제 | 장면 | 하체 개입 |
|---|---|---|---|
| 1 | 사과를 집어 바구니에 넣기 | 탁자 위 | 없음 |
| 2 | 선반에 사과 배치 | 선반 | 있음 |
| 3 | 침대에서 옷을 집어 바구니에 던지기 | 침실 | 있음 |
| 4 | 바구니의 수건을 세탁기로 옮기기 | 세탁실 | 있음 |
| 5 | 탁자 닦기 | 탁자 위 | 있음 |
| 6 | 바닥 걸레질 | 거실 | 있음 |
| 7 | 여러 높이의 쓰레기를 손에 든 통에 줍기 | 가정 | 있음 |
| 8 | 사과를 서랍에 넣고 무릎으로 서랍 닫기 | 탁자 위 | 있음 |
| 9 | 침대 쓰레기를 쓸어 담고 돌아서 통에 버리기 | 침실 | 있음 |
| 10 | 세탁기에서 옷 꺼내기 | 세탁실 | 있음 |
| 11 | 냉장고에서 음료 꺼내기 | 냉장고 | 있음 |

### 4.2 baseline

| 계열 | 모델 | 적용 방식 |
|---|---|---|
| 고전 imitation learning | ACT | action head를 humanoid action space에 맞추고 chunk 크기를 조정 |
| 고전 imitation learning | Diffusion Policy | ResNet-18 시각 인코더, UNet 계열 action 모델 |
| VLA | π-0.5 | action head를 확장하고 chunk 크기를 맞춘 뒤 pre-training 체크포인트에서 fine-tuning |
| VLA | InternVLA-M1 | VLM backbone을 고정하고 action head만 fine-tuning |
| VLA | EgoVLA | 손목과 손 pose 디코더를 humanoid 제어 인터페이스용 head로 교체 |
| VLA | GR00T-N1.7 | 공식 레시피로 fine-tuning, RTC 없이 순차 chunk 추론 |
| humanoid | ψ-0 | 상체와 손 action만 예측하고 하체는 AMO 컨트롤러에 맡기는 팔 중심 구조 |
| WAM | Fast-WAM | 영상 예측을 학습 목표로만 두고 추론 시 미래 영상 생성을 뺀 WAM |
| WAM | DiT4DiT | 영상 DiT의 중간 denoising feature로 action DiT를 조건화, Unitree G1에서 평가된 모델 |

### 4.3 종합 결과 (Table 2)

| 방법 | Success Rate (%) | Score (최대 41) | Task Progress (%) |
|---|---|---|---|
| ACT | 8.2 | 10.6 | 32.4 |
| Diffusion Policy | 15.5 | 14.8 | 40.6 |
| π-0.5 | 27.3 | 20.9 | 52.8 |
| InternVLA-M1 | 31.8 | 21.8 | 55.6 |
| EgoVLA | 25.5 | 18.6 | 49.1 |
| GR00T-N1.7 | 22.7 | 19.7 | 49.8 |
| ψ-0 | 44.5 | 23.6 | 59.6 |
| Fast-WAM | 37.1 | 22.3 | 57.8 |
| DiT4DiT | 43.6 | 23.1 | 61.0 |
| ω-0Ego | 79.1 | 35.8 | 88.7 |
| ω-0Omni | **81.8** | **36.7** | **90.3** |

baseline 중 success rate와 score가 가장 높은 모델은 ψ-0(44.5%, 23.6점)이고 task progress가 가장 높은 모델은 DiT4DiT(61.0%)다. ω-0Omni는 success rate에서 ψ-0를 37.3%p, task progress에서 DiT4DiT를 29.3%p 앞선다. 저자의 해석은 다음과 같다. ACT와 DP는 짧은 chunk는 만들지만 long-horizon 협응에 실패한다. VLA는 pre-training 표현의 이점이 있으나 action 인터페이스가 통합 whole-body 제어용이 아니다. WAM baseline은 팔 중심이거나 영상 생성 설계라 컨트롤러와 호환되는 whole-body latent 인터페이스를 직접 제공하지 않는다.

### 4.4 시점 변형 비교

ω-0Ego는 ego 이미지만으로 학습하고 평가한다. ω-0Omni는 이동 비중이 큰 다섯 과제(침대 옷 치우기, 수건을 세탁기로, 걸레질, 쓰레기 줍기, 사과를 서랍에 넣고 무릎으로 닫기)에서 exo 이미지를 입력과 미래 latent 지도에 쓰고 나머지 과제는 ego를 쓴다. Omni가 Ego보다 success rate 2.7%p, task progress 1.6%p 높다. 저자는 ego 시점이 배치 시점 인지와 일치하지만 로봇의 전역 이동과 발 디딤, 몸통 조정을 잘 보여주지 못하고, exo 시점이 전신 움직임과 물체 장면 관계를 더 완전히 담는다고 설명한다.

### 4.5 과제별 ω-0Ego 성능 (부록 표 6~16에서 계산)

부록의 시행별 진행 단계 표로 ω-0Ego의 과제별 수치를 다시 계산하면 아래와 같다. 합계가 본문의 79.1%(87/110)와 35.8점에 일치한다.

| 과제 | 단계 수 | 성공 시행 | 평균 score |
|---|---|---|---|
| put_apple_and_close_drawer | 4 | 9/10 | 3.9 |
| wipe_table | 3 | 9/10 | 2.9 |
| pick_garbage | 5 | 5/10 | 3.7 |
| clean_bed | 4 | 6/10 | 3.2 |
| mop_floor | 3 | 8/10 | 2.8 |
| pick_and_place | 3 | 10/10 | 3.0 |
| put_clothes_into_bucket | 3 | 8/10 | 2.8 |
| washing_machine | 3 | 9/10 | 2.7 |
| arrange_fruit_in_the_closet | 4 | 8/10 | 3.4 |
| pick_clothes_from_washing_machine | 4 | 8/10 | 3.6 |
| retrieve_from_fridge | 5 | 7/10 | 3.8 |

가장 낮은 과제는 pick_garbage(5/10)로, 오른손에 쓰레기통을 든 채 세 물체를 담고 방해물 없이 유지해야 한다. 첫 번째 물체를 넣는 단계에서 5회 실패했지만 이후 단계는 대부분 성공해 score(3.7점)는 높게 나왔다. score가 non-prefix 지표라서 생기는 차이다. retrieve_from_fridge의 실패 3회는 모두 과일을 바구니에 넣는 2단계에서 시작해 이후 단계가 전부 0이다.

### 4.6 ω-HOME pre-training 효과 (Table 3)

| 변형 | ω-HOME 사용 | SR (%) | Score | Progress (%) |
|---|---|---|---|---|
| ω-0Ego | 아니오 | 79.1 | 35.8 | 88.7 |
| ω-0Ego | 예 | 80.4 | 36.9 | 89.7 |
| ω-0Omni | 아니오 | 81.8 | 36.7 | 90.3 |
| ω-0Omni | 예 | 82.4 | 37.5 | 91.2 |

평가 과제와 겹치지 않는 ω-HOME trajectory를 Stage 2에 추가하면 모든 지표가 오른다. 향상 폭은 success rate 기준 Ego 1.3%p, Omni 0.6%p다. 본문 4.2절은 이 효과를 "significantly improves"로 표현하지만 표의 차이는 1%p 안팎이다.

### 4.7 Ablation (Table 4)

| 변형 | State | VLM Prefix | Video Query | RTC | 이미지 인코더 | SR (%) | Score | Progress (%) |
|---|---|---|---|---|---|---|---|---|
| robot state 제거 | ✗ | ✓ | ✓ | ✓ | V-JEPA | 60.9 | 29.8 | 75.6 |
| VLM prefix 제거 | ✓ | ✗ | ✓ | ✓ | V-JEPA | 66.4 | 31.7 | 79.8 |
| video query 제거 | ✓ | ✓ | ✗ | ✓ | V-JEPA | 64.5 | 30.6 | 77.9 |
| RTC 제거 | ✓ | ✓ | ✓ | ✗ | V-JEPA | 71.8 | 33.4 | 84.1 |
| Wan 인코더 | ✓ | ✓ | ✓ | ✓ | Wan | 63.6 | 30.9 | 77.3 |
| 전체 ω-0Ego | ✓ | ✓ | ✓ | ✓ | V-JEPA | 79.1 | 35.8 | 88.7 |
| 전체 ω-0Omni | ✓ | ✓ | ✓ | ✓ | V-JEPA | 81.8 | 36.7 | 90.3 |

Ego 기준으로 요소별 하락 폭(success rate)은 robot state 18.2%p, Wan 인코더 15.5%p, video query 14.6%p, VLM prefix 12.7%p, RTC 7.3%p 순이다.

- **robot state.** 같은 시각 입력과 지시문이라도 현재 pose, heading, 균형, 손 상태에 따라 맞는 action이 다르다. state를 빼면 회전, 발 딛기, 굽히기, 이동 중 접촉 유지 과제가 특히 영향을 받는다.
- **VLM prefix.** 이산 whole-body action 토큰으로 학습한 VLM feature는 과제 조건 action 의미를 담는다. 빼면 action 생성이 약해지고 미래 visual latent 예측도 덜 정확해진다.
- **video query.** video query, 미래 latent 손실, motion에서 video로 가는 cross-attention을 모두 빼면 직접적인 언어, 시각, state에서 action으로 가는 diffusion policy가 된다. 저자는 이 하락을 ω-0의 이득이 더 강한 action 디코더만이 아니라 latent predictive 표현 학습에서도 나온다는 근거로 든다.
- **RTC.** 학습 시 prefix 0~8을 주는 절차를 빼도 그럴듯한 action은 나오지만 실행 trajectory에 머뭇거림, 불연속, 보정 동작이 늘어난다.
- **현재 이미지 인코더.** Wan 인코더로 현재 이미지와 미래 latent를 같은 공간에 두면 오프라인 미래 latent 예측은 더 정확하다. 그러나 Wan은 시간적으로 연속된 영상 입력에 맞춰 설계돼 단일 프레임을 넣으면 action 생성에 쓸 정보가 부족하고, 로봇이 지나치게 정지하거나 머뭇거린다. 저자는 이 결과를 미래 latent 재구성 정확도만으로는 제어에 충분하지 않다는 근거로 정리한다.

### 4.8 일반화와 사람 데이터 전이 (Table 5)

ω-HOME 전체로 fine-tuning한 뒤 실제 fine-tuning 분포에 없던 조건에서 평가한다. 사람 데이터 전이는 사람 시연으로 fine-tuning해 실제 humanoid에 배치한다.

| 설정 | 구성 | Video Query | SR (%) | Score | Progress (%) |
|---|---|---|---|---|---|
| Cross-object | 선반에서 배 집기, 색이 다른 옷을 세탁기에서 꺼내기, 냉장고에서 와플 꺼내기 (최대 13점) | ✗ | 66.7 | 7.6 | 63.3 |
| | | ✓ | 83.3 | 11.8 | 90.8 |
| Cross-scene | 다른 방 침대에서 옷 집기, 다른 장면의 탁자까지 걸어가 닦기 (최대 6점) | ✗ | 15.0 | 0.5 | 15.0 |
| | | ✓ | 79.5 | 5.5 | 91.7 |
| Human Data Transfer | 사람 시연만으로 학습해 옷장 문까지 걸어가 닫기 (최대 3점) | ✗ | 20.0 | 1.2 | 20.0 |
| | | ✓ | 60.0 | 2.2 | 74.6 |

video query를 빼면 세 설정 모두 하락하며, cross-scene에서 success rate 차이가 64.5%p로 가장 크다. 저자는 미래 video latent 예측이 과제 진행, 물체 장면 상호작용, 전신 동작 결과에 대한 미래 인지 표현을 학습시켜 새 물체, 새 장면, 사람에서 로봇으로의 전이에 더 잘 옮겨가는 action 표현을 만든다고 해석한다.

### 4.9 정성 평가

평가에 쓴 실제 로봇 시연은 모두 학습된 policy가 G1에서 자율 실행한 것이며 teleoperation, 동작 replay, 스크립트 개입이 없다. 저자는 특히 여러 높이의 쓰레기를 손에 든 통에 모으는 과제와, 먼 거리를 걸어 선반에서 음료를 꺼내 책상에서 일하는 사람에게 건네는 과제를 long-horizon 성과로 제시한다 (Figure 8).

## 5. 한계와 향후 과제 (Limitations and Future Work)

본문에 별도의 한계 절이 없다. 결론은 latent predictive world-action modeling이 확장 가능한 동시 humanoid loco-manipulation의 효과적인 틀이라고만 정리한다. 자료에서 확인되는 제약은 아래와 같다.

- **평가 규모.** 과제마다 10회 시행이며, 모든 결과가 Unitree G1 한 기종과 한 실험 환경에서 나왔다. 일반화 평가도 cross-object 3개, cross-scene 2개, 사람 데이터 전이 1개 과제에 그친다.
- **컨트롤러 의존.** action 공간이 SONIC의 64차원 latent 인터페이스이므로 SONIC이 추적하지 못하는 동작은 표현할 수 없다. 사람 동작 데이터도 SONIC replay에서 추적에 실패하면 버려진다.
- **현재 이미지와 미래 latent의 공간 불일치.** 최종 모델은 현재 이미지를 V-JEPA로, 미래 정답을 Wan으로 인코딩해 두 latent 공간이 다르다. 저자도 이 간극을 인정하고 실측 성능을 근거로 선택했다고 쓴다.
- **표현의 과장 가능성.** ω-HOME pre-training 효과를 "significantly improves"로 서술하지만 Table 3의 향상은 success rate 0.6%p에서 1.3%p다.
- **캡션 오류.** Figure 5의 캡션이 Figure 6의 캡션과 같은 문장이고, 실제 그림은 네 모델의 과제별 막대 그래프다.
- **공개 범위.** 저장소 README 기준 pretrained 체크포인트는 아직 공개되지 않았다 (TODO 항목).

## 6. 관련 연구 (Related Work)

| 분야 | 연구 | 이 논문과의 관계 |
|---|---|---|
| whole-body 제어 | SONIC (Luo 2025) | 저수준 컨트롤러, teleoperation policy, 사람 동작 replay 도구로 세 번 쓰인다 |
| whole-body 제어 | GMT, UniTracker, Humanoid-GPT, ExBody2, ASAP | RL 기반 motion tracking 계보 |
| humanoid VLA | Ψ-0 (Wei 2026) | 가장 강한 baseline. RTC 학습 절차의 출처이며 저장소 코드 일부의 출처 |
| humanoid VLA | OpenHLM, WholeBodyVLA, EgoVLA, GR00T | observation에서 action으로 가는 직접 학습 계열 |
| humanoid WAM | DiT4DiT, Motion-WAM | 영상 world model 중심 설계. ω-0는 재구성 없는 latent 예측으로 대비된다 |
| 팔 중심 WAM | Fast-WAM, VPP, UVA, WorldVLA, mimic-video, Cosmos Policy, Motus | 미래 영상 예측을 action 학습에 쓰는 계열 |
| 표현 학습 | V-JEPA 2 (Assran 2025) | 재구성 없는 미래 임베딩 예측의 착안점이자 현재 이미지 인코더 |
| action 토큰화 | FAST (Pertsch 2025) | whole-body FAST tokenizer의 원형 |
| 실시간 chunking | Training-time RTC (Black 2025) | 학습 시점 prefix 조건화 기법 |

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| ω-0 (OMEGA-0) | 이 논문이 제안한 humanoid용 latent predictive WAM의 이름 |
| ω-HOME | 저자가 수집한 40.3시간 가정용 humanoid 멀티모달 데이터셋 |
| concurrent loco-manipulation | 이동과 조작을 단계로 나누지 않고 동시에 수행하는 과제 형태 |
| whole-body action latent | SONIC 컨트롤러가 받는 64차원 whole-body control latent. 손 명령 2차원을 더해 action은 66차원이다 |
| Joint Video-Action Latent Predictor | motion query와 video query를 함께 처리해 미래 인지 action 조건과 미래 visual latent를 내는 모듈 |
| prefix-guided dual-query attention | self-attention, prefix로의 cross-attention, motion에서 video로의 cross-attention 세 단계로 이뤄진 predictor 내부 attention 구성 |
| motion query / video query | 미래 action 스텝과 미래 visual latent 토큰에 각각 대응하는 학습 가능한 query |
| view token | 입력 이미지가 ego인지 exo인지 알리는 학습 가능한 토큰 |
| SONIC simulation replay | 공개 사람 동작을 SONIC으로 시뮬레이션에서 재생해 robot state와 action latent를 얻고 추적 실패 동작을 거르는 절차 |
| ω-0Ego / ω-0Omni | ego 입력만 쓰는 변형과, 이동 비중이 큰 과제에서 exo 입력을 쓰는 변형 |
| zero-yaw normalization | 첫 프레임 루트 yaw를 모든 프레임에서 빼서 시작 방향을 통일하는 전처리 |
| overlap blending | 인접 chunk의 겹치는 구간을 선형 가중치로 섞어 경계의 점프를 없애는 추론 기법 |

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 1 | ω-0와 ω-HOME 전체 구성. (1) 텍스트 토큰, ego/exo 토큰, view 토큰, robot state를 받아 whole-body action latent를 내는 ω-0와 선택적으로 생성한 미래 영상 예시, (2) 8개 capability 묶음과 멀티모달 기록으로 이뤄진 ω-HOME dataset, (3) 탁자 닦기, 바닥 걸레질, 사과 집기, 침대 청소, 세탁 등 실제 시연, (4) 사람 시연 전이와 과제 간 일반화 | manual | ★ wiki 권장 (overview) |
| fig02 | 5 | ω-0 구조와 3단계 학습. (1) Stage 1은 Qwen3-VL을 FAST 토큰으로 학습해 whole-body VLM을 만든다. (2) Stage 2와 3은 VLM feature, V-JEPA feature, 텍스트, state를 받는 joint video-action latent predictor와 0.45B action DiT가 SONIC용 whole-body latent를 denoising한다. (3) predictor 내부의 prefix-guided dual-query attention과 2D, 3D, 1D RoPE 배치 | caption-region | ★ wiki 권장 (architecture) |
| fig03 | 9 | ω-HOME 통계와 대표 멀티모달 시연. (a) 총 40.3시간, 24개 과제, 4,827개 episode의 capability 분포, (b) 과제별 수집 시간으로 음료를 냉장고 아래 칸에 넣기 3.8시간부터 바닥 걸레질 0.4시간까지, 아래는 ego RGB, exo RGB, exo depth 예시 | caption-region | ★ wiki 권장 (dataset) |
| fig04 | 9 | teleoperation 장비 구성. 조작자는 Pico 4 Ultra 헤드셋, 두 손의 컨트롤러, 발목의 Pico tracker를 착용하고, 로봇 쪽은 머리의 ZED Mini 카메라와 Inspire DexHand로 신호를 받는다 | manual | ★ wiki 권장 (teleoperation) |
| fig05 | 13 | ω-0Ego, ω-0Omni, ψ-0, GR00T의 과제별 막대 그래프. (a) score, (b) success rate, (c) task progress. 원문 캡션은 Figure 6과 같은 문장이 잘못 반복돼 있다 | caption-region | (확인 필요) 캡션 오류 |
| fig06 | 15 | 실제 가정 과제 10개의 rollout 장면. 칸 지정 사과 배치, 침대 쓰레기 쓸어 담기, 냉장고에서 과일 꺼내기, 걸레질, 세탁기에서 옷 꺼내기, 손에 든 쓰레기통에 쓰레기 줍기, 서랍에 사과 넣고 닫기, 옷을 바구니에 넣기, 수건을 세탁기에 넣기, 탁자 닦기이며 주황 표식이 subtask 진행 지점이다 | caption-region | ★ wiki 권장 (rollout) |
| fig07 | 15 | 일반화와 사람 데이터 전이. 새 물체(cross object), 새 방(cross scene)에서의 실행과, 사람 시연으로 fine-tuning한 뒤 로봇에 배치한 실행 장면 | caption-region | ★ wiki 권장 (generalization) |
| fig08 | 16 | 실제 long-horizon 과제 두 가지. 선반까지 걸어가 음료를 집어 사람에게 건네는 과제와, 오른손에 든 쓰레기통에 쓰레기를 주워 담는 과제 | caption-region | 보조 rollout |
| fig09 | 27 | 7개 모델의 과제별 success rate 비교 (ω-0Ego, ω-0Omni, ψ-0, GR00T N1.7, Fast-WAM, DiT4DiT, π-0.5) | caption-region | 부록 세부 |
| fig10 | 27 | 7개 모델의 과제별 task progress 비교 | caption-region | 부록 세부 |
| fig11 | 27 | 7개 모델의 과제별 평균 score 비교 | caption-region | 부록 세부 |
| fig12 | 28 | 부록 과제 카드 arrange_fruit_in_the_closet. 옷장의 지정 칸에 사과를 놓는 공간 배치 능력을 평가하며 장면, 대상 물체, 대표 실행 순서를 보여준다 | caption-region | 부록 과제 카드 |
| fig13 | 29 | 부록 과제 카드 clean_bed. 도구로 침대 위 종이 뭉치를 쓸어 담고 몸을 돌려 버리는 동작 능력을 평가하며 장면, 대상 물체, 대표 실행 순서를 보여준다 | caption-region | 부록 과제 카드 |
| fig14 | 29 | 부록 과제 카드 mop_floor. 걸레를 든 채 이동하며 바닥 얼룩을 지우는 접촉 동작 능력을 평가하며 장면, 대상 물체, 대표 실행 순서를 보여준다 | caption-region | 부록 과제 카드 |
| fig15 | 30 | 부록 과제 카드 wipe_table. 탁자 표면을 계속 닦는 접촉 동작 능력을 평가하며 장면, 대상 물체, 대표 실행 순서를 보여준다 | caption-region | 부록 과제 카드 |
| fig16 | 30 | 부록 과제 카드 pick_and_place_apple. 사과를 집어 옮겨 놓는 동작 능력을 평가하며 장면, 대상 물체, 대표 실행 순서를 보여준다 | caption-region | 부록 과제 카드 |
| fig17 | 31 | 부록 과제 카드 pick_clothes_from_washing_machine. 세탁기 문 열기와 옷 꺼내기를 포함한 articulated object 조작 능력을 평가하며 장면, 대상 물체, 대표 실행 순서를 보여준다 | caption-region | 부록 과제 카드 |
| fig18 | 31 | 부록 과제 카드 pick_garbage. 여러 물체를 차례로 모으는 long-horizon 수집과 양손 협응 능력을 평가하며 장면, 대상 물체, 대표 실행 순서를 보여준다 | caption-region | 부록 과제 카드 |
| fig19 | 32 | 부록 과제 카드 put_apple_and_close_drawer. 탁자 위 조작과 서랍 닫기 능력을 평가하며 장면, 대상 물체, 대표 실행 순서를 보여준다 | caption-region | 부록 과제 카드 |
| fig20 | 32 | 부록 과제 카드 put_clothes_into_bucket. 변형 물체 취급과 바구니 배치 능력을 평가하며 장면, 대상 물체, 대표 실행 순서를 보여준다 | caption-region | 부록 과제 카드 |
| fig21 | 33 | 부록 과제 카드 put_towel_into_washing_machine. 수건 취급과 세탁기 투입 능력을 평가하며 장면, 대상 물체, 대표 실행 순서를 보여준다 | caption-region | 부록 과제 카드 |
| fig22 | 33 | 부록 과제 카드 retrieve_from_the_upper_fridge. 냉장고 조작을 포함한 long-horizon 물체 회수 능력을 평가하며 장면, 대상 물체, 대표 실행 순서를 보여준다 | caption-region | 부록 과제 카드 |
| fig23 | 35 | 부록 과제 카드 brush_toilet. 도구를 쓰는 변기 청소 능력을 평가하며 장면, 대상 물체, 대표 실행 순서를 보여준다 | caption-region | 부록 과제 카드 |
| fig24 | 35 | 부록 과제 카드 classify_gadgets. 의미 기준의 물체 분류 능력을 평가하며 장면, 대상 물체, 대표 실행 순서를 보여준다 | caption-region | 부록 과제 카드 |
| fig25 | 35 | 부록 과제 카드 collect_books. 책을 모아 탁자 위를 정리하는 동작 능력을 평가하며 장면, 대상 물체, 대표 실행 순서를 보여준다 | caption-region | 부록 과제 카드 |
| fig26 | 36 | 부록 과제 카드 collect_fruits_from_the_closet. 칸이 나뉜 수납장에서 과일 꺼내기 능력을 평가하며 장면, 대상 물체, 대표 실행 순서를 보여준다 | caption-region | 부록 과제 카드 |
| fig27 | 36 | 부록 과제 카드 collect_toys_from_the_bed. 부드러운 침대 표면에서 장난감 모으기 능력을 평가하며 장면, 대상 물체, 대표 실행 순서를 보여준다 | caption-region | 부록 과제 카드 |
| fig28 | 36 | 부록 과제 카드 fruit_bucket_arrangement. 과일 배치와 용기 정리 능력을 평가하며 장면, 대상 물체, 대표 실행 순서를 보여준다 | caption-region | 부록 과제 카드 |
| fig29 | 37 | 부록 과제 카드 grab_fruit_bucket. 몸 전체로 뻗어 과일 통을 잡는 동작 능력을 평가하며 장면, 대상 물체, 대표 실행 순서를 보여준다 | caption-region | 부록 과제 카드 |
| fig30 | 37 | 부록 과제 카드 hang_clothes. 옷을 다뤄 거는 동작 능력을 평가하며 장면, 대상 물체, 대표 실행 순서를 보여준다 | caption-region | 부록 과제 카드 |
| fig31 | 37 | 부록 과제 카드 move_table_with_human. 사람과 함께 탁자를 옮기는 협업 능력을 평가하며 장면, 대상 물체, 대표 실행 순서를 보여준다 | caption-region | 부록 과제 카드 |
| fig32 | 38 | 부록 과제 카드 push_chair. 몸 전체로 의자를 미는 가구 상호작용 능력을 평가하며 장면, 대상 물체, 대표 실행 순서를 보여준다 | caption-region | 부록 과제 카드 |
| fig33 | 38 | 부록 과제 카드 put_the_beverage_in_the_lower_fridge. 냉장고 아래 칸에 음료 넣기 능력을 평가하며 장면, 대상 물체, 대표 실행 순서를 보여준다 | caption-region | 부록 과제 카드 |
| fig34 | 39 | 부록 과제 카드 put_the_bottle_in_the_upper_fridge. 냉장고 위 칸에 병 넣기 능력을 평가하며 장면, 대상 물체, 대표 실행 순서를 보여준다 | caption-region | 부록 과제 카드 |
| fig35 | 39 | 부록 과제 카드 wipe_basin. 세면대 표면 닦기 능력을 평가하며 장면, 대상 물체, 대표 실행 순서를 보여준다 | caption-region | 부록 과제 카드 |
| tab01 | 12 | 실제 가정 loco-manipulation 과제 11개 목록. 과제, 장면, 하체 개입 여부를 적었고 1번 사과 집기만 하체 개입이 없다 | table-region | 표로 옮겨 본문에 서술 |
| tab02 | 13 | 11개 과제 종합 평가. ACT 8.2%, Diffusion Policy 15.5%, π-0.5 27.3%, InternVLA-M1 31.8%, EgoVLA 25.5%, GR00T-N1.7 22.7%, ψ-0 44.5%, Fast-WAM 37.1%, DiT4DiT 43.6%에 비해 ω-0Ego 79.1%, ω-0Omni 81.8%의 success rate를 기록한다. score 최대치는 41점이다 | table-region | ★ wiki 권장 (main result) |
| tab03 | 13 | ω-HOME을 추가 pre-training 데이터로 쓴 효과. Ego는 79.1%에서 80.4%로, Omni는 81.8%에서 82.4%로 success rate가 오른다 | table-region | 수치를 본문 표로 옮김 |
| tab04 | 14 | ω-0 ablation. robot state 제거 60.9%, VLM prefix 제거 66.4%, video query 제거 64.5%, RTC 제거 71.8%, Wan을 현재 이미지 인코더로 쓴 경우 63.6%이며 전체 모델은 Ego 79.1%, Omni 81.8%다 | table-region | ★ wiki 권장 (ablation) |
| tab05 | 18 | 미래 video latent 예측이 일반화에 주는 효과. video query가 없으면 cross-object 66.7%, cross-scene 15.0%, 사람 데이터 전이 20.0%이고, 있으면 각각 83.3%, 79.5%, 60.0%다 | table-region | ★ wiki 권장 (generalization) |
| tab06 | 24 | ω-0Ego의 put_apple_and_close_drawer 과제 시행별 진행 단계 기록. 10회 시행마다 각 단계의 달성 여부를 1과 0으로 적었다 | table-region | 부록 시행별 기록 |
| tab07 | 24 | ω-0Ego의 wipe_table 과제 시행별 진행 단계 기록. 10회 시행마다 각 단계의 달성 여부를 1과 0으로 적었다 | table-region | 부록 시행별 기록 |
| tab08 | 24 | ω-0Ego의 pick_garbage 과제 시행별 진행 단계 기록. 10회 시행마다 각 단계의 달성 여부를 1과 0으로 적었다 | table-region | 부록 시행별 기록 |
| tab09 | 24 | ω-0Ego의 clean_bed 과제 시행별 진행 단계 기록. 10회 시행마다 각 단계의 달성 여부를 1과 0으로 적었다 | table-region | 부록 시행별 기록 |
| tab10 | 24 | ω-0Ego의 mop_floor 과제 시행별 진행 단계 기록. 10회 시행마다 각 단계의 달성 여부를 1과 0으로 적었다 | table-region | 부록 시행별 기록 |
| tab11 | 25 | ω-0Ego의 pick_and_place 과제 시행별 진행 단계 기록. 10회 시행마다 각 단계의 달성 여부를 1과 0으로 적었다 | table-region | 부록 시행별 기록 |
| tab12 | 25 | ω-0Ego의 put_clothes_into_bucket 과제 시행별 진행 단계 기록. 10회 시행마다 각 단계의 달성 여부를 1과 0으로 적었다 | table-region | 부록 시행별 기록 |
| tab13 | 25 | ω-0Ego의 washing_machine 과제 시행별 진행 단계 기록. 10회 시행마다 각 단계의 달성 여부를 1과 0으로 적었다 | table-region | 부록 시행별 기록 |
| tab14 | 25 | ω-0Ego의 arrange_fruit_in_the_closet 과제 시행별 진행 단계 기록. 10회 시행마다 각 단계의 달성 여부를 1과 0으로 적었다 | table-region | 부록 시행별 기록 |
| tab15 | 25 | ω-0Ego의 pick_clothes_from_washing_machine 과제 시행별 진행 단계 기록. 10회 시행마다 각 단계의 달성 여부를 1과 0으로 적었다 | table-region | 부록 시행별 기록 |
| tab16 | 25 | ω-0Ego의 retrieve_from_fridge 과제 시행별 진행 단계 기록. 10회 시행마다 각 단계의 달성 여부를 1과 0으로 적었다 | table-region | 부록 시행별 기록 |
