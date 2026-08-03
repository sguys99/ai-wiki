---
title: "Physical AI — 분류 뼈대와 학습 경로"
type: overview
year: 2026
category: overviews
source_collection: synthesis
sources:
  - cai-2026-vlm3-vision-language-models.md
  - zou-2026-task-focused-memorization-multimodal-agents.md
tags: [physical-ai, vla, world-model, robot-learning, sim2real, roadmap, overview, synthesis]
study_path:
  - id: llms/cai-2026-vlm3-vision-language-models
    note: "표준 VLM에 세 가지 요소만 더해 depth·camera pose·pixel correspondence를 푼다. 물리 세계를 다루기 전 인식 축의 입구."
  - id: agents/zou-2026-task-focused-memorization-multimodal-agents
    note: "1인칭 스트리밍 영상에서 무엇을 기억할지를 정책으로 학습한다. 긴 관측을 다루는 방식이 로봇 쪽 기억 설계와 맞닿는다."
    prereq: ["llms/cai-2026-vlm3-vision-language-models"]
---

## 요약 (Summary)

`wiki/physical-ai/`에는 아직 페이지가 없다. 이 문서는 그 자리를 미리 잡아 둔 허브다. 자료를 넣기 전에 정해 둔 분류 기준과 태그 어휘, 앞으로 읽을 순서를 담는다. 저장소에 없는 논문을 요약해 두지는 않았다. 여기 걸린 링크는 전부 실제로 존재하는 페이지다.

`robot` · `embodied` · `VLA` · `sim2real` 키워드로 `wiki/`와 `sources/`를 훑어도 physical AI 자료는 나오지 않는다. 걸리는 것은 BRIGHT 벤치마크의 Robotics 스플릿이나 포털 스킬 문서의 `robots.txt` 같은 오탐이다. 지금 저장소의 121개 페이지는 전부 LLM 소프트웨어 쪽이다. RAG 파이프라인, 에이전트 하네스, 평가 프레임워크가 대부분이다.

그래서 이 페이지가 맡는 일은 두 갈래다. 첫 자료가 들어올 때 어디에 둘지 다시 고민하지 않도록 규칙을 적어 둔다. 지금 가진 인접 자료에서 physical AI 쪽으로 건너갈 다리도 표시해 둔다.

아래 학습 경로는 지금 링크할 수 있는 두 단계뿐이다. 둘 다 로봇 논문이 아니라 인식과 기억 쪽 인접 자료다. physical-ai 카테고리에 자료가 들어오면 그 사이와 뒤로 단계를 늘린다.

## 학습 경로

1. [[llms/cai-2026-vlm3-vision-language-models|VLM3 (Native 3D Learners)]] — 표준 VLM에 세 가지 요소만 더해 depth·camera pose·pixel correspondence를 푼다. 물리 세계를 다루기 전 인식 축의 입구.
2. [[agents/zou-2026-task-focused-memorization-multimodal-agents|TaskMem]] — 1인칭 스트리밍 영상에서 무엇을 기억할지를 정책으로 학습한다. 긴 관측을 다루는 방식이 로봇 쪽 기억 설계와 맞닿는다. (선수: VLM3)

## 무엇이 physical-ai로 가는가

기준은 소재가 아니라 방법이다. 방법의 핵심에 센서 입력, 액추에이터 출력, 시뮬레이터, 실체 로봇이나 차량이 있으면 `physical-ai`다. 물리 도메인을 소재로 삼더라도 방법이 언어와 검색에 머무르면 원래 카테고리에 남는다.

| 자료 성격 | 카테고리 | 이유 |
|---|---|---|
| 로봇 팔 조작 정책을 학습하는 논문 | `physical-ai` | 액추에이터 출력이 방법의 중심 |
| 시뮬레이터에서 학습해 실기로 옮기는 기법 | `physical-ai` | sim2real 자체가 방법 |
| 로봇 매뉴얼 RAG의 검색 성능 평가 | `evaluations` | 소재만 로봇, 방법은 검색 평가 |
| 순수 VLM 아키텍처 논문 | `llms` | 물리 상호작용 없음. 이 허브에서 상호 링크 |

경계가 애매하면 "미래의 내가 어느 카테고리에서 찾을 때 더 빨리 발견하는가"로 정한다. `wiki/physical-ai/`가 40페이지를 넘으면 하위 폴더로 나눌지 다시 본다. 다른 카테고리의 500개 기준보다 훨씬 이른 값인데 성격이 다른 두 도메인이 한 저장소에 섞여 있어서다.

## 태그 어휘

physical-ai 페이지는 도메인 루트 태그 `physical-ai`를 달고 아래에서 1~3개를 고른다. 표기는 하나만 허용한다. 기존 태그 풀에는 `graph-rag`와 `graphrag`처럼 갈린 사례가 있다. 이 목록에서는 그 상태를 되풀이하지 않는다. 목록에 없는 태그를 쓰려면 `CLAUDE.md`의 표에 먼저 추가한다.

| 묶음 | 태그 |
|---|---|
| 학습·제어 방법 | `vla` · `world-model` · `robot-learning` · `imitation-learning` · `rl-control` |
| 플랫폼·응용 | `manipulation` · `locomotion` · `humanoid` · `mobile-robot` · `autonomous-driving` · `drone` |
| 환경·인식 | `sim2real` · `simulator` · `3d-perception` · `spatial-reasoning` · `slam` · `teleoperation` |
| 자원·운영 | `robot-dataset` · `benchmark` · `edge-inference` · `hardware` · `safety` |

## 지금 저장소에 있는 것

| 항목 | 상태 |
|---|---|
| `wiki/physical-ai/` 페이지 | 0개 |
| 인접 페이지 | [[llms/cai-2026-vlm3-vision-language-models]] · [[agents/zou-2026-task-focused-memorization-multimodal-agents]] |
| 홈 밴드 | [[physical-ai]] — 카드 대신 준비 중 안내가 나온다 |
| 분류 규칙 · 태그 어휘 | `CLAUDE.md`에 확정 |

카메라 focal length를 통일하고 픽셀 좌표를 텍스트로 표기하는 것만으로 표준 VLM이 metric depth와 camera pose를 푼다. VLM3의 결과다. 로봇을 다루지는 않지만 3D 인식을 별도 encoder 없이 언어 모델 안에서 처리하는 경로를 보여주니 VLA 계열을 읽기 전 배경이 된다. TaskMem은 EgoLife·EgoTempo 같은 1인칭 영상 스트림에서 저장할 내용을 RL로 고르는 프레임워크다. 방법이 순수 소프트웨어라 `agents`에 남아 있지만 긴 관측을 압축해 나중 판단에 쓰는 문제는 로봇 쪽에서도 그대로 반복된다.

## 앞으로 채울 자리

자료를 넣지 않은 상태에서 요약을 흉내 내지 않으려고 축 이름과 빈칸만 적어 둔다. 아래 항목은 아직 저장소에 없는 영역이다.

- VLA — 언어 지시를 로봇 동작으로 바꾸는 계열. `CLAUDE.md`의 분류 예시에 RT-2, OpenVLA, Diffusion Policy가 이름만 올라 있고 실제 자료는 없다.
- world model — 관측에서 환경 동역학을 학습해 계획에 쓰는 계열이다.
- robot learning · imitation learning — 시연 데이터로 정책을 학습하는 축. 데이터셋 자료는 `repos`로 받는다.
- sim2real · simulator — 시뮬레이터에서 학습한 정책을 실기로 옮길 때 생기는 격차가 문제다.
- autonomous driving — 자율주행 인지·계획 스택.
- edge inference · hardware — 실기에 얹을 때의 지연·전력 제약.

첫 자료는 `CLAUDE.md`의 6단계 파이프라인을 그대로 탄다. `raw/`에 원본을 복사하고 도식을 뽑는다. `sources/`에 요약을 쓰고 큐레이션을 확인한 뒤 `wiki/physical-ai/`에 페이지를 만든다. 그다음 `index.md`의 Physical AI 섹션에 한 줄을 넣으면 홈 밴드가 준비 중 안내에서 카드 그리드로 바뀐다. 위 학습 경로에도 그 페이지를 단계로 끼워 넣는다.

## 이 페이지의 한계

- 합성할 physical AI 자료가 없다. 지금은 규칙과 빈칸을 적은 문서이지 여러 자료를 겹쳐 본 개괄이 아니다.
- 학습 경로 두 단계는 물리 상호작용을 다루지 않는다. 인접 배경으로 읽을 자료다. 로봇 정책·시뮬레이션 자료가 들어오면 순서 앞뒤가 바뀔 수 있다.
- 태그 어휘는 자료 없이 정한 목록이라 실제 분류를 몇 번 해 보면 손볼 항목이 나올 수 있다. 바꿀 때는 `CLAUDE.md`의 표를 먼저 고친다.

## 관련 페이지 (Related Pages)

- [[physical-ai]] — 홈의 Physical AI 밴드. 자료가 들어오면 카드가 채워진다.
- [[llms/cai-2026-vlm3-vision-language-models|VLM3: Vision Language Models Are Native 3D Learners]] — 3D 인식을 표준 VLM의 SFT로 푸는 논문. 학습 경로 1단계.
- [[agents/zou-2026-task-focused-memorization-multimodal-agents|TaskMem: Task-Focused Memorization for Multimodal Agents]] — 1인칭 스트림에서 기억할 내용을 학습하는 프레임워크. 학습 경로 2단계.
