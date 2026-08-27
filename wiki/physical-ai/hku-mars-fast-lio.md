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

## 요약 (Summary)

FAST-LIO 논문 계열의 공식 구현 저장소다. 홍콩대 MaRS Lab이 관리하고 라이선스는 GPL-2.0. 2021-07-05 업데이트로 FAST-LIO 2.0이 기본이 됐다. direct 방식이라 feature를 추출하지 않고 raw 점을 map에 곧장 등록한다. map 자료구조로는 증분 갱신이 되는 ikd-Tree를 쓴다. FAST-LIO 1.0 알고리즘을 코드로 보려면 commit 기록을 거슬러 가야 한다.

## 주요 기여 (Key Contributions)

README가 내세우는 특징은 넷이다. 그중 ikd-Tree는 KD-Tree 변형인데, 점 삽입·삭제를 증분으로 처리하고 트리를 동적으로 재균형한다. 별도 저장소(hku-mars/ikd-Tree)로도 공개돼 있다. UAV onboard급 저사양 장비에서 실시간으로 돌아간다는 점도 꼽는다.

- direct 등록과 point-wise motion compensation. feature 추출을 생략해 미묘한 환경 특징까지 활용하고 스캔 안의 점을 시각별로 정확히 보정한다.
- 폭넓은 LiDAR 지원. Livox Avia·Horizon·Mid-360 같은 solid-state 기종과 Velodyne·Ouster 같은 spinning 기종을 함께 지원한다.

## 방법론 및 아키텍처 (Methodology and Architecture)

ROS catkin 패키지 구조이고 PCL(≥1.8)·Eigen(≥3.3.4)·livox_ros_driver가 사전 의존성이다. Docker 실행 스크립트도 README에 들어 있다. 실행 경로는 셋이다. Livox Avia를 직결하면 `mapping_avia.launch`로 바로 띄운다. 다른 기종은 config yaml을 갈아끼워 돌리는데, `velodyne.yaml` 등을 쓸 때의 point timestamp 필드 주의 사항도 README에 적혀 있다. 공개 rosbag으로 재현하는 길도 안내한다. `pcd_save_enable` 옵션으로 map을 PCD 파일로 저장할 수 있다.

## 결과 (Results)

정량 표는 없다. 대신 mapping 결과 이미지(HKU Main Building, 지하주차장, 실내 복도)와 시연 영상이 실려 있다. 정량 수치는 원 논문 페이지 [[physical-ai/xu-2020-fast-lio-a-fast-robust-lidar-inertial]]에서 본다.

## 관련 페이지 (Related Pages)

- [[physical-ai/xu-2020-fast-lio-a-fast-robust-lidar-inertial]] — 원 논문 (FAST-LIO 1.0)
- [[physical-ai/irasc-2024-faster-lio-lightweight-tightly-coupled]] — ikd-Tree를 iVox로 바꾼 후속 Faster-LIO 해설
- [[physical-ai/taeyoung-2022-fast-lio-paper-review]] — FAST-LIO 1.0 수식 해설. 저장소 commit 기록 안내도 이 리뷰가 짚는다
- README Related Works: ikd-Tree, R2LIVE/R3LIVE(LiDAR-inertial-visual), FAST-LIO-LOCALIZATION, FAST-LIVO — 이 저장소를 front-end로 쓰는 확장 계열
