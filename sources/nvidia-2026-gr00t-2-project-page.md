---
title: "GR00T 2: Scaling Robot Foundation Models for Generalization, Dexterity, and Adaptation"
type: article
year: 2026
category: physical-ai
raw_path: raw/articles/nvidia-2026-gr00t-2-project-page.md
raw_filename: "nvidia-2026-gr00t-2-project-page.md"
source_collection: external
author: "NVIDIA"
publisher: "NVIDIA GEAR"
url: "https://research.nvidia.com/labs/gear/gr00t-2/#cite"
tags: [physical-ai, world-model, robot-learning, humanoid]
figures:
  - id: fig01
    label: Image 1
    kind: figure
    file: assets/nvidia-2026-gr00t-2-project-page/fig01.jpg
    raw: raw/articles/nvidia-2026-gr00t-2-project-page-figures/fig01.jpg
    caption: "사람이 깔때기에 거름종이를 놓는 시연"
    strategy: fetched
    curated: false
  - id: fig02
    label: Image 2
    kind: figure
    file: assets/nvidia-2026-gr00t-2-project-page/fig02.jpg
    raw: raw/articles/nvidia-2026-gr00t-2-project-page-figures/fig02.jpg
    caption: "Dexter가 같은 깔때기에 거름종이를 놓는 장면"
    strategy: fetched
    curated: false
  - id: fig03
    label: Image 3
    kind: figure
    file: assets/nvidia-2026-gr00t-2-project-page/fig03.jpg
    raw: raw/articles/nvidia-2026-gr00t-2-project-page-figures/fig03.jpg
    caption: "휴대형 UMI 그리퍼로 컨베이어 물체를 분류하는 시연"
    strategy: fetched
    curated: false
  - id: fig04
    label: Image 4
    kind: figure
    file: assets/nvidia-2026-gr00t-2-project-page/fig04.jpg
    raw: raw/articles/nvidia-2026-gr00t-2-project-page-figures/fig04.jpg
    caption: "YAM이 같은 컨베이어에서 물체를 분류하는 장면"
    strategy: fetched
    curated: false
  - id: fig05
    label: Image 5
    kind: figure
    file: assets/nvidia-2026-gr00t-2-project-page/fig05.jpg
    raw: raw/articles/nvidia-2026-gr00t-2-project-page-figures/fig05.jpg
    caption: "사람이 DexUMI를 착용하고 그래놀라를 뜨는 시연"
    strategy: fetched
    curated: false
  - id: fig06
    label: Image 6
    kind: figure
    file: assets/nvidia-2026-gr00t-2-project-page/fig06.jpg
    raw: raw/articles/nvidia-2026-gr00t-2-project-page-figures/fig06.jpg
    caption: "로봇 손이 그릇에 그래놀라를 담는 장면"
    strategy: fetched
    curated: false
---

## 한 줄 요약 (One-line Summary)

NVIDIA GEAR 프로젝트 페이지는 사람이 보여 준 동작과 로봇의 실행을 영상으로 짝지어 제시한다. 입력 영상과 모델이 예측한 미래 영상을 구분해서 볼 수 있고, 마지막 인용란에서 공식 백서의 서지 정보를 확인할 수 있다.

## 1. 자료 정보 (Document Information)

2026년 11월 NVIDIA가 게시했다. 링크의 `#cite`는 페이지 맨 아래 BibTeX로 연결된다. 자료 유형 표기는 Whitepaper, 기관은 NVIDIA, 인용 키는 `nvidia2026gr00t2`다. 페이지 상단은 코드 공개를 12월로 예고한다.

## 2. 주요 기여 (Key Contributions)

- 트럭 조립 영상에서 Dexter의 실제 입력 이력과 세 카메라 시점의 생성 영상을 나란히 보여 준다.
- 거름종이 놓기, 컨베이어 분류, 그래놀라 뜨기에서 사람과 로봇이 같은 목표를 달성하는 모습을 비교한다.
- 조립 영상은 한 세션의 연속 실행으로 제시한다. 에이전트가 무엇을 확인했고 어느 시점에 개입했는지 실행 장면과 함께 볼 수 있다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

시연 데이터(demonstration)는 사람이 과제를 수행하는 과정을 기록한 자료다. 센서 장갑은 사람 손의 움직임을 기록하고, 휴대형 UMI는 그리퍼로 수행한 동작을 기록한다. 착용형 DexUMI는 로봇 손과 비슷한 접촉면과 관절을 제공한다.

상위 모델은 지시문(instruction)을 단계별로 나눈다. 영상 위에 집을 위치와 놓을 위치를 표시하면 GR00T 2가 그 사이의 움직임을 생성한다. 실행 뒤 새 영상으로 계속 진행할지, 다시 시도할지 판단한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

| 시연 | 결과와 분모 |
|---|---|
| 사람 손에서 Dexter로 | 목표 로봇의 과제별 시연 없이 깔때기에 거름종이를 놓고 적시는 과제에서 20회 중 65% 성공 |
| 휴대형 그리퍼에서 YAM으로 | 장난감 덤프트럭 조립 60%, 컨베이어는 물체 50개 중 86% 분류 |
| YAM의 시각적 지시 | 대상과 목적지를 고르는 단기 지시에서 과제 지시문만 주면 40%, 단계별 지시문은 66%, 위치 표시를 더하면 92% 성공 |
| 에이전트와 연속 삽입 | 케이블 5개 삽입은 강화학습 전후 12/20회에서 19/20회, 충전기 5개는 2/20회에서 20/20회로 증가 |
| G1 팝콘 서빙 | Turbo가 SONIC에 움직임을 전달해 48회 모두 성공 |

## 5. 한계와 향후 과제 (Limitations and Future Work)

표시한 점은 잡는 방식이나 붓는 방향을 정해 주지 않는다. Dexter의 장시간 쓰레기 분류에서는 옮긴 물건의 수가 늘어도 전체 과제를 끝내는 경우가 드물었다. Turbo의 구조 설명은 백서와 차이가 있다. 페이지가 작은 Transformer를 언급하는 반면 백서 2절은 두 모델의 Transformer를 모두 20억 파라미터로 명시한다.

## 6. 관련 연구 (Related Work)

백서의 과제 선정 조건과 실험 결과를 함께 설명한 [[physical-ai/nvidia-2026-gr00t-2-scaling-robot-foundation|GR00T 2 통합 페이지]]를 참고할 수 있다.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| WAM API | 상위 에이전트가 모델 실행을 요청하거나 영상 목표를 전달하는 인터페이스 |
| Gripper UMI | 사람이 들고 로봇 그리퍼 동작을 시연하는 장치 |
| DexUMI | 손가락이 여러 개인 로봇 손의 동작을 기록하는 착용형 장치 |

## 8. 그림 후보 (Figure Candidates)

| id | 위치 | 설명 | 추출 방식 | 추천 |
|---|---|---|---|---|
| fig01 | 웹 | 사람이 깔때기에 거름종이를 놓는 시연 | fetched | ★ 본문 권장 |
| fig02 | 웹 | Dexter가 같은 깔때기에 거름종이를 놓는 장면 | fetched | ★ 본문 권장 |
| fig03 | 웹 | 휴대형 UMI 그리퍼로 컨베이어 물체를 분류하는 시연 | fetched | 참고 |
| fig04 | 웹 | YAM이 같은 컨베이어에서 물체를 분류하는 장면 | fetched | ★ 본문 권장 |
| fig05 | 웹 | 사람이 DexUMI를 착용하고 그래놀라를 뜨는 시연 | fetched | 참고 |
| fig06 | 웹 | 로봇 손이 그릇에 그래놀라를 담는 장면 | fetched | 참고 |
