---
title: "Physical AI 연구 한 번에 살펴보기 2편: 물리를 이해하는 생성 모델과 월드 시뮬레이터"
type: article
year: 2026
category: physical-ai
raw_path: raw/articles/9bow-2026-physics-aware-generation-world-simulator.md
raw_filename: "9bow-2026-physics-aware-generation-world-simulator.md"
source_collection: external
source: 9bow-2026-physics-aware-generation-world-simulator.md
author: "9bow (박정환)"
url: "https://discuss.pytorch.kr/t/physical-ai-2/10771"
publisher: "PyTorch KR (discuss.pytorch.kr)"
published: "2026-06-19"
tags: [physical-ai, world-model, simulator, benchmark]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/9bow-2026-physics-aware-generation-world-simulator/fig01.jpg
    raw: raw/articles/9bow-2026-physics-aware-generation-world-simulator-figures/fig01.jpg
    caption: "글 대표 이미지. 이미지와 영상과 3D 생성이 물리 인지 생성과 물리 시뮬레이션을 거쳐 world simulator로 이어지는 흐름"
    strategy: fetched
    curated: true
---

## 요약

Liu 2025의 서베이 "Generative Physical AI in Vision"(arXiv 2501.10928)을 한국어로 풀어 쓴 해설이다. PyTorch 한국 사용자 모임이 Physical AI 서베이 두 편을 묶어 소개하는 시리즈의 2편이며, 원 서베이의 절 구성을 거의 그대로 따라가면서 개념 정의, 방법 분류, 평가 벤치마크, 향후 방향을 차례로 옮겼다. 분량은 약 16,600자이고 논문 도식 4종을 재수록했다.

이 페이지는 해설이 따라간 순서대로 서베이의 뼈대를 정리한다. 원 논문의 고해상도 도식과 방법별 상세 표는 [[physical-ai/liu-2025-generative-physical-ai-in-vision]]에 있으므로, 이 해설 페이지를 먼저 읽고 논문 페이지로 넘어가는 순서를 권한다.

![[assets/9bow-2026-physics-aware-generation-world-simulator/fig01.jpg]]
*Figure 1: 이미지와 영상과 3D 생성이 물리 인지 생성과 물리 시뮬레이션을 거쳐 world simulator로 이어지는 흐름 (9bow 2026, 글 대표 이미지).*

## 배경

최근 영상 생성 모델은 시각적으로는 사실적이지만 물리적으로는 틀린 장면을 자주 만든다. 컵이 책상 모서리를 넘어가는데도 떨어지지 않거나, 손에서 놓은 물체가 아래가 아니라 옆으로 흘러가는 장면이 그 예다. 서베이 저자들의 진단에 따르면 원인은 학습 목표에 있다. 현재의 최고 성능 모델들은 픽셀 공간의 시각적 사실성(visual fidelity)을 위해 최적화되어 있을 뿐, 개체나 개념 공간의 물리적 타당성(physical plausibility)을 위해 최적화되어 있지 않다.

이 간극은 미적 결함에 그치지 않는다. 로봇공학, 자율주행, 과학 시뮬레이션처럼 실제 물리 법칙을 지켜야 하는 응용에서는 물리적으로 틀린 예측이 곧 잘못된 판단으로 이어지기 때문이다. 따라서 생성 모델이 물리적 사실성과 동적 시뮬레이션을 통합해 갈수록 world simulator로 기능할 여지가 커진다. world simulator는 사용자의 조작에 반응해 물리적으로 일관된 미래 장면을 계속 만들어내는 시스템을 가리킨다.

영상이 이 목표의 중심에 놓인 이유도 해설이 짚는다. 저자들의 표현으로 영상은 세계의 암묵적 물리 모델(implicit physical model of the world)로 볼 수 있다. Sora, Veo2, Hunyuan, Kling, Cosmos 같은 대형 영상 모델이 이 흐름을 대표한다.

시리즈 안에서의 위치도 해설이 직접 잡아준다. 1편은 Zhang 2026 서베이를 다루며 "LLM의 world knowledge에서 grounding, action, 예측과 시뮬레이션을 거쳐 embodied 배포로 이어지는" 로드맵을 그렸는데, 2편이 다루는 Liu 2025는 그 로드맵의 예측과 시뮬레이션 단계를 생성 모델 관점에서 확대한 작업이라는 것이다.

## 핵심 개념

서베이는 방법을 분류하기 전에 혼동하기 쉬운 개념들을 형식으로 구분한다. 물리 시뮬레이션 모델을 물리 파라미터 θ를 가진 P_θ로, 생성 모델을 G로 두고 세 가지 기본 연산을 정의한다.

- **물리 시뮬레이션(Physical Simulation, PS)**: P_θ(X) → X'. 물리 모델로 observation X를 다음 상태 X'로 진화시킨다. observation은 모델이 입력으로 받는 관찰 결과, 예를 들어 한 장면의 이미지나 영상을 가리킨다.
- **물리 이해(Physical Understanding, PU)**: X → P_θ. 영상 같은 observation에서 그 밑에 깔린 물리 모델이나 파라미터 θ를 거꾸로 추론한다.
- **생성(Generation, G)**: G(X) → X'. 입력 조건 X로부터 새로운 콘텐츠 X'를 만든다. 강한 물리 이해가 필요 없는 경우가 물리 비인지 생성(Physics-Unaware Generation, PUG)이다.

서베이의 골격인 physics-aware generation(PAG)은 실세계 물리에 대한 강한 이해를 동반한 생성 과정으로 정의된다. 그리고 생성 모델이 명시적 물리 시뮬레이션을 쓰는지 여부에 따라 두 가지로 나뉜다.

- **PAG-E**: 명시적 물리 시뮬레이션을 동반한(with explicit simulation) physics-aware generation
- **PAG-I**: 명시적 시뮬레이션 없이 암묵적 학습으로(implicit learning) 이루는 physics-aware generation

### 여섯 개념의 비교

해설은 서베이 Table I을 한글 표로 옮겼다. 기호는 ✓가 예, ✗가 아니오, ∘가 선택이다.

| 구분 | PS | PU | G | PUG | PAG-E | PAG-I |
|---|---|---|---|---|---|---|
| 입력: observation | ✓ | ✓ | ∘ | ∘ | ∘ | ∘ |
| 입력: 물리 | ✓ | ∘ | ∘ | ✗ | ∘ | ∘ |
| 출력: observation | ✓ | ∘ | ✓ | ✓ | ✓ | ✓ |
| 출력: 물리 | ∘ | ✓ | ∘ | ✗ | ∘ | ∘ |
| 명시적 물리 모델 | ✓ | ✓ | ∘ | ✗ | ✓ | ✗ |
| 물리 세계 이해 | ✓ | ✓ | ∘ | ∘ | ✓ | ✓ |

해설은 표 아래에 두 가지를 문장으로 짚어 놓았다. 첫째, PAG-E와 PAG-I는 "명시적 물리 모델" 행 하나에서만 갈리고 "물리 세계 이해" 행은 둘 다 ✓다. 즉 시뮬레이터를 쓰느냐 아니냐가 다를 뿐 물리를 이해한다는 점은 같다. 둘째, 일반 생성에 가까운 PUG는 물리 입출력도 명시적 모델도 없다.

### 서베이의 범위 제외 기준

서베이는 초점을 출력의 물리적 사실성에 두기 위해 세 가지를 의도적으로 제외한다. 첫째, 물리를 모델 구조의 사전 지식이나 귀납 편향으로 넣는 방식으로 물리 정보 신경망(Physics-Informed Neural Networks, PINN)이 대표 사례다. 둘째, 디블러링과 디헤이징과 화질 개선 같은 이미지 처리 과제다. 셋째, 물리 시뮬레이션을 다루더라도 순수 그래픽스에 속하는 연구다.

## 생성 모델의 토대

해설은 physics-aware generation을 다루기 전에 바탕이 되는 생성 모델 네 가지를 정리한다. 서베이가 VAE와 시각 자기회귀 모델(VAR)까지 언급하지만 본문에서 자세히 다루는 것은 아래 네 가지다.

| 모델 계열 | 표현 방식 | 특징 |
|---|---|---|
| 생성적 적대 신경망(GAN) | 생성자와 판별자의 미니맥스 게임 | diffusion 이전까지 지배적이었다. StyleGAN 계열 |
| diffusion model | 가우시안 noise를 점진적으로 더했다가 신경망으로 거꾸로 제거 | GAN보다 학습이 안정적이지만 샘플링 효율이 낮다 |
| 신경 복사장(NeRF) | 3차원 좌표와 시선 방향을 밀도와 색으로 매핑하는 MLP | 암묵적 표현. PixelNeRF, MIP-NeRF, D-NeRF로 확장 |
| Gaussian Splatting | 평균, 공분산, 불투명도를 가진 다수의 3차원 가우시안 덩어리 | 명시적 복사장. NeRF보다 빠르고 정확하다 |

diffusion model에 대해서는 해설이 배경 지식을 더 넓게 붙였다. DDIM과 DPM-Solver 같은 가속 샘플러, latent diffusion, classifier-free guidance까지 계보를 함께 든다. latent diffusion은 픽셀 공간이 아니라 압축된 표현 공간에서 노이즈 제거를 수행해 연산량을 줄이는 방식이다.

보통 렌더링이나 복원 기법으로 분류되는 NeRF와 Gaussian Splatting을 넓은 의미의 생성 모델로 묶은 것은 서베이의 선택이다. 특히 Gaussian Splatting이 물리 시뮬레이션과 잘 맞는 이유를 해설이 한 문단으로 풀었다. 장면을 입자(particle)처럼 다루는 표현이라 입자 기반 시뮬레이션과 결합이 자연스럽고, 그래서 PAG-E 연구의 상당수가 가우시안을 시뮬레이션 요소로 재해석한다.

## 물리 시뮬레이션의 구성 요소

명시적 시뮬레이션을 쓰는 방법을 보기 전에, 물리 시뮬레이션 자체가 무엇으로 이뤄지는지를 알아야 한다. 서베이는 이를 세 가지 구성 요소로 나눈다.

| 구성 요소 | 내용 | 예 |
|---|---|---|
| 물리 재료(physical materials) | 모델링 대상의 종류. 질량, 마찰, 영률(Young's modulus), 포아송 비 같은 서로 다른 속성으로 기술된다 | 강체, 연체, 뉴턴 유체와 비뉴턴 유체, 점소성 재료, 입상 매질, 금속, 천, 박막, 관절체 |
| 시뮬레이션 방법(simulation methods) | 물질의 동역학을 물리 법칙 아래 계산하는 도구 | 물질점 방법(Material Point Method, MPM), 유한요소법(FEM), 위치 기반 동역학, 라그랑주 방법과 오일러 방법 |
| 물리 엔진(physics engines) | 시뮬레이션 방법을 구현한 기성 플랫폼 | Bullet, MuJoCo 계열, NVIDIA PhysX, Blender, Isaac Gym, Genesis, Taichi |

시뮬레이션에 넣을 물리 파라미터를 어디서 얻는지도 서베이가 세 경로로 정리한다. 취득 경로가 곧 방법의 자동화 수준을 가르는 기준이 된다.

- **수동 설정**: 전문가가 재료 속성을 직접 정한다.
- **자동 학습**: 시각 observation으로부터 데이터 기반으로 파라미터를 추론한다.
- **MLLM 기반 추론**: MLLM이 텍스트와 시각 정보로부터 재료와 그럴듯한 구성을 추론한다. 최근 들어 빠르게 늘고 있는 경로다.

## 명시적 시뮬레이션 기반 물리 인지 생성

PAG-E는 생성 과정 G와 물리 시뮬레이션 P_θ가 어떻게 상호작용하는지에 따라 여섯 가지 패러다임으로 나뉜다. 한 논문이 여러 패러다임에 걸치기도 하는데, 그럴 때는 가장 관련 깊은 하나로 분류한다.

| 패러다임 | 약어 | G와 P의 관계 |
|---|---|---|
| Gen-to-Sim | GtS | 생성 결과에 물리 속성을 사후에 부여해 시뮬레이션 가능하게 만든다 |
| Sim-in-Gen | SiG | 시뮬레이션이 생성 모델의 하위 모듈로 들어간다 |
| Gen-and-Sim | GnS | 생성과 시뮬레이션이 동시에 또는 공유 모델을 통해 맞물린다 |
| Sim-Constrained Gen | ScG | 시뮬레이션이 생성 학습에 제약이나 손실을 부과한다 |
| Gen-Constrained Sim | GcS | 생성 모델이 시뮬레이션의 사전 지식이나 안내 역할을 한다 |
| Sim-evaluated Gen | SeG | 생성 결과가 시뮬레이션 환경 배포를 목표로 평가된다 |

### 여섯 패러다임의 대표 방법

해설은 패러다임마다 대표 방법을 소절로 나누고 각각에 arXiv 링크를 걸었다. 방법별 물리 엔진과 파라미터 취득 경로를 한눈에 비교하려면 논문 Table 2를 봐야 한다.

| 패러다임 | 대표 방법 | 하는 일 |
|---|---|---|
| Gen-to-Sim | PIE-NeRF, Video2Game | NeRF 밀도장에 입자를 뿌려 시뮬레이션 요소를 만들거나, 실세계 영상 하나를 상호작용 가능한 가상 환경으로 바꾼다 |
| Gen-to-Sim | PhysGaussian, GASP, Spring-Gau | 가우시안을 시뮬레이션 입자로 본다. PhysGaussian은 MPM으로 응력과 변형을 추적하고, Spring-Gau는 앵커 점을 스프링으로 이어 강성과 감쇠를 영상에서 학습한다 |
| Gen-to-Sim | Feature Splatting, Phys4DGen, SimAnything | 언어 의미나 분할 결과로부터 물체별 물리 속성을 부여한다 |
| Gen-to-Sim | VR-GS, LIVE-GS, DreMa | VR 조작과 로봇 응용. DreMa는 장면 복원과 시뮬레이션을 결합한 객체 중심 world model이다 |
| Sim-in-Gen | GPT4Motion, AutoVFX | LLM이 프롬프트를 Blender 코드로 바꾸고, 렌더링한 깊이 맵과 엣지 맵을 ControlNet 기반 Stable Diffusion에 입력한다 |
| Sim-in-Gen | PhysGen, PhysAnimator | 사용자가 가한 힘과 토크를 받아 뉴턴 법칙으로 영상을 만든다. 물리 파라미터는 foundation model이 추론한다 |
| Sim-in-Gen | PhysDiff | diffusion의 노이즈 제거 단계마다 물리 시뮬레이터로 보정한 동작을 다시 샘플링에 되먹인다 |
| Gen-and-Sim | PAC-NeRF, iPAC-NeRF, PhysMotion | 오일러 격자로 NeRF 기하를, 라그랑주 입자로 물리 파라미터를 함께 학습한다 |
| Sim-Constrained Gen | Atlas3D, PhyRecon, DiffuseBot, DSO | 안정 평형 손실이나 미분 가능한 시뮬레이터를 손실로 쓴다. DSO는 시뮬레이션으로 자립 안정성을 라벨링한 뒤 직접 선호 최적화(DPO)로 fine-tuning한다 |
| Gen-Constrained Sim | Physics3D, DreamPhysics, PhysDreamer | 생성 모델이 물리 파라미터 탐색을 안내한다 |
| Sim-evaluated Gen | PhysPart, PhyScene | 3D 프린팅이나 로봇 manipulation용 교체 부품, embodied AI용 상호작용 가능한 3D 장면을 생성한다 |

특히 눈여겨볼 대목은 Gen-Constrained Sim의 파라미터 추정 방식 차이다. Physics3D는 score distillation sampling(SDS)으로 물리 파라미터를 최적화하고, DreamPhysics는 운동에 특화된 사전 지식을 더 잘 잡고 색 편향을 줄이기 위해 motion distillation sampling(MDS)을 제안한다. 반면 PhysDreamer는 distillation을 쓰지 않고, 이미지에서 영상을 만드는 모델이 생성한 참조 영상과 시뮬레이션 렌더링 사이의 시각적 유사도를 최대화해 영률 같은 파라미터를 추정한다.

## 명시적 시뮬레이션 없는 물리 인지 생성

PAG-I는 명시적 시뮬레이터에 기대지 않고도 물리 인지를 드러내는 연구들이다. 서베이는 이를 다섯 가지로 정리하며, 해설은 그중 세 가지를 자세히 다룬다.

### 대형 영상 모델의 물리 인지

Sora, OpenSora, CogVideoX, Cosmos처럼 인터넷 규모의 영상으로 학습한 모델은 일관된 물체 상호작용과 사실적인 운동을 보인다. emergent capability는 학습 데이터에 명시적으로 없던 능력이 규모를 키우는 과정에서 나타나는 성질을 말하는데, 이 물리 추론이 그런 사례에 해당한다.

다만 서베이는 이 암묵적 추론이 아직 초기 단계라고 평가한다. 벤치마크 PhyGenBench는 모델들이 기본적인 물리 법칙조차 정확히 표현하는 데 어려움을 겪는다고 보고한다.

특히 눈여겨볼 결과는 Kang 등의 연구다. 모델과 데이터셋 크기를 키우는 것만으로는 분포 밖(out-of-distribution) 물리 일반화가 개선되지 않았다. 저자들의 표현으로 현재 모델들은 일반적인 물리 규칙을 추상화하기보다 매우 유사한 학습 예시의 존재에 주로 의존하며, 이는 완전한 물리 인지 생성 모델을 위해 더 표적화된 방법이 필요함을 시사한다. 즉 더 많은 데이터가 곧 더 나은 물리 이해는 아니다.

NVIDIA의 Cosmos는 이 흐름에서 특히 주목받는 플랫폼이다. 영상 데이터 파이프라인, 토크나이저, pre-training과 post-training 모델을 묶은 오픈소스 도구이며, Transformer 기반 diffusion 모델과 자기회귀 모델 두 계열의 world foundation model을 제공한다. world foundation model은 여러 하위 Physical AI 환경으로 fine-tuning될 것을 전제로 학습한 범용 world model을 가리키고, Cosmos의 경우 로봇 manipulation, 카메라 제어, 자율주행으로 fine-tuning할 수 있다.

동반 모델 Cosmos-Reason1은 물리 상식 온톨로지를 정의한다. 공간, 시간, 기초 물리라는 3개 대분류와 16개 세부 범주로 이뤄지며, 문항은 이진 2,828개와 객관식 2,909개를 합쳐 5,737개다. 그중 604개는 영상 426편과 연결되어 있어 영상을 보고 답해야 하는 문항이다. 또 다른 변형인 Cosmos-Transfer1은 분할, 깊이, 엣지 맵 같은 공간 입력으로 생성을 제어하는 ControlNet류 구조를 더한다.

### LLM과 데이터, 운동 신호 기반 접근

두 번째와 세 번째 가지는 프롬프트와 데이터, 그리고 운동 신호로 물리 인지를 끌어올린다. trajectory는 시간 순서로 이어진 상태의 기록을 뜻한다.

| 방법 | 접근 |
|---|---|
| PhyT2V | LLM으로 프롬프트를 반복 정제한다. 물체와 물리 규칙을 추출하고, 생성한 영상을 캡션으로 기술한 뒤, 둘 사이의 불일치를 교정하는 순서다 |
| VideoAgent | 로봇을 위한 시각 계획을 만들고, 자기 조건부 일관성과 pre-training된 VLM의 피드백으로 생성 영상을 다듬는다 |
| WISA | 동역학, 열역학, 광학에 걸친 물리 현상 17가지의 영상 약 3만 2천 개로 WISA-32K를 구성하고, 물리 속성 임베딩과 mixture-of-physical-experts와 물리 분류기로 영상 모델을 학습시킨다 |
| PISA | 실제 영상 361편과 Kubric 합성 영상 60편으로 물체 낙하를 다룬다. 분할과 광학 흐름과 깊이의 alignment를 reward로 삼는 object reward optimization을 post-training으로 수행한다 |
| Generative Image Dynamics | 단일 이미지에서 스펙트럼 볼륨을 거쳐 조밀한 장기 픽셀 trajectory를 만든다 |
| Motion Prompting | 운동 trajectory 자체를 생성 조건으로 준다 |
| Motion Guidance | 광학 흐름 추정기의 기울기로 diffusion을 제어한다 |
| CoCoGen | 다르시 흐름이나 버거스 방정식 같은 물리 도메인 데이터를, 이산화된 편미분방정식 정보를 샘플링에 주입하며 생성한다 |

## 평가

물리 인지에서 평가는 그 자체로 까다로운 연구 주제다. FID, CLIP Similarity, Inception Score, FVD 같은 표준 지표가 시각적 정렬과 의미적 정렬에 치우쳐 물리 법칙 위반을 잡아내지 못하기 때문이다. FID와 Inception Score는 분포 수준의 사실성만 보고, FVD는 비교할 참조 영상 데이터셋이 필요한데 새로 생성한 장면에는 그런 정답이 없다.

### 벤치마크

그래서 물리 인지를 직접 겨냥한 벤치마크가 등장했다. 해설이 옮긴 수치는 원 논문과 대조했을 때 어긋나는 항목이 없었다.

| 벤치마크 | 대상 | 규모 | 논문 위치 |
|---|---|---|---|
| PhyBench | 텍스트에서 이미지 생성의 물리 상식 | 역학, 광학, 열, 물질 속성 4개 유형, 물리 시나리오 31개, 프롬프트 700개. GPT-4o 기반 자동 평가자 PhyEvaler가 장면 정확도와 물리적 정확성을 채점 | 6.1.1절 |
| PhyGenBench | 텍스트에서 영상 생성의 물리 상식 | 같은 4개 도메인, 물리 법칙 27개, 프롬프트 160개. 평가자는 PhyGenEval | 6.1.1절 |
| VideoPhy | 고체와 유체의 상호작용 | 캡션 688개, 모델 12종에 대한 사람 평가. 대부분의 모델이 물리적 일관성에 실패 | 6.1.1절 |
| VideoPhy2 | 행동 중심 확장 | 실세계 행동 197종, 프롬프트 3,940개, 5점 리커트 척도 | 6.1.1절 |
| Physics-IQ | 시각 조건부 미래 예측 | 실세계 고해상도 영상 396편에서 조건 구간을 주고 이후 5초를 예측. 고체 역학, 유체, 열역학, 광학, 자기 | 6.1.2절 |
| PisaBench | 단일 공중 이미지에서의 자유 낙하 | trajectory L2 오차, 샴퍼 거리(Chamfer Distance), IoU로 운동과 형태와 공간 일관성을 평가 | 6.1.2절 |
| PhyCoBench | 물리적 일관성 | 중력, 충돌, 진동, 마찰, 유체, 포물선 운동, 회전 7개 범주, 프롬프트 120개 | 6.1.2절 |

규모를 함께 보면 이 벤치마크들이 아직 작다. 프롬프트가 가장 많은 VideoPhy2가 3,940개이고 나머지는 수백 개 수준이므로, 물리 인지 평가는 아직 표본이 좁은 단계다.

### 평가 지표의 세 부류

서베이 6.2절은 평가 지표를 세 부류로 나누고, 해설도 이 구성을 그대로 따른다.

| 부류 | 강점 | 약점 |
|---|---|---|
| 사람 평가 | 가장 신뢰할 수 있다 | 비용이 크다 |
| VLM 기반 평가 | 확장성이 좋다 | 평가자 자신의 물리 이해가 또 다른 미해결 문제다 |
| 자동 정량 평가 | 정밀하고 재현 가능하다 | 대개 짝지어진 실세계 정답 영상이 필요하다 |

자동 평가는 구체적인 지표로 구현된다. 운동은 trajectory L2 거리로, 형태는 샴퍼 거리로, 공간 일관성은 IoU와 가중 IoU로 보며, 여기에 평균 제곱 오차(MSE)를 함께 쓴다.

## 향후 방향

서베이는 마무리에서 두 가지 구분을 제시하고, 해설도 이를 옮긴다.

첫째는 의미 인지(semantic awareness)와 물리 인지(physical awareness)의 구분이다. 의미 인지가 무엇이 어디에 있는지를 다루는 정적 매핑이라면, 물리 인지는 어떻게 그리고 왜 그렇게 되는지를 다루는 동적이고 예측적인 상호작용이다. 이 예측적 성격 때문에 영상의 시간 모델링이 특히 중요해진다.

둘째는 기하 인지(geometry awareness)와 물리 인지의 구분이다. 기하가 모양과 크기와 자세와 깊이 같은 외재적 구조라면, 물리는 물체가 법칙 아래 어떻게 움직이고 변형되는지의 내재적 행동이다. 두 인지를 모두 통합해야 지각하면서 동시에 상호작용하는 embodied 모델이 가능하다.

향후 방향으로는 여섯 가지가 제시된다. sim2real은 시뮬레이션에서 학습한 모델을 실제 기기로 옮기는 문제를 말한다.

| 방향 | 내용 |
|---|---|
| 더 나은 물리 인지 평가 | 생성 콘텐츠를 물리 엔진에 직접 배포하거나 embodied 에이전트를 평가자로 쓴다 |
| 설명 가능성 | 명시적 물리 법칙으로 입출력 경로를 해석한다 |
| 물리 증강 foundation model | 여러 인식 foundation model의 통합, 대규모 합성 데이터와 미분 가능한 물리를 활용한 물리 유도 pre-training, 자기지도 물리 학습 |
| 신경 상징 하이브리드 | 미분 가능한 시간 논리나 상징 그래프와 온톨로지로 합성적 추론을 강화한다 |
| 생성형 시뮬레이션 엔진 | "폭우 뒤 가파른 산의 산사태를 시뮬레이션하라" 같은 고수준 프롬프트를 상호작용 가능한 물리 일관 환경으로 바꾼다. Genesis가 그 예다 |
| 로봇과 embodied AI 응용 | 물리적으로 사실적인 합성 데이터로 sim2real을 개선하고 VLA 모델에 물리 추론을 주입한다 |

응용 범위도 로봇과 자율주행을 넘어 확장된다. 조직의 물리적 성질을 재현해 수술 훈련과 계획을 돕는 의료, 충실도와 해상도가 중요한 기후 모델링, 그리고 VR과 3D 프린팅이 함께 거론된다.

## 이 해설이 더한 것

해설이 원 논문에 없는 내용을 더한 지점은 네 가지다. 원 논문 요약과 이 해설을 구분해서 읽어야 할 대목이다.

- **시리즈 안에서의 위치 부여**: 1편 로드맵의 예측과 시뮬레이션 단계를 Liu 2025가 생성 모델 관점에서 확대한 작업이라고 배치한다.
- **Table I 해석**: PAG-E와 PAG-I가 "명시적 물리 모델" 행에서만 갈린다는 점과 PUG에는 물리 입출력도 명시적 모델도 없다는 점을 표 아래 두 문장으로 짚는다.
- **Gaussian Splatting과 시뮬레이션의 결합 이유**: 원 논문은 두 방법을 생성 모델에 포함시키기만 하고 이유를 길게 다루지 않는데, 해설은 입자 표현이라는 근거를 한 문단으로 풀었다.
- **배경 지식 확장과 링크**: diffusion 계보를 가속 샘플러와 latent diffusion과 classifier-free guidance까지 넓혀 적고, PAG-E 대표 방법마다 arXiv 링크를 걸었다.

## 표기 대응

해설의 한글 표기는 이 wiki의 canonical 표기와 다르다. 인용할 때는 오른쪽 열로 옮겨 적는다.

| 해설의 표기 | 이 wiki 표기 |
|---|---|
| 월드 모델 / 월드 시뮬레이터 | world model / world simulator <!-- lint-terms: ignore 표기 대응표라 왼쪽 열은 원문 표기 그대로 둔다 --> |
| 월드 파운데이션 모델 | world foundation model <!-- lint-terms: ignore 표기 대응표라 왼쪽 열은 원문 표기 그대로 둔다 --> |
| 물리 인지 생성 | physics-aware generation (PAG) |
| 물리 비인지 생성 | physics-unaware generation (PUG) |
| 점수 증류 샘플링 | score distillation sampling (SDS) <!-- lint-terms: ignore 표기 대응표라 왼쪽 열은 원문 표기 그대로 둔다 --> |
| 물질점 방법 | Material Point Method (MPM) |
| 가우시안 스플래팅 | Gaussian Splatting |
| 체화 AI | embodied AI |
| 미세조정 | fine-tuning <!-- lint-terms: ignore 표기 대응표라 왼쪽 열은 원문 표기 그대로 둔다 --> |

## 한계

### 서베이가 짚는 미해결 문제

- 표준 생성 지표로는 물리 위반을 잡을 수 없고, 물리 전용 벤치마크는 아직 프롬프트 수백 개 규모에 머문다.
- 규모 확대만으로는 분포 밖 물리 일반화가 개선되지 않는다. Kang 등의 결과가 이를 직접 보여준다.
- VLM 기반 자동 평가는 확장성이 좋지만 평가자 모델 자신의 물리 이해가 검증되지 않았다.
- 자동 정량 평가는 짝지어진 실세계 정답 영상을 요구해 새로 생성한 장면에는 적용하기 어렵다.

### 해설이 생략한 부분

- 원 논문 요약이 본문의 대부분이라 독자적 평가나 반론은 없다.
- 논문 Table 2의 PAG-E 방법 38편 요약표를 옮기지 않았다. 방법별 물리 엔진과 파라미터 취득 경로를 한눈에 보려면 논문 쪽 표를 참고해야 한다.
- 향후 방향 여섯 가지가 한 문단에 압축돼 있어 각 방향에 붙은 근거는 대부분 생략됐다.
- PAG-I를 다섯 가지로 나눈다고 적으면서 본문에서는 세 가지만 자세히 다룬다.
- 글 말미에 "GPT 모델로 정리한 글을 바탕으로 한 것"이라는 저자 고지가 붙어 있다. 대조한 범위에서 사실 오류는 없었지만 원문 확인을 권하는 저자 의도는 그대로 존중한다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| physics-aware generation (PAG) | 실세계 물리에 대한 강한 이해를 동반한 생성. 명시적 시뮬레이션 사용 여부로 PAG-E와 PAG-I로 나뉜다 |
| PAG-E / PAG-I | 명시적 물리 시뮬레이션을 쓰는 쪽이 PAG-E, 암묵적 학습만으로 물리 인지를 얻는 쪽이 PAG-I다. 물리 세계 이해라는 목표는 둘 다 같다 |
| Material Point Method (MPM) | 물질을 입자와 격자를 오가며 계산하는 시뮬레이션 방법. PhysGaussian 등 가우시안 기반 PAG-E가 이것을 쓴다 |
| Gaussian Splatting | 장면을 평균과 공분산과 불투명도를 가진 3차원 가우시안 덩어리로 표현하는 명시적 복사장. 입자 표현이라 물리 시뮬레이션과 결합이 쉽다 |
| score distillation sampling (SDS) | pre-training된 생성 모델의 score를 안내 신호로 써서 3D 표현이나 물리 파라미터를 최적화하는 기법. Physics3D가 물리 파라미터 추정에 쓴다 |
| world simulator | 조작에 반응해 물리적으로 일관된 미래 장면을 계속 만들어내는 시스템. 서베이가 물리 인지 생성의 도달점으로 제시한다 |

## 관련 페이지

- [[physical-ai/liu-2025-generative-physical-ai-in-vision]]: 이 해설이 다루는 원 서베이. 고해상도 도식과 PAG-E 방법 38편 요약표가 그 페이지에 있다.
- [[physical-ai/nvidia-2025-cosmos-world-foundation-model-platform]]: PAG-I 사례로 언급한 Cosmos의 원 논문. world foundation model 학습 파이프라인과 physics alignment 평가를 다룬다.
- [[physical-ai/li-2025-a-comprehensive-survey-on-world]]: world model 서베이. 예측에 초점을 둔 쪽이 li-2025라면 Liu 2025는 생성 쪽이다.
- [[physical-ai/hou-2026-world-model-for-robot-learning]]: 로봇 학습에서 world model이 쓰이는 방식 정리. 향후 방향 여섯 번째인 로봇 응용의 현재 지형이다.
- [[physical-ai/zhang-2026-a-survey-of-physical-ai]]: 시리즈 1편이 다룬 서베이. 이 해설이 위치를 잡을 때 기준으로 삼은 로드맵이다.
- [[overviews/physical-ai-overview]]: physical-ai 카테고리의 분류 뼈대와 학습 경로 허브.
