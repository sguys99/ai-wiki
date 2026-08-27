---
title: "[Paper Review] FAST-LIO 요약 및 설명"
type: article
year: 2022
category: physical-ai
source: taeyoung-2022-fast-lio-paper-review.md
raw_path: raw/articles/taeyoung-2022-fast-lio-paper-review.md
raw_filename: "taeyoung-2022-fast-lio-paper-review.md"
source_collection: external
author: "Taeyoung Kim"
url: "https://taeyoung96.github.io/research/Fast_LIO/"
publisher: "Taeyoung's Blog"
tags: [physical-ai, slam]
figures:
  - id: fig01
    kind: figure
    file: assets/taeyoung-2022-fast-lio-paper-review/fig01.png
    raw: raw/articles/taeyoung-2022-fast-lio-paper-review-figures/fig01.png
    caption: "FAST-LIO 전체 파이프라인 (논문 Figure 2a 재게재)"
    strategy: fetched
    curated: false
  - id: fig02
    kind: figure
    file: assets/taeyoung-2022-fast-lio-paper-review/fig02.png
    raw: raw/articles/taeyoung-2022-fast-lio-paper-review-figures/fig02.png
    caption: "notation 정리 (논문 Table I 재게재)"
    strategy: fetched
    curated: false
  - id: fig03
    kind: figure
    file: assets/taeyoung-2022-fast-lio-paper-review/fig03.png
    raw: raw/articles/taeyoung-2022-fast-lio-paper-review-figures/fig03.png
    caption: "state vector 정의와 kinematic model 수식"
    strategy: fetched
    curated: false
  - id: fig04
    kind: figure
    file: assets/taeyoung-2022-fast-lio-paper-review/fig04.png
    raw: raw/articles/taeyoung-2022-fast-lio-paper-review-figures/fig04.png
    caption: "forward/backward propagation 시간축 도식 (논문 Figure 2b 재게재)"
    strategy: fetched
    curated: true
  - id: fig05
    kind: figure
    file: assets/taeyoung-2022-fast-lio-paper-review/fig05.png
    raw: raw/articles/taeyoung-2022-fast-lio-paper-review-figures/fig05.png
    caption: "backward propagation 수식"
    strategy: fetched
    curated: false
  - id: fig06
    kind: figure
    file: assets/taeyoung-2022-fast-lio-paper-review/fig06.png
    raw: raw/articles/taeyoung-2022-fast-lio-paper-review-figures/fig06.png
    caption: "state estimation 절차 정리 (논문 Algorithm 1 재게재)"
    strategy: fetched
    curated: true
  - id: fig07
    kind: figure
    file: assets/taeyoung-2022-fast-lio-paper-review/fig07.png
    raw: raw/articles/taeyoung-2022-fast-lio-paper-review-figures/fig07.png
    caption: "UAV 비행 실험 결과 (논문 Figure 3 재게재)"
    strategy: fetched
    curated: false
  - id: fig08
    kind: figure
    file: assets/taeyoung-2022-fast-lio-paper-review/fig08.png
    raw: raw/articles/taeyoung-2022-fast-lio-paper-review-figures/page-full.png
    caption: "전체 페이지 스크린샷 (상단 6000px)"
    strategy: screenshot
    curated: false
---

## 요약 (Summary)

FAST-LIO 논문을 한국어로 풀어 쓴 리뷰다 (Taeyoung's Blog, 2022-08). 논문이 수식으로 압축해 놓은 forward/backward propagation과 iterated error state Kalman filter의 update 절차를 단계별로 해설한다. 각 단계가 논문의 어느 절(Section 3-C-1~4)에 해당하는지도 표시하며 따라간다. 수식이 부담스러워 논문 진입이 막힐 때 먼저 읽는 용도로 좋다.

## 주요 기여 (Key Contributions)

- forward propagation을 "IMU로 state를 갱신하는 과정", backward propagation을 "LiDAR point를 하나의 프레임으로 만들어 주는 과정"으로 구분해 그림과 함께 설명한다.
- iterated state update에 나오는 Jacobian들의 physical meaning을 짚고 전체가 MAP(maximum a-posteriori) 문제 풀이임을 밝힌다.
- 새 Kalman gain 공식의 이점을 "역행렬 차원이 point cloud 수가 아니라 state vector 차원에 묶인다"로 요약한다. 이것이 논문의 main contribution이라는 판정도 같다.
- 저자의 별도 IESKF 개념 포스팅과 연결돼 있어 filter 배경 지식을 나눠 읽을 수 있다.

## 방법론 및 아키텍처 (Methodology and Architecture)

전처리에서 solid-state LiDAR의 점을 20ms 단위로 누적하고 planar feature는 LOAM 방식, edge feature는 LOAM-Livox 방식으로 뽑는다. 리뷰는 스캔 사이에 들어온 IMU 데이터만 쓰므로 두 센서를 굳이 시각 정렬하지 않는다고도 짚는다.

![[assets/taeyoung-2022-fast-lio-paper-review/fig04.png]]
*forward/backward propagation 시간축 — IMU로 스캔 종료 시각 state를 예측하고 각 점 시각의 상대 pose로 전체 point cloud를 스캔 종료 프레임에 투영한다 (논문 Figure 2b 재게재)*

motion distortion 보정에서는 기존 LiDAR odometry의 등속 가정과 LIO의 IMU 기반 계산을 대비시킨다. covariance 전파에 error state dynamic model이 쓰인다고 명시한다. state estimation은 scan-to-map 매칭으로 residual을 구한다. edge는 edge끼리 plane은 plane끼리 KD-Tree에서 correspondence를 찾고 LiDAR ranging·beam-directing noise가 measurement model에 들어간다. error state가 threshold 아래로 수렴할 때까지 update를 반복한다.

![[assets/taeyoung-2022-fast-lio-paper-review/fig06.png]]
*state estimation 절차 정리 — forward/backward propagation부터 Kalman gain 계산과 수렴 판정까지 (논문 Algorithm 1 재게재)*

map update는 optimal state로 얻은 feature point를 전역 프레임으로 변환해 누적하는 것이 전부다. 초기화는 몇 초 정지 상태에서 bias·noise covariance·중력 벡터를 얻는다.

## 결과 (Results)

실험 절은 짧다. 저자는 결과를 보려면 FAST-LIO 공식 영상을 보라고 안내하고 절을 마친다. 정량 수치는 [[physical-ai/xu-2020-fast-lio-a-fast-robust-lidar-inertial]]의 결과 절에서 본다.

## 관련 페이지 (Related Pages)

- [[physical-ai/xu-2020-fast-lio-a-fast-robust-lidar-inertial]] — 대상 논문
- [[physical-ai/hku-mars-fast-lio]] — 코드 저장소. FAST-LIO 1.0을 보려면 commit 기록을 확인해야 한다는 안내가 이 리뷰에 있다
- [[physical-ai/airlab-2024-fast-lio-a-fast-robust]] — 같은 논문의 발표 영상 (수식 없이 빠르게 훑을 때)
