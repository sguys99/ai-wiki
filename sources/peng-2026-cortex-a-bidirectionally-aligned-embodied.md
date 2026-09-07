---
title: "Cortex: A Bidirectionally Aligned Embodied Agent Framework for Long-horizon Manipulation"
type: paper
year: 2026
category: physical-ai
raw_path: raw/papers/peng-2026-cortex-a-bidirectionally-aligned-embodied.pdf
raw_filename: "peng-2026-cortex-a-bidirectionally-aligned-embodied.pdf"
source_collection: external
authors: "Jiaqi Peng, Xiqian Yu, Delin Feng (공동 1저자), Yuqiang Yang, Wenzhe Cai, Jing Xiong, Ganlin Yang, Jinliang Zheng, Jiafei Cao, Xueyuan Wei, Jiangmiao Pang, Yuan Shen, Tai Wang (교신 Yuan Shen, Tai Wang)"
arxiv_id: "2607.05377"
url: "https://arxiv.org/abs/2607.05377"
tags: [physical-ai, vla, manipulation, robot-learning, benchmark]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/peng-2026-cortex-a-bidirectionally-aligned-embodied/fig01.png
    raw: raw/papers/peng-2026-cortex-a-bidirectionally-aligned-embodied-figures/fig01.png
    caption: "monolithic VLA와 기존 dual-system과 Cortex의 비교. 상단은 비커 세척 과제의 아홉 단계 subtask 나열이고, 하단 왼쪽은 같은 화면에서 어느 단계인지 구분하지 못하는 temporal ambiguity와 어느 물체를 집을지 정하지 못하는 semantic ambiguity를 보여준다. 오른쪽 Cortex는 VLM이 2Hz로 메모리와 subtask를 갱신하고 VLA가 10Hz로 실행한다"
    page: 1
    bbox_norm: [0.1861, 0.6189, 0.8139, 0.8838]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/peng-2026-cortex-a-bidirectionally-aligned-embodied/fig02.png
    raw: raw/papers/peng-2026-cortex-a-bidirectionally-aligned-embodied-figures/fig02.png
    caption: "Cortex 프레임워크 개요. VLM이 지시문과 observation과 메모리를 받아 다음 subtask를 내보내고, VLA가 그 subtask를 받아 실행한다. 메모리는 완료한 단계를 문장으로 누적해 다음 판단의 근거가 된다"
    page: 3
    bbox_norm: [0.1667, 0.0833, 0.8334, 0.3137]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/peng-2026-cortex-a-bidirectionally-aligned-embodied/fig03.png
    raw: raw/papers/peng-2026-cortex-a-bidirectionally-aligned-embodied-figures/fig03.png
    caption: "long-horizon 메타데이터 구축과 인터페이스 표준화. 공개 실제 데이터와 공개 시뮬레이션 데이터와 자체 수집 데이터와 절차적 생성 데이터를 모아 자동 주석 파이프라인에 통과시키고, executability와 tractability 두 성질을 만족하는 subtask 인터페이스로 정규화한다"
    page: 4
    bbox_norm: [0.1667, 0.0829, 0.8333, 0.3323]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/peng-2026-cortex-a-bidirectionally-aligned-embodied/fig04.png
    raw: raw/papers/peng-2026-cortex-a-bidirectionally-aligned-embodied-figures/fig04.png
    caption: "event-balanced sampling 개념도. trajectory를 경계 전이 구간과 subtask 내부 실행 구간으로 나누고, 경계 앞뒤에 서로 다른 폭의 시간 여유를 두어 상태 유지 학습과 메모리 갱신 학습의 비율을 맞춘다"
    page: 5
    bbox_norm: [0.137, 0.0833, 0.8606, 0.3466]
    strategy: caption-region
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/peng-2026-cortex-a-bidirectionally-aligned-embodied/fig05.png
    raw: raw/papers/peng-2026-cortex-a-bidirectionally-aligned-embodied-figures/fig05.png
    caption: "harness engineering 구성. 왼쪽의 세 가지 지시문 형태를 가운데 harness가 하나의 프롬프트 형식으로 통합하고, 32개 skill 목록과 누적 메모리를 함께 넣어 VLM이 실행 가능한 subtask만 내도록 만든다"
    page: 6
    bbox_norm: [0.1667, 0.0833, 0.8334, 0.1818]
    strategy: caption-region
    curated: true
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/peng-2026-cortex-a-bidirectionally-aligned-embodied/fig06.png
    raw: raw/papers/peng-2026-cortex-a-bidirectionally-aligned-embodied-figures/fig06.png
    caption: "RoboTwin 2.0 성공률 막대그래프. 여덟 개 방법을 short horizon과 long horizon과 전체로 나누어 비교하며, monolithic VLA는 long horizon에서 성적이 내려가지만 Cortex는 88.0%로 short horizon 86.0%보다 높다"
    page: 7
    bbox_norm: [0.4902, 0.7263, 0.8333, 0.897]
    strategy: caption-region
    curated: true
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/peng-2026-cortex-a-bidirectionally-aligned-embodied/fig07.png
    raw: raw/papers/peng-2026-cortex-a-bidirectionally-aligned-embodied-figures/fig07.png
    caption: "실제 로봇에서 zero-shot으로 수행한 14단계 화학 실험. 깔때기 삽입부터 눈금 실린더 액체 붓기와 교반기 스위치 누르기까지 각 단계의 현재 subtask 문장과 장면이 함께 표시된다"
    page: 8
    bbox_norm: [0.1667, 0.2382, 0.8334, 0.555]
    strategy: caption-region
    curated: true
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/peng-2026-cortex-a-bidirectionally-aligned-embodied/fig08.png
    raw: raw/papers/peng-2026-cortex-a-bidirectionally-aligned-embodied-figures/fig08.png
    caption: "비커 세척 trajectory에 대한 주석 없는 subtask 경계 추론 결과. 각 썸네일은 추론된 subtask 시작 지점이고, 아래 막대는 전체 구간의 단조 분할이다"
    page: 14
    bbox_norm: [0.1731, 0.4919, 0.8269, 0.7826]
    strategy: caption-region
    curated: false
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/peng-2026-cortex-a-bidirectionally-aligned-embodied/fig09.png
    raw: raw/papers/peng-2026-cortex-a-bidirectionally-aligned-embodied-figures/fig09.png
    caption: "대표 비커 세척 trajectory의 경계 추론 상세. 썸네일이 추론된 시작 지점을 가리키고 하단 막대가 결과 분할을 보여준다"
    page: 15
    bbox_norm: [0.1731, 0.0833, 0.8269, 0.2591]
    strategy: caption-region
    curated: false
  - id: fig10
    label: Figure 10
    kind: figure
    file: assets/peng-2026-cortex-a-bidirectionally-aligned-embodied/fig10.png
    raw: raw/papers/peng-2026-cortex-a-bidirectionally-aligned-embodied-figures/fig10.png
    caption: "평가 세트 15개 과제의 대표 head-view 프레임. 세 행이 각각 공간 정보와 long-horizon 과제와 개수 세기 과제에 해당한다"
    page: 18
    bbox_norm: [0.1667, 0.0833, 0.8334, 0.3181]
    strategy: caption-region
    curated: false
  - id: fig11
    label: Figure 11
    kind: figure
    file: assets/peng-2026-cortex-a-bidirectionally-aligned-embodied/fig11.png
    raw: raw/papers/peng-2026-cortex-a-bidirectionally-aligned-embodied-figures/fig11.png
    caption: "버튼 누르기 과제에서 상태 이력이 고빈도 진행 정보를 드러내는 그래프. 파란 곡선은 프레임별 상태 변화량이고 빨간 계단은 누적 버튼 누름 횟수다"
    page: 24
    bbox_norm: [0.1971, 0.0836, 0.8072, 0.2196]
    strategy: caption-region
    curated: false
  - id: fig12
    label: Figure 12
    kind: figure
    file: assets/peng-2026-cortex-a-bidirectionally-aligned-embodied/fig12.png
    raw: raw/papers/peng-2026-cortex-a-bidirectionally-aligned-embodied-figures/fig12.png
    caption: "System-2 학습 프롬프트 템플릿. 전역 목표와 입력 메모리와 양자화한 상태 이력과 다시점 이미지 토큰이 들어가고, 정답은 현재 subtask와 활성 메모리 두 키를 가진 JSON 객체다"
    page: 25
    bbox_norm: [0.1667, 0.0833, 0.8333, 0.4638]
    strategy: caption-region
    curated: false
  - id: fig13
    label: Figure 13
    kind: figure
    file: assets/peng-2026-cortex-a-bidirectionally-aligned-embodied/fig13.png
    raw: raw/papers/peng-2026-cortex-a-bidirectionally-aligned-embodied-figures/fig13.png
    caption: "오븐 가열 실험의 다시점 실행 기록. 위에서부터 head 시점과 좌우 손목 시점이고, 각 열은 subtask 전환 시점의 프레임과 그때의 subtask 문장이다"
    page: 28
    bbox_norm: [0.1667, 0.1161, 0.8334, 0.3091]
    strategy: caption-region
    curated: false
  - id: fig14
    label: Figure 14
    kind: figure
    file: assets/peng-2026-cortex-a-bidirectionally-aligned-embodied/fig14.png
    raw: raw/papers/peng-2026-cortex-a-bidirectionally-aligned-embodied-figures/fig14.png
    caption: "쓰레기 분리 과제의 프롬프트 형태 비교. 위쪽은 상세 절차 지시문 결과이고 아래쪽은 개괄 목표만 준 결과다"
    page: 29
    bbox_norm: [0.1667, 0.0833, 0.8333, 0.3154]
    strategy: caption-region
    curated: false
  - id: fig15
    label: Figure 15
    kind: figure
    file: assets/peng-2026-cortex-a-bidirectionally-aligned-embodied/fig15.png
    raw: raw/papers/peng-2026-cortex-a-bidirectionally-aligned-embodied-figures/fig15.png
    caption: "비커 세척 과제의 subtask 예측과 실행 과정 상세"
    page: 29
    bbox_norm: [0.1667, 0.6015, 0.8333, 0.9006]
    strategy: caption-region
    curated: false
  - id: fig16
    label: Figure 16
    kind: figure
    file: assets/peng-2026-cortex-a-bidirectionally-aligned-embodied/fig16.png
    raw: raw/papers/peng-2026-cortex-a-bidirectionally-aligned-embodied-figures/fig16.png
    caption: "비커 세척 과제의 방법별 실패 양상 비교. π0.5는 같은 동작을 반복하고 과제 수준 πmem은 시각적으로 비슷한 단계를 혼동하며, Cortex는 subtask 라우팅과 전이 검증으로 순서를 유지한다"
    page: 31
    bbox_norm: [0.1667, 0.1687, 0.8333, 0.7715]
    strategy: caption-region
    curated: false
  - id: fig17
    label: Figure 17
    kind: figure
    file: assets/peng-2026-cortex-a-bidirectionally-aligned-embodied/fig17.png
    raw: raw/papers/peng-2026-cortex-a-bidirectionally-aligned-embodied-figures/fig17.png
    caption: "마개 집기에 실패한 국소 실행 장면. Cortex는 집기가 성공할 때까지 현재 subtask와 메모리를 그대로 유지한다"
    page: 32
    bbox_norm: [0.1667, 0.2634, 0.8333, 0.4089]
    strategy: caption-region
    curated: false
  - id: fig18
    label: Figure 18
    kind: figure
    file: assets/peng-2026-cortex-a-bidirectionally-aligned-embodied/fig18.png
    raw: raw/papers/peng-2026-cortex-a-bidirectionally-aligned-embodied-figures/fig18.png
    caption: "화학 액체 교반 과제의 end-to-end 실패 사례 모음"
    page: 33
    bbox_norm: [0.1667, 0.3328, 0.8332, 0.6074]
    strategy: caption-region
    curated: false
  - id: tab01
    label: Table 1
    kind: table
    file: assets/peng-2026-cortex-a-bidirectionally-aligned-embodied/tab01.png
    raw: raw/papers/peng-2026-cortex-a-bidirectionally-aligned-embodied-figures/tab01.png
    caption: "open-loop VLM 평가표. step-level과 episode-level 두 방식에서 공간 정보와 long-horizon 과제와 개수 세기 과제별로 subtask 점수와 메모리 점수와 합계를 비교한다"
    page: 7
    bbox_norm: [0.1602, 0.0783, 0.8398, 0.3207]
    strategy: manual
    curated: false
  - id: tab02
    label: Table 2
    kind: table
    file: assets/peng-2026-cortex-a-bidirectionally-aligned-embodied/tab02.png
    raw: raw/papers/peng-2026-cortex-a-bidirectionally-aligned-embodied-figures/tab02.png
    caption: "LIBERO-Long zero-shot 성공률 비교표. end-to-end 네 가지와 agentic 다섯 가지를 나란히 놓았고 Cortex가 95.5%로 가장 높다"
    page: 7
    bbox_norm: [0.4869, 0.4646, 0.8268, 0.6566]
    strategy: manual
    curated: true
  - id: tab03
    label: Table 3
    kind: table
    file: assets/peng-2026-cortex-a-bidirectionally-aligned-embodied/tab03.png
    raw: raw/papers/peng-2026-cortex-a-bidirectionally-aligned-embodied-figures/tab03.png
    caption: "실제 로봇 두 과제의 방법별 비교표. 화학 실험과 비커 세척 각각에 대해 14단계 중 도달한 평균 단계 수와 성공률을 20회 시도 평균으로 보고한다"
    page: 8
    bbox_norm: [0.4306, 0.7163, 0.8245, 0.8282]
    strategy: table-region
    curated: true
  - id: tab04
    label: Table 4
    kind: table
    file: assets/peng-2026-cortex-a-bidirectionally-aligned-embodied/tab04.png
    raw: raw/papers/peng-2026-cortex-a-bidirectionally-aligned-embodied-figures/tab04.png
    caption: "System-2 학습 설정표. backbone과 GPU 구성과 최적화 파라미터와 시각 해상도 예산을 정리한다"
    page: 16
    bbox_norm: [0.2671, 0.5639, 0.7329, 0.7565]
    strategy: table-region
    curated: false
  - id: tab05
    label: Table 5
    kind: table
    file: assets/peng-2026-cortex-a-bidirectionally-aligned-embodied/tab05.png
    raw: raw/papers/peng-2026-cortex-a-bidirectionally-aligned-embodied-figures/tab05.png
    caption: "Galaxea 데이터에서 수행한 시간 구간 표본 구성 ablation. event-balanced 혼합이 더 적은 표본으로 더 높은 점수를 낸다"
    page: 17
    bbox_norm: [0.1667, 0.1477, 0.8333, 0.2271]
    strategy: table-region
    curated: false
  - id: tab06
    label: Table 6
    kind: table
    file: assets/peng-2026-cortex-a-bidirectionally-aligned-embodied/tab06.png
    raw: raw/papers/peng-2026-cortex-a-bidirectionally-aligned-embodied-figures/tab06.png
    caption: "System-2 평가에 쓴 세 개 시나리오 묶음과 각 묶음의 출처 과제 목록"
    page: 18
    bbox_norm: [0.1763, 0.3917, 0.8237, 0.724]
    strategy: table-region
    curated: false
  - id: tab07
    label: Table 7
    kind: table
    file: assets/peng-2026-cortex-a-bidirectionally-aligned-embodied/tab07.png
    raw: raw/papers/peng-2026-cortex-a-bidirectionally-aligned-embodied-figures/tab07.png
    caption: "시뮬레이션용 π0.5 executor 학습 설정표"
    page: 22
    bbox_norm: [0.3043, 0.1064, 0.6957, 0.3267]
    strategy: table-region
    curated: false
  - id: tab08
    label: Table 8
    kind: table
    file: assets/peng-2026-cortex-a-bidirectionally-aligned-embodied/tab08.png
    raw: raw/papers/peng-2026-cortex-a-bidirectionally-aligned-embodied-figures/tab08.png
    caption: "RoboTwin 2.0 성공률 표. 깨끗한 시연 50개와 무작위화 시연 500개로 학습한 데이터 확장 설정에서 여덟 방법을 비교한다"
    page: 23
    bbox_norm: [0.2458, 0.2702, 0.7542, 0.4179]
    strategy: table-region
    curated: false
  - id: tab09
    label: Table 9
    kind: table
    file: assets/peng-2026-cortex-a-bidirectionally-aligned-embodied/tab09.png
    raw: raw/papers/peng-2026-cortex-a-bidirectionally-aligned-embodied-figures/tab09.png
    caption: "RMBench 결과표. 일곱 개 manipulation 과제에서 여섯 policy의 성공률을 비교하며 Cortex가 블록 재배치와 블록 되돌리기에서 100%를 기록한다"
    page: 23
    bbox_norm: [0.1667, 0.5464, 0.8333, 0.7205]
    strategy: table-region
    curated: false
  - id: tab10
    label: Table 10
    kind: table
    file: assets/peng-2026-cortex-a-bidirectionally-aligned-embodied/tab10.png
    raw: raw/papers/peng-2026-cortex-a-bidirectionally-aligned-embodied-figures/tab10.png
    caption: "실제 로봇용 πmem executor 학습 설정표. action 차원과 action horizon과 시간 프레임 구성까지 포함한다"
    page: 26
    bbox_norm: [0.2976, 0.1064, 0.7024, 0.3896]
    strategy: table-region
    curated: false
---

## 한 줄 요약 (One-line Summary)

Cortex는 상위 VLM이 내는 계획을 32개 canonical skill primitive와 도달 가능성 제약으로 묶어 하위 VLA가 그대로 실행할 수 있게 만든 dual-system VLA 프레임워크로, LIBERO-Long에서 95.5%와 RoboTwin에서 86.8%를 기록하고 14단계 화학 실험을 zero-shot으로 완수한다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 제목 | Cortex: A Bidirectionally Aligned Embodied Agent Framework for Long-horizon Manipulation |
| 저자 | Jiaqi Peng, Xiqian Yu, Delin Feng (공동 1저자) 외 10인, 교신 Yuan Shen과 Tai Wang |
| 소속 | Tsinghua University, Shanghai AI Laboratory, Peking University, USTC |
| arXiv | 2607.05377v1 (2026년 7월 6일) |
| 프로젝트 페이지 | https://steinate.github.io/cortex.github.io |
| 분량 | 본문 9쪽에 부록 24쪽, 그림 18개와 표 10개 |
| 키워드 | Long-horizon Manipulation, Vision-Language-Action Model |

## 2. 주요 기여 (Key Contributions)

논문이 내세우는 기여는 네 가지다.

1. **양방향 alignment 인터페이스**. 상위 VLM과 하위 VLA 사이에 subtask라는 명시적 인터페이스를 두되, 그 인터페이스가 executability와 tractability 두 성질을 모두 만족하도록 설계했다. executability는 VLM이 내놓은 subtask가 VLA가 실제로 아는 명령 형식인지를 뜻하고, tractability는 그 subtask가 로봇의 현재 자세와 팔 길이로 도달 가능한지를 뜻한다.
2. **32개 canonical skill primitive와 대규모 자동 주석**. manipulation subtask를 32개 skill로 표준화하고 `[Unscrew] [object]` 같은 엄격한 언어 템플릿을 붙였다. 이 템플릿 덕분에 공개 영상 4,000시간 이상을 자동으로 재주석할 수 있었고, 시뮬레이터에서 30시간 분량의 절차적 데이터를 추가로 생성했다.
3. **event-balanced sampling**. 균일 표본 추출이 subtask 전환 지점을 과소 대표한다는 문제를 지적하고, 경계 앞뒤에 비대칭 시간 여유를 두어 전환 구간 표본을 의도적으로 늘리는 학습 데이터 구성법을 제안했다.
4. **harness engineering과 asynchronous inference**. 배포 시점에 지시문 형태를 하나로 통합하고 skill 목록으로 출력 공간을 제약하며, System-2가 2Hz로 System-1이 10Hz로 서로를 기다리지 않고 동작하는 실행 구조를 붙였다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 문제 설정

monolithic VLA는 현재 observation만 보고 action을 내는 Markov 가정 위에 서 있다. 논문은 이를 Markovian short-sightedness라 부르며, long-horizon 과제에서 두 가지 모호성으로 나타난다고 정리한다.

| 모호성 | 정의 | 실패 양상 |
|---|---|---|
| temporal ambiguity | 시각적으로 같은 장면이 서로 다른 진행 단계에 나타난다 | 같은 동작을 반복하거나 아직 안 끝난 단계를 건너뛴다 |
| semantic ambiguity | 지시문이 가리키는 대상이 장면 안에서 하나로 좁혀지지 않는다 | 비슷한 물체 중 엉뚱한 것을 집는다 |

기존 dual-system 계열도 문제를 완전히 풀지 못한다. SayCan과 Inner Monologue 같은 초기 계획기는 논문의 표현으로 disembodied observer, 즉 로봇의 물리적 제약을 모르는 관찰자처럼 동작해 실행 불가능한 계획을 낸다. 반대로 MemoryVLA 같은 메모리 강화 VLA는 실행 쪽 견고성은 얻었지만 계획 alignment는 다루지 않는다.

### 3.2 인터페이스 정의

Cortex는 전역 지시문(instruction) I를 받아 연속 action a_t를 내는 문제 사이에 subtask s_t를 삽입한다. "비커를 씻어라"라는 I는 `s1: [Pick] the beaker from the table`처럼 skill 태그가 붙은 문장으로 grounding된다.

subtask만으로는 부족해서 semantic memory M(t)를 시간 다리로 함께 둔다. M(t) = M(0) ⊕ Φ(s_1) ⊕ ... ⊕ Φ(s_{k-1}) 형태로, 완료한 단계의 상태를 문장으로 이어 붙인다. 초기값 M(0)은 "이것이 첫 subtask이며 완료된 subtask가 없다"는 문장이다. 네 번째 subtask를 내기 직전의 메모리는 "로봇이 비커를 집어 받침대에 올린 뒤 물병을 집었다"처럼 기록된다.

### 3.3 메타데이터 구축

**공개 데이터 자동 주석.** AgibotWorld, Galaxea, BEHAVIOR-1K, RoboCerebra 등에서 평균 7개 이상의 subtask를 가진 long-horizon episode를 4,000시간 이상 모았다. 기존 데이터셋은 Qwen3-VL-235B로 템플릿에 맞게 재주석하고 정지 프레임을 병합했다.

**주석 없는 경계 추론.** 자체 수집한 실제 시연 데이터(demonstration)에는 프레임 단위 경계 라벨이 없다. 논문은 이를 다중 모달 시퀀스 분할 문제로 세우고 동적 계획법으로 푼다. 각 프레임 t에서 상태와 action 특징 ϕ_s(o_t, a_t)와 시각 특징 ϕ_v(I_t)를 이어 붙여 x_t를 만들고, subtask s_k마다 정규분포 프로토타입 N(μ_k, Σ_k)을 추정한 뒤 마할라노비스 거리 기반 비용 c_k(t)를 정의한다. 여기에 구간 길이 사전 확률 P_k(i, j)와 저움직임 지점 선호 M(j)를 정규화 항으로 더하고, 단조 증가 경계 b_1 < ... < b_{K-1}을 동적 계획법으로 찾는다. 단조 제약이 subtask 순서를 보존하고 인접 구간의 시간 겹침을 막는다.

**시뮬레이션 절차적 생성.** RoboTwin과 RMBench에서 전문가 스크립트의 `play_once()` 함수 안에 `record_subtask` 컨텍스트 매니저를 감싸 subtask 경계를 프로그램 제어 흐름으로 정의했다. 블록에 진입하는 시점이 시작 프레임, 벗어나는 시점이 종료 프레임이다. tractability를 확보하려고 시뮬레이터 자산에서 물체 범주와 재질 기반 색을 뽑고("파란 장난감 자동차"), 같은 자산이 여러 개면 pose로 상대 위치 수식어를 붙인다("오른쪽 흰 스테이플러"). 로봇 embodiment 설명을 파이프라인에 함께 넣어 도달 가능성을 판정한다.

### 3.4 event-balanced sampling

균일 프레임 표본 추출은 진행 중 구간에 표본이 몰려 경계가 묻힌다. 논문은 trajectory를 세 구간으로 나눈다.

| 구간 | 정의 | 모델이 배워야 하는 것 |
|---|---|---|
| boundary transition | t ∈ [t_k - ε_1, t_k + ε_2] | 완료를 시각적으로 확인하고 메모리를 갱신하며 다음 subtask를 낸다 |
| intra-task execution | t ∈ (t_{k-1} + ε_2, t_k - ε_1) | 현재 subtask와 메모리를 그대로 유지한다 |
| final tail | t ∈ [t_K - ε_1, t_K] | 종료 토큰을 내보낸다 |

완료 단서가 경계보다 조금 늦게 보이므로 ε_2 > ε_1로 두고 전이 구간 전체 길이를 약 1초로 맞춘다. ε은 데이터셋별로 조정해 빠른 RoboCerebra는 0.5초, 느린 Galaxea는 최대 1.5초를 쓴다. 최종 학습 코퍼스는 진행 중 구간 약 76%와 경계 전이 구간 약 24%로 구성됐다.

학습은 두 단계다. 먼저 System-2 VLM(Qwen3-VL-8B-Instruct)을 이 데이터로 fine-tuning해 현재 subtask 예측과 메모리 갱신을 배우게 하고, 이어서 System-1 VLA(π0.5)를 VLM이 주는 subtask에 조건화해 fine-tuning한다.

### 3.5 harness engineering과 추론

harness는 저빈도 계획기와 고빈도 실행기 사이의 중재 계층이다. 하는 일은 네 가지다.

- **지시문 형태 통합**: 개괄 목표와 상세 절차 서술과 명시적 subtask 목록 세 가지를 하나의 프롬프트 형식으로 매핑한다. 학습 혼합 비율은 상세 절차 42.5%, subtask 목록 20.0%, 개괄 목표 37.5%다.
- **출력 공간 제약**: VLM이 32개 skill 중 정확히 하나를 고르게 하고, 생성된 자유 문장을 시퀀스 매칭으로 가장 가까운 canonical primitive에 대응시킨다.
- **비정상 전환 필터**: 인접한 System-2 예측 사이에서 고빈도 전환이 일어나면 새 명령을 받아들이지 않고 이전 명령을 유지한다. System-1은 raw 예측을 직접 소비하지 않는다.
- **타임아웃 기반 처리**: 일정 시간 안에 전환이 승인되지 않으면 느리고 진폭이 작은 교정 동작을 실행해 시각 증거를 갱신한다. 이 장치가 교착 상태를 푼다.

추론은 asynchronous inference 구조로 동작한다. System-2는 낮은 빈도로 진행 상황을 감시하고 System-1은 높은 빈도로 action chunk를 낸다. 실제 로봇에서는 각각 약 2Hz와 약 10Hz다.

### 3.6 32개 skill 목록

Pick, PickAndPlace, Place, Remove, Press, Push, Pull, Navigate, Fold, Wipe, Close, Open, Pour, Cut, Rotate, Handover, Sweep, Stack, Unstack, Screw, Unscrew, Scan, Aim, Clamp, Rinse, Spread, Release, Retreat, AdjustPosture, Tie, Strike, Stir.

System-2는 과제 진행 중이면 이 목록에서 정확히 하나를 고르고, 완료 시에는 skill을 null로 두고 subtask를 "task completed"로 설정한다. 출력은 `current skill`, `current subtask`, `active language memory` 세 키를 가진 JSON이다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 open-loop VLM 평가

Qwen-3.5-9B를 심판으로 쓰는 LLM-as-a-Judge 방식으로 공간 정보와 long-horizon 일관성과 개수 세기 세 항목을 평가했다. teacher-forced로 정답 메모리를 주는 step-level과 자기 출력을 되먹이는 episode-level 두 방식을 함께 썼다. 심판은 0, 0.4, 0.9, 1.0 네 값만 쓰고 subtask 점수와 메모리 점수를 합쳐 10점 만점으로 환산한다.

| 방식 | 방법 | 평균 합계 |
|---|---|---|
| step-level | Qwen3-VL-8B-Instruct | 6.739 |
| step-level | GPT-5 | 6.268 |
| step-level | Gemini | 6.925 |
| step-level | Cortex (baseline) | 7.051 |
| step-level | Cortex (harness 미적용) | 7.213 |
| step-level | Cortex (skill에만 harness) | 7.392 |
| step-level | Cortex (full harness) | 8.318 |
| episode-level | GPT-5 | 7.231 |
| episode-level | Cortex (full harness) | 7.810 |

구성 요소를 하나씩 더할 때마다 점수가 단조 증가하고, full harness가 두 방식 모두에서 가장 높다.

### 4.2 closed-loop 시뮬레이션 평가

**LIBERO-Long.** 모든 agentic 방법에 같은 System-1 executor(π0.5)를 붙여 계획 능력만 분리했다. closed-loop rollout에서는 정답 subtask를 쓸 수 없어 raw 전역 지시문만으로 평가한다.

| 방식 | 방법 | 성공률 |
|---|---|---|
| end-to-end | π0 | 85.2% |
| end-to-end | π0.5 | 92.4% |
| end-to-end | MemoryVLA | 93.4% |
| end-to-end | OpenVLA-OFT | 94.5% |
| agentic | RoboBrain | 57.0% |
| agentic | Qwen3-VL-8B | 68.0% |
| agentic | GPT-5.4 | 72.0% |
| agentic | Gemini-3.1-Pro | 91.0% |
| agentic | Cortex | 95.5% |

Gemini-3.1-Pro가 91.0%로 일반 모델 중 가장 높지만 물리 제약을 모르는 계획을 내는 경우가 있다.

**RoboTwin 2.0.** 깨끗한 시연 50개와 무작위화 시연 500개로 학습하는 데이터 확장 설정이다.

| 방법 | short horizon | long horizon | 전체 |
|---|---|---|---|
| ACT | 33.20% | 24.50% | 29.70% |
| RDT-1B | 35.73% | 32.75% | 34.50% |
| OpenVLA-OFT | 42.10% | 32.80% | 38.30% |
| DP3 | 62.67% | 53.45% | 55.24% |
| π0 | 61.50% | 72.55% | 65.92% |
| X-VLA | 77.13% | 66.30% | 72.80% |
| π0.5 | 82.60% | 82.95% | 82.74% |
| Cortex | 86.00% | 88.00% | 86.80% |

monolithic VLA 대부분이 long horizon에서 성적이 내려가는 반면 Cortex는 88.00%로 short horizon보다 높다. 논문은 두 기제를 원인으로 든다. semantic ambiguity 해소로 `place_object_basket`이 80%에서 85%로 올랐고 도달 가능성 고려로 `dump_bin_bigbin`에 handover subtask를 삽입해 92%에서 98%로 올랐다. temporal ambiguity 해소로는 `press_button`처럼 같은 문장이 반복되는 과제에서 중간 subtask를 삽입해 진행이 끊기지 않게 했다.

**RMBench.** 시연 50개로 학습하고 100회 rollout으로 평가한다.

| 방법 | Observe and Pick Up | Rearrange Blocks | Put Back Block | Swap Blocks | Swap T | Battery Try | Press Button |
|---|---|---|---|---|---|---|---|
| DP | 1% | 0% | 0% | 11% | 20% | 10% | 0% |
| ACT | 1% | 29% | 0% | 2% | 2% | 19% | 0% |
| π0.5 | 9% | 13% | 11% | 24% | 15% | 16% | 0% |
| X-VLA | 9% | 13% | 18% | 16% | 3% | 26% | 0% |
| Mem-0 | 4% | 89% | 90% | 67% | 14% | 28% | 0% |
| Cortex | 14% | 100% | 100% | 99% | 63% | 37% | 20% |

다른 방법이 모두 0%인 Press Button에서 Cortex만 20%를 기록한다. 상태 이력을 256단계로 양자화해 텍스트로 프롬프트에 넣는 장치가 누름 횟수 추적을 가능하게 한다.

### 4.3 실제 로봇 평가

ARX ACONE 양팔 플랫폼에서 zero-shot으로 배포했다. System-1은 MEM 계열 policy π_mem^sub이고 자동 분할한 subtask 단위 데이터 약 10시간으로 fine-tuning했다. 20회 시도 평균이다.

| 방식 | 방법 | 화학 진행도 | 화학 성공률 | 세척 진행도 | 세척 성공률 |
|---|---|---|---|---|---|
| end-to-end | π0.5 | 2.5/14 | 0% | 3.7/14 | 0% |
| end-to-end | π_mem | 4.1/14 | 0% | 6.5/14 | 0% |
| agentic | Cortex | 11.0/14 | 65% | 10.5/14 | 55% |
| 참고 | 사람 계획 + π_mem^sub | 12.2/14 | 75% | 11.6/14 | 70% |

end-to-end 두 방법은 성공률 0%다. Cortex는 화학 실험 65%와 비커 세척 55%를 기록해, 사람이 직접 계획을 주는 상한(75%와 70%)에 근접했다.

### 4.4 ablation

Galaxea 데이터에서 episode 0을 남기는 교차 검증으로 표본 구성을 비교했다.

| 혼합 방식 | 진행 중 표본 | 경계 표본 | 총계 | 비율 | subtask | 메모리 | 평균 합계 |
|---|---|---|---|---|---|---|---|
| 진행 중 우세 | 233만 개 | 62만 개 | 310만 개 | 3.77:1 | 3.40 | 4.17 | 7.58 |
| event-balanced | 178만 개 | 80만 개 | 272만 개 | 2.23:1 | 3.85 | 4.33 | 8.18 |

표본을 38만 개 줄이고도 세 지표가 모두 올랐다. 진행 중 구간의 중복 표본을 늘리는 것보다 경계 부근 표본을 늘리는 쪽이 효과가 크다는 근거다.

### 4.5 학습 자원

System-2는 A800 80GB 32장에서 DeepSpeed ZeRO-3로 학습했고 vision encoder와 projector와 언어 backbone을 모두 풀어 학습했다. 유효 멀티모달 표본은 약 1,420만 개, 전역 배치 512, 최대 시퀀스 8,192 토큰, 최대 학습률 3e-6이다. System-1 executor는 π0.5 기반 36.2억 파라미터로 3만 스텝을 학습했다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

논문이 스스로 드는 한계는 두 가지다.

**메모리 표현.** 텍스트 기반 메모리는 공간 좌표와 미세한 시각 정보를 버린다. 대규모 mobile manipulation처럼 같은 물체 인스턴스를 오래 추적해야 하는 상황에서 대응 관계가 끊긴다. 후속 방향으로 시각 메모리 retrieval과 픽셀 수준 grounding을 통합한 이중 모드 프레임워크를 제시한다.

**고빈도 상태.** 표준 vision encoder에 의존하는 구조라 빠른 미세 상태 변화에 둔감하다. π0.5처럼 이력 proprioception을 토큰화해 연속 운동 정보를 넣는 방법을 시도했지만, 빠르게 변하는 환경에서 시각 정보와 매끄럽게 융합하는 문제는 남아 있다.

부록에서 드러나는 추가 제약도 있다. RoboTwin 평가에서 System-2 출력은 평가자 쪽이 들고 있는 episode별 subtask 계획과 대조하는 국소 스케줄러를 거치며, 매칭 신뢰도와 최대 진행 폭과 최소 유지 시간 조건을 만족할 때만 전환이 승인된다. 즉 완전한 자유 실행이 아니라 안전 장치가 붙은 평가 설정이다.

## 6. 관련 연구 (Related Work)

| 계열 | 대표 연구 | Cortex와의 관계 |
|---|---|---|
| VLA 기반 모델 | RT-1, RT-2, PaLM-E, Octo, OpenVLA, InternVLA-M1, π0, GR00T | Markov 가정 때문에 long-horizon에서 한계를 보인다는 출발점 |
| 계층적 계획 | SayCan, Code as Policies | 언어와 코드 인터페이스를 썼지만 물리 제약을 반영하지 않는다 |
| latent 결합 dual-system | RoboDual 계열, HiRT, Ground Slow Move Fast | 해석 가능성과 명시적 진행 추적을 잃는다 |
| 메모리 강화 VLA | MemoryVLA, CronusVLA, MEM, Memer | 실행 쪽 메모리는 얻었지만 계획 alignment는 다루지 않는다 |
| 고전 계획 | TAMP 계열 | 조합적 추론은 되지만 부분 관찰 개방 환경에서 약하다 |
| 사용된 구성 요소 | Qwen3-VL, π0.5, RoboTwin 2.0, RMBench, AgibotWorld, Galaxea, BEHAVIOR-1K, RoboCerebra | backbone과 executor와 데이터와 벤치마크로 직접 사용 |

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| executability | VLM이 내놓은 subtask가 VLA가 아는 32개 skill 템플릿 중 하나로 표현되는 성질 |
| tractability | 그 subtask가 로봇의 현재 자세와 embodiment로 실제 도달 가능한 성질 |
| semantic-kinematic gap | 상위 계획의 의미 표현과 하위 실행의 운동학 표현 사이에 생기는 간극 |
| Markovian short-sightedness | 현재 observation만 보는 policy가 진행 단계를 구분하지 못하는 현상 |
| temporal ambiguity | 같은 장면이 서로 다른 진행 단계에 나타나 어느 단계인지 정할 수 없는 상태 |
| semantic ambiguity | 지시문이 가리키는 대상이 장면 안에서 하나로 좁혀지지 않는 상태 |
| semantic memory | 완료한 subtask를 문장으로 누적해 다음 판단의 근거로 쓰는 메모리 |
| canonical skill primitive | 32개로 표준화한 manipulation 동작 단위와 그 언어 템플릿 |
| event-balanced sampling | subtask 경계 부근 표본을 의도적으로 늘려 학습 데이터를 구성하는 방법 |
| harness engineering | 계획기와 실행기 사이에서 프롬프트 구성과 출력 정규화와 전환 승인을 담당하는 중재 계층 |
| LLM-as-a-Judge | 별도 언어 모델이 예측과 정답을 비교해 점수를 매기는 평가 방식 |

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 1 | monolithic VLA와 dual-system과 Cortex 비교 | caption-region | wiki 권장 (개념) |
| fig02 | 3 | Cortex 프레임워크 개요 | caption-region | wiki 권장 (architecture) |
| fig03 | 4 | 메타데이터 구축과 인터페이스 표준화 | caption-region | wiki 권장 (method) |
| fig04 | 5 | event-balanced sampling 개념도 | caption-region | wiki 권장 (method) |
| fig05 | 6 | harness engineering 구성 | caption-region | wiki 권장 (method) |
| fig06 | 7 | RoboTwin 2.0 성공률 막대그래프 | caption-region | wiki 권장 (result) |
| fig07 | 8 | 실제 로봇 14단계 화학 실험 | caption-region | wiki 권장 (result) |
| fig08 | 14 | 주석 없는 경계 추론 결과 | caption-region | (확인 필요) |
| fig09 | 15 | 경계 추론 상세 | caption-region | (확인 필요) |
| fig10 | 18 | 평가 세트 15개 과제 프레임 | caption-region | (확인 필요) |
| fig11 | 24 | 상태 이력과 버튼 누름 횟수 | caption-region | (확인 필요) |
| fig12 | 25 | System-2 학습 프롬프트 템플릿 | caption-region | (확인 필요) |
| fig13 | 28 | 오븐 가열 다시점 실행 기록 | caption-region | (확인 필요) |
| fig14 | 29 | 쓰레기 분리 프롬프트 형태 비교 | caption-region | (확인 필요) |
| fig15 | 29 | 비커 세척 subtask 예측 과정 | caption-region | (확인 필요) |
| fig16 | 31 | 비커 세척 방법별 실패 양상 | caption-region | (확인 필요) |
| fig17 | 32 | 마개 집기 실패와 재시도 | caption-region | (확인 필요) |
| fig18 | 33 | 화학 교반 end-to-end 실패 사례 | caption-region | (확인 필요) |
| tab01 | 7 | open-loop VLM 평가표 | manual | wiki 권장 (result) |
| tab02 | 7 | LIBERO-Long zero-shot 성공률 | manual | wiki 권장 (result) |
| tab03 | 8 | 실제 로봇 두 과제 비교표 | table-region | wiki 권장 (result) |
| tab04 | 16 | System-2 학습 설정표 | table-region | (확인 필요) |
| tab05 | 17 | 표본 구성 ablation | table-region | wiki 권장 (ablation) |
| tab06 | 18 | 시나리오 묶음과 출처 과제 | table-region | (확인 필요) |
| tab07 | 22 | 시뮬레이션 executor 학습 설정 | table-region | (확인 필요) |
| tab08 | 23 | RoboTwin 2.0 성공률 표 | table-region | (확인 필요) |
| tab09 | 23 | RMBench 결과표 | table-region | wiki 권장 (result) |
| tab10 | 26 | 실제 로봇 executor 학습 설정 | table-region | (확인 필요) |
