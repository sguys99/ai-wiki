---
title: "GR00T-N1.7-3B (nvidia/GR00T-N1.7-3B, Hugging Face model card)"
type: repo
year: 2026
category: physical-ai
raw_path: raw/repos/nvidia-gr00t-n1-7-3b.md
raw_filename: "nvidia-gr00t-n1-7-3b.md"
source_collection: external
org: "nvidia"
repo: "GR00T-N1.7-3B (Hugging Face model)"
url: "https://huggingface.co/nvidia/GR00T-N1.7-3B"
license: "NVIDIA Open Model License Agreement"
tags: [physical-ai, vla, humanoid, edge-inference]
figures:
  - id: fig01
    label: header banner
    kind: figure
    file: assets/nvidia-gr00t-n1-7-3b/fig01.png
    raw: https://cdn-uploads.huggingface.co/production/uploads/67b8da81d01134f89899b4a7/8bFQa2ZIGCsOQQ2ho2N_U.png
    caption: "모델 카드 상단의 Isaac GR00T 로고 배너 (장식용)"
    strategy: manual
    curated: false
  - id: fig02
    label: Model Overview demo
    kind: figure
    file: assets/nvidia-gr00t-n1-7-3b/fig02.png
    raw: https://cdn-uploads.huggingface.co/production/uploads/67b8da81d01134f89899b4a7/ZCLLXZk2LQBG0YH_BmiIN.gif
    caption: "GR00T N1.7 실행 데모의 첫 프레임. Unitree G1이 상자를 다루고, 양팔 YAM이 붉은 천을 펼치며, AgiBot G1이 식탁 위 물체를 정리한다"
    strategy: manual
    curated: true
  - id: fig03
    label: model-architecture.png
    kind: figure
    file: assets/nvidia-gr00t-n1-7-3b/fig03.png
    raw: https://huggingface.co/nvidia/GR00T-N1.7-3B/resolve/main/model-architecture.png
    caption: "GR00T N1.X dual-system 구조도. 이미지와 지시문은 VLM(System 2)이 토큰으로 처리하고, robot state 인코딩과 함께 DiT(System 1)가 action 토큰을 denoising해 motor action을 낸다"
    strategy: manual
    curated: true
---

## 한 줄 요약 (One-line Summary)

NVIDIA가 Hugging Face에 공개한 GR00T N1.7 베이스 체크포인트(3B parameter)의 모델 카드다. humanoid를 포함한 여러 로봇에 공통으로 쓰는 cross-embodiment VLA로, Cosmos-Reason2-2B VLM backbone과 flow matching DiT action head를 결합한다. 카드는 입출력 규격, 학습 데이터 규모(13개 데이터셋, 2,160만 data point), 학습 에너지(41,288 kWh), 9종 GPU 플랫폼의 추론 지연 시간 표를 제공한다. 같은 저장소의 `config.json`은 action horizon 40, 최대 state와 action 차원 132, denoising 4 step 같은 실제 하이퍼파라미터를 담고 있다.

## 1. 자료 정보 (Document Information)

- URL: https://huggingface.co/nvidia/GR00T-N1.7-3B
- 개발: NVIDIA
- 라이선스: NVIDIA Open Model License Agreement. 카드는 상업적, 비상업적 사용 모두 가능하다고 적는다
- 모델 버전 표기: 카드 본문은 "GR00T N1.7 EA"라고 적는다. EA는 Early Access, 즉 정식 출시 전 공개 단계를 뜻한다. 반면 GitHub 저장소 README([[physical-ai/nvidia-isaac-gr00t]])는 같은 모델을 GA(General Availability) 릴리스로 소개한다
- 저장소 생성 2026-02-25, 최종 수정 2026-04-23 (Hugging Face API 기준)
- pipeline_tag `robotics`, 아키텍처 클래스 `Gr00tN1d7`, 연결 논문 arXiv 2503.14734 (GR00T N1 White Paper)
- 수집 시점 기준 다운로드 78,969회, like 172개
- 저장소 구성: safetensors 가중치 2개 shard, `config.json`, `embodiment_id.json`, `processor_config.json`, `statistics.json`, `experiment_cfg/` 학습 설정 6개 파일, `trainer_state.json`, `wandb_config.json`, 그리고 Model Card++ 하위 카드(`EXPLAINABILITY.md`, `PRIVACY.md`, `SAFETY_and_SECURITY.md`)
- 배포처: GitHub NVIDIA/Isaac-GR00T, Hugging Face 컬렉션 `nvidia/gr00t-n17`
- 수집 일자: 2026-10-26. raw에는 README 원문과 함께 `config.json`, `embodiment_id.json` 전문을 부록으로 보존했다

## 2. 주요 기여 (Key Contributions)

이 카드의 가치는 모델 설명보다 배포 판단에 필요한 정량 정보에 있다. 아키텍처 서술은 짧고 성능 성공률은 없지만, 하드웨어별 추론 시간과 학습 비용, 입출력 텐서 규격은 다른 자료에 없는 수준으로 구체적이다.

- **모델 정체성 정의**: GR00T N1.7은 humanoid 로봇의 일반화된 추론과 기술을 위한 open foundation model이다. 언어와 이미지를 포함한 멀티모달 입력을 받아 다양한 환경에서 manipulation 과제를 수행하며, 실제 데이터나 합성 데이터로 post-training해 특정 로봇과 과제에 맞출 수 있다. manipulation은 팔과 손으로 물체를 다루는 과제 영역을 말한다.
- **모델 패밀리 4종 안내**: 베이스 모델 외에 SimplerEnv Bridge, SimplerEnv Fractal, DROID, LIBERO 데이터로 post-training한 4개 모델을 소개하고 각 데이터셋 규모를 요약한다.
- **추론 지연 시간 표**: 데이터 센터 GPU 6종과 edge 플랫폼 3종에서 PyTorch Eager, torch.compile, TensorRT 세 모드의 단계별 지연 시간을 제시한다. TensorRT 전체 파이프라인 기준 H100과 RTX Pro 6000 Blackwell이 35.9 Hz로 가장 빠르다.
- **학습 비용 공개**: GB200 64노드에서 120시간 학습했다는 계산식과 함께 전력량 41,288 kWh, 배출량 16.949 tCO2e를 밝힌다.
- **하이퍼파라미터 원본**: 저장소의 `config.json`과 `embodiment_id.json`이 action horizon, 최대 차원, DiT 층 수, embodiment ID 매핑을 그대로 담고 있다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 전체 구조

GR00T N1.7은 pre-training된 vision encoder와 language encoder 위에 flow matching action transformer를 결합한 구조다. flow matching은 noise에서 데이터로 향하는 vector field를 학습해 샘플을 만드는 생성 기법이다. 이 action transformer가 vision, language, proprioception을 조건으로 action chunk를 한 번에 모델링한다. proprioception은 관절 위치와 속도처럼 로봇이 자기 몸 상태를 재는 센서 신호를 말하고, action chunk는 한 번의 추론으로 출력하는 연속된 여러 timestep의 action 묶음이다.

카드는 이 구조를 "medium-sized version"이라고 부르고, 세부 설명은 GR00T N1 White Paper(arXiv 2503.14734)에 맡긴다. 카드 상단 문구는 N1.7의 VLM backbone이 Cosmos-Reason2-2B로 바뀌었다고 강조한다.

### 구성 요소별 처리

카드의 Network Architecture 절은 다섯 구성 요소를 다음과 같이 적는다.

| 구성 요소 | 처리 방식 |
|---|---|
| RGB 카메라 프레임 | pre-training된 vision transformer(SigLip2)로 처리 |
| 텍스트 | pre-training된 transformer(T5)로 인코딩 |
| robot proprioception | embodiment ID별로 따로 두는 MLP로 인코딩. 차원이 로봇마다 다르므로 설정 가능한 최대 길이까지 padding한 뒤 MLP에 넣는다 |
| action 인코딩과 velocity 예측 디코딩 | embodiment마다 하나씩 두는 MLP |
| flow matching transformer | DiT로 구현. diffusion step 조건은 AdaLN(adaptive layernorm)으로 주입 |

DiT는 diffusion transformer의 약자로, denoising 과정을 Transformer로 구현한 생성 모델이다. 여기서는 noise가 섞인 action 토큰을 여러 step에 걸쳐 정제해 최종 action을 만든다. AdaLN은 diffusion step 같은 조건 정보로 layer normalization의 scale과 shift를 조절하는 방식이다.

SigLip2와 T5 서술은 카드 상단의 Cosmos-Reason2-2B 문구와 맞지 않는다. Cosmos-Reason2-2B는 Qwen3-VL 계열 VLM이며, GitHub README와 LeRobot 문서도 N1.7 backbone을 Cosmos-Reason2/Qwen3-VL로 적는다. 따라서 이 절의 encoder 서술은 이전 세대 카드 문구가 남은 것으로 보인다. 카드의 Cosmos-Reason2-2B 링크도 실제로는 `nvidia/Cosmos-Reason2-8B` 페이지를 가리킨다.

### 입력과 출력 규격

| 구분 | 유형 | 형식 | 차원 |
|---|---|---|---|
| Vision 입력 | 이미지 프레임 | 로봇 카메라에서 온 가변 개수의 uint8 프레임 | 2D RGB |
| State 입력 | robot proprioception | 부동소수점 | 1D 실수 벡터 |
| Language 입력 | 텍스트 지시문(instruction) | 문자열 | 1D 문자열 |
| Embodiment ID 입력 | 정수 | 학습에 쓰인 embodiment 중 어느 것인지 가리키는 정수 | 1D 정수 |
| 출력 | action | 연속값 벡터 | 2D |

출력의 연속값 벡터는 로봇의 모터 제어 값에 대응하며, 차원은 해당 embodiment의 자유도에 따라 달라진다. embodiment는 특정 형태와 센서, 액추에이터 구성을 가진 로봇 본체를 뜻한다. 출력이 2D인 이유는 action chunk 길이(시간)와 action 차원 두 차원을 함께 갖기 때문이다.

### config.json의 주요 하이퍼파라미터

저장소의 `config.json`은 카드 본문에 없는 실제 설정값을 담고 있다.

| 키 | 값 | 의미 |
|---|---|---|
| `model_name` | `nvidia/Cosmos-Reason2-2B` | VLM backbone |
| `architectures` | `Gr00tN1d7` | 모델 클래스 |
| `action_horizon` | 40 | 한 번에 예측하는 action 개수 |
| `max_state_dim`, `max_action_dim` | 132, 132 | padding 기준 최대 차원 |
| `max_num_embodiments` | 32 | embodiment별 MLP 슬롯 수 |
| `num_inference_timesteps` | 4 | 추론 시 denoising step 수 |
| `diffusion_model_cfg.num_layers` | 32 | DiT 층 수 |
| `diffusion_model_cfg.num_attention_heads`, `attention_head_dim` | 32, 48 | DiT attention 구성 |
| `diffusion_model_cfg.norm_type` | `ada_norm` | AdaLN 사용 |
| `vl_self_attention_cfg.num_layers` | 4 | VLM 출력 뒤 self-attention 층 수 |
| `backbone_embedding_dim`, `hidden_size` | 2048, 1024 | backbone 출력 차원과 action head hidden 차원 |
| `select_layer` | 16 | backbone에서 특징을 꺼내는 층 |
| `tune_llm`, `tune_visual`, `tune_diffusion_model` | true | 해당 모듈 학습 여부 |
| `tune_top_llm_layers` | 0 | |
| `state_dropout_prob` | 0.2 | 학습 중 state 입력 dropout 확률 |
| `image_target_size`, `image_crop_size` | 256, 230 | 이미지 전처리 크기 |
| `rtc_ramp_rate` | 6.0 | real-time action chunking 관련 설정 |
| `dtype`, `load_bf16` | bfloat16, true | 가중치 정밀도 |
| `transformers_version` | 4.57.1 | |

이 값 중 일부는 GitHub README가 적은 N1.7 설정과 다르다. README는 DiT 층 16, `select_layer` 12, `load_bf16` false, transformers 4.57.3을 적는 반면 이 체크포인트의 `config.json`은 각각 32, 16, true, 4.57.1이다. 카드가 EA 버전을 표기하고 저장소 최종 수정일이 2026-04-23이라는 점을 함께 보면, Hugging Face 체크포인트와 GitHub GA 코드의 기본 설정이 서로 다른 시점의 값일 가능성이 있다.

### embodiment ID 매핑

`embodiment_id.json`은 embodiment tag 문자열을 MLP 슬롯 번호(0~29)에 대응시킨다. embodiment tag는 데이터가 어떤 로봇에서 왔는지 가리키는 문자열 키다. 매핑에서 확인되는 사항은 다음과 같다.

- 벤치마크 post-training용 슬롯: `simpler_env_google` 0, `simpler_env_widowx` 1, `libero_sim` 2, `droid_sim` 3
- Open X-Embodiment 계열: `oxe_droid` 17, `oxe_fractal` 18, `oxe_language_table` 19, `oxe_bridge` 20
- 시뮬레이션: `robocasa_panda_omron` 13, `sim_behavior_r1_pro` 23
- 실제 로봇: `agibot` 26, `xdof` 24 또는 27, `unitree_g1_full_body_with_waist_height_nav_cmd` 25, `real_g1_*` 25, `real_r1_pro_sharpa_*` 26~29
- 사람 데이터 변형으로 보이는 키: `real_r1_pro_sharpa_relative_eef_human`, `_egodex`, `_maxinsights`, `_mecka`
- action 표현 변형 키: `relative_eef`, `delta_eef`, `absolute_eef`, `relative_joint`, `meanstd` 등이 같은 로봇 안에서 여러 tag로 갈린다

여러 tag가 같은 슬롯 번호를 공유한다. 예를 들어 `real_r1_pro_sharpa_relative_eef_human`과 `agibot`은 모두 26번이다. 즉 슬롯은 로봇 하나가 아니라 state와 action 배열 구조가 같은 데이터 묶음 단위로 배정된 것으로 보인다. `gr1_unified`와 `oxe_bridge`가 같은 20번에 배정된 것처럼 직관적이지 않은 공유도 있다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 모델 패밀리 4종

| 모델 | post-training 데이터 | 데이터 규모 |
|---|---|---|
| GR00T N1.7 SimplerEnv Bridge | `IPEC-COMMUNITY/bridge_orig_lerobot` (BridgeData V2의 LeRobot 형식 변환) | trajectory 60,096개, 환경 24곳 |
| GR00T N1.7 SimplerEnv Fractal | 카드상 Bridge와 같은 링크와 설명 | 카드상 Bridge와 동일 |
| GR00T N1.7 DROID | DROID | 시연 trajectory 약 76,000개(약 350시간), 52개 건물의 장면 564곳, 과제 86종 |
| GR00T N1.7 LIBERO | LIBERO | 언어 조건 manipulation 과제 130종, 사람 teleoperation 시연 데이터(demonstration) |

Fractal 항목의 데이터 링크와 요약은 Bridge 항목을 그대로 복제한 것이라 카드 자체의 편집 오류로 보인다. LIBERO는 lifelong robot learning, 즉 과제를 순차적으로 배우며 지식 전이와 지속 학습을 평가하는 벤치마크로 소개된다.

### 학습 데이터와 평가 범위

- 학습과 평가 데이터 전체 규모: 2,160만 data point, 데이터셋 13개
- 학습 데이터 명칭: GR00T Pretraining Data
- 수집 방식: 사람, 로봇, 시뮬레이션 혼합. 라벨링은 사람과 자동 혼합
- 데이터 속성: 여러 embodiment에서 수집한 cross-embodiment 데이터, 센서는 RGB 카메라, proprioception, 액추에이터 데이터

평가 항목은 White Paper 정의를 따르며 카드는 다음을 나열한다.

| 구분 | 평가 항목 |
|---|---|
| 시뮬레이션 | 상체 제어 벤치마크, DexMG White Paper 과제 9종, RoboCasa 모바일 manipulator 과제 24종, Digital Cousin GR-1 humanoid manipulation 과제 24종. 성공률은 자동 측정 |
| 실제 로봇 | 장보기 물품 포장, 학습에 없던 새 물체, 인계를 포함한 산업용 다중 로봇 협업. 연구실 관찰자가 사람 판정 |

카드에는 이 평가들의 성공률 수치가 없다. 평가 항목 목록은 N1 White Paper의 평가 구성과 같다.

### 학습 비용

| 항목 | 값 |
|---|---|
| 하드웨어 | GB200 64노드, 노드당 GPU 4개 |
| GPU 전력 가정 | 1,200 W |
| 학습 시간 | 120시간 |
| 계산식 | 64 × 4 × 1200 W × 0.001 × 0.8 × 120 h × 1.4 |
| 총 전력량 | 41,288 kWh |
| 배출량 | 410.5 × 41,288 × 0.000001 = 16.949 tCO2e |

계산식의 0.8은 평균 전력 사용률, 1.4는 데이터센터 부대 설비를 반영한 계수로 보이지만 카드는 각 계수의 의미를 설명하지 않는다. 계산식대로면 학습에 GPU 256개가 쓰였고 GPU 시간은 30,720시간이다.

### 추론 지연 시간

조건은 denoising 4 step, 카메라 1대다. 표의 E2E는 데이터 처리부터 action 출력까지의 전체 지연 시간이고, Frequency는 그 역수로 계산한 초당 추론 횟수다.

| 장치 | 모드 | 데이터 처리 | Backbone | Action Head | E2E | Frequency | 가속비 |
|---|---|---|---|---|---|---|---|
| H100 80GB HBM3 | PyTorch Eager | 6.2 ms | 31.3 ms | 48.2 ms | 85.8 ms | 11.7 Hz | 1.00x |
| | torch.compile | 6.2 ms | 30.4 ms | 12.0 ms | 48.6 ms | 20.6 Hz | 1.77x |
| | TensorRT (Full Pipeline) | 6.2 ms | 8.8 ms | 12.3 ms | 27.9 ms | 35.9 Hz | 3.08x |
| H20 96GB HBM3 | PyTorch Eager | 5.33 ms | 30.8 ms | 47.3 ms | 83.4 ms | 12.0 Hz | 1.00x |
| | torch.compile | 5.33 ms | 31.1 ms | 13.3 ms | 49.7 ms | 20.1 Hz | 1.68x |
| | TensorRT (Full Pipeline) | 5.33 ms | 14.2 ms | 14.5 ms | 34.0 ms | 29.4 Hz | 2.45x |
| RTX Pro 6000 Blackwell | PyTorch Eager | 4.8 ms | 29.3 ms | 44.0 ms | 78.4 ms | 12.8 Hz | 1.00x |
| | torch.compile | 4.8 ms | 29.4 ms | 16.5 ms | 50.7 ms | 19.7 Hz | 1.55x |
| | TensorRT (Full Pipeline) | 4.8 ms | 9.9 ms | 13.2 ms | 27.9 ms | 35.9 Hz | 2.81x |
| RTX Pro 5000 72GB | PyTorch Eager | 8.85 ms | 54.01 ms | 63.19 ms | 126.4 ms | 7.9 Hz | 1.00x |
| | torch.compile | 8.85 ms | 55.74 ms | 20.38 ms | 84.9 ms | 11.8 Hz | 1.49x |
| | TensorRT (Full Pipeline) | 8.85 ms | 14.37 ms | 17.33 ms | 40.5 ms | 24.7 Hz | 3.13x |
| L40 | PyTorch Eager | 6.6 ms | 42.8 ms | 78.9 ms | 128.3 ms | 7.8 Hz | 1.00x |
| | torch.compile | 6.6 ms | 42.7 ms | 19.8 ms | 69.0 ms | 14.5 Hz | 1.86x |
| | TensorRT (Full Pipeline) | 6.6 ms | 13.1 ms | 18.8 ms | 38.4 ms | 26.0 Hz | 3.34x |
| L20 | PyTorch Eager | 5.7 ms | 47.58 ms | 86.92 ms | 140.3 ms | 7.1 Hz | 1.00x |
| | torch.compile | 5.7 ms | 47.2 ms | 20.18 ms | 73.1 ms | 13.7 Hz | 1.92x |
| | TensorRT (Full Pipeline) | 5.7 ms | 17.27 ms | 19.79 ms | 42.8 ms | 23.3 Hz | 3.28x |
| DGX Spark | PyTorch Eager | 13.14 ms | 38.22 ms | 74.94 ms | 126.4 ms | 7.9 Hz | 1.00x |
| | torch.compile | 13.14 ms | 39.23 ms | 56.49 ms | 108.8 ms | 9.2 Hz | 1.16x |
| | TensorRT (Full Pipeline) | 13.14 ms | 33.43 ms | 52.37 ms | 98.6 ms | 10.1 Hz | 1.28x |
| AGX Thor | PyTorch Eager | 8.21 ms | 55.26 ms | 81.65 ms | 144.9 ms | 6.9 Hz | 1.00x |
| | torch.compile | 8.21 ms | 55.59 ms | 64.66 ms | 128.4 ms | 7.8 Hz | 1.13x |
| | TensorRT (Full Pipeline) | 8.21 ms | 28.89 ms | 56.64 ms | 93.8 ms | 10.7 Hz | 1.54x |
| Orin | PyTorch Eager | 9.45 ms | 127.6 ms | 205.39 ms | 342.8 ms | 2.9 Hz | 1.00x |
| | torch.compile | 9.45 ms | 128.59 ms | 78.94 ms | 217.0 ms | 4.6 Hz | 1.58x |
| | TensorRT (DiT-only) | 9.45 ms | 128.38 ms | 78.6 ms | 216.5 ms | 4.6 Hz | 1.58x |

Orin은 TensorRT 10.3이 backbone engine을 지원하지 않아 DiT만 TensorRT로 실행한다(`--inference-mode tensorrt`). 나머지 플랫폼은 전체 파이프라인을 TensorRT로 실행한다(`--inference-mode trt_full_pipeline`).

표에서 확인되는 경향은 세 가지다.

- **PyTorch Eager에서는 action head가 가장 느린 단계다.** H100 기준 48.2 ms로 backbone 31.3 ms보다 길다. denoising step마다 DiT를 다시 실행하기 때문이다.
- **torch.compile은 주로 action head를 줄인다.** H100에서 action head가 48.2 ms에서 12.0 ms로 줄었지만 backbone은 거의 그대로다. 반면 TensorRT 전체 파이프라인은 backbone까지 31.3 ms에서 8.8 ms로 줄인다.
- **edge 플랫폼의 가속 폭은 작다.** 데이터센터 GPU의 TensorRT 가속비가 2.45x~3.34x인 반면 DGX Spark 1.28x, AGX Thor 1.54x, Orin 1.58x다. Orin은 TensorRT를 써도 4.6 Hz에 그친다.

카드의 Inference 절은 별도로 엔진을 PyTorch, 테스트 하드웨어를 A6000으로 적는데, A6000은 위 표에 없다.

### 소프트웨어 통합

| 항목 | 내용 |
|---|---|
| runtime engine | PyTorch |
| 지원 GPU 마이크로아키텍처 | Ampere, Blackwell, Jetson, Hopper, Lovelace |
| 운영체제 | Linux |
| 배포 지역 | 전 세계 |
| 대상 사용자 | 연구자와 오픈소스 커뮤니티(로보틱스 연구와 알고리즘 개발), 개발자(로봇 응용 통합과 커스터마이즈), 스타트업과 기업(개발 가속과 학습 비용 절감) |

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **성공률 수치 부재**: 평가 항목만 나열하고 벤치마크 결과가 없다. N1.7의 성능을 판단하려면 LeRobot 문서의 LIBERO 결과 같은 다른 자료가 필요하다.
- **카드 내부 불일치**: encoder 서술(SigLip2, T5)이 Cosmos-Reason2-2B backbone 문구와 맞지 않고, Cosmos-Reason2-2B 링크가 8B 페이지를 가리키며, Fractal 모델 항목이 Bridge 항목을 복제했다.
- **버전 표기 차이**: 카드는 EA, GitHub README는 GA를 표기한다. `config.json` 값(DiT 32층, `select_layer` 16 등)도 README의 N1.7 설정(16층, 12)과 다르다.
- **배포 전 검증 책임**: 카드는 foundation model과 fine-tuning 모델을 시스템에 통합할 때 use case별 데이터로 추가 시험이 필요하다고 적는다. V-model 방법론에 따라 단위와 시스템 수준에서 반복 시험과 검증을 거치라고 권고한다.
- **사용자 책임 명시**: 입력과 출력의 책임은 사용자에게 있고, 가드레일과 안전 장치를 배포 전에 직접 구현해야 한다. 상세 내용은 Explainability, Bias, Safety and Security, Privacy 하위 카드로 넘긴다.
- **edge 추론 속도**: Orin에서 최대 4.6 Hz, AGX Thor에서 10.7 Hz로, 데이터센터 GPU의 35.9 Hz와 차이가 크다.

## 6. 관련 연구 (Related Work)

- [[physical-ai/nvidia-isaac-gr00t]]: 같은 N1.7 모델의 GitHub 공식 구현. 체크포인트 목록, embodiment tag, 설치 함정, N1.6 대비 변경표를 다룬다.
- [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation]]: 카드가 아키텍처 설명을 위임하는 GR00T N1 White Paper.
- [[physical-ai/nvidia-2025-gr00t-n1-5-an-improved-open]]: 이전 세대 N1.5 공식 페이지.
- [[physical-ai/huggingface-lerobot]]: `groot` policy type으로 이 체크포인트를 불러 쓰는 학습 프레임워크. 통합 문서는 `sources/huggingface-lerobot-groot.md`에 요약했다.
- [[physical-ai/shao-2026-one-step-drifting-action-heads]]: GR00T N1.7의 action head를 단발 평가형으로 바꿔 지연 시간을 줄인 후속 연구.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| GR00T N1.7 EA | 모델 카드가 표기한 버전명. EA는 Early Access, 즉 정식 출시 전 공개 단계 |
| Cosmos-Reason2-2B | N1.7의 VLM backbone. Qwen3-VL 계열 NVIDIA 추론 VLM |
| Gr00tN1d7 | `config.json`의 아키텍처 클래스 이름. N1.7을 `n1d7`로 표기한다 |
| embodiment ID | embodiment tag를 MLP 슬롯 번호에 대응시킨 정수. state 인코딩과 action 디코딩 MLP를 고르는 데 쓴다 |
| TensorRT Full Pipeline | backbone과 action head를 모두 TensorRT engine으로 바꾼 추론 모드 (`trt_full_pipeline`) |
| TensorRT DiT-only | action head인 DiT만 TensorRT로 바꾼 모드 (`tensorrt`). Orin에서 사용 |
| Model Card++ | NVIDIA 모델 카드의 하위 카드 묶음. Explainability, Bias, Safety and Security, Privacy를 따로 기술한다 |

## 8. 그림 후보 (Figure Candidates)

repo 유형이라 `-figures/` 폴더를 만들지 않았다. 아래는 카드 본문에 등장하는 이미지의 원본 URL 목록이며, curated 항목만 `wiki/assets/nvidia-gr00t-n1-7-3b/`에 저장했다. fig02는 약 9.9MB gif라 첫 프레임만 png로 저장했고, fig03은 원본 7558×3942 px를 긴 변 1600 px로 축소했다.

| id | 위치 | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 카드 상단 | Isaac GR00T 로고 배너 | manual | (장식용, 불필요) |
| fig02 | Model Overview 절 | Unitree G1, YAM, AgiBot G1 실행 데모 | manual | ★ wiki 권장 (embodiment 예시) |
| fig03 | Model Architecture 절 | GR00T N1.X dual-system 구조도 | manual | ★ wiki 권장 (architecture) |
