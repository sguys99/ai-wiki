---
title: "Introducing Odyssey-3: A General-Purpose Physical Intelligence"
type: article
year: 2026
category: physical-ai
raw_path: raw/articles/odyssey-2026-introducing-odyssey-3-a-general.md
raw_filename: "odyssey-2026-introducing-odyssey-3-a-general.md"
source_collection: external
author: "Oliver Cameron, Jeff Hawke"
url: "https://odyssey.systems/introducing-odyssey-3"
publisher: "Odyssey"
tags: [physical-ai, world-model, robot-learning, autonomous-driving]
figures:
  - id: fig01
    file: assets/odyssey-2026-introducing-odyssey-3-a-general/fig01.jpg
    raw: raw/articles/odyssey-2026-introducing-odyssey-3-a-general-figures/fig01.jpg
    caption: "공동 저자 Oliver Cameron의 프로필 사진"
    strategy: fetched
    curated: false
  - id: fig02
    file: assets/odyssey-2026-introducing-odyssey-3-a-general/fig02.jpg
    raw: raw/articles/odyssey-2026-introducing-odyssey-3-a-general-figures/fig02.jpg
    caption: "공동 저자 Jeff Hawke의 프로필 사진"
    strategy: fetched
    curated: false
  - id: fig03
    file: assets/odyssey-2026-introducing-odyssey-3-a-general/fig03.jpg
    raw: raw/articles/odyssey-2026-introducing-odyssey-3-a-general-figures/fig03.jpg
    caption: "world model policy 구조. observation이 world model Odyssey-3를 거쳐 internal representation이 되고, action decoder가 이를 humanoid, 로봇 팔, 자율주행차, 드론, 게임 캐릭터가 받는 action으로 바꾼다"
    strategy: fetched
    curated: true
  - id: fig04
    file: assets/odyssey-2026-introducing-odyssey-3-a-general/fig04.png
    raw: raw/articles/odyssey-2026-introducing-odyssey-3-a-general-figures/fig04.png
    caption: "글 하단 모델 카드의 배경 이미지: 이끼 덮인 가지 위의 카멜레온"
    strategy: fetched
    curated: false
  - id: fig05
    file: assets/odyssey-2026-introducing-odyssey-3-a-general/fig05.png
    raw: raw/articles/odyssey-2026-introducing-odyssey-3-a-general-figures/fig05.png
    caption: "글 하단 모델 카드의 배경 이미지: 우주 공간에 놓인 지구와 인물 실루엣"
    strategy: fetched
    curated: false
  - id: fig06
    file: assets/odyssey-2026-introducing-odyssey-3-a-general/fig06.png
    raw: raw/articles/odyssey-2026-introducing-odyssey-3-a-general-figures/fig06.png
    caption: "글 하단 모델 카드의 배경 이미지: 붉은 조명 아래 권총을 겨눈 인물 두 명"
    strategy: fetched
    curated: false
  - id: fig07
    file: assets/odyssey-2026-introducing-odyssey-3-a-general/fig07.png
    raw: raw/articles/odyssey-2026-introducing-odyssey-3-a-general-figures/fig07.png
    caption: "글 하단 모델 카드의 배경 이미지: 격자 바닥을 걸어 숲으로 향하는 인물"
    strategy: fetched
    curated: false
  - id: fig08
    file: assets/odyssey-2026-introducing-odyssey-3-a-general/page-full.png
    raw: raw/articles/odyssey-2026-introducing-odyssey-3-a-general-figures/page-full.png
    caption: "원문 페이지 전체 스크린샷"
    strategy: screenshot
    curated: false
---

## 한 줄 요약 (One-line Summary)

Odyssey가 2026년 9월 15일 공개한 foundation world model Odyssey-3는 하나의 pre-training된 모델이 로봇 팔, humanoid, 자율주행차, 드론, 비디오 게임을 모두 제어할 수 있음을 보인 사례로, 각 시스템마다 수십 시간 수준의 데이터만으로 action decoder를 붙여 동작시킨다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 제목 | Introducing Odyssey-3: A General-Purpose Physical Intelligence |
| 저자 | Oliver Cameron, Jeff Hawke (Odyssey 공동 창업자) |
| 발행 | 2026년 9월 15일 |
| 매체 | Odyssey 공식 블로그 |
| 유형 | 모델 공개 발표문 |

Odyssey는 2023년 설립된 회사로, world model이 general-purpose physical intelligence로 가는 기술적 경로가 될 수 있다는 믿음을 출발점으로 삼았다. 두 저자는 2010년대부터 자율주행과 로봇공학을 해 왔고, 당시 이 분야의 장기 목표 중 하나가 여러 기계와 과제를 두루 다룰 만큼 세계를 이해하는 시스템이었다고 회고한다. 실제로는 분야가 좁은 도메인마다 전용 시스템을 만들고 과제별 데이터를 대량으로 요구하는 방향으로 발전했다는 것이 이 글의 문제의식이다.

이 글은 기술 보고서가 아니라 제품 발표문이다. 정량 지표는 자율주행 항목의 수치 하나뿐이고, 아키텍처 세부와 학습 데이터 규모는 공개하지 않는다. 공개 배포는 발표 시점 기준 "몇 주 안"으로 예고돼 있다.

## 2. 주요 기여 (Key Contributions)

1. **단일 foundation world model의 교차 embodiment 제어 시연.** 같은 pre-training 가중치로 로봇 팔, humanoid, 자동차, 드론, 비디오 게임 캐릭터를 제어한다. embodiment는 로봇의 물리적 형상과 그에 딸린 제어 인터페이스 구성을 뜻한다.
2. **action decoder라는 얇은 접합부 제안.** world model은 그대로 두고, 그 internal representation을 각 시스템이 요구하는 action으로 옮기는 출력 모듈만 과제별로 학습시킨다.
3. **physical agent 개념 제시.** 언어가 아니라 세계의 동역학을 매개로 물리 시스템 및 가상 시스템과 직접 맞물리는 에이전트를 새로운 범주로 규정한다.
4. **데이터 효율 주장.** 각 시스템마다 수십 시간, 자율주행의 경우 20시간의 경험 데이터만으로 동작하는 policy를 얻었다고 보고한다.
5. **world model과 에이전트의 재귀적 학습 루프 제시.** world model이 만든 환경에서 에이전트가 학습하고, 에이전트가 찾아낸 실패가 다시 world model을 개선한다.
6. **외부 협업 공개.** 로봇 데이터 및 벤치마크 회사 Poke & Wiggle과의 평가 협업, humanoid 회사 Flexion과의 공동 연구를 함께 발표했다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 모델 기반

Odyssey-3는 autoregressive diffusion transformer다. 다양한 시나리오를 시뮬레이션하도록 학습됐고, 학습 데이터는 세계에 대한 방대한 시각 observation 모음이다. 이 pre-training을 통해 물리, 동역학, 인과관계, 인간 행위 양상 같은 개념을 학습했다는 것이 저자들의 설명이다.

여기서 얻은 world knowledge를 물리 과제와 가상 과제 풀이에 끌어다 쓰기 때문에, 과제당 필요한 경험 데이터가 기존 시스템보다 훨씬 적다고 주장한다.

### 3.2 world model policy 구조

제어 파이프라인은 두 부분으로 나뉜다.

| 구성 요소 | 역할 | 학습 여부 |
|---|---|---|
| world model (Odyssey-3) | observation을 받아 internal representation을 만든다 | pre-training 후 고정 |
| action decoder | internal representation을 대상 시스템의 action 형식으로 옮긴다 | 과제별 경험 데이터로 학습 |

이 둘을 묶은 것을 원문은 world model policy라 부르고, 그 아래에 humanoid, 로봇 팔, 자율주행차, 드론, 게임이라는 embodied system이 놓인다. 제어는 closed-loop이다. embodied system이 만든 observation이 다시 world model 입력으로 돌아온다.

action decoder 학습에 쓰이는 데이터를 원문은 experiential data라 부른다. experiential data는 물리 시스템의 observation과 그때 취한 action을 짝지은 기록으로, 해당 시스템의 제어 입력이 어떻게 쓰이는지를 보여주는 예시 역할을 한다.

### 3.3 도메인별 학습 레시피

다섯 도메인의 레시피는 공통 골격을 공유하되 세부가 다르다.

| 도메인 | 학습 데이터 | 데이터 규모 | world model 처리 |
|---|---|---|---|
| 로봇 팔 | 로봇 시연 데이터(demonstration) | 수십 시간 | 명시 없음 |
| humanoid | humanoid teleoperation 기록 | 수십 시간 | base model로 사용 |
| 자율주행 | 시뮬레이터 주행 기록 | 20시간 | 가중치 고정 |
| 드론 | 시뮬레이터 비행 시연 데이터 | 수십 시간 | pre-training 표현 활용 |
| 비디오 게임 | 키보드와 마우스 입력이 붙은 플레이 녹화 | GTA V 기준 약 2시간 이상 | 가중치 고정 |

시연 데이터는 사람이 만들어준 모범 실행 기록을 말한다. teleoperation은 사람이 로봇을 원격으로 움직여 그 기록을 남기는 방식이다.

자율주행에서는 pre-training된 world model을 학습 내내 고정한 채 시각 표현만 뽑아 쓰고, 그 표현을 비교적 작은 driving policy에 넣어 차량 앞쪽 waypoint를 예측하게 한다. waypoint는 이동 경로 위에 찍는 목표 지점을 말한다.

드론은 자율주행과 같은 레시피를 따른다. 최근 카메라 observation, 드론의 운동 상태, 높은 수준의 내비게이션 프롬프트를 입력으로 받아 비행 waypoint를 만드는 policy를 학습시켰고, 시뮬레이터 비행 시연 데이터가 action expert에게 표현을 움직임으로 옮기는 법을 가르친다. action expert는 표현을 실제 제어 출력으로 변환하는 전담 모듈을 말한다.

비디오 게임에서는 policy가 최근 게임 프레임을 보고 조작 입력을 만든 뒤, 그 결과로 돌아온 화면을 보고 다음 조작을 고른다. 물리 시스템 제어와 같은 방식이 가상 세계 조작에 그대로 적용된 형태다.

### 3.4 AI 학습 환경 생성

Odyssey-3는 제어 대상이 되기만 하는 것이 아니라, 에이전트가 들어가 행동하고 그 결과로부터 배우는 환경 자체를 생성한다. 원문은 이를 "다른 지능 안에서 작동하는 지능"이라고 표현하며 재귀적 학습 시스템으로 규정한다.

Odyssey의 PROWL 연구가 이 방향을 직접 다룬다. 에이전트가 찾아낸 실패가 world model 개선의 단서가 되고, 반대로 신뢰할 만한 시뮬레이션 경험이 에이전트 학습 자료가 된다. world model이 좋아지면 더 복잡한 경험을 감당할 수 있고, 에이전트가 좋아지면 이전에는 닿지 못하던 약점을 찾아낸다.

저자들은 이 환경이 안전 연구 무대로도 쓰인다고 덧붙인다. 언어 모델을 비롯한 지능이 더 큰 책임을 맡게 될수록, 물리 세계에서 피해가 발생하기 전에 위험 행위를 발견하고 그 결과를 조사할 장소가 필요하다는 것이다. 이 절의 하위 시연은 "언어 모델이 목표를 달성하려 작업하는" 사례와 "에이전트가 시뮬레이션 세계를 탐색하는" 사례 두 묶음으로 제시된다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

이 글은 표준 벤치마크 수치를 제시하지 않는다. 결과는 대부분 정성 시연 영상과 서술로 보고되며, 유일한 정량 비교는 자율주행 항목에 있다.

### 4.1 로봇 팔

수십 시간의 로봇 시연 데이터만으로 여러 종류의 로봇 팔을 제어하고 복잡한 과제를 완수했다. 시연된 과제는 시리얼을 그릇에 붓기, 사탕 봉지를 상자에 담기, 물티슈를 상자에 넣기, 나사 상자 닫기, 물건을 상자에 담고 닫기, 에스프레소 잔에 커피 붓기, 물티슈로 접시 닦기 등이다.

주목할 관찰은 학습 시연 데이터에 없던 복구 행위가 나타났다는 점이다. grasping은 물체를 집어 쥐는 동작을 말하는데, grasping에 실패한 뒤 그리퍼 방향을 다시 잡거나 예상 밖의 위치나 자세로 떨어진 물체를 다시 집는 동작이 확인됐다. 저자들은 이를 pre-training으로 얻은 물리 이해가 시연 범위를 벗어난 상황에 대응하도록 돕는 신호로 해석한다. 모든 실패와 복구를 일일이 시연으로 모으는 일이 금세 비현실적이 되기 때문에, 이런 성질은 데이터 효율 측면에서 의미가 있다.

다만 저자들 스스로 이 능력이 로봇과 환경을 바꿔도 일관되게 유지되는지가 중요한 미해결 질문이라고 적는다. 그래서 로봇 데이터, policy 분석, 대규모 벤치마크에 강한 Poke & Wiggle과 협업해 서로 다른 신체, 시점, 제어 방식에서 지식이 어디까지 전이되고 어디서 무너지는지 평가하고 있다고 밝힌다.

### 4.2 humanoid

humanoid 항목은 Flexion과의 공동 연구 결과다. Flexion은 강화학습과 whole-body control에 강점을 가진 범용 로봇 지능 회사로, 사람이 이미 쓰고 있는 건물과 도구와 환경 안에서 로봇이 쓸모 있는 일을 하게 만드는 문제를 추구한다.

Odyssey-3를 base model로 두고 Flexion이 상당한 연구와 엔지니어링을 더해 humanoid 제어 policy를 만들었다. 수십 시간의 humanoid teleoperation 데이터만으로 실시간 과제 수행이 가능했다.

평가에서 이 policy는 시험한 VLA baseline보다 환경 변화에 더 잘 일반화했다. 구체적으로, baseline policy가 실패하는 조명 변화 조건에서도 과제 실행을 이어 갔다. 시연 과제는 파란 용기를 열고 종이 상자를 꺼내기, 접시를 탁자 가운데로 옮기고 그 위에 머그컵 올리기, 상자를 나무 모서리에 맞춰 놓기, 종이 상자 열기다.

Flexion 공동 창업자이자 CEO인 Nikita Rudin은 로봇 자신의 시연 범위를 훨씬 넘어서는 물리 지식 위에 쌓아 올릴 기회가 흥미롭다고 논평했다.

### 4.3 자율주행

시뮬레이터 주행 데이터 20시간만으로 인도의 도로에서 closed-loop 자율주행을 수행했고, 주행 trajectory를 실시간으로 생성했다.

정량 비교는 전량 시뮬레이터에서 학습한 policy와 실제 주행 영상으로 학습한 policy를 방해 요소가 잦은 번잡한 도로에서 평가한 것이다. 두 policy 모두 차선을 유지하며 굽은 길을 통과했고, 양쪽에서 추월하는 차량에 대응했으며, 혼잡한 교차로에서 회전했다.

| 학습 데이터 | safety driver 개입 사이 주행 거리 |
|---|---|
| 실제 주행 영상 | 기준값 |
| 전량 시뮬레이터 | 기준값의 약 77% |

safety driver는 자율주행 평가 중 위험할 때 직접 조작을 넘겨받는 동승 운전자를 말한다. 즉 시뮬레이터만으로 학습한 policy가 실제 도로에서 실제 영상 학습본의 약 77% 거리를 개입 없이 주행했다. 시연 지시는 "첫 번째 회전교차로 출구로 나가라", "도로를 따라 주행하라", "왼쪽으로 180도 회전하라" 같은 형태다.

### 4.4 드론

시뮬레이터 드론 데이터 수십 시간으로 학습한 policy가 시뮬레이터 실내 환경에서 장애물을 피하며 안정적으로 비행했다.

별도로 policy 학습 이전에 backbone이 이미 무엇을 이해하고 있었는지 확인하려고, 가중치를 고정한 채 공중 내비게이션 과제에 대한 예측을 시각화했다. 이 정성 rollout에서 방향성 있는 비행과 장애물 주변 움직임이 관찰됐고, 장면의 의미 내용과 일관된 반응도 함께 나타났다. 저자들은 이를 pre-training이 공간 구조와 운동에 대한 유용한 지식을 제공한다는 근거로 든다. 시연 지시는 "이륙해 탁자 뒤로 이동한 뒤 정지 비행하라", "이륙해 탁자 아래를 지나 책장 뒤에 착륙하라" 같은 형태다.

### 4.5 비디오 게임

Rockstar Games의 GTA V에서 장시간 플레이 세션을 만들어냈고, 주행과 사격과 근접 격투 사례를 함께 제시한다.

더 주목할 결과는 게임 간 전이의 초기 증거다. GTA로 학습한 policy가 추가 학습 없이 Rockstar Games의 Red Dead Redemption 2에서 이동 동작을, Square Enix의 Sleeping Dogs에서 오토바이 주행을 만들어냈다. 한 실험에서는 약 2시간의 GTA 영상으로 학습한 이동 policy가 Red Dead Redemption 2에서 말을 타고 이동하는 동작을 만들어냈다. 학습 때와 다른 캐릭터, 다른 탈것, 다른 환경에 같은 제어가 적용된 사례다.

저자들은 로봇, humanoid, 자율주행, AI 학습, 드론 결과와 함께 놓고 볼 때 Odyssey-3가 generalist embodied agent의 토대로 쓸 만하다는 신호라고 정리한다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **자기 발표라는 성격.** 모든 결과가 Odyssey 자신의 발표 안에서 제시되며, 외부 검증이나 표준 벤치마크 대조가 없다. VLA baseline과의 humanoid 비교도 어떤 모델을 썼는지 밝히지 않는다.
- **정량 지표 부족.** 공개된 수치는 자율주행의 77%가 사실상 전부다. 성공률, 시도 횟수, 과제별 난이도 분포는 제시되지 않는다.
- **일반화 범위 미확인.** 로봇 팔 항목에서 저자들이 직접 인정하듯, 서로 다른 신체와 시점과 제어 방식에서 지식이 어디까지 전이되는지는 Poke & Wiggle과의 평가로 이제 확인하는 단계다.
- **아키텍처 세부 비공개.** autoregressive diffusion transformer라는 분류 외에 파라미터 규모, 학습 데이터 규모, action decoder 구조는 공개되지 않았다.
- **시뮬레이터 결과와 실제 환경의 간격.** 드론 결과는 전부 시뮬레이터 실내 환경이고, 자율주행도 학습이 전량 시뮬레이터다.
- **world model 자체의 규모 부족.** 저자들은 frontier world model이 언어 모델보다 약 100배 작은 규모에 머물러 있어 잠재력에 못 미쳐 왔다고 진단한다. 규모 확대가 남은 과제라는 뜻이다.
- **공개 시점.** 발표 시점 기준 몇 주 안에 공개 배포하겠다고 예고했을 뿐, 이 글에서 모델을 직접 쓸 수는 없다.

향후 방향으로는 위험한 작업과 일상 돌봄의 자동화, 과학과 공학 실험 가속, 사람이 경험한 적 없는 환경에서의 작동을 제시한다. 또한 world model과 에이전트가 서로를 밀어 올리는 구조가 사람이 손으로 만든 환경의 한계를 넘어설 수단이라고 본다.

## 6. 관련 연구 (Related Work)

이 글은 학술 인용을 거의 하지 않는다. 대신 Odyssey 자체 제품군과 협업 상대를 언급한다.

| 대상 | 성격 | 이 글과의 관계 |
|---|---|---|
| PROWL-1 | 강화학습 기반 적대적 프레임워크 | 에이전트가 게임 환경을 탐색해 world model 성능을 끌어올리는 연구. arXiv 2605.18803 |
| Starchild-1 | world model | 시각 observation만으로 배우는 단계를 넘어 더 풍부한 멀티모달 상호작용에서 배우는 방향 |
| Agora-1 | 멀티에이전트 world model | 사람이든 AI든 여러 참여자가 같은 세계 시뮬레이션을 실시간으로 공유하며 상호작용 |
| Poke & Wiggle | 로봇 데이터, policy 분석, 대규모 벤치마크 | Odyssey-3의 교차 embodiment 평가 협업 |
| Flexion | 범용 로봇 지능, 강화학습, whole-body control | Odyssey-3를 base model로 humanoid 제어 policy 개발 |

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| Odyssey-3 | Odyssey의 foundation world model. autoregressive diffusion transformer 구조이며 여러 물리 시스템과 가상 시스템의 제어 기반으로 쓰인다 |
| physical agent | 언어가 아니라 세계의 동역학을 매개로 물리 시스템 및 가상 시스템과 직접 맞물리는 에이전트. 이 글이 제시하는 새 범주다 |
| action decoder | world model에 붙는 학습형 출력 모듈. world model의 internal representation을 대상 시스템이 요구하는 action으로 옮긴다 |
| experiential data | 물리 시스템의 observation과 그때 취한 action을 짝지은 기록. action decoder 학습 입력이다 |
| world model policy | world model과 action decoder를 묶어 embodied system을 제어하는 단위 |
| embodied system | world model policy가 제어하는 대상. 이 글에서는 humanoid, 로봇 팔, 자율주행차, 드론, 게임 캐릭터를 가리킨다 |
| safety driver | 자율주행 평가 중 위험 상황에서 조작을 넘겨받는 동승 운전자 |

## 8. 그림 후보 (Figure Candidates)

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | 공동 저자 Oliver Cameron의 프로필 사진 | fetched | (제외) |
| fig02 | 공동 저자 Jeff Hawke의 프로필 사진 | fetched | (제외) |
| fig03 | world model policy 구조도 | fetched | 별표 wiki 권장 (architecture) |
| fig04 | 모델 카드 배경 이미지 (카멜레온) | fetched | (제외) |
| fig05 | 모델 카드 배경 이미지 (지구와 인물 실루엣) | fetched | (제외) |
| fig06 | 모델 카드 배경 이미지 (권총을 겨눈 인물 두 명) | fetched | (제외) |
| fig07 | 모델 카드 배경 이미지 (격자 바닥과 숲) | fetched | (제외) |
| fig08 | 원문 페이지 전체 스크린샷 | screenshot | (제외) |

실질적인 도식은 fig03 하나다. fig01과 fig02는 저자 프로필 사진, fig04부터 fig07까지는 글 하단 모델 카드의 장식 이미지, fig08은 아카이브용 전체 스크린샷이다.
