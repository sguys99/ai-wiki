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

## 요약 (Summary)

FAST-LIO는 홍콩대 MaRS Lab이 2020년 공개한 LiDAR-inertial odometry 패키지다. odometry는 시작 지점 기준의 상대 pose를 센서로 누적 추정하는 문제다. 이 논문은 여기에 tightly-coupled 구조를 택했다. LiDAR feature point와 IMU 측정치를 iterated extended Kalman filter 하나에서 직접 융합한다. 핵심 기여는 새 Kalman gain 공식인데 계산량이 measurement 차원이 아니라 state 차원(18)에 비례한다. 덕분에 쿼드로터 onboard 컴퓨터에서 스캔당 1,200개 넘는 feature point를 25ms 안에 처리한다. IEEE RA-L 2021에 게재됐고 코드는 공개돼 있다.

![[assets/xu-2020-fast-lio-a-fast-robust-lidar-inertial/fig01.png]]
*Figure 1: 실험 플랫폼 — Livox AVIA LiDAR와 DJI Manifold 2-C onboard 컴퓨터를 실은 280mm 휠베이스 쿼드로터 (Xu 2020, p.1)*

MEMS 스캐닝이나 회전 프리즘을 쓰는 solid-state LiDAR의 부상이 이 연구의 배경이다. 이 LiDAR들은 카메라급 가격과 무게라 소형 UAV에도 실린다. 대신 좁은 FoV, 순차 샘플링 탓에 생기는 motion distortion, LOAM류 feature 추출법이 잘 맞지 않는다는 새 문제가 따라붙었다. FAST-LIO는 이 조건에서 실시간으로 도는 LIO를 목표로 잡았다.

## 주요 기여 (Key Contributions)

- LiDAR feature point와 IMU를 iEKF에서 tightly-coupled로 융합한다. 빠른 움직임, 노이즈, 특징 없는 환경에서 생기는 degeneration을 견디기 위한 선택이다.
- motion distortion을 보정하는 backward propagation 절차를 정식화해 제안했다. 스캔 도중 센서가 움직이면 점마다 샘플 시각이 달라진다. 이를 되돌리는 절차다.
- Kalman gain의 역행렬 계산을 measurement 차원에서 state 차원으로 옮긴 새 공식을 제안하고 matrix inverse lemma로 등가성을 증명했다.
- 전체를 오픈소스 패키지로 구현해 실제 UAV 비행으로 검증했다.

## 방법론 및 아키텍처 (Methodology and Architecture)

![[assets/xu-2020-fast-lio-a-fast-robust-lidar-inertial/fig02.png]]
*Figure 2: 시스템 개요 — (a) 전체 파이프라인, (b) forward/backward propagation의 시간축 (Xu 2020, p.3)*

LiDAR 점은 100k–500kHz로 쏟아진다. 이걸 20ms 단위로 묶는 전처리에서 파이프라인이 시작해 세 부분으로 이어진다. 전처리는 스캔을 만들고 planar·edge feature를 뽑는다. 다음은 IMU(100–250Hz)와 함께 10–50Hz로 도는 state estimation이다. 마지막 map update는 추정 pose로 feature point를 전역 좌표계에 등록한다.

state는 manifold SO(3)×R^15 위에서 18차원으로 정의된다(자세·위치·속도·IMU bias 2종·중력 벡터). manifold와 접공간을 오가는 ⊞/⊟ 연산자로 오차를 국소 좌표에서 다루는 error-state 정식화를 쓴다. state estimation은 네 단계를 돈다.

- forward propagation은 IMU 측정마다 state와 covariance를 전파해 스캔 종료 시각의 예측값을 만든다.
- backward propagation은 각 feature point가 샘플링된 시각의 상대 pose를 거꾸로 계산해 모든 점을 스캔 종료 프레임으로 투영한다. 이 정렬로 motion distortion이 사라진다.
- residual 계산은 보정된 점을 누적 map과 scan-to-map 방식으로 대응시켜 point-to-plane·point-to-edge 거리를 residual로 만든다.
- iterated update는 수렴할 때까지 Kalman update를 반복한다. 새 공식 K = (H^T R^-1 H + P^-1)^-1 H^T R^-1 은 역행렬이 state 차원에서만 계산돼 feature point가 수천 개라도 계산량이 폭증하지 않는다.

LiDAR를 2초쯤 정지시켜 IMU bias와 중력 벡터를 얻으면 초기화가 끝난다. LiDAR-IMU extrinsic은 알고 있다고 가정한다.

## 결과 (Results)

![[assets/xu-2020-fast-lio-a-fast-robust-lidar-inertial/tab02.png]]
*Table II: feature 수 307→1802에서 기존 공식은 7.1→1621ms, 새 공식은 0.07→1.16ms (Xu 2020, p.6)*

Livox AVIA(FoV 70°)와 DJI Manifold 2-C(1.8GHz i7-8550U, 8GB)를 실은 쿼드로터에서 네 가지 실험을 했다.

UAV 비행은 반지름 1.8m 원 궤도를 반복해 돌았다. 50Hz로 갱신하며 평균 feature 270개를 6.7ms에 처리했고 32m를 날고 난 뒤 drift는 0.08m로 0.3%에 못 미쳤다. 실내 고속 회전은 각속도 100deg/s를 넘게 센서를 손으로 흔드는 조건이다. 여기서 FAST-LIO는 스캔당 23ms로 feature 1430개를 처리해 LOAM(59ms)·LOAM+IMU(44ms)보다 빠르면서 더 많은 점을 썼다. 안정적인 mapping을 유지한 쪽은 FAST-LIO뿐이었다.

실외 handheld 실험은 홍콩대 Main Building 주변을 140m 이동했다. drift 0.07m(0.05%), 10Hz 스캔 평균 25ms가 나왔다. 마지막은 LINS와의 비교다. Velodyne VLP-16 + Xsens MTiG-710 데이터에서 LINS가 34.5ms일 때 FAST-LIO는 7.3ms였고 mapping 정확도도 우위였다. LINS가 계산량 때문에 스캔당 147점으로 다운샘플링하는 동안 FAST-LIO는 784점을 그대로 쓴다.

![[assets/xu-2020-fast-lio-a-fast-robust-lidar-inertial/fig05.png]]
*Figure 5: 고속 회전 실내 환경 mapping 비교 — LOAM·LOAM+IMU는 무너지고 FAST-LIO만 구조를 유지한다 (Xu 2020, p.7)*

![[assets/xu-2020-fast-lio-a-fast-robust-lidar-inertial/tab03.png]]
*Table III: 10Hz 스캔 1회 처리 시간 — LOAM 59ms, LOAM+IMU 44ms, FAST-LIO 23ms (Xu 2020, p.7)*

## 한계 (Limitations)

feature 추출은 LOAM 계열에 묶여 있다. map도 전역 좌표계에 점을 계속 누적하는 단순 구조라 대규모 운용의 map 관리 문제는 다루지 않는다. 후속 FAST-LIO2가 feature 추출을 없앤 direct 등록과 ikd-Tree로, Faster-LIO가 iVox로 이 부분을 이어받았다. extrinsic 온라인 보정도 없다.

## 관련 페이지 (Related Pages)

- [[physical-ai/hku-mars-fast-lio]] — 공식 구현 저장소 (현재는 FAST-LIO2 기준)
- [[physical-ai/taeyoung-2022-fast-lio-paper-review]] — 수식 전개를 풀어 쓴 한국어 리뷰
- [[physical-ai/airlab-2024-fast-lio-a-fast-robust]] — 12분 요약 발표 영상
- [[physical-ai/irasc-2024-faster-lio-lightweight-tightly-coupled]] — 후속 Faster-LIO 해설 영상
