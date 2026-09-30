---
title: "Beyond Data Scaling: Representation-Centric Continued Pre-training for Vision-Language-Action Models"
type: paper
year: 2026
category: physical-ai
raw_path: raw/papers/yang-2026-beyond-data-scaling-representation-centric-continued.pdf
raw_filename: "yang-2026-beyond-data-scaling-representation-centric-continued.pdf"
source_collection: external
authors: "Senqiao Yang, Chengyao Wang (project leader), Yuxin Chen, Zixuan Wang, Longxiang Tang, Haokun Gui, Jinhui Ye, Changsheng Lu, Xiaoyang Wu, Mingkang Zhu, Pengguang Chen, Shu Liu (교신), Zhuotao Tian, Hengshuang Zhao, Bei Yu, Jiaya Jia"
arxiv_id: "2608.27550"
url: "https://arxiv.org/abs/2608.27550"
tags: [physical-ai, vla, robot-learning, manipulation]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/yang-2026-beyond-data-scaling-representation-centric-continued/fig01.png
    raw: raw/papers/yang-2026-beyond-data-scaling-representation-centric-continued-figures/fig01.png
    caption: "VLAct 개요. 단일 action head로 학습한 naive VLA pre-training은 pre-training 장면에 과적합하는 반면, VLAct는 VLM 표현 보존, multi-head 지도, 통합 action 표현으로 새 과제와 embodiment, 환경, action head에 일반화한다"
    page: 3
    bbox_norm: [0.091, 0.1157, 0.9218, 0.3846]
    strategy: caption-region
    curated: false
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/yang-2026-beyond-data-scaling-representation-centric-continued/fig02.png
    raw: raw/papers/yang-2026-beyond-data-scaling-representation-centric-continued-figures/fig02.png
    caption: "pilot study. VLM backbone을 고정하고 pre-training과 fine-tuning의 action head를 바꾼 결과로, LIBERO-Plus에서 FAST로 pre-training하고 FAST로 fine-tuning하면 45.2%로 scratch보다 16.2%p 낮고, RoboTwin에서 OFT pre-training은 OFT fine-tuning을 75.8%로 올리지만 PI와 GR00T fine-tuning은 55.1%와 28.9%로 떨어뜨린다"
    page: 4
    bbox_norm: [0.0718, 0.0762, 0.8627, 0.2827]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/yang-2026-beyond-data-scaling-representation-centric-continued/fig03.png
    raw: raw/papers/yang-2026-beyond-data-scaling-representation-centric-continued-figures/fig03.png
    caption: "VLAct 학습 절차. pre-training에서 vision encoder와 얕은 LLM layer를 동결하고 caption 데이터를 섞으며(1), OFT와 GR00T와 PI 세 head가 같은 latent를 지도하고(2), 통합 action space와 wrap-aware loss를 쓴다(3). fine-tuning에서는 head를 새로 초기화하고 모델 전체를 학습한다(4)"
    page: 6
    bbox_norm: [0.1051, 0.0345, 0.9217, 0.3079]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/yang-2026-beyond-data-scaling-representation-centric-continued/fig04.png
    raw: raw/papers/yang-2026-beyond-data-scaling-representation-centric-continued-figures/fig04.png
    caption: "통합 action space 설계 비교. (a) embodiment별로 분리한 head, (b) 저차원 로봇을 padding으로 늘린 단순 통합 head, (c) AgileX 관절 12차원과 그리퍼 2차원, Franka end-effector 6차원과 그리퍼 1차원을 역할별 좌표에 배치하고 나머지를 padding한 부분 통합 표현"
    page: 7
    bbox_norm: [0.1373, 0.0833, 0.8627, 0.2183]
    strategy: caption-region
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/yang-2026-beyond-data-scaling-representation-centric-continued/fig05.png
    raw: raw/papers/yang-2026-beyond-data-scaling-representation-centric-continued-figures/fig05.png
    caption: "실제 로봇 평가와 미학습 embodiment 전이. (a) 단일 팔 단기 과제, (b) 단일 팔 long-horizon 과제, (c) 양팔 협응 과제에서 10회 시행 점수를 VLAct와 baseline으로 비교하고, (d) RoboCasa-GR1에서 downstream 데이터 10%, 20%, 50%, 100%일 때 41.42%, 49.5%, 51.0%, 54.0%를 기록한다"
    page: 12
    bbox_norm: [0.001, 0.0703, 0.8752, 0.4073]
    strategy: caption-region
    curated: true
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/yang-2026-beyond-data-scaling-representation-centric-continued/fig06.png
    raw: raw/papers/yang-2026-beyond-data-scaling-representation-centric-continued-figures/fig06.png
    caption: "layer별 attention 분포. sofa와 screen 질의에 대해 Layer0부터 Layer35까지의 attention을 이미지에 겹쳐 그렸으며, 얕은 layer는 넓은 시각 영역을 보고 깊은 layer는 의미상 관련된 영역에 집중한다"
    page: 22
    bbox_norm: [0.1373, 0.0833, 0.8627, 0.2756]
    strategy: caption-region
    curated: true
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/yang-2026-beyond-data-scaling-representation-centric-continued/fig07.png
    raw: raw/papers/yang-2026-beyond-data-scaling-representation-centric-continued-figures/fig07.png
    caption: "보조 VLM 데이터 예시. LLaVA-ReCap-CC3M과 ShareGPT4V의 상세 caption, RefCOCO와 COCO-ReM의 bounding box 질의응답, PixMo-Points와 RoboPoint의 point 질의응답, SenseNova-SI-800K의 공간 질의응답"
    page: 24
    bbox_norm: [0.1549, 0.2695, 0.8451, 0.8581]
    strategy: caption-region
    curated: false
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/yang-2026-beyond-data-scaling-representation-centric-continued/fig08.png
    raw: raw/papers/yang-2026-beyond-data-scaling-representation-centric-continued-figures/fig08.png
    caption: "보조 co-training 데이터별 LIBERO-Plus 성공률. baseline 75.0%, 로봇 데이터만 쓴 pre-training 79.6%, BBox-QA 80.2%, Point-QA 80.9%, Code 80.6%, Spatial-QA 81.9%, Image Caption 82.6%, 혼합 데이터 82.5%"
    page: 25
    bbox_norm: [0.1549, 0.0833, 0.8451, 0.3246]
    strategy: caption-region
    curated: true
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/yang-2026-beyond-data-scaling-representation-centric-continued/fig09.png
    raw: raw/papers/yang-2026-beyond-data-scaling-representation-centric-continued-figures/fig09.png
    caption: "비교한 네 가지 action head 구조. FAST는 action chunk를 이산 토큰으로 바꿔 VLM이 autoregressive로 생성하고, OFT는 MLP head가 연속 action을 병렬 회귀하며, PI와 GR00T는 VLM feature를 조건으로 받는 DiT 모듈이 flow matching으로 action chunk를 생성한다"
    page: 29
    bbox_norm: [0.1452, 0.0869, 0.858, 0.2414]
    strategy: caption-region
    curated: true
  - id: fig10
    label: Figure 10
    kind: figure
    file: assets/yang-2026-beyond-data-scaling-representation-centric-continued/fig10.png
    raw: raw/papers/yang-2026-beyond-data-scaling-representation-centric-continued-figures/fig10.png
    caption: "실제 로봇 실험 환경과 학습 데이터. (a) 외부 카메라와 손목 카메라를 단 Franka Research 3 플랫폼, (b) 11개 과제 묶음의 수집 데이터"
    page: 32
    bbox_norm: [0.1413, 0.0859, 0.8602, 0.2594]
    strategy: caption-region
    curated: false
  - id: fig11
    label: Figure 11
    kind: figure
    file: assets/yang-2026-beyond-data-scaling-representation-centric-continued/fig11.png
    raw: raw/papers/yang-2026-beyond-data-scaling-representation-centric-continued-figures/fig11.png
    caption: "실제 로봇 평가 과제 구성. in-domain 과제 11종과 새 물체, 과제 확장, 물체 전면 교체로 이뤄진 out-of-domain 과제"
    page: 32
    bbox_norm: [0.1414, 0.2947, 0.8591, 0.5786]
    strategy: caption-region
    curated: false
  - id: fig12
    label: Figure 12
    kind: figure
    file: assets/yang-2026-beyond-data-scaling-representation-centric-continued/fig12.png
    raw: raw/papers/yang-2026-beyond-data-scaling-representation-centric-continued-figures/fig12.png
    caption: "실제 로봇 과제별 학습 데이터를 timestep 순으로 나열한 시각화"
    page: 35
    bbox_norm: [0.2449, 0.1192, 0.7561, 0.851]
    strategy: caption-region
    curated: false
  - id: fig13
    label: Figure 13
    kind: figure
    file: assets/yang-2026-beyond-data-scaling-representation-centric-continued/fig13.png
    raw: raw/papers/yang-2026-beyond-data-scaling-representation-centric-continued-figures/fig13.png
    caption: "단일 팔 단기 과제의 추론 장면. in-domain 과제와 달걀, 고추, 마늘, 큐브로 물체를 바꾼 out-of-domain 과제를 함께 보인다"
    page: 36
    bbox_norm: [0.1612, 0.1924, 0.8429, 0.7523]
    strategy: caption-region
    curated: false
  - id: fig14
    label: Figure 14
    kind: figure
    file: assets/yang-2026-beyond-data-scaling-representation-centric-continued/fig14.png
    raw: raw/papers/yang-2026-beyond-data-scaling-representation-centric-continued-figures/fig14.png
    caption: "단일 팔 long-horizon 과제와 양팔 협응 과제의 추론 장면. 탁자 정리의 확장 버전과 물체 전면 교체 버전을 포함한다"
    page: 37
    bbox_norm: [0.1599, 0.1929, 0.845, 0.7506]
    strategy: caption-region
    curated: false
  - id: tab01
    label: Table 1
    kind: table
    file: assets/yang-2026-beyond-data-scaling-representation-centric-continued/tab01.png
    raw: raw/papers/yang-2026-beyond-data-scaling-representation-centric-continued-figures/tab01.png
    caption: "LIBERO-Plus 교란 항목별 성공률. 카메라, 로봇, 언어, 조명, 배경, noise, 배치 7개 항목에서 VLAct가 총점 82.6%로 가장 높다"
    page: 8
    bbox_norm: [0.1703, 0.1477, 0.8297, 0.3475]
    strategy: table-region
    curated: false
  - id: tab02
    label: Table 2
    kind: table
    file: assets/yang-2026-beyond-data-scaling-representation-centric-continued/tab02.png
    raw: raw/papers/yang-2026-beyond-data-scaling-representation-centric-continued-figures/tab02.png
    caption: "RoboTwin 2.0 성공률. 과제당 깨끗한 trajectory 50개만 쓰는 Base 설정과 무작위화 trajectory 500개를 더하는 Data Scaling 설정의 Clean과 Random 결과"
    page: 9
    bbox_norm: [0.2678, 0.1615, 0.7322, 0.4474]
    strategy: table-region
    curated: false
  - id: tab03
    label: Table 3
    kind: table
    file: assets/yang-2026-beyond-data-scaling-representation-centric-continued/tab03.png
    raw: raw/papers/yang-2026-beyond-data-scaling-representation-centric-continued-figures/tab03.png
    caption: "RoboDojo 공식 리더보드 상위 20개 policy의 항목별 점수와 성공률. VLAct는 35개 중 점수 8위, 성공률 6위다"
    page: 11
    bbox_norm: [0.1373, 0.1701, 0.8628, 0.4293]
    strategy: table-region
    curated: false
  - id: tab04
    label: Table 4
    kind: table
    file: assets/yang-2026-beyond-data-scaling-representation-centric-continued/tab04.png
    raw: raw/papers/yang-2026-beyond-data-scaling-representation-centric-continued-figures/tab04.png
    caption: "VLA-Arena 과제 범주별 성공률. VLAct가 Safety, Distractor, Extrapolation, Long-Horizon 네 범주 모두에서 가장 높고 평균 54.8%다"
    page: 21
    bbox_norm: [0.2648, 0.1477, 0.7352, 0.3332]
    strategy: table-region
    curated: false
  - id: tab05
    label: Table 5
    kind: table
    file: assets/yang-2026-beyond-data-scaling-representation-centric-continued/tab05.png
    raw: raw/papers/yang-2026-beyond-data-scaling-representation-centric-continued-figures/tab05.png
    caption: "DOMINO 동적 manipulation 35개 과제 결과. VLAct-OFT가 SR 18.50, MS 34.20으로 가장 높다"
    page: 21
    bbox_norm: [0.2648, 0.1477, 0.7352, 0.3332]
    strategy: table-region
    curated: false
  - id: tab06
    label: Table 6
    kind: table
    file: assets/yang-2026-beyond-data-scaling-representation-centric-continued/tab06.png
    raw: raw/papers/yang-2026-beyond-data-scaling-representation-centric-continued-figures/tab06.png
    caption: "shallow-layer protection ablation. 전체 갱신, vision encoder만 동결, vision encoder와 하위 절반 LLM layer 동결의 LIBERO-Plus와 RoboTwin 2.0 성공률"
    page: 22
    bbox_norm: [0.2581, 0.3951, 0.7419, 0.4736]
    strategy: table-region
    curated: false
  - id: tab07
    label: Table 7
    kind: table
    file: assets/yang-2026-beyond-data-scaling-representation-centric-continued/tab07.png
    raw: raw/papers/yang-2026-beyond-data-scaling-representation-centric-continued-figures/tab07.png
    caption: "pre-training에 섞은 보조 데이터 목록. caption, BBox-QA, Point-QA, Spatial-QA, 순수 언어 지시 데이터의 출처 데이터셋"
    page: 23
    bbox_norm: [0.2499, 0.4829, 0.7501, 0.6496]
    strategy: table-region
    curated: false
  - id: tab08
    label: Table 8
    kind: table
    file: assets/yang-2026-beyond-data-scaling-representation-centric-continued/tab08.png
    raw: raw/papers/yang-2026-beyond-data-scaling-representation-centric-continued-figures/tab08.png
    caption: "head 다양성과 decoder lock-in. PI를 downstream head로 둘 때 pre-training head 구성별 성공률과 scratch 대비 차이"
    page: 26
    bbox_norm: [0.2611, 0.134, 0.7389, 0.225]
    strategy: table-region
    curated: false
  - id: tab09
    label: Table 9
    kind: table
    file: assets/yang-2026-beyond-data-scaling-representation-centric-continued/tab09.png
    raw: raw/papers/yang-2026-beyond-data-scaling-representation-centric-continued-figures/tab09.png
    caption: "같은 head로 fine-tuning할 때 single-head pre-training과 head-diverse pre-training의 성공률 비교"
    page: 26
    bbox_norm: [0.1774, 0.2784, 0.8226, 0.3569]
    strategy: table-region
    curated: false
  - id: tab10
    label: Table 10
    kind: table
    file: assets/yang-2026-beyond-data-scaling-representation-centric-continued/tab10.png
    raw: raw/papers/yang-2026-beyond-data-scaling-representation-centric-continued-figures/tab10.png
    caption: "통합 관절 공간과 wrap-aware loss ablation. RoboTwin Base 설정 Clean 성공률이 75.5%, 78.6%, 80.5%로 오른다"
    page: 28
    bbox_norm: [0.2133, 0.1477, 0.7867, 0.2262]
    strategy: table-region
    curated: false
  - id: tab11
    label: Table 11
    kind: table
    file: assets/yang-2026-beyond-data-scaling-representation-centric-continued/tab11.png
    raw: raw/papers/yang-2026-beyond-data-scaling-representation-centric-continued-figures/tab11.png
    caption: "UMI 방식으로 수집한 이질 trajectory 2만 개를 추가한 효과. LIBERO-Plus 성공률이 82.6%에서 83.7%로 오른다"
    page: 28
    bbox_norm: [0.2133, 0.1477, 0.7867, 0.2262]
    strategy: table-region
    curated: false
  - id: tab12
    label: Table 12
    kind: table
    file: assets/yang-2026-beyond-data-scaling-representation-centric-continued/tab12.png
    raw: raw/papers/yang-2026-beyond-data-scaling-representation-centric-continued-figures/tab12.png
    caption: "통합 action 표현 설계 ablation. 분리 head, 통합 head, 통합 action 표현의 RoboTwin과 LIBERO-Plus 성공률"
    page: 31
    bbox_norm: [0.2993, 0.134, 0.7007, 0.2125]
    strategy: table-region
    curated: false
---

## 한 줄 요약 (One-line Summary)

VLAct는 pre-training된 Qwen3-VL-4B를 공개 로봇 데이터로 continued pre-training할 때 VLM 표현 보존(얕은 layer 동결과 caption 혼합), 세 연속 action head 동시 지도, 부분 통합 cross-embodiment action layout 세 가지를 적용해 downstream action head와 무관하게 재사용할 수 있는 VLA backbone을 만드는 레시피이며, 같은 downstream 조건에서 backbone 가중치만 바꿔 LIBERO-Plus 82.6%, VLA-Arena 54.8%, RoboTwin 2.0 92.5%를 기록한다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 제목 | Beyond Data Scaling: Representation-Centric Continued Pre-training for Vision-Language-Action Models |
| 저자 | Senqiao Yang, Chengyao Wang (project leader), Yuxin Chen, Zixuan Wang, Longxiang Tang, Haokun Gui, Jinhui Ye, Changsheng Lu, Xiaoyang Wu, Mingkang Zhu. 지도: Pengguang Chen, Shu Liu (교신), Zhuotao Tian, Hengshuang Zhao, Bei Yu, Jiaya Jia |
| 소속 표기 | StarVLA (논문 첫 장 로고) |
| 공개 | arXiv 2608.27550v1, 2026년 8월 27일 (cs.RO), 37쪽, CC BY 4.0 |
| 게재 | 코드 저장소 README 기준 NeurIPS 2026 채택 |
| 프로젝트 페이지 | https://starvla.github.io/VLAct |
| 코드 | [[physical-ai/starvla-vlact]] |
| 학습 자원 | 공개 데이터만 사용, GPU 16개 |

## 2. 주요 기여 (Key Contributions)

- VLA continued pre-training을 action 적합이 아니라 표현 학습으로 보는 관점을 제시한다. 로봇 데이터 예산이 고정된 상황에서 성능은 trajectory 수뿐 아니라 trajectory를 backbone 안의 재사용 가능한 시각-action 지식으로 얼마나 잘 바꾸는지에 달려 있다는 주장이다.
- pilot study로 naive continued pre-training의 실패 양상 세 가지를 분리한다. VLM prior 침식, 단일 head에 대한 과특화(decoder lock-in), 이산 토큰의 정보 손실이다.
- 세 실패 양상에 각각 대응하는 설계를 묶어 레시피로 제시한다. shallow-layer protection과 caption 혼합, OFT와 PI와 GR00T 세 연속 head의 동시 지도, 20차원 부분 통합 action layout과 wrap-aware loss다.
- downstream에서는 pre-training head를 버리고 새 head를 붙이므로, 모든 비교에서 바뀌는 것은 backbone 가중치뿐이다. 저자는 7.6~21.4점의 향상을 backbone 효과로 귀속한다.
- 공개 데이터와 GPU 16개로 ABot-M0, LingBot-VLA 같은 산업계 VLA를 LIBERO-Plus와 RoboTwin 2.0에서 앞서고, RoboDojo 리더보드 35개 policy 중 성공률 6위, 명시적 WAM 항목 전부보다 높은 성적을 낸다.
- 모델과 학습 파이프라인을 공개한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 문제 설정과 용어

로봇 trajectory는 웹에서 수집할 수 없고 실제 실행으로만 만들어진다. policy가 일반화해야 하는 공간(장면, 물체, 목표, embodiment, 접촉 dynamics)은 조합적이고 연속적이어서 대규모 로봇 데이터셋도 이 공간의 희소한 표본에 그친다. 저자는 데이터 규모 확대를 대체하려는 것이 아니라 그와 함께 무엇이 필요한지를 묻는다.

"continued pre-training"은 이미 pre-training된 VLM에서 출발해 downstream fine-tuning 전에 다양한 multi-embodiment 로봇 trajectory로 학습하는 단계를 가리킨다. π0, π0.5, GR00T N1/N1.5가 VLA pre-training이라고 부르는 단계와 같으며, 논문은 더 정확한 이름을 쓰되 문맥상 분명하면 pre-training으로 줄인다.

### 3.2 pilot study: action 지도가 backbone을 어떻게 바꾸는가

backbone을 Qwen3-VL-4B로 고정하고 pre-training과 fine-tuning에 쓰는 action head를 바꿔 LIBERO-Plus와 RoboTwin-Clean에서 비교했다 (Figure 2). head 종류는 이산 토큰 head(FAST), 회귀 head(OFT), flow matching head(PI), diffusion 계열 연속 head(GR00T)다.

| 벤치마크 | pre-training → fine-tuning | 성공률 (%) | scratch 대비 |
|---|---|---|---|
| LIBERO-Plus | scratch → FAST | 61.4 | 기준 |
| LIBERO-Plus | FAST → FAST | 45.2 | −16.2 |
| LIBERO-Plus | scratch → GR00T | 75.9 | 기준 |
| LIBERO-Plus | FAST → GR00T | 76.7 | +0.8 |
| LIBERO-Plus | GR00T → GR00T | 80.8 | +4.9 |
| RoboTwin | scratch → OFT | 61.7 | 기준 |
| RoboTwin | OFT → OFT | 75.8 | +14.1 |
| RoboTwin | scratch → PI | 60.5 | 기준 |
| RoboTwin | OFT → PI | 55.1 | −5.4 |
| RoboTwin | scratch → GR00T | 51.2 | 기준 |
| RoboTwin | OFT → GR00T | 28.9 | −22.3 |

- 이산 지도는 전이되지만 이산화로 정보를 잃는다. FAST로 pre-training한 backbone에 GR00T head를 붙이면 scratch보다 조금 낫지만, FAST head를 그대로 쓰면 연속 head보다 크게 낮고 FAST pre-training도 그 차이를 메우지 못한다. 저자는 이산 action 토큰이 대략적인 구조는 가르치지만 manipulation에 중요한 세밀한 시간과 진폭 정보를 잃는다고 해석한다.
- 단일 연속 head 지도는 head별 표현 붕괴를 부른다. OFT pre-training은 같은 OFT fine-tuning을 크게 올리지만 같은 backbone에 PI나 GR00T를 붙이면 scratch보다 낮아진다. action 정보가 사라진 것이 아니라 pre-training head의 feature 기하에 맞춰 조직돼 다른 head가 읽기 어려워졌다는 해석이며, 같은 head 성능이 backbone 재사용성을 과대평가한다고 본다.
- 결론적으로 전이 가능한 backbone은 세밀한 action 정보를 유지하면서 여러 downstream head를 지원해야 한다.

### 3.3 전체 레시피

continued pre-training 단계 (Figure 3):

1. vision encoder와 LLM 하위 layer를 동결하고 로봇 trajectory에 caption 데이터를 섞는다.
2. 로봇 샘플은 OFT, PI, GR00T 세 연속 head를 통해 공유 backbone을 지도한다.
3. 부분 통합 action layout에서 비활성 차원을 mask하고 wrap-aware loss를 쓴다.

fine-tuning 단계에서는 pre-training head와 caption 흐름을 버리고, 새로 초기화한 과제별 action head를 붙여 각 baseline과 같은 downstream 조건으로 학습한다. 모델 전체를 동결 해제한다. 따라서 향상은 미리 적응된 head가 아니라 학습된 backbone 표현에서 온다.

### 3.4 VLM 표현 보존

동기: 로봇 데이터는 비싸고 시각 다양성이 좁으며 제한된 manipulation 장면에 몰려 있다. end-to-end continued pre-training은 pre-training 분포의 action 예측은 올리지만 backbone을 전이 가능하게 만드는 일반 시각-언어 feature를 훼손할 수 있다.

shallow-layer protection: pre-training 동안 vision encoder 전체와 LLM layer 하위 절반을 동결하고 상위 LLM layer와 action head만 갱신한다. 저수준 시각 처리와 초기 시각-언어 alignment를 맡는 부분을 보호하려는 것이다. 저장소 README는 LLM layer 0~17 동결로 적는다. layer별 attention 시각화(Figure 6, Layer0~Layer35)에서 얕은 layer는 넓은 시각 영역을, 깊은 layer는 의미상 관련 영역을 본다는 관찰이 근거다.

| pre-training 갱신 방식 | LIBERO-Plus | RoboTwin 2.0 |
|---|---|---|
| backbone 전체 갱신 | 78.9 | 77.1 |
| vision encoder만 동결 | 81.3 | 79.3 |
| vision encoder와 하위 절반 LLM 동결 | 82.6 | 80.5 |

전체 갱신 대비 3.7점과 3.4점 향상이다 (Table 6).

caption 혼합 pre-training: 매 minibatch에 로봇 샘플과 보조 샘플을 함께 넣고 L_total = L_action + 0.5 L_VLM-CE로 최적화한다. 저자는 caption이 물체, 속성, 공간 관계, 장면 맥락에 대한 촘촘한 지도를 주고 원래 VLM pre-training 분포와 가깝다는 점을 이유로 든다. 보조 데이터는 표현 anchor이자 feature 갱신의 다양성 원천 두 역할을 한다.

보조 데이터 구성 (Table 7):

| 유형 | 데이터셋 | 역할 |
|---|---|---|
| Image Caption | LLaVA-ReCap-CC3M, LLaVA OneVision (본문은 ShareGPT4V도 언급) | 의미 grounding 보존 |
| BBox-QA | RefCOCO, COCO-ReM | 국소 visual grounding. 좌표는 Qwen3-VL의 0~1000 규약으로 정규화 |
| Point-QA | PixMo-Points, RoboPoint | point 기반 grounding. RoboPoint는 공간 affordance 예측 |
| Spatial-QA | SenseNova-SI-800K | 상대 위치, 방향, 시점. 단일 이미지만 사용 |
| 순수 언어 지시 | Nemotron-SFT-Instruction-Following-Chat-v2 | 로봇과 무관한 대조 신호 |

grounding 샘플은 box나 point를 최대 10개로 제한하고 과도하게 큰 이미지와 긴 샘플을 걸렀다.

보조 데이터별 LIBERO-Plus 결과 (Figure 8, 로봇 데이터와 모델과 예산 고정):

| 설정 | 성공률 (%) |
|---|---|
| baseline | 75.0 |
| + pre-training (로봇 데이터만) | 79.6 |
| + BBox-QA | 80.2 |
| + Point-QA | 80.9 |
| + Code (본문의 순수 언어 지시 데이터에 해당하는 막대로 보인다) | 80.6 |
| + Spatial-QA | 81.9 |
| + Image Caption | 82.6 |
| + 혼합 데이터 | 82.5 |

본문은 "caption이 baseline 75.0을 82.6으로 올린다"고 적는다. 그림의 막대 위 수치(+4.6, +7.6 등)는 모두 baseline 75.0 대비 차이다. 75.0은 Table 1의 Qwen3VL-OFT 총점과 같아 continued pre-training을 하지 않은 모델로 읽히며, 로봇 데이터만 쓴 pre-training은 79.6이다. 순수 언어 데이터도 향상을 준다는 점을 저자는 보조 co-training이 과제 전이만이 아니라 표현 보존과 다양화로 작동한다는 증거로 본다. 혼합 데이터가 caption 단독보다 0.1점 낮은 이유는 전체 step 수가 고정돼 caption 샘플링 빈도가 줄었기 때문으로 해석한다.

### 3.5 action 표현의 alignment와 다양화

설계 원칙: backbone은 head 전이를 지원해야 하고(downstream 사용자가 embodiment와 배치 조건에 맞는 head를 붙일 수 있어야 한다), 단순 head 적합이 아니라 품질 높은 action feature를 배워야 한다.

multi-head 동시 지도: 공유 backbone이 같은 입력에서 latent z를 만들고, OFT, PI, GR00T 세 head가 같은 z를 받아 같은 정답 action chunk a를 예측한다. L_action = L_OFT + L_PI + L_GR00T. 세 head가 backbone forward 한 번을 공유하므로 추가 비용은 가벼운 head 계산뿐이다. 새 head나 별도 alignment 모듈은 없고 head 다양성 자체가 지도 신호다. 세 head가 같은 문제에 서로 다른 목적과 디코더 편향을 부과하므로 backbone은 한 head만 쓸 수 있는 feature에 기댈 수 없다.

동시 지도의 두 역할은 head 비의존성을 높여 다른 head로의 전이를 개선하는 것과, 표현을 정규화해 같은 head를 쓸 때도 더 강한 feature를 주는 것이다.

decoder lock-in 진단 (Table 8, RoboTwin, downstream head는 PI):

| pre-training head | PI를 pre-training에서 봤는가 | PI fine-tuning | scratch 대비 |
|---|---|---|---|
| 없음 | 해당 없음 | 60.5 | 해당 없음 |
| OFT | 아니오 | 55.1 | −5.4 |
| OFT + GR00T | 아니오 | 63.1 | +2.6 |
| OFT + PI + GR00T | 예 | 77.0 | +16.5 |

저자는 decoder lock-in 판단에 더 의미 있는 비교가 OFT 단독과 OFT + GR00T 사이라고 강조한다. 두 번째 head를 더하면 pre-training에서 보지 않은 PI의 결과가 scratch 아래에서 위로 바뀐다. 향상 폭은 작다고 스스로 적는다.

같은 head 적응 (Table 9):

| fine-tuning head | scratch | single-head pre-training | head-diverse pre-training | single 대비 |
|---|---|---|---|---|
| OFT | 61.7 | 78.8 | 80.5 | +1.7 |
| PI | 60.5 | 75.4 | 77.0 | +1.6 |
| GR00T | 51.2 | 71.7 | 76.0 | +4.3 |

pre-training 자체의 효과보다 작지만 multi-head 지도가 같은 head 적응을 해치지 않는다는 근거다.

### 3.6 네 action head의 정의 (부록 I.1)

| head | action 인터페이스 | 학습 목표 | 특징 |
|---|---|---|---|
| FAST | autoregressive 이산 action 토큰 | next-token prediction | action chunk를 주파수 영역 등 압축 기저로 표현한 뒤 이산화. VLM의 언어 모델링 형태를 유지하지만 순차 디코딩이 필요하다 |
| OFT | 병렬 연속 회귀 | action query 토큰의 hidden state에 작은 MLP를 붙여 L1 회귀 | chunk 전체를 forward 한 번에 예측. 점 추정이라 다봉 분포는 표현하지 못한다 |
| PI | flow matching action expert | 선형 확률 경로에서 속도장 회귀 (target은 A − ε) | Gaussian noise에서 적분해 생성. 반복 생성이라 비싸지만 풍부한 연속 분포 표현 |
| GR00T | dual-system flow matching 모터 모듈 | PI와 같은 형태에 robot state s와 embodiment 식별자 e를 조건으로 추가 | state와 action을 별도 DiT 모터 모듈에 임베딩하고 VLM 토큰에 cross-attention |

### 3.7 embodiment 간 action 표현 통합

동기: embodiment마다 별도 head나 출력 projector를 붙이면 유연하지만 공유 가능한 action 구조가 head 안에 숨는다. 두 embodiment가 물리적으로 의미 있는 차원을 공유하면 그 차원의 지도도 공유해야 하고, 아니면 인위적으로 맞추지 않는다.

비교한 세 설계 (Figure 4): embodiment별 head 분리, 저차원 로봇을 padding한 완전 통합, 물리적으로 비교 가능한 차원만 통합한 부분 통합(VLAct 채택).

20차원 layout (부록 I.2):

| 차원 | 의미 | 표현 |
|---|---|---|
| 1~6 | 양팔 embodiment(AgileX)의 왼팔 6-DoF | 절대 관절 각도 |
| 7~12 | 양팔 embodiment의 오른팔 6-DoF | 절대 관절 각도 |
| 13~18 | 단일 팔 embodiment(Franka)의 6-DoF | delta end-effector pose |
| 19 | 공유 그리퍼 좌표 (Franka 그리퍼, AgileX 왼쪽 그리퍼) | 0~1 정규화 |
| 20 | 양팔 embodiment의 오른쪽 그리퍼 | 0~1 정규화 |

각 샘플은 자기 embodiment의 활성 차원에서만 손실을 내고 나머지는 mask한다. embodiment adapter, router, embodiment 조건 디코더를 두지 않는다. 각 코퍼스의 원래 저수준 action 규약(Franka는 delta EEF, AgileX는 절대 관절 각도)은 그대로 둔다.

| action space 설계 (Table 12) | RoboTwin | LIBERO-Plus |
|---|---|---|
| 분리 head | 78.5 | 81.1 |
| 통합 head (alignment 없음) | 79.5 | 81.4 |
| 통합 action 표현 | 80.5 | 82.6 |

wrap-aware loss (부록 F): 절대 관절 각도는 주기 공간 위에 있다. 데이터 쪽에서는 모든 절대 관절 각도를 a_wrap = ((a + π) mod 2π) − π로 [−π, π]에 넣어 통합 관절 공간을 만들고, 손실 쪽에서는 예측과 정답의 잔차도 δ_wrap = ((â − a) + π) mod 2π − π로 감싼 뒤 L1 penalty |δ_wrap|를 각 head의 원래 목표에 더한다. 179°와 −179°를 358°가 아니라 2° 차이로 본다. GR00T와 PI는 중간 noise 예측이나 속도 target이 아니라 생성 과정을 마친 최종 action 샘플에 적용한다. 그리퍼와 delta EEF 이동 같은 비주기 차원은 제외한다.

| 설정 (Table 10, RoboTwin Base, Clean) | 통합 관절 공간 | wrap loss | 성공률 |
|---|---|---|---|
| baseline (원래 관절 각도 회귀) | | | 75.5 |
| 통합 관절 공간 | ✓ | | 78.6 |
| 통합 관절 공간 + wrap-aware loss | ✓ | ✓ | 80.5 |

### 3.8 pre-training 데이터와 정제 (부록 H)

- 데이터: DROID(v1.0.0과 v1.0.1), MolmoAct(Franka 단일 팔, 7차원 = delta EEF 6 + 그리퍼 1), InternData-A1, RoboCoin(AgileX 양팔, 14차원 = 절대 관절 각도 12 + 그리퍼 2), 그리고 caption 데이터. 모두 공개 데이터다.
- 코드베이스는 StarVLA, base VLM은 Qwen3-VL-4B, GPU 16개.
- 정제 1단계: unknown_task, n/a, none, no action, 공백, 빈 문자열 같은 무효 과제 이름을 가진 trajectory나 샘플을 제거한다.
- 정제 2단계: 비정상적으로 큰 action이 많은 action chunk를 거른다.
- delta EEF alignment: 데이터셋마다 FPS가 다르므로 delta를 FPS로 환산해 초당 표현으로 통일한다. 이동 속도 절대값 0.5 초과 또는 회전 속도 1.0 초과 step을 무효로 표시하고, trajectory 전체를 버리지 않고 step 단위로 mask한다. chunk의 무효 step 비율이 0.5를 넘을 때만 chunk를 버린다. 이후 이동과 회전 성분을 각각 0.5와 1.0으로 나눠 정규화한다.
- 절대 관절 각도: [−2π, 2π] 밖 값을 제거하고 [−π, π]로 감싼다. 추가 정규화는 하지 않는다.
- 그리퍼: 극단 이상치를 제거하고 데이터셋별 min-max 정규화로 [0, 1]에 맞춘다.

### 3.9 이질 데이터 추가 실험 (부록 G)

10Kh-RealOmin-OpenData(UMI 방식 휴대 장치로 수집한 실제 manipulation 코퍼스)에서 연속성과 재생 가능성을 기준으로 trajectory 2만 개를 골라 delta EEF로 변환해 추가했다. 다른 설정은 모두 같다. LIBERO-Plus가 82.6에서 83.7로 1.1점 올랐다 (Table 11). 저자는 embodiment와 수집 방식이 다른 데이터를 가벼운 필터링만으로 흡수할 수 있다는 증거로 해석한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 matched baseline 비교 요약

비교 대상 Qwen3-VL-OFT(Qwen3VL-OFT)는 같은 backbone 계열과 같은 downstream head, 초기화, 데이터, optimizer, 예산을 쓰고 backbone 가중치만 다르다.

| 벤치마크 | VLAct | Qwen3-VL-OFT | 차이 |
|---|---|---|---|
| LIBERO-Plus | 82.6% | 75.0% | +7.6 |
| VLA-Arena | 54.8% | 33.4% | +21.4 |
| RoboTwin 2.0 Base Clean | 80.5% | 61.7% | +18.8 |
| RoboTwin 2.0 Data Scaling Clean / Random | 92.5% / 90.8% | 88.2% / 88.3% | +4.3 / +2.5 |
| DOMINO SR / MS | 18.50 / 34.20 | 10.86 / 30.49 | +7.64 / +3.71 |

### 4.2 LIBERO-Plus (Franka 단일 팔, Table 1)

표준 LIBERO로 학습하고 교란된 test set에서 평가한다. baseline 수치는 LIBERO-Plus 논문에서 가져왔다.

| 방법 | Camera | Robot | Lang. | Light | Bg. | Noise | Layout | Total |
|---|---|---|---|---|---|---|---|---|
| OpenVLA | 0.8 | 3.5 | 23.0 | 8.1 | 34.8 | 15.2 | 28.5 | 15.6 |
| OpenVLA-OFT | 56.4 | 31.9 | 79.5 | 88.7 | 93.3 | 75.8 | 74.2 | 69.6 |
| NORA | 2.2 | 37.0 | 65.1 | 45.7 | 58.6 | 12.8 | 62.1 | 39.0 |
| WorldVLA | 0.1 | 27.9 | 41.6 | 43.7 | 17.1 | 10.9 | 38.0 | 25.0 |
| UniVLA | 1.8 | 46.2 | 69.6 | 69.0 | 81.0 | 21.2 | 31.9 | 42.9 |
| π0 | 13.8 | 6.0 | 58.8 | 85.0 | 81.4 | 79.0 | 68.8 | 53.6 |
| π0-FAST | 65.1 | 21.6 | 61.0 | 73.2 | 73.2 | 74.4 | 68.8 | 61.6 |
| RIPT-VLA | 55.2 | 31.2 | 77.5 | 88.3 | 91.6 | 73.5 | 74.2 | 68.4 |
| Abot-M0 | 60.4 | 67.9 | 86.4 | 96.2 | 91.6 | 86.4 | 82.6 | 80.5 |
| Qwen3VL-OFT | 47.0 | 60.1 | 87.0 | 96.3 | 95.3 | 73.1 | 79.2 | 75.0 |
| VLAct | 73.9 | 68.4 | 81.5 | 96.7 | 96.7 | 86.0 | 83.3 | 82.6 |

VLAct는 Abot-M0(Alibaba)를 2.1점 앞선다. Qwen3VL-OFT 대비 향상은 Camera, Robot, Noise, Layout에서 크다. Language 항목은 Qwen3VL-OFT(87.0)와 Abot-M0(86.4)보다 낮다(81.5).

### 4.3 VLA-Arena (Franka, 부록 Table 4)

난이도 L0/L1/L2 평균, 전체 평균은 공식 11개 suite 가중치를 따른다.

| 방법 | Safety | Distractor | Extrap. | Long-H. | 평균 |
|---|---|---|---|---|---|
| SmolVLA | 16.5 | 21.0 | 10.0 | 24.7 | 16.3 |
| π0-FAST | 34.1 | 39.0 | 4.2 | 20.7 | 25.6 |
| GR00T-N1.6 | 32.8 | 40.7 | 16.7 | 10.3 | 27.8 |
| Qwen3-VL-π | 38.3 | 45.3 | 22.4 | 25.3 | 34.1 |
| UniVLA | 45.5 | 41.3 | 31.1 | 22.0 | 38.7 |
| OpenVLA | 41.9 | 43.0 | 36.7 | 26.7 | 39.3 |
| OpenVLA-OFT | 43.2 | 52.3 | 30.4 | 26.7 | 39.9 |
| π0 | 49.7 | 43.7 | 32.7 | 31.3 | 42.3 |
| π0.5 | 51.5 | 54.0 | 31.1 | 29.0 | 44.3 |
| Qwen3-VL-OFT | 36.1 | 40.0 | 24.7 | 32.7 | 33.4 |
| VLAct | 63.2 | 64.0 | 36.9 | 50.0 | 54.8 |

π0.5 대비 10.5점, 특히 Long-Horizon 21.0점과 Safety 11.7점 차이다.

### 4.4 RoboTwin 2.0 (AgileX 양팔, Table 2)

Base는 과제당 깨끗한 trajectory 50개, Data Scaling은 과제당 무작위화 전문가 trajectory 500개를 추가한다(공식 demo_randomized, 배경과 잡동사니와 탁자 높이와 조명 등 변경, 무작위 action rollout이 아니다). 과제 50개, 과제당 100 episode 평가. Data Scaling 비교는 깨끗한 시연 데이터 2,500개와 무작위화 시연 데이터 2만 5,000개의 multi-task 규약을 따르지만 방법마다 학습 연산량과 checkpoint 선택은 다를 수 있다.

| 방법 | 계열 | Base Clean | Base Random | Scaling Clean | Scaling Random |
|---|---|---|---|---|---|
| π0 | Flow | 46.4 | 16.4 | 65.9 | 58.4 |
| π0.5 | Flow | 60.2 | – | 82.7 | 76.8 |
| X-VLA | Flow | 70.0 | 39.0 | 72.8 | 72.8 |
| Lingbot-VLA | Flow | – | – | 88.6 | 86.7 |
| Abot-M0 | AML | – | – | 86.1 | 85.1 |
| InternVLA-A1 | Flow | – | – | 89.4 | 89.6 |
| Being-H0.7 | Flow | – | – | 90.2 | 89.6 |
| Motus | WAM | – | – | 88.7 | 87.0 |
| Fast-WAM | WAM | – | – | 91.9 | 91.8 |
| HoloBrain-0-QW | Diff. | – | – | 91.9 | 92.3 |
| Qwen3VL-OFT | OFT | 61.7 | 10.5 | 88.2 | 88.3 |
| VLAct | OFT | 80.5 | 41.5 | 92.5 | 90.8 |
| VLAct | GR00T | 76.0 | 22.9 | 89.6 | 87.4 |
| VLAct | PI | 77.0 | 23.7 | 93.0 | 88.8 |

- Base 설정에서 비교 방법 중 가장 높다. 깨끗한 데이터로만 fine-tuning했는데 Random에서도 41.5%로 Qwen3VL-OFT(10.5%)보다 높아, clean에서 random으로의 일반화도 개선된다고 본다.
- Data Scaling에서 VLAct-OFT 92.5/90.8은 InternVLA-A1, Being-H0.7, Motus, LingBot-VLA, ABot-M0, π0.5보다 높고 HoloBrain-0과 Fast-WAM에 근접한다. 저자는 절대적 state of the art라고 주장하지 않는다고 명시한다.
- head별 차이는 3.4점 이내이며, Clean 최고는 PI head의 93.0%다. 기본 설정은 OFT다.

### 4.5 DOMINO (AgileX 동적 manipulation, 부록 Table 5)

움직이는 물체와 변하는 환경을 다루는 35개 과제, clean dynamic 설정.

| 모델 | backbone | SR | MS |
|---|---|---|---|
| OpenVLA | Llama-2 | 1.54 | 6.10 |
| RDT-1B | DiT-1B | 5.34 | 17.71 |
| π0 | PaliGemma | 8.17 | 23.96 |
| π0-FAST | PaliGemma | 3.54 | 20.87 |
| π0.5 | PaliGemma | 9.63 | 26.17 |
| InternVLA-M1 | InternVL | 5.40 | 27.57 |
| OpenVLA-OFT | Llama-2 | 9.06 | 24.06 |
| Qwen3VL-OFT | Qwen3-VL | 10.86 | 30.49 |
| VLAct-OFT | Qwen3-VL | 18.50 | 34.20 |

### 4.6 실제 로봇 실험 (Figure 5, 부록 J)

- 하드웨어: 탁자 고정 Franka Research 3 7-DoF 팔(단일 팔 1대, 양팔 2대). 외부 Intel RealSense D435 1대, 팔마다 손목 RealSense D405. 이미지는 224×224로 줄인다.
- 데이터: GELLO 인터페이스 teleoperation으로 수집, 물체 배치와 팔 초기 자세를 episode마다 무작위화. 단일 팔 과제당 시연 50개, 양팔 과제당 100개. 과제 묶음 11개.
- 학습: 단일 팔 모델과 양팔 모델을 따로 학습, 각 5만 step, H800 GPU 8개. VLAct와 baseline(pre-training 없는 Qwen3VL-4B-OFT)은 같은 시연, head, optimizer, 예산을 쓴다.
- 평가: 과제마다 고정된 초기 설정 10개에서 시행. 단기 과제와 양팔 과제는 성공 1점 실패 0점, long-horizon은 완료 단계 수로 점수(탁자 정리는 3단계, 단계당 0.33점).

과제별 성공률 (Figure 5 막대의 10회 기준 점수를 %로 환산):

| 범주 | 과제 | VLAct | baseline |
|---|---|---|---|
| 단일 팔 단기 (ID) | Carrot from pot | 100 | 100 |
| 단일 팔 단기 (ID) | Button pressing | 100 | 90 |
| 단일 팔 단기 (ID) | Cube stacking | 90 | 60 |
| 단일 팔 단기 (ID) | Pen in cup | 80 | 60 |
| 단일 팔 단기 (ID) | 평균 | 92.5 | 77.5 |
| 단기 OOD | Novel object from pot (달걀, 고추, 마늘) | 90.0 | 73.3 |
| 단기 OOD | Novel object in cup (큐브, 달걀) | 90.0 | 65.0 |
| 단일 팔 long-horizon (ID) | Table cleaning | 86.6 | 73.3 |
| 단일 팔 long-horizon (ID) | Scoop beans | 80.0 | 33.3 |
| long-horizon OOD | Extended table cleaning (장난감 닭 추가) | 82.5 | 47.5 |
| long-horizon OOD | Full substitution (큐브, 장난감 닭, 고추) | 83.3 | 46.6 |
| 양팔 협응 | Unplugging | 80 | 60 |
| 양팔 협응 | Breakfast preparation | 90 | 70 |
| 양팔 협응 | Fold pants | 70 | 40 |
| 양팔 협응 | Banana handover-place | 70 | 30 |
| 양팔 협응 | Fold towel | 50 | 20 |
| 양팔 협응 | 평균 | 72.0 | 44.0 |

Figure 5의 long-horizon 막대 수치 중 Extended 8.25와 Full substitution 8.33은 본문의 82.5%와 83.3%와 일치하고, baseline 4.75와 4.66은 47.5%와 46.6%에 대응한다.

실패 분석:

- Cube stacking: baseline은 cube가 학습 분포에서 덜 다룬 위치에 있으면 추론 중 멈춘다.
- Pen in cup: VLAct는 탁자 뒤쪽 컵도 찾지만 baseline은 grasping 실패 후 오차가 쌓여 불안정한 복구 동작에 빠진다.
- Scoop beans: baseline은 떠내기 단계를 건너뛰고 빈 숟가락으로 붓는 동작을 한다.
- 어수선한 탁자 정리: baseline은 작은 물체를 놓친다.
- Fold pants: baseline은 천의 잡을 지점을 부정확하게 골라 그리퍼가 탁자와 부딪히거나 들어 올리기에 실패한다.
- Fold towel: baseline은 두 팔의 속도가 맞지 않아 한쪽 그리퍼에서 수건이 미끄러진다.
- 본문은 "단일 팔 데이터로만 pre-training했는데도 양팔 협응으로 전이된다"고 적는다. 다만 pre-training 혼합에는 AgileX 양팔 데이터가 포함돼 있어, 이 서술은 Franka 양팔 구성을 가리키는 것으로 읽힌다.

### 4.7 미학습 embodiment 전이

continued pre-training은 Franka 단일 팔과 AgileX 양팔 데이터만 쓰며 GR-1 humanoid와 ARX X5 양팔 플랫폼은 제외된다.

RoboCasa-GR1 (VLAct-OFT fine-tuning):

| downstream 데이터 비율 | VLAct |
|---|---|
| 10% | 41.42 |
| 20% | 49.5 |
| 50% | 51.0 |
| 100% | 54.0 |

전체 데이터 baseline은 Qwen3VL-OFT 48.8, GR00T-N1.6 47.6, π0.5 37.0이다. 데이터 20%만으로 전체 데이터 GR00T-N1.6과 Qwen3VL-OFT를 넘는다.

RoboDojo (ARX X5 시뮬레이션 42개 과제, 과제당 50 episode, Generalization, Precision, Long-Horizon, Memory, Open 능력, 2026년 8월 24일 공식 리더보드, 셀은 부분 진행 점수 / 성공률):

| 방법 | Gen.-Std. | Gen.-Rand. | Precision | Long-Horizon | Memory | Open | 평균 |
|---|---|---|---|---|---|---|---|
| DM0.5 | 23.49 / 18.00 | 8.06 / 4.00 | 24.82 / 16.75 | 33.70 / 19.50 | 47.74 / 47.44 | 2.43 / 2.08 | 24.90 / 19.34 |
| GalaxeaVLA (G0.5) | 26.74 / 20.00 | 11.16 / 6.00 | 28.25 / 20.42 | 44.12 / 32.25 | 8.61 / 7.33 | 1.73 / 1.58 | 20.23 / 14.88 |
| Xiaomi-Robotics-1 | 35.65 / 28.00 | 11.44 / 6.00 | 26.69 / 18.83 | 38.39 / 23.67 | 7.81 / 6.56 | 3.94 / 3.58 | 20.07 / 13.93 |
| Hy-Embodied-0.5-VLA | 21.98 / 17.00 | 1.57 / 0.00 | 13.81 / 8.00 | 25.74 / 14.92 | 13.37 / 12.11 | 0.65 / 0.58 | 13.07 / 8.80 |
| Spatial Forcing | 21.25 / 15.00 | 6.98 / 4.00 | 17.33 / 10.58 | 23.26 / 14.58 | 5.43 / 4.11 | 1.78 / 1.58 | 12.38 / 8.04 |
| π0.5 | 20.93 / 15.00 | 5.82 / 1.00 | 12.40 / 5.50 | 23.54 / 14.67 | 5.78 / 4.56 | 1.98 / 1.67 | 11.41 / 6.91 |
| InternVLA-A1.5 | 16.81 / 12.00 | 3.90 / 2.00 | 15.23 / 10.17 | 23.80 / 13.75 | 4.93 / 3.56 | 1.43 / 1.42 | 11.15 / 7.14 |
| VLAct | 16.33 / 12.00 | 2.74 / 1.00 | 20.62 / 15.25 | 20.12 / 13.67 | 0.66 / 0.56 | 2.37 / 2.25 | 10.66 / 7.60 |
| X-VLA | 17.90 / 12.00 | 3.04 / 1.00 | 18.32 / 12.00 | 16.53 / 9.75 | 4.76 / 3.56 | 0.55 / 0.50 | 10.13 / 6.52 |
| X-WAM (WAM) | 11.24 / 5.00 | 3.54 / 1.00 | 6.72 / 1.83 | 17.47 / 9.08 | 6.32 / 4.67 | 0.57 / 0.25 | 7.69 / 3.83 |
| Xiaomi-Robotics-0 | 13.81 / 11.00 | 1.05 / 0.00 | 8.42 / 4.58 | 13.51 / 6.92 | 5.07 / 3.67 | 0.22 / 0.17 | 6.93 / 4.18 |
| StarVLA-α | 7.54 / 5.00 | 0.33 / 0.00 | 9.90 / 4.33 | 14.15 / 6.50 | 3.34 / 2.44 | 0.68 / 0.58 | 6.40 / 3.24 |
| GigaWorld-Policy-0 (WAM) | 10.28 / 6.00 | 0.41 / 0.00 | 6.15 / 1.83 | 15.51 / 8.92 | 3.46 / 2.22 | 0.54 / 0.50 | 6.20 / 3.27 |
| GalaxeaVLA (G0) | 8.71 / 6.00 | 0.36 / 0.00 | 8.10 / 3.83 | 12.60 / 5.58 | 3.17 / 1.89 | 0.70 / 0.67 | 5.82 / 2.96 |
| LingBot-VLA | 10.88 / 8.00 | 2.55 / 1.00 | 5.33 / 1.83 | 10.89 / 5.25 | 3.82 / 2.78 | 0.72 / 0.67 | 5.50 / 2.96 |
| EventVLA | 6.68 / 3.00 | 1.22 / 0.00 | 10.13 / 5.75 | 5.05 / 0.83 | 4.92 / 4.78 | 0.80 / 0.75 | 4.97 / 2.81 |
| AHA-WAM (WAM) | 10.32 / 6.00 | 1.26 / 0.00 | 5.86 / 2.42 | 8.61 / 2.67 | 2.97 / 2.78 | 0.88 / 0.83 | 4.82 / 2.39 |
| ABot-M0 | 9.20 / 5.00 | 2.26 / 2.00 | 5.50 / 1.75 | 3.96 / 0.50 | 2.44 / 2.22 | 0.72 / 0.67 | 3.67 / 1.73 |
| Fast-WAM (WAM) | 4.33 / 2.00 | 0.34 / 0.00 | 1.96 / 0.00 | 9.14 / 5.17 | 3.55 / 3.44 | 0.42 / 0.42 | 3.48 / 2.03 |
| π0 | 7.18 / 5.00 | 0.71 / 0.00 | 3.56 / 0.75 | 6.19 / 2.00 | 3.47 / 2.11 | 0.25 / 0.25 | 3.48 / 1.53 |

- VLAct는 35개 중 평균 점수 8위, 성공률 6위로 두 지표 모두 상위 4분의 1이다.
- 명시적 WAM 4개 중 가장 높은 X-WAM보다 점수 2.97점, 성공률 3.77%p 높다.
- 점수가 더 높은 7개 중 6개는 산업계 팀(Dexmal, Galaxea AI, Xiaomi Robotics, Tencent Robotics X, OpenHelix Robotics, Physical Intelligence)이다. 리더보드는 학습 연산량을 정규화하지 않는다.
- 같은 Qwen3-VL 기반 StarVLA-α 대비 점수 4.26점, 성공률 4.36%p 높고, Precision과 Long-Horizon에서 차이가 크다. Memory(0.66 / 0.56)는 명확한 약점이다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- 자원 제약으로 4B 규모 VLM backbone만 다루며 더 큰 모델은 탐구하지 않았다. 큰 VLM은 더 강한 시각, 공간, 언어 prior를 가질 수 있고 최적 레시피가 규모에 따라 바뀔 수 있다.
- RoboDojo Memory 항목 성적이 매우 낮다.
- RoboTwin 2.0 Data Scaling 비교에서 방법별 학습 연산량, 최적화 일정, checkpoint 선택 절차가 다를 수 있다고 저자가 밝힌다. RoboDojo도 연산량을 정규화하지 않는다.
- LIBERO-Plus의 Language 교란 항목에서는 Qwen3VL-OFT보다 낮다(81.5 대 87.0).
- decoder lock-in 진단에서 OFT + GR00T의 향상(+2.6점)은 작다고 저자가 스스로 적는다.
- 저장소 README는 논문 설정과 공개 artifact의 차이(caption 손실 가중치 0.5 대 0.2, GPU 16개 대 4노드 × 8 GPU)와 공개 checkpoint head가 논문 표의 head와 다른 경우를 명시한다 ([[physical-ai/starvla-vlact]]).
- 향후 과제로 과제, 환경, embodiment 전반에 일반화하는 VLA 지향 VLM 구축을 제안하고, 재사용 가능한 backbone 학습이 대규모 비공개 로봇 데이터 의존을 줄일 수 있다고 본다.

## 6. 관련 연구 (Related Work)

- generalist robot policy: 초기에는 pre-training 모델을 상위 planner로 쓰고 로봇별 저수준 skill과 잇는 계층 구조였다. 이후 Eagle-2나 PaliGemma 같은 backbone을 embodied 데이터로 end-to-end fine-tuning하는 VLA로 옮겨 갔다. flow matching, action chunking, Mixture-of-Experts, cross-attention이나 embodiment별 projector가 쓰인다. π 계열 같은 최전선 모델은 비공개 데이터에 의존해 재현이 어렵다.
- 데이터 규모 확대: teleoperation 기반 대규모 데이터셋(Open X-Embodiment, DROID 등), 계측 장비를 단 사람 trajectory, 인터넷 규모 사람 영상을 표현 pre-training이나 동작 기반 중간 표현으로 활용한다.
- cross-task, cross-embodiment 일반화: 사람 영상 기반 표현 학습, 사람 동작 cloning, 2D point track 중간 표현, 인터넷 규모 foundation model 통합, 이질 로봇 플랫폼 간 전이.
- VLM: vision encoder, projector, LLM backbone 구조와 visual instruction tuning, 동적 해상도, 이미지와 영상 통합 처리, 강화학습 기반 추론 강화. VLM은 자율주행과 GUI에서 planning을 보이지만 수동적 관찰자에 머물며, VLA가 이 embodiment 간극을 잇는다.
- 코드와 비교 대상: StarVLA 코드베이스, StarVLA-α(같은 저자군), GR00T N1.6, π0, π0.5, OpenVLA, OpenVLA-OFT, SmolVLA.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| VLAct | 이 논문의 VLA 지향 VLM backbone과 그 continued pre-training 레시피 이름 |
| continued pre-training | 이미 pre-training된 VLM에서 출발해 downstream fine-tuning 전에 다양한 로봇 trajectory로 학습하는 단계. 흔히 VLA pre-training이라 부르는 단계다 |
| representation-centric | continued pre-training을 action 적합이 아니라 재사용 가능한 backbone 표현 학습으로 설계하는 관점 |
| shallow-layer protection | pre-training 동안 vision encoder와 LLM 하위 절반 layer를 동결해 VLM 표현 이탈을 막는 기법 |
| caption 혼합 pre-training | 로봇 trajectory minibatch에 image caption 데이터를 섞고 VLM cross-entropy 손실을 가중치 0.5로 더하는 방식 |
| decoder lock-in | 단일 head로 pre-training한 backbone이 그 head의 디코딩 기하에 맞춰 feature를 조직해 다른 head가 읽기 어려워지는 경향 |
| head별 표현 붕괴 (head-specific representation collapse) | pilot study에서 관찰한 decoder lock-in의 결과 양상 |
| multi-head co-supervision | OFT, PI, GR00T 세 연속 head를 같은 latent와 같은 정답 action chunk로 동시에 학습시키는 지도 방식 |
| 부분 통합 action layout | 물리적으로 비교 가능한 차원(그리퍼)만 embodiment 간 공유하고 나머지는 역할별 좌표에 두고 mask하는 20차원 출력 공간 |
| wrap-aware loss | 주기적인 절대 관절 각도의 잔차를 [−π, π]로 감싼 뒤 L1으로 계산하는 손실 |
| matched baseline (Qwen3-VL-OFT) | VLAct와 backbone 가중치만 다르고 head, 초기화, 데이터, optimizer, 예산이 같은 비교 대상 |

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 3 | "VLAct 개요와 naive pre-training 비교" | caption-region | (확인 필요) fig03과 내용 중복 |
| fig02 | 4 | "action head 조합별 pilot study 성공률" | caption-region | ★ wiki 권장 (motivation) |
| fig03 | 6 | "VLAct pre-training과 fine-tuning 절차" | caption-region | ★ wiki 권장 (architecture) |
| fig04 | 7 | "통합 action space 세 가지 설계" | caption-region | ★ wiki 권장 (method) |
| fig05 | 12 | "실제 로봇 평가와 RoboCasa-GR1 전이" | caption-region | ★ wiki 권장 (result) |
| fig06 | 22 | "layer별 attention 분포" | caption-region | ★ wiki 권장 (method 근거) |
| fig07 | 24 | "보조 VLM 데이터 예시" | caption-region | (선택) |
| fig08 | 25 | "보조 co-training 데이터별 성공률" | caption-region | ★ wiki 권장 (ablation) |
| fig09 | 29 | "네 action head 구조 비교" | caption-region | ★ wiki 권장 (개념) |
| fig10 | 32 | "실제 로봇 실험 환경과 데이터" | caption-region | (선택) |
| fig11 | 32 | "실제 로봇 평가 과제 구성" | caption-region | (선택) |
| fig12 | 35 | "과제별 학습 데이터 시각화" | caption-region | (생략 권장) |
| fig13 | 36 | "단일 팔 단기 과제 추론 장면" | caption-region | (생략 권장) |
| fig14 | 37 | "long-horizon과 양팔 과제 추론 장면" | caption-region | (생략 권장) |
| tab01 | 8 | "LIBERO-Plus 항목별 성공률" | table-region | (본문 표로 대체) |
| tab02 | 9 | "RoboTwin 2.0 성공률" | table-region | (본문 표로 대체) |
| tab03 | 11 | "RoboDojo 리더보드 상위 20개" | table-region | (본문 표로 대체) |
| tab04 | 21 | "VLA-Arena 범주별 성공률" | table-region | (본문 표로 대체) |
| tab05 | 21 | "DOMINO 결과" | table-region | (본문 표로 대체) |
| tab06 | 22 | "shallow-layer protection ablation" | table-region | (본문 표로 대체) |
| tab07 | 23 | "보조 데이터 목록" | table-region | (본문 표로 대체) |
| tab08 | 26 | "head 다양성과 decoder lock-in" | table-region | (본문 표로 대체) |
| tab09 | 26 | "같은 head 적응 비교" | table-region | (본문 표로 대체) |
| tab10 | 28 | "통합 관절 공간과 wrap-aware loss ablation" | table-region | (본문 표로 대체) |
| tab11 | 28 | "UMI 데이터 추가 효과" | table-region | (본문 표로 대체) |
| tab12 | 31 | "통합 action 표현 설계 ablation" | table-region | (본문 표로 대체) |
