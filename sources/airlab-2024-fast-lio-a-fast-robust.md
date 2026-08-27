---
title: "누구보다 빠르게 남들과는 다르게💨💨 FAST-LIO: A Fast, Robust LIO Package by Kalman Filter(RA-L 2021)"
type: video
year: 2024
category: physical-ai
raw_path: raw/videos/airlab-2024-fast-lio-a-fast-robust.md
raw_filename: "airlab-2024-fast-lio-a-fast-robust.md"
source_collection: external
channel: "AIRLab"
url: "https://youtu.be/k2rhGdIpHqw"
duration: "12m34s"
tags: [physical-ai, slam]
---

## 한 줄 요약 (One-line Summary)

FAST-LIO 논문을 12분에 훑는 한국어 발표 영상이다. SLAM의 front-end/back-end 구도에서 출발해 LIO가 어디 놓이는지 설명한 뒤 논문 순서대로 전처리·propagation·iterated Kalman filter·새 Kalman gain·실험 4종을 짚는다.

## 1. 자료 정보 (Document Information)

- 채널: AIRLab (연구실 논문 세미나 발표 녹화)
- 업로드: 2024-01-12, 12분 34초
- 대상 논문: [[physical-ai/xu-2020-fast-lio-a-fast-robust-lidar-inertial]] (발표 제목이 RA-L 2021 게재본 기준)
- 자막: 한국어 자동 자막 (고유명사 오인식 있음 — "스트리오"=FAST-LIO, "린스"=LINS 등)

## 2. 주요 기여 (Key Contributions)

SLAM을 front-end와 back-end 두 단계로 나누는 구도를 먼저 세운다. front-end는 무엇을 보고 있는지 판단하고 back-end는 무엇이 어디 있고 내 state가 무엇인지 추정한다. FAST-LIO는 그중 Kalman filter로 back-end를 푸는 계열에 놓인다 (2:54 부근, 사용자가 지정한 t=174s 시점). 입문자에게는 이 대목이 쓸모 있다.

odometry를 시작 지점부터 현재까지의 상대 pose로 정의한다. 어떤 센서를 쓰느냐에 따라 VO·LIO 등으로 이름이 갈린다. 그 구분까지 정리한다. FAST-LIO의 특징으로는 solid-state LiDAR 사용, IMU 비중이 큰 tightly-coupled 융합, 새 Kalman gain 계산을 꼽는다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

전처리는 20ms 단위로 스캔을 만드는 데서 시작한다. smoothness를 계산해 값이 높으면 edge, 낮으면 planar feature로 갈라놓는다. smoothness가 무엇인지는 한 점과 주변 점들 사이 거리의 일종이라고 덧붙인다.

state 추정에서는 IMU가 들어올 때마다 forward propagation으로 스캔 종료 시각의 state를 예측하고 backward propagation으로 각 LiDAR point를 스캔 종료 프레임에 정렬한다. residual은 현재 point cloud의 feature 위치와 map 속 feature 위치의 차이로 계산한다.

iterated Kalman filter는 수렴할 때까지 update를 반복하는 구조다. 수렴 판정이 나면 그 값을 최종 추정으로 삼고 map을 전역 프레임에 갱신한다. 기존 Kalman gain은 measurement 차원의 역행렬이 필요해 LiDAR처럼 점이 많은 센서에서 부담이 크다. 새 공식은 그 차원을 state 차원으로 바꿔 계산 이점을 얻는다고 설명한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

Kalman gain 공식만 놓고 비교하면 개선 공식이 수 배에서 1,000배 이상 빨랐다 (10:11 부근). 드론에 실은 실험에서는 32m를 이동해 오차 0.08m, drift 0.3% 미만이 나왔다 (10:30).

실내 고속 회전 실험은 각속도가 150~200deg/s까지 흔들리는 조건이었는데도 LOAM 대비 강건한 mapping을 유지했다 (10:45). 실외 실험에서는 140m 이동에 0.07m 차이(drift 0.05% 미만)로 LINS보다 좋은 결과를 냈고 평균 계산 시간은 7.3ms였다 (11:21~11:52).

## 5. 한계와 향후 과제 (Limitations and Future Work)

12분 발표라 수식 유도(⊞/⊟ 연산, Jacobian 전개)는 슬라이드에 띄우되 자세히 다루지 않는다. 유도가 필요하면 [[physical-ai/taeyoung-2022-fast-lio-paper-review]]가 낫다. 수집 원본이 자동 자막이어서 세부 표현은 신뢰도가 낮다. 수치·주장을 인용할 때는 논문 페이지에서 재확인한다.

## 6. 관련 연구 (Related Work)

발표 안에서 LOAM과 LeGO-LOAM을 비교 소개한다. 둘의 차이는 이렇게 짚는다. LeGO-LOAM은 지면 point cloud를 지우고 segmentation을 거친 뒤 feature를 대응시켜 효율을 끌어올린 계열이다. 비교 대상으로는 LINS가, 후속 자료로는 [[physical-ai/irasc-2024-faster-lio-lightweight-tightly-coupled]] (Faster-LIO 발표)가 있다.

## 7. 용어집 (Glossary)

- front-end / back-end: SLAM 파이프라인에서 센서 데이터 해석·feature 대응을 맡는 앞단과 state·map 추정을 맡는 뒷단
- smoothness: 한 점 주변의 국소 기하가 얼마나 평평한지 재는 값. LOAM 계열 feature 분류 기준
