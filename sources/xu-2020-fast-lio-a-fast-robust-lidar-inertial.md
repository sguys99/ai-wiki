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
    caption: "실험 플랫폼 — Livox AVIA LiDAR와 DJI Manifold 2-C를 실은 280mm 쿼드로터"
    page: 1
    bbox_norm: [0.4909, 0.1907, 0.9092, 0.3877]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/xu-2020-fast-lio-a-fast-robust-lidar-inertial/fig02.png
    raw: raw/papers/xu-2020-fast-lio-a-fast-robust-lidar-inertial-figures/fig02.png
    caption: "FAST-LIO 시스템 개요 — (a) 전체 파이프라인, (b) forward/backward propagation"
    page: 3
    bbox_norm: [0.0567, 0.0561, 0.9575, 0.2247]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/xu-2020-fast-lio-a-fast-robust-lidar-inertial/fig03.png
    raw: raw/papers/xu-2020-fast-lio-a-fast-robust-lidar-inertial-figures/fig03.png
    caption: "UAV 비행 실험 — 반지름 1.8m 원 궤도 4회 반복 비행의 trajectory와 mapping 결과"
    page: 6
    bbox_norm: [0.4909, 0.1409, 0.9092, 0.2913]
    strategy: caption-region
    curated: false
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/xu-2020-fast-lio-a-fast-robust-lidar-inertial/fig04.png
    raw: raw/papers/xu-2020-fast-lio-a-fast-robust-lidar-inertial-figures/fig04.png
    caption: "실내 고속 회전 실험의 각속도·가속도 프로파일"
    page: 7
    bbox_norm: [0.0757, 0.1594, 0.4864, 0.2812]
    strategy: caption-region
    curated: false
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/xu-2020-fast-lio-a-fast-robust-lidar-inertial/fig05.png
    raw: raw/papers/xu-2020-fast-lio-a-fast-robust-lidar-inertial-figures/fig05.png
    caption: "고속 회전 실내 환경에서 LOAM·LOAM+IMU·FAST-LIO의 mapping 결과 비교"
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
    curated: false
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
    caption: "feature 수에 따른 기존·신규 Kalman gain 공식의 계산 시간"
    page: 6
    bbox_norm: [0.5104, 0.0888, 0.8940, 0.1301]
    strategy: table-region
    curated: true
  - id: tab03
    label: Table III
    kind: table
    file: assets/xu-2020-fast-lio-a-fast-robust-lidar-inertial/tab03.png
    raw: raw/papers/xu-2020-fast-lio-a-fast-robust-lidar-inertial-figures/tab03.png
    caption: "10Hz LiDAR 스캔 1회 처리 시간 비교 — LOAM·LOAM+IMU·FAST-LIO"
    page: 7
    bbox_norm: [0.1140, 0.0929, 0.4465, 0.1352]
    strategy: table-region
    curated: true
---

## 한 줄 요약 (One-line Summary)

LiDAR feature point와 IMU를 tightly-coupled iterated Kalman filter로 융합하는 LiDAR-inertial odometry 패키지. Kalman gain 공식을 새로 세워 계산량을 measurement 차원이 아니라 state 차원(18)에 비례하게 만들었다. 쿼드로터 onboard 컴퓨터에서 스캔당 1,200개 이상의 feature point를 25ms 안에 처리한다.

## 1. 자료 정보 (Document Information)

- 저자: Wei Xu, Fu Zhang — 홍콩대 MaRS(Mechatronics and Robotic Systems) Lab
- 발표: arXiv 2010.08196 (v1 2020-10, v3 2021-04), IEEE RA-L 2021 게재
- 코드: https://github.com/hku-mars/FAST_LIO (본 wiki의 [[physical-ai/hku-mars-fast-lio]] 참고)
- 분량: 8쪽, cs.RO

## 2. 주요 기여 (Key Contributions)

odometry는 시작 지점 기준의 상대 pose를 센서로 누적 추정하는 문제를 말한다. FAST-LIO는 LiDAR와 IMU를 함께 쓰는 LiDAR-inertial odometry(LIO)다. 기여는 네 가지다.

- tightly-coupled 방식은 스캔 정합 결과 대신 raw feature point를 IMU 측정치와 한 estimator 안에서 직접 융합한다. FAST-LIO는 이 융합을 iterated extended Kalman filter(iEKF)로 수행한다. 덕분에 빠른 움직임과 노이즈에 견디고 특징 없는 환경에서 일어나는 degeneration에도 강건하다.
- LiDAR 점은 스캔 도중 서로 다른 시각에 샘플링돼 motion distortion이 생긴다. 이를 보정하는 formal한 backward propagation 절차를 제안했다.
- Kalman gain을 구하는 새 공식을 제안하고 기존 공식과의 등가성을 증명했다. 기존 공식은 역행렬 크기가 measurement 차원(수천 개 feature point)에 묶이지만 새 공식은 state 차원(18)에만 묶여 계산량이 크게 준다.
- 이를 오픈소스 소프트웨어 패키지로 구현하고 소형 쿼드로터 onboard 컴퓨터에서 실제 비행 실험으로 검증했다.

solid-state LiDAR의 부상이 배경에 있다. MEMS 스캐닝이나 회전 프리즘을 쓰는 이 LiDAR들은 카메라급 가격과 무게라 소형 UAV에도 실을 수 있다. 대신 작은 FoV, LOAM류 feature 추출법의 부적합, 순차 샘플링에 따른 motion distortion이라는 새 문제가 따라온다. FAST-LIO는 이 조건에서 실시간으로 도는 LIO를 목표로 한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

전체 파이프라인(Figure 2a)은 전처리, state estimation, map update 세 부분으로 이어진다. 전처리는 LiDAR 입력(점 단위 100k–500kHz)을 20ms 단위로 누적해 스캔을 만들고 planar·edge feature를 뽑는다. state estimation은 IMU 입력(100–250Hz)과 함께 10–50Hz로 돈다. map update는 추정된 pose로 feature point를 전역 좌표계에 등록해 map을 키운다.

state는 manifold SO(3)×R^15 위에서 정의되고 차원은 18이다(자세·위치·속도·IMU bias 2종·중력 벡터). 오차는 error-state 정식화로 잡는다. ⊞/⊟ 연산자가 manifold와 접공간 사이를 오가며 오차를 국소 좌표에서 다룬다.

state estimation은 네 단계로 돈다.

- forward propagation — IMU 측정이 들어올 때마다 state와 covariance를 전파해 스캔 종료 시각 t_k의 예측값을 만든다. 노이즈는 0으로 두고 전파한다.
- backward propagation과 motion compensation — 스캔 안 각 feature point의 샘플 시각 ρ_j에서 본 상대 pose를 거꾸로 계산한다. 그렇게 얻은 pose로 모든 점을 스캔 종료 시각 좌표계 L_k로 투영한다. 스캔 전체가 한 시각의 프레임으로 정렬되면서 motion distortion이 사라진다.
- residual 계산 — 보정된 feature point를 현재 map과 scan-to-map 방식으로 대응시키고 point-to-plane·point-to-edge 거리를 residual로 삼는다.
- iterated state update — residual이 수렴할 때까지 Kalman update를 반복한다. 이때 새 Kalman gain 공식 K = (H^T R^-1 H + P^-1)^-1 H^T R^-1 을 쓴다. 행렬 역이 measurement 차원이 아니라 state 차원에서 계산되는 것이 요점이다. 표준 공식과의 등가성은 matrix inverse lemma로 증명했다(Appendix B).

LiDAR를 2초쯤 세워 두면 IMU bias와 중력 벡터가 잡힌다. 초기화는 이만큼 단순하다. 반복 스캔이 안 되는 Livox AVIA 같은 기종은 이 정지 시간 동안 고해상도 초기 map도 함께 얻는다. LiDAR-IMU extrinsic은 알고 있다고 가정한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

280mm 휠베이스 쿼드로터에 Livox AVIA(FoV 70°)와 DJI Manifold 2-C(1.8GHz 쿼드코어 i7-8550U, 8GB RAM)를 실어 실험 플랫폼을 구성했다.

- Kalman gain 공식 비교(Table II): feature 수 307→1802 구간에서 기존 공식은 7.1→1621ms로 폭증하는 반면 새 공식은 0.07→1.16ms에 머문다.
- UAV 비행(Figure 3): 반지름 1.8m 원 궤도를 실내에서 반복 비행. 50Hz 갱신으로 평균 feature 270개를 6.7ms에 처리했다. 32m 비행 후 drift는 0.08m(0.3% 미만)였다.
- 실내 고속 회전(Figure 4·5, Table III): 각속도가 100deg/s를 넘는 손 흔들기 실험이다. FAST-LIO는 스캔당 23ms로 feature 1430개를 처리했다. LOAM(59ms)·LOAM+IMU(44ms)보다 빠르면서 처리한 feature는 더 많다. 셋 중 mapping이 끝까지 안정적으로 유지된 것도 FAST-LIO뿐이다.
- 실외 handheld(Figure 6): 홍콩대 Main Building 주변을 140m 이동했다. drift는 0.07m(0.05%)였고 10Hz 스캔을 평균 25ms(평균 1497 feature)에 처리했다.
- LINS 비교(Figure 7): Velodyne VLP-16 + Xsens MTiG-710 시포트 데이터셋을 썼다. 평균 처리 시간은 LINS 34.5ms, FAST-LIO 7.3ms이고 mapping 정확도도 FAST-LIO가 더 좋았다. LINS는 계산량 때문에 스캔당 평균 147점으로 다운샘플링하지만 FAST-LIO는 784점을 그대로 쓴다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- feature 추출이 LOAM 계열(planar/edge)에 묶여 있다. 후속작 FAST-LIO2는 feature 추출을 없애고 raw 점을 직접 등록하는 direct 방식으로 바꿨다 ([[physical-ai/hku-mars-fast-lio]]의 README와 [[physical-ai/irasc-2024-faster-lio-lightweight-tightly-coupled]] 발표 참고).
- map은 전역 좌표계에 feature point를 계속 누적하는 단순 구조다. 대규모·장시간 운용에서 생기는 map 관리 문제는 다루지 않는다. FAST-LIO2의 ikd-Tree, Faster-LIO의 iVox가 이 부분을 잇는다.
- LiDAR-IMU extrinsic을 기지로 가정하며 온라인 보정은 없다.
- 평가가 자체 수집 데이터 중심이고 표준 공개 benchmark 수치는 없다.

## 6. 관련 연구 (Related Work)

- LiDAR-only odometry: ICP → generalized-ICP → LOAM, LeGO-LOAM, LOAM-Livox. 구조화된 환경·큰 FoV에서는 잘 돌지만 featureless 환경과 작은 FoV에 취약하다.
- loosely-coupled LIO: 스캔 정합으로 pose를 먼저 구한 뒤 IMU와 융합(IMU-aided LOAM, MSCKF 계열 등). 계산은 가볍지만 정합이 degenerate하면 이후 융합이 통째로 흔들린다.
- tightly-coupled LIO: 최적화 기반(LIOM 등)과 filter 기반(GPF, EKF/UKF/iEKF 계열)으로 갈린다. FAST-LIO는 filter 기반 iEKF 쪽이다. 같은 filter 계열의 LINS와 직접 비교했다.
- 계보: FAST-LIO → FAST-LIO2(direct 등록 + ikd-Tree) → Faster-LIO(iVox)로 이어진다.

## 7. 용어집 (Glossary)

- LiDAR-inertial odometry (LIO) — LiDAR와 IMU를 융합해 상대 pose를 추정하는 odometry. 이 자료군의 중심 주제
- iterated extended Kalman filter (iEKF) — 선형화 오차를 줄이기 위해 update 단계를 수렴할 때까지 반복하는 EKF 변형
- tightly-coupled / loosely-coupled — raw 측정치를 한 estimator에서 직접 융합하는 방식 / 센서별 결과를 따로 구한 뒤 결과끼리 융합하는 방식
- motion distortion — 스캔 도중 센서가 움직여 한 스캔 안의 점들이 서로 다른 pose에서 샘플링되는 왜곡
- forward/backward propagation — IMU로 state를 앞으로 전파하는 예측 / 스캔 내 각 점 시각의 상대 pose를 거꾸로 계산해 점들을 스캔 종료 프레임으로 정렬하는 보정
- solid-state LiDAR — 기계식 회전 없이 MEMS·프리즘으로 스캔하는 LiDAR. 저가·경량이지만 FoV가 좁다
- degeneration — 기하 특징이 부족해 특정 방향의 pose가 결정되지 않는 상태

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 1 | 실험 플랫폼 (Livox AVIA + Manifold 2-C 쿼드로터) | caption-region | ★ wiki 권장 (platform) |
| fig02 | 3 | 시스템 개요 — 파이프라인 + forward/backward propagation | caption-region | ★ wiki 권장 (architecture) |
| fig03 | 6 | UAV 원 궤도 비행 실험 | caption-region | (선택) |
| fig04 | 7 | 실내 실험 각속도·가속도 | caption-region | (선택) |
| fig05 | 7 | LOAM·LOAM+IMU·FAST-LIO mapping 비교 | caption-region | ★ wiki 권장 (result) |
| fig06 | 7 | HKU Main Building 실외 mapping | caption-region | (선택) |
| fig07 | 8 | LINS 대 FAST-LIO 비교 | caption-region | (선택) |
| tab01 | 3 | notation 표 | manual | (선택) |
| tab02 | 6 | Kalman gain 공식별 계산 시간 | table-region | ★ wiki 권장 (result) |
| tab03 | 7 | 스캔 처리 시간 비교 | table-region | ★ wiki 권장 (result) |
