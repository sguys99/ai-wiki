---
title: "Cortex: A Bidirectionally Aligned Embodied Agent Framework"
type: article
year: 2026
category: physical-ai
raw_path: raw/articles/peng-2026-cortex-project-page.md
raw_filename: "peng-2026-cortex-project-page.md"
source_collection: external
author: "Cortex Team (Jiaqi Peng 외)"
url: "https://steinate.github.io/cortex.github.io/"
publisher: "steinate.github.io"
fetched_at: "2026-09-07T09:52:39+0900"
extractor_tier: "jina"
tags: [physical-ai, vla, manipulation, robot-learning]
figures:
  - id: fig01
    file: assets/peng-2026-cortex-project-page/fig01.png
    raw: raw/articles/peng-2026-cortex-project-page-figures/fig01.png
    caption: "데이터 구축 전경. 공개 실제 데이터와 공개 시뮬레이션 데이터와 자체 수집 데이터와 절차적 생성 데이터가 왼쪽 위부터 시계 방향으로 배치되고, 가운데 원형 워드 클라우드가 네 출처의 어휘 분포를 보여준다. 아래 왼쪽은 비커 세척 14단계의 자동 주석 결과이고 오른쪽은 executability와 tractability가 하나의 Pick 명령으로 수렴하는 그림이다"
    strategy: fetched
    curated: false
  - id: fig02
    file: assets/peng-2026-cortex-project-page/fig02.png
    raw: raw/articles/peng-2026-cortex-project-page-figures/fig02.png
    caption: "동적 계획법 경계 추론 시각화. 위쪽은 비커 세척 trajectory 5,174 프레임의 추론된 14개 구간과 움직임 곡선이고, 아래쪽 히트맵은 프레임과 subtask 템플릿 사이의 적합도 비용이며 흰 경로가 단조 제약 아래 최소 비용 경로다. 오른쪽은 후보 경계에서 최종 경계를 고르는 과정이다"
    strategy: fetched
    curated: true
  - id: fig03
    file: assets/peng-2026-cortex-project-page/fig03.png
    raw: raw/articles/peng-2026-cortex-project-page-figures/fig03.png
    caption: "event-balanced sampling ablation 차트. 막대는 평균 합계 점수로 진행 중 우세 방식 7.58에서 event-balanced 방식 8.18로 오르고, 노란 선은 학습 표본이 310만 개에서 272만 개로 줄어드는 것을 보여준다"
    strategy: fetched
    curated: true
  - id: fig04
    file: assets/peng-2026-cortex-project-page/page-full.png
    raw: raw/articles/peng-2026-cortex-project-page-figures/page-full.png
    caption: "프로젝트 페이지 전체 스크린샷. 상단 6,000픽셀까지 담겼다"
    strategy: screenshot
    curated: false
  - id: fig05
    file: assets/peng-2026-cortex-project-page/fig05.png
    raw: raw/articles/peng-2026-cortex-project-page-figures/fig05.png
    caption: "양방향 alignment 인터페이스 도식. 위쪽 띠는 지시문과 observation과 메모리 토큰이 VLM에 들어가는 흐름이고, 아래쪽 띠는 VLM이 낸 subtask 문장과 갱신된 메모리가 VLA로 전달되는 흐름이다. 마지막에 task completed 신호가 나온다"
    strategy: fetched
    curated: true
  - id: fig06
    file: assets/peng-2026-cortex-project-page/fig06.png
    raw: raw/articles/peng-2026-cortex-project-page-figures/fig06.png
    caption: "화학 액체 교반 과제의 실제 로봇 실행 기록. 14단계를 순서대로 유지하며 시각 증거가 완료를 뒷받침할 때만 다음 단계로 넘어간다"
    strategy: fetched
    curated: false
---

## 한 줄 요약 (One-line Summary)

Cortex 논문의 공식 프로젝트 페이지로, subtask와 메모리 쌍을 System-2와 System-1 사이의 계약으로 규정하는 설계를 네 장의 카드로 요약하고 논문 본문에 없는 RMBench 7과제 평균 성공률과 동적 계획법 경계 추론 시각화를 함께 제공한다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 제목 | Cortex: A Bidirectionally Aligned Embodied Agent Framework |
| 제작 | Cortex 저자진 (Jiaqi Peng 외 12인) |
| URL | https://steinate.github.io/cortex.github.io/ |
| 게시 | 2026년 7월 7일 |
| 구성 | Video, Method, Data, Results, Real World, Citation 여섯 절 |
| 대응 논문 | arXiv 2607.05377 (`sources/peng-2026-cortex-a-bidirectionally-aligned-embodied.md`) |

페이지 머리에 여섯 개 지표를 크게 배치한다. 주석된 long-horizon 영상 4,000시간 이상, 구조적 사전 정보가 붙은 시뮬레이션 데이터 30시간, canonical skill primitive 32개, LIBERO-Long zero-shot 성공률 95.5%, RoboTwin 2.0 전체 성공률 86.8%, 실제 화학 과제 성공률 65%다.

## 2. 주요 기여 (Key Contributions)

프로젝트 페이지 자체는 새 방법을 제안하지 않고 논문 내용을 요약하지만, 논문 본문에 없는 자료 세 가지를 추가로 싣는다.

1. **RMBench 7과제 평균 성공률 순위표**. 논문 Table 9는 과제별 성공률만 싣는데, 페이지는 7과제 평균을 계산해 Cortex 61.9%, Mem-0 41.7%, π0.5 12.6%, X-VLA 12.1%, ACT 7.6%, DP 6.0% 순으로 제시한다.
2. **동적 계획법 경계 추론 시각화**. 적합도 비용 히트맵 위에 단조 최소 비용 경로를 겹쳐 그린 그림으로, 논문 부록의 수식이 실제로 어떤 분할을 만드는지 보여준다. 예시 episode 000003은 14개 subtask와 5,174 프레임이며 평균 경계 신뢰도가 0.952다.
3. **주석 결과 영상 세 편**. AgibotWorld와 BEHAVIOR-1K와 Galaxea 각각에서 현재 subtask 자막과 색상 구간 막대를 겹친 rollout 영상을 제공한다. 서로 다른 화면 비율(4:3, 정사각, 와이드)에서 주석이 일관되게 붙는 것을 보이는 것이 목적이다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 subtask와 메모리를 계약으로 보는 관점

페이지는 Cortex의 핵심을 "subtask와 메모리 쌍이 System-2 계획과 System-1 실행 사이의 계약"이라는 문장으로 요약한다. 계획기는 실행 가능한 skill로 출력이 제약되고, 실행기는 깨지기 쉬운 전역 과제 서술 대신 국소적이고 물리적으로 grounding된 명령을 받는다.

### 3.2 네 장의 방법 카드

| 번호 | 제목 | 내용 |
|---|---|---|
| 1 | Executable Skill Space | 자유 형식 지시문을 32개 canonical primitive로 표준화해 운동학적 환각을 줄이고 계획기 출력이 VLA harness로 라우팅되게 만든다 |
| 2 | Tractable Metadata | subtask에 물체 속성과 공간 관계와 개수와 도달 가능성 사전 정보를 담아 상위 계획이 로봇이 실제로 할 수 있는 범위에 맞도록 한다 |
| 3 | Event-balanced Training | 진행 중 프레임과 경계 전이 프레임의 비율을 맞춰, 명령을 유지할 때와 메모리를 갱신할 때를 계획기에 가르친다 |
| 4 | Asynchronous Loop | System-2는 느린 추론 속도로 동작하고 System-1은 연속 실행하며, harness가 명령 매핑과 유지와 타임아웃 복구를 담당한다 |

### 3.3 rollout 강조점

페이지는 언어 목표에서 검증된 로봇 진행으로 이어지는 흐름을 세 가지로 정리한다. 계획을 실행 가능한 skill로 표현하는 executable subtask, 사전 상태를 여러 단계에 걸쳐 유지하는 compact memory, 시각 증거가 완료를 뒷받침할 때만 전환을 승인하는 online verification이다.

### 3.4 데이터 파이프라인

공개 실제 데이터와 공개 시뮬레이션 데이터와 자체 수집 시연 데이터(demonstration)와 절차적 생성 데이터를 하나의 표준 인터페이스로 모은다. 파이프라인은 subtask 시퀀스를 주석하고 경계를 맞추며 실행 사전 정보를 주입한다. 페이지 표현으로는 raw trajectory를 실행 가능한 subtask에 맞추고 executability와 tractability 양쪽에 대한 grounding 신호를 더하는 작업이다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 System-2 계획 품질

공간 정보와 long-horizon과 개수 세기 세 종류 평가의 평균 합계 점수다.

| 모델 | Step | Episode |
|---|---|---|
| Cortex (subtask 인터페이스) | 8.32 | 7.81 |
| GPT-5 | 6.27 | 7.23 |
| Gemini 3.1 Pro | 6.92 | 6.86 |
| Qwen3-VL-8B | 6.74 | 6.29 |

Cortex의 항목별 점수는 개수 세기 8.74, long-horizon 8.16, 공간 정보 8.05이다.

### 4.2 closed-loop 시뮬레이션

LIBERO-Long zero-shot 성공률은 Cortex 95.5%, OpenVLA-OFT 94.5%, MemoryVLA 93.4%, π0.5 92.4%, Gemini 3.1 Pro 91.0% 순이다.

RoboTwin 2.0은 short와 long과 전체로 나누어 제시한다.

| 방법 | Short | Long | Overall |
|---|---|---|---|
| Cortex | 86.0 | 88.0 | 86.8 |
| π0.5 | 82.6 | 83.0 | 82.7 |
| X-VLA | 77.1 | 66.3 | 72.8 |
| π0 | 61.5 | 72.6 | 65.9 |

### 4.3 메모리 의존 manipulation

RMBench 7개 과제를 각각 100회 rollout으로 평가한 평균이다.

| 방법 | 7과제 평균 성공률 |
|---|---|
| Cortex | 61.9% |
| Mem-0 | 41.7% |
| π0.5 | 12.6% |
| X-VLA | 12.1% |
| ACT | 7.6% |
| DP | 6.0% |

과제별로는 Mem-0 대비 증가폭을 함께 표기한다. Observe and Pick Up 14%(+10%p), Rearrange Blocks 100%(+11%p), Put Back Block 100%(+10%p), Swap Blocks 99%(+32%p), Swap T 63%(+49%p), Battery Try 37%(+9%p), Press Button 20%다. Press Button은 다른 모든 방법이 0%인 유일한 과제로 표시된다.

### 4.4 실제 로봇 20회 평균

ARX ACONE 양팔 장비에서 화학 과제와 세척 과제를 각각 20회 시도한 평균이다.

| 방법 | 화학 과제 | 세척 과제 |
|---|---|---|
| π0.5 | 성공률 0%, 2.5/14 | 성공률 0%, 3.7/14 |
| π_mem | 성공률 0%, 4.1/14 | 성공률 0%, 6.5/14 |
| Cortex | 성공률 65%, 11.0/14 | 성공률 55%, 10.5/14 |
| 사람 계획 + π_mem^sub | 성공률 75%, 12.2/14 | 성공률 70%, 11.6/14 |

## 5. 한계와 향후 과제 (Limitations and Future Work)

프로젝트 페이지는 한계를 따로 다루지 않는다. 논문 본문의 두 가지 한계, 즉 텍스트 메모리가 공간 좌표와 미세 시각 정보를 버린다는 점과 표준 vision encoder가 고빈도 미세 상태 변화에 둔감하다는 점은 페이지에 반영되지 않았다.

자료 수집 관점의 제약도 있다. 페이지가 영상 중심으로 구성돼 있어 chrome tier 추출은 본문 1,741자만 얻었고, jina tier 재수집으로 6,657자를 확보했다. 영상 파일 자체는 `raw/`에 내려받지 않았고 URL만 본문에 남아 있다.

## 6. 관련 연구 (Related Work)

페이지가 비교 대상으로 언급하는 모델은 논문과 같다. 계획 품질 비교에는 GPT-5, Gemini 3.1 Pro, Qwen3-VL-8B가, 실행 비교에는 π0, π0.5, X-VLA, OpenVLA-OFT, MemoryVLA, ACT, DP, Mem-0이 등장한다. BibTeX 항목이 페이지 하단에 있어 인용 정보가 바로 확인된다.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| subtask와 메모리 계약 | 상위 계획기와 하위 실행기가 주고받는 표현을 subtask 문장과 누적 메모리 문장으로 고정한 규약 |
| Executable Skill Space | 자유 형식 지시문을 32개 primitive로 좁힌 출력 공간 |
| Tractable Metadata | 물체 속성과 공간 관계와 개수와 도달 가능성을 담은 subtask 주석 |
| online verification | 시각 증거가 완료를 뒷받침할 때만 다음 subtask로 넘어가는 전환 규칙 |
| DP boundary selection | 후보 경계 중에서 누적 적합도 비용이 최소인 단조 경계열을 고르는 동적 계획법 절차 |

## 8. 그림 후보 (Figure Candidates)

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | 데이터 구축 전경 | fetched | 논문 Figure 3과 동일 (중복) |
| fig02 | 동적 계획법 경계 추론 시각화 | fetched | wiki 권장 (페이지 고유) |
| fig03 | event-balanced sampling ablation 차트 | fetched | wiki 권장 (페이지 고유) |
| fig04 | 프로젝트 페이지 전체 스크린샷 | screenshot | (확인 필요) |
| fig05 | 양방향 alignment 인터페이스 도식 | fetched | 논문 Figure 2의 고해상도판 |
| fig06 | 화학 액체 교반 실제 로봇 실행 기록 | fetched | 논문 Figure 7과 유사 (중복) |
