---
title: "TASTE, 토스의 추천 파운데이션 플랫폼"
type: article
year: 2026
category: applications
raw_path: raw/articles/park-2026-taste-toss-recommendation-foundation-platform.md
raw_filename: "park-2026-taste-toss-recommendation-foundation-platform.md"
source_collection: external
author: "박재휘, 김찬우, 백영민, 김소정"
url: "https://toss.tech/article/taste"
publisher: "토스 기술 블로그"
publication_date: "2026-11-09"
tags: [recommender-system, multi-task-learning, user-embedding, targeting, toss]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/park-2026-taste-toss-recommendation-foundation-platform/fig01.png
    raw: raw/articles/park-2026-taste-toss-recommendation-foundation-platform-figures/fig01.png
    caption: "서버 로그와 소비 이력 등에서 사용자 임베딩을 만들어 추천에 전달하고 TASTE Bench로 평가하는 과정"
    strategy: fetched
    curated: false
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/park-2026-taste-toss-recommendation-foundation-platform/fig02.png
    raw: raw/articles/park-2026-taste-toss-recommendation-foundation-platform-figures/fig02.png
    caption: "서버 로그, 마이데이터, MMP 데이터의 규모와 수집 시점, 이용 동의 조건 차이"
    strategy: fetched
    curated: false
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/park-2026-taste-toss-recommendation-foundation-platform/fig03.png
    raw: raw/articles/park-2026-taste-toss-recommendation-foundation-platform-figures/fig03.png
    caption: "서비스별 인코더를 각각 학습하는 구조와 공통 인코더 뒤에 과제별 예측 헤드를 두는 구조"
    strategy: fetched
    curated: false
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/park-2026-taste-toss-recommendation-foundation-platform/fig04.png
    raw: raw/articles/park-2026-taste-toss-recommendation-foundation-platform-figures/fig04.png
    caption: "전체 사용자로 학습한 기존 모델과 100만 명으로 학습한 LightGBM 및 MMoE의 평균 AUC"
    strategy: fetched
    curated: false
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/park-2026-taste-toss-recommendation-foundation-platform/fig05.png
    raw: raw/articles/park-2026-taste-toss-recommendation-foundation-platform-figures/fig05.png
    caption: "요약 정보와 시간순 앱이벤트를 결합하는 구조 및 시퀀스 포함 여부에 따른 성능 차이"
    strategy: fetched
    curated: true
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/park-2026-taste-toss-recommendation-foundation-platform/fig06.png
    raw: raw/articles/park-2026-taste-toss-recommendation-foundation-platform-figures/fig06.png
    caption: "소비 시퀀스 인코더와 미래 소비 예측 과제를 앱이벤트 모델에 추가한 구조"
    strategy: fetched
    curated: false
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/park-2026-taste-toss-recommendation-foundation-platform/fig07.png
    raw: raw/articles/park-2026-taste-toss-recommendation-foundation-platform-figures/fig07.png
    caption: "공통 입력을 앱이벤트와 소비 모델에 각각 전달하는 구조 및 목적별 성능 변화"
    strategy: fetched
    curated: true
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/park-2026-taste-toss-recommendation-foundation-platform/fig08.png
    raw: raw/articles/park-2026-taste-toss-recommendation-foundation-platform-figures/fig08.png
    caption: "예측 모델 수가 늘 때 개별 모델과 TASTE에 필요한 자원이 달라지는 양상을 나타낸 개념도"
    strategy: fetched
    curated: false
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/park-2026-taste-toss-recommendation-foundation-platform/fig09.png
    raw: raw/articles/park-2026-taste-toss-recommendation-foundation-platform-figures/fig09.png
    caption: "푸시 캠페인 운영 집계와 금융 상품군별 LMS 및 홈 배너 실험 결과"
    strategy: fetched
    curated: false
  - id: fig10
    label: Figure 10
    kind: figure
    file: assets/park-2026-taste-toss-recommendation-foundation-platform/fig10.png
    raw: raw/articles/park-2026-taste-toss-recommendation-foundation-platform-figures/fig10.png
    caption: "마케팅과 CRM 모델 8개의 AUC 차이, 쇼핑과 광고의 상대 변화율, 미니앱 추천의 온라인 클릭률"
    strategy: fetched
    curated: true
  - id: fig11
    label: Figure 11
    kind: figure
    file: assets/park-2026-taste-toss-recommendation-foundation-platform/fig11.png
    raw: raw/articles/park-2026-taste-toss-recommendation-foundation-platform-figures/fig11.png
    caption: "TASTE Bench에서 기존 입력 유지, 임베딩 추가, 사용자 피처 대체 조건을 비교하는 절차"
    strategy: fetched
    curated: true
  - id: fig12
    label: Figure 12
    kind: figure
    file: assets/park-2026-taste-toss-recommendation-foundation-platform/fig12.png
    raw: raw/articles/park-2026-taste-toss-recommendation-foundation-platform-figures/fig12.png
    caption: "광고, 쇼핑, 금융 거래로 입력을 확대하고 사용자와 아이템 표현을 서비스에 공유하려는 계획"
    strategy: fetched
    curated: false
---

## 한 줄 요약 (One-line Summary)

토스는 앱이벤트와 소비를 목적별로 공동학습해 행동별 확률을 캠페인 타기팅에 쓰고, 학습한 사용자 임베딩을 쇼핑, 광고, 미니앱 추천 모델에 전달했다.

## 1. 자료 정보 (Document Information)

2026년 11월 9일 토스 기술 블로그에 박재휘, 김찬우, 백영민, 김소정이 발표한 추천 시스템 운영 사례다. TASTE의 설계 변경 과정과 오프라인 평가, 캠페인 운영 집계, 온라인 비교 실험을 담았다.

## 2. 주요 기여 (Key Contributions)

- 과제별로 반복하던 사용자 데이터 준비와 학습을 통합했다. 앱이벤트와 소비 사이에서 성능 차이가 나타나자 입력은 공유하되 인코더를 목적별로 학습했다.
- 목표 행동의 예측 확률과 사용자 임베딩을 각각 제공했다. 서비스팀은 TASTE의 가중치를 고정하고 임베딩을 기존 모델의 입력으로 사용할 수 있다.
- 서비스별 예측 문제를 재현한 TASTE Bench에서 임베딩의 추가 효과와 기존 사용자 피처 대체 효과를 따로 비교했다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

월간 활성 사용자 2,000만 명 이상인 토스에는 주요 서버 로그만 하루 수십억 건 이상 쌓인다. 마이데이터는 수십 개 API마다 수집 시점과 대상이 다르고, 외부 앱 이용을 담은 MMP 데이터는 사용자별 이벤트 수 편차가 크다. 세 데이터의 동의 조건도 다르다. 개별 서비스 모델은 응답 시간 제약 때문에 크기를 늘리기 어렵다.

| 실험 단계 | 구성과 관찰 |
|---|---|
| 공동학습 시작 | 100만 명의 데이터로 앱이벤트별 예측 헤드를 둔 MMoE를 학습했다. 같은 규모로 각 과제를 학습한 LightGBM보다 평균 AUROC가 낮았다. |
| 사용자와 입력 확대 | 학습 가능한 전체 사용자로 확대하고 약 1,000개의 요약 정보를 2,000개 이상으로 늘렸다. DCN-V2로 요약 정보를 처리하고 Causal Transformer로 최근 이벤트의 순서를 읽었다. 두 출력을 결합해 PLE에서 과제별 확률을 계산했다. |
| 소비 과제 추가 | 브랜드와 카테고리 등 소비 이력을 읽는 인코더와 미래 소비 예측을 추가했다. 소비 예측은 기존 개별 모델보다 좋아졌지만 앱이벤트 예측은 앱이벤트 전용 공동학습 때보다 낮아졌다. |
| 목적별 분리 | 앱이벤트 이력, 소비 이력, 요약 정보를 두 모델에 모두 제공했다. 앱이벤트와 소비를 인코더부터 나누고 각 모델 안에서 같은 목적의 여러 과제를 함께 학습했다. |

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

| 비교 | 결과 |
|---|---|
| 초기 모델 평균 AUROC | 전체 사용자 기존 모델 0.9218, 100만 명 LightGBM 0.9086, 100만 명 MMoE 0.9023 |
| 공통 앱이벤트의 과제 평균 recall | 상위 5,000명 기준으로 기존 16.43%에서 확장한 TASTE 22.19%로 약 35.1% 상대 개선. 시퀀스 모듈 제거 시 상대 7.6% 하락 |
| 목적 분리 후 앱이벤트 | 단일 TASTE 대비 같은 지표 8.7% 상승 |
| 목적 분리 후 소비 | 기존 모델 대비 같은 지표가 브랜드 33.9%, 중분류 111%, 소분류 65.8% 상승 |
| IM 푸시 운영 집계 | 도입 후 두 달간 일반 캠페인과 Auto Targeting의 클릭률은 각각 4.39%, 5.19%, 발송 대비 전환율은 0.25%, 2.70% |
| 금융 상품군 온라인 비교 | 상품군 1의 LMS는 발송 수가 약 35% 감소하고 전환 건수가 약 40% 증가했다. 상품군 2의 홈 배너는 각 모델만 선정한 사용자끼리 비교했을 때 TASTE의 클릭률이 1.72배, 최종 전환율이 4.75배였다. |

마케팅과 CRM 모델 8개 모두 기존 입력에 임베딩을 추가했을 때 오프라인 AUROC가 높아졌다. 그림 10의 절대 차이는 혜택 지면 배너 클릭 +0.0151, 홈 상단 배너 전환 ① +0.0100, 홈 상단 배너 클릭 +0.0058, 리스트 배너 클릭 +0.0052, 푸시 클릭 ① +0.0049, 홈 상단 배너 전환 ② +0.0035, 푸시 클릭 ② +0.0014, 푸시 전환 +0.0013이다.

| 오프라인 예측 과제 | AUROC 상대 증가율 | NE 상대 감소율 |
|---|---:|---:|
| 쇼핑 관심 | 0.50% | 3.24% |
| 장바구니 추가 | 0.66% | 1.50% |
| 구매 | 0.27% | 0.54% |
| 광고 통합 클릭률 | 0.15% | 0.27% |
| LightGBM 기반 광고 클릭률 | 0.12% | 5.15% |
| 리워드 광고 | 2.29% | 1.62% |
| 비리워드 광고 | 0.21% | 0.14% |

미니앱 온라인 A/B 테스트에서 전체 탭 클릭률은 1.56%에서 2.77%로 약 77%, 최근 더보기의 ‘이런 건 어때요’ 지면은 3.51%에서 10.85%로 약 209% 증가했다. 전체 탭에서 최근 28일 동안 미니앱 이용 이력이 없는 사용자에게 비앱테크 미니앱을 추천했을 때의 클릭률은 공통 사용자 피처를 쓴 모델의 약 2.5배였다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

두 달간의 푸시 수치는 서로 다른 캠페인의 집계여서 모델의 인과 효과를 분리하기 어렵다. 임베딩을 기존 피처에 추가하면 대부분의 실험에서 개선됐지만 기존 피처를 대체했을 때는 일관된 우위를 확인하지 못했다.

토스는 학습 입력을 광고, 쇼핑, 금융 거래로 확대하고 있다. 핵심 도메인에는 아이템 임베딩과 사용자와 아이템의 상호작용 모듈을 전달하는 오프라인 실험을 진행하고 있다. 모델 갱신 때 벡터 좌표와 분포가 바뀌는 문제에 대해서는 갱신 주기, 표준화와 좌표 정렬, 날짜별 임베딩 연결 방식을 비교한다.

## 6. 관련 연구 (Related Work)

원문은 MMoE(Ma 등, 2018), DCN V2(Wang 등, 2021), PLE(Tang 등, 2020)를 모델 구성의 참고문헌으로 제시한다. 광고 추천 관련 문헌으로는 Meta Lattice(Luo 등, 2025)와 Large Foundation Model for Ads Recommendation(Zhang 등, 2025)을 수록했다.

## 7. 용어집 (Glossary)

| 용어 | 자료에서의 의미 |
|---|---|
| TASTE | Toss Automated Standard Targeting Engine. 토스의 사용자 표현을 학습하고 행동별 확률과 임베딩을 제공하는 플랫폼 |
| IM Auto Targeting | 메시지 발송 허브에서 목표 이벤트와 인원수를 받아 예측 확률순으로 대상을 고르는 기능 |
| TASTE Bench | 서비스 예측 과제를 모방한 프록시 모델로 임베딩 후보의 전이 효과를 비교하는 평가 환경 |
| Macro Recall@5k <!-- lint-style: ignore --> <!-- 원문 지표명 --> | 과제별 상위 5,000명에서 실제 목표 행동 사용자를 얼마나 찾았는지 계산한 뒤 과제별 recall을 평균한 지표 |

## 8. 그림 후보 (Figure Candidates)

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | 서버 로그와 소비 이력 등에서 사용자 임베딩을 만들어 추천에 전달하고 TASTE Bench로 평가하는 과정 | fetched | 원본 보관 |
| fig02 | 서버 로그, 마이데이터, MMP 데이터의 규모와 수집 시점, 이용 동의 조건 차이 | fetched | 원본 보관 |
| fig03 | 서비스별 인코더를 각각 학습하는 구조와 공통 인코더 뒤에 과제별 예측 헤드를 두는 구조 | fetched | 원본 보관 |
| fig04 | 전체 사용자로 학습한 기존 모델과 100만 명으로 학습한 LightGBM 및 MMoE의 평균 AUC | fetched | 원본 보관 |
| fig05 | 요약 정보와 시간순 앱이벤트를 결합하는 구조 및 시퀀스 포함 여부에 따른 성능 차이 | fetched | ★ 위키 권장 |
| fig06 | 소비 시퀀스 인코더와 미래 소비 예측 과제를 앱이벤트 모델에 추가한 구조 | fetched | 원본 보관 |
| fig07 | 공통 입력을 앱이벤트와 소비 모델에 각각 전달하는 구조 및 목적별 성능 변화 | fetched | ★ 위키 권장 |
| fig08 | 예측 모델 수가 늘 때 개별 모델과 TASTE에 필요한 자원이 달라지는 양상을 나타낸 개념도 | fetched | 원본 보관 |
| fig09 | 푸시 캠페인 운영 집계와 금융 상품군별 LMS 및 홈 배너 실험 결과 | fetched | 원본 보관 |
| fig10 | 마케팅과 CRM 모델 8개의 AUC 차이, 쇼핑과 광고의 상대 변화율, 미니앱 추천의 온라인 클릭률 | fetched | ★ 위키 권장 |
| fig11 | TASTE Bench에서 기존 입력 유지, 임베딩 추가, 사용자 피처 대체 조건을 비교하는 절차 | fetched | ★ 위키 권장 |
| fig12 | 광고, 쇼핑, 금융 거래로 입력을 확대하고 사용자와 아이템 표현을 서비스에 공유하려는 계획 | fetched | 원본 보관 |
