---
title: "누구보다 빠르게 남들과는 다르게💨💨 FAST-LIO: A Fast, Robust LIO Package by Kalman Filter(RA-L 2021)"
type: video
year: 2024
category: physical-ai
source: airlab-2024-fast-lio-a-fast-robust.md
raw_path: raw/videos/airlab-2024-fast-lio-a-fast-robust.md
raw_filename: "airlab-2024-fast-lio-a-fast-robust.md"
source_collection: external
channel: "AIRLab"
url: "https://youtu.be/k2rhGdIpHqw"
duration: "12m34s"
tags: [physical-ai, slam]
---

## 요약 (Summary)

FAST-LIO 논문을 12분에 훑는 한국어 세미나 발표 영상이다 (AIRLab, 2024-01). SLAM의 front-end/back-end 구도에서 출발해 LIO가 어디에 놓이는지 잡아 준 다음 논문 순서대로 전처리·propagation·iterated Kalman filter·새 Kalman gain·실험 4종을 요약한다. 입문 자료로 알맞다. 논문이나 수식 리뷰에 들어가기 전에 지형도를 그려 두는 용도다.

## 주요 기여 (Key Contributions)

- SLAM을 front-end와 back-end로 나눈다. front-end는 무엇을 보고 있는지 판단하고 back-end는 그 대상이 어디 있고 내 state가 무엇인지 추정한다. FAST-LIO는 Kalman filter로 back-end를 푸는 계열에 놓인다 (2:54 부근).
- odometry는 시작 지점부터 현재까지의 상대 pose라고 정의한다. 지형도도 하나 그려 준다. 쓰는 센서에 따라 이름이 VO·LIO 등으로 갈린다는 그림이다.
- FAST-LIO 특징을 solid-state LiDAR 사용, IMU에 무게를 둔 tightly-coupled 융합, 새 Kalman gain 계산의 셋으로 압축한다.
- smoothness를 "한 점과 주변 점들 사이 거리의 일종"으로 풀어 feature 분류(높으면 edge, 낮으면 planar)를 설명한다.

## 방법론 및 아키텍처 (Methodology and Architecture)

파이프라인은 전처리, state 추정, map 갱신의 세 토막으로 나뉜다. 먼저 20ms 단위로 스캔을 누적하고 smoothness를 기준으로 feature를 분류한다. 그다음 IMU가 들어올 때마다 forward propagation으로 스캔이 끝나는 시각의 state를 예측하고 backward propagation으로 각 점을 스캔 종료 프레임에 정렬한다. residual은 현재 point cloud의 feature와 map 속 feature 위치 차이다. iterated Kalman filter가 수렴할 때까지 update를 반복한 뒤 결과를 전역 프레임 map에 붙인다. 기존 Kalman gain은 measurement 차원의 역행렬이 필요해 점이 많은 LiDAR에서 부담이 큰데 새 공식은 그 역행렬을 state 차원으로 바꾼다. 여기서 방법 설명이 끝난다.

## 결과 (Results)

개선된 Kalman gain 공식은 조건에 따라 1,000배 이상 빨라진다(10:11). 영상이 순서대로 짚는 실험 네 가지 가운데 첫째다. 드론 실험에서는 32m를 움직이는 동안 오차가 0.08m에 그쳤다. drift로 따지면 0.3% 미만이다(10:30). 각속도 150~200deg/s로 실내에서 고속 회전할 때도 LOAM보다 강건했다(10:45). 실외 140m 이동에서는 0.07m 차이로 0.05% 미만을 기록했다. LINS보다 좋은 mapping을 평균 7.3ms에 낸다(11:21~11:52).

## 관련 페이지 (Related Pages)

- [[physical-ai/xu-2020-fast-lio-a-fast-robust-lidar-inertial]] — 대상 논문. 수치 인용은 이쪽에서 재확인
- [[physical-ai/taeyoung-2022-fast-lio-paper-review]] — 수식 유도까지 필요할 때 이어서 읽는 리뷰
- [[physical-ai/irasc-2024-faster-lio-lightweight-tightly-coupled]] — 후속 Faster-LIO 발표 영상
