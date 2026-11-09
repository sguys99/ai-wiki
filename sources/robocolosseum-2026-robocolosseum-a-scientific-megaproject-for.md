---
title: "RoboColosseum: A Scientific Megaproject for Evaluating Physical Intelligence In-the-Wild"
type: article
year: 2026
category: physical-ai
raw_path: raw/articles/robocolosseum-2026-robocolosseum-a-scientific-megaproject-for.md
raw_filename: "robocolosseum-2026-robocolosseum-a-scientific-megaproject-for.md"
source_collection: external
author: "RoboColosseum"
url: "https://robocolosseum.ai/blog/evaluating-physical-intelligence-in-the-wild/"
publisher: "robocolosseum.ai"
tags: [physical-ai, benchmark]
figures:
  - id: fig01
    file: assets/robocolosseum-2026-robocolosseum-a-scientific-megaproject-for/fig01.png
    raw: raw/articles/robocolosseum-2026-robocolosseum-a-scientific-megaproject-for-figures/fig01.png
    caption: "두 평가 트랙 개념도. (a) 고정 장면 데이터셋으로 fine-tuning 후 고정 장면에서 평가, (b) 학습 데이터 제한 없이 개방 장면에서 pairwise 비교"
    strategy: fetched
    curated: false
  - id: fig02
    file: assets/robocolosseum-2026-robocolosseum-a-scientific-megaproject-for/fig02.webp
    raw: raw/articles/robocolosseum-2026-robocolosseum-a-scientific-megaproject-for-figures/fig02.webp
    caption: "embodiment별 표준 하드웨어 셋업과 부품 표기(MolmoAct2 YAM, SO-101, Franka DROID, G1)"
    strategy: fetched
    curated: false
  - id: fig03
    file: assets/robocolosseum-2026-robocolosseum-a-scientific-megaproject-for/page-full.png
    raw: raw/articles/robocolosseum-2026-robocolosseum-a-scientific-megaproject-for-figures/page-full.png
    caption: "블로그 전체 페이지 스크린샷(상단 6000px)"
    strategy: screenshot
    curated: false
  - id: fig04
    file: assets/robocolosseum-2026-robocolosseum-a-scientific-megaproject-for/crop01.png
    raw: raw/articles/robocolosseum-2026-robocolosseum-a-scientific-megaproject-for-figures/crop01.png
    caption: "블로그 Figure 1 영역 크롭(두 트랙 개념도와 원문 캡션 포함)"
    strategy: crop
    curated: false
  - id: fig05
    file: assets/robocolosseum-2026-robocolosseum-a-scientific-megaproject-for/crop02.png
    raw: raw/articles/robocolosseum-2026-robocolosseum-a-scientific-megaproject-for-figures/crop02.png
    caption: "두 트랙 개념도만 잘라낸 크롭(원문 캡션 제외)"
    strategy: crop
    curated: false
  - id: fig06
    file: assets/robocolosseum-2026-robocolosseum-a-scientific-megaproject-for/crop03.png
    raw: raw/articles/robocolosseum-2026-robocolosseum-a-scientific-megaproject-for-figures/crop03.png
    caption: "블로그 Figure 2 영역 크롭(네 embodiment 셋업과 원문 캡션)"
    strategy: crop
    curated: false
  - id: fig07
    file: assets/robocolosseum-2026-robocolosseum-a-scientific-megaproject-for/crop04.png
    raw: raw/articles/robocolosseum-2026-robocolosseum-a-scientific-megaproject-for-figures/crop04.png
    caption: "Film 1 정지 화면. 실내 공간에 늘어선 Unitree G1 humanoid 편대"
    strategy: crop
    curated: false
  - id: fig08
    file: assets/robocolosseum-2026-robocolosseum-a-scientific-megaproject-for/crop05.png
    raw: raw/articles/robocolosseum-2026-robocolosseum-a-scientific-megaproject-for-figures/crop05.png
    caption: "Film 2 정지 화면. 데모에서는 모든 로봇이 좋아 보인다는 도입 문구"
    strategy: crop
    curated: false
  - id: fig09
    file: assets/robocolosseum-2026-robocolosseum-a-scientific-megaproject-for/crop06.png
    raw: raw/articles/robocolosseum-2026-robocolosseum-a-scientific-megaproject-for-figures/crop06.png
    caption: "Fine-tune Track 리더보드. 평균 trial 점수 π0.5 0.725, MolmoAct2 0.605, GR00T N1.7 0.552, G0.5 0.515, LingBot-VLA v2 0.465"
    strategy: crop
    curated: false
  - id: fig10
    file: assets/robocolosseum-2026-robocolosseum-a-scientific-megaproject-for/crop07.png
    raw: raw/articles/robocolosseum-2026-robocolosseum-a-scientific-megaproject-for-figures/crop07.png
    caption: "Open Track 리더보드. DCR rating(Elo 척도) GPT-6 Astra 1,778부터 Grok 4.7 964까지 8개 시스템"
    strategy: crop
    curated: false
---

## 한 줄 요약 (One-line Summary)

RoboColosseum 공식 블로그의 출범 글로, 실세계 로봇 평가를 허블 망원경이나 LHC 같은 공유 과학 인프라로 만들겠다는 동기와 두 트랙, DCR 순위 방식, 초기 결과 네 가지, 참여 방법을 소개한다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 제목 | RoboColosseum: A Scientific Megaproject for Evaluating Physical Intelligence In-the-Wild |
| 게시처 | robocolosseum.ai 블로그 |
| 저자 표기 | RoboColosseum 팀 (개인 저자 미표기) |
| 연도 | 2026 |
| 대응 논문 | arXiv 2611.02497 (Nguyen et al. 2026) |

## 2. 주요 기여 (Key Contributions)

- 로보틱스의 측정 가능한 진전이 시뮬레이션과 통제된 실험실에 머문다는 문제의식을 제시하고, 실세계 평가를 위한 공유 물리 인프라의 필요성을 주장한다.
- 공동 창립 기관을 밝힌다: NUS MAGIC Lab, BitRobot Foundation, Singapore Embodied AI Centre, Hugging Face.
- 논문보다 짧은 형식으로 두 트랙과 DCR의 핵심 아이디어를 설명하고, 게재 시점의 트랙별 leaderboard를 그림으로 보여준다.
- 무료 평가 10,000시간 신청 경로를 안내한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 동기

- 로봇 foundation model의 벤치마크 향상이 식당, 가정, 산업 현장 같은 예측 불가능한 조건에서의 신뢰성으로 이어진다는 보장이 없다.
- 개별 실험은 스냅샷만 주므로 분야 전체의 진전을 이해하려면 지속적인 측정 기반이 필요하다.
- 허블 우주 망원경과 대형 강입자 충돌기(LHC)처럼 개별 연구실이 닿지 못하는 질문을 공동체가 탐구하게 한 공유 인프라를 비유로 든다.
- 목표는 가설 검증, 실패 유형 발견, 접근법 비교, 진전 추적에 쓰는 물리 지능용 공유 과학 도구다.

### 3.2 두 트랙

| 트랙 | 측정 대상 | 설명 |
|---|---|---|
| Fine-tune track | 특정 과제 적응력 | 공유 과제별 데이터셋으로 fine-tuning 후 고정 사이트에서 평가. VLA, WAM, GAM, RL 기반 policy, agentic 프레임워크를 같은 testbed에서 비교 |
| Open track | 즉시 사용 능력 | 과제별 fine-tuning 없이 다양한 실세계 과제에서 pairwise 비교. pre-training 데이터 구성과 학습 목표가 물리 능력으로 이어지는 방식을 연구하는 기반 |

Figure 1 개념도에서 Fine-tune track은 모델 아키텍처(MLP, Transformer, diffusion)를 자유롭게 고르고 고정 장면 데이터셋으로 학습한 뒤 고정 장면에서 평가하며 장면은 시간이 지나며 추가된다. Open track은 학습 데이터 제한이 없고 주방, 세탁실, 창고, 야외 같은 개방 장면에서 두 policy를 비교한다.

### 3.3 기술 구현

- embodiment 안에서 하드웨어 셋업을 표준화한다. 현재 bimanual YAM, SO-101, DROID 구성의 Franka, G1 humanoid 4종에 걸쳐 수백 대 로봇을 운영하고, 30명 규모 전담 팀이 전일 교대로 평가한다.
- 평가는 싱가포르와 해외 파트너 장소에서 공간 기억, 정밀 manipulation, long-horizon planning, 실시간 적응을 요구하는 과제로 진행한다. 교실 의자 정리, 푸드코트 음식물 분류, 도서관 책 정리, 가정 집안일 같은 장면이 예시다.
- Fine-tune track은 과제당 시연 데이터(demonstration) 100개로 fine-tuning한 뒤 지정 장소에서 과제당 25 trial을 평가하고, 공간 배치와 조명을 조금씩 바꿔 강건성을 본다. task progress 점수와 완전 성공률로 순위를 매긴다.
- Open track은 블라인드 pairwise 비교로 Elo rating을 보고하고 DCR로 보완한다. DCR은 성공 확률을 σ(θ_i - β_j) = 1 / (1 + exp(-(θ_i - β_j)))로 두며 θ_i는 policy 능력, β_j는 과제 난이도다. 사람 난이도 1~10이 난이도 추정에 반영되고, 둘 다 성공과 둘 다 실패를 서로 다른 증거로 다룬다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

- 출범 시점에 4개 embodiment에서 실세계 평가 trial 15,000회 결과를 보고한다.
- Fine-tune track: π0.5, MolmoAct2, LingBot-VLA v2, G0.5, GR00T N1.7을 4개 embodiment 전부에서 평가한다.
- Open track: SO-101, bimanual YAM, Franka에서 같은 VLA 5종(MolmoAct2-SO-101, MolmoAct2-YAM, DROID 등 대규모 데이터로 학습한 버전)과 frontier 모델 3종(Grok 4.7, Claude Opus 5.5, GPT-6 Astra)을 평가한다. 41일 동안 124개 사이트에서 11,398회 평가를 수행했다.

게재 시점 leaderboard 그림의 값은 다음과 같다.

| 순위 | Fine-tune track 평균 trial 점수(0~1) | Open track DCR rating(Elo 척도) |
|---|---|---|
| 1 | π0.5 0.725 | GPT-6 Astra 1,778 |
| 2 | MolmoAct2 0.605 | Claude Opus 5.5 1,769 |
| 3 | GR00T N1.7 0.552 | MolmoAct2 1,767 |
| 4 | G0.5 0.515 | G0.5 1,677 |
| 5 | LingBot-VLA v2 0.465 | LingBot-VLA v2 1,392 |
| 6 | | π0.5 1,333 |
| 7 | | GR00T N1.7 1,320 |
| 8 | | Grok 4.7 964 |

네 가지 결론:

1. frontier AI 에이전트는 실제 로봇에서 특화 VLA policy와 경쟁한다. 901회 대응 비교에서 에이전트가 394회, VLA가 265회 더 많이 진행했다. 다만 신뢰할 만한 개방 환경 manipulation은 여전히 어렵다.
2. 모든 곳에서 최고인 단일 모델은 없다. 강점은 과제, embodiment, 트랙에 따라 바뀐다.
3. 이진 성공만으로는 전모가 보이지 않는다. G1에서 어떤 policy도 5개 과제를 완료하지 못했지만 평균 progress는 13.3%에서 23.2%까지 달랐다.
4. 평가가 쌓일수록 순위가 안정된다. active matchmaking은 약 400~500회 평가로 전체 데이터 leaderboard와 약 90% 일치에 도달하고, 균등 샘플링은 약 1,000회가 필요하다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- 블로그 자체는 한계를 따로 다루지 않는다. 세부 한계는 논문을 따른다.
- 11,398회 평가와 15,000 trial이라는 수치는 논문의 5,699회 pairwise 비교와 표기 단위가 다르다. 11,398은 5,699의 정확히 2배이므로 비교 1회당 두 모델의 실행을 각각 센 값으로 해석할 수 있다. 15,000 trial의 집계 기준은 블로그에 명시되지 않았다.
- leaderboard 그림은 embodiment를 합친 값이며 논문 Figure 3의 embodiment별 값과 다르다. 집계 방식은 블로그에 설명이 없다.
- 향후 계획: 열린 공동체 표준을 지향하며 평가 시간을 원하는 연구자, 평가 노드를 운영하려는 연구실, 과제 벤치마크를 기여하려는 조직의 참여를 받는다.

## 6. 관련 연구 (Related Work)

- 생태계 역할: NUS MAGIC Lab(Jiafei Duan 교수)은 연구 리더십, BitRobot Foundation은 프로토콜 설계와 노드 네트워크 운영, Hugging Face는 모델 호스팅과 데이터셋 공개를 맡는다.
- Singapore Embodied AI Centre와 싱가포르 National Robotics Programme이 자금과 평가 환경 접근을 지원하고, FrodoBots가 동남아시아 가정과 도시 공간 데이터 수집을 돕는다.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| robot rigger | 평가를 직접 수행하는 전업 로봇 운영 인력을 블로그가 부르는 이름 |
| scientific megaproject | 개별 기관이 감당하기 어려운 규모의 공동 과학 인프라 사업 |
| GAM | 블로그가 비교 대상으로 나열한 모델 계열 약어. 블로그에 풀이가 없다 |

## 8. 그림 후보 (Figure Candidates)

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | 두 평가 트랙 개념도. (a) 고정 장면 데이터셋으로 fine-tuning 후 고정 장면에서 평가, (b) 학습 데이터 제한 없이 개방 장면에서 pairwise 비교 | fetched | ★ wiki 사용 (논문 wiki 페이지가 빌려 씀) |
| fig02 | embodiment별 표준 하드웨어 셋업과 부품 표기(MolmoAct2 YAM, SO-101, Franka DROID, G1) | fetched | (아카이브) |
| fig03 | 블로그 전체 페이지 스크린샷(상단 6000px) | screenshot | (아카이브) |
| fig04 | 블로그 Figure 1 영역 크롭(두 트랙 개념도와 원문 캡션 포함) | crop | (아카이브) |
| fig05 | 두 트랙 개념도만 잘라낸 크롭(원문 캡션 제외) | crop | (아카이브) |
| fig06 | 블로그 Figure 2 영역 크롭(네 embodiment 셋업과 원문 캡션) | crop | (아카이브) |
| fig07 | Film 1 정지 화면. 실내 공간에 늘어선 Unitree G1 humanoid 편대 | crop | (아카이브) |
| fig08 | Film 2 정지 화면. 데모에서는 모든 로봇이 좋아 보인다는 도입 문구 | crop | (아카이브) |
| fig09 | Fine-tune Track 리더보드. 평균 trial 점수 π0.5 0.725, MolmoAct2 0.605, GR00T N1.7 0.552, G0.5 0.515, LingBot-VLA v2 0.465 | crop | ★ wiki 사용 (논문 wiki 페이지가 빌려 씀) |
| fig10 | Open Track 리더보드. DCR rating(Elo 척도) GPT-6 Astra 1,778부터 Grok 4.7 964까지 8개 시스템 | crop | ★ wiki 사용 (논문 wiki 페이지가 빌려 씀) |
