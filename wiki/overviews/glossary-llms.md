---
title: "용어집 — LLMs (Terminology Glossary)"
type: overview
year: 2026
category: overviews
source_collection: synthesis
glossary_domain: llms
applies_to: [llms, database, evaluations, physical-ai, agents, applications, overviews, etc]
tags: [glossary, terminology, llms, synthesis]
---

## 표기 원칙 (Conventions)

모델 학습·아키텍처 일반 용어의 canonical 표기 SSOT다. 공통 원칙은 [[overviews/glossary-physical-ai]]의 표기 원칙 절과 같다. 이 용어집은 학습 용어가 도메인을 가리지 않고 등장하기 때문에 `applies_to`가 전 카테고리다 — 그만큼 금지 표기는 다른 도메인의 일반 문장을 오탐하지 않는 것만 보수적으로 등재한다.

## 용어 표 (Term Table)

| 원어 | canonical 표기 | 금지 표기 | 첫 등장 풀이 예문 | 비고 |
|---|---|---|---|---|
| pre-training | pre-training | 사전학습·사전 학습·사전훈련 | pre-training은 대규모 일반 데이터로 모델의 기반 능력을 먼저 학습하는 단계다 | 직역 67회 실측 — 원어로 통일 |
| fine-tuning | fine-tuning | 미세조정·미세 조정 | fine-tuning은 pre-training된 모델을 특정 과제 데이터로 더 학습시키는 단계다 | "파인튜닝" 음차는 병용 허용 (지침) |
| co-fine-tuning | co-fine-tuning | — | co-fine-tuning은 로봇 데이터와 웹 데이터를 한 배치에 섞어 함께 fine-tuning하는 레시피다 | RT-2 용어 |
| distillation | distillation | 증류 | distillation은 큰 모델의 출력을 작은 모델이 흉내 내게 학습시키는 압축 기법이다 | |
| quantization | 양자화 | 퀀타이제이션 | 양자화는 가중치를 낮은 비트 수로 줄여 모델을 압축하는 기법이다 | 표준 번역 정착(85회, TurboQuant 계열 포함) |
| attention | attention | 어텐션 | attention은 토큰들이 서로를 얼마나 참조할지 가중치를 계산하는 메커니즘이다 | cross-attention·self-attention도 원어 |
| embedding | 임베딩 | — | 임베딩은 텍스트나 이미지를 고정 차원 벡터로 바꾼 표현이다 | 음차 정착. CLAUDE.md 언어 정책 예시와 일치 |
| token | 토큰 | — | — | 음차 정착 |
| tokenizer | 토크나이저 | — | — | 음차 정착 |
| context window | context window | 문맥 창·맥락 창·컨텍스트 창 | context window는 모델이 한 번에 받아들일 수 있는 토큰 길이 한도다 | |
| parameter | 파라미터 | 매개변수 | — | 음차 정착(95회 vs 매개변수 0회) |
| weight | 가중치 | — | — | 표준 번역 정착 |
| gradient | 그래디언트 | — | — | 음차 정착 |
| loss | 손실 | — | — | "손실 함수" 표준 번역 |
| overfitting | 과적합 | — | — | 표준 번역 정착 |
| scaling law | scaling law | 규모 법칙 | scaling law는 모델·데이터·연산량을 키울 때 성능이 따르는 경험 법칙이다 | "스케일링 법칙" 음차는 병용 허용 (지침) |
| foundation model | foundation model | 기초 모델·파운데이션 모델 | foundation model은 여러 하위 과제의 기반이 되는 대규모 범용 모델이다 | |
| alignment | alignment | 가치 정렬 | LLM 안전 문맥의 alignment는 모델 행동을 인간 의도에 맞추는 문제다 | physical-ai 용어집의 aligned 행과 별개 문맥 |
| RLHF | RLHF | — | RLHF는 인간 선호 피드백으로 모델을 강화학습시키는 정렬 기법이다 | 약어 그대로 |
| unlearning | unlearning | 망각 학습·탈학습 | unlearning은 학습된 모델에서 특정 지식을 제거하는 기법이다 | shumailov-2024 페이지 근거 |
| catastrophic forgetting | catastrophic forgetting | 파국적 망각 | catastrophic forgetting은 새 학습이 기존 능력을 지워버리는 현상이다 | |
| mixture-of-experts | mixture-of-experts | 전문가 혼합 | mixture-of-experts는 입력마다 일부 전문 모듈만 활성화하는 구조다 | 약어 MoE 병용 가능 |
| LoRA | LoRA | — | LoRA는 저랭크 행렬만 학습해 fine-tuning 비용을 줄이는 기법이다 | 약어 그대로 |
| encoder / decoder | 인코더 / 디코더 | — | — | 음차 정착 |
| transformer | Transformer | 트랜스포머 | — | 고유명사 취급, 원어 대문자 |
| benchmark | 벤치마크 | — | — | 음차 정착 |
| sampling | 샘플링 | — | — | 음차 정착 |
| decoding | 디코딩 | — | — | 음차 정착 |
| inference | 추론 | — | — | 표준 번역 정착. reasoning(추론)과 문맥으로 구분 |
| perplexity | perplexity | 혼란도·당혹도 | perplexity는 모델이 다음 토큰을 얼마나 못 맞히는지 재는 지표다 | |
| VLM / VLA | VLM / VLA | — | VLM은 vision-language model, VLA는 vision-language-action model의 약어다 | 약어 그대로 |
| in-context learning | in-context learning | 문맥 내 학습 | in-context learning은 가중치 갱신 없이 프롬프트 안의 예시만으로 과제를 배우는 능력이다 | 약어 ICL 병용 가능 |
| next-token prediction | next-token prediction | — | next-token prediction은 이전 토큰들로 다음 토큰을 맞히는 학습 목표다 | "다음 토큰 예측"은 병용 허용 (지침) |
| MLLM | MLLM | 멀티모달 대형 언어 모델·다중모달 LLM | MLLM은 이미지와 텍스트를 함께 받아 처리하는 대형 언어 모델을 가리킨다 | 약어 그대로. VLM과 거의 같은 뜻이지만 로보틱스 dual-system 문헌은 MLLM 표기를 쓴다 |
| prompt tuning | prompt tuning | 프롬프트 튜닝 | prompt tuning은 모델 파라미터를 전부 얼린 채 어휘에 추가한 토큰의 임베딩만 학습시키는 방식이다 | LoRA와 달리 원래 가중치를 하나도 안 건드린다. dual-system VLA에서 일반화 보존에 유리 (Cui 2025) |

## 신규 용어 추가 절차 (Growth Loop)

[[overviews/glossary-physical-ai]]의 동일 절차를 따른다 — 본문은 원어 + 풀이로 즉시 작성, Step 3.5에서 추가 후보 보고, 승인 후 표에 행 추가.

## 관련 페이지 (Related Pages)

- [[overviews/glossary-physical-ai]] — physical-ai 도메인 용어
- [[overviews/glossary-agents]] — agentic 시스템 용어
