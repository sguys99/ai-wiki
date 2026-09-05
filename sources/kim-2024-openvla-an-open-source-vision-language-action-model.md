---
title: "OpenVLA: An Open-Source Vision-Language-Action Model"
type: paper
year: 2024
category: physical-ai
raw_path: raw/papers/kim-2024-openvla-an-open-source-vision-language-action-model.pdf
raw_filename: "kim-2024-openvla-an-open-source-vision-language-action-model.pdf"
source_collection: external
authors: "Moo Jin Kim·Karl Pertsch·Siddharth Karamcheti (공동 1저자) 외 (Stanford·UC Berkeley·Toyota Research Institute·Google DeepMind·Physical Intelligence·MIT; 지도 Sergey Levine·Percy Liang·Chelsea Finn)"
arxiv_id: "2406.09246"
url: "https://openvla.github.io"
tags: [physical-ai, vla, manipulation, robot-learning]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/kim-2024-openvla-an-open-source-vision-language-action-model/fig01.png
    raw: raw/papers/kim-2024-openvla-an-open-source-vision-language-action-model-figures/fig01.png
    caption: "OpenVLA 개요. 97만 개 OpenX episode로 Prismatic VLM(ViT + Llama 2 7B)을 fine-tune해 'Wipe the table' 같은 지시에 7-DoF action을 내는 closed-loop 제어. data, weights, code 전부 공개 (paper Figure 1)"
    page: 1
    bbox_norm: [0.1436, 0.2512, 0.8326, 0.5346]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/kim-2024-openvla-an-open-source-vision-language-action-model/fig02.png
    raw: raw/papers/kim-2024-openvla-an-open-source-vision-language-action-model-figures/fig02.png
    caption: "OpenVLA 아키텍처. 입력 이미지가 DINOv2, SigLIP 두 encoder를 거쳐 concat되고, MLP projector가 language embedding 공간으로 매핑, Llama 2 7B가 action de-tokenizer로 7-DoF action 출력 (paper Figure 2)"
    page: 4
    bbox_norm: [0.1647, 0.0852, 0.8665, 0.2832]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/kim-2024-openvla-an-open-source-vision-language-action-model/fig03.png
    raw: raw/papers/kim-2024-openvla-an-open-source-vision-language-action-model-figures/fig03.png
    caption: "BridgeData V2 WidowX 결과. 일반화 다섯 항목(visual, motion, physical, semantic, language grounding)에서 OpenVLA가 RT-1-X, Octo, RT-2-X 대비 최고, semantic만 RT-2-X 우세 (paper Figure 3)"
    page: 7
    bbox_norm: [0.0, 0.0833, 0.9417, 0.3056]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/kim-2024-openvla-an-open-source-vision-language-action-model/fig04.png
    raw: raw/papers/kim-2024-openvla-an-open-source-vision-language-action-model-figures/fig04.png
    caption: "Google robot 결과. in-distribution, OOD에서 OpenVLA, RT-2-X가 RT-1-X, Octo를 크게 앞서고 둘은 대등 (paper Figure 4)"
    page: 8
    bbox_norm: [0.4733, 0.317, 0.8521, 0.5366]
    strategy: column-band
    low_confidence: true
    curated: false
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/kim-2024-openvla-an-open-source-vision-language-action-model/fig05.png
    raw: raw/papers/kim-2024-openvla-an-open-source-vision-language-action-model-figures/fig05.png
    caption: "신규 로봇 setup 적응. Franka-Tabletop, Franka-DROID 7개 task에서 Diffusion Policy, Octo, OpenVLA 비교, OpenVLA가 최고 평균 (paper Figure 5)"
    page: 9
    bbox_norm: [0.0, 0.0833, 0.9658, 0.2243]
    strategy: caption-region
    curated: true
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/kim-2024-openvla-an-open-source-vision-language-action-model/fig06.png
    raw: raw/papers/kim-2024-openvla-an-open-source-vision-language-action-model-figures/fig06.png
    caption: "GPU별 추론 속도(Actions/sec). bfloat16, int8, int4, Ada Lovelace(RTX 4090, H100)에서 높은 throughput (paper Figure 6)"
    page: 10
    bbox_norm: [0.1302, 0.5674, 0.5848, 0.7196]
    strategy: manual
    curated: false
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/kim-2024-openvla-an-open-source-vision-language-action-model/fig07.png
    raw: raw/papers/kim-2024-openvla-an-open-source-vision-language-action-model-figures/fig07.png
    caption: "BridgeData V2 WidowX 17개 평가 task 전체 그리드 (visual/motion/physical/semantic gen + language grounding) (paper Figure 7, Appendix)"
    page: 22
    bbox_norm: [0.2799, 0.0833, 0.7201, 0.8042]
    strategy: caption-region
    curated: false
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/kim-2024-openvla-an-open-source-vision-language-action-model/fig08.png
    raw: raw/papers/kim-2024-openvla-an-open-source-vision-language-action-model-figures/fig08.png
    caption: "원본 BridgeData V2 sink 환경의 7개 학습 task. 데모는 end-effector가 대상 바로 위에서 시작 (paper Figure 8, Appendix)"
    page: 25
    bbox_norm: [0.1667, 0.4383, 0.8333, 0.6766]
    strategy: caption-region
    curated: false
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/kim-2024-openvla-an-open-source-vision-language-action-model/fig09.png
    raw: raw/papers/kim-2024-openvla-an-open-source-vision-language-action-model-figures/fig09.png
    caption: "Google robot 12개 평가 task (in-distribution 5 + OOD 7, unseen 배경, 객체, 지시, 인터넷 개념) (paper Figure 9, Appendix)"
    page: 27
    bbox_norm: [0.1667, 0.0833, 0.8333, 0.5255]
    strategy: caption-region
    curated: false
  - id: fig10
    label: Figure 10
    kind: figure
    file: assets/kim-2024-openvla-an-open-source-vision-language-action-model/fig10.png
    raw: raw/papers/kim-2024-openvla-an-open-source-vision-language-action-model-figures/fig10.png
    caption: "Franka-Tabletop fine-tuning 6개 task (in-distribution vs OOD 초기 상태). narrow 3개 + multi-instruction 3개 (paper Figure 10, Appendix)"
    page: 29
    bbox_norm: [0.2314, 0.2382, 0.7686, 0.8072]
    strategy: caption-region
    curated: false
  - id: fig11
    label: Figure 11
    kind: figure
    file: assets/kim-2024-openvla-an-open-source-vision-language-action-model/fig11.png
    raw: raw/papers/kim-2024-openvla-an-open-source-vision-language-action-model-figures/fig11.png
    caption: "Franka-DROID 'Wipe Table' task (in-distribution vs distractor OOD) (paper Figure 11, Appendix)"
    page: 31
    bbox_norm: [0.2961, 0.3097, 0.7039, 0.4669]
    strategy: caption-region
    curated: false
  - id: tab01
    label: Table 1
    kind: table
    file: assets/kim-2024-openvla-an-open-source-vision-language-action-model/tab01.png
    raw: raw/papers/kim-2024-openvla-an-open-source-vision-language-action-model-figures/tab01.png
    caption: "parameter-efficient fine-tuning 비교. LoRA r=32가 1.4% 파라미터로 full FT 성능 매칭, VRAM은 절반 이하 (paper Table 1)"
    page: 10
    bbox_norm: [0.4102, 0.2674, 0.9198, 0.3736]
    strategy: manual
    curated: true
  - id: tab02
    label: Table 2
    kind: table
    file: assets/kim-2024-openvla-an-open-source-vision-language-action-model/tab02.png
    raw: raw/papers/kim-2024-openvla-an-open-source-vision-language-action-model-figures/tab02.png
    caption: "양자화 추론 성능. int4가 bfloat16 성능 유지, GPU 메모리 절반 이하(16.8→7.0GB) (paper Table 2)"
    page: 10
    bbox_norm: [0.5602, 0.5994, 0.9198, 0.7076]
    strategy: manual
    curated: true
  - id: tab03
    label: Table 3
    kind: table
    file: assets/kim-2024-openvla-an-open-source-vision-language-action-model/tab03.png
    raw: raw/papers/kim-2024-openvla-an-open-source-vision-language-action-model-figures/tab03.png
    caption: "OpenVLA 학습 데이터 mixture. OpenX 25개 dataset 비율 (Octo 가중치 기반) (paper Table 3, Appendix)"
    page: 21
    bbox_norm: [0.3298, 0.1463, 0.6702, 0.5615]
    strategy: table-region
    curated: false
  - id: tab04
    label: Table 4
    kind: table
    file: assets/kim-2024-openvla-an-open-source-vision-language-action-model/tab04.png
    raw: raw/papers/kim-2024-openvla-an-open-source-vision-language-action-model-figures/tab04.png
    caption: "BridgeData V2 WidowX 상세 결과. 17 task × 4 policy 성공 횟수, OpenVLA 70.6% (paper Table 4, Appendix)"
    page: 26
    bbox_norm: [0.1667, 0.2819, 0.8333, 0.4883]
    strategy: table-region
    curated: false
  - id: tab05
    label: Table 5
    kind: table
    file: assets/kim-2024-openvla-an-open-source-vision-language-action-model/tab05.png
    raw: raw/papers/kim-2024-openvla-an-open-source-vision-language-action-model-figures/tab05.png
    caption: "양자화 추론 상세 결과. 8개 대표 task (paper Table 5, Appendix)"
    page: 26
    bbox_norm: [0.1667, 0.5723, 0.8334, 0.7145]
    strategy: table-region
    curated: false
  - id: tab06
    label: Table 6
    kind: table
    file: assets/kim-2024-openvla-an-open-source-vision-language-action-model/tab06.png
    raw: raw/papers/kim-2024-openvla-an-open-source-vision-language-action-model-figures/tab06.png
    caption: "Google robot 상세 결과. 12 task × 4 policy, OpenVLA 85.0% / RT-2-X 78.3% (paper Table 6, Appendix)"
    page: 28
    bbox_norm: [0.1667, 0.5832, 0.8333, 0.755]
    strategy: table-region
    curated: false
  - id: tab07
    label: Table 7
    kind: table
    file: assets/kim-2024-openvla-an-open-source-vision-language-action-model/tab07.png
    raw: raw/papers/kim-2024-openvla-an-open-source-vision-language-action-model-figures/tab07.png
    caption: "데이터 효율 적응 상세. Franka-Tabletop, Franka-DROID, OpenVLA 최고 평균(67.2, 58.3%) (paper Table 7, Appendix)"
    page: 32
    bbox_norm: [0.1552, 0.1984, 0.8448, 0.3776]
    strategy: manual
    curated: false
  - id: tab08
    label: Table 8
    kind: table
    file: assets/kim-2024-openvla-an-open-source-vision-language-action-model/tab08.png
    raw: raw/papers/kim-2024-openvla-an-open-source-vision-language-action-model-figures/tab08.png
    caption: "parameter-efficient fine-tuning 상세. task별 full FT/LoRA/sandwich 성능 (paper Table 8, Appendix)"
    page: 32
    bbox_norm: [0.1552, 0.4154, 0.8448, 0.4976]
    strategy: manual
    curated: false
  - id: tab09
    label: Table 9
    kind: table
    file: assets/kim-2024-openvla-an-open-source-vision-language-action-model/tab09.png
    raw: raw/papers/kim-2024-openvla-an-open-source-vision-language-action-model-figures/tab09.png
    caption: "BridgeData V2 ablation. OpenX training(+30%p)과 fused DINOv2+SigLIP encoder(+5%p) 효과 (paper Table 9, Appendix)"
    page: 34
    bbox_norm: [0.1667, 0.1805, 0.8334, 0.3078]
    strategy: table-region
    curated: false
  - id: tab10
    label: Table 10
    kind: table
    file: assets/kim-2024-openvla-an-open-source-vision-language-action-model/tab10.png
    raw: raw/papers/kim-2024-openvla-an-open-source-vision-language-action-model-figures/tab10.png
    caption: "fine-tuned vs frozen vision encoder. vision encoder를 fine-tune하면 80.0% vs 46.7% (paper Table 10, Appendix)"
    page: 35
    bbox_norm: [0.1667, 0.2057, 0.8333, 0.3739]
    strategy: table-region
    curated: false
  - id: tab11
    label: Table 11
    kind: table
    file: assets/kim-2024-openvla-an-open-source-vision-language-action-model/tab11.png
    raw: raw/papers/kim-2024-openvla-an-open-source-vision-language-action-model-figures/tab11.png
    caption: "blocking control 양자화 추론. 추론 속도 영향을 제거하면 int8이 bfloat16, int4와 대등 (paper Table 11, Appendix)"
    page: 35
    bbox_norm: [0.1667, 0.7561, 0.8334, 0.8991]
    strategy: table-region
    curated: false
  - id: tab12
    label: Table 12
    kind: table
    file: assets/kim-2024-openvla-an-open-source-vision-language-action-model/tab12.png
    raw: raw/papers/kim-2024-openvla-an-open-source-vision-language-action-model-figures/tab12.png
    caption: "LIBERO 시뮬레이션 벤치마크. 4개 task suite에서 fine-tuned OpenVLA가 최고 평균 성공률, rank (paper Table 12, Appendix)"
    page: 37
    bbox_norm: [0.1667, 0.7322, 0.8334, 0.7946]
    strategy: table-region
    curated: false
---

## 한 줄 요약 (One-line Summary)

OpenVLA는 오픈소스 vision-language-action 모델이다. Prismatic-7B VLM을 Open X-Embodiment의 97만 개 시연 데이터(demonstration)로 fine-tune한 7B 모델이다. 파라미터는 55B RT-2-X의 7분의 1인데 29개 task 절대 성공률은 16.5%p 더 높다. LoRA와 양자화를 결합해 소비자 GPU에서도 구동할 수 있다.

## 1. 자료 정보 (Document Information)

- **제목**: OpenVLA: An Open-Source Vision-Language-Action Model
- **저자**: Moo Jin Kim, Karl Pertsch, Siddharth Karamcheti (공동 1저자) 외. Stanford, UC Berkeley, Toyota Research Institute, Google DeepMind, Physical Intelligence, MIT. 지도 Sergey Levine, Percy Liang, Chelsea Finn
- **발표**: arXiv 2406.09246 (v3, 2024-09-05), CoRL 2024
- **프로젝트**: https://openvla.github.io (model checkpoint, PyTorch codebase, fine-tuning notebook 공개)
- **한 줄 성격**: RT-2 계보의 오픈소스 버전. VLA를 "새 파라미터와 새 아키텍처 없이 fine-tune으로 만든다"는 레시피를 열고, 여기에 efficient fine-tuning과 양자화를 처음 붙였다.

## 2. 주요 기여 (Key Contributions)

OpenVLA는 완전히 공개된 첫 generalist VLA다. VLA는 vision-language-action model의 약어로, 이미지와 언어 지시를 받아 로봇 제어 action을 곧바로 내놓는 모델이다. 기존 VLA는 사정이 달랐다. RT-2나 RT-2-X는 아키텍처도, 학습 절차도, 데이터 혼합도 모두 비공개였다. OpenVLA는 model weights와 PyTorch 학습 코드, fine-tuning notebook, 데이터 혼합까지 전부 연다.

backbone으로는 Prismatic-7B VLM을 쓴다. 여기에 Open X-Embodiment에서 추린 실세계 시연 데이터 97만 개로 fine-tune했다. fine-tuning은 pre-training된 모델을 특정 과제 데이터로 더 학습시키는 단계다. OpenVLA는 이 단계를 거쳐 VLM을 로봇 action을 예측하는 policy로 바꾼다. policy는 현재 observation을 받아 다음 action을 정하는 함수다.

규모를 줄이고도 성능은 오히려 높다. 55B RT-2-X를 상대로 29개 task와 복수 robot embodiment의 절대 성공률에서 16.5%p 앞서면서 파라미터는 7배 적다. from-scratch imitation learning인 Diffusion Policy와 견줘도 multi-object language grounding task에서 20.4%p 앞선다.

efficient fine-tuning도 VLA에서 처음 시도했다. LoRA(rank=32)는 전체 파라미터의 1.4%만 학습하는데도 full fine-tuning 성능을 따라잡았다. int4 양자화는 성능을 떨어뜨리지 않으면서 GPU 메모리를 절반 이하로 줄여 서빙 문턱을 낮췄다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### backbone과 vision encoder

OpenVLA의 토대는 Prismatic-7B VLM이다. vision encoder와 projector, LLM backbone으로 이어지는 표준 VLM 구조를 그대로 따른다. 다만 vision encoder를 하나가 아니라 둘 쓴다. 이미지 패치를 SigLIP과 DINOv2 두 encoder에 각각 통과시킨 뒤 feature vector를 채널 방향으로 concat한다. CLIP이나 SigLIP 하나만 쓰는 흔한 구성과 달리 DINOv2를 더하면 저수준 공간 정보가 보강돼 로봇 제어에 필요한 spatial reasoning이 좋아진다. 전체는 600M 파라미터 vision encoder와 2-layer MLP projector, Llama 2 7B backbone으로 이뤄진다.

### action을 언어로 적기

OpenVLA는 action 예측을 vision-language 과제로 바꾼다. 이미지 observation과 "What should the robot do to {task}? A:" 형식의 지시를 넣으면 action 문자열이 나온다. 연속값인 action은 LLM이 그대로 다루지 못한다. 그래서 각 action 차원을 256개 bin으로 균등 이산화하되 min-max가 아니라 1st~99th quantile 구간을 쓴다. outlier action이 간격을 넓혀 실효 해상도를 떨어뜨리는 것을 막기 위해서다.

토큰이 부족한 문제도 하나 있다. Llama tokenizer는 fine-tuning용 special token을 100개만 예약해 둬서 action 토큰 256개를 감당하지 못한다. 그래서 RT-2처럼 vocabulary에서 가장 덜 쓰이는 256개 토큰을 action 토큰으로 덮어쓴다. 학습 목표는 next-token prediction 하나이며 cross-entropy는 action 토큰에만 매긴다. 최종 출력은 7-DoF action(end-effector 변위 Δx, 회전 Δθ, gripper ΔGrip)이고 action de-tokenizer가 이 토큰을 다시 연속값으로 되돌린다.

### 학습 데이터 curation

학습 데이터의 출처는 Open X-Embodiment(OpenX)다. 70개가 넘는 개별 robot dataset과 200만 개 이상의 trajectory를 한데 모은 것이다. trajectory는 observation과 action이 시간순으로 이어진 실행 기록이다. 여기서 두 기준으로 데이터를 추린다. 입력과 출력 공간을 맞추려고 3인칭 카메라를 1대 이상 갖추고 single-arm end-effector로 제어하는 dataset만 남긴다. embodiment와 task와 scene 분포가 고르도록 Octo의 mixture weight도 그대로 가져온다. 이렇게 추린 결과가 97만 개 시연 데이터다. DROID dataset은 10% 가중으로 넣었지만 action token 정확도가 끝까지 오르지 않아 학습 마지막 1/3 구간에서 뺐다.

### 핵심 설계 결정

아래는 작은 규모 실험(BridgeData V2)으로 정한 선택들이다.

- **VLM backbone**: Prismatic > LLaVA > IDEFICS-1. language grounding에서 LLaVA가 IDEFICS-1을 35%p 앞서고 Prismatic이 다시 LLaVA를 약 10%p 앞선다. fused SigLIP-DINOv2의 spatial reasoning 덕으로 본다.
- **이미지 해상도**: 224×224px와 384×384px가 성능은 같은데 후자가 3배 느려 224px로 정했다.
- **vision encoder fine-tune**: VLM 통념과 반대로 vision encoder를 얼리지 않고 함께 fine-tune하는 편이 VLA 성능에 결정적이었다(80.0% vs frozen 46.7%). pretrained backbone만으로는 제어에 필요한 fine-grained 공간 정보가 부족하기 때문으로 본다.
- **학습 epoch**: LLM/VLM은 보통 1~2 epoch로 끝내지만 VLA는 다르다. action token 정확도가 95%를 넘을 때까지 훨씬 더 돌려야 성능이 계속 오른다. 최종 27 epoch.
- **learning rate**: 2e-5 고정이며 VLM pre-training과 같은 값이다. warmup은 이득이 없었다.

### 학습과 추론 인프라

학습에는 A100 GPU 64장으로 14일이 걸렸다. 총 21,500 A100-hour, batch size는 2048이었다. 추론은 bfloat16 기준 15GB GPU 메모리에서 돌아가며 RTX 4090 한 장에서 약 6Hz가 나온다. control frequency는 로봇이 1초에 몇 번 새로운 action을 갱신하는지를 뜻한다. 로컬 연산 자원이 넉넉하지 않아도 제어할 수 있도록 원격 추론 서버도 함께 공개했다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### out-of-the-box 제어 (별도 fine-tuning 없이)

별도 fine-tuning 없이 두 robot embodiment에서 성능을 잰다. BridgeData V2 WidowX(17 task, 170 rollout)에서는 OpenVLA가 70.6%로 RT-2-X(50.6), Octo(20.0), RT-1-X(18.5)를 모두 앞선다. Google robot(12 task, 60 rollout)에서는 OpenVLA 85.0%와 RT-2-X 78.3%가 대등하고 둘 다 RT-1-X(33.3)와 Octo(26.7)를 크게 웃돈다. RT-2-X가 앞서는 항목은 semantic generalization 하나뿐이다. 인터넷 pre-training 데이터를 로봇 action과 함께 co-fine-tune해 pre-training 지식을 더 잘 지켰기 때문이다. OpenVLA가 BridgeData V2에서 특히 강한 데는 97만 개(RT-2-X는 35만 개)라는 규모, all-zero action 필터링 같은 꼼꼼한 전처리, fused vision encoder가 함께 작용한다.

### 신규 robot setup 적응 (fine-tuning)

새 로봇 환경에는 fine-tuning으로 맞춘다. Franka-Tabletop과 Franka-DROID에서 시연 데이터 10~150개로 fine-tune했다. task 성격에 따라 강점이 갈린다. Diffusion Policy는 Put Carrot in Bowl 같은 narrow single-instruction task에 강하고 OpenVLA와 Octo는 여러 객체와 언어 지시가 얽힌 diverse multi-instruction task에 강하다. 집계 성능은 OpenVLA가 가장 높다(Franka-Tabletop 67.2%, Franka-DROID 58.3%). 모든 task에서 50% 이상을 낸 모델은 OpenVLA뿐이다. imitation learning의 든든한 기본값으로 삼을 만하다. 다만 매우 정교한 highly dexterous task에서는 Diffusion Policy의 trajectory가 더 매끄럽다. 이 지점은 action chunking과 temporal smoothing을 붙이는 후속 과제로 남겼다.

### parameter-efficient fine-tuning (Table 1)

어떤 부분을 학습시키느냐가 성능을 가른다. last-layer-only나 frozen-vision은 성능이 나쁘다. target scene에 맞춰 visual feature를 적응시키는 일이 그만큼 중요하다. 최고의 성능과 메모리 트레이드오프는 LoRA(rank=32/64)에서 나온다. LoRA는 저랭크 행렬만 학습해 fine-tuning 비용을 줄이는 기법인데 전체 파라미터의 1.4%만 학습하고도 full fine-tuning(69.7%)에 맞먹는 68.2%를 냈다. rank는 성능에 거의 영향이 없어 기본값 r=32를 권한다. LoRA를 쓰면 A100 한 장에서 10~15시간이면 fine-tune이 끝나 full fine-tuning보다 연산이 8배 적다.

### 양자화 추론 (Table 2)

양자화는 가중치를 낮은 비트 수로 줄여 모델을 압축하는 기법이다. int4는 bfloat16(71.3%)과 사실상 같은 71.9%를 내면서 GPU 메모리를 16.8GB에서 7.0GB로 절반 아래까지 줄인다. 반면 int8은 오히려 58.1%로 떨어진다. 양자화 연산 overhead 탓에 추론 속도가 1.2Hz까지 느려져 5Hz non-blocking controller의 system dynamics가 바뀌기 때문이다. blocking control로 속도 영향을 없애면 int8도 bfloat16, int4와 대등해지는데(Table 11) 이 해석과 들어맞는다.

### ablation (Table 9와 10)

성능을 가르는 가장 큰 요인은 OpenX 학습이다. Bridge만으로 학습한 OpenVLA-Bridge는 30%p나 낮다. fused DINOv2+SigLIP encoder는 SigLIP 단독보다 5%p를 보태지만 OpenX 학습만큼 크지는 않다. vision encoder를 fine-tune했을 때와 freeze했을 때는 80.0% 대 46.7%로 차이가 크다.

### 시뮬레이션 (LIBERO, Table 12)

실세계 데이터로만 pre-train한 OpenVLA를 LIBERO의 4개 task suite에 LoRA로 fine-tune했다. 그 결과 평균 성공률과 rank 모두 1위(76.5%)를 기록했다. 다만 실세계 fine-tuning만큼 큰 격차는 아니다. sim-real domain gap 때문으로 본다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **단일 이미지 입력만 지원**: proprioception, observation history, multi-image는 아직 받지 못한다. interleaved image-text로 pre-train된 VLM을 쓰면 더 유연한 입력을 받을 수 있다.
- **추론 throughput**: 6Hz에 그쳐 ALOHA(50Hz)급 고빈도 양손 조작에는 올리지 못한다. action chunking과 speculative decoding이 후속 방향이다.
- **신뢰성**: prior policy보다는 낫지만 성공률이 대개 90%에 못 미쳐 아직 충분히 높지 않다.
- **미해결 설계 질문**: base VLM 크기가 VLA 성능에 미치는 영향, 로봇 action과 인터넷 데이터를 co-training했을 때의 효과, VLA에 가장 알맞은 visual feature가 무엇인지는 연산 제약 탓에 답을 남겨뒀다.

## 6. 관련 연구 (Related Work)

- **VLM**: Prismatic(backbone), PaLI, LLaVA. 최근 VLM은 vision transformer 패치를 토큰처럼 다뤄 language model에 투영하는 "patch-as-token" 구조로 수렴했다. OpenVLA는 이 도구를 VLA 학습에 그대로 가져다 쓴다.
- **generalist robot policy**: Octo, RT-1-X. Octo 같은 기존 방식은 pretrained component에 scratch로 초기화한 모듈을 이어 붙여(stitch) 학습한다. 반면 OpenVLA는 VLM을 통째로 end-to-end fine-tune해 action을 language token으로 낸다.
- **VLA**: RT-2, RT-2-X. RT-2-X는 OpenX로 학습한 55B closed VLA로 직전 SOTA다. OpenVLA는 더 풍부한 로봇 pre-training과 open VLM을 결합해 한 자릿수 작은 크기로도 RT-2-X를 앞선다. VLA에서 fine-tuning을 처음 깊이 다뤘고 PEFT와 양자화도 처음 적용했다. 최초의 오픈소스 generalist VLA이기도 하다.

## 7. 용어집 (Glossary)

이 자료 고유 용어만 정리한다. policy, observation, trajectory, fine-tuning, 양자화 등 도메인 공통 용어는 [[overviews/glossary-physical-ai]]와 [[overviews/glossary-llms]]에 위임한다.

- **OpenVLA**: Prismatic-7B VLM을 97만 개 OpenX 시연 데이터로 fine-tune한 7B 오픈소스 VLA.
- **Prismatic VLM**: SigLIP과 DINOv2 두 encoder를 fused한 vision backbone + Llama 2 7B로 이뤄진 VLM. OpenVLA의 backbone.
- **Open X-Embodiment (OpenX)**: 70개 이상 robot dataset과 200만 개 이상의 trajectory를 통합한 공개 데이터셋. OpenVLA 학습 데이터의 원천.
- **action de-tokenizer**: LLM이 낸 이산 action 토큰을 다시 연속 제어값(7-DoF)으로 되돌리는 모듈.
- **sandwich fine-tuning**: vision encoder와 token embedding과 마지막 layer만 풀고 나머지는 freeze하는 PEFT 변형. LoRA보다 성능과 메모리 모두 뒤진다.
- **DROID**: 최근 공개된 대규모 in-the-wild Franka manipulation dataset. 학습에 10% 넣었으나 수렴이 느려 마지막 1/3에서 제외.
- **LIBERO**: 로봇 lifelong learning 시뮬레이션 벤치마크(Spatial, Object, Goal, Long 4 suite). OpenVLA의 시뮬레이션 적응성 검증에 사용.

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 1 | OpenVLA 전체 개요 (데이터→VLM→closed-loop 제어) | caption-region | ★ wiki 권장 (concept) |
| fig02 | 4 | 모델 아키텍처 (DINOv2+SigLIP→projector→Llama 2 7B→de-tokenizer) | caption-region | ★ wiki 권장 (architecture) |
| fig03 | 7 | BridgeData V2 WidowX 결과 (일반화 5축 막대그래프) | caption-region | ★ wiki 권장 (result) |
| fig04 | 8 | Google robot 결과 (in-dist/OOD) | column-band | (선택) |
| fig05 | 9 | 신규 robot setup 적응 (vs Diffusion Policy, Octo) | caption-region | ★ wiki 권장 (result) |
| fig06 | 10 | GPU별 추론 속도 (bf16/int8/int4) | manual | (선택) |
| fig07 | 22 | BridgeData V2 17개 평가 task 그리드 (Appendix) | caption-region | (선택) |
| fig08 | 25 | 원본 BridgeData V2 sink 7개 학습 task (Appendix) | caption-region | (선택) |
| fig09 | 27 | Google robot 12개 평가 task (Appendix) | caption-region | (선택) |
| fig10 | 29 | Franka-Tabletop fine-tuning 6개 task (Appendix) | caption-region | (선택) |
| fig11 | 31 | Franka-DROID Wipe Table task (Appendix) | caption-region | (선택) |
| tab01 | 10 | PEFT 비교. LoRA 1.4% params로 full FT 매칭 | manual | ★ wiki 권장 (result) |
| tab02 | 10 | 양자화 추론. int4가 bf16 성능 유지, VRAM 절반 | manual | ★ wiki 권장 (result) |
| tab03 | 21 | 학습 데이터 mixture (OpenX 25개 dataset) | table-region | (선택) |
| tab04 | 26 | BridgeData V2 상세 결과 (17 task) | table-region | (선택) |
| tab05 | 26 | 양자화 추론 상세 (8 task) | table-region | (선택) |
| tab06 | 28 | Google robot 상세 결과 (12 task) | table-region | (선택) |
| tab07 | 32 | 데이터 효율 적응 상세 | manual | (선택) |
| tab08 | 32 | PEFT 상세 | manual | (선택) |
| tab09 | 34 | BridgeData V2 ablation (OpenX와 fused encoder) | table-region | (선택) |
| tab10 | 35 | fine-tuned vs frozen vision encoder | table-region | (선택) |
| tab11 | 35 | blocking control 양자화 (int8 회복) | table-region | (선택) |
| tab12 | 37 | LIBERO 시뮬레이션 벤치마크 | table-region | (선택) |

**큐레이션 확정(Step 3.5)**: fig01, fig02, fig03, fig05, tab01, tab02 → `curated: true`. 나머지는 아카이브 보존.
