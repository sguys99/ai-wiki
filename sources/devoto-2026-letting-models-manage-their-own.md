---
title: "Letting Models Manage Their Own Context: Where We Stand"
type: paper
year: 2026
category: agents
authors: "Alessio Devoto, Avinash Vem, Tara Safavi, Sanjay Kariyappa, Yu-Hsuan Tseng, Paul Furgale, Ricardo Silveira Cabral"
arxiv_id: "2611.34147"
url: "https://arxiv.org/abs/2611.34147"
raw_path: raw/papers/devoto-2026-letting-models-manage-their-own.pdf
raw_filename: devoto-2026-letting-models-manage-their-own.pdf
source_collection: external
tags: [agents, context-engineering, inference]
figures:
  - id: fig01
    label: "Figure 1"
    kind: "figure"
    file: "assets/devoto-2026-letting-models-manage-their-own/fig01.png"
    raw: "raw/papers/devoto-2026-letting-models-manage-their-own-figures/fig01.png"
    page: 2
    bbox_norm: [0.0819,0.0879,0.9201,0.3893]
    strategy: "manual"
    caption: "실행 환경이 오래된 기록을 요약하는 방식과 모델이 요약할 구간을 고르는 방식"
    curated: false
  - id: fig03
    label: "Figure 3"
    kind: "figure"
    file: "assets/devoto-2026-letting-models-manage-their-own/fig03.png"
    raw: "raw/papers/devoto-2026-letting-models-manage-their-own-figures/fig03.png"
    page: 4
    bbox_norm: [0.0819,0.0879,0.9201,0.5298]
    strategy: "manual"
    caption: "문서 조사에서 요청당 입력 한도에 따른 네 모델의 정답률"
    curated: false
  - id: fig04
    label: "Figure 4"
    kind: "figure"
    file: "assets/devoto-2026-letting-models-manage-their-own/fig04.png"
    raw: "raw/papers/devoto-2026-letting-models-manage-their-own-figures/fig04.png"
    page: 5
    bbox_norm: [0.0819,0.2542,0.9201,0.6963]
    strategy: "manual"
    caption: "기계학습 경진대회에서 입력 한도에 따른 평균 순위 백분위"
    curated: false
  - id: fig05
    label: "Figure 5"
    kind: "figure"
    file: "assets/devoto-2026-letting-models-manage-their-own/fig05.png"
    raw: "raw/papers/devoto-2026-letting-models-manage-their-own-figures/fig05.png"
    page: 6
    bbox_norm: [0.2537,0.0939,0.7463,0.2816]
    strategy: "caption-region"
    caption: "모델이 한 번이라도 기록을 요약한 과제의 비율"
    curated: false
  - id: fig06
    label: "Figure 6"
    kind: "figure"
    file: "assets/devoto-2026-letting-models-manage-their-own/fig06.png"
    raw: "raw/papers/devoto-2026-letting-models-manage-their-own-figures/fig06.png"
    page: 7
    bbox_norm: [0.0819,0.1437,0.9201,0.4106]
    strategy: "manual"
    caption: "요약 전후의 입력 길이 비율과 요약 뒤 원본을 다시 읽은 비율"
    curated: false
  - id: fig07
    label: "Figure 7"
    kind: "figure"
    file: "assets/devoto-2026-letting-models-manage-their-own/fig07.png"
    raw: "raw/papers/devoto-2026-letting-models-manage-their-own-figures/fig07.png"
    page: 7
    bbox_norm: [0.0819,0.6129,0.9201,0.8059]
    strategy: "manual"
    caption: "입력 한도에 가까워졌다는 첫 경고를 받은 뒤 모델별 대응"
    curated: false
  - id: fig08
    label: "Figure 8"
    kind: "figure"
    file: "assets/devoto-2026-letting-models-manage-their-own/fig08.png"
    raw: "raw/papers/devoto-2026-letting-models-manage-their-own-figures/fig08.png"
    page: 8
    bbox_norm: [0.0819,0.0879,0.9201,0.533]
    strategy: "manual"
    caption: "요약 시점에 관한 지시 유무에 따라 첫 요약 때까지 사용한 공간"
    curated: false
  - id: fig09
    label: "Figure 9"
    kind: "figure"
    file: "assets/devoto-2026-letting-models-manage-their-own/fig09.png"
    raw: "raw/papers/devoto-2026-letting-models-manage-their-own-figures/fig09.png"
    page: 9
    bbox_norm: [0.0819,0.0879,0.9201,0.3604]
    strategy: "manual"
    caption: "문서 조사에서 Kimi K3의 누적 입력 토큰 수와 정답률"
    curated: false
  - id: fig10
    label: "Figure 10"
    kind: "figure"
    file: "assets/devoto-2026-letting-models-manage-their-own/fig10.png"
    raw: "raw/papers/devoto-2026-letting-models-manage-their-own-figures/fig10.png"
    page: 10
    bbox_norm: [0.0819,0.2388,0.9201,0.6967]
    strategy: "manual"
    caption: "문서 조사에서 네 모델의 누적 입력 토큰 수와 정답률"
    curated: false
  - id: fig11
    label: "Figure 11"
    kind: "figure"
    file: "assets/devoto-2026-letting-models-manage-their-own/fig11.png"
    raw: "raw/papers/devoto-2026-letting-models-manage-their-own-figures/fig11.png"
    page: 11
    bbox_norm: [0.0819,0.12,0.9201,0.5772]
    strategy: "manual"
    caption: "기계학습 경진대회에서 네 모델이 쓴 토큰 수와 순위 백분위"
    curated: false
  - id: fig12
    label: "Figure 12"
    kind: "figure"
    file: "assets/devoto-2026-letting-models-manage-their-own/fig12.png"
    raw: "raw/papers/devoto-2026-letting-models-manage-their-own-figures/fig12.png"
    page: 11
    bbox_norm: [0.0819,0.6949,0.9201,0.8445]
    strategy: "manual"
    caption: "중간 기록을 요약할 때 기존 캐시를 쓸 수 있는 구간"
    curated: false
  - id: fig13
    label: "Figure 13"
    kind: "figure"
    file: "assets/devoto-2026-letting-models-manage-their-own/fig13.png"
    raw: "raw/papers/devoto-2026-letting-models-manage-their-own-figures/fig13.png"
    page: 12
    bbox_norm: [0.0819,0.0855,0.9201,0.3859]
    strategy: "manual"
    caption: "편집 뒤쪽의 캐시를 재사용했을 때 과제별 입력 처리량과 점수 변화"
    curated: false
---

## 한 줄 요약 (One-line Summary)

문서에서 답을 찾는 모델이 스스로 작업 기록을 정리하게 하자, 한 번에 읽을 수 있는 양이 적을 때 일부 모델의 정답률이 올랐다. 효과는 모델이 기록을 언제 줄이고 얼마나 남기느냐에 따라 달랐다.

## 1. 자료 정보 (Document Information)

NVIDIA 기술 보고서. arXiv v1은 2026년 11월 25일 공개됐다. 2~3절은 NOOA의 동작과 실험 조건, 4~6절은 과제 점수와 모델별 기록 사용, 7절은 추론 엔진, 8절은 해석상의 한계를 다룬다.

## 2. 주요 기여 (Key Contributions)

연구진은 같은 에이전트 실행 환경에서 기록 정리를 누가 맡는지 바꾸고, 네 모델의 점수와 기록 사용을 함께 비교했다. 별도 실험에서는 기록을 편집한 뒤 추론 엔진이 계산 결과를 얼마나 재사용할 수 있는지 측정했다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

기준 실험에서는 harness가 입력 한도의 80%에 이르면 초기 지시와 최근 기록 10개를 남기고 앞부분의 요약을 모델에 요청한다. harness는 도구 실행과 기록을 관리하는 실행 환경이다. 비교 실험의 모델에는 사용량 표시, 한도에 가까워졌다는 경고, 사용량이 85%에 이른 뒤 요약을 고려하라는 지시를 제공한다. 모델은 요약 시점과 범위를 고르며, 나중에 태그로 원본을 읽을 수 있다(그림 1, 코드 예시 2).

연구진은 요청당 한도를 8K~512K 토큰 사이에서 바꿨다. 초과하면 오래된 기록부터 빼고 다시 요청하며 세 번 실패하면 오답으로 센다. OfficeQA Pro v2에서는 미국 연방 재정 문서에 관한 질문 90개의 정답률을, MLE-bench Lite에서는 Kaggle 대회 22개의 평균 순위 백분위를 구했다. 대회 점수가 없으면 0으로 계산했다(그림 3, 4).

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

| 조건 | 기준 실험과 모델 직접 관리의 차이 | 근거 |
|---|---|---|
| GPT-6.1 Sol, 문서 조사, 32K | 정답률 21%에서 56%로 35%p 상승 | 초록, 그림 3 |
| Kimi K3, 문서 조사, 32K | 누적 입력 약 6,200만 토큰에서 약 3,600만 토큰으로 감소. 논문이 보고한 감소율은 41%, 정답률은 41%에서 43% | 그림 9 |
| Kimi K3, 문서 조사, 64K | 누적 입력 약 11% 감소, 정답률 52%에서 57% | 7절 |
| 기계학습 경진대회 | 두 방식의 점수 차이는 작았고 주로 입력 한도가 가장 낮을 때 나타났다 | 그림 4 |

| 모델 | 한 번 이상 요약한 과제 | 요약 직전 입력 길이 ÷ 다음 요청 길이, 중앙값 | 요약 후 원본 재조회 비율 |
|---|---:|---:|---:|
| GPT-6.1 Sol | 42% | 3.7 | 19% |
| Kimi K3 | 45% | 2.1 | 7% |
| DeepSeek V4 Pro | 53% | 1.8 | 3% |
| Claude Opus 5.5 | 4% | 1.5 | 14% |

앞 표의 재조회 비율은 원본을 다시 불러온 호출만 집계한 하한이다. Opus는 요약한 사례 자체가 적다(그림 5, 6). 64K에서 첫 경고 후 GPT는 69%의 사례에서 API 문서를 먼저 읽었고, DeepSeek은 46%에서 기록을 먼저 살폈다. Kimi는 49%에서 바로 요약했다(그림 7).

85% 지시를 빼면 첫 요약 시점의 사용률 중앙값이 Kimi에서 약 84%에서 29%로(128K), DeepSeek에서 83%에서 40%로(256K) 낮아졌다. 지시가 없을 때 Opus의 중앙값은 128K에서 16%였다. 128K 이상에서 지시를 뺀 Kimi와 DeepSeek의 점수는 실행 환경이 관리한 기준보다 약 8%p 낮았다(6절).

SGLang에서 Qwen3.6-27B에 32K 한도를 두고, 편집 후에도 그대로인 뒷부분의 KV cache를 재사용했다. 모델이 기록을 관리한 조건에서 요청마다 새로 처리한 입력 토큰이 OfficeQA Pro에서 15.1%, MLE-bench Lite에서 5.6%, DeepSWE에서 4.3% 줄었다. 연구진은 과제 점수에 측정할 만한 차이가 없었다고 보고했다(그림 13).

## 5. 한계와 향후 과제 (Limitations and Future Work)

문서 질문 90개와 대회 22개로는 작은 점수 차이를 해석하기 어렵다. 입력 한도를 줄이면 실제 장기 과제의 성격을 일부만 재현하며, 한도 초과 때 기록을 버리는 처리도 결과에 영향을 준다. 연구진은 네 모델의 학습 내역을 알지 못한다. 캐시 실험은 모델 하나와 엔진 하나에서 수행했고 전체 응답 시간과 요금은 측정하지 않았다. 후속 과제로는 모델에 기록 정리를 학습시키는 방법과 엔진에 편집 정보를 전달하는 방법을 제시한다.

## 6. 관련 연구 (Related Work)

논문 9절은 긴 입력을 외부에서 찾아 읽는 Recursive Language Models, 모델에 편집 가능한 기록을 제공하는 Context Language Models, 캐시 일부를 골라 제거하는 SideQuest를 비교한다.

## 7. 용어집 (Glossary)

| 용어 | 이 논문에서의 뜻 |
|---|---|
| NOOA | 기록 열람, 요약, 원본 조회를 지원하는 NVIDIA의 에이전트 실행 환경 |
| collapse | 연속된 기록을 지정한 요약문으로 교체하는 API 연산 |
| context anxiety | 공간이 충분히 남은 시점에도 모델이 일찍 기록을 줄이는 현상 |
| suffix KV reuse | 편집 위치 뒤에서 글이 그대로인 부분의 계산 결과를 다시 쓰는 기법 |

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---:|---|---|---|
| fig01 | 2 | 실행 환경이 오래된 기록을 요약하는 방식과 모델이 요약할 구간을 고르는 방식 | manual | 본문 권장 |
| fig03 | 4 | 문서 조사에서 요청당 입력 한도에 따른 네 모델의 정답률 | manual | 본문 권장 |
| fig04 | 5 | 기계학습 경진대회에서 입력 한도에 따른 평균 순위 백분위 | manual | 참고 |
| fig05 | 6 | 모델이 한 번이라도 기록을 요약한 과제의 비율 | caption-region | 참고 |
| fig06 | 7 | 요약 전후의 입력 길이 비율과 요약 뒤 원본을 다시 읽은 비율 | manual | 참고 |
| fig07 | 7 | 입력 한도에 가까워졌다는 첫 경고를 받은 뒤 모델별 대응 | manual | 참고 |
| fig08 | 8 | 요약 시점에 관한 지시 유무에 따라 첫 요약 때까지 사용한 공간 | manual | 참고 |
| fig09 | 9 | 문서 조사에서 Kimi K3의 누적 입력 토큰 수와 정답률 | manual | 참고 |
| fig10 | 10 | 문서 조사에서 네 모델의 누적 입력 토큰 수와 정답률 | manual | 참고 |
| fig11 | 11 | 기계학습 경진대회에서 네 모델이 쓴 토큰 수와 순위 백분위 | manual | 참고 |
| fig12 | 11 | 중간 기록을 요약할 때 기존 캐시를 쓸 수 있는 구간 | manual | 참고 |
| fig13 | 12 | 편집 뒤쪽의 캐시를 재사용했을 때 과제별 입력 처리량과 점수 변화 | manual | 참고 |
