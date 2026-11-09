---
title: "MolmoAct2: Action Reasoning Models for Real-World Deployment"
type: paper
year: 2026
category: physical-ai
raw_path: raw/papers/fang-2026-molmoact2-action-reasoning-models-for.pdf
raw_filename: "fang-2026-molmoact2-action-reasoning-models-for.pdf"
source_collection: external
authors: "Haoquan Fang*, Jiafei Duan*, Donovan Clay, Sam Wang, Shuo Liu, Weikai Huang, Xiang Fan, Wei-Chuan Tsai, Shirui Chen, Yi Ru Wang, Shanli Xing 외, Zhongzheng Ren, Ali Farhadi, Dieter Fox, Ranjay Krishna (Ai2, University of Washington 외)"
arxiv_id: "2605.02881"
url: "https://arxiv.org/abs/2605.02881"
tags: [physical-ai, vla, manipulation, robot-dataset]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/fang-2026-molmoact2-action-reasoning-models-for/fig01.png
    raw: raw/papers/fang-2026-molmoact2-action-reasoning-models-for-figures/fig01.png
    caption: "MolmoAct2 개요. 왼쪽은 BimanualYAM, DROID, SO100/101 세 공개 로봇 데이터셋, 가운데는 pre-training된 MolmoAct2가 KV connection으로 action expert를 조건화하는 구조와 adaptive depth perception token을 추가한 MolmoAct2-Think, 오른쪽은 세 embodiment에 바로 배포한 장면과 가정, 실험실, 카페 환경 적응 사례다"
    page: 2
    bbox_norm: [0.1106,  0.0917,  0.8893,  0.2876]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/fang-2026-molmoact2-action-reasoning-models-for/fig02.png
    raw: raw/papers/fang-2026-molmoact2-action-reasoning-models-for-figures/fig02.png
    caption: "MolmoAct2 학습 데이터 구성. 공개 학술 로봇 데이터셋(Fractal, DROID, Bridge-V2, MolmoAct), MolmoAct2-BimanualYAM, MolmoAct2-SO100/101, 멀티모달 웹 데이터, embodied reasoning 데이터를 함께 섞는다"
    page: 7
    bbox_norm: [0.1134,  0.1103,  0.8953,  0.4619]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/fang-2026-molmoact2-action-reasoning-models-for/fig03.png
    raw: raw/papers/fang-2026-molmoact2-action-reasoning-models-for-figures/fig03.png
    caption: "MolmoAct2-BimanualYAM 수집 장치. 양팔 YAM, Intel RealSense D435와 D405 카메라, 확장형 카메라 거치대, IKEA 테이블로 구성하며 전체 비용은 6,000달러 미만이다"
    page: 8
    bbox_norm: [0.2596,  0.0844,  0.7401,  0.3814]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/fang-2026-molmoact2-action-reasoning-models-for/fig04.png
    raw: raw/papers/fang-2026-molmoact2-action-reasoning-models-for-figures/fig04.png
    caption: "MolmoAct2 post-training 구조. 이미지, 지시문, 로봇 state를 tokenize해 pre-training된 VLA에 넣고, 각 layer의 key와 value를 P_K, P_V 투영으로 같은 깊이의 action expert cross-attention에 넘긴다. VLA는 이산 action 토큰을 next-token prediction으로, action expert는 noise에서 연속 action을 flow matching으로 만들며, 정답 이산 action 구간은 expert 조건에서 마스킹한다"
    page: 11
    bbox_norm: [0.1002,  0.0674,  0.8998,  0.3426]
    strategy: manual
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/fang-2026-molmoact2-action-reasoning-models-for/fig05.png
    raw: raw/papers/fang-2026-molmoact2-action-reasoning-models-for-figures/fig05.png
    caption: "MolmoAct2-Think 개요. 직전 시점과 비교해 바뀐 영역의 depth 토큰만 다시 생성하고(T=1) 나머지는 캐시에서 재사용해 depth map을 갱신한 뒤, 그 상태로 action expert를 조건화한다"
    page: 15
    bbox_norm: [0.2597,  0.0729,  0.7403,  0.389]
    strategy: caption-region
    curated: true
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/fang-2026-molmoact2-action-reasoning-models-for/fig06.png
    raw: raw/papers/fang-2026-molmoact2-action-reasoning-models-for-figures/fig06.png
    caption: "RoboEval 벤치마크 비교. (A) 8개 양팔 과제별 성공률, (B) 완료 시간, 경로 길이, jerk 등 행동 지표를 정규화한 레이더 차트. 그림 범례의 MolmoAct가 이 논문의 fine-tuning 모델이다"
    page: 21
    bbox_norm: [0.1043,  0.0894,  0.894,  0.2652]
    strategy: caption-region
    curated: true
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/fang-2026-molmoact2-action-reasoning-models-for/fig07.png
    raw: raw/papers/fang-2026-molmoact2-action-reasoning-models-for-figures/fig07.png
    caption: "실세계 효율적 fine-tuning 평가 개요. 피펫 준비부터 장난감 정리까지 실험실 밖 8개 과제에서 MolmoAct2가 네 기준선보다 15%p 앞선다"
    page: 23
    bbox_norm: [0.106,  0.0729,  0.8939,  0.4946]
    strategy: caption-region
    curated: true
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/fang-2026-molmoact2-action-reasoning-models-for/fig08.png
    raw: raw/papers/fang-2026-molmoact2-action-reasoning-models-for-figures/fig08.png
    caption: "캐싱과 CUDA Graph 적용 후 control rate. MolmoAct2는 23.02Hz에서 55.79Hz로, MolmoAct2-Think는 8.04Hz에서 12.71Hz로 오르며, 이산 action 경로는 각각 14.17Hz와 6.82Hz다 (H100, LIBERO, action horizon 10)"
    page: 27
    bbox_norm: [0.1905,  0.0729,  0.8095,  0.3778]
    strategy: caption-region
    curated: true
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/fang-2026-molmoact2-action-reasoning-models-for/fig09.png
    raw: raw/papers/fang-2026-molmoact2-action-reasoning-models-for-figures/fig09.png
    caption: "DROID 평가 trajectory 예시"
    page: 45
    bbox_norm: [0.106,  0.1017,  0.894,  0.4518]
    strategy: caption-region
    curated: false
  - id: fig10
    label: Figure 10
    kind: figure
    file: assets/fang-2026-molmoact2-action-reasoning-models-for/fig10.png
    raw: raw/papers/fang-2026-molmoact2-action-reasoning-models-for-figures/fig10.png
    caption: "Bimanual YAM 평가 trajectory 예시"
    page: 46
    bbox_norm: [0.106,  0.1219,  0.894,  0.5993]
    strategy: caption-region
    curated: false
  - id: fig11
    label: Figure 11
    kind: figure
    file: assets/fang-2026-molmoact2-action-reasoning-models-for/fig11.png
    raw: raw/papers/fang-2026-molmoact2-action-reasoning-models-for-figures/fig11.png
    caption: "분포 밖(OOD) 교란 평가 trajectory 예시"
    page: 46
    bbox_norm: [0.106,  0.7185,  0.894,  0.8428]
    strategy: caption-region
    curated: false
  - id: fig12
    label: Figure 12
    kind: figure
    file: assets/fang-2026-molmoact2-action-reasoning-models-for/fig12.png
    raw: raw/papers/fang-2026-molmoact2-action-reasoning-models-for-figures/fig12.png
    caption: "SO-100 평가 trajectory 예시"
    page: 47
    bbox_norm: [0.106,  0.5765,  0.894,  0.891]
    strategy: caption-region
    curated: false
  - id: fig13
    label: Figure 13
    kind: figure
    file: assets/fang-2026-molmoact2-action-reasoning-models-for/fig13.png
    raw: raw/papers/fang-2026-molmoact2-action-reasoning-models-for-figures/fig13.png
    caption: "SO100/101 데이터의 언어 재주석 전후 동사 분포. put, take 같은 편중이 줄고 grasp, place, move가 늘며 other 범주가 크게 증가한다"
    page: 48
    bbox_norm: [0.1302,  0.2624,  0.8498,  0.5926]
    strategy: manual
    curated: false
  - id: fig14
    label: Figure 14
    kind: figure
    file: assets/fang-2026-molmoact2-action-reasoning-models-for/fig14.png
    raw: raw/papers/fang-2026-molmoact2-action-reasoning-models-for-figures/fig14.png
    caption: "SO10x 데이터셋 trajectory 예시"
    page: 49
    bbox_norm: [0.1444,  0.073,  0.8556,  0.3297]
    strategy: caption-region
    curated: false
  - id: tab01
    label: Table 1
    kind: table
    file: assets/fang-2026-molmoact2-action-reasoning-models-for/tab01.png
    raw: raw/papers/fang-2026-molmoact2-action-reasoning-models-for-figures/tab01.png
    caption: "MolmoAct2 멀티모달 웹 데이터 구성(Molmo2, Molmo2-ER, Tulu-3 합계 1,250만 샘플)"
    page: 4
    bbox_norm: [0.1888,  0.1446,  0.8112,  0.2969]
    strategy: table-region
    curated: false
  - id: tab02
    label: Table 2
    kind: table
    file: assets/fang-2026-molmoact2-action-reasoning-models-for/tab02.png
    raw: raw/papers/fang-2026-molmoact2-action-reasoning-models-for-figures/tab02.png
    caption: "MolmoAct2-FAST Tokenizer 학습용 embodiment 혼합 비율"
    page: 10
    bbox_norm: [0.1861,  0.1288,  0.8139,  0.2685]
    strategy: table-region
    curated: false
  - id: tab03
    label: Table 3
    kind: table
    file: assets/fang-2026-molmoact2-action-reasoning-models-for/tab03.png
    raw: raw/papers/fang-2026-molmoact2-action-reasoning-models-for-figures/tab03.png
    caption: "Molmo2-ER의 13개 embodied reasoning 벤치마크 결과"
    page: 18
    bbox_norm: [0.106,  0.1132,  0.8941,  0.4626]
    strategy: table-region
    curated: false
  - id: tab04
    label: Table 4
    kind: table
    file: assets/fang-2026-molmoact2-action-reasoning-models-for/tab04.png
    raw: raw/papers/fang-2026-molmoact2-action-reasoning-models-for-figures/tab04.png
    caption: "MolmoSpaces 과제별 성공률"
    page: 19
    bbox_norm: [0.1496,  0.2121,  0.8504,  0.3364]
    strategy: table-region
    curated: false
  - id: tab05
    label: Table 5
    kind: table
    file: assets/fang-2026-molmoact2-action-reasoning-models-for/tab05.png
    raw: raw/papers/fang-2026-molmoact2-action-reasoning-models-for-figures/tab05.png
    caption: "MolmoBot 시뮬레이션 held-out 환경 평가"
    page: 19
    bbox_norm: [0.1496,  0.2121,  0.8504,  0.3364]
    strategy: table-region
    curated: false
  - id: tab06
    label: Table 6
    kind: table
    file: assets/fang-2026-molmoact2-action-reasoning-models-for/tab06.png
    raw: raw/papers/fang-2026-molmoact2-action-reasoning-models-for-figures/tab06.png
    caption: "DROID 실세계 zero-shot 과제별 성공률"
    page: 20
    bbox_norm: [0.1135,  0.1148,  0.8865,  0.185]
    strategy: table-region
    curated: false
  - id: tab07
    label: Table 7
    kind: table
    file: assets/fang-2026-molmoact2-action-reasoning-models-for/tab07.png
    raw: raw/papers/fang-2026-molmoact2-action-reasoning-models-for-figures/tab07.png
    caption: "SO-100 실세계 zero-shot 과제별 점수"
    page: 20
    bbox_norm: [0.1141,  0.2416,  0.8859,  0.3165]
    strategy: table-region
    curated: false
  - id: tab08
    label: Table 8
    kind: table
    file: assets/fang-2026-molmoact2-action-reasoning-models-for/tab08.png
    raw: raw/papers/fang-2026-molmoact2-action-reasoning-models-for-figures/tab08.png
    caption: "LIBERO 네 과제군 성공률 비교"
    page: 22
    bbox_norm: [0.1961,  0.1559,  0.7989,  0.3954]
    strategy: table-region
    curated: false
  - id: tab09
    label: Table 9
    kind: table
    file: assets/fang-2026-molmoact2-action-reasoning-models-for/tab09.png
    raw: raw/papers/fang-2026-molmoact2-action-reasoning-models-for-figures/tab09.png
    caption: "환경 교란 아래 강건성 비교"
    page: 24
    bbox_norm: [0.1427,  0.1552,  0.8573,  0.2837]
    strategy: table-region
    curated: false
  - id: tab10
    label: Table 10
    kind: table
    file: assets/fang-2026-molmoact2-action-reasoning-models-for/tab10.png
    raw: raw/papers/fang-2026-molmoact2-action-reasoning-models-for-figures/tab10.png
    caption: "LIBERO-Long에서의 backbone ablation"
    page: 25
    bbox_norm: [0.2836,  0.1291,  0.711,  0.1975]
    strategy: table-region
    curated: false
  - id: tab11
    label: Table 11
    kind: table
    file: assets/fang-2026-molmoact2-action-reasoning-models-for/tab11.png
    raw: raw/papers/fang-2026-molmoact2-action-reasoning-models-for-figures/tab11.png
    caption: "VLM에서 action expert로의 조건화 방식 ablation"
    page: 25
    bbox_norm: [0.1054,  0.2092,  0.8962,  0.4201]
    strategy: table-region
    curated: false
  - id: tab12
    label: Table 12
    kind: table
    file: assets/fang-2026-molmoact2-action-reasoning-models-for/tab12.png
    raw: raw/papers/fang-2026-molmoact2-action-reasoning-models-for-figures/tab12.png
    caption: "flow 샘플 수 K ablation"
    page: 25
    bbox_norm: [0.1054,  0.5755,  0.8972,  0.6807]
    strategy: table-region
    curated: false
  - id: tab13
    label: Table 13
    kind: table
    file: assets/fang-2026-molmoact2-action-reasoning-models-for/tab13.png
    raw: raw/papers/fang-2026-molmoact2-action-reasoning-models-for-figures/tab13.png
    caption: "fine-tuning 설계 ablation"
    page: 26
    bbox_norm: [0.1494,  0.229,  0.8452,  0.366]
    strategy: table-region
    curated: false
  - id: tab14
    label: Table 14
    kind: table
    file: assets/fang-2026-molmoact2-action-reasoning-models-for/tab14.png
    raw: raw/papers/fang-2026-molmoact2-action-reasoning-models-for-figures/tab14.png
    caption: "MolmoAct2-Think의 depth fine-tuning 설계 ablation"
    page: 26
    bbox_norm: [0.1054,  0.3779,  0.8971,  0.4986]
    strategy: table-region
    curated: false
  - id: tab15
    label: Table 15
    kind: table
    file: assets/fang-2026-molmoact2-action-reasoning-models-for/tab15.png
    raw: raw/papers/fang-2026-molmoact2-action-reasoning-models-for-figures/tab15.png
    caption: "MolmoAct2 구조 하이퍼파라미터"
    page: 36
    bbox_norm: [0.2546,  0.0716,  0.7454,  0.4595]
    strategy: table-region
    curated: false
  - id: tab16
    label: Table 16
    kind: table
    file: assets/fang-2026-molmoact2-action-reasoning-models-for/tab16.png
    raw: raw/papers/fang-2026-molmoact2-action-reasoning-models-for-figures/tab16.png
    caption: "MolmoAct2 학습 하이퍼파라미터"
    page: 42
    bbox_norm: [0.1565,  0.0735,  0.8435,  0.3991]
    strategy: table-region
    curated: false
  - id: tab17
    label: Table 17
    kind: table
    file: assets/fang-2026-molmoact2-action-reasoning-models-for/tab17.png
    raw: raw/papers/fang-2026-molmoact2-action-reasoning-models-for-figures/tab17.png
    caption: "RoboEval 과제별 성능 지표 전체"
    page: 44
    bbox_norm: [0.106,  0.2153,  0.894,  0.8032]
    strategy: table-region
    curated: false
  - id: tab18
    label: Table 18
    kind: table
    file: assets/fang-2026-molmoact2-action-reasoning-models-for/tab18.png
    raw: raw/papers/fang-2026-molmoact2-action-reasoning-models-for-figures/tab18.png
    caption: "과제별, 위치별 성공률 세부"
    page: 45
    bbox_norm: [0.106,  0.5575,  0.9356,  0.8746]
    strategy: table-region
    curated: false
  - id: tab19
    label: Table 19
    kind: table
    file: assets/fang-2026-molmoact2-action-reasoning-models-for/tab19.png
    raw: raw/papers/fang-2026-molmoact2-action-reasoning-models-for-figures/tab19.png
    caption: "양팔 YAM 실세계 8개 과제 성공률"
    page: 47
    bbox_norm: [0.2506,  0.1005,  0.7494,  0.332]
    strategy: table-region
    curated: false
  - id: tab20
    label: Table 20
    kind: table
    file: assets/fang-2026-molmoact2-action-reasoning-models-for/tab20.png
    raw: raw/papers/fang-2026-molmoact2-action-reasoning-models-for-figures/tab20.png
    caption: "고정 카메라 위치에서의 SO-100 zero-shot 성공률"
    page: 47
    bbox_norm: [0.141,  0.3833,  0.859,  0.5798]
    strategy: table-region
    curated: false
  - id: tab21
    label: Table 21
    kind: table
    file: assets/fang-2026-molmoact2-action-reasoning-models-for/tab21.png
    raw: raw/papers/fang-2026-molmoact2-action-reasoning-models-for-figures/tab21.png
    caption: "SO-100/101 학습 데이터 요약 통계"
    page: 48
    bbox_norm: [0.3234,  0.6824,  0.672,  0.8826]
    strategy: table-region
    curated: false
  - id: tab22
    label: Table 22
    kind: table
    file: assets/fang-2026-molmoact2-action-reasoning-models-for/tab22.png
    raw: raw/papers/fang-2026-molmoact2-action-reasoning-models-for-figures/tab22.png
    caption: "SO-10x 로봇 종류별 데이터 분할"
    page: 49
    bbox_norm: [0.3044,  0.3835,  0.691,  0.4646]
    strategy: table-region
    curated: false
  - id: tab23
    label: Table 23
    kind: table
    file: assets/fang-2026-molmoact2-action-reasoning-models-for/tab23.png
    raw: raw/papers/fang-2026-molmoact2-action-reasoning-models-for-figures/tab23.png
    caption: "녹화 메타데이터와 feature 구성"
    page: 50
    bbox_norm: [0.2858,  0.1481,  0.7096,  0.3483]
    strategy: table-region
    curated: false
  - id: tab24
    label: Table 24
    kind: table
    file: assets/fang-2026-molmoact2-action-reasoning-models-for/tab24.png
    raw: raw/papers/fang-2026-molmoact2-action-reasoning-models-for-figures/tab24.png
    caption: "데이터셋 언어 주석 다양성"
    page: 50
    bbox_norm: [0.1865,  0.4702,  0.8089,  0.6089]
    strategy: table-region
    curated: false
  - id: tab25
    label: Table 25
    kind: table
    file: assets/fang-2026-molmoact2-action-reasoning-models-for/tab25.png
    raw: raw/papers/fang-2026-molmoact2-action-reasoning-models-for-figures/tab25.png
    caption: "기존 탁상 양팔 manipulation 데이터셋 비교"
    page: 50
    bbox_norm: [0.106,  0.7434,  0.9233,  0.8825]
    strategy: table-region
    curated: false
---

## 한 줄 요약 (One-line Summary)

MolmoAct2는 Ai2와 University of Washington이 공개한 완전 공개형 action reasoning VLA로, 전작 MolmoAct를 다섯 측면(embodied reasoning backbone Molmo2-ER, 세 개의 신규 로봇 데이터셋, 공개 action tokenizer MolmoAct2-FAST, per-layer KV conditioning으로 이산 VLM과 flow matching action expert를 잇는 구조, 바뀐 영역만 depth 토큰을 다시 예측하는 MolmoAct2-Think)에서 개선한다. 7개 시뮬레이션과 실세계 벤치마크에서 π0.5를 비롯한 기준선을 앞서고, LIBERO 평균 97.2%(Think 98.1%), DROID 실세계 zero-shot 87.1%, 양팔 YAM 실세계 fine-tuning 평균 50.1%를 기록한다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 제목 | MolmoAct2: Action Reasoning Models for Real-World Deployment |
| 저자 | Haoquan Fang, Jiafei Duan (공동 1저자) 외 다수, PI Ranjay Krishna |
| 소속 | Allen Institute for AI(Ai2), University of Washington, National University of Singapore, University of Pennsylvania, Johns Hopkins University, Amazon, Cortex AI, University of Michigan, UNC Chapel Hill |
| 공개 | arXiv 2605.02881 (v2 2026-05-08), cs.RO |
| 분량 | 본문 28쪽, 부록 포함 51쪽 |
| 공개 범위 | 모델 가중치(MolmoAct2, -Think, -Pretrain, -Finetune, Molmo2-ER), 학습 코드(allenai/molmoact2), 학습 데이터 전체 |
| 체크포인트 | MolmoAct2-Pretrain, MolmoAct2-Post, MolmoAct2-BimanualYAM, MolmoAct2-DROID, MolmoAct2-SO100/101, MolmoAct2-LIBERO, MolmoAct2-Think-LIBERO |

## 2. 주요 기여 (Key Contributions)

저자는 현재 VLA가 실제 배포에 못 미치는 이유를 네 가지로 든다. frontier 모델은 비공개이고, 공개 가중치 모델은 비싼 하드웨어에 묶여 있으며, reasoning을 붙인 policy는 grounding 비용으로 지연이 크고, fine-tuning 후 성공률도 신뢰할 수준에 못 미친다. MolmoAct2는 이에 대응해 다섯 가지를 바꾼다.

1. **Molmo2-ER backbone**: 공간 추론과 embodied reasoning에 특화한 VLM이다. 330만 샘플 corpus와 specialize-then-rehearse 레시피로 학습해 13개 embodied reasoning 벤치마크 평균 63.8%로 GPT-5와 Gemini Robotics ER-1.5를 넘는다.
2. **신규 로봇 데이터셋 세 개**: 720시간 분량의 양팔 teleoperation 데이터 MolmoAct2-BimanualYAM(공개 양팔 데이터셋 중 최대), 품질 필터링한 DROID Franka 부분집합 MolmoAct2-DROID, 품질 필터링한 SO-100/101 부분집합 MolmoAct2-SO100/101.
3. **MolmoAct2-FAST Tokenizer**: 다섯 embodiment의 수백만 trajectory로 학습한 공개 가중치, 공개 데이터 action tokenizer.
4. **새 VLA 구조**: 이산 토큰 VLM을 flow matching 연속 action expert에 per-layer key-value(KV) conditioning으로 결합한다.
5. **MolmoAct2-Think**: 시점 사이에 바뀐 장면 영역만 depth 토큰을 다시 예측하는 adaptive depth reasoning 변형이다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 Molmo2-ER

기존 VLM backbone은 의미 이해에 맞춰져 있어 로봇 제어에 필요한 거리, 빈 공간, 다시점 물체 추적, 장면 기하를 잘 다루지 못한다. Molmo2-ER은 Molmo2를 embodied perception 기술에 맞게 fine-tuning한 모델이다. 새 embodied reasoning corpus는 약 330만 샘플이며 여섯 능력 영역으로 나뉜다.

| 영역 | 데이터와 규모 |
|---|---|
| 단일 이미지 embodied QA | SAT(동적 추론), RoboPoint-QA(일반 VQA로 망각 방지), RefSpatial(객관식 25만, chain-of-thought 25만, pointing 8만), VST-P(단일 이미지 20만과 cross-view 20만), VSI-590K(이미지 20만, 영상 30만) |
| 영상 embodied QA | SIMS-VSI(20만 3천), RoboVQA(20만 부분집합) |
| pointing과 detection | RoboPoint 절차적 pointing 70만, LVIS 기반 detection 10만 |
| 다중 이미지와 ego-exo 대응 | SenseNova-SI(50만 부분집합), VST-P cross-view 20만 |
| 추상 embodied reasoning | CLEVR 5만, GRiD-3D 10만(물체 자체 기준 방향) |

Table 1 기준 멀티모달 웹 데이터 전체는 Molmo2 830만(가중치 0.46), Molmo2-ER 330만(0.46), Tulu-3 SFT 98만(0.08)으로 합계 1,250만 샘플이다.

학습은 Molmo2 전체를 다시 학습하지 않고 공개 체크포인트에서 시작하는 두 단계 specialize-then-rehearse 레시피를 쓴다.

- **Stage 1 (embodied 특화)**: Molmo2-4B mid-training 체크포인트에서 시작해 Molmo2-ER corpus에 Tulu-3 텍스트 8%를 섞어 2만 step 학습한다. 시퀀스 길이 4,200, global batch 64(2노드 x 8 H100).
- **Stage 2 (joint refinement)**: 1,500 step 추가 학습한다. NLP 비율 8%를 고정하고 나머지 92%를 embodied p와 일반 데이터 (1-p)로 나눈다. p를 0.30, 0.50, 0.70, 0.90으로 탐색해 p=0.5가 embodied 벤치마크와 Molmo2 일반 벤치마크 사이에서 가장 좋은 Pareto 균형을 보였다. 시퀀스 길이 16,384.

### 3.2 데이터

공개 corpus는 각각 한계가 있다. OXE는 embodiment 폭은 넓지만 품질과 제어 규약, 언어 주석이 고르지 않고, DROID는 단일 Franka 규모는 크지만 idle 구간, 실패 시도, 반복 지시문이 많으며, LeRobot 커뮤니티 SO-10x 데이터는 "lerobot_test" 같은 placeholder 주석이 섞여 있다. 고품질 양팔 데이터는 공개된 것이 없다.

| 데이터셋 | 출처 | 규모와 처리 |
|---|---|---|
| MolmoAct2-BimanualYAM | 자체 수집(Cortex AI 지원), 맞춤 양팔 YAM | 28개 이상 과제, 시연 데이터(demonstration) 3만 4,500개, 720시간 이상, 2개월 수집. 실패 재시도 횟수와 no-op 최대 길이를 규정 |
| MolmoAct2-SO100/101 | LeRobot 공개 데이터셋 1,660개 중 1,222개(기여자 377명) | episode 3만 8,059개, 1,980만 프레임, 약 184시간 |
| MolmoAct2-DROID | DROID 원본 | 확장 언어 주석과 idle 프레임 필터 적용. 유효 episode 7만 4,604개, 1,775만 8,044 프레임 |
| 학술 데이터 | OXE 부분집합(BC-Z, BridgeData V2, RT-1)과 MolmoAct Dataset | embodiment 폭 보강용 |
| 멀티모달 | Molmo2-ER 46%, Molmo2 46%, Tulu-3 8% | VLM 능력 유지용 co-training |

양팔 YAM 수집 장치는 시중에서 살 수 있는 부품만 쓰고 전체 비용이 6,000달러 미만이다. SO100/101 필터링은 네 단계다. (i) 구조 검사(스키마, NaN, 손상 샘플), (ii) 평가용 데이터셋 제거, (iii) 라이선스와 codebase 적격성 검사, (iv) TOPReward 품질 게이트(마지막 3개 샘플 episode의 평균 TOPReward가 사람이 검수한 고품질 데이터셋 평균보다 높은 것만 유지). 이 과정에서 438개 데이터셋이 제외됐다.

언어 재주석은 Qwen3.5-27B VLM에 프레임 샘플과 원래 지시문을 주고 새 지시문을 쓰게 한다. 다양성을 위해 무작위 단어 수를 지정한다. 재주석으로 고유 지시문 수가 7만 1,121개(22%)에서 14만 6,485개(46%)로 두 배가 됐다. 예를 들어 BC-Z 데이터는 3만 9,350 episode에 고유 지시문이 104개(0.26%)뿐이었다.

### 3.3 학습 단계 개요

MolmoAct2는 세 단계로 학습한다. VLM과 연속 action expert를 처음부터 함께 학습하면 로봇 토큰 인터페이스, 새 state/action 임베딩, flow matching 컨트롤러를 동시에 배워야 해 최적화가 어렵기 때문이다.

| 단계 | 산출물 | 핵심 |
|---|---|---|
| Pre-training | MolmoAct2-Pretrain | Molmo2-ER을 이산 autoregressive 로봇 policy로 적응. next-token 목적만 사용 |
| Post-training | MolmoAct2-Post | flow matching action expert를 per-layer KV conditioning으로 부착. 이산과 연속 action을 함께 지도 |
| Deployment | embodiment별 체크포인트 | embodiment별 fine-tuning과 추론 최적화 |

### 3.4 MolmoAct2-FAST Tokenizer

FAST(Pertsch 2025)를 따르는 공개 가중치, 공개 데이터 tokenizer다. 원리는 같지만 기존 FAST 가중치는 학습 데이터가 명시되지 않아 재현성이 떨어진다는 점을 보완한다. 1초 action trajectory를 주파수 영역 변환, 계수 양자화, byte-pair encoding으로 2,048개 어휘의 이산 토큰열로 바꾼다.

| 데이터셋 | 비율 | 로봇 | action 표현 |
|---|---|---|---|
| MolmoAct2-BimanualYAM | 30% | YAM | 절대 관절 |
| MolmoAct2-SO100/101 | 30% | SO-100/101 | 절대 관절 |
| MolmoAct2-DROID | 30% | Franka | 절대 관절 |
| Fractal | 3.33% | Google Robot | delta end-effector |
| BC-Z | 3.33% | Google Robot | delta end-effector |
| Bridge | 3.33% | WidowX | delta end-effector |

100만 개 action 시퀀스를 subsample해 학습한다. 각 시퀀스는 로봇 움직임 1초이므로 chunk 안 action 수는 원 데이터의 control frequency가 정한다. action은 32차원으로 padding하고, 연속 차원은 1~99 percentile 통계로 정규화하며, 그리퍼 명령은 이진 또는 좁은 범위 신호라 따로 다룬다.

### 3.5 Pre-training 레시피

- **모델**: Molmo2-ER 체크포인트에서 시작한다. SigLIP2 ViT의 뒤에서 세 번째와 아홉 번째 layer feature를 pooling해 connector가 LLM 임베딩 공간으로 투영한다.
- **데이터 비율**: 멀티모달 10%, 로봇 90%. 로봇 몫 안에서 YAM, SO-100/101, DROID가 각각 30%, 나머지 10%를 BC-Z, BridgeData V2, RT-1, MolmoAct Dataset이 나눈다.
- **입력 처리**: 고해상도 타일 대신 단일 resized crop을 쓰고, 영상은 최대 8프레임을 최대 2 FPS로 샘플링한다. 기하 변형, color jitter, blur augmentation을 쓰고 다중 카메라 순서를 episode 단위로 섞는다.
- **setup/control 문자열**: `<setup_start>bimanual yam robotic arms in molmoact2<setup_end>`, `<control_start>absolute joint pose<control_end>` 같은 특수 토큰 래퍼로 embodiment와 제어 방식을 알린다.
- **state 토큰**: 정규화한 proprioception 값을 각각 256개 state 토큰 중 하나로 균일 이산화해 action 대상 앞에 붙인다.
- **학습**: 20만 step, 최대 시퀀스 길이 4,200 토큰, 여러 짧은 예제를 한 시퀀스로 묶는 on-the-fly packing(attention mask로 분리). global batch 128, 64 H100에서 약 5,760 GPU 시간. vision encoder와 connector 학습률 5e-6, LLM 1e-5.

### 3.6 Post-training과 per-layer KV conditioning

Post-training은 pre-training된 VLM에 DiT 형태의 flow matching action expert를 붙인다. VLM은 시각과 언어 grounding과 로봇 state 맥락을 맡고, expert는 noise action chunk를 실행 가능한 trajectory로 바꾸는 velocity field를 맡는다.

flow matching 목적은 다음과 같다. 정규화한 목표 action chunk a, 가우시안 noise ε, 시간 t ∈ [0,1]에 대해 x_t = (1-t)ε + ta, 목표 velocity u* = a - ε로 두고, expert f_θ(x_t, t, c)가 u*를 예측하도록 마스크 m을 곱한 제곱 오차 L_flow를 최소화한다. c는 과제, 시각 observation, setup/control 문자열, 이산 state 토큰을 담은 VLM 맥락이다. 추론은 가우시안 noise에서 시작해 velocity field를 적분한다.

expert는 VLM과 같은 깊이(L=36 layer)를 가진다. 각 block은 action self-attention, VLM으로의 cross-attention, MLP 순서이며, 시간 임베딩이 세 residual 가지에 DiT 형태의 shift, scale, gate(AdaRMS)를 준다. 핵심은 cross-attention의 조건이다. VLM layer ℓ의 self-attention이 만든 key와 value를 학습형 adapter 투영 P_K, P_V로 expert 폭에 맞춘 뒤, expert block ℓ이 이를 받아 softmax(Q K^T / √d_h) V를 계산한다. 즉 마지막 hidden state 하나가 아니라 같은 깊이의 VLM attention state를 그대로 본다.

Post-training 레시피의 세부는 다음과 같다.

- **다중 flow 샘플**: action chunk마다 (ε, t) 쌍을 K=4개 뽑아 같은 VLM 맥락을 재사용한다. fine-tuning의 K=8을 쓰지 않은 것은 GPU 메모리 때문이다.
- **padding과 packing**: action을 최대 30 step, 32차원으로 오른쪽 padding하고 horizon 마스크와 차원 마스크로 손실에서 뺀다. packed 시퀀스당 action chunk를 최대 5개로 맞춰 메모리를 안정화한다.
- **목적 함수**: L_post = L_LM + L_flow. 이산 action 토큰 구간은 expert 조건 경로에서 마스킹해, expert가 정답 이산 action을 보고 연속 action을 맞히지 못하게 한다.
- **knowledge insulation**: expert가 받는 VLM key와 value를 detach해 L_flow가 VLM으로 역전파되지 않게 한다. VLM은 L_LM으로만 갱신된다.
- **학습**: 로봇 batch 시퀀스 2,100 토큰, VLM batch 4,200 토큰. 10만 update, global batch 128, 64 H100에서 약 2,304 GPU 시간. action expert 학습률 5e-5.

### 3.7 embodiment별 fine-tuning

fine-tuning은 MolmoAct2-Post에서 시작해 같은 구조와 학습률을 쓴다. post-training과의 차이는 네 가지다. 로봇 데이터만 쓰고, flow 샘플을 4개에서 8개로 늘리며, knowledge insulation을 끄고(일관된 이득이 없었다), 추가 토큰 입력 임베딩은 고정하고 LM 출력 head와 최종 정규화만 조정한다.

| 체크포인트 | 카메라 | action | chunk | 학습 |
|---|---|---|---|---|
| BimanualYAM | top, left, right 고정 | 절대 관절 | 30 step (30Hz) | batch 128, 10만 update, 64 H100, 약 2,304 GPU 시간 |
| DROID | 외부 카메라 하나와 손목 카메라 | 절대 관절 | 15 step (15Hz) | batch 64, 10만 update, 32 H100, 약 1,152 GPU 시간. 공정 비교를 위해 추가 언어 주석 미사용 |
| SO100/101 | episode 단위 순서 무작위 | 절대 관절 | 30 step (30Hz) | batch 64, 10만 update, 32 H100, 약 1,152 GPU 시간 |
| LIBERO | 전면, 손목 | 상대 end-effector | 10 step (10Hz) | 네 과제군 통합, batch 64, 5만 update 중 4만 update 체크포인트 선택 |
| 기타 실세계 평가 | 메타데이터 순서 고정 | 데이터셋 따름 | control frequency와 동일 | 8 H100, batch 16, 5만 update |

### 3.8 추론 최적화

MolmoAct2의 추론 시간은 대부분 action expert의 고정 step flow 적분이 차지한다. 한 chunk 안에서 VLM 맥락은 flow step 사이에 변하지 않으므로 맥락 의존 cross-attention 상태와 위치 의존 항을 캐시해 재사용한다. 또한 고정 형태의 flow 루프를 CUDA Graph로 캡처해 Python과 kernel launch 오버헤드를 줄인다.

### 3.9 MolmoAct2-Think

MolmoAct는 depth 토큰 예측을 중간 reasoning 단계로 넣었지만 매 step 전체를 다시 예측해 느렸다. MolmoAct2-Think는 depth 예측을 시간에 따라 adaptive하게 만든다.

- **depth 표현**: 각 observation의 depth map을 10x10 격자, 위치당 128개 코드 중 하나로 양자화한다. 즉 100개 depth 토큰이다. Depth Anything V2로 단안 depth를 추정하고 MolmoAct의 depth VQ-VAE(320x320 입력, downsampling 32)로 코드화한다.
- **갱신 마스크**: 다음 프레임 RGB를 320x320으로 줄여 32x32 patch 100개로 나누고, 직전 프레임 patch와의 cosine similarity가 0.996 미만이면 갱신 칸으로 표시한다. 갱신되지 않은 칸은 직전 buffer 값을 이어받는다. 모델은 이 buffer 코드를 정답으로 학습한다.
- **post-training**: MolmoAct2-Pretrain에서 시작해 MolmoAct2와 같은 레시피를 쓰고, 로봇 데이터에서 action 예측, depth 예측, depth 후 action 예측 세 과제를 균일 샘플링한다.
- **fine-tuning 차이**: (1) action과 depth 후 action 두 과제만 샘플링, (2) teacher forcing하는 depth 입력 토큰의 10%를 무작위 코드로 바꾸는 noise 주입, (3) action expert의 per-layer KV 조건 중 depth 부분에 학습형 gate 적용. gate는 해당 VLM layer의 비 depth 맥락 value 평균으로 sigmoid 값을 계산하고 bias -4로 초기화해 처음에는 depth를 거의 쓰지 않는 상태에서 출발한다.
- **추론**: 캐시가 없으면 depth 100개를 모두 생성한다. 캐시가 있으면 같은 cosine 기준으로 바뀐 칸만 argmax decoding하고 나머지는 이전 buffer를 known 토큰으로 재생한다. 연속된 불변 구간은 한 번에 재생한다. 채운 depth prefix까지 포함한 VLM key와 value를 action expert가 받아 action chunk를 만든다.
- **추론 최적화**: 갱신 패턴마다 decode 일정이 달라 전체 루프를 graph로 캡처할 수 없다. scheduler는 eager로 두고 static KV cache를 미리 할당하며, attention 이후부터 다음 layer attention 이전까지의 고정 형태 연산만 CUDA Graph 단계로 캡처한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 Molmo2-ER (Table 3)

13개 벤치마크 중 9개에서 모든 기준선을 앞서고 평균 63.8%로 두 번째인 Gemini Robotics ER 1.5 Thinking(61.3%)보다 2.5%p 높다. 출발점 Molmo2(46.8%)보다 17.0%p 오른다.

| 모델 | 평균 |
|---|---|
| GR-ER 1.5 Thinking | 61.3% |
| GR-ER 1.5 | 55.0% |
| Gemini 2.5 Pro | 57.1% |
| GPT-5 | 57.9% |
| GPT-5-mini | 53.8% |
| Qwen3-VL-4B | 59.0% |
| Qwen3-VL-8B | 61.0% |
| LLaVA-OV-7B | 38.1% |
| InternVL3.5-4B | 49.4% |
| InternVL3.5-8B | 52.4% |
| Molmo2 | 46.8% |
| Molmo2-ER | 63.8% |

Molmo2-ER의 벤치마크별 점수는 Point-Bench 77.3, RefSpatial 52.5, RoboSpatial-Point 32.0, Where2Place 54.0, BLINK 72.5, CV-Bench 87.8, ERQA 46.8, EmbSpatial 78.8, MindCube 57.0, RoboSpatial-VQ 73.4, SAT 78.0, OpenEQA 44.7, VSI-Bench 74.5다.

### 4.2 out-of-the-box 배포

시뮬레이션은 DROID 장치를 복제한 MolmoSpaces와 MolmoBot에서 MolmoAct2-DROID를 zero-shot 평가한다.

| MolmoSpaces (Table 4) | Pick | Pick & Place | Open | Close | 평균 |
|---|---|---|---|---|---|
| StereoVLA | 7.0 | - | - | - | 7.0 |
| LAP-VLA | 24.9 | 6.6 | 11.4 | 45.9 | 22.2 |
| π0-DROID | 16.2 | 12.5 | 11.0 | 53.1 | 23.2 |
| π0.5-DROID | 36.4 | 13.6 | 22.7 | 65.1 | 34.5 |
| MolmoAct2-DROID | 43.7 | 26.7 | 9.5 | 70.8 | 37.7 |

MolmoAct2-DROID는 평균 37.7%로 π0.5-DROID보다 3.2%p 높고, Pick에서 7.3%p, Pick & Place에서 13.1%p 앞선다. 반면 Open은 9.5%로 기준선보다 낮아 articulated object 상호작용이 약점으로 남는다.

MolmoBot(Table 5, 과제당 1,000 episode) 평균은 MolmoAct2-DROID 20.6%, π0.5-DROID 10.0%, LAP-VLA 4.8%, X-VLA 1.2%다. 본문은 이 차이를 +10.6%p로 보고한다. Pick MSProc에서 35.6% 대 18.1%, Pick Classic 18.9% 대 6.4%다.

실세계 zero-shot은 카메라 위치를 무작위로 두고, 모든 물체와 환경을 학습 분포 밖으로 둔다. 과제당 15회, 부분 점수 부여.

| DROID 실세계 (Table 6) | Apple on plate | Pipette in tray | Red cube in tape roll | Knife in box | Objects in bowl | 평균 |
|---|---|---|---|---|---|---|
| π0.5-DROID | 66.7 | 33.3 | 53.3 | 26.7 | 46.2 | 45.2 |
| MolmoBot | 86.7 | 53.3 | 33.3 | 40.0 | 28.6 | 48.4 |
| MolmoAct2-DROID | 100.0 | 86.7 | 93.3 | 93.3 | 62.0 | 87.1 |

| SO-100 실세계 (Table 7) | Fork on plate | Stack blocks | Tissues in basket | Pen on notebook | Block in box | 평균 |
|---|---|---|---|---|---|---|
| SmolVLA | 3.3 | 5.0 | 0.0 | 3.3 | 0.0 | 2.3 |
| π0-SO100/101 | 30.0 | 6.7 | 20.0 | 80.0 | 90.0 | 45.3 |
| MolmoAct2-SO100/101 | 70.0 | 20.0 | 73.3 | 86.7 | 33.3 | 56.7 |

SO-100 점수는 reach 0.25, pickup 0.5, 배치 성공 1.0의 부분 점수다. π0-SO100/101은 저자들이 MolmoAct2-SO100/101 데이터로 직접 fine-tuning한 π0다. MolmoAct2-DROID는 두 번째 모델 MolmoBot보다 38.7%p, MolmoAct2-SO100/101은 π0보다 11.4%p 높다. 단 Block in box는 π0가 90.0으로 높다.

### 4.3 fine-tuning

| LIBERO (Table 8) | Spatial | Object | Goal | Long | 평균 |
|---|---|---|---|---|---|
| TraceVLA | 84.6 | 85.2 | 75.1 | 54.1 | 74.8 |
| OpenVLA | 84.7 | 88.4 | 79.2 | 53.7 | 76.5 |
| SpatialVLA | 88.2 | 89.9 | 78.6 | 55.5 | 78.1 |
| CoT-VLA | 87.5 | 91.6 | 87.6 | 69.0 | 83.9 |
| π0 | 96.8 | 98.8 | 95.8 | 85.2 | 94.2 |
| ThinkAct | 88.3 | 91.4 | 87.1 | 70.9 | 84.4 |
| MolmoAct-7B-D | 87.0 | 95.4 | 87.6 | 77.2 | 86.6 |
| GR00T N1.7 | 97.7 | 97.5 | 98.5 | 94.4 | 97.0 |
| π0.5 | 98.8 | 98.2 | 98.0 | 92.4 | 96.9 |
| NORA-1.5 | 97.3 | 96.4 | 94.5 | 89.6 | 94.5 |
| MolmoAct2 | 97.8 | 100.0 | 97.8 | 93.2 | 97.2 |
| MolmoAct2-Think | 98.8 | 99.8 | 98.5 | 95.4 | 98.1 |

MolmoAct2는 평균 97.2%로 MolmoAct-7B-D보다 10.6%p 높고 Object에서 100%를 기록한다. 다만 GR00T N1.7(97.0%), π0.5(96.9%)와의 차이는 0.2~0.3%p로 작다.

RoboEval(양팔 Franka, 8개 과제)에서 MolmoAct2는 성공률 44.3%로 π0.5보다 3.8%p 높다. trajectory 품질 지표도 개선한다. Stack Two Blocks 완료 시간이 π0.5 5.87초, Diffusion Policy 7.27초에 비해 4.70초이고 관절 경로 길이는 2.16에서 1.04로 약 2배 짧다. Rotate Valve 완료 시간도 8.51초로 π0.5의 9.69초보다 짧다. 단 Figure 6과 Table 17 범례에는 모델이 "MolmoAct"로 표기돼 있다.

실세계 양팔 YAM과 모바일 양팔 YAM 8개 과제(과제당 50회, 과제당 공간 변형 3개로 데이터 수집)에서 MolmoAct2는 8개 중 7개 과제에서 기준선을 앞선다. 본문은 평균 50.1%로 OpenVLA-OFT보다 15%p 높다고 적고, 부록 Table 19는 다음과 같다.

| 과제 (Table 19) | π0.5 | Cosmos Policy | X-VLA | OpenVLA-OFT | MolmoAct2 |
|---|---|---|---|---|---|
| Cup Stacking | 62.0 | 64.5 | 5.5 | 60.5 | 54.0 |
| Linearbot | 11.6 | 9.2 | 5.2 | 24.4 | 64.0 |
| Pegboard | 2.0 | 0.0 | 3.0 | 4.5 | 14.0 |
| Cup Storing | 85.9 | 0.0 | 7.9 | 96.0 | 100.0 |
| Candy Storing | 26.0 | 0.0 | 3.8 | 26.5 | 40.5 |
| Store Test Tube | 17.0 | 11.0 | 0.0 | 42.0 | 67.0 |
| Store Toys | 26.0 | 7.0 | 2.5 | 2.0 | 32.0 |
| Prepare Pipette | 27.5 | 32.0 | 11.5 | 28.5 | 33.0 |
| 평균 | 32.2 | 15.5 | 4.9 | 35.5 | 50.6 |

부록 표의 평균은 50.6%로 본문 50.1%와 0.5%p 다르고, 과제 이름도 본문(stack_cups, hang_tools, shelf_cups, make_popcorn 등)과 부록(Linearbot, Pegboard 등)이 일부 다르다.

### 4.4 MolmoAct2-Think

LIBERO에서 Think는 네 과제군 중 세 개에서 MolmoAct2보다 높고 Object(99.8% 대 100%)는 사실상 같다. 가장 큰 향상은 가장 어려운 Long에서 +2.2%p(93.2%에서 95.4%)이고, 2,000 rollout 평균은 97.2%에서 98.1%로 0.9%p 오른다.

### 4.5 OOD 강건성 (Table 9)

양팔 과제 4개(stack_cups, store_test_tubes, store_candy, prepare_pipette)를 MolmoAct2-Post에서 따로 fine-tuning하고 spatial, lighting, language, distractor 네 교란에서 과제당 20회(교란당 5회) 평가한다.

| 모델 | Spatial | Lighting | Language | Distractor | 전체 |
|---|---|---|---|---|---|
| π0.5 | 15.00 | 33.70 | 26.15 | 33.20 | 27.01 |
| Cosmos Policy | 8.75 | 17.50 | 5.00 | 13.75 | 11.25 |
| X-VLA | 3.75 | 8.30 | 9.95 | 3.75 | 6.44 |
| OpenVLA-OFT | 13.75 | 46.25 | 51.25 | 48.30 | 39.89 |
| MolmoAct2-Think | 26.25 | 62.05 | 60.35 | 54.10 | 50.69 |

전체 평균 50.69%로 OpenVLA-OFT보다 10.80%p 높다. 차이가 가장 작은 항목은 Distractor(5.8%p)이고 절대 점수가 가장 낮은 항목은 Spatial(26.25%)이다. 표 캡션과 본문은 "MolmoAct2"로 서술하지만 표 행 이름은 MolmoAct2-Think다.

### 4.6 ablation (LIBERO)

| 항목 | 설정 | 결과 |
|---|---|---|
| backbone (Table 10, Long, 이산 action만, 6만 step) | Molmo2 | 77.6% |
| | Molmo2-ER | 83.6% (+6.0%p) |
| 조건화 방식 (Table 11, 평균) | hidden-state | 94.0% |
| | per-head per-layer KV | 94.8% |
| | per-layer KV | 95.9% |
| flow 샘플 수 K (Table 12, 평균) | K=1 | 94.15% |
| | K=2 | 95.05% |
| | K=4 | 95.15% |
| | K=8 | 95.90% |

hidden-state 조건화는 Spatial(97.0%)에서는 가장 높지만 Object, Goal, Long에서 더 떨어진다. per-head 변형은 VLM과 expert의 KV head 수를 일치(8개)시켜야 한다. K는 Long에서 K=2가 92.2%로 가장 높아 단조 증가는 아니지만 평균은 K가 클수록 좋다.

| fine-tuning 설계 (Table 13) | Spatial | Object | Goal | Long | 평균 |
|---|---|---|---|---|---|
| 이산 co-training 없음, KI 없음, full | 95.8 | 98.6 | 98.4 | 95.0 | 96.95 |
| 이산 co-training, KI 사용, full | 96.8 | 99.4 | 97.2 | 94.8 | 97.05 |
| 이산 co-training, KI 없음, LoRA | 98.0 | 99.4 | 97.2 | 90.4 | 96.25 |
| 이산 co-training 없음, KI 없음, action expert만 | 91.6 | 97.6 | 93.8 | 89.2 | 93.05 |
| 이산 co-training, KI 없음, full (최종) | 97.8 | 100.0 | 97.8 | 93.2 | 97.20 |

이산 co-training을 빼면 평균은 비슷하지만 Long이 오르고 Spatial과 Object가 내려간다. LoRA는 Long에서 2.8%p 손실이 있고, action expert만 학습하면 93.05%로 가장 낮다.

| Think depth fine-tuning (Table 14) | Spatial | Object | Goal | Long | 평균 |
|---|---|---|---|---|---|
| mixed 없음, noise 없음, gate 없음 | 97.6 | 99.6 | 96.6 | 96.2 | 97.50 |
| mixed만 | 98.8 | 99.8 | 96.6 | 95.4 | 97.65 |
| 셋 모두 (최종) | 98.8 | 99.8 | 98.4 | 95.4 | 98.10 |

noise 주입과 depth gate를 빼면 평균이 98.10%에서 97.65%로 내려가고 주로 Goal에서 1.8%p 하락한다. mixed training까지 빼면 97.50%다.

### 4.7 추론 속도 (Figure 8)

단일 H100, LIBERO, action horizon 10 기준 control rate(horizon / 지연)다.

| 경로 | MolmoAct2 | MolmoAct2-Think |
|---|---|---|
| 원래 구현 | 23.02Hz | 8.04Hz |
| 캐싱 | 27.39Hz | 9.72Hz |
| 캐싱 + CUDA Graph | 55.79Hz (2.42배) | 12.71Hz (1.58배) |
| 캐싱 + CUDA Graph, 이산 action 경로 | 14.17Hz | 6.82Hz |

MolmoAct2는 고정 형태 flow step이 kernel launch 오버헤드에 지배되므로 graph replay 효과가 크다. Think는 adaptive depth 단계가 순차적, 가변 길이 decoding이라 효과가 작다. 이산 action 경로는 연속 경로보다 3.94배(Think 1.86배) 느려 기본 배포 경로는 연속 경로다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **관절 물체**: MolmoSpaces Open 과제에서 9.5%로 기준선(π0.5-DROID 22.7%)보다 낮다. 저자는 articulated object 상호작용을 개선 방향으로 남긴다.
- **세밀한 공간 일반화**: OOD 평가 Spatial 항목에서 26.25%로 가장 낮다.
- **Think의 속도**: adaptive depth를 써도 12.71Hz로 MolmoAct2(55.79Hz)보다 4배 이상 느리고, 가변 decode 일정 때문에 graph 캡처가 부분적으로만 가능하다.
- **일부 과제 열세**: SO-100 Block in box(33.3% 대 π0 90.0%), 양팔 YAM Cup Stacking(54.0% 대 Cosmos Policy 64.5%)에서 기준선에 뒤진다.
- **절대 성공률**: 양팔 YAM 실세계 평균이 50%대로, 서론이 지적한 "신뢰할 배포 수준"에는 여전히 거리가 있다.
- **보고 불일치**: 실세계 평균(본문 50.1%, 부록 50.6%), 과제 이름, 그림 범례의 "MolmoAct" 표기, Table 9 캡션과 행 이름(MolmoAct2 대 MolmoAct2-Think)이 서로 다르다.
- **depth 정답의 출처**: depth 정답 코드는 실제 센서가 아니라 Depth Anything V2 추정값이다.

## 6. 관련 연구 (Related Work)

- **generalist manipulation policy와 VLA**: RT-1, RT-2, OpenVLA, π0, π0.5, SpatialVLA, CoT-VLA. 저자는 π 계열 같은 frontier VLA가 데이터와 코드가 비공개라 재현이 어렵다는 점을 지적하고, 전작 MolmoAct와 함께 완전 공개를 내세운다.
- **embodied reasoning**: 텍스트 chain-of-thought는 로봇 조작에 이득이 제한적이라 bounding box, point, 미래 이미지(CoT-VLA), latent reasoning, 2D/3D point trajectory(ThinkAct, MolmoAct) 같은 비텍스트 embodied CoT가 등장했다. adaptive depth와 가장 가까운 연구는 RGB를 마스킹하고 visual tracing을 조건으로 쓰는 PEEK다. 이들 방법의 공통 단점은 action 전에 토큰을 많이 소비해 지연이 크다는 점이다.
- **VLM과 action expert 연결**: action을 vector quantization으로 완전 이산화하는 방식(RT-2, OpenVLA, FAST)과 diffusion이나 flow matching action expert를 붙이는 방식(π0)이 있다. 일반적인 연속 expert와 GR00T N1 계열은 마지막 hidden state만 조건으로 쓰지만 MolmoAct2는 per-layer KV로 backbone의 계층 feature 전체를 준다.
- **knowledge insulation**: Driess 2025(π0.5-KI)의 레시피를 post-training에 쓴다.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| action reasoning model | action을 내기 전에 공간 표현 같은 중간 reasoning을 거치는 VLA. MolmoAct 계열의 자기 명칭 |
| Molmo2-ER | Molmo2를 330만 샘플 embodied reasoning corpus로 fine-tuning한 VLM backbone |
| specialize-then-rehearse | embodied 데이터로 먼저 특화한 뒤 원래 일반 데이터를 다시 섞어 망각을 막는 두 단계 학습 레시피 |
| MolmoAct2-FAST Tokenizer | 학습 데이터 구성을 공개한 FAST 방식 action tokenizer. 1초 32차원 action을 2,048개 어휘 토큰으로 압축한다 |
| per-layer KV conditioning | action expert의 각 block이 같은 깊이 VLM layer의 key와 value를 투영해 cross-attention 조건으로 쓰는 구조 |
| adaptive depth reasoning | 직전 시점과 RGB patch가 달라진 칸의 depth 토큰만 다시 예측하고 나머지는 캐시에서 재사용하는 reasoning 방식 |
| depth gate | depth 토큰의 key와 value에만 곱하는 layer별 학습형 sigmoid gate. bias -4로 초기화한다 |
| TOPReward | 데이터셋 품질을 점수로 매겨 낮은 품질의 커뮤니티 데이터를 거르는 기준 |
| YAM | Yet Another Manipulator. MolmoAct2-BimanualYAM 수집에 쓴 저가 로봇 팔 |

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 2 | "MolmoAct2 전체 개요(데이터, 모델, 배포)" | caption-region | ★ wiki 권장 (overview) |
| fig02 | 7 | "학습 데이터 구성" | caption-region | ★ wiki 권장 (data) |
| fig03 | 8 | "양팔 YAM 수집 장치" | caption-region | ★ wiki 권장 (data) |
| fig04 | 11 | "per-layer KV conditioning 구조" | manual | ★ wiki 권장 (architecture) |
| fig05 | 15 | "MolmoAct2-Think adaptive depth" | caption-region | ★ wiki 권장 (method) |
| fig06 | 21 | "RoboEval 성공률과 trajectory 품질 레이더" | caption-region | ★ wiki 권장 (result) |
| fig07 | 23 | "실세계 8개 과제 fine-tuning 평가" | caption-region | ★ wiki 권장 (result) |
| fig08 | 27 | "캐싱과 CUDA Graph 후 control rate" | caption-region | ★ wiki 권장 (result) |
| fig09 | 45 | "DROID 평가 trajectory 예시" | caption-region | (보관) |
| fig10 | 46 | "Bimanual YAM 평가 trajectory 예시" | caption-region | (보관) |
| fig11 | 46 | "OOD 교란 평가 trajectory 예시" | caption-region | (보관) |
| fig12 | 47 | "SO-100 평가 trajectory 예시" | caption-region | (보관) |
| fig13 | 48 | "언어 재주석 전후 동사 분포" | manual | (보관) |
| fig14 | 49 | "SO10x trajectory 예시" | caption-region | (보관) |
| tab01 | 4 | "멀티모달 웹 데이터 구성" | table-region | (본문 표로 옮김) |
| tab02 | 10 | "FAST tokenizer embodiment 혼합" | table-region | (본문 표로 옮김) |
| tab03 | 18 | "Molmo2-ER embodied reasoning 결과" | table-region | (본문 표로 옮김) |
| tab04 | 19 | "MolmoSpaces 결과" | table-region | (본문 표로 옮김) |
| tab05 | 19 | "MolmoBot 결과" | table-region | (보관) |
| tab06 | 20 | "DROID 실세계 결과" | table-region | (본문 표로 옮김) |
| tab07 | 20 | "SO-100 실세계 결과" | table-region | (본문 표로 옮김) |
| tab08 | 22 | "LIBERO 결과" | table-region | (본문 표로 옮김) |
| tab09 | 24 | "OOD 강건성" | table-region | (본문 표로 옮김) |
| tab10 | 25 | "backbone ablation" | table-region | (본문 표로 옮김) |
| tab11 | 25 | "조건화 방식 ablation" | table-region | (본문 표로 옮김) |
| tab12 | 25 | "flow 샘플 수 ablation" | table-region | (본문 표로 옮김) |
| tab13 | 26 | "fine-tuning 설계 ablation" | table-region | (본문 표로 옮김) |
| tab14 | 26 | "Think depth fine-tuning ablation" | table-region | (본문 표로 옮김) |
| tab15 | 36 | "구조 하이퍼파라미터" | table-region | (보관) |
| tab16 | 42 | "학습 하이퍼파라미터" | table-region | (보관) |
| tab17 | 44 | "RoboEval 지표 전체" | table-region | (보관) |
| tab18 | 45 | "과제별, 위치별 성공률" | table-region | (보관) |
| tab19 | 47 | "양팔 YAM 8개 과제 결과" | table-region | (본문 표로 옮김) |
| tab20 | 47 | "고정 카메라 SO-100 결과" | table-region | (보관) |
| tab21 | 48 | "SO-100/101 데이터 통계" | table-region | (보관) |
| tab22 | 49 | "SO-10x 로봇 종류별 분할" | table-region | (보관) |
| tab23 | 50 | "녹화 메타데이터" | table-region | (보관) |
| tab24 | 50 | "언어 주석 다양성" | table-region | (보관) |
| tab25 | 50 | "기존 양팔 데이터셋 비교" | table-region | (보관) |
