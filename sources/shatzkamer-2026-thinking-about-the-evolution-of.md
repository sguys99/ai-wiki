---
title: "Thinking about the evolution of forward-deployed engineers over the last 24 months"
type: article
year: 2026
category: applications
raw_path: raw/articles/shatzkamer-2026-thinking-about-the-evolution-of.md
raw_filename: "shatzkamer-2026-thinking-about-the-evolution-of.md"
source_collection: external
author: "Kevin Shatzkamer"
url: "https://commandline.microsoft.com/thinking-about-the-evolution-of-forward-deployed-engineers-over-the-last-24-months/"
publisher: "Microsoft Command Line"
publication_date: "2026-10-28"
tags: [forward-deployed-engineering, ai-deployment, enterprise-ai]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/shatzkamer-2026-thinking-about-the-evolution-of/fig01.png
    raw: raw/articles/shatzkamer-2026-thinking-about-the-evolution-of-figures/fig01.png
    caption: "초기 Palantir의 현장 배치 방식, 2025년 중반의 시제품 배포, 2026년의 고객 독립 운영까지 세 시기를 비교한 도표"
    strategy: fetched
    curated: true
---

## 한 줄 요약 (One-line Summary)

고객 현장에서 제품을 구현하던 엔지니어의 역할이 AI 도입과 함께 넓어졌다. 이제는 여러 분야의 전문가가 한 팀으로 고객의 업무 절차를 바꾸고, 성과를 확인하고, 고객이 직접 시스템을 운영할 때까지 함께한다.

## 1. 자료 정보 (Document Information)

Microsoft에서 현장 엔지니어링 조직을 이끄는 Kevin Shatzkamer가 2026년 10월 28일에 쓴 글이다. 저자는 최근 24개월 동안 기업의 AI 도입을 지켜본 경험을 바탕으로 forward-deployed engineering(FDE)의 업무 범위를 다시 정의한다.

## 2. 주요 기여 (Key Contributions)

- 2009년 무렵 Palantir가 널리 알린 초기 FDE의 특징은 현장 엔지니어가 고객의 사용자와 데이터에 직접 접근한다는 점이다. 한 고객에게 효과가 있는 방법을 찾으면 플랫폼 팀이 다른 고객도 쓸 수 있는 제품 기능으로 발전시켰다.
- 생성형 AI가 등장한 뒤에는 시연에 성공하고도 보안 심사나 사업성 검증에서 멈추는 프로젝트가 많았다. 코딩 도구와 에이전트 실행 환경이 발전하자, 기술을 구현한 뒤 업무 성과를 내고 다음 팀도 같은 방식을 쓸 수 있게 만드는 조직의 역량이 새 제약으로 떠올랐다.
- 고객에게 파견하는 단위는 엔지니어 개인에서 여러 직군이 함께 일하는 소규모 팀으로 바뀌었다. 팀은 여전히 운영용 코드를 직접 작성하며 현장의 결과를 제품과 모델 개발에 반영한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

| 시기 | 주된 과제 | 기술과 책임 범위 |
|---|---|---|
| 2025년 이전 | 복잡한 고객 환경에서 플랫폼이 작동하도록 한다. | 현장 엔지니어와 도입 전략 담당자가 데이터의 의미를 맞추고 업무 시스템을 연결한다. 구축 후 운영까지 맡기도 한다. |
| 2025년 중반 | 생성형 AI 시제품을 실서비스로 옮긴다. | 소규모 전문팀이 검색 증강 생성(RAG), 모델, API를 애플리케이션에 연결하고 운영 인계를 돕는다. |
| 2026년 10월 | AI와 에이전트를 활용해 주요 업무를 재설계하고 운영한다. | 현업, 개발, 보안 담당자 등이 한 팀을 이뤄 품질 평가, 비용과 응답 시간 관리, 출시 후 조정, 사고 대응 준비와 고객 인계까지 맡는다. |

운영 인계를 위해 두 팀은 테스트, 코드 검토, 자동 배포, 지속적인 평가를 함께 수행하고 설계 결정의 이유를 기록한다. 마지막 개발 주기에는 지식 전수도 병행한다. 고객 측 운영 책임자와 지원팀이 정해지고 배포 절차와 평상시 운영 절차가 문서로 남아야 인계를 마칠 수 있다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

저자가 제시한 성과 기준은 업무가 얼마나 개선됐는지, 실제 사용자가 시스템을 채택했는지, 투자 대비 어떤 효과를 거뒀는지다. 고객에게 남는 자산도 살핀다. 시스템 상태를 확인할 수 있는 수단, 지식 그래프, 업무에 맞게 조정한 모델, 품질 평가 체계, 운영을 익힌 전문가가 그 예다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

이 글은 현장 책임자의 관찰과 제안을 담았다. 고객별 성과 수치나 세 운영 방식의 효과를 비교한 실험 결과는 제시하지 않는다. 고객 데이터가 흩어져 있거나 민감한 경우, 또는 담당자가 업무 절차를 설명하기 어려운 경우에는 초기 FDE가 맡았던 데이터 통합과 현장 조사도 여전히 필요하다.

## 6. 관련 연구 (Related Work)

AI 응답의 품질 기준과 평가 방법을 제품 요구사항에 명시하는 사례를 함께 읽을 수 있다. [[evaluations/kim-2026-ai-prd-eval-plan|AI 제품의 요구사항과 평가 계획]]

## 7. 용어집 (Glossary)

| 용어 | 글에서의 의미 |
|---|---|
| FDE | 고객 현장에서 실제 업무 문제를 해결하고 그 경험을 제품 개발에 반영하는 엔지니어링 방식 |
| delta / echo | 초기 모델에서 각각 현장 구현을 맡은 엔지니어와 고객 조직의 도입을 돕는 전략 담당자 |
| pod | 하나의 업무 성과를 책임지는 소규모 다직군 팀 |
| transformation capacity | 아이디어를 현장에 적용해 성과를 내고 다음 팀도 그 방법을 재사용할 수 있게 하는 조직의 역량 |

## 8. 그림 후보 (Figure Candidates)

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | 초기 Palantir의 역할 분담부터 AI 시제품 배포와 고객 독립 운영까지 세 시기를 비교한다. | fetched | wiki 수록 |
