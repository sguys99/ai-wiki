---
title: "Introducing Odyssey-3: A General-Purpose Physical Intelligence"
type: article
year: 2026
category: physical-ai
source: odyssey-2026-introducing-odyssey-3-a-general.md
raw_path: raw/articles/odyssey-2026-introducing-odyssey-3-a-general.md
raw_filename: "odyssey-2026-introducing-odyssey-3-a-general.md"
source_collection: external
author: "Oliver Cameron, Jeff Hawke"
url: "https://odyssey.systems/introducing-odyssey-3"
publisher: "Odyssey"
tags: [physical-ai, world-model, robot-learning, autonomous-driving]
figures:
  - id: fig03
    file: assets/odyssey-2026-introducing-odyssey-3-a-general/fig03.jpg
    raw: raw/articles/odyssey-2026-introducing-odyssey-3-a-general-figures/fig03.jpg
    caption: "world model policy 구조. observation이 world model Odyssey-3를 거쳐 internal representation이 되고, action decoder가 이를 humanoid, 로봇 팔, 자율주행차, 드론, 게임 캐릭터가 받는 action으로 바꾼다"
    strategy: fetched
    curated: true
---

## 요약

Odyssey는 2026년 9월 15일 foundation world model Odyssey-3를 공개했다. world model은 세계가 어떻게 변해 가는지를 학습한 예측 모델을 말한다. 이 발표문의 주장은 하나로 요약된다. 같은 pre-training 가중치 하나로 로봇 팔, humanoid, 자율주행차, 드론, 비디오 게임 캐릭터를 모두 제어할 수 있고, 각 시스템에 필요한 추가 데이터는 수십 시간 수준이라는 것이다.

기술적 장치는 단순하다. world model 본체는 건드리지 않고, 그 내부 표현을 각 시스템이 요구하는 제어 신호로 옮기는 작은 출력 모듈만 과제별로 학습시킨다. 저자들은 이렇게 동작하는 시스템을 physical agent라는 새 범주로 부른다. 언어를 매개로 도구를 호출하는 에이전트와 달리, 세계의 동역학을 매개로 물리 시스템 및 가상 시스템과 직접 맞물린다는 뜻이다.

이 글은 기술 보고서가 아니라 제품 발표문이라는 점을 먼저 짚어 둘 필요가 있다. 정량 지표는 자율주행 항목의 수치 하나뿐이고, 파라미터 규모와 학습 데이터 규모는 공개되지 않았다. 나머지는 모두 정성 시연 영상과 서술이다.

## 배경

### 전용 시스템으로 갈라져 온 분야

저자 Oliver Cameron과 Jeff Hawke는 2010년대부터 자율주행과 로봇공학을 해 왔다. 두 사람이 회고하는 당시 분야의 장기 목표 중 하나는 general-purpose physical intelligence, 즉 여러 기계와 여러 과제를 두루 다룰 만큼 세계를 이해하는 단일 시스템이었다.

실제 발전 경로는 그 반대였다. 분야는 좁은 도메인마다 전용 시스템을 만드는 쪽으로 갔고, 각 시스템은 과제별 데이터를 대량으로 요구했다. 두 사람은 2023년 Odyssey를 세우면서 world model이 이 분기를 되돌릴 기술적 경로가 될 수 있다고 봤다. 세계가 어떻게 움직이는지에 대한 일반적이고 인과적인 모델을 학습해 두면, 그 하나의 토대를 여러 물리 시스템과 가상 시스템이 공유하면서 새 과제에는 비교적 적은 경험만 더하면 된다는 가설이다.

### 반복 시연으로 메우는 현재 방식

발표문 후반부는 오늘날 로봇 시스템의 학습 방식을 직접 비판한다. 특정 과제의 시연을 반복해서 모으고 그 좁은 경험을 대량으로 쌓아 하나의 과제를 해내게 만드는 방식이라는 것이다. 저자들은 이를 문제를 정면으로 밀어붙이는 접근으로 규정하고, 일반적인 세계 이해가 없는 상태를 과제별 데이터의 양으로 메우고 있다고 본다.

대비되는 사례로 사람을 든다. 사람은 열여덟 살에 처음 보는 위험한 기계를 다루는 법을 배울 수 있다. 그 기계를 써 본 적이 없어도 공간을 이동하는 감각을 이미 익혔고, 수많은 물체가 움직이는 모습을 봤고, 물체가 힘에 어떻게 반응하는지 겪었고, 사람이 도구를 쓰는 장면을 여러 맥락에서 관찰했고, 충돌이 위험하다는 사실을 안다. 사람은 특정 과제 영상을 수천 시간 보고 나서야 유능해지는 것이 아니라, 필요한 지식 대부분을 더 넓은 세계 경험에서 이미 얻는다.

저자들이 말하는 진짜 physical agent는 이 구도를 그대로 가져온다. 물리, 동역학, 인과관계에 대한 이해를 사람보다 뛰어난 수준으로 갖추면, 그 이해가 물리 시스템에 대한 기본 인터페이스가 되어 사람이 필요로 하는 만큼의 경험 또는 그보다 적은 경험으로 새 과제에 적응할 수 있다는 것이다.

## 핵심 개념

Odyssey-3는 autoregressive diffusion transformer다. 다양한 시나리오를 시뮬레이션하도록 학습됐고, 학습 데이터는 세계에 대한 방대한 시각 observation 모음이다. observation은 시스템이 매 순간 감지하는 입력 신호를 말한다. 이 pre-training으로 물리, 동역학, 인과관계, 인간 행위 양상 같은 개념을 학습했다는 것이 저자들의 설명이다.

여기서 얻은 world knowledge가 이 글의 데이터 효율 주장을 떠받친다. 과제를 새로 풀 때 그 지식을 끌어다 쓰기 때문에 과제당 필요한 경험 데이터가 기존 시스템보다 훨씬 적다는 논리다.

action decoder는 world model에 붙는 학습형 출력 모듈이다. world model이 만든 internal representation을 대상 시스템이 실제로 받아들이는 action 형식으로 옮긴다. action은 시스템이 매 순간 내보내는 제어 출력을 말한다. 로봇 팔이라면 관절 명령, 자동차라면 주행 경로, 게임이라면 키보드와 마우스 입력이 된다.

action decoder를 학습시키는 데이터를 원문은 experiential data라 부른다. experiential data는 물리 시스템의 observation과 그때 취한 action을 짝지은 기록이다. 그 시스템의 제어 입력이 어떻게 쓰이는지를 보여 주는 예시 모음이라고 보면 된다.

physical agent는 이 글이 제시하는 새 범주다. 세계의 언어를 말하는 에이전트라는 표현을 쓰는데, 물리 시스템과 가상 시스템에 자연스럽게 접속하는 능력을 가리킨다. tool call은 에이전트가 외부 도구를 불러 쓰는 호출을 말하는데, 텍스트 tool call을 매개로 움직이는 소프트웨어 에이전트와 구분되는 지점이다.

## 방법

### world model policy 구조

제어 파이프라인은 두 부분으로 나뉜다. world model이 앞에서 observation을 해석하고, action decoder가 뒤에서 그 해석을 제어 신호로 옮긴다. 이 둘을 묶은 단위를 원문은 world model policy라 부른다.

| 구성 요소 | 역할 | 학습 여부 |
|---|---|---|
| world model (Odyssey-3) | observation을 받아 internal representation을 만든다 | pre-training 후 고정 |
| action decoder | internal representation을 대상 시스템의 action 형식으로 옮긴다 | 과제별 experiential data로 학습 |

이 policy 아래에 embodied system이 놓인다. embodied system은 world model policy가 실제로 제어하는 대상으로, 이 글에서는 humanoid, 로봇 팔, 자율주행차, 드론, 게임 캐릭터 다섯 가지다.

![[assets/odyssey-2026-introducing-odyssey-3-a-general/fig03.jpg]]
*world model policy 구조. observation이 world model Odyssey-3를 거쳐 internal representation이 되고, action decoder가 이를 humanoid, 로봇 팔, 자율주행차, 드론, 게임 캐릭터가 받는 action으로 바꾼다 (Odyssey, 2026)*

제어는 closed-loop이다. closed-loop은 시스템이 만든 결과를 다시 입력으로 받아 다음 출력을 정하는 방식을 말한다. 그림에서 embodied system이 만든 observation이 world model 입력으로 되돌아오는 화살표가 이 구조를 나타낸다.

이 설계의 요점은 분업이다. 세계가 어떻게 움직이는지에 대한 지식은 world model 한 곳에 모여 있고, 그 지식을 특정 하드웨어의 제어 규약으로 번역하는 일만 시스템마다 따로 배운다. 그래서 새 embodiment를 붙일 때 다시 학습해야 하는 부분이 작다. embodiment는 로봇의 물리적 형상과 그에 딸린 제어 인터페이스 구성을 뜻한다.

### 도메인별 학습 레시피

다섯 도메인은 같은 골격을 공유하되 데이터 출처와 world model 취급이 다르다.

| 도메인 | 학습 데이터 | 데이터 규모 | world model 처리 |
|---|---|---|---|
| 로봇 팔 | 로봇 시연 데이터(demonstration) | 수십 시간 | 명시 없음 |
| humanoid | humanoid teleoperation 기록 | 수십 시간 | base model로 사용 |
| 자율주행 | 시뮬레이터 주행 기록 | 20시간 | 가중치 고정 |
| 드론 | 시뮬레이터 비행 시연 데이터 | 수십 시간 | pre-training 표현 활용 |
| 비디오 게임 | 키보드와 마우스 입력이 붙은 플레이 녹화 | GTA V 기준 약 2시간 이상 | 가중치 고정 |

시연 데이터는 사람이 만들어 준 모범 실행 기록을 말한다. teleoperation은 사람이 로봇을 원격으로 움직여 그 기록을 남기는 방식이다.

표에서 눈에 띄는 것은 세 도메인이 world model 가중치를 고정한 채로 쓴다는 점이다. 즉 Odyssey-3 자체는 과제에 맞춰 다시 학습되지 않고, 시각 표현을 뽑아 주는 고정 backbone으로만 동작한다. backbone은 입력에서 표현을 뽑아내는 본체 신경망을 말한다.

### 자율주행과 드론 레시피

자율주행에서는 pre-training된 world model을 학습 내내 고정한 채 시각 표현만 뽑아 쓴다. 그 표현이 비교적 작은 driving policy로 들어가고, driving policy는 차량 앞쪽의 waypoint를 예측한다. waypoint는 이동 경로 위에 찍는 목표 지점을 말한다. 따라서 driving policy가 학습하는 것은 세계 이해 자체가 아니라, 이미 갖춰진 세계 이해를 주행이라는 과제에 적용하는 방법이다. 그 방법을 가르치는 교재가 시뮬레이터 경험이다.

드론은 자율주행과 같은 레시피를 따른다. 입력이 세 가지로 늘어난다는 점만 다르다.

- 최근 카메라 observation
- 드론 자신의 운동 상태
- 높은 수준의 내비게이션 프롬프트

이 셋을 받아 비행 waypoint를 만드는 policy를 학습시켰고, 시뮬레이터 비행 시연 데이터가 action expert에게 표현을 움직임으로 옮기는 법을 가르친다. action expert는 표현을 실제 제어 출력으로 변환하는 전담 모듈을 말한다.

### 비디오 게임 레시피

비디오 게임은 물리 시스템이 아니지만 제어 구조가 같다. policy는 키보드와 마우스 입력이 붙은 플레이 녹화로 학습하고, 이때도 pre-training된 world model은 고정된다.

플레이 중 policy는 최근 게임 프레임을 보고 조작 입력을 만든 뒤, 그 결과로 돌아온 화면을 보고 다음 조작을 고른다. 물리 시스템을 제어할 때 쓰던 closed-loop 구조가 가상 세계 조작에 그대로 옮겨 온 형태다.

### AI 학습 환경 생성과 재귀 루프

Odyssey-3는 제어당하는 쪽만 맡지 않는다. 에이전트가 들어가 행동하고 그 결과로부터 배우는 환경 자체를 생성한다. 원문은 이를 다른 지능 안에서 작동하는 지능이라 표현하며 재귀적 학습 시스템으로 규정한다.

Odyssey의 PROWL 연구가 이 방향을 직접 다룬다. 두 방향의 흐름이 서로를 밀어 올린다.

| 방향 | 내용 |
|---|---|
| 에이전트에서 world model로 | 에이전트가 찾아낸 실패가 world model 개선의 단서가 된다 |
| world model에서 에이전트로 | 신뢰할 만한 시뮬레이션 경험이 에이전트 학습 자료가 된다 |

world model이 좋아지면 더 복잡한 경험을 감당할 수 있고, 에이전트가 좋아지면 덜 유능한 에이전트는 닿지 못하던 약점을 찾아낸다. 두 지능이 서로가 배울 수 있는 범위를 계속 넓혀 준다는 구상이다.

저자들은 이 환경이 안전 연구 무대로도 쓰인다고 덧붙인다. 언어 모델을 비롯한 여러 지능이 더 큰 책임을 맡게 될수록, 물리 세계에서 피해가 발생하기 전에 위험한 행위를 발견하고 그 결과를 조사할 장소가 필요하다는 것이다. 이 절의 시연은 언어 모델이 목표를 달성하려 작업하는 사례와 에이전트가 시뮬레이션 세계를 탐색하는 사례 두 묶음으로 제시된다.

## 결과

이 글은 표준 벤치마크 수치를 제시하지 않는다. 결과는 대부분 정성 시연 영상과 서술이고, 정량 비교는 자율주행 항목 하나뿐이다.

### 로봇 팔

수십 시간의 로봇 시연 데이터만으로 여러 종류의 로봇 팔을 제어하고 복잡한 과제를 완수했다. 공개된 과제 지시는 다음과 같다.

- 시리얼을 그릇에 붓기
- 사탕 봉지를 상자에 담기
- 물건을 종이 상자에 담기
- 물티슈를 상자에 넣기
- 나사 상자 닫기
- 물건을 상자에 담고 상자 닫기
- 에스프레소 잔에 커피 붓기
- 물티슈로 접시 닦기

가장 주목할 관찰은 학습 시연 데이터에 없던 복구 행위가 나타났다는 점이다. grasping은 물체를 집어 쥐는 동작을 말하는데, grasping에 실패한 뒤 그리퍼 방향을 다시 잡거나 예상 밖의 위치나 자세로 떨어진 물체를 다시 집는 동작이 확인됐다.

저자들은 이를 pre-training으로 얻은 물리 이해가 시연 범위 밖 상황에 대응하도록 돕는 신호로 해석한다. 이 성질이 중요한 이유는 데이터 수집 비용 때문이다. 일어날 수 있는 모든 실패와 그에 대응하는 복구를 일일이 시연으로 모으는 일은 금세 비현실적이 된다.

다만 저자들 스스로 이 능력이 로봇과 환경을 바꿔도 일관되게 유지되는지가 중요한 미해결 질문이라고 적는다. 그래서 로봇 데이터와 policy 분석과 대규모 벤치마크에 강한 Poke & Wiggle과 협업해, 서로 다른 신체와 시점과 제어 방식에서 지식이 어디까지 전이되고 어디서 한계에 부딪히는지 평가하고 있다고 밝힌다.

### humanoid

humanoid 항목은 Flexion과의 공동 연구 결과다. Flexion은 강화학습과 whole-body control에 강점을 가진 범용 로봇 지능 회사다. whole-body control은 팔과 다리와 몸통을 하나의 제어 문제로 함께 다루는 방식을 말한다. 이 회사가 추구하는 문제는 사람이 이미 쓰고 있는 건물과 도구와 환경 안에서 로봇이 쓸모 있는 일을 하게 만드는 것이고, 연구는 인식과 manipulation과 whole-body control을 함께 묶어 긴 과제를 수행하고 잘못됐을 때 회복하는 로봇을 목표로 한다.

Odyssey-3를 base model로 두고 Flexion이 상당한 연구와 엔지니어링을 더해 humanoid 제어 policy를 만들었다. 수십 시간의 humanoid teleoperation 데이터만으로 실시간 과제 수행이 가능했다.

평가에서 이 policy는 시험한 VLA baseline보다 환경 변화에 더 잘 일반화했다. 구체적으로, baseline policy가 실패하는 조명 변화 조건에서도 과제 실행을 이어 갔다. VLA는 vision-language-action model의 약어로, 이미지와 언어 지시를 함께 받아 로봇 action을 내는 모델 계열을 가리킨다. 시연 과제는 파란 용기를 열고 종이 상자를 꺼내기, 접시를 탁자 가운데로 옮기고 그 위에 머그컵 올리기, 상자를 나무 모서리에 맞춰 놓기, 종이 상자 열기다.

Flexion 공동 창업자이자 CEO인 Nikita Rudin은 로봇 자신의 시연 범위를 훨씬 넘어서는 물리 지식 위에 쌓아 올릴 기회가 흥미롭다고 논평했다. 그 토대를 humanoid 학습과 제어 연구와 결합하면 로봇이 유용한 기술을 얼마나 빨리 익히고 낯선 상황에 얼마나 잘 적응하는지에서 가능성이 열린다는 것이다.

### 자율주행

시뮬레이터 주행 데이터 20시간만으로 인도의 도로에서 closed-loop 자율주행을 수행했고, 주행 trajectory를 실시간으로 생성했다. trajectory는 시간에 따라 이어지는 위치와 상태의 연속을 말한다.

정량 비교는 전량 시뮬레이터에서 학습한 policy와 실제 주행 영상으로 학습한 policy를 방해 요소가 잦은 번잡한 도로에서 평가한 것이다. 정성적으로는 두 policy 모두 비슷하게 동작했다. 차선을 유지하며 굽은 길을 통과했고, 양쪽에서 추월하는 차량에 대응했으며, 혼잡한 교차로에서 회전했다.

| 학습 데이터 | safety driver 개입 사이 주행 거리 |
|---|---|
| 실제 주행 영상 | 기준값 |
| 전량 시뮬레이터 | 기준값의 약 77% |

safety driver는 자율주행 평가 중 위험할 때 직접 조작을 넘겨받는 동승 운전자를 말한다. 즉 시뮬레이터만으로 학습한 policy가 실제 도로에서 실제 영상으로 학습한 policy의 약 77% 거리를 개입 없이 주행했다. 이 수치는 이 글에서 유일하게 공개된 정량 지표다.

시연 지시는 "첫 번째 회전교차로 출구로 나가라", "도로를 따라 주행하라", "왼쪽으로 180도 회전하라" 같은 형태로, 짧은 자연어 명령이 주행 목표를 지정한다.

### 드론

시뮬레이터 드론 데이터 수십 시간으로 학습한 policy가 시뮬레이터 실내 환경에서 장애물을 피하며 안정적으로 비행했다.

별도로 policy 학습 이전에 backbone이 이미 무엇을 이해하고 있었는지 확인하는 실험도 진행했다. 가중치를 고정한 채 공중 내비게이션 과제에 대한 예측을 시각화한 것이다. 이 정성 rollout에서 세 가지가 관찰됐다. rollout은 policy를 실제로 실행해 얻은 한 회차의 실행 기록을 말한다.

- 방향성 있는 비행
- 장애물 주변을 도는 움직임
- 장면의 의미 내용과 일관된 반응

저자들은 이를 pre-training이 공간 구조와 운동에 대한 유용한 지식을 제공한다는 근거로 든다. 시연 지시는 "이륙해 탁자 뒤로 이동한 뒤 정지 비행하라", "이륙해 탁자 아래를 지나 책장 뒤에 착륙하라" 같은 형태다.

### 비디오 게임과 게임 간 전이

Rockstar Games의 GTA V에서 장시간 플레이 세션을 만들어냈고, 주행과 사격과 근접 격투 사례를 함께 제시한다.

더 주목할 결과는 게임 간 전이의 초기 증거다. GTA로 학습한 policy가 추가 policy 학습 없이 다른 두 게임에서 동작했다.

| 학습 소재 | 전이 대상 | 나타난 동작 |
|---|---|---|
| GTA V 플레이 녹화 | Red Dead Redemption 2 | 이동 동작, 말을 타고 이동 |
| GTA V 플레이 녹화 | Sleeping Dogs | 오토바이 주행 |

한 실험에서는 약 2시간의 GTA 영상으로 학습한 이동 policy가 Red Dead Redemption 2에서 말을 타고 이동하는 동작을 만들어냈다. 학습 때와 다른 캐릭터, 다른 탈것, 다른 환경에 같은 제어가 적용된 사례다.

저자들은 로봇, humanoid, 자율주행, AI 학습, 드론 결과와 함께 놓고 볼 때 Odyssey-3가 generalist embodied agent의 토대로 쓸 만하다는 신호라고 정리한다. 하나의 pre-training된 world model이 서로 다른 신체와 환경과 제어 방식에 걸쳐 policy를 뒷받침할 수 있고, 학습된 동작이 그 사이를 넘나든다는 초기 증거가 확인됐다는 것이다.

## 한계

이 발표문은 시연 범위가 넓은 데 비해 검증 가능한 근거가 얇다. 읽을 때 유의할 지점은 일곱 가지다.

| 항목 | 내용 |
|---|---|
| 자기 발표 | 모든 결과가 Odyssey 자신의 발표 안에서 제시되며 외부 검증이 없다 |
| 정량 지표 부족 | 공개된 수치는 자율주행의 77%가 사실상 전부다. 성공률과 시도 횟수와 과제별 난이도 분포가 없다 |
| baseline 미공개 | humanoid 비교에서 어떤 VLA baseline을 썼는지 밝히지 않는다 |
| 일반화 범위 미확인 | 서로 다른 신체와 시점과 제어 방식에서의 전이는 Poke & Wiggle과의 평가로 이제 확인하는 단계다 |
| 아키텍처 비공개 | autoregressive diffusion transformer라는 분류 외에 파라미터 규모, 학습 데이터 규모, action decoder 구조가 없다 |
| 시뮬레이터 의존 | 드론 결과는 전부 시뮬레이터 실내 환경이고 자율주행도 학습이 전량 시뮬레이터다 |
| 접근 불가 | 발표 시점 기준 몇 주 안에 공개 배포하겠다고 예고했을 뿐, 이 글만으로는 모델을 쓸 수 없다 |

저자들이 직접 인정하는 구조적 한계도 하나 있다. frontier world model이 언어 모델보다 약 100배 작은 규모에 머물러 있어 잠재력에 못 미쳐 왔다는 진단이다. 즉 이 글이 보여 주는 결과는 규모가 작은 상태에서 얻은 초기 신호이고, 규모 확대가 남은 과제다.

## 후속 방향

저자들이 제시하는 전망은 두 가지다.

첫째는 응용 확대다. 사람을 위험에 빠뜨리는 일과 나이나 질병이나 장애 때문에 어려워진 일상 과제를 물리 에이전트가 맡아, 더 많은 사람이 독립적으로 생활하도록 돕는 방향이다. 같은 능력이 과학과 공학의 실험을 가속하고, 사람이 직접 경험한 적 없는 환경에서 작동하는 데까지 이어질 수 있다고 본다.

둘째는 지능 자체가 발전하는 방식의 변화다. world model이 미래 에이전트가 학습할 세계를 만들고, 그 에이전트가 물리 세계에서 발견한 것을 다시 world model이 배운다. 더 유능한 world model이 더 유능한 에이전트를 뒷받침하고, 그 에이전트의 경험과 발견이 다시 자신을 길러 낸 세계를 개선한다. 저자들은 이 순환이 사람이 손으로 만들 수 있는 환경의 한계를 넘어서는 수단이라고 본다.

Odyssey는 world model을 학습된 동역학 시스템으로 규정하고, 토대 계층으로서 일반 지능의 최종 목표에 해당한다고 주장한다. 정확하고 열린 환경 안에서 의사결정과 추론이 이뤄지게 하기 때문이고, VLM 에이전트가 그 표현 안에서 직접 추론할 수 있기 때문이다. VLM은 이미지와 언어를 함께 다루는 모델 계열을 가리킨다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| physical agent | 언어가 아니라 세계의 동역학을 매개로 물리 시스템 및 가상 시스템과 직접 맞물리는 에이전트. 이 글이 제시하는 새 범주다 |
| action decoder | world model에 붙는 학습형 출력 모듈. internal representation을 대상 시스템이 요구하는 action으로 옮긴다 |
| experiential data | 물리 시스템의 observation과 그때 취한 action을 짝지은 기록. action decoder 학습 입력이다 |
| world model policy | world model과 action decoder를 묶어 embodied system을 제어하는 단위 |
| embodied system | world model policy가 제어하는 대상. humanoid, 로봇 팔, 자율주행차, 드론, 게임 캐릭터를 가리킨다 |
| safety driver | 자율주행 평가 중 위험 상황에서 조작을 넘겨받는 동승 운전자 |

## 관련 페이지

- [[physical-ai/nvidia-2025-cosmos-world-foundation-model-platform]]: world foundation model을 여러 downstream 과제의 공통 토대로 두는 같은 구도를 NVIDIA 쪽에서 플랫폼으로 구현한 사례
- [[physical-ai/hou-2026-world-model-for-robot-learning]]: world model과 policy를 결합하는 방식을 다섯 가지로 분류한 서베이. Odyssey-3의 고정 backbone 방식이 어디에 놓이는지 확인할 수 있다
- [[physical-ai/li-2025-a-comprehensive-survey-on-world]]: embodied AI 관점에서 world model 연구를 정리한 서베이
- [[physical-ai/9bow-2026-world-action-model-rise]]: 비디오 backbone으로 로봇 policy를 학습하는 계보 해설. Odyssey-3와 문제의식이 겹친다
- [[physical-ai/reuss-2026-pretrained-to-imagine-fine-tuned]]: 예측을 위해 pre-training한 모델을 행동을 위해 fine-tuning하는 흐름을 다룬 글
- [[physical-ai/skild-2026-introducing-s1-in-context-learning]]: 같은 시기에 나온 로봇 foundation model 발표문. 과제 지정 방식이 시연 영상이라는 점이 다르다
- [[physical-ai/generalist-ai-2026-gen-1-5-embodied-foundation]]: embodied foundation model이 적은 예시로 새 과제를 배우는 능력을 내세운 또 다른 사례
- [[overviews/physical-ai-overview]]: physical-ai 카테고리 전체 지도와 학습 경로
