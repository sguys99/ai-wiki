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
  - id: fig03
    file: assets/jo-2026-act-vla-primer/fig03.png
    raw: raw/articles/jo-2026-act-vla-primer-figures/fig03.png
    caption: "Temporal Ensembling 도식. 매 timestep 겹쳐 예측된 action chunk 중 같은 실행 시점의 값을 가중 평균한다 (ACT 논문 Figure 3)"
    strategy: fetched
    curated: true
  - id: fig04
    file: assets/jo-2026-act-vla-primer/fig04.png
    raw: raw/articles/jo-2026-act-vla-primer-figures/fig04.png
    caption: "ACT 전체 구조. 왼쪽은 학습 때만 쓰는 CVAE encoder, 오른쪽은 실행 때 쓰는 policy다 (ACT 논문 Figure 2)"
    strategy: fetched
    curated: true
  - id: fig06
    file: assets/jo-2026-act-vla-primer/fig06.png
    raw: raw/articles/jo-2026-act-vla-primer-figures/fig06.png
    caption: "CVAE encoder. [CLS] 토큰과 현재 관절 상태, 시연 action chunk를 받아 latent z의 평균과 분산을 낸다"
    strategy: fetched
    curated: true
  - id: fig08
    file: assets/jo-2026-act-vla-primer/fig08.png
    raw: raw/articles/jo-2026-act-vla-primer-figures/fig08.png
    caption: "저자가 그린 ResNet18과 CNN 설명 도식. 4개 RGB 이미지가 ResNet18을 거쳐 시각 특징이 되는 과정과 residual connection을 함께 설명한다"
    strategy: fetched
    curated: true
---

## 요약

ACT(Zhao 2023) 논문을 처음 읽는 사람을 위한 한국어 입문 해설이다. "모두의 로보틱스 - VLA 입문" 시리즈 03-05편으로, 정밀 manipulation에서 imitation learning이 실패하는 원인을 짚고 ACT가 그 원인을 세 가지 장치로 나눠 다루는 방식을 원문의 전개 순서대로 따라간다.

ACT의 발상은 예측 단위를 바꾼 데 있다. 기존 imitation learning이 현재 observation을 보고 다음 한 동작만 고르는 반면, ACT는 앞으로 이어질 여러 시점의 action을 하나의 묶음으로 예측한다. 여기에 Temporal Ensembling과 CVAE가 각각 실행의 매끄러움과 사람 시연의 다양성을 맡아 함께 작동한다.

시리즈 앞 두 편인 [[physical-ai/jo-2026-rt-1-vla-primer]]와 [[physical-ai/jo-2026-rt-2-vla-primer]]가 action을 텍스트 토큰으로 다루는 흐름을 짚었다면, 이 편은 그보다 앞선 ACT로 돌아가 연속적인 관절값을 직접 내는 접근을 다룬다. 원 논문은 [[physical-ai/zhao-2023-learning-fine-grained-bimanual-manipulation]]에 정리되어 있으므로, 이 입문 페이지를 먼저 읽고 원 논문 페이지로 넘어가는 순서를 권한다.

![[assets/jo-2026-act-vla-primer/fig04.png]]
*Figure 2: ACT 전체 구조. 왼쪽은 학습 때만 쓰는 CVAE encoder로 [CLS] 토큰과 현재 관절 상태, 시연 action chunk를 받아 latent z를 만든다. 오른쪽 policy는 4개 카메라 이미지와 현재 관절 상태, z를 받아 앞으로의 action chunk를 낸다 (조인령 2026, ACT 논문 Figure 2).*

## 배경

정밀한 로봇 manipulation은 작은 오차에도 쉽게 실패한다. manipulation은 팔과 손으로 물체를 다루는 과제 영역을 말한다. 배터리를 슬롯에 끼우거나 컵 뚜껑을 열거나 얇은 물체를 양손으로 맞잡는 작업은 몇 mm 수준의 위치 차이만으로 전체 과정이 실패로 이어진다.

ACT 논문은 이런 정밀 manipulation을 사람의 시연 데이터(demonstration)로 학습할 수 있는지를 다룬다. 논문은 시연을 모으는 저비용 양팔 teleoperation 시스템도 함께 제안하지만, 알고리즘 관점에서 더 중요한 문제는 imitation learning에서 생기는 누적 오차다. teleoperation은 사람이 로봇을 원격으로 움직여 시연을 만드는 방식이다.

누적 오차는 한 동작씩 예측하는 구조에서 나온다. 일반적인 imitation learning은 현재 observation을 보고 다음 한 동작만 예측하는데, 물체를 잡는 위치가 조금만 어긋나도 다음 순간의 상태는 시연 데이터에서 보던 장면과 달라진다. 그러면 모델은 익숙하지 않은 상태에서 다시 동작을 예측해야 하고, 그 과정에서 오차가 더 커진다.

정밀 manipulation에서 이 문제의 영향이 가장 크다. 작은 위치 차이가 접촉 상태를 바꾸고, 접촉 상태가 바뀌면 이후 동작 전체가 실패로 이어지기 때문이다. 따라서 논문이 세운 질문은 정밀 manipulation에서 한 동작씩 예측할 때 생기는 누적 오차를 어떻게 줄일 것인가로 요약된다.

ACT의 답은 예측 단위를 바꾸는 것이다. 다음 한 동작만 예측하는 대신 현재 상태를 보고 앞으로 수행할 여러 동작을 하나의 묶음으로 예측한다. 즉 로봇이 매 순간 독립적으로 한 동작을 고르는 것이 아니라 짧은 계획 단위를 한 번에 예측하게 된다.

## 핵심 개념

ACT는 하나의 장치로 문제를 풀지 않는다. 세 장치가 서로 다른 문제를 나눠 맡고, 그 대응 관계가 아래 표다.

| 문제 | 장치 | 하는 일 |
|---|---|---|
| 한 동작씩 예측하면 오차가 누적된다 | action chunking | 앞으로 이어질 여러 시점의 action을 한 묶음으로 예측한다 |
| 예측한 묶음을 그대로 실행하면 새 시각 정보를 반영하지 못한다 | Temporal Ensembling | 매 timestep 다시 예측하고 겹치는 후보를 가중 평균한다 |
| 사람 시연 데이터는 같은 상황에서도 경로가 매번 다르다 | CVAE | 그 변동성을 latent z에 담아 여러 타당한 경로를 표현한다 |

### policy와 action chunking

policy는 현재 observation을 받아 다음 action을 정하는 함수를 말한다. imitation learning은 시연 데이터를 흉내 내 policy를 학습하는 방법이고, ACT도 강화학습이 아니라 이 계열에 속한다.

action chunking은 로봇의 동작을 하나씩 따로 예측하지 않고 앞으로 이어질 여러 시점의 action을 한 묶음으로 예측하는 방식이다. 이 묶음을 action chunk라고 부른다.

컵 뚜껑을 여는 작업이 두 방식의 차이를 잘 보여준다.

- 기존 방식은 현재 로봇 상태와 카메라 이미지를 보고 바로 다음 동작 하나를 예측한다. 컵에 조금 더 가까이 이동하고, 손을 조금 닫고, 손목을 조금 회전하는 결정을 매 순간 따로 내린다.
- ACT는 같은 입력에서 앞으로 이어질 여러 동작을 한 번에 예측한다. 컵에 접근하고, 컵을 잡고, 손목을 회전하고, 뚜껑을 여는 짧은 흐름을 하나의 chunk로 낸다.

여기서 중요한 것은 출력 개수가 늘었다는 점이 아니다. ACT가 로봇의 동작을 한 순간의 결정이 아니라 짧은 시간 동안 이어지는 흐름으로 다시 정의했다는 점이 핵심이다.

논문은 이 변화의 효과를 유효 길이로 설명한다. 유효 길이는 로봇이 연속으로 정확한 판단을 유지해야 하는 시간적 길이를 뜻한다. 예를 들어 100개의 작은 동작으로 이루어진 작업을 매 순간 하나씩 예측한다면 모델은 100번의 판단을 연속으로 성공해야 한다. 반면 여러 동작을 묶어 예측하면 전체 작업을 더 짧은 단위로 나누어 다룰 수 있다.

### Temporal Ensembling

action chunk를 예측한다고 문제가 모두 풀리는 것은 아니다. observation을 한 번 보고 k개의 action을 그대로 연속 실행하면 open-loop 제어에 가까워진다. open-loop 제어는 실행 도중에 새로 들어오는 센서 입력을 반영하지 않는 방식을 뜻한다. 그러면 중간에 들어온 새 시각 정보를 쓰지 못하고 움직임도 끊긴다.

ACT는 한 번 예측한 chunk를 끝까지 실행하지 않는다. 대신 매 timestep마다 현재 observation을 다시 보고 새로운 chunk를 예측한다. 이렇게 하면 새 시각 정보를 계속 반영할 수 있지만, 서로 다른 시점에서 예측한 chunk들이 시간상 겹쳐 하나의 실행 시점에 여러 후보가 생긴다.

Temporal Ensembling은 그 겹친 후보 중 같은 실행 시점에 해당하는 것만 모아 가중 평균한다. 일반적인 smoothing이 인접한 시간의 동작을 섞는 것과 달리, Temporal Ensembling은 같은 미래 시점을 여러 번 예측한 값들만 평균한다. 따라서 움직임을 부드럽게 만들면서도 값이 원래 의도와 다른 방향으로 치우치는 문제를 줄인다.

![[assets/jo-2026-act-vla-primer/fig03.png]]
*Figure 3: Temporal Ensembling. 매 timestep 새로 예측된 action chunk가 시간축에서 겹치고, 같은 실행 시점에 해당하는 후보들을 가중 평균해 최종 action을 정한다 (조인령 2026, ACT 논문 Figure 3).*

### CVAE와 latent z

Transformer 학습 구조를 이해하려면 CVAE가 먼저다. CVAE는 VAE에 조건 정보를 더한 조건부 생성 모델이다. VAE가 데이터 안에 숨은 변동성을 latent로 표현한다면, CVAE는 여기에 조건을 붙여 특정 입력 조건에서 나올 수 있는 여러 출력을 표현하도록 만든 구조다. latent는 겉으로 드러나지 않는 모델 내부의 표현 공간을 가리킨다.

사람의 시연 데이터는 하나의 정답처럼 깔끔하지 않다. 같은 물체를 같은 목표로 다루더라도 사람은 매번 조금씩 다른 경로를 쓴다. 예를 들어 공중에서 테이프를 건네주는 작업이라면 시연마다 건네주는 높이와 팔의 위치, 그리퍼의 자세가 달라진다. 그렇다고 이 데이터들이 틀린 것은 아니고 모두 작업을 성공시키는 유효한 방법이다.

모델이 정답은 하나뿐이라고 가정하고 학습하면 여러 가능한 동작을 섞어 놓은 애매한 출력을 만든다. 정밀 manipulation에서는 이런 평균적인 동작이 오히려 실패로 이어진다. 따라서 ACT는 CVAE를 써서 같은 상황에서도 여러 타당한 action chunk가 존재한다는 점을 모델이 다루게 한다.

latent z는 사람 시연에 들어 있는 스타일과 경로의 차이를 압축한 값이다. 어떤 시연은 물체를 더 높은 위치로 옮기고 어떤 시연은 더 낮은 경로로 옮기며, 어떤 시연은 빠르게 접근하고 어떤 시연은 중간에 멈춘 뒤 조심스럽게 접근한다. z는 이런 차이를 모델 내부에서 표현하기 위한 값이다.

## 모델 구조

### 입력과 출력

| 구분 | 내용 |
|---|---|
| 이미지 입력 | 위쪽, 앞쪽, 왼쪽 손목, 오른쪽 손목 4개 카메라의 480×640 RGB 이미지 |
| 상태 입력 | 두 팔의 현재 관절 위치 14개 |
| 출력 | 앞으로 k개 시점 각각의 14차원 관절 목표값 |
| 출력 형식 | 이산 토큰이 아닌 연속 수치값 |

ACT의 출력은 다음 한 동작이 아니라 앞으로 여러 시점에서 로봇이 도달해야 할 관절 위치다. 미래 시점 1부터 k까지 각각에 대해 관절 14개의 목표 위치가 한 줄씩 적힌 표에 가깝다.

출력 형식에서 ACT는 RT-1 계열과 나뉜다. RT-1과 RT-2, OpenVLA는 action tokenization을 쓴다. action tokenization은 연속값인 제어 명령을 정해진 구간으로 나눠 이산 토큰으로 바꾸는 기법이다. 반면 ACT는 미리 정해둔 동작 번호 중 하나를 고르지 않고 각 관절의 목표 위치를 연속적인 수치값으로 직접 낸다. 학습할 때도 시연 데이터에서 얻은 관절값을 그대로 쓰고, 추론할 때도 연속적인 관절 위치의 흐름을 예측한다.

### 두 개의 Transformer

ACT는 단일 Transformer 하나가 아니라 CVAE의 encoder와 policy를 각각 Transformer로 구현한 구조다.

| 부분 | 쓰이는 시점 | 입력 | 출력 |
|---|---|---|---|
| CVAE encoder (왼쪽) | 학습 때만 | 현재 관절 상태, 시연 action chunk | latent z의 평균과 분산 |
| policy (오른쪽) | 학습과 실행 모두 | 4개 카메라 이미지, 현재 관절 상태, z | 미래 k개 시점의 관절 목표값 |

두 부분 모두 안에 encoder를 두지만 역할이 다르다. 왼쪽 encoder는 시연이 어떤 스타일로 움직였는지를 z로 압축하고, 오른쪽 policy의 encoder는 현재 observation과 z를 통합해 policy가 쓸 표현을 만든다.

### CVAE encoder

ACT에서 한 시점의 action은 두 팔의 목표 관절 위치를 담은 14차원 벡터다. 이 벡터들이 시간 순서대로 모이면 하나의 action chunk가 된다.

이 값들은 그대로 Transformer에 들어가지 않는다. 먼저 선형층을 거쳐 Transformer가 처리할 수 있는 형태로 바뀌고, 현재 관절 상태도 같은 방식으로 변환된다. 그다음 입력 앞에 [CLS] 토큰이 붙는다. [CLS] 토큰은 전체 시퀀스 정보를 대표해 모으기 위한 자리다.

현재 관절 상태와 action chunk에는 시간 순서를 알려주는 위치 정보가 더해진 뒤 Transformer encoder로 들어간다. encoder는 이 전체 흐름을 읽고 [CLS] 위치에 모인 정보로 z의 평균과 분산을 예측한다. 평균과 분산을 예측한다는 것은 z를 하나의 고정된 값으로 정하는 대신, 이 시연이 대략 어떤 스타일 범위에 속하는지를 확률적으로 표현한다는 뜻이다.

![[assets/jo-2026-act-vla-primer/fig06.png]]
*CVAE encoder. [CLS] 토큰과 현재 관절 상태, 시연 action chunk를 함께 읽어 [CLS] 위치에 모인 정보로 latent z의 평균과 분산을 낸다. 이 부분은 학습 때만 쓰인다 (조인령 2026).*

이 부분은 학습 때만 필요하다. 실제 로봇을 실행할 때는 미래의 정답 action chunk를 알 수 없어 encoder를 쓸 수 없기 때문이다.

### 시각 특징 추출

카메라 이미지는 Transformer에 그대로 들어가지 않고 ResNet18을 먼저 거친다. ResNet18은 이미지 인식에 널리 쓰이는 18층 CNN 계열 모델이다. CNN은 이미지 전체를 한 번에 숫자로 바꾸는 대신 작은 영역을 차례로 살피며 선과 모서리, 물체의 일부, 위치 관계 같은 시각적 패턴을 뽑아낸다.

ResNet은 깊은 신경망을 더 안정적으로 학습시키려고 residual connection을 쓴다. residual connection은 중간 층의 출력을 다음 층으로만 보내지 않고 이전 입력을 뒤쪽 층에 함께 더하는 구조다. ACT에서 ResNet18의 역할은 이미지 분류가 아니라 행동 예측에 필요한 시각 특징을 뽑는 것이다.

변환 과정의 수치는 다음과 같다.

- 카메라 이미지 한 장은 480×640×3 크기로 들어간다. 480×640은 세로와 가로 크기이고 3은 RGB 색상 채널이다.
- ResNet18을 거치면 15×20×512 크기의 feature map이 된다. 15×20은 이미지를 작은 공간 구역 300개로 나눈 것이고, 512는 각 구역을 설명하는 시각 특징의 개수다.
- 15×20개의 구역을 한 줄로 펼치면 이미지 한 장이 300개의 시각 특징이 된다.
- 카메라가 4대이므로 300개씩 4장을 합쳐 총 1,200개의 시각 특징이 Transformer로 넘어간다.

각 시각 특징에는 위치 정보가 함께 더해진다. 위치 정보는 그 특징이 이미지의 위쪽에서 왔는지 아래쪽에서 왔는지, 왼쪽에서 왔는지 오른쪽에서 왔는지를 알려준다. 따라서 ACT는 이미지 전체를 하나의 벡터로 뭉개지 않고 이미지 안에서 어디에 무엇이 있는지를 어느 정도 유지한 채 Transformer에 전달한다.

![[assets/jo-2026-act-vla-primer/fig08.png]]
*저자가 그린 ResNet18과 CNN 설명 도식. 4개 RGB 이미지가 ResNet18을 거쳐 시각 특징으로 바뀌는 과정과, CNN이 선이나 모서리 같은 패턴을 뽑는 원리, residual connection을 함께 설명한다 (조인령 2026, 원 논문에는 없는 해설 그림).*

### 관절 상태와 z의 결합

Transformer encoder에는 시각 특징만 들어가지 않는다. 현재 관절 상태와 z도 함께 들어가며 두 정보의 역할이 다르다. 현재 관절 상태는 로봇 팔이 지금 어떤 자세인지를 알려주고, z는 시연의 스타일과 변동성을 담는다.

세 정보는 크기를 맞춰야 한다. 시각 특징은 이미 512차원 표현이지만 현재 관절 상태는 숫자 14개다. 따라서 ACT는 관절 상태를 선형층으로 512차원 표현으로 바꾼다. 선형층은 입력 숫자들을 조합해 새로운 크기의 표현으로 바꿔주는 간단한 신경망 층이다. z도 같은 방식으로 512차원 표현이 된다.

이 단계는 action tokenization과 혼동하기 쉽다. 그러나 ACT는 관절값을 이산 token ID로 바꾸는 것이 아니라, 연속적인 관절값을 Transformer 입력으로 쓰기 위해 임베딩하는 것이다. 최종 출력도 연속적인 관절 목표값이다.

세 입력을 합치면 Transformer encoder의 입력 길이가 정해진다.

| 입력 | 개수 | 차원 |
|---|---|---|
| 시각 특징 (카메라 4대) | 1,200개 | 512 |
| 현재 관절 상태 표현 | 1개 | 512 |
| latent z 표현 | 1개 | 512 |
| 합계 | 1,202개 | 512 |

이 구조의 핵심은 서로 다른 종류의 정보를 따로 처리한 뒤 마지막에 붙이지 않는다는 데 있다. 시각 정보와 현재 로봇 자세, 시연 스타일 정보를 모두 같은 표현 크기로 맞춘 뒤 encoder 안에서 서로 관계를 보게 만든다. 즉 물체가 어느 카메라의 어느 위치에 보이는지, 팔이 지금 어떤 자세인지, 이 시연 스타일에서는 다음 동작을 어떻게 이어야 하는지를 함께 고려한다.

### decoder와 출력 헤드

encoder가 현재 상황을 통합하면 Transformer decoder가 미래의 action chunk를 예측한다. decoder가 받는 입력은 실제 이미지나 관절값이 아니라 미래 시점의 순서를 알려주는 고정된 위치 표현이다. 즉 decoder는 미래 시점 1부터 k까지 각각에 대해 어떤 관절 위치가 필요한지를 순서대로 묻는 역할을 한다.

decoder는 encoder가 만든 현재 상황 표현을 참고하면서 각 미래 시점의 action 표현을 만든다. 마지막으로 MLP가 그 표현을 실제 로봇이 쓸 수 있는 관절 목표값으로 바꾼다. MLP는 여러 선형층과 활성화 함수로 이루어진 기본 신경망 구조이며, 여기서는 새로운 판단을 하기보다 출력 형식을 바꾸는 변환기 역할을 한다.

## 학습과 추론

학습 때 ACT는 시연 데이터에서 현재 observation과 그 뒤에 이어지는 action chunk를 함께 가져온다. 학습은 두 단계로 진행된다.

1. 현재 관절 상태와 실제 시연 action chunk를 CVAE encoder에 넣어 z를 만든다.
2. 카메라 이미지와 현재 관절 상태, z를 policy에 넣어 미래 action chunk를 예측한다.

즉 encoder는 시연 action의 특징을 z로 압축하고, policy는 현재 observation과 z를 바탕으로 실제 시연 action chunk를 다시 예측하도록 학습된다.

전체 손실은 복원 손실과 정규화 손실의 합이고, β가 정규화 항의 비중을 조절한다.

| 항 | 역할 |
|---|---|
| 복원 손실 | 예측한 action chunk가 실제 시연 chunk와 얼마나 가까운지 본다 |
| 정규화 손실 | z의 분포가 평균 0, 분산 1의 가우시안에서 너무 멀어지지 않게 잡는다 |
| β | 정규화 손실을 얼마나 강하게 반영할지 조절한다 |

복원 손실에는 논문을 읽을 때 혼동하기 쉬운 부분이 있다. 알고리즘 표기에는 복원 손실이 MSE처럼 적혀 있지만 구현 설명에서는 L1 loss를 썼다고 밝힌다. L2 loss는 예측값과 정답의 차이를 제곱해 계산하므로 큰 오차에 더 민감한 반면, L1 loss는 각 관절 목표값의 절대값 차이로 계산한다. 글은 구현에서 L1 loss를 쓴 것이 더 정밀한 시퀀스 예측에 유리했다고 설명한다.

정규화 손실은 z가 제멋대로 흩어지지 않게 잡는 역할을 한다. 제약이 없으면 encoder는 시연마다 제각각인 z를 만들고, 그러면 모델이 일반적인 패턴을 배우기보다 각 시연을 통째로 외우는 방향으로 간다. β는 이 두 목표 사이의 균형점을 정한다. β가 너무 작으면 모델이 z를 자유롭게 쓰면서 시연 데이터를 외우는 쪽으로 가고, 반대로 너무 크면 z가 강하게 제한되어 시연의 다양한 패턴을 충분히 담지 못한다.

추론 때는 조건이 달라진다. 미래의 정답 action chunk를 알 수 없어 CVAE encoder를 쓸 수 없으므로, z를 기본값인 0으로 두고 policy만 실행한다. 즉 학습에서는 시연의 다양한 스타일을 배우지만 실행에서는 평균적인 스타일을 기준으로 chunk를 예측한다. 이때 policy는 무작위로 여러 후보를 샘플링하지 않고 같은 입력에 같은 chunk를 내는 결정적 방식으로 동작한다.

## 결과

### 실제 로봇 과제 성공률

ACT는 시뮬레이션 과제와 실제 로봇 과제 모두에서 평가됐다. 실제 로봇 과제는 단순한 pick-and-place가 아니라 물체를 고정하고 밀고 끼우며, 한 팔이 잡은 상태에서 다른 팔과 협응해야 하는 정밀 양팔 작업이다.

| 과제 | ACT 최종 성공률 |
|---|---|
| Slide Ziploc | 88% |
| Slot Battery | 96% |
| Open Cup | 84% |
| Thread Velcro | 20% |
| Prep Tape | 64% |
| Put On Shoe | 92% |

여섯 과제 중 다섯 개가 64% 이상인 가운데 Thread Velcro만 20%로 낮다. 논문은 검은색 벨크로 타이가 배경과 잘 구분되지 않고 이미지에서 차지하는 면적도 작아 위치를 정확히 판단하기 어려웠다고 분석한다. 즉 작은 물체와 낮은 시각 대비가 결합된 과제에서는 ACT도 여전히 취약하다.

### 기존 방법과의 비교

| 비교 대상 | 방식 |
|---|---|
| BC-ConvMLP | 이미지를 CNN으로 처리한 뒤 현재 관절 상태와 함께 다음 action을 예측하는 기본 behavioral cloning |
| BeT | Transformer를 쓰지만 action chunking 없이 observation history로 한 step의 action을 예측 |
| RT-1 | Transformer 기반 policy지만 action을 이산 구간으로 나눠 예측 |
| VINN | 현재 observation과 비슷한 시연을 찾아 그 action을 쓰는 nearest-neighbor 방식 |

behavioral cloning은 시연의 observation과 action 쌍을 지도학습으로 흉내 내는 방법이다. 비교 결과 ACT는 시뮬레이션과 실제 로봇 과제 모두에서 가장 높은 성공률을 보였다.

기존 방법들이 처음부터 아무것도 못 하는 것은 아니다. 일부는 초반 동작에서 어느 정도 진전을 보이지만, 작업이 길어지고 정밀한 후반 단계로 넘어갈수록 작은 오차가 누적되면서 전체 작업이 실패로 이어진다. 논문은 이 성능 저하를 compounding error와 non-Markovian behavior의 영향으로 해석한다. compounding error는 한 동작씩 예측할 때 작은 오차가 다음 상태를 낯설게 만들고 그 위에서 오차가 더 커지는 누적 현상을 말한다.

### ablation

세 장치의 기여는 ablation으로 분리된다. ablation은 구성 요소를 하나씩 빼거나 바꿔 그 요소가 성능에 얼마나 기여하는지 확인하는 실험이다.

첫째는 chunk 크기 k의 효과다. Temporal Ensembling을 뺀 상태에서 k만 바꾸면 평균 성공률이 다음과 같이 변한다.

| chunk 크기 k | 평균 성공률 |
|---|---|
| 1 | 1% |
| 100 | 44% |
| 200과 400 | 44%보다 하락 |

k=1은 action chunking이 없는 경우로 다음 한 동작만 예측하는 방식에 가깝다. 1%에서 44%로 43%p 오른 폭이 action chunking의 기여를 가장 직접적으로 보여준다. 다만 k를 계속 키우면 성능이 다시 낮아지는데, 너무 긴 chunk는 새 observation을 반영하기 어려워 open-loop 제어에 가까워지기 때문이다.

둘째는 Temporal Ensembling의 효과다. 적용 여부에 따른 평균 성공률 변화는 모델마다 다르다.

| 방법 | Temporal Ensembling 없음 | 있음 |
|---|---|---|
| ACT | 44% | 47.3% |
| BC-ConvMLP | 25% | 29% |
| VINN | 37% | 17% |

ACT와 BC-ConvMLP는 각각 3.3%p와 4%p 올랐지만 VINN은 20%p 하락했다. 논문은 이 결과를 Temporal Ensembling이 특히 parametric model의 예측 오차를 부드럽게 줄이는 데 도움이 된다는 해석의 근거로 본다. VINN은 저장된 시연에서 비슷한 action을 찾아 쓰는 nearest-neighbor 방식이라 이 범주에 들지 않는다. 따라서 Temporal Ensembling은 성능을 크게 바꾸는 장치라기보다, action chunking으로 예측한 action을 실제 제어에서 더 부드럽고 안정적으로 쓰게 해주는 보완 장치에 가깝다.

셋째는 CVAE의 효과이며, 데이터 종류에 따라 결과가 크게 나뉜다.

| 데이터 종류 | CVAE 사용 | CVAE 제거 |
|---|---|---|
| scripted data | 59% | 58% |
| human data | 35.3% | 2% |

규칙대로 생성한 scripted data에서는 CVAE를 빼도 1%p 차이에 그친다. 반면 사람이 만든 human data에서는 35.3%에서 2%로 33.3%p 하락한다. 사람 시연에는 작은 흔들림과 속도 차이, 경로 차이, 여러 가능한 해결 방식이 함께 들어 있고, CVAE가 그 불규칙성을 다루는 핵심 요소라는 근거다.

세 실험을 합치면 ACT의 성능이 Transformer 하나에서 나온 것이 아님이 드러난다. Transformer는 여러 입력을 통합하고 미래 action chunk를 만드는 뼈대 역할을 하지만, 성능 향상의 중심에는 action chunking과 Temporal Ensembling, CVAE가 함께 있다.

## 한계

이 글은 해설 성격이라 별도의 한계 절을 두지 않고 결과 안에서 취약점을 짚는다. 결과에서 확인되는 취약점은 세 가지다.

- 시각 인식이 병목이 되는 과제는 세 장치의 조합만으로 메우기 어렵다. Thread Velcro처럼 작고 대비가 낮은 물체를 다루는 과제의 성공률은 20%에 머문다.
- chunk 길이 k는 무작정 키울 수 없다. k=100에서 44%였던 평균 성공률이 k=200과 k=400에서 다시 낮아지므로, 새 observation 반영과 오차 억제 사이에서 적정값을 찾아야 한다.
- 추론 때 z를 0으로 고정하므로 실행 단계에서는 평균적인 스타일 하나만 나온다. 학습에서 배운 시연의 다양성이 실행 시점의 선택지로 이어지지는 않는다.

글은 마지막에 ACT를 이후 VLA 흐름의 출발점으로 위치시킨다. OpenVLA가 언어와 이미지를 함께 써서 action을 토큰으로 예측한다면, ACT는 그보다 앞서 로봇 action을 시간적으로 이어진 시퀀스로 다루는 것이 왜 중요한지를 보여준 사례다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| action chunking | 다음 한 동작만 예측하는 대신 앞으로 이어질 여러 시점의 action을 하나의 chunk로 예측하는 방식. ACT의 핵심 발상이다 |
| Temporal Ensembling | 매 timestep 새로 예측한 chunk 중 같은 실행 시점에 해당하는 값을 가중 평균해 부드럽고 안정적인 동작을 만드는 방법 |
| CVAE | VAE에 조건 정보를 더한 조건부 생성 모델. ACT는 사람 시연의 변동성을 latent z로 표현하는 데 쓴다 |
| compounding error | 한 동작씩 예측할 때 작은 오차가 다음 상태를 낯설게 만들고 그 위에서 오차가 더 커지는 누적 현상 |
| 유효 길이 | 로봇이 연속으로 정확한 판단을 유지해야 하는 시간적 길이. action chunking이 이 길이를 줄인다 |
| [CLS] 토큰 | 시퀀스 전체 정보를 대표해 모으는 자리. CVAE encoder는 이 위치의 표현으로 latent z의 평균과 분산을 낸다 |

## 관련 페이지

- [[physical-ai/zhao-2023-learning-fine-grained-bimanual-manipulation]]: 이 페이지가 해설하는 원 논문. ALOHA 하드웨어와 ACT 알고리즘을 함께 다루고 정보량과 정확도가 더 크므로, 입문으로 감을 잡은 뒤 넘어가는 순서를 권한다.
- [[physical-ai/jo-2026-rt-2-vla-primer]]: 같은 시리즈 바로 앞 편인 03-04편. action을 텍스트 토큰으로 다루는 RT-2와 달리 ACT는 연속 관절값을 직접 내므로, 두 접근을 대비해 읽으면 좋다.
- [[physical-ai/jo-2026-rt-1-vla-primer]]: 같은 시리즈 03-03편. VLA 흐름의 기초인 RT-1을 먼저 익히는 순서를 권한다.
- [[physical-ai/kim-2024-openvla-an-open-source-vision-language-action-model]]: ACT 이후의 VLA. action을 토큰으로 예측하는 노선과 대비된다.
- [[overviews/physical-ai-overview]]: physical-ai 카테고리의 분류 뼈대와 학습 경로 허브.
