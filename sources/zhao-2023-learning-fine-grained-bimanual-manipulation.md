---
title: "Learning Fine-Grained Bimanual Manipulation with Low-Cost Hardware"
type: paper
year: 2023
category: physical-ai
raw_path: raw/papers/zhao-2023-learning-fine-grained-bimanual-manipulation.pdf
raw_filename: "zhao-2023-learning-fine-grained-bimanual-manipulation.pdf"
source_collection: external
authors: "Tony Z. Zhao (Stanford), Vikash Kumar (Meta), Sergey Levine (UC Berkeley), Chelsea Finn (Stanford)"
arxiv_id: "2304.13705"
url: "https://tonyzhaozh.github.io/aloha"
tags: [physical-ai, imitation-learning, manipulation, teleoperation]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/zhao-2023-learning-fine-grained-bimanual-manipulation/fig01.png
    raw: raw/papers/zhao-2023-learning-fine-grained-bimanual-manipulation-figures/fig01.png
    caption: "ALOHA 시스템 개요. 사람이 leader 팔을 backdrive하면 follower 팔이 따라 움직이며, teleoperation 스킬과 학습 스킬 예시를 보인다"
    page: 1
    bbox_norm: [0.0678, 0.1923, 0.9305, 0.416]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/zhao-2023-learning-fine-grained-bimanual-manipulation/fig03.png
    raw: raw/papers/zhao-2023-learning-fine-grained-bimanual-manipulation-figures/fig03.png
    caption: "ALOHA 하드웨어. 카메라 4대 배치와 bimanual workspace, see-through gripper, ViperX 6-DoF 팔 스펙"
    page: 3
    bbox_norm: [0.0439, 0.0212, 0.9897, 0.2436]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/zhao-2023-learning-fine-grained-bimanual-manipulation/fig04.png
    raw: raw/papers/zhao-2023-learning-fine-grained-bimanual-manipulation-figures/fig04.png
    caption: "ACT 아키텍처. 왼쪽은 z를 내고 테스트 시 폐기되는 CVAE encoder, 오른쪽은 이미지와 joint, z를 받아 action sequence를 내는 decoder"
    page: 4
    bbox_norm: [0.0614, 0.0053, 0.9655, 0.2293]
    strategy: caption-region
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/zhao-2023-learning-fine-grained-bimanual-manipulation/fig05.png
    raw: raw/papers/zhao-2023-learning-fine-grained-bimanual-manipulation-figures/fig05.png
    caption: "action chunking과 temporal ensembling. 매 timestep마다 겹치는 chunk를 지수 가중 평균한다"
    page: 4
    bbox_norm: [0.0802, 0.2724, 0.4898, 0.4776]
    strategy: manual
    curated: true
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/zhao-2023-learning-fine-grained-bimanual-manipulation/fig06.png
    raw: raw/papers/zhao-2023-learning-fine-grained-bimanual-manipulation-figures/fig06.png
    caption: "실세계 6개 과제 정의. 초기 배치와 subtask 단계"
    page: 7
    bbox_norm: [0.0718, 0.0621, 0.9582, 0.9239]
    strategy: caption-region
    curated: false
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/zhao-2023-learning-fine-grained-bimanual-manipulation/fig07.png
    raw: raw/papers/zhao-2023-learning-fine-grained-bimanual-manipulation-figures/fig07.png
    caption: "시뮬레이션 2개 과제 정의. Cube Transfer와 Bimanual Insertion"
    page: 8
    bbox_norm: [0.0536, 0.0432, 0.9437, 0.1773]
    strategy: caption-region
    curated: false
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/zhao-2023-learning-fine-grained-bimanual-manipulation/fig08.png
    raw: raw/papers/zhao-2023-learning-fine-grained-bimanual-manipulation-figures/fig08.png
    caption: "ablation. (a) chunk size k, (b) temporal ensembling, (c) CVAE, (d) 50Hz와 5Hz user study"
    page: 10
    bbox_norm: [0.0875, 0.0693, 0.9063, 0.2342]
    strategy: caption-region
    curated: true
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/zhao-2023-learning-fine-grained-bimanual-manipulation/fig09.png
    raw: raw/papers/zhao-2023-learning-fine-grained-bimanual-manipulation-figures/fig09.png
    caption: "ALOHA teleoperation 과제 예시 모음 (24종)"
    page: 15
    bbox_norm: [0.0494, 0.0236, 1.0, 0.4907]
    strategy: caption-region
    curated: false
  - id: fig10
    label: Figure 10
    kind: figure
    file: assets/zhao-2023-learning-fine-grained-bimanual-manipulation/fig10.png
    raw: raw/papers/zhao-2023-learning-fine-grained-bimanual-manipulation-figures/fig10.png
    caption: "policy 실행 시 카메라 4대(top, front, left wrist, right wrist) observation 예시"
    page: 16
    bbox_norm: [0.1542, 0.0606, 0.8458, 0.4856]
    strategy: caption-region
    curated: false
  - id: fig11
    label: Figure 11
    kind: figure
    file: assets/zhao-2023-learning-fine-grained-bimanual-manipulation/fig11.png
    raw: raw/papers/zhao-2023-learning-fine-grained-bimanual-manipulation-figures/fig11.png
    caption: "ACT 상세 아키텍처 다이어그램. 학습 3단계와 테스트 흐름"
    page: 17
    bbox_norm: [0.0, 0.0606, 0.9298, 0.8017]
    strategy: caption-region
    curated: false
  - id: fig12
    label: Figure 12
    kind: figure
    file: assets/zhao-2023-learning-fine-grained-bimanual-manipulation/fig12.png
    raw: raw/papers/zhao-2023-learning-fine-grained-bimanual-manipulation-figures/fig12.png
    caption: "user study에 쓴 cable tie와 cup"
    page: 18
    bbox_norm: [0.4062, 0.0606, 0.5938, 0.17]
    strategy: caption-region
    curated: false
  - id: tab01
    label: Table I
    kind: table
    file: assets/zhao-2023-learning-fine-grained-bimanual-manipulation/tab01.png
    raw: raw/papers/zhao-2023-learning-fine-grained-bimanual-manipulation-figures/tab01.png
    caption: "성공률(%). 시뮬레이션 2개와 실세계 2개 과제에서 ACT와 baseline 4종을 비교"
    page: 8
    bbox_norm: [0.0502, 0.1904, 0.9498, 0.3396]
    strategy: manual
    curated: true
  - id: tab02
    label: Table II
    kind: table
    file: assets/zhao-2023-learning-fine-grained-bimanual-manipulation/tab02.png
    raw: raw/papers/zhao-2023-learning-fine-grained-bimanual-manipulation-figures/tab02.png
    caption: "성공률(%). 나머지 실세계 과제를 최고 baseline인 BeT와만 비교"
    page: 8
    bbox_norm: [0.0692, 0.4957, 0.9326, 0.9241]
    strategy: table-region
    curated: false
  - id: tab03
    label: Table III
    kind: table
    file: assets/zhao-2023-learning-fine-grained-bimanual-manipulation/tab03.png
    raw: raw/papers/zhao-2023-learning-fine-grained-bimanual-manipulation-figures/tab03.png
    caption: "ACT hyperparameter"
    page: 18
    bbox_norm: [0.3118, 0.1903, 0.6882, 0.3257]
    strategy: table-region
    curated: false
  - id: tab04
    label: Table IV
    kind: table
    file: assets/zhao-2023-learning-fine-grained-bimanual-manipulation/tab04.png
    raw: raw/papers/zhao-2023-learning-fine-grained-bimanual-manipulation-figures/tab04.png
    caption: "BYOL hyperparameter. VINN과 BeT의 feature extractor다"
    page: 18
    bbox_norm: [0.3258, 0.448, 0.6741, 0.5947]
    strategy: table-region
    curated: false
  - id: tab05
    label: Table V
    kind: table
    file: assets/zhao-2023-learning-fine-grained-bimanual-manipulation/tab05.png
    raw: raw/papers/zhao-2023-learning-fine-grained-bimanual-manipulation-figures/tab05.png
    caption: "BeT hyperparameter"
    page: 18
    bbox_norm: [0.3258, 0.448, 0.6741, 0.5947]
    strategy: table-region
    curated: false
  - id: tab06
    label: Table VI
    kind: table
    file: assets/zhao-2023-learning-fine-grained-bimanual-manipulation/tab06.png
    raw: raw/papers/zhao-2023-learning-fine-grained-bimanual-manipulation-figures/tab06.png
    caption: "VINN hyperparameter"
    page: 18
    bbox_norm: [0.2726, 0.6831, 0.7273, 0.875]
    strategy: table-region
    curated: false
  - id: tab07
    label: Table VII
    kind: table
    file: assets/zhao-2023-learning-fine-grained-bimanual-manipulation/tab07.png
    raw: raw/papers/zhao-2023-learning-fine-grained-bimanual-manipulation-figures/tab07.png
    caption: "RT-1 hyperparameter"
    page: 18
    bbox_norm: [0.2726, 0.6831, 0.7273, 0.875]
    strategy: table-region
    curated: false
---

## 한 줄 요약 (One-line Summary)

2만 달러 미만의 저가 양팔 teleoperation 시스템 ALOHA와, action을 한 덩어리(chunk)로 예측하는 imitation learning 알고리즘 ACT를 함께 내놓아 값싸고 정밀도 낮은 하드웨어로도 배터리 삽입하기와 컵 뚜껑 열기 같은 fine manipulation을 시연 10분치로 80~90% 성공시킨 논문.

## 1. 자료 정보 (Document Information)

- **제목**: Learning Fine-Grained Bimanual Manipulation with Low-Cost Hardware
- **저자**: Tony Z. Zhao(Stanford), Vikash Kumar(Meta), Sergey Levine(UC Berkeley), Chelsea Finn(Stanford)
- **발표**: arXiv 2304.13705v1 (2023-04-23), RSS 2023
- **프로젝트**: tonyzhaozh.github.io/aloha (하드웨어와 소프트웨어 전부 open-source, 3D 프린팅부터 조립까지 튜토리얼 제공)
- **유형**: 시스템 논문. 하드웨어(ALOHA)와 알고리즘(ACT) 두 부분이 한 편에 묶여 있다.

fine manipulation은 케이블 타이 꿰기나 배터리 슬롯에 삽입하기처럼 밀리미터 단위 정밀도와 접촉력 조절, closed-loop 시각 피드백이 필요한 과제를 말한다. 이런 과제는 보통 고가 로봇과 정밀 센서, 세심한 calibration을 요구하는데 이 논문은 정반대로 접근한다. 값싸고 부정확한 하드웨어의 부정확함을 학습으로 메운다.

## 2. 주요 기여 (Key Contributions)

이 논문의 기여는 서로 맞물린 두 부분이다.

**ALOHA (하드웨어)**: A Low-cost Open-source Hardware System for Bimanual Teleoperation. off-the-shelf 로봇 팔과 3D 프린팅 부품만으로 전체 2만 달러 미만에 만드는 양팔 teleoperation 장치다. teleoperation은 사람이 로봇을 원격으로 움직여 시연을 만드는 방식을 말한다. 케이블 타이 꿰기 같은 정밀 과제, 탁구공 저글링 같은 dynamic 과제, NIST board #2 조립 같은 contact-rich 과제까지 사람이 직접 조종해 보인다.

**ACT (알고리즘)**: Action Chunking with Transformers. ALOHA로 모은 시연을 학습하는 imitation learning 알고리즘이다. imitation learning은 시연 데이터(demonstration)를 흉내 내 policy를 학습하는 방법을 말하고, policy는 현재 observation을 받아 다음 action을 정하는 함수를 말한다. ACT는 다음 한 스텝이 아니라 앞으로의 여러 스텝을 한 번에 예측하는 방식으로 imitation learning의 고질병인 compounding error를 완화한다.

두 부분의 시너지로, 반투명 조미료 컵 뚜껑 열기와 배터리 삽입하기 같은 6개 실세계 fine manipulation 스킬을 시연 10분(50개 trajectory)만으로 80~90% 성공률에 올렸다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 저가 양팔 teleoperation 시스템 ALOHA

설계는 다섯 원칙(low-cost, versatile, user-friendly, repairable, easy-to-build)을 따른다. 로봇은 dexterous hand 대신 parallel-jaw gripper를 단 ViperX 6-DoF 팔 2대(follower, 대당 약 $5,600)를 쓰고 조종용으로 같은 제조사의 더 작은 WidowX 팔 2대(leader, 대당 $3,300)를 쓴다.

teleoperation은 task-space가 아니라 joint-space mapping으로 한다. 사람이 작은 leader 팔을 손으로 밀면(backdrive) 그 관절 각도가 큰 follower 팔로 그대로 동기화된다. VR 컨트롤러로 end-effector 포즈를 잡아 IK로 푸는 방식을 버린 이유가 둘 있다. fine manipulation은 로봇의 singularity 근처에서 작업할 때가 많은데 6-DoF에 여유 자유도가 없는 구성에서는 off-the-shelf inverse kinematics가 자주 실패한다. joint-space mapping은 관절 한계 안에서 high-bandwidth 제어를 보장하고 계산량과 지연도 줄인다. 또 leader 팔의 무게 자체가 사람이 너무 빨리 움직이지 못하게 막고 잔진동을 눌러줘서 정밀 과제 성적이 더 좋았다.

OEM gripper는 fine manipulation에 부적합해서 3D 프린팅한 "see-through" 손가락에 gripping tape를 붙여 시야를 확보하고 얇은 비닐도 안정적으로 쥐게 했다. leader에는 backdrive 힘을 줄이고 gripper를 연속적으로 여닫게 하는 "handle and scissor" 기구와, 중력을 상쇄하는 고무줄 load balancing을 달아 30분 이상의 긴 세션을 가능하게 했다. 카메라는 Logitech C922x 4대(480×640)로, 2대는 follower 손목, 1대는 top, 1대는 front에 둔다. teleoperation과 데이터 기록은 모두 50Hz다. control frequency는 로봇이 1초에 몇 번 새로운 action을 갱신하는지를 뜻하는데 뒤 user study에서 이 50Hz가 fine manipulation에 꼭 필요함을 보인다.

### 3.2 ACT의 action chunking과 temporal ensembling

학습 데이터의 action으로는 follower가 아니라 leader의 관절 위치를 쓴다. 실제 가해지는 힘이 leader와 follower의 차이로 low-level PID controller를 통해 암묵적으로 정해지기 때문이다. observation은 follower의 현재 관절 위치와 카메라 4대 이미지다.

**Action chunking**: policy가 한 스텝 action이 아니라 앞으로 k 스텝의 목표 관절 위치를 한 번에 예측한다(k=100). action chunking은 여러 action을 한 덩어리로 묶어 하나의 단위로 실행한다는 신경과학 개념에서 따왔다. πθ(at|st) 대신 πθ(at:t+k|st)를 모델링하는 셈이라 과제의 effective horizon이 k배로 줄고 이로써 compounding error가 완화된다. compounding error는 imitation learning에서 매 스텝의 작은 오차가 누적돼 로봇이 학습 분포 밖 상태로 표류하는 문제를 말한다. chunking은 시연에 섞인 non-Markovian한 행동(예: 중간의 멈칫거림 같은 temporally correlated confounder)도 한 chunk 안에 담아 다루기 쉽게 만든다.

**temporal ensembling**: chunk를 k 스텝마다 통째로 교체하면 로봇 동작이 끊긴다. 그래서 매 timestep마다 policy를 새로 질의해 chunk들이 서로 겹치게 하고 같은 timestep에 대한 여러 예측을 지수 가중(`w_i = exp(-m * i)`, 가장 오래된 예측의 가중치가 `w_0`)으로 평균한다. m이 작을수록 새 observation을 빨리 반영한다. 흔한 smoothing이 인접 timestep 값을 섞어 bias를 만드는 것과 달리, 같은 timestep에 대한 예측만 모으므로 bias가 없고 추가 학습 비용도 들지 않는다.

**CVAE로 사람 데이터 모델링**: 같은 observation에서도 사람은 매번 다른 trajectory로 과제를 풀고 정밀도가 덜 중요한 구간에서 더 제멋대로다. 이 multi-modal한 노이즈를 담기 위해 policy를 conditional variational autoencoder(CVAE)로 학습한다. CVAE는 조건이 주어졌을 때 데이터의 분포를 생성 모델로 학습하는 구조다. CVAE encoder는 BERT류 transformer로, [CLS] token과 현재 관절 위치, 목표 action sequence를 받아 "style variable" z의 평균과 분산을 낸다(학습을 빠르게 하려고 이미지는 빼고 proprioception만 넣는다). CVAE decoder가 곧 policy로, z와 현재 observation(이미지+관절)을 받아 action sequence를 낸다. 테스트 시에는 encoder를 버리고 z를 prior 평균인 0으로 고정해 결정론적으로 디코딩한다. 손실은 표준 VAE 목적함수(reconstruction + KL 정규화)이고 KL 항에 β=10 가중을 준다.

### 3.3 구현

decoder(policy)는 ResNet18 image encoder + transformer encoder + transformer decoder로 짠다. 480×640×3 이미지 4장이 각각 ResNet18을 지나 15×20×512 feature map이 되고 공간축으로 flatten해 300×512 시퀀스가 되며 2D sinusoidal position embedding을 더한다. 4장이면 1200×512, 여기에 현재 관절 위치와 z를 각각 512로 사영해 붙이면 transformer encoder 입력은 1202×512다. transformer decoder는 cross-attention으로 encoder 출력을 참조하고 고정된 position embedding을 query로 써서 k×512를 낸 뒤 MLP로 k×14로 down-projection한다. 이는 두 팔(7+7=14 DoF)의 다음 k 스텝 목표 관절 위치다. reconstruction에는 L2 대신 L1 loss를 써서 action sequence를 더 정밀하게 모델링했고 delta 관절 위치보다 absolute 관절 위치를 action으로 쓸 때 성능이 좋았다. 모델은 약 80M 파라미터로 과제마다 처음부터 학습하며 RTX 2080 Ti(11G) 한 장에서 약 5시간 학습, 추론은 약 0.01초다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

실세계 6개 과제(ALOHA)와 MuJoCo 시뮬레이션 2개 과제로 평가한다. 과제마다 시연 50개(Thread Velcro만 100개)를 모았고 이는 과제당 약 10~20분 분량이다. 한 episode는 8~14초로 50Hz에서 400~700 timestep에 해당한다. baseline은 BC-ConvMLP, BeT, RT-1, VINN 4종이다.

**전체 성적**: ACT가 모든 과제에서 두 번째로 높은 방법을 큰 격차로 앞선다. 시뮬레이션 2개 과제(scripted 데이터와 human 데이터)에서 두 번째로 높은 방법보다 각각 59%p, 49%p, 29%p, 20%p 높다. baseline들은 앞 1~2개 subtask까지는 진행해도 최종 성공률이 30% 아래에 머문다. 실세계 Slide Ziploc과 Slot Battery에서 ACT는 각각 88%와 96%인 반면 다른 방법은 첫 단계 이후 거의 전진하지 못한다. 나머지 실세계 과제에서 ACT는 Open Cup 84%, Thread Velcro 20%, Prep Tape 64%, Put On Shoe 92%로, 최고 baseline인 BeT(모두 최종 0%)를 다시 앞선다. Thread Velcro가 유독 낮은 건 검은 케이블 타이와 배경의 낮은 대비, 이미지에서 타이가 차지하는 작은 면적 탓에 위치 추정이 어렵기 때문이다.

**Ablation**: 네 가지를 시뮬레이션 2개 과제 평균으로 본다. chunk size k는 temporal ensembling을 끈 상태에서 k=1이면 1%, k=100이면 44%로 급격히 오르고 k=200과 k=400(사실상 open-loop)에서 살짝 내려간다. 즉 chunking과 낮은 effective horizon이 성능을 끌어올린다. 같은 chunking을 BC-ConvMLP와 VINN에 붙여도 성능이 오르므로 일반적으로 유용한 기법이다. temporal ensembling은 ACT에 +3.3%p, BC-ConvMLP에 +4%p인데 비모수 방법 VINN에는 −20%p다(모델링 오차를 매끄럽게 하는 효과라 parametric 방법에서만 이득). CVAE는 scripted 데이터에서는 차이가 거의 없지만(결정론적이라) human 데이터에서는 35.3%에서 2%로 크게 하락한다. 따라서 사람 시연을 배우려면 CVAE가 필수다. 마지막으로 high-frequency는 6명 참가자의 user study에서 50Hz를 5Hz로 낮추면 teleoperation 시간이 62% 늘어난다(p<0.001).

## 5. 한계와 향후 과제 (Limitations and Future Work)

**하드웨어 한계**: 저가 모터의 토크가 부족해 큰 힘이 필요한 과제(무거운 물체 들기, 밀봉된 물병 비틀어 열기)나 양손의 여러 손가락을 함께 써야 하는 과제(누름 탭이 있는 child-proof 약병)를 못 한다. 손톱이 필요한 동작(자기 위에 붙은 포장 테이프 끝 들추기, 알루미늄 캔 따기)도 어렵다.

**policy 학습 한계**: ACT가 학습에 실패한 두 과제를 그대로 보고한다. 사탕 포장 벗기기는 봉합선이 사탕 주위 어디에 나타날지 예측이 어려워 0/10(사람도 판별이 힘든 지각 과제)이고, 탁자에 눕혀진 작은 ziploc 봉투 펴서 열기는 집는 위치의 작은 차이가 봉투 변형에 크게 반영돼 실패한다. 저자들은 pre-training, 더 많은 데이터, 더 나은 perception을 유망한 방향으로 든다.

## 6. 관련 연구 (Related Work)

- **compounding error 대응**: DAgger 계열은 on-policy 상호작용과 전문가 교정으로 문제를 줄이지만 teleoperation 인터페이스에서는 번거롭다. 데모 수집 시 노이즈 주입(DART)도 fine manipulation에서는 과제 실패로 이어진다. ACT는 대신 action chunking으로 effective horizon 자체를 줄여, 고차원 시각 observation과 호환되는 각도에서 문제를 푼다.
- **bimanual manipulation**: 고전 제어(알려진 동역학)에서 강화학습과 사람 시연 데이터 모방으로, 다시 key point 예측으로 이어지는 계보다. 정밀 양팔 과제(매듭 풀기, 천 개기, 바늘 꿰기)를 다룬 선행 연구는 da Vinci나 ABB YuMi처럼 훨씬 비싼 로봇을 썼다. ALOHA는 대당 약 5천 달러 팔로 이를 겨냥한다.
- **teleoperation 비용 비교(Appendix A)**: DexPilot 약 10만 달러, Robotic Telekinesis 약 1만 8천 달러(팔과 손 1조), Shadow Teleoperation System 최소 40만 달러. ALOHA는 1만 8천 달러(카메라 등 옵션 포함 2만 달러) 양팔 구성으로, 10배 이상 비싼 Shadow 시스템의 시연 15개 중 14개를 재현했다(손이 없어 Baoding ball 회전만 불가).
- **baseline**: BC-ConvMLP, BeT, RT-1(모두 wiki 보유 대상 계보), VINN. 그중 [[physical-ai/brohan-2022-rt-1-robotics-transformer-for-real-world]]은 이 논문에서 baseline으로 쓰였다.

## 7. 용어집 (Glossary)

- **ALOHA**: A Low-cost Open-source Hardware System for Bimanual Teleoperation. ViperX(follower)와 WidowX(leader) 4팔, 카메라 4대로 2만 달러 미만 구성.
- **ACT (Action Chunking with Transformers)**: 이 논문의 imitation learning 알고리즘. action chunk를 CVAE decoder(transformer)로 생성한다.
- **action chunking**: 한 스텝이 아니라 앞으로 k 스텝의 action을 한 번에 예측하고 실행해 effective horizon을 k배 줄이는 기법.
- **temporal ensembling**: 매 timestep 질의로 겹친 chunk들을 지수 가중 평균해 동작을 매끄럽게 하는 추론 기법.
- **compounding error**: imitation learning에서 매 스텝 오차가 누적돼 학습 분포 밖으로 표류하는 문제.
- **CVAE (conditional variational autoencoder)**: 조건부 생성 모델. ACT는 사람 시연의 multi-modal 변동을 style variable z로 담는다.
- **joint-space mapping**: leader 관절 각도를 follower로 직접 동기화하는 teleoperation 방식으로 task-space와 IK를 피한다.
- **effective horizon**: 과제를 푸는 데 필요한 의사결정 스텝 수. chunking이 이를 k배 줄인다.

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 1 | ALOHA 시스템 개요(teleoperation 스킬과 학습 스킬 예시) | caption-region | ★ wiki 권장 (시스템 개요) |
| fig03 | 3 | 하드웨어(카메라 배치, workspace, gripper, ViperX 스펙) | caption-region | ★ wiki 권장 (hardware) |
| fig04 | 4 | ACT 아키텍처 (CVAE encoder/decoder) | caption-region | ★ wiki 권장 (method 핵심) |
| fig05 | 4 | action chunking과 temporal ensembling | manual(재크롭) | ★ wiki 권장 (method 핵심) |
| tab01 | 8 | 성공률 표(시뮬레이션 2개와 실세계 2개 과제, baseline 4종) | manual(재크롭) | ★ wiki 권장 (result 핵심) |
| fig08 | 10 | ablation 4종 (k, TE, CVAE, frequency) | caption-region | ★ wiki 권장 (ablation) |
| fig06 | 7 | 실세계 6과제 정의 | caption-region | (확인 필요, 아카이브) |
| fig07 | 8 | 시뮬 2과제 정의 | caption-region | (아카이브) |
| fig09 | 15 | teleoperation 과제 24종 예시 | caption-region | (아카이브) |
| fig10 | 16 | 카메라 4대 observation 예시 | caption-region | (아카이브) |
| fig11 | 17 | ACT 상세 아키텍처 (학습과 테스트 흐름) | caption-region | (아카이브, fig04와 중복) |
| fig12 | 18 | user study 물체 | caption-region | (아카이브) |
| tab02 | 8 | 나머지 실세계 3과제 성공률 | table-region | (아카이브) |
| tab03~07 | 18 | ACT, BYOL, BeT, VINN, RT-1 hyperparameter | table-region | (아카이브) |
