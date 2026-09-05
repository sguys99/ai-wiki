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

## 요약

Faster-LIO 논문을 29분 동안 해설한 한국어 세미나 발표 녹화다. 가천대 iRASC Lab이 2024년 11월에 공개했고, 발표는 이 논문을 IEEE Robotics and Automation Letters(RA-L) 게재 논문으로 소개하며 발표 시점 기준 인용 175회를 언급한다.

Faster-LIO의 기여는 map 자료구조 교체 한 가지로 좁혀진다. FAST-LIO2가 map 관리에 쓰던 ikd-Tree를 해시 기반 희소 voxel 구조인 iVox로 바꾸어 검색과 갱신 비용을 낮춘 연구다.

odometry는 LiDAR나 IMU 같은 센서로 이동량을 누적해 로봇의 상대 위치를 추정하는 방법을 말한다. LiDAR-inertial odometry(LIO)는 매 scan마다 수만 개의 point를 기존 map에 맞춰야 하므로 map 자료구조가 곧 처리 속도를 결정한다. 따라서 자료구조 하나를 바꾼 것이 전체 처리율을 끌어올리는 결과로 이어진다.

발표는 논문의 전개 순서를 그대로 따라간다. FAST-LIO와 FAST-LIO2를 배경으로 깔고, iVox의 자료구조와 kNN search, 삽입과 LRU 기반 삭제, iVox-PHC 변형, 복잡도 분석을 거쳐 효율과 정확도 실험으로 마무리한다. Faster-LIO 원 논문 PDF는 아직 이 저장소에 없어서 이 페이지가 해당 논문의 유일한 근거 자료다.

## 배경

### LiDAR와 IMU의 데이터 특성

LIO가 두 센서를 융합하는 이유는 갱신 주기와 정보의 성격이 서로 다르기 때문이다. 발표에 따르면 IMU는 초당 100~250회 갱신되는 반면, LiDAR는 point 하나당 100~500 kHz 속도로 측정한 값을 모아 한 scan 단위로 내보낸다.

scan 주기를 10Hz에서 100Hz 사이로 가정하면 scan 한 번이 도는 동안 IMU 측정값이 여러 개 쌓인다. 즉 두 센서의 측정 시점이 서로 어긋나므로, scan 도중 로봇이 움직여 생긴 왜곡을 IMU로 되짚어 보정하는 단계가 반드시 들어간다.

### FAST-LIO의 처리 흐름

FAST-LIO는 LiDAR와 IMU를 tightly-coupled 방식으로 융합하는 odometry 파이프라인이다. 발표가 소개하는 처리 단계는 다섯 가지다.

| 단계 | 내용 |
|---|---|
| feature 추출 | scan에서 edge나 plane 같은 의미 있는 point만 골라낸다 |
| back-propagation | scan 중 로봇이 움직여 생긴 point별 왜곡을 IMU로 되짚어 보정한다 |
| iterated extended Kalman filter | 보정된 측정값으로 상태 추정치를 반복 갱신한다 |
| kNN search | 현재 point와 주변 map point의 대응 관계를 찾는다 |
| KD-Tree mapping | 보정된 데이터를 KD-Tree에 등록해 local map을 갱신한다 |

kNN search는 질의점에서 가장 가까운 k개의 point를 찾는 연산이다. LIO에서는 scan 안의 모든 point마다 이 연산이 수행되므로, kNN search를 담당하는 map 자료구조가 전체 처리 시간을 좌우한다. 파이프라인의 마지막 단계에서 이 결과가 odometry 데이터로 정리되어 로봇의 위치 정보로 제공된다.

### FAST-LIO2의 direct 방식과 ikd-Tree

FAST-LIO2는 FAST-LIO에서 두 가지를 바꿨다. 첫째로 feature 추출 단계를 없애고 point cloud를 그대로 정합에 쓰는 direct 방식으로 전환했다. point cloud는 LiDAR가 반환한 3D point의 집합을 말한다.

둘째로 map 자료구조를 KD-Tree에서 ikd-Tree로 교체했다. ikd-Tree는 삽입과 삭제를 증분으로 처리하는 KD-Tree 변형이고, 발표는 기존 KD-Tree 대비 4% 수준의 연산량만 쓴다고 소개한다.

Faster-LIO는 이 계보의 다음 단계에 해당한다. 즉 FAST-LIO2의 나머지 구조는 그대로 두고 ikd-Tree 자리만 iVox로 교체한 연구다.

## 핵심 개념

### voxel과 희소 표현

voxel은 3차원 공간을 일정한 크기의 정육면체로 나눈 한 칸을 말한다. 공간 전체를 voxel로 채워 표현하면 관리가 단순한 대신 빈 공간까지 저장해야 하므로 메모리 낭비가 크다.

iVox는 point가 실제로 들어 있는 voxel만 저장하는 희소 표현을 쓴다. 따라서 공간 전체를 표현하려는 volume 기반 표현보다 저장량이 적고 구조도 간결하다.

### 해시 맵 인덱싱

해시 맵은 키를 정해진 범위의 정수로 바꿔 값을 곧바로 찾아가는 자료구조다. iVox는 voxel의 좌표를 키로 삼아 해시 맵에 넣으므로, 원하는 voxel을 찾을 때 저장된 전체를 순회할 필요가 없다.

이 성질이 트리 기반 구조와의 차이를 만든다. 트리는 뿌리에서 잎까지 내려가며 비교를 반복하지만, 해시 맵은 인덱스를 계산해 한 번에 접근한다.

### LRU cache

LRU cache는 가장 오래 사용되지 않은 항목부터 버리는 캐시 교체 규칙이다. iVox는 이 규칙으로 map에서 쓰이지 않는 voxel을 정리한다.

구현은 해시 맵과 이중 연결 리스트를 함께 쓴다. 해시 맵이 키로 항목에 바로 접근하고 이중 연결 리스트가 사용 순서를 관리하므로, 삽입과 삭제가 모두 O(1)에 끝난다.

### PHC와 공간 지역성

PHC(pseudo Hilbert curve)는 3차원 공간을 빠짐없이 지나는 프랙탈 곡선으로, 공간상의 위치를 곡선 위 1차원 인덱스로 바꿔준다. 이렇게 저차원 곡선으로 고차원 공간을 채우는 곡선을 space filling curve라 부른다.

핵심 성질은 공간 지역성 보존이다. 3차원에서 가까운 두 점은 곡선 위 인덱스에서도 가까이 놓이므로, 1차원 인덱스만 비교해도 근처 point를 찾을 수 있다.

## 방법

### iVox의 해시 인덱스 계산

iVox는 입력 point cloud를 희소 voxel로 저장하고 그 인덱스를 해시 함수로 변환해 `unordered_map`에 넣는다. 계산은 두 단계로 나뉜다.

첫 단계는 좌표를 voxel 위치로 바꾸는 것이다. point의 공간 좌표를 voxel 한 변의 크기 s로 나누면 그 point가 속한 voxel의 위치 v가 나온다. 나눗셈 한 번으로 소속 voxel을 알 수 있으므로 전체를 탐색하지 않아도 된다.

두 번째 단계는 voxel 위치 v를 해시값으로 바꾸는 것이다. v의 세 좌표 성분에 각각 서로 다른 소수를 곱한 뒤 XOR로 결합해 고유한 해시 인덱스를 만든다. 소수를 곱하는 이유는 서로 다른 좌표 조합이 같은 값으로 겹치는 충돌을 줄이기 위해서다.

마지막으로 모듈로 연산을 걸어 해시값을 0부터 N-1 사이로 제한한다. 즉 해시 테이블 크기 안으로 값을 눌러 넣으면서 충돌 가능성을 최소화한다.

### kNN search

iVox의 kNN search는 질의점이 속한 voxel과 그 이웃 voxel만 뒤진다. 발표가 소개하는 순서는 세 단계다.

- 질의점 p의 좌표로 소속 voxel 인덱스 v를 계산한다.
- v의 인접 voxel을 넓혀 가며 후보를 모은다. 면을 맞댄 6개에서 시작해 18개, 26개까지 확장한다.
- 모은 후보를 병합하고 그중 가장 가까운 k개를 고른다.

인접 voxel 확장이 싼 이유는 해시 맵에 이미 모든 voxel 인덱스가 들어 있기 때문이다. 인접 voxel의 좌표를 계산해 해시 맵에 물어보면 곧바로 찾을 수 있으므로, 소속 voxel과 인접 voxel이 같은 비용으로 접근된다.

### 삽입과 voxel grid 필터

삽입 단계의 목표는 한 voxel에 point가 지나치게 몰리는 것을 막는 데 있다. voxel 안의 point 수가 늘면 kNN search에서 비교할 후보가 늘어 성능이 떨어지기 때문이다.

iVox는 FAST-LIO2와 같은 voxel grid 필터를 써서 불필요한 삽입을 생략한다. 인접 이웃의 voxel 인덱스는 이미 계산해 두었으므로, 새 point보다 voxel grid 중심에 더 가까운 이웃이 이미 있으면 그 point는 삽입하지 않는다.

결과적으로 중복 데이터가 줄어 저장량과 검색 비용이 함께 낮아진다.

### LRU 기반 삭제

삭제는 iVox가 트리 기반 구조와 가장 크게 달라지는 지점이다. 로봇이 이동하면 시야에서 벗어나 더는 쓰이지 않는 voxel이 생기는데, KD-Tree처럼 전체 구조를 순회하며 오래된 데이터를 골라 지우는 방식은 비용이 크다.

iVox는 시야 밖 point를 능동적으로 찾아 지우는 대신 LRU cache에 삭제를 맡긴다. 즉 오래 쓰이지 않은 voxel부터 통째로 버리므로 삭제에 드는 시간 복잡도가 크게 줄어든다. 오래된 데이터 때문에 생기는 처리 지연도 함께 사라진다.

발표자는 이 대목에서 자신이 품었던 의문과 그에 대한 답을 함께 제시한다. 차량이 주행하다 방향을 바꾸면 방금 버린 오래된 point가 다시 필요해지므로 손해가 아니냐는 물음이었다. 발표자는 삭제 대상을 트리에서 골라내는 비용보다 전부 지우고 새로 등록하는 비용이 더 싸다는 쪽으로 답을 붙인다.

발표는 용어 사용에 대한 단서도 덧붙인다. iVox의 설명 맥락에서는 point 하나가 voxel 하나로 취급되는 경우가 있어, 발표자가 point를 voxel이라고 부른 대목이 있다는 안내다.

### iVox-PHC

iVox-PHC는 point 밀도가 높은 voxel을 위한 변형이다. 단순 iVox는 point가 희소한 환경에서 성능이 좋은 반면, 한 voxel에 point가 많이 쌓이면 후보 비교가 늘어 kNN search가 느려지기 때문이다.

구현은 voxel을 잘게 쪼개는 데서 시작한다. voxel 한 변을 2^K등분해 (2^K)^3개의 작은 큐브를 만들고, 각 큐브에 PHC 위 위치에 따라 0부터 (2^K)^3 - 1까지 인덱스를 붙인다. 여기서 K는 곡선의 차수이며 큐브를 얼마나 잘게 나눌지를 정한다. 발표는 voxel 크기의 일반적인 설정값으로 0.5를 들고, 단위는 따로 언급하지 않는다.

각 큐브는 내부 point 전체의 중심 한 점만 저장한다. 새 point가 그 큐브 범위에 들어오면 저장된 중심이 갱신된다. 즉 큐브 안의 여러 point를 대표점 하나로 압축하는 구조다.

kNN search는 1차원 인덱스 위에서 처리된다. 질의점이 속한 큐브의 PHC 인덱스를 구한 뒤 그 앞뒤로 k번째까지의 큐브 중심을 가까운 이웃으로 돌려주면 된다. 3차원 거리 계산을 반복하는 문제가 정렬된 1차원 배열을 훑는 문제로 바뀐다.

발표는 두 방향의 변환 함수를 나눠 설명한다. 정방향 함수 h는 3차원 공간의 한 점을 1차원 인덱스로 옮기고, 역함수는 1차원 인덱스를 다시 3차원 큐브 위치로 되돌린다. 역함수가 있기 때문에 인덱스만 보고도 실제 공간상의 위치를 되짚을 수 있다.

### 검색 파라미터

iVox-PHC의 탐색 범위는 여러 파라미터가 함께 결정한다. 발표가 짚은 항목은 다음과 같다.

| 기호 | 뜻 | 역할 |
|---|---|---|
| `R_s` | 검색 반경 | 이 거리를 넘어서는 큐브는 탐색하지 않는다 |
| `L_v` | voxel의 물리적 크기 | length of voxel의 약자로 읽힌다 |
| `K` | PHC 차수 | 큐브를 (2^K)^3개로 나누는 세밀도를 정한다 |
| `ρ` | 인덱스 기준 탐색 폭 | 검색 반경을 voxel 크기로 환산해 얻는 값 |

탐색 폭은 검색 반경을 voxel 크기로 나눈 비율에 밑이 2인 로그를 취해 구한다. 여기에 올림을 적용해 정수로 맞추는데, 반올림을 쓰면 실제로 가까운 이웃을 놓칠 수 있으므로 반드시 올림이어야 한다. 올림한 값을 다시 2의 지수로 되돌리면 탐색할 큐브 개수가 나오고, 여기에 8을 곱해 3차원의 모든 방향으로 확장된 범위를 얻는다.

최종 검색 범위는 이웃 개수 k와 탐색 폭 ρ 중 작은 값으로 제한한다. 즉 둘 중 작은 쪽을 택해야 불필요하게 멀리 있는 이웃까지 뒤지지 않으면서 정확한 kNN 결과를 얻는다.

### 근사 정확도와 복잡도

PHC 기반 kNN search는 정확한 답이 아니라 근사값을 돌려준다. 3차원 공간을 1차원으로 눌러 담는 과정에서 지역성이 완전히 보존되지는 않기 때문이다.

발표는 오차의 상한을 함께 소개한다. 충분히 큰 공간에서 PHC로 찾은 가장 가까운 이웃은 기대 거리보다 최대 √3배까지 멀 수 있다. 다만 논문은 실험을 근거로 이 근사가 LIO의 정합 단계에는 영향을 주지 않는다고 주장한다.

시간 복잡도는 두 구조가 다르다.

| 구조 | kNN search 복잡도 | 근거 |
|---|---|---|
| iVox | O(n) | voxel 내부의 point를 질의점과 하나씩 비교한다 |
| iVox-PHC | O(log n) | 1차원으로 정렬된 배열에서 PHC 인덱스만 검색한다 |
| iVox-PHC (최악) | O(log((2^K)^3)) | 곡선 차수가 K일 때 큐브 개수가 상한이 된다 |

여기서 n은 전체 point 수가 아니라 voxel 하나에 든 평균 point 수다. point cloud는 삽입 전에 downsampling을 거치므로, 즉 일정 간격으로 point를 솎아낸 뒤 등록되므로 n이 일반적으로 작다. 따라서 복잡도 차이가 실제 성능에 미치는 영향은 제한적이라고 논문은 본다.

저자가 강조하는 지점은 복잡도의 기준 자체가 다르다는 사실이다. 트리 기반 방법은 트리를 전체 point cloud로 만들기 때문에 전체 point 수를 놓고 검색 복잡도를 논한다. 반면 voxel 기반 방법은 voxel 인덱스를 상수 시간에 계산하므로, 전체 point 수가 검색 효율에 직접 영향을 주지 않는다.

## 결과

### 삽입과 kNN 질의 시간

발표가 먼저 제시하는 그래프는 point 개수를 바꿔 가며 삽입 시간과 kNN search 시간을 잰 것이다. 삽입에서는 iVox와 iVox-PHC가 가장 빠르다.

kNN search에서는 조건이 붙는다. iVox 계열은 작거나 중간 크기의 문제에서 좋은 효율을 보이지만, 문제 크기가 아주 커지면 다른 알고리즘보다 오히려 느려진다.

### recall과 처리 시간

recall은 kNN search가 실제로 가장 가까운 이웃을 빠뜨리지 않고 찾아내는 비율이다. 발표는 recall 수준별 처리 시간을 비교한 표로 iVox의 적용 범위를 짚는다.

recall이 낮아도 되는 시나리오에서는 iVox가 다른 방법보다 훨씬 빠르다. 반면 높은 recall이 필요하면 voxel 크기를 키우거나 검색 범위를 넓혀야 하므로 iVox가 좋은 선택이 아닐 수 있다.

발표자는 이 두 조정이 recall을 올리는 이유를 따로 풀이한다.

- voxel 크기를 키우면 한 voxel에 담기는 point가 늘어난다. 즉 질의점 주변의 더 넓은 영역이 한 voxel로 덮이므로 실제로 가까운 이웃이 그 안에 포함될 가능성이 커진다. 반대로 voxel이 작으면 가까운 이웃이 voxel 바깥에 놓여 검색 결과에서 빠질 수 있다.
- 검색 범위를 넓히면 더 먼 거리의 point까지 후보에 들어온다. 검색 범위가 좁을 때 범위 밖에 있어 누락되던 근접 이웃이 결과에 포함되므로 recall이 올라간다.

### 단계별 처리 시간

각 데이터셋에서 시간을 가장 많이 쓰는 단계는 Kalman filter와 ICP 구간이다. 발표는 데이터셋마다 Faster-LIO와 FAST-LIO2의 막대를 나란히 놓은 그래프로 이 구간을 비교하고, Faster-LIO가 눈에 띄게 적은 시간을 쓴다고 설명한다.

이어지는 표는 단계를 더 잘게 나눈 것이다. 전처리와 pose 계산 단계의 평균 처리 시간을 비교하면 Faster-LIO가 대부분 항목에서 가장 빠르다.

| 표기 | 뜻 |
|---|---|
| 전처리 | 왜곡 제거와 downsampling 단계 |
| pose 계산 | 자세와 위치를 추정하는 단계 |
| SPD Inc | speed increase의 줄임말. FAST-LIO2 대비 속도 증가폭 |
| 대시 | drift가 너무 크거나 입력 데이터가 부족해 측정하지 못한 항목 |

### 정확도

정확도는 APE와 RPE 두 지표로 평가한다. APE는 절대 위치 오차이고, RPE는 상대 위치 오차로서 100m를 주행하는 동안 발생하는 위치 drift 비율을 백분율로 나타낸다.

두 지표 모두에서 FAST-LIO2의 오차도 상당히 작다. 데이터셋에 따라서는 FAST-LIO2가 근소하게 더 정확하다.

논문의 결론은 정확도가 아니라 효율에 놓인다. 즉 정확도는 FAST-LIO2와 비슷한 수준을 유지하면서 처리 시간이 더 짧으므로 종합적인 효율이 낫다는 주장이다. 발표는 마지막 표를 FAST-LIO2의 mapping 모듈에서 scan 하나를 처리하는 데 드는 시간 비교로 소개하고, iVox 쪽이 훨씬 빨랐다고 덧붙인다.

### 처리율

공개 데이터셋 실험에서 Faster-LIO는 solid-state LiDAR에서 1000Hz 이상, spinning 방식 LiDAR에서 200Hz 이상의 처리율을 기록했다. 즉 solid-state LiDAR 입력이라면 초당 1000회 넘게 scan을 처리한다는 뜻이다.

solid-state LiDAR는 회전 기구 없이 프리즘이나 MEMS로 주사하는 신형 LiDAR를 말한다. 두 종류 모두에서 기존 LIO 시스템보다 빠르면서 정확도는 비슷한 수준을 유지한다는 것이 논문의 최종 주장이다.

## 한계

- PHC 기반 kNN search는 근사다. 정확한 이웃을 보장하지 않으며 최악의 경우 기대 거리의 √3배까지 멀어질 수 있다. 논문은 LIO의 정합 단계에 영향이 없다고 보지만, 이는 실험적 근거에 기댄 주장이다.
- 높은 recall이 필요한 용도에는 적합하지 않을 수 있다. recall을 올리려면 voxel 크기와 검색 범위를 함께 키워야 하는데, 그러면 iVox의 속도 이점이 줄어든다.
- kNN search의 이점이 문제 크기에 따라 달라진다. 작거나 중간 크기에서는 유리하지만 아주 큰 문제에서는 다른 알고리즘에 밀린다.
- 정확도 자체는 FAST-LIO2를 넘어서지 못한다. 데이터셋에 따라 FAST-LIO2가 근소하게 앞서며, Faster-LIO의 이점은 속도에 있다.
- 이 페이지는 자동 자막에서 옮긴 내용이라 수치 인용은 원 논문으로 확인해야 한다. Faster-LIO 원 논문 PDF는 아직 이 저장소에 없다.

## 발표 노트

이 페이지의 근거는 논문이 아니라 발표 녹화다. 따라서 자료를 읽을 때 참고할 사항을 따로 적어 둔다.

- 발표는 논문의 절 구성을 그대로 따라간다. 배경, 자료구조, kNN search, mapping, 복잡도, 실험 순서이므로 원 논문과 대응시키기 쉽다.
- 자막이 한국어 자동 자막이라 고유명사 오인식이 있다. iVox가 "아이보스"나 "아이복스"로, Faster-LIO가 "패스터 리오"로 옮겨진 대목이 많다.
- 발표자가 논문 내용에 자신의 해설을 덧붙인 곳이 두 군데다. LRU 삭제가 방향 전환 시 손해가 아닌지 검토한 대목과, voxel 크기와 검색 범위가 recall을 올리는 이유를 풀이한 대목이다.
- 수식 유도보다 자료구조의 동작을 그림으로 설명하는 비중이 크다. 따라서 수식 자체가 필요하면 원 논문을 함께 봐야 한다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| iVox | point가 있는 voxel만 해시 맵으로 관리하는 증분 희소 voxel 구조. Faster-LIO의 map 자료구조 |
| iVox-PHC | voxel을 작은 큐브로 쪼개 PHC 인덱스로 관리하는 iVox 변형. point 밀도가 높은 voxel에 쓴다 |
| PHC | pseudo Hilbert curve. 3차원 공간을 1차원 인덱스로 매핑하는 프랙탈 곡선. 공간 지역성이 보존된다 |
| LRU cache | 가장 오래 사용되지 않은 항목부터 버리는 캐시 교체 규칙. iVox는 이 규칙으로 voxel을 삭제한다 |
| recall | kNN search가 실제로 가장 가까운 이웃을 빠뜨리지 않고 찾아내는 비율 |
| APE / RPE | 절대 위치 오차와 상대 위치 오차. odometry 정확도의 표준 지표 |

## 관련 페이지

- [[physical-ai/xu-2020-fast-lio-a-fast-robust-lidar-inertial]]: 계보의 출발점인 FAST-LIO 원 논문. feature 추출과 iEKF 융합 구조의 근거.
- [[physical-ai/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry]]: FAST-LIO2 원 논문. Faster-LIO가 교체 대상으로 삼은 direct 방식과 ikd-Tree를 다룬다.
- [[physical-ai/hku-mars-fast-lio]]: FAST-LIO 계열 공식 구현 저장소. ikd-Tree의 실제 구현과 실행 방법.
- [[physical-ai/airlab-2024-fast-lio-a-fast-robust]]: FAST-LIO 논문을 다룬 다른 한국어 발표 영상. 이 페이지의 배경 절과 겹치는 내용을 더 자세히 다룬다.
- [[physical-ai/taeyoung-2022-fast-lio-paper-review]]: FAST-LIO 논문의 한국어 리뷰 글.
- [[overviews/physical-ai-overview]]: physical-ai 카테고리의 분류 뼈대와 학습 경로 허브.
