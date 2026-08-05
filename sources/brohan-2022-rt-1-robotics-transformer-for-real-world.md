---
title: "RT-1: Robotics Transformer for Real-World Control at Scale"
type: paper
year: 2022
category: physical-ai
raw_path: /home/sguys99/project/ai-wiki/raw/papers/brohan-2022-rt-1-robotics-transformer-for-real-world.pdf
raw_filename: "brohan-2022-rt-1-robotics-transformer-for-real-world.pdf"
source_collection: external
authors: "Anthony Brohan 외 40여 명 (저자 알파벳순, Robotics at Google · Everyday Robots · Google Research Brain Team)"
arxiv_id: "2212.06817"
url: "https://robotics-transformer1.github.io"
tags: [physical-ai, vla, imitation-learning, manipulation]
figures:
  - id: fig01
    file: assets/brohan-2022-rt-1-robotics-transformer-for-real-world/fig01.png
    raw: raw/papers/brohan-2022-rt-1-robotics-transformer-for-real-world-figures/fig01.png
    caption: "RT-1 전체 개요 — (a) 이미지+언어 지시 → 이산화된 arm/base 행동, (b) 130k 시연·3000 실세계 시행 (paper Figure 1)"
    page: 2
    strategy: page-region
    curated: true
  - id: fig03
    file: assets/brohan-2022-rt-1-robotics-transformer-for-real-world/fig03.png
    raw: raw/papers/brohan-2022-rt-1-robotics-transformer-for-real-world-figures/fig03.png
    caption: "실험 환경 — robot classroom, Kitchen1/2, Everyday Robots 모바일 매니퓰레이터, 오브젝트 세트 (paper Figure 2)"
    page: 5
    strategy: page-region
    curated: false
  - id: fig05
    file: assets/brohan-2022-rt-1-robotics-transformer-for-real-world/fig05.png
    raw: raw/papers/brohan-2022-rt-1-robotics-transformer-for-real-world-figures/fig05.png
    caption: "RT-1 상세 아키텍처 — USE embedding → FiLM EfficientNet-B3 → TokenLearner(81→8) → decoder-only Transformer → action token (paper Figure 3)"
    page: 6
    strategy: page-region
    curated: true
  - id: fig08
    file: assets/brohan-2022-rt-1-robotics-transformer-for-real-world/fig08.png
    raw: raw/papers/brohan-2022-rt-1-robotics-transformer-for-real-world-figures/fig08.png
    caption: "평가 시나리오 — distractor(easy/medium/hard)·background·realistic(L1/L2/L3) (paper Figure 4)"
    page: 9
    strategy: page-region
    curated: false
  - id: fig09
    file: assets/brohan-2022-rt-1-robotics-transformer-for-real-world/fig09.png
    raw: raw/papers/brohan-2022-rt-1-robotics-transformer-for-real-world-figures/fig09.png
    caption: "전체 성능 비교 — seen/unseen/distractor/background 성공률 표·막대그래프 (paper Table 2)"
    page: 10
    strategy: page-region
    curated: true
  - id: fig12
    file: assets/brohan-2022-rt-1-robotics-transformer-for-real-world/fig12.png
    raw: raw/papers/brohan-2022-rt-1-robotics-transformer-for-real-world-figures/fig12.png
    caption: "RT-1 실행 궤적 예시 — 서랍 열기·물체 이동·세우기 등 (paper Figure 5)"
    page: 11
    strategy: page-region
    curated: false
  - id: fig13
    file: assets/brohan-2022-rt-1-robotics-transformer-for-real-world/fig13.png
    raw: raw/papers/brohan-2022-rt-1-robotics-transformer-for-real-world-figures/fig13.png
    caption: "두 로봇 플랫폼(EDR + Kuka) 혼합 학습과 morphology 간 전이 (paper Figure 6 + Table 5)"
    page: 13
    strategy: page-region
    curated: false
  - id: fig17
    file: assets/brohan-2022-rt-1-robotics-transformer-for-real-world/fig17.png
    raw: raw/papers/brohan-2022-rt-1-robotics-transformer-for-real-world-figures/fig17.png
    caption: "시간에 따른 데이터량·태스크 수·seen 성능 성장 곡선 (paper Figure 9)"
    page: 23
    strategy: page-region
    curated: false
  - id: fig22
    file: assets/brohan-2022-rt-1-robotics-transformer-for-real-world/fig22.png
    raw: raw/papers/brohan-2022-rt-1-robotics-transformer-for-real-world-figures/fig22.png
    caption: "RT-1 어텐션 맵 — layer/head별로 그리퍼-오브젝트 상호작용에 집중 (paper Figure 13)"
    page: 31
    strategy: page-region
    curated: false
---

## 한 줄 요약 (One-line Summary)

이미지 히스토리와 자연어 지시를 토큰으로 바꿔 로봇 행동 토큰을 뽑는 35M짜리 Transformer 정책이다. 13대 로봇이 17개월간 모은 130k 시연으로 imitation learning 학습해 700개 넘는 지시를 97% 성공률로 수행하고 새 태스크·오브젝트·환경에 zero-shot으로 일반화한 로봇 조작 foundation model이다.

## 1. 자료 정보 (Document Information)

- **제목**: RT-1: Robotics Transformer for Real-World Control at Scale
- **저자**: Anthony Brohan 외 40여 명 (저자 알파벳순 표기). 소속은 Robotics at Google, Everyday Robots, Google Research Brain Team.
- **출처**: arXiv:2212.06817 (v1 2022-12, v2 2023-08). 프로젝트 페이지 robotics-transformer1.github.io, 코드 github.com/google-research/robotics_transformer.
- **한 줄 성격**: vision·NLP에서 검증된 "크고 다양한 task-agnostic 데이터로 대형 모델을 사전학습 → downstream에 전이"라는 레시피를 로봇 조작에 옮긴 대규모 실증. 뒤에 나오는 RT-2·OpenVLA·GR00T 계보의 출발점이다.

## 2. 주요 기여 (Key Contributions)

- **RT-1 모델**: 카메라 이미지·언어 지시·모터 명령을 모두 compact token으로 인코딩해 Transformer가 실시간(3 Hz)으로 다룰 수 있게 한 아키텍처. 고용량 모델과 실시간 추론이라는 상충 요구를 tokenization으로 절충했다.
- **대규모 실세계 데이터·평가**: 13대 로봇으로 17개월간 모은 ~130k 시연, 744개 태스크(700개 넘는 언어 지시), 3000회 넘는 실세계 시행. 당시 로봇 학습 평가 중 최대 규모급이다.
- **강한 일반화·robustness 실증**: seen 97%, unseen 76%, distractor 83%, background 59%로 Gato·BC-Z 대비 각각 최대 25%·24%·36%·18%p 앞선다.
- **이질적 데이터 흡수**: 시뮬레이션 데이터와 다른 로봇(Kuka)의 데이터를 섞어도 원래 태스크 성능을 잃지 않으면서 새 시나리오 일반화가 오른다. 즉 morphology가 다른 로봇의 경험까지 "빨아들여" 쓴다.
- **데이터 다양성 > 데이터 양**: 태스크 다양성을 줄이는 편이 데이터 양을 줄이는 것보다 일반화를 훨씬 크게 해친다는 ablation. 태스크 25%를 빼면(데이터의 97%는 유지) 데이터를 49% 줄인 것과 맞먹는 일반화 하락이 온다.
- **SayCan 연동 long-horizon**: RT-1을 SayCan planner의 저수준 정책으로 써서 최대 50단계짜리 초장기 태스크를 실행한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

**문제 설정.** 언어 지시 $i$와 이미지 관측 $x_t$가 주어지는 순차적 의사결정 환경에서 정책 $\pi$가 행동 $a_t$를 낸다. 학습은 성공한 시연만 모은 데이터셋 $D$에 대한 behavioral cloning(행동의 negative log-likelihood 최소화)이다. 순수 imitation learning이다.

**입력.** 300×300 이미지 6장(히스토리)과 자연어 지시 한 문장.

**image + instruction tokenization.** 6장을 ImageNet 사전학습 EfficientNet-B3에 통과시켜 9×9×512 feature map을 얻고 81개 visual token으로 편다. 언어는 Universal Sentence Encoder(USE)로 임베딩한 뒤, EfficientNet 내부에 끼운 FiLM layer의 조건으로 넣어 이미지 인코더를 언어에 conditioning한다. 사전학습 가중치를 망치지 않도록 FiLM의 affine 변환을 만드는 dense layer 가중치를 0으로 초기화해 초기에는 항등(identity)으로 작동하게 했다(identity-initialized FiLM). 이 단계가 16M 파라미터, MBConv·FiLM 26층으로 81개 vision-language token을 낸다.

**TokenLearner.** 81개 token을 elementwise attention으로 소프트 선별해 이미지당 8개 token으로 압축한다. 추론 속도를 위한 핵심 장치다.

**Transformer.** 이미지당 8개 × 6장 = 48개 token(+ position encoding)을 decoder-only Transformer(self-attention 8층, 19M 파라미터)에 넣어 action token을 출력한다.

**action tokenization.** 각 행동 차원을 256개 bin으로 이산화한다. 행동은 arm 7차원(x, y, z, roll, pitch, yaw, gripper 개폐), base 3차원(x, y, yaw), 그리고 arm/base/종료를 고르는 mode 1차원으로 총 11차원이다. 손실은 causal masking을 쓴 categorical cross-entropy.

**실시간 추론.** 전체 35M 파라미터로 3 Hz(추론 예산 100ms 미만) 제어를 맞춘다. TokenLearner로 token 수를 줄여 2.4배, 겹치는 window의 token을 한 번만 계산해 재사용하는 방식으로 1.7배 가속한다. jitter를 줄이려 상태 캡처 뒤 280ms 고정 대기 후 행동을 적용한다.

**데이터.** Everyday Robots의 모바일 매니퓰레이터(7-DoF 팔, 2지 그리퍼, 이동 베이스)로 수집. 환경은 데이터 수집용 robot classroom과 평가용 실제 오피스 주방 두 곳(Kitchen1·Kitchen2). 지시는 동사(skill)로 묶는다 — Pick(130), Move Near(337), Place Upright(8), Knock Over(8), Open/Close Drawer(6), Place into Receptacle(84), Pick from Receptacle & Place on Counter(162), 그리고 realistic long 태스크(9)로 총 744개.

**베이스라인.** 둘 다 RT-1과 같은 데이터로 학습해 아키텍처만 비교한다. Gato는 Transformer지만 언어 없이 patch별로 이미지 token을 만들고 사전학습 텍스트 임베딩·TokenLearner가 없으며 auto-regressive다(실로봇 구동 위해 1.2B → 37M로 축소). BC-Z는 ResNet 기반 feedforward로 히스토리를 안 쓰고 연속 행동을 낸다(BC-Z XL은 파라미터를 RT-1급으로 키운 판).

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

**전체 성능 (Table 2, 성공률 %).**

| Model | Seen | Unseen | Distractors | Backgrounds |
|---|---|---|---|---|
| Gato | 65 | 52 | 43 | 35 |
| BC-Z | 72 | 19 | 47 | 41 |
| BC-Z XL | 56 | 43 | 23 | 35 |
| **RT-1 (ours)** | **97** | **76** | **83** | **59** |

seen 97%(BC-Z보다 25%, Gato보다 32% 높음), unseen 76%(차선 대비 +24%), distractor 83%(+36%), background 59%(+18%). 네 축 모두에서 앞선다.

**시뮬레이션 데이터 흡수 (Table 4).** 실데이터에 "실세계에서 본 적 없는" 오브젝트의 sim 데이터를 더한다. 실오브젝트 성능은 92→90(-2%)로 거의 유지되고 sim에서만 본 오브젝트의 seen-skill은 23→87(+64%), unseen-skill은 7→33(+26%)로 오른다. 도메인 전이가 크게 일어난다.

**다른 로봇 데이터 흡수 (Table 5).** RL로 수집돼 action 분포·외형·동역학이 전혀 다른 Kuka QT-Opt bin-picking 데이터(209k episode)를 EDR 데이터와 섞는다. Classroom eval은 92→90(-2%)로 유지, Bin-picking eval은 22→39(+17%, 거의 2배). Kuka 데이터만으로 학습하면 EDR에서 0%지만 섞으면 EDR에 명시적 bin-picking 시연 없이도 전이가 일어난다.

**long-horizon (SayCan, Table 6).** 두 주방에서 SayCan planner로 실행. planning은 모두 87%, RT-1의 execution이 Kitchen1 67%로 최고. 더 어려운 Kitchen2에서 Gato 0%·BC-Z 13%인 반면 RT-1은 67%로 성능 저하가 눈에 띄지 않는다. 최대 50단계 태스크 실행.

**데이터 양 vs 다양성 (Table 7).** 데이터를 줄이면 성능·일반화가 완만히 떨어지지만 태스크를 줄여 데이터를 좁히면 일반화가 훨씬 급격히 떨어진다. 태스크 25%를 제거(데이터 97% 유지)한 것이 데이터를 49% 줄인 것과 맞먹는 일반화 손실을 낸다 → **다양성이 양보다 중요**.

**ablation (Table 13).** 연속(Gaussian) 행동으로 바꾸면 크게 하락 — 이산화가 multi-modal 분포를 표현하기 때문. ImageNet 사전학습 제거 시 unseen -33%. 히스토리는 distractor 일반화에 특히 기여. Transformer 제거는 전반적으로 작은 하락. auto-regressive 행동은 이득 없이 추론 2배 느림 → 최종 RT-1은 auto-regressive를 안 쓴다. 추론 시간은 RT-1 15ms로 Gato(129ms)보다 한 자릿수 빠르고 ResNet 기반 BC-Z(5.3ms)보다는 느리다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **imitation learning의 한계**: 시연자를 넘어서기 어렵다.
- **일반화 범위**: 이미 본 개념들의 새로운 조합까지만 일반화하고 아예 새로운 motion은 만들지 못한다.
- **dexterity**: 크지만 정교하지는 않은 조작 태스크 집합이다.
- **향후**: 비전문가가 directed data collection·model prompting으로 스킬을 빠르게 늘리는 방법, 환경 다양성 확대로 background robustness 개선, scalable attention·memory로 반응 속도와 문맥 유지 개선.

부록의 **model selection at scale(C.3)**: 학습 중 여러 태스크에서 모델을 고르기 위해 real-to-sim 전이를 쓴다. RetinaGAN으로 sim 이미지를 실사풍으로 바꿔 실데이터 정책을 sim에서 돌리면 sim 성공률의 순위가 실세계 순위를 예측하는 데 쓸 만큼 상관한다(off-policy evaluation 대안).

부록의 **어텐션 분석(D.5)**: FiLM으로 언어를 이미지 파이프라인 초입에서 융합(early fusion)한 덕에 어텐션이 지시와 관련된 오브젝트·그리퍼 상호작용에 집중하고 distractor·background를 무시한다. Gato의 late fusion이 distractor에 약한 이유로 이 차이를 든다.

## 6. 관련 연구 (Related Work)

- **Transformer 정책**: Gato(Reed 2022, generalist agent), Behavior Transformer(Shafiullah 2022), Decision Transformer(Chen 2021), 시뮬레이션 navigation·locomotion·manipulation에서의 sequence modeling.
- **언어 조건 imitation learning**: BC-Z(Jang 2021), SayCan(Ahn 2022), CLIPort·PerceiverActor(Shridhar), Lynch & Sermanet 2020.
- **핵심 구성 요소의 출처**: Transformer(Vaswani 2017), EfficientNet(Tan & Le 2019), FiLM(Perez 2018), TokenLearner(Ryoo 2021), Universal Sentence Encoder(Cer 2018).
- **multi-task 로봇 학습·데이터셋**: QT-Opt/MT-Opt(Kalashnikov), BridgeData·RoboNet, Meta-World·RLBench 등.

## 7. 용어집 (Glossary)

- **RT-1 (Robotics Transformer 1)**: 이미지+언어를 로봇 행동 토큰으로 매핑하는 35M Transformer 정책.
- **FiLM (Feature-wise Linear Modulation)**: 조건 입력으로 중간 feature에 채널별 affine 변환($\gamma, \beta$)을 가하는 conditioning 기법. 여기선 언어 임베딩으로 이미지 인코더를 조건화.
- **TokenLearner**: 많은 token을 elementwise attention으로 소수 token(81→8)으로 압축하는 모듈.
- **behavioral cloning**: 성공 시연의 (관측→행동)을 지도학습으로 모방하는 imitation learning.
- **action tokenization / discretization**: 각 행동 차원을 256 bin으로 이산화해 분류 문제로 바꾸는 것. 연속 Gaussian과 달리 multi-modal 분포 표현이 쉽다.
- **early vs late fusion**: 언어와 비전을 파이프라인 초입에서 합치느냐(RT-1, FiLM) 나중에 합치느냐(Gato). early fusion이 관련 feature에 집중하기 좋다.
- **SayCan**: LLM으로 고수준 지시를 저수준 스킬 시퀀스로 쪼개고 affordance(value function)로 실행 가능성을 grounding하는 planner. RT-1이 그 저수준 정책이 된다.
- **morphology 전이**: 팔 구조·action space가 다른 로봇(Kuka ↔ EDR) 간에 학습된 행동이 옮겨가는 것.
- **real-to-sim**: 실데이터 정책을 시뮬레이션에서 돌려 모델을 고르는 평가 기법. 여기선 RetinaGAN으로 sim↔real 시각 격차를 메운다.

## 8. 그림 후보 (Figure Candidates)

page-region 방식(캡션이 잡힌 페이지를 200 DPI로 통째 렌더)이라 각 PNG는 해당 페이지 전체다. 아래는 실제 논문 그림/표에 대응하는 후보만 추린 것이다(전체 22개는 `figures.json` 참조).

| id | page | 대응 | caption | 추천 |
|---|---|---|---|---|
| fig01 | 2 | Figure 1 | RT-1 전체 개요(아키텍처+데이터+평가) | ★ wiki 권장 (overview) |
| fig05 | 6 | Figure 3 | 상세 아키텍처: USE→FiLM EfficientNet→TokenLearner→Transformer→action | ★★ wiki 권장 (architecture) |
| fig09 | 10 | Table 2 | 전체 성능 비교 표+막대그래프 | ★ wiki 권장 (result) |
| fig03 | 5 | Figure 2 | 환경·로봇·오브젝트 세트 | (선택) setup |
| fig08 | 9 | Figure 4 | distractor·background·realistic 평가 시나리오 | (선택) |
| fig12 | 11 | Figure 5 | 실행 궤적 예시 | (선택) |
| fig13 | 13 | Figure 6 | 두 로봇 플랫폼 혼합 학습·전이 | (선택) multi-robot |
| fig17 | 23 | Figure 9 | 데이터·태스크·성능 성장 곡선 | (선택) |
| fig22 | 31 | Figure 13 | 어텐션 맵 시각화 | (선택) |
