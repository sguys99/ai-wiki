---
title: "GenRec: An LLM-Backed Recommendation Ranker at Netflix"
type: paper
year: 2026
category: applications
raw_path: raw/papers/li-2026-genrec-an-llm-backed-recommendation.pdf
raw_filename: "li-2026-genrec-an-llm-backed-recommendation.pdf"
source_collection: external
authors: "Ying Li, Shradha Sehgal, Arjun Rao, Rein Houthooft, Yunan Hu, Yaochen Zhu, Sourabh Medapati, Yun Li, Linas Baltrunas, Grace Huang, Ashish Rastogi, Kamelia Aryafar"
arxiv_id: "2608.10257"
doi: "10.48550/arXiv.2608.10257"
tags: [recommender-system, llm-ranker, post-training, context-engineering, reward-weighted-loss, prefill-only-inference, netflix]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/li-2026-genrec-an-llm-backed-recommendation/fig01.png
    raw: raw/papers/li-2026-genrec-an-llm-backed-recommendation-figures/fig01.png
    caption: "GenRec 추론 파이프라인. 사용자 이력, 아이템 정보, 컨텍스트 원본 로그를 verbalization으로 이벤트 텍스트로 바꾸고, vLLM에서 prefill-only로 실행되는 GenRec이 카탈로그 전체 점수를 내 추천 순위를 만든다"
    page: 3
    bbox_norm: [0.0902, 0.0924, 0.9298, 0.3476]
    strategy: manual
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/li-2026-genrec-an-llm-backed-recommendation/fig02.png
    raw: raw/papers/li-2026-genrec-an-llm-backed-recommendation-figures/fig02.png
    caption: "2단계 학습 프레임워크. 오픈소스 LLM과 Netflix 자체 데이터로 Phase 1 foundation LLM을 만들고, 랭킹 로그와 reward 신호로 잦은 주기의 Phase 2 post-training을 거쳐 GenRec을 얻는다"
    page: 4
    bbox_norm: [0.0781, 0.3525, 0.4903, 0.4752]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/li-2026-genrec-an-llm-backed-recommendation/fig03.png
    raw: raw/papers/li-2026-genrec-an-llm-backed-recommendation-figures/fig03.png
    caption: "온라인 A/B test 결과. production 모델 대비 단기 홈페이지 engagement 지표가 0.115%(P=3.1e-10), 장기 핵심 지표가 0.006%(P=0.025) 올라 둘 다 통계적으로 유의하다"
    page: 6
    bbox_norm: [0.5102, 0.0924, 0.9448, 0.3126]
    strategy: manual
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/li-2026-genrec-an-llm-backed-recommendation/fig04.png
    raw: raw/papers/li-2026-genrec-an-llm-backed-recommendation-figures/fig04.png
    caption: "약 10B 모델의 Phase 2 데이터 scaling. 학습 데이터를 1배에서 20배로 늘리면 정규화 오프라인 지표가 1.00에서 약 1.16으로 단조 증가한다"
    page: 7
    bbox_norm: [0.0977, 0.0981, 0.4706, 0.3002]
    strategy: caption-region
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/li-2026-genrec-an-llm-backed-recommendation/fig05.png
    raw: raw/papers/li-2026-genrec-an-llm-backed-recommendation-figures/fig05.png
    caption: "프롬프트에 담는 engagement 이벤트 수와 정규화 MRR의 관계. 현재 선택인 2N을 기준으로 N이면 7.9% 하락하고 3N이면 1.7%만 올라 수확 체감 구간에 들어선다"
    page: 8
    bbox_norm: [0.0781, 0.0981, 0.4903, 0.3216]
    strategy: caption-region
    curated: true
  - id: tab01
    label: Table 1
    kind: table
    file: assets/li-2026-genrec-an-llm-backed-recommendation/tab01.png
    raw: raw/papers/li-2026-genrec-an-llm-backed-recommendation-figures/tab01.png
    caption: "Phase 1과 Phase 2 학습의 기여. Phase 1은 오픈소스 모델 대비 MRR을 10~20%, Phase 2는 막 학습된 Phase 1 대비 35~50% 올리며 Phase 2의 이득은 시간이 지날수록 커진다"
    page: 7
    bbox_norm: [0.5097, 0.1275, 0.9268, 0.2236]
    strategy: table-region
    curated: true
---

## 한 줄 요약 (One-line Summary)

Netflix가 사내 foundation LLM을 추천 랭킹용으로 post-training한 GenRec을 소개하고, 수천 개의 수작업 feature에 의존하던 판별형 production ranker를 약 40배 적은 Phase 2 레이블 데이터로 오프라인 MRR 1.6% 상회, 온라인 A/B test 단기와 장기 지표 모두 유의한 개선으로 대체할 수 있음을 보인 산업 논문.

## 1. 자료 정보 (Document Information)

- **제목**: GenRec: An LLM-Backed Recommendation Ranker at Netflix
- **저자**: Ying Li, Shradha Sehgal, Arjun Rao, Rein Houthooft, Yunan Hu, Yaochen Zhu, Sourabh Medapati, Yun Li, Linas Baltrunas, Grace Huang, Ashish Rastogi, Kamelia Aryafar (Netflix. Sehgal과 Houthooft는 Netflix 재직 중 수행)
- **arXiv**: 2608.10257v2 [cs.IR], 2026-08-21
- **분량**: 본문 8쪽, 참고문헌 포함 9쪽
- **동반 자료**: 같은 팀이 Netflix Technology Blog에 쓴 해설 글 [[applications/netflix-2026-genrec-towards-llm-native-recommendation]]

## 2. 주요 기여 (Key Contributions)

논문은 기여를 다섯 가지로 정리한다.

| 기여 | 내용 |
|---|---|
| production에 견줄 LLM ranker | 사내 foundation LLM 위에 만든 GenRec이 오랜 기간 고도화된 production ranker보다 적은 Phase 2 학습 예시와 입력 신호로 주요 오프라인, 온라인 지표에서 통계적으로 유의한 개선을 낸다 |
| 2단계 학습 프레임워크 | Phase 1은 오픈소스 LLM을 Netflix 데이터에 적응시킨 foundation model, Phase 2는 추천 랭킹용 고빈도 post-training이다. 두 단계의 역할을 분리하고 각각의 기여를 수치로 분해한다 |
| catalog-aware scoring 구조 | decoder-only LLM backbone에 카탈로그 아이템만 채점하는 head를 결합해 대규모 후보 집합을 forward pass 한 번에 채점하고, 카탈로그 밖 아이템 추천을 원천 차단한다 |
| 품질과 비용 조절 수단 | context engineering으로 유효 컨텍스트 길이를 원래 토큰 예산의 약 3분의 1로 줄이면서 오프라인 품질 손실은 무시할 수준으로 유지하고, 서빙 비용도 비슷한 비율로 줄인다. reward-weighted ranking loss로 장기 가치와 비즈니스 목표를 반영한다 |
| scaling 관찰 | Phase 2 데이터와 backbone 크기에 따라 품질이 단조 증가함을 확인하고, 품질과 비용의 Pareto frontier에서 실용적인 sweet spot을 찾는 방법을 제시한다 |

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 출발점이 된 문제

Netflix의 현재 production 추천 시스템은 사용자, 아이템, 상호작용 신호에 걸친 수작업 feature와 고차 feature 상호작용을 대량으로 쓴다. feature 상호작용 전용 네트워크, 동적 관심사를 잡는 Transformer 구조, 여러 추천 과제를 함께 푸는 multi-task 구조처럼 과제마다 맞춤 구조도 갖고 있다. 이 스택은 영화, 시리즈, 게임, 라이브, 팟캐스트를 여러 해에 걸쳐 지원해 왔지만, 새 콘텐츠 유형이나 추천 surface를 추가할 때마다 feature engineering, 구조 설계, 인프라 변경, 실험에 큰 비용이 든다.

반면 기성 LLM을 그대로 추천기로 쓰면 네 가지 문제가 생긴다.

- 전역적으로 인기 있는 콘텐츠를 과도하게 추천한다
- 카탈로그에 없는 작품을 환각으로 만들어 낸다
- 세밀한 비즈니스 제약을 무시한다
- 개인화 수준이 제한적이다

### 문제 설정

GenRec은 full-catalog ranking 문제를 푼다 (후보 집합이 주어지면 top-K ranking). 결과 순위 목록은 여러 surface의 아이템 랭킹이나 하위 애플리케이션의 개인화 입력 신호로 재사용된다.

| 기호 | 뜻 |
|---|---|
| U | 사용자 집합 |
| C | 아이템 카탈로그 (영화, 쇼, 게임, 라이브 이벤트, 팟캐스트 등) |
| X | 컨텍스트 공간 (device, surface, locale, 시간대 등) |
| (u, τ, t) | 한 번의 추천 요청을 이루는 사용자, 컨텍스트, 시각 |
| H | 시각 t 이전의 사용자 상호작용 이력 |
| M_i | 아이템 i의 메타데이터 (제목, 장르, 줄거리, 공개일 등) |
| π | 카탈로그 C 위의 순위 함수. π(i)는 아이템 i의 위치(1위가 맨 위) |

목표는 단기 engagement만이 아니라 기대 장기 회원 효용(만족과 유지의 proxy)을 최대화하는 순위 π를 고르는 것이다.

### 2단계 학습 프레임워크

Phase 1은 오픈소스 모델 위에 Netflix 자체 데이터로 foundation LLM을 학습해 사용자와 콘텐츠 이해를 기른다. Phase 2는 이 foundation model을 랭킹 과제 전용 데이터와 목적 함수로 post-training해 GenRec을 만든다. 두 단계는 세 가지 측면에서 다르다.

| 측면 | Phase 1 | Phase 2 (GenRec) |
|---|---|---|
| 능력 초점 | world knowledge, 개인화, 콘텐츠 이해, 언어 능력을 넓게 균형 잡는다 | 랭킹 품질과 recommendation steering에 집중한다 |
| 갱신 주기 | 비교적 드물게 갱신한다 (장기적 사용자와 콘텐츠 이해) | 신작 공개, 인기 변화, 최근 관심사를 따라가도록 자주 갱신한다 |
| 비용 민감도 | 가장 능력 있는 모델이 목표이며 서빙 비용 제약이 약하다 | 대규모 트래픽을 서빙하므로 비용 효율이 명시적 목표다 |

### post-training 데이터: 대화 형식

Netflix 회원은 영화, 쇼, 게임, 라이브 등에 걸쳐 수천억 건의 상호작용 이벤트(시청, 재생, 평가, 목록 추가 등)를 만든다. 논문은 한 회원의 이력을 사용자와 추천기 사이의 단일 턴 또는 멀티턴 "대화"로 변환한다. 각 턴은 user message와 assistant message의 쌍이다.

| 구성 요소 | 담는 내용 |
|---|---|
| Context | surface, 시간, device, locale 등 |
| User profile & history | 국가, 가입 기간, 요금제, 과거 상호작용 등 |
| Item-level detail | 아이템 ID, 메타데이터(제목, 공개 시점, 줄거리 등), 인기 추세 등 |
| Task | 예: 사용자가 다음에 재생하거나 좋아요를 누를 아이템 예측 |
| Assistant message | 사용자의 암묵적, 명시적 피드백(재생, 재생 시간, 이탈, 평가 등). 학습 시 정답 신호다 |

Phase 2 학습은 assistant message가 앞선 user message에 어떻게 의존하는지를 모델링한다. 이 대화 형식은 추천 로그를 텍스트로 표현하는 통일된 방식이며, 언어 모델링 목적과 catalog-aware ranking 목적 모두에 쓰인다.

### 입력 verbalization과 context engineering

GenRec은 상호작용과 메타데이터를 수작업 feature나 dense 임베딩으로 인코딩하지 않고, 자연어나 가볍게 구조화한 텍스트로 풀어 쓴다(verbalization). 원래 신호를 LLM의 의미 공간에 직접 두고 아이템 관계, 시간 동역학, 변하는 관심사 같은 고차 패턴을 모델이 스스로 학습하게 한다.

verbalization은 단순한 텍스트 변환이 아니라 유한한 토큰 예산 안에 긴 사용자 이력을 담는 context engineering 문제다. 상호작용 수가 많고 이벤트마다 메타데이터가 풍부해 이력이 예산을 쉽게 넘는다. 과도하게 긴 컨텍스트는 attention을 희석하고 학습과 추론 비용을 크게 늘린다. 그래서 어떤 이벤트와 속성을 context window에 담을지 네 가지 규칙으로 고른다.

| 규칙 | 대상 | 처리 |
|---|---|---|
| Retain in full | 긴 재생, 좋아요 같은 high-signal engagement | 풍부한 메타데이터와 함께 풀어 쓴다 |
| Omit entirely | 매우 짧은 재생, 노이즈성 조회와 클릭 같은 low-signal 이벤트 | 토큰 비용 대비 랭킹 기여가 작아 뺀다 |
| Summarize or compress | 몰아보기(binge-watching) 같은 반복 행동 | 이벤트를 매번 나열하지 않고 압축한다 |
| Elaborate selectively | 신작, cold-start 아이템 같은 중요 아이템 | pre-training 모델과 이력의 정보 부족을 메우도록 메타데이터를 더 자세히 쓴다 |

고정된 토큰 예산 안에서 단기에서 중기 이력은 높은 해상도로 쓰고, 오래된 이력은 생략하거나 짧은 관심사 요약으로 압축한다.

### post-training 목적 함수

Phase 2 학습은 두 목적을 주로 결합한다.

1. **Recommendation ranking objective**: 주 과제다. 높은 가치의 engagement(충분히 긴 재생, 강한 명시적 피드백)를 positive 레이블로 삼고, 콘텐츠 유형마다 다른 denoising 로직과 임계값을 적용한다. 카탈로그(또는 후보 집합) 위의 cross entropy loss로 verbalized 컨텍스트에서 좋은 순서를 내도록 학습한다.
2. **Language modeling objective**: verbalized 입력과 출력(예측 제목 등 텍스트 필드)에 대한 언어 모델링 목적이다. backbone의 일반 언어 이해와 생성 능력을 유지해 (i) 자연어 이력과 메타데이터 모델링, (ii) 프롬프트 기반 recommendation steering을 가능하게 한다.

학습 시에는 두 목적을 함께 최적화하고, 추론 시에는 현재 ranking 과제만 사용한다. 언어 모델링 목적은 랭킹에 보완적 텍스트 정보를 주고, 프롬프트 steering 반응성을 지키며, 추천 설명 같은 향후 텍스트 생성 용도를 열어 둔다.

전체 손실은 다음과 같다.

`L = α × L_ranking + β × L_language + γ × L_miscellaneous`, 단 `α + β + γ = 1`, `α, β, γ ≥ 0`

α, β, γ는 오프라인 실험으로 조정하는 hyperparameter다.

### 모델 구조

backbone은 foundation LLM과 같은 decoder-only Transformer이며 next-token prediction 계열 목적으로 학습된다. 여기에 Netflix 카탈로그 내 아이템만 채점하는 catalog-aware ranking head를 결합한다. 점수는 세 단계로 계산한다.

| 단계 | 처리 |
|---|---|
| Verbalization | verbalizer V가 이력 H, 컨텍스트 τ, 아이템 메타데이터 {M_i}를 하나의 텍스트 시퀀스 x = V(H, {M_i}, τ)로 만든다 |
| Pooled representation | LLM이 x를 인코딩하고, pooling 위치의 hidden state를 d차원 표현 h로 쓴다. h는 사용자 선호와 컨텍스트를 요약한다 |
| Catalog-aware scoring | scoring head φ가 h와 아이템별 학습된 d차원 임베딩 e_i를 결합해 점수를 낸다 |

LLM 가중치, scoring head φ, 아이템 임베딩 {e_i}는 모두 함께 학습된다. 카탈로그 전체에 softmax를 적용해 확률 분포로 바꾸고 점수에서 순위 π를 얻는다. 카탈로그가 너무 커서 전수 채점이 어려우면 sampled softmax를 결합한다.

### reward 신호

GenRec은 정확도 외에 두 목표를 더 만족해야 한다.

- 콘텐츠 혼합 로직 같은 비즈니스 요구 준수 (영화, 쇼, 라이브, 게임, 팟캐스트의 균형)
- 단기 engagement가 아니라 장기 회원 만족 최대화

원래 상호작용 시퀀스로만 학습하면 탐색보다 몰아보기를 과하게 추천하거나, 게임보다 영상을 선호하거나, 카탈로그 탐색과 장기 유지를 희생하고 즉각적인 클릭을 최대화하는 쪽으로 흐를 위험이 있다. 이를 막기 위해 별도 reward model들의 신호를 학습 목적에 반영한다.

| reward 유형 | 내용 |
|---|---|
| Long-term satisfaction proxies | 단기 engagement가 장기 결과와 얼마나 강하게 연관되는지 추정한다. 실제 장기 지표는 노이즈가 크고 늦게 나오므로 과거 데이터로 학습한 안정적인 proxy를 쓴다. 서비스 재방문, 카탈로그의 넓은 영역 탐색, 지속적 engagement로 이어지는 행동에 높은 값을 준다 |
| Behavior rebalancing | 콘텐츠 유형(영화, 게임, 라이브, 팟캐스트)과 공개 단계(공개 전, 신작, 스테디셀러) 사이의 행동을 재조정해 콘텐츠 유형 간 노출 공정성 같은 비즈니스 목표를 맞춘다 |

기존 reward modeling 프레임워크의 여러 reward model 출력을 reward-weighted ranking loss로 통합한다. 학습 예시마다 여러 reward 신호에서 도출한 스칼라 가중치를 붙이고, 그 예시의 ranking loss에 곱한다. 높은 가치의 engagement는 가중치가 커지고, 낮은 가치이거나 바람직하지 않은 행동은 가중치가 줄어든다.

저자들은 이 방식이 완전한 강화학습보다 배포와 유지가 쉽고 단순하며 안정적이라고 본다. 예비 실험에서 GRPO 같은 강화학습 계열 방법이 supervised fine-tuning 대비 추가 이득을 보였지만 학습 오버헤드가 커서 향후 과제로 남겼다.

### 온라인 서빙과 비용 최적화

GenRec은 vLLM 기반 Netflix 사내 LLM 서빙 스택에서 서빙된다. 수억 명 회원 규모에서 서빙 비용은 1순위 제약이며, 추론 비용은 대략 모델 크기와 컨텍스트 길이의 곱에 비례한다. 비용을 세 가지 수단으로 조절한다.

| 수단 | 내용 |
|---|---|
| 작은 모델과 distillation 모델 | 더 크거나 더 목표 지향적인 데이터로 작은 모델이나 distillation 모델을 학습해 큰 모델 품질의 상당 부분을 낮은 요청당 연산으로 회복한다 |
| 컨텍스트 길이 압축 | verbalization compaction으로 입력 신호를 표현하는 토큰을 줄이되 오프라인 랭킹 품질을 크게 떨어뜨리지 않는다 |
| 추론 모드 | 대규모 후보 집합에 autoregressive decoding(토큰 단위 생성이나 beam search)을 쓰면 비용이 감당할 수 없이 크다. backbone은 autoregressive decoding이 가능한 생성형 모델이지만 의도적으로 prefill-only로 배포해 입력을 한 번만 읽고 forward pass 한 번에 전체 후보 순위를 낸다 |

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### production baseline 대비

비교 대상은 여러 해 동안 조정된 성숙한 판별형 production 모델이다.

| 평가 | 결과 |
|---|---|
| 오프라인 MRR | production 대비 Phase 2 레이블 학습 예시를 약 40배 적게 쓰고도 MRR이 상대 약 1.6% 높다. 학습 데이터와 입력 신호를 더 늘리면 계속 개선된다 |
| 온라인 A/B test 설정 | 주요 batch-compute surface, Netflix 트래픽 약 10%, 4주 |
| 단기 홈페이지 engagement 지표 | +0.115%, P = 3.1 × 10^-10 (유의) |
| 장기 핵심 지표 | +0.006%, P = 0.025 (유의). Netflix 규모에서 통계적으로 의미 있는 개선이다 |

이 결과는 저데이터, 저신호 설정에서 나왔다. Phase 2가 Phase 1보다 훨씬 자주 갱신되므로 이 단계의 한계 데이터 효율(marginal data efficiency)은 ranker를 최신으로 유지하는 연산을 직접 줄인다.

### 데이터와 모델 scaling

- **데이터 scaling**: 다른 변수를 고정하고 가장 작은 데이터 설정의 1배에서 20배까지 Phase 2 데이터를 늘렸다. 약 1B와 약 10B 두 backbone 모두 MRR이 단조 증가한다. 약 1B 모델은 절대 MRR이 낮지만 scaling 패턴은 비슷하다. 약 10B 모델의 정규화 지표는 1배 1.00, 2배 약 1.05, 5배 약 1.11, 10배 약 1.14, 20배 약 1.16이다 (Figure 4 판독값).
- **모델 scaling**: 같은 GPU 구성과 비슷한 wall-clock 시간이라는 고정 학습 예산 아래 약 1B에서 약 10B까지 base model을 바꿔 post-training했다. 큰 backbone이 일관되게 높은 오프라인 MRR을 낸다.
- **품질과 비용의 절충**: 데이터와 모델을 키우면 학습과 서빙 비용도 늘어난다. 고빈도로 재학습하고 대규모 트래픽을 직접 서빙하는 GenRec에는 특히 부담이다. scaling 곡선과 컨텍스트 길이 ablation을 함께 보고, 달성 가능한 품질 개선 대부분을 회복하면서 연산 예산 안에 머무는 Pareto frontier 위의 sweet spot을 고른다.

### Phase 1과 Phase 2의 기여

| 비교 | 오프라인 랭킹 지표 변화 | 해석 |
|---|---|---|
| Phase 1 foundation LLM vs 기성 오픈소스 LLM을 backbone으로 사용 | +10~20% | Phase 1에서 물려받은 개인화와 콘텐츠 이해 능력이 중요하다 |
| Phase 2 post-training vs Phase 1 (Phase 1 학습 cutoff 시점 평가) | +35~50% | 도메인 데이터, reward, verbalization을 포함한 과제 특화 적응의 가치 |
| 같은 비교, 2주 뒤 | 약 +80% | 과제 특화 적응의 효과에 더해, 드물게 갱신되는 Phase 1 backbone이 인기 변화와 관심사 변화에 뒤처지는 staleness가 커진다 |

### 컨텍스트 길이 최적화

컨텍스트는 품질과 비용을 함께 결정한다. 앞의 verbalization 규칙을 토대로 세 단계로 최적화한다.

1. **이벤트 선택과 압축**: low-signal과 노이즈 engagement를 빼고 반복 행동을 압축하고 high-signal 상호작용을 남겨, 정렬된 후보 engagement 시퀀스를 만든다.
2. **최적 이력 길이 탐색**: 남길 이벤트 수를 바꿔 가며 MRR을 그린다. 일정 지점(elbow point)까지는 품질이 오르고 그 뒤로는 추가 토큰의 이득이 미미하다. Figure 5에서 현재 선택 2N 대비 N은 -7.9%, 3N은 +1.7%다.
3. **간결한 verbalization 구성**: 남긴 이벤트마다 상세 수준(engagement 세부 항목, 단순화한 문구, few-shot 예시 제거)을 바꿔 오프라인 성능을 측정한다.

결과적으로 컨텍스트 길이를 원래 토큰 예산의 약 3분의 1(예: 약 5,000 토큰에서 약 1,700 토큰)로 줄여도 오프라인 랭킹 지표 저하가 무시할 수준이다. GenRec은 대체로 compute-bound이고 서빙 비용이 컨텍스트 길이에 거의 비례하므로 서빙 비용도 원래의 약 3분의 1로 줄었다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **검증 범위**: 결과는 batch-compute surface라는 시험한 추천 surface와 설정에 한정된다. 저자들은 LLM 기반 ranker가 "적어도 일부 시나리오"에서 유망하다고 표현한다.
- **강화학습 미적용**: GRPO 같은 강화학습 계열 방법이 예비 실험에서 추가 이득을 보였지만 학습 오버헤드 때문에 향후 과제로 남겼다.
- **텍스트 생성 미사용**: 추론 시에는 ranking head만 쓰며, 추천 설명 같은 자연어 생성 용도는 가능성으로만 열어 두었다.
- **비용 관리 부담**: LLM은 본질적으로 학습과 서빙이 비싸다. 비용과 인프라 복잡도를 계속 관리하고, 강한 비LLM baseline 대비 품질 절충을 엄밀하게 평가해야 한다고 결론에서 강조한다.
- **Phase 1 staleness**: Phase 2 이득이 2주 만에 35~50%에서 약 80%로 커진다는 관찰은 Phase 1이 빠르게 낡는다는 뜻이기도 하다.
- **공개되지 않은 세부**: 온라인 지표의 정확한 정의, 모델의 정확한 파라미터 수, reward model 구조, 손실 가중치 값은 공개하지 않는다. Figure 1의 verbalization 예시도 실제 사용자 데이터가 아닌 예시다.

## 6. 관련 연구 (Related Work)

| 계열 | 대표 연구 | GenRec과의 관계 |
|---|---|---|
| 특수 토큰 기반 생성형 추천 | SASRec, BERT4Rec (아이템 ID 시퀀스의 next-item prediction). PinRec 등 산업 시스템은 아이템 ID, 메타데이터, locale, 시간, device, surface를 특수 토큰으로 어휘에 추가 | world knowledge 활용, 유연한 프롬프트 steering, pre-training 언어 모델 능력 상속이 제한적이다 |
| Semantic ID 토큰화 | TIGER (RQ-VAE로 학습한 semantic ID), Google 랭킹, Kuaishou OneRec (검색과 랭킹 통합) | 수십억 아이템 카탈로그에서 autoregressive decoding이 가능하다 |
| LLM 기반 추천 | 초기 text-to-text 연구(TALLRec 등). Google PLUM (YouTube 규모, Semantic ID와 continued pre-training), Spotify GLIDE (팟캐스트 탐색을 Semantic ID 카탈로그 위 instruction following으로), Kuaishou OneRec-Think (Qwen3 backbone과 추론 단계) | 대부분 beam search 기반 autoregressive decoding을 써서 대규모 후보 집합에서 지연이 크다. GenRec은 catalog-aware ranking head로 forward pass 한 번에 채점한다 |

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| GenRec | Netflix 사내 foundation LLM을 추천 랭킹 데이터와 reward로 post-training한 LLM 기반 recommendation ranker |
| Phase 1 / Phase 2 | Phase 1은 오픈소스 LLM을 Netflix 데이터에 적응시킨 foundation LLM 학습, Phase 2는 그 모델을 랭킹 과제에 맞춰 자주 재학습하는 post-training |
| verbalization | 사용자 이력, 컨텍스트, 아이템 메타데이터를 자연어나 가볍게 구조화한 텍스트로 풀어 쓰는 입력 표현 방식 |
| catalog-aware ranking head | LLM의 pooled hidden state와 아이템별 학습 임베딩을 결합해 카탈로그 내 아이템만 채점하는 출력 head |
| reward-weighted ranking loss | reward model 신호로 만든 예시별 스칼라 가중치를 ranking loss에 곱해 장기 가치와 비즈니스 목표를 반영하는 학습 방식 |
| prefill-only inference | 생성형 모델을 토큰 단위 decoding 없이 입력을 한 번 읽는 prefill 단계만으로 실행해 후보 전체 점수를 내는 추론 방식 |
| MRR | Mean Reciprocal Rank. 정답 아이템 순위의 역수를 평균낸 랭킹 지표 |
| elbow point | 이벤트 수를 늘릴 때 품질 곡선의 기울기가 꺾여 추가 컨텍스트의 이득이 작아지기 시작하는 지점 |
| marginal data efficiency | 추가로 투입한 Phase 2 레이블 데이터 단위당 얻는 품질 이득. Phase 2가 자주 갱신되므로 실무 가치가 크다 |

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 3 | GenRec 추론 파이프라인 (원본 로그, verbalization, LLM, 카탈로그 점수, 추천 순위) | manual | ★ wiki 권장 (architecture) |
| fig02 | 4 | 2단계 학습 프레임워크 (Phase 1 foundation LLM, Phase 2 post-training) | caption-region | ★ wiki 권장 (method) |
| fig03 | 6 | 온라인 A/B test 단기와 장기 지표 | manual | ★ wiki 권장 (result) |
| fig04 | 7 | 약 10B 모델의 Phase 2 데이터 scaling 곡선 | caption-region | ★ wiki 권장 (result) |
| fig05 | 8 | engagement 이벤트 수와 MRR의 elbow point | caption-region | ★ wiki 권장 (result) |
| tab01 | 7 | Phase 1과 Phase 2의 기여 | table-region | ★ wiki 권장 (result) |
