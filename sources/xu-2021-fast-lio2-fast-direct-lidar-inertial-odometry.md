---
title: "FAST-LIO2: Fast Direct LiDAR-inertial Odometry"
type: paper
year: 2021
category: physical-ai
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
    caption: "FAST-LIO2 시스템 전체 구조. state estimation(iterated Kalman filter)과 mapping(ikd-Tree)이 10~100Hz로 맞물려 동작하는 파이프라인"
    page: 4
    bbox_norm: [0.0715, 0.0643, 0.9294, 0.2386]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry/fig02.png
    raw: raw/papers/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry-figures/fig02.png
    caption: "measurement model. scan의 raw point가 map의 국소 평면 patch 위에 놓여야 한다는 제약"
    page: 5
    bbox_norm: [0.0912, 0.0728, 0.3556, 0.1931]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry/fig03.png
    raw: raw/papers/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry-figures/fig03.png
    caption: "map region 관리의 2D 예시. LiDAR 검출 범위가 map 경계에 닿으면 map을 이동시키고 빠져나간 영역의 point를 box-wise delete로 지운다"
    page: 6
    bbox_norm: [0.5011, 0.3976, 0.9298, 0.5788]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry/fig04.png
    raw: raw/papers/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry-figures/fig04.png
    caption: "불균형해진 sub-tree의 re-building 과정. flatten으로 유효 point만 뽑아 완전 균형 tree를 다시 짓는다"
    page: 9
    bbox_norm: [0.0702, 0.0632, 0.5, 0.1794]
    strategy: caption-region
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry/fig05.png
    raw: raw/papers/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry-figures/fig05.png
    caption: "tree 크기에 따른 자료구조별 point당 검색 시간과 삽입 시간 비교. ikd-Tree가 검색에서 가장 빠르고 삽입도 안정적이다"
    page: 12
    bbox_norm: [0.0502, 0.3854, 0.5068, 0.6926]
    strategy: manual
    curated: true
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry/fig06.png
    raw: raw/papers/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry-figures/fig06.png
    caption: "실험 플랫폼 3종. 280mm 쿼드로터, 핸드헬드, 750mm 쿼드로터 (모두 Livox Avia + Manifold 2-C)"
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
    caption: "scan당 처리 시간 추이. FAST-LIO는 map이 커질수록 느려지고 FAST-LIO2는 거의 일정하다"
    page: 15
    bbox_norm: [0.4975, 0.5531, 0.9357, 0.7703]
    strategy: caption-region
    curated: false
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry/fig09.png
    raw: raw/papers/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry-figures/fig09.png
    caption: "flip 실험. 소형 UAV가 공중제비를 도는 동안의 FPV 영상, 외부 시점, FAST-LIO2가 추정한 자세"
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
    caption: "UAV flip 실험의 자세, 위치, 각속도, 속도 곡선. 최대 각속도 1198deg/s 구간 포함"
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
    caption: "빠른 손동작 핸드헬드 실험의 자세, 위치, 각속도, 속도 곡선"
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
    caption: "벤치마크에 쓴 5개 공개 데이터셋의 LiDAR와 IMU 구성"
    page: 11
    bbox_norm: [0.0702, 0.0989, 0.5008, 0.2069]
    strategy: table-region
    curated: false
  - id: tab03
    label: Table III
    kind: table
    file: assets/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry/tab03.png
    raw: raw/papers/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry-figures/tab03.png
    caption: "18개 시퀀스에서 scan당 incremental update 시간, kNN search 시간, 합계 비교 (ikd-Tree, nanoflann, Octree, R*-tree)"
    page: 12
    bbox_norm: [0.0802, 0.1044, 0.9448, 0.3856]
    strategy: manual
    curated: false
  - id: tab04
    label: Table IV
    kind: table
    file: assets/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry/tab04.png
    raw: raw/papers/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry-figures/tab04.png
    caption: "ground truth가 있는 12개 시퀀스의 절대 병진 오차 RMSE(m). FAST-LIO2와 LILI-OM, LIO-SAM, LINS 비교"
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
    caption: "19개 시퀀스의 scan당 평균 처리 시간(ms). map 크기별 FAST-LIO2와 타 시스템 비교"
    page: 15
    bbox_norm: [0.1033, 0.0989, 0.8967, 0.349]
    strategy: table-region
    curated: false
  - id: tab07
    label: Table VII
    kind: table
    file: assets/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry/tab07.png
    raw: raw/papers/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry-figures/tab07.png
    caption: "scan 처리의 구성요소별 평균 시간. FAST-LIO 15.83ms, FAST-LIO2 1.82ms(Intel), 5.23ms(ARM)"
    page: 15
    bbox_norm: [0.5268, 0.4093, 0.9231, 0.7542]
    strategy: table-region
    curated: true
  - id: tab08
    label: Table VIII
    kind: table
    file: assets/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry/tab08.png
    raw: raw/papers/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry-figures/tab08.png
    caption: "벤치마크에 쓴 전체 37개 시퀀스의 이름, 길이, 거리"
    page: 18
    bbox_norm: [0.0802, 0.0854, 0.4798, 0.5856]
    strategy: manual
    curated: false
---

## 한 줄 요약 (One-line Summary)

feature 추출을 없애고 raw point를 map에 바로 등록하는 direct 방식에 증분 갱신이 되는 ikd-Tree 자료구조를 결합했다. 소형 온보드 컴퓨터에서 100Hz odometry와 mapping을 실시간으로 수행하는 LiDAR-inertial odometry 시스템이다.

## 1. 자료 정보 (Document Information)

- **제목**: FAST-LIO2: Fast Direct LiDAR-inertial Odometry
- **저자**: Wei Xu, Yixi Cai (두 저자 공동 1저자), Dongjiao He, Jiarong Lin, Fu Zhang (University of Hong Kong, MaRS Lab)
- **발표**: arXiv 2107.06829 (2021-07-14, v1), 본문 19페이지
- **코드**: 시스템(FAST-LIO2)과 자료구조(ikd-Tree) 모두 GitHub에 공개. hku-mars/FAST_LIO, hku-mars/ikd-Tree
- **지원**: DJI 연구비(grant 200009538)와 Livox Technology 장비 지원

## 2. 주요 기여 (Key Contributions)

LiDAR-inertial odometry는 LiDAR point cloud와 IMU 측정을 결합해 로봇의 자세를 추정하면서 3D map을 함께 만드는 문제다. 기존 시스템 대부분은 LOAM 계보를 따라 edge feature와 plane feature를 추출해 계산량을 줄인다. 이 논문은 그 전제를 뒤집었다. feature 추출 모듈을 통째로 없애고 raw point를 map에 직접 등록하는 direct point registration이 출발점이다. 환경의 미세한 구조까지 정합에 쓰이니 정확도가 올라간다. scanning pattern이 제각각인 신형 solid-state LiDAR에도 손볼 것 없이 적용된다.

- 나머지 하나는 ikd-Tree다. point 삽입과 삭제 같은 증분 갱신과 동적 re-balancing을 지원하는 k-d tree다. tree 위에서 바로 downsampling까지 수행한다. 이 방식을 on-tree downsampling이라 부른다. octree, R*-tree, nanoflann k-d tree보다 종합 성능이 좋다.
- 두 기법을 전작 FAST-LIO의 tightly-coupled iterated Kalman filter 위에 통합했다. 상태 차원 기준으로 Kalman gain을 계산하는 수식 변형으로 measurement 수가 많아도 계산량이 커지지 않는다.
- 공개 데이터셋 19개 시퀀스 벤치마크에서 최신 LIO 시스템 대비 일관되게 더 높은 정확도를 더 낮은 계산 비용으로 달성했다.
- 저자들은 ARM 프로세서에서 10Hz 실시간 LIO를 시연한 첫 사례라고 주장한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 시스템 파이프라인

LiDAR raw point를 10ms(100Hz)에서 100ms(10Hz) 사이 구간 동안 모아 scan을 만든다. iterated Kalman filter 기반 state estimation이 새 scan을 ikd-Tree가 유지하는 local map에 등록해 odometry를 낸다. 최적화된 자세로 scan point를 전역 좌표로 옮겨 ikd-Tree에 삽입하면 그게 곧 mapping이다. odometry와 mapping이 같은 rate로 맞물려 동작한다.

현재 LiDAR의 FoV 범위가 map 경계를 넘으면 LiDAR 자세에서 가장 먼 map 영역의 과거 point가 ikd-Tree에서 삭제된다. 결과적으로 ikd-Tree는 일정한 한 변 길이의 큰 정육면체 영역만 추적하며, 논문은 이 길이를 map size라 부른다.

### State Estimation

상태 벡터는 IMU 자세와 위치, 속도, IMU bias, 중력 벡터, LiDAR-IMU extrinsic까지 24차원 manifold 위에 놓인다. 정확히는 SO(3) x R15 x SO(3) x R3 구조이며 extrinsic이 상태에 들어가 있으므로 온라인 보정까지 같이 된다. IMU bias는 random walk로 모델링한다.

LiDAR point는 순차적으로 샘플링되므로 센서가 움직이면 scan 안에서 왜곡이 생긴다. IMU 측정 기반 back-propagation으로 각 point를 scan 종료 시점 자세로 투영해 이 왜곡을 잡는다. 보정 후에는 scan 안의 모든 point를 scan 종료 시점에 동시에 샘플링한 것처럼 다룰 수 있다.

measurement model은 보정된 point가 map의 국소 평면 patch 위에 놓여야 한다는 제약이다(Fig. 2). 구체적으로는 현재 반복 시점 추정치로 각 point를 전역 좌표로 옮긴 뒤 ikd-Tree에서 가장 가까운 5개 point를 찾아 국소 평면을 맞추고, 그 평면의 법선 벡터와 중심점으로 residual을 만든다. 이 residual을 iterated Kalman filter로 반복 갱신한다.

filter는 IMU 측정마다 forward propagation을 수행하고 LiDAR scan마다 iterated update를 수행한다. IMU가 보통 200Hz이고 LiDAR scan이 10Hz에서 100Hz이므로 update 한 번에 propagation이 여러 번 들어간다. 갱신량이 임계값보다 작아지면 수렴으로 보고 반복을 끝낸다. Kalman gain 계산이 measurement 차원이 아니라 상태 차원의 역행렬만 요구하도록 유도해서 계산이 가벼워졌다.

### ikd-Tree

map point를 담는 증분 k-d tree다. 기존 구현과 달리 leaf node만이 아니라 internal node에도 point를 저장한다. 이 저장 방식은 동적 삽입과 tree re-balancing을 쉽게 하고, 단일 k-d tree를 쓸 때 kNN search에도 더 효율적이라고 알려져 있다.

각 tree node는 point 정보, 좌우 자식 포인터, 분할 axis, treesize, invalidnum, deleted와 treedeleted라는 두 boolean 라벨, 그리고 range를 갖는다. range는 해당 sub-tree의 모든 point를 감싸는 외접 cuboid를 최소 좌표와 최대 좌표 두 꼭짓점으로 적은 것이다. tree 구축은 정적 k-d tree와 같이 가장 긴 차원의 중앙값 point에서 재귀적으로 공간을 나누는 방식이다.

유지하는 map region은 한 변 길이 L(기본 1000m)의 정육면체 영역 하나뿐이다. LiDAR 검출 영역은 현재 위치를 중심으로 반지름 r = gamma * R인 구로 가정하며, R은 LiDAR FoV 범위이고 gamma는 1보다 큰 완화 계수다. 검출 구가 map 경계에 닿으면 영역을 d = (gamma - 1) * R 만큼 옮기고 빠져나간 구역의 point를 box-wise delete로 제거한다(Fig. 3).

- 삽입할 때는 공간을 해상도 l(기본 0.5m)의 격자로 나눠 각 격자에 중심과 가장 가까운 point 하나만 남긴다. 새 point가 속한 격자를 찾아 box-wise search로 그 안의 기존 point를 모으고, 새 point까지 포함해 중심에 가장 가까운 하나를 고른 뒤 나머지를 지우고 그 하나만 삽입한다. 다른 자료구조는 이 downsampling을 tree 밖에서 따로 해야 한다.
- box-wise delete는 point를 즉시 지우지 않는다. deleted 라벨만 붙였다가 re-building 때 실제로 제거하는 lazy label 방식이다. node별 range 정보로 재귀를 가지치기한다. sub-tree의 외접 cuboid가 삭제 cuboid와 만나지 않으면 즉시 반환하고, 완전히 포함되면 treedeleted를 켜고 하위 재귀를 생략한다.
- re-balancing 기준은 두 가지다. alpha-balanced 기준은 양쪽 자식 sub-tree의 크기가 alpha_bal 배를 넘지 않을 것을 요구하고, alpha-deleted 기준은 무효 node 수가 alpha_del 배 미만일 것을 요구한다. 전자는 tree의 최대 높이를 log(1/alpha_bal) 밑의 로그로 묶고, 후자는 무효 node가 쌓이지 않게 한다. 둘 중 하나라도 깨지면 해당 sub-tree만 다시 짓는다.
- re-building은 병렬로 수행한다. sub-tree 크기가 N_max보다 작으면 main thread에서 바로 다시 짓고, 크면 두 번째 thread로 넘긴다. 두 번째 thread는 갱신만 잠그고 질의는 막지 않은 채 유효 point를 배열로 flatten한 뒤 즉시 잠금을 푼다. 그 사이 들어온 갱신 요청은 operation logger 큐에 쌓였다가 새 tree에 재적용된다. 교체 순간에만 질의까지 포함해 전체를 잠그는데 이 구간은 명령 한 개 길이라 main thread의 실시간성과 kNN search 정확도가 함께 유지된다(Fig. 4).
- kNN search는 bounds-overlap-ball 검사로 가지치기한다. 대상 point에서 node의 cuboid까지 최소 거리가 현재 우선순위 큐의 최대 거리보다 크면 그 node와 자손을 건너뛴다. FAST-LIO2는 일정 거리 안의 이웃만 inlier로 쓰므로 이 최대 탐색 거리가 자연스럽게 backtracking을 줄인다. 다중 thread kNN search도 지원한다.
- 시간 복잡도를 이론적으로 증명했다. on-tree downsampling을 포함한 point 삽입과 kNN search 모두 O(log n)이고, re-building은 병렬일 때 main thread 기준 O(n), 단일 thread일 때 O(n log n)이다. box 연산은 Flajolet-Puech 함수를 쓴 범위 검색 복잡도를 따르며 downsampling cube처럼 작은 영역에서는 O(log n)으로 떨어진다.

### 구현 설정

C++와 ROS로 구현했고 iterated Kalman filter는 저자들의 IKFOM toolbox를 쓴다. 기본 설정은 local map size L = 1000m, 공간 downsampling 해상도 l = 0.5m, ikd-Tree 파라미터 alpha_bal = 0.6, alpha_del = 0.5, N_max = 1500이다. LiDAR raw point는 1:4 시간 downsampling을 거쳐 state estimation으로 바로 들어간다. kNN search에서 찾는 이웃 개수는 5개다.

계산 플랫폼은 두 가지다. 벤치마크용은 UAV 온보드급 DJI Manifold 2-C로 1.8GHz 쿼드코어 Intel i7-8550U와 8GB RAM을 갖췄다. 임베디드 검증용은 Khadas VIM3로 2.2GHz 쿼드코어 Cortex-A73과 4GB RAM을 갖췄으며 논문은 이 결과를 ARM으로 표기한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

평가는 5개 공개 데이터셋 37개 시퀀스에서 수행했다. 데이터셋 구성은 아래와 같다.

| 데이터셋 | LiDAR | line 수 | IMU | IMU rate | 특징 |
|---|---|---|---|---|---|
| lili | solid-state (Livox Horizon) | 해당 없음 | 6축 | 200Hz | 비반복 scanning, FoV 81.7도 x 25.1도, 캠퍼스와 도심 |
| utbm | spinning (Velodyne HDL-32E) | 32 | 6축 | 100Hz | 사람이 운전하는 로보카, 최대 50km/h |
| ulhk | spinning (Velodyne HDL-32E) | 32 | 9축 | 100Hz | 도심 구조물, 이동 차량 다수 |
| nclt | spinning (Velodyne HDL-32E) | 32 | 9축 | 100Hz | 대규모 장기 UGV 데이터, 개활 주차장 포함 |
| liosam | spinning (VLP-16) | 16 | 9축 | 1000Hz | MIT 캠퍼스, 건물과 숲 |

nclt의 IMU 원본 rate는 50Hz인데 LIO-SAM을 구동하기 위해 0차 보간으로 100Hz로 올렸다.

### 자료구조 비교

자료구조를 서로 비교한 18개 시퀀스에서 kNN search는 ikd-Tree가 가장 빨랐다. 비교 대상은 boost geometry의 R*-tree, PCL의 octree, nanoflann의 동적 k-d tree다. 네 자료구조를 모두 FAST-LIO2에 통합해 같은 조건에서 쟀다.

- 삽입은 octree가 가장 빠르지만 격차가 1마이크로초 미만으로 작고, 균형이 무너진 tree 구조 때문에 질의 시간이 훨씬 길다.
- nanoflann은 삽입 시간이 ikd-Tree보다 조금 짧을 때가 있으나 로그 구조로 여러 k-d tree를 묶어 관리하는 특성상 간헐적으로 큰 첨두가 생긴다.
- R*-tree는 삽입 시간이 ikd-Tree와 비슷하지만 tree가 커지면 검색 시간이 크게 늘어난다.
- tree 크기 10^5에서 10^6 구간에서 nanoflann의 kNN search가 ikd-Tree보다 느려지는 경향이 뚜렷하다.

scan당 합계 시간(Table III)에서도 ikd-Tree가 종합 1위다. 예를 들어 utbm 1에서 합계는 ikd-Tree 18.42ms, nanoflann 19.22ms, octree 45.00ms, R*-tree 26.50ms다. nclt 1에서는 ikd-Tree 15.64ms, nanoflann 20.41ms, octree 42.57ms, R*-tree 30.14ms다.

nanoflann과의 격차는 평균값보다 최악값에서 크게 벌어진다. nanoflann은 삭제를 masking으로만 처리해 지운 point가 tree에 남는다. 그래서 map downsampling과 map move를 해도 tree가 계속 자란다. tree 크기가 utbm에서 6 x 10^6을, nclt에서 10^7을 넘는 반면 ikd-Tree의 최대 tree 크기는 각각 2 x 10^6과 3.6 x 10^6에 머문다. incremental update 최대 지연은 nanoflann이 utbm 7개 시퀀스 전부에서 3초를, nclt 3개 시퀀스에서 7초를 넘는다. ikd-Tree는 nclt 2에서 214.4ms가 최악이고 나머지 17개 시퀀스에서는 150ms 미만이다. 첨두 발생 빈도가 낮아 전체 실시간성에는 큰 영향이 없지만 후속 제어기에는 치명적 지연이 된다고 논문은 지적한다.

### 정확도 벤치마크

RMSE 벤치마크를 수행한 19개 시퀀스 중 18개에서 FAST-LIO2 또는 그 변형이 최고 성능이었다. 유일한 예외는 ulhk 4로 LILI-OM이 근소하게 앞섰다. 공정한 비교를 위해 LILI-OM과 LIO-SAM의 loop closure 모듈은 껐고 sliding window 최적화 같은 나머지 기능은 켠 채로 두었다.

절대 병진 오차 RMSE(m)의 대표 시퀀스는 아래와 같다.

| 시스템 | utbm 9 | ulhk 4 | nclt 4 | nclt 10 | liosam 1 |
|---|---|---|---|---|---|
| FAST-LIO2 (1000m) | 51.6 | 2.57 | 8.71 | 16.29 | 4.58 |
| FAST-LIO2 (Feature) | 53.81 | 2.61 | 8.5 | 16.61 | 7.85 |
| LILI-OM | 782.11 | 2.29 | 317.77 | 328.87 | 18.78 |
| LIO-SAM | 미동작 | 3.52 | 9461 | 1077.5 | 4.75 |
| LINS | 54.35 | 3.11 | 65.95 | 2995.9 | 880.92 |

LILI-OM은 utbm 9, nclt 4, nclt 6, nclt 8, nclt 10에서 매우 큰 드리프트를 보인다. map point 수가 커지면서 sliding window back-end 융합이 실패해 front-end odometry만 남기 때문이다. LINS는 nclt 5, nclt 6, nclt 7, nclt 10에서 비슷하게 나쁘고, LIO-SAM은 nclt 4와 nclt 10에서 factor graph 최적화가 실패한다. utbm은 LIO-SAM이 요구하는 자세 quaternion 데이터를 제공하지 않아 전 시퀀스에서 동작하지 않는다. liosam 1은 LIO-SAM 저자들이 직접 튜닝한 자체 데이터인데도 FAST-LIO2가 더 정확했다.

ablation 결과는 두 가지다. 첫째, map 크기를 600m에서 2000m로 키우면 정확도가 완만히 오른다. LiDAR가 이전 장소를 다시 지날 때 더 오래된 map point에 정합되기 때문이다. 다만 2000m를 넘으면 누적 드리프트로 오래된 point와 잘못 대응될 수 있어 개선이 이어지지 않는다. 둘째, direct 방식이 feature 기반 변형보다 nclt 4와 nclt 6 두 시퀀스를 뺀 대부분에서 정확했고 그 두 곳의 차이도 미미하다. feature 기반 변형은 solid-state LiDAR용 FAST-LIO 방식과 spinning LiDAR용 BALM 방식을 붙여 만들었다.

시작점으로 돌아오는 7개 시퀀스의 end-to-end 오차에서는 FAST-LIO2 계열이 5개에서 최저였다. lili 7에서 feature 방식이 3.89m인 반면 direct 방식은 1.37m에서 1.92m 사이인데, 나무와 개활지가 많아 feature 추출이 나무와 원거리 건물의 유효 point를 많이 버리기 때문이다. LINS는 liosam 2에서 완전히 실패했는데 회전 속도가 커서 쓸 수 있는 feature point가 너무 적었다.

### 처리 시간

scan당 평균 처리 시간은 LILI-OM 대비 약 8배, LIO-SAM 대비 약 10배, LINS 대비 약 6배 빠르다. 다른 시스템의 odometry 부분만 떼어 비교해도 대부분 시퀀스에서 FAST-LIO2가 빠르다. odometry와 mapping을 합친 FAST-LIO2 전체 시간이 LIO-SAM의 odometry 부분과 거의 같고 LILI-OM보다 3배, LINS보다 2배 이상 빠르다.

map 크기를 600m에서 2000m로 바꿔도 처리 시간이 거의 같다. ikd-Tree의 mapping과 kNN search가 map 크기에 둔감하다는 뜻이다. feature 기반 변형과 direct 방식의 처리 시간도 비슷한데, feature 추출에 시간을 쓰는 대신 이후 단계에서 다룰 point가 줄어 상쇄되기 때문이다.

전작 FAST-LIO와의 구성요소별 비교가 차이의 출처를 보여준다.

| 구성 요소 | FAST-LIO (Intel) | FAST-LIO2 (Intel) | FAST-LIO2 (ARM) |
|---|---|---|---|
| 전처리 | 0.03ms | 0.03ms | 0.05ms |
| feature 추출 | 0.90ms | 0ms | 0ms |
| state estimation | 0.99ms | 1.66ms | 4.75ms |
| mapping | 13.81ms | 0.13ms | 0.43ms |
| 합계 | 15.83ms | 1.82ms | 5.23ms |
| 사용 point 수 | 447 | 756 | 756 |
| thread 수 | 4 | 4 | 2 |

odometry 단계만 보면 FAST-LIO 1.92ms와 FAST-LIO2 1.69ms로 거의 같다. 차이는 mapping에서 난다. FAST-LIO는 매 스텝 현재 FoV의 map point를 모아 정적 k-d tree를 새로 짓기 때문에 O(n log n)이 걸리고, map point가 늘수록 처리 시간이 거의 선형으로 증가한다. FAST-LIO2는 O(log n)의 증분 갱신이라 map이 커져도 시간이 완만하게만 는다. ARM에서는 10ms 샘플링 주기를 가끔 넘지만 발생이 드물고 평균은 주기보다 훨씬 낮으며, 그 짧은 구간에는 IMU propagation 상태 추정으로 제어기를 이어갈 수 있다.

### 실제 기기 실험

실제 기기 검증은 Livox Avia를 단 세 플랫폼으로 했다. Livox Avia는 FoV 70.4도 x 77.2도의 원형 시야와 비반복 scanning pattern을 갖고 IMU를 내장한다. 플랫폼은 전방 장착 280mm 쿼드로터, 핸드헬드, 하향 장착 750mm 쿼드로터 세 가지이며 모두 같은 DJI Manifold 2-C를 쓴다.

- 대규모 실외와 실내 혼합 장면에서 100Hz scan rate로 약 650m를 이동해 시작점으로 돌아온 실험에서 drift가 0.14m였고 위성 지도와 잘 맞았다. LILI-OM은 100Hz scan rate에서 feature 추출 결과가 너무 적어 이 데이터에서 실패했다.
- 소형 UAV flip 실험에서는 1.2m 높이 호버링 후 공중제비를 돌고 다시 호버링으로 복귀했다. 50.8초에서 51.2초 구간의 평균 각속도가 912deg/s, 최대 각속도가 1198deg/s인데도 자세 추정을 유지했다. scan당 평균 2.01ms로 제어기 실시간 요구를 충족했다. 저자들의 선행 연구는 이 odometry로 지름 9mm까지의 작은 동적 물체를 회피하는 자율 UAV를 시연했다.
- 빠른 손동작 핸드헬드 실험에서는 육교 위를 왕복하며 최대 속도 7m/s, 각속도 약 100deg/s를 기록했다. 총 이동 거리 81m에 end-to-end 오차는 0.06m 미만이었다.
- 홍콩 습지공원 항공 mapping은 고도 30m와 50m에서 10Hz scan rate로 수행했다. 나무 수관, 도로 차선, 연석 같은 미세 구조가 보였고 UAV의 GPS/IMU 항법 경로와 육안으로 잘 일치했다. 세 지점의 scan당 평균 처리 시간은 19.6ms, 23.9ms, 23.7ms다. LILI-OM은 지면을 향할 때 추출 feature가 너무 적어 세 데이터 모두에서 실패했다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- loop closure가 없는 순수 odometry라 장거리에서 드리프트가 누적된다. map 크기를 2000m 이상으로 키우면 누적 드리프트 때문에 오래된 map point와의 오매칭이 생길 수 있다고 논문 스스로 지적한다.
- 정확도 평가에서 날씨와 GPS 품질 문제로 37개 중 19개 시퀀스만 ground truth 비교가 가능했다. 항공 실험에서도 기술적 문제로 GPS 경로를 확보하지 못해 정량 평가 없이 육안 비교에 그쳤다.
- measurement model이 국소 평면을 가정하므로 평면이 드문 환경에서 어떤 한계가 있는지는 논문이 따로 다루지 않았다. 같은 가정을 쓰는 generalized-ICP 계열과 공유하는 제약이다.
- ARM 플랫폼에서는 10ms 샘플링 주기를 간헐적으로 초과한다. 발생 빈도가 낮아 실용상 문제는 아니라고 보지만 100Hz 실시간이 보장되지는 않는다.
- 벤치마크의 자료구조 비교는 FAST-LIO2에 통합한 조건에서 측정한 값이라 다른 응용에서의 상대 성능은 달라질 수 있다.

## 6. 관련 연구 (Related Work)

- LOAM(Zhang 2014)이 feature 추출과 scan-to-scan odometry, 저속 mapping 구조를 세웠고 LeGO-LOAM과 LOAM-Livox가 이를 확장했다. LeGO-LOAM은 지면 분할과 loop closure를 더했고 LOAM-Livox는 solid-state LiDAR로 옮기면서 새 scan을 전역 map에 직접 등록했다. FAST-LIO2는 이 LOAM 계보가 물려준 feature 추출과 odometry, mapping 분리를 모두 없앤다.
- tightly-coupled LIO 계열로는 LIO-SAM(factor graph), LINS(iterated Kalman filter와 robocentric 정식화), LILI-OM(sliding window)과 벤치마크에서 직접 비교한다. LION은 loosely-coupled 방식이지만 raw point 등록이라는 아이디어를 먼저 시도했다.
- direct 등록은 generalized-ICP와 발상이 비슷하다. 두 방법 모두 환경이 국소적으로 평면이라고 가정한다. 다만 generalized-ICP는 계산 부담이 크고, raw point를 쓰는 다른 계열인 NDT는 ICP보다 안정성이 낮아 일부 장면에서 발산한다.
- back-propagation과 Kalman gain 수식 변형은 전작 FAST-LIO(Xu & Zhang 2021)에서 왔고 본 논문은 direct 등록과 ikd-Tree를 더했다.
- 동적 자료구조로는 octree(PCL), R*-tree(boost), nanoflann k-d tree, scapegoat tree와 비교한다. ikd-Tree는 scapegoat k-d tree의 부분 re-building 아이디어를 기반으로 삼고, 로봇 mapping 요구인 증분 갱신과 on-tree downsampling, 실시간 검색에 맞춰 확장한 것이 차별점이다.

## 7. 용어집 (Glossary)

- LIO (LiDAR-inertial odometry): LiDAR와 IMU를 결합해 자세 추정과 mapping을 함께 수행하는 방법. 이 논문의 문제 설정.
- ikd-Tree (incremental k-d tree): 증분 삽입과 삭제, on-tree downsampling, 병렬 re-balancing을 지원하는 이 논문의 k-d tree 자료구조.
- direct method: feature 추출 없이 raw point를 map에 바로 등록하는 방식. visual SLAM의 direct method에서 이름을 따왔다.
- back-propagation (motion compensation): scan 안 각 point의 샘플링 시점 자세를 IMU 측정으로 역추정한 뒤 scan 종료 시점으로 투영하는 방식이다. 그렇게 왜곡을 보정한다. 신경망 학습의 backpropagation과 무관하다.
- on-tree downsampling: map 삽입과 동시에 tree 위에서 공간 해상도를 유지하는 downsampling.
- lazy label: 삭제 요청을 받은 point를 즉시 제거하지 않고 라벨만 붙였다가 re-building 때 실제로 지우는 방식.
- operation logger: 병렬 re-building 중 main thread가 보낸 갱신 요청을 쌓아 두었다가 새 sub-tree에 재적용하는 큐.
- solid-state LiDAR: 회전 기구 없이 프리즘이나 MEMS로 주사하는 신형 LiDAR. FoV가 좁고 scanning pattern이 비반복적이라 feature 추출 기반 방법이 잘 안 맞는다.

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 4 | 시스템 전체 구조 (state estimation과 ikd-Tree mapping) | caption-region | wiki 권장 (architecture), curated |
| fig02 | 5 | measurement model (point와 평면 제약) | caption-region | wiki 권장 (direct method), curated |
| fig03 | 6 | map region 관리 2D 예시 | caption-region | wiki 권장 (method), curated |
| fig04 | 9 | sub-tree re-building 과정 | caption-region | wiki 권장 (ikd-Tree), curated |
| fig05 | 12 | 자료구조별 검색과 삽입 시간 비교 | manual | wiki 권장 (result), curated |
| fig06 | 14 | 실험 플랫폼 3종 | caption-region | 보류 |
| fig07 | 15 | 대규모 장면 mapping 결과 | caption-region | 보류 |
| fig08 | 15 | scan당 처리 시간 추이 | caption-region | 보류 |
| fig09 | 16 | UAV flip 실험 | manual | wiki 권장 (robustness), curated |
| fig10 | 16 | flip 실험 환경과 3D map | manual | 보류 |
| fig11 | 16 | flip 실험 상태 곡선 | manual | 보류 |
| fig12 | 16 | 핸드헬드 고속 이동 mapping | caption-region | 보류 |
| fig13 | 17 | 핸드헬드 실험 상태 곡선 | caption-region | 보류 |
| fig14 | 17 | 항공 mapping 결과 | caption-region | 보류 |
| tab01 | 7 | tree node attribute 초기값 | table-region | 보류 |
| tab02 | 11 | 벤치마크 데이터셋 구성 | table-region | 보류 |
| tab03 | 12 | 자료구조별 scan당 시간 비교 | manual | 보류 |
| tab04 | 13 | RMSE 벤치마크 | table-region | wiki 권장 (result), curated |
| tab05 | 14 | end-to-end 오차 | table-region | 보류 |
| tab06 | 15 | 시스템별 scan당 처리 시간 | table-region | 보류 |
| tab07 | 15 | 구성요소별 처리 시간 (FAST-LIO 대비) | table-region | wiki 권장 (efficiency), curated |
| tab08 | 18 | 전체 37개 시퀀스 목록 | manual | 보류 |
