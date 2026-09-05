---
title: "FAST-LIO2: Fast Direct LiDAR-inertial Odometry"
type: paper
year: 2021
category: physical-ai
source: xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry.md
raw_path: raw/papers/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry.pdf
raw_filename: "xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry.pdf"
source_collection: external
authors: "Wei Xu, Yixi Cai, Dongjiao He, Jiarong Lin, Fu Zhang"
arxiv_id: "2107.06829"
tags: [physical-ai, slam, 3d-perception, drone]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry/fig01.png
    raw: raw/papers/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry-figures/fig01.png
    caption: "FAST-LIO2 시스템 전체 구조 — state estimation(iterated Kalman filter)과 mapping(ikd-Tree)이 10~100Hz로 맞물려 도는 파이프라인"
    page: 4
    bbox_norm: [0.0715, 0.0643, 0.9294, 0.2386]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry/fig02.png
    raw: raw/papers/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry-figures/fig02.png
    caption: "measurement model — scan의 raw point가 map의 국소 평면 patch 위에 놓여야 한다는 제약"
    page: 5
    bbox_norm: [0.0912, 0.0728, 0.3556, 0.1931]
    strategy: caption-region
    curated: false
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry/fig03.png
    raw: raw/papers/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry-figures/fig03.png
    caption: "map region 관리의 2D 예시 — LiDAR 검출 범위가 map 경계에 닿으면 map을 이동시키고 빠져나간 영역의 point를 box-wise delete로 지운다"
    page: 6
    bbox_norm: [0.5011, 0.3976, 0.9298, 0.5788]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry/fig04.png
    raw: raw/papers/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry-figures/fig04.png
    caption: "불균형해진 sub-tree의 re-building 과정"
    page: 9
    bbox_norm: [0.0702, 0.0632, 0.5, 0.1794]
    strategy: caption-region
    curated: false
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry/fig05.png
    raw: raw/papers/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry-figures/fig05.png
    caption: "tree 크기에 따른 자료구조별 point당 검색·삽입 시간 비교 — ikd-Tree가 검색에서 가장 빠르고 삽입도 안정적이다"
    page: 12
    bbox_norm: [0.0502, 0.3854, 0.5068, 0.6926]
    strategy: manual
    curated: true
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry/fig06.png
    raw: raw/papers/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry-figures/fig06.png
    caption: "실험 플랫폼 3종 — 280mm 쿼드로터, 핸드헬드, 750mm 쿼드로터 (모두 Livox Avia + Manifold 2-C)"
    page: 14
    bbox_norm: [0.5, 0.0632, 0.9298, 0.156]
    strategy: caption-region
    curated: false
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry/fig07.png
    raw: raw/papers/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry-figures/fig07.png
    caption: "대규모 실외-실내 혼합 장면의 실시간 mapping 결과 (650m 주행, drift 0.14m)"
    page: 15
    bbox_norm: [0.0702, 0.3623, 0.5, 0.6766]
    strategy: caption-region
    curated: false
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry/fig08.png
    raw: raw/papers/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry-figures/fig08.png
    caption: "scan당 처리 시간 추이 — FAST-LIO는 map이 커질수록 느려지고 FAST-LIO2는 거의 일정하다"
    page: 15
    bbox_norm: [0.4975, 0.5531, 0.9357, 0.7703]
    strategy: caption-region
    curated: false
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry/fig09.png
    raw: raw/papers/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry-figures/fig09.png
    caption: "flip 실험 — 소형 UAV가 공중제비를 도는 동안의 FPV 영상, 외부 시점, FAST-LIO2가 추정한 자세"
    page: 16
    bbox_norm: [0.0552, 0.0374, 0.4998, 0.2156]
    strategy: manual
    curated: true
  - id: fig10
    label: Figure 10
    kind: figure
    file: assets/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry/fig10.png
    raw: raw/papers/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry-figures/fig10.png
    caption: "flip 실험 환경의 실제 사진과 FAST-LIO2가 만든 3D map"
    page: 16
    bbox_norm: [0.0502, 0.2444, 0.5098, 0.4326]
    strategy: manual
    curated: false
  - id: fig11
    label: Figure 11
    kind: figure
    file: assets/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry/fig11.png
    raw: raw/papers/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry-figures/fig11.png
    caption: "UAV flip 실험의 자세·위치·각속도·속도 곡선 — 최대 각속도 1198deg/s 구간 포함"
    page: 16
    bbox_norm: [0.4952, 0.0374, 0.9848, 0.3256]
    strategy: manual
    curated: false
  - id: fig12
    label: Figure 12
    kind: figure
    file: assets/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry/fig12.png
    raw: raw/papers/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry-figures/fig12.png
    caption: "빠른 손동작 핸드헬드 실험의 mapping 결과"
    page: 16
    bbox_norm: [0.4899, 0.3417, 1.0, 0.5602]
    strategy: caption-region
    curated: false
  - id: fig13
    label: Figure 13
    kind: figure
    file: assets/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry/fig13.png
    raw: raw/papers/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry-figures/fig13.png
    caption: "빠른 손동작 핸드헬드 실험의 자세·위치·각속도·속도 곡선"
    page: 17
    bbox_norm: [0.0286, 0.0475, 0.5411, 0.3228]
    strategy: caption-region
    curated: false
  - id: fig14
    label: Figure 14
    kind: figure
    file: assets/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry/fig14.png
    raw: raw/papers/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry-figures/fig14.png
    caption: "홍콩 습지공원 항공 mapping 실시간 결과 (고도 30~50m, 하향 Livox Avia)"
    page: 17
    bbox_norm: [0.0702, 0.3546, 0.5, 0.5634]
    strategy: caption-region
    curated: false
  - id: tab01
    label: Table I
    kind: table
    file: assets/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry/tab01.png
    raw: raw/papers/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry-figures/tab01.png
    caption: "새 tree node 삽입 시 attribute 초기값"
    page: 7
    bbox_norm: [0.5111, 0.1074, 0.9206, 0.2663]
    strategy: table-region
    curated: false
  - id: tab02
    label: Table II
    kind: table
    file: assets/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry/tab02.png
    raw: raw/papers/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry-figures/tab02.png
    caption: "벤치마크에 쓴 5개 공개 데이터셋의 LiDAR·IMU 구성"
    page: 11
    bbox_norm: [0.0702, 0.0989, 0.5008, 0.2069]
    strategy: table-region
    curated: false
  - id: tab03
    label: Table III
    kind: table
    file: assets/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry/tab03.png
    raw: raw/papers/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry-figures/tab03.png
    caption: "18개 시퀀스에서 scan당 incremental update·kNN 검색·합계 시간 비교 (ikd-Tree vs nanoflann·Octree·R*-tree)"
    page: 12
    bbox_norm: [0.0802, 0.1044, 0.9448, 0.3856]
    strategy: manual
    curated: false
  - id: tab04
    label: Table IV
    kind: table
    file: assets/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry/tab04.png
    raw: raw/papers/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry-figures/tab04.png
    caption: "ground truth가 있는 12개 시퀀스의 절대 병진 오차 RMSE(m) — FAST-LIO2 vs LILI-OM·LIO-SAM·LINS"
    page: 13
    bbox_norm: [0.0886, 0.1006, 0.9114, 0.2326]
    strategy: table-region
    curated: true
  - id: tab05
    label: Table V
    kind: table
    file: assets/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry/tab05.png
    raw: raw/papers/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry-figures/tab05.png
    caption: "시작점 복귀 시퀀스 7개의 end-to-end 오차(m)"
    page: 14
    bbox_norm: [0.0807, 0.1006, 0.4923, 0.1628]
    strategy: table-region
    curated: false
  - id: tab06
    label: Table VI
    kind: table
    file: assets/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry/tab06.png
    raw: raw/papers/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry-figures/tab06.png
    caption: "19개 시퀀스의 scan당 평균 처리 시간(ms) — map 크기별 FAST-LIO2와 타 시스템 비교"
    page: 15
    bbox_norm: [0.1033, 0.0989, 0.8967, 0.349]
    strategy: table-region
    curated: false
  - id: tab07
    label: Table VII
    kind: table
    file: assets/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry/tab07.png
    raw: raw/papers/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry-figures/tab07.png
    caption: "scan 처리의 구성요소별 평균 시간 — FAST-LIO 15.83ms vs FAST-LIO2 1.82ms(Intel)·5.23ms(ARM)"
    page: 15
    bbox_norm: [0.5268, 0.4093, 0.9231, 0.7542]
    strategy: table-region
    curated: true
  - id: tab08
    label: Table VIII
    kind: table
    file: assets/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry/tab08.png
    raw: raw/papers/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry-figures/tab08.png
    caption: "벤치마크에 쓴 전체 37개 시퀀스의 이름·길이·거리"
    page: 18
    bbox_norm: [0.0802, 0.0854, 0.4798, 0.5856]
    strategy: manual
    curated: false
---

## 요약 (Summary)

FAST-LIO2는 홍콩대 MaRS Lab이 2021년에 내놓은 LiDAR-inertial odometry 시스템이다. LiDAR-inertial odometry는 LiDAR point cloud와 IMU 측정을 결합해 로봇의 자세를 추정하면서 3D map을 함께 만드는 문제를 말한다. LOAM 이후 이 분야 시스템 대부분은 계산량을 줄이려고 edge·plane feature를 먼저 뽑았다. FAST-LIO2는 그 feature 추출을 아예 없애고 raw point를 map에 바로 등록한다. 이를 받쳐주는 것이 ikd-Tree다. 증분 갱신과 동적 re-balancing이 되는 k-d tree 자료구조다. 이 두 기법 덕분에 UAV 온보드 컴퓨터에서 최대 100Hz로 odometry·mapping을 돌리면서도 공개 데이터셋 19개 시퀀스에서 당시 최신 시스템들보다 높은 정확도를 냈다. 시스템과 자료구조 모두 오픈소스로 공개돼 이후 LIO 연구의 사실상 표준 베이스라인이 됐다.

![[assets/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry/fig01.png]]
*Figure 1: state estimation(붉은 점선)과 ikd-Tree 기반 mapping(푸른 점선)이 10~100Hz로 맞물려 도는 FAST-LIO2 전체 구조 (Xu 2021, p.4)*

## 주요 기여 (Key Contributions)

- feature 추출 모듈을 제거한 direct point registration. 환경의 미세한 구조까지 정합에 쓰여 정확도가 올라간다. scanning pattern이 제각각인 solid-state LiDAR에도 별도 튜닝 없이 적용된다. solid-state LiDAR는 회전 기구 없이 프리즘이나 MEMS로 주사하는 신형 LiDAR다. FoV가 좁고 주사 패턴이 비반복적이라 feature 기반 방법이 잘 안 맞는다.
- ikd-Tree는 증분 point 삽입·삭제와 on-tree downsampling, 병렬 re-building을 지원한다. 삽입·삭제·검색 모두 O(log n)을 이론적으로 증명했고 단독 라이브러리로도 공개됐다.
- 전작 FAST-LIO의 tightly-coupled iterated Kalman filter를 계승하면서 LiDAR-IMU extrinsic 온라인 보정을 추가했다. Kalman gain은 measurement 차원이 아니라 상태 차원(24차원)의 역행렬로만 계산한다. 이 수식 변형 덕분에 raw point 수천 개를 그대로 쓸 수 있다.

## 방법론 및 아키텍처 (Methodology and Architecture)

LiDAR raw point를 10ms(100Hz)~100ms(10Hz) 동안 모아 scan 하나를 만든다. 그 scan을 ikd-Tree가 유지하는 local map에 정합해 자세를 추정한다. 최적화가 끝나면 같은 자세로 scan point를 전역 좌표로 옮겨 ikd-Tree에 삽입한다. odometry와 mapping은 분리된 모듈이 아니라 같은 rate로 맞물려 도는 구조다.

state estimation은 상태 벡터에 LiDAR-IMU extrinsic까지 넣어 온라인으로 보정한다. scan 안에서 생기는 모션 왜곡도 IMU 기반 back-propagation으로 point 단위로 잡는다. "보정된 point는 map의 국소 평면 patch 위에 놓인다"는 제약을 residual로 삼아 iterated Kalman filter를 돌린다. 여기서 back-propagation은 신경망 학습이 아니라 IMU 측정으로 각 point의 샘플링 시점 자세를 역추정하는 모션 보정을 가리킨다.

ikd-Tree는 map 유지 비용을 여러 방향에서 낮춘다.

![[assets/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry/fig03.png]]
*Figure 3: LiDAR 검출 범위(빨간 원)가 map 경계에 닿으면 영역을 옮기고 빠져나간 구역(주황)의 point를 box-wise delete로 지우는 map region 관리 (Xu 2021, p.6)*

- 한 변 1000m(기본값) 정육면체의 local map만 유지한다. 경계를 벗어난 point는 lazy label을 붙였다가 re-building 때 실제로 지운다.
- 삽입과 동시에 tree 위에서 0.5m 해상도의 downsampling을 수행한다. 다른 자료구조는 이 downsampling을 tree 밖에서 따로 해야 한다.
- α-balanced·α-deleted 기준이 깨진 sub-tree만 다시 짓는다. 큰 sub-tree는 두 번째 thread에서 재구축하되 그 사이 갱신 요청을 operation logger에 쌓았다가 새 tree에 재적용해 main thread의 실시간성과 kNN 검색 정확도를 함께 지킨다.

## 결과 (Results)

nanoflann k-d tree는 삭제를 masking으로만 처리한다. 그래서 tree가 계속 자라고 incremental update 최대 지연이 긴 시퀀스에서 3~7초를 넘는다. ikd-Tree의 최악 지연은 214.4ms다. 자료구조 자체 비교에서 ikd-Tree는 kNN 검색이 가장 빠르고 삽입도 안정적이다.

![[assets/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry/fig05.png]]
*Figure 5: tree 크기에 따른 point당 검색·삽입 시간. ikd-Tree(빨강)가 검색에서 일관되게 가장 빠르다 (Xu 2021, p.12)*

시스템 정확도는 ground truth가 있는 19개 시퀀스 중 18개에서 FAST-LIO2 또는 그 변형이 최고였다. 비교 대상인 LILI-OM·LIO-SAM·LINS는 긴 시퀀스에서 back-end 최적화가 무너져 수백~수천 m 드리프트를 내는 경우가 있다. ablation에서는 direct 방식이 feature 기반 변형을 대부분 시퀀스에서 앞섰고 map 크기를 600m→2000m로 키우면 정확도가 완만히 오르다가 그 이상에서는 오래된 map point와의 오매칭 위험이 생긴다.

![[assets/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry/tab04.png]]
*Table IV: 절대 병진 오차 RMSE(m). 12개 시퀀스에서 FAST-LIO2 계열이 LILI-OM·LIO-SAM·LINS를 큰 차이로 앞선다 (Xu 2021, p.13)*

처리 시간은 scan당 평균으로 LILI-OM의 약 8배, LIO-SAM의 약 10배, LINS의 약 6배 빠르다. 구성요소별로 보면 차이의 출처가 분명하다. 전작 FAST-LIO는 매 스텝 k-d tree를 새로 지어 mapping에만 13.81ms를 쓴다. FAST-LIO2의 mapping은 0.13ms다.

![[assets/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry/tab07.png]]
*Table VII: scan 처리 구성요소별 평균 시간 — FAST-LIO 15.83ms vs FAST-LIO2 1.82ms(Intel)·5.23ms(ARM) (Xu 2021, p.15)*

실기기 검증은 Livox Avia를 단 세 플랫폼으로 했다. 100Hz scan rate의 650m 실외-실내 혼합 주행에서 drift 0.14m, 임베디드 ARM 보드(Khadas VIM3)에서 10Hz 실시간 동작. 소형 UAV flip 실험에서는 각속도가 최대 1198deg/s에 이르는 공중제비 중에도 자세 추정이 끊기지 않았다.

![[assets/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry/fig09.png]]
*Figure 9: flip 실험 — (a) 소형 UAV, (b) 비행 중 FPV 영상, (c) 외부 시점, (d) FAST-LIO2가 추정한 자세 경로 (Xu 2021, p.16)*

## 한계 (Limitations)

loop closure가 없는 순수 odometry라 장거리 드리프트는 누적된다. 정확도 평가도 GPS 품질 문제로 37개 중 19개 시퀀스에서만 가능했다. measurement model이 국소 평면 가정 위에 있어 평면이 드문 환경에서 어떻게 동작하는지는 별도 분석이 없다.

## 관련 페이지 (Related Pages)

- [[physical-ai/xu-2020-fast-lio-a-fast-robust-lidar-inertial]] — 전작 FAST-LIO. iterated Kalman filter·back-propagation·Kalman gain 수식 변형이 여기서 왔다
- [[physical-ai/hku-mars-fast-lio]] — 공식 구현 repo. 2021-07부터 FAST-LIO2가 기본이다
- [[physical-ai/taeyoung-2022-fast-lio-paper-review]] — 전작 수식 전개의 한국어 해설. 본 논문의 state estimation 절을 따라갈 때 참고
- [[physical-ai/irasc-2024-faster-lio-lightweight-tightly-coupled]] — ikd-Tree를 해시 기반 iVox로 바꾼 후속 Faster-LIO 해설
- [[overviews/physical-ai-overview]] — 도메인 허브
- [[overviews/glossary-physical-ai]] — 도메인 용어 표기 기준
