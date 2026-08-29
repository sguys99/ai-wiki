---
title: "03-11. WALL-OSS - 모두의 로보틱스 - VLA 입문"
type: article
year: 2026
category: physical-ai
raw_path: raw/articles/jo-2026-wall-oss-vla-primer.md
raw_filename: "jo-2026-wall-oss-vla-primer.md"
source_collection: external
author: "조인령"
url: "https://wikidocs.net/366377"
publisher: "wikidocs.net"
fetched_at: "2026-08-28T08:46:20+0900"
extractor_tier: "chrome"
tags: []
figures:
  - id: fig01
    file: assets/jo-2026-wall-oss-vla-primer/fig01.png
    raw: raw/articles/jo-2026-wall-oss-vla-primer-figures/fig01.png
    caption: "WALL-OSS design comparison"
    strategy: fetched
    curated: false
  - id: fig02
    file: assets/jo-2026-wall-oss-vla-primer/fig02.png
    raw: raw/articles/jo-2026-wall-oss-vla-primer-figures/fig02.png
    caption: "WALL-OSS architecture"
    strategy: fetched
    curated: false
  - id: fig03
    file: assets/jo-2026-wall-oss-vla-primer/fig03.png
    raw: raw/articles/jo-2026-wall-oss-vla-primer-figures/fig03.png
    caption: "WALL-OSS training pipeline"
    strategy: fetched
    curated: false
  - id: fig04
    file: assets/jo-2026-wall-oss-vla-primer/fig04.png
    raw: raw/articles/jo-2026-wall-oss-vla-primer-figures/fig04.png
    caption: "VQA example"
    strategy: fetched
    curated: false
  - id: fig05
    file: assets/jo-2026-wall-oss-vla-primer/fig05.png
    raw: raw/articles/jo-2026-wall-oss-vla-primer-figures/fig05.png
    caption: "Static router"
    strategy: fetched
    curated: false
  - id: fig06
    file: assets/jo-2026-wall-oss-vla-primer/fig06.png
    raw: raw/articles/jo-2026-wall-oss-vla-primer-figures/fig06.png
    caption: "Uni-CoT joint loss"
    strategy: fetched
    curated: false
  - id: fig07
    file: assets/jo-2026-wall-oss-vla-primer/fig07.png
    raw: raw/articles/jo-2026-wall-oss-vla-primer-figures/fig07.png
    caption: "WALL-OSS data strategy"
    strategy: fetched
    curated: false
  - id: fig08
    file: assets/jo-2026-wall-oss-vla-primer/fig08.png
    raw: raw/articles/jo-2026-wall-oss-vla-primer-figures/fig08.png
    caption: "Overall performance"
    strategy: fetched
    curated: false
  - id: fig09
    file: assets/jo-2026-wall-oss-vla-primer/fig09.png
    raw: raw/articles/jo-2026-wall-oss-vla-primer-figures/fig09.png
    caption: "Single-instruction result"
    strategy: fetched
    curated: false
  - id: fig10
    file: assets/jo-2026-wall-oss-vla-primer/fig10.png
    raw: raw/articles/jo-2026-wall-oss-vla-primer-figures/fig10.png
    caption: "Long-horizon and reasoning result"
    strategy: fetched
    curated: false
  - id: fig11
    file: assets/jo-2026-wall-oss-vla-primer/page-full.png
    raw: raw/articles/jo-2026-wall-oss-vla-primer-figures/page-full.png
    caption: "전체 페이지 스크린샷"
    strategy: screenshot
    curated: false
  - id: fig12
    file: assets/jo-2026-wall-oss-vla-primer/fig12.png
    raw: raw/articles/jo-2026-wall-oss-vla-primer-figures/fig12.png
    caption: "Discrete action modeling"
    strategy: fetched
    curated: false
  - id: fig13
    file: assets/jo-2026-wall-oss-vla-primer/fig13.png
    raw: raw/articles/jo-2026-wall-oss-vla-primer-figures/fig13.png
    caption: "FAST tokenization"
    strategy: fetched
    curated: false
  - id: fig14
    file: assets/jo-2026-wall-oss-vla-primer/fig14.png
    raw: raw/articles/jo-2026-wall-oss-vla-primer-figures/fig14.png
    caption: "Inspiration loss"
    strategy: fetched
    curated: false
  - id: fig15
    file: assets/jo-2026-wall-oss-vla-primer/fig15.png
    raw: raw/articles/jo-2026-wall-oss-vla-primer-figures/fig15.png
    caption: "Noise schedule"
    strategy: fetched
    curated: false
  - id: fig16
    file: assets/jo-2026-wall-oss-vla-primer/fig16.png
    raw: raw/articles/jo-2026-wall-oss-vla-primer-figures/fig16.png
    caption: "Integration loss"
    strategy: fetched
    curated: false
  - id: fig17
    file: assets/jo-2026-wall-oss-vla-primer/fig17.png
    raw: raw/articles/jo-2026-wall-oss-vla-primer-figures/fig17.png
    caption: "Uni-CoT objectives"
    strategy: fetched
    curated: false
  - id: fig18
    file: assets/jo-2026-wall-oss-vla-primer/fig18.png
    raw: raw/articles/jo-2026-wall-oss-vla-primer-figures/fig18.png
    caption: "General VQA data"
    strategy: fetched
    curated: false
  - id: fig19
    file: assets/jo-2026-wall-oss-vla-primer/fig19.png
    raw: raw/articles/jo-2026-wall-oss-vla-primer-figures/fig19.png
    caption: "Embodied VQA data"
    strategy: fetched
    curated: false
---

> 수집 메모 — `scripts/fetch_article.py` 가 사용자의 명시적 URL 지시에 따라 가져왔다 (CLAUDE.md rule #1 의 자료 수집 예외). 추출 tier: `chrome`. 본문은 원문 그대로이며 요약·번역·윤문하지 않았다.
> `category` 는 임시값이므로 Step 3 에서 확정할 것.

---

## Ⅰ. 모델 등장 배경

### WALL-OSS 등장 배경

최근 거대 언어 모델(LLM)과 비전-언어 모델(VLM)의 비약적인 발전에도 불구하고, 이들은 여전히 물리적 세계와 단절된 비구체화(disembodied) 상태에 머물러 있습니다. 현재의 강력한 AI 모델들은 텍스트와 이미지를 처리하는 능력은 매우 뛰어나지만, 물리적 실체가 없기 때문에 현실의 복잡한 물리 법칙이나 공간적 맥락을 직접 체득하지 못합니다. 예를 들어, 현재의 VLM은 복잡하게 겹쳐진 카드 더미에서 모든 카드를 세고 하나씩 가리키는 법을 텍스트로는 설명할 수 있어도, 실제 환경에서 각 카드의 정확한 입체적 좌표 (x,y)를 포착하여 손가락을 정확한 위치로 이동시키는 공간적 추론에는 한계를 보입니다. 또한 알파벳 블록으로 특정 단어를 만드는 과제에서 단어에 필요한 철자가 부족할 경우, 상황을 인지할 수는 있으나 그 상태에서 어떤 행동을 해야 하는지는 모르는, 즉 행동과 지각이 정렬되지 않는 병목 현상이 발생합니다.

WALL-OSS는 이러한 기존 모델들의 한계를 극복하기 위해 제안되었습니다. VL 정보와 action 정보가 SA(Self-Attention)를 공유하여 시각-언어-행동이 하나의 맥락 안에서 소통하게 하되, 실제 지식 처리는 VLFFN과 ActionFFN으로 나누어(Mixture-of-Experts, MoE) 정보 손실을 방지합니다. WALL-OSS는 이렇게 단계별 학습 전략을 통해 지능과 행동을 긴밀하게 결합함으로써, 비구체화된 VLM을 실제 물리적 공간에서 스스로를 개선하는 피드백 과정이 가능하도록 제시합니다.

## Ⅱ. 배경지식

### 기존 VLA 아키텍처 패러다임

기존의 비전-언어-행동(VLA) 모델들은 이러한 지능과 행동 사이의 간극을 해결하기 위해 크게 두 가지 아키텍처 패러다임을 채택해 왔습니다.

![WALL-OSS design comparison](https://static.wikidocs.net/images/page/366377/gh_df6314f4706c.png)

#### 1. 혼합 설계 (Unified Design)

VLM을 직접 확장하여 행동을 모델링하는 방식(예: RT-2, OpenVLA)입니다. 따라서 VL(Vision + Language) 정보와 Action 정보를 모두 모아서 SA(Self-Attention)와 FFN(Feed-Forward Network)를 진행합니다. 이에 따라 행동 학습 과정에서 VLM의 원래 가중치가 심하게 뒤섞여 기존의 시각 및 언어 이해 능력이 퇴화하는 가중치 편향(weight drift) 문제가 발생할 수 있습니다.

#### 2. 분리 설계 (Decoupled Design)

행동 예측을 위한 별도의 브랜치를 두는 방식(예: Pi-0)입니다. VL(Vision + Language) 정보와 Action 정보를 각각 나누어 처리하며 SA와 FFN이 분리되어 있습니다. 이 방식은 VLM의 지능은 보존할 수 있으나, 시각 및 언어 정보와 행동 제어 사이의 결합이 느슨하여 복잡한 지시를 정교하게 수행하는 능력이 떨어지는 한계가 있습니다.

## Ⅲ. 모델 구조

### 1. WALL-OSS 모델 구조

WALL-OSS는 강력한 시각-언어 이해 능력을 유지하면서도 정밀한 로봇 제어를 동시에 수행하기 위해 다음과 같은 구조를 가집니다.

![WALL-OSS architecture](https://static.wikidocs.net/images/page/366377/gh_5aed10ef8bfc.png)

- 메인 백본(Main Backbone):QwenVL2.5-3B를 메인 VLM 백본으로 채택합니다.
- MoE 구조(Mixture-of-Experts): VL 작업을 위한 FFN과 Action 작업을 위한 FFN을 분리하여 할당합니다.
- 다중 출력 헤드(Multi-Output Heads): 작업의 성격에 따라 두 가지 형태의 출력을 생성합니다.
- LMHead: Chain of Thought, sub-task, 이산적인(discrete) 행동 토큰을 생성합니다.
- FlowHead: Flow Matching을 적용해 연속적인(continuous) 행동 토큰을 생성합니다.

### 2. WALL-OSS 훈련 파이프라인

VLM의 사전훈련에 이어, 크게 영감(Inspiration) 단계와 통합(Integration) 단계의 두 가지 주요 구성 요소로 구성됩니다.

![WALL-OSS training pipeline](https://static.wikidocs.net/images/page/366377/gh_d5c34a7f500f.png)

#### 2-1. Inspiration Stage

VLM의 사전훈련에 이어 진행되는 첫 번째 단계로, 로봇에게 필요한 공간 지능과 대략적인 행동 감각을 동시에 심어주는 것을 목표로 합니다. 아래의 두 과정은 병렬적으로 수행되어 기존 VLM이 로봇의 신체적 맥락을 이해할 수 있도록 기초를 다집니다.

##### 1. Embodied VQA를 통한 공간 추론 강화

기존 VLM의 Feed-Forward Network(FFN)를 재사용하면서 Embodied VQA 추가를 통해 공간적 추론 능력을 강화합니다.

VQA(Visual Question Answering)는 아래 사진처럼 image와 question을 동시에 입력받아 answer를 말하는 AI 모델입니다. 이미지와 자연어를 동시에 이해하는 일반적인 VLM 모델들이 해당됩니다.

![VQA example](https://static.wikidocs.net/images/page/366377/gh_9ac1006ddd5a.png)

Embodied VQA는 단순히 이미지를 보고 답하는 기존 VQA를 넘어, 로봇이 물리적 환경을 깊이 있게 이해하도록 돕습니다. 이는 시각적 이해와 언어적 추론을 로봇의 신체적 맥락과 연결하는 과정입니다. WALL-OSS는 Uni-CoT(Unified Cross-Level Chain-of-Thought)라는 기술을 통해 Embodied VQA를 수행합니다. Uni-CoT는 현재 설명하고 있는 1단계 Inspiration Stage와 추후에 설명할 2단계 Integration Stage를 하나로 통합하며, 이 과정은 뒤에서 다시 설명합니다.

##### 2. 이산적 행동 모델링 (Discrete Action Modeling)

로봇의 연속적인 움직임을 VLM이 이해할 수 있는 형태로 변환하여 학습합니다.

![Discrete action modeling](https://static.wikidocs.net/images/page/366377/gh_ecf73aecf7b0.png)

로봇의 연속적인 움직임을 단어처럼 취급하여 학습하기 위하여, pi0_fast 모델의 Efficient Action Tokenization 기술을 차용하였습니다.

![FAST tokenization](https://static.wikidocs.net/images/page/366377/gh_d090c97ed134.png)

FAST 알고리즘은 세 단계를 거쳐 z(이산적 토큰)로 압축합니다.

- DCT (Discrete Cosine Transform): 복잡한 움직임 데이터에서 핵심적인 특징만 추출합니다.
- Quant (Quantization): 연속적인 수치를 정해진 몇 개의 숫자로 양자화합니다.
- BPE (Byte Pair Encoding): 자연어 처리에서 subword로 분리하듯이, 자주 나타나는 동작 패턴을 하나의 효율적인 동작 단어로 묶습니다.

![Inspiration loss](https://static.wikidocs.net/images/page/366377/gh_c91c2b98774a.png)

해당 수식은 Inspiration Loss 함수를 나타낸 것으로, 앞의 정량적인 계산이 아닌 이산화된 토큰에 대한 손실을 계산하므로 교차 엔트로피(Cross-Entropy) 형식으로 정의됩니다.

- 첫 번째 항(VQA 학습): τt (텍스트 토큰), c (사고 과정) 예측에 대한 손실
- 두 번째 항(이산적 행동 학습): zk (행동 토큰), c (사고 과정) 예측에 대한 손실
- λ: VQA 학습과 이산적 행동 학습 사이의 균형을 맞추는 하이퍼파라미터

결국 Inspiration Stage를 통해 모델은 어떤 상황에서 어떤 행동을 해야 하는지에 대한 거친 행동 인식(coarse action awareness)과 사고 사슬(CoT) 능력을 갖추게 됩니다.

#### 2-2. Integration Stage

이산화된 토큰 예측 대신 Flow Matching을 통해 로봇의 실제 움직임인 연속적인 궤적을 직접 생성합니다.

##### 1. 노이즈 스케줄 함수

![Noise schedule](https://static.wikidocs.net/images/page/366377/gh_c86a4b148048.png)

- x0: 노이즈가 완전히 제거된, 도달해야 할 정답 행동
- ϵ: 무작위 노이즈(Gaussian noise) 상태인 시작점
- 샘플링 시 ρ 값을 0∼1 사이에서 균등하게 선택하지 않고 Beta 분포를 통해 ρ가 0에 가까운 경우 더 많이 샘플링되도록 하여, 결과적으로 모델은 노이즈가 많은 초기 단계의 데이터를 더 많이 학습하도록 설계됩니다.

##### 2. Integration Loss

![Integration loss](https://static.wikidocs.net/images/page/366377/gh_43fde6f38c56.png)

- xt: 현재의 행동 상태(Current Noisy Action), 위 노이즈 스케줄 함수를 통해 정의
- h: v (visual input), x (language instruction), c (optional Chain-of-Thought)가 Self-Attention을 통해 결합된 멀티모달 컨텍스트
- (ϵ−x0): 무작위 노이즈에서 정답으로 가는 실제 방향과 속도

즉 수식의 의미는 모델이 예측한 노이즈 제거 방향(Vϕ)이 노이즈를 제거하기 위한 올바른 방향(ϵ−x0)과의 차이를 나타내는 것으로, 해당 손실 함수를 최소화하는 방향으로 학습하게 됩니다.

##### 3. 학습 전략과 정적 라우터 (Static Router)

![Static router](https://static.wikidocs.net/images/page/366377/gh_c7a1717099c1.png)

WALL-OSS는 이 통합 과정을 더욱 안정적으로 만들기 위해 두 단계로 나누어 학습을 진행합니다. 또한 Static Router를 사용하여, 행동 관련 특징은 Action FFN으로, 시각-언어 관련 특징은 Vision-Language FFN으로 고정된 경로를 통해 전송됩니다.

- Phase 1 (VLM 동결): 기존에 잘 학습된 시각-언어 모델(VLM)은 건드리지 않고, 행동을 생성하는 Action Head만 학습시킵니다. 이미 배운 공간 지식을 바탕으로 정밀한 수치 제어 능력만 먼저 익히는 것입니다.
- Phase 2 (공동 최적화): VLM의 동결을 풀고, 시각 이해와 행동 제어를 동시에 미세 조정합니다. 이때 정적 라우터(Static Router)가 작동하여 시각-언어 정보는 VL FFN으로, 행동 관련 정보는 Action FFN으로 배분합니다. 이 과정은 학습 과정에서의 불안정성을 줄이고, 시각-언어 지식과 물리적 행동 사이의 정밀한 정렬(alignment)을 가능하게 하여 복잡한 멀티모달 작업을 효율적으로 완수하게 합니다.

#### 2-3. Uni-CoT (Unified Cross-Level Chain-of-Thought)

이 과정에서, 앞서 1, 2단계에서 정의된 지시문부터 추론(CoT), 하위 계획, 연속 행동까지 하나로 묶는 단일 프레임워크가 생성됩니다.

> 지시 이해(Instruction) → 사고 과정(CoT) → 하위 목표 계획(Subtask) → 연속적 행동(Action)

이 모든 과정이 단일 모델 내에서 미분 가능한(differentiable) 형태로 연결되어 있어, 고차원적 지시와 저차원적 행동이 원활하게 전환되며 비동기적이고 병렬적인 제어가 가능합니다. 논문에서는 Uni-CoT를 통해 2단계 Integration Stage로 학습한 행동 예측과 1단계 Inspiration Stage로 학습된 VQA를 동시에 최적화하기 위한 통합 손실 함수(joint loss function)를 다음과 같이 제시하고 있습니다.

![Uni-CoT joint loss](https://static.wikidocs.net/images/page/366377/gh_492902349a2a.png)

- v (visual input): 로봇의 카메라를 통해 들어오는 이미지나 영상 데이터
- x (language instruction): 사용자가 내린 명령
- c (optional Chain-of-Thought): 작업을 수행하기 위한 중간 추론 단계나 계획
- a1:T (target action trajectory): 시간 T 동안 로봇이 취해야 할 연속적인 동작의 정답 값
- y (supervision for VQA): 환경에 대한 질문에 대한 실제 정답 텍스트
- Fθ (Unified Predictor): 시각(v), 언어(x), 그리고 생각(c)을 모두 고려하여 로봇이 이동할 경로를 계산
- Hθ (Embodied-aware VQA Head): 시각(v), 언어(x)를 고려하여 환경을 계산
- λ: 행동 학습과 VQA 학습 사이의 균형을 맞추는 하이퍼파라미터

여기서 c (optional Chain-of-Thought)는 별도의 모듈에서 생성되는 것이 아니라, 단일 엔드투엔드(end-to-end) 모델의 언어 생성 헤드에서 토큰 형태로 출력됩니다. 이 토큰들은 단순한 물리적 수치가 아닌 언어적 추론 과정과 하위 작업 계획을 포함하고 있어, 모델이 복잡한 작업을 수행할 때 자신의 행동 방향을 스스로 구조화하게 만듭니다.

또한 해당 논문은 Path-drop objective 전략을 통해 학습 시 모델에게 때로는 c를 제공하고, 때로는 c 없이 행동하도록 유도합니다. 이를 통해 모델은 추론(inference) 단계에서 작업의 복잡도나 문맥적 요구에 따라 중간 추론 단계를 거칠지 아니면 즉각적으로 행동할지를 적응적으로 결정하는 유연성을 갖게 됩니다.

![Uni-CoT objectives](https://static.wikidocs.net/images/page/366377/gh_53ea6e1f1fd7.png)

- 행동 예측 손실(lact): 모델이 예측한 로봇의 움직임이 실제 정답 궤적(a1:T)과 얼마나 다른지 측정합니다. 입력값에 c (사고 과정)가 포함되어 있으며, 이는 모델이 단순히 명령에 따라 움직이는 것이 아니라 중간 추론 과정을 거쳐 더 정교하게 행동할 수 있도록 설계되었음을 의미합니다.
- Embodied VQA 손실(lVQA): 로봇이 현재 보고 있는 환경(v)과 명령(x)에 대해 얼마나 잘 이해하고 있는지를 측정합니다. 모델이 물리적인 행동뿐만 아니라 공간적, 상태적 맥락을 정확히 파악하도록 설계되었습니다.

결론적으로 Uni-CoT의 통합 목적 함수는 환경에 대한 고수준의 언어적 이해(lVQA)와 저수준의 정밀한 물리 동작(lact)을 단일 모델 내에서 동시에 최적화하는 역할을 합니다. 이를 통해 모델은 인지와 행동을 별개의 모듈로 분리하지 않고 모든 과정을 미분 가능한 형태로 연결함으로써, 작업의 난이도에 따라 사고 과정(c)을 유연하게 활용하거나 생략하는 적응적 제어 능력을 갖추게 됩니다.

특히 물리적 실체가 없는 기존 시각-언어 모델(VLM)들이 환경과의 상호작용을 통한 피드백을 생성하거나 수용하지 못하는 한계를 극복했다는 점이 중요합니다. WALL-OSS는 추론과 실행을 병렬적으로 처리하여, 자신의 행동이 물리적 환경에 미친 영향을 시각 데이터(v)로 즉각 다시 확인하는 능동적 피드백 루프를 구축합니다. 만약 작업 중 오류가 발생하더라도 모델은 Embodied VQA 능력을 통해 현재 상태를 재인식하고, 사고 사슬(c)을 수정하여 행동 궤적(a1:T)을 실시간으로 보정할 수 있습니다.

### 3. 데이터 전략

훈련에 사용되는 데이터셋은 다음 세 가지 요소로 구성됩니다.

![WALL-OSS data strategy](https://static.wikidocs.net/images/page/366377/gh_f3d34076b0a1.png)

#### 3-1. 자체 수집 로봇 행동 데이터

가장 고품질로, 인간이 실제 로봇을 제어하여 자체 수집한 데이터셋입니다. 주방 청소, 옷 정리/정돈, 모바일 집기 및 배치, 조립 작업 등을 포함하고 있으며 정밀도와 일반화를 강조하는 short-horizon 형식과 과정이 복잡하여 단계별로 추론 과정이 필요한 long-horizon 형식의 두 가지 범주로 나뉘어집니다. 또한 사고 과정(CoT) 학습에 적합한 형태로 만들기 위하여 사람이 직접 검수하고 각 동작 단계에 대한 세밀한 주석을 붙이는 과정도 포함됩니다.

#### 3-2. 오픈 소스 행동 데이터

DROID, BC-Z, BRIDGE 등의 오픈 소스 데이터셋입니다. 다만 이 데이터셋들은 각 사용한 로봇의 형태와 좌표계 및 단위가 다르기에, 이를 정규화하고 재샘플링하는 과정을 통해 안정성을 높이는 방식으로 통합하여 사용됩니다.

#### 3-3. 멀티모달 VQA 데이터

언어-시각 능력을 보존하고 강화하며 공간-시간 및 추론을 위한 데이터셋으로, 로봇의 일반화 성능 향상과 과적합 방지 기능을 수행합니다. 논문에서는 이를 General VQA와 Embodied VQA 두 가지 스트림으로 나누어 설명하고 있습니다.

##### 1. VLM 유지를 위한 General VQA data

![General VQA data](https://static.wikidocs.net/images/page/366377/gh_7e2c2c25e13d.png)

일반 VQA 데이터는 행동 헤드를 직접 최적화하기보다, VLM이 기존에 보유한 뛰어난 인지 능력을 보존하는 역할을 수행합니다. 전체 데이터셋 규모가 10,000시간을 초과하기 때문에 행동 데이터에만 치우쳐 학습할 경우, VLM의 원래 강점인 언어 이해 및 상호작용 능력(VL Prior)이 훼손되는 가중치 표류(weight drift) 현상이 발생할 수 있습니다. 이를 방지하기 위해 행동 데이터 학습 시 VQA 데이터를 일정한 비율로 섞어 학습함으로써, 기존의 시각-언어 백본 지식을 견고하게 유지합니다.

##### 2. 공간-시간 및 추론을 위한 Embodied VQA data

![Embodied VQA data](https://static.wikidocs.net/images/page/366377/gh_4ae70b516d00.png)

앞서 1단계 Inspiration Stage에서 설명했듯이, Embodied VQA는 모델에게 공간 지능과 추론 능력을 심어주는 핵심 요소입니다. 2D 좌표 형식의 정답 데이터는 텍스트로 된 명령을 이미지상의 구체적인 픽셀 위치와 연결하는 역할을 하며, 다음과 같은 세부 규격과 목적을 가집니다.

- 

객체 영역 지정을 위한 <box> 태그
 형식: [x1, y1, x2, y2]
 대상 객체의 bounding box를 나타냅니다. 보통 이미지 좌상단 (x1, y1)과 우하단 (x2, y2) 좌표를 포함하여 물체가 차지하는 전체 영역을 정의합니다. 이를 통해 모델이 사물의 시각적 경계를 정확히 파악하도록 훈련됩니다.

- 

정밀 지점 지정을 위한 <point> 태그
 형식: [x, y]
 객체의 중심점이나 로봇 팔이 직접 상호작용해야 할 특정 파지점 등 이미지 내의 단일 픽셀 좌표를 나타냅니다. 여러 물체가 겹쳐 있거나 정밀한 조작이 필요한 상황에서, 모델이 정확히 어디를 겨냥해야 하는지에 대한 물리적 직관을 갖게 합니다. 이렇게 훈련 단계에서 다양한 객체에 대해 <box>와 <point>를 학습한 모델은 처음 보는 물체에 대해서도 대응할 수 있는 일반화 능력을 얻습니다.

이러한 정교한 좌표 기반 정답 데이터 y는 수식의 lVQA 항을 통해 학습되며, 추상적인 단어를 구체적인 수치 좌표와 연결함으로써 모델이 시각적 이해를 넘어 실제 행동으로 옮길 수 있는 지능적 기반을 마련하게 됩니다. 또한 학습된 좌표 정보는 사고 사슬(c)을 생성할 때 단순한 텍스트를 넘어 먼저 [x, y] 위치의 물체를 집는다는 식의 하위 작업 계획 수립을 가능하게 합니다.

## Ⅳ. 결과

### 실험 결과

평가 결과는 크게 세 가지 핵심 차원으로 요약할 수 있습니다.

- 단일 지시 작업(Single-instruction): 모델의 기본적인 동작 정확도와 처음 보는 사물에 대한 적응력을 평가
- 장기 작업(Long-horizon): 5단계 이상의 순차적 실행이 필요한 복잡한 작업을 평가
- 추론 집약적 작업(Reasoning): 물리적 조작 전에 고도의 논리적 추론이 선행되어야 하는 과제를 평가

비교 대상은 Diffusion Policy, Pi-0였습니다.

기존의 모델들은 WALL-OSS와 달리 중간 단계에 대한 설명이 필요하기에, 사람이 미리 나눠놓은 하위 작업(subtask) 리스트를 GPT-4가 실시간으로 로봇에게 하나씩 알려주는 방식으로 비교하였습니다.

#### 1. 전반적 성능

![Overall performance](https://static.wikidocs.net/images/page/366377/gh_430e7138fe52.png)

전반적으로 모든 task에 대해서 더 뛰어난 성능을 보여줍니다. 특히 오른쪽 그래프에서 훈련 시 보지 못한 새로운 물체에 대해 전부 61% 이상의 작업 진척도를 달성했습니다. 이는 WALL-OSS의 일반화 능력을 보여주는 것으로, 앞서 General VQA를 통해 VLM 백본이 가진 고유한 추론 능력이 훼손되지 않고 실제 로봇 행동으로 잘 전이되었음을 의미합니다.

#### 2. 장기 작업과 추론 집약적 작업

![Single-instruction result](https://static.wikidocs.net/images/page/366377/gh_08cd905913a2.png)

![Long-horizon and reasoning result](https://static.wikidocs.net/images/page/366377/gh_179aa2bdedfb.png)

상대적으로 간단하게 수행될 수 있는 단일 지시 작업(Collect-Waste, Pick-Place-Cup, Place-by-color)에서는 WALL-OSS뿐만 아니라 Pi-0도 뛰어난 성능을 보였음을 알 수 있습니다. 하지만 장기 작업(Tidy-Bedroom), 그리고 추론 집약적 작업(Block-Spell)과 같은 고수준의 논리적 판단이 필요하며 5분 이상의 매우 긴 동작에서 subtask를 나누어 지시하지 않았음에도 WALL-OSS는 타 모델과 비교하여 월등히 높은 성능을 보여주었습니다. 이는 단순히 움직임만 배운 게 아니라 Uni-CoT를 통해 현재 어느 단계인지 파악하고 작업을 이어갈 수 있는 지능을 갖추었음을 의미합니다.

## Ⅴ. 한계점

### WALL-OSS의 한계

WALL-OSS 모델은 2D 공간 접지(grounding)와 대규모 사전학습을 통해 개방형 환경에서의 일반화 및 지시 이행 능력을 크게 향상시켰으나, 정밀한 제어와 물리적 한계 극복을 위해 여전히 숙제를 남겨두고 있습니다.

- WALL-OSS 모델은 2D 지시 정렬과 대규모 사전학습을 통해 개방형 환경에서의 일반화 및 지시 이행 능력을 크게 향상시켰습니다. 그러나 고수준의 의미론적 이해가 아닌, 미세하고 정밀한 물리적 조작 제어 관점에서는 한계를 보입니다.
- 현재 로봇 학습 분야에서 정렬된 3D 데이터 자체가 여전히 극도로 희소하다는 근본적인 데이터셋 한계가 존재합니다. 현재 이용 가능한 오픈소스 기반의 3D 비전 파운데이션 모델들 역시 실제 로봇이 정교한 행동을 예측하고 실행하는 데 필요한 공간적 정확도를 완벽히 충족하지 못하는 상황입니다.
- WALL-OSS는 Uni-CoT 아키텍처와 동적인 하위 작업(subtask) 계획 생성을 도입하여 다단계 작업의 안정성과 성공률을 크게 개선했습니다. 하지만 이러한 계획성 학습은 전체 훈련 프레임 중 단 1% 수준에 불과한 극소수의 CoT 및 하위 작업 감독 신호에 의존하여 공동 훈련된 결과로, 이로 인해 실제 실행 시간이 3분에서 5분을 초과하고 공간적 복잡도가 높은 task에서는 여전히 한계를 보여줍니다.

## Ⅵ. 정리

### WALL-OSS 정리

WALL-OSS는 기존 비구체화된(disembodied) VLM의 물리적 단절과 VLA 모델의 가중치 편향(weight drift) 문제를 MoE 구조와 단계별 학습 전략으로 해결한 혁신적인 프레임워크입니다. QwenVL2.5-3B를 백본으로 삼아 지식 처리와 행동 생성을 분리하는 MoE 아키텍처를 구축하고, 대략적인 행동 감각을 심는 영감(Inspiration) 단계와 연속적 궤적을 만드는 통합(Integration) 단계를 거쳐 지능과 행동을 긴밀하게 결합했습니다.

특히 인지와 행동을 단일 모델 내에서 미분 가능한 형태로 연결한 Uni-CoT(Unified Cross-Level Chain-of-Thought) 기술을 도입하여, 고차원적 지시부터 사고 과정, 하위 목표 계획, 저차원적 연속 행동까지 유연하게 전환하는 적응적 제어 능력을 완성했습니다. 또한 10,000시간이 넘는 대규모 데이터 전략 속에서 General VQA와 좌표 기반의 Embodied VQA 스트림을 교차 활용하여 백본 고유의 지식을 보존하는 동시에 강력한 시공간적 추론 능력을 모델에 주입했습니다.

그 결과 훈련 과정에서 보지 못한 새로운 물체에 대해서도 61% 이상의 뛰어난 제로샷 작업 진척도를 달성했고, 복잡한 장기 작업과 고수준의 논리적 판단을 요구하는 task에서도 기존 모델들보다 더 나은 성과를 거두었습니다. 비록 정밀한 제어력 확보와 희소한 3D 공간 데이터의 제약 극복이라는 숙제가 남아 있으나, WALL-OSS는 인지와 행동을 단일 맥락에서 융합함으로써 실제 물리 공간에서 스스로를 보정하고 실행하는 차세대 체화 지능(embodied AI)의 새로운 표준을 제시하고 있습니다.

## 참고문헌

- Andy Zhai et al. Igniting VLMs toward the Embodied Space. arXiv, 2025. [https://arxiv.org/abs/2509.11766](https://arxiv.org/abs/2509.11766)
- X-Square-Robot. wall-x. GitHub Repository. [https://github.com/X-Square-Robot/wall-x](https://github.com/X-Square-Robot/wall-x)
