---
title: "Unleashing Large-Scale Video Generative Pre-training for Visual Robot Manipulation"
type: paper
year: 2023
category: physical-ai
raw_path: /Users/kmyu/Desktop/project/ai-wiki/raw/papers/wu-2023-unleashing-large-scale-video-generative.pdf
raw_filename: "wu-2023-unleashing-large-scale-video-generative.pdf"
source_collection: external
authors: "Hongtao Wu*, Ya Jing*, Chilam Cheang, Guangzeng Chen, Jiafeng Xu, Xinghang Li, Minghuan Liu, Hang Li, Tao Kong (ByteDance Research, * 동등 기여)"
arxiv_id: "2312.13139"
url: "https://gr1-manipulation.github.io"
tags: [physical-ai, vla, imitation-learning, manipulation]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/wu-2023-unleashing-large-scale-video-generative/fig01.png
    raw: raw/papers/wu-2023-unleashing-large-scale-video-generative-figures/fig01.png
    caption: "GR-1 전체 흐름 — 대규모 영상 데이터로 pre-training한 뒤 같은 가중치를 CALVIN·실기기 데이터에 fine-tuning한다"
    page: 2
    bbox_norm: [0.1828, 0.0958, 0.817, 0.377]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/wu-2023-unleashing-large-scale-video-generative/fig02.png
    raw: raw/papers/wu-2023-unleashing-large-scale-video-generative-figures/fig02.png
    caption: "인코더·디코더 구성 — (a) CLIP 텍스트 (b) 로봇 상태 (c) MAE ViT + perceiver resampler (d) vision decoder (e) action decoder"
    page: 4
    bbox_norm: [0.199, 0.7772, 0.8009, 0.9067]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/wu-2023-unleashing-large-scale-video-generative/fig03.png
    raw: raw/papers/wu-2023-unleashing-large-scale-video-generative-figures/fig03.png
    caption: "CALVIN ABCD→D 실행 장면 — 슬라이딩 도어·서랍·블록·LED를 다루는 지시문 6종"
    page: 6
    bbox_norm: [0.1828, 0.4702, 0.8171, 0.577]
    strategy: caption-region
    curated: false
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/wu-2023-unleashing-large-scale-video-generative/fig04.png
    raw: raw/papers/wu-2023-unleashing-large-scale-video-generative-figures/fig04.png
    caption: "CALVIN 네 환경 A~D — 책상 색과 슬라이딩 도어·LED·전구·스위치·버튼 위치가 서로 다르다"
    page: 7
    bbox_norm: [0.655, 0.295, 0.868, 0.442]
    strategy: manual
    curated: false
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/wu-2023-unleashing-large-scale-video-generative/fig05.png
    raw: raw/papers/wu-2023-unleashing-large-scale-video-generative-figures/fig05.png
    caption: "실기기 실험 설정 — object transportation 세 조건(seen objects·unseen instances·unseen categories)과 서랍 여닫기"
    page: 8
    bbox_norm: [0.1667, 0.0958, 0.8336, 0.217]
    strategy: caption-region
    curated: true
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/wu-2023-unleashing-large-scale-video-generative/fig06.png
    raw: raw/papers/wu-2023-unleashing-large-scale-video-generative-figures/fig06.png
    caption: "영상 예측 결과 — 초록 테두리가 실제 프레임, 파랑 테두리가 GR-1이 예측한 미래 프레임"
    page: 9
    bbox_norm: [0.1699, 0.0958, 0.8301, 0.4123]
    strategy: caption-region
    curated: true
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/wu-2023-unleashing-large-scale-video-generative/fig07.png
    raw: raw/papers/wu-2023-unleashing-large-scale-video-generative-figures/fig07.png
    caption: "ablation 막대그래프 — (a) CALVIN 세 설정의 Avg. Len. (b) 실기기 picking·transporting 성공률"
    page: 15
    bbox_norm: [0.2799, 0.0958, 0.7202, 0.241]
    strategy: caption-region
    curated: true
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/wu-2023-unleashing-large-scale-video-generative/fig08.png
    raw: raw/papers/wu-2023-unleashing-large-scale-video-generative-figures/fig08.png
    caption: "CALVIN 벤치마크 rollout 모음 (부록)"
    page: 18
    bbox_norm: [0.1667, 0.2554, 0.8337, 0.743]
    strategy: caption-region
    curated: false
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/wu-2023-unleashing-large-scale-video-generative/fig09.png
    raw: raw/papers/wu-2023-unleashing-large-scale-video-generative-figures/fig09.png
    caption: "실기기 rollout — 앞 다섯 줄이 object transportation, 나머지가 서랍 조작 (부록)"
    page: 19
    bbox_norm: [0.1667, 0.2425, 0.8334, 0.7421]
    strategy: caption-region
    curated: false
  - id: fig10
    label: Figure 10
    kind: figure
    file: assets/wu-2023-unleashing-large-scale-video-generative/fig10.png
    raw: raw/papers/wu-2023-unleashing-large-scale-video-generative-figures/fig10.png
    caption: "CALVIN 영상 예측 추가 결과 (부록)"
    page: 20
    bbox_norm: [0.199, 0.1031, 0.801, 0.8815]
    strategy: caption-region
    curated: false
  - id: fig11
    label: Figure 11
    kind: figure
    file: assets/wu-2023-unleashing-large-scale-video-generative/fig11.png
    raw: raw/papers/wu-2023-unleashing-large-scale-video-generative-figures/fig11.png
    caption: "object transportation·서랍 조작의 영상 예측 결과 (부록)"
    page: 21
    bbox_norm: [0.199, 0.0962, 0.801, 0.8746]
    strategy: caption-region
    curated: false
  - id: fig12
    label: Figure 12
    kind: figure
    file: assets/wu-2023-unleashing-large-scale-video-generative/fig12.png
    raw: raw/papers/wu-2023-unleashing-large-scale-video-generative-figures/fig12.png
    caption: "ablation용 pick-and-place 실험의 영상 예측 결과 (부록)"
    page: 22
    bbox_norm: [0.199, 0.0962, 0.801, 0.8746]
    strategy: caption-region
    curated: false
  - id: tab01
    label: Table 1
    kind: table
    file: assets/wu-2023-unleashing-large-scale-video-generative/tab01.png
    raw: raw/papers/wu-2023-unleashing-large-scale-video-generative-figures/tab01.png
    caption: "CALVIN 벤치마크 결과 — ABCD→D · ABC→D · 10% 데이터 · unseen lang 네 설정의 연속 성공률과 Avg. Len."
    page: 6
    bbox_norm: [0.1667, 0.1227, 0.8333, 0.4684]
    strategy: table-region
    curated: true
  - id: tab02
    label: Table 2
    kind: table
    file: assets/wu-2023-unleashing-large-scale-video-generative/tab02.png
    raw: raw/papers/wu-2023-unleashing-large-scale-video-generative-figures/tab02.png
    caption: "실기기 실험 결과 — object transportation 세 조건과 서랍 조작 성공률"
    page: 8
    bbox_norm: [0.17, 0.2859, 0.83, 0.3912]
    strategy: table-region
    curated: true
  - id: tab03
    label: Table 3
    kind: table
    file: assets/wu-2023-unleashing-large-scale-video-generative/tab03.png
    raw: raw/papers/wu-2023-unleashing-large-scale-video-generative-figures/tab03.png
    caption: "pre-training·fine-tuning 하이퍼파라미터 (부록)"
    page: 14
    bbox_norm: [0.2935, 0.4013, 0.7065, 0.5955]
    strategy: table-region
    curated: false
  - id: tab04
    label: Table 4
    kind: table
    file: assets/wu-2023-unleashing-large-scale-video-generative/tab04.png
    raw: raw/papers/wu-2023-unleashing-large-scale-video-generative-figures/tab04.png
    caption: "ablation — pre-training과 영상 예측을 하나씩 뺐을 때 세 설정의 성적 변화"
    page: 15
    bbox_norm: [0.1711, 0.3871, 0.8289, 0.6084]
    strategy: table-region
    curated: false
  - id: tab05
    label: Table 5
    kind: table
    file: assets/wu-2023-unleashing-large-scale-video-generative/tab05.png
    raw: raw/papers/wu-2023-unleashing-large-scale-video-generative-figures/tab05.png
    caption: "예측 시점 Δt를 1·3·5로 바꿨을 때의 성적 (부록)"
    page: 16
    bbox_norm: [0.2314, 0.2084, 0.7686, 0.3346]
    strategy: table-region
    curated: false
  - id: tab06
    label: Table 6
    kind: table
    file: assets/wu-2023-unleashing-large-scale-video-generative/tab06.png
    raw: raw/papers/wu-2023-unleashing-large-scale-video-generative-figures/tab06.png
    caption: "GPT-4가 만든 unseen 지시문 예시 — 원문과 바꿔 쓴 문장 대조 (부록)"
    page: 16
    bbox_norm: [0.1776, 0.5926, 0.8224, 0.8076]
    strategy: table-region
    curated: false
  - id: tab07
    label: Table 7
    kind: table
    file: assets/wu-2023-unleashing-large-scale-video-generative/tab07.png
    raw: raw/papers/wu-2023-unleashing-large-scale-video-generative-figures/tab07.png
    caption: "CALVIN 34개 과제별 성공률 — 전체 GR-1 · 영상 예측과 pre-training을 뺀 변형 · 10% 데이터 (부록)"
    page: 17
    bbox_norm: [0.1737, 0.1409, 0.8263, 0.9104]
    strategy: table-region
    curated: false
---

## 한 줄 요약 (One-line Summary)

Ego4D 사람 영상 80만 clip으로 언어 조건부 영상 예측을 먼저 배운 GPT 계열 Transformer를 로봇 데이터에 그대로 이어 fine-tuning해, CALVIN 벤치마크 성공률을 88.9%에서 94.9%로, 처음 보는 환경의 zero-shot 성공률을 53.3%에서 85.4%로 끌어올린 연구다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 제목 | Unleashing Large-Scale Video Generative Pre-training for Visual Robot Manipulation |
| 저자 | Hongtao Wu*, Ya Jing*, Chilam Cheang, Guangzeng Chen, Jiafeng Xu, Xinghang Li, Minghuan Liu, Hang Li, Tao Kong (* 동등 기여) |
| 소속 | ByteDance Research |
| 발표 | ICLR 2024 (arXiv 2312.13139, 2023-12) |
| 프로젝트 페이지 | https://gr1-manipulation.github.io |
| 코드 | https://github.com/bytedance/GR-1 (Apache-2.0) |
| 분량 | 22페이지 (본문 9페이지 + 부록) |

ByteDance Research의 GR 시리즈 첫 편이다. 모델 이름 GR-1은 이후 GR-2·GR-3로 이어진다.

## 2. 주요 기여 (Key Contributions)

저자들이 직접 꼽은 기여는 셋이다.

- 대규모 video generative pre-training이 manipulation 학습에 실제로 도움이 된다는 것을 보였다. video generative pre-training은 언어 설명이 달린 영상에서 다음 프레임을 맞히도록 모델을 먼저 학습시키는 단계를 말한다.
- 영상 pre-training과 로봇 데이터 fine-tuning을 같은 하나의 모델로 처리하는 GPT 계열 Transformer 구조를 제시했다. 구조를 갈아끼우지 않으므로 영상으로 학습한 가중치를 로봇 policy 학습에 바로 쓸 수 있다. policy는 현재 observation을 받아 다음 action을 정하는 함수를 말한다.
- 시뮬레이션과 실기기 양쪽에서 데이터 양·환경 변화·지시문 변화를 바꿔가며 폭넓게 검증했다.

논문이 내세우는 논리는 단순하다. 로봇 trajectory 자체가 영상이라는 것. trajectory는 observation과 action이 시간순으로 이어진 실행 기록을 뜻한다. 그래서 "다음에 무슨 장면이 펼쳐질지"를 맞히는 능력이 "지금 어떤 action을 내야 하는지"와 가깝다고 본다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 두 단계를 하나의 식으로

pre-training 단계에서 모델 π는 영상 설명 l과 과거 프레임 o_{t-h:t}를 받아 미래 프레임을 낸다.

```
π(l, o_{t-h:t}) → o_{t+Δt}
```

fine-tuning 단계는 로봇 상태 s가 입력에 추가되고 출력에 action이 붙는다.

```
π(l, o_{t-h:t}, s_{t-h:t}) → o_{t+Δt}, a_t
```

미래 프레임 예측이 두 단계에 공통으로 남아 있는 점이 핵심이다. 이것 덕분에 pre-training에서 배운 것이 fine-tuning에서 버려지지 않는다.

### 입력 인코더

언어는 CLIP 텍스트 인코더가, 이미지는 MAE로 pre-training된 ViT가 처리한다. 둘 다 학습 내내 얼려둔다. ViT의 CLS 토큰을 이미지 전역 표현으로 쓰고, patch 토큰은 perceiver resampler를 거쳐 개수를 줄인 뒤 지역 표현으로 쓴다. 로봇 상태는 end-effector의 6D pose와 그리퍼 개폐 여부를 나타내는 이진값이며, 선형 계층으로 각각 인코딩한다. end-effector는 로봇 팔 끝에서 물체와 접촉하는 부분을 가리킨다.

### 학습되는 두 종류의 토큰

출력을 뽑아내는 자리로 학습 가능한 토큰 두 종류를 둔다. `[ACT]`는 arm·그리퍼 action을, `[OBS]`는 미래 프레임을 담당한다. 토큰 시퀀스는 단계마다 이렇게 배열된다.

- pre-training: `(l, o_{t-h}, [OBS], l, o_{t-h+1}, [OBS], ..., l, o_t, [OBS])`
- fine-tuning: `(l, s_{t-h}, o_{t-h}, [OBS], [ACT], ..., l, s_t, o_t, [OBS], [ACT])`

언어 토큰을 매 timestep마다 반복해 넣는데, 다른 모달리티에 묻히지 않게 하려는 조치다. 시간 정보는 학습되는 상대 timestep 임베딩으로 주입하며, 같은 timestep의 모든 모달리티는 같은 임베딩을 공유한다.

attention은 GPT식 causal 방식을 쓰되 `[ACT]`와 `[OBS]`는 예외로 가려둔다. 즉 다른 토큰이 이 두 종류를 참조하지 못한다. 예측용 자리가 시퀀스 표현을 오염시키지 않게 하는 장치다.

### 출력부와 손실

영상 예측은 `[OBS]` 출력과 mask 토큰을 함께 받는 Transformer 디코더가 맡는다. mask 토큰 하나가 미래 이미지의 patch 하나를 복원하고, MAE 방식대로 patch 단위 정규화를 거친 픽셀 공간에서 MSE를 잰다. action 쪽은 `[ACT]` 출력을 선형 계층에 통과시켜 연속값인 arm action과 이진값인 그리퍼 action을 따로 낸다. 전자는 Smooth-L1, 후자는 BCE로 학습한다.

fine-tuning 손실은 셋의 합이다.

```
L_finetune = L_arm + L_gripper + L_video
```

### 학습 설정

pre-training 데이터는 Ego4D다. 3,500시간이 넘는 1인칭 영상에서 3초짜리 clip을 잘라 80만 개, 프레임 800만 장을 모았다. 프레임 간격을 1/3초로 두어 연속 프레임이 서로 충분히 달라지게 했고, Δt는 1로 뒀다. 로봇 데이터는 이보다 촘촘하므로 fine-tuning에서는 Δt=3으로 바꾸고, static 카메라와 그리퍼 카메라 이미지를 모두 예측하게 했다. 입력 시퀀스 길이는 10이다.

causal Transformer는 12층·12헤드·hidden 384 구성이고 전체 195M 파라미터 중 46M만 학습된다. 나머지는 얼려둔 CLIP과 MAE ViT다. AdamW에 cosine decay를 걸었고, pre-training은 batch 1024·lr 3.6e-4·50 epoch, fine-tuning은 batch 512·lr 1e-3·20 epoch다. 이미지에는 random shift augmentation을 적용한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### CALVIN

CALVIN은 Franka Emika Panda와 평행 그리퍼, 슬라이딩 도어·서랍·색깔 블록·LED·전구가 놓인 책상으로 이뤄진 벤치마크다. 과제는 34개이고 환경은 책상 색과 물체 배치가 다른 A~D 넷이다. 평가는 지시문 5개를 연달아 주고 한 번에 하나씩 통과해야 다음으로 넘어가는 방식이며, 1,000개 시퀀스를 돌린다. 과제당 360 timestep 안에 못 끝내면 실패다.

주의할 점은 학습 데이터 규모다. CALVIN의 24시간짜리 play 데이터 중 언어 라벨이 붙은 것은 1%뿐이고, GR-1과 RT-1·MT-R3M은 그 1%(22,966개 중 언어 라벨이 붙은 trajectory)만 쓴다. MCIL과 HULC는 라벨 없는 데이터까지 전부 쓴다.

| 설정 | 방법 | 1개 | 5개 | Avg. Len. |
|---|---|---|---|---|
| ABCD→D | HULC | 0.889 | 0.383 | 3.06 |
| ABCD→D | RT-1 | 0.844 | 0.227 | 2.45 |
| ABCD→D | **GR-1** | **0.949** | **0.731** | **4.21** |
| ABC→D | MT-R3M | 0.529 | 0.018 | 0.93 |
| ABC→D | RT-1 | 0.533 | 0.013 | 0.90 |
| ABC→D | **GR-1** | **0.854** | **0.401** | **3.06** |
| 10% 데이터 | HULC | 0.668 | 0.013 | 1.11 |
| 10% 데이터 | **GR-1** | **0.778** | **0.139** | **2.00** |
| unseen lang | HULC | 0.715 | 0.130 | 1.82 |
| unseen lang | **GR-1** | **0.764** | **0.196** | **2.17** |

Avg. Len.은 5개 연속 시도에서 평균 몇 개를 통과했는지를 재는 값이라, 긴 과제 사슬을 얼마나 버티는지를 한 숫자로 보여준다. 격차가 가장 큰 쪽은 ABC→D다. C까지만 학습하고 처음 보는 D에서 평가하는 설정인데, 최고 baseline이 0.90인 자리에서 GR-1은 3.06을 낸다. 저자들은 Ego4D의 다양한 사람-물체 상호작용 덕분에 환경이 바뀌어도 시각-언어 대응이 흔들리지 않는다고 본다.

10% 데이터 설정은 34개 과제마다 66개씩, 총 2,244개 trajectory만 쓴 것이다. 여기서도 GR-1이 HULC를 크게 앞선다.

unseen lang은 GPT-4로 과제마다 뜻이 같은 지시문 50개를 만들어 평가 때 무작위로 뽑아 쓴 설정이다. 모든 방법의 성적이 떨어지지만 순위는 유지된다. CLIP 텍스트 인코더를 끝까지 얼려둔 것이 여기에 기여했다는 것이 저자들의 해석이다.

### 실기기

7-DoF Kinova Gen2에 RealSense를 end-effector에, Kinect Azure를 고정 시점에 달았다. object transportation은 가지·브로콜리·파프리카를 접시와 책상 사이로 옮기는 과제이고, HTC Vive VR로 teleoperation해 1,775개 demonstration을 모았다. teleoperation은 사람이 로봇을 원격으로 움직여 시연 데이터를 만드는 방식이다. 서랍 여닫기는 2,856개를 모았다.

| 방법 | seen objects | unseen instances | unseen categories | 서랍 조작 |
|---|---|---|---|---|
| RT-1 | 0.27 | 0.13 | 0.00 | 0.35 |
| MT-R3M | 0.15 | 0.13 | 0.10 | 0.30 |
| **GR-1** | **0.79** | **0.73** | **0.30** | **0.75** |

seen objects 조건에는 학습 때 없던 방해 물체를 넣거나 배경까지 바꾼 장면이 섞여 있다. 그런 교란에도 0.79가 나온다. 학습에 없던 개체로 바꾼 unseen instances에서 0.73으로 소폭만 떨어지는 반면, 범주 자체가 새로운 unseen categories에서는 0.30까지 내려간다. 색이 비슷한 파프리카와 복숭아를 혼동하는 것이 대표적 실패다.

### ablation

pre-training과 영상 예측을 하나씩 떼어 본 결과다.

| pre-training | 영상 예측 | ABCD→D | ABC→D | 10% 데이터 |
|---|---|---|---|---|
| ✗ | ✗ | 3.33 | 2.40 | 1.04 |
| ✗ | ✓ | 3.82 | 2.65 | 1.52 |
| ✓ | ✓ | **4.21** | **3.06** | **2.00** |

두 요소가 각각 기여하며, 데이터가 적을수록 pre-training의 몫이 커진다. 10% 설정에서 1.04 → 1.52 → 2.00으로 거의 두 배가 된다. 다만 영상 예측만 붙이고 pre-training을 뺀 변형은 실기기에서는 오히려 아무것도 안 붙인 변형보다 낮은 성공률을 냈다. 예측 능력 자체가 pre-training 없이는 충분히 여물지 않는다는 뜻이다.

예측 시점 Δt를 1·3·5로 바꿔본 실험에서는 3이 가장 좋았다(3.61 → 3.82 → 3.67). 연속 프레임은 너무 비슷해서 배울 게 적고, 너무 먼 미래는 지금 당장 낼 action을 고르는 데 도움이 안 된다.

과제별 성공률을 보면 개선폭이 큰 쪽은 대부분 블록 조작이다. 블록을 쌓는 과제가 45.7에서 80.1로, 빨간 블록을 책상에서 드는 과제가 76.7에서 97.7로 올랐다. 맞는 블록을 먼저 골라 쥐어야 하는 과제라 시각-언어 대응이 성패를 가른다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

실패 양상은 세 가지로 정리된다. 처음 보는 범주에서 색이 비슷한 물체를 혼동하고, 서랍을 끝까지 닫지 못하며, 서랍 손잡이를 제대로 걸지 못한 채 당긴다. 영상 예측 자체도 가려진 물체 같은 세부는 놓친다.

저자들이 밝힌 다음 계획은 셋이다. 언어 라벨이 있는 영상과 없는 영상을 함께 쓰는 것, 아무 영상이나 쓰는 것과 manipulation에 가까운 영상만 쓰는 것의 차이를 확인하는 것, 그리고 로봇 데이터를 환경 수와 스킬 수 양쪽으로 늘리는 것이다.

덧붙일 만한 한계는 평가 범위다. 실기기 실험이 단일 팔·단일 로봇으로 한정되어 있고, 과제도 옮기기와 서랍 여닫기 두 종류다. cross-embodiment 전이는 다루지 않는다.

## 6. 관련 연구 (Related Work)

언어 조건부 manipulation 계열에서는 RT-1·RT-2, CLIPort, PerAct, Hiveformer, 그리고 CALVIN 위에서 경쟁하는 MCIL·HULC를 비교 대상으로 삼는다. 논문은 앞의 몇 방법이 sparse한 end-effector keypoint를 예측하고 motion planner에 의존한다는 점에서 연속 action을 직접 내는 자신들과 다르다고 선을 긋는다.

Transformer로 순차 의사결정을 다루는 계열에서는 Decision Transformer·VIMA·GATO·RoboCat을 든다. 특히 RoboCat은 action과 미래 이미지를 함께 예측한다는 점에서 가장 가깝지만, 영상 pre-training이 없고 언어가 아니라 목표 이미지로 조건을 준다.

로봇 학습용 pre-training 계열에서는 R3M·MVP 같은 표현 학습, VPT·VIPER처럼 영상을 쓰는 방법을 짚는다. VPT와 VIPER의 영상은 과제 도메인 안의 데이터인 반면 GR-1은 로봇과 무관한 사람 영상을 쓴다. 비교 실험의 MT-R3M이 이 대비를 직접 재는 자리다 — 같은 Ego4D로 pre-training했고 학습 파라미터 수도 맞췄지만, 표현만 가져오는 방식이라 GR-1에 크게 밀린다.

## 7. 용어집 (Glossary)

이 자료 고유의 용어만 담는다. policy·observation·trajectory 등 도메인 공통 용어는 [[overviews/glossary-physical-ai]]를 따른다.

| 용어 | 뜻 |
|---|---|
| video generative pre-training | 언어 설명이 붙은 영상에서 미래 프레임을 맞히도록 먼저 학습시키는 단계. GR-1의 이름값이 걸린 부분이다 |
| `[OBS]` token | 미래 프레임 예측 자리로 쓰이는 학습 가능한 토큰. 다른 토큰의 attention 대상에서 제외된다 |
| `[ACT]` token | arm·그리퍼 action 예측 자리로 쓰이는 학습 가능한 토큰. fine-tuning 단계에만 등장한다 |
| Avg. Len. | CALVIN 평가 지표. 5개 지시문을 연달아 줬을 때 평균 몇 개를 통과했는지 |
| ABCD→D / ABC→D | CALVIN 데이터 split. 앞쪽 글자가 학습 환경, 화살표 뒤가 평가 환경이다. ABC→D는 D를 학습에서 뺀 zero-shot 설정 |
| Ego4D | 3,500시간이 넘는 1인칭 사람 활동 영상 데이터셋. clip마다 행동을 적은 자연어 설명이 붙어 있다 |
| MT-R3M | 비교용으로 저자들이 만든 baseline. R3M으로 이미지를 인코딩하고 GPT 계열 Transformer로 action을 낸다 |
| HULC / MCIL | CALVIN의 대표 baseline. 잠깐 latent plan을 만든 뒤 그것을 조건으로 action을 내는 계층적 방식이다 |
| perceiver resampler | 많은 patch 토큰을 고정된 적은 개수로 줄여주는 모듈 |

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 2 | GR-1 전체 흐름 — pre-training → 가중치 복사 → CALVIN·실기기 fine-tuning | caption-region | ★ wiki 권장 (overview) |
| fig02 | 4 | 인코더·디코더 다섯 구성요소 | caption-region | ★ wiki 권장 (architecture) |
| fig03 | 6 | CALVIN 실행 장면 6종 | caption-region | (확인 필요) |
| fig04 | 7 | CALVIN 네 환경 A~D의 차이 | manual | ★ wiki 권장 (ABC→D 설정 설명용) |
| fig05 | 8 | 실기기 실험 설정 네 조건 | caption-region | ★ wiki 권장 (experiment) |
| fig06 | 9 | 영상 예측 결과 (실제 vs 예측) | caption-region | ★ wiki 권장 (result) |
| fig07 | 15 | ablation 막대그래프 | caption-region | ★ wiki 권장 (ablation) |
| fig08 | 18 | CALVIN rollout 모음 | caption-region | (부록, 아카이브) |
| fig09 | 19 | 실기기 rollout 모음 | caption-region | (부록, 아카이브) |
| fig10 | 20 | CALVIN 영상 예측 추가 결과 | caption-region | (부록, 아카이브) |
| fig11 | 21 | transportation·서랍 영상 예측 | caption-region | (부록, 아카이브) |
| fig12 | 22 | pick-and-place 영상 예측 | caption-region | (부록, 아카이브) |
| tab01 | 6 | CALVIN 벤치마크 결과 전체 | table-region | ★ wiki 권장 (result) |
| tab02 | 8 | 실기기 실험 결과 | table-region | ★ wiki 권장 (result) |
| tab03 | 14 | 학습 하이퍼파라미터 | table-region | (부록, 아카이브) |
| tab04 | 15 | ablation 수치표 | table-region | ★ wiki 권장 (ablation) |
| tab05 | 16 | 예측 시점 Δt 비교 | table-region | (확인 필요) |
| tab06 | 16 | GPT-4 생성 unseen 지시문 예시 | table-region | (부록, 아카이브) |
| tab07 | 17 | 34개 과제별 성공률 | table-region | (부록, 아카이브) |
