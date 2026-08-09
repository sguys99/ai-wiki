---
title: "03-03. RT-1 - 모두의 로보틱스 - VLA 입문"
type: article
year: 2026
category: physical-ai
source: jo-2026-rt-1-vla-primer.md
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

## 요약 (Summary)

RT-1(Brohan 2022) 논문을 처음 읽는 사람을 위한 한국어 입문 해설이다. "모두의 로보틱스 - VLA 입문" 시리즈 03-03편으로, policy·episode·imitation learning 같은 로봇 학습 기초 개념부터 시작해 RT-1의 아키텍처와 실험 결과, ablation까지 순서대로 짚는다. 원 논문 자체는 이미 [[physical-ai/brohan-2022-rt-1-robotics-transformer-for-real-world]]로 wiki에 들어와 있어서 이 페이지는 그 논문을 처음 읽기 전 몸풀기로 쓰는 편이 맞다.

![[assets/jo-2026-rt-1-vla-primer/fig01.png]]
*Figure 1: RT-1 전체 개요. 이미지와 언어 지시를 받아 이산화된 arm/base 행동을 내고 130k 시연·3000회 실세계 시행으로 일반화와 robustness를 검증한다 (조인령 2026, Figure 1).*

## 기초 개념 (Basic Concepts)

로봇 정책(policy)은 현재 관측을 보고 다음 행동을 정하는 함수다. RT-1에서는 이미지와 언어 instruction을 입력받아 action distribution을 만들고 그 중 하나를 골라 로봇에 적용한다. 작업 시작부터 끝까지 한 번의 시도가 episode이고 그 안에서 관측→행동이 반복되는 단위가 timestep이다.

RT-1의 학습 방식은 강화학습으로 시행착오를 거듭하는 쪽이 아니라 imitation learning, 그중에서도 behavioral cloning에 가깝다. 성공한 시연 데이터를 모아두고 그 상황에서 어떤 행동이 나왔는지 맞히도록 정책을 학습시키는 방식이다. 로봇의 action도 하나의 명령이 아니라 arm 7차원·base 3차원·mode 1차원이 묶인 복합 신호다. RT-1은 이미지와 instruction을 함께 보고 이 action을 예측하기 때문에 vision-language-action policy로 분류된다.

## 방법론 및 아키텍처 (Methodology and Architecture)

RT-1의 입력은 최근 6장의 300×300 이미지 히스토리와 자연어 instruction 한 문장이다. 이미지는 ImageNet 사전학습 EfficientNet-B3를 거쳐 9×9×512 feature map, 즉 81개 visual token이 된다. instruction은 Universal Sentence Encoder(USE)로 임베딩된 뒤 FiLM layer를 거쳐 EfficientNet 내부로 주입되어 이미지 인코딩 단계부터 "지금 무엇이 중요한가"를 반영한다. FiLM의 affine 가중치를 0으로 초기화해 처음엔 항등 변환으로 동작하게 한 점도 원 논문 그대로 짚는다.

81개 token은 TokenLearner가 8개로 압축한다. 6장의 이미지에서 나온 8개씩을 모아 48개 token(+ position encoding)이 decoder-only Transformer(self-attention 8층, 19M 파라미터)에 들어가 action token을 낸다. action은 각 차원을 256 bin으로 이산화해 categorical cross-entropy로 학습한다. 연속값을 직접 회귀하는 대신 이산화를 택한 이유는 시연 데이터의 multi-modal 행동 분포를 표현하기 위해서라고 설명한다.

![[assets/jo-2026-rt-1-vla-primer/fig04.png]]
*Figure 3: RT-1 상세 아키텍처 — instruction은 USE 임베딩이 되어 FiLM으로 EfficientNet을 조건화하고 TokenLearner가 줄인 vision-language token을 decoder-only Transformer에 넣으면 이산 action token이 나온다 (조인령 2026, Figure 3).*

real-time 제어를 위한 설계도 별도로 다룬다. RT-1은 3Hz로 동작하며 모델 자체의 추론 예산을 100ms 이하로 둔다. TokenLearner로 token 수를 줄여 2.4배, 겹치는 window의 token을 재사용해 1.7배 가속하는 두 장치가 이 예산을 맞춘다.

## 결과 (Results)

기본 성능은 seen 97%, unseen 76%, distractor 83%, background 59%로, next best baseline 대비 각각 +25%·+36%·+18% 앞선다.

![[assets/jo-2026-rt-1-vla-primer/fig10.png]]
*Table 2: seen/unseen/distractor/background 성공률(%) 비교. RT-1이 네 축 모두에서 가장 높다 (조인령 2026, Table 2).*

heterogeneous data 흡수 능력도 짚는다. simulation 데이터를 더하면 real object 성능(92→90)은 거의 유지되면서 sim object 성능은 23→87(+64%)로 오른다. 전혀 다른 Kuka 로봇의 bin-picking 데이터를 섞으면 classroom 성능(92→90)은 유지되면서 bin-picking 성능은 22→39로 거의 두 배가 된다. long-horizon 평가에서는 SayCan planner의 저수준 실행기로 쓰였을 때 Kitchen1 execution 67%로 최고 성능을 냈고 학습 환경과 크게 다른 Kitchen2에서도 성능 저하가 두드러지지 않았다.

### 설계 ablation 해석

Table 13 ablation을 하나씩 짚으며 각 설계 선택의 근거를 설명한다.

![[assets/jo-2026-rt-1-vla-primer/fig17.png]]
*Table 13: 설계 ablation 종합 — discrete action·ImageNet pretraining·observation history·Transformer·모델 크기·auto-regressive action 각각을 제거했을 때의 성능 (조인령 2026, Table 13).*

discrete action 대신 continuous action을 쓰면 unseen이 76→43, distractor가 83→37로 크게 떨어진다. ImageNet pretraining을 빼면 unseen이 76→43(−33pt)까지 내려간다. 입력을 단일 이미지로 줄여 observation history를 없애면 distractor가 83→50, hard distractor는 64→14까지 낮아진다. Transformer를 빼고 EfficientNet만 남기면 전반적으로 낮아지고 특히 unseen·distractor에서 차이가 크다. auto-regressive action은 성능 개선이 크지 않으면서 추론 시간을 15ms→36ms로 2배 이상 늦춰 최종안에서 제외됐다. Table 7에서는 task diversity를 줄인 데이터가 양만 줄인 데이터보다 성능 하락이 훨씬 커서 quantity보다 diversity가 generalization에 더 크게 기여한다는 결론으로 이어진다.

## 한계 (Limitations)

이 해설이 정리하는 RT-1의 한계는 원 논문 그대로다. imitation learning 기반이라 시연자의 행동을 재현하는 데는 강하지만 스스로 새 행동을 탐색하지는 못한다. unseen task generalization도 이미 본 skill·object를 새로 조합하는 compositional generalization에 머무른다. long-horizon 성능은 SayCan 같은 상위 planner와 결합했을 때 나온 결과라 RT-1 자체는 계획을 세우기보다 안정적인 low-level executor에 가깝다. 13대 로봇으로 17개월간 130k demonstration을 모아야 했던 데이터 수집 비용도 큰 진입 장벽이다.

## 관련 페이지 (Related Pages)

- [[physical-ai/brohan-2022-rt-1-robotics-transformer-for-real-world]] — 이 페이지가 해설하는 원 논문. 정보량과 정확도는 원 논문 페이지가 더 크므로 처음 RT-1을 접할 때 이 입문 페이지를 먼저 읽고 원 논문 페이지로 넘어가는 순서를 권한다.
- [[physical-ai/kim-2026-silicon-valley-rfm-part-1]] — RT-1이 속한 VLA/RFM 계보를 실리콘밸리 업계 시각에서 조망한 글. 이 페이지가 다루는 기술 축과 상보적이다.
- [[overviews/physical-ai-overview]] — physical-ai 카테고리의 분류 뼈대·학습 경로 허브.
