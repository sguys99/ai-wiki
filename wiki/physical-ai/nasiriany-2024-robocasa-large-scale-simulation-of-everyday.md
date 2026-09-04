---
title: "RoboCasa: Large-Scale Simulation of Everyday Tasks for Generalist Robots"
type: paper
year: 2024
category: physical-ai
source: nasiriany-2024-robocasa-large-scale-simulation-of-everyday.md
raw_path: raw/papers/nasiriany-2024-robocasa-large-scale-simulation-of-everyday.pdf
raw_filename: "nasiriany-2024-robocasa-large-scale-simulation-of-everyday.pdf"
source_collection: external
authors: "Soroush Nasiriany, Abhiram Maddukuri, Lance Zhang, Adeet Parikh, Aaron Lo, Abhishek Joshi, Ajay Mandlekar, Yuke Zhu"
arxiv_id: "2406.02523"
tags: [physical-ai, simulator, robot-dataset, benchmark, manipulation]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/nasiriany-2024-robocasa-large-scale-simulation-of-everyday/fig01.png
    raw: raw/papers/nasiriany-2024-robocasa-large-scale-simulation-of-everyday-figures/fig01.png
    caption: "RoboCasa 개요 — 12개 주방 장면에 single-arm 모바일 플랫폼·humanoid·다리 달린 로봇이 배치된 모습"
    page: 1
    bbox_norm: [0.0783, 0.2803, 0.9218, 0.5691]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/nasiriany-2024-robocasa-large-scale-simulation-of-everyday/fig03.png
    raw: raw/papers/nasiriany-2024-robocasa-large-scale-simulation-of-everyday-figures/fig03.png
    caption: "주방 floor plan 10종 — 건축·인테리어 잡지에서 추린 배치도"
    page: 4
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/nasiriany-2024-robocasa-large-scale-simulation-of-everyday/fig04.png
    raw: raw/papers/nasiriany-2024-robocasa-large-scale-simulation-of-everyday-figures/fig04.png
    caption: "상호작용 가능한 가전 예시 — 문·손잡이·버튼이 관절로 움직인다"
    page: 4
    strategy: caption-region
    curated: false
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/nasiriany-2024-robocasa-large-scale-simulation-of-everyday/fig05.png
    raw: raw/papers/nasiriany-2024-robocasa-large-scale-simulation-of-everyday-figures/fig05.png
    caption: "3D 물체 라이브러리 — 150개 이상 범주에 걸친 2,500여 개 asset"
    page: 5
    strategy: caption-region
    curated: true
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/nasiriany-2024-robocasa-large-scale-simulation-of-everyday/fig06.png
    raw: raw/papers/nasiriany-2024-robocasa-large-scale-simulation-of-everyday-figures/fig06.png
    caption: "LLM으로 과제를 만드는 두 단계 — activity prompting으로 활동 목록을 받고, task prompting으로 각 활동의 과제 청사진을 받는다"
    page: 6
    strategy: caption-region
    curated: true
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/nasiriany-2024-robocasa-large-scale-simulation-of-everyday/fig07.png
    raw: raw/papers/nasiriany-2024-robocasa-large-scale-simulation-of-everyday-figures/fig07.png
    caption: "사람 시연과 MimicGen 합성 데이터 비교 — skill별 성공률과 데이터 양에 따른 상승 추세"
    page: 7
    strategy: caption-region
    curated: true
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/nasiriany-2024-robocasa-large-scale-simulation-of-everyday/fig08.png
    raw: raw/papers/nasiriany-2024-robocasa-large-scale-simulation-of-everyday-figures/fig08.png
    caption: "composite task 5종 결과 — scratch 학습과 atomic task pre-training 후 fine-tuning 비교"
    page: 7
    strategy: caption-region
    curated: true
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/nasiriany-2024-robocasa-large-scale-simulation-of-everyday/fig09.png
    raw: raw/papers/nasiriany-2024-robocasa-large-scale-simulation-of-everyday-figures/fig09.png
    caption: "실기기 실험 환경 — 바퀴 달린 플랫폼 위의 Franka Emika Panda"
    page: 8
    strategy: caption-region
    curated: false
  - id: fig10
    label: Figure 10
    kind: figure
    file: assets/nasiriany-2024-robocasa-large-scale-simulation-of-everyday/fig10.png
    raw: raw/papers/nasiriany-2024-robocasa-large-scale-simulation-of-everyday-figures/fig10.png
    caption: "실기기 평가 — 실세계 데이터만 쓴 경우와 시뮬레이션 데이터를 섞은 경우의 성공률"
    page: 8
    strategy: caption-region
    curated: true
  - id: fig11
    label: Figure 11
    kind: figure
    file: assets/nasiriany-2024-robocasa-large-scale-simulation-of-everyday/fig11.png
    raw: raw/papers/nasiriany-2024-robocasa-large-scale-simulation-of-everyday-figures/fig11.png
    caption: "atomic task 25종 전체 목록 (부록)"
    page: 14
    strategy: caption-region
    curated: false
  - id: fig12
    label: Figure 12
    kind: figure
    file: assets/nasiriany-2024-robocasa-large-scale-simulation-of-everyday/fig12.png
    raw: raw/papers/nasiriany-2024-robocasa-large-scale-simulation-of-everyday-figures/fig12.png
    caption: "20개 주방에 걸친 대표 composite task (부록)"
    page: 15
    strategy: caption-region
    curated: false
  - id: fig13
    label: Figure 13
    kind: figure
    file: assets/nasiriany-2024-robocasa-large-scale-simulation-of-everyday/fig13.png
    raw: raw/papers/nasiriany-2024-robocasa-large-scale-simulation-of-everyday-figures/fig13.png
    caption: "atomic task 24종 과제별 성공률 전체표 (부록)"
    page: 16
    strategy: caption-region
    curated: false
  - id: tab01
    label: Table I
    kind: table
    file: assets/nasiriany-2024-robocasa-large-scale-simulation-of-everyday/tab01.png
    raw: raw/papers/nasiriany-2024-robocasa-large-scale-simulation-of-everyday-figures/tab01.png
    caption: "주요 로봇 시뮬레이션 프레임워크 11종 비교 — RoboCasa만 AI 생성 과제와 AI 생성 asset을 함께 갖는다"
    page: 3
    strategy: table-region
    curated: true
---

## 요약 (Summary)

RoboCasa는 주방을 무대로 삼은 대규모 로봇 시뮬레이션 프레임워크다. RSS 2024에서 UT Austin과 NVIDIA Research가 내놓았다. 문제의식은 단순하다. 로봇 학습을 키우려면 데이터가 필요한데 실세계 수집은 자본과 노동이 너무 든다. 그렇다면 시뮬레이터에서 만들면 되지 않겠는가.

![[assets/nasiriany-2024-robocasa-large-scale-simulation-of-everyday/fig01.png]]
*Figure 1: RoboCasa 개요 — 주방 장면 12종에 single-arm 모바일 플랫폼·humanoid·팔 달린 4족 로봇이 배치돼 있다 (Nasiriany et al. 2024, p.1)*

다만 시뮬레이션이 실제로 쓸모 있으려면 세 가지를 동시에 만족해야 한다고 저자들은 진단한다. 물리와 렌더링이 현실적이어야 하고 장면·asset·과제가 다양해야 한다. 시뮬레이터만이 아니라 대규모 데이터셋도 함께 있어야 한다. 기존 프레임워크는 이 중 일부만 채웠다. RoboCasa는 주방 장면 120개, 153개 범주에 걸친 3D 물체 2,509개, 과제 100종, trajectory 10만 개 이상으로 셋을 함께 채우려 한다. trajectory는 observation과 action이 시간순으로 이어진 실행 기록이다.

생성형 AI도 곳곳에 들어가 있다. 물체는 text-to-3D로 만들고 텍스처는 text-to-image로 만들며 과제 목록은 LLM에게 받는다.

## 주요 기여 (Key Contributions)

MuJoCo 기반 RoboSuite 위에 주방 도메인을 통째로 얹었다. 가구와 가전은 관절이 붙어 있어 전자레인지 문을 여닫고 가스레인지 손잡이를 돌릴 수 있다. 손잡이를 돌리면 화구가 켜지는 상태 변화까지 따라온다. embodiment는 로봇의 물리적 형상과 그에 딸린 제어 API 구성을 뜻한다. RoboCasa는 single-arm 모바일 플랫폼과 humanoid, 팔 달린 4족 로봇을 함께 지원한다.

![[assets/nasiriany-2024-robocasa-large-scale-simulation-of-everyday/tab01.png]]
*Table I: 주요 로봇 시뮬레이션 프레임워크 11종 비교. RoboCasa만 AI 생성 과제와 AI 생성 asset을 동시에 갖는다 (Nasiriany et al. 2024, p.3)*

과제 100종은 두 층으로 나뉜다. skill 하나로 끝나는 atomic task 25종과 skill을 순서대로 엮는 composite task 75종이다. composite task 쪽이 LLM으로 만든 부분이다.

데이터는 사람 시연 1,250개에서 출발해 MimicGen으로 10만 개 이상까지 불렸다. 합성 데이터를 늘릴수록 성공률이 오르는 추세를 보였고 이 시뮬레이션 데이터를 실세계 학습에 섞으면 실기기 성공률도 오른다는 것을 확인했다.

## 방법론 및 아키텍처 (Methodology and Architecture)

### 장면을 layout과 style로 쪼개기

주방 하나를 통째로 만드는 대신 layout과 style을 따로 두고 조합한다. layout은 floor plan을 정하고 style은 가구·가전·텍스처 선택을 정한다. 건축·인테리어 잡지를 뒤져 10개 layout과 12개 style을 뽑고 표준 치수에 맞춰 모델링했다. 조합으로 120개 장면이 나온다.

![[assets/nasiriany-2024-robocasa-large-scale-simulation-of-everyday/fig03.png]]
*Figure 3: 주방 floor plan 10종. 실제 주택 배치를 참고해 표준 치수로 모델링했다 (Nasiriany et al. 2024, p.4)*

여기에 MidJourney로 만든 텍스처를 벽·바닥·조리대·수납장 패널마다 100장씩 준비해 갈아 끼울 수 있게 했다. domain randomization은 시뮬레이션 파라미터를 흔들어 sim2real 간극을 줄이는 기법이다. 텍스처 교체가 그 역할을 맡는다. 학습 데이터는 AI 생성 텍스처로 렌더하고 평가는 사람이 고른 텍스처 장면에서 하는 식으로 일반화를 시험했다.

![[assets/nasiriany-2024-robocasa-large-scale-simulation-of-everyday/fig05.png]]
*Figure 5: 3D 물체 라이브러리. Objaverse 1.0에서 가져온 것과 text-to-3D로 생성한 것이 섞여 153개 범주 2,509개를 이룬다 (Nasiriany et al. 2024, p.5)*

### LLM에게 과제를 물어보기

atomic task 25종은 여덟 가지 기본 skill에서 나온다. pick-and-place, 문 여닫기, 서랍 여닫기, 레버 돌리기, 손잡이 비틀기, 버튼 누르기, 삽입, 주방 내 이동이다.

composite task는 프롬프트를 두 번 친다. 먼저 GPT-4에게 간단한 일상 주방 활동 30가지를 물어 요리·설거지·해동·상 차리기 같은 목록을 받는다. 그다음 활동마다 로봇이 수행할 만한 과제 15가지를 제안받는다. 제안에는 과제 이름과 목표, 필요한 물체와 가전, skill 순서가 들어 있다. LLM이 논리적으로 어긋난 제안을 내놓는 경우가 있어 사람이 걸러내고 고친 뒤 75개를 코드로 옮겼다.

![[assets/nasiriany-2024-robocasa-large-scale-simulation-of-everyday/fig06.png]]
*Figure 6: LLM 과제 생성 2단계. activity prompting으로 활동 목록을 받고 task prompting으로 활동별 과제 청사진을 받는다. 예시는 "Steaming Vegetables" 활동의 "Prepare Microwave Steaming" 과제 (Nasiriany et al. 2024, p.6)*

LLM이 인간 중심 인터넷 텍스트로 학습됐으니 사람이 실제로 하는 행동의 분포도 어느 정도 반영하리라는 가정이 여기 깔려 있다. 무엇이 "그럴듯한 집안일인가"를 사람이 일일이 열거하는 대신 모델에게 묻는다.

### 사람 시연 1,250개를 10만 개로

네 명이 SpaceMouse로 atomic task마다 50개씩 총 1,250개를 시연했다. 시연마다 layout·style·텍스처를 무작위로 뽑아 다양성을 확보했다. 그런데 이 규모로는 대부분의 과제가 풀리지 않았다. 과제와 장면의 다양성이 워낙 커서다.

그래서 MimicGen을 붙인다. MimicGen은 사람 시연을 물체 중심 구간으로 쪼갠 뒤 새 장면에서 해당 물체의 현재 pose에 맞춰 각 구간을 변환하고 이어 붙여 새 시연을 만든다. 성공한 시도만 남기는 rejection sampling을 써서 품질을 걸러낸다.

MimicGen을 붙이려면 과제가 알려진 물체 중심 하위 단계의 순서로 표현돼야 하고 사람 시연마다 그 경계가 표시돼야 한다. RoboCasa의 atomic task는 여덟 skill에서 파생되므로 여기서 유리하다. skill마다 한 번씩만 단계 순서와 종료 판정 함수를 짜두면 전체 시연에 재사용되기 때문이다.

## 결과 (Results)

### 합성 데이터를 늘리면 성능이 오른다

RoboMimic의 BC-Transformer로 multi-task policy를 학습했다. policy는 현재 observation을 받아 다음 action을 정하는 함수다. behavioral cloning은 시연의 observation→action 쌍을 지도학습으로 흉내 내는 방법이다.

![[assets/nasiriany-2024-robocasa-large-scale-simulation-of-everyday/fig07.png]]
*Figure 7: 사람 시연과 MimicGen 합성 데이터 비교. skill 묶음별 성공률이고 오른쪽 끝이 전체 평균이다 (Nasiriany et al. 2024, p.7)*

사람 시연 1,250개로 학습하면 28.8%, MimicGen 72,000개로 학습하면 47.6%다. 그 사이 Generated-100(2,400개)과 Generated-300(7,200개)이 순서대로 놓여 데이터를 늘릴수록 성능이 오르는 모양이 그대로 드러난다. 평가는 과제당 50회씩, floor plan과 style이 서로 다른 다섯 장면에서 했다. 그중 둘은 학습에서 본 적 없는 style이고 물체는 전부 미학습 인스턴스다.

skill별로 난이도가 갈린다. 서랍과 문 여닫기는 쉽고 pick-and-place와 삽입이 어렵다. 앞쪽은 문 인스턴스가 여섯 종뿐인 반면 뒤쪽은 물체 범주가 수십 종이라 다양성이 크고 삽입은 정밀한 손놀림을 요구한다고 저자들은 해석한다.

### composite task는 여전히 어렵다

![[assets/nasiriany-2024-robocasa-large-scale-simulation-of-everyday/fig08.png]]
*Figure 8: composite task 5종 결과. scratch 학습과 atomic task pre-training 후 fine-tuning 비교 (Nasiriany et al. 2024, p.7)*

과제당 사람 시연 50개로 단일 policy를 학습하면 다섯 과제 중 넷에서 성공률이 0이다. atomic task 합성 데이터로 pre-training한 뒤 fine-tuning하면 넷이 0을 벗어나지만 최고가 ArrangeVegetables의 12%다. PrepareCoffee는 어느 쪽도 0이다. 저자들은 정밀 조작과 단계 전환을 주된 실패 원인으로 꼽는다. 벤치마크로서 개선 여지를 크게 남겨둔 셈이다.

### 시뮬레이션 데이터가 실기기에 도움이 된다

DROID 하드웨어 위의 Franka Emika Panda로 실세계 주방에서 세 과제를 시험했다. 조리대에서 싱크로, 싱크에서 조리대로, 조리대에서 수납장으로 물체를 옮기는 과제다. 시뮬레이터는 Operational Space Control에 20Hz, 실기기는 그렇지 않고 15Hz다. control frequency는 로봇이 1초에 몇 번 새로운 action을 갱신하는지를 뜻한다. 카메라 캘리브레이션과 조명, 로봇 베이스 위치도 서로 다르다. 조건이 이만큼 어긋난 상태에서 시뮬레이션 데이터가 도움이 되는지를 봤다.

![[assets/nasiriany-2024-robocasa-large-scale-simulation-of-everyday/fig10.png]]
*Figure 10: 실기기 평가. 실세계 데이터만 쓴 경우와 시뮬레이션 MimicGen 데이터를 함께 쓴 경우 (Nasiriany et al. 2024, p.8)*

학습에서 본 물체 기준 13.6%에서 24.4%로, 상대 79% 올랐다. 미학습 물체는 2.6%에서 9.3%로 절대 수치는 낮지만 배수로는 더 크게 벌어진다. 저자들은 시뮬레이터의 시각·물리적 사실성과 다양성을 이 이득의 근거로 든다.

## 한계 (Limitations)

composite task 성능이 낮다는 점을 저자들이 먼저 꼽는다. policy 구조와 학습 알고리즘, 합성 데이터 품질 모두 개선 여지가 있다고 본다. MimicGen이 만든 trajectory는 성공 판정을 통과했더라도 급격한 움직임이나 충돌을 포함하는 경우가 많다. 시뮬레이션 상태를 검사해 자동으로 걸러낼 수 있다고 제안한다.

LLM으로 과제를 만들었다지만 구현 코드는 결국 사람이 짰다. 장면과 과제를 LLM이 제안하고 코드까지 쓰게 하는 것이 다음 목표로 남아 있다. 주방 밖 환경으로 넓히는 일도 마찬가지다. 실기기 실험은 pick-and-place 세 과제, embodiment 하나에 그쳐 전이 주장의 범위도 좁다.

## 이 저장소 안에서의 위치 (Position in This Wiki)

이 저장소의 physical-ai 페이지 대부분은 policy나 모델을 다룬다. RoboCasa는 그 policy들이 평가받는 무대 쪽이다. 실제로 GR00T 계열 페이지들이 RoboCasa를 벤치마크 이름으로 계속 인용해 왔는데 그 이름의 출처가 이 논문이다.

[[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation|GR00T N1]]은 RoboCasa Kitchen 24개 과제를 DexMimicGen·GR-1 Tabletop과 나란히 세 벤치마크 중 하나로 쓴다. neural trajectory co-training 실험도 RoboCasa의 30/100/300 데이터 구간에서 잰다. [[physical-ai/nvidia-2025-gr00t-n1-5-an-improved-open|GR00T N1.5]]가 보고한 "RoboCasa 과제당 demo 30개에서 17.4 → 47.5"라는 수치도 여기서 정의된 환경 위의 값이다. 저데이터 구간에서 차이가 벌어진다는 그쪽 주장은 RoboCasa가 과제와 장면을 얼마나 다양하게 흔드는지를 전제로 성립한다.

MimicGen이라는 축도 이 저장소에서 반복된다. GR00T N1의 neural trajectory든 [[physical-ai/wu-2023-unleashing-large-scale-video-generative|GR-1]] 이후의 영상 기반 데이터 확장이든 답하려는 질문은 "사람 시연을 어떻게 불릴 것인가" 하나로 같다. RoboCasa는 그중 시뮬레이터의 특권 정보를 쓰는 쪽 경로다.

후속작은 [[physical-ai/nasiriany-2026-robocasa365-a-large-scale-simulation-framework|RoboCasa365]]다. 같은 저자들이 장면 120개를 2,500개로, 과제 100종을 365종으로 키우고 벤치마크 성격을 전면에 내세웠다. 이 페이지는 그 토대가 어떻게 짜였는지를 담는다.

## 관련 페이지 (Related Pages)

- [[physical-ai/nasiriany-2026-robocasa365-a-large-scale-simulation-framework]] — 직접 후속. 장면 2,500개·과제 365종·데이터 2,200시간으로 확장하고 multi-task·foundation model·lifelong learning 세 벤치마크를 붙였다
- [[physical-ai/robocasa-robocasa]] — 공식 구현 저장소. 설치·gym wrapper·데모 스크립트
- [[physical-ai/robocasa-2026-robocasa365-project-page]] — 프로젝트 홈페이지. 두 논문을 함께 소개한다
- [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation]] — RoboCasa Kitchen 24개 과제를 주요 벤치마크로 쓰고 neural trajectory co-training도 여기서 잰다
- [[physical-ai/nvidia-2025-gr00t-n1-5-an-improved-open]] — RoboCasa 저데이터 구간에서 17.4 → 47.5를 보고. 이 환경 정의 위의 수치다
- [[physical-ai/zhao-2023-learning-fine-grained-bimanual-manipulation]] — 사람 시연으로 policy를 학습하는 반대편 경로. 시뮬레이션 없이 실기기 teleoperation에 기댄다
- [[overviews/physical-ai-overview]] — physical-ai 분류 기준과 학습 경로 허브
