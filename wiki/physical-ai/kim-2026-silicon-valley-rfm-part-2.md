---
title: "🤖 [실리콘밸리 RFM 기술 및 현황] 2편 VLM & VLA란 무엇이며, 어떤 구조로 변화해 왔는가"
type: article
year: 2026
category: physical-ai
source: kim-2026-silicon-valley-rfm-part-2.md
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

## 요약 (Summary)

VLM에서 VLA로 이어지는 개념을 LLM의 다음 토큰 예측 원리에 빗대어 풀고 VLA의 두 대표 구조가 왜 갈라져 왔는지를 정리한 LinkedIn 연재 2편이다(Kyungyul Kim·Jiyoon Kim, 2026-08-07). [[physical-ai/kim-2026-silicon-valley-rfm-part-1|1편]]이 실리콘밸리 RFM 스타트업의 사업 구조를 다뤘다면 이 글은 그 구조를 뒷받침하는 기술 개념 설명으로 들어간다. 이 저장소가 보유한 RT-2·GR00T N1 같은 원 논문을 개념적으로 잇는 다리 역할을 한다.

## VLA 개념

LLM은 인터넷 텍스트에서 "어떤 단어 다음에 어떤 단어가 올 확률이 높은지"를 학습해 문장을 만든다. VLM(Vision Language Model)은 여기에 이미지를 더해 "컵은 잡을 수 있다" 같은 시각-언어 상식까지 갖춘 모델이다. VLA(Vision Language Action)는 로봇의 연속 동작값을 256개 구간으로 나눠 정수로 바꾸고 이 숫자를 언어 모델 단어장에 새 "단어"로 등록해 로봇 동작까지 "다음 단어"처럼 예측하도록 확장한 모델이다.

VLA가 다루는 세 modality는 Vision(로봇이 보는 것)·Language(사람의 명령과 추론)·Action(로봇이 실제로 하는 것)이다. "본다 → 이해하고 추론한다 → 행동한다" 3단계로 풀리며 RT-2류에서 보고된 emergent capability(상식 추론·논리 추론·단계적 추론)가 예시로 붙는다. 이 능력은 대부분 제한된 실험 환경에서 확인됐다. 실제 산업 환경에서 같은 수준으로 일반화되는지는 별개 문제라는 유보가 분명히 달려 있다.

## Single Model 구조 (RT-2·OpenVLA)

[[physical-ai/brohan-2023-rt-2-vision-language-action-models-transfer-web|RT-2]](2023, Google DeepMind)와 OpenVLA(2024, Stanford)로 대표되는 구조다. Vision·Text·Action 세 종류의 입력을 전부 토큰으로 바꿔 하나의 LLM에 넣는다.

- Vision Tokens: OpenVLA 기준 두 인코더를 나란히 쓴다. "이게 뭔지" 파악하는 SigLIP(Google, semantic)과 "이게 어디 있는지" 파악하는 DINO(Meta, spatial)다.
- Text Tokens: 사람의 명령을 일반 LLM과 동일한 방식으로 토큰화한다.
- Action Tokens: 로봇 동작의 연속값을 256개 구간으로 나눠 정수로 바꾼 뒤 언어 모델 단어장에 새 "단어"로 등록한다. 등록되고 나면 LLM 입장에서 동작 토큰 "82"는 "apple"과 다를 바 없는 하나의 단어다. [[physical-ai/brohan-2022-rt-1-robotics-transformer-for-real-world|RT-1]]이 확립한 256-bin 이산화 기법을 그대로 물려받았다.

세 토큰이 하나의 sequence로 이어져 LLM(LLaMA·GPT·Qwen 계열)에 들어가고 Self-Attention으로 서로 관계를 맺으며 Action Token을 한 개씩 순차 생성한다. Action Head가 생성된 토큰을 실제 물리량(예: "82" → 0.320cm)으로 변환해 로봇 SDK에 넘긴다.

이 구조의 한계는 속도와 정교함이다. 동작 토큰도 한 개씩 순차 생성하다 보니 빨래 개기·에스프레소 머신 조작처럼 정교하고 빠른 연속 동작을 표현하기 어렵다.

## Dual System 구조

Physical Intelligence·Figure·NVIDIA 등 이후 대부분의 기업이 택한 구조다. 사람의 전두엽(느리지만 깊은 사고)과 소뇌(빠르고 정밀한 운동)가 협업하듯 이해·추론을 담당하는 System 2와 동작 생성을 담당하는 System 1로 역할을 나눈다.

**System 2**는 Vision Encoder가 통합된 VLM이다. 이미지를 보고 명령을 파악해 계획을 세우는 데까지만 담당하고 압축된 정보(embedding)를 System 1로 넘긴다. Single Model처럼 LLM에게 로봇 동작까지 생성하라고 하면 원래의 언어 능력이 손상되는 catastrophic forgetting이 나타난다. System 2는 역할을 이해·추론까지로 한정해 이를 피한다.

**System 1**은 Diffusion Transformer(DiT)가 세 입력, 곧 System 2의 VLM embedding·Robot State(현재 관절 상태)·Noised Action(무작위 노이즈 동작)을 받아 반복적으로 노이즈를 걷어내며 실제 로봇 동작을 생성한다. Robot State가 System 2에는 들어가지 않는다. VLM은 "무엇을 해야 하는지"를 판단하는 고차원 사고를 담당할 뿐 관절 각도 같은 저수준 수치를 계산하는 곳이 아니기 때문이다. Robot State는 학습 단계에서 teleoperation으로 수집한 시연 데이터에 이미지·명령·동작과 함께 기록된다.

이 구조가 [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation|GR00T N1]]에서 그대로 확인된다. Eagle-2 VLM(System 2, 10Hz)과 flow-matching DiT(System 1, 120Hz)를 cross-attention으로 잇는 구조가 이 글이 설명하는 Dual System과 정확히 대응한다.

## Diffusion Transformer와 Flow Matching

Diffusion 기반 생성의 기본 원리는 DDPM(Ho et al., 2020)에서 정립됐지만 고품질 생성에 50~1000 step의 반복 denoising이 필요해 실시간 로봇 제어에는 부담이었다. Flow Matching(Lipman et al., Meta AI, 2022)이 같은 품질을 5~10 step으로 줄여 이 속도 문제를 풀었다. 이후 OpenAI·Google·Stability AI 등 이미지·비디오 생성 진영에서도 널리 쓰이는 이 조합이 VLA의 System 1에도 그대로 들어왔다.

글은 "Diffusion/Flow Matching이 Reasoning을 가능하게 한다"는 흔한 오해를 정면으로 반박한다. 이건 로봇 동작이라는 연속값을 실시간에 가깝게 생성하기 위한 도구일 뿐이고 추론 능력 자체는 System 2인 VLM 쪽에서 온다.

## 실리콘밸리 RFM 스타트업의 학습 전략

이 구조 안에서 실리콘밸리 RFM 스타트업들이 실제로 무엇을 학습하는지가 이 글의 결론이다. VLA 구조도에서 "학습 가능 영역"으로 표시되는 부분은, Big-tech가 이미 최적화해 공개한 VLM·LLM을 그대로 가져와 고정(freeze)해 두고 로봇 데이터로 fine-tuning하는 영역이다. 오픈소스를 잘못 건드리면 원래 능력을 잃는 catastrophic forgetting 위험이 있어서다. 반면 Google DeepMind·Tesla·NVIDIA는 VLM·LLM 자체를 직접 구축할 자원이 있다.

이 대비를 보면 [[physical-ai/kim-2026-silicon-valley-rfm-part-1|1편]]에서 말한 "학습 전 과정을 직접 수행"이 구체적으로 어느 지점을 가리키는지 분명해진다. RFM 스타트업이 내재화하는 건 VLM·LLM 자체가 아니라, 그 위에 로봇 데이터로 fine-tuning하는 좁지만 핵심적인 영역이다.

## 이 자료의 쓰임과 한계 (Usage Notes)

RT-2·OpenVLA 논문을 직접 읽기 전 VLA 아키텍처의 큰 그림을 잡는 입문 자료로 쓸모 있다. Vision/Text/Action 토큰화 방식, Single Model과 Dual System의 분기 이유, DiT+Flow Matching의 역할을 한 편에서 개념적으로 훑을 수 있다.

다만 정량 벤치마크가 없는 개념 설명 글이다. RT-2류 emergent capability 예시는 원 논문의 실험 구성을 재인용한 것이라 저자 자신의 검증은 아니다. Dual System의 구체적 모델명도 명시하지 않아 "Physical Intelligence, Figure, NVIDIA 등 대부분의 기업들"로만 언급한다. 이 wiki가 보유한 GR00T N1이 그 빈틈을 구체 사례로 메운다. OpenVLA 논문은 이 글이 직접 언급하지만 wiki에는 아직 원본이 없어 ingest 후보로 남아 있다.

## 관련 페이지 (Related Pages)

- [[physical-ai/kim-2026-silicon-valley-rfm-part-1|실리콘밸리 RFM 기술 및 현황 1편]] — 이 글이 잇는 전편. RFM 스타트업이 오픈소스 VLM/LLM을 고정해 두고 로봇 데이터로만 학습하는 사업 전략을 다룬다. 이 글의 학습 전략 절이 그 기술적 근거를 채운다.
- [[physical-ai/brohan-2023-rt-2-vision-language-action-models-transfer-web|RT-2 (Google DeepMind)]] — Single Model 구조의 원형. Vision·Text·Action을 하나의 LLM sequence로 처리하는 방식의 출발점.
- [[physical-ai/brohan-2022-rt-1-robotics-transformer-for-real-world|RT-1 (Robotics Transformer)]] — 256-bin 이산 action tokenization 기법의 원조.
- [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation|GR00T N1 (NVIDIA)]] — Dual System(System 2 VLM + System 1 DiT)의 구체적 실제 사례. Eagle-2 VLM(10Hz)과 flow-matching DiT(120Hz)를 cross-attention으로 잇는 구조가 이 글의 서술과 정확히 대응한다.
- [[physical-ai/sa-2026-vision-language-action-models-for|VLA for Bimanual Manipulation (Survey)]] — action head를 autoregressive·flow·diffusion·hybrid 4계열로 분류한 기술 서베이. Single Model(autoregressive 계열)·Dual System(flow/diffusion 계열) 구분과 직접 맞물린다.
- [[overviews/physical-ai-overview]] — physical-ai 카테고리 허브
