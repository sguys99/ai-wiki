---
title: "π0: A Vision-Language-Action Flow Model for General Robot Control"
type: paper
year: 2024
category: physical-ai
source: black-2024-pi0-a-vision-language-action-flow-model.md
raw_path: raw/papers/black-2024-pi0-a-vision-language-action-flow-model.pdf
raw_filename: "black-2024-pi0-a-vision-language-action-flow-model.pdf"
source_collection: external
authors: "Kevin Black·Noah Brown·Danny Driess·Chelsea Finn·Karol Hausman·Brian Ichter·Sergey Levine·Karl Pertsch·Quan Vuong 외 (Physical Intelligence, 총 24인)"
arxiv_id: "2410.24164"
url: "https://www.pi.website/blog/pi0"
tags: [physical-ai, vla, manipulation, robot-learning]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/black-2024-pi0-a-vision-language-action-flow-model/fig01.png
    raw: raw/papers/black-2024-pi0-a-vision-language-action-flow-model-figures/fig01.png
    caption: "π0 전체 개요 — 7종 로봇의 cross-embodiment 데이터와 인터넷 pre-training·OXE를 pre-trained VLM + action expert 구조에 넣고, zero-shot 제어·어려운 과제 specialized post-training·미지 과제 efficient post-training 세 갈래로 쓴다 (paper Figure 1)"
    page: 1
    bbox_norm: [0.0702, 0.2673, 0.9298, 0.6476]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/black-2024-pi0-a-vision-language-action-flow-model/fig02.png
    raw: raw/papers/black-2024-pi0-a-vision-language-action-flow-model-figures/fig02.png
    caption: "mobile manipulator가 건조기에서 빨래를 꺼내 바구니에 담고 접는 장면 — 수십 분 길이의 다단계 과제 (paper Figure 2)"
    page: 2
    bbox_norm: [0.0702, 0.0606, 0.9298, 0.1645]
    strategy: caption-region
    curated: false
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/black-2024-pi0-a-vision-language-action-flow-model/fig03.png
    raw: raw/papers/black-2024-pi0-a-vision-language-action-flow-model-figures/fig03.png
    caption: "π0 아키텍처 — π dataset·인터넷 pre-training·OXE를 입력으로, SigLIP 400M + Gemma 2.6B로 이뤄진 pre-trained VLM이 이미지 3장과 언어 지시를 처리하고, 300M action expert가 q_t와 noise를 받아 action chunk a_t..a_t+H를 낸다. 7~18 DoF 로봇을 하나의 모델로 제어한다 (paper Figure 3)"
    page: 4
    bbox_norm: [0.0695, 0.0606, 0.9321, 0.2578]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/black-2024-pi0-a-vision-language-action-flow-model/fig04.png
    raw: raw/papers/black-2024-pi0-a-vision-language-action-flow-model-figures/fig04.png
    caption: "pre-training mixture 구성 — 왼쪽은 데이터셋별 가중치(Bimanual ARX 51%, OXE Magic Soup 5%), 오른쪽은 실제 스텝 수 비중(Bimanual ARX 34.2%) (paper Figure 4)"
    page: 5
    bbox_norm: [0.5, 0.6043, 0.9296, 0.7347]
    strategy: caption-region
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/black-2024-pi0-a-vision-language-action-flow-model/fig05.png
    raw: raw/papers/black-2024-pi0-a-vision-language-action-flow-model-figures/fig05.png
    caption: "학습에 쓴 로봇 7종 — UR5e·Bimanual UR5e·Franka·Bimanual Trossen·Bimanual ARX·Mobile Trossen·Mobile Fibocom (paper Figure 5)"
    page: 6
    bbox_norm: [0.5102, 0.0606, 0.9195, 0.288]
    strategy: caption-region
    curated: true
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/black-2024-pi0-a-vision-language-action-flow-model/fig06.png
    raw: raw/papers/black-2024-pi0-a-vision-language-action-flow-model-figures/fig06.png
    caption: "zero-shot 평가 과제 5종 — shirt folding·bussing easy·bussing hard·grocery bagging·toast out of toaster (paper Figure 6)"
    page: 7
    bbox_norm: [0.0702, 0.057, 0.5931, 0.2945]
    strategy: caption-region
    curated: false
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/black-2024-pi0-a-vision-language-action-flow-model/fig07.png
    raw: raw/papers/black-2024-pi0-a-vision-language-action-flow-model-figures/fig07.png
    caption: "zero-shot 평가 결과 — 5개 과제 전부에서 π0(700k step)가 1위, 연산량을 맞춘 π0 parity(160k step)도 OpenVLA·Octo를 모두 앞선다 (paper Figure 7)"
    page: 7
    bbox_norm: [0.4902, 0.0474, 0.9448, 0.2676]
    strategy: manual
    curated: true
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/black-2024-pi0-a-vision-language-action-flow-model/fig08.png
    raw: raw/papers/black-2024-pi0-a-vision-language-action-flow-model-figures/fig08.png
    caption: "언어 지시 따르기 평가 과제 3종 — 식탁 치우기·상 차리기·장바구니 담기 (paper Figure 8)"
    page: 8
    bbox_norm: [0.0697, 0.0225, 0.5, 0.1859]
    strategy: caption-region
    curated: false
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/black-2024-pi0-a-vision-language-action-flow-model/fig09.png
    raw: raw/papers/black-2024-pi0-a-vision-language-action-flow-model-figures/fig09.png
    caption: "언어 지시 따르기 결과 — 사람 전문가(-human)나 high-level VLM(-HL)이 중간 지시를 줄 때 π0는 크게 오르지만, VLM 초기화가 없는 π0-small은 그 이득을 못 받는다 (paper Figure 9)"
    page: 8
    bbox_norm: [0.5, 0.0606, 0.9298, 0.2336]
    strategy: caption-region
    curated: true
  - id: fig10
    label: Figure 10
    kind: figure
    file: assets/black-2024-pi0-a-vision-language-action-flow-model/fig10.png
    raw: raw/papers/black-2024-pi0-a-vision-language-action-flow-model-figures/fig10.png
    caption: "fine-tuning 평가 과제 — pre-training과 가까운 것(그릇 쌓기·수건 개기)부터 새 요소가 들어간 것(전자레인지), 완전히 새로운 것(키친타월 교체·Franka 서랍 정리)까지 (paper Figure 10)"
    page: 9
    bbox_norm: [0.07, 0.0606, 0.5718, 0.2854]
    strategy: caption-region
    curated: false
  - id: fig11
    label: Figure 11
    kind: figure
    file: assets/black-2024-pi0-a-vision-language-action-flow-model/fig11.png
    raw: raw/papers/black-2024-pi0-a-vision-language-action-flow-model-figures/fig11.png
    caption: "데이터량별 fine-tuning 결과 — π0는 적은 데이터로도 쉬운 과제를 배우고, pre-training을 거친 쪽이 scratch보다 대체로 앞선다 (paper Figure 11)"
    page: 10
    bbox_norm: [0.1122, 0.0606, 0.8878, 0.3991]
    strategy: caption-region
    curated: false
  - id: fig12
    label: Figure 12
    kind: figure
    file: assets/black-2024-pi0-a-vision-language-action-flow-model/fig12.png
    raw: raw/papers/black-2024-pi0-a-vision-language-action-flow-model-figures/fig12.png
    caption: "복잡·장시간 과제 6종 — 고정형/이동형 빨래 개기, 실제 점심 식탁 치우기, 상자 조립, 계란 담기, 포장 용기 채우기 (paper Figure 12)"
    page: 10
    bbox_norm: [0.0702, 0.4474, 0.6449, 0.7038]
    strategy: caption-region
    curated: false
  - id: fig13
    label: Figure 13
    kind: figure
    file: assets/black-2024-pi0-a-vision-language-action-flow-model/fig13.png
    raw: raw/papers/black-2024-pi0-a-vision-language-action-flow-model-figures/fig13.png
    caption: "복잡 과제 post-training 결과 — pre-training을 거친 π0(fine-tuned)가 모든 과제에서 최대 점수의 50%를 넘고, scratch·zero-shot ablation을 대체로 앞선다 (paper Figure 13)"
    page: 11
    bbox_norm: [0.0702, 0.0606, 0.5, 0.3877]
    strategy: caption-region
    curated: true
  - id: fig14
    label: Figure 14
    kind: figure
    file: assets/black-2024-pi0-a-vision-language-action-flow-model/fig14.png
    raw: raw/papers/black-2024-pi0-a-vision-language-action-flow-model-figures/fig14.png
    caption: "flow matching timestep 샘플링 분포 — 노이즈가 큰 낮은 τ를 강조하는 shifted beta 분포, cutoff s=0.999 위로는 뽑지 않는다 (paper Figure 14, Appendix B)"
    page: 16
    bbox_norm: [0.1215, 0.0606, 0.4487, 0.2461]
    strategy: caption-region
    curated: false
  - id: tab01
    label: Table I
    kind: table
    file: assets/black-2024-pi0-a-vision-language-action-flow-model/tab01.png
    raw: raw/papers/black-2024-pi0-a-vision-language-action-flow-model-figures/tab01.png
    caption: "RTX 4090 추론 시간 분해 — image encoder 14ms, observation forward 32ms, flow 10스텝 27ms, 합계 on-board 73ms / off-board 86ms (paper Table I, Appendix D)"
    page: 16
    bbox_norm: [0.5629, 0.6884, 0.8668, 0.8029]
    strategy: table-region
    curated: true
---

## 요약 (Summary)

Physical Intelligence가 2024년 10월에 π0를 내놨다. 3.3B짜리 VLA다. VLA는 vision-language-action model의 약어로, 이미지와 언어 지시를 받아 로봇 제어 action을 곧바로 내놓는 모델을 가리킨다. 뼈대로는 PaliGemma 3B VLM을 쓰고 여기에 300M짜리 action expert를 붙였다. RT-2·OpenVLA는 action을 이산 토큰으로 적었다. π0는 그 자리에 flow matching을 넣어 연속 action을 뽑는다.

![[assets/black-2024-pi0-a-vision-language-action-flow-model/fig01.png]]
*Figure 1: π0 전체 개요 — cross-embodiment 로봇 데이터와 인터넷 pre-training·OXE가 pre-trained VLM + action expert로 들어가고, zero-shot 제어·어려운 과제 specialized post-training·미지 과제 efficient post-training 세 갈래로 쓰인다 (Black et al. 2024, p.1)*

표현을 바꾼 이유는 속도와 정밀도다. 초당 수십 번 손끝을 조정해야 하는 과제를 자동회귀로 토큰 하나씩 뽑아서는 감당할 수 없다. flow matching은 noise에서 데이터로 향하는 vector field를 학습해 샘플을 만드는 생성 기법이다. diffusion의 변형에 해당한다. π0는 이것으로 미래 50스텝치 action을 한 번에 뽑는다. control frequency가 최대 50Hz까지 올라간다. control frequency는 로봇이 1초에 몇 번 새로운 action을 갱신하는지를 뜻한다.

자체 데이터는 7종 로봇 구성·68개 과제에서 모았다. 여기에 Open X-Embodiment를 더해 1만 시간 넘게 pre-training하고 그다음 정제된 소량 데이터로 post-training한다. 성과의 절반은 이 학습 레시피에서 나온다. 그 결과 건조기에서 빨래를 꺼내 개어 쌓는 20분짜리 과제까지 하나의 policy가 자율로 해낸다.

## 주요 기여 (Key Contributions)

action 표현부터 바꿨다. flow matching과 action chunking을 얹으니 고빈도 dexterous manipulation이 실제로 됐다. action chunking은 미래 여러 스텝의 action을 한 묶음으로 예측하는 방식이고 ACT에서 가져온 아이디어다.

이미지와 텍스트는 VLM backbone이 처리하고 proprioception과 action은 action expert라는 별도 가중치 묶음이 받는다. proprioception은 관절 각도 같은 로봇 자신의 상태 감각 입력이다. 출발점은 하나의 Transformer에 여러 목적함수를 태운 Transfusion인데, 로봇 쪽 토큰의 가중치를 떼어 놓으니 성능이 올랐다.

pre-training과 post-training을 나누는 방식도 로봇으로 옮겼다. 저자들은 두 단계가 다 필요하다고 본다. 고품질 데이터만 쓰면 실수에서 회복하는 법을 배우지 못한다. 반대로 잡다한 pre-training 데이터만 쓰면 유창하게 해내지 못한다.

로봇 데이터 1만 시간이 넘게 학습에 들어갔다. 저자들은 이 규모 자체도 기여로 꼽는다. end-to-end robot learning 문헌을 통틀어 가장 긴 dexterous 과제를 시연했다고 주장한다.

## 방법론 및 아키텍처 (Methodology and Architecture)

### backbone과 action expert

몸통은 PaliGemma다. SigLIP 400M vision encoder와 Gemma 2.6B language model을 합친 3B 오픈소스 VLM이다. 크기와 성능의 균형이 실시간 제어에 알맞아 골랐다. 다만 저자들은 이 선택이 편의에 가깝다고 밝힌다. 프레임워크 자체는 어떤 pre-trained VLM과도 붙는다고 덧붙인다.

![[assets/black-2024-pi0-a-vision-language-action-flow-model/fig03.png]]
*Figure 3: π0 아키텍처 — π dataset·인터넷 pre-training·OXE를 입력으로 SigLIP 400M + Gemma 2.6B VLM이 이미지 3장과 "fold shirt" 지시를 처리하고, 300M action expert가 상태 q_t와 noise를 받아 action chunk를 낸다. 7~18 DoF 로봇을 한 모델로 제어한다 (Black et al. 2024, p.4)*

여기에 scratch로 초기화한 300M action expert를 더하면 전체 3.3B가 된다. 가중치를 두 벌로 나눈 구성은 전문가가 둘인 mixture-of-experts와 같다. 이미지와 텍스트는 첫 묶음이 맡고 상태와 action은 둘째 묶음으로 간다.

### flow matching으로 action chunk 만들기

모델은 p(A_t|o_t)를 학습한다. 여기서 A_t는 미래 H스텝의 action chunk를 가리키고 실험에서는 H=50으로 뒀다. observation o_t에는 RGB 이미지 2~3장과 언어 지시, 관절 각도 벡터 q_t가 들어간다.

학습에는 conditional flow matching loss를 쓴다. 먼저 noise ε을 뽑아 A_t^τ = τA_t + (1−τ)ε로 노이즈 섞인 action을 만든다. 네트워크 출력 v_θ는 denoising vector field u = ε − A_t를 맞혀야 한다. 확률 경로로는 선형 가우시안 형태를 쓴다. 고해상도 이미지·비디오 생성에서 검증된 방식이다. action expert 안에서는 attention mask를 양방향으로 열어 action 토큰끼리 서로를 다 본다. flow matching timestep τ는 beta 분포에서 뽑는다. 노이즈가 큰 낮은 쪽을 강조하는 분포이고 s=0.999 위로는 뽑지 않는다.

추론은 τ=0의 순수 noise에서 출발한다. Euler 적분으로 τ=1까지 밀어 올리는데 스텝 크기가 δ=0.1이니 10번이면 끝난다. observation 부분의 attention key·value는 캐시해 두고 매 스텝 새로 계산하는 것은 action 토큰 suffix뿐이다.

### cross-embodiment 데이터를 한 모델에 담기

로봇마다 관절 수가 다르다. 이 문제는 차원을 최대치에 맞춰 푼다. configuration·action 벡터를 가장 큰 로봇 기준인 18차원으로 잡으면 6-DoF 팔 둘과 그리퍼 둘, 이동 베이스, 수직 구동 몸통이 다 들어간다. 차원이 모자란 로봇은 0으로 패딩한다. 카메라가 3대에 못 미치면 빈 이미지 슬롯을 마스킹한다.

![[assets/black-2024-pi0-a-vision-language-action-flow-model/fig05.png]]
*Figure 5: 학습에 쓴 로봇 7종 — UR5e·Bimanual UR5e·Franka·Bimanual Trossen·Bimanual ARX·Mobile Trossen·Mobile Fibocom. 6-DoF와 7-DoF 팔, 홀로노믹·논홀로노믹 이동 베이스가 섞여 있다 (Black et al. 2024, p.6)*

pre-training mixture의 9.1%는 OXE·Bridge v2·DROID 같은 공개 데이터가 채운다. 카메라 1~2대에 2~10Hz 저빈도 제어라 정교함은 떨어진다. 대신 객체와 환경의 폭이 넓다. 나머지 903M timestep은 자체 수집분이고 single-arm이 106M, dual-arm이 797M이다. 데이터 비중에는 n^0.43 가중을 걸어 빨래 개기처럼 과대표집된 조합을 눌러 준다.

![[assets/black-2024-pi0-a-vision-language-action-flow-model/fig04.png]]
*Figure 4: pre-training mixture — 왼쪽은 데이터셋별 가중치(Bimanual ARX 51%, OXE Magic Soup 5%), 오른쪽은 실제 스텝 수 비중(Bimanual ARX 34.2%) (Black et al. 2024, p.5)*

여기서 "과제"를 세는 방식이 선행 연구와 다르다. 보통은 명사와 동사 조합 하나가 한 과제다. π0의 bussing 과제 하나에는 온갖 접시·컵·수저를 통에 넣고 쓰레기를 골라내는 행동이 전부 들어간다. 68이라는 숫자만 보면 실제 행동의 폭을 놓친다.

식탁 치우기처럼 의미 판단이 필요한 과제에는 high-level VLM policy를 위에 얹는다. "식탁을 치워라"를 "냅킨을 집어라" 같은 중간 지시로 쪼갠 다음 π0에 넘긴다. SayCan 계열 구도다.

## 결과 (Results)

### pre-training만 한 base model

post-training 없이 다섯 과제를 언어 지시로만 시켰다. shirt folding·bussing easy·bussing hard·grocery bagging·toast out of toaster다. 비교 대상으로는 같은 mixture로 학습시킨 OpenVLA(7B)와 Octo(93M), UR5e 데이터로만 fine-tune한 OpenVLA를 놓았다. baseline을 π0만큼 오래 돌리지 못해 160k step만 학습한 parity 버전도 함께 올렸다.

![[assets/black-2024-pi0-a-vision-language-action-flow-model/fig07.png]]
*Figure 7: zero-shot 평가 결과 — 5개 과제 전부에서 π0(700k step)가 1위이고, 연산량을 맞춘 parity(160k step)도 모든 baseline을 앞선다 (Black et al. 2024, p.7)*

블로그 쪽에는 과제별 정규화 점수가 숫자로 공개돼 있다. shirt folding 1.000, bussing easy 0.971, bussing hard 0.875, grocery bagging 0.786, toast 0.750이다. Octo가 0을 넘긴 것은 가장 쉬운 bussing easy 하나뿐이다. OpenVLA는 다섯 과제 모두 0이고 UR5e 데이터로만 fine-tune한 버전만 같은 과제에서 0.343을 냈다.

OpenVLA는 자동회귀 이산화 구조가 action chunk를 지원하지 않아 무너진다. Octo는 chunk는 되지만 표현력이 모자란다. 이 대비는 큰 모델과 복잡한 분포 모델링이 함께 있어야 한다는 근거다. VLM 초기화가 없는 π0-small조차 두 baseline보다 낫다는 점도 같은 방향을 가리킨다.

### 언어 지시 따르기

bussing·table setting·grocery bagging 세 과제에서 중간 지시를 얼마나 따르는지 쟀다. 지시는 약 2초 단위로 쪼갰다. 조건은 전체 과제 설명만 주는 flat, 사람 전문가가 중간 지시를 주는 human, high-level VLM이 자율로 주는 HL이다.

![[assets/black-2024-pi0-a-vision-language-action-flow-model/fig09.png]]
*Figure 9: 언어 평가 결과 — π0는 사람 전문가(-human)와 자율 high-level policy(-HL) 양쪽에서 이득을 얻지만, VLM 초기화가 없는 π0-small은 지시를 못 따라 그 이득을 받지 못한다 (Black et al. 2024, p.8)*

π0-small은 high-level 도움을 받아도 오르지 않는다. VLM pre-training이 쌓은 언어 능력이 자율 성능으로 이어진다고 저자들은 해석한다.

### 새 과제 학습과 복잡한 다단계 과제

pre-training에 없던 과제로 fine-tune하면 데이터가 적을수록 pre-training 효과가 커진다. 반찬통을 전자레인지에 넣는 과제가 그렇다. 5시간짜리는 baseline과 비슷하지만 1시간짜리로 가면 확실히 앞선다. 기존 모델 중에서는 목표 과제만으로 scratch 학습한 ACT·Diffusion Policy가 가장 강하다. 기존 접근은 pre-training을 활용하는 일 자체가 어려웠다.

5~20분씩 걸리는 과제들이 마지막이다. 빨래 개기(고정형·이동형), 건조기 비우기, 실제 점심 식탁 치우기, 상자 조립, 계란 담기, 포장 용기 채우기를 시켰다.

![[assets/black-2024-pi0-a-vision-language-action-flow-model/fig13.png]]
*Figure 13: 복잡 과제 post-training 결과 — pre-training을 거친 π0(fine-tuned)가 모든 과제에서 최대 점수의 50%를 넘고, scratch·zero-shot ablation 대비 우위는 어려운 과제일수록 커진다 (Black et al. 2024, p.11)*

### 추론 비용

![[assets/black-2024-pi0-a-vision-language-action-flow-model/tab01.png]]
*Table I: RTX 4090 추론 시간 — image encoder 14ms, observation forward 32ms, flow 10스텝 27ms, on-board 합계 73ms (무선 off-board는 86ms) (Black et al. 2024, p.16)*

chunk를 통째로 뽑으니 매 스텝 추론할 필요가 없다. 20Hz인 UR5e·Franka는 action 16개를 쓴 뒤 0.8초마다 다시 부른다. 50Hz 로봇들은 25개를 쓰고 0.5초마다 부른다. 여러 추론 결과의 action을 겹쳐 평균 내는 temporal ensembling은 성능이 떨어져 버렸다. 그래서 chunk를 open-loop로 실행한다.

## 한계 (Limitations)

데이터 구성 원칙이 아직 없다. 손에 넣을 수 있는 데이터를 다 합쳤을 뿐이다. 어떤 종류를 더 넣어야 좋은지, 어떻게 가중해야 하는지는 열린 문제로 남아 있다. 평가 과제가 전부 안정적으로 되는 것도 아니다. 성능을 거의 완벽하게 끌어올리려면 어떤 데이터가 얼마나 필요한지 예측할 방법이 없다.

positive transfer가 어디까지 통하는지도 아직 검증되지 않았다. 서로 다른 과제와 로봇을 섞으면 실제로 얼마나 도움이 되는지, 특히 자율주행·navigation·legged locomotion처럼 성격이 크게 다른 영역까지 이 보편성이 이어질지가 후속 과제로 남았다. 저자들 스스로도 π0를 robot foundation model로 가는 프로토타입이자 디딤돌로 규정한다.

## 이 저장소 안에서의 위치 (Position in This Wiki)

physical-ai에서 VLA 계보가 갈라지는 지점에 π0가 있다. RT-1에서 시작해 RT-2·OpenVLA로 이어진 흐름은 action을 이산 토큰으로 적는다는 전제를 공유했다. π0는 backbone 전략만 그대로 가져오고 그 전제를 버렸다. 이후 flow 계열 VLA는 여기서 출발한다.

넉 달 앞서 나온 [[physical-ai/kim-2024-openvla-an-open-source-vision-language-action-model|OpenVLA]]가 π0 실험의 주 baseline이다. OpenVLA는 "6Hz 추론과 고빈도 양손 조작 불가"를 스스로 한계로 꼽았는데 π0가 flow matching과 action chunking으로 그 한계를 넘어섰다. OpenVLA가 후속 과제로 남긴 action chunking도 여기서 실현된다. 그 앞의 [[physical-ai/brohan-2023-rt-2-vision-language-action-models-transfer-web|RT-2]]에서 온 "VLM을 fine-tune해 VLA를 만든다"는 레시피는 π0도 그대로 쓴다.

action 표현은 다른 두 논문에서 가져왔다. action chunking은 [[physical-ai/zhao-2023-learning-fine-grained-bimanual-manipulation|ACT]]에서 왔고 π0는 ACT를 소량 데이터 baseline으로도 쓴다. 다만 ACT의 temporal ensembling은 성능을 떨어뜨려 버렸다. 생성 기법 쪽은 [[llms/lipman-2022-flow-matching-for-generative-modeling|Flow Matching]]이다. 두 페이지를 나란히 읽으면 이미지 생성용으로 제안된 기법이 로봇 제어의 action head로 옮겨온 경로가 보인다.

데이터를 댄 쪽은 [[physical-ai/open-x-embodiment-2023-robotic-learning-datasets-and-rt-x|Open X-Embodiment]]다. OXE Magic Soup이라는 부분집합이 pre-training mixture에 5% 가중으로 들어간다.

뒤에 나온 [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation|GR00T N1]]은 π0를 명시적 비교 대상으로 삼는다. π0 계열은 mixture-of-experts로 VLM과 action 모델을 잇는다. GR00T N1은 그 자리에 단순 cross-attention을 써서 두 모듈을 자유롭게 고를 수 있게 했다고 스스로 설명한다. π 계열이 이후 어떻게 전개됐는지는 [[physical-ai/sa-2026-vision-language-action-models-for|VLA 서베이]]가 정리한다. π0가 flow 패턴을 열었고 π0.5는 계층을 얹었다. π*0.6에서는 자율 경험 학습이 더해진다. [[physical-ai/lu-2026-aspire-agentic-skills-discovery-for|ASPIRE]]는 LIBERO-Pro에서 π0·π0.5를 baseline으로 놓고 지시문 교란에 취약하다고 짚는다.

[[physical-ai/engiuniverse-2025-14-key-physical-ai-papers|14편 리뷰 영상]]은 π0를 "아키텍처" 축의 대표로 소개하면서 원본 미보유 논문으로 분류해 뒀다. 그 논문을 여기서 다룬다.

## 관련 페이지 (Related Pages)

- [[physical-ai/black-2025-pi05-a-vision-language-action-model-with]] — 반년 뒤 후속. 이 페이지가 한계로 남긴 "데이터 구성 원칙 부재"에 ablation으로 답한다
- [[physical-ai/physical-intelligence-2024-our-first-generalist-policy]] — 같은 저자진의 공식 블로그 해설. 과제별 raw 점수와 무편집 데모 영상이 여기 있다
- [[physical-ai/physical-intelligence-openpi]] — 레퍼런스 구현. base checkpoint와 fine-tuning 파이프라인 공개
- [[physical-ai/kim-2024-openvla-an-open-source-vision-language-action-model]] — 주 baseline이자 직전 세대 오픈소스 VLA. 이산 토큰 대 flow matching의 대조
- [[physical-ai/brohan-2023-rt-2-vision-language-action-models-transfer-web]] — VLM fine-tuning으로 VLA를 만드는 레시피의 출처
- [[physical-ai/zhao-2023-learning-fine-grained-bimanual-manipulation]] — action chunking의 출처이자 소량 데이터 baseline
- [[llms/lipman-2022-flow-matching-for-generative-modeling]] — action 출력부에 쓰인 생성 기법의 원 논문
- [[physical-ai/open-x-embodiment-2023-robotic-learning-datasets-and-rt-x]] — pre-training mixture에 들어간 공개 데이터셋
- [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation]] — π0의 MoE 결합 방식을 cross-attention으로 바꾼 후속 foundation model
- [[physical-ai/sa-2026-vision-language-action-models-for]] — π0부터 π0.7까지 flow 계열 전개를 정리한 서베이
- [[physical-ai/kawaharazuka-2025-vision-language-action-models-for-robotics]] — VLA 전반 서베이
- [[overviews/physical-ai-overview]] — 도메인 허브
