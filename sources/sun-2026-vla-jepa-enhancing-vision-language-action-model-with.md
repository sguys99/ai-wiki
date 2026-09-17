---
title: "VLA-JEPA: Enhancing Vision-Language-Action Model with Latent World Model"
type: paper
year: 2026
category: physical-ai
raw_path: raw/papers/sun-2026-vla-jepa-enhancing-vision-language-action-model-with.pdf
raw_filename: "sun-2026-vla-jepa-enhancing-vision-language-action-model-with.pdf"
source_collection: external
authors: "Jingwen Sun, Wenyao Zhang (공동 1저자), Zekun Qi, Shaojie Ren, Zezhi Liu, Hanxin Zhu, Guangzhong Sun, Xin Jin, Zhibo Chen (교신 Xin Jin, Zhibo Chen)"
arxiv_id: "2602.10098"
url: "https://arxiv.org/abs/2602.10098"
tags: [physical-ai, vla, world-model, robot-learning, manipulation, benchmark]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/sun-2026-vla-jepa-enhancing-vision-language-action-model-with/fig01.png
    raw: raw/papers/sun-2026-vla-jepa-enhancing-vision-language-action-model-with-figures/fig01.png
    caption: "VLA-JEPA 모델 구조 개요. 현재 프레임 I_t를 V-JEPA 인코더와 VLA가 각각 받고, VLA가 낸 latent action과 현재 latent E_t를 projector가 받아 다음 latent E_t+1을 예측한다. 미래 프레임 I_t+1은 오른쪽 V-JEPA 인코더를 거쳐 손실 계산의 목표로만 쓰인다"
    page: 2
    bbox_norm: [0.106, 0.073, 0.4947, 0.2572]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/sun-2026-vla-jepa-enhancing-vision-language-action-model-with/fig02.png
    raw: raw/papers/sun-2026-vla-jepa-enhancing-vision-language-action-model-with-figures/fig02.png
    caption: "VLA-JEPA 학습 흐름. 위쪽 I 단계는 사람 영상만으로 latent world model의 alignment 손실을 학습하고, 아래쪽 II 단계는 로봇 데이터에서 alignment 손실과 action head의 prediction 손실을 함께 학습한다. 두 단계 모두 V-JEPA 인코더가 현재와 다음 상태 S_t, S_t+1을 만든다"
    page: 4
    bbox_norm: [0.1137, 0.0729, 0.8863, 0.415]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/sun-2026-vla-jepa-enhancing-vision-language-action-model-with/fig03.png
    raw: raw/papers/sun-2026-vla-jepa-enhancing-vision-language-action-model-with-figures/fig03.png
    caption: "평가 환경 장면. (a) LIBERO, (b) LIBERO-Plus, (c) SimplerEnv Google Robot, (d) SimplerEnv WidowX Robot, (e) 실제 Franka 로봇 탁상 과제. 시뮬레이션 벤치마크 3종과 실제 환경 1종이다"
    page: 6
    bbox_norm: [0.106, 0.0604, 0.894, 0.4362]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/sun-2026-vla-jepa-enhancing-vision-language-action-model-with/fig04.png
    raw: raw/papers/sun-2026-vla-jepa-enhancing-vision-language-action-model-with-figures/fig04.png
    caption: "실제 로봇 성공률 막대 그래프. in-distribution에서 π0 0.57, π0.5 0.37, VLA-JEPA 0.70이고 task OOD에서 0.00, 0.20, 0.17, object layout OOD에서 0.37, 0.27, 0.47이다"
    page: 8
    bbox_norm: [0.5202, 0.5874, 0.9048, 0.7596]
    strategy: manual
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/sun-2026-vla-jepa-enhancing-vision-language-action-model-with/fig05.png
    raw: raw/papers/sun-2026-vla-jepa-enhancing-vision-language-action-model-with-figures/fig05.png
    caption: "pre-training에 섞는 사람 영상 비율(0, 0.3, 0.7, 1)에 따른 LIBERO-Plus perturbation 항목별 성공률 꺾은선 그래프. 비율이 커질수록 Camera, Noise, Robot 항목의 성공률이 크게 오른다"
    page: 9
    bbox_norm: [0.5053, 0.073, 0.894, 0.2676]
    strategy: caption-region
    curated: true
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/sun-2026-vla-jepa-enhancing-vision-language-action-model-with/fig06.png
    raw: raw/papers/sun-2026-vla-jepa-enhancing-vision-language-action-model-with-figures/fig06.png
    caption: "latent action 토큰이 이미지 토큰에 주는 attention 가중치 시각화. 행은 VLA-JEPA, LAPA, UniVLA이고 열은 LIBERO, LIBERO-Plus, 사람 영상 2종, 실제 로봇 3인칭과 손목 시점이다. VLA-JEPA는 로봇 팔, 손, 조작 대상에 집중하고 LAPA는 장면 전체에 넓게 퍼진다"
    page: 10
    bbox_norm: [0.106, 0.073, 0.894, 0.3857]
    strategy: caption-region
    curated: true
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/sun-2026-vla-jepa-enhancing-vision-language-action-model-with/fig07.png
    raw: raw/papers/sun-2026-vla-jepa-enhancing-vision-language-action-model-with-figures/fig07.png
    caption: "object layout OOD 설정에서 π0, π0.5, VLA-JEPA의 실행 장면 연속 프레임 (부록 B)"
    page: 17
    bbox_norm: [0.1069, 0.073, 0.8863, 0.2949]
    strategy: caption-region
    curated: false
  - id: tab01
    label: Table 1
    kind: table
    file: assets/sun-2026-vla-jepa-enhancing-vision-language-action-model-with/tab01.png
    raw: raw/papers/sun-2026-vla-jepa-enhancing-vision-language-action-model-with-figures/tab01.png
    caption: "LIBERO 4개 suite 성공률 비교표. LAPA, UniVLA, OpenVLA-OFT, π0, π0-Fast, CoT-VLA, WorldVLA, villa-X, GR00T N1, π0.5와 VLA-JEPA, 사람 영상을 뺀 VLA-JEPA를 비교한다"
    page: 6
    bbox_norm: [0.2015, 0.5328, 0.7935, 0.7671]
    strategy: table-region
    curated: true
  - id: tab02
    label: Table 2
    kind: table
    file: assets/sun-2026-vla-jepa-enhancing-vision-language-action-model-with/tab02.png
    raw: raw/papers/sun-2026-vla-jepa-enhancing-vision-language-action-model-with-figures/tab02.png
    caption: "SimplerEnv 성공률 비교표. Google Robot 4개 과제와 WidowX Robot 4개 과제의 visual matching 설정 결과다"
    page: 8
    bbox_norm: [0.114, 0.1389, 0.881, 0.3593]
    strategy: table-region
    curated: true
  - id: tab03
    label: Table 3
    kind: table
    file: assets/sun-2026-vla-jepa-enhancing-vision-language-action-model-with/tab03.png
    raw: raw/papers/sun-2026-vla-jepa-enhancing-vision-language-action-model-with-figures/tab03.png
    caption: "LIBERO-Plus 7개 perturbation 항목별 성공률 비교표. Camera, Robot, Language, Light, Background, Noise, Layout 항목과 평균이다"
    page: 8
    bbox_norm: [0.1202, 0.4104, 0.8798, 0.5776]
    strategy: manual
    curated: true
  - id: tab04
    label: Table 4
    kind: table
    file: assets/sun-2026-vla-jepa-enhancing-vision-language-action-model-with/tab04.png
    raw: raw/papers/sun-2026-vla-jepa-enhancing-vision-language-action-model-with-figures/tab04.png
    caption: "미래 영상 horizon T를 4, 8, 16으로 바꿨을 때의 LIBERO 성공률 ablation 표"
    page: 10
    bbox_norm: [0.1355, 0.6218, 0.4653, 0.7053]
    strategy: table-region
    curated: false
  - id: tab05
    label: Table 5
    kind: table
    file: assets/sun-2026-vla-jepa-enhancing-vision-language-action-model-with/tab05.png
    raw: raw/papers/sun-2026-vla-jepa-enhancing-vision-language-action-model-with-figures/tab05.png
    caption: "latent world model 설정표. Transformer 12층, attention head 8개, 이미지 토큰 차원 2048, 시점당 이미지 토큰 256개, 시점당 action 토큰 3개, 시점 2개, 미래 영상 horizon 8 (부록 A)"
    page: 16
    bbox_norm: [0.2953, 0.3895, 0.6989, 0.5422]
    strategy: table-region
    curated: false
  - id: tab06
    label: Table 6
    kind: table
    file: assets/sun-2026-vla-jepa-enhancing-vision-language-action-model-with/tab06.png
    raw: raw/papers/sun-2026-vla-jepa-enhancing-vision-language-action-model-with-figures/tab06.png
    caption: "action head 설정표. Transformer 16층, attention head 12개, 토큰 차원 1024, 상태 차원 8, action 차원 7, 미래 action horizon 7, 학습 가능한 위치 인코딩, denoising 4단계 (부록 A)"
    page: 16
    bbox_norm: [0.3417, 0.6236, 0.6525, 0.7763]
    strategy: table-region
    curated: false
---

## 한 줄 요약 (One-line Summary)

VLA-JEPA는 미래 프레임을 입력이 아니라 학습 목표로만 쓰는 leakage-free state prediction으로 사람 영상에서 latent action을 배우는 VLA pre-training 프레임워크로, V-JEPA2 인코더가 만든 latent 상태를 latent world model이 예측하도록 학습한 뒤 flow matching action head를 붙여 LIBERO 평균 97.2%, LIBERO-Plus 평균 79.5%, SimplerEnv Google Robot 평균 65.2%를 기록했다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 제목 | VLA-JEPA: Enhancing Vision-Language-Action Model with Latent World Model |
| 저자 | Jingwen Sun과 Wenyao Zhang 공동 1저자 외 7인, 교신 Xin Jin과 Zhibo Chen |
| 소속 | University of Science and Technology of China, Zhongguancun Academy, Shanghai Jiao Tong University, Tsinghua University, Eastern Institute of Technology Ningbo, University of Chinese Academy of Sciences, Nankai University |
| arXiv | 2602.10098v2 (2026년 2월 14일 개정, 본문 표기 날짜 2026년 2월 17일) |
| 게재 | GitHub 저장소 설명에 ECCV 2026으로 표기 |
| 코드 | https://github.com/ginwind/VLA-JEPA/ |
| 프로젝트 페이지 | https://ginwind.github.io/VLA-JEPA/ |
| 가중치 | https://huggingface.co/ginwind/VLA-JEPA/ |
| 분량 | 본문 10쪽에 참고문헌과 부록 8쪽, 그림 7개와 표 6개 |
| 지원 | Zhongguancun Academy (Grant No. C20250302) |

## 2. 주요 기여 (Key Contributions)

논문이 내세우는 기여는 세 가지다.

1. **latent action pre-training의 실패 요인 분석.** 미래 프레임을 감독 신호로 쓰는 기존 목적 함수가 픽셀 변화에 묶여 외형에 편향되고, 실제 영상의 카메라 움직임과 배경 변화에 취약하며, 미래 정보가 학습기에 들어올 때 정보 누출이 생긴다는 점을 네 가지 실패 유형으로 정리했다.
2. **VLA-JEPA 프레임워크.** 미래 latent 상태를 예측하고 맞추는 JEPA 방식의 latent predictive alignment로 action과 관련된 상태 전이 의미를 배운다. 픽셀 재구성이 없고, 정보 누출이 없으며, pre-training이 한 단계로 끝난다.
3. **성능과 robustness 개선.** LIBERO, LIBERO-Plus, SimplerEnv 세 벤치마크와 실제 로봇 실험에서 기존 latent action 계열과 대규모 로봇 데이터 계열 VLA를 모두 앞섰고, 기존 다단계 파이프라인보다 학습 절차가 단순하다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 문제 설정과 네 가지 실패 유형

논문의 출발점은 인터넷 규모 영상으로 VLA policy를 pre-training하려는 흐름이다. 로봇 상호작용 데이터는 비싸고 범위가 좁은 반면 라벨 없는 영상은 풍부하고 다양하다. 그래서 LAPA, UniVLA, MotoGPT 같은 latent action pre-training 계열은 영상에서 표현과 전이 구조를 먼저 배운 뒤 제어에 적응시킨다.

논문은 이 계열의 목적 함수가 제어에 필요한 것을 배우지 못하는 경우가 많다고 주장한다. 체화된 agent에게 유용한 action 개념은 픽셀 차이의 압축 기술자가 아니라 상호작용 아래에서 상태가 어떻게 바뀌는지를 담는 변수여야 한다. pre-training 목표가 여기서 어긋나면 downstream policy는 시간적으로 예측력은 있으나 제어 가능한 구조와 약하게만 묶인 표현을 물려받는다.

논문이 정리한 실패 유형은 네 가지다.

| 유형 | 내용 | 결과 |
|---|---|---|
| 픽셀 수준 목적 함수의 외형 편향 | 미래 픽셀을 직접 예측하거나 프레임 간 변화를 latent로 압축한다. VQ-VAE로 압축해도 감독 신호는 질감, 조명, 배경 잡동사니, 시점 변화에 지배된다 | 분산은 크지만 제어와 무관한 요인을 배운다 |
| 실제 영상의 잡음 움직임 증폭 | 사람 영상과 야외 영상에서는 카메라 움직임과 인과 관계 없는 배경 변화가 상호작용에 의한 상태 변화보다 강하다 | latent action이 과제와 무관한 움직임의 프레임 차분 인코더로 변한다 |
| 정보 누출에 의한 지름길 | 현재 observation과 미래 observation을 같은 모듈에 함께 넣거나 미래 문맥이 action 변수에 영향을 주도록 둔다 | latent action이 상태 전이를 설명하는 대신 미래 자체를 부호화해 의미가 빈 변수가 된다 |
| 다단계 학습 파이프라인 | 표현 pre-training, latent action 학습과 alignment, policy 학습의 세 단계 이상을 거친다 | 공학 복잡도가 오르고 단계 간 불일치가 생기며 깨끗한 평가가 어렵다 |

네 유형의 공통 원인은 많은 latent action 목적 함수가 암묵적으로 픽셀 변화에 고정돼 있다는 점이다. 논문은 여기서 원칙 하나를 끌어낸다. action과 관련된 전이 구조를 반영하는 미래 latent 상태를 예측하되, 미래 정보가 예측기에 새어 들어가지 못하게 막는다는 원칙이다. 이 원칙은 픽셀 재구성을 latent 공간 alignment로 대체하는 JEPA와 자연스럽게 맞는다.

### 3.2 전체 구조와 backbone

VLA-JEPA는 action 라벨이 없는 사람 영상과 action 라벨이 있는 로봇 데이터를 함께 pre-training하는 통합 프레임워크다. 사람 영상에서는 world model 기반 상태 전이 목적 함수로 vision-language 표현에서 latent action을 뽑고, 로봇 시연 데이터(demonstration)에서는 여기에 flow matching 기반 action 생성기를 더해 end-effector trajectory를 생성한다. fine-tuning에서는 두 목적 함수를 end-to-end로 함께 최적화한다.

backbone은 Qwen3-VL이다. Qwen3 위에 SigLIP-2를 시각 인코더로 얹은 VLM이며, 대규모 pre-training에서 얻은 이미지 이해와 핵심 물체 탐지 같은 world knowledge를 로봇 제어로 옮기는 역할을 맡는다. VLM에서 연속 latent action 표현을 뽑기 위해 학습 가능한 특수 토큰 두 종류를 어휘에 추가한다.

| 토큰 | 역할 |
|---|---|
| ⟨latent_i⟩ | i번째 시점의 상태 전이를 요약하는 latent action 토큰. ⟨latent_0⟩은 s_0과 s_1 사이의 전이를 나타낸다 |
| ⟨action⟩ | latent action 토큰 뒤에 붙는 embodied action 토큰. flow matching action head의 조건 신호가 된다 |

사람 영상은 V-JEPA2로 학습한 인코더가 시점을 구분하는 특징 시퀀스로 부호화하고, 특징 시퀀스와 latent action 사이의 상관은 time-causal attention이 잡는다.

### 3.3 사람 영상에서 배우기

사람 영상 데이터셋은 여러 시점(view)에서 찍은 영상 집합과 지시문(instruction) 하나의 쌍으로 정의된다. 각 시점 영상은 시각 t_0부터 t_n까지의 프레임 시퀀스다.

**world state encoder.** 논문이 world state encoder라 부르는 상태 인코더는 같은 episode의 여러 시점 observation을 하나의 상태 표현으로 합친다. 자기지도로 학습된 V-JEPA2 인코더가 시점별 영상 표현을 만들고, 시점별 표현을 벡터 연결(concatenation)로 이어 붙인 것이 시각 t_i의 통합 상태 s_ti다 (식 1).

**world modeling을 통한 latent action pre-training.** 학습 가능한 latent action 토큰이 상태 전이 dynamics를 잡도록 autoregressive Transformer 기반 world model의 상태 예측 목적 함수를 둔다. 절차는 세 단계다.

1. VLM이 초기 시각 t_0의 다중 시점 observation과 지시문을 입력받고, 특수 토큰 ⟨latent_i⟩를 world dynamics를 요약하는 latent 표현 z_ti로 사상한다 (식 2).
2. world model이 부호화된 상태 시퀀스 s_t0:i와 조건 변수 z_t0:i를 받아 다음 상태 chunk ŝ_t1:i+1을 예측한다 (식 3).
3. 예측 상태와 V-JEPA2가 만든 실제 상태의 차이를 손실로 삼는다 (식 5).

각 ⟨latent_i⟩는 입력 시퀀스에서 K번 복제되어 가변 길이 latent action 부호화를 가능하게 한다. K는 조정 가능한 하이퍼파라미터다. world model의 attention은 time-causal이다. 같은 시점 안에서는 모든 latent action 토큰과 상태 토큰이 양방향 full attention으로 서로를 보고, 시점 사이에서는 t 시점 토큰이 t 이하 시점만 볼 수 있으며 미래 시점은 마스킹된다.

**ELBO 해석.** JEPA 관점에서 이 목적 함수는 의미 공간에서 예측 로그 가능도의 evidence lower bound(ELBO)를 최대화하는 것으로 볼 수 있다 (식 4). 동결된 V-JEPA2 인코더가 stop-gradient로 목표 상태를 만들고 world model이 온라인 예측기 역할을 한다. V-JEPA2 인코더가 결정론적 임베딩을 내므로 KL 항은 사라지고 ELBO는 latent 공간의 재구성 손실로 줄어든다. 최종 world modeling 손실 L_WM은 예측 horizon T에 걸친 예측 상태와 실제 상태의 차이 합이며, world model과 VLM을 teacher forcing으로 함께 최적화한다.

### 3.4 action 예측과 결합 목적 함수

**action 토큰 조건화.** 로봇 데이터셋의 다중 시점 RGB 영상에도 식 5와 같은 목적 함수를 적용해 latent action 표현을 로봇 도메인에 맞춘다. 실제 action 예측에서는 latent action이 초기 이미지 observation, 지시문과 같은 자격의 조건 신호로 쓰인다. 이를 위해 학습 가능한 embodied action 토큰 ⟨action⟩을 latent action 토큰 뒤에 붙이고, VLM의 causal attention이 ⟨action⟩, latent action 토큰, 초기 시각 observation, 지시문 사이의 의존 관계를 잡게 한다. 그 출력 z_a가 flow matching action head의 추가 조건 신호다 (식 6).

**conditional flow matching action head.** 연속 action trajectory 분포를 conditional flow matching으로 모델링한다. horizon H의 실제 action 시퀀스 a_0:H와 가우시안 잡음 ε 사이를 시간 t에 대해 선형 보간한 a_t = (1 - t)ε + t a_0:H를 정의하고 (식 7), action head는 z_a에 조건화된 벡터장 v_θ(a_t, t | z_a)를 파라미터화한다. 손실은 예측 속도장과 목표 속도 (a_0:H - ε) 사이의 L2 거리다 (식 8). 추론 시에는 학습된 벡터장을 잡음에서 데이터 공간으로 적분해 action trajectory를 얻는다.

**결합 목적 함수.** action 라벨이 있는 로봇 데이터의 전체 손실은 L = L_FM + β L_WM이다 (식 9). β는 조정 가능한 하이퍼파라미터다.

### 3.5 아키텍처 사양 (부록 A.1)

| 구성 요소 | 내용 |
|---|---|
| VLM backbone | Qwen3-VL-2B. dense Transformer이며 시각 인코더는 Vision Transformer와 3D 합성곱 모듈로 구성된다 |
| latent world model | V-JEPA2 인코더 체크포인트에 무작위 초기화한 predictor를 붙인 구조. action 입력은 VLM이 만든 latent action 토큰이다 |
| latent action 토큰 반복 | ⟨latent_i⟩를 K = 24 / T번 반복한다. T는 미래 영상 horizon이고 24는 경험적으로 찾은 최적값이다 |
| action head | flow matching 기반 Transformer인 DiT-B. action 토큰을 32번 반복한 시퀀스에 조건화하며 32도 경험적 최적값이다 |

latent world model 설정 (Table 5):

| 항목 | 값 |
|---|---|
| Transformer 층 수 | 12 |
| attention head | 8 |
| 이미지 토큰 차원 | 2048 |
| 시점당 이미지 토큰 수 | 256 |
| action 토큰 차원 | 2048 |
| 시점당 action 토큰 수 | 3 |
| 시점(view) 수 | 2 |
| 미래 영상 horizon | 8 |

action head 설정 (Table 6):

| 항목 | 값 |
|---|---|
| Transformer 층 수 | 16 |
| attention head | 12 |
| 토큰 차원 | 1024 |
| 상태 차원 | 8 |
| action 차원 | 7 |
| 미래 action horizon | 7 |
| 위치 인코딩 | 학습 가능 |
| denoising 단계 수 | 4 |

### 3.6 학습 세부 (4.1절과 부록 A.2)

pre-training에서는 상태 인코더를 뺀 모든 파라미터를 학습한다. 데이터는 두 종류다.

| 데이터 | 규모 | 목적 함수 |
|---|---|---|
| Something-Something-v2 사람 영상 | 22만 개 영상 | 식 5 (L_WM) |
| Droid 로봇 시연 데이터 | 7만 6천 개 trajectory | 식 9 (L_FM + β L_WM) |

전처리와 최적화 설정은 다음과 같다.

- VLM 입력 observation 이미지는 224×224로, 상태 인코더용 영상 클립은 256×256으로 크기를 맞춘다.
- 관절 위치 제어로 pre-training된 모델(π0 등)은 관절 공간 delta 위치를 action으로 쓰고, end-effector 제어로 pre-training된 모델(VLA-JEPA)은 end-effector delta 위치와 delta axis-angle을 action으로 쓴다. 둘 다 min-max 정규화로 [0, 1]에 맞추고 그리퍼 명령은 {0, 1}로 이진화한다.
- 카메라 시점이 2개 미만이면 상태 표현을 복제해 두 벌로 이어 붙이고, 2개를 넘으면 두 시점만 고른다.
- 배치 크기 32를 GPU 8대에서 병렬로 돌려 전체 배치는 256이다. 학습률은 선형 warmup 뒤 cosine 스케줄이고, 최고 학습률은 VLM과 latent world model이 1e-5, action head가 1e-4다.
- 단계별 학습 스텝은 SSv2와 Droid 결합 pre-training 5만 스텝, 시뮬레이션 데이터셋 이어 학습 3만 스텝, 실제 데이터셋 fine-tuning 2만 스텝이다. 이어 학습과 fine-tuning은 모두 마지막 pre-training 체크포인트에서 시작한다.
- 모든 실험은 NVIDIA A100 GPU 8대에서 수행했다.

fine-tuning 데이터는 벤치마크마다 다르다. LIBERO와 LIBERO-Plus는 시뮬레이션에서 수집한 약 2천 개 전문가 시연 데이터가 든 LIBERO 데이터셋을 쓰고 LIBERO-Plus의 증강 데이터는 쓰지 않는다. SimplerEnv는 두 로봇 embodiment에 대응하는 Fractal과 BridgeV2로 post-training한다. 실제 로봇 실험은 세 과제에서 모은 100개 시연 데이터를 쓴다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 벤치마크와 baseline

시뮬레이션 환경은 두 종류이고 벤치마크는 세 가지다.

| 벤치마크 | 플랫폼 | 성격 | 시나리오 |
|---|---|---|---|
| LIBERO | Franka Emika Panda 팔, 4개 suite | manipulation의 평생 학습 연구용 | 시뮬레이션 전문가 데이터로 학습해 in-distribution 과제에서 검증 |
| SimplerEnv | WidowX와 Google Robot | 조명, 색, 질감, 카메라 pose가 다양해 실제와 시뮬레이션의 외형 격차를 잇는다 | 실제 데이터로 학습해 시뮬레이션에서 평가하는 real-to-sim 격차의 OOD |
| LIBERO-Plus | LIBERO 4개 suite에 perturbation 7종 | VLA를 체계적으로 스트레스 테스트하는 대규모 벤치마크 | 시뮬레이션 전문가 데이터로 학습해 OOD 과제에서 검증 |

baseline은 latent action 계열 VLA, 미래 예측 계열 VLA, 공개 최신 VLA를 아우른다. Moto, LAPA, UniVLA, villa-X, CoT-VLA, WorldVLA, RoboVLMs, GR00T N1, OpenVLA-OFT, π0, π0-Fast, π0.5의 12종이다.

### 4.2 LIBERO

과제마다 50개 episode, suite마다 500개 episode를 평가한다.

| 방법 | Spatial | Object | Goal | LIBERO-10 | 평균 |
|---|---|---|---|---|---|
| LAPA | 73.8 | 74.6 | 58.8 | 55.4 | 65.7 |
| UniVLA | 96.5 | 96.8 | 95.6 | 92.0 | 95.2 |
| OpenVLA-OFT | 97.6 | 98.4 | 97.9 | 94.5 | 97.1 |
| π0 | 96.8 | 98.8 | 95.8 | 85.2 | 94.2 |
| π0-Fast | 96.4 | 96.8 | 88.6 | 60.2 | 85.5 |
| CoT-VLA | 87.5 | 91.6 | 87.6 | 69.0 | 81.1 |
| WorldVLA | 87.6 | 96.2 | 83.4 | 60.0 | 81.8 |
| villa-X | 97.5 | 97.0 | 91.5 | 74.5 | 90.1 |
| GR00T N1 | 94.4 | 97.6 | 93.0 | 90.6 | 93.9 |
| π0.5 | 98.8 | 98.2 | 98.0 | 92.4 | 96.9 |
| VLA-JEPA | 96.2 | 99.6 | 97.2 | 95.8 | 97.2 |
| VLA-JEPA (사람 영상 제외) | 94.8 | 99.6 | 95.8 | 94.0 | 96.1 |

VLA-JEPA는 4개 suite 중 2개(Object, LIBERO-10)에서 최고 성적을 내고 평균 97.2%로 전체 1위다. 논문은 OpenVLA-OFT와 π0.5 같은 상위 모델이 방대한 로봇 데이터로 pre-training된 반면 VLA-JEPA는 더 적은 학습 데이터로 더 나은 성능을 냈다고 적는다. 사람 영상으로 학습한 latent action 계열인 UniVLA, villa-X, LAPA, CoT-VLA는 일관되게 VLA-JEPA보다 낮아, 1절에서 지적한 한계를 뒷받침한다.

### 4.3 SimplerEnv

visual matching 설정에서 과제별 평균 성공률을 보고한다. LAPA의 별표(*)는 시뮬레이션 환경에서 수집한 in-distribution 전문가 시연 데이터로 학습했다는 뜻이고, 나머지는 OXE 데이터셋의 부분집합으로 학습했다.

| 방법 | Google Pick | Google Move | Google Drawer | Google Place | Google 평균 | WidowX Spoon | WidowX Carrot | WidowX Block | WidowX Eggplant | WidowX 평균 |
|---|---|---|---|---|---|---|---|---|---|---|
| LAPA* | - | - | - | - | - | 70.8 | 45.8 | 54.2 | 58.3 | 57.3 |
| villa-x | 81.7 | 55.4 | 38.4 | 4.2 | 44.9 | 48.3 | 24.2 | 19.2 | 71.7 | 40.8 |
| UniVLA | - | - | - | - | - | - | - | - | - | 42.7 |
| RoboVLMs | 77.3 | 61.7 | 43.5 | 24.1 | 51.7 | 45.8 | 20.8 | 4.2 | 79.2 | 37.5 |
| GR00T N1 | 0.7 | 1.9 | 2.9 | 0.0 | 1.4 | 1.4 | 0.0 | 0.0 | 13.9 | 3.8 |
| MoTo | 74.0 | 60.4 | 43.1 | - | - | - | - | - | - | - |
| OpenVLA-OFT | - | - | - | - | - | 34.2 | 30.0 | 30.0 | 72.5 | 41.8 |
| π0 | 72.7 | 65.3 | 38.3 | - | - | 29.1 | 0 | 16.6 | 62.5 | 40.1 |
| π0-Fast | 75.3 | 67.5 | 42.9 | - | - | 29.1 | 21.9 | 10.8 | 66.7 | 48.3 |
| VLA-JEPA | 88.3 | 64.1 | 59.3 | 49.1 | 65.2 | 75.0 | 70.8 | 12.5 | 70.8 | 57.3 |
| VLA-JEPA (사람 영상 제외) | 85.3 | 66.7 | 75.5 | 86.1 | 78.4 | 75.0 | 54.2 | 20.8 | 79.2 | 57.3 |

VLA-JEPA는 Google Robot과 WidowX Robot 각각에서 4개 과제 중 2개에서 최고 성적이다. Google Robot 평균은 65.2%로 가장 높고 WidowX Robot 평균은 57.3%로 LAPA*와 같은 값이다. 논문은 SimplerEnv가 전문가 시연 데이터를 제공하지 않아 로봇 데이터 품질이 성능을 크게 좌우한다고 분석한다. LAPA는 SimplerEnv에서 성공한 rollout만 뽑아 전문가 시연 데이터로 쓰는데, 100개 rollout만으로도 real-to-sim 격차가 줄어 높은 성적을 낸다. villa-X는 대규모 로봇 데이터와 사람 영상으로 학습했다. VLA-JEPA와 UniVLA, RoboVLMs, Moto는 villa-X가 쓴 학습 데이터의 1% 미만을 쓰며, 그중 VLA-JEPA가 가장 경쟁력 있는 결과를 냈다.

### 4.4 LIBERO-Plus

perturbation 항목마다 LIBERO 4개 suite 전체의 평균 성공률을 보고한다.

| 방법 | Camera | Robot | Language | Light | Background | Noise | Layout | 평균 |
|---|---|---|---|---|---|---|---|---|
| UniVLA | 1.8 | 46.2 | 69.6 | 69.0 | 81.0 | 21.2 | 31.9 | 42.9 |
| OpenVLA-OFT | 56.4 | 31.9 | 79.5 | 88.7 | 93.3 | 75.8 | 74.2 | 69.6 |
| π0 | 13.8 | 6.0 | 58.8 | 85.0 | 81.4 | 79.0 | 68.9 | 53.6 |
| π0-Fast | 65.1 | 21.6 | 61.0 | 73.2 | 73.2 | 74.4 | 68.8 | 61.6 |
| WorldVLA | 0.1 | 27.9 | 41.6 | 43.7 | 17.1 | 10.9 | 38.0 | 25.0 |
| VLA-JEPA | 63.3 | 67.1 | 85.4 | 95.6 | 93.6 | 66.3 | 85.1 | 79.5 |
| VLA-JEPA (사람 영상 제외) | 40.3 | 55.7 | 72.9 | 88.2 | 70.5 | 38.2 | 74.6 | 62.9 |

VLA-JEPA는 7개 perturbation 항목 중 5개(Robot, Language, Light, Background, Layout)에서 최고이고 평균 79.5%로 두 번째로 높은 OpenVLA-OFT의 69.6%를 9.9%p 앞선다. 사람 영상으로 학습한 UniVLA뿐 아니라 대규모 로봇 데이터로 학습한 OpenVLA-OFT, π0보다도 크게 높다. 논문은 이 결과를 latent action이 텍스트 데이터에 견줄 만한 world knowledge 표현을 갖췄다는 근거로 해석하고, 특히 Language, Light, Background, Layout에서의 우위를 latent action이 과제와 무관한 교란을 처리한다는 증거로 든다.

### 4.5 실제 로봇 실험

하드웨어는 Franka Research 3 팔, Robotiq 2F-85 그리퍼, Intel RealSense D435 카메라 3대(3인칭 2대, 손목 1대)다. 학습용 시연 데이터 100개는 포도, 사과, 망고, 오렌지를 탁자에서 접시나 그릇으로 옮기는 pick-and-place 3개 과제에서 모았다. 과제마다 10회 독립 시행의 평균 성공률을 보고하며, 공정한 비교를 위해 π0와 π0.5도 같은 시연 데이터로 fine-tuning했다.

OOD 프로토콜은 두 가지다.

| 프로토콜 | 내용 | 검증 목적 |
|---|---|---|
| task OOD | 학습 데이터에 없는 과제 수행. 바나나를 그릇에, 복숭아를 접시에, 포도를 선반 맨 위 칸에 옮기기 | 기본 skill의 습득과 전이 |
| object layout OOD | 학습에 쓴 3개 과제를 골라 물체 배치를 무작위로 섞기 | 어수선한 탁상 환경에서의 robustness |

Figure 4의 성공률은 다음과 같다.

| 설정 | π0 | π0.5 | VLA-JEPA |
|---|---|---|---|
| in-distribution | 0.57 | 0.37 | 0.70 |
| task OOD | 0.00 | 0.20 | 0.17 |
| object layout OOD | 0.37 | 0.27 | 0.47 |

VLA-JEPA는 in-distribution과 object layout OOD에서 최고이고 task OOD에서는 두 번째다. 논문은 배포 중 관찰한 정성적 차이를 함께 적는다.

- π0.5는 지시문을 따라 대상 물체에 접촉하는 정확도가 VLA-JEPA보다 높지만, 위치 제어가 로봇 팔의 안전 경계를 자주 넘어 실행에 실패한다.
- VLA-JEPA는 텍스트 지시문에 대한 세밀한 추론이 부족해 명령과 다른 물체를 집는 경향이 있지만, 안전 제약을 어기는 일은 드물다.
- VLA-JEPA는 실패 후 그리퍼를 다시 열어 재시도하는 반복 grasping을 익혔다. π0와 π0.5에서는 관찰되지 않은 동작이다. 논문은 사람 영상에 반복 grasping 지식이 풍부한 반면 로봇 데이터에는 그런 시연이 드물기 때문이라고 본다.

부록 B의 과제별 관찰은 다음과 같다. 바나나 과제에서는 π0.5와 VLA-JEPA 모두 약 50% 성공률이다. 복숭아 과제에서는 불규칙한 모양 때문에 로봇이 안전 경계를 자주 침범한다. 선반 과제에서는 학습 데이터에 선반이 없어 세 모델 모두 end-effector를 맨 위 칸에 놓지 못했지만, π0와 π0.5가 선반에 직접 충돌한 반면 VLA-JEPA는 선반 뒤쪽에서 접근해 end-effector를 더 높이 들어 올리는 다른 행동을 보였다. object layout OOD에서는 π0와 π0.5가 grasping 실패 후 그리퍼를 열지 않고 멈추는 반면 VLA-JEPA는 곧바로 그리퍼를 열고 다시 시도한다. 논문은 반복 grasping이 추가 물리 dynamics를 배우는 문제가 아니라 언제 다시 잡을지를 배우는 문제이며, 그 시점 판단을 익히면 policy가 자기 dynamics로 옮겨 실행할 수 있다고 주장한다.

### 4.6 ablation과 추가 분석

**Q1. 사람 영상의 효과.** LIBERO와 SimplerEnv에서는 pre-training에서 사람 영상을 빼도 성능이 크게 떨어지지 않는다. SimplerEnv에서는 오히려 사람 영상을 뺀 쪽이 Google Robot 평균 78.4%로 더 높다. 논문은 in-distribution과 real-to-sim OOD에서는 고품질 전문가 시연 데이터가 사람 영상보다 중요하다고 해석한다. 반면 LIBERO-Plus에서는 사람 영상이 평균 62.9%를 79.5%로 16.6%p 끌어올린다. 사람 영상에는 action trajectory 정보가 없어 로봇 action의 물리 dynamics를 직접 배울 수는 없고, 대신 반복 grasping 같은 기존 skill의 robustness와 안정성을 높이는 것이 주된 효과라는 것이 논문의 분석이다. 이 과정은 사람이 영상을 보고 skill을 배울 때 첫 시도는 실패하고 반복 시도로 영상 지식과 물리 dynamics의 대응을 세워 가는 과정과 닮았다고 설명한다.

Figure 5는 pre-training 데이터의 사람 영상 비율을 0, 0.3, 0.7, 1로 늘렸을 때 LIBERO-Plus 항목별 성공률 변화를 보인다. 비율이 오를수록 robustness가 일관되게 개선되며, 논문은 이를 사람 영상이 새 action 실행 능력을 더하는 것이 아니라 기존 skill 목록을 강화한다는 가설의 근거로 든다.

**Q2. 통합 pre-training의 효과.** 통합 pre-training은 기존 2단계 pre-training 패러다임을 일관되게 앞선다. latent action 토큰이 담는 정보를 보기 위해 LAPA, UniVLA, VLA-JEPA 세 모델의 내부 attention 맵에서 latent action 토큰이 이미지 토큰에 주는 가중치를 시각화했다. 공정한 비교를 위해 세 모델 모두 시뮬레이션과 실제 데이터에 fine-tuning하지 않은 pre-training 체크포인트만 썼다.

| 모델 | attention 양상 | 논문의 해석 |
|---|---|---|
| LAPA | 지나치게 조밀한 시각 정보에 집중해 탁상의 무관한 물체까지 포함한다 | pre-training 단계의 정보 누출로 latent action이 목표 이미지의 압축 표현으로 퇴화했다 |
| UniVLA | 과제 관련 텍스트 안내로 LAPA의 문제를 완화하지만 의미를 과도하게 강조해 사람 영상의 정지된 펜이나 실제 손목 시점의 식탁보 질감 같은 배경 요소를 본다 | 의미 편향 |
| VLA-JEPA | 로봇 팔, 손, 조작 대상 물체에 집중한다 | 통합 pre-training이 과제와 무관한 정보의 영향을 줄인다 |

**Q3. 미래 영상 horizon의 효과.** latent action 토큰 수는 항상 프레임 수에서 1을 뺀 값이다. T를 4, 8, 16으로 바꾸고 다른 하이퍼파라미터를 고정한 채 LIBERO에 바로 fine-tuning했다.

| T | Spatial | Object | Goal | LIBERO-10 | 평균 |
|---|---|---|---|---|---|
| 4 | 95.0 | 99.2 | 95.8 | 89.0 | 94.8 |
| 8 | 94.8 | 99.8 | 95.8 | 94.0 | 96.1 |
| 16 | 92.8 | 98.8 | 98.0 | 92.2 | 95.5 |

영상 horizon이 미리 정한 action horizon에 가까울 때 성능이 가장 좋다. T가 너무 작으면 부호화되는 정보가 부족해 특히 long-horizon 과제(LIBERO-10)에서 성능이 낮고, T가 너무 크면 중복 정보가 들어와 목표가 단순한 Goal suite에서는 최고지만 세밀한 manipulation이 필요한 Spatial suite에서는 가장 낮다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

논문이 명시한 한계와 관찰은 다음과 같다.

- VLA-JEPA는 텍스트 지시문에 대한 세밀한 추론이 부족해 실제 로봇에서 명령과 다른 물체를 집는 경향이 있다. task OOD 성공률도 π0.5(0.20)보다 낮은 0.17이다.
- 사람 영상 pre-training은 새 action 실행 능력을 더하지 못하고 기존 skill의 robustness를 높이는 데 그친다. in-distribution과 real-to-sim OOD에서는 사람 영상보다 고품질 전문가 시연 데이터가 성능을 좌우한다.
- 선반처럼 학습 데이터에 없는 구조물이 등장하는 과제는 세 모델 모두 완수하지 못했다.
- 결론에서 밝힌 향후 방향은 사람 영상 pre-training 패러다임을 로봇 데이터와 텍스트 기반 추론 데이터로 확장해 일반화와 robustness를 더 높이는 것이다.

자료에 기술이 없어 확인할 수 없는 점은 다음과 같다.

- β와 K 같은 하이퍼파라미터의 실제 값과 민감도 실험이 없다. K = 24 / T 공식만 부록에 있다.
- 실제 로봇 결과의 시행 횟수가 과제당 10회로 적어 통계적 유의성을 논하기 어렵다.
- Table 2의 본문 서술과 표 수치가 어긋난다. 본문은 villa-X가 WidowX Robot에서 최고 평균 성공률을 냈다고 적지만 표에서 villa-x의 WidowX 평균은 40.8이고 최고값 57.3은 LAPA*와 VLA-JEPA다. 또 VLA-JEPA가 WidowX에서 두 번째로 높다고 적지만 표에서는 LAPA*와 동률 1위다.
- 학습에 쓴 사람 영상은 Something-Something-v2 한 종류다. 야외 영상이나 egocentric 대규모 데이터셋에서도 같은 효과가 나는지는 검증되지 않았다.
- 추론 속도, 파라미터 수 대비 효율, action head의 4단계 denoising이 실시간 제어에 충분한지에 대한 서술이 없다.

## 6. 관련 연구 (Related Work)

**VLA 모델.** LLM과 대규모 로봇 데이터셋의 발전으로 VLA가 로봇 학습의 지배적 패러다임이 됐다. RT 시리즈가 멀티모달 LLM을 로봇 시연 데이터로 fine-tuning하는 길을 열었고 후속 연구가 manipulation과 navigation 성능을 높였다. 대부분의 VLA는 action 라벨이 있는 대규모 로봇 데이터에 크게 의존하는데 이 데이터는 비싸고 확장이 어렵다. 명시적 action 감독 의존을 줄이기 위해 계층적 planning, subgoal이나 rollout 예측, 물체 중심 조건화, latent 미래 임베딩이나 action 같은 멀티모달 chain-of-thought 신호가 도입됐지만 여전히 action 라벨 데이터에 의존한다.

**로봇용 latent action 학습.** action 라벨 없는 대규모 영상을 쓰기 위해 ILPO, LAPO, Genie가 비디오 게임에서 latent action을 제안했다. 로봇 학습에서는 LAPA, IGOR, UniVLA, MotoGPT, AdaWorld, CoMo, StaMo가 프레임 전이에서 이산 또는 연속 motion 토큰을 뽑아 VLA가 이를 예측하도록 pre-training한 뒤 실제 로봇 제어로 사상한다. villa-x, XR-1, CLAP, VITA는 로봇과 사람 영상 양쪽에서 latent action을 뽑아 통합 codebook으로 실제 action 공간에 맞춘다. latent action이 인접 프레임에서 직접 학습되므로 픽셀 수준 지름길과 미래 프레임 누출이 생기며, optical flow나 물체 중심 제약으로 latent action 공간을 제한하는 시도는 사람이 정한 시각적 사전 지식 쪽으로 latent action을 편향시켜 새 환경에서 체계적으로 실패하게 만든다. 논문은 VLA-JEPA가 프레임 차분 정보에 기대지 않고 action 관련 표현을 배워 누출과 지름길을 피하면서 단일 단계 end-to-end pre-training을 가능하게 한다고 대비한다.

**JEPA.** I-JEPA, V-JEPA, V-JEPA 2로 이어지는 Joint-Embedding Predictive Architecture는 픽셀 재구성을 latent 공간 alignment로 대체한다. 픽셀 대신 표현을 예측하므로 저수준 잡음에 robust하고 의미 추상화를 촉진한다. VLA-JEPA는 V-JEPA2 인코더를 동결 목표 인코더로 쓰고 예측기를 latent world model로 학습한다.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| leakage-free state prediction | 미래 프레임을 예측기 입력이 아니라 학습 목표를 만드는 데만 써서 latent action이 미래 자체를 부호화하는 지름길을 막는 VLA-JEPA의 핵심 설계 |
| latent predictive alignment | 픽셀 재구성 대신 예측 latent 상태와 목표 latent 상태를 맞추는 JEPA 방식의 학습 목표 |
| world state encoder | 동결된 V-JEPA2 인코더로 시점별 영상 표현을 만들고 벡터 연결로 합쳐 통합 상태 표현을 내는 모듈 |
| latent world model | 상태 시퀀스와 latent action을 받아 다음 상태 chunk를 예측하는 autoregressive Transformer. time-causal attention을 쓴다 |
| time-causal attention | 같은 시점 안에서는 양방향 full attention, 시점 사이에서는 과거만 보는 causal attention을 결합한 마스킹 방식 |
| ⟨latent_i⟩ 토큰 | i번째 시점의 상태 전이를 요약하도록 VLM 어휘에 추가한 학습 가능한 latent action 토큰. K = 24 / T번 반복해 넣는다 |
| ⟨action⟩ 토큰 | latent action 토큰 뒤에 붙어 flow matching action head의 조건 신호 z_a를 만드는 embodied action 토큰 |
| LIBERO-Plus | LIBERO 4개 suite에 Camera, Robot, Language, Light, Background, Noise, Layout 7종 perturbation을 가해 VLA의 robustness를 검사하는 벤치마크 |
| SimplerEnv | WidowX와 Google Robot 설정에서 실제 데이터로 학습한 policy를 시뮬레이션으로 평가하는 real-to-sim 벤치마크 |
| 반복 grasping | grasping 실패 후 그리퍼를 다시 열어 재시도하는 동작. 사람 영상 pre-training으로 VLA-JEPA가 익힌 skill |

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 2 | VLA-JEPA 모델 구조 개요 (V-JEPA 인코더, VLA, projector, 미래 프레임은 목표로만) | caption-region | ★ wiki 권장 (architecture) |
| fig02 | 4 | 사람 영상 pre-training과 로봇 데이터 fine-tuning의 두 단계 학습 흐름 | caption-region | ★ wiki 권장 (method) |
| fig03 | 6 | LIBERO, LIBERO-Plus, SimplerEnv 2종, 실제 Franka 로봇의 평가 환경 장면 | caption-region | ★ wiki 권장 (setup) |
| fig04 | 8 | 실제 로봇 ID, task OOD, layout OOD 성공률 막대 그래프 | manual | ★ wiki 권장 (result) |
| fig05 | 9 | 사람 영상 비율에 따른 LIBERO-Plus 항목별 성공률 변화 | caption-region | ★ wiki 권장 (ablation) |
| fig06 | 10 | latent action 토큰의 attention 가중치 시각화 (VLA-JEPA, LAPA, UniVLA) | caption-region | ★ wiki 권장 (analysis) |
| fig07 | 17 | object layout OOD 실행 장면 연속 프레임 (부록) | caption-region | (선택) |
| tab01 | 6 | LIBERO 4개 suite 성공률 비교표 | table-region | ★ wiki 권장 (result) |
| tab02 | 8 | SimplerEnv Google Robot과 WidowX Robot 성공률 비교표 | table-region | ★ wiki 권장 (result) |
| tab03 | 8 | LIBERO-Plus 7개 perturbation 항목 성공률 비교표 | manual | ★ wiki 권장 (result) |
| tab04 | 10 | 미래 영상 horizon T ablation 표 | table-region | (선택, 본문 표로 대체) |
| tab05 | 16 | latent world model 설정표 (부록) | table-region | (선택, 본문 표로 대체) |
| tab06 | 16 | action head 설정표 (부록) | table-region | (선택, 본문 표로 대체) |
