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
