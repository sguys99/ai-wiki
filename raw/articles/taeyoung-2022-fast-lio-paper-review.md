---
title: "[Paper Review] FAST-LIO 요약 및 설명 - Taeyoung’s Blog"
type: article
year: 2022
category: physical-ai
raw_path: raw/articles/taeyoung-2022-fast-lio-paper-review.md
raw_filename: "taeyoung-2022-fast-lio-paper-review.md"
source_collection: external
author: "Taeyoung Kim"
url: "https://taeyoung96.github.io/research/Fast_LIO/"
publisher: "taeyoung96.github.io"
publication_date: "2022-08-09T00:00:00+09:00"
fetched_at: "2026-08-28T07:34:50+0900"
extractor_tier: "chrome"
tags: []
figures:
  - id: fig01
    file: assets/taeyoung-2022-fast-lio-paper-review/fig01.png
    raw: raw/articles/taeyoung-2022-fast-lio-paper-review-figures/fig01.png
    caption: ""
    strategy: fetched
    curated: false
  - id: fig02
    file: assets/taeyoung-2022-fast-lio-paper-review/fig02.png
    raw: raw/articles/taeyoung-2022-fast-lio-paper-review-figures/fig02.png
    caption: ""
    strategy: fetched
    curated: false
  - id: fig03
    file: assets/taeyoung-2022-fast-lio-paper-review/fig03.png
    raw: raw/articles/taeyoung-2022-fast-lio-paper-review-figures/fig03.png
    caption: ""
    strategy: fetched
    curated: false
  - id: fig04
    file: assets/taeyoung-2022-fast-lio-paper-review/fig04.png
    raw: raw/articles/taeyoung-2022-fast-lio-paper-review-figures/fig04.png
    caption: ""
    strategy: fetched
    curated: false
  - id: fig05
    file: assets/taeyoung-2022-fast-lio-paper-review/fig05.png
    raw: raw/articles/taeyoung-2022-fast-lio-paper-review-figures/fig05.png
    caption: ""
    strategy: fetched
    curated: false
  - id: fig06
    file: assets/taeyoung-2022-fast-lio-paper-review/fig06.png
    raw: raw/articles/taeyoung-2022-fast-lio-paper-review-figures/fig06.png
    caption: ""
    strategy: fetched
    curated: false
  - id: fig07
    file: assets/taeyoung-2022-fast-lio-paper-review/fig07.png
    raw: raw/articles/taeyoung-2022-fast-lio-paper-review-figures/fig07.png
    caption: ""
    strategy: fetched
    curated: false
  - id: fig08
    file: assets/taeyoung-2022-fast-lio-paper-review/page-full.png
    raw: raw/articles/taeyoung-2022-fast-lio-paper-review-figures/page-full.png
    caption: "전체 페이지 스크린샷"
    strategy: screenshot
    curated: false
  - id: fig09
    file: assets/taeyoung-2022-fast-lio-paper-review/crop01.png
    raw: raw/articles/taeyoung-2022-fast-lio-paper-review-figures/crop01.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig10
    file: assets/taeyoung-2022-fast-lio-paper-review/crop02.png
    raw: raw/articles/taeyoung-2022-fast-lio-paper-review-figures/crop02.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig11
    file: assets/taeyoung-2022-fast-lio-paper-review/crop03.png
    raw: raw/articles/taeyoung-2022-fast-lio-paper-review-figures/crop03.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig12
    file: assets/taeyoung-2022-fast-lio-paper-review/crop04.png
    raw: raw/articles/taeyoung-2022-fast-lio-paper-review-figures/crop04.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig13
    file: assets/taeyoung-2022-fast-lio-paper-review/crop05.png
    raw: raw/articles/taeyoung-2022-fast-lio-paper-review-figures/crop05.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig14
    file: assets/taeyoung-2022-fast-lio-paper-review/crop06.png
    raw: raw/articles/taeyoung-2022-fast-lio-paper-review-figures/crop06.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
---

> 수집 메모 — `scripts/fetch_article.py` 가 사용자의 명시적 URL 지시에 따라 가져왔다 (CLAUDE.md rule #1 의 자료 수집 예외). 추출 tier: `chrome`. 본문은 원문 그대로이며 요약·번역·윤문하지 않았다.
> `category` 는 임시값이므로 Step 3 에서 확정할 것.

---

LiDAR-inertial odometry 논문 중 하나인 FAST-LIO를 읽고 요약해보자.

논문은 아래 링크에서 원본을 확인할 수 있다.
 코드도 공개되어 있는데, 현재 FAST-LIO2로 update가 된 상태이다.
 FAST-LIO 알고리즘을 확인하려면 commit 기록을 확인해야 한다.

- FAST-LIO: A Fast, Robust LiDAR-Inertial Odometry Package by Tightly-Coupled Iterated Kalman Filter ([ArXiv](https://arxiv.org/abs/2010.08196), [IEEE RA-L](https://ieeexplore.ieee.org/abstract/document/9372856))
- Github : [hku-mars/FAST_LIO](https://github.com/hku-mars/FAST_LIO)

FAST-LIO의 주요 Contribution 및 특징은 아래와 같다.

- LiDAR data와 IMU data를 Tightly coupled 방법으로 Sensor Fusion을 진행
- LiDAR data는 planar feature와 edge featue를 추출하여 사용
- Iterated error state Kalman Filter를 활용하여 최적화 진행
- Kalman Filter를 활용할 때 Kalman Gain을 구하는 공식을 새롭게 제안
 (Measurment dimension에서 State dimension으로)
- Livox LiDAR만을 활용하여 실험을 주로 진행

논문을 보다보면 어마무시한 수식들에 압도를 당하기 쉬운데.. (난 이미 압도당했다) 이해한 만큼 차근차근 설명을 해보도록 하겠다.

## 1. Introduction Permalink

Introduction에서 인상이 깊었던 것은 Solid state LiDAR에 대한 소개였다. Livox LiDAR는 Solid state LiDAR의 하나의 종류라고 생각하면 되고, Solid state LiDAR의 등장으로 LiDAR를 산업용 드론(UAV)에 장착하여 Mapping을 진행할 수 있게 되었다고 설명한다.

하지만 Solid state LiDAR는 LiDAR SLAM쪽에 새로운 문제를 가져오게 된다.

- 기존의 LOAM에서 사용하는 feature(planar, edge)를 뽑는 방법이 적용되지 않는다.
- 작은 FoV(Field of View)를 가지고 있다.
- LiDAR sample point가 random 하게 나온다.

Solid state LiDAR가 기존의 Spinning LiDAR(=Mechanical LiDAR)와 어떤 차이점이 있는지 이해하면 위에 언급한 내용들을 이해하기 쉬울 것이다. [Livox LiDAR 소개 영상](https://youtu.be/R18CRxwqqU4)을 참고해보자.

이러한 문제점을 해결하기 위해 FAST-LIO에서 다음과 같은 Contribution을 주장하고 있다.

- LiDAR feature points와 IMU data를 Tightly-coupled 결합, iterated Kalman filter 사용
- LiDAR motion distortion을 위해,
 IMU data의 도움을 받아 forward / backward propagation 과정을 제안
- 많은 양의 LiDAR data를 빠르게 처리하기 위해 Kalman Gain을 새롭게 제안
- UAV에서 직접 Indoor / Outdoor에서 실험을 진행

## 2. Overview Permalink

FAST-LIO의 전체적인 Overview는 아래와 같다. 논문 Figure 2.에 왼쪽에 있는 그림이다.

![](https://user-images.githubusercontent.com/41863759/183591460-254ff2f4-0888-49d0-8542-75f5a306a6cf.png)

논문에 Notation이 상당히 많고 헷갈리는데, tk,τi,ρjtk,τi,ρj 는 기본적으로 시간(Timestamp)을 나타내기 위한 Notation이고 II는 IMU pose(=frame)을 나타내고, LL은 LiDAR pose(=frame)을 나타낸다. 또한 xx는 state vector를 나타내는데, 상태에 따라서 Notation을 다르게 한 것이다.

![](https://user-images.githubusercontent.com/41863759/183597611-960fb30a-2402-45eb-94e2-b32bbd4cfb87.png)

전체적인 Overview에 대해 조금 더 설명하자면,

- LiDAR pre-processing 진행
- LiDAR feature points(Planar, edge)의 왜곡 보정을 위해
 Forward Propagation / Backward Propagation을 수행 (논문의 Section 3-C-1, 3-C-2에 해당)
- 왜곡 보정된 LiDAR scan data를 기존에 만들어 놓은(Map)과 차이(residual)을 계산
 (scan-to-Map matching) (논문의 Section 3-C-3에 해당)
- Residual을 활용하여 state를 update한다. state의 값이 수렴할 때까지 반복적으로 수행
 (논문의 Section 3-C-4에 해당)

차근 차근 하나씩 살펴보도록 하자!

우선 FAST-LIO의 경우, IMU pose를 기준으로 odometry를 측정하고, 사용하는 state vector는 아래와 같다. Global frame은 첫번째 들어온 IMU pose를 기준으로 한다.

![](https://user-images.githubusercontent.com/41863759/184074612-73c29afe-5f36-4a96-9e60-d95b14eb2869.png)

uu는 IMU input, ww는 Noise에 대한 parameter이고 function ff의 경우 staet vector xx를 시간에 대해 미분을 수행하는 함수이다.

## 3. LiDAR pre-processing Permalink

FAST-LIO 논문의 경우 Solid state LiDAR를 기준으로 설명을 진행하고 있는데, point cloud가 굉장히 빠른 속도로 들어오기 때문에 20ms20ms를 기준으로 누적을 시킨다. 그 다음, LOAM 논문과 비슷하게 feature points를 뽑게 되는데 planar feature의 경우 LOAM의 방법을 사용하고, edge feature의 경우 LOAM livox의 방법을 사용한다.

마지막으로 뽑힌 LiDAR feature point를 LiDAR scan의 끝으로 설정하고 FAST-LIO에서는 LiDAR scan data에 IMU data를 굳이 align 시키지 않는데 그 이유는 단지, LiDAR scan을 진행할 때 그 사이에 얻어진 IMU data만 사용을 하기 때문이다. 이 부분에 대해서는 Forward Propagation / Backward Propagation에서 좀 더 자세히 설명하도록 하겠다.

## 4. LiDAR motion distortion (Forward Propagation / Backward Propagation) Permalink

기본적으로 LiDAR data를 취득할 때 state가 움직이기 때문에 어떤 하나의 기준 state로 표현하기 위해 왜곡을 보정하는 과정을 거쳐야 한다. 기존의 LiDAR odometry의 경우, 이 과정을 Constant Velocity를 가정하고 왜곡 보정을 진행하는데, LiDAR-inertial odometry의 경우 IMU 센서에서 나오는 각속도 및 가속도로 state vector가 얼마나 움직였는지 계산이 가능하고 이를 통해 state vector를 update한다.

논문 Figure에서는 Forward Propagation / Backward Propagation 과정을 아래처럼 나타내고 있다.

![](https://user-images.githubusercontent.com/41863759/184083246-20b02126-befb-4235-b09d-68aa193e46d6.png)

Forward Propagation이란 IMU data로 state vector를 update하는 과정을 이야기한다. state vector를 update할 때 Covariance matrix도 함께 update를 진행하는데 이때 error state dynamic model을 사용한다. State vector를 update할 때는 아래와 같은 수식이 사용된다. IMU의 Noise는 0으로 가정하고 propagate를 진행한다.

![](https://user-images.githubusercontent.com/41863759/184078167-42bd9e83-e457-4940-927e-9368ba59df43.png)

그리고 Covariance matrix (PP)는 아래와 같이 update를 진행한다.

![](https://user-images.githubusercontent.com/41863759/184078316-feb6c96c-7a29-4918-9d48-256fce74dc97.png)

위 수식에서 F~x,FwFx~,Fw에 대한 Matrix를 만들 때 error state dynamic model을 사용한다고 이해하면 된다.

Forward Propagation으로 state vector를 update가 되면 LiDAR scan이 끝날 시간에 state가 어떻게 변화했는지 알 수 있다. 이렇게 update된 state vector를 이용하여 backward propagation을 진행한다.

Backward propagation이란 scan time 내에 얻어진 LiDAR feature points에 대해서 update된 state vector를 활용하여 LiDAR motion distortion을 하는 과정을 이야기한다.

![](https://user-images.githubusercontent.com/41863759/184084253-c87aabf1-186b-44f0-998a-ca57f5dfda52.png)

위와 같은 수식을 통해 LiDAR points의 samling time에서의 state vector값을 계산할 수 있고, scan time이 끝나는 시점이 state vector와의 relative pose를 통해 모든 point cloud를 ^x,^Px^,P^ 상태로 projection 시킬 수 있다.

FAST-LIO의 경우 기본적으로 LiDAR-IMU extrinsic parameter는 알고 있다고 가정한다.

## 5. State estimation Permalink

FAST-LIO의 경우 filter-based 최적화를 진행하는데, 여기서 사용하는 Filter는 Iterated error state Kalman Filter이다. Iterated error state Kalman Filter의 경우 [이 포스팅](https://taeyoung96.github.io/research/IESKF/)에서 개념을 설명하고 있으므로, 자세한 설명은 생략하도록 하겠다.

### Residual Computation Permalink

먼저 scan to map scan matching을 활용하여 residual 값을 계산한다. 현재 들어오는 scan의 경우 앞서 forward / backward propagation을 통해 얻은 왜곡 보정된 LiDAR point cloud를 사용하고 map의 경우 이전에 global frame을 기준으로 계속 누적된 point cloud를 사용한다.

Point cloud는 pre processing 과정에서 edge 및 planar로 구별하는데 edge feature는 edge끼리 Kd-tree 구조에서 가까운 것끼리 correspondence를 구하고 plane feature는 plane끼리 correspondence를 구하게 된다.

### Iterated State Update Permalink

Iterated error state Kalman Filter의 경우 Update를 할 때 measurement model이 필요하게 되는데 여기서 사용하는 measurement model은 Residual zjzj 값과 prediction state ^xx^, prediction covariance ^PP^가 사용이 된다. 그리고 Iterated라는 단어에서 알 수 있듯이, 원하는 error state의 값이 0에 가깝도록 (일정 threshold 이하도록) 반복적으로 state 값을 update하게 된다.

Iterated State Update 과정이 꽤나 복잡한데.. 여기서 사용하는 Notation에 대한 Physical meaning만 짚어보도록 하겠다. 결론적으로 MAP(Maximum a-posteritori) 문제를 푸는 과정이 최적의 state vector를 찾는 과정이다. 이때 선형화(Linearization) 작업을 진행하면서 여러 Jacobian matrix들이 등장한다.

먼저 measurement model을 만들 때 기본적으로 point cloud의 Noise값을 고려해서 만들게 되는데 이러한 Noise를 LiDAR ranging and beam-directing noise (LjnfjLjnfj)이라 하고 이를 고려한 measurement model은 아래와 같다.

![](https://user-images.githubusercontent.com/41863759/184089687-9c496100-f33c-4860-908f-d9f1632b6003.png)

위 식을 first order approximation을 진행하게 되면 hjhj을 error state xx에 대한 Jacobian matrix HjHj를 구할 수 있게 된다.

![](https://user-images.githubusercontent.com/41863759/184090386-64f7fff0-eb9b-4c2c-a645-8806462bf2bb.png)

Covariance matrix PP의 경우 아래와 같은 식으로 update를 진행한다.

![](https://user-images.githubusercontent.com/41863759/184093591-7c43d96a-114f-44f8-81eb-805bc0a5a61d.png)

여기서 사용되는 Jacobian matrix JJ는

![](https://user-images.githubusercontent.com/41863759/184094030-a88be82c-d08f-4264-a17c-13030cc6e651.png)

위 식을 ~xx~로 편미분을 하면서 생기는 Jacobian matrix로 아래의 식을 통해 구할 수 있다.

![](https://user-images.githubusercontent.com/41863759/184094581-2a1964f7-1a81-4994-a6c6-8fc7d39f9678.png)

![](https://user-images.githubusercontent.com/41863759/184094601-9d3fb4f9-3d87-4741-becd-f2ebbda95e25.png)

Iterated error state Kalman Filter을 사용할 경우 Kalman Gain을 구하는 과정이 필요한데 여기서는 새로운 Kalman Gain 공식을 제안한다. 이 공식이 바로 FAST-LIO에서 주장하고 있는 main contribution이다.

![](https://user-images.githubusercontent.com/41863759/184095971-ecd3e141-f75a-45a8-9946-646b1ccabf79.png)

위와 같은 형태로 Kalman Gain을 바꾸면서 Measurment dimension에서 State dimension으로 Matrix dimension이 바뀌었는데, Measurement는 Point cloud의 dimension을 말한다. 즉, 들어오는 point cloud의 수가 많아지면 많아질수록 dimension이 커져 연산량이 엄청나게 늘어나게 되는데, 이를 state dimension, 즉 state vector의 dimension에만 영향을 받게되면 들어오는 point cloud의 수에 관계없이 빠르게 Kalman Gain 값을 구할 수 있게 된다.

위 식에서 RR은 covariance matrix를 나타낸 것이다. Kalman Gain까지 구하면 error state가 수렴할 때까지 State를 update한다. 수렴을 하게 되면 아래와 같이 optimal한 state vector와 Covariance matrix를 구할 수 있게 된다.

![](https://user-images.githubusercontent.com/41863759/184095984-b77d66c5-fb3d-4701-a1b9-09b263cfa93d.png)

State estimation 과정을 정리하면 아래와 같다.

![](https://user-images.githubusercontent.com/41863759/184086245-9b490947-cbcf-447b-a8cf-2eaea04e2628.png)

## 6. Map update & Initialization Permalink

### Map update Permalink

Residual을 만들 때, scan to map scan matching 방법을 이용하는데 map은 단순하게 optimal state에서 얻어낸 Point cloud (feature point)를 단순히 global frame으로 변환하여 저장을 한다.

![](https://user-images.githubusercontent.com/41863759/184114622-9ecac7e2-fd4b-40f4-b05a-b768d32bd887.png)

### Initialization Permalink

FAST-LIO의 초기 state vector의 값들을 결정 짓기 위해 LiDAR 및 IMU data를 몇 초간 정지를 한 다음, 좋은 초기 값들을 얻어낸다. 예를 들어 bias, noise covariance, gravity vector 등등…) Solid State LiDAR의 한 종류인 Livox의 경우, 정지를 하면 할 수록 높은 point cloud resolution을 얻을 수 있다.

## 7. Experiment Permalink

실험에 대한 결과는 FAST-LIO 동영상을 참고하면 쉽게 이해할 수 있다.
 드론에 LiDAR를 달고 odometry를 구하는게 정말 신기하다.

- Youtube : [Link](https://youtu.be/iYCY6T79oNU)

![](https://user-images.githubusercontent.com/41863759/184117028-242337e8-75c1-49dd-8dd3-ab1ea4903b57.png)

이렇게 해서 FAST-LIO의 요약을 마치도록 하겠다. 😄

 포스팅 후 광고 넣기 , 출처 : https://shryu8902.github.io/jekyll/adsense/ gpage.taeyoung96 

#### 공유하기

[Twitter](https://twitter.com/intent/tweet?text=%5BPaper+Review%5D+FAST-LIO+%EC%9A%94%EC%95%BD+%EB%B0%8F+%EC%84%A4%EB%AA%85%20https%3A%2F%2Ftaeyoung96.github.io%2Fresearch%2FFast_LIO%2F)[Facebook](https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Ftaeyoung96.github.io%2Fresearch%2FFast_LIO%2F)[LinkedIn](https://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Ftaeyoung96.github.io%2Fresearch%2FFast_LIO%2F)

#### 댓글남기기
