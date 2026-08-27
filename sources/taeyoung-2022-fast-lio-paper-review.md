---
title: "[Paper Review] FAST-LIO 요약 및 설명"
type: article
year: 2022
category: physical-ai
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

## 한 줄 요약 (One-line Summary)

FAST-LIO 논문을 한국어로 풀어 쓴 리뷰다. 논문은 forward/backward propagation과 iterated error state Kalman filter의 update 절차를 수식으로 압축해 놓았다. 이 글은 그 절차를 단계별로 해설하고 새 Kalman gain 공식이 왜 빠른지를 measurement/state 차원에서 설명한다.

## 1. 자료 정보 (Document Information)

- 저자: Taeyoung Kim (Taeyoung's Blog, taeyoung96.github.io)
- 발행: 2022-08-09
- 대상 논문: [[physical-ai/xu-2020-fast-lio-a-fast-robust-lidar-inertial]]
- 성격: 논문 리뷰 (수식 전개 중심의 한국어 해설). 저자의 별도 IESKF 개념 포스팅과 연결돼 있다

## 2. 주요 기여 (Key Contributions)

논문 원문이 생략하거나 압축한 대목을 풀어 쓴 점이 이 글의 값이다.

- 파이프라인의 각 단계가 논문의 어느 절(Section 3-C-1~4)에 대응하는지 표시하며 따라간다.
- forward propagation과 backward propagation을 "IMU로 state를 갱신하는 과정"과 "LiDAR point를 하나의 프레임으로 만들어 주는 과정"으로 구분해 그림과 함께 설명한다.
- iterated state update에 등장하는 Jacobian들의 physical meaning을 짚는다. 전체가 MAP(maximum a-posteriori) 문제 풀이라는 관점도 제시한다.
- 새 Kalman gain 공식의 이점을 "역행렬 차원이 point cloud 수가 아니라 state vector 차원에 묶인다"로 요약한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

리뷰는 LiDAR pre-processing에서 출발한다. solid-state LiDAR의 점을 20ms 단위로 누적한다. planar feature는 LOAM 방식으로, edge feature는 LOAM-Livox 방식으로 뽑는다. 스캔 사이에 들어온 IMU 데이터만 쓰므로 LiDAR와 IMU를 굳이 시각 정렬하지 않는다.

다음은 motion distortion 보정이다. 기존 LiDAR odometry는 등속 가정으로 보정하지만 LIO는 IMU 각속도·가속도로 state 변화를 직접 계산한다. forward propagation은 IMU 노이즈를 0으로 가정한 채 state와 covariance를 전파한다. covariance 전파에 쓰이는 모델은 error state dynamic model이다. backward propagation 쪽은 스캔 종료 시점 state와의 상대 pose로 모든 point cloud를 스캔 종료 프레임에 투영한다.

state estimation에는 iterated error state Kalman filter를 쓴다. residual은 scan-to-map 매칭으로 구하고 edge는 edge끼리 plane은 plane끼리 KD-Tree에서 correspondence를 찾는다. measurement model에는 LiDAR ranging·beam-directing noise가 들어가며 Jacobian H는 first order approximation으로 얻는다. update는 error state가 threshold 아래로 수렴할 때까지 반복된다.

map update는 optimal state로 얻은 feature point를 전역 프레임으로 변환해 map에 누적하는 단계다. 초기화는 몇 초 정지 상태에서 bias·noise covariance·중력 벡터를 얻으면 끝난다. LiDAR-IMU extrinsic은 기지로 가정한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

실험 절은 짧다. 결과는 FAST-LIO 공식 영상을 참고하라고 안내한다. 드론에 LiDAR를 달아 odometry를 구하는 시연 감상으로 글을 맺는다. 정량 수치는 원 논문 페이지에서 본다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- 실험·비교 분석은 다루지 않는다. 방법 이해용으로 읽으면 된다.
- 수식 이미지 다수가 원본 블로그 이미지로만 존재한다. 수집 시 도식 7장은 받았지만 수식 단독 이미지 11장은 후보에서 빠졌다. 필요하면 page-full.png 스크린샷이나 원문 URL로 본다.

## 6. 관련 연구 (Related Work)

- 대상 논문: [[physical-ai/xu-2020-fast-lio-a-fast-robust-lidar-inertial]]
- 저자의 IESKF(Iterated Error State Kalman Filter) 개념 포스팅이 선행 읽기로 연결된다 (수집 범위 밖)
- 코드 저장소: [[physical-ai/hku-mars-fast-lio]] — 리뷰는 FAST-LIO 1.0 알고리즘을 보려면 commit 기록을 확인해야 한다고 짚는다 (현재 저장소는 FAST-LIO2 기준)

## 7. 용어집 (Glossary)

- IESKF (iterated error state Kalman filter) — error state를 추정 대상으로 삼고 update를 수렴까지 반복하는 Kalman filter 변형. 이 리뷰가 FAST-LIO 최적화의 뼈대로 지목하는 개념
- scan-to-map matching — 새 스캔을 직전 스캔이 아니라 누적 map과 정합해 residual을 만드는 방식
- extrinsic — LiDAR와 IMU 사이의 상대 자세·위치 변환. FAST-LIO는 기지로 가정한다

## 8. 그림 후보 (Figure Candidates)

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | 전체 파이프라인 (논문 Fig 2a 재게재) | fetched | (선택 — 논문 페이지 fig02와 중복) |
| fig02 | notation 표 재게재 | fetched | (선택) |
| fig03 | state vector 정의 수식 | fetched | (선택) |
| fig04 | forward/backward propagation 도식 | fetched | ★ wiki 권장 (method) |
| fig05 | backward propagation 수식 | fetched | (선택) |
| fig06 | Algorithm 1 재게재 | fetched | ★ wiki 권장 (method) |
| fig07 | UAV 비행 실험 (논문 Fig 3 재게재) | fetched | (선택) |
| fig08 | 전체 페이지 스크린샷 | screenshot | (아카이브용) |
| fig09~14 | 도식 영역 크롭 | crop | (아카이브용) |
