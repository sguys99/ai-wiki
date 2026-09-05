---
title: "World Model for Robot Learning: A Comprehensive Survey"
type: paper
year: 2026
category: physical-ai
raw_path: raw/papers/hou-2026-world-model-for-robot-learning.pdf
raw_filename: "hou-2026-world-model-for-robot-learning.pdf"
source_collection: external
authors: "Bohan Hou, Gen Li, Jindou Jia, Tuo An, Xinying Guo, Sicong Leng, Haoran Geng, Yanjie Ze, Tatsuya Harada, Philip Torr, Oier Mees, Marc Pollefeys, Zhuang Liu, Jiajun Wu, Pieter Abbeel, Jitendra Malik, Yilun Du, Jianfei Yang"
arxiv_id: "2605.00080"
tags: [physical-ai, world-model, robot-learning, vla]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/hou-2026-world-model-for-robot-learning/fig01.png
    raw: raw/papers/hou-2026-world-model-for-robot-learning-figures/fig01.png
    caption: "서베이 전체 구성 — Sec 3(정책), Sec 4(시뮬레이터), Sec 5(로봇 비디오) 세 축 (Figure 1, p.2)"
    page: 2
    bbox_norm: [0.0798, 0.0697, 0.982, 0.4175]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/hou-2026-world-model-for-robot-learning/fig02.png
    raw: raw/papers/hou-2026-world-model-for-robot-learning-figures/fig02.png
    caption: "2023.1~2026.3 대표 연구의 시간축 진화 — 상단 world model for policy, 하단 world model as simulator (Figure 2, p.3)"
    page: 3
    bbox_norm: [0.0696, 0.073, 0.9596, 0.4084]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/hou-2026-world-model-for-robot-learning/fig03.png
    raw: raw/papers/hou-2026-world-model-for-robot-learning-figures/fig03.png
    caption: "정책으로서의 world model 3대 아키텍처 — (a) IDM-style (b) Single-backbone (c) MoT-style (Figure 3, p.10)"
    page: 10
    bbox_norm: [0.092, 0.073, 0.9518, 0.2731]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/hou-2026-world-model-for-robot-learning/fig04.png
    raw: raw/papers/hou-2026-world-model-for-robot-learning-figures/fig04.png
    caption: "MLLM 기반 두 경로 — (a) Unified VLA (b) Latent world modeling policy (Figure 4, p.13)"
    page: 13
    bbox_norm: [0.1455, 0.0785, 0.855, 0.2747]
    strategy: caption-region
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/hou-2026-world-model-for-robot-learning/fig05.png
    raw: raw/papers/hou-2026-world-model-for-robot-learning-figures/fig05.png
    caption: "시뮬레이터로서의 두 용도 — (a) RL용 학습된 시뮬레이터 (b) 후보 행동 채점(validation) (Figure 5, p.16)"
    page: 16
    bbox_norm: [0.1448, 0.082, 0.8554, 0.2628]
    strategy: caption-region
    curated: true
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/hou-2026-world-model-for-robot-learning/fig06.png
    raw: raw/papers/hou-2026-world-model-for-robot-learning-figures/fig06.png
    caption: "로봇 비디오 world model 통합 관점 — 상상 엔진 → action 조건화 → structure 조건화 (Figure 6, p.19)"
    page: 19
    bbox_norm: [0.106, 0.073, 0.8939, 0.2347]
    strategy: caption-region
    curated: true
  - id: tab01
    label: Table 1
    kind: table
    file: assets/hou-2026-world-model-for-robot-learning/tab01.png
    raw: raw/papers/hou-2026-world-model-for-robot-learning-figures/tab01.png
    caption: "Sec 3의 5개 아키텍처 패러다임 비교표 — 대표 연구·추론 시 future generation·backbone·coupling style (Table 1, p.8)"
    page: 8
    bbox_norm: [0.106, 0.0996, 0.9023, 0.6598]
    strategy: table-region
    curated: true
  - id: tab02
    label: Table 2
    kind: table
    file: assets/hou-2026-world-model-for-robot-learning/tab02.png
    raw: raw/papers/hou-2026-world-model-for-robot-learning-figures/tab02.png
    caption: "Sec 5의 4개 capability regime별 대표 기법 비교표 (Table 2, p.20)"
    page: 20
    bbox_norm: [0.1055, 0.1414, 0.894, 0.5664]
    strategy: table-region
    curated: false
  - id: tab03
    label: Table 3
    kind: table
    file: assets/hou-2026-world-model-for-robot-learning/tab03.png
    raw: raw/papers/hou-2026-world-model-for-robot-learning-figures/tab03.png
    caption: "world model 학습용 대표 데이터셋의 핵심 속성 — cross-embodiment·action·3D·language·multimodal (Table 3, p.26)"
    page: 26
    bbox_norm: [0.1293, 0.1137, 0.8707, 0.5362]
    strategy: table-region
    curated: false
  - id: tab04
    label: Table 4
    kind: table
    file: assets/hou-2026-world-model-for-robot-learning/tab04.png
    raw: raw/papers/hou-2026-world-model-for-robot-learning-figures/tab04.png
    caption: "같은 데이터셋을 world-modeling capability 기준으로 재배열한 표 (Table 4, p.27)"
    page: 27
    bbox_norm: [0.106, 0.0999, 0.894, 0.574]
    strategy: table-region
    curated: false
  - id: tab05
    label: Table 5
    kind: table
    file: assets/hou-2026-world-model-for-robot-learning/tab05.png
    raw: raw/papers/hou-2026-world-model-for-robot-learning-figures/tab05.png
    caption: "LIBERO 4-suite 대표 성적을 아키텍처 패러다임별로 묶은 표 (Table 5, p.28)"
    page: 28
    bbox_norm: [0.1975, 0.2935, 0.7979, 0.5922]
    strategy: table-region
    curated: true
  - id: tab06
    label: Table 6
    kind: table
    file: assets/hou-2026-world-model-for-robot-learning/tab06.png
    raw: raw/papers/hou-2026-world-model-for-robot-learning-figures/tab06.png
    caption: "RoboTwin·CALVIN·SIMPLER 계열 대표 성적표 (Table 6, p.29)"
    page: 29
    bbox_norm: [0.145, 0.1275, 0.855, 0.5165]
    strategy: table-region
    curated: false
---

## 한 줄 요약 (One-line Summary)

NTU MARS 랩이 주도하고 Berkeley·Stanford·Oxford·ETH 등 9개 기관이 참여한 43페이지 서베이다. 로봇 학습 관점에서 world model을 policy 결합 방식(Sec 3), 학습된 시뮬레이터 역할(Sec 4), 로봇 비디오 생성 능력(Sec 5)이라는 세 축으로 나눠 정리한다. 저자들은 이 분야의 병목이 그럴듯한 미래를 만드는 일에서 action에 인과적으로 aligned된 실행 가능한 미래를 만드는 일로 이동했다고 진단한다.

## 1. 자료 정보 (Document Information)

- **제목**: World Model for Robot Learning: A Comprehensive Survey
- **저자**: Bohan Hou·Gen Li·Jindou Jia·Tuo An·Xinying Guo (공동 1저자, 알파벳순), Sicong Leng, Haoran Geng, Yanjie Ze, Tatsuya Harada, Philip Torr, Oier Mees, Marc Pollefeys, Zhuang Liu, Jiajun Wu, Pieter Abbeel, Jitendra Malik, Yilun Du, Jianfei Yang (교신저자, jianfei.yang@ntu.edu.sg)
- **소속**: Nanyang Technological University, UC Berkeley, Stanford, University of Tokyo, University of Oxford, Microsoft, ETH Zurich, Princeton, Harvard
- **발행**: arXiv:2605.00080v1 [cs.RO], 2026년 4월 30일
- **분량**: 43페이지 (본문 31p + 참고문헌 12p), 인용 문헌 300건 이상
- **GitHub**: https://github.com/NTUMARS/Awesome-World-Model-for-Robotics-Policy (지속 갱신 표방)
- **프로젝트 페이지**: https://ntumars.github.io/wm-robot-survey/
- **유형**: Survey (taxonomy 중심, 실험 없음)

선행 서베이인 Zhang et al. 2025d(*A step toward world models: A survey on robotic manipulation*)와 무엇이 다른지는 저자들이 직접 세 가지로 밝힌다. 주요 패러다임을 더 세분화하고 policy 학습·계획·시뮬레이션·평가·데이터 생성에 걸친 역할을 폭넓게 분석한다. VLA policy와의 관계에서 world model을 로보틱스 중심으로 재정의한 점도 다르다.

## 2. 주요 기여 (Key Contributions)

1. **policy-centric 재정의**. policy는 현재 observation을 받아 다음 action을 정하는 함수를 말한다. 저자들은 world model을 "그럴듯한 미래를 예측하는 모델"이 아니라 "로봇 관련 action 아래에서 미래가 어떻게 변하는지를, 하위 policy 계산에 쓸 수 있는 형태로 예측하는 모델"로 좁힌다. 컴퓨터 비전의 일반적 future prediction보다 좁은 정의다. 그럴듯한 미래 영상을 만든다는 것만으로는 여기서 말하는 world model 자격을 얻지 못한다. embodied control에서 가장 중요한 부류는 action-conditioned world model이다.

2. **확률 렌즈로 4개 패러다임 통합**. 미래 observation과 미래 action의 결합 조건 분포 하나에서 policy 모델, passive world model, controllable world model, inverse dynamics model이 각각 주변화·조건화로 유도됨을 보인다. 서로 다른 추상화로 보이던 것들이 같은 이상적 결합 분포를 다르게 질의한 결과라는 정리다.

3. **아키텍처 5분류**. Sec 3을 IDM-style, single-backbone, MoE/MoT, unified VLA, latent-space world modeling으로 나누고 Table 1에 대표 연구 41건을 배치한다. 추론 시점에도 미래 생성이 살아 있는지, backbone이 VGM·UMM·MLLM 중 무엇인지, policy와 어떻게 결합하는지가 분류 축이다.

4. **시뮬레이터 역할의 2단계 발전 정리**. 1단계는 world model을 RL 환경으로 쓴다. 2단계는 시뮬레이터 자체가 불완전하다는 점을 인정해 policy와 함께 개선하는 co-evolution이다. WoVR·VLAW·World-VLA-Loop이 여기 해당한다.

5. **평가 체계 3층 정리**. open-loop 예측 품질, closed-loop 과제 유용성, 물리 일관성·조작 가능성 진단이라는 세 층으로 벤치마크를 나눈다. 어떤 단일 지표도 충분하지 않다고 결론짓는다.

6. **자료 카탈로그**. 학습용 데이터셋 27종을 두 관점(데이터 속성, 지원 가능한 world-modeling capability)으로 교차 정리한다. LIBERO·RoboTwin·CALVIN·SIMPLER 성적은 아키텍처 패러다임별로 묶어 제시한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 정의와 확률 구조

world model의 일반형은 다음과 같다.

```
p(x_{t+1:t+H} | x_t, a_{t:t+H-1}, l)            … (1)
```

여기서 `x_t`는 시각 observation·latent state·구조화된 물리 상태·심지어 계획용 추상 심볼 상태까지 될 수 있다. 상태 공간 선택에 일부러 중립적인 정식화다. action도 넓은 predictive-control 의미로 쓴다. 저수준 모터 명령 `a`는 에이전트가 *어떻게* 움직이는지를, 고수준 언어 지시 `l`은 *어떤* 미래가 실현되어야 하는지를 지정하며 둘 다 action으로 취급된다.

비디오 생성 모델은 이를 observation 공간에 인스턴스화한 특수형이다.

```
p(v_{t+1:t+H} | o_t, a_{t:t+H-1}, l)            … (2)
```

로봇 policy는 observation과 선택적 언어 지시에서 미래 action 시퀀스를 예측한다.

```
p(a_{t+1:t+k} | o_t, l)                         … (3)
```

저자들은 Sec 3.1에서 이 셋이 하나의 결합 분포에서 갈라져 나온다고 논증한다. 결합 분포 `p(o_{t+1:t+k}, a_{t+1:t+k} | o_t, l)` 하나를 놓고 보면,

| 이름 | 정식화 | 유도 |
|---|---|---|
| Policy Model | `p(a_{t+1:t+k} \| o_t, l)` | observation에 대해 주변화 (5) |
| Passive World Model | `p(o_{t+1:t+k} \| o_t, l)` | action에 대해 주변화 (6) |
| Controllable World Model | `p(o_{t+1:t+k} \| o_t, a_{t+1:t+k})` | action으로 조건화 (7) |
| Inverse Dynamics Model | `p(a_{t+1:t+k} \| o_{t:t+k})` | observation trajectory로 조건화 (8) |

policy는 world model이 만든 미래 observation을 중간 latent 변수로 쓰고 inverse-dynamics 스타일 디코더가 그 미래에서 실행 가능한 action을 복원한다. latent는 겉으로 드러나지 않는 모델 내부의 표현 공간을 가리킨다. 이 구조가 자연스러운 이유도 여기서 나온다.

foresight는 실행 전에 미래 상태나 action 결과를 내다보는 능력이다. imagination-driven planning은 상상한 rollout으로 후보 action을 비교해 고른다. data amplification은 데모나 상호작용 trajectory를 합성해 학습 데이터를 늘린다. 저자들이 실행 가능한(actionable) world model에 요구하는 세 가지 능력이다. 여기서 trajectory는 observation과 action이 시간순으로 이어진 실행 기록을 말한다.

### 3.2 policy와 결합하는 다섯 가지 방식

Sec 3의 흐름은 분리된 predict-then-act 파이프라인에서 통합·내재화된 예측 제어로 점점 이동한다. 다섯 계열의 비교는 Table 1에 있다. 다만 저자들은 이 진행이 "비디오 pre-training backbone이 VLM·latent·구조·심볼 대안보다 본질적으로 우월하다"는 뜻은 아니라고 명시한다. 어떤 예측 기질이 가장 효과적인지는 열린 실증 문제로 남겨둔다.

**(a) IDM-style.** 예측과 action을 분리한 predict-then-act 구조다. world model이 과제 조건부 미래 observation 시퀀스(또는 그 latent 표현)를 만들면 별도 policy 모듈이 현재 observation과 예측된 미래로부터 실행 action을 추론한다.

```
ô_{t+1:t+H} = W(o_t, l)                                        … (9)
π(a | o_t, l) = P(a_t | E_img(o_t), E_text(l), Φ(ô_{t+1:t+H})) … (11)
```

UniPi(Du et al., 2023)가 원형이다. 과제 조건부 미래 비디오를 만들고 인접 프레임 비교로 action을 뽑는 별도 IDM을 학습한다. 후속 연구는 대체로 policy에 어떤 형태의 미래를 노출할지를 다시 설계하는 쪽으로 진화했다. VidMan·Vidar는 masked inverse dynamics로 action 관련 영역을 강조한다. Gen2Act는 로봇 중심 rollout 대신 생성된 사람 비디오로 조건화한다. VPP·Video2Act는 픽셀 rollout을 버리고 pre-trained 비디오 diffusion의 latent 공간에서 제어 관련 특징만 뽑아 별도 action head에 주입한다. MimicVideo는 부분 denoise된 latent visual plan으로, TC-IDM·LVP는 도구 중심 기하 trajectory나 재타깃 가능한 visual plan 같은 실행 지향 중간물로 추상화 수준을 더 올린다. Say-Dream-ACT는 생성된 비디오 계획을 IDM 타깃이 아니라 in-context 시각 가이드로 쓴다.

한편 3D 구조를 중간물로 끼워 넣는 흐름도 있다. AVDC는 dense correspondence를, VidBot은 사람 영상에서 뽑은 3D 손 trajectory를, Object-centric 3D Motion Field는 객체 중심 3D 모션 구조를 쓴다. NovaFlow는 생성 영상을 실행 가능한 3D object flow로 distillation한다.

예측 모델을 먼저 학습한 뒤 동결하거나 가볍게 적응시켜 별도 policy head에 연결한다. 이 계열을 정의하는 특징이 바로 이 아키텍처 분리다. 모듈성과 재사용 가능한 비디오 prior, 해석 가능한 미래 예측을 얻지만 생성된 미래의 충실도와 제어 가능성이 성능 상한을 정한다. 시각적으로 그럴듯하되 action과 어긋난 예측에서 오차가 누적된다.

**(b) Single-backbone.** 하나의 생성 과정으로 합치는 계열이다. 미래 시각 표현과 action 표현을 이어붙인 `x = [z^v; z^a]`를 공유 backbone `f_θ`가 손상된 입력에서 복원하도록 학습한다(13, 14). 타깃은 인스턴스에 따라 diffusion noise, flow matching의 velocity field, discrete denoising의 masked token이 된다.

UVA는 joint video-action latent 공간을 배우되 경량 모달리티별 디코딩 head로 policy 추론이 명시적 비디오 생성을 건너뛰게 한다. UWA는 modality별 timestep을 둔 단일 transformer 안에 비디오·행동 diffusion을 통합한다. timestep을 제어하면 시각적 미래를 주변화해 policy처럼 질의할 수 있다. VideoVLA는 Video Diffusion Transformer를 Video-Action Diffusion Transformer로 확장해 pre-trained 비디오 모델 자체를 policy의 backbone으로 삼는다. Cosmos Policy는 pre-trained 비디오 diffusion 구조를 거의 그대로 두고 로봇 action·미래 상태·value를 원래 diffusion 시퀀스 안의 추가 latent 프레임으로 인코딩한다. 추론에서 direct policy 모드는 action 출력만 쓴다. planning 모드는 미래 상태와 value로 후보 trajectory를 순위 매긴다. DreamZero는 자유 주행식 장기 rollout 대신 closed-loop chunk-wise joint denoising으로 오차 누적을 제한한다. UD-VLA는 같은 원리를 discrete multimodal 설정으로 옮긴다. GigaWorld-Policy는 causal 설계로 추론 시 시각 분기를 선택적으로 만든다.

저자들의 정리에 따르면 이 계열의 실제 차이는 제어 중에 시각 분기가 얼마나 살아 있는지에서 나온다. 온라인에서 전체 미래 비디오를 렌더링하는지는 기준이 아니다.

**(c) MoE/MoT.** 전문가를 분리한 채 층마다 깊게 상호작용시킨다. 완전 파라미터 공유가 늘 최적은 아니라는 가정에서 출발한다. 비디오 예측과 action 생성은 시간 주파수와 표현 스케일, 최적화 요구가 서로 다르기 때문이다. 층마다 상호작용 연산자가 비디오 전문가와 action 전문가를 결합한다.

```
(h^v_{ℓ+1}, h^a_{ℓ+1}) = F^mix_ℓ(h^v_ℓ, h^a_ℓ; o_t, l)         … (15)
```

GE-Act는 pre-trained 비디오 diffusion world model 옆에 병렬 flow-matching action 경로를 두고 deep cross-attention으로 시각 latent를 주입한다. Motus는 이해·비디오 생성·action 전문가를 둔 Mixture-of-Transformers로 이 설계를 가장 직접적으로 구현한다. LingBot-VA는 비디오·action 토큰을 하나의 autoregressive 시퀀스로 교차 배치해 인과적 world modeling까지 확장한다. BagelVLA는 언어 계획·시각 예보·action 생성을 한 실행 루프에 엮고 Residual Flow Guidance의 single-step denoising으로 시각 foresight를 실용화한다. 이 계열의 하이브리드인 Fast-WAM은 흥미로운 결론을 낸다. 주된 이득이 추론 시 명시적 미래 상상보다 학습 시 비디오 co-training에서 온다고 진단한다. LDA-1B는 DINO latent 공간으로 시각 예보를 옮긴다. FRAPPE는 미래 observation 복원 대신 병렬 전문가 스트림을 visual foundation model에 latent 정렬한다.

**(d) Unified VLA.** MLLM 안에 예측 목적을 내재화하는 계열이다. 명시적 비디오 world model을 늘 쓰지는 않지만 같은 multimodal policy backbone 안에서 미래 지향 예측 구조를 배운다. 하위 부류는 명시적 미래 상태 예측(GR-1, UP-VLA, WorldVLA), 잠재·암묵적 미래 모델링(DreamVLA, UniVLA, CoWVLA), multi-expert·multi-system 통합 모델(F1, InternVLA-A1, HALO, TriVLA)로 나뉜다. WorldVLA는 미래 이미지 예측을 필수 추론 출력이 아니라 주로 joint training 신호로 쓴다.

**(e) Latent-space world modeling.** 픽셀을 아예 거치지 않는 경로다. 미래 observation을 합성하는 대신 예측 latent 타깃·미래 인식 임베딩·압축된 제어 조건을 만들어 action 생성과 결합한다. 개념적으로 JEPA 계열과 닿아 있지만 초점은 JEPA 자체가 아니라 이 원리를 policy 학습의 실용 기제로 바꾼 VLA 기법들이다.

FLARE는 action denoising 네트워크의 hidden feature를 미래 observation의 latent 임베딩에 정렬한다("Future Latent Representation Alignment"). VLA-JEPA는 leakage-free state prediction을 핵심 설계로 둔다. 미래 프레임을 오직 latent 타깃 생산에만 써서 모델이 픽셀 변화로 지름길을 타지 않고 action 관련 상태 전이를 배우게 한다. JEPA-VLA는 반대 방향이다. 별도 latent 예측 head를 붙이는 대신 V-JEPA 2 같은 비디오 JEPA가 이미 배운 예측 임베딩을 backbone으로 채택한다. 정적 시각 표현보다 나은 policy prior라고 보기 때문이다. WoG는 world modeling을 action 생성의 조건 공간으로 옮긴다. DIAL은 VLM feature 공간의 latent visual foresight를 구조적 병목으로 써서 고수준 의도와 저수준 action을 분리한다.

이 절 끝에는 심볼릭·planner 지향 world model이 보완 관점으로 붙는다. predicate·객체 관계·affordance·operator·인과 과정 위의 추상 전이 모델을 외재화해 심볼릭 또는 TAMP 계획기가 질의하는 계열이다.

### 3.3 시뮬레이터로서의 world model

실물 로봇 RL은 느리고 비싸고 리셋이 어렵고 위험할 수 있다. imitation learning은 사람 시연 데이터를 흉내 내 policy를 학습하는 방법인데, 순수 imitation learning은 데모 품질에 갇히고 실패로부터 배우기 어렵다. 저자들이 Sec 4에서 모은 연구들은 학습된 시뮬레이터 안의 상상 rollout으로 실제 상호작용을 대체한다.

```
(ô_{t+1}, r̂_t, d̂_t) ~ p_φ(· | o_≤t, a_≤t, l)                  … (16)
J(θ) = E[Σ γ^t r̂_t]                                           … (17)
L_RL(θ) = -E[min(r_t(θ)Â_t, clip(r_t(θ), 1-ε, 1+ε)Â_t)]        … (18, GRPO 계열)
```

1단계 연구군(UniSim, World-Env, VLA-RFT, DiWA, World4RL, World-Gymnast, PlayWorld, RehearseVLA, WMPO, ProphRL, RISE, GigaBrain-0.5M*)은 reward 설계와 rollout 표현, 최적화 호환성에서 달라질 뿐 world model을 policy 최적화가 일어나는 환경으로 다룬다는 점은 같다. reward는 policy가 얼마나 잘했는지를 알려주는 스칼라 신호다. DiWA는 대규모 play 데이터로 배운 동결 world model만으로 diffusion policy의 완전 오프라인 적응이 가능함을 보였다. World-Gymnast는 비디오 world model 안 RL이 supervised finetuning과 소프트웨어 시뮬레이터를 모두 능가할 수 있음을 보였다.

2단계는 시뮬레이터 자체의 불완전함을 직접 다룬다. World-VLA-Loop은 미래 observation과 reward를 함께 예측하고 policy 실패 rollout으로 시뮬레이터를 다듬는다. VLAW는 실데이터로 시뮬레이터를 고치고 합성 데이터로 VLA를 개선하는 왕복 전략을 쓴다. WoVR은 시뮬레이터 신뢰성을 중심 병목으로 보고 명시적 co-evolution을 정식화한다.

```
φ^{k+1} ← UpdateWM(φ^k, D_real ∪ D_policy(π_θ^k))
θ^{k+1} ← UpdatePolicy(θ^k, D̂(φ^{k+1}))                        … (19)
```

저자들은 Sec 4.2에서 같은 능력을 평가에 적용한다. 평가 쪽 용도는 네 가지로 나뉜다. 후보 action에 순위를 매기는 쪽에 GPC, IRASim, World-in-World, DreamPlan이 있다. world model을 transition dynamics로 삼는 MPC 계열에는 TD-MPC2와 LeWorldModel이 든다. policy 평가자 자체로 쓰는 사례가 Veo World Simulator의 Gemini Robotics policy 평가, WorldEval, WorldArena다. 명시적 피드백 head를 단 시뮬레이터로는 World-Env의 reward·종료 예측과 RISE의 progress value model이 있다. WorldEval은 학습된 world model이 실세계 policy 평가의 확장 가능한 대리자가 될 수 있는지, 서로 다른 policy와 같은 policy의 서로 다른 체크포인트까지 상상 안에서 순위 매길 수 있는지를 다룬다.

평가자는 상상한 미래가 후보 action의 인과적 결과를 보존할 때만 쓸모 있다. 저자들이 여기에 붙이는 단서다. WoVR이 지적하듯 환각과 장기 오차는 시각 품질만 떨어뜨리는 데 그치지 않는다. 평가 신호 자체를 오염시킨다.

### 3.4 로봇 비디오 world model의 4단계 (Sec 5)

| 단계 | 초점 | 대표 |
|---|---|---|
| 5.2 Imagination-based | 생성 prior로 미래 실행을 합성해 감독 신호 확장 | UniPi, Video Language Planning, Dreamitate, RoboDreamer, ManipDreamer, DreMa, PhysWorld, DreamGen |
| 5.3 Action-Controllable | 명령한 action 시퀀스를 미래가 얼마나 충실히 따르는가 | IRASim, RoboEnvision, RoboMaster, Ctrl-World, EnerVerse-AC, Interactive World Simulator, EVA |
| 5.4 Structure-Aware | 마스크·기하·시점·정체성 단서로 접촉 관계와 장면 구조 보존 | Mask2IV, TesserAct, RoboVIP |
| 5.5 Foundation Video WM | 대규모 비디오 backbone을 재사용 가능한 world model로 전환 | Vid2World, Genie Envisioner, DreamDojo, WoW, UnifoLM-WMA-0, Cosmos Predict 2.5, GigaWorld-0, ABot-PhysWorld |

DreMa는 Gaussian Splatting과 물리 시뮬레이터를 결합해 상상을 학습 가능한 디지털 트윈으로 재해석한다. PhysWorld는 생성 영상에서 물리 world model을 복원해 객체 중심 residual RL로 예측 모션을 실제 행동에 접지한다. Ctrl-World는 multi-view 예측·frame 수준 action 제어·메모리 기반 장기 생성을 묶어 policy 평가와 표적 개선을 함께 지원한다. TesserAct는 표현 공간을 2D 비디오에서 RGB·depth·normal의 4D embodied world model로 확장한다. WoW는 물리 직관이 수동적 영상 관찰만으로는 얻어지지 않는다고 판단하고 방대한 로봇 상호작용 trajectory로 대형 생성 world model을 학습해 상상-action 루프를 닫는다.

### 3.5 내비게이션과 자율주행 (Sec 6)

내비게이션에서 world model의 쓸모는 시각적 사실성보다 아직 보이지 않는 미래 구조를 계획에 쓸 수 있는 형태로 노출하는 데 있다. Pathdreamer는 미방문 실내 시점의 360° RGB·depth·semantic을 만든다. VISTA/VISTAv2는 egocentric 미래를 rollout해 온라인 value map에 투영한다. NWM은 제어 가능한 비디오 생성을 내비게이션 world model로 명시적으로 정식화한다.

자율주행은 요구 수준이 더 높다. 장기 예측과 다중 에이전트 상호작용, 구조화된 기하, 안전 필수 계획이 모두 걸린다. 압축·구조화된 예측 상태 쪽에는 MILE(latent dynamics)과 OccWorld(3D occupancy)가, 생성 관점 쪽에는 GAIA-1(비디오·텍스트·action 토큰의 multimodal sequence modeling)과 DriveDreamer가 있다. 최근에는 Drive-WM, UniDWM, DriveWorld-VLA, DriveVLA-W0, SteerVLA로 계획 지향·통합 주행 지능 쪽으로 이동한다. DriveVLA-W0는 world modeling을 통한 미래 이미지 예측이 저차원 action 감독만으로는 얻지 못하는 dense self-supervision을 제공해 end-to-end 주행 VLA의 데이터 스케일링 법칙을 증폭한다고 주장한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 평가 체계 3층

| 층 | 묻는 것 | 대표 벤치마크 |
|---|---|---|
| Open-loop 예측 품질 (7.1.1) | 명령한 action에 미래가 시간에 걸쳐 충실한가 | RBench, EWMBench, DreamGen Bench, EVA-Bench |
| Closed-loop 과제 유용성 (7.1.2) | 그 예측이 결정 루프 안에서 쓸모 있는가 | WorldArena, WorldEval, WorldGym, World-in-World |
| 물리·실행 가능성 진단 (7.1.3) | 어떤 성질이 실제 제어 사용 가능성을 가르는가 | WorldSimBench, WoW-World-Eval, DrivingGen, WM-ABench |

closed-loop 층에서는 픽셀 정확도보다 rank consistency·value fidelity·decision reliability가 더 유익한 기준으로 떠오른다. 진단 층의 WorldSimBench는 지각 평가와 조작 평가를 결합한다. 생성 영상이 inverse-dynamics 복원과 하위 제어를 지탱할 만큼 dynamics와 일관적인지를 묻기 위해서다. WoW-World-Eval은 IDM 기반 Turing Test로 생성 영상이 그럴듯하고 실행 가능한 행동을 유도하는지 본다.

### 4.2 LIBERO 4-suite (Table 5, 성공률 %)

| 그룹 | 기법 | Spatial | Object | Goal | Long | Avg |
|---|---|---|---|---|---|---|
| Decoupled | Say-Dream-ACT | 99.4 | 99.2 | 98.6 | 95.4 | **98.1** |
| Decoupled | MimicVideo | 94.2 | 96.8 | 90.6 | 94.0 | 93.9 |
| Decoupled | UniPi | – | – | – | **0.0** | – |
| Single-backbone | Cosmos Policy | 98.1 | 100.0 | 98.2 | 97.6 | **98.5** |
| Single-backbone | UD-VLA | 94.1 | 95.7 | 91.2 | 89.6 | 92.7 |
| MoE/MoT | LingBot-VA | 98.5 | 99.6 | 97.2 | 98.5 | **98.5** |
| MoE/MoT | Motus | 96.8 | 99.8 | 96.6 | 97.6 | 97.7 |
| Unified VLA | RynnVLA-002 | 99.0 | 99.8 | 96.4 | 94.4 | 97.4 |
| Unified VLA | TriVLA | 91.2 | 93.8 | 89.8 | 73.2 | 87.0 |
| Latent-space WM | VLA-JEPA | 96.2 | 99.6 | 97.2 | 95.8 | 97.2 |
| Latent-space WM | JEPA-VLA | 97.2 | 98.0 | 95.6 | 94.8 | 96.4 |

초기 UniPi의 Long suite 0.0과 최신 기법의 95~98 대비가 3년 사이 격차를 그대로 보여준다. Spatial·Object에서는 대부분 이미 강한데 Goal, 특히 Long에서 점수가 크게 떨어진다. 장기 조작은 여전히 변별점이다.

### 4.3 저자들이 뽑은 세 결론

embodied world model은 표준 하위 조작 벤치마크에서 이미 실무적 쓸모를 보인다. 높은 성능이 여러 설계 패러다임에서 함께 나오므로 photorealistic 비디오 생성은 효과적 embodied control의 필요조건이 아니다. 남은 과제로는 장기 견고성과 벤치마크 간 일반화, 플랫폼을 가로지르는 표준 보고 체계의 부재를 꼽는다.

RoboTwin·CALVIN·SIMPLER 계열(Table 6)은 LIBERO보다 더 흩어져 있다. 한 벤치마크의 강한 성능이 다른 벤치마크로 반드시 이어지지 않는다. 현재 embodied world model이 embodiment와 action space, 과제 구성, 평가 프로토콜 차이에 여전히 민감함을 보여준다.

### 4.4 학습 데이터셋 현황 (Table 3·4, 27종)

대규모 로봇 trajectory 코퍼스(OXE, DROID, BridgeData V2, AgiBot World, Galaxea, RoboMIND 2.0)는 action-conditioned 예측에 필요한 기본 전이 커버리지를 제공한다. cross-embodiment 데이터셋은 플랫폼 간 이전 가능한 dynamics prior를 유도한다. 사람 영상·human-to-robot 자원(DexWild, EgoMimic, In-N-On, UniHand 2.0)은 로봇 수집 trajectory 밖의 상호작용 규칙성을 배우는 경로다. 촉각·힘·접촉 데이터(FreeTacMan, VTDexManip, RH20T, Hoi!)는 실행 가능성과 물리 일관성을 접지하는 데 특히 중요하다.

저자들은 자원이 빠르게 늘었어도 실패 복구와 결정에 민감한 변이, 물리적으로 접지된 조밀한 감독은 대규모 성공 데모에 비해 훨씬 희소하다고 짚는다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

Causal conditioning gaps (8.1). 예측 목적 함수 상당수는 observation 이력과 과제 의도에서 주로 학습된다. 그래서 생성된 미래가 의미상 그럴듯하고 의도와 일치하더라도 정작 실행 대기 중인 action의 물리적 결과에는 충실하지 않을 수 있다. 이 약한 action conditioning이 정밀 closed-loop 제어에서 유용성을 떨어뜨린다. WorldVLA의 암묵적 통합 학습이 완화 시도로 언급된다.

Efficiency bottlenecks (8.2). world model 기반 policy는 VLA보다 학습·추론 모두 훨씬 무겁다. diffusion 기반 비디오 예측의 반복 denoising이 지연을 키운다. 대응책으로는 경량 어댑터 같은 파라미터 효율 전략, MimicVideo·LingBot-VA의 부분 denoising(세부 시각 디테일보다 모션 dynamics 우선)이 있다. 더 근본적으로는 LeWorldModel의 latent 공간 축소, 그리고 Fast-WAM처럼 world modeling을 학습에만 쓰고 추론에서 제거하는 분리가 있다.

Multi-modal perception bottlenecks (8.3). 시각과 proprioception에 치우쳐서 마찰·강성·접촉 안정성 같은 직접 관찰되지 않는 속성을 못 잡는다. 촉각 센서는 고주파 순간 사건을 잡지만 저차원 신호라 joint latent 최적화에서 고차원 시각 특징에 희석되거나 압도되기 쉽다. 비동기·이종 주파수 신호 정렬과 시각 지배 방지가 구조적 과제다.

Classical control integration (8.4). MPC는 action 최적화를 위해 world model rollout을 반복해야 해서 고용량 모델의 실시간 배치를 심하게 제약한다. 더 근본적으로는 학습된 dynamics의 신경망 표현력과 Lyapunov 안정성·robust control 같은 형식적 제어 보증을 양립시키는 문제가 남는다.

Symbolic structure integration (8.5). 심볼릭 표현은 픽셀 기반 rollout의 장기 오차 누적을 완화할 수 있다. 다만 적절한 추상화와 지각 접지가 필요하다. 고차원 observation이 사전 정의된 심볼로 잘 매핑되지 않으면 이 방식은 작동하지 않는다. 학습된 지각 표현과 심볼 구조를 결합한 하이브리드가 유망한 방향으로 제시된다.

Evaluation metrics (8.6). 널리 합의된 평가 지표가 없다. 시각적으로 그럴듯해도 action-conditioned dynamics와 인과 일관성, 제어 가능성을 못 지키는 모델이 있다. 반대로 시각적 사실성이 낮아도 계획이나 policy 평가에 유용할 수 있다. 저자들은 과제 성공률과 policy 순위 충실도, 실행 가능성 진단 같은 소수 표준 지표 집합을 세워 그럴듯하기만 한 모델과 실제로 실행 가능한 모델을 구분하자고 제안한다.

서베이 자체의 한계도 있다. 실험이 없는 taxonomy 서베이라 Table 5·6 수치는 모두 원논문이 직접 보고한 값의 취합이고 동일 조건 재현이 아니다. 저자들도 프로토콜이 서로 달라 엄밀한 순위 비교에는 부적합하다고 명시한다. 인용 문헌 상당수가 2026년 arXiv 프리프린트여서 동료 심사를 거치지 않은 결과가 많다는 점도 읽을 때 감안할 부분이다.

## 6. 관련 연구 (Related Work)

- **선행 서베이**: Zhang et al. 2025d, *A step toward world models: A survey on robotic manipulation* (arXiv:2511.02097). 본 서베이는 더 세분화된 패러다임 구분, 역할 전반의 분석, VLA policy와의 관계에서 본 로보틱스 중심 정의로 차별화를 주장한다.
- **world model 계보**: Craik 1943(설명의 본질), Miller et al. 1960(인지과학의 내부 모델), Conant & Ashby 1970, Bryson & Ho 1975, Richalet et al. 1978(MPC), Lozano-Perez 1983(고전 로봇 계획), Ha & Schmidhuber 2018(현대 부활의 기점).
- **VLA 계보**: RT-2(Zitkovich et al., 2023), OpenVLA(Kim et al., 2025), π0(Black et al., 2024), π0.5(Physical Intelligence, 2025), FAST 토큰화(Pertsch et al., 2025), Diffusion Policy(Chi et al., 2023).
- **JEPA 계열**: I-JEPA(Assran et al., 2023), V-JEPA 2(Assran et al., 2025), V-JEPA 2.1(Mur-Labadia et al., 2026).
- **비디오 backbone**: CogVideoX(Yang et al., 2024b), Wan(2025), Cosmos Predict 2.5(Ali et al., 2025).
- **wiki 내부 접점**: [[llms/cai-2026-vlm3-vision-language-models]] — 표준 VLM이 3D를 네이티브로 배운다는 주장은 이 서베이 Sec 3.6의 픽셀을 거치지 않는 예측 표현 논지와 방향이 같다.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| World model | action 아래에서 agent-환경 dynamics가 어떻게 전개되는지를 예측하는 모델. 이 서베이에서는 하위 policy 계산에 쓸 수 있어야 한다는 조건이 붙는다 |
| Action-conditioned WM | action으로 조건화된 world model. embodied control에서 가장 중요한 부류 |
| Passive / Controllable WM | action을 주변화한 예측기 / action으로 조건화한 예측기 |
| IDM (Inverse Dynamics Model) | observation trajectory에서 그 사이 실행된 action을 복원하는 모델 |
| VLA (Vision-Language-Action) | 시각·언어 observation을 로봇 action으로 직접 매핑하는 policy. VLM을 로봇 trajectory 데이터로 파인튜닝해 만드는 것이 일반적 |
| VGM / UMM / MLLM | Table 1의 backbone 계열 — 비디오 생성 모델 / 통합 multimodal 모델 / multimodal LLM |
| MoT (Mixture-of-Transformers) | 모달리티별 전문가를 유지한 채 shared attention으로 결합하는 sparse 아키텍처 |
| JEPA | 픽셀이 아니라 임베딩 공간에서 예측하는 joint-embedding predictive architecture |
| Action chunk | 시간적 일관성 확보와 오차 누적 완화를 위해 길이 k의 덩어리로 예측하는 action 시퀀스 |
| Foresight / Imagination-driven planning / Data amplification | 저자들이 정의한 actionable world model의 3대 능력 |
| GRPO | 이 맥락에서 상상 rollout 기반 policy 최적화에 쓰이는 clipped-ratio 목적 함수 (식 18) |
| Co-evolution | policy rollout이 world model을 다듬고 개선된 world model이 더 나은 상상 데이터를 내는 왕복 갱신 (식 19) |
| Open-loop / Closed-loop 평가 | 계획 루프 밖에서 예측 품질만 보는 평가 / 결정 루프 안에서 유용성을 보는 평가 |
| LIBERO / CALVIN / RoboTwin / SIMPLER | 조작 policy 평가에 널리 쓰이는 벤치마크. LIBERO는 Spatial·Object·Goal·Long 4-suite |
| Post-training | pre-trained policy를 학습된 시뮬레이터 안 RL 등으로 추가 개선하는 단계 |

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 2 | Figure 1 — 서베이 3축 구성 개관 | page-region | ★ wiki 권장 (overview) |
| fig02 | 3 | Figure 2 — 2023.1~2026.3 대표 연구 시간축 진화 | page-region | ★ wiki 권장 (landscape) |
| fig03 | 4 | (오탐) 본문 교차참조가 줄머리에 온 페이지 | page-region | ✗ 제외 |
| fig04 | 8 | Table 1 — Sec 3 아키텍처 5분류 비교표 | page-region | ★ wiki 권장 (taxonomy) |
| fig05 | 10 | Figure 3 — IDM / Single-backbone / MoT 3대 아키텍처 | page-region | ★ wiki 권장 (architecture) |
| fig06 | 13 | Figure 4 — Unified VLA와 Latent world modeling 두 경로 | page-region | ★ wiki 권장 (architecture) |
| fig07 | 16 | Figure 5 — 시뮬레이터의 두 용도 (RL / validation) | page-region | ★ wiki 권장 (method) |
| fig08 | 19 | Figure 6 — 로봇 비디오 world model 통합 관점 | page-region | ★ wiki 권장 (method) |
| fig09 | 20 | Table 2 — Sec 5 capability regime별 기법 비교 | page-region | (선택) |
| fig10 | 26 | Table 3 — 데이터셋 27종 핵심 속성 | page-region | (선택) |
| fig11 | 27 | Table 4 — 데이터셋의 capability 관련성 | page-region | (선택) |
| fig12 | 28 | Table 5 — LIBERO 4-suite 성적표 | page-region | ★ wiki 권장 (result) |
| fig13 | 28 | (오탐) fig12와 같은 페이지 재캡처 | page-region | ✗ 제외 |
| fig14 | 29 | Table 6 — RoboTwin·CALVIN·SIMPLER 성적표 | page-region | (선택) |

> **추출 메모**: MVP의 캡션 정규식이 `Figure\s+\d+`라서 이 PDF의 `Figure4`(공백 없음)를 놓쳤고 본문 줄머리 교차참조("Figure 2 highlights…", "Table 5 focuses on…")를 오탐으로 잡았다. 캡션 앵커를 줄머리 `^(Figure|Table)\s*(\d+)`로 바꿔 재추출한 결과가 위 14건이다. 오탐 2건(fig03·fig13)은 트레이서빌리티를 위해 아카이브에 남기되 큐레이션에서 제외한다.
