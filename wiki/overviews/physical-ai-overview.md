---
title: "Physical AI 카테고리 지도와 학습 경로"
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
    note: "한국어 입문 해설로 policy, episode, imitation learning 어휘를 먼저 잡는다. 논문을 바로 열지 않아도 되는 진입로."
  - id: physical-ai/brohan-2022-rt-1-robotics-transformer-for-real-world
    note: "이미지와 언어를 토큰으로 바꿔 Transformer에 넣는다는 발상의 원점. 파라미터 3,500만 개, 3Hz, 256 bin이라는 출발 지점의 크기를 기억해 둘 것."
    prereq: ["physical-ai/jo-2026-rt-1-vla-primer"]
  - id: physical-ai/brohan-2023-rt-2-vision-language-action-models-transfer-web
    note: "VLA라는 범주가 여기서 생긴다. 웹 VQA를 배치에 계속 섞는 co-fine-tuning이 핵심 레시피다."
    prereq: ["physical-ai/brohan-2022-rt-1-robotics-transformer-for-real-world"]
  - id: physical-ai/open-x-embodiment-2023-robotic-learning-datasets-and-rt-x
    note: "관심사가 한 모델 여러 과제에서 한 모델 여러 로봇으로 넘어간다. 이후 거의 모든 오픈 VLA의 학습 데이터."
    prereq: ["physical-ai/brohan-2023-rt-2-vision-language-action-models-transfer-web"]
  - id: physical-ai/kim-2024-openvla-an-open-source-vision-language-action-model
    note: "RT-2 계보의 첫 완전 오픈소스 재현. 7B가 55B를 앞서면서 action tokenization이 표준으로 굳는다."
    prereq: ["physical-ai/open-x-embodiment-2023-robotic-learning-datasets-and-rt-x"]
  - id: physical-ai/zhao-2023-learning-fine-grained-bimanual-manipulation
    note: "action chunking의 출처. 이산 토큰 계열과 다른 가지라 π0을 읽기 전에 봐 두면 대비가 선명하다."
  - id: physical-ai/black-2024-pi0-a-vision-language-action-flow-model
    note: "이산 토큰 전제를 버리고 flow matching으로 연속 action을 낸다. control frequency가 50Hz로 올라가는 지점."
    prereq: ["physical-ai/kim-2024-openvla-an-open-source-vision-language-action-model", "physical-ai/zhao-2023-learning-fine-grained-bimanual-manipulation"]
  - id: physical-ai/figure-ai-2025-helix-a-vision-language-action
    note: "느린 VLM과 빠른 visuomotor policy를 나눠 붙이는 dual-system 구조. 7B와 80M, 200Hz라는 수치가 기준점이 된다."
    prereq: ["physical-ai/black-2024-pi0-a-vision-language-action-flow-model"]
  - id: physical-ai/cui-2025-openhelix-a-short-survey-empirical
    note: "dual-system에 판정 기준을 세우고 설계 항목 7개를 실험으로 확인한다. 용어가 헐거워지는 것을 막는 자리."
    prereq: ["physical-ai/figure-ai-2025-helix-a-vision-language-action"]
  - id: physical-ai/kawaharazuka-2025-vision-language-action-models-for-robotics
    note: "여기까지 온 뒤 서베이로 좌표계를 맞춘다. backbone과 action head 조합 7분류가 앞서 읽은 모델들을 제자리에 놓아 준다."
    prereq: ["physical-ai/cui-2025-openhelix-a-short-survey-empirical"]
  - id: physical-ai/hou-2026-world-model-for-robot-learning
    note: "VLA 계열을 벗어나 world model 계열로 건너간다. policy 결합 5분류가 다음 묶음의 어휘다."
    prereq: ["physical-ai/kawaharazuka-2025-vision-language-action-models-for-robotics"]
---

## 요약

`wiki/physical-ai/`는 77개 페이지로 늘었다. 이 문서는 그 지도다. 어떤 자료가 어디에 있고 어떤 순서로 읽으면 되는지, 분류 기준과 태그 어휘는 무엇인지를 한자리에 모은다.

카테고리는 실질적으로 두 도메인으로 갈려 있다. 한쪽은 VLA와 foundation model 계열이고 `vla` 태그가 붙은 페이지만 53개다. 다른 쪽은 고전 로보틱스 스택으로, LiDAR odometry 계열 6개와 Nav2 계열 4개가 자기들끼리만 링크를 주고받는다. 두 묶음 사이에는 상호 참조가 거의 없다. CLAUDE.md가 정한 40페이지 분할 검토선을 이미 넘겼으므로 아래 "분할 검토" 절에서 따로 다룬다.

자료가 낱개가 아니라 클러스터로 들어왔다는 점도 이 저장소의 특징이다. 한 프로젝트를 놓고 원 논문, 공식 발표글, 구현 저장소, 한국어 해설을 함께 갖고 있는 경우가 여럿이다. 겹마다 담당하는 정보가 달라서 이 중복은 낭비가 아니다.

## 카테고리 구성

### 클러스터 분포

프로젝트 단위로 묶으면 카테고리의 모양이 드러난다. 아래 표에서 한 페이지가 두 묶음에 걸치는 경우가 있어 합계는 77과 정확히 맞지 않는다.

| 클러스터 | 페이지 | 구성 |
|---|---|---|
| π 계열 (Physical Intelligence) | 10 | 논문 4편, 공식 발표글 4편, `openpi` 저장소, 한국어 primer 1편 |
| GR00T와 GEAR (NVIDIA) | 9 | N1 논문, N1.5 프로젝트 페이지, NVIDIA 개발자 블로그, `Isaac-GR00T`(N1.7), primer 2편, SONIC 3부작 |
| RT 계열 (Google) | 6 | RT-1과 RT-2 논문, primer 2편, 한국어 리뷰 영상, Open X-Embodiment |
| FAST-LIO 계열 | 6 | 논문 2편, 공식 저장소, 한국어 리뷰 3편(글 1편과 영상 2편, Faster-LIO 포함) |
| WALL-OSS (X Square Robot) | 5 | 논문 2편, `wall-x` 저장소, 프로젝트 페이지, primer |
| Helix와 dual-system | 4 | Figure 발표문, 한국어 소개, OpenHelix 논문, Awesome-Dual-System-VLA |
| Nav2 | 4 | 공식 저장소, 공식 문서, 한국어 개념 정리 2편 |
| RoboCasa (UT Austin와 NVIDIA) | 4 | 논문 2편, `robocasa` 저장소, 프로젝트 페이지. 모델이 아니라 모델을 재는 무대 쪽 클러스터 |
| GR-1 (ByteDance) | 2 | 논문과 공식 저장소. 영상 생성 pre-training을 VLA로 잇는 계열의 원형 |
| 서베이와 그 해설 | 11 | VLA 3편, world model 4편, VLN 1편, Physical AI 전체 1편, 한국어 해설 2편 |
| 개별 모델과 프레임워크 | 10 | OpenVLA, SmolVLA, ACT/ALOHA(각각 논문과 primer), LeRobot, ASPIRE, GEN-1.5, Cosmos WFM |
| awesome 리스트 | 3 | keon, natnew, openhelix-robot |
| 계보 개괄 | 2 | 엥지유니버스 14편 리뷰, LearnOpenCV 튜토리얼 |
| 산업 현황 | 2 | 실리콘밸리 RFM 연재 1편과 2편 |

### 한 프로젝트를 여러 겹으로 갖는 이유

같은 프로젝트를 여러 겹으로 갖는 값어치는 π 계열이 가장 잘 보여준다. 논문은 방법과 ablation을 준다. 같은 날 올라온 공식 발표글에는 논문이 막대그래프로만 준 수치가 값으로 적혀 있고 무편집 데모 영상이 붙는다. 저장소에는 논문 이후에 나온 체크포인트와 배포 제약이 있다. 한국어 primer는 예비 지식을 앞에 깔아 진입 문턱을 낮춘다.

π 계열은 세대마다 논문과 발표글이 같은 날 나오는 구조라 대응이 특히 규칙적이다.

| 세대 | 논문 | 공식 발표글 |
|---|---|---|
| π0 (2024) | [[physical-ai/black-2024-pi0-a-vision-language-action-flow-model\|π0]] | [[physical-ai/physical-intelligence-2024-our-first-generalist-policy\|Our First Generalist Policy]] |
| π0.5 (2025) | [[physical-ai/black-2025-pi05-a-vision-language-action-model-with\|π0.5]] | [[physical-ai/physical-intelligence-2025-a-vla-with-open-world\|a VLA with Open-World Generalization]] |
| π\*0.6 (2025) | [[physical-ai/amin-2025-pistar06-a-vla-that-learns\|RECAP 논문]] | [[physical-ai/physical-intelligence-2025-a-vla-that-learns-from\|a VLA that Learns from Experience]] |
| π0.7 (2026) | [[physical-ai/ai-2026-pi07-a-steerable-generalist-robotic\|π0.7]] | [[physical-ai/physical-intelligence-2026-a-steerable-model-with-emergent\|a Steerable Model with Emergent Capabilities]] |

발표글이 논문 요약본에 그치지 않는다는 점이 이 대응의 핵심이다. π0.5 발표글은 논문이 그래프로만 보여 준 데이터 원천 ablation 수치를 값으로 적고, π\*0.6 발표글은 에스프레소 과제를 새벽 5시 30분부터 밤 11시 30분까지 18시간 동안 끊김 없이 실행했다는 배치 현장의 규모를 적는다. 네 세대의 코드와 가중치는 [[physical-ai/physical-intelligence-openpi|openpi 저장소]]가 함께 담당한다. 이 저장소는 base checkpoint 3종과 플랫폼별 fine-tuned checkpoint 7종을 Apache-2.0으로 열고, 추론은 8GB가 넘는 GPU면 되고 LoRA fine-tuning은 22.5GB라 RTX 4090 한 장에서 실행된다.

GR00T 클러스터도 같은 구조이지만 겹의 역할 배분이 다르다. N1만 논문 형태이고 N1.5와 N1.7은 프로젝트 페이지와 저장소가 1차 출처를 담당한다.

| 세대 | 1차 출처 | 보조 자료 |
|---|---|---|
| N1 (2025) | [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation\|GR00T N1 논문]] | [[physical-ai/nvidia-2025-accelerate-generalist-humanoid-robot-development\|NVIDIA 개발자 블로그]], [[physical-ai/jo-2026-groot-n1-vla-primer\|03-13 primer]] |
| N1.5 (2025) | [[physical-ai/nvidia-2025-gr00t-n1-5-an-improved-open\|N1.5 프로젝트 페이지]] | [[physical-ai/jo-2026-groot-n1-5-vla-primer\|03-14 primer]] |
| N1.7 (2026) | [[physical-ai/nvidia-isaac-gr00t\|Isaac-GR00T 저장소]] | 없음 |
| whole-body control | [[physical-ai/luo-2025-sonic-supersizing-motion-tracking\|SONIC 논문]] | [[physical-ai/nvlabs-gr00t-wholebodycontrol\|구현 저장소]], [[physical-ai/nvlabs-2026-gear-sonic-project-page\|데모 페이지]] |

개발자 블로그는 논문에 없는 GPU 사양과 데이터 준비부터 평가까지의 다섯 단계를 담당하고, N1.5 프로젝트 페이지는 릴리스 노트에 가까워 변경점 네 가지와 그 효과를 수치로 적는다. 예를 들어 실제 GR-1 로봇에서 지시를 따른 비율이 46.6%에서 93.3%로, Unitree G1 post-training 성공률이 44.0%에서 98.8%로 올랐다.

WALL-OSS는 네 겹이 서로 다른 층을 맡는다. [[physical-ai/zhai-2025-igniting-vlms-toward-the-embodied|원 논문]]이 Self-Attention은 공유하고 FFN만 vision-language용과 action용으로 나누는 구조와 두 단계 커리큘럼을 세우고, [[physical-ai/x-square-robot-2026-wall-oss-05-technical-report|Wall-OSS-0.5 기술 보고서]]가 그 pre-training 체크포인트를 초기값이 아니라 policy 그대로 평가한다. [[physical-ai/x-square-robot-wall-x|wall-x 저장소]]는 데이터 준비부터 fine-tuning과 서빙, 평가까지의 경로를 Apache-2.0으로 열고, [[physical-ai/x2robot-2025-wall-oss-project-page|프로젝트 페이지]]는 새 수치 대신 평가 과제의 실행 장면을 11분 46초 분량의 영상 26편으로 보여 준다.

dual-system 묶음도 마찬가지다. [[physical-ai/figure-ai-2025-helix-a-vision-language-action|Figure의 Helix 발표문]]이 원문이고, [[physical-ai/9bow-2025-helix-generalist-humanoid-vla|PyTorch KR의 한국어 소개]]는 원문에서 iframe에 가려 수집되지 않는 System 1과 System 2 구조도를 일반 이미지로 싣는다. 판정 기준은 [[physical-ai/cui-2025-openhelix-a-short-survey-empirical|OpenHelix 논문]]이 세우고, [[physical-ai/openhelix-robot-awesome-dual-system-vla|Awesome-Dual-System-VLA]]가 그 기준을 목록으로 옮겨 갱신한다. 이 목록은 dual-system에 해당하는 논문과 해당하지 않는 논문을 두 절로 나란히 두는데, π0과 π0.5, GR00T N1이 후자에 들어간다.

### 한국어 자료층

한국어 자료가 두껍다는 것도 이 저장소의 성격이다. WikiDocs "모두의 로보틱스" primer 9편이 VLA 본류를 거의 그대로 따라가며, 각 편은 원 논문 페이지 앞에 두는 진입로 역할을 한다.

| primer | 대응하는 1차 자료 |
|---|---|
| [[physical-ai/jo-2026-rt-1-vla-primer\|03-03 RT-1]] | [[physical-ai/brohan-2022-rt-1-robotics-transformer-for-real-world\|RT-1 논문]] |
| [[physical-ai/jo-2026-rt-2-vla-primer\|03-04 RT-2]] | [[physical-ai/brohan-2023-rt-2-vision-language-action-models-transfer-web\|RT-2 논문]] |
| [[physical-ai/jo-2026-act-vla-primer\|03-05 ACT]] | [[physical-ai/zhao-2023-learning-fine-grained-bimanual-manipulation\|ACT 논문]] |
| [[physical-ai/jo-2026-openvla-vla-primer\|03-06 OpenVLA]] | [[physical-ai/kim-2024-openvla-an-open-source-vision-language-action-model\|OpenVLA 논문]] |
| [[physical-ai/jo-2026-pi-0-6-vla-primer\|03-09 Pi-0.6]] | [[physical-ai/amin-2025-pistar06-a-vla-that-learns\|RECAP 논문]] |
| [[physical-ai/jo-2026-smolvla-vla-primer\|03-10 SmolVLA]] | [[physical-ai/shukor-2025-smolvla-a-vision-language-action-model\|SmolVLA 논문]] |
| [[physical-ai/jo-2026-wall-oss-vla-primer\|03-11 WALL-OSS]] | [[physical-ai/zhai-2025-igniting-vlms-toward-the-embodied\|WALL-OSS 논문]] |
| [[physical-ai/jo-2026-groot-n1-vla-primer\|03-13 Groot N1]] | [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation\|GR00T N1 논문]] |
| [[physical-ai/jo-2026-groot-n1-5-vla-primer\|03-14 Groot N1.5]] | [[physical-ai/nvidia-2025-gr00t-n1-5-an-improved-open\|N1.5 프로젝트 페이지]] |

primer 아홉 편이 모두 같은 밀도인 것은 아니다. 03-09편은 강화학습 기초부터 RECAP 수식 유도까지 내려가고, 03-11편은 논문 여러 절에 흩어진 손실 함수를 학습 단계 순서로 다시 배열해 기호를 하나씩 풀이한다. 반면 03-13편은 원 논문 도식에 저자가 빨간 테두리를 덧그린 주석 그림으로 같은 구조도를 세 번 반복해 읽힌다.

primer 외의 한국어 자료는 다섯 가지로 나뉜다. PyTorch KR 해설 3편, 로봇 엔지니어 채널 영상 2편, SLAM 세미나 영상 2편, 실리콘밸리 RFM 연재 2편, Nav2와 FAST-LIO 블로그 3편이다. 합치면 한국어 자료는 21편이고, 주요 모델 대부분에 원 논문을 열기 전에 들를 곳이 하나씩 있다.

## 학습 경로

VLA 본류를 따라가는 A 트랙이 기본이다. B와 C는 성격이 달라 따로 뒀다. 아래 A 트랙 11단계는 frontmatter의 `study_path`와 같은 순서다.

### A 트랙 VLA 계보

1. [[physical-ai/jo-2026-rt-1-vla-primer|RT-1 primer]]. policy와 episode, imitation learning 어휘를 한국어로 먼저 잡는다. policy는 현재 observation을 받아 다음 action을 정하는 함수를 말한다.
2. [[physical-ai/brohan-2022-rt-1-robotics-transformer-for-real-world|RT-1]]. 이미지와 언어를 토큰으로 바꿔 Transformer에 넣는다는 발상의 원점이다. 파라미터 3,500만 개에 3Hz, 256 bin이라는 출발 지점의 크기가 뒤 단계와의 대비를 만든다.
3. [[physical-ai/brohan-2023-rt-2-vision-language-action-models-transfer-web|RT-2]]. VLA라는 범주가 생기는 자리다. 로봇 데이터만이 아니라 웹 VQA를 배치에 계속 섞는 co-fine-tuning이 핵심 레시피다.
4. [[physical-ai/open-x-embodiment-2023-robotic-learning-datasets-and-rt-x|Open X-Embodiment]]. 관심사가 한 모델 여러 과제에서 한 모델 여러 로봇으로 넘어간다. 이후 오픈 VLA 대부분의 학습 데이터가 여기서 나온다.
5. [[physical-ai/kim-2024-openvla-an-open-source-vision-language-action-model|OpenVLA]]. RT-2 계보의 첫 완전 오픈소스 재현이다. 7B가 55B RT-2-X를 앞서면서 action tokenization이 사실상 표준이 된다.
6. [[physical-ai/zhao-2023-learning-fine-grained-bimanual-manipulation|ACT와 ALOHA]]. action chunking의 출처다. action chunking은 미래 여러 스텝의 action을 한 묶음으로 예측하는 방식이며, 이산 토큰 계열과 다른 가지라 다음 단계와 대비된다.
7. [[physical-ai/black-2024-pi0-a-vision-language-action-flow-model|π0]]. 이산 토큰 전제를 버리고 flow matching으로 연속 action을 낸다. control frequency가 50Hz로 올라가는 지점이며, control frequency는 로봇이 1초에 몇 번 새로운 action을 갱신하는지를 뜻한다.
8. [[physical-ai/figure-ai-2025-helix-a-vision-language-action|Helix]]. 느린 VLM과 빠른 visuomotor policy를 나눠 붙이는 dual-system 구조다. 7B와 80M, 200Hz가 기준 수치가 된다.
9. [[physical-ai/cui-2025-openhelix-a-short-survey-empirical|OpenHelix]]. dual-system에 판정 기준을 세우고 설계 항목 7개를 실험으로 확인한다. 용어가 헐거워지는 것을 막는 자리다.
10. [[physical-ai/kawaharazuka-2025-vision-language-action-models-for-robotics|VLA full-stack 서베이]]. 여기까지 온 뒤 좌표계를 맞춘다. backbone과 action head 조합 7분류가 앞서 읽은 모델들을 제자리에 놓아 준다.
11. [[physical-ai/hou-2026-world-model-for-robot-learning|World Model for Robot Learning]]. VLA 계열에서 world model 계열로 건너가는 다리이며, 아래 B 트랙의 출발점이기도 하다.

### A 트랙의 곁길

본류에서 갈라져 나오는 방향이 여섯 가지 있다. 각각 본류의 어느 전제를 바꾸는지로 구분된다.

| 곁길 | 바꾸는 전제 | 페이지 |
|---|---|---|
| 데이터를 버리지 않고 쓴다 | prompt에 episode metadata와 subgoal image를 적어 품질이 뒤섞인 데이터까지 학습에 넣는다 | [[physical-ai/ai-2026-pi07-a-steerable-generalist-robotic\|π0.7]] |
| 규모를 줄인다 | 450M 파라미터와 GPU 한 장 학습, asynchronous inference로 배포 비용을 겨냥한다 | [[physical-ai/shukor-2025-smolvla-a-vision-language-action-model\|SmolVLA]] |
| 학습 신호를 현장에서 얻는다 | 배치된 로봇의 experience와 전문가 개입을 강화학습 신호로 바꾼다 | [[physical-ai/amin-2025-pistar06-a-vla-that-learns\|RECAP]] |
| pre-training 자체를 policy로 쓴다 | fine-tuning의 초기값이 아니라 체크포인트를 그대로 실제 로봇에서 평가한다 | [[physical-ai/x-square-robot-2026-wall-oss-05-technical-report\|Wall-OSS-0.5]] |
| 가중치 대신 코드를 고친다 | 코딩 에이전트가 제어 프로그램을 수정하고 검증된 수정만 skill library에 쌓는다 | [[physical-ai/lu-2026-aspire-agentic-skills-discovery-for\|ASPIRE]] |
| 학습 없이 시연 하나로 푼다 | 3초에서 12초짜리 시연 데이터(demonstration) 하나를 context window에 넣는다 | [[physical-ai/generalist-ai-2026-gen-1-5-embodied-foundation\|GEN-1.5]] |

뒤의 두 곁길은 본류와 성격 차이가 특히 크다. ASPIRE는 policy를 신경망 가중치가 아니라 코딩 에이전트가 고쳐 쓰는 Python 프로그램으로 두고, 실행 엔진과 skill library, evolutionary search 세 구성 요소로 지속학습을 굴린다. GEN-1.5는 가중치를 한 번도 갱신하지 않은 상태에서 10개 과제 평균 성공률 59%를 얻는데, 저자들은 in-context learning을 유도하는 구조 변경이나 meta-learning 루프를 하나도 넣지 않았고 8개월 넘는 pre-training 과정에서 이 능력이 저절로 나타났다고 밝힌다.

전체 계보를 30분 안에 훑고 싶으면 [[physical-ai/engiuniverse-2025-14-key-physical-ai-papers|엥지유니버스 14편 리뷰]]나 [[physical-ai/learnopencv-2025-vision-language-action-models-vla|LearnOpenCV 튜토리얼]]이 지름길이다. RT-1과 RT-2 두 편만 아키텍처 수준에서 대조하고 싶으면 [[physical-ai/engiuniverse-2025-rt1-rt2-robotics-transformer-review|같은 채널의 20분 리뷰]]가 있는데, 300×300×3 이미지가 visual token 8개로 줄어드는 과정을 텐서 크기를 대입해 따라간다. 다만 세 자료 모두 개괄이라 수치 근거가 필요한 비교에는 원 논문을 봐야 한다.

### B 트랙 world model과 생성

1. [[physical-ai/hou-2026-world-model-for-robot-learning|World Model for Robot Learning]]. policy 결합 5분류와 학습된 시뮬레이터라는 두 용도로 문헌을 가른다. 병목을 그럴듯한 미래가 아니라 action에 인과적으로 alignment된 실행 가능한 미래로 옮겨 잡는다.
2. [[physical-ai/li-2025-a-comprehensive-survey-on-world|World Models for Embodied AI]]. 로보틱스와 자율주행, 범용 비디오를 하나의 좌표계에 올린다. 분류 기준은 결합도와 시간 전개, 장면 형식 세 가지다.
3. [[physical-ai/reuss-2026-pretrained-to-imagine-fine-tuned|World-Action Models]]. VLM에서 출발하는 기존 VLA 옆에 영상 backbone에서 출발하는 두 번째 레시피가 자리 잡는 중이라는 지형도다. A 트랙과 B 트랙이 만나는 지점이다. 한국어로 먼저 훑고 싶으면 [[physical-ai/9bow-2026-world-action-model-rise|PyTorch KR 한국어 판]]이 있는데, 원문에서 수집되지 않은 도식까지 23장이 전부 실려 있다.
4. [[physical-ai/wu-2023-unleashing-large-scale-video-generative|GR-1]]. 위 두 번째 레시피의 원형이다. Ego4D 1인칭 영상 80만 clip에 다음 프레임 예측을 먼저 학습시킨 뒤 같은 모델에 상태 입력과 action 출력을 붙인다. [[physical-ai/bytedance-gr-1|공식 저장소]]는 CALVIN 벤치마크 평가 경로와 가중치만 열고 pre-training과 fine-tuning 코드는 담지 않으므로, 다른 로봇으로 옮기려면 재구현이 필요하다.
5. [[physical-ai/liu-2025-generative-physical-ai-in-vision|Generative Physical AI in Vision]]. 생성 모델이 물리 법칙을 지키게 만드는 연구를 physics-aware generation이라는 이름으로 묶는다. 한국어 해설은 [[physical-ai/9bow-2026-physics-aware-generation-world-simulator|PyTorch KR 2편]]에 있다.
6. [[physical-ai/nvidia-2025-cosmos-world-foundation-model-platform|Cosmos WFM Platform]]. 서베이 넷이 그려 둔 지형의 1차 구현이다. world foundation model을 데이터 큐레이션부터 tokenizer와 pre-training, downstream fine-tuning까지 플랫폼 단위로 묶어 내놓는다.

### C 트랙 고전 로보틱스 스택

VLA와 직접 이어지지 않는다. 실제 기기를 구동하려면 필요한 층이다.

- LiDAR odometry 계열은 [[physical-ai/xu-2020-fast-lio-a-fast-robust-lidar-inertial|FAST-LIO]], [[physical-ai/xu-2021-fast-lio2-fast-direct-lidar-inertial-odometry|FAST-LIO2]], [[physical-ai/hku-mars-fast-lio|공식 저장소]] 순으로 읽는다. 수식이 막히면 [[physical-ai/taeyoung-2022-fast-lio-paper-review|한국어 리뷰]]나 [[physical-ai/airlab-2024-fast-lio-a-fast-robust|12분 세미나]]가 있고, ikd-Tree를 해시 voxel로 바꾼 후속은 [[physical-ai/irasc-2024-faster-lio-lightweight-tightly-coupled|Faster-LIO 해설]]이 다룬다.
- 이동 로봇 내비게이션은 [[physical-ai/yhoons-2024-ros2-nav2-intro|Nav2 입문]], [[physical-ai/lionhong-2023-nav2-core-concepts|개념 정리]], [[physical-ai/nav2-2026-official-documentation|공식 문서]], [[physical-ai/ros-navigation-navigation2|소스 저장소]] 순으로 읽는다.

### 평가 무대와 공용 프레임워크

모델이 아니라 모델을 재고 올려놓는 층도 따로 있다. RoboCasa 클러스터가 평가 무대를 담당한다. [[physical-ai/nasiriany-2024-robocasa-large-scale-simulation-of-everyday|RoboCasa]]가 주방 장면 120개와 과제 100종으로 출발했고, [[physical-ai/nasiriany-2026-robocasa365-a-large-scale-simulation-framework|RoboCasa365]]가 과제 365종과 2,200시간 데이터로 VLA 4종을 같은 조건에서 비교한다. [[physical-ai/robocasa-robocasa|공식 저장소]]는 설치와 첫 실행까지만 담고 과제 목록과 학습 절차는 문서 사이트로 넘기며, [[physical-ai/robocasa-2026-robocasa365-project-page|프로젝트 페이지]]는 릴리스 이력과 leaderboard 운영처럼 논문에 없는 현황을 담당한다.

공용 실행 기반은 [[physical-ai/huggingface-lerobot|LeRobot]]이 맡는다. ACT와 Diffusion, π0 계열, GR00T N1.7, SmolVLA를 포함한 policy 22종이 같은 데이터 형식과 같은 학습 CLI 위에서 동작하므로, 이 wiki가 개별 논문 페이지로 다룬 모델 상당수가 여기에 구현으로 들어와 있다.

### 산업 현황

논문과 저장소가 다루지 않는 산업 구조는 실리콘밸리 RFM 연재 2편이 담당한다. [[physical-ai/kim-2026-silicon-valley-rfm-part-1|1편]]은 RFM 스타트업이 pre-training과 post-training, 데이터 제작, 평가를 전부 내재화하는 배경과 하드웨어까지 직접 만드는 full-stack 전략을 다룬다. [[physical-ai/kim-2026-silicon-valley-rfm-part-2|2편]]은 VLM에서 VLA로 이어지는 개념을 next-token prediction 원리에서 풀고, 단일 모델 구조와 dual-system 구조가 갈라진 이유를 정리한다. 두 글의 독자는 기술을 직접 개발할지 외부에서 도입할지 판단해야 하는 기업이라, 어느 영역이 오픈소스이고 어느 영역이 각 기업의 차별화 지점인지를 구분하는 데 초점이 있다.

## 서베이 열한 편

서베이는 어떤 렌즈로 문헌을 자르느냐가 서로 달라, 겹쳐 읽으면 같은 모델이 여러 좌표에 놓인다.

| 서베이 | 렌즈 | 규모 |
|---|---|---|
| [[physical-ai/kawaharazuka-2025-vision-language-action-models-for-robotics\|VLA full-stack]] | backbone과 action head 조합으로 7분류. 로봇 플랫폼과 데이터 수집, 평가를 함께 놓는다 | 인용 400편 이상 |
| [[physical-ai/xu-2025-an-anatomy-of-vision-language-action-models\|An Anatomy of VLA]] | perception과 brain, action 세 모듈로 해부하고 도전 과제 분석을 본문 절반에 둔다 | 인용 약 285편, 도전 과제 5개와 하위 과제 15개 |
| [[physical-ai/sa-2026-vision-language-action-models-for\|Bimanual VLA]] | 양팔 manipulation 하나를 렌즈로 삼아 일곱 측면으로 정리한다 | 문헌 200편 이상, 방법 31개 대조표 |
| [[physical-ai/hou-2026-world-model-for-robot-learning\|World Model for Robot Learning]] | policy 결합 5분류와 학습된 시뮬레이터 두 용도 | 9개 기관 공동 |
| [[physical-ai/li-2025-a-comprehensive-survey-on-world\|World Models for Embodied AI]] | 로보틱스와 자율주행, 범용 비디오를 공통 기준에 올린다 | 17페이지 |
| [[physical-ai/liu-2025-generative-physical-ai-in-vision\|Generative Physical AI]] | physics-aware generation이라는 이름으로 생성 모델의 물리 준수를 묶는다 | 한국어 해설 있음 |
| [[physical-ai/reuss-2026-pretrained-to-imagine-fine-tuned\|World-Action Models]] | 영상 pre-training에서 출발하는 policy 계열의 지형도 | 해설 성격의 article |
| [[physical-ai/zhang-2024-vision-and-language-navigation-today\|VLN Today and Tomorrow]] | LAW framework를 빌려 world model과 human model, agent 세 부분으로 challenge를 먼저 나눈다 | 벤치마크 24종 분류표 |
| [[physical-ai/zhang-2026-a-survey-of-physical-ai\|A Survey of Physical AI]] | LLM의 world knowledge에서 출발해 여섯 층 로드맵으로 재배치한다 | 분야 전체 |
| [[physical-ai/9bow-2026-physics-aware-generation-world-simulator\|물리를 이해하는 생성 모델]] | 위 Generative Physical AI 서베이의 한국어 해설 | PyTorch KR 연재 2편 |
| [[physical-ai/9bow-2026-world-action-model-rise\|World Action Model의 부상]] | 위 World-Action Models 지형도의 한국어 판. 용어풀이 상자와 번역 표기 대조를 더한다 | 원문 도식 23장 재게시 |

서베이 사이에도 서술 방향의 차이가 있다. 예를 들어 VLN 서베이는 기존 리뷰가 벤치마크와 기법을 아래에서 위로 쌓아 올린 것과 달리, challenge를 먼저 나누고 각 부분에서 foundation model이 무엇을 바꿨는지를 위에서 아래로 서술한다. Bimanual VLA 서베이가 양팔 협응을 렌즈로 고른 이유도 비슷하다. 팔이 하나 늘면 출력 차원이 두 배가 되고 두 팔이 서로의 제약이 되므로, 이 문제가 VLA의 모든 구성 요소를 동시에 압박한다.

## 이름이 겹치는 GEAR와 GR00T와 SONIC

이름이 비슷한 다섯 용어가 한 조직에서 나와 헷갈리기 쉽다. 층위부터 나누면 구분된다.

| 용어 | 층위 | 정체 | 관련 페이지 |
|---|---|---|---|
| GEAR | 조직 | NVIDIA 내부의 로봇과 embodied agent 연구 조직 이름(Generalist Embodied Agent Research). 아래 모든 프로젝트가 이 조직에서 나온다 | 없음 |
| GR00T | 모델 계열 | GEAR가 만드는 humanoid manipulation VLA foundation model의 이름. N1에서 N1.5, N1.6, N1.7로 세대가 이어진다 | [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation\|GR00T N1]], [[physical-ai/nvidia-isaac-gr00t\|Isaac-GR00T(N1.7)]] |
| SONIC | 방법과 논문 | Luo et al. 2025(arXiv 2511.07820)가 제안한 whole-body control 방법 이름. robot과 human, hybrid 세 입력을 하나의 universal motion token으로 묶어 locomotion과 teleoperation, manipulation을 한 policy에 태운다 | [[physical-ai/luo-2025-sonic-supersizing-motion-tracking\|SONIC 논문]] |
| GEAR-SONIC | 프로젝트 페이지 | SONIC 논문의 공식 데모 사이트 이름(`nvlabs.github.io/GEAR-SONIC`). 텍스트는 abstract뿐이고 실질은 영상 갤러리다 | [[physical-ai/nvlabs-2026-gear-sonic-project-page\|GEAR-SONIC 페이지]] |
| GR00T-WholeBodyControl | 코드 저장소 | GitHub 저장소 이름(`NVlabs/GR00T-WholeBodyControl`). GR00T 계열이 쓰는 whole-body control 컨트롤러 구현을 모은 monorepo | [[physical-ai/nvlabs-gr00t-wholebodycontrol\|WholeBodyControl repo]] |

헷갈리는 지점은 이름이 뒤바뀐 것처럼 보이는 곳이다. GEAR-SONIC이라는 이름에는 GR00T가 들어가지 않는데, 정작 GR00T라는 이름이 붙은 저장소가 구현하는 최신 컨트롤러 이름이 GEAR-SONIC이다.

이 저장소 안에는 세 세대 컨트롤러가 함께 들어 있다. 하체 RL과 상체 IK를 분리했던 구세대 Decoupled WBC(GR00T N1.5와 N1.6이 사용), robot과 human, hybrid 입력을 하나의 토큰으로 묶은 현세대 GEAR-SONIC(SONIC 논문의 구현체, GR00T N1.7부터 사용), 그리고 실시간 latent 생성 모델 MotionBricks의 프리뷰다.

두 계열의 역할은 신체 부위로 갈린다. GR00T는 팔과 손으로 물건을 다루는 policy의 이름이고, SONIC과 GEAR-SONIC은 몸통과 다리로 균형과 이동을 담당하는 컨트롤러의 이름이다. 두 계열은 따로 발전하다 GR00T-WholeBodyControl 저장소 안에서 합쳐진다. N1.5와 N1.6은 Decoupled WBC와 짝을 이뤘고 N1.7부터는 SONIC과 짝을 이룬다.

## 분류 기준

기준은 소재가 아니라 방법이다. 방법의 핵심에 센서 입력, 액추에이터 출력, 시뮬레이터, 실체 로봇이나 차량이 있으면 `physical-ai`다. 반면 물리 도메인을 소재로 삼더라도 방법이 언어와 검색에 머무르면 원래 카테고리에 남는다.

| 자료 성격 | 카테고리 | 이유 |
|---|---|---|
| 로봇 팔 조작 policy를 학습하는 논문 | `physical-ai` | 액추에이터 출력이 방법의 중심 |
| 시뮬레이터에서 학습해 실제 기기로 옮기는 기법 | `physical-ai` | sim2real 자체가 방법 |
| 논문의 공식 구현 저장소와 데모 페이지 | `physical-ai` | 같은 프로젝트는 `type`이 달라도 한 카테고리에 모은다 |
| 로봇 매뉴얼 RAG의 검색 성능 평가 | `evaluations` | 소재만 로봇이고 방법은 검색 평가 |
| 순수 VLM 아키텍처 논문 | `llms` | 물리 상호작용 없음. 이 허브에서 상호 링크 |

세 번째 줄이 실제로 가장 많이 쓰인 판단이다. 클러스터 표의 π 계열과 GR00T, WALL-OSS, RoboCasa, Nav2, FAST-LIO가 전부 여기 해당한다. 논문은 `paper`, 저장소는 `repo`, 발표글과 문서는 `article`, 리뷰는 `video`지만 전부 `physical-ai`에 두고 서로 링크했다. `type`과 `category`는 독립이라 유형이 갈려도 분류는 방법을 따른다.

경계가 애매하면 미래의 내가 어느 카테고리에서 찾을 때 더 빨리 발견하는지로 정한다.

## 태그 어휘와 사용 현황

physical-ai 페이지는 도메인 루트 태그 `physical-ai`를 달고 아래에서 1개에서 3개를 고른다. 표기는 하나만 허용한다.

| 묶음 | 태그와 사용 횟수 (전체 77개 페이지 기준) |
|---|---|
| 학습과 제어 방법 | `vla` 53, `robot-learning` 40, `world-model` 15, `imitation-learning` 8, `rl-control` 3 |
| 플랫폼과 응용 | `manipulation` 38, `humanoid` 14, `mobile-robot` 8, `drone` 2, `autonomous-driving` 2, `locomotion` 0 |
| 환경과 인식 | `slam` 7, `simulator` 7, `teleoperation` 3, `sim2real` 1, `3d-perception` 1, `spatial-reasoning` 1 |
| 자원과 운영 | `benchmark` 12, `robot-dataset` 9, `edge-inference` 8, `hardware` 0, `safety` 0 |

분포가 한쪽으로 크게 쏠려 있다. `vla`가 53회로 전체의 69%라 발견 경로로서의 변별력이 거의 없고, `robot-learning`도 40회로 사정이 같다. 반면 `hardware`와 `safety`, `locomotion` 셋은 한 번도 쓰이지 않았다. SONIC 계열이 locomotion을 다루는데도 `humanoid`와 `teleoperation`으로 붙은 결과다.

1개에서 3개라는 상한도 지켜지지 않고 있다. 77개 중 19개(25%)가 4개를 달았다. 대부분 `vla`와 `robot-learning`, `manipulation`에 하나를 더한 조합이라, 상한을 넘긴 것이라기보다 앞의 세 태그가 거의 자동으로 붙는 것이 원인에 가깝다. 상한을 4로 올릴지, `vla`와 `robot-learning`을 루트 태그처럼 취급해 집계에서 뺄지는 CLAUDE.md를 고쳐야 하는 결정이라 여기서는 기록만 한다.

통제 어휘 밖 태그는 한 건 있었다. 엥지유니버스 14편 리뷰가 `video`를 달고 있었는데, 이것은 태그가 아니라 `type` 값이라 지웠다.

## 분할 검토

CLAUDE.md는 `wiki/physical-ai/`가 40페이지를 넘으면 하위 폴더 분할을 다시 보라고 적어 뒀다. 지금은 77개다. 나눌 선은 태그 분포가 이미 그려 준다.

| 묶음 | 페이지 | 성격 |
|---|---|---|
| VLA와 foundation model | 약 54 | 학습된 policy가 중심이고 서로 조밀하게 링크된다 |
| 고전 로보틱스 스택 | 10 | FAST-LIO 6개와 Nav2 4개. 기하와 필터, 플래닝이 중심이고 위 묶음과 상호 참조가 거의 없다 |
| world model과 생성 | 8 | 예측과 시뮬레이션이 중심이며 VLA 쪽과 서베이를 통해 이어진다 |

가장 명확한 후보는 고전 스택 10개다. 두 FAST-LIO 논문과 Nav2 문서가 VLA 페이지를 인용할 일이 없고 그 반대도 마찬가지다. 다만 10개는 폴더를 새로 만들기엔 적은 수라 아직은 태그로 충분하다는 판단도 가능하다. VLA 묶음이 더 커져 다시 나눠야 할 때가 오면, 그때는 계보 계열(RT에서 OpenVLA와 π를 거쳐 dual-system까지)과 서베이 및 해설 계열로 가르는 편이 자연스럽다. 실제 분할은 CLAUDE.md의 디렉터리 규약을 함께 고쳐야 해서 여기서는 선택지만 남긴다.

## 저장소 현황

| 항목 | 값 |
|---|---|
| `wiki/physical-ai/` 페이지 | 77 |
| 자료 유형 | `article` 32, `paper` 29, `repo` 12, `video` 4 |
| 연도 분포 | 2026년 32, 2025년 25, 2024년 9, 2023년 5, 2022년 2, 2021년 1, 2020년 2, 2018년 1 |
| 한국어 자료 | 21 (WikiDocs primer 9, PyTorch KR 3, 영상 리뷰 4, RFM 연재 2, SLAM과 Nav2 블로그 3) |
| 인접 카테고리 페이지 | [[llms/cai-2026-vlm3-vision-language-models]], [[llms/chen-2025-eagle-25-boosting-long-context-post-training]], [[llms/nvlabs-eagle]], [[agents/zou-2026-task-focused-memorization-multimodal-agents]] |
| 용어 SSOT | [[overviews/glossary-physical-ai]] (99개 용어) |
| 홈 밴드 | `index.md`의 Physical AI 절에 77줄이 모두 올라 있다 |

연도 분포에서 읽히는 흐름이 하나 있다. 2026년 자료 32개는 한동안 한국어 primer와 서베이가 대부분이었는데, π0.7과 RoboCasa365, ASPIRE가 들어오면서 1차 연구도 섞이기 시작했다. 다만 원 논문의 무게중심은 여전히 2024년과 2025년이고, 2026년은 그것을 정리하고 해설하는 층이 함께 두꺼워지는 해다.

## 앞으로 채울 자리

- Octo. 계보에서 반복해 언급되는데 원본이 없다. Open X-Embodiment 위에서 diffusion head로 간 93M generalist policy라, OpenVLA와 나란히 놓으면 이산 토큰과 diffusion decoder의 대비가 선명해진다.
- Diffusion Policy. action chunking과 함께 거의 모든 서베이가 인용하는데 원본이 없다. ACT와 π0 사이의 빈칸이다. [[physical-ai/nasiriany-2026-robocasa365-a-large-scale-simulation-framework|RoboCasa365]]가 π0과 π0.5, GR00T N1.5와 같은 조건에서 잰 수치를 주긴 하지만 방법 자체의 설명은 여전히 없다.
- Gemini Robotics. 세 개괄 자료가 전부 다루지만 원본이 없다. 클라우드와 온보드를 분리해 배치하는 구성은 다른 곳에 없다.
- world model 1차 논문. [[physical-ai/nvidia-2025-cosmos-world-foundation-model-platform|Cosmos WFM]]과 [[physical-ai/wu-2023-unleashing-large-scale-video-generative|GR-1]]이 들어오면서 절반은 채워졌다. 남은 빈칸은 latent 공간에서 미래를 전개하는 계열이며, hou 서베이의 policy 결합 5분류 중 latent 항목에 놓을 원본이 아직 없다.
- 시뮬레이션 벤치마크. [[physical-ai/nasiriany-2024-robocasa-large-scale-simulation-of-everyday|RoboCasa]] 계열 4종이 들어오면서 `simulator`와 `benchmark` 쪽이 처음 두꺼워졌다. 남은 빈칸은 비교 대상으로 반복 인용되는 Behavior-1K, ManiSkill, LIBERO, Isaac Lab이다. 지금은 RoboCasa 논문의 비교표로만 알고 있다.
- `safety`와 `hardware`. 태그는 있는데 자료가 없다. 로봇 안전 표준이나 실제 기기 하드웨어 자료가 들어오면 처음 붙는다.
- `locomotion`. SONIC 계열이 실질적으로 다루지만 태그가 붙지 않았다. 자료를 늘리기보다 기존 페이지의 태그를 다시 보는 편이 맞다.
- 자율주행. `autonomous-driving`은 2회로 늘었지만 둘 다 world model 자료의 응용 절이다(서베이 한 절과 Cosmos의 downstream 하나). 카테고리 정의에는 들어 있는데 자율주행 자체를 다룬 1차 자료는 여전히 없다.

새 자료는 CLAUDE.md의 6단계 파이프라인을 그대로 탄다. `raw/`에 원본을 복사하고 도식을 뽑은 뒤 `sources/`에 요약을 쓴다. 큐레이션을 확인하고 `wiki/physical-ai/`에 페이지를 만들고 `index.md`에 한 줄을 넣는다. 계보에서 자리가 분명한 자료면 이 페이지의 `study_path`와 A 트랙에도 단계를 추가한다.

## 이 페이지의 한계

- 이 문서는 각 페이지의 요약을 다시 요약하지 않는다. 어떤 자료가 어디 있고 어떤 순서로 읽는지까지가 범위이고, 내용은 각 페이지가 갖는다.
- 학습 경로에 순서를 매긴 것은 A 트랙 11단계와 곁길 6개, B 트랙 6단계, C 트랙 10개다. 나머지는 클러스터 표와 서베이 표, `index.md`로 찾는다. 모든 페이지에 읽는 순서를 매기면 지도가 아니라 목록이 된다.
- 클러스터 표의 페이지 수는 한 페이지가 두 묶음에 걸치는 경우를 중복으로 세므로 합이 77과 맞지 않는다.
- A 트랙의 6번(ACT와 ALOHA)과 7번(π0) 사이 순서는 취향이 갈릴 수 있다. action chunking을 먼저 보는 쪽을 택했는데, 이산 토큰 계열을 끝까지 따라가고 싶으면 6번을 뒤로 미뤄도 된다.
- 태그 통계와 분할 논의는 지금 시점의 스냅샷이다. 페이지가 늘면 다시 세야 한다.

## 관련 페이지

- [[overviews/glossary-physical-ai]]: 이 도메인 전문 용어의 canonical 표기 SSOT. 이 페이지의 표기도 그 표를 따른다
- [[overviews/glossary-llms]]: pre-training과 fine-tuning 등 학습 일반 용어. physical-ai 페이지에도 함께 적용된다
- [[physical-ai/zhang-2026-a-survey-of-physical-ai]]: Physical AI 전체를 6층 로드맵으로 정리한 서베이. 이 허브가 저장소 기준 지도라면 그 서베이는 분야 기준 지도다
- [[physical-ai/keon-awesome-physical-ai]], [[physical-ai/natnew-awesome-physical-ai]]: 외부 큐레이션 목록 둘. 아직 갖고 있지 않은 자료를 찾을 때 출발점이다
- [[llms/cai-2026-vlm3-vision-language-models]]: 3D 인식을 표준 VLM의 SFT로 푸는 논문. 물리 상호작용이 없어 `llms`에 남아 있지만 VLA backbone 쪽과 맞닿는다
- [[llms/chen-2025-eagle-25-boosting-long-context-post-training]], [[llms/nvlabs-eagle]]: GR00T N1부터 N1.6까지의 VLM backbone이던 Eagle 계열. 방법이 순수 vision-language라 `llms`에 두고 여기서 잇는다. N1.7이 Cosmos-Reason2-2B로 갈아타며 계보가 끊긴 지점까지 저장소 쪽 페이지에 정리돼 있다
- [[agents/zou-2026-task-focused-memorization-multimodal-agents]]: 1인칭 스트림에서 무엇을 기억할지 학습하는 프레임워크. 방법이 순수 소프트웨어라 `agents`에 있다
