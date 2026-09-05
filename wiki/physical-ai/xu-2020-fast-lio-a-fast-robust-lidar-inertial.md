---
title: "FAST-LIO: A Fast, Robust LiDAR-inertial Odometry Package by Tightly-Coupled Iterated Kalman Filter"
type: paper
year: 2020
category: physical-ai
source: xu-2020-fast-lio-a-fast-robust-lidar-inertial.md
raw_path: raw/papers/xu-2020-fast-lio-a-fast-robust-lidar-inertial.pdf
raw_filename: "xu-2020-fast-lio-a-fast-robust-lidar-inertial.pdf"
source_collection: external
authors: "Wei Xu, Fu Zhang"
arxiv_id: "2010.08196"
tags: [physical-ai, slam, drone]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/xu-2020-fast-lio-a-fast-robust-lidar-inertial/fig01.png
    raw: raw/papers/xu-2020-fast-lio-a-fast-robust-lidar-inertial-figures/fig01.png
    caption: "실험 플랫폼. Livox AVIA LiDAR와 DJI Manifold 2-C를 실은 280mm 쿼드로터"
    page: 1
    bbox_norm: [0.4909, 0.1907, 0.9092, 0.3877]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/xu-2020-fast-lio-a-fast-robust-lidar-inertial/fig02.png
    raw: raw/papers/xu-2020-fast-lio-a-fast-robust-lidar-inertial-figures/fig02.png
    caption: "FAST-LIO 시스템 개요. (a) 전체 파이프라인, (b) forward propagation과 backward propagation"
    page: 3
    bbox_norm: [0.0567, 0.0561, 0.9575, 0.2247]
    strategy: caption-region
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/xu-2020-fast-lio-a-fast-robust-lidar-inertial/fig05.png
    raw: raw/papers/xu-2020-fast-lio-a-fast-robust-lidar-inertial-figures/fig05.png
    caption: "고속 회전 실내 환경에서 LOAM, LOAM+IMU, FAST-LIO의 mapping 결과 비교"
    page: 7
    bbox_norm: [0.5034, 0.0561, 0.9092, 0.3450]
    strategy: caption-region
    curated: true
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/xu-2020-fast-lio-a-fast-robust-lidar-inertial/fig07.png
    raw: raw/papers/xu-2020-fast-lio-a-fast-robust-lidar-inertial-figures/fig07.png
    caption: "LINS와 FAST-LIO의 mapping 품질 비교 (Velodyne VLP-16 시포트 데이터)"
    page: 8
    bbox_norm: [0.0655, 0.0561, 0.4864, 0.2735]
    strategy: caption-region
    curated: true
  - id: tab02
    label: Table II
    kind: table
    file: assets/xu-2020-fast-lio-a-fast-robust-lidar-inertial/tab02.png
    raw: raw/papers/xu-2020-fast-lio-a-fast-robust-lidar-inertial-figures/tab02.png
    caption: "feature 수에 따른 기존 공식과 신규 Kalman gain 공식의 계산 시간"
    page: 6
    bbox_norm: [0.5104, 0.0888, 0.8940, 0.1301]
    strategy: table-region
    curated: true
  - id: tab03
    label: Table III
    kind: table
    file: assets/xu-2020-fast-lio-a-fast-robust-lidar-inertial/tab03.png
    raw: raw/papers/xu-2020-fast-lio-a-fast-robust-lidar-inertial-figures/tab03.png
    caption: "10Hz LiDAR 스캔 1회 처리 시간 비교. LOAM, LOAM+IMU, FAST-LIO"
    page: 7
    bbox_norm: [0.1140, 0.0929, 0.4465, 0.1352]
    strategy: table-region
    curated: true
---

## 요약

FAST-LIO는 LiDAR feature point와 IMU 측정치를 하나의 iterated extended Kalman filter 안에서 직접 융합하는 LiDAR-inertial odometry 패키지다. odometry는 시작 지점을 기준으로 센서 측정을 누적해 로봇의 상대 pose를 추정하는 문제를 말한다. 홍콩대 MaRS Lab의 Wei Xu와 Fu Zhang이 2020년 arXiv에 공개했고 IEEE RA-L 2021에 게재됐다.

이 논문의 핵심 기여는 Kalman gain을 구하는 새 공식이다. 표준 공식은 measurement 차원 크기의 행렬을 역행렬로 만들어야 해서, 스캔마다 feature point가 1,000개를 넘는 LiDAR 환경에서는 update 한 번이 초 단위로 늘어난다. 새 공식은 그 역행렬을 state 차원인 18x18로 옮긴다. 두 공식이 같은 해를 준다는 사실은 matrix inverse lemma로 증명했다.

실효는 계산 시간에서 바로 나타난다. feature point 1,802개일 때 표준 공식이 1,621ms를 쓰는 자리에서 새 공식은 1.16ms를 쓴다. 즉 약 1,400배 차이다. 덕분에 FAST-LIO는 280mm 쿼드로터의 onboard 컴퓨터에서 스캔당 1,200개가 넘는 feature point를 25ms 안에 처리하며 실시간으로 동작한다.

![[assets/xu-2020-fast-lio-a-fast-robust-lidar-inertial/fig01.png]]
*Figure 1: 실험 플랫폼. 70도 FoV의 Livox AVIA LiDAR와 DJI Manifold 2-C onboard 컴퓨터를 280mm 휠베이스 쿼드로터에 직접 실었다. RGB 카메라는 시각화 용도이며 알고리즘에는 쓰이지 않는다 (Xu 2020, p.1).*

## 배경

이 연구의 출발점은 solid-state LiDAR의 등장이다. solid-state LiDAR는 기계식 회전 기구 없이 MEMS 미러나 회전 프리즘으로 빔을 주사하는 신형 LiDAR를 가리킨다. 가격과 무게가 global shutter 카메라 수준이라 소형 UAV에도 실을 수 있으면서, 능동 측정 방식이라 장거리 3D 좌표를 직접 얻는다.

이 조합이 중요한 이유는 기존 대안들의 약점 때문이다. 스테레오나 단안 카메라를 쓰는 visual odometry는 가볍고 저렴하지만 깊이를 직접 재지 못하고 조명 변화에 민감하다. 반면 기존 LiDAR는 이 문제를 모두 해결하지만 소형 로봇에 싣기에는 너무 비싸고 무거웠다. solid-state LiDAR가 그 사이를 메운다.

### solid-state LiDAR가 만든 세 가지 난제

가능성과 함께 새로운 문제도 따라온다. 논문은 세 가지를 든다.

| 난제 | 내용 | 결과 |
|---|---|---|
| degeneration | LiDAR feature는 edge와 plane 같은 환경의 기하 구조다. 특징이 없는 공간에서는 pose가 결정되지 않는다 | FoV가 좁을수록 심해진다 |
| 계산량 | 주사 방향 해상도가 높아 스캔 하나에 feature point가 수천 개 들어간다 | 이 양을 IMU와 tightly-coupled로 융합하면 UAV onboard 컴퓨터가 감당하지 못한다 |
| motion distortion | 소수의 laser와 receiver 쌍이 순차로 샘플링하므로 한 스캔 안의 점들이 서로 다른 시각에 찍힌다 | 각 점이 다른 pose에서 측정된 셈이라 스캔 정합 품질이 크게 떨어진다 |

UAV라는 플랫폼 자체도 조건을 더한다. 프로펠러와 모터가 계속 회전하면서 IMU에 큰 진동 노이즈를 넣기 때문이다. 따라서 FAST-LIO의 목표는 이 네 가지 악조건에서 실시간으로 동작하는 LIO를 만드는 것이다.

## 핵심 개념

LiDAR-inertial odometry는 LiDAR와 IMU를 함께 써서 상대 pose를 추정하는 방법이다. 약어 LIO로 부른다. LiDAR는 정확하지만 느리고 특징 없는 환경에서 무력하며, IMU는 빠르지만 적분 drift가 쌓인다. 두 센서를 합치면 서로의 약점을 덮는다.

두 센서를 합치는 방식은 결합 강도로 나뉜다. loosely-coupled 방식은 LiDAR 스캔을 먼저 정합해 pose를 하나 만든 뒤 그 pose를 IMU 추정과 융합한다. 반면 tightly-coupled 방식은 정합 결과를 거치지 않고 raw feature point를 IMU 측정치와 같은 estimator 안에서 직접 융합한다. FAST-LIO는 후자다.

tightly-coupled를 택하는 이유는 정보 손실 때문이다. 정합과 융합을 분리하면 새 스캔의 pose와 속도 같은 다른 state 사이의 상관 관계가 버려진다. 더 나쁜 경우는 특징 없는 환경에서 정합 자체가 특정 방향으로 degenerate할 때인데, 이때는 잘못된 pose가 그대로 융합 단계로 넘어가 추정 전체가 흔들린다.

iterated extended Kalman filter는 update 단계를 한 번에 끝내지 않고 수렴할 때까지 반복하는 EKF 변형이다. 약어 iEKF로 쓴다. EKF는 비선형 측정 모델을 현재 추정점에서 1차 근사하는데, 추정점이 참값에서 멀면 그 근사 자체가 부정확하다. iEKF는 update로 얻은 새 추정점에서 다시 선형화하기를 반복해 이 선형화 오차를 줄인다.

motion distortion은 스캔이 진행되는 동안 센서가 움직여 한 스캔 안의 점들이 서로 다른 pose에서 측정되는 왜곡이다. 손에 든 카메라를 흔들면서 찍은 파노라마가 어긋나는 것과 같은 현상이다. 이 왜곡을 되돌리지 않으면 스캔 전체를 한 시점의 측정으로 다룰 수 없다.

extrinsic은 IMU 좌표계를 기준으로 본 LiDAR의 상대 pose를 뜻한다. FAST-LIO는 이 값을 미리 알고 있다고 가정한다.

## 방법

![[assets/xu-2020-fast-lio-a-fast-robust-lidar-inertial/fig02.png]]
*Figure 2: FAST-LIO 시스템 개요. (a)는 전처리에서 state estimation을 거쳐 map update로 이어지는 전체 파이프라인이고, (b)는 한 스캔 구간에서 forward propagation이 IMU 시각을 따라 앞으로 진행하고 backward propagation이 feature point를 스캔 종료 시각으로 되돌리는 시간축이다 (Xu 2020, p.3).*

### 파이프라인 구성

전체 흐름은 전처리, state estimation, map update 세 부분이다. LiDAR가 초당 10만에서 50만 개의 점을 쏟아내므로 점 하나가 들어올 때마다 처리하는 것은 현실적이지 않다. 그래서 전처리는 점을 일정 시간 모아 스캔이라는 묶음으로 만든다.

FAST-LIO의 최소 누적 구간은 20ms다. 즉 최대 50Hz로 state estimation과 map update가 실행된다. 모은 점에서는 국소 smoothness가 높은 점을 planar feature로, 낮은 점을 edge feature로 뽑는다. 각각 LOAM과 LOAM-Livox의 기준을 따른다.

state estimation은 IMU 입력(100Hz에서 250Hz)과 함께 10Hz에서 50Hz로 실행된다. 마지막 map update는 추정된 pose로 feature point를 전역 좌표계에 등록해 map을 키우고, 갱신된 map이 다음 스캔의 정합 대상이 된다.

### manifold 위의 state 정의

state는 18차원이고 `SO(3) x R^15` manifold 위에 정의된다. 자세는 회전 행렬이라 유클리드 공간의 벡터가 아니므로, state 전체를 단순한 18차원 벡터로 다룰 수 없다는 점이 이 정의의 배경이다.

| 성분 | 기호 | 차원 | 뜻 |
|---|---|---|---|
| 자세 | `GR_I` | 3 | 전역 좌표계에서 본 IMU의 회전 |
| 위치 | `Gp_I` | 3 | 전역 좌표계에서 본 IMU의 위치 |
| 속도 | `Gv_I` | 3 | 전역 좌표계에서 본 IMU의 속도 |
| gyro bias | `b_w` | 3 | 각속도 측정의 편향 |
| accelerometer bias | `b_a` | 3 | 가속도 측정의 편향 |
| 중력 벡터 | `Gg` | 3 | 전역 좌표계에서 본 중력 |

전역 좌표계 G는 첫 IMU frame으로 잡는다. IMU frame을 body frame으로 삼기 때문에 중력 벡터가 state에 들어간다.

manifold는 국소적으로 유클리드 공간과 위상동형이다. 따라서 manifold 위의 점과 접공간 벡터를 오가는 사상을 정의할 수 있고, 논문은 이를 캡슐화 연산자 `⊞`와 `⊟`로 적는다.

| 대상 공간 | `⊞` 정의 | `⊟` 정의 |
|---|---|---|
| `SO(3)` | `R ⊞ r = R Exp(r)` | `R1 ⊟ R2 = Log(R2^T R1)` |
| `R^n` | `a ⊞ b = a + b` | `a ⊟ b = a - b` |
| 복합 manifold | 성분별로 각각 적용 | 성분별로 각각 적용 |

여기서 `Exp`는 지수 사상이고 `Log`는 그 역사상이다. 이 정의에서 `(x ⊞ u) ⊟ x = u`와 `x ⊞ (y ⊟ x) = y`가 항상 성립한다. 덕분에 manifold 위의 갱신을 접공간의 덧셈처럼 쓸 수 있다.

연속 kinematic model은 통상적인 IMU 운동 방정식이다. 위치의 미분은 속도, 속도의 미분은 `GR_I (a_m - b_a - n_a) + Gg`, 자세의 미분은 각속도의 skew-symmetric 행렬을 곱한 형태이며 중력은 상수다. IMU bias 두 종은 Gaussian noise를 가진 random walk로 둔다. 이를 IMU 샘플 주기에서 zero-order holder로 이산화하면 `x_{i+1} = x_i ⊞ (dt f(x_i, u_i, w_i))`가 된다.

오차는 error-state 정식화로 다룬다. 오차 state는 `x̃ = x ⊟ x̄`로 정의하고, 자세 오차만 `dtheta = Log(GR̄_I^T GR_I)`이며 나머지는 통상적인 덧셈 오차다. 자세의 자유도가 3이므로 자세 불확실성을 3x3 covariance 행렬로 적을 수 있는 것이 이 정의의 이점이다. 즉 회전 행렬 9개 성분을 그대로 다루는 대신 최소 표현을 쓴다.

### state estimation 네 단계

state estimation은 아래 네 단계로 실행되고, 마지막 두 단계는 수렴할 때까지 반복된다.

| 단계 | 실행 시점 | 하는 일 |
|---|---|---|
| forward propagation | IMU 측정마다 | state와 covariance를 스캔 종료 시각까지 앞으로 전파 |
| backward propagation | feature point마다 | 각 점의 샘플 시각 상대 pose를 거꾸로 계산해 motion distortion 제거 |
| residual 계산 | 반복마다 | 보정된 점을 map과 대응시켜 point-to-plane과 point-to-edge 거리 산출 |
| iterated state update | 반복마다 | Kalman gain으로 state를 갱신하고 수렴 판정 |

#### forward propagation

forward propagation은 IMU 측정이 들어올 때마다 process noise를 0으로 두고 state를 앞으로 전파한다. 시작점은 직전 스캔의 최적 추정이고, 스캔 종료 시각 `t_k`에 도달하면 예측 state `x̂_k`가 나온다.

covariance도 함께 전파한다. 오차 전파식은 `x̃_{i+1} ≈ F_x̃ x̃_i + F_w w_i`로 선형화되고, 이로부터 `P̂_{i+1} = F_x̃ P̂_i F_x̃^T + F_w Q F_w^T`를 반복 적용한다. 여기서 `Q`는 IMU 백색 노이즈의 covariance다.

두 Jacobian `F_x̃`와 `F_w`의 유도는 Appendix A에 있고 연쇄법칙으로 계산한다. `F_x̃`의 자세 블록에는 `A(u)^{-1}` 형태의 항이 들어가는데, 이는 `SO(3)` 지수 사상의 우측 Jacobian 역행렬이다.

#### backward propagation과 motion compensation

backward propagation은 스캔 종료 시각의 zero pose에서 시작해 `x̌_{j-1} = x̌_j ⊞ (-dt f(x̌_j, u_j, 0))`을 뒤로 적분한다. 속도와 bias는 `x̂_k`의 값을 그대로 가져다 쓴다. bias 두 종과 extrinsic에 해당하는 항이 0이라, 실제 갱신되는 것은 위치, 속도, 자세 세 항으로 축약된다.

실행 주기가 forward propagation과 다르다는 점이 중요하다. backward propagation은 IMU rate가 아니라 feature point rate로 실행되며, feature point rate가 훨씬 높다. 두 IMU 측정 사이에 놓인 feature point들은 왼쪽 IMU 측정값을 공통 입력으로 쓴다.

이렇게 얻은 상대 pose `Ik Ť_Ij`로 각 점을 스캔 종료 시각 좌표계로 투영한다. 투영 식은 `Lk p_fj = I T_L^{-1} Ik Ť_Ij I T_L Lj p_fj`이며, 여기서 `I T_L`이 기지의 extrinsic이다. 이 변환을 마치면 스캔 전체가 한 시각의 프레임으로 정렬되어 motion distortion이 사라진다.

#### residual 계산

residual은 보정된 feature point가 map의 대응 기하 요소에서 얼마나 떨어져 있는지를 재는 값이다. 먼저 현재 state 추정으로 각 점을 전역 좌표계로 옮긴다. 그다음 map에서 그 점이 속했을 가장 가까운 평면 또는 edge를 찾는다.

residual 식은 `z_j = G_j (Gp̂_fj - Gq_j)`이고, `Gq_j`는 대응 평면이나 edge 위의 한 점이다. `G_j`는 feature 종류에 따라 달라진다.

- planar feature이면 `G_j = u_j^T`로 두어 법선 방향 성분만 남긴다. 즉 point-to-plane 거리다.
- edge feature이면 `G_j = ⌊u_j⌋`로 두어 방향 벡터의 skew-symmetric 행렬을 곱한다. 즉 point-to-edge 거리다.

대응 기하 요소를 정하는 법선 벡터와 이웃 점 탐색은 최근 map의 점들로 만든 KD-tree로 수행한다. 또한 norm이 0.5m 같은 임계값을 넘는 residual은 버린다. 이런 값은 outlier이거나 map에 아직 등록되지 않은 새 점이라고 보기 때문이다.

#### iterated state update

측정 모델을 현재 선형화점 `x̂_k^κ` 주변에서 1차 근사하면 `0 ≈ z_j^κ + H_j^κ x̃_k^κ + v_j`가 된다. `v_j`는 LiDAR의 거리 측정과 빔 방향 노이즈에서 오는 measurement noise다.

여기서 한 가지 정합 문제가 생긴다. forward propagation이 준 prior는 `x̂_k`를 기준으로 하는 분포인데, 반복 중의 선형화점은 `x̂_k^κ`로 옮겨가 있기 때문이다. 논문은 두 기준을 잇는 Jacobian `J^κ`를 정의해 prior를 현재 선형화점 기준으로 다시 적는다. `J^κ`는 자세 블록만 `A(GR̂_Ik^κ ⊟ GR̂_Ik)^{-T}`이고 나머지 15차원은 항등 행렬이며, 첫 반복에서는 두 점이 같으므로 전체가 항등 행렬이 된다. 즉 첫 반복은 통상적인 EKF와 동일하다.

prior와 measurement를 합치면 maximum a-posteriori 문제가 된다. 최소화 대상은 prior 항 `‖x_k ⊟ x̂_k‖^2`와 measurement 항 `Σ ‖z_j^κ + H_j^κ x̃_k^κ‖^2`의 합이고, 각각 covariance의 역행렬로 가중된다. 이 이차 비용을 최소화하면 표준 iterated Kalman filter update가 유도된다.

반복은 `‖x̂_k^{κ+1} ⊟ x̂_k^κ‖`가 임계값보다 작아질 때까지 이어진다. 수렴하면 `x̄_k = x̂_k^{κ+1}`, `P̄_k = (I - KH) P`로 확정한다.

### Kalman gain 새 공식

이 절이 논문의 핵심 기여다. 표준 Kalman gain에는 measurement 차원에 묶인 역행렬이 들어 있어서 LIO에 그대로 쓸 수 없다.

#### 문제의 위치

표준 공식은 `K = P H^T (H P H^T + R)^{-1}`이다. 역행렬을 취해야 하는 `H P H^T + R`의 크기가 measurement 차원 `m`이라는 것이 문제다. Kalman filter 계열의 시간 복잡도가 `O(m^2)`인 이유도 여기에 있다.

LIO에서 `m`은 그 스캔의 유효 feature point 수다. 10Hz 스캔에서 1,000개를 쉽게 넘는다. state 차원이 18인 것과 비교하면 두 자릿수 차이다.

기존 연구들이 이 벽을 우회한 방식은 measurement를 줄이는 것이었다. 단순 downsampling은 measurement 수를 줄이지만 정보를 함께 버린다. LINS는 지면 평면을 추출해 맞추는 방식으로 measurement 수를 줄이는데, 지면이 항상 보이지는 않는 항공 응용에는 적용되지 않는다.

#### 착안점과 새 공식

논문의 착안점은 최소화 대상인 비용 함수가 state 위에 정의돼 있다는 사실이다. 비용이 state의 함수라면 그 해도 state 차원에 비례하는 복잡도로 구할 수 있어야 한다. 표준 공식이 measurement 차원을 요구하는 것은 유도 경로의 부산물일 뿐이다.

maximum a-posteriori 문제를 직접 풀면 같은 해가 다음 형태로 나온다.

`K = (H^T R^{-1} H + P^{-1})^{-1} H^T R^{-1}`

LiDAR 측정치들이 서로 독립이므로 covariance `R`은 블록 대각 행렬이고, 그 역행렬은 블록 단위로 값싸게 구해진다. 따라서 실제로 역행렬을 취해야 하는 행렬은 `H^T R^{-1} H + P^{-1}`과 `P`뿐이고, 둘 다 크기가 18x18이다.

| 항목 | 표준 공식 | 새 공식 |
|---|---|---|
| 식 | `K = P H^T (H P H^T + R)^{-1}` | `K = (H^T R^{-1} H + P^{-1})^{-1} H^T R^{-1}` |
| 역행렬 대상 | `H P H^T + R` | `H^T R^{-1} H + P^{-1}`과 `P` |
| 역행렬 크기 | measurement 차원 `m` x `m` | state 차원 18 x 18 |
| 10Hz 스캔에서의 크기 | 1,000 이상 | 18 고정 |
| `R` 역행렬 비용 | 필요 없음 | 블록 대각이라 저렴 |
| 실측 (feature 1,802개) | 1,621ms | 1.16ms |

#### 등가성 증명

두 공식이 같은 값을 준다는 사실은 matrix inverse lemma로 증명한다. Appendix B의 유도는 네 단계다.

| 단계 | 내용 |
|---|---|
| 1 | matrix inverse lemma를 적용해 `(P^{-1} + H^T R^{-1} H)^{-1} = P - P H^T (H P H^T + R)^{-1} H P`를 얻는다 |
| 2 | 이 항등식을 새 공식에 대입해 `K = P H^T R^{-1} - P H^T (H P H^T + R)^{-1} H P H^T R^{-1}`로 편다 |
| 3 | `H P H^T R^{-1} = (H P H^T + R) R^{-1} - I`를 다시 대입한다 |
| 4 | 앞의 두 항이 상쇄되어 `K = P H^T (H P H^T + R)^{-1}`, 즉 표준 공식이 남는다 |

증명이 성립하므로 새 공식은 근사가 아니라 정확히 같은 해다. 즉 계산량만 줄이고 추정 품질은 그대로 유지한다. 이 점 때문에 FAST-LIO는 downsampling 없이 스캔의 모든 유효 feature point를 쓸 수 있다.

### map update와 초기화

map update는 갱신된 state로 각 feature point를 전역 좌표계로 옮겨 기존 map에 덧붙이는 연산이다. map은 이전 스텝들의 feature point를 모두 담은 누적 집합이다. 별도의 자료구조나 관리 절차는 없다.

초기화는 LiDAR를 2초쯤 정지시키는 것으로 끝난다. 논문의 모든 실험이 이 2초를 썼다. 정지 구간에서 모은 데이터로 IMU bias와 중력 벡터를 추정한다. 반복 주사가 아닌 방식을 쓰는 Livox AVIA 같은 기종은 이 정지 시간 동안 고해상도 초기 map도 함께 얻어 이후 항법에 도움을 받는다.

## 결과

### 실험 플랫폼

실험 플랫폼은 280mm 휠베이스 쿼드로터다. 70도 FoV의 Livox AVIA LiDAR를 airframe에 직결하고, DJI Manifold 2-C onboard 컴퓨터(1.8GHz 쿼드코어 Intel i7-8550U, 8GB RAM)를 탑재했다. RGB 카메라도 달려 있지만 시각화 용도이며 알고리즘 입력이 아니다. 모든 실험을 이 onboard 컴퓨터에서 수행했다.

### Kalman gain 공식의 계산 시간

같은 파이프라인에서 gain 계산 부분만 표준 공식으로 되돌려 두 공식을 비교했다. 파이프라인과 feature 수가 동일하므로 차이는 공식에서만 온다.

![[assets/xu-2020-fast-lio-a-fast-robust-lidar-inertial/tab02.png]]
*Table II: 두 Kalman gain 공식의 계산 시간. feature 수가 늘수록 격차가 급격히 벌어진다 (Xu 2020, p.6).*

| feature 수 | 기존 공식 (ms) | 새 공식 (ms) | 배율 |
|---|---|---|---|
| 307 | 7.1 | 0.07 | 약 101배 |
| 717 | 23.4 | 0.11 | 약 213배 |
| 998 | 109.3 | 0.25 | 약 437배 |
| 1,243 | 251 | 0.37 | 약 678배 |
| 1,453 | 1,219 | 0.59 | 약 2,066배 |
| 1,802 | 1,621 | 1.16 | 약 1,397배 |

기존 공식의 증가 양상이 이 표의 요점이다. feature 수가 307개에서 1,802개로 약 6배가 되는 동안 계산 시간은 7.1ms에서 1,621ms로 약 228배가 된다. 10Hz 스캔의 예산이 100ms라는 점을 생각하면, 998개 지점에서 이미 예산을 넘고 1,453개에서는 12초 분량의 예산을 한 번에 쓰는 셈이다.

반면 새 공식은 같은 구간에서 0.07ms에서 1.16ms로 늘 뿐이다. state 차원 18이 고정이므로 feature 수가 미치는 영향은 `H^T R^{-1} H`를 누적하는 선형 비용에 그친다.

### UAV 비행

첫 실증은 실제 비행이다. 쿼드로터가 반지름 1.8m, 높이 1.4m의 원 궤도를 주기 6초에서 10초로 바꿔가며 4회 반복 비행했고, 비행 중 yaw 명령은 고정했다. FAST-LIO의 odometry 출력이 flight controller로 들어가 trajectory 추종에 직접 쓰였다.

drift 측정을 위해 마지막에는 이륙 지점으로 수동 착륙시켰다. 실내에서 최대 50Hz 갱신을 유지하며 평균 feature 270개를 6.7ms에 처리했고, 32m 비행 후 drift는 0.08m로 0.3% 미만이었다.

### 실내 고속 회전

두 번째 실험은 각속도를 크게 만드는 조건이다. 센서를 손에 들고 빠르게 흔들어 각속도가 100deg/s를 자주 넘도록 했다. 비교 대상은 Livox용 LOAM 구현(livox_mapping)과 LOAM+IMU(livox_horizon_loam)이며, 공정한 비교를 위해 두 baseline의 feature 추출을 FAST-LIO의 것으로 교체했다.

![[assets/xu-2020-fast-lio-a-fast-robust-lidar-inertial/tab03.png]]
*Table III: 10Hz 스캔 1회 처리 시간과 유효 feature 수 비교 (Xu 2020, p.7).*

| 패키지 | 유효 feature 수 | 스캔 1회 처리 시간 |
|---|---|---|
| LOAM | 1,107 | 59ms |
| LOAM+IMU | 1,107 | 44ms |
| FAST-LIO | 1,430 | 23ms |

FAST-LIO는 baseline보다 약 29% 많은 feature를 쓰면서 처리 시간은 LOAM의 39%, LOAM+IMU의 52% 수준이다. 즉 더 많은 정보를 더 빠르게 처리한다.

![[assets/xu-2020-fast-lio-a-fast-robust-lidar-inertial/fig05.png]]
*Figure 5: 고속 회전 실내 환경의 mapping 결과. LOAM과 LOAM+IMU는 구조가 번지고 겹쳐 보이는 반면 FAST-LIO는 벽면과 물체 형태를 유지한다. 우하단은 같은 환경을 느린 동작으로 다시 스캔한 FAST-LIO 결과다 (Xu 2020, p.7).*

mapping 품질 차이는 결합 방식에서 온다. LOAM+IMU는 loosely-coupled라 정합과 융합이 분리돼 있고, 그 결과 고속 회전 구간에서 일관되지 않은 map이 만들어진다. 네 번째 패널은 검증용으로, 같은 환경을 훨씬 느린 동작으로 스캔한 FAST-LIO 결과다. 두 실험의 움직임이 다르므로 가림이 생긴 자리에서 미세한 차이가 보이지만 나머지 구조는 거의 일치한다. 따라서 고속 회전 조건에서도 mapping 품질이 유지됐음이 확인된다.

### 실외 handheld

세 번째 실험은 실외 규모 검증이다. 같은 센서 묶음을 손에 들고 홍콩대 Main Building 주변을 약 140m 걸은 뒤 출발 지점으로 돌아왔다. drift는 0.07m로 0.05% 미만이었다.

계산 부담은 실내 실험보다 크다. 10Hz 스캔에서 평균 유효 feature가 1,497개였고 스캔당 평균 처리 시간은 25ms였다. 즉 100ms 예산의 4분의 1만 썼다.

### LINS 비교

마지막은 같은 filter 계열 방법과의 직접 비교다. 공정성을 위해 LINS 논문이 공개한 시포트 데이터셋을 그대로 썼다. 이 데이터는 Velodyne VLP-16 LiDAR와 Xsens MTiG-710 IMU로 수집됐으므로, FAST-LIO가 solid-state LiDAR 밖에서도 동작한다는 점도 함께 보인다.

| 항목 | LINS | FAST-LIO |
|---|---|---|
| 스캔 주기 | 10Hz | 10Hz |
| 평균 처리 시간 | 34.5ms | 7.3ms |
| 스캔당 사용 point | 147개 (다운샘플링 후) | 784개 (전부) |
| mapping 정확도 | 상대적으로 낮음 | 상대적으로 높음 |

FAST-LIO가 약 5.3배 많은 point를 쓰면서 처리 시간은 약 4.7배 짧다. LINS가 point를 줄이는 이유는 EKF 공식의 계산 복잡도이며, 바로 이 논문이 새 gain 공식으로 없앤 제약이다.

![[assets/xu-2020-fast-lio-a-fast-robust-lidar-inertial/fig07.png]]
*Figure 7: LINS와 FAST-LIO의 mapping 품질 비교. 확대한 기둥 단면에서 FAST-LIO의 point cloud가 더 얇고 선명하게 모인다. 두 이미지 모두 다운샘플링 전 전체 feature point를 그린 것이다 (Xu 2020, p.8).*

기둥 단면을 확대한 부분이 차이를 보여준다. LINS 결과에서는 같은 벽면의 point cloud가 여러 겹으로 퍼져 있고, FAST-LIO 결과에서는 한 면으로 모인다. point cloud는 LiDAR가 반환한 3D 점의 집합을 말하며, 얇게 모일수록 pose 추정이 정확했다는 뜻이다. 논문은 이 차이의 원인으로 LINS의 다운샘플링을 든다.

### 실험 전체 요약

네 실험의 조건과 수치를 한자리에 모으면 다음과 같다.

| 실험 | 조건 | 스캔 주기 | 평균 feature | 스캔당 처리 시간 | drift |
|---|---|---|---|---|---|
| UAV 비행 | 반지름 1.8m 원 궤도 4회, 총 32m | 50Hz | 270개 | 6.7ms | 0.08m (0.3% 미만) |
| 실내 고속 회전 | 각속도 100deg/s 초과 | 10Hz | 1,430개 | 23ms | 측정하지 않음 |
| 실외 handheld | HKU Main Building 140m | 10Hz | 1,497개 | 25ms | 0.07m (0.05% 미만) |
| LINS 데이터셋 | Velodyne VLP-16 시포트 | 10Hz | 784개 | 7.3ms | 측정하지 않음 |

feature 수와 처리 시간이 함께 늘어나는 양상이 일관된다. 50Hz로 실행하는 UAV 실험은 스캔 구간이 짧아 feature가 적고 처리도 빠르며, 10Hz로 실행하는 실험들은 스캔당 feature가 1,400개를 넘어도 25ms 안에 끝난다. 초록에서 말하는 "1,200개 이상의 feature point를 25ms 안에 처리"라는 주장은 실내 고속 회전과 실외 handheld 두 실험이 뒷받침한다.

## 관련 연구 맥락

FAST-LIO의 위치는 LiDAR SLAM 계보 안에서 보면 분명해진다.

| 계열 | 대표 연구 | 방식 | 약점 |
|---|---|---|---|
| LiDAR-only | ICP(Besl 1992), generalized-ICP(Segal 2009), LOAM(Zhang 2014), LeGO-LOAM, LOAM-Livox | 스캔 정합만으로 pose 추정 | featureless 환경과 좁은 FoV에 취약 |
| loosely-coupled LIO | IMU-aided LOAM, Zhen 2017, Balazadegan 2016, LIC-Fusion(Zuo 2019) | 정합 결과와 IMU를 사후 융합 | 다른 state와의 상관을 버리고, 정합이 degenerate하면 융합 전체가 흔들림 |
| tightly-coupled 최적화 | LIPS(Geneva 2018), LIOM(Ye 2019) | 그래프 최적화로 raw feature 융합 | 최적화 비용이 크다 |
| tightly-coupled filter | GPF(Bry 2012), EKF, UKF, iEKF 계열, LINS(Qin 2020) | raw feature를 한 filter에서 융합 | measurement 차원이 커지면 계산이 급증 |
| FAST-LIO | 본 논문 | iEKF에 새 Kalman gain 공식을 결합 | feature 추출과 map 구조는 그대로 남음 |

LiDAR-only 계보의 출발 문제는 대응 관계다. ICP는 정확한 점 대응을 요구하는데 LiDAR의 sparse point cloud에서는 그런 대응이 거의 존재하지 않는다. generalized-ICP가 point-to-plane 거리로, LOAM이 여기에 point-to-edge 거리를 더해 이 문제를 우회했고, FAST-LIO의 residual 정의도 같은 계보를 따른다.

filter 선택에도 이유가 있다. particle filter 계열은 feature 수와 state 차원이 커질수록 복잡도가 빠르게 증가하므로, Kalman filter와 그 변형이 선호된다. FAST-LIO는 선형화 오차를 줄이려고 LINS와 유사한 iEKF를 쓰되, gain 공식으로 measurement 수 제약을 없앤 점이 다르다.

이후 계보는 map 자료구조 쪽으로 이어진다. FAST-LIO2가 feature 추출을 없앤 direct 등록과 ikd-Tree를 도입했고, Faster-LIO가 iVox로 그 자리를 다시 바꿨다.

## 한계

- feature 추출이 LOAM 계열의 planar와 edge 기준에 묶여 있다. LiDAR 기종마다 이 추출기를 다시 맞춰야 하고, 추출 과정에서 미묘한 환경 정보가 버려진다. 후속작 FAST-LIO2는 이 단계를 없애고 raw point를 직접 등록하는 direct 방식으로 전환했다.
- map이 전역 좌표계에 feature point를 계속 덧붙이는 단순 누적 구조다. 대규모 장시간 운용에 필요한 map 관리 방식이 없다. FAST-LIO2의 ikd-Tree와 Faster-LIO의 iVox가 이 부분을 잇는다.
- residual 대응 탐색이 최근 map으로 만든 KD-tree에 의존한다. map이 커질수록 이 재구축 비용이 늘어나는데, 논문은 이 비용을 별도로 다루지 않는다.
- LiDAR와 IMU의 extrinsic을 기지로 가정하며 온라인 보정 절차가 없다. 초기화도 2초 정지를 요구한다.
- loop closure가 없는 순수 odometry라 누적된 drift를 되돌릴 수단이 없다. 실험의 drift 측정도 출발 지점으로 돌아오는 방식일 뿐 보정에는 쓰이지 않는다.
- 평가가 자체 수집 데이터 중심이고 표준 공개 벤치마크 수치가 없다. 외부 데이터를 쓴 것은 LINS 비교 하나뿐이다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| LiDAR-inertial odometry (LIO) | LiDAR와 IMU를 융합해 상대 pose를 추정하는 odometry. LiDAR의 정확도와 IMU의 빠른 갱신을 결합한다 |
| iterated extended Kalman filter (iEKF) | update 단계를 수렴할 때까지 반복해 선형화 오차를 줄이는 EKF 변형. 첫 반복은 통상적인 EKF와 같다 |
| tightly-coupled / loosely-coupled | raw 측정치를 한 estimator에서 직접 융합하는 방식 / 센서별 결과를 따로 구한 뒤 결과끼리 융합하는 방식 |
| motion distortion | 스캔 도중 센서가 움직여 한 스캔 안의 점들이 서로 다른 pose에서 샘플링되는 왜곡 |
| backward propagation | 스캔 내 각 점의 샘플 시각 상대 pose를 거꾸로 계산해 모든 점을 스캔 종료 프레임으로 정렬하는 보정 절차 |
| error-state 정식화 | state 자체가 아니라 참값과 추정값의 차이를 접공간에서 다루는 방식. 자세 오차를 3차원 최소 표현으로 적을 수 있다 |
| matrix inverse lemma | 두 Kalman gain 공식의 등가성 증명에 쓰인 행렬 항등식. Woodbury 항등식으로도 불린다 |

## 관련 페이지

- [[physical-ai/hku-mars-fast-lio]]: 공식 구현 저장소. 설치, 설정, 실행 경로와 FAST-LIO 2.0 기능은 저장소 페이지가 다룬다.
- [[physical-ai/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry]]: 직계 후속 논문. 이 페이지가 한계로 짚은 feature 추출과 map 구조를 direct 등록과 ikd-Tree로 대체한다.
- [[physical-ai/taeyoung-2022-fast-lio-paper-review]]: 같은 논문의 한국어 리뷰. 수식 전개를 다른 순서로 풀어 쓴 자료다.
- [[physical-ai/airlab-2024-fast-lio-a-fast-robust]]: 이 논문을 12분 분량으로 요약한 발표 영상.
- [[physical-ai/irasc-2024-faster-lio-lightweight-tightly-coupled]]: map 자료구조를 iVox로 바꾼 후속 Faster-LIO 해설 영상.
- [[overviews/physical-ai-overview]]: physical-ai 카테고리의 분류 뼈대와 학습 경로 허브.
