---
title: "GenRec: Towards LLM-Native Recommendation at Netflix"
type: article
year: 2026
category: applications
source: netflix-2026-genrec-towards-llm-native-recommendation.md
raw_path: raw/articles/netflix-2026-genrec-towards-llm-native-recommendation.md
raw_filename: "netflix-2026-genrec-towards-llm-native-recommendation.md"
source_collection: external
author: "Ying Li, Arjun Rao, Shradha Sehgal (Netflix Technology Blog)"
url: "https://netflixtechblog.com/genrec-towards-llm-native-recommendation-at-netflix-f20be6f643e3"
publisher: "Netflix Technology Blog"
tags: [recommender-system, llm-ranker, post-training, context-engineering, reward-weighted-loss, prefill-only-inference, netflix]
figures:
  - id: fig01
    file: assets/netflix-2026-genrec-towards-llm-native-recommendation/fig01.png
    raw: raw/articles/netflix-2026-genrec-towards-llm-native-recommendation-figures/fig01.png
    caption: "GenRec 파이프라인. 사용자 이력, 아이템 메타데이터, 컨텍스트 원본 로그를 context engineering으로 자연어 프롬프트로 바꾸고, vLLM에서 prefill-only로 실행되는 모델이 카탈로그 아이템 점수를 내 추천 순위를 만든다"
    strategy: fetched
    curated: true
  - id: fig02
    file: assets/netflix-2026-genrec-towards-llm-native-recommendation/fig02.png
    raw: raw/articles/netflix-2026-genrec-towards-llm-native-recommendation-figures/fig02.png
    caption: "온라인 A/B test 결과. production 모델 대비 단기 홈페이지 engagement 지표 0.115%, 장기 핵심 지표 0.006% 상승이 모두 통계적으로 유의하다"
    strategy: fetched
    curated: true
  - id: fig04
    file: assets/netflix-2026-genrec-towards-llm-native-recommendation/fig04.png
    raw: raw/articles/netflix-2026-genrec-towards-llm-native-recommendation-figures/fig04.png
    caption: "프롬프트에 담는 engagement 이벤트 수와 오프라인 MRR의 관계. 점선의 elbow point를 넘기면 이벤트를 더 담아도 이득이 작다"
    strategy: fetched
    curated: true
  - id: fig15
    file: assets/netflix-2026-genrec-towards-llm-native-recommendation/fig15.png
    raw: raw/articles/netflix-2026-genrec-towards-llm-native-recommendation-figures/fig15.png
    caption: "2단계 프레임워크. 오픈소스 모델을 주기적 pre-training으로 Foundational LLM(Phase 1)으로 만들고, 잦은 과제 특화 post-training으로 GenRec(Phase 2)을 얻는다"
    strategy: fetched
    curated: true
  - id: fig16
    file: assets/netflix-2026-genrec-towards-llm-native-recommendation/fig16.png
    raw: raw/articles/netflix-2026-genrec-towards-llm-native-recommendation-figures/fig16.png
    caption: "Phase 1과 Phase 2 학습의 기여 표. Phase 1은 오픈소스 모델 대비 MRR 10~20%, Phase 2는 막 학습된 Phase 1 대비 35~50% 개선한다"
    strategy: fetched
    curated: true
---

## 요약

이 글은 Netflix 추천팀(Ying Li, Arjun Rao, Shradha Sehgal)이 2026년 7월 Netflix Technology Blog에 공개한 GenRec 소개문이다. GenRec은 사내 foundation LLM을 Netflix 데이터와 목적으로 post-training한 LLM 기반 recommendation ranker이며, 한 달 뒤 arXiv 논문 [[applications/li-2026-genrec-an-llm-backed-recommendation]]으로 세부가 공개됐다.

글의 주장은 LLM 기반 ranker가 성숙한 production 시스템과 대등하거나 더 나은 성능을 훨씬 적은 레이블 예시와 입력 신호로 낼 수 있다는 것이다. 여러 해 조정된 production ranker와의 대규모 A/B test에서 GenRec은 단기와 장기 온라인 지표 모두 통계적으로 유의한 개선을 보였고, Phase 2 레이블 데이터와 입력 신호는 일부만 썼다.

논문과 비교하면 이 글은 "LLM-native recommendation"이라는 방향성에 더 무게를 둔다. 제목의 LLM-native는 추천 시스템의 입력 표현, 모델 구조, 학습, 인프라를 LLM 패러다임 중심으로 재구성한다는 뜻이다. 글은 GenRec을 그 방향의 초기 사례로 제시하고, 수작업 feature 중심 추천 스택이 어떻게 바뀌는지 네 가지 변화로 정리한다.

| 글의 구성 | 내용 |
|---|---|
| 문제와 목표 | 기존 스택의 확장 비용, 기성 LLM의 네 가지 결함 |
| GenRec 설계 | 2단계 학습, 대화 형식 데이터, verbalization, 세 가지 목적, scoring head, 서빙 |
| 실험 | production 대비 결과, scaling, Phase 기여, 컨텍스트 길이 최적화 |
| 전망 | LLM-native recommendation으로의 네 가지 전환 |

## 배경

### 수작업 feature 중심 스택의 비용

Netflix 경험의 중심에는 추천이 있다. 현재 production 모델은 사용자, 아이템, 상호작용에 걸친 수천 개의 수작업 feature에 의존하고, sequence modeling, feature 상호작용, multi-task 목적을 위한 전용 구조를 함께 쓴다. feature는 원본 데이터에서 사람이 설계해 뽑아낸 모델 입력 값을 말한다.

이 스택은 영화, 시리즈, 게임, 라이브, 팟캐스트 같은 다양한 콘텐츠 유형과 여러 제품 surface를 지원하도록 오랜 기간 발전해 왔다. 그러나 복잡도가 높아 새 용도를 추가하는 비용이 크다. 콘텐츠 유형이나 surface를 하나 추가하려면 다음이 필요하다.

- 상당한 feature engineering
- 구조 변경
- 인프라 작업
- 실험

### LLM이 여는 가능성과 한계

LLM은 추천을 바라보는 방식을 바꾸고 있다. 글은 Google의 PLUM, Spotify의 GLIDE, Kuaishou의 OneRec-Think를 최근 사례로 든다. LLM의 넓은 world knowledge와 언어 이해 능력 덕분에 세 가지가 가능해진다.

- 사용자 이력과 아이템 메타데이터를 텍스트로 직접 표현한다
- 풍부한 관계를 공유 의미 공간에서 포착한다
- 자연어 프롬프트로 추천을 조정(steering)한다

반면 기성 LLM은 production 추천기로 쓰기에는 아직 멀다. 글이 지적하는 결함은 네 가지다.

| 결함 | 내용 |
|---|---|
| 인기 편향 | 전역적으로 인기 있는 콘텐츠를 과도하게 추천한다 |
| 카탈로그 밖 환각 | 카탈로그에 없는 아이템을 만들어 낸다 |
| 비즈니스 제약 무시 | 콘텐츠 혼합 같은 운영 요구를 따르지 않는다 |
| 제한적 개인화 | 회원별 차이를 충분히 반영하지 못한다 |

GenRec은 이 결함을 해결하기 위해 내부 foundation LLM을 Netflix 고유 데이터와 목적으로 post-training한다. post-training은 pre-training을 마친 모델을 특정 과제 데이터로 이어서 학습시키는 단계다.

## 핵심 개념

GenRec의 설계는 다섯 요소로 요약된다.

| 설계 요소 | 역할 |
|---|---|
| verbalization | 사용자 이력, 아이템 메타데이터, 컨텍스트를 텍스트로 풀어 쓴다 |
| 랭킹용 post-training | Netflix에 적응한 foundation LLM을 랭킹 과제로 post-training한다 |
| catalog-aware scoring head | Netflix 작품만 채점하는 head를 결합한다 |
| reward 신호 | 장기 회원 가치와 비즈니스 목표에 맞춰 학습을 조정한다 |
| prefill-only 실행 | Netflix LLM 서빙 스택에서 비용 효율을 위해 prefill 단계만 실행한다 |

context engineering은 제한된 context window 안에 어떤 정보를 어떤 형태로 담을지 설계하는 작업이다. 글은 Anthropic의 context engineering 글을 인용해 이 개념을 가져오고, GenRec이 추천의 초점을 feature engineering에서 context engineering으로 옮긴다고 설명한다.

prefill-only mode는 프롬프트를 한 번 읽는 prefill 단계만 실행하고 토큰 단위 decoding은 하지 않는 서빙 방식이다. 모델이 출력 문장을 생성하지 않고 입력을 읽은 결과로 후보 전체의 점수를 한꺼번에 낸다.

MRR(Mean Reciprocal Rank)은 정답 아이템 순위의 역수를 평균낸 랭킹 지표다. 글의 오프라인 결과는 모두 이 지표로 보고된다.

## 방법

### 문제 설정

GenRec은 full-catalog ranking 과제를 푼다. 후보 집합이 주어지면 top-K ranking이 된다. 사용자 u, 상호작용 이력 H, 현재 컨텍스트 τ가 주어지면 각 아이템을 채점해 개인화 순위를 만든다. 컨텍스트에는 device, surface, locale, 시간 등이 포함된다. 결과 순위는 추천에 바로 쓰이거나 하위 개인화 시스템의 입력이 된다.

형식적으로 요청 (u, τ, t, H)는 카탈로그 C 위의 순위 π로 사상되고, π(i)는 아이템 i에 배정된 위치다. 최적화 대상은 단기 engagement만이 아니라 기대 장기 회원 효용이며, 장기 효용은 만족과 유지의 proxy다.

### Foundation LLM에서 ranker로

GenRec은 2단계 학습 프레임워크를 따른다.

![[assets/netflix-2026-genrec-towards-llm-native-recommendation/fig15.png]]
*Figure 2: 2단계 프레임워크. 오픈소스 모델에서 Phase 1 Foundational LLM을 만들고, 잦은 과제 특화 post-training으로 Phase 2 GenRec을 만든다 (Netflix 2026)*

Phase 1은 Netflix에 적응한 foundation LLM이다. 오픈소스 LLM에서 출발해 Netflix 자체 코퍼스로 적응시키며, 다음 기반 능력을 기른다.

- Netflix 콘텐츠 이해
- 회원 행동과 선호 패턴
- 일반 언어 이해와 생성

Phase 1은 비교적 드물게 갱신되며, 여러 애플리케이션이 공유하는 Netflix 인지 backbone 역할을 한다. backbone은 상위 head가 올라가는 pre-training된 모델 본체를 뜻한다.

Phase 2가 GenRec이다. foundation model을 랭킹 전용 데이터와 목적으로 post-training해 고품질 랭킹 모델로 바꾼다. Phase 2의 특징은 네 가지다.

| 특징 | 내용 |
|---|---|
| 초점 | 랭킹 품질과 steering |
| 학습 목적 | reward-weighted loss로 여러 reward 신호를 반영한다 |
| 갱신 주기 | 신작과 변하는 취향을 따라가도록 더 자주 갱신한다 |
| 비용 | 서빙 비용 제약 아래 명시적으로 최적화한다 |

두 단계를 나누는 이유는 갱신 주기와 비용이 다르기 때문이다. 넓은 능력은 드물게 크게 학습하고, 자주 해야 하는 랭킹 적응은 가볍게 유지한다.

### 대화 형식의 학습 데이터

Netflix 회원들은 여러 surface에서 수천억 건의 상호작용 이벤트를 만든다. 이벤트 종류는 조회, 재생, 재생 시간, 좋아요와 싫어요, 목록 추가, 이탈 등이다. GenRec은 이 로그를 사용자와 추천기 사이의 단일 턴 또는 멀티턴 "대화"로 변환한다.

| 메시지 | 담는 내용 |
|---|---|
| User message | verbalized 컨텍스트, 프로필, 이력, 아이템 메타데이터, 과제(예: 사용자가 다음에 시청하거나 좋아요를 누를 작품 추천) |
| Assistant message | 회원의 실제 engagement. 어떤 작품을 재생했는지, 얼마나 오래 봤는지, 어떤 피드백을 남겼는지 |

Phase 2 학습에서 LLM은 assistant message가 user message에 어떻게 의존하는지를 배운다. 이 형식 덕분에 풍부한 추천 신호를 텍스트로 표현할 수 있고, 언어 모델링 목적과 랭킹 목적을 함께 지원한다.

추론 시에는 대화를 생성하지 않는다. verbalized 컨텍스트를 입력하고 catalog-aware scoring head로 아이템을 채점할 뿐 assistant message를 decoding하지 않는다. 대화 형식은 주로 학습 단계에서 LM 목적을 지원하고, verbalized 텍스트에 대한 언어 이해 능력을 유지하는 데 쓰인다.

### verbalization과 context engineering

기존 추천기는 dense feature와 임베딩 위에서 동작한다. GenRec은 풍부한 사용자 이력과 컨텍스트를 자연어로 풀어 써서, 원래 상호작용 신호를 LLM의 의미 공간에 직접 둔다. 아이템 관계나 변하는 관심사 같은 고차 패턴은 수작업 feature engineering이 아니라 모델이 발견하게 한다.

![[assets/netflix-2026-genrec-towards-llm-native-recommendation/fig01.png]]
*Figure 1: GenRec 파이프라인. 원본 로그가 context engineering을 거쳐 자연어 프롬프트가 되고, vLLM에서 prefill-only로 실행되는 모델이 카탈로그 점수로 순위를 만든다 (Netflix 2026)*

모든 상호작용을 그대로 풀어 쓰면 토큰 예산을 금방 넘고 Netflix 규모에서 비용이 감당하기 어렵다. 글은 context window가 새로운 "feature budget"이 된다고 표현한다. 기존 추천기에서 feature 수가 입력 정보량의 제약이었다면, LLM ranker에서는 토큰 예산이 그 역할을 한다. 이 제약 아래 네 가지 규칙을 적용한다.

| 규칙 | 대상 |
|---|---|
| Retain in full | 긴 재생, 좋아요 같은 high-signal engagement. 더 풍부한 세부와 함께 남긴다 |
| Omit | 매우 짧은 재생이나 빠른 hover 같은 low-signal 이벤트 |
| Summarize or compress | 몰아보기 같은 반복 행동 |
| Elaborate selectively | 신작이나 cold-start 아이템 같은 중요 아이템 |

시간 범위에도 우선순위가 있다. 고정 토큰 예산 안에서 최근의 high-signal 이력을 우선하고, 오래된 이력은 압축하거나 버린다.

글은 프롬프트 구조에 관한 서술도 하나 더한다. 공유 접두부(shared prefix)를 최대화하도록 프롬프트를 구조화해 prefix caching 효율을 높인다. prefix caching은 여러 요청이 같은 앞부분을 가질 때 그 부분의 계산 결과를 재사용하는 서빙 최적화다. 목표는 랭킹 품질을 지키면서 비용이 과하지 않은, 압축되고 정보 밀도 높은 프롬프트다.

### 세 가지 학습 목적

GenRec은 랭킹 목적, 언어 모델링 목적, reward-weighted 학습을 통한 alignment를 결합한 다목적 손실로 학습한다.

**Catalog-aware ranking objective**는 주 과제다. engagement 품질에 따라 아이템을 채점하도록 가르친다. 충분히 긴 재생이나 강한 명시적 피드백 같은 고가치 engagement를 임계값과 denoising 로직으로 positive 레이블화하고, 카탈로그나 후보 집합 위의 cross-entropy loss로 verbalized 컨텍스트에서 positive에 높은 점수를 주도록 학습한다.

**Language modeling objective**는 verbalized 입력과 출력에 대한 LM 목적이다. 역할은 세 가지다.

- 모델의 일반 언어 이해를 보존한다
- 풍부한 자연어 이력과 아이템 메타데이터 해석 능력을 높인다
- 추천 설명 같은 텍스트 생성 용도의 가능성을 열어 둔다

**Reward-weighted loss**는 alignment 수단이다. GenRec은 원시 랭킹 정확도를 넘어 두 가지를 만족해야 한다. 하나는 비즈니스 요구 준수(예: 영화, 시리즈, 게임, 라이브, 팟캐스트의 균형)이고, 다른 하나는 즉각적인 클릭이나 재생이 아닌 장기 회원 만족의 최적화다.

원래 상호작용 시퀀스로만 학습하면 몰아보기를 과도하게 선호하거나 한 콘텐츠 유형에 과도하게 집중하는 행동이 나온다. 그래서 별도 reward model들의 신호로 ranking loss에 가중치를 준다. 각 학습 예시는 두 종류의 신호에서 도출한 스칼라 가중치를 받는다.

| 신호 | 내용 |
|---|---|
| Long-term satisfaction proxies | 단기 engagement가 재방문, 카탈로그 탐색, 지속적 engagement 같은 장기 결과에 얼마나 기여하는지 추정한다 |
| Behavior rebalancing | 콘텐츠 유형과 공개 단계 사이의 행동을 비즈니스 목표에 맞게 조정한다 (예: 게임 vs 영화, 신작 vs 스테디셀러) |

예시의 ranking loss는 이 가중치로 조정된다. 고가치 engagement는 큰 가중치를, 저가치 engagement는 작은 가중치를 받는다. 글은 이 방식이 완전한 강화학습보다 단순하고 비용 효율적이면서 실제로 효과적인 alignment를 제공한다고 평가한다. GRPO 같은 강화학습 계열 방법에서 추가 이득을 확인했지만 비용이 높아 향후 과제로 남겼다.

### Backbone과 scoring head

GenRec의 구조는 foundation LLM을 그대로 따른다. next-token prediction 계열 목적으로 학습된 decoder-only Transformer에 Netflix 카탈로그 내 아이템만 채점하는 catalog-aware ranking head를 결합한 형태다. 채점 과정은 세 단계다.

| 단계 | 처리 |
|---|---|
| Verbalization | verbalizer V가 사용자 이력 H, 컨텍스트 τ, 관련 아이템 메타데이터를 하나의 텍스트 시퀀스 x로 직렬화한다 |
| Pooled representation | LLM이 x를 처리하고, 사용자의 현재 선호와 컨텍스트를 요약하는 pooled hidden state h를 추출한다. hidden state는 신경망 중간 층이 계산해 넘기는 내부 벡터다 |
| Catalog-aware scoring | 카탈로그 아이템 i마다 학습된 임베딩 e_i가 있다. scoring head φ가 h와 e_i를 결합해(예: 내적이나 작은 MLP) 점수 s_i를 낸다. softmax로 확률 분포를 만들고 순위 π로 바꾼다 |

backbone, scoring head, 아이템 임베딩은 모두 함께 학습된다. 카탈로그가 매우 크면 sampled softmax나 후보 집합을 써서 학습과 추론을 효율화한다. 이 구조는 추천을 Netflix 카탈로그 안으로 제한하면서 대규모 후보 집합을 효율적으로 채점한다. 기성 LLM의 "카탈로그 밖 환각" 결함이 구조 차원에서 사라지는 이유다.

### 서빙과 비용 최적화

GenRec은 vLLM을 쓰는 Netflix 사내 LLM 스택에서 서빙된다. 글은 Netflix 규모에서 서빙 비용을 결정하는 요인을 세 가지로 든다.

1. 모델 크기
2. 컨텍스트 길이
3. 추론 모드 (prefill vs autoregressive decoding)

세 요인에 각각 대응하는 전략을 쓴다.

| 요인 | 전략 | 내용 |
|---|---|---|
| 모델 크기 | 작은 모델과 distillation 모델 | distillation은 큰 모델의 출력을 작은 모델이 흉내 내게 학습시키는 압축 기법이다. 더 크거나 목표 지향적인 데이터셋으로 작은 모델을 학습해 큰 모델 품질의 대부분을 낮은 서빙 비용으로 확보한다 |
| 컨텍스트 길이 | 공격적인 컨텍스트 압축 | 앞의 context engineering으로 토큰을 최소화하면서 랭킹 품질을 유지한다 |
| 추론 모드 | prefill-only inference | 대규모 후보 집합에 autoregressive decoding을 쓰면 비용이 과도하다. 모델이 프롬프트를 한 번 읽고 forward pass 한 번에 후보 전체를 채점하며, 토큰 단위 decoding을 하지 않는다 |

글은 이 선택들이 함께 작동해 GenRec을 연산 예산 안에서 대량 트래픽에 서빙할 수 있게 한다고 정리한다.

## 결과

### production baseline과의 비교

비교 대상은 여러 해 조정된 성숙한 production ranker다. 이 baseline은 수천 개의 dense feature와 임베딩 feature, feature 상호작용과 시퀀스 모델링을 위한 맞춤 구조를 갖추고 있다. 평가는 오프라인 지표와 대규모 온라인 A/B test 두 가지로 했다.

| 평가 | 결과 |
|---|---|
| 오프라인 | Phase 2 레이블 학습 예시를 약 40배 적게 쓰고도 MRR 약 +1.6%. Phase 2 데이터를 늘리고 입력 신호를 풍부하게 하면 오프라인 지표가 계속 오른다 |
| 온라인 설정 | batch-compute 추천 surface, Netflix 트래픽 약 10%, 약 4주 |
| 온라인 결과 | 저데이터, 저신호 설정에서 단기와 장기 온라인 지표 모두 통계적으로 유의한 개선 |

![[assets/netflix-2026-genrec-towards-llm-native-recommendation/fig02.png]]
*Figure 3: 온라인 A/B test. production 모델을 기준으로 단기 홈페이지 engagement 지표 +0.115%, 장기 핵심 지표 +0.006%가 모두 유의하다 (Netflix 2026)*

batch-compute surface는 요청 시점이 아니라 미리 일괄 계산해 둔 추천을 보여 주는 surface를 말한다. 글은 이 결과를, 제대로 post-training되고 정렬된 LLM 기반 ranker가 전통적 추천 모델의 강력한 대안이 될 수 있다는 근거로 제시한다. 데이터와 입력 신호를 더 늘릴 여지가 크다는 점도 함께 강조한다.

### 데이터, 모델, Phase의 기여

GenRec의 이득이 어디서 오는지 ablation으로 분해했다. ablation은 구성 요소를 하나씩 빼거나 바꿔 각 요소의 기여를 재는 실험이다.

| 실험 | 결과 |
|---|---|
| 데이터 scaling | 약 1B와 약 10B backbone 모두 Phase 2 post-training 데이터가 늘수록 오프라인 MRR이 오른다. 큰 모델이 절대 MRR은 높지만 scaling 곡선 모양은 비슷하다 |
| 모델 scaling | 고정 학습 예산 아래 약 1B에서 약 10B 변형을 post-training하면, 큰 backbone이 일관되게 높은 오프라인 MRR을 낸다 |
| Phase 1 vs 오픈소스 | Phase 1 Netflix 적응 foundation LLM을 base로 쓰면 기성 LLM에서 바로 시작할 때보다 오프라인 랭킹 지표가 약 10~20% 높다 |
| Phase 2 vs Phase 1 | Phase 1 학습 cutoff 부근, 즉 Phase 1이 가장 최신일 때 평가하면 Phase 2 post-training이 35~50% 추가 이득을 낸다. 시간이 지나 Phase 1이 신작과 취향 변화에 뒤처지면 2주 뒤 약 80%로 커진다 |
| 데이터 효율 | 강한 Phase 1에서 시작하면, 설정에 따라 Phase 2 레이블을 10~40배 적게 쓰고도 production ranker와 같거나 더 나은 성능을 낸다 |

![[assets/netflix-2026-genrec-towards-llm-native-recommendation/fig16.png]]
*Table 1: Phase 1과 Phase 2 학습의 기여. 오프라인 MRR 기준 (Netflix 2026)*

데이터 효율 결과가 특히 중요하다. Phase 2는 Phase 1보다 훨씬 자주 갱신되므로, Phase 2 단계에서 적은 레이블로 같은 품질을 내는 한계 데이터 효율은 운영 비용을 직접 낮춘다. 데이터 scaling 곡선의 구체 수치는 논문 페이지의 Figure 4에 있다.

### 컨텍스트 길이 최적화

컨텍스트 길이는 품질과 비용을 함께 결정한다. verbalization이 길면 행동과 컨텍스트가 더 많이 드러나지만 학습과 서빙 비용이 늘어난다. 이 절충을 연구하려고 컨텍스트 길이와 상세 수준을 바꿔 가며 세 단계로 최적화했다.

1. **이벤트 정제와 압축**: low-signal engagement를 빼고 반복 행동을 압축해 정제된 이벤트 시퀀스를 만든다.
2. **elbow point 찾기**: 담을 과거 이벤트 수를 바꾸며 MRR을 그려, 추가 컨텍스트의 이득이 체감하기 시작하는 지점을 찾는다.
3. **상세 수준 최적화**: 남긴 이벤트마다 상세 수준과 단순화한 문구를 바꿔 매번 MRR을 잰다.

![[assets/netflix-2026-genrec-towards-llm-native-recommendation/fig04.png]]
*Figure 5: 프롬프트에 담는 engagement 이벤트 수와 오프라인 MRR. 점선의 elbow point를 넘기면 이벤트를 더 담아도 이득이 작다 (Netflix 2026)*

실험 결과 컨텍스트 토큰을 원래 예산의 약 3분의 1로 줄여도 오프라인 랭킹 지표 저하는 무시할 수준이었다. 서빙 비용이 컨텍스트 길이에 대략 비례하므로 서빙 비용도 비슷한 비율로 줄었다. 논문은 이 예를 약 5,000 토큰에서 약 1,700 토큰으로 구체화한다.

## LLM-native recommendation으로의 전환

글은 GenRec이 기존 ranker에 "Transformer를 바꿔 끼운 것" 이상이며, Netflix 추천이 LLM-native 방향으로 넓게 이동하는 신호라고 본다. 주목할 변화는 네 가지다.

### feature engineering에서 context engineering으로

전통적 RecSys 스택은 대규모 feature 집합과 무거운 feature 인프라를 중심으로 구성됐다. LLM 중심 시스템은 원본 로그, 메타데이터, 도구 출력에서 풍부한 텍스트 컨텍스트를 구성하는 데 집중한다. 글의 표현으로는 "prompt가 새로운 feature vector"가 된다.

따라서 모델링 작업의 내용이 바뀐다. feature를 설계하는 대신 다음을 결정한다.

- 어떤 신호를 담을지
- 얼마나 과거까지 볼지
- 토큰 예산 안에서 이력을 어떻게 압축하거나 요약할지

앞의 verbalization 압축 실험이 이 전환을 보여 준다. 세심한 컨텍스트 설계로 품질을 지키면서 서빙 비용을 크게 줄였다.

### 맞춤 구조에서 foundation backbone으로

과거에는 추천 과제마다 고유한 구조가 있었다. two-tower 모델, DLRM 계열 네트워크, 전용 attention block이 그 예다. LLM 중심 세계에서는 많은 과제가 공통 foundation backbone을 공유하고, 과제 간 차이는 세 곳에서 나온다.

| 차이의 원천 | 예 |
|---|---|
| 데이터와 verbalization 전략 | 어떤 이벤트를 어떻게 풀어 쓰는가 |
| post-training 목적과 reward | 무엇을 최적화하는가 |
| 추론 최적화 | 어떻게 싸게 서빙하는가 |

GenRec은 처음부터 새 구조를 만들지 않고 foundation LLM과 같은 backbone을 쓴다. 그래서 애플리케이션 사이에 학습 결과를 공유하기 쉽고, 향후 경험을 위한 자연어 steering의 길이 열린다.

### scaling law를 설계 지침으로

scaling law는 모델, 데이터, 연산량을 키울 때 성능이 따르는 경험 법칙이다. 전통적 RecSys는 희소 ID, 과도하게 설계된 목적, 과제별 구조 때문에 수확 체감에 부딪히곤 한다. LLM backbone을 쓰는 추천은 더 명확한 데이터와 모델 scaling 특성을 물려받는다. 비용 한도 안에서는 데이터와 모델을 키울수록 품질이 일관되게 오른다. 이는 RecSys 설계를 scaling law가 모델과 데이터 투자를 안내하는 넓은 LLM 패러다임에 가깝게 만든다.

### RecSys 인프라에서 LLM 인프라로

LLM 기반 추천기는 인프라도 LLM식으로 바꾼다. GPU 가속, vLLM과 Triton 기반, 세심한 batching과 caching이 특징이다. 시간이 갈수록 추천 서빙 인프라는 MLP나 factorization 모델 중심의 고전 RecSys 스택보다 일반 LLM 인프라에 가까워진다.

## 논문과의 차이

같은 팀의 논문과 비교하면 수치와 구조는 일치하고, 서술 범위에 차이가 있다.

| 항목 | 블로그 글 | 논문 |
|---|---|---|
| 공개 시점 | 2026-07-30 | 2026-08-21 (arXiv v2) |
| 서빙 비용 요인 | 모델 크기, 컨텍스트 길이, 추론 모드 셋을 나열 | 추론 비용이 모델 크기와 컨텍스트 길이의 곱에 비례한다고 설명하고, 추론 모드를 별도 수단으로 다룸 |
| prefix caching | 공유 접두부를 최대화하는 프롬프트 구조를 context engineering 절에서 언급 | 6.5절 인프라 논의에서 KV-caching, prefix caching을 비용 수단으로 언급 |
| 손실 함수 | 세 목적(ranking, LM, reward-weighted)으로 서술 | α, β, γ 가중합 수식과 L_miscellaneous 항을 제시 |
| 온라인 수치 | Figure 3 그림으로만 제시 | 본문에 +0.006%와 P값을 명시 |
| 컨텍스트 압축 예 | "약 3분의 1"만 제시 | 약 5,000 토큰에서 약 1,700 토큰이라는 예 |
| 전환 논의 | 네 가지 | 네 가지에 "pre-training, post-training, reward alignment" 절을 더한 다섯 가지 |
| 관련 연구 | PLUM, GLIDE, OneRec-Think 링크 | 특수 토큰, Semantic ID, LLM 기반 추천 세 계열로 체계적 정리 |

## 한계

- 글은 GenRec을 "초기 단계이지만 유망한 한 걸음"으로 규정한다. 온라인 검증은 batch-compute surface에서만 이뤄졌다.
- 강화학습 계열(GRPO 등)은 추가 이득이 있었지만 비용 때문에 향후 과제로 남겼다.
- 온라인 지표의 이름과 정의, 모델의 정확한 크기, reward model 세부는 공개하지 않는다.
- 결론은 비용, 인프라, alignment에 세심한 주의를 기울인다는 전제 아래서만 LLM 기반 추천기가 대규모 개인화의 중심 역할을 할 수 있다고 조건을 단다.
- 수집 과정에서 원문 이미지 6개 중 2개(Figure 2, Phase 비교 표)는 스크립트가 받지 못해 원본 URL에서 수동 보충했다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| LLM-native recommendation | 추천 시스템의 입력 표현, 모델 구조, 학습, 서빙 인프라를 LLM 패러다임 중심으로 재구성하는 방향 |
| feature budget | context window를 가리킨 글의 표현. 기존 추천기의 feature 수 대신 토큰 예산이 입력 정보량의 제약이 된다 |
| verbalizer | 이력, 컨텍스트, 아이템 메타데이터를 하나의 텍스트 시퀀스로 직렬화하는 구성 요소 |
| catalog-aware scoring head | pooled hidden state와 아이템 임베딩을 결합해 카탈로그 내 작품만 채점하는 head |
| prefill-only mode | prefill 단계만 실행하고 토큰 단위 decoding은 하지 않는 서빙 방식 |
| batch-compute surface | 미리 일괄 계산해 둔 추천을 보여 주는 추천 surface |

## 관련 페이지

- [[applications/li-2026-genrec-an-llm-backed-recommendation]]: 같은 팀의 arXiv 논문. 손실 수식, 관련 연구 분류, 데이터 scaling 수치 등 세부
- [[agents/anthropic-2025-effective-context-engineering-for-ai]]: 이 글이 인용한 context engineering 원 개념
- [[overviews/glossary-llms]]: post-training, distillation, scaling law 등 표기 기준
