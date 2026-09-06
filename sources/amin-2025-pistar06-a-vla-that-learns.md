---
title: "π*0.6: a VLA That Learns From Experience"
type: paper
year: 2025
category: physical-ai
raw_path: raw/papers/amin-2025-pistar06-a-vla-that-learns.pdf
raw_filename: "amin-2025-pistar06-a-vla-that-learns.pdf"
source_collection: external
authors: "Physical Intelligence (Ali Amin, Ashwin Balakrishna, Kevin Black, Danny Driess, Chelsea Finn, Karol Hausman, Brian Ichter, Sergey Levine, Suraj Nair, Karl Pertsch, Lucy Xiaoyang Shi, Jost Tobias Springenberg, Quan Vuong 등 총 57인)"
url: "https://www.pi.website/blog/pistar06"
tags: [physical-ai, vla, rl-control, robot-learning, manipulation]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/amin-2025-pistar06-a-vla-that-learns/fig01.png
    raw: raw/papers/amin-2025-pistar06-a-vla-that-learns-figures/fig01.png
    caption: "RECAP 전체 루프. 왼쪽의 다양한 로봇 데이터와 subtask 명령과 웹 multimodal 데이터가 π*0.6 VLA와 value function 양쪽을 pre-training하고, 오른쪽의 상자 조립과 에스프레소와 빨래 개기 배치에서 나온 rollout과 사람 개입과 라벨이 다시 value function을 거쳐 VLA 학습으로 들어간다. VLA 입력에 language와 나란히 advantage가 들어간다"
    page: 1
    bbox_norm: [0.0702, 0.2253, 0.9298, 0.4917]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/amin-2025-pistar06-a-vla-that-learns/fig02.png
    raw: raw/papers/amin-2025-pistar06-a-vla-that-learns-figures/fig02.png
    caption: "RECAP으로 학습한 과제들. 에스프레소 음료 만들기, 납작한 골판지에서 상자 조립하기, 종류가 제각각인 빨래 개기"
    page: 2
    bbox_norm: [0.0702, 0.0606, 0.9297, 0.29]
    strategy: caption-region
    curated: false
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/amin-2025-pistar06-a-vla-that-learns/fig03.png
    raw: raw/papers/amin-2025-pistar06-a-vla-that-learns-figures/fig03.png
    caption: "π*0.6 VLA와 value function의 연결 구조. 아래쪽 670M value function이 낸 값으로 advantage A(o,a)=r+V(o_{t+N})−V(o_t)를 구하고, 이를 임계값 ε로 이진화해 VLA 입력의 metadata 옆에 붙인다. VLA는 SigLIP 400M과 Gemma 4B backbone에 860M action expert를 결합해 이산 action 토큰과 연속 action을 함께 낸다"
    page: 4
    bbox_norm: [0.5, 0.0606, 0.9298, 0.3263]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/amin-2025-pistar06-a-vla-that-learns/fig04.png
    raw: raw/papers/amin-2025-pistar06-a-vla-that-learns-figures/fig04.png
    caption: "value function 출력 시각화. 성공한 빨래 개기 episode(왼쪽)에서는 왼팔이 갠 셔츠를 흐트러뜨릴 때 값이 크게 하락했다가 복구하며 다시 오르고, 실패한 냉장고 episode(오른쪽)에서는 문을 여는 순간 값이 올랐다가 정수 필터를 넘어뜨릴 때 하락한다"
    page: 5
    bbox_norm: [0.0577, 0.0392, 0.9421, 0.2322]
    strategy: caption-region
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/amin-2025-pistar06-a-vla-that-learns/fig05.png
    raw: raw/papers/amin-2025-pistar06-a-vla-that-learns-figures/fig05.png
    caption: "반복 개선 실험에 쓴 로봇. 6 DoF 팔 둘에 평행 그리퍼, 팔 사이 베이스 카메라 1대와 손목 카메라 2대를 갖춘 고정형 양팔 시스템이다. 관절 위치를 50Hz로 제어한다"
    page: 7
    bbox_norm: [0.5205, 0.0606, 0.9093, 0.253]
    strategy: caption-region
    curated: false
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/amin-2025-pistar06-a-vla-that-learns/fig06.png
    raw: raw/papers/amin-2025-pistar06-a-vla-that-learns-figures/fig06.png
    caption: "평가 과제 다섯 가지의 시작 상태와 성공 상태와 성공 판정 기준. 셔츠와 반바지 개기, 11종 혼합 빨래, ablation용 티셔츠(깃이 위로), 상자 조립, 에스프레소 추출"
    page: 8
    bbox_norm: [0.0912, 0.0606, 0.9088, 0.3047]
    strategy: caption-region
    curated: true
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/amin-2025-pistar06-a-vla-that-learns/fig07.png
    raw: raw/papers/amin-2025-pistar06-a-vla-that-learns-figures/fig07.png
    caption: "throughput 비교. 네 과제 모두에서 RECAP을 끝까지 적용한 π*0.6(노란색)이 가장 높다. 혼합 빨래와 에스프레소는 offline RL + SFT 대비 두 배 이상이다"
    page: 9
    bbox_norm: [0.081, 0.0606, 0.919, 0.2454]
    strategy: caption-region
    curated: true
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/amin-2025-pistar06-a-vla-that-learns/fig08.png
    raw: raw/papers/amin-2025-pistar06-a-vla-that-learns-figures/fig08.png
    caption: "성공률 비교. RECAP 단계마다 성적이 오르고, 혼합 빨래를 뺀 나머지는 90%대에 닿는다. 오른쪽 상자 조립은 집기와 접기와 라벨과 쌓기 네 하위 단계로 나눠 보여준다"
    page: 9
    bbox_norm: [0.0801, 0.2868, 0.9199, 0.448]
    strategy: caption-region
    curated: true
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/amin-2025-pistar06-a-vla-that-learns/fig09.png
    raw: raw/papers/amin-2025-pistar06-a-vla-that-learns-figures/fig09.png
    caption: "RECAP 반복 횟수에 따른 throughput. 빨래는 꾸준히 오르고, 상자 조립은 i=1에서 한 번 떨어졌다가 i=2에서 크게 오른다"
    page: 10
    bbox_norm: [0.0877, 0.0606, 0.4826, 0.2477]
    strategy: caption-region
    curated: false
  - id: fig10
    label: Figure 10
    kind: figure
    file: assets/amin-2025-pistar06-a-vla-that-learns/fig10.png
    raw: raw/papers/amin-2025-pistar06-a-vla-that-learns-figures/fig10.png
    caption: "RECAP 반복 횟수에 따른 성공률. 빨래는 한 번의 반복만으로 90%를 넘겨 포화하고, 상자 조립은 두 반복 내내 하위 단계별로 계속 오른다"
    page: 10
    bbox_norm: [0.073, 0.291, 0.4973, 0.4431]
    strategy: caption-region
    curated: false
  - id: fig11
    label: Figure 11
    kind: figure
    file: assets/amin-2025-pistar06-a-vla-that-learns/fig11.png
    raw: raw/papers/amin-2025-pistar06-a-vla-that-learns-figures/fig11.png
    caption: "policy extraction 방식 비교. 같은 on-robot 데이터를 쓴 AWR과 PPO는 offline RL + SFT를 거의 넘지 못한다. advantage conditioning을 쓴 π*0.6만 throughput이 두 배 가까이 올라간다"
    page: 10
    bbox_norm: [0.5006, 0.0606, 0.9291, 0.209]
    strategy: caption-region
    curated: true
  - id: fig12
    label: Figure 12
    kind: figure
    file: assets/amin-2025-pistar06-a-vla-that-learns/fig12.png
    raw: raw/papers/amin-2025-pistar06-a-vla-that-learns-figures/fig12.png
    caption: "특정 실패 모드 제거. 깃이 위로 오게 개야 통과하는 엄격한 기준에서 offline RL + SFT는 23%에 그치지만, RECAP 두 반복만으로 97%까지 오른다"
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

## 한 줄 요약 (One-line Summary)

VLA가 실제 배치에서 스스로 쌓은 experience와 사람의 실시간 교정을 advantage conditioning으로 다시 학습에 넣는 강화학습 레시피가 RECAP이다. 에스프레소와 상자 조립과 빨래 개기에서 시간당 성공 횟수를 두 배 이상 올렸고, 그 산물이 π*0.6이다.

## 1. 자료 정보 (Document Information)

- 제목: π*0.6: a VLA That Learns From Experience
- 저자: Physical Intelligence 소속 57인 공저 (성 알파벳순 나열, Ali Amin이 첫 이름)
- 발표: 2025년 11월 17일, 블로그와 PDF 동시 공개 (arXiv 번호 없음)
- 분량: 18페이지 (본문 11페이지 + Appendix A~F)
- 프로젝트 페이지: https://www.pi.website/blog/pistar06
- 원본: `raw/papers/amin-2025-pistar06-a-vla-that-learns.pdf`

읽기는 "pi star zero point six"다. 별표가 붙은 π*0.6은 advantage conditioning을 얹은 강화학습 버전이다. 별표 없는 π0.6은 그 바탕이 되는 지도학습 VLA다. π0.6 자체의 상세는 이 논문이 아니라 별도 model card로 넘긴다.

## 2. 주요 기여 (Key Contributions)

imitation learning으로 만든 VLA는 절반쯤 성공하기는 쉬워도 매번 성공하기가 어렵다. 시연 데이터(demonstration)를 흉내 내 policy를 학습하는 방법이라 그렇다. 로봇이 작은 실수를 하면 학습 데이터에 없던 상태로 밀려나고, 거기서 더 큰 실수가 나오는 compounding error가 쌓인다. 논문이 겨냥한 문제가 이 천장이다. 정적인 출력을 내는 LLM에는 없고 환경과 계속 주고받는 제어 문제에만 있는 병목이다.

해법으로 내놓은 RECAP은 사람이 만든 시연 데이터로 기본기를 잡는다. 자율 실행 중 전문가가 끼어들어 준 교정이 큰 실수를 잡고 로봇이 혼자 굴린 rollout이 세부를 다듬는다. 성격이 다른 데이터가 한 파이프라인에 들어가는 셈이다. 사람이 기술을 익히는 순서(교육 → 코칭 → 연습)에 대응시킨 구성이다.

핵심은 policy extraction 방식이다. policy extraction은 학습된 value function을 써서 더 나은 policy를 뽑아내는 단계를 말한다. 기존 방식인 policy gradient 계열은 flow matching처럼 log-likelihood를 다루기 어려운 모델에 붙이기 힘들다. AWR 계열은 나쁜 데이터를 버리거나 크게 깎아내려 데이터를 낭비한다. RECAP은 대신 advantage를 이진 지표로 바꿔 모델 입력에 넣고 전체 데이터를 지도학습으로 학습한다. 실행할 때는 지표를 항상 positive로 고정해 좋은 쪽 action만 뽑게 한다.

규모도 기여로 든다. 개별 구성요소(DAgger식 개입, offline RL, advantage conditioning)는 선행 연구에 이미 있었다. 이들을 묶어 실제 배치 데이터로 대형 VLA를 개선한 결과를 보인 것은 이 논문이 처음이라고 저자들은 주장한다. 5~15분짜리 long-horizon 과제에서 실패율을 절반으로 줄였다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 세 개의 서브루틴이 도는 루프

자율 rollout과 필요할 때 들어가는 사람 교정으로 데이터를 모으고, value function을 학습한 뒤, 그 value function으로 policy를 학습한다. RECAP이 반복하는 동작은 이 셋뿐이다. pre-training 단계에서는 뒤의 둘만 시연 데이터 전체에 대해 돌리고, 이후에는 셋을 순서대로 한 번 이상 반복한다.

```
Vpre ← 전체 demonstration으로 학습
πpre ← Vpre 기반 advantage로 학습
과제 ℓ마다: V⁰ℓ, π⁰ℓ ← 해당 과제 demonstration으로 fine-tuning
반복 k = 1..K:
    π^{k−1}ℓ 로 데이터 수집 → Dℓ에 추가
    V^kℓ ← Vpre에서 다시 fine-tuning
    π^kℓ ← πpre에서 다시 fine-tuning
```

매 반복마다 직전 모델이 아니라 pre-training 체크포인트에서 다시 fine-tuning한다는 점이 눈에 띈다. 여러 반복에 걸친 drift를 막으려는 선택이다.

### value function을 분포로 학습한다

value function은 지금 상태에서 앞으로 받을 reward의 기대값을 추정하는 모델이다. 여기서는 스칼라 하나를 회귀하는 대신 201개 bin에 걸친 분포 p(V|o,ℓ)를 예측하고 실제 return을 이산화한 값과의 cross entropy를 최소화한다. 추론 시에는 bin 값과 확률의 가중합으로 연속값을 되살린다.

reward 설계가 특이하다. 성공하면 0, 실패로 끝나면 큰 음수 상수, 그 외 매 스텝 −1을 준다. 그래서 value function은 사실상 "성공까지 남은 스텝 수의 음수"를 예측하게 되고 빨리 끝낼수록 값이 높아진다. 과제마다 길이가 크게 다르므로 최대 episode 길이로 나눠 (−1, 0) 범위로 정규화한다.

정통 off-policy Q-learning과 견주면 이 추정치는 이론적으로 덜 최적이다. 데이터셋이 대표하는 behavior policy에 대한 on-policy Monte Carlo 값이기 때문이다. 저자들도 그 점을 인정하면서 단순하고 안정적이라는 이유로 채택했다고 적는다.

### advantage를 이진 지표로 바꿔 입력에 넣는다

개선된 policy는 원래 `π̂(a|o) ∝ π_ref(a|o) p(I|A(o,a))^β` 형태로 쓸 수 있다. 여기에 베이즈 정리를 적용하면 p(I|A) = π_ref(a|I,o)/π_ref(a|o)가 되고 대입하면 β=1일 때 π̂(a|o,ℓ) = π_ref(a|I,o,ℓ)로 정리된다. 개선 확률을 따로 모델링할 필요 없이 지표 I를 조건으로 받는 policy 하나만 학습하면 된다.

I는 advantage가 과제별 임계값 ε_ℓ를 넘는지로 정한다. ε_ℓ는 해당 과제에서 value function이 낸 값의 30% 분위수로 잡는다. classifier-free guidance처럼 조건이 있을 때와 없을 때를 함께 학습해 두고 실행 시 I를 True로 고정한다. 학습 목표는 조건 없는 항과 조건 있는 항을 α로 섞은 negative log-likelihood다.

선행 연구인 CFGRL은 ε=0으로 두고 테스트 시점에 β를 키우는 방식이었다. 저자들의 지적은 이렇다. β를 크게 하면 action 분포가 지지집합 가장자리로 몰려 로봇이 과격해지고, 자동회귀 부분에는 영향도 못 준다. 대신 임계값 ε_ℓ를 조절하는 쪽이 다루기 쉬웠다고 말한다.

사람이 준 교정은 예외 처리한다. 개입 구간의 action에는 advantage 값과 무관하게 I=True를 강제로 붙인다. 전문가의 교정은 언제나 좋은 행동이라고 가정하는 셈이다.

### π0.6과 π*0.6

π0.6은 π0.5를 손본 모델이다. 여러 로봇 플랫폼의 데이터를 pre-training mixture에 더 넣었고 backbone VLM은 Gemma 3 4B로 올렸다. action expert는 860M 파라미터로 키웠다. action expert는 로봇 상태와 action 토큰만 처리하도록 분리한 별도 가중치 묶음이다. 학습은 Knowledge Insulation 레시피를 따른다. 연속 action 학습이 backbone의 언어와 시각 지식을 훼손하지 않도록 action expert 쪽에서 stop gradient를 걸어 두는 방식이다.

모델은 π_θ(a_{t:t+H}, ℓ̂ | o_t, ℓ) 형태로 쓴다. o_t에는 카메라 이미지 여러 장과 관절 상태가 들어간다. ℓ에는 "make me an espresso" 같은 전체 프롬프트와 실행 방식을 조절하는 metadata가 함께 들어간다. 출력은 50Hz 관절각과 그리퍼 명령의 chunk와 다음 subtask를 적은 텍스트다. subtask는 action보다 앞서 생성되므로 action 생성이 자연스럽게 subtask를 조건으로 받는다.

π*0.6이 여기에 더하는 것은 하나뿐이다. 이진화된 advantage 지표 I_t를 입력으로 받는 능력이다. value function은 같은 설계를 쓰되 backbone을 670M짜리 작은 Gemma 3로 줄였다. 크기가 작아 VLA 학습 중 실시간으로 돌려도 비용 부담이 크지 않다. 과적합을 막으려고 웹 multimodal 데이터를 소량 섞어 co-training한다.

### 로봇과 데이터 수집

반복 개선 실험은 6 DoF 팔 둘과 평행 그리퍼를 갖춘 고정형 양팔 시스템에서 했다. 카메라는 팔 사이 베이스 1대와 손목 2대다. 관절 위치를 50Hz로 명령한다.

수집은 자율 실행과 사람 감시를 섞는다. 전문 teleoperation 조작자가 지켜보다 실수가 나면 개입해 교정한다. 저자들은 교정의 한계를 솔직히 적는다. 개입 자체가 실행을 끊는 사건이고 전문가라도 개입 시점과 품질을 일정하게 유지하기 어려우며 속도 같은 미세한 부분은 교정으로 다듬을 수 없다. 그래서 교정은 큰 실수를 막고 탐색을 돕는 역할에 머물고 세부는 자율 데이터의 reward 신호가 맡는다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 평가 과제

과제는 세 범주에 변형을 두어 다섯 가지다.

| 과제 | 내용 | 성공 기준 |
|---|---|---|
| 빨래 (셔츠와 반바지) | π0 논문의 표준 빨래 과제 | 200초 내 한 벌 개어 오른쪽 위에 쌓기 |
| 빨래 (혼합 11종) | 수건, 단추 셔츠, 스웨터, 청바지, 양말 등 | 500초 내, 측정은 가장 어려운 단추 셔츠로 |
| 빨래 (실패 모드 제거) | 주황 티셔츠 한 장, 고정된 초기 상태 | 200초 내, 깃이 반드시 위를 향해야 통과 |
| 에스프레소 (더블샷) | 포터필터 집기 → 분쇄 → 탬핑 → 장착 → 추출 → 서빙 | 200초 내, 포터필터 낙하나 커피 흘림 없이 |
| 상자 조립 | 납작한 골판지 접기 → 라벨 부착 → 크레이트 적재 | 600초 내 완성과 적재 |

throughput은 시간당 성공 횟수로 속도와 성공률을 한꺼번에 담는 지표다. success rate는 사람 평가자가 여러 품질 항목을 보고 매긴 성공 비율이다.

### RECAP 단계별 성적

π0.5 pre-train, π0.6 pre-train(지도학습), π*0.6 offline RL pre-train, π*0.6 offline RL + SFT, 그리고 on-robot 데이터까지 태운 최종 π*0.6을 나란히 세웠다. 네 과제 전부에서 최종 모델이 앞선다.

혼합 빨래와 에스프레소에서 throughput이 offline RL + SFT 대비 두 배 넘게 뛰고 실패율은 절반 가까이 준다. 에스프레소는 성공률이 40%에서 93%로 올라간다. 셔츠와 반바지처럼 상대적으로 쉬운 과제는 SFT 단계에서 이미 성공률이 천장에 가깝지만 throughput은 시간당 33회에서 60회로 계속 오른다. 성공률이 포화한 뒤에도 강화학습이 속도를 밀어 올린다.

혼합 빨래를 뺀 나머지 과제에서 최종 성공률이 90%대에 들어간다. 사무실에서 에스프레소를 뽑고 공장에서 포장용 상자를 접는 실사용 수준이라고 저자들은 표현한다. 상자 조립은 집기와 접기와 라벨과 쌓기 네 단계로 나눠도 모든 단계에서 다른 모델보다 높고 남은 실패는 대부분 제한 시간 초과다.

### 반복 횟수의 효과

셔츠와 반바지 개기와 상자 조립으로 두 번의 반복을 돌렸다. 빨래는 사람 교정 없이 자율 데이터만 썼다. 반복당 로봇 4대에서 300 trajectory를 모았다. 상자 조립은 자율 600회와 개입 360회를 함께 모았다.

빨래는 throughput이 꾸준히 올라 전체 50% 개선을 냈고 성공률은 첫 반복만에 90%를 넘겨 포화했다. 상자 조립은 long-horizon 과제라 첫 반복에서는 오히려 떨어졌다가 두 번째에서 2배로 뛴다. 성공률은 두 반복 내내 계속 오르고 최종적으로 접기와 라벨 단계 모두 90%쯤에 닿는다.

### policy extraction 방식 비교

같은 on-robot 데이터로 AWR과 PPO 변형을 붙여 봤다. 이 데이터는 RECAP을 돌리며 모은 것이라 baseline 쪽에 오히려 유리한 조건이다. 그런데도 둘 다 offline RL + SFT를 거의 넘지 못한다. PPO는 off-policy 상황에서 학습을 안정시키려 신뢰 영역을 η=0.01로 좁게 잡아야 했다. 그 대가로 성능이 나오지 않았다. AWR은 성공률은 그럭저럭이지만 policy가 느려져 throughput이 낮다.

### 특정 실패 모드 지우기

셔츠를 일부러 실패하기 쉬운 자세로 깔아 두고 시작했다. 깃이 위를 향해야만 통과하는 엄격한 기준을 걸었다. offline RL + SFT는 23%에 그친다. 여기에 RECAP을 두 반복(반복당 600 trajectory) 적용하자 97%까지 오르고 속도도 빨라졌다. 개입 데이터도 추가 시연 데이터도 없이 강화학습만으로 특정 실수를 제거할 수 있다는 사례다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

시스템이 완전 자율이 아니다. reward 라벨링, 개입, 장면 리셋에 모두 사람 손이 든다. 저자들은 high-level policy로 장면 리셋을 추론하게 하는 식의 자동화 여지를 언급한다.

탐색이 단순하다는 점도 지적한다. 지금은 policy 자체의 확률적 요동과 사람 개입에 기대는 탐욕적 탐색에 가깝다. 초기 policy가 어느 정도 성공하는 과제에서는 문제없지만 처음부터 거의 실패하는 과제라면 막힐 수 있다.

value function 추정 방식도 개선 여지로 남는다. on-policy Monte Carlo 대신 off-policy 추정기를 쓰는 확장을 후속 과제로 적어 뒀다.

## 6. 관련 연구 (Related Work)

관련 연구 가운데 하나는 개입 기반 학습이다. 이 논문이 쓰는 개입 형식은 human-gated DAgger 계열이다. 선행 연구들이 개입만 쓴 것과 달리 자율 experience와 개입을 함께 넣어 여러 데이터 원천을 통합한 강화학습 틀로 만들었다.

VLA에 강화학습을 붙이는 시도도 따로 있다. PPO와 그 변형을 VLA fine-tuning에 직접 쓰는 계열, 잔차 policy만 학습하거나 action head만 손보는 계열, VLA가 제안한 action을 고르거나 다듬는 계열이 있다. 대부분 이산 action이나 단순한 가우시안 분포를 쓴다. 이 논문은 표현력 있는 flow matching VLA를 통째로 end-to-end 학습한다는 점에서 갈린다.

value function과 VLA를 실제 기기에서 함께 학습한 선행 연구도 있다. calibrated Q-learning을 offline 시연에 적용한 사례, DPO로 사람 선호를 반영한 사례, PPO와 REINFORCE에 완료 시간 value function을 쓴 사례가 나열된다. 저자들이 짚는 차이는 이렇다. diffusion과 flow 기반 고용량 VLA를 지원한다는 점, advantage conditioning으로 on-policy 갱신을 피한다는 점, 평가 과제가 훨씬 복잡하고 길다는 점이다.

reward와 value와 advantage를 policy 입력 조건으로 주는 계열이 남는다. 특히 classifier-free guidance를 쓰는 CFGRL이 직접적인 뿌리다. 이 논문은 그 방식을 대규모 generalist VLA의 pre-training과 fine-tuning 양쪽으로 확장했다.

## 7. 용어집 (Glossary)

- **RECAP**: RL with Experience and Corrections via Advantage-conditioned Policies. 시연 데이터와 자율 experience와 전문가 개입을 advantage conditioning으로 묶는 강화학습 레시피.
- **π*0.6 / π0.6**: 앞은 RECAP으로 학습한 강화학습 버전, 뒤는 지도학습으로 학습한 바탕 VLA. π0.6은 π0.5에 Gemma 3 4B backbone과 860M action expert를 얹은 개선판이다.
- **advantage**: 어떤 action이 그 상태의 기대값보다 얼마나 나은지를 재는 값. A>0이면 평균보다 좋은 action이다.
- **advantage conditioning**: advantage를 임계값으로 이진화해 policy 입력에 조건으로 넣고 실행 시 항상 positive로 고정해 좋은 action만 뽑게 하는 policy extraction 방식.
- **policy extraction**: 학습된 value function을 써서 더 나은 policy를 뽑아내는 단계. AWR과 policy gradient와 advantage conditioning이 서로 다른 선택지다.
- **offline RL**: 새 상호작용 없이 이미 모아 둔 데이터만으로 policy를 개선하는 강화학습의 한 가지. RECAP의 pre-training 단계가 여기 해당한다.
- **Knowledge Insulation (KI)**: 연속 action 학습이 backbone의 언어와 시각 지식을 훼손하지 않도록 action expert 쪽에 stop gradient를 거는 학습 레시피.
- **throughput**: 시간당 성공 횟수. 성공률과 속도를 한 지표로 묶어 실사용 가치에 가깝게 잰다.
- **intervention (개입) / correction (교정)**: 자율 실행 중 전문 조작자가 teleoperation으로 넘겨받아 실수를 바로잡는 행위와 그때 남는 데이터.
- **human-gated DAgger**: 사람이 개입 시점을 판단해 교정 데이터를 만드는 DAgger 변형. 이 논문의 개입 방식이 여기 속한다.

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 1 | RECAP 전체 루프. 데이터와 VLA와 value function과 배치가 이어지는 구조 | caption-region | ★ wiki 권장 (architecture) |
| fig02 | 2 | 학습한 세 과제 실물 장면 | caption-region | (선택) |
| fig03 | 4 | π*0.6 VLA와 value function 연결, advantage 이진화 지점 | caption-region | ★ wiki 권장 (architecture) |
| fig04 | 5 | value function 시각화. 성공과 실패 episode의 값 추이 | caption-region | ★ wiki 권장 (method) |
| fig05 | 7 | 양팔 로봇 셋업 | caption-region | (선택) |
| fig06 | 8 | 평가 과제 다섯 종의 시작과 성공과 판정 기준 | caption-region | ★ wiki 권장 (실험 설정) |
| fig07 | 9 | throughput 비교 | caption-region | ★ wiki 권장 (result) |
| fig08 | 9 | success rate 비교 | caption-region | ★ wiki 권장 (result) |
| fig09 | 10 | 반복 횟수별 throughput | caption-region | (선택) |
| fig10 | 10 | 반복 횟수별 success rate | caption-region | (선택) |
| fig11 | 10 | AWR과 PPO와의 policy extraction 비교 | caption-region | ★ wiki 권장 (ablation) |
| fig12 | 10 | 깃 방향 실패 모드 제거 | caption-region | ★ wiki 권장 (ablation) |
| fig13 | 17 | Appendix 추가 value function 시각화 | caption-region | (선택) |
