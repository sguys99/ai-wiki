---
title: "Physical AI 핵심 논문 14편 리뷰 | 2025년까지의 기술 흐름 총정리"
type: video
year: 2025
category: physical-ai
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
tags: [physical-ai, vla, world-model, robot-learning, edge-inference, video]
---

## 한 줄 요약 (One-line Summary)

RT-1에서 RTC까지, 데이터 스케일링·아키텍처·인프라와 추론·온디바이스 최적화 네 단계로 VLA 계보를 정리한 27분짜리 한국어 연말 총결산 영상.

## 1. 자료 정보 (Document Information)

- 채널: 엥지유니버스 | 로봇 엔지니어 (`@engiuniverse`)
- 업로드: 2025-12-13, 길이 26분 48초
- 자막: 업로더가 직접 올린 한국어 수동 자막. auto-caption이 아니어서 문장 구두점과 전문용어 표기가 정확하다
- 형식: 여러 편을 하나의 흐름으로 배열한 서베이형 영상. 논문 한 편을 깊이 다루는 리뷰는 아니다. 업로더가 설명란에 챕터 5개와 arXiv 링크 10개를 함께 적어뒀다

제목은 "14편"이지만 설명란 arXiv 링크는 10개다. 전사에서 실제로 이름이 불리는 논문은 RT-1·RT-2·Octo·OpenVLA·π₀·CogACT·RoboVLMs·Gemini Robotics·GR00T N1(및 N1.5)·BitVLA·PD-VLA·RTC 12편이고 설명란 본문은 여기에 Diffusion Policy를 더한다. 14라는 숫자는 N1.5와 Open X-Embodiment 같은 부수 언급을 세야 채워지므로 엄밀한 목록으로 보기는 어렵다.

## 2. 주요 기여 (Key Contributions)

개별 논문에 새 정보를 더하지는 않는다. 값은 배열에서 나온다. 2022년 말 RT-1을 기점으로 잡은 뒤, 이후 3년의 VLA 연구를 네 개의 문제로 나누고 각 문제에 대응하는 논문을 배치한다.

1. 데이터 스케일링과 범용 정책 (Octo, OpenVLA)
2. 아키텍처의 혁신 (π₀, CogACT, RoboVLMs)
3. 대규모 인프라와 embodied reasoning (Gemini Robotics, NVIDIA GR00T)
4. 온디바이스 실행을 위한 효율화 (BitVLA, PD-VLA, RTC)

이 배열에서, 각 단계는 앞 단계의 한계에서 출발한다. Octo·OpenVLA가 데이터를 통합해도 미세 동작과 실시간성은 남았고 그래서 π₀·CogACT가 모델 크기 대신 구조를 건드렸다. 그렇게 정교해진 모델의 전제는 TPU·GPU 클러스터. 실제 로봇은 Jetson이나 임베디드 보드 위에서 돌아야 하니 마지막 단계가 압축과 지연 문제를 맡는다.

Action Chunking을 생성 모델 논의와 분리해 설명한 대목이 특히 유용하다. chunking은 diffusion이냐 flow matching이냐와 독립인 제어 전략이라고 영상은 분명히 한다. 한 번에 몇 스텝을 예측할 것인가의 문제라서 Diffusion Policy도, flow matching 정책도 똑같이 쓸 수 있다고 덧붙인다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 출발점

카메라 영상도 관절 움직임도 언어 명령도 전부 토큰으로 취급해 Transformer에 넣는다. 이것이 RT-1의 발상이었다. 13만 개 데이터로 100가지가 넘는 작업을 수행하며 언어 모델 아키텍처가 로봇 제어에도 통한다는 것을 보였다. 그전까지 로봇 제어는 정교한 수식과 제어 이론의 영역이었고 보스턴 다이나믹스 사명에 "다이나믹스"가 붙은 것을, 영상은 그 시대의 표식으로 든다.

RT-2는 인터넷 지식을 이미 학습한 VLM에 로봇을 연결했다. "그림 속 바나나와 같은 색깔의 물건을 집어라"는 명령에 world knowledge를 동원해 노란 물건을 집어 올렸다. 이 지점부터 로봇이 스킬 대신 시맨틱을 다루기 시작했다고 영상은 본다.

### 데이터 스케일링

팔 달린 로봇, 모바일 매니퓰레이터, 휠 기반 로봇, 소형 교육용 로봇. 구조가 다른 이 로봇들의 시각 정보·관절 궤적·행동 결과를 하나로 묶은 데이터셋이 Open X-Embodiment이고 Octo는 여기서 학습했다. 이질적인 embodied 데이터를 단일 generalist policy로 학습해도 동작함을 보인 셈이다.

데이터 규모가 아니라 action tokenization이 OpenVLA의 핵심이다. OpenVLA는 이 기법을 오픈소스 모델에 완전히 이식했다. 로봇의 관절 값이나 엔드이펙터 변위를 정해진 규칙에 따라 이산 행동 토큰으로 바꾸면 연속값이라 LLM과 붙이기 어렵던 문제가 풀린다. VLM이 텍스트·이미지에 더해 행동까지 하나의 표현 공간에서 다룰 수 있게 되면서 이후 VLA들의 사실상 표준 기법이 됐다.

### 아키텍처 재설계

π₀는 diffusion 대신 flow matching으로 연속 행동을 생성한다. 두 방식의 차이는, 영상이 꽤 긴 시간을 들여 설명한다. diffusion은 데이터에 노이즈를 섞어 가우시안으로 보내는 전방 과정을 가정하고 역방향에서 노이즈 제거량을 예측하는 네트워크를 학습한 뒤 순수 노이즈에서 출발해 여러 denoising 스텝을 밟는다. flow matching은 분포를 한 시점에서 다른 시점으로 옮길 연속 벡터장을 직접 학습한다. 학습이 끝나면 결정론적 ODE 적분으로 행동을 생성한다. 확률적 SDE·score 기반과 결정론적 ODE·velocity-field 기반의 대비.

π₀에서 이 flow matching은 Action Expert에 들어간다. 이미지와 텍스트는 VLM 백본이 인코딩하고 그 위에서 다음 몇 스텝의 joint 변화나 엔드이펙터 이동량을 flow matching 정책이 직접 생성한다. 여러 로봇 플랫폼에서 50Hz급 고주파 제어와 롱 호라이즌 연속 제어를 함께 만족시킨다.

CogACT가 다루는 문제는 한 층 위에 있다. 고차원 인지 모듈과 저차원 행동 모듈을 나눈 뒤 상위는 언어모델 기반으로 "문을 열고, 들어가서, 테이블 위 컵을 집은 뒤, 지정 위치에 놓아라" 같은 서브태스크 순서를 계획하고 하위는 그 계획을 관절 제어 신호로 바꾼다. 언어 이해와 상징 수준의 계획, 저수준 제어를 하나의 네트워크에 몰아넣지 않았다. long-horizon manipulation에서 안정성이 높은 이유다.

RoboVLMs는 설계 요소를 수백 개 조합으로 바꿔가며 비교한 연구다. 어떤 비전 백본이 조작에서 강인한지, 언어 입력을 어떻게 구성해야 행동 정확도가 오르는지를 정량 기준으로 따졌다. 행동을 연속값으로 둘지 이산 토큰으로 바꿀지도 같은 기준으로 정리했는데 이를 두고 영상은 VLA 설계 가이드라인에 가깝다고 평한다.

### 인프라와 추론

구글은 멀티모달 LLM과 TPU 인프라를 로봇에 그대로 이식한다. 인터넷 비디오, 시뮬레이션, 전 세계 실험실의 실제 로봇 움직임 데이터가 TPU 클러스터로 들어가는 "로봇 학습 공장"을 지었다. 그 위에서 나온 Gemini Robotics의 핵심은 상징 수준의 추론. "이 사과는 물렁해서 꽉 쥐면 터진다", "지금 사람이 지나가니 잠시 멈춘다" 같은 판단이 가능해진 것을 예로 든다.

NVIDIA는 시뮬레이션과 물리 법칙에서 출발한다. GR00T N1과 N1.5는 Isaac Sim 가상 세계에서 물리 시간을 가속해 학습했다. 그 위에 올라가는 Cosmos 플랫폼의 World Foundation Model을 영상은 "물리적 상상력의 엔진"이라 부른다. 컵을 밀면 떨어져 깨진다는 미래를 실제로 해보지 않고 비디오 생성하듯 예측한다. LLM이 다음 단어를 예측한다면 WFM은 물리 세계의 다음 장면을 예측한다.

뿌리는 달라도 두 회사가 향하는 곳은 같다고 영상은 정리한다. 고차원 사고인 System-2와 반사적 제어인 System-1의 통합이다.

### 온디바이스 실행

파라미터가 가질 수 있는 값은 −1·0·1 셋뿐이다. BitVLA는 VLA 전체를 이 삼진값으로 설계해 언어·행동 백본을 ternary 파라미터로 구성한다. 비전 인코더는 완전한 1비트 대신 distillation 기반 학습으로 약 1.58비트까지 압축한다. 풀 프리시전 비전 인코더를 교사로 삼아 표현력을 유지하는 구조.

기존 VLA는 언어 모델처럼 오토리그레시브로 행동 시퀀스를 만들어서 긴 action chunk를 생성하려 하면 순차 지연이 쌓인다. PD-VLA는 모델 크기 대신 이 디코딩 시간을 줄인다. 오토리그레시브 디코딩을 비선형 고정점 방정식을 푸는 문제로 재해석한 뒤 이를 병렬 고정점 반복으로 근사해 여러 타임스텝의 행동을 동시에 업데이트한다. 모델 구조를 바꾸지 않고도 디코딩 속도만 끌어올리는 방식이다.

재학습은 필요 없다. RTC는 이미 학습된 diffusion·flow 기반 정책 위에 그대로 얹는 runtime 알고리즘이다. 실행 중인 chunk의 앞부분은 freeze하고 아직 실행되지 않은 뒷부분은 인페인팅하듯 다시 생성해 이어붙인다. 백그라운드에서 다음 chunk를 미리 계산하면서도 로봇 동작이 끊기지 않는다.

세 연구가 다루는 층위는 다르다. BitVLA는 모델을 좁은 메모리와 연산에 집어넣는다. PD-VLA는 chunk를 얼마나 빨리 뽑을지를 개선하고 RTC는 그 chunk를 시간축 위에서 얼마나 매끄럽게 이어붙일지를 푼다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

영상에 등장한 수치는 다음이 전부다. 서베이형 영상이라 표나 그래프를 읽는 대신 대표 수치만 구두로 언급한다.

| 논문 | 수치 |
|---|---|
| RT-1 | 데이터 13만 개, 작업 100가지 이상 |
| OpenVLA | 7B 모델로 55B RT-2-X 성능 추월 |
| π₀ | 고주파 제어 예시로 50Hz 언급 |
| BitVLA | LIBERO에서 OpenVLA-OFT 4비트 양자화 버전과 비슷한 성능, 메모리는 약 30% 수준 |
| CogACT | OpenVLA·RT-2 계열보다 조작 성공률이 상당히 높다 (구체 수치 없음) |
| RTC | Kinetix 시뮬레이터와 성냥에 불 붙이는 양팔 로봇 실작업에서 chunk 경계 이상 동작 감소, throughput 향상 (구체 수치 없음) |

## 5. 한계와 향후 과제 (Limitations and Future Work)

자료 자체의 한계부터 적는다. 논문별 벤치마크 표를 읽지 않고 서사를 우선하기 때문에 수치 근거가 필요한 비교에는 쓸 수 없다. CogACT가 "상당히 높은 성공률"이라거나 RTC가 "throughput을 끌어올렸다"는 서술은 원논문을 봐야 확인된다.

GR00T 설명은 우리가 이미 보유한 원논문(`physical-ai/nvidia-2025-gr00t-n1-an-open-foundation`)과 강조점이 다르다. 영상 쪽 요약은 Isaac Sim 가상 세계에서 학습을 시작해 물리 시간을 수천 배 가속했다는 시뮬레이션 서사. 원논문이 실제로 기여한 대목은 따로 있다. 웹·human video부터 실로봇까지 데이터를 층으로 쌓아 data pyramid를 만들고 라벨 없는 계층은 VQ-VAE latent action과 IDM pseudo-action으로 같은 손실에 넣었다. "수십억 년 분량의 경험" 같은 표현은 원논문에 근거가 없는 수사로 읽는 편이 안전하다.

영상은 향후 과제로 두 축을 꼽는다. 하나는 예측하는 지능이다. 로봇이 장면을 인식하는 단계를 지나 물리적 미래를 WFM으로 시뮬레이션하고 행동을 정하는 방향을 말한다. 사고와 행동의 동기화도 영상은 과제로 놓는다. 느린 System-2와 빠른 System-1 사이에는 아직 간극이 있고 CogACT 같은 아키텍처와 PD-VLA·RTC 같은 최적화가 그 간극을 좁히는 중이라고 진단한다.

## 6. 관련 연구 (Related Work)

이 wiki에 이미 있는 자료와의 관계:

- `physical-ai/brohan-2022-rt-1-robotics-transformer-for-real-world` — 영상이 출발점으로 잡은 논문. 13만 시연·100+ 작업 수치가 wiki 페이지와 일치한다
- `physical-ai/brohan-2023-rt-2-vision-language-action-models-transfer-web` — 영상의 "바나나 색깔" 예시가 RT-2 논문의 semantic 일반화 실험에 해당한다
- `physical-ai/nvidia-2025-gr00t-n1-an-open-foundation` — 영상이 4장에서 다루는 GR00T N1의 원논문. dual-system(VLM 10Hz + flow-matching DiT 120Hz) 구조가 영상의 System-1/System-2 프레임과 대응한다
- `physical-ai/li-2025-a-comprehensive-survey-on-world` — world model 서베이. 영상이 WFM을 "물리적 상상력"으로 설명한 대목의 학술 좌표계
- `physical-ai/hou-2026-world-model-for-robot-learning` — 정책 결합 방식 5분류를 제시한 서베이. 영상의 π₀·CogACT 구분보다 세분화된 분류
- `physical-ai/luo-2025-sonic-supersizing-motion-tracking`, `physical-ai/nvlabs-gr00t-wholebodycontrol` — GR00T 계열 후속. 영상은 manipulation 축을 다루고 이쪽은 whole-body control 축이다

영상에서 다뤄졌지만 wiki에 원본이 없는 논문: Octo, OpenVLA, π₀, CogACT, RoboVLMs, Gemini Robotics, BitVLA, PD-VLA, RTC. arXiv ID는 frontmatter `papers_reviewed`에 적어뒀다.

## 7. 용어집 (Glossary)

- **VLA (Vision-Language-Action)**: 시각·언어 입력을 받아 로봇 행동을 출력하는 모델 범주. RT-2가 세운 틀
- **Action Tokenization**: 연속값인 관절 값이나 엔드이펙터 변위를 이산 토큰으로 변환해 LLM이 다루게 하는 기법
- **Action Chunking**: 매 타임스텝 하나가 아니라 앞으로 n스텝 분량을 한 번에 예측하는 제어 전략. 생성 모델 종류와 무관
- **Flow Matching**: 확률 분포를 옮길 연속 벡터장을 학습하고 결정론적 ODE 적분으로 샘플을 만드는 생성 방식. diffusion의 확률적 다단계 denoising과 대비된다
- **Generalist Policy**: 여러 로봇 embodiment의 데이터를 한 모델로 학습해 여러 로봇을 제어하는 정책
- **WFM (World Foundation Model)**: 행동의 물리적 결과를 미리 예측하는 모델. NVIDIA Cosmos 플랫폼의 구성요소
- **System-1 / System-2**: 반사적 저수준 제어와 고차원 사고를 가리키는 이분법. 영상은 두 빅테크의 공통 목표를 이 통합으로 요약한다
- **Ternary quantization**: 파라미터를 −1·0·1 세 값으로 제한하는 극단적 양자화. BitVLA가 언어·행동 백본에 적용
- **Parallel fixed-point iteration**: 오토리그레시브 디코딩을 고정점 방정식으로 보고 여러 스텝을 동시에 갱신하는 근사. PD-VLA의 핵심
- **Inpainting (RTC 맥락)**: 실행되지 않은 chunk 뒷부분을 이미 고정된 앞부분에 이어 다시 생성하는 방식
