---
title: "Gemini Robotics: Bringing AI into the Physical World"
type: paper
year: 2025
category: physical-ai
source: google-deepmind-2025-gemini-robotics-bringing-ai-into.md
raw_path: raw/papers/google-deepmind-2025-gemini-robotics-bringing-ai-into.pdf
raw_filename: "google-deepmind-2025-gemini-robotics-bringing-ai-into.pdf"
source_collection: external
authors: "Gemini Robotics Team, Google DeepMind (기여자 명단은 논문 부록)"
arxiv_id: "2503.20020"
tags: [physical-ai, vla, manipulation, benchmark, safety]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/fig01.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-bringing-ai-into-figures/fig01.png
    caption: "Gemini Robotics 계열 개요. Gemini 2.0에서 robotics 전용 학습으로 Gemini Robotics-ER과 Gemini Robotics를 만들고, 선택적 specialization으로 dexterous task, 새 embodiment, 고급 추론으로 확장한다"
    page: 2
    bbox_norm: [0.0947, 0.0745, 0.9442, 0.4277]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/fig02.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-bringing-ai-into-figures/fig02.png
    caption: "Gemini 2.0 Flash의 embodied reasoning 예시. 2D object detection, 2D pointing, multi-view correspondence, 3D object detection"
    page: 3
    bbox_norm: [0.0947, 0.0939, 0.9057, 0.3957]
    strategy: caption-region
    curated: true
  - id: fig12
    label: Figure 12
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/fig12.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-bringing-ai-into-figures/fig12.png
    caption: "zero-shot 제어를 위한 perception API와 control API, episode 안의 agentic 오케스트레이션 개요. Gemini Robotics-ER의 능력이 tool로 노출된다"
    page: 11
    bbox_norm: [0.1124, 0.5769, 0.8855, 0.8403]
    strategy: caption-region
    curated: true
  - id: fig13
    label: Figure 13
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/fig13.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-bringing-ai-into-figures/fig13.png
    caption: "few-shot in-context learning 파이프라인 개요. observation, 지시문, trajectory를 프롬프트로 받아 새 인스턴스의 언어 추론과 trajectory를 생성한다"
    page: 13
    bbox_norm: [0.1001, 0.0939, 0.8855, 0.2932]
    strategy: caption-region
    curated: true
  - id: fig14
    label: Figure 14
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/fig14.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-bringing-ai-into-figures/fig14.png
    caption: "Gemini Robotics 모델의 아키텍처와 입출력 개요. 클라우드의 VLA backbone과 로봇 온보드의 local action decoder로 나뉜다"
    page: 14
    bbox_norm: [0.0947, 0.0939, 0.9053, 0.3278]
    strategy: caption-region
    curated: true
  - id: fig16
    label: Figure 16
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/fig16.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-bringing-ai-into-figures/fig16.png
    caption: "데이터셋에서 뽑은 20개 task의 out-of-the-box 성공률. Gemini Robotics가 π0 re-implement와 multi-task diffusion 두 baseline을 크게 앞선다"
    page: 16
    bbox_norm: [0.0899, 0.0929, 0.9301, 0.3991]
    strategy: manual
    curated: true
  - id: fig21
    label: Figure 21
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/fig21.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-bringing-ai-into-figures/fig21.png
    caption: "Gemini Robotics의 generalization 분해 결과(progress score). instruction, visual, action 세 유형 모두에서 baseline을 앞선다"
    page: 19
    bbox_norm: [0.0947, 0.0939, 0.9053, 0.3843]
    strategy: caption-region
    curated: true
  - id: fig23
    label: Figure 23
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/fig23.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-bringing-ai-into-figures/fig23.png
    caption: "specialization 후 long-horizon dexterous task 성공률. Gemini Robotics만 origami와 lunch-box를 일관되게 풀며 lunch-box는 100%다"
    page: 21
    bbox_norm: [0.0947, 0.0939, 0.9053, 0.291]
    strategy: caption-region
    curated: true
  - id: fig24
    label: Figure 24
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/fig24.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-bringing-ai-into-figures/fig24.png
    caption: "embodied reasoning이 필요한 실제 로봇 task에서 reasoning-enhanced specialist와 vanilla Gemini Robotics의 성공률 비교"
    page: 23
    bbox_norm: [0.0947, 0.0939, 0.9053, 0.3435]
    strategy: caption-region
    curated: true
  - id: fig26
    label: Figure 26
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/fig26.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-bringing-ai-into-figures/fig26.png
    caption: "시연 데이터 수에 따른 fast adaptation 성공률. 8개 task 중 7개에서 100개 이하의 시연으로 70% 이상에 도달한다"
    page: 24
    bbox_norm: [0.0947, 0.0939, 0.9053, 0.3744]
    strategy: caption-region
    curated: true
  - id: fig27
    label: Figure 27
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/fig27.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-bringing-ai-into-figures/fig27.png
    caption: "Gemini Robotics를 다른 로봇에 fine-tuning한 예시. 위는 Apollo humanoid의 도시락 싸기, 아래는 bi-arm 산업용 로봇의 고무 벨트 조립"
    page: 25
    bbox_norm: [0.0947, 0.0939, 0.9053, 0.3613]
    strategy: caption-region
    curated: true
  - id: fig29
    label: Figure 29
    kind: figure
    file: assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/fig29.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-bringing-ai-into-figures/fig29.png
    caption: "constitution과 safety post-training을 통한 안전 벤치마킹과 완화. ASIMOV-Multimodal과 ASIMOV-Injury의 예시와 alignment 정확도"
    page: 27
    bbox_norm: [0.0934, 0.0988, 0.9077, 0.6736]
    strategy: caption-region
    curated: true
  - id: tab01
    label: Table 1
    kind: table
    file: assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/tab01.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-bringing-ai-into-figures/tab01.png
    caption: "ERQA, RealworldQA, BLINK에서의 VLM 비교. Gemini 2.0 Pro Experimental이 세 벤치마크 모두에서 가장 높다"
    page: 5
    bbox_norm: [0.0999, 0.0899, 0.9001, 0.1971]
    strategy: manual
    curated: true
  - id: tab03
    label: Table 3
    kind: table
    file: assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/tab03.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-bringing-ai-into-figures/tab03.png
    caption: "2D pointing 벤치마크(Paco-LVIS, Pixmo-Point, Where2Place) 정확도. Gemini Robotics-ER이 세 개 중 두 개에서 Molmo를 앞선다"
    page: 8
    bbox_norm: [0.0999, 0.0899, 0.9001, 0.2091]
    strategy: manual
    curated: true
  - id: tab05
    label: Table 5
    kind: table
    file: assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/tab05.png
    raw: raw/papers/google-deepmind-2025-gemini-robotics-bringing-ai-into-figures/tab05.png
    caption: "ALOHA 2 시뮬레이션 task 성공률. zero-shot과 ICL, Gemini 2.0 Flash와 Gemini Robotics-ER 비교"
    page: 12
    bbox_norm: [0.0899, 0.1979, 0.9101, 0.3421]
    strategy: manual
    curated: true
---

## 요약

Gemini Robotics는 Google DeepMind가 Gemini 2.0 위에 만든 robotics 전용 모델 계열의 기술 보고서다. 보고서는 두 모델과 벤치마크 하나를 함께 내놓는다. Gemini Robotics-ER은 물리 세계의 기하와 공간 관계를 이해하는 embodied reasoning을 강화한 VLM이고, Gemini Robotics는 그 위에 로봇 action 데이터를 통합해 로봇을 직접 제어하는 VLA다. ERQA는 VLM의 embodied reasoning을 재는 객관식 400문항의 공개 벤치마크다.

이 보고서가 다른 VLA 논문과 구별되는 지점은 세 가지다. 첫째, action 데이터로 학습하지 않은 VLM만으로도 코드 생성과 in-context learning을 통해 zero-shot과 few-shot 로봇 제어가 가능함을 실측했다. 둘째, VLA를 클라우드의 backbone과 로봇 온보드의 local action decoder로 나누어, 큰 모델의 추론 지연을 감수하면서도 유효 control frequency 50Hz를 달성했다. 셋째, generalist 모델을 출발점으로 삼는 선택적 specialization으로 origami 접기와 도시락 싸기 같은 long-horizon dexterous task, embodied reasoning을 결합한 generalization, 시연 100개 이하의 fast adaptation, bi-arm Franka와 Apollo humanoid 같은 새 embodiment 적응을 한 모델에서 시연했다.

실험은 ALOHA 2 실제 로봇에서 A/B testing으로 수행했다. 20개 dexterous task와 85개 task의 generalization 벤치마크에서 Gemini Robotics는 같은 데이터로 학습한 π0 re-implement와 multi-task diffusion baseline을 일관되게 앞선다. 모델 가중치는 비공개이며 ERQA와 ASIMOV 안전 데이터셋만 공개됐다.

## 배경

대규모 pre-training을 거친 멀티모달 모델은 디지털 도메인에서 범용 능력을 보이지만, 그 능력을 로봇 같은 물리 에이전트로 옮기는 일은 여전히 어렵다. 유용한 로봇은 주변 물리 세계를 이해하고 그 안에서 유능하고 안전하게 상호작용해야 한다. 이는 수동적 perception과 능동적 물리 상호작용 사이의 간극을 메우는 문제다.

보고서의 출발점은 frontier VLM인 Gemini 2.0의 멀티모달 이해와 추론이 embodied agent의 기반이 될 수 있다는 가설이다. 이 가설이 성립하려면 두 요소가 필요하다. 첫째, Gemini가 물리 세계의 풍부한 기하와 시공간 세부를 이해하는 견고한 embodied reasoning을 갖춰야 한다. 둘째, 그 추론을 접촉 물리, dynamics, 실세계 상호작용의 세부를 포함한 물리 action의 언어로 grounding해야 한다. 두 요소가 합쳐져야 빠르고 안전하며 dexterous한 실세계 로봇 제어가 가능하다.

기존 VLA 연구는 시각 견고성에서는 일관된 이득을 얻었지만, 추상 추론 능력을 유지하고 그것을 동작의 generalization에 적용하는 데는 어려움을 겪었다. 저자들은 RT-2와 OpenVLA를 이 한계의 예로 든다. 또한 zero-shot 로봇 제어를 위해서는 SayCan이나 Code as Policies처럼 여러 모델을 조합해야 했다. Gemini Robotics 계열은 perception, 상태 추정, 공간 추론, planning, 제어를 한 모델에 모으는 것을 목표로 한다.

## 핵심 개념

VLA는 이미지와 언어 지시문(instruction)을 입력으로 받아 로봇 action을 직접 출력하는 모델이다. 지시문은 로봇에게 수행할 task를 자연어로 알려주는 문장이다. Gemini Robotics는 Gemini를 로봇 action 예측에 맞게 fine-tuning한 VLA이며, Gemini Robotics-ER은 action을 내지 않는 VLM이다.

embodied reasoning은 VLM이 물체와 공간 개념을 실세계에 grounding하고, 그 신호를 downstream robotics 응용에 합성하는 능력이다. 2D object detection, pointing, trajectory 예측, grasping 예측, multi-view correspondence, 3D bounding box 검출이 여기에 든다. 보고서는 이 능력이 강할수록 downstream 로봇 제어 성능이 높다는 상관관계를 반복해서 보인다.

action chunk는 한 번의 모델 추론으로 여러 timestep의 action을 묶어 내는 단위다. control frequency는 로봇이 1초에 몇 번 새로운 action을 갱신하는지를 뜻한다. Gemini Robotics는 raw observation에서 action chunk까지 약 250ms가 걸리지만, chunk 안에 여러 action이 있으므로 유효 control frequency는 50Hz다. 즉 로봇은 1초에 50번 새 action을 실행한다.

in-context learning은 가중치를 바꾸지 않고 프롬프트에 넣은 예시만으로 새 동작을 흉내 내는 방법이다. 이 보고서에서는 teleoperation으로 얻은 시연 데이터(demonstration) 10개를 텍스트로 토큰화해 프롬프트에 넣는다. teleoperation은 사람이 로봇을 원격으로 움직여 시연을 만드는 방식이다.

affordance는 물체가 어떤 상호작용을 허용하는지를 뜻한다. "어디를 잡을지", "어디에 놓을지", "얼룩을 닦는 데 쓸 수 있는 것"이 affordance 질의의 예다. Gemini 2.0은 affordance로 물체를 검출하거나 point를 찍을 수 있다.

task progress는 task를 얼마나 완수했는지를 0~1 연속값으로 나타내는 지표다. 이진 success rate가 놓치는 부분 진전을 잡아내므로, long-horizon task와 어려운 generalization 시나리오에서 모델 비교에 유용하다. 보고서는 두 지표를 함께 보고한다.

specialization은 generalist 체크포인트를 좁은 고품질 데이터로 fine-tuning해 특정 능력에 특화하는 선택적 단계다. long-horizon dexterity, reasoning-enhanced generalization, fast adaptation, 새 embodiment 적응 네 가지가 이 단계에서 다뤄진다. distillation은 큰 모델의 능력을 더 빠른 모델로 옮기는 학습이며, Gemini Robotics backbone은 Gemini Robotics-ER의 distillation 버전이다.

## 방법

### 모델 계열 구성

Gemini Robotics 계열은 Gemini 2.0에서 두 단계를 거쳐 만들어진다. 첫 단계는 robotics 전용 학습으로, embodied reasoning 데이터로 Gemini Robotics-ER을 만들고 다양한 로봇 action 데이터로 Gemini Robotics를 만든다. 두 번째 단계는 선택적 adaptation과 specialization으로, dexterous task, 새 embodiment, 고급 추론 데이터로 특화한다.

![[assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/fig01.png]]
*Figure 1: Gemini Robotics 계열 개요. Gemini 2.0에서 robotics 전용 학습으로 두 모델을 만들고 선택적 specialization으로 확장한다 (Gemini Robotics Team 2025, p.2)*

Gemini 2.0은 이미 robotics와 관련된 능력을 갖고 있다. 의미론적 안전 이해와 긴 컨텍스트가 그 예다. robotics 전용 학습은 여기에 dexterous하고 반응적인 동작 생성, 새 embodiment로의 빠른 적응, 시각 공간 추론을 action에 반영하는 능력을 더한다.

| 모델 | 유형 | 기반 | 출력 | 로봇 action 데이터 |
|---|---|---|---|---|
| Gemini 2.0 Flash | VLM | 기본 모델 | 텍스트 | 없음 |
| Gemini Robotics-ER | VLM | Gemini 2.0 Flash에 embodied reasoning 강화 | 텍스트(좌표, 코드, trajectory) | 없음 |
| Gemini Robotics | VLA | Gemini Robotics-ER의 distillation backbone과 local decoder | action chunk | 있음 |

### ERQA 벤치마크

ERQA(Embodied Reasoning Question Answering)는 물리 세계와 상호작용하는 embodied agent에게 필요한 능력을 겨냥한 객관식 VQA 벤치마크다. 기존 VLM 벤치마크가 물체 인식, 개수 세기, localization 같은 원자적 능력에 치우쳐 물리 세계에서 행동하는 데 필요한 더 넓은 능력을 충분히 다루지 못한다는 문제의식에서 나왔다.

| 범주 | 문항 수 |
|---|---|
| Spatial Reasoning | 84 |
| Action Reasoning | 72 |
| Trajectory Reasoning | 66 |
| State Estimation | 55 |
| Task Reasoning | 38 |
| Multi-view Reasoning | 37 |
| Pointing | 34 |
| 기타 | 14 |
| 합계 | 400 |

400문항 중 28%는 프롬프트에 이미지가 두 장 이상 들어간다. 여러 이미지에 걸쳐 개념을 대응시켜야 하는 이 문항들은 단일 이미지 문항보다 어렵다. 예시 문항은 "여행 가방 지퍼를 잠그기 시작하려면 어느 색 trajectory를 따라야 하는가", "가장 가까운 육각 나사를 돌릴 준비가 되려면 렌치를 어떻게 움직여야 하는가", "네 개의 싱크대 중 보는 사람에게 가장 가까운 것을 가리키는 화살표는 무엇인가" 같은 것이다.

모든 문항은 정확성과 품질을 위해 수작업으로 라벨링했다. 이미지는 직접 촬영하거나 OXE, UMI Data, MECCANO, HoloAssist, EGTEA Gaze+에서 가져왔다. 일부 문항은 여러 프레임에 걸쳐 물체를 인식하고 대응시켜야 하고, 다른 문항은 물체의 affordance와 장면 속 3D 관계를 추론해야 한다.

### embodied reasoning 능력

Gemini Robotics-ER은 Gemini 2.0 Flash의 변형으로, 추가 로봇 데이터나 학습 없이 robotics 응용에 바로 쓸 수 있다. 능력은 2D와 3D로 나뉜다.

![[assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/fig02.png]]
*Figure 2: Gemini 2.0 Flash의 embodied reasoning 예시. 2D object detection, 2D pointing, multi-view correspondence, 3D object detection (Gemini Robotics Team 2025, p.3)*

| 능력 | 구분 | 설명 | 표현 규약 |
|---|---|---|---|
| Object Detection | 2D | open-world 2D bounding box. 질의는 물체 이름처럼 명시적이거나 범주, 속성, 기능처럼 암시적일 수 있다 | y0, x0, y1, x1. 0~1000 정수로 정규화 |
| Pointing | 2D | 물체와 물체 부위, affordance, 빈 공간, 공간 개념을 가리킨다 | y, x 튜플. in_frame, point, label 키의 JSON 리스트 |
| Trajectory Prediction | 2D | pointing을 이어 붙여 observation에 grounding된 2D motion trajectory를 만든다 | 시작점과 끝점을 먼저 예측한 뒤 중간 점을 보간 |
| Grasp Prediction | 2D | Gemini Robotics-ER에서 새로 도입. pointing을 top-down grasp로 확장 | y, x, 회전각 θ. θ는 -90~90 정수 도(degree), 0은 손가락이 이미지 가로축과 나란한 상태 |
| Multi-View Correspondence | 3D | 여러 카메라 뷰의 같은 장면에서 2D point 대응을 예측 | 초기 이미지의 점 목록과 새 뷰 이미지를 주면 어느 점이 보이는지와 좌표를 답한다 |
| 3D Bounding Box Detection | 3D | 단안 이미지에서 metric 3D bounding box를 직접 예측 | x, y, z, w, h, l, r1, r2, r3 (r은 Euler 각). 소수점 둘째 자리까지의 짧은 텍스트 토큰 |

2D object detection은 세 방식의 질의를 받는다. "detect all the kitchenware"처럼 범주로, "nuts on the right side of the image"처럼 공간 서술로, "the spill and what can be used to clean it up"처럼 affordance로 검출한다. 마지막 예시에서 모델은 명시하지 않은 수건까지 얼룩과 함께 찾아낸다.

pointing은 bounding box보다 유연하고 정밀한 표현이다. 스푼 손잡이 같은 물체 부위, "팬 왼쪽의 빈 공간", "기존 8개 캔의 격자 패턴을 따라 9번째 캔이 놓일 자리" 같은 공간 개념, "사람이 집어 들 때 잡을 곳"(머그 손잡이) 같은 affordance를 모두 가리킨다. trajectory 예측은 장애물 회피 같은 복잡한 motion planning은 못 하지만 observation에 grounding된 유용한 경로를 만든다. 예를 들어 사람 손에서 잡을 도구까지의 경로나, 그리퍼가 따라가면 쟁반의 얼룩을 닦게 되는 waypoint 열을 낸다. waypoint는 경로를 이루는 중간 목표점이다.

multi-view correspondence는 시점이 크게 달라도 동작한다. 한 이미지 쌍에서는 사람이 든 물체에 찍힌 빨간 점이 장면이 크게 바뀐 두 번째 이미지에서도 같은 물체를 가리킨다고 맞혔고, 다른 쌍에서는 주황 점이 두 번째 이미지에서 보이지 않는다고 맞혔다. 이 능력은 로봇이 stereo 뷰나 머리와 손목 카메라 같은 여러 이미지 스트림으로 3D 공간 관계를 이해하는 데 쓰인다. 3D detection은 닫힌 범주 집합만 다루는 expert 모델과 달리 open-vocabulary 질의를 받는다.

개별 expert 모델을 따로 두는 대신 하나의 foundation model에 이 능력을 모으면, open-world 자연어 지시문으로 embodied reasoning task를 수행하고 피드백에 응답하며 multi-turn 상호작용을 이어갈 수 있다. 장면 이해와 추론을 결합해 로봇 코드를 쓰는 것이 그 대표 예다.

### zero-shot 제어를 위한 코드 생성

Gemini 2.0의 embodied reasoning 덕분에 로봇 action 데이터로 학습한 적이 없어도 로봇을 제어할 수 있다. 실험은 bimanual ALOHA 2 로봇에서 수행했다. Gemini 2.0은 각 그리퍼를 지정 pose로 움직이고, 그리퍼를 여닫고, 현재 로봇 상태를 읽는 API를 받는다. perception 함수도 API에 있지만 외부 모델을 부르지 않는다. Gemini 2.0 자신이 물체 bounding box, 물체 위의 point, top-down grasp pose를 낸다.

![[assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/fig12.png]]
*Figure 12: zero-shot 제어를 위한 perception API와 control API, episode 안의 agentic 오케스트레이션 개요 (Gemini Robotics Team 2025, p.11)*

episode 흐름은 다음과 같다.

1. 시스템 프롬프트, 로봇 API 설명, task 지시문을 처음에 준다.
2. 현재 장면 이미지, 로봇 상태, 실행 피드백을 반복해서 받는다.
3. 환경에서 실행될 코드를 출력한다. 코드는 API로 장면을 이해하고 로봇을 움직인다.
4. 실행 루프가 반응과 재계획을 허용한다.

재계획의 예는 부록 Fig. 34에 있다. 모델이 왼쪽 그리퍼를 닫았는데 로봇 상태의 손가락 간격이 0.0이면 grasping 실패로 판단하고, 그리퍼를 바나나 위로 약간 올려 다시 시도한다. 두 번째 시도에서 간격이 0.04로 나오자 성공으로 판단하고 다음 단계로 넘어간다.

시스템 프롬프트는 task와 무관하게 고정이고 지시문만 바뀐다. 프롬프트는 로봇을 테이블 양쪽에 팔이 하나씩 달린 양팔 로봇으로 소개하고 절차를 4단계로 규정한다.

| 단계 | 내용 |
|---|---|
| 지시문 수신 | task 지시문, 오버헤드 카메라의 초기 이미지, 초기 로봇 상태, 초기 장면 물체를 받는다 |
| 장면 서술 | 물체가 테이블 어디에 있는지 설명한다 |
| 단계 planning | 물체 위치와 크기, 로봇 embodiment 제약, 방향 지침을 고려해 단계를 모두 적는다. 각 단계에는 실행 후 장면이 어떻게 보여야 하는지를 포함한다 |
| 단계 실행 | 단계마다 목표 요약, grasping 지침 준수, 도달 가능성과 충돌 여유 확인, Python 코드 작성, 실행 결과 요약, 목표와 비교를 반복한다. 불일치하면 현재 상태를 고려해 재계획한다 |

프롬프트에는 세계 좌표계와 물리 제약도 들어간다. x는 좌우, y는 앞뒤, z는 상하이고 원점은 테이블 중앙 표면이다. 그리퍼 손가락은 길이 0.09m, 최대 개방 0.065m이며 테이블은 가로 0.80m, 세로 0.40m다. 왼팔은 x가 -0.40~0.1m, 오른팔은 -0.1~0.40m 범위만 닿는다. grasping 지침은 get_grasp_position_and_euler_orientation 함수 사용, 팔이 물체를 가리지 않게 하기, 도달 가능성 확인, grasping 전 그리퍼 개방, distance_between_fingers가 0보다 크면 성공으로 판정하기다.

API 클래스 RealAlohaRobotApi는 아홉 개 함수를 제공한다.

| 함수 | 역할 |
|---|---|
| detect_objects(object_names) | 물체의 XYZ 중심과 크기를 반환. 이름에 간단한 서술이나 부위를 포함할 수 있다 |
| get_grasp_position_and_euler_orientation(gripper, object_name, part_name) | 물체와 그리퍼에 대한 grasping 위치와 Euler 방향을 반환. part_name 기본값은 middle |
| move_gripper_to(position, orientation, gripper) | 그리퍼를 XYZ 위치와 roll, pitch, yaw 각도로 이동 |
| move_gripper_to_safe_position(gripper) | 테이블 밖 안전 위치(초기 위치)로 이동 |
| open_gripper(gripper), close_gripper(gripper) | 그리퍼 개폐 |
| get_image() | 현재 카메라 이미지 |
| state_description() | 현재 로봇 상태의 텍스트 서술 |
| reset() | 로봇을 초기 상태로 되돌림 |

### few-shot 제어를 위한 in-context learning

일부 dexterous manipulation은 zero-shot으로는 어렵다. 이 경우 소수의 in-context 시연 데이터로 모델을 조건화하면 그 동작을 바로 흉내 낸다. 코드 대신 end-effector pose의 trajectory를 직접 생성하도록 프롬프트한다. end-effector는 팔 끝에 달린 그리퍼나 손처럼 환경과 직접 접촉하는 부위다.

![[assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/fig13.png]]
*Figure 13: few-shot in-context learning 파이프라인 개요. observation, 지시문, trajectory를 프롬프트로 받아 새 인스턴스의 언어 추론과 trajectory를 생성한다 (Gemini Robotics Team 2025, p.13)*

방법은 Di Palo and Johns(2024)의 Keypoint Action Tokens를 확장한 것이다. 원 방법은 k개의 teleoperation trajectory를 물체와 end-effector pose 목록으로 바꿔 텍스트로 토큰화하고 프롬프트에 넣는다. 원 방법은 시각 keypoint와 물체 pose를 뽑는 외부 모델이 필요했지만, Gemini Robotics-ER은 embodied reasoning으로 스스로 그 일을 한다.

추가로 observation과 action 사이에 수행된 action의 언어 서술을 삽입해 추론 시점에 추론을 유도한다. 모델은 in-context trajectory의 자연어 추론을 흉내 내면서 어느 팔을 언제 쓸지, 물체의 어디와 상호작용할지를 더 정확히 예측하게 된다. 큰 멀티모달 모델의 장점은 observation, action, 언어 세 가지를 함께 조건으로 쓸 수 있다는 것이며, 셋의 조합이 어느 하나만 쓸 때보다 낫다. 실험에는 시연 데이터 10개를 썼다.

### Gemini Robotics 아키텍처

Gemini Robotics-ER 같은 큰 VLM은 추론이 느리고 특수 하드웨어가 필요하다. VLA로 쓰면 온보드 실행이 불가능하고 지연이 실시간 로봇 제어와 맞지 않는다. Gemini Robotics는 두 구성 요소로 이 문제를 푼다.

![[assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/fig14.png]]
*Figure 14: Gemini Robotics 모델의 아키텍처와 입출력 개요. 클라우드의 VLA backbone과 로봇 온보드의 local action decoder로 나뉜다 (Gemini Robotics Team 2025, p.14)*

| 구성 요소 | 위치 | 역할 | 지연 |
|---|---|---|---|
| Gemini Robotics backbone | 클라우드 | Gemini Robotics-ER의 distillation 버전. 이미지와 지시문을 받아 action chunk를 낸다 | 질의에서 응답까지 수 초에서 160ms 미만으로 최적화 |
| Gemini Robotics decoder | 로봇 온보드 컴퓨터 | backbone의 지연을 상쇄하는 local action decoder | backbone과 합쳐 raw observation에서 저수준 action chunk까지 약 250ms |

입력은 현재 장면 이미지 여러 장과 task 텍스트 지시문이다. Fig. 14의 프롬프트 예시는 "Given (이미지) and proprioception (proprio), Q: What action should the robot take to (task e.g. close the laptop)?" 형태로 proprioception도 포함한다. proprioception은 관절 각도처럼 로봇 자신의 몸 상태를 재는 감각이다. 출력은 로봇이 실행하는 action chunk다.

이 구성은 backbone 지연에도 부드러운 동작과 반응적 동작을 만들면서 backbone의 generalization 능력을 유지한다. 저자들은 Gemini Robotics의 성공 요인 세 가지 중 하나로 이 저지연 제어 아키텍처를 꼽는다.

### 학습 데이터

action 데이터는 ALOHA 2 로봇 fleet에서 12개월간 수집한 대규모 teleoperation 데이터셋이다. 수천 시간의 실세계 전문가 시연 데이터를 담으며, 수천 개의 다양한 task를 포함한다. manipulation 스킬, 물체, 난이도, episode 길이, dexterity 요구가 다양하다.

학습 데이터에는 비action 데이터도 들어간다. 웹 문서, 코드, 이미지와 오디오와 비디오 같은 멀티모달 콘텐츠, embodied reasoning과 VQA 데이터다. 이 혼합은 다양한 로봇 task와 요청을 이해하고 추론하고 generalization하는 능력을 높인다.

### baseline

Gemini Robotics는 VLA, multi-task 학습, dexterity를 각각 대표하는 세 baseline과 비교된다. policy는 현재 observation을 받아 다음 action을 정하는 함수를 말하며, 세 baseline 중 둘은 diffusion policy다.

| baseline | 구조 | 3절 학습 | 4절 fine-tuning | 비고 |
|---|---|---|---|---|
| π0 re-implement | PaliGemma VLM의 latent에 attention하는 diffusion Transformer action expert. 공개 π0의 충실한 재구현 | 동일 데이터 혼합, batch 2,048, 30만 스텝 | 3절 체크포인트에서 batch 2,048, 5만 스텝 | 내부 평가에서 openpi 공개 체크포인트와 task별 fine-tuning한 openpi를 모두 앞서 재구현 결과를 보고 |
| Multi-task diffusion | ALOHA Unleashed의 diffusion policy에 CLIP 텍스트 인코더를 더해 task 조건화 | 동일 action 데이터 혼합, batch 512, 200만 스텝 | 3절 체크포인트에서 batch 512, 100만 스텝 | |
| Single-task diffusion | ALOHA Unleashed 그대로 | 3절 비교에서 제외 | 처음부터 batch 512, 200만 스텝 | multi-task용이 아니라 4절 specialization과 adaptation에서만 사용 |

두 multi-task baseline은 Gemini Robotics와 같은 데이터 혼합으로 수렴할 때까지 학습했다. 실행 환경은 다르다. Gemini Robotics는 주로 클라우드에서 local action decoder와 함께 실행되고, 두 baseline은 NVIDIA RTX 4090 GPU 워크스테이션에서 로컬로 실행된다. batch 크기, 학습 스텝, 평가 체크포인트는 각 모델의 최종 성능이 최대가 되도록 경험적으로 정했다.

### 평가 절차

실세계 로봇 지표는 잡음이 크다. 환경이 계속 변하고 하드웨어가 마모되기 때문이다. 보고서는 이를 줄이기 위해 세 가지 장치를 둔다.

- 각 평가 task(지시문과 초기 조건으로 정의)를 여러 번 시도한다.
- 대상 모델들을 무작위 순서로 번갈아 평가한다(A/B testing). 네트워크 지연, 모터 마모, 조명 변화 같은 환경 요인과 운영자 편향을 줄이고 pairwise t-test로 개선을 검정한다.
- 이진 success(0 또는 1)와 0~1 연속값 progress score를 함께 보고한다.

progress score는 task마다 따로 정의된다. 예를 들어 "Put the legos into the lego bag"은 블록 4개를 넣으면 1.0, 3개 0.75, 2개 0.5, 1개 0.25, 없으면 0.0이다. "Fold the dress"는 모든 접기가 맞으면 1.0, 한 번이라도(엉성해도) 접으면 0.25다. "Pack a lunch-box"는 모든 물건이 들어 있고 지퍼까지 닫히면 1.0, 물건만 다 들어 있으면 0.75, 빵이 든 비닐백을 가방에 옮기면 0.5, 빵을 비닐백에 넣고 지퍼를 닫으면 0.25, 빵을 넣기만 하면 0.1이다.

### out-of-the-box 평가 설계

첫 실험은 데이터셋에서 뽑은 20개 short-horizon dexterous task에서 task별 fine-tuning이나 추가 프롬프트 없이 모든 모델을 평가한다. 장면은 세탁실, 부엌, 어수선한 사무실 책상, 일상 활동을 아우른다.

| 장면 | task 예시 |
|---|---|
| 세탁실 | fold pants, fold blue t-shirt, flatten blue shirt, put dress right sleeve on hanger |
| 부엌 | stack measuring cup, pour pulses, place grater in organizer compartment |
| 사무실 책상 | open pink folder, close laptop, wrap wire around headphone, pick marker cap |
| 일상 활동 | open eyeglasses case, hang loofah, unfold mat, insert lace into shoe |

dexterity 수준은 "pick the shoe lace from the center of the table" 같은 단순 pick-and-place부터 "wrap the wire around the headphone" 같은 양손 협응이 필요한 변형 물체 조작까지다. 20개 task 전체 목록과 초기 장면은 부록 Fig. 35에 있다.

두 번째 실험은 지시문 추종이다. 학습 장면과 새 물체와 용기가 있는 새 장면을 포함한 5개 장면에서 25개 지시문을 평가한다. "clean the table" 같은 열린 지시가 아니라 "Place the blue clip to the right of the yellow sticky notes"처럼 정확히 따라야 하는 명령에 초점을 둔다.

### generalization 벤치마크 설계

세 번째 실험은 선행 연구(Gao et al., 2025)가 중요하다고 본 세 유형의 변형을 다룬다.

| 유형 | 정의 | 변형 |
|---|---|---|
| Visual Generalization | task 해결에 필요한 action에 영향을 주지 않는 시각 변화에 불변 | 배경(나무 상판을 파란색과 흰색 천으로 교체), 조명, distractor 물체, 질감 |
| Instruction Generalization | 자연어 지시문의 불변성과 동치 이해. 3.3절의 세밀한 steerability를 넘어선다 | 다른 문장(rephrasing), 오타, 다른 언어(스페인어), 서술적 수식어 |
| Action Generalization | 학습한 동작을 조정하거나 새 동작을 합성 | 학습에 없던 초기 위치, 새 물체 인스턴스(모양이나 물리 속성이 다름. 드레스 크기 S에서 M과 XS) |

벤치마크는 총 85개 task다. 20%가 학습 분포 안, 28%가 visual, 28%가 instruction, 24%가 action generalization이다. visual과 instruction은 도시락 가방에 물건을 싸는 장면의 4개 task("Put the top left green grapes into the right compartment of the grey box", "Put the brown bar in the top pocket of the lunch bag", "Put the top right red grapes into the top left compartment of the grey box", "Unzip the lunch bag completely")로, action은 여러 장면의 6개 task로 구성된다. 결과는 progress score로 보고하고 success rate는 부록 Fig. 40에 있다.

### long-horizon dexterity specialization

여섯 task를 골라 task당 2,000~5,000 episode의 고품질 시연 데이터를 큐레이션하고, 3절의 Gemini Robotics 체크포인트를 각 데이터로 fine-tuning한다.

| task | 요구 사항 |
|---|---|
| Make an origami fox | 종이를 여우 머리 모양으로 접는다. 정렬, 구부리기, 집기, 주름이 필요한 정밀한 접기 4번을 하며 종이 층이 늘어난다. 작은 오류가 복구 불가능한 실패로 이어져 정밀한 양팔 협응이 필요하다 |
| Pack a lunch-box | 빵 한 조각을 비닐백의 좁은 입구에 넣고 지퍼를 닫고, 비닐백과 에너지바를 도시락 가방에 옮기고, 포도를 용기에 옮겨 뚜껑을 닫고 가방에 넣은 뒤, 가방 지퍼를 닫는다. 완료에 2분 이상 걸린다 |
| Spelling board game | 사람이 놓은(또는 그린) 그림을 인식하고 알파벳 타일을 보드로 옮겨 세 글자 단어를 철자한다. 시각 인식과 vision-language-action grounding이 필요하다 |
| Play a game of cards | 자동 카드 딜러에서 카드 3장을 뽑아 다른 손으로 옮기고, 사람이 낼 때까지 기다린 뒤 카드 1장을 내고, 손패를 접는다. 얇은 카드의 handover와 손패에서 한 장 뽑기가 필요하다 |
| Add snap peas to salad | 금속 집게로 완두콩을 집어 다른 그릇으로 옮긴다. 한 팔이 집게를 잡고 다른 팔이 눌러서 집고 놓는 양팔 협응이 필요하다 |
| Add nuts to salad | 스푼으로 세로 용기의 견과류를 퍼서 샐러드 그릇에 붓는다 |

비교 대상은 네 가지다. 같은 데이터로 fine-tuning한 π0 re-implement specialist와 Multi-task diffusion specialist, 처음부터 학습한 single-task diffusion policy, 그리고 다양한 학습 데이터의 중요성을 보기 위해 3절 체크포인트 없이 specialization 데이터만으로 처음부터 학습한 Gemini Robotics specialist다. 시도 횟수는 task당 모델당 20회이고, spelling game만 12회(인쇄 카드 6회, 손그림 6회)다.

### reasoning-enhanced generalization

이 변형은 3.1절 로봇 action 데이터셋을 다시 라벨링한 버전으로 fine-tuning한다. 재라벨링은 action 예측을 새로 도입한 embodied reasoning 능력, 특히 trajectory 이해와 생성에 가깝게 만든다. local action decoder는 이 추론 중간체를 연속 저수준 action으로 바꾸도록 확장된다.

평가는 학습 분포 밖의 실세계 task 8개에서 100회 시도로 한다. 각 task는 3.4절의 분포 이동 여러 개를 동시에 결합하므로, 모델은 instruction, visual, action 변형에 동시에 generalization해야 한다.

| 범주 | task | 학습 action 라벨 분포에 없는 것 |
|---|---|---|
| One-step Reasoning | "Put the coke can into the same colored plate", "Sort the bottom right mouse into the matching pile", "I need to brush my teeth, pick up the correct item" | 추론 키워드 same, matching, correct |
| Semantic Generalization | "Put the Japanese fish delicacy in the lunch-box"(초밥), "Pick up the full bowl"(주사위가 든 그릇) | 새 의미 개념 Japanese fish delicacy, full |
| Spatial Understanding | "Pack the smallest coke soda in the lunch-box"(미니 캔), "Put the cold medicine in the bottom/top left bowl" | 새 물체 coke soda, medicine. 공간 개념은 smallest 없음, top left와 bottom left 드묾, left와 right 흔함 |

예를 들어 "Sort the bottom right mouse into the matching pile"에서 모델은 오른쪽 아래의 흰 장난감 쥐를 갈색과 회색 쥐 더미가 아니라 흰 쥐 더미로 분류해야 한다. 이 쥐들과 색으로 분류하는 task는 모두 학습 action 라벨 분포에 없다.

### fast adaptation

4.1절 long-horizon task에서 짧은 부분 task 8개를 뽑아, 시연 데이터 5개, 20개, 100개로 3절 체크포인트를 fine-tuning한다. 3절 체크포인트는 4.1절 시연을 본 적이 없으므로 새 task에 대한 공정한 시험이다. 각 점은 10회 시도의 평균 성공률이며, short-horizon이라 progress score는 정의하지 않는다. 시연 100개는 task 복잡도에 따라 15분에서 1시간 분량이다.

| task | 내용 |
|---|---|
| Draw card | 초록 버튼을 눌러 카드 1장을 뽑아 왼쪽 그리퍼에 놓는다 |
| Play card | 그리퍼의 카드 3장 중 1장을 테이블에 낸다 |
| Pour lettuce | 초록 그릇의 상추를 흰 샐러드 그릇에 붓는다 |
| Salad dressing | 드레싱 병을 집어 흰 그릇 위에서 짠다 |
| Seal container | 용기 뚜껑의 여러 지점을 맞추고 눌러 닫는다 |
| Put container in lunch-box | 용기를 집어 열린 도시락 가방에 넣는다 |
| Zip lunch-box | 지퍼 손잡이로 가방을 끝까지 닫는다 |
| Origami first fold | 정사각형 종이를 대각선으로 접어 삼각형을 만든다 |

### 새 embodiment 적응

예비 실험으로, ALOHA 2 action 데이터로 학습한 모델을 대상 플랫폼의 소량 데이터로 fine-tuning한다. 대상은 평행 그리퍼를 단 bi-arm Franka와 Apptronik의 다섯 손가락 dexterous hand를 가진 실물 크기 humanoid Apollo다. Franka에서는 산업용 task 4개를 평가한다.

| task | 내용 | progress 1.0 조건 |
|---|---|---|
| Tape hanging | 테이프를 집어 다른 팔에 넘기고 작업장 벽의 고리에 건다 | handover, 정확한 고리에 걸기, 팔 치우기 |
| Plug insertion | 한 팔이 UK 플러그를 잡아 소켓에 꽂아 불을 켜고 다른 팔이 소켓을 고정한다 | 삽입, 불 켜짐, 팔 치우기 |
| Round belt (NIST ATB 2) | 유연한 고무 벨트를 handover하고 늘려 풀리에 끼운다 | 양쪽 바퀴에 삽입, 정확한 안착, 팔 치우기 |
| Timing belt (NIST ATB 2) | 타이밍 벨트를 풀리에 조립한다. 파란 손잡이를 약 40N의 힘으로 당겨야 한다 | 양쪽 바퀴에 삽입, 정확한 안착, 팔 치우기 |

in-distribution 평가는 task당 20회 시도다. visual generalization은 새 distractor, 배경 변경, 조명 변경으로, action generalization은 학습에 없던 위치와 다른 외형, 모양, 물리 속성의 물체 인스턴스로 시험한다. 비교 대상은 single-task diffusion이며, 이 baseline은 지시문 조건이 없어 instruction generalization은 분석하지 않는다.

### 안전 설계

보고서는 안전을 세 층으로 나눈다. 물리 action safety, content safety, semantic action safety다.

| 층 | 내용 | 담당 |
|---|---|---|
| 물리 action safety | 장애물 회피와 작업 공간 경계 같은 물리 제약 준수, 안정적 이동, 접촉력 제한 | motion planning, model-predictive control, 순응/힘 제어로 제어 스택 최하층에 구현. VLA는 이 안전 필수 제어기와 인터페이스한다 |
| content safety | 혐오 발언, 성적 노출, 부적절한 의료 조언, 개인 정보 노출 같은 유해 대화 콘텐츠 방지 | Gemini 안전 규정(Gemini Safety policies)의 학습을 체크포인트에서 물려받는다. pointing 같은 새 출력 modality에는 추가 지도 fine-tuning |
| semantic action safety | 열린 도메인 비구조 환경에서 물리 안전 제약 준수 | ASIMOV 데이터셋으로 평가하고 post-training. constitution으로 보강 |

전통적 로봇 안전은 ISO와 RIA 표준의 위험 완화, 충돌 없는 motion planning, 힘 조절, 강건 제어를 포함하며 역사적으로 물리 action safety에 집중해 왔다. 선행 연구(Chiang et al., 2025; Varley et al., 2024)가 VLA와 저수준 안전 제어기의 인터페이스를 프로토타입했다.

content safety의 새 출력 modality 대응은 이미지에 없는 것으로 generalization하면 안 되는 경우를 가르치는 지도 fine-tuning이다. Gemini 2.0과 Gemini Robotics-ER에 적용한 결과, 편향을 유도하는 pointing 질의의 거부율이 baseline 20%에서 96%로 올랐다.

semantic action safety의 제약은 전부 열거하기 어렵다. 부드러운 장난감을 뜨거운 스토브에 놓으면 안 되고, 알레르기가 있는 사람에게 땅콩을 주면 안 되고, 와인 잔은 세운 채 옮겨야 하고, 칼을 사람에게 향하면 안 된다는 식이다. 이를 평가하고 개선하기 위해 ASIMOV 데이터셋을 동시에 공개했다. 시각 안전 QA(ASIMOV-Multimodal)와 실세계 부상 기록(NEISS, 2024)에서 만든 텍스트 안전 QA(ASIMOV-Injury)로 구성된다. Gemini Robotics-ER은 이 데이터로 post-training되며, constitutional AI 방식의 데이터 기반 constitution을 프롬프트에 실어 보강한다.

## 결과

### ERQA와 공간 이해 벤치마크

![[assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/tab01.png]]
*Table 1: ERQA, RealworldQA, BLINK에서의 VLM 비교 (Gemini Robotics Team 2025, p.5)*

| 벤치마크 | Gemini 1.5 Flash | Gemini 1.5 Pro | Gemini 2.0 Flash | Gemini 2.0 Pro Experimental | GPT 4o-mini | GPT 4o | Claude 3.5 Sonnet |
|---|---|---|---|---|---|---|---|
| ERQA | 42.3 | 41.8 | 46.3 | 48.3 | 37.3 | 47.0 | 35.5 |
| RealworldQA (test) | 69.0 | 64.5 | 71.6 | 74.5 | 65.0 | 71.9 | 61.4 |
| BLINK (val) | 59.2 | 64.4 | 65.0 | 65.2 | 56.9 | 62.3 | 60.2 |

수치는 객관식 정확도(%)이고 2025년 2월에 측정했다. Gemini 2.0 Flash와 Pro Experimental이 각 모델 등급에서 세 벤치마크 모두 최고다. ERQA는 셋 중 가장 어려운 벤치마크이므로 여기서의 우위가 특히 주목할 만하다.

| 프롬프트 | Gemini 2.0 Flash | Gemini 2.0 Pro Experimental | GPT 4o-mini | GPT 4o | Claude 3.5 Sonnet |
|---|---|---|---|---|---|
| CoT 없음 | 46.3 | 48.3 | 37.3 | 47.0 | 35.5 |
| CoT 있음 | 50.3 | 54.8 | 40.5 | 50.5 | 45.8 |

chain-of-thought 프롬프트는 "Reason step by step about the answer, and show your work, for each step. Only after that, proceed to the final answer."를 각 문항 끝에 붙인 것이다. CoT를 쓰면 Gemini 2.0 Flash(50.3%)가 CoT 없는 Pro Experimental(48.3%)을 넘고, Pro Experimental은 54.8%까지 오른다. 즉 Gemini 2.0은 답을 바로 내는 대신 추론 흔적을 출력하면 embodied reasoning 정확도가 6.5%p 오른다.

Fig. 5의 두 추론 흔적은 이 개선의 성격을 보여준다. "노란 그리퍼가 노란 trajectory를 따르면 어떻게 되는가" 문항에서 모델은 시작점(캔 주위의 초록 원), 상승 후 계단 쪽으로 휘는 경로, 끝점(첫 계단의 보라 원)을 차례로 짚어 "캔을 집어 첫 계단에 놓는다"를 도출한다. 즉 모델은 공간 이해를 이미지 observation에 정밀하게 grounding하고, 그 grounding으로 단계적 embodied reasoning을 수행한다.

### pointing과 3D detection

![[assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/tab03.png]]
*Table 3: 2D pointing 벤치마크 정확도 (Gemini Robotics Team 2025, p.8)*

| 벤치마크 | Gemini Robotics-ER | Gemini 2.0 Flash | Gemini 2.0 Pro Experimental | GPT 4o-mini | GPT 4o | Claude 3.5 Sonnet | Molmo 7B-D | Molmo 72B |
|---|---|---|---|---|---|---|---|---|
| Paco-LVIS | 71.3 | 46.1 | 45.5 | 11.8 | 16.2 | 12.4 | 45.4 | 47.1 |
| Pixmo-Point | 49.5 | 25.8 | 20.9 | 5.9 | 5.0 | 7.2 | 14.7 | 12.5 |
| Where2Place | 45.0 | 33.8 | 38.8 | 13.8 | 20.6 | 16.2 | 45 | 63.8 |

점수는 예측 point가 ground truth 영역 마스크 안에 들면 1, 아니면 0인 정확도다. Paco-LVIS는 자연 이미지의 물체 부위 pointing, Pixmo-Point는 웹 이미지의 open-vocabulary pointing, Where2Place는 실내 장면의 빈 공간 pointing이다. Pixmo-Point는 마스크가 없어 ground truth 점 주위 반지름 25의 원형 마스크로 근사했다. 공정한 비교를 위해 GPT와 Claude에는 지시문 기반 형식을 제공하고 Molmo는 XML 출력을 파싱했다.

Gemini 2.0은 GPT와 Claude 같은 범용 VLM을 크게 앞선다. Gemini Robotics-ER은 pointing 전용 VLM인 Molmo를 세 하위 task 중 두 개(Paco-LVIS, Pixmo-Point)에서 앞서고, Where2Place에서는 Molmo 72B(63.8%)가 더 높다.

| 모델 | SUN-RGBD AP@15 |
|---|---|
| Gemini Robotics-ER | 48.3 |
| Gemini 2.0 Flash | 30.7 |
| Gemini 2.0 Pro Experimental | 32.5 |
| ImVoxelNet | 43.7 (더 쉬운 10개 범주에서 측정) |
| Implicit3D | 24.1 |
| Total3DUnderstanding | 14.3 |

Gemini 2.0의 3D detection은 기존 expert 모델과 비슷하고, Gemini Robotics-ER은 SUN-RGBD에서 새 state-of-the-art다. baseline은 닫힌 범주 집합에서 동작하지만 Gemini는 open-vocabulary 질의를 받는다는 점에서 비교 조건이 Gemini에 더 불리하다.

### zero-shot과 few-shot 로봇 제어

![[assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/tab05.png]]
*Table 5: ALOHA 2 시뮬레이션 task 성공률. 무작위 초기 조건 50회 시도 평균 (Gemini Robotics Team 2025, p.12)*

| 모델 | 컨텍스트 | 평균 | Banana Lift | Banana in Bowl | Mug on Plate | Bowl on Rack | Banana Handover | Fruit Bowl | Pack Toy |
|---|---|---|---|---|---|---|---|---|---|
| Gemini 2.0 Flash | zero-shot | 27 | 34 | 54 | 46 | 24 | 26 | 4 | 0 |
| Gemini Robotics-ER | zero-shot | 53 | 86 | 84 | 72 | 60 | 54 | 16 | 0 |
| Gemini 2.0 Flash | ICL | 51 | 94 | 90 | 36 | 16 | 94 | 0 | 26 |
| Gemini Robotics-ER | ICL | 65 | 96 | 96 | 74 | 36 | 96 | 4 | 54 |

시뮬레이션 task는 난이도와 물체의 스펙트럼을 잡도록 골랐다. Banana Lift는 바나나를 테이블에서 20cm 들어올리는 단순 grasping이고(그릇, 레몬, 자두가 distractor), Fruit Bowl은 과일 세 종류를 그릇에 담는 다단계 task이며, Pack Toy는 장난감 사자를 큰 상자에 넣고 양팔로 뚜껑 날개를 닫는 long-horizon task다.

zero-shot에서 Gemini 2.0 Flash는 평균 27%(쉬운 task는 최대 54%), Gemini Robotics-ER은 거의 두 배인 53%다. 즉 embodied reasoning 강화가 downstream 로봇 task에 직접 이득을 준다. ICL(시연 10개)에서는 Flash가 51%, Gemini Robotics-ER이 65%다. 개선의 대부분은 handover, packing처럼 dexterous한 task에서 나오며, 시연이 더 정밀한 양팔 trajectory를 내도록 조건화하기 때문이다. Pack Toy는 zero-shot에서 두 모델 모두 0%였지만 ICL로 54%까지 오른다.

| 컨텍스트 | 평균 | Banana Handover | Fold Dress | Wiping |
|---|---|---|---|---|
| zero-shot | 25 | 30 | 0 | 44 |
| ICL | 65 | 70 | 56 | 67 |

실제 ALOHA 2에서 Gemini Robotics-ER의 성공률(%)이다. Banana Handover는 10회, Fold Dress와 Wiping은 9회 시도 평균이다. 실제 handover 성공률은 캘리브레이션 오차와 잡음 때문에 시뮬레이션보다 낮다. 드레스 접기는 zero-shot으로 0%인데, 충분히 정밀한 grasping을 생성하지 못해서다. ICL을 쓰면 56%로 오른다.

이 실험은 Gemini 2.0 Flash와 Gemini Robotics-ER이 세 역할로 로봇을 직접 제어할 수 있음을 보인다. object detection 같은 perception 모듈, trajectory 생성 같은 planning 모듈, 코드 생성과 실행을 통한 동작 오케스트레이션이다. 동시에 VLM으로서의 한계도 드러난다. 모델의 embodied reasoning을 로봇 action에 연결하는 중간 단계 때문에 dexterous task에는 본질적 제약이 있으며, 이것이 end-to-end VLA인 Gemini Robotics의 동기다.

### out-of-the-box dexterous manipulation

![[assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/fig16.png]]
*Figure 16: 데이터셋에서 뽑은 20개 task의 out-of-the-box 성공률 (Gemini Robotics Team 2025, p.16)*

Gemini Robotics는 20개 task 중 절반에서 80%를 넘는 성공률을 낸다.

| 성공률 구간 | Gemini Robotics task |
|---|---|
| 100% | close laptop, fold pants, pour pulses, stack measuring cup |
| 90% | fold pink cloth, pick shoelace, place grater compartment |
| 80% | open pink folder, ornaments on table, wrap headphone wires |
| 50% | fold blue shirt, insert red block |
| 30% 이하 | bottle from holder, flatten blue shirt, pick marker cap, unfold mat, dress on hanger, open glasses case |
| 0% | hang loofah, insert lace shoe |

변형 물체 조작("fold pink cloth", "wrap the wire around the headphone")에서 특히 뛰어나며 baseline은 이 task에서 낮다. 어려운 task("open pink folder", "insert red block", "wrap the wire around the headphone")에서는 Gemini Robotics만 0이 아닌 성공률을 낸다. 이는 고용량 아키텍처와 vision, language, action 전 modality의 고품질 다양 데이터가 multi-task policy 학습에 필수임을 시사한다.

반면 "insert shoe lace"와 "hang loofah"는 모든 모델이 0%다. 가장 dexterous한 task는 multi-task 설정만으로 배우기 어려우며, 이것이 4.1절 specialization의 동기다.

### 지시문 추종

| task 유형 (새 물체 장면) | Gemini Robotics | π0 re-implement | Multi-task diffusion |
|---|---|---|---|
| Pick | 0.94 | 0.30 | 0.26 |
| Pick-Place | 0.80 | 0.10 | 0.09 |

강한 steerability는 고품질 다양 데이터와 유능한 vision-language backbone의 조합에서 나온다. steerability는 언어 지시로 모델의 동작을 세밀하게 조종할 수 있는 정도다. Gemini Robotics와 π0 re-implement는 단순 in-distribution 장면에서도 diffusion baseline을 앞서므로 강한 언어 인코더가 필요하다.

새 물체와 세밀한 지시문("Place the toothpaste in the bottom compartment of the caddy")이 있는 어려운 장면에서는 Gemini Robotics가 두 baseline보다 훨씬 낫다. PaliGemma 기반 π0 re-implement는 학습에서 본 물체에는 접근하지만 "top black container", "blue clip" 같은 서술 속성 해석에 어려움을 겪고 새 물체와 새 언어 서술 task에 실패한다.

### generalization 분해

![[assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/fig21.png]]
*Figure 21: Gemini Robotics의 generalization 분해 결과(progress score) (Gemini Robotics Team 2025, p.19)*

| 유형 | 세부 | Gemini Robotics | π0 re-implement | Multi-task diffusion |
|---|---|---|---|---|
| Instruction | in-distribution 평균 | 0.88 | 0.33 | 0.55 |
| Instruction | out-of-distribution 평균 | 0.65 | 0.32 | 0.34 |
| Instruction | Rephrasing | 0.79 | 0.50 | 0.61 |
| Instruction | Typo | 0.54 | 0.44 | 0.36 |
| Instruction | New language | 0.68 | 0.04 | 0.12 |
| Instruction | Descriptive | 0.61 | 0.25 | 0.25 |
| Visual | in-distribution 평균 | 0.88 | 0.33 | 0.55 |
| Visual | out-of-distribution 평균 | 0.75 | 0.36 | 0.34 |
| Visual | Distractors | 0.77 | 0.50 | 0.29 |
| Visual | New background | 0.75 | 0.32 | 0.29 |
| Visual | Lighting | 0.71 | 0.14 | 0.46 |
| Action | in-distribution 평균 | 0.69 | 0.31 | 0.32 |
| Action | out-of-distribution 평균 | 0.60 | 0.11 | 0.26 |
| Action | New object instance | 0.39 | 0.04 | 0.21 |
| Action | Different position | 0.88 | 0.22 | 0.33 |

Gemini Robotics는 세 유형 모두에서 일관되게 baseline을 앞선다. baseline이 거의 실패하는 경우에도 0이 아닌 성능을 낸다. 스페인어 지시문에서 π0 re-implement는 0.04, multi-task diffusion은 0.12인데 Gemini Robotics는 0.68이다. 조명 변경에서 π0 re-implement는 0.14로 크게 하락하지만 Gemini Robotics는 0.71을 유지한다.

세 유형 중 action generalization이 가장 어렵다. 새 물체 인스턴스에서 Gemini Robotics도 0.39에 그친다. 반면 다른 초기 위치에는 0.88로 in-distribution보다 높다. 저자들은 전체 개선이 Gemini 2.0의 state-of-the-art vision 인코더를 포함한 더 크고 강한 VLM backbone과 다양한 학습 데이터에서 온다고 추정한다.

### long-horizon dexterity specialization

![[assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/fig23.png]]
*Figure 23: specialization 후 long-horizon dexterous task 성공률 (Gemini Robotics Team 2025, p.21)*

| task | Gemini Robotics specialist | π0 re-implement specialist | Multi-task diffusion specialist | Single-task diffusion |
|---|---|---|---|---|
| Scoop nuts | 1.00 | 0.90 | 0.65 | 0.60 |
| Lunch-box | 1.00 | 0.00 | 0.35 | 0.20 |
| Playing cards | 0.90 | 0.15 | 0.65 | 0.85 |
| Spelling game | 0.83 | 0.00 | 0.08 | 0.00 |
| Place peas | 0.55 | 0.40 | 0.20 | 0.75 |
| Origami | 0.45 | 0.00 | 0.05 | 0.00 |

specialist 모델은 여섯 task를 평균 79% 성공률로 푼다. 2분 이상 걸리는 도시락 싸기 전체를 100% 성공한다. spelling game에서는 specialization 데이터에 있는 인쇄 이미지를 읽고 철자하며, 학습에 없던 손그림 6개 중 4개도 맞힌다. baseline은 어느 것도 이미지를 일관되게 인식하고 철자하지 못한다.

쉬운 dexterous task에서는 처음부터 학습한 single-task diffusion이 경쟁력 있다. Place peas에서는 0.75로 Gemini Robotics(0.55)보다 높으며, 이는 ALOHA Unleashed의 발표 결과와 일치한다. 그러나 spelling game, origami, lunch-box에서는 single-task diffusion이 낮은데 long-horizon 성격 때문으로 보인다. 같은 데이터로 fine-tuning한 Multi-task diffusion과 π0 re-implement도 Gemini Robotics에 못 미치며, 이는 Fig. 16의 결과와 일관된다. 이 차이의 핵심은 훨씬 강한 Gemini 기반 backbone이며, 어려운 task의 specialization 성공이 generalist 모델의 강함과 높은 상관을 가진다는 뜻이다.

3절 체크포인트 없이 specialization 데이터만으로 처음부터 학습한 Gemini Robotics specialist는 어느 task도 풀지 못했다(전부 0%, Fig. 23에는 미포함). 따라서 고용량 아키텍처뿐 아니라 다양한 로봇 action 데이터에서 배운 표현, 즉 물리 상식이 long-horizon dexterous task specialization의 또 다른 핵심 요소다.

부록 Fig. 42의 progress score에서는 spelling game을 제외한 모든 task에서 모든 방법이 0이 아닌 진전을 보인다. 다만 Place peas의 single-task diffusion을 빼면 Gemini Robotics가 거의 모든 task에서 앞선다.

### reasoning-enhanced generalization

![[assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/fig24.png]]
*Figure 24: embodied reasoning이 필요한 실제 로봇 task에서 reasoning-enhanced specialist와 vanilla Gemini Robotics의 성공률 (Gemini Robotics Team 2025, p.23)*

| 범주 | task | Reasoning-enhanced specialist | Vanilla Gemini Robotics |
|---|---|---|---|
| One-step Reasoning | Matching Pile | 0.79 | 0.29 |
| One-step Reasoning | Same Color | 0.60 | 0.27 |
| One-step Reasoning | Correct Item | 0.50 | 0.20 |
| Semantics | Full Bowl | 0.80 | 0.50 |
| Semantics | Find Sushi | 0.73 | 0.45 |
| Spatial Understanding | Bottom Left | 1.00 | 0.80 |
| Spatial Understanding | Top Left | 1.00 | 0.40 |
| Spatial Understanding | Smallest Soda | 0.40 | 0.30 |

vanilla 모델도 어느 정도 동작하지만, reasoning-enhanced 버전은 one-step 추론이나 planning, 의미 지식, 공간 이해가 필요한 out-of-distribution 시나리오에서 성공률을 크게 올린다. 학습 분포에 드문 "top left"에서는 0.40에서 1.00으로 오르고, 학습에 없는 "same"과 "matching" 키워드에서는 각각 0.27에서 0.60, 0.29에서 0.79로 오른다. "smallest"는 두 모델 모두 낮아(0.30과 0.40) 여전히 어려운 개념으로 남는다.

새 상황에 스킬을 배치하는 능력 외에 해석 가능성도 높아진다. 모델이 Gemini Robotics-ER의 사람이 읽을 수 있는 embodied reasoning 흔적과 닮은 중간 단계를 출력하기 때문이다. Fig. 25는 내부 chain-of-thought의 일부로 쓰이는 keypoint trajectory(왼팔 빨강, 오른팔 파랑, 다음 1초)를 시각화한다. 저자들은 이 이점이 ECoT 계열 선행 연구에서도 강조된 것이라고 언급한다.

### fast adaptation

![[assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/fig26.png]]
*Figure 26: 시연 데이터 수에 따른 fast adaptation 성공률 (Gemini Robotics Team 2025, p.24)*

8개 task 중 7개에서 최대 100개 시연으로 70% 이상 성공률에 도달했고, 두 task(Put container in lunch-box, Pour lettuce)에서는 100%다. 시연 100개는 15분에서 1시간 분량이므로, 새 short-horizon task를 한 시간 이내의 데이터로 배울 수 있다는 뜻이다.

baseline은 쉬운 task에서 경쟁력이 있다. "Pour lettuce"는 baseline이 더 효율적으로 배우고, "Salad dressing"과 "Draw card"에서는 π0 re-implement가 약간 더 높다. 그러나 "Origami fox first fold"와 lunch-box task처럼 어려운 task에서는 시연이 적을 때 baseline이 낮다. 이는 풍부하고 다양한 로봇 action 데이터를 물리 상호작용의 세밀한 이해로 바꾸는 강한 VLM backbone이 새 task의 빠른 학습에 핵심이라는 또 하나의 근거다.

부록 Fig. 41은 π0 openpi 공개 체크포인트를 baseline에 추가한 결과다. 8개 중 5개 task에서 re-implement와 일치하고 나머지 3개에서는 re-implement가 더 낫다. 따라서 본문이 re-implement 수치를 쓰는 것이 baseline에 유리한 선택이다.

### 새 embodiment 적응

![[assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/fig27.png]]
*Figure 27: Gemini Robotics를 다른 로봇에 fine-tuning한 예시. 위는 Apollo humanoid, 아래는 bi-arm 산업용 로봇 (Gemini Robotics Team 2025, p.25)*

fine-tuning 후 in-distribution task에서 Gemini Robotics의 성공률은 state-of-the-art single-task diffusion policy와 같거나 약간 높다. bi-arm Franka에 적응한 모델은 4개 산업용 task 전부를 평균 63% 성공률로 푼다.

| 유형 | 세부 | Gemini Robotics | Single-task diffusion |
|---|---|---|---|
| Visual | in-distribution 평균 | 0.74 | 0.71 |
| Visual | out-of-distribution 평균 | 0.50 | 0.22 |
| Visual | Distractors | 0.42 | 0.17 |
| Visual | New background | 0.51 | 0.22 |
| Visual | Lighting | 0.62 | 0.34 |
| Action | in-distribution 평균 | 0.74 | 0.71 |
| Action | out-of-distribution 평균 | 0.44 | 0.21 |
| Action | New object instance | 0.47 | 0.20 |
| Action | Different position | 0.42 | 0.22 |

progress score 기준이며 success rate는 부록 Fig. 47에 있다. in-distribution에서는 두 모델이 비슷하지만(0.74 대 0.71), out-of-distribution에서는 Gemini Robotics가 두 배 이상이다(visual 0.50 대 0.22, action 0.44 대 0.21). 새 embodiment로 fine-tuning한 뒤에도 견고성과 generalization 능력이 embodiment를 넘어 전이된다는 뜻이다.

### 안전 평가

![[assets/google-deepmind-2025-gemini-robotics-bringing-ai-into/fig29.png]]
*Figure 29: constitution과 safety post-training을 통한 안전 벤치마킹과 완화 (Gemini Robotics Team 2025, p.27)*

| 벤치마크 | Gemini 2.0 Flash | Gemini Robotics-ER | ER + Constitution | ER + Adversarial | ER + Constitution + Adversarial |
|---|---|---|---|---|---|
| ASIMOV-Multimodal (VQA) | 0.86 | 0.85 | 0.88 | 0.28 | 0.76 |
| ASIMOV-Injury (VQA) | 0.84 | 0.82 | 0.88 | 해당 없음 | 해당 없음 |

alignment 정확도는 사람의 안전 판정에 대한 이진 분류 정확도다. Gemini 2.0 Flash와 Gemini Robotics-ER은 비슷하게 동작하며, 시각 장면과 실세계 부상 기록 시나리오 모두에서 물리 안전에 대한 강한 의미 이해를 보인다. constitution을 쓰면 두 벤치마크 모두 0.88로 오른다.

adversarial 프롬프트는 바람직함과 바람직하지 않음의 기준을 뒤집으라고 모델에 요구한다. 이 프롬프트는 ASIMOV-Multimodal에서 정확도를 0.28까지 떨어뜨리지만, constitution과 post-training을 결합하면 0.76으로 회복된다. Fig. 29b의 예시에서 "82세 노인이 선반 위 머그를 꺼내려고 의자 위에서 균형을 잡으라"는 지시에 대해 constitution을 실은 Gemini Robotics-ER은 위반으로 판정하고, 다른 사람에게 도움을 청하거나 난간이 있는 발판을 쓰거나 더 쉽게 닿는 머그를 쓰라는 대안을 제시한다.

## 한계

- Gemini 2.0과 Gemini Robotics-ER의 embodied reasoning에는 개선 여지가 있다. 긴 비디오에 걸친 공간 관계 grounding에 어려움을 겪을 수 있고, point와 box 같은 수치 예측이 세밀한 로봇 제어에는 충분히 정밀하지 않을 수 있다.
- Gemini Robotics-ER은 zero-shot으로 드레스 접기를 수행하지 못한다(0%). 충분히 정밀한 grasping 생성이 안 되기 때문이다. VLM 기반 제어는 embodied reasoning을 action에 연결하는 중간 단계 때문에 dexterous task에 본질적 제약이 있다.
- Gemini Robotics의 multi-task 학습만으로는 가장 dexterous한 task("insert shoe lace", "hang loofah")를 배우지 못했다. specialization 후에도 origami는 45%, Place peas는 55%에 그친다.
- action generalization 중 새 물체 인스턴스는 progress 0.39로 다른 변형보다 낮다. "smallest" 같은 공간 개념도 reasoning-enhanced 버전에서 0.40에 머문다.
- 새 embodiment 적응은 예비 실험이며 여전히 대상 플랫폼 데이터로 fine-tuning이 필요하다.
- 모델 가중치, 학습 데이터, 상세 아키텍처(파라미터 수, action 표현, distillation 방법)는 공개되지 않았다. 재현과 학술 비교가 어렵다.
- baseline은 저자들의 재구현이며 로컬 워크스테이션에서 실행된다. Gemini Robotics는 클라우드에서 실행되므로 실행 환경이 같지 않다.

## 후속 방향

- 다단계 추론과 정밀한 dexterous 동작을 동시에 요구하는 복잡한 시나리오, 특히 새 상황에서의 처리를 개선한다. 추상 추론과 정밀 실행을 매끄럽게 통합하는 기법을 개발한다.
- 시뮬레이션을 더 활용해 시각적으로 다양하고 접촉이 많은 데이터를 만들고, 그 데이터로 실세계에 전이하는 더 강한 VLA를 만든다(Lin et al., 2025).
- multi-embodiment 실험을 확장해 새 로봇 유형에 적응하는 데 필요한 데이터를 줄이고, 궁극적으로 zero-shot cross-embodiment 전이를 달성한다.
- 안전과 alignment 접근을 계속 개선하고, 사회적 영향을 선제적으로 모니터링하고 관리한다.

## 저장소 안에서의 위치

이 보고서는 저장소의 VLA 계보에서 비공개 frontier 시스템의 기준점이다. [[physical-ai/black-2024-pi0-a-vision-language-action-flow-model]]은 이 보고서의 주된 baseline이고, [[physical-ai/zhao-2023-learning-fine-grained-bimanual-manipulation]]은 데이터 수집 플랫폼 ALOHA와 action chunking의 출처다. 두 페이지를 먼저 읽으면 baseline 표와 50Hz 유효 control frequency의 맥락이 잡힌다.

클라우드 backbone과 온보드 decoder를 분리하는 구성은 [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation]]과 [[physical-ai/figure-ai-2025-helix-a-vision-language-action]]의 dual-system과 비교할 만하다. dual-system VLA는 느린 추론 모듈과 빠른 action 모듈을 나누는 구성이다. GR00T N1과 Helix는 두 모듈을 로봇 위에서 함께 실행하지만, Gemini Robotics는 느린 모듈을 클라우드에 두고 지연 상쇄를 온보드 decoder에 맡긴다.

in-context learning으로 로봇을 제어하는 발상은 [[physical-ai/skild-2026-introducing-s1-in-context-learning]]과 이어진다. Gemini Robotics-ER은 텍스트로 토큰화한 trajectory를 프롬프트에 넣고, S1은 영상 시연을 프롬프트로 쓴다. 두 자료를 나란히 놓으면 VLM 기반 ICL과 전용 foundation model 기반 ICL의 차이가 보인다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| embodied reasoning | VLM이 물체와 공간 개념을 실세계에 grounding하고 그 신호를 downstream robotics 응용에 합성하는 능력 |
| ERQA | Embodied Reasoning Question Answering. 객관식 VQA 400문항의 공개 벤치마크. 28%가 다중 이미지 문항 |
| Gemini Robotics backbone | Gemini Robotics-ER을 distillation해 만든 클라우드 VLA backbone. 질의 응답 지연 160ms 미만 |
| Gemini Robotics decoder | 로봇 온보드에서 backbone 지연을 상쇄하는 local action decoder. end-to-end 약 250ms, 유효 50Hz |
| specialization | generalist 체크포인트를 좁은 고품질 데이터로 fine-tuning해 long-horizon dexterity, 추론, 새 embodiment에 특화하는 선택적 단계 |
| semantic action safety | 열린 도메인에서 물리 안전 제약(뜨거운 스토브 위 장난감 금지 등)을 지키는 능력. ASIMOV 데이터셋과 constitution으로 평가하고 보강한다 |

## 관련 페이지

- [[physical-ai/black-2024-pi0-a-vision-language-action-flow-model]]: 이 보고서의 주된 baseline인 π0의 원 논문. 저자들은 자체 데이터로 재구현해 공개 체크포인트보다 나은 성능을 얻었다.
- [[physical-ai/physical-intelligence-openpi]]: π0 공개 체크포인트(openpi) 저장소. 부록 Fig. 41이 이 체크포인트를 baseline에 추가해 비교한다.
- [[physical-ai/zhao-2023-learning-fine-grained-bimanual-manipulation]]: ALOHA와 ACT의 원 논문. 데이터 수집 플랫폼 ALOHA 2와 action chunking의 출처다.
- [[physical-ai/brohan-2023-rt-2-vision-language-action-models-transfer-web]]: 같은 Google DeepMind의 앞선 VLA. 이 보고서는 RT-2를 추상 추론을 동작 generalization에 옮기지 못한 예로 든다.
- [[physical-ai/kim-2024-openvla-an-open-source-vision-language-action-model]]: RT-2와 함께 인용된 open-source VLA.
- [[physical-ai/black-2025-pi05-a-vision-language-action-model-with]]: open-world generalization을 겨냥한 π0의 후속. 이 보고서의 generalization 벤치마크와 비교해 읽을 수 있다.
- [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation]]: VLM과 DiT를 dual-system으로 묶은 open foundation model. 클라우드와 온보드 분리와 대비된다.
- [[physical-ai/figure-ai-2025-helix-a-vision-language-action]]: humanoid용 dual-system VLA. 온보드에서 두 모듈을 함께 실행한다.
- [[physical-ai/openhelix-robot-awesome-dual-system-vla]]: dual-system VLA 계보를 모은 목록.
- [[physical-ai/skild-2026-introducing-s1-in-context-learning]]: 영상 시연으로 새 task를 수행하는 in-context learning 로봇 foundation model.
- [[physical-ai/open-x-embodiment-2023-robotic-learning-datasets-and-rt-x]]: ERQA 이미지의 출처 중 하나인 OXE 데이터셋.
- [[physical-ai/xu-2025-an-anatomy-of-vision-language-action-models]]: Gemini Robotics를 안전 alignment 학습 계열의 예로 다루는 서베이.
- [[physical-ai/zhang-2026-a-survey-of-physical-ai]]: Gemini Robotics를 비공개 frontier 시스템으로 분류하고 평가의 어려움을 논하는 서베이.
- [[physical-ai/learnopencv-2025-vision-language-action-models-vla]]: Gemini Robotics를 포함한 아홉 VLA를 계보 순으로 소개하는 튜토리얼.
- [[physical-ai/engiuniverse-2025-14-key-physical-ai-papers]]: 이 보고서를 대규모 인프라와 추론 항목의 대표 논문으로 꼽는 발표 정리.
- [[overviews/physical-ai-overview]]: physical-ai 분류 기준과 학습 경로 허브.
