---
title: "RT-2: Vision-Language-Action Models Transfer Web Knowledge to Robotic Control"
type: paper
year: 2023
category: physical-ai
source: brohan-2023-rt-2-vision-language-action-models-transfer-web.md
raw_path: /home/sguys99/project/ai-wiki/raw/papers/brohan-2023-rt-2-vision-language-action-models-transfer-web.pdf
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

## 요약 (Summary)

RT-2는 인터넷 규모로 학습한 vision-language model을 로봇 trajectory 데이터와 함께 co-fine-tune해 로봇 액션을 직접 출력하도록 만든 모델이다. trajectory는 observation과 action이 시간순으로 이어진 실행 기록이다. 핵심은 액션을 또 하나의 언어로 보는 것이다. 6-DoF end-effector 변위와 gripper 값을 이산화한 뒤 텍스트 토큰으로 적으면, 이미 있는 VLM을 새 파라미터 없이 그대로 파인튜닝해 policy로 쓸 수 있다. policy는 현재 observation을 받아 다음 action을 정하는 함수를 말한다. 이렇게 만든 모델 계열을 vision-language-action(VLA) 모델이라 부르고, 이 이름을 붙인 게 이 논문이다.

![[assets/brohan-2023-rt-2-vision-language-action-models-transfer-web/fig01.png]]
*Figure 1: RT-2 개요 — 액션을 텍스트로 적어 인터넷 규모 VQA와 함께 co-fine-tune, 추론 때 de-tokenize해 closed-loop 제어 (Brohan et al. 2023, p.2)*

이 접근의 값어치는 두 갈래로 나타난다. 로봇 데이터에 없던 객체·배경·환경으로 일반화가 크게 는다. pre-training은 대규모 일반 데이터로 모델의 기반 능력을 먼저 학습하는 단계인데, 로봇 데모에서 본 적 없는 emergent 능력(기호 이해·추론·인물 인식)도 웹 pre-training에서 전이돼 나타난다. RT-2의 물리 스킬 자체는 여전히 로봇 데이터 분포 안에 갇히지만 그 스킬을 새로운 방식으로 배치하는 능력이 붙는다.

## 주요 기여 (Key Contributions)

VLA라는 범주를 세웠다. 처음부터 vision-language-action 구조를 설계하거나(Gato) VLM을 policy에 끼워 넣는(CLIPort) 기존 방식과 달리, pre-training에 이미 들어간 막대한 연산을 그대로 물려받는다. 새 파라미터도, 새 아키텍처도 없다. 액션을 텍스트로 적고 VQA 데이터와 같은 형식으로 학습에 넣을 뿐이다.

핵심 레시피는 co-fine-tuning이다. 로봇 데이터만으로 파인튜닝하는 대신 원래 웹 데이터를 배치에 계속 섞어 함께 학습한다. 그래야 웹에서 배운 개념을 잊지 않고 일반화와 emergent 능력이 살아난다.

6,000회 규모의 실세계 평가로 emergent 능력을 정량화했고, 55B 파라미터 모델을 실시간 closed-loop 제어에 올렸다. 저자들은 직접 폐루프 제어에 쓴 모델 중 이전보다 한 자릿수 이상 큰 규모라고 적었다.

## 방법론 및 아키텍처 (Methodology and Architecture)

### 액션을 텍스트로 적기

액션 인코딩은 [[physical-ai/brohan-2022-rt-1-robotics-transformer-for-real-world|RT-1]]의 이산화를 그대로 가져온다. 액션 공간은 end-effector의 6-DoF 변위(위치 3축·회전 3축), gripper 확장 정도, 에피소드 종료를 알리는 이산 명령으로 나뉜다. 종료 명령을 뺀 연속 차원은 각각 256개 bin으로 균등 이산화해 8개 정수로 표현한다.

```
"terminate Δpos_x Δpos_y Δpos_z Δrot_x Δrot_y Δrot_z gripper_extension"
예: "1 128 91 241 5 101 127"
```

정수 bin을 어떤 토큰에 붙이느냐는 VLM의 토크나이저에 달렸다. PaLI-X는 1000까지의 정수마다 고유 토큰이 있어 bin을 해당 정수 토큰에 바로 연결한다. PaLM-E는 그런 표현이 없어서 가장 덜 쓰이는 토큰 256개를 액션 어휘로 덮어쓴다. 저자들은 이 방식을 symbol tuning의 일종으로 본다. 입력은 표준 VQA 형식 "Q: what action should the robot take to [task]? A:"이고 출력이 위 액션 문자열이다.

### co-fine-tuning과 output constraint

학습 배치마다 로봇 데이터와 웹 데이터의 비율을 조절하되 로봇 쪽 샘플링 가중을 높인다. RT-2-PaLI-X는 로봇 데이터가 학습 혼합의 약 50%, RT-2-PaLM-E는 약 66%를 차지한다. co-fine-tuning이 단순 파인튜닝보다 일반화를 크게 끌어올리는데 원래 웹 데이터를 곁에 두면 파인튜닝 중에도 VLM이 pre-training에서 배운 개념을 덜 잊기 때문이다.

RT-2는 실제 로봇에서 실행할 유효한 액션 토큰을 내야 한다. 로봇 액션 태스크로 프롬프트되면 유효 액션 토큰만 샘플링하도록 디코딩 어휘를 제약한다. 일반 vision-language 태스크에서는 전체 자연어 토큰을 그대로 허용한다.

### backbone과 실시간 추론

두 VLM을 backbone으로 쓴다. PaLI-X는 ViT-22B와 32B encoder-decoder(UL2 계열, 50 layers)로 이뤄지고, PaLM-E-12B는 decoder-only LLM에 ViT-4B를 붙인 완전 멀티모달 구조다. Language-Table 시뮬레이션에는 작은 PaLI-3B를 쓴다. 학습은 next-token prediction 하나로 하며 이 손실이 로봇 학습의 behavior cloning 손실에 해당한다.

수십억~수백억 파라미터 VLM은 데스크톱이나 온로봇 GPU로 폐루프 제어를 돌리기 어렵다. 대신 모델을 multi-TPU 클라우드에 배포하고 네트워크로 질의한다. 가장 큰 55B RT-2-PaLI-X는 1–3Hz, 5B 버전은 약 5Hz로 돈다.

## 결과 (Results)

### 일반화

약 6,000 trial로 잰다. seen 태스크에서는 RT-2와 RT-1이 비슷하다(RT-2 91–93 vs RT-1 92). 차이는 일반화에서 벌어진다. unseen 평균이 RT-2 두 종 모두 62인데 RT-1은 32, MOO 35, VC-1 10, R3M 12다. 다음으로 좋은 RT-1·MOO 대비 약 2배, VC-1·R3M 대비 약 6배다.

| 모델 | Seen | Unseen 평균 |
|---|---|---|
| R3M | 45 | 12 |
| VC-1 | 63 | 10 |
| RT-1 | 92 | 32 |
| MOO | 75 | 35 |
| RT-2-PaLI-X-55B | 91 | 62 |
| RT-2-PaLM-E-12B | 93 | 62 |

![[assets/brohan-2023-rt-2-vision-language-action-models-transfer-web/fig04.png]]
*Figure 4: seen·unseen 전반 성능 — RT-2 두 종이 일반화에서 baseline을 크게 앞선다 (Brohan et al. 2023, p.8)*

open-source Language-Table 시뮬레이션에서도 작은 RT-2-PaLI-3B가 90±10을 내 LAVA 77, RT-1 74, BC-Zero 72를 웃돈다. 다른 로봇·환경에서도 VLM pre-training이 이득이라는 추가 근거다.

### emergent 능력

emergent 능력을 세 범주로 나눠 잰다. symbol understanding은 로봇 데이터에 없던 기호로 옮기는 능력이다("move apple to 3"). reasoning은 시각·수학("move X near the sum of two plus one")과 다국어를 아우른다. human recognition은 "move the coke can to the person with glasses" 같은 인물 중심 지시다. 아래 그리드가 이런 상황을 한눈에 보여준다.

![[assets/brohan-2023-rt-2-vision-language-action-models-transfer-web/fig02.png]]
*Figure 2: RT-2가 일반화하는 실세계 상황 15종 — "move banana to Germany", "pick land animal" 등 로봇 데이터에 없던 지시 (Brohan et al. 2023, p.5)*

정량적으로도 격차가 크다. 최고 성능 RT-2-PaLI-X는 평균 60으로 RT-1(17)의 3배를 넘는다. 더 작은 PaLM-E판이 수학 추론에서는 앞서는데 PaLM-E의 pre-training 혼합이 계산에 더 강한 모델을 만들었기 때문으로 본다. 오른쪽 ablation은 학습 전략과 크기의 효과를 보여준다. scratch 학습은 5B에서도 처참하고(평균 9%), co-fine-tuning > fine-tuning > scratch 순서에 크기가 클수록 좋다. 55B co-fine-tuning이 평균 63%다.

![[assets/brohan-2023-rt-2-vision-language-action-models-transfer-web/fig06.png]]
*Figure 6: (좌) emergent skill에서 RT-2가 RT-1·VC-1을 3배 이상 앞선다 (우) 크기·학습 전략 ablation — co-fine-tuning과 큰 모델이 유리 (Brohan et al. 2023, p.10)*

### chain-of-thought

PaLM-E판을 수백 gradient step만 추가로 파인튜닝해 "Plan" 단계를 넣게 한다. 데이터를 "Instruction: I'm hungry. Plan: pick rxbar chocolate. Action: 1 128 124 ..."처럼 자연어 계획 뒤에 액션 토큰이 오도록 증강한다. 이 계획 단계가 VQA(시각 추론)와 조작(액션 생성) 사이의 다리 역할을 한다. LLM·VLM을 planner로 쓰는 흐름과 저수준 policy를 한 VLA 안에 합칠 수 있다는 초기 근거다.

![[assets/brohan-2023-rt-2-vision-language-action-models-transfer-web/fig07.png]]
*Figure 7: chain-of-thought 롤아웃 — plan과 action을 함께 생성 ("망치가 필요한데 뭘 쓸까 → Rocks", "졸리니 마실 것 → redbull") (Brohan et al. 2023, p.11)*

## 한계 (Limitations)

새 물리 동작 자체는 배우지 못한다. 웹 pre-training은 의미·시각 개념의 일반화를 넓히지만 로봇의 물리 스킬은 여전히 로봇 데이터 분포 안에 갇힌다. 모델이 하는 일은 아는 스킬을 새로운 방식으로 배치하는 것이다. 저자들은 데이터가 스킬 축에서 충분히 다양하지 않아서라고 보고 사람 영상 같은 새 데이터 수집 방식을 후속 방향으로 든다.

계산 비용도 높다. 고빈도 제어가 필요한 상황에서는 실시간 추론이 병목이 될 수 있어 quantization·distillation을 후속 과제로 짚는다. RT-2를 만들 재료가 되는 VLM 자체가 아직 소수라는 점도 한계다. 실패 사례(Appendix G)는 구체적이다. 처음 보는 객체의 동역학(굴러 떨어지는 펜), 특정 부위(손잡이) 잡기, 로봇 데이터에 없던 새 동작(수건 닦기·도구 사용), 정밀 동작(수건 접기), 여러 층의 간접 추론에서 약했다.

## 이 저장소 안에서의 위치 (Position in This Wiki)

RT-2는 physical-ai 카테고리에서 VLA 계보의 기준점이다. "pre-training된 VLM을 로봇 데이터로 파인튜닝해 액션을 내게 한다"는 레시피의 원형이다. 이후 나온 조작용 VLA가 대부분 여기서 갈라져 나온다.

바로 앞 세대는 [[physical-ai/brohan-2022-rt-1-robotics-transformer-for-real-world|RT-1]]이다. RT-2는 RT-1의 로봇 데이터(13대·17개월·office kitchen·7 skills)와 액션 이산화(256 bin·8 정수)를 그대로 물려받되, backbone을 35M transformer에서 수십억 파라미터 VLM으로 키웠다. 그래서 RT-1이 seen 태스크에서 강했다면 RT-2는 unseen 일반화에서 격차를 벌린다.

한 세대 뒤로 가면 [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation|GR00T N1]]이 "RT-1·RT-2·π0·OpenVLA"를 VLA-via-finetuning 계보로 묶고 그 후속으로 스스로를 자리매김한다. RT-2가 단일 대형 VLM 안에서 언어·액션을 한 손실로 학습했다면, GR00T N1은 VLM(느린 추론)과 DiT(빠른 액션)를 dual-system으로 분리하고 데이터 병목(휴머노이드의 "데이터 섬")을 정면으로 다룬다. 두 논문을 나란히 읽으면 VLA 설계가 단일 backbone에서 dual-system으로, 초점이 아키텍처에서 데이터로 옮겨간 흐름이 보인다.

RT-2가 한계로 지목한 "새 물리 동작을 못 배운다"는 문제는 [[physical-ai/hou-2026-world-model-for-robot-learning|World Model 서베이]]가 진단한 병목("그럴듯한 미래"에서 "action에 인과적으로 aligned된 실행 가능한 미래"로)과 이어진다. backbone VLM을 더 키우자는 방향은 [[llms/cai-2026-vlm3-vision-language-models|VLM3]]의 논의 대상이다.

## 관련 페이지 (Related Pages)

- [[physical-ai/brohan-2022-rt-1-robotics-transformer-for-real-world]] — 직접 전신. RT-2가 로봇 데이터와 액션 이산화를 그대로 물려받은 모델
- [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation]] — VLA-via-finetuning 계보의 후속. 단일 backbone → dual-system, 아키텍처 → 데이터로 초점 이동
- [[physical-ai/hou-2026-world-model-for-robot-learning]] — policy·world model 결합 서베이. RT-2의 "새 동작 학습 불가" 한계와 이어지는 병목 진단
- [[llms/cai-2026-vlm3-vision-language-models]] — VLM 아키텍처. RT-2 성능을 좌우하는 backbone 축
- [[overviews/physical-ai-overview]] — physical-ai 분류 기준과 학습 경로 허브
