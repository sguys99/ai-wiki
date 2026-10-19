---
title: "GPT-6 Astra, Looped Transformers, and Hidden Reasoning"
type: article
year: 2026
category: llms
raw_path: raw/articles/raschka-2026-gpt-6-astra-looped-transformers-and.md
raw_filename: "raschka-2026-gpt-6-astra-looped-transformers-and.md"
source_collection: external
author: "Sebastian Raschka"
url: "https://magazine.sebastianraschka.com/p/gpt-6-astra-looped-transformers-and"
publisher: "Ahead of AI (magazine.sebastianraschka.com)"
tags: [looped-transformer, recurrent-depth, llm-architecture, reasoning, chain-of-thought, gpt-6-astra]
figures:
  - id: fig01
    file: assets/raschka-2026-gpt-6-astra-looped-transformers-and/fig01.jpg
    raw: raw/articles/raschka-2026-gpt-6-astra-looped-transformers-and-figures/fig01.jpg
    caption: "Artificial Analysis Intelligence Index 종합 점수 비교 차트 (원문 Figure 2)"
    strategy: fetched
    curated: false
  - id: fig02
    file: assets/raschka-2026-gpt-6-astra-looped-transformers-and/fig02.jpg
    raw: raw/articles/raschka-2026-gpt-6-astra-looped-transformers-and-figures/fig02.jpg
    caption: "computer use 학습 워크플로. 과제 프롬프트, 스크린샷, 동작 예측, Mac에서 실행, 성공과 실패 피드백 순환 (원문 Figure 3)"
    strategy: fetched
    curated: false
  - id: fig03
    file: assets/raschka-2026-gpt-6-astra-looped-transformers-and/fig03.jpg
    raw: raw/articles/raschka-2026-gpt-6-astra-looped-transformers-and-figures/fig03.jpg
    caption: "Nanbeige4.2-3B 아키텍처. 22개 transformer block stack을 같은 가중치로 한 번 더 반복해 총 44층으로 동작한다 (원문 Figure 5)"
    strategy: fetched
    curated: true
  - id: fig04
    file: assets/raschka-2026-gpt-6-astra-looped-transformers-and/fig04.png
    raw: raw/articles/raschka-2026-gpt-6-astra-looped-transformers-and-figures/fig04.png
    caption: "Nanbeige4.2-3B를 두 번의 pass로 펼친 44회 block application (원문 Figure 6)"
    strategy: fetched
    curated: false
  - id: fig05
    file: assets/raschka-2026-gpt-6-astra-looped-transformers-and/fig05.jpg
    raw: raw/articles/raschka-2026-gpt-6-astra-looped-transformers-and-figures/fig05.jpg
    caption: "22 block 1 pass, 22 block 2 pass, 44 block 1 pass의 고유 block 수, block application 수, KV cache 깊이, 전체 파라미터 비교 (원문 Figure 7)"
    strategy: fetched
    curated: true
  - id: fig06
    file: assets/raschka-2026-gpt-6-astra-looped-transformers-and/fig06.jpg
    raw: raw/articles/raschka-2026-gpt-6-astra-looped-transformers-and-figures/fig06.jpg
    caption: "KV cache 해설 기사 링크 카드 썸네일"
    strategy: fetched
    curated: false
  - id: fig07
    file: assets/raschka-2026-gpt-6-astra-looped-transformers-and/fig07.jpg
    raw: raw/articles/raschka-2026-gpt-6-astra-looped-transformers-and-figures/fig07.jpg
    caption: "Universal Transformer의 adaptive halting. 토큰 위치마다 2, 4, 3 step에서 멈추고 이후 상태를 그대로 전달한다 (원문 Figure 8)"
    strategy: fetched
    curated: true
  - id: fig08
    file: assets/raschka-2026-gpt-6-astra-looped-transformers-and/fig08.jpg
    raw: raw/articles/raschka-2026-gpt-6-astra-looped-transformers-and-figures/fig08.jpg
    caption: "Mixture-of-Recursions의 recursion block과 토큰별 1, 2, 3 step 배정 예시 (원문 Figure 9)"
    strategy: fetched
    curated: true
  - id: fig09
    file: assets/raschka-2026-gpt-6-astra-looped-transformers-and/fig09.jpg
    raw: raw/articles/raschka-2026-gpt-6-astra-looped-transformers-and-figures/fig09.jpg
    caption: "Mixture-of-Recursions의 두 라우팅 방식. 단계마다 토큰을 고르는 expert-choice와 처음에 경로를 배정하는 token-choice (원문 Figure 10)"
    strategy: fetched
    curated: true
  - id: fig10
    file: assets/raschka-2026-gpt-6-astra-looped-transformers-and/fig10.jpg
    raw: raw/articles/raschka-2026-gpt-6-astra-looped-transformers-and-figures/fig10.jpg
    caption: "RNN 구조 일러스트 (저자 2022년 도서 그림, 원문 Figure 12)"
    strategy: fetched
    curated: false
  - id: fig11
    file: assets/raschka-2026-gpt-6-astra-looped-transformers-and/fig11.png
    raw: raw/articles/raschka-2026-gpt-6-astra-looped-transformers-and-figures/fig11.png
    caption: "RNN과 looped transformer의 반복 비교. RNN은 time step 방향, looped transformer는 깊이 방향으로 가중치를 공유한다 (원문 Figure 13)"
    strategy: fetched
    curated: true
  - id: fig12
    file: assets/raschka-2026-gpt-6-astra-looped-transformers-and/fig12.jpg
    raw: raw/articles/raschka-2026-gpt-6-astra-looped-transformers-and-figures/fig12.jpg
    caption: "reasoning model 응답 예시. 중간 단계, backtracking, 최종 답을 표시했다 (원문 Figure 15)"
    strategy: fetched
    curated: false
  - id: fig13
    file: assets/raschka-2026-gpt-6-astra-looped-transformers-and/fig13.jpg
    raw: raw/articles/raschka-2026-gpt-6-astra-looped-transformers-and-figures/fig13.jpg
    caption: "Geiping et al.의 latent reasoning 구조. 앞 2 block, 32회 반복하는 공유 4 block, 뒤 2 block으로 132회 block application (원문 Figure 19)"
    strategy: fetched
    curated: true
  - id: fig14
    file: assets/raschka-2026-gpt-6-astra-looped-transformers-and/fig14.jpg
    raw: raw/articles/raschka-2026-gpt-6-astra-looped-transformers-and-figures/fig14.jpg
    caption: "memorization 실험. 고유 파라미터 수가 늘면 흡수 정보량이 커지지만 block 반복으로 effective depth를 늘리면 거의 변하지 않는다 (원문 Figure 20)"
    strategy: fetched
    curated: true
  - id: fig15
    file: assets/raschka-2026-gpt-6-astra-looped-transformers-and/fig15.jpg
    raw: raw/articles/raschka-2026-gpt-6-astra-looped-transformers-and-figures/fig15.jpg
    caption: "latent feedback 실험. 정확도는 비슷하거나 높고 중간 reasoning 길이는 짧아진다 (원문 Figure 22)"
    strategy: fetched
    curated: true
  - id: fig16
    file: assets/raschka-2026-gpt-6-astra-looped-transformers-and/page-full.png
    raw: raw/articles/raschka-2026-gpt-6-astra-looped-transformers-and-figures/page-full.png
    caption: "Raschka 글 전체 페이지 스크린샷"
    strategy: screenshot
    curated: false
  - id: fig17
    file: assets/raschka-2026-gpt-6-astra-looped-transformers-and/crop01.png
    raw: raw/articles/raschka-2026-gpt-6-astra-looped-transformers-and-figures/crop01.png
    caption: "Raschka 글 화면 영역 크롭 01 (crop01.png)"
    strategy: crop
    curated: false
  - id: fig18
    file: assets/raschka-2026-gpt-6-astra-looped-transformers-and/crop02.png
    raw: raw/articles/raschka-2026-gpt-6-astra-looped-transformers-and-figures/crop02.png
    caption: "Raschka 글 화면 영역 크롭 02 (crop02.png)"
    strategy: crop
    curated: false
  - id: fig19
    file: assets/raschka-2026-gpt-6-astra-looped-transformers-and/crop03.png
    raw: raw/articles/raschka-2026-gpt-6-astra-looped-transformers-and-figures/crop03.png
    caption: "Raschka 글 화면 영역 크롭 03 (crop03.png)"
    strategy: crop
    curated: false
  - id: fig20
    file: assets/raschka-2026-gpt-6-astra-looped-transformers-and/crop04.png
    raw: raw/articles/raschka-2026-gpt-6-astra-looped-transformers-and-figures/crop04.png
    caption: "Raschka 글 화면 영역 크롭 04 (crop04.png)"
    strategy: crop
    curated: false
  - id: fig21
    file: assets/raschka-2026-gpt-6-astra-looped-transformers-and/crop05.png
    raw: raw/articles/raschka-2026-gpt-6-astra-looped-transformers-and-figures/crop05.png
    caption: "Raschka 글 화면 영역 크롭 05 (crop05.png)"
    strategy: crop
    curated: false
  - id: fig22
    file: assets/raschka-2026-gpt-6-astra-looped-transformers-and/crop06.png
    raw: raw/articles/raschka-2026-gpt-6-astra-looped-transformers-and-figures/crop06.png
    caption: "Raschka 글 화면 영역 크롭 06 (crop06.png)"
    strategy: crop
    curated: false
  - id: fig23
    file: assets/raschka-2026-gpt-6-astra-looped-transformers-and/crop07.png
    raw: raw/articles/raschka-2026-gpt-6-astra-looped-transformers-and-figures/crop07.png
    caption: "Raschka 글 화면 영역 크롭 07 (crop07.png)"
    strategy: crop
    curated: false
  - id: fig24
    file: assets/raschka-2026-gpt-6-astra-looped-transformers-and/crop08.png
    raw: raw/articles/raschka-2026-gpt-6-astra-looped-transformers-and-figures/crop08.png
    caption: "Raschka 글 화면 영역 크롭 08 (crop08.png)"
    strategy: crop
    curated: false
  - id: fig25
    file: assets/raschka-2026-gpt-6-astra-looped-transformers-and/crop09.png
    raw: raw/articles/raschka-2026-gpt-6-astra-looped-transformers-and-figures/crop09.png
    caption: "Raschka 글 화면 영역 크롭 09 (crop09.png)"
    strategy: crop
    curated: false
  - id: fig26
    file: assets/raschka-2026-gpt-6-astra-looped-transformers-and/crop10.png
    raw: raw/articles/raschka-2026-gpt-6-astra-looped-transformers-and-figures/crop10.png
    caption: "Raschka 글 화면 영역 크롭 10 (crop10.png)"
    strategy: crop
    curated: false
  - id: fig27
    file: assets/raschka-2026-gpt-6-astra-looped-transformers-and/crop11.png
    raw: raw/articles/raschka-2026-gpt-6-astra-looped-transformers-and-figures/crop11.png
    caption: "Raschka 글 화면 영역 크롭 11 (crop11.png)"
    strategy: crop
    curated: false
  - id: fig28
    file: assets/raschka-2026-gpt-6-astra-looped-transformers-and/crop12.png
    raw: raw/articles/raschka-2026-gpt-6-astra-looped-transformers-and-figures/crop12.png
    caption: "Raschka 글 화면 영역 크롭 12 (crop12.png)"
    strategy: crop
    curated: false
  - id: fig29
    file: assets/raschka-2026-gpt-6-astra-looped-transformers-and/crop13.png
    raw: raw/articles/raschka-2026-gpt-6-astra-looped-transformers-and-figures/crop13.png
    caption: "Raschka 글 화면 영역 크롭 13 (crop13.png)"
    strategy: crop
    curated: false
  - id: fig30
    file: assets/raschka-2026-gpt-6-astra-looped-transformers-and/crop14.png
    raw: raw/articles/raschka-2026-gpt-6-astra-looped-transformers-and-figures/crop14.png
    caption: "Raschka 글 화면 영역 크롭 14 (crop14.png)"
    strategy: crop
    curated: false
  - id: fig31
    file: assets/raschka-2026-gpt-6-astra-looped-transformers-and/crop15.png
    raw: raw/articles/raschka-2026-gpt-6-astra-looped-transformers-and-figures/crop15.png
    caption: "Raschka 글 화면 영역 크롭 15 (crop15.png)"
    strategy: crop
    curated: false
  - id: fig32
    file: assets/raschka-2026-gpt-6-astra-looped-transformers-and/crop16.png
    raw: raw/articles/raschka-2026-gpt-6-astra-looped-transformers-and-figures/crop16.png
    caption: "Raschka 글 화면 영역 크롭 16 (crop16.png)"
    strategy: crop
    curated: false
  - id: fig33
    file: assets/raschka-2026-gpt-6-astra-looped-transformers-and/crop17.png
    raw: raw/articles/raschka-2026-gpt-6-astra-looped-transformers-and-figures/crop17.png
    caption: "Raschka 글 화면 영역 크롭 17 (crop17.png)"
    strategy: crop
    curated: false
  - id: fig34
    file: assets/raschka-2026-gpt-6-astra-looped-transformers-and/crop18.png
    raw: raw/articles/raschka-2026-gpt-6-astra-looped-transformers-and-figures/crop18.png
    caption: "Raschka 글 화면 영역 크롭 18 (crop18.png)"
    strategy: crop
    curated: false
  - id: fig35
    file: assets/raschka-2026-gpt-6-astra-looped-transformers-and/crop19.png
    raw: raw/articles/raschka-2026-gpt-6-astra-looped-transformers-and-figures/crop19.png
    caption: "Raschka 글 화면 영역 크롭 19 (crop19.png)"
    strategy: crop
    curated: false
  - id: fig36
    file: assets/raschka-2026-gpt-6-astra-looped-transformers-and/crop20.png
    raw: raw/articles/raschka-2026-gpt-6-astra-looped-transformers-and-figures/crop20.png
    caption: "Raschka 글 화면 영역 크롭 20 (crop20.png)"
    strategy: crop
    curated: false
  - id: fig37
    file: assets/raschka-2026-gpt-6-astra-looped-transformers-and/crop21.png
    raw: raw/articles/raschka-2026-gpt-6-astra-looped-transformers-and-figures/crop21.png
    caption: "Raschka 글 화면 영역 크롭 21 (crop21.png)"
    strategy: crop
    curated: false
  - id: fig38
    file: assets/raschka-2026-gpt-6-astra-looped-transformers-and/crop22.png
    raw: raw/articles/raschka-2026-gpt-6-astra-looped-transformers-and-figures/crop22.png
    caption: "Raschka 글 화면 영역 크롭 22 (crop22.png)"
    strategy: crop
    curated: false
  - id: fig39
    file: assets/raschka-2026-gpt-6-astra-looped-transformers-and/crop23.png
    raw: raw/articles/raschka-2026-gpt-6-astra-looped-transformers-and-figures/crop23.png
    caption: "Raschka 글 화면 영역 크롭 23 (crop23.png)"
    strategy: crop
    curated: false
  - id: fig40
    file: assets/raschka-2026-gpt-6-astra-looped-transformers-and/crop24.png
    raw: raw/articles/raschka-2026-gpt-6-astra-looped-transformers-and-figures/crop24.png
    caption: "Raschka 글 화면 영역 크롭 24 (crop24.png)"
    strategy: crop
    curated: false
  - id: fig41
    file: assets/raschka-2026-gpt-6-astra-looped-transformers-and/crop25.png
    raw: raw/articles/raschka-2026-gpt-6-astra-looped-transformers-and-figures/crop25.png
    caption: "Raschka 글 화면 영역 크롭 25 (crop25.png)"
    strategy: crop
    curated: false
  - id: fig42
    file: assets/raschka-2026-gpt-6-astra-looped-transformers-and/crop26.png
    raw: raw/articles/raschka-2026-gpt-6-astra-looped-transformers-and-figures/crop26.png
    caption: "Raschka 글 화면 영역 크롭 26 (crop26.png)"
    strategy: crop
    curated: false
  - id: fig43
    file: assets/raschka-2026-gpt-6-astra-looped-transformers-and/crop27.png
    raw: raw/articles/raschka-2026-gpt-6-astra-looped-transformers-and-figures/crop27.png
    caption: "Raschka 글 화면 영역 크롭 27 (crop27.png)"
    strategy: crop
    curated: false
  - id: fig44
    file: assets/raschka-2026-gpt-6-astra-looped-transformers-and/crop28.png
    raw: raw/articles/raschka-2026-gpt-6-astra-looped-transformers-and-figures/crop28.png
    caption: "Raschka 글 화면 영역 크롭 28 (crop28.png)"
    strategy: crop
    curated: false
  - id: fig45
    file: assets/raschka-2026-gpt-6-astra-looped-transformers-and/crop29.png
    raw: raw/articles/raschka-2026-gpt-6-astra-looped-transformers-and-figures/crop29.png
    caption: "Raschka 글 화면 영역 크롭 29 (crop29.png)"
    strategy: crop
    curated: false
  - id: fig46
    file: assets/raschka-2026-gpt-6-astra-looped-transformers-and/crop30.png
    raw: raw/articles/raschka-2026-gpt-6-astra-looped-transformers-and-figures/crop30.png
    caption: "Raschka 글 화면 영역 크롭 30 (crop30.png)"
    strategy: crop
    curated: false
  - id: fig47
    file: assets/raschka-2026-gpt-6-astra-looped-transformers-and/crop31.png
    raw: raw/articles/raschka-2026-gpt-6-astra-looped-transformers-and-figures/crop31.png
    caption: "Raschka 글 화면 영역 크롭 31 (crop31.png)"
    strategy: crop
    curated: false
  - id: fig48
    file: assets/raschka-2026-gpt-6-astra-looped-transformers-and/crop32.png
    raw: raw/articles/raschka-2026-gpt-6-astra-looped-transformers-and-figures/crop32.png
    caption: "Raschka 글 화면 영역 크롭 32 (crop32.png)"
    strategy: crop
    curated: false
  - id: fig49
    file: assets/raschka-2026-gpt-6-astra-looped-transformers-and/crop33.png
    raw: raw/articles/raschka-2026-gpt-6-astra-looped-transformers-and-figures/crop33.png
    caption: "Raschka 글 화면 영역 크롭 33 (crop33.png)"
    strategy: crop
    curated: false
  - id: fig50
    file: assets/raschka-2026-gpt-6-astra-looped-transformers-and/crop34.png
    raw: raw/articles/raschka-2026-gpt-6-astra-looped-transformers-and-figures/crop34.png
    caption: "Raschka 글 화면 영역 크롭 34 (crop34.png)"
    strategy: crop
    curated: false
  - id: fig51
    file: assets/raschka-2026-gpt-6-astra-looped-transformers-and/crop35.png
    raw: raw/articles/raschka-2026-gpt-6-astra-looped-transformers-and-figures/crop35.png
    caption: "Raschka 글 화면 영역 크롭 35 (crop35.png)"
    strategy: crop
    curated: false
  - id: fig52
    file: assets/raschka-2026-gpt-6-astra-looped-transformers-and/crop36.png
    raw: raw/articles/raschka-2026-gpt-6-astra-looped-transformers-and-figures/crop36.png
    caption: "Raschka 글 화면 영역 크롭 36 (crop36.png)"
    strategy: crop
    curated: false
  - id: fig53
    file: assets/raschka-2026-gpt-6-astra-looped-transformers-and/crop37.png
    raw: raw/articles/raschka-2026-gpt-6-astra-looped-transformers-and-figures/crop37.png
    caption: "Raschka 글 화면 영역 크롭 37 (crop37.png)"
    strategy: crop
    curated: false
  - id: fig54
    file: assets/raschka-2026-gpt-6-astra-looped-transformers-and/crop38.png
    raw: raw/articles/raschka-2026-gpt-6-astra-looped-transformers-and-figures/crop38.png
    caption: "Raschka 글 화면 영역 크롭 38 (crop38.png)"
    strategy: crop
    curated: false
  - id: fig55
    file: assets/raschka-2026-gpt-6-astra-looped-transformers-and/crop39.png
    raw: raw/articles/raschka-2026-gpt-6-astra-looped-transformers-and-figures/crop39.png
    caption: "Raschka 글 화면 영역 크롭 39 (crop39.png)"
    strategy: crop
    curated: false
  - id: fig56
    file: assets/raschka-2026-gpt-6-astra-looped-transformers-and/crop40.png
    raw: raw/articles/raschka-2026-gpt-6-astra-looped-transformers-and-figures/crop40.png
    caption: "Raschka 글 화면 영역 크롭 40 (crop40.png)"
    strategy: crop
    curated: false
  - id: fig57
    file: assets/raschka-2026-gpt-6-astra-looped-transformers-and/crop41.png
    raw: raw/articles/raschka-2026-gpt-6-astra-looped-transformers-and-figures/crop41.png
    caption: "Raschka 글 화면 영역 크롭 41 (crop41.png)"
    strategy: crop
    curated: false
  - id: fig58
    file: assets/raschka-2026-gpt-6-astra-looped-transformers-and/crop42.png
    raw: raw/articles/raschka-2026-gpt-6-astra-looped-transformers-and-figures/crop42.png
    caption: "Raschka 글 화면 영역 크롭 42 (crop42.png)"
    strategy: crop
    curated: false
  - id: fig59
    file: assets/raschka-2026-gpt-6-astra-looped-transformers-and/crop43.png
    raw: raw/articles/raschka-2026-gpt-6-astra-looped-transformers-and-figures/crop43.png
    caption: "Raschka 글 화면 영역 크롭 43 (crop43.png)"
    strategy: crop
    curated: false
  - id: fig60
    file: assets/raschka-2026-gpt-6-astra-looped-transformers-and/crop44.png
    raw: raw/articles/raschka-2026-gpt-6-astra-looped-transformers-and-figures/crop44.png
    caption: "Raschka 글 화면 영역 크롭 44 (crop44.png)"
    strategy: crop
    curated: false
  - id: fig61
    file: assets/raschka-2026-gpt-6-astra-looped-transformers-and/crop45.png
    raw: raw/articles/raschka-2026-gpt-6-astra-looped-transformers-and-figures/crop45.png
    caption: "Raschka 글 화면 영역 크롭 45 (crop45.png)"
    strategy: crop
    curated: false
  - id: fig62
    file: assets/raschka-2026-gpt-6-astra-looped-transformers-and/crop46.png
    raw: raw/articles/raschka-2026-gpt-6-astra-looped-transformers-and-figures/crop46.png
    caption: "Raschka 글 화면 영역 크롭 46 (crop46.png)"
    strategy: crop
    curated: false
---

## 한 줄 요약 (One-line Summary)

Sebastian Raschka가 GPT-6 Astra 출시 직후 Astra의 사용 인상, computer use 학습 방식, Astra가 looped transformer를 쓴다는 보도를 정리하고, looped transformer의 구조(Nanbeige4.2-3B, Universal Transformer, Ouro, Mixture-of-Recursions)와 비용, 그리고 looping이 chain-of-thought를 숨긴다는 주장의 타당성을 검토한 뒤 관련 최신 논문 4편을 소개하는 해설 글이다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 제목 | GPT-6 Astra, Looped Transformers, and Hidden Reasoning |
| 저자 | Sebastian Raschka |
| 매체 | Ahead of AI (magazine.sebastianraschka.com, Substack) |
| 발행일 | 2026-09-09 |
| URL | https://magazine.sebastianraschka.com/p/gpt-6-astra-looped-transformers-and |
| 수집 | 2026-10-19, `fetch_article.py` jina tier, 본문 약 4만 8천 자 |
| 비고 | 같은 주제의 짧은 영상 버전(YouTube)이 있다. 원문 Figure 1, 4, 11, 14, 16~18(벤치마크와 토큰 수 그래프, Paint 비교 등)은 수집본에 이미지가 남지 않았다 |

글의 구성은 세 부분이다. 첫째는 GPT-6 Astra의 성능 인상과 computer use 학습, 둘째는 looped transformer의 원리와 비용, 셋째는 looping과 숨겨진 reasoning trace의 관계 및 관련 논문이다.

## 2. 주요 기여 (Key Contributions)

- Astra를 직접 써 본 인상과 독립 벤치마크(Artificial Analysis) 결과를 정리하고, 공유 harness 평가가 Astra의 주력 harness 성능을 과소평가할 수 있다는 점을 지적한다.
- computer use 강화학습이 Mac을 환경으로 쓰는 7단계 워크플로를 설명한다.
- looped transformer를 "같은 transformer block 묶음에 중간 표현을 여러 번 통과시키되 가중치는 공유하는 구조"로 정의하고, Nanbeige4.2-3B를 예로 파라미터, 연산량, KV cache 비용을 항목별로 분석한다.
- 반복 횟수를 정하는 세 방식(고정 횟수, Universal Transformer의 adaptive halting, Mixture-of-Recursions의 router)을 비교한다.
- RNN과 looped transformer의 차이(시간 방향 반복 대 깊이 방향 반복)를 정리한다.
- "looping이 reasoning trace를 숨긴다"는 The Information 보도를 검토하고, 짧아진 trace는 모델 능력 향상의 부수 효과일 가능성이 크다는 저자 의견을 제시한다.
- 관련 논문 4편(Geiping 2025 latent reasoning, Zhu 2025 virtual logic depth, SMELT 2026, Full-bandwidth transformer 2026)의 결과를 요약한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 GPT-6 Astra 개관

저자는 Astra가 지금까지 써 본 모델 중 가장 좋으며, GPT-5.6 대비 글쓰기, 수학, 코딩 등 거의 모든 범주에서 앞서지만 특히 3D 렌더링과 애니메이션 같은 그래픽 과제에서 상대적으로 더 뛰어나다고 평가한다.

| 관찰 | 내용 |
|---|---|
| ARC-AGI-3 | Astra 99.9%, GPT-5.6 Sol 7.8%. 단 OpenAI가 harness 설정 두 가지를 바꿔 GPT-5.6 Sol 점수를 13.3%에서 38.3%로 세 배 가까이 올렸다는 글도 따로 냈다 |
| Artificial Analysis Coding Agent Index v1.4 | Astra가 최전선이지만 큰 격차로 앞서지는 않는다 |
| Artificial Analysis Intelligence Index v4.2 | 코딩 외 과제를 섞은 종합 지수에서도 같은 경향 |
| 학습 규모 | NVIDIA CEO 발언에 따르면 Grace Blackwell GPU 약 10만 개로 학습했다 |

Artificial Analysis 평가는 독립 기관이 수행한다는 장점이 있다. GDPval-AA와 AA-Briefcase는 오픈소스 최소 harness인 Stirrup을 모든 LLM에 공통으로 쓰고, Terminal-Bench v2.1은 Terminus 2, τ³-Banking은 τ-Bench harness를 쓴다. 공통 harness는 같은 조건 비교를 가능하게 하지만, 모델은 대개 하나의 주력 harness를 염두에 두고 학습되므로 agentic 평가가 Astra의 주력 harness 성능을 과소평가할 수 있다.

저자는 부수 의견으로, 최신 LLM은 프롬프트 이해가 좋아졌으므로 기존 `AGENTS.md`와 `SKILL.md` 내용 일부를 지우거나 보관하는 편이 나을 수 있다고 적는다. 과도한 지시가 새 모델을 불필요하게 제약할 수 있기 때문이다. 재사용 효율 때문에 스킬 파일이 여전히 유용한 워크플로도 있으므로, 지시 파일을 갱신하거나 다시 생성할 시점이라는 취지다.

### 3.2 computer use 학습

Astra는 Codex/ChatGPT 앱을 통해 로컬 컴퓨터의 소프트웨어를 조작하는 computer use에서 특히 강하다. 저자는 브라우저판 MS Paint에서 Astra Medium과 High가 마우스로 자신의 사진을 다시 그리게 한 비교를 보여 준다. LLM은 텍스트 모델이라 글쓰기, 코딩, API, CLI가 쉬운 과제이고, CLI가 없는 소프트웨어를 쓰려면 GUI 조작 능력이 필요하다. 저자는 이를 휴머노이드 로봇에 비유한다. 특정 작업에 가장 효율적이지는 않지만 범용성이 높다는 점이다.

OpenAI가 Mac Mini와 Mac Studio 수만 대를 강화학습용으로 샀다는 보도가 있다. Mac은 모델을 학습시키는 하드웨어가 아니라 모델이 macOS 사용법을 배우는 환경이다. 모델은 NVIDIA GPU에 있고 API로 Mac에 연결된다. 워크플로는 다음과 같다.

1. 모델에 "앱 xyz를 열고 abc를 하라" 같은 과제를 준다.
2. harness가 macOS 화면 스크린샷을 제공한다.
3. LLM이 마우스와 키보드 동작(클릭, 키 입력, 스크롤)을 예측한다.
4. harness가 그 동작을 Mac에서 실행한다.
5. 갱신된 화면의 새 스크린샷을 넣는다.
6. 과제가 성공하거나 실패할 때까지 2~5단계를 반복한다.
7. 성공과 실패 신호, verifier(grader)를 post-training의 강화학습 피드백으로 쓴다. 일반 RLVR과 유사하다.

저자는 computer use 학습이 학습 파이프라인의 근본적 패러다임 전환은 아니며, Astra도 RLVR로 학습하고 reasoning trace를 생성하는 reasoning model이라고 본다.

### 3.3 looped transformer의 정의

The Information은 공식 출시 이틀 전 내부 정보를 인용해 Astra가 "recurrent depth" 또는 "looped transformer"를 쓴다고 보도했다. 저자의 정의는 다음과 같다. looped transformer는 중간 표현을 같은 transformer block에 한 번이 아니라 여러 번 통과시키는 아키텍처 변형이며, block을 더 추가하는 것과 달리 반복 사이에 가중치가 같다.

| 용어 | 저자 정의 |
|---|---|
| transformer block | attention, feedforward 모듈, normalization, shortcut 연결을 담은 단위. 논문에서는 흔히 transformer layer라 부른다 |
| stack | transformer block의 연속 |
| block application | 입력을 transformer block에 한 번 통과시키는 것 |

기본 발상은 2018년 Universal Transformers 논문에 이미 있었다.

### 3.4 Nanbeige4.2-3B

Nanbeige4.2-3B는 2026년 7월 공개된 open-weight LLM(arXiv 2607.22083)이다. 겉모양은 일반 Transformer이지만 stack 끝에서 처음으로 돌아가는 화살표가 있다. 입력은 토큰화와 임베딩을 거쳐 각자 가중치가 다른 22개 block을 지나고, 첫 pass 뒤 hidden state가 같은 22개 block을 다시 통과한다.

- 펼치면 block application은 44회다. 23번째 application은 block 1의 가중치를, 24번째는 block 2의 가중치를 쓴다.
- 유효 깊이를 22에서 44로 늘리면서 transformer 가중치를 추가하지 않는다.
- 그림 기준 구성: 어휘 크기 약 16만 6천 개, 지원 context 26만 2천 토큰, 임베딩 차원 3,072, Grouped-query attention(Q head 48개, KV head 8개, group size 6, head dim 128), feedforward 중간 projection 10,752, RMSNorm, RoPE.
- 2회인 이유: 논문은 2회가 가장 효율적인 설정이었다고만 밝힌다. 3회로 늘리면 성능이 조금 오르지만 추가 연산 비용만큼의 가치가 없었다.

### 3.5 looping의 비용

| 비용 항목 | 22 block 1 pass 대비 looping(22 block 2 pass) | 44 block 1 pass 대비 |
|---|---|---|
| 저장 파라미터(transformer block) | 같다 | 약 절반 |
| forward 연산 | 44회 application으로 두 배 | 비슷하다 |
| backward | 공유 stack의 두 반복 모두로 gradient가 흐른다 | 비슷하다. optimizer가 갱신할 고유 파라미터만 적다 |
| KV cache | 두 배 | 같다 |

임베딩층과 출력층은 이 비교에서 별개다. Nanbeige4.2-3B에서 두 층은 전체 3B 파라미터의 약 25%를 차지하며, 두 층의 가중치를 공유하면 12.5%로 줄일 수 있다. 원문 Figure 7의 가상 비교는 22 block 1 pass와 22 block 2 pass가 각각 전체 4.17B 파라미터, 44 block 1 pass가 7.32B 파라미터라고 적는다. KV cache 깊이는 각각 22, 44, 44 effective layer다.

KV cache는 이전 토큰의 attention key와 value를 저장해 다음 토큰 생성에 재사용하는 장치다. 가중치를 공유해도 두 번째 pass에 들어오는 중간 상태가 달라 key와 value도 달라진다. 예를 들어 block application 1과 23은 같은 block 1을 쓰지만 각자 KV cache 항목이 필요하다. Nanbeige 연구진은 pass 사이에 KV cache를 공유하는 시도도 했다. KV cache 크기는 절반이 됐지만 성능이 나빠졌고, 공개 버전은 cache를 분리한 쪽이다.

Nanbeige 기술 보고서의 추가 선택은 두 가지다.

1. 처음부터 looped 아키텍처로 학습한 쪽이 이미 pre-training된 Transformer를 upcycling으로 변환한 쪽보다 좋았다.
2. 2회 pass가 선호하는 절충점이었다. pass를 늘리면 이득은 작고 학습이 느려지며 최적화가 불안정해졌다.

### 3.6 반복 횟수를 정하는 방식

| 방식 | 반복 단위 | 반복 횟수 결정 |
|---|---|---|
| Nanbeige4.2-3B | 22 block stack | 2회 고정 |
| Universal Transformer (2018) | 단일 block | 고정, 또는 adaptive halting |
| Ouro-Thinking 2.6B (ByteDance) | 48 block stack | 4회. 학습된 exit gate가 출구별 확률을 내고 누적 확률 임계값으로 출력 pass를 고른다 |
| Mixture-of-Recursions (2025) | 첫 block과 마지막 block 사이의 recursion block | 토큰별 학습된 router |
| Geiping 2025 latent reasoning | 앞 2 block과 뒤 2 block 사이의 4 block stack | 학습 시 무작위 샘플링, 추론 시 사용자가 고정 예산 지정, KL 기반 조기 종료 |

Universal Transformer의 adaptive halting은 작은 학습 함수가 매 단계 위치마다 halting probability를 내고, 연속 반복의 확률 합이 임계값을 넘으면 그 위치의 반복을 멈춘다. 최대 반복 횟수도 상한으로 둔다. 원문 Figure 8의 예에서 토큰 위치 1은 2 step, 위치 2는 4 step, 위치 3은 3 step을 쓰고, 멈춘 위치는 이후 단계에서 상태를 그대로 전달(carry forward)한다.

Ouro-Thinking 2.6B는 48개 block을 4회 적용해 192회 block application을 수행하면서 48개 block의 가중치만 저장한다. 다만 공개된 Hugging Face 구현은 설정된 모든 pass를 계산한 뒤 출력을 고르므로 사실상 반복이 4회로 고정돼 있다.

Mixture-of-Recursions는 Universal Transformer의 정교한 버전이다. router는 mixture-of-experts의 라우팅과 비슷하지만 어느 전문가로 보낼지가 아니라 공유 stack을 몇 번 적용할지를 정한다. router는 문맥 정보를 담은 토큰의 hidden representation을 입력으로 받으므로, 같은 단어라도 위치와 앞 문맥에 따라 반복 횟수가 달라진다. 라우팅 방식은 두 가지다.

- expert-choice routing: 각 recursion step이 처리할 토큰을 고른다. 빠진 토큰은 이후 step에서 제외된다.
- token-choice routing: router가 처음에 한 번 결정해 각 토큰을 1회, 2회, 3회 경로 중 하나에 배정한다.

모델과 router는 함께 학습된다. 논문 그래프는 Vanilla Transformer, 고정 recursion(Recursive), MoR을 모델 크기와 학습 연산 예산별로 비교한다. 가장 작은 135M 모델에서는 Vanilla가 가장 좋고, 큰 모델에서는 MoR이 따라잡아 특히 작은 학습 예산에서 자주 앞선다. 가장 큰 예산에서는 곡선들이 매우 가깝다. 같은 학습 연산이라도 MoR은 일부 계산을 건너뛰므로 더 많은 토큰을 처리할 수 있다. 저자는 모델이 충분히 크면 looped transformer가 고정 연산 예산에서 품질을 올릴 수 있다고 정리하며, 작은 모델만 봤다면 반대 결론을 냈을 것이므로 규모 있는 실험이 중요하다고 덧붙인다.

### 3.7 RNN과의 비교

RNN도 이전 반복의 가중치를 재사용한다. 차이는 반복의 방향이다.

| 구분 | RNN | looped transformer |
|---|---|---|
| 가중치 공유 방향 | time step(토큰 순서) | 아키텍처 깊이 |
| 각 step 입력 | 다음 입력 요소와 이전 step의 hidden state | 같은 토큰의 중간 표현 |
| 토큰 간 정보 전달 | hidden state를 앞으로 전달 | attention |

저자는 비유가 헷갈리면 looped transformer를 "가중치 공유를 곁들여 모델을 키우는 것"으로 생각하면 된다고 적는다.

### 3.8 Astra가 looping을 쓰는가

공식 확인은 없고 보도뿐이다. 저자는 다음 근거로 사용 가능성이 높다고 본다.

1. The Information 보도가 있다.
2. 과거 연구에서 유망했던 기법이다.
3. OpenAI 수석 과학자가 "Astra를 포함한 현재 최전선 모델의 계산 그래프 깊이는 GPT-4의 두 배 이내"라고 말했다. 다만 이 발언은 looping을 명시적으로 확인하지 않으며, 일반 block을 두 배로 쓴다는 뜻일 수도 있다.

저자는 Astra 성능의 주된 원인은 개선된 학습 레시피와 학습 데이터이며, The Information이 looping의 기여를 과대평가했다고 본다.

### 3.9 looping과 reasoning trace

저자의 결론은 looped transformer가 chain-of-thought를 숨기는 주요 요인이 아니라는 것이다. 근거는 다음과 같다.

- OpenAI는 o1부터 reasoning trace 대부분을 사용자에게 숨겨 왔으므로 최종 사용자에게는 차이가 크지 않다. 해석 가능성 우려는 주로 모델 개발자 쪽 문제다.
- reasoning model은 최종 답 전에 일반 텍스트 토큰으로 중간 단계를 생성한다. 원문 예시는 합이 10이고 곱이 21인 두 수를 묻는 문제로, 모델이 5와 5를 시도해 곱이 25임을 확인하고 되돌아가(backtracking) 3과 7을 검산한다. 중간 단계는 scratch pad 역할을 하며 최종 답 전에 계산을 더한다.
- looping도 계산을 더하므로, 내부 계산이 많은 모델은 외부 thinking 토큰이 덜 필요하다는 주장이 가능하다.
- OpenAI 벤치마크에서 Astra는 effort 수준 전체로 보면 GPT-5.6 Sol보다 토큰을 반드시 덜 쓰지는 않는다. 다만 같은 정확도에서는 더 적게 쓴다.
- 토큰이 적은 것은 실수와 backtracking이 줄어든 결과일 수 있다. GPT-5.6 Luna는 비슷한 성능에서 Sol보다 토큰을 80% 더 쓰지만, Sol이 훨씬 덜 해석 가능하다고 우려하는 사람은 없다. 더 유능한 모델은 더 적은 토큰으로 문제를 푼다.
- reasoning trace가 모델 내부를 충실히 기술한다는 보장은 원래 없다(arXiv 2305.04388). 저자가 보는 유일한 타당한 우려는 looped 모델이 일반 모델보다 가짜 trace를 더 자주 내는 경우인데, 그 증거는 없다.
- Astra system card는 reasoning trace의 monitorability가 Sol 대비 약간 후퇴했다는 증거를 적었다. 주로 짧고 정보가 적은 trace와 관련되며, looping이 근본 원인이라는 근거는 아니다.

Jakub Pachocki(OpenAI 수석 과학자)는 저자의 의견 공유 몇 시간 뒤 다음 취지의 설명을 냈다. 혼란스러운 보도로 촉발된 unmonitorability 경쟁을 막고 싶다. Astra를 포함한 현재 최전선 모델의 계산 그래프 깊이는 GPT-4의 두 배 이내다. OpenAI는 첫 reasoning model부터 CoT monitoring을 보존하고 활용해 왔다. 이 기법은 취약하고 아키텍처 변화와 무관한 이유로 나빠지는 추세이며, 이를 강화하는 것이 현재 연구의 핵심 목표다. 저자는 "confused reporting"이 The Information 기사를 가리키며 looping이 CoT 변화와 무관하다는 함의로 읽는다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 Geiping et al. 2025, Recurrent Depth 기반 latent reasoning

- 3.5B 파라미터 모델을 8,000억 토큰으로 학습했다.
- 앞 2 block, 공유 4 block stack, 뒤 2 block으로 구성한다. 공유 stack은 매 반복마다 이전 반복의 hidden state와 앞 block 출력(초기 입력 표현)을 연결해 학습된 선형 projection으로 합친 뒤 입력받는다. 초기 hidden state는 무작위다.
- 그림 기준 32회 반복 시 block application은 2 + 4×32 + 2 = 132회이고 고유 block은 8개다.
- 학습 중 반복 횟수를 무작위 샘플링해 추론 시 다양한 연산량에 대비시킨다. 추론 시 사용자가 8, 32, 64회 같은 고정 예산을 정한다.
- 토큰별 adaptive stopping: 연속 두 반복의 next-token 분포 KL-divergence가 임계값 아래면 멈춘다.
- HellaSwag는 약 8회 이후 성능이 거의 평탄해지고 GSM8K와 HumanEval은 더 많은 반복에서 이득을 본다.
- 제목에 latent reasoning이 있지만 모델은 여전히 텍스트 CoT를 생성할 수 있다. looping은 각 출력 토큰 전에 계산을 더할 뿐이다.

### 4.2 Zhu et al. 2025, Beyond Parameters (virtual logic depth)

정보 저장과 문제 해결을 분리해 측정한다.

| 실험 | 결과 | 해석 |
|---|---|---|
| memorization | 파라미터 수가 고정이면 looping으로 저장 정보량이 거의 변하지 않는다. 고유 파라미터를 늘리면 늘어난다 | looping은 계산 장치이지 저장 장치가 아니다 |
| reasoning | block 재사용이 파라미터 추가 없이 다단계 수학 문제 성능을 올린다 | 저장 공간이 늘지 않아도 추가 계산이 문제 해결을 돕는다 |

원문 Figure 20 기준 base model의 토큰당 흡수 정보 엔트로피는 파라미터 5M에서 약 3.4 bit, 20M에서 약 7.6 bit로 커진다. 반면 VLD 패턴(Sequence, Cycle, Inverse Cycle)으로 effective depth를 4에서 16으로 늘려도 5M 모델은 약 3.4~3.8 bit, 20M 모델은 약 7.5~8.3 bit 범위에 머문다.

### 4.3 SMELT 2026 (Compute-Matched MoE Looped Transformers)

- 토큰당 연산량, 비임베딩 총 파라미터, KV cache를 거의 같게 맞춘 상태에서 looped와 일반 Transformer를 비교한다.
- mixture-of-experts 아키텍처에서 transformer block의 가운데 절반을 두 번 적용한다(Nanbeige와 비슷하되 latent reasoning처럼 앞뒤 block이 감싼다).
- 추가 block application의 연산을 상쇄하려고 hidden dimension을 줄이고, 줄어든 파라미터는 expert를 추가해 회복한다. attention head 구성도 조정해 KV cache를 맞춘다.
- 비임베딩 파라미터 54B까지 실험했고, 적합한 scaling 곡선에서 같은 validation loss에 도달하는 데 학습 연산이 약 6.8~18% 덜 든다고 추정한다.
- 저자는 이를 같은 연산 예산에서 조금 더 나은 모델을 준다는 뜻으로 읽는다.

### 4.4 Full-bandwidth transformer 2026

- 토큰 위치 방향의 recurrence를 연구한다. 각 decoding step에서 이전 토큰의 최종 hidden state와 새로 샘플링된 토큰의 임베딩을 학습된 gate로 합쳐 다음 forward pass 입력으로 쓴다.
- 1B base model에서 latent feedback이 MATH500의 reasoning trace를 줄이면서 정확도를 유지하거나 올렸다. 원문 Figure 22 기준 Pass@1은 Standard 약 0.41, Soft(latent feedback) 약 0.46, Fused(feedback과 추가 prefill pass) 약 0.41이고, 중간 reasoning 길이는 Standard 약 500 토큰, Soft 약 480 토큰, Fused 약 463 토큰이다.
- instruction tuning 후에는 단축 효과가 사라진다.
- 한계: 짧은 trace가 덜 충실한지는 확인하지 않았고, 일반적인 방식으로 모델을 키울 때도 비슷한 효과가 나는지 비교하지 않았다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- Astra의 looping 사용은 보도일 뿐 공식 확인이 없다. Astra는 open-weight가 아니므로 외부에서 검증할 수 없다.
- 저자는 공유 harness 평가가 주력 harness 성능을 과소평가할 수 있다고 보지만, 그 크기는 같은 과제에서 harness를 바꿔 비교해야 확인할 수 있다.
- looped transformer는 저장 파라미터만 줄이고 연산량과 KV cache는 줄이지 않는다.
- reasoning trace 단축이 해석 가능성 저하인지, 능력 향상의 부수 효과인지는 실험으로 확정되지 않았다.
- 저자 전망: 앞으로 몇 달 동안 computer use가 오픈소스와 상용 harness의 핵심 관심사가 된다. computer use에서는 오픈소스 harness를 감사할 수 있다는 점이 중요하다.

## 6. 관련 연구 (Related Work)

| 자료 | 내용 |
|---|---|
| Universal Transformers (Dehghani 2018, arXiv 1807.03819) | 단일 block 반복과 adaptive halting |
| Nanbeige4.2-3B (arXiv 2607.22083) | 22 block stack 2회 반복 |
| Ouro (ByteDance, arXiv 2510.25741) | 48 block stack 4회 반복, 학습된 exit gate |
| Mixture-of-Recursions (arXiv 2507.10524) | 토큰별 router로 반복 횟수 결정 |
| Geiping 2025 (arXiv 2502.05171) | prelude, 공유 stack, coda 구조와 test-time loop scaling |
| Zhu 2025 Beyond Parameters (arXiv 2506.18233) | memorization과 reasoning 분리 측정 |
| SMELT (arXiv 2609.01343) | 연산량 맞춘 MoE looped transformer scaling law |
| Full-bandwidth transformer (arXiv 2608.08888) | 토큰 위치 방향 latent feedback |
| arXiv 2305.04388 | CoT 설명이 충실하지 않을 수 있음 |

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| looped transformer | 같은 transformer block 묶음에 중간 표현을 여러 번 통과시키고 반복 사이에 가중치를 공유하는 구조. recurrent depth라고도 한다 |
| block application | 입력을 transformer block에 한 번 통과시키는 것. looping의 유효 깊이를 세는 단위 |
| adaptive halting | 위치별 halting probability 누적합이 임계값을 넘으면 그 위치의 반복을 멈추는 방식 (Universal Transformer) |
| exit gate | 출구별 확률을 내고 누적 확률 임계값으로 출력 pass를 고르는 학습된 장치 (Ouro) |
| expert-choice routing / token-choice routing | MoR의 두 라우팅 방식. 단계마다 토큰을 고르는가, 처음에 경로를 배정하는가의 차이 |
| latent feedback | 이전 토큰의 최종 hidden state를 다음 토큰 입력에 gate로 합치는 방식 (Full-bandwidth transformer) |
| monitorability | reasoning trace로 모델의 의도와 행동을 감시할 수 있는 정도 |

## 8. 그림 후보 (Figure Candidates)

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | Artificial Analysis Intelligence Index 종합 점수 비교 차트 (원문 Figure 2) | fetched | (선택) 벤치마크 |
| fig02 | computer use 학습 워크플로. 과제 프롬프트, 스크린샷, 동작 예측, Mac에서 실행, 성공과 실패 피드백 순환 (원문 Figure 3) | fetched | (선택) Astra 맥락 |
| fig03 | Nanbeige4.2-3B 아키텍처. 22개 transformer block stack을 같은 가중치로 한 번 더 반복해 총 44층으로 동작한다 (원문 Figure 5) | fetched | ★ wiki 권장 (architecture) |
| fig04 | Nanbeige4.2-3B를 두 번의 pass로 펼친 44회 block application (원문 Figure 6) | fetched | (fig03과 중복) |
| fig05 | 22 block 1 pass, 22 block 2 pass, 44 block 1 pass의 고유 block 수, block application 수, KV cache 깊이, 전체 파라미터 비교 (원문 Figure 7) | fetched | ★ wiki 권장 (cost) |
| fig06 | KV cache 해설 기사 링크 카드 썸네일 | fetched | (제외) 링크 카드 |
| fig07 | Universal Transformer의 adaptive halting. 토큰 위치마다 2, 4, 3 step에서 멈추고 이후 상태를 그대로 전달한다 (원문 Figure 8) | fetched | ★ wiki 권장 (method) |
| fig08 | Mixture-of-Recursions의 recursion block과 토큰별 1, 2, 3 step 배정 예시 (원문 Figure 9) | fetched | ★ wiki 권장 (method) |
| fig09 | Mixture-of-Recursions의 두 라우팅 방식. 단계마다 토큰을 고르는 expert-choice와 처음에 경로를 배정하는 token-choice (원문 Figure 10) | fetched | ★ wiki 권장 (method) |
| fig10 | RNN 구조 일러스트 (저자 2022년 도서 그림, 원문 Figure 12) | fetched | (fig11과 중복) |
| fig11 | RNN과 looped transformer의 반복 비교. RNN은 time step 방향, looped transformer는 깊이 방향으로 가중치를 공유한다 (원문 Figure 13) | fetched | ★ wiki 권장 (concept) |
| fig12 | reasoning model 응답 예시. 중간 단계, backtracking, 최종 답을 표시했다 (원문 Figure 15) | fetched | (선택) reasoning trace |
| fig13 | Geiping et al.의 latent reasoning 구조. 앞 2 block, 32회 반복하는 공유 4 block, 뒤 2 block으로 132회 block application (원문 Figure 19) | fetched | ★ wiki 권장 (architecture) |
| fig14 | memorization 실험. 고유 파라미터 수가 늘면 흡수 정보량이 커지지만 block 반복으로 effective depth를 늘리면 거의 변하지 않는다 (원문 Figure 20) | fetched | ★ wiki 권장 (result) |
| fig15 | latent feedback 실험. 정확도는 비슷하거나 높고 중간 reasoning 길이는 짧아진다 (원문 Figure 22) | fetched | ★ wiki 권장 (result) |
| fig16 | Raschka 글 전체 페이지 스크린샷 | screenshot | (아카이브용) |
| fig17 | Raschka 글 화면 영역 크롭 01 (crop01.png) | crop | (크롭, 원본 이미지와 중복) |
| fig18 | Raschka 글 화면 영역 크롭 02 (crop02.png) | crop | (크롭, 원본 이미지와 중복) |
| fig19 | Raschka 글 화면 영역 크롭 03 (crop03.png) | crop | (크롭, 원본 이미지와 중복) |
| fig20 | Raschka 글 화면 영역 크롭 04 (crop04.png) | crop | (크롭, 원본 이미지와 중복) |
| fig21 | Raschka 글 화면 영역 크롭 05 (crop05.png) | crop | (크롭, 원본 이미지와 중복) |
| fig22 | Raschka 글 화면 영역 크롭 06 (crop06.png) | crop | (크롭, 원본 이미지와 중복) |
| fig23 | Raschka 글 화면 영역 크롭 07 (crop07.png) | crop | (크롭, 원본 이미지와 중복) |
| fig24 | Raschka 글 화면 영역 크롭 08 (crop08.png) | crop | (크롭, 원본 이미지와 중복) |
| fig25 | Raschka 글 화면 영역 크롭 09 (crop09.png) | crop | (크롭, 원본 이미지와 중복) |
| fig26 | Raschka 글 화면 영역 크롭 10 (crop10.png) | crop | (크롭, 원본 이미지와 중복) |
| fig27 | Raschka 글 화면 영역 크롭 11 (crop11.png) | crop | (크롭, 원본 이미지와 중복) |
| fig28 | Raschka 글 화면 영역 크롭 12 (crop12.png) | crop | (크롭, 원본 이미지와 중복) |
| fig29 | Raschka 글 화면 영역 크롭 13 (crop13.png) | crop | (크롭, 원본 이미지와 중복) |
| fig30 | Raschka 글 화면 영역 크롭 14 (crop14.png) | crop | (크롭, 원본 이미지와 중복) |
| fig31 | Raschka 글 화면 영역 크롭 15 (crop15.png) | crop | (크롭, 원본 이미지와 중복) |
| fig32 | Raschka 글 화면 영역 크롭 16 (crop16.png) | crop | (크롭, 원본 이미지와 중복) |
| fig33 | Raschka 글 화면 영역 크롭 17 (crop17.png) | crop | (크롭, 원본 이미지와 중복) |
| fig34 | Raschka 글 화면 영역 크롭 18 (crop18.png) | crop | (크롭, 원본 이미지와 중복) |
| fig35 | Raschka 글 화면 영역 크롭 19 (crop19.png) | crop | (크롭, 원본 이미지와 중복) |
| fig36 | Raschka 글 화면 영역 크롭 20 (crop20.png) | crop | (크롭, 원본 이미지와 중복) |
| fig37 | Raschka 글 화면 영역 크롭 21 (crop21.png) | crop | (크롭, 원본 이미지와 중복) |
| fig38 | Raschka 글 화면 영역 크롭 22 (crop22.png) | crop | (크롭, 원본 이미지와 중복) |
| fig39 | Raschka 글 화면 영역 크롭 23 (crop23.png) | crop | (크롭, 원본 이미지와 중복) |
| fig40 | Raschka 글 화면 영역 크롭 24 (crop24.png) | crop | (크롭, 원본 이미지와 중복) |
| fig41 | Raschka 글 화면 영역 크롭 25 (crop25.png) | crop | (크롭, 원본 이미지와 중복) |
| fig42 | Raschka 글 화면 영역 크롭 26 (crop26.png) | crop | (크롭, 원본 이미지와 중복) |
| fig43 | Raschka 글 화면 영역 크롭 27 (crop27.png) | crop | (크롭, 원본 이미지와 중복) |
| fig44 | Raschka 글 화면 영역 크롭 28 (crop28.png) | crop | (크롭, 원본 이미지와 중복) |
| fig45 | Raschka 글 화면 영역 크롭 29 (crop29.png) | crop | (크롭, 원본 이미지와 중복) |
| fig46 | Raschka 글 화면 영역 크롭 30 (crop30.png) | crop | (크롭, 원본 이미지와 중복) |
| fig47 | Raschka 글 화면 영역 크롭 31 (crop31.png) | crop | (크롭, 원본 이미지와 중복) |
| fig48 | Raschka 글 화면 영역 크롭 32 (crop32.png) | crop | (크롭, 원본 이미지와 중복) |
| fig49 | Raschka 글 화면 영역 크롭 33 (crop33.png) | crop | (크롭, 원본 이미지와 중복) |
| fig50 | Raschka 글 화면 영역 크롭 34 (crop34.png) | crop | (크롭, 원본 이미지와 중복) |
| fig51 | Raschka 글 화면 영역 크롭 35 (crop35.png) | crop | (크롭, 원본 이미지와 중복) |
| fig52 | Raschka 글 화면 영역 크롭 36 (crop36.png) | crop | (크롭, 원본 이미지와 중복) |
| fig53 | Raschka 글 화면 영역 크롭 37 (crop37.png) | crop | (크롭, 원본 이미지와 중복) |
| fig54 | Raschka 글 화면 영역 크롭 38 (crop38.png) | crop | (크롭, 원본 이미지와 중복) |
| fig55 | Raschka 글 화면 영역 크롭 39 (crop39.png) | crop | (크롭, 원본 이미지와 중복) |
| fig56 | Raschka 글 화면 영역 크롭 40 (crop40.png) | crop | (크롭, 원본 이미지와 중복) |
| fig57 | Raschka 글 화면 영역 크롭 41 (crop41.png) | crop | (크롭, 원본 이미지와 중복) |
| fig58 | Raschka 글 화면 영역 크롭 42 (crop42.png) | crop | (크롭, 원본 이미지와 중복) |
| fig59 | Raschka 글 화면 영역 크롭 43 (crop43.png) | crop | (크롭, 원본 이미지와 중복) |
| fig60 | Raschka 글 화면 영역 크롭 44 (crop44.png) | crop | (크롭, 원본 이미지와 중복) |
| fig61 | Raschka 글 화면 영역 크롭 45 (crop45.png) | crop | (크롭, 원본 이미지와 중복) |
| fig62 | Raschka 글 화면 영역 크롭 46 (crop46.png) | crop | (크롭, 원본 이미지와 중복) |
