---
title: "[논문 리뷰] Faster-LIO: Lightweight Tightly Coupled Lidar-Inertial Odometry Using Parallel Sparse..."
type: video
year: 2024
category: physical-ai
raw_path: raw/videos/irasc-2024-faster-lio-lightweight-tightly-coupled.md
raw_filename: "irasc-2024-faster-lio-lightweight-tightly-coupled.md"
source_collection: external
channel: "iRASC Lab: Intelligent Robotics at Gachon Univ"
url: "https://youtu.be/_YEnRYK6CzQ"
duration: "28m59s"
tags: [physical-ai, slam]
---

## 한 줄 요약 (One-line Summary)

Faster-LIO를 해설한 29분짜리 한국어 발표다. FAST-LIO2가 쓰던 map 자료구조 ikd-Tree를 해시 기반 희소 voxel 구조 iVox로 갈아 끼워 검색과 갱신을 가볍게 만든 것이 Faster-LIO다. 발표는 iVox와 iVox-PHC의 자료구조, kNN 검색, LRU 삭제, 복잡도, 효율·정확도 실험까지 논문 순서를 그대로 따라간다.

## 1. 자료 정보 (Document Information)

- 채널: iRASC Lab (가천대, 논문 세미나 발표 녹화)
- 업로드: 2024-11-02, 28분 59초
- 대상 논문: Faster-LIO — IEEE RA-L 게재, 발표 시점 인용 175회라고 소개 (원 논문 PDF는 본 wiki 미보유)
- 자막: 한국어 자동 자막 (고유명사 오인식 있음 — "아이보스/아이복스"=iVox, "패스터 리오"=Faster-LIO)

## 2. 주요 기여 (Key Contributions)

Faster-LIO의 요점은 map 자료구조 교체 하나다.

- FAST-LIO는 feature 추출 후 iEKF로 융합하고 KD-Tree로 map을 관리했다. FAST-LIO2는 feature 추출을 없앤 direct 방식으로 가면서 ikd-Tree를 도입했다. 갱신 연산량은 기존 KD-Tree의 4% 수준이다.
- Faster-LIO는 그 ikd-Tree 자리를 iVox(incremental sparse voxel)로 바꾼다. 점이 있는 voxel만 해시 맵에 저장하는 희소 구조여서 메모리가 절약된다. 좌표를 voxel 크기로 나눠 얻은 인덱스를 해시 함수에 넣으므로 검색도 전체 탐색 없이 끝난다.
- 점 밀도가 높은 voxel에는 iVox-PHC라는 변형이 따로 있다. pseudo Hilbert curve로 3차원 공간을 1차원 인덱스에 매핑하면 공간 지역성이 유지돼 근사 kNN을 빠르게 풀 수 있다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

- iVox는 입력 point cloud를 희소 voxel로 저장하고 인덱스는 해시 함수를 거쳐 unordered_map에 들어간다. voxel 위치는 좌표를 voxel 크기 s로 나눠 얻는다. 각 좌표에 소수를 곱해 XOR로 결합한 뒤 모듈로 연산을 걸어 해시 충돌을 줄이는 구조다.
- kNN 검색은 쿼리 점이 속한 voxel과 인접 voxel(6·18·26개 확장)을 해시 맵에서 곧바로 찾아 후보를 모은 다음 그중 최적의 k개 이웃을 고른다.
- 삽입할 때는 voxel grid 필터가 한 voxel에 점이 몰리는 것을 막는다. 삭제는 방식이 다르다. 시야 밖 점을 골라내는 대신 LRU cache로 오래 안 쓴 voxel을 통째로 버린다. unordered_map과 이중 연결 리스트를 함께 쓰기 때문에 삽입도 삭제도 O(1)이다.
- iVox-PHC — voxel을 2^K개씩 세 방향으로 쪼갠 작은 큐브를 PHC 위 위치로 인덱싱하고 큐브마다 내부 점의 중심을 저장한다. kNN은 PHC 인덱스 앞뒤 K개의 큐브 중심을 근사 이웃으로 돌려준다. 근사 이웃이라 최악의 경우 기대 거리의 √3배까지 멀어질 수 있다. 그래도 LIO의 점 등록에는 영향이 없다는 것이 논문 주장이라고 발표는 소개한다.
- 복잡도는 iVox의 kNN이 O(n)(n은 voxel 내 평균 점 수), iVox-PHC가 O(log n)이다. 트리 기반 방법은 전체 point cloud 크기를 놓고 복잡도를 따진다. voxel 기반은 그렇지 않다. voxel 인덱스를 상수 시간에 계산하니 전체 점 수가 검색 효율에 직접 영향을 주지 않는다고 저자는 강조한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

- 삽입·kNN 시간 그래프 — iVox 계열이 삽입에서 가장 빠르고 kNN은 작거나 중간 크기 문제에서 유리하다. 문제가 아주 커지면 다른 알고리즘에 밀린다.
- recall 대 처리 시간을 보면 낮은 recall 시나리오에서 iVox가 특히 빠르다. 높은 recall을 원하면 voxel을 키우거나 검색 범위를 넓혀야 해서 iVox가 좋은 선택이 아닐 수 있다.
- 각 데이터셋에서 시간을 가장 많이 먹는 단계는 Kalman filter/ICP다. 여기서 Faster-LIO가 FAST-LIO2보다 눈에 띄게 적게 쓴다.
- APE·RPE 비교에서는 FAST-LIO2와 비슷하거나 데이터에 따라 근소하게 밀리는 수준이다. 정확도는 비슷한데 속도는 더 빠르다는 것이 논문 주장이다.
- 최종 처리율은 solid-state LiDAR에서 1000Hz 이상, spinning LiDAR에서 200Hz 이상이다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- PHC 기반 kNN은 근사라서 정확한 최근접 이웃을 보장하지 않는다. 발표자도 방향 전환 시 LRU 삭제가 되레 손해 아니냐는 의문을 제기했다가 골라 지우는 것보다 다 지우고 새로 등록하는 쪽이 효율적이라고 정리했다.
- 자동 자막에서 옮긴 내용이라 수치 인용은 원 논문으로 확인해야 한다. 원 논문 PDF는 아직 wiki에 없다 — 이 페이지가 Faster-LIO의 유일한 근거 자료다.

## 6. 관련 연구 (Related Work)

- 계보: [[physical-ai/xu-2020-fast-lio-a-fast-robust-lidar-inertial]] (FAST-LIO) → FAST-LIO2 → Faster-LIO
- 구현 저장소 [[physical-ai/hku-mars-fast-lio]]의 ikd-Tree가 직접 비교 대상이다

## 7. 용어집 (Glossary)

- iVox (incremental sparse voxel) — 점이 있는 voxel만 해시 맵으로 관리하는 증분 희소 voxel 구조. Faster-LIO의 map 자료구조
- PHC (pseudo Hilbert curve) — 프랙탈 공간 충전 곡선으로 3차원을 1차원 인덱스에 매핑하는 방법. 공간 지역성이 보존돼 근사 kNN에 쓰인다
- LRU cache — 가장 오래 사용되지 않은 항목부터 버리는 캐시. iVox는 이 규칙으로 voxel을 삭제한다
- recall — kNN 검색이 실제 최근접 이웃을 얼마나 빠뜨리지 않고 찾는지의 비율
- APE / RPE — 절대 위치 오차와 상대 위치 오차. odometry 정확도의 표준 지표
