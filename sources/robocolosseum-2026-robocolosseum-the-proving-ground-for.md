---
title: "RoboColosseum, The proving ground for physical AI"
type: article
year: 2026
category: physical-ai
raw_path: raw/articles/robocolosseum-2026-robocolosseum-the-proving-ground-for.md
raw_filename: "robocolosseum-2026-robocolosseum-the-proving-ground-for.md"
source_collection: external
author: "RoboColosseum"
url: "https://robocolosseum.ai/"
publisher: "robocolosseum.ai"
tags: [physical-ai, benchmark]
figures:
  - id: fig01
    file: assets/robocolosseum-2026-robocolosseum-the-proving-ground-for/page-full.png
    raw: raw/articles/robocolosseum-2026-robocolosseum-the-proving-ground-for-figures/page-full.png
    caption: "홈페이지 전체 스크린샷(상단 6000px)"
    strategy: screenshot
    curated: false
  - id: fig02
    file: assets/robocolosseum-2026-robocolosseum-the-proving-ground-for/crop01.png
    raw: raw/articles/robocolosseum-2026-robocolosseum-the-proving-ground-for-figures/crop01.png
    caption: "히어로 영상 문구와 두 평가 트랙 설명 카드, 트랙별 운영 국가 표기"
    strategy: crop
    curated: false
  - id: fig03
    file: assets/robocolosseum-2026-robocolosseum-the-proving-ground-for/crop02.png
    raw: raw/articles/robocolosseum-2026-robocolosseum-the-proving-ground-for-figures/crop02.png
    caption: "논문 BibTeX 인용 블록"
    strategy: crop
    curated: false
---

## 한 줄 요약 (One-line Summary)

RoboColosseum 공식 홈페이지로, 140개 이상 장면에 수백 대 로봇을 배치한 실세계 평가 서비스의 두 트랙, 평가 신청에서 leaderboard 게시까지 4단계 절차, 연결 방식, 공정성 장치, 데이터 공개 방침을 FAQ 형식으로 안내한다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 제목 | RoboColosseum, The proving ground for physical AI |
| 주소 | https://robocolosseum.ai/ |
| 성격 | 프로젝트 소개와 평가 신청 페이지 |
| 수집일 | 2026-11-09 |

## 2. 주요 기여 (Key Contributions)

- 외부 팀이 자기 policy를 RoboColosseum에 맡기는 서비스 관점의 절차를 정리한다. 논문과 블로그에 없는 운영 정보다.
- 평가 가능 로봇 목록에 Earth Rover Mini+ 바퀴형 로봇이 추가 예정이라고 밝힌다.
- 트랙별 운영 국가를 표기한다: Open track은 싱가포르, 중국, 미국, 영국이고 Fine-tune track은 싱가포르, 말레이시아, 중국이다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 두 트랙의 한 줄 정의

| 트랙 | 정의 |
|---|---|
| Open track | 이름을 숨긴 두 모델이 같은 장면에서 같은 새 지시문(instruction)을 수행하고 평가자가 더 나은 실행을 고르거나 무승부를 선언한다 |
| Fine-tune track | 모든 모델이 고정 과제의 같은 시연 데이터(demonstration) 100개로 fine-tuning한 뒤 25회 시도한다 |

### 3.2 평가 절차 4단계

| 단계 | 내용 |
|---|---|
| Apply | policy와 결과를 원하는 로봇을 알려 신청한다 |
| Connect | policy API로 자체 추론 서버를 연결하거나, 체크포인트를 넘겨 로봇 옆 머신에서 서빙한다 |
| Evaluate | 운영자가 장면을 준비하고 Open track 비교와 Fine-tune track trial을 실행하며 모든 카메라를 녹화한다 |
| Track | 로봇별 leaderboard에서 상위 연구실 모델과 순위를 비교한다. 실패를 포함한 모든 실행을 Hugging Face에 공개한다 |

### 3.3 FAQ 요지

- 신청 자격: 운영 중인 로봇 중 하나에 맞는 policy를 가진 팀. 무료 10,000시간은 RoboColosseum 팀이 신청서를 검토해 배분한다.
- 로봇: Unitree G1 humanoid, bimanual YAM 스테이션, DROID 구성의 Franka, SO-ARM101. policy는 그 로봇의 카메라 입력을 받아 해당 action 형식을 출력해야 한다.
- 연결: 자체 추론 서버에 로봇이 실행 중 observation을 스트리밍하는 방식과, 체크포인트를 로봇 옆에서 서빙하는 방식 두 가지다.
- 채점: Open track은 로봇별 전체 비교로 rating을 적합해 불확실성과 함께 표시한다. Fine-tune track은 완전 성공과 단계별 progress를 보고한다.
- 공정성: 평가자는 trial A와 B만 보고 모델 이름을 모른다. 한 비교의 두 모델은 같은 로봇, 장면, 지시문을 차례로 수행한다. fine-tuning 모델은 모두 같은 시연 데이터로 학습한다.
- 공개: 두 트랙의 모든 실행을 영상과 함께 LeRobot 형식으로 Hugging Face에 올리고 점수는 공개 leaderboard에 게시한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

- 홈페이지는 140개 이상 장면에 수백 대 로봇을 배치했다고 표기한다. 논문의 124개 사이트는 2026년 9~10월 평가 구간 기준이다.
- 활성 embodiment 5종을 표기한다(4종 운영과 Earth Rover Mini+ 추가 예정이 섞인 값으로 보인다. 페이지에 내역은 없다).
- 결과 수치는 페이지에 없고 평가 뷰어(robocolosseum.ai/evals)와 Hugging Face로 연결한다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- 홍보와 신청 페이지라 방법론 근거와 수치는 논문을 따라야 한다.
- 동적 위젯(embodiment 목록, policy 로고)은 텍스트 추출에 잡히지 않았다.

## 6. 관련 연구 (Related Work)

- 대응 논문: Nguyen et al. 2026, arXiv 2611.02497 (페이지 하단 BibTeX 인용 블록).
- 데이터 공개처: huggingface.co/RoboColosseum.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| evaluation viewer | 블라인드 비교의 두 실행을 동기화 재생하고 평가자의 선택과 메모를 보여주는 웹 도구 |
| policy API | 외부 추론 서버를 평가 로봇에 연결하는 RoboColosseum 인터페이스 |

## 8. 그림 후보 (Figure Candidates)

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | 홈페이지 전체 스크린샷(상단 6000px) | screenshot | (아카이브) |
| fig02 | 히어로 영상 문구와 두 평가 트랙 설명 카드, 트랙별 운영 국가 표기 | crop | (아카이브) |
| fig03 | 논문 BibTeX 인용 블록 | crop | (아카이브) |
