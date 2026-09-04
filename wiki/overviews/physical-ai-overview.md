---
title: "Physical AI — 카테고리 지도와 학습 경로"
type: overview
year: 2026
category: overviews
source_collection: synthesis
sources:
  - brohan-2022-rt-1-robotics-transformer-for-real-world.md
  - brohan-2023-rt-2-vision-language-action-models-transfer-web.md
  - kim-2024-openvla-an-open-source-vision-language-action-model.md
  - black-2024-pi0-a-vision-language-action-flow-model.md
  - black-2025-pi05-a-vision-language-action-model-with.md
  - amin-2025-pistar06-a-vla-that-learns.md
  - figure-ai-2025-helix-a-vision-language-action.md
  - nvidia-2025-gr00t-n1-an-open-foundation.md
  - cui-2025-openhelix-a-short-survey-empirical.md
  - zhai-2025-igniting-vlms-toward-the-embodied.md
  - shukor-2025-smolvla-a-vision-language-action-model.md
  - zhao-2023-learning-fine-grained-bimanual-manipulation.md
  - open-x-embodiment-2023-robotic-learning-datasets-and-rt-x.md
  - huggingface-lerobot.md
  - kawaharazuka-2025-vision-language-action-models-for-robotics.md
  - xu-2025-an-anatomy-of-vision-language-action-models.md
  - sa-2026-vision-language-action-models-for.md
  - zhang-2026-a-survey-of-physical-ai.md
  - hou-2026-world-model-for-robot-learning.md
  - li-2025-a-comprehensive-survey-on-world.md
  - liu-2025-generative-physical-ai-in-vision.md
  - reuss-2026-pretrained-to-imagine-fine-tuned.md
  - luo-2025-sonic-supersizing-motion-tracking.md
  - nvidia-2025-cosmos-world-foundation-model-platform.md
  - wu-2023-unleashing-large-scale-video-generative.md
  - ai-2026-pi07-a-steerable-generalist-robotic.md
  - xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry.md
  - ros-navigation-navigation2.md
tags: [physical-ai, vla, world-model, roadmap, overview, synthesis]
study_path:
  - id: physical-ai/jo-2026-rt-1-vla-primer
    note: "한국어 입문 해설로 policy·episode·imitation learning 어휘를 먼저 잡는다. 논문을 바로 열지 않아도 되는 진입로."
  - id: physical-ai/brohan-2022-rt-1-robotics-transformer-for-real-world
    note: "이미지와 언어를 토큰으로 바꿔 Transformer에 넣는다는 발상의 원점. 35M·3Hz·256 bin이라는 출발 지점의 크기를 기억해 둘 것."
    prereq: ["physical-ai/jo-2026-rt-1-vla-primer"]
  - id: physical-ai/brohan-2023-rt-2-vision-language-action-models-transfer-web
    note: "VLA라는 범주가 여기서 생긴다. 웹 VQA를 배치에 계속 섞는 co-fine-tuning이 핵심 레시피다."
    prereq: ["physical-ai/brohan-2022-rt-1-robotics-transformer-for-real-world"]
  - id: physical-ai/open-x-embodiment-2023-robotic-learning-datasets-and-rt-x
    note: "축이 한 모델 여러 과제에서 한 모델 여러 로봇으로 넘어간다. 이후 거의 모든 오픈 VLA의 학습 데이터."
    prereq: ["physical-ai/brohan-2023-rt-2-vision-language-action-models-transfer-web"]
  - id: physical-ai/kim-2024-openvla-an-open-source-vision-language-action-model
    note: "RT-2 계보의 첫 완전 오픈소스 재현. 7B가 55B를 앞서면서 action tokenization이 표준으로 굳는다."
    prereq: ["physical-ai/open-x-embodiment-2023-robotic-learning-datasets-and-rt-x"]
  - id: physical-ai/zhao-2023-learning-fine-grained-bimanual-manipulation
    note: "action chunking의 출처. 이산 토큰 계열과 다른 갈래라 π0을 읽기 전에 봐 두면 대비가 선명하다."
  - id: physical-ai/black-2024-pi0-a-vision-language-action-flow-model
    note: "이산 토큰 전제를 버리고 flow matching으로 연속 action을 낸다. control frequency가 50Hz로 올라가는 지점."
    prereq: ["physical-ai/kim-2024-openvla-an-open-source-vision-language-action-model", "physical-ai/zhao-2023-learning-fine-grained-bimanual-manipulation"]
  - id: physical-ai/figure-ai-2025-helix-a-vision-language-action
    note: "느린 VLM과 빠른 visuomotor policy를 갈라 붙이는 dual-system 구조. 7B/80M·200Hz 수치가 기준점이 된다."
    prereq: ["physical-ai/black-2024-pi0-a-vision-language-action-flow-model"]
  - id: physical-ai/cui-2025-openhelix-a-short-survey-empirical
    note: "dual-system에 판정 기준을 세우고 설계 축 7개를 실험으로 확인한다. 용어가 헐거워지는 것을 막는 자리."
    prereq: ["physical-ai/figure-ai-2025-helix-a-vision-language-action"]
  - id: physical-ai/kawaharazuka-2025-vision-language-action-models-for-robotics
    note: "여기까지 온 뒤 서베이로 좌표계를 맞춘다. backbone×action head 7분류가 앞서 읽은 모델들을 제자리에 놓아 준다."
    prereq: ["physical-ai/cui-2025-openhelix-a-short-survey-empirical"]
  - id: physical-ai/hou-2026-world-model-for-robot-learning
    note: "VLA 축을 벗어나 world model 축으로 건너간다. policy 결합 5분류가 다음 갈래의 어휘다."
    prereq: ["physical-ai/kawaharazuka-2025-vision-language-action-models-for-robotics"]
---

## 요약 (Summary)

`wiki/physical-ai/`는 76개 페이지로 늘었다. 이 문서는 그 지도다. 무엇이 어디에 있고 어떤 순서로 읽으면 되는지, 분류 기준과 태그 어휘는 무엇인지를 모은다.

가장 먼저 눈에 띄는 건 카테고리가 실은 두 도메인이라는 점이다. 한쪽은 VLA와 foundation model 축으로 `vla` 태그가 붙은 페이지만 52개다. 다른 쪽은 고전 로보틱스 스택으로 LiDAR odometry 계열 6개와 Nav2 계열 4개가 자기들끼리만 링크를 주고받는다. 두 덩이 사이에는 상호 참조가 거의 없다. CLAUDE.md가 정한 40페이지 분할 검토선을 이미 넘겼으니 아래 "분할을 검토할 자리" 절에서 따로 다룬다.

두 번째 특징은 자료가 낱개가 아니라 클러스터로 들어왔다는 것이다. 논문 하나를 놓고 원논문·공식 발표글·구현 저장소·한국어 해설을 함께 갖고 있는 프로젝트가 여럿이다. 겹마다 주는 게 달라서 이 중복은 낭비가 아니다. 이 점은 "클러스터로 쌓인다" 절에 정리했다.

## 클러스터로 쌓인다

프로젝트 단위로 묶으면 카테고리의 모양이 드러난다. 아래 표에서 한 페이지가 두 묶음에 걸치는 경우가 있어 합계는 76과 정확히 맞지 않는다.

| 클러스터 | 페이지 | 무엇이 모여 있나 |
|---|---|---|
| π 계열 (Physical Intelligence) | 10 | 논문 4(π0·π0.5·π*0.6·π0.7) + 공식 발표글 4 + `openpi` 저장소 + 한국어 primer 1 |
| GR00T·GEAR (NVIDIA) | 9 | N1 논문 + N1.5 프로젝트 페이지 + NVIDIA 개발자 블로그 + `Isaac-GR00T`(N1.7) + primer 2(N1·N1.5) + SONIC 3부작 |
| RT 계열 (Google) | 6 | RT-1·RT-2 논문 + primer 2 + 한국어 리뷰 영상 + Open X-Embodiment(RT-X) |
| FAST-LIO 계열 | 6 | 논문 2 + 공식 저장소 + 한국어 리뷰 3(글 1·영상 2, Faster-LIO 포함) |
| WALL-OSS (X Square Robot) | 5 | 논문 2 + `wall-x` 저장소 + 프로젝트 페이지 + primer |
| Helix·dual-system | 4 | Figure 발표문 + 한국어 소개 + OpenHelix 논문 + Awesome-Dual-System-VLA |
| Nav2 | 4 | 공식 저장소 + 공식 문서 + 한국어 개념 정리 2 |
| RoboCasa (UT Austin·NVIDIA) | 4 | 논문 2(RoboCasa RSS 2024·RoboCasa365 ICLR 2026) + `robocasa` 저장소 + 프로젝트 페이지. 모델이 아니라 모델을 재는 무대 쪽 클러스터 |
| GR-1 (ByteDance) | 2 | 논문 + 공식 저장소. 영상 생성 pre-training을 VLA로 잇는 계열의 원형 |
| 서베이 | 9 | VLA 3(kawaharazuka·xu·sa) + world model 4(hou·li·liu·reuss) + VLN 1 + Physical AI 전체 1 |
| 개별 모델·프레임워크 | — | OpenVLA·SmolVLA·ACT/ALOHA(각 논문+primer) · LeRobot · ASPIRE · GEN-1.5 · Cosmos WFM |
| 계보 개괄 | 3 | engiuniverse 영상 2 + LearnOpenCV 튜토리얼 1 |
| awesome 리스트 | 3 | keon · natnew · openhelix-robot |
| 산업 현황 | 2 | 실리콘밸리 RFM 1·2편 |

같은 프로젝트를 여러 겹으로 갖는 게 왜 값이 있는지는 π 계열이 잘 보여준다. 논문은 방법과 ablation을 준다. 같은 날 올라온 공식 발표글에는 논문이 막대그래프로만 준 수치가 숫자로 적혀 있고 무편집 데모 영상이 붙는다. `openpi` 저장소에는 논문 이후에 나온 체크포인트와 배포 제약이 있다. 한국어 primer는 강화학습 예비 지식을 앞에 깔아 진입 문턱을 낮춘다. GR00T 클러스터도 같은 구조인데, 여기서는 저장소가 논문에 없는 GPU 사양과 Jetson 배포 스택을 담당한다.

한국어 자료가 유독 두껍다는 것도 이 저장소의 성격이다. WikiDocs primer 9편(RT-1·RT-2·ACT·OpenVLA·π*0.6·SmolVLA·WALL-OSS·GR00T N1·GR00T N1.5)이 VLA 본류를 거의 그대로 따라간다. 여기에 PyTorch KR 해설 2편, 로봇 엔지니어 채널 영상 2편, 실리콘밸리 RFM 연재 2편, SLAM·Nav2 한국어 자료 5편이 붙는다. 원논문을 열기 전에 들를 곳이 대부분의 주요 모델에 하나씩은 있다.

## 학습 경로

VLA 본류를 따라가는 A 트랙이 기본이다. B와 C는 성격이 달라 따로 뒀다.

### A 트랙 — VLA 계보

1. [[physical-ai/jo-2026-rt-1-vla-primer|RT-1 primer]] — policy·episode·imitation learning 어휘를 한국어로 먼저 잡는다. policy는 현재 observation을 받아 다음 action을 정하는 함수를 말한다.
2. [[physical-ai/brohan-2022-rt-1-robotics-transformer-for-real-world|RT-1]] — 이미지와 언어를 토큰으로 바꿔 Transformer에 넣는다는 발상의 원점. 35M·3Hz·256 bin이라는 출발 지점의 크기가 뒤 단계와의 대비를 만든다.
3. [[physical-ai/brohan-2023-rt-2-vision-language-action-models-transfer-web|RT-2]] — VLA라는 범주가 생기는 자리. 로봇 데이터만이 아니라 웹 VQA를 배치에 계속 섞는 co-fine-tuning이 핵심 레시피다.
4. [[physical-ai/open-x-embodiment-2023-robotic-learning-datasets-and-rt-x|Open X-Embodiment]] — 축이 "한 모델 여러 과제"에서 "한 모델 여러 로봇"으로 넘어간다. 이후 오픈 VLA 대부분의 학습 데이터가 여기다.
5. [[physical-ai/kim-2024-openvla-an-open-source-vision-language-action-model|OpenVLA]] — RT-2 계보의 첫 완전 오픈소스 재현. 7B가 55B RT-2-X를 앞서면서 action tokenization이 사실상 표준이 된다.
6. [[physical-ai/zhao-2023-learning-fine-grained-bimanual-manipulation|ACT / ALOHA]] — action chunking의 출처. action chunking은 미래 여러 스텝의 action을 한 묶음으로 예측하는 방식이다. 이산 토큰 계열과 다른 갈래라 다음 단계와 대비된다.
7. [[physical-ai/black-2024-pi0-a-vision-language-action-flow-model|π0]] — 이산 토큰 전제를 버리고 flow matching으로 연속 action을 낸다. control frequency가 50Hz로 올라가는 지점.
8. [[physical-ai/figure-ai-2025-helix-a-vision-language-action|Helix]] — 느린 VLM과 빠른 visuomotor policy를 갈라 붙이는 dual-system 구조. 7B/80M·200Hz가 기준 수치가 된다.
9. [[physical-ai/cui-2025-openhelix-a-short-survey-empirical|OpenHelix]] — dual-system에 판정 기준을 세우고 설계 축 7개를 실험으로 확인한다. 용어가 헐거워지는 것을 막는 자리다.
10. [[physical-ai/kawaharazuka-2025-vision-language-action-models-for-robotics|VLA full-stack 서베이]] — 여기까지 온 뒤 좌표계를 맞춘다. backbone×action head 7분류가 앞서 읽은 모델들을 제자리에 놓아 준다.

곁길이 넷 있다. prompt에 무엇을 넣느냐로 데이터를 살리는 방향이면 [[physical-ai/ai-2026-pi07-a-steerable-generalist-robotic|π0.7]](episode metadata·subgoal image), 규모를 줄이는 방향이 궁금하면 [[physical-ai/shukor-2025-smolvla-a-vision-language-action-model|SmolVLA]](450M·GPU 한 장), 학습 신호를 현장으로 옮기는 방향이면 [[physical-ai/amin-2025-pistar06-a-vla-that-learns|π*0.6]](RECAP), pre-training 자체를 policy로 쓰는 방향이면 [[physical-ai/x-square-robot-2026-wall-oss-05-technical-report|Wall-OSS-0.5]]다. 뒤의 셋은 앞에 한국어 primer가 하나씩 붙어 있다.

전체 계보를 30분 안에 훑고 싶으면 [[physical-ai/engiuniverse-2025-14-key-physical-ai-papers|엥지유니버스 14편 리뷰]]나 [[physical-ai/learnopencv-2025-vision-language-action-models-vla|LearnOpenCV 튜토리얼]]이 지름길이다. 다만 둘 다 개괄이라 수치 근거가 필요한 비교에는 원논문을 봐야 한다.

### B 트랙 — world model과 생성

1. [[physical-ai/hou-2026-world-model-for-robot-learning|World Model for Robot Learning (Survey)]] — policy 결합 5분류(IDM·single-backbone·MoE/MoT·unified VLA·latent)와 학습된 시뮬레이터 두 용도로 문헌을 가른다. 병목을 "그럴듯한 미래"가 아니라 "action에 인과적으로 alignment된 실행 가능한 미래"로 옮겨 잡는다.
2. [[physical-ai/li-2025-a-comprehensive-survey-on-world|World Models for Embodied AI (Survey)]] — 로보틱스·자율주행·범용 비디오를 하나의 좌표계에 올린다. 결합도·시간 전개·장면 형식 세 축.
3. [[physical-ai/reuss-2026-pretrained-to-imagine-fine-tuned|World-Action Models]] — VLM에서 출발하는 기존 VLA 옆에 영상 backbone에서 출발하는 두 번째 레시피가 자리 잡는 중이라는 지형도. A 트랙과 B 트랙이 만나는 지점이다. 그 두 번째 레시피의 원형이 [[physical-ai/wu-2023-unleashing-large-scale-video-generative|GR-1]]로, Ego4D 1인칭 영상 80만 clip에 다음 프레임 예측을 먼저 학습시킨 뒤 같은 모델에 상태 입력과 action 출력만 얹는다.
4. [[physical-ai/liu-2025-generative-physical-ai-in-vision|Generative Physical AI in Vision (Survey)]] — 생성 모델이 물리 법칙을 지키게 만드는 쪽. 한국어 해설은 [[physical-ai/9bow-2026-physics-aware-generation-world-simulator|PyTorch KR 2편]].
5. [[physical-ai/nvidia-2025-cosmos-world-foundation-model-platform|Cosmos WFM Platform]] — 서베이 넷이 그려 둔 지형의 1차 구현. world foundation model을 데이터 큐레이션부터 tokenizer·pre-training·downstream fine-tuning까지 플랫폼 단위로 묶어 내놓는다. 앞의 분류가 실제 파이프라인에서 어떻게 생겼는지 확인하는 자리다.

### C 트랙 — 고전 로보틱스 스택

VLA와 직접 이어지지 않는다. 실기기를 굴리려면 필요한 층이다.

- LiDAR odometry — [[physical-ai/xu-2020-fast-lio-a-fast-robust-lidar-inertial|FAST-LIO]] → [[physical-ai/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry|FAST-LIO2]] → [[physical-ai/hku-mars-fast-lio|공식 저장소]]. 수식이 막히면 [[physical-ai/taeyoung-2022-fast-lio-paper-review|한국어 리뷰]]나 [[physical-ai/airlab-2024-fast-lio-a-fast-robust|12분 세미나]]가 있고, ikd-Tree를 해시 voxel로 바꾼 후속은 [[physical-ai/irasc-2024-faster-lio-lightweight-tightly-coupled|Faster-LIO 해설]]이 다룬다.
- 이동 로봇 내비게이션 — [[physical-ai/yhoons-2024-ros2-nav2-intro|Nav2 입문]] → [[physical-ai/lionhong-2023-nav2-core-concepts|개념 정리]] → [[physical-ai/nav2-2026-official-documentation|공식 문서]] → [[physical-ai/ros-navigation-navigation2|소스 저장소]].

## 이름이 겹치는 GEAR · GR00T · SONIC

이름이 비슷한 다섯 용어가 한 조직에서 나와 헷갈리기 쉽다. 층위부터 나누면 정리된다.

| 용어 | 층위 | 정체 | 관련 페이지 |
|---|---|---|---|
| GEAR | 조직 | NVIDIA 내부의 로봇·embodied agent 연구 조직 이름(Generalist Embodied Agent Research). 아래 모든 프로젝트가 이 조직에서 나온다 | — |
| GR00T | 모델 계열 | GEAR가 만드는 humanoid manipulation VLA foundation model의 이름. N1 → N1.5 → N1.6 → N1.7로 세대가 이어진다 | [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation\|GR00T N1]] · [[physical-ai/nvidia-isaac-gr00t\|Isaac-GR00T(N1.7)]] |
| SONIC | 방법·논문 | Luo et al. 2025(arXiv 2511.07820)가 제안한 whole-body control 방법 이름. robot·human·hybrid 세 입력을 하나의 universal motion token으로 묶어 locomotion·teleoperation·manipulation을 한 policy에 태운다 | [[physical-ai/luo-2025-sonic-supersizing-motion-tracking\|SONIC 논문]] |
| GEAR-SONIC | 프로젝트 페이지 | SONIC 논문의 공식 데모 사이트 이름(`nvlabs.github.io/GEAR-SONIC`). 텍스트는 abstract뿐이고 실질은 영상 갤러리다 | [[physical-ai/nvlabs-2026-gear-sonic-project-page\|GEAR-SONIC 페이지]] |
| GR00T-WholeBodyControl | 코드 저장소 | GitHub 저장소 이름(`NVlabs/GR00T-WholeBodyControl`). GR00T 계열이 쓰는 whole-body control 컨트롤러 구현을 모은 monorepo | [[physical-ai/nvlabs-gr00t-wholebodycontrol\|WholeBodyControl repo]] |

헷갈리는 지점은 정확히 이름이 뒤바뀐 것처럼 보이는 곳이다. "GEAR-SONIC"이라는 이름에는 GR00T가 안 들어가는데 정작 GR00T라는 이름이 붙은 저장소가 구현하는 최신 컨트롤러 이름이 GEAR-SONIC이다.

이 저장소 안에는 세 세대 컨트롤러가 함께 들어 있다. 하체 RL과 상체 IK를 분리했던 구세대 Decoupled WBC(GR00T N1.5·N1.6이 사용), robot·human·hybrid 입력을 하나의 토큰으로 묶은 현세대 GEAR-SONIC(SONIC 논문의 구현체, GR00T N1.7부터 사용), 그리고 실시간 latent 생성 모델 MotionBricks의 프리뷰다.

한 문장으로 줄이면 이렇다. GR00T는 팔·손으로 물건을 다루는 policy의 이름이고 SONIC/GEAR-SONIC은 몸통·다리로 균형과 이동을 담당하는 컨트롤러의 이름이다. 두 계열은 따로 발전하다 GR00T-WholeBodyControl 저장소 안에서 합쳐진다. N1.5·N1.6은 Decoupled WBC와 짝을 이뤘고 N1.7부터는 SONIC과 짝을 이룬다.

## 무엇이 physical-ai로 가는가

기준은 소재가 아니라 방법이다. 방법의 핵심에 센서 입력, 액추에이터 출력, 시뮬레이터, 실체 로봇이나 차량이 있으면 `physical-ai`다. 물리 도메인을 소재로 삼더라도 방법이 언어와 검색에 머무르면 원래 카테고리에 남는다.

| 자료 성격 | 카테고리 | 이유 |
|---|---|---|
| 로봇 팔 조작 policy를 학습하는 논문 | `physical-ai` | 액추에이터 출력이 방법의 중심 |
| 시뮬레이터에서 학습해 실기기로 옮기는 기법 | `physical-ai` | sim2real 자체가 방법 |
| 논문의 공식 구현 저장소·데모 페이지 | `physical-ai` | 같은 프로젝트는 `type`이 달라도 한 카테고리에 모은다 |
| 로봇 매뉴얼 RAG의 검색 성능 평가 | `evaluations` | 소재만 로봇, 방법은 검색 평가 |
| 순수 VLM 아키텍처 논문 | `llms` | 물리 상호작용 없음. 이 허브에서 상호 링크 |

세 번째 줄이 실제로 가장 많이 쓰인 판단이다. 클러스터 표의 π 계열·GR00T·WALL-OSS·Nav2·FAST-LIO가 전부 여기 해당한다. 논문은 `paper`, 저장소는 `repo`, 발표글과 문서는 `article`, 리뷰는 `video`지만 전부 `physical-ai`에 두고 서로 링크했다. `type`과 `category`는 독립 축이라 유형이 갈려도 분류는 방법을 따른다.

경계가 애매하면 "미래의 내가 어느 카테고리에서 찾을 때 더 빨리 발견하는가"로 정한다.

## 태그 어휘와 실제 사용

physical-ai 페이지는 도메인 루트 태그 `physical-ai`를 달고 아래에서 1~3개를 고른다. 표기는 하나만 허용한다.

| 묶음 | 태그 (괄호는 76개 페이지에서의 사용 횟수) |
|---|---|
| 학습·제어 방법 | `vla`(52) · `robot-learning`(39) · `world-model`(14) · `imitation-learning`(8) · `rl-control`(3) |
| 플랫폼·응용 | `manipulation`(38) · `humanoid`(14) · `mobile-robot`(8) · `drone`(2) · `autonomous-driving`(2) · `locomotion`(0) |
| 환경·인식 | `slam`(7) · `simulator`(7) · `teleoperation`(3) · `sim2real`(1) · `3d-perception`(1) · `spatial-reasoning`(1) |
| 자원·운영 | `benchmark`(12) · `robot-dataset`(9) · `edge-inference`(8) · `hardware`(0) · `safety`(0) |

분포가 한쪽으로 크게 쏠려 있다. `vla`가 52회로 전체의 68%라 발견 경로로서의 변별력이 거의 없다. `robot-learning`(39)도 사정이 같다. 반대로 `hardware`·`safety`·`locomotion` 셋은 한 번도 안 쓰였다. SONIC 계열이 locomotion을 다루는데도 `humanoid`·`teleoperation`으로 붙은 결과다.

1~3개 상한은 지켜지지 않고 있다. 76개 중 19개(25%)가 4개를 달았다. 대부분 `vla`+`robot-learning`+`manipulation`에 하나를 더한 조합이라, 상한을 넘긴 게 아니라 앞의 세 태그가 거의 자동으로 붙는 게 원인에 가깝다. 상한을 4로 올릴지, `vla`·`robot-learning`을 루트 태그처럼 취급해 카운트에서 뺄지는 CLAUDE.md를 고쳐야 하는 결정이라 여기서는 기록만 한다.

통제 어휘 밖 태그는 한 건 있었다. 엥지유니버스 14편 리뷰가 `video`를 달고 있었는데 이건 태그가 아니라 `type` 값이라 지웠다.

## 분할을 검토할 자리

CLAUDE.md는 `wiki/physical-ai/`가 40페이지를 넘으면 하위 폴더 분할을 다시 보라고 적어 뒀다. 지금 76개다.

나눌 선은 태그 분포가 이미 그려 준다.

| 묶음 | 페이지 | 성격 |
|---|---|---|
| VLA·foundation model | 약 54 | 학습된 policy가 중심. 서로 조밀하게 링크된다 |
| 고전 로보틱스 스택 | 10 | FAST-LIO 6 + Nav2 4. 기하·필터·플래닝이 중심이고 위 묶음과 상호 참조가 거의 없다 |
| world model·생성 | 7 | 예측·시뮬레이션 축. VLA 쪽과 서베이를 통해 이어진다 |

가장 명확한 후보는 고전 스택 10개다. 두 FAST-LIO 논문과 Nav2 문서가 VLA 페이지를 인용할 일이 없고 그 반대도 마찬가지다. 다만 10개는 폴더를 새로 파기엔 적은 수라 아직은 태그로 충분하다는 판단도 가능하다. VLA 묶음이 더 커져 다시 나눠야 할 때가 오면 그때는 계보 축(RT→OpenVLA→π→dual-system)과 서베이·해설 축으로 가르는 편이 자연스럽다. 실제 분할은 CLAUDE.md의 디렉터리 규약을 함께 고쳐야 해서 여기서는 선택지만 남긴다.

## 지금 저장소에 있는 것

| 항목 | 값 |
|---|---|
| `wiki/physical-ai/` 페이지 | 76 |
| 자료 유형 | `article` 31 · `paper` 29 · `repo` 12 · `video` 4 |
| 연도 분포 | 2026: 31 · 2025: 25 · 2024: 9 · 2023: 5 · 2022: 2 · 2021: 1 · 2020: 2 · 2018: 1 |
| 한국어 자료 | 20 (WikiDocs primer 9 · PyTorch KR 2 · 영상 리뷰 4 · RFM 연재 2 · SLAM/Nav2 3) |
| 인접 카테고리 페이지 | [[llms/cai-2026-vlm3-vision-language-models]] · [[llms/chen-2025-eagle-25-boosting-long-context-post-training]] · [[llms/nvlabs-eagle]] · [[agents/zou-2026-task-focused-memorization-multimodal-agents]] |
| 용어 SSOT | [[overviews/glossary-physical-ai]] (79개 용어) |
| 홈 밴드 | `index.md`의 Physical AI 절에 76줄이 모두 올라 있다 |

연도 분포에서 읽히는 게 하나 있다. 2026년 자료 31개는 한동안 한국어 primer와 서베이가 대부분이었는데, π0.7이 들어오면서 1차 연구도 섞이기 시작했다. 여전히 원논문의 무게중심은 2024~2025년이고 2026년은 그것을 정리·해설하는 층이 함께 두꺼워지는 해다.

## 앞으로 채울 자리

- Octo — 계보에서 반복해 언급되는데 원본이 없다. Open X-Embodiment 위에서 diffusion head로 간 93M generalist policy라 OpenVLA와 나란히 놓으면 이산 토큰과 diffusion decoder의 대비가 선명해진다.
- Diffusion Policy — action chunking과 함께 거의 모든 서베이가 인용하는데 원본이 없다. ACT와 π0 사이의 빈칸이다. [[physical-ai/nasiriany-2026-robocasa365-a-large-scale-simulation-framework|RoboCasa365]]가 π0·π0.5·GR00T N1.5와 같은 조건에서 잰 수치를 주긴 하지만 방법 자체의 설명은 여전히 없다.
- Gemini Robotics — 세 개괄 자료가 전부 다루지만 원본이 없다. 클라우드·온보드 분리 배치가 다른 곳에 없는 축이다.
- world model 1차 논문 — [[physical-ai/nvidia-2025-cosmos-world-foundation-model-platform|Cosmos WFM]]과 [[physical-ai/wu-2023-unleashing-large-scale-video-generative|GR-1]]이 들어오면서 절반은 채워졌다. 남은 빈칸은 latent 공간에서 미래를 굴리는 계열이다. hou 서베이의 policy 결합 5분류 중 latent 항목에 놓을 원본이 아직 없다.
- 시뮬레이션 벤치마크 — [[physical-ai/nasiriany-2024-robocasa-large-scale-simulation-of-everyday|RoboCasa]] 계열 4종이 들어오면서 `simulator`·`benchmark` 축이 처음 두꺼워졌다. 남은 빈칸은 비교 대상으로 반복 인용되는 Behavior-1K·ManiSkill·LIBERO·Isaac Lab이다. 지금은 RoboCasa 논문의 비교표로만 알고 있다.
- `safety`·`hardware` — 태그는 있는데 자료가 없다. 로봇 안전 표준이나 실기기 하드웨어 자료가 들어오면 처음 붙는다.
- `locomotion` — SONIC 계열이 실질적으로 다루지만 태그가 안 붙었다. 자료를 늘리기보다 기존 페이지의 태그를 다시 보는 쪽이 맞다.
- 자율주행 — `autonomous-driving`은 2회로 늘었지만 둘 다 world model 자료의 응용 절이다(서베이 한 절, Cosmos의 downstream 하나). 카테고리 정의에는 들어 있는데 자율주행 자체를 다룬 1차 자료는 여전히 없다.

새 자료는 CLAUDE.md의 6단계 파이프라인을 그대로 탄다. `raw/`에 원본을 복사하고 도식을 뽑은 뒤 `sources/`에 요약을 쓴다. 큐레이션을 확인하고 `wiki/physical-ai/`에 페이지를 만들고 `index.md`에 한 줄을 넣는다. 계보에서 자리가 분명한 자료면 이 페이지의 `study_path`와 A 트랙에도 단계를 끼워 넣는다.

## 이 페이지의 한계

- 학습 경로는 76개 중 A 트랙 10개 + 곁길 4개 + B 트랙 5개 + C 트랙 10개만 배치한다. 나머지는 클러스터 표와 `index.md`로 찾아야 한다. 모든 페이지에 읽는 순서를 매기는 건 지도가 아니라 목록이 된다.
- 클러스터 표의 페이지 수는 한 페이지가 두 묶음에 걸치는 경우를 중복으로 세서 합이 76과 맞지 않는다.
- A 트랙의 6번(ACT/ALOHA)과 7번(π0) 사이 순서는 취향이 갈릴 수 있다. action chunking을 먼저 보는 쪽을 택했는데 이산 토큰 계열을 끝까지 따라가고 싶으면 6번을 뒤로 미뤄도 된다.
- 태그 통계와 분할 논의는 지금 시점의 스냅샷이다. 페이지가 늘면 다시 세야 한다.
- 이 문서는 각 페이지의 요약을 다시 요약하지 않는다. 무엇이 어디 있는지와 어떤 순서로 읽는지까지가 범위이고, 내용은 각 페이지가 갖는다.

## 관련 페이지 (Related Pages)

- [[overviews/glossary-physical-ai]] — 이 도메인 전문 용어의 canonical 표기 SSOT. 이 페이지의 표기도 그 표를 따른다
- [[overviews/glossary-llms]] — pre-training·fine-tuning 등 학습 일반 용어. physical-ai 페이지에도 함께 적용된다
- [[physical-ai/zhang-2026-a-survey-of-physical-ai]] — Physical AI 전체를 6층 로드맵으로 정리한 서베이. 이 허브가 저장소 기준 지도라면 그쪽은 분야 기준 지도다
- [[physical-ai/keon-awesome-physical-ai]] · [[physical-ai/natnew-awesome-physical-ai]] — 외부 큐레이션 목록 둘. 우리가 아직 안 가진 자료를 찾을 때 출발점
- [[llms/cai-2026-vlm3-vision-language-models]] — 3D 인식을 표준 VLM의 SFT로 푸는 논문. 물리 상호작용이 없어 `llms`에 남아 있지만 VLA backbone 축과 맞닿는다
- [[llms/chen-2025-eagle-25-boosting-long-context-post-training]] · [[llms/nvlabs-eagle]] — GR00T N1~N1.6의 VLM backbone이던 Eagle 계열. 방법이 순수 vision-language라 `llms`에 두고 여기서 잇는다. N1.7이 Cosmos-Reason2-2B로 갈아타며 계보가 끊긴 지점까지 저장소 쪽에 정리돼 있다
- [[agents/zou-2026-task-focused-memorization-multimodal-agents]] — 1인칭 스트림에서 무엇을 기억할지 학습하는 프레임워크. 방법이 순수 소프트웨어라 `agents`에 있다
