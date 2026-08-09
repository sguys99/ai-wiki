---
title: "03-03. RT-1 - 모두의 로보틱스 - VLA 입문"
type: article
year: 2026
category: physical-ai
raw_path: raw/articles/jo-2026-rt-1-vla-primer.md
raw_filename: "jo-2026-rt-1-vla-primer.md"
source_collection: external
author: "조인령"
url: "https://wikidocs.net/366369"
publisher: "WikiDocs"
tags: [physical-ai, vla, imitation-learning, manipulation]
figures:
  - id: fig01
    file: assets/jo-2026-rt-1-vla-primer/fig01.png
    raw: raw/articles/jo-2026-rt-1-vla-primer-figures/fig01.png
    caption: "RT-1 전체 개요 — 이미지+언어 지시를 받아 이산 행동을 내는 구조와 130k 시연·3000회 실세계 평가 규모 (paper Figure 1)"
    strategy: fetched
    curated: true
  - id: fig02
    file: assets/jo-2026-rt-1-vla-primer/fig02.png
    raw: raw/articles/jo-2026-rt-1-vla-primer-figures/fig02.png
    caption: "데이터 수집·평가 환경 종합 — robot classroom, 두 office kitchen, mobile manipulator, 오브젝트 다양성 (paper Figure 2 개요)"
    strategy: fetched
    curated: false
  - id: fig03
    file: assets/jo-2026-rt-1-vla-primer/fig03.png
    raw: raw/articles/jo-2026-rt-1-vla-primer-figures/fig03.png
    caption: "tokenized action 예시 — 연속값 대신 256 bin 이산화로 표현한 action"
    strategy: fetched
    curated: false
  - id: fig04
    file: assets/jo-2026-rt-1-vla-primer/fig04.png
    raw: raw/articles/jo-2026-rt-1-vla-primer-figures/fig04.png
    caption: "RT-1 상세 아키텍처 — USE 임베딩 → FiLM EfficientNet-B3 → TokenLearner(81→8) → decoder-only Transformer → action token (paper Figure 3)"
    strategy: fetched
    curated: true
  - id: fig05
    file: assets/jo-2026-rt-1-vla-primer/fig05.png
    raw: raw/articles/jo-2026-rt-1-vla-primer-figures/fig05.png
    caption: "데이터 수집이 이뤄진 robot classroom (paper Figure 2a)"
    strategy: fetched
    curated: false
  - id: fig06
    file: assets/jo-2026-rt-1-vla-primer/fig06.png
    raw: raw/articles/jo-2026-rt-1-vla-primer-figures/fig06.png
    caption: "Everyday Robots mobile manipulator — 7자유도 arm·two-finger gripper·mobile base (paper Figure 2d)"
    strategy: fetched
    curated: false
  - id: fig07
    file: assets/jo-2026-rt-1-vla-primer/fig07.png
    raw: raw/articles/jo-2026-rt-1-vla-primer-figures/fig07.png
    caption: "학습 skill 목록과 instruction 구성 — 744개 instruction (paper Table 1)"
    strategy: fetched
    curated: false
  - id: fig08
    file: assets/jo-2026-rt-1-vla-primer/fig08.png
    raw: raw/articles/jo-2026-rt-1-vla-primer-figures/fig08.png
    caption: "object diversity — 공통 사용 물체와 picking skill 확장용 물체 집합 (paper Figure 2e-f)"
    strategy: fetched
    curated: false
  - id: fig09
    file: assets/jo-2026-rt-1-vla-primer/fig09.png
    raw: raw/articles/jo-2026-rt-1-vla-primer-figures/fig09.png
    caption: "robustness 평가 시나리오 — distractor·background 변화 예시 (paper Figure 4)"
    strategy: fetched
    curated: false
  - id: fig10
    file: assets/jo-2026-rt-1-vla-primer/fig10.png
    raw: raw/articles/jo-2026-rt-1-vla-primer-figures/fig10.png
    caption: "seen/unseen/distractor/background 성능 비교 — RT-1이 baseline 대비 전 축 우위 (paper Table 2)"
    strategy: fetched
    curated: true
  - id: fig11
    file: assets/jo-2026-rt-1-vla-primer/fig11.png
    raw: raw/articles/jo-2026-rt-1-vla-primer-figures/fig11.png
    caption: "실제 Google kitchen L1/L2/L3 generalization 결과 (paper Table 3)"
    strategy: fetched
    curated: false
  - id: fig12
    file: assets/jo-2026-rt-1-vla-primer/fig12.png
    raw: raw/articles/jo-2026-rt-1-vla-primer-figures/fig12.png
    caption: "kitchen 시나리오 실행 sequence qualitative 예시 (paper Figure 5)"
    strategy: fetched
    curated: false
  - id: fig13
    file: assets/jo-2026-rt-1-vla-primer/fig13.png
    raw: raw/articles/jo-2026-rt-1-vla-primer-figures/fig13.png
    caption: "simulation 데이터 추가 학습 결과 — sim object 성능 23→87 (paper Table 4)"
    strategy: fetched
    curated: false
  - id: fig14
    file: assets/jo-2026-rt-1-vla-primer/fig14.png
    raw: raw/articles/jo-2026-rt-1-vla-primer-figures/fig14.png
    caption: "Kuka bin-picking 데이터 혼합 학습 결과 — classroom 92→90 유지, bin-picking 22→39 (paper Table 5)"
    strategy: fetched
    curated: false
  - id: fig15
    file: assets/jo-2026-rt-1-vla-primer/fig15.png
    raw: raw/articles/jo-2026-rt-1-vla-primer-figures/fig15.png
    caption: "SayCan 결합 long-horizon task 실행 결과 (paper Table 6)"
    strategy: fetched
    curated: false
  - id: fig16
    file: assets/jo-2026-rt-1-vla-primer/fig16.png
    raw: raw/articles/jo-2026-rt-1-vla-primer-figures/fig16.png
    caption: "데이터 양 vs 다양성 ablation — diversity가 quantity보다 generalization에 더 중요 (paper Table 7)"
    strategy: fetched
    curated: false
  - id: fig17
    file: assets/jo-2026-rt-1-vla-primer/fig17.png
    raw: raw/articles/jo-2026-rt-1-vla-primer-figures/fig17.png
    caption: "설계 ablation 종합 — discrete action·ImageNet pretrain·history·Transformer·모델 크기·autoregressive (paper Table 13)"
    strategy: fetched
    curated: true
  - id: fig18
    file: assets/jo-2026-rt-1-vla-primer/page-full.png
    raw: raw/articles/jo-2026-rt-1-vla-primer-figures/page-full.png
    caption: "전체 페이지 스크린샷 (아카이브용)"
    strategy: screenshot
    curated: false
---

## 한 줄 요약 (One-line Summary)

RT-1 논문(Brohan 2022)을 처음 접하는 독자에게 policy·behavioral cloning 같은 기초 개념부터 아키텍처·데이터·ablation까지 차례로 풀어 설명하는 한국어 입문서 챕터. "모두의 로보틱스 - VLA 입문" 시리즈의 03-03편이다.

## 1. 자료 정보 (Document Information)

- 저자: 조인령
- 매체: WikiDocs, "모두의 로보틱스 - VLA 입문" 시리즈 03-03편 (book id 19039)
- 최종 편집: 2026-06-11
- 분량: 약 29,500자, 6개 대단원(등장 배경 → 배경지식 → 모델 구조 → 결과 → 한계점 → 정리)

## 2. 주요 기여 (Key Contributions)

논문이 아니라 논문 해설이므로 기여는 새로운 발견이 아니라 설명의 구성에 있다.

- policy, episode/timestep, imitation learning/behavioral cloning처럼 로봇 학습을 처음 보는 독자에게 필요한 기초 개념을 RT-1 논문 용어로 바로 연결해 설명한다.
- control frequency(3Hz)·inference latency(100ms 예산)·closed-loop control이라는 시스템 관점을 별도 절로 떼어 "정확한 모델"과 "실제로 로봇에서 돌아가는 모델"의 차이를 강조한다.
- FiLM·Universal Sentence Encoder·TokenLearner·action tokenization 같은 구성 요소를 각각 비유를 곁들여 하나씩 풀어 Figure 3 아키텍처 다이어그램을 읽어내는 법을 안내한다.
- Table 13 ablation을 항목별로 순회하며 discrete action representation·ImageNet pretraining·observation history·Transformer·모델 크기·auto-regressive action 각각이 성능에 미친 영향을 원인과 함께 짚는다.
- RT-1을 "VLA 흐름의 완성형이 아니라 실로봇 수준에서 그 흐름을 처음 설득력 있게 연 출발점"으로 자리매김하며 이후 VLA 연구로 이어지는 인사이트 네 가지로 정리한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

논문 RT-1의 아키텍처를 그대로 따라가며 설명한다. 입력은 최근 6장의 300×300 이미지 히스토리와 자연어 instruction 한 문장이다. 이미지는 ImageNet 사전학습 EfficientNet-B3를 통과해 9×9×512 feature map(=81개 visual token)이 된다. instruction은 Universal Sentence Encoder로 임베딩된 뒤 FiLM layer를 거쳐 EfficientNet 내부에 주입되어 이미지 인코딩 단계부터 "지금 무엇이 중요한가"를 반영한다. FiLM의 affine 가중치를 0으로 초기화해 처음엔 항등 변환으로 동작하도록 한 것도 짚는다.

81개 token은 TokenLearner가 8개로 압축한다. 6장의 이미지에서 나온 8개씩을 합쳐 48개 token(+ position encoding)이 decoder-only Transformer(self-attention 8층, 19M 파라미터)에 들어가 action token을 낸다. action은 arm 7차원(x,y,z,roll,pitch,yaw,gripper)·base 3차원(x,y,yaw)·mode 1차원으로 총 11차원이며, 각 차원을 256 bin으로 이산화해 categorical cross-entropy로 학습한다. 연속 회귀 대신 이산화를 택한 이유로는 시연 데이터의 multi-modal 행동 분포를 표현하려는 것이라고 설명한다.

real-time 요구를 맞추려는 두 장치도 별도로 다룬다. TokenLearner로 token 수를 줄여 2.4배, 겹치는 window의 token을 재사용해 1.7배 가속한다. 이 설계로 모델 자체의 추론 예산을 100ms 이하로 맞춘다.

데이터는 13대의 로봇 fleet이 17개월간 모은 130k demonstration, 744개 instruction으로 구성된다. skill과 instruction을 구분해 "pick iced tea can"처럼 실제 수행 문장인 instruction이 Pick Object 같은 더 큰 skill 범주에 묶인다고 설명하며, 이 다양성과 연결성이 새로운 조합에 대한 generalization을 뒷받침한다고 정리한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

원 논문의 결과를 그대로 인용하며 해석을 덧붙인다.

- 기본 성능: seen 97%, unseen 76%, distractor 83%, background 59%. next best baseline 대비 unseen +25%, distractor +36%, background +18%.
- 실제 Google kitchen에서의 L1/L2/L3 generalization: 새 countertop·lighting만 바뀐 L1에서 특히 강하고, distractor·전혀 다른 kitchen까지 포함한 L3에서도 Gato보다 확실히 앞선다.
- heterogeneous data 흡수: simulation 데이터를 더하면 sim object 성능이 23→87(+64%)로 오르면서 real object 성능(92→90)은 거의 유지된다. Kuka bin-picking 데이터를 섞으면 bin-picking 22→39로 오르면서 classroom 성능은 92→90으로 유지된다. Kuka 데이터만 쓰면 두 평가 모두 0%다.
- long-horizon: SayCan planner의 저수준 실행기로 쓰였을 때 두 kitchen 모두 planning 87%, Kitchen1 execution 67%로 최고 성능을 내고 학습 환경과 크게 다른 Kitchen2에서도 성능 저하가 크지 않다(최대 50 step까지 실행).
- ablation(Table 13): discrete action을 continuous로 바꾸면 unseen 76→43, distractor 83→37로 급락한다. ImageNet pretraining을 빼면 unseen이 76→43(−33pt)으로 떨어진다. observation history를 단일 이미지로 줄이면 distractor가 83→50, hard distractor는 64→14까지 떨어진다. Transformer를 빼고 EfficientNet만 남기면 전반적으로 낮아지고 특히 unseen·distractor에서 차이가 크다. 모델을 35M→21M으로 줄이면 하락은 있지만 다른 요소만큼 극단적이지 않다. auto-regressive action은 성능 개선이 작으면서 추론 시간을 15ms→36ms로 2배 이상 늦춰 최종안에서 채택되지 않았다.
- 데이터 양 vs 다양성(Table 7): task diversity를 유지한 채 양만 줄이면 성능이 점진적으로만 떨어지지만 diversity를 줄인 narrower data는 하락 폭이 훨씬 크다. quantity보다 diversity가 generalization에 더 크게 기여한다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

원 논문이 언급한 한계를 여섯 갈래로 재정리한다. imitation learning 기반이라 시연자의 행동을 재현하는 데는 강하지만 시행착오로 더 나은 행동을 스스로 탐색하지는 못한다. unseen task generalization도 대부분 이미 본 skill과 object를 새로 조합하는 compositional generalization에 머물고 완전히 새로운 물리 상호작용을 학습한 것은 아니다. long-horizon 성능은 SayCan 같은 상위 planner와 결합했을 때 나온 결과라 RT-1 자체는 스스로 계획을 세우기보다 안정적인 low-level executor에 가깝다. heterogeneous data를 어느 정도 흡수하지만 action space·morphology가 다른 로봇까지 자연스럽게 일반화하는 multi-embodiment foundation model 단계는 아니다. 13대 로봇으로 17개월간 130k demonstration을 모아야 했던 데이터 수집 비용 자체가 큰 진입 장벽이다. background robustness(59%)는 seen task(97%)와 격차가 남아 있어 환경이 크게 바뀔수록 성능 저하가 여전히 존재한다.

## 6. 관련 연구 (Related Work)

원 논문을 그대로 설명하는 글이라 별도의 related work 절은 없지만 본문이 다음 비교 대상을 데이터로 직접 언급한다.

- Gato, BC-Z, BC-Z XL — Table 2 기본 성능 비교의 baseline
- SayCan — long-horizon 평가에서 RT-1을 저수준 정책으로 결합한 상위 planning framework
- QT-Opt (Kuka bin-picking data) — heterogeneous robot data 실험에서 혼합한 이종 로봇 데이터 출처

wiki 보유 자료 중에서는 원 논문 자체가 이미 [[physical-ai/brohan-2022-rt-1-robotics-transformer-for-real-world]]로 들어와 있다. 이 글은 그 논문의 한국어 입문 해설이므로 정보량 자체는 원 논문 페이지가 더 크고 정확하다. 이 페이지는 처음 읽는 사람을 위한 진입로 역할을 하는 편이 맞다.

## 7. 용어집 (Glossary)

- **policy**: 현재 관측을 보고 다음 행동을 정하는 함수. RT-1에서는 이미지+language instruction을 받아 action distribution을 만든다.
- **episode / timestep**: episode는 작업 시작부터 종료까지 한 번의 전체 시도, timestep은 그 안에서 관측→행동이 반복되는 한 단위.
- **imitation learning / behavioral cloning**: 시행착오 대신 성공한 시연(trajectory)을 데이터로 모아 그 상황에서의 action을 맞히도록 학습하는 방식.
- **FiLM (Feature-wise Linear Modulation)**: language 임베딩으로 이미지 특징을 조건화하는 장치. RT-1은 EfficientNet 내부에 FiLM layer를 끼워 instruction에 맞게 시각 특징을 조절한다.
- **Universal Sentence Encoder (USE)**: 문장을 벡터로 바꾸는 임베딩 모델. RT-1에서 instruction을 FiLM 조건으로 쓰기 위한 입력을 만든다.
- **TokenLearner**: 다수의 시각 token 중 중요한 것만 추려 압축하는 모듈. RT-1은 81개 token을 8개로 줄여 추론 속도를 높인다.
- **action tokenization**: 연속 행동 값을 그대로 회귀하지 않고 차원별로 256개 bin으로 이산화해 분류 문제처럼 다루는 방식.
- **control frequency / inference latency**: control frequency는 초당 action 갱신 횟수(RT-1은 3Hz), inference latency는 한 번의 추론에 걸리는 시간(RT-1의 모델 예산은 100ms 이하).
- **closed-loop control**: 한 번의 명령으로 끝나지 않고 매 timestep 새 관측을 받아 행동을 갱신하는 반복 제어.
- **compositional generalization**: 이미 학습한 skill과 object를 새로운 조합으로 묶어 낯선 instruction을 수행하는 일반화. RT-1의 unseen task 평가가 주로 이 범주다.

## 8. 그림 후보 (Figure Candidates)

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | RT-1 전체 개요 (paper Figure 1) | fetched | ★ wiki 권장 (overview) |
| fig02 | 데이터 수집·평가 환경 종합 (paper Figure 2 개요) | fetched | (선택) |
| fig03 | tokenized action 예시 | fetched | (선택) |
| fig04 | RT-1 상세 아키텍처 (paper Figure 3) | fetched | ★ wiki 권장 (architecture) |
| fig05 | robot classroom (paper Figure 2a) | fetched | (선택) |
| fig06 | mobile manipulator 플랫폼 (paper Figure 2d) | fetched | (선택) |
| fig07 | skill/instruction 구성 (paper Table 1) | fetched | (선택) |
| fig08 | object diversity (paper Figure 2e-f) | fetched | (선택) |
| fig09 | robustness 평가 시나리오 (paper Figure 4) | fetched | (선택) |
| fig10 | 기본 성능 비교 (paper Table 2) | fetched | ★ wiki 권장 (result) |
| fig11 | kitchen L1/L2/L3 generalization (paper Table 3) | fetched | (선택) |
| fig12 | kitchen qualitative sequence (paper Figure 5) | fetched | (선택) |
| fig13 | simulation transfer 결과 (paper Table 4) | fetched | (선택) |
| fig14 | heterogeneous robot data 결과 (paper Table 5) | fetched | (선택) |
| fig15 | long-horizon SayCan 결과 (paper Table 6) | fetched | (선택) |
| fig16 | 데이터 양 vs 다양성 ablation (paper Table 7) | fetched | (선택) |
| fig17 | 설계 ablation 종합 (paper Table 13) | fetched | ★ wiki 권장 (ablation 해석이 본문 비중 큼) |
| fig18 | 전체 페이지 스크린샷 | screenshot | (아카이브 전용) |

fig01~fig17은 원본이 모두 RT-1 논문(Brohan 2022) 자체의 도식·표를 재게재한 것이라, 이미 wiki에 있는 [[physical-ai/brohan-2022-rt-1-robotics-transformer-for-real-world]]의 curated figure(fig01·fig03·tab02)와 소스가 같다. 이 페이지는 입문 해설이라는 성격에 맞춰 개요(fig01)·아키텍처(fig04)·핵심 결과(fig10)에 더해 본문이 절 하나를 통째로 할애하는 ablation 종합표(fig17)까지 4개를 권장한다. 나머지는 curated:false로 전수 아카이브만 남긴다.
