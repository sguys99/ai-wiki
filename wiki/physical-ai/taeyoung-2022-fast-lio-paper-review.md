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
    curated: true
  - id: fig03
    kind: figure
    file: assets/taeyoung-2022-fast-lio-paper-review/fig03.png
    raw: raw/articles/taeyoung-2022-fast-lio-paper-review-figures/fig03.png
    caption: "state vector 정의와 kinematic model 수식 (논문 식 3 재게재)"
    strategy: fetched
    curated: true
  - id: fig04
    kind: figure
    file: assets/taeyoung-2022-fast-lio-paper-review/fig04.png
    raw: raw/articles/taeyoung-2022-fast-lio-paper-review-figures/fig04.png
    caption: "forward propagation과 backward propagation의 시간축 도식 (논문 Figure 2b 재게재)"
    strategy: fetched
    curated: true
  - id: fig05
    kind: figure
    file: assets/taeyoung-2022-fast-lio-paper-review/fig05.png
    raw: raw/articles/taeyoung-2022-fast-lio-paper-review-figures/fig05.png
    caption: "backward propagation 수식 (논문 식 9 재게재)"
    strategy: fetched
    curated: true
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
    curated: true
---

## 요약

FAST-LIO 논문을 한국어로 풀어 쓴 리뷰다. Taeyoung's Blog에 2022년 8월 9일 올라온 글로, 논문이 수식으로 압축해 놓은 forward propagation과 backward propagation, 그리고 iterated error state Kalman filter의 update 절차를 단계별로 해설한다. 각 단계가 논문 Section III-C의 어느 항에 해당하는지 표시하며 따라가므로 논문과 나란히 놓고 읽기 좋다.

이 페이지는 리뷰가 실제로 다룬 범위를 정리한다. 즉 글쓴이가 고른 설명 순서, 수식을 다루는 방식, 그리고 무엇을 main contribution으로 짚었는지가 중심이다. 알고리즘의 세부와 정량 결과는 [[physical-ai/xu-2020-fast-lio-a-fast-robust-lidar-inertial]]가 다루므로, 이 리뷰를 먼저 읽고 원 논문 페이지로 넘어가는 순서를 권한다.

FAST-LIO는 LiDAR와 IMU를 tightly-coupled 방식으로 융합하는 odometry 패키지다. odometry는 센서로 이동량을 누적해 로봇의 상대 위치를 추정하는 방법을 말한다. 리뷰는 본론에 앞서 논문의 특징을 다섯 가지로 요약한다.

| 특징 | 내용 |
|---|---|
| 센서 융합 | LiDAR 데이터와 IMU 데이터를 tightly-coupled 방식으로 결합 |
| 입력 표현 | LiDAR 데이터에서 planar feature와 edge feature를 추출해 사용 |
| 최적화 | iterated error state Kalman filter로 state를 추정 |
| 계산 구조 | Kalman gain 계산 공식을 새로 제안. measurement dimension에서 state dimension으로 전환 |
| 실험 플랫폼 | Livox LiDAR를 주로 사용 |

## 배경

리뷰가 논문 introduction에서 가장 인상 깊게 본 대목은 solid-state LiDAR 소개다. solid-state LiDAR는 회전 기구 없이 프리즘이나 MEMS로 주사하는 신형 LiDAR로, Livox LiDAR가 그중 한 종류다. 크기와 무게가 줄어든 덕분에 LiDAR를 산업용 드론에 장착해 mapping을 수행할 수 있게 됐다.

반면 solid-state LiDAR는 LiDAR SLAM 쪽에 새로운 문제를 함께 가져왔다. 리뷰가 드는 문제는 세 가지다.

- 기존 LOAM이 쓰던 feature 추출 방법이 그대로 적용되지 않는다. feature는 point cloud에서 정합에 쓰려고 골라낸 특징적인 점을 말한다.
- FoV가 좁다.
- LiDAR sample point가 무작위로 나온다.

즉 회전형 LiDAR를 전제로 만들어진 기존 방법을 그대로 옮겨 올 수 없다는 것이 출발점이다. 리뷰는 두 방식의 차이를 이해하려면 Livox의 소개 영상을 함께 보라고 안내한다.

FAST-LIO가 주장하는 contribution은 네 가지이고, 각각 앞의 문제 또는 처리 부담에 대응한다.

| contribution | 대응하는 문제 |
|---|---|
| LiDAR feature point와 IMU 데이터를 tightly-coupled로 결합하고 iterated Kalman filter로 최적화 | 좁은 FoV와 적은 feature 수로 인한 정합 불안정 |
| IMU 데이터를 이용한 forward propagation과 backward propagation으로 motion distortion 보정 | 스캔이 진행되는 동안 센서가 움직여 생기는 왜곡 |
| Kalman gain 계산 공식을 새로 제안 | 많은 양의 LiDAR 데이터를 빠르게 처리해야 하는 부담 |
| UAV에 직접 탑재해 실내와 실외에서 실험 | 실제 비행 플랫폼에서의 동작 검증 |

리뷰의 집필 동기도 서두에 그대로 적혀 있다. 글쓴이는 논문의 수식 분량에 압도당했다고 밝히고 이해한 만큼 차근차근 설명하겠다고 예고한다. 따라서 이 글은 논문 전체 요약이라기보다 수식 진입 장벽을 낮추는 해설로 읽는 편이 맞다.

## 핵심 개념

### notation

리뷰는 논문의 notation이 많고 헷갈린다는 점을 먼저 짚는다. 시간과 좌표계, 그리고 state의 처리 단계별 표기를 구분하는 것이 첫 관문이다. 리뷰가 재게재한 논문 Table I의 주요 기호는 다음과 같다.

| 기호 | 뜻 |
|---|---|
| `t_k` | k번째 LiDAR 스캔이 끝나는 시각 |
| `τ_i` | 한 LiDAR 스캔 안의 i번째 IMU 샘플 시각 |
| `ρ_j` | 한 LiDAR 스캔 안의 j번째 feature point 샘플 시각 |
| `I_i`, `I_j`, `I_k` | 각각 `τ_i`, `ρ_j`, `t_k` 시점의 IMU body frame |
| `L_j`, `L_k` | 각각 `ρ_j`, `t_k` 시점의 LiDAR body frame |
| `x`, `x̂`, `x̄` | x의 참값, propagation 결과, update 결과 |
| `x̃` | 참값과 추정값의 차이, 즉 error state |
| `x̂^κ` | iterated Kalman filter의 κ번째 update 결과 |
| `x̌_j` | backward propagation에서 `x_k`를 기준으로 잡은 `x_j`의 추정값 |

리뷰가 요약한 규칙은 간단하다. `t`, `τ`, `ρ`는 모두 시각을 가리키는 기호이고, `I`는 IMU frame을, `L`은 LiDAR frame을 가리킨다. `x`는 state vector이며 위에 붙는 기호로 참값과 예측값과 update 값을 구분한다.

### state vector

FAST-LIO는 IMU pose를 기준으로 odometry를 계산한다. global frame은 처음 들어온 IMU pose로 잡는다. state vector는 여섯 개 성분으로 구성된다.

| 성분 | 뜻 |
|---|---|
| 자세 `R` | global frame 기준 IMU의 회전 |
| 위치 `p` | global frame 기준 IMU의 위치 |
| 속도 `v` | global frame 기준 IMU의 속도 |
| `b_ω` | gyroscope bias |
| `b_a` | accelerometer bias |
| 중력 `g` | global frame에서 본 중력 벡터 |

![[assets/taeyoung-2022-fast-lio-paper-review/fig03.png]]
*Figure 1: state vector 정의와 kinematic model 수식. 입력 u는 IMU가 재는 각속도와 가속도이고, w는 noise 파라미터다 (Taeyoung Kim 2022, 논문 식 3 재게재).*

리뷰는 함수 f가 state vector를 시간에 대해 미분하는 함수라는 정도로 역할만 짚고 넘어간다. 즉 각 항의 유도가 아니라 무엇이 추정 대상이고 무엇이 입력인지를 구분하는 데 목적이 있다.

### iterated error state Kalman filter

FAST-LIO의 최적화는 filter 기반이고, 여기서 쓰이는 filter가 iterated error state Kalman filter다. 이 filter는 state 자체가 아니라 참값과 추정값의 차이인 error state를 추정 대상으로 삼고, 그 값이 정해진 threshold 아래로 내려갈 때까지 update를 반복한다.

리뷰는 이 filter의 개념 설명을 글쓴이의 별도 포스팅으로 넘기고 본문에서는 생략한다. 따라서 filter 배경 지식이 없는 독자는 그 포스팅을 먼저 읽어야 이 글의 후반부를 따라갈 수 있다.

## 방법

리뷰는 논문 Figure 2a의 전체 구조를 먼저 보여준 뒤 각 블록을 순서대로 설명한다.

![[assets/taeyoung-2022-fast-lio-paper-review/fig01.png]]
*Figure 2: FAST-LIO 전체 파이프라인. LiDAR 입력과 IMU 입력이 pre-processing과 두 방향의 propagation을 거쳐 state estimation으로 들어가고, 수렴한 결과가 odometry 출력과 map 갱신으로 나간다 (Taeyoung Kim 2022, 논문 Figure 2a 재게재).*

도식에는 각 단계의 동작 속도가 함께 적혀 있다. LiDAR 입력은 100kHz에서 500kHz, IMU 입력은 100Hz에서 250Hz로 들어오는 반면 state estimation과 odometry 출력은 10Hz에서 50Hz다. 즉 센서가 만들어내는 원자료보다 훨씬 낮은 주기로 state를 확정하며, 그 사이의 데이터는 누적과 propagation으로 흡수한다.

전체 흐름은 네 단계로 나뉘고, 리뷰는 각 단계에 논문의 절 번호를 붙여 둔다.

| 단계 | 내용 | 논문 대응 |
|---|---|---|
| LiDAR pre-processing | point를 20ms 단위로 누적하고 planar feature와 edge feature를 추출 | 리뷰에 절 번호 표기 없음 |
| forward propagation과 backward propagation | IMU로 state를 전파하고 motion distortion을 보정 | Section III-C-1, III-C-2 |
| residual computation | 왜곡이 보정된 스캔과 기존 map의 차이를 계산 | Section III-C-3 |
| iterated state update | residual로 state를 갱신하고 수렴할 때까지 반복 | Section III-C-4 |

### 전처리와 feature 추출

point cloud는 LiDAR가 반환한 3D point의 집합이다. solid-state LiDAR는 point cloud가 매우 빠른 속도로 들어오므로, FAST-LIO는 20ms 단위로 point를 누적한 뒤 한 묶음으로 처리한다.

feature 추출은 LOAM 계열의 방법을 그대로 가져온다. planar feature는 LOAM의 방법을 쓰고, edge feature는 LOAM-Livox의 방법을 쓴다.

추출된 feature point의 기준 시각은 LiDAR 스캔의 끝으로 설정한다. 리뷰는 FAST-LIO가 LiDAR 스캔 데이터와 IMU 데이터를 굳이 시각 정렬하지 않는다는 점도 짚는다. 한 스캔이 진행되는 동안 들어온 IMU 데이터만 쓰기 때문에 두 센서를 전역으로 맞출 필요가 없다.

### motion distortion과 두 방향의 propagation

LiDAR 데이터를 얻는 동안에도 센서가 움직이므로, 한 스캔에 담긴 point들은 서로 다른 자세에서 측정된 값이다. 따라서 모든 point를 하나의 기준 state로 옮기는 왜곡 보정이 필요하다.

기존 LiDAR odometry는 이 보정을 등속 가정으로 처리한다. 반면 LiDAR-inertial odometry는 IMU가 주는 각속도와 가속도로 state vector가 얼마나 움직였는지 직접 계산할 수 있다. 이 차이가 LIO 계열이 왜곡 보정에서 유리한 지점이고, FAST-LIO의 forward propagation과 backward propagation이 그 계산을 맡는다.

![[assets/taeyoung-2022-fast-lio-paper-review/fig04.png]]
*Figure 3: 한 LiDAR 스캔 구간의 시간축. 위쪽 화살표가 IMU 샘플을 따라가는 forward propagation이고, 아래쪽 화살표가 feature point를 거슬러 올라가는 backward propagation이다 (Taeyoung Kim 2022, 논문 Figure 2b 재게재).*

두 propagation의 역할은 다음과 같이 나뉜다.

| 구분 | 하는 일 | 결과 |
|---|---|---|
| forward propagation | IMU 데이터로 state vector와 covariance matrix를 앞으로 전파 | 스캔이 끝나는 시각의 state 예측값 |
| backward propagation | 스캔 종료 시점 state를 기준으로 각 point 시각의 상대 pose를 계산 | 모든 point를 스캔 종료 프레임으로 투영 |

forward propagation은 IMU의 noise를 0으로 가정한 채 state를 전파한다. covariance matrix를 함께 전파할 때는 error state dynamic model로 만든 두 행렬을 쓴다. 리뷰는 이 두 행렬이 error state dynamic model에서 나온다는 사실만 짚고 유도는 생략한다.

backward propagation은 forward propagation이 구한 스캔 종료 시각의 state를 출발점으로 삼는다. 각 feature point의 sampling 시각에서의 state vector를 뒤로 거슬러 계산한 뒤, 스캔 종료 시점 state와의 상대 pose로 전체 point cloud를 하나의 프레임에 투영한다.

![[assets/taeyoung-2022-fast-lio-paper-review/fig05.png]]
*Figure 4: backward propagation 수식. 위치와 속도와 자세를 각각 한 단계씩 거꾸로 적분하며 스캔 종료 프레임 기준의 상대값을 얻는다 (Taeyoung Kim 2022, 논문 식 9 재게재).*

여기서 FAST-LIO는 extrinsic을 이미 알고 있다고 가정한다. extrinsic은 LiDAR와 IMU 사이의 상대 자세와 위치 변환을 말한다. 즉 두 센서의 장착 관계를 함께 추정하는 문제는 이 논문의 범위 밖이다.

### residual computation

residual은 scan-to-map matching으로 계산한다. 현재 스캔은 앞의 두 propagation으로 왜곡이 보정된 point cloud를 쓰고, map은 global frame 기준으로 계속 누적해 온 point cloud를 쓴다. 즉 직전 스캔이 아니라 누적된 map과 맞춰 오차를 구하는 방식이다.

correspondence는 feature 종류를 지켜 찾는다. edge feature는 edge끼리, plane feature는 plane끼리 Kd-tree 구조에서 가까운 것을 짝짓는다.

### iterated state update

리뷰는 iterated state update가 꽤 복잡하다고 전제한 뒤, 각 항의 유도를 따라가는 대신 physical meaning만 짚겠다고 밝힌다. 그리고 전체가 MAP 문제를 푸는 과정이라는 관점을 제시한다. MAP는 maximum a-posteriori의 약어로, 사전 정보와 측정값을 함께 고려해 가장 그럴듯한 state를 찾는 문제다. 선형화 과정에서 여러 Jacobian matrix가 등장하는 이유도 여기에 있다.

measurement model은 point cloud의 noise를 고려해 만든다. 리뷰는 이 noise를 LiDAR ranging and beam-directing noise라 부른다. 이 식에 first order approximation을 적용하면 residual을 error state로 미분한 Jacobian matrix H를 얻는다. covariance matrix도 별도의 Jacobian matrix J로 갱신한다.

Kalman gain 계산 공식이 리뷰가 지목한 main contribution이다. 새 공식은 역행렬을 취하는 행렬의 크기를 measurement dimension에서 state dimension으로 바꾼다.

| 구분 | 기존 Kalman gain 공식 | FAST-LIO의 새 공식 |
|---|---|---|
| 역행렬을 취하는 행렬의 차원 | measurement dimension | state dimension |
| 그 차원을 정하는 값 | 한 스캔에 들어온 point cloud의 수 | state vector의 크기 |
| point가 늘어날 때의 계산량 | 함께 증가 | 변하지 않음 |

measurement dimension은 들어온 point cloud의 수를 말한다. 따라서 기존 공식에서는 point가 많아질수록 역행렬 계산량이 크게 늘어난다. 반면 새 공식에서는 차원이 state vector의 크기로 고정되므로 point 수와 무관하게 Kalman gain을 빠르게 구할 수 있다. 앞의 파이프라인 도식이 보여준 대로 LiDAR는 초당 10만 개에서 50만 개의 point를 만들어내므로, 이 차이가 곧 실행 속도를 결정한다.

Kalman gain을 구하면 error state가 수렴할 때까지 state를 갱신한다. 수렴하면 그 시점의 state vector와 covariance matrix가 해당 스캔의 최종 결과가 된다.

### map update와 초기화

map update는 단순하다. 최종 state로 얻은 feature point를 global frame으로 변환해 map에 누적하는 것이 전부다. 별도의 최적화나 loop closure 처리는 이 리뷰의 설명 범위에 없다.

초기화는 몇 초 동안 센서를 정지시켜 수행한다. 이 구간에서 bias와 noise covariance, 그리고 중력 벡터의 초기값을 얻는다. 리뷰는 Livox의 특성도 덧붙인다. 정지 상태를 길게 유지할수록 얻어지는 point cloud의 해상도가 높아지므로, 초기화 구간이 초기값 확보와 데이터 품질 양쪽에 도움이 된다.

### 전체 절차

![[assets/taeyoung-2022-fast-lio-paper-review/fig06.png]]
*Figure 5: state estimation의 전체 절차. 입력부터 반복 update와 수렴 판정, 최종 출력까지가 한 화면에 정리되어 있다 (Taeyoung Kim 2022, 논문 Algorithm 1 재게재).*

논문 Algorithm 1은 앞의 설명을 한 묶음으로 정리한다. 입력은 직전 스캔의 최종 state와 covariance, 현재 스캔의 IMU 입력, 그리고 현재 스캔의 LiDAR feature point다.

처리 순서는 세 부분이다. 먼저 forward propagation으로 state와 covariance를 예측하고, 다음으로 backward propagation으로 point를 보정한다. 마지막으로 수렴 조건을 만족할 때까지 covariance 갱신, residual과 Jacobian 계산, 그리고 Kalman gain 계산을 반복한다. 출력은 현재 스캔의 최종 state와 covariance다.

## 결과

리뷰의 실험 절은 짧다. 글쓴이는 정량 비교를 옮기는 대신 FAST-LIO 공식 영상을 보라고 안내하고, 드론에 LiDAR를 달아 odometry를 구하는 시연에 대한 감상으로 글을 맺는다.

![[assets/taeyoung-2022-fast-lio-paper-review/fig07.png]]
*Figure 6: UAV 비행 실험. 초록색 곡선이 추정된 비행 경로이고 배경은 같은 구간에서 만들어진 map이다 (Taeyoung Kim 2022, 논문 Figure 3 재게재).*

리뷰가 함께 실은 논문 Figure 3의 캡션에 실험 조건이 남아 있다.

| 조건 | 값 |
|---|---|
| 비행 경로 | 반지름 1.8m의 원 |
| 비행 고도 | 1.4m |
| 반복 횟수 | 4회 |
| 1회 주기 | 6초에서 10초 |
| yaw 명령 | 비행 내내 고정 |
| 종료 처리 | 이륙 지점으로 수동 착륙 |

즉 같은 원 경로를 주기를 바꿔가며 네 번 비행한 뒤 출발점으로 되돌아오는 구성이다. 이륙 지점에 다시 착륙시키는 것은 시작 위치와 끝 위치의 차이로 drift를 재기 위해서다. drift는 odometry 추정값이 시간이 지날수록 참값에서 멀어지는 정도를 말한다.

이 리뷰만으로는 다른 방법과의 비교나 오차 수치를 알 수 없다. 정량 결과는 [[physical-ai/xu-2020-fast-lio-a-fast-robust-lidar-inertial]]의 결과 절에서 확인한다.

## 한계

이 리뷰를 읽을 때 염두에 둘 범위는 네 가지다.

- 실험과 비교 분석을 다루지 않는다. 방법 이해용 해설로 읽어야 하며, 정량 근거는 원 논문 페이지에서 확인해야 한다.
- iterated error state Kalman filter의 개념 설명이 글쓴이의 별도 포스팅으로 위임되어 있다. 그 포스팅은 이 저장소의 수집 범위 밖이므로, filter 배경은 다른 자료로 채워야 한다.
- 수식의 유도를 따라가지 않고 각 항의 physical meaning만 짚는다. 따라서 논문의 수식을 직접 검증하려는 독자에게는 부족하다.
- FAST-LIO 1.0 기준이다. raw point를 그대로 정합하는 direct 방식과 ikd-Tree를 도입한 FAST-LIO2의 변경은 다루지 않는다. 리뷰 자체도 공개 코드가 이미 FAST-LIO2로 갱신됐으므로 1.0 알고리즘을 보려면 commit 기록을 확인해야 한다고 안내한다.

수집 상의 제약도 하나 있다. 원문의 시각 자료 중 도식과 표 7장은 raw에 저장됐지만 수식 단독 이미지 11장은 수집되지 않았다. 본문의 주요 수식은 위 임베드와 산문 설명으로 옮겼고, 나머지는 원문 URL에서 확인해야 한다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| iterated error state Kalman filter | error state를 추정 대상으로 삼고 수렴할 때까지 update를 반복하는 Kalman filter 변형. 리뷰가 FAST-LIO 최적화의 뼈대로 지목한다 |
| forward propagation | IMU 데이터로 state vector와 covariance matrix를 스캔 종료 시각까지 전파하는 과정 |
| backward propagation | 스캔 종료 시점 state를 기준으로 각 point의 상대 pose를 구해 point cloud를 한 프레임으로 투영하는 과정 |
| scan-to-map matching | 새 스캔을 직전 스캔이 아니라 누적된 map과 정합해 residual을 만드는 방식 |
| error state dynamic model | error state의 시간 변화를 기술하는 모델. covariance 전파 행렬을 만들 때 쓴다 |
| extrinsic | LiDAR와 IMU 사이의 상대 자세와 위치 변환. FAST-LIO는 이 값을 이미 알고 있다고 가정한다 |

## 관련 페이지

- [[physical-ai/xu-2020-fast-lio-a-fast-robust-lidar-inertial]]: 이 리뷰가 해설하는 원 논문. 알고리즘 세부와 정량 결과는 그 페이지가 다룬다.
- [[physical-ai/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry]]: 후속 논문. 리뷰가 다루지 않는 direct 방식과 ikd-Tree의 근거.
- [[physical-ai/hku-mars-fast-lio]]: 공식 코드 저장소. FAST-LIO 1.0 알고리즘을 보려면 commit 기록을 확인해야 한다는 안내가 이 리뷰에 있다.
- [[physical-ai/airlab-2024-fast-lio-a-fast-robust]]: 같은 논문의 발표 영상. 수식 없이 빠르게 훑을 때 먼저 본다.
- [[overviews/physical-ai-overview]]: physical-ai 카테고리의 분류 뼈대와 학습 경로 허브.
