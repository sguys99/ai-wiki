---
title: "MolmoAct2: Action Reasoning Models for Real-World Deployment"
source: fang-2026-molmoact2-action-reasoning-models-for.md
type: paper
year: 2026
category: physical-ai
raw_path: raw/papers/fang-2026-molmoact2-action-reasoning-models-for.pdf
raw_filename: "fang-2026-molmoact2-action-reasoning-models-for.pdf"
source_collection: external
authors: "Haoquan Fang*, Jiafei Duan*, Donovan Clay, Sam Wang, Shuo Liu, Weikai Huang, Xiang Fan, Wei-Chuan Tsai, Shirui Chen, Yi Ru Wang, Shanli Xing 외, Zhongzheng Ren, Ali Farhadi, Dieter Fox, Ranjay Krishna (Ai2, University of Washington 외)"
arxiv_id: "2605.02881"
url: "https://arxiv.org/abs/2605.02881"
tags: [physical-ai, vla, manipulation, robot-dataset]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/fang-2026-molmoact2-action-reasoning-models-for/fig01.png
    raw: raw/papers/fang-2026-molmoact2-action-reasoning-models-for-figures/fig01.png
    caption: "MolmoAct2 개요. 왼쪽은 BimanualYAM, DROID, SO100/101 세 공개 로봇 데이터셋, 가운데는 pre-training된 MolmoAct2가 KV connection으로 action expert를 조건화하는 구조와 adaptive depth perception token을 추가한 MolmoAct2-Think, 오른쪽은 세 embodiment에 바로 배포한 장면과 가정, 실험실, 카페 환경 적응 사례다"
    page: 2
    bbox_norm: [0.1106,  0.0917,  0.8893,  0.2876]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/fang-2026-molmoact2-action-reasoning-models-for/fig02.png
    raw: raw/papers/fang-2026-molmoact2-action-reasoning-models-for-figures/fig02.png
    caption: "MolmoAct2 학습 데이터 구성. 공개 학술 로봇 데이터셋(Fractal, DROID, Bridge-V2, MolmoAct), MolmoAct2-BimanualYAM, MolmoAct2-SO100/101, 멀티모달 웹 데이터, embodied reasoning 데이터를 함께 섞는다"
    page: 7
    bbox_norm: [0.1134,  0.1103,  0.8953,  0.4619]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/fang-2026-molmoact2-action-reasoning-models-for/fig03.png
    raw: raw/papers/fang-2026-molmoact2-action-reasoning-models-for-figures/fig03.png
    caption: "MolmoAct2-BimanualYAM 수집 장치. 양팔 YAM, Intel RealSense D435와 D405 카메라, 확장형 카메라 거치대, IKEA 테이블로 구성하며 전체 비용은 6,000달러 미만이다"
    page: 8
    bbox_norm: [0.2596,  0.0844,  0.7401,  0.3814]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/fang-2026-molmoact2-action-reasoning-models-for/fig04.png
    raw: raw/papers/fang-2026-molmoact2-action-reasoning-models-for-figures/fig04.png
    caption: "MolmoAct2 post-training 구조. 이미지, 지시문, 로봇 state를 tokenize해 pre-training된 VLA에 넣고, 각 layer의 key와 value를 P_K, P_V 투영으로 같은 깊이의 action expert cross-attention에 넘긴다. VLA는 이산 action 토큰을 next-token prediction으로, action expert는 noise에서 연속 action을 flow matching으로 만들며, 정답 이산 action 구간은 expert 조건에서 마스킹한다"
    page: 11
    bbox_norm: [0.1002,  0.0674,  0.8998,  0.3426]
    strategy: manual
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/fang-2026-molmoact2-action-reasoning-models-for/fig05.png
    raw: raw/papers/fang-2026-molmoact2-action-reasoning-models-for-figures/fig05.png
    caption: "MolmoAct2-Think 개요. 직전 시점과 비교해 바뀐 영역의 depth 토큰만 다시 생성하고(T=1) 나머지는 캐시에서 재사용해 depth map을 갱신한 뒤, 그 상태로 action expert를 조건화한다"
    page: 15
    bbox_norm: [0.2597,  0.0729,  0.7403,  0.389]
    strategy: caption-region
    curated: true
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/fang-2026-molmoact2-action-reasoning-models-for/fig06.png
    raw: raw/papers/fang-2026-molmoact2-action-reasoning-models-for-figures/fig06.png
    caption: "RoboEval 벤치마크 비교. (A) 8개 양팔 과제별 성공률, (B) 완료 시간, 경로 길이, jerk 등 행동 지표를 정규화한 레이더 차트. 그림 범례의 MolmoAct가 이 논문의 fine-tuning 모델이다"
    page: 21
    bbox_norm: [0.1043,  0.0894,  0.894,  0.2652]
    strategy: caption-region
    curated: true
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/fang-2026-molmoact2-action-reasoning-models-for/fig07.png
    raw: raw/papers/fang-2026-molmoact2-action-reasoning-models-for-figures/fig07.png
    caption: "실세계 효율적 fine-tuning 평가 개요. 피펫 준비부터 장난감 정리까지 실험실 밖 8개 과제에서 MolmoAct2가 네 기준선보다 15%p 앞선다"
    page: 23
    bbox_norm: [0.106,  0.0729,  0.8939,  0.4946]
    strategy: caption-region
    curated: true
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/fang-2026-molmoact2-action-reasoning-models-for/fig08.png
    raw: raw/papers/fang-2026-molmoact2-action-reasoning-models-for-figures/fig08.png
    caption: "캐싱과 CUDA Graph 적용 후 control rate. MolmoAct2는 23.02Hz에서 55.79Hz로, MolmoAct2-Think는 8.04Hz에서 12.71Hz로 오르며, 이산 action 경로는 각각 14.17Hz와 6.82Hz다 (H100, LIBERO, action horizon 10)"
    page: 27
    bbox_norm: [0.1905,  0.0729,  0.8095,  0.3778]
    strategy: caption-region
    curated: true
---

## 요약

MolmoAct2는 Allen Institute for AI(Ai2)와 University of Washington이 2026년 5월 공개한 VLA로, 모델 가중치와 학습 코드와 학습 데이터 전부를 공개한 action reasoning model이다. action reasoning model은 action을 내기 전에 공간 표현 같은 중간 추론을 먼저 만드는 VLA를 가리키는 MolmoAct 계열의 자기 명칭이다. 논문 제목이 말하듯 목표는 연구용 시연이 아니라 실제 현장 배포다.

MolmoAct2는 전작 MolmoAct를 다섯 측면에서 바꾼다. embodied reasoning에 특화한 새 VLM backbone Molmo2-ER, 저가에서 중가 로봇 세 종을 위한 공개 데이터셋 세 개, 학습 데이터를 공개한 action tokenizer MolmoAct2-FAST, 이산 토큰 VLM과 연속 action expert를 층마다 잇는 per-layer KV conditioning 구조, 장면에서 바뀐 부분만 depth를 다시 추론하는 MolmoAct2-Think다.

평가는 시뮬레이션과 실세계를 합쳐 7개 환경에서 이뤄진다. LIBERO 평균 성공률 97.2%(Think 98.1%), DROID Franka 실세계 zero-shot 87.1%, 양팔 YAM 실세계 8개 과제 fine-tuning 평균 50.1%를 기록해 π0.5를 포함한 기준선을 앞선다. backbone인 Molmo2-ER은 13개 embodied reasoning 벤치마크 평균 63.8%로 GPT-5와 Gemini Robotics ER 1.5를 넘는다.

![[assets/fang-2026-molmoact2-action-reasoning-models-for/fig01.png]]
*Figure 1: MolmoAct2 개요. 왼쪽은 세 공개 데이터셋, 가운데는 KV connection으로 action expert를 조건화하는 MolmoAct2와 adaptive depth token을 더한 MolmoAct2-Think, 오른쪽은 세 embodiment 배포와 가정, 실험실, 카페 적응 사례 (Fang 2026, p.2)*

## 배경

### 현재 VLA가 배포에 못 미치는 네 가지 이유

저자는 VLA가 로봇용 단일 generalist 컨트롤러를 지향하지만 실제 배포에는 아직 부족하다고 진단한다. 부족한 지점은 네 가지로 정리된다.

| 문제 | 내용 |
|---|---|
| 비공개 | frontier VLA는 학습 데이터, 레시피, 가중치가 모두 비공개다. 일부는 가중치만 공개해 재현이나 확장이 어렵다 |
| 하드웨어 의존 | 바로 쓸 수 있는 공개 가중치 VLA(π0, π0.5)는 비싸거나 특수한 로봇 플랫폼에 묶여 있다 |
| reasoning 지연 | 목표 이미지, point trajectory, world model rollout 같은 reasoning은 action 품질을 높이지만 action 하나를 내기 전에 토큰 수백 개나 프레임 전체를 생성해야 해 closed-loop 제어에 너무 느리다 |
| 성공률 부족 | zero-shot 성능은 불안정하고, 과제별 fine-tuning 후에도 실제 과제 성공률이 신뢰할 수준에 못 미친다 |

closed-loop 제어는 매 timestep 새 observation을 받아 action을 다시 정하는 방식을 말한다. 따라서 reasoning 지연이 길면 policy가 장면 변화에 늦게 반응하게 된다. 서론은 "policy를 더 믿을 만하게 만들려는 장치가 오히려 closed-loop 제어에 쓰기에는 너무 느리게 만든다"고 요약한다.

### 인지과학적 출발점

서론은 Tversky의 연구를 인용해 물리 지능이 지각과 행위를 중심으로 조직된다고 설명한다. 사람은 추상적인 내부 계산보다 공간 표현을 구성하고, 행위를 시뮬레이션하고, 몸으로 세계와 상호작용하며 생각한다. 이 관점에서 현재 로봇 foundation model은 구조화된 공간 표현이 부족하고, 무거운 내부 추론이 실시간 상호작용을 막고, 개방성이 낮아 적응과 확장이 어렵다는 세 가지 결함을 가진다. MolmoAct2의 다섯 가지 변경은 이 결함을 각각 겨냥한다.

### 전작 MolmoAct와의 관계

MolmoAct(Lee 2025)는 depth 토큰 예측을 중간 reasoning 단계로 넣어 공간 grounding을 얻은 첫 버전이다. MolmoAct2는 이 아이디어를 유지하면서 backbone, 데이터, tokenizer, 구조, reasoning 효율을 모두 다시 설계한다. LIBERO 기준 성공률은 MolmoAct-7B-D의 86.6%에서 97.2%로 10.6%p 오른다.

## 핵심 개념

policy는 현재 observation을 받아 다음 action을 정하는 함수를 말한다. MolmoAct2에서 observation은 여러 카메라 이미지, 자연어 지시문(instruction), 로봇 관절 state로 구성되고, action은 1초 분량의 관절 또는 end-effector 명령이다.

action chunk는 policy가 한 번에 출력하는 여러 timestep 분량의 action 묶음이다. MolmoAct2는 1초 분량을 한 chunk로 쓰므로 chunk 길이가 데이터의 control frequency와 같다. control frequency는 로봇이 1초에 몇 번 새로운 action을 갱신하는지를 뜻하며, 양팔 YAM은 30Hz, DROID는 15Hz, LIBERO는 10Hz다.

action tokenization은 연속값인 제어 명령을 이산 토큰으로 바꾸는 기법이다. 이산 토큰으로 바꾸면 VLM이 텍스트를 다루듯 next-token prediction으로 action을 학습할 수 있다. FAST tokenizer는 action chunk를 주파수 영역으로 변환하고 압축해 짧은 토큰열로 적는 방식이다.

flow matching은 noise에서 데이터로 향하는 vector field를 학습해 샘플을 만드는 생성 기법이다. action expert는 로봇 action 생성만 맡도록 VLM과 분리한 별도 가중치 묶음이다. MolmoAct2에서는 action expert가 flow matching으로 noise action chunk를 연속 action으로 바꾼다.

embodiment는 로봇의 물리적 형상과 그에 딸린 제어 API 구성을 뜻한다. MolmoAct2는 양팔 YAM, SO-100/101, DROID Franka 세 embodiment를 주 배포 대상으로 삼는다. 세 플랫폼 모두 저가에서 중가 범위라는 점이 하드웨어 의존 문제에 대한 답이다.

knowledge insulation은 backbone을 이산 action 토큰으로 지도하고 action expert의 gradient는 backbone으로 흘리지 않는 학습 레시피다. π0.5-KI에서 유래했으며 MolmoAct2는 post-training에서만 쓴다.

## 방법

### 학습 파이프라인 전체

MolmoAct2는 세 단계로 학습한다. VLM과 연속 action expert를 처음부터 함께 학습하면 로봇 토큰 인터페이스, 새 state와 action 임베딩, flow matching 컨트롤러를 동시에 배워야 해 최적화가 불필요하게 어려워진다. 따라서 이산 action으로 backbone을 먼저 로봇에 적응시키고 연속 expert는 그 뒤에 붙인다.

| 단계 | 산출물 | 목적 함수 | 주요 설정 |
|---|---|---|---|
| Pre-training | MolmoAct2-Pretrain | next-token prediction만 | 20만 step, 64 H100, 약 5,760 GPU 시간 |
| Post-training | MolmoAct2-Post | L_LM + L_flow | 10만 update, 64 H100, 약 2,304 GPU 시간 |
| Fine-tuning | embodiment별 체크포인트 | L_LM + L_flow | 로봇 데이터만, embodiment마다 별도 학습 |

post-training을 embodiment별 fine-tuning과 분리한 이유는 효율이다. post-training mixture는 데이터셋, 로봇, control frequency, 카메라 배치, 과제 종류가 의도적으로 다양하다. 이 단계를 모든 embodiment에서 바로 배포 가능할 때까지 늘리면 학습이 길고 비싸진다. 그래서 post-training은 범용 연속 제어 기반 모델을 만들고, fine-tuning이 같은 구조와 출력 인터페이스를 유지한 채 특정 embodiment와 환경에 빠르게 맞춘다.

### Molmo2-ER backbone

Molmo2-ER은 Molmo2를 embodied perception 기술에 맞게 fine-tuning한 VLM이다. 기존 VLM backbone은 의미 중심 이미지 이해에 최적화돼 있어 거리, 빈 공간, 다시점 물체 추적, 장면 기하처럼 로봇 제어에 필요한 metric 공간 추론이 약하다. 범용 VLM은 이런 embodied 기술을 학습하지도 평가하지도 않는다.

새로 만든 embodied reasoning corpus는 약 330만 샘플이며 여섯 능력 영역으로 구성된다. 영역마다 시뮬레이터 정답, 3D 주석 실제 스캔, 템플릿 QA, 소량의 LLM 생성 chain-of-thought처럼 서로 다른 지도 원천을 두세 개씩 섞어 특정 템플릿에 과적합하지 않게 했다.

| 능력 영역 | 데이터 | 역할 |
|---|---|---|
| 단일 이미지 embodied QA | SAT, RoboPoint-QA, RefSpatial, VST-P, VSI-590K | 자기 시점 운동과 시점 전환(SAT), 기본 인식 망각 방지(RoboPoint-QA), 공간 언어에서 pointing으로의 연결(RefSpatial), 가상 카메라 기준 metric depth와 크기(VST-P), 실제 로봇 영상과 투어 영상(VSI-590K) |
| 영상 embodied QA | SIMS-VSI 20만 3천, RoboVQA 20만 | 거리, 방향, 개수, 시간 순서(SIMS-VSI), 계획과 affordance와 미래 예측(RoboVQA) |
| pointing과 detection | RoboPoint 70만, LVIS detection 10만 | pointing이 주 action 인터페이스라 pixel 정밀 위치를 일부러 많이 넣음 |
| 다중 이미지와 ego-exo | SenseNova-SI 50만, VST-P cross-view 20만 | 1인칭과 3인칭 카메라 사이의 대응 |
| 추상 reasoning | CLEVR 5만, GRiD-3D 10만 | 속성과 관계의 조합 추론, 카메라가 아닌 물체 자신 기준 방향 |

affordance는 물체가 허용하는 상호작용 가능성을 뜻한다. RoboVQA는 이런 질문 유형을 담고 있어 policy 행동과 가장 직접 연결된다.

학습은 Molmo2 전체를 새 corpus와 함께 다시 학습하는 대신 공개 체크포인트 위에서 두 단계로 진행한다. 이 방식을 specialize-then-rehearse 레시피라 부른다.

| 단계 | 시작점과 데이터 | 설정 | 효과 |
|---|---|---|---|
| Stage 1 embodied 특화 | Molmo2-4B mid-training 체크포인트, Molmo2-ER corpus와 Tulu-3 텍스트 8% | 2만 step, 시퀀스 4,200, global batch 64 (2노드 x 8 H100) | pointing, 영상 embodied QA, 다중 이미지 추론이 크게 향상 |
| Stage 2 joint refinement | Stage 1 체크포인트, embodied corpus와 Molmo2 원래 mid-training 데이터 혼합 | 1,500 step, 시퀀스 16,384 | 텍스트 8% 고정, 나머지 92%를 embodied p와 일반 (1-p)로 분할 |

Stage 2에서 p를 0.30, 0.50, 0.70, 0.90으로 바꿔 본 결과 p=0.5가 embodied 벤치마크와 Molmo2 일반 벤치마크 사이에서 가장 좋은 Pareto 균형을 보였다. 즉 embodied 능력을 얻으면서 일반 시각 언어 능력을 잃지 않으려면 두 데이터를 절반씩 다시 섞는 것이 가장 좋았다.

### 학습 데이터

MolmoAct2의 데이터 mixture는 공개 학술 로봇 데이터, 새로 만든 세 로봇 데이터셋, 멀티모달 웹 데이터, embodied reasoning 데이터로 이뤄진다. 공개 corpus만으로 부족한 이유는 각 corpus의 한계 때문이다.

| 공개 corpus | 한계 |
|---|---|
| Open X-Embodiment(OXE) | embodiment 폭은 넓지만 구성 데이터셋마다 품질, 제어 규약, 언어 주석 정확도가 크게 다르다 |
| DROID | 단일 Franka 플랫폼 규모는 크지만 idle 구간, 실패 시도, 반복 지시문이 많다 |
| LeRobot 커뮤니티 SO-10x | embodiment와 장면 다양성은 높지만 "lerobot_test" 같은 placeholder 주석이 섞여 있다 |
| 양팔 데이터 | 배포 대상 플랫폼의 고품질 양팔 데이터가 공개된 것이 없고, 장면과 물체 변화도 적다 |

![[assets/fang-2026-molmoact2-action-reasoning-models-for/fig02.png]]
*Figure 2: MolmoAct2 학습 데이터 구성. 학술 로봇 데이터, BimanualYAM, SO100/101, 멀티모달 웹 데이터, embodied reasoning 데이터를 함께 섞는다 (Fang 2026, p.7)*

새로 공개한 세 데이터셋은 다음과 같다.

| 데이터셋 | 구성 | 규모 |
|---|---|---|
| MolmoAct2-BimanualYAM | Cortex AI 지원으로 자체 수집한 양팔 YAM teleoperation 데이터. 옷 개기, 케이블 풀기, 테이블 치우기, 장보기 스캔, 약 포장 등 28개 이상 과제 | 시연 데이터(demonstration) 3만 4,500개, 720시간 이상, 2개월 수집 |
| MolmoAct2-SO100/101 | LeRobot 공개 데이터셋 1,660개를 네 단계로 필터링 | 데이터셋 1,222개, 기여자 377명, episode 3만 8,059개, 1,980만 프레임, 약 184시간 |
| MolmoAct2-DROID | DROID 원본에 확장 언어 주석과 idle 프레임 필터 적용 | episode 7만 4,604개, 1,775만 8,044 프레임 |

teleoperation은 사람이 로봇을 원격으로 움직여 시연 데이터를 만드는 방식이다. BimanualYAM은 실패 재시도 횟수와 no-op 구간의 최대 길이를 엄격히 규정해 품질을 관리했고, 같은 과제를 장면 배치, 물체 개체, 물체 위치를 바꿔 가며 반복 수집했다. 저자는 이 데이터셋이 공개 양팔 manipulation 데이터셋 중 가장 크다고 밝힌다.

![[assets/fang-2026-molmoact2-action-reasoning-models-for/fig03.png]]
*Figure 3: BimanualYAM 수집 장치. 양팔 YAM, RealSense D435와 D405, 카메라 거치대, IKEA 테이블로 구성하며 전체 비용은 6,000달러 미만이다 (Fang 2026, p.8)*

수집 장치는 모두 시중에서 살 수 있는 부품이고 전체 비용이 6,000달러 미만이다. 즉 학술 연구실이나 개인 연구자도 같은 장치를 갖춰 공개 모델을 바로 쓰거나 자체 데이터를 추가할 수 있다.

SO100/101 필터링은 네 단계로 진행한다.

1. 구조 검사: 필수 스키마 필드, 유효한 action과 state 텐서, NaN이나 손상 샘플이 없는지 확인한다.
2. 평가용 데이터셋 제거: eval 형식 데이터셋을 뺀다.
3. 라이선스와 codebase 적격성 검사.
4. TOPReward 품질 게이트: 마지막 3개 샘플 episode의 평균 TOPReward가, 사람이 검수한 고품질 데이터셋들의 평균 TOPReward보다 높은 데이터셋만 남긴다.

이 과정에서 1,660개 중 438개가 제외됐다. 중앙에서 수집한 데이터셋에 비해 커뮤니티 데이터는 사용자 설정, 배경, 물체, 과제 주석이 훨씬 다양해 실세계 강건성을 높이는 원천이 된다.

### 언어 재주석

데이터셋의 지시문에는 두 가지 문제가 있다. 첫째, 같은 과제를 대규모로 반복 수집한 데이터는 지시문이 단조롭다. 예를 들어 BC-Z 데이터는 3만 9,350 episode에 고유 지시문이 104개(0.26%)뿐이다. 둘째, 크라우드소싱 데이터는 "lerobot_test", "Test run" 같은 무의미한 주석을 담고 있다.

저자는 공개 VLM Qwen3.5-27B로 데이터셋을 다시 주석한다. VLM에 프레임 샘플과 원래 지시문을 주고 시연을 설명하는 새 지시문을 쓰게 하며, 다양성을 위해 무작위로 뽑은 단어 수에 맞춰 쓰도록 요청한다. 재주석으로 전체 고유 지시문 수가 7만 1,121개(22%)에서 14만 6,485개(46%)로 두 배가 됐다. 부록 Figure 13에 따르면 SO100/101 데이터의 동사 분포도 put과 take 편중이 줄고 grasp, place, move와 기타 동사가 늘어 더 고르게 바뀐다.

### MolmoAct2-FAST Tokenizer

로봇 action은 연속값이고 embodiment마다 다르며 control frequency도 제각각이라 언어 모델 학습 스트림에 그대로 넣을 수 없다. MolmoAct2-FAST Tokenizer는 FAST(Pertsch 2025)의 원리를 그대로 따르되, 학습 데이터 구성까지 공개해 재현성을 확보한 tokenizer다. 기존 FAST 가중치는 유용하지만 어떤 데이터로 학습했는지가 완전히 명시되지 않았다.

tokenizer는 1초 action trajectory를 세 단계로 압축한다.

1. 주파수 영역 변환으로 trajectory를 계수로 표현한다.
2. 계수를 양자화한다.
3. byte-pair encoding으로 2,048개 어휘의 토큰열을 만든다.

학습 데이터는 다섯 embodiment에서 subsample한 action 시퀀스 100만 개다. 주 배포 플랫폼 세 개에 90%를 주고, 제어 방식을 넓히는 소규모 원천에 나머지를 준다.

| 데이터셋 | 비율 | 로봇 | action 표현 |
|---|---|---|---|
| MolmoAct2-BimanualYAM | 30% | YAM | 절대 관절 |
| MolmoAct2-SO100/101 | 30% | SO-100/101 | 절대 관절 |
| MolmoAct2-DROID | 30% | Franka | 절대 관절 |
| Fractal | 3.33% | Google Robot | delta end-effector |
| BC-Z | 3.33% | Google Robot | delta end-effector |
| Bridge | 3.33% | WidowX | delta end-effector |

토큰화 전에 모든 원시 텔레메트리를 공통 형식으로 맞춘다. 각 시퀀스는 로봇 움직임 1초이므로 chunk 안 action 수는 원 데이터의 control frequency가 정한다. 각 action은 32차원으로 padding해 action 차원이 다른 embodiment가 같은 입력 공간을 공유한다. 연속 차원은 1~99 percentile 통계로 정규화해 outlier 영향을 줄이고, 그리퍼 명령은 이진 또는 좁은 범위 개폐 신호라 이 정규화에서 따로 다룬다. 이 표준화 덕분에 관절 공간 제어와 end-effector 제어를 하나의 tokenizer가 함께 다룬다.

### Pre-training

MolmoAct2-Pretrain은 Molmo2-ER을 이산 autoregressive 로봇 policy로 바꾸되 Molmo2의 토큰 인터페이스를 그대로 유지한다. 이미지와 영상 프레임은 ViT가 인코딩하고 connector가 pooling해 LLM에 텍스트와 함께 넣는다. 로봇 예제는 여기에 현재 로봇 구성을 나타내는 state 토큰과 미래 1초 움직임을 나타내는 action 토큰 두 스트림을 더한다.

| 구성 | 설정 |
|---|---|
| vision encoder | SigLIP2 ViT. 뒤에서 세 번째와 아홉 번째 layer feature를 pooling해 투영 |
| 데이터 비율 | 멀티모달 10%, 로봇 90%. 로봇 몫 중 YAM, SO-100/101, DROID 각 30%, BC-Z, BridgeData V2, RT-1, MolmoAct Dataset이 나머지 10% |
| 시각 입력 | 고해상도 타일 대신 단일 resized crop. 영상은 최대 8프레임, 최대 2 FPS |
| augmentation | 가벼운 기하 변형, color jitter, 간헐적 blur. 다중 카메라 순서를 episode 단위로 무작위화 |
| 프롬프트 | `<setup_start>bimanual yam robotic arms in molmoact2<setup_end>`, `<control_start>absolute joint pose<control_end>` 같은 setup/control 래퍼 |
| state | 정규화한 proprioception 값을 각각 256개 state 토큰 중 하나로 균일 이산화 |
| packing | 최대 4,200 토큰 시퀀스에 여러 짧은 예제를 on-the-fly로 묶고 attention mask로 분리 |
| 학습 | 20만 step, global batch 128, 64 H100, 약 5,760 GPU 시간. 학습률 vision encoder와 connector 5e-6, LLM 1e-5 |

proprioception은 관절 각도처럼 로봇 자신의 상태 감각 입력을 말한다. 카메라 순서를 무작위로 섞는 이유는 모델이 고정된 카메라 슬롯에 의존하지 않게 하기 위해서다. packing은 텍스트만 있는 예제가 수백 토큰, 다중 카메라 로봇 예제가 훨씬 긴 길이 차이를 효율적으로 처리하기 위한 장치다.

### Post-training과 per-layer KV conditioning

Post-training은 pre-training된 VLM에 DiT 형태의 flow matching action expert를 붙여 연속 action을 직접 출력하게 한다. DiT는 diffusion 모델의 denoising 신경망을 Transformer로 구현한 구조다. 저자는 denoising Transformer가 연속 생성에서 잘 확장된다는 점, action trajectory가 텍스트 같은 토큰열보다 짧은 연속 시퀀스로 표현하기 자연스럽다는 점을 선택 근거로 든다.

역할은 둘로 나뉜다. VLM은 시각과 언어 grounding과 로봇 state 맥락을 제공하고, expert는 noise action chunk를 실행 가능한 trajectory로 바꾸는 velocity field를 모델링한다.

![[assets/fang-2026-molmoact2-action-reasoning-models-for/fig04.png]]
*Figure 4: MolmoAct2 post-training 구조. VLA의 각 layer key와 value를 P_K, P_V로 투영해 같은 깊이 action expert의 cross-attention에 넘긴다. VLA는 이산 action을, expert는 연속 action을 만들며 정답 이산 action 구간은 expert 조건에서 마스킹한다 (Fang 2026, p.11)*

flow matching 목적 함수는 다음과 같이 정의된다.

- 정규화한 목표 action chunk a, 가우시안 noise ε, 시간 t ∈ [0,1]을 뽑는다.
- noise와 데이터 사이를 보간한 x_t = (1-t)ε + ta를 만든다.
- 목표 velocity는 u* = a - ε이다.
- expert f_θ(x_t, t, c)가 u*를 맞히도록, padding된 step과 차원을 가리는 마스크 m을 곱한 제곱 오차 L_flow를 최소화한다.

c는 과제, 시각 observation, setup/control 문자열, 이산 state 토큰을 담은 VLM 맥락이다. 추론 시에는 가우시안 noise에서 시작해 예측 velocity field를 적분해 action trajectory를 얻는다.

expert의 깊이는 VLM과 같은 L=36 layer다. 각 block은 action self-attention, VLM으로의 cross-attention, MLP 세 가지로 구성되고, 시간 임베딩이 세 가지 각각에 DiT 형태의 shift, scale, gate 값을 준다(AdaRMS 정규화).

핵심 설계는 cross-attention이 무엇을 조건으로 받는지다. 일반적인 action expert는 VLM 마지막 hidden state를 얕게 투영해 받는데, 이는 backbone 전체를 하나의 residual stream 표현으로 압축하는 셈이다. MolmoAct2는 대신 층마다 연결한다.

1. VLM layer ℓ의 self-attention이 만든 key K_ℓ와 value V_ℓ를 모은다.
2. 학습형 adapter 투영 P_K, P_V로 expert의 cross-attention 폭에 맞춘다. 이 투영은 VLM 자체의 attention 투영과 별개다.
3. expert block ℓ의 query Q_ℓ가 투영된 key와 value에 softmax(Q K^T / √d_h) V로 attention한다.

이 per-layer KV conditioning은 expert의 모든 block이 같은 깊이의 VLM attention state에 직접 접근하게 한다. 연산량은 hidden state 조건화와 비슷하면서 VLM 자신이 쓰는 attention 정보를 그대로 노출하고, backbone과 새 expert 사이의 모듈식 인터페이스도 유지한다. ablation에서 이 방식이 hidden state 조건화보다 평균 1.9%p 높았다.

Post-training 레시피의 나머지 세부는 다음과 같다.

| 항목 | 설정과 이유 |
|---|---|
| 다중 flow 샘플 | action chunk마다 (ε, t) 쌍을 K=4개 뽑아 같은 VLM 맥락으로 네 지점을 학습. fine-tuning의 K=8을 쓰지 않은 것은 GPU 메모리 제약 때문 |
| padding | 연속 action을 최대 30 step, 32차원으로 오른쪽 padding. horizon 마스크가 padding step을, 차원 마스크가 padding 차원을 손실에서 제외 |
| packing | packed 시퀀스 하나에 여러 로봇 예제가 들어가면 각 action chunk는 자기 예제의 VLM 맥락만 본다. chunk 수를 최대 5개로 맞춰 메모리를 안정화 |
| 목적 함수 | L_post = L_LM + L_flow. LM 손실은 pre-training과 같은 next-token 대상, flow 손실은 연속 action chunk에만 적용 |
| 정답 누출 방지 | 로봇 예제는 이산 action 대상과 연속 action 대상을 모두 가지므로, 이산 action 토큰 구간을 expert 조건 경로에서 마스킹 |
| knowledge insulation | expert가 받는 key와 value를 detach해 L_flow가 VLM으로 역전파되지 않음. VLM은 L_LM으로만 갱신 |
| 시퀀스 길이 | 로봇 batch 2,100 토큰, VLM batch 4,200 토큰. 로봇 batch는 expert와 flow 샘플 4개를 추가로 계산하기 때문 |
| 학습 | 10만 update, global batch 128, device batch 2, 64 H100, 약 2,304 GPU 시간. 학습률 VLM 쪽은 pre-training과 같고 action expert 5e-5 |

정답 누출 방지 마스킹이 없으면 expert가 VLM이 보고 있는 정답 이산 action 토큰을 그대로 읽어 연속 action을 맞히는 지름길을 배우게 된다. 마스킹 후 expert는 과제, observation, state만 보고 action을 만들어야 한다.

### embodiment별 fine-tuning

fine-tuning은 MolmoAct2-Post에서 시작해 같은 VLM과 action expert 구조, 같은 32차원 action 폭, 같은 학습률을 유지한다. post-training과 다른 점은 네 가지다.

| 차이 | 내용 |
|---|---|
| 데이터 | 로봇 데이터만 쓰고 멀티모달 VLM mixture는 쓰지 않는다 |
| flow 샘플 | chunk당 4개에서 8개로 늘려 더 촘촘하게 지도한다 |
| knowledge insulation | 끈다. flow 손실 gradient가 VLM까지 흐른다. detach가 일관된 이득을 주지 않았기 때문이다 |
| 학습 파라미터 | 추가 토큰의 입력 임베딩은 고정하고 LM 출력 head와 최종 정규화를 조정한다 |

embodiment별 체크포인트 설정은 다음과 같다.

| 체크포인트 | 카메라 순서 | action | chunk | 학습 규모 |
|---|---|---|---|---|
| MolmoAct2-BimanualYAM | top, left, right 고정 | 절대 관절, 재주석 지시문 사용 | 30 step (30Hz) | batch 128, 10만 update, 64 H100, 약 2,304 GPU 시간 |
| MolmoAct2-DROID | 외부 카메라 하나 다음 손목 카메라 | 절대 관절 | 15 step (15Hz) | batch 64, 10만 update, 32 H100, 약 1,152 GPU 시간 |
| MolmoAct2-SO100/101 | episode 단위 무작위 | 절대 관절, 재주석 지시문 사용 | 30 step (30Hz) | batch 64, 10만 update, 32 H100, 약 1,152 GPU 시간 |
| MolmoAct2-LIBERO | 전면 다음 손목 | 상대 end-effector | 10 step (10Hz) | 네 과제군 통합, batch 64, 5만 update, 4만 update 체크포인트 선택 |
| 기타 실세계 평가용 | 메타데이터 순서 고정 | 데이터셋 표현을 따름 | control frequency와 같음 | 8 H100, batch 16, 5만 update, 최고 체크포인트 선택 |

DROID 체크포인트는 기존 DROID 학습 모델과 공정하게 비교하려고 추가 언어 주석을 쓰지 않는다. SO100/101은 인터넷에서 모은 시연이라 카메라 배치가 제각각이므로 고정된 시점 이름 규약 대신 순서를 무작위로 섞는다.

### 추론 최적화

MolmoAct2의 추론 시간은 대부분 action expert의 고정 step flow 적분이 차지한다. 한 action chunk를 만드는 동안 VLM 맥락은 flow step 사이에 변하지 않고 noise action 상태와 flow 시간만 바뀐다. 이 성질을 이용해 두 가지를 최적화한다.

- **캐싱**: 맥락 의존 cross-attention 상태와 고정된 위치 의존 항을 한 번 계산해 flow 루프 전체에서 재사용한다.
- **CUDA Graph**: 고정 형태의 flow 루프를 CUDA Graph로 캡처해 반복 실행 시 Python과 kernel launch 오버헤드를 줄인다.

### MolmoAct2-Think의 adaptive depth reasoning

로봇 조작은 거리, 빈 공간, 가림, 표면 배치 같은 공간 정보에 의존하지만, 일반 behavioral cloning 목적은 이 구조를 action 전에 명시적으로 만들라고 요구하지 않는다. behavioral cloning은 시연의 observation과 action 쌍을 지도학습으로 흉내 내는 방법이다. MolmoAct는 이 문제를 depth 토큰 예측이라는 중간 reasoning 단계로 해결했고, MolmoAct2-Think는 같은 아이디어를 MolmoAct2에 옮기면서 시간에 따라 adaptive하게 만든다.

depth 표현은 의도적으로 가볍다. 각 observation의 depth map을 10x10 격자로 양자화해 100개 위치를 만들고, 위치마다 128개 학습된 depth 코드 중 하나를 고른다. 이 코드는 일반 autoregressive 토큰으로 표현되므로 MolmoAct2의 next-token 인터페이스와 그대로 호환되고, 해석 가능한 중간 예측으로도 쓰인다.

![[assets/fang-2026-molmoact2-action-reasoning-models-for/fig05.png]]
*Figure 5: MolmoAct2-Think 개요. 직전 시점과 비교해 바뀐 영역의 depth 토큰만 다시 생성(T=1)하고 나머지는 캐시를 재사용해 depth map을 갱신한 뒤 action expert를 조건화한다 (Fang 2026, p.15)*

핵심 관찰은 로봇 trajectory의 시간적 중복이다. 장면 단위 depth 격자의 많은 칸은 control step 사이에 거의 변하지 않는다. 따라서 매 step 100개 코드를 모두 다시 예측하는 대신 바뀐 칸만 예측하면, reasoning 비용이 전체 격자 크기가 아니라 장면 변화량에 비례하게 된다.

데이터 준비는 다음 순서로 진행된다.

1. 각 RGB 프레임에 Depth Anything V2로 단안 depth map을 추정한다.
2. MolmoAct의 depth VQ-VAE(320x320 입력, downsampling 32)로 양자화해 0~127 범위 코드 10x10 격자를 얻는다.
3. 다음 프레임 RGB를 320x320으로 줄여 32x32 patch 100개로 나누고, 직전 프레임 같은 위치 patch와 cosine similarity를 계산한다.
4. similarity가 0.996 미만인 칸을 갱신 칸으로 표시한다. 갱신 칸은 새 코드를, 나머지 칸은 직전 buffer 코드를 이어받는다.
5. 모델은 이 buffer 코드를 정답으로 학습한다. 추론 시 유지할 표현과 같은 형태다.

episode 첫 프레임은 모든 칸이 갱신 칸이다. 다중 시점 데이터셋은 depth 주석이 있는 첫 policy 시점을 쓴다.

### MolmoAct2-Think의 학습

Think의 post-training은 MolmoAct2와 같은 20만 step Pretrain 체크포인트에서 시작해 같은 레시피(데이터, action expert, per-layer KV conditioning, 시퀀스 길이, 10만 update, batch 128, 64 H100)를 따른다. 차이는 depth 관련 특수 토큰을 추가하고 로봇 데이터에서 세 과제를 균일하게 샘플링한다는 점이다.

| 과제 | 출력 |
|---|---|
| action 예측 | 이산과 연속 action |
| depth 예측 | depth buffer 토큰 100개 |
| depth 후 action 예측 | depth 토큰을 먼저 예측한 뒤 이산 action 토큰을 예측하고, expert는 입력 맥락과 예측 depth를 조건으로 연속 action 생성 |

LIBERO fine-tuning은 MolmoAct2-LIBERO와 같은 레시피와 계산량을 쓰고 3만 update 체크포인트를 선택한다. depth post-training과 다른 점은 세 가지다.

- **mixed training**: action 과제와 depth 후 action 과제만 균일하게 섞고 순수 depth 예측은 뺀다.
- **noise 주입**: 추론 때는 모델이 예측한 depth를 조건으로 쓰므로, 학습 중 teacher forcing하는 depth 입력 토큰의 10%를 무작위 코드로 바꾼다. 예측 대상은 그대로 둔다.
- **depth gate**: action expert의 per-layer KV 조건 중 depth 토큰 부분에만 layer별 학습형 gate를 곱한다. gate 값은 해당 VLM layer의 비 depth 맥락 value 평균에 선형 변환과 sigmoid를 적용해 구하며, bias를 -4로 초기화해 처음에는 depth를 거의 쓰지 않는 표준 경로에서 출발한다.

noise 주입과 gate는 모두 추론 시 depth 예측이 틀릴 수 있다는 점에 대비한 정규화다. gate는 각 expert layer가 depth prefix를 얼마나 쓸지 스스로 배우게 한다.

### MolmoAct2-Think의 추론

추론은 depth 후 action 출력 형식을 쓴다. 프롬프트가 `<depth_output><action_output>`을 요청하면 모델은 프롬프트와 이미지를 prefill한 뒤 depth를 채운다.

| 상황 | 동작 |
|---|---|
| 캐시 없음 (rollout 시작, reset 직후) | `<depth_start>`, depth 코드 100개, `<depth_end>`를 모두 autoregressive 생성 |
| 캐시 있음 | 현재 이미지와 캐시 이미지를 같은 cosine 기준으로 비교. 바뀐 칸은 depth 토큰 logit에서 argmax decoding, 안 바뀐 칸은 이전 buffer를 known 토큰으로 재생. 연속된 불변 구간은 한 번에 재생 |
| depth 완료 후 | 현재 이미지와 새 100개 buffer를 다음 step 캐시로 저장 |

action expert는 프롬프트와 채워진 depth prefix에 해당하는 VLM key와 value를 받아 velocity field를 적분한다. adaptive depth는 중간 depth prefix를 만드는 방식만 바꾸고 action 인터페이스는 그대로 둔다.

Think의 추론 최적화는 MolmoAct2와 다른 문제를 가진다. 프레임마다 재생성 칸과 재생 칸의 조합이 달라 decode 일정이 데이터에 따라 바뀌므로, 루프 전체를 graph로 캡처하려면 갱신 패턴마다 graph가 필요하다. 그래서 scheduler는 eager로 두고 static KV cache를 미리 할당해 decode 상태를 안정화하며, 재생성 depth 토큰에 대해서는 attention 이후부터 다음 layer attention 이전까지의 고정 형태 연산만 CUDA Graph 단계로 캡처한다. attention은 KV 길이가 계속 바뀌므로 eager로 둔다.

## 결과

### 평가 설계

논문은 8개 연구 질문으로 평가를 구성한다.

| 질문 | 평가 |
|---|---|
| Molmo2-ER의 embodied reasoning 수준 | 13개 VLM 벤치마크 |
| out-of-the-box 배포 성능 | MolmoSpaces, MolmoBot 시뮬레이션과 DROID, SO-100 실세계 zero-shot |
| fine-tuning 효율 | RoboEval, LIBERO, 양팔 YAM 실세계 8개 과제 |
| adaptive depth 효과 | LIBERO에서 MolmoAct2와 Think 비교 |
| OOD 강건성 | 양팔 과제 4개에 네 가지 교란 |
| trajectory 품질 | RoboEval 행동 지표 |
| 구성 요소 기여 | LIBERO ablation |
| 추론 속도 | LIBERO에서 control rate 측정 |

### Molmo2-ER의 embodied reasoning

Molmo2-ER은 13개 벤치마크 중 9개에서 모든 기준선을 앞서고 평균 63.8%로 가장 높다. 두 번째인 Gemini Robotics ER 1.5 Thinking(61.3%)보다 2.5%p, 출발점 Molmo2(46.8%)보다 17.0%p 높다.

| 모델 | 구분 | 평균 |
|---|---|---|
| GR-ER 1.5 Thinking | API | 61.3% |
| GR-ER 1.5 | API | 55.0% |
| Gemini 2.5 Pro | API | 57.1% |
| GPT-5 | API | 57.9% |
| GPT-5-mini | API | 53.8% |
| Qwen3-VL-4B | 공개 가중치 | 59.0% |
| Qwen3-VL-8B | 공개 가중치 | 61.0% |
| LLaVA-OV-7B | 공개 가중치 | 38.1% |
| InternVL3.5-4B | 공개 가중치 | 49.4% |
| InternVL3.5-8B | 공개 가중치 | 52.4% |
| Molmo2 | 완전 공개 | 46.8% |
| Molmo2-ER | 완전 공개 | 63.8% |

벤치마크별로 보면 Molmo2-ER은 Point-Bench 77.3, RefSpatial 52.5, RoboSpatial-Point 32.0, Where2Place 54.0, BLINK 72.5, CV-Bench 87.8, ERQA 46.8, EmbSpatial 78.8, MindCube 57.0, RoboSpatial-VQ 73.4, SAT 78.0, OpenEQA 44.7, VSI-Bench 74.5를 기록한다. 특히 VSI-Bench(74.5 대 GPT-5 52.9)와 RoboSpatial-Point(32.0 대 Gemini 2.5 Pro 8.3)처럼 공간 영상 추론과 pointing에서 API 모델과 차이가 크다. 반면 ERQA, SAT, OpenEQA는 GPT-5가 더 높다.

### out-of-the-box 시뮬레이션

MolmoSpaces와 MolmoBot은 원래 DROID 장치를 복제해 DROID로 학습한 policy를 zero-shot 평가할 수 있는 시뮬레이션 벤치마크다. 두 벤치마크 모두 단일 pick-and-place를 다양한 물체와 환경에서 평가하며, MolmoBot이 더 어려운 물체와 상황을 포함한다.

| MolmoSpaces | Pick | Pick & Place | Open | Close | 평균 |
|---|---|---|---|---|---|
| StereoVLA | 7.0 | - | - | - | 7.0 |
| LAP-VLA | 24.9 | 6.6 | 11.4 | 45.9 | 22.2 |
| π0-DROID | 16.2 | 12.5 | 11.0 | 53.1 | 23.2 |
| π0.5-DROID | 36.4 | 13.6 | 22.7 | 65.1 | 34.5 |
| MolmoAct2-DROID | 43.7 | 26.7 | 9.5 | 70.8 | 37.7 |

MolmoAct2-DROID는 평균 37.7%로 π0.5-DROID보다 3.2%p 높다. 접촉이 많고 여러 단계가 필요한 Pick(+7.3%p)과 Pick & Place(+13.1%p)에서 차이가 크고, Close도 70.8%로 가장 높다. 반면 Open은 9.5%로 π0.5-DROID(22.7%)보다 낮다. 세 번 독립 평가의 표준오차는 모든 방법에서 3.2 이하라 차이가 평가 분산 때문은 아니다.

MolmoBot에서는 과제당 1,000 episode로 평가한다. MolmoAct2-DROID 평균은 20.6%로 π0.5-DROID(10.0%)의 약 두 배이고, LAP-VLA는 4.8%, X-VLA는 1.2%다. 본문은 이 차이를 +10.6%p로 보고한다. 과제별로는 Pick MSProc 35.6% 대 18.1%, Pick Classic 18.9% 대 6.4%, Pick 20.5% 대 7.0%, 무작위 카메라 Pick 15.4% 대 8.0%다. pick-and-place 계열은 "도중 한 번이라도 성공 조건 충족"과 "마지막 시점 성공"을 나눠 보고하는데, 두 값의 차이는 불안정한 배치나 이미 끝난 과제를 다시 집는 행동을 반영한다.

### out-of-the-box 실세계

실세계 zero-shot은 일부러 어렵게 설계했다. 카메라 위치를 데이터셋 시각 분포와 무관하게 무작위로 두고(손목 카메라와 외부 카메라 하나), 모든 물체를 학습에서 본 적 없는 것으로 쓰며, 환경도 학습 분포 밖이다. 과제당 15회 평가하고 거의 성공한 실행에는 부분 점수를 준다.

| DROID 실세계 | Apple on plate | Pipette in tray | Red cube in tape roll | Knife in box | Objects in bowl | 평균 |
|---|---|---|---|---|---|---|
| π0.5-DROID | 66.7 | 33.3 | 53.3 | 26.7 | 46.2 | 45.2 |
| MolmoBot | 86.7 | 53.3 | 33.3 | 40.0 | 28.6 | 48.4 |
| MolmoAct2-DROID | 100.0 | 86.7 | 93.3 | 93.3 | 62.0 | 87.1 |

MolmoAct2-DROID는 평균 87.1%로 두 번째인 MolmoBot(48.4%)보다 38.7%p 높고, 다섯 과제 모두에서 가장 높다. 사과를 접시에 놓는 과제는 15회 모두 성공했다. 시뮬레이션보다 분포 차이가 훨씬 큰 조건이라는 점에서 이 차이는 의미가 크다.

| SO-100 실세계 | Fork on plate | Stack blocks | Tissues in basket | Pen on notebook | Block in box | 평균 |
|---|---|---|---|---|---|---|
| SmolVLA | 3.3 | 5.0 | 0.0 | 3.3 | 0.0 | 2.3 |
| π0-SO100/101 | 30.0 | 6.7 | 20.0 | 80.0 | 90.0 | 45.3 |
| MolmoAct2-SO100/101 | 70.0 | 20.0 | 73.3 | 86.7 | 33.3 | 56.7 |

SO-100 점수는 reach 0.25, pickup 0.5, 배치 성공 1.0의 부분 점수 평균이다. π0-SO100/101은 저자들이 MolmoAct2-SO100/101 데이터로 직접 fine-tuning한 π0이므로 같은 데이터 위에서 모델 차이를 비교한 결과다. MolmoAct2-SO100/101은 평균 56.7%로 π0보다 11.4%p 높아, 저가 로봇에서도 바로 배포할 수 있음을 보인다. 다만 Block in box에서는 π0(90.0%)가 크게 앞선다.

### fine-tuning 성능

fine-tuning 실험은 모두 MolmoAct2-Post에서 시작해 벤치마크별 학습 데이터로 학습한다. LIBERO는 네 과제군(Spatial, Object, Goal, Long)이 각각 10개 과제와 시연 데이터 500개로 구성된다.

| LIBERO | Spatial | Object | Goal | Long | 평균 |
|---|---|---|---|---|---|
| TraceVLA | 84.6 | 85.2 | 75.1 | 54.1 | 74.8 |
| OpenVLA | 84.7 | 88.4 | 79.2 | 53.7 | 76.5 |
| SpatialVLA | 88.2 | 89.9 | 78.6 | 55.5 | 78.1 |
| CoT-VLA | 87.5 | 91.6 | 87.6 | 69.0 | 83.9 |
| π0 | 96.8 | 98.8 | 95.8 | 85.2 | 94.2 |
| ThinkAct | 88.3 | 91.4 | 87.1 | 70.9 | 84.4 |
| MolmoAct-7B-D | 87.0 | 95.4 | 87.6 | 77.2 | 86.6 |
| GR00T N1.7 | 97.7 | 97.5 | 98.5 | 94.4 | 97.0 |
| π0.5 | 98.8 | 98.2 | 98.0 | 92.4 | 96.9 |
| NORA-1.5 | 97.3 | 96.4 | 94.5 | 89.6 | 94.5 |
| MolmoAct2 | 97.8 | 100.0 | 97.8 | 93.2 | 97.2 |
| MolmoAct2-Think | 98.8 | 99.8 | 98.5 | 95.4 | 98.1 |

MolmoAct2는 평균 97.2%로 비교 모델 중 가장 높고 Object에서 100%를 기록하며, 전작 MolmoAct-7B-D보다 10.6%p 높다. 다만 GR00T N1.7(97.0%), π0.5(96.9%)와의 차이는 0.2~0.3%p로, LIBERO가 상위권에서 거의 포화돼 있음을 함께 보여준다. Think는 98.1%로 표에서 가장 높다.

RoboEval은 양팔 Franka Panda 장치에서 사람 전문가 시연으로 구성한 8개 양팔 협조 과제다. MolmoAct2는 성공률 44.3%로 두 번째인 π0.5보다 3.8%p 높다.

![[assets/fang-2026-molmoact2-action-reasoning-models-for/fig06.png]]
*Figure 6: RoboEval 비교. (A) 8개 양팔 과제별 성공률, (B) 완료 시간, 경로 길이, jerk 등 행동 지표 레이더 차트. 범례의 MolmoAct가 이 논문의 fine-tuning 모델이다 (Fang 2026, p.21)*

실세계 fine-tuning 평가는 양팔 YAM과 모바일 양팔 YAM에서 8개 과제로 진행한다. 정적 실험실, 주방, 서재, 식료품 창고, wet lab 같은 실험실 밖 환경, 이동 manipulation을 포함한다. 과제당 50회 평가하고, 데이터 수집에는 과제당 공간 변형 3개를 썼다. 기준선은 Cosmos Policy, X-VLA, OpenVLA-OFT, π0.5-DROID다.

![[assets/fang-2026-molmoact2-action-reasoning-models-for/fig07.png]]
*Figure 7: 실험실 밖 8개 실세계 과제의 fine-tuning 평가 개요. 피펫 준비부터 장난감 정리까지 MolmoAct2가 네 기준선을 15%p 앞선다 (Fang 2026, p.23)*

| 과제 | π0.5 | Cosmos Policy | X-VLA | OpenVLA-OFT | MolmoAct2 |
|---|---|---|---|---|---|
| Cup Stacking | 62.0 | 64.5 | 5.5 | 60.5 | 54.0 |
| Linearbot | 11.6 | 9.2 | 5.2 | 24.4 | 64.0 |
| Pegboard | 2.0 | 0.0 | 3.0 | 4.5 | 14.0 |
| Cup Storing | 85.9 | 0.0 | 7.9 | 96.0 | 100.0 |
| Candy Storing | 26.0 | 0.0 | 3.8 | 26.5 | 40.5 |
| Store Test Tube | 17.0 | 11.0 | 0.0 | 42.0 | 67.0 |
| Store Toys | 26.0 | 7.0 | 2.5 | 2.0 | 32.0 |
| Prepare Pipette | 27.5 | 32.0 | 11.5 | 28.5 | 33.0 |
| 평균 | 32.2 | 15.5 | 4.9 | 35.5 | 50.6 |

MolmoAct2는 8개 중 7개 과제에서 가장 높고, Cup Stacking에서만 Cosmos Policy(64.5%)와 π0.5(62.0%)에 뒤진다. 본문은 평균을 50.1%로 OpenVLA-OFT보다 15%p 높다고 적지만, 부록 Table 19의 평균은 50.6%이고 과제 이름도 본문 목록(hang_tools, shelf_cups, make_popcorn 등)과 일부 다르다. 어느 쪽이든 두 번째 모델보다 약 15%p 높다는 결론은 같다.

### adaptive depth의 효과

MolmoAct2-Think는 LIBERO 네 과제군 중 세 개에서 MolmoAct2보다 높고 Object(99.8% 대 100%)는 이미 포화돼 사실상 같다. 가장 큰 향상은 가장 어려워 여유가 많이 남은 Long에서 +2.2%p(93.2%에서 95.4%)이고, 쉬운 과제군일수록 향상이 작다. 2,000 rollout 평균은 97.2%에서 98.1%로 0.9%p 오른다. 저자는 향상의 부호가 일관되고 어려운 과제에 집중된다는 점에서 포화 근처의 잡음이 아니라 실제 효과라고 해석한다.

### OOD 강건성

강건성 평가는 실세계 양팔 과제 4개(stack_cups, store_test_tubes, store_candy, prepare_pipette)를 MolmoAct2-Post에서 각각 fine-tuning한 뒤 네 가지 분포 밖 조건에서 시험한다.

| 교란 | 내용 |
|---|---|
| Spatial | 목표 물체를 학습 분포 밖 위치에 배치 |
| Lighting | 장면 조명 변경 |
| Language | 지시문을 세 가지 방식으로 바꿔 표현 |
| Distractor | 원래 배치를 유지한 채 처음 보는 방해 물체 추가 |

과제당 20회(교란당 5회) 평가한다.

| 모델 | Spatial | Lighting | Language | Distractor | 전체 |
|---|---|---|---|---|---|
| π0.5 | 15.00 | 33.70 | 26.15 | 33.20 | 27.01 |
| Cosmos Policy | 8.75 | 17.50 | 5.00 | 13.75 | 11.25 |
| X-VLA | 3.75 | 8.30 | 9.95 | 3.75 | 6.44 |
| OpenVLA-OFT | 13.75 | 46.25 | 51.25 | 48.30 | 39.89 |
| MolmoAct2-Think | 26.25 | 62.05 | 60.35 | 54.10 | 50.69 |

MolmoAct2 계열은 네 교란 모두에서 가장 높고 전체 50.69%로 OpenVLA-OFT보다 10.80%p 높다. 차이가 가장 작은 항목은 Distractor(5.8%p)이고, 절대 점수가 가장 낮은 항목은 Spatial(26.25%)이다. 즉 세밀한 공간 일반화가 남은 과제다. 표 행 이름은 MolmoAct2-Think지만 표 캡션과 본문은 MolmoAct2로 서술한다.

### trajectory 품질

실제 배포에서는 성공 여부만큼 효율, 안정성, 안전에 영향을 주는 trajectory 품질이 중요하다. RoboEval의 행동 지표로 비교한 결과 MolmoAct2는 효율 지표를 일관되게 개선한다.

| 과제 | 지표 | MolmoAct2 | 비교 |
|---|---|---|---|
| Stack Two Blocks | 완료 시간 | 4.70초 | π0.5 5.87초, Diffusion Policy 7.27초 |
| Stack Two Blocks | 관절 경로 길이 | 1.04 | 2.16 (약 2배 길다) |
| Rotate Valve | 완료 시간 | 8.51초 | π0.5 9.69초 |

안정성 지표에서도 MolmoAct2는 Cartesian과 관절 공간 jerk 등에서 정규화 최고값 근처에 일관되게 위치해, 다른 방법보다 매끄럽고 안정된 trajectory를 만든다. 반면 다른 방법은 지표마다 편차가 커 제어 행동이 덜 일관적이다.

### ablation

ablation은 모두 LIBERO에서 같은 데이터, augmentation, 정규화, horizon, 평가 프로토콜로 수행한다.

| 항목 | 설정 | 결과 |
|---|---|---|
| backbone (Long, 이산 action만, 6만 step) | Molmo2 | 77.6% |
| | Molmo2-ER | 83.6% (+6.0%p) |
| 조건화 방식 (평균) | hidden-state | 94.0% |
| | per-head per-layer KV | 94.8% |
| | per-layer KV | 95.9% |
| flow 샘플 수 K (평균) | K=1 | 94.15% |
| | K=2 | 95.05% |
| | K=4 | 95.15% |
| | K=8 | 95.90% |

backbone ablation은 연속 expert 없이 이산 action만으로 비교한 것이다. Molmo2-ER이 6.0%p 높다는 결과는 embodied reasoning 특화가 VLM 벤치마크에만 그치지 않고 action 토큰 예측으로 직접 이어진다는 근거다.

조건화 방식 비교에서 hidden-state 조건화는 Spatial(97.0%)에서는 가장 높지만 Object, Goal, Long에서 더 떨어진다. per-head 변형은 VLM의 key와 value를 head별로 분리한 채 expert head에 대응시키는 방식인데, head 구조는 보존하지만 양쪽 KV head 수를 일치(8개)시켜야 하고 평균은 표준 per-layer KV보다 낮다.

flow 샘플 수는 K가 클수록 평균이 좋아진다. 다만 Long에서는 K=2가 92.2%로 가장 높아 모든 과제군에서 단조 증가하지는 않는다.

| fine-tuning 설계 | 이산 co-training | knowledge insulation | 학습 범위 | 평균 | Long |
|---|---|---|---|---|---|
| 변형 1 | 없음 | 없음 | 전체 | 96.95 | 95.0 |
| 변형 2 | 있음 | 있음 | 전체 | 97.05 | 94.8 |
| 변형 3 | 있음 | 없음 | LoRA | 96.25 | 90.4 |
| 변형 4 | 없음 | 없음 | action expert만 | 93.05 | 89.2 |
| 최종 | 있음 | 없음 | 전체 | 97.20 | 93.2 |

co-training은 성격이 다른 여러 데이터 원천이나 목적을 한 학습에 함께 넣는 방식이다. 이산 action co-training을 빼면 평균은 비슷하지만 Long이 오르고 Spatial(95.8%)과 Object(98.6%)가 내려가 성능이 과제군 사이에서 이동한다. knowledge insulation을 켜도 평균은 비슷하지만 약간 낮다. LoRA는 Spatial(98.0%)에서는 강하지만 Long에서 full fine-tuning보다 2.8%p 낮다. action expert만 학습하면 평균 93.05%로 가장 낮아, VLM까지 함께 적응시키는 것이 중요함을 보인다.

| Think depth fine-tuning | mixed training | noise 주입 | depth gate | Goal | 평균 |
|---|---|---|---|---|---|
| 변형 1 | 없음 | 없음 | 없음 | 96.6 | 97.50 |
| 변형 2 | 있음 | 없음 | 없음 | 96.6 | 97.65 |
| 최종 | 있음 | 있음 | 있음 | 98.4 | 98.10 |

noise 주입과 depth gate를 빼면 평균이 98.10%에서 97.65%로 내려가며, 대부분 Goal의 1.8%p 하락에서 온다. mixed training까지 빼면 97.50%다. depth 경로는 추론 시 부정확한 depth 예측에 대비한 정규화가 있고 policy가 action 단독 경로도 유지할 때 가장 유용하다.

### 추론 속도

추론 속도는 단일 H100, LIBERO, action horizon 10에서 end-to-end 지연을 재고 horizon을 지연으로 나눈 control rate로 보고한다.

![[assets/fang-2026-molmoact2-action-reasoning-models-for/fig08.png]]
*Figure 8: 캐싱과 CUDA Graph 적용 후 control rate. MolmoAct2는 23.02Hz에서 55.79Hz로, Think는 8.04Hz에서 12.71Hz로 오르고, 이산 action 경로는 각각 14.17Hz와 6.82Hz다 (Fang 2026, p.27)*

| 경로 | MolmoAct2 | MolmoAct2-Think |
|---|---|---|
| 원래 구현 | 23.02Hz | 8.04Hz |
| 캐싱 | 27.39Hz | 9.72Hz |
| 캐싱 + CUDA Graph | 55.79Hz (2.42배) | 12.71Hz (1.58배) |
| 캐싱 + CUDA Graph, 이산 action 경로 | 14.17Hz | 6.82Hz |

캐싱만으로는 향상이 작고 CUDA Graph가 더 큰 향상을 준다. MolmoAct2의 고정 형태 flow step은 같은 계산을 반복하므로 실행 시간이 kernel launch 오버헤드에 지배되고, graph replay가 이를 대부분 없앤다. Think는 adaptive depth 단계가 순차 의존성과 가변 길이 실행을 가진 autoregressive decoding이라 graph 캡처 효과가 작다.

MolmoAct2는 VLM이 action 토큰을 autoregressive로 decoding하는 이산 action 경로도 제공한다. 같은 최적화에서 이 경로는 연속 경로보다 3.94배(Think 1.86배) 느리다. VLM decoding 오버헤드가 크기 때문이며, 연속 경로는 작은 cross-attention head로 몇 번의 고정 flow step만에 chunk 전체를 내고 VLM 캐시를 step 사이에 재사용한다. 따라서 기본 배포 경로는 연속 경로다.

## 한계

논문이 직접 밝히거나 결과에서 드러나는 한계는 다음과 같다.

| 한계 | 근거 |
|---|---|
| articulated object 상호작용 | MolmoSpaces Open 과제 9.5%로 π0.5-DROID(22.7%), LAP-VLA(11.4%), π0-DROID(11.0%)보다 낮다. 저자가 개선 방향으로 명시 |
| 세밀한 공간 일반화 | OOD Spatial 항목 26.25%로 네 교란 중 가장 낮다 |
| Think의 속도 | 최적화 후 12.71Hz로 MolmoAct2(55.79Hz)의 약 4분의 1. 가변 decode 일정 때문에 graph 캡처가 부분적이다 |
| 일부 과제 열세 | SO-100 Block in box 33.3%(π0 90.0%), 양팔 YAM Cup Stacking 54.0%(Cosmos Policy 64.5%) |
| 절대 성공률 | 양팔 YAM 실세계 평균이 50%대로, 서론이 문제 삼은 신뢰할 배포 수준과는 여전히 차이가 있다 |
| depth 정답의 출처 | depth 코드 정답은 실제 센서가 아니라 Depth Anything V2의 단안 추정값이다 |

articulated object는 문이나 서랍처럼 관절로 연결돼 일부만 움직이는 물체를 말한다. Open 과제가 이런 물체를 다루므로 MolmoSpaces 결과는 접촉이 많은 pick 계열에서의 강점과 별개로 이 영역이 약하다는 것을 보여준다.

보고 일관성에도 주의할 점이 있다. 실세계 fine-tuning 평균이 본문 50.1%와 부록 50.6%로 다르고, 과제 이름도 일부 다르다. RoboEval 그림과 부록 Table 17 범례는 모델을 "MolmoAct"로 표기하며, OOD 강건성 표는 캡션과 본문이 MolmoAct2를, 행 이름이 MolmoAct2-Think를 가리킨다. 수치를 인용할 때는 표 원문을 함께 확인하는 것이 안전하다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| action reasoning model | action을 내기 전에 공간 표현 같은 중간 reasoning을 거치는 VLA. MolmoAct 계열의 자기 명칭 |
| Molmo2-ER | Molmo2를 330만 샘플 embodied reasoning corpus로 specialize-then-rehearse 학습한 VLM backbone |
| MolmoAct2-FAST Tokenizer | 학습 데이터 구성을 공개한 FAST 방식 action tokenizer. 1초 32차원 action을 2,048개 어휘 토큰으로 압축 |
| per-layer KV conditioning | action expert의 각 block이 같은 깊이 VLM layer의 key와 value를 투영해 cross-attention 조건으로 쓰는 구조 |
| adaptive depth reasoning | 직전 시점과 RGB patch가 달라진 칸의 depth 토큰만 다시 예측하고 나머지는 캐시를 재사용하는 reasoning 방식 |
| depth gate | depth 토큰의 key와 value에만 곱하는 layer별 학습형 sigmoid gate. bias -4로 초기화 |

## 관련 페이지

- [[physical-ai/black-2024-pi0-a-vision-language-action-flow-model]]: flow matching action expert를 VLM 옆에 두는 구조의 원형. MolmoAct2는 같은 구성을 per-layer KV로 연결한다
- [[physical-ai/black-2025-pi05-a-vision-language-action-model-with]]: 거의 모든 평가의 주 기준선 π0.5. knowledge insulation 레시피의 출처
- [[physical-ai/kim-2024-openvla-an-open-source-vision-language-action-model]]: action을 이산 토큰으로 내는 공개 VLA. LIBERO 비교 기준선
- [[physical-ai/nvidia-gr00t-n1-7-3b]]: LIBERO에서 MolmoAct2와 0.2%p 차이인 GR00T N1.7
- [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation]]: 마지막 layer 조건화를 쓰는 대비 사례로 관련 연구에서 언급되는 GR00T 계열
- [[physical-ai/shukor-2025-smolvla-a-vision-language-action-model]]: SO-100 실세계 zero-shot 기준선이자 LeRobot SO-10x 데이터 문제를 지적한 연구
- [[physical-ai/huggingface-lerobot]]: MolmoAct2-SO100/101 데이터의 원천인 LeRobot 커뮤니티 데이터셋 생태계
- [[physical-ai/nvidia-2025-cosmos-world-foundation-model-platform]]: 실세계 비교 기준선 Cosmos Policy의 기반 world model 플랫폼
- [[physical-ai/open-x-embodiment-2023-robotic-learning-datasets-and-rt-x]]: 학술 데이터로 쓴 OXE와 그 품질 한계
- [[physical-ai/liu-2026-libero-recover-beyond-task-success-towards]]: 주 fine-tuning 벤치마크인 LIBERO를 확장한 연구
- [[physical-ai/chen-2025-pirl-online-rl-fine-tuning-for]]: 같은 flow 기반 VLA를 RL로 fine-tuning하는 다른 개선 경로
- [[overviews/vla-evolution-groot-pi-gemini-robotics-overview]]: π, GR00T, Gemini Robotics를 포함한 VLA 계보 overview
- [[overviews/physical-ai-overview]]: physical-ai 도메인 허브
