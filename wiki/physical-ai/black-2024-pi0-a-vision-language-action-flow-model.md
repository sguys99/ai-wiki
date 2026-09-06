---
title: "π0: A Vision-Language-Action Flow Model for General Robot Control"
type: paper
year: 2024
category: physical-ai
source: black-2024-pi0-a-vision-language-action-flow-model.md
raw_path: raw/papers/black-2024-pi0-a-vision-language-action-flow-model.pdf
raw_filename: "black-2024-pi0-a-vision-language-action-flow-model.pdf"
source_collection: external
authors: "Kevin Black, Noah Brown, Danny Driess, Chelsea Finn, Karol Hausman, Brian Ichter, Sergey Levine, Karl Pertsch, Quan Vuong 외 (Physical Intelligence, 총 24인)"
arxiv_id: "2410.24164"
url: "https://www.pi.website/blog/pi0"
tags: [physical-ai, vla, manipulation, robot-learning]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/black-2024-pi0-a-vision-language-action-flow-model/fig01.png
    raw: raw/papers/black-2024-pi0-a-vision-language-action-flow-model-figures/fig01.png
    caption: "π0 전체 개요. 7종 로봇의 cross-embodiment 데이터와 인터넷 pre-training, OXE를 pre-trained VLM과 action expert 구조에 넣고 zero-shot 제어, 어려운 과제 specialized post-training, 미지 과제 efficient post-training 세 가지로 쓴다"
    page: 1
    bbox_norm: [0.0702, 0.2673, 0.9298, 0.6476]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/black-2024-pi0-a-vision-language-action-flow-model/fig03.png
    raw: raw/papers/black-2024-pi0-a-vision-language-action-flow-model-figures/fig03.png
    caption: "π0 아키텍처. π dataset과 인터넷 pre-training, OXE를 입력으로 SigLIP 400M와 Gemma 2.6B로 이뤄진 pre-trained VLM이 이미지 3장과 지시문을 처리하고, 300M action expert가 상태 q_t와 noise를 받아 action chunk를 낸다"
    page: 4
    bbox_norm: [0.0695, 0.0606, 0.9321, 0.2578]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/black-2024-pi0-a-vision-language-action-flow-model/fig04.png
    raw: raw/papers/black-2024-pi0-a-vision-language-action-flow-model-figures/fig04.png
    caption: "pre-training mixture 구성. 왼쪽은 데이터셋별 가중치(Bimanual ARX 51%, OXE Magic Soup 5%), 오른쪽은 실제 스텝 수 비중(Bimanual ARX 34.2%)"
    page: 5
    bbox_norm: [0.5, 0.6043, 0.9296, 0.7347]
    strategy: caption-region
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/black-2024-pi0-a-vision-language-action-flow-model/fig05.png
    raw: raw/papers/black-2024-pi0-a-vision-language-action-flow-model-figures/fig05.png
    caption: "학습에 쓴 로봇 7종. UR5e, Bimanual UR5e, Franka, Bimanual Trossen, Bimanual ARX, Mobile Trossen, Mobile Fibocom"
    page: 6
    bbox_norm: [0.5102, 0.0606, 0.9195, 0.288]
    strategy: caption-region
    curated: true
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/black-2024-pi0-a-vision-language-action-flow-model/fig07.png
    raw: raw/papers/black-2024-pi0-a-vision-language-action-flow-model-figures/fig07.png
    caption: "zero-shot 평가 결과. 5개 과제 전부에서 70만 스텝 학습한 π0가 1위이고, 연산량을 맞춘 16만 스텝 parity 버전도 OpenVLA와 Octo를 모두 앞선다"
    page: 7
    bbox_norm: [0.4902, 0.0474, 0.9448, 0.2676]
    strategy: manual
    curated: true
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/black-2024-pi0-a-vision-language-action-flow-model/fig09.png
    raw: raw/papers/black-2024-pi0-a-vision-language-action-flow-model-figures/fig09.png
    caption: "지시문 따르기 결과. 사람 전문가(-human)나 high-level VLM(-HL)이 중간 지시문을 줄 때 π0는 크게 오르지만, VLM 초기화가 없는 π0-small은 그 이득을 받지 못한다"
    page: 8
    bbox_norm: [0.5, 0.0606, 0.9298, 0.2336]
    strategy: caption-region
    curated: true
  - id: fig13
    label: Figure 13
    kind: figure
    file: assets/black-2024-pi0-a-vision-language-action-flow-model/fig13.png
    raw: raw/papers/black-2024-pi0-a-vision-language-action-flow-model-figures/fig13.png
    caption: "복잡 과제 post-training 결과. pre-training을 거친 π0(fine-tuned)가 모든 과제에서 최대 점수의 50%를 넘고 scratch와 zero-shot ablation을 대체로 앞선다"
    page: 11
    bbox_norm: [0.0702, 0.0606, 0.5, 0.3877]
    strategy: caption-region
    curated: true
  - id: tab01
    label: Table I
    kind: table
    file: assets/black-2024-pi0-a-vision-language-action-flow-model/tab01.png
    raw: raw/papers/black-2024-pi0-a-vision-language-action-flow-model-figures/tab01.png
    caption: "RTX 4090 추론 시간 분해. image encoder 14ms, observation forward 32ms, flow 10스텝 27ms, 합계는 on-board 73ms와 off-board 86ms"
    page: 16
    bbox_norm: [0.5629, 0.6884, 0.8668, 0.8029]
    strategy: table-region
    curated: true
---

## 요약

π0는 PaliGemma 3B VLM에 300M 규모의 action expert를 덧붙여 연속 action을 flow matching으로 생성하는 3.3B VLA다. VLA는 vision-language-action model의 약어로, 이미지와 지시문(instruction)을 받아 로봇 제어 명령을 직접 내놓는 모델을 가리킨다. 7종 로봇 구성과 68개 과제에서 모은 1만 시간 이상의 로봇 데이터로 pre-training한 뒤 과제별 정제 데이터로 post-training하면, 건조기에서 빨래를 꺼내 개어 쌓는 20분짜리 과제까지 하나의 policy가 자율로 수행한다.

기여는 아키텍처와 학습 레시피 두 가지다. RT-2와 OpenVLA가 연 "pre-trained VLM을 fine-tuning해 VLA를 만든다"는 구도는 그대로 두고 action 출력부만 이산 토큰에서 flow matching으로 교체했다. 그 결과 control frequency가 최대 50Hz까지 올라가 정교한 manipulation이 가능해졌다. 나머지 절반은 LLM의 pre-training과 post-training 분리를 로봇에 옮긴 학습 레시피다.

![[assets/black-2024-pi0-a-vision-language-action-flow-model/fig01.png]]
*Figure 1: π0 전체 개요. cross-embodiment 로봇 데이터와 인터넷 pre-training, OXE가 pre-trained VLM과 action expert로 들어가고, 결과 모델은 zero-shot 제어, 어려운 과제 specialized post-training, 미지 과제 efficient post-training 세 가지로 쓰인다 (Black 2024, p.1)*

## 배경

로봇 foundation model 연구가 마주한 병목은 세 가지다. 첫째는 규모이며, 대규모 pre-training의 이득은 작은 규모에서 잘 드러나지 않으므로 연구 자체를 큰 규모로 진행해야 한다. 둘째는 다양한 데이터 원천을 소화하면서도 미세한 동작을 표현할 수 있는 아키텍처다. 셋째는 학습 레시피이며, 저자들은 이것을 가장 중요한 재료로 지목한다.

범용 모델이 데이터 부족과 일반화 문제를 함께 푼다는 것이 논문의 전제다. 논문은 사진에서 새를 인식하는 과제를 예로 든다. 새 사진만 모아 학습하기보다 다양한 이미지와 언어 짝으로 pre-training한 뒤 그 과제로 fine-tuning하거나 prompt를 주는 편이 낫다는 것이다. 로봇도 마찬가지로 다양한 데이터로 먼저 pre-training한 다음 원하는 과제로 특화하는 편이 효과적이라고 본다.

범용 모델을 택하면 쓸 수 있는 데이터 원천이 넓어진다는 점도 근거다. 다른 과제, 다른 로봇, 심지어 로봇이 아닌 자료까지 학습에 들어올 수 있기 때문이다. 다양한 데이터에는 좁은 특화 데이터에 없는 실수 장면과 회복 행동이 함께 담기므로 robustness에도 유리하다.

기존 VLA의 한계는 action 표현에 있다. RT-2와 OpenVLA는 action을 텍스트 토큰처럼 이산화해 자동회귀로 예측한다. 이 방식은 토큰을 하나씩 뽑아야 해서 느리고, 여러 timestep을 한 번에 내놓는 action chunk를 지원하지 않는다. 따라서 초당 수십 번 손끝을 조정해야 하는 과제에는 그대로 쓸 수 없다.

정교한 manipulation 연구의 규모도 제약이었다. 선행 연구는 학습 trajectory가 수십에서 수백 개, 시간으로 환산하면 10시간 이하인 경우가 많았다. π0는 약 1만 시간의 시연 데이터(demonstration)에 공개 데이터셋 OXE를 더해 이 규모를 크게 늘렸다.

## 핵심 개념

policy는 현재 observation을 받아 다음 action을 정하는 함수를 말한다. π0가 목표로 하는 generalist policy는 과제마다 별도 모델을 두지 않고 하나의 policy로 여러 로봇과 여러 과제를 수행하는 모델이다.

flow matching은 noise에서 데이터로 향하는 vector field를 학습해 샘플을 만드는 생성 기법이며 diffusion의 변형에 해당한다. π0는 이것으로 action의 연속 분포를 직접 모델링하므로 이산화에 따른 해상도 손실이 없다.

action chunk는 policy가 한 번에 출력하는 여러 timestep 분량의 action 묶음이다. π0는 chunk 길이 H를 50으로 두어 미래 50스텝 분량을 한 번의 추론으로 만든다.

action expert는 로봇 상태와 action 토큰만 처리하도록 분리한 별도 가중치 묶음이다. 이미지와 텍스트는 VLM backbone이 맡고 로봇 고유의 입출력은 action expert가 맡는 구조다.

proprioception은 관절 각도 같은 로봇 자신의 상태 감각 입력이다. π0의 observation에는 카메라 이미지와 지시문 외에 이 관절 각도 벡터가 함께 들어간다.

control frequency는 로봇이 1초에 몇 번 새로운 action을 갱신하는지를 뜻한다. π0는 과제에 따라 최대 50Hz로 동작하므로 1초에 50번 새 제어 명령을 내보낸다.

## 방법

### 모델 구성

π0의 몸통은 PaliGemma다. SigLIP 400M vision encoder와 Gemma 2.6B language model로 이뤄진 3B 오픈소스 VLM으로, 크기와 성능의 균형이 실시간 제어에 알맞아 선택했다. 저자들은 이 선택이 편의에 가깝고 프레임워크 자체는 어떤 pre-trained VLM과도 결합된다고 밝힌다.

구조는 표준 late fusion VLM 레시피를 따른다. 즉 image encoder가 로봇의 이미지 observation을 언어 토큰과 같은 임베딩 공간으로 보내고, 그 뒤에 로봇 전용 입출력인 proprioception과 action이 추가된다.

![[assets/black-2024-pi0-a-vision-language-action-flow-model/fig03.png]]
*Figure 3: π0 아키텍처. π dataset과 인터넷 pre-training, OXE를 입력으로 SigLIP 400M와 Gemma 2.6B VLM이 이미지 3장과 "fold shirt" 지시문을 처리하고, 300M action expert가 상태 q_t와 noise를 받아 action chunk를 낸다. 7~18 DoF 로봇을 한 모델로 제어한다 (Black 2024, p.4)*

여기에 scratch로 초기화한 300M action expert를 더해 전체 3.3B가 된다. 가중치를 둘로 나눈 구성은 전문가가 둘인 mixture-of-experts와 같으며, 두 묶음은 Transformer의 self-attention layer에서만 상호작용한다. 아이디어의 출발점은 하나의 Transformer에 여러 목적함수를 학습시킨 Transfusion인데, 로봇 쪽 토큰의 가중치를 분리했더니 성능이 더 좋았다는 것이 π0의 추가 발견이다.

두 전문가의 설정값은 다음과 같다. self-attention에서만 만나므로 width와 mlp dim을 서로 맞출 필요가 없고, action expert는 flow 적분 스텝마다 여러 번 실행되므로 추론을 빠르게 하려고 작게 줄였다.

| 항목 | VLM backbone (Gemma 2B 기반) | action expert |
|---|---|---|
| 초기화 | PaliGemma 가중치 | scratch |
| 처리 토큰 | 이미지, 지시문 | 상태 q_t, noisy action |
| width | 2048 | 1024 |
| mlp dim | 16,384 | 4,096 |
| depth | 18 | 18 |
| attention | multi-query, head 18개, kv head 1개, head dim 256 | 동일 |
| 파라미터 | 약 3B | 약 300M |

로봇 전용 입출력은 두 경로로 들어간다. 상태 벡터 q_t는 선형 사영으로 Transformer 임베딩 차원에 맞춘다. noisy action chunk는 flow matching timestep τ 정보를 함께 담아야 하므로 별도 MLP를 거치며, 그 식은 `W3 · swish(W2 · concat(W1 · a, φ(τ)))`이고 φ는 sinusoidal positional encoding이다.

### action 분포를 flow matching으로 학습

모델이 학습하는 대상은 조건부 분포 `p(A_t | o_t)`다. A_t는 미래 H스텝의 action chunk이며 실험에서는 H=50을 쓴다. observation o_t는 RGB 이미지 2~3장과 지시문 토큰 열, 관절 각도 벡터 q_t로 이뤄진다.

학습에는 conditional flow matching loss를 쓴다. 먼저 noise ε을 정규분포에서 뽑아 `A_t^τ = τA_t + (1−τ)ε`로 노이즈 섞인 action을 만든다. 그다음 네트워크 출력 v_θ가 denoising vector field `u = ε − A_t`를 맞히도록 제곱 오차를 최소화한다. 확률 경로는 `q(A_t^τ | A_t) = N(τA_t, (1−τ)I)`인 선형 가우시안 형태이며, 고해상도 이미지와 영상 생성에서 성능이 검증된 방식이다.

flow matching timestep τ의 샘플링 분포는 원 논문들과 다르다. 원 flow matching 연구는 τ를 균등분포에서 뽑고, 이미지 합성 연구는 중간 구간을 강조하는 logit-normal 분포를 제안했다. 반면 π0는 노이즈가 큰 낮은 τ를 강조하는 shifted beta 분포 `p(τ) = Beta((s−τ)/s; 1.5, 1)`를 쓰고 s=0.999 위로는 아예 뽑지 않는다.

이 선택의 근거는 action 예측이 이미지 합성과 성격이 다르다는 판단이다. 텍스트 라벨만 주고 평균 이미지를 그리는 일은 비교적 쉽지만, observation을 조건으로 평균 action을 맞히는 일은 훨씬 어렵다. observation이 워낙 많은 정보를 담아 가능한 action의 범위를 강하게 좁히기 때문이다. cutoff s=0.999는 적분 스텝 δ가 1/1000보다만 크면 되도록 허용하므로 최대 1,000회 적분까지 여유가 있다.

추론은 순수 noise인 τ=0에서 시작해 forward Euler 적분으로 τ=1까지 밀어 올린다. 스텝 크기 δ=0.1이므로 10번이면 끝난다. observation 부분의 attention key와 value는 캐시해 두고 매 스텝 다시 계산하는 것은 action 토큰에 해당하는 suffix뿐이다.

### attention mask 구성

π0는 토큰을 세 블록으로 나눈 blockwise causal attention mask를 쓴다. 블록 안에서는 양방향으로 모두 보지만 뒤 블록은 보지 못한다. 각 블록의 경계는 임의로 그은 것이 아니라 저마다 이유가 있다.

| 블록 | 구성 | 분리한 이유 |
|---|---|---|
| 1 | 이미지 `I^1..I^n`와 지시문 ℓ_t | PaliGemma pre-training 때 쓰던 modality다. 뒤 블록을 보지 못하게 막아 pre-training 대비 분포 변화를 줄인다 |
| 2 | 상태 q_t | flow 적분 스텝마다 값이 바뀌지 않으므로, 마지막 블록을 보지 않게 두면 key와 value를 캐시할 수 있다 |
| 3 | noisy action `a_t^τ..a_{t+H-1}^τ` | 전체 입력을 다 볼 수 있고, 블록 안에서 action 토큰끼리 서로를 전부 참조한다 |

### cross-embodiment 데이터 정규화

로봇마다 관절 수와 카메라 수가 다르므로 표현을 최대치에 맞춰 통일한다. configuration 벡터와 action 벡터는 데이터셋에서 가장 큰 로봇 기준인 18차원으로 잡았고, 여기에 6-DoF 팔 둘, 그리퍼 둘, 이동 베이스, 수직 구동 몸통이 모두 담긴다. 차원이 모자란 로봇은 0으로 패딩하고 카메라가 3대에 못 미치면 빈 이미지 슬롯을 마스킹한다.

![[assets/black-2024-pi0-a-vision-language-action-flow-model/fig05.png]]
*Figure 5: 학습에 쓴 로봇 7종. 6-DoF와 7-DoF 팔을 쓰는 single-arm과 dual-arm 조작기에 홀로노믹과 논홀로노믹 이동 조작기가 섞여 있다 (Black 2024, p.6)*

7종 로봇 구성의 사양은 다음과 같다. 같은 이름 아래 두 플랫폼을 묶은 항목이 있는데, 운동학 성질이 비슷해 하나로 분류했다.

| 로봇 구성 | 카메라 | configuration 차원 | action 차원 |
|---|---|---|---|
| UR5e | 손목 1대, 어깨 너머 1대 | 7 | 7 |
| Bimanual UR5e | 3대 | 14 | 14 |
| Franka | 2대 | 8 | 8 |
| Bimanual Trossen (ALOHA 구성) | 손목 2대, 베이스 1대 | 14 | 14 |
| Bimanual ARX와 AgileX | 손목 2대, 베이스 1대 | 14 | 14 |
| Mobile Trossen과 mobile ARX (논홀로노믹) | 손목 2대, 베이스 1대 | 14 | 16 |
| Mobile Fibocom (홀로노믹) | 손목 2대, 베이스 1대 | 14 | 17 |

이동 베이스가 action 차원을 늘린다. 논홀로노믹 베이스는 2차원이 붙어 16차원이 되고, 홀로노믹 베이스는 병진 2차원과 회전 1차원이 붙어 17차원이 된다.

### pre-training mixture

pre-training mixture의 9.1%는 OXE와 Bridge v2, DROID 같은 공개 데이터가 채운다. 이 데이터셋들은 카메라가 1~2대이고 제어가 2~10Hz로 느려 정교함은 떨어지지만, 다루는 물체와 환경의 폭이 넓다.

나머지는 자체 수집한 9억 300만 timestep이며 single-arm이 1억 600만, dual-arm이 7억 9,700만이다. 데이터셋 크기가 고르지 않아 로봇과 과제 조합마다 샘플 수 n에 `n^0.43` 가중을 건다. 이 가중이 빨래 개기처럼 과대표집된 조합의 비중을 낮춘다.

![[assets/black-2024-pi0-a-vision-language-action-flow-model/fig04.png]]
*Figure 4: pre-training mixture 구성. 왼쪽은 데이터셋별 가중치이고 Bimanual ARX가 51%, OXE Magic Soup이 5%를 차지한다. 오른쪽은 실제 스텝 수 비중으로 Bimanual ARX가 34.2%다 (Black 2024, p.5)*

과제를 세는 방식이 선행 연구와 다르다는 점을 저자들이 따로 짚는다. 보통은 "컵을 집어라"와 "접시를 집어라"처럼 명사와 동사 조합 하나를 별개 과제로 센다. 반면 π0의 bussing 과제 하나에는 온갖 접시와 컵과 수저를 통에 넣고 각종 쓰레기를 골라내는 행동이 모두 들어간다. 따라서 68이라는 숫자는 실제 행동의 폭을 과소평가한다.

언어 라벨도 두 층으로 붙는다. 과제 이름과 함께 segment annotation을 쓰는데, 이는 약 2초 길이의 하위 trajectory에 붙인 세분화된 라벨이다.

### post-training과 high-level policy

post-training은 과제별 정제 데이터로 모델을 특화하는 단계다. 필요한 데이터 양은 과제 난도에 따라 크게 벌어져 가장 쉬운 과제가 5시간, 가장 복잡한 과제는 100시간 이상을 쓴다.

두 단계가 모두 필요하다는 것이 저자들의 논지다. 고품질 데이터만으로 학습하면 실수 장면이 거의 없어 회복하는 법을 배우지 못한다. 반대로 품질이 낮은 pre-training 데이터만 쓰면 유창하고 효율적으로 수행하지 못한다. 둘을 합치면 모델이 평소에는 고품질 데이터를 닮게 움직이면서도 실수했을 때 꺼내 쓸 회복 동작을 갖추게 된다.

식탁 치우기처럼 의미 판단이 필요한 과제에는 high-level VLM policy를 함께 쓴다. "식탁을 치워라"라는 상위 과제를 "냅킨을 집어라", "냅킨을 쓰레기통에 넣어라" 같은 subtask로 쪼개 π0에 넘기는 방식이며, SayCan 계열의 LLM 및 VLM planning과 같은 구도다.

### 비교용 모델 π0-small

VLM 초기화의 효과를 재려고 π0-small을 따로 학습했다. 470M 규모이며 VLM 초기화가 없다는 점이 핵심 차이다. 큰 데이터셋을 소화하면서도 scratch 학습에서 성능이 나오도록 여러 부분을 바꿨다.

| 구성 요소 | π0 | π0-small |
|---|---|---|
| 파라미터 | 3.3B | 470M |
| 언어 인코딩 | Gemma 2.6B (PaliGemma) | DistilBERT |
| 이미지 인코더 | SigLIP 400M | R26-S-32 ResNet-ViT 하이브리드, 가중치 공유 없음 |
| 인터넷 pre-training | 있음 | 없음 |
| backbone과 action expert 결합 | decoder-only mixture-of-experts | encoder-decoder식 cross-attention |
| action expert 구조 | Gemma | DiT, AdaLN-Zero로 τ 주입 |
| flow 적분 스텝 | 10 | 10 |

### 추론 비용과 chunk 실행

추론 비용은 카메라 3대 기준으로 RTX 4090에서 측정했다. 새 action chunk를 만들 때마다 이미지를 인코딩하고, observation 토큰으로 forward pass를 한 번 실행한 다음, action 토큰에 대해 10회의 flow 스텝을 수행한다.

![[assets/black-2024-pi0-a-vision-language-action-flow-model/tab01.png]]
*Table I: RTX 4090 추론 시간. image encoder 14ms, observation forward pass 32ms, flow 10스텝 27ms로 on-board 합계가 73ms이고, 무선으로 off-board 추론을 하면 지연 13ms가 붙어 86ms가 된다 (Black 2024, p.16)*

chunk를 통째로 뽑으므로 매 timestep 추론할 필요가 없다. 20Hz로 동작하는 UR5e와 Franka는 action 16개를 실행한 뒤 0.8초마다 다시 추론하고, 50Hz로 동작하는 나머지 로봇은 25개를 실행한 뒤 0.5초마다 추론한다.

여러 추론 결과의 action을 겹쳐 평균 내는 temporal ensembling도 초기에 시도했다. 그러나 성능이 오히려 떨어져 채택하지 않았고, 최종 구성은 chunk를 open-loop로 실행한다. open-loop 실행은 한 번 계산한 action 묶음을 중간 피드백 없이 끝까지 내보내는 방식이다.

## 결과

평가는 네 가지 질문으로 나뉜다. pre-training만 마친 base model이 얼마나 잘하는지, 지시문을 얼마나 잘 따르는지, 정교한 manipulation 전용 방법과 비교하면 어떤지, 복잡한 다단계 과제에 적응할 수 있는지다. 모든 평가는 과제와 방법마다 10회 시행의 평균을 쓰고, 완전 성공은 1.0이며 부분 성공에는 부분 점수를 준다.

### zero-shot 성능

post-training 없이 다섯 과제를 지시문만으로 수행시켰다. shirt folding, bussing easy, bussing hard, grocery bagging, toast out of toaster이며 정교한 조작과 다단계 행동, 의미 인식이 함께 필요한 과제들이다.

비교 대상은 같은 mixture로 학습시킨 OpenVLA(7B)와 Octo(93M), 그리고 UR5e 데이터로만 fine-tuning한 OpenVLA다. 시간 제약 때문에 baseline을 π0만큼 오래 학습시키지 못해서, 저자들은 16만 스텝만 학습한 연산량 동등 버전 π0 parity도 함께 평가했다. 본 모델은 70만 스텝을 학습했고 baseline은 OpenVLA가 16만 스텝, Octo가 32만 스텝이다.

![[assets/black-2024-pi0-a-vision-language-action-flow-model/fig07.png]]
*Figure 7: zero-shot 평가 결과. 5개 과제 전부에서 π0가 1위이고, 연산량을 맞춘 parity 버전도 모든 baseline을 앞선다 (Black 2024, p.7)*

논문 Figure 7은 막대그래프만 싣지만 같은 저자진의 블로그 해설에는 정규화 점수가 숫자로 공개돼 있다. 값은 [[physical-ai/physical-intelligence-2024-our-first-generalist-policy]]에 정리돼 있다.

| 과제 | π0 | π0-small | OpenVLA | OpenVLA (UR5e only) | Octo |
|---|---|---|---|---|---|
| Shirt Folding | 1.000 | 0.500 | 0 | 0 | 0 |
| Bussing Easy | 0.971 | 0.443 | 0 | 0.343 | 0.043 |
| Bussing Hard | 0.875 | 0.333 | 0 | 0 | 0 |
| Grocery Bagging | 0.786 | 0.271 | 0 | 0 | 0 |
| Toast out of Toaster | 0.750 | 0 | 0 | 0 | 0 |

두 baseline은 사실상 과제를 수행하지 못한다. 기본 OpenVLA는 다섯 과제 모두 0점이고 Octo는 가장 쉬운 bussing easy에서만 0.043을 얻었다. 저자들이 드는 이유는 구조 차이다. OpenVLA는 자동회귀 이산화 구조라 action chunk를 지원하지 않고, Octo는 chunk를 지원하지만 표현력이 부족하다. 즉 큰 모델과 flow matching이나 diffusion 같은 복잡한 분포 모델링이 함께 있어야 한다는 근거다.

VLM 초기화가 없는 π0-small조차 두 baseline보다 낫다는 점도 같은 방향을 가리킨다. 다만 저자들은 이 비교가 공정하기 어렵다고 덧붙인다. π0-small은 파라미터가 훨씬 적은데, VLM 초기화 없이 큰 모델을 학습시키는 일 자체가 어렵기 때문에 크기 차이를 없애기 힘들다.

### 지시문 따르기

세 과제에서 중간 지시문을 얼마나 따르는지 측정했다. 지시문은 집을 물체와 놓을 위치를 담아 약 2초 단위로 쪼갠 것이다.

| 과제 | 물체 수 | 한 episode당 지시문 수 |
|---|---|---|
| bussing | 12개 | 약 30개 |
| table setting | 7개 | 약 20개 |
| grocery bagging | 7개 | 약 14개 |

조건은 세 가지다. flat은 "장바구니를 채워라" 같은 전체 과제 설명만 주고, human은 사람 전문가가 중간 지시문을 주며, HL은 high-level VLM policy가 사람 없이 자율로 중간 지시문을 생성한다.

![[assets/black-2024-pi0-a-vision-language-action-flow-model/fig09.png]]
*Figure 9: 지시문 따르기 결과. π0는 사람 전문가(-human)와 자율 high-level policy(-HL) 양쪽에서 이득을 얻지만, VLM 초기화가 없는 π0-small은 지시문을 제대로 따르지 못해 그 이득을 받지 못한다 (Black 2024, p.8)*

π0의 지시문 따르기 정확도가 π0-small보다 뚜렷하게 높다. 더 중요한 것은 그 차이가 드러나는 지점이다. π0는 사람 전문가의 중간 지시문을 받으면 성능이 크게 오르고 자율 high-level policy로도 상당 부분 이득을 얻는다. 반면 π0-small은 지시문을 제대로 따르지 못해 high-level 도움을 받아도 성능이 오르지 않는다. 따라서 VLM pre-training이 쌓은 언어 능력이 자율 성능으로 이어진다는 것이 저자들의 해석이다.

### 새 과제 fine-tuning

pre-training에 없던 과제로 fine-tuning해 성능을 봤다. 과제는 pre-training 데이터와의 거리에 따라 세 등급으로 나눴다.

| 등급 | 과제 | 만점 | 등급을 정한 이유 |
|---|---|---|---|
| 쉬움 | UR5e 그릇 쌓기 | 3 | 접시를 잡고 옮기는 동작이 bussing과 비슷하다 |
| 쉬움 | 수건 개기 | 3 | pre-training에 있는 shirt folding과 비슷하다 |
| 중간 | 반찬통을 전자레인지에 넣기 | 4 | 용기 조작은 익숙하지만 전자레인지가 pre-training에 없다 |
| 어려움 | 키친타월 교체 | 4 | 해당 물체가 pre-training에 전혀 없다 |
| 어려움 | Franka 서랍 정리 | 5 | Franka 로봇으로 하는 유사 과제가 pre-training에 없다 |

비교 대상은 두 부류다. OpenVLA와 Octo는 OXE로 학습된 공개 체크포인트에서 각 과제로 fine-tuning했다. ACT와 Diffusion Policy는 소량 데이터 학습용으로 설계된 방법이라 fine-tuning 데이터만으로 학습시켰다. π0는 pre-trained에서 fine-tuning한 것과 scratch에서 학습한 것을 모두 평가해 아키텍처의 이득과 pre-training의 이득을 나눠 봤다.

결과에서 π0가 대체로 앞선다. 기존 방법 중에서는 목표 과제만으로 scratch 학습한 쪽이 가장 강했는데, 이는 기존 접근에서 pre-training을 활용하는 일 자체가 어려웠다는 뜻이다. pre-training 효과는 데이터가 적을수록 커져서 반찬통 과제의 5시간 데이터 조건은 baseline과 비슷한 반면 1시간 조건에서는 확실히 앞선다. 또한 pre-training 데이터와 가까운 과제일수록 이득이 커서 격차가 2배까지 벌어지는 경우도 있다.

### 복잡한 다단계 과제

마지막 평가 대상은 한 번 수행에 5분에서 20분이 걸리는 과제들이다. 수십 가지 개별 동작을 이어 붙여야 하고 물체 배치의 변화 폭도 크다.

| 과제 | 만점 | pre-training 포함 | 난점 |
|---|---|---|---|
| 고정형 빨래 개기 | 4 | 있음 | 구겨진 채 통에 담긴 옷을 꺼내 펴고 개어 쌓아야 한다 |
| 이동형 빨래 개기 | 4 | 있음 | 같은 과제에 베이스의 위치와 방향 제어가 더해진다 |
| 건조기 비우기 | 5 | 있음 | 건조기에 접근해 문을 열고 옷을 바구니에 옮긴 뒤 닫는다 |
| 식탁 치우기 | 12 | 없음 | 처음 보는 물체가 뒤엉킨 상황에서 큰 접시는 그리퍼를 비틀어 잡고 유리컵은 조심히 다뤄야 한다 |
| 상자 조립 | 5 | 없음 | 납작한 골판지를 접으며 한 팔로 누르고 실패하면 다시 시도해야 한다 |
| 포장 용기 채우기 | 5 | 없음 | 음식이 튀어나오지 않게 담고 양팔로 뚜껑을 닫는다 |
| 계란 담기 | 7 | 없음 | 미끄러운 계란 6개를 자세에 맞게 집어 칸에 넣고 뚜껑을 닫는다 |

빨래 개기의 채점은 물체 하나당 네 단계로 나뉜다. 통에서 꺼내 탁자에 올리면 1점, 펴면 1점, 개면 1점, 첫 물체면 탁자 모서리에 두고 이후 물체면 기존 더미에 쌓으면 1점이다. 평가에는 M, L, XL 셔츠 세 장과 사이즈 28과 36인 반바지 두 장을 쓰고 물체마다 2회씩 시행하며 한 번에 최대 1만 5,000 스텝, 약 5분을 준다.

![[assets/black-2024-pi0-a-vision-language-action-flow-model/fig13.png]]
*Figure 13: 복잡 과제 post-training 결과. pre-training을 거친 π0가 모든 과제에서 최대 점수의 50%를 넘고, scratch와 zero-shot ablation 대비 우위는 어려운 과제일수록 커진다 (Black 2024, p.11)*

이 과제들은 다른 방법으로는 풀리지 않아 baseline 대신 π0 자체의 ablation과 비교했다. 세 조건은 pre-training과 fine-tuning을 모두 거친 full, pre-training만 하고 바로 평가한 zero-shot, fine-tuning 데이터만으로 학습한 scratch다. full 조건이 모든 과제에서 최대 점수의 50%를 넘겼고 나머지 두 조건을 대체로 앞섰다. 어려운 과제일수록 격차가 커진다는 점에서 pre-training의 값어치가 난도와 함께 커진다고 읽을 수 있다.

## 한계

- **데이터 구성 원칙이 없다**: 저자들은 확보 가능한 데이터를 모두 합쳤을 뿐이며, 어떤 종류를 더 넣어야 좋은지와 어떻게 가중해야 하는지는 열린 문제로 남았다.
- **모든 과제가 안정적으로 되지는 않는다**: 거의 완벽한 성능에 도달하려면 어떤 데이터가 얼마나 필요한지 예측할 방법이 아직 없다.
- **positive transfer의 범위를 모른다**: 서로 다른 과제와 로봇을 섞었을 때 실제로 얼마나 도움이 되는지, 특히 자율주행이나 navigation, legged locomotion처럼 성격이 크게 다른 영역까지 이 보편성이 이어질지는 후속 과제다.
- **프로토타입이라는 자기 규정**: 저자들 스스로 π0를 robot foundation model로 가는 디딤돌이자 프로토타입으로 규정한다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| action expert | 로봇 상태와 action 토큰만 처리하는 별도 가중치 묶음. VLM backbone과 나란히 놓인 두 번째 전문가에 해당하며 self-attention layer에서만 backbone과 만난다 |
| flow matching | noise에서 데이터로 가는 vector field를 회귀로 학습해 샘플을 만드는 생성 기법. diffusion의 변형이며 π0는 conditional flow matching loss를 쓴다 |
| action chunk | 미래 H스텝 분량의 action을 한 묶음으로 예측한 결과. π0는 H=50을 쓰고 open-loop로 실행한다 |
| temporal ensembling | 여러 추론 시점의 action chunk를 겹쳐 평균 내는 기법. ACT에서 왔지만 π0에서는 성능을 떨어뜨려 쓰지 않는다 |
| π0-small | VLM 초기화 없이 470M로 학습한 비교용 모델. DistilBERT 언어 인코더와 DiT action expert를 쓴다 |
| OXE Magic Soup | Open X-Embodiment에서 추린 부분집합. pre-training mixture에 5% 가중으로 들어간다 |

## 저장소 안에서의 위치

physical-ai에서 VLA 계보가 갈라지는 지점에 π0가 있다. RT-1에서 시작해 RT-2와 OpenVLA로 이어진 흐름은 action을 이산 토큰으로 적는다는 전제를 공유했다. π0는 backbone 전략만 그대로 가져오고 그 전제를 버렸으며, 이후 flow 계열 VLA는 여기서 출발한다.

넉 달 앞서 나온 [[physical-ai/kim-2024-openvla-an-open-source-vision-language-action-model|OpenVLA]]가 π0 실험의 주 baseline이다. OpenVLA는 6Hz 추론과 고빈도 양손 조작 불가를 스스로 한계로 꼽았는데 π0가 flow matching과 action chunking으로 그 한계를 넘어섰다. OpenVLA가 후속 과제로 남긴 action chunking도 여기서 실현된다. 그 앞의 [[physical-ai/brohan-2023-rt-2-vision-language-action-models-transfer-web|RT-2]]에서 온 "VLM을 fine-tuning해 VLA를 만든다"는 레시피는 π0도 그대로 쓴다.

action 표현은 다른 두 논문에서 가져왔다. action chunking은 [[physical-ai/zhao-2023-learning-fine-grained-bimanual-manipulation|ACT]]에서 왔고 π0는 ACT를 소량 데이터 baseline으로도 쓴다. 다만 ACT의 temporal ensembling은 성능을 떨어뜨려 채택하지 않았다. 생성 기법 쪽 뿌리는 [[llms/lipman-2022-flow-matching-for-generative-modeling|Flow Matching]]이며, 두 페이지를 나란히 읽으면 이미지 생성용으로 제안된 기법이 로봇 제어의 action 출력부로 옮겨온 경로가 보인다.

데이터를 댄 쪽은 [[physical-ai/open-x-embodiment-2023-robotic-learning-datasets-and-rt-x|Open X-Embodiment]]다. OXE Magic Soup이라는 부분집합이 pre-training mixture에 5% 가중으로 들어간다.

뒤에 나온 [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation|GR00T N1]]은 π0를 명시적 비교 대상으로 삼는다. π0 계열은 mixture-of-experts로 VLM과 action 모델을 잇지만, GR00T N1은 그 자리에 단순 cross-attention을 써서 두 모듈을 자유롭게 고를 수 있게 했다고 스스로 설명한다. π 계열의 이후 전개는 [[physical-ai/sa-2026-vision-language-action-models-for|VLA 서베이]]가 정리한다. π0가 flow 패턴을 열었고 π0.5는 계층 구조를 더했으며 π*0.6에서는 자율 경험 학습이 추가된다. [[physical-ai/lu-2026-aspire-agentic-skills-discovery-for|ASPIRE]]는 LIBERO-Pro에서 π0와 π0.5를 baseline으로 놓고 지시문 교란에 취약하다고 짚는다.

[[physical-ai/engiuniverse-2025-14-key-physical-ai-papers|14편 리뷰 영상]]은 π0를 아키텍처 항목의 대표로 소개하면서 원본 미보유 논문으로 분류해 뒀다. 그 논문을 이 페이지에서 다룬다.

## 관련 페이지

- [[physical-ai/black-2025-pi05-a-vision-language-action-model-with]]: 반년 뒤 후속. 이 페이지가 한계로 남긴 데이터 구성 원칙 부재에 ablation으로 답한다
- [[physical-ai/ai-2026-pi07-a-steerable-generalist-robotic]]: 같은 계열의 최신 모델. real-time action chunking으로 추론 지연까지 학습에 반영한다
- [[physical-ai/amin-2025-pistar06-a-vla-that-learns]]: 자율 경험과 강화학습을 더해 π0 계열을 확장한 모델
- [[physical-ai/physical-intelligence-2024-our-first-generalist-policy]]: 같은 저자진의 공식 블로그 해설. 과제별 정규화 점수와 무편집 데모 영상이 여기 있다
- [[physical-ai/physical-intelligence-openpi]]: 레퍼런스 구현. base checkpoint와 fine-tuning 파이프라인이 공개돼 있다
- [[physical-ai/kim-2024-openvla-an-open-source-vision-language-action-model]]: 주 baseline이자 직전 세대 오픈소스 VLA. 이산 토큰과 flow matching의 대조
- [[physical-ai/brohan-2023-rt-2-vision-language-action-models-transfer-web]]: VLM fine-tuning으로 VLA를 만드는 레시피의 출처
- [[physical-ai/brohan-2022-rt-1-robotics-transformer-for-real-world]]: VLA 계보의 출발점. action tokenization을 세운 논문
- [[physical-ai/zhao-2023-learning-fine-grained-bimanual-manipulation]]: action chunking과 temporal ensembling의 출처이자 소량 데이터 baseline
- [[llms/lipman-2022-flow-matching-for-generative-modeling]]: action 출력부에 쓰인 생성 기법의 원 논문
- [[llms/peebles-2022-scalable-diffusion-models-with-transformers]]: π0-small의 action expert가 채택한 DiT 구조의 원 논문
- [[physical-ai/open-x-embodiment-2023-robotic-learning-datasets-and-rt-x]]: pre-training mixture에 들어간 공개 데이터셋
- [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation]]: π0의 mixture-of-experts 결합 방식을 cross-attention으로 바꾼 후속 foundation model
- [[physical-ai/sa-2026-vision-language-action-models-for]]: π0부터 π0.7까지 flow 계열 전개를 정리한 서베이
- [[physical-ai/kawaharazuka-2025-vision-language-action-models-for-robotics]]: VLA 전반 서베이
- [[overviews/physical-ai-overview]]: 도메인 허브
