---
title: "RT-2: Vision-Language-Action Models Transfer Web Knowledge to Robotic Control"
type: paper
year: 2023
category: physical-ai
raw_path: raw/papers/brohan-2023-rt-2-vision-language-action-models-transfer-web.pdf
raw_filename: "brohan-2023-rt-2-vision-language-action-models-transfer-web.pdf"
source_collection: external
authors: "Anthony Brohan 외 (Google DeepMind, 저자 알파벳순; 교신저자 Yevgen Chebotar·Tianhe Yu·Karol Hausman; 기여 목록은 Appendix A)"
arxiv_id: "2307.15818"
url: "https://robotics-transformer2.github.io"
tags: [physical-ai, vla, manipulation, robot-learning]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/brohan-2023-rt-2-vision-language-action-models-transfer-web/fig01.png
    raw: raw/papers/brohan-2023-rt-2-vision-language-action-models-transfer-web-figures/fig01.png
    caption: "RT-2 개요 — 로봇 액션을 텍스트 토큰으로 표현해 인터넷 규모 VQA와 함께 co-fine-tune하고, 추론 때 de-tokenize해 closed-loop 제어 (paper Figure 1)"
    page: 2
    bbox_norm: [0.1007, 0.0932, 0.9287, 0.3106]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/brohan-2023-rt-2-vision-language-action-models-transfer-web/fig02.png
    raw: raw/papers/brohan-2023-rt-2-vision-language-action-models-transfer-web-figures/fig02.png
    caption: "RT-2가 일반화하는 실세계 상황 15종 — 추론·기호 이해·인물 인식 (move banana to Germany 등) (paper Figure 2)"
    page: 5
    bbox_norm: [0.0986, 0.1883, 0.9014, 0.6349]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/brohan-2023-rt-2-vision-language-action-models-transfer-web/fig03.png
    raw: raw/papers/brohan-2023-rt-2-vision-language-action-models-transfer-web-figures/fig03.png
    caption: "일반화 평가 시나리오 — (a) unseen objects (b) unseen backgrounds (c) unseen environments (paper Figure 3)"
    page: 7
    bbox_norm: [0.0783, 0.6139, 0.908, 0.7492]
    strategy: caption-region
    curated: false
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/brohan-2023-rt-2-vision-language-action-models-transfer-web/fig04.png
    raw: raw/papers/brohan-2023-rt-2-vision-language-action-models-transfer-web-figures/fig04.png
    caption: "seen·unseen 전반 성능 막대그래프 — RT-2 두 종 vs RT-1·MOO·VC-1·R3M (paper Figure 4)"
    page: 8
    bbox_norm: [0.0947, 0.2349, 0.9053, 0.3832]
    strategy: caption-region
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/brohan-2023-rt-2-vision-language-action-models-transfer-web/fig05.png
    raw: raw/papers/brohan-2023-rt-2-vision-language-action-models-transfer-web-figures/fig05.png
    caption: "Language-Table 시뮬레이션의 실세계 OOD 동작 (새 밀기 태스크·처음 보는 객체 targeting) (paper Figure 5)"
    page: 9
    bbox_norm: [0.1209, 0.0939, 0.56, 0.1874]
    strategy: caption-region
    curated: false
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/brohan-2023-rt-2-vision-language-action-models-transfer-web/fig06.png
    raw: raw/papers/brohan-2023-rt-2-vision-language-action-models-transfer-web-figures/fig06.png
    caption: "(6a) emergent skill 평가 비교 (6b) 파라미터 수·학습 전략 ablation 막대그래프 (paper Figure 6)"
    page: 10
    bbox_norm: [0.0988, 0.0939, 0.9024, 0.2949]
    strategy: caption-region
    curated: true
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/brohan-2023-rt-2-vision-language-action-models-transfer-web/fig07.png
    raw: raw/papers/brohan-2023-rt-2-vision-language-action-models-transfer-web-figures/fig07.png
    caption: "chain-of-thought 롤아웃 — plan과 action을 함께 생성 (즉석 망치로 돌 고르기 등) (paper Figure 7)"
    page: 11
    bbox_norm: [0.0947, 0.0939, 0.9119, 0.4108]
    strategy: caption-region
    curated: true
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/brohan-2023-rt-2-vision-language-action-models-transfer-web/fig08.png
    raw: raw/papers/brohan-2023-rt-2-vision-language-action-models-transfer-web-figures/fig08.png
    caption: "emergent 능력 평가 장면 3범주 — reasoning·symbol understanding·human recognition (paper Figure 8, Appendix)"
    page: 22
    bbox_norm: [0.0986, 0.0939, 0.902, 0.385]
    strategy: caption-region
    curated: false
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/brohan-2023-rt-2-vision-language-action-models-transfer-web/fig09.png
    raw: raw/papers/brohan-2023-rt-2-vision-language-action-models-transfer-web-figures/fig09.png
    caption: "Language-Table 실패 사례 — unseen object dynamics 일반화 실패 + 전체 성능 Table 4 (paper Figure 9, Appendix)"
    page: 23
    bbox_norm: [0.0871, 0.2956, 0.911, 0.5766]
    strategy: caption-region
    curated: false
  - id: fig10
    label: Figure 10
    kind: figure
    file: assets/brohan-2023-rt-2-vision-language-action-models-transfer-web/fig10.png
    raw: raw/papers/brohan-2023-rt-2-vision-language-action-models-transfer-web-figures/fig10.png
    caption: "chain-of-thought 추가 롤아웃 예시 (paper Figure 10, Appendix)"
    page: 25
    bbox_norm: [0.0986, 0.3508, 0.9015, 0.6235]
    strategy: caption-region
    curated: false
  - id: tab01
    label: Table 1
    kind: table
    file: assets/brohan-2023-rt-2-vision-language-action-models-transfer-web/tab01.png
    raw: raw/papers/brohan-2023-rt-2-vision-language-action-models-transfer-web-figures/tab01.png
    caption: "Table 1 | Performance on the simulated Language-Table tasks ( Lynch and Ser- manet , 2020 )."
    page: 9
    bbox_norm: [0.5719, 0.1031, 0.883, 0.1869]
    strategy: table-region
    curated: false
  - id: tab02
    label: Table 2
    kind: table
    file: assets/brohan-2023-rt-2-vision-language-action-models-transfer-web/tab02.png
    raw: raw/papers/brohan-2023-rt-2-vision-language-action-models-transfer-web-figures/tab02.png
    caption: "Table 2 | Natural language instructions used for evaluations testing controlled distribution shifts along the dimension of novel objects, novel environments, and novel backgrounds. For each category, we introduce evaluation settings with smaller distribution shifts as well as larger distribution shi"
    page: 26
    bbox_norm: [0.1537, 0.0944, 0.8463, 0.8646]
    strategy: table-region
    curated: false
  - id: tab03
    label: Table 3
    kind: table
    file: assets/brohan-2023-rt-2-vision-language-action-models-transfer-web/tab03.png
    raw: raw/papers/brohan-2023-rt-2-vision-language-action-models-transfer-web-figures/tab03.png
    caption: "Table 3 | Natural language instructions used for quantitative emergent evalutions."
    page: 22
    bbox_norm: [0.1339, 0.4326, 0.8661, 0.8389]
    strategy: table-region
    curated: false
  - id: tab04
    label: Table 4
    kind: table
    file: assets/brohan-2023-rt-2-vision-language-action-models-transfer-web/tab04.png
    raw: raw/papers/brohan-2023-rt-2-vision-language-action-models-transfer-web-figures/tab04.png
    caption: "Table 4 | Overall performance of two instantiations of RT-2 and baselines across seen training tasks as well as unseen evaluations measuring generalization to novel objects, novel backgrounds, and novel environments."
    page: 23
    bbox_norm: [0.0959, 0.7363, 0.9004, 0.8606]
    strategy: table-region
    curated: false
  - id: tab05
    label: Table 5
    kind: table
    file: assets/brohan-2023-rt-2-vision-language-action-models-transfer-web/tab05.png
    raw: raw/papers/brohan-2023-rt-2-vision-language-action-models-transfer-web-figures/tab05.png
    caption: "Table 5 | Performance of RT-2 and baselines on quantitative emergent evaluations."
    page: 24
    bbox_norm: [0.0941, 0.0708, 0.9084, 0.278]
    strategy: table-region
    curated: false
  - id: tab06
    label: Table 6
    kind: table
    file: assets/brohan-2023-rt-2-vision-language-action-models-transfer-web/tab06.png
    raw: raw/papers/brohan-2023-rt-2-vision-language-action-models-transfer-web-figures/tab06.png
    caption: "Table 6 | Ablations of RT-2 showcasing the impact of parameter count and training strategy on generalization."
    page: 24
    bbox_norm: [0.1442, 0.4148, 0.852, 0.5274]
    strategy: table-region
    curated: false
---

## 한 줄 요약 (One-line Summary)

RT-2는 인터넷 규모로 학습한 vision-language model을 로봇 trajectory 데이터와 함께 co-fine-tune해 로봇 액션을 직접 출력하도록 만든 모델이다. trajectory는 observation과 action이 시간순으로 이어진 실행 기록이다. 액션을 텍스트 토큰으로 적어 자연어 토큰과 똑같이 다루는 게 핵심이다. 이렇게 만든 모델 계열을 vision-language-action(VLA) 모델이라 부른다. pre-training은 대규모 일반 데이터로 모델의 기반 능력을 먼저 학습하는 단계인데, 웹 pre-training 덕분에 로봇 데이터에 없던 객체·지시·추론으로 일반화가 크게 늘고 emergent 능력이 나타난다.

## 1. 자료 정보 (Document Information)

- 제목: RT-2: Vision-Language-Action Models Transfer Web Knowledge to Robotic Control
- 저자: Google DeepMind (저자 알파벳순, 교신저자 Yevgen Chebotar·Tianhe Yu·Karol Hausman)
- arXiv: 2307.15818v1 (2023-07-28), 본문 표기 날짜 2023-8-1, 총 26페이지(부록 포함)
- 프로젝트 페이지: robotics-transformer2.github.io
- 모델 인스턴스: RT-2-PaLI-X(5B·55B), RT-2-PaLM-E(12B), 시뮬레이션용 RT-2-PaLI-3B

## 2. 주요 기여 (Key Contributions)

VLA라는 범주를 세운 논문이다. 로봇 액션을 또 하나의 언어로 보고 텍스트 토큰으로 적으면, 이미 있는 VLM을 새 파라미터나 새 아키텍처 없이 그대로 파인튜닝해 policy로 쓸 수 있다. policy는 현재 observation을 받아 다음 action을 정하는 함수를 말한다. 처음부터 vision-language-action 구조를 설계하거나(Gato) VLM을 policy에 끼워 넣는(CLIPort) 기존 방식과 다르게, pre-training에 이미 들어간 막대한 연산을 그대로 물려받는다.

핵심 레시피는 co-fine-tuning이다. 로봇 데이터만으로 파인튜닝하는 대신 원래 웹 데이터를 배치에 계속 섞어 함께 학습한다. 이렇게 하면 모델이 웹에서 배운 추상적 시각 개념과 로봇의 저수준 액션에 동시에 노출된다. 일반화와 emergent 능력이 여기서 나온다.

6,000회 규모의 실세계 평가로 emergent 능력을 정량화했다. 로봇 데이터에 없던 기호 이해, 시각·수학·다국어 추론, 인물 인식을 측정 가능한 카테고리로 나눠 잰다.

55B 파라미터 모델을 실시간 closed-loop 제어에 올렸다. 저자들은 직접 폐루프 로봇 제어에 쓴 모델 중 이전보다 한 자릿수 이상 큰 규모라고 적었다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 액션을 텍스트로 적기

액션 인코딩은 RT-1(Brohan et al., 2022)의 이산화를 그대로 가져온다. 액션 공간은 end-effector의 6-DoF 변위(위치 3축·회전 3축), gripper 확장 정도, 에피소드 종료를 알리는 이산 명령으로 나뉜다. 종료 명령을 뺀 연속 차원은 각각 256개 bin으로 균등 이산화해 8개 정수로 표현한다. 파인튜닝 타깃은 이 정수들을 공백으로 이어붙인 한 문자열이다.

```
"terminate Δpos_x Δpos_y Δpos_z Δrot_x Δrot_y Δrot_z gripper_extension"
예: "1 128 91 241 5 101 127"
```

정수 bin을 어떤 토큰에 붙이느냐는 VLM의 토크나이저에 달렸다. PaLI-X는 1000까지의 정수마다 고유 토큰이 있어 bin을 해당 정수 토큰에 바로 연결한다. PaLM-E는 그런 표현이 없어서 가장 덜 쓰이는 토큰 256개를 액션 어휘로 덮어쓴다. 저자들은 이 방식을 symbol tuning의 일종으로 본다. 입력은 표준 VQA 형식 "Q: what action should the robot take to [task]? A:"이고 출력이 위 액션 문자열이다.

### co-fine-tuning

학습 배치마다 로봇 데이터와 웹 데이터의 비율을 조절하되 로봇 쪽 샘플링 가중을 높인다. RT-2-PaLI-X는 로봇 데이터가 학습 혼합의 약 50%, RT-2-PaLM-E는 약 66%를 차지한다. ablation에서 co-fine-tuning이 일반화를 크게 끌어올리는데 원래 웹 데이터를 계속 곁에 두면 파인튜닝 중에도 VLM이 pre-training에서 배운 개념을 덜 잊기 때문이다.

### output constraint

RT-2는 실제 로봇에서 실행할 유효한 액션 토큰을 내야 한다. 로봇 액션 태스크로 프롬프트되면 유효 액션 토큰만 샘플링하도록 디코딩 어휘를 제약한다. 일반 vision-language 태스크에서는 전체 자연어 토큰을 그대로 허용한다.

### 실시간 추론

수십억~수백억 파라미터 VLM은 데스크톱이나 온로봇 GPU로 폐루프 제어를 돌리기 어렵다. 대신 모델을 multi-TPU 클라우드 서비스에 배포하고 네트워크로 질의하는 프로토콜을 쓴다. 한 클라우드로 여러 로봇을 함께 서빙할 수도 있다. 가장 큰 55B RT-2-PaLI-X는 1–3Hz, 5B 버전은 약 5Hz로 돈다.

### backbone과 학습 (Appendix D·E)

PaLI-X는 이미지를 ViT-22B로 처리하고 32B encoder-decoder(UL2 계열, 50 layers)가 텍스트·이미지 임베딩을 함께 받아 auto-regressive하게 토큰을 낸다. PaLM-E-12B는 decoder-only LLM에 ViT-4B를 붙여 이미지·텍스트를 언어 토큰 공간으로 투영하는 완전 멀티모달 구조다. Language-Table용 PaLI-3B는 ViT-G/14(2B)와 UL2-3B를 쓴다. 학습은 next-token prediction 하나로 하며 이 손실이 로봇 학습의 behavior cloning 손실에 해당한다. RT-2-PaLI-X-55B는 lr 1e-3·batch 2048로 80K step, 5B는 같은 설정으로 270K step, PaLM-E-12B는 lr 4e-4·batch 512로 1M step 학습한다.

### 데이터 (Appendix B)

웹 데이터의 큰 축은 WebLI다. 109개 언어의 약 10B image-text 쌍을 cross-modal 유사도 상위 10%로 걸러 1B 예제로 쓰고 여기에 여러 captioning·VQA 데이터셋을 더한다. 로봇 데이터는 RT-1의 것을 그대로 쓴다. 로봇 13대로 17개월간 office kitchen에서 모은 시연이고 각 trajectory에 7종 스킬("Pick Object", "Move Object Near Object", "Place Object Upright", "Knock Object Over", "Open/Close Drawer", "Place into Receptacle" 등) 중 하나를 자연어 지시로 붙였다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 일반화 (약 6,000 trial, Table 4)

seen 태스크에서는 RT-2와 RT-1이 비슷하다(RT-2 91–93 vs RT-1 92). 차이는 일반화에서 벌어진다. unseen 평균이 RT-2-PaLI-X-55B와 RT-2-PaLM-E-12B 모두 62인데 RT-1은 32, MOO 35, VC-1 10, R3M 12다. 다음으로 좋은 RT-1·MOO 대비 약 2배, VC-1·R3M 대비 약 6배다.

| 모델 | Seen | Unseen 평균 |
|---|---|---|
| R3M | 45 | 12 |
| VC-1 | 63 | 10 |
| RT-1 | 92 | 32 |
| MOO | 75 | 35 |
| RT-2-PaLI-X-55B | 91 | 62 |
| RT-2-PaLM-E-12B | 93 | 62 |

PaLM-E판은 어려운 시나리오에서 앞서고 PaLI-X판은 쉬운 쪽에서 앞서, 평균은 같게 나온다.

### Language-Table 시뮬레이션 (Table 1)

open-source Language-Table 환경에서 작은 PaLI-3B를 co-fine-tune한 policy가 90±10을 낸다. LAVA 77, RT-1 74, BC-Zero 72를 크게 웃돈다. 다른 로봇·시뮬레이션에서도 VLM pre-training이 이득이라는 추가 근거다.

### emergent 능력 (Table 5)

emergent 능력을 세 범주로 나눈다. symbol understanding은 로봇 데이터에 없던 기호로 옮기는 능력("move apple to 3", "push coke can on top of heart")이다. reasoning은 시각 추론·수학("move X near the sum of two plus one")·다국어를 포함한다. human recognition은 "move the coke can to the person with glasses" 같은 인물 중심 지시다. 최고 성능 RT-2-PaLI-X는 평균 60으로 RT-1(17)의 3배를 넘는다. 더 작은 PaLM-E판이 수학 추론에서는 앞서는데 PaLM-E의 pre-training 혼합이 계산에 더 강한 모델을 만들었기 때문으로 본다.

### ablation (Table 6)

세 학습 방식(scratch·fine-tuning·co-fine-tuning)과 두 크기(5B·55B)를 비교한다. 아주 큰 모델을 scratch로 학습하면 5B에서도 처참하다(평균 9%). co-fine-tuning이 단순 fine-tuning보다, fine-tuning이 scratch보다 낫고 크기가 클수록 좋다. 55B co-fine-tuning이 평균 63%다.

### chain-of-thought 추론

PaLM-E판을 수백 gradient step만 추가로 파인튜닝해 "Plan" 단계를 넣게 한다. 데이터를 "Instruction: I'm hungry. Plan: pick rxbar chocolate. Action: 1 128 124 ..."처럼 자연어 계획 뒤에 액션 토큰이 오도록 증강한다. 이 계획 단계가 VQA(시각 추론)와 조작(액션 생성) 사이의 다리 역할을 한다. 정성적으로 더 복잡한 명령을 처리하는데 LLM·VLM을 planner로 쓰는 흐름과 저수준 policy를 한 VLA 안에 합칠 수 있다는 초기 근거다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

새 물리 동작 자체는 배우지 못한다. 웹 pre-training은 의미·시각 개념의 일반화를 넓히지만 로봇의 물리 스킬은 여전히 로봇 데이터 분포 안에 갇힌다. 모델이 하는 일은 아는 스킬을 새로운 방식으로 배치하는 것이다. 저자들은 데이터가 스킬 축에서 충분히 다양하지 않아서라고 보고 사람 영상 같은 새 데이터 수집 방식을 후속 방향으로 든다.

계산 비용도 높다. 고빈도 제어가 필요한 상황에서는 실시간 추론이 병목이 될 수 있어 quantization·distillation을 후속 과제로 짚는다. RT-2를 만들 재료가 되는 VLM 자체가 아직 소수라는 점도 한계로 든다. 오픈소스 모델이 늘고 상용 모델이 파인튜닝 API를 열기를 기대한다.

실패 사례(Appendix G)도 구체적이다. Language-Table에서 처음 보는 객체의 동역학에는 일반화하지 못한다(펜이 굴러 떨어지거나 바나나의 무게중심이 접촉점에서 멀 때). 이 밖에 특정 부위(손잡이) 잡기, 로봇 데이터에 없던 새 동작(수건으로 닦기·도구 사용), 정밀 동작(수건 접기), 여러 층의 간접 추론이 필요한 태스크에서 약했다.

## 6. 관련 연구 (Related Work)

VLM은 크게 두 계열이다. CLIP처럼 두 모달리티의 공통 임베딩을 배우는 representation 학습 계열과, {vision, text} → {text}로 자유 형식 텍스트를 내는 visual language model 계열(Flamingo·PaLI·PaLM-E)이다. RT-2는 후자를 쓴다. 언어를 생성하는 VLM을 쓰는 덕분에 언어 태스크와 액션 태스크가 모델 가중치를 완전히 공유하고 액션 전용 레이어를 따로 두지 않는다.

로봇 학습에서 pre-training은 오래된 주제다. 대개 visual representation(ImageNet 분류·robotics용 목적함수)이나 language model(지시 인코더·상위 planner)을 pre-training해 썼다. RT-2는 그 대신 세계에 대한 풍부하고 grounded된 지식을 담은 VLM을 쓴다. CLIPort와 MOO도 VLM을 조작 policy에 통합하지만 2D action space나 보정된 카메라 같은 구조 제약을 둔다. RT-2에는 그런 제약이 없다.

이 저장소 안에서 RT-2는 [[physical-ai/brohan-2022-rt-1-robotics-transformer-for-real-world]]의 직접 후속이다. RT-1의 로봇 데이터와 액션 이산화를 물려받되 backbone을 대형 VLM으로 키운 것이 RT-2다. [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation]]은 "pre-training된 모델을 로봇 데이터로 파인튜닝해 VLA를 만든다"는 계보(RT-1·RT-2·π0·OpenVLA)의 후속으로 스스로를 자리매김한다. policy와 world model의 결합은 [[physical-ai/hou-2026-world-model-for-robot-learning]] 서베이가, VLM backbone 축은 [[llms/cai-2026-vlm3-vision-language-models]]가 다룬다.

## 7. 용어집 (Glossary)

- **VLA (Vision-Language-Action)**: 이미지·언어 입력에서 로봇 액션을 내는 모델 계열. RT-2가 이 이름을 붙였다.
- **co-fine-tuning**: 로봇 데이터만 파인튜닝하지 않고 원래 웹 데이터를 배치에 섞어 함께 파인튜닝하는 방식. RT-2 일반화의 핵심.
- **action tokenization / discretization**: 연속 액션을 256 bin으로 이산화해 정수 토큰 문자열로 표현하는 것. RT-1에서 이어받았다.
- **symbol tuning**: 기존 토큰의 의미를 다른 것(여기서는 액션 bin)으로 덮어써 학습하는 기법. PaLM-E의 액션 어휘 구성에 쓰인다.
- **emergent capability**: 로봇 데이터에 없었는데 웹 pre-training에서 전이돼 나타난 능력. 기호 이해·추론·인물 인식.
- **chain-of-thought (CoT)**: 액션 앞에 자연어 "Plan" 단계를 두어 다단 추론을 유도하는 방식.
- **behavior cloning**: 시연을 그대로 모방하도록 학습하는 것. RT-2의 next-token prediction 손실이 여기 해당한다.
- **closed-loop control**: observation→action→새 observation을 반복하며 피드백으로 제어하는 것. RT-2는 de-tokenize한 액션으로 이 루프를 돈다.
- **PaLI-X / PaLM-E**: RT-2가 backbone으로 쓴 두 VLM. 각각 encoder-decoder(ViT-22B+32B), decoder-only(ViT-4B+LLM) 구조.
- **WebLI**: 109개 언어 약 10B image-text 쌍의 웹 데이터셋. 상위 10%를 걸러 1B로 co-fine-tuning에 쓴다.

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 2 | "Figure 1: RT-2 개요 (액션=언어, co-fine-tune, closed-loop)" | page-region | ★ wiki 권장 (concept/architecture) |
| fig03 | 5 | "Figure 2: 일반화 상황 15종 그리드" | page-region | ★ wiki 권장 (qualitative) |
| fig04 | 7 | "Figure 3: 일반화 평가 시나리오 (a/b/c)" | page-region | (선택) |
| fig06 | 8 | "Figure 4: seen·unseen 전반 성능 막대그래프" | page-region | ★ wiki 권장 (result) |
| fig07 | 9 | "Figure 5: Language-Table 실세계 OOD 동작" | page-region | (선택) |
| fig09 | 10 | "Figure 6: emergent skill + 크기·학습 ablation" | page-region | ★ wiki 권장 (result) |
| fig11 | 11 | "Figure 7: chain-of-thought 롤아웃" | page-region | ★ wiki 권장 (method) |
| fig12 | 22 | "Figure 8: emergent 평가 장면 3범주 (Appendix)" | page-region | (선택) |
| fig13 | 23 | "Figure 9: 실패 사례 + Table 4 (Appendix)" | page-region | (선택) |
| fig15 | 25 | "Figure 10: CoT 추가 롤아웃 (Appendix)" | page-region | (선택) |

> 추출 스크립트가 본문 인라인 "Figure N" 참조까지 잡아 `figures.json`에는 16개 항목이 들어 있다. 위 표는 실제 figure 캡션이 있는 페이지만 남긴 것이다(fig02·fig05·fig08·fig10·fig14·fig16은 인라인 참조로 인한 중복 페이지 캡처). page-region 전략상 각 PNG는 해당 페이지 전체이므로 wiki로 옮길 때 크롭을 권한다.
