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
  - nvidia-2025-gr00t-n1-an-open-foundation.md
  - luo-2025-sonic-supersizing-motion-tracking.md
  - nvlabs-gr00t-wholebodycontrol.md
  - nvlabs-2026-gear-sonic-project-page.md
tags: [physical-ai, vla, world-model, robot-learning, humanoid, sim2real, roadmap, overview, synthesis]
study_path:
  - id: llms/cai-2026-vlm3-vision-language-models
    note: "표준 VLM에 세 가지 요소만 더해 depth·camera pose·pixel correspondence를 푼다. 물리 세계를 다루기 전 인식 축의 입구."
  - id: agents/zou-2026-task-focused-memorization-multimodal-agents
    note: "1인칭 스트리밍 영상에서 무엇을 기억할지를 policy로 학습한다. 긴 observation을 다루는 방식이 로봇 쪽 기억 설계와 맞닿는다."
    prereq: ["llms/cai-2026-vlm3-vision-language-models"]
  - id: physical-ai/hou-2026-world-model-for-robot-learning
    note: "43페이지 서베이. policy 결합 5분류와 학습된 시뮬레이터 역할로 문헌을 먼저 정리한다. 다음 단계의 어휘가 여기서 나온다."
    prereq: ["llms/cai-2026-vlm3-vision-language-models"]
  - id: physical-ai/nvidia-2025-gr00t-n1-an-open-foundation
    note: "GEAR가 만드는 humanoid manipulation VLA의 원형. Eagle-2 VLM(System 2)·flow-matching DiT(System 1) dual-system 구조가 이후 SONIC 3부작과 대비되는 기준점이 된다."
    prereq: ["llms/cai-2026-vlm3-vision-language-models"]
  - id: physical-ai/luo-2025-sonic-supersizing-motion-tracking
    note: "서베이가 다룬 영역에서 world model 없이 dense mocap supervision으로 가는 경로. 스케일링 곡선과 sim2real 수치가 실제로 어디까지 왔는지 보여준다."
    prereq: ["physical-ai/hou-2026-world-model-for-robot-learning"]
  - id: physical-ai/nvlabs-2026-gear-sonic-project-page
    note: "MPJPE 22.3mm이 실제로 어떤 걸음걸이인지 영상으로 확인한다. 논문 수치와 동작 품질 사이의 간격을 메우는 단계."
    prereq: ["physical-ai/luo-2025-sonic-supersizing-motion-tracking"]
  - id: physical-ai/nvlabs-gr00t-wholebodycontrol
    note: "논문의 설계가 코드에서 어떤 모양인지 본다. 체크포인트 2종·ZMQ·Jetson 배포처럼 논문에 없는 운영 제약이 여기 있다."
    prereq: ["physical-ai/luo-2025-sonic-supersizing-motion-tracking"]
---

## 요약 (Summary)

`wiki/physical-ai/`에 5개 페이지가 들어왔다. 이 문서는 그 카테고리의 허브로, 분류 기준과 태그 어휘, 읽는 순서를 모아 둔다.

들어온 자료는 세 덩이다. world model 계열의 문헌을 정리한 43페이지 서베이, NVIDIA GEAR의 humanoid manipulation VLA GR00T N1, 그리고 같은 GEAR 조직의 SONIC 3부작(논문·구현 저장소·데모 페이지)이다. GR00T N1과 SONIC은 이름이 겹쳐 헷갈리기 쉬운데 실은 분업 관계다. GR00T N1이 팔·손의 조작(manipulation)을 맡고 SONIC 계열이 균형과 이동을 포함해 몸 전체를 함께 제어하는 whole-body control을 맡는다. 정확한 용어 구분은 아래 "용어 정리" 절에 모아 뒀다. 서베이는 다시 이 두 계열과 반대 성격이다. "observation에서 환경 동역학을 배워 계획에 쓴다"는 world model 계열을 정리하는데 SONIC은 그런 예측 모델 없이 mocap 프레임마다 주어지는 목표 포즈만으로 whole-body control을 스케일링하는 쪽이다. 병목을 어디로 보느냐가 갈리는 지점이다.

아직 개괄이라 부르기엔 얇다. `wiki/physical-ai/`에는 이 5개 외에도 RT-1·RT-2·VLA 서베이 2종·world model 서베이 1종 추가·Silicon Valley RFM 산업 자료 2편·리뷰 영상 2편이 더 있지만 이 문서에는 아직 반영하지 못했다. 아래 학습 경로와 "지금 저장소에 있는 것"은 이번에 실제로 작업한 5개 페이지 기준으로만 적는다. 나머지를 섣불리 요약하면 근거 없는 개괄이 된다.

## 학습 경로

1. [[llms/cai-2026-vlm3-vision-language-models|VLM3 (Native 3D Learners)]] — 표준 VLM에 세 가지 요소만 더해 depth·camera pose·pixel correspondence를 푼다. 물리 세계를 다루기 전 인식 축의 입구.
2. [[agents/zou-2026-task-focused-memorization-multimodal-agents|TaskMem]] — 1인칭 스트리밍 영상에서 무엇을 기억할지를 policy로 학습한다. policy는 observation을 받아 다음 action을 정하는 함수를 말한다. 긴 observation을 다루는 방식이 로봇 쪽 기억 설계와 맞닿는다. (선수: VLM3)
3. [[physical-ai/hou-2026-world-model-for-robot-learning|World Model for Robot Learning (Survey)]] — policy 결합 5분류(IDM·single-backbone·MoE/MoT·unified VLA·latent)와 학습된 시뮬레이터의 두 용도로 문헌을 정리한다. 다음 단계에서 쓸 어휘가 여기서 나온다. (선수: VLM3)
4. [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation|GR00T N1]] — NVIDIA GEAR가 만드는 humanoid manipulation VLA의 원형. Eagle-2 VLM(System 2)과 flow-matching DiT(System 1)를 cross-attention으로 묶는 dual-system 구조를 확인한다. 뒤이은 SONIC 3부작이 왜 whole-body control을 따로 떼어 다루는지, 그 분업의 반대쪽 절반이 여기다. (선수: VLM3)
5. [[physical-ai/luo-2025-sonic-supersizing-motion-tracking|SONIC]] — 같은 영역에서 world model 없이 dense mocap supervision으로 가는 경로. 파라미터·데이터·compute 세 축 스케일링 곡선과 sim2real 수치가 현재 도달점을 보여준다. GR00T N1이 조작을, SONIC이 whole-body control을 맡는 분업의 다른 절반. (선수: 서베이)
6. [[physical-ai/nvlabs-2026-gear-sonic-project-page|GEAR-SONIC 프로젝트 페이지]] — MPJPE 22.3mm이 실제로 어떤 걸음걸이인지 영상으로 확인한다. 논문 수치와 동작 품질 사이의 간격을 메우는 단계. (선수: SONIC)
7. [[physical-ai/nvlabs-gr00t-wholebodycontrol|GR00T-WholeBodyControl]] — 논문 설계가 코드에서 어떤 모양인지 본다. 체크포인트 2종의 lookahead 차이, ZMQ 헤더 크기, Jetson 온보드 배포처럼 논문에 안 적힌 운영 제약이 여기 있다. (선수: SONIC)

3번을 5번보다 앞에 둔 건 서베이가 어휘를 먼저 주기 때문이다. 구체 사례부터 보는 걸 선호하면 5→3 순서로 바꿔도 무리는 없다. 4번(GR00T N1)은 서베이 어휘와 무관하게 배경 없이 바로 읽을 수 있어 두 자리 어디에 둬도 상관없다.

## 용어 정리: GEAR · GR00T · SONIC · GEAR-SONIC

이름이 비슷한 다섯 용어가 한 조직에서 나와 헷갈리기 쉽다. 층위부터 나누면 정리된다.

| 용어 | 층위 | 정체 | 관련 페이지 |
|---|---|---|---|
| GEAR | 조직 | NVIDIA 내부의 로봇·embodied agent 연구 조직 이름(Generalist Embodied Agent Research). 아래 모든 프로젝트가 이 조직에서 나온다 | — |
| GR00T | 모델 계열 | GEAR가 만드는 humanoid manipulation VLA foundation model의 이름. N1 → N1.5 → N1.6 → N1.7로 세대가 이어진다 | [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation\|GR00T N1]] |
| SONIC | 방법·논문 | Luo et al. 2025(arXiv 2511.07820)가 제안한 whole-body control 방법 이름. robot·human·hybrid 세 입력을 하나의 universal motion token으로 묶어 locomotion·teleoperation·manipulation을 한 policy에 태운다 | [[physical-ai/luo-2025-sonic-supersizing-motion-tracking\|SONIC 논문]] |
| GEAR-SONIC | 프로젝트 페이지 | SONIC 논문의 공식 데모 사이트 이름(`nvlabs.github.io/GEAR-SONIC`). 논문 자체가 아니라 텍스트는 abstract뿐이고 실질은 영상 갤러리인 페이지를 가리킨다 | [[physical-ai/nvlabs-2026-gear-sonic-project-page\|GEAR-SONIC 페이지]] |
| GR00T-WholeBodyControl | 코드 저장소 | GitHub 저장소 이름(`NVlabs/GR00T-WholeBodyControl`). GR00T 계열이 쓰는 whole-body control 컨트롤러 구현을 모은 monorepo | [[physical-ai/nvlabs-gr00t-wholebodycontrol\|WholeBodyControl repo]] |

헷갈리는 지점은 정확히 이름이 뒤바뀐 것처럼 보이는 곳이다. "GEAR-SONIC"이라는 이름에는 GR00T가 안 들어가는데 정작 GR00T라는 이름이 붙은 저장소(GR00T-WholeBodyControl)가 구현하는 최신 컨트롤러 이름이 GEAR-SONIC이다.

이 저장소 안에는 세 세대 컨트롤러가 함께 들어 있다. 하체 RL과 상체 IK를 분리했던 구세대 Decoupled WBC(GR00T N1.5·N1.6이 사용), robot·human·hybrid 입력을 하나의 token으로 묶은 현세대 GEAR-SONIC(= SONIC 논문의 구현체, GR00T N1.7부터 사용), 그리고 애니메이션·로보틱스용 실시간 latent 생성 모델 MotionBricks의 프리뷰다.

한 문장으로 줄이면 이렇다. **GR00T는 팔·손으로 물건을 조작하는 policy의 이름이고 SONIC/GEAR-SONIC은 몸통·다리로 균형과 이동을 담당하는 컨트롤러의 이름이다.** 두 계열은 따로 발전하다 GR00T-WholeBodyControl 저장소 안에서 합쳐진다. N1.5·N1.6은 Decoupled WBC와 짝을 이뤘고 N1.7부터는 SONIC과 짝을 이룬다. [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation|GR00T N1]]의 "이 저장소 안에서의 위치" 절과 [[physical-ai/nvlabs-gr00t-wholebodycontrol|WholeBodyControl repo]]의 "요약" 절이 이 분업을 각자의 시점에서 설명한다.

## 무엇이 physical-ai로 가는가

기준은 소재가 아니라 방법이다. 방법의 핵심에 센서 입력, 액추에이터 출력, 시뮬레이터, 실체 로봇이나 차량이 있으면 `physical-ai`다. 물리 도메인을 소재로 삼더라도 방법이 언어와 검색에 머무르면 원래 카테고리에 남는다.

| 자료 성격 | 카테고리 | 이유 |
|---|---|---|
| 로봇 팔 조작 policy를 학습하는 논문 | `physical-ai` | 액추에이터 출력이 방법의 중심 |
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

다섯 페이지를 실제로 분류하며 쓴 태그는 `humanoid`(4회) · `vla`(3회) · `teleoperation`(2회) · `world-model` · `robot-learning` · `imitation-learning` · `edge-inference` · `robot-dataset`이다. GR00T N1이 `robot-dataset` 태그를 처음 붙였다. 1~3개 상한은 유용했다. SONIC 논문은 sim2real 결과 절이 따로 있어서 후보가 다섯 개까지 나왔는데 상한이 있으니 "발견 경로로서 어느 태그가 더 값이 큰가"를 강제로 고르게 된다.

## 지금 저장소에 있는 것

| 항목 | 상태 |
|---|---|
| `wiki/physical-ai/` 페이지 (이 개괄이 다루는 범위) | 5개 (서베이 1 + GR00T N1 1 + SONIC 3부작) |
| `wiki/physical-ai/` 실제 전체 파일 수 | 더 많음 — RT-1·RT-2·VLA 서베이 2종·world model 서베이 추가 1종·Silicon Valley RFM 2편·리뷰 영상 2편이 있지만 아직 이 개괄에 편입되지 않았다 |
| 자료 유형 분포 (이 개괄 범위) | `paper` 3 · `repo` 1 · `article` 1 |
| 인접 페이지 | [[llms/cai-2026-vlm3-vision-language-models]] · [[agents/zou-2026-task-focused-memorization-multimodal-agents]] |
| 홈 밴드 | [[physical-ai]] — `index.md`에는 실제 전체 목록이 이미 반영돼 있다 |
| 분류 규칙 · 태그 어휘 | `CLAUDE.md`에 확정, 이 페이지에 사용 기록 |

서베이는 policy로서의 world model을 IDM-style·single-backbone·MoT-style·unified VLA·latent 다섯으로 가르고 학습된 시뮬레이터를 RL 환경과 후보 행동 채점 두 용도로 나눈다. 진단이 뚜렷하다. 병목이 "그럴듯한 미래"에서 "action에 인과적으로 aligned된 실행 가능한 미래"로 옮겨갔다고 본다.

GR00T N1은 이 병목을 데이터 쪽에서 다룬다. 웹 데이터·human video·시뮬레이션·실로봇 teleoperation을 data pyramid로 쌓고 액션 라벨이 없는 하위 계층에는 VQ-VAE latent action이나 IDM pseudo-action을 붙여 같은 손실 아래 넣는다. 서베이의 5분류로 보면 GR00T N1의 neural trajectory 증강이 latent·IDM 결합에 해당한다.

SONIC은 그 인과 정렬 문제를 우회하는 쪽에 가깝다. 미래를 예측하는 대신 mocap이 프레임마다 정답 포즈를 주므로 supervision이 이미 행동에 붙어 있다. 대가는 데이터 의존이다. 700시간 mocap을 G1에 retarget해 611시간을 남기는 작업이 방법의 전제다. 두 접근을 겹쳐 보면 "예측 모델을 잘 만들 것인가, 아니면 정답 trajectory를 많이 모을 것인가"라는 선택이 드러난다.

인접 두 페이지는 여전히 배경이다. VLM3은 카메라 focal length를 통일하고 픽셀 좌표를 텍스트로 표기하는 것만으로 표준 VLM이 metric depth와 camera pose를 푼다는 결과인데 로봇을 다루지 않지만 3D 인식을 별도 encoder 없이 언어 모델 안에서 처리하는 경로를 보여준다. TaskMem은 EgoLife·EgoTempo 같은 1인칭 스트림에서 저장할 내용을 RL로 고르는 프레임워크다. 방법이 순수 소프트웨어라 `agents`에 남아 있다.

## 앞으로 채울 자리

축별로 현재 상태를 적어 둔다. 없는 영역은 요약을 흉내 내지 않고 빈칸으로 남긴다.

- VLA — GR00T N1이 이 개괄에 처음 들어온 VLA 아키텍처 논문이다(Eagle-2 VLM + flow-matching DiT dual-system). SONIC은 `vla` 태그를 달고 있지만 VLA 아키텍처 논문이 아니라 GR00T N1.5/N1.7에 action space를 제공하는 쪽이다. RT-1·RT-2·VLA bimanual 서베이도 이미 저장소에 들어와 있지만 아직 이 개괄에는 반영하지 못했다. 다음 갱신 대상이다. OpenVLA·Diffusion Policy는 여전히 비어 있다.
- world model — 서베이 1건이 전반을 다루지만 1차 논문은 없다. 서베이가 인용한 대표 연구 중 하나를 넣으면 5분류가 실제 구현으로 확인된다.
- robot learning · imitation learning — SONIC이 mocap 기반 imitation의 대규모 사례를 채웠다. 데이터셋 쪽은 BONES-SEED를 `repos`로 받으면 `robot-dataset` 태그가 처음 붙는다.
- sim2real · simulator — SONIC의 sim2real 절(성공률 100.0%→99.2%, 발 MPJPE-L 29.0→53.7mm)이 수치를 하나 남겼다. sim2real 격차 자체를 방법으로 다루는 자료는 없다.
- humanoid · teleoperation · edge-inference — SONIC 3부작이 채웠다. Jetson Orin 온보드 1–2ms, 네 루프 멀티레이트 구조가 edge 쪽 참조점이다.
- autonomous driving · drone · slam · manipulation · safety · benchmark — 비어 있다.

새 자료는 `CLAUDE.md`의 6단계 파이프라인을 그대로 탄다. `raw/`에 원본을 복사하고 도식을 뽑은 뒤 `sources/`에 요약을 쓴다. 큐레이션을 확인하고 `wiki/physical-ai/`에 페이지를 만들고 `index.md`의 Physical AI 섹션에 한 줄을 넣는다. 이 페이지의 `study_path`와 `## 학습 경로`에도 단계를 끼워 넣는다.

## 이 페이지의 한계

- 이 개괄이 실제로 다룬 건 5개 페이지, 세 프로젝트(서베이·GR00T N1·SONIC 3부작)뿐이다. `wiki/physical-ai/`에는 이미 RT-1·RT-2·VLA 서베이 2종·world model 서베이 추가 1종·Silicon Valley RFM 2편·리뷰 영상 2편이 더 있는데 `index.md`에는 각각 한 줄씩 반영돼 있지만 이 개괄의 학습 경로·용어 정리·태그 통계에는 아직 들어오지 않았다. 다음 갱신에서 이 부분을 메워야 이름 그대로 카테고리 허브가 된다.
- 학습 경로 1·2단계는 물리 상호작용을 다루지 않는 인접 배경이다. 4~7단계는 GEAR 한 조직에서 나온 두 프로젝트라서 그쪽 관점이 과대 반영될 수 있다.
- 3번(서베이)과 5번(SONIC)의 선후는 취향이 갈릴 수 있다. 어휘를 먼저 익히는 쪽을 택했다.
- 태그 어휘는 5개 페이지 분류로 검증한 수준이다. `robot-dataset`·`safety`·`benchmark`처럼 아직 한 번도 안 쓴 태그는 실제로 붙여 봐야 적절한지 안다. 바꿀 때는 `CLAUDE.md`의 표를 먼저 고친다.

## 관련 페이지 (Related Pages)

- [[physical-ai]] — 홈의 Physical AI 밴드. `index.md`에는 이 개괄보다 많은 페이지가 이미 올라 있다.
- [[physical-ai/hou-2026-world-model-for-robot-learning|World Model for Robot Learning (Survey)]] — 문헌을 정리한 서베이. 학습 경로 3단계.
- [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation|GR00T N1]] — humanoid manipulation VLA. 학습 경로 4단계. "용어 정리" 절에서 SONIC과의 분업 참고.
- [[physical-ai/luo-2025-sonic-supersizing-motion-tracking|SONIC]] — motion tracking을 기본 과제로 삼은 humanoid whole-body control foundation model. 학습 경로 5단계.
- [[physical-ai/nvlabs-2026-gear-sonic-project-page|GEAR-SONIC 프로젝트 페이지]] — 동작 품질의 영상 증거. 학습 경로 6단계.
- [[physical-ai/nvlabs-gr00t-wholebodycontrol|GR00T-WholeBodyControl]] — 학습·배포 코드와 체크포인트. 학습 경로 7단계.
- [[llms/cai-2026-vlm3-vision-language-models|VLM3: Vision Language Models Are Native 3D Learners]] — 3D 인식을 표준 VLM의 SFT로 푸는 논문. 학습 경로 1단계.
- [[physical-ai/liu-2025-generative-physical-ai-in-vision|Generative Physical AI in Vision (Survey)]] — 생성 모델이 물리 법칙을 지키게 만드는 연구 지형. world model을 예측이 아니라 생성 쪽에서 본다.
- [[physical-ai/9bow-2026-physics-aware-generation-world-simulator|물리를 이해하는 생성 모델과 월드 시뮬레이터 (9bow)]] — 위 서베이의 한글 해설.
- [[agents/zou-2026-task-focused-memorization-multimodal-agents|TaskMem: Task-Focused Memorization for Multimodal Agents]] — 1인칭 스트림에서 기억할 내용을 학습하는 프레임워크. 학습 경로 2단계.
