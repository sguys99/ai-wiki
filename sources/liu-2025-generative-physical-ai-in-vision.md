---
title: "Generative Physical AI in Vision: A Survey"
type: paper
year: 2025
category: physical-ai
raw_path: raw/papers/liu-2025-generative-physical-ai-in-vision.pdf
raw_filename: "liu-2025-generative-physical-ai-in-vision.pdf"
source_collection: external
authors: "Daochang Liu, Junyu Zhang, Anh-Dung Dinh, Eunbyung Park, Shichao Zhang, Ajmal Mian, Mubarak Shah, Chang Xu"
arxiv_id: "2501.10928"
tags: [physical-ai, world-model, simulator, benchmark]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/liu-2025-generative-physical-ai-in-vision/fig01.png
    raw: raw/papers/liu-2025-generative-physical-ai-in-vision-figures/fig01.png
    caption: "생성 AI가 의미 이해, 시간 이해, 공간 이해를 지나 상호작용성과 physics-aware generation을 얻으며 world model로 수렴하는 흐름"
    page: 1
    bbox_norm: [0.506, 0.388, 0.925, 0.630]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/liu-2025-generative-physical-ai-in-vision/fig02.png
    raw: raw/papers/liu-2025-generative-physical-ai-in-vision-figures/fig02.png
    caption: "물리 인지가 나쁜 생성 영상과 좋은 생성 영상의 대조. 사과가 액체에 빠지는 장면과 체조 동작"
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
    caption: "물리 시뮬레이션의 세 구성 요소. 재료 12종, 수치 기법 9종, 기성 물리 엔진 14종"
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
    caption: "PAG-I 다섯 가지 유형의 하위 아이디어와 대표 방법 트리"
    page: 10
    bbox_norm: [0.072, 0.048, 0.928, 0.279]
    strategy: caption-region
    curated: true
  - id: tab01
    label: Table 1
    kind: table
    file: assets/liu-2025-generative-physical-ai-in-vision/tab01.png
    raw: raw/papers/liu-2025-generative-physical-ai-in-vision-figures/tab01.png
    caption: "PS, PU, G, PUG, PAG-E, PAG-I 여섯 개념의 입출력과 명시적 물리 모델 유무 비교"
    page: 3
    bbox_norm: [0.070, 0.052, 0.930, 0.183]
    strategy: manual
    curated: true
  - id: tab02
    label: Table 2
    kind: table
    file: assets/liu-2025-generative-physical-ai-in-vision/tab02.png
    raw: raw/papers/liu-2025-generative-physical-ai-in-vision-figures/tab02.png
    caption: "PAG-E 방법 38편 요약표. 패러다임, 생성 모델, 생성 모달리티, 물리 모델, 파라미터 취득 경로, 물리를 결합하는 단계"
    page: 6
    bbox_norm: [0.068, 0.048, 0.935, 0.578]
    strategy: manual
    curated: false
  - id: tab03
    label: Table 3
    kind: table
    file: assets/liu-2025-generative-physical-ai-in-vision/tab03.png
    raw: raw/papers/liu-2025-generative-physical-ai-in-vision-figures/tab03.png
    caption: "Cosmos-Reason1의 물리 상식 ontology. 공간, 시간, 기초 물리 3개 대분류와 16개 세부 범주"
    page: 12
    bbox_norm: [0.065, 0.817, 0.510, 0.933]
    strategy: manual
    curated: true
---

## 한 줄 요약 (One-line Summary)

컴퓨터 비전 생성 모델이 "보기 좋은 결과"를 넘어 물리 법칙까지 지키게 만드는 연구를 physics-aware generation이라는 이름으로 묶은 서베이다. 명시적 물리 시뮬레이터를 쓰는지 여부로 전체를 두 부류로 나눈다.

## 1. 자료 정보 (Document Information)

- 제목: Generative Physical AI in Vision: A Survey
- 저자: Daochang Liu, Junyu Zhang, Anh-Dung Dinh, Eunbyung Park, Shichao Zhang, Ajmal Mian, Mubarak Shah, Chang Xu
- 소속: University of Western Australia, 성균관대, University of Sydney, 연세대, 광시사범대, University of Central Florida
- arXiv: 2501.10928 (v1 2025-01, v2 2025-04-19), IEEE 저널 투고 형식 19쪽, 인용 문헌 233편
- 정리 저장소: https://tinyurl.com/Physics-Aware-Generation

## 2. 주요 기여 (Key Contributions)

- physical simulation, physical understanding, generation 세 연산을 수식으로 정의한 다음, 그 조합으로 physics-unaware generation과 physics-aware generation을 갈라낸다. physics-aware generation은 다시 명시적 시뮬레이터 사용 여부로 PAG-E와 PAG-I로 나뉜다.
- PAG-E는 생성 과정 $G$ 와 시뮬레이션 $P_\theta$ 의 배선 방식에 따라 Gen-to-Sim, Sim-in-Gen, Gen-and-Sim, Sim-Constrained Gen, Gen-Constrained Sim, Sim-evaluated Gen 여섯으로 나뉜다. 38편을 이 축으로 표에 배치했다.
- PAG-I에서는 다섯을 든다. 대형 영상 모델에서 창발하는 물리 인지, LLM이 공급하는 물리 지식, 물리가 풍부한 학습 데이터, 생성형 상호작용 dynamics와 운동 제어, 물리 도메인 데이터 생성이다.
- FID, IS, FVD 같은 표준 지표가 왜 물리 위반을 못 잡는지 밝힌다. 벤치마크는 텍스트 조건부(PhyBench, PhyGenBench, VideoPhy, VideoPhy2, WISA-32K)와 시각 조건부(Physics-IQ, PisaBench, PhyCoBench)로 나눠 소개한다.
- 다루지 않는 범위도 분명하다. 물리를 구조적 귀납 편향으로 적용하는 PINN 계열, 디블러링과 디헤이징 같은 화질 복원, 순수 그래픽스 연구는 명시적으로 뺀다. 관심은 출력물의 물리적 사실성 하나다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 세 연산의 정의

물리 모델을 $P_\theta$, 생성 모델을 $G$, 관찰을 $X$ 라 두고 세 가지를 정의한다.

- physical simulation (PS): $P_\theta(X) \rightarrow X'$. 물리 모델이 관찰을 다음 상태로 옮긴다.
- physical understanding (PU): $X \rightarrow P_\theta$. 영상 같은 관찰에서 밑에 깔린 물리 모델이나 파라미터를 역으로 추정한다.
- generation (G): $G(X) \rightarrow X'$. 조건 $X$ 로부터 새 콘텐츠를 만든다. 물리 이해를 요구하지 않으면 physics-unaware generation(PUG)이다.

physics-aware generation(PAG)은 "실세계 물리에 대한 강한 이해를 동반한 생성"이다. 명시적 시뮬레이션을 쓰면 PAG-E가 된다. 암묵적 학습만으로 가는 경우가 PAG-I다. Table 1은 여섯 개념의 입출력을 표로 대조한다. PAG-E와 PAG-I는 "명시적 물리 모델" 한 행에서만 갈리고 "물리 세계 이해" 행은 둘 다 참이다.

### 3.2 명시적 시뮬레이션을 끼우는 여섯 가지 배선(PAG-E)

여섯 배선을 한데 모은 도식이 Fig. 3이다. 한 논문이 여러 패러다임에 걸치면 가장 가까운 하나로 분류한다.

Gen-to-Sim(GtS)은 $P_\theta(G(X)) \rightarrow X'$ 로 쓴다. 생성 결과에 물리 속성을 사후에 입혀 시뮬레이션과 상호작용이 가능하게 만드는 순차 구성이다. 이 유형에 속한 연구가 가장 많다. PIE-NeRF는 NeRF 밀도장에 포아송 디스크 샘플링으로 입자를 뿌리고 보로노이 그룹으로 묶어 Q-GMLS와 라그랑주 dynamics를 적용한다. Video2Game은 실세계 영상 하나를 분할해 물체마다 질량, 마찰, 충돌 형상을 붙이고 WebGL 게임 엔진에서 강체로 시뮬레이션한다. Gaussian Splatting 계열은 더 활발하다. PhysGaussian은 이방성 정규화로 만든 가우시안 커널을 Material Point Method의 입자로 취급해 응력과 변형을 추적한다. GASP는 가우시안을 삼각 메시로 바꿔 MPM을 적용한 뒤 다시 가우시안으로 되돌리는 식이다. Spring-Gau는 앵커 점들을 스프링으로 잇고 미분 가능한 시뮬레이션으로 강성과 감쇠를 영상에서 학습한다. Feature Splatting은 vision-language model의 의미 특징을 가우시안에 심는다. 그러면 언어 의미로 재료 속성을 지정할 수 있다. Phys4DGen과 SimAnything은 Segment Anything과 LLM으로 부위별 물리 속성을 추론한다. 응용 사례로는 VR-GS(XPBD 기반 실시간 VR 조작), LIVE-GS(GPT-4로 물리 속성 추론해 수동 튜닝 제거), DreMa(장면 복원과 시뮬레이션을 묶어 로봇용 객체 중심 world model 구성)가 있다.

시뮬레이터가 생성 모델의 하위 모듈로 들어가면 Sim-in-Gen(SiG), $G_{P_\theta}(X) \rightarrow X'$ 이다. GPT4Motion에서는 GPT-4가 프롬프트를 Blender 파이썬 스크립트로 옮겨 물리 시뮬레이션을 실행한다. 거기서 나온 깊이 맵과 엣지 맵이 ControlNet 조건으로 확산 모델에 들어간다. PhysGen은 사용자가 이미지에 가한 힘과 토크를 뉴턴 역학으로 풀어 영상을 만든다. PhysDiff는 확산의 매 denoising 단계마다 시뮬레이터로 보정한 동작을 다시 샘플링에 되먹여 사람 동작이 바닥을 뚫거나 미끄러지지 않게 한다.

Gen-and-Sim(GnS)은 $M_{P_\theta,G}(X) \rightarrow X'$, 공유 모델 하나가 생성과 시뮬레이션을 동시에 맡는 구성이다. PAC-NeRF는 오일러 격자로 NeRF 기하를, 라그랑주 입자로 물리 파라미터를 함께 추정하는 혼합 표현을 쓴다. PhysMotion은 생성, 시뮬레이션, 재생성을 번갈아 실행한다.

시뮬레이션이 생성 학습에 제약이나 손실로 작용하는 경우가 Sim-Constrained Gen(ScG)이다. $G(X) \rightarrow X'$ subject to $P_\theta(X) \rightarrow X'$ 로 쓴다. Atlas3D는 스스로 서 있을 수 있게 하는 안정 평형 손실을, PhyRecon은 미분 가능한 입자 시뮬레이터를 손실로 쓴다. DiffuseBot은 미분 가능한 시뮬레이션으로 생성된 로봇 설계를 걸러 샘플링 분포를 조정한다. DSO는 시뮬레이션으로 자립 안정성을 라벨링한 뒤 DPO로 image-to-3D 모델을 fine-tuning한다.

ScG와는 방향이 반대로, 생성 모델이 시뮬레이션에 사전 지식을 공급하는 구성이 Gen-Constrained Sim(GcS)이다. Physics3D는 score distillation sampling으로 물리 파라미터를 최적화한다. score distillation sampling은 pre-training된 확산 모델의 점수 함수를 손실 삼아 다른 표현을 최적화하는 기법이다. DreamPhysics는 색 편향을 줄이려 운동에 특화한 motion distillation sampling을 제안했다. PhysDreamer는 distillation 대신 image-to-video 모델이 만든 참조 영상과 시뮬레이션 렌더링의 시각적 유사도를 최대화해 영률 같은 값을 추정한다.

Sim-evaluated Gen(SeG)에서는 생성 결과가 시뮬레이션 환경에 배포되는 것을 전제로 평가된다. PhysPart는 교체 부품을 만든다. 3D 프린팅이나 로봇 조작에서 실제로 끼워 맞춰지도록 설계한 부품이다. PhyScene은 embodied AI용 상호작용 가능한 3D 장면을 물리 기반 안내로 생성한다.

### 3.3 물리 시뮬레이션의 구성 요소와 파라미터 취득

물리 시뮬레이션의 재료는 강체, 연체, 뉴턴 유체, 비뉴턴 유체, 점소성, 탄성체, 입상 매질, 금속, 고체, 천, 박막, 관절체 12종이고 각각 질량, 마찰, 영률, 포아송 비처럼 다른 속성으로 기술된다. 수치 기법은 Material Point Method, 유한요소법, Position-Based Dynamics, 연속체 역학, 라그랑주 방법, 오일러 방법, Φ-Flow, 3D 스프링-질량 모델 등 9종이다. 기성 엔진은 Bullet, MuJoCo, NVIDIA PhysX, Blender, Isaac Gym, Taichi, Gazebo, Genesis를 포함해 14종을 든다. 이 세 구성 요소를 한 장에 모은 것이 Fig. 4다.

시뮬레이션에 넣을 물리 파라미터는 전문가가 직접 지정한다. 실용적이지만 확장성이 떨어진다. 시각 관찰에서 데이터 기반으로 추정하는 방식은 별도 단계로 두거나 생성 모델 파라미터와 함께 최적화한다. 세 번째이자 마지막 경로는 multimodal LLM이 물체 설명으로부터 재료와 그럴듯한 구성을 추론하게 하는 방식으로, 최근 빠르게 늘고 있다.

### 3.4 명시적 시뮬레이터 없이 물리를 익히는 방법(PAG-I)

Fig. 6에 다섯 유형의 방법 트리가 있다. Sora, OpenSora, CogVideoX, ModelScope, Cosmos 계열은 모두 인터넷 규모 영상으로 학습했다. 이들은 일관된 물체 상호작용과 그럴듯한 운동을 보인다. 저자들은 이를 창발적 물리 추론이라 부르면서도 아직 초기 단계라고 분명히 한다. PhyGenBench는 이 모델들이 기본 물리 법칙조차 정확히 표현하지 못한다고 보고했다. Kang 등의 연구는 더 구체적으로 지적한다. 모델과 데이터셋 크기를 키우는 것만으로는 분포 밖 물리 일반화가 개선되지 않았다. 모델은 일반 규칙을 추상화하기보다 아주 비슷한 학습 예시의 존재에 의존한다는 것이다.

NVIDIA의 Cosmos는 영상 데이터 파이프라인, 토크나이저, pre-training 모델과 post-training 모델을 묶은 오픈소스 플랫폼이다. 대규모 영상으로 학습한 world foundation model을 제공한다. Transformer 기반 확산 모델과 자기회귀 모델이 그 뼈대다. 로봇 manipulation, 카메라 제어, 자율주행으로 fine-tuning할 수 있다. Cosmos-Reason1은 embodied 의사결정용 multimodal LLM으로, 공간, 시간, 기초 물리 3개 대분류와 16개 세부 범주의 물리 상식 ontology를 정의하고 이진 2,828개와 객관식 2,909개를 합쳐 5,737개 문항을 모았다. 그중 604개는 426개 영상과 연결된 벤치마크로 따로 골라냈다. Cosmos-Transfer1은 분할 맵, 깊이 맵, 엣지 맵 같은 공간 입력으로 world 생성을 제어하는 ControlNet류 구조를 얹는다.

남은 유형에서는 PhyT2V가 LLM으로 프롬프트를 반복 정제해 물체와 물리 규칙을 뽑고 생성 영상 캡션과 대조해 불일치를 고친다. WISA는 동역학, 열역학, 광학에 걸친 17가지 현상의 영상 약 32,000편으로 WISA-32K를 만들고 물리 속성 임베딩과 mixture-of-physical-experts attention, 물리 분류기를 붙여 학습한다. PISA는 실제 361편과 Kubric 합성 60편의 낙하 영상으로 분할, 광학 흐름, 깊이 정렬을 reward 삼는 post-training을 실행한다. 운동 제어에는 Generative Image Dynamics(단일 이미지에서 스펙트럼 볼륨을 거쳐 장기 픽셀 trajectory 생성), Motion Prompting(운동 trajectory를 조건으로), Motion Guidance(광학 흐름 추정기의 기울기로 확산 제어)가 있다. CoCoGen은 이산화한 편미분방정식 정보를 샘플링에 직접 주입해 다르시 흐름이나 버거스 방정식 데이터를 만든다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

서베이라 자체 실험은 없다. 결과에 해당하는 것은 정리표와 평가 지형이다.

FID, CLIP Similarity, CLIP-FID, Inception Score는 시각 내용과 텍스트 의미의 정렬에 치우쳐 있어 물리 법칙 위반을 잡아내지 못한다. FVD는 비교할 참조 영상 데이터셋이 필요한데 새로 만든 장면에는 그런 정답이 없다. VLM을 범용 평가자로 쓰는 시도도 공간 관계에 머물러 물리적 정확성으로 일반화되지 않는다.

텍스트를 조건으로 주는 벤치마크부터 본다.

| 벤치마크 | 대상 | 규모 | 자동 평가자 |
|---|---|---|---|
| PhyBench | text-to-image | 프롬프트 700개, 물리 시나리오 31개, 역학, 광학, 열, 물질 속성 4유형 | PhyEvaler (GPT-4o) |
| PhyGenBench | text-to-video | 프롬프트 160개, 물리 법칙 27개, 같은 4개 도메인 | PhyGenEval (VLM + GPT-4o) |
| VideoPhy | text-to-video | 캡션 688개, 고체와 고체, 고체와 유체, 유체와 유체 | VideoCon-Physics |
| VideoPhy2 | text-to-video | 프롬프트 3,940개, 실세계 행동 197종, 5점 리커트 | VideoPhy2-AutoEval |
| WISA-32K | 학습 데이터셋 | 영상 32,000편, 물리 현상 17종, 동역학, 열역학, 광학 | 해당 없음 |

VideoPhy는 CogVideoX, OpenSora 같은 공개 모델과 Pika, Gen-2 같은 비공개 모델 12종을 사람 평가로 비교해 대부분이 물리적으로 일관된 결과를 못 낸다고 보고했다.

시각을 조건으로 주는 벤치마크로는 Physics-IQ와 PisaBench, PhyCoBench가 있다. Physics-IQ는 통제 조건에서 찍은 실세계 고해상도 영상 396편을 주고 조건 구간 뒤 5초를 예측하게 한다. 고체 역학, 유체, 열역학, 광학, 자기를 다루고 공간, 시간, 픽셀 지표로 정답 프레임과 직접 비교한다. PisaBench는 공중의 물체 이미지 한 장에서 자유 낙하를 예측하는 과제로 좁혀 실세계 슬로모션 361편과 Kubric 합성 영상을 쓴다. trajectory L2, Chamfer Distance, IoU로 운동, 형태, 공간 일관성을 각각 잰다. PhyCoBench는 중력, 충돌, 진동, 마찰, 유체, 포물선 운동, 회전 7개 범주 120개 프롬프트로 물리적 일관성을 본다. 채점은 광학 흐름 기반 프레임 예측기 PhyCoPredictor가 자동으로 한다.

평가 지표 세 부류 가운데 가장 믿을 만한 것은 사람 평가다. 대신 비용과 시간이 든다. VLM 기반 평가는 확장성을 얻지만 평가자 자신의 물리 이해가 미해결 문제로 남는다. 자동 정량 평가는 정밀하고 재현도 되지만 대개 짝지어진 실세계 정답 영상을 요구한다.

물리 상식의 정의가 연구마다 달라 모델 간 비교가 어렵다는 점을 저자들은 분야의 핵심 과제로 짚는다. Cosmos-Reason1의 ontology가 현재로선 가장 구체적인 제안이다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

저자들은 향후 방향으로 여섯을 꼽는다.

- 표준 벤치마크가 나왔지만 물리 인지 평가는 여전히 임시방편이거나 수작업에 의존한다. 생성 결과를 물리 엔진에 실제로 올려 타당성을 재는 방법, 로봇 manipulation과 자율주행 같은 하위 과제 성능으로 간접 평가하는 방법을 제안한다. 시뮬레이션과 실세계에서 실행한 embodied agent의 행동 유사도를 척도로 삼자는 제안도 한다.
- 명시적 물리 법칙을 결합하면 설명 가능성이 따라온다. 입력에서 출력까지의 경로를 힘, 제약, 상호작용으로 되짚을 수 있다. saliency map이나 특징 귀인 같은 기존 해석 기법과 결합하는 길도 있다.
- foundation model 자체에 물리를 심을 수도 있다. 여러 인식 foundation model을 통합하고 대규모 합성 데이터와 미분 가능한 물리로 물리 유도 pre-training을 하는 길이다. 물리 법칙 발견을 유도하는 자기지도 목표 설계도 같은 방향에 속한다.
- 신경망과 상징 표현을 섞는 하이브리드에서는 미분 가능한 시간 논리 같은 상징적 물리 제약을 심어 물리적으로 타당하고 시간적으로 일관된 출력을 유도한다. 상징 그래프나 ontology는 합성적 추론에도 강하다.
- 생성형 시뮬레이션 엔진도 그중 하나다. "폭우 뒤 가파른 산의 산사태를 시뮬레이션하라" 같은 고수준 프롬프트를 상호작용 가능한 물리 일관 환경으로 바꾸는 text-to-simulation이다. Genesis가 후보 사례다. 걸림돌은 다양한 프롬프트와 장면에 대한 일반화가 아직 좁다는 점이다.
- 로봇과 embodied AI에서는 물리적으로 사실적인 합성 데이터로 sim2real 전이를 개선하자고 본다. VLA 모델에 물리 추론을 명시적으로 주입해 낯선 환경에서 예측 성능을 끌어올리는 방안도 제안한다. 응용은 기후 모델링과 조직의 물리 성질을 재현하는 수술 훈련과 계획까지 이른다.

서베이 자체의 한계도 있다. PINN 계열과 이미지 복원, 순수 그래픽스를 범위에서 뺐고 physical understanding 자체는 "본 서베이와 대체로 직교한다"며 짧게만 다룬다. PAG-I 부분은 방법 나열에 가깝고 PAG-E만큼 축이 선명하지 않다.

## 6. 관련 연구 (Related Work)

- Li 2025의 embodied AI world model 서베이가 있다. 이 자료가 다루는 world model 측면을 로봇 분야에서 더 깊이 다룬 정리다. Li 2025는 기능, 시간, 공간 세 기준 분류를 쓴다.
- VLA 계열 서베이(Xu 2025, Kawaharazuka 2025)와는 상보적이다. VLA 서베이는 action을 내는 모델을 다룬다. 이 서베이가 보는 것은 미래 관찰을 만들어내는 모델이다.
- 가장 가까운 짝은 Zhang 2026의 Physical AI 서베이다. LLM의 world 지식에서 출발해 grounding, action, world modeling, embodied 배포로 이어지는 로드맵을 그린다. 이 서베이는 그 로드맵의 "예측과 시뮬레이션" 칸을 생성 모델 관점에서 확대한 셈이다.

## 7. 용어집 (Glossary)

이 자료 고유 용어만 적는다. policy, world model, sim2real 등 도메인 공통 용어는 `wiki/overviews/glossary-physical-ai.md`를 따른다.

| 용어 | 뜻 |
|---|---|
| physics-aware generation (PAG) | 실세계 물리에 대한 강한 이해를 동반한 생성. 이 서베이의 뼈대 개념 |
| PAG-E / PAG-I | 명시적 물리 시뮬레이션을 쓰는 PAG와 암묵적 학습만으로 가는 PAG |
| PUG | physics-unaware generation. 물리 이해를 요구하지 않는 일반 생성 |
| physical plausibility | 출력물이 물리 법칙에 어긋나지 않는 정도. visual fidelity와 구분되는 축 |
| Material Point Method (MPM) | 입자와 격자를 오가며 연속체 변형을 푸는 수치 기법. Gaussian Splatting과 결합이 잦다 |
| Gaussian Splatting (GS) | 장면을 평균, 공분산, 불투명도를 가진 3차원 가우시안 무리로 나타내는 명시적 복사장 표현 |
| score distillation sampling (SDS) | pre-training된 확산 모델의 점수 함수를 손실로 삼아 다른 표현을 최적화하는 기법 |
| physical commonsense | 중력, 충돌, 상태 변화처럼 사람이 당연하게 아는 물리 지식. 벤치마크의 채점 대상 |

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 1 | 생성 AI가 상호작용성과 물리 인지를 얻어 world model로 수렴하는 흐름 | caption-region | ★ wiki 권장 (전체 그림) |
| fig02 | 2 | 물리 인지가 나쁜 영상과 좋은 영상 대조 | manual | ★ wiki 권장 (문제 정의) |
| fig03 | 3 | 생성 G와 시뮬레이션 P를 결합하는 여섯 배선도 | manual | ★ wiki 권장 (핵심 분류) |
| fig04 | 5 | 물리 시뮬레이션의 세 구성 요소 (재료, 기법, 엔진) | caption-region | ★ wiki 권장 (배경 지도) |
| fig05 | 7 | PAG-E 여섯 패러다임 방법 트리 | caption-region | ★ wiki 권장 (논문 지도) |
| fig06 | 10 | PAG-I 다섯 가지 유형 방법 트리 | caption-region | ★ wiki 권장 (논문 지도) |
| tab01 | 3 | 여섯 개념 비교표 (PS, PU, G, PUG, PAG-E, PAG-I) | manual | ★ wiki 권장 (정의) |
| tab02 | 6 | PAG-E 방법 38편 요약표 | manual | (선택, 세로로 길다) |
| tab03 | 12 | Cosmos-Reason1 물리 상식 ontology | manual | (선택) |
