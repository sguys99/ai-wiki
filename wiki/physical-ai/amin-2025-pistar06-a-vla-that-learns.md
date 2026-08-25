---
title: "π*0.6: a VLA That Learns From Experience"
type: paper
year: 2025
category: physical-ai
source: amin-2025-pistar06-a-vla-that-learns.md
raw_path: /Users/kmyu/Desktop/project/ai-wiki/raw/papers/amin-2025-pistar06-a-vla-that-learns.pdf
raw_filename: "amin-2025-pistar06-a-vla-that-learns.pdf"
source_collection: external
authors: "Physical Intelligence (Ali Amin·Ashwin Balakrishna·Kevin Black·Danny Driess·Chelsea Finn·Karol Hausman·Brian Ichter·Sergey Levine·Suraj Nair·Karl Pertsch·Lucy Xiaoyang Shi·Jost Tobias Springenberg·Quan Vuong 등 총 57인)"
url: "https://www.pi.website/blog/pistar06"
tags: [physical-ai, vla, rl-control, robot-learning, manipulation]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/amin-2025-pistar06-a-vla-that-learns/fig01.png
    raw: raw/papers/amin-2025-pistar06-a-vla-that-learns-figures/fig01.png
    caption: "RECAP 전체 루프 — 왼쪽의 다양한 로봇 데이터·subtask 명령·웹 multimodal 데이터가 π*0.6 VLA와 value function 양쪽을 pre-training하고, 오른쪽의 상자 조립·에스프레소·빨래 개기 배치에서 나온 rollout과 사람 개입·라벨이 다시 value function을 거쳐 VLA로 돌아온다. VLA 입력에 language와 나란히 advantage가 들어간다"
    page: 1
    bbox_norm: [0.0702, 0.2253, 0.9298, 0.4917]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/amin-2025-pistar06-a-vla-that-learns/fig02.png
    raw: raw/papers/amin-2025-pistar06-a-vla-that-learns-figures/fig02.png
    caption: "RECAP으로 학습한 과제들 — 에스프레소 음료 만들기, 납작한 골판지에서 상자 조립하기, 종류가 제각각인 빨래 개기"
    page: 2
    bbox_norm: [0.0702, 0.0606, 0.9297, 0.29]
    strategy: caption-region
    curated: false
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/amin-2025-pistar06-a-vla-that-learns/fig03.png
    raw: raw/papers/amin-2025-pistar06-a-vla-that-learns-figures/fig03.png
    caption: "π*0.6 VLA와 value function의 연결 구조 — 아래쪽 670M value function이 낸 값으로 advantage A(o,a)=r+V(o_{t+N})−V(o_t)를 구하고, 이를 임계값 ε로 이진화해 VLA 입력의 metadata 옆에 붙인다. VLA는 SigLIP 400M + Gemma 4B backbone에 860M action expert를 달아 이산 action 토큰과 연속 action을 함께 낸다"
    page: 4
    bbox_norm: [0.5, 0.0606, 0.9298, 0.3263]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/amin-2025-pistar06-a-vla-that-learns/fig04.png
    raw: raw/papers/amin-2025-pistar06-a-vla-that-learns-figures/fig04.png
    caption: "value function 출력 시각화 — 성공한 빨래 개기 episode(왼쪽)에서는 왼팔이 갠 셔츠를 흐트러뜨릴 때 값이 급락했다가 복구하며 다시 오르고, 실패한 냉장고 episode(오른쪽)에서는 문을 여는 순간 값이 뛰었다가 정수 필터를 넘어뜨릴 때 떨어진다"
    page: 5
    bbox_norm: [0.0577, 0.0392, 0.9421, 0.2322]
    strategy: caption-region
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/amin-2025-pistar06-a-vla-that-learns/fig05.png
    raw: raw/papers/amin-2025-pistar06-a-vla-that-learns-figures/fig05.png
    caption: "반복 개선 실험에 쓴 로봇 — 6 DoF 팔 둘에 평행 그리퍼, 팔 사이 베이스 카메라 1대와 손목 카메라 2대를 갖춘 고정형 양팔 시스템. 관절 위치를 50Hz로 제어한다"
    page: 7
    bbox_norm: [0.5205, 0.0606, 0.9093, 0.253]
    strategy: caption-region
    curated: false
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/amin-2025-pistar06-a-vla-that-learns/fig06.png
    raw: raw/papers/amin-2025-pistar06-a-vla-that-learns-figures/fig06.png
    caption: "평가 과제 다섯 종의 시작 상태·성공 상태·성공 판정 기준 — 셔츠와 반바지 개기, 11종 혼합 빨래, ablation용 티셔츠(깃이 위로), 상자 조립, 에스프레소 추출"
    page: 8
    bbox_norm: [0.0912, 0.0606, 0.9088, 0.3047]
    strategy: caption-region
    curated: true
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/amin-2025-pistar06-a-vla-that-learns/fig07.png
    raw: raw/papers/amin-2025-pistar06-a-vla-that-learns-figures/fig07.png
    caption: "시간당 성공 횟수 — 네 과제 모두에서 RECAP을 끝까지 적용한 π*0.6(노란색)이 가장 높다. 혼합 빨래와 에스프레소는 offline RL + SFT 대비 2배 이상으로 뛴다"
    page: 9
    bbox_norm: [0.081, 0.0606, 0.919, 0.2454]
    strategy: caption-region
    curated: true
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/amin-2025-pistar06-a-vla-that-learns/fig08.png
    raw: raw/papers/amin-2025-pistar06-a-vla-that-learns-figures/fig08.png
    caption: "성공률 — RECAP 단계마다 성적이 오르고, 혼합 빨래를 뺀 나머지는 90%대에 닿는다. 오른쪽 상자 조립은 집기·접기·라벨·쌓기 네 하위 단계로 쪼개 보여준다"
    page: 9
    bbox_norm: [0.0801, 0.2868, 0.9199, 0.448]
    strategy: caption-region
    curated: true
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/amin-2025-pistar06-a-vla-that-learns/fig09.png
    raw: raw/papers/amin-2025-pistar06-a-vla-that-learns-figures/fig09.png
    caption: "RECAP 반복 횟수에 따른 시간당 성공 횟수 — 빨래는 꾸준히 오르고, 상자 조립은 i=1에서 한 번 떨어졌다가 i=2에서 크게 오른다"
    page: 10
    bbox_norm: [0.0877, 0.0606, 0.4826, 0.2477]
    strategy: caption-region
    curated: false
  - id: fig10
    label: Figure 10
    kind: figure
    file: assets/amin-2025-pistar06-a-vla-that-learns/fig10.png
    raw: raw/papers/amin-2025-pistar06-a-vla-that-learns-figures/fig10.png
    caption: "RECAP 반복 횟수에 따른 성공률 — 빨래는 1회 반복만에 90%를 넘겨 포화하고, 상자 조립은 두 반복 내내 하위 단계별로 계속 오른다"
    page: 10
    bbox_norm: [0.073, 0.291, 0.4973, 0.4431]
    strategy: caption-region
    curated: false
  - id: fig11
    label: Figure 11
    kind: figure
    file: assets/amin-2025-pistar06-a-vla-that-learns/fig11.png
    raw: raw/papers/amin-2025-pistar06-a-vla-that-learns-figures/fig11.png
    caption: "policy extraction 방식 비교 — 같은 on-robot 데이터를 쓴 AWR과 PPO는 offline RL + SFT를 거의 못 넘는다. advantage conditioning을 쓴 π*0.6만 시간당 성공 횟수가 두 배 가까이 올라간다"
    page: 10
    bbox_norm: [0.5006, 0.0606, 0.9291, 0.209]
    strategy: caption-region
    curated: true
  - id: fig12
    label: Figure 12
    kind: figure
    file: assets/amin-2025-pistar06-a-vla-that-learns/fig12.png
    raw: raw/papers/amin-2025-pistar06-a-vla-that-learns-figures/fig12.png
    caption: "특정 실패 모드 제거 — 깃이 위로 오게 개야 통과하는 엄격한 기준에서 offline RL + SFT는 23%에 그치지만, 사람 개입 없이 RECAP 두 반복만으로 97%까지 오른다"
    page: 10
    bbox_norm: [0.5006, 0.2566, 0.9291, 0.4593]
    strategy: caption-region
    curated: true
  - id: fig13
    label: Figure 13
    kind: figure
    file: assets/amin-2025-pistar06-a-vla-that-learns/fig13.png
    raw: raw/papers/amin-2025-pistar06-a-vla-that-learns-figures/fig13.png
    caption: "Appendix B의 추가 value function 시각화"
    page: 17
    bbox_norm: [0.0402, 0.0366, 0.5416, 0.6471]
    strategy: caption-region
    curated: false
---

## 요약 (Summary)

Physical Intelligence가 2025년 11월에 π*0.6을 냈다. π 계열에서 강화학습을 VLA 학습의 중심에 놓은 첫 논문이다. 앞선 π0·π0.5는 무엇을 학습 데이터로 넣을지를 놓고 씨름했다. 여기서는 로봇이 실제 배치에서 스스로 만들어낸 데이터를 어떻게 학습 신호로 바꿀지가 문제다.

![[assets/amin-2025-pistar06-a-vla-that-learns/fig01.png]]
*Figure 1: RECAP 전체 루프 — pre-training된 VLA를 배치해 얻은 rollout과 사람 개입이 value function을 거쳐 advantage로 바뀌고, 그 advantage를 조건으로 다시 VLA를 학습시킨다 (Physical Intelligence 2025, p.1)*

imitation learning으로 만든 VLA는 절반쯤 성공하기는 쉬워도 매번 성공하기가 어렵다. imitation learning은 시연 데이터를 흉내 내 policy를 학습하는 방법이다. 로봇이 작은 실수를 하면 학습 데이터에 없던 상태로 밀려나고 거기서 더 큰 실수가 나온다. 출발점이 이 천장이다. 정적인 출력을 내는 LLM에는 없고 환경과 계속 주고받는 제어 문제에만 생기는 병목이다.

RECAP은 demonstration으로 기본기를 잡는다. 자율 실행 중 전문가가 끼어들어 준 교정이 큰 실수를 잡고 로봇이 혼자 굴린 rollout이 세부를 다듬는다. 사람이 기술을 익히는 순서인 교육·코칭·연습에 대응시킨 구성이다. 가장 어려운 과제에서 시간당 성공 횟수가 두 배 넘게 오르고 실패율이 절반으로 준다. 사무실에서 하루 종일 에스프레소를 뽑고 공장에서 포장용 상자를 접는 수준이 나온다.

## 주요 기여 (Key Contributions)

핵심은 policy extraction 방식이다. policy extraction은 학습된 value function을 써서 더 나은 policy를 뽑아내는 단계다. policy gradient 계열은 flow matching처럼 log-likelihood를 다루기 어려운 모델에 붙이기 힘들다. AWR 계열은 나쁜 데이터를 버리거나 크게 깎아내려 데이터를 낭비한다. RECAP은 advantage를 이진 지표로 바꿔 모델 입력에 넣고 전체 데이터를 지도학습으로 학습한다. 실행할 때는 지표를 positive로 고정해 좋은 쪽 action만 뽑게 한다.

사람 demonstration, 자율 rollout, 전문가 개입 구간이 모두 같은 objective 아래로 들어온다. 성격이 다른 데이터를 한 파이프라인에 담은 것도 기여다. 개입 구간에는 advantage 값과 무관하게 positive 지표를 강제로 붙인다. 전문가의 교정은 언제나 좋은 action이라고 가정하는 셈이다.

개별 구성요소는 선행 연구에 이미 있었다. DAgger식 개입도, offline RL도, advantage conditioning도 그렇다. 이들을 묶어 실제 배치 데이터로 대형 VLA를 개선한 결과를 보인 것이 처음이라고 저자들은 주장한다. 5~15분짜리 장기 과제에서 그렇게 했다.

## 방법론 및 아키텍처 (Methodology and Architecture)

### 세 서브루틴이 도는 루프

데이터를 모으고 value function을 학습하고 그 value function으로 policy를 학습한다. RECAP이 하는 일은 이 셋뿐이다. pre-training 단계에서는 뒤의 둘만 demonstration 전체에 대해 돌리고 이후에는 셋을 순서대로 반복한다.

```
Vpre ← 전체 demonstration으로 학습
πpre ← Vpre 기반 advantage로 학습
과제 ℓ마다: V⁰ℓ, π⁰ℓ ← 해당 과제 demonstration으로 fine-tuning
반복 k = 1..K:
    π^{k−1}ℓ 로 데이터 수집 → Dℓ에 추가
    V^kℓ ← Vpre에서 다시 fine-tuning
    π^kℓ ← πpre에서 다시 fine-tuning
```

매 반복이 직전 모델이 아니라 pre-training 체크포인트에서 다시 출발한다. 여러 반복에 걸친 drift를 막으려는 선택이다. 직전 모델에서 이어 가도 잘 될 수 있다고 저자들은 덧붙인다.

### advantage를 이진 지표로 바꾼다

![[assets/amin-2025-pistar06-a-vla-that-learns/fig03.png]]
*Figure 3: π*0.6 VLA와 value function의 연결 — 670M value function이 낸 값으로 advantage를 구하고 임계값 ε로 이진화해 VLA 입력에 붙인다 (Physical Intelligence 2025, p.4)*

개선된 policy는 π̂(a|o) ∝ π_ref(a|o)·p(I|A(o,a))^β 형태로 쓸 수 있다. 여기에 베이즈 정리를 적용하면 p(I|A) = π_ref(a|I,o)/π_ref(a|o)가 되고 대입하면 β=1일 때 π̂(a|o,ℓ) = π_ref(a|I,o,ℓ)로 정리된다. 개선 확률을 따로 모델링할 필요 없이 지표 I를 조건으로 받는 policy 하나만 학습하면 된다.

I는 advantage가 과제별 임계값 ε_ℓ를 넘는지로 정한다. ε_ℓ는 해당 과제에서 value function이 낸 값의 30% 분위수로 잡는다. classifier-free guidance처럼 조건이 있을 때와 없을 때를 함께 학습해 두고 실행 시 I를 True로 고정한다.

선행 연구인 CFGRL은 ε=0으로 두고 테스트 시점에 β를 키웠다. 저자들의 지적은 이렇다. β를 크게 하면 action 분포가 지지집합 가장자리로 몰려 로봇이 과격해지고, 자동회귀 부분에는 영향도 못 준다. 임계값을 조절하는 쪽이 다루기 쉬웠다고 말한다.

### value function은 성공까지 남은 스텝을 센다

![[assets/amin-2025-pistar06-a-vla-that-learns/fig04.png]]
*Figure 4: value function 출력 시각화 — 왼팔이 갠 셔츠를 흐트러뜨릴 때 값이 급락했다 복구하며 오르고(왼쪽), 정수 필터를 넘어뜨릴 때 떨어진다(오른쪽) (Physical Intelligence 2025, p.5)*

reward 설계가 특이하다. 성공하면 0, 실패로 끝나면 큰 음수 상수, 그 외 매 스텝 −1을 준다. 그래서 value function은 사실상 성공까지 남은 스텝 수의 음수를 예측하게 되고 빨리 끝낼수록 값이 높아진다. 과제마다 길이가 크게 다르므로 최대 episode 길이로 나눠 (−1, 0) 범위로 정규화한다.

값을 스칼라 하나로 회귀하지 않고 201개 bin에 걸친 분포로 예측한 뒤 cross entropy를 최소화한다. 추론할 때는 bin 값과 확률의 가중합으로 연속값을 되살린다. 이 추정치는 데이터셋이 대표하는 behavior policy에 대한 on-policy Monte Carlo 값이다. 정통 off-policy Q-learning보다 이론적으로는 덜 최적이다. 저자들도 그 점을 인정하면서 단순하고 안정적이라는 이유로 골랐다고 적는다.

### π0.6과 π*0.6

π0.6은 π0.5를 손본 모델이다. 여러 로봇 플랫폼 데이터를 pre-training mixture에 더 넣었고, backbone VLM은 Gemma 3 4B로 올렸다. action expert는 860M 파라미터로 키웠다. action expert는 로봇 상태와 action 토큰만 처리하도록 분리한 별도 가중치 묶음이다. 학습은 Knowledge Insulation 레시피를 따른다. 연속 action 학습이 backbone의 언어·시각 지식을 훼손하지 않도록 action expert 쪽에 stop gradient를 걸어 두는 방식이다.

50Hz 관절각·그리퍼 명령의 chunk가 나오고 다음 subtask를 적은 텍스트도 함께 나온다. subtask가 action보다 먼저 생성되므로 action 생성이 자연스럽게 그 문장을 조건으로 받는다. 추론 시 subtask 예측은 action 생성보다 낮은 빈도로 돈다.

π*0.6이 여기 더하는 것은 이진화된 advantage 지표를 입력으로 받는 능력 하나다. value function은 같은 설계를 쓰되 backbone을 670M짜리 작은 Gemma 3로 줄였다. 작아서 VLA 학습 중 실시간으로 돌려도 비용 부담이 크지 않다. 과적합을 막으려고 웹 multimodal 데이터를 소량 섞어 co-training한다.

### 개입의 한계를 저자들이 먼저 짚는다

수집은 자율 실행과 사람 감시를 섞는다. 전문 teleoperation 조작자가 지켜보다 실수가 나면 넘겨받아 교정한다. 그런데 개입 자체가 실행을 끊는 사건이고, 전문가라도 개입 시점과 품질을 일정하게 유지하기 어려우며 속도 같은 미세한 부분은 교정으로 다듬을 수 없다. 그래서 교정은 큰 실수를 막고 탐색을 돕는 역할에 머물고 세부는 자율 데이터의 reward 신호가 맡는다. 이론이 말하는 DAgger의 최적 감독과는 거리가 있다.

## 결과 (Results)

![[assets/amin-2025-pistar06-a-vla-that-learns/fig06.png]]
*Figure 6: 평가 과제 다섯 종의 시작 상태·성공 상태·판정 기준 (Physical Intelligence 2025, p.8)*

과제는 세 갈래에 변형을 두어 다섯 가지다. 빨래는 셔츠·반바지 표준 과제, 11종 혼합, 실패 모드 제거용 단일 티셔츠로 나뉜다. 여기에 에스프레소 더블샷과 상자 조립이 붙는다. throughput은 시간당 성공 횟수로 속도와 성공률을 한꺼번에 담는 지표다. success rate는 사람 평가자가 여러 품질 항목을 보고 매긴 성공 비율이다.

### RECAP 단계별 성적

![[assets/amin-2025-pistar06-a-vla-that-learns/fig07.png]]
*Figure 7: 시간당 성공 횟수 — 네 과제 모두에서 최종 π*0.6이 앞서고, 혼합 빨래와 에스프레소는 offline RL + SFT 대비 2배 이상 (Physical Intelligence 2025, p.9)*

![[assets/amin-2025-pistar06-a-vla-that-learns/fig08.png]]
*Figure 8: 성공률 — 혼합 빨래를 뺀 나머지 과제가 90%대에 닿고, 상자 조립은 네 하위 단계 모두에서 다른 모델보다 높다 (Physical Intelligence 2025, p.9)*

π0.5 pre-train, 지도학습으로 학습한 π0.6 pre-train, offline RL로 pre-training한 π*0.6, 거기에 과제별 demonstration을 얹은 π*0.6 offline RL + SFT, 그리고 on-robot 데이터까지 태운 최종 π*0.6을 나란히 세웠다.

에스프레소는 성공률이 40%에서 93%로 올라간다. 셔츠·반바지처럼 쉬운 과제는 SFT 단계에서 이미 성공률이 천장에 가깝지만 throughput은 33에서 60으로 계속 오른다. 성공률이 포화한 뒤에도 강화학습이 속도를 밀어 올린다. throughput을 지표로 잡은 선택이 여기서 값을 한다.

상자 조립은 집기·접기·라벨·쌓기 네 단계로 쪼개도 모든 단계에서 다른 모델보다 높고 남은 실패는 대부분 제한 시간 초과다.

### 반복 횟수의 효과

셔츠·반바지 개기와 상자 조립으로 두 번의 반복을 돌렸다. 빨래는 사람 교정 없이 자율 데이터만 썼고 반복당 로봇 4대에서 300 trajectory를 모았다. 상자 조립은 자율 600회와 개입 360회를 함께 모았다.

빨래는 throughput이 꾸준히 올라 전체 50% 개선을 냈고 성공률은 첫 반복만에 90%를 넘겨 포화했다. 상자 조립은 장기 과제라 첫 반복에서 오히려 떨어졌다가 두 번째에서 2배로 뛴다. 저자들은 긴 과제일수록 더 많은 데이터가 필요하다고 해석한다.

### advantage conditioning이 정말 나은가

![[assets/amin-2025-pistar06-a-vla-that-learns/fig11.png]]
*Figure 11: policy extraction 방식 비교 — 같은 데이터를 준 AWR·PPO는 offline RL + SFT를 거의 못 넘는다 (Physical Intelligence 2025, p.10)*

같은 on-robot 데이터로 AWR과 PPO 변형을 붙여 봤다. 이 데이터는 RECAP을 돌리며 모은 것이라 baseline 쪽에 오히려 유리한 조건이다. 그런데도 둘 다 offline RL + SFT를 거의 넘지 못한다. PPO는 off-policy 상황에서 학습을 안정시키려 신뢰 영역을 η=0.01로 좁게 잡아야 했다. 그 대가로 성능이 나오지 않았다. AWR은 성공률은 그럭저럭이지만 policy가 느려져 throughput이 낮다.

### 특정 실패 모드 지우기

![[assets/amin-2025-pistar06-a-vla-that-learns/fig12.png]]
*Figure 12: 깃이 위를 향해야 통과하는 엄격한 기준에서, 개입 없이 RECAP 두 반복만으로 23%에서 97%로 (Physical Intelligence 2025, p.10)*

셔츠를 일부러 실패하기 쉬운 자세로 깔아 두고 깃이 위를 향해야만 통과하는 기준을 걸었다. offline RL + SFT는 23%에 그친다. 여기에 RECAP을 두 반복(반복당 600 trajectory) 적용하자 97%까지 오르고 속도도 빨라졌다. 개입 데이터도 추가 demonstration도 없이 강화학습만으로 특정 실수를 제거한 사례다. 적은 데이터로도 policy의 행동을 겨냥해 바꿀 수 있다.

## 한계 (Limitations)

시스템이 완전 자율이 아니다. reward 라벨링, 개입, 장면 리셋에 모두 사람 손이 든다. 저자들은 high-level policy로 장면 리셋을 추론하게 하는 식의 자동화 여지를 언급한다.

탐색이 단순하다는 점도 인정한다. 지금은 policy 자체의 확률적 요동과 사람 개입에 기대는 탐욕적 탐색에 가깝다. 초기 policy가 어느 정도 성공하는 과제에서는 문제없지만 처음부터 거의 실패하는 과제라면 막힐 수 있다.

value function 추정도 개선 여지로 남는다. on-policy Monte Carlo 대신 off-policy 추정기를 쓰는 확장을 후속 과제로 적어 뒀다.

π0.6 자체의 상세가 이 논문에 없어 읽기가 불편하다. backbone·데이터 구성·학습 레시피는 별도 model card로 넘겨져 있다. 그런데 이 저장소에는 아직 그 model card가 없다.

## 이 저장소 안에서의 위치 (Position in This Wiki)

π0는 action 표현을 손봤다. π0.5는 학습 데이터 구성을 다시 짰다. π*0.6이 건드린 것은 학습 신호가 어디서 오느냐다. 세 페이지를 나란히 읽으면 같은 팀이 1년 사이 병목을 어디로 옮겨 잡았는지가 드러난다.

[[physical-ai/black-2025-pi05-a-vision-language-action-model-with|π0.5]]의 한계 절은 데이터 원천의 조합이 아직 넓게 열려 있다는 말로 끝난다. π*0.6은 그 열린 자리에 로봇 자신의 experience를 넣은 답이다. π0.5는 co-training으로 다른 로봇과 웹의 데이터를 끌어왔다. 여기서는 배치 현장이 데이터 원천이 된다.

value function을 쓰는 방식이 이 저장소의 다른 계열과 대비된다. [[physical-ai/hou-2026-world-model-for-robot-learning|world model 서베이]]가 다루는 계열은 환경의 dynamics를 배워 미래를 굴려 보는 쪽이다. RECAP의 value function은 미래를 그리지 않고 남은 스텝 수만 센다. 훨씬 작은 모델로도 credit assignment가 된다는 사례다.

[[physical-ai/lu-2026-aspire-agentic-skills-discovery-for|ASPIRE]]와는 같은 문제를 정반대로 푼다. 양쪽 모두 policy가 실패에서 배우게 하려는 시도다. ASPIRE는 실패 로그를 코딩 에이전트가 읽고 Python 프로그램을 고치는 쪽으로 갔고 π*0.6은 실패를 advantage 라벨로 바꿔 가중치에 흡수시킨다. 명시적 프로그램과 암묵적 가중치의 대비다.

RT-2 이후 VLA 계보에서 강화학습은 오래 주변부에 있었다. [[physical-ai/xu-2025-an-anatomy-of-vision-language-action-models|VLA anatomy 서베이]]와 [[physical-ai/kawaharazuka-2025-vision-language-action-models-for-robotics|full-stack review]]가 모두 imitation learning을 기본값으로 놓고 서술한다. π*0.6은 그 기본값이 흔들리는 지점을 표시한다.

## 관련 페이지 (Related Pages)

- [[physical-ai/physical-intelligence-2025-a-vla-that-learns-from]] — 같은 날 올라온 공식 블로그. 배치 규모(에스프레소 18시간·빨래 50종·상자 59개)와 무편집 영상이 여기에 있다
- [[physical-ai/jo-2026-pi-0-6-vla-primer]] — 이 논문의 한국어 입문 해설. 강화학습 기초부터 RECAP 수식 유도까지 풀어 쓴다
- [[physical-ai/black-2025-pi05-a-vision-language-action-model-with]] — 직전 세대. π0.6의 바탕이 되는 co-training 레시피와 2단 추론의 출처
- [[physical-ai/black-2024-pi0-a-vision-language-action-flow-model]] — flow matching action expert와 cross-embodiment 학습의 출처
- [[physical-ai/physical-intelligence-openpi]] — π 계열 레퍼런스 구현
- [[physical-ai/lu-2026-aspire-agentic-skills-discovery-for]] — 실패에서 배우는 문제를 코드 수정으로 푸는 대조군
- [[physical-ai/hou-2026-world-model-for-robot-learning]] — 미래 예측 기반 접근과의 대비
- [[physical-ai/xu-2025-an-anatomy-of-vision-language-action-models]] — VLA 구성요소를 모듈 단위로 정리한 서베이
- [[physical-ai/zhao-2023-learning-fine-grained-bimanual-manipulation]] — action chunking의 출처
- [[overviews/physical-ai-overview]] — 도메인 허브
