---
title: "Vision-Language-Action (VLA) Models for Bimanual Manipulation and Their Real-World Deployment: A Comprehensive Survey"
type: paper
year: 2026
category: physical-ai
source: sa-2026-vision-language-action-models-for.md
raw_path: raw/papers/sa-2026-vision-language-action-models-for.pdf
raw_filename: "sa-2026-vision-language-action-models-for.pdf"
source_collection: external
authors: "Inkyu Sa (Chef Robotics)"
tags: [physical-ai, vla, manipulation, robot-learning]
figures:
  - id: fig02
    file: assets/sa-2026-vision-language-action-models-for/fig02.png
    raw: raw/papers/sa-2026-vision-language-action-models-for-figures/fig02.png
    caption: "Fig. 2 — coupling 영역 × action-head 계열 매트릭스. tightly coupled 행에서만 방법이 갈린다"
    page: 5
    strategy: page-region
    curated: true
  - id: fig09
    file: assets/sa-2026-vision-language-action-models-for/fig09.png
    raw: raw/papers/sa-2026-vision-language-action-models-for-figures/fig09.png
    caption: "Fig. 4 — 하나의 backbone을 공유하는 네 action-head 메커니즘과 각 지연 예산"
    page: 13
    strategy: page-region
    curated: true
  - id: fig10
    file: assets/sa-2026-vision-language-action-models-for/fig10.png
    raw: raw/papers/sa-2026-vision-language-action-models-for-figures/fig10.png
    caption: "Fig. 5 — 학습 파이프라인. 각 단계에 무엇이 들어가고(초록) 무엇이 보호하는지(빨강)"
    page: 13
    strategy: page-region
    curated: true
  - id: fig11
    file: assets/sa-2026-vision-language-action-models-for/fig11.png
    raw: raw/papers/sa-2026-vision-language-action-models-for-figures/fig11.png
    caption: "Fig. 6 — 같은 세대 정책을 네 방식으로 잰 값 (sim 97.1 / real task-specific 43.7 / real generalist 17.7 / production KPI 99)"
    page: 25
    strategy: page-region
    curated: true
  - id: fig01
    file: assets/sa-2026-vision-language-action-models-for/fig01.png
    raw: raw/papers/sa-2026-vision-language-action-models-for-figures/fig01.png
    caption: "Fig. 1 — 네 곳의 배치 현장 사진 (기관 저작권)"
    page: 1
    strategy: page-region
    curated: false
  - id: fig06
    file: assets/sa-2026-vision-language-action-models-for/fig06.png
    raw: raw/papers/sa-2026-vision-language-action-models-for-figures/fig06.png
    caption: "Fig. 3 — 2022~2026 마일스톤 타임라인 (research/hardware/deployment 3트랙)"
    page: 8
    strategy: page-region
    curated: false
---

## 요약 (Summary)

Chef Robotics의 Inkyu Sa가 단독으로 쓴 35페이지 서베이. VLA(Vision-Language-Action) 문헌 200편 이상을 양팔(bimanual) 조작이라는 렌즈로 읽고 아키텍처·학습 레시피·행동 표현·협응 전략·언어 접지·memory/world model·실전 배치 7개 축으로 정리한다. 두 팔 협응은 embodied intelligence에서 가장 까다로운 미해결 문제이자 VLA의 모든 구성요소를 한꺼번에 압박하는 과제라, 필드 전체를 살피기에 좋은 스트레스 테스트다.

이 서베이를 다른 로보틱스 서베이와 구분하는 기준은 조직 원리다. 어떤 아키텍처가 두 팔 과제에서 성공할지를 예측하는 변수는 과제 종류가 아니라 두 팔의 결합도(coupling tightness)라고 본다. 느슨하게 결합된 과제는 분해로 풀리고 단단히 결합된 과제는 팔 간 상관을 보존하는 결합 생성(joint generation)을 요구한다. 여기에 벤치마크와 현장 성능의 간극을 나란히 놓아, "가장 유능한 시스템이 실제로 배치된 시스템은 아니다"라는 결론으로 맺는다.

## 주요 기여와 핵심 주장 (Key Contributions)

저자가 명시한 기여는 세 가지다.

- action 생성 메커니즘(autoregressive · flow · diffusion · hybrid)으로 VLA를 분류하고 이를 양팔 결합도 축과 교차시킨 taxonomy. 각 셀은 "이 head가 이 결합 영역을 감당하는가, 그리고 그 비용은"이라는 한 질문으로 환원된다.
- 31개 VLA 방법을 아키텍처·학습 레시피·행동 표현·벤치마크로 대조한 비교표. 각 셀이 그 값을 보고한 출처로 추적 가능하다.
- 식품 조립·제조·물류·가정·수술·실험실·농업에 걸친 상용 배치 조사. 벤치마크와 현장 성능의 간극, 그리고 그 간극이 함의하는 세 연구 방향까지 이어진다.

세 결합 영역은 이렇게 나뉜다.

- **Independent** — 공유 제약 없이 각자 subtask (한 팔이 용기를 들고 다른 팔이 담는다).
- **Loosely coupled** — 타이밍은 맞아야 하지만 힘은 아니어도 됨 (handover는 놓기가 잡기 뒤에 와야 한다).
- **Tightly coupled** — 움직임과 힘이 계속 일치해야 함 (두 팔이 천을 팽팽히 당길 때 어긋나면 주름지거나 떨어진다).

두 축(결합 영역 × action head)은 한 양의 수요와 공급이다. 그 양은 한 결정 지평 안에서의 팔 간 상관(inter-arm correlation)이다. tightly coupled 과제가 그 상관을 지평 내내 보존하라고 요구하면, action head는 지평을 방출하는 방식(토큰 순차 vs 한 번에)으로 그것을 공급한다. Fig. 2가 결론이다. Independent·loosely coupled 행에서는 거의 모든 방법이 작동하고 tightly coupled 행에서만 방법이 갈린다. autoregressive head는 한 팔을 먼저 확정하고 다른 팔을 시작하므로 두 팔이 보조를 못 맞춘다. 셀은 측정된 순위가 아니라 메커니즘이 함의하는 것이라고 저자가 분명히 한다.

![[assets/sa-2026-vision-language-action-models-for/fig02.png]]
*Figure 2: 행=coupling 영역, 열=action-head 계열. tightly coupled(맨 아래 행)에서만 방법이 갈린다. 두 팔이 멈춤 없이 일치해야 하면 한 팔 숫자를 먼저 내놓는 방식이 무너지기 때문이다 (Sa 2026, p.5).*

## 방법론 및 아키텍처 (Methodology and Architecture)

### VLA 정식화

policy는 observation을 받아 다음 action을 정하는 함수를 말한다. 여기서는 πθ: O × L × Q → A로 두고 이미지·언어 지시·고유수용(proprioception)을 받아 action을 낸다. VLA를 이전 visuomotor policy와 구분하는 건 계산하는 사상이 아니라 표현이 어디서 오느냐다. 로봇 데이터를 보기 전에 인터넷 규모 image-text로 학습된 backbone을 거치므로, 물체가 무엇인지·손잡이가 잡을 수 있음을·"왼쪽"이 위치를 제약함을 로봇 trajectory에서 배울 필요가 없다. trajectory는 observation과 action이 시간순으로 이어진 실행 기록이다.

두 팔을 더하면 문제가 커진다. 한 step 행동이 a = [a^L; a^R]로 이어붙어, 7관절 팔 두 개 + 그리퍼면 da=16, chunk 지평 H=50이면 한 번에 일관되게 생성할 800차원 객체가 된다. 단일 팔에 충분하던 생성 용량이 여기서도 충분하다는 보장은 없다.

### 네 action-head 계열

head가 backbone 활성을 모터 명령으로 바꾸는 방식이 이 서베이의 열 축이다. 같은 backbone을 공유하되 head만 다르고 그 선택이 지연 예산을 정한다.

![[assets/sa-2026-vision-language-action-models-for/fig09.png]]
*Figure 4: 하나의 backbone에서 갈라지는 네 head. (a) discrete token은 순차 decode라 action 폭에 비례해 느려지고 (b) flow field는 K≈10에서 da=16을 50Hz에 맞추며 (c) diffusion은 표현력은 같지만 K가 커 ~300ms, (d) hybrid는 discrete·continuous를 나눠 라우팅한다 (Sa 2026, p.13).*

- **Autoregressive** — 언어 모델을 최소 변경. RT-1(FiLM-EfficientNet), RT-2(PaLI-X 55B / PaLM-E, action을 256 bin 텍스트 토큰으로), OpenVLA(7B Prismatic, 첫 완전 오픈). 대가는 양자화 오차와 차원 수에 비례하는 decode 시간이고 둘 다 두 팔에서 가장 세게 걸린다.
- **Flow-based** — 지금 지배적인 계열. π0가 패턴을 열었고(3B PaLIGemma, K=10), π0.5가 계층을 얹었으며(상위 subgoal 언어 + 하위 flow), π*0.6/RECAP이 자율 경험 학습을 더했고 π0.7이 prompt 조향으로 fine-tuning 없이 specialist 수준에 닿았다.
- **Diffusion** — Diffusion Policy가 생성 head의 우위를 세웠고(단 K=50~100으로 느림), RDT-1B가 양팔용으로 1.2B까지 키웠으며 Octo는 diffusion head를 단 목적 transformer라 backbone과 head가 독립 축임을 보인다.
- **Hybrid / Efficient** — HybridVLA(그리퍼=discrete, 팔=continuous를 한 모델에서), TinyVLA·MiniVLA(경량화), FAST(DCT+BPE 토큰화로 autoregressive를 다시 경쟁력 있게).

대표 시스템을 한 표로 옮기면 이렇다 (Table III 발췌 — "Coupling demonstrated"는 두 팔 결과가 보고된 가장 어려운 영역).

| Method | Yr | Backbone | Head | Params | Coupling demonstrated | Open |
|---|---|---|---|---|---|---|
| RT-1 | 2022 | FiLM-EfficientNet | discrete per-dim | 35M | single-arm only | - |
| RT-2 | 2023 | PaLI-X / PaLM-E | action-as-text, 256 bins | 55B | single-arm only | - |
| ACT | 2023 | scratch | CVAE chunk, H=100 | ~80M | tight, contact-rich | ✓ |
| Diffusion Policy | 2023 | task-specific enc | DDPM, K=50~100 | - | tight (short horizon) | ✓ |
| Octo | 2024 | custom transformer | diffusion, H=4 | 93M | independent, loose | ✓ |
| OpenVLA | 2024 | Prismatic | discrete bins, H=1 | 7B | single-arm only | ✓ |
| π0 | 2024 | PaLIGemma | flow, H=50 K=10 | 3B | tight, deformable | - |
| RDT-1B | 2024 | SigLIP + T5 | DiT diffusion, H=64 | 1.2B | tight, handover | ✓ |
| π0.5 | 2025 | PaLIGemma | hierarchical flow | 3B | tight, long-horizon | partial |
| π*0.6 | 2025 | π0 ckpt | flow + RL (RECAP) | 3B | tight, deformable | - |
| HybridVLA | 2025 | VLM | AR + flow, split | 7B | tight, rigid | - |
| FAST | 2025 | PaLIGemma | DCT + BPE, H=50 | 3B | loose | ✓ |
| π0.7 | 2026 | Gemma 3 + video enc | flow + prompt steering | ~5B | tight, zero-shot embod. | - |
| GR00T N1.7 | 2026 | Cosmos-Reason2 | DiT flow, K=4 | 3B | tight, rigid | ✓ |
| Xiaomi-Robotics-0 | 2026 | Qwen3-VL-4B | DiT flow, K=5 | 4.7B | tight, deformable | ✓ |
| RDT2 | 2026 | Qwen2.5-VL-7B | RVQ / flow | 8B | tight, unseen embod. | ✓ |

### 학습 레시피

세 단계 관례가 자리잡았다. backbone 상속(공짜) → 로봇 pre-train(공용 데이터) → 좁은 과제 적응(값비싼 두 팔 시연). 진짜 이견은 적응이 pre-training을 훼손하는 걸 어떻게 막느냐, 그리고 자율 경험을 이어붙일지다.

![[assets/sa-2026-vision-language-action-models-for/fig10.png]]
*Figure 5: 각 단계에 무엇이 들어가고(초록) 무엇이 그 단계를 보호하는지(빨강). 데이터 비용이 자릿수 단위로 다르다 — 상속된 web 데이터는 공짜, 두 팔 시연은 시간당 50~110개. retention 기법(데이터 혼합·layer freeze·outcome filter)이 레시피를 나누는 실질 차이다 (Sa 2026, p.13).*

breadth가 volume을 이긴다는 게 첫 발견이다. embodiment·환경·과제의 다양성이 raw episode 수보다 일반화를 잘 예측한다. 적응 단계에서는 pre-training 역량을 지키는 게 관건이라, 데이터 혼합(π0 ~50:50)이나 Knowledge Insulation(backbone을 action-expert gradient에서 격리)으로 방어한다. 남은 하나는 imitation의 낮은 천장이다. 두 팔 teleop이 느리고 조심스러운 탓인데, 이 천장을 넘긴 유일한 메커니즘이 RECAP류의 자율 경험 학습이다. RECAP은 policy가 자율 실행하고 VLM이 결과를 판정해 성공 episode만 학습에 넣는 루프로, hand-designed reward 병목을 없앴다.

### 행동 표현과 실시간 실행

행동을 어떻게 인코딩하고 제때 내보내느냐가 두 팔에서 더 세게 걸린다 (per-step 벡터가 두 배 넓고 두 팔이 동시에 커밋되므로). 이 축에는 지배적 답이 없고 정밀도·지연·반응성 중 무엇이 병목이냐로 갈린다 (Table VI 발췌).

| Method | 출력 | H | K | 지연 | 사는 것 / 잃는 것 |
|---|---|---|---|---|---|
| RT-2 | 256 uniform bins | 1 | - | ~1s | backbone 재사용 / 정밀도·폭에 따른 지연 |
| OpenVLA | 256 uniform bins | 1 | - | ~150ms | 완전 오픈 / 두 팔 폭에서 실시간 불가 |
| FAST | DCT + BPE | 50 | - | ~750ms | 양팔 토큰 13.2× 압축·학습 5× / reactive 루프엔 느림 |
| π0 | flow matching | 50 | 10 | ~70ms | 양자화 없음·부드러운 16D chunk / chunk당 K pass |
| Diffusion Policy | DDPM/DDIM | 16 | 50~100 | ~300ms | 최강 multimodal / 50Hz 불가 |
| RDT-1B | DiT diffusion | 64 | 20 | ~150ms | 오픈 모델 중 최장 지평 / 비용·메모리 |
| RTC | flow + overlap | 50 | 10 | <50ms* | 일관성·반응성 동시 / 구현 복잡도 |

*RTC는 생성과 실행을 겹쳐 반응 지연만 낮춘 값 (chunk당 연산은 그대로). BID(추론 시 후보 선택)·TTAC(학습 시 prefix 조건화)도 같은 지연-반응성 트레이드를 다룬다.

continuous head가 실시간 양팔 제어를 맡게 된 이유는 순전히 sampling 기하에 있다. flow의 near-straight 경로는 K=10으로 적분되고 diffusion의 굽은 경로는 K=50~100이 필요하다. 각 step이 head 한 번 통과라, 이 차이가 flow를 앞세운 단일 최대 요인이지 모델 용량의 문제가 아니다.

## 결과와 배치 간극 (Results and the Deployment Gap)

flow-matching head가 가장 강한 두 팔 결과를 낸다. π0가 shirt folding 80%, π0.7이 folding ~100%를 RL specialist 대비 ~1.5× throughput으로, 그리고 미지 양팔 UR5e에서 zero-shot shirt folding 85.6% task progress를 냈다(숙련 teleoperator 90.9% 대비). RECAP은 가장 어려운 과제에서 throughput 2배 초과·실패율 약 절반으로, 같은 시기 어떤 아키텍처 증분보다 컸다.

추론 비용은 배치 가능성을 정하는 제약이다 (Table XIV 발췌).

| Method | Params | 지연 | 하드웨어 / 실질 상한 |
|---|---|---|---|
| RT-2 | 55B | ~1s | TPU급, 실시간 불가 |
| OpenVLA | 7B | ~150ms | A100, ~7Hz/chunk |
| π0 | 3B | ~70ms | A100/RTX4090, 50Hz@H=50 |
| FAST | 3B | ~750ms | RTX4090, ~1.3Hz/chunk |
| Xiaomi-Robotics-0 | 4.7B | ~80ms | RTX4090, K=5, 30Hz |
| GR00T N1.7 | 3B | 31~173ms | RTX5090 → Jetson Orin |
| TinyVLA | 1B | ~40ms | RTX4090, consumer급 |
| SmolVLA | 450M | ~18ms | <1GB |

가장 눈에 띄는 발견은 측정 문제다. 같은 세대 policy가 시뮬레이션에서 97.1%, task-specific 실로봇 30과제에서 43.7%, generalist로는 17.7%인데, 생산 라인이 요구하는 신뢰도는 shift당 99% 초과다. 세 측정이 프로토콜이 달라 엄밀히 비교되진 않지만 함의된 신뢰도가 약 2자릿수 벌어진다는 게 핵심이다.

![[assets/sa-2026-vision-language-action-models-for/fig11.png]]
*Figure 6: 같은 세대 policy를 네 방식으로 잰 값. sim 97.1 / real task-specific 43.7 / real generalist 17.7 / production KPI 99. 왼쪽 셋은 프로토콜이 달라 비교 불가지만 스프레드 자체가 벤치마크 숫자만으로는 안 보이는 신뢰도 격차를 드러낸다 (Sa 2026, p.25).*

배치 기록은 벤치마크가 못 담는 차원을 더한다. 배치 규모와 VLA 성격이 반비례한다는 점이 특히 그렇다. 최대 규모 배치(Chef Robotics 10^8 servings, Ambi 250,000 production hours, Amazon Vulcan 500,000 orders)는 좁고 언어 조건화가 아니며 가장 VLA-native한 산업 배치(Figure 02/Helix @ BMW)가 ~1,250시간에 그친다.

| System | 세팅 | 보고 규모 | VLA |
|---|---|---|---|
| Chef Robotics | 식품 12+ 시설 | 10^8 servings, −88% giveaway, +60% 노동생산성 | - |
| DYNA-1 | 세탁·접객 | 99.4% / 24h+, 850+ 아이템, 개입 0 | ✓ |
| Figure 02 (Helix) @ BMW | 자동차 라인 | 1,250h+, 90k parts, 30k vehicles, KPI >99%/shift | ✓ |
| π0.5 | 미개조 가정 | 지시 따르기 94% / 과제 성공 83% | ✓ |
| SRT-H | ex vivo 수술 | 미지 표본 8개 100%, 개입 0 | ✓ |
| Ambi Robotics | 택배 분류 | 250,000+ 시간, 1.5억 소포 | - |
| HarvestFlex | 상용 온실 | 74.0%, 32.6s/pick, 3.71h·227 episode | ✓ |

## 한계와 3대 연구 방향 (Limitations and Future Work)

저자가 꼽는 지속적 난점은 접촉·평가·데이터다. force 채널 없는 위치 공간 policy는 tight coupling이 요구하는 힘을 조절하지 못하고 동시 접촉 수가 늘수록 어려워진다. 평가 쪽은 공용 양팔 벤치마크가 없어 비교가 임시 과제셋에 기대고 통상 10~50 trial의 신뢰구간이 주장되는 차이보다 넓다. 데이터는 두 팔 시연이 가장 비싸고 자율 실습 대안마저 분 단위 credit assignment에 막힌다.

연구 방향은 이렇게 이어진다.

1. 공용 양팔 벤치마크 — 결합 영역 × 물체 종류 × 지평 세 축을 동시에 덮고 충분한 trial 수를 고정. 연구가 아니라 커뮤니티 조율이 막는 유일한 방향이라 가장 값싸게 착수할 수 있고 나머지를 믿을 수 있게 만드는 전제다.
2. dexterity · force · multi-modal sensing 통합 — 다지 손(40+차원), 촉각/force 채널, 이벤트를 표시하는 audio. 셋이 서로 있을 때 가장 유용하므로 한 문제이고 시뮬레이션이 데이터 취득처이자 난점 집중처다(접촉·변형이 가장 부실하게 모사된다).
3. 배치를 견디는 safety·reliability 논증 — rate limit·action clipping은 실패율 상한을 주지 못한다. runtime monitoring, constrained generation, 팔 간·인간과의 증명 가능한 회피가 필요하다.

증거 도달 범위에 대한 caveat가 서베이 전체에 반복된다. tightly coupled 결과를 보고한 시스템이 거의 π family 한 계열이고 공용 프로토콜이 없으며 수치가 전부 자기보고이고 3자 감사가 없다. joint policy와 decomposed policy를 같은 tight 과제·같은 프로토콜에서 비교한 연구도 아직 없어, head 사이의 순위는 증거가 시사하는 바지 증명된 바가 아니다.

## 관련 페이지 (Related Pages)

- [[physical-ai/black-2025-pi05-a-vision-language-action-model-with]] — 서베이가 hierarchical flow 대표로 꼽는 π0.5의 원 논문. 지시 따르기 94% / 과제 성공 83%의 출처
- [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation]] — GR00T N1. 이 서베이가 open-weight dual-system 대표로 인용하며 N1.7 revision은 accelerator별 지연(31~173ms)을 공개해 "on-robot 두 팔 추론이 지금 얼마인가"의 기준점이 된다. Table III·XIV·XII의 한 행.
- [[physical-ai/hou-2026-world-model-for-robot-learning]] — World Model for Robot Learning 서베이. 이 서베이 X-D장(world model as data engine·future prediction)과 겹친다. 병목이 "그럴듯한 미래 → action에 aligned된 실행 가능한 미래"로 옮겨갔다는 진단이, 여기 compounding-error·haptic 미접지 한계와 맞물린다.
- [[physical-ai/li-2025-a-comprehensive-survey-on-world]] — Embodied AI world model 서베이. 로보틱스·자율주행·범용 비디오를 한 좌표계에 올린 축(결합도·시간 전개·장면 형식)이, 이 서베이의 결합도 축과 상보적이다.
- [[physical-ai/luo-2025-sonic-supersizing-motion-tracking]] — SONIC. whole-body humanoid 제어(locomotion 축). 이 서베이는 legged/aerial을 manipulator와 policy·레시피를 공유할 때만 다루므로 직접 대상은 아니지만 universal action token(FSQ)과 humanoid 배치 맥락이 인접하다.
- [[physical-ai/zhang-2024-vision-and-language-navigation-today]] — VLN 서베이. embodied AI의 navigation 축에서 world/human model·language grounding 같은 개념을 다룬다. 이 서베이는 같은 개념을 manipulation 축에서 본다.
- [[overviews/physical-ai-overview]] — physical-ai 허브. VLA·world model·robot learning 자료가 쌓이면서 이 페이지가 허브의 manipulation 기준점 역할을 한다.
