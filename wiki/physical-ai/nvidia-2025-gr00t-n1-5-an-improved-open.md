---
title: "GR00T N1.5"
type: article
year: 2025
category: physical-ai
source: nvidia-2025-gr00t-n1-5-an-improved-open.md
raw_path: raw/articles/nvidia-2025-gr00t-n1-5-an-improved-open.md
raw_filename: "nvidia-2025-gr00t-n1-5-an-improved-open.md"
source_collection: external
author: "NVIDIA GEAR Lab"
url: "https://research.nvidia.com/labs/gear/gr00t-n1_5/"
publisher: "NVIDIA Research (GEAR Lab)"
tags: [physical-ai, vla, humanoid, manipulation]
figures:
  - id: fig01
    file: assets/nvidia-2025-gr00t-n1-5-an-improved-open/fig01.svg
    raw: raw/articles/nvidia-2025-gr00t-n1-5-an-improved-open-figures/fig01.svg
    caption: "GR00T N1.5 구조도. Eagle-2 VLM과 robot state, noised action을 함께 처리하는 DiT 블록"
    strategy: fetched
    curated: true
  - id: fig02
    file: assets/nvidia-2025-gr00t-n1-5-an-improved-open/fig02.png
    raw: raw/articles/nvidia-2025-gr00t-n1-5-an-improved-open-figures/fig02.png
    caption: "GEAR GR-1 grounding 테스트셋의 주석 예시. 지시 표현마다 박스가 달려 있다"
    strategy: fetched
    curated: true
  - id: fig03
    file: assets/nvidia-2025-gr00t-n1-5-an-improved-open/fig03.png
    raw: raw/articles/nvidia-2025-gr00t-n1-5-an-improved-open-figures/fig03.png
    caption: "모델 출력 예시. \"green vegetable held in right hand\" 한 건에 박스를 예측했다"
    strategy: fetched
    curated: true
  - id: fig04
    file: assets/nvidia-2025-gr00t-n1-5-an-improved-open/fig04.png
    raw: raw/articles/nvidia-2025-gr00t-n1-5-an-improved-open-figures/fig04.png
    caption: "일반화 평가에 쓴 미학습 물체 10종"
    strategy: fetched
    curated: true
  - id: fig05
    file: assets/nvidia-2025-gr00t-n1-5-an-improved-open/fig05.jpg
    raw: raw/articles/nvidia-2025-gr00t-n1-5-an-improved-open-figures/fig05.jpg
    caption: "Unitree G1 실험 장면. 과일 4종 중 2택 설정"
    strategy: fetched
    curated: true
  - id: fig06
    file: assets/nvidia-2025-gr00t-n1-5-an-improved-open/fig06.jpg
    raw: raw/articles/nvidia-2025-gr00t-n1-5-an-improved-open-figures/fig06.jpg
    caption: "Unitree G1 실험 장면. 미학습 물체 5종 중 2택 설정"
    strategy: fetched
    curated: true
  - id: fig13
    file: assets/nvidia-2025-gr00t-n1-5-an-improved-open/fig13.svg
    raw: raw/articles/nvidia-2025-gr00t-n1-5-an-improved-open-figures/fig13.svg
    caption: "pre-training 데이터 구성. Real GR-1, OpenXE, Sim GR-1이 각 27.3%, DreamGen과 AgiBot-Beta가 각 9.1%"
    strategy: fetched
    curated: true
---

## 요약

GR00T N1.5는 NVIDIA GEAR Lab이 휴머노이드 로봇용 foundation model GR00T N1을 개선해 내놓은 후속 버전이고, 이 페이지는 그 공식 프로젝트 페이지를 정리한 것이다. 원문은 논문이 아니라 변경 사항과 벤치마크 수치, 영상 데모를 모아 둔 릴리스 노트에 가깝다. 저자 38명이 알파벳순으로 나열돼 있으며 Johan Bjorck, Linxi "Jim" Fan, Dieter Fox, Jan Kautz, Yuke Zhu 등 GR00T N1 논문과 겹치는 이름이 많다.

N1.5가 바꾼 지점은 네 가지다. VLM을 고정하고 adapter를 단순화한 구조 변경, Eagle 2.5에서 다시 튜닝한 grounding 능력, flow matching 손실에 추가한 FLARE 손실, 그리고 DreamGen이 만든 합성 데이터의 투입이다. 이 변경으로 실제 GR-1 로봇에서 지시를 따른 비율이 46.6%에서 93.3%로, Unitree G1 post-training 성공률이 44.0%에서 98.8%로 올랐다.

이 페이지는 NVIDIA가 공식 글에서 밝힌 범위, 즉 변경점과 벤치마크와 공개 범위에 집중한다. FLARE의 손실 함수 구성과 DreamGen 4단계 파이프라인의 세부는 같은 모델을 다룬 한국어 해설 [[physical-ai/jo-2026-groot-n1-5-vla-primer]]가 맡는다.

## 배경

GR00T N1.5는 새로운 모델 계열을 세우는 연구가 아니라 직전 세대의 약점을 겨냥한 upgrade 릴리스다. 원문은 첫 문단에서 아키텍처와 데이터와 모델링 세 방면의 개선을 적용했다고 밝히고, 사용자가 체감할 이득으로 일반화와 language following 두 측면을 지목한다.

지목된 두 측면이 곧 N1의 약점이었다는 사실은 뒤의 수치가 보여준다. 목표 물체가 왼손 쪽과 오른손 쪽에 각각 50% 확률로 놓이는 과제에서 N1의 language following rate는 46.6%였다. 즉 지시를 읽지 않고 무작위로 고른 것과 구별되지 않는 수준이다.

따라서 이 글은 GR00T N1의 구조를 전제로 깔고 무엇을 바꿨는지만 적는다. dual-system 구성이나 data pyramid 같은 기본 설계는 [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation]]이 정본이므로, 그 페이지를 먼저 읽는 순서를 권한다.

## 핵심 개념

이 절의 용어만 잡으면 뒤의 변경 사항과 벤치마크가 그대로 읽힌다.

policy는 현재 observation을 받아 다음 action을 정하는 함수를 말하고, observation은 매 timestep에 policy가 받는 센서 입력이다. GR00T 계열에서 이 observation은 카메라 이미지와 로봇의 관절 상태, 그리고 지시문(instruction)으로 구성된다.

flow matching은 noise에서 데이터로 향하는 vector field를 학습해 샘플을 만드는 생성 기법이다. GR00T는 이것으로 이산 분류 대신 연속적인 제어 명령을 직접 만들어 낸다.

DiT는 diffusion 모델의 denoising 신경망을 Transformer로 구현한 구조다. GR00T에서는 VLM이 만든 vision-language 임베딩을 참조하면서 로봇 상태와 noise가 섞인 action을 함께 처리하는 action head 자리에 놓인다.

grounding은 언어 표현을 이미지 속 실제 물체나 영역에 붙이는 능력을 뜻한다. "오른손에 든 초록 채소" 같은 지시 표현을 받아 그 대상의 박스를 예측하는 일이 여기에 해당하며, N1.5가 가장 크게 개선한 능력이다.

neural trajectory는 video world model이 만들어낸 합성 trajectory 데이터를 가리킨다. 사람이 teleoperation으로 모은 기록이 아니라 모델이 생성한 실행 기록이라는 점에서 실제 로봇 데이터와 구분된다.

language following rate는 로봇이 지시한 물체를 실제로 골랐는지만 재는 지표다. 과제를 끝냈는지를 재는 전체 성공률과 따로 집계하기 때문에, 동작은 되는데 지시를 못 읽는 상태를 분리해서 볼 수 있다.

## 방법

### 구조 변경

N1.5는 N1의 뼈대를 그대로 두고 연결부와 학습 목표만 바꿨다. NVIDIA Eagle VLM이 텍스트와 시각 observation을 인코딩하고, 거기서 나온 vision-language 임베딩을 DiT가 cross-attention으로 참조하며, DiT가 로봇 상태와 noise가 섞인 action을 함께 처리하는 구성은 두 버전이 같다.

![[assets/nvidia-2025-gr00t-n1-5-an-improved-open/fig01.svg]]
*Figure 1: GR00T N1.5 구조도. 왼쪽 Eagle-2 VLM이 이미지와 지시문을 받고, 오른쪽 DiT 블록이 robot state와 noised action을 cross-attention과 self-attention으로 K회 반복 처리해 motor action을 낸다 (NVIDIA GEAR Lab 2025).*

두 버전의 차이는 다음 표와 같다.

| 항목 | GR00T N1 | GR00T N1.5 |
|---|---|---|
| VLM 가중치 | 학습 중 함께 갱신 | pre-training과 fine-tuning 모두에서 고정 |
| adapter MLP | vision encoder와 LLM을 잇는 MLP | 같은 MLP를 단순화 |
| layer normalization | 적용하지 않음 | LLM에 들어가는 시각 토큰과 텍스트 토큰 임베딩 양쪽에 적용 |
| VLM backbone | NVIDIA Eagle | Eagle 2.5에서 grounding과 물리 이해를 겨냥해 재튜닝 |
| 학습 손실 | flow matching 손실 | flow matching 손실에 FLARE 손실 추가 |
| pre-training 데이터 | 내부 GR-1 데이터와 공개 데이터셋 중심 | DreamGen의 neural trajectory와 AgiBot-Beta 추가 |

표의 앞 세 행이 원문이 "main differences"로 꼽은 구조 변경이다. 원문은 이것을 VLM 고정과 adapter 개편 두 항목으로 적었고, 이 표는 adapter 개편에 딸린 layer normalization을 따로 뗐다. 나머지 세 행은 backbone과 학습 목표와 데이터에 걸친 변경이다. 저자들은 앞 세 행의 변경만으로도 language following과 일반화가 크게 좋아졌다고 적는다. 다만 어느 변경이 얼마나 기여했는지 가르는 ablation은 이 글에 없다.

### VLM grounding 강화

N1.5의 VLM은 Eagle 2.5를 출발점으로 삼아 grounding과 물리 이해를 겨냥해 다시 튜닝한 모델이다. 평가는 공개 벤치마크 RefCOCOg와 지시 표현이 달린 내부 데이터셋 GEAR GR-1 grounding dataset 두 곳에서 했고, 비교 대상은 비슷한 규모의 오픈소스 모델 Qwen2.5-VL-3B다.

![[assets/nvidia-2025-gr00t-n1-5-an-improved-open/fig02.png]]
*Figure 2: GEAR GR-1 grounding 테스트셋의 주석 예시. 물체뿐 아니라 "metal robot left thumb above the table"처럼 로봇 자신의 부위와 공간 관계까지 지시 표현으로 달려 있다 (NVIDIA GEAR Lab 2025).*

![[assets/nvidia-2025-gr00t-n1-5-an-improved-open/fig03.png]]
*Figure 3: 모델 출력 예시. "green vegetable held in right hand" 한 건에 대해 박스를 예측했다 (NVIDIA GEAR Lab 2025).*

| 모델 | 크기 | GR-1 grounding IoU ↑ | RefCOCOg-val IoU ↑ |
|---|---|---|---|
| Qwen2.5-VL | 3B | 35.5 | 85.2 |
| GR00T N1.5 VLM | 2.1B | 40.4 | 89.6 |

파라미터가 3B에서 2.1B로 줄었는데도 두 지표 모두 앞선다. 내부 데이터셋에서 IoU가 35.5에서 40.4로 4.9만큼, 공개 벤치마크에서 85.2에서 89.6으로 4.4만큼 높다. 다만 내부 데이터셋의 절대 수준은 40.4로 공개 벤치마크의 89.6보다 한참 낮은데, 로봇 시점 장면의 지시 표현이 일반 이미지보다 어려운 문제라는 뜻이다.

### FLARE 손실 추가

N1.5는 N1이 쓰던 flow matching 손실에 Future LAtent Representation Alignment 손실을 더했다. GEAR의 별도 프로젝트인 FLARE에서 온 기법으로, 미래 프레임을 직접 생성해 맞히는 대신 미래 임베딩을 타깃으로 두고 모델 표현을 거기에 맞춘다.

이 방식의 이득은 두 가지다. 첫째로 policy 성능 자체가 올라가고, 둘째로 픽셀 생성을 거치지 않기 때문에 action 라벨이 없는 사람 1인칭 영상까지 학습에 쓸 수 있다. 두 번째 이득이 뒤의 미학습 물체 일반화 실험에서 55.0%라는 수치로 이어진다.

원문은 FLARE를 이 정도 분량으로만 설명하고 세부는 프로젝트 페이지로 넘긴다. 손실 함수의 구성, DiT에 추가되는 future token, 중간 layer에서 미래 정보를 뽑는 이유는 [[physical-ai/jo-2026-groot-n1-5-vla-primer]]가 다루고, 같은 계열의 latent 공간 world modeling 흐름은 [[physical-ai/hou-2026-world-model-for-robot-learning]]이 정리한다.

### 학습 설정

학습 규모와 하이퍼파라미터는 원문이 다음 값만 공개한다.

| 항목 | 값 |
|---|---|
| 학습 step | 25만 step |
| 연산 자원 | H100 1,000장 |
| global batch size | 16,384 |
| optimizer | AdamW |
| learning rate schedule | cosine schedule, warmup ratio 0.05 |
| FLARE 손실 계수 | pre-training과 post-training 모두 0.2 |

optimizer와 schedule은 N1과 같은 설정을 그대로 이어받았다고 원문이 밝힌다. 즉 이 릴리스에서 바뀐 것은 학습 절차가 아니라 모델 구조와 손실과 데이터다.

### pre-training 데이터 구성

pre-training mixture는 성격이 다른 다섯 원천으로 이루어진다.

![[assets/nvidia-2025-gr00t-n1-5-an-improved-open/fig13.svg]]
*Figure 4: pre-training 데이터 구성. Real GR-1, OpenXE, Sim GR-1이 각 27.3%, DreamGen과 AgiBot-Beta가 각 9.1%다 (NVIDIA GEAR Lab 2025).*

| 데이터 원천 | 비중 | 성격 |
|---|---|---|
| Real GR-1 | 27.3% | 내부에서 모은 실제 GR-1 로봇 데이터 |
| OpenXE | 27.3% | 외부 공개 데이터셋 |
| Sim GR-1 (DexMG) | 27.3% | 시뮬레이션으로 만든 GR-1 데이터 |
| DreamGen | 9.1% | DreamGen이 생성한 neural trajectory |
| AgiBot-Beta | 9.1% | 외부 로봇 데이터셋 |

실제 로봇 데이터와 공개 데이터셋과 시뮬레이션이 합쳐 81.9%를 이루고, 합성 데이터와 외부 데이터가 나머지를 채운다. 합성 데이터의 비중은 10%에 못 미치지만, 뒤의 신규 동사 실험에서 저자들이 성능 차이의 근거로 드는 것이 이 데이터다.

OpenXE는 원문에 표기만 있고 풀이가 없다. 문맥상 Open X-Embodiment를 가리키는 것으로 보이지만 원문이 확인해 주지 않으므로, 인용할 때는 표기를 그대로 두는 편이 안전하다. 관련 공개 데이터셋은 [[physical-ai/open-x-embodiment-2023-robotic-learning-datasets-and-rt-x]]가 다룬다.

## 결과

### 구조 변경의 검증

구조를 고르기 위해 저자들은 pre-training 없이 scratch부터 학습한 policy를 언어 지시가 필요한 시뮬레이션 벤치마크 두 곳에서 비교했다. Language Table과 언어가 들어가는 Sim GR-1 과제 다섯 묶음이다.

| 벤치마크 | GR00T N1 (scratch) | GR00T N1.5 (scratch) |
|---|---|---|
| Language Table | 52.8% | 93.2% |
| Sim GR-1 Language | 36.4% | 54.4% |

Language Table에서 40.4%p, Sim GR-1 Language에서 18.0%p 차이가 난다. pre-training을 거치지 않은 조건에서 벌어진 차이이므로 데이터가 아니라 구조 자체의 효과로 읽을 수 있고, 원문도 이 결과를 언어 조건 제어 능력이 강해진 근거로 든다.

### 데이터가 적은 조건의 post-training

N1의 평가 규약을 그대로 따라 데이터가 부족한 상황을 재현했다. Sim GR-1은 pre-training mixture에 같은 embodiment의 다른 과제가 들어 있어 0-shot 측정도 가능하다. embodiment는 로봇의 물리적 형상과 그에 딸린 제어 API 구성을 가리킨다.

| 시뮬레이션 벤치마크 | GR00T N1 | GR00T N1.5 |
|---|---|---|
| RoboCasa, 과제당 시연 데이터 30개 | 17.4 | 47.5 |
| Sim GR-1, 0-shot | 39.6 | 43.9 |
| Sim GR-1, 과제당 시연 데이터 30개 | 43.2 | 47.4 |

원문 표는 이 세 행에만 % 기호를 붙이지 않았고, 다른 절의 성공률 표와 같은 지표로 읽힌다. RoboCasa에서 17.4가 47.5로 2.7배가 되어 격차가 가장 크고, Sim GR-1의 두 조건에서는 4.3과 4.2만큼 오른다. 데이터가 극히 적은 구간일수록 차이가 커진다는 것이 저자들의 요약이다. 이 측정에 쓰인 시뮬레이션 환경의 원 논문은 [[physical-ai/nasiriany-2024-robocasa-large-scale-simulation-of-everyday]]가 다룬다.

### 실제 GR-1 로봇의 지시 따르기

실제 로봇 평가에는 간단한 지시 따르기 과제를 새로 넣었다. 탁자에 과일 두 개를 놓고 그중 하나를 접시에 올리라고 시키며, 목표 과일이 왼손 쪽에 가까울지 오른손 쪽에 가까울지는 50% 확률로 정해진다.

| 설정 | GR00T N1 | GR00T N1.5 |
|---|---|---|
| language following rate | 46.6% | 93.3% |
| 전체 성공률 | 43.3% | 83.0% |

두 모델 모두 과일 하나를 접시에 올리는 동작 자체는 꾸준히 해낸다. 차이가 나는 지점은 지시한 물체를 실제로 골랐는지다. N1의 46.6%는 50% 확률로 놓인 두 물체 중 하나를 무작위로 고른 것과 구별되지 않는다. language following rate가 46.7%p 오르자 전체 성공률도 39.7%p 따라 올랐다.

### 미학습 물체 일반화

일반화 능력은 pre-training에서 본 적 없는 물체 10종으로 pick-and-place를 시켜 측정했다.

![[assets/nvidia-2025-gr00t-n1-5-an-improved-open/fig04.png]]
*Figure 5: 일반화 평가에 쓴 미학습 물체 10종. 우산, 선글라스, 망치, 분무기처럼 pre-training의 과일류와 성격이 다른 물건들이다 (NVIDIA GEAR Lab 2025).*

| 설정 | GR00T N1 | GR00T N1.5 |
|---|---|---|
| 0-shot | 0% | 15.0% |
| 사람 영상 co-training 후 FLARE post-training | 측정값 없음 | 55.0% |

N1은 0-shot에서 한 번도 성공하지 못한다. 아래 행은 미학습 물체가 담긴 사람 1인칭 영상을 함께 학습시킨 조건이다. 원문은 이 조건을 사람 영상과 최소한의 로봇 시연 데이터(demonstration)를 함께 쓰는 방식으로 설명하며, 함께 실은 영상에서 GoPro로 찍은 사람 시점과 GR-1 로봇 시점을 나란히 보여준다. N1은 사람 영상 학습 자체가 불가능해 비교값이 없다.

### 신규 동사 일반화

teleoperation으로 모으지 않은 새 동사 12종을 DreamGen 파이프라인으로 합성해 pre-training에 넣었다. 성공률은 N1.5가 38.3%, N1이 13.1%로 약 2.9배 차이다. 원문은 N1이 pre-training에 들어 있던 pick-and-place 같은 과제만 반복했다고 적는다.

원문은 여기에 단서를 단다. teleoperation 데이터를 모으지 않았다는 뜻에서만 zero-shot이지 DreamGen이 만든 trajectory로는 명시적으로 학습했다는 것이다. 따라서 동사와 환경 양쪽의 완전한 zero-shot 일반화는 향후 과제로 남았다. DreamGen이 바탕으로 삼은 영상 생성 기술은 [[physical-ai/nvidia-2025-cosmos-world-foundation-model-platform]]이 다룬다.

### Unitree G1 post-training

GR-1이 아닌 다른 embodiment에서도 같은 개선이 나타나는지 확인했다. Unitree G1으로 teleoperation episode 1,000개를 모아 post-training했고, 장면은 GR-1 실험과 같이 목표 물체 하나와 방해 물체 하나를 놓는 방식으로 구성했다.

![[assets/nvidia-2025-gr00t-n1-5-an-improved-open/fig05.jpg]]
*Figure 6: Unitree G1 실험 장면. 과일 4종 중 2택 설정이다 (NVIDIA GEAR Lab 2025).*

![[assets/nvidia-2025-gr00t-n1-5-an-improved-open/fig06.jpg]]
*Figure 7: Unitree G1 실험 장면. 미학습 물체 5종 중 2택 설정이다 (NVIDIA GEAR Lab 2025).*

| 설정 | 성공률 |
|---|---|
| GR00T N1, episode 1,000개, 과일 4종 중 2택 | 44.0% |
| GR00T N1.5, episode 1,000개, 과일 4종 중 2택 | 98.8% |
| GR00T N1.5, episode 1,000개, 미학습 물체 5종 중 2택 | 84.2% |

과일은 GR-1 pre-training 코퍼스에 있던 물체다. 세 번째 행은 그 코퍼스에 없던 물체 5종으로 바꾼 조건이라 embodiment와 물체가 동시에 바뀌는데도 84.2%가 나온다. 원문이 함께 실은 영상의 지시문은 "Place the bag of chips to the pink plate"와 "Place the soap to the blue plate"로, 과일 이외의 일상 물체까지 지시 대상으로 삼았음을 보여준다.

### 저자들의 종합

원문 discussion은 세 가지 개선을 성과로 꼽는다. 성공률이 올랐고, 더 다양한 데이터 원천을 쓸 수 있게 됐으며, language following이 크게 좋아졌다는 것이다. 저자들은 이 개선을 grounding 능력 향상과 FLARE 손실과 DreamGen의 다양한 데이터에 귀속시킨다. 다만 이 귀속은 저자의 해석이고 측정으로 뒷받침된 분해는 아니다.

## 공개 범위와 계보

원문은 모델을 곧 오픈소스로 공개하겠다고 밝히며, 사용자가 자기 로봇에 fine-tuning했을 때 더 나은 결과를 보기를 기대한다고 적는다. 실제 배포와 실행 절차는 [[physical-ai/nvidia-isaac-gr00t]]가 다루는데, 이 저장소는 현재 N1.7을 배포하며 backbone이 Cosmos-Reason2-2B로 바뀌어 있다.

VLM backbone의 계보는 이름이 겹쳐 혼동하기 쉬운 지점이다. 저장소 기록은 Eagle 2가 N1을, Eagle 2.5가 N1.5를, native resolution 변형이 N1.6을 받쳤고 N1.7에서 Cosmos-Reason2-2B로 교체되며 계보가 끊긴다고 적는다. 다만 GR00T N1 논문이 말하는 Eagle-2는 SmolLM2와 SigLIP-2 기반 소형 변형이고, model zoo가 배포하는 Eagle2-1B와 2B와 9B는 Qwen2.5 기반이다. 기술 내용은 [[llms/chen-2025-eagle-25-boosting-long-context-post-training]]이, 채택 이력과 model zoo 구성은 [[llms/nvlabs-eagle]]이 다룬다.

문서 자체의 성격도 인용할 때 참고할 만하다. 페이지에는 발행일 표기가 없어 이 wiki에서는 GR00T N1과 같은 2025년으로 기록했다. 페이지가 스스로 붙인 주제 태그는 Foundation Model, Humanoid Robot, VLM, Language Following 네 개다. 감사의 글에는 "testing GR00T N1.6"이 적혀 있어, 이 글이 쓰인 시점에 이미 다음 버전이 사내에서 시험되고 있었음을 알 수 있다.

## 한계

원문의 성격에서 오는 한계와 실험 설계에서 오는 한계가 함께 있다.

- ablation이 없다. 구조 변경 두 가지와 FLARE와 DreamGen 데이터가 각각 얼마나 기여했는지 이 글만으로는 분리할 수 없다.
- 수치에 시행 횟수나 편차가 붙어 있지 않다. 실제 로봇 성공률은 시행 수가 적으면 몇 회 차이로 몇 %p가 움직이는데, 원문이 그 정보를 주지 않는다.
- 과제 다양성이 좁다. 실제 로봇 과제는 대부분 과일이나 물체를 집어 접시에 올리는 pick-and-place 계열이다. language following을 재기에는 명확한 설계지만 조작 유형의 폭은 제한적이다.
- 완전한 zero-shot 동사와 환경 일반화는 원문이 직접 남긴 향후 과제다. 12종의 새 동사도 DreamGen trajectory로는 학습했기 때문에 엄밀한 zero-shot이 아니다.
- 미학습 물체 55.0%는 N1과 비교할 조건이 없다. N1은 사람 영상 co-training 자체가 불가능해서, FLARE의 co-training 효과가 얼마나 큰지 절대 기준이 없다.
- OpenXE는 pre-training mixture의 27.3%를 차지하면서도 원문에 풀이가 없어, 데이터 출처를 정확히 특정할 수 없다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| FLARE | Future LAtent Representation Alignment. 미래 프레임을 생성해 맞히는 대신 미래 임베딩을 타깃으로 삼아 모델 표현을 맞추는 보조 손실. action 라벨 없는 사람 영상 학습을 가능하게 한다 |
| DreamGen | 영상 생성으로 로봇 학습 데이터를 만드는 GEAR 파이프라인. N1.5 pre-training 데이터의 9.1%를 채운다 |
| neural trajectory | DreamGen이 생성한 합성 trajectory. teleoperation으로 모은 기록이 아니라 모델이 만들어낸 실행 기록이다 |
| language following rate | 지시한 물체를 실제로 골랐는지만 재는 지표. 과제 성공 여부와 따로 집계한다 |
| GEAR GR-1 grounding dataset | 지시 표현이 달린 내부 grounding 평가셋. 공개 벤치마크 RefCOCOg와 함께 쓴다 |
| DexMG | 시뮬레이션으로 만든 GR-1 데이터의 별칭. pre-training mixture에서 "Sim GR-1"로 표기된다 |

## 관련 페이지

- [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation]]: 직전 세대 논문. 이 페이지가 전제로 삼는 dual-system 구조와 data pyramid의 정본이다.
- [[physical-ai/jo-2026-groot-n1-5-vla-primer]]: 같은 모델을 다룬 한국어 입문 해설. FLARE 손실 구성과 DreamGen 4단계 파이프라인을 상세히 다룬다.
- [[physical-ai/jo-2026-groot-n1-vla-primer]]: 한 세대 앞인 N1의 한국어 입문 해설.
- [[physical-ai/nvidia-isaac-gr00t]]: 공식 구현 저장소. 현재는 N1.7 배포처이고 backbone이 Cosmos-Reason2-2B로 바뀌었다.
- [[physical-ai/nvidia-2025-accelerate-generalist-humanoid-robot-development]]: N1 릴리스 공지. GPU 요구사항과 실무 절차를 다룬다.
- [[llms/chen-2025-eagle-25-boosting-long-context-post-training]]: N1.5의 VLM backbone인 Eagle 2.5 기술 보고서.
- [[llms/nvlabs-eagle]]: Eagle 계열 저장소. GR00T 각 세대의 backbone 채택 이력이 날짜로 기록돼 있다.
- [[physical-ai/nasiriany-2024-robocasa-large-scale-simulation-of-everyday]]: RoboCasa 성능을 잰 시뮬레이션 환경의 원 논문.
- [[physical-ai/nasiriany-2026-robocasa365-a-large-scale-simulation-framework]]: 후속 벤치마크. GR00T N1.5를 다른 VLA와 같은 조건에서 재고 기준 모델로 삼는다.
- [[physical-ai/hou-2026-world-model-for-robot-learning]]: FLARE가 속한 latent 공간 world modeling 흐름.
- [[physical-ai/nvidia-2025-cosmos-world-foundation-model-platform]]: DreamGen이 바탕으로 삼은 영상 생성 기술.
- [[physical-ai/open-x-embodiment-2023-robotic-learning-datasets-and-rt-x]]: pre-training mixture의 OpenXE와 이어지는 공개 데이터셋.
- [[overviews/physical-ai-overview]]: 카테고리 지도. GR00T와 GEAR 클러스터의 위치를 보여준다.
