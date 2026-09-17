---
title: "A Comprehensive Review of Generative Physical Artificial Intelligence"
type: paper
year: 2026
category: physical-ai
raw_path: raw/papers/gaba-2026-a-comprehensive-review-of-generative.pdf
raw_filename: "gaba-2026-a-comprehensive-review-of-generative.pdf"
source_collection: external
authors: "Satyam Gaba, Krutiksinh Rana, Siva Sai, Vinay Chamola, Dusit Niyato"
arxiv_id: "2609.18111"
tags: [physical-ai, vla, world-model, robot-learning, imitation-learning, benchmark, safety]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/gaba-2026-a-comprehensive-review-of-generative/fig01.png
    raw: raw/papers/gaba-2026-a-comprehensive-review-of-generative-figures/fig01.png
    caption: "GPAI 시스템 전체 구조. 실제 데이터와 시뮬레이션 데이터가 학습을 담당하고, embodiment 안에서 perception, cognition, actuation이 맞물리며, 실행 결과가 평가를 거쳐 다시 데이터로 되먹임된다 (Figure 1, p.4)"
    page: 4
    bbox_norm: [0.132, 0.065, 0.869, 0.447]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/gaba-2026-a-comprehensive-review-of-generative/fig02.png
    raw: raw/papers/gaba-2026-a-comprehensive-review-of-generative-figures/fig02.png
    caption: "GPAI taxonomy. 기능에 따라 generative control, generative action policy, generative data generation 세 묶음으로 나누고 그 아래 VLA, RFM, LBM, DPM, WFM 다섯 모델 계열을 배치한다 (Figure 2, p.7)"
    page: 7
    bbox_norm: [0.112, 0.048, 0.908, 0.276]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/gaba-2026-a-comprehensive-review-of-generative/fig03.png
    raw: raw/papers/gaba-2026-a-comprehensive-review-of-generative-figures/fig03.png
    caption: "RFM 구조. action, 텍스트, 센서, 시각 입력이 각각의 인코더를 거쳐 fusion module에서 하나의 토큰 열로 합쳐지고, Transformer 인코더와 action 디코더를 지나 여러 embodiment의 제어 명령이 된다 (Figure 3, p.8)"
    page: 8
    bbox_norm: [0.085, 0.067, 0.918, 0.376]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/gaba-2026-a-comprehensive-review-of-generative/fig04.png
    raw: raw/papers/gaba-2026-a-comprehensive-review-of-generative-figures/fig04.png
    caption: "VLA 일반 구조. 이미지, 지시문, 로봇 상태가 각각 인코딩된 뒤 LLM이 하나의 임베딩으로 융합하고, action 디코더가 이를 이산 action 토큰으로 바꾼다 (Figure 4, p.10)"
    page: 10
    bbox_norm: [0.165, 0.060, 0.885, 0.382]
    strategy: manual
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/gaba-2026-a-comprehensive-review-of-generative/fig05.png
    raw: raw/papers/gaba-2026-a-comprehensive-review-of-generative-figures/fig05.png
    caption: "LBM 구조. 왼쪽 pre-training 단계는 진위 판정과 물리 타당성 판정 두 가지 reward로 actor network를 학습시키고, 오른쪽 추론 단계는 임베딩 신경망과 policy network로 실시간 action을 만든다 (Figure 5, p.12)"
    page: 12
    bbox_norm: [0.128, 0.069, 0.872, 0.493]
    strategy: caption-region
    curated: true
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/gaba-2026-a-comprehensive-review-of-generative/fig06.png
    raw: raw/papers/gaba-2026-a-comprehensive-review-of-generative-figures/fig06.png
    caption: "DPM 구조. 멀티모달 Transformer 인코더가 만든 observation 임베딩이 denoising 과정을 조건화하고, 노이즈 상태의 action을 반복 정제해 prediction horizon 길이의 action 열을 만든다 (Figure 6, p.13)"
    page: 13
    bbox_norm: [0.125, 0.060, 0.900, 0.338]
    strategy: manual
    curated: true
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/gaba-2026-a-comprehensive-review-of-generative/fig07.png
    raw: raw/papers/gaba-2026-a-comprehensive-review-of-generative-figures/fig07.png
    caption: "WFM 학습과 closed-loop 제어 구조. 영상 데이터가 큐레이션과 토크나이저를 거쳐 WFM을 학습시키고, 제어 시점에는 planner가 WFM에 rollout을 질의해 최적 후보 action을 고른다 (Figure 7, p.15)"
    page: 15
    bbox_norm: [0.089, 0.063, 0.911, 0.386]
    strategy: caption-region
    curated: true
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/gaba-2026-a-comprehensive-review-of-generative/fig08.png
    raw: raw/papers/gaba-2026-a-comprehensive-review-of-generative-figures/fig08.png
    caption: "GPAI 적용 분야 일곱 가지와 대표 사례. 자율주행, humanoid, 물류, 스마트 시스템, 산업 로봇, 소비자와 연구, 의료 로봇 (Figure 8, p.17)"
    page: 17
    bbox_norm: [0.098, 0.064, 0.472, 0.230]
    strategy: caption-region
    curated: true
  - id: tab01
    label: Table I
    kind: table
    file: assets/gaba-2026-a-comprehensive-review-of-generative/tab01.png
    raw: raw/papers/gaba-2026-a-comprehensive-review-of-generative-figures/tab01.png
    caption: "선행 Physical AI 서베이 5편과 본 서베이의 비교. 주요 초점, 기여, 한계와 함께 적용 분야, 벤치마크, 포괄 범위 세 항목의 충족도를 표시한다 (Table I, p.3)"
    page: 3
    bbox_norm: [0.070, 0.082, 0.930, 0.470]
    strategy: table-region
    curated: true
  - id: tab02
    label: Table II
    kind: table
    file: assets/gaba-2026-a-comprehensive-review-of-generative/tab02.png
    raw: raw/papers/gaba-2026-a-comprehensive-review-of-generative-figures/tab02.png
    caption: "서베이에서 쓰는 약어 24개 목록. CNN, DPM, DPPO, DT, GPAI, HRI, HRL 등 (Table II, p.3)"
    page: 3
    bbox_norm: [0.500, 0.544, 0.930, 0.938]
    strategy: table-region
    curated: false
  - id: tab03
    label: Table III
    kind: table
    file: assets/gaba-2026-a-comprehensive-review-of-generative/tab03.png
    raw: raw/papers/gaba-2026-a-comprehensive-review-of-generative-figures/tab03.png
    caption: "다섯 모델 계열 비교표. 핵심 기능, 대표 모델, 대상 embodiment, 데이터, 학습 방식, 적응력, 적용 분야를 나란히 놓는다 (Table III, p.16)"
    page: 16
    bbox_norm: [0.070, 0.082, 0.930, 0.458]
    strategy: table-region
    curated: true
  - id: tab04
    label: Table IV
    kind: table
    file: assets/gaba-2026-a-comprehensive-review-of-generative/tab04.png
    raw: raw/papers/gaba-2026-a-comprehensive-review-of-generative-figures/tab04.png
    caption: "한계 9가지 요약표. 각 항목마다 설명, 주요 난점, 안전 측면의 파급, 제안된 해법을 대응시킨다 (Table IV, p.20)"
    page: 20
    bbox_norm: [0.074, 0.082, 0.926, 0.500]
    strategy: table-region
    curated: true
---

## 한 줄 요약 (One-line Summary)

foundation model과 물리적 embodiment가 결합한 흐름을 Generative Physical AI(GPAI)로 이름 붙이고, RFM, VLA, LBM, DPM, WFM 다섯 계열의 taxonomy와 적용 사례, 한계 9가지를 하나의 체계로 묶은 종합 서베이다.

## 1. 자료 정보 (Document Information)

- 제목: A Comprehensive Review of Generative Physical Artificial Intelligence
- 저자: Satyam Gaba(Qualcomm Research, University of the Cumberlands), Krutiksinh Rana(BITS-Pilani Goa), Siva Sai(National University of Singapore), Vinay Chamola(BITS-Pilani Pilani), Dusit Niyato(Nanyang Technological University)
- arXiv: 2609.18111v1 [cs.RO], 2026년 9월 16일
- 분량: 본문 22쪽 + 참고문헌, Figure 8개와 Table 4개
- 성격: IEEE 형식 서베이. 저자진은 IoT와 edge 환경을 염두에 둔 embodied AI 관점을 명시한다
- 지원: TIH Foundation for IoT & IoE의 CHANAKYA Fellowship(과제번호 CFP2022027)

## 2. 주요 기여 (Key Contributions)

저자들이 본문에서 여섯 가지로 밝힌 기여는 다음과 같다.

1. GPAI 시스템의 구조적 기반, 핵심 구성 요소, 적용 분야, 실제 배치 현황을 함께 다룬 최초의 종합 서베이를 제시한다.
2. RFM, VLA, LBM, DPM, WFM 다섯 패러다임의 taxonomy를 세우고, perception과 action의 통합, action policy 생성, 학습 데이터 생성이라는 상호 보완 관계를 밝힌다.
3. GPAI의 구성 요소를 정리하고 비교에 널리 쓰이는 평가 벤치마크를 함께 제시한다.
4. 자율주행과 ADAS, 산업 로봇과 제조, 의료 로봇, humanoid와 HRI, 물류와 공급망, 디지털 인프라와 스마트 시스템, 소비자와 연구 용도 일곱 분야의 적용 사례를 정리한다.
5. 데이터 부족, 편향과 윤리, 하드웨어와 실시간 제약, sim2real, 일반화와 추론, 통합 복잡도, 정밀 제어, 견고성과 안전, 투명성과 설명 가능성, 에너지 효율, 확장과 연산 비용에 걸친 한계를 분석하고 완화 방향을 제시한다.
6. 데이터 효율적 학습, 모듈형 foundation model 구조, 실시간 제어를 위한 edge 연산, 안전 규약과 거버넌스라는 향후 연구 방향을 제시한다.

서베이 자체의 차별점은 Table I에 정리돼 있다. 선행 서베이 5편이 각각 로봇 manipulation, 비전 분야의 physics-aware generation, 로보틱스용 foundation model, embodied AI용 world model, foundation model 기반 robot learning에 국한된 반면, 이 서베이는 perception, cognition, actuation 전 구간을 하나의 taxonomy로 잇고 안전 보증과 데이터 부족, sim2real, 윤리 같은 횡단 과제를 함께 다룬다고 주장한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 GPAI의 정의와 전통 구조로부터의 전환

GPAI는 대규모 generative model을 써서 자율적 물리 시스템의 action, trajectory, 환경 예측을 직접 합성하는 접근을 가리킨다. 좁은 데이터셋에 과제별 구조를 맞춰 학습하던 고전 robot learning과 달리, 다양한 멀티모달 데이터로 pre-training한 foundation model을 써서 과제와 물체와 embodiment를 넘나드는 zero-shot 일반화를 노린다. observation을 action에 바로 대응시키는 대신 샘플링 기반 과정으로 제어 policy를 반복 생성하고 정제한다는 점이 구조적 차이다.

전통 로보틱스 구조는 sense, plan, act 모듈의 결합 방식에 따라 세 가지로 나뉜다.

- hierarchical: sense에서 plan을 거쳐 act로 순차 진행한다. 응답이 느리고 동적 환경 적응이 약하다.
- reactive: plan 단계를 없애고 sense와 act만 잇는다. 응답은 빠르지만 추론 능력이 없다.
- hybrid: 과제 planning과 반응적 실행을 결합한다. planning이 독립적으로 진행되는 동안 sense와 act는 긴밀히 결합돼 즉각 반응한다. PLAN 다음 SENSE-ACT 방식으로 현재 과제를 반응적으로 수행하면서 미래 목표를 계산한다.

현대 GPAI는 hybrid 구조의 발전형으로, planning 자리에 LLM 같은 generative model이 들어가고 sense 쪽은 VLM이 추상적 추론을 실제 perception에 grounding한다.

### 3.2 산업 동향

시장 전망으로 2035년까지 AI 기반 로봇 13억 대 배치, humanoid 부문 380억 달러 규모, 2033년까지 AI 로보틱스 시장 1,780억 달러가 인용된다. 실제 배치 사례로 아마존이 75만 대 넘는 AI 구동 로봇을 도입해 일부 물류 센터에서 최대 25%의 효율 개선을 얻었다는 수치가 제시된다. 다만 안전 인증, 규제 체계, 통합 비용, 인력 적응이라는 배치 과제가 남아 있다고 짚는다.

### 3.3 GPAI의 구성 요소

embodiment는 네 하위 시스템으로 이뤄진다.

| 구성 요소 | 역할 | 대표 요소 |
|---|---|---|
| cognition | 고수준 추론과 의사결정 | LLM, VLM, VLA, diffusion model |
| perception | 멀티모달 환경 이해 | IMU, 카메라, LiDAR, RADAR |
| actuation | 결정을 정밀한 운동으로 변환 | 모터, 액추에이터, 관절, end-effector, 바퀴 |
| feedback loop | 실시간 적응과 학습 | 실행 결과의 평가와 로깅 |

물리적 형태는 manipulation용 로봇 팔과 그리퍼, 이동 플랫폼(자율주행차, 드론, 지상 이동 로봇), 범용 manipulation과 자연스러운 HRI를 노린 humanoid로 나뉜다.

cognition에서는 LLM이 지시문을 파싱해 action 의도와 물체 서술과 공간 참조를 뽑고, VLM이 장면을 분석해 해당 물체를 찾아 위치를 잡는다. 이어 공간 추론으로 최적 trajectory를 정하되 물체의 크기와 파손 위험 같은 속성을 고려해 쥐는 힘을 고른다.

actuation은 작업 공간 제약, 충돌 회피, 부드러움과 에너지 효율 같은 최적화 기준을 반영한 trajectory 실행에서 시작한다. 역기구학 solver가 각 자유도의 관절 각도를 계산하고, 저수준 실시간 컨트롤러가 이를 위치 목표값, 속도 프로파일, 토크 명령으로 바꿔 서보 모터나 공압 실린더, 유압 시스템에 보낸다.

perception은 시각 센서(카메라, 깊이 센서, LiDAR), proprioception 인코더(관절 위치와 속도와 힘), end-effector의 촉각 센서를 결합한다. 깨지기 쉬운 물체를 들 때 촉각 되먹임으로 쥐는 힘을 조절하고, 시각 되먹임으로 물체 이동과 예상 못 한 장애물을 보정하며, proprioception 정보로 균형과 협응을 유지한다.

### 3.4 데이터 기반

GPAI가 쓰는 데이터 종류는 네 가지다. 센서 데이터(RGB-D 이미지, 오디오, 힘과 토크 측정, 촉각 되먹임, proprioception), 사람이나 teleoperation으로 얻은 시연 데이터(demonstration)의 trajectory, 시뮬레이션 환경과 digital twin이 만든 합성 데이터, 텍스트와 이미지와 영상과 action 레이블을 묶은 멀티모달 데이터다.

실제 데이터는 합성 데이터가 완전히 대체하지 못하는 물리적 상호작용과 환경 변이를 담지만, 사람 노동이 필요해 확장이 제한되고 민감 공정 촬영의 프라이버시 위험과 지식재산권 제약이 데이터 공유를 막는다. 시뮬레이션 데이터는 물리적 제약 없이 수백만 시나리오를 안전하게 탐색하게 하고, WFM이 물체 manipulation, 내비게이션, 인간과 로봇 상호작용 시나리오를 생성한다.

데이터 형식은 세 가지로 갈린다.

- 구조화 데이터: 레이블이 붙은 trajectory와 주석 데이터셋. 정밀이 필요한 잘 정의된 기술 학습에 적합하다.
- 비구조화 데이터: 연속 영상 스트림이나 자연어 지시문. 실세계의 모호함과 복잡성을 학습한다.
- 실시간 스트림: 라이브 센서 피드와 사용자 되먹임. 핵심 역량을 유지하면서 현재 맥락에 맞춰 행태를 갱신한다.

### 3.5 학습 패러다임

강화학습은 상태를 관찰하고 action을 골라 그 결과의 바람직함을 나타내는 스칼라 reward를 받는 구조로, policy를 다듬어 기대 reward 총합을 최대화한다. 연속 과제에는 PPO와 SAC가 학습 안정성과 탐색 대 활용 균형 때문에 선호된다. Hierarchical RL은 복잡한 과제를 시간 추상화가 다른 하위 과제로 분해하고, 상위 메타 컨트롤러가 전략을 세우고 하위 컨트롤러가 세밀한 action을 실행한다. RLHF는 사람의 비교 되먹임과 시연 데이터로 모델을 사람의 가치에 맞추지만, 사람의 되먹임이 사회적 편견을 반영할 때 편향이 증폭되고 주석자 간 되먹임이 일관되지 않는 위험이 있다. 그 대안으로 RLAIF는 사람의 선호 레이블을 보조 모델이 만든 비교로 대체한다.

지도학습은 시연 데이터로 특정 운동 기술을 배우는 데 강하지만 학습 데이터에 없는 상황에 약하고 과제마다 대량의 사람 주석이 필요하다. 비지도학습은 군집화와 차원 축소와 generative modeling으로 물체와 표면과 공간 관계의 표현을 배우고, 환경의 물리와 dynamics를 담는 world model 개발과 affordance 발견에 쓰인다. 자기지도학습은 데이터 자체에서 감독 신호를 만들어, 미래 감각 상태 예측이나 action 결과의 순방향 모델 학습 같은 예측 과제로 표현을 배운다. 시각적 외형에서 물체의 촉각 속성(부드러움, 단단함, 질감, 순응성)을 예측하는 교차 모달리티 학습이 대표적이다.

학습 인프라로는 MuJoCo, PyBullet, Isaac Sim 같은 고정밀 물리 시뮬레이터가 쓰이고, digital twin이 실시간 센서 데이터로 유지되는 물리 시스템의 가상 대응물 역할을 한다. sim2real 문제는 domain randomization과 점진적 학습으로 다룬다.

### 3.6 평가 벤치마크

| 벤치마크 | 규모 | 목적 |
|---|---|---|
| LIBERO | 과제 130개 | 평생 robot learning과 policy 구조의 지속 적응 능력 검증 |
| RLBench | 시각 기반 manipulation 과제 100개 | 강화학습과 few-shot 학습 지원 |
| Open X-Embodiment | 로봇 trajectory 100만 개 이상, embodiment 22종 | 교차 embodiment 학습과 pre-training 체크포인트 제공 |

다만 벤치마크 지표와 실세계 견고성의 상관이 약하고, 통제된 환경에서 높은 성공률을 보여도 일반화에 실패하는 사례가 보고된다고 짚는다. 실패 예측 정확도나 사람 안전 여유 같은 안전 지표는 여전히 과소 대표돼 있다.

### 3.7 taxonomy 세 묶음

기능적 역할에 따라 세 묶음으로 나눈다.

| 묶음 | 역할 | 해당 모델 |
|---|---|---|
| Generative Control Models | 감각 입력을 액추에이터 제어 명령에 잇는다 | VLA, RFM, LBM |
| Generative Action Policy Models | trajectory 생성을 전담한다 | DPM |
| Generative Data Generation Models | 학습과 평가용 데이터를 합성한다 | WFM |

### 3.8 Robot Foundation Models (RFM)

RFM은 여러 로봇 플랫폼에서 모은 방대한 상태와 action 쌍으로 학습해 과제별 설계를 최소화한 범용 시스템이다. 구조는 네 가지 입력(action 입력의 trajectory 기록과 end-effector 자세, 자연어 지시문, 힘과 토크 되먹임과 proprioception을 담은 센서 입력, RGB 이미지와 깊이 맵)을 각각의 인코더로 처리한다. action 열에는 temporal convolution, 언어에는 BERT나 GPT 계열 Transformer, 센서에는 신호 처리기, 시각에는 ViT나 CNN이 쓰인다. fusion 인코더가 이들을 하나의 토큰 열로 합치고, Transformer 층의 교차 모달리티 attention이 시각 observation과 텍스트 명령과 물리적 되먹임의 관계를 파악한다. action 디코더가 자율주행차부터 로봇 팔, humanoid까지 여러 embodiment의 실행 가능한 action을 만든다.

RFM은 두 접근으로 갈린다.

| 접근 | 특징 | 사례 |
|---|---|---|
| 과제 특화 | perception이나 grasping planning 같은 좁은 영역에 최적화. 반복 과제 정확도는 높으나 새 상황 적응이 약하고 재구성이나 재학습이 필요하다. 연산과 데이터 요구는 적다 | GraspClutter6D (창고와 통 같은 어수선한 환경의 grasping 전략 예측) |
| 범용 | perception, planning, 제어를 하나의 표현 체계에 통합. 적응력과 일반화가 높으나 연산 자원과 대규모 데이터셋 요구가 크다 | PaLM-E, Gato |

대표 범용 모델 세 가지의 접근이 서로 다르다.

- PaLM-E: 언어 중심 접근. pre-training된 LLM의 임베딩 공간에 연속적 embodied observation을 직접 넣는다. PaLM 기반 디코더 전용 Transformer에 모달리티별 인코더를 붙여 이미지와 로봇 상태와 센서 데이터를 언어 모델 차원의 임베딩으로 바꾼다. 텍스트 토큰과 인코딩된 observation을 교차 배치한 "멀티모달 문장"을 처리해 단계별 계획을 자연어로 만들며, 실행에는 외부 해석이 필요하다.
- Gato: 모달리티와 무관하게 모든 입출력을 하나의 어휘 공간으로 토큰화해 단일 Transformer로 처리한다. 텍스트는 서브워드로, 이미지는 ResNet 인코더가 16x16 패치 열로, 연속 action은 이산화기가 미리 정한 범주로, 센서 observation은 직렬화기가 구조화된 토큰 열로 바꾼다. 수백 과제에 autoregressive 교차 엔트로피 손실을 함께 적용하며, 모달리티별 인코더 없이 self-attention이 교차 모달리티 표현을 배우게 한다.
- GPT-4: 로보틱스를 위해 설계되지 않았지만 복잡한 자연어 명령 해석과 실행 가능한 단계 분해, 로봇용 코드 생성에 강하다. 적절한 실행 체계와 미들웨어와 짝지으면 인지 엔진 역할을 한다.

### 3.9 Vision Language Action Models (VLA)

VLA는 시각 perception과 자연어 이해와 action 생성을 하나의 틀에 긴밀히 통합한 멀티모달 GPAI다. 범용 RFM과 달리 embodied AI 용도로 설계돼 감각 운동 제어에 맞춘 구조를 갖는다. 정의적 특징은 dual-system VLA 구조로, 멀티모달 추론을 담당하는 VLM 부분과 Transformer 디코더나 diffusion policy로 구현한 action 생성 모듈을 결합한다.

처리 흐름은 이미지 observation, 자연어 지시문, proprioception 상태 세 입력에서 시작한다. 이미지는 ViT가 패치 단위 임베딩으로 토큰화하고, 지시문은 USE 같은 모델이 의미 임베딩으로 만들며, proprioception 인코더가 관절 각도와 속도와 힘 측정을 시간적으로 일관된 토큰으로 바꾼다. 세 흐름은 공유 임베딩 공간에 투영돼 LLM 코어에 이산 토큰 열로 들어가고, 멀티모달 attention 층이 이어 붙인 열 전체에 작용해 시각 토큰이 언어와 proprioception 토큰에 attention하고 그 역도 가능하게 한다. 융합된 표현은 action 디코더를 거쳐 관절 토크나 속도 같은 저수준 명령, 혹은 grasp와 move와 release 같은 상위 primitive로 바뀐다.

RFM이 학습 후 보조 제어 헤드나 외부 policy 층을 덧붙여 로보틱스에 적응시키는 것과 달리, VLA는 action 디코더를 핵심 구조에 포함시켜 시각과 언어 부분과 함께 학습한다. 제어 목적 함수의 그래디언트가 멀티모달 시스템 전체로 역전파돼 시각 인코더와 언어 모델과 action 디코더가 감각 운동 제어에 맞춰 함께 적응한다.

#### 대표 VLA 구현

| 모델 | 규모와 backbone | 핵심 설계 | 성능 |
|---|---|---|---|
| RT-1 | 파라미터 3,500만 개 Transformer | USE로 지시문 임베딩, EfficientNet-B3로 시각 토큰, FiLM 층으로 언어에 따른 시각 특징 조절, TokenLearner가 시각 토큰 81개를 8개로 압축. action 11차원을 각각 256개 구간으로 이산화 | manipulation 과제 700종 이상에서 성공률 67% |
| RT-2 | 파라미터 550억 개 | action을 언어처럼 취급해 단어와 시각 토큰과 같은 표현 공간의 텍스트형 토큰으로 임베딩. PaLI-X(시각 해석과 물체 grounding)와 PaLM-E(언어와 센서 융합)를 로보틱스 데이터셋과 웹 규모 멀티모달 코퍼스로 co-fine-tuning | 미학습 과제 성공률 62%로 RT-1의 32%를 상회 |
| OpenVLA | Prismatic-7B 비전 언어 backbone + Llama 2 | DINOv2와 SigLIP 특징을 합친 이중 시각 인코더. 7자유도 action space를 256개 구간으로 이산화하고 Llama 토크나이저 어휘에 전용 action 토큰을 예약 | 벤치마크 29종에서 RT-2-X를 상회하면서 파라미터는 7분의 1 |
| Gemini Robotics VLA | Gemini 2.0 + ALOHA teleoperation 플랫폼 | 양팔 협응 manipulation에 초점 | 단일 팔을 넘어선 협응 양팔 동작 |

RT-1의 action 11차원은 위치 변위(x, y, z), 회전 조정(roll, pitch, yaw), 그리퍼 상태 전이, 종료 신호를 담아 6자유도 manipulation과 grasping을 지원한다.

### 3.10 Large Behavior Models (LBM)

LBM은 복잡한 물리적 action 열을 배우고 재현하고 생성하는 시스템으로, 텍스트와 대화에 집중하는 LLM의 패러다임을 신체 행태로 확장한다. 텍스트, 이미지, 영상, 센서 스트림을 포함한 멀티모달 데이터셋으로 학습해 사람다운 행태와 물체 상호작용을 합성한다. 핵심 기제는 강화학습으로, 정적 데이터셋 학습과 달리 실세계 환경의 되먹임에 실시간으로 행태를 맞춘다.

pre-training 단계에서는 전문가 시연 데이터와 행태 임베딩이 actor network를 이끌고, actor network는 시뮬레이션이나 실제 환경과 상태 및 action 생성으로 상호작용한다. feedback network가 두 가지 reward를 공급한다.

- 진위 되먹임: discriminator와 critic이 생성된 동작이 실제처럼 보이는지 평가한다.
- 물리 타당성 되먹임: 상태와 action 전이의 물리적 정합성을 평가한다.

두 reward를 합쳐 actor policy 학습을 다듬고, replay buffer가 반복 갱신용 경험을 저장한다. 추론 단계에서는 상태 입력이 임베딩 신경망을 거쳐 상태 임베딩과 latent 행태 임베딩이 되고, policy network가 이 표현과 latent 변수를 받아 action 명령, 예측된 미래 상태, value 추정, discriminator 되먹임을 낸다.

Meta Motivo는 과제별 학습 없이 whole-body control을 수행하는 LBM 사례다. FBCPR(Forward Backward Representations with Conditional Policy Regularization) 알고리즘 위에 다섯 신경망을 조합한다.

| 신경망 | 역할 |
|---|---|
| Forward Network | 현재 상태와 제안된 action과 latent 변수로 미래 상태를 예측한다 |
| Actor Network | action을 가우시안 분포의 평균으로 내어 부드러운 동작을 만든다 |
| Critic Network | 상태와 action과 latent 조합을 평가해 강화학습 되먹임을 준다 |
| Backward Network | 상태를 latent 표현으로 대응시켜 견고한 학습을 돕는다 |
| Discriminator Network | 레이블 없는 동작 데이터셋과 비교해 생물학적 타당성을 강제한다 |

### 3.11 Diffusion Policy Models (DPM)

DPM은 action을 직접 예측하는 대신 가우시안 노이즈를 반복 denoising해 일관된 고차원 action 열로 바꾸는 diffusion model 기반 제어 틀이다. proprioception 데이터(현재 자세와 로봇 상태)와 시각 데이터(point cloud, RGB-D 카메라 스트림)를 멀티모달 Transformer 인코더에 넣어 시간 구간에 걸친 observation 임베딩을 만든다. 이 임베딩이 diffusion policy를 조건화하고, 무작위로 뽑은 노이즈 action에서 시작해 N에서 K를 뺀 단계의 denoising 반복을 돈다. 각 단계에서 CNN이나 Transformer 기반 policy network가 현재 action 후보에 섞인 노이즈를 예측하고, 이 예측으로 action을 정제해 prediction horizon 길이의 action 열을 만든다.

강점은 미래 4단계에서 8단계에 걸친 시간적으로 일관된 action 열 생성이다. 쌓은 observation을 조건으로 삼아 시간 맥락을 유지하고, FiLM 층과 교차 attention이 과거 카메라 프레임과 proprioception 신호를 통합한다. FiLM 조건화는 denoising 신경망 전체에 채널 단위 변조를 적용해 시각 observation과 텍스트 목표가 모든 층의 attention 가중치에 영향을 주게 한다.

구조는 receding-horizon 제어를 쓴다. 긴 action 열을 예측하고 앞부분만 실행한 뒤 자주 재계획해 compounding error를 줄인다. 핵심 신경망은 U-Net 기반 denoising 신경망이고, 학습은 전문가 시연 trajectory에 가해진 순방향 노이즈 과정을 되돌리는 방식으로 L2 손실이나 엡실론 예측 손실을 쓴다.

행태를 평균 내는 전통 behavioral cloning과 달리 DPM은 복잡한 과제의 여러 유효한 해를 내재적으로 표현해 LSTM-GMM이나 IBC가 겪는 mode collapse를 피한다. 실증 평가에서 벤치마크 4종의 로봇 과제 12개에 걸쳐 평균 성공률이 47% 개선됐다.

학습 데이터셋은 RoboMimic(사람이 teleoperation한 trajectory로 물체 들기, 놓기, 삽입, 다중 팔 협응을 다루며 조작자 숙련도를 다양하게 섞음), CALVIN(여러 환경의 long-horizon 언어 조건 과제), LIBERO(공간 추론, 물체 manipulation, 목표 지향 과제)를 쓴다. 평가 지표는 과제 성공률, 멀티모달 action 분포 coverage, 시간적 일관성, 실시간 추론 성능, 교차 플랫폼 일반화(2자유도에서 6자유도까지의 action space), perturbation 하의 견고성이다. 평가 프로토콜에는 T자 블록을 정확한 목표에 맞추는 Push-T 같은 기하 정밀 과제가 들어간다.

최근 진전으로 point cloud 기반 공간 일반화를 가능하게 한 3D Diffusion Policy(DP3)와, 희소하거나 잡음 많은 reward에서 안정적 fine-tuning을 위해 강화학습과 결합한 DPPO(Diffusion Proximal Policy Optimization)가 있다. diffusion 기반 policy는 현대 VLA 구조의 action 디코더로도 통합되는데, UC Berkeley의 Octo가 diffusion policy로 연속 관절 trajectory를 생성한다. 실증 평가에서 diffusion 요소를 결합한 VLA 구조는 로봇 manipulation 과제 성공률 80% 이상을 기록해 결합하지 않은 구현의 40% 미만을 크게 앞섰다.

### 3.12 World Foundation Models (WFM)

WFM은 명시적 물리 상태가 아니라 observation이나 latent 표현 위에서 동작하는 환경 dynamics의 학습된 예측 모델이다. 현재 상태와 후보 action을 조건으로 미래 이미지, 영상, latent 세계 표현을 시뮬레이션해 환경 전개의 반사실 평가를 가능하게 한다.

형식적으로 시점 t의 원 observation을 s_t, 토큰화된 observation 또는 latent 세계 표현을 x_t = enc(s_t)라 할 때 한 단계 예측은 x_{t+1} = f(x_t, a_t)로 쓴다. 후보 action 열 a_{t:t+H-1}이 주어지면 H단계 rollout은 x_{t+1:t+H} = f(x_t, a_{t:t+H-1})이다. 예측 오차가 긴 구간에서 누적되므로 WFM은 보통 짧은 구간 rollout으로 질의되고 receding-horizon 방식의 잦은 재계획과 함께 쓰인다.

학습은 데이터 큐레이션에서 시작한다. 여러 센서의 시간 스트림을 동기화하고 episode나 클립으로 분할한 뒤 품질 기준으로 걸러내며, 필요하면 주석을 붙인다. 원 감각 입력(주로 영상, 경우에 따라 proprioception 측정과 LiDAR 스캔과 관성 데이터)은 토큰화를 거쳐 고차원 observation을 압축한 표현이 된다. 학습 목표는 과거 observation과 가용한 action을 조건으로 한 다음 단계 또는 다음 구간 예측이다.

구현 방식은 두 가지다.

| 방식 | 특징 | 적합한 경우 |
|---|---|---|
| autoregressive | 시간 순서로 미래 토큰을 순차 예측한다. 이산 latent 표현에 적합하고 세밀한 조건화와 controllability를 준다 | 연산 효율과 순차 제어가 중요할 때 |
| diffusion 기반 | 반복 denoising으로 예측을 생성한다. 다중 모드 미래 분포를 표현하고 높은 충실도를 얻지만 추론 비용이 크다 | 여러 그럴듯한 미래가 존재하고 품질과 다양성이 중요할 때 |

closed-loop 제어에서 planner나 MPC가 샘플링이나 최적화로 후보 action 열을 제안하면, WFM이 각 후보에 대해 예측 rollout을 생성한다. planner는 비용이나 reward 함수에 안전 요구와 운영 가드레일을 담은 제약 벌점을 더해 결과를 평가하고, 최고 점수 action 열의 첫 action을 receding-horizon 방식으로 실행한다. 실행 시점의 planning 비용을 줄이려면 planner가 고른 action을 근사하는 policy 모델을 distillation으로 학습시켜 매핑을 얻거나, 모델 기반 강화학습으로 WFM rollout을 써서 value 함수를 최적화한다.

WFM은 digital twin을 보완한다. digital twin은 해석 가능하고 제약 기반의 모델링을 제공하고, WFM은 해석적으로 모델링하기 어려운 복잡한 dynamics와 observation 통계를 데이터로 배운다. 혼합 파이프라인에서는 digital twin이 구조적 사전 지식과 강한 제약을 공급하고 학습된 부분이 잔여 dynamics와 센서 observation을 모델링하거나 예외 상황 변이를 생성한다. 최근에는 지배 방정식과 보존 법칙을 WFM의 손실 함수나 latent 공간에 직접 넣는 physics-informed machine learning이 결합되고 있다.

NVIDIA Cosmos는 WFM 플랫폼 사례로 세 부분으로 구성된다.

| 구성 요소 | 기능 |
|---|---|
| Cosmos Predict | 멀티모달 프롬프트에서 미래 세계 상태를 영상으로 생성해 시나리오 예측과 planning에 쓴다 |
| Cosmos Transfer | LiDAR point cloud, 분할 맵, 깊이 맵, HD 맵 같은 구조화 입력을 사실적이고 제어 가능한 장면으로 바꾼다 |
| Cosmos Reason | 시나리오 분석과 큐레이션과 주석을 돕는 추론 가능한 VLM을 제공한다 |

WFM 평가는 생성 품질과 시간적 안정성, 조건 신호에 대한 controllability, 물리적 타당성(물체 영속성과 기본 dynamics 정합), 학습과 의사결정에 대한 하류 유용성을 함께 본다.

| 벤치마크 | 구성 | 특징 |
|---|---|---|
| WorldScore | 다음 장면 예측 시나리오 3,000개 | controllability와 품질과 dynamics를 다룬다. 카메라 controllability, 물체 controllability, 내용 정합으로 controllability를 정량화한다 |
| WorldModelBench | 이미지와 텍스트 조건 쌍 350개, 크라우드소싱 레이블 6만 7천 개 | 최신 모델 14종을 평가한다. 질량 보존을 어기는 물리적으로 불가능한 크기 변화 같은 미묘한 위반을 잡아낸다 |
| WorldSimBench | HF-Embodied 데이터셋의 주석 튜플 3만 5천 개 이상 | 명시적 지각 평가와 암묵적 조작 평가 두 부분으로 나뉜다. 후자는 생성된 영상을 action으로 변환해 하류 유용성을 측정한다 |

### 3.13 taxonomy 종합

Table III의 비교는 다섯 모델 계열이 로봇 제어 파이프라인의 어느 단계에 대응하는지를 보여준다. RFM과 VLA는 perception과 planning과 action을 관통해 넓은 일반화를 지원하고, WFM과 LBM과 DPM은 각각 예측 시뮬레이션과 데이터 생성, 세밀한 행태 생성, 신뢰할 수 있는 저수준 제어라는 특화 기능을 맡는다. 저자들은 특화 모델의 강점이 범용 RFM과 VLA 안으로 통합되는 수렴 흐름을 전망한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 모델별 보고 수치

| 모델 | 수치 |
|---|---|
| RT-1 | manipulation 과제 700종 이상에서 성공률 67% |
| RT-2 | 미학습 과제 성공률 62% (RT-1은 32%) |
| OpenVLA | 벤치마크 29종에서 RT-2-X 상회, 파라미터는 7분의 1 |
| Diffusion Policy | 벤치마크 4종의 과제 12개에서 평균 성공률 47% 개선 |
| VLA + diffusion 결합 | manipulation 성공률 80% 이상 (결합하지 않은 구현은 40% 미만) |
| NVIDIA Groot N1 | 파라미터 22억 개, 추론 64ms, VLM 10Hz, Diffusion Transformer 120Hz |

### 4.2 분야별 적용 사례

**자율주행과 ADAS.** Wayve의 GAIA 계열이 신경망 시뮬레이터 역할을 한다. GAIA-1은 토큰화된 영상과 텍스트와 action 입력에 대한 autoregressive 열 예측으로 world modeling을 정식화하고, 대규모 Transformer와 영상 diffusion 디코더를 결합해 제어 가능한 주행 rollout을 만든다. GAIA-2는 latent diffusion 틀로 확장해 지리적으로 다양한 도메인에서 시간적으로 일관된 다중 시점 영상을 생성하며, 자차 dynamics와 주변 에이전트 상호작용과 도로 의미에 대한 구조화된 조건화로 분포 밖 상황까지 생성한다. Tesla Autopilot은 대규모 차량 데이터로 단일 신경망을 학습시키는 종단간 방식으로, 새 주행 상황을 계속 수집해 재학습하고 OTA 업데이트로 전 차량에 전파하는 데이터 순환을 만든다. NVIDIA DRIVE 플랫폼이 다중 센서 융합과 perception과 motion planning에 필요한 연산 throughput을 제공한다.

**산업 로봇과 제조.** ABB가 산업용 로봇 50만 대 이상을 배치했고 YuMi 협동 로봇은 시각과 힘 감지를 갖췄다. KUKA의 iiwa 로봇은 임피던스 제어와 기계학습으로 적응형 제조 공정을 수행한다. RNB Cosméticos는 토크 센서를 단 Universal Robots UR10 협동 로봇 6대로 화장품 라인 끝단 팔레타이징을 수행하며, 7kg 포장을 분당 6개씩 처리하고 제품 변종 350종 이상을 안전 울타리 없이 다룬다.

**의료 로봇.** Intuitive Surgical의 da Vinci 시스템으로 최소 침습 수술 1,400만 건 이상이 수행됐고, 1만 건 이상에서 사망률 0.12%를 기록했다. 전환율 감소, 수술 부위 감염 감소, 통증 감소가 보고된다. Medtronic의 Hugo 플랫폼은 절차 계획과 실시간 3D 영상과 기구 유도를 제공하며 FDA 시험에서 수술 성공률 98.5%를 기록해 기준치 85%를 크게 넘었다. Cyberdyne의 HAL 외골격은 생체 전기 신호를 쓰며 전 세계 1만 회 이상의 치료 세션이 수행됐고, 40분 세션 9회 후 2분 보행 검사에서 10% 더 멀리 걷는 결과가 확인됐다. 시스템 무게는 15kg다.

**humanoid와 HRI.** NVIDIA Groot N1은 시각과 언어와 proprioception 상태를 VLA Transformer backbone으로 처리하고 diffusion policy 헤드가 예측 action 열을 점진적으로 정제한다. 파라미터 22억 개 규모로 추론 시간 64ms를 달성하며, VLM은 10Hz로 동작하고 Diffusion Transformer는 120Hz로 action을 만든다. Boston Dynamics의 Atlas는 동작마다 시뮬레이션 1억 5천만 회를 학습해 사람에 가까운 민첩성을 얻고 zero-shot sim2real 전이를 수행한다. Agility Robotics의 Digit은 아마존 창고에서 대량 자재 취급과 통 재활용 작업에 배치됐다. Tesla Optimus는 다림질과 청소와 요리 같은 가사를 teleoperation 시스템의 거의 두 배 속도로 수행하며, 대규모 온라인 영상 코퍼스를 imitation learning에 활용한다. Toyota Research Institute는 한 로봇의 경험을 분산된 집단이 공유하는 fleet learning을 추구한다.

**물류와 공급망.** 아마존은 2012년 이후 전 세계에 로봇 75만 대 이상을 배치했고, Sequoia 재고 관리 플랫폼이 AI 기반 경로 planning과 작업 일정으로 물류 센터 생산성을 약 25% 높였다. 월마트의 경로 최적화 소프트웨어는 중복 주행을 줄이고 트레일러 적재를 개선해 연간 불필요 주행 3,000만 마일을 막고 탄소 배출 9,400만 파운드를 줄였다.

**디지털 인프라와 스마트 시스템.** BMW 그룹의 Virtual Factory는 전 세계 생산 거점 30곳 이상의 digital twin으로 확장됐고 생산 계획 비용을 최대 30% 줄일 것으로 전망된다. 레겐스부르크 공장은 하루 약 1,400대의 차량 품질 관리를 AI로 수행하며 57초마다 새 차 한 대를 만들고, GenAI4Q 시범 시스템이 차량마다 맞춤 검사 권고를 생성한다.

**소비자와 연구.** IBM Research의 RoboRXN 플랫폼은 AI 기반 시뮬레이션과 로봇 합성을 결합해 화합물 개발 주기를 수 주에서 수 시간으로 줄인다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

### 5.1 한계 9가지

Table IV가 정리한 항목과 대응 해법은 다음과 같다.

| 한계 | 설명 | 안전 측면 파급 | 제안 해법 |
|---|---|---|---|
| 데이터 부족 | 물리적으로 grounding된 방대한 데이터가 필요하나 수집 비용이 크다 | 안전 임계 맥락의 데이터 공백 | 자기지도학습, few-shot, 전이 학습 |
| 편향과 윤리 | 편향된 데이터가 위험하고 차별적인 action으로 이어진다 | 위험한 행태, 윤리적 실패 | 거버넌스, 편향 탐지와 완화 |
| 하드웨어와 실시간 제약 | 연산 집약성이 edge 기기의 실시간 처리와 충돌한다 | 순간 판단의 지연이나 오류 | 모델 압축, edge AI, 전용 하드웨어 |
| sim2real 전이 | 깨끗한 시뮬레이션과 복잡한 실세계 사이의 현실 격차 | 물리 시스템으로의 위험한 전이 | digital twin, 견고하고 미분 가능한 시뮬레이터 |
| 일반화와 추론 | 맥락 추론이 약해 물리적 action의 이해가 부족하다 | 위험하거나 결함 있는 action | 고급 추론 모델, 멀티모달 통합 |
| 확장성과 복잡도 | perception과 추론과 제어 모듈의 통합이 복잡해 확장을 막는다 | 실험실에서 실세계로의 확장 곤란 | 모듈형이고 적응 가능한 모델 구조 |
| 견고성과 안전 | 실패가 실제 피해를 낳으므로 거의 완벽한 신뢰성이 필요하다 | 사람과 재산에 대한 위해 | 엄격한 안전 검사, 모니터링, 안전 장치 |
| 투명성과 설명 가능성 | 블랙박스 의사결정이 감사와 오류 진단을 막는다 | 안전 임계 시스템 도입의 장벽 | 설명 가능 AI, 해석 가능 모델 |
| 에너지 효율 | 학습에 막대한 연산이 들어 탄소 발자국이 크다 | 환경 영향 | 효율적 알고리즘, 그린 컴퓨팅 |

### 5.2 모델 계열별로 두드러지는 한계

- VLA: 큰 비전 언어 backbone이 상당한 메모리와 연산을 요구해 임베디드 하드웨어에서 빠른 반응형 컨트롤러로 쓰기 어렵다.
- DPM: 제어 결정마다 여러 번의 순방향 계산이 필요한 반복 denoising 때문에 빠른 manipulation에 필요한 50ms 미만 응답 시간과 충돌한다. 또한 확률적 policy라 형식적 안정성과 안전 보증이 없고 경험적 검증에 의존한다.
- LBM: 시뮬레이션에서는 인상적이나 기본 locomotion을 넘어선 실세계 검증이 제한적이고, 모델링되지 않은 접촉 상황과 하드웨어 불완전성에서 성능이 떨어진다.
- RFM: 교차 플랫폼 배치에서 액추에이터 dynamics와 관절 한계와 센서 구성의 차이로 embodiment 불일치가 생겨 새 로봇에서 policy가 예측 불가능하게 동작할 수 있다. 새 도메인에 계속 fine-tuning하면 catastrophic forgetting이 일어난다.

### 5.3 제어 해상도와 형식적 안전

정밀 manipulation은 세밀한 운동 제어를 요구하는데, 많은 VLA가 학습 편의를 위해 action을 차원당 256개 구간 같은 고정 토큰 어휘로 이산화한다. 이 방식은 학습에는 효과적이지만 제어 해상도를 낮춰 작은 동작 불연속을 만들고 정밀 조정이 필요한 작업의 부드러운 실행을 방해한다.

실행 시점 안전 강제는 부분적 완화책이다. Control Barrier Function 기반 필터는 학습된 policy에 액추에이션 단계마다 상태 공간 제약을 부과해, policy가 예상 밖으로 동작해도 시스템이 정의된 안전 영역 안에 머물도록 형식적으로 보장한다. 다만 이런 필터를 foundation model의 확률적 고차원 출력과 결합하는 문제는 미해결로 남아 있다. 기존 평가와 인증 체계는 통제된 환경의 과제 성공에 치중해 접촉 힘 한계, 실패 복구 시간, 에너지 제약 실행 같은 운영 안전 요구를 제대로 담지 못한다.

### 5.4 향후 방향 네 가지

1. 데이터 효율과 학습 방식: 자기지도학습, 전이 학습, few-shot 학습으로 대규모 레이블 데이터셋 의존을 줄이고, 개선된 시뮬레이션 환경과 digital twin으로 sim2real 격차를 좁힌다.
2. foundation model과 모듈 구조: 서로 다른 물리적 embodiment와 환경에 꽂아 쓰는 적응을 지원하는 RFM과 VLA로 나아간다. 추론 구조와 멀티모달 통합의 진전이 인과 이해를 뒷받침한다.
3. 연산 효율과 하드웨어: edge AI, 모델 압축, 전용 하드웨어로 이동 로봇과 임베디드 시스템 배치를 가능하게 한다. 정밀 제어에는 촉각 되먹임 시스템과 액추에이터 기술과 학습된 손재주 모델의 돌파가 필요하다.
4. 안전 규약: 자율성이 커질수록 모델 행태를 감시하고 검증하는 안전 규약과 외부 감사 도구가 필수가 된다. 지속적이고 상호작용적인 학습 능력이 장기 배치에 유용하며, 명확한 윤리 지침과 규제 체계가 필요하다.

## 6. 관련 연구 (Related Work)

Table I이 비교한 선행 서베이는 다섯 편이다.

| 참조 | 초점 | 한계 |
|---|---|---|
| Zhang et al. [7] | 로봇 manipulation용 generative model. 데이터와 중간 표현과 policy의 계층 분류를 도입하고 GAN, VAE, diffusion 접근을 다룬다 | manipulation에 국한되고 다중 도메인 관점과 시스템 위험 평가가 없다 |
| Liu et al. [8] | 비전 분야의 physics-aware generation. 명시적 물리와 암묵적 물리의 패러다임 taxonomy와 평가 프로토콜을 분석한다 | 비전에 한정되고 에이전트의 embodiment와 시스템 맥락과 위험을 다루지 않는다 |
| Xu et al. [9] | 로보틱스의 foundation model. perception과 planning에서 LLM과 VLM의 역할, 데이터셋과 벤치마크를 다룬다 | generative model 통합이 세밀하지 않고 시뮬레이션과 제어에 대한 초점이 약하다 |
| Li et al. [10] | embodied AI용 world model. 세 기준 통합 taxonomy를 세우고 decision-coupled와 general-purpose를 구분하며 공간과 시간 표현을 분석한다 | world model 구조에 한정되고 다른 generative 접근과 위험 평가의 다룸이 적다 |
| Xiao et al. [11] | foundation model 시대의 robot learning. robot learning의 전개와 과제 대응과 플랫폼 비교를 설명한다 | 명시적 generative model이나 sim2real taxonomy를 제시하지 않고 일관된 위험 분석이 없다 |

본문이 인용하는 주요 개별 연구로는 PaLM-E, Gato, RT-1, RT-2, OpenVLA, Gemini Robotics, Meta Motivo, Diffusion Policy, Octo, NVIDIA Cosmos, GAIA-1, GAIA-2가 있고, 학습 알고리즘으로 PPO, SAC, RLHF, RLAIF, HRL이, 시뮬레이터로 MuJoCo, PyBullet, Isaac Sim이 언급된다.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| GPAI (Generative Physical Artificial Intelligence) | 대규모 generative model로 자율적 물리 시스템의 action과 trajectory와 환경 예측을 직접 합성하는 접근. 이 서베이가 제안하는 상위 개념이다 |
| RFM (Robot Foundation Model) | 여러 로봇 플랫폼의 상태와 action 쌍으로 학습해 과제별 설계 없이 폭넓은 로봇 과제를 수행하는 대규모 범용 모델 |
| LBM (Large Behavior Model) | 복잡한 물리적 action 열을 배우고 재현하고 생성하는 모델. LLM의 패러다임을 사람다운 신체 행태로 확장한다 |
| DPM (Diffusion Policy Model) | 가우시안 노이즈를 반복 denoising해 시간적으로 일관된 action 열을 만드는 제어 모델 |
| WFM (World Foundation Model) | observation이나 latent 표현 위에서 환경 dynamics를 예측하는 학습된 모델. 시뮬레이션과 합성 데이터 생성을 담당한다 |
| FBCPR | Forward Backward Representations with Conditional Policy Regularization. Meta Motivo가 쓰는 알고리즘으로 다섯 신경망을 조합해 과제별 학습 없는 whole-body control을 수행한다 |
| TokenLearner | RT-1의 모듈로 attention 기반 중요도 가중치를 학습해 시각 토큰 81개를 8개로 압축한다 |
| FiLM (Feature-wise Linear Modulation) | 언어 입력에 따라 시각 특징을 동적으로 조절하는 층. RT-1과 DPM이 모두 쓴다 |
| receding-horizon 제어 | 긴 action 열을 예측하고 앞부분만 실행한 뒤 자주 재계획해 compounding error를 줄이는 제어 방식 |
| Control Barrier Function 필터 | 학습된 policy 출력에 액추에이션 단계마다 상태 공간 제약을 부과해 안전 영역 유지를 형식적으로 보장하는 실행 시점 안전 장치 |
| digital twin | 실시간 센서 데이터로 동기화되는 물리 시스템의 가상 대응물. 구조적 사전 지식과 강한 제약을 제공한다 |
| RLAIF | Reinforcement Learning from AI Feedback. 사람의 선호 레이블을 보조 모델이 만든 비교로 대체해 선호 최적화를 확장한다 |

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 4 | GPAI 시스템 전체 구조와 closed-loop 되먹임 | caption-region | 별표 wiki 권장 (architecture) |
| fig02 | 7 | GPAI taxonomy 세 묶음과 다섯 모델 계열 | caption-region | 별표 wiki 권장 (taxonomy) |
| fig03 | 8 | RFM의 멀티모달 인코더와 fusion 구조 | caption-region | 별표 wiki 권장 (method) |
| fig04 | 10 | VLA 일반 구조와 action 토큰 디코딩 | manual | 별표 wiki 권장 (method) |
| fig05 | 12 | LBM의 pre-training과 추론 두 단계 | caption-region | 별표 wiki 권장 (method) |
| fig06 | 13 | DPM의 반복 denoising과 prediction horizon | manual | 별표 wiki 권장 (method) |
| fig07 | 15 | WFM 학습과 closed-loop 제어 구조 | caption-region | 별표 wiki 권장 (method) |
| fig08 | 17 | GPAI 적용 분야 일곱 가지와 대표 사례 | caption-region | 별표 wiki 권장 (application) |
| tab01 | 3 | 선행 서베이 5편과의 비교 | table-region | 별표 wiki 권장 (related work) |
| tab02 | 3 | 약어 24개 목록 | table-region | (제외 권장, 한글 본문에서 용어를 직접 풀이한다) |
| tab03 | 16 | 다섯 모델 계열 비교표 | table-region | 별표 wiki 권장 (result) |
| tab04 | 20 | 한계 9가지 요약표 | table-region | 별표 wiki 권장 (limitation) |
