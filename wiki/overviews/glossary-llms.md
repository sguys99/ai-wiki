---
title: "용어집: LLMs (Terminology Glossary)"
type: overview
year: 2026
category: overviews
source_collection: synthesis
glossary_domain: llms
applies_to: [llms, database, evaluations, physical-ai, agents, applications, overviews, etc]
tags: [glossary, terminology, llms, synthesis]
---

## 표기 원칙

모델 학습·아키텍처 일반 용어의 canonical 표기 SSOT다. 공통 원칙은 [[overviews/glossary-physical-ai]]의 표기 원칙 절과 같다. 이 용어집은 학습 용어가 도메인을 가리지 않고 등장하기 때문에 `applies_to`가 전 카테고리다 — 그만큼 금지 표기는 다른 도메인의 일반 문장을 오탐하지 않는 것만 보수적으로 등재한다.

## 용어 표

| 원어 | canonical 표기 | 금지 표기 | 첫 등장 풀이 예문 | 비고 |
|---|---|---|---|---|
| pre-training | pre-training | 사전학습·사전 학습·사전훈련 | pre-training은 대규모 일반 데이터로 모델의 기반 능력을 먼저 학습하는 단계다 | 직역 67회 실측 — 원어로 통일 |
| fine-tuning | fine-tuning | 미세조정·미세 조정·파인튜닝 | fine-tuning은 pre-training된 모델을 특정 과제 데이터로 더 학습시키는 단계다 | 2026-09 3차 갱신에서 "파인튜닝" 음차 병용 허용을 철회하고 원어로 단일화했다 (원어 624회 대 음차 48회). 파생형 "코파인튜닝"은 co-fine-tuning 행의 원어를 쓴다 |
| post-training | post-training | 사후학습·후속학습 | post-training은 pre-training을 마친 모델을 특정 embodiment나 과제 데이터로 이어서 학습시키는 단계다 | pre-training, fine-tuning 행과 한 묶음. GR00T와 Cosmos 계열이 이 이름을 쓴다. 띄어 쓴 "사후 학습"은 사전 분포와 사후 분포 문맥과 겹쳐 기계 검사에서 뺐다 (2026-09 등재) |
| co-fine-tuning | co-fine-tuning | — | co-fine-tuning은 로봇 데이터와 웹 데이터를 한 배치에 섞어 함께 fine-tuning하는 레시피다 | RT-2 용어 |
| distillation | distillation | 증류 | distillation은 큰 모델의 출력을 작은 모델이 흉내 내게 학습시키는 압축 기법이다 | |
| quantization | 양자화 | 퀀타이제이션 | 양자화는 가중치를 낮은 비트 수로 줄여 모델을 압축하는 기법이다 | 표준 번역 정착(85회, TurboQuant 계열 포함) |
| attention | attention | 어텐션 | attention은 토큰들이 서로를 얼마나 참조할지 가중치를 계산하는 메커니즘이다 | cross-attention·self-attention도 원어 |
| embedding | 임베딩 | — | 임베딩은 텍스트나 이미지를 고정 차원 벡터로 바꾼 표현이다 | 음차 정착. CLAUDE.md 언어 정책 예시와 일치 |
| token | 토큰 | — | — | 음차 정착 |
| tokenizer | 토크나이저 | — | — | 음차 정착 |
| corpus | 코퍼스 | — | 코퍼스는 학습이나 검색의 대상으로 모아 둔 문서 집합이다 | 음차 canonical. 3차 보류분(원어 161회 대 음차 98회)에서 방향이 뒤집혀 코퍼스 346회 대 원어 226회가 됐다. "말뭉치"는 0건이라 금지 표기 불요. 원어 잔존은 지침으로 정리한다. 2026-09 4차 갱신 등재 |
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
| RLVR | RLVR | — | RLVR은 수학 정답이나 테스트 통과처럼 기계적으로 검증할 수 있는 결과를 reward로 삼아 모델을 강화학습시키는 기법이다 | Reinforcement Learning with Verifiable Rewards의 약어이며 약어 그대로 쓴다. RLHF 행과 짝. 풀어 쓴 한글 표기가 0건이라 금지 표기는 비운다. 지침만. 2026-09 4차 갱신 등재 (약어 38회) |
| prompt injection | prompt injection | 프롬프트 주입·프롬프트 인젝션 | prompt injection은 입력 데이터 안에 숨긴 지시로 모델이 원래 지시를 벗어나 행동하게 만드는 공격이다 | A3, L3, E2 세 배치가 올렸다. jailbreak 행과 짝. 훅이나 UI가 프롬프트를 삽입한다는 뜻(공격 아님)은 "프롬프트를 주입해"처럼 동사형으로 풀거나 "프롬프트 삽입"으로 쓴다 (Stage B에서 5건이 이 뜻이었다). 2026-09 4차 갱신 등재 (원어 58회 대 직역 7회) |
| jailbreak | jailbreak | — | jailbreak는 안전 학습을 우회해 모델이 거부해야 할 요청에 응하게 만드는 공격이다 | prompt injection 행과 짝. "탈옥"은 0건이라 금지 표기는 비운다. 지침만. 2026-09 4차 갱신 등재 (원어 44회) |
| unlearning | unlearning | 망각 학습·탈학습 | unlearning은 학습된 모델에서 특정 지식을 제거하는 기법이다 | shumailov-2024 페이지 근거 |
| catastrophic forgetting | catastrophic forgetting | 파국적 망각 | catastrophic forgetting은 새 학습이 기존 능력을 지워버리는 현상이다 | |
| mixture-of-experts | mixture-of-experts | 전문가 혼합 | mixture-of-experts는 입력마다 일부 전문 모듈만 활성화하는 구조다 | 약어 MoE 병용 가능 |
| LoRA | LoRA | — | LoRA는 저랭크 행렬만 학습해 fine-tuning 비용을 줄이는 기법이다 | 약어 그대로 |
| encoder / decoder | 인코더 / 디코더 | — | — | 음차 정착 |
| autoencoder | autoencoder | 오토인코더 | autoencoder는 입력을 압축한 latent로 부호화한 뒤 다시 복원하도록 학습하는 신경망이다 | variational autoencoder(VAE)도 원어. L1 배치에서 mentzer(오토인코더)와 rombach(autoencoder)가 갈린 사례다. 2026-09 4차 갱신 등재 (원어 50회 대 음차 11회) |
| codebook | codebook | 코드북 | codebook은 벡터 양자화에서 연속 벡터를 대신할 대표 벡터들을 모아 둔 표다 | codebook collapse도 원어. turbovec 계열 3편과 rombach에 몰려 있다. 2026-09 4차 갱신 등재 (원어 149회 대 음차 31회) |
| hidden state | hidden state | 은닉 상태 | hidden state는 신경망의 중간 층이 계산해 다음 층이나 다음 timestep으로 넘기는 내부 벡터다 | 2026-09 4차 갱신 등재 (원어 56회 대 직역 2회) |
| backbone | backbone | 백본 | backbone은 상위 head가 올라타는 pre-training된 특징 추출 본체를 뜻한다 | VLM backbone·vision backbone 같은 복합어도 원어. 2026-09 3차 갱신 등재 (원어 526회 대 음차 37회) |
| transformer | Transformer | 트랜스포머 | — | 고유명사 취급, 원어 대문자 |
| diffusion model | diffusion model | 확산 모델·디퓨전 모델 | diffusion model은 데이터에 noise를 단계적으로 더한 뒤 그 과정을 거꾸로 배워 샘플을 만드는 생성 모델이다 | 단독 "확산"은 일반어라 복합어만 금지한다. 등재 시점 위반 전량이 physical-ai 3편(6줄)이다. 2026-09 4차 갱신 등재 (원어 84회 대 직역 6회) |
| denoising | denoising | 디노이징 | denoising은 noise가 섞인 입력에서 noise를 걷어 내 원래 신호를 복원하는 단계다 | 일반 서술 "잡음 제거"와 "노이즈 제거"는 허용한다. 등재 시점 위반 19건이 전부 physical-ai(reuss-2026 두 파일, 9bow WAM)다. 2026-09 4차 갱신 등재 (원어 89회 대 음차 19회) |
| classifier-free guidance | classifier-free guidance | — | classifier-free guidance는 조건 있는 예측과 조건 없는 예측의 차이를 키워 생성 결과가 조건을 더 강하게 따르게 하는 샘플링 기법이다 | 약어 CFG 병용 가능. L1 배치 반복 등장 용어. 한글 표기 0건이라 지침만. 2026-09 4차 갱신 등재 (원어 84회) |
| benchmark | 벤치마크 | — | — | 음차 정착 |
| ablation | ablation | 어블레이션·애블레이션·절제 실험 | ablation은 구성 요소를 하나씩 빼거나 바꿔 각 요소의 기여를 재는 실험이다 | CLAUDE.md 언어 정책이 원어 canonical 예시로 드는 용어인데 어느 용어집에도 없었다. ablation study도 원어. 2026-09 4차 갱신 등재 (원어 391회 대 음차 9회) |
| baseline | baseline | — | baseline은 새 방법의 효과를 재기 위해 비교 대상으로 두는 기존 방법이나 기본 설정이다 | 원어 canonical. "기준선"은 표준 번역으로 병용 허용한다. 음차 "베이스라인"은 원어로 바꾸기를 권장하되 physical-ai 47건 rework 때문에 기계 검사는 두지 않는다 (지침). 3차 보류분. 2026-09 4차 갱신 등재 (원어 531회 대 기준선 181회, 베이스라인 74회) |
| recall | recall | 재현율·회복률 | recall은 실제 정답 중 모델이 찾아낸 비율이다 | D5 배치가 실제 혼용(회복률)을 겪은 용어. 버그 reproduction rate를 뜻하는 "재현율"은 별개 개념이라 "재현 비율"로 쓴다 (mattpocock-skills). 짝인 precision은 "정밀도"가 physical-ai에서 제어 정밀도 같은 일반어로 널리 쓰여 지침만 둔다 (precision 행). 2026-09 4차 갱신 등재 (원어 290회 대 직역 14회) |
| precision | precision | — | precision은 모델이 정답이라고 낸 것 중 실제 정답의 비율이다 | 평가 지표 문맥에서는 원어를 권장한다. "정밀도"는 physical-ai의 제어 정밀도, timestamp 정밀도처럼 일반어 용법이 62건이라 기계 검사 없이 지침만 둔다. recall 행과 짝. 2026-09 4차 갱신 등재 (원어 129회 대 정밀도 124회) |
| pairwise | pairwise | 페어와이즈·쌍대 비교 | pairwise 비교는 두 후보를 짝지어 어느 쪽이 나은지 고르게 하는 평가 방식이다 | "쌍대"는 duality의 번역이라 "쌍대 비교"는 pairwise comparison의 오역이며 복합어만 금지한다. "쌍별"은 자연스러운 번역이라 허용한다. 2026-09 4차 갱신 등재 (원어 41회 대 페어와이즈 8회, 쌍대 비교 8회) |
| sampling | 샘플링 | — | — | 음차 정착 |
| decoding | 디코딩 | — | — | 음차 정착 |
| speculative decoding | speculative decoding | 추측 디코딩·투기적 디코딩·스페큘레이티브 디코딩 | speculative decoding은 값싼 수단으로 토큰 여러 개를 먼저 제안하고 target 모델이 한꺼번에 검증하게 해 생성 속도를 올리는 기법이다 | 채택 여부를 target이 정하므로 모델 품질은 바뀌지 않는다. 2026-09 등재 (원어 23회 대 직역 2회). draft model과 방식 이름(MTP·DFlash·DSpark)도 원어 |
| rollout | rollout | 롤아웃 | rollout은 모델이나 policy를 실행해 응답이나 trajectory 표본을 끝까지 생성해 내는 과정이다 | 3차 이관분. glossary-physical-ai의 rollout 행은 applies_to 밖이라 agents 파일(bytebytego)을 잡지 못해 이 용어집에 행을 둔다. 같은 금지 표기를 두 용어집에 넣으면 physical-ai 파일에서 경고가 두 번 나므로 physical-ai 행의 금지 칸은 비워 둔다. 배포 단계의 rollout(release rollout)도 원어로 쓴다 (bytebytego 5건). 2026-09 4차 갱신 등재 (원어 523회 대 음차 18회) |
| inference | 추론 | — | — | 표준 번역 정착. reasoning(추론)과 문맥으로 구분 |
| cache read / cache write | cache read / cache write | 캐시 읽기·캐시 쓰기 | cache read는 이전 요청에서 저장한 프롬프트 접두부를 다시 읽어 쓰는 토큰이고, cache write는 그 접두부를 새로 저장하는 토큰이다 | API 필드명 `cache_read`와 `cache_write`는 코드 스팬으로 쓴다. prompt caching 행과 짝. 2026-09 4차 갱신 등재 (원어 52회 대 직역 6회) |
| prompt caching | prompt caching | — | prompt caching은 반복되는 프롬프트 접두부를 서버에 저장해 두고 재사용해 비용과 지연을 줄이는 API 기능이다 | API 기능명은 원어를 권장한다. 프롬프트 캐싱 7회 대 원어 8회로 대등해 기계 검사는 두지 않는다 (지침). 2026-09 4차 갱신 등재 |
| perplexity | perplexity | 혼란도·당혹도 | perplexity는 모델이 다음 토큰을 얼마나 못 맞히는지 재는 지표다 | |
| VLM / VLA | VLM / VLA | — | VLM은 vision-language model, VLA는 vision-language-action model의 약어다 | 약어 그대로 |
| in-context learning | in-context learning | 문맥 내 학습 | in-context learning은 가중치 갱신 없이 프롬프트 안의 예시만으로 과제를 배우는 능력이다 | 약어 ICL 병용 가능 |
| zero-shot | zero-shot | — | zero-shot은 해당 과제의 예시를 하나도 보여 주지 않고 지시만으로 과제를 풀게 하는 설정이다 | few-shot, one-shot도 원어. 음차 "제로샷"은 2회로 원어가 정착했다. 지침만. 2026-09 4차 갱신 등재 (원어 207회) |
| reasoning trace | reasoning trace | — | reasoning trace는 모델이 답에 이르기까지 생성한 중간 추론 텍스트의 기록이다 | glossary-agents의 reasoning 행이 canonical을 "추론"으로 두지만 복합어는 원어로 쓴다. "추론 기록"은 일반 서술이라 기계 검사 없이 지침만. 2026-09 4차 갱신 등재 (원어 44회 대 추론 흔적 3회, 추론 기록 10회) |
| next-token prediction | next-token prediction | — | next-token prediction은 이전 토큰들로 다음 토큰을 맞히는 학습 목표다 | "다음 토큰 예측"은 병용 허용 (지침) |
| MLLM | MLLM | 멀티모달 대형 언어 모델·다중모달 LLM | MLLM은 이미지와 텍스트를 함께 받아 처리하는 대형 언어 모델을 가리킨다 | 약어 그대로. VLM과 거의 같은 뜻이지만 로보틱스 dual-system 문헌은 MLLM 표기를 쓴다 |
| modality | 모달리티 | — | 모달리티는 텍스트, 이미지, 음성, 센서 신호처럼 모델이 다루는 입력이나 출력의 종류다 | 음차 canonical. 3차 보류분(원어 147회 대 음차 48회)에서 음차가 2.6배 늘어 원어 155회 대 음차 125회로 대등해졌고, 배치 재작성이 음차를 택한 방향을 따른다. 원어 잔존은 지침으로 정리한다. 코드 식별자(modality config 등)는 원어 그대로. 2026-09 4차 갱신 등재 |
| prompt tuning | prompt tuning | 프롬프트 튜닝 | prompt tuning은 모델 파라미터를 전부 얼린 채 어휘에 추가한 토큰의 임베딩만 학습시키는 방식이다 | LoRA와 달리 원래 가중치를 하나도 안 건드린다. dual-system VLA에서 일반화 보존에 유리 (Cui 2025) |

## 신규 용어 추가 절차

[[overviews/glossary-physical-ai]]의 동일 절차를 따른다 — 본문은 원어 + 풀이로 즉시 작성, Step 3.5에서 추가 후보 보고, 승인 후 표에 행 추가.

## 관련 페이지

- [[overviews/glossary-physical-ai]] — physical-ai 도메인 용어
- [[overviews/glossary-agents]] — agentic 시스템 용어
