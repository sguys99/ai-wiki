---
title: "Current as Touch: Proprioceptive Contact Feedback for Compliant Dexterous Manipulation"
type: paper
year: 2026
category: physical-ai
raw_path: raw/papers/ma-2026-current-as-touch-proprioceptive-contact.pdf
raw_filename: "ma-2026-current-as-touch-proprioceptive-contact.pdf"
source_collection: external
authors: "Chenyang Ma, Yunchao Yao, Zhenyu Wei (공동 1저자), Ruogu Li, Daniel Szafir, Mingyu Ding (공동 지도)"
arxiv_id: "2607.03529"
url: "https://arxiv.org/abs/2607.03529"
tags: [physical-ai, manipulation, robot-learning, teleoperation, hardware]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/ma-2026-current-as-touch-proprioceptive-contact/fig01.png
    raw: raw/papers/ma-2026-current-as-touch-proprioceptive-contact-figures/fig01.png
    caption: "네 가지 contact-rich 과제 사진. 왼쪽 두 장은 teleoperation으로 종이컵을 쌓고 화이트보드를 닦는 장면이고, 오른쪽 두 장은 policy가 카드 한 장을 뽑고 물이 부어지는 병을 잡고 있는 장면이다. 하단에 각 과제가 요구하는 접촉 성질(부드러운 접촉, 안정적 압력, 정밀 접촉, 하중 적응)이 적혀 있으며, 모두 외부 촉각 센서 없이 모터 전류와 관절 상태만 쓴다"
    page: 1
    bbox_norm: [0.1667, 0.2412, 0.8333, 0.4726]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/ma-2026-current-as-touch-proprioceptive-contact/fig02.png
    raw: raw/papers/ma-2026-current-as-touch-proprioceptive-contact-figures/fig02.png
    caption: "동기 도식 세 칸. 왼쪽은 잘못된 목표 위치가 PD 제어기를 거쳐 과도한 토크를 내고 컵을 찌그러뜨리는 rigid position control, 가운데는 관절 토크와 모터 전류가 비례한다는 관찰에서 모터 전류를 촉각 대용 신호로 쓰는 발상, 오른쪽은 모터 전류로 compliance reference position을 예측해 같은 PD 제어기가 compliant한 토크를 내도록 만드는 제안 방식이다"
    page: 2
    bbox_norm: [0.1667, 0.3642, 0.8333, 0.6073]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/ma-2026-current-as-touch-proprioceptive-contact/fig03.png
    raw: raw/papers/ma-2026-current-as-touch-proprioceptive-contact-figures/fig03.png
    caption: "모터 전류와 접촉력의 관계 측정. Unitree G1에 달린 Dex3와 Franka에 달린 LEAP Hand가 각각 SRI 힘/토크 센서를 누르는 사진 사이에, 전류와 관절 위치로 접촉력을 회귀한 산점도가 양쪽에 있다. 결정계수 R²는 Dex3 0.99, LEAP Hand 0.95다"
    page: 3
    bbox_norm: [0.1667, 0.0833, 0.8333, 0.2304]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/ma-2026-current-as-touch-proprioceptive-contact/fig04.png
    raw: raw/papers/ma-2026-current-as-touch-proprioceptive-contact-figures/fig04.png
    caption: "teleoperation 데이터 manifold. 왼쪽은 여러 관절의 위치 trajectory를 approach, hold, leave, release 구간으로 나눈 3차원 그래프이고, 오른쪽은 joint 4의 측정 위치와 목표 위치와 전류를 한 시간축에 겹친 그래프다. 명령 기울기가 grasping과 release 의도를, 관절 이동 대비 전류 변화 ΔI/Δq가 접촉 강성을 알려준다"
    page: 5
    bbox_norm: [0.1905, 0.0833, 0.8054, 0.2216]
    strategy: caption-region
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/ma-2026-current-as-touch-proprioceptive-contact/fig05.png
    raw: raw/papers/ma-2026-current-as-touch-proprioceptive-contact-figures/fig05.png
    caption: "전류 조건부 예측 파이프라인. observation(policy 모드)이나 user intention(teleop 모드)과 proprioception과 joint current가 인코더에 들어가 latent z가 되고, Transformer가 predicted action을 낸다. 학습 시에만 action 인코더가 action style을 만들고 KL 항이 붙으며, joint current decoder가 smoothed joint current를 맞추는 보조 손실을 계산한다"
    page: 6
    bbox_norm: [0.1828, 0.0833, 0.8172, 0.3273]
    strategy: caption-region
    curated: true
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/ma-2026-current-as-touch-proprioceptive-contact/fig06.png
    raw: raw/papers/ma-2026-current-as-touch-proprioceptive-contact-figures/fig06.png
    caption: "teleoperation 학습과 평가에 쓴 물체 10종을 LEAP Hand가 쥔 사진. 종이컵, 장난감 축구공, 포도, 사과, 반창고 상자, 줄자, 장난감 야구공, 세척병, 분무기, 페트병 순서로 강성이 다양하다"
    page: 7
    bbox_norm: [0.1602, 0.3594, 0.8398, 0.4416]
    strategy: manual
    curated: true
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/ma-2026-current-as-touch-proprioceptive-contact/fig07.png
    raw: raw/papers/ma-2026-current-as-touch-proprioceptive-contact-figures/fig07.png
    caption: "네 과제의 정성 비교. (a) 컵 쌓기와 (b) 화이트보드 닦기는 teleoperation, (c) 카드 한 장 뽑기와 (d) 물 붓는 동안 병 들기는 policy 과제다. 각 칸의 가운데는 전류 없이 컵이 찌그러지거나 지우개가 떨어지거나 카드 두 장이 뽑히거나 병이 떨어지는 실패 장면이고, 오른쪽은 전류 조건부 예측이 성공한 장면이다"
    page: 8
    bbox_norm: [0.1699, 0.0847, 0.8299, 0.3321]
    strategy: caption-region
    curated: true
  - id: tab01
    label: Table 1
    kind: table
    file: assets/ma-2026-current-as-touch-proprioceptive-contact/tab01.png
    raw: raw/papers/ma-2026-current-as-touch-proprioceptive-contact-figures/tab01.png
    caption: "teleoperation 종이컵 쌓기 결과표. 초보와 숙련 조작자 각각에 대해 retargeting, 전류 없는 모델, 전류 조건부 모델의 완료 시간과 컵 변형률과 grasping 실패율을 비교한다"
    page: 7
    bbox_norm: [0.1602, 0.1114, 0.5578, 0.2126]
    strategy: manual
    curated: true
  - id: tab02
    label: Table 2
    kind: table
    file: assets/ma-2026-current-as-touch-proprioceptive-contact/tab02.png
    raw: raw/papers/ma-2026-current-as-touch-proprioceptive-contact-figures/tab02.png
    caption: "teleoperation 화이트보드 닦기 결과표. 조작자 두 명에 대해 세 방식의 성공률과 완료 시간을 비교한다"
    page: 7
    bbox_norm: [0.5549, 0.1101, 0.8333, 0.2054]
    strategy: table-region
    curated: false
  - id: tab03
    label: Table 3
    kind: table
    file: assets/ma-2026-current-as-touch-proprioceptive-contact/tab03.png
    raw: raw/papers/ma-2026-current-as-touch-proprioceptive-contact-figures/tab03.png
    caption: "동적 병 들기 결과표. 부은 물의 양 0g, 150g, 250g, 350g마다 전류 유무에 따른 안정, 미끄러짐, 낙하 비율을 비교한다"
    page: 7
    bbox_norm: [0.1602, 0.2244, 0.4848, 0.3696]
    strategy: manual
    curated: true
  - id: tab04
    label: Table 4
    kind: table
    file: assets/ma-2026-current-as-touch-proprioceptive-contact/tab04.png
    raw: raw/papers/ma-2026-current-as-touch-proprioceptive-contact-figures/tab04.png
    caption: "카드 한 장 뽑기 결과표. 정확히 한 장을 뽑는 strict 성공률과 한두 장을 허용하는 tolerant 성공률, 그리고 두 장 이상과 놓침 두 가지 실패 비율을 비교한다"
    page: 7
    bbox_norm: [0.4861, 0.2527, 0.8293, 0.3375]
    strategy: table-region
    curated: false
  - id: tab05
    label: Table 5
    kind: table
    file: assets/ma-2026-current-as-touch-proprioceptive-contact/tab05.png
    raw: raw/papers/ma-2026-current-as-touch-proprioceptive-contact-figures/tab05.png
    caption: "네 과제의 데이터셋 통계. 하드웨어 조합, 시연 데이터 수, 평균 길이와 수집 주파수를 정리한다"
    page: 10
    bbox_norm: [0.1667, 0.1968, 0.856, 0.2735]
    strategy: table-region
    curated: false
  - id: tab06
    label: Table 6
    kind: table
    file: assets/ma-2026-current-as-touch-proprioceptive-contact/tab06.png
    raw: raw/papers/ma-2026-current-as-touch-proprioceptive-contact-figures/tab06.png
    caption: "기본 모델과 학습 하이퍼파라미터 표. observation과 action 길이, AdamW 설정, Transformer 차원과 층 수, KL과 보조 전류 손실 가중치를 담는다"
    page: 12
    bbox_norm: [0.3337, 0.1064, 0.6663, 0.3699]
    strategy: table-region
    curated: false
  - id: tab07
    label: Table 7
    kind: table
    file: assets/ma-2026-current-as-touch-proprioceptive-contact/tab07.png
    raw: raw/papers/ma-2026-current-as-touch-proprioceptive-contact-figures/tab07.png
    caption: "실행 집계 프레임 수 M에 따른 동적 병 들기 ablation. M이 1에서 4로 늘 때 grasping 성공률과 0g에서 250g까지의 유지 성공률이 어떻게 달라지는지 보여준다"
    page: 13
    bbox_norm: [0.2565, 0.1477, 0.7435, 0.2448]
    strategy: table-region
    curated: false
  - id: tab08
    label: Table 8
    kind: table
    file: assets/ma-2026-current-as-touch-proprioceptive-contact/tab08.png
    raw: raw/papers/ma-2026-current-as-touch-proprioceptive-contact-figures/tab08.png
    caption: "KL 가중치에 따른 teleoperation 주먹 쥐기 성공률 표. 가중치가 0에서 1e-4로 커질수록 성공률이 100%에서 30%로 낮아진다"
    page: 14
    bbox_norm: [0.3224, 0.1202, 0.6776, 0.219]
    strategy: table-region
    curated: false
  - id: tab09
    label: Table 9
    kind: table
    file: assets/ma-2026-current-as-touch-proprioceptive-contact/tab09.png
    raw: raw/papers/ma-2026-current-as-touch-proprioceptive-contact-figures/tab09.png
    caption: "KL 가중치에 따른 병 grasping 성공률 표. 네 설정 모두 90%에서 100% 사이로 민감도가 낮다"
    page: 14
    bbox_norm: [0.3102, 0.2464, 0.6898, 0.3456]
    strategy: manual
    curated: false
---

## 한 줄 요약 (One-line Summary)

Current as Touch는 외부 촉각 센서나 힘/토크 센서 없이 모터 전류와 관절 상태만으로 접촉을 감지하고, 그 신호로 표준 PD 제어기에 보낼 compliance reference position을 예측해 저가 dexterous hand가 compliant하게 물체를 다루도록 만드는 proprioception 기반 프레임워크다. LEAP Hand와 Unitree Dex3 위에서 teleoperation 두 과제와 policy 학습 두 과제 모두 전류 없는 모델보다 안전하고 빠르며 견고한 결과를 냈다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 제목 | Current as Touch: Proprioceptive Contact Feedback for Compliant Dexterous Manipulation |
| 저자 | Chenyang Ma, Yunchao Yao, Zhenyu Wei (공동 1저자), Ruogu Li, Daniel Szafir, Mingyu Ding (공동 지도) |
| 소속 | University of North Carolina at Chapel Hill |
| arXiv | 2607.03529v1 (cs.RO, 2026년 7월 3일) |
| 프로젝트 페이지 | https://cat.chenyangma.com/ |
| 코드 | https://github.com/cublicma/current-as-touch (프로젝트 페이지에 링크) |
| 분량 | 본문 9쪽에 부록 6쪽, 참고문헌 3쪽. 그림 7개와 표 9개 |
| 키워드 | Dexterous Manipulation, Compliance, Proprioceptive Sensing |
| 하드웨어 | LEAP Hand + Franka Research 3, Unitree Dex3 + Unitree G1 |

## 2. 주요 기여 (Key Contributions)

논문이 내세우는 기여는 세 가지다.

1. **모터 전류를 학습 가능한 접촉 피드백으로 사용**. 모터 전류는 액추에이터 토크와 밀접하게 연관되므로 접촉력, 물체 저항, grasping 안정성을 알려주는 내재 신호가 된다. 논문은 이 신호를 외부 촉각 센서나 힘/토크 센서 없이 관절 상태와 함께 학습 입력으로 쓴다.
2. **compliant grasping을 compliance reference position 예측 문제로 정식화**. 외부 wrench를 추정하거나 토크를 직접 명령하는 대신, 표준 PD 제어기에 보낼 이상적인 관절 위치 목표를 예측한다. 이 목표를 추종할 때 생기는 위치 오차가 적절한 grasping 힘을 만든다. 위치 기반이므로 기존 teleoperation과 policy 학습 파이프라인의 관절 위치 명령 인터페이스와 그대로 호환된다.
3. **여러 dexterous hand와 contact-rich 과제에서 검증**. 깨지기 쉬운 물체 다루기, 지속적인 표면 접촉, 얇은 물체 집기, 동적 하중 적응 네 과제에서 teleoperation 안전성과 효율, downstream policy 견고성이 일관되게 개선됐다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 문제 배경과 동기

dexterous manipulation은 정확한 위치 추종만으로는 부족하다. 종이컵을 쌓으려면 부드러운 접촉이, 보드를 닦으려면 지속적인 압력이, 카드 한 장을 뽑으려면 얇은 물체와의 정밀한 상호작용이, 물을 붓는 동안 병을 들고 있으려면 변하는 하중에 대한 적응이 필요하다. rigid position control에서는 목표 위치가 조금만 부정확해도 과도한 힘이 생기거나 물체가 미끄러진다.

기존 해법은 촉각 센서나 힘/토크 센서를 손에 다는 것이다. 이 방식은 접촉을 직접 측정하지만 비용, 파손 위험, 캘리브레이션 부담, 통합 복잡도가 따른다. 관절 위치 명령과 저수준 PD 제어기로 움직이는 저가 dexterous hand에는 적용하기 어렵다.

논문의 관찰은 모터 구동 dexterous hand에서 접촉력이 액추에이터 토크를 통해 생기고, 그 토크가 모터 전류와 밀접하게 연관된다는 점이다. 따라서 모터 전류와 관절 상태는 접촉 저항, 힘, grasping 하중, 물체 상호작용의 변화를 반영하는 내장 proprioception 신호가 된다. proprioception은 로봇이 자기 관절의 위치와 힘 상태를 스스로 감지하는 감각을 뜻한다.

경험적 근거로 Figure 3의 측정이 있다. Unitree Dex3와 LEAP Hand에서 모터 전류와 관절 상태는 외부 힘/토크 센서로 잰 접촉력과 일관되게 함께 변한다. 전류와 위치를 입력으로 하는 단순 회귀 모델이 측정된 수직력을 Dex3에서 RMSE 10.09g, LEAP Hand에서 17.75g로 예측했고, 결정계수 R²는 각각 0.99와 0.95였다. 즉 모터 신호에는 쓸 만한 접촉 정보가 들어 있다.

다만 대부분의 teleoperation 시스템과 학습된 policy는 토크를 직접 명령하지 않고 목표 관절 위치를 내며, 저수준 PD 제어기가 이를 추종한다. 그래서 물리 상호작용을 드러내는 proprioception 피드백과 기존 로봇 학습 파이프라인의 action space 사이에 불일치가 생긴다. 이 피드백을 실제로 쓰려면 표준 PD 제어를 통해 적절한 compliant 토크를 유도하는 위치 기준으로 바꿔야 한다.

### 3.2 compliance reference position

논문은 compliance를 기준 위치 예측 문제로 정식화한다. compliance reference position(CRP)은 저수준 PD 제어기에 보내는 이상적인 관절 위치 목표로, 제어기가 이 목표를 추종할 때 생기는 위치 오차가 물체를 찌그러뜨리지 않으면서 안정적인 접촉을 유지할 만큼의 grasping 힘을 만든다.

측정 관절 위치를 q_t, 관절 속도를 q̇_t, 모델이 예측한 CRP를 q^c_ref,t라 하면 저수준 제어기는 표준 PD 법칙을 따른다.

```
τ_t = K_p (q^c_ref,t − q_t) − K_d q̇_t        (1)
```

여기서 τ_t는 저수준 제어기 토크이고 K_p와 K_d는 고정 PD 이득이다. 이 정식화는 저가 dexterous hand에 특히 적합하다. 기준이 단단하거나 깨지기 쉬운 물체 안쪽으로 너무 깊이 들어가면 PD 제어기가 과도한 토크를 내 물체를 부수고, 기준이 현재 위치에 너무 가까우면 충분한 수직력이 나오지 않아 미끄러진다. 따라서 원하는 CRP는 현재 손 상태, 접촉 조건, 물체 반응, 과제 의도에 따라 달라지며, 논문은 이를 모터 전류를 접촉 저항 피드백으로 삼아 데이터에서 직접 학습한다.

compliance는 표준 위치 제어 인터페이스를 유지하면서 명령 목표만 토크 인식 피드백으로 조정하는 적응형 위치 목표로 표현된다. 비슷한 손 자세라도 전류 반응이 다르면 다른 CRP와 다른 사용자 의도로 이어지므로, 위치 제어 manipulation의 접촉 모호성이 해소된다.

### 3.3 human-in-the-loop 시연 데이터에서 CRP 학습

CRP의 감독 신호는 사람의 teleoperation 시연 데이터(demonstration)다. 데이터 수집 중 조작자는 힘을 직접 명령하지 않는다. 대신 물체 변형, 미끄러짐, 안정적인 grasping 같은 과제 결과를 눈으로 보면서 목표 관절 위치 q_cmd를 계속 조정한다. 그 결과 기록된 명령은 임의의 open-loop 위치 목표가 아니라, 시각 피드백으로 보정되어 그 PD 토크가 실제로 compliant한 상호작용을 성공시킨 노이즈 섞인 유효 기준이 된다.

```
q^{c,*}_ref,t = q_cmd,t        (2)
```

이 라벨은 해석적 최적해가 아니라 사람의 closed-loop 보정이 만든 노이즈 섞인 과제 유효 CRP 목표다. 추론 시 모델이 사용자 명령을 그대로 복사해서는 안 되므로, q_cmd,t를 입력으로 직접 주지 않는다. 그렇게 하면 목표가 observation으로 새어 들어가 shortcut 학습을 유도한다. 대신 사용자 의도를 명령 속도로 표현한다.

```
v_intent,t = q_cmd,t − q_cmd,t−1        (3)
```

의도 속도는 사용자가 쥐려는지, 놓으려는지, 접촉을 유지하려는지와 얼마나 빠르게 움직이려는지를 담는다. 모델은 이 의도를 현재 손 상태와 모터 전류 피드백과 결합해 적절한 CRP를 예측해야 한다.

Figure 4는 이 감독에 학습 가능한 compliance 신호가 담긴 이유를 보여준다. 자유 공간 이동 중에는 위치 변화가 내부 마찰과 액추에이터 dynamics만 반영하는 작은 전류 변화만 만든다. 반면 손이 물체에 닿으면 작은 위치 변화가 큰 전류 변화를 일으킨다. 따라서 Δq와 ΔI의 국소 관계는 접촉 강성 정보를 주고, 사용자 명령 trajectory의 기울기는 grasping 또는 release 의도를 준다.

### 3.4 전류 조건부 teleoperation과 policy 학습

프레임워크는 두 실행 모드를 지원한다 (Figure 5).

| 모드 | 입력 observation | 사용자 의도 대체 | 출력 |
|---|---|---|---|
| teleoperation | 길이 T의 관절 위치 이력, 원시 모터 전류 이력, 의도 속도 이력 | 사용자 의도 속도 v_intent | 다음 CRP |
| policy 학습 | 길이 T의 관절 위치 이력, 원시 모터 전류 이력, 과제 수준 물체 또는 목표 pose g_t ∈ SE(3) | 과제 수준 perception | 다음 CRP |

teleoperation 모드에서 모델은 사람 조작자를 보조해 의도를 접촉 인식 CRP로 바꾼다.

```
o^teleop_t = {q_{t−T+1:t}, I_{t−T+1:t}, v_intent,{t−T+1:t}}        (4)
q̂^c_ref,t = f_θ(o^teleop_t)        (5)
```

I_t는 원시 모터 전류이고 f_θ는 파라미터 θ로 학습된 CRP 예측기다. 예측된 CRP가 표준 PD 제어기를 통해 손을 구동한다.

policy 학습 모드에는 온라인 사용자 명령이 없다. 대신 물체나 목표 pose 같은 과제 수준 perception을 proprioception 피드백과 함께 조건으로 준다.

```
o^policy_t = {q_{t−T+1:t}, I_{t−T+1:t}, g_t}        (6)
```

시연 데이터의 action이 다시 CRP 감독으로 쓰인다. perception이 과제 상태를, 모터 전류가 접촉 상태를 제공하므로 policy는 같은 시각 상태에서도 손이 접촉을 형성했는지, 미끄러지는지, 과부하인지, 안정적으로 쥐었는지에 따라 다른 기준 action을 낼 수 있다.

두 모드 모두 기준 예측 손실로 학습한다.

```
L_ref = ‖q̂^c_ref,t − q^{c,*}_ref,t‖²₂        (7)
```

구현은 ACT 방식 시퀀스 모델링을 따른다. 학습 중 action 인코더와 KL 정규화를 유지해 기준 action의 변동성을 포착하되, 초점은 전류 조건부 observation 인코더와 보조 전류 감독에 둔다. temporal context는 주로 observation 쪽에서 최근 전류와 이동 추세를 잡는 데 쓴다. 실제 로봇 실행 중에는 최근 두 예측에 짧은 지수 이동 평균을 적용해 하드웨어 떨림을 줄이면서 전류 변화에 대한 반응성을 유지한다.

### 3.5 원시 전류 인코딩과 평활 전류 보조 감독

모터 전류는 유용하지만 노이즈가 크다. 원시 전류에는 고주파 PWM 노이즈, 통신 스파이크, 액추에이터 외란이 섞인다. 저역 통과 필터를 먼저 적용하면 위상 지연이 생겨 갑작스러운 접촉 변화에 대한 반응이 약해진다. 그래서 논문은 지연 없는 원시 전류를 모델에 입력한다.

대신 오프라인으로 평활한 전류 Ī_t를 감독 전용으로 둔다. observation 인코더의 latent 표현 z_t에서 보조 디코더 h_φ가 전류를 예측하도록 학습한다.

```
Ī̂_t = h_φ(z_t),   L_cur = ‖Ī̂_t − Ī_t‖²₂        (8)
L = L_ref + λ_cur L_cur        (9)
```

이 보조 손실은 latent 표현이 접촉과 하중에 연관된 느리게 변하는 전류 패턴을 보존하도록 정규화한다. policy는 추론 시 여전히 원시 전류를 쓰고, 보조 분기는 학습 전용이라 배포 시 감지나 필터링 지연을 더하지 않는다.

### 3.6 구현 세부 (부록 A)

**데이터셋**. 모든 과제에서 trajectory를 80% 학습, 20% 평가로 나눈다.

| 과제 | 하드웨어 | 시연 데이터 수 | 평균 길이와 수집 주파수 |
|---|---|---|---|
| teleoperation 물체 grasping | LEAP Hand + Franka | 550 | 10.2초, 30.0Hz |
| teleoperation 화이트보드 닦기 | Dex3 + Unitree G1 | 100 | 8.8초, 28.6Hz |
| 동적 병 들기 | LEAP Hand + Franka | 100 | 14.9초, 30.0Hz |
| 카드 한 장 뽑기 | Dex3 + Unitree G1 | 150 | 8.7초, 27.9Hz |

teleoperation 물체 grasping 데이터는 강성이 다른 물체 10종(종이컵, 장난감 축구공, 포도, 사과, 반창고 상자, 줄자, 장난감 야구공, 세척병 I, 분무기 II, 페트병)마다 50개씩과 공중 자유 공간 손 이동 50개로 구성된다. 자유 공간 trajectory는 물체 접촉이 아니라 내부 손 이동이 만드는 모터 전류 패턴을 모델에 보여줘 접촉 유발 전류와 구동 전류를 구분하게 돕는다. 동적 병 들기 시연 데이터 100개는 빈 병을 쥔 뒤 250g의 물을 붓는 과정을 담고, 카드 뽑기 시연 데이터 150개는 초기 자세에서 카드 한 장을 뽑는 과정을 담는다.

**전처리**. 각 시연 데이터는 HDF5 trajectory로 저장한다. 손의 측정 관절 위치 q_t, 목표 관절 위치 q^cmd_t, 원시 모터 전류 I_t를 기록하고, 팔이 있으면 팔 관절 위치와 팔 목표 위치도 기록한다. 첫 프레임의 의도 속도는 0이다.

라벨과 분석용 전류 평활은 관절별 전류 trace에 1차원 중앙값 필터(창 k_m = 5)를 먼저 적용한 뒤 균일 이동 평균(창 k_u = 5)을 적용하며, 경계는 최근접 값으로 채운다. 중앙값 필터가 고립된 통신 스파이크와 PWM 스파이크를 억제하고, 이동 평균이 보조 전류 손실에 쓰는 느린 하중 의존 추세를 보존한다.

chunk 구성은 유효한 시간 인덱스 t마다 길이 H = 10의 observation 창과 길이 K = 10의 action chunk를 만든다. trajectory 시작에서 부족한 이력 프레임은 첫 프레임을 반복해 채운다. 카드 뽑기 실험에서는 VICON 모션 캡처로 로봇 베이스 기준 카드 덱 pose를 측정하고, 병 들기 실험에서는 붓는 데 쓰는 컵을 고정 위치에 두고 미리 계산한 SE(3) pose를 policy에 준다. Dex3/G1 카드 policy 전처리에서 팔과 물체 pose는 위치와 회전 표현으로 나타내며 기본은 6D 회전 표현이다.

action 라벨은 조작자가 전류 조건부로 보정한 시연 목표 위치 a_t = q^cmd_t이고, 손 관절 기준과 embodiment에 따라 팔 관절 기준 또는 팔 말단 pose 기준을 포함한다. 팔 상태 입력으로 SE(3) end-effector pose와 팔 관절 위치를 모두 평가했는데, 팔 관절 위치가 teleoperation action을 더 매끄럽고 잘 추종했고 policy 학습 과제에서는 둘 사이에 일관된 차이가 없었다.

observation 길이는 8, 10, 12, 16프레임을 시험했으나 유의한 성능 차이가 없어 H = 10을 기본값으로 쓴다. action 길이는 K = 10으로 고정한다.

policy 학습 데이터에는 작은 이동 필터링을 적용한다. 거의 정지한 구간은 비슷한 observation에 여러 미래 기준이 대응해 의도한 미래 이동이 모호해지므로, action chunk의 최대 목표 변위가 임계값 ε_move를 넘는 경우만 남긴다. 이 필터는 카드 뽑기 같은 policy 데이터셋에 적용하고 teleoperation 보조 데이터셋에는 적용하지 않는다.

observation, action, grasping 의도, 보조 전류 라벨 텐서는 학습 분할 통계로 min-max 정규화해 [−1, 1] 범위로 만든다. 범위가 10⁻⁶보다 작은 차원은 0으로 나누는 것을 막기 위해 단위 범위를 준다. 정규화 통계는 체크포인트와 함께 저장해 평가에 그대로 쓴다.

**모델 구조**. CRP 예측기는 ACT 방식 시퀀스 모델로, proprioception observation 인코더, 학습 전용 action 방식 인코더, 미래 action chunk에 대한 Transformer 디코더로 구성된다.

| 구성 요소 | 구현 |
|---|---|
| observation 인코더 | 이력을 채널 우선 형태로 바꿔 1차원 합성곱 블록 3개(ReLU), 시간 풀링, layer normalization이 붙은 투영을 통과시킨다. 특징 차원 64 |
| action 인코더와 latent style | 학습 시 미래 action chunk와 observation 특징을 함께 인코딩해 가우시안 latent style (μ_t, log σ²_t)을 만들고 reparameterization 기법으로 샘플링한다. 추론 시에는 미래 action이 없으므로 style latent를 0으로 둔다 |
| action chunk 디코더 | observation 특징과 style latent를 모델 차원 128로 투영하고 K = 10개 미래 action 토큰의 학습된 위치 임베딩에 더한 뒤, 4층 4헤드 Transformer 인코더가 미래 CRP chunk를 예측한다. dropout 0.1 |
| 보조 전류 헤드 | 가벼운 MLP가 observation 특징 z_t에서 평활 전류 Ī_t를 예측한다. 학습 전용이며 배포 시 제어 루프에서 제거된다 |

| 하이퍼파라미터 | 값 |
|---|---|
| observation 길이 H | 10프레임 |
| action 길이 K | 10프레임 |
| 옵티마이저 | AdamW |
| 학습률 | 1e-4 |
| 배치 크기 | 32 |
| epoch | 300 |
| observation 특징 차원 | 64 |
| Transformer 모델 차원 | 128 |
| Transformer 층 수 | 4 |
| attention 헤드 수 | 4 |
| dropout | 0.1 |
| KL 가중치 λ_KL | 1e-5 |
| 보조 전류 가중치 λ_cur | 0.1 |
| KL annealing 길이 | 100 epoch |
| 체크포인트 간격 | 2 epoch |
| 평가 간격 | 1 epoch |

**학습 목표와 스케줄**. 주 action 손실은 예측 action chunk와 시연 CRP chunk 사이의 평균 제곱 오차다. ACT 방식 latent는 인코딩된 사후 분포와 단위 가우시안 사전 분포 사이의 KL 발산으로 정규화한다. 총 손실은 L = L_ref + λ_KL(e) L_KL + λ_cur L_cur이고, KL 가중치는 λ_KL(e) = λ^max_KL × min(1, (e+1)/E_anneal)로 선형 annealing한다(기본 λ^max_KL = 1e-5, E_anneal = 100 epoch). 이 스케줄은 학습 초기에 latent가 과도하게 정규화되는 것을 막으면서 후반에는 통제되지 않는 action 방식 변동을 억제한다.

**action chunking과 실행 집계**. 모델은 제어 스텝마다 10프레임 시퀀스를 예측하므로 같은 시간 인덱스에 여러 최근 예측이 후보 CRP를 제공한다. 최근 M개 후보를 지수 평균으로 집계한다.

```
q^exec_t = Σ_{m=0}^{M−1} α^m q̂^{(t−m)}_t / Σ_{m=0}^{M−1} α^m        (27)
```

q̂^{(t−m)}_t는 m 제어 스텝 전에 예측한 시각 t의 CRP다. 집계 창은 하드웨어 실행에 충분히 매끄러우면서 접촉이 만드는 갑작스러운 전류 변화에 반응할 만큼 짧게 둔다.

### 3.7 모터 전류, 관절 토크, 접촉력의 물리 관계 (부록 C)

모터 전류는 액추에이터 토크와 연관되지만 측정 전류가 순수한 접촉력 신호는 아니다. 부록 C는 측정에 등장하는 물리 항을 명시하고 전류를 접촉력으로 해석적으로 변환하는 대신 CRP를 직접 학습하는 이유를 설명한다.

전동 관절 j의 전자기 토크는 τ^em_j,t = k_τ,j (I_j,t − I⁰_j)로 근사되며, k_τ,j는 모터 토크 상수이고 I⁰_j는 전자 장치, 캘리브레이션 편향, 정적 예압이 만드는 전류 오프셋이다. 관절에서 쓸 수 있는 토크는 전달 효율과 내부 손실의 영향을 받는다.

```
τ^joint_j,t = η_j r_j τ^em_j,t − τ^fric_j,t − τ^dyn_j,t − τ^bias_j,t + ε^τ_j,t        (29)
```

| 항 | 뜻 |
|---|---|
| r_j, η_j | 전달비와 전달 효율 |
| τ^fric | Coulomb 마찰과 점성 마찰(b_j q̇ + c_j sgn(q̇))에 저속 Stribeck 효과를 더한 항 |
| τ^dyn | 관성, Coriolis, 모터 역기전력(back-EMF) 효과 |
| τ^bias | 중력, 케이블 장력, 텐던 예압, 기어 백래시(backlash), 모델링되지 않은 탄성 요소. 최근 이동 이력 h_t에 의존하는 항으로 표현된다 |
| ε^τ | 확률적 측정과 구동 노이즈 |

이 항들은 저가 dexterous hand에서 정확히 식별하기 어렵고 온도, 마모, 케이블 배선에 따라 표류한다. 손의 운동학과 접촉 위치를 정확히 안다면 접촉 wrench f_t는 접촉 Jacobian을 통해 관절 토크와 τ^contact_t = J_c(q_t)ᵀ f_t로 연결되지만, dexterous hand에서 이 역문제는 조건이 나쁘다. 접촉 위치를 모를 수 있고, 여러 손가락이 동시에 닿으며, 물체 compliance가 국소 법선 방향을 바꾸고, 미끄러짐이나 구름이 유효 Jacobian을 바꾼다.

따라서 측정 전류는 유용한 접촉 정보와 방해 효과의 혼합이다.

```
I_t = Φ_contact(q_t, q̇_t, f_t) + Φ_internal(q_t, q̇_t, h_t) + ε^I_t        (33)
```

첫 항이 활용하려는 접촉 의존 부분이고, 둘째 항은 내부 마찰, 모터 dynamics, 케이블 효과, 백래시, 중력, 열 표류를 담으며, 셋째 항은 무작위 센서 노이즈, 양자화, 통신 스파이크, 모델링되지 않은 외란이다.

이 분해는 데이터에서 무엇을 배울 수 있고 없는지도 밝힌다. 관절별 전류 오프셋, 전달 효율, 전형적인 케이블 마찰, 비슷한 이동 이력 아래의 백래시 패턴처럼 해석적으로는 몰라도 고정된 로봇에서 반복되는 효과는 충분히 다양한 데이터셋으로 학습된 매핑에 흡수된다. 반면 고립된 통신 스파이크, 양자화 노이즈, 반복되지 않는 충격 같은 진짜 무작위 항은 observation 이력에서 결정론적으로 예측할 수 없고, temporal context, 보조 라벨용 평활, 견고한 학습 데이터, 보수적인 실행 평균으로 통계적으로만 완화된다. 즉 전류는 접촉과 상관된 유용한 정보를 주지만 노이즈 없는 촉각 힘 센서는 아니다.

CRP를 직접 학습하는 매핑 q̂^c_ref,t = f_θ(q_{t−H+1:t}, I_{t−H+1:t}, u_t)는 전류에서 힘으로의 캘리브레이션된 변환을 요구하지 않는다. u_t는 teleoperation에서는 사용자 의도, policy 학습에서는 과제 수준 perception이다. 학습된 매핑은 접촉 중 모터 부하 증가 같은 반복 가능한 전류 성분을 활용하고 성공적인 CRP를 예측하지 못하는 방해 항은 무시하거나 평균화한다. 이 위치 기준 정식화는 흔한 dexterous hand의 명령 인터페이스와 맞고, 명시적 wrench 추정기나 접촉 Jacobian 역산이나 토크 제어 인터페이스에 의존하지 않는다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 실험 설정

네 가지 contact-rich 과제를 평가한다. teleoperation 과제는 종이컵 쌓기와 화이트보드 닦기, policy 학습 과제는 카드 한 장 뽑기와 동적 병 들기다. 하드웨어는 Franka Research 3에 단 LEAP Hand와 Unitree G1에 단 Dex3이며, 로봇 상태는 손 관절과 팔 end-effector pose를 포함한다.

teleoperation 비교 조건은 세 가지다.

| 조건 | 내용 |
|---|---|
| Retargeting | retargeting된 조작자 명령을 그대로 실행한다 |
| w/o Current | 같은 CRP 예측기를 전류 입력 없이 학습한 모델 |
| w/ Current | 원시 전류를 쓰는 전체 모델 |

시연 데이터는 평가 사용자와 다른 조작자가 수집해, 한 사람의 보정 방식을 암기하는 것이 아니라 전이를 시험한다. policy 학습의 베이스라인은 로봇 상태와 물체 pose를 쓰는 ACT 방식 behavioral cloning이고, 제안 방법은 여기에 모터 전류를 더한다. 실행 중에는 첫 두 예측 CRP를 평균해 떨림을 줄이면서 반응성을 유지한다.

### 4.2 teleoperation 과제

**종이컵 쌓기**. 조작자가 LEAP Hand와 Franka 팔을 조종해 종이컵 네 개를 쌓는다. 학습 데이터는 강성이 다른 물체 10종의 grasping 시연 데이터 각 50개와 자유 공간 손 이동 50개를 합친 550개 trajectory다. 초보 사용자 한 명과 10분 연습한 사용자 한 명이 각각 15회 시도했다.

| 조작자 | 방법 | 시간(초) ↓ | 변형(%) ↓ | grasping 실패(%) ↓ |
|---|---|---|---|---|
| 초보 | Retargeting | 21.9 | 43.3 | 13.3 |
| 초보 | w/o Current | 31.1 | 15.0 | 76.7 |
| 초보 | w/ Current | 16.8 | 0.0 | 6.7 |
| 숙련 | Retargeting | 20.7 | 25.0 | 15.0 |
| 숙련 | w/o Current | 35.3 | 16.7 | 71.7 |
| 숙련 | w/ Current | 16.1 | 0.0 | 3.3 |

전류 조건부 모델은 두 사용자 모두에서 컵 변형을 0%로 없애고 완료 시간을 가장 짧게 만들었다. 전류 없는 모델은 변형은 줄였지만 grasping 실패가 70% 이상으로 크게 늘어 직접 teleoperation보다 나아지지 않았다. 지속적인 접촉에는 평균적인 이동 사전 지식이 아니라 접촉력 조절이 필요하기 때문이다.

**화이트보드 닦기**. 조작자가 Dex3가 달린 G1을 조종해 기울어진 화이트보드에 지우개를 누르고 닦아낸다. 시연 데이터 100개로 학습하고 같은 두 사용자가 15회씩 평가했다.

| 조작자 | 방법 | 성공(%) ↑ | 시간(초) ↓ |
|---|---|---|---|
| 초보 | Retargeting | 40.0 | 9.3 |
| 초보 | w/o Current | 46.7 | 9.3 |
| 초보 | w/ Current | 100.0 | 6.9 |
| 숙련 | Retargeting | 100.0 | 7.1 |
| 숙련 | w/o Current | 60.0 | 8.3 |
| 숙련 | w/ Current | 100.0 | 6.5 |

제안 방법은 두 사용자 모두 100% 성공하고 완료 시간을 줄였다. 전류 없는 모델은 특히 연습한 사용자에서 직접 teleoperation보다 나빠졌는데, 지속적인 닦기는 변하는 표면 상호작용에 맞서 접촉력을 유지해야지 평균 이동 사전 지식을 따르는 것으로는 부족하기 때문이다. 전류 피드백은 지우개가 보드에 제대로 눌려 있는지 감지하게 해 CRP가 적은 수동 보정으로 접촉을 유지하도록 돕는다.

### 4.3 policy 학습 과제

**동적 병 들기**. Franka에 단 LEAP Hand가 병을 쥐고 있는 동안 물이 부어진다. 시연 데이터 100개는 약 250g을 거의 일정한 속도로 붓는다. 평가에서는 무작위 속도로 물을 붓고 0g, 150g, 250g, 350g에서 판정하며, 350g은 학습 분포 밖이다. 하중당 12회 시도했다.

| 물 | 방법 | 안정(%) | 미끄러짐(%) | 낙하(%) |
|---|---|---|---|---|
| 0g | w/o Current | 100.0 | 0.0 | 0.0 |
| 0g | w/ Current | 100.0 | 0.0 | 0.0 |
| 150g | w/o Current | 58.3 | 41.7 | 0.0 |
| 150g | w/ Current | 83.3 | 16.7 | 0.0 |
| 250g | w/o Current | 16.7 | 58.3 | 25.0 |
| 250g | w/ Current | 100.0 | 0.0 | 0.0 |
| 350g | w/o Current | 0.0 | 0.0 | 100.0 |
| 350g | w/ Current | 41.7 | 58.3 | 0.0 |

하중 적응이 거의 필요 없는 0g에서는 두 방법 모두 안정적이다. 병이 무거워질수록 베이스라인은 빠르게 실패하지만 제안 방법은 250g에서 100% 안정을 유지한다. 학습 분포 밖인 350g에서도 일부 미끄러짐은 있으나 낙하는 전혀 없다. 이 과제는 proprioception 전류 피드백의 미묘한 장점을 보여준다. 손가락 굽힘 전류는 주로 수직 하중이 아니라 그립 폐쇄를 반영하지만, LEAP Hand는 손가락 밑동마다 abduction/adduction 모터(손가락을 옆으로 벌리고 모으는 관절)가 있어 측면 grasping 중 병 무게가 늘면 이 관절의 저항과 전류가 올라가 암묵적 하중 신호를 준다.

**카드 한 장 뽑기**. Dex3가 달린 G1이 카드 덱에서 정확히 한 장을 뽑아야 한다. 시연 데이터 150개로 학습하고 학습과 추론 모두 VICON의 카드 SE(3) pose를 쓰며 52회 평가했다.

| 방법 | strict 성공(%) | tolerant 성공(%) | 두 장 이상(%) | 놓침(%) |
|---|---|---|---|---|
| w/o Current | 55.8 | 65.4 | 7.7 | 26.9 |
| w/ Current | 76.9 | 90.4 | 0.0 | 9.6 |

strict 성공은 정확히 한 장, tolerant 성공은 한두 장을 허용한다. 모터 전류는 strict 성공을 55.8%에서 76.9%로, tolerant 성공을 65.4%에서 90.4%로 올렸고 두 장 이상 뽑는 실패를 7.7%에서 0%로 없앴다. 전류는 충분한 접촉과 과도한 수직력을 구분하게 돕는다. 전류가 없으면 policy는 위치와 물체 pose만으로 접촉을 추론하지만, 전류가 있으면 접촉 형성의 proprioception 증거를 받아 CRP를 더 정밀하게 조절한다.

### 4.4 실행 집계 ablation (부록 A.5)

동적 병 들기에서 집계 프레임 수 M을 바꿔 10회씩 평가했다. grasping 성공은 빈 병을 처음에 안정적으로 쥐는지, 유지 성공은 쥔 뒤 0g에서 250g까지 병을 놓치지 않는지를 잰다.

| 집계 프레임 M | grasping 성공 | 유지 성공(0g에서 250g) |
|---|---|---|
| 1 | 40% | 90% |
| 2 | 70% | 100% |
| 3 | 90% | 100% |
| 4 | 100% | 70% |

M = 1은 최신 예측만 써서 반응성은 높지만 grasping 획득 중 작은 진동이 생겨 초기 성공이 40%로 낮다. 다만 일단 쥐고 나면 전류 조건부 CRP가 90%의 붓기 시도에서 병을 유지한다. M = 2는 프레임 간 명령 떨림을 감쇠해 70%로 오르고, M = 3은 90%로 오르면서 유지 성공 100%를 지킨다. M = 4는 초기 grasping이 매우 매끄러워 100%에 이르지만 긴 평균 창이 동적 하중 변화에 대한 반응을 늦춰 유지 성공이 70%로 낮아진다. 논문은 M = 3을 가장 균형 잡힌 값으로 본다.

### 4.5 KL 가중치 ablation (부록 B)

ACT 방식 action 인코더의 KL 가중치를 teleoperation 주먹 쥐기와 병 grasping에서 10회씩 평가했다.

| λ^max_KL | 주먹 쥐기 성공 | 병 grasping 성공 |
|---|---|---|
| 0 | 10/10 (100%) | 9/10 (90%) |
| 1e-6 | 8/10 (80%) | 10/10 (100%) |
| 1e-5 | 6/10 (60%) | 10/10 (100%) |
| 1e-4 | 3/10 (30%) | 9/10 (90%) |

teleoperation은 KL 가중치에 뚜렷하게 민감하다. 가중치 0에서는 모델이 사용자의 쥐기 의도를 가장 직접 따라 10회 모두 성공하지만, 가중치가 커질수록 latent action style이 사전 분포 쪽으로 강하게 당겨져 예측 CRP가 보수적이 되고 사용자의 온라인 이동을 덜 따른다. 반면 병 grasping은 모든 설정에서 90%나 100%로 민감도가 낮다. 이 policy 과제는 세밀한 사용자 추종보다 proprioception과 과제 상태 입력이 지배하기 때문이다. 기본값 1e-5는 안정적인 병 grasping을 주면서 시퀀스 예측을 위한 ACT 방식 latent의 정규화 이점을 유지한다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **하드웨어 의존성**. 방법은 모터 전류가 접촉에 대해 정보를 담는다는 전제에 기대며, 이는 손 하드웨어, 전달 설계, 전류 측정에 달려 있다. 동적 하중 감지는 LEAP Hand의 손가락 abduction/adduction 모터 덕을 봤으므로, 그런 관절이 없는 손은 전단이나 수직 하중 신호가 약할 수 있다.
- **감독 신호의 성격**. 시연 데이터는 해석적으로 최적인 힘 라벨이 아니라 경험적 CRP 감독을 주므로 성능이 시연 데이터의 품질과 과제 범위에 좌우될 수 있다.
- **perception 미포함**. policy 실험은 필요할 때 과제 수준 물체 pose(VICON, 고정 위치)를 쓰며 perception이나 localization을 다루지 않는다. 견고한 perception 통합은 향후 과제다.
- **ablation 범위**. teleoperation 실험에 전류 없는 CRP ablation이 있어 운동학과 사용자 의도만으로는 접촉 조건부 기준을 안정적으로 만들 수 없음을 보였지만, 보조 전류 손실, 실행 평활, 휴리스틱 전류 임계값 제어기 같은 구성 요소는 전부 ablation하지 않았다. 세부 구성 요소 연구는 향후 과제다.

## 6. 관련 연구 (Related Work)

**contact-rich manipulation을 위한 촉각과 힘/토크 센싱**. GelSight, DIGIT, 부드러운 둥근 촉각 지문 센서, DTact, 9DTact 같은 고해상도 촉각 지문 센서와 ReSkin, AnySkin, 유연 촉각 배열 같은 확장 가능한 촉각 스킨이 개발됐다. 3D-ViTac, 다중 모달 촉각 diffusion policy, TactileALOHA, Reactive Diffusion Policy는 촉각이나 시각 촉각 observation을 policy에 통합한다. CoinFT와 UMI-FT 같은 소형 힘/토크 센서는 힘 인식 manipulation 학습을 가능하게 한다. 이들은 효과적이지만 추가 하드웨어와 캘리브레이션과 통합이 필요하다. 논문은 이와 달리 dexterous hand 안에 이미 있는 모터 전류와 관절 상태에서 접촉 인식 신호를 복원할 수 있는지를 연구한다.

**proprioception 신호를 이용한 compliance 제어**. hybrid position/force control, impedance control, variable impedance control은 환경과의 물리 상호작용에 따라 로봇 이동을 조절하지만 힘/토크 센싱, 정확한 dynamics, 토크 수준 제어를 요구하는 경우가 많다. sensorless 힘 추정과 전류 기반 상호작용 제어는 모터 전류, 관절 상태, disturbance observer, 액추에이터 모델에서 외력이나 관절 토크를 추론해 이 의존을 줄인다. Zhao 등은 모터 전류를 관절 토크로 캘리브레이션하고 밀집 촉각 피드백과 결합한 sim-to-real 강화학습 프레임워크로 힘 기반 dexterous grasping을 다뤘지만, 여전히 밀집 촉각 observation과 촉각 시뮬레이션과 과제별 강화학습에 의존한다. 가장 가까운 Minimalist Compliance Control은 모터 전류나 전압에서 모터 모델과 로봇 Jacobian으로 외부 wrench를 추정한 뒤 task-space admittance 제어기로 위치 기준을 갱신하는데, 명시적 wrench 추정과 모델 기반 admittance 제어 정식화를 따른다. 논문은 명시적 wrench 복원을 거치지 않고 모터 전류와 관절 상태에서 CRP를 직접 학습하며, dexterous teleoperation과 policy 학습이 쓰는 관절 위치 명령 인터페이스에 맞춘다.

**같은 연구실의 dexterous manipulation 연구**. 참고문헌에는 One Hand to Rule Them All(canonical 표현 기반 통합 dexterous manipulation), DexHandDiff, DexCompose, CoorDex, DexH2R 등 Mingyu Ding 연구실의 dexterous hand 연구가 인용된다.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| compliance reference position (CRP) | 표준 PD 제어기에 보내는 이상적인 관절 위치 목표. 이 목표를 추종할 때 생기는 위치 오차가 물체를 부수지 않으면서 안정적인 접촉을 유지할 grasping 힘을 만든다 |
| compliance | 접촉 시 힘에 맞춰 위치가 유연하게 물러나는 성질. 논문은 이를 적응형 위치 목표로 표현한다 |
| intent velocity | 연속한 두 사용자 명령의 차이 v_intent,t = q_cmd,t − q_cmd,t−1. 쥐기, 놓기, 유지 의도와 이동 속도를 담으며 목표 누출을 막는 입력 표현이다 |
| raw-current encoding | 저역 통과 필터 없이 지연 0의 원시 모터 전류를 모델 입력으로 쓰는 설계 |
| smoothed-current auxiliary supervision | 중앙값 필터와 이동 평균으로 오프라인 평활한 전류를 학습 전용 보조 디코더가 예측하게 하는 정규화 손실 |
| execution aggregation | action chunking으로 같은 시각에 생기는 여러 후보 CRP를 최근 M개의 지수 평균으로 합치는 실행 규칙 |
| Retargeting | 조작자의 손 이동을 로봇 손 관절 명령으로 옮겨 그대로 실행하는 teleoperation 베이스라인 |
| strict / tolerant success | 카드 뽑기에서 정확히 한 장을 뽑으면 strict, 한두 장이면 tolerant 성공으로 세는 기준 |
| wrench | 힘과 토크를 하나로 묶은 6차원 상호작용 양. 논문은 이를 명시적으로 추정하지 않는다 |
| LEAP Hand | Franka Research 3에 장착해 쓴 저가 dexterous hand. 손가락 밑동에 abduction/adduction 모터가 있다 |
| Dex3 | Unitree G1 humanoid에 장착된 Unitree의 dexterous hand |

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 1 | 네 가지 contact-rich 과제 사진 | caption-region | ★ wiki 권장 (개념) |
| fig02 | 2 | 동기 도식: rigid position control과 전류 기반 CRP 예측 비교 | caption-region | ★ wiki 권장 (개념) |
| fig03 | 3 | 모터 전류와 접촉력의 회귀 측정 | caption-region | ★ wiki 권장 (동기) |
| fig04 | 5 | teleoperation 데이터 manifold와 전류 그래프 | caption-region | ★ wiki 권장 (method) |
| fig05 | 6 | 전류 조건부 예측 파이프라인 | caption-region | ★ wiki 권장 (architecture) |
| fig06 | 7 | teleoperation 학습 물체 10종 | manual | ★ wiki 권장 (setup) |
| fig07 | 8 | 네 과제의 정성 비교 | caption-region | ★ wiki 권장 (result) |
| tab01 | 7 | teleoperation 종이컵 쌓기 결과표 | manual | ★ wiki 권장 (result) |
| tab02 | 7 | teleoperation 화이트보드 닦기 결과표 | table-region | (본문 표로 대체) |
| tab03 | 7 | 동적 병 들기 결과표 | manual | ★ wiki 권장 (result) |
| tab04 | 7 | 카드 한 장 뽑기 결과표 | table-region | (본문 표로 대체) |
| tab05 | 10 | 데이터셋 통계표 | table-region | (본문 표로 대체) |
| tab06 | 12 | 하이퍼파라미터 표 | table-region | (본문 표로 대체) |
| tab07 | 13 | 실행 집계 ablation 표 | table-region | (본문 표로 대체) |
| tab08 | 14 | KL 가중치 주먹 쥐기 ablation 표 | table-region | (본문 표로 대체) |
| tab09 | 14 | KL 가중치 병 grasping ablation 표 | manual | (본문 표로 대체) |
