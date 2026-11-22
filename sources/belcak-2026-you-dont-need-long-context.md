---
title: "You don’t need long context"
type: paper
year: 2026
category: agents
raw_path: /home/sguys99/project/ai-wiki/raw/papers/belcak-2026-you-dont-need-long-context.pdf
raw_filename: "belcak-2026-you-dont-need-long-context.pdf"
source_collection: external
authors: "Peter Belcak, Saurav Muralidharan, Jindong Jiang, Yonggan Fu, Wonmin Byeon, Hanrong Ye, Ryan Angilly, Ali Taghibakhshi, Shih-Yang Liu, Siru Ouyang, Greg Heinrich, Pavlo Molchanov"
arxiv_id: "2611.05306v1"
url: "https://arxiv.org/pdf/2611.05306v1"
tags: [context-engineering, compaction, long-context, agents]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/belcak-2026-you-dont-need-long-context/fig01.png
    raw: raw/papers/belcak-2026-you-dont-need-long-context-figures/fig01.png
    caption: "컨텍스트 상한에 따른 출력 100만 토큰의 GPU 비용"
    page: 1
    bbox_norm: [0.0947, 0.5336, 0.9053, 0.7178]
    strategy: caption-region
    curated: false
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/belcak-2026-you-dont-need-long-context/fig02.png
    raw: raw/papers/belcak-2026-you-dont-need-long-context-figures/fig02.png
    caption: "DGX Spark에서 입력 길이에 따른 토큰 지연, 처리량과 메모리 사용량"
    page: 2
    bbox_norm: [0.0986, 0.0939, 0.9014, 0.2814]
    strategy: caption-region
    curated: false
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/belcak-2026-you-dont-need-long-context/fig03.png
    raw: raw/papers/belcak-2026-you-dont-need-long-context-figures/fig03.png
    caption: "세 방식에서 다음 대화로 전달되는 메시지와 작업 상태"
    page: 7
    bbox_norm: [0.0849, 0.123, 0.9151, 0.338]
    strategy: manual
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/belcak-2026-you-dont-need-long-context/fig04.png
    raw: raw/papers/belcak-2026-you-dont-need-long-context-figures/fig04.png
    caption: "H100에서 context window 크기에 따른 최대 디코딩 처리량"
    page: 8
    bbox_norm: [0.0947, 0.0939, 0.9054, 0.2732]
    strategy: caption-region
    curated: false
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/belcak-2026-you-dont-need-long-context/fig05.png
    raw: raw/papers/belcak-2026-you-dont-need-long-context-figures/fig05.png
    caption: "장기 과제 6종의 정확도 변화와 가정한 단가에서의 비용 절감 배수"
    page: 9
    bbox_norm: [0.1029, 0.38, 0.8901, 0.814]
    strategy: manual
    curated: true
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/belcak-2026-you-dont-need-long-context/fig06.png
    raw: raw/papers/belcak-2026-you-dont-need-long-context-figures/fig06.png
    caption: "긴 입력 과제 7종의 선택 읽기 성적과 추정 비용"
    page: 11
    bbox_norm: [0.0999, 0.374, 0.9001, 0.853]
    strategy: manual
    curated: false
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/belcak-2026-you-dont-need-long-context/fig07.png
    raw: raw/papers/belcak-2026-you-dont-need-long-context-figures/fig07.png
    caption: "LongBench v2의 문서 길이와 과제별 누적 대화 길이"
    page: 12
    bbox_norm: [0.1658, 0.2989, 0.8342, 0.6095]
    strategy: caption-region
    curated: false
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/belcak-2026-you-dont-need-long-context/fig08.png
    raw: raw/papers/belcak-2026-you-dont-need-long-context-figures/fig08.png
    caption: "LOONG의 문서 길이와 과제별 누적 대화 길이"
    page: 13
    bbox_norm: [0.1658, 0.0931, 0.8342, 0.4037]
    strategy: caption-region
    curated: false
  - id: tab01
    label: Table 1
    kind: table
    file: assets/belcak-2026-you-dont-need-long-context/tab01.png
    raw: raw/papers/belcak-2026-you-dont-need-long-context-figures/tab01.png
    caption: "영문 문학 작품의 길이와 모델별 context window 크기"
    page: 2
    bbox_norm: [0.0829, 0.68, 0.9171, 0.851]
    strategy: manual
    curated: false
  - id: tab02
    label: Table 2
    kind: table
    file: assets/belcak-2026-you-dont-need-long-context/tab02.png
    raw: raw/papers/belcak-2026-you-dont-need-long-context-figures/tab02.png
    caption: "코드 및 터미널 과제에서 세 방식의 해결률과 최대 컨텍스트"
    page: 14
    bbox_norm: [0.0839, 0.295, 0.9161, 0.445]
    strategy: manual
    curated: true
  - id: tab03
    label: Table 3
    kind: table
    file: assets/belcak-2026-you-dont-need-long-context/tab03.png
    raw: raw/papers/belcak-2026-you-dont-need-long-context-figures/tab03.png
    caption: "SWE-bench Verified의 해결률, 토큰 사용량과 비용"
    page: 22
    bbox_norm: [0.0839, 0.385, 0.9161, 0.477]
    strategy: manual
    curated: false
  - id: tab04
    label: Table 4
    kind: table
    file: assets/belcak-2026-you-dont-need-long-context/tab04.png
    raw: raw/papers/belcak-2026-you-dont-need-long-context-figures/tab04.png
    caption: "다국어 코드 수정 과제의 상한별 해결률과 비용"
    page: 22
    bbox_norm: [0.0839, 0.657, 0.9161, 0.748]
    strategy: manual
    curated: false
  - id: tab05
    label: Table 5
    kind: table
    file: assets/belcak-2026-you-dont-need-long-context/tab05.png
    raw: raw/papers/belcak-2026-you-dont-need-long-context-figures/tab05.png
    caption: "터미널 작업에서 상한에 따른 성공률과 비용"
    page: 23
    bbox_norm: [0.0839, 0.096, 0.9161, 0.187]
    strategy: manual
    curated: false
  - id: tab06
    label: Table 6
    kind: table
    file: assets/belcak-2026-you-dont-need-long-context/tab06.png
    raw: raw/papers/belcak-2026-you-dont-need-long-context-figures/tab06.png
    caption: "여러 출처를 찾아 답하는 FRAMES의 정답률과 비용"
    page: 23
    bbox_norm: [0.0839, 0.298, 0.9161, 0.388]
    strategy: manual
    curated: false
  - id: tab07
    label: Table 7
    kind: table
    file: assets/belcak-2026-you-dont-need-long-context/tab07.png
    raw: raw/papers/belcak-2026-you-dont-need-long-context-figures/tab07.png
    caption: "BFCLv3의 대화 성공률과 작업당 메모 작성 횟수"
    page: 23
    bbox_norm: [0.0839, 0.483, 0.9161, 0.565]
    strategy: manual
    curated: false
  - id: tab08
    label: Table 8
    kind: table
    file: assets/belcak-2026-you-dont-need-long-context/tab08.png
    raw: raw/papers/belcak-2026-you-dont-need-long-context-figures/tab08.png
    caption: "모의 상담 과제의 상한별 성공률과 비용"
    page: 23
    bbox_norm: [0.0839, 0.703, 0.9161, 0.829]
    strategy: manual
    curated: false
  - id: tab09
    label: Table 9
    kind: table
    file: assets/belcak-2026-you-dont-need-long-context/tab09.png
    raw: raw/papers/belcak-2026-you-dont-need-long-context-figures/tab09.png
    caption: "공개 가중치 모델 다섯 개의 코드 수정 해결률"
    page: 24
    bbox_norm: [0.2139, 0.335, 0.7861, 0.443]
    strategy: manual
    curated: false
  - id: tab10
    label: Table 10
    kind: table
    file: assets/belcak-2026-you-dont-need-long-context/tab10.png
    raw: raw/papers/belcak-2026-you-dont-need-long-context-figures/tab10.png
    caption: "공개 가중치 모델 다섯 개의 터미널 작업 성공률"
    page: 24
    bbox_norm: [0.2139, 0.545, 0.7861, 0.653]
    strategy: manual
    curated: false
  - id: tab11
    label: Table 11
    kind: table
    file: assets/belcak-2026-you-dont-need-long-context/tab11.png
    raw: raw/papers/belcak-2026-you-dont-need-long-context-figures/tab11.png
    caption: "LongBench v2의 문서 전체 입력과 선택 읽기 정답률"
    page: 27
    bbox_norm: [0.0839, 0.272, 0.9161, 0.348]
    strategy: manual
    curated: false
  - id: tab12
    label: Table 12
    kind: table
    file: assets/belcak-2026-you-dont-need-long-context/tab12.png
    raw: raw/papers/belcak-2026-you-dont-need-long-context-figures/tab12.png
    caption: "LOONG의 평균 점수와 문항별 만점 비율"
    page: 27
    bbox_norm: [0.0839, 0.543, 0.9161, 0.632]
    strategy: manual
    curated: false
  - id: tab13
    label: Table 13
    kind: table
    file: assets/belcak-2026-you-dont-need-long-context/tab13.png
    raw: raw/papers/belcak-2026-you-dont-need-long-context-figures/tab13.png
    caption: "AA-LCR의 여러 문서 추론 정답률과 토큰 사용량"
    page: 28
    bbox_norm: [0.0839, 0.153, 0.9161, 0.242]
    strategy: manual
    curated: false
  - id: tab14
    label: Table 14
    kind: table
    file: assets/belcak-2026-you-dont-need-long-context/tab14.png
    raw: raw/papers/belcak-2026-you-dont-need-long-context-figures/tab14.png
    caption: "NIAH의 숨은 사실 검색 정답률과 메모 작성 횟수"
    page: 28
    bbox_norm: [0.0839, 0.452, 0.9161, 0.532]
    strategy: manual
    curated: false
  - id: tab15
    label: Table 15
    kind: table
    file: assets/belcak-2026-you-dont-need-long-context/tab15.png
    raw: raw/papers/belcak-2026-you-dont-need-long-context-figures/tab15.png
    caption: "RULER에서 정답을 찾아낸 비율과 완전 일치율"
    page: 28
    bbox_norm: [0.0839, 0.655, 0.9161, 0.728]
    strategy: manual
    curated: false
  - id: tab16
    label: Table 16
    kind: table
    file: assets/belcak-2026-you-dont-need-long-context/tab16.png
    raw: raw/papers/belcak-2026-you-dont-need-long-context-figures/tab16.png
    caption: "Counting-Stars의 평균 점수와 모든 값의 일치율"
    page: 29
    bbox_norm: [0.0839, 0.169, 0.9161, 0.245]
    strategy: manual
    curated: false
  - id: tab17
    label: Table 17
    kind: table
    file: assets/belcak-2026-you-dont-need-long-context/tab17.png
    raw: raw/papers/belcak-2026-you-dont-need-long-context-figures/tab17.png
    caption: "BABILong에서 흩어진 사실을 연결한 답의 정답률"
    page: 29
    bbox_norm: [0.0839, 0.368, 0.9161, 0.447]
    strategy: manual
    curated: false
---

## 한 줄 요약 (One-line Summary)

작업 이력을 중간에 정리하거나 긴 문서에서 필요한 구절을 찾아 읽으면, 실험에 쓴 두 상용 모델은 대체로 짧은 컨텍스트에서도 과제를 풀었다. 같은 방법에 크게 취약한 공개 가중치 모델도 있었다.

## 1. 자료 정보 (Document Information)

Peter Belcak 외 11명이 쓴 NVIDIA 논문이다. 2026년 11월 3일 공개한 arXiv v1을 기준으로 한다. 에이전트가 여러 단계에 걸쳐 일하는 과제 6종, 긴 입력을 읽는 과제 7종을 다룬다. 실험 조건은 2절, 세부 수치는 부록 B부터 F까지에서 확인할 수 있다.

## 2. 주요 기여 (Key Contributions)

- 오래 걸리는 작업과 처음부터 입력이 긴 작업을 나눠, 두 경우에 모델이 한 번에 읽는 입력이 왜 길어지는지 살폈다.
- compaction은 에이전트가 다음 작업에 필요한 사실을 골라 새 대화로 넘기는 절차다. 대화가 미리 정한 길이에 이르면 메모를 쓰는 방식과 행동할 때마다 쓰는 방식을 비교했다.
- 공개 가중치 모델의 디코딩 처리량을 실측했다. 이 측정값으로 짧은 컨텍스트의 이득을 API 단가에 반영하는 경우까지 따로 추정했다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

연구진은 코드와 터미널 과제에 mini-swe-agent를, 나머지에는 같은 구조를 확장한 mini-agent를 썼다. 모델은 한 번에 Bash 명령 하나를 내리고 결과를 읽는다. 파일 변경과 같은 환경의 상태는 새 대화를 열어도 이어진다.

| 방식 | 다음 호출에 전달할 정보 |
|---|---|
| FHA | 처음부터 쌓인 메시지와 실행 결과 전체 |
| EoCC | 임계값까지는 이력 전체. 임계값에 이르면 원래 과제와 모델이 작성한 인계 메모로 재시작 |
| SAC | 행동을 한 번 수행하고 결과를 확인할 때마다 상태를 다시 작성. 다음 대화는 원래 과제와 갱신한 상태로 시작 |

논문의 ‘16K / 12K’는 전체 상한 1만 6천 토큰, 메모 작성을 시작할 임계값 1만 2천 토큰을 뜻한다. 긴 입력 실험에서는 문서를 통째로 주는 조건과 파일에서 구절을 찾아 읽고 필요할 때 EoCC를 적용하는 조건을 비교했다. 문서 접근 방식도 함께 달라진다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

아래 수치는 Claude Opus 4.5와 GPT 5.6 Sol 순이다. 다음 표는 장기 작업에서 전체 이력을 쓸 때와 EoCC를 적용할 때의 정확도를 비교한다.

| 장기 작업 | 주요 결과 (표 3~8) |
|---|---|
| SWE-bench Verified | 각 모델의 최고 해결률은 74.8%, 88.8%. 전체 이력을 쓴 70.0%, 84.4%보다 높았다. |
| SWE-bench Multilingual | 4만 8천 토큰 상한에서 1.7%p, 0.7%p 상승. 1만 6천 토큰 상한에서는 2.0%p, 1.6%p 하락했다. |
| Terminal-Bench 2.1 | Opus는 3만 2천 토큰 상한에서 5.6%p 상승했다. GPT는 4만 8천 토큰에서 1.2%p 상승하고 1만 6천 토큰에서 2.2%p 하락했다. |
| FRAMES | 전체 이력에서 81.0%, 90.2%. EoCC의 모든 설정에서 각각 1.3~3.7%p, 1.5~3.3%p 낮았다. |
| BFCLv3 | 전체 이력에서 62.0%, 39.5%. 1만 2천 토큰 상한에서는 62.5%, 39.5%였다. |
| τ²-bench | 전체 이력에서 79.3%, 73.9%. 1만 2천 토큰 상한에서는 78.2%, 77.2%였다. |

긴 입력 과제는 문서 전체를 받은 모델과 선택해서 읽은 모델의 결과를 비교한다. 아래 설정은 NIAH만 4만 8천 / 3만 6천 토큰이고 나머지는 1만 6천 / 1만 2천 토큰이다.

| 과제와 지표 | Opus 전체 → 선택 | GPT 전체 → 선택 |
|---|---:|---:|
| LongBench v2 정답률 | 68.0% → 67.6% | 70.8% → 72.6% |
| LOONG 평균 점수 / 만점 비율 | 70.1% / 38.9% → 79.3% / 53.4% | 79.3% / 44.4% → 82.7% / 51.9% |
| AA-LCR 정답률 | 65.0% → 84.0% | 82.0% → 83.0% |
| NIAH 정답률 | 60.0% → 100% | 80.0% → 100% |
| RULER 평균 recall | 62.5% → 95.7% | 65.5% → 96.4% |
| Counting-Stars 완전 일치율 | 65.1% → 81.2% | 76.6% → 81.2% |
| BABILong 정답률 | 67.1% → 92.0% | 70.7% → 94.0% |

NIAH와 Counting-Stars에서는 두 모델 모두 compaction을 한 번도 수행하지 않았다. SAC를 적용한 별도 실험에서는 SWE-bench Verified 해결률이 70.2%, 82.4%였고 Terminal-Bench는 51.8%, 84.3%였다. 네 조합에서 과제별 최대 컨텍스트의 중앙값은 7천~9천 토큰이었다(표 2).

H100에서 기존 입력 캐시를 활용해 출력 100만 토큰을 생성할 때, 25만 6천 토큰 상한의 비용은 1만 6천 토큰 상한에 비해 GLM 5.2에서 3.6배, Kimi K2.6에서 5.6배, Qwen 3 Coder Next에서 7배였다(그림 1, 4). 이 결과를 바탕으로 상용 모델에 짧은 컨텍스트용 단가를 가정하면 장기 작업의 비용 절감 배수는 Opus 2.2~8.8배, GPT 2.4~5.0배다. 공개 API 단가를 적용하면 비용이 오르는 과제도 있었다(부록 B, C).

## 5. 한계와 향후 과제 (Limitations and Future Work)

작업에 필요한 사실을 메모에서 빠뜨리면 반복해서 요약하는 동안 복구하기 어렵다. 대화 밖에 원문이 남아 있고 다시 열 수 있는지가 중요하다. 실험은 주로 처음에 목표가 정해진 과제를 다뤘다. 사람이 나중에 목표를 바꾸면 무엇을 보존해야 할지도 달라진다(3.1절, 부록 A).

공개 가중치 모델 5종은 짧은 컨텍스트에 서로 다르게 반응했다. SWE-bench Verified의 가장 좁은 설정에서 다섯 모델 모두 해결률이 내려갔다. Qwen 3 Coder Next는 53.0%에서 3.6%까지 떨어졌다. 저자들은 장황한 출력 때문에 메모를 다시 작성하기 전까지 실제 작업을 진행할 여지가 적었다고 설명한다(표 9). 자연어로 상태를 갱신하도록 모델 자체를 훈련하는 SSSM은 후속 연구 제안이다.

## 6. 관련 연구 (Related Work)

- [[agents/anthropic-2025-effective-context-engineering-for-ai|Anthropic의 컨텍스트 설계]]는 도구로 자료를 제때 읽고 오래된 이력을 정리하는 방법을 다룬다. 이 논문은 그 두 방법을 과제별 점수와 컨텍스트 길이로 비교한다.

## 7. 용어집 (Glossary)

| 용어 | 이 논문에서의 뜻 |
|---|---|
| FHA (Full-History Accumulation) | 한 과제의 실행 이력을 한 대화에 계속 덧붙이는 비교 조건 |
| EoCC | 대화가 미리 정한 길이에 이르면 다음 작업에 필요한 정보를 메모로 넘기는 방식 |
| SAC | 환경에서 한 번 행동할 때마다 메모를 갱신하고 대화를 새로 여는 방식 |
| peak length | 한 과제를 수행하는 동안 가장 길었던 단일 대화의 길이 |
| SSSM (Semantic State Space Model) | 행동 결과를 반영해 다음 호출에 넘길 자연어 상태를 작성하도록 훈련하는 모델 구상 |

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---:|---|---|---|
| fig01 | 1 | 컨텍스트 상한에 따른 출력 100만 토큰의 GPU 비용 | caption-region | 참고 |
| fig02 | 2 | DGX Spark에서 입력 길이에 따른 토큰 지연, 처리량과 메모리 사용량 | caption-region | 참고 |
| fig03 | 7 | 세 방식에서 다음 대화로 전달되는 메시지와 작업 상태 | manual | 본문 권장 |
| fig04 | 8 | H100에서 context window 크기에 따른 최대 디코딩 처리량 | caption-region | 참고 |
| fig05 | 9 | 장기 과제 6종의 정확도 변화와 가정한 단가에서의 비용 절감 배수 | manual | 본문 권장 |
| fig06 | 11 | 긴 입력 과제 7종의 선택 읽기 성적과 추정 비용 | manual | 참고 |
| fig07 | 12 | LongBench v2의 문서 길이와 과제별 누적 대화 길이 | caption-region | 참고 |
| fig08 | 13 | LOONG의 문서 길이와 과제별 누적 대화 길이 | caption-region | 참고 |
| tab01 | 2 | 영문 문학 작품의 길이와 모델별 context window 크기 | manual | 참고 |
| tab02 | 14 | 코드 및 터미널 과제에서 세 방식의 해결률과 최대 컨텍스트 | manual | 본문 권장 |
| tab03 | 22 | SWE-bench Verified의 해결률, 토큰 사용량과 비용 | manual | 참고 |
| tab04 | 22 | 다국어 코드 수정 과제의 상한별 해결률과 비용 | manual | 참고 |
| tab05 | 23 | 터미널 작업에서 상한에 따른 성공률과 비용 | manual | 참고 |
| tab06 | 23 | 여러 출처를 찾아 답하는 FRAMES의 정답률과 비용 | manual | 참고 |
| tab07 | 23 | BFCLv3의 대화 성공률과 작업당 메모 작성 횟수 | manual | 참고 |
| tab08 | 23 | 모의 상담 과제의 상한별 성공률과 비용 | manual | 참고 |
| tab09 | 24 | 공개 가중치 모델 다섯 개의 코드 수정 해결률 | manual | 참고 |
| tab10 | 24 | 공개 가중치 모델 다섯 개의 터미널 작업 성공률 | manual | 참고 |
| tab11 | 27 | LongBench v2의 문서 전체 입력과 선택 읽기 정답률 | manual | 참고 |
| tab12 | 27 | LOONG의 평균 점수와 문항별 만점 비율 | manual | 참고 |
| tab13 | 28 | AA-LCR의 여러 문서 추론 정답률과 토큰 사용량 | manual | 참고 |
| tab14 | 28 | NIAH의 숨은 사실 검색 정답률과 메모 작성 횟수 | manual | 참고 |
| tab15 | 28 | RULER에서 정답을 찾아낸 비율과 완전 일치율 | manual | 참고 |
| tab16 | 29 | Counting-Stars의 평균 점수와 모든 값의 일치율 | manual | 참고 |
| tab17 | 29 | BABILong에서 흩어진 사실을 연결한 답의 정답률 | manual | 참고 |
