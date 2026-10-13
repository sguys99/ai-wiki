---
title: "H-JEPA: End-to-End Learning of Hierarchical World Models for Visual Planning"
type: paper
year: 2026
category: physical-ai
raw_path: raw/papers/zhang-2026-h-jepa-end-to-end-learning-of.pdf
raw_filename: "zhang-2026-h-jepa-end-to-end-learning-of.pdf"
source_collection: external
authors: "Wancong Zhang, Basile Terver, Michael Rabbat, Yann LeCun, Randall Balestriero"
arxiv_id: "2610.06805"
tags: [physical-ai, world-model, robot-learning, manipulation]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/zhang-2026-h-jepa-end-to-end-learning-of/fig01.png
    raw: raw/papers/zhang-2026-h-jepa-end-to-end-learning-of-figures/fig01.png
    caption: "계층 추상화가 여러 시간 척도의 planning을 돕는 방식. 왼쪽은 Visual AntMaze의 3단계 계층 planning으로, 상위 level의 첫 예측이 아래 level의 subgoal이 된다. 오른쪽은 planner 연산량 대비 성공률이며 LeWM, 2단계 H-JEPA, 3단계 H-JEPA의 Pareto front를 비교한다"
    page: 1
    bbox_norm: [0.1667, 0.5409, 0.8333, 0.7756]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/zhang-2026-h-jepa-end-to-end-learning-of/fig02.png
    raw: raw/papers/zhang-2026-h-jepa-end-to-end-learning-of-figures/fig02.png
    caption: "H-JEPA의 학습 구조. (a) w2=1, s2=2일 때 level 2가 level-1 상태를 하나 건너 하나씩 인코딩하고 사이의 action 임베딩을 묶는 계층 구성, (b) 각 level이 다음 latent를 예측하고 SIGReg로 붕괴를 막는 level별 목적 함수"
    page: 3
    bbox_norm: [0.1667, 0.0958, 0.8334, 0.308]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/zhang-2026-h-jepa-end-to-end-learning-of/fig03.png
    raw: raw/papers/zhang-2026-h-jepa-end-to-end-learning-of-figures/fig03.png
    caption: "2단계 계층 planning 예시. level 2가 macro-action을 최적화해 목표 latent에 맞추고, 그 예측 상태가 level 1의 subgoal이 된다. level 1은 자기 예측을 E(2)로 올려 level-2 공간에서 비교한다"
    page: 4
    bbox_norm: [0.1667, 0.0958, 0.8333, 0.3272]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/zhang-2026-h-jepa-end-to-end-learning-of/fig04.png
    raw: raw/papers/zhang-2026-h-jepa-end-to-end-learning-of-figures/fig04.png
    caption: "계층에 따른 선택적 추상화. 왼쪽은 4단계 H-JEPA의 level별 MLP probe NMSE로, AntMaze의 몸체 상태와 FourRoom의 distractor 위치는 위로 갈수록 복원이 어려워지고 agent 위치는 유지된다. 오른쪽은 level 1~3에서 디코딩한 관찰 이미지다"
    page: 5
    bbox_norm: [0.1667, 0.0958, 0.8334, 0.2743]
    strategy: caption-region
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/zhang-2026-h-jepa-end-to-end-learning-of/fig05.png
    raw: raw/papers/zhang-2026-h-jepa-end-to-end-learning-of-figures/fig05.png
    caption: "시간 주파수 격차와 선택적 추상화의 상관. 가로축은 가장 빠른 개체와 가장 느린 개체의 spectral centroid 비율, 세로축은 level 1에서 level 2로 갈 때의 probe NMSE 증가량이다. 격차가 2배 미만인 환경은 선택적 추상화가 거의 없다"
    page: 5
    bbox_norm: [0.4902, 0.4972, 0.8333, 0.6958]
    strategy: caption-region
    curated: true
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/zhang-2026-h-jepa-end-to-end-learning-of/fig06.png
    raw: raw/papers/zhang-2026-h-jepa-end-to-end-learning-of-figures/fig06.png
    caption: "연산 예산과 계층 깊이에 따른 gradient 기반 planning 성공률. 위는 planner FLOPs 대비 성공률(굵은 선이 Pareto front), 아래는 깊이 1~4에서 LeWM, H-JEPA, HWM을 비교한다"
    page: 6
    bbox_norm: [0.1667, 0.0958, 0.8333, 0.3779]
    strategy: caption-region
    curated: true
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/zhang-2026-h-jepa-end-to-end-learning-of/fig07.png
    raw: raw/papers/zhang-2026-h-jepa-end-to-end-learning-of-figures/fig07.png
    caption: "AntMaze에서 계층별 planning cost 지형. 3단계 H-JEPA의 각 latent 공간에서 기준점(별)까지의 거리를 색으로 표시했고, 상위 level일수록 복도를 따라 비용이 완만하게 증가한다"
    page: 7
    bbox_norm: [0.1693, 0.0958, 0.8333, 0.2313]
    strategy: caption-region
    curated: true
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/zhang-2026-h-jepa-end-to-end-learning-of/fig08.png
    raw: raw/papers/zhang-2026-h-jepa-end-to-end-learning-of-figures/fig08.png
    caption: "planning 비용의 시간 분해. 위는 전문가 trajectory를 따라 잰 level-1과 level-2의 목표 비용, 아래는 subgoal 구간마다 다시 기준을 잡은 level-1 rollout의 subgoal 추적 비용으로, 구간 안에서 단조 감소한다"
    page: 8
    bbox_norm: [0.1667, 0.0958, 0.8333, 0.3126]
    strategy: caption-region
    curated: true
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/zhang-2026-h-jepa-end-to-end-learning-of/fig09.png
    raw: raw/papers/zhang-2026-h-jepa-end-to-end-learning-of-figures/fig09.png
    caption: "DROID 결과. (a) 장면이 고정된 Cube와 매 episode 장면이 바뀌는 DROID의 첫 프레임, (b) IDM 없는 LeWM, LeWM+IDM, HWM, H-JEPA의 Fréchet fidelity, (c) planner 연산량 대비 Fréchet fidelity와 동결 인코더 baseline(JEPA-WM, V-JEPA 2-AC)"
    page: 9
    bbox_norm: [0.1725, 0.0842, 0.8275, 0.3084]
    strategy: caption-region
    curated: true
  - id: fig10
    label: Figure 10
    kind: figure
    file: assets/zhang-2026-h-jepa-end-to-end-learning-of/fig10.png
    raw: raw/papers/zhang-2026-h-jepa-end-to-end-learning-of-figures/fig10.png
    caption: "4단계 H-JEPA와 DROID 모델의 level별 학습 손실 곡선. 예측 손실, SIGReg 통계량, IDM 손실, 전체 목적 함수를 epoch에 따라 그렸다"
    page: 21
    bbox_norm: [0.1667, 0.1895, 0.8333, 0.6908]
    strategy: caption-region
    curated: false
  - id: fig11
    label: Figure 11
    kind: figure
    file: assets/zhang-2026-h-jepa-end-to-end-learning-of/fig11.png
    raw: raw/papers/zhang-2026-h-jepa-end-to-end-learning-of-figures/fig11.png
    caption: "네 환경에서 성공한 계층 planner 실행 예시. 시작 관찰부터 목표 관찰까지 환경 step을 균등 간격으로 8장 뽑았다"
    page: 25
    bbox_norm: [0.1667, 0.0958, 0.8333, 0.3778]
    strategy: caption-region
    curated: false
  - id: fig12
    label: Figure 12
    kind: figure
    file: assets/zhang-2026-h-jepa-end-to-end-learning-of/fig12.png
    raw: raw/papers/zhang-2026-h-jepa-end-to-end-learning-of-figures/fig12.png
    caption: "시간 주파수 분리와 선택적 추상화의 세부. (a) AntMaze episode 하나에서 전역 위치와 몸체 상태 13차원의 시계열과 누적 변화량(격차 8.3배), (b) 환경별 개체 spectral centroid와 level-1, level-2 probe NMSE"
    page: 27
    bbox_norm: [0.1667, 0.0958, 0.8333, 0.5071]
    strategy: caption-region
    curated: false
  - id: fig13
    label: Figure 13
    kind: figure
    file: assets/zhang-2026-h-jepa-end-to-end-learning-of/fig13.png
    raw: raw/papers/zhang-2026-h-jepa-end-to-end-learning-of-figures/fig13.png
    caption: "Visual AntMaze에서 학습 데이터 조합에 따른 planning 성공률. 왼쪽은 단일 level, 가운데는 stagewise 학습의 9가지 level-1, level-2 데이터 조합, 오른쪽은 end-to-end 학습이다"
    page: 28
    bbox_norm: [0.1667, 0.0958, 0.8333, 0.2419]
    strategy: caption-region
    curated: true
  - id: fig14
    label: Figure 14
    kind: figure
    file: assets/zhang-2026-h-jepa-end-to-end-learning-of/fig14.png
    raw: raw/papers/zhang-2026-h-jepa-end-to-end-learning-of-figures/fig14.png
    caption: "OGBench Cube에서 Fréchet fidelity와 grasp 성공의 관계. 일정 fidelity 미만에서는 성공 episode가 없지만 그 위라고 해서 성공이 보장되지는 않는다"
    page: 31
    bbox_norm: [0.1828, 0.0958, 0.8172, 0.2734]
    strategy: caption-region
    curated: false
  - id: fig15
    label: Figure 15
    kind: figure
    file: assets/zhang-2026-h-jepa-end-to-end-learning-of/fig15.png
    raw: raw/papers/zhang-2026-h-jepa-end-to-end-learning-of-figures/fig15.png
    caption: "RoboCasa CloseDrawer에서 Fréchet fidelity와 연속값 서랍 닫힘 진행도의 관계. planner 설정 99개, episode 32개로 측정했고 설정 내 순위 상관이 양수다"
    page: 31
    bbox_norm: [0.2314, 0.3517, 0.7687, 0.5308]
    strategy: caption-region
    curated: false
  - id: fig16
    label: Figure 16
    kind: figure
    file: assets/zhang-2026-h-jepa-end-to-end-learning-of/fig16.png
    raw: raw/papers/zhang-2026-h-jepa-end-to-end-learning-of-figures/fig16.png
    caption: "DROID 평가 clip 16개 전체에 대한 planner의 상상 결과. clip마다 위는 전문가 영상, 아래는 디코딩한 level-1 rollout이며 level-2 macro-plan을 3열마다 끼워 표시했다"
    page: 33
    bbox_norm: [0.1667, 0.253, 0.8333, 0.6713]
    strategy: caption-region
    curated: false
  - id: fig17
    label: Figure 17
    kind: figure
    file: assets/zhang-2026-h-jepa-end-to-end-learning-of/fig17.png
    raw: raw/papers/zhang-2026-h-jepa-end-to-end-learning-of-figures/fig17.png
    caption: "DROID level-1 설정에서 SIGReg, IDM 가중치, 예측 목표 detach의 전수 격자. 왼쪽은 표현의 effective rank, 오른쪽은 Fréchet fidelity로, SIGReg가 rank를 지키고 IDM이 이를 planning 성능으로 바꾼다"
    page: 34
    bbox_norm: [0.1163, 0.0569, 0.9414, 0.2593]
    strategy: caption-region
    curated: true
  - id: fig18
    label: Figure 18
    kind: figure
    file: assets/zhang-2026-h-jepa-end-to-end-learning-of/fig18.png
    raw: raw/papers/zhang-2026-h-jepa-end-to-end-learning-of-figures/fig18.png
    caption: "DROID에서 SIGReg 계수와 IDM 계수의 교차 검증 격자. 왼쪽은 level 1, 오른쪽은 level 1을 동결한 level 2이며 굵은 테두리가 채택한 값이다"
    page: 35
    bbox_norm: [0.2637, 0.0958, 0.7363, 0.355]
    strategy: caption-region
    curated: false
  - id: fig19
    label: Figure 19
    kind: figure
    file: assets/zhang-2026-h-jepa-end-to-end-learning-of/fig19.png
    raw: raw/papers/zhang-2026-h-jepa-end-to-end-learning-of-figures/fig19.png
    caption: "Cube와 DROID에서 latent 분산의 episode 내 비율과 episode 간 비율. DROID는 장면 다양성 때문에 분산 대부분이 episode 간 차이에 쓰인다"
    page: 36
    bbox_norm: [0.5161, 0.2387, 0.8333, 0.3706]
    strategy: caption-region
    curated: false
  - id: tab01
    label: Table 1
    kind: table
    file: assets/zhang-2026-h-jepa-end-to-end-learning-of/tab01.png
    raw: raw/papers/zhang-2026-h-jepa-end-to-end-learning-of-figures/tab01.png
    caption: "AntMaze에서 비용 공간만 바꾼 비교. 같은 level-1 동역학과 planner로 native L1 비용과 L2~L4 projection 비용의 성공률을 재고 계층 planning을 참조로 둔다"
    page: 7
    bbox_norm: [0.1693, 0.0963, 0.5007, 0.2259]
    strategy: table-region
    curated: true
  - id: tab02
    label: Table 2
    kind: table
    file: assets/zhang-2026-h-jepa-end-to-end-learning-of/tab02.png
    raw: raw/papers/zhang-2026-h-jepa-end-to-end-learning-of-figures/tab02.png
    caption: "본문 기호 정의표. level 인덱스, latent 상태, action 임베딩, 학습 목적 함수, planning 관련 기호를 정리한다"
    page: 18
    bbox_norm: [0.1707, 0.1816, 0.8294, 0.853]
    strategy: table-region
    curated: false
  - id: tab03
    label: Table 3
    kind: table
    file: assets/zhang-2026-h-jepa-end-to-end-learning-of/tab03.png
    raw: raw/papers/zhang-2026-h-jepa-end-to-end-learning-of-figures/tab03.png
    caption: "깊이별 학습 샘플의 시간 구성과 epoch당 clip 수. 깊이가 늘수록 최소 clip 길이가 길어지고 Push-T는 4단계에서 LeWM 대비 14%의 clip만 남는다"
    page: 20
    bbox_norm: [0.1688, 0.4759, 0.8312, 0.6118]
    strategy: table-region
    curated: true
  - id: tab04
    label: Table 4
    kind: table
    file: assets/zhang-2026-h-jepa-end-to-end-learning-of/tab04.png
    raw: raw/papers/zhang-2026-h-jepa-end-to-end-learning-of-figures/tab04.png
    caption: "환경별 아키텍처와 학습 설정. 프레임 크기, 명령과 proprioception 차원, latent 차원, 상위 predictor 구성, SIGReg 계수, epoch 수"
    page: 22
    bbox_norm: [0.2222, 0.4148, 0.7778, 0.5506]
    strategy: table-region
    curated: false
  - id: tab05
    label: Table 5
    kind: table
    file: assets/zhang-2026-h-jepa-end-to-end-learning-of/tab05.png
    raw: raw/papers/zhang-2026-h-jepa-end-to-end-learning-of-figures/tab05.png
    caption: "DROID 학습 하이퍼파라미터. level별 인코더, predictor, SIGReg와 IDM 가중치, 최적화 설정"
    page: 23
    bbox_norm: [0.336, 0.2803, 0.664, 0.7204]
    strategy: table-region
    curated: false
  - id: tab06
    label: Table 6
    kind: table
    file: assets/zhang-2026-h-jepa-end-to-end-learning-of/tab06.png
    raw: raw/papers/zhang-2026-h-jepa-end-to-end-learning-of-figures/tab06.png
    caption: "환경별 probing 데이터와 probe 대상 개체. 느린 개체와 빠른 개체의 구분을 함께 적는다"
    page: 24
    bbox_norm: [0.1878, 0.3101, 0.8122, 0.4834]
    strategy: table-region
    curated: false
  - id: tab07
    label: Table 7
    kind: table
    file: assets/zhang-2026-h-jepa-end-to-end-learning-of/tab07.png
    raw: raw/papers/zhang-2026-h-jepa-end-to-end-learning-of-figures/tab07.png
    caption: "시뮬레이션 깊이 비교의 planning 설정. episode 예산, AdamW 학습률, level별 horizon과 후보 수"
    page: 26
    bbox_norm: [0.1692, 0.1718, 0.8308, 0.3645]
    strategy: table-region
    curated: false
  - id: tab08
    label: Table 8
    kind: table
    file: assets/zhang-2026-h-jepa-end-to-end-learning-of/tab08.png
    raw: raw/papers/zhang-2026-h-jepa-end-to-end-learning-of-figures/tab08.png
    caption: "DROID planning 설정. episode 예산, 학습률, horizon, 후보 수"
    page: 26
    bbox_norm: [0.1692, 0.1718, 0.8308, 0.3645]
    strategy: table-region
    curated: false
  - id: tab09
    label: Table 9
    kind: table
    file: assets/zhang-2026-h-jepa-end-to-end-learning-of/tab09.png
    raw: raw/papers/zhang-2026-h-jepa-end-to-end-learning-of-figures/tab09.png
    caption: "네 환경 전체의 planning 비용 ablation. FourRoom은 상위 level 비용으로 성공률이 오르고 Cube와 Push-T는 뚜렷한 이득이 없다"
    page: 29
    bbox_norm: [0.1957, 0.3222, 0.8043, 0.5579]
    strategy: table-region
    curated: true
  - id: tab10
    label: Table 10
    kind: table
    file: assets/zhang-2026-h-jepa-end-to-end-learning-of/tab10.png
    raw: raw/papers/zhang-2026-h-jepa-end-to-end-learning-of-figures/tab10.png
    caption: "예측 비용의 단조성(시간에 대한 음의 Spearman 상관). HWM과 H-JEPA의 level-2 목표 비용과 subgoal 비용을 네 환경에서 비교한다"
    page: 29
    bbox_norm: [0.1667, 0.6687, 0.8333, 0.8461]
    strategy: table-region
    curated: true
  - id: tab11
    label: Table 11
    kind: table
    file: assets/zhang-2026-h-jepa-end-to-end-learning-of/tab11.png
    raw: raw/papers/zhang-2026-h-jepa-end-to-end-learning-of-figures/tab11.png
    caption: "분산 SIGReg 구현의 sharding 불변성 검증. 제안 구현은 샤드 수와 무관하게 값이 같고 단일 GPU 참조 구현은 최대 14% 달라진다"
    page: 35
    bbox_norm: [0.2611, 0.5074, 0.7389, 0.6053]
    strategy: table-region
    curated: false
  - id: tab12
    label: Table 12
    kind: table
    file: assets/zhang-2026-h-jepa-end-to-end-learning-of/tab12.png
    raw: raw/papers/zhang-2026-h-jepa-end-to-end-learning-of-figures/tab12.png
    caption: "IDM 없이 학습한 SIGReg 계수 사다리와 time repulsion 실험. 붕괴 시작 epoch, action 민감도, 최고와 최종 Fréchet fidelity, episode 내 분산 비율"
    page: 38
    bbox_norm: [0.1702, 0.2095, 0.8298, 0.3841]
    strategy: table-region
    curated: false
  - id: tab13
    label: Table 13
    kind: table
    file: assets/zhang-2026-h-jepa-end-to-end-learning-of/tab13.png
    raw: raw/papers/zhang-2026-h-jepa-end-to-end-learning-of-figures/tab13.png
    caption: "모델 기반 계층 제어 방법 비교표. 픽셀 입력, task-agnostic world model, 재구성 없음, 학습된 latent 공간의 계층 네 항목을 대조하며 네 항목을 모두 갖춘 것은 H-JEPA뿐이다"
    page: 40
    bbox_norm: [0.1667, 0.2094, 0.8334, 0.3719]
    strategy: table-region
    curated: false
---

## 한 줄 요약 (One-line Summary)

H-JEPA는 action-conditioned JEPA world model을 여러 level로 쌓아 end-to-end로 학습하고, 각 level이 자기 latent 공간에서 더 먼 미래를 예측하게 만든 뒤 위에서 아래로 subgoal을 내려보내며 planning하는 방법이다. Visual AntMaze에서 3단계 계층은 flat LeWM의 성공률 18.0%를 73.3%로 올리면서 planner 연산량은 더 적게 쓴다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 제목 | H-JEPA: End-to-End Learning of Hierarchical World Models for Visual Planning |
| 저자 | Wancong Zhang, Basile Terver (공동 1저자, 순서는 동전 던지기), Michael Rabbat, Yann LeCun, Randall Balestriero (공동 지도) |
| 소속 | NYU, Advanced Machine Intelligence (AMI Labs), INRIA Paris, Brown University |
| 공개 | arXiv 2610.06805v1, 2026-10-05, cs.LG, 본문 10쪽과 부록 A~M 포함 40쪽 |
| 관련 자료 | 프로젝트 페이지 https://h-jepa.com/ (`sources/zhang-2026-h-jepa-project-page.md`), 공식 저장소 https://github.com/kevinghst/H-JEPA (`sources/kevinghst-h-jepa.md`). 세 자료는 wiki 페이지 하나로 통합했다 |
| 기반 코드 | LeWM과 stable-worldmodel, stable-pretraining 라이브러리, H200 GPU로 학습 |

## 2. 주요 기여 (Key Contributions)

논문은 네 가지 기여를 명시한다.

1. 계층 JEPA world model을 reward와 픽셀 재구성 없이 end-to-end로 학습하는 방법을 제시한다 (§2). world model은 환경의 동역학을 학습해 미래를 예측하는 모델이고, JEPA는 미래를 픽셀이 아닌 latent 상태로 예측하는 구조다.
2. 데이터 안의 요인들이 서로 다른 시간 척도로 변할 때, 상위 level은 자기 horizon에서 예측할 수 없는 빠른 세부를 버리고 느리고 예측 가능한 상태를 남긴다는 것을 보인다 (§3).
3. 계층 planning이 단일 level planning보다 적은 test-time 연산으로 더 높은 성공률을 낸다는 것을 보이고, 그 원인을 두 가지로 분리한다 (§4.1, §4.2). 하나는 상위 latent 공간이 목표의 추상화 수준에서 진행도를 매기게 해 준다는 점이고, 다른 하나는 시간 분해가 long-horizon 과제를 쉬운 하위 문제로 쪼갠다는 점이다.
4. inverse dynamics 항을 더해 장면, 조명, 물체가 episode마다 바뀌는 실제 로봇 데이터셋 DROID로 확장한다 (§4.3).

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 문제 설정

기존 action-conditioned, task-agnostic JEPA world model(DINO-WM, V-JEPA 2, PLDM, LeWM 등)은 학습된 latent 공간 하나에서, 대개 시간 척도 하나로 예측과 planning을 한다. 논문은 이 방식의 한계를 두 가지로 정리한다.

- 단일 시간 척도에서는 long-horizon 예측이 잘게 쪼갠 step을 많이 rollout해야 하므로 예측 오차가 누적되고 action 탐색 공간이 커진다.
- latent 공간 하나가 저수준 동역학과 목표 비교를 모두 감당해야 한다. 빠르게 변하는 세부를 모두 담은 latent는 저수준 동역학에는 좋지만, 목표가 상태보다 추상적일 때(맞춰야 할 자세가 아니라 도달할 위치일 때) 목표 비교 비용으로는 나쁘다.

가장 가까운 선행 연구인 HWM은 task-agnostic JEPA world model로 계층 planning을 하지만 서로 다른 horizon의 predictor들이 latent 공간 하나를 공유한다. 따라서 horizon은 나누지만 더 추상적인 공간에서 목표를 비교하지는 못한다.

### 3.2 계층 예측 학습 (§2.1)

H-JEPA는 observation과 action의 trajectory에서 latent 예측 모델의 계층을 학습한다. 계층은 시간 계층이다. level 1은 가장 촘촘한 observation 흐름에서 동작하고, 각 상위 level은 아래 level이 만든 latent 상태를 더 성긴 간격으로 받아 쓴다. level마다 상태 인코더 E(ℓ), action 인코더 A(ℓ), latent predictor F(ℓ)를 따로 가진다.

- level 1: z(1)_t = E(1)(o_t), 필요하면 proprioception을 함께 인코딩한다. action 블록은 a(1)_t = A(1)(a_t)로 인코딩한다.
- 상위 level ℓ>1에는 시간 하이퍼파라미터 두 개가 있다. stride s_ℓ는 subsampling 비율로, 상위 시각 t가 하위 시각 t×s_ℓ에 대응한다. window size w_ℓ는 상위 상태 하나가 요약하는 하위 step 수다. 둘은 독립이다.
- 식 (1): z(ℓ)_t = E(ℓ)(z(ℓ-1)_{t×sℓ : t×sℓ+wℓ}), a(ℓ)_t = A(ℓ)(a(ℓ-1)_{t×sℓ+wℓ-1 : (t+1)×sℓ+wℓ-1}). 상태 인코더는 w_ℓ step 창을 하나로 pooling하고, action 인코더는 w_ℓ와 무관하게 s_ℓ개의 하위 action 임베딩을 묶어 상위 상태 사이의 전이 전체를 덮는 macro-action을 만든다.
- 모든 실험은 w_ℓ=1을 쓴다. 따라서 상위 상태 인코더는 시점별(pointwise)로 동작한다.

각 level은 자기 latent 공간에서 JEPA로 학습된다. 길이 c_ℓ의 문맥 latent와 action 임베딩을 받아 predictor F(ℓ)가 다음 latent를 예측하고, teacher-forced 1-step 손실(식 2)은 예측과 실제 다음 latent의 제곱 오차 평균이다. level 목적 함수(식 3)는 L(ℓ) = L(ℓ)_pred + λ_ℓ SIGReg(Z(ℓ))다. SIGReg는 임베딩 분포가 등방성 Gaussian에 가까워지도록 유도해 표현 붕괴를 막는 sketched normality 정규화항이다(LeJEPA에서 제안). 모든 level을 end-to-end로 함께 학습하므로 상위 목적 함수의 그래디언트가 하위 인코더까지 흐른다.

### 3.3 학습된 추상화 위의 계층 planning (§2.2)

planning은 위에서 아래로 진행한다.

1. 현재 observation과 목표 observation을 모든 level에서 인코딩해 초기 latent {z(ℓ)_0}와 목표 latent {g(ℓ)}를 얻는다.
2. 최상위 level L은 macro-action을 최적화해 마지막 예측 상태와 목표 latent의 거리를 최소화한다(식 4).
3. 하위 level ℓ<L은 바로 위 level이 최적화한 rollout을 subgoal로 받는다. subgoal 개수 K_{ℓ+1}을 정하고 하위 horizon을 H_ℓ = K_{ℓ+1}×s_{ℓ+1} + w_{ℓ+1} - 1로 둔다.
4. 하위 level은 자기 예측을 상위 인코더 E(ℓ+1)로 올린 값(식 5)을 상위 subgoal과 비교한다. 목적 함수(식 6)는 마지막 subgoal 항에 중간 subgoal 항을 가중치 β로 더한 것이다.
5. level 1이 primitive action을 내고, closed-loop에서는 action 앞부분만 실행한 뒤 새 observation으로 계층 planning을 다시 한다.

K_{ℓ+1}=1이면 첫 subgoal만 맞추는 closed-loop planning이고, K_{ℓ+1}=H_{ℓ+1}이면 open-loop planning이다(β=0이면 마지막 예측만, β>0이면 중간 subgoal도 맞춘다). 모든 level은 gradient descent로 action 열을 최적화한다.

### 3.4 시뮬레이션 실험 설정 (§3, 부록 B, C.1, E)

| 환경 | 종류 | 관찰과 명령 | 데이터 |
|---|---|---|---|
| FourRoomDistractors | 2D 내비게이션 | 224×224, 2D 속도 명령. 독립적으로 움직이다 평균 35 step 간격으로 순간이동하는 distractor 점 하나 | 저자 수집 3,750 episode × 400 step(150만 transition), level 1은 100만 transition으로 학습 |
| Visual AntMaze | 4족 보행 내비게이션 | 64×64, 8D 토크, 27차원 proprioception | OGBench 프로토콜로 explore와 stitch 각 12,500 episode, 합계 1,005만 transition |
| Push-T | 2D manipulation | 224×224, 2D 목표 위치 | DINO-WM 전문가 데이터 18,685 episode(234만 프레임, 평균 125 step) |
| OGBench Cube | 로봇 팔 집어 옮기기 | 224×224, 5D 명령 | 스크립트 policy 10,000 episode × 200 step, 9,800 학습과 200 검증 |
| DROID | 실제 teleoperation 영상 | 256×256, 7D end-effector 명령 | 재인코딩 사본 74,530 episode, 220,084 view |

- level 1은 LeWM이다. ViT-Tiny 인코더의 [CLS] 토큰과 causal Transformer predictor로 구성되고, 단독 학습한 이 모델이 flat baseline이다.
- 상위 level은 2층 MLP 인코더(hidden 384)와 causal Transformer predictor를 쓰고, s_ℓ=2, w_ℓ=1이다. 즉 상위 level의 예측 1 step은 아래 level의 2배 환경 시간을 덮는다.
- level 1의 한 step은 환경 5 step이다. 학습 샘플은 최상위 level에서 상태 4개(T=4)를 공급할 만큼 긴 clip 하나이고 predictor 문맥은 모든 level에서 c_ℓ=3, 배치는 clip 128개다.
- AdamW(weight decay 10^-3), 1% warm-up과 cosine decay, gradient clipping 1.0, bfloat16. 최대 학습률은 level 1이 5×10^-5, 상위 level이 10^-5다. SIGReg는 무작위 방향 M=1024개를 쓰고 stop-gradient, 이동 평균 목표, pre-training 가중치를 쓰지 않는다.
- 시드는 42, 43, 44 세 개이고 깊이별 epoch 예산은 같게 맞춘다. 깊이가 늘면 clip이 길어져 유효 샘플 수가 줄기 때문에 optimizer step 수와 학습 FLOPs는 깊이 간에 맞지 않는다.

| 설정 (Table 4) | FourRoom | AntMaze | Push-T | Cube |
|---|---|---|---|---|
| 프레임 크기 / patch | 224/14 | 64/4 | 224/14 | 224/14 |
| 명령 / proprio 차원 | 2 / 없음 | 8 / 27 | 2 / 없음 | 5 / 없음 |
| latent 차원 d | 192 | 384 | 192 | 192 |
| 상위 predictor layer / head | 4/8 | 5/12 | 6/16 | 6/16 |
| 상위 predictor width / FF width | 192/1024 | 224/1536 | 192/2048 | 192/2048 |
| SIGReg λ (LeWM / H-JEPA) | 0.72/0.18 | 0.09/0.09 | 0.09/0.09 | 0.09/0.09 |
| H-JEPA epoch | 7 | 5 | 9 | 8 |

clip은 한 episode 안에 있어야 하므로 깊이가 깊어질수록 epoch당 clip 수가 줄어든다(Table 3).

| Table 3 | LeWM | 2단계 | 3단계 | 4단계 |
|---|---|---|---|---|
| clip당 level-1 프레임 | 4 | 7 | 13 | 25 |
| 최소 clip 길이(환경 step) | 16 | 31 | 61 | 121 |
| FourRoom clip 수 | 952,708 | 915,298 (96%) | 840,478 (88%) | 690,838 (73%) |
| AntMaze clip 수 | 9,575,000 | 9,200,000 (96%) | 8,450,000 (88%) | 6,950,000 (73%) |
| Push-T clip 수 | 1,981,721 | 1,701,446 (86%) | 1,143,623 (58%) | 285,931 (14%) |
| Cube clip 수 | 1,783,600 | 1,636,600 (92%) | 1,342,600 (75%) | 754,600 (42%) |

평가는 학습된 표현을 동결한 뒤 2층 MLP probe로 분산 정규화 MSE(NMSE)를 잰다. 1에 가까우면 평균값을 찍는 수준의 오차이고 0에 가까우면 정확히 복원된다는 뜻이다. 디코더는 시각화용으로만 사후 학습한다.

planning 평가에서 FourRoom과 Push-T는 75 환경 step 떨어진 전문가 프레임 쌍, Cube는 grasp를 중심으로 한 20 step 구간, AntMaze는 격자 거리 3인 셀 사이의 전문가 rollout(평균 82 step)을 과제로 쓴다. 연산 sweep용 과제와 최종 평가용 50개 과제를 서로 다른 시드로 따로 만들고, planner 설정은 최종 과제 평가 전에 고정한다. 모든 level은 AdamW로 최대 90 iteration 동안 action 열을 최적화하고 비용이 정체되면 조기 종료한다. 상위 level은 action 범위가 없으므로 학습 중 본 macro-action 4,000개로 맞춘 Gaussian에서 후보를 초기화하고 2~98 백분위로 자른다. 모든 모델은 level-1 action 블록 2개(환경 10 step)를 실행한 뒤 처음부터 다시 planning한다.

| Table 7 | FourRoom | AntMaze | Push-T | Cube |
|---|---|---|---|---|
| episode 예산(환경 step) | 210 | 350 | 90 | 30 |
| LeWM horizon H | 23 | 23 | 15 | 4 |
| 2단계 H | (2,12) | (4,9) | (2,8) | (2,2) |
| 3단계 H | (2,2,6) | (4,2,5) | (2,2,4) | (2,2,1) |
| LeWM 후보 수 S | 200 | 100 | 800 | 800 |
| 3단계 후보 수 S | (50,200,200) | (100,100,400) | (25,50,200) | (25,800,800) |

연산 sweep(Fig. 6 위)에서는 평균 planner 연산 100 TFLOPs/episode 이하에서 평균 성공률이 가장 높은 후보 배분을 고르고, 그 설정을 최종 50개 과제에 그대로 적용한다.

### 3.5 DROID 확장과 inverse dynamics 항 (§4.3, 부록 C.2, J)

장면이 episode마다 바뀌면 배경이 로봇보다 예측하기 쉬운 신호가 된다. 그 결과 순수 예측 목적 함수는 장면을 인코딩하고 agent를 버리는 해로 밀려난다. 논문은 이를 slow-feature collapse라 부르고, 연속한 두 상태 표현에서 둘을 잇는 action을 회귀하는 Inverse Dynamics Model(IDM) 항을 level 목적 함수에 더한다(식 8). action 차원 d_a로 나눈 제곱 오차를 쓰고 목표 action에는 stop-gradient를 건다. ℓ>1에서 회귀 목표는 primitive action이 아니라 식 (1)의 pooled macro-action이므로 분리되고, 그래디언트는 두 상태를 통해서만 인코더에 닿는다. 논문은 이 항을 SIGReg와 함께 쓴 사례가 처음이라 보고 두 가중치를 함께 교차 검증한다.

| Table 5 DROID 설정 | level 1 | level 2 |
|---|---|---|
| 인코더 | ViT-S/16, CLS | latent MLP 768 |
| predictor (width/depth) | 384/12 | 384/12 |
| predictor 문맥 | 상태 7개 | 상태 2개 |
| SIGReg 가중치 λ | 0.08 | 0.16 |
| IDM 가중치 γ | 100 | 50 |
| action SIGReg 가중치 | 없음 | 0.005 |

- level 1에서 level 2로의 stride는 3이다. level 2 macro-action 인코더는 level-1 step 3개의 7차원 명령을 이어 붙여 hidden 64인 MLP로 8차원 macro-action을 만든다.
- 최적화는 AdamW, 전체 배치 256, 최대 학습률 5×10^-4(두 level 공통), warm-up 10%, cosine decay, weight decay 10^-4, level별 gradient clipping 1.0, bfloat16, 100 epoch(epoch당 292 iteration), 학습 시드 1, 1000, 10000이다.
- 학습 clip 하나는 level-1 상태 8개를 공급하고 level 2는 그중 3개를 stride 3으로 읽는다. 따라서 one-step teacher forcing에서 level 2의 예측 목표는 clip당 2개, level 1은 7개다.
- stagewise 변형(level 1을 먼저 학습해 동결하고 level 2를 학습)은 데이터 특화 분석, level-2 계수 탐색, 디코딩한 plan 시각화에만 쓰고 모든 주요 결과는 end-to-end 학습이다.

DROID에는 시뮬레이터가 없으므로 계획을 오프라인으로 평가한다. Fréchet fidelity(식 7)는 planned path p와 전문가 path p̃의 누적 xyz 경로 사이 이산 Fréchet 거리 d_F를 써서 (d_F(0,p̃) - d_F(p,p̃)) / d_F(0,p̃)로 정의한다. 팔이 움직이지 않으면 0%, 전문가 경로와 같으면 100%, 음수는 가만히 있는 것보다 나쁘다는 뜻이다. 끝점이 아니라 경로 전체를 채점하므로 grasp를 중심에 둔 pick-and-place 평가에서 물체로 내려갔다 옮기는 비탐욕적(non-greedy) 경로를 구분한다.

- 평가 집합은 조명과 물체 가시성이 좋은 pick-and-place clip 16개다. 각 clip은 grasp를 중심으로 한 108 프레임(약 7.2초) 창이고 5 fps에서 level-1 horizon은 H1=36이다.
- planning은 오프라인 open-loop로 창 전체를 한 번에 계획한다. LeWM+IDM은 후보 32개, HWM과 H-JEPA는 level마다 (16,16), horizon (36,12), 학습률 (0.01, 0.3), subgoal 가중치 β=0.5다.
- 클립별 평균을 planner 시드마다 하나의 값으로 줄이고, 학습 시드×planner 시드 칸들의 중앙값을 보고한다. 클립 평균이 미터 단위라 움직임이 큰 clip이 지배하기 때문이다.
- DROID 영상 컨테이너는 60 fps로 태그되어 있지만 실제 녹화는 15 Hz다. 동결 인코더 baseline(JEPA-WM, V-JEPA 2-AC)은 이 태그를 따르는 로더로 4 fps 설정이라 실제로 1 fps에 해당하며, 그 비율로 창이 맞는 15개 clip에서 평가한다.
- 평가 clip 16개는 모든 DROID 학습 corpus에서 제거한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 학습된 추상화 (§3, 부록 F)

- Fig. 4: 4단계 H-JEPA에서 AntMaze의 몸체 상태와 FourRoom의 distractor 위치는 level이 올라갈수록 복원이 어려워지고 agent 위치는 모든 level에서 정확히 복원된다. 디코딩 영상에서 AntMaze의 다리 자세는 흐려지고 FourRoom의 파란 distractor는 사라지며 빨간 agent는 남는다.
- 해석: FourRoom의 distractor는 순간이동 사이에서는 국소적으로 예측 가능하지만 긴 horizon은 순간이동을 지날 가능성이 커 예측이 어렵다. AntMaze 관절은 전역 위치보다 몇 배 빠르게 진동한다. encoder와 predictor를 함께 최적화하는 JEPA에서 예측 오차 그래디언트가 encoder로 흐르므로 각 level은 자기 시간 척도에서 예측 가능한 feature를 남긴다.
- Fig. 5: entity frequency gap(가장 빠른 개체와 가장 느린 개체의 spectral centroid 비율)이 클수록 level 2에서 빠른 개체 정보가 더 많이 사라지고 느린 개체는 level-1 수준을 유지한다. 2배 미만 구간은 선택적 추상화가 거의 없다.
- 부록 F.2: Humanoid, AntMaze, FourRoom의 격차는 3.1~12.7배이고 선택적 추상화가 나타난다. Push-T, OGBench Cube, DROID는 1.2~1.6배이고 거의 나타나지 않는다.
- 부록 F.1: 대표 AntMaze episode에서 위치의 한 주기는 약 35 프레임, 몸체는 약 4 프레임으로 격차가 8.3배다(데이터셋 값 8.3배, episode별 중앙값 6.4배, 사분위 범위 4.9~7.8배). 몸체 상태는 위치보다 약 10배 많은 누적 변화를 보인다.

### 4.2 연산 예산과 깊이에 따른 planning 성능 (§4.1)

- Fig. 6 위: FourRoom, AntMaze, Cube에서 3단계까지 level을 하나 더할 때마다 Pareto front가 위와 왼쪽으로 이동한다. 즉 더 적은 planner 연산으로 더 높은 성공률을 낸다. FLOPs에는 forward와 backward가 모두 들어간다.
- Push-T는 예외다. 2단계 H-JEPA는 모든 예산에서 LeWM 이상이지만 3단계는 최대 연산에서도 성능이 낮다. Push-T episode가 짧아 3단계 모델은 epoch당 LeWM transition의 58%만 보고, 다른 환경은 3단계에서 75~88%를 유지한다.
- Fig. 6 아래 HWM 비교: HWM은 같은 구현, 데이터, 설정에서 level 1 위 인코더를 항등 함수로 둔 변형이다. H-JEPA의 우위는 AntMaze에서 가장 크며 3단계 H-JEPA가 HWM의 거의 2배 성공률을 낸다. Cube는 깊은 깊이에서 완만한 우위, FourRoom과 Push-T는 비슷하다. HWM도 네 환경 모두에서 LeWM보다 평균 성공률이 높아 표현 계층 없이도 시간 분해가 이득임을 뒷받침한다.
- Push-T 3단계와 4단계는 epoch당 LeWM transition의 58%와 14%만 보기 때문에 두 계층 방법 모두 성능이 낮아진다.

### 4.3 계층이 planning을 개선하는 방식 (§4.2, 부록 H, I)

Fig. 7은 3단계 모델의 각 latent 공간에서 고정 기준점까지의 거리를 지도로 그린다. level 1에서는 기준점에서 떨어진 곳의 거리가 거의 일정해 gradient planner에 신호가 거의 없고, 상위 level에서는 복도를 따라 비용이 완만하게 오른다.

Table 1은 level-1 world model과 planner를 고정하고 목표 비용을 재는 latent 공간만 바꾼 결과다(AntMaze, 성공률 %, 평균±SE).

| 비용 / planner | 2단계 | 3단계 | 4단계 |
|---|---|---|---|
| Native L1 | 23.3±3.3 | 16.7±1.8 | 10.0±0.0 |
| L2 projection | 31.3±2.7 | 20.7±4.8 | 20.7±1.8 |
| L3 projection | 없음 | 22.0±2.3 | 21.3±4.7 |
| L4 projection | 없음 | 없음 | 26.7±2.9 |
| 계층 planning(참조) | 39.3±3.7 | 73.3±3.5 | 63.3±7.7 |

모든 다단계 모델에서 상위 level 비용 중 하나 이상이 native L1보다 성공률이 높고, native 성능이 낮을수록 이득이 크다. 가장 좋은 projection 결과는 모든 깊이에서 별도 학습한 LeWM(18.0±3.5%)보다 높다. 상위 planner가 subgoal을 만들지 않고 상위 인코더로 비용만 정의해도 이득이 생긴다는 뜻이다.

Table 9는 같은 ablation을 다른 환경으로 넓힌다.

| 환경 | 깊이 | Native L1 | L2 proj. | L3 proj. | L4 proj. | 계층 H-JEPA |
|---|---|---|---|---|---|---|
| FourRoom (LeWM 40.7±6.8) | 2 | 9.3±0.7 | 38.7±6.6 | 없음 | 없음 | 81.3±6.7 |
| | 3 | 43.3±8.7 | 65.3±5.5 | 71.3±4.1 | 없음 | 96.0±1.1 |
| | 4 | 68.7±4.7 | 72.0±3.1 | 66.0±3.1 | 70.7±2.7 | 80.0±4.0 |
| Cube (LeWM 32.0±6.1) | 2 | 24.0±1.2 | 13.3±0.7 | 없음 | 없음 | 47.3±2.7 |
| | 3 | 24.7±1.3 | 28.0±4.2 | 14.0±3.5 | 없음 | 60.0±5.0 |
| | 4 | 26.7±2.7 | 25.3±2.4 | 12.0±2.0 | 12.0±2.3 | 55.3±4.4 |
| Push-T (LeWM 40.0±2.3) | 2 | 36.7±1.8 | 38.0±3.1 | 없음 | 없음 | 45.3±1.3 |
| | 3 | 30.7±1.8 | 28.0±4.0 | 24.7±4.1 | 없음 | 17.3±3.5 |
| | 4 | 1.3±0.7 | 1.3±0.7 | 0.7±0.7 | 1.3±1.3 | 0.7±0.7 |

FourRoom은 AntMaze처럼 상위 비용으로 이득을 보지만 가장 깊은 비용이 항상 최선은 아니다. 선택적 추상화가 없는 Cube와 Push-T는 projection 비용의 이득이 없고 Cube의 L3, L4 projection은 성공률을 대략 절반으로 낮춘다. 논문은 이 결과가 상위 비용이 늘 planning을 개선하지는 않음을 보여 줄 뿐, 다른 환경의 이득이 선택적 추상화 때문이라는 인과를 확정하지는 않는다고 적는다.

시간 분해 측면에서 하위 planner가 상위 plan의 앞부분만 추적하면 후보당 rollout step이 줄고 action 탐색이 짧은 horizon으로 제한된다. 또한 flat planner의 전체 horizon 목표 비용은 전문가 trajectory를 따라가도 정체하거나 오히려 오를 수 있다(Fig. 8). Table 10은 시간에 대한 비용의 음의 Spearman 상관(높을수록 단조 감소)을 보고한다.

| 환경 | HWM level 1 | HWM level 2 | HWM subgoal | H-JEPA level 2 | H-JEPA subgoal |
|---|---|---|---|---|---|
| Visual AntMaze | 0.48 | 0.52 | 0.94 | 0.68 | 0.94 |
| Push-T | 0.75 | 0.77 | 0.85 | 0.77 | 0.89 |
| OGBench Cube | 0.65 | 0.74 | 0.79 | 1.00 | 0.99 |
| FourRoom Distractors | 0.56 | 0.62 | 0.92 | 0.85 | 1.00 |

H-JEPA의 subgoal 추적 비용 단조성은 0.89~1.00으로 전체 horizon 목표 비용(0.48~0.75)보다 높다. HWM도 같은 개선을 보이며, 이는 HWM이 별도 추상 표현 없이도 LeWM보다 나은 이유와 맞는다.

### 4.4 DROID (§4.3, 부록 J, K, L)

- IDM 항이 없으면 모델이 붕괴해 Fréchet fidelity가 0이다(Fig. 9b, Fig. 17). OGBench Cube는 장면이 거의 변하지 않아 붕괴를 피한다. latent 분산 중 episode 간 비율이 DROID는 75%, Cube는 28%다.
- Fig. 9b 막대 라벨: LeWM+IDM +34, HWM +35, H-JEPA +40. 즉 IDM이 LeWM을 강한 baseline으로 만들고, 학습된 level 2가 그 위에 성능을 더한다. HWM 대비 우위는 표현 측면과 시간 측면의 효과가 DROID에서도 함께 작동함을 보인다.
- Fig. 9c: H-JEPA는 flat 모델보다 낮은 planning 예산에서 더 높은 fidelity에 도달한다. 동결 인코더 baseline(JEPA-WM, V-JEPA 2-AC)은 몇 자릿수 더 많은 연산으로 더 낮은 fidelity를 낸다.
- Fig. 17(SIGReg {0, 0.08} × IDM {0, 50, 100, 200} × detach 유무, 16칸): SIGReg를 끄면 IDM 가중치와 detach에 상관없이 effective rank가 384 중 1~14로 붕괴하고 fidelity는 아무것도 하지 않는 수준보다 낮다. SIGReg를 켜면 rank는 높지만 IDM이 없으면 fidelity가 바닥 근처이고, IDM을 더하면 fidelity가 높아지며 가중치 100이 가장 좋다. detach는 결과를 바꾸지 않아 주요 설정에서 쓰지 않는다.
- Fig. 18: level 1에서는 두 계수를 함께 키워야 한다. IDM이 크고 SIGReg가 작으면 바닥을 겨우 넘고, SIGReg가 크고 IDM이 작으면 바닥 아래로 떨어진다. level 2는 level 1을 동결한 상태에서 9가지 조합 모두 비슷한 fidelity를 낸다.
- 학습 동역학(Fig. 10): DROID에서 level 1 H-JEPA는 같은 가중치로 학습한 flat LeWM+IDM보다 낮은 예측 손실과 IDM 손실에 도달한다. 즉 상위 level을 함께 학습해도 하위 level이 나빠지지 않는다.

### 4.5 Fréchet fidelity 보정 (부록 J.2)

| 보정 환경 | 결과의 성격 | 관찰 |
|---|---|---|
| OGBench Cube (Fig. 14) | 이진 grasp 성공 | fidelity 약 18.6% 미만에서는 성공 episode가 없지만 그 위의 1,031개 중 121개(12%)만 성공한다. 필요조건이지 충분조건이 아니다 |
| RoboCasa CloseDrawer (Fig. 15) | 연속값 서랍 닫힘 진행도 | planner 설정 99개 × episode 32개. 설정 내 순위 상관 +0.47, 전체 +0.51, 설정 간 +0.73. 경로 길이와 episode 난이도를 통제해도 유지된다 |

논문은 DROID의 fidelity 차이를 한 planner가 더 낫다는 증거로 읽되 얼마나 나은지의 척도로 읽지 않는다. Cube에서 계층이 오프라인 fidelity에서는 작은 우위, grasp 성공에서는 큰 우위를 보였기 때문이다.

### 4.6 데이터 특화 (부록 G, Fig. 13)

Visual AntMaze에서 explore, stitch, 합집합(union) 데이터로 2단계 모델을 학습했다.

| 설정 | explore | stitch | union |
|---|---|---|---|
| 단일 level | 18 | 11 | 19 |
| end-to-end 2단계(같은 데이터) | 11 | 21 | 54 |
| stagewise 2단계, level 1과 level 2 같은 데이터 | 11 | 26 | 40 |

- stagewise에서 level 1 explore, level 2 stitch 조합이 67%로 그림 전체에서 가장 높고, 반대 조합(level 1 stitch, level 2 explore)은 2%다.
- 즉 하위 level은 넓고 상관이 약한 탐색 데이터에서, 상위 level은 시간적으로 일관된 목표 지향 데이터에서 이득을 본다. stagewise 학습은 하위 동역학을 바꾸지 않고 상위 데이터만 특화할 수 있다는 실용적 장점이 있다.
- explore 데이터만으로는 상위 level이 쓸모 있는 시간 추상화를 만들지 못한다.

### 4.7 slow-feature collapse 이론 (부록 L)

- 관찰을 배경 b(episode 내 상수, episode 간 변화), 전경 x_t(agent가 제어, 부분 예측 가능), distractor y_t(action과 무관, 예측 불가)로 나눈다. slow-feature collapse는 인코더 출력이 배경에만 의존해 episode 안에서 상수가 되는 상태이고, episode 내 분산 비율 χ로 정도를 잰다.
- 명제 1: 임베딩의 주변 분포만 보는 정규화항(variance-covariance, whitening, entropy, SIGReg)은 배경 law가 atomless이면 붕괴 해를 배제할 수 없다. 장벽은 시간에 걸친 결합 분포에 작용해야 한다.
- 정리 1: 예측 목적 함수는 action-closed한 feature를 선호하고, 배경만 읽는 인코더는 손실 0을 얻는다. SIGReg 사다리 실험 15개 시드 모두에서 action 민감도가 0.05 아래로 떨어져 붕괴가 실제로 선택된다.
- 명제 2: 시간을 표본 축에 넣는 SIGReg grouping은 붕괴 시 λ(T-1)κ의 장벽을 만들지만, 논문의 (T, N, D) grouping은 시간을 group 축에 두어 장벽이 0이다. 장벽이 있는 grouping으로 학습한 사다리 실험도 모두 붕괴했고(χ 0.008~0.016), 큰 λ에서 붕괴 시점이 늦춰질 뿐이다.
- time repulsion(연속 임베딩 사이의 변화를 키우도록 유도하는 λ_sim<0 항)은 action 라벨 없이 predictor가 항등 함수로 퇴화하는 것을 막지만 어떤 설정도 아무것도 하지 않는 수준을 넘지 못한다. IDM-on 기준(γ=50)은 Fréchet fidelity 30.66%다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- DROID 결과는 모두 오프라인 open-loop 평가다. 저자는 이 이득이 실제 로봇 closed-loop 제어로 이어지는지 시험하는 것을 다음 단계로 둔다.
- 선택적 추상화는 모든 환경에서 나타나지 않는다. manipulation 데이터셋(Push-T, Cube, DROID)은 주파수 격차가 작고 추상화가 거의 없으며, Cube와 Push-T에서는 상위 비용이 이득을 주지 않는다.
- 깊은 계층은 짧은 episode에서 학습 데이터가 줄어 성능이 크게 하락한다(Push-T 4단계 성공률 0.7%).
- 깊이 간 학습은 epoch만 맞추고 optimizer step과 학습 FLOPs는 맞추지 않았다.
- Fréchet fidelity는 경로 충실도이고 과제 성공이 아니다. Cube 보정에서 필요조건일 뿐 충분조건이 아니었다.
- DROID 모델은 카메라 하나씩만 인코딩하고 손목 카메라를 쓰지 않는다. 모든 view를 함께 인코딩하는 것이 가장 분명한 개선 경로라고 적는다.
- IDM은 action 라벨을 필요로 한다. action 없는 영상으로 확장하면 붕괴를 막는 수단을 잃고, SIGReg만으로는 대체할 수 없다는 분석이 부록 L에 있다.
- 향후 방향으로 action 없는 영상과 고차원 시간 흐름에서 계층 학습, 상위 latent를 언어와 alignment해 목표를 말로 지정하기, 고정 stride 대신 가변 길이 구간으로 상위 level 학습을 든다.

## 6. 관련 연구 (Related Work)

| 계열 | 대표 연구 | H-JEPA와의 관계 |
|---|---|---|
| action-conditioned JEPA world model | DINO-WM, V-JEPA 2, PLDM, LeWM | 단일 latent 공간에서 planning. H-JEPA는 LeWM을 level 1로 쓰고 위로 쌓는다 |
| 정규화 | LeJEPA의 SIGReg | 모든 level에 적용 |
| 계층 영상 모델 | Clockwork VAE (Saxena 2021), Variational Temporal Abstraction (Kim 2019), STREAMER (Mounir 2023) | 여러 시간 척도 표현을 배우지만 관찰을 재구성하고 planning하지 않는다 |
| 계층 모델 기반 제어 | Director (Hafner 2022), Puppeteer (Hansen 2025), THICK (Gumbsch 2024) | reward 기반이고 과제 특화 |
| 계층 world model planning | HWM | reward 없는 오프라인 데이터로 여러 horizon을 학습해 계층 planning하지만 latent 공간을 공유한다 |
| inverse dynamics 보조 항 | energy-based JEPA 라이브러리 (Terver 2026), PLDM (Sobal 2025), Sobal 2022 | IDM 항을 계승하되 SIGReg와 결합 |

Table 13은 모델 기반 계층 제어 방법을 네 항목으로 대조한다(✓ 해당, ✗ 해당 없음, ~ 부분).

| 방법 | 픽셀 입력 | task-agnostic world model | 재구성 없음 | 학습된 latent 공간의 계층 |
|---|---|---|---|---|
| 고전 계층 MPC | ✗ | ✓ | ✗ | ✗ |
| Director | ✓ | ✗ | ✗ | ✗ |
| Puppeteer | ✓ | ✗ | ✓ | ✗ |
| SPlaTES | ✗ | ✗ | ✓ | ~ |
| Schiewer et al. | ✗ | ✗ | ✗ | ✓ |
| THICK | ✓ | ~ | ✗ | ✗ |
| GCP | ✓ | ✓ | ✗ | ✗ |
| HWM | ✓ | ✓ | ✓ | ✗ |
| H-JEPA | ✓ | ✓ | ✓ | ✓ |

관련 wiki 페이지: [[physical-ai/yuan-2026-representation-world-model-learning-states]](LeWM 대비 IDM 기반 planning), [[physical-ai/sun-2026-vla-jepa-enhancing-vision-language-action-model-with]](JEPA 기반 latent 예측의 VLA 적용), [[physical-ai/hou-2026-world-model-for-robot-learning]](world model 서베이).

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| H-JEPA | action-conditioned JEPA를 여러 level로 쌓아 end-to-end로 학습하는 계층 world model |
| LeWM | LeWorldModel. 픽셀에서 SIGReg로 end-to-end 학습하는 단일 level JEPA world model로 H-JEPA의 level 1이자 flat baseline |
| HWM | 여러 horizon의 predictor를 두되 latent 공간을 공유하는 계층 world model. 논문에서는 level 1 위 인코더를 항등 함수로 둔 변형으로 재구현 |
| SIGReg | 무작위 방향으로 사영한 임베딩에 Epps-Pulley 정규성 검정을 적용해 등방성 Gaussian 분포로 유도하는 붕괴 방지 정규화항 |
| stride s_ℓ / window w_ℓ | 상위 level 상태 하나가 몇 step마다 오는지 / 몇 개의 하위 상태를 요약하는지 |
| macro-action | 상위 level에서 하위 action 임베딩 s_ℓ개를 묶어 만든 latent action |
| selective abstraction | 상위 level이 빠르고 예측 불가능한 세부를 버리고 느린 상태를 남기는 현상 |
| entity frequency gap | 가장 빠른 상태 개체와 가장 느린 개체의 spectral centroid 비율 |
| L-k projection 비용 | level-1 예측과 목표를 상위 인코더로 level k까지 올린 공간에서 잰 목표 거리 |
| slow-feature collapse | 인코더가 episode 내 상수인 배경만 담고 움직이는 agent를 버리는 붕괴 |
| Fréchet fidelity | 계획한 end-effector 누적 경로와 전문가 경로의 이산 Fréchet 거리를 0%(정지)~100%(일치)로 정규화한 오프라인 지표 |
| stagewise 학습 | 하위 level을 먼저 학습해 동결한 뒤 상위 level을 학습하는 방식 |

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 1 | 3단계 계층 planning 시각화와 연산량 대비 성공률 | caption-region | ★ wiki 권장 (overview) |
| fig02 | 3 | 계층 구성과 level별 학습 목적 함수 | caption-region | ★ wiki 권장 (method) |
| fig03 | 4 | 2단계 계층 planning 예시 | caption-region | ★ wiki 권장 (method) |
| fig04 | 5 | 계층에 따른 선택적 추상화 probe와 디코딩 | caption-region | ★ wiki 권장 (result) |
| fig05 | 5 | 주파수 격차와 선택적 추상화의 상관 | caption-region | ★ wiki 권장 (result) |
| fig06 | 6 | 연산 예산과 깊이에 따른 성공률 | caption-region | ★ wiki 권장 (result) |
| fig07 | 7 | level별 planning cost 지형 | caption-region | ★ wiki 권장 (analysis) |
| fig08 | 8 | 목표 비용과 subgoal 비용의 시간 변화 | caption-region | ★ wiki 권장 (analysis) |
| fig09 | 9 | DROID 장면 다양성, IDM, 계층 결과 | caption-region | ★ wiki 권장 (result) |
| fig10 | 21 | level별 학습 손실 곡선 | caption-region | (선택) |
| fig11 | 25 | 성공한 계층 planner 실행 예시 | caption-region | (선택) |
| fig12 | 27 | 주파수 분리 세부와 개체별 probe | caption-region | (선택) |
| fig13 | 28 | 학습 데이터 조합별 planning 성공률 | caption-region | ★ wiki 권장 (ablation) |
| fig14 | 31 | Cube에서 Fréchet fidelity 보정 | caption-region | (선택) |
| fig15 | 31 | RoboCasa에서 Fréchet fidelity 보정 | caption-region | (선택) |
| fig16 | 33 | DROID planner 상상 결과 디코딩 | caption-region | (선택) |
| fig17 | 34 | SIGReg, IDM, detach 격자 | caption-region | ★ wiki 권장 (ablation) |
| fig18 | 35 | SIGReg와 IDM 계수 교차 검증 | caption-region | (선택) |
| fig19 | 36 | latent 분산의 episode 내외 비율 | caption-region | (선택) |
| tab01 | 7 | AntMaze 비용 공간 ablation | table-region | ★ wiki 권장 (result) |
| tab02 | 18 | 기호 정의표 | table-region | (확인 필요) |
| tab03 | 20 | 깊이별 clip 구성과 개수 | table-region | ★ wiki 권장 (setup) |
| tab04 | 22 | 환경별 아키텍처와 학습 설정 | table-region | (선택) |
| tab05 | 23 | DROID 하이퍼파라미터 | table-region | (선택) |
| tab06 | 24 | probing 데이터와 개체 | table-region | (선택) |
| tab07 | 26 | 시뮬레이션 planning 설정 | table-region | (선택) |
| tab08 | 26 | DROID planning 설정 | table-region | (선택) |
| tab09 | 29 | 네 환경 비용 ablation | table-region | ★ wiki 권장 (ablation) |
| tab10 | 29 | 예측 비용 단조성 | table-region | ★ wiki 권장 (analysis) |
| tab11 | 35 | 분산 SIGReg sharding 불변성 | table-region | (선택) |
| tab12 | 38 | IDM 없는 SIGReg 사다리와 time repulsion | table-region | (선택) |
| tab13 | 40 | 계층 제어 방법 비교표 | table-region | (선택) |
