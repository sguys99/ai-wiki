---
title: "UnUnlearning: Unlearning is not sufficient for content regulation in advanced generative AI"
type: paper
year: 2024
category: llms
raw_path: /Users/kmyu/Desktop/project/ai-wiki/raw/papers/2407.00106v1.pdf
raw_filename: "2407.00106v1.pdf"
source_collection: external
authors: "Ilia Shumailov, Jamie Hayes, Eleni Triantafillou, Guillermo Ortiz-Jimenez, Nicolas Papernot, Matthew Jagielski, Itay Yona, Heidi Howard, Eugene Bagdasaryan"
arxiv_id: "2407.00106"
tags: [unlearning, ununlearning, in-context-learning, content-regulation, safety, llm, google-deepmind]
---

## 한 줄 요약 (One-line Summary)

LLM의 in-context learning (ICL) 능력 때문에 unlearning(심지어 exact unlearning이라도)만으로는 impermissible knowledge를 통제할 수 없고, 제거된 지식이 컨텍스트로 재주입되어 부활하는 **ununlearning** 현상이 발생하므로 content filtering이 함께 필요하다고 주장하는 Google DeepMind의 position paper.

## 1. 자료 정보 (Document Information)

- **제목**: UnUnlearning: Unlearning is not sufficient for content regulation in advanced generative AI
- **저자**: Ilia Shumailov, Jamie Hayes, Eleni Triantafillou, Guillermo Ortiz-Jimenez, Nicolas Papernot, Matthew Jagielski, Itay Yona, Heidi Howard, Eugene Bagdasaryan
- **소속**: Google DeepMind
- **발행**: 2024년 6월 27일, arXiv:2407.00106v1 [cs.LG]
- **유형**: Position paper (7 페이지, 단일 도표 2장)
- **범위**: Unlearning이 **content regulation 목적**(예: bioweapon·핵 지식 등 impermissible knowledge 제거)에 사용될 때의 한계를 다룬다. 원래 use-case인 **privacy 목적의 unlearning**은 다루지 않는다.

## 2. 주요 기여 (Key Contributions)

1. **Ununlearning 개념 제안**: 모델 $\hat{M}$이 forget set $\hat{X}$에 대해 unlearning되었더라도, ICL을 통해 prompt에 $\hat{X}$를 주입하면 $\hat{M}(\text{prompt} + \hat{X}) \approx M(\hat{X})$가 되어 unlearning이 사실상 무효화된다는 점을 정식화.
2. **Exact unlearning조차 충분하지 않다는 논증**: "원래 학습에서 그 데이터를 본 적 없는 모델"이 ununlearning의 상한선인데, 그런 이상적 모델조차 잔존하는 axiom(공리적 지식)으로부터 impermissible theorem을 reasoning으로 재구성할 수 있다.
3. **Axiom/Theorem 지식 분류 프레임워크**: 모델이 보유한 지식을 (a) **axioms** (Ear, Eye, Tail, Big, Striped, Gallops 같은 원자적 사실)와 (b) **theorems** (axioms의 조합으로 정의되는 파생 개념, 예: Cat = Ear ∧ Eye ∧ Tail; Tiger = Cat ∧ Big ∧ Striped)로 구분. Tiger를 unlearning해도 axiom들은 다른 theorem(Zebra)을 위해 남아 있어야 하므로, Tiger 개념을 컨텍스트로 다시 정의하면 모델은 즉시 Tiger에 대해 추론할 수 있다.
4. **Content filtering 필요성 주장**: Unlearning만으로는 모델이 inference 시점에 impermissible behavior를 하지 않게 보장할 수 없으므로, 입력/출력에 대한 능동적·지속적 filtering이 필수임을 주장.
5. **Attribution 문제 제기**: 무해한 axiom들이 조합되어 malicious theorem이 도출될 때, 책임 귀속(누가 도구를 만들었는가, 누가 명령했는가, 누가 실행했는가)이라는 철학적 난제를 LLM 안전성 논의에 가져옴.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

본 논문은 경험적 평가 없이 **개념적·이론적 논증**을 제시한다.

- **형식화 (Setting)**: 모델 $M: \mathcal{X} \to \mathcal{Y}$, unlearning operator $u(M, \hat{X}) = \hat{M}$, 여기서 $\hat{X} \subseteq \mathcal{X}$는 model developer가 식별한 impermissible knowledge. 핵심 주장: ICL을 통해 $\hat{M}(\text{prompt} + \hat{X}) \approx M(\hat{X})$.

- **Unlearning의 분류**:
  - *Unlearning for privacy*: forget set이 training data의 특정 부분집합. exact (Bourtoule et al., 2021) vs. inexact (Golatkar et al., 2020; Kurmanji et al., 2024; Thudi et al., 2022).
  - *Unlearning for content regulation*: forget set이 training subset과 일치할 필요 없는 broader knowledge (Goel et al., 2024의 "corrective unlearning" 개념과 정합).

- **Knowledge compositionality 논증** (Figure 1·2):
  - **Figure 1 (Cat/Tiger/Zebra 예시)**: 6개 axioms로 3개 theorem 정의. Tiger를 unlearning해도 (a) Ear/Eye/Tail이 Cat·Zebra에 필요, (b) Big/Striped가 Zebra에 필요하므로 axiom 제거 불가. → "Tiger는 'Ear와 Eye와 Tail이 있고 크고 줄무늬가 있는 동물'이다"라는 in-context 정의만 주면 추론 부활.
  - **Figure 2 (bomb 예시)**: "bomb"이라는 용어 자체를 exact unlearning으로 제거해도, 모델이 보유한 일반 화학 지식만으로 adversary가 "이러이러한 속성을 가진 물질"이라고 우회 정의해 폭탄 제조법을 끌어낼 수 있음.

- **Mosaic attacks**: 무해한 작은 정보 조각들의 조합이 유해 결과를 만드는 공격 (Glukhov et al., 2023 인용). Forbidding knowledge 접근법도 이에 강건하지 않음.

- **Privacy mechanism의 부작용**: Privacy literature의 알려진 사실 — privacy 메커니즘 자체의 존재가 leakage를 늘릴 수 있음 (Wang et al., 2022). Unlearning에서도 유사 효과 관찰 (Hayes et al., 2024). 화학 합성 거부 자체가 어떤 레시피가 위험한지에 대한 신호가 될 수 있음.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

본 논문은 **벤치마크나 정량적 실험을 제시하지 않는** position paper다. 주된 "결과"는 다음의 개념적 결론이다:

- **이상적 unlearning의 상한**: "한 번도 본 적 없는 모델"이 가능한 최선이며, 이 모델조차 잔존 axiom으로 impermissible theorem을 ICL을 통해 재구성 가능.
- **따라서 어떤 unlearning 방법도 "결코 학습하지 않은 모델"보다 더 잘할 수 없으며**, 그런 모델조차 content regulation 목표를 보장하지 못함.
- **함의**: Unlearning은 training-phase의 control mechanism으로는 유효하나, inference-time impermissible behavior를 막지는 못한다. → content filtering의 지속적·능동적 운영 필요.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **Position paper의 한계**: ununlearning이 실제 LLM(예: GPT-4, Gemini, Llama 등)에서 얼마나 쉽게 일어나는지에 대한 정량적 측정·재현 실험이 부재. 후속 경험 연구가 필요.
- **Filtering의 computational bound**: 저자들은 context-dependent filtering이 근본적으로 한계가 있다고 시사하지만(Glukhov et al., 2023), 구체적 bound는 제시하지 않음.
- **Forbidding knowledge 접근법** (Henderson et al., 2023의 self-destructing models 등)도 mosaic attacks에 취약하고, 미래의 유해 사용을 모두 미리 정의할 수 없는 한계.
- **Reasoning에 invariant한 제약**의 미해결성: "prompting과 다른 학습에 invariant하게 reasoning 능력을 명시적으로 제한하는 방법"이 필요하다고 제시하지만, 그 방법은 열린 문제.
- **Knowledge attribution**: 무해한 axiom + adversarial composition으로 발생한 malicious behavior의 책임 귀속 문제(철학적·법적 차원) 미해결.

## 6. 관련 연구 (Related Work)

- **Unlearning 토대**:
  - Bourtoule et al., 2021 (Machine Unlearning, exact unlearning 정의)
  - Ginart et al., 2019; Sekhari et al., 2021 (formal unlearning definitions)
  - Golatkar et al., 2020; Kurmanji et al., 2024; Thudi et al., 2022 (inexact unlearning)
  - Muresanu et al., 2024 (unlearnable algorithms for ICL)
- **LLM unlearning 응용**:
  - Eldan and Russinovich, 2023 (Who's Harry Potter? — LLM의 특정 작품 unlearning)
  - Li et al., 2024 (WMDP benchmark — bioweapon·화학·사이버 등 위험 지식 unlearning 평가)
  - Yao et al., 2023 (LLM unlearning for harmful responses, hallucination, copyright)
  - Liu et al., 2024 (safer LLMs via unlearning)
  - Goel et al., 2024 (corrective unlearning)
- **Diffusion model unlearning**: Fan et al., 2023 (SalUn); Zhang et al., 2023 (Forget-Me-Not)
- **In-Context Learning**:
  - Brown et al., 2020 (GPT-3, few-shot learners)
  - Kossen et al., 2024 (ICL은 label relationships를 학습하나 conventional learning은 아니다)
  - Agarwal et al., 2024 (many-shot ICL)
- **Censorship / 정책**:
  - Glukhov et al., 2023 (LLM censorship as security problem; mosaic attacks)
  - Henderson et al., 2023 (self-destructing models)
- **Privacy ↔ unlearning 부작용**: Wang et al., 2022; Hayes et al., 2024
- **Robust unlearning 평가**: Lynch et al., 2024 (eight methods to evaluate unlearning)

## 7. 용어집 (Glossary)

- **Unlearning**: 학습된 모델에서 특정 지식·데이터의 영향을 제거하는 절차. 원래 privacy 목적으로 제안됨.
- **Exact unlearning**: Unlearned 모델의 분포가 "해당 데이터를 빼고 처음부터 다시 학습한 모델"의 분포와 구별 불가능함을 보장하는 방법 (Bourtoule et al., 2021).
- **Inexact (approximate) unlearning**: 위 indistinguishability를 근사적으로만 달성하는 대신 효율성·utility를 얻는 방법.
- **Unlearning for privacy**: Forget set이 training data의 명시적 부분집합으로 정의됨.
- **Unlearning for content regulation**: Forget set이 training subset과 일치하지 않을 수 있는 broader한 impermissible knowledge.
- **Impermissible knowledge**: 모델이 보유하지 않아야 한다고 model developer가 지정한 지식 (예: bioweapon, 핵, 폭탄 제조법).
- **In-context learning (ICL)**: LLM이 training에 없던 task를 prompt의 task 설명·예시만으로 수행하는 emergent 능력 (Brown et al., 2020).
- **UnUnlearning**: 이전에 unlearning(혹은 애초에 학습하지 않은) 지식이 ICL을 통해 prompt로 주입되어 모델이 다시 그 지식을 가진 것처럼 행동하는 현상. 본 논문의 핵심 신조어.
- **Axioms / Theorems (저자의 표현)**: 모델이 보유한 지식을 원자적 사실(axioms)과 그로부터 파생된 개념(theorems)으로 구분하는 비유적 프레임.
- **Content filtering**: 모델 입력 query와 출력 response를 거르는 절차. 모델 내부 또는 외부에서 동작 가능.
- **Mosaic attack**: 개별적으로는 무해한 정보 조각의 조합으로 유해 결과를 도출하는 공격 (Glukhov et al., 2023).
- **Knowledge compositionality**: 서로 다른 지식 단위가 결합되어 새로운 지식을 만들어내는 성질. 본 논문에서 unlearning이 어렵다는 핵심 근거.
- **Forbidding knowledge**: 데이터를 단순히 제거하는 대신 "이 지식은 사용 금지"라고 모델에 명시적으로 가르치는 접근 (Henderson et al., 2023).
- **Corrective unlearning**: Training data의 특정 부분집합으로 식별되지 않는, 일반적으로 "잘못된 지식"을 사후 교정하는 unlearning 개념 (Goel et al., 2024).
