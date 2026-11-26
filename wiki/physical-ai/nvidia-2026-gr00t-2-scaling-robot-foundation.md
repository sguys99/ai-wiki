---
title: "GR00T 2: Scaling Robot Foundation Models for Generalization, Dexterity, and Adaptation"
type: paper
year: 2026
category: physical-ai
raw_path: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation.pdf
raw_filename: "nvidia-2026-gr00t-2-scaling-robot-foundation.pdf"
source_collection: external
authors: "NVIDIA"
url: "https://research.nvidia.com/labs/gear/gr00t-2/assets/gr00t2_whitepaper.pdf"
tags: [physical-ai, world-model, robot-learning, humanoid]
source: nvidia-2026-gr00t-2-scaling-robot-foundation.md
sources:
  - nvidia-2026-gr00t-2-scaling-robot-foundation.md
  - nvidia-2026-gr00t-2-project-page.md
project_url: "https://research.nvidia.com/labs/gear/gr00t-2/#cite"
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig01.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig01.png
    caption: "GR00T 2의 학습 자료, 입력과 출력, 로봇 간 기술 전이와 응용"
    page: 4
    bbox_norm: [0.0947, 0.0939, 0.9054, 0.6198]
    strategy: caption-region
    curated: true
  - id: fig07
    label: Model Architecture
    kind: figure
    file: assets/nvidia-2026-gr00t-2-project-page/fig07.png
    raw: raw/articles/nvidia-2026-gr00t-2-project-page-figures/fig07.png
    caption: "Dexter 트럭 조립에서 과거 영상과 예측 영상, 관절 명령을 연결한 공식 구조도"
    strategy: screenshot
    curated: true
    from_source: nvidia-2026-gr00t-2-project-page
  - id: fig10
    label: Figure 10
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig10.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig10.png
    caption: "사람 영상의 학습 비율에 따른 실제 Dexter와 생성 영상의 성공률 및 진행도"
    page: 15
    bbox_norm: [0.0947, 0.0939, 0.9053, 0.3078]
    strategy: caption-region
    curated: true
  - id: fig08
    label: X-Adaptability
    kind: figure
    file: assets/nvidia-2026-gr00t-2-project-page/fig08.png
    raw: raw/articles/nvidia-2026-gr00t-2-project-page-figures/fig08.png
    caption: "거름종이 놓기, 컨베이어 분류, 그래놀라 뜨기에서 시연과 로봇 실행을 짝지은 공식 사진"
    strategy: screenshot
    curated: true
    from_source: nvidia-2026-gr00t-2-project-page
  - id: fig14
    label: Figure 14
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig14.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig14.png
    caption: "동일한 YAM 첫 화면에서 학습 데이터에 따라 달라지는 덤프트럭 조립 예측 영상"
    page: 19
    bbox_norm: [0.0947, 0.0939, 0.9053, 0.2969]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig02.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig02.png
    caption: "Dexter 시연 수에 따른 50개 과제의 평균 성공률과 과제별 분포"
    page: 6
    bbox_norm: [0.0947, 0.0939, 0.9053, 0.2586]
    strategy: caption-region
    curated: true
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig06.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig06.png
    caption: "상위 에이전트가 WAM과 복구 도구를 호출하는 실행 구조"
    page: 10
    bbox_norm: [0.0947, 0.3329, 0.9053, 0.575]
    strategy: caption-region
    curated: true
  - id: fig53
    label: Figure 53
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig53.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig53.png
    caption: "RoboCasa365 시뮬레이션에서 에이전트 개입으로 서랍을 연 사례와 토스트 회수에 실패한 사례"
    page: 101
    bbox_norm: [0.0947, 0.0939, 0.9053, 0.4315]
    strategy: caption-region
    curated: true
  - id: fig56
    label: Figure 56
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig56.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig56.png
    caption: "YAM 단기 지시문 평가에 쓰인 참조 유형 여덟 가지"
    page: 105
    bbox_norm: [0.0725, 0.0798, 0.9275, 0.4174]
    strategy: caption-region
    curated: true
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig09.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig09.png
    caption: "추론 모델에서 Turbo를 거쳐 SONIC으로 이어지는 G1 제어 구조"
    page: 13
    bbox_norm: [0.1241, 0.1007, 0.8759, 0.3232]
    strategy: caption-region
    curated: true
  - id: fig57
    label: Figure 57
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig57.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig57.png
    caption: "G1이 이동과 양손 작업을 함께 수행한 과제별 장면"
    page: 110
    bbox_norm: [0.098, 0.1032, 0.902, 0.4377]
    strategy: caption-region
    curated: true
  - id: fig18
    label: Figure 18
    kind: figure
    file: assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig18.png
    raw: raw/papers/nvidia-2026-gr00t-2-scaling-robot-foundation-figures/fig18.png
    caption: "YAM 체크포인트별 실제 환경과 시뮬레이션의 진행도, 성공률, Elo"
    page: 21
    bbox_norm: [0.0947, 0.33, 0.9053, 0.5411]
    strategy: caption-region
    curated: true
---

## 요약

GR00T 2는 로봇이 다음에 보게 될 장면과 그때까지 실행할 동작을 함께 예측하는 NVIDIA의 로봇 모델이다. 사람이 깔때기에 거름종이를 놓는 영상에는 로봇의 관절 명령이 없어도, 종이를 펼쳐 깔때기 안쪽에 밀착시키는 과정이 담겨 있다. 모델은 사람 영상에서 장면이 바뀌는 과정을 배우고, 로봇 기록에서 그 변화를 자신의 팔과 손으로 만드는 방법을 배운다.

이 전이가 어디까지 되는지는 목표 로봇에서의 성공률로 확인할 수 있다. 두 손에 각각 22개 자유도를 갖춘 Dexter는 자기 손으로 시연한 적 없는 과제 50개에서 평균 40% 성공했다. 과제별로 시연 데이터(demonstration)를 1회 제공하면 71%, 5회 제공하면 95%였다. 연구진은 시연 5회로 성공률 80% 이상에 도달한 과제에서 이 50개를 골랐다. 따라서 95%는 소량 적응이 가능한 과제에서 달성한 성적으로 읽어야 한다. [백서 3.1절, 부록 A.3](https://research.nvidia.com/labs/gear/gr00t-2/assets/gr00t2_whitepaper.pdf#page=6)

![[assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig01.png]]
*백서 그림 1 (4쪽). 가운데 행을 왼쪽에서 오른쪽으로 읽으면 카메라 영상과 로봇 상태, 지시문에서 미래 영상과 로봇 명령이 함께 나온다. 아래 행은 이 모델을 서로 다른 손과 G1에 적용한 사례다.*

## 배경

같은 과제도 사람 손, 평행 그리퍼, 다섯 손가락 로봇에서 필요한 명령은 서로 다르다. 예를 들어 사람은 손가락 끝으로 거름종이 가장자리를 눌러 펼치지만 다른 손을 쓰는 로봇은 관절의 위치와 접촉 순서를 새로 맞춰야 한다. 연구진이 사용한 공통 신호는 동작 전후에 보이는 영상이다. 물체가 어느 방향으로 움직이고 어디에 놓이는지는 서로 다른 손의 기록에서도 비교할 수 있다.

policy는 카메라 영상과 현재 로봇 상태를 받아 다음 제어 명령을 고르는 함수다. 이 명령을 action이라고 한다. GR00T 2의 WAM은 policy의 출력에 미래 영상을 추가한다. 로봇이 직접 해 본 과제에서는 영상과 명령을 모두 학습하고, 영상만 있는 예에서도 물체의 움직임을 예측하는 부분은 학습할 수 있다. 손의 위치를 추적한 사람 기록이라면 손가락 움직임도 학습 신호로 쓸 수 있다.

백서와 프로젝트 페이지는 같은 연구를 서로 다른 방식으로 보여 준다. 백서에는 시연 횟수와 비교 대상, 실패 판정 조건이 있고, 프로젝트 페이지에는 실제 작업의 진행과 모델이 생성한 영상을 나란히 보는 예시가 있다. 장난감 트럭을 조립하는 Dexter 사례에서 과거 0.8초는 카메라로 찍은 화면이고, 이어지는 세 시점의 미래 장면은 모델의 예측이다. 생성 영상이 그럴듯한지와 실제 조립이 끝났는지는 별도로 평가한다. [프로젝트 페이지의 모델 시연](https://research.nvidia.com/labs/gear/gr00t-2/#archfig)

## 핵심 개념

### 한 번의 예측에서 만드는 두 출력

GR00T 2는 최대 네 대의 카메라가 최근 0.8초 동안 초당 5프레임으로 촬영한 224×320 영상, 현재 로봇 상태, 자연어 지시문(instruction)을 읽는다. 머리 카메라는 작업대에서 목표 물체가 어디에 있는지 보여 주고 양쪽 손목 카메라는 손이 물체에 닿는 부분을 보여 준다. 출력은 카메라별 미래 프레임과 앞으로 여러 시점에 실행할 action의 묶음이다.

| 구성 | 모델에서 하는 일 |
|---|---|
| Wan 2.1 영상 인코더 | 카메라별 영상을 시간 방향 4배, 가로와 세로 각각 8배 압축한다. 기본형에서는 시점별 압축 프레임 하나가 280개 토큰이 된다. |
| Cosmos-Reason1 | 지시문을 인코딩한다. Transformer가 cross-attention으로 이 정보를 읽는다. |
| Cosmos-Predict2.5-2B 기반 Transformer | 여러 시점과 시간에 걸친 영상 토큰을 연결한다. action 토큰은 현재 영상과 생성 중인 미래 영상 모두를 참조한다. |
| 로봇별 입출력 모듈 | 현재 상태와 잡음이 섞인 action을 공통 표현으로 바꾸고 최종 출력을 해당 로봇의 명령 형식으로 되돌린다. |

영상과 동작을 연결하는 지점은 Transformer 내부다. action을 예측하는 동안 손목 카메라의 미래 영상까지 참조할 수 있으므로, 로봇 명령은 현재 물체의 위치와 모델이 예상한 다음 위치를 함께 반영할 수 있다. 영상과 action에는 각각 flow matching 손실을 준다. 이는 잡음에서 시작해 실제 학습 예시의 영상이나 명령으로 접근하는 방향을 배우는 방법이다.

로봇이 움직이는 동안에는 다음 명령 묶음을 미리 계산한다. 백서의 배치 설정은 영상을 1~2단계, action을 2~4단계에 걸쳐 생성한다. 백서가 남긴 질문은 학습 중의 영상 예측과 실행 중의 미래 예측이 각각 어느 정도 이득을 주는가이다. [백서 2절, 5절](https://research.nvidia.com/labs/gear/gr00t-2/assets/gr00t2_whitepaper.pdf#page=5)

![[assets/nvidia-2026-gr00t-2-project-page/fig07.png]]
*공식 프로젝트 페이지의 모델 구조도. 왼쪽은 Dexter의 머리와 두 손목 카메라로 찍은 최근 0.8초다. 오른쪽 위는 모델이 생성한 세 시점의 미래 장면이고, 오른쪽 아래 곡선은 같은 구간에 예측한 팔과 손의 관절 목표값이다.*

### 기본형과 Turbo의 차이

다관절 손이 작은 부품을 끼울 때는 손가락과 부품 사이의 간격이 중요하다. 반면 걸어가는 G1은 몸이 움직이는 동안 다음 명령을 빨리 받아야 한다. Turbo는 미래 영상에서 처리할 공간 토큰 수를 줄여 이런 시간 제약에 대응한다. 백서 2절의 규격은 기본형과 Turbo 모두 **20억 파라미터 Transformer**를 사용하고, Turbo에서 영상 인코더를 Wan 2.2 VAE로 바꾼다고 명시한다.

Turbo의 압축률은 가로와 세로 각각 16배다. 따라서 기본형과 비교하면 공간 격자에 남는 위치가 4분의 1이다. 입출력 투영은 새 영상 표현에 맞춰 바꾸되 예측할 action 구간의 길이는 유지한다. 프로젝트 페이지의 본문에는 Turbo의 Transformer도 더 작다는 표현이 있어 모델 크기에는 백서의 구조 명세를 따랐다. 실제 로봇 성능은 아래 기본형과 Turbo 비교표에서 확인할 수 있다. [백서 2절](https://research.nvidia.com/labs/gear/gr00t-2/assets/gr00t2_whitepaper.pdf#page=6) / [프로젝트 페이지](https://research.nvidia.com/labs/gear/gr00t-2/#turbo-latency)

## 학습 방법

### 서로 다른 기록의 역할

| 원천 | 실제 사용한 규모 | 학습에 제공하는 정보 |
|---|---|---|
| Human-1M | 1인칭 영상 40만 2,730시간, 약 1,375만 episode | 다양한 사람, 작업 장소, 도구의 사용 순서와 장면 변화 |
| UMI-10K | 휴대형 그리퍼 1만 184시간, 약 94만 2,000개 episode, 2,897개 과제 | 손목 시야와 그리퍼의 벌어진 폭을 함께 기록한 시연 |
| 로봇 teleoperation | 2만 3,500시간, 약 116만 episode | 평행 그리퍼, 다관절 손, G1 등에서 실제 실행된 로봇별 명령 |

teleoperation은 사람이 로봇을 원격으로 움직이면서 시연을 기록하는 방식이다. YAM 기록만 약 1만 8,700시간이며 Sharpa 손, Wuji 손, Unitree G1과 Franka도 포함된다. Human-1M이라는 이름은 원천 데이터 규모를 가리킨다. 백서가 추려 학습한 40만 2,730시간과 프로젝트 페이지가 공개 자료로 안내하는 Human-1M-100K의 10만 시간은 각각 다른 수치다. [백서 4.2절](https://research.nvidia.com/labs/gear/gr00t-2/assets/gr00t2_whitepaper.pdf#page=15) / [프로젝트 페이지](https://research.nvidia.com/labs/gear/gr00t-2/)

사람 영상 안에서도 촬영 방식에 따라 용도가 다르다. 여러 장소에서 촬영한 자료는 작업자와 장면의 다양성을 제공한다. 실험실에서 별도로 수집한 약 3,000시간은 머리와 손목 카메라의 시야, 시연 속도를 로봇 조건에 맞췄다. 같은 기술을 목표 손으로 옮기는 실험에는 이렇게 수집 단계에서 시점과 속도 차이를 줄인 데이터가 쓰인다.

1. **한 카메라의 미래 예측을 학습한다.** 사람의 1인칭 영상을 중심으로 로봇 영상을 섞는다. 다음 화면에서 손과 물체가 어떻게 움직일지를 맞히는 것이 첫 목표다.
2. **여러 카메라의 영상과 동작을 함께 학습한다.** 로봇별 상태와 명령을 연결하고, 유효한 동작 기록이 있는 예시에 action 손실을 적용한다. 사람 손의 위치 기록과 로봇 관절 명령은 각각 해당 신체의 표현을 거친다.
3. **로봇 기록을 더 자주 사용한다.** 같은 학습 목표를 유지하면서 YAM을 비롯한 로봇 시연의 비중을 높인다. 실제 로봇에서 실행할 명령에 더 많은 학습 기회를 주는 단계다.

Flora는 긴 기록에서 동작의 경계를 찾고 구간마다 독립적으로 이해할 수 있는 지시문을 붙인다. 시간 표시가 있어야 전체 작업의 이름만으로는 구분할 수 없는 순간을 학습할 수 있다. 예를 들어 조립이라는 한 과제 안에서도 부품을 고르는 시점과 이미 고른 부품을 끼우는 시점에 필요한 명령은 다르다.

### 사람 영상의 양을 바꾼 실험

연구진은 사람 영상을 전체의 0%, 1%, 10%, 100%로 바꾸어 학습하고 동일한 목표 로봇 데이터로 적응한 뒤 Dexter 과제 72개를 평가했다. 실제 로봇에서는 과제당 3회 실행해 사람이 완료 여부를 채점했다. 생성 영상은 기록된 초기 장면에서 시작해 여러 번 생성한 뒤 시각 언어 모델로 채점했다. 두 평가가 측정하는 대상이 다르므로 영상 점수와 로봇 점수를 따로 볼 필요가 있다.

| 사람 영상 사용 비중 | 0% | 1% | 10% | 100% |
|---|---:|---:|---:|---:|
| 실제 로봇 성공률 | 18% | 27% | 28% | 41% |
| 실제 로봇 진행도 | 50% | 58% | 61% | 70% |
| 생성 영상 성공률 | 30% | 33% | 38% | 51% |
| 생성 영상 진행도 | 64% | 66% | 72% | 77% |

![[assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig10.png]]
*백서 그림 10 (15쪽). 왼쪽 두 그래프는 실제 Dexter의 수행 결과이고 오른쪽 두 그래프는 생성 영상을 채점한 결과다. 사람 영상 비중이 0%에서 100%가 될 때 실제 로봇의 성공률은 18%에서 41%로 높아졌다.*

실제 로봇의 진행도는 네 설정에서 차례로 올랐지만, 1%에서 10%로 늘렸을 때 최종 성공률 차이는 1%p였다. 물체를 올바로 잡고 움직여도 마지막 삽입에서 실패하면 그 실행은 미완료로 집계되기 때문이다. 실험 설계상 0% 설정은 공통 사람 영상 학습 단계 전체를 건너뛰고 나머지 설정은 각 자료량에 비례해 학습한다. 그림 10은 이 학습 조건에서의 성능 변화를 보여 주며, 같은 연산 시간으로 사람 영상 한 시간을 더했을 때의 효과를 분리해 측정한 실험은 아니다. [백서 4.2.1절, 그림 10](https://research.nvidia.com/labs/gear/gr00t-2/assets/gr00t2_whitepaper.pdf#page=15)

### 학습 장비에 영상을 공급하는 방법

여러 카메라를 사용하는 학습에서는 압축 영상을 필요한 구간에서 읽고 프레임을 제때 복원해야 한다. 연구진이 시점 세 개의 자료 묶음에서 측정한 결과, 배치 준비 시간의 약 90%를 영상 디코딩에 썼다. 이를 줄이기 위해 다음 영상 묶음을 노드의 NVMe에 미리 읽고, 프레임 복원과 GPU로 전송할 배치 준비를 겹쳐 실행했다.

학습 실행마다 LanceDS 데이터 버전을 고정해 당시의 로봇 기록, 품질 판정, 정규화 통계를 함께 재현할 수 있게 했다. 같은 형식으로 저장한 데이터에서 로봇 식별자를 읽으면 어떤 카메라와 상태 및 명령 배열을 사용할지 결정된다. 주요 학습에는 클러스터의 GB300 GPU 2,016개 중 1,024개를 사용했다. 안정적으로 학습 중인 100스텝에서 초당 약 1만 2,000개의 학습 구간을 공급했고, 다음 입력을 기다리느라 드러난 지연은 평균 0.37ms였다. 이 측정값은 데이터 공급 속도를 나타낸다. [백서 4.7절, 표 35](https://research.nvidia.com/labs/gear/gr00t-2/assets/gr00t2_whitepaper.pdf#page=25)

## 다른 손이 배운 과제를 옮기는 방법

X-Adapt에서 새롭다는 말은 **목표 로봇이 그 과제를 시연한 적이 없다**는 뜻이다. 사람이 해당 과제를 수행한 기록과 목표 로봇이 다른 물체를 자유롭게 다룬 기록은 함께 사용할 수 있다. 전자는 무엇을 해야 하는지를 보여 주고, 후자는 목표 손으로 물체를 가리거나 집었을 때 카메라에 무엇이 보이는지 알려 준다.

![[assets/nvidia-2026-gr00t-2-project-page/fig08.png]]
*공식 프로젝트 페이지의 전이 시연. 각 열의 위는 학습에 쓴 시연, 아래는 같은 과제를 수행하는 로봇이다. 왼쪽부터 사람 손과 Dexter, 휴대형 UMI와 YAM, 착용형 DexUMI와 로봇 손을 비교할 수 있다.*

| 시연에서 실행까지 | 서로 다른 부분을 맞춘 방법 | 목표 로봇의 결과 |
|---|---|---|
| 센서 장갑 → Dexter | 머리와 손목 카메라로 시연을 기록하고 사람 손가락의 위치를 Sharpa 손에 맞게 변환 | 깔때기에 거름종이를 놓고 적시기 65%, 20회 평가 |
| 휴대형 UMI → YAM | 손목 카메라의 시야와 그리퍼 명령을 YAM 기준으로 맞추고 YAM의 다른 작업 기록을 함께 학습 | 덤프트럭 조립 60%, 기판 분해 50%, 컨베이어 물체 50개 중 86% 분류 |
| 착용형 DexUMI → 같은 구조의 XHAND | 시연에서 기록한 관절과 힘을 사용해 로봇 손의 움직임과 접촉 강도를 조절 | 바나나 요구르트 준비 60%, 그래놀라 뜨기 80% |
| DexUMI → 구조가 다른 Sharpa 손 | 손끝 위치를 새 손의 관절 위치로 바꾼다. 양쪽 손의 힘 형식이 달라 위치 명령으로 학습 | 현미경 슬라이드 작업 60%, 컨베이어 물체 선택 후 던지기 65% |
| 사람 영상 → 시뮬레이션 → 실제 손 | 영상 한 편에서 도구와 손동작을 재구성하고 가상 환경에서 학습한 시연을 생성 | 실제 손으로 못 박기 10회 중 9회 성공 |

컨베이어 실험의 86%는 벨트 위 물체 50개 가운데 맞는 상자로 보낸 비율이다. 한 대를 끝까지 조립하면 성공하는 덤프트럭과 분모가 다르다. 프로젝트 페이지의 위아래 영상에서 같은 물체가 사람의 휴대형 그리퍼와 YAM의 손목 카메라에 서로 다른 각도로 보이는 점을 확인할 수 있다. [백서 3.2절, 표 4~7](https://research.nvidia.com/labs/gear/gr00t-2/assets/gr00t2_whitepaper.pdf#page=48) / [공식 전이 시연](https://research.nvidia.com/labs/gear/gr00t-2/#x-adapt)

![[assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig14.png]]
*백서 그림 14 (19쪽). 왼쪽 첫 프레임은 두 줄에서 같다. UMI 시연만 학습한 위쪽에는 사람 팔과 파란 그리퍼가 나타난다. YAM의 다른 작업 기록을 함께 학습한 아래쪽에는 YAM 자신의 팔이 나타난다.*

시야를 맞추는 효과는 부록 E.3의 ablation에서 드러난다. UMI 시연을 전량 사용해도 손목 영상을 변환하지 않으면 덤프트럭 조립과 기판 분해는 모두 0%였고 컨베이어 물체의 46%를 분류했다. YAM의 카메라에 맞추면 각각 60%, 50%, 86%가 됐다. 데이터를 절반만 사용하면 각각 30%, 0%, 84%였다. 반복되는 분류에는 적은 시연으로도 대응했지만 여러 단계를 연결해야 하는 분해 과제에서는 마지막 단계까지 성공하는 데 차이가 컸다.

로봇별 출력을 공유하는 선택도 과제에 따라 결과가 달랐다. UMI 명령을 YAM 형식으로 변환해 출력 모듈을 공유하면 덤프트럭 조립 성공률은 60%, 독립 모듈을 쓰면 10%였다. 기판 분해에서는 독립 모듈이 60%로 공유 모듈의 50%를 앞섰다. 두 설정은 출력 모듈과 명령 표현을 함께 바꿨으므로 성능 차이 전체를 모듈 공유의 효과로 돌릴 수 없다. [백서 표 17](https://research.nvidia.com/labs/gear/gr00t-2/assets/gr00t2_whitepaper.pdf#page=79)

## 실제 로봇에서의 적응과 성능

### 시연 다섯 번의 효과와 선정 조건

Dexter-50의 과제는 YAM이나 사람 영상에는 등장하지만 Dexter의 기존 학습 기록에는 없다. 지시문만 주었을 때 전체 시도 중 성공한 비율은 40%였고, 한 번이라도 성공한 과제는 50개 중 40개였다. 전자는 시도 횟수가 분모이고 후자는 서로 다른 과제 수가 분모다. 후자를 80%의 zero-shot 성공률로 읽으면 두 측정을 혼동하게 된다.

| 목표 과제당 Dexter 시연 수 | 과제별 성공률의 평균 | 성공률이 100%인 과제 |
|---|---:|---:|
| 0회 | 40% | 4/50개 |
| 1회 | 71% | 19/50개 |
| 5회 | 95% | 37/50개 |

![[assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig02.png]]
*백서 그림 2 (6쪽). 왼쪽 막대는 시연이 0회, 1회, 5회일 때의 평균 성공률이다. 오른쪽 막대는 과제 수를 나타낸다. 다섯 번 시연한 뒤 모든 시도에서 성공한 과제는 짙은 초록색으로 표시된 37개다.*

한 번의 성공 시연에서도 과제의 모든 순간이 같은 양의 정보를 주지는 않는다. 손을 목표물 가까이 옮기는 단계는 이미 잘하지만 손잡이에 손가락을 거는 순간에 자주 실패할 수 있다. 연구진은 시연 하나를 100개 시간 구간으로 나누고, 기존 모델에서 손실이 큰 구간을 더 자주 학습했다. Transformer의 선형층에 rank 32 LoRA를 적용하고 영상 인코더와 원래 가중치는 고정했다. 5회 시연의 로봇 기록은 과제당 3분 미만이며, 적응에는 과제당 RTX 5090 한 장으로 약 30분이 걸렸다.

백서에는 별도로 71개 과제를 각 3회 수행한 zero-shot 비교도 있다. 손을 정밀하게 쓰는 과제 49개에 색, 순서, 부정 표현 등 새로운 지시문을 따르는 과제 22개를 더했다. 같은 회차에 모델들을 번갈아 실행하고 채점자는 어떤 모델이 실행 중인지 알 수 없었다. 이 구성에서 기본형은 49.8%, Turbo는 36.6%, GR00T 1.7은 18.3%, π0.5는 26.3% 성공했다. 이 결과는 Dexter-50의 5회 적응 성적과 별개의 평가다. [백서 표 3, 부록 A.3](https://research.nvidia.com/labs/gear/gr00t-2/assets/gr00t2_whitepaper.pdf#page=41)

### 여러 단계를 끝까지 수행하는 정밀 작업

백서 표 1은 과제에 맞게 post-training한 모델이 여러 단계를 끝까지 수행했는지 평가한다. 진행도는 부분적으로 끝낸 작업에도 점수를 주며, 성공률은 모든 단계를 마친 시도만 센다. 예를 들어 부품을 찾아 올바른 방향에 놓아도 최종 체결에 실패하면 진행도는 높고 성공률은 낮을 수 있다.

| 플랫폼과 과제 | GR00T 2 성공률 | Turbo 성공률 |
|---|---:|---:|
| YAM / 자동차 조립 | 85% | 50% |
| YAM / 트랙터 조립 | 45% | 40% |
| YAM / 비행기 조립 | 70% | 55% |
| YAM / 휴대전화 포장 | 65% | 55% |
| YAM / 배관 체결 | 70% | 90% |
| YAM / 차단기 배선 삽입 | 95% | 100% |
| **YAM 6개 평균** | **71.7%** | **65.0%** |
| Dexter / 배송 라벨 부착 | 60% | 60% |
| Dexter / 손전등 전지 교체 | 55% | 15% |
| Dexter / GB300 메모리 교체 | 85% | 50% |
| Dexter / 트럭 조립 | 65% | 5% |
| Dexter / 소금 여과 | 85% | 65% |
| Dexter / 비타민 C 검사 | 75% | 25% |
| Dexter / 현미경 작업 | 55% | 20% |
| **Dexter 7개 평균** | **68.6%** | **34.3%** |

YAM의 기본형 평균 진행도는 100점 중 81.3점, Turbo는 77.9점이었다. 같은 여섯 과제에서 가장 성공률이 높았던 비교 모델은 π0.5로 12.5%였다. Dexter의 평균 진행도는 기본형 86.6점과 Turbo 62.0점이었다. GR00T 1.7의 평균 성공률은 0.7%, π0.5는 0%였다. 다관절 손 과제에서 Turbo의 성능 차이가 크지만 이 실험만으로 영상 압축을 원인으로 특정할 수는 없다.

Dexter 트럭 조립에는 초기 배치 차이가 있다. 표에 실린 두 GR00T 2 모델은 더 쉬운 장면에서 평가했다. 기본형을 원래 배치로 평가했을 때 평균 진행도는 94점인데 성공은 20회 중 7회(35%)였다. 모델을 비교하거나 트럭 조립 시연을 볼 때 시작 장면을 확인해야 하는 이유다. [백서 표 1](https://research.nvidia.com/labs/gear/gr00t-2/assets/gr00t2_whitepaper.pdf#page=7)

## 접촉 오차와 긴 작업의 복구

### 실제 접촉을 이용한 강화학습

배관 체결과 케이블 삽입은 목표물에 거의 도달해도 나사산이나 커넥터의 방향이 조금 어긋나면 완료되지 않는다. 연구진은 지도학습으로 출발한 모델을 실제 로봇에서 여러 차례 실행해 과제의 성공 여부를 얻었다. 탐색할 때는 영상 예측을 고정된 방식으로 계산하면서 action의 잡음 제거 단계에만 무작위성을 더했다. 이렇게 수집한 실행으로 GRPO를 적용하고, 그중 성공한 실행을 다시 학습했다.

| 실제 로봇 과제 | 지도학습 후 | GRPO 후 | GRPO 성공 실행 재학습 후 |
|---|---:|---:|---:|
| 배관 체결 | 66% | 86% | 88% |
| 손가락 배치 | 58% | 72% | 98% |
| 케이블 삽입 | 76% | 92% | 94% |
| 충전기 삽입 | 40% | 94% | 96% |

배관은 표 1보다 맞추기 어려운 각도에서 시작했다. 프로젝트 페이지의 요약은 세 가지 접촉 과제에서 88~96%를 보고하며, 백서 그림 5는 손가락 배치까지 포함한 네 과제를 보여 준다. 가상 환경 안에서 학습한 별도 실험도 있다. DreamDojo 안에서 RoboLab 과제 열 가지를 함께 학습한 뒤 원래 RoboLab에서 과제와 모델마다 500회 평가하자 평균 성공률이 51.32%에서 70.88%로 높아졌다. 실제 삽입 과제의 성공률과는 실험 환경이 다르다. [백서 그림 5](https://research.nvidia.com/labs/gear/gr00t-2/assets/gr00t2_whitepaper.pdf#page=10) / [백서 그림 50](https://research.nvidia.com/labs/gear/gr00t-2/assets/gr00t2_whitepaper.pdf#page=96)

### 작업 중단과 재개를 판단하는 에이전트

GR00T 2가 받는 0.8초의 영상만으로는 몇 분 전에 어느 나사를 조였는지 확인하기 어렵다. 상위 에이전트는 전체 과제의 순서를 보관하고 현재 화면과 로봇 상태를 확인한다. 부품이 떨어지면 모델 실행을 멈추고 부품 위치를 복구하는 코드 기반 기술을 호출한다. 장면이 다시 준비되면 GR00T 2에 정밀 조립을 맡긴다.

![[assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig06.png]]
*백서 그림 6 (10쪽). 왼쪽 에이전트가 카메라를 확인하고 실행을 요청하면 가운데 서버가 GR00T 2 또는 복구용 코드를 호출한다. 오른쪽의 로봇 상태가 다시 에이전트로 돌아오므로 재시도 여부를 판단할 수 있다.*

연구진은 매 시도 직전에 사람이 장난감 부품 전체를 탁자에 쏟도록 했다. 부품의 위치와 겹침이 달라지고 로봇은 통상 5~14분 동안 필요한 부품을 찾아 차례대로 조립해야 한다. 자동차 조립의 고정 배치 성공률은 85%였지만 부품을 무작위로 쏟자 지도학습 모델은 100회 중 23회만 성공했다. 초기 배치와 작업 중 복구를 함께 검증하는 시험이다.

| 무작위 배치, 과제당 100회 | 지도학습 | DAgger 교정 시연 추가 | 교정 시연과 에이전트 결합 |
|---|---:|---:|---:|
| 비행기 | 69회 | 84회 | 98회 |
| 트랙터 | 51회 | 71회 | 97회 |
| 자동차 | 23회 | 78회 | 97회 |

세 과제에서 총 300회 중 292회 조립을 마쳤다. 남은 실패 8회 중 3회에서는 나사가 끝까지 들어가지 않았는데도 모델과 에이전트가 완료로 판정했다. 카메라에서 부품이 제자리에 있는 것처럼 보이는 상황에서는 완료 판정 자체가 병목이 된다. 외부 에이전트를 결합한 수치를 기본 모델 단독 성적으로 해석할 수 없는 이유이기도 하다.

![[assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig53.png]]
*백서 그림 53 (101쪽). 시뮬레이션의 위쪽 사례에서는 에이전트가 오븐 손잡이를 놓고 서랍 손잡이를 잡아 복구한다. 아래쪽에서는 토스트를 다시 잡지 못해 시간이 끝난다. 각 행 아래 색 띠는 어느 시점에 제어권이 바뀌었는지 보여 준다.*

한 번의 정밀 동작과 연속 작업의 차이는 삽입 실험에서도 확인된다. 케이블 다섯 개를 연달아 꽂을 때 에이전트는 부품을 찾아 위치를 맞추고 GR00T 2는 삽입을 담당했다. 에이전트를 공통으로 사용한 조건에서 삽입 모델에 강화학습을 추가하자 전체 성공은 20회 중 12회에서 19회가 됐다. 사람이 가리킨 곳에 충전기 다섯 개를 꽂는 과제는 20회 중 2회에서 20회로 높아졌다. [백서 3.4절, 그림 7](https://research.nvidia.com/labs/gear/gr00t-2/assets/gr00t2_whitepaper.pdf#page=11) / [연속 실행 영상](https://research.nvidia.com/labs/gear/gr00t-2/#agentic-control)

### 영상 위에서 목표 위치를 지정하는 방법

에이전트는 로봇에 문장만 전달할 수도 있고, 어느 팔로 어느 물체를 잡아 어디에 둘지 화면에 표시할 수도 있다. 표시를 학습할 때는 기존 시연에서 그리퍼가 닫히고 열리는 시점을 찾아 쓴다. 모델은 두 점 사이에서 어떻게 접근하고 물체를 운반할지를 생성하고 에이전트는 실행 후의 화면을 다시 확인한다.

| 대상과 목적지를 지정하는 짧은 지시 | 과제 지시문만 | 단계별 지시문 | 단계별 지시문과 위치 표시 |
|---|---:|---:|---:|
| YAM, 설정당 90회 | 40% | 66% | 92% |
| Dexter, 설정당 64회 | 30% | 33% | 70% |

![[assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig56.png]]
*백서 그림 56 (105쪽). 위쪽에서는 과일의 순서, 이름, 위치, 개수를 바꾼다. 아래쪽에서는 열기와 닫기, 사용할 팔, 잡는 방향, 움직이면 안 되는 물체를 바꾼다. 같은 장면에서도 지시문의 한 단어가 성공 조건을 바꾼다.*

표시가 주는 정보는 과제의 종류에 따라 달라진다. YAM에서 무엇을 어디로 옮길지 묻는 경우와 달리, 어떻게 잡거나 움직일지 지정한 54회에서는 성공률이 44%에서 59%로 높아졌다. 잡을 점과 놓을 점이 같아도 붓기, 닦기에는 서로 다른 중간 동작과 최종 방향이 필요하기 때문이다.

긴 쓰레기 분류에서 YAM은 단계별 지시문만으로 20회 모두 미완료였고, 영상 표시를 더하자 17회 완료했다. 기판 분해는 각각 10회 중 0회와 3회였다. Dexter 쓰레기 분류에 대해서는 백서 표 22가 단계별 지시문에서 1/20회, 표시를 더하면 9/20회라고 명시한다. 프로젝트 페이지의 정성적 설명보다 정확한 비교에는 이 분모와 완료 횟수가 적합하다. [백서 표 22~23](https://research.nvidia.com/labs/gear/gr00t-2/assets/gr00t2_whitepaper.pdf#page=106) / [시각적 지시 시연](https://research.nvidia.com/labs/gear/gr00t-2/#steering)

## G1에서의 실행과 평가

### 모델 예측과 관절 제어의 속도

G1이 컵을 들고 걸을 때 다음에 어디로 갈지 정하는 주기와 균형을 유지하는 데 필요한 주기는 다르다. Turbo는 약 1초 간격으로 앞으로 1.6초의 전신 움직임을 예측하고, SONIC은 이 표현을 50Hz로 관절 목표값으로 바꾼다. 따라서 Jetson Thor에서 측정한 124ms는 모델이 명령 묶음을 예측하는 데 걸리는 시간이다. SONIC이 관절 목표를 갱신하는 주기는 20ms다.

![[assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig09.png]]
*백서 그림 9 (13쪽). 왼쪽의 선택적 추론 모델이 과제를 지정하면 Turbo가 앞으로 1.6초의 움직임을 예측한다. SONIC은 이 예측과 몸의 현재 상태를 읽어 초당 50회 관절 목표를 갱신한다.*

| 플랫폼과 모델 | GPU | 최적화 전 예측 중앙값 | 최적화 후 예측 중앙값 |
|---|---|---:|---:|
| Dexter / 기본형 | RTX 5090 | 449.20ms | 152.78ms |
| Dexter / 기본형 | DGX Station GB300 | 219.02ms | 48.47ms |
| YAM / 기본형 | RTX 5090 | 550.96ms | 179.79ms |
| YAM / 기본형 | DGX Station GB300 | 386.06ms | 54.00ms |
| G1 / Turbo | RTX 5090 | 224.73ms | 38.40ms |
| G1 / Turbo | Jetson Thor, 120W | 720.41ms | 123.97ms |

각 행은 같은 입력 조건과 체크포인트에서 최적화 전후를 비교한다. 영상 인코딩 일부를 요청 전에 수행할 수 있으므로 예측 지연을 카메라 노출부터 실제 관절이 움직일 때까지의 전체 지연과 구분해야 한다. 기본형과 Turbo의 행은 로봇과 입력 조건도 다르므로 표의 행 간 차이만으로 모델 교체 효과를 산출할 수 없다. [백서 부록 I.1, 표 27](https://research.nvidia.com/labs/gear/gr00t-2/assets/gr00t2_whitepaper.pdf#page=115)

명령 묶음을 제때 이어 붙이는 문제도 있다. RoboDojo의 정밀 과제 여덟 가지에서 지연을 320ms로 설정하면 기존 비동기 실행의 성공률은 15.0%였다. 실행을 이미 약속한 앞부분에 잡음을 주어 다음 묶음을 이어서 예측하는 방식은 같은 지연에서 성공률을 21.4%로 높였고 묶음 경계에서 생기는 명령의 급격한 변화도 줄였다. 이 수치는 지연을 통제한 시뮬레이션 결과다. [백서 부록 I.2, 표 28](https://research.nvidia.com/labs/gear/gr00t-2/assets/gr00t2_whitepaper.pdf#page=116)

### 실제 작업의 완료 기준

G1 실험은 물체를 한 번 집는 동작에서 끝나지 않는다. 팝콘 과제는 컵 두 개를 모두 채워 놓아야 성공하고, 탁자 정리는 여섯 가지 물체를 모두 집어 통으로 옮겨야 성공한다. 같은 장비에서 평가한 결과는 팝콘 서빙 48/48회, 탁자 정리 28/30회, 바닥 물체 집기 25/30회, 흘린 액체 닦기 14/30회였다. 네 과제의 평균 성공률은 80.8%다. 작업별 분모가 다르므로 이 평균은 모든 시도를 합산한 비율과 다르다. [백서 표 25](https://research.nvidia.com/labs/gear/gr00t-2/assets/gr00t2_whitepaper.pdf#page=111)

![[assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig57.png]]
*백서 그림 57 (110쪽). 각 행에서 시간이 왼쪽에서 오른쪽으로 흐른다. 위에서부터 팝콘 서빙, 탁자 정리, 바닥 물체 집기, 흘린 액체 닦기다. 마지막 행에서는 G1이 발로 수건을 밀어 닦은 뒤 몸을 낮춰 수건을 회수한다.*

물체와 작업대 배치가 달라지는 조건에서는 합성 시연의 효과를 따로 측정했다. 기록한 G1 동작을 유지하면서 가상 장면을 바꿔 총 25만 episode, 1,000시간을 생성했다. 같은 실제 데이터에 이 시연을 더하면 분포 밖 탁자 과제의 성공률은 Turbo에서 6.7%에서 63.3%로, GR00T 1.7에서 6.7%에서 40.0%로 높아졌다. 기존 동작으로 집을 수 있는 가상 장면을 먼저 찾아 검증한 뒤 학습 자료에 추가했다는 점이 중요하다. [백서 표 26](https://research.nvidia.com/labs/gear/gr00t-2/assets/gr00t2_whitepaper.pdf#page=112)

## 평가를 해석할 때의 한계

실제 로봇의 실험실 점수는 같은 모델에서도 날짜, 작업자, 카메라 위치에 따라 달라진다. GearArena는 한 사람이 같은 장면에서 2~4개 체크포인트를 무작위 순서로 실행하고 모델 이름을 가린 채 비교한다. 이 기록에서 어느 체크포인트가 상대적으로 더 잘했는지 추정한다. 승패가 자주 갈리는 과제와 대부분의 모델이 모두 성공하거나 모두 실패하는 과제는 순위를 가르는 데 제공하는 정보가 다르다.

재구성한 가상 작업대는 실제 평가에 투입할 후보를 고르는 데 쓸 수 있다. YAM 과제 25개에서 체크포인트 14개의 성능을 실물과 시뮬레이션에서 각각 측정했을 때 Pearson 상관계수는 진행도 0.93, 성공률 0.92, 상대 Elo 0.93이었다. 연구진은 시뮬레이션으로 후보를 세 개까지 줄인 다음 실제 로봇에서 비교했다. 이 상관계수는 접촉이 더 복잡한 조립이나 시뮬레이터의 오차를 이용하도록 학습한 모델에서도 같은 순위를 보장하지 않는다. [백서 4.3~4.5절, 그림 18](https://research.nvidia.com/labs/gear/gr00t-2/assets/gr00t2_whitepaper.pdf#page=21)

![[assets/nvidia-2026-gr00t-2-scaling-robot-foundation/fig18.png]]
*백서 그림 18 (21쪽). 점 하나는 체크포인트 하나다. 가로는 실제 로봇, 세로는 같은 과제를 재현한 시뮬레이션의 점수다. 가운데 그래프에서 성공률의 Pearson 상관계수는 0.92였다.*

수집 시간을 어떻게 배분할지도 열린 문제다. 한 시간의 사람 영상은 여러 환경에서 물체가 움직이는 방식을 보여 주고, 같은 시간의 목표 로봇 시연은 그 장치가 실제로 실행할 수 있는 명령을 제공한다. 사람 영상이 성능을 높였다는 결과만으로 두 자료의 교환 비율이나 새로운 로봇을 대표하는 데 필요한 최소 시연량을 계산할 수는 없다. 실패와 복구가 드물게 담긴 성공 시연만으로 자동 채점기를 학습시키기도 어렵다.

촉각과 힘의 사용 범위에도 제약이 있다. DexUMI 기록으로 손이 가할 힘을 출력하도록 학습했지만 GR00T 2는 접촉 중 측정한 촉각을 입력으로 받지 않는다. 0.8초보다 긴 이력을 요하는 판단은 상위 에이전트에 맡겼고, 손잡이를 충분히 조였는지처럼 영상만으로 구분하기 어려운 상태는 에이전트도 틀릴 수 있다. 높은 성공률을 주장하려면 시험 횟수도 늘려야 한다. 백서의 검정 가정에서는 95%와 99%를 구분하는 데 모델당 약 285회가 필요하다. [백서 5절](https://research.nvidia.com/labs/gear/gr00t-2/assets/gr00t2_whitepaper.pdf#page=26)

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| WAM | 미래 영상과 실행할 로봇 명령을 함께 예측하는 world-action model |
| Human-1M | 손과 도구의 움직임을 배울 수 있는 대규모 1인칭 사람 영상 자료 |
| X-Adapt | 시연한 사람 또는 장치와 실제로 실행할 로봇이 다른 조건에서 과제를 옮기는 방법 |
| Dexter-50 | 목표 로봇의 과제별 시연을 0회, 1회, 5회 제공해 전이를 비교한 50개 과제 |
| GearArena | 같은 실제 장면에서 후보 모델을 익명으로 비교하는 평가 시스템 |
| SONIC | 예측한 몸의 움직임을 G1의 관절 목표값으로 변환하는 제어기 |

## 관련 페이지

- [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation|GR00T N1]]은 사람 영상과 로봇 데이터를 함께 쓰는 이전 세대의 학습 구조를 설명한다.
- [[physical-ai/nvidia-gr00t-n1-7-3b|GR00T N1.7 모델 카드]]에서는 백서의 주요 비교 모델이 받는 입력과 로봇별 추론 지연을 확인할 수 있다.
- [[overviews/vla-evolution-groot-pi-gemini-robotics-overview|VLA 계보]]는 GR00T와 다른 로봇 모델 계열의 학습 목표를 함께 다룬다.

공식 인용은 NVIDIA가 2026년 11월 발행한 백서로, BibTeX 키는 `nvidia2026gr00t2`다. [백서 PDF](https://research.nvidia.com/labs/gear/gr00t-2/assets/gr00t2_whitepaper.pdf) / [프로젝트 페이지와 BibTeX](https://research.nvidia.com/labs/gear/gr00t-2/#cite)
