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

## 요약

FAST-LIO 논문을 12분 34초 분량으로 훑는 한국어 세미나 발표 영상이다. AIRLab 채널이 2024년 1월 12일에 올린 연구실 논문 세미나 녹화이며, 발표자는 배경을 먼저 세운 뒤 논문의 서술 순서를 그대로 따라간다.

발표의 초점은 알고리즘의 깊이가 아니라 전체 지형이다. SLAM 구도에서 LiDAR-inertial odometry가 어디에 놓이는지 먼저 정리한 뒤, 그 위에서 FAST-LIO의 전처리, propagation, iterated Kalman filter, 새 Kalman gain 공식, 실험 결과를 차례로 다룬다. 따라서 논문이나 수식 리뷰에 들어가기 전에 좌표를 잡는 입문 자료로 알맞다.

이 페이지는 논문 자체가 아니라 발표가 실제로 다룬 내용과 강조점을 정리한다. 알고리즘 유도와 정량 결과의 1차 출처는 원 논문 페이지([[physical-ai/xu-2020-fast-lio-a-fast-robust-lidar-inertial]])이므로, 수식과 수치를 확인할 때는 원 논문 페이지를 함께 본다.

## 발표 구성

발표는 12분 안에 논문 한 편을 통과하기 위해 각 주제에 1분 안팎을 배분한다. 시각별 진행 순서는 다음과 같다.

| 시각 | 다룬 내용 |
|---|---|
| 00:13 | 발표 순서 안내. 배경을 먼저 다루고 이후 논문의 서술 순서를 따라간다 |
| 00:19 | SLAM의 정의와 front-end, back-end 구분 |
| 01:30 | odometry의 정의와 센서별 분류 |
| 01:56 | FAST-LIO의 특징 세 가지 |
| 02:31 | 관련 연구 LOAM과 LeGO-LOAM |
| 03:01 | 파이프라인 개요와 전처리 |
| 04:16 | IMU 기반 상태 갱신 모델 |
| 04:47 | forward propagation |
| 05:25 | backward propagation |
| 06:43 | residual 계산 |
| 08:00 | iterated Kalman filter와 새 Kalman gain |
| 08:46 | 알고리즘 전체 흐름과 map 갱신 |
| 10:06 | 실험 네 가지 |
| 11:56 | 결론 |

## 배경

### SLAM의 두 단계

SLAM은 로봇이 움직이면서 자기 위치를 추정하고 동시에 주변에 무엇이 있는지 map을 작성하는 과정이다. 발표는 이 과정을 두 단계로 나누는 그림에서 출발한다.

- front-end는 센서로 들어온 데이터가 무엇인지 판단하는 단계다. feature를 추출하고 feature 사이의 연관성을 판단한다. feature는 여러 스캔에서 반복해 나타나는 두드러진 기하 요소를 가리킨다.
- back-end는 그 대상들이 어디에 있고 로봇 자신의 상태가 어떻게 되는지 추정하는 단계다.

발표는 back-end를 푸는 방법을 map estimation 계열과 Kalman filter 계열로 나누고, FAST-LIO를 Kalman filter로 푸는 계열에 놓는다. 이 배치가 발표 전체의 출발점이다.

### odometry와 센서별 분류

LiDAR로 SLAM과 비슷한 문제를 푸는 분야가 LiDAR odometry and mapping이다. 발표는 이 분야가 localization 대신 odometry를 쓴다는 점을 짚는다. localization은 이미 주어진 지도 안에서 로봇이 자기 위치를 찾는 문제를 말한다.

odometry는 시작 지점부터 현재 지점까지의 상대 pose를 뜻한다. 어떤 센서로 이 값을 얻느냐에 따라 이름이 달라지며, 발표는 센서별 명칭을 정리한 그림을 한 장 보여 준다. FAST-LIO는 이름 그대로 LiDAR와 IMU를 함께 써서 LiDAR-inertial odometry를 채택한다.

## 핵심 개념

### FAST-LIO의 세 가지 특징

발표는 FAST-LIO의 특징을 세 가지로 압축한다.

| 특징 | 발표의 설명 |
|---|---|
| solid-state LiDAR 사용 | 기존 LiDAR 연구가 회전하는 3D LiDAR를 쓴 것과 달리 solid-state LiDAR를 쓴다. solid-state LiDAR는 회전 기구 없이 주사하는 신형 LiDAR를 말한다 |
| tightly-coupled 융합 | Kalman filter로 상태를 추정할 때 IMU 값에 더 비중을 두어 LiDAR와 IMU를 tightly-coupled 방식으로 융합한다 |
| 새 Kalman gain 계산 | Kalman gain을 기존과 다른 방식으로 구성해 계산한다 |

세 가지 중 마지막 항목이 발표가 가장 시간을 들여 설명하는 대목이고, 실험 절의 첫 번째 결과도 이 항목을 검증한다.

### LOAM과 LeGO-LOAM

관련 연구로는 LOAM과 같은 계열의 LeGO-LOAM을 든다. 발표가 짚는 차이는 LeGO-LOAM의 ground optimization이다. 센서가 지면과 가까이 있을 때 지면에 해당하는 point cloud를 먼저 제거하고, 이어 segmentation을 수행해 각 segment에서 feature를 추출하고 대응시킨다. point cloud는 LiDAR가 반환한 3D point의 집합이다. 이 순서를 거치면 대응 계산이 더 효율적이 된다는 설명이다.

## 방법

발표는 FAST-LIO의 파이프라인을 세 단계로 나눈 개요 그림에서 시작해, 각 단계를 순서대로 풀어 간다.

| 단계 | 입력 | 하는 일 |
|---|---|---|
| 전처리 | LiDAR point | 스캔 단위로 point를 모으고 feature를 추출한다 |
| 상태 추정 | 전처리 결과와 IMU 입력 | propagation과 iterated Kalman filter로 상태를 추정한다 |
| map 작성 | 상태 추정 결과 | 추정된 상태로 point cloud를 전역 프레임에 옮겨 map을 갱신한다 |

### 전처리와 feature 분류

전처리는 LiDAR가 반환한 point를 스캔 단위로 모으는 데서 시작한다. 발표는 스캔 길이를 보통 20ms로 잡는다고 말한다. 즉 1초에 50개의 스캔이 만들어지고, 뒤따르는 상태 추정도 그 주기로 수행된다.

point가 다 모이면 각 point마다 feature를 추출한다. 분류 기준은 smoothness다. smoothness 값이 높으면 edge feature로, 낮으면 planar feature로 판정한다. 발표는 smoothness를 한 point와 그 주변 point들 사이의 일종의 거리를 계산한 값이라고 풀이한다. 따라서 주변이 평평한 곳에서는 값이 작게 나오고 모서리에서는 크게 나온다.

### forward propagation과 상태 예측

상태 갱신은 IMU 데이터를 쓰는 모델로 표현된다. 시각 i+1의 상태는 직전 상태에 IMU 값을 반영해 얻는다는 관계이며, 발표는 두 시각 사이의 움직임을 그림으로 모델링해 보여 준다.

forward propagation은 이 갱신을 IMU 값이 들어올 때마다 반복하는 과정이다. 한 스캔 구간 안에 IMU 입력이 여러 번 들어오고 그때마다 갱신이 한 번씩 수행된다. 이렇게 스캔이 끝나기 직전까지 위치 추정을 이어가면 스캔 종료 시각 t_k의 상태를 얻는다.

### backward propagation과 스캔 정렬

backward propagation은 LiDAR point들을 하나의 프레임으로 정렬하기 위한 과정이다. LiDAR point는 한 번에 모두 들어오지 않고 시간에 따라 순차적으로 들어온다. 그 사이에 로봇이 움직이면 point마다 기준 프레임이 조금씩 달라지므로, 시각 t_k의 point cloud를 그대로 모으면 형상이 어긋난다.

해결 방법은 각 point가 측정된 시각의 pose를 되짚어 계산하는 것이다. pose를 알면 시각 t_j에 들어온 point의 좌표를 t_k 기준 LiDAR 프레임 좌표로 변환할 수 있고, 모든 point cloud가 하나의 프레임으로 정렬된다. 발표는 결론에서 이 처리를 LiDAR의 모션을 보정하는 기술로 다시 요약한다.

### residual과 iterated Kalman filter

상태를 갱신하기 전에 residual을 계산한다. residual은 예측한 상태가 얼마나 어긋나 있는지를 재는 값으로, 지금 얻은 point cloud가 기존 map과 얼마나 잘 정렬되는지를 나타낸다. 구체적으로는 현재 point cloud의 feature 위치와 map에 있는 feature 위치의 차이이며, 이 차이가 작을수록 좋다.

풀고자 하는 문제는 참값 상태와 예측 상태의 오차, 즉 residual을 최소로 만드는 추정값을 찾는 것이다. FAST-LIO는 이 문제를 iterated Kalman filter로 푼다. update 식을 반복 적용하면서 값이 수렴할 때까지 iteration을 이어가고, 수렴했다고 판단되면 그 값을 최종 추정으로 삼는다.

한 번의 iteration은 다음 순서로 진행된다.

- IMU 값으로 forward propagation을 수행해 상태를 예측한다
- backward propagation으로 point cloud를 하나의 프레임에 정렬한다
- 계산에 필요한 Jacobian을 구한다
- residual을 계산한다
- Kalman gain을 계산한다
- 다음 iteration에 쓰일 상태를 얻는다

### 새 Kalman gain 공식

발표가 가장 비중을 두는 대목은 Kalman gain 계산 방식의 교체다. 기존 Kalman filter에서 Kalman gain을 구하려면 measurement 차원 크기의 행렬을 역행렬로 계산해야 한다. LiDAR는 한 스캔에 들어오는 point가 매우 많으므로 이 역행렬 계산의 부하가 크다.

FAST-LIO는 같은 gain을 상태 차원 크기의 역행렬로 계산하는 형태로 다시 구성한다. 상태 차원은 point 수와 무관하게 일정하므로 point가 늘어나도 계산량이 따라 늘지 않는다. 발표는 이것을 논문이 주장하는 계산상 이점의 근거로 제시한다.

### map 갱신

iterated Kalman filter가 수렴하면 그 결과를 최종 상태 추정으로 확정하고 map을 갱신한다. 갱신 절차는 backward propagation의 좌표 변환과 비슷하다. LiDAR 프레임에 있는 point cloud를 전역 프레임으로 변환한 뒤 기존 map에 이어 붙이면 map 갱신이 끝난다.

## 결과

발표는 논문이 실험을 네 가지 제시한다고 예고한 뒤 다음 순서로 결과를 짚는다.

| 실험 | 조건 | 발표가 제시한 수치 |
|---|---|---|
| Kalman gain 효율 | 기존 공식과 새 공식의 계산 비교 | 작게는 100배 수준의 이득 |
| 드론 탑재 비행 | 32m 이동 | 오차 0.08m, drift 0.3% 미만 |
| 실내 고속 회전 | 각속도가 150deg/s에서 200deg/s까지 변동 | LOAM보다 강건한 mapping 결과 |
| 실외 이동 | 140m 이동 | 오차 0.07m, drift 0.05% 미만 |
| LINS 비교 | 같은 구간의 mapping 결과 대조 | LINS보다 나은 결과, 평균 계산 시간 7.3ms |

첫 번째 실험은 앞 절의 Kalman gain 교체가 실제 계산 이득으로 이어지는지를 확인한다. 발표는 두 공식의 계산 결과를 나란히 놓고 작게는 100배에서 시작하는 배수 이득이 나온다고 말한다. 상한 값은 자동 자막이 "거의 1분까지"로 잘못 옮겨 원래 수치를 확인할 수 없다.

드론 실험과 실외 실험은 drift 비율로 정확도를 보인다. drift는 이동한 거리에 대해 오차가 얼마나 쌓였는지를 비율로 나타낸 값이다. 32m를 이동해 0.08m가 어긋나면 0.3% 미만이고, 140m를 이동해 0.07m가 어긋나면 0.05% 미만이다. 즉 이동 거리가 네 배 이상 길어져도 절대 오차는 커지지 않았다.

실내 실험은 정확도가 아니라 강건성을 보이는 실험이다. 발표는 화면 왼쪽 세 개의 결과를 함께 보라고 안내하며, 왼쪽 위가 기존 방식인 LOAM의 결과라고 설명한다. 오른쪽에는 IMU가 측정한 각속도가 표시되는데, 값이 150deg/s에서 200deg/s까지 흔들리는 조건에서도 FAST-LIO가 더 강건한 결과를 만들었다는 것이 발표의 해석이다.

마지막 비교 대상은 LINS다. 화면 아래가 LINS의 결과이고 위가 FAST-LIO의 결과이며, FAST-LIO 쪽이 더 나은 mapping 결과를 보인다. 여기에 더해 평균 계산 시간이 7.3ms라는 점을 함께 제시한다. 따라서 정확도와 계산 시간을 동시에 개선했다는 것이 발표가 전하는 논문의 주장이다.

발표의 결론은 두 가지다. FAST-LIO는 forward propagation과 backward propagation으로 상태를 예측하고 LiDAR의 모션을 보정하며, Kalman gain을 새로 계산해 계산상 이점을 얻는다. 따라서 계산 효율과 강건성을 함께 갖춘 LiDAR-inertial odometry 프레임워크라고 결론짓는다.

## 한계

발표는 12분 분량이라 수식 유도를 다루지 않는다. ⊞와 ⊟ 연산이나 Jacobian 전개는 슬라이드에 나오지만 화면을 짚고 넘어가는 수준에 그친다. 수식 단위의 이해가 필요하면 같은 논문을 다룬 한국어 리뷰 글([[physical-ai/taeyoung-2022-fast-lio-paper-review]])을 이어서 읽는 편이 낫다.

수집 원본이 한국어 자동 자막이라는 점도 제약이다. 고유명사가 자주 오인식되어 FAST-LIO는 "스트리오"로, LINS는 "린스"나 "리즈"로 적혀 있다. 첫 번째 실험의 상한 배수처럼 숫자가 훼손된 구간도 있다. 따라서 이 페이지의 수치를 인용할 때는 원 논문 페이지에서 다시 확인해야 한다.

발표가 다루지 않는 범위도 분명하다. map 자료구조나 FAST-LIO2의 direct 방식은 이 발표의 대상이 아니며, 실험도 논문이 제시한 결과 화면을 순서대로 읽는 수준에 머문다. 실험 설계나 baseline 선정에 대한 발표자의 별도 논평은 없다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| front-end / back-end | SLAM 파이프라인에서 센서 데이터를 해석하고 feature를 대응시키는 앞단과, 대상의 위치와 로봇의 상태를 추정하는 뒷단 |
| odometry | 시작 지점부터 현재 지점까지의 상대 pose. 쓰는 센서에 따라 LiDAR-inertial odometry 등으로 이름이 나뉜다 |
| smoothness | 한 point와 주변 point들 사이의 거리로 계산하는 값. 높으면 edge, 낮으면 planar feature로 분류하는 기준 |
| forward propagation | IMU 값이 들어올 때마다 상태를 갱신해 스캔 종료 시각의 상태를 예측하는 과정 |
| backward propagation | 각 LiDAR point를 측정 시각의 pose로 되짚어 스캔 종료 프레임에 정렬하는 과정 |
| Kalman gain | iterated Kalman filter의 update 식에 들어가는 계수. 기존 공식은 measurement 차원의 역행렬이 필요하지만 FAST-LIO는 상태 차원의 역행렬로 계산한다 |

## 관련 페이지

- [[physical-ai/xu-2020-fast-lio-a-fast-robust-lidar-inertial]]: 발표가 다루는 원 논문. 알고리즘 유도와 정량 결과의 1차 출처이므로 수치를 인용하기 전에 먼저 확인한다.
- [[physical-ai/taeyoung-2022-fast-lio-paper-review]]: 같은 논문의 한국어 리뷰 글. 이 발표가 건너뛴 수식 유도를 이어서 볼 때 읽는다.
- [[physical-ai/hku-mars-fast-lio]]: FAST-LIO 공식 구현 저장소. 발표에서 본 파이프라인을 코드와 실행 환경으로 확인할 때 참고한다.
- [[physical-ai/irasc-2024-faster-lio-lightweight-tightly-coupled]]: 같은 형식의 후속 발표 영상. map 자료구조를 iVox로 바꾼 Faster-LIO를 다룬다.
- [[overviews/physical-ai-overview]]: physical-ai 카테고리의 분류 뼈대와 학습 경로 허브.
