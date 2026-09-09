---
title: "MobileVLA-R1 2.0: RL-Enhanced Reasoning for Mobile Robot Control"
type: paper
year: 2026
category: physical-ai
raw_path: raw/papers/huang-2026-mobilevla-r1-2-0-rl-enhanced-reasoning-for.pdf
raw_filename: "huang-2026-mobilevla-r1-2-0-rl-enhanced-reasoning-for.pdf"
source_collection: external
authors: "Ting Huang, Yue Huang, Zeyu Zhang (공동 제1저자, Zeyu Zhang이 project lead), Shuicheng Yan, Hao Tang (교신저자); Peking University, South China University of Technology, National University of Singapore"
arxiv_id: "2609.06251"
url: "https://aigeeksgroup.github.io/MobileVLA-R1-2.0"
tags: [physical-ai, vla, rl-control, mobile-robot]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/huang-2026-mobilevla-r1-2-0-rl-enhanced-reasoning-for/fig01.png
    raw: raw/papers/huang-2026-mobilevla-r1-2-0-rl-enhanced-reasoning-for-figures/fig01.png
    caption: "multi-granularity CoT 데이터 엔진. 왼쪽의 nav-data, step-data, episode-data 세 입력에 프롬프트 템플릿을 붙여 Gemini-2.5-Flash에 넣고, 오른쪽에서 Nav-CoT, Step-CoT, Episode-CoT 세 종류의 reasoning trace와 실행 가능한 출력을 받는다. 가운데 아래는 반자동 검증 단계다"
    page: 2
    bbox_norm: [0.0686, 0.0476, 0.9314, 0.2928]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/huang-2026-mobilevla-r1-2-0-rl-enhanced-reasoning-for/fig02.png
    raw: raw/papers/huang-2026-mobilevla-r1-2-0-rl-enhanced-reasoning-for-figures/fig02.png
    caption: "MobileVLA-R1 2.0 전체 구조. 3D scene, image, depth가 각각 얼린 인코더와 projection layer를 거쳐 LoRA로 학습되는 backbone에 들어가고, 텍스트 인코더가 지시문을 처리한다. reasoning-conditioned action decoder가 locomotion 명령 (Vx, Vy, ω)와 상호작용 primitive α를 내면 Go2와 G1의 컨트롤러가 실행한다"
    page: 5
    bbox_norm: [0.0686, 0.0476, 0.9314, 0.3229]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/huang-2026-mobilevla-r1-2-0-rl-enhanced-reasoning-for/fig03.png
    raw: raw/papers/huang-2026-mobilevla-r1-2-0-rl-enhanced-reasoning-for-figures/fig03.png
    caption: "GRPO 기반 reasoning-to-action 최적화. 왼쪽 입력에 대해 policy model이 N개의 출력을 뽑고, 오른쪽 movement, behavior, format 세 reward가 각 출력을 채점한다. 채점 결과를 group-relative advantage로 정규화하고 얼린 reference policy와의 KL divergence로 이탈을 억제한다"
    page: 7
    bbox_norm: [0.0686, 0.0476, 0.9314, 0.4343]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/huang-2026-mobilevla-r1-2-0-rl-enhanced-reasoning-for/fig04.png
    raw: raw/papers/huang-2026-mobilevla-r1-2-0-rl-enhanced-reasoning-for-figures/fig04.png
    caption: "R2R-CE val-unseen 정성 결과 네 편. 각 과제마다 ego-view, depth, BEV map을 시간 순서로 늘어놓아 지시문을 따라가는 실행 과정을 보여준다"
    page: 9
    bbox_norm: [0.1529, 0.0476, 0.8471, 0.6475]
    strategy: caption-region
    curated: false
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/huang-2026-mobilevla-r1-2-0-rl-enhanced-reasoning-for/fig05.png
    raw: raw/papers/huang-2026-mobilevla-r1-2-0-rl-enhanced-reasoning-for-figures/fig05.png
    caption: "RxR-CE val-unseen 정성 결과 세 편. R2R-CE보다 훨씬 긴 지시문 아래에서도 실행이 이어지는지를 같은 형식으로 보여준다"
    page: 10
    bbox_norm: [0.1529, 0.0476, 0.8471, 0.6335]
    strategy: caption-region
    curated: false
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/huang-2026-mobilevla-r1-2-0-rl-enhanced-reasoning-for/fig06.png
    raw: raw/papers/huang-2026-mobilevla-r1-2-0-rl-enhanced-reasoning-for-figures/fig06.png
    caption: "Unitree Go2 하드웨어와 배치 구조. (a) Intel RealSense D435i, L2 LiDAR, Jetson Orin Nano를 얹은 Go2 플랫폼. (b) 센싱과 전처리와 저수준 제어는 로봇 위에서, 8B backbone과 action decoder는 원격 H20 GPU에서 실행하는 하이브리드 구성이다"
    page: 11
    bbox_norm: [0.0686, 0.0476, 0.5138, 0.2139]
    strategy: caption-region
    curated: false
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/huang-2026-mobilevla-r1-2-0-rl-enhanced-reasoning-for/fig07.png
    raw: raw/papers/huang-2026-mobilevla-r1-2-0-rl-enhanced-reasoning-for-figures/fig07.png
    caption: "Unitree G1 하드웨어와 배치 구조. (a) Intel RealSense RGB-D 카메라, Inspire 손, Jetson Orin NX를 얹은 G1 humanoid 플랫폼. (b) Go2와 같은 하이브리드 구성이며 아래쪽에 locomotion 컨트롤러와 manipulation 컨트롤러가 함께 붙는 점이 다르다"
    page: 11
    bbox_norm: [0.0686, 0.342, 0.5138, 0.5084]
    strategy: caption-region
    curated: true
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/huang-2026-mobilevla-r1-2-0-rl-enhanced-reasoning-for/fig08.png
    raw: raw/papers/huang-2026-mobilevla-r1-2-0-rl-enhanced-reasoning-for-figures/fig08.png
    caption: "Go2 실내 정성 결과 세 편. ego-view, depth, point cloud, exo-view를 시간 순으로 배열해 목표를 찾아가는 이동과 회전과 장애물 회피를 보여준다"
    page: 12
    bbox_norm: [0.1529, 0.0476, 0.8471, 0.5431]
    strategy: caption-region
    curated: false
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/huang-2026-mobilevla-r1-2-0-rl-enhanced-reasoning-for/fig09.png
    raw: raw/papers/huang-2026-mobilevla-r1-2-0-rl-enhanced-reasoning-for-figures/fig09.png
    caption: "Go2 실외 정성 결과 세 편. 자전거 탐색, 계단 오르내리기, 숲 방향 이동처럼 실내보다 지형과 조명 변화가 큰 상황을 담았다"
    page: 13
    bbox_norm: [0.1529, 0.0476, 0.8471, 0.5431]
    strategy: caption-region
    curated: false
  - id: fig10
    label: Figure 10
    kind: figure
    file: assets/huang-2026-mobilevla-r1-2-0-rl-enhanced-reasoning-for/fig10.png
    raw: raw/papers/huang-2026-mobilevla-r1-2-0-rl-enhanced-reasoning-for-figures/fig10.png
    caption: "Unitree G1 실제 mobile manipulation 결과. Cluttered, Shelf/Cabinet, Tabletop 세 상황을 Search, Navigate, Align, Reach, Grasp, Lift, Transport, Place 단계 라벨과 함께 배열했다"
    page: 14
    bbox_norm: [0.1529, 0.0476, 0.8471, 0.4388]
    strategy: caption-region
    curated: false
  - id: tab01
    label: Table 1
    kind: table
    file: assets/huang-2026-mobilevla-r1-2-0-rl-enhanced-reasoning-for/tab01.png
    raw: raw/papers/huang-2026-mobilevla-r1-2-0-rl-enhanced-reasoning-for-figures/tab01.png
    caption: "원천 데이터셋과 합성한 MobileVLA-CoT의 규모 비교. R2R, RxR, QUARD에는 CoT 라벨이 없고 MobileVLA-CoT 세 하위 집합만 CoT를 갖는다"
    page: 4
    bbox_norm: [0.0686, 0.1311, 0.4962, 0.2467]
    strategy: table-region
    curated: false
  - id: tab02
    label: Table 2
    kind: table
    file: assets/huang-2026-mobilevla-r1-2-0-rl-enhanced-reasoning-for/tab02.png
    raw: raw/papers/huang-2026-mobilevla-r1-2-0-rl-enhanced-reasoning-for-figures/tab02.png
    caption: "VLN-CE val-unseen 종합 비교표. 25개 선행 방법을 관측 구성(단일 시점 RGB, 파노라마, depth, odometry)별로 묶고 R2R-CE와 RxR-CE 지표를 나란히 실었다. MobileVLA-R1 2.0이 모든 지표에서 가장 높다"
    page: 8
    bbox_norm: [0.1124, 0.0874, 0.8835, 0.4449]
    strategy: table-region
    curated: true
  - id: tab03
    label: Table 3
    kind: table
    file: assets/huang-2026-mobilevla-r1-2-0-rl-enhanced-reasoning-for/tab03.png
    raw: raw/papers/huang-2026-mobilevla-r1-2-0-rl-enhanced-reasoning-for-figures/tab03.png
    caption: "QUARD 6개 과제 성공률. 난이도 Easy, Medium, Hard로 묶었고 과제당 25 episode를 평가했다. 어려운 과제일수록 MobileVLA-R1 대비 개선 폭이 크다"
    page: 9
    bbox_norm: [0.5023, 0.6981, 0.9291, 0.783]
    strategy: table-region
    curated: false
  - id: tab04
    label: Table 4
    kind: table
    file: assets/huang-2026-mobilevla-r1-2-0-rl-enhanced-reasoning-for/tab04.png
    raw: raw/papers/huang-2026-mobilevla-r1-2-0-rl-enhanced-reasoning-for-figures/tab04.png
    caption: "Unitree Go2 실제 closed-loop 평가. Workspace, Corridor, Outdoor 세 환경을 Simple과 Complex 지시문으로 나눠 재고, Outdoor는 전역 localization을 신뢰할 수 없어 성공률만 싣는다"
    page: 11
    bbox_norm: [0.5022, 0.1164, 0.9292, 0.1979]
    strategy: table-region
    curated: false
  - id: tab05
    label: Table 5
    kind: table
    file: assets/huang-2026-mobilevla-r1-2-0-rl-enhanced-reasoning-for/tab05.png
    raw: raw/papers/huang-2026-mobilevla-r1-2-0-rl-enhanced-reasoning-for-figures/tab05.png
    caption: "Go2 배치 통계와 실패 분석. 여섯 설정별 과제 수, 시행 수, episode 수, 종단 지연 시간과 실패 유형별 건수를 담았다. 160 episode에서 실패 10건이다"
    page: 12
    bbox_norm: [0.0715, 0.6847, 0.5, 0.7829]
    strategy: table-region
    curated: false
  - id: tab06
    label: Table 6
    kind: table
    file: assets/huang-2026-mobilevla-r1-2-0-rl-enhanced-reasoning-for/tab06.png
    raw: raw/papers/huang-2026-mobilevla-r1-2-0-rl-enhanced-reasoning-for-figures/tab06.png
    caption: "Unitree G1 실제 mobile manipulation 성공률. Tabletop, Shelf/Cabinet, Cluttered 세 상황에서 navigation, manipulation, 전체 과제 성공률을 재고 마지막 열에 전체 평균을 둔다. G1 전용 fine-tuning 없이 얻은 결과다"
    page: 13
    bbox_norm: [0.0642, 0.6774, 0.5018, 0.7496]
    strategy: manual
    curated: true
  - id: tab07
    label: Table 7
    kind: table
    file: assets/huang-2026-mobilevla-r1-2-0-rl-enhanced-reasoning-for/tab07.png
    raw: raw/papers/huang-2026-mobilevla-r1-2-0-rl-enhanced-reasoning-for-figures/tab07.png
    caption: "G1 평가 규모와 실패 통계. 세 상황 각각 과제 4개와 과제당 시행 10회로 120 episode를 채웠고, 실패를 target grounding, navigation, grasping, manipulation 실행, 저수준 제어 다섯 유형으로 나눈다"
    page: 14
    bbox_norm: [0.0662, 0.5734, 0.5028, 0.6396]
    strategy: manual
    curated: false
  - id: tab08
    label: Table 8
    kind: table
    file: assets/huang-2026-mobilevla-r1-2-0-rl-enhanced-reasoning-for/tab08.png
    raw: raw/papers/huang-2026-mobilevla-r1-2-0-rl-enhanced-reasoning-for-figures/tab08.png
    caption: "action 인터페이스와 조건 입력의 ablation. 결정론적 텍스트 파싱을 기준선으로 두고 학습형 decoder에 observation만, reasoning 표현만, 둘 다 넣은 세 조건을 비교한다"
    page: 14
    bbox_norm: [0.4942, 0.5324, 0.9348, 0.6446]
    strategy: manual
    curated: true
  - id: tab09
    label: Table 9
    kind: table
    file: assets/huang-2026-mobilevla-r1-2-0-rl-enhanced-reasoning-for/tab09.png
    raw: raw/papers/huang-2026-mobilevla-r1-2-0-rl-enhanced-reasoning-for-figures/tab09.png
    caption: "action decoder와 GRPO의 개별 기여와 결합 효과. 둘 다 없는 지도학습 기준선부터 둘 다 쓰는 완전 구성까지 네 조합을 R2R-CE와 RxR-CE에서 비교한다"
    page: 14
    bbox_norm: [0.5262, 0.7364, 0.9018, 0.8546]
    strategy: manual
    curated: false
  - id: tab10
    label: Table 10
    kind: table
    file: assets/huang-2026-mobilevla-r1-2-0-rl-enhanced-reasoning-for/tab10.png
    raw: raw/papers/huang-2026-mobilevla-r1-2-0-rl-enhanced-reasoning-for-figures/tab10.png
    caption: "reasoning 감독 층위의 ablation. No-CoT와 episode, step, navigation 단일 층위와 세 층위 결합을 R2R-CE val-unseen에서 비교한다"
    page: 15
    bbox_norm: [0.1127, 0.1289, 0.8835, 0.2612]
    strategy: table-region
    curated: false
  - id: tab11
    label: Table 11
    kind: table
    file: assets/huang-2026-mobilevla-r1-2-0-rl-enhanced-reasoning-for/tab11.png
    raw: raw/papers/huang-2026-mobilevla-r1-2-0-rl-enhanced-reasoning-for-figures/tab11.png
    caption: "GRPO reward 구성 요소의 ablation. movement, behavior, format 세 항을 켜고 끄는 여덟 조합을 비교하며 결정론적 파싱 조건에서 측정했다"
    page: 15
    bbox_norm: [0.1329, 0.541, 0.8161, 0.7181]
    strategy: table-region
    curated: false
  - id: tab12
    label: Table 12
    kind: table
    file: assets/huang-2026-mobilevla-r1-2-0-rl-enhanced-reasoning-for/tab12.png
    raw: raw/papers/huang-2026-mobilevla-r1-2-0-rl-enhanced-reasoning-for-figures/tab12.png
    caption: "action decoder 구조의 ablation. mean pooling에 MLP를 붙인 구성부터 제안 구조인 dual-query dual-head까지 네 가지를 같은 표현과 학습 조건에서 비교한다"
    page: 15
    bbox_norm: [0.5437, 0.102, 0.8835, 0.2103]
    strategy: table-region
    curated: false
  - id: tab13
    label: Table 13
    kind: table
    file: assets/huang-2026-mobilevla-r1-2-0-rl-enhanced-reasoning-for/tab13.png
    raw: raw/papers/huang-2026-mobilevla-r1-2-0-rl-enhanced-reasoning-for-figures/tab13.png
    caption: "멀티모달 입력의 누적 ablation. 텍스트와 RGB에 depth를 더하고 다시 point cloud를 더하는 순서로 기여를 재며 마지막 행은 완전 구성이다"
    page: 19
    bbox_norm: [0.1014, 0.3527, 0.4631, 0.4478]
    strategy: table-region
    curated: false
  - id: tab14
    label: Table 14
    kind: table
    file: assets/huang-2026-mobilevla-r1-2-0-rl-enhanced-reasoning-for/tab14.png
    raw: raw/papers/huang-2026-mobilevla-r1-2-0-rl-enhanced-reasoning-for-figures/tab14.png
    caption: "movement reward 가중치 민감도. 가중치를 0에서 1.0까지 올리며 성능과 함께 세 reward가 advantage에 기여하는 비율을 함께 싣는다"
    page: 19
    bbox_norm: [0.1121, 0.7548, 0.4524, 0.8913]
    strategy: table-region
    curated: false
  - id: tab15
    label: Table 15
    kind: table
    file: assets/huang-2026-mobilevla-r1-2-0-rl-enhanced-reasoning-for/tab15.png
    raw: raw/papers/huang-2026-mobilevla-r1-2-0-rl-enhanced-reasoning-for-figures/tab15.png
    caption: "rationale 생성원의 ablation. 템플릿 방식과 LLaMA-3-8B 생성과 Gemini 생성을 같은 action 정답 아래에서 비교한다"
    page: 19
    bbox_norm: [0.5845, 0.2201, 0.8428, 0.3136]
    strategy: table-region
    curated: false
  - id: tab16
    label: Table 16
    kind: table
    file: assets/huang-2026-mobilevla-r1-2-0-rl-enhanced-reasoning-for/tab16.png
    raw: raw/papers/huang-2026-mobilevla-r1-2-0-rl-enhanced-reasoning-for-figures/tab16.png
    caption: "PPO와 GRPO 비교. reward 정의와 출력 형식과 KL 정규화와 학습 예산을 맞춘 조건에서 두 방법만 바꿔 측정했다"
    page: 19
    bbox_norm: [0.5741, 0.489, 0.8532, 0.5553]
    strategy: table-region
    curated: false
  - id: tab17
    label: Table 17
    kind: table
    file: assets/huang-2026-mobilevla-r1-2-0-rl-enhanced-reasoning-for/tab17.png
    raw: raw/papers/huang-2026-mobilevla-r1-2-0-rl-enhanced-reasoning-for-figures/tab17.png
    caption: "최적화 목표 함수 비교. SFT, Reward-SFT, PPO, GRPO를 샘플링 사용 여부와 reward 사용 여부와 함께 나란히 놓는다"
    page: 19
    bbox_norm: [0.5031, 0.6105, 0.9282, 0.684]
    strategy: table-region
    curated: false
  - id: tab18
    label: Table 18
    kind: table
    file: assets/huang-2026-mobilevla-r1-2-0-rl-enhanced-reasoning-for/tab18.png
    raw: raw/papers/huang-2026-mobilevla-r1-2-0-rl-enhanced-reasoning-for-figures/tab18.png
    caption: "MobileVLA-CoT 필터링 통계. 원시 생성 16만 8천 개에서 형식 검증, action 검증, 안전과 관련성 필터, 수동 검수를 차례로 거쳐 13만 4천 개가 남는 과정과 단계별 주된 제거 사유를 담았다"
    page: 20
    bbox_norm: [0.1127, 0.0728, 0.8872, 0.1919]
    strategy: table-region
    curated: false
---

## 한 줄 요약 (One-line Summary)

MobileVLA-R1 2.0은 VLA policy가 만든 chain-of-thought 내부 표현을 학습형 action decoder로 곧장 task-level 명령 (Vx, Vy, ω, α)로 바꾸고, 그 명령의 품질을 reward로 삼아 GRPO로 다시 학습시킨 이동 로봇 제어 프레임워크다. VLN-CE와 QUARD와 Unitree Go2에 더해 학습에 한 번도 쓰지 않은 Unitree G1 humanoid에서도 mobile manipulation을 수행한다.

## 1. 자료 정보 (Document Information)

- 제목: MobileVLA-R1 2.0: RL-Enhanced Reasoning for Mobile Robot Control
- 저자: Ting Huang, Yue Huang, Zeyu Zhang (공동 제1저자), Shuicheng Yan, Hao Tang (교신저자)
- 소속: Peking University, South China University of Technology, National University of Singapore
- 게재 상태: IEEE TPAMI 투고본 (arXiv 2609.06251v1, 2026-09-05)
- 코드: https://github.com/AIGeeksGroup/MobileVLA-R1-2.0
- 프로젝트 페이지: https://aigeeksgroup.github.io/MobileVLA-R1-2.0
- 분량: 본문 16페이지에 부록 4페이지, 그림 10개와 표 18개

이 논문은 저자들의 ECCV 2026 학회 논문 MobileVLA-R1의 확장판이다. 학회판 대비 확장 지점을 저자들이 여섯 가지로 명시한다.

1. 결정론적 텍스트 파싱을 학습형 reasoning-conditioned action decoder로 교체했다.
2. embodiment와 분리된 task-level action 인터페이스를 도입해 형상별 관절 명령 대신 (Vx, Vy, ω, α)를 예측하게 했다.
3. 실제 로봇 평가를 Go2 사족 보행에서 G1 humanoid의 mobile manipulation까지 넓혔다.
4. 결정론적 파싱과 학습형 디코딩의 통제 비교를 포함해 인터페이스 분석을 대폭 늘렸다.
5. 종단 지연 시간과 episode 단위 실패 진단을 실제 배치 분석에 추가했다.
6. reasoning 감독 층위, 멀티모달 입력, reward 구성과 가중치, rationale 생성원, 최적화 목표 함수의 통제 실험을 추가했다.

## 2. 주요 기여 (Key Contributions)

**첫째, reasoning-to-action 인터페이스를 명시한 RL 강화 VLA 프레임워크다.** 기존 VLA는 observation에서 action으로 바로 가는 예측에 무게가 실려 중간 추론이 암묵적으로 남았다. MobileVLA-R1 2.0은 System 2 성격의 숙고형 추론, System 1 성격의 반응형 action 생성, System 0 성격의 형상 의존 저수준 실행을 한 줄로 잇는 구도를 잡고, 그 접합부를 학습 대상으로 삼는다.

**둘째, reasoning-conditioned action decoder다.** 생성된 텍스트를 규칙으로 파싱하는 대신, backbone이 reasoning 토큰을 만들며 남긴 hidden state를 observation hidden state와 함께 받아 연속 locomotion 명령과 이산 behavior primitive를 동시에 예측한다. locomotion과 behavior 각각에 전용 query를 두고 cross-attention으로 필요한 정보만 모으는 dual-query dual-head 구조다.

**셋째, embodiment 분리다.** policy가 내는 것은 (Vx, Vy, ω, α)라는 task-level 명령이며, 이를 관절 수준 동작으로 옮기는 일은 로봇별 저수준 컨트롤러가 맡는다. 덕분에 Go2로 학습한 policy를 수정 없이 G1에 얹어 평가할 수 있다.

**넷째, MobileVLA-CoT 데이터셋이다.** episode, navigation, step 세 시간 층위의 reasoning 라벨을 13만 4천 개 담았다.

**다섯째, 광범위한 평가다.** VLN-CE(R2R-CE, RxR-CE), QUARD, Unitree Go2 실제 배치, Unitree G1 실제 mobile manipulation을 모두 다룬다. VLN-CE에서 SR 기준 평균 1.6점, 실제 G1 mobile manipulation 전체 과제 성공률에서 10.0%p를 MobileVLA-R1 대비 개선했다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 문제 정의

timestep t에서 agent는 RGB 이미지와 depth map과 point cloud로 이뤄진 멀티모달 observation과 자연어 지시문을 받는다. VLA policy는 `<think>` reasoning trace와 `<answer>` 실행 의도를 담은 구조화 출력을 생성한다.

task-level 물리 action은 다음 세 성분으로 표현된다.

- 평면 병진 속도 (Vx, Vy)
- yaw 각속도 ω
- 이산 task-level behavior primitive α (상호작용, 자세, 스킬 전환 명령)

α는 어떤 의미의 동작을 할지만 지정하고, 그 동작을 관절 궤도로 실현하는 일은 로봇별 컨트롤러가 맡는다. `<answer>` 텍스트 출력과 action decoder는 역할이 다르다. 전자는 기계가 파싱 가능한 언어 감독과 형식 인식 RL을 위해 남고, 후자가 실제 물리 실행을 담당한다.

### 3.2 멀티모달 backbone

NaVILA에서 초기화한 LLaVA 계열 구조이며 LLaMA3-8B를 backbone으로 쓴다. 모달리티별 인코더는 다음과 같이 배치한다.

| 구성 요소 | 모델 | 학습 여부 |
|---|---|---|
| depth 인코더 | DepthAnything V2 | 얼림 |
| point cloud 인코더 | Point Transformer V3 | 얼림 |
| 이미지 인코더 | NaVILA 계승 | 얼림 |
| projection layer | 모달리티별 선형 사영 | 학습 |
| VLA backbone | LLaMA3-8B | LoRA만 학습 |
| action decoder | dual-query dual-head | 학습 |

각 모달리티 토큰은 projection layer를 거쳐 공통 hidden 차원으로 옮겨지고, 언어 토큰과 이어 붙여진다. 모달리티 종류 임베딩을 더해 어느 입력에서 왔는지를 보존한다. backbone이 문맥화한 결과 중 observation 토큰에 해당하는 부분을 observation 문맥으로, 생성된 reasoning 토큰에 해당하는 부분을 추론 문맥으로 따로 붙들어 둔다. 이 두 덩어리가 action decoder의 입력이 된다.

### 3.3 reasoning-conditioned action decoder

observation 문맥과 추론 문맥을 하나의 시퀀스로 이어 key와 value로 쓰고, locomotion용 query와 behavior용 query 두 개를 학습 파라미터로 둔다. 각 query가 cross-attention으로 자기 분기에 필요한 정보를 골라 모은다.

- locomotion 분기: 경량 회귀 head가 병진 속도와 yaw 속도를 연속값으로 낸다.
- behavior 분기: softmax head가 미리 정의된 behavior 집합 위의 분포를 내고, 추론 시점에는 확률이 가장 높은 primitive를 고른다.

구현은 cross-attention 층 1개, attention head 8개, hidden 차원 4096이다. decoder는 지도학습 단계에서 backbone과 함께 학습되고 GRPO 단계에서는 얼린다.

G1에서 reaching, grasping, lifting, transporting, placing 같은 manipulation primitive는 컨트롤러 쪽에 고정된 루틴으로 구현돼 있다. 학습된 policy는 무엇을 할지만 정하고 어떻게 할지는 컨트롤러가 정한다.

### 3.4 MobileVLA-CoT 데이터셋

원천 데이터셋은 세 가지다. R2R은 Matterport3D 실내 환경의 지시문과 trajectory 쌍 5만 개, RxR은 다국어이고 의미가 더 풍부한 지시문 5만 8천 개, QUARD는 사족 보행 locomotion과 상호작용 trajectory 26만 2천 개를 준다. reasoning과 action 감독은 이 세 데이터셋의 공식 학습 split에서만 만들었고, G1 데이터는 데이터셋 구축과 학습 어디에도 쓰지 않았다.

reasoning 층위는 세 가지다.

| 하위 집합 | 층위 | 담는 내용 | 규모 |
|---|---|---|---|
| MobileVLA-CoT-Episode | episode | episode 전체의 결과 요약, 두드러진 observation, 상위 실행 전략 | 1만 8천 개 |
| MobileVLA-CoT-Step | step | 현재 observation과 상태 이력 아래에서 지금 낼 action의 근거 | 7만 8천 개 |
| MobileVLA-CoT-Nav | navigation | 전역 지시문과 순차 이동 행위를 잇는 long-horizon 공간 결정 | 3만 8천 개 |

각 샘플은 멀티모달 observation, 자연어 지시문, 선택적 상태와 action 이력, `<think>` 안의 reasoning trace, `<answer>` 안의 실행 대상으로 이뤄진다. navigation 샘플의 실행 대상은 이산 이동 action이고, 제어 샘플의 실행 대상은 병진 속도와 각속도 같은 연속 제어 변수와 과제별 behavior다.

데이터 엔진은 Gemini-2.5-Flash로 구현했지만 프롬프팅과 파싱과 검증 절차 자체는 모델과 무관하다.

품질 관리는 4단계 반자동 절차다. 원시 생성 16만 8천 개에서 시작한다.

| 단계 | 입력 | 잔존 | 잔존율 | 주된 제거 사유 |
|---|---|---|---|---|
| 원시 생성 | 16만 8천 | 16만 8천 | 100.0% | 해당 없음 |
| 형식 검증 | 16만 8천 | 15만 8천 | 94.0% | 태그 손상, 필드 누락 |
| action 검증 | 15만 8천 | 14만 6천 | 92.4% | 잘못된 명령, 범위 밖 값 |
| 안전과 관련성 필터 | 14만 6천 | 13만 9천 | 95.2% | 위험하거나 지시문과 무관한 출력 |
| 수동 검수 | 13만 9천 | 13만 4천 | 96.4% | 환각, action 불일치, 시각적 모순 |

부록 B는 split 무결성을 따로 다룬다. Gemini에게는 과제 지시문과 observation과 상태 이력만 주고 validation이나 test trajectory의 정답은 주지 않아, 합성 라벨이 평가 집합 감독을 흘려 넣지 않게 막았다. 형식과 action 검사는 라벨 품질 관리에만 쓰이며 실제 실행에는 쓰이지 않는다.

### 3.5 지도 정렬 단계

학습은 두 단계다. 먼저 지도학습으로 구조화 추론을 세우고 그 표현을 task-level action 예측에 붙인다.

기본 손실은 `<think>`와 `<answer>`를 함께 감독하는 autoregressive 교차 엔트로피다. 여기에 두 손실이 더 붙는다.

- locomotion 손실: 병진 속도의 L1 오차에 yaw 오차를 가중치 0.5로 더한다.
- behavior 손실: 정답 primitive의 음의 로그 우도다.

모든 샘플이 두 감독을 다 갖지는 않으므로, 이진 지시자로 유효한 정답이 있을 때만 해당 손실을 켠다.

정렬 순서도 나눠져 있다. 먼저 Episode와 Nav 하위 집합으로 long-horizon 추론을 정렬하고, 이어서 Step 하위 집합으로 국소 추론과 실행 가능한 task-level action을 잇는다. action decoder는 두 번째 단계에서 함께 최적화된다.

### 3.6 GRPO 기반 reasoning-to-action 최적화

지도 정렬 뒤에는 offline GRPO를 적용한다. GRPO는 같은 입력에 대해 여러 후보 출력을 뽑아 그 안에서 상대적인 advantage를 구성하므로 별도의 value 모델을 학습하지 않아도 된다. 최적화는 고정된 데이터셋 위에서 이뤄지며 환경 상호작용이나 온라인 로봇 적응은 없다.

GRPO 동안 action decoder는 얼려 둔다. decoder는 reward 평가를 위한 고정된 reasoning-to-action 인터페이스 역할만 하고 gradient를 받지 않는다. 학습되는 것은 VLA policy 쪽이다.

reward는 세 항의 가중합이다.

| reward | 정의 | 가중치 |
|---|---|---|
| movement | 정규화한 명령 공간에서 예측 속도와 정답 속도의 코사인 유사도 | 1.0 |
| behavior | 예측 primitive와 정답 primitive의 정확 일치 여부 | 1.0 |
| format | 출력이 `<think>...</think><answer>...</answer>` 형식을 지켰는지 여부 | 0.2 |

group-relative advantage는 같은 그룹 안 N개 reward의 평균을 빼고 표준편차로 나눠 구한다. 목표 함수는 토큰 단위 policy 비율에 clipping을 건 GRPO 목적식이며, 얼린 reference policy와의 KL divergence에 계수 β를 곱해 뺀다.

### 3.7 학습 설정

| 항목 | 값 |
|---|---|
| LoRA rank | 16 |
| LoRA scaling | 32 |
| SFT epoch | 3 |
| SFT 하드웨어 | H20 96GB 4장 |
| SFT optimizer | AdamW, 학습률 2e-4, weight decay 0.01, warmup 비율 0.03, cosine 스케줄 |
| GRPO 샘플 수 N | 8 |
| GRPO step | 1천 |
| GRPO 하드웨어 | H20 96GB 1장 |
| GRPO optimizer | AdamW, 학습률 1e-6 |
| KL 계수 β | 0.04 |
| clipping 계수 | 0.2 |
| 갱신당 입력 인스턴스 | 5개 |

### 3.8 실제 배치 구조

로봇 위에서는 센싱, 매핑, 멀티모달 전처리, 저수준 제어를 수행하고, 8B backbone과 action decoder는 원격 H20 GPU에서 실행한다. Jetson Orin Nano의 메모리 한계 때문이다. 원격 policy가 (Vx, Vy, ω, α)를 돌려주면 로봇 쪽 고정 컨트롤러가 실행한다.

- Go2: Intel RealSense D435i RGB-D 카메라, L2 LiDAR, Jetson Orin Nano
- G1: Intel RealSense RGB-D 카메라, Inspire 손, Jetson Orin NX

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 VLN-CE

R2R-CE와 RxR-CE의 val-unseen split에서 측정했다. 지표는 navigation error(NE), oracle success rate(OS), success rate(SR), success-weighted path length(SPL), normalized dynamic time warping(nDTW)이다.

| 방법 | R2R-CE NE↓ | R2R-CE SR↑ | R2R-CE SPL↑ | RxR-CE NE↓ | RxR-CE SR↑ | RxR-CE SPL↑ | RxR-CE nDTW↑ |
|---|---|---|---|---|---|---|---|
| NaVILA | 5.22 | 54.0 | 49.0 | 6.77 | 49.3 | 44.0 | 58.8 |
| StreamVLN | 4.98 | 56.9 | 51.9 | 6.22 | 52.9 | 46.0 | 61.9 |
| CorrectNav | 4.24 | 65.1 | 62.3 | 4.09 | 69.3 | 63.3 | 75.2 |
| MobileVLA-R1 | 4.05 | 68.3 | 65.2 | 3.92 | 71.5 | 66.8 | 76.1 |
| MobileVLA-R1 2.0 | 3.86 | 69.8 | 66.9 | 3.71 | 73.1 | 68.5 | 77.6 |

R2R-CE에서 MobileVLA-R1 대비 SR이 1.5점, SPL이 1.7점 올랐고 NE는 4.05에서 3.86으로 줄었다. 선행 최고인 CorrectNav 대비로는 SR 4.7점, SPL 4.6점 차이다. RxR-CE에서는 SR과 SPL과 nDTW가 각각 1.6점, 1.7점, 1.5점 올랐다.

이 표에서 눈여겨볼 구성 차이가 하나 있다. MobileVLA-R1 계열은 단일 시점 RGB와 depth만 쓰고 파노라마와 odometry를 쓰지 않는다. 파노라마와 odometry를 모두 쓰는 시뮬레이터에서 pre-training한 계열(HNR 등)보다 입력 조건이 불리한데도 더 높다.

### 4.2 QUARD

과제당 25 episode로 6개 과제의 성공률을 측정했다.

| 방법 | Distinguish | Go-to | Go-avoid | Go-through | Crawl | Unload | 평균 |
|---|---|---|---|---|---|---|---|
| CLIP | 0.44 | 0.43 | 0.45 | 0.19 | 0.00 | 0.00 | 0.25 |
| VC-1 | 0.46 | 0.43 | 0.45 | 0.31 | 0.00 | 0.00 | 0.28 |
| QUART | 0.66 | 0.60 | 0.53 | 0.41 | 0.32 | 0.12 | 0.44 |
| MoRE | 0.82 | 0.80 | 0.59 | 0.57 | 0.49 | 0.33 | 0.60 |
| MobileVLA-R1 | 0.92 | 0.89 | 0.71 | 0.65 | 0.58 | 0.44 | 0.70 |
| MobileVLA-R1 2.0 | 0.95 | 0.92 | 0.77 | 0.72 | 0.66 | 0.56 | 0.76 |

평균은 0.70에서 0.76으로 올랐고 외부 최고인 MoRE의 0.60과는 0.16 차이다. 개선 폭이 과제 난이도에 비례한다. 쉬운 Distinguish와 Go-to에서는 0.03에 그치지만 Go-avoid 0.06, Go-through 0.07, Crawl 0.08, Unload 0.12로 커진다. 저자들은 이를 복잡한 behavior 선택이 필요할수록 중간 추론 표현을 조건으로 주는 이득이 커진다는 근거로 읽는다.

### 4.3 Unitree Go2 실제 평가

Workspace, Corridor, Outdoor 세 환경에서 Simple과 Complex 두 지시문 설정으로 평가했다. Simple은 짧은 명령 한두 개이고, Complex는 3개에서 5개의 순차 subgoal에 회전과 장애물 대응이 섞인다. 환경마다 과제 5개에서 6개, 과제당 시행 5회로 총 160 episode다. 사람이 개입하지 않고 지시문을 끝까지 수행한 경우만 성공으로 셌다.

| 방법 | Workspace Complex SR | Corridor Complex SR | Workspace Complex NE | Corridor Complex NE | Outdoor Complex SR |
|---|---|---|---|---|---|
| GPT-4o | 0.33 | 0.00 | 2.38 | 3.00 | 0.50 |
| NaVILA | 0.80 | 0.67 | 1.76 | 1.76 | 0.83 |
| MobileVLA-R1 | 0.91 | 0.86 | 1.23 | 1.23 | 0.96 |
| MobileVLA-R1 2.0 | 0.94 | 0.91 | 1.12 | 1.11 | 0.98 |

Simple 설정에서는 이전 모델이 이미 포화에 가까워 차이가 작지만 Complex에서 벌어진다. Outdoor는 전역 localization을 신뢰할 수 없어 NE를 싣지 않았다.

배치 효율과 실패 분석은 별도 표로 다룬다. observation 취득에서 task-level 명령 인계까지의 종단 지연 시간은 205ms에서 245ms 사이이며, 멀티모달 전처리, 직렬화, 네트워크 통신, 원격 추론, action 디코딩, 명령 전송, 제어 인계를 모두 포함한 값이다. 상위 결정 주기로 환산하면 약 4.1Hz에서 4.9Hz다. 로봇별 저수준 컨트롤러는 이와 무관하게 더 높은 control frequency로 동작한다.

160 episode 중 실패는 10건이며 유형별로 target grounding 3건, 인식과 장애물 대응 2건, 과도한 회전 2건, 좁은 통로 통과 2건, localization drift 1건이다. drift는 Outdoor-Complex에서만 나왔다.

### 4.4 Unitree G1 mobile manipulation

G1 전용 trajectory와 시연 데이터(demonstration)와 과제 라벨과 policy fine-tuning을 모두 쓰지 않고, 학습된 policy를 그대로 얹어 평가했다. 연속 성분 (Vx, Vy, ω)는 G1의 고정 locomotion 컨트롤러가 실행하고 α가 사전 정의된 manipulation primitive를 고른다.

세 상황의 성격은 다음과 같다.

- Tabletop: 목표 접근과 근거리 manipulation 중심
- Shelf/Cabinet: 여기에 더해 정확한 작업 위치 정렬이 필요
- Cluttered: 장애물 대응 이동과 목표 접근과 manipulation을 더 좁은 공간 제약 아래 결합

Manip.은 navigation에 성공한 episode에 한정해 계산하고, Full은 한 episode 안에서 navigation과 manipulation이 모두 사람 개입 없이 성공해야 인정한다.

| 방법 | Tabletop Full | Shelf/Cabinet Full | Cluttered Full | Full 평균 |
|---|---|---|---|---|
| NaVILA | 47.5 | 40.0 | 25.0 | 37.5 |
| MobileVLA-R1 | 57.5 | 47.5 | 35.0 | 46.7 |
| MobileVLA-R1 2.0 | 67.5 | 57.5 | 45.0 | 56.7 |

Full 평균이 46.7%에서 56.7%로 10.0%p 올랐다. 조건부 manipulation 성공률도 Tabletop 71.9%에서 79.4%, Shelf/Cabinet 65.5%에서 74.2%, Cluttered 53.8%에서 64.3%로 함께 올랐다.

평가 규모는 상황마다 과제 4개와 과제당 시행 10회로 총 120 episode이며 성공은 68건이다. 실패 52건의 분포는 grasping 16건, manipulation 실행 14건, navigation과 위치 정렬 10건, target grounding 8건, 저수준 제어 4건이다. Cluttered에서 grounding과 위치 정렬과 상호작용 실패가 다른 상황보다 많아, 기하학적 복잡도와 인식 복잡도가 오를수록 인식과 이동과 manipulation의 협조가 어려워진다는 점이 드러난다.

### 4.5 ablation

**action 인터페이스와 조건 입력.** 결정론적 파싱을 학습형 decoder로 바꾸는 것만으로도 성능이 오르고, 조건 입력에 중간 reasoning 표현을 넣으면 더 오른다. 둘을 함께 넣은 구성이 가장 좋다.

| action 인터페이스 | observation | reasoning | R2R-CE SR | R2R-CE SPL | RxR-CE SR | RxR-CE SPL |
|---|---|---|---|---|---|---|
| 결정론적 파싱 | 미사용 | 미사용 | 68.3 | 65.2 | 71.5 | 66.8 |
| 학습형 decoder | 사용 | 미사용 | 68.8 | 65.7 | 72.0 | 67.3 |
| 학습형 decoder | 미사용 | 사용 | 69.3 | 66.3 | 72.6 | 67.9 |
| 학습형 decoder | 사용 | 사용 | 69.8 | 66.9 | 73.1 | 68.5 |

**action decoder와 GRPO의 개별 기여.** 두 요소 모두 지도학습 기준선을 개선하며 GRPO 쪽 단독 기여가 더 크다.

| action decoder | GRPO | R2R-CE SR | R2R-CE SPL | RxR-CE SR | RxR-CE SPL |
|---|---|---|---|---|---|
| 미사용 | 미사용 | 58.0 | 53.2 | 61.4 | 56.7 |
| 사용 | 미사용 | 63.1 | 58.7 | 66.0 | 61.4 |
| 미사용 | 사용 | 68.3 | 65.2 | 71.5 | 66.8 |
| 사용 | 사용 | 69.8 | 66.9 | 73.1 | 68.5 |

**reasoning 감독 층위.** 단일 층위 세 가지 모두 No-CoT보다 낫고 navigation 층위가 단독으로는 가장 강하다. 세 층위를 합치면 SR이 64.0에서 68.3으로, SPL이 59.6에서 65.2로 오른다.

| 층위 | SR↑ | SPL↑ |
|---|---|---|
| No-CoT | 64.0 | 59.6 |
| episode | 65.5 | 61.3 |
| step | 66.0 | 61.7 |
| navigation | 66.7 | 62.6 |
| 세 층위 결합 | 68.3 | 65.2 |

**GRPO reward 구성.** 결정론적 파싱 조건에서 측정했다. 단독으로는 behavior reward가 가장 강하고, 셋을 모두 켠 구성이 가장 좋다.

| movement | behavior | format | SR↑ | SPL↑ |
|---|---|---|---|---|
| 미사용 | 미사용 | 미사용 | 58.0 | 53.2 |
| 사용 | 미사용 | 미사용 | 60.7 | 55.5 |
| 미사용 | 사용 | 미사용 | 61.9 | 56.8 |
| 미사용 | 미사용 | 사용 | 59.6 | 54.7 |
| 사용 | 사용 | 미사용 | 64.5 | 60.2 |
| 사용 | 미사용 | 사용 | 63.4 | 59.1 |
| 미사용 | 사용 | 사용 | 65.2 | 61.0 |
| 사용 | 사용 | 사용 | 68.3 | 65.2 |

**decoder 구조.** attention 기반 디코딩이 mean pooling보다 낫고, locomotion과 behavior 분기를 분리하면 더 낫다.

| decoder 구조 | SR↑ | SPL↑ |
|---|---|---|
| Mean Pooling + MLP | 68.7 | 65.6 |
| Single-Query Attention | 69.1 | 66.1 |
| Shared-Query Dual-Head | 69.4 | 66.5 |
| Dual-Query Dual-Head | 69.8 | 66.9 |

**멀티모달 입력.** 부록 A의 누적 ablation이다. depth 추가의 기여가 point cloud 추가보다 크다.

| 입력 구성 | R2R-CE SR | R2R-CE SPL | RxR-CE SR | RxR-CE SPL |
|---|---|---|---|---|
| 텍스트 + RGB | 62.5 | 59.0 | 66.0 | 61.5 |
| + depth | 66.0 | 62.0 | 69.0 | 64.0 |
| + point cloud | 67.2 | 63.5 | 70.2 | 65.2 |
| MobileVLA-R1 완전 구성 | 68.3 | 65.2 | 71.5 | 66.8 |

**movement reward 가중치 민감도.** 가중치를 0에서 1.0으로 올릴수록 SR이 65.2에서 68.3으로 오른다. 같은 구간에서 movement reward가 advantage에 기여하는 비율은 0%에서 32%로 오르고, behavior와 format이 합쳐서 여전히 68%를 차지한다. movement 정렬이 나머지 두 항을 대체하는 것이 아니라 보완한다는 뜻이다.

| 가중치 | SR↑ | SPL↑ | movement 기여 | behavior 기여 | format 기여 |
|---|---|---|---|---|---|
| 0.00 | 65.2 | 61.0 | 0% | 62% | 38% |
| 0.10 | 66.4 | 62.4 | 8% | 58% | 34% |
| 0.25 | 67.1 | 63.5 | 16% | 54% | 30% |
| 0.50 | 67.8 | 64.4 | 24% | 50% | 26% |
| 1.00 | 68.3 | 65.2 | 32% | 46% | 22% |

**rationale 생성원.** action 정답을 동일하게 두고 rationale 출처만 바꿨다.

| 생성원 | SR↑ | SPL↑ |
|---|---|---|
| No-CoT | 64.0 | 59.6 |
| Template-CoT | 65.1 | 60.8 |
| LLaMA-3-8B CoT | 66.2 | 62.0 |
| Gemini-CoT | 68.3 | 65.2 |

**최적화 목표 함수.** reward 정의와 학습 예산을 맞춘 조건에서 GRPO가 PPO를 SR 4.2점, SPL 4.8점 앞선다.

| 방법 | 샘플링 | reward | 목표 함수 | SR↑ | SPL↑ |
|---|---|---|---|---|---|
| SFT | 미사용 | 미사용 | 토큰 단위 교차 엔트로피 | 58.0 | 53.2 |
| Reward-SFT | 미사용 | 사용 | reward 가중 교차 엔트로피 | 62.4 | 58.3 |
| PPO | 사용 | 사용 | policy gradient | 64.1 | 60.4 |
| GRPO | 사용 | 사용 | group-relative 목적식 | 68.3 | 65.2 |

## 5. 한계와 향후 과제 (Limitations and Future Work)

저자들은 세 가지 한계를 든다.

**task-level action 추상화의 한계.** action decoder가 학습형 인터페이스를 제공하지만 action 공간 자체는 연속 locomotion 명령과 유한한 behavior primitive 집합의 조합에 머문다. 미세한 접촉 동역학, 손가락 수준의 정교한 manipulation, 연속적으로 파라미터화된 전신 동작을 직접 표현하지 못한다.

**학습과 embodiment 범위의 한계.** 학습은 고려한 navigation과 로봇 제어 데이터셋의 지도 trajectory와 reasoning 라벨에 의존한다. G1 실험이 전용 fine-tuning 없는 전이를 보이긴 했지만 일반적인 embodiment 적응 문제를 다룬 것은 아니다. 로봇 형상, 센서 구성, 환경, 과제 분포가 크게 달라지면 성능이 떨어질 수 있다.

**하이브리드 배치의 한계.** 8B backbone을 원격 GPU에서 실행하므로 통신 비용과 네트워크 연결에 대한 의존이 생긴다. 현재 지연 시간이 평가한 과제를 감당하긴 하지만, 연결이 제약되거나 불안정하면 지연이 늘고 안정성이 떨어질 수 있다. 8B backbone이 연산과 메모리의 주된 병목이라 현재 Jetson 플랫폼에서 완전 온보드 추론이 불가능하다.

향후 과제로는 더 풍부한 파라미터화 스킬과 계층적 whole-body control, 넓은 플랫폼 간 학습과 온라인 적응, 완전 온보드 추론을 위한 모델 압축과 양자화와 distillation을 든다. 정교한 manipulation, 동적인 사람과 로봇의 상호작용, 더 긴 open-world 과제로의 확장도 방향으로 제시한다.

## 6. 관련 연구 (Related Work)

저자들은 관련 연구를 세 줄기로 정리한다.

**언어 유도 navigation과 사족 보행 VLA.** VLN은 R2R과 RxR을 표준 벤치마크로 삼아 시퀀스 예측에서 attention과 메모리와 Transformer 구조를 거쳐 pre-training된 VLM 기반 방법으로 이동했다. 언어 조건 사족 보행 쪽에는 QUAR-VLA와 QUART 계열, 그리고 GeRM 같은 범용 프레임워크가 있다. 이들은 이동 성능이나 직접적인 action 생성에 초점을 두었다.

**범용 VLA와 추론 강화 VLA.** SayCan, PaLM-E, RT-2가 foundation model을 로봇 의사결정에 붙이는 가능성을 보였고 OpenVLA와 Octo가 다양한 시연 데이터와 embodiment로 generalist policy를 확장했다. π0와 π0.5는 연속 action 생성과 과제 일반화를 밀었다. 중간 추론을 명시하는 계열로는 ECoT, CoT-VLA, ACoT-VLA와 dense embodied reasoning 방법이 있다. 이들은 사람이 읽을 수 있는 rationale이나 중간 표현을 만드는 데 무게가 실려, System 2 성격의 추론과 실행 가능한 제어 사이의 연결이 충분히 다뤄지지 않았다는 것이 저자들의 진단이다.

**RL 강화 VLA와 mobile manipulation.** MoRE는 사족 보행 VLA에 강화학습을 적용했고 ReinboT은 시각 언어 manipulation에 적용했다. MoManipVLA는 pre-training된 VLA를 base와 arm의 협조 제어로 mobile manipulation에 옮겼고, GR00T N1은 humanoid를 위한 generalist VLA를 다뤘다. 이들은 action 생성과 embodiment 적응과 과제 수준 policy 최적화에 초점을 두었다.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| MobileVLA-R1 2.0 | 이 논문의 프레임워크 이름. ECCV 2026 학회판 MobileVLA-R1의 확장판이다 |
| MobileVLA-CoT | 저자들이 R2R, RxR, QUARD에서 합성한 reasoning 라벨 데이터셋. episode, step, navigation 세 층위로 13만 4천 개다 |
| reasoning-conditioned action decoder | reasoning 토큰의 hidden state와 observation hidden state를 함께 받아 task-level action을 예측하는 학습형 모듈 |
| task-level action | policy가 내는 (Vx, Vy, ω, α) 형식의 명령. 관절 수준 명령이 아니라 의미 수준 명령이다 |
| behavior primitive | α가 고르는 이산 동작 단위. 상호작용, 자세, 스킬 전환을 포함한다 |
| dual-query dual-head | locomotion과 behavior에 각각 전용 query와 전용 예측 head를 두는 decoder 구조 |
| GRPO | Group Relative Policy Optimization. 같은 입력의 여러 후보 출력 안에서 상대적 advantage를 구성해 value 모델 없이 policy를 최적화한다 |
| VLN-CE | Vision-and-Language Navigation in Continuous Environments. R2R과 RxR을 연속 환경으로 옮긴 평가 프로토콜이다 |
| QUARD | 사족 보행 로봇의 locomotion과 상호작용 trajectory를 담은 데이터셋이자 벤치마크 |
| nDTW | normalized dynamic time warping. 정답 경로와 실제 경로의 형태가 얼마나 겹치는지를 재는 지표 |
| SPL | success-weighted path length. 성공 여부에 경로 효율을 곱해 보정한 지표 |

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 2 | multi-granularity CoT 데이터 엔진 | caption-region | ★ wiki 권장 (data) |
| fig02 | 5 | MobileVLA-R1 2.0 전체 구조 | caption-region | ★ wiki 권장 (architecture) |
| fig03 | 7 | GRPO 기반 reasoning-to-action 최적화 | caption-region | ★ wiki 권장 (method) |
| fig04 | 9 | R2R-CE 정성 결과 | caption-region | (아카이브) |
| fig05 | 10 | RxR-CE 정성 결과 | caption-region | (아카이브) |
| fig06 | 11 | Go2 하드웨어와 배치 구조 | caption-region | (확인 필요) |
| fig07 | 11 | G1 하드웨어와 배치 구조 | caption-region | ★ wiki 권장 (deployment) |
| fig08 | 12 | Go2 실내 정성 결과 | caption-region | (아카이브) |
| fig09 | 13 | Go2 실외 정성 결과 | caption-region | (아카이브) |
| fig10 | 14 | G1 mobile manipulation 정성 결과 | caption-region | (확인 필요) |
| tab01 | 4 | 원천 데이터셋과 MobileVLA-CoT 규모 | table-region | (확인 필요) |
| tab02 | 8 | VLN-CE val-unseen 종합 비교 | table-region | ★ wiki 권장 (result) |
| tab03 | 9 | QUARD 6개 과제 성공률 | table-region | (확인 필요) |
| tab04 | 11 | Go2 실제 closed-loop 평가 | table-region | (확인 필요) |
| tab05 | 12 | Go2 배치 통계와 실패 분석 | table-region | (아카이브) |
| tab06 | 13 | G1 실제 mobile manipulation 성공률 | manual | ★ wiki 권장 (result) |
| tab07 | 14 | G1 평가 규모와 실패 통계 | manual | (아카이브) |
| tab08 | 14 | action 인터페이스와 조건 입력 ablation | manual | ★ wiki 권장 (ablation) |
| tab09 | 14 | action decoder와 GRPO 기여 분해 | manual | (확인 필요) |
| tab10 | 15 | reasoning 감독 층위 ablation | table-region | (아카이브) |
| tab11 | 15 | GRPO reward 구성 ablation | table-region | (아카이브) |
| tab12 | 15 | decoder 구조 ablation | table-region | (아카이브) |
| tab13 | 19 | 멀티모달 입력 누적 ablation | table-region | (아카이브) |
| tab14 | 19 | movement reward 가중치 민감도 | table-region | (아카이브) |
| tab15 | 19 | rationale 생성원 ablation | table-region | (아카이브) |
| tab16 | 19 | PPO와 GRPO 비교 | table-region | (아카이브) |
| tab17 | 19 | 최적화 목표 함수 비교 | table-region | (아카이브) |
| tab18 | 20 | MobileVLA-CoT 필터링 통계 | table-region | (아카이브) |
