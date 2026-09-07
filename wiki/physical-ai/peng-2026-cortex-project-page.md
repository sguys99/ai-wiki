---
title: "Cortex 프로젝트 페이지: 양방향 alignment 인터페이스 요약과 추가 지표"
type: article
year: 2026
category: physical-ai
source: peng-2026-cortex-project-page.md
raw_path: raw/articles/peng-2026-cortex-project-page.md
raw_filename: "peng-2026-cortex-project-page.md"
source_collection: external
author: "Cortex Team (Jiaqi Peng 외)"
url: "https://steinate.github.io/cortex.github.io/"
publisher: "steinate.github.io"
tags: [physical-ai, vla, manipulation, robot-learning]
figures:
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
  - id: fig05
    file: assets/peng-2026-cortex-project-page/fig05.png
    raw: raw/articles/peng-2026-cortex-project-page-figures/fig05.png
    caption: "양방향 alignment 인터페이스 도식. 위쪽 띠는 지시문과 observation과 메모리 토큰이 VLM에 들어가는 흐름이고, 아래쪽 띠는 VLM이 낸 subtask 문장과 갱신된 메모리가 VLA로 전달되는 흐름이다. 마지막에 task completed 신호가 나온다"
    strategy: fetched
    curated: true
---

## 요약

Cortex 논문의 공식 프로젝트 페이지다. 논문의 방법을 네 장의 카드로 압축해 보여주고, 여섯 개 대표 수치를 페이지 머리에 배치한다. 논문을 읽기 전에 전체 구도를 잡거나 읽은 뒤에 핵심을 되짚을 때 쓰기 좋은 자료다.

이 페이지가 wiki에서 별도로 가치를 갖는 이유는 논문 본문에 없는 자료 세 가지 때문이다. RMBench 7과제 평균 성공률 순위표, 동적 계획법 경계 추론 과정을 히트맵으로 그린 시각화, 그리고 서로 다른 데이터셋에서 주석 결과를 확인할 수 있는 rollout 영상 세 편이다.

## 배경

논문 `peng-2026-cortex-a-bidirectionally-aligned-embodied`는 본문 9쪽에 부록 24쪽으로 길고, 방법과 결과가 여러 절에 흩어져 있다. 프로젝트 페이지는 같은 내용을 여섯 절로 재구성한다. Video, Method, Data, Results, Real World, Citation 순이다.

페이지 머리에 여섯 개 수치를 크게 배치해 자료의 규모와 성과를 한눈에 보여준다.

| 지표 | 값 | 의미 |
|---|---|---|
| 주석된 long-horizon 영상 | 4,000시간 이상 | 자동 재주석을 거친 공개 데이터 규모 |
| 시뮬레이션 데이터 | 30시간 | 구조적 사전 정보가 붙은 절차적 생성 데이터 |
| canonical skill primitive | 32개 | VLM 출력이 고를 수 있는 동작 어휘 크기 |
| LIBERO-Long | 95.5% | zero-shot 성공률 |
| RoboTwin 2.0 | 86.8% | 전체 성공률 |
| 실제 화학 과제 | 65% | 실제 로봇 zero-shot 성공률 |

## 핵심 개념

페이지는 Cortex의 설계를 한 문장으로 요약한다. subtask와 메모리 쌍이 System-2 계획과 System-1 실행 사이의 계약이라는 것이다. 계약이라는 표현이 방법의 성격을 잘 드러낸다.

계약의 양쪽에 각각 의무가 있다. 계획기 쪽 의무는 출력을 실행 가능한 skill로 제한하는 것이다. 실행기 쪽 의무는 깨지기 쉬운 전역 과제 서술 대신 국소적이고 물리적으로 grounding된 명령을 받아 수행하는 것이다. grounding은 언어 표현을 실제 장면의 물체나 동작에 대응시키는 것을 말한다.

이 계약이 지켜지면 두 시스템이 서로의 사정을 반영하게 된다. 논문이 말하는 양방향 alignment가 실무적으로는 이 계약 조항으로 구현된다.

![[assets/peng-2026-cortex-project-page/fig05.png]]
*양방향 alignment 인터페이스 도식 (Cortex 프로젝트 페이지)*

도식을 보면 흐름이 명확하다. 위쪽 띠에서 지시문과 observation과 메모리가 토큰으로 VLM에 들어간다. observation은 매 timestep에 policy가 받는 센서 입력을 뜻한다. 아래쪽 띠에서 VLM이 낸 subtask 문장과 갱신된 메모리가 VLA로 전달된다. 마지막 단계에서 "task completed" 신호가 나오면 실행이 끝난다.

## 방법

### 네 장의 카드

Method 절은 방법을 네 장의 카드로 나눈다. 논문의 절 구성보다 압축돼 있어 전체 구도를 파악하기 쉽다.

| 번호 | 제목 | 내용 |
|---|---|---|
| 1 | Executable Skill Space | 자유 형식 지시문을 32개 canonical primitive로 표준화해 운동학적 환각을 줄이고, 계획기 출력이 VLA harness로 라우팅되게 만든다 |
| 2 | Tractable Metadata | subtask에 물체 속성과 공간 관계와 개수와 도달 가능성 사전 정보를 담아, 상위 계획이 로봇이 실제로 할 수 있는 범위에 맞도록 한다 |
| 3 | Event-balanced Training | 진행 중 프레임과 경계 전이 프레임의 비율을 맞춰, 명령을 유지할 때와 메모리를 갱신할 때를 계획기에 가르친다 |
| 4 | Asynchronous Loop | System-2는 느린 추론 속도로 동작하고 System-1은 연속 실행하며, harness가 명령 매핑과 유지와 타임아웃 복구를 담당한다 |

카드 1과 2가 인터페이스의 두 성질에 대응한다. 카드 1은 executability, 즉 VLM이 내놓은 subtask가 VLA가 아는 명령 형식인지를 다룬다. 카드 2는 tractability, 즉 그 subtask가 로봇의 현재 자세와 팔 길이로 실제 도달 가능한지를 다룬다. 카드 3은 학습 데이터 구성이고 카드 4는 배포 시점의 실행 구조다.

### rollout 강조점

페이지는 언어 목표에서 검증된 로봇 진행으로 이어지는 흐름을 세 가지로 정리한다.

- **executable subtask**: 계획을 실행 가능한 skill로 표현한다.
- **compact memory**: 이전 상태를 여러 단계에 걸쳐 유지한다.
- **online verification**: 시각 증거가 완료를 뒷받침할 때만 전환을 승인한다.

세 번째 항목이 논문의 실제 로봇 실험에서 가장 눈에 띄는 동작이다. 마개 집기에 실패하면 다음 단계로 넘어가지 않고 같은 subtask를 유지한다.

### 데이터 파이프라인과 경계 추론 시각화

Data 절은 공개 실제 데이터와 공개 시뮬레이션 데이터와 자체 수집 시연 데이터(demonstration)와 절차적 생성 데이터를 하나의 표준 인터페이스로 모으는 과정을 설명한다. 파이프라인은 subtask 시퀀스를 주석하고 경계를 맞추며 실행 사전 정보를 주입한다.

페이지가 논문보다 잘 보여주는 부분이 경계 추론이다. 논문 부록은 적합도 비용과 동적 계획법 점화식을 수식으로 적을 뿐이고, 부록 그림은 추론된 시작 지점의 썸네일만 보여준다. 프로젝트 페이지는 같은 절차를 히트맵으로 그린다.

![[assets/peng-2026-cortex-project-page/fig02.png]]
*동적 계획법 경계 추론 시각화 (Cortex 프로젝트 페이지)*

그림을 읽는 방법은 이렇다. 위쪽 막대는 비커 세척 trajectory를 추론된 14개 구간으로 나눈 결과이고, 그 아래 파란 곡선이 프레임별 움직임 크기다. 경계가 움직임이 작은 지점 근처에 놓이는 것을 확인할 수 있다. trajectory는 observation과 action이 시간순으로 이어진 실행 기록을 말한다.

가운데 히트맵은 가로가 프레임 번호이고 세로가 순서대로 나열한 14개 subtask 템플릿이다. 색이 밝을수록 그 프레임이 그 subtask에 잘 맞는다. 흰 선이 단조 제약 아래에서 누적 비용을 최소화하는 경로다. 오른쪽 그림은 후보 경계 b1부터 b7까지 중에서 주황색으로 표시된 것이 선택된 경계임을 보여준다.

예시로 쓴 episode 000003은 subtask 14개와 프레임 5,174개로 구성되고 평균 경계 신뢰도가 0.952다. 이 수치는 논문 본문에 없다.

### 주석 결과 영상

Subtask Annotation 절은 세 데이터셋의 rollout 영상을 제공한다. 각 영상은 현재 화면 위에 활성 subtask 자막을 겹치고, 색상으로 구분한 시간 막대로 경계를 표시한다.

| 데이터셋 | 화면 비율 | 확인할 수 있는 것 |
|---|---|---|
| AgibotWorld | 4:3 | subtask 라벨과 색상 진행 막대가 동작 경계를 드러낸다 |
| BEHAVIOR-1K | 정사각 | 다른 영상 형상에서도 주석이 일관되게 붙는다 |
| Galaxea | 와이드 | 가정 환경 상호작용 순서에서 subtask가 전환된다 |

세 편을 나란히 둔 의도는 화면 비율과 촬영 환경이 달라도 같은 주석 규격이 적용된다는 점을 보이는 것이다. 영상 파일 자체는 `raw/`에 내려받지 않았고 URL만 원문에 남아 있다.

## 결과

### System-2 계획 품질

공간 정보와 long-horizon과 개수 세기 세 종류 평가의 평균 합계 점수다. 10점 만점이다.

| 모델 | Step | Episode |
|---|---|---|
| Cortex (subtask 인터페이스) | 8.32 | 7.81 |
| GPT-5 | 6.27 | 7.23 |
| Gemini 3.1 Pro | 6.92 | 6.86 |
| Qwen3-VL-8B | 6.74 | 6.29 |

논문 Table 1의 소수 셋째 자리를 반올림한 값과 일치한다. Cortex의 항목별 점수는 개수 세기 8.74, long-horizon 8.16, 공간 정보 8.05로, 개수 세기에서 가장 높다.

Step과 Episode의 차이도 눈여겨볼 만하다. Cortex는 8.32에서 7.81로 0.51점 내려가는 반면 GPT-5는 6.27에서 7.23으로 올라간다. 자기 출력을 되먹이는 episode 방식에서 Cortex의 우위가 줄어든다는 뜻이다.

### event-balanced sampling의 효과

페이지는 ablation 결과를 별도 차트로 만들어 싣는다. 논문 Table 5의 수치를 시각화한 것이다.

![[assets/peng-2026-cortex-project-page/fig03.png]]
*event-balanced sampling ablation 차트 (Cortex 프로젝트 페이지)*

막대는 평균 합계 점수다. 진행 중 구간이 우세한 방식이 7.58이고 event-balanced 방식이 8.18이다. 노란 선은 학습 표본 수로 310만 개에서 272만 개로 줄어든다. 점수가 오르는 동시에 표본이 줄어든다는 것이 이 차트의 요점이다.

### closed-loop 시뮬레이션

LIBERO-Long zero-shot 성공률은 Cortex 95.5%, OpenVLA-OFT 94.5%, MemoryVLA 93.4%, π0.5 92.4%, Gemini 3.1 Pro 91.0% 순이다.

RoboTwin 2.0은 short와 long과 전체로 나누어 제시한다.

| 방법 | Short | Long | Overall |
|---|---|---|---|
| Cortex | 86.0 | 88.0 | 86.8 |
| π0.5 | 82.6 | 83.0 | 82.7 |
| X-VLA | 77.1 | 66.3 | 72.8 |
| π0 | 61.5 | 72.6 | 65.9 |

페이지는 논문 표에서 상위 네 개만 골라 실었다. Cortex만 Long이 Short보다 높다는 대비가 네 줄로도 그대로 드러난다.

### RMBench 7과제 평균

이 순위표가 페이지에만 있는 자료다. 논문 Table 9는 과제별 성공률만 제시하고 평균을 계산하지 않는다.

| 방법 | 7과제 평균 성공률 |
|---|---|
| Cortex | 61.9% |
| Mem-0 | 41.7% |
| π0.5 | 12.6% |
| X-VLA | 12.1% |
| ACT | 7.6% |
| DP | 6.0% |

Cortex와 Mem-0의 차이가 20.2%p이고, Mem-0과 그다음인 π0.5의 차이가 29.1%p다. 명시적 메모리를 가진 두 방법과 그렇지 않은 네 방법 사이에 큰 간격이 있다.

과제별로는 Mem-0 대비 증가폭을 함께 표기한다.

| 과제 | Cortex | Mem-0 대비 |
|---|---|---|
| Observe and Pick Up | 14% | +10%p |
| Rearrange Blocks | 100% | +11%p |
| Put Back Block | 100% | +10%p |
| Swap Blocks | 99% | +32%p |
| Swap T | 63% | +49%p |
| Battery Try | 37% | +9%p |
| Press Button | 20% | 유일한 비영점 |

증가폭이 가장 큰 과제는 Swap T로 49%p 차이가 난다. Press Button은 다른 모든 방법이 0%인 유일한 과제라고 명시한다.

### 실제 로봇 20회 평균

ARX ACONE 양팔 장비에서 화학 과제와 세척 과제를 각각 20회 시도한 평균이다. 페이지는 성공률과 진행 단계를 한 칸에 묶어 표기한다.

| 방법 | 화학 과제 | 세척 과제 |
|---|---|---|
| π0.5 | 성공률 0%, 2.5/14 | 성공률 0%, 3.7/14 |
| π_mem | 성공률 0%, 4.1/14 | 성공률 0%, 6.5/14 |
| Cortex | 성공률 65%, 11.0/14 | 성공률 55%, 10.5/14 |
| 사람 계획 + π_mem^sub | 성공률 75%, 12.2/14 | 성공률 70%, 11.6/14 |

Real World 절은 이 결과를 일반 VLM 계획기와 짧은 지평의 subtask 조건부 VLA 실행기를 결합한 성과로 설명한다.

## 논문과의 대응

페이지의 여섯 절은 논문의 특정 절에 각각 대응한다. 아래 표가 그 대응 관계와 페이지 쪽에서 달라지는 점이다.

| 페이지 절 | 논문 대응 | 페이지에서 달라지는 점 |
|---|---|---|
| Video | Figure 1과 Figure 7 | 정지 그림 대신 비커 세척과 화학 실험 rollout 영상을 제공한다 |
| Method | 3.1절부터 3.4절 | 네 장의 카드로 압축하고 수식을 모두 걷어낸다 |
| Data | 3.2절과 부록 A.1 | 경계 추론을 히트맵으로 시각화하고 예시 episode의 신뢰도 수치를 덧붙인다 |
| Results | 4.1절부터 4.2절, 부록 A.4 | RMBench 7과제 평균을 새로 계산해 순위표로 제시한다 |
| Real World | 4.3절과 부록 A.5 | Table 3을 성공률과 진행 단계를 한 칸에 묶은 형태로 재배치한다 |
| Citation | 없음 | BibTeX 항목을 제공한다 |

읽는 순서로는 페이지의 Method 절로 구도를 잡고, 논문 3절에서 수식과 세부를 확인한 뒤, 페이지의 Data 절 시각화로 경계 추론이 실제로 만드는 분할을 눈으로 확인하는 흐름이 효율적이다. 논문 부록 A.1의 점화식만 읽으면 어떤 분할이 나오는지 감을 잡기 어렵고, 페이지 히트맵만 보면 비용 항이 무엇으로 구성되는지 알 수 없다.

한 가지 주의할 점이 있다. 페이지의 수치는 논문 값을 반올림하거나 일부만 발췌한 것이라, 인용할 때는 논문 표를 확인하는 편이 안전하다. 예를 들어 RoboTwin 표는 여덟 개 방법 중 상위 네 개만 싣고 있고, LIBERO-Long 목록은 agentic 계열 하위 세 방법을 생략했다.

## 한계

프로젝트 페이지는 한계를 다루지 않는다. 논문이 드는 두 가지, 즉 텍스트 메모리가 공간 좌표와 미세 시각 정보를 담지 못한다는 점과 표준 vision encoder가 고빈도 미세 상태 변화에 둔감하다는 점은 페이지에 반영되지 않았다. 이 페이지만 읽으면 방법의 제약을 알 수 없으므로 논문 페이지와 함께 보는 것이 좋다.

자료 수집 쪽 제약도 기록해 둔다. 페이지가 영상 중심으로 구성돼 있어 `scripts/fetch_article.py`의 chrome tier는 본문 1,741자만 얻었다. jina tier로 다시 받아 6,657자를 확보했고, 이 과정에서 구조도와 실제 로봇 그림 두 장을 추가로 내려받았다. 전체 페이지 스크린샷은 원본 높이 8,955픽셀 중 상단 6,000픽셀까지만 담겼다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| subtask와 메모리 계약 | 상위 계획기와 하위 실행기가 주고받는 표현을 subtask 문장과 누적 메모리 문장으로 고정한 규약 |
| Executable Skill Space | 자유 형식 지시문을 32개 primitive로 좁힌 출력 공간 |
| Tractable Metadata | 물체 속성과 공간 관계와 개수와 도달 가능성을 담은 subtask 주석 |
| online verification | 시각 증거가 완료를 뒷받침할 때만 다음 subtask로 넘어가는 전환 규칙 |
| DP boundary selection | 후보 경계 중에서 누적 적합도 비용이 최소인 단조 경계열을 고르는 동적 계획법 절차 |

## 관련 페이지

- [[physical-ai/peng-2026-cortex-a-bidirectionally-aligned-embodied]]: 이 페이지가 요약하는 원 논문. 방법과 실험 세부와 한계는 원 논문 페이지에 있다.
- [[physical-ai/black-2025-pi05-a-vision-language-action-model-with]]: 비교표와 executor로 함께 등장하는 π0.5의 원 논문.
- [[physical-ai/x2robot-2025-wall-oss-project-page]]: 같은 형식의 VLA 프로젝트 페이지. 논문과 페이지를 나란히 수집하는 방식의 다른 사례다.
- [[physical-ai/openhelix-robot-awesome-dual-system-vla]]: dual-system VLA 문헌 목록. Cortex의 위치를 견주어 볼 때 쓴다.
