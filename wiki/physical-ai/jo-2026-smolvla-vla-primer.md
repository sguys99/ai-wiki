---
title: "03-10. SmolVLA - 모두의 로보틱스 - VLA 입문"
type: article
year: 2026
category: physical-ai
source: jo-2026-smolvla-vla-primer.md
raw_path: raw/articles/jo-2026-smolvla-vla-primer.md
raw_filename: "jo-2026-smolvla-vla-primer.md"
source_collection: external
author: "조인령"
url: "https://wikidocs.net/366376"
publisher: "wikidocs.net"
fetched_at: "2026-08-28T08:42:00+0900"
extractor_tier: "chrome"
tags: [physical-ai, vla, robot-learning, edge-inference]
figures:
  - id: fig05
    file: assets/jo-2026-smolvla-vla-primer/fig05.png
    raw: raw/articles/jo-2026-smolvla-vla-primer-figures/fig05.png
    caption: "논문 Figure 1에 action expert 블록만 빨간 테두리로 표시한 저자 주석판"
    strategy: fetched
    curated: true
---

## 요약

SmolVLA(Shukor 2025)를 처음 읽는 사람을 위한 한국어 입문 해설이다. "모두의 로보틱스 - VLA 입문" 시리즈의 03-10편으로, 모델의 등장 배경부터 구조 선택, 실제 로봇 실험 결과, 한계까지 차례대로 다룬다.

SmolVLA는 vision-language-action model을 더 작고 저렴하며 재현 가능한 형태로 만들 수 있는지를 검증한 모델이다. 이 해설은 그 검증 과정을 "어떤 정보는 유지했고, 어떤 계산은 줄였으며, 어떤 실행 구조를 새로 설계했는가"라는 질문으로 다시 배열한다. 따라서 SmolVLA를 읽는 기준이 "파라미터 수가 작다"에서 설계 선택의 근거로 옮겨 간다.

편집 방식에도 특징이 있다. 원 논문은 구조를 차례로 나열한 뒤 ablation을 부록 표로 미루는데, 이 해설은 설계 선택 하나를 설명한 직후 그 근거가 되는 표를 곧바로 붙인다. 예를 들어 state를 어디에 넣을지 설명한 다음 Table 11을, layer skipping을 설명한 다음 Table 8을 붙이는 식이다. 논문에서라면 페이지를 오가며 맞춰 봐야 할 대목이 한 흐름으로 이어진다.

수치와 ablation의 원본, 도식의 깨끗한 크롭은 [[physical-ai/shukor-2025-smolvla-a-vision-language-action-model]]에 정리되어 있다. 이 입문 페이지를 먼저 읽고 원 논문 페이지로 넘어가는 순서를 권한다.

## 배경

로봇 모델은 논문 속 벤치마크 점수만으로 완성되지 않는다. 실제 로봇 위에서 실행되어야 하고, 반복 실험이 가능해야 하며, 가능하면 더 저렴한 하드웨어에서도 동작해야 한다. SmolVLA는 이 조건을 설계의 출발점으로 삼는다.

해설은 SmolVLA를 읽는 기준으로 세 키워드를 먼저 세우고, 뒤에 나오는 모든 설계를 거기에 다시 연결한다.

| 키워드 | SmolVLA에서의 의미 |
|---|---|
| 효율성 | 작은 모델, 적은 visual token, layer skipping으로 학습과 추론 비용을 줄인다 |
| 접근성 | 단일 GPU 학습, 소비자급 GPU나 CPU 배포, 저가 로봇 플랫폼 활용 |
| 재현성 | 공개 코드, pretrained model, 학습 데이터, 커뮤니티 데이터셋 활용 |

이 세 키워드를 위해 논문이 함께 고른 방향은 다음 세 가지다.

- 작은 구조. compact pretrained VLM을 쓰고, VLM의 일부 layer만 활용하며, visual token 수를 줄인다. action expert도 가볍게 설계해 학습과 추론 비용을 낮춘다.
- 공개 커뮤니티 데이터. 고가의 폐쇄 데이터만 바라보지 않고 공개 데이터셋과 저가 로봇 플랫폼을 써서, 더 많은 연구자가 VLA 실험에 접근할 수 있는 경로를 제안한다.
- 배포를 고려한 추론 구조. 로봇은 한 번에 하나의 답을 내는 챗봇과 달리 계속 관찰하고 판단하고 움직여야 한다. 그래서 action을 실행하는 동안 다음 action을 미리 계산하는 구조를 설계한다.

계보로 보면 SmolVLA는 π0의 뒤에 놓인다. π0가 VLM과 flow matching을 결합하면 강력한 로봇 policy를 만들 수 있다는 가능성을 보였다면, SmolVLA는 그 가능성을 더 작고 저렴하며 재현 가능한 형태로 옮길 수 있음을 보이려 한다. flow matching은 noise에서 데이터로 향하는 vector field를 학습해 샘플을 만드는 생성 기법이다.

이 해설에는 시리즈의 다른 편들과 달리 배경지식 장이 없다. flow matching과 action expert를 이미 03-07편(π0)과 03-08편(π0.5)에서 다뤘다며 해당 편의 링크로 대신했기 때문이다. 두 편 모두 이 wiki에는 아직 없고, π0 논문 자체는 [[physical-ai/black-2024-pi0-a-vision-language-action-flow-model]]에 정리되어 있다.

## 핵심 개념

### policy와 action chunk

policy는 현재 observation을 받아 다음 action을 정하는 함수를 말한다. observation은 매 timestep에 policy가 받는 센서 입력이다. 즉 무엇을 분류하는 모델이 아니라 로봇이 다음에 어떻게 움직일지를 결정하는 모델이다.

SmolVLA의 policy는 한 스텝의 action을 하나씩 내지 않고 action chunk를 낸다. action chunk는 미래 여러 스텝의 action을 한 묶음으로 미리 예측해 둔 결과다. 이 묶음 단위 예측이 뒤에 나오는 asynchronous inference의 전제가 된다. 로봇이 이미 받아 둔 묶음을 실행하는 동안 서버가 다음 묶음을 계산할 여유가 생기기 때문이다.

### VLM backbone과 action expert

SmolVLA는 두 덩어리로 나뉜다. 한쪽은 이미지, 언어, 로봇 상태를 이해하는 compact pretrained VLM이고, 다른 한쪽은 그 feature를 받아 실제 action chunk를 만드는 action expert다. action expert는 로봇 상태와 action token만 처리하도록 분리한 별도 가중치 묶음이다.

여기서 VLM이 하는 일은 텍스트 생성이 아니다. 일반적인 VLM은 이미지를 보고 텍스트 답변을 만들지만, SmolVLA의 VLM은 로봇이 현재 상황을 이해하도록 feature를 만들어 주는 역할에 집중한다. 따라서 VLM의 성능만 좋아서는 충분하지 않고, VLM과 action expert를 어떻게 연결하느냐가 핵심 문제가 된다.

### 추론 지연

로봇 제어에서는 모델이 얼마나 정확한지만큼 다음 action이 제때 도착하는지가 중요하다. 고해상도 이미지를 여러 조각으로 나눠 자세히 보면 정보는 늘지만 추론이 느려지고, 실제 로봇에서는 그 지연이 그대로 문제가 된다. SmolVLA가 계산량을 줄이는 장치를 여러 겹 넣은 이유가 여기에 있다.

## 방법

### 전체 구조

![[assets/jo-2026-smolvla-vla-primer/fig05.png]]
*Figure 1: SmolVLA 전체 구조. 왼쪽 가위 아이콘이 VLM의 마지막 층을 버리는 layer skipping을 가리키고, 빨간 테두리는 저자가 표시한 action expert 블록이다 (조인령 2026, Figure 1).*

입력에서 출력까지의 흐름은 여섯 단계로 정리된다.

| 단계 | 입력 또는 역할 | 설명 |
|---|---|---|
| 1 | RGB image(s) | 로봇이 카메라로 보는 장면 |
| 2 | 지시문(instruction) | "물체를 집어서 상자에 넣어라" 같은 과제 지시 |
| 3 | robot sensorimotor state | 관절 상태와 위치 등 로봇 자신의 몸 상태 |
| 4 | compact pretrained VLM | 이미지, 언어, 상태 정보를 하나의 feature로 통합 |
| 5 | action expert | VLM feature를 조건으로 받아 action chunk 생성 |
| 6 | low-level action chunk | 로봇이 실제로 실행할 연속 action |

backbone에는 SmolVLM-2를 쓴다. SmolVLM-2는 multi-image와 video input에 최적화된 VLM으로, 시각 정보는 SigLIP으로 인코딩하고 언어 decoder로는 SmolLM2 계열을 쓴다.

겉모습은 flow matching 기반 VLA 계열과 비슷하지만, 자세히 보면 SmolVLA만의 선택이 다섯 가지 드러난다.

- VLM의 마지막 layer 일부를 쓰지 않는 layer skipping
- 이미지 입력을 가볍게 만드는 visual token reduction
- 로봇 상태를 VLM 입력에 함께 넣는 state token 설계
- cross-attention과 self-attention을 번갈아 쓰는 action expert
- 로봇이 움직이는 동안 다음 action을 미리 계산하는 asynchronous inference

### state token 배치

로봇의 sensorimotor state는 linear layer로 token 차원을 맞춘 뒤 visual token, language token과 나란히 VLM에 들어간다. 즉 로봇의 현재 몸 상태까지 포함해 장면을 해석하도록 만든 방식이다.

근거는 Table 11이다. state를 action expert 쪽에 suffix로 붙이는 방식과 VLM 쪽에 prefix로 넣는 방식을 비교했을 때 prefix 쪽 성능이 더 좋았다. 해설은 이 결과를 로봇의 상태를 action 생성 직전에 덧붙이는 것보다 이미지와 언어를 해석하는 단계부터 함께 넣는 편이 유리하다는 뜻으로 옮긴다.

### visual token 축소

이미지 입력은 계산량을 가장 크게 늘리는 요소라서 두 곳에서 줄인다. 첫째, SmolVLM-2가 지원하는 image tiling을 쓰지 않고 global image만 쓴다. image tiling은 고해상도 이미지를 여러 crop으로 쪼개 함께 처리하는 방식으로, 정보는 늘지만 추론이 느려진다. 둘째, pixel shuffle을 적용해 프레임당 visual token 수를 64개로 제한한다.

정보 손실 가능성은 해설도 인정한다. 다만 SmolVLA의 목표가 이미지 이해 벤치마크에서 최고 점수를 내는 것이 아니라 로봇이 실제 환경에서 빠르게 판단하고 움직이게 하는 데 있다는 점을 근거로 든다. 따라서 visual token reduction은 단순한 압축이 아니라 실시간 제어를 위해 시각 입력의 계산량을 줄인 구조적 선택으로 읽어야 한다.

### layer skipping

Figure 1의 가위 아이콘이 가리키는 설계가 layer skipping이다. VLM 전체를 끝까지 통과시키는 대신 마지막 L - N개 layer를 버리고 특정 layer N까지만 쓴다. 논문은 전체 layer의 절반 정도, 즉 N = L/2를 속도와 성능 사이의 좋은 균형점으로 본다.

이 선택의 전제는 로봇 action 생성에 필요한 feature가 반드시 마지막 layer에서만 나오지는 않는다는 관찰이다. Table 8은 더 작은 VLM을 통째로 쓰는 것보다 큰 VLM의 앞쪽 layer 일부만 쓰는 방식이 더 나은 결과를 낼 수 있음을 보여준다. 해설은 이를 단순한 가지치기가 아니라 필요한 표현은 유지하면서 계산만 줄이는 방식으로 읽는다.

### action expert의 attention 배치

action expert는 cross-attention과 self-attention을 번갈아 쌓는다. 두 attention이 맡는 일이 다르기 때문이다.

| 구조 | 역할 |
|---|---|
| cross-attention | action expert가 VLM feature를 참조하게 한다 |
| self-attention | action token끼리 서로의 흐름을 맞추게 한다 |
| interleaved CA + SA | 상황 조건과 action의 시간 흐름을 함께 반영한다 |

이 배치의 근거는 두 표다. Table 6에서는 cross-attention만 쓴 경우와 self-attention만 쓴 경우보다 두 방식을 번갈아 쓴 CA+SA 구조가 가장 높은 평균 성능을 보였다. Table 7에서는 action token이 미래 action까지 자유롭게 참조하는 bidirectional 방식보다 과거 token만 참조하는 causal 방식이 더 나았다.

해설이 붙이는 해석은 action chunk가 미래를 미리 훔쳐보며 만들어지는 결과가 아니라 시간 순서에 맞춰 자연스럽게 이어져야 하는 결과라는 것이다. 두 attention의 교대 배치는 VLM feature를 참조하는 일과 action chunk 내부의 흐름을 잇는 일을 함께 풀기 위한 절충안이다.

### asynchronous inference

synchronous inference에서는 로봇이 action chunk를 다 실행한 뒤 다음 observation을 처리하고 다시 다음 chunk를 예측한다. 구조는 단순하지만 예측과 실행이 순차적으로 이어지기 때문에 로봇이 다음 action을 기다리는 구간이 생긴다. SmolVLA는 이 문제를 줄이려고 action 실행과 policy 추론을 분리한다.

| 방식 | 동작 흐름 | 특징 |
|---|---|---|
| synchronous inference | 예측 다음 실행, 다시 예측 | 단순하지만 로봇이 기다리는 시간이 생긴다 |
| asynchronous inference | 실행하는 동안 다음 action을 미리 예측 | 지연이 줄고 더 빠르게 반응한다 |

역할은 두 쪽으로 나뉜다.

- RobotClient는 실제 로봇 쪽이다. 이미 받아 둔 action을 하나씩 실행한다.
- PolicyServer는 policy 모델이 실행되는 쪽이다. 새 observation을 받아 다음 action chunk를 계산한다.

해설은 Figure 2의 동작 순서를 네 단계로 풀어 쓴다. 이 부분이 글 전체에서 분량을 가장 많이 쓰는 대목이다.

1. 로봇이 현재 observation o0를 서버에 보내고, 서버는 앞으로 실행할 n개짜리 action chunk를 계산한다.
2. 첫 chunk를 받은 로봇은 그 안에서 k개(k는 n 이하)를 먼저 실행한다.
3. 로봇이 움직이는 동안 현재 상태를 반영한 새 observation ok를 다시 보내고, 서버는 그것을 보고 다음 chunk를 계산한다.
4. 새 chunk가 도착하면 queue에 남아 있던 action과 합쳐 갱신하고, 로봇은 끊기지 않고 계속 움직인다.

### queue threshold와 observation filtering

action queue size는 앞으로 실행할 action이 몇 개 정도 미리 준비되어 있는지를 뜻한다. queue가 충분히 크면 로봇은 다음 action을 바로 실행할 수 있고, 0에 가까워지면 새 action을 기다리느라 동작이 끊길 수 있다.

queue threshold g는 언제 새 observation을 보내 다음 chunk를 다시 계산할지 정하는 기준이다. 남은 action 비율이 g보다 작아지면 새 추론이 시작된다. 따라서 g가 작을수록 더 순차적으로 실행되고, g가 클수록 더 자주 observation을 보내며 반응적으로 동작한다.

| g | queue 길이 변화 | 해석 |
|---|---|---|
| 0.0 | 크게 찼다가 거의 바닥까지 떨어지는 패턴이 반복된다 | 준비 상태가 들쭉날쭉하다 |
| 0.7 | 바닥까지 떨어지지 않고 어느 정도 유지된다 | 비교적 안정적인 타협점이다 |
| 1.0 | 높은 수준에서 거의 계속 유지된다 | 실행할 action은 넉넉하지만 새 observation 변화에 덜 민감해질 가능성이 있다 |

observation filtering은 들어오는 observation을 모두 처리하지 않고 joint-space에서 거의 비슷한 상태면 건너뛰는 장치다. 해설은 이를 같은 장면을 거의 반복해서 또 해석하지 않도록 하는 장치라고 설명한다. 두 장치는 같은 목표를 향한다. action queue가 비기 전에 새 action이 도착하게 만들어 로봇을 멈춰 세우지 않는 것이다.

### 구조 선택 요약

지금까지의 선택을 한 표로 모으면 SmolVLA가 무엇을 줄이고 무엇을 남겼는지가 드러난다.

| 구조적 선택 | 왜 필요한가 |
|---|---|
| compact pretrained VLM | 이미지와 언어 이해 능력은 활용하면서 모델을 가볍게 유지한다 |
| visual token reduction | 이미지 처리 비용을 줄여 추론을 빠르게 한다 |
| layer skipping | VLM의 유용한 중간 feature만 활용해 계산량을 줄인다 |
| state token prefix | 로봇 상태를 장면 이해 단계부터 반영한다 |
| interleaved CA + SA action expert | VLM 조건과 action chunk의 시간 흐름을 함께 반영한다 |
| asynchronous inference | 로봇 실행과 다음 action 예측을 겹쳐 지연을 줄인다 |

SmolVLA는 단순히 모델 크기를 줄인 접근이 아니라, VLA에 꼭 필요한 요소는 유지하면서 실제 로봇 실험과 배포에 부담이 되는 계산 경로를 줄인 모델이다.

## 결과

### 실제 로봇 벤치마크

Table 3은 SO100 로봇에서 Pick-Place, Stacking, Sorting 세 과제를 평가한 결과다. 평균 성공률만 보면 SmolVLA 0.45B가 가장 높다.

| 모델 | 평균 성공률 |
|---|---|
| ACT | 48.3% |
| π0 | 61.7% |
| SmolVLA 0.45B | 78.3% |

과제별로 내려가면 결과가 갈린다. SmolVLA가 모든 과제에서 앞서지는 않는다.

| 과제 | SmolVLA 0.45B | 비고 |
|---|---|---|
| Pick-Place | 75% | π0가 100%로 가장 높다 |
| Stacking | 90% | SmolVLA가 더 좋은 결과를 보인다 |
| Sorting | 70% | SmolVLA가 더 좋은 결과를 보인다 |

해설은 이 결과를 모든 과제에서 항상 최고인 모델로 읽지 않는다. 작은 모델임에도 여러 실제 로봇 과제에서 안정적인 평균 성능을 내는 모델에 가깝다고 본다.

### 학습 분포 밖 일반화

Table 4는 SO101 로봇의 Pick-Place-Lego 과제를 두 조건으로 나눠 평가한다.

- in-distribution: 학습 데이터와 비슷한 조건에서 평가한다.
- out-of-distribution: 학습 중에 보지 못한 새로운 위치에 Lego 물체를 배치해 평가한다.

| 모델 | in-distribution | out-of-distribution |
|---|---|---|
| ACT | 70% | 40% |
| SmolVLA 0.45B | 90% | 50% |

이 표는 두 가지를 함께 보여준다. SmolVLA는 학습 데이터와 비슷한 조건에서 ACT보다 20%p 높고, 물체가 학습에서 보지 못한 위치로 옮겨져도 성능이 크게 하락하지는 않는다. 반면 분포 밖 성공률 50%는 절반은 실패한다는 뜻이라 한계로도 읽힌다.

해설은 여기에 더 다양한 데이터와 더 넓은 embodiment 학습이 필요하다는 조건을 붙인다. embodiment는 로봇의 물리적 형상과 그에 딸린 제어 API 구성을 뜻한다.

### community dataset pre-training의 효과

Table 5는 SmolVLA 0.45B를 대상으로 학습 구성만 바꿔 가며 평균 성공률을 비교한다. 이 해설이 결과 장에서 가장 크게 다루는 표다.

| 학습 구성 | 평균 성공률 |
|---|---|
| single-task training | 40% |
| multi-task training | 51.7% |
| multi-task + community dataset pre-training | 78.3% |

여러 과제를 함께 학습하는 것만으로 11.7%p가 오르고, 공개 커뮤니티 데이터셋 pre-training까지 더하면 26.6%p가 더 오른다. 즉 SmolVLA의 성능은 모델 구조만으로 나온 결과가 아니다.

로봇은 하나의 과제만 반복해 배운다고 계속 좋아지지 않는다. 여러 과제와 다양한 action 데이터를 미리 경험하면 새 과제를 배울 때 더 좋은 출발점에서 시작한다는 것이 이 표의 결론이다. 이 관점에서 community pre-training은 단순한 데이터 수집 전략이 아니라 작은 모델에게 더 넓은 경험을 미리 학습시키는 방법이다.

### 추론 구조 비교

Figure 5는 synchronous inference와 asynchronous inference를 비교하는데, 기준은 성공률이 아니라 속도다.

| 항목 | synchronous | asynchronous |
|---|---|---|
| 평균 성공률 | 78.3% | 73.3% |
| Pick-Place 평균 완료 시간 | 13.75초 | 9.70초 |
| 고정 시간 안에 처리한 cube 수 | 9개 | 19개 |

성공률만 놓고 보면 asynchronous 쪽이 5.0%p 낮아 항상 더 좋다고 말하기 어렵다. 반면 완료 시간은 4.05초 줄고, 정해진 시간 안에 pick-and-place에 성공한 cube 수는 9개에서 19개로 2배 이상 늘어난다. 성공률의 5.0%p 차이보다 단위 시간당 처리량의 차이가 훨씬 크다.

해설이 이 결과에서 끌어내는 결론은 로봇이 정답 action을 생성하는 것만으로는 충분하지 않다는 것이다. 그 action을 제때 생성하고 끊기지 않게 실행해야 하며, SmolVLA의 효율성은 모델 크기만이 아니라 실행 시간과 계산 시간을 겹치게 만든 구조에서도 나온다.

## 한계

한계 장은 결과 장만큼 길고 항목이 다섯이다.

### 데이터 다양성

pre-training에 쓴 데이터가 주로 SO100 계열 로봇에서 수집된 것이라 여러 로봇 형태를 폭넓게 포함한 cross-embodiment 데이터로 보기 어렵다. 해설은 이를 SmolVLA만의 약점이 아니라 VLA 연구 전체가 마주한 문제에 가깝다고 본다.

로봇 데이터는 텍스트나 이미지처럼 인터넷에서 수집할 수 없기 때문이다. 실제 로봇을 움직이고 환경을 준비해야 하며, 사람의 시연 데이터(demonstration)나 teleoperation이 필요하다. teleoperation은 사람이 로봇을 원격으로 움직여 시연을 만드는 방식이다. 따라서 community dataset을 강조한 점은 중요하지만, 그 데이터가 더 다양한 로봇과 환경으로 확장되어야 한다는 과제는 남는다.

### 데이터 규모

SmolVLA는 약 2만 3천 개의 trajectory로 학습했다. trajectory는 observation과 action이 시간순으로 이어진 실행 기록이다. 저비용 로봇과 공개 커뮤니티 데이터 기반이라는 점에서는 의미가 있지만, 약 100만 개를 쓴 OpenVLA와 비교하면 40배 이상 차이가 난다.

물론 SmolVLA의 목표는 가장 큰 데이터로 가장 큰 모델을 학습하는 데 있지 않고, 작은 데이터와 작은 모델로도 경쟁력 있는 결과가 나온다는 것을 보이는 데 있다. 다만 더 복잡한 환경과 다양한 작업으로 확장하려면 규모의 한계가 다시 문제가 된다.

| 확장하려는 방향 | 더 많은 데이터가 필요한 이유 |
|---|---|
| 다양한 물체 조작 | 물체의 크기, 재질, 무게, 형태가 달라지기 때문 |
| 다양한 환경 | 조명, 배경, 카메라 시점, 작업대 구조가 달라지기 때문 |
| 다양한 작업 지시 | 같은 action이라도 언어 표현이 다양해지기 때문 |
| 장기 작업 | 여러 단계의 action 순서를 안정적으로 이어야 하기 때문 |
| 새로운 로봇 플랫폼 | embodiment와 action space가 달라지기 때문 |

### backbone 적합성

SmolVLA는 이미 만들어진 VLM을 가져와 backbone으로 쓰는데, 일반 VLM이 로봇 제어에 최적인 표현을 주는지는 아직 확인되지 않았다. 일반 VLM은 이미지 설명, 문서 이해, OCR, 시각 질의응답 같은 작업에서 강한 성능을 내도록 학습되기 때문이다.

로봇에게 필요한 시각 이해는 그와 다르다. 무엇이 보이는지 아는 것만으로는 부족하고, 본 것을 action과 연결해야 한다.

| 일반 VLM이 잘하는 것 | 로봇 VLA에 더 필요한 것 |
|---|---|
| 이미지 속 물체 인식 | 잡을 수 있는 위치와 방향 이해 |
| 장면 설명 | 실행 가능한 affordance 이해 |
| 텍스트 질문에 답변 | 언어 지시를 action sequence로 변환 |
| 문서와 텍스트 읽기 | 물리적 접촉과 조작 결과 예측 |
| 정적인 이미지 이해 | 시간에 따른 상태 변화 이해 |

affordance는 물체가 허용하는 상호작용 가능성을 뜻한다. SmolVLA는 작은 VLM을 효율적으로 활용했지만, 어떤 VLM을 backbone으로 고르느냐 그리고 로봇 환경에 맞는 pre-training이 따로 필요한지는 여전히 열린 문제로 남는다.

### 장기 과제

SmolVLA가 좋은 결과를 낸 Pick-Place, Stacking, Sorting은 모두 비교적 짧은 조작 과제다. 반면 실제 서비스 로봇이 수행해야 하는 작업은 훨씬 길고 복잡하다.

- 책상 위 물건을 종류별로 정리하기
- 냉장고에서 음료를 꺼내 컵에 따르기
- 여러 물체를 순서대로 조립하기

이런 작업은 action chunk 하나로 끝나지 않는다. 중간 목표를 세우고, 실패를 감지하고, 다시 계획하고, 여러 단계의 action을 안정적으로 이어야 한다.

| 필요한 요소 | 이유 |
|---|---|
| 계층적 policy | 큰 작업을 여러 단계로 나누기 위해 |
| 장기 메모리 | 이전 상태와 수행한 action을 기억하기 위해 |
| 실패 감지 | 잘못된 조작을 인식하고 복구하기 위해 |
| 고수준 planning | 다음 action뿐 아니라 전체 작업 순서를 계획하기 위해 |
| human feedback | 사람의 개입이나 수정 지시를 반영하기 위해 |

asynchronous inference는 반응성과 실행 효율을 높이는 데 도움이 되지만, 장기 작업에서는 속도만으로 부족하다는 조건이 붙는다.

### imitation learning 중심 학습

SmolVLA는 기본적으로 imitation learning에 의존한다. imitation learning은 시연 데이터를 흉내 내 policy를 학습하는 방법으로, Pick-Place처럼 사람이 시연하기 쉬운 작업에서 특히 효과적이다.

문제는 시연에 없는 상황이다. 시연 데이터에 없는 장면이 나오면 로봇이 어떻게 복구해야 할지 알기 어렵고, 시연이 특정 환경에 치우쳐 있으면 그 편향까지 함께 학습한다. 예를 들어 학습 데이터에서 물체가 항상 작업대 중앙에 있었다면 물체가 가장자리로 옮겨졌을 때 성능이 떨어진다. 시연자가 항상 같은 순서로 움직였다면 다른 순서의 해결 방법을 스스로 발견하기도 어렵다.

대안으로는 강화학습이나 self-improvement가 거론된다. 다만 실제 로봇에 바로 적용하기는 쉽지 않다. 실패 비용이 크고, 하드웨어 손상 위험이 있으며, 많은 시도가 필요하기 때문이다. 그럼에도 더 복잡한 작업과 새로운 환경에 적응하려면 사람의 시연을 따라 하는 것을 넘어 스스로 시행착오로 개선하는 방향이 필요하다는 것이 이 절의 결론이다.

## 시리즈에서의 위치

이 편은 [[physical-ai/jo-2026-rt-1-vla-primer|RT-1]], [[physical-ai/jo-2026-rt-2-vla-primer|RT-2]], [[physical-ai/jo-2026-act-vla-primer|ACT]], [[physical-ai/jo-2026-openvla-vla-primer|OpenVLA]], [[physical-ai/jo-2026-pi-0-6-vla-primer|π0.6]]으로 이어져 온 시리즈의 연장이다. 앞 편들이 학습 방법을 기준으로 모델을 배열했다면 이번 편은 그 기준을 배포 비용으로 바꾼다. 모델을 작게 만드는 문제를 정면으로 다루는 것은 시리즈에서 이 편이 처음이다.

마무리 장의 주장도 같은 방향이다. VLA는 더 커지는 방향으로만 발전하지 않으며, 더 작고 빠르고 쉽게 실험할 수 있는 방향도 중요하다는 것이다. 그래서 π0 같은 대형 VLA를 직접 구동하기에 자원 부담이 큰 입문자에게 SmolVLA를 출발점으로 권하고, 직접 로봇 데이터를 수집해 보라는 권유로 글을 닫는다. 그 실습 경로는 [[physical-ai/huggingface-lerobot|LeRobot]]으로 이어진다.

도식의 출처는 대부분 원 논문이다. 이 해설이 옮겨 온 도식 13종 가운데 12종은 논문의 figure와 table을 영문 캡션째로 캡처한 것이라 원본 크롭이 더 깨끗하고, 그 크롭은 [[physical-ai/shukor-2025-smolvla-a-vision-language-action-model]]에 이미 정리되어 있다. 이 해설에서만 볼 수 있는 것은 저자가 action expert 블록에 빨간 테두리를 그려 넣은 위 Figure 1뿐이다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| layer skipping | VLM의 마지막 L - N개 layer를 쓰지 않고 앞쪽 절반 정도만 통과시키는 설계 |
| visual token reduction | image tiling을 끄고 pixel shuffle을 적용해 프레임당 visual token을 64개로 제한하는 방식 |
| action expert | VLM feature를 조건으로 받아 action chunk를 생성하는 모듈. cross-attention과 self-attention을 번갈아 쌓는다 |
| asynchronous inference | action 실행과 policy 추론을 RobotClient와 PolicyServer로 나눠 겹쳐 진행하는 실행 구조 |
| queue threshold (g) | 남은 action 비율이 이 값 아래로 떨어지면 다음 추론을 시작하는 기준 |
| observation filtering | joint-space에서 거의 같은 상태의 observation은 처리를 건너뛰는 장치 |

## 관련 페이지

- [[physical-ai/shukor-2025-smolvla-a-vision-language-action-model]]: 이 페이지가 해설하는 원 논문. 수치와 ablation, 도식 원본이 논문 페이지에 정리되어 있다.
- [[physical-ai/huggingface-lerobot]]: 이 해설이 권하는 실습 경로. SmolVLA policy가 포함되어 있다.
- [[physical-ai/black-2024-pi0-a-vision-language-action-flow-model]]: 본문이 계속 비교 대상으로 삼는 π0 논문. flow matching과 action expert의 원형이다.
- [[physical-ai/kim-2024-openvla-an-open-source-vision-language-action-model]]: 데이터 규모 한계 절의 비교 대상인 OpenVLA 논문.
- [[physical-ai/jo-2026-pi-0-6-vla-primer]]: 같은 시리즈 03-09편.
- [[physical-ai/jo-2026-openvla-vla-primer]]: 같은 시리즈 03-06편. 데이터 규모 비교 대상인 OpenVLA를 다룬다.
- [[physical-ai/jo-2026-act-vla-primer]]: 같은 시리즈 03-05편. SO100과 SO101 벤치마크의 비교 대상인 ACT를 다룬다.
- [[physical-ai/jo-2026-rt-2-vla-primer]]: 같은 시리즈 03-04편.
- [[physical-ai/jo-2026-rt-1-vla-primer]]: 같은 시리즈 03-03편.
- [[overviews/glossary-physical-ai]]: 이 페이지가 따르는 용어 canonical 표기.
- [[overviews/physical-ai-overview]]: physical-ai 카테고리의 분류 뼈대와 학습 경로 허브.
