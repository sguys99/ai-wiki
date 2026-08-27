---
title: "FAST-LIO2: Fast Direct LiDAR-inertial Odometry"
type: paper
year: 2021
category: physical-ai
raw_path: /home/sguys99/project/ai-wiki/raw/papers/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry.pdf
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

## 한 줄 요약 (One-line Summary)

feature 추출을 없애고 raw point를 map에 바로 등록하는 direct 방식에 증분 갱신이 되는 ikd-Tree 자료구조를 결합했다. 소형 온보드 컴퓨터에서 100Hz odometry·mapping을 실시간으로 돌리는 LiDAR-inertial odometry 시스템이다.

## 1. 자료 정보 (Document Information)

- **제목**: FAST-LIO2: Fast Direct LiDAR-inertial Odometry
- **저자**: Wei Xu*, Yixi Cai*, Dongjiao He, Jiarong Lin, Fu Zhang (University of Hong Kong, MaRS Lab)
- **발표**: arXiv 2107.06829 (2021-07-14, v1)
- **코드**: 시스템(FAST-LIO2)과 자료구조(ikd-Tree) 모두 GitHub에 공개 — hku-mars/FAST_LIO, hku-mars/ikd-Tree

## 2. 주요 기여 (Key Contributions)

LiDAR-inertial odometry는 LiDAR point cloud와 IMU 측정을 결합해 로봇의 자세를 추정하면서 3D map을 함께 만드는 문제다. 기존 시스템 대부분은 LOAM 계보를 따라 edge·plane feature를 추출해 계산량을 줄인다. 이 논문은 그 전제를 뒤집었다. feature 추출 모듈을 통째로 없애고 raw point를 map에 직접 등록하는 direct point registration이 출발점이다. 환경의 미세한 구조까지 정합에 쓰이니 정확도가 올라간다. scanning pattern이 제각각인 신형 solid-state LiDAR에도 손볼 것 없이 적용된다.

- 나머지 한 축은 ikd-Tree다. point 삽입·삭제 같은 증분 갱신과 동적 re-balancing을 지원하는 k-d tree다. tree 위에서 바로 downsampling까지 수행한다. 이 방식을 on-tree downsampling이라 부른다. octree·R*-tree·nanoflann k-d tree보다 종합 성능이 좋다.
- 두 기법을 전작 FAST-LIO의 tightly-coupled iterated Kalman filter 위에 통합했다. 상태 차원 기준으로 Kalman gain을 계산하는 수식 변형으로 measurement 수가 많아도 계산량이 커지지 않는다.
- 공개 데이터셋 19개 시퀀스 벤치마크에서 최신 LIO 시스템 대비 일관되게 더 높은 정확도를 더 낮은 계산 비용으로 달성했다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 시스템 파이프라인

LiDAR raw point를 10ms(100Hz)~100ms(10Hz) 동안 모아 scan을 만든다. iterated Kalman filter 기반 state estimation이 새 scan을 ikd-Tree가 유지하는 local map에 등록해 odometry를 낸다. 최적화된 자세로 scan point를 전역 좌표로 옮겨 ikd-Tree에 삽입하면 그게 곧 mapping이다. odometry와 mapping이 같은 rate로 맞물려 돈다.

### State Estimation

상태 벡터는 IMU 자세·위치·속도, IMU bias, 중력 벡터, LiDAR-IMU extrinsic까지 24차원 manifold 위에 놓인다. extrinsic도 상태에 넣었으니 온라인 보정까지 같이 된다. LiDAR point는 순차적으로 샘플링되므로 센서가 움직이면 scan 안에서 왜곡이 생긴다. IMU 측정 기반 back-propagation으로 각 point를 scan 종료 시점 자세로 투영해 이 왜곡을 잡는다. measurement model은 보정된 point가 map의 국소 평면 patch 위에 놓여야 한다는 제약이다(Fig. 2). 이 residual을 iterated Kalman filter로 반복 갱신한다. Kalman gain 계산이 measurement 차원이 아니라 상태 차원의 역행렬만 요구하도록 유도해서 계산이 가벼워졌다.

### ikd-Tree

map point를 담는 증분 k-d tree다. 기존 구현과 달리 leaf node만이 아니라 internal node에도 point를 저장한다. 유지하는 map region은 한 변 길이 L(기본 1000m)의 정육면체 영역 하나뿐이다. LiDAR 검출 범위가 map 경계에 닿으면 영역을 옮기고 빠져나간 구역의 point를 box-wise delete로 제거한다(Fig. 3).

- 삽입할 때는 공간을 해상도 l(기본 0.5m)의 격자로 나눠 각 격자에 중심과 가장 가까운 point 하나만 남긴다. 다른 자료구조는 이 downsampling을 tree 밖에서 따로 해야 한다.
- box-wise delete는 point를 즉시 지우지 않는다. deleted 라벨만 붙였다가 re-building 때 실제로 제거하는 lazy label 방식이다. node별 range(외접 cuboid) 정보로 재귀를 가지치기한다.
- re-building은 병렬로 돈다. α-balanced·α-deleted 두 기준 중 하나라도 깨지면 해당 sub-tree만 다시 짓는다. 큰 sub-tree는 두 번째 thread에서 재구축하되 그 사이의 갱신 요청을 operation logger로 다시 반영해 main thread의 실시간성과 kNN 검색 정확도를 모두 지킨다.
- 삽입·삭제·검색 모두 O(log n) 시간 복잡도를 이론적으로 증명했다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

평가는 5개 공개 데이터셋(lili, utbm, ulhk, nclt, liosam) 37개 시퀀스에서 수행했다. 계산 플랫폼은 UAV 온보드급인 DJI Manifold 2-C(i7-8550U)와 임베디드 ARM 보드 Khadas VIM3다.

- 자료구조를 서로 비교한 18개 시퀀스에서 kNN 검색은 ikd-Tree가 가장 빨랐다. 삽입은 octree가 근소하게 앞서지만 검색이 훨씬 느리다. nanoflann은 삭제를 masking으로만 처리해 tree가 계속 자란다. incremental update 최대 지연이 utbm에서 3초, nclt에서 7초를 넘는 반면 ikd-Tree는 최악 214.4ms에 그친다(Table III, Fig. 5).
- RMSE 벤치마크를 돌린 19개 시퀀스 중 18개에서 FAST-LIO2 또는 그 변형이 최고 성능이었다. LILI-OM·LIO-SAM·LINS는 긴 시퀀스에서 back-end 최적화가 무너지며 수백~수천 m 드리프트를 보이는 경우가 있다(Table IV). ablation에서 direct 방식이 feature 기반 변형보다 대부분 시퀀스에서 정확했고 map 크기를 키우면 정확도가 완만히 오른다.
- scan당 평균 처리 시간은 LILI-OM 대비 약 8배, LIO-SAM 대비 약 10배, LINS 대비 약 6배 빠르다(Table VI). 구성요소별로 보면 전작 FAST-LIO의 mapping이 13.81ms인데 FAST-LIO2는 0.13ms다. 전체는 scan당 1.82ms(Intel), 5.23ms(ARM)다(Table VII). ARM에서 10Hz 실시간 동작을 보인 첫 사례라고 주장한다.
- 실기기 검증은 Livox Avia(FoV 70.4°×77.2°, 비반복 scanning)를 단 세 플랫폼으로 했다. 100Hz scan rate의 650m 실외-실내 혼합 주행에서 drift 0.14m. 소형 UAV flip 실험에서는 각속도가 최대 1198deg/s에 달하는 공중제비 중에도 자세 추정을 유지했다(Fig. 9~11). 750mm UAV 항공 mapping에서는 나뭇가지·차선까지 보이는 지도를 실시간 생성했다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- loop closure가 없는 순수 odometry라 장거리에서 드리프트가 누적된다. map 크기를 2000m 이상으로 키우면 누적 드리프트 때문에 오래된 map point와의 오매칭이 생길 수 있다고 논문 스스로 지적한다.
- 정확도 평가에서 GPS 품질 문제로 37개 중 19개 시퀀스만 ground truth 비교가 가능했다.
- measurement model이 국소 평면을 가정하므로 평면이 드문 환경에서 어떤 한계가 있는지는 논문이 따로 다루지 않았다.

## 6. 관련 연구 (Related Work)

- LOAM(Zhang 2014)이 feature 추출 + scan-to-scan odometry + 저속 mapping 구조를 세웠고 LeGO-LOAM·LOAM-Livox가 이를 확장했다. FAST-LIO2는 이 LOAM 계보가 물려준 feature 추출과 odometry/mapping 분리를 모두 없앤다.
- tightly-coupled LIO 계열로는 LIO-SAM(factor graph), LINS(iterated Kalman filter + robocentric), LILI-OM(sliding window)과 벤치마크에서 직접 비교한다.
- back-propagation과 Kalman gain 수식 변형은 전작 FAST-LIO(Xu & Zhang 2021)에서 왔고 본 논문은 direct 등록과 ikd-Tree를 더했다.
- 동적 자료구조로는 octree(PCL), R*-tree(boost), nanoflann k-d tree, scapegoat tree와 비교한다. pdffigures 계열이 아니라 로봇 mapping 요구(증분 갱신 + downsampling + 실시간 검색)에 맞춘 설계가 차별점이다.

## 7. 용어집 (Glossary)

- LIO (LiDAR-inertial odometry) — LiDAR와 IMU를 결합해 자세 추정과 mapping을 함께 수행하는 방법. 이 논문의 문제 설정.
- ikd-Tree (incremental k-d tree) — 증분 삽입·삭제, on-tree downsampling, 병렬 re-balancing을 지원하는 이 논문의 k-d tree 자료구조.
- direct method — feature 추출 없이 raw point를 map에 바로 등록하는 방식. visual SLAM의 direct method에서 이름을 따왔다.
- back-propagation (motion compensation) — scan 안 각 point의 샘플링 시점 자세를 IMU 측정으로 역추정한 뒤 scan 종료 시점으로 투영하는 방식이다. 그렇게 왜곡을 보정한다. 신경망 학습의 backpropagation과 무관하다.
- on-tree downsampling — map 삽입과 동시에 tree 위에서 공간 해상도를 유지하는 downsampling.
- solid-state LiDAR — 회전 기구 없이 프리즘·MEMS로 주사하는 신형 LiDAR. FoV가 좁고 scanning pattern이 비반복적이라 feature 추출 기반 방법이 잘 안 맞는다.

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 4 | 시스템 전체 구조 (state estimation + ikd-Tree mapping) | caption-region | ★ wiki 권장 (architecture) — curated |
| fig02 | 5 | measurement model (point-평면 제약) | caption-region | (보류) |
| fig03 | 6 | map region 관리 2D 예시 | caption-region | ★ wiki 권장 (method) — curated |
| fig04 | 9 | sub-tree re-building 과정 | caption-region | (보류) |
| fig05 | 12 | 자료구조별 검색·삽입 시간 비교 | manual | ★ wiki 권장 (result) — curated |
| fig06 | 14 | 실험 플랫폼 3종 | caption-region | (보류) |
| fig07 | 15 | 대규모 장면 mapping 결과 | caption-region | (보류) |
| fig08 | 15 | scan당 처리 시간 추이 | caption-region | (보류) |
| fig09 | 16 | UAV flip 실험 | manual | ★ wiki 권장 (robustness) — curated |
| fig10 | 16 | flip 실험 환경·3D map | manual | (보류) |
| fig11 | 16 | flip 실험 상태 곡선 | manual | (보류) |
| fig12 | 16 | 핸드헬드 고속 이동 mapping | caption-region | (보류) |
| fig13 | 17 | 핸드헬드 실험 상태 곡선 | caption-region | (보류) |
| fig14 | 17 | 항공 mapping 결과 | caption-region | (보류) |
| tab01 | 7 | tree node attribute 초기값 | table-region | (보류) |
| tab02 | 11 | 벤치마크 데이터셋 구성 | table-region | (보류) |
| tab03 | 12 | 자료구조별 scan당 시간 비교 | manual | (보류) |
| tab04 | 13 | RMSE 벤치마크 | table-region | ★ wiki 권장 (result) — curated |
| tab05 | 14 | end-to-end 오차 | table-region | (보류) |
| tab06 | 15 | 시스템별 scan당 처리 시간 | table-region | (보류) |
| tab07 | 15 | 구성요소별 처리 시간 (FAST-LIO 대비) | table-region | ★ wiki 권장 (efficiency) — curated |
| tab08 | 18 | 전체 37개 시퀀스 목록 | manual | (보류) |
