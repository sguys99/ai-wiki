---
title: "OpenVLA: An Open-Source Vision-Language-Action Model"
type: paper
year: 2024
category: physical-ai
source: kim-2024-openvla-an-open-source-vision-language-action-model.md
raw_path: /home/sguys99/project/ai-wiki/raw/papers/kim-2024-openvla-an-open-source-vision-language-action-model.pdf
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
    caption: "OpenVLA 개요 — 970k OpenX episode로 Prismatic VLM(ViT + Llama 2 7B)을 fine-tune해 'Wipe the table' 같은 지시에 7-DoF action을 내는 closed-loop 제어. data·weights·code 전부 공개 (paper Figure 1)"
    page: 1
    bbox_norm: [0.1436, 0.2512, 0.8326, 0.5346]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/kim-2024-openvla-an-open-source-vision-language-action-model/fig02.png
    raw: raw/papers/kim-2024-openvla-an-open-source-vision-language-action-model-figures/fig02.png
    caption: "OpenVLA 아키텍처 — 입력 이미지가 DINOv2·SigLIP 두 encoder를 거쳐 concat되고, MLP projector가 language embedding 공간으로 매핑, Llama 2 7B가 action de-tokenizer로 7-DoF action 출력 (paper Figure 2)"
    page: 4
    bbox_norm: [0.1647, 0.0852, 0.8665, 0.2832]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/kim-2024-openvla-an-open-source-vision-language-action-model/fig03.png
    raw: raw/papers/kim-2024-openvla-an-open-source-vision-language-action-model-figures/fig03.png
    caption: "BridgeData V2 WidowX 결과 — 일반화 5축(visual·motion·physical·semantic·language grounding)에서 OpenVLA가 RT-1-X·Octo·RT-2-X 대비 최고, semantic만 RT-2-X 우세 (paper Figure 3)"
    page: 7
    bbox_norm: [0.0, 0.0833, 0.9417, 0.3056]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/kim-2024-openvla-an-open-source-vision-language-action-model/fig04.png
    raw: raw/papers/kim-2024-openvla-an-open-source-vision-language-action-model-figures/fig04.png
    caption: "Google robot 결과 — in-distribution·OOD에서 OpenVLA·RT-2-X가 RT-1-X·Octo를 크게 앞서고 둘은 대등 (paper Figure 4)"
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
    caption: "신규 로봇 setup 적응 — Franka-Tabletop·Franka-DROID 7개 task에서 Diffusion Policy·Octo·OpenVLA 비교, OpenVLA가 최고 평균 (paper Figure 5)"
    page: 9
    bbox_norm: [0.0, 0.0833, 0.9658, 0.2243]
    strategy: caption-region
    curated: true
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/kim-2024-openvla-an-open-source-vision-language-action-model/fig06.png
    raw: raw/papers/kim-2024-openvla-an-open-source-vision-language-action-model-figures/fig06.png
    caption: "GPU별 추론 속도(Actions/sec) — bfloat16·int8·int4, Ada Lovelace(RTX 4090·H100)에서 높은 throughput (paper Figure 6)"
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
    caption: "원본 BridgeData V2 sink 환경의 7개 학습 task — 데모는 end-effector가 대상 바로 위에서 시작 (paper Figure 8, Appendix)"
    page: 25
    bbox_norm: [0.1667, 0.4383, 0.8333, 0.6766]
    strategy: caption-region
    curated: false
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/kim-2024-openvla-an-open-source-vision-language-action-model/fig09.png
    raw: raw/papers/kim-2024-openvla-an-open-source-vision-language-action-model-figures/fig09.png
    caption: "Google robot 12개 평가 task (in-distribution 5 + OOD 7, unseen 배경·객체·지시·인터넷 개념) (paper Figure 9, Appendix)"
    page: 27
    bbox_norm: [0.1667, 0.0833, 0.8333, 0.5255]
    strategy: caption-region
    curated: false
  - id: fig10
    label: Figure 10
    kind: figure
    file: assets/kim-2024-openvla-an-open-source-vision-language-action-model/fig10.png
    raw: raw/papers/kim-2024-openvla-an-open-source-vision-language-action-model-figures/fig10.png
    caption: "Franka-Tabletop fine-tuning 6개 task (in-distribution vs OOD 초기 상태) — narrow 3개 + multi-instruction 3개 (paper Figure 10, Appendix)"
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
    caption: "parameter-efficient fine-tuning 비교 — LoRA r=32가 1.4% 파라미터로 full FT 성능 매칭, VRAM은 절반 이하 (paper Table 1)"
    page: 10
    bbox_norm: [0.4102, 0.2674, 0.9198, 0.3736]
    strategy: manual
    curated: true
  - id: tab02
    label: Table 2
    kind: table
    file: assets/kim-2024-openvla-an-open-source-vision-language-action-model/tab02.png
    raw: raw/papers/kim-2024-openvla-an-open-source-vision-language-action-model-figures/tab02.png
    caption: "양자화 추론 성능 — int4가 bfloat16 성능 유지, GPU 메모리 절반 이하(16.8→7.0GB) (paper Table 2)"
    page: 10
    bbox_norm: [0.5602, 0.5994, 0.9198, 0.7076]
    strategy: manual
    curated: true
  - id: tab03
    label: Table 3
    kind: table
    file: assets/kim-2024-openvla-an-open-source-vision-language-action-model/tab03.png
    raw: raw/papers/kim-2024-openvla-an-open-source-vision-language-action-model-figures/tab03.png
    caption: "OpenVLA 학습 데이터 mixture — OpenX 25개 dataset 비율 (Octo 가중치 기반) (paper Table 3, Appendix)"
    page: 21
    bbox_norm: [0.3298, 0.1463, 0.6702, 0.5615]
    strategy: table-region
    curated: false
  - id: tab04
    label: Table 4
    kind: table
    file: assets/kim-2024-openvla-an-open-source-vision-language-action-model/tab04.png
    raw: raw/papers/kim-2024-openvla-an-open-source-vision-language-action-model-figures/tab04.png
    caption: "BridgeData V2 WidowX 상세 결과 — 17 task × 4 policy 성공 횟수, OpenVLA 70.6% (paper Table 4, Appendix)"
    page: 26
    bbox_norm: [0.1667, 0.2819, 0.8333, 0.4883]
    strategy: table-region
    curated: false
  - id: tab05
    label: Table 5
    kind: table
    file: assets/kim-2024-openvla-an-open-source-vision-language-action-model/tab05.png
    raw: raw/papers/kim-2024-openvla-an-open-source-vision-language-action-model-figures/tab05.png
    caption: "양자화 추론 상세 결과 — 8개 대표 task (paper Table 5, Appendix)"
    page: 26
    bbox_norm: [0.1667, 0.5723, 0.8334, 0.7145]
    strategy: table-region
    curated: false
  - id: tab06
    label: Table 6
    kind: table
    file: assets/kim-2024-openvla-an-open-source-vision-language-action-model/tab06.png
    raw: raw/papers/kim-2024-openvla-an-open-source-vision-language-action-model-figures/tab06.png
    caption: "Google robot 상세 결과 — 12 task × 4 policy, OpenVLA 85.0% / RT-2-X 78.3% (paper Table 6, Appendix)"
    page: 28
    bbox_norm: [0.1667, 0.5832, 0.8333, 0.755]
    strategy: table-region
    curated: false
  - id: tab07
    label: Table 7
    kind: table
    file: assets/kim-2024-openvla-an-open-source-vision-language-action-model/tab07.png
    raw: raw/papers/kim-2024-openvla-an-open-source-vision-language-action-model-figures/tab07.png
    caption: "데이터 효율 적응 상세 — Franka-Tabletop·Franka-DROID, OpenVLA 최고 평균(67.2·58.3%) (paper Table 7, Appendix)"
    page: 32
    bbox_norm: [0.1552, 0.1984, 0.8448, 0.3776]
    strategy: manual
    curated: false
  - id: tab08
    label: Table 8
    kind: table
    file: assets/kim-2024-openvla-an-open-source-vision-language-action-model/tab08.png
    raw: raw/papers/kim-2024-openvla-an-open-source-vision-language-action-model-figures/tab08.png
    caption: "parameter-efficient fine-tuning 상세 — task별 full FT/LoRA/sandwich 성능 (paper Table 8, Appendix)"
    page: 32
    bbox_norm: [0.1552, 0.4154, 0.8448, 0.4976]
    strategy: manual
    curated: false
  - id: tab09
    label: Table 9
    kind: table
    file: assets/kim-2024-openvla-an-open-source-vision-language-action-model/tab09.png
    raw: raw/papers/kim-2024-openvla-an-open-source-vision-language-action-model-figures/tab09.png
    caption: "BridgeData V2 ablation — OpenX training(+30%p)과 fused DINOv2+SigLIP encoder(+5%p) 효과 (paper Table 9, Appendix)"
    page: 34
    bbox_norm: [0.1667, 0.1805, 0.8334, 0.3078]
    strategy: table-region
    curated: false
  - id: tab10
    label: Table 10
    kind: table
    file: assets/kim-2024-openvla-an-open-source-vision-language-action-model/tab10.png
    raw: raw/papers/kim-2024-openvla-an-open-source-vision-language-action-model-figures/tab10.png
    caption: "fine-tuned vs frozen vision encoder — vision encoder를 fine-tune하면 80.0% vs 46.7% (paper Table 10, Appendix)"
    page: 35
    bbox_norm: [0.1667, 0.2057, 0.8333, 0.3739]
    strategy: table-region
    curated: false
  - id: tab11
    label: Table 11
    kind: table
    file: assets/kim-2024-openvla-an-open-source-vision-language-action-model/tab11.png
    raw: raw/papers/kim-2024-openvla-an-open-source-vision-language-action-model-figures/tab11.png
    caption: "blocking control 양자화 추론 — 추론 속도 영향을 제거하면 int8이 bfloat16·int4와 대등 (paper Table 11, Appendix)"
    page: 35
    bbox_norm: [0.1667, 0.7561, 0.8334, 0.8991]
    strategy: table-region
    curated: false
  - id: tab12
    label: Table 12
    kind: table
    file: assets/kim-2024-openvla-an-open-source-vision-language-action-model/tab12.png
    raw: raw/papers/kim-2024-openvla-an-open-source-vision-language-action-model-figures/tab12.png
    caption: "LIBERO 시뮬레이션 벤치마크 — 4개 task suite에서 fine-tuned OpenVLA가 최고 평균 성공률·rank (paper Table 12, Appendix)"
    page: 37
    bbox_norm: [0.1667, 0.7322, 0.8334, 0.7946]
    strategy: table-region
    curated: false
---

## 요약 (Summary)

OpenVLA는 RT-2 계보의 오픈소스 버전이다. 970k개 실세계 robot demonstration으로 Prismatic-7B VLM을 fine-tune해 7B짜리 vision-language-action 모델을 만들었다. VLA는 vision-language-action model의 약어로, 이미지와 언어 지시를 받아 로봇 제어 action을 직접 출력하는 모델을 말한다. 55B RT-2-X를 29개 task 절대 성공률에서 16.5%p 앞서는데 파라미터는 7배 작다.

![[assets/kim-2024-openvla-an-open-source-vision-language-action-model/fig01.png]]
*Figure 1: OpenVLA 개요 — 970k OpenX episode로 Prismatic VLM을 fine-tune해 "Wipe the table" 지시에 7-DoF action을 내는 closed-loop 제어. data·weights·code 전부 공개 (Kim et al. 2024, p.1)*

이 논문의 값어치는 성능보다 공개성과 실용성에 있다. 기존 VLA는 아키텍처·학습 절차·데이터 혼합이 모두 닫혀 있어 연구 기반이 되지 못했다. OpenVLA는 model weights, PyTorch 학습 코드, fine-tuning notebook을 전부 열었고 여기에 두 가지 실전 레시피를 처음 붙였다. LoRA로 소비자 GPU에서 fine-tune하는 법, 양자화로 메모리를 절반으로 줄여 서빙하는 법이다. 오픈소스 LLM 생태계가 커진 방식을 로봇으로 옮기려는 시도다.

## 주요 기여 (Key Contributions)

처음으로 완전 공개된 generalist VLA다. RT-2·RT-2-X가 성능은 보였지만 닫혀 있던 자리에, OpenVLA는 재현 가능한 전체 스택을 내놓았다.

성능도 앞선다. 55B RT-2-X 대비 29개 task·복수 embodiment에서 절대 성공률 16.5%p 우위를, 그것도 파라미터 7배 절감으로 달성했다. from-scratch imitation learning인 Diffusion Policy 대비로도 여러 객체가 걸린 language grounding task에서 20.4%p 앞선다. imitation learning은 시연 데이터를 흉내 내 policy를 학습하는 방법이다. policy는 현재 observation을 받아 다음 action을 정하는 함수를 말한다.

VLA를 위한 efficient fine-tuning을 처음 본격적으로 다뤘다. LoRA(rank=32)는 전체 파라미터의 1.4%만 학습하고도 full fine-tuning 성능을 맞췄다. fine-tuning은 pre-training된 모델을 특정 과제 데이터로 더 학습시키는 단계를 말한다. 또 양자화(int4)로 성능 저하 없이 GPU 메모리를 절반 이하로 줄였다.

## 방법론 및 아키텍처 (Methodology and Architecture)

OpenVLA의 토대는 Prismatic-7B VLM이다. 구조는 표준 VLM 세 부분(vision encoder, projector, LLM backbone)인데 vision encoder가 둘이라는 게 특징이다. 이미지 패치를 SigLIP과 DINOv2에 각각 통과시킨 뒤 feature vector를 채널 방향으로 concat한다. CLIP이나 SigLIP 단독 encoder를 쓰는 흔한 구성과 달리, DINOv2를 더하면 저수준 공간 정보가 보강돼 로봇 제어에 필요한 spatial reasoning이 좋아진다. 600M 파라미터 vision encoder, 2-layer MLP projector, Llama 2 7B backbone으로 이뤄진다.

![[assets/kim-2024-openvla-an-open-source-vision-language-action-model/fig02.png]]
*Figure 2: OpenVLA 아키텍처 — 입력 이미지가 DINOv2·SigLIP 두 encoder를 거쳐 concat되고, MLP projector가 language embedding 공간으로 매핑, Llama 2 7B가 action de-tokenizer로 7-DoF action 출력 (Kim et al. 2024, p.4)*

### action을 언어로 적기

action 예측을 vision-language 과제로 바꾼다. 입력은 이미지 observation과 "What should the robot do to {task}? A:" 형식의 지시, 출력은 action 문자열이다. 연속 action을 LLM이 다루려면 이산 토큰으로 바꿔야 한다. 각 action 차원을 256개 bin으로 균등 이산화한다. 이때 min-max가 아니라 1st~99th quantile 구간을 쓴다. outlier action이 이산화 간격을 늘려 실효 해상도를 떨어뜨리는 것을 막기 위해서다.

Llama tokenizer는 fine-tuning용 special token을 100개밖에 예약하지 않아 256개 action 토큰에 부족하다. 그래서 RT-2처럼 vocabulary에서 가장 덜 쓰이는 256개 토큰을 action 토큰으로 덮어쓴다. 학습은 next-token prediction 하나로 하고 action 토큰에 대해서만 cross-entropy를 잰다. 출력은 7-DoF action(end-effector 변위 Δx·회전 Δθ·gripper ΔGrip)이며 action de-tokenizer가 토큰을 다시 연속값으로 되돌린다. end-effector는 로봇 팔 끝에서 물체와 접촉하는 부분이고 그리퍼는 물체를 집는 그 말단이다.

### 학습 데이터와 설계 결정

Open X-Embodiment(OpenX)는 70개 이상 robot dataset, 200만 개 이상 trajectory를 모은 것이다. trajectory는 observation과 action이 시간순으로 이어진 실행 기록이다. 여기서 두 기준으로 추린다. 입력·출력 공간을 통일하려고 3인칭 카메라 1대 이상 + single-arm end-effector 제어 dataset만 남기고 embodiment·task·scene이 고르게 섞이도록 Octo의 mixture weight를 그대로 쓴다. 결과가 970k demonstration이다.

작은 규모 실험에서 얻은 설계 교훈 몇 가지가 최종 학습을 갈랐다. VLM backbone은 Prismatic이 LLaVA·IDEFICS-1보다 language grounding에서 앞섰다. 이미지 해상도는 224px와 384px가 성능 차이가 없는데 후자가 3배 느려 224px를 택했다. VLM 통념과 반대로 vision encoder를 freeze하지 않고 함께 fine-tune하는 게 VLA 성능에 결정적이었다. pretrained backbone이 제어에 필요한 fine-grained 공간 정보를 충분히 담지 못하기 때문으로 본다. epoch도 LLM/VLM의 통상 1~2회와 달리, action token 정확도가 95%를 넘을 때까지 훨씬 더 돌려야 해서 최종 27 epoch까지 갔다.

최종 모델은 64개 A100으로 14일(21,500 A100-hour), batch size 2048로 학습했다. 추론은 bfloat16에서 15GB 메모리, RTX 4090 1장에서 약 6Hz다. control frequency는 로봇이 1초에 몇 번 새로운 action을 갱신하는지를 뜻한다. 강력한 로컬 연산 없이 제어하도록 원격 추론 서버도 함께 공개했다.

## 결과 (Results)

### out-of-the-box 제어

두 embodiment에서 별도 fine-tuning 없이 잰다. BridgeData V2 WidowX(17 task·170 rollout)에서 OpenVLA가 70.6%로 RT-2-X(50.6), Octo(20.0), RT-1-X(18.5)를 모두 앞선다. Google robot에서는 OpenVLA 85.0%, RT-2-X 78.3%로 대등하고 둘 다 RT-1-X·Octo를 크게 앞선다. RT-2-X가 우세한 곳은 semantic generalization 하나뿐인데 인터넷 pre-training 데이터를 로봇 action과 함께 co-fine-tune해 pre-training 지식을 더 잘 보존한 덕이다. OpenVLA가 BridgeData V2에서 특히 앞서는 데는 970k(RT-2-X 350k) 규모, all-zero action 필터링 같은 더 꼼꼼한 전처리, fused vision encoder가 겹쳐 작용한다.

![[assets/kim-2024-openvla-an-open-source-vision-language-action-model/fig03.png]]
*Figure 3: BridgeData V2 WidowX 결과 — 일반화 5축에서 OpenVLA가 RT-1-X·Octo·RT-2-X를 앞서고, semantic generalization만 RT-2-X가 우세 (Kim et al. 2024, p.7)*

### 신규 robot setup 적응

Franka-Tabletop과 Franka-DROID에서 10~150개 demonstration으로 fine-tune한다. 여기서 방법마다 강점이 갈린다. Diffusion Policy는 narrow single-instruction task에서 trajectory가 매끄럽고 강하다. 반면 여러 객체·언어 지시가 걸린 diverse multi-instruction task에서는 OpenX로 pre-train된 OpenVLA·Octo가 앞선다. 집계로는 OpenVLA가 최고 평균(Franka-Tabletop 67.2%, Franka-DROID 58.3%)이고 모든 task에서 50% 이상을 낸 유일한 방법이다. imitation learning의 강한 기본값이 될 만하다. 다만 highly dexterous task의 매끄러움은 아직 Diffusion Policy 쪽이라, action chunking·temporal smoothing 결합을 후속 방향으로 든다.

![[assets/kim-2024-openvla-an-open-source-vision-language-action-model/fig05.png]]
*Figure 5: 신규 robot setup 적응 — Diffusion Policy는 narrow task, OpenVLA·Octo는 diverse multi-instruction task에서 강하고, 집계는 OpenVLA가 최고 (Kim et al. 2024, p.9)*

### 소비자 GPU를 위한 두 레시피

OpenVLA의 실용성은 fine-tuning과 서빙 비용을 얼마나 줄이느냐에 달렸다. 먼저 parameter-efficient fine-tuning을 보면, last-layer-only나 frozen-vision은 성능이 나쁘다. target scene에 맞춘 visual feature 적응이 중요하다는 방증이다. LoRA가 최고의 트레이드오프를 낸다. LoRA는 저랭크 행렬만 학습해 fine-tuning 비용을 줄이는 기법인데 전체의 1.4% 파라미터만 학습하고도 full fine-tuning(69.7%)을 맞췄다(68.2%). rank는 성능에 거의 영향이 없어 기본값 r=32를 권한다. 이러면 A100 1장에서 10~15시간이면 fine-tune되어 연산이 8배 준다.

![[assets/kim-2024-openvla-an-open-source-vision-language-action-model/tab01.png]]
*Table 1: parameter-efficient fine-tuning 비교 — LoRA r=32가 1.4% 파라미터로 full FT 성능을 맞추고 VRAM은 절반 이하 (Kim et al. 2024, p.10)*

서빙 쪽은 양자화가 답이다. 양자화는 가중치를 낮은 비트 수로 줄여 모델을 압축하는 기법이다. int4가 bfloat16(71.3%)과 사실상 같은 71.9%를 내면서 GPU 메모리를 16.8GB에서 7.0GB로 절반 이하로 줄인다. int8은 오히려 성능이 떨어진다(58.1%). 양자화 연산 overhead로 추론 속도가 1.2Hz까지 느려져 5Hz controller의 system dynamics가 바뀌기 때문이다. blocking control로 속도 영향을 걷어내면 int8도 나머지와 대등해져 이 해석을 뒷받침한다.

![[assets/kim-2024-openvla-an-open-source-vision-language-action-model/tab02.png]]
*Table 2: 양자화 추론 성능 — int4가 bfloat16 성능을 유지하면서 GPU 메모리를 절반 이하로 (Kim et al. 2024, p.10)*

### ablation

무엇이 성능을 만들었는지도 갈라 봤다. OpenX 학습이 가장 크다. Bridge 단독으로 학습하면 30%p 떨어진다. fused DINOv2+SigLIP encoder는 SigLIP 단독 대비 5%p 기여로, OpenX 학습보다 효과는 작다. 실세계로만 pre-train된 모델을 LIBERO 시뮬레이션에 옮겨도 4개 suite 평균·rank 모두 최고를 냈다. 다만 실세계 fine-tuning만큼의 격차는 아닌데 sim-real domain gap 때문으로 본다.

## 한계 (Limitations)

단일 이미지 입력만 받는다. proprioception, observation history, multi-image를 아직 못 쓴다. proprioception은 관절 각도 같은 로봇 자신의 상태 감각 입력이다. 추론도 6Hz라 ALOHA(50Hz) 같은 고빈도·양손 조작에는 못 올린다. action chunking과 speculative decoding이 후속 과제다. 신뢰성도 prior policy보다는 낫지만 대개 90% 미만이라 아직 높지 않다. base VLM 크기가 VLA 성능에 미치는 효과, action과 인터넷 데이터의 co-training 효과, VLA에 최적인 visual feature 같은 설계 질문은 연산 제약으로 남겨뒀다.

## 이 저장소 안에서의 위치 (Position in This Wiki)

OpenVLA는 physical-ai에서 VLA 계보의 "오픈소스 기준점"이다. RT-2가 연 레시피를 누구나 재현·개조할 수 있게 열었다. 이후 조작용 VLA 연구의 출발선이 된다.

바로 앞 세대는 [[physical-ai/brohan-2023-rt-2-vision-language-action-models-transfer-web|RT-2]]다. OpenVLA는 RT-2의 "action을 language token으로 적어 VLM을 fine-tune한다"는 핵심 레시피와 256 bin action 이산화를 그대로 물려받는다. 차이는 세 갈래다. RT-2-X가 55B closed였다면 OpenVLA는 7B open이고 RT-2가 다루지 않은 fine-tuning을 정면으로 다뤘으며 PEFT·양자화를 VLA에 처음 붙였다. 두 세대 위 [[physical-ai/brohan-2022-rt-1-robotics-transformer-for-real-world|RT-1]]에서 온 action 이산화가 RT-2를 거쳐 여기까지 이어진다.

한 세대 뒤로 가면 [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation|GR00T N1]]이 "RT-1·RT-2·π0·OpenVLA"를 VLA-via-finetuning 계보로 묶고 그 후속으로 스스로를 자리매김한다. OpenVLA가 단일 VLM 안에서 언어·action을 한 손실로 학습했다면, GR00T N1은 VLM(느린 추론)과 DiT(빠른 action)를 dual-system으로 나눈다. OpenVLA가 한계로 든 "6Hz 추론 병목"이 이 분리를 부른 동기 중 하나다.

넓게 보면 [[physical-ai/kawaharazuka-2025-vision-language-action-models-for-robotics|VLA 서베이]]가 OpenVLA를 "VLM fine-tuning형 VLA"의 대표 사례로 분류한다. backbone VLM을 어떻게 키우고 고를지는 [[llms/cai-2026-vlm3-vision-language-models|VLM3]]의 논의 대상이고 OpenVLA의 fused DINOv2+SigLIP encoder 선택이 그 축의 실전 데이터점이다.

## 관련 페이지 (Related Pages)

- [[physical-ai/brohan-2023-rt-2-vision-language-action-models-transfer-web]] — 직접 전신. OpenVLA가 action 이산화와 fine-tuning 레시피를 물려받은 closed VLA. OpenVLA는 그 오픈소스·경량 버전
- [[physical-ai/brohan-2022-rt-1-robotics-transformer-for-real-world]] — 256 bin action 이산화의 출처. RT-2를 거쳐 OpenVLA로 이어짐
- [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation]] — VLA-via-finetuning 계보의 후속. 단일 backbone → dual-system, 추론 병목 대응
- [[physical-ai/kawaharazuka-2025-vision-language-action-models-for-robotics]] — VLA 서베이. OpenVLA를 VLM fine-tuning형 대표로 분류
- [[llms/cai-2026-vlm3-vision-language-models]] — VLM 아키텍처. OpenVLA 성능을 좌우하는 backbone·vision encoder 축
- [[overviews/physical-ai-overview]] — physical-ai 분류 기준과 학습 경로 허브
