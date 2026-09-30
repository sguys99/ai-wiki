---
title: "GenRec: Towards LLM-Native Recommendation at Netflix"
type: article
year: 2026
category: applications
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
  - id: fig03
    file: assets/netflix-2026-genrec-towards-llm-native-recommendation/fig03.png
    raw: raw/articles/netflix-2026-genrec-towards-llm-native-recommendation-figures/fig03.png
    caption: "약 10B 모델의 Phase 2 데이터 scaling. 학습 데이터를 1배에서 20배로 늘리면 정규화 오프라인 지표가 단조 증가한다"
    strategy: fetched
    curated: false
  - id: fig04
    file: assets/netflix-2026-genrec-towards-llm-native-recommendation/fig04.png
    raw: raw/articles/netflix-2026-genrec-towards-llm-native-recommendation-figures/fig04.png
    caption: "프롬프트에 담는 engagement 이벤트 수와 오프라인 MRR의 관계. 점선의 elbow point를 넘기면 이벤트를 더 담아도 이득이 작다"
    strategy: fetched
    curated: true
  - id: fig05
    file: assets/netflix-2026-genrec-towards-llm-native-recommendation/page-full.png
    raw: raw/articles/netflix-2026-genrec-towards-llm-native-recommendation-figures/page-full.png
    caption: "블로그 글 전체 페이지 스크린샷"
    strategy: screenshot
    curated: false
  - id: fig06
    file: assets/netflix-2026-genrec-towards-llm-native-recommendation/crop01.png
    raw: raw/articles/netflix-2026-genrec-towards-llm-native-recommendation-figures/crop01.png
    caption: "영역 크롭 1번. Medium 가입 모달이 도식 위를 덮은 화면"
    strategy: crop
    curated: false
  - id: fig07
    file: assets/netflix-2026-genrec-towards-llm-native-recommendation/crop02.png
    raw: raw/articles/netflix-2026-genrec-towards-llm-native-recommendation-figures/crop02.png
    caption: "영역 크롭 2번. Medium 가입 모달의 이메일 입력란"
    strategy: crop
    curated: false
  - id: fig08
    file: assets/netflix-2026-genrec-towards-llm-native-recommendation/crop03.png
    raw: raw/articles/netflix-2026-genrec-towards-llm-native-recommendation-figures/crop03.png
    caption: "영역 크롭 3번. Medium 가입 모달의 로그인 유지 체크박스"
    strategy: crop
    curated: false
  - id: fig09
    file: assets/netflix-2026-genrec-towards-llm-native-recommendation/crop04.png
    raw: raw/articles/netflix-2026-genrec-towards-llm-native-recommendation-figures/crop04.png
    caption: "영역 크롭 4번. Medium 가입 모달 화면 일부"
    strategy: crop
    curated: false
  - id: fig10
    file: assets/netflix-2026-genrec-towards-llm-native-recommendation/crop05.png
    raw: raw/articles/netflix-2026-genrec-towards-llm-native-recommendation-figures/crop05.png
    caption: "영역 크롭 5번. Medium 가입 모달 화면 일부"
    strategy: crop
    curated: false
  - id: fig11
    file: assets/netflix-2026-genrec-towards-llm-native-recommendation/crop06.png
    raw: raw/articles/netflix-2026-genrec-towards-llm-native-recommendation-figures/crop06.png
    caption: "영역 크롭 6번. Medium 가입 모달 화면 일부"
    strategy: crop
    curated: false
  - id: fig12
    file: assets/netflix-2026-genrec-towards-llm-native-recommendation/crop07.png
    raw: raw/articles/netflix-2026-genrec-towards-llm-native-recommendation-figures/crop07.png
    caption: "영역 크롭 7번. Medium 가입 모달 화면 일부"
    strategy: crop
    curated: false
  - id: fig13
    file: assets/netflix-2026-genrec-towards-llm-native-recommendation/crop08.png
    raw: raw/articles/netflix-2026-genrec-towards-llm-native-recommendation-figures/crop08.png
    caption: "영역 크롭 8번. Medium 가입 모달 전체와 계정 생성 버튼"
    strategy: crop
    curated: false
  - id: fig14
    file: assets/netflix-2026-genrec-towards-llm-native-recommendation/crop09.png
    raw: raw/articles/netflix-2026-genrec-towards-llm-native-recommendation-figures/crop09.png
    caption: "영역 크롭 9번. Medium 가입 모달 화면 일부"
    strategy: crop
    curated: false
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

## 한 줄 요약 (One-line Summary)

Netflix 추천팀이 LLM 기반 recommendation ranker GenRec의 설계(verbalization, 대화 형식 학습 데이터, 다목적 손실, catalog-aware scoring head, prefill-only 서빙)와 실험 결과를 소개하고, 추천 시스템이 feature engineering에서 context engineering으로, 과제별 맞춤 구조에서 공유 foundation backbone으로 옮겨 가는 "LLM-native recommendation"의 방향을 제시한 기술 블로그 글.

## 1. 자료 정보 (Document Information)

- **제목**: GenRec: Towards LLM-Native Recommendation at Netflix
- **저자**: Ying Li, Arjun Rao, Shradha Sehgal (Netflix Technology Blog 게시)
- **발행**: 2026-07-30, Netflix Technology Blog (Medium), 12분 분량
- **원문 URL**: https://netflixtechblog.com/genrec-towards-llm-native-recommendation-at-netflix-f20be6f643e3
- **관계**: 같은 팀의 arXiv 논문 [[applications/li-2026-genrec-an-llm-backed-recommendation]] (2026-08)보다 먼저 공개된 해설 글이다. 논문과 수치와 구조가 일치하며, 논문에 없는 서술(예: 서빙 비용 결정 요인 3가지, "prompt가 새로운 feature vector"라는 표현)이 일부 있다.
- **수집 메모**: 원문 이미지 6개 중 스크립트가 4개만 받아 Figure 2와 Phase 비교 표 이미지를 원본 URL에서 보충했다 (fig15, fig16). 크롭 9장은 Medium 가입 모달을 잡아 도식으로 쓸 수 없다.

## 2. 주요 기여 (Key Contributions)

- **문제 제기**: 수천 개의 수작업 feature와 과제별 전용 구조에 기대는 기존 스택은 새 콘텐츠 유형이나 surface 추가 비용이 크다. 기성 LLM은 인기작 과추천, 카탈로그 밖 작품 환각, 비즈니스 제약 무시, 약한 개인화 때문에 그대로 production 추천기로 쓸 수 없다.
- **GenRec 설계 다섯 요소**: 이력, 메타데이터, 컨텍스트의 텍스트화. Netflix 적응 foundation LLM의 랭킹용 post-training. Netflix 작품만 채점하는 catalog-aware scoring head. 장기 회원 가치와 비즈니스 목표를 위한 reward 신호. 비용 효율을 위한 prefill-only 실행.
- **결과**: 잘 조정된 production ranker 대비 대규모 A/B test에서 단기와 장기 온라인 지표 모두 통계적으로 유의한 개선을 얻었고, Phase 2 레이블 데이터와 입력 신호는 일부만 썼다.
- **패러다임 전망**: feature engineering에서 context engineering으로, 맞춤 구조에서 foundation backbone으로, scaling law를 설계 지침으로, RecSys 인프라에서 LLM 인프라로 넘어가는 네 가지 변화를 정리한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 문제 설정

full-catalog ranking(후보 집합이 있으면 top-K ranking) 과제다. 사용자 u, 상호작용 이력 H, 현재 컨텍스트 τ(device, surface, locale, 시간 등)가 주어지면 각 아이템을 채점해 개인화 순위를 만든다. 순위는 추천에 바로 쓰거나 하위 개인화 시스템의 입력이 된다. 형식적으로는 요청 (u, τ, t, H)를 카탈로그 C 위의 순위 π로 사상하며, 단기 engagement가 아니라 기대 장기 회원 효용(만족과 유지의 proxy)을 최적화한다.

### 2단계 학습

| 단계 | 내용 |
|---|---|
| Phase 1: Netflix 적응 foundation LLM | 오픈소스 LLM을 Netflix 자체 코퍼스로 적응시켜 콘텐츠 이해, 회원 행동과 선호 패턴, 일반 언어 이해와 생성 능력을 기른다. 비교적 드물게 갱신되며 여러 애플리케이션이 공유하는 backbone이다 |
| Phase 2: GenRec | 랭킹 전용 데이터와 목적으로 post-training한다. 랭킹 품질과 steering에 집중하고, reward-weighted loss로 여러 reward 신호를 반영하며, 신작과 취향 변화를 따라 더 자주 갱신되고, 서빙 비용 제약 아래 명시적으로 최적화된다 |

### 대화 형식 학습 데이터

회원들은 여러 surface에서 수천억 건의 상호작용 이벤트(조회, 재생, 재생 시간, 좋아요와 싫어요, 목록 추가, 이탈 등)를 만든다. 이를 사용자와 추천기 사이의 단일 턴 또는 멀티턴 대화로 바꾼다.

- **User message**: verbalized 컨텍스트, 프로필, 이력, 아이템 메타데이터, 과제(예: 다음에 시청하거나 좋아요를 누를 작품 추천)
- **Assistant message**: 회원의 실제 engagement (어떤 작품을 얼마나 재생했고 어떤 피드백을 남겼는지)

Phase 2 학습에서 LLM은 assistant message가 user message에 어떻게 의존하는지 배운다. 추론 시에는 verbalized 컨텍스트를 넣고 catalog-aware scoring head로 채점할 뿐 assistant message를 decoding하지 않는다. 대화 형식은 주로 학습 단계에서 LM 목적을 지원하고 텍스트 이해 능력을 유지하는 데 쓰인다.

### verbalization과 context engineering

GenRec은 dense feature와 임베딩 대신 이력과 컨텍스트를 자연어로 풀어 LLM 의미 공간에 직접 둔다. 아이템 관계나 관심사 변화 같은 고차 패턴 발견은 수작업 feature가 아니라 모델에 맡긴다.

모든 상호작용을 그대로 풀어 쓰면 토큰 예산을 넘고 Netflix 규모에서 비용이 너무 크다. 글은 context window가 새로운 "feature budget"이 된다고 표현하고, Anthropic의 context engineering 글을 인용하며 네 가지 규칙을 적용한다.

| 규칙 | 대상 |
|---|---|
| Retain in full | 긴 재생, 좋아요 같은 high-signal engagement를 더 풍부한 세부와 함께 |
| Omit | 매우 짧은 재생이나 빠른 hover 같은 low-signal 이벤트 |
| Summarize or compress | 몰아보기 같은 반복 행동 |
| Elaborate selectively | 신작이나 cold-start 아이템 같은 중요 아이템 |

고정 토큰 예산 안에서 최근의 high-signal 이력을 우선하고 오래된 이력은 압축하거나 버린다. prefix caching 효율을 높이도록 공유 접두부가 최대가 되게 프롬프트를 구조화한다는 점도 명시한다.

### 목적 함수 세 가지

1. **Catalog-aware ranking objective**: 충분히 긴 재생, 강한 명시적 피드백 같은 고가치 engagement를 임계값과 denoising 로직으로 positive 레이블화하고, 카탈로그나 후보 집합 위 cross-entropy loss로 학습한다.
2. **Language modeling objective**: verbalized 입력과 출력에 대한 LM 목적을 유지해 일반 언어 이해를 보존하고, 풍부한 자연어 이력과 메타데이터 해석 능력을 높이며, 추천 설명 같은 텍스트 생성 용도를 열어 둔다.
3. **Reward-weighted loss**: 영화, 시리즈, 게임, 라이브, 팟캐스트 균형 같은 비즈니스 요구와 장기 만족을 위해, 별도 reward model 신호로 예시별 스칼라 가중치를 만들어 ranking loss에 곱한다.

reward 신호는 두 종류다.

| 신호 | 내용 |
|---|---|
| Long-term satisfaction proxies | 단기 engagement가 재방문, 카탈로그 탐색, 지속적 engagement 같은 장기 결과에 얼마나 기여하는지 추정 |
| Behavior rebalancing | 콘텐츠 유형과 공개 단계(게임 vs 영화, 신작 vs 스테디셀러) 사이 행동을 비즈니스 목표에 맞게 조정 |

원래 상호작용 시퀀스만으로 학습하면 몰아보기를 과도하게 선호하거나 한 콘텐츠 유형에 쏠린다. reward-weighted 방식은 완전한 강화학습보다 단순하고 비용 효율적이면서 실제로 효과적인 alignment를 제공한다. GRPO 같은 강화학습 계열 방법에서 추가 이득을 확인했지만 비용 때문에 향후 과제로 남겼다.

### 모델 구조와 scoring

backbone은 foundation LLM과 같은 decoder-only Transformer이고, Netflix 카탈로그 내 아이템만 채점하는 catalog-aware ranking head를 결합한다.

| 단계 | 처리 |
|---|---|
| Verbalization | verbalizer V가 이력 H, 컨텍스트 τ, 관련 아이템 메타데이터를 하나의 텍스트 시퀀스 x로 직렬화 |
| Pooled representation | LLM이 x를 처리하고, 현재 선호와 컨텍스트를 요약하는 pooled hidden state h를 추출 |
| Catalog-aware scoring | 카탈로그 아이템 i마다 학습된 임베딩 e_i가 있고, scoring head φ가 h와 e_i를 결합(내적이나 작은 MLP)해 점수 s_i를 낸다. softmax로 확률 분포를 만들고 순위 π로 바꾼다 |

backbone, scoring head, 아이템 임베딩을 모두 함께 학습한다. 카탈로그가 매우 크면 sampled softmax나 후보 집합을 써서 학습과 추론을 효율화한다.

### 서빙과 비용 최적화

GenRec은 vLLM을 쓰는 Netflix 사내 LLM 스택에서 서빙된다. Netflix 규모에서 서빙 비용의 주요 결정 요인은 세 가지다: 모델 크기, 컨텍스트 길이, 추론 모드(prefill vs autoregressive decoding). 이에 대응하는 세 전략은 다음과 같다.

| 전략 | 내용 |
|---|---|
| 작은 모델과 distillation 모델 | 더 크거나 목표 지향적인 데이터셋으로 작은 모델을 학습해 큰 모델 품질의 대부분을 낮은 비용으로 확보 |
| 공격적인 컨텍스트 압축 | 앞의 context engineering으로 토큰을 최소화하면서 랭킹 품질 유지 |
| Prefill-only inference | 대규모 후보 집합에 autoregressive decoding을 쓰면 비용이 너무 크다. 모델이 프롬프트를 한 번 읽고 forward pass 한 번에 후보 전체를 채점하며 토큰 단위 decoding을 하지 않는다 |

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### production baseline 대비

baseline은 수천 개의 dense feature와 임베딩 feature, feature 상호작용과 시퀀스 모델링용 맞춤 구조를 갖춘, 여러 해 조정된 production ranker다.

| 평가 | 결과 |
|---|---|
| 오프라인 | Phase 2 레이블 학습 예시를 약 40배 적게 쓰고 MRR 약 +1.6%. 데이터와 입력 신호를 늘리면 계속 개선 |
| 온라인 A/B test | batch-compute 추천 surface, Netflix 트래픽 약 10%, 약 4주. 저데이터, 저신호 설정에서 단기와 장기 온라인 지표 모두 통계적으로 유의한 개선 (Figure 3: 단기 홈페이지 engagement +0.115%, 장기 핵심 지표 +0.006%) |

### 데이터, 모델, Phase 기여

| 실험 | 결과 |
|---|---|
| 데이터 scaling | 약 1B, 약 10B backbone 모두 Phase 2 데이터가 늘수록 오프라인 MRR이 오른다. 큰 모델이 절대 MRR은 높지만 scaling 곡선 모양은 비슷하다 |
| 모델 scaling | 고정 학습 예산 아래 약 1B에서 약 10B 변형을 비교하면 큰 backbone이 일관되게 높은 MRR을 낸다 |
| Phase 1 vs 오픈소스 | Phase 1 foundation LLM을 base로 쓰면 기성 LLM에서 바로 시작할 때보다 오프라인 랭킹 지표가 약 10~20% 높다 |
| Phase 2 vs Phase 1 | Phase 1 학습 cutoff 부근(가장 최신일 때) 평가에서 35~50% 추가 이득. 시간이 지나 Phase 1이 신작과 취향 변화에 뒤처지면 2주 뒤 약 80%로 커진다 |
| 데이터 효율 | 강한 Phase 1에서 시작하면 설정에 따라 10~40배 적은 Phase 2 레이블로 production ranker와 같거나 더 나은 성능. Phase 2가 Phase 1보다 훨씬 자주 갱신되므로 이 한계 데이터 효율이 특히 가치 있다 |

### 컨텍스트 길이 최적화

1. **이벤트 정제와 압축**: low-signal engagement를 빼고 반복 행동을 압축해 정제된 이벤트 시퀀스를 만든다.
2. **elbow point 찾기**: 담을 과거 이벤트 수를 바꿔 MRR을 그리고, 추가 컨텍스트의 수확이 체감하는 지점을 찾는다 (Figure 5).
3. **상세 수준 최적화**: 남긴 이벤트마다 상세 수준과 단순화 문구를 바꿔 MRR을 잰다.

컨텍스트 토큰을 원래 예산의 약 3분의 1로 줄여도 오프라인 랭킹 지표 저하는 무시할 수준이다. 서빙 비용이 컨텍스트 길이에 대략 비례하므로 서빙 비용도 비슷한 비율로 줄었다.

### LLM-native recommendation으로의 전환

| 전환 | 내용 |
|---|---|
| feature engineering에서 context engineering으로 | 기존 RecSys는 대규모 feature 집합과 feature 인프라를 중심으로 구성됐다. LLM 중심 시스템은 원본 로그, 메타데이터, 도구 출력으로 풍부한 텍스트 컨텍스트를 만드는 데 집중한다. "prompt가 새로운 feature vector"가 되며, 어떤 신호를 담을지, 얼마나 과거까지 볼지, 토큰 예산 안에서 어떻게 압축할지가 모델링 작업이 된다 |
| 맞춤 구조에서 foundation backbone으로 | two-tower, DLRM 계열 네트워크, 전용 attention block 같은 과제별 구조 대신 공통 foundation backbone을 공유하고, 차이는 데이터와 verbalization 전략, post-training 목적과 reward, 추론 최적화에서 나온다. 애플리케이션 간 학습 공유가 쉬워지고 자연어 steering이 가능해진다 |
| scaling law를 설계 지침으로 | 기존 RecSys는 희소 ID, 과도하게 설계된 목적, 과제별 구조 때문에 수확 체감에 부딪힌다. LLM backbone을 쓰면 비용 한도 안에서 데이터와 모델을 키울수록 품질이 일관되게 오르는 scaling 특성을 물려받는다 |
| RecSys 인프라에서 LLM 인프라로 | GPU 가속, vLLM과 Triton 기반, 세심한 batching과 caching을 갖춘 LLM식 인프라로 옮겨 간다. MLP나 factorization 모델 중심의 고전 RecSys 스택과 점점 달라진다 |

## 5. 한계와 향후 과제 (Limitations and Future Work)

- 글 스스로 GenRec을 "초기 단계이지만 유망한 한 걸음"으로 규정한다. 온라인 검증 범위는 batch-compute surface다.
- 강화학습 계열(GRPO 등)은 추가 이득이 있었지만 비용 때문에 향후 과제로 남겼다.
- 온라인 지표 이름과 정의, 모델 정확한 크기, reward model 세부는 공개하지 않는다.
- 비용, 인프라, alignment에 세심한 주의가 필요하다는 조건을 결론에서 강조한다.

## 6. 관련 연구 (Related Work)

- **LLM 기반 추천 선행 사례**: 글이 직접 인용하는 PLUM (Google, arXiv 2510.07784), GLIDE (Spotify, arXiv 2603.17540), OneRec-Think (Kuaishou, arXiv 2510.11639)
- **context engineering**: Anthropic의 context engineering 글을 링크로 인용한다 [[agents/anthropic-2025-effective-context-engineering-for-ai]]
- **reward model**: ACM RecSys 2023 논문(doi 10.1145/3604915.3608873)을 reward model 근거로 링크한다
- **서빙 스택**: Netflix Technology Blog의 사내 LLM 서빙 글(In-house LLM serving at Netflix)을 링크한다
- **동반 논문**: [[applications/li-2026-genrec-an-llm-backed-recommendation]]

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| LLM-native recommendation | 추천 시스템의 입력 표현, 모델 구조, 학습, 서빙 인프라를 LLM 패러다임 중심으로 재구성하는 방향 |
| feature budget | 글이 context window를 가리켜 쓴 표현. 기존 추천기의 feature 수 대신 토큰 예산이 입력 정보량의 제약이 된다는 뜻 |
| verbalizer | 이력, 컨텍스트, 아이템 메타데이터를 하나의 텍스트 시퀀스로 직렬화하는 구성 요소 |
| catalog-aware scoring head | pooled hidden state와 아이템 임베딩을 결합해 Netflix 카탈로그 내 작품만 채점하는 head |
| prefill-only mode | 프롬프트를 한 번 읽는 prefill 단계만 실행하고 토큰 단위 decoding은 하지 않는 서빙 방식 |
| batch-compute surface | 요청 시점이 아니라 미리 일괄 계산해 둔 추천을 보여 주는 추천 surface |

## 8. 그림 후보 (Figure Candidates)

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | GenRec 파이프라인 (논문 Figure 1과 같은 도식) | fetched | ★ wiki 권장 (architecture) |
| fig02 | 온라인 A/B test 단기와 장기 지표 (Figure 3) | fetched | ★ wiki 권장 (result) |
| fig03 | 약 10B 모델 Phase 2 데이터 scaling (Figure 4) | fetched | (선택) 논문 페이지에 같은 그림 |
| fig04 | engagement 이벤트 수와 MRR의 elbow point (Figure 5) | fetched | ★ wiki 권장 (result) |
| fig05 | 전체 페이지 스크린샷 | screenshot | 제외 |
| fig06 | Medium 가입 모달 크롭 | crop | 제외 (잡음) |
| fig07 | Medium 가입 모달 크롭 | crop | 제외 (잡음) |
| fig08 | Medium 가입 모달 크롭 | crop | 제외 (잡음) |
| fig09 | Medium 가입 모달 크롭 | crop | 제외 (잡음) |
| fig10 | Medium 가입 모달 크롭 | crop | 제외 (잡음) |
| fig11 | Medium 가입 모달 크롭 | crop | 제외 (잡음) |
| fig12 | Medium 가입 모달 크롭 | crop | 제외 (잡음) |
| fig13 | Medium 가입 모달 크롭 | crop | 제외 (잡음) |
| fig14 | Medium 가입 모달 크롭 | crop | 제외 (잡음) |
| fig15 | 2단계 프레임워크 (블로그판 Figure 2) | fetched | ★ wiki 권장 (method) |
| fig16 | Phase 1과 Phase 2 기여 표 | fetched | ★ wiki 권장 (result) |
