---
title: "RoboColosseum: Evaluating Physical Intelligence at Scale In-The-Wild"
type: paper
year: 2026
category: physical-ai
raw_path: raw/papers/nguyen-2026-robocolosseum-evaluating-physical-intelligence-at.pdf
raw_filename: "nguyen-2026-robocolosseum-evaluating-physical-intelligence-at.pdf"
source_collection: external
authors: "Tan Sang Nguyen, Yi Ru Wang, Shailesh Shailesh, Gang Yang, Jiamo Hu, Jianuo Jiang, Haoquan Fang, Zhongzheng Ren, Zhongyi Luo, Ian Chong, et al., Dieter Fox, David Hsu, Thomas Wolf, Jiafei Duan"
arxiv_id: "2611.02497"
url: "https://robocolosseum.ai/"
tags: [physical-ai, benchmark, manipulation, humanoid]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/nguyen-2026-robocolosseum-evaluating-physical-intelligence-at/fig01.png
    raw: raw/papers/nguyen-2026-robocolosseum-evaluating-physical-intelligence-at-figures/fig01.png
    caption: "RoboColosseum 전체 구성. 분산 평가 사이트와 공용 policy serving 인프라, Fine-tune Track과 Open Track 두 트랙의 관계와 트랙별 산출물"
    page: 2
    bbox_norm: [0.106, 0.073, 0.894, 0.4785]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/nguyen-2026-robocolosseum-evaluating-physical-intelligence-at/fig02.png
    raw: raw/papers/nguyen-2026-robocolosseum-evaluating-physical-intelligence-at-figures/fig02.png
    caption: "네 embodiment의 하드웨어 구성. Bimanual-YAM, SO-101, DROID 구성의 Franka, Unitree G1의 카메라와 그리퍼, 연산 장비 배치"
    page: 5
    bbox_norm: [0.106, 0.0729, 0.894, 0.2294]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/nguyen-2026-robocolosseum-evaluating-physical-intelligence-at/fig03.png
    raw: raw/papers/nguyen-2026-robocolosseum-evaluating-physical-intelligence-at-figures/fig03.png
    caption: "embodiment별 Open Track DCR rating(Elo 척도)과 95% 신용구간. VLA policy 5종과 frontier 모델 3종 비교"
    page: 9
    bbox_norm: [0.106, 0.073, 0.894, 0.3132]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/nguyen-2026-robocolosseum-evaluating-physical-intelligence-at/fig04.png
    raw: raw/papers/nguyen-2026-robocolosseum-evaluating-physical-intelligence-at-figures/fig04.png
    caption: "frontier 모델과 VLA policy의 task progress 비교. 901회 대응 평가에서 우세 비율과 평균 진행도 차이"
    page: 10
    bbox_norm: [0.106, 0.073, 0.894, 0.2881]
    strategy: caption-region
    curated: true
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/nguyen-2026-robocolosseum-evaluating-physical-intelligence-at/fig06.png
    raw: raw/papers/nguyen-2026-robocolosseum-evaluating-physical-intelligence-at-figures/fig06.png
    caption: "사람이 매긴 과제 난이도 구간별 성공률과 실패 실행의 평균 normalized progress"
    page: 12
    bbox_norm: [0.1444, 0.073, 0.8556, 0.281]
    strategy: caption-region
    curated: true
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/nguyen-2026-robocolosseum-evaluating-physical-intelligence-at/fig07.png
    raw: raw/papers/nguyen-2026-robocolosseum-evaluating-physical-intelligence-at-figures/fig07.png
    caption: "Fine-tune Track embodiment별 progress reachability 곡선. 기준의 일정 비율 이상을 만족한 trial 비율"
    page: 12
    bbox_norm: [0.106, 0.3489, 0.894, 0.565]
    strategy: caption-region
    curated: true
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/nguyen-2026-robocolosseum-evaluating-physical-intelligence-at/fig08.png
    raw: raw/papers/nguyen-2026-robocolosseum-evaluating-physical-intelligence-at-figures/fig08.png
    caption: "fine-tuning 후 policy별 실패 단계. SO-101 cube_drawer와 DROID close_laptop에서 처음 충족하지 못한 기준"
    page: 14
    bbox_norm: [0.106, 0.073, 0.894, 0.2745]
    strategy: caption-region
    curated: true
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/nguyen-2026-robocolosseum-evaluating-physical-intelligence-at/fig09.png
    raw: raw/papers/nguyen-2026-robocolosseum-evaluating-physical-intelligence-at-figures/fig09.png
    caption: "embodiment별 Open Track 순위와 Fine-tune Track 순위의 교차 비교와 Spearman 상관"
    page: 15
    bbox_norm: [0.106, 0.073, 0.894, 0.3158]
    strategy: caption-region
    curated: true
  - id: fig10
    label: Figure 10
    kind: figure
    file: assets/nguyen-2026-robocolosseum-evaluating-physical-intelligence-at/fig10.png
    raw: raw/papers/nguyen-2026-robocolosseum-evaluating-physical-intelligence-at-figures/fig10.png
    caption: "(a) embodiment 간 Fine-tune 순위 일치도(Kendall W 0.24), (b) 평가 사이트 부분집합 간 DCR 순위 일치도"
    page: 16
    bbox_norm: [0.106, 0.0729, 0.8824, 0.2877]
    strategy: caption-region
    curated: true
  - id: fig11
    label: Figure 11
    kind: figure
    file: assets/nguyen-2026-robocolosseum-evaluating-physical-intelligence-at/fig11.png
    raw: raw/papers/nguyen-2026-robocolosseum-evaluating-physical-intelligence-at-figures/fig11.png
    caption: "(a) active matchmaking과 균등 샘플링의 순위 일치도 수렴 비교, (b) 평가 규모에 따른 Open Track 순위 안정성"
    page: 17
    bbox_norm: [0.1064, 0.073, 0.8898, 0.2877]
    strategy: caption-region
    curated: true
  - id: fig12
    label: Figure 12
    kind: figure
    file: assets/nguyen-2026-robocolosseum-evaluating-physical-intelligence-at/fig12.png
    raw: raw/papers/nguyen-2026-robocolosseum-evaluating-physical-intelligence-at-figures/fig12.png
    caption: "SO-101 과제별 progress reachability 곡선"
    page: 29
    bbox_norm: [0.106, 0.073, 0.894, 0.4801]
    strategy: caption-region
    curated: false
  - id: fig13
    label: Figure 13
    kind: figure
    file: assets/nguyen-2026-robocolosseum-evaluating-physical-intelligence-at/fig13.png
    raw: raw/papers/nguyen-2026-robocolosseum-evaluating-physical-intelligence-at-figures/fig13.png
    caption: "DROID 과제별 progress reachability 곡선"
    page: 30
    bbox_norm: [0.106, 0.073, 0.894, 0.4801]
    strategy: caption-region
    curated: false
  - id: fig14
    label: Figure 14
    kind: figure
    file: assets/nguyen-2026-robocolosseum-evaluating-physical-intelligence-at/fig14.png
    raw: raw/papers/nguyen-2026-robocolosseum-evaluating-physical-intelligence-at-figures/fig14.png
    caption: "Bimanual-YAM 과제별 progress reachability 곡선. 안전 정지 평가는 빈 마커"
    page: 31
    bbox_norm: [0.106, 0.073, 0.894, 0.4801]
    strategy: caption-region
    curated: false
  - id: fig15
    label: Figure 15
    kind: figure
    file: assets/nguyen-2026-robocolosseum-evaluating-physical-intelligence-at/fig15.png
    raw: raw/papers/nguyen-2026-robocolosseum-evaluating-physical-intelligence-at-figures/fig15.png
    caption: "Unitree G1 과제별 progress reachability 곡선"
    page: 32
    bbox_norm: [0.106, 0.073, 0.894, 0.4801]
    strategy: caption-region
    curated: false
  - id: tab01
    label: Table 1
    kind: table
    file: assets/nguyen-2026-robocolosseum-evaluating-physical-intelligence-at/tab01.png
    raw: raw/papers/nguyen-2026-robocolosseum-evaluating-physical-intelligence-at-figures/tab01.png
    caption: "embodiment별 action space와 카메라 구성, Open Track 학습 데이터셋"
    page: 5
    bbox_norm: [0.1399, 0.377, 0.8601, 0.4688]
    strategy: table-region
    curated: false
  - id: tab02
    label: Table 2
    kind: table
    file: assets/nguyen-2026-robocolosseum-evaluating-physical-intelligence-at/tab02.png
    raw: raw/papers/nguyen-2026-robocolosseum-evaluating-physical-intelligence-at-figures/tab02.png
    caption: "Fine-tune Track 과제별 PS와 SR 전체 결과표"
    page: 13
    bbox_norm: [0.106, 0.1551, 0.894, 0.5259]
    strategy: table-region
    curated: false
  - id: tab03
    label: Table 3
    kind: table
    file: assets/nguyen-2026-robocolosseum-evaluating-physical-intelligence-at/tab03.png
    raw: raw/papers/nguyen-2026-robocolosseum-evaluating-physical-intelligence-at-figures/tab03.png
    caption: "모든 모델에 공통인 fine-tuning 설정"
    page: 21
    bbox_norm: [0.1087, 0.2671, 0.8913, 0.4385]
    strategy: table-region
    curated: false
  - id: tab04
    label: Table 4
    kind: table
    file: assets/nguyen-2026-robocolosseum-evaluating-physical-intelligence-at/tab04.png
    raw: raw/papers/nguyen-2026-robocolosseum-evaluating-physical-intelligence-at-figures/tab04.png
    caption: "모델별 fine-tuning 하이퍼파라미터"
    page: 21
    bbox_norm: [0.106, 0.4879, 0.8875, 0.9078]
    strategy: table-region
    curated: false
  - id: tab05
    label: Table 5
    kind: table
    file: assets/nguyen-2026-robocolosseum-evaluating-physical-intelligence-at/tab05.png
    raw: raw/papers/nguyen-2026-robocolosseum-evaluating-physical-intelligence-at-figures/tab05.png
    caption: "Open Track에서 평가한 frontier 에이전트 3종의 API 설정"
    page: 32
    bbox_norm: [0.2143, 0.5473, 0.7857, 0.6308]
    strategy: table-region
    curated: false
---

## 한 줄 요약 (One-line Summary)

RoboColosseum은 여러 나라의 실제 생활 공간에 흩어진 로봇 100대 이상과 전업 평가자를 하나의 policy serving 인프라와 표준 프로토콜로 묶은 분산 실세계 로봇 평가 벤치마크이며, 첫 연구에서 VLA 5종과 frontier 모델 3종을 Open Track 5,699회 pairwise 비교와 Fine-tune Track 20개 과제로 평가했다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 제목 | RoboColosseum: Evaluating Physical Intelligence at Scale In-The-Wild |
| 저자 | Tan Sang Nguyen, Yi Ru Wang, Shailesh Shailesh 외 (공동 1저자 3인), 교신저자 Jiafei Duan |
| 소속 | National University of Singapore, University of Washington, Stanford, UNC Chapel Hill, Allen Institute for AI, Oxford, Hugging Face, BitRobot, Singapore Embodied AI Centre |
| 공개 | arXiv 2611.02497v1 (cs.RO), 2026년 11월 2일 |
| 웹페이지 | robocolosseum.ai |
| 코드와 데이터 | github.com/RoboColosseum, huggingface.co/RoboColosseum |
| 평가 기간 | 2026년 9월 17일부터 10월 28일까지 41일 |
| 분량 | 본문 17쪽, 부록 포함 34쪽 |

## 2. 주요 기여 (Key Contributions)

- **분산 실세계 평가 인프라**: 싱가포르 캠퍼스와 산업 건물, 말레이시아 가정, 중국 공장 등을 잇는 평가 네트워크와 최대 30명의 전업 로봇 운영자, 공용 policy serving 서버를 구축했다. 미국, 영국, 싱가포르, 말레이시아, 중국에 걸쳐 100대 이상의 로봇을 운영한다.
- **두 개의 상보적 트랙**: Fine-tune Track은 과제당 같은 시연 데이터(demonstration) 100개로 적응력을 재고, Open Track은 과제별 적응 없이 블라인드 pairwise 비교로 일반화 능력을 잰다.
- **Difficulty-Calibrated Rasch(DCR) 순위 모델**: policy 능력과 과제 난이도를 함께 추정하고, 사람이 매긴 난이도(1~10)를 사전 정보로 쓴다. 두 policy가 모두 성공한 경우와 모두 실패한 경우를 구별한다.
- **active matchmaking**: Chatbot Arena의 불확실성 기반 샘플링을 물리 평가에 적용해 균등 샘플링 대비 약 절반의 평가로 같은 순위 일치도에 도달했다.
- **progress 기반 지표**: 과제별 K개 progress 기준으로 normalized progress score(PS)를 정의해 성공률(SR)이 놓치는 차이를 드러냈다.
- **공개와 지원**: 시연 데이터와 모든 평가 실행(실패 포함)을 공개하고, 학계에 무료 평가 10,000시간을 약속했다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 문제 설정

로봇 policy는 물리 세계와 closed-loop로 상호작용하므로 각 action이 다음 조건을 바꾼다. 결과는 policy, 로봇 셋업, 초기 조건, 환경이 함께 결정하므로 같은 과제라도 물체 배치, 카메라, 조명이 달라 성능 차이를 policy 능력에 귀속하기 어렵다. 시뮬레이터는 반복 가능한 리셋을 주지만 센싱, 보정, dynamics, 외관 차이 때문에 실세계 성능 예측력이 제한된다. 실세계 연구는 노동 비용 때문에 rollout 수가 적어 추정이 불안정하고, 학생과 자원봉사자에 의존하는 분산 평가(RoboArena 등)는 지속하기 어렵다. 저자들은 전업 운영자와 공유 물리 인프라가 필요하다고 본다.

### 3.2 embodiment와 연산

| embodiment | action space | 카메라 | Open Track 학습 데이터셋 |
|---|---|---|---|
| SO-101 | 6차원 joint position (팔 5 + 그리퍼 1) | 외부 1 + 손목 1 | MolmoAct2-SO101 |
| DROID (Franka) | 8차원 joint position (팔 7 + 그리퍼 1) | 외부 2 + 손목 1 | DROID 데이터셋 |
| Bimanual-YAM | 14차원 joint position (팔당 6 + 그리퍼 1) | 상단 1 + 손목 2 | MolmoAct2-YAM |
| Unitree G1 | humanoid, 평행 그리퍼 장착 | (표 1 미기재) | Fine-tune Track만 참여 |

- SO-101과 Bimanual-YAM은 이동식 트롤리에 장착한다. Franka는 DROID 구성을 따른다.
- policy 추론은 RTX 5090 노트북에서 로컬로 실행하거나 원격 라우팅 서버를 통한 서버 호스팅 endpoint에서 실행한다. 두 방식 모두 지연을 측정해 저지연 실행을 확인했다.
- 평가 장소는 사무실, 도서관, 공원, 기숙사, 가정, 푸드코트, 공장이다. 녹화 영상은 얼굴 블러와 신원 익명화 파이프라인을 거친다.

### 3.3 트랙별 고정 요소와 가변 요소

| 트랙 | 고정 | 가변 |
|---|---|---|
| Fine-tune Track | 과제별 시연 데이터, 과제 정의, 성공 기준, progress 기준, 평가 절차 | 모델별 fine-tuning 방법 |
| Open Track | 한 비교 안의 로봇, 지시문(instruction), 물체, 초기 셋업, timeout | 비교마다 과제와 환경 |

Fine-tune Track 설계는 DataComp의 반대 방향이다. DataComp가 학습 절차를 고정하고 데이터를 바꿨다면, RoboColosseum은 데이터를 고정하고 학습 절차를 모델별로 허용한다.

### 3.4 Fine-tune Track

- 과제: embodiment당 5개, 총 20개. pick-and-place, 쌓기(그릇, 큐브, 컵), 넘어진 병 세우기, articulated object(서랍, 노트북 덮개, 전자레인지 문), 변형 물체(수건, 옷), 액체 붓기, 도구 활용(쓰레받기와 솔), 양팔 협응, G1 loco-manipulation을 포함한다.
- 각 과제는 task card로 정의한다. 지시문, 물체, 초기 셋업, 성공 기준, timeout(20~150초), 평가 장소, progress 기준을 담는다.
- 데이터 수집: 과제당 teleoperation 시연 데이터 100개를 평가 장소의 같은 로봇과 환경에서 수집한다. Bimanual-YAM은 GELLO, SO-101은 leader-follower 팔, Franka는 DROID Quest teleoperation, G1은 Pico VR 헤드셋과 기성 whole-body control을 쓴다.
- fine-tuning: 각 모델은 Open Track 체크포인트가 아닌 base pre-training 체크포인트에서 시작해 100개 시연 데이터만으로 full fine-tuning한다. 각 모델의 공식 레시피를 수렴까지 따르고, 공통 harness는 데이터 변환과 설정 등록, 실행 스크립트만 추가한다.
- 평가: 과제당 N=25 trial, 원래 추론 구현을 사용한다. rollout n에서 만족한 기준 수 s_n을 K로 나눠 normalized progress를 계산하고, PS는 그 평균, SR은 완전 성공 비율이다. 기준은 순서와 무관하게 셀 수 있다. 위험해서 중단한 rollout은 s_n=0과 실패로 처리한다.

### 3.5 Open Track

- 평가자가 현장 물체와 환경으로 실행 가능한 과제를 정하고 자연어 지시문을 준다. 시스템이 익명 모델 A, B를 배정하고, 두 모델이 같은 로봇과 과제 설정에서 연속 실행된다.
- 평가자는 선호(A 승, B 승, 무승부), task progress 점수, 자연어 피드백, 체감 난이도(1~10)를 기록한다.
- active matchmaking: 초기 비교로 예비 순위를 만든 뒤, 모델 쌍 a의 선택 확률을 sqrt(Σ_aa / n_a) - sqrt(Σ_aa / (n_a+1))에 비례하게 둔다. 불확실하거나 비교가 적은 쌍에 평가를 집중한다.
- DCR: policy p의 능력 θ_p, 과제 t의 난이도 β_t를 두고 성공 확률을 σ(θ_p - β_t)로 모델링한다(Rasch 1PL). 사람 난이도 d_t=k인 과제는 β_t ~ N(μ_k, τ²)이고 μ_1 < ... < μ_10 제약을 둔다. 물리 결과가 개별 과제 난이도를 범주 평균에서 움직일 수 있다.
- 두 policy의 개별 성공 결과를 보존하므로, 둘 다 성공하면 쉬운 과제의 증거, 둘 다 실패하면 어려운 과제의 증거가 된다.
- 순위는 사후 평균 능력 s_p = E[θ_p | D]로 매기고, 공개 leaderboard에는 R_p = 1500 + (400 / ln 10) s_p로 Elo 척도 변환을 보인다. 선형 변환이므로 순서는 바뀌지 않으며, 순차 Elo 업데이트로 얻은 값이 아니다.
- 강건성 비교용 baseline으로 Bradley-Terry-Davidson(BTD), 순차 Elo, 평균 pairwise 점수를 쓴다.

### 3.6 frontier 에이전트 인터페이스 (부록 D.1)

- Claude Opus 5.5(Anthropic Messages), GPT-6 Astra(OpenAI Responses), Grok 4.7(xAI Chat Completions)을 fine-tuning, 과제별 프롬프트, 시연 데이터 없이 그대로 쓴다. Inspect Robots 에이전트 policy로 policy 서버 안에서 구동해 과제 배정, 제어, timeout, 채점을 VLA와 같게 맞췄다.
- 각 결정 단계에서 640×480 카메라 이미지 전체(SO-101과 DROID는 2시점, YAM은 3시점), 라벨이 붙은 proprioception 벡터, 지시문을 받는다. 최근 두 observation의 이미지만 대화에 남기고 이전 것은 텍스트로만 유지한다.
- 턴당 tool call 하나: 절대 joint-position 목표를 주는 move, done, give_up. move에는 관찰 내용과 선택 이유를 1~2문장 note로 남긴다. 에이전트의 done은 성공으로 세지 않는다.
- 서버는 보정된 joint 한계와 단계별 변화 한계로 검증하고 최대 chunk 길이로 자른다. reasoning effort는 medium, trial당 모델 호출 최대 30회, 제어 단계 최대 800, 호출당 120초 deadline이다.

### 3.7 과제 범주 분류 (부록 D.2)

Open Track 지시문을 Pick/Place, Stack/Arrange, Open/Close, Reorient, Deformable, Tool/Interaction 6개 범주로 나눈다. Qwen3-30B-A3B-Instruct-2507을 vLLM으로 로컬 서빙하고 temperature 0, 최대 출력 64 토큰으로 결정적 디코딩한다. Pick/Place가 더 구체적인 조작의 중간 단계일 뿐이면 구체 범주를 고른다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 실험 구성

- 모델: VLA 5종(GR00T N1.7, π0.5, MolmoAct2, G0.5, LingBot-VLA v2)과 frontier 모델 3종(GPT-6 Astra, Claude Opus 5.5, Grok 4.7).
- Fine-tune Track: 4개 embodiment × 5개 과제, 과제당 시연 데이터 100개, 모델과 과제 쌍마다 25 trial.
- Open Track: 5,699회 pairwise 비교, 5,699개 과제, 124개 사이트. 에이전트는 SO-101, DROID, Bimanual-YAM에만 참여한다. Figure 3 기준 embodiment별 평가 수는 DROID/Franka 3,065, Bimanual-YAM 2,134, SO-101 496이다.

### 4.2 RQ1 개방 환경 능력

- Figure 3 DCR: DROID/Franka에서는 GPT-6 Astra(2049)가 최고, Bimanual-YAM은 Claude Opus 5.5(2133), SO-101도 Claude Opus 5.5(2132)가 최고다. VLA 중에서는 DROID에서 MolmoAct2 1832, YAM에서 G0.5 1682, SO-101에서 π0.5 1903이 가장 높다. Grok 4.7은 세 embodiment 모두 하위권(1047, 979, 1118)이다.
- 에이전트와 VLA의 901회 대응 평가: 에이전트 진행도 우세 394회, VLA 우세 265회, 동률 242회. 평균 차이는 에이전트 +5.3%p이고, Claude Opus 5.5 +12.1%p, GPT-6 Astra +11.0%p, Grok 4.7 -7.5%p다.
- 범주별(Figure 5): MolmoAct2는 6개 범주 모두에서 VLA 중 BTD 점수가 가장 높다(58~77%). 그러나 성공률은 6~13%이고 어떤 시스템도 어떤 범주에서 13%를 넘지 못했다.
- 난이도별(Figure 6): 성공률은 난이도 1~4에서 30.7%, 5~6에서 7.6%, 7~8에서 1.2%, 9~10에서 0.4%다. 실패 실행의 평균 진행도도 56.6%, 31.6%, 16.7%, 3.5%로 떨어진다.

### 4.3 RQ2 과제 적응 (Table 2 평균)

| embodiment | GR00T N1.7 PS/SR | π0.5 PS/SR | MolmoAct2 PS/SR | G0.5 PS/SR | LingBot-VLA v2 PS/SR |
|---|---|---|---|---|---|
| SO-101 | 89.0 / 82.4 | 85.4 / 77.6 | 71.8 / 59.2 | 58.8 / 40.0 | 55.2 / 36.8 |
| DROID Franka | 56.4 / 42.4 | 91.2 / 84.0 | 78.2 / 54.4 | 44.8 / 16.0 | 59.4 / 40.8 |
| Bimanual-YAM | 52.6 / 20.0 | 97.2 / 93.6 | 72.1 / 49.6 | 89.1 / 75.2 | 48.3 / 30.4 |
| G1 Humanoid | 22.7 / 0.0 | 16.3 / 0.0 | 19.8 / 0.0 | 13.3 / 0.0 | 23.2 / 0.0 |

(단위 %. 과제 5개를 동일 가중 평균)

- 과제별 편차가 크다. DROID에서 LingBot-VLA v2는 open_drawer 100%, marker_in_holder 0%이고 MolmoAct2는 반대로 0%와 88%다.
- π0.5는 YAM 5개 과제 중 4개에서 96~100%, stack_cups 72%로 고르게 높다. G0.5는 drawer와 microwave 100%이지만 stack_cups 20%다.
- 안전 정지: LingBot-VLA v2는 YAM drawer에서 1 trial 후, GR00T N1.7은 YAM microwave에서 9 trial 후 중단했고 나머지 trial은 0점이다.
- G1에서는 어떤 policy도 어떤 과제를 완료하지 못했고 평균 progress는 13.3~23.2%다. 4분의 1 기준조차 만족한 trial이 40% 미만이다.
- reachability(Figure 7): DROID에서 G0.5는 거의 모든 trial이 기준 4분의 1을 넘지만 4분의 3에 도달한 비율은 약 20%, 완전 성공 16%다. π0.5는 모든 임계에서 높고 완전 성공 84%다. YAM에서 MolmoAct2는 4분의 1은 거의 다 넘지만 약 절반만 완료하고 π0.5는 93.6% 성공이다.
- 실패 단계(Figure 8): SO-101 cube_drawer에서 첫 기준(큐브 집어 들기)을 놓친 비율이 policy별 12~48%다. DROID close_laptop에서 G0.5는 25회 모두 첫 접촉은 하지만 24회가 절반 닫기에 실패한다. MolmoAct2는 24회 거의 닫지만 7회만 완료, π0.5는 25회 모두 거의 닫고 17회 완료한다.

### 4.4 RQ3 순위 일관성

- Open Track과 Fine-tune Track 순위의 Spearman ρ: SO-101 -0.20, DROID/Franka -0.40, Bimanual-YAM 0.20. 10개 모델 쌍 중 순서가 유지된 쌍은 각각 4, 3, 6개다.
- π0.5는 DROID에서 Open Track 5위에서 Fine-tune 1위, YAM에서 4위에서 1위로 이동한다. G0.5는 DROID Open Track 2위에서 Fine-tune 5위로 내려간다.
- Fine-tune Track의 embodiment 간 순위 일치도는 Kendall W = 0.24로 낮다. π0.5는 DROID와 YAM 1위, G1 4위이고 GR00T N1.7은 SO-101 1위, DROID와 YAM 4위다.
- policy가 5개뿐이고 트랙 간 과제 분포, 시작 체크포인트, 지표가 달라 불일치를 일반화와 적응 능력 차이만으로 설명할 수는 없다고 저자들이 명시한다.

### 4.5 RQ4 신뢰성과 효율

- 사이트를 무작위로 두 그룹으로 나눠 DCR을 따로 적합하면, DROID와 YAM은 쌍 순서 일치도 약 85%, 평균 Spearman ρ = 0.82다. SO-101은 59%, ρ = 0.30으로 사이트 구성에 민감하다.
- active matchmaking은 400~500회 평가로 전체 데이터 순위와 약 90% 일치에 도달하고, 균등 샘플링은 약 1,000회가 필요하다. 이점은 예산이 작을 때 가장 크다(200회 독립 실행 평균).

### 4.6 RQ5 평가 규모

무작위 부분집합(200개)으로 DCR을 적합하면 평균 일치도는 약 1,123회에서 90%, 약 4,755회에서 95%에 도달한다. 다만 2.5~97.5 백분위 범위가 넓어, 평균 순서는 일찍 나오지만 부분집합과 무관하게 안정된 순위에는 훨씬 많은 평가가 필요하다.

### 4.7 fine-tuning 설정 (부록 A)

| 모델 | base 체크포인트 | 유효 배치 | 최대 학습률 | 비고 |
|---|---|---|---|---|
| GR00T N1.7 | nvidia/GR00T-N1.7-3B | 64 | 1e-4, cosine, warmup 5% | VLM과 action head 전체 학습 (SO-101은 기본 설정대로 backbone 고정) |
| π0.5 | pi05_base | 64 | 2.5e-5, cosine, 1,000 step warmup | EMA 0.99, Aloha 적응 끔 |
| MolmoAct2 | allenai/MolmoAct2 | 128 | LLM 2e-5, ViT와 connector 1e-5, action expert 1e-4 | 전체 모델 |
| G0.5 | OpenGalaxea/G05(base) | 32 | 4e-5 (vision encoder 0.1배), cosine, 200 warmup | weight decay 0.03 |
| LingBot-VLA v2 | robbyant/lingbot-vla-v2-6b | 64 | 1.25e-5, constant | Muon optimizer |

공통 설정은 absolute joint position 상태와 action, bf16 연산과 fp32 master weight, 마지막 epoch 체크포인트 평가다. GR00T N1.7은 처음에 action head만 유효 배치 512로 학습했는데 5 epoch 동안 optimizer 업데이트가 너무 적어 상수 예측으로 수렴했다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- 초기 스냅샷일 뿐 모든 로봇 foundation model과 배치 환경을 망라하지 않는다. 체크포인트와 하드웨어 호환성 때문에 모델별, embodiment별 범위가 다르다.
- Fine-tune Track은 embodiment당 5개 과제만 평가한다.
- 모델별 공식 레시피를 허용하므로 동일 optimizer와 스케줄에서의 아키텍처 차이가 아니라 실용적인 end-to-end 적응을 측정한다.
- Open Track 순위 안정성 분석은 수집된 전체 데이터 기준의 재현성이다. 데이터가 늘면 같은 분석을 반복해야 한다.
- 순위 불일치 분석은 policy 5개에 기반하고 트랙 간 조건이 달라 원인 귀속이 제한된다.
- 향후: 창립 멤버(NUS MAGIC Lab, Hugging Face, Singapore Embodied AI Centre, BitRobot)가 과제 데이터셋, 야외 환경, embodiment를 확장하고 무료 평가 10,000시간을 학계에 제공한다.

## 6. 관련 연구 (Related Work)

| 계열 | 사례 | RoboColosseum과의 관계 |
|---|---|---|
| 표준화 실세계 벤치마크 | FurnitureBench, SceneReplica, RoboDojo, VLA-REPLICA | 단일 셋업 재현 대신 다수 embodiment와 사이트로 확장 |
| 원격 테스트베드 | TOTO, Real Robot Challenge | 중앙 하드웨어 대신 분산 사이트 |
| 분산 평가 | RB2, RoboArena(7개 기관, 612회 비교, DROID/Franka 단일) | 다중 embodiment와 전업 운영자, 통제 트랙 추가 |
| arena식 평가 | Chatbot Arena(Bradley-Terry), active ranking | pairwise 집계와 active matchmaking의 방법론적 선례 |
| generalist policy | RT-X, Octo, OpenVLA, π0.5, GR00T, MolmoAct2 | 평가 대상 |
| 언어 모델 기반 제어 | SayCan, Code as Policies | frontier 에이전트 평가의 선례 |

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| Open Track | 과제별 적응 없이 익명 두 모델을 같은 장면과 지시문에서 연속 실행해 비교하는 트랙 |
| Fine-tune Track | 같은 시연 데이터 100개로 fine-tuning한 뒤 고정 과제에서 25 trial씩 평가하는 트랙 |
| DCR (Difficulty-Calibrated Rasch) | policy 능력과 과제 난이도를 Rasch 모형으로 함께 추정하는 순위 모델 |
| DCR Rating (Elo scale) | DCR 사후 평균 능력을 1500 중심 Elo 척도로 선형 변환한 값 |
| active matchmaking | 순위 불확실성을 가장 많이 줄일 모델 쌍에 평가를 우선 배정하는 방식 |
| PS (progress score) | 과제별 progress 기준 중 만족한 비율의 trial 평균 |
| SR (success rate) | 과제의 완전 성공 조건을 만족한 trial 비율 |
| progress reachability | 기준의 일정 비율 이상을 만족한 trial 비율을 임계별로 그린 곡선 |
| expected comparison score | 평균 능력 시스템을 상대로 이길 확률에 비길 확률의 절반을 더한 값 |
| task card | 지시문, 물체, 초기 셋업, 성공 기준, timeout, progress 기준을 정의한 과제 명세 |

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 2 | RoboColosseum 전체 구성. 분산 평가 사이트와 공용 policy serving 인프라, Fine-tune Track과 Open Track 두 트랙의 관계와 트랙별 산출물 | caption-region | ★ wiki 권장 |
| fig02 | 5 | 네 embodiment의 하드웨어 구성. Bimanual-YAM, SO-101, DROID 구성의 Franka, Unitree G1의 카메라와 그리퍼, 연산 장비 배치 | caption-region | ★ wiki 권장 |
| fig03 | 9 | embodiment별 Open Track DCR rating(Elo 척도)과 95% 신용구간. VLA policy 5종과 frontier 모델 3종 비교 | caption-region | ★ wiki 권장 |
| fig04 | 10 | frontier 모델과 VLA policy의 task progress 비교. 901회 대응 평가에서 우세 비율과 평균 진행도 차이 | caption-region | ★ wiki 권장 |
| fig06 | 12 | 사람이 매긴 과제 난이도 구간별 성공률과 실패 실행의 평균 normalized progress | caption-region | ★ wiki 권장 |
| fig07 | 12 | Fine-tune Track embodiment별 progress reachability 곡선. 기준의 일정 비율 이상을 만족한 trial 비율 | caption-region | ★ wiki 권장 |
| fig08 | 14 | fine-tuning 후 policy별 실패 단계. SO-101 cube_drawer와 DROID close_laptop에서 처음 충족하지 못한 기준 | caption-region | ★ wiki 권장 |
| fig09 | 15 | embodiment별 Open Track 순위와 Fine-tune Track 순위의 교차 비교와 Spearman 상관 | caption-region | ★ wiki 권장 |
| fig10 | 16 | (a) embodiment 간 Fine-tune 순위 일치도(Kendall W 0.24), (b) 평가 사이트 부분집합 간 DCR 순위 일치도 | caption-region | ★ wiki 권장 |
| fig11 | 17 | (a) active matchmaking과 균등 샘플링의 순위 일치도 수렴 비교, (b) 평가 규모에 따른 Open Track 순위 안정성 | caption-region | ★ wiki 권장 |
| fig12 | 29 | SO-101 과제별 progress reachability 곡선 | caption-region | (아카이브) |
| fig13 | 30 | DROID 과제별 progress reachability 곡선 | caption-region | (아카이브) |
| fig14 | 31 | Bimanual-YAM 과제별 progress reachability 곡선. 안전 정지 평가는 빈 마커 | caption-region | (아카이브) |
| fig15 | 32 | Unitree G1 과제별 progress reachability 곡선 | caption-region | (아카이브) |
| tab01 | 5 | embodiment별 action space와 카메라 구성, Open Track 학습 데이터셋 | table-region | (아카이브) |
| tab02 | 13 | Fine-tune Track 과제별 PS와 SR 전체 결과표 | table-region | (아카이브) |
| tab03 | 21 | 모든 모델에 공통인 fine-tuning 설정 | table-region | (아카이브) |
| tab04 | 21 | 모델별 fine-tuning 하이퍼파라미터 | table-region | (아카이브) |
| tab05 | 32 | Open Track에서 평가한 frontier 에이전트 3종의 API 설정 | table-region | (아카이브) |
