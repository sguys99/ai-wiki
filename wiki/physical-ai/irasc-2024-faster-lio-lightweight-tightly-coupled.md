---
title: "[논문 리뷰] Faster-LIO: Lightweight Tightly Coupled Lidar-Inertial Odometry Using Parallel Sparse..."
type: video
year: 2024
category: physical-ai
source: irasc-2024-faster-lio-lightweight-tightly-coupled.md
raw_path: raw/videos/irasc-2024-faster-lio-lightweight-tightly-coupled.md
raw_filename: "irasc-2024-faster-lio-lightweight-tightly-coupled.md"
source_collection: external
channel: "iRASC Lab: Intelligent Robotics at Gachon Univ"
url: "https://youtu.be/_YEnRYK6CzQ"
duration: "28m59s"
tags: [physical-ai, slam]
---

## 요약 (Summary)

iRASC Lab의 29분짜리 한국어 세미나 발표다 (2024-11). FAST-LIO2가 map 자료구조로 쓰던 ikd-Tree를 해시 기반 희소 voxel 구조 iVox로 바꾼 Faster-LIO를 해설한다. 먼저 iVox와 iVox-PHC의 자료구조와 kNN 검색을 다룬다. 이어 LRU 기반 삭제와 복잡도 분석을 거쳐 효율·정확도 실험까지 논문 순서대로 따라간다. Faster-LIO 원 논문 PDF는 아직 wiki에 없어서 이 페이지가 해당 논문의 유일한 근거 자료다.

## 주요 기여 (Key Contributions)

발표는 Faster-LIO의 요점을 map 자료구조 교체 하나로 좁힌다. 계보를 보면 FAST-LIO는 feature 추출 후 iEKF 융합에 KD-Tree map을 썼고 FAST-LIO2는 direct 방식에 ikd-Tree를 얹었다. ikd-Tree의 연산량은 기존 KD-Tree의 4% 수준이다. Faster-LIO는 그 자리를 iVox로 바꾼다.

- iVox는 점이 있는 voxel만 해시 맵에 저장하는 희소 구조다. 좌표를 voxel 크기로 나눈 인덱스를 해시에 넣으므로 전체 탐색 없이 검색이 끝나고 메모리도 절약된다.
- 점 밀도가 높은 voxel에는 변형인 iVox-PHC를 쓴다. pseudo Hilbert curve로 3차원 공간을 1차원 인덱스에 매핑해 공간 지역성을 유지한 채 근사 kNN을 빠르게 푼다.

## 방법론 및 아키텍처 (Methodology and Architecture)

해시 인덱스는 voxel 좌표 성분마다 소수를 곱한 뒤 XOR로 결합해 만든다. 충돌은 모듈로 연산으로 줄인다. kNN 검색은 쿼리 점이 속한 voxel과 인접 voxel(6·18·26개 확장)을 해시 맵에서 바로 모아 최적의 k개 이웃을 고른다. 삽입할 때는 voxel grid 필터가 한 voxel에 점이 몰리지 않게 막는다. 삭제는 시야 밖 점을 골라내는 대신 LRU cache로 오래 안 쓴 voxel을 통째로 버린다. 정렬되지 않은 맵에 이중 연결 리스트를 붙인 구조라 삽입·삭제가 O(1)이다.

iVox-PHC는 voxel을 세 방향으로 2^K개씩 쪼개 작은 큐브를 만든다. 이 큐브를 PHC 위 위치로 인덱싱하고 큐브마다 내부 점의 중심을 저장한다. kNN은 PHC 인덱스 앞뒤 큐브 중심을 근사 이웃으로 돌려준다. 최악의 경우 기대 거리의 √3배까지 멀 수 있지만 LIO의 점 등록에는 영향이 없다고 논문은 본다. 복잡도는 iVox의 kNN이 O(n)이고(n은 voxel 내 평균 점 수) iVox-PHC가 O(log n)이다. voxel 인덱스가 상수 시간에 나오므로 전체 점 수는 검색 효율에 직접 영향을 주지 않는다고 저자가 강조하는 대목도 함께 옮긴다.

## 결과 (Results)

삽입 시간은 iVox 계열이 가장 빠르고 kNN은 작거나 중간 크기 문제에서 유리하다. 낮은 recall 시나리오에서는 특히 빠르다. 그 대신 높은 recall이 필요하면 voxel을 키우고 검색 범위를 넓혀야 해서 iVox가 좋은 선택이 아닐 수 있다. 이 단서도 발표에서 함께 덧붙인다. 단계별 시간은 Kalman filter/ICP 단계가 지배적인데 Faster-LIO가 FAST-LIO2보다 눈에 띄게 적게 쓴다. APE·RPE 정확도는 FAST-LIO2와 비슷하거나 데이터에 따라 근소하게 밀리는 수준이다. 논문은 비슷한 정확도를 더 빠르게 낸다고 결론짓는다. 최종 처리율은 solid-state LiDAR에서 1000Hz 이상, spinning LiDAR에서 200Hz 이상.

## 관련 페이지 (Related Pages)

- [[physical-ai/xu-2020-fast-lio-a-fast-robust-lidar-inertial]] — 계보의 출발점 FAST-LIO
- [[physical-ai/hku-mars-fast-lio]] — FAST-LIO2 구현 저장소. ikd-Tree가 직접 비교 대상
- [[physical-ai/airlab-2024-fast-lio-a-fast-robust]] — 선행 FAST-LIO 발표 영상
