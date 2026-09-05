---
title: "FAST-LIO: A Fast, Robust LiDAR-inertial Odometry Package by Tightly-Coupled Iterated Kalman Filter"
type: paper
year: 2020
category: physical-ai
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
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/xu-2020-fast-lio-a-fast-robust-lidar-inertial/fig03.png
    raw: raw/papers/xu-2020-fast-lio-a-fast-robust-lidar-inertial-figures/fig03.png
    caption: "UAV 비행 실험. 반지름 1.8m 원 궤도 4회 반복 비행의 trajectory와 mapping 결과"
    page: 6
    bbox_norm: [0.4909, 0.1409, 0.9092, 0.2913]
    strategy: caption-region
    curated: false
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/xu-2020-fast-lio-a-fast-robust-lidar-inertial/fig04.png
    raw: raw/papers/xu-2020-fast-lio-a-fast-robust-lidar-inertial-figures/fig04.png
    caption: "실내 고속 회전 실험의 각속도와 가속도 프로파일"
    page: 7
    bbox_norm: [0.0757, 0.1594, 0.4864, 0.2812]
    strategy: caption-region
    curated: false
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
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/xu-2020-fast-lio-a-fast-robust-lidar-inertial/fig06.png
    raw: raw/papers/xu-2020-fast-lio-a-fast-robust-lidar-inertial-figures/fig06.png
    caption: "홍콩대 Main Building 실외 handheld mapping 결과"
    page: 7
    bbox_norm: [0.5034, 0.3937, 0.9092, 0.5556]
    strategy: caption-region
    curated: false
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
  - id: tab01
    label: Table I
    kind: table
    file: assets/xu-2020-fast-lio-a-fast-robust-lidar-inertial/tab01.png
    raw: raw/papers/xu-2020-fast-lio-a-fast-robust-lidar-inertial-figures/tab01.png
    caption: "주요 notation 정리"
    page: 3
    bbox_norm: [0.055, 0.275, 0.475, 0.46]
    strategy: manual
    curated: false
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

## 한 줄 요약 (One-line Summary)

LiDAR feature point와 IMU를 tightly-coupled iterated Kalman filter로 융합하는 LiDAR-inertial odometry 패키지. Kalman gain 공식을 새로 세워 계산량을 measurement 차원이 아니라 state 차원(18)에 비례하게 만들었다. 쿼드로터 onboard 컴퓨터에서 스캔당 1,200개 이상의 feature point를 25ms 안에 처리한다.

## 1. 자료 정보 (Document Information)

- 저자: Wei Xu, Fu Zhang, 홍콩대 MaRS(Mechatronics and Robotic Systems) Lab
- 발표: arXiv 2010.08196 (v1 2020-10, v3 2021-04), IEEE RA-L 2021 게재
- 연구비: DJI (project no. 200009538)
- 코드: https://github.com/hku-mars/FAST_LIO (본 wiki의 [[physical-ai/hku-mars-fast-lio]] 참고)
- 실험 영상: https://youtu.be/iYCY6T79oNU
- 분량: 8쪽, cs.RO

## 2. 주요 기여 (Key Contributions)

odometry는 시작 지점 기준의 상대 pose를 센서로 누적 추정하는 문제를 말한다. FAST-LIO는 LiDAR와 IMU를 함께 쓰는 LiDAR-inertial odometry(LIO)다. 기여는 네 가지다.

- tightly-coupled 방식은 스캔 정합 결과 대신 raw feature point를 IMU 측정치와 한 estimator 안에서 직접 융합한다. FAST-LIO는 이 융합을 iterated extended Kalman filter(iEKF)로 수행한다. 덕분에 빠른 움직임과 노이즈에 견디고 특징 없는 환경에서 일어나는 degeneration에도 강건하다.
- LiDAR 점은 스캔 도중 서로 다른 시각에 샘플링돼 motion distortion이 생긴다. 이를 보정하는 formal한 backward propagation 절차를 제안했다.
- Kalman gain을 구하는 새 공식을 제안하고 기존 공식과의 등가성을 증명했다. Kalman filter 계열의 시간 복잡도는 measurement 차원 `m`에 대해 `O(m^2)`이라서, 스캔마다 feature point가 1,000개를 넘는 LIO에서는 update 한 번이 감당 불가능해진다. 기존 방법들은 그래서 measurement를 줄이는 쪽을 택했다. LINS는 지면 평면을 추출해 맞추는 방식으로 measurement 수를 줄이는데, 지면이 항상 보이지 않는 항공 응용에는 적용되지 않는다. 새 공식은 역행렬 크기를 state 차원(18)에만 묶어 downsampling 없이 전체 feature point를 쓰게 한다.
- 이를 오픈소스 소프트웨어 패키지로 구현하고 소형 쿼드로터 onboard 컴퓨터에서 실제 비행 실험으로 검증했다.

solid-state LiDAR의 부상이 배경에 있다. MEMS 스캐닝이나 회전 프리즘을 쓰는 이 LiDAR들은 카메라급 가격과 무게라 소형 UAV에도 실을 수 있고, 능동 방식이라 장거리 3D 측정을 직접 얻는다. 대신 세 가지 새 문제가 따라온다. 첫째, LiDAR feature는 환경의 기하 구조(edge, plane)라서 특징 없는 환경에서 쉽게 degenerate하고 FoV가 좁으면 더 심하다. 둘째, 스캐닝 방향 해상도가 높아 스캔 하나에 수천 개 feature point가 들어가는데 이만한 양을 IMU와 tightly-coupled로 융합하면 UAV onboard 컴퓨터가 감당하지 못한다. 셋째, 소수의 laser/receiver 쌍으로 순차 샘플링하므로 한 스캔 안의 점들이 서로 다른 시각에 찍혀 motion distortion이 생긴다. UAV의 프로펠러와 모터 회전이 IMU에 큰 진동 노이즈를 더하는 것도 조건에 들어간다. FAST-LIO는 이 조건에서 실시간으로 동작하는 LIO를 목표로 한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 파이프라인

전체 파이프라인(Figure 2a)은 전처리, state estimation, map update 세 부분으로 이어진다. 전처리는 LiDAR 입력(점 단위로 초당 10만에서 50만 개)을 20ms 단위로 누적해 스캔을 만들고 planar, edge feature를 뽑는다. planar는 국소 smoothness가 높은 점, edge는 낮은 점으로 각각 LOAM과 LOAM-Livox의 기준을 따른다. state estimation은 IMU 입력(100Hz에서 250Hz)과 함께 10Hz에서 50Hz로 실행된다. 누적 시간 20ms가 최소값이라 최대 50Hz odometry 출력이 나온다. map update는 추정된 pose로 feature point를 전역 좌표계에 등록해 map을 키우고, 갱신된 map이 다음 스캔의 정합 대상이 된다.

### 3.2 manifold 연산자와 state 정의

state는 manifold `M = SO(3) x R^15` 위에서 정의되고 차원은 18이다. 구성은 IMU 자세 `GR_I`, 위치 `Gp_I`, 속도 `Gv_I`, gyro bias `b_w`, accelerometer bias `b_a`, 전역 중력 벡터 `Gg`다. 전역 좌표계 G는 첫 IMU frame으로 잡는다.

manifold는 국소적으로 유클리드 공간과 위상동형이므로, 캡슐화 연산자 `⊞`와 `⊟`로 manifold와 접공간을 오간다. `SO(3)`에서는 `R ⊞ r = R Exp(r)`, `R1 ⊟ R2 = Log(R2^T R1)`이고 유클리드 공간에서는 각각 덧셈과 뺄셈이다. 복합 manifold에서는 성분별로 적용한다. 이 정의에서 `(x ⊞ u) ⊟ x = u`와 `x ⊞ (y ⊟ x) = y`가 성립한다.

연속 kinematic model은 IMU frame을 body frame으로 놓고 세운다. 위치 미분은 속도, 속도 미분은 `GR_I (a_m - b_a - n_a) + Gg`, 자세 미분은 `GR_I ⌊w_m - b_w - n_w⌋`이며 중력은 상수다. IMU bias 두 종은 Gaussian noise를 가진 random walk로 모델링한다. 이를 IMU 샘플 주기 `dt`에서 zero-order holder로 이산화하면 `x_{i+1} = x_i ⊞ (dt f(x_i, u_i, w_i))`가 된다.

오차는 error-state 정식화로 다룬다. 오차 state는 `x̃ = x ⊟ x̄`로 정의되고, 자세 오차만 `dtheta = Log(GR̄_I^T GR_I)`이며 나머지는 통상적인 덧셈 오차다. 자세 자유도가 3이므로 자세 불확실성을 3x3 covariance로 표현할 수 있다는 것이 이 정의의 이점이다. 즉 최소 표현이다.

LiDAR와 IMU의 extrinsic `I T_L`은 기지로 가정한다.

### 3.3 state estimation 네 단계

state estimation은 다음 네 단계로 실행된다.

- forward propagation. IMU 측정이 들어올 때마다 process noise를 0으로 두고 state를 전파해 스캔 종료 시각 `t_k`의 예측값 `x̂_k`를 만든다. covariance는 error-state 동역학 `x̃_{i+1} ≈ F_x̃ x̃_i + F_w w_i`를 써서 `P̂_{i+1} = F_x̃ P̂_i F_x̃^T + F_w Q F_w^T`로 함께 전파한다. `F_x̃`와 `F_w`의 유도는 Appendix A에 있고 연쇄법칙으로 계산한다. `F_x̃`에는 `A(u)^{-1}` 형태의 항이 들어가는데 이는 SO(3) 지수사상의 우측 Jacobian 역행렬이다.
- backward propagation과 motion compensation. 스캔 안 각 feature point의 샘플 시각 `rho_j`에서 본 상대 pose를 거꾸로 계산한다. `x̌_{j-1} = x̌_j ⊞ (-dt f(x̌_j, u_j, 0))`을 스캔 종료 시각의 zero pose에서 시작해 뒤로 적분하며, 속도와 bias는 `x̂_k`의 값을 그대로 쓴다. bias 두 종과 extrinsic에 해당하는 항이 0이라 실제 갱신은 위치, 속도, 자세 세 항으로 축약된다. backward propagation은 IMU rate가 아니라 feature point rate로 실행되고, 두 IMU 측정 사이의 feature point는 왼쪽 IMU 측정값을 입력으로 쓴다. 그렇게 얻은 상대 pose `Ik Ť_Ij`로 모든 점을 스캔 종료 시각 좌표계 `L_k`로 투영한다. 투영 식은 `Lk p_fj = I T_L^{-1} Ik Ť_Ij I T_L Lj p_fj`이다. 스캔 전체가 한 시각의 프레임으로 정렬되면서 motion distortion이 사라진다.
- residual 계산. 보정된 feature point를 현재 state 추정으로 전역 좌표계에 옮긴 뒤 map과 scan-to-map 방식으로 대응시킨다. 대응 평면이나 edge는 map에서 가장 가까운 점들이 정의하며, 그 탐색은 최근 map의 점들로 만든 KD-tree로 수행한다. residual은 `z_j = G_j (Gp̂_fj - Gq_j)`이고 `G_j`는 planar feature면 법선 벡터의 전치 `u_j^T`, edge feature면 방향 벡터의 skew-symmetric 행렬 `⌊u_j⌋`다. 즉 point-to-plane 거리와 point-to-edge 거리를 각각 잰다. norm이 0.5m 같은 임계값을 넘는 residual은 outlier이거나 map에 아직 등록되지 않은 새 점으로 보고 버린다.
- iterated state update. 측정 모델을 현재 추정 `x̂_k^κ` 주변에서 1차 근사해 `0 ≈ z_j^κ + H_j^κ x̃_k^κ + v_j`를 얻는다. forward propagation이 준 prior는 `x̂_k` 기준이고 반복 중의 선형화점은 `x̂_k^κ`라서, 둘을 잇는 Jacobian `J^κ`로 prior를 옮겨 적는다. `J^κ`는 자세 블록만 `A(GR̂_Ik^κ ⊟ GR̂_Ik)^{-T}`이고 나머지는 항등이며, 첫 반복에서는 `x̂_k^κ = x̂_k`이므로 항등 행렬이 된다. prior와 posterior를 합치면 maximum a-posteriori 문제가 되고, 이 이차 비용을 최소화하면 표준 iterated Kalman filter update가 나온다. residual이 수렴할 때까지(`‖x̂_k^{κ+1} ⊟ x̂_k^κ‖ < ε`) 반복하고, 수렴 후 `x̄_k = x̂_k^{κ+1}`, `P̄_k = (I - KH) P`로 확정한다.

### 3.4 Kalman gain 새 공식

표준 Kalman gain은 `K = P H^T (H P H^T + R)^{-1}`이다. 역행렬 대상 `H P H^T + R`의 크기가 measurement 차원이라서, 스캔당 feature point가 1,000개를 넘으면 역행렬 계산이 불가능해진다. 기존 연구들이 measurement 수를 줄인 이유가 여기에 있다.

이 논문의 착안점은 비용 함수가 state에 대한 것이라는 사실이다. 최소화 대상이 state 위에 정의돼 있으므로 해도 state 차원에 비례하는 복잡도로 구할 수 있어야 한다. MAP 문제를 직접 풀면 같은 해를 다음 형태로 얻는다.

`K = (H^T R^{-1} H + P^{-1})^{-1} H^T R^{-1}`

LiDAR 측정치들이 서로 독립이므로 `R`은 블록 대각 행렬이고 그 역행렬은 블록 단위로 값싸게 구해진다. 따라서 실제로 역행렬을 취해야 하는 행렬은 둘 다 state 차원인 18x18짜리다. 두 공식의 등가성은 matrix inverse lemma로 증명했다(Appendix B). 증명은 `(P^{-1} + H^T R^{-1} H)^{-1} = P - P H^T (H P H^T + R)^{-1} H P`를 새 공식에 대입하고 `H P H^T R^{-1} = (H P H^T + R) R^{-1} - I`를 다시 대입해 표준 공식으로 되돌리는 순서다.

state 차원 18에 비해 유효 feature point는 10Hz 스캔에서 1,000개를 넘으므로, 이 교체만으로 절약되는 계산량이 크다.

### 3.5 map update와 초기화

map update는 갱신된 state로 각 feature point를 전역 좌표계로 옮겨 기존 map에 덧붙이는 단순한 연산이다. map은 이전 스텝들의 feature point를 모두 담은 누적 집합이다.

초기화는 LiDAR를 2초쯤 정지시키는 것으로 끝난다. 그동안 모은 데이터로 IMU bias와 중력 벡터를 추정한다. 반복 스캔이 아닌 방식을 쓰는 Livox AVIA 같은 기종은 이 정지 시간 동안 고해상도 초기 map도 함께 얻어 이후 항법에 도움이 된다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

280mm 휠베이스 쿼드로터에 Livox AVIA(FoV 70도)와 DJI Manifold 2-C(1.8GHz 쿼드코어 Intel i7-8550U, 8GB RAM)를 실어 실험 플랫폼을 구성했다. LiDAR는 airframe에 직결했고 RGB 카메라는 시각화 용도로만 달았을 뿐 알고리즘에는 쓰지 않는다. 모든 실험을 이 onboard 컴퓨터에서 수행했다.

- Kalman gain 공식 비교(Table II): 같은 파이프라인에서 gain 계산만 옛 공식으로 바꿔 비교했다. feature 수 307개에서 1,802개 구간에서 기존 공식은 7.1ms에서 1,621ms로 급증하는 반면 새 공식은 0.07ms에서 1.16ms에 머문다. 중간 구간도 기존 공식 717개 23.4ms, 998개 109.3ms, 1,243개 251ms, 1,453개 1,219ms이고 새 공식은 각각 0.11ms, 0.25ms, 0.37ms, 0.59ms다.
- UAV 비행(Figure 3): 반지름 1.8m, 높이 1.4m 원 궤도를 주기 6초에서 10초로 바꿔가며 4회 반복 비행했다. 비행 중 yaw 명령은 고정했고 마지막에 이륙 지점으로 수동 착륙시켜 drift를 측정했다. 실내에서 최대 50Hz 갱신으로 평균 feature 270개를 6.7ms에 처리했다. 32m 비행 후 drift는 0.08m로 0.3% 미만이었다.
- 실내 고속 회전(Figure 4, Figure 5, Table III): 센서를 손에 들고 빠르게 흔들어 각속도가 100deg/s를 자주 넘게 만든 조건이다. 비교 대상은 Livox용 LOAM 구현(livox_mapping)과 LOAM+IMU(livox_horizon_loam)이며, 공정한 비교를 위해 feature 추출을 FAST-LIO의 것으로 교체했다. FAST-LIO는 10Hz 스캔당 23ms로 feature 1,430개를 처리했다. LOAM은 1,107개를 59ms, LOAM+IMU는 1,107개를 44ms에 처리했다. FAST-LIO가 더 많은 feature를 더 빠르게 처리한 셈이다. LOAM+IMU는 loosely-coupled라 mapping이 일관되지 않았다. 같은 환경을 훨씬 느린 동작으로 다시 스캔해 얻은 map과 비교하면, FAST-LIO의 고속 회전 map은 가림 때문에 생긴 미세한 차이를 빼면 거의 일치했다.
- 실외 handheld(Figure 6): 홍콩대 Main Building 주변을 손에 들고 걸으며 약 140m 이동한 뒤 출발 지점으로 돌아왔다. drift는 0.07m로 0.05% 미만이었고, 10Hz 스캔을 평균 25ms에 처리했으며 평균 유효 feature는 1,497개였다.
- LINS 비교(Figure 7): LINS 논문이 공개한 시포트 데이터셋(Velodyne VLP-16과 Xsens MTiG-710 IMU)을 그대로 썼다. 둘 다 10Hz로 실행했을 때 평균 처리 시간은 LINS 34.5ms, FAST-LIO 7.3ms이고 mapping 정확도도 FAST-LIO가 더 좋았다. LINS는 EKF 공식의 계산 복잡도 때문에 스캔당 평균 147점으로 다운샘플링하지만 FAST-LIO는 784점을 그대로 쓴다. 이 다운샘플링이 LINS의 mapping 정확도 저하로 이어진다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- feature 추출이 LOAM 계열(planar, edge)에 묶여 있다. 후속작 FAST-LIO2는 feature 추출을 없애고 raw point를 직접 등록하는 direct 방식으로 바꿨다 ([[physical-ai/hku-mars-fast-lio]]의 README와 [[physical-ai/irasc-2024-faster-lio-lightweight-tightly-coupled]] 발표 참고).
- map은 전역 좌표계에 feature point를 계속 누적하는 단순 구조다. 대규모 장시간 운용에서 생기는 map 관리 문제는 다루지 않는다. FAST-LIO2의 ikd-Tree, Faster-LIO의 iVox가 이 부분을 잇는다.
- residual 대응 탐색을 최근 map으로 만든 KD-tree에 의존한다. map이 커질수록 이 재구축 비용이 늘어나는 문제도 후속 자료구조가 다루는 지점이다.
- LiDAR-IMU extrinsic을 기지로 가정하며 온라인 보정은 없다. 초기화 역시 2초 정지를 요구한다.
- loop closure가 없는 순수 odometry라 누적 drift를 되돌리는 수단이 없다. 실험의 drift 측정도 출발 지점으로 돌아오는 방식이며 loop closure로 보정한 값이 아니다.
- 평가가 자체 수집 데이터 중심이고 표준 공개 benchmark 수치는 없다. LINS 비교만 외부 데이터셋을 썼다.

## 6. 관련 연구 (Related Work)

- LiDAR-only odometry: ICP(Besl 1992)에서 시작해 point-to-plane 거리를 쓰는 generalized-ICP(Segal 2009), 여기에 point-to-edge 거리를 결합한 LOAM(Zhang 2014)으로 이어진다. LeGO-LOAM(2018), LOAM-Livox(2020) 등 변형이 많다. 구조화된 환경과 큰 FoV에서는 잘 동작하지만 featureless 환경과 작은 FoV에 취약하다. LiDAR의 sparse point cloud에서는 ICP가 요구하는 정확한 점 대응이 거의 존재하지 않는다는 것이 이 계보의 출발 문제다.
- loosely-coupled LIO: 스캔 정합으로 pose를 먼저 구한 뒤 IMU와 융합한다. IMU-aided LOAM, Gaussian Particle Filter 출력을 error-state EKF로 융합하는 방식(Zhen 2017), IMU 중력 모델을 더해 6자유도 ego-motion을 추정하는 방식(Balazadegan 2016), MSCKF로 스캔 정합 결과와 IMU, 시각 측정을 융합하는 LIC-Fusion(Zuo 2019) 등이 있다. 계산은 가볍지만 정합과 융합을 분리하는 탓에 속도 같은 다른 state와 새 스캔 pose의 상관을 무시하고, featureless 환경에서 정합이 degenerate하면 이후 융합이 통째로 흔들린다.
- tightly-coupled LIO: 최적화 기반과 filter 기반으로 나뉜다. 최적화 기반에는 IMU pre-integration과 평면 제약을 쓰는 LIPS(Geneva 2018), edge와 plane feature 기반 그래프 최적화인 LIOM(Ye 2019)이 있다. filter 기반에서는 Gaussian Particle Filter를 2D LiDAR와 IMU에 쓴 사례(Bry 2012, Boston Dynamics Atlas에도 적용)가 있으나 particle filter는 feature 수와 state 차원에 따라 복잡도가 빠르게 커져 Kalman filter 계열이 선호된다. EKF, UKF, iterated Kalman filter 변형이 이 자리를 차지한다.
- FAST-LIO의 위치: filter 기반 tightly-coupled에 속하며 선형화 오차를 줄이려고 LINS와 유사한 iEKF를 쓴다. 차이는 Kalman gain 공식으로 measurement 수 제약을 없앤 점이다.
- 계보: FAST-LIO에서 FAST-LIO2(direct 등록과 ikd-Tree)로, 다시 Faster-LIO(iVox)로 이어진다.

## 7. 용어집 (Glossary)

- LiDAR-inertial odometry (LIO): LiDAR와 IMU를 융합해 상대 pose를 추정하는 odometry. 이 자료군의 중심 주제
- iterated extended Kalman filter (iEKF): 선형화 오차를 줄이기 위해 update 단계를 수렴할 때까지 반복하는 EKF 변형
- tightly-coupled / loosely-coupled: raw 측정치를 한 estimator에서 직접 융합하는 방식 / 센서별 결과를 따로 구한 뒤 결과끼리 융합하는 방식
- motion distortion: 스캔 도중 센서가 움직여 한 스캔 안의 점들이 서로 다른 pose에서 샘플링되는 왜곡
- forward/backward propagation: IMU로 state를 앞으로 전파하는 예측 / 스캔 내 각 점 시각의 상대 pose를 거꾸로 계산해 점들을 스캔 종료 프레임으로 정렬하는 보정
- solid-state LiDAR: 기계식 회전 없이 MEMS나 프리즘으로 스캔하는 LiDAR. 저가 경량이지만 FoV가 좁다
- degeneration: 기하 특징이 부족해 특정 방향의 pose가 결정되지 않는 상태
- error-state 정식화: state 자체가 아니라 참값과 추정값의 차이를 접공간에서 다루는 방식. 자세 오차를 3차원 최소 표현으로 적을 수 있다
- ⊞ / ⊟ 연산자: manifold 위의 점과 접공간 벡터를 잇는 캡슐화 연산자. `SO(3)`에서는 각각 `Exp` 우측 곱과 `Log`로 정의된다
- matrix inverse lemma: 두 Kalman gain 공식의 등가성 증명에 쓰인 행렬 항등식. Woodbury 항등식으로도 불린다
- MAP (maximum a-posteriori): prior와 measurement를 함께 최대화하는 추정. iterated Kalman filter update가 이 문제의 해로 유도된다

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 1 | 실험 플랫폼 (Livox AVIA와 Manifold 2-C 쿼드로터) | caption-region | ★ wiki 권장 (platform) |
| fig02 | 3 | 시스템 개요, 파이프라인과 forward/backward propagation | caption-region | ★ wiki 권장 (architecture) |
| fig03 | 6 | UAV 원 궤도 비행 실험 | caption-region | (선택) |
| fig04 | 7 | 실내 실험 각속도와 가속도 | caption-region | (선택) |
| fig05 | 7 | LOAM, LOAM+IMU, FAST-LIO mapping 비교 | caption-region | ★ wiki 권장 (result) |
| fig06 | 7 | HKU Main Building 실외 mapping | caption-region | (선택) |
| fig07 | 8 | LINS 대 FAST-LIO 비교 | caption-region | ★ wiki 권장 (result) |
| tab01 | 3 | notation 표 | manual | (선택) |
| tab02 | 6 | Kalman gain 공식별 계산 시간 | table-region | ★ wiki 권장 (result) |
| tab03 | 7 | 스캔 처리 시간 비교 | table-region | ★ wiki 권장 (result) |
