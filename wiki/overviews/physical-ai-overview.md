---
title: "Physical AI — 분류 뼈대와 학습 경로"
type: overview
year: 2026
category: overviews
source_collection: synthesis
sources:
  - cai-2026-vlm3-vision-language-models.md
  - zou-2026-task-focused-memorization-multimodal-agents.md
  - hou-2026-world-model-for-robot-learning.md
  - luo-2025-sonic-supersizing-motion-tracking.md
  - nvlabs-gr00t-wholebodycontrol.md
  - nvlabs-2026-gear-sonic-project-page.md
tags: [physical-ai, vla, world-model, robot-learning, humanoid, sim2real, roadmap, overview, synthesis]
study_path:
  - id: llms/cai-2026-vlm3-vision-language-models
    note: "표준 VLM에 세 가지 요소만 더해 depth·camera pose·pixel correspondence를 푼다. 물리 세계를 다루기 전 인식 축의 입구."
  - id: agents/zou-2026-task-focused-memorization-multimodal-agents
    note: "1인칭 스트리밍 영상에서 무엇을 기억할지를 정책으로 학습한다. 긴 관측을 다루는 방식이 로봇 쪽 기억 설계와 맞닿는다."
    prereq: ["llms/cai-2026-vlm3-vision-language-models"]
  - id: physical-ai/hou-2026-world-model-for-robot-learning
    note: "43페이지 서베이. 정책 결합 5분류와 학습된 시뮬레이터 역할로 문헌 지형도를 먼저 깐다. 다음 단계의 어휘가 여기서 나온다."
    prereq: ["llms/cai-2026-vlm3-vision-language-models"]
  - id: physical-ai/luo-2025-sonic-supersizing-motion-tracking
    note: "서베이가 그린 지형에서 world model 없이 dense mocap supervision으로 가는 경로. 스케일링 곡선과 sim2real 수치가 실제로 어디까지 왔는지 보여준다."
    prereq: ["physical-ai/hou-2026-world-model-for-robot-learning"]
  - id: physical-ai/nvlabs-2026-gear-sonic-project-page
    note: "MPJPE 22.3mm이 실제로 어떤 걸음걸이인지 영상으로 확인한다. 논문 수치와 동작 품질 사이의 간격을 메우는 단계."
    prereq: ["physical-ai/luo-2025-sonic-supersizing-motion-tracking"]
  - id: physical-ai/nvlabs-gr00t-wholebodycontrol
    note: "논문의 설계가 코드에서 어떤 모양인지 본다. 체크포인트 2종·ZMQ·Jetson 배포처럼 논문에 없는 운영 제약이 여기 있다."
    prereq: ["physical-ai/luo-2025-sonic-supersizing-motion-tracking"]
---

## 요약 (Summary)

`wiki/physical-ai/`에 4개 페이지가 들어왔다. 이 문서는 그 카테고리의 허브로, 분류 기준과 태그 어휘, 읽는 순서를 모아 둔다.

들어온 자료는 두 덩이다. 하나는 world model 계열의 문헌 지형도를 그린 43페이지 서베이이고, 다른 하나는 NVIDIA GEAR의 SONIC 3부작(논문·구현 저장소·데모 페이지)이다. 두 덩이는 성격이 정확히 반대라서 붙여 읽는 값이 있다. 서베이는 "관측에서 환경 동역학을 배워 계획에 쓴다"는 계열을 정리하고, SONIC은 그런 예측 모델 없이 mocap 프레임마다 주어지는 목표 포즈만으로 전신 제어를 스케일링한다. 병목을 어디로 보느냐가 갈리는 지점이다.

아직 개괄이라 부르기엔 얇다. 저장소의 126개 페이지 중 physical AI 쪽은 4개이고 그 4개가 두 프로젝트에서 나왔다. VLA 1차 논문, 자율주행, manipulation 전용 정책 같은 축은 여전히 비어 있다. 아래 학습 경로는 실제로 존재하는 페이지만 걸었다.

## 학습 경로

1. [[llms/cai-2026-vlm3-vision-language-models|VLM3 (Native 3D Learners)]] — 표준 VLM에 세 가지 요소만 더해 depth·camera pose·pixel correspondence를 푼다. 물리 세계를 다루기 전 인식 축의 입구.
2. [[agents/zou-2026-task-focused-memorization-multimodal-agents|TaskMem]] — 1인칭 스트리밍 영상에서 무엇을 기억할지를 정책으로 학습한다. 긴 관측을 다루는 방식이 로봇 쪽 기억 설계와 맞닿는다. (선수: VLM3)
3. [[physical-ai/hou-2026-world-model-for-robot-learning|World Model for Robot Learning (Survey)]] — 정책 결합 5분류(IDM·single-backbone·MoE/MoT·unified VLA·latent)와 학습된 시뮬레이터의 두 용도로 문헌 지형도를 깐다. 다음 단계에서 쓸 어휘가 여기서 나온다. (선수: VLM3)
4. [[physical-ai/luo-2025-sonic-supersizing-motion-tracking|SONIC]] — 같은 지형에서 world model 없이 dense mocap supervision으로 가는 경로. 파라미터·데이터·compute 세 축 스케일링 곡선과 sim2real 수치가 현재 도달점을 보여준다. (선수: 서베이)
5. [[physical-ai/nvlabs-2026-gear-sonic-project-page|GEAR-SONIC 프로젝트 페이지]] — MPJPE 22.3mm이 실제로 어떤 걸음걸이인지 영상으로 확인한다. 논문 수치와 동작 품질 사이의 간격을 메우는 단계. (선수: SONIC)
6. [[physical-ai/nvlabs-gr00t-wholebodycontrol|GR00T-WholeBodyControl]] — 논문 설계가 코드에서 어떤 모양인지 본다. 체크포인트 2종의 lookahead 차이, ZMQ 헤더 크기, Jetson 온보드 배포처럼 논문에 안 적힌 운영 제약이 여기 있다. (선수: SONIC)

3번을 4번보다 앞에 둔 건 서베이가 어휘를 먼저 주기 때문이다. 구체 사례부터 보는 걸 선호하면 4→3 순서로 바꿔도 무리는 없다.

## 무엇이 physical-ai로 가는가

기준은 소재가 아니라 방법이다. 방법의 핵심에 센서 입력, 액추에이터 출력, 시뮬레이터, 실체 로봇이나 차량이 있으면 `physical-ai`다. 물리 도메인을 소재로 삼더라도 방법이 언어와 검색에 머무르면 원래 카테고리에 남는다.

| 자료 성격 | 카테고리 | 이유 |
|---|---|---|
| 로봇 팔 조작 정책을 학습하는 논문 | `physical-ai` | 액추에이터 출력이 방법의 중심 |
| 시뮬레이터에서 학습해 실기로 옮기는 기법 | `physical-ai` | sim2real 자체가 방법 |
| 논문의 공식 구현 저장소·데모 페이지 | `physical-ai` | 같은 프로젝트는 `type`이 달라도 한 카테고리에 모은다 |
| 로봇 매뉴얼 RAG의 검색 성능 평가 | `evaluations` | 소재만 로봇, 방법은 검색 평가 |
| 순수 VLM 아키텍처 논문 | `llms` | 물리 상호작용 없음. 이 허브에서 상호 링크 |

세 번째 줄이 SONIC 3부작을 넣으면서 실제로 판단한 항목이다. 논문은 `paper`, 저장소는 `repo`, 데모 페이지는 `article`이지만 셋 다 `physical-ai`에 두고 서로 링크했다. `type`과 `category`는 독립 축이라서 유형이 갈려도 분류는 방법을 따른다.

경계가 애매하면 "미래의 내가 어느 카테고리에서 찾을 때 더 빨리 발견하는가"로 정한다. `wiki/physical-ai/`가 40페이지를 넘으면 하위 폴더로 나눌지 다시 본다. 다른 카테고리의 500개 기준보다 훨씬 이른 값인데 성격이 다른 두 도메인이 한 저장소에 섞여 있어서다.

## 태그 어휘

physical-ai 페이지는 도메인 루트 태그 `physical-ai`를 달고 아래에서 1~3개를 고른다. 표기는 하나만 허용한다. 기존 태그 풀에는 `graph-rag`와 `graphrag`처럼 갈린 사례가 있는데 이 목록에서는 그 상태를 되풀이하지 않는다. 목록에 없는 태그를 쓰려면 `CLAUDE.md`의 표에 먼저 추가한다.

| 묶음 | 태그 |
|---|---|
| 학습·제어 방법 | `vla` · `world-model` · `robot-learning` · `imitation-learning` · `rl-control` |
| 플랫폼·응용 | `manipulation` · `locomotion` · `humanoid` · `mobile-robot` · `autonomous-driving` · `drone` |
| 환경·인식 | `sim2real` · `simulator` · `3d-perception` · `spatial-reasoning` · `slam` · `teleoperation` |
| 자원·운영 | `robot-dataset` · `benchmark` · `edge-inference` · `hardware` · `safety` |

네 페이지를 실제로 분류하며 쓴 태그는 `humanoid`(3회) · `vla`(2회) · `teleoperation`(2회) · `world-model` · `robot-learning` · `imitation-learning` · `edge-inference`다. 1~3개 상한은 유용했다. SONIC 논문은 sim2real 결과 절이 따로 있어서 후보가 다섯 개까지 나왔는데, 상한이 있으니 "발견 경로로서 어느 태그가 더 값이 큰가"를 강제로 고르게 된다.

## 지금 저장소에 있는 것

| 항목 | 상태 |
|---|---|
| `wiki/physical-ai/` 페이지 | 4개 (서베이 1 + SONIC 3부작) |
| 자료 유형 분포 | `paper` 2 · `repo` 1 · `article` 1 |
| 인접 페이지 | [[llms/cai-2026-vlm3-vision-language-models]] · [[agents/zou-2026-task-focused-memorization-multimodal-agents]] |
| 홈 밴드 | [[physical-ai]] — `index.md`에 4줄이 들어가 카드가 채워졌다 |
| 분류 규칙 · 태그 어휘 | `CLAUDE.md`에 확정, 이 페이지에 사용 기록 |

서베이는 정책으로서의 world model을 IDM-style·single-backbone·MoT-style·unified VLA·latent 다섯으로 가르고, 학습된 시뮬레이터를 RL 환경과 후보 행동 채점 두 용도로 나눈다. 진단이 뚜렷하다 — 병목이 "그럴듯한 미래"에서 "행동에 인과적으로 정렬된 실행 가능한 미래"로 옮겨갔다고 본다.

SONIC은 그 인과 정렬 문제를 우회하는 쪽에 가깝다. 미래를 예측하는 대신 mocap이 프레임마다 정답 포즈를 주므로 supervision이 이미 행동에 붙어 있다. 대가는 데이터 의존이다. 700시간 mocap을 G1에 retarget해 611시간을 남기는 작업이 방법의 전제다. 두 접근을 겹쳐 보면 "예측 모델을 잘 만들 것인가, 정답 궤적을 많이 모을 것인가"라는 선택이 드러난다.

인접 두 페이지는 여전히 배경이다. VLM3은 카메라 focal length를 통일하고 픽셀 좌표를 텍스트로 표기하는 것만으로 표준 VLM이 metric depth와 camera pose를 푼다는 결과인데, 로봇을 다루지 않지만 3D 인식을 별도 encoder 없이 언어 모델 안에서 처리하는 경로를 보여준다. TaskMem은 EgoLife·EgoTempo 같은 1인칭 스트림에서 저장할 내용을 RL로 고르는 프레임워크다. 방법이 순수 소프트웨어라 `agents`에 남아 있다.

## 앞으로 채울 자리

축별로 현재 상태를 적어 둔다. 없는 영역은 요약을 흉내 내지 않고 빈칸으로 남긴다.

- VLA — 아직 1차 논문이 없다. SONIC이 `vla` 태그를 달고 있지만 VLA 아키텍처 논문이 아니라 GR00T N1.5에 행동 공간을 제공하는 쪽이다. `CLAUDE.md`의 분류 예시에 이름만 올라 있는 RT-2, OpenVLA, Diffusion Policy가 그대로 비어 있다.
- world model — 서베이 1건이 지형도를 덮지만 1차 논문은 없다. 서베이가 인용한 대표 연구 중 하나를 넣으면 5분류가 실제 구현으로 확인된다.
- robot learning · imitation learning — SONIC이 mocap 기반 imitation의 대규모 사례를 채웠다. 데이터셋 쪽은 BONES-SEED를 `repos`로 받으면 `robot-dataset` 태그가 처음 붙는다.
- sim2real · simulator — SONIC의 sim2real 절(성공률 100.0%→99.2%, 발 MPJPE-L 29.0→53.7mm)이 수치를 하나 남겼다. sim2real 격차 자체를 방법으로 다루는 자료는 없다.
- humanoid · teleoperation · edge-inference — SONIC 3부작이 채웠다. Jetson Orin 온보드 1–2ms, 네 루프 멀티레이트 구조가 edge 쪽 참조점이다.
- autonomous driving · drone · slam · manipulation · safety · benchmark — 비어 있다.

새 자료는 `CLAUDE.md`의 6단계 파이프라인을 그대로 탄다. `raw/`에 원본을 복사하고 도식을 뽑은 뒤 `sources/`에 요약을 쓴다. 큐레이션을 확인하고 `wiki/physical-ai/`에 페이지를 만들고 `index.md`의 Physical AI 섹션에 한 줄을 넣는다. 이 페이지의 `study_path`와 `## 학습 경로`에도 단계를 끼워 넣는다.

## 이 페이지의 한계

- 4개 페이지가 두 프로젝트에서 나왔다. 서베이와 SONIC을 대비한 것 말고는 여러 자료를 겹쳐 본 개괄이라 하기 어렵다. VLA·manipulation 1차 논문이 몇 건 들어오면 축별 비교가 가능해진다.
- 학습 경로 1·2단계는 물리 상호작용을 다루지 않는 인접 배경이다. 3~6단계는 한 프로젝트라서 SONIC의 관점이 과대 반영될 수 있다.
- 3번(서베이)과 4번(SONIC)의 선후는 취향이 갈릴 수 있다. 어휘를 먼저 쥐는 쪽을 택했다.
- 태그 어휘는 4번 분류로 검증한 수준이다. `robot-dataset`·`safety`·`benchmark`처럼 아직 한 번도 안 쓴 태그는 실제로 붙여 봐야 적절한지 안다. 바꿀 때는 `CLAUDE.md`의 표를 먼저 고친다.

## 관련 페이지 (Related Pages)

- [[physical-ai]] — 홈의 Physical AI 밴드. 4개 카드가 채워졌다.
- [[physical-ai/hou-2026-world-model-for-robot-learning|World Model for Robot Learning (Survey)]] — 문헌 지형도. 학습 경로 3단계.
- [[physical-ai/luo-2025-sonic-supersizing-motion-tracking|SONIC]] — motion tracking을 기본 과제로 삼은 humanoid 전신 제어 foundation model. 학습 경로 4단계.
- [[physical-ai/nvlabs-2026-gear-sonic-project-page|GEAR-SONIC 프로젝트 페이지]] — 동작 품질의 영상 증거. 학습 경로 5단계.
- [[physical-ai/nvlabs-gr00t-wholebodycontrol|GR00T-WholeBodyControl]] — 학습·배포 코드와 체크포인트. 학습 경로 6단계.
- [[llms/cai-2026-vlm3-vision-language-models|VLM3: Vision Language Models Are Native 3D Learners]] — 3D 인식을 표준 VLM의 SFT로 푸는 논문. 학습 경로 1단계.
- [[agents/zou-2026-task-focused-memorization-multimodal-agents|TaskMem: Task-Focused Memorization for Multimodal Agents]] — 1인칭 스트림에서 기억할 내용을 학습하는 프레임워크. 학습 경로 2단계.
