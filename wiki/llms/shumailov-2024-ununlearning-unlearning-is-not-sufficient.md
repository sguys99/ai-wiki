---
title: "UnUnlearning: Unlearning is not sufficient for content regulation in advanced generative AI"
type: paper
year: 2024
category: llms
raw_path: /Users/kmyu/Desktop/project/ai-wiki/raw/papers/2407.00106v1.pdf
raw_filename: "2407.00106v1.pdf"
source_collection: external
source: shumailov-2024-ununlearning-unlearning-is-not-sufficient.md
authors: "Ilia Shumailov, Jamie Hayes, Eleni Triantafillou, Guillermo Ortiz-Jimenez, Nicolas Papernot, Matthew Jagielski, Itay Yona, Heidi Howard, Eugene Bagdasaryan"
arxiv_id: "2407.00106"
tags: [unlearning, ununlearning, in-context-learning, content-regulation, safety, llm, google-deepmind]
---

## 요약 (Summary)

Google DeepMind의 position paper. LLM에서 impermissible knowledge(예: 폭탄 제조법, 생물·핵 무기 지식)를 제거할 목적으로 사용되는 **unlearning**은, exact unlearning이라 하더라도 LLM의 **in-context learning (ICL)** 능력 때문에 무력화될 수 있다고 주장한다. 저자들은 이 현상을 **ununlearning**이라 명명한다: 한 번 제거된 (또는 애초에 학습하지 않은) 지식을 prompt를 통해 다시 주입하면, 모델은 잔존하는 axiomatic knowledge와 reasoning 능력을 결합해 그 지식을 가진 것처럼 행동한다. 결과적으로 unlearning은 content regulation의 단일 해법이 될 수 없으며, **content filtering**이 함께 운영되어야 한다.

## 주요 기여 (Key Contributions)

- **UnUnlearning 정식화**: unlearning operator $u(M, \hat{X}) = \hat{M}$이 있어도, $\hat{M}(\text{prompt}+\hat{X}) \approx M(\hat{X})$가 성립할 수 있음을 정의 7로 제시.
- **Axioms/Theorems 프레임**: 모델 지식을 원자적 사실(axioms)과 그로부터 정의되는 파생 개념(theorems)으로 나누고, theorem(예: Tiger)을 unlearning해도 axiom들은 다른 theorem(예: Zebra)에 필요해 남기 때문에 in-context 재정의로 즉시 복구된다는 점을 Figure 1로 설명. Figure 2는 "bomb"이라는 용어가 unlearning되어도 일반 화학 지식만으로 우회 정의가 가능함을 보여준다.
- **Exact unlearning의 이론적 상한**: 어떤 unlearning 방법도 "처음부터 그 데이터를 학습하지 않은 모델"보다 잘 할 수 없으며, 그런 이상적 모델조차 ununlearning에 노출됨 → unlearning만으로는 content regulation 목표를 달성할 수 없음.
- **정책적 함의**: Filtering의 computational bound, mosaic attack 취약성, knowledge attribution(책임 귀속) 문제를 논의하며 unlearning을 "one-size-fits-all"로 다루는 정책 담론을 재고할 것을 촉구.

## 방법론 및 아키텍처 (Methodology and Architecture)

경험적 실험 대신 개념적 논증과 두 개의 예시 도표로 구성된다.

- **Setting**: 모델 $M$, unlearning 후 모델 $\hat{M}$, 식별된 impermissible knowledge $\hat{X}$. ICL을 통한 우회: $\hat{M}(\text{prompt}+\hat{X}) \approx M(\hat{X})$.
- **Privacy unlearning vs. content-regulation unlearning 구분**: 전자는 forget set이 training subset이고 indistinguishability를 요구. 후자는 (Goel et al., 2024의 corrective unlearning과 정합) training subset과 무관한 broader한 지식 제거.
- **Knowledge compositionality 논증**:
  - Figure 1 (axiom/theorem): Ear, Eye, Tail, Big, Striped, Gallops → Cat, Tiger, Zebra. Tiger unlearning이 axiom 보존을 강제하므로 ICL로 재정의 시 즉시 복구.
  - Figure 2 (bomb): "bomb" 용어를 exact unlearning해도 일반 화학지식으로 우회 합성 가능.
- **부작용 논의**: privacy mechanism 자체가 leakage를 늘리는 현상(Wang et al., 2022; Hayes et al., 2024)이 unlearning에도 나타남 — 거부 자체가 위험 신호로 작동.

## 결과 (Results)

- 정량적 벤치마크 없음(position paper). 핵심 결론은 개념적:
  - **Exact unlearning도 ununlearning에 취약** → 어떤 unlearning 알고리즘도 "처음부터 학습하지 않은 모델" 이상의 보장을 줄 수 없음.
  - **Inference-time impermissible behavior**는 unlearning만으로 막을 수 없고, **지속적 content filtering**이 필요.
  - Forbidding knowledge(self-destructing models 등)도 mosaic attack에 강건하지 않으며, 미래 use-case를 미리 정의할 수 없다는 한계.

## 한계 및 후속 논의 (Limitations and Open Questions)

- 실제 frontier LLM에서 ununlearning이 얼마나 쉽게 일어나는지에 대한 정량 평가 부재.
- "Prompting과 학습에 invariant하게 reasoning을 제한하는 메커니즘"은 미해결.
- 무해 axiom의 adversarial composition으로 발생한 행위의 attribution 문제(법적·윤리적) 미해결.

## 관련 페이지 (Related Pages)

_(아직 관련 페이지 없음. 후속으로 WMDP benchmark, ICL 일반 이론, content filtering·jailbreak 관련 자료가 추가되면 여기에 연결한다.)_

- 잠재 연결 후보 (raw 자료 추가 시):
  - Li et al., 2024 — WMDP benchmark (위험 지식 unlearning 평가)
  - Eldan & Russinovich, 2023 — Who's Harry Potter? (LLM 특정 작품 unlearning)
  - Brown et al., 2020 — GPT-3, ICL의 출발점
  - Glukhov et al., 2023 — LLM censorship as security problem (mosaic attack)
  - Henderson et al., 2023 — self-destructing models (forbidding knowledge)
