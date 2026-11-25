---
title: "Andrej Karpathy: The Future of AI Is a Graph"
type: video
year: 2026
category: llms
channel: "Perfology Clips"
url: "https://www.youtube.com/watch?v=Rlk0GLRWwTI"
duration: PT1H8M30S
raw_path: /home/sguys99/project/ai-wiki/raw/videos/perfology-clips-2026-andrej-karpathy-the-future-of.md
raw_filename: perfology-clips-2026-andrej-karpathy-the-future-of.md
source_collection: external
tags: [transformer, attention, language-modeling]
figures:
  - id: fig01
    label: "Frame 37:30"
    kind: figure
    file: assets/perfology-clips-2026-andrej-karpathy-the-future-of/fig01.png
    raw: raw/videos/perfology-clips-2026-andrej-karpathy-the-future-of-figures/fig01.png
    timestamp: "37:30"
    strategy: keyframe
    caption: "번역기의 구조와 원문 단어와 번역 단어 사이의 정렬을 나타낸 행렬"
    curated: true
  - id: fig02
    label: "Frame 38:00"
    kind: figure
    file: assets/perfology-clips-2026-andrej-karpathy-the-future-of/fig02.png
    raw: raw/videos/perfology-clips-2026-andrej-karpathy-the-future-of-figures/fig02.png
    timestamp: "38:00"
    strategy: keyframe
    caption: "Bahdanau가 번역기의 병목과 attention의 착상을 설명한 이메일"
    curated: true
  - id: fig03
    label: "Frame 46:20"
    kind: figure
    file: assets/perfology-clips-2026-andrej-karpathy-the-future-of/fig03.png
    raw: raw/videos/perfology-clips-2026-andrej-karpathy-the-future-of-figures/fig03.png
    timestamp: "46:20"
    strategy: keyframe
    caption: "그래프에서 각 노드가 이웃의 정보를 읽는 연산과 그 의사 코드"
    curated: true
  - id: fig04
    label: "Frame 48:20"
    kind: figure
    file: assets/perfology-clips-2026-andrej-karpathy-the-future-of/fig04.png
    raw: raw/videos/perfology-clips-2026-andrej-karpathy-the-future-of-figures/fig04.png
    timestamp: "48:20"
    strategy: keyframe
    caption: "인코더와 디코더에서 각 위치가 참조할 수 있는 노드의 범위"
    curated: true
  - id: fig05
    label: "Frame 54:10"
    kind: figure
    file: assets/perfology-clips-2026-andrej-karpathy-the-future-of/fig05.png
    raw: raw/videos/perfology-clips-2026-andrej-karpathy-the-future-of-figures/fig05.png
    timestamp: "54:10"
    strategy: keyframe
    caption: "셰익스피어 텍스트에서 입력과 한 문자 이동한 정답을 추출하는 배치 구성"
    curated: true
  - id: fig06
    label: "Frame 58:15"
    kind: figure
    file: assets/perfology-clips-2026-andrej-karpathy-the-future-of/fig06.png
    raw: raw/videos/perfology-clips-2026-andrej-karpathy-the-future-of-figures/fig06.png
    timestamp: "58:15"
    strategy: keyframe
    caption: "GPT 디코더 블록의 구조와 통신 및 위치별 계산에 대응하는 코드"
    curated: true
  - id: fig07
    label: "Frame 12:30"
    kind: figure
    file: assets/perfology-clips-2026-andrej-karpathy-the-future-of/fig07.png
    raw: raw/videos/perfology-clips-2026-andrej-karpathy-the-future-of-figures/fig07.png
    timestamp: "12:30"
    strategy: keyframe
    caption: "ChatGPT가 가상 터미널에서 파일 생성 명령에 응답하는 시연"
    curated: true
---

## 한 줄 요약 (One-line Summary)

Andrej Karpathy는 프롬프트가 모델의 행동을 바꾸는 사례에서 출발해 Transformer가 각 위치에 필요한 정보를 모으는 과정을 그래프로 설명한다.

## 1. 자료 정보 (Document Information)

Perfology Clips가 2026년 9월 8일 게시한 68분 30초 분량의 스탠퍼드 강연 영상이다. 38분에는 기계 번역 연구에서 attention이 나온 배경을 다룬다.

## 2. 주요 기여 (Key Contributions)

| 구간 | 주제 |
|---|---|
| 02:53부터 | 명시적으로 작성한 코드, 데이터에서 학습한 가중치, 자연어로 지정한 동작을 비교한다. |
| 24:21부터 | 서로 다른 입력을 토큰으로 표현하면 같은 구조로 처리할 수 있는 이유를 설명한다. |
| 44:35부터 | 토큰을 노드로, 정보를 읽을 수 있는 관계를 간선으로 해석한다. |
| 52:13부터 | nanoGPT가 셰익스피어 텍스트에서 다음 문자를 예측하는 계산을 따라간다. |

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

번역기의 디코더가 원문 전체를 벡터 하나로 전달받으면 각 단어를 생성할 때 필요한 세부 정보를 복원하기 어렵다. Attention은 디코더가 출력 위치마다 원문의 여러 위치에 다른 가중치를 주고 정보를 읽게 한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

강연에서 인용한 문제 풀이 예시의 정확도는 기본 조건에서 17%, 단계별 풀이 요청에서 78.7%, 정답 확인까지 명시한 문구에서 82%였다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

가상 터미널의 출력은 모델이 생성한 텍스트다. 실제 작업을 지속하려면 도구 실행과 대화 밖에 정보를 보존하는 메모리가 필요하다.

## 6. 관련 연구 (Related Work)

강연은 초기 순환 신경망 번역기에서 Transformer로 이어지는 설계 변화와 GPT-3의 in-context learning 사례를 연결한다. In-context learning은 입력에 담긴 예시를 이용해 현재 과제를 수행하는 방식이다.

## 7. 용어집 (Glossary)

| 용어 | 강연에서의 의미 |
|---|---|
| encoder bottleneck | 원문 전체가 고정 길이 벡터 하나를 통해 전달되는 제약 |
| causal mask | 미래 위치에서 현재 위치로 정보가 흐르는 경로를 차단하는 마스크 |
| nanoGPT | 문자 예측 과정을 코드로 확인하는 데 사용한 구현 |

## 8. 그림 후보 (Figure Candidates)

| id | 시각 | 장면 | 추출 방법 | 선정 |
|---|---|---|---|---|
| fig01 | 37:30 | 번역기의 구조와 원문 단어와 번역 단어 사이의 정렬을 나타낸 행렬 | keyframe | 수록 |
| fig02 | 38:00 | Bahdanau가 번역기의 병목과 attention의 착상을 설명한 이메일 | keyframe | 수록 |
| fig03 | 46:20 | 그래프에서 각 노드가 이웃의 정보를 읽는 연산과 그 의사 코드 | keyframe | 수록 |
| fig04 | 48:20 | 인코더와 디코더에서 각 위치가 참조할 수 있는 노드의 범위 | keyframe | 수록 |
| fig05 | 54:10 | 셰익스피어 텍스트에서 입력과 한 문자 이동한 정답을 추출하는 배치 구성 | keyframe | 수록 |
| fig06 | 58:15 | GPT 디코더 블록의 구조와 통신 및 위치별 계산에 대응하는 코드 | keyframe | 수록 |
| fig07 | 12:30 | ChatGPT가 가상 터미널에서 파일 생성 명령에 응답하는 시연 | keyframe | 수록 |
