---
title: "RoboCasa: Large-Scale Simulation of Everyday Tasks for Generalist Robots"
type: paper
year: 2024
category: physical-ai
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
    caption: "RoboCasa 개요. 주방 장면 12종에 single-arm 모바일 플랫폼, humanoid, 팔 달린 4족 로봇이 배치돼 있다"
    page: 1
    bbox_norm: [0.0783, 0.2803, 0.9218, 0.5691]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/nasiriany-2024-robocasa-large-scale-simulation-of-everyday/fig03.png
    raw: raw/papers/nasiriany-2024-robocasa-large-scale-simulation-of-everyday-figures/fig03.png
    caption: "주방 floor plan 10종. 건축과 인테리어 잡지에서 추린 배치도"
    page: 4
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/nasiriany-2024-robocasa-large-scale-simulation-of-everyday/fig04.png
    raw: raw/papers/nasiriany-2024-robocasa-large-scale-simulation-of-everyday-figures/fig04.png
    caption: "상호작용 가능한 가전 예시. 문과 손잡이, 버튼이 관절로 움직이고 손잡이를 돌리면 화구가 켜지는 상태 변화까지 따라온다"
    page: 4
    strategy: caption-region
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/nasiriany-2024-robocasa-large-scale-simulation-of-everyday/fig05.png
    raw: raw/papers/nasiriany-2024-robocasa-large-scale-simulation-of-everyday-figures/fig05.png
    caption: "3D 물체 라이브러리. 153개 범주에 걸친 2,509개 asset"
    page: 5
    strategy: caption-region
    curated: true
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/nasiriany-2024-robocasa-large-scale-simulation-of-everyday/fig06.png
    raw: raw/papers/nasiriany-2024-robocasa-large-scale-simulation-of-everyday-figures/fig06.png
    caption: "LLM으로 과제를 만드는 두 단계. activity prompting으로 활동 목록을 받고 task prompting으로 각 활동의 과제 청사진을 받는다"
    page: 6
    strategy: caption-region
    curated: true
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/nasiriany-2024-robocasa-large-scale-simulation-of-everyday/fig07.png
    raw: raw/papers/nasiriany-2024-robocasa-large-scale-simulation-of-everyday-figures/fig07.png
    caption: "사람 시연과 MimicGen 합성 데이터 비교. skill 묶음별 성공률과 데이터 양에 따른 상승 추세"
    page: 7
    strategy: caption-region
    curated: true
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/nasiriany-2024-robocasa-large-scale-simulation-of-everyday/fig08.png
    raw: raw/papers/nasiriany-2024-robocasa-large-scale-simulation-of-everyday-figures/fig08.png
    caption: "composite task 5종 결과. scratch 학습과 atomic task pre-training 후 fine-tuning 비교"
    page: 7
    strategy: caption-region
    curated: true
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/nasiriany-2024-robocasa-large-scale-simulation-of-everyday/fig09.png
    raw: raw/papers/nasiriany-2024-robocasa-large-scale-simulation-of-everyday-figures/fig09.png
    caption: "실제 기기 실험 환경. 바퀴 달린 이동 플랫폼 위의 Franka Emika Panda"
    page: 8
    strategy: caption-region
    curated: false
  - id: fig10
    label: Figure 10
    kind: figure
    file: assets/nasiriany-2024-robocasa-large-scale-simulation-of-everyday/fig10.png
    raw: raw/papers/nasiriany-2024-robocasa-large-scale-simulation-of-everyday-figures/fig10.png
    caption: "실제 기기 평가. 실세계 데이터만 쓴 경우와 시뮬레이션 데이터를 함께 쓴 경우의 성공률"
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
    caption: "주방 활동 20종의 대표 composite task (부록)"
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
    caption: "주요 로봇 시뮬레이션 프레임워크 11종 비교. RoboCasa만 AI 생성 과제와 AI 생성 asset을 함께 갖는다"
    page: 3
    strategy: table-region
    curated: true
---

## 한 줄 요약 (One-line Summary)

RoboCasa는 주방을 무대로 삼은 대규모 로봇 시뮬레이션 프레임워크다. 주방 장면 120개, 3D 물체 2,509개, 과제 100종을 갖추고 사람 시연 1,250개를 MimicGen으로 10만 개 넘게 불린다. 합성 데이터를 늘릴수록 성공률이 28.8%에서 47.6%로 오르고 이 시뮬레이션 데이터를 실제 기기 학습에 섞으면 성공률이 13.6%에서 24.4%로 오른다.

## 1. 자료 정보 (Document Information)

- **제목**: RoboCasa: Large-Scale Simulation of Everyday Tasks for Generalist Robots
- **저자**: Soroush Nasiriany, Abhiram Maddukuri, Lance Zhang, Adeet Parikh, Aaron Lo, Abhishek Joshi (UT Austin), Ajay Mandlekar (NVIDIA Research), Yuke Zhu (UT Austin와 NVIDIA Research 겸직). Maddukuri와 Zhang은 동등 기여자다.
- **발표**: arXiv 2406.02523 (2024-06-04), Robotics: Science and Systems (RSS) 2024
- **프로젝트**: https://robocasa.ai 코드는 MIT, asset과 dataset은 CC BY 4.0
- **지원**: National Science Foundation (FRR-2145283, EFRI-2318065), Office of Naval Research (N00014-22-1-2204)
- **한 줄 성격**: 실세계 데이터 수집의 비용 문제를 시뮬레이션으로 우회하려는 시도. 생성형 AI로 장면과 물체, 과제를 만들고 자동 trajectory 생성으로 데이터를 불린다.

저자들이 서론에서 세운 전제는 시뮬레이션이 유용하려면 세 가지를 동시에 만족해야 한다는 것이다. 첫째, 물리와 렌더링과 기반 모델이 현실적이어야 실세계로 전이된다. 둘째, 장면과 asset과 과제가 다양해야 하며 생성형 AI가 그 다양성을 규모 있게 만드는 열쇠다. 셋째, 시뮬레이터만으로는 부족하고 그 다양성을 담아낸 대규모 로봇 데이터셋이 함께 있어야 한다. 기존 시도들은 이 중 일부만 만족했다는 것이 이 논문의 출발점이다.

## 2. 주요 기여 (Key Contributions)

가장 큰 기여는 시뮬레이션 프레임워크 자체다. MuJoCo 기반의 RoboSuite 위에 주방 장면 120개, 상호작용 가능한 가구와 가전 수십 종, 153개 범주에 걸친 3D 물체 2,509개를 결합했다. embodiment는 로봇의 물리적 형상과 그에 딸린 제어 API 구성을 뜻한다. RoboCasa는 single-arm 모바일 플랫폼과 humanoid, 팔 달린 4족 로봇을 함께 지원하므로 cross-embodiment 실험이 가능하다.

과제는 100종이다. 25개는 pick-and-place나 문 여닫기처럼 skill 하나로 끝나는 atomic task이고 나머지 75개는 여러 skill을 순서대로 엮어야 하는 composite task다. composite task는 GPT-4와 Gemini 1.5에게 주방 활동 목록을 받고 활동마다 과제 청사진을 받아 만들었다.

데이터셋이 나머지 하나다. 사람이 SpaceMouse로 과제당 50개씩 총 1,250개를 시연하고 MimicGen으로 10만 개 넘는 trajectory를 합성했다. trajectory는 observation과 action이 시간순으로 이어진 실행 기록이다. 합성 데이터를 늘릴수록 성능이 꾸준히 올라가는 것을 보였고 이 데이터가 실세계 과제 학습에도 도움이 된다는 점까지 확인했다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 기반 플랫폼

RoboCasa는 RoboSuite를 코어 시뮬레이션 플랫폼으로 채택했다. 물리적 사실성과 속도, 모듈형 설계가 선택 이유이고 환경 모델 형식과 로봇 컨트롤러를 그대로 물려받았다. 방 규모 환경을 지원하기 위해 RoboSuite를 확장해 바퀴 베이스 위의 로봇과 humanoid, 팔 달린 4족 로봇을 수용했다. 로봇 모델은 RoboSuite와 MuJoCo Menagerie를 포함한 여러 로봇 저장소에서 가져와 변환했다. 렌더링은 NVIDIA Omniverse를 쓰면 photorealistic 이미지를 얻을 수 있다.

시뮬레이터 속도는 PickPlaceCounterToCab 과제를 10 episode 실행해 측정했다. 매 episode를 무작위 장면에 생성하고 NVIDIA RTX A5000 GPU로 MuJoCo 네이티브 렌더링을 켠 조건이며 물리는 AMD EPYC 7543 32코어 CPU에서 계산했다. 장면 리셋에 평균 9.50초, `env.step` 호출은 평균 25.2 fps다. 렌더링을 끄면 리셋 9.46초에 31.9 fps가 나온다. 시뮬레이터의 한 timestep이 실세계 0.04초, 즉 25 fps에 대응하므로 렌더링을 켠 25.2 fps는 거의 실시간 속도에 해당한다.

### 장면과 asset

주방은 layout과 style의 조합으로 정의한다. layout은 floor plan을 정하고 style은 가구와 가전, 텍스처 선택을 정한다. 저자들은 건축과 인테리어 잡지를 참고해 10개 layout과 12개 style을 뽑고 표준 치수에 맞춰 모델링했다. floor plan 10종은 One wall, One wall w/ island, L-shaped, L-shaped w/ island, Galley, U-shaped, U-shaped w/ island, G-shaped, G-shaped (large), Wraparound다. 아파트에서 흔한 기본형부터 고급 주택의 복잡한 배치까지 포함한다.

style 12종에는 Industrial, Scandinavian, Coastal, Modern, Traditional, Mediterranean, Rustic 등이 들어간다. style마다 텍스처와 가전 선택, 수납장 패널과 손잡이 조합이 다르다. 예를 들어 Scandinavian은 밝고 대비가 낮은 텍스처에 단순하고 매끈한 수납장 패널을 쓰는 반면 Mediterranean은 장식적인 가전과 유리 패널 수납장, 색이 강한 텍스처를 쓴다. layout 10종과 style 12종의 조합으로 120개 장면이 나온다.

여기에 MidJourney로 만든 텍스처를 붙일 수 있게 해뒀다. 벽 100장, 바닥 100장, 조리대 100장, 수납장 패널 100장으로 총 400장이다. domain randomization은 시뮬레이션 파라미터를 흔들어 sim2real 간극을 줄이는 기법이다. 여기서는 텍스처 교체가 곧 domain randomization이며 학습 데이터셋의 시각적 다양성을 크게 늘리는 장치다.

물체 2,509개는 Objaverse 1.0에서 가져온 것과 Luma AI 같은 text-to-3D 도구로 생성한 것이 섞여 있다. 후보를 대량으로 수집한 뒤 결함이 있거나 품질이 낮은 것을 걸러내 153개 범주에 걸친 2,509개를 남겼고, 이 중 다수인 1,592개가 Luma AI 출처다. 범주는 과일과 채소, 유제품, 가금류, 음료, 그릇류, 도구 등 주방에서 흔한 물건을 포괄한다.

가전은 단순한 정적 모델이 아니라 관절이 붙어 있어서 전자레인지 문을 열고 닫거나 가스레인지 손잡이를 돌릴 수 있다. 온라인 3D 모델 저장소에서 받은 asset을 MuJoCo MJCF 형식으로 변환하면서 전자레인지 문이나 가스레인지 손잡이 같은 부분을 관절 객체로 분리하는 후처리를 거쳤다. 손잡이를 돌리면 해당 화구가 켜져 열을 시뮬레이션하는 식의 상태 변화까지 따라온다.

### 과제 생성

atomic task 25종은 여덟 가지 기본 skill에서 나온다. pick-and-place, 문 여닫기, 서랍 여닫기, 손잡이 비틀기, 레버 돌리기, 버튼 누르기, 삽입, 주방 내 이동이다. 저자들은 이 목록이 전부는 아니며 변형 가능한 물체를 다루는 skill 등은 향후 과제로 남긴다고 밝힌다.

각 과제는 여러 task variant를 가질 수 있다. task variant는 같은 과제를 언어로 구분되는 여러 목표로 나눈 것이다. pick-and-place는 다루는 물체 범주마다 variant가 있어 잡동사니 속에서 대상을 지목할 수 있고, 가스레인지 켜기와 끄기는 화구마다 variant가 있으며, 주방 내 이동은 목적지 가전마다 variant가 있다.

composite task는 두 단계 프롬프트로 만든다. 먼저 ChatGPT(GPT-4)에게 "간단한 일상 주방 활동 30가지를 알려달라, 각 활동은 서로 달라야 한다"고 물어 후보를 받고 그중 20개를 사람이 골랐다. 확정된 활동 20종은 커피나 차 내리기, 설거지, 주방 용품 채우기, 재료 썰기, 토스트 만들기, 해동, 물 끓이기, 육류 손질, 상 차리기, 상 치우기, 살균, 간식 준비, 수납장과 서랍 정리, 과일과 채소 씻기, 튀기기, 음식 데우기, 섞고 갈기, 굽기, 음식 담아내기, 채소 찌기다.

그다음 활동마다 GPT-4나 Gemini 1.5에게 로봇이 수행할 만한 과제 15가지를 제안받는다. 두 번째 프롬프트는 더 정교하다. 사용 가능한 로봇 skill과 관련 물체 범주, 고정물 목록을 나열하고, 잡을 수 없는 작은 물체나 변형 가능한 물체 지원이 제한적이라는 시뮬레이션 제약을 명시하며, 예시 과제 청사진을 few-shot으로 보여준다. 각 제안에는 과제 이름과 목표, 필요한 물체와 가전, 필요한 skill 순서가 들어 있다.

LLM 출력에 논리적 결함이 섞이는 경우가 있어 사람이 걸러내거나 고친 뒤 75개 청사진을 코드로 옮겼다. 논문이 부록에 든 결함 사례는 세 가지 유형이다.

- **존재하지 않는 물체 사용**: "Set Up Blending Station" 과제가 시뮬레이터에 없는 블렌더를 고정물로 요구했다.
- **skill의 부적절한 사용**: "Wine Selection for Cooking" 과제가 코르크 따개 동작을 흉내 낸다며 커피 머신 버튼 누르기 skill을 넣었다.
- **잡으면 안 되는 물체를 집기**: "Retrieve Baking Utensils" 과제가 숟가락과 국자 같은 조리 도구를 집으라고 지시했다.

일부 과제를 제외한 나머지는 어느 주방 장면에서도 실행할 수 있다. LLM을 쓴 근거는 LLM이 인간 중심 인터넷 콘텐츠로 학습돼 사람 행동의 생태적 통계를 어느 정도 담고 있다는 가정이다.

### 데이터 확장

사람 시연은 네 명의 조작자가 3D SpaceMouse로 atomic task마다 50개씩 모아 총 1,250개다. 시연마다 무작위 주방 장면에서 수집했으며 floor plan과 style, AI 생성 텍스처를 모두 무작위로 뽑았다. 그럼에도 이 규모만으로는 대부분의 과제가 풀리지 않았다. 과제와 장면의 범위와 다양성이 워낙 커서다.

그래서 MimicGen을 붙였다. MimicGen은 사람 시연 몇 개를 물체 중심 구간으로 쪼갠 뒤, 새 장면에서 해당 물체의 현재 pose에 맞춰 각 구간을 변환하고 이어 붙여 로봇이 그 새 trajectory를 따라가게 해 새 시연을 만들어내는 도구다. 성공한 시도만 남기는 rejection sampling을 쓰기 때문에 생성 결과의 품질이 어느 정도 보장된다. RoboCasa는 여러 시뮬레이션 프로세스에 걸쳐 생성을 병렬화해 속도를 높였다.

MimicGen이 요구하는 전제는 두 가지다. 과제가 알려진 물체 중심 하위 단계의 순서로 이뤄져야 하고 그 순서가 새 과제마다 지정돼야 한다. 사람 시연마다 그 단계 경계도 표시돼 있어야 한다. RoboCasa의 atomic task는 여덟 skill에서 파생되므로 같은 skill에 속한 과제들은 하위 단계 순서가 같거나 비슷하고 기준 물체의 정체만 다르다. 예를 들어 pick-and-place는 첫 단계가 기준 물체 하나에 대한 pick, 둘째 단계가 다른 물체에 대한 place다. 따라서 skill마다 한 번씩만 순서와 종료 판정 함수를 짜두면 전체 시연에 재사용된다. 사람 손이 거의 들지 않는다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

논문이 세운 연구 질문은 세 가지다. MimicGen이 만든 trajectory가 multi-task policy 학습에서 사람 시연에 비해 얼마나 효과적인가, 학습 데이터 규모를 늘리면 일반화 성능이 어떻게 변하는가, 대규모 시뮬레이션 데이터가 시뮬레이션 내 downstream 과제와 실세계 과제로 지식을 전이해 주는가다.

### 학습 설정

RoboMimic의 BC-Transformer로 multi-task policy를 학습한다. policy는 현재 observation을 받아 다음 action을 정하는 함수를 말한다. behavioral cloning은 시연의 observation에서 action으로 가는 쌍을 지도학습으로 흉내 내는 방법이다.

policy 구현 세부는 부록에 있다. 입력은 과거 observation 10개와 언어 목표이고 출력은 다음 10개 action이며, 첫 action을 실행한 뒤 다시 계획한다. 언어 목표는 CLIP sentence encoder로 인코딩해 언어 조건화를 지원하도록 policy를 고쳤다. observation마다 proprioception 정보(end-effector pose와 mobile base pose)와 카메라 3대의 이미지를 인코딩한다. 카메라는 eye-in-hand 하나와 좌우 workspace 카메라 둘이다. 각 이미지는 전용 ResNet-18 encoder stack으로 인코딩하고 FiLM layer로 시각 표현을 융합한다. 인코딩된 observation은 6층 Transformer로 들어가며 학습 가능한 파라미터는 약 20M이다. 학습은 gradient step 50만 회, learning rate 1e-4에 warmup을 적용했다.

로봇은 Omron 모바일 베이스 위의 Franka Panda로 고정했다. Omni-Frankie 로봇에 대응하는 구성이다. 학습 데이터셋 이미지는 무작위로 뽑은 AI 생성 텍스처로 렌더링했고, 데이터 용량과 시간 제약 때문에 경량 MuJoCo 렌더러를 썼다. 공개 시에는 Omniverse 렌더러로 다시 렌더링하는 선택지를 제공한다고 밝힌다.

### atomic task 학습

네 가지 데이터 설정을 비교했다. Generated 계열은 24개 atomic task만 대상으로 하는데, MimicGen이 아직 mobile manipulation trajectory를 생성하지 못해 주방 내 이동 과제를 제외했기 때문이다.

| 설정 | trajectory 수 | 전체 성공률 |
|---|---|---|
| Human-50 (과제당 사람 시연 50개) | 1,250 | 28.8% |
| Generated-100 (과제당 100개) | 2,400 | 26.3% |
| Generated-300 (과제당 300개) | 7,200 | 35.0% |
| Generated-3000 (과제당 3,000개) | 72,000 | 47.6% |

Generated-3000의 72,000개는 Objaverse 물체를 쓴 실험용 데이터다. 여기에 AI 생성 물체를 쓴 trajectory 28,000개를 추가로 공개해 전체 10만 개 데이터셋을 이룬다. Generated-300과 Generated-100은 전체 생성 데이터셋에서 각각 1/10과 1/30을 무작위로 뽑은 부분집합이다.

평가는 과제당 50회, floor plan과 style이 서로 다른 다섯 고정 장면에서 진행했다. 그중 둘은 학습에서 본 적 없는 style이고 물체는 전부 미학습 인스턴스다. 학습 이미지는 AI 생성 텍스처로 렌더링한 반면 평가 장면은 사람이 고른 텍스처를 쓴다.

합성 데이터를 30배로 늘리는 동안 성공률이 계속 올랐다. 이 논문의 핵심 결과다. 다만 최소 규모인 Generated-100(26.3%)은 사람 시연 Human-50(28.8%)보다 오히려 낮아, 합성 데이터가 사람 데이터를 넘어서려면 일정 규모 이상이 필요하다는 점도 함께 드러난다.

skill별로는 서랍과 문 여닫기가 쉽고 pick-and-place와 삽입이 어렵다. 저자들은 두 가지 요인을 든다. 첫째, 다양성이 높은 과제가 훨씬 어렵다. pick-and-place는 affordance가 제각각인 수십 개 물체 범주를 다루는 반면 문 여닫기는 문 인스턴스가 여섯 종뿐이다. 둘째, 삽입처럼 높은 정밀도를 요구하는 과제가 어렵다.

과제별 전체 결과는 부록 Figure 13에 있다. 성공률은 0에서 1 사이 비율로 표기돼 있다.

| 과제 | Human-50 | Generated-100 | Generated-300 | Generated-3000 |
|---|---|---|---|---|
| PickPlaceCabToCounter | 0.02 | 0.04 | 0.10 | 0.18 |
| PickPlaceCounterToCab | 0.06 | 0.08 | 0.16 | 0.28 |
| PickPlaceCounterToMicrowave | 0.02 | 0 | 0 | 0.18 |
| PickPlaceCounterToSink | 0.02 | 0.02 | 0.16 | 0.44 |
| PickPlaceCounterToStove | 0.02 | 0 | 0 | 0.06 |
| PickPlaceMicrowaveToCounter | 0.02 | 0 | 0.12 | 0.08 |
| PickPlaceSinkToCounter | 0.08 | 0.02 | 0.14 | 0.42 |
| PickPlaceStoveToCounter | 0.06 | 0 | 0.04 | 0.28 |
| OpenSingleDoor | 0.46 | 0.42 | 0.44 | 0.50 |
| OpenDoubleDoor | 0.28 | 0.12 | 0.22 | 0.48 |
| CloseDoubleDoor | 0.28 | 0.18 | 0.62 | 0.46 |
| CloseSingleDoor | 0.56 | 0.82 | 0.86 | 0.94 |
| OpenDrawer | 0.42 | 0.26 | 0.40 | 0.74 |
| CloseDrawer | 0.80 | 0.92 | 0.98 | 0.96 |
| TurnOnStove | 0.32 | 0.42 | 0.44 | 0.46 |
| TurnOffStove | 0.04 | 0.08 | 0.12 | 0.24 |
| TurnOnSinkFaucet | 0.38 | 0.26 | 0.48 | 0.34 |
| TurnOffSinkFaucet | 0.50 | 0.48 | 0.46 | 0.72 |
| TurnSinkSpout | 0.54 | 0.50 | 0.58 | 0.96 |
| CoffeePressButton | 0.48 | 0.48 | 0.42 | 0.74 |
| TurnOnMicrowave | 0.62 | 0.36 | 0.76 | 0.90 |
| TurnOffMicrowave | 0.70 | 0.70 | 0.62 | 0.60 |
| CoffeeServeMug | 0.22 | 0.12 | 0.24 | 0.34 |
| CoffeeSetupMug | 0 | 0.02 | 0.04 | 0.12 |
| 평균 | 0.288 | 0.263 | 0.350 | 0.476 |

### Diffusion Policy 비교

저자들은 Diffusion Policy도 함께 검토했다. 공정한 비교를 위해 RoboMimic 안에 구현했고 observation encoder는 BC-Transformer와 동일하게 ResNet과 FiLM 조건화를 썼다. 하이퍼파라미터는 원 구현의 권장값을 따라 observation history 2 timestep, prediction horizon 16 step, action horizon 8 step으로 두고 DDIM을 학습 100 timestep에 추론 10 timestep으로 설정했다.

결과는 BC-Transformer가 크게 앞섰다. 단일 단계 과제인 PickPlaceCounterToSink에서 BC-Transformer가 56%인 반면 Diffusion Policy는 12%에 그쳤다. 저자들이 든 설명은 observation history 길이 차이다. BC-Transformer는 10 timestep을 보는 반면 Diffusion Policy는 원 구현 기본값인 2 timestep만 본다. RoboCasa 과제에는 긴 observation history가 중요할 수 있다는 해석이다.

### composite task 학습

composite task는 여러 skill을 요구해 과제의 horizon이 길어지고 새로운 난점이 생긴다. 난이도와 multi-task 학습의 어려움을 고려해 과제당 단일 policy로 학습했다. 사람 시연 50개만으로 scratch 학습하는 경우와, atomic task 전체 MimicGen 생성 데이터로 pre-training한 뒤 그 50개로 fine-tuning하는 경우를 비교했다.

실험 대상 5종의 내용은 다음과 같다.

| 과제 | 소속 활동 | 내용 |
|---|---|---|
| ArrangeVegetables | 재료 썰기 | 싱크의 채소 두 개를 조리대의 도마 위로 옮긴다 |
| MicrowaveThawing | 해동 | 조리대의 냉동식품을 전자레인지에 넣고 전자레인지를 켠다 |
| RestockPantry | 주방 용품 채우기 | 조리대의 캔 여러 개를 수납장으로 옮기되, 수납장에 이미 있는 캔을 좌우 어느 쪽인지 찾아 그 옆에 놓는다 |
| PreSoakPan | 설거지 | 팬과 스펀지를 싱크에 넣고 수도꼭지를 틀어 팬을 불린다 |
| PrepareCoffee | 커피나 차 내리기 | 수납장에서 머그를 꺼내 커피 머신 아래 놓고 버튼을 눌러 커피를 받는다 |

| 과제 | Scratch | Fine-tuning |
|---|---|---|
| ArrangeVegetables | 2.0% | 12.0% |
| MicrowaveThawing | 0% | 2.0% |
| RestockPantry | 0% | 6.0% |
| PreSoakPan | 0% | 4.0% |
| PrepareCoffee | 0% | 0% |

scratch는 5개 중 4개에서 성공률 0이다. fine-tuning이 4개에서 0을 벗어나지만 최고가 12%다. 주된 실패 원인은 정밀 조작과 단계 전환이다. 다만 저자들은 fine-tuning 모델이 정성적으로 더 낫고 특히 집고 놓는 동작이 더 안정적이라고 관찰했으며 그 원인으로 atomic task 대규모 pre-training 데이터를 든다. 벤치마크로서는 개선 여지가 그만큼 크다. policy 구조와 학습 알고리즘, fine-tuning 전략의 선택이 성능을 좌우할 수 있어 후속 연구가 필요하다는 것이 저자들의 결론이다.

### 실제 기기 전이

DROID 하드웨어 위의 Franka Emika Panda로 실세계 주방에서 세 과제를 시험했다. 조리대에서 싱크로, 싱크에서 조리대로, 조리대에서 수납장으로 물체를 옮기는 과제로 RoboCasa의 단일 단계 과제에 대응한다. 각 과제에 실세계 시연 50개를 서로 다른 물체 범주 다섯 종에 걸쳐 모았다. 실세계 데이터만 쓴 경우와 모든 단일 단계 과제의 시뮬레이션 MimicGen 데이터를 함께 쓴 경우를 비교했다.

두 환경의 조건은 여러 곳에서 어긋난다. 양쪽 다 workspace end-effector 제어를 쓰지만 시뮬레이터 쪽은 Operational Space Control을 쓰고 DROID 기반 실제 로봇은 쓰지 않는다. 컨트롤러 주기도 시뮬레이터가 20Hz, 실제 로봇이 15Hz로 다르다. 카메라 캘리브레이션과 조명, 장면에 대한 로봇 베이스의 위치도 다르다.

결과는 seed 3개 평균이고 괄호 안은 표준편차다. seed마다 학습에서 본 물체 범주 다섯 종과 실세계 시연 기준 미학습 물체 범주 세 종에서 평가했다.

| 조건 | 과제 | 실세계만 | 실세계 + 시뮬레이션 |
|---|---|---|---|
| 학습에서 본 물체 | 조리대에서 싱크로 | 12.7 (±2.5) | 22.0 (±2.8) |
| 학습에서 본 물체 | 싱크에서 조리대로 | 20.0 (±5.9) | 29.3 (±4.1) |
| 학습에서 본 물체 | 조리대에서 수납장으로 | 8.0 (±1.6) | 22.0 (±5.8) |
| 학습에서 본 물체 | 평균 | 13.6 | 24.4 |
| 미학습 물체 | 조리대에서 싱크로 | 3.3 (±4.7) | 8.9 (±7.9) |
| 미학습 물체 | 싱크에서 조리대로 | 1.1 (±1.6) | 7.8 (±4.2) |
| 미학습 물체 | 조리대에서 수납장으로 | 3.3 (±4.7) | 11.1 (±11.0) |
| 미학습 물체 | 평균 | 2.6 | 9.3 |

본 물체 기준 13.6%에서 24.4%로 상대 79% 향상이다. 미학습 물체는 절대 수치가 낮지만 개선 폭은 오히려 더 크다. 저자들은 시뮬레이터의 풍부한 다양성과 시각적, 물리적 사실성을 이 이득의 근거로 든다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

저자들이 먼저 꼽는 한계는 composite task fine-tuning 성능이다. 더 강한 policy 구조와 학습 알고리즘, 그리고 합성 데이터 품질 개선이 필요하다고 본다. MimicGen이 만든 trajectory는 성공 판정을 통과했더라도 급격한 움직임이나 충돌을 포함하는 경우가 많은데, 시뮬레이션 상태와 trajectory를 검사해 그런 동작을 자동으로 걸러낼 수 있다고 제안한다.

LLM으로 과제를 만들었다지만 구현 코드는 사람이 짰다. 앞으로는 LLM이 수천 개의 새 장면과 과제를 제안하고 그것을 구현하는 코드까지 사람 개입을 최소화한 채 쓰게 하려 한다. LLM 성능이 좋아지면 가능해질 것으로 본다. 주방 밖 환경과 과제로 범위를 넓히는 일도 남은 과제다.

데이터셋의 성격에도 제약이 있다. 지금 데이터는 중요한 거친 조작 행동을 담고 있지만 고난도 dexterity가 필요한 skill이나 변형 가능한 물체 조작, 양팔 조작 과제는 포함하지 않는다. atomic task를 이루는 여덟 skill 목록 자체도 전부가 아니어서 변형 가능한 물체 조작 같은 skill은 향후 확장 대상이다.

MimicGen 자체의 제약도 남아 있다. mobile manipulation trajectory를 생성하지 못해 주방 내 이동 과제가 대규모 생성 데이터에서 빠졌다.

마지막으로 저자들은 자체 시뮬레이션과 다른 시뮬레이터, 인터넷 영상, 실제 로봇 데이터를 함께 쓰는 학습을 다음 방향으로 제시한다. 여러 형태의 데이터가 서로를 보완해 로봇 foundation model을 만드는 미래를 그린다.

## 6. 관련 연구 (Related Work)

시뮬레이션 프레임워크 쪽에서는 AI2-THOR, Habitat 2.0, iGibson 2.0, Behavior-1K가 방 규모 장면과 mobile manipulation을 다루고 RLBench, robomimic, ManiSkill 2, OPTIMUS, LIBERO, MimicGen은 탁상 위주다. AI2-THOR와 Habitat 2.0은 물체 grasping과 배치를 포함한 모든 상호작용에 사실적 물리를 적용하지 않는 반면 RoboCasa는 적용한다. 방 규모 장면과 mobile manipulation을 함께 지원하는 프레임워크도 소수이고, RoboCasa는 그 가운데 유일하게 AI 생성 과제와 AI 생성 asset을 둘 다 갖는다. 생성형 AI를 도입한 최근 연구로 AI 생성 과제를 다룬 GenSim과 장면 구성을 다룬 RoboGen이 있다.

Table I이 비교하는 항목은 mobile manipulation, 방 규모 장면, 사실적 물체 물리, AI 생성 과제, AI 생성 asset, photorealism, cross-embodiment 지원 여부와 과제 수, 장면 수, 물체 범주 수, 물체 수, 사람 데이터와 기계 생성 데이터 유무, trajectory 수다. RoboCasa는 과제 100종, 장면 120개, 물체 범주 153개, 물체 2,509개, trajectory 10만 개 이상을 기록한다. 과제 수만 보면 Behavior-1K가 1,000종, LIBERO가 130종으로 더 많지만 Behavior-1K는 trajectory가 0이고 LIBERO는 5,000개다.

데이터셋 쪽은 세 흐름으로 갈린다. 첫째는 시행착오로 데이터를 모으는 self-supervised learning 계열인데 품질 있는 데이터를 얻는 데 시간이 오래 걸린다. 둘째는 사람이 로봇을 조종해 시연을 모으는 teleoperation 계열이다. teleoperation은 사람이 로봇을 원격으로 움직여 시연 데이터(demonstration)를 만드는 방식이다. Open X-Embodiment, BridgeData, DROID처럼 여러 조작자가 장기간 투입되는 대규모 시도가 나왔지만 대부분 실세계 수집에 무게를 둔다. 셋째는 시뮬레이션 안에서 알고리즘으로 trajectory를 만드는 계열인데, 시뮬레이터의 특권 정보와 수작업 휴리스틱에 기대는 경우가 많아 임의의 과제로 옮기기 어렵다. LLM으로 시뮬레이션 데이터를 만드는 최근 시도도 정교한 파이프라인 설계를 요구한다. RoboCasa는 사람 teleoperation의 품질과 시뮬레이션 생성의 규모를 합치려 시뮬레이션 안에서 사람 시연을 모은 뒤 MimicGen을 적용하는 경로를 골랐다. 시뮬레이션 수집은 재현이 쉽고 사람 부담이 작아 철저한 평가가 가능하다는 점도 이유로 든다.

학습 알고리즘으로는 behavioral cloning 계열의 BC-Transformer를 쓰고 Diffusion Policy도 함께 검토한다. offline reinforcement learning은 reward function으로 데이터셋 안의 특정 action을 선호하게 만드는 대안 계열로 소개하되 이 논문에서 채택하지는 않는다.

## 7. 용어집 (Glossary)

이 자료 고유 용어만 정리한다. policy, observation, trajectory, teleoperation, domain randomization 등 도메인 공통 용어는 [[overviews/glossary-physical-ai]]와 [[overviews/glossary-llms]]에 위임한다.

- **RoboCasa**: RoboSuite(MuJoCo) 위에 주방 장면 120개와 물체 2,509개, 과제 100종을 결합한 시뮬레이션 프레임워크.
- **atomic task**: skill 하나로 끝나는 짧은 과제. RoboCasa에는 25종이 있다.
- **composite task**: 여러 skill을 순서대로 엮어야 하는 긴 과제. LLM이 제안한 청사진을 사람이 코드로 옮겨 75종을 만들었다.
- **task variant**: 같은 과제를 언어로 구분되는 여러 목표로 나눈 변형. pick-and-place는 물체 범주마다, 가스레인지 조작은 화구마다 variant를 둔다.
- **activity prompting / task prompting**: composite task 생성의 두 단계 프롬프트. 앞 단계에서 주방 활동 목록을 받고 뒤 단계에서 활동마다 과제 청사진을 받는다.
- **MimicGen**: 사람 시연을 물체 중심 구간으로 쪼개 새 장면에 맞춰 변환하고 재조합하는 자동 trajectory 생성 도구 (Mandlekar 2023). RoboCasa 데이터 확장의 핵심.
- **layout / style**: 주방 장면을 정의하는 두 항목. layout은 floor plan, style은 가구와 가전, 텍스처 선택을 정한다.
- **RoboSuite**: RoboCasa의 토대가 된 MuJoCo 기반 모듈형 로봇 시뮬레이션 프레임워크.
- **BC-Transformer**: RoboMimic이 공개한 Transformer 기반 visuomotor policy 구현. 이 논문의 학습 baseline이며 약 20M 파라미터의 6층 Transformer다.
- **Omni-Frankie**: Omron 모바일 베이스 위에 Franka Panda 팔을 얹은 로봇 구성. 이 논문 실험의 기본 embodiment다.

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 1 | RoboCasa 개요, 주방 장면 12종과 여러 embodiment | caption-region | ★ wiki 권장 (concept) |
| fig03 | 4 | 주방 floor plan 10종 | caption-region | ★ wiki 권장 (method) |
| fig04 | 4 | 상호작용 가능한 가전 예시 | caption-region | ★ wiki 권장 (method) |
| fig05 | 5 | 3D 물체 라이브러리 | caption-region | ★ wiki 권장 (method) |
| fig06 | 6 | LLM 과제 생성 2단계 프롬프트 | caption-region | ★ wiki 권장 (method) |
| fig07 | 7 | 사람 시연과 MimicGen 합성 데이터 성공률 비교 | caption-region | ★ wiki 권장 (result) |
| fig08 | 7 | composite task 5종 결과 | caption-region | ★ wiki 권장 (result) |
| fig09 | 8 | 실제 기기 실험 환경 | caption-region | (선택) |
| fig10 | 8 | 실제 기기 평가, 실세계 단독과 실세계에 시뮬레이션을 더한 경우 | caption-region | ★ wiki 권장 (result) |
| fig11 | 14 | atomic task 25종 목록 (부록) | caption-region | (선택, 본문 표로 대체) |
| fig12 | 15 | 주방 활동 20종의 대표 composite task (부록) | caption-region | (선택, 본문 표로 대체) |
| fig13 | 16 | atomic task 과제별 성공률 전체표 (부록) | caption-region | (선택, 본문 표로 대체) |
| tab01 | 3 | 시뮬레이션 프레임워크 11종 비교 | table-region | ★ wiki 권장 (result) |
