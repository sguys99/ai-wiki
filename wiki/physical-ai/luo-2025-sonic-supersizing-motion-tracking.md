---
title: "SONIC: Supersizing Motion Tracking for Natural Humanoid Whole-Body Control"
type: paper
year: 2025
category: physical-ai
source: luo-2025-sonic-supersizing-motion-tracking.md
raw_path: /Users/kmyu/Desktop/project/ai-wiki/raw/papers/luo-2025-sonic-supersizing-motion-tracking.pdf
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
    caption: "하나의 정책이 다루는 입력·인터페이스 전경 — 영상 teleoperation, VR 전신/키포인트, kinematic planner, 텍스트·음악 제어, VLA 자율 실행 (Figure 1, p.2)"
    page: 2
    bbox_norm: [0.0947, 0.0939, 0.9053, 0.6076]
    strategy: caption-region
    curated: true
  - id: figs1
    label: Figure S1
    kind: figure
    file: assets/luo-2025-sonic-supersizing-motion-tracking/figs1.png
    raw: raw/papers/luo-2025-sonic-supersizing-motion-tracking-figures/figs1.png
    caption: "Figure S1: Out-of-distribution motion sequences from the test-content split. Top four rows: unseen motions successfully tracked (hip-hop dance, stage bow, sword lunge, roundhouse kick). Bottom two rows: unseen motions where tracking fails (zombie crawl, cross-legged sit)."
    page: 30
    bbox_norm: [0.0947, 0.2636, 0.9053, 0.6819]
    strategy: caption-region
    curated: false
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/luo-2025-sonic-supersizing-motion-tracking/fig02.png
    raw: raw/papers/luo-2025-sonic-supersizing-motion-tracking-figures/fig02.png
    caption: "12패널 종합 결과 — (a-c) 데이터·모델·compute 3축 스케일링, (d-g) 트래커 베이스라인 비교, (h-j) OpenHomie 속도추종 비교, (k-l) sim2real 전이 (Figure 2, p.4)"
    page: 4
    bbox_norm: [0.0947, 0.0939, 0.9053, 0.6695]
    strategy: caption-region
    curated: true
  - id: figs2
    label: Figure S2
    kind: figure
    file: assets/luo-2025-sonic-supersizing-motion-tracking/figs2.png
    raw: raw/papers/luo-2025-sonic-supersizing-motion-tracking-figures/figs2.png
    caption: "Figure S2: Representative motions from the 123-sequence real-world evaluation set. All shown motions are successfully tracked on the physical Unitree G1 robot."
    page: 32
    bbox_norm: [0.0947, 0.1423, 0.9053, 0.5802]
    strategy: caption-region
    curated: false
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/luo-2025-sonic-supersizing-motion-tracking/fig03.png
    raw: raw/papers/luo-2025-sonic-supersizing-motion-tracking-figures/fig03.png
    caption: "kinematic planner의 인터랙티브 제어 — 속도·방향·스타일 전환 내비게이션, 임의 높이의 스쿼트·무릎보행·기어가기, 반응형 복싱 (Figure 3, p.7)"
    page: 7
    bbox_norm: [0.1026, 0.0939, 0.8974, 0.7654]
    strategy: caption-region
    curated: true
  - id: figs3
    label: Figure S3
    kind: figure
    file: assets/luo-2025-sonic-supersizing-motion-tracking/figs3.png
    raw: raw/papers/luo-2025-sonic-supersizing-motion-tracking-figures/figs3.png
    caption: "Figure S3: Robustness test: an approximately 11 kg (25 lb) object is dropped onto the robot from above head height during policy execution. The robot absorbs the impact, maintains balance, and continues tracking. No recovery module or policy adaptation is used."
    page: 32
    bbox_norm: [0.0947, 0.7124, 0.9053, 0.8033]
    strategy: caption-region
    curated: false
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/luo-2025-sonic-supersizing-motion-tracking/fig04.png
    raw: raw/papers/luo-2025-sonic-supersizing-motion-tracking-figures/fig04.png
    caption: "영상 teleoperation, 텍스트·음악 멀티모달 제어, VR 전신 teleoperation의 시간축 전환 (Figure 4, p.8)"
    page: 8
    bbox_norm: [0.0443, 0.0939, 1.0, 0.6137]
    strategy: caption-region
    curated: false
  - id: figs4
    label: Figure S4
    kind: figure
    file: assets/luo-2025-sonic-supersizing-motion-tracking/figs4.png
    raw: raw/papers/luo-2025-sonic-supersizing-motion-tracking-figures/figs4.png
    caption: "Figure S4: OpenHomie velocity tracking evaluation vs. compute scale. Left: mean velocity tracking error (m/s). Right: survival rate (%)."
    page: 34
    bbox_norm: [0.1737, 0.0939, 0.8263, 0.351]
    strategy: caption-region
    curated: false
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/luo-2025-sonic-supersizing-motion-tracking/fig05.png
    raw: raw/papers/luo-2025-sonic-supersizing-motion-tracking-figures/fig05.png
    caption: "VLA 주도 loco-manipulation 5개 과제의 시간축 롤아웃과 성공률 표 — 페달 밟아 쓰레기통 열기, 캔 버리기 등 (Figure 5 + Table 1, p.10)"
    page: 10
    bbox_norm: [0.0947, 0.1087, 0.9053, 0.6268]
    strategy: caption-region
    curated: true
  - id: figs5
    label: Figure S5
    kind: figure
    file: assets/luo-2025-sonic-supersizing-motion-tracking/figs5.png
    raw: raw/papers/luo-2025-sonic-supersizing-motion-tracking-figures/figs5.png
    caption: "Figure S5: Overview of the deployment architecture of SONIC ."
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
    caption: "SONIC 아키텍처 — robot/hybrid/human 3개 encoder → quantizer → universal token → robot control decoder + robot motion decoder (Figure 7, p.14)"
    page: 14
    bbox_norm: [0.0947, 0.0939, 0.9053, 0.2924]
    strategy: caption-region
    curated: true
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/luo-2025-sonic-supersizing-motion-tracking/fig08.png
    raw: raw/papers/luo-2025-sonic-supersizing-motion-tracking-figures/fig08.png
    caption: "consistency loss 유무에 따른 latent space 정렬 — 기어가기 모션의 encoder 쌍 간 L2 거리 평균 0.57 대 4.23 (Figure 8, p.19)"
    page: 19
    bbox_norm: [0.1144, 0.0939, 0.8856, 0.5438]
    strategy: caption-region
    curated: false
  - id: tab01
    label: Table 1
    kind: table
    file: assets/luo-2025-sonic-supersizing-motion-tracking/tab01.png
    raw: raw/papers/luo-2025-sonic-supersizing-motion-tracking-figures/tab01.png
    caption: "Table 1: VLA task success rates using the universal motion token action space. The GR00T N1.5 model is fine-tuned on teleoperated data and evaluated across five whole-body loco-manipulation tasks (object pickup variants share the same policy and are averaged as one task for the 5-task mean). Success"
    page: 10
    bbox_norm: [0.2307, 0.6998, 0.7693, 0.8222]
    strategy: table-region
    curated: false
  - id: tabs1
    label: Table S1
    kind: table
    file: assets/luo-2025-sonic-supersizing-motion-tracking/tabs1.png
    raw: raw/papers/luo-2025-sonic-supersizing-motion-tracking-figures/tabs1.png
    caption: "Table S1: Universal control policy architecture and hyperparameters."
    page: 31
    bbox_norm: [0.0947, 0.0708, 0.9053, 0.267]
    strategy: table-region
    curated: false
  - id: tab02
    label: Table 2
    kind: table
    file: assets/luo-2025-sonic-supersizing-motion-tracking/tab02.png
    raw: raw/papers/luo-2025-sonic-supersizing-motion-tracking-figures/tab02.png
    caption: "Table 2: Dataset split statistics and main/sub-category distribution. Each main category (e.g., Locomotion, Dance) contains many sub-categories describing specific motion types (e.g., “hip-hop slide,” “injured-leg jog”). Test-content evaluates generalization to novel sub-categories : its sub-categor"
    page: 12
    bbox_norm: [0.2521, 0.4929, 0.7479, 0.7164]
    strategy: table-region
    curated: false
  - id: tabs2
    label: Table S2
    kind: table
    file: assets/luo-2025-sonic-supersizing-motion-tracking/tabs2.png
    raw: raw/papers/luo-2025-sonic-supersizing-motion-tracking-figures/tabs2.png
    caption: "Table S2: Training hyperparameters."
    page: 31
    bbox_norm: [0.2817, 0.2939, 0.7183, 0.5454]
    strategy: table-region
    curated: false
  - id: tab03
    label: Table 3
    kind: table
    file: assets/luo-2025-sonic-supersizing-motion-tracking/tab03.png
    raw: raw/papers/luo-2025-sonic-supersizing-motion-tracking-figures/tab03.png
    caption: "Table 3: VLA action space ablation: task completion success rate using universal motion tokens vs. explicit SMPL poses. The FSQ token interface provides a compact, structured action space that is substantially easier for the VLA to learn. The gap widens on more complex tasks—on soda-can-to-trash-can"
    page: 18
    bbox_norm: [0.3048, 0.0944, 0.6952, 0.183]
    strategy: table-region
    curated: false
  - id: tabs3
    label: Table S3
    kind: table
    file: assets/luo-2025-sonic-supersizing-motion-tracking/tabs3.png
    raw: raw/papers/luo-2025-sonic-supersizing-motion-tracking-figures/tabs3.png
    caption: "Table S3: Reward design. Superscript 𝑔 : goal/target; 𝑝 : current state; ℬ : tracked body links; 𝒦 : VR keypoints (head, both wrists, both ankles); “rel”: relative to root frame."
    page: 33
    bbox_norm: [0.1712, 0.3703, 0.8288, 0.5889]
    strategy: table-region
    curated: false
  - id: tab04
    label: Table 4
    kind: table
    file: assets/luo-2025-sonic-supersizing-motion-tracking/tab04.png
    raw: raw/papers/luo-2025-sonic-supersizing-motion-tracking-figures/tab04.png
    caption: "Table 4: Ablation results. (a) FSQ outperforms VQ-VAE by 8.7 mm MPJPE-L on test-content. (b) Higher quantizer capacity improves performance; token dimension matters more than levels. (c) All encoders maintain > 99.2% success; the human encoder shows only +0.6 mm gap from the robot encoder."
    page: 20
    bbox_norm: [0.1731, 0.0944, 0.8269, 0.2958]
    strategy: table-region
    curated: false
  - id: tabs4
    label: Table S4
    kind: table
    file: assets/luo-2025-sonic-supersizing-motion-tracking/tabs4.png
    raw: raw/papers/luo-2025-sonic-supersizing-motion-tracking-figures/tabs4.png
    caption: "Table S4: Domain randomization parameters applied during training. 𝒰 [ · ] : uniform distribution."
    page: 33
    bbox_norm: [0.1712, 0.3703, 0.8288, 0.5889]
    strategy: table-region
    curated: false
---

## 요약 (Summary)

NVIDIA GEAR가 27명을 붙여 만든 humanoid 전신 제어 foundation model. 논문의 출발 질문은 "humanoid 제어는 왜 스케일링되지 않았나"이고, 답은 모델도 compute도 아니라 학습 과제였다고 말한다. locomotion처럼 시나리오마다 reward를 새로 짜야 하는 과제로는 앞으로 걷기에서 얻은 신호가 춤이나 기상 동작에 쓰이지 않는다. 그래서 저자들은 mocap 프레임마다 목표 포즈가 주어지는 motion tracking을 기본 과제로 삼았다.

규모는 파라미터 1.2M→42M, 모션 100M+ 프레임(611시간), 21,000 GPU hours(128 GPU × 7일)다. 여기에 두 겹의 응용층을 올렸다. 실시간 kinematic planner가 사용자 의도를 짧은 참조 모션으로 바꿔 내비게이션·게임패드 제어를 받아낸다. robot·human·hybrid 세 입력을 FSQ로 양자화한 universal token space는 VR teleoperation과 VLA 추론을 같은 정책에 밀어넣는다. 이 token을 행동 공간으로 쓴 GR00T N1.5가 페달을 밟아 쓰레기통을 열고 캔을 버리는 전신 loco-manipulation을 자율로 해낸다.

![[assets/luo-2025-sonic-supersizing-motion-tracking/fig01.png]]
*Figure 1: 하나의 정책이 다루는 입력·인터페이스 전경 — 영상 teleoperation, VR 전신/키포인트, kinematic planner, 텍스트·음악 제어, VLA 자율 실행 (Luo 2025, p.2)*

## 주요 기여 (Key Contributions)

기여는 세 갈래다. 우선 motion tracking이 데이터·모델·compute 세 축 모두에서 우호적인 스케일링 곡선을 그린다는 것을 21,000 GPU hours·100M 프레임 규모로 실측했다. 여기에 실시간 kinematic motion planner를 붙여 트래커를 목표지향 과제로 연결했다. 마지막이 세 입력 포맷을 하나의 quantized latent로 모으는 universal token space다. 같은 정책이 VR teleoperation과 VLA 추론을 동시에 받게 만든 설계로, 손과 발을 함께 써야 하는 동작까지 VLA가 자율로 수행한다.

motion tracking이 스케일링되는 이유를 저자들은 supervision의 밀도로 설명한다. 프레임마다 명시적 목표 포즈가 있으니 데이터가 커져도 학습 신호가 묽어지지 않는다. AMP·ASE 같은 adversarial imitation은 반대다. 다양성이 커질수록 discriminator의 판별 과제가 어려워지고 피드백이 부실해져 mode collapse로 간다.

## 방법론 및 아키텍처 (Methodology and Architecture)

### 데이터

원본 mocap 약 700시간을 GMR과 PyRoki로 Unitree G1에 retarget한 뒤 계단 오르기나 착석처럼 로봇이 실행할 수 없는 동작을 걸러 611시간(50Hz 기준 100M+ 프레임, 317,189 클립)을 남겼다. 상위 33개 카테고리 아래 8,447개 sub-category가 들어 있다.

평가 분할이 이 논문의 신뢰도를 받친다. test-content(6,998 클립, 15시간)는 학습에 전혀 없던 182개 sub-category만 모아 새로운 동작 내용의 일반화를 잰다. test-repetition(6,306 클립, 12시간)은 sub-category는 100% 겹치되 클립이 겹치지 않아 같은 동작의 다른 수행에 대한 강건성을 본다. 외부 벤치마크로는 다른 retargeting 파이프라인에서 나온 PHUMA를 쓴다.

학습 데이터의 상당 부분이 BONES-SEED로 공개됐다. 522명 배우, 142,220 시퀀스, 약 288시간이다.

### universal control policy

![[assets/luo-2025-sonic-supersizing-motion-tracking/fig07.png]]
*Figure 7: SONIC 아키텍처 — robot/hybrid/human 3개 encoder → quantizer → universal token → robot control decoder + robot motion decoder (Luo 2025, p.14)*

PPO로 학습하고 Isaac Lab에서 돌린다. 상태는 proprioception 10스텝 히스토리와 motion command로, 전부 로봇 로컬 프레임에 6D 회전 표현을 쓴다. 행동은 관절 목표 위치이고 PD 제어기가 추종한다.

구조의 핵심은 세 encoder를 하나의 latent로 모으는 것이다. robot motion encoder는 미래 프레임의 관절 위치·속도를, human motion encoder는 SMPL 3D 관절 위치를, hybrid encoder는 상체 sparse keypoint(머리·양손)와 하체 로봇 모션을 받는다. 마지막 것이 VR 3-point teleoperation에 대응한다. 세 출력은 Finite Scalar Quantization으로 양자화되어 universal token이 된다. 토큰 2개, 기본 설정 FSQ-32-32이고 VLA 쪽에는 64차원으로 노출된다. VQ-VAE 대신 FSQ를 쓴 이유는 codebook collapse가 없다는 점이다 — 8,447개 sub-category라는 다양성에서 codebook 미사용 구간은 실제 위험이다.

디코더는 둘이다. robot control decoder가 토큰과 proprioception으로 모터 명령을 낸다. robot motion decoder는 토큰만 받아 로봇 모션을 복원해 보조 감독을 준다. 입력이 human motion일 때 이 복원 손실이 사실상 human→robot retargeting loss로 작동한다. 런타임에 명시적 retargeting을 생략할 수 있는 근거가 여기다.

손실은 PPO 손실에 복원 손실, 세 encoder 쌍의 토큰 정렬 손실, human→robot→재인코딩의 cycle 일관성 손실을 더한 네 항이다. critic만 특권 시뮬레이션 정보를 보는 asymmetric actor-critic으로 함께 최적화한다.

### kinematic planner

![[assets/luo-2025-sonic-supersizing-motion-tracking/fig03.png]]
*Figure 3: kinematic planner의 인터랙티브 제어 — 속도·방향·스타일 전환 내비게이션, 임의 높이의 스쿼트·무릎보행·기어가기, 반응형 복싱 (Luo 2025, p.7)*

planner는 계획을 autoregressive motion in-betweening으로 푼다. 0.8~2.4초 구간의 양 끝 keyframe을 context와 target으로 두고 latent 토큰열에서 masked token prediction으로 confidence 높은 토큰부터 확정해 나간다. root 궤적은 critically damped spring model이 만드는데, 저자들은 planner가 이 모델 없이도 대체로 동작한다고 하면서도 6.0m/s에서 −6.0m/s로 급반전하는 비현실적 명령을 걸러주는 안전장치로서의 값은 인정한다.

효율이 눈에 띈다. 스킬 하나당 대표 클립 한 개만으로 25개 이상의 스킬·스타일을 재학습 없이 다룬다.

### 배포

추론은 전부 Jetson Orin 온보드에서 TensorRT와 CUDA Graph로 돌아간다. 정책 forward 1–2ms, 모션 생성 약 12ms다. 정책 추론 50Hz, 명령 스트리밍 500Hz, 조작자 입력 100Hz, kinematic planning 10Hz의 네 루프가 동시에 돈다. 활성 encoder만 바꾸면 키보드·게임패드·VR·네트워크 스트림을 재학습 없이 갈아탄다.

## 결과 (Results)

![[assets/luo-2025-sonic-supersizing-motion-tracking/fig02.png]]
*Figure 2: 12패널 종합 결과 — (a-c) 데이터·모델·compute 3축 스케일링, (d-g) 트래커 베이스라인 비교, (h-j) OpenHomie 속도추종 비교, (k-l) sim2real 전이 (Luo 2025, p.4)*

세 축 모두에서 단조 개선이 나온다. 가장 큰 설정이 test-content에서 성공률 99.6%·MPJPE-L 23.8mm이고 가장 작은 1.2M이 98.0%·27.7mm다. 개선폭은 OOD인 test-content에서 더 크게 벌어져 스케일이 일반화에 기여한다는 해석을 지지한다.

specialist와의 대조가 가장 날카로운 결과다. 속도 추종에 특화된 OpenHomie의 생존율이 43.0%인데 범용 트래커 SONIC이 98.5%다. OpenHomie는 8 GPU를 넘으면 성능이 정체하는 반면 SONIC은 compute를 더 넣을수록 계속 개선된다. 베이스라인 비교(GMT·Any2Track·BeyondMimic, MuJoCo)에서는 SONIC이 98.7%를 얻는다. 다만 학습 데이터와 retargeting이 통일되지 않았으므로 저자들 스스로 이를 데이터 정합 벤치마크가 아닌 cross-dataset 일반화의 증거로 읽으라고 못 박는다.

sim2real은 123개 모션 시퀀스로 검증했고 성공률이 100.0%에서 99.2%로 거의 유지된다. MPJPE-L은 전체 22.3→25.7mm, 상체 21.8→22.2mm, 하체 24.8→32.1mm, 발 29.0→53.7mm다. 발에서만 격차가 두 배 가까이 벌어진다.

### VLA loco-manipulation

![[assets/luo-2025-sonic-supersizing-motion-tracking/fig05.png]]
*Figure 5 + Table 1: VLA 주도 loco-manipulation 5개 과제의 시간축 롤아웃과 성공률 (Luo 2025, p.10)*

| 과제 | 인터페이스 | 학습 데이터 | 시행 | 성공률 |
|---|---|---|---|---|
| Apple to plate | 3-point | 300 traj | 20 | 90% |
| Object pickup (carrot) | whole-body | 3,900 traj | 20 | 75% |
| Object pickup (scrub) | whole-body | 3,900 traj | 20 | 95% |
| Open trash can (foot) | whole-body | 200 traj | 10 | 70% |
| Soda can to trash can | whole-body | 1,000 traj | 10 | 60% |
| Drill and box relocation | whole-body | 300 traj | 10 | 70% |
| 5개 과제 평균 | | | | 75% |

가장 어려운 soda can 과제는 다섯 스킬의 연쇄다. 테이블로 걸어가 한 손으로 캔을 들고, 쓰레기통으로 이동해 한 발로 페달을 밟아 뚜껑을 열면서 다른 발로 균형을 잡고, 캔을 던져 넣는다. 상체 제어와 locomotion을 분리하는 행동 공간에서는 만들기 어려운 동작이다.

### 행동 공간이 만든 차이

ablation 중 가장 큰 폭이 여기서 나온다. VLA가 FSQ 토큰을 예측할 때와 SMPL 전신 포즈를 직접 예측할 때(81차원)를 견주면 평균 68% 대 27%다. 과제가 복잡할수록 격차가 커져 soda can 과제에서는 60% 대 0%가 된다. 고차원 연속 포즈 공간에서는 작은 예측 오차가 큰 추종 실패로 증폭된다는 게 저자들의 설명이다. quantizer 선택도 같은 방향으로 지지된다. FSQ가 VQ-VAE를 test-content MPJPE-L에서 8.7mm 앞선다(26.6mm 대 35.3mm).

encoder 셋은 모두 99.2% 이상을 유지하며 입력 포맷이 다른 human encoder의 격차가 0.6mm에 그친다. consistency loss를 빼면 encoder 간 발산이 8배로 커진다(평균 L2 0.57→4.23). VLA가 토큰을 직접 예측하는 구조이므로 이 정렬은 서로 다른 인터페이스로 모은 데이터가 같은 latent 공간에 놓이게 하는 전제 조건이다.

## 한계 (Limitations)

저자들이 명시한 한계는 장기 운용에 필요한 안전성과 에너지 효율을 형식적으로 다루지 않았다는 점이다. 트래커는 domain randomization과 spring model 필터링으로 planner 출력의 노이즈를 견디지만, 더 극한 조건이나 매우 동적인 동작에서는 균형을 잃을 수 있다.

베이스라인 비교의 해석 범위도 논문 스스로 좁혀 뒀다. 학습 데이터와 retargeting이 통일되지 않았으므로 데이터 정합 벤치마크로 읽으면 안 된다.

## 관련 페이지 (Related Pages)

- [[physical-ai/nvlabs-gr00t-wholebodycontrol]] — 이 논문의 공식 구현. 학습 코드·C++ 배포 스택·G1 체크포인트 2종이 들어 있어 여기 적은 방법론을 실행 가능한 형태로 확인할 수 있다
- [[physical-ai/nvlabs-2026-gear-sonic-project-page]] — 프로젝트 페이지. MPJPE 수치로는 판단하기 어려운 동작의 질을 영상으로 남긴 곳
- [[physical-ai/hou-2026-world-model-for-robot-learning]] — robot learning 서베이. SONIC은 world model 없이 dense mocap supervision으로 가는 경로라서, 서베이가 정리한 "행동에 인과적으로 정렬된 미래 예측" 계열과 대비해 읽으면 두 접근의 분기점이 보인다
- [[overviews/physical-ai-overview]] — physical-ai 카테고리의 분류 기준과 학습 경로 허브
