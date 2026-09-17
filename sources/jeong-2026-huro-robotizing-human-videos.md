---
title: "HuRo: Robotizing Human Videos for Scalable VLA Pretraining"
type: paper
year: 2026
category: physical-ai
raw_path: raw/papers/jeong-2026-huro-robotizing-human-videos.pdf
raw_filename: "jeong-2026-huro-robotizing-human-videos.pdf"
source_collection: external
authors: "Jinho Jeong, Se June Joo (공동 1저자), Jaehyun Kang, Dongyun Kim, Yena Kim, Hanjung Kim, Seon Joo Kim"
arxiv_id: "2609.10706"
url: "https://arxiv.org/abs/2609.10706"
tags: [physical-ai, vla, robot-dataset, imitation-learning, manipulation, humanoid]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/jeong-2026-huro-robotizing-human-videos/fig01.png
    raw: raw/papers/jeong-2026-huro-robotizing-human-videos-figures/fig01.png
    caption: "HuRo pre-training 전체 구상. 왼쪽은 실험실, 일상, 산업 현장에서 모은 대규모 사람 영상이고, robotization 파이프라인이 retargeting과 로봇 overlay를 거쳐 HuRo dataset을 만든다. 가운데는 지시문과 robot state, action이 붙은 episode로 VLA를 pre-training하는 구성이며, 오른쪽은 실제 로봇 배치 장면과 pre-training 비율에 따라 completion score가 51.5%에서 80.3%로 오르는 막대 그래프다"
    page: 2
    bbox_norm: [0.163, 0.064, 0.8354, 0.3199]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/jeong-2026-huro-robotizing-human-videos/fig02.png
    raw: raw/papers/jeong-2026-huro-robotizing-human-videos-figures/fig02.png
    caption: "HuRo dataset 구축 파이프라인 3단계. 왼쪽 human video annotation은 hand detection, camera parameter 추정, hand pose 추정, VLM captioning으로 3D hand trajectory와 지시문을 만든다. 가운데 action conversion은 3D hand trajectory와 robot URDF를 retargeting해 robot action을 낸다. 오른쪽 visual conversion은 segmentation과 inpainting으로 사람 팔을 지우고 렌더한 로봇을 overlay해 HuRo episode를 완성한다"
    page: 3
    bbox_norm: [0.1667, 0.0582, 0.8333, 0.252]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/jeong-2026-huro-robotizing-human-videos/fig03.png
    raw: raw/papers/jeong-2026-huro-robotizing-human-videos-figures/fig03.png
    caption: "실제 manipulation 과제와 주요 결과. (a) pre-training 비율별 completion score로 ID는 68.1%에서 88.4%, OOD는 34.9%에서 72.2%로 오른다. (b) overlay 효과로 no-overlay는 ID 89.4%지만 OOD 55.7%에 그친다. (c) 참조 모델 비교에서 100% PT가 pi0.5와 GR00T N1.6을 ID와 OOD 모두 앞선다. (d) ALLEX의 네 과제 실행 장면"
    page: 6
    bbox_norm: [0.1667, 0.0577, 0.8333, 0.2877]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/jeong-2026-huro-robotizing-human-videos/fig04.png
    raw: raw/papers/jeong-2026-huro-robotizing-human-videos-figures/fig04.png
    caption: "Cup Stacking 사례 분석. (a) pre-training 비율별 ID와 OOD completion score이고, (b) 컵 배치를 옮긴 공간 OOD 설정, (c) 체크무늬 식탁보를 깐 시각 OOD 설정이다"
    page: 6
    bbox_norm: [0.1667, 0.5226, 0.8333, 0.795]
    strategy: caption-region
    curated: false
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/jeong-2026-huro-robotizing-human-videos/fig05.png
    raw: raw/papers/jeong-2026-huro-robotizing-human-videos-figures/fig05.png
    caption: "Diverse Pick-and-Place에서 end-to-end VLA pre-training의 효과. (a) 카메라 상자와 솔, 손잡이 있는 컵과 없는 컵을 차례로 바구니에 담는 과제 구성이다. (b) No PT가 ID 25.0%와 OOD 13.9%, visual only가 31.9%와 22.2%, visual과 action을 함께 쓴 쪽이 61.1%와 50.0%다. (c) ID와 OOD 물체 목록이고 (d) 세 설정의 grasping 동작 비교다"
    page: 7
    bbox_norm: [0.1667, 0.0596, 0.837, 0.3118]
    strategy: caption-region
    curated: true
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/jeong-2026-huro-robotizing-human-videos/fig06.png
    raw: raw/papers/jeong-2026-huro-robotizing-human-videos-figures/fig06.png
    caption: "영상 생성 기반 pre-training과의 확장 비교. 같은 프레임 예산에서 HuRo는 ID 기준 0.7M 83.3%, 3.5M 83.3%, 7M 97.2%이고 I2V + IDM은 72.2%, 75.0%, 80.6%다. OOD 기준으로 HuRo는 63.9%, 69.4%, 83.3%까지 계속 오르지만 I2V + IDM은 3.5M의 55.6%에서 7M에서도 55.6%로 멈춘다"
    page: 8
    bbox_norm: [0.4872, 0.2554, 0.8478, 0.4366]
    strategy: manual
    curated: true
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/jeong-2026-huro-robotizing-human-videos/fig07.png
    raw: raw/papers/jeong-2026-huro-robotizing-human-videos-figures/fig07.png
    caption: "HuRo 지시문의 워드 클라우드. 전체 혼합 원천 지시문 집합에서 자주 등장한 동사, 물체, 속성어를 각각 보여준다"
    page: 16
    bbox_norm: [0.1667, 0.0833, 0.8333, 0.2321]
    strategy: caption-region
    curated: false
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/jeong-2026-huro-robotizing-human-videos/fig08.png
    raw: raw/papers/jeong-2026-huro-robotizing-human-videos-figures/fig08.png
    caption: "OpenArm Fruit Pick-and-Place 실험 구성. (a) OpenArm embodiment, (b) fine-tuning과 ID 평가에 쓴 물체, (c) OOD 평가로 추가한 미학습 물체다"
    page: 17
    bbox_norm: [0.1828, 0.0833, 0.8172, 0.2879]
    strategy: caption-region
    curated: false
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/jeong-2026-huro-robotizing-human-videos/fig09.png
    raw: raw/papers/jeong-2026-huro-robotizing-human-videos-figures/fig09.png
    caption: "여러 target embodiment로 robotization한 결과 비교. 같은 사람 영상을 (a) ALLEX, (b) XHand1 손을 단 OpenArm, (c) Wuji2 손을 단 RBY1, (d) GR1 네 가지 형상으로 변환했다"
    page: 18
    bbox_norm: [0.1731, 0.0833, 0.8269, 0.1834]
    strategy: caption-region
    curated: false
  - id: fig10
    label: Figure 10
    kind: figure
    file: assets/jeong-2026-huro-robotizing-human-videos/fig10.png
    raw: raw/papers/jeong-2026-huro-robotizing-human-videos-figures/fig10.png
    caption: "카메라 alignment 잔차의 상위 구간과 고오차 사례. 위쪽은 episode별 평균 위치 잔차와 회전 잔차의 상위 10% 구간이며 점선이 p99 경계다. 아래쪽은 시점이나 로봇 배치가 크게 어긋난 대표 사례다"
    page: 20
    bbox_norm: [0.1731, 0.0833, 0.8269, 0.3649]
    strategy: caption-region
    curated: false
  - id: tab01
    label: Table 1
    kind: table
    file: assets/jeong-2026-huro-robotizing-human-videos/tab01.png
    raw: raw/papers/jeong-2026-huro-robotizing-human-videos-figures/tab01.png
    caption: "ALLEX 실제 평가 구성표. 네 과제의 시연 데이터 개수, ID와 OOD rollout 횟수, horizon 길이, 사용 팔 수, 평가하려는 기능을 정리했다"
    page: 13
    bbox_norm: [0.1699, 0.1201, 0.8301, 0.2147]
    strategy: table-region
    curated: false
  - id: tab02
    label: Table 2
    kind: table
    file: assets/jeong-2026-huro-robotizing-human-videos/tab02.png
    raw: raw/papers/jeong-2026-huro-robotizing-human-videos-figures/tab02.png
    caption: "ALLEX 네 과제의 과제별 ID와 OOD completion score 전체 표. 위 두 행은 외부 참조 모델이고 아래는 통제 변형이다. 100% PT가 평균 ID 88.4%, OOD 72.2%, 전체 80.3%로 가장 높다"
    page: 13
    bbox_norm: [0.1707, 0.2933, 0.8293, 0.496]
    strategy: table-region
    curated: true
  - id: tab03
    label: Table 3
    kind: table
    file: assets/jeong-2026-huro-robotizing-human-videos/tab03.png
    raw: raw/papers/jeong-2026-huro-robotizing-human-videos-figures/tab03.png
    caption: "Masquerade 방식 robotization과의 비교. Diverse Pick-and-Place에서 No PT가 63.9%와 25.0%, Fixed-EEF가 75.0%와 50.0%, Fixed-EEF에 손 목표를 더한 쪽이 80.6%와 61.1%, HuRo 방식이 86.1%와 63.9%다"
    page: 14
    bbox_norm: [0.3232, 0.1202, 0.6768, 0.2172]
    strategy: table-region
    curated: false
  - id: tab04
    label: Table 4
    kind: table
    file: assets/jeong-2026-huro-robotizing-human-videos/tab04.png
    raw: raw/papers/jeong-2026-huro-robotizing-human-videos-figures/tab04.png
    caption: "사람 도메인 pre-training과의 OOD 비교. Cup Stacking과 Cup-Noodle Handover에서 Human-HRDT와 Human-VITRA는 No PT를 넘지 못하거나 한 과제에서만 앞서는 반면 100% PT는 70.8%와 66.7%로 두 과제 모두 가장 높다"
    page: 14
    bbox_norm: [0.3015, 0.2605, 0.6948, 0.3644]
    strategy: table-region
    curated: false
  - id: tab05
    label: Table 5
    kind: table
    file: assets/jeong-2026-huro-robotizing-human-videos/tab05.png
    raw: raw/papers/jeong-2026-huro-robotizing-human-videos-figures/tab05.png
    caption: "HuRo dataset의 원천별 구성. 프레임 수 기준으로 EgoDex 55.5%, EgoVerse 26.5%, Ego4D 10.4%, Ego10K 6.0%, EPIC-Kitchens 1.7%이며 합계는 1억 4,220만 장, 1,316.8시간이다"
    page: 15
    bbox_norm: [0.3036, 0.1064, 0.6964, 0.2289]
    strategy: table-region
    curated: true
  - id: tab06
    label: Table 6
    kind: table
    file: assets/jeong-2026-huro-robotizing-human-videos/tab06.png
    raw: raw/papers/jeong-2026-huro-robotizing-human-videos-figures/tab06.png
    caption: "HuRo 변형별 커버리지 지표. DINOv3 특징으로 잰 OpenImages 커버리지와 지시문에서 센 고유 동사, 물체, 동사-물체 쌍 개수를 혼합 원천 10%, 50%, 100%와 EgoDex 단일 원천에 대해 비교한다"
    page: 15
    bbox_norm: [0.1667, 0.2803, 0.8299, 0.3707]
    strategy: table-region
    curated: false
  - id: tab07
    label: Table 7
    kind: table
    file: assets/jeong-2026-huro-robotizing-human-videos/tab07.png
    raw: raw/papers/jeong-2026-huro-robotizing-human-videos-figures/tab07.png
    caption: "OpenArm Fruit Pick-and-Place 결과. ALLEX 기준으로 robotization한 HuRo PT가 OOD 평균 75.0%와 전체 평균 72.9%로 가장 높고, Human-HRDT는 ID 평균 75.0%로 앞서지만 OOD에서 56.3%에 머문다"
    page: 17
    bbox_norm: [0.2195, 0.3945, 0.7805, 0.5663]
    strategy: table-region
    curated: false
  - id: tab08
    label: Table 8
    kind: table
    file: assets/jeong-2026-huro-robotizing-human-videos/tab08.png
    raw: raw/papers/jeong-2026-huro-robotizing-human-videos-figures/tab08.png
    caption: "RTX 5090 한 장에서 잰 파이프라인 처리 비용. EPIC-Kitchens는 15분 영상당 143.1분으로 원본 길이의 9.5배, Ego4D는 120.1분으로 8.0배이며 human video annotation이 대부분을 차지한다"
    page: 18
    bbox_norm: [0.2798, 0.284, 0.7202, 0.3813]
    strategy: table-region
    curated: false
  - id: tab09
    label: Table 9
    kind: table
    file: assets/jeong-2026-huro-robotizing-human-videos/tab09.png
    raw: raw/papers/jeong-2026-huro-robotizing-human-videos-figures/tab09.png
    caption: "코퍼스 수준 데이터 잔존율. manipulation 구간으로 선택된 비율이 EPIC-Kitchens 17.3%, Ego4D 6.9%이고 선택 이후 최종 데이터까지 남는 비율은 각각 98.1%와 97.0%다"
    page: 19
    bbox_norm: [0.3152, 0.1477, 0.6848, 0.2262]
    strategy: table-region
    curated: false
  - id: tab10
    label: Table 10
    kind: table
    file: assets/jeong-2026-huro-robotizing-human-videos/tab10.png
    raw: raw/papers/jeong-2026-huro-robotizing-human-videos-figures/tab10.png
    caption: "파이프라인 품질 진단 표. 카메라 회전 오차 중앙값 0.218도, 위치 ATE 4.47mm, hand pose 오차 20.4mm, retargeting 잔차 21.2mm, 관절 한계 무위반 62.5%, grasping이 아닌 자기접촉 없음 55.2%, inpainting 24.8dB, 사람 픽셀 제거율 93.3%를 담았다"
    page: 19
    bbox_norm: [0.1667, 0.293, 0.8333, 0.44]
    strategy: table-region
    curated: true
---

## 한 줄 요약 (One-line Summary)

HuRo는 에고센트릭 사람 영상에서 사람 팔을 지우고 렌더한 로봇을 그 자리에 합성하는 동시에 손 동작을 로봇 관절 trajectory로 retargeting해 observation과 action을 함께 로봇 형식으로 바꾸는 robotization 파이프라인이며, 이렇게 만든 63만 개 episode와 1억 4,200만 장 규모의 HuRo dataset으로 VLA를 pre-training하면 실제 manipulation 네 과제의 전체 completion score가 51.5%에서 80.3%로, 공간과 시각 변화를 준 OOD 조건에서는 34.9%에서 72.2%로 오른다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 제목 | HuRo: Robotizing Human Videos for Scalable VLA Pretraining |
| 저자 | Jinho Jeong과 Se June Joo 공동 1저자 외 5인, 교신 표기 없음 |
| 소속 | RLWRLD, Yonsei University |
| arXiv | 2609.10706v2 (2026년 9월 11일, cs.RO) |
| 게재 | GitHub 저장소 설명에 CoRL 2026으로 표기 |
| 코드 | https://github.com/3587jjh/HuRo |
| 프로젝트 페이지 | https://3587jjh.github.io/HuRo/ |
| 데이터셋 | 공개 예정 (Hugging Face 배지가 coming soon) |
| 분량 | 본문 8쪽, 참고문헌 3쪽, 부록 12쪽, 그림 10개와 표 10개 |
| 지원 | IITP 및 과학기술정보통신부 (RS-2024-00469482, RS-2024-00509279, RS-2020-II201361), Konan Technology |

## 2. 주요 기여 (Key Contributions)

논문이 내세우는 기여는 세 가지다.

1. **이종 원천을 하나의 형식으로 묶는 robotization 파이프라인.** robotization은 사람 영상을 로봇이 수행한 것처럼 바꾸는 변환으로, 눈에 보이는 사람 팔을 지우고 로봇을 그려 넣는 visual conversion과 손 동작을 로봇 관절 trajectory로 옮기는 action conversion을 함께 수행한다. 원천마다 제공하는 annotation 수준이 다른데, 없는 중간 신호는 추정으로 채워 다섯 개 데이터셋을 공통 형식으로 변환한다.
2. **HuRo dataset.** 다섯 개 에고센트릭 사람 영상 원천에서 63만 개 이상의 robotization된 episode와 1억 4,220만 장의 프레임(30fps 기준 약 1,317시간)을 만들었다. 기존 robotization 기반 pre-training 연구가 쓴 데이터보다 한 자릿수 이상 큰 규모다.
3. **확장성과 설계 요소의 실증.** pre-training 규모를 키울수록 downstream 성능이 오르는 경향, visual robotization이 OOD robustness에 기여한다는 점, retargeting한 action까지 함께 학습하는 end-to-end pre-training이 시각 경로만 옮기는 방식보다 낫다는 점을 실제 로봇 실험으로 보였다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 문제 설정

VLA는 로봇 manipulation의 표준 구성으로 자리잡았고, pre-training 데이터를 늘리면 성능이 오른다는 보고가 이어졌다. 확장을 막는 병목은 실제 로봇 데이터의 양이다. 사람 영상은 수집이 쉽고 물체, 장면, 시점, 조작 방식의 범위가 훨씬 넓다.

사람 영상을 policy 학습에 쓰려면 embodiment gap을 해소해야 한다. embodiment는 로봇의 물리적 형상과 그에 딸린 제어 인터페이스를 뜻하며, 사람과 로봇 사이의 간극은 observation과 action 양쪽에 걸쳐 있다. 기존 연구는 이 간극을 두 방향으로 다뤘다.

| 계열 | 방식 | 한계 |
|---|---|---|
| 과제 일치 설정의 결합 robotization | Phantom, DexUMI, WARPED, RwoR, MimicDreamer처럼 observation과 action을 함께 로봇 형식으로 바꾼다 | 사람 영상과 downstream 로봇 과제가 미리 맞춰진 설정에서만 검증됐다 |
| 대규모 action 지도 | VITRA, EgoScale처럼 손 동작에서 action 지도를 뽑되 observation은 사람 시점 그대로 둔다 | observation의 embodiment gap이 남는다 |
| 대규모 visual robotization | H2R, Masquerade처럼 robotization한 영상을 시각 인코더 pre-training이나 보조 예측 목표에 쓴다 | policy 전체를 end-to-end로 pre-training하지 않는다 |

논문이 비워져 있다고 지적한 자리는 observation과 action을 함께 로봇 형식으로 바꾼 데이터를 이종 사람 영상에서 대규모로 만들어 VLA pre-training 원천으로 쓸 수 있는지다.

### 3.2 파이프라인 전체 구조

파이프라인은 human video annotation, action conversion, visual conversion 세 단계로 이뤄진다. annotation 단계가 원천마다 빠진 중간 신호(카메라 기하, 손 동작, 지시문(instruction))를 추정하고, action conversion이 손 동작을 로봇 관절 trajectory로 retargeting하며, visual conversion이 사람 팔을 지우고 retargeting한 로봇을 합성한다. 세 단계를 거친 observation, state, action, 지시문이 HuRo episode를 이룬다.

입력은 길이 T의 에고센트릭 영상 V = {I_t}이다. 전처리에서 30fps로 표준화하고 종횡비를 유지한 채 크기를 줄인다.

### 3.3 human video annotation

annotation 단계는 카메라 기하와 손 동작을 추정하고, manipulation 구간을 골라내며, 구간을 자른 chunk마다 지시문 하나를 붙인다. chunk는 manipulation 구간을 길이 상한 안에서 자른 시간 단위다.

**카메라 intrinsic과 손 추적.** 영상 단위로 droidcalib이 intrinsic K를 자기 보정으로 추정하고, 카메라가 거의 정지한 영상에서는 AnyCalib으로 대체한다. 추정한 intrinsic으로 프레임을 원근 핀홀 이미지로 보정한다. 보정된 프레임마다 100DoH가 손을 검출하고 BOT-SORT가 좌우 손 배정을 시간 방향으로 정리해 3D hand pose 추정에 쓸 일관된 크롭을 만든다.

**hand pose 추정.** 정리된 크롭에서 HAWOR가 좌우 손별로 MANO 기반 hand pose를 추정한다. MANO는 손의 형상과 자세를 소수의 파라미터로 표현하는 통계 모델이다. 추정 결과에서 손목 pose, 손끝 위치, 손 내부 구조 단서를 뽑아 retargeting에 쓴다.

**카메라 trajectory 추정.** 손 영역을 가린 masked DROID-SLAM으로 에고센트릭 카메라 trajectory를 복원한다. 단안 SLAM은 절대 크기를 결정하지 못하므로 MoGe-2로 미터 단위 크기를 추정하고, GeoCalib으로 SLAM 세계 좌표계를 중력 방향에 맞춰 retargeting과 로봇 overlay가 공유할 기준을 만든다.

**chunk 분할과 VLM captioning.** 손 annotation이 유효한 프레임을 manipulation 구간으로 묶고, 각 구간을 길이 상한 안에서 chunk로 나눈다. chunk마다 최근 손목 trajectory를 RGB 프레임 위에 투영해 그린 뒤 Qwen3.5에 넣어 지시문 하나를 생성한다. 이어지는 검증 단계가 지시문과 프레임의 일치를 확인하고 손과 물체의 상호작용이 없는 chunk를 걸러낸다.

### 3.4 action conversion

action conversion은 chunk의 사람 손 동작을 로봇 관절 trajectory로 retargeting한다. hand pose에서 손끝 위치와 손 내부 구조 단서를 뽑아 세계 좌표계로 옮긴다.

세계 좌표계는 로봇 base 좌표계와 일치하지 않으므로 chunk 단위 변환을 3차원 평행이동과 yaw 회전을 파라미터로 두고 추정한다. retargeting은 PyRoKi로 두 단계에 걸쳐 푼다.

1. 성기게 표본한 timestep에서 base 정렬 변환과 로봇 관절 구성을 함께 최적화한다. 목적 함수는 손끝 위치 항, 손 내부 구조 항, 에고 시점 일관성 항, 관절 한계와 기본 자세 벌점으로 이뤄진다. 에고 시점 일관성 항은 순기구학으로 얻은 로봇의 에고센트릭 카메라 링크가 목표 카메라 pose에 가깝게 유지되도록 유도한다.
2. 정렬 변환을 고정한 뒤 전체 timestep의 관절 trajectory를 다시 최적화한다. 같은 항에 시간 평활 항을 더해 연속 프레임 사이의 급격한 변화를 억제한다.

최적화한 관절 trajectory는 대상 로봇의 인터페이스에 따라 policy state 열로 변환하고, 손목 pose는 순기구학으로 얻는다. 사람 영상에는 로봇 action이 없으므로 state 열에서 a_t = s_{t+1}로 action 목표를 정의한다.

### 3.5 visual conversion

visual conversion은 chunk와 retargeting한 관절 trajectory로 robotization된 observation을 만든다. 먼저 SAM2가 눈에 보이는 사람 팔을 분할하고, 필요하면 Detectron2가 사람 영역 프롬프트를 보조로 제공한다. 분할된 영역은 ProPainter로 inpainting해 사람 팔이 지워진 프레임을 얻는다. inpainting은 지워진 영역을 주변 맥락으로 그럴듯하게 채우는 복원 기법이다.

그다음 Isaac Sim으로 대상 로봇을 렌더해 정리된 영상 위에 합성한다. 렌더러는 카메라 intrinsic, retargeting한 관절 구성, 그리고 action conversion에서 쓴 것과 같은 정렬 변환을 사람 카메라 trajectory에 적용해 얻은 observation 카메라를 입력으로 받는다.

### 3.6 HuRo dataset 구성

파이프라인은 여러 로봇 기구학에 적용할 수 있지만 본 실험의 HuRo dataset은 ALLEX를 대상으로 만들었다. ALLEX는 7자유도 팔 두 개, 15자유도 손 두 개, 2자유도 목, 2자유도 허리를 갖춘 양팔 dexterous 로봇이다.

| 원천 | 프레임 | 시간 | 프레임 비율 |
|---|---|---|---|
| EgoDex | 7,890만 장 | 730.8시간 | 55.5% |
| EgoVerse | 3,770만 장 | 348.7시간 | 26.5% |
| Ego4D | 1,480만 장 | 136.6시간 | 10.4% |
| Ego10K | 850만 장 | 78.4시간 | 6.0% |
| EPIC-Kitchens | 240만 장 | 22.3시간 | 1.7% |
| 합계 | 1억 4,220만 장 | 1,316.8시간 | 100.0% |

다섯 원천은 파이프라인에 들어오는 지점이 다르다. EPIC-Kitchens와 Ego4D는 원본 RGB 영상에서 시작하고, Ego10K는 카메라 intrinsic을 함께 제공하며, EgoVerse와 EgoDex는 카메라 기하와 hand pose annotation을 제공한다. 언어 annotation은 chunk 단위 지시문 형식으로 통일했다. EgoVerse는 자체 VLM captioning으로 다시 생성했고 EgoDex도 그에 맞춰 다시 라벨링했다.

### 3.7 VLA policy 학습

**구조.** policy는 GR00T-N1.6-3B 구조를 바탕으로 하고 end-effector 기준 action 인터페이스를 쓴다. VLM backbone이 robotization된 RGB 이미지와 chunk 단위 지시문을 vision-language 임베딩으로 부호화하고, 이 임베딩과 robot state를 조건으로 action head가 H = 40 길이의 action chunk를 예측한다.

**action 표현.** 예측 action은 좌우 손목 pose 목표와 손 관절 목표로 이뤄진다. 손목 목표는 현재 손목 pose 기준의 상대 표현으로, 3차원 평행이동과 연속 6차원 회전 표현을 쓴다. 손 관절은 절대 목표값을 쓴다.

**학습 설정.**

| 단계 | 설정 |
|---|---|
| 초기화 | VLM backbone은 공개 GR00T-N1.6-3B 체크포인트, action head는 무작위 초기화 |
| 목적 함수 | flow matching, 시각 인코더도 함께 학습 |
| pre-training | 8만 step, 전역 배치 2,048, AdamW, 학습률 1e-4, weight decay 1e-5, 선형 warmup 후 상수 스케줄 |
| fine-tuning | 3만 step, 배치 128, 초기 학습률 1e-4, cosine decay |

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 평가 구성

ALLEX로 실제 manipulation 네 과제를 평가한다. 짧은 단일 팔 pick-and-place부터 양팔 협응과 물체 전달, articulated object 조작이 포함된 long-horizon 과제까지 걸쳐 있다.

| 과제 | 시연 데이터(demonstration) | ID / OOD rollout | 내용 |
|---|---|---|---|
| Apple Pick-and-Place | 43개 | 12 / 12 | 사과를 집어 그릇에 담는다. 이진 성공 판정 |
| Cup Stacking | 40개 | 12 / 24 | 한 손으로 컵 더미를 들고 다른 손으로 컵 두 개를 차례로 더한 뒤 식탁에 내려놓는다 |
| Cup-Noodle Handover | 16개 | 12 / 12 | 컵라면을 집어 반대 손으로 넘기고 선반에 세워 놓는다 |
| Microwave Loading | 20개 | - / 10 | 전자레인지 문을 열고 물체를 안에 놓은 뒤 문을 닫는다 |

Apple Pick-and-Place를 뺀 세 과제는 하위 목표 세 개의 달성 개수를 최대값으로 정규화한 부분 점수로 채점한다. OOD 조건은 공간 변화와 시각 변화를 준다. Cup Stacking의 OOD 24회는 컵 배치를 옮긴 공간 조건 12회와 체크무늬 식탁보를 깐 시각 조건 12회로 나뉜다. Microwave Loading은 OOD 조건에서만 평가한다.

통제 변형은 HuRo dataset의 0%, 10%, 50%, 100% 부분집합이며 0%가 아닌 부분집합은 원천 비율을 유지한다. no-overlay 변형은 같은 retargeting action 지도를 쓰되 observation은 원본 사람 영상 그대로 둔다. 참조 모델로 pi0.5와 GR00T N1.6을 공개 체크포인트에서 바로 fine-tuning해 함께 보고한다.

### 4.2 규모 확장

pre-training step 수와 전역 배치를 고정하고 부분집합 크기만 바꾼 결과, 평균 completion score가 pre-training 없이 51.5%에서 전체 데이터 사용 시 80.3%로 올랐다.

| 모델 | ID 평균 | OOD 평균 | 전체 |
|---|---|---|---|
| pi0.5 | 68.5% | 28.0% | 48.2% |
| GR00T N1.6 | 66.7% | 37.4% | 52.0% |
| 0% PT | 68.1% | 34.9% | 51.5% |
| 10% PT | 76.9% | 59.5% | 68.2% |
| 50% PT | 78.2% | 69.8% | 74.0% |
| no-overlay | 89.4% | 55.7% | 72.5% |
| 100% PT | 88.4% | 72.2% | 80.3% |

100% PT는 ID에서 68.1%에서 88.4%로, OOD에서 34.9%에서 72.2%로 올랐고 두 참조 모델을 양쪽 조건 모두에서 앞섰다.

Cup Stacking을 사례로 보면 OOD completion이 10% PT의 60.4%에서 100% PT의 79.2%로 올랐다. 규모가 작은 모델은 grasping이 불안정하고 목표 컵으로 접근하는 동작이 부정확했으며, 컵 배치를 옮기거나 체크무늬 식탁보를 깔면 접촉 지점이 중심에서 벗어나거나 쥔 컵이 미끄러지는 실패가 늘었다.

### 4.3 visual robotization의 기여

no-overlay 변형은 ID에서 89.4%로 100% PT의 88.4%와 비슷하지만 OOD에서 55.7%로 72.2%보다 16.5%p 낮다. 전체 데이터를 썼는데도 OOD에서 10% PT의 59.5%보다 낮다. observation을 로봇 형식으로 바꾸는 처리가 retargeting한 action 지도만으로는 얻지 못하는 기여를 한다는 근거다.

### 4.4 end-to-end pre-training의 역할

시각 경로만 옮기는 방식과 policy 전체를 옮기는 방식을 Diverse Pick-and-Place 과제로 비교했다. 이 과제는 grasping 요구가 다른 물체 두 개를 차례로 집어 바구니에 담는다. 물체는 네 종류이며 ID 평가는 물체 쌍마다 물체별 초기 위치 세 곳의 모든 조합을 써서 36회, OOD 평가는 솔과 손잡이 있는 컵 쌍에서 컵을 미학습 인스턴스 두 종류로 바꾸고 두 물체를 미학습 위치에 놓아 18회 수행한다. 물체 하나를 적절한 grasping으로 바구니에 담으면 1점이라 rollout 한 번의 만점은 2점이다.

| 설정 | ID | OOD |
|---|---|---|
| No PT | 25.0% | 13.9% |
| PT (Visual Only) | 31.9% | 22.2% |
| PT (Visual + Action) | 61.1% | 50.0% |

시각 경로만 옮기면 No PT 대비 개선 폭이 작지만, action까지 함께 옮기면 ID 61.1%와 OOD 50.0%로 크게 올랐다. 동작을 보면 No PT와 visual only는 솔을 손잡이가 아니라 위에서 잡는 부정확한 grasping이 잦았고, OOD에서 visual only는 미학습 컵에 접근은 하되 손잡이 안으로 손가락을 통과시키지 못했다. visual과 action을 함께 옮긴 쪽은 시연 데이터와 일치하는 방식으로 솔의 손잡이를 잡고 미학습 컵도 성공적으로 다뤘다.

### 4.5 영상 생성 기반 pre-training과의 비교

DreamGen을 따르고 RoboCurate의 ALLEX 설정을 쓴 I2V + IDM baseline을 만들어 비교했다. 이 baseline은 대상 로봇에 적응시킨 image-to-video 모델이 manipulation 영상을 생성하고 Inverse Dynamics Model이 생성된 observation에서 pseudo-action을 예측한다. 0.7M, 3.5M, 7.0M 프레임의 같은 예산에서 학습 설정을 고정해 비교했고, 4.4절과 같은 과제와 평가 절차를 쓰되 시연 데이터 수집부터 평가까지 전체를 별도의 물리 환경에서 수행했다.

| 프레임 예산 | HuRo ID | I2V + IDM ID | HuRo OOD | I2V + IDM OOD |
|---|---|---|---|---|
| 0.7M | 83.3% | 72.2% | 63.9% | 41.7% |
| 3.5M | 83.3% | 75.0% | 69.4% | 55.6% |
| 7.0M | 97.2% | 80.6% | 83.3% | 55.6% |

HuRo는 모든 예산에서 앞섰고, 0.7M 프레임만으로도 I2V + IDM의 7.0M 결과를 ID와 OOD 양쪽에서 넘었다. 예산이 커질수록 격차가 벌어지는데, 특히 OOD에서 I2V + IDM은 3.5M에서 7.0M으로 늘려도 55.6%로 더 오르지 않은 반면 HuRo는 83.3%까지 계속 올랐다.

### 4.6 부록의 주요 분석

**Masquerade 방식과의 비교 (Table 3).** Masquerade는 3D 손 동작을 복원해 robotization한 영상으로 시각 인코더를 pre-training하는 관련 연구다. 복원한 3D 동작을 로봇 action 목표로도 바꿀 수 있으므로 action 지도를 붙인 확장판을 만들어 비교했다. 모든 변형이 EPIC-Kitchens 240만 장 pre-training 집합의 공통 annotation을 쓰고 구조와 학습 레시피도 공유하며 robotization 방식만 다르다.

| 방법 | ID | OOD |
|---|---|---|
| No PT | 63.9% | 25.0% |
| Fixed-EEF (Masquerade 방식) | 75.0% | 50.0% |
| Fixed-EEF + Hand | 80.6% | 61.1% |
| HuRo-EEF + Hand | 86.1% | 63.9% |

고정된 카메라-로봇 extrinsic으로 변환한 Fixed-EEF도 No PT보다 나았고, 손 목표를 더하면 더 올랐으며, 복원한 에고센트릭 카메라 trajectory를 반영하는 HuRo 방식이 가장 높았다.

**사람 도메인 pre-training과의 비교 (Table 4).** 같은 영상과 같은 규모를 쓰되 원본 사람 RGB observation을 유지하고 복원한 손 동작을 action 지도로 쓰는 변형 두 개를 만들었다. H-RDT를 옮긴 Human-HRDT는 9차원 손목 action에 손목 좌표계 기준 손끝 다섯 개의 3차원 위치를 더해 손당 24차원, 양손 48차원을 쓴다. VITRA를 옮긴 Human-VITRA는 MANO 손가락 관절 15개의 부모 상대 회전을 각각 세 개의 xyz 오일러 각으로 적어 손당 54차원, 양손 108차원을 쓴다. 미학습 배경의 별도 환경에서 평가해 전부 OOD로 보고한다.

| 방법 | pre-training observation / action | Cup Stacking | Cup-Noodle Handover |
|---|---|---|---|
| No PT | - | 31.9% | 16.7% |
| Human-HRDT | 사람 / 사람 | 5.6% | 37.5% |
| Human-VITRA | 사람 / 사람 | 0.0% | 9.7% |
| 100% PT | robotization / 로봇 | 70.8% | 66.7% |

Human-HRDT는 Cup-Noodle Handover에서 No PT를 앞섰지만 Cup Stacking에서 크게 낮았고 Human-VITRA는 두 과제 모두 No PT보다 낮았다. 사람 도메인 변형은 Cup Stacking에서 컵을 집는 단계까지는 도달하되 기존 더미와 정렬하고 올려놓는 단계에서 실패했고, Cup-Noodle Handover에서는 양손 전달 구간에 실패가 몰렸다.

**커버리지 분석 (Table 6).** 시각 커버리지는 DINOv3 특징으로 OpenImages 참조 이미지 2만 장 각각에 대해 표본 프레임 집합 안의 최근접 이웃과의 코사인 유사도를 재 평균한다. 지시문 커버리지는 고유 동사, 물체, 동사-물체 쌍의 개수로 잰다.

| 변형 | DINO 표본 | OpenImages 커버리지 | 지시문 표본 | 고유 동사 | 고유 물체 | 고유 동사-물체 쌍 |
|---|---|---|---|---|---|---|
| 혼합 10% | 10만 장 | 0.664 | 7만 1,000개 | 521 | 1,300 | 1만 1,787 |
| 혼합 50% | 50만 장 | 0.678 | 35만 5,000개 | 778 | 1,980 | 2만 5,656 |
| 혼합 100% | 100만 장 | 0.687 | 71만 개 | 959 | 2,344 | 3만 5,358 |
| EgoDex 단일 | 50만 장 | 0.616 | 33만 5,000개 | 136 | 268 | 938 |

혼합 50%와 EgoDex 단일은 표본 프레임 수가 같고 지시문 개수도 비슷한데 혼합 쪽의 커버리지가 모두 높다. downstream에서도 혼합 50%는 약 7,110만 장으로 EgoDex 단일의 7,890만 장보다 적은데 ALLEX 네 과제 평균이 78.2%와 69.8%로 EgoDex 단일의 63.9%와 54.2%보다 높았다. Diverse Pick-and-Place에서도 0.7M 혼합 설정이 240만 장 EPIC-Kitchens 단일 변형과 비슷한 83.3%와 63.9%를 냈다. 3.4배 적은 프레임으로 같은 수준에 도달한 결과다.

**다른 embodiment로의 확장 (Table 7).** ALLEX를 대상으로 robotization한 데이터로 pre-training한 policy를 OpenArm에 fine-tuning했다. OpenArm은 ALLEX와 같은 9차원 손목 표현에 XHand1 손마다 절대 12자유도 관절 목표를 더해 state와 action이 42차원이다. 목을 고정한 구성이다.

| 변형 | ID 평균 | OOD 평균 | 전체 |
|---|---|---|---|
| No PT | 54.2% | 43.8% | 49.0% |
| Human-HRDT | 75.0% | 56.3% | 65.6% |
| Human-VITRA | 33.3% | 12.5% | 22.9% |
| HuRo visual only | 62.5% | 25.0% | 43.8% |
| HuRo no-overlay | 62.5% | 62.5% | 62.5% |
| HuRo PT | 70.8% | 75.0% | 72.9% |

ID 평균은 Human-HRDT가 조금 높았지만 OOD 평균과 전체 평균은 HuRo PT가 가장 높았다. ALLEX 실험과 같은 경향으로, HuRo PT가 visual only와 no-overlay를 모두 앞섰고 격차는 OOD에서 컸다.

**다중 embodiment pre-training.** annotation 단계의 산출물(카메라 기하, 손 동작, 지시문)과 visual conversion의 팔 마스크, inpainting 배경은 대상 로봇과 무관하므로 다른 embodiment로 다시 robotization할 때는 retargeting과 최종 overlay만 다시 계산하면 된다. 처리 비용 측정에 따르면 대상별 재계산은 EPIC-Kitchens에서 전체의 10.6%, Ego4D에서 5.5%다. ALLEX 단일 240만 장 설정이 86.1%와 63.9%였던 것에 비해 OpenArm robotization을 더해 약 두 배 규모로 만든 공동 pre-training은 91.7%와 77.8%를 기록했다.

**파이프라인 비용과 잔존율 (Table 8, Table 9).** RTX 5090 한 장에서 15분 영상 세 개를 평균한 결과, EPIC-Kitchens는 총 143.1분으로 원본 길이의 9.5배, Ego4D는 120.1분으로 8.0배가 걸린다. human video annotation이 각각 89.8분과 77.9분으로 대부분을 차지하고 action conversion은 6.0분과 3.6분에 그친다. 잔존율을 보면 manipulation 구간으로 선택되는 비율이 EPIC-Kitchens 17.3%, Ego4D 6.9%이고 선택 이후 최종 데이터까지 남는 비율은 98.1%와 97.0%다. Ego4D의 선택률이 낮은 이유는 야외 촬영 범위가 넓어 지속적인 손과 물체 상호작용이 영상에서 차지하는 비중이 작기 때문이다. EgoVerse와 EgoDex는 각자의 진입 지점 기준으로 92.7%와 88.9%가 최종 데이터에 도달한다. 다섯 원천에서 처리한 입력은 3,298.6시간이고 최종 산출은 1억 4,220만 장(1,316.8시간)이다.

**품질 진단 (Table 10).** EgoDex RGB에 추정 단계를 다시 실행해 공개 annotation과 비교하고, 나머지는 생성된 HuRo 데이터에서 측정했다.

| 구성 요소 | 진단 항목 | 결과 |
|---|---|---|
| 카메라 trajectory | 프레임별 회전 오차 | 중앙값 0.218도 |
| 카메라 trajectory | SE(3) 정렬 후 위치 ATE | 중앙값 4.47mm |
| hand pose | 손목 기준 21개 키포인트 오차 | 중앙값 20.4mm |
| retargeting | IK 이후 손끝 잔차 | 중앙값 21.2mm |
| 관절 한계 | 어느 관절과 프레임에서도 1도 초과 위반 없음 | 62.5% |
| 자기 충돌 | 표본 프레임에 grasping이 아닌 자기접촉 없음 | 55.2% |
| inpainting | 팔 모양 마스크 아래 복원 품질 | 중앙값 24.8dB |
| 사람 제거 | 검출된 사람 픽셀 감소율 | 93.3% |

저장된 robot state는 사후 관절 한계 투영 이전 값으로 평가했다. URDF 위치 한계로 정확히 투영하면 감사 대상 trajectory가 모두 한계 안으로 들어오고, 채점 대상 (프레임, 손끝) 표본의 95.6%에서 투영에 따른 손끝 변위가 1mm 미만이다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

논문이 밝힌 한계는 세 가지다.

1. **robotization된 observation의 충실도.** 복원과 visual conversion 품질이 상한을 정한다. 현재 로봇 overlay는 렌더한 로봇과 장면 기하 사이의 가림을 명시적으로 모델링하지 않으며, 남은 inpainting이나 렌더링 결함이 시각적 불일치를 만들 수 있다. robotization 충실도의 수준별 차이가 downstream 학습에 어떤 영향을 주는지는 아직 다루지 않았다.
2. **접촉 신호의 부재.** HuRo dataset은 시각과 기구학 기준의 action 지도를 제공하지만 접촉이 중요한 manipulation에 필요한 힘이나 촉각 신호를 담지 않는다. 추정한 접촉이나 힘 단서를 덧붙이거나 센서가 풍부한 로봇 데이터와 함께 pre-training하는 방향이 후속 과제다.
3. **자기 충돌과 물리 접촉 미고려.** 기구학 retargeting은 자기 충돌이나 물리 접촉을 모델링하지 않는다. 다섯 원천 감사에서 grasping이 아닌 자기접촉이 검출되지 않은 trajectory는 55.2%에 그쳤다. 결과 trajectory는 그대로 실행 가능한 로봇 시연 데이터가 아니라 pre-training 지도 신호로 보아야 한다는 뜻이다.

부록이 덧붙인 후속 방향으로는 embodiment 다양성과 형상, action 인터페이스가 robotization 기반 pre-training에 주는 영향을 체계적으로 살피는 연구가 있다.

## 6. 관련 연구 (Related Work)

| 계열 | 대표 연구 | HuRo와의 관계 |
|---|---|---|
| embodiment 정합을 위한 visual robotization | H2R, Masquerade | 사람 손을 렌더한 로봇으로 대체해 시각 인코더나 보조 예측 목표를 pre-training한다. HuRo는 같은 시각 변환을 쓰되 policy 전체를 end-to-end로 pre-training한다 |
| 생성 기반 시각 변환 | H2R-Grounder, Mitty, X-Humanoid | 사람 영상에서 로봇 형태의 manipulation 영상을 합성한다. HuRo는 렌더링 기반이며 4.5절에서 생성 기반 pre-training과 확장성을 비교한다 |
| 대규모 사람 영상 action 지도 | VITRA, EgoScale, VideoDex, Hand-Object Interaction Pretraining | 사람 observation을 유지한 채 action 지도만 확장한다. HuRo는 observation도 함께 변환한다 |
| 결합 robotization | Phantom, DexUMI, WARPED, RwoR, MimicDreamer | observation과 action을 함께 로봇 형식으로 바꾸지만 과제가 미리 맞춰진 설정에서 검증됐다. HuRo는 이종 원천을 대상으로 확장한다 |
| 기반 policy와 학습 기법 | OpenVLA, GR00T N1, pi0, pi0.5 | GR00T-N1.6-3B를 backbone으로 쓰고 pi0.5와 GR00T N1.6을 참조 모델로 비교한다 |
| 영상 world model 기반 데이터 생성 | DreamGen, RoboCurate | I2V + IDM baseline의 근거가 되는 연구다 |

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| robotization | 사람 영상의 observation과 action을 대상 로봇 형식으로 함께 바꾸는 변환. HuRo는 visual conversion과 action conversion 두 처리로 구성한다 |
| HuRo dataset | 다섯 개 에고센트릭 사람 영상 원천을 robotization해 만든 63만 개 episode, 1억 4,220만 장 규모의 VLA pre-training 데이터셋 |
| chunk (HuRo) | manipulation 구간을 길이 상한 안에서 자른 시간 단위. 지시문 하나가 chunk 하나에 대응하고 episode 하나가 된다 |
| visual conversion | 눈에 보이는 사람 팔을 분할하고 inpainting으로 지운 뒤 렌더한 로봇을 합성해 robotization된 observation을 만드는 단계 |
| action conversion | 사람 손 동작을 로봇 base 좌표계로 옮겨 관절 trajectory로 retargeting하고 state 열에서 action 목표를 도출하는 단계 |
| no-overlay 변형 | 같은 retargeting action 지도를 쓰되 observation은 원본 사람 영상을 유지하는 통제 변형. visual robotization의 기여를 분리해 재기 위한 설정 |
| inpainting | 지워진 이미지 영역을 주변 맥락으로 그럴듯하게 채우는 복원 기법. HuRo는 ProPainter를 쓴다 |
| I2V + IDM | image-to-video 모델이 로봇 영상을 생성하고 Inverse Dynamics Model이 pseudo-action을 붙이는 영상 생성 기반 pre-training baseline |
| ALLEX | 7자유도 팔 두 개, 15자유도 손 두 개, 2자유도 목, 2자유도 허리를 갖춘 양팔 dexterous 로봇. HuRo dataset의 기본 대상 embodiment |
| OpenArm | HuRo가 embodiment 전이를 검증한 두 번째 로봇. XHand1 손을 달아 state와 action이 42차원이다 |
| completion score | 하위 목표 달성 개수를 최대값으로 정규화한 부분 점수. 이진 성공률보다 중간 단계 달성을 반영한다 |

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 2 | HuRo pre-training 전체 구상과 데이터 확장 경향 | caption-region | 별표 wiki 권장 (architecture) |
| fig02 | 3 | HuRo dataset 구축 파이프라인 3단계 | caption-region | 별표 wiki 권장 (method) |
| fig03 | 6 | 실제 manipulation 네 과제와 주요 결과 | caption-region | 별표 wiki 권장 (result) |
| fig04 | 6 | Cup Stacking 사례 분석과 OOD 설정 | caption-region | (확인 필요) |
| fig05 | 7 | end-to-end pre-training의 효과와 grasping 동작 비교 | caption-region | 별표 wiki 권장 (ablation) |
| fig06 | 8 | 영상 생성 기반 pre-training과의 확장 비교 | manual | 별표 wiki 권장 (ablation) |
| fig07 | 16 | HuRo 지시문 워드 클라우드 | caption-region | (확인 필요) |
| fig08 | 17 | OpenArm Fruit Pick-and-Place 실험 구성 | caption-region | (확인 필요) |
| fig09 | 18 | 네 가지 target embodiment robotization 비교 | caption-region | (확인 필요) |
| fig10 | 20 | 카메라 alignment 잔차 상위 구간과 고오차 사례 | caption-region | (확인 필요) |
| tab01 | 13 | ALLEX 실제 평가 구성표 | table-region | (확인 필요) |
| tab02 | 13 | ALLEX 네 과제 전체 결과표 | table-region | 별표 wiki 권장 (result) |
| tab03 | 14 | Masquerade 방식 robotization 비교 | table-region | (확인 필요) |
| tab04 | 14 | 사람 도메인 pre-training과의 OOD 비교 | table-region | (확인 필요) |
| tab05 | 15 | HuRo dataset 원천별 구성 | table-region | 별표 wiki 권장 (data) |
| tab06 | 15 | HuRo 변형별 커버리지 지표 | table-region | (확인 필요) |
| tab07 | 17 | OpenArm Fruit Pick-and-Place 결과 | table-region | (확인 필요) |
| tab08 | 18 | RTX 5090 기준 파이프라인 처리 비용 | table-region | (확인 필요) |
| tab09 | 19 | 코퍼스 수준 데이터 잔존율 | table-region | (확인 필요) |
| tab10 | 19 | 파이프라인 품질 진단 표 | table-region | 별표 wiki 권장 (quality) |
