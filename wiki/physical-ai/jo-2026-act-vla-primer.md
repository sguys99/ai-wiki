---
title: "03-05. ACT - 모두의 로보틱스 - VLA 입문"
type: article
year: 2026
category: physical-ai
source: jo-2026-act-vla-primer.md
raw_path: raw/articles/jo-2026-act-vla-primer.md
raw_filename: "jo-2026-act-vla-primer.md"
source_collection: external
author: "조인령"
url: "https://wikidocs.net/366371"
publisher: "WikiDocs"
tags: [physical-ai, imitation-learning, manipulation, robot-learning]
figures:
  - id: fig01
    file: assets/jo-2026-act-vla-primer/fig01.png
    raw: raw/articles/jo-2026-act-vla-primer-figures/fig01.png
    caption: "정밀 조작 과제 예시 — 배터리 슬롯 끼우기·컵 뚜껑 열기처럼 밀리미터 단위 오차에도 실패하는 작업들"
    strategy: fetched
    curated: false
  - id: fig02
    file: assets/jo-2026-act-vla-primer/fig02.png
    raw: raw/articles/jo-2026-act-vla-primer-figures/fig02.png
    caption: "policy network(오른쪽 절반) — 4개 카메라 이미지가 CNN을 거쳐 transformer encoder로 들어가고 decoder가 action sequence를 낸다"
    strategy: fetched
    curated: false
  - id: fig03
    file: assets/jo-2026-act-vla-primer/fig03.png
    raw: raw/articles/jo-2026-act-vla-primer-figures/fig03.png
    caption: "Temporal Ensembling 도식 — 매 timestep 겹쳐 예측된 action chunk 중 같은 실행 시점의 값을 가중 평균 [0.5,0.3,0.2,0.1]한다 (ACT 논문 Figure 3)"
    strategy: fetched
    curated: true
  - id: fig04
    file: assets/jo-2026-act-vla-primer/fig04.png
    raw: raw/articles/jo-2026-act-vla-primer-figures/fig04.png
    caption: "ACT 전체 구조 — 왼쪽은 학습 때만 쓰는 CVAE encoder([CLS]+joints+action→z), 오른쪽은 실행 때 쓰는 policy(카메라+joints+z→action sequence) (ACT 논문 Figure 2)"
    strategy: fetched
    curated: true
  - id: fig05
    file: assets/jo-2026-act-vla-primer/fig05.png
    raw: raw/articles/jo-2026-act-vla-primer-figures/fig05.png
    caption: "ACT Transformer 구조 개요 — fig04와 거의 동일한 전체 아키텍처 도식(본문 3장 도입부에 재게재)"
    strategy: fetched
    curated: false
  - id: fig06
    file: assets/jo-2026-act-vla-primer/fig06.png
    raw: raw/articles/jo-2026-act-vla-primer-figures/fig06.png
    caption: "CVAE encoder(왼쪽 절반) — [CLS] 토큰과 현재 joints, 시연 action sequence를 받아 latent z의 평균·분산을 낸다"
    strategy: fetched
    curated: true
  - id: fig07
    file: assets/jo-2026-act-vla-primer/fig07.png
    raw: raw/articles/jo-2026-act-vla-primer-figures/fig07.png
    caption: "policy의 encoder 입력 구성 — cam 1~4의 시각 특징과 joints, z가 transformer encoder로 함께 들어간다(decoder 생략)"
    strategy: fetched
    curated: false
  - id: fig08
    file: assets/jo-2026-act-vla-primer/fig08.png
    raw: raw/articles/jo-2026-act-vla-primer-figures/fig08.png
    caption: "저자 제작 ResNet18/CNN 설명 인포그래픽(한글) — 4개 RGB 이미지가 ResNet18을 거쳐 시각 특징으로, residual 연결·CNN 개념 보조 설명"
    strategy: fetched
    curated: true
  - id: fig09
    file: assets/jo-2026-act-vla-primer/fig09.png
    raw: raw/articles/jo-2026-act-vla-primer-figures/fig09.png
    caption: "Transformer decoder 흐름 — encoder 출력과 미래 시점별 위치 임베딩을 받아 action sequence를 만든다(전체 아키텍처 재게재)"
    strategy: fetched
    curated: false
  - id: fig10
    file: assets/jo-2026-act-vla-primer/fig10.png
    raw: raw/articles/jo-2026-act-vla-primer-figures/fig10.png
    caption: "저자 제작 MLP 설명 인포그래픽(한글) — 512차원 표현을 은닉층 2개를 거쳐 14개 관절 목표값으로 바꾸는 출력 헤드"
    strategy: fetched
    curated: false
  - id: fig11
    file: assets/jo-2026-act-vla-primer/page-full.png
    raw: raw/articles/jo-2026-act-vla-primer-figures/page-full.png
    caption: "전체 페이지 스크린샷 (아카이브용)"
    strategy: screenshot
    curated: false
---

## 요약 (Summary)

ACT(Zhao 2023) 논문을 처음 읽는 사람을 위한 한국어 입문 해설이다. "모두의 로보틱스 - VLA 입문" 시리즈 03-05편으로, 앞 두 편인 [[physical-ai/jo-2026-rt-1-vla-primer]]와 [[physical-ai/jo-2026-rt-2-vla-primer]]가 action을 텍스트 토큰으로 다루는 흐름을 짚었다면 이 편은 그보다 앞선 ACT로 돌아간다. ACT의 발상을 한 줄로 줄이면 "다음 한 동작이 아니라 앞으로 이어질 여러 동작을 한 묶음으로 예측한다"이다. imitation learning은 시연 데이터를 흉내 내 policy를 학습하는 방법이고 policy는 현재 observation을 받아 다음 action을 정하는 함수다. 한 동작씩 예측하면 작은 오차가 다음 상태를 낯설게 만들고 그 위에서 오차가 더 커지는 compounding error가 쌓이는데 ACT는 예측 단위를 여러 시점의 action 묶음(action chunk)으로 바꿔 이 문제를 줄인다. 원 논문 자체는 이미 [[physical-ai/zhao-2023-learning-fine-grained-bimanual-manipulation]]으로 wiki에 들어와 있어, 이 페이지는 그 논문을 읽기 전 몸풀기로 쓰는 편이 맞다.

![[assets/jo-2026-act-vla-primer/fig04.png]]
*Figure 2: ACT 전체 구조. 왼쪽은 학습 때만 쓰는 CVAE encoder로 [CLS]·joints·시연 action을 받아 latent z를 만들고, 오른쪽 policy는 4개 카메라 이미지·현재 joints·z를 받아 앞으로의 action sequence를 낸다 (조인령 2026, ACT 논문 Figure 2).*

## 방법론 및 아키텍처 (Methodology and Architecture)

### action chunking

ACT는 예측 단위 자체를 바꿨다. 기존 imitation learning은 현재 observation을 보고 다음 한 동작만 고른다. action chunking은 앞으로 이어질 여러 시점의 동작을 하나의 묶음으로 예측한다. 이렇게 하면 로봇이 연속으로 정확한 판단을 유지해야 하는 유효 길이가 줄어든다. 100개의 작은 동작으로 이루어진 과제를 매 순간 하나씩 맞히려면 100번을 연달아 성공해야 하지만 여러 동작을 묶으면 전체를 더 짧은 행동 단위로 다룰 수 있다. 입력은 위·앞·양 손목 4개 카메라의 480×640 RGB 이미지와 두 팔의 현재 관절값 14개이고, 출력은 앞으로 여러 시점에서 로봇이 도달해야 할 14차원 관절 목표값의 흐름이다. RT-1·RT-2·OpenVLA가 action을 여러 구간으로 나눠 토큰으로 예측하는 것과 달리, ACT는 각 관절의 목표 위치를 연속적인 수치값으로 직접 낸다.

### Temporal Ensembling

action chunk를 예측한다고 문제가 다 풀리는 것은 아니다. observation을 한 번 보고 k개 action을 그대로 연속 실행하면 open-loop 제어에 가까워져 중간에 들어오는 새 시각 정보를 반영하지 못하고 움직임이 뚝뚝 끊긴다. Temporal Ensembling은 매 timestep마다 chunk를 새로 예측하되, 서로 겹쳐 예측된 값 중 같은 실행 시점에 해당하는 것만 모아 가중 평균한다. 인접한 시간의 동작을 섞는 단순 smoothing과 달리 같은 미래 시점을 여러 번 예측한 값들만 평균하므로, 움직임을 부드럽게 만들면서도 값이 엉뚱한 방향으로 치우치는 문제를 줄인다.

![[assets/jo-2026-act-vla-primer/fig03.png]]
*Figure 3: Temporal Ensembling. 매 timestep 새로 예측된 action chunk들이 시간축에서 겹치고, 같은 실행 시점(t)에 해당하는 후보들을 [0.5,0.3,0.2,0.1] 같은 가중치로 평균해 최종 action을 정한다 (조인령 2026, ACT 논문 Figure 3).*

### CVAE와 latent z

Transformer 학습 구조를 이해하려면 CVAE가 먼저다. CVAE는 VAE에 조건 정보를 더한 조건부 생성 모델로, 특정 입력 조건에서 나올 수 있는 여러 출력을 표현하도록 만든 구조다. 사람의 demonstration은 정답이 하나가 아니라 매번 높이·속도·경로가 조금씩 다른데 latent z는 이 변동성을 압축해 같은 상황에서도 여러 타당한 action chunk가 존재한다는 점을 모델이 다루게 한다. 제약이 없으면 encoder가 시연마다 제각각인 z를 만들어 데이터를 통째로 외우는 쪽으로 흐르므로, z의 분포가 평균 0·분산 1의 가우시안에서 너무 멀어지지 않도록 정규화한다.

![[assets/jo-2026-act-vla-primer/fig06.png]]
*CVAE encoder(왼쪽 절반). [CLS] 토큰과 현재 joints, 시연 action sequence를 함께 읽어 [CLS] 위치에 모인 정보로 latent z의 평균·분산을 낸다. 이 부분은 학습 때만 쓰인다 (조인령 2026).*

### Transformer 두 부분

ACT는 단일 Transformer 하나가 아니라 CVAE의 encoder와 policy를 각각 Transformer로 구현한 구조다. 왼쪽 CVAE encoder는 학습 때만 쓰이며 현재 joints와 시연 action sequence 앞에 [CLS] 토큰을 붙여 읽고 그 위치에 모인 정보로 z의 평균·분산을 낸다. 오른쪽 policy는 실제 실행을 맡아 카메라 이미지·현재 joints·z를 받아 앞으로의 action chunk를 낸다.

카메라 이미지는 그대로 들어가지 않고 ResNet18을 거친다. 480×640×3 이미지 한 장은 15×20×512 특징 지도로 바뀌고 15×20을 펼치면 한 장당 300개의 시각 특징이 된다. 4장이면 1200개다. 여기에 512차원으로 변환한 현재 joints 표현 1개와 z 표현 1개가 더해져 transformer encoder는 총 1202개 조각(각 512차원)을 함께 읽는다. 서로 다른 형태의 입력을 같은 표현 공간에 올린 뒤 encoder 안에서 관계를 보게 하는 설계가 핵심이다. 이어 transformer decoder가 미래 시점별 위치 임베딩을 받아 각 시점의 action 표현을 만들고 마지막 MLP가 그 표현을 14개 관절 목표값으로 바꾼다.

![[assets/jo-2026-act-vla-primer/fig08.png]]
*저자가 그린 ResNet18/CNN 설명 도식. 4개 RGB 이미지가 ResNet18을 거쳐 시각 특징으로 바뀌고, CNN이 선·모서리·물체 일부 같은 패턴을 뽑는 원리와 residual 연결을 함께 풀어 설명한다 (조인령 2026, 원 논문에는 없는 해설 그림).*

### 학습과 추론의 차이

학습 손실은 두 항이다. 예측한 chunk가 실제 시연 chunk와 얼마나 가까운지 보는 복원 손실과, z가 기본 분포에서 너무 벗어나지 않게 잡는 정규화 손실이며 β가 정규화 항의 비중을 조절한다. 알고리즘 표기에는 복원 손실이 MSE처럼 적혀 있지만 구현에서는 L1 loss를 썼고 이쪽이 더 정밀한 시퀀스 예측에 유리했다고 설명한다. 추론 때는 미래의 정답 action을 알 수 없어 CVAE encoder를 쓰지 못하므로 z를 0으로 두고 policy만 돌린다. 같은 입력에는 같은 chunk를 내는 결정적 방식이다.

## 결과 (Results)

실제 로봇의 정밀 양팔 조작 6개 과제에서 ACT의 최종 성공률은 Slide Ziploc 88%, Slot Battery 96%, Open Cup 84%, Thread Velcro 20%, Prep Tape 64%, Put On Shoe 92%다. Thread Velcro가 20%로 낮은데 검은 벨크로 타이가 배경과 잘 구분되지 않고 이미지에서 차지하는 면적도 작아 위치를 잡기 어려웠다고 분석한다. 작은 물체와 낮은 시각 대비가 겹치면 ACT도 여전히 취약하다.

비교 대상은 BC-ConvMLP(CNN+MLP behavioral cloning), BeT(Transformer지만 chunking 없이 한 step 예측), RT-1(action을 이산 구간으로 예측), VINN(nearest-neighbor)이다. 기존 방법들도 초반 동작은 어느 정도 하지만 후반의 정밀 단계로 갈수록 오차가 누적돼 무너졌다. 논문은 이를 compounding error와 non-Markovian behavior의 영향으로 본다.

세 축의 기여는 ablation으로 분리된다. chunk 크기 k를 바꾸면 Temporal Ensembling을 뺀 상태에서 평균 성공률이 k=1일 때 1%, k=100일 때 44%까지 오르고 k=200·400에서는 다시 낮아진다. 너무 긴 chunk는 새 observation을 반영하지 못해 open-loop에 가까워지기 때문이다. Temporal Ensembling을 더하면 44%에서 47.3%로 오른다. CVAE의 효과는 데이터 종류에 따라 갈린다. 규칙대로 생성한 scripted 데이터에서는 CVAE를 빼도 59% 대 58%로 차이가 거의 없지만 사람 시연 데이터에서는 35.3%에서 2%로 급락한다. 사람 데이터의 불규칙성과 여러 경로를 다루는 데 CVAE가 핵심이라는 근거다.

## 한계 (Limitations)

이 글은 해설 성격이라 별도의 한계 절을 두기보다 결과 안에서 취약점을 짚는다. Thread Velcro처럼 작고 대비가 낮은 물체는 성공률이 20%로 떨어져 시각 인식 자체가 병목이 되는 상황에서는 action chunking·Temporal Ensembling·CVAE의 조합만으로 메우기 어렵다. chunk 길이 k도 무작정 키우면 안 되고 observation 반영과 오차 억제 사이에서 적정값을 찾아야 한다. 글은 마지막에 ACT를 이후 VLA 흐름의 출발점으로 위치시킨다. OpenVLA가 언어·이미지로 action을 토큰으로 예측한다면 ACT는 그보다 앞서 로봇 action을 시간적으로 이어진 시퀀스로 다루는 것이 왜 중요한지를 보여준 사례다.

## 관련 페이지 (Related Pages)

- [[physical-ai/zhao-2023-learning-fine-grained-bimanual-manipulation]] — 이 페이지가 해설하는 원 논문(ALOHA 하드웨어 + ACT 알고리즘). 정보량과 정확도는 원 논문 페이지가 크므로 입문으로 감을 잡은 뒤 넘어가는 편이 좋다.
- [[physical-ai/jo-2026-rt-2-vla-primer]] — 같은 "모두의 로보틱스 - VLA 입문" 시리즈 바로 앞 편(03-04). action을 텍스트 토큰으로 다루는 RT-2와 달리 ACT는 연속 관절값을 직접 내므로, 두 접근을 대비해 읽으면 좋다.
- [[physical-ai/jo-2026-rt-1-vla-primer]] — 시리즈 03-03편. VLA 흐름의 기초인 RT-1을 먼저 익히는 순서를 권한다.
- [[physical-ai/kim-2024-openvla-an-open-source-vision-language-action-model]] — ACT가 출발점을 놓은 이후의 VLA. action을 토큰으로 예측하는 노선과 대비된다.
- [[overviews/physical-ai-overview]] — physical-ai 카테고리의 분류 뼈대·학습 경로 허브.
