---
title: "SONIC: Supersizing Motion Tracking for Natural Humanoid Whole-Body Control"
type: paper
year: 2025
category: physical-ai
raw_path: raw/papers/luo-2025-sonic-supersizing-motion-tracking.pdf
raw_filename: "luo-2025-sonic-supersizing-motion-tracking.pdf"
source_collection: external
authors: "Zhengyi Luo, Ye Yuan, Tingwu Wang, Chenran Li, Fernando Castañeda, Sirui Chen, Zi-Ang Cao, Jiefeng Li, David Minor, Qingwei Ben, Jinhyung Park, David Sami, Zi Wang, Xingye Da, Runyu Ding, Cyrus Hogg, Lina Song, Edy Lim, Eugene Jeong, Tairan He, Haoru Xue, Wenli Xiao, Simon Yuen, Jan Kautz, Yan Chang, Umar Iqbal, Linxi \"Jim\" Fan, Yuke Zhu (NVIDIA)"
arxiv_id: "2511.07820"
tags: [physical-ai, humanoid, imitation-learning, vla]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/luo-2025-sonic-supersizing-motion-tracking/fig01.png
    raw: raw/papers/luo-2025-sonic-supersizing-motion-tracking-figures/fig01.png
    caption: "하나의 policy가 받는 입력과 제어 인터페이스 전경. 영상 teleoperation, VR 전신과 키포인트, kinematic planner, 텍스트와 음악 제어, VLA 자율 실행 (Figure 1, p.2)"
    page: 2
    bbox_norm: [0.0947, 0.0939, 0.9053, 0.6076]
    strategy: caption-region
    curated: true
  - id: figs1
    label: Figure S1
    kind: figure
    file: assets/luo-2025-sonic-supersizing-motion-tracking/figs1.png
    raw: raw/papers/luo-2025-sonic-supersizing-motion-tracking-figures/figs1.png
    caption: "test-content 분할에서 나온 분포 밖 모션 시퀀스. 위 네 줄은 추적에 성공한 미학습 모션(힙합 댄스, 무대 인사, 검 찌르기, 돌려차기)이고, 아래 두 줄은 추적에 실패한 미학습 모션(좀비 기어가기, 양반다리 앉기)이다"
    page: 30
    bbox_norm: [0.0947, 0.2636, 0.9053, 0.6819]
    strategy: caption-region
    curated: false
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/luo-2025-sonic-supersizing-motion-tracking/fig02.png
    raw: raw/papers/luo-2025-sonic-supersizing-motion-tracking-figures/fig02.png
    caption: "12개 패널 종합 결과. (a-c) 데이터와 모델과 compute 스케일링, (d-g) 트래커 베이스라인 비교, (h-j) OpenHomie 속도 추종 비교, (k-l) sim2real 전이 (Figure 2, p.4)"
    page: 4
    bbox_norm: [0.0947, 0.0939, 0.9053, 0.6695]
    strategy: caption-region
    curated: true
  - id: figs2
    label: Figure S2
    kind: figure
    file: assets/luo-2025-sonic-supersizing-motion-tracking/figs2.png
    raw: raw/papers/luo-2025-sonic-supersizing-motion-tracking-figures/figs2.png
    caption: "123개 시퀀스로 이뤄진 실세계 평가 세트의 대표 모션. 여기 실린 모션은 모두 실제 Unitree G1 로봇에서 추적에 성공했다"
    page: 32
    bbox_norm: [0.0947, 0.1423, 0.9053, 0.5802]
    strategy: caption-region
    curated: false
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/luo-2025-sonic-supersizing-motion-tracking/fig03.png
    raw: raw/papers/luo-2025-sonic-supersizing-motion-tracking-figures/fig03.png
    caption: "kinematic planner의 인터랙티브 제어. 속도와 방향과 스타일을 바꾸는 내비게이션, 임의 높이의 스쿼트와 무릎보행과 기어가기, 반응형 복싱 (Figure 3, p.7)"
    page: 7
    bbox_norm: [0.1026, 0.0939, 0.8974, 0.7654]
    strategy: caption-region
    curated: true
  - id: figs3
    label: Figure S3
    kind: figure
    file: assets/luo-2025-sonic-supersizing-motion-tracking/figs3.png
    raw: raw/papers/luo-2025-sonic-supersizing-motion-tracking-figures/figs3.png
    caption: "견고성 시험. policy 실행 중 약 11kg(25파운드) 물체를 머리 높이 위에서 로봇에 떨어뜨린다. 로봇은 충격을 흡수하고 균형을 유지하며 추적을 이어간다. 별도의 복구 모듈이나 policy 적응은 쓰지 않았다"
    page: 32
    bbox_norm: [0.0947, 0.7124, 0.9053, 0.8033]
    strategy: caption-region
    curated: false
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/luo-2025-sonic-supersizing-motion-tracking/fig04.png
    raw: raw/papers/luo-2025-sonic-supersizing-motion-tracking-figures/fig04.png
    caption: "영상 teleoperation, 텍스트와 음악 멀티모달 제어, VR 전신 teleoperation의 시간축 전환 (Figure 4, p.8)"
    page: 8
    bbox_norm: [0.0443, 0.0939, 1.0, 0.6137]
    strategy: caption-region
    curated: false
  - id: figs4
    label: Figure S4
    kind: figure
    file: assets/luo-2025-sonic-supersizing-motion-tracking/figs4.png
    raw: raw/papers/luo-2025-sonic-supersizing-motion-tracking-figures/figs4.png
    caption: "연산 규모에 따른 OpenHomie 속도 추적 평가. 왼쪽은 평균 속도 추적 오차(m/s), 오른쪽은 생존률(%)이다"
    page: 34
    bbox_norm: [0.1737, 0.0939, 0.8263, 0.351]
    strategy: caption-region
    curated: false
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/luo-2025-sonic-supersizing-motion-tracking/fig05.png
    raw: raw/papers/luo-2025-sonic-supersizing-motion-tracking-figures/fig05.png
    caption: "VLA 주도 loco-manipulation 5개 과제의 시간축 롤아웃과 성공률 표. 페달을 밟아 쓰레기통 열기, 캔 버리기 등 (Figure 5 + Table 1, p.10)"
    page: 10
    bbox_norm: [0.0947, 0.1087, 0.9053, 0.6268]
    strategy: caption-region
    curated: true
  - id: figs5
    label: Figure S5
    kind: figure
    file: assets/luo-2025-sonic-supersizing-motion-tracking/figs5.png
    raw: raw/papers/luo-2025-sonic-supersizing-motion-tracking-figures/figs5.png
    caption: "SONIC 배포 아키텍처 개요"
    page: 36
    bbox_norm: [0.0947, 0.0939, 0.9053, 0.4076]
    strategy: caption-region
    curated: false
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/luo-2025-sonic-supersizing-motion-tracking/fig06.png
    raw: raw/papers/luo-2025-sonic-supersizing-motion-tracking-figures/fig06.png
    caption: "학습에 쓴 모션 데이터셋의 무작위 샘플 (Figure 6, p.13)"
    page: 13
    bbox_norm: [0.0947, 0.0939, 0.9053, 0.7049]
    strategy: caption-region
    curated: false
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/luo-2025-sonic-supersizing-motion-tracking/fig07.png
    raw: raw/papers/luo-2025-sonic-supersizing-motion-tracking-figures/fig07.png
    caption: "SONIC 아키텍처. robot/hybrid/human 3개 encoder가 quantizer를 거쳐 universal token이 되고 robot control decoder와 robot motion decoder로 갈라진다 (Figure 7, p.14)"
    page: 14
    bbox_norm: [0.0947, 0.0939, 0.9053, 0.2924]
    strategy: caption-region
    curated: true
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/luo-2025-sonic-supersizing-motion-tracking/fig08.png
    raw: raw/papers/luo-2025-sonic-supersizing-motion-tracking-figures/fig08.png
    caption: "consistency loss 유무에 따른 latent 정렬. 기어가기 모션에서 encoder 쌍 사이 L2 거리 평균이 0.57과 4.23으로 갈린다 (Figure 8, p.19)"
    page: 19
    bbox_norm: [0.1144, 0.0939, 0.8856, 0.5438]
    strategy: caption-region
    curated: true
  - id: tab01
    label: Table 1
    kind: table
    file: assets/luo-2025-sonic-supersizing-motion-tracking/tab01.png
    raw: raw/papers/luo-2025-sonic-supersizing-motion-tracking-figures/tab01.png
    caption: "universal motion token action space를 쓴 VLA 과제 성공률. GR00T N1.5 모델을 teleoperation 데이터로 fine-tuning해 전신 loco-manipulation 과제 5종에서 평가했다. 물체 집기 변형들은 같은 policy를 공유하므로 5과제 평균에서는 하나로 묶었다"
    page: 10
    bbox_norm: [0.2307, 0.6998, 0.7693, 0.8222]
    strategy: table-region
    curated: false
  - id: tabs1
    label: Table S1
    kind: table
    file: assets/luo-2025-sonic-supersizing-motion-tracking/tabs1.png
    raw: raw/papers/luo-2025-sonic-supersizing-motion-tracking-figures/tabs1.png
    caption: "universal control policy 구조와 하이퍼파라미터"
    page: 31
    bbox_norm: [0.0947, 0.0708, 0.9053, 0.267]
    strategy: table-region
    curated: false
  - id: tab02
    label: Table 2
    kind: table
    file: assets/luo-2025-sonic-supersizing-motion-tracking/tab02.png
    raw: raw/papers/luo-2025-sonic-supersizing-motion-tracking-figures/tab02.png
    caption: "데이터셋 분할 통계와 main category, sub category 분포. 각 main category(예: Locomotion, Dance)는 구체적 모션 유형을 나타내는 여러 sub category(예: hip-hop slide, injured-leg jog)를 담는다. test-content 분할은 새로운 sub category로의 일반화를 평가한다"
    page: 12
    bbox_norm: [0.2521, 0.4929, 0.7479, 0.7164]
    strategy: table-region
    curated: false
  - id: tabs2
    label: Table S2
    kind: table
    file: assets/luo-2025-sonic-supersizing-motion-tracking/tabs2.png
    raw: raw/papers/luo-2025-sonic-supersizing-motion-tracking-figures/tabs2.png
    caption: "학습 하이퍼파라미터"
    page: 31
    bbox_norm: [0.2817, 0.2939, 0.7183, 0.5454]
    strategy: table-region
    curated: false
  - id: tab03
    label: Table 3
    kind: table
    file: assets/luo-2025-sonic-supersizing-motion-tracking/tab03.png
    raw: raw/papers/luo-2025-sonic-supersizing-motion-tracking-figures/tab03.png
    caption: "VLA action space ablation. universal motion token을 쓸 때와 명시적 SMPL pose를 쓸 때의 과제 완료 성공률이다. FSQ 토큰 인터페이스는 compact하고 구조화된 action space를 제공해 VLA가 학습하기 훨씬 쉽다. 과제가 복잡할수록 격차가 벌어진다"
    page: 18
    bbox_norm: [0.3048, 0.0944, 0.6952, 0.183]
    strategy: table-region
    curated: false
  - id: tabs3
    label: Table S3
    kind: table
    file: assets/luo-2025-sonic-supersizing-motion-tracking/tabs3.png
    raw: raw/papers/luo-2025-sonic-supersizing-motion-tracking-figures/tabs3.png
    caption: "reward 설계. 위첨자 𝑔는 목표, 𝑝는 현재 상태, ℬ는 추적 대상 신체 링크, 𝒦는 VR 키포인트(머리, 양 손목, 양 발목)를 뜻하고 rel은 root frame 기준 상대값을 뜻한다"
    page: 33
    bbox_norm: [0.1712, 0.3703, 0.8288, 0.5889]
    strategy: table-region
    curated: false
  - id: tab04
    label: Table 4
    kind: table
    file: assets/luo-2025-sonic-supersizing-motion-tracking/tab04.png
    raw: raw/papers/luo-2025-sonic-supersizing-motion-tracking-figures/tab04.png
    caption: "ablation 결과. (a) FSQ가 test-content에서 VQ-VAE보다 MPJPE-L 기준 8.7mm 낫다. (b) quantizer 용량이 클수록 성능이 오르며 level 수보다 토큰 차원이 더 중요하다. (c) 모든 encoder가 99.2%를 넘는 성공률을 유지하고, human encoder는 robot encoder 대비 0.6mm 차이에 그친다"
    page: 20
    bbox_norm: [0.1731, 0.0944, 0.8269, 0.2958]
    strategy: table-region
    curated: false
  - id: tabs4
    label: Table S4
    kind: table
    file: assets/luo-2025-sonic-supersizing-motion-tracking/tabs4.png
    raw: raw/papers/luo-2025-sonic-supersizing-motion-tracking-figures/tabs4.png
    caption: "학습 중 적용한 domain randomization 파라미터. 𝒰는 균등 분포를 뜻한다"
    page: 33
    bbox_norm: [0.1712, 0.3703, 0.8288, 0.5889]
    strategy: table-region
    curated: false
---

## 한 줄 요약 (One-line Summary)

NVIDIA GEAR가 motion tracking을 humanoid 제어의 확장 가능한 기본 과제로 놓고 파라미터 1.2M→42M, 모션 100M+ 프레임, 21,000 GPU hours까지 밀어붙여 만든 whole-body control foundation model. 세 종류 입력을 FSQ 양자화된 universal token 하나로 모으는 encoder-decoder 설계 덕에 같은 policy가 gamepad, VR teleoperation, 텍스트와 음악, VLA 자율 실행을 모두 받는다.

## 1. 자료 정보 (Document Information)

- 제목: SONIC: Supersizing Motion Tracking for Natural Humanoid Whole-Body Control
- 저자: Zhengyi Luo, Ye Yuan, Tingwu Wang, Chenran Li, Fernando Castañeda 공동 1저자 외 총 27명, 전원 NVIDIA (GEAR 팀)
- arXiv: 2511.07820. BibTeX 상 `year={2025}`. 아카이브한 파일은 v3(2026-05-21 개정, 본문 37페이지 + Supplementary)
- 로봇 플랫폼: Unitree G1 (29 actuated joints)
- 프로젝트 페이지: https://nvlabs.github.io/GEAR-SONIC/
- 코드와 체크포인트: https://github.com/NVlabs/GR00T-WholeBodyControl
- 데이터 공개: BONES-SEED (Hugging Face). 522명 배우, 142,220 시퀀스, 약 288시간

## 2. 주요 기여 (Key Contributions)

whole-body control은 균형과 이동을 포함해 몸 전체를 함께 제어하는 문제다. 이 humanoid 제어가 스케일링되지 못한 이유를 저자들은 모델이나 compute가 아니라 학습 과제 자체에서 찾는다. reward는 policy가 얼마나 잘했는지를 알려주는 스칼라 신호인데, locomotion 같은 과제는 시나리오마다 이 reward를 새로 설계해야 한다. 앞으로 걷기를 잘하게 만든 reward는 춤이나 기상 동작에 신호를 거의 주지 못한다. AMP와 ASE와 CALM 계열의 생성적 imitation은 목적함수를 통일했지만 데이터가 다양해질수록 discriminator가 mode collapse에 빠진다. 반면 motion tracking은 mocap 프레임마다 목표 포즈가 명시되므로 reward engineering 없이 dense supervision을 얻는다. 데이터가 커져도 신호의 밀도가 떨어지지 않는다는 게 결정적이다.

기여는 세 가지다. 우선 motion tracking이 데이터와 모델과 compute 세 기준 모두에서 우호적인 스케일링 곡선을 그린다는 것을 21,000 GPU hours와 100M 프레임 규모로 실측했다. 여기에 실시간 kinematic motion planner를 붙여 트래커를 내비게이션과 게임패드 제어 같은 목표지향 과제로 연결했다. 마지막이 robot과 human과 hybrid 세 입력 포맷을 하나의 quantized latent로 모으는 universal token space다. policy는 현재 observation을 받아 다음 action을 정하는 함수를 말한다. 같은 policy가 VR teleoperation과 VLA 추론을 동시에 받게 만든 설계로, 이 인터페이스 위에서 손과 발을 함께 써야 하는 전신 loco-manipulation을 VLA가 자율로 수행한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 데이터셋과 분할

원본은 남녀 성비를 맞춘 대규모 mocap 컬렉션 약 700시간이다. 클립 길이는 1초부터 180초까지 걸쳐 있고 대부분의 동작을 여러 배우가 여러 테이크로 수행했다. GMR과 PyRoki로 Unitree G1에 retarget한 뒤 계단 오르기나 착석 동작처럼 로봇이 물리적으로 실행할 수 없는 것을 걸러 611시간(50Hz 기준 100M+ 프레임, 317,189 클립)을 학습에 썼다.

분할 설계가 평가의 신뢰도를 좌우한다. 학습 세트는 8,447개 sub-category를 덮는다. test-content(6,998 클립, 15시간)는 학습에 전혀 없던 182개 sub-category만 모아 새로운 동작 내용의 일반화를 잰다. test-repetition(6,306 클립, 12시간)은 sub-category는 100% 겹치되 클립은 겹치지 않게 해서 같은 동작의 다른 수행에 대한 강건성을 본다. 외부 벤치마크로는 다른 retargeting 파이프라인에서 나온 PHUMA(68,000 모션)를 쓴다. 상위 33개 카테고리에는 기본과 고급 locomotion, 제스처, 댄스(힙합, 라틴, 보그, 필라), 전투(검, 무술, 마법), 물체 조작, 도구 사용(밸브, 레버, 전기톱, 빗자루), 부상 보행, 스타일 변형(취한 걸음, 좀비, 은밀한 이동), 역할극 등이 들어간다.

### universal control policy

MDP로 정식화하고 PPO로 학습한다. 상태는 proprioception과 motion command 두 덩이로, proprioception은 관절 위치와 속도, root 각속도, root 프레임의 중력 벡터, 직전 action을 10스텝 히스토리로 이어붙인다. 히스토리를 넣는 이유는 policy에 선행 동작(anticipatory behavior)의 근거를 주기 위해서다. 모든 값은 로봇 로컬 프레임에서 표현하고 회전은 6D representation을 쓴다. action은 관절 목표 위치이고 각 관절의 PD 제어기가 이를 추종한다.

reward는 추종항과 페널티항의 합이다. 추종항은 root 위치와 방향, root 상대 링크 위치와 방향, 링크 선속도와 각속도의 오차를 줄인다. 여기에 머리와 양 손목과 양 발목의 end-effector 위치 reward를 따로 더했다. 머리와 손목의 각속도에 걸리는 anti-shake 페널티와 발 가속도 페널티가 접촉을 매끄럽게 만든다. domain randomization은 마찰 계수와 반발 계수, 첫 프레임 관절 위치, base 무게중심에 걸리고 root 속도에 주기적 외력을 넣는다. 목표 motion command 자체에도 교란을 주는데, 이 항목이 planner 출력의 노이즈에 대한 강건성의 근거가 된다.

핵심은 encoder-quantizer-decoder 구조다. 세 encoder가 서로 다른 입력을 공통 latent로 보낸다. robot motion encoder는 미래 $F_r$ 프레임의 관절 위치와 속도를, human motion encoder는 SMPL 3D 관절 위치를, hybrid encoder는 현재 프레임의 상체 sparse keypoint(머리와 양손)와 하체 로봇 모션을 받는다. 마지막 것이 VR 3-point teleoperation에 대응한다. 세 encoder는 모두 MLP다.

latent는 Finite Scalar Quantization(FSQ)으로 양자화되어 universal token이 된다. 토큰 2개, 기본 설정은 FSQ-32-32(레벨 32, 차원 32)이고 VLA 쪽에는 64차원으로 노출된다. VQ-VAE 대신 FSQ를 택한 이유는 codebook collapse가 없고 commitment loss나 codebook EMA 갱신이 필요 없으며 straight-through 추정이 PPO와 함께 최적화하기에 깔끔하다는 점이다. 33개 카테고리와 8,447개 sub-category라는 다양성에서 codebook 미사용 구간이 생기는 건 실제 위험이다.

디코더는 둘이다. robot control decoder $\mathcal{D}_c$는 토큰과 proprioception을 받아 모터 명령을 낸다. robot motion decoder $\mathcal{D}_r$는 토큰만 받아 로봇 모션 명령을 복원해 보조 감독을 준다. 입력이 human motion일 때 $\mathcal{D}_r$의 복원 손실이 사실상 human→robot retargeting loss로 작동한다. 이게 런타임 명시적 retargeting을 생략할 수 있는 근거다.

손실은 네 항의 합 $\mathcal{L} = \mathcal{L}_{ppo} + \mathcal{L}_{recon} + \mathcal{L}_{token} + \mathcal{L}_{cycle}$ 이다. $\mathcal{L}_{recon}$은 세 입력 각각의 토큰에서 로봇 모션을 복원하는 오차, $\mathcal{L}_{token}$은 세 encoder 출력 쌍마다 걸리는 정렬 손실, $\mathcal{L}_{cycle}$은 human 토큰에서 복원한 로봇 모션을 다시 인코딩한 $\mathcal{E}_r(\mathcal{D}_r(z_h))$와 원래 $z_r$ 사이의 순환 일관성 손실이다. 네 손실을 한 루프에서 함께 최적화한다. critic만 특권 정보(base 선속도, 전체 링크 상태, 노이즈 없는 observation)를 보는 asymmetric actor-critic 구조다. 양자화와 RL을 엮었을 때의 학습 불안정은 어느 모델 규모에서도 관찰되지 않았고 오히려 보조 손실이 latent를 정규화해 PPO 최적화를 안정화했다는 게 저자들의 보고다. 샘플링은 데이터셋을 고정 길이 bin으로 나눠 실패율(상한 적용)에 비례해 가중하는 bin-based adaptive 방식이다.

### 생성형 kinematic planner

planner는 트래커와 같은 데이터로 학습한 대규모 latent 생성 모델이다. 계획은 autoregressive motion in-betweening으로 푼다. 0.8초에서 2.4초 사이의 구간을 뽑아 양 끝 keyframe을 context와 target으로 쓴다. 모션 표현은 pelvis 상대 관절 위치와 전역 관절 회전인데, 전역 회전을 쓰는 이유는 스쿼트나 기어가기처럼 heading이 정의되기 어려운 동작의 품질 때문이다.

계획은 latent 공간에서 이뤄진다. 연속 모션을 downsampling rate 4로 토큰열로 인코딩한 뒤, sparse한 제약(시작과 목표 keyframe)에서 전체 토큰열을 한 번에 예측하는 대신 masked token prediction으로 confidence 높은 토큰부터 확정해 나간다. 추론 시 확정 비율은 코사인 스케줄 $1 - \cos(\frac{\pi}{2}\cdot\frac{L}{L_{max}})$을 따른다.

root trajectory는 critically damped spring model로 만든다. pelvis의 x축과 y축 위치와 투영 heading 각도 세 값에 적용하고 damping 계수는 위치 $5\ln 2$, heading $20\ln 2$이다. 저자들은 planner가 damping 계수 선택에 강건하고 사실 spring model 없이도 대체로 동작한다고 말한다. 그러면서도 6.0m/s에서 −6.0m/s로 급반전하는 비현실적 명령을 걸러주는 안전장치로서의 값은 인정한다. 스킬별 keyframe은 스타일에 맞는 클립에서 가장 표현적인 구간(펀치라면 팔이 최대로 뻗은 프레임)을 고르거나 원하는 높이에 따라 온라인으로 라이브러리에서 검색한다. 스킬 하나당 대표 클립 한 개로 25개 이상의 스킬과 스타일을 재학습 없이 다룬다.

### 멀티모달과 teleoperation과 VLA 연결

영상과 텍스트와 음악 제어는 GEM을 쓴다. GEM은 추정을 제약된 생성으로 보는 통합 모델이다. 텍스트와 오디오와 영상 조건을 섞어 받고 슬라이딩 윈도우와 inpainting 기반 전환으로 저지연 생성을 한다. 생성된 human motion은 human encoder를 타고 들어간다. 영상 제어는 사전 녹화 클립과 라이브 단안 웹캠 스트림을 모두 지원하고 60fps 이상으로 포즈를 추정해 전용 mocap 장비 없이 teleoperation이 된다.

VR 인터페이스는 두 가지다. 전신 teleoperation은 PICO 헤드셋에 발목 트래커와 컨트롤러를 붙여 SMPL 전신 포즈를 스트리밍한다. 3-point는 헤드셋과 컨트롤러만으로 머리와 양 손목의 SE(3) 포즈, 손가락 관절, 허리 높이, 내비게이션 명령을 내며 하체는 planner가 생성한다. 두 인터페이스가 같은 token space를 쓰기 때문에 여기서 모은 데이터로 VLA를 학습시킬 수 있다.

VLA는 GR00T N1.5를 teleoperation 데이터로 파인튜닝해 붙였다. action은 78차원이며 universal motion token 64차원과 손 관절 14차원으로 이뤄진다.

### 배포

추론은 전부 Jetson Orin GPU 온보드에서 TensorRT와 CUDA Graph로 실행되며 policy forward 1~2ms, 모션 생성 약 12ms다. policy 추론 50Hz, 명령 스트리밍 500Hz, 조작자 입력 100Hz, kinematic planning 10Hz의 네 루프가 동시에 실행된다. 활성 encoder만 바꾸면 키보드, 게임패드, VR, 네트워크 스트림 사이를 재학습 없이 전환한다. 실물 실험은 전부 가장 큰 42M 모델로 했다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 스케일링

세 기준 모두에서 단조 개선이 나온다. 데이터는 4M→10M→22M→100M 프레임, 모델은 1.2M→16M→42M 파라미터, compute는 16/32/128 GPU로 50,000 iteration 고정 학습해 약 2,000/9,000/21,000 GPU hours다. 가장 큰 설정이 test-content에서 성공률 99.6%와 MPJPE-L 23.8mm이고 가장 작은 1.2M이 98.0%와 27.7mm다. 개선폭은 OOD인 test-content에서 더 크게 나타나 스케일이 일반화에 기여한다는 해석을 지지한다. compute 측면에서는 같은 iteration 수에서 GPU가 많을수록 batch가 커져 최적화가 안정되고 최종 성능이 높아진다. 최대 설정은 128 GPU 7일이다.

### 베이스라인과 specialist 비교

GMT, Any2Track, BeyondMimic과 MuJoCo에서 같은 종료 조건으로 비교해 SONIC이 98.7%를 얻는다. 다만 세 베이스라인의 학습 데이터와 retargeting 파이프라인이 서로 달라(Any2Track과 BeyondMimic은 LaFAN, GMT는 AMASS) 저자들도 이 비교를 데이터가 맞춰진 벤치마크가 아니라 cross-dataset 일반화와 스케일 효과의 증거로 읽어야 한다고 명시한다.

속도 추종 specialist인 OpenHomie와의 대조가 더 날카롭다. 범용 트래커인 SONIC이 생존율 98.5%인데 특화 policy인 OpenHomie가 43.0%다. 게다가 OpenHomie는 8 GPU를 넘어서면 성능이 정체하는 반면 SONIC은 compute를 더 넣을수록 계속 개선된다. 저자들은 이를 데이터 다양성이 범용 트래커에 주는 이득이 특화가 좁은 policy에 주는 이득보다 크다는 근거로 든다.

### sim2real

실물 평가는 123개 모션 시퀀스, 시퀀스당 1회 시행이다. 성공률은 시뮬레이션 100.0%에서 실물 99.2%로 거의 유지된다. MPJPE-L은 전체 22.3mm→25.7mm, 상체 21.8mm→22.2mm, 하체 24.8mm→32.1mm, 발 29.0mm→53.7mm다. 발에서 격차가 두 배 가까이 벌어지는 게 이 표의 핵심 정보다.

### VLA loco-manipulation

GR00T N1.5로 다섯 과제를 평가했고 시행당 부분 점수 없는 이진 판정이다.

| 과제 | 인터페이스 | 학습 데이터 | 시행 | 성공률 |
|---|---|---|---|---|
| Apple to plate | 3-point | 300 traj | 20 | 90% |
| Object pickup (carrot) | whole-body | 3,900 traj | 20 | 75% |
| Object pickup (scrub) | whole-body | 3,900 traj | 20 | 95% |
| Open trash can (foot) | whole-body | 200 traj | 10 | 70% |
| Soda can to trash can | whole-body | 1,000 traj | 10 | 60% |
| Drill and box relocation | whole-body | 300 traj | 10 | 70% |
| 5개 과제 평균 | | | | 75% |

가장 어려운 soda can 과제는 다섯 스킬의 연쇄다. 테이블로 걸어가 한 손으로 캔을 들고, 쓰레기통으로 이동해 한 발로 페달을 밟아 뚜껑을 열면서 다른 발로 균형을 잡고, 캔을 던져 넣는다. action space는 policy가 낼 수 있는 action의 집합이다. 상체 제어와 locomotion을 분리하는 action space에서는 만들기 어려운 종류의 동작이다.

### ablation

action space 비교가 가장 큰 폭을 보인다. VLA가 FSQ 토큰을 예측할 때와 SMPL 전신 포즈를 직접 예측할 때(81차원)를 견주면 평균 68% 대 27%로 42포인트 차이가 난다. 과제가 복잡할수록 격차가 커진다. carrot pickup은 75% 대 60%인데 soda can 과제에서는 60% 대 0%다. 고차원 연속 포즈 공간에서는 작은 예측 오차가 큰 추종 실패로 증폭된다는 게 저자들의 설명이다.

양자화기 설계에서는 FSQ가 VQ-VAE(4 head, codebook 512, 토큰 2개)를 test-content MPJPE-L에서 8.7mm 앞선다(26.6mm 대 35.3mm). 용량 스윕은 compute 제약으로 32 GPU에서 돌렸다. 레벨보다 토큰 차원의 영향이 커서 양자화 granularity보다 표현 용량이 더 중요하다는 결론이 나온다. FSQ-32-32가 기본값이다.

encoder 셋은 모두 99.2% 이상을 유지한다. robot encoder는 99.6%와 23.8mm, human encoder는 99.6%와 24.4mm, hybrid encoder는 99.2%와 26.5mm로, 입력 포맷이 다른 human encoder의 격차가 0.6mm에 그친다. hybrid가 2.7mm 뒤진 건 상체 sparse keypoint만 주어지는 제한된 observation 때문이다. consistency loss를 빼면 encoder 간 발산이 8배로 커진다(기어가기 모션에서 평균 L2 0.57→4.23). VLA가 토큰을 직접 예측하는 구조이므로 이 정렬은 서로 다른 인터페이스로 모은 데이터가 같은 latent 공간에 놓이도록 보장하는 전제 조건이다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

저자들이 명시한 한계는 장기 운용에 필요한 안전성과 에너지 효율을 형식적으로 다루지 않았다는 점이다. 트래커는 학습 시 motion command에 대한 domain randomization과 배포 시 spring model의 필터링으로 planner 출력의 노이즈를 견디지만, 더 극한 조건이나 매우 동적인 동작에서는 균형을 잃을 수 있다.

베이스라인 비교의 해석 범위도 저자들 스스로 좁혀 둔다. 학습 데이터와 retargeting이 통일되지 않았으므로 데이터 정합 벤치마크로 읽으면 안 된다.

## 6. 관련 연구 (Related Work)

생성적 imitation 계열인 AMP와 ASE와 CALM은 목적함수를 통일했지만 discriminator 신호가 데이터 다양성에 취약하다는 점이 이 논문의 출발 대비점이다. 선행 motion tracking 연구들(GMT, BeyondMimic, Any2Track, PHC 계열)은 대체로 학습 데이터에서의 전신 추종 결과를 보이는 데 머물고 tracking 이후의 downstream 과제를 넓게 보여주지 못했다는 게 저자들의 진단이다. 속도 추종 specialist로는 OpenHomie가, VLA foundation model로는 GR00T N1/N1.5가 직접 비교와 통합 대상으로 등장한다. retargeting은 GMR과 PyRoki, 멀티모달 모션 생성은 GEM, 양자화는 FSQ와 VQ-VAE, 시뮬레이터는 Isaac Lab과 MuJoCo다.

## 7. 용어집 (Glossary)

- **motion tracking**: 참조 모션의 프레임별 목표 포즈를 물리 시뮬레이션 안의 로봇이 따라가게 하는 과제. reward engineering 없이 dense supervision을 준다
- **MPJPE-L**: local(root 상대) mean per-joint position error. 14개 body link(pelvis, 무릎, 발목, torso, 팔꿈치, 손목)에서 mm 단위로 계산
- **test-content / test-repetition**: 학습에 없던 sub-category만 모은 분할과, sub-category는 겹치되 클립이 다른 분할. 각각 새 동작 내용과 새 수행에 대한 일반화를 잰다
- **FSQ (Finite Scalar Quantization)**: 학습된 codebook 없이 차원별 고정 레벨로 latent를 양자화하는 방식. codebook collapse가 없고 straight-through 그래디언트가 깔끔하다
- **universal token**: robot과 human과 hybrid 세 입력이 공통으로 매핑되는 양자화 latent. VLA의 action space로도 쓰인다
- **hybrid motion**: 상체 sparse keypoint(머리와 양손)와 하체 로봇 모션을 합친 명령 형식. VR 3-point teleoperation에 대응
- **motion in-betweening**: 시작과 목표 keyframe이 주어졌을 때 중간 구간을 채우는 생성 과제. planner의 정식화
- **critically damped spring model**: 과도한 진동 없이 목표에 수렴하는 감쇠 모델. root 위치와 heading trajectory 생성에 사용
- **asymmetric actor-critic**: critic만 특권 시뮬레이션 정보를 보고 actor는 배포 시 얻을 수 있는 observation만 쓰는 학습 구조
- **SMPL**: 인체 형상과 포즈의 파라메트릭 모델. human motion encoder의 입력 포맷
- **BONES-SEED**: 이 데이터셋 중 공개된 부분. 522명 배우, 142,220 시퀀스, 약 288시간, SOMA와 Unitree G1 포맷

## 8. 그림 후보 (Figure Candidates)

Step 2.5 자동 추출로 14개가 잡혔고 이 중 8개가 실제 Figure다. 나머지 6개는 본문 교차참조("as shown in Fig. 2" 등)가 줄머리에 와서 잡힌 오탐이다.

Step 3.5 확정: 아래 표 기준 fig01, fig03, fig06, fig09, fig13을 `curated: true`로 두고 `wiki/assets/`에 복사했다. 이후 재큐레이션에서 consistency loss 도식(Figure 8)을 추가로 승격했다. 나머지는 아카이브에만 남긴다.

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 2 | 하나의 policy가 다루는 입력과 인터페이스 전경 (Figure 1) | page-region | ★ wiki 권장 (overview) |
| fig02 | 3 | (오탐) 교차참조 매칭 | page-region | ✗ |
| fig03 | 4 | 12개 패널 종합 결과, 스케일링과 베이스라인과 sim2real (Figure 2) | page-region | ★ wiki 권장 (result) |
| fig04 | 5 | (오탐) 교차참조 매칭 | page-region | ✗ |
| fig05 | 6 | (오탐) 교차참조 매칭 | page-region | ✗ |
| fig06 | 7 | kinematic planner 인터랙티브 제어 (Figure 3) | page-region | ★ wiki 권장 (method) |
| fig07 | 7 | (오탐) 교차참조 매칭 | page-region | ✗ |
| fig08 | 8 | 영상과 텍스트와 음악과 VR 제어 (Figure 4) | page-region | (선택) |
| fig09 | 10 | VLA loco-manipulation 5개 과제 + 성공률 표 (Figure 5 + Table 1) | page-region | ★ wiki 권장 (result) |
| fig10 | 12 | (오탐) 교차참조 매칭 | page-region | ✗ |
| fig11 | 12 | (오탐) 교차참조 매칭 | page-region | ✗ |
| fig12 | 13 | 모션 데이터셋 무작위 샘플 (Figure 6) | page-region | (선택) |
| fig13 | 14 | SONIC 아키텍처, 3 encoder에서 token을 거쳐 2 decoder로 (Figure 7) | page-region | ★ wiki 권장 (architecture) |
| fig14 | 19 | consistency loss 유무의 latent 정렬 (Figure 8) | page-region | (선택) |
