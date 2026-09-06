---
title: "Physical AI 핵심 논문 14편 리뷰 | 2025년까지의 기술 흐름 총정리"
type: video
year: 2025
category: physical-ai
source: engiuniverse-2025-14-key-physical-ai-papers.md
raw_path: raw/videos/engiuniverse-2025-14-key-physical-ai-papers.md
raw_filename: "engiuniverse-2025-14-key-physical-ai-papers.md"
source_collection: external
channel: "엥지유니버스 | 로봇 엔지니어"
uploader_id: "@engiuniverse"
channel_url: "https://www.youtube.com/@engiuniverse"
url: "https://www.youtube.com/watch?v=8V2a8Ty5-yk"
video_id: "8V2a8Ty5-yk"
upload_date: "2025-12-13"
duration: "PT26M48S"
caption_source: "youtube manual caption (ko), chaptered by uploader chapter marks + 2-min buckets"
papers_reviewed:
  - "RT-1: Robotics Transformer for Real-World Control at Scale (2022)"
  - "RT-2: Vision-Language-Action Models Transfer Web Knowledge to Robotic Control (2023)"
  - "Octo: An Open-Source Generalist Robot Policy (2024), arXiv:2405.12213"
  - "OpenVLA: An Open-Source Vision-Language-Action Model (2024), arXiv:2406.09246"
  - "π0 (Pi0): A Vision-Language-Action Flow Model for General Robot Control (2024), arXiv:2410.24164"
  - "CogACT (2024), arXiv:2411.19650"
  - "RoboVLMs (2024), arXiv:2412.14058"
  - "Gemini Robotics (2025), arXiv:2503.20020"
  - "NVIDIA GR00T N1 (2025), arXiv:2503.14734"
  - "BitVLA (2025), arXiv:2506.07530"
  - "PD-VLA: Parallel Decoding VLA (2025), arXiv:2503.02310"
  - "RTC: Real-Time Chunking (2025), arXiv:2506.07339"
tags: [physical-ai, vla, world-model, edge-inference]
---

## 요약

엥지유니버스 채널이 2025년 12월 13일에 공개한 26분 48초 분량의 연말 총결산 발표다. 2022년 말 RT-1을 출발점으로 잡고 이후 3년의 VLA 연구를 네 단계로 나눈 뒤, 각 단계에 대응하는 논문을 배치한다. VLA는 vision-language-action model의 약어로, 시각과 언어 입력을 받아 로봇 action을 출력하는 모델 범주를 가리킨다.

이 자료의 값은 개별 논문 해설이 아니라 배열에 있다. 각 단계가 앞 단계에서 남은 한계를 출발점으로 삼도록 구성해서, 흩어져 있던 논문 목록이 하나의 진행 방향으로 읽힌다. 따라서 VLA 계보를 처음 훑는 독자에게는 지도로 쓸 수 있고, 개별 논문을 이미 아는 독자에게는 각 논문의 좌표를 확인하는 용도가 된다.

반면 논문별 벤치마크 표를 읽는 자료는 아니므로 성능 비교의 근거로는 쓸 수 없다. 그래서 이 페이지는 발표가 다룬 논문 목록을 저장소의 개별 페이지와 이어 두는 것을 주된 역할로 삼는다.

## 배경

로봇 제어는 2022년까지 정교한 수식과 제어 이론의 영역이었다. 발표는 당시 이 분야의 선두였던 보스턴 다이나믹스의 사명에 "다이나믹스"가 들어 있다는 사실을 그 시대를 보여주는 사례로 든다.

RT-1이 그 전제를 바꿨다. 구글은 카메라 영상과 관절 움직임과 언어 명령을 모두 토큰으로 취급해 Transformer에 입력했고, 데이터 13만 개로 100가지가 넘는 작업을 수행하게 만들었다. 즉 언어 모델이 다음 단어를 예측하듯 로봇이 다음 action을 예측하게 한 구성이다.

이후 3년 동안 관련 논문이 빠르게 쌓였지만 전체 흐름을 한 번에 정리한 자료는 드물었다. 발표자는 영상 설명란에서 이 점을 제작 동기로 밝힌다. 논문을 다 챙겨보고 싶지만 시간이 부족한 시청자가 참고용으로 다시 찾아볼 수 있는 자료를 만들겠다는 것이다.

## 핵심 개념

policy는 현재 observation을 받아 다음 action을 정하는 함수를 말한다. generalist policy는 로봇 한 대나 과제 하나에 묶이지 않고 하나의 모델로 여러 로봇과 여러 과제를 다루는 policy를 가리킨다. 발표의 두 번째 단계가 이 개념이 자리 잡는 과정을 다룬다.

action tokenization은 연속값인 제어 명령을 정해진 규칙에 따라 이산 토큰으로 바꾸는 기법이다. 로봇의 관절 값이나 end-effector 변위는 연속값이라 언어 모델과 결합하기 어려웠는데, 토큰으로 바꾸면 VLM이 텍스트와 이미지와 action을 하나의 표현 공간에서 함께 다룰 수 있다.

action chunking은 매 timestep마다 action 하나를 예측하는 대신 앞으로 n스텝 분량을 한 번에 예측하는 제어 전략이다. 발표는 이 개념을 생성 모델 논의에서 떼어 설명한다. 즉 diffusion이든 flow matching이든 어느 쪽에도 똑같이 적용할 수 있는 별개의 선택지라는 것이다.

world foundation model은 여러 하위 환경으로 fine-tuning될 것을 전제로 학습한 범용 world model이다. world model은 환경의 동역학을 학습해 미래를 예측하는 모델을 뜻한다. 발표는 NVIDIA Cosmos 플랫폼의 world foundation model을 로봇의 물리적 상상력에 비유하며 약어 WFM을 함께 쓴다.

long-horizon 과제는 여러 단계를 이어야 끝나는 긴 과제를 말한다. 문을 열고 들어가서 테이블 위의 컵을 집은 뒤 지정된 위치에 놓는 작업이 발표가 드는 예다.

## 다룬 논문 목록

제목의 "14편"은 확정된 목록이 아니다. 근거가 셋으로 갈리기 때문이다. 설명란의 arXiv 링크는 10개이고, 전사에서 실제로 이름이 불리는 논문은 12편이며, 설명란 본문은 여기에 Diffusion Policy를 더한다. 14라는 숫자는 Open X-Embodiment나 GR00T N1.5 같은 부수 언급까지 세야 채워진다.

아래 표는 발표가 한 절 이상을 들여 다룬 12편이다. 저장소 페이지 열이 "없음"인 논문은 이 발표가 저장소 안의 유일한 근거다.

| 논문 | 연도 | 배치된 단계 | arXiv | 저장소 페이지 |
|---|---|---|---|---|
| RT-1 | 2022 | 출발점 | 설명란에 없음 | [[physical-ai/brohan-2022-rt-1-robotics-transformer-for-real-world]] |
| RT-2 | 2023 | 출발점 | 설명란에 없음 | [[physical-ai/brohan-2023-rt-2-vision-language-action-models-transfer-web]] |
| Octo | 2024 | 데이터 스케일링 | 2405.12213 | 없음 |
| OpenVLA | 2024 | 데이터 스케일링 | 2406.09246 | [[physical-ai/kim-2024-openvla-an-open-source-vision-language-action-model]] |
| π₀ | 2024 | 아키텍처 재설계 | 2410.24164 | [[physical-ai/black-2024-pi0-a-vision-language-action-flow-model]] |
| CogACT | 2024 | 아키텍처 재설계 | 2411.19650 | 없음 |
| RoboVLMs | 2024 | 아키텍처 재설계 | 2412.14058 | 없음 |
| Gemini Robotics | 2025 | 대규모 인프라와 추론 | 2503.20020 | 없음 |
| GR00T N1 | 2025 | 대규모 인프라와 추론 | 2503.14734 | [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation]] |
| BitVLA | 2025 | 온디바이스 최적화 | 2506.07530 | 없음 |
| PD-VLA | 2025 | 온디바이스 최적화 | 2503.02310 | 없음 |
| RTC | 2025 | 온디바이스 최적화 | 2506.07339 | 없음 |

이름만 스치고 지나간 자료가 넷 더 있다. 목록에는 들어가지만 별도의 절을 얻지는 못했다.

| 자료 | 등장 맥락 | 저장소 페이지 |
|---|---|---|
| Open X-Embodiment | Octo가 학습에 쓴 데이터셋 | [[physical-ai/open-x-embodiment-2023-robotic-learning-datasets-and-rt-x]] |
| GR00T N1.5 | GR00T N1의 후속 모델 | [[physical-ai/nvidia-2025-gr00t-n1-5-an-improved-open]] |
| Cosmos | GR00T의 world foundation model이 올라가는 플랫폼 | [[physical-ai/nvidia-2025-cosmos-world-foundation-model-platform]] |
| Diffusion Policy | flow matching의 비교 대상 | 없음 |

두 표를 합치면 16건이고 그중 8건은 저장소가 원본 자료를 이미 보유하고 있다. 나머지 8건은 Octo, CogACT, RoboVLMs, Gemini Robotics, BitVLA, PD-VLA, RTC, Diffusion Policy다. 이 8건의 arXiv ID는 frontmatter `papers_reviewed`에 적어 두었으므로 이후 수집 후보 목록으로 쓸 수 있다.

원본이 없는 논문 가운데 일부는 저장소의 서베이 페이지가 대신 다룬다. CogACT와 Gemini Robotics와 BitVLA는 [[physical-ai/xu-2025-an-anatomy-of-vision-language-action-models]]가, BitVLA와 RTC는 [[physical-ai/kawaharazuka-2025-vision-language-action-models-for-robotics]]가 짚는다. 따라서 개별 논문의 수치가 필요하면 두 서베이를 먼저 확인하는 편이 낫다.

## 발표 구성

발표자는 논문을 주제별로 묶는 대신 각 단계가 앞 단계의 한계에서 출발하도록 배열했다. 데이터를 통합해도 미세 동작과 실시간성이 남았고, 그래서 아키텍처를 바꿨고, 그렇게 정교해진 모델은 거대 인프라를 전제로 했고, 실제 로봇은 그 인프라 밖에서 구동되어야 한다는 순서다.

설명란의 챕터 구분은 여섯 개이고, 이 가운데 넷이 기술 단계이며 인트로와 마무리가 앞뒤를 감싼다. 발표 도입부에서는 "줄기는 크게 다섯 가지"라고 말하는데, 기술 단계 넷에 전망 하나를 더해 센 숫자다.

| 챕터 | 시작 | 다루는 문제 | 배치된 논문 | 다음 단계로 넘긴 한계 |
|---|---|---|---|---|
| 인트로 | 00:00 | 로봇 제어에 Transformer가 통하는가 | RT-1, RT-2 | 학습 단위가 로봇 한 대에 묶여 있다 |
| 데이터 스케일링 | 04:18 | 여러 로봇을 하나의 모델로 다루는 법 | Octo, OpenVLA | 미세 동작과 실시간성이 부족하다 |
| 아키텍처의 혁신 | 07:40 | action을 어떻게 모델링할 것인가 | π₀, CogACT, RoboVLMs | 대규모 인프라를 전제로 한다 |
| 대규모 인프라와 추론 | 14:20 | 추론하는 에이전트를 무엇으로 떠받치는가 | Gemini Robotics, GR00T | 데이터센터 밖에서는 구동할 수 없다 |
| 온디바이스 최적화 | 18:51 | 이 모델을 작은 칩에 어떻게 넣는가 | BitVLA, PD-VLA, RTC | 해당 없음 |
| 마무리 | 24:33 | 2025년 이후의 방향 | 해당 없음 | 해당 없음 |

## 단계별 내용

### 출발점

RT-1은 로봇 제어를 토큰 예측 문제로 바꿨다. 카메라 영상, 관절 움직임, 언어 명령을 모두 토큰으로 취급해 Transformer에 입력하는 구성이다. 발표는 데이터 13만 개로 100가지가 넘는 작업을 수행한 결과를 근거로, 데이터가 충분하면 언어 모델 아키텍처가 로봇 제어에도 통한다는 점이 증명됐다고 본다.

RT-2는 그다음 해에 방향을 한 번 더 바꿨다. 인터넷 규모의 지식을 이미 학습한 VLM에 로봇을 연결한 것이다. 발표가 드는 예는 "그림 속 바나나와 같은 색깔의 물건을 집어라"는 지시문(instruction)이다.

과거의 로봇이라면 바나나가 무엇인지와 색깔이 무엇인지를 따로 코딩해 주지 않으면 멈췄겠지만, RT-2는 자신이 가진 world knowledge를 동원해 노란 물건을 집어 올렸다. world knowledge는 물체와 행위와 환경에 대해 모델이 미리 갖고 있는 사전 지식을 말한다.

발표는 이 지점을 패러다임 전환으로 규정한다. 정해진 동작을 수행하는 스킬 기반 제어에서 맥락과 의미를 이해하는 시맨틱 기반 제어로 넘어갔다는 것이다. 이어서 다루는 Octo와 OpenVLA의 범용성, π₀의 유연함, Gemini Robotics와 GR00T의 추론 능력이 모두 이 전환의 계보 위에 있다고 본다.

### 데이터 스케일링

2024년 이전 로봇 학습의 기본 단위는 로봇 한 대였다. 발표가 드는 예는 A 로봇이 컵을 잡는 법을 배워도 B 로봇이 같은 동작을 한다는 보장이 없다는 것이다. 같은 플랫폼이라도 센서 위치나 관절 구조, 카메라 장착 방식이 조금만 달라지면 모델을 거의 처음부터 다시 학습해야 했다.

Octo가 이 전제를 깼다. 학습 데이터는 Open X-Embodiment로, 수십 종의 로봇에서 수백 개의 manipulation 과제를 수행한 기록을 하나로 묶은 데이터셋이다. 팔 달린 로봇, 모바일 매니퓰레이터, 휠 기반 로봇, 소형 교육용 로봇처럼 구조가 서로 다른 로봇의 시각 정보와 관절 trajectory와 action 결과가 함께 들어 있다. trajectory는 observation과 action이 시간순으로 이어진 실행 기록을 말한다.

Octo가 보인 결과는 이질적인 embodiment 데이터를 하나의 generalist policy로 학습해도 동작한다는 것이다. embodiment는 로봇의 물리적 형상과 그에 딸린 제어 API 구성을 뜻한다. 발표는 이를 로봇마다 따로 학습시키는 방식에서 한 모델이 여러 로봇을 제어하는 방식으로 넘어가는 첫 신호로 읽는다.

OpenVLA의 기여는 데이터 규모가 아니라 action tokenization에 있다고 발표는 짚는다. 관절 값이나 end-effector 변위를 정해진 규칙에 따라 이산 토큰으로 바꾸는 방식을 오픈소스 모델에 그대로 이식한 것이다. 문장을 단어 단위 토큰으로 나누듯 로봇의 action도 토큰 단위로 쪼갠 셈이고, 이 방식이 퍼지면서 이후 VLA들이 공통으로 참고하는 사실상의 표준 기법이 됐다.

OpenVLA의 결과 중 발표가 가장 상징적이라고 꼽는 것은 7B 파라미터 모델이 55B 규모의 RT-2-X를 성능에서 추월한 사례다. 즉 모델을 키우는 것보다 action을 어떻게 표현해 언어 모델과 결합할지가 더 중요했다는 해석이다.

이 세대가 남긴 한계는 두 가지다. 데이터를 아무리 늘려도 실제 제어에 필요한 미세 동작과 실시간성은 부족했고, 연속적인 물리 제어가 필요한 상황에서 토큰 단위 action 생성이 충분히 빠르게 반응하지 못했다.

### 아키텍처 재설계

2025년 논문들은 모델을 키우는 대신 구조를 바꾸는 쪽을 택했다. 발표가 이 단계에 배치한 세 논문은 서로 다른 층위를 건드린다. π₀는 action을 생성하는 방식을, CogACT는 지능의 분업 구조를, RoboVLMs는 설계 선택지 자체를 다룬다.

π₀는 diffusion 대신 flow matching으로 연속 action을 생성한다. 발표가 자료 전체에서 가장 긴 시간을 들여 설명하는 대목이 두 방식의 차이다. 두 방식 모두 노이즈에서 출발해 복잡한 분포로 이동하는 연속 생성 모델이라는 공통점을 갖지만, 사고방식과 구현이 다르다.

| 항목 | diffusion 기반 policy | flow matching |
|---|---|---|
| 전방 과정 가정 | 데이터에 노이즈를 섞어 가우시안 분포로 보낸다 | 데이터와 노이즈가 섞인 중간 상태를 샘플링한다 |
| 학습 대상 | 역방향에서 제거할 노이즈의 양을 예측하는 네트워크 | 목표 분포 쪽으로 흐르는 방향과 속도를 담은 벡터장 |
| 생성 절차 | 순수 노이즈에서 출발해 여러 denoising 스텝을 밟는다 | 학습한 벡터장을 따라 결정론적 ODE 적분을 수행한다 |
| 수학적 성격 | 확률적 SDE와 score 기반 | 결정론적 ODE와 velocity field 기반 |

발표는 초기 diffusion 기반 policy가 이 반복 과정 때문에 느렸다고 지적하고, 이후 DiT 구조와 시각 feature 재활용, 스텝 수 축소, 경량화 같은 기법이 더해지며 실시간에 가까운 속도를 냈다고 덧붙인다. DiT는 diffusion 모델의 denoising 신경망을 Transformer로 구현한 구조다. 다만 여러 스텝에 걸친 확률적 denoising이라는 기본 구조는 그대로 남는다.

π₀는 이 flow matching을 action expert에 적용한다. action expert는 로봇 상태와 action 토큰만 처리하도록 분리한 별도 가중치 묶음이다. 이미지와 지시문은 VLM 백본이 인코딩하고, 그 위에서 다음 몇 스텝의 joint 변화나 end-effector 이동량을 flow matching 기반 policy가 직접 생성한다.

발표가 π₀의 성과로 드는 것은 여러 로봇 플랫폼에서 50Hz 수준의 control frequency와 long-horizon 연속 제어를 동시에 만족시켰다는 점이다. control frequency는 로봇이 1초에 몇 번 새로운 action을 갱신하는지를 뜻하므로, 50Hz는 1초에 50번 새 action을 낸다는 의미다. 토큰 기반 VLA가 언어와 action을 통합 표현하는 데 강점을 보였다면 π₀는 연속 제어의 품질과 안정성을 끌어올린 쪽이라고 발표는 대비시킨다.

발표는 여기서 action chunking을 따로 떼어 설명한다. 기존 제어 루프가 매 timestep마다 action 하나만 예측했다면 action chunking은 앞으로 n스텝 분량을 한꺼번에 예측한다. 그러면 policy 모델을 비교적 낮은 주기로만 실행하고 그 사이에는 이미 생성된 action chunk를 재생하는 방식으로 제어할 수 있어서, 온디바이스 환경의 지연을 줄이는 데 도움이 된다. 이 선택은 diffusion이냐 flow matching이냐와 독립이며, 네 번째 단계의 RTC가 바로 이 action chunking의 실행 시간 문제를 다룬다.

CogACT는 한 층 위의 문제를 다룬다. 고차원 인지 모듈과 저차원 action 모듈을 나눈 구조로, 상위 모듈은 언어 모델을 기반으로 목표와 환경 정보를 보고 어떤 순서로 어떤 subtask를 수행할지 계획한다. subtask는 상위 추론이 텍스트로 내놓는 중간 단계 명령을 가리킨다. 하위 모듈은 그 계획을 받아 각 subtask를 완수하는 연속 제어 신호로 바꾼다.

이 구조의 핵심은 언어 이해와 상징 수준의 계획과 저수준 제어를 하나의 거대한 네트워크에 몰아넣지 않고 역할에 따라 나눴다는 데 있다. 발표는 그 덕분에 long-horizon manipulation에서 안정성과 성공률이 높아졌고, 실험에서 OpenVLA나 RT-2 계열보다 조작 성공률이 상당히 높게 나왔다고 소개한다. 다만 구체 수치는 제시하지 않는다.

RoboVLMs는 앞선 흐름을 한 발짝 떨어져 정리하는 연구다. 설계 요소를 수백 개 조합으로 바꿔가며 비교했고, 발표가 짚는 검토 항목은 세 가지다.

- 어떤 비전 백본이 실제 manipulation에서 강인한가
- 지시문을 어떻게 구성해야 action 정확도가 올라가는가
- action을 연속값 그대로 다룰 것인가 이산 토큰으로 바꿀 것인가

발표는 이 연구의 의미를 연구자들이 경험적으로만 알고 있던 설계 노하우를 정량 기준과 실험 결과로 옮겨 놓은 데서 찾는다. 그래서 개별 모델 제안이라기보다 VLA 설계 가이드라인에 가깝다고 평한다.

### 대규모 인프라와 추론

로봇이 지시대로 움직이는 자동화 기계를 넘어 스스로 전략을 세우는 에이전트가 되려면 policy 모델 하나로는 부족하다는 것이 이 단계의 전제다. 발표는 이를 떠받칠 거대한 두뇌와 그 두뇌를 학습시킬 공장이 함께 필요하다고 표현한다. 2025년 현재 그 생태계를 주도하는 두 주체로 구글 딥마인드와 NVIDIA를 든다.

| 항목 | 구글 딥마인드 | NVIDIA |
|---|---|---|
| 출발점 | 멀티모달 LLM과 TPU 인프라 | 시뮬레이션과 물리 법칙 |
| 대표 모델 | Gemini Robotics | GR00T N1과 N1.5 |
| 학습 환경 | 인터넷 비디오, 시뮬레이션 데이터, 전 세계 실험실의 실제 로봇 데이터가 들어가는 TPU 클러스터 | Isaac Sim 가상 세계에서 물리 시간을 가속 |
| 강조하는 능력 | 상징적 추론 | 물리적 미래 예측 |
| 핵심 구성 요소 | 멀티모달 LLM을 로봇 신체에 연결 | Cosmos 플랫폼의 world foundation model |

구글이 만든 것은 모델 하나가 아니라 로봇 학습 공장이라고 발표는 설명한다. 그 위에서 나온 Gemini Robotics의 핵심은 상징적 추론 능력이다. 기존 로봇이 "사과를 집어라"는 지시를 이미지 매칭으로만 처리했다면 Gemini는 그 지시의 이유까지 다룬다는 것이다. 사과가 물렁해서 꽉 쥐면 터질 수 있다거나 사람이 지나가는 중이니 잠시 멈춰야 한다는 판단이 발표가 드는 예다.

NVIDIA는 반대편에서 접근한다. GR00T N1과 N1.5는 Isaac Sim이라는 가상 세계에서 학습을 시작하며, 발표는 이 공간에서 물리 시간을 수천 배로 가속한다고 소개한다. 그 위에 Cosmos 플랫폼의 world foundation model이 올라간다.

발표가 WFM에 부여하는 역할은 영상을 많이 보는 것과 구별된다. 로봇이 어떤 action을 하기 전에 그 결과를 미리 예측하는 장치라는 것이다. 컵을 밀면 바닥으로 떨어져 깨진다는 미래를 실제로 해보지 않고 비디오를 생성하듯 예측한다는 설명이다. 언어 모델이 다음 단어를 예측한다면 WFM은 물리 세계의 다음 장면을 예측한다고 대비시킨다.

두 회사의 기술적 뿌리는 다르지만 목표는 같다고 발표는 본다. 고차원 사고를 담당하는 System 2와 반사적 제어를 담당하는 System 1의 통합이다. 따라서 VLA 연구의 질문도 어떤 모델 구조를 쓸지에서 누가 더 효율적인 데이터 파이프라인과 world model과 인프라를 갖추는지로 옮겨간다고 진단한다. 다만 GR00T 설명은 저장소가 보유한 원논문과 강조점이 다르므로 아래 발표 노트를 함께 볼 필요가 있다.

### 온디바이스 최적화

실제 로봇은 대부분 데이터센터의 TPU나 대형 GPU 클러스터 위에서 구동되지 않는다. Jetson이나 소형 x86 박스, 그보다 제약이 심한 임베디드 보드 위에서 실행되어야 하고 통신이 끊겨도 스스로 판단해야 한다. 발표는 이 지점부터 다른 종류의 문제가 시작된다고 보고, 거대한 모델을 작은 칩에 넣는 방법을 세 가지로 나눠 제시한다.

| 연구 | 줄이는 대상 | 방식 |
|---|---|---|
| BitVLA | 파라미터의 비트 수 | 언어와 action 백본을 삼진값으로, 비전 인코더는 distillation으로 약 1.58비트까지 압축 |
| PD-VLA | action chunk 하나를 생성하는 시간 | 오토리그레시브 디코딩을 병렬 고정점 반복으로 근사 |
| RTC | action chunk 사이의 이음매 | 실행 중인 앞부분을 freeze하고 뒷부분을 인페인팅하듯 재생성 |

BitVLA는 VLA 전체 파라미터를 1비트에 해당하는 삼진값, 즉 -1과 0과 1 세 값만 쓰도록 설계한다. 언어와 action 백본이 이 ternary 파라미터로 구성되고, 비전 인코더는 완전한 1비트 대신 distillation 기반 학습으로 약 1.58비트 수준까지 압축한다. distillation은 큰 모델의 출력을 작은 모델이 흉내 내게 학습시키는 압축 기법이므로, 풀 프리시전 비전 인코더를 교사로 삼아 표현력을 유지하면서 메모리와 연산을 줄이는 구조다.

발표가 흥미롭다고 짚는 지점은 이렇게 줄여도 성능이 크게 하락하지 않는다는 데 있다. 대규모 로봇 pre-training을 하지 못한 한계가 있는데도, 로봇 벤치마크 LIBERO에서 OpenVLA-OFT의 4비트 양자화 버전과 비슷한 성능을 내면서 메모리 사용량은 약 30% 수준에 그쳤다. 즉 VLA도 LLM처럼 저비트 양자화로 로봇 내부에서 직접 실행할 수준까지 줄일 수 있다는 것이 BitVLA의 메시지다.

PD-VLA는 모델 크기가 아니라 디코딩 시간을 문제 삼는다. 기존 VLA는 언어 모델처럼 오토리그레시브 방식으로 action을 하나씩 생성하고 그 결과를 다시 입력으로 넣기 때문에, 긴 action chunk를 만들려 하면 순차 지연이 쌓인다. PD-VLA는 이 오토리그레시브 디코딩을 비선형 고정점 방정식을 푸는 문제로 재해석하고, 그 방정식을 병렬 고정점 반복으로 근사해 여러 timestep의 action을 동시에 갱신한다.

그 결과 모델 구조를 바꾸지 않고도 기존과 거의 같은 성능을 유지한 채 디코딩 속도만 올릴 수 있다고 발표는 소개한다. 특히 action chunking과 맞물릴 때 효과가 크다. action chunk를 생성할 때마다 디코더가 길게 실행되던 지연을 chunk 전체를 병렬로 갱신해 줄이기 때문이다.

RTC가 남은 문제를 맡는다. 디코딩이 빨라져도 고주파 제어 루프에서 큰 action chunk를 쓰면 chunk 경계마다 잠시 멈칫하거나 앞뒤 chunk가 매끄럽게 이어지지 않아 튀는 동작이 생긴다. RTC는 새 모델을 학습하는 방법이 아니라 이미 학습된 diffusion 기반이나 flow 기반 policy 위에 결합하는 실행 시간 알고리즘이다.

동작 방식은 단순하다. 현재 실행 중인 action chunk의 앞부분은 그대로 freeze하고, 아직 실행되지 않은 뒷부분만 영상의 나머지를 이어 그리듯 인페인팅해 다시 생성한 뒤 이어 붙인다. 그래서 policy가 백그라운드에서 다음 chunk를 미리 계산하는 동안에도 로봇 동작은 끊기지 않는다.

발표가 소개하는 실험 환경은 두 가지다. 매우 역동적인 과제를 다루는 Kinetix 시뮬레이터와, 성냥에 불을 붙이는 것처럼 정밀한 조작이 필요한 양팔 로봇의 실제 작업이다. 두 환경 모두에서 지연이 커도 chunk 경계의 이상 동작이 크게 줄고 작업 throughput이 올랐다는 결과를 든다. 다만 감소폭과 향상폭의 수치는 제시하지 않는다.

세 연구가 다루는 층위는 서로 다르다. BitVLA는 모델을 좁은 메모리와 연산 자원 안에 넣고, PD-VLA는 주어진 모델로 action chunk를 얼마나 빨리 만들지를 개선하며, RTC는 그 chunk들을 시간축 위에서 얼마나 매끄럽게 이어 실행할지를 푼다.

## 결과

발표가 근거로 든 수치는 많지 않다. 서베이형 발표라 논문의 표나 그래프를 읽는 대신 대표 수치만 구두로 언급하기 때문이다.

| 논문 | 발표가 인용한 수치 | 수치 제시 여부 |
|---|---|---|
| RT-1 | 데이터 13만 개, 작업 100가지 이상 | 있음 |
| OpenVLA | 7B 파라미터 모델이 55B RT-2-X를 성능에서 추월 | 있음 |
| π₀ | control frequency 50Hz 수준의 고주파 제어 | 있음 |
| BitVLA | 언어와 action 백본은 삼진값, 비전 인코더는 약 1.58비트 | 있음 |
| BitVLA | LIBERO에서 OpenVLA-OFT의 4비트 양자화 버전과 비슷한 성능, 메모리는 약 30% 수준 | 있음 |
| CogACT | OpenVLA와 RT-2 계열보다 조작 성공률이 상당히 높음 | 없음 |
| RTC | Kinetix 시뮬레이터와 양팔 로봇 실제 작업에서 chunk 경계 이상 동작 감소, throughput 향상 | 없음 |

수치가 붙은 항목은 다섯 개뿐이고 나머지는 정성 서술이다. 따라서 이 표는 발표의 주장 강도를 가늠하는 용도로 읽어야 하며 논문 사이의 성능 비교에는 쓸 수 없다. 비교가 필요하면 저장소가 보유한 개별 논문 페이지나 서베이 페이지를 확인해야 한다.

발표는 마지막 챕터에서 2025년 이후를 지탱할 요소 두 가지를 꼽는다. 첫째는 예측하는 지능이다. 로봇이 눈앞의 장면을 인식하는 데서 나아가 물리적 미래를 예측하고, 컵을 밀면 떨어진다는 사실을 경험하지 않고도 내장된 WFM으로 시뮬레이션해 action을 정한다는 것이다.

둘째는 사고와 행동의 동기화다. 과거에는 생각하는 System 2가 느리고 움직이는 System 1이 빨라 그 사이 간극이 컸는데, CogACT 같은 아키텍처와 PD-VLA와 RTC 같은 최적화가 그 간극을 좁히고 있다고 진단한다. 즉 온디바이스 환경에서도 로봇이 사람의 의도를 실시간으로 파악하고 지체 없이 제어로 옮길 수 있게 됐다는 주장이다.

## 한계

- 논문별 벤치마크 표를 읽지 않고 서사를 우선하는 자료다. 따라서 수치 근거가 필요한 비교에는 쓸 수 없다. CogACT의 성공률이 상당히 높다는 서술이나 RTC가 throughput을 올렸다는 서술은 원논문을 봐야 확인된다.
- 제목의 "14편"이 확정 목록이 아니다. 설명란 arXiv 링크 10개, 전사에서 이름이 불린 논문 12편, 부수 언급 4건이 서로 어긋난다.
- 저장소 기준으로 12편 중 5편, 부수 언급을 포함한 16건 중 8건만 원본 자료가 있다. 나머지는 이 발표가 유일한 근거이므로 인용할 때 출처를 이 페이지로 밝혀야 한다.
- Gemini Robotics를 다룬 절이 짧고 구체 기법이 없다. 상징적 추론이 가능해졌다는 서술과 예시 두 개가 전부다.
- GR00T 설명이 원논문의 강조점과 다르다. 아래 발표 노트에 대조를 적어 둔다.
- Diffusion Policy는 설명란 목록에 들어 있지만 본문에서는 flow matching의 비교 대상으로만 언급된다. 별도 해설이 없다.

## 발표 노트

이 페이지의 근거는 논문이 아니라 발표 녹화다. 따라서 자료를 읽을 때 참고할 사항을 따로 적어 둔다.

- 자막은 업로더가 직접 올린 한국어 수동 자막이라 자동 자막과 달리 고유명사 오인식이 거의 없다. 다만 첫 문장이 "첫번쨰"처럼 오타로 남은 곳이 있고, 챕터 경계에서 문장이 잘려 다음 챕터 첫 문장으로 넘어간 대목이 두 군데 있다.
- 도입부의 번호 목록과 설명란 챕터 마크가 어긋난다. 도입부 목록은 3번 항목에서 Gemini Robotics만 들고 GR00T를 빼며, 4번 항목에서 BitVLA와 PD-VLA만 들고 RTC를 뺀다. 실제 본문은 GR00T와 RTC를 모두 다룬다.
- 발표자가 원문 요약에 자신의 해석을 덧붙인 곳이 있다. action chunking을 생성 모델 논의에서 떼어 별도 제어 전략으로 규정한 대목과, 구글과 NVIDIA의 목표를 System 1과 System 2의 통합으로 묶은 대목이다.
- GR00T 설명은 저장소가 보유한 원논문과 강조점이 다르다. [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation]]이 기여로 드는 것은 웹 데이터와 human video부터 실제 로봇 데이터까지 쌓은 data pyramid, 그리고 VQ-VAE latent action과 IDM pseudo-action으로 라벨 없는 계층을 같은 손실에 넣은 설계다. 발표의 "수십억 년 분량의 경험" 같은 표현은 원논문에 근거가 없으므로 수사로 읽는 편이 안전하다.
- 발표는 논문의 절 구성을 따라가지 않고 발표자가 세운 네 단계 배열을 따른다. 그래서 각 논문의 원 구성과 대응시키려면 저장소의 개별 논문 페이지를 함께 봐야 한다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| generalist policy | 로봇 한 대나 과제 하나에 묶이지 않고 하나의 모델로 여러 로봇과 여러 과제를 다루는 policy |
| action tokenization | 연속값인 관절 값이나 end-effector 변위를 정해진 규칙에 따라 이산 토큰으로 바꾸는 기법 |
| action chunking | 매 timestep마다 action 하나가 아니라 앞으로 n스텝 분량을 한 번에 예측하는 제어 전략. 생성 모델 종류와 무관하다 |
| flow matching | 확률 분포를 옮기는 연속 벡터장을 학습하고 결정론적 ODE 적분으로 샘플을 만드는 생성 기법. diffusion의 확률적 다단계 denoising과 대비된다 |
| world foundation model | 여러 하위 환경으로 fine-tuning될 것을 전제로 학습한 범용 world model. NVIDIA Cosmos 플랫폼의 구성 요소이며 약어는 WFM |
| ternary quantization | 파라미터를 -1과 0과 1 세 값으로 제한하는 극단적 양자화. BitVLA가 언어와 action 백본에 적용한다 |
| parallel fixed-point iteration | 오토리그레시브 디코딩을 고정점 방정식으로 보고 여러 스텝을 동시에 갱신하는 근사. PD-VLA의 핵심 |

## 관련 페이지

- [[physical-ai/engiuniverse-2025-rt1-rt2-robotics-transformer-review]]: 같은 채널이 RT-1과 RT-2만 따로 깊이 다룬 발표. 이 페이지의 출발점 절을 확장한 내용이다.
- [[physical-ai/brohan-2022-rt-1-robotics-transformer-for-real-world]]: 발표가 출발점으로 잡은 논문. 13만 시연 데이터와 100가지 이상 작업이라는 수치의 원 출처다.
- [[physical-ai/brohan-2023-rt-2-vision-language-action-models-transfer-web]]: 바나나 색깔 예시가 이 논문의 semantic 일반화 실험에 해당한다.
- [[physical-ai/kim-2024-openvla-an-open-source-vision-language-action-model]]: 7B 대 55B 비교와 action tokenization의 원 출처.
- [[physical-ai/black-2024-pi0-a-vision-language-action-flow-model]]: flow matching과 action expert 구조의 원논문. 발표가 가장 길게 설명한 대목의 근거다.
- [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation]]: GR00T N1 원논문. 발표의 시뮬레이션 서사와 강조점이 다르므로 대조해서 읽는다.
- [[physical-ai/nvidia-2025-cosmos-world-foundation-model-platform]]: 발표가 물리적 상상력의 엔진이라 부른 WFM의 원 플랫폼 문서.
- [[physical-ai/xu-2025-an-anatomy-of-vision-language-action-models]]: CogACT와 Gemini Robotics와 BitVLA를 함께 다루는 서베이. 저장소에 원논문이 없는 세 논문의 대체 근거다.
- [[physical-ai/kawaharazuka-2025-vision-language-action-models-for-robotics]]: BitVLA와 RTC를 실제 적용 관점에서 정리한 서베이.
- [[physical-ai/learnopencv-2025-vision-language-action-models-vla]]: 같은 계보를 영어 튜토리얼로 훑은 글. 실행 코드와 VLA 유형 분류를 더하는 대신 온디바이스 최적화 단계가 없다.
- [[physical-ai/li-2025-a-comprehensive-survey-on-world]]: world model 서베이. 발표가 WFM을 물리적 상상력으로 설명한 대목의 학술 좌표계.
- [[overviews/physical-ai-overview]]: physical-ai 카테고리의 분류 뼈대와 학습 경로 허브.
