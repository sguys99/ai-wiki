---
title: "Unleashing Large-Scale Video Generative Pre-training for Visual Robot Manipulation"
type: paper
year: 2023
category: physical-ai
source: wu-2023-unleashing-large-scale-video-generative.md
raw_path: raw/papers/wu-2023-unleashing-large-scale-video-generative.pdf
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

## 요약 (Summary)

로봇 데이터는 비싸고 적다. 사람이 teleoperation으로 한 건씩 모아야 하기 때문이다. teleoperation은 사람이 로봇을 원격으로 움직여 시연 데이터를 만드는 방식이다. GR-1은 그 부족분을 로봇과 아무 상관 없는 사람 영상으로 메운다. Ego4D 1인칭 영상에서 자른 80만 clip으로 "언어 설명을 보고 다음 프레임을 맞히는" 과제를 먼저 학습한 다음, 같은 모델에 로봇 상태 입력과 action 출력만 얹어 이어서 fine-tuning한다.

CALVIN 벤치마크 성공률이 88.9%에서 94.9%로, 지시문 5개를 연달아 처리할 때의 평균 통과 개수가 3.06에서 4.21로 올랐다. 더 눈에 띄는 쪽은 학습에 없던 환경에서의 zero-shot 성적으로, 53.3%에서 85.4%가 됐다. ByteDance Research의 GR 시리즈 첫 편이고 ICLR 2024에 실렸다. 공식 코드는 [[physical-ai/bytedance-gr-1]]에 정리해뒀다.

## 주요 기여 (Key Contributions)

논문의 주장은 한 문장으로 줄일 수 있다. 로봇 trajectory 자체가 영상이므로, 다음 장면을 맞히는 능력과 지금 낼 action을 고르는 능력은 가깝다. trajectory는 observation과 action이 시간순으로 이어진 실행 기록을 말한다.

- 대규모 video generative pre-training이 manipulation 학습에 실제로 도움이 된다는 것을 수치로 보였다. video generative pre-training은 언어 설명이 붙은 영상에서 미래 프레임을 맞히도록 모델을 먼저 학습시키는 단계를 가리킨다.
- 영상 학습과 로봇 학습을 하나의 GPT 계열 Transformer로 처리한다. 구조를 갈아끼우지 않으므로 영상으로 얻은 가중치를 policy 학습에 바로 넘긴다. policy는 현재 observation을 받아 다음 action을 정하는 함수다.
- 시뮬레이션과 실기기 양쪽에서 데이터 양·환경 변화·지시문 변화를 각각 바꿔가며 검증했다.

## 방법론 및 아키텍처 (Methodology and Architecture)

![[assets/wu-2023-unleashing-large-scale-video-generative/fig01.png]]
*Figure 1: pre-training에서 얻은 가중치를 그대로 복사해 CALVIN과 실기기 데이터에 fine-tuning한다 (Wu 2023, p.2)*

두 단계가 같은 식을 공유한다. pre-training에서는 영상 설명 `l`과 과거 프레임 `o_{t-h:t}`를 받아 미래 프레임 `o_{t+Δt}`를 낸다. fine-tuning에서는 로봇 상태 `s_{t-h:t}`가 입력에 붙고 `a_t`가 출력에 붙는다. 미래 프레임 예측이 양쪽에 그대로 남아 있다는 점이 핵심이다. 이것 때문에 pre-training에서 배운 것이 fine-tuning에서 버려지지 않는다.

![[assets/wu-2023-unleashing-large-scale-video-generative/fig02.png]]
*Figure 2: 인코더·디코더 다섯 구성요소 — (a) CLIP 텍스트, (b) 로봇 상태, (c) MAE ViT + perceiver resampler, (d) vision decoder, (e) action decoder (Wu 2023, p.4)*

언어는 CLIP 텍스트 인코더가, 이미지는 MAE로 pre-training된 ViT가 처리하고 둘 다 학습 내내 얼려둔다. ViT의 CLS 토큰이 전역 표현, patch 토큰이 perceiver resampler를 거쳐 개수가 줄어든 지역 표현이다. 로봇 상태는 end-effector의 6D pose와 그리퍼 개폐 이진값이며 선형 계층으로 인코딩한다. end-effector는 로봇 팔 끝에서 물체와 접촉하는 부분이다.

출력을 뽑는 자리로 학습 가능한 토큰 두 종류를 둔다. `[ACT]`가 arm·그리퍼 action을, `[OBS]`가 미래 프레임을 맡는다. 시퀀스는 fine-tuning에서 `(l, s_t, o_t, [OBS], [ACT])` 묶음이 timestep마다 반복되는 형태이고, 언어 토큰을 매 timestep 다시 넣어 다른 모달리티에 묻히지 않게 한다. attention은 GPT식 causal이되 `[ACT]`와 `[OBS]`는 다른 토큰이 참조하지 못하게 가려둔다. 예측용 자리가 시퀀스 표현을 오염시키지 않게 하는 장치다.

영상 예측은 `[OBS]` 출력과 mask 토큰을 받는 Transformer 디코더가 맡고, mask 토큰 하나가 미래 이미지의 patch 하나를 복원한다. 손실은 patch 단위로 정규화한 픽셀 공간의 MSE다. action 쪽은 연속값인 arm에 Smooth-L1, 이진값인 그리퍼에 BCE를 쓴다. fine-tuning 손실은 `L_arm + L_gripper + L_video`다.

학습 규모는 이렇다. Ego4D 3,500시간에서 3초 clip 80만 개, 프레임 800만 장을 뽑았고 프레임 간격은 1/3초다. pre-training은 Δt=1, fine-tuning은 로봇 데이터가 더 촘촘해 Δt=3으로 두고 static 카메라와 그리퍼 카메라를 모두 예측한다. causal Transformer는 12층·12헤드·hidden 384이고 전체 195M 파라미터 중 학습되는 것은 46M뿐이다.

## 결과 (Results)

![[assets/wu-2023-unleashing-large-scale-video-generative/tab01.png]]
*Table 1: CALVIN 네 설정의 연속 성공률과 Avg. Len. (Wu 2023, p.6)*

CALVIN은 Franka Emika Panda와 평행 그리퍼가 놓인 책상에서 34개 과제를 다루는 벤치마크다. 평가는 지시문 5개를 연달아 주고 하나를 통과해야 다음으로 넘기는 방식으로 1,000개 시퀀스를 돌린다. Avg. Len.은 그 5개 중 평균 몇 개를 통과했는지라, 긴 사슬을 얼마나 버티는지가 한 숫자로 나온다.

읽을 때 주의할 조건이 하나 있다. CALVIN의 play 데이터 중 언어 라벨이 붙은 것은 1%뿐인데, GR-1과 RT-1·MT-R3M은 그 1%만 쓰고 MCIL·HULC는 라벨 없는 데이터까지 전부 쓴다. 적은 데이터로 더 나은 성적을 낸 셈이다.

격차가 가장 벌어지는 자리는 ABC→D다. 환경 C까지만 학습하고 처음 보는 D에서 평가하는데, 최고 baseline의 Avg. Len.이 0.93인 자리에서 GR-1은 3.06을 낸다. 저자들은 Ego4D의 다양한 사람-물체 상호작용이 환경이 바뀌어도 흔들리지 않는 시각-언어 대응을 만들어줬다고 본다. 34개 과제마다 66개씩 총 2,244개 trajectory만 쓴 10% 설정에서도 HULC의 1.11 대비 2.00으로 앞선다.

![[assets/wu-2023-unleashing-large-scale-video-generative/fig05.png]]
*Figure 5: 실기기 실험 설정 — object transportation 세 조건과 서랍 여닫기 (Wu 2023, p.8)*

실기기는 7-DoF Kinova Gen2에 RealSense를 end-effector에, Kinect Azure를 고정 시점에 달았다. 가지·브로콜리·파프리카를 접시와 책상 사이로 옮기는 과제에 HTC Vive VR로 모은 demonstration 1,775개, 서랍 여닫기에 2,856개를 썼다.

![[assets/wu-2023-unleashing-large-scale-video-generative/tab02.png]]
*Table 2: 실기기 성공률 — 학습에 없던 개체까지는 버티지만 범주가 바뀌면 크게 떨어진다 (Wu 2023, p.8)*

seen objects 조건에는 방해 물체를 넣거나 배경까지 바꾼 장면이 섞여 있는데도 0.79가 나온다. 학습에 없던 개체로 바꾼 unseen instances에서 0.73으로 조금만 내려가는 반면, 범주 자체가 새로운 unseen categories는 0.30까지 떨어진다. 색이 비슷한 파프리카와 복숭아를 혼동하는 것이 대표적 실패다.

![[assets/wu-2023-unleashing-large-scale-video-generative/fig06.png]]
*Figure 6: 초록 테두리가 실제 프레임, 파랑 테두리가 GR-1이 예측한 미래 프레임 (Wu 2023, p.9)*

fine-tuning 이후에도 영상 예측 능력이 남아 있는지를 확인한 그림이다. 시뮬레이션과 실기기 양쪽에서 미래 프레임을 대체로 맞히지만 가려진 물체 같은 세부는 놓친다.

## Ablation — 무엇이 성적을 만들었나

![[assets/wu-2023-unleashing-large-scale-video-generative/fig07.png]]
*Figure 7: pre-training과 영상 예측을 하나씩 뺐을 때 — (a) CALVIN Avg. Len., (b) 실기기 picking·transporting 성공률 (Wu 2023, p.15)*

pre-training과 영상 예측은 각각 따로 기여한다. ABCD→D 기준 아무것도 없이 3.33, 영상 예측만 붙여 3.82, pre-training까지 더해 4.21이다. 데이터가 적을수록 pre-training의 몫이 커져서 10% 설정에서는 1.04 → 1.52 → 2.00으로 거의 두 배가 된다.

다만 영상 예측만 붙이고 pre-training을 뺀 변형은 실기기에서 아무것도 안 붙인 변형보다 오히려 낮은 성공률을 냈다. 예측 능력 자체가 pre-training 없이는 여물지 않는다는 뜻이다. 예측 시점 Δt는 1·3·5 중 3이 가장 좋았다. 연속 프레임은 너무 비슷해 배울 게 적고, 너무 먼 미래는 당장 낼 action을 고르는 데 도움이 안 된다.

과제별로 보면 개선폭이 큰 쪽은 대부분 블록 조작이다. 블록 쌓기가 45.7에서 80.1로, 빨간 블록 들기가 76.7에서 97.7로 올랐다. 맞는 블록을 먼저 골라 쥐어야 하는 과제라 시각-언어 대응이 성패를 가른다.

## 한계 (Limitations)

실패 양상은 셋이다. 처음 보는 범주에서 색이 비슷한 물체를 혼동하고, 서랍을 끝까지 닫지 못하며, 손잡이를 제대로 걸지 못한 채 당긴다.

평가 범위도 좁은 편이다. 실기기 실험이 단일 팔 로봇 하나에 과제 두 종류로 한정되어 있고 cross-embodiment 전이는 다루지 않는다. 저자들이 밝힌 다음 계획은 언어 라벨이 없는 영상까지 섞어 쓰는 것, 아무 영상이나 쓰는 것과 manipulation에 가까운 영상만 쓰는 것의 차이를 재는 것, 그리고 로봇 데이터를 환경 수와 스킬 수 양쪽으로 늘리는 것이다.

## 관련 페이지 (Related Pages)

- [[physical-ai/bytedance-gr-1]] — 이 논문의 공식 코드 저장소. CALVIN 평가 스크립트와 두 split의 가중치
- [[physical-ai/brohan-2022-rt-1-robotics-transformer-for-real-world]] — CALVIN과 실기기 양쪽에서 비교 대상이 된 baseline. 같은 imitation learning 계열이지만 pre-training이 없다
- [[physical-ai/reuss-2026-pretrained-to-imagine-fine-tuned]] — "미래를 상상하도록 pre-training하고 행하도록 fine-tuning한다"는 계보를 정리한 리뷰. GR-1이 그 초기 사례다
- [[physical-ai/hou-2026-world-model-for-robot-learning]] — 미래 예측과 policy를 어떻게 붙이는지를 5분류로 정리한 서베이
- [[physical-ai/nvidia-2025-cosmos-world-foundation-model-platform]] — 영상 생성 모델을 로봇용 기반으로 삼는 흐름의 대규모 사례
- [[overviews/glossary-physical-ai]] — 이 페이지의 전문 용어 canonical 표기
