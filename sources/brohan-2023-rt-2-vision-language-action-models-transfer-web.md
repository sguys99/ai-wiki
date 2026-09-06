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
    caption: "RT-2 개요. 로봇 action을 텍스트 토큰으로 표현해 인터넷 규모 VQA와 함께 co-fine-tune하고, 추론 때 de-tokenize해 closed-loop 제어에 쓴다 (paper Figure 1)"
    page: 2
    bbox_norm: [0.1007, 0.0932, 0.9287, 0.3106]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/brohan-2023-rt-2-vision-language-action-models-transfer-web/fig02.png
    raw: raw/papers/brohan-2023-rt-2-vision-language-action-models-transfer-web-figures/fig02.png
    caption: "RT-2가 일반화하는 실세계 상황 15종. 추론, 기호 이해, 인물 인식을 요구하는 지시문 (paper Figure 2)"
    page: 5
    bbox_norm: [0.0986, 0.1883, 0.9014, 0.6349]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/brohan-2023-rt-2-vision-language-action-models-transfer-web/fig03.png
    raw: raw/papers/brohan-2023-rt-2-vision-language-action-models-transfer-web-figures/fig03.png
    caption: "일반화 평가 시나리오. (a) unseen objects (b) unseen backgrounds (c) unseen environments (paper Figure 3)"
    page: 7
    bbox_norm: [0.0783, 0.6139, 0.908, 0.7492]
    strategy: caption-region
    curated: false
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/brohan-2023-rt-2-vision-language-action-models-transfer-web/fig04.png
    raw: raw/papers/brohan-2023-rt-2-vision-language-action-models-transfer-web-figures/fig04.png
    caption: "seen과 unseen 전반 성능 막대그래프. RT-2 두 종과 RT-1, MOO, VC-1, R3M 비교 (paper Figure 4)"
    page: 8
    bbox_norm: [0.0947, 0.2349, 0.9053, 0.3832]
    strategy: caption-region
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/brohan-2023-rt-2-vision-language-action-models-transfer-web/fig05.png
    raw: raw/papers/brohan-2023-rt-2-vision-language-action-models-transfer-web-figures/fig05.png
    caption: "Language-Table 시뮬레이션의 실세계 out-of-distribution 동작. 새 밀기 과제와 처음 보는 객체 targeting (paper Figure 5)"
    page: 9
    bbox_norm: [0.1209, 0.0939, 0.56, 0.1874]
    strategy: caption-region
    curated: false
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/brohan-2023-rt-2-vision-language-action-models-transfer-web/fig06.png
    raw: raw/papers/brohan-2023-rt-2-vision-language-action-models-transfer-web-figures/fig06.png
    caption: "(6a) emergent skill 평가 비교, (6b) 파라미터 수와 학습 전략 ablation 막대그래프 (paper Figure 6)"
    page: 10
    bbox_norm: [0.0988, 0.0939, 0.9024, 0.2949]
    strategy: caption-region
    curated: true
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/brohan-2023-rt-2-vision-language-action-models-transfer-web/fig07.png
    raw: raw/papers/brohan-2023-rt-2-vision-language-action-models-transfer-web-figures/fig07.png
    caption: "chain-of-thought 롤아웃. plan과 action을 함께 생성한다 (paper Figure 7)"
    page: 11
    bbox_norm: [0.0947, 0.0939, 0.9119, 0.4108]
    strategy: caption-region
    curated: true
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/brohan-2023-rt-2-vision-language-action-models-transfer-web/fig08.png
    raw: raw/papers/brohan-2023-rt-2-vision-language-action-models-transfer-web-figures/fig08.png
    caption: "emergent capability 평가 장면 3범주. reasoning, symbol understanding, human recognition (paper Figure 8, Appendix)"
    page: 22
    bbox_norm: [0.0986, 0.0939, 0.902, 0.385]
    strategy: caption-region
    curated: false
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/brohan-2023-rt-2-vision-language-action-models-transfer-web/fig09.png
    raw: raw/papers/brohan-2023-rt-2-vision-language-action-models-transfer-web-figures/fig09.png
    caption: "Language-Table 실패 사례. unseen object dynamics 일반화 실패와 전체 성능 Table 4 (paper Figure 9, Appendix)"
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
    caption: "시뮬레이션 Language-Table 과제 성능(Lynch and Sermanet, 2020)"
    page: 9
    bbox_norm: [0.5719, 0.1031, 0.883, 0.1869]
    strategy: table-region
    curated: false
  - id: tab02
    label: Table 2
    kind: table
    file: assets/brohan-2023-rt-2-vision-language-action-models-transfer-web/tab02.png
    raw: raw/papers/brohan-2023-rt-2-vision-language-action-models-transfer-web-figures/tab02.png
    caption: "새 물체, 새 환경, 새 배경 축의 통제된 분포 변화를 시험하는 평가에 쓴 자연어 지시문. 각 범주마다 분포 변화가 작은 설정과 큰 설정을 함께 둔다"
    page: 26
    bbox_norm: [0.1537, 0.0944, 0.8463, 0.8646]
    strategy: table-region
    curated: false
  - id: tab03
    label: Table 3
    kind: table
    file: assets/brohan-2023-rt-2-vision-language-action-models-transfer-web/tab03.png
    raw: raw/papers/brohan-2023-rt-2-vision-language-action-models-transfer-web-figures/tab03.png
    caption: "정량적 emergent 평가에 쓴 자연어 지시문"
    page: 22
    bbox_norm: [0.1339, 0.4326, 0.8661, 0.8389]
    strategy: table-region
    curated: false
  - id: tab04
    label: Table 4
    kind: table
    file: assets/brohan-2023-rt-2-vision-language-action-models-transfer-web/tab04.png
    raw: raw/papers/brohan-2023-rt-2-vision-language-action-models-transfer-web-figures/tab04.png
    caption: "RT-2 두 구현과 베이스라인의 전체 성능. 학습에서 본 과제와, 새 물체와 새 배경과 새 환경 일반화를 재는 미학습 평가를 함께 담았다"
    page: 23
    bbox_norm: [0.0959, 0.7363, 0.9004, 0.8606]
    strategy: table-region
    curated: false
  - id: tab05
    label: Table 5
    kind: table
    file: assets/brohan-2023-rt-2-vision-language-action-models-transfer-web/tab05.png
    raw: raw/papers/brohan-2023-rt-2-vision-language-action-models-transfer-web-figures/tab05.png
    caption: "정량적 emergent 평가에서 RT-2와 베이스라인의 성능"
    page: 24
    bbox_norm: [0.0941, 0.0708, 0.9084, 0.278]
    strategy: table-region
    curated: false
  - id: tab06
    label: Table 6
    kind: table
    file: assets/brohan-2023-rt-2-vision-language-action-models-transfer-web/tab06.png
    raw: raw/papers/brohan-2023-rt-2-vision-language-action-models-transfer-web-figures/tab06.png
    caption: "RT-2 ablation. 파라미터 수와 학습 전략이 일반화에 미치는 영향을 보여준다"
    page: 24
    bbox_norm: [0.1442, 0.4148, 0.852, 0.5274]
    strategy: table-region
    curated: false
---
## 한 줄 요약 (One-line Summary)

RT-2는 인터넷 규모로 학습한 vision-language model을 로봇 trajectory 데이터와 함께 co-fine-tune해 로봇 action을 직접 출력하도록 만든 모델이다. trajectory는 observation과 action이 시간순으로 이어진 실행 기록이다. action을 텍스트 토큰으로 적어 자연어 토큰과 똑같이 다루는 것이 핵심이다. 이렇게 만든 모델 계열을 vision-language-action(VLA) 모델이라 부른다. pre-training은 대규모 일반 데이터로 모델의 기반 능력을 먼저 학습하는 단계인데, 웹 pre-training 덕분에 로봇 데이터에 없던 객체와 지시문(instruction)과 추론으로 일반화가 크게 늘고 emergent capability가 나타난다.

## 1. 자료 정보 (Document Information)

- 제목: RT-2: Vision-Language-Action Models Transfer Web Knowledge to Robotic Control
- 저자: Google DeepMind (저자 알파벳순, 교신저자 Yevgen Chebotar, Tianhe Yu, Karol Hausman)
- arXiv: 2307.15818v1 (2023-07-28), 본문 표기 날짜 2023-8-1, 총 26페이지(부록 포함)
- 프로젝트 페이지: robotics-transformer2.github.io
- 모델 인스턴스: RT-2-PaLI-X(5B와 55B), RT-2-PaLM-E(12B), 시뮬레이션용 RT-2-PaLI-3B
- 평가 규모: 실세계 약 6,000 trial. 로봇 플랫폼은 7DoF mobile manipulator
- baseline: RT-1, VC-1, R3M, MOO 네 종. 모두 RT-2와 완전히 동일한 로봇 데이터로 학습했다

## 2. 주요 기여 (Key Contributions)

VLA라는 범주를 세운 논문이다. 로봇 action을 또 하나의 언어로 보고 텍스트 토큰으로 적으면, 이미 있는 VLM을 새 파라미터나 새 아키텍처 없이 그대로 파인튜닝해 policy로 쓸 수 있다. policy는 현재 observation을 받아 다음 action을 정하는 함수를 말한다. 처음부터 vision-language-action 구조를 설계하거나(Gato) VLM을 policy에 삽입하는(CLIPort) 기존 방식과 다르게, pre-training에 이미 들어간 막대한 연산을 그대로 물려받는다.

핵심 레시피는 co-fine-tuning이다. 로봇 데이터만으로 파인튜닝하는 대신 원래 웹 데이터를 배치에 계속 섞어 함께 학습한다. 이렇게 하면 모델이 웹에서 배운 추상적 시각 개념과 로봇의 저수준 action에 동시에 노출된다. 일반화와 emergent capability가 여기서 나온다.

6,000회 규모의 실세계 평가로 emergent capability를 정량화했다. 로봇 데이터에 없던 기호 이해, 시각과 수학과 다국어 추론, 인물 인식을 측정 가능한 카테고리로 나눠 잰다.

55B 파라미터 모델을 실시간 closed-loop 제어에 올렸다. closed-loop 제어는 매 timestep 새 observation을 받아 action을 다시 정하는 방식이다. 저자들은 직접 closed-loop 로봇 제어에 쓴 모델 중 이전보다 한 자릿수 이상 큰 규모라고 적었다.

논문은 실험을 네 개의 질문으로 조직한다. seen 과제와 새로운 객체, 배경, 환경에서의 성능이 첫째다. 둘째는 emergent capability를 관찰하고 측정할 수 있는지, 셋째는 일반화가 파라미터 수와 학습 전략에 따라 어떻게 달라지는지, 넷째는 chain-of-thought 추론의 징후가 나타나는지다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### action을 텍스트로 적기

action 인코딩은 RT-1(Brohan et al., 2022)의 이산화를 그대로 가져온다. action space는 end-effector의 6-DoF 변위(위치 3차원과 회전 3차원), gripper 확장 정도, 에피소드 종료를 알리는 이산 명령으로 나뉜다. 종료 명령을 뺀 연속 차원은 각각 256개 bin으로 균등 이산화해 8개 정수로 표현한다. 파인튜닝 타깃은 이 정수들을 공백으로 이어붙인 한 문자열이다.

```
"terminate Δpos_x Δpos_y Δpos_z Δrot_x Δrot_y Δrot_z gripper_extension"
예: "1 128 91 241 5 101 127"
```

정수 bin을 어떤 토큰에 붙이느냐는 VLM의 토크나이저에 달렸다. PaLI-X는 1000까지의 정수마다 고유 토큰이 있어 bin을 해당 정수 토큰에 바로 연결한다. PaLM-E는 그런 표현이 없어서 가장 덜 쓰이는 토큰 256개를 action 어휘로 덮어쓴다. 저자들은 이 방식을 symbol tuning(Wei et al., 2023)의 일종으로 본다. 입력은 표준 VQA 형식 "Q: what action should the robot take to [task instruction]? A:"이고 출력이 위 action 문자열이다.

### co-fine-tuning

학습 배치마다 로봇 데이터와 웹 데이터의 비율을 조절하되 로봇 쪽 샘플링 가중을 높인다. RT-2-PaLI-X는 로봇 데이터가 학습 혼합의 약 50%, RT-2-PaLM-E는 약 66%를 차지한다. ablation에서 co-fine-tuning이 일반화를 크게 끌어올리는데 원래 웹 데이터를 계속 곁에 두면 파인튜닝 중에도 VLM이 pre-training에서 배운 개념을 덜 잊기 때문이다.

### output constraint

RT-2는 실제 로봇에서 실행할 유효한 action 토큰을 내야 한다. 로봇 action 태스크로 프롬프트되면 유효 action 토큰만 샘플링하도록 디코딩 어휘를 제약한다. 일반 vision-language 태스크에서는 전체 자연어 토큰을 그대로 허용한다.

### 실시간 추론

수십억에서 수백억 파라미터 VLM은 데스크톱이나 온로봇 GPU로 closed-loop 제어를 수행하기 어렵다. 대신 모델을 multi-TPU 클라우드 서비스에 배포하고 네트워크로 질의하는 프로토콜을 쓴다. 한 클라우드로 여러 로봇을 함께 서빙할 수도 있다. 가장 큰 55B RT-2-PaLI-X는 1~3Hz, 5B 버전은 약 5Hz로 동작한다.

### backbone과 학습 (Appendix D와 E)

PaLI-X는 이미지를 ViT-22B로 처리하고 32B encoder-decoder(UL2 계열, 50 layers)가 텍스트와 이미지 임베딩을 함께 받아 auto-regressive하게 토큰을 낸다. 이미지 n장은 장당 k개 패치 토큰으로 바뀌어 projection layer를 거친다. PaLM-E-12B는 decoder-only LLM에 ViT-4B를 붙여 이미지와 텍스트를 언어 토큰 공간으로 투영하는 완전 멀티모달 구조다. 여러 센서 modality, 객체 중심 표현, 장면 표현을 입력으로 받을 수 있다. Language-Table용 PaLI-3B는 ViT-G/14(2B)와 UL2-3B를 쓴다.

학습은 next-token prediction 하나로 하며 이 손실이 로봇 학습의 behavioral cloning 손실에 해당한다. behavioral cloning은 시연의 observation에서 action으로 가는 쌍을 지도학습으로 흉내 내는 방법이다. 하이퍼파라미터는 원 PaLI-X와 PaLM-E 논문의 학습률 스케줄과 정규화를 그대로 따른다.

| 모델 | 학습률 | batch size | gradient step |
|---|---|---|---|
| RT-2-PaLI-X-55B | 1e-3 | 2048 | 8만 |
| RT-2-PaLI-X-5B | 1e-3 | 2048 | 27만 |
| RT-2-PaLM-E-12B | 4e-4 | 512 | 100만 |
| RT-2-PaLI-3B (Language-Table) | 1e-3 | 128 | 30만 |

### 데이터 (Appendix B)

웹 데이터의 대부분은 WebLI다. 109개 언어의 약 100억 개 image-text 쌍을 cross-modal 유사도 상위 10%로 걸러 10억 개 예제로 쓰고 여기에 여러 captioning과 VQA 데이터셋을 더한다. RT-2-PaLI-X를 co-fine-tune할 때 Episodic WebLI 데이터셋은 쓰지 않는다.

로봇 데이터는 RT-1의 것을 그대로 쓴다. 로봇 13대로 17개월간 office kitchen에서 모은 시연 데이터(demonstration)이고, 각 trajectory에 7종 스킬 중 하나를 자연어 지시문으로 붙였다. 스킬 목록은 "Pick Object", "Move Object Near Object", "Place Object Upright", "Knock Object Over", "Open Drawer", "Close Drawer", "Place Object into Receptacle", "Pick Object from Receptacle and place on the counter"다. 지시문은 스킬을 가리키는 동사 하나와 대상 물체를 가리키는 명사 하나 이상으로 이뤄진다.

Language-Table 실험에서는 다섯 가지 예측 과제를 함께 co-fine-tune한다. 연속한 두 프레임과 텍스트 지시문에서 action을 예측하는 과제, 프레임에서 지시문을 예측하는 과제, 프레임에서 로봇 팔 위치를 예측하는 과제, 두 프레임 사이의 timestep 수를 예측하는 과제, 프레임과 지시문에서 성공 여부를 예측하는 과제다.

### baseline 구성 (Appendix C)

네 baseline은 각각 RT-2의 다른 설계 선택을 검증한다.

| baseline | 구성 | 검증하는 질문 |
|---|---|---|
| RT-1 | 35M 파라미터 Transformer policy. VLM pre-training을 쓰지 않는다 | VLM pre-training이 필요한가 |
| VC-1 | 로보틱스용으로 pre-training된 ViT-L 시각 표현. 언어 조건이 없어 Universal Sentence Encoder 임베딩을 이미지 토큰에 이어 붙이고 TokenLearner를 거쳐 RT-1 decoder-only Transformer가 action 토큰을 낸다. VC-1 가중치를 고정하면 결과가 크게 나빠져 학습 중 해제했다 | 시각 표현 pre-training으로 충분한가 |
| R3M | Ego4D 사람 활동 영상으로 학습한 ResNet50 표현. 이후 처리는 VC-1과 동일하다 | 사람 영상 기반 표현으로 충분한가 |
| MOO | VLM이 관심 객체를 원본 이미지 안의 색칠된 픽셀 하나로 표시하고, 그 이미지를 end-to-end policy가 받는다. VLM의 표현 자체는 policy 학습에 쓰이지 않는다 | VLM을 보조 perception 모듈로 두는 것으로 충분한가 |

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 평가 설계

seen 과제는 RT-1과 같은 지시문 묶음을 쓰며 200개가 넘는다. 구성은 물체 집기 36개, 물체 넘어뜨리기 35개, 세워 놓기 35개, 옮기기 48개, 서랍 여닫기 18개, 서랍에서 꺼내 넣기 36개다. 이 평가도 물체 배치, 시각, 로봇 위치가 달라지므로 완전한 분포 내 반복은 아니다.

unseen 평가는 280개가 넘는 과제로 이뤄지고 대부분 pick and place 스킬에 집중한다. 세 범주 각각을 easy와 hard로 나눈다.

- unseen objects: hard는 잡기 어렵고 형태가 특이한 물체(장난감 등)다.
- unseen backgrounds: hard는 배경 변화가 더 크고 새로운 물체가 함께 등장한다.
- unseen environments: easy는 주방 싱크대, hard는 모니터와 사무용품이 놓인 시각적으로 크게 다른 사무 책상이다.

unseen 지시문은 각각 1~5회, emergent 평가 지시문은 각각 5회 실행한다. emergent 평가는 분산을 줄이려고 A/B testing 방식(Fisher, 1936)을 써서 네 모델을 완전히 동일한 조건에서 연속으로 평가한다.

### 일반화 (약 6,000 trial, Table 4)

seen 과제에서는 RT-2와 RT-1이 비슷하다(RT-2 91~93 vs RT-1 92). 차이는 일반화에서 벌어진다. unseen 평균이 RT-2-PaLI-X-55B와 RT-2-PaLM-E-12B 모두 62%인데 RT-1은 32%, MOO 35%, VC-1 10%, R3M 12%다. 다음으로 좋은 RT-1과 MOO 대비 약 2배, VC-1과 R3M 대비 약 6배다.

| 모델 | Seen | 객체 easy | 객체 hard | 배경 easy | 배경 hard | 환경 easy | 환경 hard | Unseen 평균 |
|---|---|---|---|---|---|---|---|---|
| R3M | 45 | 32 | 14 | 13 | 9 | 0 | 2 | 12 |
| VC-1 | 63 | 34 | 10 | 13 | 3 | 0 | 0 | 10 |
| RT-1 | 92 | 31 | 43 | 71 | 9 | 26 | 14 | 32 |
| MOO | 75 | 58 | 48 | 38 | 41 | 19 | 3 | 35 |
| RT-2-PaLI-X-55B | 91 | 70 | 62 | 96 | 48 | 63 | 35 | 62 |
| RT-2-PaLM-E-12B | 93 | 84 | 76 | 75 | 71 | 36 | 33 | 62 |

(단위 %, Table 4)

PaLM-E판은 어려운 시나리오에서 앞서고 PaLI-X판은 쉬운 쪽에서 앞서, 평균은 같게 나온다. 예를 들어 배경 hard에서 PaLM-E가 71%로 PaLI-X의 48%를 앞서는 반면, 배경 easy에서는 PaLI-X가 96%로 PaLM-E의 75%를 앞선다. R3M과 VC-1은 환경 일반화에서 0~2%로 사실상 실패한다.

논문은 각주로 PaLM-E-12B의 pre-training 혼합에 high-level VQA planning용 로봇 이미지가 들어 있어 일반화 시나리오의 이미지와 비슷할 수 있다고 밝힌다. 다만 그 학습 예제에는 이번 평가 대상인 저수준 action이 들어 있지 않다.

### Language-Table 시뮬레이션 (Table 1)

open-source Language-Table 환경에서 작은 PaLI-3B를 co-fine-tune한 policy가 90±10%를 낸다. action은 "X Y" 형식의 텍스트로 적고 X와 Y는 -10에서 +10 사이의 정수로 end-effector의 2D 직교 변위 setpoint를 나타낸다. 모델이 작아 다른 baseline과 비슷한 5Hz로 추론한다.

| 모델 | Language-Table 성공률(%) |
|---|---|
| BC-Zero (Jang et al., 2021) | 72±3 |
| RT-1 (Brohan et al., 2022) | 74±13 |
| LAVA (Lynch et al., 2022) | 77±4 |
| RT-2-PaLI-3B | 90±10 |

다른 로봇과 시뮬레이션에서도 VLM pre-training이 이득이라는 추가 근거다. 같은 체크포인트로 실세계 out-of-distribution 동작도 정성 평가했는데, 이 환경에서 본 적 없는 밀기 과제와 처음 보는 객체 targeting이 포함된다.

### emergent capability (Table 5)

emergent capability를 세 범주로 나눈다. symbol understanding은 로봇 데이터에 없던 기호로 옮기는 능력("move apple to 3", "push coke can on top of heart")이다. reasoning은 시각 추론과 수학("move X near the sum of two plus one")과 다국어를 포함한다. human recognition은 "move the coke can to the person with glasses" 같은 인물 중심 지시문이다.

Table 3의 지시문 그룹은 더 세분된다. symbol understanding은 문자와 숫자(Symbol 1), 그림 카드 대응(Symbol 2), 도형과 위치 관계(Symbol 3)로 나뉜다. reasoning은 수학, 로고(google, android, youtube, "a search engine"), 영양(healthy snack, sweet drink, salty snack), 색과 다국어(스페인어, 독일어, 프랑스어)로 나뉜다. human recognition은 유명인(Taylor Swift, Tom Cruise, Snoop Dog)과 CelebA 속성(안경 쓴 사람, 흰머리 남성, 갈색 머리 여성)으로 나뉜다.

| 모델 | Symbol 1 | Symbol 2 | Symbol 3 | 기호 평균 | 수학 | 로고 | 영양 | 색과 다국어 | 추론 평균 | 유명인 | CelebA | 인물 평균 | 전체 평균 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| VC-1 | 7 | 25 | 0 | 11 | 0 | 8 | 20 | 13 | 10 | 20 | 7 | 13 | 11 |
| RT-1 | 27 | 20 | 0 | 16 | 5 | 0 | 32 | 28 | 16 | 20 | 20 | 20 | 17 |
| RT-2-PaLI-X-55B | 93 | 60 | 93 | 82 | 25 | 52 | 48 | 58 | 46 | 53 | 53 | 53 | 60 |
| RT-2-PaLM-E-12B | 67 | 20 | 20 | 36 | 35 | 56 | 44 | 35 | 43 | 33 | 53 | 43 | 40 |

(단위 %, Table 5)

최고 성능 RT-2-PaLI-X는 평균 60%로 RT-1(17%)의 3배를 넘는다. 기호 이해에서 격차가 가장 크다. Symbol 3에서 RT-1과 VC-1이 모두 0%인 반면 PaLI-X는 93%다. 더 작은 PaLM-E판이 수학 추론에서는 35%로 PaLI-X의 25%를 앞서는데, PaLM-E의 pre-training 혼합이 계산에 더 강한 모델을 만들었기 때문으로 본다.

### ablation (Table 6)

세 학습 방식(scratch, fine-tuning, co-fine-tuning)과 두 크기(5B, 55B)를 비교한다. 모델 크기를 자유롭게 고를 수 있는 PaLI-X판만 쓰고, 일반화가 관심사이므로 seen 과제 평가는 제외한다.

| 모델 | 크기 | 학습 방식 | 객체 easy | 객체 hard | 배경 easy | 배경 hard | 환경 easy | 환경 hard | 평균 |
|---|---|---|---|---|---|---|---|---|---|
| RT-2-PaLI-X | 5B | scratch | 0 | 10 | 46 | 0 | 0 | 0 | 9 |
| RT-2-PaLI-X | 5B | fine-tuning | 24 | 38 | 79 | 50 | 36 | 23 | 42 |
| RT-2-PaLI-X | 5B | co-fine-tuning | 60 | 38 | 67 | 29 | 44 | 24 | 44 |
| RT-2-PaLI-X | 55B | fine-tuning | 60 | 62 | 75 | 38 | 57 | 19 | 52 |
| RT-2-PaLI-X | 55B | co-fine-tuning | 70 | 62 | 96 | 48 | 63 | 35 | 63 |

(단위 %, Table 6)

아주 큰 모델을 scratch로 학습하면 5B에서도 평균 9%로 성능이 매우 낮다. 이 결과를 보고 저자들은 55B scratch 평가를 아예 건너뛰었다. co-fine-tuning이 단순 fine-tuning보다, fine-tuning이 scratch보다 낫고 크기가 클수록 좋다. 55B co-fine-tuning이 평균 63%다. 다만 5B에서는 co-fine-tuning과 fine-tuning의 평균 차이가 2%p로 작고 항목별로 엇갈린다. 크기가 커질수록 co-fine-tuning의 이득이 11%p로 벌어진다.

### chain-of-thought 추론

PaLM-E판을 수백 gradient step만 추가로 파인튜닝해 "Plan" 단계를 넣게 한다. 데이터를 "Instruction: I'm hungry. Plan: pick rxbar chocolate. Action: 1 128 124 136 121 158 111 255"처럼 자연어 계획 뒤에 action 토큰이 오도록 증강한다. 이 계획 단계가 VQA(시각 추론)와 조작(action 생성) 사이의 다리 역할을 한다.

정성 롤아웃 예시는 다음과 같다. "못을 박아야 하는데 장면에서 무엇이 쓸모 있을까"라는 프롬프트에는 "Rocks"라는 답과 action을 함께 낸다. "다른 물체들과 다른 것을 집어라"에는 "Plan: pick rxbar chocolate"을, "졸리니 마실 것을 가져와라"에는 "Plan: pick redbull can"을 먼저 생성한다. LLM과 VLM을 planner로 쓰는 흐름과 저수준 policy를 한 VLA 안에 합칠 수 있다는 초기 근거다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

새 물리 동작 자체는 배우지 못한다. 웹 pre-training은 의미와 시각 개념의 일반화를 넓히지만 로봇의 물리 스킬은 여전히 로봇 데이터 분포 안에 갇힌다. 모델이 하는 일은 아는 스킬을 새로운 방식으로 배치하는 것이다. 저자들은 데이터가 스킬 측면에서 충분히 다양하지 않아서라고 보고 사람 영상 같은 새 데이터 수집 방식을 후속 방향으로 든다.

계산 비용도 높다. 고빈도 제어가 필요한 상황에서는 실시간 추론이 병목이 될 수 있어 양자화와 distillation을 후속 과제로 짚는다. RT-2를 만들 재료가 되는 VLM 자체가 아직 소수라는 점도 한계로 든다. 오픈소스 모델이 늘고 상용 모델이 파인튜닝 API를 열기를 기대하는데, 파인튜닝 API 공개가 VLA를 만들기 위한 충분 조건이라고 적었다.

실패 사례(Appendix G)도 구체적이다. Language-Table에서 처음 보는 객체의 dynamics에는 일반화하지 못한다. dynamics는 상태가 action에 따라 어떻게 변하는지의 규칙이다. 모델이 지시문을 제대로 해석해 목표 물체까지 이동하지만 그 물체의 움직임을 제어하지 못하는 형태다. 펜은 그대로 테이블 밖으로 굴러 떨어지고, 바나나는 무게중심이 접촉점에서 멀어 의도한 방향으로 밀리지 않는다. 저자들은 밀기 dynamics 예측과 제어가 원래 어려운 문제라고 짚으면서, 더 다양한 환경과 물체로 데이터셋을 키우면 개선될 수 있다고 본다.

실세계 조작에서도 네 유형의 실패가 남는다.

- 손잡이 같은 특정 부위를 지정해 잡기
- 로봇 데이터에 없던 새 동작, 예를 들어 수건으로 닦기나 도구 사용
- 수건 접기 같은 정밀하거나 섬세한 동작
- 여러 층의 간접 추론이 필요한 과제

## 6. 관련 연구 (Related Work)

VLM은 크게 두 계열이다. CLIP처럼 두 modality의 공통 임베딩을 배우는 representation 학습 계열과, {vision, text}에서 {text}로 자유 형식 텍스트를 내는 visual language model 계열(Flamingo, PaLI, PaLM-E)이다. RT-2는 후자를 쓴다. 언어를 생성하는 VLM을 쓰는 덕분에 언어 태스크와 action 태스크가 모델 가중치를 완전히 공유하고 action 전용 레이어를 따로 두지 않는다.

로봇 학습의 일반화 연구는 새 물체 인스턴스, 물체와 스킬의 새 조합, 새 목표와 지시문, 새 의미 범주, 미학습 환경 각각을 다뤄 왔다. RT-2는 이 여러 측면 전부에 걸쳐 하나의 모델로 일반화하는 것을 목표로 삼는다는 점에서 선행 연구와 다르다.

로봇 학습에서 pre-training은 오래된 주제다. 대개 visual representation(ImageNet 분류나 robotics용 목적함수)이나 language model(지시문 인코더 또는 상위 planner)을 pre-training해 썼다. RT-2는 그 대신 세계에 대한 풍부하고 grounded된 지식을 담은 VLM을 쓴다. CLIPort와 MOO도 VLM을 조작 policy에 통합하지만 2D action space나 보정된 카메라 같은 구조 제약을 둔다. RT-2에는 그런 제약이 없다.

이 저장소 안에서 RT-2는 [[physical-ai/brohan-2022-rt-1-robotics-transformer-for-real-world]]의 직접 후속이다. RT-1의 로봇 데이터와 action tokenization을 물려받되 backbone을 대형 VLM으로 키운 것이 RT-2다. [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation]]은 "pre-training된 모델을 로봇 데이터로 파인튜닝해 VLA를 만든다"는 계보(RT-1, RT-2, π0, OpenVLA)의 후속으로 스스로를 자리매김한다. policy와 world model의 결합은 [[physical-ai/hou-2026-world-model-for-robot-learning]] 서베이가, VLM backbone 쪽은 [[llms/cai-2026-vlm3-vision-language-models]]가 다룬다.

## 7. 용어집 (Glossary)

- **VLA (Vision-Language-Action)**: 이미지와 언어 입력에서 로봇 action을 내는 모델 계열. RT-2가 이 이름을 붙였다.
- **co-fine-tuning**: 로봇 데이터만 파인튜닝하지 않고 원래 웹 데이터를 배치에 섞어 함께 파인튜닝하는 방식. RT-2 일반화의 핵심.
- **action tokenization**: 연속 action을 256 bin으로 이산화해 정수 토큰 문자열로 표현하는 것. RT-1에서 이어받았다.
- **symbol tuning**: 기존 토큰의 의미를 다른 것(여기서는 action bin)으로 덮어써 학습하는 기법. PaLM-E의 action 어휘 구성에 쓰인다.
- **output constraint**: 로봇 action 프롬프트일 때만 유효 action 토큰으로 디코딩 어휘를 제한하는 장치.
- **emergent capability**: 로봇 데이터에 없었는데 웹 pre-training에서 전이돼 나타난 능력. 기호 이해, 추론, 인물 인식.
- **chain-of-thought (CoT)**: action 앞에 자연어 "Plan" 단계를 두어 다단 추론을 유도하는 방식.
- **behavioral cloning**: 시연 데이터를 그대로 모방하도록 학습하는 것. RT-2의 next-token prediction 손실이 여기 해당한다.
- **closed-loop control**: observation에서 action, 다시 새 observation으로 이어지는 루프를 피드백으로 반복하는 제어. RT-2는 de-tokenize한 action으로 이 루프를 수행한다.
- **PaLI-X / PaLM-E**: RT-2가 backbone으로 쓴 두 VLM. 각각 encoder-decoder(ViT-22B와 32B), decoder-only(ViT-4B와 LLM) 구조.
- **WebLI**: 109개 언어 약 100억 개 image-text 쌍의 웹 데이터셋. 상위 10%를 걸러 10억 개로 co-fine-tuning에 쓴다.
- **Language-Table**: Lynch et al. 2022의 open-source 시뮬레이션 벤치마크. 2D 평면에서 블록을 미는 언어 조건 조작 환경.

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 2 | "RT-2 개요 (action을 언어로, co-fine-tune, closed-loop)" | caption-region | ★ wiki 권장 (concept/architecture) |
| fig02 | 5 | "일반화 상황 15종 그리드" | caption-region | ★ wiki 권장 (qualitative) |
| fig03 | 7 | "일반화 평가 시나리오 (a) 객체 (b) 배경 (c) 환경" | caption-region | (선택) |
| fig04 | 8 | "seen과 unseen 전반 성능 막대그래프" | caption-region | ★ wiki 권장 (result) |
| fig05 | 9 | "Language-Table 실세계 OOD 동작" | caption-region | (선택) |
| fig06 | 10 | "emergent skill 비교 + 크기와 학습 전략 ablation" | caption-region | ★ wiki 권장 (result) |
| fig07 | 11 | "chain-of-thought 롤아웃" | caption-region | ★ wiki 권장 (method) |
| fig08 | 22 | "emergent 평가 장면 3범주 (Appendix)" | caption-region | (선택) |
| fig09 | 23 | "실패 사례 + Table 4 (Appendix)" | caption-region | (선택) |
| fig10 | 25 | "CoT 추가 롤아웃 (Appendix)" | caption-region | (선택) |
| tab01 | 9 | "Language-Table 성능표" | table-region | (선택) |
| tab04 | 23 | "전체 성능 Table 4" | table-region | (선택) |
| tab05 | 24 | "emergent 평가 Table 5" | table-region | (선택) |
| tab06 | 24 | "크기와 학습 전략 ablation Table 6" | table-region | (선택) |

> 표의 id와 page는 `figures.json` 매니페스트와 frontmatter를 따른다. 본문 인라인 "Figure N" 참조까지 잡힌 중복 항목은 제외했다. 수치 표(tab01, tab04, tab05, tab06)는 wiki 본문에 마크다운 표로 옮겨 적었으므로 이미지 임베드는 하지 않는다.
