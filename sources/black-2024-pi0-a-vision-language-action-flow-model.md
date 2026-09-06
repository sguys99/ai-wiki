---
title: "π0: A Vision-Language-Action Flow Model for General Robot Control"
type: paper
year: 2024
category: physical-ai
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
    caption: "π0 전체 개요. 7종 로봇의 cross-embodiment 데이터와 인터넷 pre-training, OXE를 pre-trained VLM과 action expert 구조에 넣고 zero-shot 제어, 어려운 과제 specialized post-training, 미지 과제 efficient post-training 세 가지로 쓴다 (paper Figure 1)"
    page: 1
    bbox_norm: [0.0702, 0.2673, 0.9298, 0.6476]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/black-2024-pi0-a-vision-language-action-flow-model/fig02.png
    raw: raw/papers/black-2024-pi0-a-vision-language-action-flow-model-figures/fig02.png
    caption: "mobile manipulator가 건조기에서 빨래를 꺼내 바구니에 담고 접는 장면. 수십 분 길이의 다단계 과제다 (paper Figure 2)"
    page: 2
    bbox_norm: [0.0702, 0.0606, 0.9298, 0.1645]
    strategy: caption-region
    curated: false
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/black-2024-pi0-a-vision-language-action-flow-model/fig03.png
    raw: raw/papers/black-2024-pi0-a-vision-language-action-flow-model-figures/fig03.png
    caption: "π0 아키텍처. π dataset과 인터넷 pre-training, OXE를 입력으로 SigLIP 400M와 Gemma 2.6B로 이뤄진 pre-trained VLM이 이미지 3장과 언어 지시를 처리하고, 300M action expert가 q_t와 noise를 받아 action chunk a_t..a_t+H를 낸다. 7~18 DoF 로봇을 하나의 모델로 제어한다 (paper Figure 3)"
    page: 4
    bbox_norm: [0.0695, 0.0606, 0.9321, 0.2578]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/black-2024-pi0-a-vision-language-action-flow-model/fig04.png
    raw: raw/papers/black-2024-pi0-a-vision-language-action-flow-model-figures/fig04.png
    caption: "pre-training mixture 구성. 왼쪽은 데이터셋별 가중치(Bimanual ARX 51%, OXE Magic Soup 5%), 오른쪽은 실제 스텝 수 비중(Bimanual ARX 34.2%) (paper Figure 4)"
    page: 5
    bbox_norm: [0.5, 0.6043, 0.9296, 0.7347]
    strategy: caption-region
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/black-2024-pi0-a-vision-language-action-flow-model/fig05.png
    raw: raw/papers/black-2024-pi0-a-vision-language-action-flow-model-figures/fig05.png
    caption: "학습에 쓴 로봇 7종. UR5e, Bimanual UR5e, Franka, Bimanual Trossen, Bimanual ARX, Mobile Trossen, Mobile Fibocom (paper Figure 5)"
    page: 6
    bbox_norm: [0.5102, 0.0606, 0.9195, 0.288]
    strategy: caption-region
    curated: true
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/black-2024-pi0-a-vision-language-action-flow-model/fig06.png
    raw: raw/papers/black-2024-pi0-a-vision-language-action-flow-model-figures/fig06.png
    caption: "zero-shot 평가 과제 5종. shirt folding, bussing easy, bussing hard, grocery bagging, toast out of toaster (paper Figure 6)"
    page: 7
    bbox_norm: [0.0702, 0.057, 0.5931, 0.2945]
    strategy: caption-region
    curated: false
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/black-2024-pi0-a-vision-language-action-flow-model/fig07.png
    raw: raw/papers/black-2024-pi0-a-vision-language-action-flow-model-figures/fig07.png
    caption: "zero-shot 평가 결과. 5개 과제 전부에서 70만 스텝 학습한 π0가 1위이고, 연산량을 맞춘 16만 스텝 parity 버전도 OpenVLA와 Octo를 모두 앞선다 (paper Figure 7)"
    page: 7
    bbox_norm: [0.4902, 0.0474, 0.9448, 0.2676]
    strategy: manual
    curated: true
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/black-2024-pi0-a-vision-language-action-flow-model/fig08.png
    raw: raw/papers/black-2024-pi0-a-vision-language-action-flow-model-figures/fig08.png
    caption: "언어 지시 따르기 평가 과제 3종. 식탁 치우기, 상 차리기, 장바구니 담기 (paper Figure 8)"
    page: 8
    bbox_norm: [0.0697, 0.0225, 0.5, 0.1859]
    strategy: caption-region
    curated: false
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/black-2024-pi0-a-vision-language-action-flow-model/fig09.png
    raw: raw/papers/black-2024-pi0-a-vision-language-action-flow-model-figures/fig09.png
    caption: "언어 지시 따르기 결과. 사람 전문가(-human)나 high-level VLM(-HL)이 중간 지시를 줄 때 π0는 크게 오르지만, VLM 초기화가 없는 π0-small은 그 이득을 받지 못한다 (paper Figure 9)"
    page: 8
    bbox_norm: [0.5, 0.0606, 0.9298, 0.2336]
    strategy: caption-region
    curated: true
  - id: fig10
    label: Figure 10
    kind: figure
    file: assets/black-2024-pi0-a-vision-language-action-flow-model/fig10.png
    raw: raw/papers/black-2024-pi0-a-vision-language-action-flow-model-figures/fig10.png
    caption: "fine-tuning 평가 과제. pre-training과 가까운 것(그릇 쌓기, 수건 개기)부터 새 요소가 들어간 것(전자레인지), 완전히 새로운 것(키친타월 교체, Franka 서랍 정리)까지 (paper Figure 10)"
    page: 9
    bbox_norm: [0.07, 0.0606, 0.5718, 0.2854]
    strategy: caption-region
    curated: false
  - id: fig11
    label: Figure 11
    kind: figure
    file: assets/black-2024-pi0-a-vision-language-action-flow-model/fig11.png
    raw: raw/papers/black-2024-pi0-a-vision-language-action-flow-model-figures/fig11.png
    caption: "데이터량별 fine-tuning 결과. π0는 적은 데이터로도 쉬운 과제를 배우고, pre-training을 거친 쪽이 scratch보다 대체로 앞선다 (paper Figure 11)"
    page: 10
    bbox_norm: [0.1122, 0.0606, 0.8878, 0.3991]
    strategy: caption-region
    curated: false
  - id: fig12
    label: Figure 12
    kind: figure
    file: assets/black-2024-pi0-a-vision-language-action-flow-model/fig12.png
    raw: raw/papers/black-2024-pi0-a-vision-language-action-flow-model-figures/fig12.png
    caption: "복잡하고 장시간 걸리는 과제 6종. 고정형/이동형 빨래 개기, 실제 점심 식탁 치우기, 상자 조립, 계란 담기, 포장 용기 채우기 (paper Figure 12)"
    page: 10
    bbox_norm: [0.0702, 0.4474, 0.6449, 0.7038]
    strategy: caption-region
    curated: false
  - id: fig13
    label: Figure 13
    kind: figure
    file: assets/black-2024-pi0-a-vision-language-action-flow-model/fig13.png
    raw: raw/papers/black-2024-pi0-a-vision-language-action-flow-model-figures/fig13.png
    caption: "복잡 과제 post-training 결과. pre-training을 거친 π0(fine-tuned)가 모든 과제에서 최대 점수의 50%를 넘고 scratch와 zero-shot ablation을 대체로 앞선다 (paper Figure 13)"
    page: 11
    bbox_norm: [0.0702, 0.0606, 0.5, 0.3877]
    strategy: caption-region
    curated: true
  - id: fig14
    label: Figure 14
    kind: figure
    file: assets/black-2024-pi0-a-vision-language-action-flow-model/fig14.png
    raw: raw/papers/black-2024-pi0-a-vision-language-action-flow-model-figures/fig14.png
    caption: "flow matching timestep 샘플링 분포. 노이즈가 큰 낮은 τ를 강조하는 shifted beta 분포이며 cutoff s=0.999 위로는 뽑지 않는다 (paper Figure 14, Appendix B)"
    page: 16
    bbox_norm: [0.1215, 0.0606, 0.4487, 0.2461]
    strategy: caption-region
    curated: false
  - id: tab01
    label: Table I
    kind: table
    file: assets/black-2024-pi0-a-vision-language-action-flow-model/tab01.png
    raw: raw/papers/black-2024-pi0-a-vision-language-action-flow-model-figures/tab01.png
    caption: "RTX 4090 추론 시간 분해. image encoder 14ms, observation forward 32ms, flow 10스텝 27ms, 합계는 on-board 73ms와 off-board 86ms (paper Table I, Appendix D)"
    page: 16
    bbox_norm: [0.5629, 0.6884, 0.8668, 0.8029]
    strategy: table-region
    curated: true
---

## 한 줄 요약 (One-line Summary)

π0는 PaliGemma 3B VLM에 300M짜리 action expert를 붙여 flow matching으로 연속 action을 내는 3.3B VLA다. 7종 로봇과 68개 과제, 1만 시간이 넘는 데이터로 pre-training한 뒤 post-training으로 특화하면 빨래 개기처럼 수십 분 걸리는 과제까지 최대 50Hz로 해낸다.

## 1. 자료 정보 (Document Information)

- **제목**: π0: A Vision-Language-Action Flow Model for General Robot Control
- **저자**: Kevin Black, Noah Brown, Danny Driess 외 24인. 전원 Physical Intelligence 소속이며 Chelsea Finn, Sergey Levine, Karol Hausman, Brian Ichter, Karl Pertsch, Quan Vuong 등 RT-1과 RT-2, OpenVLA 계보의 연구자가 대거 포함돼 있다
- **발표**: arXiv 2410.24164v1 (2024-10-31)
- **프로젝트**: https://www.pi.website/blog/pi0 (블로그 해설 + 데모 영상), 구현은 이후 [[physical-ai/physical-intelligence-openpi]]로 공개
- **한 줄 성격**: RT-2와 OpenVLA가 연 "VLM을 fine-tune해 VLA를 만든다" 레시피에서 action 표현만 갈아 끼운 모델. 이산 토큰 대신 flow matching으로 연속 action chunk를 뽑아 고빈도 dexterous manipulation을 실제로 해낸다.

## 2. 주요 기여 (Key Contributions)

RT-2나 OpenVLA는 action을 이산 토큰으로 바꿔 next-token prediction으로 뱉는다. 이 방식은 토큰을 하나씩 자동회귀로 뽑아야 해서 느리다. 정교한 동작에 필요한 연속값 해상도도 부족하다. 빨래 개기나 상자 조립처럼 초당 수십 번 손끝을 조정해야 하는 과제에는 그대로 쓸 수 없다. 기존 VLA가 손대지 못한 이 지점이 π0의 출발점이다.

π0는 action 출력부를 flow matching으로 바꿔 이 문제를 푼다. flow matching은 noise에서 데이터로 향하는 vector field를 학습해 샘플을 만드는 생성 기법이다. diffusion의 변형에 해당한다. 여기에 action chunking을 얹어 미래 50스텝치 action을 한 번에 낸다. 그 결과 control frequency가 최대 50Hz까지 올라간다. control frequency는 로봇이 1초에 몇 번 새로운 action을 갱신하는지를 뜻한다.

구조 면에서는 action expert라는 별도 가중치 묶음을 도입했다. VLM backbone은 이미지와 텍스트를 맡고 로봇 고유 입출력인 proprioception과 action은 이 action expert가 맡는다. proprioception은 관절 각도 같은 로봇 자신의 상태 감각 입력이다. Transfusion이 하나의 Transformer에 여러 목적함수를 태운 것에서 출발했는데 로봇 쪽 토큰에 가중치를 분리해 주니 성능이 더 좋았다.

학습 레시피도 기여의 절반이다. LLM의 pre-training과 post-training 분리를 로봇에 그대로 옮겼다. 다양하지만 품질이 들쭉날쭉한 대규모 데이터로 먼저 폭을 만들고 정제된 소량 데이터로 숙련도를 붙인다. 저자들은 이 조합이 필수라고 본다. 고품질 데이터만 쓰면 실수에서 회복하는 법을 못 배운다. 반대로 pre-training 데이터만으로는 유창하게 해내지 못한다.

7종 로봇 구성과 68개 과제에서 903M timestep을 모았다. 여기에 OXE 전체를 더해 1만 시간 넘는 로봇 데이터로 학습했다. 이전 공개 연구가 다룬 규모를 넘어서는 양이다. 저자들은 end-to-end robot learning 문헌에서 가장 긴 dexterous 과제를 시연했다고 주장한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### backbone과 action expert

π0의 몸통은 PaliGemma다. SigLIP 400M vision encoder와 Gemma 2.6B language model로 이뤄진 3B 오픈소스 VLM이다. 크기와 성능의 균형이 실시간 제어에 알맞아 골랐다. 저자들은 이 선택이 편의에 가깝고 프레임워크 자체는 어떤 pre-trained VLM과도 붙는다고 못 박는다.

여기에 scratch로 초기화한 300M action expert를 더해 전체 3.3B가 된다. 표준 late-fusion VLM 레시피대로 image encoder가 이미지를 언어 토큰과 같은 임베딩 공간으로 보내고, 그 뒤에 로봇 전용 입출력이 붙는 형태다. 가중치를 두 묶음으로 나눈 구성은 전문가가 둘인 mixture-of-experts와 같다. 첫 번째 묶음이 이미지와 텍스트를, 두 번째 묶음이 상태와 action을 처리한다.

### flow matching으로 action chunk 만들기

모델이 학습하는 것은 p(A_t|o_t)다. A_t는 미래 H스텝의 action chunk이고 실험에서는 H=50을 쓴다. observation o_t는 RGB 이미지 2~3장, 언어 지시, 관절 각도 벡터 q_t로 이뤄진다.

학습은 conditional flow matching loss로 한다. noise ε을 뽑아 A_t^τ = τA_t + (1−τ)ε로 노이즈를 섞은 action을 만들고, 네트워크 출력 v_θ가 denoising vector field u = ε − A_t를 맞히게 한다. 확률 경로는 선형 가우시안 형태이며 고해상도 이미지와 영상 생성에서 검증된 방식이다. action expert 안에서는 attention mask를 양방향으로 열어 action 토큰끼리 서로를 다 본다.

flow matching timestep τ는 균등분포가 아니라 낮은 쪽(노이즈가 큰 쪽)을 강조하는 beta 분포에서 뽑고, s=0.999 위로는 아예 뽑지 않는다. 노이즈가 거의 없는 구간에서는 모델이 항등함수만 배우면 되기 때문이다.

추론은 τ=0의 순수 noise에서 시작해 Euler 적분으로 τ=1까지 밀어 올린다. 스텝 크기 δ=0.1로 10번이면 끝난다. 이때 observation 부분의 attention key와 value는 캐시해 두고 action 토큰에 해당하는 suffix만 매 스텝 다시 계산한다.

### cross-embodiment 데이터를 한 모델에 담기

로봇마다 관절 수가 다르니 configuration과 action 벡터는 데이터셋에서 가장 큰 로봇 기준인 18차원으로 잡았다. 6-DoF 팔 둘과 그리퍼 둘, 이동 베이스, 수직 구동 몸통이 여기에 담긴다. 차원이 모자란 로봇은 0으로 패딩하고 카메라가 3대에 못 미치면 빈 이미지 슬롯을 마스킹한다.

데이터 비중은 해당 로봇-과제 조합의 샘플 수 n을 n^0.43으로 가중한다. 이 가중이 빨래 개기처럼 과대표집된 조합을 눌러 준다.

### pre-training과 post-training

pre-training mixture의 9.1%가 OXE와 Bridge v2, DROID 같은 공개 데이터다. 카메라 1~2대에 2~10Hz 저빈도 제어라 정교함은 떨어지지만 객체와 환경의 폭이 넓다. 나머지는 자체 수집분 903M timestep으로, single-arm이 106M, dual-arm이 797M이다.

여기서 "과제"의 정의가 선행 연구와 다르다는 점을 저자들이 강조한다. 보통은 명사와 동사 조합 하나("컵을 집어라")를 한 과제로 세지만, π0의 bussing 과제 하나에는 온갖 접시와 컵과 수저를 통에 넣고 각종 쓰레기를 골라내는 행동이 전부 들어간다. 그래서 68이라는 숫자가 실제 행동의 폭을 과소평가한다.

post-training은 과제별 정제 데이터로 특화하는 단계다. 필요한 양은 과제 난도에 따라 5시간에서 100시간 이상까지 벌어진다.

### 언어와 high-level policy

식탁 치우기처럼 의미 판단이 필요한 과제에는 high-level VLM policy를 얹는다. "식탁을 치워라"를 "냅킨을 집어라", "냅킨을 쓰레기통에 넣어라" 같은 중간 지시로 쪼개 π0에 넘기는 방식이다. SayCan 계열의 LLM/VLM planning과 같은 구도다.

### 비교용 baseline과 추론 비용

VLM 초기화의 효과를 재려고 π0-small을 따로 학습했다. 470M 규모에 VLM 초기화가 없다. 언어는 DistilBERT로 인코딩하고 action expert는 Gemma 대신 DiT 구조를 써서 encoder-decoder식 cross-attention으로 붙는다.

추론 비용은 RTX 4090 기준으로 카메라 3대일 때 image encoder 14ms, observation forward pass 32ms, flow 10스텝 27ms다. 합치면 on-board 73ms이고 무선으로 off-board 추론을 하면 지연 13ms가 붙어 86ms가 된다. chunk를 통째로 뽑으므로 매번 추론할 필요는 없다. 20Hz인 UR5e와 Franka는 16개 action을 쓴 뒤 0.8초마다, 50Hz 로봇들은 25개를 쓴 뒤 0.5초마다 다시 부른다. action을 여러 추론 결과에서 섞는 temporal ensembling은 초기에 시도했다가 성능이 떨어져 결국 쓰지 않았다. chunk는 open-loop로 실행한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### pre-training만 한 base model의 zero-shot 성능

post-training 없이 shirt folding, bussing easy, bussing hard, grocery bagging, toast out of toaster 다섯 과제를 언어 지시로만 시켰다. 채점은 과제당 10 episode 평균이며 부분 성공에 부분 점수를 준다.

비교 대상은 OpenVLA(7B)와 Octo(93M)를 같은 mixture로 학습시킨 것, 그리고 UR5e 데이터로만 fine-tune한 OpenVLA다. 학습 시간 제약 때문에 baseline은 π0만큼 오래 학습시키지 못했다. 그래서 저자들은 16만 스텝만 학습한 "parity" 버전 π0도 함께 올렸다.

결과는 전 과제에서 π0가 앞선다. shirt folding과 쉬운 bussing은 거의 만점에 가깝고 연산량을 맞춘 parity 버전조차 모든 baseline을 넘는다. π0-small마저 OpenVLA와 Octo보다 낫다. OpenVLA가 뒤처지는 이유는 자동회귀 이산화 구조가 action chunk를 지원하지 않기 때문이다. Octo는 chunk는 되지만 표현력이 모자란다. 큰 모델과 flow matching이나 diffusion 같은 복잡한 분포 모델링이 함께 있어야 한다는 근거로 읽힌다.

### 언어 지시 따르기

bussing과 table setting, grocery bagging 세 과제에서 약 2초 단위로 쪼갠 언어 지시를 얼마나 따르는지 쟀다. 조건은 전체 과제 설명만 주는 flat, 사람 전문가가 중간 지시를 주는 human, high-level VLM이 자율로 주는 HL이다.

π0의 지시 따르기 정확도가 π0-small보다 확연히 높다. 더 중요한 건 그 차이가 어디서 드러나느냐다. π0는 사람 전문가의 중간 지시를 받으면 성능이 크게 오르고 자율 high-level policy로도 상당 부분 이득을 챙긴다. 반면 π0-small은 지시를 제대로 못 따라서 high-level 도움을 줘도 별로 오르지 않는다. VLM pre-training이 쌓은 언어 능력이 자율 성능으로 이어진다고 저자들은 해석한다.

### 새 dexterous 과제 학습

pre-training에 없던 과제로 fine-tune해 본다. 과제는 pre-training과의 거리에 따라 tier를 나눴다. 그릇 쌓기와 수건 개기는 쉬운 등급, 전자레인지에 반찬통 넣기는 물체 조작은 익숙하나 전자레인지가 처음이라 중간 등급, 키친타월 교체와 Franka 서랍 정리는 어려운 등급이다.

비교 대상은 공개 체크포인트에서 fine-tuning한 OpenVLA와 Octo, 소량 데이터 전용으로 설계된 ACT와 Diffusion Policy다. π0는 pre-trained에서 fine-tune한 것과 scratch에서 학습한 것을 둘 다 올렸다.

π0가 대체로 앞선다. 기존 모델 중에서는 목표 과제만으로 scratch 학습한 쪽이 가장 강하다. 그만큼 기존 접근에서는 pre-training을 활용하기가 어려웠다. pre-training 효과는 데이터가 적을수록 커서 반찬통 과제에서 5시간짜리는 baseline과 비슷하지만 1시간짜리는 확실히 앞선다. pre-training 데이터와 가까운 과제일수록 이득이 크고 때로 2배까지 벌어진다.

### 복잡한 다단계 과제

빨래 개기(고정형과 이동형), 건조기 비우기, 실제 점심 식탁 치우기, 상자 조립, 계란 담기, 포장 용기 채우기가 마지막 대상이다. 하나에 5~20분씩 걸리는 과제들이다. 빨래는 구겨진 채 통에 담겨 시작하므로 어떤 초기 상태에도 대응해야 한다. 식탁 치우기는 처음 보는 물체가 뒤엉킨 상황에서 큰 접시는 그리퍼를 비틀어 잡고 유리컵은 조심히 다루는 식의 분별이 필요하다.

pre-training을 거친 π0가 모든 과제에서 최대 점수의 50%를 넘겼고 ablation 대비 우위는 어려운 과제일수록 커진다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

데이터 구성 원칙은 아직 없다. 손에 넣을 수 있는 데이터를 다 합쳤을 뿐, 어떤 종류를 더 넣어야 좋은지와 어떻게 가중해야 하는지는 열린 문제로 남았다.

평가 과제 전부가 안정적으로 되는 것도 아니다. 거의 완벽한 성능에 도달하려면 어떤 데이터가 얼마나 필요한지 예측할 방법이 없다.

- **positive transfer가 어디까지 미치는지 아직 모른다**: 서로 다른 과제와 로봇을 섞었을 때 실제로 얼마나 도움이 되는지, 특히 자율주행과 navigation, legged locomotion처럼 성격이 크게 다른 영역까지 이 보편성이 이어질지는 후속 과제다.
- **아직은 프로토타입이다**: 저자들 스스로 π0를 robot foundation model로 가는 디딤돌이자 프로토타입으로 규정한다.

## 6. 관련 연구 (Related Work)

- **VLA 계보**: RT-2가 VLM을 fine-tune해 action을 언어 토큰으로 내는 방식을 처음 보였고 OpenVLA가 그것을 오픈소스로 재현했다. π0는 같은 backbone 전략을 쓰되 action 표현을 이산 토큰에서 flow matching으로 바꿨다.
- **backbone**: PaliGemma. 3B 크기가 실시간 제어에 유리해 채택했다.
- **생성 모델링**: flow matching과 rectified flow가 이론 토대다. Transfusion에서 하나의 Transformer에 flow matching loss와 cross-entropy를 동시에 태우는 구성을 가져왔다. 고해상도 이미지 생성의 rectified flow 결과가 선형 가우시안 경로 선택의 근거다.
- **action chunking과 dexterous manipulation**: ACT가 action chunking을, Diffusion Policy가 diffusion 기반 visuomotor policy를 제시했다. π0는 둘의 아이디어를 VLM 위로 올린 셈이며 실험에서 두 방법을 baseline으로 쓴다.
- **cross-embodiment**: Open X-Embodiment가 여러 로봇 데이터를 한 모델에 합치는 흐름을 만들었고 π0의 pre-training mixture에 그대로 들어간다.
- **high-level planning**: SayCan 계열의 LLM/VLM planning을 high-level policy로 붙였다.

## 7. 용어집 (Glossary)

이 자료 고유 용어만 정리한다. policy, observation, proprioception, fine-tuning 등 도메인 공통 용어는 [[overviews/glossary-physical-ai]]와 [[overviews/glossary-llms]]에 위임한다.

- **π0 (pi-zero)**: PaliGemma 3B에 300M action expert를 붙인 3.3B VLA. flow matching으로 연속 action chunk를 낸다.
- **action expert**: 로봇 상태와 action 토큰만 처리하는 별도 가중치 묶음. VLM backbone과 나란히 놓인 두 번째 전문가에 해당한다.
- **flow matching**: noise에서 데이터로 가는 vector field를 회귀로 학습해 샘플을 만드는 생성 기법. diffusion의 변형이며 π0는 conditional flow matching loss를 쓴다.
- **action chunk**: 미래 H스텝 action을 한 묶음으로 예측한 것. π0는 H=50을 쓰고 open-loop로 실행한다.
- **π0-small**: VLM 초기화 없이 470M로 학습한 비교용 모델. DistilBERT 언어 인코더와 DiT action expert를 쓴다.
- **PaliGemma**: SigLIP 400M + Gemma 2.6B로 이뤄진 3B 오픈소스 VLM. π0의 backbone.
- **OXE Magic Soup**: OXE에서 추린 부분집합으로 pre-training mixture에 5% 가중으로 들어간다.
- **temporal ensembling**: 여러 추론 시점의 action chunk를 겹쳐 평균 내는 기법. ACT에서 왔지만 π0에서는 성능을 떨어뜨려 쓰지 않는다.

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 1 | π0 전체 개요 (데이터 → VLM+action expert → 3가지 활용) | caption-region | ★ wiki 권장 (concept) |
| fig02 | 2 | mobile manipulator 빨래 개기 장면 | caption-region | (선택) |
| fig03 | 4 | 아키텍처 (SigLIP+Gemma → action expert → action chunk) | caption-region | ★ wiki 권장 (architecture) |
| fig04 | 5 | pre-training mixture 파이차트 (가중치와 스텝 수) | caption-region | ★ wiki 권장 (data) |
| fig05 | 6 | 학습에 쓴 로봇 7종 | caption-region | ★ wiki 권장 (setup) |
| fig06 | 7 | zero-shot 평가 과제 5종 | caption-region | (선택) |
| fig07 | 7 | zero-shot 결과 막대그래프 (vs OpenVLA와 Octo) | manual | ★ wiki 권장 (result) |
| fig08 | 8 | 언어 평가 과제 3종 | caption-region | (선택) |
| fig09 | 8 | 언어 평가 결과 (flat/human/HL) | caption-region | ★ wiki 권장 (result) |
| fig10 | 9 | fine-tuning 평가 과제 | caption-region | (선택) |
| fig11 | 10 | 데이터량별 fine-tuning 결과 | caption-region | (선택) |
| fig12 | 10 | 복잡하고 장시간 걸리는 과제 6종 | caption-region | (선택) |
| fig13 | 11 | 복잡 과제 post-training 결과 | caption-region | ★ wiki 권장 (result) |
| fig14 | 16 | flow matching timestep 샘플링 분포 (Appendix B) | caption-region | (선택) |
| tab01 | 16 | RTX 4090 추론 시간 분해 (Appendix D) | table-region | ★ wiki 권장 (result) |

**큐레이션 확정(Step 3.5)**: fig01, fig03, fig04, fig05, fig07, fig09, fig13, tab01 → `curated: true`. 나머지 7개는 아카이브에 보존한다.

**용어집 확장(Step 3.5)**: `flow matching`과 `action chunking`, `action expert` 세 항목을 [[overviews/glossary-physical-ai]] 용어 표에 추가했다.
