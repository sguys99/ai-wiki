---
title: "Learning Fine-Grained Bimanual Manipulation with Low-Cost Hardware"
type: paper
year: 2023
category: physical-ai
source: zhao-2023-learning-fine-grained-bimanual-manipulation.md
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
    caption: "ALOHA 시스템 개요 — 사람이 leader 팔을 backdrive하면 follower 팔이 따라 움직이고, teleoperation·학습 스킬 예시를 보인다"
    page: 1
    bbox_norm: [0.0678, 0.1923, 0.9305, 0.416]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/zhao-2023-learning-fine-grained-bimanual-manipulation/fig03.png
    raw: raw/papers/zhao-2023-learning-fine-grained-bimanual-manipulation-figures/fig03.png
    caption: "ALOHA 하드웨어 — 카메라 4대 배치와 bimanual workspace, see-through gripper, ViperX 6-DoF 팔 스펙"
    page: 3
    bbox_norm: [0.0439, 0.0212, 0.9897, 0.2436]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/zhao-2023-learning-fine-grained-bimanual-manipulation/fig04.png
    raw: raw/papers/zhao-2023-learning-fine-grained-bimanual-manipulation-figures/fig04.png
    caption: "ACT 아키텍처 — CVAE encoder(왼쪽, z 산출·테스트 시 폐기)와 decoder(오른쪽, 이미지·joint·z → action sequence)"
    page: 4
    bbox_norm: [0.0614, 0.0053, 0.9655, 0.2293]
    strategy: caption-region
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/zhao-2023-learning-fine-grained-bimanual-manipulation/fig05.png
    raw: raw/papers/zhao-2023-learning-fine-grained-bimanual-manipulation-figures/fig05.png
    caption: "Action chunking과 temporal ensemble — 매 timestep마다 겹치는 chunk를 지수 가중 평균한다"
    page: 4
    bbox_norm: [0.0802, 0.2724, 0.4898, 0.4776]
    strategy: manual
    curated: true
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/zhao-2023-learning-fine-grained-bimanual-manipulation/fig06.png
    raw: raw/papers/zhao-2023-learning-fine-grained-bimanual-manipulation-figures/fig06.png
    caption: "실세계 6개 과제 정의 — 초기 배치와 subtask 단계"
    page: 7
    bbox_norm: [0.0718, 0.0621, 0.9582, 0.9239]
    strategy: caption-region
    curated: false
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/zhao-2023-learning-fine-grained-bimanual-manipulation/fig07.png
    raw: raw/papers/zhao-2023-learning-fine-grained-bimanual-manipulation-figures/fig07.png
    caption: "시뮬레이션 2개 과제 정의 — Cube Transfer, Bimanual Insertion"
    page: 8
    bbox_norm: [0.0536, 0.0432, 0.9437, 0.1773]
    strategy: caption-region
    curated: false
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/zhao-2023-learning-fine-grained-bimanual-manipulation/fig08.png
    raw: raw/papers/zhao-2023-learning-fine-grained-bimanual-manipulation-figures/fig08.png
    caption: "Ablation — (a) chunk size k, (b) temporal ensemble, (c) CVAE, (d) 50Hz vs 5Hz user study"
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
    caption: "policy 실행 시 카메라 4대(top·front·left wrist·right wrist) observation 예시"
    page: 16
    bbox_norm: [0.1542, 0.0606, 0.8458, 0.4856]
    strategy: caption-region
    curated: false
  - id: fig11
    label: Figure 11
    kind: figure
    file: assets/zhao-2023-learning-fine-grained-bimanual-manipulation/fig11.png
    raw: raw/papers/zhao-2023-learning-fine-grained-bimanual-manipulation-figures/fig11.png
    caption: "ACT 상세 아키텍처 다이어그램 — 학습(3단계)과 테스트 흐름"
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
    caption: "성공률(%) — 시뮬 2개·실세계 2개 과제에서 ACT와 4개 baseline 비교"
    page: 8
    bbox_norm: [0.0502, 0.1904, 0.9498, 0.3396]
    strategy: manual
    curated: true
  - id: tab02
    label: Table II
    kind: table
    file: assets/zhao-2023-learning-fine-grained-bimanual-manipulation/tab02.png
    raw: raw/papers/zhao-2023-learning-fine-grained-bimanual-manipulation-figures/tab02.png
    caption: "성공률(%) — 나머지 실세계 3개 과제, 최고 baseline BeT와만 비교"
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
    caption: "BYOL(VINN·BeT feature extractor) hyperparameter"
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

## 요약 (Summary)

ALOHA와 ACT는 각각 이 논문의 하드웨어와 알고리즘이다. ALOHA는 off-the-shelf 로봇 팔과 3D 프린팅 부품만으로 $20k 미만에 짓는 양팔 teleoperation 장치이고 ACT는 그렇게 모은 시연을 배우는 imitation learning 알고리즘이다. imitation learning은 시연 데이터를 흉내 내 policy를 학습하는 방법을 말하고, policy는 현재 observation을 받아 다음 action을 정하는 함수를 말한다. 두 부분이 맞물려 반투명 조미료 컵 뚜껑 열기나 배터리 슬롯에 끼우기 같은 밀리미터 단위의 fine manipulation 스킬 6개를 시연 10분(50 trajectory)만으로 80~90% 성공률에 올린다. RT-1을 baseline으로 두고 크게 앞서며 action chunking이라는 발상으로 이후 저가 imitation learning과 chunk 기반 action head 연구의 출발점이 됐다.

![[assets/zhao-2023-learning-fine-grained-bimanual-manipulation/fig01.png]]
*Figure 1: ALOHA 시스템 개요 — 사람이 작은 leader 팔을 손으로 밀면 큰 follower 팔이 그대로 따라 움직인다. 케이블 타이 꿰기·NIST board·탁구공 저글링 같은 teleoperation 스킬과 뚜껑 열기·배터리 끼우기 같은 학습 policy 예시를 함께 보인다 (Zhao 2023, Figure 1).*

## 핵심 아이디어 (Key Idea)

fine manipulation은 밀리미터 단위 정밀도와 접촉력 조절, 닫힌 루프의 시각 피드백을 요구한다. 기존 시스템은 이를 고가 로봇과 정밀 센서로 풀었지만, 이 논문은 반대로 값싸고 부정확한 하드웨어를 학습으로 보완한다. 사람도 산업용 수준의 proprioception 없이 시각 피드백만으로 섬세한 작업을 해내지 않는가 — proprioception은 관절 각도 같은 로봇 자신의 상태 감각 입력을 말한다. 그래서 카메라 이미지를 곧바로 action으로 잇는 pixel-to-action policy를 학습한다. 조미료 컵을 밀 때의 접촉이나 뚜껑을 딸 때의 변형은 정확히 모델링하기가 매우 어렵지만 그 상황에 반응하는 policy는 훨씬 단순하기 때문이다.

문제는 imitation learning의 compounding error다. compounding error는 매 스텝의 작은 오차가 누적돼 로봇이 학습 분포 밖 상태로 표류하는 현상으로, fine manipulation에서 특히 두드러진다. ACT는 이를 action chunking으로 정면 돌파한다 — 한 스텝이 아니라 앞으로 k 스텝을 한 번에 예측해 과제의 effective horizon을 k배 줄인다.

## 방법론 및 아키텍처 (Methodology and Architecture)

### ALOHA — 저가 양팔 teleoperation

로봇은 parallel-jaw gripper를 단 ViperX 6-DoF 팔 2대(follower, 대당 약 $5,600)에, 조종용으로 같은 제조사의 작은 WidowX 팔 2대(leader, 대당 $3,300)를 붙인 구성이다. 핵심 선택은 joint-space mapping teleoperation이다. 사람이 leader를 손으로 밀면(backdrive) 그 관절 각도가 follower로 그대로 동기화된다. VR 컨트롤러로 end-effector 포즈를 잡아 IK로 푸는 task-space 방식을 버린 이유가 둘 있다. fine manipulation은 singularity 근처에서 작업할 때가 많아 6-DoF·무여유 구성에서 off-the-shelf inverse kinematics가 자주 실패하는데 joint-space mapping은 관절 한계 안에서 high-bandwidth 제어를 보장하고 지연도 줄인다. 게다가 leader 팔의 무게가 사람이 너무 빨리 움직이지 못하게 막고 잔진동을 눌러줘 정밀 과제 성적이 더 좋았다.

디테일이 시스템을 좌우한다. OEM gripper 대신 3D 프린팅한 see-through 손가락에 gripping tape를 붙여 시야와 그립을 확보하고 leader에는 backdrive 힘을 덜고 gripper를 연속 제어하게 하는 handle and scissor 기구와 중력을 상쇄하는 고무줄 load balancing을 달았다. 카메라는 Logitech C922x 4대(480×640)를 손목 2·top 1·front 1로 배치한다. teleoperation과 데이터 기록은 모두 50Hz다.

![[assets/zhao-2023-learning-fine-grained-bimanual-manipulation/fig03.png]]
*Figure 3: ALOHA 하드웨어 — 왼쪽은 front·top·양 손목 카메라 배치와 red로 표시한 bimanual workspace, 가운데는 handle-and-scissor 기구와 see-through gripper, 오른쪽은 ViperX 6-DoF 팔 스펙(reach 750mm·span 1500mm·accuracy 5–8mm·payload 750g) (Zhao 2023, Figure 3).*

### ACT — action chunking · temporal ensemble · CVAE

학습의 action으로는 follower가 아니라 leader의 관절 위치를 쓴다. 실제 힘이 두 팔의 차이로 low-level PID controller를 통해 암묵적으로 정해지기 때문이다. observation은 follower의 현재 관절 위치와 카메라 4대 이미지다.

Action chunking은 policy가 앞으로 k 스텝(k=100)의 목표 관절 위치를 한 번에 예측·실행하는 것이다. πθ(at|st) 대신 πθ(at:t+k|st)를 모델링하는 셈이라 effective horizon이 k배 줄어 compounding error가 완화되고 시연 중간의 멈칫거림 같은 non-Markovian 패턴도 한 chunk 안에 담긴다. 다만 chunk를 k 스텝마다 갈아끼우면 동작이 끊긴다. 그래서 temporal ensemble로 매 timestep마다 policy를 새로 질의해 chunk들을 겹치게 하고 같은 timestep에 대한 예측들을 지수 가중(wi = exp(−m·i))으로 평균한다. 인접 timestep을 섞는 흔한 smoothing과 달리 같은 timestep 예측만 모아 bias가 없고 추가 학습 비용도 없다.

![[assets/zhao-2023-learning-fine-grained-bimanual-manipulation/fig05.png]]
*Figure 5: 위는 순수 action chunking(k 스텝마다 새 chunk), 아래는 temporal ensemble — 매 timestep 질의로 겹친 여러 chunk의 같은 시점 예측을 [0.5, 0.3, 0.2, 0.1] 같은 지수 가중으로 평균해 매끄러운 동작을 만든다 (Zhao 2023, Figure 5).*

사람 시연은 같은 observation에서도 매번 다른 trajectory를 그리는 multi-modal 데이터다. 이 변동을 담기 위해 policy를 conditional variational autoencoder(CVAE)로 학습한다. CVAE encoder는 BERT류 transformer로 [CLS] token·관절 위치·목표 action sequence에서 style variable z의 평균·분산을 내고(학습 속도를 위해 이미지는 빼고 proprioception만 넣는다), CVAE decoder가 곧 policy로서 z와 현재 observation을 받아 action sequence를 낸다. 테스트 시에는 encoder를 버리고 z를 prior 평균인 0으로 고정해 결정론적으로 디코딩한다. 손실은 reconstruction과 KL 정규화로 이뤄진 표준 VAE 목적함수이며 KL 항에 β=10을 준다.

decoder 구현은 ResNet18 + transformer encoder + transformer decoder다. 480×640 이미지 4장이 각각 ResNet18을 지나 15×20×512 feature map이 되고 flatten과 2D sinusoidal position embedding을 거쳐 카메라당 300×512, 4장이면 1200×512가 된다. 여기에 관절 위치와 z를 붙인 1202×512가 transformer encoder에 들어가고 decoder는 cross-attention과 고정 position embedding query로 k×512를 낸 뒤 MLP로 k×14(두 팔 7+7 DoF의 다음 k 스텝 목표 관절 위치)로 줄인다. reconstruction에는 L2 대신 L1 loss를, action으로는 delta 대신 absolute 관절 위치를 쓸 때 더 정밀했다. 모델은 약 80M 파라미터로 과제마다 처음부터 학습하며 RTX 2080 Ti 한 장에서 약 5시간, 추론은 약 0.01초다.

![[assets/zhao-2023-learning-fine-grained-bimanual-manipulation/fig04.png]]
*Figure 4: ACT 아키텍처 — 왼쪽 CVAE encoder는 action sequence와 관절 observation을 style variable z로 압축하고 테스트 시 폐기된다. 오른쪽 decoder(policy)는 카메라 4대 이미지·관절 위치·z를 transformer encoder로 합성하고 transformer decoder로 action sequence를 낸다 (Zhao 2023, Figure 4).*

## 결과 (Results)

실세계 6개 과제(ALOHA)와 MuJoCo 시뮬레이션 2개 과제로 평가한다. 과제마다 시연 50개(Thread Velcro만 100개), 약 10~20분 분량을 모았고 baseline은 BC-ConvMLP·BeT·RT-1·VINN 4종이다. ACT는 모든 과제에서 차선 방법을 큰 격차로 앞선다. 시뮬레이션에서 차선 대비 최대 59% 높고 실세계 Slide Ziploc·Slot Battery에서 각각 88%·96%인 반면 다른 방법은 첫 단계 이후 거의 전진하지 못한다. 나머지 실세계 3개 과제에서도 Open Cup 84%·Thread Velcro 20%·Prep Tape 64%·Put On Shoe 92%로, 모두 최종 0%인 BeT를 앞선다. baseline들의 부진은 compounding error와 non-Markovian 행동 탓으로, episode 후반부로 갈수록 동작이 무너지고 특정 상태에서 무한정 멈춘다.

![[assets/zhao-2023-learning-fine-grained-bimanual-manipulation/tab01.png]]
*Table I: 시뮬 2개·실세계 2개 과제의 subtask별 성공률(%). 시뮬은 [scripted 데이터 | human 데이터], 실세계는 human 데이터 결과다. ACT(Ours)가 모든 열에서 BC-ConvMLP·BeT·RT-1·VINN을 크게 앞선다 (Zhao 2023, Table I).*

ablation은 네 설계 요소를 짚는다. chunk size k는 1일 때 1%에서 k=100일 때 44%로 급등하다 k=200·400의 사실상 open-loop에서 살짝 내려간다 — 낮은 effective horizon이 성능을 끌어올린다는 증거다. temporal ensemble은 ACT에 +3.3%지만 비모수 방법 VINN에는 −20%로, 모델링 오차를 매끄럽게 하는 효과라 parametric 방법에서만 이득이다. CVAE는 결정론적인 scripted 데이터에서는 차이가 없지만 human 데이터에서 35.3%→2%로 붕괴해 사람 시연 학습에 필수임이 드러난다. 마지막으로 6명 user study에서 control frequency를 50Hz에서 5Hz로 낮추면 teleoperation 시간이 62% 늘어난다(p<0.001) — control frequency는 로봇이 1초에 몇 번 새로운 action을 갱신하는지를 뜻한다.

![[assets/zhao-2023-learning-fine-grained-bimanual-manipulation/fig08.png]]
*Figure 8: Ablation 4종 — (a) chunk size k에 따른 성공률(ACT·BC-ConvMLP·VINN 모두 chunking에서 이득), (b) temporal ensemble 효과, (c) CVAE 유무(human 데이터에서 결정적), (d) 50Hz vs 5Hz teleoperation 시간 분포 (Zhao 2023, Figure 8).*

## 한계 (Limitations)

하드웨어 쪽은 저가 모터의 토크가 부족해 큰 힘이 필요한 과제(무거운 물체 들기, 밀봉된 물병 열기)나 양손의 여러 손가락을 함께 써야 하는 child-proof 약병 같은 과제를 못 한다. 손톱이 필요한 동작(테이프 끝 들추기, 알루미늄 캔 따기)도 어렵다. policy 쪽은 사탕 포장 벗기기와 눕혀진 ziploc 봉투 펴서 열기에서 실패했는데 둘 다 봉합선·변형을 지각하기 어렵고 데이터가 부족한 탓이다. 저자들은 pre-training과 더 많은 데이터, 더 나은 perception을 후속 방향으로 든다.

## 관련 페이지 (Related Pages)

- [[physical-ai/brohan-2022-rt-1-robotics-transformer-for-real-world]] — 이 논문의 baseline 중 하나. RT-1은 고정 길이 히스토리에서 한 스텝 action을 256 bin 이산 토큰으로 내는 반면, ACT는 연속 action을 chunk 단위로 예측한다. 이 논문의 실험에서 ACT가 RT-1을 크게 앞선다.
- [[physical-ai/sa-2026-vision-language-action-models-for]] — bimanual VLA 서베이. ALOHA/ACT는 저가 양팔 imitation learning의 기준점으로, 이후 두 팔 조작 연구가 이 하드웨어·데이터 위에서 자란다. 서베이가 다루는 action head 계열(autoregressive·flow·diffusion) 논의의 뿌리 중 하나.
- [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation]] — action chunk를 flow-matching DiT로 생성하는 후속 VLA foundation model. ACT의 chunk 기반 action 예측을 대형 embodiment로 밀어붙인 판이고, Diffusion Policy와 함께 chunk 기반 action head 계보에 있다.
- [[physical-ai/engiuniverse-2025-14-key-physical-ai-papers]] — Action Chunking을 생성 모델 종류와 독립인 제어 전략으로 짚는 한국어 리뷰. 이 논문이 그 개념의 출처다.
- [[overviews/physical-ai-overview]] — physical-ai 카테고리의 분류 뼈대·학습 경로 허브.
