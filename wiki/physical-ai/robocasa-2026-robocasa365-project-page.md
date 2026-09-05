---
title: "RoboCasa 프로젝트 페이지 (RoboCasa365 공식 홈)"
type: article
year: 2026
category: physical-ai
source: robocasa-2026-robocasa365-project-page.md
raw_path: raw/articles/robocasa-2026-robocasa365-project-page.md
raw_filename: "robocasa-2026-robocasa365-project-page.md"
source_collection: external
author: "RoboCasa Team (UT Austin·NVIDIA Research)"
url: "https://robocasa.ai/"
publisher: "robocasa.ai"
fetched_at: "2026-09-04T18:32:37+0900"
extractor_tier: "chrome"
tags: [physical-ai, simulator, benchmark, robot-dataset]
---

## 요약

robocasa.ai는 RoboCasa 프로젝트의 공식 홈페이지다. 2024년 RSS 논문 RoboCasa와 2026년 ICLR 논문 RoboCasa365를 한 페이지에서 소개하고, 주방 장면과 물체와 과제를 어떻게 만들었는지 짧은 설명 문단과 영상으로 보여준다.

이 자료가 논문과 구별되는 지점은 운영 정보다. 릴리스 이력, 공개된 코드와 문서, leaderboard 운영은 논문 본문에 없고 홈페이지에만 적혀 있다. 따라서 두 논문을 읽기 전에 프로젝트의 현재 상태를 확인하는 진입로로 쓰기에 적합하다.

반면 성공률 비교나 ablation은 이 페이지에 없다. 실려 있는 수치는 데이터셋과 환경의 규모에 한정된다.

## 배경

RoboCasa는 일상 과제를 수행하는 범용 로봇을 학습시키기 위한 대규모 시뮬레이션 프레임워크다. 첫 문단은 사람 중심 환경, 그중에서도 주방 장면에 초점을 맞춘다고 밝힌다.

프로젝트가 내세우는 전제는 두 가지다. 환경 자체를 생성형 AI 도구로 만든다는 것이 하나이고, 사람이 만든 고품질 시연 데이터(demonstration)에 자동 trajectory 생성을 결합해 학습 데이터를 적은 비용으로 늘린다는 것이 다른 하나다.

RoboCasa365는 이 기반 위에 올린 최신 릴리스다. 홈페이지는 365종의 일상 과제, 2,500개의 주방 환경, 600시간 이상의 사람 시연 데이터, 1,600시간 이상의 합성 시연 데이터를 든다. 목표로는 다음 세 설정에서의 체계적인 벤치마크를 제시한다.

- multi-task learning
- foundation model 학습
- lifelong learning

지원하는 policy 학습 모델로는 Diffusion Policy와 π0와 GR00T를 든다.

## 핵심 개념

skill은 로봇이 반복해서 수행하는 조작 단위를 가리킨다. RoboCasa는 열 가지 기본 skill을 정해 두고 이를 조합해 더 긴 활동을 만든다.

atomic task는 skill 하나를 한 번 수행하면 끝나는 과제이고, composite task는 여러 skill을 순서대로 이어야 끝나는 과제다. 예를 들어 물체를 집어 옮기는 것은 atomic task이고, 커피를 내리는 것은 composite task다.

long-horizon 과제는 여러 단계를 이어야 끝나는 긴 과제를 말한다. 홈페이지는 열 가지 기본 skill을 long-horizon manipulation 행동을 쌓아 올리는 구성 요소로 설명한다.

domain randomization은 시뮬레이션 파라미터를 흔들어 sim2real 간극을 줄이는 기법이다. RoboCasa는 AI로 생성한 텍스처를 장면에 교체해 넣는 방식을 이 기법의 한 형태로 쓴다고 밝힌다.

policy는 현재 observation을 받아 다음 action을 정하는 함수를 말한다. 릴리스 노트는 계층적 policy 학습을 지원하려고 데이터에 subtask 주석을 붙였다고 적는다.

## 페이지 구성

상단 내비게이션은 다섯 개의 외부 링크로 이루어져 있다.

| 링크 | 가리키는 곳 |
|---|---|
| Paper (RoboCasa) | 2024년 RSS 논문 |
| Paper (RoboCasa365) | 2026년 ICLR 논문 |
| Code | 공개 저장소 |
| Documentation | 설치와 사용 문서 |
| Leaderboard | 공개 순위표. NEW 배지가 붙어 있다 |

본문은 릴리스 노트로 시작해 시뮬레이션 구성, 생성형 AI 자산, 과제 구성, 팀 소개, 인용 정보 순으로 이어진다. 각 절은 짧은 설명 문단 하나에 영상이나 이미지 그리드가 붙는 형태다.

첫 화면의 데모 영상에는 "Place the toast on the dining counter"라는 지시문(instruction)이 자막으로 걸려 있다. 즉 과제가 자연어 한 문장으로 지정되고 로봇이 그 문장을 수행하는 구조임을 첫 화면에서 보여준다.

## 릴리스 이력

| 날짜 | 버전 | 내용 |
|---|---|---|
| 2026-02-18 | v1.0 | RoboCasa365 공개. 365종 과제, 2,500개 이상 주방 장면, 2,200시간 이상 로봇 시연 데이터, 벤치마크 지원 |
| 2026-05-12 | v1.0.1 | 모든 과제의 horizon 길이를 1.5배로 늘려 일관성을 맞춤. 평가 실행 전 최신 버전으로 갱신하라고 안내 |
| 2026-07-07 | 버전 표기 없음 | target composite task 데이터셋에 프레임 단위 subtask 주석 추가 |

v1.0 항목의 2,200시간은 사람 시연 데이터 600시간과 합성 시연 데이터 1,600시간을 합한 값이다. 즉 개요 문단의 두 수치와 릴리스 노트의 총량이 서로 맞는다.

v1.0.1 항목은 평가 조건이 버전에 따라 달라진다는 뜻이다. 따라서 서로 다른 버전에서 얻은 성공률을 그대로 비교하면 안 된다.

2026년 7월 항목은 논문 본문에 없는 정보다. 매 timestep에 subtask 인덱스, atomic skill 이름, 단계 구분(pick, place, navigate), 자연어 지시문이 라벨로 붙는다. 이 네 가지가 함께 붙으면 상위 policy가 다음 subtask를 고르고 하위 policy가 그 subtask를 실행하는 계층 구조를 학습시킬 수 있다.

## 시뮬레이션 구성

### 장면

장면은 건축과 인테리어 잡지를 참고해 만든다. 세계 여러 가정의 주방 layout과 style을 모으고, 표준 치수와 공간 규격에 맞춰 모델링한 뒤 수납장, 가스레인지, 싱크대, 전자레인지 같은 상호작용 가능한 가구와 가전을 배치했다는 설명이다.

RoboCasa365는 이 기반을 크게 늘렸다. 원래 120개였던 장면이 2,500개가 됐고, 실제 주택을 참고한 layout 50개와 설비와 가전과 텍스처를 바꾼 style 50개가 새로 들어갔다.

### cross-embodiment 지원

시뮬레이터는 형상이 서로 다른 mobile manipulator를 지원한다. 홈페이지가 드는 예는 팔 하나가 달린 모바일 플랫폼, humanoid 로봇, 팔이 달린 4족 로봇 세 가지다.

### 상호작용 가구와 가전

가구와 가전은 두 방식으로 반응한다. 하나는 관절 동작이고 다른 하나는 상태 변화다. 예를 들어 로봇이 전자레인지 문을 여닫거나 가스레인지 손잡이를 비틀 수 있고, 손잡이를 비틀면 그에 대응하는 화구가 켜진다.

## 생성형 AI 기반 자산

### 텍스처

텍스처는 text-to-image 모델인 MidJourney로 만든다. 벽, 바닥, 조리대, 수납장 패널마다 100장씩 준비해 장면의 텍스처를 교체할 수 있게 했다. 홈페이지는 이 교체를 사실적인 domain randomization의 한 형태로 설명하며, 학습 데이터의 시각적 다양성을 크게 늘리는 수단으로 든다.

### 물체

물체는 3,200개 이상이고 150개가 넘는 범주에 걸쳐 있다. 과일, 채소, 포장 식품, 그릇류가 포함된다. 출처는 다음 세 곳이다.

- Objaverse 1.0
- LightWheel AI
- 나머지는 text-to-3D 모델인 Luma AI가 생성한 자산

출처를 이렇게 나눠 밝힌 점은 논문보다 구체적인 정보다.

## 과제 구성

### 기본 skill 10가지

홈페이지는 열 가지 기본 skill을 가정 활동 대부분을 떠받치는 구성 단위로 제시한다.

1. Pick and place
2. Opening and closing doors
3. Opening and closing drawers
4. Twisting knobs
5. Turning levers
6. Pressing buttons
7. Insertion
8. Navigation
9. Sliding Racks
10. Closing/Opening Lids

RoboCasa365는 이 skill들을 체계적으로 학습하고 평가하려고 atomic task 65종을 포함한다. 각 skill에는 실행 영상이 carousel 형태로 붙어 있고, 텍스트로 이름이 확인되는 것은 Pick and Place, Opening and Closing Doors, Turning Levers, Twisting Knobs, Pressing Buttons 다섯 가지다.

### composite task

composite task는 여러 skill을 이어 의미 있는 활동을 수행하는 과제다. 홈페이지가 드는 예는 주방 용품 채워 넣기와 커피 내리기이고, 영상 carousel에는 Steaming Vegetables, Restocking Kitchen Supplies, Brewing Coffee 세 가지가 걸려 있다.

과제 정의에는 GPT-4를 쓴다. 근거로는 LLM이 사람 세계의 상식과 지식을 많이 담고 있어서, 환경과 로봇의 skill을 주면 그럴듯한 과제 후보를 낼 수 있다는 점을 든다. 목표는 사람 중심 세계에서 실제 가정 활동이 나타나는 빈도 구조를 반영하는 과제를 모으는 것이다.

## 규모 수치

| 항목 | 값 |
|---|---|
| 일상 과제 | 365종 |
| atomic task | 65종 |
| 기본 skill | 10가지 |
| 주방 장면 | 2,500개 (원래 120개) |
| 새 layout과 style | 각 50개 |
| 3D 물체 | 3,200개 이상, 150개 이상 범주 |
| 텍스처 | 벽, 바닥, 조리대, 수납장 패널 각 100장 |
| 사람 시연 데이터 | 600시간 이상 |
| 합성 시연 데이터 | 1,600시간 이상 |
| 전체 시연 데이터 | 2,200시간 이상 |

수치는 전부 규모에 관한 것이다. 성공률이나 모델 사이의 비교는 홈페이지에 없으므로, 정량 결과가 필요하면 leaderboard나 RoboCasa365 논문 페이지로 가야 한다.

## 논문과 다른 점

| 항목 | 프로젝트 페이지 | RoboCasa365 논문 |
|---|---|---|
| 기본 skill | 10가지 (Sliding Racks와 Closing/Opening Lids 포함) | 8가지 |
| leaderboard | 운영하며 상단 링크로 노출 | 다루지 않음 |
| subtask 주석 | 2026년 7월 추가로 기록 | 없음 |
| 버전 이력 | v1.0과 v1.0.1을 날짜와 함께 명시 | 없음 |
| 성공률 비교 | 없음 | 있음 |

두 문서 중 어느 쪽이 최신 릴리스를 반영하는지는 홈페이지에 명시돼 있지 않다. 따라서 skill 개수처럼 어긋나는 항목은 양쪽을 함께 확인해야 한다.

leaderboard는 별도 페이지로 링크만 걸려 있고 그 내용은 이 자료에 수집되지 않았다. 순위표에 어떤 모델이 올라 있는지 확인하려면 홈페이지의 Leaderboard 링크를 직접 열어야 한다.

## 한계

프로젝트 페이지라 실패 사례와 미해결 문제를 다루지 않는다. 성능 수치가 없으므로 방법의 강점과 약점을 이 페이지만으로 판단할 수 없다.

수집 측면의 한계도 있다. 페이지 콘텐츠의 상당 부분이 영상 carousel이라 텍스트 추출에는 절 제목만 남고 본문이 비어 있다. skill별 절과 composite task 절이 그런 경우다.

전체 페이지 스크린샷도 6,000px에서 잘려 팀 소개 중간부터는 이미지에 담기지 않았다. 다만 인용 정보는 텍스트 추출본에 BibTeX 두 건으로 남아 있어, RoboCasa365가 ICLR 2026, RoboCasa가 RSS 2024 발표라는 사실은 확인된다.

Code, Documentation, Leaderboard가 가리키는 내용은 이 자료에 포함되지 않는다. 저장소 README는 별도 자료로 수집돼 있다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| subtask 주석 | 2026년 7월에 추가된 데이터 라벨. 매 timestep에 subtask 인덱스, atomic skill 이름, 단계 구분, 자연어 지시문이 붙는다 |
| atomic task | skill 하나를 한 번 수행하면 끝나는 과제. RoboCasa365에 65종이 있다 |
| composite task | 여러 skill을 순서대로 이어야 끝나는 과제. GPT-4로 후보를 정의한다 |
| domain randomization | 시뮬레이션 파라미터를 흔들어 sim2real 간극을 줄이는 기법. 텍스처 교체가 그 한 형태다 |
| LightWheel AI | 3D 자산 공급처 중 하나. Objaverse 1.0, Luma AI와 함께 물체 라이브러리의 출처다 |

## 관련 페이지

- [[physical-ai/nasiriany-2026-robocasa365-a-large-scale-simulation-framework]]: 이 페이지가 소개하는 최신 논문. 아키텍처와 벤치마크 결과의 1차 출처다
- [[physical-ai/nasiriany-2024-robocasa-large-scale-simulation-of-everyday]]: 최초 릴리스 논문. 장면과 과제 설계의 출처다
- [[physical-ai/robocasa-robocasa]]: 홈페이지가 Code 링크로 가리키는 저장소. 설치와 데모 실행 절차를 다룬다
- [[physical-ai/nvlabs-2026-gear-sonic-project-page]]: 같은 성격의 프로젝트 페이지 자료. 영상 중심이라 텍스트 추출이 얇다는 한계도 같다
- [[overviews/physical-ai-overview]]: physical-ai 분류 기준과 학습 경로 허브
