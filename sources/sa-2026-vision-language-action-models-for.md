---
title: "Vision-Language-Action (VLA) Models for Bimanual Manipulation and Their Real-World Deployment: A Comprehensive Survey"
type: paper
year: 2026
category: physical-ai
raw_path: raw/papers/sa-2026-vision-language-action-models-for.pdf
raw_filename: "sa-2026-vision-language-action-models-for.pdf"
source_collection: external
authors: "Inkyu Sa (Chef Robotics)"
tags: [physical-ai, vla, manipulation, robot-learning]
figures:
  - id: fig01
    file: assets/sa-2026-vision-language-action-models-for/fig01.png
    raw: raw/papers/sa-2026-vision-language-action-models-for-figures/fig01.png
    caption: "Fig. 1: 네 곳의 배치 현장(듀벳 펴는 humanoid 2대, Chef Robotics 컨베이어 분배, Physical Intelligence 가정 주방, Boston Dynamics와 DeepMind Atlas 부품 랙). 각 기관 공개 이미지, 저작권은 원소유자"
    page: 1
    strategy: page-region
    curated: false
  - id: fig02
    file: assets/sa-2026-vision-language-action-models-for/fig02.png
    raw: raw/papers/sa-2026-vision-language-action-models-for-figures/fig02.png
    caption: "Fig. 2: 이 서베이의 중심 도식. 행은 coupling 정도(independent / loosely coupled / tightly coupled), 열은 action-head 계열(autoregressive / flow / diffusion / hybrid). tightly coupled 행에서만 방법이 나뉜다"
    page: 5
    bbox_norm: [0.0702, 0.0686, 0.9298, 0.5505]
    strategy: manual
    curated: true
  - id: fig06
    file: assets/sa-2026-vision-language-action-models-for/fig06.png
    raw: raw/papers/sa-2026-vision-language-action-models-for-figures/fig06.png
    caption: "Fig. 3: 통일된 시간축 위의 마일스톤. research(파랑), hardware(주황), field deployment(초록) 세 트랙. 실전 배치는 그 기반 역량보다 대략 2년 늦게 시작 (같은 page에 Table II 병존)"
    page: 8
    strategy: page-region
    curated: false
  - id: fig09
    file: assets/sa-2026-vision-language-action-models-for/fig09.png
    raw: raw/papers/sa-2026-vision-language-action-models-for-figures/fig09.png
    caption: "Fig. 4: 하나의 backbone을 공유하는 네 action-head 메커니즘과 각 지연 예산. flow(K≈10)만 da=16에서 50Hz에 들어간다 (page 13 상단)"
    page: 13
    bbox_norm: [0.0702, 0.0758, 0.9298, 0.391]
    strategy: manual
    curated: true
  - id: fig10
    file: assets/sa-2026-vision-language-action-models-for/fig10.png
    raw: raw/papers/sa-2026-vision-language-action-models-for-figures/fig10.png
    caption: "Fig. 5: 학습 파이프라인. 각 단계에 무엇이 들어가고(초록) 무엇이 보호하는지(빨강). 데이터 비용이 자릿수 단위로 다르다 (page 13 하단, 같은 page 상단이 Fig. 4)"
    page: 13
    bbox_norm: [0.0702, 0.3975, 0.9298, 0.6513]
    strategy: manual
    curated: true
  - id: fig11
    file: assets/sa-2026-vision-language-action-models-for/fig11.png
    raw: raw/papers/sa-2026-vision-language-action-models-for-figures/fig11.png
    caption: "Fig. 6: 같은 세대 policy를 네 방식으로 측정한 값. sim 97.1 / real task-specific 43.7 / real generalist 17.7 / production KPI 99. 함의된 신뢰도가 약 2자릿수 벌어진다 (page 25 상단)"
    page: 25
    bbox_norm: [0.5, 0.0687, 0.9298, 0.4328]
    strategy: manual
    curated: true
---

## 한 줄 요약 (One-line Summary)

VLA 문헌 200편 이상을 양팔(bimanual) 조작이라는 렌즈로 7개 측면(아키텍처, 학습 레시피, action 표현, 협응 전략, 언어 접지, memory와 world model, 실전 배치)에 걸쳐 정리한 35페이지 서베이. 어떤 아키텍처가 두 팔 과제에서 성공할지를 예측하는 변수는 과제 종류가 아니라 두 팔의 결합도(coupling tightness)라는 게 중심 주장이다.

## 1. 자료 정보 (Document Information)

- 저자: Inkyu Sa, Chef Robotics (inkyu@chefrobotics.ai). 단독 저자
- 연도: 2026 (mid-2026까지 포함, π0.7, GR00T N1.7, Xiaomi-Robotics-0 등 2026년 시스템까지 다룸)
- 분량과 규모: 본문 30페이지 + 참고문헌 5페이지, 인용 200편 이상, 31개 방법 비교표, 그림 6개(Fig. 1~6)와 표 14개(Table I~XIV)
- 성격: 조사(survey). 데모부터 실전 배치까지의 최신 세대를 표로 대조하고 벤치마크와 현장 성능의 간극을 명시적으로 다룬다.
- 저자 소속(Chef Robotics)이 식품 조립 VLA 배치 사례로 서베이 XI장에 직접 등장한다. 배치(deployment) 논의에 현장 관점이 실려 있다.

## 2. 주요 기여 (Key Contributions)

세 가지를 저자가 명시한다.

- action 생성 메커니즘(autoregressive, flow, diffusion, hybrid)으로 VLA를 분류하고 이를 양팔 결합도와 교차시킨 taxonomy. 어느 head가 어느 결합 영역을 감당하느냐를 셀 단위 질문으로 바꾼다(Fig. 2).
- 31개 VLA 방법을 아키텍처 설계, 학습 레시피, action 표현, 보고된 벤치마크 성능으로 대조한 비교표. 각 셀이 그 값을 보고한 출처로 추적 가능.
- 식품 조립, 제조, 물류, 가정, 수술, 실험실, 농업에 걸친 상용 배치 조사와, 벤치마크 성능과 현장 성능 사이 간극에 대한 명시적 진단. 여기서 세 연구 방향이 도출된다.

핵심 발견은 "가장 강한 두 팔 결과가 action chunking을 결합한 flow-matching head에서 나온다"는 것과, 그 기계적 이유(near-straight 경로 덕분에 약 10회의 integration step이면 되고, 그래서 생성 head가 실시간 예산 안에 들어감)다. 다만 근거의 도달 범위를 반복해서 제한한다. tightly coupled 결과를 보고한 시스템이 거의 한 계열(π family)이고 프로토콜이 공유되지 않으며 표준 양팔 벤치마크가 없어, 비교가 통제된 측정이 아니라 서로 다른 조건의 자기보고에 기댄다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### VLA 정식화와 양팔 문제

policy는 observation을 받아 다음 action을 정하는 함수를 말한다. 여기서는 πθ: O × L × Q → A로 두고 이미지, 언어 지시, proprioception을 받아 action을 낸다. VLA를 이전 visuomotor policy와 구분하는 건 계산하는 사상이 아니라 표현이 어디서 오느냐다. 로봇 데이터를 보기 전에 인터넷 규모 image-text로 학습된 backbone을 거친다. policy를 encoder, backbone, action head로 분해하면 흥미로운 설계 질문은 head가 무엇이냐로 좁혀진다.

Action chunking은 한 observation에서 연속 action 블록 At = (at, …, at+H−1) ∈ R^(H×da)를 예측하는 기법이다(ACT에서 도입, 이제 거의 보편). observation은 매 스텝 policy가 받는 센서 입력이다. 이득은 둘이다. 비싼 forward pass 한 번을 H step에 분산하는 경제성, 그리고 블록을 한꺼번에 내놓아 시간적으로 일관된 계획에 모델을 묶는 표현력. 대가는 open-loop 시간이다.

두 팔을 더하면 문제가 정량과 정성 양쪽에서 바뀐다. 한 step action이 a^bi = [a^L; a^R]로 이어붙어 7관절 팔 두 개에 그리퍼면 da=16, H=50이면 한 번에 일관되게 생성할 800차원 객체가 된다. 정성적으로 더 어려운 지점은 두 팔이 함께 쥔 물체를 통해 결합된다는 데 있다. 그 결합도는 과제마다 다르다.

세 결합 영역(coupling regime):
- **Independent**: 공유 제약 없이 각자 subtask (한 팔이 용기를 들고 다른 팔이 담기).
- **Loosely coupled**: 타이밍은 맞아야 하지만 힘은 아니어도 됨 (handover에서 놓기가 잡기 뒤에 와야 함).
- **Tightly coupled**: 움직임과 힘이 연속으로 계속 일치해야 함 (두 팔이 천을 팽팽히 당길 때, 어긋나면 주름지거나 떨어짐).

세 번째 영역만이 결합 생성(joint action generation)을 진짜로 압박한다. 서베이의 두 분류 기준(결합 영역 × action head)은 한 양의 수요와 공급이다. 그 양은 한 결정 지평 안에서의 팔 간 상관(inter-arm correlation)이다. tightly coupled 과제가 요구하는 건 이 상관을 지평 내내 보존하는 것이고 head가 공급하는 건 지평을 방출하는 방식(토큰 순차 vs 한 번에)이다.

### Flow matching이 지배하게 된 이유

최근 action head는 대개 회귀가 아니라 생성이다. Flow matching은 straight-line 변위로 벡터장 vθ(x,t)를 회귀 학습한다. π0가 이 방식의 첫 VLA였고 실질적 의의는 step 수에 있다. 학습 경로가 거의 직선이라 diffusion의 수십에서 수백 step 대신 약 10 step이면 쓸 만한 샘플이 나온다. 이게 생성 head를 실시간 예산에 넣는 요인이다. Rectified flow가 그 기하를 설명한다. 직선 경로는 적은 step으로 정확히 적분되고 굽은 경로는 아니다.

### action head 4계열 (Section V)

- **Autoregressive**: 언어 모델을 최소 변경. RT-1(FiLM-EfficientNet, per-dim 분류 head), RT-2(PaLI-X 55B / PaLM-E, action-as-text 256 bins), OpenVLA(7B Prismatic, 256 bins, OXE, 첫 완전 오픈). 대가는 양자화 오차와 차원 수에 비례하는 decode 시간이며 둘 다 두 팔에서 가장 세게 걸린다. OpenVLA는 지연 관점의 유용한 음성 결과다(완전 오픈이지만 실시간 양팔 루프엔 구조적으로 부적합).
- **Flow-based**: π0(3B PaLIGemma, H=50, K=10, shirt folding 80%)가 패턴을 열었고 π0.5(계층 구조로 상위가 subgoal 언어, 하위 flow가 실행. 미개조 가정에서 지시 따르기 94% / 과제 성공 83%), π*0.6/RECAP(자율 경험으로 학습, throughput 2배와 실패율 절반), π0.7(Gemma 3 4B + 860M action expert ≈5B, 다채널 prompt 조향으로 subtask, multi-view subgoal 이미지, episode metadata, control-mode. fine-tuning 없이 specialist 수준, laundry 100%, 미지 UR5e zero-shot 85.6% vs 사람 90.9%).
- **Diffusion**: Diffusion Policy(K=50~100 → ~300ms, 실시간 양팔 불가), RDT-1B(1.2B, DiT diffusion, H=64, SigLIP+T5, handover 등 tight coupling), CogACT(action-oriented token으로 조건 형성), Octo(diffusion head지만 목적 backbone. 분류 기준이 독립임을 보임).
- **Hybrid / Efficient**: HybridVLA(그리퍼는 discrete AR, 팔은 continuous flow를 한 모델에서 라우팅), TinyVLA(distillation, 50Hz on consumer HW), MiniVLA(~1B, residual-VQ), FAST(DCT+BPE 토큰화로 AR을 다시 경쟁력 있게. 학습 5배 빠름, 그러나 ~750ms/chunk).

Fig. 2가 핵심 결론이다. Independent와 loosely coupled 행에서는 거의 모든 방법이 작동하고 tightly coupled 행에서만 방법이 나뉜다. AR은 한 팔을 먼저 확정하고 다른 팔을 시작하므로 두 팔이 보조를 못 맞춘다. 셀은 "측정된 순위"가 아니라 "메커니즘이 함의하는 바"임을 저자가 명시한다.

### 학습 레시피 (Section VI)

세 단계 관례가 자리잡았다. backbone 상속 → 로봇 pre-train → 좁은 과제 적응. 진짜 이견은 적응이 pre-training을 훼손하는 걸 어떻게 막느냐, 그리고 자율 경험을 이어붙일지다.
- pre-training은 두 번 일어난다. 상속된 web image-text(비용 없음), 그리고 로봇 데이터(OXE 등). π0는 flow-matching 손실과 language-modeling 손실을 함께 둔 co-training(Eq. 12)으로 언어 역량을 지킨다. 일관된 발견은 "breadth beats volume".
- 적응 시 retention 기법으로는 데이터 혼합(π0 ~50:50), Knowledge Insulation(backbone을 action-expert gradient에서 격리하고 discrete action token으로 감독), LoRA가 있다.
- RL로 imitation 천장을 넘음: RECAP(π*0.6)이 핵심. policy가 자율 실행하고 VLM이 결과를 판정, 성공 episode를 학습셋에 넣고 재적합(Algorithm 1). hand-designed reward 병목을 없앤 게 load-bearing.
- 데이터 수집 경제학: ALOHA 양방향 teleop(2만 달러 미만, 50~100 demos/hr), UMI 핸드헬드(5천 달러 미만, ~110/hr, 로봇 없이 어디서나), 자율 수집(4~12 episodes/hr, 무인 24시간). 결정적 변수는 양이 아니라 분포다.

### action 표현과 실시간 실행 (Section VII)

- discrete 토큰화: 균일 binning(RT-2와 OpenVLA, B=256)은 backbone 무변경이 매력이지만 양자화 상한과 순차 decode 비용이 따른다. FAST는 DCT+BPE 압축으로 양팔 chunk를 13.2× 줄이고(shirt-folding 14차원 50Hz에서 수백 토큰 → ~53) 학습을 5배 빠르게 하되, reactive 루프엔 여전히 느리다.
- continuous 생성: flow(K=10)가 50Hz에 여유 있게 들어가고 diffusion(K=50~100)은 결정적 sampler로 10~20까지 줄일 수 있으나 fidelity 손실. flow가 실시간 양팔을 도맡게 된 이유는 sampling 기하지 모델 용량이 아니다.
- chunking 지평: H=50 @ 50Hz = 1초. 한 조작 phase(approach, grasp, manipulate, release)의 자연 길이와 우연히 맞아떨어진다. temporal ensembling은 phase 경계에서 상충 계획을 평균 내 해가 될 수 있어 π0는 버렸다.
- 지연과 반응성 스케줄링: RTC(다음 chunk를 실행 중 생성, 이미 커밋된 부분을 고정 문맥으로 두어 반응 시간을 chunk 실행 시간 1,000ms에서 생성 시간 50~70ms로), BID(추론 시 후보 여러 개 뽑아 backward coherence로 선택), TTAC(학습 시 prefix 조건화로 run-time 비용 0).

### 횡단 관심사 (Section X)

- 시각 표현: backbone encoder(SigLIP/CLIP, 의미 풍부하지만 metric 정밀도 약함), robot-specific(R3M 등), multi-view fusion(양팔은 팔당 wrist camera + 3인칭 필수. 한 시점이 두 작업 공간과 공유 물체를 다 못 담음).
- 안전: bounds와 rate limit, OOD 탐지(flow head는 최종 step velocity-field norm이 신뢰도 proxy), 팔 간 충돌 회피, 인간 개입. 넷 다 heuristic이고 실패율 상한을 주지 못한다.
- sim2real: 마찰, compliance, 변형이 가장 부실하게 시뮬레이션되는데 그게 tight coupling의 본질. 현재 시스템은 물리 데이터 위주로 학습(locomotion과 반대).
- world model(Section X-D): 반응 대신 예측. GigaBrain-0/0.5M(합성 데이터 엔진, 양팔 folding과 packing 약 30% 향상), V-JEPA 2(100만 시간 영상 self-supervised, zero-shot 65~80%), direct video action(Rhoda AI). 다섯 한계는 compounding error, inverse-dynamics 오차, 비용(수백 ms), hallucination, haptic 미접지.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

- flow-matching이 최강 양팔 결과: π0 shirt folding 80%, π0.7 T-shirt/shorts folding ~100% (RL specialist 대비 ~1.5× throughput), 미지 양팔 UR5e에서 zero-shot shirt folding 85.6% task progress (숙련 teleoperator 90.9% 대비).
- RECAP(π*0.6): 가장 어려운 과제에서 throughput 2배 초과, 실패율 약 절반. 같은 시기 어떤 아키텍처 증분보다 효과 큼.
- FAST: 양팔 데이터에서 균일 binning 대비 토큰 13.2× 압축, 학습 ~5× 빠름, 그러나 ~750ms/chunk로 reactive 양팔 루프엔 한 자릿수 느림.
- 추론 비용(Table XIV): π0 ~70ms(A100/RTX4090, 50Hz@H=50), OpenVLA ~150ms(~7Hz/chunk), RDT-1B ~150ms, GR00T N1.7 31ms(RTX5090)~92ms(Jetson Thor)~173ms(Orin), Xiaomi-Robotics-0 ~80ms(RTX4090, K=5, 30Hz), TinyVLA ~40ms, MiniVLA ~25ms, SmolVLA ~18ms(1GB 미만).
- LIBERO(추적 가능한 것만, Table IV): OpenVLA 84.7/88.4/79.2/53.7(spatial/object/goal/long), OpenVLA-OFT 97.1 suite 평균. CogACT, RDT-1B, TinyVLA는 원 논문이 LIBERO를 보고하지 않아 이전 draft에서 제거(추적성 원칙).
- hosted 실제 로봇 30과제와 4개 embodiment(RoboChallenge): π0.5 task-specific 43.7 최고, π0 task-specific 28.3, CogACT 11.7, π0.5 generalist 17.7(task-specific 대비 26%p 하락), π0 generalist 9.3(19%p 하락).
- 배치 규모와 VLA 성격은 반비례: 최대 규모(10^8 servings, 25만 production hrs, 50만 orders)는 좁고 언어 조건화가 아니며 가장 VLA-native한 산업 배치(Figure 02/Helix @ BMW)가 ~1,250시간.
- Fig. 6의 측정 문제: sim 97.1 / real task-specific 43.7 / real generalist 17.7 / production KPI 99 초과. 세 왼쪽 막대는 프로토콜이 달라 엄밀히 비교 불가지만 함의된 신뢰도가 약 2자릿수 벌어진다는 게 요점.

## 5. 한계와 향후 과제 (Limitations and Future Work)

저자가 세 지속적 난점과 세 연구 방향을 명시한다.

지속적 난점:
- 접촉과 힘: force 피드백 없는 위치 공간 policy는 tight coupling이 요구하는 힘을 조절 못하고 동시 접촉 수가 늘수록 난이도 상승.
- 평가: 공용 양팔 벤치마크가 없어 방법 간 비교가 임시 과제셋에 기대고 통상 10~50 trial의 신뢰구간이 주장되는 차이보다 넓다.
- 데이터: 양팔 시연이 로봇 학습에서 가장 비싼 데이터, 데이터가 못 덮은 구성에서 policy가 저하, 자율 실습 대안은 분 단위 credit assignment에 막힘.

연구 방향:
1. 공용 양팔 벤치마크: 결합 영역 × 물체 종류 × 지평 세 항목을 동시에 덮고 주장 차이를 가를 만큼 큰 trial 수를 고정. 연구가 아니라 커뮤니티 조율이 막는 유일한 방향이라 첫째로 둠.
2. dexterity, force, multi-modal sensing 통합: 다지 손(40차원 이상), 촉각과 force 채널, 이벤트를 표시하는 audio. 셋이 서로 있을 때 가장 유용하므로 한 문제. 시뮬레이션이 데이터 취득처이자 난점 집중처(접촉과 변형이 가장 부실).
3. 배치를 견디는 safety와 reliability 논증: rate limit과 action clipping은 실패율 상한을 못 준다. runtime monitoring, constrained generation, 팔 간과 인간과의 증명 가능한 회피 필요. 자율 경험 학습과 few-shot 적응이 유망하되 둘 다 안전 논증 가용성에 의존.

증거 도달 범위 caveat(반복 강조): tightly coupled 결과가 거의 π family 한 계열, 공용 프로토콜 없음, 전부 자기보고이고 3자 감사 없음. joint policy와 decomposed policy를 같은 tight 과제에서 같은 프로토콜로 비교한 연구가 아직 없음.

## 6. 관련 연구 (Related Work)

기존 서베이와의 차별점을 저자가 짚는다. foundation models for robotics 서베이는 상위 계획과 추론만 다루고 양팔 협응의 저수준 제어를 안 다룬다. imitation과 diffusion policy 리뷰는 action 생성은 상세하나 VLA 프레임 이전이다. multi-arm robotic systems 서베이는 고전적 motion planning, force control, task allocation에 집중하고 학습 기반을 안 다룬다. 이 서베이만이 문헌을 결합도로 조직하고 그 분석을 실전 배치 기록과 짝지운다.

이 wiki 안의 인접 자료:
- [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation]]: GR00T N1. 본 서베이가 open-weight dual-system 대표로 인용(N1.7 revision은 accelerator별 지연표 공개, 31~173ms). GR00T N1이 이 서베이 Table III, XIV, XII의 한 행.
- [[physical-ai/hou-2026-world-model-for-robot-learning]] 와 [[physical-ai/li-2025-a-comprehensive-survey-on-world]]: world model 서베이 2종. 본 서베이 Section X-D(world model as data engine, future prediction)와 주제가 겹침. 병목이 "그럴듯한 미래에서 action에 alignment된 실행 가능한 미래로" 옮겨갔다는 진단이 여기 compounding-error, haptic 미접지 한계와 맞물린다.
- [[physical-ai/luo-2025-sonic-supersizing-motion-tracking]]: SONIC. whole-body humanoid 제어(locomotion 영역). 본 서베이는 aerial과 legged를 manipulator와 policy나 레시피를 공유할 때만 포함하므로 직접 대상은 아니지만 universal action token(FSQ)과 humanoid 배치 맥락이 인접.
- [[physical-ai/zhang-2024-vision-and-language-navigation-today]]: VLN 서베이. embodied AI의 navigation 영역. 본 서베이는 manipulation 영역에서 같은 개념(world/human model, language grounding)을 다룸.
- [[overviews/physical-ai-overview]]: physical-ai 허브. (이 자료가 들어오면서 "자료 0건" 전제는 이미 해소됨. 허브 갱신 후보.)

## 7. 용어집 (Glossary)

- **VLA (Vision-Language-Action model)**: 시각, 언어, action을 하나의 학습된 policy 안에 둔 모델. 인터넷 규모 VLM backbone에서 시맨틱을 상속.
- **coupling tightness**: 두 팔이 공유 물체를 통해 얼마나 강하게 결합되는지 (independent / loosely coupled / tightly coupled). 이 서베이의 조직 원리.
- **action chunking**: 한 observation에서 H개 연속 action 블록을 예측(ACT). H=50 @ 50Hz ≈ 1초 ≈ 한 조작 phase.
- **flow matching**: straight-line 변위로 벡터장을 회귀 학습하는 생성 방식. near-straight 경로라 K≈10 step으로 충분해 실시간 예산에 들어감.
- **diffusion (DDPM/DDIM)**: 노이즈에서 chunk로 역노이징. 표현력 강하나 K=50~100 step으로 느림.
- **RECAP**: RL from Autonomous Capability. policy가 자율 실행하면 VLM이 판정하고 성공 episode로 재적합. hand-designed reward 제거. π*0.6과 함께 도입.
- **FAST**: DCT+BPE 기반 action 토큰화. 양팔 chunk 13.2× 압축, 학습 5× 빠름.
- **RTC / BID / TTAC**: real-time chunking(실행 중 다음 chunk 생성) / bidirectional decoding(추론 시 후보 선택) / training-time action conditioning(prefix 조건을 학습에 넣음). 지연과 반응성 트레이드 관리 3종.
- **Knowledge Insulation (KI)**: backbone을 action-expert gradient에서 격리하고 discrete action token으로 감독해 언어 역량 보존.
- **MEM**: multi-scale embodied memory. 최근 과거는 dense pixel, 먼 과거는 압축 언어 요약. 최대 15분 지평 지원, π0.7에 재사용.
- **takt time**: 생산 라인의 결정론적 주기 요구 (평균 성공률과 다른 종류의 제약). BMW 사례 84초 takt.
- **OXE / DROID / BridgeData / ALOHA / UMI**: pre-training 코퍼스와 수집 하드웨어. OXE는 embodiment 다양성(100만 episode 초과), DROID는 scene 다양성, ALOHA는 양방향 teleop 리그(2만 달러 미만), UMI는 핸드헬드 수집(5천 달러 미만).

## 8. 그림 후보 (Figure Candidates)

page-region 전략이 "Fig. N" 문자열이 등장한 page를 통째로 200 DPI PNG로 저장했다. 그래서 본문에서 그림을 참조만 한 page(중복과 노이즈)와 실제 그림이 있는 page가 섞여 나왔다. 아래는 raw 15장 중 **실제 그림을 담은 대표 후보**만 추린 것이다. 나머지(fig03, fig04, fig05, fig07, fig08, fig12, fig13, fig14, fig15)는 본문 참조로 잡힌 텍스트나 표 page라 제외.

| id | page | 실제 그림 | 내용 | strategy | 추천 |
|---|---|---|---|---|---|
| fig02 | 5 | Fig. 2 | coupling 영역 × action-head 계열 매트릭스, **서베이의 중심 도식** | page-region | ★★★ wiki 권장 (핵심 주장) |
| fig11 | 25 | Fig. 6 | sim/real task-specific/real generalist/production KPI 4-way 막대, **측정 문제** | page-region | ★★ wiki 권장 (결과) |
| fig09 | 13 | Fig. 4 (+ Fig. 5) | 네 action-head 메커니즘과 지연 예산 (page 13 상단) | page-region | ★ wiki 권장 (아키텍처) |
| fig10 | 13 | Fig. 5 | 학습 파이프라인 (fig09와 **동일 page 13 이미지**, 하단이 Fig. 5) | page-region | ○ fig09와 중복 |
| fig06 | 8 | Fig. 3 | 2022~2026 마일스톤 타임라인 (research/hardware/deployment 3트랙) | page-region | ○ 선택 (맥락) |
| fig01 | 1 | Fig. 1 | 네 배치 현장 사진 (title page 전체) | page-region | △ 선택 (저작권 원소유자, 개념도 아님) |

메모:
- **fig09 = fig10** (page 13 전체 이미지 하나). 이 page 상단이 Fig. 4, 하단이 Fig. 5다. wiki에 둘 다 넣고 싶으면 `wiki/assets/`로 복사할 때 상단(Fig. 4)과 하단(Fig. 5)으로 **수동 크롭** 권장. 크롭 안 하면 같은 page가 두 번 임베드된다.
- 이 논문의 진짜 정보 밀도는 **표**(Table III 31개 방법, Table VI action 표현, Table XIII 배치)에 있는데, 표는 page-region으로 잡으면 주변 텍스트까지 딸려와 지저분하다. wiki 본문에서 markdown 표로 재현하는 편이 낫다.
- fig02(중심 도식)와 fig11(측정 문제)만으로도 이 서베이의 두 분류 기준을 시각적으로 담는다. 최소 큐레이션이면 이 둘.
