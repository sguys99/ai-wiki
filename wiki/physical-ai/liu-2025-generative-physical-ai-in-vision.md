---
title: "Generative Physical AI in Vision: A Survey"
type: paper
year: 2025
category: physical-ai
raw_path: /home/sguys99/project/ai-wiki/raw/papers/liu-2025-generative-physical-ai-in-vision.pdf
raw_filename: "liu-2025-generative-physical-ai-in-vision.pdf"
source_collection: external
source: liu-2025-generative-physical-ai-in-vision.md
authors: "Daochang Liu, Junyu Zhang, Anh-Dung Dinh, Eunbyung Park, Shichao Zhang, Ajmal Mian, Mubarak Shah, Chang Xu"
arxiv_id: "2501.10928"
tags: [physical-ai, world-model, simulator, benchmark]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/liu-2025-generative-physical-ai-in-vision/fig01.png
    raw: raw/papers/liu-2025-generative-physical-ai-in-vision-figures/fig01.png
    caption: "생성 AI가 의미·시간·공간 이해를 지나 상호작용성과 물리 인지 생성을 얻으며 world model로 수렴하는 흐름"
    page: 1
    bbox_norm: [0.506, 0.388, 0.925, 0.630]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/liu-2025-generative-physical-ai-in-vision/fig02.png
    raw: raw/papers/liu-2025-generative-physical-ai-in-vision-figures/fig02.png
    caption: "물리 인지가 나쁜 생성 영상과 좋은 생성 영상의 대조 — 사과가 액체에 빠지는 장면과 체조 동작"
    page: 2
    bbox_norm: [0.059, 0.055, 0.941, 0.172]
    strategy: manual
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/liu-2025-generative-physical-ai-in-vision/fig03.png
    raw: raw/papers/liu-2025-generative-physical-ai-in-vision-figures/fig03.png
    caption: "생성 과정 G와 물리 시뮬레이션 P를 결합하는 여섯 가지 배선도"
    page: 3
    bbox_norm: [0.505, 0.220, 0.930, 0.688]
    strategy: manual
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/liu-2025-generative-physical-ai-in-vision/fig04.png
    raw: raw/papers/liu-2025-generative-physical-ai-in-vision-figures/fig04.png
    caption: "물리 시뮬레이션의 세 축 — 재료 12종, 수치 기법 9종, 기성 물리 엔진 14종"
    page: 5
    bbox_norm: [0.073, 0.052, 0.927, 0.679]
    strategy: caption-region
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/liu-2025-generative-physical-ai-in-vision/fig05.png
    raw: raw/papers/liu-2025-generative-physical-ai-in-vision-figures/fig05.png
    caption: "PAG-E 여섯 패러다임의 하위 아이디어와 대표 방법 트리"
    page: 7
    bbox_norm: [0.071, 0.048, 0.928, 0.598]
    strategy: caption-region
    curated: true
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/liu-2025-generative-physical-ai-in-vision/fig06.png
    raw: raw/papers/liu-2025-generative-physical-ai-in-vision-figures/fig06.png
    caption: "PAG-I 다섯 갈래의 하위 아이디어와 대표 방법 트리"
    page: 10
    bbox_norm: [0.072, 0.048, 0.928, 0.279]
    strategy: caption-region
    curated: true
  - id: tab01
    label: Table 1
    kind: table
    file: assets/liu-2025-generative-physical-ai-in-vision/tab01.png
    raw: raw/papers/liu-2025-generative-physical-ai-in-vision-figures/tab01.png
    caption: "PS·PU·G·PUG·PAG-E·PAG-I 여섯 개념의 입출력과 명시적 물리 모델 유무 비교"
    page: 3
    bbox_norm: [0.070, 0.052, 0.930, 0.183]
    strategy: manual
    curated: true
  - id: tab02
    label: Table 2
    kind: table
    file: assets/liu-2025-generative-physical-ai-in-vision/tab02.png
    raw: raw/papers/liu-2025-generative-physical-ai-in-vision-figures/tab02.png
    caption: "PAG-E 방법 38편 요약표 — 패러다임, 생성 모델, 생성 모달리티, 물리 모델, 파라미터 취득 경로, 물리를 넣는 단계"
    page: 6
    bbox_norm: [0.068, 0.048, 0.935, 0.578]
    strategy: manual
    curated: false
  - id: tab03
    label: Table 3
    kind: table
    file: assets/liu-2025-generative-physical-ai-in-vision/tab03.png
    raw: raw/papers/liu-2025-generative-physical-ai-in-vision-figures/tab03.png
    caption: "Cosmos-Reason1의 물리 상식 온톨로지 — 공간·시간·기초 물리 3개 대분류와 16개 세부 범주"
    page: 12
    bbox_norm: [0.065, 0.817, 0.510, 0.933]
    strategy: manual
    curated: true
---

## 요약 (Summary)

영상 생성 모델은 물방울이 튀는 장면도, 흩날리는 머리카락도 그럴듯하게 만든다. 그런데 컵이 책상 모서리를 넘어가도 떨어지지 않는 영상 역시 똑같이 그럴듯해 보인다. 이 서베이의 출발점이 거기다. 저자들은 현재 모델이 픽셀 공간의 시각적 사실성에 맞춰 최적화돼 있을 뿐 개체나 개념 공간의 물리적 타당성에는 맞춰져 있지 않다고 진단한다.

그 간극을 메우려는 연구를 physics-aware generation이라는 이름으로 묶고 명시적 물리 시뮬레이터를 쓰는지 여부로 PAG-E와 PAG-I 두 갈래를 낸다. arXiv 2501.10928, IEEE 저널 투고 형식 19쪽, 인용 문헌 233편이다.

![[assets/liu-2025-generative-physical-ai-in-vision/fig01.png]]
*Figure 1: 이미지의 의미 이해, 영상의 시간 이해, 3D/4D의 공간 이해가 상호작용성과 물리 인지 생성을 만나 world model로 수렴한다 (Liu 2025, p.1)*

world model은 환경의 dynamics를 학습해 미래를 예측하는 모델을 말한다. 영상이 이 논의의 중심에 있는 이유도 같다. 저자들이 보기에 인터넷에 쌓인 영상은 세계의 암묵적 물리 모델로 볼 수 있고 그래서 디지털과 물리 영역을 잇는 통로가 된다. Sora·Veo2·Hunyuan·Kling·Cosmos 같은 대형 영상 모델이 이 흐름을 대표한다.

## 문제 정의 (Why Visual Fidelity Is Not Enough)

![[assets/liu-2025-generative-physical-ai-in-vision/fig02.png]]
*Figure 2: 같은 프롬프트에서 나온 두 영상. 위는 사과가 액체 위에 얹혀 있고 체조 선수가 허공에 떠 있다. 아래는 물체가 실제로 잠기고 착지한다 (Liu 2025, p.2, 예시는 WISA와 Zhao et al.)*

픽셀 품질만으로는 두 줄을 구분할 수 없다. 로봇, 자율주행, 과학 시뮬레이션처럼 물리 법칙을 지켜야 하는 응용에서 이 차이가 결정적이다. 생성 모델이 물리적 사실성과 동적 시뮬레이션까지 흡수하면 world simulator로 기능할 여지가 커진다. 서베이가 그리는 큰 그림이다.

## 개념 정의 (Formulation)

물리 모델을 $P_\theta$, 생성 모델을 $G$, 관찰을 $X$ 로 두면 기본 연산은 셋이다.

- physical simulation (PS): $P_\theta(X) \rightarrow X'$ — 물리 모델이 관찰을 다음 상태로 굴린다
- physical understanding (PU): $X \rightarrow P_\theta$ — 관찰에서 밑에 깔린 물리 모델이나 파라미터를 역으로 추정한다
- generation (G): $G(X) \rightarrow X'$ — 조건에서 새 콘텐츠를 만든다. 물리 이해가 필요 없으면 physics-unaware generation(PUG)이다

physics-aware generation(PAG)은 실세계 물리에 대한 강한 이해를 동반한 생성이고 명시적 시뮬레이션 사용 여부로 PAG-E와 PAG-I로 갈린다.

![[assets/liu-2025-generative-physical-ai-in-vision/tab01.png]]
*Table 1: 여섯 개념의 입출력과 명시적 물리 모델 유무 비교 (✓ 예, ✗ 아니오, ○ 선택) (Liu 2025, p.3)*

PAG-E와 PAG-I는 "명시적 물리 모델" 한 행에서만 갈린다. "물리 세계 이해" 행은 둘 다 참이다. 반대로 PUG는 물리 입출력도 명시적 모델도 없다.

범위에서 빠진 것도 분명히 적혀 있다. 물리를 구조에 귀납 편향으로 넣는 PINN 계열, 디블러링·디헤이징 같은 화질 복원, 순수 그래픽스 연구는 다루지 않는다. 관심은 출력물의 물리적 사실성 하나다. physical understanding 자체도 "이 서베이와 대체로 직교한다"며 파라미터 취득 경로만 짧게 정리한다.

## 물리 시뮬레이션의 재료 (Simulation Components)

![[assets/liu-2025-generative-physical-ai-in-vision/fig04.png]]
*Figure 4: 재료 12종, 수치 기법 9종, 기성 물리 엔진 14종 (Liu 2025, p.5)*

강체부터 관절체까지 12종이 재료 목록에 올라 있다. 그 사이에 연체, 뉴턴 유체와 비뉴턴 유체, 점소성, 탄성체, 입상 매질, 금속, 고체, 천, 박막이 든다. 질량, 마찰, 영률, 포아송 비처럼 재료마다 다른 속성으로 기술된다. 수치 기법에는 Material Point Method, 유한요소법, Position-Based Dynamics, 연속체 역학, 라그랑주·오일러 방법이 들어간다. 이 가운데 Material Point Method는 입자와 격자를 오가며 연속체 변형을 푼다. 뒤에 볼 Gaussian Splatting 계열과 특히 궁합이 좋다. 엔진 쪽은 Bullet, MuJoCo, NVIDIA PhysX, Blender, Isaac Gym, Taichi, Gazebo, Genesis 등이다.

시뮬레이션에 넣을 물리 파라미터는 어디서 오는가. 경로는 셋이다. 전문가가 직접 정하는 방식은 실용적이다. 다만 다양한 장면으로 확장하기 어렵다. 시각 관찰에서 데이터 기반으로 추정하는 길은 별도 단계로 두거나 생성 모델과 함께 최적화한다. 최근에는 multimodal LLM에게 물체 설명을 주고 재료와 그럴듯한 구성을 추론시키는 경로가 빠르게 느는 중이다.

## PAG-E — 시뮬레이터를 끼워 넣는 여섯 가지 방식 (Explicit Simulation)

![[assets/liu-2025-generative-physical-ai-in-vision/fig03.png]]
*Figure 3: 생성 G와 시뮬레이션 P를 결합하는 여섯 가지 구조 (Liu 2025, p.3)*

한 논문이 여러 패러다임에 걸치면 가장 가까운 하나로 분류한다.

여섯 갈래 중 연구가 가장 많은 쪽이 Gen-to-Sim(GtS), $P_\theta(G(X)) \rightarrow X'$다. 생성 결과에 물리 속성을 사후에 입혀 시뮬레이션과 상호작용이 가능하게 만드는 방식이다. PIE-NeRF는 NeRF 밀도장에 포아송 디스크 샘플링으로 입자를 뿌리고 보로노이로 묶어 시뮬레이션 요소를 만든다. Video2Game은 실세계 영상 하나를 물체 단위로 분할해 질량·마찰·충돌 형상을 붙인 뒤 WebGL 게임 엔진에서 굴린다. Gaussian Splatting 쪽이 더 활발한데, 장면을 입자처럼 다루는 표현이라 시뮬레이션과 이어 붙이기 자연스럽기 때문이다. PhysGaussian은 가우시안 커널을 Material Point Method의 입자로 취급해 응력과 변형을 추적하고 GASP는 가우시안을 삼각 메시로 바꿔 MPM을 적용한 뒤 되돌린다. Spring-Gau는 앵커 점들을 스프링으로 잇고 미분 가능한 시뮬레이션으로 강성과 감쇠를 영상에서 학습하는 쪽이다. Feature Splatting은 vision-language model의 의미 특징을 가우시안에 심어 언어 의미로 재료를 지정하며 Phys4DGen과 SimAnything은 Segment Anything과 LLM으로 부위별 속성을 추론한다. 응용은 VR-GS(XPBD 기반 실시간 VR 조작), LIVE-GS(GPT-4로 물리 속성 추론), DreMa(로봇용 객체 중심 world model)로 이어진다.

Sim-in-Gen(SiG) — $G_{P_\theta}(X) \rightarrow X'$. 시뮬레이터가 생성 모델의 하위 모듈이 된다. GPT4Motion에서는 GPT-4가 프롬프트를 Blender 파이썬 스크립트로 옮겨 시뮬레이션을 돌리고 거기서 나온 깊이·엣지 맵이 ControlNet 조건으로 확산 모델에 들어간다. PhysGen은 사용자가 이미지에 가한 힘과 토크를 뉴턴 역학으로 푼다. PhysDiff는 확산의 매 denoising 단계마다 시뮬레이터가 보정한 동작을 다시 샘플링에 되먹여 사람 동작이 바닥을 뚫거나 미끄러지지 않게 한다.

Gen-and-Sim(GnS), $M_{P_\theta,G}(X) \rightarrow X'$에서는 공유 모델 하나가 둘을 동시에 맡는다. PAC-NeRF는 오일러 격자로 NeRF 기하를, 라그랑주 입자로 물리 파라미터를 함께 추정한다. PhysMotion은 생성과 시뮬레이션을 번갈아 돌린다.

Sim-Constrained Gen(ScG) — 시뮬레이션이 생성 학습에 제약이나 손실을 건다. Atlas3D는 스스로 설 수 있게 하는 안정 평형 손실을, PhyRecon은 미분 가능한 입자 시뮬레이터를 손실로 쓴다. DiffuseBot은 생성된 로봇 설계를 시뮬레이션으로 걸러 샘플링 분포를 조정한다. DSO는 시뮬레이션으로 자립 안정성을 라벨링한 뒤 DPO로 image-to-3D 모델을 fine-tuning한다.

Gen-Constrained Sim(GcS) — 방향이 반대다. 생성 모델이 시뮬레이션에 사전 지식을 준다. Physics3D는 score distillation sampling으로 물리 파라미터를 최적화한다. score distillation sampling은 pre-training된 확산 모델의 점수 함수를 손실 삼아 다른 표현을 최적화하는 기법이다. DreamPhysics는 색 편향을 줄이려 운동에 특화한 motion distillation sampling을 쓴다. PhysDreamer는 아예 다른 길로 가서 image-to-video 모델이 만든 참조 영상과 시뮬레이션 렌더링의 시각적 유사도를 최대화해 영률을 추정한다.

마지막 Sim-evaluated Gen(SeG)에서는 생성 결과가 시뮬레이션 환경 배포를 전제로 평가된다. PhysPart는 실제로 끼워 맞춰지는 교체 부품을, PhyScene은 embodied AI용 상호작용 가능한 3D 장면을 만든다.

![[assets/liu-2025-generative-physical-ai-in-vision/fig05.png]]
*Figure 5: 여섯 패러다임 아래 하위 아이디어와 대표 방법 배치. 논문 지도 역할을 한다 (Liu 2025, p.7)*

Table 2(p.6)는 이 38편을 패러다임, 생성 모델, 생성 모달리티, 물리 모델, 파라미터 취득 경로, 물리를 넣는 학습 단계 여섯 열로 정리한다. 세로로 길어 이 페이지에는 임베드하지 않았고 `raw/papers/liu-2025-generative-physical-ai-in-vision-figures/tab02.png`에 있다.

## PAG-I — 시뮬레이터 없이 물리를 익히는 쪽 (Implicit Learning)

![[assets/liu-2025-generative-physical-ai-in-vision/fig06.png]]
*Figure 6: 명시적 시뮬레이션 없는 물리 인지 생성의 다섯 갈래 (Liu 2025, p.10)*

인터넷 규모 영상으로 학습한 Sora·OpenSora·CogVideoX·ModelScope·Cosmos 계열은 일관된 물체 상호작용과 그럴듯한 운동을 보인다. 저자들은 이를 창발적 물리 추론이라 부르면서도 아직 초기 단계라고 못 박는다. PhyGenBench는 이 모델들이 기본 물리 법칙조차 정확히 표현하지 못한다고 보고했다.

Kang 등의 결과는 눈여겨볼 만하다. 모델과 데이터셋 크기를 키우는 것만으로는 분포 밖 물리 일반화가 개선되지 않았고 모델은 일반 규칙을 추상화하기보다 아주 비슷한 학습 예시가 있는지에 의존한다. 데이터를 더 넣는다고 물리 이해가 따라오지는 않는다.

NVIDIA Cosmos는 영상 데이터 파이프라인, 토크나이저, pre-training·post-training 모델을 묶은 오픈소스 플랫폼이다. Transformer 기반 확산 모델과 자기회귀 모델을 대규모 영상으로 학습한 world foundation model을 제공하고 로봇 manipulation, 카메라 제어, 자율주행으로 fine-tuning할 수 있다. 동반 모델 Cosmos-Reason1은 embodied 의사결정용 multimodal LLM이다. Cosmos-Transfer1은 분할·깊이·엣지 맵으로 world 생성을 제어하는 ControlNet류 구조를 얹는다.

PhyT2V는 LLM으로 프롬프트를 반복 정제해 물체와 물리 규칙을 뽑고 생성 영상 캡션과 대조해 불일치를 고친다. 데이터 쪽에서는 WISA가 동역학·열역학·광학에 걸친 17가지 현상의 영상 약 32,000편으로 WISA-32K를 만들고 물리 속성 임베딩과 mixture-of-physical-experts attention, 물리 분류기를 붙였다. PISA는 실제 361편과 Kubric 합성 60편의 낙하 영상으로 분할·광학 흐름·깊이 정렬을 reward 삼는 post-training을 돌린다. 운동 제어 쪽에는 Generative Image Dynamics, Motion Prompting, Motion Guidance가 있다. CoCoGen은 이산화한 편미분방정식 정보를 샘플링에 직접 주입해 다르시 흐름이나 버거스 방정식 데이터를 만든다.

## 평가 (Evaluation)

FID·CLIP Similarity·CLIP-FID·Inception Score는 시각 내용과 텍스트 의미의 정렬에 치우쳐 물리 위반을 잡지 못한다. FVD는 비교할 참조 영상 데이터셋을 요구한다. 새로 만든 장면에 그런 정답이 있을 리 없다. VLM을 범용 평가자로 쓰는 시도도 공간 관계에 머물러 물리적 정확성으로 일반화되지 않는다.

텍스트 조건부 벤치마크는 프롬프트가 묘사한 물리 현상을 결과가 지키는지 본다.

| 벤치마크 | 대상 | 규모 | 자동 평가자 |
|---|---|---|---|
| PhyBench | text-to-image | 프롬프트 700, 시나리오 31, 역학·광학·열·물질 4유형 | PhyEvaler (GPT-4o) |
| PhyGenBench | text-to-video | 프롬프트 160, 물리 법칙 27, 같은 4개 도메인 | PhyGenEval |
| VideoPhy | text-to-video | 캡션 688, 고체-고체·고체-유체·유체-유체 | VideoCon-Physics |
| VideoPhy2 | text-to-video | 프롬프트 3,940, 실세계 행동 197종, 5점 리커트 | VideoPhy2-AutoEval |
| WISA-32K | 학습 데이터셋 | 영상 32,000, 물리 현상 17종 | — |

VideoPhy는 CogVideoX·OpenSora 같은 공개 모델과 Pika·Gen-2 같은 비공개 모델 12종을 사람 평가로 비교해 대부분이 물리적으로 일관된 결과를 못 낸다고 보고했다.

시각 조건부 벤치마크는 다음 프레임 예측으로 물리 이해를 잰다. Physics-IQ는 통제 조건에서 찍은 실세계 영상 396편으로 조건 구간 뒤 5초를 예측하게 하고 공간·시간·픽셀 지표로 정답과 비교한다. PisaBench는 공중의 물체 이미지 한 장에서 자유 낙하를 예측하는 과제로 좁혀, trajectory L2로 운동을, Chamfer Distance로 형태를, IoU로 공간 일관성을 잰다. PhyCoBench는 중력·충돌·진동·마찰·유체·포물선 운동·회전 7개 범주 120개 프롬프트를 쓰고 광학 흐름 기반 예측기 PhyCoPredictor로 자동 채점한다.

평가 지표는 셋으로 갈린다. 사람 평가가 가장 믿을 만하다. 대신 비용이 크다. VLM 기반 평가는 확장되지만 평가자 자신의 물리 이해가 또 다른 미해결 문제다. 자동 정량 평가는 정밀하고 재현 가능한 대신 짝지어진 실세계 정답 영상을 요구한다.

물리 상식의 정의가 연구마다 달라 모델 간 비교가 어렵다. 서베이는 이 점도 짚는다. 현재로선 Cosmos-Reason1의 온톨로지가 가장 구체적인 제안이다.

![[assets/liu-2025-generative-physical-ai-in-vision/tab03.png]]
*Table 3: Cosmos-Reason1의 물리 상식 온톨로지 — 공간·시간·기초 물리 3개 대분류와 16개 세부 범주 (Liu 2025, p.12)*

Cosmos-Reason1은 이 온톨로지 위에서 이진 2,828개와 객관식 2,909개를 합쳐 5,737개 문항을 모았고 그중 604개를 426편의 영상과 연결해 벤치마크로 따로 골라냈다.

## 두 가지 구분 (Semantic vs Physical, Geometry vs Physical)

의미 인지는 장면에 무엇이 어디 있는지를 픽셀에서 특징으로 사상하는 정적 지식이다. 물리 인지가 다루는 것은 운동·충돌·힘·재료 거동이 어떻게, 왜 일어나는가다. 정지된 지식이 아니라 움직임을 미리 내다보는 능력이다. 영상의 시간 모델링이 이 분야에서 유독 중요한 이유가 여기 있다.

기하 인지가 보는 것은 모양·크기·자세·깊이·위치 같은 외재적 구조다. 물리 인지는 물체가 법칙 아래 어떻게 움직이고 변형되고 상호작용하는지라는 내재적 성질을 따진다. 지각하면서 동시에 상호작용하는 embodied 모델을 만들려면 둘 다 필요하다고 저자들은 결론짓는다.

## 저자들이 제시한 방향 (Future Directions)

평가 개선이 첫 갈래다. 생성 결과를 실제 물리 엔진에 올려 타당성을 재거나, 로봇 manipulation·자율주행 같은 하위 과제 성능으로 간접 평가하거나, 시뮬레이션과 실세계에서 돌린 embodied agent의 행동 유사도를 척도로 삼는 길이다.

명시적 물리 법칙을 넣으면 입력에서 출력까지를 힘·제약·상호작용으로 되짚을 수 있다. 설명 가능성이 여기서 나온다. saliency map이나 특징 귀인 같은 기존 해석 기법과 결합할 여지도 있다.

- 물리 증강 foundation model. 인식 foundation model 통합, 대규모 합성 데이터와 미분 가능한 물리를 쓴 물리 유도 pre-training, 물리 법칙 발견을 유도하는 자기지도 목표.
- 신경-상징 하이브리드. 미분 가능한 시간 논리 같은 상징적 제약으로 물리적 타당성과 시간 일관성을 유도하고 상징 그래프·온톨로지로 여러 개념을 조합하는 추론을 강화한다.
- 생성형 시뮬레이션 엔진. "폭우 뒤 가파른 산의 산사태를 시뮬레이션하라" 같은 프롬프트를 상호작용 가능한 물리 일관 환경으로 바꾸는 text-to-simulation. Genesis가 후보 사례다. 프롬프트와 장면에 대한 일반화가 아직 좁은 점이 걸림돌이다.

로봇과 embodied AI가 마지막이다. 물리적 사실성을 갖춘 합성 데이터로 sim2real 전이를 개선하고 VLA 모델에 물리 추론을 명시적으로 주입해 낯선 환경에서 내놓는 예측을 끌어올린다. 응용은 기후 모델링과 조직의 물리 성질을 재현하는 수술 훈련·계획까지 뻗는다.

## 관련 페이지 (Related Pages)

- [[physical-ai/9bow-2026-physics-aware-generation-world-simulator]] — 이 논문을 한글로 풀어 쓴 PyTorch KR 해설. 개념 대조표와 벤치마크 수치가 이 페이지와 일치한다
- [[physical-ai/li-2025-a-comprehensive-survey-on-world]] — world model 서베이. 기능·시간·공간 3축 분류로 로봇과 자율주행 쪽을 깊이 다룬다. 예측에 초점을 둔 쪽이 li-2025라면 Liu 2025는 생성 쪽이다
- [[physical-ai/hou-2026-world-model-for-robot-learning]] — 로봇 학습에서 world model이 쓰이는 방식 정리
- [[physical-ai/xu-2025-an-anatomy-of-vision-language-action-models]] — VLA 해부 서베이. 저자들이 future direction으로 든 "VLA에 물리 추론 주입"의 대상 쪽 지도
- [[overviews/physical-ai-overview]] — 도메인 허브
- [[overviews/glossary-physical-ai]] — 용어 표기 SSOT
