---
title: "FAST_LIO: A computationally efficient and robust LiDAR-inertial odometry package"
type: repo
year: 2020
category: physical-ai
source: hku-mars-fast-lio.md
raw_path: raw/repos/hku-mars-fast-lio.md
raw_filename: "hku-mars-fast-lio.md"
source_collection: external
org: "hku-mars"
repo: "FAST_LIO"
url: "https://github.com/hku-mars/FAST_LIO"
license: "GPL-2.0"
tags: [physical-ai, slam]
---

## 요약

FAST-LIO 논문 계열(FAST-LIO, FAST-LIO2)의 공식 구현 저장소다. 홍콩대 MaRS Lab이 관리하고 라이선스는 GPL-2.0이다. 2021-07-05 업데이트로 FAST-LIO 2.0이 기본이 됐고, FAST-LIO 1.0 알고리즘을 코드로 보려면 commit 기록을 거슬러 가야 한다.

FAST-LIO는 LiDAR와 IMU 데이터를 tightly-coupled iterated extended Kalman filter로 융합하는 odometry 패키지로, 빠른 움직임이나 복잡한 환경에서도 안정적으로 동작한다. odometry는 센서로 이동량을 누적해 로봇의 상대 위치를 추정하는 방법을 말한다.

## 배경

LOAM 계열의 고전적 LiDAR odometry는 스캔에서 edge나 plane 같은 feature를 먼저 추출하고 그것만 정합에 썼다. 이 구조에는 두 가지 문제가 있다. feature 검출기를 LiDAR 기종마다 다시 튜닝해야 하고, 추출 과정에서 미묘한 환경 특징이 버려진다.

FAST-LIO2는 이 단계를 생략한다. raw point를 map에 그대로 등록하는 direct 방식이라 환경 정보를 덜 버리고, feature 추출기가 없으므로 새로운 LiDAR 기종 지원도 쉬워진다. 이 전환을 가능하게 한 요소가 ikd-Tree라는 map 자료구조다. 알고리즘의 정량 평가는 원 논문 페이지([[physical-ai/xu-2020-fast-lio-a-fast-robust-lidar-inertial]], [[physical-ai/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry]])가 다루며, 이 페이지는 저장소가 제공하는 기능과 사용법에 집중한다.

## 저장소 구성과 기능

README가 제시하는 FAST-LIO 1.0의 특징은 세 가지다. odometry 최적화를 위한 빠른 iterated Kalman filter, 대부분의 정지 환경에서 가능한 자동 초기화, 그리고 계산량을 줄이는 병렬 KD-Tree 탐색이다.

FAST-LIO 2.0은 여기에 다섯 가지를 더한다.

| 새 기능 | 내용 |
|---|---|
| 증분 mapping | ikd-Tree로 map을 증분 갱신해 100Hz 이상의 LiDAR rate를 달성 |
| direct odometry | raw point의 scan-to-map 정합 (feature 추출 비활성화 가능), 정확도 향상 |
| 다양한 LiDAR | spinning(Velodyne, Ouster)과 solid-state(Livox Avia, Horizon, MID-70)를 함께 지원 |
| 외부 IMU | 내장 IMU 없는 구성도 지원 (6축, 9축 모두 가능) |
| ARM 플랫폼 | Khadas VIM3, Nvidia TX2, Raspberry Pi 4B(8G RAM)에서 구동 |

ikd-Tree는 point 삽입과 삭제를 증분으로 처리하고 필요할 때 부분 재균형하는 KD-Tree 변형으로, 별도 저장소(hku-mars/ikd-Tree)로도 공개되어 있다. point cloud가 계속 갱신되는 상황에서도 kNN search 성능이 유지되는 것이 핵심이다.

## 설치와 실행

ROS 패키지 구조이고 빌드는 catkin 기반이다. 사전 의존성은 다음과 같다.

| 의존성 | 요구 버전 |
|---|---|
| Ubuntu | 16.04 이상 |
| ROS | Melodic 이상 |
| PCL | 1.8 이상 (Ubuntu 18.04 이상이면 기본 패키지로 충분) |
| Eigen | 3.3.4 이상 |
| livox_ros_driver | 필수. 빌드와 실행 전에 source 되어 있어야 한다 |

Docker 이미지(kenny0407/marslab_fastlio2)로 실행하는 경로도 README에 스크립트째 포함되어 있다.

실행 경로는 네 가지다.

- Livox Avia 직결: `mapping_avia.launch`와 `livox_lidar_msg.launch`를 함께 실행한다. 반드시 `livox_lidar_msg.launch`를 써야 하는데, 그 launch 파일의 CustomMsg 형식만 point별 timestamp를 담고 이 값이 motion undistortion에 필수이기 때문이다.
- 다른 Livox 기종과 외부 IMU: `config/avia.yaml`에서 LiDAR 토픽, IMU 토픽, extrinsic_T와 extrinsic_R을 설정한다. extrinsic은 IMU를 기준 좌표계로 한 LiDAR의 pose로 정의된다.
- Velodyne과 Ouster: `config/velodyne.yaml`에서 토픽과 함께 timestamp_unit, scan_line(16, 32, 64 line 테스트됨)을 설정하고 `mapping_velodyne.launch`를 실행한다.
- MARSIM 시뮬레이터: hku-mars/MARSIM을 설치하면 실제 기기 없이 `mapping_marsim.launch`로 실행할 수 있다.

공개 rosbag 예제는 두 종류다. Livox Avia rosbag과, NCLT 데이터셋의 Velodyne HDL-32E를 rosbag으로 변환한 것이다. 또한 `pcd_save_enable`을 1로 설정하면 전체 스캔이 `PCD/scans.pcd`로 누적 저장되어 pcl_viewer로 볼 수 있다.

README가 강조하는 운영 주의사항은 세 가지다.

- IMU와 LiDAR의 시간 동기화가 중요하다. 소프트웨어 동기화(time_sync_en)는 정확도를 보장하지 못하므로 외부 동기화가 정말 불가능할 때만 켠다.
- "Failed to find match for field 'time'" 경고는 rosbag에 point별 timestamp가 없다는 뜻이다. forward/backward propagation이 이 값에 의존한다.
- extrinsic을 알고 있다면 extrinsic_est_en을 false로 설정하는 것을 권장한다. extrinsic 초기화가 필요하면 같은 랩의 LI_Init 패키지를 쓴다.

## UAV 탑재 사례

실제 로봇 검증용으로 제작한 소형 쿼드로터 구성도 공개되어 있다. 70도 FoV의 Livox Avia와 DJI Manifold 2-C 온보드 컴퓨터(1.8GHz Intel i7-8550U, 8G RAM)를 탑재한다. 이 정도 저사양 장비에서 실시간으로 실행된다는 점이 경량성의 근거다.

## 확장 생태계

이 저장소는 MaRS Lab 생태계의 front-end 역할을 한다. README의 Related Works에 오른 프로젝트는 다음과 같다.

| 프로젝트 | 역할 |
|---|---|
| ikd-Tree | FAST-LIO2의 map 자료구조 (독립 저장소) |
| R2LIVE | FAST-LIO를 LiDAR-inertial front-end로 쓰는 LiDAR-inertial-visual 융합 |
| LI_Init | LiDAR-IMU extrinsic 초기화와 동기화 패키지 |
| FAST-LIO-LOCALIZATION | 기존 map 위에서의 re-localization 모듈 결합 |
| FAST-LIVO / FAST-LIVO2 | pixel 수준 정확도의 LiDAR-inertial-visual odometry 후속 |
| IKFOM | on-manifold Kalman filter 툴박스 |
| Bubble Planner 외 | FAST-LIO를 planning에 응용한 UAV, UGV 데모 |

외부 후속으로는 map 자료구조를 iVox로 바꾼 Faster-LIO([[physical-ai/irasc-2024-faster-lio-lightweight-tightly-coupled]])가 있다.

라이선스가 GPL-2.0이므로 상용 제품에 포함할 때는 조건을 검토해야 한다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| direct 방식 | feature 추출 단계 없이 raw point를 그대로 정합에 쓰는 방식 |
| ikd-Tree | point 삽입과 삭제를 증분 처리하고 동적으로 재균형하는 KD-Tree. FAST-LIO2의 map 자료구조 |
| extrinsic | IMU 좌표계를 기준으로 한 LiDAR의 상대 pose. config yaml의 extrinsic_T와 extrinsic_R |
| motion undistortion | 스캔 중 로봇이 움직여 생기는 point별 왜곡을 timestamp 기반으로 보정하는 처리 |
| rosbag | ROS 토픽 스트림을 기록하고 재생하는 파일 형식. 재현 실험의 표준 경로 |

## 관련 페이지

- [[physical-ai/xu-2020-fast-lio-a-fast-robust-lidar-inertial]]: FAST-LIO 1.0 원 논문. iEKF 융합 알고리즘의 정량 결과는 원 논문 페이지 참고.
- [[physical-ai/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry]]: FAST-LIO2 원 논문. direct 방식과 ikd-Tree의 근거.
- [[physical-ai/irasc-2024-faster-lio-lightweight-tightly-coupled]]: 이 저장소 기반으로 map 자료구조를 iVox로 바꾼 후속.
- [[physical-ai/taeyoung-2022-fast-lio-paper-review]]: FAST-LIO 논문의 한국어 리뷰 글.
- [[overviews/physical-ai-overview]]: physical-ai 카테고리의 분류 뼈대와 학습 경로 허브.
