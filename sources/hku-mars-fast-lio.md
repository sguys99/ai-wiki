---
title: "FAST_LIO: A computationally efficient and robust LiDAR-inertial odometry package"
type: repo
year: 2020
category: physical-ai
raw_path: raw/repos/hku-mars-fast-lio.md
raw_filename: "hku-mars-fast-lio.md"
source_collection: external
org: "hku-mars"
repo: "FAST_LIO"
url: "https://github.com/hku-mars/FAST_LIO"
license: "GPL-2.0"
tags: [physical-ai, slam]
figures:
  - id: fig01
    label: overview_fastlio2
    kind: figure
    file: assets/hku-mars-fast-lio/fig01.png
    raw: https://raw.githubusercontent.com/hku-mars/FAST_LIO/main/doc/overview_fastlio2.svg
    caption: "FAST-LIO2 시스템 개요 (README 도식)"
    strategy: manual
    curated: false
  - id: fig02
    label: HKU_MB_001
    kind: figure
    file: assets/hku-mars-fast-lio/fig02.png
    raw: https://raw.githubusercontent.com/hku-mars/FAST_LIO/main/doc/results/HKU_MB_001.png
    caption: "HKU Main Building mapping 결과 (README)"
    strategy: manual
    curated: false
  - id: fig03
    label: uav_system
    kind: figure
    file: assets/hku-mars-fast-lio/fig03.png
    raw: https://raw.githubusercontent.com/hku-mars/FAST_LIO/main/doc/uav_system.png
    caption: "UAV 탑재 시스템 구성 (README)"
    strategy: manual
    curated: false
---

## 한 줄 요약 (One-line Summary)

FAST-LIO 논문 계열(FAST-LIO, FAST-LIO2)의 공식 구현 저장소다. iEKF 기반 LiDAR-inertial odometry에 ikd-Tree를 결합해 direct 방식으로 raw point를 등록한다. Livox와 Velodyne 등 다양한 LiDAR와 ROS를 지원한다.

## 1. 자료 정보 (Document Information)

- org/repo: hku-mars/FAST_LIO (홍콩대 MaRS Lab)
- 라이선스: GPL-2.0
- 원 논문: FAST-LIO ([[physical-ai/xu-2020-fast-lio-a-fast-robust-lidar-inertial]]), FAST-LIO2 "Fast Direct LiDAR-inertial Odometry"
- 수집 범위: README 전문 (2020년 공개, FAST-LIO 2.0 업데이트는 2021-07-05)

## 2. 주요 기여 (Key Contributions)

FAST-LIO 2.0은 LOAM류가 거치던 feature 추출을 건너뛴다. raw point를 map에 그대로 등록하는 direct 방식이라 미묘한 환경 특징까지 활용한다. 스캔 안의 point는 시각별로 point-wise motion compensation을 적용해 정확히 보정한다.

map 자료구조는 ikd-Tree다. 증분 갱신과 동적 재균형을 지원하는 KD-Tree 변형이라 점을 계속 넣고 빼면서도 kNN 검색 성능을 유지한다. hku-mars/ikd-Tree라는 별도 저장소로도 공개되어 있다.

- 지원 LiDAR: solid-state LiDAR(Livox Avia, Horizon, Mid-360)와 spinning LiDAR(Velodyne, Ouster)를 함께 지원한다. 외부 IMU 연결이 전제다.
- 경량 실행: UAV onboard 컴퓨터급 저사양 장비에서 실시간으로 구동된다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

저장소는 ROS 패키지 구조다. 빌드는 catkin 기반이고 PCL(≥1.8)과 Eigen(≥3.3.4), livox_ros_driver가 사전 의존성이다. Docker 실행 스크립트도 README에 들어 있다.

실행 경로는 세 가지다. 첫 번째는 Livox Avia를 직결하는 경우로 `mapping_avia.launch`를 쓰며, livox_ros_driver로 실제 기기를 연결해 구동한다. 두 번째는 Livox serials나 Velodyne 같은 다른 기종으로, config의 yaml(`velodyne.yaml` 등)을 바꿔 실행한다. 다른 기종 경로에는 point timestamp 필드 유무에 따른 주의 사항을 따로 적어 놓았다. 세 번째는 rosbag 예제로, Avia와 Velodyne 공개 rosbag을 재생해 재현하는 경로다.

PCD 저장 옵션(`pcd_save_enable`)으로 map을 파일로 남길 수 있다. UAV 탑재 사례 절에서는 자체 하드웨어 플랫폼과 비행 영상을 소개한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

README에 정량 벤치마크 표는 없다. 대신 mapping 결과 이미지(HKU Main Building, 지하주차장, 실내 복도 등)와 시연 영상 링크가 그 자리를 채운다. 정량 수치는 원 논문 쪽에 있다 ([[physical-ai/xu-2020-fast-lio-a-fast-robust-lidar-inertial]]의 결과 절 참고).

## 5. 한계와 향후 과제 (Limitations and Future Work)

README 자체는 한계를 명시하지 않는다. 후속 과제는 관련 연구 절에서 읽어 내야 한다. ikd-Tree, R2LIVE/R3LIVE(LiDAR-inertial-visual 융합), FAST-LIO-LOCALIZATION(기존 map 상 재위치), FAST-LIVO 같은 확장 프로젝트가 이 저장소를 front-end로 쓴다.

라이선스가 GPL-2.0이라 상용 제품에 적용할 때는 조건을 검토해야 한다.

## 6. 관련 연구 (Related Work)

README의 Related Works 절에는 ikd-Tree, R2LIVE, UAV Avoiding Dynamic Obstacles, UGV Demo, Bubble Planner가 올라 있다. Faster-LIO ([[physical-ai/irasc-2024-faster-lio-lightweight-tightly-coupled]])는 이 저장소의 FAST-LIO2를 기반으로 map 자료구조를 iVox로 바꾼 후속이다.

## 7. 용어집 (Glossary)

- ikd-Tree: point 삽입과 삭제를 증분으로 처리하고 필요할 때 부분 재균형하는 KD-Tree. FAST-LIO2의 map 자료구조
- direct 방식: feature 추출 단계를 두지 않고 raw point를 그대로 등록에 쓰는 방식
- rosbag: ROS 토픽 스트림을 기록하고 재생하는 파일 형식. 재현 실험의 표준 경로

## 8. 그림 후보 (Figure Candidates)

repo는 README 이미지를 in-place 참조한다 (별도 -figures/ 없음, CLAUDE.md repos 규약). 필요 시 사용자가 wiki/assets/hku-mars-fast-lio/에 수동 저장한다.

| id | 원본 | caption | 추천 |
|---|---|---|---|
| fig01 | doc/overview_fastlio2.svg | FAST-LIO2 시스템 개요 | (선택, svg라 변환 필요) |
| fig02 | doc/results/HKU_MB_001.png | HKU Main Building mapping | (선택) |
| fig03 | doc/uav_system.png | UAV 탑재 시스템 | (선택) |
