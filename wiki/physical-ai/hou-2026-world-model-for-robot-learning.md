---
title: "World Model for Robot Learning: A Comprehensive Survey"
type: paper
year: 2026
category: physical-ai
raw_path: /Users/kmyu/Desktop/project/ai-wiki/raw/papers/hou-2026-world-model-for-robot-learning.pdf
raw_filename: "hou-2026-world-model-for-robot-learning.pdf"
source_collection: external
source: hou-2026-world-model-for-robot-learning.md
authors: "Bohan Hou, Gen Li, Jindou Jia, Tuo An, Xinying Guo, Sicong Leng, Haoran Geng, Yanjie Ze, Tatsuya Harada, Philip Torr, Oier Mees, Marc Pollefeys, Zhuang Liu, Jiajun Wu, Pieter Abbeel, Jitendra Malik, Yilun Du, Jianfei Yang"
arxiv_id: "2605.00080"
tags: [physical-ai, world-model, robot-learning, vla]
figures:
  - id: fig01
    file: assets/hou-2026-world-model-for-robot-learning/fig01.png
    raw: raw/papers/hou-2026-world-model-for-robot-learning-figures/fig01.png
    caption: "서베이 전체 구성 — Sec 3(정책), Sec 4(시뮬레이터), Sec 5(로봇 비디오) 세 축 (Figure 1, p.2)"
    page: 2
    strategy: page-region
    curated: true
  - id: fig02
    file: assets/hou-2026-world-model-for-robot-learning/fig02.png
    raw: raw/papers/hou-2026-world-model-for-robot-learning-figures/fig02.png
    caption: "2023.1~2026.3 대표 연구의 시간축 진화 — 상단 world model for policy, 하단 world model as simulator (Figure 2, p.3)"
    page: 3
    strategy: page-region
    curated: true
  - id: fig03
    file: assets/hou-2026-world-model-for-robot-learning/fig03.png
    raw: raw/papers/hou-2026-world-model-for-robot-learning-figures/fig03.png
    caption: "(오탐) 본문 교차참조 'Figure 2 highlights…'가 줄머리에 와서 잡힌 p.4 — 도식 없음"
    page: 4
    strategy: page-region
    curated: false
  - id: fig04
    file: assets/hou-2026-world-model-for-robot-learning/fig04.png
    raw: raw/papers/hou-2026-world-model-for-robot-learning-figures/fig04.png
    caption: "Sec 3의 5개 아키텍처 패러다임 비교표 — 대표 연구·추론 시 future generation·backbone·coupling style (Table 1, p.8)"
    page: 8
    strategy: page-region
    curated: true
  - id: fig05
    file: assets/hou-2026-world-model-for-robot-learning/fig05.png
    raw: raw/papers/hou-2026-world-model-for-robot-learning-figures/fig05.png
    caption: "정책으로서의 world model 3대 아키텍처 — (a) IDM-style (b) Single-backbone (c) MoT-style (Figure 3, p.10)"
    page: 10
    strategy: page-region
    curated: true
  - id: fig06
    file: assets/hou-2026-world-model-for-robot-learning/fig06.png
    raw: raw/papers/hou-2026-world-model-for-robot-learning-figures/fig06.png
    caption: "MLLM 기반 두 경로 — (a) Unified VLA (b) Latent world modeling policy (Figure 4, p.13)"
    page: 13
    strategy: page-region
    curated: true
  - id: fig07
    file: assets/hou-2026-world-model-for-robot-learning/fig07.png
    raw: raw/papers/hou-2026-world-model-for-robot-learning-figures/fig07.png
    caption: "시뮬레이터로서의 두 용도 — (a) RL용 학습된 시뮬레이터 (b) 후보 행동 채점(validation) (Figure 5, p.16)"
    page: 16
    strategy: page-region
    curated: true
  - id: fig08
    file: assets/hou-2026-world-model-for-robot-learning/fig08.png
    raw: raw/papers/hou-2026-world-model-for-robot-learning-figures/fig08.png
    caption: "로봇 비디오 world model 통합 관점 — 상상 엔진 → action 조건화 → structure 조건화 (Figure 6, p.19)"
    page: 19
    strategy: page-region
    curated: true
  - id: fig09
    file: assets/hou-2026-world-model-for-robot-learning/fig09.png
    raw: raw/papers/hou-2026-world-model-for-robot-learning-figures/fig09.png
    caption: "Sec 5의 4개 capability regime별 대표 기법 비교표 (Table 2, p.20)"
    page: 20
    strategy: page-region
    curated: false
  - id: fig10
    file: assets/hou-2026-world-model-for-robot-learning/fig10.png
    raw: raw/papers/hou-2026-world-model-for-robot-learning-figures/fig10.png
    caption: "world model 학습용 대표 데이터셋의 핵심 속성 — cross-embodiment·action·3D·language·multimodal (Table 3, p.26)"
    page: 26
    strategy: page-region
    curated: false
  - id: fig11
    file: assets/hou-2026-world-model-for-robot-learning/fig11.png
    raw: raw/papers/hou-2026-world-model-for-robot-learning-figures/fig11.png
    caption: "같은 데이터셋을 world-modeling capability 기준으로 재배열한 표 (Table 4, p.27)"
    page: 27
    strategy: page-region
    curated: false
  - id: fig12
    file: assets/hou-2026-world-model-for-robot-learning/fig12.png
    raw: raw/papers/hou-2026-world-model-for-robot-learning-figures/fig12.png
    caption: "LIBERO 4-suite 대표 성적을 아키텍처 패러다임별로 묶은 표 (Table 5, p.28)"
    page: 28
    strategy: page-region
    curated: true
  - id: fig13
    file: assets/hou-2026-world-model-for-robot-learning/fig13.png
    raw: raw/papers/hou-2026-world-model-for-robot-learning-figures/fig13.png
    caption: "(오탐) 본문 'Table 5 focuses on…'이 줄머리에 와서 잡힌 p.28 재캡처 — fig12와 같은 페이지"
    page: 28
    strategy: page-region
    curated: false
  - id: fig14
    file: assets/hou-2026-world-model-for-robot-learning/fig14.png
    raw: raw/papers/hou-2026-world-model-for-robot-learning-figures/fig14.png
    caption: "RoboTwin·CALVIN·SIMPLER 계열 대표 성적표 (Table 6, p.29)"
    page: 29
    strategy: page-region
    curated: false
---

## 요약 (Summary)

NTU MARS 랩이 주도하고 Berkeley·Stanford·Oxford·ETH·Princeton·Harvard 등 9개 기관이 참여한 43페이지 서베이다. Pieter Abbeel, Jitendra Malik, Jiajun Wu, Yilun Du, Marc Pollefeys 같은 이름이 저자 명단에 함께 올라 있다. 로봇 학습 관점에서 world model 문헌을 세 축으로 나눠 정리한다. Sec 3은 정책과 결합하는 방식을 본다. Sec 4는 학습된 시뮬레이터로서의 쓰임을, Sec 5는 로봇 비디오 world model이 어떤 능력 순서로 발전해 왔는지를 다룬다.

이 서베이는 world model을 생성 모델이 아니라 예측 구조로 본다. 저자들은 "그럴듯한 미래 영상을 만든다"는 것만으로는 여기서 말하는 world model 자격을 얻지 못한다고 명시한다. 로봇과 관련된 행동 아래에서 미래가 어떻게 변하는지를 하위 정책 계산에 실제로 쓸 수 있는 형태로 예측해야 한다. embodied AI에서 예측 품질은 행동에 쓸모 있는 만큼만 의미가 있다.

분야 진단도 같은 축 위에 있다. 병목은 더 이상 사실적인 미래를 만드는 데 있지 않다. 이제 미래는 로봇 행동에 인과적으로 정렬돼야 하고 장기간 물리·기구학적으로 자기일관적이어야 한다. 시점과 embodiment가 바뀌어도 흔들리지 않아야 하고 실제 정책 개선을 지탱할 만큼 실행 가능해야 한다.

![[assets/hou-2026-world-model-for-robot-learning/fig01.png]]
*Figure 1: 서베이 전체 구성 — Sec 3은 아키텍처 관점, Sec 4는 응용 관점, Sec 5는 world-modeling 능력 관점 (Hou et al. 2026, p.2)*

## 주요 기여 (Key Contributions)

1. **정책 중심 재정의.** world model을 로보틱스·embodiment 중심으로 좁혀 정의하고 가장 중요한 부류로 action-conditioned world model을 지목한다. 보기에는 그럴듯해도 행동과 어긋난 미래는 closed-loop 의사결정에서 가치가 제한적이기 때문이다.

2. **확률 렌즈로 4개 패러다임 통합.** 정책 모델, passive world model, controllable world model, inverse dynamics model은 모두 하나의 결합 조건 분포를 다르게 질의한 결과다.

3. **아키텍처 5분류.** IDM-style, single-backbone, MoE/MoT, unified VLA, latent-space world modeling. Table 1에 대표 연구 41건을 배치했다.

4. **시뮬레이터 역할의 2단계 정리.** 1단계는 world model을 RL 환경으로 쓴다. 2단계는 시뮬레이터 자체의 불완전함을 인정하고 정책과 함께 개선하는 co-evolution으로 넘어간다.

5. **평가 체계 3층 정리.** open-loop 예측 품질, closed-loop 과제 유용성, 물리·실행 가능성 진단 세 층으로 나눈다. 어떤 단일 지표도 충분하지 않다고 결론짓는다.

6. **자료 카탈로그.** 학습용 데이터셋 27종과 LIBERO·RoboTwin·CALVIN·SIMPLER 성적을 아키텍처 패러다임별로 묶어 실었다.

![[assets/hou-2026-world-model-for-robot-learning/fig02.png]]
*Figure 2: 2023.1~2026.3 대표 연구의 시간축 진화. 상단은 policy 결합(UniPi·GR-1에서 Cosmos Policy·JEPA-VLA까지), 하단은 simulator 활용(IRASim·World4RL에서 WoVR·PlayWorld까지) (Hou et al. 2026, p.3)*

## 방법론 및 아키텍처 (Methodology and Architecture)

### 네 패러다임은 같은 분포의 다른 질의

world model의 일반형은 `p(x_{t+1:t+H} | x_t, a_{t:t+H-1}, l)`이다. 상태 `x_t`는 시각 관측일 수도 있고 latent state일 수도 있다. 구조화된 물리 상태나 계획용 추상 심볼 상태도 가능하다. 상태 공간 선택에 일부러 중립을 지킨 정식화다.

서베이는 action을 넓은 predictive-control 의미로 쓴다. 저수준 모터 명령 `a`는 에이전트가 *어떻게* 움직이는지를 지정하고 고수준 언어 지시 `l`은 *어떤* 미래가 실현되어야 하는지를 정한다. 둘 다 action으로 취급된다.

미래 관측과 미래 행동의 결합 분포 `p(o_{t+1:t+k}, a_{t+1:t+k} | o_t, l)` 하나에서 네 패러다임이 모두 유도된다. Sec 3.1의 핵심 논증이다.

| 이름 | 정식화 | 유도 |
|---|---|---|
| Policy Model | `p(a_{t+1:t+k} \| o_t, l)` | 관측에 대해 주변화 |
| Passive World Model | `p(o_{t+1:t+k} \| o_t, l)` | 행동에 대해 주변화 |
| Controllable World Model | `p(o_{t+1:t+k} \| o_t, a_{t+1:t+k})` | 행동으로 조건화 |
| Inverse Dynamics Model | `p(a_{t+1:t+k} \| o_{t:t+k})` | 관측 궤적으로 조건화 |

그래서 정책이 world model의 미래 관측을 중간 잠재 변수로 쓰고 inverse-dynamics 스타일 디코더가 거기서 실행 가능한 행동을 복원하는 구조가 자연스럽게 나온다.

실행 가능한 world model은 세 가지를 할 수 있어야 한다. foresight는 실행 전에 미래 상태나 행동 결과를 내다보는 일이다. imagination-driven planning은 상상한 rollout으로 후보 행동을 비교·선택한다. 데모나 상호작용 궤적을 합성하는 data amplification까지가 셋이다.

### 정책과 결합하는 다섯 가지 방식

![[assets/hou-2026-world-model-for-robot-learning/fig04.png]]
*Table 1: Sec 3의 아키텍처 5분류. 추론 시 미래 생성 여부·backbone 계열(VGM·UMM·MLLM)·결합 방식 세 축으로 41건을 배치한다 (Hou et al. 2026, p.8)*

연구는 predict-then-act로 분리하던 방식에서 벗어나 예측 제어를 정책 안으로 통합하는 쪽으로 가고 있다. 다만 저자들은 이 진행이 "비디오 사전학습 backbone이 VLM·latent·구조·심볼 대안보다 본질적으로 우월하다"는 뜻은 아니라고 명시한다. 어떤 예측 기반(substrate)이 가장 잘 통하는지는 아직 실증으로 답이 안 났다.

![[assets/hou-2026-world-model-for-robot-learning/fig05.png]]
*Figure 3: 앞의 세 아키텍처. (a) IDM-style은 비디오 생성 후 IDM이 행동 복원, (b) Single-backbone은 관측·행동 토큰을 공유 backbone에서 처리, (c) MoT-style은 전문가를 분리한 채 joint attention으로 결합 (Hou et al. 2026, p.10)*

**IDM-style (분리형).** world model이 과제 조건부 미래 관측을 만들고 별도 정책 모듈이 실행 행동을 추론한다. UniPi가 원형이다. 후속 연구는 정책에 어떤 형태의 미래를 보여줄지를 다시 설계하는 쪽으로 진화했다. VPP·Video2Act는 픽셀 rollout을 버리고 비디오 diffusion의 잠재 공간에서 제어 관련 특징만 뽑아 별도 action head에 주입한다. TC-IDM·LVP는 도구 중심 기하 궤적이나 재타깃 가능한 visual plan 같은 실행 지향 중간물로 추상화 수준을 한 단계 더 올렸다. 모듈성과 재사용 가능한 비디오 prior를 얻는 대신 생성된 미래의 충실도가 성능 상한을 정하고 행동과 어긋난 예측에서 오차가 누적된다.

**Single-backbone.** 미래 시각 표현과 행동 표현을 이어붙인 `x = [z^v; z^a]`를 공유 backbone이 복원하도록 학습한다. Cosmos Policy가 이 아이디어를 곧바로 구현한 사례다. 사전학습 비디오 diffusion 구조를 거의 그대로 두고 로봇 행동·미래 상태·value를 원래 diffusion 시퀀스 안의 추가 잠재 프레임으로 인코딩한다. 추론에서 direct policy 모드는 행동 출력만 쓰고 planning 모드는 미래 상태와 value로 후보 궤적을 순위 매긴다. 저자들의 정리에 따르면 이 계열의 실제 차이는 온라인에서 전체 미래 비디오를 렌더링하느냐에 있지 않다. 제어 중 시각 분기가 얼마나 살아 있는지에서 갈린다.

**MoE/MoT.** 완전 파라미터 공유가 늘 최적은 아니라는 가정에서 출발한다. 비디오 예측과 행동 생성은 시간 주파수·표현 스케일·최적화 요구가 다르기 때문이다. Motus는 이해·비디오 생성·행동 전문가를 둔 Mixture-of-Transformers로 이 설계를 가장 직접 표현한다. Fast-WAM의 결론은 흥미롭다. 주된 이득은 추론 시 명시적 미래 상상보다 학습 시 비디오 co-training에서 온다고 본다.

![[assets/hou-2026-world-model-for-robot-learning/fig06.png]]
*Figure 4: MLLM 기반 두 경로. (a) Unified VLA는 행동과 함께 textual reasoning·visual prediction 같은 미래 지향 출력을 내고, (b) Latent world modeling은 미래 이미지를 명시적으로 예측하는 대신 압축된 world representation을 내부에 만든다 (Hou et al. 2026, p.13)*

**Unified VLA.** 명시적 비디오 world model 없이도 같은 multimodal 정책 backbone 안에서 미래 지향 예측 구조를 배운다. 미래 이미지를 직접 예측하는 계열(GR-1, UP-VLA, WorldVLA), 잠재·암묵적 미래 모델링(DreamVLA, UniVLA, CoWVLA), multi-expert 통합 모델(F1, InternVLA-A1, HALO, TriVLA)로 갈린다. WorldVLA는 미래 이미지 예측을 필수 추론 출력으로 두지 않고 주로 joint training 신호로 쓴다.

**Latent-space world modeling.** 픽셀을 아예 거치지 않는다. FLARE는 행동 denoising 네트워크의 hidden feature를 미래 관측의 잠재 임베딩에 정렬한다. VLA-JEPA는 leakage-free state prediction을 핵심에 둔다. 미래 프레임을 오직 잠재 타깃 생산에만 써서 모델이 픽셀 변화로 지름길을 타지 못하게 한다. JEPA-VLA는 반대 방향이다. V-JEPA 2가 이미 배운 예측 임베딩이 정적 시각 표현보다 나은 정책 prior라고 보고 이를 backbone으로 채택한다.

### 시뮬레이터로서의 world model

![[assets/hou-2026-world-model-for-robot-learning/fig07.png]]
*Figure 5: 두 가지 용도. (a) RL 설정에서 world model은 정책 개선용 상상 전이를 만드는 학습된 시뮬레이터가 되고, (b) validation 설정에서는 후보 행동의 상상된 결과를 채점해 결정 시점 선택을 돕는다 (Hou et al. 2026, p.16)*

실물 로봇 RL은 느리고 비싸고 리셋이 어렵고 위험할 수 있다. 순수 모방 학습은 데모 품질에 갇히고 실패로부터 배우기 어렵다. 그래서 학습된 시뮬레이터 안의 상상 rollout으로 실제 상호작용을 대체한다. world model `p_φ`가 상상 전이를 만들고 필요하면 보상·종료 신호까지 제공한다. 정책은 GRPO 계열 목적 함수로 개선된다.

1단계 연구군(UniSim, World-Env, VLA-RFT, DiWA, World4RL, WMPO, RISE, GigaBrain-0.5M*)은 보상 설계와 rollout 표현에서 갈린다. world model을 정책 최적화가 일어나는 환경으로 다루기는 다 마찬가지다. DiWA는 대규모 play 데이터로 배운 동결 world model만으로 diffusion policy의 완전 오프라인 적응이 가능함을 보였다.

2단계는 시뮬레이터가 불완전하다는 사실 자체를 다룬다. World-VLA-Loop은 정책 실패 rollout으로 시뮬레이터를 다듬는다. VLAW는 실데이터로 시뮬레이터를 고치고 합성 데이터로 VLA를 개선하는 왕복 전략을 쓴다. WoVR은 시뮬레이터 신뢰성을 중심 병목으로 본다. co-evolution을 `φ^{k+1} ← UpdateWM(φ^k, D_real ∪ D_policy)`, `θ^{k+1} ← UpdatePolicy(θ^k, D̂(φ^{k+1}))`로 명시적으로 정식화한다. RL을 world model 안에서 돌리는 데서 world model을 함께 고쳐 가며 돌리는 쪽으로 초점이 옮겨갔다.

상상한 미래가 후보 행동의 인과적 결과를 보존할 때만 평가자가 쓸모 있다고 저자들은 단서를 단다. WoVR이 지적하듯 환각과 장기 오차는 시각 품질에서 끝나지 않고 평가 신호 자체를 오염시킨다. 평가에는 사실성만으로 부족하다. rollout이 실세계 실행을 따라갈 만큼 신뢰할 수 있는지가 관건이다.

### 로봇 비디오 world model의 네 단계

![[assets/hou-2026-world-model-for-robot-learning/fig08.png]]
*Figure 6: Sec 5의 통합 관점. 핵심 객체(5.1) 위에 상상 기반 감독(5.2), action 조건화를 통한 인과 정렬(5.3), structure 조건화를 통한 물리 일관성(5.4)이 쌓이고, 5.5는 재사용 가능한 world-model 인터페이스로의 전환을 다룬다 (Hou et al. 2026, p.19)*

| 단계 | 초점 | 대표 |
|---|---|---|
| Imagination-based | 생성 prior로 미래 실행을 합성해 감독 신호 확장 | UniPi, Dreamitate, RoboDreamer, DreMa, PhysWorld, DreamGen |
| Action-Controllable | 명령한 행동을 미래가 얼마나 충실히 따르는가 | IRASim, RoboMaster, Ctrl-World, EnerVerse-AC, EVA |
| Structure-Aware | 마스크·기하·시점 단서로 접촉 관계와 장면 구조 보존 | Mask2IV, TesserAct, RoboVIP |
| Foundation Video WM | 대규모 비디오 backbone을 재사용 가능한 world model로 | Vid2World, Genie Envisioner, DreamDojo, WoW, Cosmos Predict 2.5, GigaWorld-0 |

DreMa는 Gaussian Splatting과 물리 시뮬레이터를 결합해 상상을 학습 가능한 디지털 트윈으로 재해석한다. WoW는 수동적으로 영상만 봐서는 물리 직관이 생기지 않는다고 보고 방대한 로봇 상호작용 궤적으로 대형 생성 world model을 학습해 상상-행동 루프를 닫는다.

### 내비게이션과 자율주행

내비게이션에서 world model이 쓸모 있는 지점은 영상의 사실성보다 아직 보이지 않는 미래 구조를 계획에 쓸 수 있는 형태로 노출하는 데 있다(Pathdreamer, VISTA/VISTAv2, NWM). 자율주행에서는 요구가 더 세다. 장기 예측, 다중 에이전트 상호작용, 안전 필수 계획이 모두 걸린다. 압축·구조화된 예측 상태 쪽에 MILE과 OccWorld가, 생성 관점 쪽에 GAIA-1과 DriveDreamer가 있다. DriveVLA-W0는 world modeling으로 미래 이미지를 예측하면 저차원 행동 감독만으로는 얻지 못하는 dense self-supervision이 생기고 그것이 end-to-end 주행 VLA의 데이터 스케일링 법칙을 증폭한다고 본다.

## 결과 (Results)

### 평가 체계 3층

| 층 | 묻는 것 | 대표 벤치마크 |
|---|---|---|
| Open-loop 예측 품질 | 명령한 행동에 미래가 시간에 걸쳐 충실한가 | RBench, EWMBench, DreamGen Bench, EVA-Bench |
| Closed-loop 과제 유용성 | 그 예측이 결정 루프 안에서 쓸모 있는가 | WorldArena, WorldEval, WorldGym, World-in-World |
| 물리·실행 가능성 진단 | 어떤 성질이 실제 제어 사용 가능성을 가르는가 | WorldSimBench, WoW-World-Eval, DrivingGen, WM-ABench |

closed-loop 층에서는 픽셀 정확도보다 rank consistency·value fidelity·decision reliability가 더 유익한 기준으로 자리 잡는다. WorldEval은 학습된 world model이 서로 다른 정책과 같은 정책의 서로 다른 체크포인트까지 상상 안에서 순위 매길 수 있는지를 다룬다.

### LIBERO 4-suite

![[assets/hou-2026-world-model-for-robot-learning/fig12.png]]
*Table 5: LIBERO 4-suite 성적을 아키텍처 패러다임별로 묶은 표. Cosmos Policy·LingBot-VA가 98.5로 최상위 (Hou et al. 2026, p.28)*

| 그룹 | 기법 | Spatial | Object | Goal | Long | Avg |
|---|---|---|---|---|---|---|
| Decoupled | Say-Dream-ACT | 99.4 | 99.2 | 98.6 | 95.4 | 98.1 |
| Decoupled | UniPi | – | – | – | 0.0 | – |
| Single-backbone | Cosmos Policy | 98.1 | 100.0 | 98.2 | 97.6 | **98.5** |
| MoE/MoT | LingBot-VA | 98.5 | 99.6 | 97.2 | 98.5 | **98.5** |
| MoE/MoT | Motus | 96.8 | 99.8 | 96.6 | 97.6 | 97.7 |
| Unified VLA | RynnVLA-002 | 99.0 | 99.8 | 96.4 | 94.4 | 97.4 |
| Unified VLA | TriVLA | 91.2 | 93.8 | 89.8 | 73.2 | 87.0 |
| Latent-space WM | VLA-JEPA | 96.2 | 99.6 | 97.2 | 95.8 | 97.2 |

2023년 UniPi는 Long suite에서 0.0이었는데 최신 기법은 95~98이다. 3년 사이 격차가 이만큼 벌어졌다. Spatial·Object에서는 대부분 이미 강한데 Goal, 특히 Long에서 점수가 크게 떨어진다. 장기 조작이 여전히 변별점이다.

### 저자들이 뽑은 세 결론

표준 하위 조작 벤치마크에서 embodied world model은 이미 실제로 쓸모가 있다. 높은 성능은 여러 설계 패러다임에서 함께 나온다. 그래서 photorealistic 비디오 생성이 효과적 embodied control의 필요조건은 아니다. 남은 과제는 장기 견고성과 벤치마크 간 일반화다. 플랫폼이 달라도 통하는 표준 보고 체계가 없다는 문제도 있다.

RoboTwin·CALVIN·SIMPLER 계열은 LIBERO보다 파편화가 심해서 한 벤치마크의 강한 성능이 다른 벤치마크로 반드시 이어지지 않는다. 지금 embodied world model은 embodiment·행동 공간·과제 구성·평가 프로토콜 차이에 여전히 민감하다.

### 데이터셋에서 비는 부분

기본 전이 커버리지는 대규모 로봇 궤적 코퍼스(OXE, DROID, BridgeData V2, AgiBot World, RoboMIND 2.0)가 맡는다. 사람 영상 자원(DexWild, EgoMimic, UniHand 2.0)으로는 로봇이 직접 모은 궤적 밖의 상호작용 규칙성을 배운다. 실행 가능성을 접지하는 데는 촉각·힘 데이터(FreeTacMan, VTDexManip, RH20T)가 중요하다. 자원은 빠르게 늘었지만 실패 복구, 결정에 민감한 변이, 물리적으로 접지된 조밀한 감독은 대규모 성공 데모에 비해 여전히 훨씬 드물다. 저자들이 꼽는 핵심 한계다.

## 한계 (Limitations)

- **Causal conditioning gaps.** 많은 예측 목적 함수가 관측 이력과 과제 의도에서 주로 학습된다. 그래서 생성된 미래가 의미상 그럴듯하고 의도와 일치하면서도 실행 대기 중인 행동의 물리 결과에는 충실하지 않을 수 있다. 이 약한 action conditioning 탓에 정밀 closed-loop 제어에서는 쓸모가 줄어든다.
- **Efficiency bottlenecks.** world model 기반 정책은 VLA보다 학습·추론 모두 훨씬 무겁다. diffusion 비디오 예측의 반복 denoising이 지연을 키운다. 대응은 경량 어댑터, 부분 denoising(MimicVideo·LingBot-VA), 잠재 공간 축소(LeWorldModel), world modeling을 학습에만 쓰고 추론에서 빼는 분리(Fast-WAM)다.
- **Multi-modal perception bottlenecks.** 시각과 proprioception에 치우쳐 마찰·강성·접촉 안정성 같은 관측 불가 속성을 못 잡는다. 촉각 신호는 저차원이라 joint latent 최적화에서 고차원 시각 특징에 희석되거나 압도되기 쉽다.
- **Classical control integration.** MPC는 행동 최적화를 위해 rollout을 반복해야 해서 고용량 모델의 실시간 배치를 심하게 제약한다. 학습된 dynamics의 표현력과 Lyapunov 안정성 같은 형식적 제어 보증을 어떻게 양립시킬지도 남은 문제다.
- **Symbolic structure integration.** 픽셀 rollout의 장기 오차 누적은 심볼릭 표현으로 완화할 수 있다. 다만 적절한 추상화와 지각 접지가 필요하다. 고차원 관측이 사전 정의된 심볼로 깔끔히 매핑되지 않으면 무너진다.
- **Evaluation metrics.** 널리 합의된 지표가 없다. 보기에는 그럴듯해도 인과 일관성을 못 지키는 모델이 있다. 반대로 사실성이 낮아도 계획에 유용할 수 있다.

Sec 8이 꼽는 여섯 가지에 더해 **서베이 자체의 한계**도 있다. 실험 없는 taxonomy 서베이라 Table 5·6 수치는 모두 원논문이 직접 보고한 값의 취합이고 동일 조건 재현이 아니다. 저자들도 프로토콜 이질성 때문에 엄밀한 순위 비교에는 부적합하다고 명시한다. 인용 문헌 상당수가 2026년 arXiv 프리프린트여서 동료 심사를 거치지 않은 결과가 많다. 읽을 때 감안해야 한다.

## 관련 페이지 (Related Pages)

- [[llms/cai-2026-vlm3-vision-language-models]] — 표준 VLM이 3D를 네이티브로 배운다는 주장. 이 서베이 Sec 3.6이 말하는 픽셀을 거치지 않는 예측 표현과 같은 방향이다. VLM3가 다루는 metric depth·camera pose 같은 능력은 world model이 물리 세계를 접지할 때 바탕이 되는 지각 능력이기도 하다.
- [[physical-ai/zhang-2024-vision-and-language-navigation-today]] — world model을 로봇 학습이 아니라 navigation 축에서 다룬 자매 서베이. 정책 결합 방식 5분류의 자리에 history/memory·generalization ability 두 challenge가 들어선다

## 외부 참조

- arXiv: https://arxiv.org/abs/2605.00080
- GitHub (지속 갱신): https://github.com/NTUMARS/Awesome-World-Model-for-Robotics-Policy
- 프로젝트 페이지: https://ntumars.github.io/wm-robot-survey/
- 선행 서베이: Zhang et al., *A step toward world models: A survey on robotic manipulation*, arXiv:2511.02097 (2025) — wiki 미수록
