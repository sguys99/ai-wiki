---
title: "Physical AI 핵심 논문 14편 리뷰 | 2025년까지의 기술 흐름 총정리"
type: video
year: 2025
category: physical-ai
source: engiuniverse-2025-14-key-physical-ai-papers.md
raw_path: /Users/kmyu/Desktop/project/ai-wiki/raw/videos/engiuniverse-2025-14-key-physical-ai-papers.md
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
  - "Octo: An Open-Source Generalist Robot Policy (2024) — arXiv:2405.12213"
  - "OpenVLA: An Open-Source Vision-Language-Action Model (2024) — arXiv:2406.09246"
  - "π0 (Pi0): A Vision-Language-Action Flow Model for General Robot Control (2024) — arXiv:2410.24164"
  - "CogACT (2024) — arXiv:2411.19650"
  - "RoboVLMs (2024) — arXiv:2412.14058"
  - "Gemini Robotics (2025) — arXiv:2503.20020"
  - "NVIDIA GR00T N1 (2025) — arXiv:2503.14734"
  - "BitVLA (2025) — arXiv:2506.07530"
  - "PD-VLA: Parallel Decoding VLA (2025) — arXiv:2503.02310"
  - "RTC: Real-Time Chunking (2025) — arXiv:2506.07339"
tags: [physical-ai, vla, world-model, edge-inference]
---

## 요약 (Summary)

한국어 로봇 엔지니어 채널이 2025년 12월에 올린 27분짜리 연말 총결산 영상이다. RT-1에서 출발해 그 이후 3년의 VLA 연구를 네 개의 문제로 나눈 뒤 각 문제에 대응하는 논문을 배치한다. 데이터 스케일링(Octo·OpenVLA), 아키텍처(π₀·CogACT·RoboVLMs), 인프라와 embodied reasoning(Gemini Robotics·GR00T), 온디바이스 최적화(BitVLA·PD-VLA·RTC) 순이다.

개별 논문에 새 정보를 더하는 자료는 아니고 쓸모는 배열에 있다. 각 단계가 앞 단계의 한계에서 출발한다는 논리로 묶여서 흩어진 논문 목록이 하나의 진행 방향으로 읽힌다. VLA 계보를 처음 보는 사람에게는 지도로 쓸 만하다. 이미 개별 논문을 아는 사람이라면 좌표만 확인하고 넘어가면 된다.

제목은 "14편"이지만 설명란 arXiv 링크는 10개다. 전사에서 실제로 이름이 불리는 논문은 12편이고 설명란 본문이 Diffusion Policy를 추가로 언급한다. 14는 N1.5나 Open X-Embodiment 같은 부수 언급을 세야 채워지는 숫자다.

## 네 단계 배열 (Four-Stage Framing)

| 단계 | 문제 | 논문 | 남긴 한계 |
|---|---|---|---|
| 출발점 | 로봇 제어에 Transformer가 통하는가 | RT-1, RT-2 | 스킬 기반 → 시맨틱 기반 전환은 됐지만 로봇 한 대 단위 |
| 1. 데이터 | 여러 로봇을 한 모델로 | Octo, OpenVLA | 미세 동작·실시간성 부족 |
| 2. 아키텍처 | 행동을 어떻게 모델링할 것인가 | π₀, CogACT, RoboVLMs | 거대 인프라 전제 |
| 3. 인프라 | 추론 가능한 에이전트를 뭘로 떠받치나 | Gemini Robotics, GR00T | 데이터센터 밖에서는 못 돎 |
| 4. 온디바이스 | 이 뇌를 작은 칩에 어떻게 넣나 | BitVLA, PD-VLA, RTC | — |

## 출발점

RT-1은 카메라 영상도, 관절 움직임도, 언어 명령도 전부 토큰으로 취급해 Transformer에 넣었다. 데이터 13만 개로 100가지가 넘는 작업을 수행하며 언어 모델 아키텍처가 로봇 제어에도 통한다는 것을 보였다. 그전까지 로봇 제어는 정교한 수식과 제어 이론의 영역이었고 영상은 보스턴 다이나믹스 사명에 "다이나믹스"가 붙은 것을 그 시대를 보여주는 예로 든다.

RT-2는 인터넷 지식을 이미 학습한 VLM에 로봇을 연결했다. "그림 속 바나나와 같은 색깔의 물건을 집어라"는 명령에 world knowledge를 동원해 노란 물건을 집어 올렸다. 영상은 이 지점을 정해진 동작을 수행하는 스킬 기반에서 맥락과 의미를 이해하는 시맨틱 기반으로 넘어간 전환으로 본다.

## 데이터 스케일링

팔 달린 로봇, 모바일 매니퓰레이터, 휠 기반 로봇, 소형 교육용 로봇까지 구조가 다른 로봇들의 시각 정보와 관절 trajectory, action 결과를 하나로 묶은 데이터셋이 Open X-Embodiment다. Octo는 이 데이터셋으로 학습한 모델이다. 이질적인 embodied 데이터를 단일 generalist policy로 학습해도 동작한다는 것이 Octo가 보인 결과다.

7B 모델이 55B RT-2-X를 추월한 결과가 상징적이다. OpenVLA의 핵심은 데이터 규모가 아니라 action tokenization을 오픈소스 모델에 완전히 이식했다는 데 있다. 로봇의 관절 값이나 엔드이펙터 변위를 정해진 규칙에 따라 이산 action 토큰으로 바꾸면 연속값이라 LLM과 붙이기 어렵던 문제가 풀린다. VLM이 텍스트와 이미지에 더해 action까지 하나의 표현 공간에서 다루면서 이후 VLA들의 사실상 표준 기법이 됐다.

## 아키텍처

π₀는 diffusion 대신 flow matching으로 연속 행동을 생성한다. 영상이 두 방식의 차이를 꽤 길게 설명하는데 자료 전체에서 밀도가 가장 높은 대목이다.

diffusion 기반 policy는 데이터에 노이즈를 섞어 가우시안으로 보내는 전방 과정을 가정하고 역방향에서 노이즈를 얼마나 제거해야 하는지 예측하는 네트워크를 학습한다. 샘플링할 때는, 순수 노이즈에서 출발해 여러 denoising 스텝을 밟는다. flow matching은 관점을 달리 잡아 분포를 한 시점에서 다른 시점으로 옮길 연속 벡터장을 직접 학습하고 학습이 끝나면 결정론적 ODE 적분으로 action을 만든다. 확률적 SDE·score 기반인 diffusion과 결정론적 ODE·velocity-field 기반인 flow matching, 두 방식의 대비다.

π₀는 이 flow matching을 Action Expert에 넣는다. 이미지와 텍스트는 VLM 백본이 인코딩하고 그 위에서 다음 몇 스텝의 joint 변화나 엔드이펙터 이동량을 flow matching policy가 직접 생성한다. 여러 로봇 플랫폼에서 50Hz급 고주파 제어와 롱 호라이즌 연속 제어를 함께 만족시킨다.

여기서 영상이 따로 떼어 설명하는 chunking은, 생성 모델의 개념을 바꾸는 기술이 아니라 한 번에 얼마만큼의 action 구간을 예측할 것인가를 바꾸는 제어 전략이다. 매 타임스텝 하나가 아니라 앞으로 n스텝 분량을 한꺼번에 예측하면 policy 모델을 낮은 주기로만 돌리고 그 사이에는 이미 생성된 chunk를 재생하는 식으로 제어할 수 있다. diffusion이냐 flow matching이냐와 독립이라서 Diffusion Policy도 flow matching policy도 똑같이 쓸 수 있다. 4단계의 RTC가 바로 이 chunking의 실행 시간 문제를 다룬다.

CogACT는 한 층 위의 문제를 다룬다. 고차원 인지 모듈과 저차원 행동 모듈을 나눈 뒤 상위는 언어모델 기반으로 "문을 열고, 들어가서, 테이블 위 컵을 집은 뒤, 지정 위치에 놓아라" 같은 서브태스크 순서를 계획한다. 하위는 그 계획을 관절 제어 신호로 바꾼다. 언어 이해와 상징 수준의 계획, 저수준 제어를 하나의 거대한 네트워크에 몰아넣지 않은 덕에 long-horizon manipulation에서 성공률이 OpenVLA·RT-2 계열보다 상당히 높다.

RoboVLMs는 설계 요소를 수백 개 조합으로 바꿔가며 비교한 연구다. 어떤 비전 백본이 조작에서 강인한지, 언어 입력을 어떻게 구성해야 행동 정확도가 오르는지, 행동을 연속값으로 둘지 이산 토큰으로 바꿀지를 정량 기준으로 정리했다. 연구자들이 경험적으로만 알던 설계 노하우를 실험 결과로 옮겨놓은 셈이라 영상은 이를 VLA 설계 가이드라인에 가깝다고 평한다.

## 인프라와 추론

인터넷 비디오, 시뮬레이션, 전 세계 실험실의 실제 로봇 움직임 데이터가 TPU 클러스터로 들어가는 로봇 학습 공장을 구글이 지었다. 구글은 멀티모달 LLM과 TPU 인프라를 로봇에 그대로 이식하는 쪽이다. 그 공장에서 나온 Gemini Robotics의 핵심은 상징적 추론이다. 사과가 물렁해서 꽉 쥐면 터진다거나 사람이 지나가니 잠시 멈춰야 한다는 식의 판단이 가능해졌다는 것이다.

NVIDIA는 시뮬레이션과 물리 법칙에서 출발한다. GR00T N1과 N1.5는 Isaac Sim 가상 세계에서 물리 시간을 가속해 학습했고 그 위에 Cosmos 플랫폼의 World Foundation Model이 올라간다. 영상은 WFM을 물리적 상상력의 엔진이라 부르며 컵을 밀면 떨어져 깨진다는 미래를 실제로 해보지 않고 비디오 생성하듯 예측한다고 설명한다. LLM이 다음 단어를 예측한다면 WFM은 물리 세계의 다음 장면을 예측한다.

두 회사는 기술의 뿌리가 다르지만 목표는 같다고 정리한다. 고차원 사고인 System-2와 반사적 제어인 System-1의 통합이다.

> **원논문과의 대조**: 우리가 보유한 [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation]]은 강조점이 다르다. GR00T N1의 실질 기여는 웹·human video부터 실로봇까지 쌓은 data pyramid, 그리고 VQ-VAE latent action·IDM pseudo-action으로 라벨 없는 계층을 같은 손실에 넣은 설계다. 영상의 "수십억 년 분량의 경험" 같은 표현은 원논문에 근거가 없으므로 수사로 읽는 편이 안전하다.

## 온디바이스 최적화

실제 로봇은 대부분 데이터센터의 TPU나 GPU 클러스터가 아니라 Jetson이나 소형 x86 박스, 그보다 제약이 심한 임베디드 보드 위에서 돌아야 하고 통신이 끊겨도 스스로 판단해야 한다. 여기서부터 다른 종류의 문제가 시작된다.

BitVLA는 VLA 전체 파라미터를 −1·0·1 삼진값으로 설계한다. 언어·행동 백본이 이 ternary 파라미터로 구성되고 비전 인코더는 완전한 1비트 대신 distillation 기반 학습으로 약 1.58비트까지 압축한다. 풀 프리시전 비전 인코더를 교사로 삼아 표현력을 유지하는 구조다. 대규모 로봇 pre-training을 하지 못한 한계가 있는데도 LIBERO에서 OpenVLA-OFT의 4비트 양자화 버전과 비슷한 성능을 내면서 메모리는 약 30% 수준에 그친다.

PD-VLA는 모델 크기가 아니라 디코딩 시간을 문제 삼는다. 기존 VLA는 언어 모델처럼 오토리그레시브로 action 시퀀스를 만들어 긴 action chunk를 생성하려 하면 순차 지연이 쌓인다. PD-VLA는 오토리그레시브 디코딩을 비선형 고정점 방정식을 푸는 문제로 재해석하고 이를 병렬 고정점 반복으로 근사해 여러 타임스텝의 action을 동시에 업데이트한다. 모델 구조를 바꾸지 않고도 디코딩 속도만 올라간다.

디코딩이 빨라져도 고주파 제어 루프에서 큰 chunk를 쓰면 chunk 경계마다 살짝 멈칫하거나 앞뒤 chunk가 자연스럽게 이어지지 않아 튀는 동작이 생긴다. RTC는 이 문제를 재학습 없이 푼다. 이미 학습된 diffusion·flow 기반 policy 위에 올리는 runtime 알고리즘이다. RTC는 실행 중인 chunk의 앞부분을 freeze하고 아직 실행되지 않은 뒷부분은 인페인팅하듯 다시 생성해 이어붙인다. 백그라운드에서 다음 chunk를 미리 계산하면서도 로봇 동작은 끊기지 않는다. Kinetix 시뮬레이터와 성냥에 불 붙이는 양팔 로봇 실작업에서, 지연이 커도 경계 이상 동작이 크게 줄고 throughput이 올랐다.

세 연구가 다루는 층위는 다르다. BitVLA는 모델을 좁은 메모리·연산에 집어넣고 PD-VLA는 chunk를 얼마나 빨리 뽑을지, RTC는 그 chunk들을 시간축 위에서 얼마나 매끄럽게 이어붙일지를 푼다.

## 영상이 꼽은 두 축 (What Comes Next)

2025년 이후를 지탱할 축의 하나는 예측하는 지능이다. 로봇이 눈앞의 장면을 인식하는 데서 나아가 물리적 미래를 예측하고 컵을 밀면 떨어진다는 사실을 경험하지 않고도 내장된 WFM으로 시뮬레이션해 행동을 정한다.

나머지 하나가 사고와 행동의 동기화다. 과거에는 생각하는 뇌인 System-2가 느리고 움직이는 몸인 System-1이 빨라 그 사이 간극이 컸는데 CogACT 같은 아키텍처와 PD-VLA·RTC 같은 최적화로 그 벽이 무너지고 있다고 진단한다.

## 이 자료의 쓰임과 한계 (Usage Notes)

논문별 벤치마크 표를 읽지 않고 서사를 우선하는 자료다. 수치 근거가 필요한 비교에는 쓸 수 없다. CogACT가 "상당히 높은 성공률"이라거나 RTC가 throughput을 끌어올렸다는 서술은 원논문을 봐야 확인된다. 영상에 나온 수치는 RT-1의 13만 개·100작업, OpenVLA의 7B vs 55B, π₀의 50Hz, BitVLA의 메모리 30%가 전부다.

이 wiki 기준으로 보면 원본을 이미 가진 논문은 RT-1·RT-2·GR00T N1 셋뿐이다. 나머지 9편(Octo, OpenVLA, π₀, CogACT, RoboVLMs, Gemini Robotics, BitVLA, PD-VLA, RTC)은 이 영상이 유일한 근거다. arXiv ID는 frontmatter `papers_reviewed`에 적어뒀으니 ingest 후보 목록으로 쓰면 된다.

## 관련 페이지 (Related Pages)

- [[physical-ai/brohan-2022-rt-1-robotics-transformer-for-real-world]] — 영상이 출발점으로 잡은 논문. 13만 시연·100+ 작업 수치가 이 페이지와 일치한다
- [[physical-ai/brohan-2023-rt-2-vision-language-action-models-transfer-web]] — "바나나 색깔" 예시가 RT-2 논문의 semantic 일반화 실험에 해당한다
- [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation]] — 영상 4장의 GR00T N1 원논문. dual-system(VLM 10Hz + flow-matching DiT 120Hz)이 영상의 System-1/System-2 프레임과 대응한다
- [[physical-ai/li-2025-a-comprehensive-survey-on-world]] — world model 서베이. 영상이 WFM을 물리적 상상력으로 설명한 대목의 학술 좌표계
- [[physical-ai/hou-2026-world-model-for-robot-learning]] — policy 결합 방식 5분류 서베이. 영상의 π₀·CogACT 구분보다 세분화된 분류를 제공한다
- [[physical-ai/luo-2025-sonic-supersizing-motion-tracking]] — GR00T 계열 후속. 영상이 다루는 manipulation 축과 달리 이쪽은 whole-body control 축이다
- [[physical-ai/nvlabs-gr00t-wholebodycontrol]] — SONIC 공식 구현. Jetson Orin 배포 스택이 영상 4단계의 온디바이스 논의와 맞닿는다
- [[physical-ai/learnopencv-2025-vision-language-action-models-vla]] — 같은 계보를 영어 튜토리얼로 훑은 글. 다루는 모델이 상당 부분 겹치지만 두 자료가 채우는 칸이 다르다. 이쪽은 실행 코드와 VLA Type-1~5 분류를 얹고 온디바이스 최적화 축(BitVLA·PD-VLA·RTC)이 없다. 영상은 그 반대다
- [[overviews/physical-ai-overview]] — 이 wiki의 physical-ai 합성 페이지
