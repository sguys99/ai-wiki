---
title: "🤖 [실리콘밸리 RFM 기술 및 현황] 2편 VLM & VLA란 무엇이며, 어떤 구조로 변화해 왔는가"
type: article
year: 2026
category: physical-ai
raw_path: raw/articles/kim-2026-silicon-valley-rfm-part-2.md
raw_filename: "kim-2026-silicon-valley-rfm-part-2.md"
source_collection: external
author: "Kyungyul Kim, Jiyoon Kim"
url: "https://www.linkedin.com/pulse/%EC%8B%A4%EB%A6%AC%EC%BD%98%EB%B0%B8%EB%A6%AC-rfm-%EA%B8%B0%EC%88%A0-%EB%B0%8F-%ED%98%84%ED%99%A9-2%ED%8E%B8-vlm-vla%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%B4%EB%A9%B0-%EC%96%B4%EB%96%A4-%EA%B5%AC%EC%A1%B0%EB%A1%9C-%EB%B3%80%ED%99%94%ED%95%B4-%EC%99%94%EB%8A%94%EA%B0%80-kyungyul-kim-gb1we/"
publisher: "LinkedIn"
tags: [physical-ai, vla, robot-learning]
figures:
  - id: fig01
    file: assets/kim-2026-silicon-valley-rfm-part-2/page-full.png
    raw: raw/articles/kim-2026-silicon-valley-rfm-part-2-figures/page-full.png
    caption: "기사 전체 페이지 스크린샷 (아카이브용, 도입부만 렌더)"
    strategy: screenshot
    curated: false
  - id: fig02
    file: assets/kim-2026-silicon-valley-rfm-part-2/crop01.png
    raw: raw/articles/kim-2026-silicon-valley-rfm-part-2-figures/crop01.png
    caption: "커버 이미지 영역 크롭 — LinkedIn 로그인 모달에 가려져 임베드 부적합"
    strategy: crop
    curated: false
---

## 한 줄 요약 (One-line Summary)

VLM에서 VLA로 이어지는 개념을 LLM의 다음 토큰 예측 원리에 빗대어 푼다. RT-2·OpenVLA의 Single Model 구조가 왜 Dual System(VLM + Diffusion Transformer/Flow Matching)으로 갈라져 왔는지를 실리콘밸리 RFM 스타트업의 학습 전략과 엮어 정리한 연재 2편이다.

## 1. 자료 정보 (Document Information)

- 저자: Kyungyul Kim, Jiyoon Kim
- 발행: 2026-08-07, LinkedIn Pulse (한국어)
- 유형: 업계 동향 분석 연재의 2편, 약 18,500자. 1편의 서론 격 분량을 넘어 기술 개념 설명이 본격적으로 시작되는 편이다.
- 전편: 1편 "RFM의 등장 배경과 실리콘밸리의 Robot Intelligence 스타트업의 현황" — [[kim-2026-silicon-valley-rfm-part-1]]

## 2. 주요 기여 (Key Contributions)

- VLM/VLA 개념을 LLM이 다음 단어를 예측하는 원리에서 출발해 설명한다. 로봇의 연속 동작값을 256개 구간으로 나눠 정수로 바꾸고 이 숫자를 언어 모델 단어장에 새 "단어"로 등록해 버리는 것이 VLA의 핵심 트릭이라는 프레이밍을 편다.
- VLA가 다루는 세 modality(Vision·Language·Action)를 "본다 → 이해하고 추론한다 → 행동한다" 3단계로 풀어 설명한다. RT-2류에서 보고된 emergent capability(상식 추론·논리 추론·단계적 추론)를 예시로 붙인다. 다만 이 능력은 대부분 제한된 실험 환경에서 확인된 것이며 실제 산업 환경에서 같은 수준의 일반화가 이뤄지는지는 별개 문제라는 유보를 분명히 단다.
- VLA의 두 대표 구조를 가른다. RT-2(2023, Google DeepMind)·OpenVLA(2024, Stanford)로 대표되는 Single Model은 Vision·Text·Action 세 종류의 토큰을 하나의 LLM sequence로 이어 붙여 한 모델이 전부 처리한다. Physical Intelligence·Figure·NVIDIA 등 이후 대부분의 기업이 쓰는 Dual System은 VLM이 이해·계획·추론만 담당하는 System 2와, Diffusion Transformer(DiT)+Flow Matching이 실제 동작 생성을 담당하는 System 1로 역할을 나눈다.
- Single Model의 한계를 지적한다. LLM 특성상 동작 토큰도 한 개씩 순차 생성하다 보니 빨래 개기·에스프레소 머신 조작처럼 정교하고 빠른 연속 동작을 표현하기 어렵다.
- Dual System을 사람 뇌의 전두엽/소뇌 비유로 설명한다. System 1의 DiT에 들어가는 세 입력, 곧 System 2가 만든 VLM embedding, Robot State(현재 관절 상태), Noised Action(무작위 노이즈 동작)의 역할도 나눈다. Robot State가 System 2(VLM)에는 들어가지 않는 이유도 설명한다. VLM은 "무엇을 해야 하는지"를 판단하는 고차원 사고를 담당할 뿐 관절 각도 같은 저수준 수치를 계산하는 곳이 아니다.
- Diffusion Transformer와 Flow Matching을 쓰는 이유를 계보로 정리한다. DDPM(Ho et al., 2020)은 고품질 생성에 50~1000 step의 반복 denoising이 필요해 실시간 로봇 제어에는 부담이었다. Flow Matching(Lipman et al., Meta AI, 2022)이 같은 품질을 5~10 step으로 줄여 속도 문제를 풀었다. "Diffusion/Flow Matching이 Reasoning을 가능하게 한다"는 흔한 오해도 반박한다. 이건 로봇 동작이라는 연속값을 생성하는 도구일 뿐, 추론 능력 자체는 VLM(System 2) 쪽에서 온다.
- 실리콘밸리 RFM 스타트업들의 학습 전략을 다시 짚는다. VLM·LLM은 오픈소스를 가져와 고정(freeze)해 두고 로봇 데이터로 fine-tuning하는 영역에만 집중한다. Big-tech(Google DeepMind·Tesla·NVIDIA)는 VLM·LLM까지 직접 만든 모델을 쓴다. 이렇게 대비해 보면 1편에서 말한 "학습 전 과정을 직접 수행"이 구체적으로 어느 지점을 가리키는지 분명해진다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

Section 1은 개념을 세운다. LLM이 인터넷 텍스트에서 "어떤 단어 다음에 어떤 단어가 올 확률이 높은지"를 학습했듯, VLM은 텍스트와 이미지를 함께 학습해 "컵은 잡을 수 있다" 같은 시각-언어 상식을 갖춘 모델이다. VLA는 여기에 로봇의 동작(관절 움직임 등)까지 숫자로 이산화해 "다음 단어"처럼 예측하도록 확장한 모델이다.

Section 2는 VLA 구조가 왜, 어떻게 갈라졌는지를 다룬다.

**Single Model** (RT-2·OpenVLA)은 세 가지 입력을 전부 토큰으로 바꿔 하나의 LLM에 넣는다.

- Vision Tokens — 이미지를 Vision Encoder로 토큰화한다. OpenVLA 기준 두 인코더를 나란히 쓴다. "이게 뭔지" 파악하는 SigLIP(Google, semantic)과 "이게 어디 있는지" 파악하는 DINO(Meta, spatial)다.
- Text Tokens — 사람의 명령을 Text Tokenizer로 토큰화한다. ChatGPT/Gemini/Claude에 질문을 넣을 때와 같은 과정이다.
- Action Tokens — 로봇 동작의 연속값을 256개 구간으로 나눠 정수로 바꾼 뒤, 언어 모델의 기존 단어장에 새 "단어"로 등록한다. 등록되고 나면 LLM 입장에서 동작 토큰 "82"는 "apple"과 다를 바 없는 하나의 단어다.

세 토큰이 하나의 sequence로 이어져 LLM(LLaMA·GPT·Qwen 계열)에 들어가고 Self-Attention으로 서로 관계를 맺으며 Action Token을 한 개씩 순차 생성한다. 생성된 토큰은 Action Head가 실제 물리량(예: "82" → 0.320cm)으로 변환해 로봇 SDK에 넘긴다.

**Dual System**은 이 순차 생성 방식이 정교한 동작을 만들기 어렵다는 한계에서 나왔다. 사람의 전두엽(느리지만 깊은 사고)과 소뇌(빠르고 정밀한 운동)가 협업하듯, System 2(VLM)가 이미지와 명령을 이해·계획·추론하고 System 1(Diffusion Transformer)이 실제 관절 동작을 생성한다.

- System 2 — Vision Encoder가 LLM에 통합된 VLM을 쓴다. 이미지를 보고 명령을 파악해 계획을 세우는 데까지만 담당하고 압축된 정보(embedding)를 System 1로 넘긴다. Single Model처럼 LLM에게 로봇 동작까지 생성하라고 하면 원래의 언어 능력이 손상되는 catastrophic forgetting이 나타난다. Dual System은 VLM의 역할을 이해·추론까지로 한정해 이를 피한다.
- System 1 — DiT가 세 입력(System 2의 VLM embedding, Robot State, Noised Action)을 받아 반복적으로 노이즈를 걷어내며 실제 로봇 동작을 생성한다. Robot State는 학습 단계에서 teleoperation으로 수집한 시연 데이터에 이미지·명령·동작과 함께 기록된다.

Diffusion 기반 생성의 기본 원리는 DDPM(Ho et al., 2020)에서 정립됐지만 50~1000 step이 필요해 실시간 로봇 제어에는 느렸다. Flow Matching(Lipman et al., 2022)이 같은 품질을 5~10 step으로 줄여 이 속도 문제를 풀었다. 이후 OpenAI·Google·Stability AI 등 이미지·비디오 생성 진영에서도 널리 쓰이는 조합이 VLA의 System 1에도 그대로 들어왔다.

마지막으로 이 구조 안에서 실리콘밸리 RFM 스타트업들이 실제로 무엇을 학습하는지 살펴본다. VLA 구조도에서 "학습 가능 영역"으로 표시되는 부분은, Big-tech가 이미 최적화해 공개한 VLM·LLM을 그대로 가져와 고정해 두고 로봇 데이터로 fine-tuning하는 영역이다. 오픈소스를 잘못 건드리면 원래 능력을 잃는 catastrophic forgetting 위험이 있어서다. 반면 Google DeepMind·Tesla·NVIDIA는 VLM·LLM 자체를 직접 구축할 자원을 갖고 있다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

정량 벤치마크는 없다. 개념과 구조를 설명하는 글이라 수치 대신 프레이밍이 핵심 산출물이다.

- VLA의 핵심 트릭은 로봇의 연속 동작값을 이산 토큰으로 바꿔 LLM의 "다음 단어 예측"과 동일한 메커니즘으로 다루는 데 있다.
- VLA 구조는 Single Model(RT-2·OpenVLA, 2023~2024)에서 Dual System(Physical Intelligence·Figure·NVIDIA 등, 이후)으로 옮겨왔다. 그 동인은 동작의 정교함·속도 문제다.
- Diffusion Transformer·Flow Matching은 추론 능력의 원천이 아니라 연속값을 실시간에 가깝게 생성하기 위한 도구라는 점을 저자들은 명시적으로 강조한다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- RT-2류 emergent capability 예시(건강한 간식 고르기, 제곱근 계산 등)는 원 논문에서 보고된 실험 구성을 재인용한 것이라 저자 자신의 검증은 아니다. 글도 이를 "제한된 실험 환경"이라는 유보로 감싼다.
- Dual System의 구체적 모델명을 명시하지 않는다. "Physical Intelligence, Figure, NVIDIA 등 대부분의 기업들"로만 언급해 개별 아키텍처 차이는 이 글만으로는 알 수 없다. wiki가 보유한 [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation|GR00T N1]]이 Eagle-2 VLM(System 2)+flow-matching DiT(System 1) 조합의 구체 사례라 이 빈틈을 메운다.
- 3편 예고가 이 글 안에서는 확인되지 않는다. 후속 편 발행 여부는 별도 확인이 필요하다.

## 6. 관련 연구 (Related Work)

- [[physical-ai/brohan-2023-rt-2-vision-language-action-models-transfer-web|RT-2]] — 이 글이 Single Model 구조의 원형으로 직접 인용하는 논문. Vision·Text·Action을 하나의 LLM sequence로 처리하는 방식의 출발점.
- [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation|GR00T N1]] — 이 글이 설명하는 Dual System(System 2 VLM + System 1 DiT)의 구체적 실제 사례. Eagle-2 VLM(10Hz)과 flow-matching DiT(120Hz)를 cross-attention으로 잇는 구조가 이 글의 서술과 정확히 대응한다.
- [[physical-ai/sa-2026-vision-language-action-models-for|VLA for Bimanual Manipulation (Survey)]] — action head를 autoregressive·flow·diffusion·hybrid 4계열로 분류한 기술 서베이. 이 글의 Single Model(autoregressive 계열)·Dual System(flow/diffusion 계열) 구분과 직접 맞물린다.
- [[physical-ai/brohan-2022-rt-1-robotics-transformer-for-real-world|RT-1]] — 이 글이 설명하는 256-bin 이산 action tokenization 기법의 원조.
- [[physical-ai/kim-2026-silicon-valley-rfm-part-1|실리콘밸리 RFM 기술 및 현황 1편]] — RFM 스타트업이 오픈소스 VLM/LLM을 고정해 두고 로봇 데이터로만 학습하는 전략을 사업 구조 쪽에서 설명한 전편. 이 글의 Section 2-3(학습 가능 영역)이 그 기술적 근거를 채운다.

OpenVLA(Kim et al., Stanford, 2024) 논문은 이 글이 Single Model의 오픈소스 구현체로 직접 언급하지만 wiki에는 아직 원본이 없다. ingest 후보다.

## 7. 용어집 (Glossary)

- **VLM (Vision Language Model)**: 인터넷의 이미지-텍스트 쌍을 함께 학습해 시각-언어 상식을 갖춘 모델.
- **VLA (Vision Language Action)**: VLM을 확장해 로봇의 카메라 이미지·언어 명령을 입력받아 물리적 동작을 직접 출력하는 end-to-end 모델.
- **Single Model**: Vision·Text·Action 토큰을 하나의 LLM sequence로 이어 붙여 한 모델이 전부 처리하는 VLA 구조 (RT-2·OpenVLA).
- **Dual System**: 이해·추론을 담당하는 System 2(VLM)와 동작 생성을 담당하는 System 1(Diffusion Transformer)로 역할을 분리한 VLA 구조.
- **Action Token**: 로봇의 연속 동작값을 256개 구간으로 나눠 정수로 이산화한 뒤 언어 모델 단어장에 새 단어로 등록한 토큰.
- **Robot State**: 로봇 관절 각도·end-effector 개폐 상태 등 현재 물리 상태 값. teleoperation 시연 데이터에 이미지·명령·동작과 함께 기록되며 System 1에만 입력된다.
- **Diffusion Transformer (DiT)**: Diffusion 기반 생성을 Transformer 구조로 구현한 모듈. VLA의 System 1에서 노이즈 섞인 동작을 반복적으로 걷어내 실제 로봇 동작을 생성한다.
- **Flow Matching**: DDPM류 Diffusion의 50~1000 step 반복을 5~10 step으로 줄여 실시간성을 확보한 생성 기법 (Lipman et al., 2022).
- **catastrophic forgetting**: 오픈소스 VLM/LLM을 잘못 fine-tuning했을 때 원래 갖고 있던 언어·시각 능력이 손상되는 현상.

## 8. 그림 후보 (Figure Candidates)

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | 기사 전체 페이지 스크린샷 (도입부만 렌더) | screenshot | (아카이브 전용) |
| fig02 | 커버 이미지 영역 크롭 — 로그인 모달에 가려짐 | crop | 부적합 |

본문에는 "VLA Single Model 아키텍처 구조도"와 "VLA Dual System 아키텍처 구조도" 두 도식이 언급되지만 익명 세션이 LinkedIn 로그인 월에 막혀 커버 이미지 이후 콘텐츠를 렌더하지 못했다(1편과 동일한 제약). 두 도식 모두 캡처되지 않아 wiki에 임베드할 후보가 없다. 필요하면 로그인 세션(`--profile`)으로 재수집하거나 사용자가 스크린샷을 수동 저장해야 한다.
